export class GameCanvas {
  #canvas;
  #buffer;
  #canvasCtx;
  #bufferCtx;
  #rect;

  constructor(width, height, parent = null) {
    this.#canvas = document.createElement("canvas");
    this.#canvas.width = width;
    this.#canvas.height = height;

    this.#buffer = document.createElement("canvas");
    this.#buffer.width = width;
    this.#buffer.height = height;

    this.#canvasCtx = this.#canvas.getContext("2d");
    this.#bufferCtx = this.#buffer.getContext("2d");

    this.#rect = this.#canvas.getBoundingClientRect();
    if (parent) parent.appendChild(this.#canvas);
  }

  static resize(realCanvas, bufferCanvas) {
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

  get size() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  get offset() {
    return this.#rect;
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
    return this.#bufferCtx;
  }

  get rect() {
    return this.#rect;
  }

  set rect(rect) {
    this.#rect = rect;
  }

  resize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const canvasRatio = this.#buffer.height / this.#buffer.width;
    const screenRatio = screenHeight / screenWidth;

    if (screenRatio > canvasRatio) {
      this.#canvas.width = screenWidth;
      this.#canvas.height = screenWidth * canvasRatio;
    } else {
      this.#canvas.height = screenHeight;
      this.#canvas.width = screenHeight / canvasRatio;
    }

    const { width, height } = this.#canvas;
    this.#canvasCtx.drawImage(this.#buffer, 0, 0, width, height);
    this.#rect = this.#canvas.getBoundingClientRect();
  }

  render() {
    this.#canvasCtx.clearRect(0, 0, this.width, this.height);
    this.#canvasCtx.drawImage(this.#buffer, 0, 0, this.width, this.height);
  }
}
