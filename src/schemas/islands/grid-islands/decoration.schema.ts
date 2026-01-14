import { z } from "zod"

export const gridIslandsDecorationSchema = z.object({
    id: z.number(),
    file: z.string(),
    x: z.number(),
    y: z.number(),
    island_id: z.number(),
    episode_id: z.number(),
}).strict().transform(data => {
    return {
        id: data.id,
        filename: data.file,
        x: data.x,
        y: data.y,
        island_id: data.island_id,
        episode_id: data.episode_id,
    }
})