import { z } from "zod"

export const heroicRacesEncounterSchema = z.object({
    id: z.number(),
    enemies: z.array(z.number()),
    speed_up_price_per_hour: z.number(),
    fight_background_id: z.string(),
}).strict().transform(data => {
    return {
        id: data.id,
        enemy_ids: data.enemies,
        speed_up_price_per_hour: data.speed_up_price_per_hour,
        fight_background_id: data.fight_background_id,
    }
})