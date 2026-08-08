import { Gun } from "./Gun";
import { Explosive } from "@/game/entities/projectiles/Explosive";

export class BulletHell extends Gun {
  createProjectile(x, y) {
    const amount = this.options.bullets;
    Explosive.explode(x, y, {
      amount,
      createFragments: (x, y, angle) => this.ammoType.create(x, y, angle),
    });
  }
}
