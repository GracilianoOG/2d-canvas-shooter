import { Enemy } from "./Enemy.js";

class EnemyCreator {
  #canvas;
  #target;
  #enemies;
  #intervalId;

  constructor({ player, mainCanvas, enemies }) {
    this.#target = player;
    this.#canvas = mainCanvas.canvas;
    this.#enemies = enemies;
  }

  #createEnemyPosition(enemySize) {
    let xPos, yPos;

    if(Math.random() > .5) {
      xPos = Math.random() > .5 ? -enemySize : this.#canvas.width + enemySize;
      yPos = Math.floor(Math.random() * this.#canvas.height);
      return [xPos, yPos];
    }

    xPos = Math.floor(Math.random() * this.#canvas.width);
    yPos = Math.random() > .5 ? -enemySize : this.#canvas.height + enemySize;
    return [xPos, yPos];
  }

  #randomizeEnemy() {
    const randomSeed = Math.floor(Math.random() * 3);
    let randomEnemy;

    switch(randomSeed) {
      case 0:
        randomEnemy = { hp: 20, radius: 18, speed: 4, color: "#ff0000" };
        break;
      case 1:
        randomEnemy = { hp: 10, radius: 14, speed: 5, color: "#f210c8" };
        break;
      case 2:
        randomEnemy = { hp: 30, radius: 25, speed: 3, color: "#10b2f2" };
        break;
      default:
        throw `There isn't an enemy with the seed: ${randomSeed}`;
    }

    return randomEnemy;
  }

  #createEnemy() {
    const { hp, radius, speed, color } = this.#randomizeEnemy();
    const coords = this.#createEnemyPosition(radius);
    this.#enemies.push(
      new Enemy(coords[0], coords[1], radius, speed, color, hp, this.#target)
    );
  }

  startEnemySpawn(secondsToSpawn) {
    if(this.#intervalId) {
      throw "Multiple intervals cannot be started. Clear the current interval before starting a new one.";
    }
    this.#intervalId = setInterval(() => {
      if(this.#target.isDead) {
        this.stopEnemySpawn();
      }
      this.#createEnemy();
    }, secondsToSpawn * 1000);
  }

  stopEnemySpawn() {
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }
}

export { EnemyCreator };