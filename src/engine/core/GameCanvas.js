export class GameCanvas {
  #canvas;
  #buffer;
  #canvasCtx;
  #bufferCtx;
  #rect;
  #width;
  #height;
  #margin;

  constructor({ width, height, container }) {
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
    this.#margin = 16;

    if (!container) {
      throw new Error("An HTML container must be provided to GameCanvas!");
    }

    container.appendChild(this.#canvas);
    this.resize();
  }

  get factors() {
    return {
      x: this.#canvas.width / this.#width,
      y: this.#canvas.height / this.#height,
    };
  }

  get offset() {
    return this.#rect;
  }

  get ctx() {
    return this.#bufferCtx;
  }

  #cacheRect() {
    this.#rect = this.#canvas.getBoundingClientRect();
  }

  resize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const canvasRatio = this.#height / this.#width;
    const screenRatio = screenHeight / screenWidth;
    let width, height;

    if (screenRatio > canvasRatio) {
      width = screenWidth;
      height = screenWidth * canvasRatio;
    } else {
      height = screenHeight;
      width = screenHeight / canvasRatio;
    }

    this.#canvas.width = width - this.#margin * 2;
    this.#canvas.height = height - this.#margin * 2;

    this.#canvasCtx.drawImage(this.#buffer, 0, 0, width, height);
    this.#cacheRect();
  }

  render() {
    this.#canvasCtx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#canvasCtx.drawImage(
      this.#buffer,
      0,
      0,
      this.#canvas.width,
      this.#canvas.height,
    );
  }
}
