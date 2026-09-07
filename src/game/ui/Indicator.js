export class Indicator {
  static #setup(indicator, position, text, color) {
    indicator.style.left = `${position.x}px`;
    indicator.style.top = `${position.y}px`;
    indicator.style.color = color;
    indicator.textContent = text;
  }

  static create(position, text, color = "#fff") {
    const container = document.querySelector("#hud");

    const indicator = document.createElement("div");
    indicator.setAttribute("class", "indicator");
    Indicator.#setup(indicator, position, text, color);

    indicator.addEventListener("animationend", () => indicator.remove());
    container.appendChild(indicator);
  }

  static toggleAll() {
    const indicators = document.querySelectorAll(".indicator");

    for (const ind of indicators) {
      ind.classList.toggle("indicator--paused");
    }
  }
}
