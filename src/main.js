import { Game } from "@/game/core/Game";
import { StorageHandler } from "@/game/StorageHandler";
import { CSS_CLASSES } from "@/game/utils/constants";
import * as Screens from "@/game/utils/screens";

const game = new Game({ width: 800, height: 600 });

const main = async () => {
  const highscoreBoard = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
  highscoreBoard.textContent = StorageHandler.retrieveHighscore();

  document.addEventListener("click", (e) => {
    e.stopPropagation();

    if (e.target.matches(".pause-btn, .pause-screen")) {
      pauseGame();
    } else if (e.target.matches(".gameover-screen__btn")) {
      restartGame();
    } else if (e.target.matches(".start-screen")) {
      startGame();
    }
  });

  await game.init();
};

const startGame = () => {
  Screens.start.remove();
  Screens.game.classList.remove("hide");
  game.start();
};

const pauseGame = () => {
  game.pause();
};

const restartGame = () => {
  Screens.restart.classList.add("hide");
  game.restart();
};

main();
