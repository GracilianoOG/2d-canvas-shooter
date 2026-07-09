import { MineAmmo } from "../ammo/MineAmmo";
import { Gun } from "./Gun";

class MineLauncher extends Gun {
  constructor({
    name = "Launcher",
    ammoType = new MineAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 280,
        ...options,
      },
    });
  }
}

export { MineLauncher };
