import { StorageHandler } from "../StorageHandler.js";
import { scoreManager } from "../systems/ScoreManager.js";
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
    scoreManager.add(score);
  }

  #calcHighscore() {
    const highscoreEl = restart.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
    const recordEl = restart.querySelector(".highscore__new");
    recordEl.classList.toggle("hide", !scoreManager.isHighscore());
    scoreManager.save();
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
