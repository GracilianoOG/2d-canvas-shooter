import { Game } from "../game/Game.js";
import { StorageHandler } from "../StorageHandler.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { pause, start } from "../utils/screens.js";

const highscoreBoard = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
highscoreBoard.textContent = StorageHandler.retrieveHighscore();

const game = new Game();

start.addEventListener(
  "click",
  e => {
    e.stopPropagation();
    start.classList.add("hide");
    game.init();
  },
  { once: true }
);

pause.addEventListener("click", e => {
  e.stopPropagation();
  game.pause();
});
