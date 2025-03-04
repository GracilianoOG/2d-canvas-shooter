import { Timer } from "../Timer.js";
import { minOrMaxPoint, randomLinePoint } from "../utils/utility.js";
import { Enemy } from "./Enemy.js";
import { enemyTypes } from "./enemyTypes.js";

class EnemyCreator {
  constructor(spawnTime) {
    this.timer = new Timer(spawnTime, {}, this.#createEnemy.bind(this));
  }

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
}

export { EnemyCreator };
