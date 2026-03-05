import { describe, it, expect } from "vitest"
import { DataCompiler } from "../src/data-compiler"

describe("DataCompiler", () => {
    describe("with default options", () => {
        const compiler = new DataCompiler()

        it("should compile data with ids suffix", () => {
            const data = {
                id: 1,
                name: "Dragon Tower",
                dragon_ids: [1, 2, 3],
            }
            const context = {
                dragons: [
                    { id: 1, name: "Fire Dragon" },
                    { id: 2, name: "Water Dragon" },
                    { id: 3, name: "Earth Dragon" },
                ],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                id: 1,
                name: "Dragon Tower",
                dragons: [
                    { id: 1, name: "Fire Dragon" },
                    { id: 2, name: "Water Dragon" },
                    { id: 3, name: "Earth Dragon" },
                ],
            })
        })

        it("should compile data with id suffix", () => {
            const data = {
                id: 1,
                name: "Player",
                main_dragons: {
                    dragon_id: 1,
                },
            }
            const context = {
                dragons: [
                    { id: 1, name: "Fire Dragon" },
                ],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                id: 1,
                name: "Player",
                main_dragons: {
                    dragon: { id: 1, name: "Fire Dragon" },
                },
            })
        })

        it("should handle nested objects", () => {
            const data = {
                id: 1,
                mission: {
                    id: 1,
                    reward_ids: [1, 2],
                },
            }
            const context = {
                rewards: [
                    { id: 1, type: "coins" },
                    { id: 2, type: "gems" },
                ],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                id: 1,
                mission: {
                    id: 1,
                    rewards: [
                        { id: 1, type: "coins" },
                        { id: 2, type: "gems" },
                    ],
                },
            })
        })

        it("should handle arrays of objects", () => {
            const data = {
                islands: [
                    { id: 1, chest_ids: [1] },
                    { id: 2, chest_ids: [2] },
                ],
            }
            const context = {
                chests: [
                    { id: 1, name: "Gold Chest" },
                    { id: 2, name: "Silver Chest" },
                ],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                islands: [
                    { id: 1, chests: [{ id: 1, name: "Gold Chest" }] },
                    { id: 2, chests: [{ id: 2, name: "Silver Chest" }] },
                ],
            })
        })

        it("should filter out ids not found in context", () => {
            const data = {
                id: 1,
                dragon_ids: [1, 999, 3],
            }
            const context = {
                dragons: [
                    { id: 1, name: "Fire Dragon" },
                    { id: 3, name: "Earth Dragon" },
                ],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                id: 1,
                dragons: [
                    { id: 1, name: "Fire Dragon" },
                    { id: 3, name: "Earth Dragon" },
                ],
            })
        })

        it("should return null for id not found in context", () => {
            const data = {
                id: 1,
                main_dragon: {
                    dragon_id: 999,
                },
            }
            const context = {
                dragons: [
                    { id: 1, name: "Fire Dragon" },
                ],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                id: 1,
                main_dragon: {
                    dragon: null,
                },
            })
        })

        it("should preserve non-id fields", () => {
            const data = {
                id: 1,
                name: "Test",
                level: 5,
                dragon_ids: [1],
            }
            const context = {
                dragons: [{ id: 1, name: "Fire Dragon" }],
            }

            const result = compiler.compile({ data, context })

            expect(result.name).toBe("Test")
            expect(result.level).toBe(5)
        })
    })

    describe("with custom options", () => {
        it("should use custom ids suffix", () => {
            const compiler = new DataCompiler({ idsSuffix: "_codes" })

            const data = {
                id: 1,
                dragon_codes: [1, 2],
            }
            const context = {
                dragons: [
                    { id: 1, name: "Fire Dragon" },
                    { id: 2, name: "Water Dragon" },
                ],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                id: 1,
                dragons: [
                    { id: 1, name: "Fire Dragon" },
                    { id: 2, name: "Water Dragon" },
                ],
            })
        })

        it("should use custom id suffix", () => {
            const compiler = new DataCompiler({ idSuffix: "_uuid" })

            const data = {
                id: 1,
                dragon_uuid: 1,
            }
            const context = {
                dragons: [{ id: 1, name: "Fire Dragon" }],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                id: 1,
                dragon: { id: 1, name: "Fire Dragon" },
            })
        })

        it("should filter by accepted prefixes", () => {
            const compiler = new DataCompiler({ acceptedPrefixes: ["hero_"] })

            const data = {
                id: 1,
                hero_dragon_ids: [1],
                enemy_dragon_ids: [2],
            }
            const context = {
                dragons: [
                    { id: 1, name: "Hero Dragon" },
                    { id: 2, name: "Enemy Dragon" },
                ],
            }

            const result = compiler.compile({ data, context })

            expect(result).toEqual({
                id: 1,
                hero_dragons: [{ id: 1, name: "Hero Dragon" }],
                enemy_dragon_ids: [2],
            })
        })
    })

    describe("compileMany", () => {
        const compiler = new DataCompiler()

        it("should compile array of items", () => {
            const data = [
                { id: 1, chest_ids: [1] },
                { id: 2, chest_ids: [2] },
            ]
            const context = {
                chests: [
                    { id: 1, name: "Gold Chest" },
                    { id: 2, name: "Silver Chest" },
                ],
            }

            const result = compiler.compileMany({ data, context })

            expect(result).toEqual([
                { id: 1, chests: [{ id: 1, name: "Gold Chest" }] },
                { id: 2, chests: [{ id: 2, name: "Silver Chest" }] },
            ])
        })

        it("should pass through non-object items", () => {
            const data: Array<Record<string, any>> = [1 as any, "string" as any, { id: 1 }]
            const context = {}

            const result = compiler.compileMany({ data, context })

            expect(result).toEqual([1, "string", { id: 1 }])
        })
    })
})
