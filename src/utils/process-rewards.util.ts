import { DragonElement } from "@dchighs/dc-core"

import { RewardAcronym } from "../enums/reward-acronym.enum"
import { RewardType } from "../enums/reward-type.enum"
import { elementMap } from "./element-map.util"
import { isBlankObject } from "./is-blank-object"

type Reward = {
    egg?: number | number[]
    seeds?: {
        id: number
        amount: number
    }[]
    "pet_food_pack.s"?: number
    "pet_food_pack.m"?: number
    "pet_food_pack.l"?: number
    "pet_food_pack.xl"?: number
    b?: number | number[]
} & Omit<Partial<Record<RewardAcronym, number>>, "egg" | "seeds" | "b">

type ProcessedReward = {
    type: RewardType
    element?: DragonElement
    amount?: number
    chest_id?: number
    dragon_id?: number
    dragon_ids?: number[]
    building_id?: number
    orb_dragon_id?: number
    size?: string
}

const petFoodPackSizes = ["s", "m", "l", "xl"] as const

export function processRewards(rewards: Reward[]) {
    const filteredRewards = rewards.filter(reward => !isBlankObject(reward))
    const processedRewards: ProcessedReward[] = []

    for (const reward of filteredRewards) {
        if (isBlankObject(reward)) {
            continue
        }

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
                type: RewardType.Food,
                amount: reward.f,
            })
        }

        if (reward.b) {
            if (Array.isArray(reward.b)) {
                processedRewards.push({
                    type: RewardType.Building,
                    building_id: reward.b[0],
                })
            } else {
                processedRewards.push({
                    type: RewardType.Building,
                    building_id: reward.b,
                })
            }
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

        if (Object.keys(reward).some(key => petFoodPackSizes.some(size => key === `pet_food_pack.${size}`))) {
            for (const size of petFoodPackSizes) {
                const key = `pet_food_pack.${size}` as RewardAcronym

                if (key in reward) {
                    processedRewards.push({
                        type: RewardType.PetFoodPack,
                        size,
                        amount: reward[key] as number,
                    })
                }
            }

        }

        if (Object.keys(reward).some(key => key.startsWith("album_pack_aces."))) {
            const key = Object.keys(reward).find(key => key.startsWith("album_pack_aces."))
            const size = key?.split(".").pop()

            if (!size) {
                throw new Error("Invalid reward")
            }

            processedRewards.push({
                type: RewardType.AlbumPackAces,
                size: size,
                amount: reward[key as RewardAcronym] as number,
            })
        }
    }

    if (processedRewards.length < filteredRewards.length) {
        throw new Error(`Not processed correctly: ${JSON.stringify(rewards)} -> ${JSON.stringify(processedRewards)}`)
    }

    return processedRewards
}