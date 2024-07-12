import { STORAGE } from "./constants.js";

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

export {
  formatScore,
  getHighscore,
  storeHighscore
}