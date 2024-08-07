class Canvas {
  #canvas;
  #context;
  
  constructor(width, height, parent) {
    this.#canvas = document.createElement("canvas");
    this.#canvas.width = width;
    this.#canvas.height = height;
    this.#context = this.#canvas.getContext("2d");
    parent.appendChild(this.#canvas);
  }

  get width() {
    return this.#canvas.width;
  }

  get height() {
    return this.#canvas.height;
  }

  get canvas() {
    return this.#canvas;
  }

  get context() {
    return this.#context;
  }
}

export { Canvas };