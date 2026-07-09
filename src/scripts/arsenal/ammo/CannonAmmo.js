import { VERY_LIGHT_YELLOW } from "@/scripts/utils/constants/colors";
import { Bullet } from "../Bullet";
import { CANNON_DMG } from "./damages";
import { AmmoType } from "./AmmoType";

class CannonAmmo extends AmmoType {
  constructor(name = "Cannon") {
    super(name);
  }

  create(x, y, angle) {
    const radius = 20;
    const speed = 350;
    const color = VERY_LIGHT_YELLOW;
    const damage = CANNON_DMG;
    new Bullet(x, y, radius, speed, angle, color, damage);
  }
}

export { CannonAmmo };
