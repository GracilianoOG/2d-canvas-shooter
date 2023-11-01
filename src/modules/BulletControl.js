import { Bullet } from "./Bullet.js";

class BulletControl {
  #bullets = [];
  #canvas;
  #ctx;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext("2d");
  }

  set bullets(bullets) {
    this.#bullets = bullets;
  }

  get bullets() {
    return this.#bullets;
  }

  #checkBulletOutOfBounds(bullet, canvas) {
    const { x, y, radius } = bullet;
  
    if(x < -radius || x > canvas.width + radius || y < -radius || y > canvas.height + radius) {
      bullet.hasCollided = true;
    }
  }

  createBullet(x, y, radius, speed, angle, color) {
    this.#bullets.push(
      new Bullet(x, y, radius, speed, angle, color)
    );
  }

  #deleteBullets() {
    this.#bullets = this.#bullets.filter(bullet => !bullet.hasCollided);
  }

  update() {
    const bulletsLength = this.#bullets.length;
    
    for(let i = 0; i < bulletsLength; i++) {
      const bullet = this.#bullets[i];
      bullet.update(this.#ctx);
      this.#checkBulletOutOfBounds(bullet, this.#canvas);
    }
    this.#deleteBullets();
  }
}

export { BulletControl };