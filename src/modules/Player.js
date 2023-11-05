import { Circle } from "./Circle.js";
import { Particle } from "./Particle.js";

class Player extends Circle {
  #speed;
  #isDead = false;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, color);
    this.#speed = speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  get speed() {
    return this.#speed;
  }

  set isDead(isDead) {
    this.#isDead = isDead;
  }

  get isDead() {
    return this.#isDead;
  }

  bleed(amount, size, speed) {
    const particles = [];

    for(let i = 0; i < amount; i++) {
      particles.push(new Particle(this.x, this.y, size, speed, this.color));
    }

    return particles;
  }

  update(ctx) {
    this.draw(ctx);
  }
}

export { Player };