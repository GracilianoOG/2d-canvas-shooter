import { Timer } from "../../engine/systems/Timer.js";
import { Enemy } from "../entities/enemies/Enemy.js";
import * as DiffMods from "../constants/modifierTypes.js";
import { spawnerConfig, defaultModifiers } from "./configs.js";
import { between, randomInt } from "../../engine/utils/math.js";
import { config } from "../config/index.js";
import { Layers } from "../constants/layers.js";
import {
  enemyData,
  enemyIds,
  specialData,
  specialIds,
} from "@/data/enemyData.js";

export class EnemyCreator {
  #config;
  #spawnTimer;
  #difficultyTimer;
  #spawnTime;
  #spawnLevel;
  #spawnMods;
  #target;
  #specialChance;
  #entities;
  #events;

  constructor(target, entities, events) {
    const timerConfig = { autostart: false, loop: true };
    this.#config = { ...spawnerConfig };
    const { spawnTime, difficultyTime, minSpawnLevel, specialChance } =
      this.#config;

    this.#spawnTimer = Timer.create(
      spawnTime,
      timerConfig,
      this.#create.bind(this),
    );
    this.#difficultyTimer = Timer.create(
      difficultyTime,
      timerConfig,
      this.#hardenSpawn.bind(this),
    );

    this.#spawnTime = spawnTime;
    this.#spawnLevel = minSpawnLevel;
    this.#specialChance = specialChance;
    this.#spawnMods = [...defaultModifiers];
    this.#target = target;
    this.#entities = entities;
    this.#events = events;

    events.on("spawnMinions", (x, y, amount, preset) => {
      for (let i = 0; i < amount; i++) {
        const minion = new Enemy(preset, target, events);
        entities.add(x, y, minion, Layers.ENEMIES);
      }
    });
  }

  #randomizePosition(enemySize) {
    const { width, height } = config;
    const chance = Math.random() > 0.5;
    const maxWidthPoint = width + enemySize;
    const maxHeightPoint = height + enemySize;
    const enemyPosition = [
      chance ? between(-enemySize, maxWidthPoint) : randomInt(width),
      chance ? randomInt(height) : between(-enemySize, maxHeightPoint),
    ];

    return enemyPosition;
  }

  #randomizeEnemy() {
    const randomId = enemyIds[randomInt(this.#spawnLevel)];
    const enemyConfig = { ...enemyData[randomId] };
    enemyConfig.score = enemyConfig.hp * 10;

    return enemyConfig;
  }

  #randomizeSpecial() {
    const specialId = specialIds[randomInt(specialIds.length)];
    const specialConfig = { ...specialData[specialId] };
    specialConfig.score = specialConfig.hp * 10;

    return specialConfig;
  }

  #hardenSpawn() {
    const length = this.#spawnMods.length;

    switch (this.#spawnMods[randomInt(length)]) {
      case DiffMods.SPAWN_TIME:
        this.#spawnTimer.waitTime -= this.#config.spawnDecrementMs;
        break;
      case DiffMods.NEW_ENEMY:
        this.#spawnLevel++;
        if (enemyIds.length === this.#spawnLevel) {
          this.#removeSpawnMod(DiffMods.NEW_ENEMY);
        }
        break;
      case DiffMods.SPECIAL_CHANCE:
        this.#specialChance += this.#config.specialIncrement;
        if (this.#specialChance >= this.#config.maxSpecialChance) {
          this.#removeSpawnMod(DiffMods.SPECIAL_CHANCE);
        }
        break;
    }
  }

  #removeSpawnMod(name) {
    const index = this.#spawnMods.indexOf(name);
    this.#spawnMods.splice(index, 1);
  }

  #create() {
    const isSpecial = this.#specialChance >= Math.random();

    const enemyConfig = !isSpecial
      ? this.#randomizeEnemy()
      : this.#randomizeSpecial();

    const position = this.#randomizePosition(enemyConfig.radius);
    const EnemyClass = enemyConfig.Class ?? Enemy;
    const enemy = new EnemyClass(enemyConfig, this.#target, this.#events);
    this.#entities.add(...position, enemy, Layers.ENEMIES);
  }

  start() {
    this.#spawnTimer.start();
    this.#difficultyTimer.start();
  }

  stop() {
    this.#spawnTimer.stop();
    this.#difficultyTimer.stop();
  }

  reset() {
    this.#spawnTimer.waitTime = this.#spawnTime;
    this.#spawnTimer.reset();
    this.#difficultyTimer.reset();
    this.#spawnLevel = this.#config.minSpawnLevel;
    this.#specialChance = this.#config.specialChance;
    this.#spawnMods = [...defaultModifiers];
  }
}
