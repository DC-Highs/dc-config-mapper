import { z } from "zod"

import { elementMap } from "../../utils/element-map"

export const attackSchema = z.object({
    id: z.number(),
    name: z.string(),
    name_key: z.string(),
    type: z.string(),
    element: z.string(),
    damage: z.number(),
    ui_damage: z.number(),
    effect_atk: z.string().optional(),
    effect_def: z.string(),
    effect_sfx: z.number(),
    training_time: z.number(),
    button_style: z.number(),
    special_icon: z.number(),
    skill_id: z.number().optional(),
}).strict().transform(data => {
    return {
        id: data.id,
        name: data.name,
        name_key: data.name_key,
        element: elementMap[data.element],
        damage: data.damage,
        ui_damage: data.ui_damage,
        effect_atk: data.effect_atk,
        effect_def: data.effect_def,
        effect_sfx: data.effect_sfx,
        training_time: data.training_time,
        button_style: data.button_style,
        special_icon: data.special_icon,
        skill_id: data.skill_id,
    }
})