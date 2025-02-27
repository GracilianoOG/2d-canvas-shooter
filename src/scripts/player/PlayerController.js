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
    if (this.#player.isTouchingBorders()) {
      this.#player.x = this.#player.dimensions.radius;
    }
  }

  #moveRight() {
    const canvas = window.gameState.entities.mainCanvas.canvas;
    this.#player.x += this.#player.speed;
    if (this.#player.isTouchingBorders()) {
      this.#player.x = canvas.width - this.#player.dimensions.radius;
    }
  }

  #moveUp() {
    this.#player.y -= this.#player.speed;
    if (this.#player.isTouchingBorders()) {
      this.#player.y = this.#player.dimensions.radius;
    }
  }

  #moveDown() {
    const canvas = window.gameState.entities.mainCanvas.canvas;
    this.#player.y += this.#player.speed;
    if (this.#player.isTouchingBorders()) {
      this.#player.y = canvas.height - this.#player.dimensions.radius;
    }
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
