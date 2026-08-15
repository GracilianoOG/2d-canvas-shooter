import * as Keys from "../constants/keys";

class PlayerController {
  #player;
  #input;
  #delta;

  constructor(player, input) {
    this.#player = player;
    this.#input = input;

    input.bind("moveLeft", [Keys.A, Keys.LEFT]);
    input.bind("moveRight", [Keys.D, Keys.RIGHT]);
    input.bind("moveUp", [Keys.W, Keys.UP]);
    input.bind("moveDown", [Keys.S, Keys.DOWN]);
    input.bind("fury", [Keys.SPACE, Keys.CTRL_RIGHT]);
    input.bind("shoot", [Keys.LMB]);
  }

  #move(direction, axis) {
    this.#player[axis] += this.#player.speed * this.#delta * direction;
  }

  #movePlayer() {
    if (this.#input.isActionPressed("moveLeft")) {
      this.#move(-1, "x");
    }
    if (this.#input.isActionPressed("moveRight")) {
      this.#move(1, "x");
    }
    if (this.#input.isActionPressed("moveUp")) {
      this.#move(-1, "y");
    }
    if (this.#input.isActionPressed("moveDown")) {
      this.#move(1, "y");
    }
  }

  update(delta) {
    this.#delta = delta;
    this.#movePlayer();
  }
}

export { PlayerController };
