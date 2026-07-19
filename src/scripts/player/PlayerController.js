import { eventManager } from "../systems/EventManager";
import { inputManager } from "../systems/InputManager";
import * as Keys from "../utils/constants/keys";

class PlayerController {
  #player;
  #delta;

  constructor(player) {
    this.#player = player;
    inputManager.bind("moveLeft", [Keys.A, Keys.LEFT]);
    inputManager.bind("moveRight", [Keys.D, Keys.RIGHT]);
    inputManager.bind("moveUp", [Keys.W, Keys.UP]);
    inputManager.bind("moveDown", [Keys.S, Keys.DOWN]);
    inputManager.bind("fury", [Keys.SPACE, Keys.CTRL_RIGHT]);
    inputManager.bind("shoot", [Keys.LMB]);
  }

  #detectShooting() {
    if (this.#player.isDead || !inputManager.isActionPressed("shoot")) {
      return;
    }
    this.#player.weapon.shoot(this.#player.x, this.#player.y);
  }

  #move(direction, axis) {
    this.#player[axis] += this.#player.speed * this.#delta * direction;
  }

  #movePlayer() {
    if (inputManager.isActionPressed("moveLeft")) {
      this.#move(-1, "x");
    }
    if (inputManager.isActionPressed("moveRight")) {
      this.#move(1, "x");
    }
    if (inputManager.isActionPressed("moveUp")) {
      this.#move(-1, "y");
    }
    if (inputManager.isActionPressed("moveDown")) {
      this.#move(1, "y");
    }
  }

  #detectFury() {
    if (inputManager.isActionPressed("fury")) {
      eventManager.emit("shouldActivateFury");
    }
  }

  update(delta) {
    this.#delta = delta;
    this.#movePlayer();
    this.#detectShooting();
    this.#detectFury();
  }
}

export { PlayerController };
