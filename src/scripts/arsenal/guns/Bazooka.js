import { Missile } from "../ammo/Missile";
import { Weapon } from "./Weapon";

class Bazooka extends Weapon {
  constructor(player, cooldown = 300) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    new Missile(playerX, playerY, 8, 10, bulletAngle, this.owner.color, 20);
  }
}

export { Bazooka };
