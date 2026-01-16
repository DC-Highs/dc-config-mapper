import { z } from "zod"

import { numberToBoolean } from "../../../utils"

export const runnerIslandsMilestoneRewardSchema = z.object({
    id: z.number(),
    points: z.number(),
    reward_id: z.number(),
    highlighted: z.number(),
    focused: z.number()
}).strict().transform(data => {
    return {
        id: data.id,
        points: data.points,
        reward_id: data.reward_id,
        is_highlight: numberToBoolean(data.highlighted),
        is_focused: numberToBoolean(data.focused),
    }
})