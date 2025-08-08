import { Canvas } from "../Canvas.js";
import { Game } from "../game/Game.js";
import { StorageHandler } from "../StorageHandler.js";
import { CSS_CLASSES } from "../utils/constants.js";
import * as Screens from "../utils/screens.js";
import "../../styles/main.scss";

const highscoreBoard = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
const pauseBtn = document.querySelector(".pause-btn");
const restartBtn = document.querySelector(".gameover-screen__btn");
highscoreBoard.textContent = StorageHandler.retrieveHighscore();

const game = new Game({ width: 800, height: 600 });

Screens.start.addEventListener(
  "click",
  e => {
    e.stopPropagation();
    Screens.start.classList.add("hide");
    Screens.game.classList.remove("hide");
    game.init();
  },
  { once: true }
);

Screens.pause.addEventListener("click", e => {
  e.stopPropagation();
  game.pause();
});

restartBtn.addEventListener("click", e => {
  e.stopPropagation();
  Screens.restart.classList.add("hide");
  game.restart();
});

pauseBtn.addEventListener("click", e => {
  e.stopPropagation();
  game.pause();
});

window.addEventListener("resize", () =>
  Canvas.resizeCanvas(game.realCanvas, game.mainCanvas)
);
