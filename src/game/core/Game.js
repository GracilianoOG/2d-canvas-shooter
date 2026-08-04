import { Player } from "../entities/Player";
import { GameCanvas } from "../../engine/core/GameCanvas";
import { EnemyCreator } from "../enemy/EnemyCreator";
import { Scoreboard } from "../ui/Scoreboard";
import { Timer } from "../../engine/systems/Timer";
import { FuryMeter } from "../ui/FuryMeter";
import { TRANSPARENT_BLACK, WHITE } from "../constants/colors";
import * as States from "../../engine/constants/gameStates";
import { eventManager } from "../../engine/systems/EventManager";
import { LivesDisplay } from "../ui/LivesDisplay";
import { Engine } from "../../engine/core/Engine";
import { entityManager } from "../systems/EntityManager";
import { CollisionManager } from "../systems/CollisionManager";
import { ScoreManager } from "../systems/ScoreManager";
import audios from "@/data/audios";
import { inputManager } from "../../engine/systems/InputManager";
import { Shaker } from "@/engine/systems/Shaker";
import { Indicator } from "../ui/Indicator";
import { CSS_CLASSES } from "../utils/constants";
import { StorageHandler } from "../utils/StorageHandler";
import { config } from "../config";
import { ScreenManager } from "../systems/ScreenManager";
import { AudioSystem } from "@/engine/systems/AudioSystem";

export class Game {
  #state;
  #engine;
  #audio;
  #canvas;
  #shaker;
  #enemyCreator;
  #settings;
  #player;
  #screens;
  #score;
  #collision;

  constructor({ width, height, margin }) {
    this.#player = new Player(width / 2, height / 2, 15, 375, WHITE);
    this.#score = new ScoreManager();
    this.#enemyCreator = new EnemyCreator({
      spawnTime: 800,
      target: this.#player,
    });
    this.#audio = new AudioSystem();
    this.#collision = new CollisionManager();
    this.#screens = new ScreenManager(this);
    this.#engine = new Engine(this.update.bind(this), this.render.bind(this));
    this.#state = States.NOT_RUNNING;

    const container = this.#screens.container;
    this.#canvas = new GameCanvas({ width, height, margin, container });
    this.#shaker = new Shaker(this.#canvas.ctx);

    this.#settings = {
      trails: true,
    };

    this.#listenToWindowChange();
    this.#listenToResize();

    eventManager.subscribe("playerHit", ({ lives }) => {
      this.shakeScreen(3.5, 300);
      this.#audio.play(lives ? "hit" : "explosion");
      if (!lives) this.#onPlayerDeath();
    });
    eventManager.subscribe("enemyDeath", () => this.shakeScreen(5, 300));
    eventManager.subscribe("audio", (name) => this.#audio.play(name));
    eventManager.subscribe("indicate", (pos, txt, col) => {
      const { x: fX, y: fY } = this.#canvas.factors;
      Indicator.create({ x: pos.x * fX, y: pos.y * fY }, txt, col);
    });
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
    const highscoreEl = this.#screens.restart.querySelector(
      CSS_CLASSES.HIGHSCORE_POINTS,
    );
    const recordEl = this.#screens.restart.querySelector(".highscore__new");
    recordEl.classList.toggle("hide", !this.#score.isHighscore());
    this.#score.save();
    highscoreEl.textContent = StorageHandler.retrieveHighscore();
  }

  #prepareRestart(milliseconds) {
    setTimeout(() => {
      this.#calcHighscore();
      this.stopLoop(States.NOT_RUNNING);
      this.#screens.restart.classList.remove("hide");
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

    this.#screens.loading.remove();
    this.#screens.start.classList.remove("hide");
    inputManager.init(this.#canvas);
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

    this.#screens.pause.classList.toggle("hide");
  }

  shakeScreen(strength, duration) {
    this.#shaker.start(strength, duration);
  }

  update(delta) {
    this.#shaker.shake();
    entityManager.renderAll(this.#canvas.ctx, delta * 0.001);
    this.#shaker.restore();

    this.#collision.check();
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
    this.#score.reset();
    this.startLoop();
    eventManager.emit("restart");
  }
}
