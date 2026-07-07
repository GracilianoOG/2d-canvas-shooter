import { WHITE } from "@/scripts/utils/constants/colors";
import { Bullet } from "../Bullet";

class PistolAmmo {
  #name;

  constructor(name = "Common") {
    this.name = name;
  }

  get name() {
    return this.#name;
  }

  create(x, y, angle) {
    const radius = 5;
    const speed = 1250;
    const color = WHITE;
    const damage = 10;
    new Bullet(x, y, radius, speed, angle, color, damage);
  }
}

export { PistolAmmo };
