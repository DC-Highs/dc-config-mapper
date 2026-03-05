import { describe, it, expect } from "vitest"
import { Config, GameConfigDto } from "@dchighs/dc-config"
import { Localization } from "@dchighs/dc-localization"
import { env } from "@marcuth/env"
import fs from "node:fs"
import path from "node:path"
import {
    ItemsMapper,
    ChestsMapper,
    SkillsMapper,
    MazeIslandsMapper,
    FogIslandsMapper,
    GridIslandsMapper,
    HeroicRacesMapper,
    RunnerIslandsMapper,
    TowerIslandsMapper
} from "../src/mappers"

describe("Config Validation", async () => {
    const localization = await Localization.create("br")
    const configPath = path.join(__dirname, "./__fixtures__/config.json")
    let configData: GameConfigDto | undefined

    if (fs.existsSync(configPath)) {
        configData = JSON.parse(fs.readFileSync(configPath, "utf-8"))
    } else {
        if (env("GAME_AUTH_TOKEN") && env("GAME_USER_ID") && env("GAME_CONFIG_URL")) {
            const config = await Config.create({
                authToken: env("GAME_AUTH_TOKEN"),
                userId: env("GAME_USER_ID"),
                url: env("GAME_CONFIG_URL"),
                language: "br",
            })

            configData = config.data
        } else {
            console.warn("No config.json found and no credentials provided. Skipping remote fetch.")
        }
    }

    if (!configData) {
        it("should have config data", () => {
            expect(configData).toBeDefined()
        })
        return
    }

    const gameConfig = configData.game_data.config

    it("should validate Items", () => {
        const mapper = new ItemsMapper(localization)
        expect(() => mapper.map(gameConfig.items)).not.toThrow()
    })

    it("should validate Chests", () => {
        const mapper = new ChestsMapper(localization)
        expect(() => mapper.map(gameConfig.chests)).not.toThrow()
    })

    it("should validate Skills", () => {
        const mapper = new SkillsMapper(localization)
        expect(() => mapper.map(gameConfig.skills)).not.toThrow()
    })

    it("should validate Maze Islands", () => {
        const mapper = new MazeIslandsMapper(localization)
        expect(() => mapper.map(gameConfig.maze_island)).not.toThrow()
    })

    it("should validate Fog Islands", () => {
        const mapper = new FogIslandsMapper(localization)
        expect(() => mapper.map(gameConfig.fog_island)).not.toThrow()
    })

    it("should validate Grid Islands", () => {
        const mapper = new GridIslandsMapper(localization)
        expect(() => mapper.map(gameConfig.grid_island)).not.toThrow()
    })

    it("should validate Heroic Races", () => {
        const mapper = new HeroicRacesMapper(localization)
        expect(() => mapper.map(gameConfig.heroic_races)).not.toThrow()
    })

    it("should validate Runner Islands", () => {
        const mapper = new RunnerIslandsMapper(localization)
        expect(() => mapper.map(gameConfig.runner_island)).not.toThrow()
    })

    it("should validate Tower Islands", () => {
        const mapper = new TowerIslandsMapper(localization)
        expect(() => mapper.map(gameConfig.tower_island)).not.toThrow()
    })
})
