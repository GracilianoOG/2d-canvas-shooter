class Entity {
  #shape;

  constructor(shape) {
    this.#shape = shape;
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
}

export { Entity }