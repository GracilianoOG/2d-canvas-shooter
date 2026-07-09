import { TAU } from "@/scripts/utils/math";
import { Bullet } from "./Bullet";

class Explosive extends Bullet {
  #fragments;

  constructor(x, y, radius, speed, angle, color, damage = 20, fragments = {}) {
    super(x, y, radius, speed, angle, color, damage);
    this.#fragments = { ...fragments };
  }

  #explode() {
    const { amount, createFragments } = this.#fragments;
    const angle = TAU / amount;
    let rotation = 0;

    while (rotation <= TAU) {
      createFragments(this.x, this.y, rotation);
      rotation += angle;
    }
  }

  onDestroy() {
    if (this.isOutOfCanvas()) return;
    this.#explode();
  }
}

export { Explosive };
