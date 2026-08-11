import { Enemy } from "./Enemy";

class Crazy extends Enemy {
  #randomColor = 0;

  update(delta) {
    super.update(delta);
    this.color = `hsl(${this.#randomColor}, 100%, 50%)`;
    this.#randomColor = (this.#randomColor % 360) + 1;
  }
}

export { Crazy };
