import { Bullet } from "./Bullet.js";

class PlayerControl {
  #player;
  #canvas;
  #ctx;
  #keys = {};
  #bullets;
  #enemies;
  #particles;

  constructor({ player, canvas, context, bullets, enemies, particles }) {
    this.#player = player;
    this.#canvas = canvas;
    this.#ctx = context;
    this.#bullets = bullets;
    this.#enemies = enemies;
    this.#particles = particles;

    document.addEventListener("keydown", ({ code }) => {
      this.#keys[code] = true;
    });
    
    document.addEventListener("keyup", ({ code }) => {
      this.#keys[code] = false;
    });
    
    document.addEventListener("click", (e) => {
      if(this.#isPlayerDead()) {
        return;
      }
      this.#shoot(e);
    });
  }

  #moveLeft() {
    this.#player.x -= this.#player.speed;
    if(this.#player.x < this.#player.radius) {
      this.#player.x = this.#player.radius;
    }
  }

  #moveRight(canvasWidth) {
    this.#player.x += this.#player.speed;
    if(this.#player.x + this.#player.radius > canvasWidth) {
      this.#player.x = canvasWidth - this.#player.radius;
    }
  }

  #moveUp() {
    this.#player.y -= this.#player.speed;
    if(this.#player.y < this.#player.radius) {
      this.#player.y = this.#player.radius;
    }
  }

  #moveDown(canvasHeight) {
    this.#player.y += this.#player.speed;
    if(this.#player.y + this.#player.radius > canvasHeight) {
      this.#player.y = canvasHeight - this.#player.radius;
    }
  }

  #move() {
    if(this.#keys["KeyA"]) {
      this.#moveLeft();
    }

    if(this.#keys["KeyD"]) {
      this.#moveRight(this.#canvas.width);
    }

    if(this.#keys["KeyW"]) {
      this.#moveUp();
    }

    if(this.#keys["KeyS"]) {
      this.#moveDown(this.#canvas.height);
    }
  }

  #isPlayerDead() {
    return this.#player.isDead;
  }

  update() {
    if(this.#isPlayerDead()) {
      return;
    }
    this.#move();
    this.#player.update(this.#ctx);

    for(let i = 0; i < this.#enemies.length; i++) {
      if(this.#player.collidedWith(this.#enemies[i])) {
        this.#player.isDead = true;
        this.#particles.push(...this.#player.bleed(20, 8, 6));
        break;
      }
    }
  }

  #shoot({ clientX, clientY }) {
    const { x: playerCenterX, y: playerCenterY } = this.#player;
    const dirX = clientX - playerCenterX;
    const dirY = clientY - playerCenterY;
    const angle = Math.atan2(dirY, dirX);
    this.#bullets.push(new Bullet(playerCenterX, playerCenterY, 5, 20, angle, this.#player.color));
  }
}

export { PlayerControl };