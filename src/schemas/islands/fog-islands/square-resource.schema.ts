import { z } from "zod"

export const fogIslandsSquareResourceSchema = z.object({
    skin: z.number().optional(),
}).strict().transform(data => {
    return {
        skin_id: data.skin,
    }
})
