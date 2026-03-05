import { Project } from "ts-morph"
import { z } from "zod"
import path from "node:path"
import fs from "node:fs"
import { Localization } from "@dchighs/dc-localization"
import { Config } from "@dchighs/dc-config"
import { env } from "@marcuth/env"

import { updateSchemaFromAggregatedIssues } from "./schema-updater"

// Import all mappings
import * as Mappers from "../src/mappers"

// Import root schemas for identification
import { mazeIslandSchema } from "../src/schemas/islands/maze-islands/island.schema"
import { mazeIslandsPathSchema } from "../src/schemas/islands/maze-islands/path.schema"
import { mazeIslandsNodeSchema } from "../src/schemas/islands/maze-islands/node.schema"
import { heroicRacesIslandSchema } from "../src/schemas/islands/heroic-races/island.schema"
// ... we'll add more as needed

async function main() {
    console.log("🚀 Starting Aggregated Global Schema Sync...")

    // Build Schema Registry
    const project = new Project()
    project.addSourceFilesAtPaths("src/schemas/**/*.ts")
    const schemaRegistry: Record<string, string> = {}
    project.getSourceFiles().forEach(sf => {
        sf.getVariableDeclarations().forEach(vd => {
            const name = vd.getName()
            if (name.endsWith("Schema")) {
                schemaRegistry[name] = sf.getFilePath()
            }
        })
    })

    // Load Config
    let configData: any
    if (env("GAME_AUTH_TOKEN") && env("GAME_USER_ID") && env("GAME_CONFIG_URL")) {
        console.log("Fetching remote config...")
        const config = await Config.create({
            authToken: env("GAME_AUTH_TOKEN"),
            userId: env("GAME_USER_ID"),
            url: env("GAME_CONFIG_URL"),
            language: "br",
        })
        configData = config.data
    } else {
        const configPath = path.join(__dirname, "../playground/config.json")
        if (fs.existsSync(configPath)) {
            configData = JSON.parse(fs.readFileSync(configPath, "utf-8"))
        } else {
            console.error("No config data found.")
            process.exit(1)
        }
    }

    const gameConfig = configData.game_data.config
    const localization = await Localization.create("br")

    // Define probe tasks
    // Each task maps a specific config part to its root schema(s)
    const probeTasks = [
        { schemaName: "mazeIslandSchema", data: gameConfig.maze_island.islands, schema: mazeIslandSchema },
        { schemaName: "mazeIslandsPathSchema", data: gameConfig.maze_island.paths, schema: mazeIslandsPathSchema },
        { schemaName: "mazeIslandsNodeSchema", data: gameConfig.maze_island.nodes, schema: mazeIslandsNodeSchema },
        { schemaName: "heroicRacesIslandSchema", data: gameConfig.heroic_races.islands, schema: heroicRacesIslandSchema },
        // ... more can be added here
    ]

    for (const task of probeTasks) {
        if (!task.data) continue
        const items = Array.isArray(task.data) ? task.data : [task.data]
        const allIssues: { issues: z.ZodIssue[], data: any }[] = []

        for (const item of items) {
            const result = (task.schema as any).safeParse(item)
            if (!result.success) {
                allIssues.push({ issues: result.error.issues, data: item })
            }
        }

        if (allIssues.length > 0) {
            const filePath = schemaRegistry[task.schemaName]
            if (filePath) {
                updateSchemaFromAggregatedIssues(filePath, task.schemaName, allIssues)
            }
        }
    }

    console.log("✅ Sync complete.")
}

main().catch(console.error)
