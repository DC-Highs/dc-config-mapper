import { z } from "zod"

import { numberToBoolean } from "../../../utils"

export const fogIslandsSquareSchema = z.object({
    id: z.number(),
    type: z.string(),
    type_id: z.number().optional(),
    highlight: z.number(),
    x: z.number(),
    y: z.number(),
    island_id: z.number(),
    claim_cost: z.number(),
    come_back_cost: z.number(),
    reward_id: z.number().optional(),
}).strict().transform(data => {
    return {
        id: data.id,
        type: data.type,
        reward: data.type === "NONE" || data.type === "STEP" ? null : {
            type: data.type,
            ...(data.type === "CHEST" ? {
                chest_id: data.type_id,
            } : {
                piece_dragon_id: data.type_id,
            })
        },
        is_highlight: numberToBoolean(data.highlight),
        x: data.x,
        y: data.y,
        cost: data.claim_cost,
        come_back_cost: data.come_back_cost,
        reward_id: data.reward_id,
    }
})