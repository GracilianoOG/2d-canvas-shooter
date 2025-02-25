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
    const isPlayerDead = window.gameState["entities"].player.isDead;
    if (isPlayerDead) return;
    this.#updatePlayerInteraction();
    this.#updateBulletInteraction();
  }

  #updatePlayerInteraction() {
    const enemies = Entity.instances.filter(
      instance => instance.type === "Enemy"
    );
    const player = window.gameState["entities"].player;

    for (const enemy of enemies) {
      if (player.collidedWith(enemy)) {
        player.kill();
        this.#prepareRestart(2.4);
        return;
      }
    }
  }

  #updateBulletInteraction() {
    const bullets = Entity.instances.filter(
      instance => instance.type === "Bullet"
    );

    for (const bullet of bullets) {
      if (this.#hasBulletHitEnemy(bullet)) {
        bullet.destroy();
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

  update() {
    Entity.updateAll(window.gameState["entities"].mainCanvas.context);
    this.#updateEntityInteractions();
    // console.log(Entity.instances);
  }
}

export { GameManager };
