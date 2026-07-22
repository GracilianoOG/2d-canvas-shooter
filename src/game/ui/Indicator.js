import { gameState } from "../core/GameState";

export class Indicator {
  static create(position, text, color = "#fff") {
    const indicator = document.createElement("div");
    const container = document.querySelector("#status-container");
    const factors = gameState.getEntity("mainCanvas").factors;

    indicator.setAttribute("class", "indicator");
    indicator.textContent = text;
    indicator.style.left = `${position.x * factors.x}px`;
    indicator.style.top = `${position.y * factors.y}px`;
    indicator.style.color = color;

    indicator.addEventListener(
      "animationend",
      () => container.removeChild(indicator),
      { once: true },
    );
    container.appendChild(indicator);
  }
}
