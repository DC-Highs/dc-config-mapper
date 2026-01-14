import { z } from "zod"

export const gridIslandsSquareSchema = z.object({
    id: z.number(),
    type: z.string(),
    type_id: z.number().optional(),
    highlight: z.number(),
    x: z.number(),
    y: z.number(),
    island_id: z.number(),
    episode_id: z.number(),
    claim_cost: z.number(),
    wall: z.string().optional(),
    wall_suffix: z.string().optional()
}).strict().transform(data => {
    return {
        id: data.id,
        type: data.type,
        reward: data.type === "NONE" ? null : {
            type: data.type.toLowerCase(),
            ...(data.type === "CHEST" ? {
                chest_id: data.type_id,
            } : {
                dragon_id: data.type_id,
            })
        },
        highlight: data.highlight,
        x: data.x,
        y: data.y,
        claim_cost: data.claim_cost,
        wall: data.wall,
        wall_suffix: data.wall_suffix,
    }
})