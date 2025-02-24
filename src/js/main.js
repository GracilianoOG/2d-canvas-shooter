import { Game } from "./game/Game.js";
import { Scoreboard } from "./score/Scoreboard.js";
import { CSS_CLASSES } from "./utils/constants.js";

const highscoreBoard = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
const startScreen = document.querySelector(CSS_CLASSES.GAME_START);
highscoreBoard.textContent = Scoreboard.retrieveHighscore();

const game = new Game();

startScreen.addEventListener(
  "click",
  e => {
    e.stopPropagation();
    startScreen.classList.add("hide");
    game.init();
  },
  { once: true }
);
