import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config"

import { fogIslandSchema } from "../schemas/islands/fog-islands/island.schema"
import { fogIslandsSquareSchema } from "../schemas/islands/fog-islands/square.schema"
import { fogIslandsRewardSchema } from "../schemas/islands/fog-islands/reward.schema"

type FogIslandDto = GameConfigDto["game_data"]["config"]["fog_island"]

export class FogIslandsMapper {
    constructor(readonly localiztion: Localization) {}

    map(fogIslands: FogIslandDto) {
        return {
            islands: fogIslands.islands.map(island => {
                const squareIds = fogIslands.squares
                    .filter(square => square.island_id === island.id)
                    .map(square => square.id)

                return this.localiztion.translate(fogIslandSchema.parse({
                    ...island,
                    square_ids: squareIds,
                }))
            }),
            squares: fogIslands.squares.map(square => fogIslandsSquareSchema.parse(square)),
            currencies: fogIslands.currencies,
            rewards: fogIslands.rewards.map(reward => fogIslandsRewardSchema.parse(reward)),
            actions: fogIslands.actions,
            hints: fogIslands.hints,
            parameters: fogIslands.parameters,
        } satisfies Record<keyof FogIslandDto, any>
    }
}