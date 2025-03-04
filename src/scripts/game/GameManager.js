import { Entity } from "../Entity.js";
import { StorageHandler } from "../StorageHandler.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { restart } from "../utils/screens.js";

class GameManager {
  #countScore(enemy, scoreAmount) {
    window.gameState["entities"].scoreboard.createIndicator(
      scoreAmount,
      enemy.baseColor
    );
  }

  #checkCollisions() {
    const enemies = Entity.instances.filter(i => i.type === "Enemy");
    const bullets = Entity.instances.filter(i => i.type === "Bullet");
    const player = window.gameState["entities"].player;

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
      window.gameState["entities"].game.stopLoop();
      StorageHandler.storeHighscore(
        window.gameState["entities"].scoreboard.score
      );
      restart.classList.remove("hide");
      const highscoreBoard = restart.querySelector(
        CSS_CLASSES.HIGHSCORE_POINTS
      );
      highscoreBoard.textContent = StorageHandler.retrieveHighscore();
      Entity.instances = [window.gameState["entities"].player];
    }, delayInSeconds * 1000);
  }

  update() {
    Entity.updateAll(window.gameState["entities"].mainCanvas.context);
    this.#checkCollisions();
  }
}

export { GameManager };
