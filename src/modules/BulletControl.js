import { Bullet } from "./Bullet.js";

class BulletControl {
  #bullets;
  #canvas;
  #ctx;

  constructor({ canvas, context, bullets }) {
    this.#canvas = canvas;
    this.#ctx = context;
    this.#bullets = bullets;
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
    for(let i = 0; i < this.#bullets.length; i++) {
      if(this.#bullets[i].hasCollided) {
        this.#bullets.splice(i, 1);
      }
    }
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