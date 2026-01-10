import path from "node:path"
import { z } from "zod"

export const towerIslandSchema = z.object({
    id: z.number(),
    analytics_id: z.string(),
    tid_name: z.string(),
    start_ts: z.number(),
    end_ts: z.number(),
    initial_square_id: z.number(),
    tutorial_id: z.number(),
    tutorial_die_result: z.number(),
    pool_size: z.number(),
    pool_time: z.number(),
    initial_points: z.number(),
    currency_id: z.number(),
    min_level: z.number(),
    building_id: z.number(),
    building_position: z.array(z.number()),
    tower_size: z.array(z.number()),
    zip_file: z.string(),
    sound_tag: z.string(),
    canvas_assets_url: z.string(),
    mobile_first_floor_position: z.array(z.number()),
    mobile_floor_height: z.number(),
    mobile_interior_wall_margin: z.number(),
    mobile_final_dragon_scale: z.array(z.number()),
    mobile_final_dragon_position: z.array(z.number()),
    mobile_final_dragon_info_position: z.array(z.number()),
    max_die_roll: z.number(),
    help_view_id: z.number(),
    active_platforms: z.object({
        ios: z.array(z.number()),
        canvas: z.array(z.number()),
        android: z.array(z.number()),
        amazon: z.array(z.number()),
        windows: z.array(z.number()),
    }),
    // injected properties
    square_ids: z.array(z.number()),
    floor_ids: z.array(z.number()),
    reward_ids: z.array(z.number()),
}).strict().transform(data => {
    return {
        id: data.id,
        name_key: data.tid_name,
        availability: {
            from: new Date(data.start_ts * 1000).toISOString(),
            to: new Date(data.end_ts * 1000).toISOString(),
        },
        initial_square_id: data.initial_square_id,
        pool: {
            size: data.pool_size,
            time: data.pool_time,
        },
        initial_points: data.initial_points,
        currency_id: data.currency_id,
        min_level: data.min_level,
        tower_size: data.tower_size,
        zip_file_name: path.basename(data.zip_file),
        sound_tag: data.sound_tag,
        max_die_roll: data.max_die_roll,
        help_view_id: data.help_view_id,
        square_ids: data.square_ids,
        floor_ids: data.floor_ids,
        reward_ids: data.reward_ids,
    }
})
    