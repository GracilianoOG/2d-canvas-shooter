import { GRAY } from "../../constants/colors";
import { Bullet } from "./Bullet";

export class Flechette extends Bullet {
  #bounces;

  constructor(angle, data) {
    super(angle, data);
    this.#bounces = data.bounces;
  }

  update(delta) {
    super.update(delta);

    if (!this.#bounces) {
      this.color = GRAY;
      return;
    }
    if (this.bounce()) {
      this.#bounces--;
    }
  }
}
