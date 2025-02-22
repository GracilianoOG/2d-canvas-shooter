import { Enemy } from "./Enemy.js";
import { enemyTypes } from "./enemyTypes.js";

class EnemyCreator {
  #intervalId;
  #currentSpawnRate;

  constructor() {
    document.addEventListener("visibilitychange", () => {
      if (window.gameState["entities"].player.isDead) {
        return;
      }

      if (document.hidden) {
        this.stopEnemySpawn();
      } else {
        this.restartEnemySpawn();
      }
    });
  }

  #createEnemyPosition(enemySize) {
    const { width, height } = window.gameState["entities"].mainCanvas;

    const getTopOrBottomPoint = dimension =>
      Math.random() > 0.5 ? -enemySize : dimension + enemySize;

    const getRandomLinePoint = dimension =>
      Math.floor(Math.random() * dimension);

    return Math.random() > 0.5
      ? [getTopOrBottomPoint(width), getRandomLinePoint(height)]
      : [getRandomLinePoint(width), getTopOrBottomPoint(height)];
  }

  #randomizeEnemy() {
    const randomSeed = Math.floor(Math.random() * enemyTypes.length);
    return enemyTypes[randomSeed];
  }

  #createEnemy() {
    const randomEnemy = this.#randomizeEnemy();
    const coords = this.#createEnemyPosition(randomEnemy.radius);
    window.gameState["entities"].enemies.push(
      new Enemy(
        ...coords,
        ...Object.values(randomEnemy),
        window.gameState["entities"].player
      )
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
