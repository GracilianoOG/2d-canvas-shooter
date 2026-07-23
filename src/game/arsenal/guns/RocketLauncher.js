import { MissileAmmo } from "../ammo/MissileAmmo";
import { Gun } from "./Gun";

class RocketLauncher extends Gun {
  constructor({
    name = "Rocket Launcher",
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
