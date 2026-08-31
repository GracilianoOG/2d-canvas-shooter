import { config } from "@/game/config";
import { Projectile } from "@/game/entities/Projectile";

export class Bullet extends Projectile {
  #damage;

  constructor(angle, data) {
    const { radius, speed, color, damage } = data;
    super(radius, speed, color, angle);
    this.#damage = damage;
  }

  get damage() {
    return this.#damage;
  }

  onCollision(object) {
    if (object?.takeDamage) {
      object.takeDamage(this.damage);
      this.destroy();
    }
  }

  isOutOfCanvas() {
    const { x: bx, y: by, radius: br } = this;
    const { width: cw, height: ch } = config;

    return bx < -br || bx > cw + br || by < -br || by > ch + br;
  }

  destroyOutOfCanvas() {
    if (this.isOutOfCanvas()) {
      this.destroy();
    }
  }

  update(delta) {
    this.moveTowards(delta);
    this.destroyOutOfCanvas();
  }
}
