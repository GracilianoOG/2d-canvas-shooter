import { Bullet } from "./Bullet";

export class Piercing extends Bullet {
  #hitList;
  #hits;

  constructor(angle, data) {
    super(angle, data);
    this.#hits = data.maxHits;
    this.#hitList = [];
  }

  onDestroy() {
    this.#hitList = null;
  }

  onCollision(object) {
    if (this.#hitList.includes(object)) {
      return;
    }
    if (object?.takeDamage) {
      object.takeDamage(this.damage);
      this.#hitList.push(object);
      this.#hits--;
    }
    if (!this.#hits) {
      this.destroy();
    }
  }
}
