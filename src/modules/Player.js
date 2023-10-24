import { Square } from "./Square.js";

class Player extends Square {
  #speed;
  #keys;

  constructor(x, y, width, height, speed, color, keys) {
    super(x, y, width, height, color);
    this.#speed = speed;
    this.#keys = keys;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  set keys(keys) {
    this.#keys = keys;
  }

  get speed() {
    return this.#speed;
  }

  get keys() {
    return this.#keys;
  }

  moveLeft() {
    this.x -= this.speed;
    if(this.x < 0) {
      this.x = 0;
    }
  }

  moveRight(canvasWidth) {
    this.x += this.speed;
    if(this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }
  }

  moveUp() {
    this.y -= this.speed;
    if(this.y < 0) {
      this.y = 0;
    }
  }

  moveDown(canvasHeight) {
    this.y += this.speed;
    if(this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
    }
  }

  move(canvasWidth, canvasHeight) {
    if(this.keys["KeyA"]) {
      this.moveLeft();
    }

    if(this.keys["KeyD"]) {
      this.moveRight(canvasWidth);
    }

    if(this.keys["KeyW"]) {
      this.moveUp();
    }

    if(this.keys["KeyS"]) {
      this.moveDown(canvasHeight);
    }
  }

  update(ctx, canvasWidth, canvasHeight) {
    this.draw(ctx);
    this.move(canvasWidth, canvasHeight);
  }
}

export { Player };