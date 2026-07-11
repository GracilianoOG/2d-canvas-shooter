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
      () => this.destroy(),
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
    ctx.font = "10px 'Press Start 2P'";
    ctx.fillStyle = "#fff";
    ctx.fillText(this.#label.toUpperCase(), this.x, this.y - 16);
  }

  #drawDespawnDelay(ctx) {
    const { waitTime: despawnDelay } = this.#despawnTimer;
    const { elapsedTime } = this.#despawnTimer;
    const timePerc = elapsedTime / despawnDelay;
    const padding = 3;

    this.drawArc(ctx, this.color, padding, timePerc);
  }
}

export { Item };
