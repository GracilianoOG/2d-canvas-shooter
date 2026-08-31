import { Player } from "../entities/Player";
import { GameCanvas } from "../../engine/core/GameCanvas";
import { EnemyCreator } from "../enemy/EnemyCreator";
import { Scoreboard } from "../ui/Scoreboard";
import { Timer } from "../../engine/systems/Timer";
import { FuryMeter } from "../ui/FuryMeter";
import { LivesDisplay } from "../ui/LivesDisplay";
import { Engine } from "../../engine/core/Engine";
import { entityManager } from "../systems/EntityManager";
import { CollisionManager } from "../systems/CollisionManager";
import { ScoreManager } from "../systems/ScoreManager";
import audios from "@/data/audios";
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
import { Sentry } from "../entities/Sentry";
import { EventManager } from "@/engine/systems/EventManager";
import { InputManager } from "@/engine/systems/InputManager";
import { Particle } from "../entities/Particle";
import { Orb } from "../entities/Orb";
import { orbData } from "@/data/orbData";

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
  #entities;
  #events;
  #input;

  constructor({ width, height, margin }) {
    this.#audio = new AudioSystem();
    this.#events = new EventManager();
    this.#entities = entityManager;
    this.#collision = new CollisionManager();
    this.#screens = new ScreenManager(this.#events);
    this.#engine = new Engine(this.update.bind(this), this.render.bind(this));

    this.#settings = {
      trails: true,
    };

    const container = this.#screens.get("container");
    this.#canvas = new GameCanvas({ width, height, margin, container });
    this.#shaker = new Shaker(this.#canvas.ctx);
    this.#renderer = new Renderer(this.#canvas, this.#settings);
    this.#input = new InputManager(this.#canvas);

    this.#player = new Player(this.#entities, this.#events, this.#input);
    this.#score = new ScoreManager(this.#events);
    this.#enemyCreator = new EnemyCreator(
      this.#player,
      this.#entities,
      this.#events,
    );

    this.#listenToWindowChange();
    this.#listenToResize();
    this.#initListeners();
  }

  get state() {
    return this.#engine.state;
  }

  #onPlayerDeath() {
    this.#enemyCreator.stop();
    this.shakeScreen(6, 500);
    this.#prepareRestart(2400);
  }

  #initListeners() {
    this.#events.on("startGame", () => this.start());
    this.#events.on("restartGame", () => this.restart());
    this.#events.on("pauseGame", () => this.pause());
    this.#events.on("drop", (x, y, item) => {
      this.#entities.add(x, y, item, Layers.ITEMS);
      item.getInCanvas(config);
    });
    this.#events.on("playerHit", ({ lives }) => {
      this.shakeScreen(3.5, 300);
      this.#audio.play(lives ? "hit" : "explosion");
      if (!lives) this.#onPlayerDeath();
    });
    this.#events.on("enemyDeath", () => this.shakeScreen(5, 300));
    this.#events.on("audio", (name) => this.#audio.play(name));
    this.#events.on("indicate", (pos, txt, col) => {
      const { x: fX, y: fY } = this.#canvas.factors;
      Indicator.create({ x: pos.x * fX, y: pos.y * fY }, txt, col);
    });
    this.#events.on("sentryPickup", (sentryItem) => {
      this.#entities.add(
        sentryItem.x,
        sentryItem.y,
        new Sentry(this.#entities, this.#events),
      );
      sentryItem.collect();
    });
    this.#events.on("nukePickup", (nukeItem) => {
      for (const enemy of this.#entities.get(Layers.ENEMIES)) {
        enemy.takeDamage(enemy.health);
      }
      nukeItem.collect();
    });
    this.#events.on("spawnParticles", (x, y, amount, color) => {
      Particle.create(this.#entities, x, y, amount, color);
    });
    this.#events.on("spawnOrbs", (x, y, orbs) => {
      for (let i = 0; i < orbs; i++) {
        this.#entities.add(
          x,
          y,
          new Orb(orbData, this.#entities, this.#events),
          Layers.ORB,
        );
      }
    });
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
    const scoreboard = new Scoreboard(hud, this.#events);
    const furyMeter = new FuryMeter(
      {
        container: hud,
        label: "fury",
        value: 100,
      },
      this.#events,
    );
    const livesDisplay = new LivesDisplay(hud, this.#events);
    livesDisplay.showCurrentLives(player.lives);
    const { width, height } = config;
    this.#entities.add(width / 2, height / 2, player, Layers.PLAYER);

    await this.loadAssets();

    this.#screens.remove("loading");
    this.#screens.show("start");
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
    this.#entities.manage(delta * 0.001);
    this.#collision.check(this.#entities);
    Timer.updateAll(delta);
  }

  render() {
    this.#shaker.shake();
    this.#renderer.render(this.#entities);
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
    this.#entities.clear();
    this.#entities.add(width / 2, height / 2, this.#player, Layers.PLAYER);
    this.#score.reset();
    this.startLoop();
    this.#events.emit("restart");
  }
}
