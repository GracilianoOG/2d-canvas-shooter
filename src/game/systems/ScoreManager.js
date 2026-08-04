import { eventManager } from "../../engine/systems/EventManager";
import { StorageHandler } from "../utils/StorageHandler";

export class ScoreManager {
  #score;

  constructor() {
    this.#score = 0;
    eventManager.subscribe("enemyHit", this.#countScore.bind(this));
  }

  get score() {
    return this.#score;
  }

  get highscore() {
    return parseInt(StorageHandler.retrieveHighscore(false));
  }

  #countScore({ position, score, color }) {
    eventManager.emit("indicate", position, score, color);
    this.add(score);
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
