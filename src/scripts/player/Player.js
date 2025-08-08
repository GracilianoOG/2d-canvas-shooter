import { Particle } from "../Particle.js";
import { PlayerController } from "./PlayerController.js";
import { Weapon } from "../arsenal/Weapon.js";
import { Projectile } from "../Projectile.js";
import { gameState } from "../singletons/GameState.js";
import { Fury } from "../arsenal/Fury.js";
import { eventManager } from "../singletons/EventManager.js";

class Player extends Projectile {
  #isDead = false;
  controller = new PlayerController(this);
  weapon = new Weapon(this);
  fury = new Fury(this);

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);
    eventManager.subscribe("enemyDeath", () => {
      if (!this.fury.isActive()) {
        eventManager.emit("fillFuryMeter", { amount: 5 });
      }
    });
  }

  get isDead() {
    return this.#isDead;
  }

  set isDead(isDead) {
    this.#isDead = isDead;
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

  kill() {
    Particle.createParticles(this.x, this.y, 8, 5, this.color, 16);
    gameState.getEntity("gameAudio").playSound("explosion");
    gameState.getEntity("game").shakeScreen(6, 500);
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
