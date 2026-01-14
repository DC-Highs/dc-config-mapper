import { GameConfigDto } from "@dchighs/dc-config"

type Square = GameConfigDto["game_data"]["config"]["grid_island"]["squares"][number]

type Decoration = GameConfigDto["game_data"]["config"]["grid_island"]["decorations"][number]

type Board = `${number},${number}`[]

type resolveGridDecorationpositionsOptions = {
    squares: Square[]
    decorations: Decoration[]
    boardSize: {
        width: number
        height: number
    }
}

type DecorationPosition = `${number},${number}`

export function resolveGridDecorationPositions({ squares, decorations, boardSize }: resolveGridDecorationpositionsOptions) {
    const squaresBoard: Board = []

    for (const square of squares) {
        squaresBoard.push(`${square.x},${square.y}`)
    }

    const decorationPositions: DecorationPosition[] = []
    const resolvedDecorations: typeof decorations = []

    for (let x = 1; x < boardSize.width + 1; x++) {
        for (let y = 1; y < boardSize.height + 1; y++) {
            if (!squaresBoard.includes(`${x},${y}`)) {
                decorationPositions.push(`${x},${y}`)
            }
        }
    }

    if (decorationPositions.length !== decorations.length) {
        throw new Error("Number of decoration positions does not match number of decorations")
    }

    for (let i = 0; i < decorations.length; i++) {
        const decorationPosition = decorationPositions[i]
        const [x, y] = decorationPosition.split(",").map(Number)

        resolvedDecorations.push({
            ...decorations[i],
            x: x,
            y: y
        })
    }

    return resolvedDecorations
}