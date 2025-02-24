class Canvas {
  #canvas;
  #context;

  constructor(width, height, parent = null) {
    this.#canvas = document.createElement("canvas");
    this.#canvas.width = width;
    this.#canvas.height = height;
    this.#context = this.#canvas.getContext("2d");
    if (parent) parent.appendChild(this.#canvas);
  }

  get width() {
    return this.#canvas.width;
  }

  set width(width) {
    this.#canvas.width = width;
  }

  get height() {
    return this.#canvas.height;
  }

  set height(height) {
    this.#canvas.height = height;
  }

  get canvas() {
    return this.#canvas;
  }

  get context() {
    return this.#context;
  }
}

export { Canvas };
