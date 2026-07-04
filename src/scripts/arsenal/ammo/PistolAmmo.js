import { WHITE } from "@/scripts/utils/constants/colors";
import { Bullet } from "../Bullet";

class PistolAmmo {
  create(x, y, angle) {
    const radius = 5;
    const speed = 1250;
    const color = WHITE;
    const damage = 10;
    new Bullet(x, y, radius, speed, angle, color, damage);
  }
}

export { PistolAmmo };
