export class GameCanvas {
  #canvas;
  #buffer;
  #canvasCtx;
  #bufferCtx;
  #rect;
  #width;
  #height;

  constructor(width, height, parent = null) {
    this.#canvas = document.createElement("canvas");
    this.#canvas.width = width;
    this.#canvas.height = height;

    this.#buffer = document.createElement("canvas");
    this.#buffer.width = width;
    this.#buffer.height = height;

    this.#canvasCtx = this.#canvas.getContext("2d");
    this.#bufferCtx = this.#buffer.getContext("2d");

    this.#width = width;
    this.#height = height;

    this.#rect = this.#canvas.getBoundingClientRect();
    if (parent) parent.appendChild(this.#canvas);
  }

  get size() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  get bufferSize() {
    return {
      width: this.#width,
      height: this.#height,
    };
  }

  get factors() {
    return {
      x: this.width / this.#width,
      y: this.height / this.#height,
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

  resize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const canvasRatio = this.#height / this.#width;
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
