import { gameState } from "../singletons/GameState.js";
import { Timer } from "../Timer.js";
import { minOrMaxPoint, randomInt, randomLinePoint } from "../utils/utility.js";
import { Enemy } from "./Enemy.js";
import { enemyTypes } from "./enemyTypes.js";
import {
  MOD_CHANCE,
  NEW_ENEMY,
  SPAWN_TIME,
} from "../utils/constants/modifierTypes.js";
import * as Colors from "../utils/constants/colors.js";

const defaultConfig = Object.freeze({
  spawnTime: 800,
  difficultyTime: 5000,
  enemyModChance: 5,
  enemyModChanceIncrement: 0.5,
  enemyModChanceLimit: 50,
  initialSpawnLevel: 1,
  spawnDecrementMs: 5,
});

const defaultModifiers = [SPAWN_TIME, NEW_ENEMY, MOD_CHANCE];

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
      this.#createEnemy.bind(this)
    );
    this.#difficultyTimer = new Timer(
      this.#config.difficultyTime,
      timerConfig,
      this.#increaseDifficulty.bind(this)
    );
    this.#spawnTime = this.#config.spawnTime;
    this.#spawnLevel = this.#config.initialSpawnLevel;
    this.#enemyModChance = this.#config.enemyModChance;
    this.#availableModifiers = [...defaultModifiers];
  }

  #createEnemyPosition(enemySize) {
    const { width, height } = gameState.getEntity("mainCanvas");
    const maxWidthPoint = width + enemySize;
    const maxHeightPoint = height + enemySize;

    return Math.random() > 0.5
      ? [minOrMaxPoint(-enemySize, maxWidthPoint), randomLinePoint(height)]
      : [randomLinePoint(width), minOrMaxPoint(-enemySize, maxHeightPoint)];
  }

  #randomizeEnemy() {
    const rndSeed = randomInt(0, this.#spawnLevel);
    const rndEnemy = { ...enemyTypes[rndSeed] };
    if (randomInt(0, 100) < this.#enemyModChance) this.#modifyEnemy(rndEnemy);
    return rndEnemy;
  }

  #modifyEnemy(enemy) {
    switch (randomInt(0, 3)) {
      case 0:
        enemy.color = Colors.VERY_LIGHT_BLUE;
        enemy.radius = Math.max(Math.ceil(enemy.radius * 0.8), 10);
        enemy.speed += 1;
        break;
      case 1:
        enemy.color = Colors.VERY_LIGHT_PINK;
        enemy.radius = Math.ceil(enemy.radius * 1.25);
        enemy.hp += 20;
        break;
      case 2:
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

    switch (this.#availableModifiers[randomInt(0, length)]) {
      case SPAWN_TIME:
        this.#spawnTimer.waitTime -= this.#config.spawnDecrementMs;
        console.log(`Spawn time reduced to ${this.#spawnTimer.waitTime}`);
        break;
      case MOD_CHANCE:
        this.#enemyModChance += this.#config.enemyModChanceIncrement;
        if (this.#enemyModChance === this.#config.enemyModChanceLimit) {
          const index = this.#availableModifiers.indexOf(MOD_CHANCE);
          this.#availableModifiers.splice(index, 1);
          console.log("Deleted MOD_CHANCE");
        }
        console.log(
          `Modified enemy chance increased to ${this.#enemyModChance}%`
        );
        break;
      case NEW_ENEMY:
        this.#spawnLevel++;
        if (enemyTypes.length === this.#spawnLevel) {
          const index = this.#availableModifiers.indexOf(NEW_ENEMY);
          this.#availableModifiers.splice(index, 1);
          console.log("Deleted NEW_ENEMY");
        }
        console.log(`Enemy level ${this.#spawnLevel} unlocked!`);
        break;
    }
  }

  #createEnemy() {
    const rndEnemy = this.#randomizeEnemy();
    const { radius, speed, color, hp, score } = rndEnemy;
    const coords = this.#createEnemyPosition(radius);
    const options = rndEnemy?.options;
    const target = gameState.getEntity("player");
    new Enemy(...coords, radius, speed, color, hp, score, target, options);
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
