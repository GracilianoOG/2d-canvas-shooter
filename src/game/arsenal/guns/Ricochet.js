import { RicochetAmmo } from "../ammo/RicochetAmmo";
import { Gun } from "./Gun";

export class Ricochet extends Gun {
  constructor({
    name = "Ricochet Pistol",
    ammoType = new RicochetAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 140,
        ...options,
      },
    });
  }
}
