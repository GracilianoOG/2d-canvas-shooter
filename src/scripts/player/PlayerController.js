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
    if (this.#player.isDead || !inputManager.isLeftMousePressed()) {
      return;
    }
    this.#player.weapon.shoot(this.#player.x, this.#player.y);
  }

  #move(direction, axis) {
    this.#player[axis] += this.#player.speed * this.#delta * direction;
  }

  #movePlayer() {
    if (inputManager.isKeyPressed("moveLeft")) {
      this.#move(-1, "x");
    }
    if (inputManager.isKeyPressed("moveRight")) {
      this.#move(1, "x");
    }
    if (inputManager.isKeyPressed("moveUp")) {
      this.#move(-1, "y");
    }
    if (inputManager.isKeyPressed("moveDown")) {
      this.#move(1, "y");
    }
  }

  #detectFury() {
    if (inputManager.isKeyPressed("fury")) {
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
