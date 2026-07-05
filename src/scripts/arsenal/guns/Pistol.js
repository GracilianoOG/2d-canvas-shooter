import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class Pistol extends Gun {
  constructor(ammoType = new PistolAmmo(), options = {}) {
    super(ammoType, {
      cooldown: 150,
      ...options,
    });
  }
}

export { Pistol };
