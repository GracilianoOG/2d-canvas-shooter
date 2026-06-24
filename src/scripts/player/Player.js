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
  LIGHT_YELLOW,
} from "../utils/constants/colors.js";
import { PlayerArsenal } from "./PlayerArsenal";

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
  #shieldTimer;
  #arsenal;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);

    this.#controller = new PlayerController(this);
    this.#isDead = defaultValues.isDead;
    this.#arsenal = new PlayerArsenal(this);
    this.#fury = new Fury(this);
    this.#lives = defaultValues.lives;
    this.#godMode = defaultValues.godMode;
    this.#shieldTimer = new Timer(
      defaultValues.shieldDelay,
      { autostart: false, loop: false },
      this.#onShieldDepletion.bind(this),
    );

    eventManager.subscribe("enemyDeath", this.#onEnemyKilled.bind(this));
    eventManager.subscribe("weaponBoxCollected", () =>
      this.#arsenal.randomizeGun(),
    );
    eventManager.subscribe("shieldCollected", () => this.#activateShield(8000));
    eventManager.subscribe("lifeCollected", ({ item }) => {
      if (this.lives < defaultValues.lives) {
        this.#lives++;
        item.collect();
        eventManager.emit("playerHealed");
      }
    });
    eventManager.subscribe("furyCollected", ({ item }) => {
      if (this.fury.isActive()) {
        return;
      }
      eventManager.emit("checkFuryMeterToFill", { item, amount: 20 });
    });
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

  #activateShield(time) {
    this.#godMode = true;
    this.#shieldTimer.waitTime = time ?? defaultValues.shieldDelay;
    this.#shieldTimer.reset();
  }

  #resetShield() {
    this.#godMode = defaultValues.godMode;
    this.#shieldTimer.stop();
    this.#shieldTimer.waitTime = defaultValues.shieldDelay;
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
    this.#lives = defaultValues.lives;
    this.x = x;
    this.y = y;
    this.#resetShield();
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

  #drawHealth(ctx) {
    const padding = 5;
    const health = this.#lives / defaultValues.lives;
    this.drawArc(ctx, BLOODY_RED, padding, health, true);
  }

  #drawShieldDelay(ctx) {
    if (this.#shieldTimer.active) {
      const { waitTime: shieldDelay } = this.#shieldTimer;
      const { elapsedTime } = this.#shieldTimer;
      const timePerc = elapsedTime / shieldDelay;
      const padding = 15;

      this.drawArc(ctx, ENERGETIC_BLUE, padding, timePerc);
    }
  }

  #drawWeaponDuration(ctx) {
    if (this.#arsenal.durationTimer.active) {
      const gunDelay = this.#arsenal.durationTimer.waitTime;
      const { elapsedTime } = this.#arsenal.durationTimer;
      const timePerc = elapsedTime / gunDelay;
      const padding = 10;

      this.drawArc(ctx, LIGHT_YELLOW, padding, timePerc);
    }
  }
}

export { Player };
