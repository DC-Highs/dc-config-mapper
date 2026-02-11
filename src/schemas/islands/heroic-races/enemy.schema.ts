import { z } from "zod"

export const heroicRacesEnemySchema = z.object({
    id: z.number(),
    dragon_ids: z.array(z.coerce.number()),
    handicaps: z.array(z.number()),
    view_type: z.string(),
    elements_view_type: z.array(z.any()),
    cooldown: z.number(),
}).strict()