import { eventManager } from "../../engine/systems/EventManager";
import { StorageHandler } from "../StorageHandler";

class ScoreManager {
  #score;

  constructor() {
    this.#score = 0;
  }

  get score() {
    return this.#score;
  }

  get highscore() {
    return parseInt(StorageHandler.retrieveHighscore(false));
  }

  add(score) {
    this.#score += score;
    eventManager.emit("setScore", { score: this.#score });
  }

  isHighscore() {
    return this.score > this.highscore;
  }

  save() {
    if (this.isHighscore()) {
      StorageHandler.storeHighscore(this.score);
    }
  }

  reset() {
    this.#score = 0;
    eventManager.emit("setScore", { score: 0 });
  }
}

export const scoreManager = new ScoreManager();
