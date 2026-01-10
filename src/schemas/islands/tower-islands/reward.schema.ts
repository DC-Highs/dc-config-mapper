import { z } from "zod"

import { numberToBoolean } from "../../../utils"

export const towerIslandsRewardSchema = z.object({
    id: z.number(),
    dragon_reward_id: z.number(),
    last_piece_cost: z.number(),
    num_pieces: z.number(),
    show_new_badge: z.number(),
    area: z.number(),
    island_id: z.number(),
}).strict().transform(data => {
    return {
        id: data.id,
        dragon_id: data.dragon_reward_id,
        last_piece_cost: data.last_piece_cost,
        pieces_count: data.num_pieces,
        show_new_badge: numberToBoolean(data.show_new_badge),
        area: data.area,
    }
})