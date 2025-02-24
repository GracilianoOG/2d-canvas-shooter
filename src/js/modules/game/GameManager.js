import { Entity } from "../Entity.js";
import { Scoreboard } from "../score/Scoreboard.js";

class GameManager {
  #countScore(enemy, scoreAmount) {
    window.gameState["entities"].scoreboard.createIndicator(
      scoreAmount,
      enemy.baseColor
    );
  }

  #updateEntityInteractions() {
    const length = Entity.instances.length;
    const isPlayerDead = window.gameState["entities"].player.isDead;

    // If player is dead, abort
    if (isPlayerDead) return;

    for (let i = 0; i < length; i++) {
      const instance = Entity.instances[i];

      // Check if enemy touched (killed) player
      if (instance.type === "Enemy") {
        if (window.gameState["entities"].player.collidedWith(instance)) {
          window.gameState["entities"].player.kill();
          this.#prepareRestart(2.4);
          return;
        }
      }

      // Check if bullet touched enemy
      if (instance.type === "Bullet") {
        if (this.#hasBulletHitEnemy(instance)) {
          instance.destroy();
        }
      }
    }
  }

  #hasBulletHitEnemy(bullet) {
    const enemies = Entity.instances.filter(
      instance => instance.type === "Enemy"
    );
    const enemiesLength = enemies.length;

    for (let i = 0; i < enemiesLength; i++) {
      const enemy = enemies[i];

      if (bullet.collidedWith(enemy)) {
        this.#countScore(enemy, enemy.takeDamage(bullet.damage));
        return true;
      }
    }
    return false;
  }

  #prepareRestart(delayInSeconds) {
    setTimeout(() => {
      cancelAnimationFrame(window.gameState["entities"].animation.id);
      Scoreboard.storeHighscore(window.gameState["entities"].scoreboard.score);
      window.gameState["entities"].screens.restart.classList.remove("hide");
      Entity.instances = [window.gameState["entities"].player];
    }, delayInSeconds * 1000);
  }

  #updateEntities(entities) {
    for (let i = entities.length - 1; i >= 0; i--) {
      entities[i].update(window.gameState["entities"].mainCanvas.context);
    }
  }

  update() {
    this.#updateEntities(Entity.instances);
    this.#updateEntityInteractions();
    console.log(Entity.instances);
  }
}

export { GameManager };
