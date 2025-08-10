import { Explosive } from "./Explosive";

const defaultOptions = {
  fragments: 10,
  size: 10,
  speed: 8,
  damage: 20,
};

class Missile extends Explosive {
  constructor(x, y, radius, speed, angle, color, damage = 40, options = {}) {
    const config = { ...defaultOptions, ...options };
    super(x, y, radius, speed, angle, color, damage, config);
  }
}

export { Missile };
