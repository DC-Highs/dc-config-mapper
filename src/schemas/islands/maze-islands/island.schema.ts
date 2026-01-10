import path from "node:path"
import { z } from "zod"

export const mazeIslandSchema = z.object({
    id: z.number(),
    tid_name: z.string(),
    name: z.string(),
    availability: z.object({
        from: z.number(),
        to: z.number(),
    }),
    paths: z.array(z.number()),
    happy_hours: z.array(z.any()),
    currency_id: z.number(),
    pool_size: z.number(),
    pool_time: z.number(),
    initial_points: z.number(),
    clouds: z.array(z.any()),
    cloud_radius: z.number(),
    dragon_radius: z.number(),
    min_level: z.number(),
    building_id: z.number(),
    mobile_tutorial_id: z.number(),
    tutorial_path_id: z.number(),
    tutorial_initial_camera_position: z.array(z.number()),
    tutorial_initial_zoom: z.number(),
    tutorial_final_zoom: z.number(),
    zip_file: z.string(),
    mobile_building_position: z.array(z.number()),
    active_platforms: z.object({
        ios: z.array(z.number()),
        android: z.array(z.number()),
        amazon: z.array(z.number()),
        canvas: z.array(z.number()),
        windows: z.array(z.number()),
    }),
    help_view_id: z.number(),
    sound_tag: z.string(),
}).strict().transform((data) => {
    return {
        id: data.id,
        name: data.name,
        name_key: data.tid_name,
        availability: {
            from: new Date(data.availability.from * 1000).toISOString(),
            to: new Date(data.availability.to * 1000).toISOString(),
        },
        path_ids: data.paths,
        currency_id: data.currency_id,
        pool: {
            size: data.pool_size,
            time: data.pool_time,
        },
        initial_points: data.initial_points,
        min_level: data.min_level,
        mobile_tutorial_id: data.mobile_tutorial_id,
        zip_file_name: path.basename(data.zip_file),
        sound_tag: data.sound_tag,
    }
})