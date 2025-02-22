import { CSS_CLASSES, STORAGE } from "../utils/constants.js";

class Scoreboard {
  #score = 0;
  #length = 8;
  #scoreboard;

  static retrieveHighscore(isFormatted = true) {
    const highscore = localStorage.getItem(STORAGE.KEY_POINTS) || "";
    return isFormatted ? Scoreboard.formatScore(highscore) : highscore;
  }

  static storeHighscore(score) {
    const KEY = STORAGE.KEY_POINTS;
    const highscore = parseInt(localStorage.getItem(KEY) || 0);
    if (score > highscore) {
      localStorage.setItem(KEY, score);
    }
  }

  static formatScore(string, length = 8) {
    return string.padStart(length, "0");
  }

  constructor(parent) {
    this.#scoreboard = document.createElement("h2");
    this.#scoreboard.classList.add(CSS_CLASSES.SCOREBOARD);
    this.#showScore(this.#score.toString());
    parent.prepend(this.#scoreboard);
  }

  get score() {
    return this.#score;
  }

  set score(score) {
    this.#score = score;
    this.#showScore(score);
  }

  #showScore(score) {
    this.#scoreboard.textContent = Scoreboard.formatScore(
      score.toString(),
      this.#length
    );
  }
}

export { Scoreboard };
