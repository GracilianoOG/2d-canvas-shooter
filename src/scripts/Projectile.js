import { Circle } from "./Circle.js";
import { Entity } from "./Entity.js";

class Projectile extends Entity {
  constructor(x, y, radius, speed, color) {
    super(new Circle(x, y, radius, color));
    this.speed = speed;
  }
}

export { Projectile };
