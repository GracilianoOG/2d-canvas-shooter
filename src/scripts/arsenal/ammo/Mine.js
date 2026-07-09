import { Explosive } from "./Explosive";

class Mine extends Explosive {
  constructor(x, y, radius, speed, angle, color, damage, fragments = {}) {
    super(x, y, radius, speed, angle, color, damage, fragments);
  }

  update(delta) {
    const DEACCELERATION = 10;
    super.update(delta);
    this.speed = Math.max(this.speed - DEACCELERATION, 0);
  }
}

export { Mine };
