import { HeavyAmmo } from "../ammo/HeavyAmmo";
import { Gun } from "./Gun";

class Minigun extends Gun {
  constructor(ammoType = new HeavyAmmo(), options = {}) {
    super(ammoType, {
      cooldown: 90,
      spread: 0.1,
      ...options,
    });
  }
}

export { Minigun };
