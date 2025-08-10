import { Flechette } from "../ammo/Flechette";
import { Weapon } from "./Weapon";

class Ricochet extends Weapon {
  constructor(player, cooldown = 180) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    new Flechette(playerX, playerY, 8, 12, bulletAngle, this.owner.color);
  }
}

export { Ricochet };
