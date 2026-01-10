import { CostType } from "../enums"

export function processPrice(price: Record<string, number>) {
    const keys = Object.keys(price)

    if (keys.length === 0) return null

    if (keys.length > 1) {
        throw new Error(`Unexpected multiple price keys: ${JSON.stringify(price)}`)
    }

    const key = keys[0]
    const amount = price[key]

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