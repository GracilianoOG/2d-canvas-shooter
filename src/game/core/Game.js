import { Player } from "../entities/Player";
import { GameCanvas } from "../../engine/core/GameCanvas";
import { gameState } from "./GameState";
import { EnemyCreator } from "../enemy/EnemyCreator";
import { Scoreboard } from "../ui/Scoreboard";
import * as Screens from "../utils/screens";
import { Timer } from "../../engine/systems/Timer";
import { FuryMeter } from "../ui/FuryMeter";
import { TRANSPARENT_BLACK, WHITE } from "../constants/colors";
import * as States from "../../engine/constants/gameStates";
import { eventManager } from "../../engine/systems/EventManager";
import { LivesDisplay } from "../ui/LivesDisplay";
import { Engine } from "../../engine/core/Engine";
import { audioSystem } from "../../engine/systems/AudioSystem";
import { entityManager } from "../systems/EntityManager";
import { collisionManager } from "../systems/CollisionManager";
import { scoreManager } from "../systems/ScoreManager";
import audios from "@/data/audios";
import { inputManager } from "../../engine/systems/InputManager";
import { Shaker } from "@/engine/systems/Shaker";
import { Indicator } from "../ui/Indicator";
import { CSS_CLASSES } from "../utils/constants";
import { StorageHandler } from "../utils/StorageHandler";
import { config } from "../config";

export class Game {
  #state;
  #engine;
  #audio;
  #canvas;
  #shaker;
  #enemyCreator;
  #settings;
  #player;

  constructor({ width, height, margin }) {
    const container = Screens.game;
    this.#player = new Player(width / 2, height / 2, 15, 375, WHITE);
    this.#enemyCreator = new EnemyCreator({
      spawnTime: 800,
      target: this.#player,
    });
    this.#audio = audioSystem;
    this.#canvas = new GameCanvas({ width, height, margin, container });
    this.#shaker = new Shaker(this.#canvas.ctx);
    this.#engine = new Engine(this.update.bind(this), this.render.bind(this));
    this.#state = States.NOT_RUNNING;
    this.#settings = {
      trails: true,
    };

    this.#listenToWindowChange();
    this.#listenToResize();

    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
    eventManager.subscribe("playerHit", () => this.shakeScreen(3.5, 300));
    eventManager.subscribe("enemyDeath", () => this.shakeScreen(5, 300));
  }

  get state() {
    return this.#state;
  }

  #onPlayerDeath() {
    this.#state = States.GAMEOVER;
    this.#enemyCreator.stop();
    this.shakeScreen(6, 500);
    this.#prepareRestart(2400);
  }

  #listenToWindowChange() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.state === States.RUNNING) this.pause();
    });
  }

  #listenToResize() {
    window.addEventListener("resize", () => this.#canvas.resize());
  }

  #calcHighscore() {
    const highscoreEl = Screens.restart.querySelector(
      CSS_CLASSES.HIGHSCORE_POINTS,
    );
    const recordEl = Screens.restart.querySelector(".highscore__new");
    recordEl.classList.toggle("hide", !scoreManager.isHighscore());
    scoreManager.save();
    highscoreEl.textContent = StorageHandler.retrieveHighscore();
  }

  #prepareRestart(milliseconds) {
    setTimeout(() => {
      this.#calcHighscore();
      this.stopLoop(States.NOT_RUNNING);
      Screens.restart.classList.remove("hide");
    }, milliseconds);
  }

  async loadAssets() {
    await Promise.all([
      this.#audio.load("hit", audios.hit[0]),
      this.#audio.load("explosion", audios.explosion[0]),
      this.#audio.load("shot", audios.shot[0]),
      this.#audio.load("battle", audios.battle[0]),
    ]);
  }

  async init() {
    const player = this.#player;
    const hud = document.querySelector("#hud");
    const scoreboard = new Scoreboard(hud);
    const furyMeter = new FuryMeter({
      container: hud,
      label: "fury",
      value: 100,
    });
    const livesDisplay = new LivesDisplay(hud);
    livesDisplay.showCurrentLives(player.lives);
    entityManager.add(player);

    await this.loadAssets();

    gameState.addEntities({
      mainCanvas: this.#canvas,
    });

    Screens.loading.remove();
    Screens.start.classList.remove("hide");
    inputManager.init(Screens.game);
  }

  startLoop() {
    this.#engine.start();
    this.#state = States.RUNNING;
  }

  stopLoop(state) {
    this.#engine.stop();
    this.#state = state;
  }

  pause() {
    if (this.#state !== States.RUNNING && this.#state !== States.PAUSED) return;
    this.#engine.isRunning = !this.#engine.isRunning;
    this.#state = this.#engine.isRunning ? States.RUNNING : States.PAUSED;

    Indicator.toggleIndicators(this.#engine.isRunning);

    Screens.pause.classList.toggle("hide");
  }

  shakeScreen(strength, duration) {
    this.#shaker.start(strength, duration);
  }

  update(delta) {
    this.#shaker.shake();
    entityManager.renderAll(this.#canvas.ctx, delta * 0.001);
    this.#shaker.restore();

    collisionManager.checkCollisions();
    Timer.updateAll(delta);
  }

  render() {
    const { width, height } = config;
    this.#canvas.render();

    if (this.#settings.trails) {
      this.#canvas.ctx.fillStyle = TRANSPARENT_BLACK;
      this.#canvas.ctx.fillRect(0, 0, width, height);
    } else {
      this.#canvas.ctx.clearRect(0, 0, width, height);
    }
  }

  start() {
    this.#audio.playMusic("battle");
    this.#enemyCreator.start();
    this.startLoop();

    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyP") this.pause();
    });
  }

  restart() {
    const { width, height } = config;
    this.#canvas.ctx.clearRect(0, 0, width, height);
    this.#enemyCreator.reset();
    entityManager.clear([this.#player]);
    scoreManager.reset();
    this.startLoop();
    eventManager.emit("restart");
  }
}
