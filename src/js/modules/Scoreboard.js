import { CSS_CLASSES } from "../utils/constants";

class Scoreboard {
  #score = 0;
  #length;
  #scoreboard;

  constructor(length, parent) {
    this.#length = length;
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

  #formatScore(string) {
    return string.padStart(this.#length, "0");
  }

  #showScore(score) {
    this.#scoreboard.textContent = this.#formatScore(score.toString());
  }
}

export { Scoreboard };