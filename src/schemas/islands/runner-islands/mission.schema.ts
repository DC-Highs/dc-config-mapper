import { z } from "zod"

import { runnerIslandsMissionNameMap } from "../../../utils/runner-islands-mission-name-map.util"

export const runnerIslandsMissionSchema = z.object({
    id: z.number(),
    type: z.string(),
    goal_points: z.number(),
    price: z.number(),
    price_increment: z.number(),
    pool_size: z.number(),
    spawn_time: z.number(),
    collect_chance: z.number(),
    collect_chance_modifier: z.number(),
    energy: z.number(),
}).strict().transform(data => {
    return {
        id: data.id,
        type: data.type,
        name_key: runnerIslandsMissionNameMap[data.type],
        goal_points: data.goal_points,
        price: data.price,
        price_increment: data.price_increment,
        pool_size: data.pool_size,
        spawn_time: data.spawn_time,
        collect_chance: data.collect_chance,
        collect_chance_modifier: data.collect_chance_modifier,
        points: data.energy,
    }
})