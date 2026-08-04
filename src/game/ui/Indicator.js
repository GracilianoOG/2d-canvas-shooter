export class Indicator {
  static create(position, text, color = "#fff") {
    const indicator = document.createElement("div");
    const container = document.querySelector("#status-container");

    indicator.setAttribute("class", "indicator");
    indicator.textContent = text;
    indicator.style.left = `${position.x}px`;
    indicator.style.top = `${position.y}px`;
    indicator.style.color = color;

    indicator.addEventListener(
      "animationend",
      () => container.removeChild(indicator),
      { once: true },
    );
    container.appendChild(indicator);
  }

  static toggleIndicators(state) {
    const indicators = document.querySelectorAll(".indicator");
    const playState = state ? "running" : "paused";

    for (const ind of indicators) {
      ind.style.animationPlayState = playState;
    }
  }
}
