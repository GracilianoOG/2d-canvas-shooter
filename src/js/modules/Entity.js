class Entity {
  #shape;
  #speed;
  #type;
  static instances = [];

  constructor(shape) {
    this.#shape = shape;
    this.#type = this.constructor.name;
    Entity.instances.push(this);
  }

  get type() {
    return this.#type;
  }

  get shape() {
    return this.#shape;
  }

  get x() {
    return this.#shape.x;
  }

  set x(x) {
    this.#shape.x = x;
  }

  get y() {
    return this.#shape.y;
  }

  set y(y) {
    this.#shape.y = y;
  }

  get color() {
    return this.#shape.color;
  }

  set color(color) {
    this.#shape.color = color;
  }

  get dimensions() {
    return this.#shape.dimensions;
  }

  set dimensions(dimensions) {
    this.#shape.dimensions = dimensions;
  }

  get speed() {
    return this.#speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  destroy() {
    Entity.instances = Entity.instances.filter(instance => {
      return instance !== this;
    });
  }

  collidedWith(object) {
    return this.shape.collidedWith(object.shape);
  }

  draw(ctx) {
    this.shape.draw(ctx);
  }
}

export { Entity };
