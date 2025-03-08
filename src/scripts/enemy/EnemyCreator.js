import { gameState } from "../singletons/GameState.js";
import { Timer } from "../Timer.js";
import { minOrMaxPoint, randomInt, randomLinePoint } from "../utils/utility.js";
import { Enemy } from "./Enemy.js";
import { enemyTypes } from "./enemyTypes.js";

class EnemyCreator {
  constructor(spawnTime) {
    const noStart = { autostart: false };
    this.timer = new Timer(spawnTime, noStart, this.#createEnemy.bind(this));
    this.spawnLevel = 1;
    this.modRate = 10;
    this.milestones = [10000, 20000, 30000, 40000, 60000];
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
    if (randomInt(0, 100) < this.modRate) this.#modifyEnemy(rndEnemy);
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

  #checkMilestone() {
    const score = gameState.getEntity("scoreboard").score;
    const index = this.spawnLevel - 1;
    const length = this.milestones.length;
    if (index < length && score > this.milestones[index]) {
      this.spawnLevel++;
    }
  }

  #createEnemy() {
    this.#checkMilestone();
    const randomEnemy = this.#randomizeEnemy();
    const coords = this.#createEnemyPosition(randomEnemy.radius);
    new Enemy(
      ...coords,
      ...Object.values(randomEnemy),
      gameState.getEntity("player")
    );
  }

  start() {
    this.timer.start();
  }

  stop() {
    this.timer.stop();
  }

  reset() {
    this.timer.reset();
    this.spawnLevel = 1;
  }
}

export { EnemyCreator };
