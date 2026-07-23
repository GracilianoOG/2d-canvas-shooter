import { gameState } from "../core/GameState.js";
import { Timer } from "../../engine/systems/Timer.js";
import { Enemy } from "../entities/enemies/Enemy.js";
import { enemyTypes } from "./enemyTypes.js";
import * as DiffMods from "../utils/constants/modifierTypes.js";
import * as Colors from "../utils/constants/colors.js";
import * as EnemyMods from "../utils/constants/enemyModTypes.js";
import { defaultConfig, defaultModifiers, enemyModifiers } from "./configs.js";
import { between, randomInt } from "../../engine/utils/math.js";
import { entityManager } from "../systems/EntityManager.js";

class EnemyCreator {
  #config;
  #spawnTimer;
  #difficultyTimer;
  #spawnTime;
  #spawnLevel;
  #modChance;
  #spawnMods;

  constructor(config = {}) {
    const timerConfig = { autostart: false };
    this.#config = { ...defaultConfig, ...config };
    const { spawnTime, difficultyTime, minSpawnLevel, modChance } =
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
    this.#modChance = modChance;
    this.#spawnMods = [...defaultModifiers];
  }

  #randomizePosition(enemySize) {
    const { width, height } = gameState.getEntity("mainCanvas").canvasSize;
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
    const target = gameState.getEntity("player");
    enemyConfig.splice(enemyConfig.length - 1, 0, target);

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

    const newScore = { ...enemyConfig[4] };
    newScore.hit *= 2;
    newScore.death *= 2;
    enemyConfig[4] = newScore;
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
    }
  }

  #removeSpawnMod(name) {
    const index = this.#spawnMods.indexOf(name);
    this.#spawnMods.splice(index, 1);
  }

  #create() {
    const enemyConfig = this.#randomizeEnemy();
    const radius = enemyConfig[0];
    const position = this.#randomizePosition(radius);
    const enemy = new Enemy(...position, ...enemyConfig);
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
    this.#spawnMods = [...defaultModifiers];
  }
}

export { EnemyCreator };
