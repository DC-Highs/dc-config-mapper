import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config"

import { gridIslandSchema } from "../schemas/islands/grid-islands/island.schema"
import { gridIslandsEpisodeSchema } from "../schemas/islands/grid-islands/episode.schema"
import { gridIslandsSquareSchema } from "../schemas/islands/grid-islands/square.schema"
import { gridIslandsDecorationSchema } from "../schemas/islands/grid-islands/decoration.schema"
import { gridIslandsEncounterSchema } from "../schemas/islands/grid-islands/encounter.schema"

type GridIslandsDto = GameConfigDto["game_data"]["config"]["grid_island"]

export class GridIslandsMapper {
    constructor(readonly localization: Localization) {}

    map(gridIslands: GridIslandsDto) {
        return {
            islands: gridIslands.islands.map(island => this.localization.translate(gridIslandSchema.parse(island))),
            episodes: gridIslands.episodes.map(episode => this.localization.translate(gridIslandsEpisodeSchema.parse(episode))),
            squares: gridIslands.squares.map(square => gridIslandsSquareSchema.parse(square)),
            decorations: gridIslands.decorations.map(decoration => gridIslandsDecorationSchema.parse(decoration)),
            encounters: gridIslands.encounters.map(encounter => gridIslandsEncounterSchema.parse(encounter)),
            enemies: gridIslands.enemies,
            currencies: gridIslands.currencies,
            actions: gridIslands.actions,
            parameters: gridIslands.parameters,
        } satisfies Record<keyof GridIslandsDto, any>
    }
}