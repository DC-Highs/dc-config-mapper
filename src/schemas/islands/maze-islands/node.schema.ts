import { GameConfigDto } from "@dchighs/dc-config"
import { z } from "zod"

import { RewardResourceType } from "../../../enums/reward-resource-type"

type Reward = GameConfigDto["game_data"]["config"]["maze_island"]["rewards"][number]["reward"][number]

function processReward(reward: Reward) {
    if (reward?.f) {
        return {
            type: RewardResourceType.Food,
            amount: reward.f,
        }
    }

    if (reward?.g) {
        return {
            type: RewardResourceType.Gold,
            amount: reward.g,
        }
    }

    if (reward?.chest) {
        return {
            type: RewardResourceType.Chest,
            chest_id: reward.chest,
        }
    }

    if (reward?.b) {
        return {
            type: RewardResourceType.Building,
            building_id: reward.b,
        }
    }

    throw new Error(`Invalid reward: ${JSON.stringify(reward)}`)
}

export const mazeIslandsNodeSchema = z.object({
    id: z.number(),
    position: z.array(z.number()).length(2),
    cost: z.object({
        ep: z.number(),
    }).optional(),
    reward_id: z.number().optional(),
    reward: z.array(z.object({
        chest: z.number().optional(),
        b: z.number().optional(),
        f: z.number().optional(),
        g: z.number().optional(),
    })).optional(),
    highlighted: z.boolean().optional(),
    key: z.number().optional(),
    encounter: z.number().optional(),
    encounter_skip_cost: z.object({
        ep: z.number(),
    }).optional(),
}).strict().transform(data => {
    return {
        id: data.id,
        position: data.position,
        cost: data.cost ? {
            ep: data.cost.ep,
        } : undefined,
        reward_id: data.reward_id,
        reward: data.reward ? data.reward.map(processReward) : undefined,
        is_highlighted: data.highlighted,
        key_path_id: data.key,
        encounter_id: data.encounter,
        encounter_skip_cost: data.encounter_skip_cost?.ep,
    }
})
