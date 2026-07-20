import { MissileAmmo } from "../ammo/MissileAmmo";
import { Gun } from "./Gun";

class RocketLauncher extends Gun {
  constructor({
    name = "Bazooka",
    ammoType = new MissileAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 300,
        ...options,
      },
    });
  }
}

export { RocketLauncher };
