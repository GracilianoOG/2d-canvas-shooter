import { Enemy } from "./Enemy.js";

class EnemyControl {
  #enemies = [];
  #screen;
  #ctx;
  #target;
  #intervalId;

  constructor(target, screen) {
    this.#target = target;
    this.#screen = screen;
    this.#ctx = this.#screen.getContext("2d");
  }

  set enemies(enemies) {
    this.#enemies = enemies;
  }

  get enemies() {
    return this.#enemies;
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

  #createEnemy() {
    const enemySize = 20;
    const coords = Math.random() > .5 ? this.#createVerticalEnemy(enemySize) : this.#createHorizontalEnemy(enemySize);
    this.#enemies.push(
      new Enemy(coords[0], coords[1], enemySize, 3, "red", 20, this.#target)
    );
  }

  #deleteEnemies() {
    this.#enemies = this.#enemies.filter(bullet => !bullet.hasCollided);
  }

  startEnemySpawn(secondsToSpawn) {
    if(this.#intervalId) {
      throw "Multiple intervals cannot be started. Clear the current interval before starting a new one.";
    }
    this.#intervalId = setInterval(() => this.#createEnemy(), secondsToSpawn * 1000);
  }

  stopEnemySpawn() {
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }

  update() {
    this.#enemies.forEach(enemy => enemy.update(this.#ctx));
    this.#deleteEnemies();
  }
}

export { EnemyControl };