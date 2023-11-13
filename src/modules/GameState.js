class GameState {
  #objects;

  static destroyObjects(array) {
    for(let i = array.length - 1; i >= 0; i--) {
      array[i].toDestroy && array.splice(i, 1);
    }
  }

  constructor(objects) {
    this.#objects = {
      ...objects,
      bullets: [],
      enemies: [],
      particles: []
    };
    this.#objects.context = this.#objects.canvas.getContext("2d");
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