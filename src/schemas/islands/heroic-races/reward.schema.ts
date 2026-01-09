import { GameConfigDto } from "@dchighs/dc-config"
import { z } from "zod"
import { RewardResourceType } from "../../../enums/reward-resource-type.enum"

type RewardItem = GameConfigDto["game_data"]["config"]["heroic_races"]["rewards"][number]["rewards"][number]

function processReward(reward: RewardItem) {
    if (reward.c) {
        return {
            type: RewardResourceType.Gem,
            amount: reward.c,
        }
    }

    if (reward.egg) {
        return {
            type: RewardResourceType.Dragon,
            dragon_ids: reward.egg,
        }
    }

    throw new Error(`Invalid reward: ${JSON.stringify(reward)}`)
}

export const heroicRacesRewardSchema = z.object({
    id: z.number(),
    positions: z.array(z.number()),
    rewards: z.array(
        z.object({
            egg: z.array(z.number()).optional(),
            c: z.number().optional(),
        })
    ),
}).strict().transform(data => {
    return {
        id: data.id,
        positions: data.positions,
        rewards: data.rewards.map(processReward),
    }
})