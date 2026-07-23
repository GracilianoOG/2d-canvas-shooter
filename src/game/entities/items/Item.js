import { Entity } from "../Entity";
import { gameState } from "@/game/core/GameState";
import { Timer } from "@/engine/systems/Timer";
import { WHITE } from "@/game/utils/constants/colors";
import { Indicator } from "@/game/ui/Indicator";

class Item extends Entity {
  #despawnTimer;
  #label;

  constructor(x, y, radius = 10, color, label, despawnTime = 8000) {
    super(x, y, radius, color);
    this.#label = label;
    this.#despawnTimer = Timer.create(
      despawnTime,
      { loop: false, autodestruct: true },
      () => this.destroy(),
    );
    this.getInCanvas(gameState.getEntity("mainCanvas").canvasSize);
  }

  check() {}

  onCollect() {
    Indicator.create(
      { x: this.x, y: this.y },
      this.#label.toUpperCase(),
      this.color,
    );
  }

  collect() {
    this.#despawnTimer.remove();
    this.onCollect();
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
