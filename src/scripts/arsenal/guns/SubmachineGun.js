import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class SubmachineGun extends Weapon {
  constructor(owner, cooldown = 120) {
    super(owner, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const color = this.owner.color;
    new Bullet(playerX, playerY, 5, 20, bulletAngle, color);
  }
}

export { SubmachineGun };
