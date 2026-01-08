import { GameConfigDto } from "@dchighs/dc-config"
import { Localization } from "@dchighs/dc-localization"
import { heroicRacesIslandSchema } from "../schemas/islands/heroic-races/island.schema"
import { heroicRacesRewardSchema } from "../schemas/islands/heroic-races/reward.schema"
import { heroicRacesEncounterSchema } from "../schemas/islands/heroic-races/encounter.schema"
import { heroicRacesEnemySchema } from "../schemas/islands/heroic-races/enemy.schema"
import { heroicRacesLapSchema } from "../schemas/islands/heroic-races/lap.schema"
import { heroicRacesMissionSchema } from "../schemas/islands/heroic-races/mission.schema"
import { heroicRacesNodeSchema } from "../schemas/islands/heroic-races/node.schema"

type HeroicRacesDto = GameConfigDto["game_data"]["config"]["heroic_races"]

export class HeroicRacesMapper {
    constructor(readonly localization: Localization) { }

    map(heroicRaces: HeroicRacesDto) {
        return {
            islands: heroicRaces.islands.map(island => this.localization.translate(heroicRacesIslandSchema.parse(island))),
            rewards: heroicRaces.rewards.map(reward => heroicRacesRewardSchema.parse(reward)),
            encounters: heroicRaces.encounters.map(encounter => heroicRacesEncounterSchema.parse(encounter)),
            enemies: heroicRaces.enemies.map(enemy => heroicRacesEnemySchema.parse(enemy)),
            lap_rewards: heroicRaces.lap_rewards,
            laps: heroicRaces.laps.map(lap => heroicRacesLapSchema.parse(lap)),
            missions: heroicRaces.missions.map(mission => heroicRacesMissionSchema.parse(mission)),
            nodes: heroicRaces.nodes.map(node => heroicRacesNodeSchema.parse(node)),
            nodes_position: heroicRaces.nodes_position,
            parameters: heroicRaces.parameters,
            spin_rewards: heroicRaces.spin_rewards,
        } satisfies Record<keyof HeroicRacesDto, any>
    }
}