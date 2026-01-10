import { z } from "zod"

import { numberToBoolean } from "../../../utils"

/*
{
                    id: number;
                    type: string;
                    highlight: number;
                    x: number;
                    y: number;
                    island_id: number;
                    ixy: string;
                    rewards_array?: Array<{
                        chest?: number;
                        egg?: number;
                    }>;
                    wall?: string;
                    catapult_destination_square_id?: number;
                    piece_reward_id?: number;
                }
*/

export const towerIslandsSquareSchema = z.object({
    id: z.number(),
    type: z.string(),
    highlight: z.number(),
    x: z.number(),
    y: z.number(),
    island_id: z.number(),
    ixy: z.string(),
    rewards_array: z.array(
        z.object({
            chest: z.number().optional(),
            egg: z.number().optional(),
        })
    ).optional(),
    wall: z.string().optional(),
    catapult_destination_square_id: z.number().optional(),
    piece_reward_id: z.number().optional(),
}).strict().transform(data => {
    return {
        id: data.id,
        type: data.type,
        is_highlight: numberToBoolean(data.highlight),
        x: data.x,
        y: data.y,
        ixy: data.ixy,
        rewards: data.rewards_array,
        wall: data.wall,
        catapult_destination_square_id: data.catapult_destination_square_id,
        piece_reward_id: data.piece_reward_id,
    }
})