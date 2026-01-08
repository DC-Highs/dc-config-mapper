import { z } from "zod"

import { numberToBoolean } from "../../../utils"

export const mazeIslandsPathSchema = z.object({
    id: z.number(),
    color: z.array(z.number()).length(3),
    visibility: z.number(),
    dragon_type: z.number(),
    new_badge: z.number(),
    mobile_dragon_scale: z.number(),
    mobile_dragon_offset: z.array(z.number()),
    nodes: z.array(z.number()),
    availability: z.object({
        from: z.number(),
        to: z.number(),
    }).optional(),
}).strict().transform(data => {
    return {
        id: data.id,
        color: data.color,
        visibility: data.visibility,
        dragon_id: data.dragon_type,
        has_new_badge: numberToBoolean(data.new_badge),
        node_ids: data.nodes,
        availability: data.availability ? {
            from: new Date(data.availability.from).toISOString(),
            to: new Date(data.availability.to).toISOString(),
        } : undefined,
    }
})