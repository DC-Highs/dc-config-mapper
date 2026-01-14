import { z } from "zod"

export const gridIslandsEpisodeSchema = z.object({
    id: z.number(),
    island_id: z.number(),
    board_size: z.array(z.number()),
    initial_square_id: z.number(),
    final_square_id: z.number(),
    tid_title: z.string(),
    mobile_begin_tutorial_id: z.number(),
    mobile_end_tutorial_id: z.number(),
    canvas_background: z.string(),
    backgrounds: z.array(z.string()),
    background_plist: z.string(),
    foregrounds: z.array(z.any()),
    foregrounds_plists: z.array(z.any()),
    squares: z.array(z.number()),
    // injected props
    decoration_ids: z.array(z.number())
}).strict().transform((data) => {
    return {
        id: data.id,
        board_size: {
            width: data.board_size[0],
            height: data.board_size[1],
        },
        initial_square_id: data.initial_square_id,
        final_square_id: data.final_square_id,
        name_key: data.tid_title,
        square_ids: data.squares,
        decoration_ids: data.decoration_ids,
    }
})
