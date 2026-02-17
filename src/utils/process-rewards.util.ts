import { DragonElement } from "@dchighs/dc-core"

import { RewardAcronym } from "../enums/reward-acronym.enum"
import { RewardType } from "../enums/reward-type.enum"
import { elementMap } from "./element-map.util"

type Reward = {
    egg?: number | number[]
    seeds?: {
        id: number
        amount: number
    }[]
} & Omit<Partial<Record<RewardAcronym, number>>, "egg" | "seeds">

type ProcessedReward = {
    type: RewardType
    element?: DragonElement
    amount?: number
    chest_id?: number
    dragon_id?: number
    dragon_ids?: number[]
    building_id?: number
    orb_dragon_id?: number
}

export function processRewards(rewards: Reward[]) {
    const processedRewards: ProcessedReward[] = []

    for (const reward of rewards) {
        if (reward.chest) {
            processedRewards.push({
                type: RewardType.Chest,
                chest_id: reward.chest,
            })
        }

        if (reward.egg) {
            if (Array.isArray(reward.egg)) {
                processedRewards.push({
                    type: RewardType.Dragon,
                    dragon_ids: reward.egg,
                })
            } else {
                processedRewards.push({
                    type: RewardType.Dragon,
                    dragon_id: reward.egg,
                })
            }
        }

        if (reward.g) {
            processedRewards.push({
                type: RewardType.Gold,
                amount: reward.g,
            })
        }

        if (reward.c) {
            processedRewards.push({
                type: RewardType.Gem,
                amount: reward.c,
            })
        }

        if (reward.f) {
            processedRewards.push({
                type: RewardType.Gem,
                amount: reward.c,
            })
        }

        if (reward.b) {
            processedRewards.push({
                type: RewardType.Building,
                building_id: reward.b,
            })
        }

        if (reward.ep) {
            processedRewards.push({
                type: RewardType.EventPoints,
                amount: reward.ep,
            })
        }

        if (reward.seeds) {
            for (const seed of reward.seeds) {
                processedRewards.push({
                    type: RewardType.DragonOrbs,
                    orb_dragon_id: seed.id,
                    amount: seed.amount,
                })
            }
        }

        if (reward.en_runner) {
            processedRewards.push({
                type: RewardType.RunnerIslandEnergy,
                amount: reward.en_runner,
            })
        }

        if (Object.keys(reward).some(key => key.endsWith("_token"))) {
            const key = Object.keys(reward).find(key => key.endsWith("_token"))
            const elementAcronym = key?.split("_")[0]

            if (!elementAcronym) {
                throw new Error("Invalid reward")
            }

            processedRewards.push({
                type: RewardType.HabitatToken,
                element: elementMap[elementAcronym],
                amount: reward[key as RewardAcronym] as number,
            })
        }
    }

    if (processedRewards.length !== rewards.length) {
        throw new Error(`No rewards found: ${JSON.stringify(rewards)}`)
    }

    return processedRewards
}