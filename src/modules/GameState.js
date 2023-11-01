class GameState {
  #canvas;
  #context;
  #player;

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
}

export { GameState }