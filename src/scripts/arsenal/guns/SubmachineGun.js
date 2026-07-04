import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class SubmachineGun extends Gun {
  constructor(ammoType = new PistolAmmo(), cooldown = 100) {
    super(ammoType, cooldown);
  }
}

export { SubmachineGun };
