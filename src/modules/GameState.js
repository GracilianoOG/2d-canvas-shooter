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
}

export { GameState };