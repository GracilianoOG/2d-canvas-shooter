import { Player } from "../entities/Player";
import { GameCanvas } from "../../engine/core/GameCanvas";
import { EnemyCreator } from "../enemy/EnemyCreator";
import { Scoreboard } from "../ui/Scoreboard";
import { Timer } from "../../engine/systems/Timer";
import { FuryMeter } from "../ui/FuryMeter";
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
import { States } from "@/engine/constants/gameStates";
import { Renderer } from "../systems/Renderer";
import { Layers } from "../constants/layers";
import { playerData } from "@/data/playerData";

export class Game {
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
  #renderer;

  constructor({ width, height, margin }) {
    this.#player = new Player(playerData);
    this.#score = new ScoreManager();
    this.#enemyCreator = new EnemyCreator({
      spawnTime: 800,
      target: this.#player,
    });
    this.#audio = new AudioSystem();
    this.#collision = new CollisionManager();
    this.#screens = new ScreenManager(this);
    this.#engine = new Engine(this.update.bind(this), this.render.bind(this));

    const container = this.#screens.get("container");
    this.#canvas = new GameCanvas({ width, height, margin, container });
    this.#shaker = new Shaker(this.#canvas.ctx);

    this.#settings = {
      trails: true,
    };

    this.#renderer = new Renderer(this.#canvas, this.#settings);

    this.#listenToWindowChange();
    this.#listenToResize();

    eventManager.subscribe("drop", (x, y, item) =>
      entityManager.add(x, y, item, Layers.ITEMS),
    );
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
    return this.#engine.state;
  }

  #onPlayerDeath() {
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
    const highscoreEl = this.#screens
      .get("restart")
      .querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
    const recordEl = this.#screens
      .get("restart")
      .querySelector(".highscore__new");
    recordEl.classList.toggle("hide", !this.#score.isHighscore());
    this.#score.save();
    highscoreEl.textContent = StorageHandler.retrieveHighscore();
  }

  #prepareRestart(milliseconds) {
    setTimeout(() => {
      this.#calcHighscore();
      this.stopLoop();
      this.#screens.show("restart");
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
    const { width, height } = config;
    entityManager.add(width / 2, height / 2, player, Layers.PLAYER);

    await this.loadAssets();

    this.#screens.remove("loading");
    this.#screens.show("start");
    inputManager.init(this.#canvas);
  }

  startLoop() {
    this.#engine.start();
  }

  stopLoop() {
    this.#engine.stop();
  }

  pause() {
    if (this.#player.isDead) return;
    const isRunning = this.state === States.RUNNING;
    Indicator.toggleIndicators(!isRunning);
    this.#screens.toggle("pause", !isRunning);
    isRunning ? this.stopLoop() : this.startLoop();
  }

  shakeScreen(strength, duration) {
    this.#shaker.start(strength, duration);
  }

  update(delta) {
    entityManager.manage(delta * 0.001);
    this.#collision.check(entityManager);
    Timer.updateAll(delta);
  }

  render() {
    this.#shaker.shake();
    this.#renderer.render(entityManager);
    this.#shaker.restore();
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
    entityManager.clear();
    entityManager.add(width / 2, height / 2, this.#player, Layers.PLAYER);
    this.#score.reset();
    this.startLoop();
    eventManager.emit("restart");
  }
}
