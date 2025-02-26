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
    if (this.#player.x < this.#player.dimensions.radius) {
      this.#player.x = this.#player.dimensions.radius;
    }
  }

  #moveRight(canvasWidth) {
    this.#player.x += this.#player.speed;
    if (this.#player.x + this.#player.dimensions.radius > canvasWidth) {
      this.#player.x = canvasWidth - this.#player.dimensions.radius;
    }
  }

  #moveUp() {
    this.#player.y -= this.#player.speed;
    if (this.#player.y < this.#player.dimensions.radius) {
      this.#player.y = this.#player.dimensions.radius;
    }
  }

  #moveDown(canvasHeight) {
    this.#player.y += this.#player.speed;
    if (this.#player.y + this.#player.dimensions.radius > canvasHeight) {
      this.#player.y = canvasHeight - this.#player.dimensions.radius;
    }
  }

  #movePlayer() {
    if (this.#keys["KeyA"]) {
      this.#moveLeft();
    }

    if (this.#keys["KeyD"]) {
      this.#moveRight(window.gameState["entities"].mainCanvas.width);
    }

    if (this.#keys["KeyW"]) {
      this.#moveUp();
    }

    if (this.#keys["KeyS"]) {
      this.#moveDown(window.gameState["entities"].mainCanvas.height);
    }
  }

  update() {
    this.#movePlayer();
  }
}

export { PlayerController };
