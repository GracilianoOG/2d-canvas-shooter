export class Scoreboard {
  #length = 7;
  #scoreboardEl;

  static formatScore(string, length = 7) {
    return string.padStart(length, "0");
  }

  constructor(containerEl, events) {
    this.#scoreboardEl = document.createElement("h2");
    this.#scoreboardEl.classList.add("scoreboard");
    containerEl.prepend(this.#scoreboardEl);
    this.#showScore(0);
    events.on("setScore", ({ score }) => this.#showScore(score));
  }

  #showScore(score) {
    this.#scoreboardEl.textContent = Scoreboard.formatScore(
      score.toString(),
      this.#length,
    );
  }
}
