import path from "node:path"
import { z } from "zod"

/*
{
                    id: number;
                    analytics_id: string;
                    tid_name: string;
                    tutorial_id: number;
                    tutorial_claimable_cell_id: number;
                    board_size: Array<number>;
                    cell_size: Array<number>;
                    origin_offset: Array<number>;
                    initial_square_id: number;
                    pool_points: number;
                    pool_time: number;
                    initial_points: number;
                    start_ts: number;
                    end_ts: number;
                    currency_id: number;
                    min_level: number;
                    building_id: number;
                    building_position: Array<number>;
                    zip_file: string;
                    sound_tag: string;
                    canvas_assets_url: string;
                    background_plist: string;
                    foregrounds_plists: Array<any>;
                    particles_position: Array<number>;
                    tutorial_claim_cells: Array<number>;
                }
*/

export const fogIslandSchema = z.object({
    id: z.number(),
    analytics_id: z.string(),
    tid_name: z.string(),
    tutorial_id: z.number(),
    tutorial_claimable_cell_id: z.number(),
    board_size: z.array(z.number()),
    cell_size: z.array(z.number()),
    origin_offset: z.array(z.number()),
    initial_square_id: z.number(),
    pool_points: z.number(),
    pool_time: z.number(),
    initial_points: z.number(),
    start_ts: z.number(),
    end_ts: z.number(),
    currency_id: z.number(),
    min_level: z.number(),
    building_id: z.number(),
    building_position: z.array(z.number()),
    zip_file: z.string(),
    sound_tag: z.string(),
    canvas_assets_url: z.string(),
    background_plist: z.string(),
    foregrounds_plists: z.array(z.any()),
    particles_position: z.array(z.number()),
    tutorial_claim_cells: z.array(z.number()),
    // injected props
    square_ids: z.array(z.number()),
}).strict().transform(data => {
    return {
        id: data.id,
        availability: {
            from: new Date(data.start_ts * 1000).toISOString(),
            to: new Date(data.end_ts * 1000).toISOString(),
        },
        name_key: data.tid_name,
        board_size: {
            width: data.board_size[0],
            height: data.board_size[1],
        },
        cell_size: {
            width: data.cell_size[0],
            height: data.cell_size[1],
        },
        initial_square_id: data.initial_square_id,
        pool:{
            points: data.pool_points,
            time: data.pool_time,
        },
        initial_points: data.initial_points,
        currency_id: data.currency_id,
        min_level: data.min_level,
        zip_file_name: path.basename(data.zip_file),
        sound_tag: data.sound_tag,
        square_ids: data.square_ids,
    }
})