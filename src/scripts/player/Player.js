import { Particle } from "../Particle.js";
import { PlayerController } from "./PlayerController.js";
import { Weapon } from "../arsenal/Weapon.js";
import { Projectile } from "../Projectile.js";
import { gameState } from "../singletons/GameState.js";
import { Fury } from "../arsenal/Fury.js";
import { eventManager } from "../singletons/EventManager.js";
import { Timer } from "../Timer.js";

class Player extends Projectile {
  #isDead = false;
  #controller = new PlayerController(this);
  #weapon = new Weapon(this);
  #fury = new Fury(this);
  #lives = 3;
  #godMode = false;
  #damageTimer = new Timer(3000, { autostart: false, loop: false }, () => {
    this.#godMode = false;
  });

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);
    eventManager.subscribe("enemyDeath", this.#onEnemyKilled.bind(this));
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

    if (this.#lives <= 0) {
      this.kill();
      return;
    }

    this.#godMode = true;
    this.#damageTimer.start();
    gameState.getEntity("game").shakeScreen(3.5, 300);
    Particle.createParticles(this.x, this.y, 8, 5, this.color, 8);
  }

  kill() {
    Particle.createParticles(this.x, this.y, 8, 5, this.color, 16);
    eventManager.emit("playerDeath");
    this.fury.deactivate();
    this.isDead = true;
  }

  revive(x = this.x, y = this.y) {
    this.isDead = false;
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    if (this.isDead) return;
    super.draw(ctx);
  }

  update(delta) {
    if (this.isDead) return;
    this.controller.update(delta);
    this.#getInCanvas();
  }
}

export { Player };
