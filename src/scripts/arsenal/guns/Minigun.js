import { HeavyAmmo } from "../ammo/HeavyAmmo";
import { Gun } from "./Gun";

class Minigun extends Gun {
  constructor({
    name = "Minigun",
    ammoType = new HeavyAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 90,
        spread: 0.1,
        ...options,
      },
    });
  }
}

export { Minigun };
