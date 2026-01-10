import { z } from "zod"
import { processRewards } from "../../utils"

export const chestRewardSchema = z.object({
    id: z.number(),
    reward: z.object({
        resource: z.object({
            p_token: z.number().optional(),
            f: z.number().optional(),
            l_token: z.number().optional(),
            g: z.number().optional(),
            d_token: z.number().optional(),
            c: z.number().optional(),
            i_token: z.number().optional(),
            pr_token: z.number().optional(),
            pu_token: z.number().optional(),
            wr_token: z.number().optional(),
            e_token: z.number().optional(),
            f_token: z.number().optional(),
            w_token: z.number().optional(),
            el_token: z.number().optional(),
            m_token: z.number().optional(),
            li_token: z.number().optional(),
            ep: z.number().optional(),
            x: z.number().optional(),
        }).optional(),
        buildings: z.array(z.number()).optional(),
        eggs: z.array(z.number()).optional(),
        seeds: z.array(z.object({
            id: z.number(),
            amount: z.number(),
        })).optional(),
        moves: z.number().optional(),
        rarity_seeds: z.array(z.object({
            rarity: z.string(),
            amount: z.number(),
        })).optional(),
        skin: z.array(z.number()).optional(),
        battleground_keys: z.array(z.object({
            battleground_id: z.number(),
            key_id: z.number(),
            amount: z.number(),
        })).optional(),
    }),
    tier_multi: z.number(),
    weight: z.number(),
}).strict().transform((data) => {
    const reward = {
        resource: data.reward.resource ? processRewards([data.reward.resource])[0] : undefined,
        building_ids: data.reward.buildings,
        eggs_ids: data.reward.eggs,
        seeds: data.reward.seeds,
        moves: data.reward.moves,
        rarity_seeds: data.reward.rarity_seeds,
        skin_ids: data.reward.skin,
        battleground_keys: data.reward.battleground_keys,
    }

    return {
        id: data.id,
        reward: reward,
        tier_multi: data.tier_multi,
        weight: data.weight,
    }
})