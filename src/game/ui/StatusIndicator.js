import { gameState } from "../core/GameState";

class StatusIndicator {
  static create(x, y, text, color = "#fff") {
    const scoreEl = document.createElement("div");
    const container = document.querySelector("#status-container");
    const factors = gameState.getEntity("mainCanvas").factors;

    scoreEl.setAttribute("class", "score");
    scoreEl.textContent = text;
    scoreEl.style.left = `${x * factors.x}px`;
    scoreEl.style.top = `${y * factors.y}px`;
    scoreEl.style.color = color;

    scoreEl.addEventListener(
      "animationend",
      () => container.removeChild(scoreEl),
      { once: true },
    );
    container.appendChild(scoreEl);
  }
}

export { StatusIndicator };
