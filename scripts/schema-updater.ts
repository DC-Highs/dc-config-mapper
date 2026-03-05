import { Project, SyntaxKind, ObjectLiteralExpression, Node, CallExpression } from "ts-morph"
import { z } from "zod"

/**
 * Deterministically updates a Zod schema in a file based on aggregated Zod Issues.
 */
export function updateSchemaFromAggregatedIssues(filePath: string, schemaName: string, allIssues: { issues: z.ZodIssue[], data: any }[]) {
    const project = new Project()
    const sourceFile = project.addSourceFileAtPath(filePath)

    const variable = sourceFile.getVariableDeclaration(schemaName)
    if (!variable) return

    const initializer = variable.getInitializer()
    if (!initializer) return

    let changed = false

    // We only care about unrecognized_keys for now to prevent breaking on new fields
    const unrecognizedKeys = new Map<string, any>() // key -> rawValue

    for (const { issues, data } of allIssues) {
        for (const issue of issues) {
            if (issue.code === "unrecognized_keys") {
                const path = issue.path
                if (path.length === 0) { // Only top-level for now
                    for (const key of issue.keys) {
                        if (!unrecognizedKeys.has(key)) {
                            unrecognizedKeys.set(key, data[key])
                        }
                    }
                }
            }
        }
    }

    if (unrecognizedKeys.size > 0) {
        let currentObj = findZObjectLiteral(initializer)
        if (currentObj) {
            for (const [key, value] of unrecognizedKeys.entries()) {
                if (!currentObj.getProperty(key)) {
                    const typeStr = inferZodType(value)
                    currentObj.addPropertyAssignment({
                        name: key,
                        initializer: typeStr
                    })
                    console.log(`[${schemaName}] Added ${key} to schema`)
                    updateTransformBlock(initializer, key, true)
                    changed = true
                }
            }
        }
    }

    if (changed) {
        sourceFile.saveSync()
        console.log(`[${schemaName}] Saved ${filePath}`)
    }
}

function updateTransformBlock(initializer: Node, key: string, add: boolean) {
    const allCalls = [initializer, ...initializer.getDescendantsOfKind(SyntaxKind.CallExpression)]
    let transformCall = allCalls.find(n => Node.isCallExpression(n) && n.getExpression().getText().endsWith(".transform")) as CallExpression | undefined

    if (!transformCall) return

    const transformFn = transformCall.getArguments()[0]
    if (!transformFn || !Node.isArrowFunction(transformFn)) return

    const paramName = transformFn.getParameters()[0]?.getName() || "data"
    let objectToUpdate: ObjectLiteralExpression | undefined
    const body = transformFn.getBody()

    if (Node.isObjectLiteralExpression(body)) {
        objectToUpdate = body
    } else {
        const returnStmt = transformFn.getDescendantsOfKind(SyntaxKind.ReturnStatement)[0]
        if (returnStmt) {
            const expression = returnStmt.getExpression()
            if (expression && Node.isObjectLiteralExpression(expression)) {
                objectToUpdate = expression
            }
        }
    }

    if (objectToUpdate) {
        if (add) {
            if (!objectToUpdate.getProperty(key)) {
                objectToUpdate.addPropertyAssignment({
                    name: key,
                    initializer: `${paramName}.${key}`
                })
                console.log(`[Transform] Added ${key}`)
            }
        }
    }
}

function findZObjectLiteral(node: Node): ObjectLiteralExpression | undefined {
    const nodes = [node, ...node.getDescendantsOfKind(SyntaxKind.CallExpression)]
    for (const cand of nodes) {
        if (Node.isCallExpression(cand)) {
            const text = cand.getExpression().getText()
            if (text.endsWith(".object") || text === "z.object") {
                const args = cand.getArguments()
                if (args.length > 0 && Node.isObjectLiteralExpression(args[0])) {
                    return args[0]
                }
            }
        }
    }
    return undefined
}

function inferZodType(value: any): string {
    if (Array.isArray(value)) return "z.array(z.any())"
    if (typeof value === "number") return "z.number()"
    if (typeof value === "string") return "z.string()"
    if (typeof value === "boolean") return "z.boolean()"
    if (typeof value === "object" && value !== null) return "z.object({})"
    return "z.any()"
}
