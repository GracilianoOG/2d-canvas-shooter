import { NukeAmmo } from "../ammo/NukeAmmo";
import { Gun } from "./Gun";

class NukeLauncher extends Gun {
  constructor({ name = "BFG", ammoType = new NukeAmmo(), options = {} } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 380,
        ...options,
      },
    });
  }
}

export { NukeLauncher };
