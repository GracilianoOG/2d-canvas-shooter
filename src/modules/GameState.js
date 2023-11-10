class GameState {
  #objects = {
    bullets: [],
    enemies: [],
    particles: []
  };

  static destroyObjects(array) {
    for(let i = array.length - 1; i >= 0; i--) {
      array[i].toDestroy && array.splice(i, 1);
    }
  }

  constructor(canvas, player, gameAudio) {
    this.#objects.canvas = canvas;
    this.#objects.context = canvas.getContext("2d");
    this.#objects.player = player;
    this.#objects.gameAudio = gameAudio;
  }

  get objects() {
    return this.#objects;
  }

  updateObjects(array) {
    const arrLength = array.length;
    
    for(let i = 0; i < arrLength; i++) {
      array[i].update(this.#objects.context);
    }
  }
}

export { GameState };