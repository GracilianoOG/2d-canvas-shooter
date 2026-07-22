import { Particle } from "./Particle.js";
import { PlayerController } from "../player/PlayerController.js";
import { Projectile } from "./Projectile.js";
import { gameState } from "../core/GameState.js";
import { Fury } from "../arsenal/Fury.js";
import { eventManager } from "../../engine/systems/EventManager.js";
import { PlayerArsenal } from "../player/PlayerArsenal.js";
import { defaultStats } from "../player/playerDefaultStats.js";
import { PlayerShield } from "../player/PlayerShield.js";
import { PlayerHUD } from "../player/PlayerHUD.js";
import * as Colors from "../utils/constants/colors.js";
import { Indicator } from "../ui/Indicator.js";

class Player extends Projectile {
  #controller;
  #weapon;
  #fury;
  #lives;
  #godMode;
  #arsenal;
  #shield;
  #hud;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);

    this.#controller = new PlayerController(this);
    this.#arsenal = new PlayerArsenal(this);
    this.#fury = new Fury(this);
    this.#lives = defaultStats.lives;
    this.#godMode = defaultStats.godMode;
    this.#shield = new PlayerShield(() => this.#onShieldDepletion());
    this.#hud = new PlayerHUD(this);

    eventManager.subscribe("enemyDeath", this.#onEnemyKilled.bind(this));
    eventManager.subscribe("shieldCollected", () => this.#activateShield(8000));
    eventManager.subscribe("lifeCollected", ({ collect }) => {
      if (this.lives < defaultStats.lives) {
        this.#lives++;
        collect();
        eventManager.emit("playerHealed");
      }
    });
    eventManager.subscribe("furyCollected", ({ collect, amount }) => {
      if (!this.fury.isActive()) {
        eventManager.emit("checkFuryMeterToFill", { collect, amount });
      }
    });
    eventManager.subscribe("activateFury", () => (this.color = Colors.RED));
    eventManager.subscribe("deactivateFury", () => (this.color = Colors.WHITE));
  }

  get lives() {
    return this.#lives;
  }

  get shield() {
    return this.#shield;
  }

  get controller() {
    return this.#controller;
  }

  get arsenal() {
    return this.#arsenal;
  }

  get weapon() {
    return this.#weapon;
  }

  set weapon(weapon) {
    this.#weapon = weapon;
  }

  get fury() {
    return this.#fury;
  }

  get isDead() {
    return this.#lives <= 0;
  }

  #onShieldDepletion() {
    this.#godMode = false;
  }

  #onEnemyKilled() {
    if (!this.fury.isActive()) {
      eventManager.emit("fillFuryMeter", { amount: 4 });
    }
  }

  #activateShield(delay) {
    this.#godMode = true;
    this.#shield.activate(delay);
  }

  #resetShield() {
    this.#godMode = false;
    this.#shield.reset();
  }

  takeHit() {
    if (this.#godMode) return;

    this.#lives--;
    eventManager.emit("playerHit", { lives: this.#lives });
    const particles = !this.isDead ? 8 : 16;
    Particle.createParticles(this.x, this.y, 8, 313, this.color, particles);

    if (this.isDead) {
      this.kill();
      Indicator.create({ x: this.x, y: this.y }, "DEATH!");
      return;
    }

    this.#activateShield();
  }

  kill() {
    eventManager.emit("playerDeath");
  }

  revive(x = this.x, y = this.y) {
    this.#lives = defaultStats.lives;
    this.x = x;
    this.y = y;
    this.#resetShield();
    eventManager.emit("playerRevival", { lives: this.#lives });
  }

  onCollision(object) {
    if (this.isDead) {
      return;
    } else if (object?.check) {
      object.check();
    } else if (object?.drop) {
      this.takeHit();
    }
  }

  draw(ctx) {
    if (this.isDead) return;
    super.draw(ctx);
    this.#hud.drawHUD(ctx);
  }

  update(delta) {
    if (this.isDead) return;
    this.controller.update(delta);
    this.getInCanvas(gameState.getEntity("mainCanvas").canvasSize);
    this.#emptyFuryMeter();
  }

  #emptyFuryMeter() {
    if (this.fury.isActive()) {
      const elapsedTime = this.fury.timer.elapsedTime;
      const furyDelay = this.fury.duration;
      const timePerc = elapsedTime / furyDelay;
      eventManager.emit("emptyFuryMeter", { timePerc });
    }
  }
}

export { Player };
