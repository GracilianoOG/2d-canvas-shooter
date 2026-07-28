import { TAU } from "@/engine/utils/math";
import { Bullet } from "./Bullet";

class Explosive extends Bullet {
  #fragments;

  constructor(x, y, radius, speed, angle, color, damage, fragments = {}) {
    super(x, y, radius, speed, angle, color, damage);
    this.#fragments = { ...fragments };
  }

  static explode(x, y, fragments) {
    const { amount, createFragments } = fragments;
    const angle = TAU / amount;
    let rotation = 0;

    while (rotation <= TAU) {
      createFragments(x, y, rotation);
      rotation += angle;
    }
  }

  onDestroy() {
    if (this.isOutOfCanvas()) return;
    Explosive.explode(this.x, this.y, this.#fragments);
  }
}

export { Explosive };
