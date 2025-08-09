import { Particle } from "../Particle.js";
import { PlayerController } from "./PlayerController.js";
import { Weapon } from "../arsenal/Weapon.js";
import { Projectile } from "../Projectile.js";
import { gameState } from "../singletons/GameState.js";
import { Fury } from "../arsenal/Fury.js";
import { eventManager } from "../singletons/EventManager.js";
import { Timer } from "../Timer.js";

const defaultValues = Object.freeze({
  lives: 3,
  godMode: false,
  isDead: false,
  shieldDelay: 1500,
});

class Player extends Projectile {
  #isDead;
  #controller;
  #weapon;
  #fury;
  #lives;
  #godMode;
  #damageTimer;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);

    this.#controller = new PlayerController(this);
    this.#isDead = defaultValues.isDead;
    this.#weapon = new Weapon(this);
    this.#fury = new Fury(this);
    this.#lives = defaultValues.lives;
    this.#godMode = defaultValues.godMode;
    this.#damageTimer = new Timer(
      defaultValues.shieldDelay,
      { autostart: false, loop: false },
      this.#onShieldDepletion.bind(this)
    );

    eventManager.subscribe("enemyDeath", this.#onEnemyKilled.bind(this));
  }

  get lives() {
    return this.#lives;
  }

  get controller() {
    return this.#controller;
  }

  get weapon() {
    return this.#weapon;
  }

  get fury() {
    return this.#fury;
  }

  get isDead() {
    return this.#isDead;
  }

  set isDead(isDead) {
    this.#isDead = isDead;
  }

  #onShieldDepletion() {
    this.#godMode = false;
  }

  #onEnemyKilled() {
    if (!this.fury.isActive()) {
      eventManager.emit("fillFuryMeter", { amount: 5 });
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

  takeHit() {
    if (this.#godMode) return;

    this.#lives--;
    eventManager.emit("playerHit", { lives: this.#lives });

    if (this.#lives <= 0) {
      this.kill();
      return;
    }

    this.#godMode = true;
    this.#damageTimer.start();
    Particle.createParticles(this.x, this.y, 8, 5, this.color, 8);
  }

  kill() {
    Particle.createParticles(this.x, this.y, 8, 5, this.color, 16);
    eventManager.emit("playerDeath");
    this.fury.deactivate();
    this.isDead = true;
  }

  revive(x = this.x, y = this.y) {
    this.isDead = defaultValues.isDead;
    this.#godMode = defaultValues.godMode;
    this.#lives = defaultValues.lives;
    this.x = x;
    this.y = y;
    eventManager.emit("playerRevival", { lives: this.#lives });
  }

  draw(ctx) {
    if (this.isDead) return;
    super.draw(ctx);
    this.#drawShieldDelay(ctx);
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

  #drawShieldDelay(ctx) {
    if (this.#damageTimer.active) {
      const { shieldDelay } = defaultValues;
      const { elapsedTime } = this.#damageTimer;
      const padding = 10;

      const timePerc = elapsedTime / shieldDelay;
      const circleSize = Math.PI * 2 * timePerc;

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.dimensions.radius + padding, 0, circleSize);
      ctx.stroke();
    }
  }
}

export { Player };
