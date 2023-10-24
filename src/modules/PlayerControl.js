import { Projectile } from "./Projectile.js";

class PlayerControl {
  #player;
  #screen;
  #keys = {};
  #bullets = [];

  constructor(player, screen) {
    this.#player = player;
    this.#screen = screen;

    document.addEventListener("keydown", ({ code }) => {
      this.#keys[code] = true;
    });
    
    document.addEventListener("keyup", ({ code }) => {
      this.#keys[code] = false;
    });
    
    document.addEventListener("click", (e) => {
      this.#shoot(e);
    });
  }

  set bullets(bullets) {
    this.#bullets = bullets;
  }

  get bullets() {
    return this.#bullets;
  }

  #moveLeft() {
    this.#player.x -= this.#player.speed;
    if(this.#player.x < 0) {
      this.#player.x = 0;
    }
  }

  #moveRight(canvasWidth) {
    this.#player.x += this.#player.speed;
    if(this.#player.x + this.#player.width > canvasWidth) {
      this.#player.x = canvasWidth - this.#player.width;
    }
  }

  #moveUp() {
    this.#player.y -= this.#player.speed;
    if(this.#player.y < 0) {
      this.#player.y = 0;
    }
  }

  #moveDown(canvasHeight) {
    this.#player.y += this.#player.speed;
    if(this.#player.y + this.#player.height > canvasHeight) {
      this.#player.y = canvasHeight - this.#player.height;
    }
  }

  move() {
    if(this.#keys["KeyA"]) {
      this.#moveLeft();
    }

    if(this.#keys["KeyD"]) {
      this.#moveRight(this.#screen.width);
    }

    if(this.#keys["KeyW"]) {
      this.#moveUp();
    }

    if(this.#keys["KeyS"]) {
      this.#moveDown(this.#screen.height);
    }
  }

  #shoot({ clientX, clientY }) {
      const playerCenterX = this.#player.x + this.#player.width / 2;
      const playerCenterY = this.#player.y + this.#player.height / 2;
      const dirX = clientX - playerCenterX;
      const dirY = clientY - playerCenterY;
      const angle = Math.atan2(dirY, dirX);

      this.#bullets.push(
        new Projectile(playerCenterX, playerCenterY, 5, 20, angle, "yellow")
      );
  }
}

export { PlayerControl };