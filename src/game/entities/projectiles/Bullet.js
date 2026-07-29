import { config } from "@/game/config";
import { Projectile } from "@/game/entities/Projectile";

class Bullet extends Projectile {
  #angle;
  #damage;

  constructor(x, y, radius, speed, angle, color, damage) {
    super(x, y, radius, speed, color);
    this.#angle = angle;
    this.#damage = damage;
  }

  get angle() {
    return this.#angle;
  }

  set angle(angle) {
    this.#angle = angle;
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

  moveTowards(delta) {
    this.x += Math.cos(this.angle) * this.speed * delta;
    this.y += Math.sin(this.angle) * this.speed * delta;
  }

  update(delta) {
    this.moveTowards(delta);
    this.destroyOutOfCanvas();
  }
}

export { Bullet };
