import { eventManager } from "../singletons/EventManager";
import { inputManager } from "../singletons/InputManager";

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

  #moveUp() {
    this.#player.y -= this.#player.speed * this.#delta;
  }

  #moveDown() {
    this.#player.y += this.#player.speed * this.#delta;
  }

  #movePlayer() {
    if (inputManager.isKeyPressed(["KeyA", "ArrowLeft"])) {
      this.#moveLeft();
    }
    if (inputManager.isKeyPressed(["KeyD", "ArrowRight"])) {
      this.#moveRight();
    }
    if (inputManager.isKeyPressed(["KeyW", "ArrowUp"])) {
      this.#moveUp();
    }
    if (inputManager.isKeyPressed(["KeyS", "ArrowDown"])) {
      this.#moveDown();
    }
  }

  #detectFury() {
    if (inputManager.isKeyPressed("Space")) {
      eventManager.emit("FuryActivation");
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
