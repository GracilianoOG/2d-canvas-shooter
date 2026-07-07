import { VIOLET } from "@/scripts/utils/constants/colors";
import { Flechette } from "./Flechette";

class RicochetAmmo {
  #name;

  constructor(name = "Ricochet") {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  create(x, y, angle) {
    const radius = 8;
    const speed = 750;
    const color = VIOLET;
    const damage = 10;
    new Flechette(x, y, radius, speed, angle, color, damage);
  }
}

export { RicochetAmmo };
