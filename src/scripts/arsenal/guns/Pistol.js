import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class Pistol extends Gun {
  constructor(ammoType = new PistolAmmo(), cooldown = 150) {
    super(ammoType, cooldown);
  }
}

export { Pistol };
