import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class Shotgun extends Gun {
  constructor(ammoType = new PistolAmmo(), options = {}) {
    super(ammoType, {
      cooldown: 200,
      bullets: 3,
      spread: 0.2,
      ...options,
    });
  }
}

export { Shotgun };
