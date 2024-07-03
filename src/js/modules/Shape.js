class Shape {
  #x;
  #y;
  #color;

  constructor(x, y, color) {
    this.#x = x;
    this.#y = y;
    this.#color = color;
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
}

export { Shape };