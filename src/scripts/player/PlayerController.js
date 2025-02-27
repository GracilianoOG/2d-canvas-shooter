import { InputHandler } from "../InputHandler";

class PlayerController {
  #keys = {};
  #player;

  constructor(player) {
    this.#player = player;

    InputHandler.create("keydown", ({ code }) => {
      this.#keys[code] = true;
    });

    InputHandler.create(
      "keyup",
      ({ code }) => {
        this.#keys[code] = false;
      },
      false
    );

    InputHandler.create("click", event => {
      if (this.#player.isDead) return;
      this.#player.weapon.shoot(event);
    });
  }

  #moveLeft() {
    this.#player.x -= this.#player.speed;
  }

  #moveRight() {
    this.#player.x += this.#player.speed;
  }

  #moveUp() {
    this.#player.y -= this.#player.speed;
  }

  #moveDown() {
    this.#player.y += this.#player.speed;
  }

  #movePlayer() {
    if (this.#keys["KeyA"]) this.#moveLeft();
    if (this.#keys["KeyD"]) this.#moveRight();
    if (this.#keys["KeyW"]) this.#moveUp();
    if (this.#keys["KeyS"]) this.#moveDown();
  }

  update() {
    this.#movePlayer();
  }
}

export { PlayerController };
