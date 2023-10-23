class Shape {
  #x;
  #y;
  #color;

  constructor(x, y, color) {
    this.#x = x;
    this.#y = y;
    this.#color = color;
  }

  set x(x) {
    this.#x = x;
  }

  set y(y) {
    this.#y = y;
  }

  set color(color) {
    this.#color = color;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get color() {
    return this.#color;
  }
}

export { Shape };