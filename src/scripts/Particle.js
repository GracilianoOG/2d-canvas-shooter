import { Projectile } from "./Projectile.js";

class Particle extends Projectile {
  #angle = Math.random() * 2 * Math.PI;
  #randomizer = Math.random();

  static createParticles(x, y, size, speed, color, amount) {
    for (let i = 0; i < amount; i++) {
      new Particle(x, y, size, speed, color);
    }
  }

  #shrink() {
    const shrunkRadius = Math.max(this.dimensions.radius - 0.2, 0);
    this.dimensions = { radius: shrunkRadius };
    if (shrunkRadius > 0) return;
    this.destroy();
  }

  update() {
    this.x += Math.cos(this.#angle) * this.speed + this.#randomizer;
    this.y += Math.sin(this.#angle) * this.speed + this.#randomizer;
    this.#shrink();
  }
}

export { Particle };
