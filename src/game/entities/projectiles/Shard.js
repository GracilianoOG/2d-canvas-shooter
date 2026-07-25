import { Bullet } from "./Bullet";

export class Shard extends Bullet {
  #owner;
  #padding;

  constructor(owner, radius, speed, angle, color, damage, padding) {
    super(owner.x, owner.y, radius, speed, angle, color, damage);
    this.#owner = owner;
    this.#padding = padding;
  }

  update(delta) {
    this.x = this.#owner.x + Math.cos(this.angle) * this.#padding;
    this.y = this.#owner.y + Math.sin(this.angle) * this.#padding;
    this.angle += this.speed * delta;
  }
}
