import { z } from "zod"

import { processRewards } from "../../../utils"

export const runnerIslandsRewardSchema = z.object({
    id: z.number(),
    reward: z.array(z.object({
        chest: z.number().optional(),
        ep: z.number().optional(),
        egg: z.number().optional(),
        c: z.number().optional(),
        seeds: z.array(z.object({
            id: z.number(),
            amount: z.number(),
        })).optional(),
        f: z.number().optional(),
        g: z.number().optional(),
        en_runner: z.number().optional(),
        f_token: z.number().optional(),
        pu_token: z.number().optional(),
        i_token: z.number().optional(),
        wr_token: z.number().optional(),
        el_token: z.number().optional(),
        wd_token: z.number().optional(),
        m_token: z.number().optional(),
        w_token: z.number().optional(),
        pr_token: z.number().optional(),
        e_token: z.number().optional(),
        d_token: z.number().optional(),
        p_token: z.number().optional(),
        li_token: z.number().optional(),
        l_token: z.number().optional(),
    })),
    type_id: z.number(),
    double_with_video_ad: z.boolean().optional(),
    premium_rewards: z.array(z.number()).optional(),
    new_badge: z.array(z.number()).optional(),
}).strict().transform(data => {
    return {
        id: data.id,
        rewards: processRewards(data.reward),
        type_id: data.type_id,
        double_with_video_ad: data.double_with_video_ad,
        premium_rewards: data.premium_rewards,
        new_badge: data.new_badge,
    }
})
