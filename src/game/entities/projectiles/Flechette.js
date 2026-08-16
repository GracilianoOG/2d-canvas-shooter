import { config } from "@/game/config";
import { GRAY } from "../../constants/colors";
import { Bullet } from "./Bullet";

export class Flechette extends Bullet {
  #bounces;

  constructor(angle, data) {
    super(angle, data);
    this.#bounces = data.bounces;
  }

  bounce() {
    const { x: ballX, y: ballY, radius } = this;
    const { width: canvasW, height: canvasH } = config;

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
