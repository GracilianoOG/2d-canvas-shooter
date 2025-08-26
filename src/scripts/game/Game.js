import { Player } from "../player/Player.js";
import { Canvas } from "../Canvas.js";
import { gameState } from "../singletons/GameState.js";
import { EnemyCreator } from "../enemy/EnemyCreator.js";
import { GameAudio } from "../audio/GameAudio.js";
import { Scoreboard } from "../score/Scoreboard.js";
import * as Screens from "../utils/screens.js";
import { Timer } from "../Timer.js";
import { randomInt } from "../utils/utility.js";
import { Entity } from "../Entity.js";
import { FuryMeter } from "../FuryMeter.js";
import { TRANSPARENT_BLACK, WHITE } from "../utils/constants/colors.js";
import * as States from "../utils/constants/gameStates.js";
import { eventManager } from "../singletons/EventManager.js";
import { LivesDisplay } from "../LivesDisplay.js";

class Game {
  #rafId;
  #lastTime;
  #deltaTime;
  #state;
  #shake;
  #MAX_FPS = 60;
  #TARGET_FPS = 1000 / this.#MAX_FPS;

  constructor(configs) {
    this.#rafId = null;
    this.#lastTime = null;
    this.#deltaTime = null;
    this.#state = States.NOT_RUNNING;
    this.#shake = { strength: 0, timer: null };
    this.enemyCreator = new EnemyCreator();
    this.audioManager = new GameAudio();

    this.mainCanvas = new Canvas(configs.width, configs.height);
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    this.trailsCanvas = new Canvas(mWidth, mHeight);
    this.realCanvas = new Canvas(mWidth, mHeight, Screens.game);

    this.#listenToWindowChange();
    this.#listenToResize();

    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
  }

  loop() {
    this.#rafId = requestAnimationFrame(this.animate);
  }

  startLoop() {
    this.#state = States.RUNNING;
    this.loop();
  }

  stopLoop(state) {
    this.#state = state;
    this.#lastTime = null;
    cancelAnimationFrame(this.#rafId);
  }

  pause() {
    if (this.#state === States.GAMEOVER || this.#state === States.NOT_RUNNING) {
      return;
    }

    if (this.#state === States.RUNNING) {
      this.stopLoop(States.PAUSED);
    } else {
      this.startLoop();
    }

    const indicators = document.querySelectorAll(".score");
    indicators.forEach(
      i => (i.style.animationPlayState = this.#state.toLowerCase())
    );

    Screens.pause.classList.toggle("hide");
  }

  shakeScreen(strength, duration) {
    this.#shake.strength = strength;
    if (!this.#shake.timer)
      this.#shake.timer = new Timer(duration, { loop: false });
    this.#shake.timer.reset(duration);
  }

  animate = timestamp => {
    if (!this.#lastTime === null) this.#lastTime = timestamp;

    this.#deltaTime = timestamp - this.#lastTime;

    if (this.#deltaTime >= this.#TARGET_FPS) {
      const maxDelta = Math.min(currentTime - this.#lastTime, this.#TARGET_FPS);
      const excessTime = this.#deltaTime % this.#TARGET_FPS;
      this.#lastTime = currentTime - excessTime;

      if (this.#shake.timer?.active) {
        const strength = this.#shake.strength;
        const xOffset = randomInt(-strength, strength);
        const yOffset = randomInt(-strength, strength);
        this.mainCanvas.context.translate(xOffset, yOffset);
      }
      this.update(maxDelta);
      this.mainCanvas.context.setTransform(1, 0, 0, 1, 0, 0);
      this.render();
    }
    this.loop();
  };

  update(delta) {
    Entity.updateAll(this.mainCanvas.context, delta / 16);
    Timer.updateAll(delta);
    gameState.checkCollisions();
  }

  render() {
    const { width: tWidth, height: tHeight } = this.trailsCanvas;
    const { width: rWidth, height: rHeight } = this.realCanvas;
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const mCanvas = this.mainCanvas.canvas;

    // Create trail effect
    this.trailsCanvas.context.drawImage(mCanvas, 0, 0);
    this.trailsCanvas.context.fillStyle = TRANSPARENT_BLACK;
    this.trailsCanvas.context.fillRect(0, 0, tWidth, tHeight);

    // Clear real canvas
    this.realCanvas.context.clearRect(0, 0, rWidth, rHeight);

    // Draw buffer canvas on real canvas (all game objects)
    this.realCanvas.context.drawImage(mCanvas, 0, 0, rWidth, rHeight);

    // Clear buffer canvas so it won't draw a messed up image next frame
    this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);

    // Draw background
    this.mainCanvas.context.drawImage(this.trailsCanvas.canvas, 0, 0);
  }

  init() {
    // GameState
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const player = new Player(mWidth / 2, mHeight / 2, 15, 6, WHITE);
    const hud = document.querySelector("#hud");
    const scoreboard = new Scoreboard(hud);
    const furyMeter = new FuryMeter(hud);
    const livesDisplay = new LivesDisplay(hud);
    livesDisplay.showCurrentLives(player.lives);

    gameState.addEntities({
      mainCanvas: this.mainCanvas,
      realCanvas: this.realCanvas,
      player,
      gameAudio: this.audioManager,
      scoreboard,
      furyMeter,
      livesDisplay,
      game: this,
    });

    // General & Animation
    Canvas.resizeCanvas(this.realCanvas, this.mainCanvas);
    this.audioManager.playMusic("battle");

    document.addEventListener("keydown", e => {
      if (e.code === "KeyP") this.pause();
    });

    this.enemyCreator.start();
    this.startLoop();
  }

  restart() {
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const { width: tWidth, height: tHeight } = this.trailsCanvas;
    const player = gameState.getEntity("player");
    this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);
    this.trailsCanvas.context.clearRect(0, 0, tWidth, tHeight);
    gameState.getEntity("scoreboard").reset();
    gameState.getEntity("furyMeter").empty();
    player.revive(mWidth / 2, mHeight / 2);
    this.enemyCreator.reset();
    this.startLoop();
  }

  #onPlayerDeath() {
    this.#state = States.GAMEOVER;
    this.enemyCreator.stop();
  }

  #listenToWindowChange() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.#state === States.RUNNING) this.pause();
    });
  }

  #listenToResize() {
    window.addEventListener("resize", () =>
      Canvas.resizeCanvas(this.realCanvas, this.mainCanvas)
    );
  }
}

export { Game };
