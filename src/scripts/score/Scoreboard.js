import { CSS_CLASSES, STORAGE } from "../utils/constants.js";
import { StatusIndicator } from "../StatusIndicator.js";
import { randomInt } from "../utils/utility.js";

class Scoreboard {
  #score = 0;
  #length = 8;
  #scoreboardEl;

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
    this.#scoreboardEl = document.createElement("h2");
    this.#scoreboardEl.classList.add(CSS_CLASSES.SCOREBOARD);
    this.#showScore(this.#score.toString());
    parent.prepend(this.#scoreboardEl);
  }

  get score() {
    return this.#score;
  }

  set score(score) {
    this.#score = score;
    this.#showScore(score);
  }

  createIndicator(score, color) {
    const { width, height, x, y } = this.#scoreboardEl.getBoundingClientRect();
    const xPos = width / 2 + x + randomInt(-50, 50);
    const yPos = height * 3 + y + randomInt(1, 10);
    this.score += score;
    StatusIndicator.create(xPos, yPos, score, document.body, color);
  }

  #showScore(score) {
    this.#scoreboardEl.textContent = Scoreboard.formatScore(
      score.toString(),
      this.#length
    );
  }
}

export { Scoreboard };
