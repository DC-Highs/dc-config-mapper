import { z } from "zod"

import { processRewards } from "../../../utils"

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
        reward: processRewards(data.rewards),
    }
})