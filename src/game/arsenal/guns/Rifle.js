import { HeavyAmmo } from "../ammo/HeavyAmmo";
import { Gun } from "./Gun";

class Rifle extends Gun {
  constructor({
    name = "Rifle",
    ammoType = new HeavyAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 200,
        ...options,
      },
    });
  }
}

export { Rifle };
