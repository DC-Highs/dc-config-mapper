import { z } from "zod"

export const heroicRacesLapSchema = z.object({
    id: z.number(),
    nodes: z.array(z.number()),
}).strict().transform(data => {
    return {
        id: data.id,
        node_ids: data.nodes,
    }
})