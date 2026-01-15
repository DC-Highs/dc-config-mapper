import { z } from "zod"

import { numberToBoolean } from "../../../utils"

export const fogIslandsRewardSchema = z.object({
    id: z.number(),
    type: z.string(),
    island_id: z.number(),
    reward_id: z.number(),
    last_piece_cost: z.number(),
    num_pieces: z.number(),
    show_new_badge: z.number(),
}).strict().transform(data => {
    return {
        id: data.id,
        type: data.type,
        dragon_id: data.reward_id,
        last_piece_cost: data.last_piece_cost,
        num_pieces: data.num_pieces,
        show_new_badge: numberToBoolean(data.show_new_badge),
    }
})