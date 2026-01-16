import { z } from "zod"

export const runnerIslandsMissionPoolSchema = z.object({
    id: z.number(),
    buy_all_discounts: z.number(),
    missions: z.array(z.number()),
    price: z.number(),
    price_increment: z.number()
}).strict().transform(data => {
    return {
        id: data.id,
        buy_all_discounts: data.buy_all_discounts,
        mission_ids: data.missions,
        price: data.price,
        price_increment: data.price_increment
    }
})