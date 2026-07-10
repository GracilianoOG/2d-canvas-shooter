import { eventManager } from "../singletons/EventManager";
import { inputManager } from "../singletons/InputManager";
import * as Keys from "../utils/constants/keys";

class PlayerController {
  #player;
  #delta;

  constructor(player) {
    this.#player = player;
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
