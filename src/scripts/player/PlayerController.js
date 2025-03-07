class PlayerController {
  #keys = {};
  #player;

  constructor(player) {
    this.#player = player;

    document.addEventListener("keydown", ({ code }) => {
      this.#keys[code] = true;
    });

    document.addEventListener("keyup", ({ code }) => {
      this.#keys[code] = false;
    });

    document
      .querySelector("#game-container")
      .addEventListener("click", event => {
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
    if (this.#keys["KeyA"] || this.#keys["ArrowLeft"]) this.#moveLeft();
    if (this.#keys["KeyD"] || this.#keys["ArrowRight"]) this.#moveRight();
    if (this.#keys["KeyW"] || this.#keys["ArrowUp"]) this.#moveUp();
    if (this.#keys["KeyS"] || this.#keys["ArrowDown"]) this.#moveDown();
  }

  update() {
    this.#movePlayer();
  }
}

export { PlayerController };
