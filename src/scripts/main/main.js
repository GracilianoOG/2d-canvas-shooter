import { Game } from "../game/Game.js";
import { Scoreboard } from "../score/Scoreboard.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { pause, start } from "../utils/screens.js";

const highscoreBoard = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
highscoreBoard.textContent = Scoreboard.retrieveHighscore();

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
