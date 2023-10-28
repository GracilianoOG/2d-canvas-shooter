import { Enemy } from "./Enemy.js";

class EnemyControl {
  #enemies = [];
  #screen;
  #ctx;
  #target;
  #intervalId;

  constructor(screen, target) {
    this.#screen = screen;
    this.#target = target;
    this.#ctx = this.#screen.getContext("2d");
  }

  #createHorizontalEnemy(enemySize) {
    const xPos = Math.floor(Math.random() * this.#screen.width);
    const yPos = Math.random() > .5 ? -enemySize : this.#screen.height + enemySize;
    return [xPos, yPos];
  }
  
  #createVerticalEnemy(enemySize) {
    const xPos = Math.random() > .5 ? -enemySize : this.#screen.width + enemySize;
    const yPos = Math.floor(Math.random() * this.#screen.height);
    return [xPos, yPos];
  }

  startEnemySpawn() {
    if(this.#intervalId) {
      throw "Multiple intervals cannot be started. Clear the current interval before starting a new one.";
    }
    this.#intervalId = setInterval(() => {
      const enemySize = 20;
      const coords = Math.random() > .5 ? this.#createVerticalEnemy(enemySize) : this.#createHorizontalEnemy(enemySize);
      this.#enemies.push(new Enemy(coords[0], coords[1], enemySize, 3, "red", this.#target));
    }, 2000);
  }

  stopEnemySpawn() {
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }

  update() {
    this.#enemies.forEach(enemy => enemy.update(this.#ctx));
  }
}

export { EnemyControl };