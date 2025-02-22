import { CSS_CLASSES } from "./constants.js";

export const notifyScoreEarned = (x, y, scoreAmount) => {
  const score = document.createElement("div");
  score.setAttribute("class", CSS_CLASSES.SCORE);
  score.textContent = scoreAmount;
  score.style.left = x + "px";
  score.style.top = y + "px";

  score.addEventListener("animationend", () =>
    document.body.removeChild(score)
  );
  document.body.appendChild(score);
};
