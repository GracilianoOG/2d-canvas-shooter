import { PistolAmmo } from "../ammo/PistolAmmo";
import { Shotgun } from "./Shotgun";

export class ThatShotgun extends Shotgun {
  constructor({
    name = "That Shotgun",
    ammoType = new PistolAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 500,
        bullets: 13,
        spread: 0.75,
        propagation: 0.1,
        ...options,
      },
    });
  }
}
