import { Bullet } from "../arsenal/Bullet.js";
import { Enemy } from "../enemy/Enemy.js";
import { Entity } from "../Entity.js";
import { gameState } from "../singletons/GameState.js";
import { StorageHandler } from "../StorageHandler.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { restart } from "../utils/screens.js";

class GameManager {
  #countScore(enemy, scoreAmount) {
    gameState
      .getEntity("scoreboard")
      .createIndicator(scoreAmount, enemy.baseColor);
  }

  #checkCollisions() {
    const enemies = Entity.instances.filter(i => i instanceof Enemy);
    const bullets = Entity.instances.filter(i => i instanceof Bullet);
    const player = gameState.getEntity("player");

    for (const e of enemies) {
      if (!player.isDead && player.collidedWith(e)) {
        player.kill();
        this.#prepareRestart(2.4);
      }
      for (const b of bullets) {
        if (b.collidedWith(e)) {
          this.#countScore(e, e.takeDamage(b.damage));
          b.destroy();
          return;
        }
      }
    }
  }

  #prepareRestart(delayInSeconds) {
    setTimeout(() => {
      gameState.getEntity("game").stopLoop();
      StorageHandler.storeHighscore(gameState.getEntity("scoreboard").score);
      restart.classList.remove("hide");
      const highscoreBoard = restart.querySelector(
        CSS_CLASSES.HIGHSCORE_POINTS
      );
      highscoreBoard.textContent = StorageHandler.retrieveHighscore();
      Entity.instances = [gameState.getEntity("player")];
    }, delayInSeconds * 1000);
  }

  update() {
    Entity.updateAll(gameState.getEntity("mainCanvas").context);
    this.#checkCollisions();
  }
}

export { GameManager };
