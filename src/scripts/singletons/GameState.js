import { Bullet } from "../arsenal/projectiles/Bullet.js";
import { Enemy } from "../enemy/Enemy.js";
import { Entity } from "../Entity.js";
import { entityManager } from "../game/EntityManager.js";
import { Item } from "../items/Item.js";
import { StorageHandler } from "../StorageHandler.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { NOT_RUNNING } from "../utils/constants/gameStates.js";
import { restart } from "../utils/screens.js";
import { eventManager } from "./EventManager.js";

class GameState {
  #entities;

  constructor() {
    eventManager.subscribe("enemyDeath", this.#onEnemyDeath.bind(this));
    eventManager.subscribe("enemyHit", this.#onEnemyHit.bind(this));
    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
    eventManager.subscribe("playerHit", this.#onPlayerHit.bind(this));
  }

  addEntities(newEntities) {
    this.#entities = { ...this.#entities, ...newEntities };
  }

  getEntity(name) {
    return this.#entities[name];
  }

  #onPlayerHit({ lives }) {
    if (lives) {
      this.getEntity("gameAudio").play("hit");
      this.getEntity("game").shakeScreen(3.5, 300);
    }
  }

  #onEnemyDeath({ score, color }) {
    this.getEntity("gameAudio").play("explosion");
    this.getEntity("game").shakeScreen(5, 300);
    this.#countScore(score, color);
  }

  #onEnemyHit({ score, color }) {
    this.getEntity("gameAudio").play("hit");
    this.#countScore(score, color);
  }

  #onPlayerDeath() {
    this.getEntity("gameAudio").play("explosion");
    this.getEntity("game").shakeScreen(6, 500);
    this.#prepareRestart(2400);
  }

  #countScore(score, color) {
    this.getEntity("scoreboard").createIndicator(score, color);
  }

  #filterInstances() {
    const instances = [[], [], []];

    for (let i = 0, len = entityManager.entities.length; i < len; i++) {
      const instance = entityManager.entities[i];

      if (instance instanceof Enemy) {
        instances[0].push(instance);
      } else if (instance instanceof Bullet) {
        instances[1].push(instance);
      } else if (instance instanceof Item) {
        instances[2].push(instance);
      }
    }

    return instances;
  }

  checkCollisions() {
    const [enemies, bullets, items] = this.#filterInstances();
    const player = this.getEntity("player");

    for (const item of items) {
      player.collidedWith(item);
    }

    for (const enemy of enemies) {
      player.collidedWith(enemy);
      for (const bullet of bullets) {
        const collided = bullet.collidedWith(enemy);
        if (collided) return;
      }
    }
  }

  #calcHighscore() {
    const score = this.getEntity("scoreboard").score;
    const highscore = parseInt(StorageHandler.retrieveHighscore(false));
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
    setTimeout(() => {
      this.#calcHighscore();
      this.getEntity("game").stopLoop(NOT_RUNNING);
      restart.classList.remove("hide");
    }, milliseconds);
  }
}

export const gameState = new GameState();
