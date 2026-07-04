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
    this.#player.weapon.shoot();
  }

  #moveLeft() {
    this.#player.x -= this.#player.speed * this.#delta;
  }

  #moveRight() {
    this.#player.x += this.#player.speed * this.#delta;
  }

  #moveY(direction) {
    this.#player.y += this.#player.speed * this.#delta * direction;
  }

  #movePlayer() {
    if (inputManager.isKeyPressed([Keys.A, Keys.LEFT])) {
      this.#moveLeft();
    }
    if (inputManager.isKeyPressed([Keys.D, Keys.RIGHT])) {
      this.#moveRight();
    }
    if (inputManager.isKeyPressed([Keys.W, Keys.UP])) {
      this.#moveY(-1);
    }
    if (inputManager.isKeyPressed([Keys.S, Keys.DOWN])) {
      this.#moveY(1);
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
