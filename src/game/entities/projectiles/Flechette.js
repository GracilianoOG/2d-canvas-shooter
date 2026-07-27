import { gameState } from "../../core/GameState";
import { GRAY } from "../../utils/constants/colors";
import { Bullet } from "./Bullet";

class Flechette extends Bullet {
  #bounces;

  constructor(x, y, radius, speed, angle, color, damage, bounces = 10) {
    super(x, y, radius, speed, angle, color, damage);
    this.#bounces = bounces;
  }

  bounce(canvas = gameState.getEntity("mainCanvas").canvasSize) {
    const { x: ballX, y: ballY, radius } = this;
    const { width: canvasW, height: canvasH } = canvas;

    const X_AXIS = ballX < radius || ballX + radius > canvasW;
    const Y_AXIS = ballY < radius || ballY + radius > canvasH;

    if (X_AXIS) {
      this.angle = Math.PI - this.angle;
    } else if (Y_AXIS) {
      this.angle = -this.angle;
    } else {
      return;
    }

    this.#bounces--;
  }

  update(delta) {
    super.update(delta);

    if (!this.#bounces) {
      this.color = GRAY;
      return;
    }
    this.bounce();
  }
}

export { Flechette };
