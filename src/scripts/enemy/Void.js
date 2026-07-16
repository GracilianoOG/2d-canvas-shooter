import { Enemy } from "./Enemy";

class Void extends Enemy {
  takeDamage(damage) {
    super.takeDamage(damage);
    this.grow(this.radius * 0.1);
  }

  onDestroy() {
    this.drop(0.2);
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export { Void };
