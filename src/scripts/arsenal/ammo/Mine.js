import { WHITE } from "../../utils/constants/colors";
import { Bullet } from "../Bullet";

class Mine extends Bullet {
  constructor(x, y, radius, speed, angle, color, damage = 20) {
    super(x, y, radius, speed, angle, color, damage);
  }

  onDestroy() {
    if (this.isOutOfCanvas()) return;

    let rotation = 0;
    const TOTAL_BULLETS = 20;
    const TAU = Math.PI * 2;
    const angle = TAU / TOTAL_BULLETS;

    while (rotation <= TAU) {
      new Bullet(this.x, this.y, 6, 8, rotation, WHITE, 10);
      rotation += angle;
    }
  }
}

export { Mine };
