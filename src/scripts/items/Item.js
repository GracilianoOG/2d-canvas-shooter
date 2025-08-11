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

  draw(ctx) {
    super.draw(ctx);
    this.#drawDespawnDelay(ctx);
  }

  #drawDespawnDelay(ctx) {
    const { waitTime: despawnDelay } = this.#despawnTimer;
    const { elapsedTime } = this.#despawnTimer;
    const timePerc = elapsedTime / despawnDelay;
    const padding = 5;

    this.drawArc(ctx, this.color, padding, timePerc);
  }
}

export { Item };
