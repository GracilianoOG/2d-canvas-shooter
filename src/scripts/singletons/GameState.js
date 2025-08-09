import { Bullet } from "../arsenal/Bullet.js";
import { Enemy } from "../enemy/Enemy.js";
import { Entity } from "../Entity.js";
import { StorageHandler } from "../StorageHandler.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { GAMEOVER, NOT_RUNNING } from "../utils/constants/gameStates.js";
import { restart } from "../utils/screens.js";
import { eventManager } from "./EventManager.js";

class GameState {
  #entities;
  static instance;

  constructor() {
    if (GameState.instance) {
      return GameState.instance;
    }
    GameState.instance = this;
    eventManager.subscribe("enemyDeath", this.#onEnemyDeath.bind(this));
    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
    eventManager.subscribe("playerHit", this.#onPlayerHit.bind(this));
  }

  addEntities(newEntities) {
    this.#entities = { ...this.#entities, ...newEntities };
  }

  getEntity(name) {
    return this.#entities[name];
  }

  #onPlayerHit() {
    const lives = document.querySelector(".lives-display");
    lives.lastChild.remove();
  }

  #onEnemyDeath() {
    this.getEntity("gameAudio").playSound("explosion");
    this.getEntity("game").shakeScreen(5, 300);
  }

  #onPlayerDeath() {
    this.getEntity("gameAudio").playSound("explosion");
    this.getEntity("game").shakeScreen(6, 500);
    this.#prepareRestart(2400);
  }

  #countScore(score, color) {
    this.getEntity("scoreboard").createIndicator(score, color);
  }

  #filterInstances() {
    return Entity.instances.reduce(
      (acc, instance) => {
        if (instance instanceof Enemy) {
          acc[0].push(instance);
        } else if (instance instanceof Bullet) {
          acc[1].push(instance);
        }

        return acc;
      },
      [[], []]
    );
  }

  checkCollisions() {
    const [enemies, bullets] = this.#filterInstances();
    const player = this.getEntity("player");

    for (const enemy of enemies) {
      if (!player.isDead && player.collidedWith(enemy)) {
        player.takeHit();
      }
      for (const bullet of bullets) {
        if (bullet.collidedWith(enemy)) {
          this.#countScore(enemy.takeDamage(bullet.damage), enemy.baseColor);
          bullet.destroy();
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
    setTimeout(() => {
      this.#calcHighscore();
      this.getEntity("game").stopLoop(NOT_RUNNING);
      restart.classList.remove("hide");
      Entity.instances = [this.getEntity("player")];
    }, milliseconds);
  }
}

export const gameState = new GameState();
