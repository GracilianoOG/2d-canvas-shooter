import { minOrMaxPoint, randomLinePoint } from "../utils/utility.js";
import { Enemy } from "./Enemy.js";
import { enemyTypes } from "./enemyTypes.js";

class EnemyCreator {
  #intervalId;
  #currentSpawnRate;

  #createEnemyPosition(enemySize) {
    const { width, height } = window.gameState["entities"].mainCanvas;
    const maxWidthPoint = width + enemySize;
    const maxHeightPoint = height + enemySize;

    return Math.random() > 0.5
      ? [minOrMaxPoint(-enemySize, maxWidthPoint), randomLinePoint(height)]
      : [randomLinePoint(width), minOrMaxPoint(-enemySize, maxHeightPoint)];
  }

  #randomizeEnemy() {
    const randomSeed = Math.floor(Math.random() * enemyTypes.length);
    return enemyTypes[randomSeed];
  }

  #createEnemy() {
    const randomEnemy = this.#randomizeEnemy();
    const coords = this.#createEnemyPosition(randomEnemy.radius);
    new Enemy(
      ...coords,
      ...Object.values(randomEnemy),
      window.gameState["entities"].player
    );
  }

  startEnemySpawn(secondsToSpawn) {
    if (this.#intervalId) {
      throw "Multiple intervals cannot be started. Clear the current interval before starting a new one.";
    }
    this.#currentSpawnRate = secondsToSpawn;
    this.#intervalId = setInterval(() => {
      if (window.gameState["entities"].player.isDead) {
        this.stopEnemySpawn();
      }

      this.#createEnemy();
    }, secondsToSpawn * 1000);
  }

  stopEnemySpawn() {
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }

  restartEnemySpawn() {
    this.stopEnemySpawn();
    this.startEnemySpawn(this.#currentSpawnRate);
  }
}

export { EnemyCreator };
