class Player {
  constructor(x, y, width, height, speed, color, keys) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.keys = keys;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    if(this.keys["KeyA"]) {
      this.x -= this.speed;
    }

    if(this.keys["KeyD"]) {
      this.x += this.speed;
    }

    if(this.keys["KeyW"]) {
      this.y -= this.speed;
    }

    if(this.keys["KeyS"]) {
      this.y += this.speed;
    }
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

export { Player };