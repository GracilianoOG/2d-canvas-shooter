class PlayerController {
  #keys = {};
  #player;
  #delta;

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
    if (this.#keys["KeyA"] || this.#keys["ArrowLeft"]) this.#moveLeft();
    if (this.#keys["KeyD"] || this.#keys["ArrowRight"]) this.#moveRight();
    if (this.#keys["KeyW"] || this.#keys["ArrowUp"]) this.#moveUp();
    if (this.#keys["KeyS"] || this.#keys["ArrowDown"]) this.#moveDown();
  }

  update(delta) {
    this.#delta = delta;
    this.#movePlayer();
  }
}

export { PlayerController };
