import { Canvas } from "../Canvas.js";
import { Game } from "../game/Game.js";
import { StorageHandler } from "../StorageHandler.js";
import { CSS_CLASSES } from "../utils/constants.js";
import { pause, start, restart } from "../utils/screens.js";

const highscoreBoard = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
const hud = document.querySelector("#hud");
const pauseBtn = document.querySelector(".pause-btn");
highscoreBoard.textContent = StorageHandler.retrieveHighscore();

const game = new Game({ width: 800, height: 600 });

start.addEventListener(
  "click",
  e => {
    e.stopPropagation();
    start.classList.add("hide");
    hud.classList.remove("hide");
    game.init();
  },
  { once: true }
);

pause.addEventListener("click", e => {
  e.stopPropagation();
  game.pause();
});

pauseBtn.addEventListener("click", e => {
  e.stopPropagation();
  game.pause();
});

restart.children[1].addEventListener("click", e => {
  e.stopPropagation();
  restart.classList.add("hide");
  game.restart();
});

window.addEventListener("resize", () =>
  Canvas.resizeCanvas(game.realCanvas, game.mainCanvas)
);
