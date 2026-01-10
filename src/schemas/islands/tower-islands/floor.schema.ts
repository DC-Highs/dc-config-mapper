import { z } from "zod"

import { numberToBoolean } from "../../../utils"

export const towerIslandsFloorSchema = z.object({
    id: z.number(),
    y: z.number(),
    x_flip: z.number(),
    floor_image: z.string(),
    area: z.number(),
    roll_die_price: z.object({
        ep: z.number(),
    }),
    island_id: z.number(),
}).strict().transform(data => {
    return {
        id: data.id,
        y: data.y,
        x_flip: numberToBoolean(data.x_flip),
        floor_image: data.floor_image,
        area: data.area,
        roll_die_price: data.roll_die_price.ep,
    }
})