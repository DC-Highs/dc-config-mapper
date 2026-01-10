import { z } from "zod"

import { processRewards } from "../../../utils"

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
        cost: data.cost?.ep ?? 0,
        rewards: data.reward ? processRewards(data.reward) : undefined,
        is_highlighted: data.highlighted,
        key_path_id: data.key,
        encounter_id: data.encounter,
        encounter_skip_cost: data.encounter_skip_cost?.ep ?? null,
    }
})
