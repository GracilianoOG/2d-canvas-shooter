import { Projectile } from "./Projectile.js";

class Particle extends Projectile {
  #angle = Math.random() * 2 * Math.PI;
  #randomizer = Math.random();

  static createParticles(x, y, size, speed, color, amount) {
    for (let i = 0; i < amount; i++) {
      new Particle(x, y, size, speed, color);
    }
  }

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);
  }

  #shrink() {
    const shrunkRadius = this.dimensions.radius - 0.2;
    if (shrunkRadius > 0) {
      this.dimensions = { radius: shrunkRadius };
      return;
    }
    this.dimensions = { radius: 0 };
    this.destroy();
  }

  #move() {
    this.x += Math.cos(this.#angle) * this.speed + this.#randomizer;
    this.y += Math.sin(this.#angle) * this.speed + this.#randomizer;
    this.#shrink();
  }

  update() {
    this.#move();
  }
}

export { Particle };
