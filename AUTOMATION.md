# Automação de Schemas e Inferência de Tipos

Este documento explica o funcionamento, a arquitetura e as motivações por trás do sistema de atualização automática de schemas do `@dchighs/dc-config-mapper`.

## 🎯 O Problema

O Dragon City é um jogo em constante evolução. Novas propriedades (campos) são adicionadas com frequência às configurações (JSONs) de ilhas, dragões e itens. 

Como esta biblioteca utiliza **Zod** com a regra `.strict()`, qualquer campo novo não mapeado causava a quebra imediata da validação. O trabalho manual de identificar o campo, descobrir seu tipo e adicioná-lo ao schema e ao transform era repetitivo e propenso a erros.

## 🚀 A Solução: Sincronização Determinística

Em vez de usar IA (que pode alucinar ou gerar código inconsistente), criamos um motor de sincronização baseado em **AST (Abstract Syntax Tree)** utilizando a biblioteca `ts-morph`.

### 1. Detecção de Mudanças
O script `scripts/sync.ts` carrega os dados reais do jogo e os valida contra os schemas atuais. Quando o Zod retorna o erro `unrecognized_keys`, o script captura exatamente:
- Qual chave está sobrando.
- Em qual parte do schema ela deveria estar.
- Qual o valor real contido nessa chave nos dados do jogo.

### 2. Inferência de Tipos (`inferZodType`)
Para cada campo novo, o sistema infere o tipo Zod correspondente:
- `number` -> `z.number()`
- `string` -> `z.string()`
- `boolean` -> `z.boolean()`
- `Array` -> `z.array(z.any())`
- `Object` -> `z.object({})` (que será preenchido recursivamente em passes subsequentes)

### 3. Manipulação de Código com `ts-morph`
O arquivo `scripts/schema-updater.ts` é o "músculo" do sistema. Ele abre os arquivos `.ts` originais e:
- Localiza a declaração do schema (ex: `mazeIslandSchema`).
- Adiciona a nova propriedade ao objeto `z.object({...})`.
- **Injeção no Transform**: Identifica a chamada `.transform(...)` e adiciona o mapeamento automático `campo: data.campo` no objeto de retorno. Isso garante que o mapper já entregue o novo campo pronto para uso sem intervenção humana.

## 🧠 Por que foi feito desta forma?

### Determinismo vs IA
A abordagem é 100% determinística. O código só é alterado com base em evidências reais (erros de validação). Isso garante que o schema seja sempre uma representação fiel e mínima do que o jogo realmente envia.

### Agregação de Issues (`updateSchemaFromAggregatedIssues`)
Processamos todos os itens de uma lista (ex: todas as 500 ilhas do config) antes de aplicar as mudanças. 
- **Por que?** Evita o "flip-flop" onde um campo presente na ilha A mas ausente na ilha B poderia ser adicionado e removido repetidamente se fôssemos atualizar item por item. O sistema vê o "senso comum" de todos os itens e adiciona tudo o que foi detectado como novo.

### Preservação de Lógica Opinada
Um dos maiores desafios era não destruir as suas transformações personalizadas (ex: converter timestamps para ISO, mudar nomes de chaves para algo mais semântico).
- O `ts-morph` permite que naveguemos na estrutura do código e editemos apenas o necessário, mantendo seus comentários, formatação e lógicas complexas intactas dentro do `.transform()`.

### Ciclo de Segurança no CI/CD
1. **Sync**: Atualiza os arquivos `.ts`.
2. **Vitest**: Valida se, mesmo com os novos campos, a lógica dos mappers continua íntegra.
3. **Build**: Compila o TypeScript para gerar os arquivos finais e tipos (`.d.ts`).
4. **Release**: Publica a versão apenas se todas as etapas acima passarem.

## 🛠️ Como estender
Para adicionar um novo schema ao fluxo de automação, basta registrá-lo no array `probeTasks` dentro de `scripts/sync.ts`, apontando qual dado do config ele deve validar.
