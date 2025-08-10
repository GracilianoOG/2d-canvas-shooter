import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Cannon extends Weapon {
  constructor(owner, cooldown = 250) {
    super(owner, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const color = this.owner.color;

    new Bullet(playerX, playerY, 20, 5, bulletAngle, color, 30);
  }
}

export { Cannon };
