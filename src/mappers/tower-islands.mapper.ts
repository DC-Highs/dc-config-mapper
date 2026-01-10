import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config"

import { towerIslandSchema } from "../schemas/islands/tower-islands/island.schema"
import { towerIslandsSquareSchema } from "../schemas/islands/tower-islands/square.schema"
import { towerIslandsFloorSchema } from "../schemas/islands/tower-islands/floor.schema"
import { towerIslandsRewardSchema } from "../schemas/islands/tower-islands/reward.schema"

export type TowerIslandsDto = GameConfigDto["game_data"]["config"]["tower_island"]

export class TowerIslandsMapper {
    constructor(readonly localization: Localization) {}

    map(data: TowerIslandsDto) {
        return {
            islands: data.islands.map(island => {
                const squareIds = data.squares.filter(square => square.island_id === island.id).map(square => square.id)
                const floorIds = data.floors.filter(floor => floor.island_id === island.id).map(floor => floor.id)
                const rewardIds = data.rewards.filter(reward => reward.island_id === island.id).map(reward => reward.id)

                return this.localization.translate(
                    towerIslandSchema.parse({
                        ...island,
                        square_ids: squareIds,
                        floor_ids: floorIds,
                        reward_ids: rewardIds,
                    })
                )
            }),
            floors: data.floors.map(floor => this.localization.translate(towerIslandsFloorSchema.parse(floor))),
            squares: data.squares.map(square => this.localization.translate(towerIslandsSquareSchema.parse(square))),
            rewards: data.rewards.map(reward => this.localization.translate(towerIslandsRewardSchema.parse(reward))),
            happy_hours: data.happy_hours.map(happyHour => this.localization.translate(happyHour)),
            parameters: data.parameters.map(parameter => this.localization.translate(parameter)),
            currencies: data.currencies.map(currency => this.localization.translate(currency)),
            actions: data.actions.map(action => this.localization.translate(action)),
        } satisfies Record<keyof TowerIslandsDto, any>
    }
}