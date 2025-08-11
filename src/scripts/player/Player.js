import { Particle } from "../Particle.js";
import { PlayerController } from "./PlayerController.js";
import { Projectile } from "../Projectile.js";
import { gameState } from "../singletons/GameState.js";
import { Fury } from "../arsenal/Fury.js";
import { eventManager } from "../singletons/EventManager.js";
import { Timer } from "../Timer.js";
import {
  BLOODY_RED,
  ENERGETIC_BLUE,
  GRAY,
  LIGHT_YELLOW,
} from "../utils/constants/colors.js";
import { Arsenal } from "../arsenal/Arsenal.js";

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
  #arsenal;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);

    this.#controller = new PlayerController(this);
    this.#isDead = defaultValues.isDead;
    this.#arsenal = new Arsenal(this);
    this.#arsenal.defaultGun();
    this.#fury = new Fury(this);
    this.#lives = defaultValues.lives;
    this.#godMode = defaultValues.godMode;
    this.#damageTimer = new Timer(
      defaultValues.shieldDelay,
      { autostart: false, loop: false },
      this.#onShieldDepletion.bind(this)
    );

    eventManager.subscribe("enemyDeath", this.#onEnemyKilled.bind(this));
    eventManager.subscribe("weaponBoxCollected", () =>
      this.#arsenal.randomizeGun()
    );
  }

  get lives() {
    return this.#lives;
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

  #activateShield() {
    this.#godMode = true;
    this.#damageTimer.start();
  }

  takeHit() {
    if (this.#godMode) return;

    this.#lives--;
    eventManager.emit("playerHit", { lives: this.#lives });

    if (this.#lives <= 0) {
      this.kill();
      return;
    }

    this.#activateShield();
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
    this.#drawWeaponDuration(ctx);
    this.#drawHealth(ctx);
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

  #drawRing(ctx, color, padding, percent, drawEmpty = false) {
    const TAU = Math.PI * 2;
    const size = this.dimensions.radius + padding;

    if (drawEmpty) {
      ctx.strokeStyle = GRAY;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, size, TAU * percent, 0);
      ctx.stroke();
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, TAU * percent);
    ctx.stroke();
  }

  #drawHealth(ctx) {
    const padding = 5;
    const health = this.#lives / defaultValues.lives;
    this.#drawRing(ctx, BLOODY_RED, padding, health, true);
  }

  #drawShieldDelay(ctx) {
    if (this.#damageTimer.active) {
      const { shieldDelay } = defaultValues;
      const { elapsedTime } = this.#damageTimer;
      const timePerc = elapsedTime / shieldDelay;
      const padding = 15;

      this.#drawRing(ctx, ENERGETIC_BLUE, padding, timePerc);
    }
  }

  #drawWeaponDuration(ctx) {
    if (this.#arsenal.durationTimer.active) {
      const gunDelay = this.#arsenal.durationTimer.waitTime;
      const { elapsedTime } = this.#arsenal.durationTimer;
      const timePerc = elapsedTime / gunDelay;
      const padding = 10;

      this.#drawRing(ctx, LIGHT_YELLOW, padding, timePerc);
    }
  }
}

export { Player };
