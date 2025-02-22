import { CSS_CLASSES } from "../utils/constants";

class StatusIndicator {
  static create(x, y, score, container) {
    const scoreEl = document.createElement("div");
    scoreEl.setAttribute("class", CSS_CLASSES.SCORE);
    scoreEl.textContent = score;
    scoreEl.style.left = `${x}px`;
    scoreEl.style.top = `${y}px`;

    scoreEl.addEventListener(
      "animationend",
      () => container.removeChild(scoreEl),
      { once: true }
    );
    container.appendChild(scoreEl);
  }
}

export { StatusIndicator };
