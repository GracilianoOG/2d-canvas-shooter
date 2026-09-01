import { StorageHandler } from "../utils/StorageHandler";

export class ScoreManager {
  #score;
  #events;

  constructor(events) {
    this.#score = 0;
    this.#events = events;
    events.on("score", this.#countScore.bind(this));
    events.on("addScore", (score) => this.add(score));
  }

  get score() {
    return this.#score;
  }

  get highscore() {
    return parseInt(StorageHandler.retrieveHighscore(false));
  }

  #countScore(position, score, color) {
    this.#events.emit("indicate", position, score, color);
    this.add(score);
  }

  add(score) {
    this.#score += score;
    this.#events.emit("setScore", this.#score);
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
    this.#events.emit("setScore", 0);
  }
}
