import { Explosive } from "@/game/entities/projectiles/Explosive";

export class ExplosiveShot {
  create(gun, x, y, _angle) {
    const amount = gun.options.bullets;
    Explosive.explode(x, y, amount, gun.ammoType);
  }
}
