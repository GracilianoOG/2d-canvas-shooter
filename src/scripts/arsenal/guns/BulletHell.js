import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class BulletHell extends Gun {
  constructor({
    name = "Bullet Hell",
    ammoType = new PistolAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 120,
        bullets: 20,
        ...options,
      },
    });
  }

  #explode(pellets, createPellets) {
    let rotation = 0;
    const TAU = Math.PI * 2;
    const angle = TAU / pellets;

    while (rotation <= TAU) {
      createPellets(rotation);
      rotation += angle;
    }
  }

  createProjectile(x, y) {
    const pellets = this.options.bullets;
    this.#explode(pellets, (rotation) => this.ammoType.create(x, y, rotation));
  }
}

export { BulletHell };
