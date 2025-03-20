class PlayerController {
  #keys = {};
  #player;
  #delta;

  constructor(player) {
    this.#player = player;
    const container = document.querySelector("#game-container");

    document.addEventListener("keydown", ({ code }) => {
      this.#keys[code] = true;
    });

    document.addEventListener("keyup", ({ code }) => {
      this.#keys[code] = false;
    });

    container.addEventListener("mousemove", event => {
      this.#keys.click = { ...this.#keys.click, event };
    });

    container.addEventListener(
      "mouseenter",
      event => (this.#keys.click = { event }),
      { once: true }
    );

    container.addEventListener("mousedown", () => {
      this.#keys.click = { ...this.#keys.click, canShoot: true };
    });

    container.addEventListener("mouseup", () => {
      this.#keys.click = { ...this.#keys.click, canShoot: false };
    });
  }

  #detectShooting() {
    if (this.#player.isDead || !this.#keys.click?.canShoot) return;
    this.#player.weapon.shoot(this.#keys.click.event);
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
    this.#detectShooting();
  }
}

export { PlayerController };
