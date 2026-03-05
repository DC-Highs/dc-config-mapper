# AGENTS.md - dc-config-mapper

## Project Overview

This is a TypeScript library for restructuring and populating Dragon City game configuration data. It uses Zod for schema validation, transforms raw config data into structured DTOs, and integrates with `@dchighs/dc-localization` for translations.

## Commands

```bash
# Build the project
npm run build
# or directly
tsc

# Run all tests
npm run test

# Run a single test file
vitest run src/__tests__/config-validation.test.ts

# Run tests matching a name pattern
vitest run --testNamePattern="should validate Items"

# Run tests in watch mode (during development)
vitest

# Run playground script
npm run playground
```

## Code Style Guidelines

### File Organization

- Use barrel exports (`index.ts`) for each directory
- Suffix conventions:
  - `*.schema.ts` - Zod schemas
  - `*.dto.ts` - Data Transfer Objects
  - `*.enum.ts` - TypeScript enums
  - `*.mapper.ts` - Mapper classes
  - `*.util.ts` - Utility functions
  - `*.test.ts` - Test files

### Directory Structure

```
src/
├── __tests__/           # Test files
├── dtos/                # Data Transfer Objects
│   └── items/
├── enums/               # TypeScript enums
├── mappers/             # Mapper classes
├── schemas/             # Zod schemas
│   └── islands/
└── utils/               # Utility functions
```

### Naming Conventions

- Files: camelCase (e.g., `items.mapper.ts`)
- Directories: kebab-case (e.g., `maze-islands/`)
- Classes: PascalCase (e.g., `ItemsMapper`)
- Interfaces/Types: PascalCase (e.g., `DragonDto`)
- Enums: PascalCase with PascalCase members
- Functions: camelCase

### Imports

Order imports as follows:
1. External libraries (e.g., `zod`, `lodash`, `pluralize`)
2. Peer dependencies (e.g., `@dchighs/dc-config`, `@dchighs/dc-localization`)
3. Internal modules (relative paths)

```typescript
import { z } from "zod"
import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config"
import { groupBy } from "lodash"
import { recordKeysConversor } from "../utils"
import { RestructuredItemsDto } from "../dtos/items"
import { dragonSchema } from "../schemas/items/dragon.schema"
```

### TypeScript

- Use strict mode (enabled in tsconfig.json)
- Enable strict null checks
- Use interfaces for DTOs and public APIs
- Use type inference when obvious
- Use Zod schemas with `.parse()` and `.transform()` for validation and transformation

### Zod Schemas

- Use `.strict()` to reject unknown keys
- Use `.transform()` to reshape/rename fields
- Validate input at mapper boundaries

```typescript
export const dragonSchema = z.object({
    id: z.number(),
    name: z.string(),
}).strict().transform((data) => {
    return {
        id: data.id,
        name: data.name,
    }
})
```

### Mapper Classes

- Constructor accepts `Localization` as dependency
- Public `map()` method takes raw config data and returns transformed DTO
- Use dependency injection for services like Localization

```typescript
export class ItemsMapper {
    constructor(readonly localization: Localization) { }

    map(items: GameConfigDto["game_data"]["config"]["items"]) {
        // Transform and localize
    }
}
```

### Error Handling

- Use try/catch blocks with meaningful error messages
- Log errors with `console.error` before rethrowing
- Include context in error messages

```typescript
try {
    // process data
} catch (error) {
    console.error("Error while compiling data:", error)
    throw error
}
```

### Testing

- Use Vitest with `describe`/`it`/`expect` pattern
- Tests are in `src/__tests__/*.test.ts`
- Use globals: true (available globally without imports)

```typescript
import { describe, it, expect } from "vitest"

describe("Config Validation", () => {
    it("should validate Items", () => {
        // test code
    })
})
```

### General

- Use meaningful variable names
- Keep functions small and focused
- Document complex transformations with comments when necessary
- Use `Array<T>` syntax over `T[]` for array types in signatures
