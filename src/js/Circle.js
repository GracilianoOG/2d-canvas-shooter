class Circle {
  #x;
  #y;
  #color;
  #radius;

  constructor(x, y, radius, color) {
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this.#radius = radius;
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = y;
  }

  get color() {
    return this.#color;
  }

  set color(color) {
    this.#color = color;
  }

  get dimensions() {
    return { radius: this.#radius };
  }

  set dimensions({ radius }) {
    this.#radius = radius;
  }

  collidedWith(object) {
    return Math.hypot(this.x - object.x, this.y - object.y) < this.#radius + object.dimensions.radius;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.#radius, 0, Math.PI * 2);
    // ctx.save();
    // ctx.shadowColor = this.color;
    // ctx.shadowBlur = 8;
    // ctx.globalCompositeOperation = "lighten";
    // ctx.restore();
    ctx.fill();
  }
}

export { Circle };