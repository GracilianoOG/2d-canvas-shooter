import { TAU } from "@/engine/utils/math";
import { Bullet } from "./Bullet";
import { AmmoFactory } from "@/game/arsenal/ammo/AmmoFactory";

class Explosive extends Bullet {
  #fragments;

  constructor(angle, data) {
    super(angle, data);
    this.#fragments = {
      amount: data.explosionData.amount,
      creator: AmmoFactory.request(data.explosionData.type),
    };
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
