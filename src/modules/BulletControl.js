import { Bullet } from "./Bullet.js";

class BulletControl {
  #bullets = [];
  #screen;
  #ctx;

  constructor(screen) {
    this.#screen = screen;
    this.#ctx = this.#screen.getContext("2d");
  }

  set bullets(bullets) {
    this.#bullets = bullets;
  }

  get bullets() {
    return this.#bullets;
  }

  #checkBulletOutOfBounds(bullet, screen) {
    const { x, y, radius } = bullet;
  
    if(x < -radius || x > screen.width + radius || y < -radius || y > screen.height + radius) {
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
    for(let i = 0; i < this.#bullets.length; i++) {
      const bullet = this.#bullets[i];
      bullet.update(this.#ctx);
      this.#checkBulletOutOfBounds(bullet, this.#screen);
    }
    this.#deleteBullets();
  }
}

export { BulletControl };