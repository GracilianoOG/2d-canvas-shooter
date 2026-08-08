import { AmmoFactory } from "../ammo/AmmoFactory";
import { Gun } from "./Gun";

class Pistol extends Gun {
  constructor({
    name = "Pistol",
    ammoType = AmmoFactory.request("common"),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 150,
        ...options,
      },
    });
  }
}

export { Pistol };
