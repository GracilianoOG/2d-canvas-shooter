import { config } from "@/game/config";
import { Projectile } from "@/game/entities/Projectile";

export class Bullet extends Projectile {
  #angle;
  #damage;

  constructor(angle, data) {
    const { radius, speed, color, damage } = data;
    super(radius, speed, color);
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

  bounce() {
    const axis = this.touchedBorder();

    if (axis === "x") {
      this.angle = Math.PI - this.angle;
    } else if (axis === "y") {
      this.angle = -this.angle;
    }

    return !!axis;
  }

  touchedBorder() {
    const { x: bx, y: by, radius: br } = this;
    const { width: cw, height: ch } = config;

    const X_AXIS = (bx < br || bx + br > cw) && "x";
    const Y_AXIS = (by < br || by + br > ch) && "y";

    return X_AXIS || Y_AXIS || null;
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
