class PlayerControl {
  #player;
  #screen;
  #ctx;
  #keys = {};
  #bulletControl;

  constructor(player, screen, bulletControl) {
    this.#player = player;
    this.#screen = screen;
    this.#ctx = this.#screen.getContext("2d");
    this.#bulletControl = bulletControl;

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

  #move() {
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

  update() {
    this.#move();
    this.#player.update(this.#ctx);
  }

  #shoot({ clientX, clientY }) {
      const { x: playerCenterX, y: playerCenterY } = this.#player.center;
      const dirX = clientX - playerCenterX;
      const dirY = clientY - playerCenterY;
      const angle = Math.atan2(dirY, dirX);
      this.#bulletControl.createBullet(playerCenterX, playerCenterY, 5, 20, angle, this.#player.color);
  }
}

export { PlayerControl };