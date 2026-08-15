import { Entity } from "../Entity";
import { Timer } from "@/engine/systems/Timer";
import { WHITE } from "@/game/constants/colors";

class Item extends Entity {
  #despawnTimer;
  #label;
  #events;

  constructor({ radius, color, label, despawnTime }, events) {
    super(radius, color);
    this.#events = events;
    this.#label = label;
    this.#despawnTimer = Timer.create(despawnTime, { autodestruct: true }, () =>
      this.destroy(),
    );
  }

  check() {
    this.#events.emit(`${this.#label}Pickup`, this);
  }

  onCollect() {}

  collect(nofity = true) {
    this.#despawnTimer.remove();
    if (nofity) {
      this.#notify();
    }
    this.onCollect();
    this.destroy();
  }

  draw(ctx) {
    super.draw(ctx);
    this.#drawDespawnDelay(ctx);
    this.#drawLabel(ctx);
  }

  #notify() {
    this.#events.emit(
      "indicate",
      { x: this.x, y: this.y },
      this.#label.toUpperCase(),
      this.color,
    );
  }

  #drawLabel(ctx) {
    ctx.shadowBlur = 4;
    ctx.shadowColor = WHITE;
    ctx.textAlign = "center";
    ctx.font = "10px 'Press Start 2P'";
    ctx.fillStyle = WHITE;
    ctx.fillText(this.#label.toUpperCase(), this.x, this.y - 16);
    ctx.shadowBlur = 0;
  }

  #drawDespawnDelay(ctx) {
    const timePerc = this.#despawnTimer.timeLeft();
    const padding = 3;

    this.drawArc(ctx, this.color, padding, timePerc);
  }
}

export { Item };
