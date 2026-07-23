import { PiercingAmmo } from "../ammo/PiercingAmmo";
import { Gun } from "./Gun";

class Rifle extends Gun {
  constructor({
    name = "Rifle",
    ammoType = new PiercingAmmo(),
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
