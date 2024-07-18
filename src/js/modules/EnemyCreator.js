import { Enemy } from "./Enemy.js";

class EnemyCreator {
  #entities;
  #intervalId;
  #currentSpawnRate;
  #enemyTypes;

  constructor(entities) {
    this.#entities = entities;
    this.#enemyTypes = [
      { hp: 20, radius: 18, speed: 4, color: "#ff0000" },
      { hp: 10, radius: 14, speed: 5, color: "#f210c8" },
      { hp: 30, radius: 25, speed: 3, color: "#10b2f2" },
      { hp: 30, radius: 20, speed: 4, color: "#021ffc" },
      { hp: 50, radius: 30, speed: 2, color: "#1ff40c" },
      { hp: 10, radius: 10, speed: 6, color: "#fc4d02" }
    ];

    document.addEventListener("visibilitychange", () => {
      if(this.#entities.player.isDead) {
        return;
      }

      if(document.hidden) {
        this.stopEnemySpawn();
      } else {
        this.restartEnemySpawn();
      }
    });
  }

  #createEnemyPosition(enemySize) {
    let xPos, yPos;

    if(Math.random() > .5) {
      xPos = Math.random() > .5 ? -enemySize : this.#entities.mainCanvas.width + enemySize;
      yPos = Math.floor(Math.random() * this.#entities.mainCanvas.height);
      return [xPos, yPos];
    }

    xPos = Math.floor(Math.random() * this.#entities.mainCanvas.width);
    yPos = Math.random() > .5 ? -enemySize : this.#entities.mainCanvas.height + enemySize;
    return [xPos, yPos];
  }

  #randomizeEnemy() {
    const randomSeed = Math.floor(Math.random() * this.#enemyTypes.length);
    return this.#enemyTypes[randomSeed];
  }

  #createEnemy() {
    const { hp, radius, speed, color } = this.#randomizeEnemy();
    const coords = this.#createEnemyPosition(radius);
    this.#entities.enemies.push(
      new Enemy(coords[0], coords[1], radius, speed, color, hp, this.#entities.player)
    );
  }

  startEnemySpawn(secondsToSpawn) {
    if(this.#intervalId) {
      throw "Multiple intervals cannot be started. Clear the current interval before starting a new one.";
    }
    this.#currentSpawnRate = secondsToSpawn;
    this.#intervalId = setInterval(() => {
      if(this.#entities.player.isDead) {
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