import { CSS_CLASSES } from "./constants.js";

export const notifyScoreEarned = (x, y, scoreAmount) => {
  const scoreEl = document.createElement("div");
  scoreEl.setAttribute("class", CSS_CLASSES.SCORE);
  scoreEl.textContent = scoreAmount;
  scoreEl.style.left = `${x}px`;
  scoreEl.style.top = `${y}px`;

  scoreEl.addEventListener(
    "animationend",
    () => document.body.removeChild(scoreEl),
    { once: true }
  );
  document.body.appendChild(scoreEl);
};
