import { WHITE } from "../../utils/constants/colors";
import { Explosive } from "./Explosive";

const defaultOptions = {
  fragments: 20,
  size: 6,
  speed: 500,
  damage: 10,
  color: WHITE,
};

class Mine extends Explosive {
  constructor(x, y, radius, speed, angle, color, damage = 30, options = {}) {
    const config = { ...defaultOptions, ...options };
    super(x, y, radius, speed, angle, color, damage, config);
  }

  update(delta) {
    const DEACCELERATION = 0.1;
    super.update(delta);
    this.speed = Math.max(this.speed - delta * DEACCELERATION, 0);
  }
}

export { Mine };
