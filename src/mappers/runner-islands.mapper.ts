import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config"

import { runnerIslandSchema } from "../schemas/islands/runner-islands/island.schema"
import { runnerIslandsMissionSchema } from "../schemas/islands/runner-islands/mission.schema"
import { runnerIslandsRewardSchema } from "../schemas/islands/runner-islands/reward.schema"
import { runnerIslandsMilestoneRewardSchema } from "../schemas/islands/runner-islands/milestone-reward.schema"
import { runnerIslandsMissionPoolSchema } from "../schemas/islands/runner-islands/mission-pool.schema"

type RunnerIslandDto = GameConfigDto["game_data"]["config"]["runner_island"]

export class RunnerIslandsMapper {
    constructor(readonly localization: Localization) {}

    map(runnerIslands: RunnerIslandDto) {
        return {
            islands: runnerIslands.islands.map(island => this.localization.translate(runnerIslandSchema.parse(island))),
            sections: runnerIslands.sections,
            parameters: runnerIslands.parameters,
            obstacles: runnerIslands.obstacles,
            level_chunks: runnerIslands.level_chunks,
            level_rewards: runnerIslands.level_rewards,
            missions: runnerIslands.missions.map(mission => this.localization.translate(runnerIslandsMissionSchema.parse(mission))),
            rewards: runnerIslands.rewards.map(reward => runnerIslandsRewardSchema.parse(reward)),
            rewards_config: runnerIslands.rewards_config,
            rewards_tiers: runnerIslands.rewards_tiers,
            milestones: runnerIslands.milestones,
            milestone_rewards: runnerIslands.milestone_rewards.map(reward => runnerIslandsMilestoneRewardSchema.parse(reward)),
            mission_pools: runnerIslands.mission_pool.map(missionPool => runnerIslandsMissionPoolSchema.parse(missionPool)),
        } satisfies Omit<Record<keyof RunnerIslandDto, any>, "mission_pool"> & { mission_pools: any }
    }
}