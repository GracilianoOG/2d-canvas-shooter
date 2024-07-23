import { CSS_CLASSES, STORAGE } from "./constants.js";

const formatScore = (string, length = 8) => {
  return string.padStart(length, "0");
}

const getHighscore = (isFormatted = true) => {
  const highscore = localStorage.getItem(STORAGE.KEY_POINTS) || ""

  if(isFormatted) {
    return formatScore(highscore)
  }
  return highscore
}

const storeHighscore = (score) => {
  const KEY = STORAGE.KEY_POINTS;
  const highscore = parseInt(localStorage.getItem(KEY) || 0);
  if(score > highscore) {
    localStorage.setItem(KEY, score);
  }
}

const notifyScoreEarned = (x, y, scoreAmount) => {
  const score = document.createElement("div");
  score.setAttribute("class", CSS_CLASSES.SCORE);
  score.textContent = scoreAmount;
  score.style.left = x + "px";
  score.style.top = y + "px";

  score.addEventListener("animationend", () => document.body.removeChild(score));
  document.body.appendChild(score);
}

export {
  formatScore,
  getHighscore,
  storeHighscore,
  notifyScoreEarned
}