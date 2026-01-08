import { z } from "zod"

import { numberToBoolean } from "../../utils/number-to-boolean"
import { elementMap } from "../../utils/element-map"
import { CostType } from "../../enums"

const processPrice = (priceObj: Record<string, number>) => {
    const keys = Object.keys(priceObj)

    if (keys.length === 0) return null

    if (keys.length > 1) {
        throw new Error(`Unexpected multiple price keys: ${JSON.stringify(priceObj)}`)
    }

    const key = keys[0]
    const amount = priceObj[key]

    const typeMap: Record<string, string> = {
        [CostType.Gold]: "gold",
        [CostType.Gem]: "gem",
    }

    if (!typeMap[key]) {
        throw new Error(`Unexpected price key: ${key}`)
    }

    return {
        type: typeMap[key],
        amount: amount,
    }
}

export const dragonSchema = z.object({
    id: z.number(),
    name: z.string(),
    group_type: z.string(),
    speed: z.number(),
    mobile_version: z.number(),
    android_version: z.number(),
    display_order: z.number(),
    hatching_time: z.number(),
    breeding_time: z.number(),
    xp: z.number(),
    lvl: z.number(),
    costs: z.object({
        g: z.number().optional(),
        c: z.number().optional(),
    }),
    sell_price: z.object({
        g: z.number(),
    }),
    starting_coins: z.number(),
    coins_added: z.number(),
    can_breed: z.number(),
    breedable: z.number(),
    deity_breeding: z.number(),
    difficulty: z.number(),
    category: z.number(),
    rarity: z.number(),
    dragon_rarity: z.string(),
    attacks: z.array(z.number()),
    attributes: z.array(z.string()),
    trainable_attacks: z.array(z.number()),
    upgrade_levels: z.array(z.number()),
    background_vfx: z.array(z.number()),
    foreground_vfx: z.array(z.number()),
    in_store: z.number(),
    in_store_min_level: z.number(),
    flying_level: z.number(),
    swim: z.number(),
    new_item: z.number(),
    img_name: z.string().optional(),
    img_name_mobile: z.string().optional(),
    img_name_android: z.string().optional(),
    giftable: z.number().optional(),
    gift_level: z.number(),
    description: z.string().optional(),
    seeds_to_summon: z.number(),
    hatching_time_10: z.number(),
    breeding_time_40: z.number(),
    breeding_time_10: z.number(),
    hatching_time_40: z.number(),
    base_attack: z.number(),
    base_life: z.number(),
    in_store_ch: z.number().optional(),
    costs_ch_1: z.object({
        g: z.number().optional(),
        c: z.number().optional(),
    }).optional(),
    costs_ch_2: z.object({
        g: z.number().optional(),
        c: z.number().optional(),
    }).optional(),
    hatching_time_reawaken: z.number(),
    breeding_time_reawaken: z.number(),
    hatching_time_ngu_aggressive: z.number(),
    breeding_time_ngu_aggressive: z.number(),
    hatching_time_ngu_soft: z.number(),
    breeding_time_ngu_soft: z.number(),
    dragon_ownership_id: z.number(),
    tags: z.array(z.string()).optional(),
    speed_override: z.number().optional(),
    passive_skills: z.array(z.number()).optional(),
    post_skills: z.array(z.number()).optional(),
}).strict().transform((data) => {
    return {
        id: data.id,
        name: data.name,
        name_key: `tid_unit_${data.id}_name`,
        rarity: data.dragon_rarity,
        elements: data.attributes.map(
            (element) => elementMap[element]
        ),
        description: data.description,
        description_key: `tid_unit_${data.id}_description`,
        buy_price: processPrice(data.costs),
        sell_price: processPrice(data.sell_price),
        is_breedable: numberToBoolean(data.breedable),
        can_breed: numberToBoolean(data.can_breed),
        is_in_store: numberToBoolean(data.in_store),
        min_store_level: data.in_store_min_level,
        basic_attack_ids: data.attacks,
        trainable_attack_ids: data.trainable_attacks,
        passive_skill_ids: data.passive_skills ?? null,
        post_skill_ids: data.post_skills ?? null,
        category: data.category,
        stats: {
            attack: data.base_attack,
            life: data.base_life,
            speed: data.speed,
            level: data.lvl,
            speed_override: data.speed_override,
        },
        timers: {
            hatching: {
                default: data.hatching_time,
                hatching_reawaken: data.hatching_time_reawaken,
                hatching_ngu_aggressive: data.hatching_time_ngu_aggressive,
                hatching_ngu_soft: data.hatching_time_ngu_soft,
            },
            breeding: {
                default: data.breeding_time,
                breeding_reawaken: data.breeding_time_reawaken,
                breeding_ngu_aggressive: data.breeding_time_ngu_aggressive,
                breeding_ngu_soft: data.breeding_time_ngu_soft,
            },
        },
        production: {
            coins_added: data.coins_added,
            starting_coins: data.starting_coins,
        },
        xp_on_hatch: data.xp,
        seeds_to_summon: data.seeds_to_summon,
        upgrade_phase_levels: data.upgrade_levels,
        image_names: {
            default: data.img_name ?? null,
            mobile: data.img_name_mobile ?? null,
            android: data.img_name_android ?? null,
        },
        tags: data.tags ?? [],
    }
})