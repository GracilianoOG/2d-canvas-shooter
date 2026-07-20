import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class Pistol extends Gun {
  constructor({
    name = "Pistol",
    ammoType = new PistolAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 150,
        ...options,
      },
    });
  }
}

export { Pistol };
