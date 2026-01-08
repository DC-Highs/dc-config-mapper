import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config"

import { attackSchema } from "../schemas/skills/attack.schema"

export type SkillsDto = GameConfigDto["game_data"]["config"]["skills"]

export class SkillsMapper {
    constructor(readonly localization: Localization) {}

    map(data: SkillsDto) {
        return {
            skills: data.skills.map((skill) => this.localization.translate(skill)),
            attacks: data.attacks.map((attack) => this.localization.translate(attackSchema.parse(attack))),
            auras: data.auras.map((aura) => this.localization.translate(aura)),
            post: data.post.map((post) => this.localization.translate(post)),
            effects: data.effects.map((effect) => this.localization.translate(effect)),
            passive: data.passive.map((passive) => this.localization.translate(passive)),
            world_skills: data.world_skills.map((world_skill) => this.localization.translate(world_skill)),
            world_effects: data.world_effects.map((world_effect) => this.localization.translate(world_effect)),
            level_based_parameters: data.level_based_parameters.map((level_based_parameter) => this.localization.translate(level_based_parameter)),
        } satisfies Record<keyof SkillsDto, any>
    }
}