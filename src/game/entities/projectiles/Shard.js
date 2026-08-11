import { Bullet } from "./Bullet";

export class Shard extends Bullet {
  #owner;
  #padding;

  constructor(owner, angle, radius, speed, color, damage, padding) {
    super(angle, radius, speed, color, damage);
    this.#owner = owner;
    this.#padding = padding;
  }

  update(delta) {
    this.x = this.#owner.x + Math.cos(this.angle) * this.#padding;
    this.y = this.#owner.y + Math.sin(this.angle) * this.#padding;
    this.angle += this.speed * delta;
  }
}
