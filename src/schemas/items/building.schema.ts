import { z } from "zod"

import { numberToBoolean } from "../../utils"
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

export const buildingSchema = z.object({
    id: z.number(),
    name: z.string(),
    group_type: z.string(),
    name_key: z.string().optional(),
    animated: z.number(),
    build_time: z.number(),
    mobile_version: z.number(),
    android_version: z.number(),
    show_on_mobile: z.number(),
    type: z.string(),
    element_type: z.string().optional(),
    xp: z.number(),
    min_level: z.number(),
    costs: z.object({
        c: z.number().optional(),
        g: z.number().optional(),
    }),
    display_order: z.number(),
    boost_modifier: z.number(),
    gift_level: z.number(),
    giftable: z.number(),
    cost_unit_cash: z.number().optional(),
    collect: z.number(),
    collect_xp: z.number().optional(),
    category_id: z.number(),
    subcategory_id: z.number(),
    building_limit_same_id: z.number(),
    in_store: z.number(),
    width: z.number(),
    height: z.number(),
    new_item: z.number(),
    img_name: z.string(),
    img_name_mobile: z.string(),
    img_name_android: z.string(),
    activation: z.number(),
    upgrades_to: z.number(),
    collect_type: z.any(),
    velocity: z.number(),
    description: z.string().optional(),
    properties: z.object({
        capacity: z.number().optional(),
        incubator: z.number().optional(),
        bulldozable: z.number().optional(),
        max_dragon_level: z.number().optional(),
        required_items: z.array(z.number()).optional(),
        workingBuilding: z.number().optional(),
        breeding: z.number().optional(),
        breeding_factor: z.number().optional(),
        max_gold: z.number().optional(),
        friend_assistable: z.number().optional(),
        upgrade_from: z.number().optional(),
        floating: z.number().optional(),
        fixed_position: z.array(z.number()).optional(),
        is_fixed: z.number().optional(),
        crosspromotion: z.number().optional(),
        ft_flying: z.number().optional(),
    }),
    building_ownership_id: z.number(),
    sell_price: z.object({
        g: z.number().optional(),
    }).optional(),
    inventory_ids: z.number().optional(),
}).strict().transform((data) => {
    return {
        id: data.id,
        name: data.name,
        name_key: data.name_key,
        animated: numberToBoolean(data.animated),
        build_time: data.build_time,
        type: data.type,
        element_type: data.element_type,
        xp_on_build: data.xp,
        min_level: data.min_level,
        buy_price: processPrice(data.costs),
        display_order: data.display_order,
        boost_modifier: data.boost_modifier,
        cost_unit_cash: data.cost_unit_cash,
        collect: data.collect,
        collect_xp: data.collect_xp,
        category_id: data.category_id,
        subcategory_id: data.subcategory_id,
        building_limit_same_id: data.building_limit_same_id,
        in_store: numberToBoolean(data.in_store),
        width: data.width,
        height: data.height,
        new_item: numberToBoolean(data.new_item),
        imageNames: {
            default: data.img_name,
            mobile: data.img_name_mobile,
            android: data.img_name_android,
        },
        activation: data.activation,
        upgrades_to: data.upgrades_to,
        collect_type: data.collect_type,
        velocity: data.velocity,
        description: data.description,
        properties: data.properties,
        building_ownership_id: data.building_ownership_id,
        sell_price: data.sell_price ? processPrice(data.sell_price) : null,
        inventory_ids: data.inventory_ids,
    }
})