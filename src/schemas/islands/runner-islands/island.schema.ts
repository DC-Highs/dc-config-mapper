import path from "node:path"
import { z } from "zod"

/*
{
                    id: number;
                    start_ts: number;
                    end_ts: number;
                    building_id: number;
                    building_position: Array<number>;
                    dragon_id: number;
                    dragon_offset: Array<number>;
                    dragon_scale: number;
                    runner_dragon_asset?: string;
                    zip_file: string;
                    help_id: number;
                    run_cost: number;
                    sound_tag: string;
                    mission_pool: Array<number>;
                    sections: Array<number>;
                    building_tooltip_position: Array<number>;
                    building_timer_position: Array<number>;
                    milestone_rewards: Array<number>;
                }
*/

export const runnerIslandSchema = z.object({
    id: z.number(),
    start_ts: z.number(),
    end_ts: z.number(),
    building_id: z.number(),
    building_position: z.array(z.number()),
    dragon_id: z.number(),
    dragon_offset: z.array(z.number()),
    dragon_scale: z.number(),
    runner_dragon_asset: z.string().optional(),
    zip_file: z.string(),
    help_id: z.number(),
    run_cost: z.number(),
    sound_tag: z.string(),
    mission_pool: z.array(z.number()),
    sections: z.array(z.number()),
    building_tooltip_position: z.array(z.number()),
    building_timer_position: z.array(z.number()),
    milestone_rewards: z.array(z.number()),
}).strict().transform(data => {
    return {
        id: data.id,
        availability: {
            from: new Date(data.start_ts * 1000).toISOString(),
            to: new Date(data.end_ts * 1000).toISOString(),
        },
        name_key: `tid_runner_island_${data.id}_title`,
        sound_tag: data.sound_tag,
        zip_file_name: path.basename(data.zip_file),
        run_cost: data.run_cost,
        mission_pool_ids: data.mission_pool,
        milestone_reward_ids: data.milestone_rewards,
    }
})