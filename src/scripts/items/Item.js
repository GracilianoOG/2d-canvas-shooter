import { Entity } from "../Entity";
import { Timer } from "../Timer";

class Item extends Entity {
  #despawnTimer;

  constructor(x, y, radius, color, despawnTime = 10_000) {
    super(x, y, radius, color);
    this.#despawnTimer = new Timer(
      despawnTime,
      { loop: false, autodestruct: true },
      () => this.destroy()
    );
  }

  collect() {
    this.#despawnTimer.remove();
  }
}

export { Item };
