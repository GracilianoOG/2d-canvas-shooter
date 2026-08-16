import { Bullet } from "./Bullet";

export class Shard extends Bullet {
  #owner;
  #padding;

  constructor(owner, angle, data) {
    super(angle, data);
    this.#owner = owner;
    this.#padding = data.padding;
  }

  update(delta) {
    this.x = this.#owner.x + Math.cos(this.angle) * this.#padding;
    this.y = this.#owner.y + Math.sin(this.angle) * this.#padding;
    this.angle += this.speed * delta;
  }
}
