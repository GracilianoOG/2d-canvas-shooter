class GameState {
  #objects = {
    bullets: [],
    enemies: [],
    particles: []
  };

  constructor(canvas, player) {
    this.#objects.canvas = canvas;
    this.#objects.context = canvas.getContext("2d");
    this.#objects.player = player;
  }

  get objects() {
    return this.#objects;
  }

  destroyObjects(array) {
    for(let i = array.length - 1; i >= 0; i--) {
      array[i].toDestroy && array.splice(i, 1);
    }
  }
}

export { GameState };