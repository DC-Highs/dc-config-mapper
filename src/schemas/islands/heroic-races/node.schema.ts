import { z } from "zod"

export const heroicRacesNodeSchema = z.object({
    id: z.number(),
    buy_all_discount: z.number(),
    missions: z.array(z.number()),
}).strict().transform(data => {
    return {
        id: data.id,
        buy_all_discount: data.buy_all_discount,
        mission_ids: data.missions,
    }
})