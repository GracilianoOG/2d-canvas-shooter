import { StorageHandler } from "../StorageHandler.js";
import { scoreManager } from "../systems/ScoreManager.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { NOT_RUNNING } from "../../engine/constants/gameStates.js";
import { restart } from "../utils/screens.js";
import { eventManager } from "../../engine/systems/EventManager.js";

class GameState {
  #entities;

  constructor() {
    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
  }

  addEntities(newEntities) {
    this.#entities = { ...this.#entities, ...newEntities };
  }

  getEntity(name) {
    return this.#entities[name];
  }

  #onPlayerDeath() {
    this.#prepareRestart(2400);
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
