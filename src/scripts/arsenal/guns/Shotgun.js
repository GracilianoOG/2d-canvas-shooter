import { randomNumber } from "@/scripts/utils/utility";
import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class Shotgun extends Gun {
  constructor(ammoType = new PistolAmmo(), cooldown = 200) {
    super(ammoType, cooldown);
  }

  createProjectile(x, y) {
    super.createProjectile(x, y, 3, 0.2);
  }
}

export { Shotgun };
