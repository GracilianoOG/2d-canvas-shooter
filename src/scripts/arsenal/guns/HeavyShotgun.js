import { HeavyAmmo } from "../ammo/HeavyAmmo";
import { Gun } from "./Gun";

class HeavyShotgun extends Gun {
  constructor({
    name = "Shotgun",
    ammoType = new HeavyAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 240,
        bullets: 3,
        spread: 0.3,
        ...options,
      },
    });
  }
}

export { HeavyShotgun };
