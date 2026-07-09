import { GrenadeAmmo } from "../ammo/GrenadeAmmo";
import { Gun } from "./Gun";

class GrenadeLauncher extends Gun {
  constructor({
    name = "Launcher",
    ammoType = new GrenadeAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 220,
        ...options,
      },
    });
  }
}

export { GrenadeLauncher };
