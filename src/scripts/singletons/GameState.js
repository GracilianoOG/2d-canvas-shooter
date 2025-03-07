import { Bullet } from "../arsenal/Bullet.js";
import { Enemy } from "../enemy/Enemy.js";
import { Entity } from "../Entity.js";
import { StorageHandler } from "../StorageHandler.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { restart } from "../utils/screens.js";

class GameState {
  #entities;
  static instance;

  constructor() {
    if (GameState.instance) {
      return GameState.instance;
    }
    GameState.instance = this;
  }

  addEntities(newEntities) {
    this.#entities = { ...this.#entities, ...newEntities };
  }

  getEntity(name) {
    return this.#entities[name];
  }

  #countScore(score, color) {
    this.getEntity("scoreboard").createIndicator(score, color);
  }

  #checkCollisions() {
    const enemies = Entity.instances.filter(i => i instanceof Enemy);
    const bullets = Entity.instances.filter(i => i instanceof Bullet);
    const player = this.getEntity("player");

    for (const e of enemies) {
      if (!player.isDead && player.collidedWith(e)) {
        player.kill();
        this.#prepareRestart(2.4);
      }
      for (const b of bullets) {
        if (b.collidedWith(e)) {
          this.#countScore(e.takeDamage(b.damage), e.baseColor);
          b.destroy();
          return;
        }
      }
    }
  }

  #prepareRestart(delayInSeconds) {
    this.getEntity("game").enemyCreator.stop();
    setTimeout(() => {
      this.getEntity("game").stopLoop();
      StorageHandler.storeHighscore(this.getEntity("scoreboard").score);
      restart.classList.remove("hide");
      const highscoreBoard = restart.querySelector(
        CSS_CLASSES.HIGHSCORE_POINTS
      );
      highscoreBoard.textContent = StorageHandler.retrieveHighscore();
      Entity.instances = [this.getEntity("player")];
    }, delayInSeconds * 1000);
  }

  update() {
    Entity.updateAll(this.getEntity("mainCanvas").context);
    this.#checkCollisions();
  }
}

export const gameState = new GameState();
