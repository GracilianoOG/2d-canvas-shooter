import { WHITE } from "../../utils/constants/colors";
import { Explosive } from "./Explosive";

const defaultOptions = {
  fragments: 10,
  size: 4,
  speed: 625,
  damage: 10,
  color: WHITE,
};

class Grenade extends Explosive {
  constructor(x, y, radius, speed, angle, color, damage = 20, options = {}) {
    const config = { ...defaultOptions, ...options };
    super(x, y, radius, speed, angle, color, damage, config);
  }
}

export { Grenade };
