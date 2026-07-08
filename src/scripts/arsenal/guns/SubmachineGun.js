import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class SubmachineGun extends Gun {
  constructor({
    name = "SMG",
    ammoType = new PistolAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 120,
        spread: 0.05,
        ...options,
      },
    });
  }
}

export { SubmachineGun };
