import { Entity } from "../Entity";
import { gameState } from "@/scripts/core/GameState";
import { Timer } from "@/engine/systems/Timer";
import { WHITE } from "@/scripts/utils/constants/colors";

class Item extends Entity {
  #despawnTimer;
  #label;

  constructor(x, y, radius = 10, color, label, despawnTime = 10_000) {
    super(x, y, radius, color);
    this.#label = label;
    this.#despawnTimer = new Timer(
      despawnTime,
      { loop: false, autodestruct: true },
      () => this.destroy(),
    );
    this.getInCanvas(gameState.getEntity("mainCanvas"));
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
    ctx.shadowBlur = 4;
    ctx.shadowColor = WHITE;
    ctx.textAlign = "center";
    ctx.font = "10px 'Press Start 2P'";
    ctx.fillStyle = WHITE;
    ctx.fillText(this.#label.toUpperCase(), this.x, this.y - 16);
    ctx.shadowBlur = 0;
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
