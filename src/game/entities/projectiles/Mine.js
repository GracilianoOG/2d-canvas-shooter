import { Explosive } from "./Explosive";

class Mine extends Explosive {
  update(delta) {
    const DEACCELERATION = 1000 * delta;
    if (this.speed >= 0) {
      this.speed = Math.max(this.speed - DEACCELERATION, 0);
    }
    super.update(delta);
  }
}

export { Mine };
