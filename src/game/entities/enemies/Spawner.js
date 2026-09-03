import { Timer } from "@/game/systems/Timer";
import { Enemy } from "./Enemy";

export class Spawner extends Enemy {
  constructor(enemyData, target, events) {
    super(enemyData, target, events);
    this.state = "chase";
    this.cooldown = 2;
    this.chaseTimer = Timer.create(1000, { autostart: false }, () => {
      this.state = "chase";
      this.cooldown = 2;
    });
  }

  onDestroy() {
    this.chaseTimer.remove();
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalCompositeOperation = "lighter";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update(delta) {
    switch (this.state) {
      case "chase":
        super.update(delta);
        this.cooldown -= delta;
        if (this.cooldown <= 0) {
          this.state = "spawn";
        }
        break;
      case "spawn":
        this.speed = 0;
        this.chaseTimer.start();
        this.events.emit("spawnChaser", this.x, this.y);
        this.state = "wait";
        break;
    }
  }
}
