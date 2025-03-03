import { Scoreboard } from "./score/Scoreboard";

class StorageHandler {
  static KEY_POINTS = "js-shooter-highscore";

  static retrieveHighscore(isFormatted = true) {
    const highscore = localStorage.getItem(StorageHandler.KEY_POINTS) || "";
    return isFormatted ? Scoreboard.formatScore(highscore) : highscore;
  }

  static storeHighscore(score) {
    const KEY = StorageHandler.KEY_POINTS;
    const highscore = parseInt(localStorage.getItem(KEY) || 0);
    if (score > highscore) {
      localStorage.setItem(KEY, score);
    }
  }
}

export { StorageHandler };
