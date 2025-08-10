import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Pistol extends Weapon {
  constructor(owner, cooldown = 150) {
    super(owner, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const color = this.owner.color;
    new Bullet(playerX, playerY, 5, 20, bulletAngle, color);
  }
}

export { Pistol };
