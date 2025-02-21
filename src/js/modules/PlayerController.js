import { Bullet } from "./Bullet.js";

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

    document.addEventListener("click", e => {
      if (this.#isPlayerDead()) {
        return;
      }
      this.#shoot(e);
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

  #waitForPlayerMovement() {
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

  #isPlayerDead() {
    return this.#player.isDead;
  }

  #calcBulletPath({ clientX, clientY }) {
    const { x, y } = this.#player;
    const dirX = clientX - x;
    const dirY = clientY - y;
    const angle = Math.atan2(dirY, dirX);

    return { x, y, angle };
  }

  #shoot(e) {
    const { x, y, angle } = this.#calcBulletPath(e);
    const bullet = new Bullet(x, y, 5, 20, angle, this.#player.color);
    window.gameState["entities"].bullets.push(bullet);
    window.gameState["entities"].gameAudio.playSound("shot");
  }

  update() {
    if (this.#isPlayerDead()) {
      return;
    }
    this.#waitForPlayerMovement();
    this.#player.draw(window.gameState["entities"].mainCanvas.context);
  }
}

export { PlayerController };
