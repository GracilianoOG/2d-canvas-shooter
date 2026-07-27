import { Explosive } from "./Explosive";

class Mine extends Explosive {
  update(delta) {
    if (this.speed > 0) {
      const DEACCELERATION = 1000 * delta;
      this.speed = Math.max(this.speed - DEACCELERATION, 0);
    }
    super.update(delta);
  }
}

export { Mine };
