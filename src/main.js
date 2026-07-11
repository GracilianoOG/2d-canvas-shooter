import { Game } from "@/scripts/game/Game";
import { StorageHandler } from "@/scripts/StorageHandler";
import { CSS_CLASSES } from "@/scripts/utils/constants";
import * as Screens from "@/scripts/utils/screens";
import "@/styles/main.scss";

const highscoreBoard = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
const pauseBtn = document.querySelector(".pause-btn");
const restartBtn = document.querySelector(".gameover-screen__btn");
highscoreBoard.textContent = StorageHandler.retrieveHighscore();

const game = new Game({ width: 800, height: 600 });
await game.init();

const startGame = (e) => {
  e.stopPropagation();
  Screens.start.remove();
  Screens.game.classList.remove("hide");
  game.start();
};

const pauseGame = (e) => {
  e?.stopPropagation();
  game.pause();
};

const restartGame = (e) => {
  e.stopPropagation();
  Screens.restart.classList.add("hide");
  game.restart();
};

Screens.start.addEventListener("click", startGame, { once: true });
Screens.pause.addEventListener("click", pauseGame);

restartBtn.addEventListener("click", restartGame);
pauseBtn.addEventListener("click", pauseGame);
