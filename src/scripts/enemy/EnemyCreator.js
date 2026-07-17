import { gameState } from "../singletons/GameState.js";
import { Timer } from "../Timer.js";
import { Enemy } from "./Enemy.js";
import { enemyTypes } from "./enemyTypes.js";
import {
  MOD_CHANCE,
  NEW_ENEMY,
  SPAWN_TIME,
} from "../utils/constants/modifierTypes.js";
import * as Colors from "../utils/constants/colors.js";
import {
  FAST,
  SLOW_STRONGER,
  STRONG,
} from "../utils/constants/enemyModTypes.js";
import { defaultConfig, defaultModifiers, enemyModifiers } from "./configs.js";
import { between, randomInt } from "../utils/math.js";
import { entityManager } from "../game/EntityManager.js";

class EnemyCreator {
  #config;
  #spawnTimer;
  #difficultyTimer;
  #spawnTime;
  #spawnLevel;
  #enemyModChance;
  #availableModifiers;

  constructor(config = {}) {
    const timerConfig = { autostart: false };
    this.#config = { ...defaultConfig, ...config };
    this.#spawnTimer = new Timer(
      this.#config.spawnTime,
      timerConfig,
      this.#createEnemy.bind(this),
    );
    this.#difficultyTimer = new Timer(
      this.#config.difficultyTime,
      timerConfig,
      this.#increaseDifficulty.bind(this),
    );
    this.#spawnTime = this.#config.spawnTime;
    this.#spawnLevel = this.#config.initialSpawnLevel;
    this.#enemyModChance = this.#config.enemyModChance;
    this.#availableModifiers = [...defaultModifiers];
  }

  #createEnemyPosition(enemySize) {
    const { width, height } = gameState.getEntity("mainCanvas");
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
    const enemyLevel = randomInt(this.#spawnLevel);
    const enemyConfig = { ...enemyTypes[enemyLevel] };
    const rndModChance = randomInt(100);
    if (this.#enemyModChance > rndModChance) {
      this.#modifyEnemy(enemyConfig);
    }
    return enemyConfig;
  }

  #modifyEnemy(enemy) {
    const length = enemyModifiers.length;

    switch (enemyModifiers[randomInt(length)]) {
      case FAST:
        enemy.color = Colors.VERY_LIGHT_BLUE;
        enemy.radius = Math.max(Math.ceil(enemy.radius * 0.8), 10);
        enemy.speed += 1;
        break;
      case STRONG:
        enemy.color = Colors.VERY_LIGHT_PINK;
        enemy.radius = Math.ceil(enemy.radius * 1.25);
        enemy.hp += 20;
        break;
      case SLOW_STRONGER:
        enemy.color = Colors.GOLDEN;
        enemy.radius = Math.ceil(enemy.radius * 1.5);
        enemy.speed = Math.max(enemy.speed - 1, 1);
        enemy.hp += 40;
        break;
    }
    enemy.score = { ...enemy.score };
    enemy.score.hit *= 2;
    enemy.score.death *= 2;
  }

  #increaseDifficulty() {
    const length = this.#availableModifiers.length;

    switch (this.#availableModifiers[randomInt(length)]) {
      case SPAWN_TIME:
        this.#spawnTimer.waitTime -= this.#config.spawnDecrementMs;
        break;
      case MOD_CHANCE:
        this.#enemyModChance += this.#config.enemyModChanceIncrement;
        if (this.#enemyModChance === this.#config.enemyModChanceLimit) {
          const index = this.#availableModifiers.indexOf(MOD_CHANCE);
          this.#availableModifiers.splice(index, 1);
        }
        break;
      case NEW_ENEMY:
        this.#spawnLevel++;
        if (enemyTypes.length === this.#spawnLevel) {
          const index = this.#availableModifiers.indexOf(NEW_ENEMY);
          this.#availableModifiers.splice(index, 1);
        }
        break;
    }
  }

  #createEnemy() {
    const enemyConfig = this.#randomizeEnemy();
    const { radius, speed, color, hp, score } = enemyConfig;
    const position = this.#createEnemyPosition(radius);
    const options = enemyConfig?.options;
    const target = gameState.getEntity("player");
    const enemy = new Enemy(
      ...position,
      radius,
      speed,
      color,
      hp,
      score,
      target,
      options,
    );
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
    this.#spawnLevel = this.#config.initialSpawnLevel;
    this.#enemyModChance = this.#config.enemyModChance;
    this.#availableModifiers = [...defaultModifiers];
  }
}

export { EnemyCreator };
