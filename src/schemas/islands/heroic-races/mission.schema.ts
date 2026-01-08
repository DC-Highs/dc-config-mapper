import { z } from "zod"

export const heroicRacesMissionSchema = z.object({
    id: z.number(),
    type: z.string(),
    goal_points: z.number(),
    price: z.number(),
    price_increment: z.number(),
    pool_size: z.number(),
    spawn_time: z.number(),
    collect_chance: z.number(),
    collect_chance_modifier: z.number(),
    encounter: z.number().optional(),
}).strict().transform(data => {
    return {
        id: data.id,
        type: data.type,
        goal_points: data.goal_points,
        price: data.price,
        price_increment: data.price_increment,
        pool_size: data.pool_size,
        spawn_time: {
            one: data.spawn_time,
            all: data.spawn_time * (data.goal_points - data.pool_size),
        },
        collect_chance: data.collect_chance,
        collect_chance_modifier: data.collect_chance_modifier,
        encounter_id: data.encounter,
    }
})