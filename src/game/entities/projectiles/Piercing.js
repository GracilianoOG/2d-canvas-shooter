import { Bullet } from "./Bullet";

export class Piercing extends Bullet {
  #collided = [];
  #hits = 3;

  onDestroy() {
    this.#collided = null;
  }

  onCollision(object) {
    if (this.#collided.find((obj) => obj === object)) {
      return;
    }
    if (object?.takeDamage) {
      object.takeDamage(this.damage);
      this.#collided.push(object);
      this.#hits--;
    }
    if (!this.#hits) {
      this.destroy();
    }
  }
}
