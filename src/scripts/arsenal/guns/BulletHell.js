import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class BulletHell extends Weapon {
  constructor(owner, cooldown = 120) {
    super(owner, cooldown);
  }

  createProjectile() {
    const { playerX, playerY } = this._calcBulletPath();
    const color = this.owner.color;

    let rotation = 0;
    const MAX_BULLETS = 20;
    const TAU = Math.PI * 2;
    const angle = TAU / MAX_BULLETS;

    while (rotation <= TAU) {
      new Bullet(playerX, playerY, 5, 20, rotation, color);
      rotation += angle;
    }
  }
}

export { BulletHell };
