import { Scoreboard } from "./score/Scoreboard";

class StorageHandler {
  static KEY_POINTS = "js-shooter-highscore";

  static retrieveHighscore(isFormatted = true) {
    const highscore = localStorage.getItem(StorageHandler.KEY_POINTS) || "";
    return isFormatted ? Scoreboard.formatScore(highscore) : highscore;
  }

  static storeHighscore(score) {
    localStorage.setItem(StorageHandler.KEY_POINTS, score);
  }
}

export { StorageHandler };
