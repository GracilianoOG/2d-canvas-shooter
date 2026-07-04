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
    if (inputManager.isKeyPressed([Keys.A, Keys.LEFT])) {
      this.#move(-1, "x");
    }
    if (inputManager.isKeyPressed([Keys.D, Keys.RIGHT])) {
      this.#move(1, "x");
    }
    if (inputManager.isKeyPressed([Keys.W, Keys.UP])) {
      this.#move(-1, "y");
    }
    if (inputManager.isKeyPressed([Keys.S, Keys.DOWN])) {
      this.#move(1, "y");
    }
  }

  #detectFury() {
    if (inputManager.isKeyPressed([Keys.SPACE, Keys.CTRL_RIGHT])) {
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
