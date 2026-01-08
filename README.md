# @dchighs/dc-config-mapper

**@dchighs/dc-config-mapper** is a package for manipulating configuration data from the game [Dragon City](https://dragoncitygame.com/) (this is not an official SocialPoint library; it is fan-made).

## 📦 Installation

Installation is straightforward; simply use your preferred package manager. Here is an example using NPM:

```cmd
npm i @dchighs/dc-config-mapper @dchighs/dc-config @dchighs/dc-localization @dchighs/dc-core

```

> You also need to install `@dchighs/dc-config`, `@dchighs/dc-localization`, and `@dchighs/dc-core`. These are set as `peerDependencies`, meaning the package requires them to function but will use the specific versions you have installed in your project.

---

## 🚀 Usage

<a href="https://www.buymeacoffee.com/marcuth">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="200">
</a>

### Mapping Chests

```ts
import { Config, ConfigLangauge } from "@dchighs/dc-config"
import { ChestsMapper } from "@dchighs/dc-config-mapper"
import { Localization } from "@dchighs/dc-localization"

;(async () => {
	const userId = process.env.USER_ID
	const authToken = process.env.AUTH_TOKEN
	const url = process.env.URL

	const config = await Config.create({
		userId: userId,
		authToken: authToken,
		url: url,
	})
	
	const localization = await Localization.create(ConfigLangauge.Turkish)
	const chestsMapper = new ChestsMapper(localization)
	
	const { chests, rewards } = chestsMapper.map(config.data.game_data.config.chests)
	
	console.log({ chests, rewards })
})();

```

---

### Mapping Items

```ts
import { ItemsMapper } from "@dchighs/dc-config-mapper"

// ...
	const itemsMapper = new ItemsMapper(localization)
	
	const items = itemsMapper.map(config.data.game_data.config.items)
	
	console.log(items)
})();

```

---

### Mapping Heroic Races

```ts
import { HeroicRacesMapper } from "@dchighs/dc-config-mapper"

// ...
	const heroicRacesMapper = new HeroicRacesMapper(localization)
	
	const heroicRaces = heroicRacesMapper.map(config.data.game_data.config.heroic_races)
	
	console.log(heroicRaces)
})();

```

---

### Mapping Maze Islands

```ts
import { MazeIslandsMapper } from "@dchighs/dc-config-mapper"

// ...
	const mazeIslandsMapper = new MazeIslandsMapper(localization)
	
	const mazeIslands = mazeIslandsMapper.map(config.data.game_data.config.maze_island)
	
	console.log(mazeIslands)
})();

```

---

### Mapping Skills

```ts
import { SkillsMapper } from "@dchighs/dc-config-mapper"

// ...
	const skillsMapper = new SkillsMapper(localization)
	
	const skills = skillsMapper.map(config.data.game_data.config.skills)
	
	console.log(skills)
})();

```

---

### Compiling Data

If you need to populate data for end-use, it is ideal to use the `DataCompiler` and provide the necessary context for data compilation:

```ts
import { DataCompiler } from "@dchighs/dc-config-mapper"

const dataCompiler = new DataCompiler({
	acceptedPrefixes: [
		"basic_",
		"trainable_",
		"top_",
		"middle_",
		"bottom_",
		"1_",
		"2_",
		"3_",
		"4_"
	]
})

```

Then, use it as follows:

```ts
const heroicRaces = heroicRacesMapper.map(config.data.game_data.config.heroic_races)
const skills = skillsMapper.map(config.data.game_data.config.skills)
const items = itemsMapper.map(config.data.game_data.config.items)

const compileContext = {
	laps: heroicRaces.laps,
	nodes: heroicRaces.nodes,
	missions: heroicRaces.missions,
	rewards: heroicRaces.rewards,
	attacks: skills.attacks,
	dragons: items.dragons
}

const firstIsland = heroicRaces.islands[0]

const finalData = dataCompiler.compile({
	data: firstIsland,
	context: compileContext,
})

console.log(finalData)

```

---

## 🤝 Contributing

* Want to contribute? Follow these steps:
* Fork the repository.
* Create a new branch (`git checkout -b feature-new`).
* Commit your changes (`git commit -m 'Add new feature'`).
* Push to the branch (`git push origin feature-new`).
* Open a Pull Request.

---

## 📝 License

This project is licensed under the MIT License.
