import { Projectile } from "./Projectile.js";

class Particle extends Projectile {
  #angle = Math.random() * 2 * this.PI;
  #randomizer = Math.random();

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);
  }

  #shrink() {
    if(!this.toDestroy) {
      const shrunkRadius = this.radius - .2;
      if(shrunkRadius > 0) {
        this.radius = shrunkRadius;
        return;
      }
      this.toDestroy = true;
      this.radius = 0;
    }
  }

  move() {
    this.x += Math.cos(this.#angle) * this.speed + this.#randomizer;
    this.y += Math.sin(this.#angle) * this.speed + this.#randomizer;
    this.#shrink();
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

export { Particle };