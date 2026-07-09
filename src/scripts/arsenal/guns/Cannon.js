import { CannonAmmo } from "../ammo/CannonAmmo";
import { Gun } from "./Gun";

class Cannon extends Gun {
  constructor({
    name = "Cannon",
    ammoType = new CannonAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 250,
        ...options,
      },
    });
  }
}

export { Cannon };
