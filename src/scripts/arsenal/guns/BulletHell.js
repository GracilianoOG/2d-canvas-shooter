import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class BulletHell extends Weapon {
  constructor(player, cooldown = 120) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY } = this._calcBulletPath();
    const color = this.player.color;

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
