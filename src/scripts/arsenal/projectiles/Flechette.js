import { gameState } from "../../singletons/GameState";
import { GRAY } from "../../utils/constants/colors";
import { Bullet } from "./Bullet";

class Flechette extends Bullet {
  #bounces;
  #maxBounces;

  constructor(x, y, radius, speed, angle, color, damage = 10, maxBounces = 10) {
    super(x, y, radius, speed, angle, color, damage);
    this.#maxBounces = maxBounces;
    this.#bounces = 0;
  }

  hasTouchedBorder(canvas = gameState.getEntity("mainCanvas")) {
    const {
      x: ballX,
      y: ballY,
      dimensions: { radius: radius },
    } = this;

    const { width: canvasW, height: canvasH } = canvas;

    const LEFT = ballX < radius;
    const RIGHT = ballX + radius > canvasW;
    const TOP = ballY < radius;
    const BOTTOM = ballY + radius > canvasH;

    if (LEFT || RIGHT) {
      this.angle = Math.PI - this.angle;
    } else if (TOP || BOTTOM) {
      this.angle = -this.angle;
    } else {
      return;
    }

    this.#bounces++;
  }

  update(delta) {
    super.update(delta);

    if (this.#bounces >= this.#maxBounces) {
      this.color = GRAY;
      return;
    }
    this.hasTouchedBorder();
  }
}

export { Flechette };
