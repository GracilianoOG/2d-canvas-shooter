import { Explosive } from "./Explosive";

class Mine extends Explosive {
  constructor(x, y, radius, speed, angle, color, damage, fragments = {}) {
    super(x, y, radius, speed, angle, color, damage, fragments);
  }

  update(delta) {
    const DEACCELERATION = 1000 * delta;
    this.speed = Math.max(this.speed - DEACCELERATION, 0);
    super.update(delta);
  }
}

export { Mine };
