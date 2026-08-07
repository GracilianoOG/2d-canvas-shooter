import { Timer } from "../../engine/systems/Timer.js";
import { Enemy } from "../entities/enemies/Enemy.js";
import { enemyTypes } from "./enemyTypes.js";
import * as DiffMods from "../constants/modifierTypes.js";
import * as Colors from "../constants/colors.js";
import * as EnemyMods from "../constants/enemyModTypes.js";
import { defaultConfig, defaultModifiers, enemyModifiers } from "./configs.js";
import { between, randomInt } from "../../engine/utils/math.js";
import { entityManager } from "../systems/EntityManager.js";
import { config } from "../config/index.js";
import { Boomer } from "../entities/enemies/Boomer.js";
import { Cloaker } from "../entities/enemies/Cloaker.js";
import { Crazy } from "../entities/enemies/Crazy.js";
import { Void } from "../entities/enemies/Void.js";

class EnemyCreator {
  #config;
  #spawnTimer;
  #difficultyTimer;
  #spawnTime;
  #spawnLevel;
  #modChance;
  #spawnMods;
  #target;
  #specialChance;
  #specials;

  constructor(config = {}) {
    const timerConfig = { autostart: false };
    this.#config = { ...defaultConfig, ...config };
    const {
      spawnTime,
      difficultyTime,
      minSpawnLevel,
      modChance,
      target,
      specialChance,
    } = this.#config;

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
    this.#modChance = modChance;
    this.#specialChance = specialChance;
    this.#spawnMods = [...defaultModifiers];
    this.#target = target;
    this.#specials = [Boomer, Cloaker, Crazy, Void];
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
    const randomLevel = randomInt(this.#spawnLevel);
    const enemyConfig = [...enemyTypes[randomLevel]];
    enemyConfig.splice(enemyConfig.length - 1, 0, this.#target);

    if (this.#modChance > randomInt(100)) {
      this.#hardenEnemy(enemyConfig);
    }

    return enemyConfig;
  }

  #hardenEnemy(enemyConfig) {
    const length = enemyModifiers.length;
    const radius = enemyConfig[0];
    const speed = enemyConfig[1];

    switch (enemyModifiers[randomInt(length)]) {
      case EnemyMods.FAST:
        enemyConfig[0] = Math.max(Math.ceil(radius * 0.8), 10);
        enemyConfig[1] += 1;
        enemyConfig[2] = Colors.VERY_LIGHT_BLUE;
        break;
      case EnemyMods.STRONG:
        enemyConfig[0] = Math.ceil(radius * 1.25);
        enemyConfig[2] = Colors.VERY_LIGHT_PINK;
        enemyConfig[3] += 20;
        break;
      case EnemyMods.SLOW_STRONGER:
        enemyConfig[0] = Math.ceil(radius * 1.5);
        enemyConfig[1] = Math.max(speed - 1, 1);
        enemyConfig[2] = Colors.GOLDEN;
        enemyConfig[3] += 40;
        break;
    }

    enemyConfig[4] *= 2;
  }

  #hardenSpawn() {
    const length = this.#spawnMods.length;

    switch (this.#spawnMods[randomInt(length)]) {
      case DiffMods.SPAWN_TIME:
        this.#spawnTimer.waitTime -= this.#config.spawnDecrementMs;
        break;
      case DiffMods.MOD_CHANCE:
        this.#modChance += this.#config.modChanceIncrement;
        if (this.#modChance === this.#config.maxModChance) {
          this.#removeSpawnMod(DiffMods.MOD_CHANCE);
        }
        break;
      case DiffMods.NEW_ENEMY:
        this.#spawnLevel++;
        if (enemyTypes.length === this.#spawnLevel) {
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
    const special = this.#specialChance >= Math.random();
    const EnemyClass = !special
      ? Enemy
      : this.#specials[randomInt(this.#specials.length)];

    const enemyConfig = this.#randomizeEnemy();
    const radius = enemyConfig[0];
    const position = this.#randomizePosition(radius);
    const enemy = new EnemyClass(...position, ...enemyConfig);
    entityManager.add(enemy);
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
    this.#modChance = this.#config.modChance;
    this.#specialChance = this.#config.specialChance;
    this.#spawnMods = [...defaultModifiers];
  }
}

export { EnemyCreator };
