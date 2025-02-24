import { Entity } from "./Entity.js";
import { Scoreboard } from "./Scoreboard.js";

class GameManager {
  #countScore(enemy, scoreAmount) {
    window.gameState["entities"].scoreboard.createIndicator(
      scoreAmount,
      enemy.baseColor
    );
  }

  #hasBulletHitEnemy(bullet) {
    const enemiesLength = Entity.instances.length;

    for (let i = 0; i < enemiesLength; i++) {
      const enemy = Entity.instances[i];

      if (enemy.type !== "Enemy") continue;

      if (bullet.collidedWith(enemy)) {
        this.#countScore(enemy, enemy.takeDamage(bullet.damage));
        return true;
      }
    }
    return false;
  }

  #destroyBullet() {
    const bulletsLength = Entity.instances.length;

    for (let i = 0; i < bulletsLength; i++) {
      const bullet = Entity.instances[i];
      if (bullet.type !== "Bullet") continue;
      if (this.#hasBulletHitEnemy(bullet)) {
        bullet.destroy();
      }
    }
  }

  #isGameOver() {
    const enemiesLength = Entity.instances.length;
    const isPlayer = window.gameState["entities"].player.isDead;
    for (let i = 0; !isPlayer && i < enemiesLength; i++) {
      const enemy = Entity.instances[i];

      if (enemy.type !== "Enemy") continue;

      if (window.gameState["entities"].player.collidedWith(enemy)) {
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
    this.#destroyBullet();
    this.#isGameOver();
    console.log(Entity.instances);
  }
}

export { GameManager };
