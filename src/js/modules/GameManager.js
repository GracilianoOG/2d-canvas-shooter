import { notifyScoreEarned, storeHighscore } from "../utils/helpers.js";
import { Particle } from "./Particle.js";

class GameManager {
  constructor() {}

  #damageEnemy(enemy) {
    const { x, y, baseColor, health } = enemy;
    const isEnemyAlive = health > 0;
    const scoreGiven = isEnemyAlive ? 50 : 200;
    window.gameState["entities"].particles.push(
      ...Particle.createParticles(x, y, 8, 5, baseColor, isEnemyAlive ? 8 : 16)
    );
    this.#countScore(scoreGiven);
    notifyScoreEarned(x, y, scoreGiven);
    this.#playStatusSound(isEnemyAlive);
  }

  #countScore(scoreAmount) {
    window.gameState["entities"].scoreboard.score += scoreAmount;
  }

  #playStatusSound(isEnemyAlive) {
    window.gameState["entities"].gameAudio.playSound(
      isEnemyAlive ? "hit" : "explosion"
    );
  }

  #hasBulletHitEnemy(bullet) {
    const enemiesLength = window.gameState["entities"].enemies.length;

    for (let i = 0; i < enemiesLength; i++) {
      const enemy = window.gameState["entities"].enemies[i];

      if (!bullet.toDestroy && bullet.collidedWith(enemy)) {
        enemy.takeDamage(bullet.damage);
        this.#damageEnemy(enemy);
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

  #endGame() {
    if (!this.#isGameOver()) {
      return;
    }

    const {
      x: playerX,
      y: playerY,
      color: playerColor,
    } = window.gameState["entities"].player;
    window.gameState["entities"].player.isDead = true;
    window.gameState["entities"].gameAudio.playSound("explosion");
    window.gameState["entities"].particles.push(
      ...Particle.createParticles(playerX, playerY, 8, 5, playerColor, 16)
    );
    this.#prepareRestart(2.4);
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
        return true;
      }
    }
    return false;
  }

  #prepareRestart(delayInSeconds) {
    setTimeout(() => {
      cancelAnimationFrame(window.gameState["entities"].animation.id);
      storeHighscore(window.gameState["entities"].scoreboard.score);
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
    this.#endGame();
  }
}

export { GameManager };
