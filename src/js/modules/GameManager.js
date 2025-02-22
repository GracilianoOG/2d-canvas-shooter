import { notifyScoreEarned } from "../utils/helpers.js";
import { Scoreboard } from "./Scoreboard.js";

class GameManager {
  #countScore(enemy, scoreAmount) {
    window.gameState["entities"].scoreboard.score += scoreAmount;
    notifyScoreEarned(enemy.x, enemy.y, scoreAmount);
  }

  #hasBulletHitEnemy(bullet) {
    const enemiesLength = window.gameState["entities"].enemies.length;

    for (let i = 0; i < enemiesLength; i++) {
      const enemy = window.gameState["entities"].enemies[i];

      if (!bullet.toDestroy && bullet.collidedWith(enemy)) {
        this.#countScore(enemy, enemy.takeDamage(bullet.damage));
        return true;
      }
    }
    return false;
  }

  #destroyBullet() {
    const bulletsLength = window.gameState["entities"].bullets.length;

    for (let i = 0; i < bulletsLength; i++) {
      const bullet = window.gameState["entities"].bullets[i];
      if (this.#hasBulletHitEnemy(bullet)) {
        bullet.toDestroy = true;
      }
    }
  }

  #isGameOver() {
    const enemiesLength = window.gameState["entities"].enemies.length;
    for (
      let i = 0;
      !window.gameState["entities"].player.isDead && i < enemiesLength;
      i++
    ) {
      if (
        window.gameState["entities"].player.collidedWith(
          window.gameState["entities"].enemies[i]
        )
      ) {
        window.gameState["entities"].player.kill();
        this.#prepareRestart(2.4);
        return;
      }
    }
  }

  #prepareRestart(delayInSeconds) {
    setTimeout(() => {
      cancelAnimationFrame(window.gameState["entities"].animation.id);
      Scoreboard.storeHighscore(window.gameState["entities"].scoreboard.score);
      window.gameState["entities"].screens.restart.style.display = "flex";
      this.#cleanUpEntities();
    }, delayInSeconds * 1000);
  }

  #cleanUpEntities() {
    window.gameState["entities"].enemies.length = 0;
    window.gameState["entities"].particles.length = 0;
    window.gameState["entities"].bullets.length = 0;
  }

  #updateEntityLists() {
    this.#updateEntities(window.gameState["entities"].enemies);
    this.#updateEntities(window.gameState["entities"].particles);
    this.#updateEntities(window.gameState["entities"].bullets);
  }

  #updateEntities(entities) {
    for (let i = entities.length - 1; i >= 0; i--) {
      const elem = entities[i];
      elem.update(window.gameState["entities"].mainCanvas.context);
      elem.toDestroy && entities.splice(i, 1);
    }
  }

  update() {
    this.#updateEntityLists();
    this.#destroyBullet();
    this.#isGameOver();
  }
}

export { GameManager };
