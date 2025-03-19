class Canvas {
  #canvas;
  #context;
  #rect;

  constructor(width, height, parent = null) {
    this.#canvas = document.createElement("canvas");
    this.#canvas.width = width;
    this.#canvas.height = height;
    this.#context = this.#canvas.getContext("2d");
    this.#rect = this.#canvas.getBoundingClientRect();
    if (parent) parent.appendChild(this.#canvas);
  }

  static resizeCanvas(realCanvas, bufferCanvas) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const canvasRatio = bufferCanvas.height / bufferCanvas.width;

    if (screenHeight / screenWidth > canvasRatio) {
      realCanvas.width = screenWidth;
      realCanvas.height = screenWidth * canvasRatio;
    } else {
      realCanvas.height = screenHeight;
      realCanvas.width = screenHeight / canvasRatio;
    }

    const { width: rWidth, height: rHeight } = realCanvas;
    realCanvas.context.drawImage(bufferCanvas.canvas, 0, 0, rWidth, rHeight);
    realCanvas.rect = realCanvas.canvas.getBoundingClientRect();
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

  get rect() {
    return this.#rect;
  }

  set rect(rect) {
    this.#rect = rect;
  }
}

export { Canvas };
