import { Square } from "./Square.js";

class Player extends Square {
  constructor(x, y, width, height, speed, color, keys) {
    super(x, y, width, height, color);
    this.speed = speed;
    this.keys = keys;
  }

  move(canvasWidth, canvasHeight) {
    if(this.keys["KeyA"] && this.x >= 0) {
      this.x -= this.speed;
      if(this.x < 0) {
        this.x = 0;
      }
    }

    if(this.keys["KeyD"] && this.x + this.width <= canvasWidth) {
      this.x += this.speed;
      if(this.x + this.width > canvasWidth) {
        this.x = canvasWidth - this.width;
      }
    }

    if(this.keys["KeyW"] && this.y >= 0) {
      this.y -= this.speed;
      if(this.y < 0) {
        this.y = 0;
      }
    }

    if(this.keys["KeyS"] && this.y + this.height <= canvasHeight) {
      this.y += this.speed;
      if(this.y + this.height > canvasHeight) {
        this.y = canvasHeight - this.height;
      }
    }
  }

  update(ctx, canvasWidth, canvasHeight) {
    this.draw(ctx);
    this.move(canvasWidth, canvasHeight);
  }
}

export { Player };