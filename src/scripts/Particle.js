import { Projectile } from "./Projectile.js";

class Particle extends Projectile {
  #angle = Math.random() * 2 * Math.PI;
  #randomizer = Math.random();

  static createParticles(x, y, size, speed, color, amount) {
    for (let i = 0; i < amount; i++) {
      new Particle(x, y, size, speed, color);
    }
  }

  #shrink(amount) {
    const shrunkRadius = Math.max(this.radius - amount, 0);
    this.radius = shrunkRadius;
    if (shrunkRadius > 0) return;
    this.destroy();
  }

  update(delta) {
    this.x += Math.cos(this.#angle) * this.speed * delta + this.#randomizer;
    this.y += Math.sin(this.#angle) * this.speed * delta + this.#randomizer;
    this.#shrink(delta * 12);
  }
}

export { Particle };
