import { Particle } from "../Particle.js";
import { PlayerController } from "./PlayerController.js";
import { Projectile } from "../Projectile.js";
import { gameState } from "../singletons/GameState.js";
import { Fury } from "../arsenal/Fury.js";
import { eventManager } from "../singletons/EventManager.js";
import { PlayerArsenal } from "./PlayerArsenal";
import { defaultStats } from "./playerDefaultStats";
import { PlayerShield } from "./PlayerShield";
import { PlayerHUD } from "./PlayerHUD.js";

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
    eventManager.subscribe("lifeCollected", ({ item }) => {
      if (this.lives < defaultStats.lives) {
        this.#lives++;
        item.collect();
        eventManager.emit("playerHealed");
      }
    });
    eventManager.subscribe("furyCollected", ({ item }) => {
      if (!this.fury.isActive()) {
        eventManager.emit("checkFuryMeterToFill", { item, amount: 10 });
      }
    });
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
      eventManager.emit("fillFuryMeter", { amount: 2 });
    }
  }

  #getInCanvas() {
    const { width: cWidth, height: cHeight } =
      gameState.getEntity("mainCanvas");
    const pRadius = this.dimensions.radius;

    // LEFT, RIGHT, UP, DOWN
    if (this.x < pRadius) this.x = pRadius;
    if (this.x + pRadius > cWidth) this.x = cWidth - pRadius;
    if (this.y < pRadius) this.y = pRadius;
    if (this.y + pRadius > cHeight) this.y = cHeight - pRadius;
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
      return;
    }

    this.#activateShield();
  }

  kill() {
    eventManager.emit("playerDeath");
    this.fury.deactivate();
  }

  revive(x = this.x, y = this.y) {
    this.#lives = defaultStats.lives;
    this.x = x;
    this.y = y;
    this.#resetShield();
    eventManager.emit("playerRevival", { lives: this.#lives });
  }

  draw(ctx) {
    if (this.isDead) return;
    super.draw(ctx);
    this.#hud.drawHUD(ctx);
  }

  update(delta) {
    if (this.isDead) return;
    this.controller.update(delta);
    this.#getInCanvas();
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
