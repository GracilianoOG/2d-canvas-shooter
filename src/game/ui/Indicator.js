export class Indicator {
  static #setup(indicator, position, text, color) {
    indicator.style.left = `${position.x}px`;
    indicator.style.top = `${position.y}px`;
    indicator.style.color = color;
    indicator.textContent = text;
  }

  static create(position, text, color = "#fff") {
    const container = document.querySelector("#status-container");
    const pooled = container.querySelector("[data-pooled]");

    if (pooled) {
      Indicator.#setup(pooled, position, text, color);
      pooled.getAnimations()[0].play();
      pooled.removeAttribute("data-pooled");
      return;
    }

    const indicator = document.createElement("div");
    indicator.setAttribute("class", "indicator");
    Indicator.#setup(indicator, position, text, color);

    indicator.addEventListener(
      "animationend",
      () => (indicator.dataset.pooled = ""),
    );
    container.appendChild(indicator);
  }

  static toggle(state) {
    const indicators = document.querySelectorAll(".indicator");
    const playState = state ? "" : "paused";

    for (const ind of indicators) {
      ind.style.animationPlayState = playState;
    }
  }
}
