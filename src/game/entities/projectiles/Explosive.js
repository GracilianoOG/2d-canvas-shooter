import { TAU } from "@/engine/utils/math";
import { Bullet } from "./Bullet";

class Explosive extends Bullet {
  #fragments;

  constructor(radius, speed, angle, color, damage, fragments = {}) {
    super(radius, speed, angle, color, damage);
    this.#fragments = { ...fragments };
  }

  static explode(x, y, amount, creator) {
    const angle = TAU / amount;
    let rotation = 0;

    for (let i = 0; i < amount; i++) {
      creator.create(x, y, rotation);
      rotation += angle;
    }
  }

  onDestroy() {
    if (this.isOutOfCanvas()) return;
    const { amount, creator } = this.#fragments;
    Explosive.explode(this.x, this.y, amount, creator);
  }
}

export { Explosive };
