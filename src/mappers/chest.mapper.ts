import { Translated } from "@dchighs/dc-localization/dist/types"
import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config"
import { z } from "zod"

import { chestSchema } from "../schemas/chests/chest.schema"

type Reward = GameConfigDto["game_data"]["config"]["chests"]["rewards"][number]

export class ChestsMapper {
    constructor(readonly localization: Localization) {}

    private resolveRewards(rewardIds: number[], rewards: Reward[]) {
        return rewardIds.map(rewardId => {
            const reward = rewards.find(reward => reward.id === rewardId)

            if (!reward) {
                throw new Error(`Reward ${rewardId} not found`)
            }

            return reward
        })
    }

    map(chestsConfig: GameConfigDto["game_data"]["config"]["chests"]) {
        const { chests, rewards } = chestsConfig
        const mappedChests: Translated<z.infer<typeof chestSchema>>[] = []

        for (const chest of chests) {
            const chestRewardIds = chest.rewards
            const chestRewards = this.resolveRewards(chestRewardIds, rewards)

            const mappedChest = this.localization.translate(
                chestSchema.parse({
                    ...chest,
                    rewards: chestRewards,
                })
            )

            mappedChests.push(mappedChest)
        }

        return mappedChests
    }
}