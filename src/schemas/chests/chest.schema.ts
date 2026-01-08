import { z } from "zod"

import { chestRewardSchema } from "./reward.schema"

export const chestSchema = z.object({
    id: z.number(),
    type: z.string(),
    rewards: z.array(chestRewardSchema),
    img_name: z.string(),
    chest_name_key: z.string(),
    type_name_key: z.string(),
    level_tiers: z.array(z.number()),
    description_key: z.string().optional(),
    default_reward: z.number(),
    pool_size: z.number(),
    gatcha_ids: z.array(z.number()).optional(),
    instant: z.any(),
}).strict().transform((data) => {
    return {
        id: data.id,
        type: data.type,
        rewards: data.rewards,
        image_name: data.img_name,
        name_key: data.chest_name_key,
        type_name_key: data.type_name_key,
        level_tier_ids: data.level_tiers,
        description_key: data.description_key,
        default_reward_id: data.default_reward,
        pool_size: data.pool_size,
        gatcha_ids: data.gatcha_ids,
    }
})