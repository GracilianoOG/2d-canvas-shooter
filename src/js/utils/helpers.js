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

export {
  formatScore,
  getHighscore
}