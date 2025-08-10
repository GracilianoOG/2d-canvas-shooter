import { Bullet } from "./Bullet";
import { Weapon } from "./Weapon";

class Minigun extends Weapon {
  constructor(owner, cooldown = 90) {
    super(owner, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const max = 0.1;
    const min = -max;
    const accuracy = Math.random() * (max - min) + min;
    const color = this.owner.color;
    new Bullet(playerX, playerY, 5, 20, bulletAngle - accuracy, color);
  }
}

export { Minigun };
