import { Circle } from "../Circle.js";
import { Entity } from "../Entity.js";
import { Particle } from "../Particle.js";
import { PlayerController } from "./PlayerController.js";
import { Weapon } from "../arsenal/Weapon.js";

class Player extends Entity {
  #isDead = false;
  controller = new PlayerController(this);
  weapon = new Weapon(this);

  constructor(x, y, radius, speed, color) {
    super(new Circle(x, y, radius, color));
    this.speed = speed;
  }

  get isDead() {
    return this.#isDead;
  }

  set isDead(isDead) {
    this.#isDead = isDead;
  }

  isTouchingBorders() {
    const { width, height } = window.gameState.entities.mainCanvas.canvas;
    const LEFT = this.x < this.dimensions.radius;
    const RIGHT = this.x + this.dimensions.radius > width;
    const UP = this.y < this.dimensions.radius;
    const DOWN = this.y + this.dimensions.radius > height;
    return LEFT || RIGHT || UP || DOWN;
  }

  kill() {
    Particle.createParticles(this.x, this.y, 8, 5, this.color, 16);
    window.gameState["entities"].gameAudio.playSound("explosion");
    this.isDead = true;
  }

  revive(x = this.x, y = this.y) {
    this.isDead = false;
    this.x = x;
    this.y = y;
  }

  update(ctx) {
    if (this.isDead) return;
    this.draw(ctx);
    this.controller.update();
  }
}

export { Player };
