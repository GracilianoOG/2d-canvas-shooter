import { VERY_LIGHT_YELLOW } from "@/scripts/utils/constants/colors";
import { Bullet } from "../Bullet";

class HeavyAmmo {
  #name;

  constructor(name = "Heavy") {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  create(x, y, angle) {
    const radius = 5;
    const speed = 1250;
    const color = VERY_LIGHT_YELLOW;
    const damage = 20;
    new Bullet(x, y, radius, speed, angle, color, damage);
  }
}

export { HeavyAmmo };
