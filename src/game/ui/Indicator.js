export class Indicator {
  static create(position, text, color = "#fff") {
    const container = document.querySelector("#status-container");

    const pooled = container.querySelector("[data-pooled]");

    if (pooled) {
      pooled.textContent = text;
      pooled.style.left = `${position.x}px`;
      pooled.style.top = `${position.y}px`;
      pooled.style.color = color;
      pooled.getAnimations()[0].play();
      pooled.removeAttribute("data-pooled");
      return;
    }

    const indicator = document.createElement("div");

    indicator.setAttribute("class", "indicator");
    indicator.textContent = text;
    indicator.style.left = `${position.x}px`;
    indicator.style.top = `${position.y}px`;
    indicator.style.color = color;

    indicator.addEventListener(
      "animationend",
      () => (indicator.dataset.pooled = ""),
    );
    container.appendChild(indicator);
  }

  static toggleIndicators(state) {
    const indicators = document.querySelectorAll(".indicator");
    const playState = state ? "" : "paused";

    for (const ind of indicators) {
      ind.style.animationPlayState = playState;
    }
  }
}
