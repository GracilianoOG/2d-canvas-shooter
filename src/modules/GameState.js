class GameState {
  #canvas;
  #context;
  #player;
  #bullets = [];
  #enemies = [];

  constructor(canvas, player) {
    this.#canvas = canvas;
    this.#context = canvas.getContext("2d");
    this.#player = player;
  }

  get canvas() {
    return this.#canvas;
  }

  get context() {
    return this.#context;
  }

  get player() {
    return this.#player;
  }

  get bullets() {
    return this.#bullets;
  }

  get enemies() {
    return this.#enemies;
  }
}

export { GameState }