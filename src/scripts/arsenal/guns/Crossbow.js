import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Crossbow extends Weapon {
  constructor(owner, cooldown = 200) {
    super(owner, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    new Bullet(playerX, playerY, 8, 25, bulletAngle, this.owner.color, 30);
  }
}

export { Crossbow };
