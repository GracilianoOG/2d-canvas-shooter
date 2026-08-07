import { config } from "../config";
import { TRANSPARENT_BLACK } from "../constants/colors";

export class Renderer {
  #canvas;
  #ctx;
  #settings;

  constructor(canvas, settings) {
    this.#canvas = canvas;
    this.#ctx = canvas.ctx;
    this.#settings = settings;
  }

  renderCanvas() {
    const { width, height } = config;
    this.#canvas.render();

    if (this.#settings.trails) {
      this.#ctx.fillStyle = TRANSPARENT_BLACK;
      this.#ctx.fillRect(0, 0, width, height);
    } else {
      this.#ctx.clearRect(0, 0, width, height);
    }
  }

  renderEntities(entities) {
    for (let i = entities.length - 1; i >= 0; i--) {
      entities[i].draw(this.#ctx);
    }
  }

  render(entities) {
    this.renderCanvas();
    this.renderEntities(entities);
  }
}
