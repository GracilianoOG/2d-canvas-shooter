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

  checkCollisions() {
    const enemies = Entity.instances.filter(i => i instanceof Enemy);
    const bullets = Entity.instances.filter(i => i instanceof Bullet);
    const player = this.getEntity("player");

    for (const e of enemies) {
      if (!player.isDead && player.collidedWith(e)) {
        player.kill();
        this.#prepareRestart(2400);
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

  #calcHighscore() {
    const score = this.getEntity("scoreboard").score;
    const highscore = parseInt(StorageHandler.retrieveHighscore(false) || 0);
    const highscoreEl = restart.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
    const recordEl = restart.querySelector(".highscore__new");
    if (score > highscore) {
      StorageHandler.storeHighscore(score);
      recordEl.classList.remove("hide");
    } else {
      recordEl.classList.add("hide");
    }
    highscoreEl.textContent = StorageHandler.retrieveHighscore();
  }

  #prepareRestart(milliseconds) {
    this.getEntity("game").enemyCreator.stop();

    setTimeout(() => {
      this.#calcHighscore();
      this.getEntity("game").stopLoop();
      restart.classList.remove("hide");
      Entity.instances = [this.getEntity("player")];
    }, milliseconds);
  }
}

export const gameState = new GameState();
