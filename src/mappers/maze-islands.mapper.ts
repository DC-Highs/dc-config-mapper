import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config" 

import { mazeIslandsPathSchema } from "../schemas/islands/maze-islands/path.schema"
import { mazeIslandsNodeSchema } from "../schemas/islands/maze-islands/node.schema"
import { mazeIslandSchema } from "../schemas/islands/maze-islands/island.schema"

export type MazeIslandsDto = GameConfigDto["game_data"]["config"]["maze_island"]

export class MazeIslandsMapper {
    constructor(readonly localization: Localization) {}

    map(data: MazeIslandsDto) {
        return {
            actions: data.actions,
            clouds: data.clouds,
            currencies: data.currencies,
            happy_hours: data.happy_hours,
            paths: data.paths.map(path => this.localization.translate(mazeIslandsPathSchema.parse(path))),
            rewards: data.rewards,
            rewards_config: data.rewards_config,
            rewards_tiers: data.rewards_tiers,
            encounters: data.encounters,
            enemies: data.enemies,
            islands: data.islands.map(island => this.localization.translate(mazeIslandSchema.parse(island))),
            nodes: data.nodes.map(node => this.localization.translate(mazeIslandsNodeSchema.parse(node))),
            parameters: data.parameters,
        } satisfies Record<keyof MazeIslandsDto, any>
    }
}