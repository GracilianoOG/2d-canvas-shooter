import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class SubmachineGun extends Gun {
  constructor(ammoType = new PistolAmmo(), options = {}) {
    super(ammoType, {
      cooldown: 100,
      ...options,
    });
  }
}

export { SubmachineGun };
