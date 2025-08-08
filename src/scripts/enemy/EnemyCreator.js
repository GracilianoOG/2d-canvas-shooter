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

const INITIAL_MILESTONE = 15_000;

class EnemyCreator {
  constructor(spawnTime) {
    const timerConfig = { autostart: false };
    this.timer = new Timer(
      spawnTime,
      timerConfig,
      this.#createEnemy.bind(this)
    );
    this.spawnTime = spawnTime;
    this.spawnLevel = 1;
    this.enemyModChance = 5;
    this.milestone = {
      base: INITIAL_MILESTONE,
      current: INITIAL_MILESTONE,
    };
    this.availableModifiers = [SPAWN_TIME, NEW_ENEMY, MOD_CHANCE];
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
    const rndSeed = randomInt(0, this.spawnLevel);
    const rndEnemy = { ...enemyTypes[rndSeed] };
    if (randomInt(0, 100) < this.enemyModChance) this.#modifyEnemy(rndEnemy);
    return rndEnemy;
  }

  #modifyEnemy(enemy) {
    switch (randomInt(0, 3)) {
      case 0:
        enemy.color = "hsl(180, 50%, 80%)";
        enemy.radius = Math.max(Math.ceil(enemy.radius * 0.8), 10);
        enemy.speed += 1;
        break;
      case 1:
        enemy.color = "hsl(280, 50%, 80%)";
        enemy.radius = Math.ceil(enemy.radius * 1.25);
        enemy.hp = enemy.hp + 20;
        break;
      case 2:
        enemy.color = "hsl(40, 80%, 50%)";
        enemy.radius = Math.ceil(enemy.radius * 1.5);
        enemy.speed = Math.max(enemy.speed - 1, 1);
        enemy.hp = enemy.hp + 40;
        break;
    }
    enemy.score = { ...enemy.score };
    enemy.score.hit *= 2;
    enemy.score.death *= 2;
  }

  #increaseDifficulty() {
    const currentScore = gameState.getEntity("scoreboard").score;

    if (currentScore <= this.milestone.current) {
      return;
    }

    const length = this.availableModifiers.length;

    switch (this.availableModifiers[randomInt(0, length)]) {
      case SPAWN_TIME:
        this.timer.waitTime -= 5;
        console.log(`Spawn time reduced to ${this.timer.waitTime}`);
        break;
      case MOD_CHANCE:
        this.enemyModChance += 0.5;
        if (this.enemyModChance === 50) {
          const index = this.availableModifiers.indexOf(MOD_CHANCE);
          this.availableModifiers.splice(index, 1);
          console.log("Deleted MOD_CHANCE");
        }
        console.log(
          `Modified enemy chance increased to ${this.enemyModChance}%`
        );
        break;
      case NEW_ENEMY:
        this.spawnLevel++;
        if (enemyTypes.length === this.spawnLevel) {
          const index = this.availableModifiers.indexOf(NEW_ENEMY);
          this.availableModifiers.splice(index, 1);
          console.log("Deleted NEW_ENEMY");
        }
        console.log(`Enemy level ${this.spawnLevel} unlocked!`);
        break;
    }

    this.milestone.current += this.milestone.base;
  }

  #createEnemy() {
    this.#increaseDifficulty();
    const rndEnemy = this.#randomizeEnemy();
    const coords = this.#createEnemyPosition(rndEnemy.radius);
    const player = gameState.getEntity("player");
    new Enemy(...coords, ...Object.values(rndEnemy), player);
  }

  start() {
    this.timer.start();
  }

  stop() {
    this.timer.stop();
  }

  reset() {
    this.timer.waitTime = this.spawnTime;
    this.timer.reset();
    this.spawnLevel = 1;
    this.milestone.current = this.milestone.base;
    this.enemyModChance = 5;
  }
}

export { EnemyCreator };
