import { Entity } from "../Entity";
import { Timer } from "../Timer";

class Item extends Entity {
  #despawnTimer;
  #label;

  constructor(x, y, radius, color, label = "item", despawnTime = 10_000) {
    super(x, y, radius, color);
    this.#label = label;
    this.#despawnTimer = new Timer(
      despawnTime,
      { loop: false, autodestruct: true },
      () => this.destroy()
    );
  }

  check() {}

  collect() {
    this.#despawnTimer.remove();
    this.destroy();
  }

  draw(ctx) {
    super.draw(ctx);
    this.#drawDespawnDelay(ctx);
    this.#drawLabel(ctx);
  }

  #drawLabel(ctx) {
    ctx.textAlign = "center";
    ctx.font = "8px 'Press Start 2P'";
    ctx.fillText(this.#label.toLowerCase(), this.x, this.y - 20);
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
