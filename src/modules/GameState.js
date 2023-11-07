class GameState {
  #gameObjects = {
    bullets: [],
    enemies: [],
    particles: []
  };

  constructor(canvas, player) {
    this.#gameObjects.canvas = canvas;
    this.#gameObjects.context = canvas.getContext("2d");
    this.#gameObjects.player = player;
  }

  get gameObjects() {
    return this.#gameObjects;
  }

  destroyObjects(array) {
    for(let i = array.length - 1; i >= 0; i--) {
      array[i].toDestroy && array.splice(i, 1);
    }
  }
}

export { GameState };