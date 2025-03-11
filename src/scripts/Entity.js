class Entity {
  #x;
  #y;
  #color;
  #radius;
  static instances = [];

  constructor(x, y, radius, color) {
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this.#radius = radius;
    Entity.instances.push(this);
  }

  static updateAll(ctx) {
    for (let i = Entity.instances.length - 1; i >= 0; i--) {
      Entity.instances[i].draw(ctx);
      Entity.instances[i].update();
    }
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

  destroy() {
    Entity.instances = Entity.instances.filter(instance => {
      return instance !== this;
    });
  }

  collidedWith(object) {
    return (
      Math.hypot(this.x - object.x, this.y - object.y) <
      this.#radius + object.dimensions.radius
    );
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.#radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export { Entity };
