import { Localization } from "@dchighs/dc-localization"
import { GameConfigDto } from "@dchighs/dc-config"
import { groupBy } from "lodash"

import { recordKeysConversor } from "../utils"
import { RestructuredItemsDto } from "../dtos/items"
import { dragonSchema } from "../schemas/items/dragon.schema"
import { buildingSchema } from "../schemas/items/building.schema"

export class ItemsMapper {
    constructor(readonly localization: Localization) { }

    map(items: GameConfigDto["game_data"]["config"]["items"]) {
        const result = recordKeysConversor.replace({
            oldString: " ",
            newString: "_",
            object: recordKeysConversor.toPlural(
                recordKeysConversor.toLowerCase(
                    groupBy(items, "group_type")
                )
            )
        }) as RestructuredItemsDto

        for (const groupType in result) {
            const items = result[groupType as keyof typeof result]

            for (const item of items) {
                if (!("name_key" in item) && ["BUILDING", "BOOSTER", "FARM", "DECO", "HABITAT", "OBSTACLE", "LAND", "SOCIAL BUILDING", "KINDERGARTEN", "LOSTITEM", "CROSSPROMOTION", "PROMOISLAND", "COLLECTISLAND", "DRAGONARIUM", "ATREZZO", "MISTERY_EGG", "PROMO", "UNIT", "POPUP", "DEUSISLAND", "CHESTCONTAINER", "HALLOWEEN_ISLAND", "DWPORTAL", "PROGRESSIVE_ISLAND", "MEME_GENERATOR", "MAGE_SHRINE", "GD_TOWER", "GRID_ISLAND", "CUM_CALENDAR_ISLAND", "TRADER_ISLAND", "DRAGON_CINEMA", "FOG_ISLAND", "HEROIC_RACE", "MAZE_ISLAND", "TOWER_ISLAND", "EVENT_ISLAND", "TREE_OF_LIFE", "ALLIANCE_PORTAL", "BURROW", "COLLECTIBLE", "GREENHOUSE", "BREEDING_ISLAND", "DRAGON_OBSTACLE", "ORB_HABITAT", "WIZARDS_CAVE", "TEASER_ISLAND", "BRAND_DECO"].includes(groupType)) {
                    item["name_key"] = `tid_building_${item.id}_name`
                }
            }
        }

        return {
            alliance_portals: result.alliance_portals.map(portal => this.localization.translate(portal)),
            buildings: result.buildings.map(building => this.localization.translate(buildingSchema.parse(building))),
            boosters: result.boosters.map(booster => this.localization.translate(booster)),
            collectibles: result.collectibles.map(collectible => this.localization.translate(collectible)),
            collectislands: result.collectislands.map(collect_island => this.localization.translate(collect_island)),
            farms: result.farms.map(farm => this.localization.translate(farm)),
            habitats: result.habitats.map(habitat => this.localization.translate(habitat)),
            alliance_races: result.alliance_races.map(alliance_race => this.localization.translate(alliance_race)),
            crosspromotions: result.crosspromotions.map(crosspromotion => this.localization.translate(crosspromotion)),
            atrezzos: result.atrezzos.map(atrezzo => this.localization.translate(atrezzo)),
            brand_decos: result.brand_decos.map(brand_deco => this.localization.translate(brand_deco)),
            breeding_islands: result.breeding_islands.map(breeding_island => this.localization.translate(breeding_island)),
            burrows: result.burrows.map(burrow => this.localization.translate(burrow)),
            chestcontainers: result.chestcontainers.map(chestcontainer => this.localization.translate(chestcontainer)),
            collectors_hunts: result.collectors_hunts.map(collector_hunt => this.localization.translate(collector_hunt)),
            cum_calendar_islands: result.cum_calendar_islands.map(cum_calendar_island => this.localization.translate(cum_calendar_island)),
            decos: result.decos.map(deco => this.localization.translate(deco)),
            deusislands: result.deusislands.map(deusisland => this.localization.translate(deusisland)),
            dragon_cinemas: result.dragon_cinemas.map(dragon_cinema => this.localization.translate(dragon_cinema)),
            dragon_obstacles: result.dragon_obstacles.map(dragon_obstacle => this.localization.translate(dragon_obstacle)),
            dragon_pets: result.dragon_pets.map(dragon_pet => this.localization.translate(dragon_pet)),
            dragon_trails: result.dragon_trails.map(dragon_trail => this.localization.translate(dragon_trail)),
            dragon_tvs: result.dragon_tvs.map(dragon_tv => this.localization.translate(dragon_tv)),
            dragonariums: result.dragonariums.map(dragonarium => this.localization.translate(dragonarium)),
            dwportals: result.dwportals.map(dwportal => this.localization.translate(dwportal)),
            event_islands: result.event_islands.map(event_island => this.localization.translate(event_island)),
            fog_islands: result.fog_islands.map(fog_island => this.localization.translate(fog_island)),
            greenhouses: result.greenhouses.map(greenhouse => this.localization.translate(greenhouse)),
            gd_towers: result.gd_towers.map(gd_tower => this.localization.translate(gd_tower)),
            grid_islands: result.grid_islands.map(grid_island => this.localization.translate(grid_island)),
            halloween_islands: result.halloween_islands.map(halloween_island => this.localization.translate(halloween_island)),
            heroic_races: result.heroic_races.map(heroic_race => this.localization.translate(heroic_race)),
            kindergartens: result.kindergartens.map(kindergarten => this.localization.translate(kindergarten)),
            lands: result.lands.map(land => this.localization.translate(land)),
            lostitems: result.lostitems.map(lostitem => this.localization.translate(lostitem)),
            mage_shrines: result.mage_shrines.map(mage_shrine => this.localization.translate(mage_shrine)),
            maze_islands: result.maze_islands.map(maze_island => this.localization.translate(maze_island)),
            meme_generators: result.meme_generators.map(meme_generator => this.localization.translate(meme_generator)),
            mistery_eggs: result.mistery_eggs.map(mistery_egg => this.localization.translate(mistery_egg)),
            orb_habitats: result.orb_habitats.map(orb_habitat => this.localization.translate(orb_habitat)),
            obstacles: result.obstacles.map(obstacle => this.localization.translate(obstacle)),
            offerwalls: result.offerwalls.map(offerwall => this.localization.translate(offerwall)),
            popups: result.popups.map(popup => this.localization.translate(popup)),
            progressive_islands: result.progressive_islands.map(progressive_island => this.localization.translate(progressive_island)),
            promoislands: result.promoislands.map(promo_island => this.localization.translate(promo_island)),
            promos: result.promos.map(promo => this.localization.translate(promo)),
            puzzle_islands: result.puzzle_islands.map(puzzle_island => this.localization.translate(puzzle_island)),
            runner_islands: result.runner_islands.map(runner_island => this.localization.translate(runner_island)),
            social_buildings: result.social_buildings.map(social_building => this.localization.translate(social_building)),
            teaser_islands: result.teaser_islands.map(teaser_island => this.localization.translate(teaser_island)),
            tower_islands: result.tower_islands.map(tower_island => this.localization.translate(tower_island)),
            trader_islands: result.trader_islands.map(trader_island => this.localization.translate(trader_island)),
            tree_of_lives: result.tree_of_lives.map(tree_of_live => this.localization.translate(tree_of_live)),
            units: result.units.map(unit => this.localization.translate(unit)),
            wizards_caves: result.wizards_caves.map(wizards_cave => this.localization.translate(wizards_cave)),
            dragons: result.dragons.map(dragon => this.localization.translate(dragonSchema.parse(dragon)))
        } satisfies Record<keyof RestructuredItemsDto, Array<any>>
    }
}