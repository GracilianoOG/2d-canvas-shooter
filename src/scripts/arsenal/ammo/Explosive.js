import { Bullet } from "../Bullet";

class Explosive extends Bullet {
  #options;

  constructor(x, y, radius, speed, angle, color, damage = 20, options = {}) {
    const defaultOptions = {
      fragments: 20,
      size: 10,
      speed: 8,
      damage: 10,
      color,
    };

    super(x, y, radius, speed, angle, color, damage);
    this.#options = { ...defaultOptions, ...options };
  }

  onDestroy() {
    if (this.isOutOfCanvas()) return;

    const { fragments, size, speed, damage, color } = this.#options;

    let rotation = 0;
    const TAU = Math.PI * 2;
    const angle = TAU / fragments;

    while (rotation <= TAU) {
      new Bullet(this.x, this.y, size, speed, rotation, color, damage);
      rotation += angle;
    }
  }
}

export { Explosive };
