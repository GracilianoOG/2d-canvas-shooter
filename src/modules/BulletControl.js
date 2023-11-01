class BulletControl {
  #bullets;
  #canvas;
  #ctx;

  constructor({ canvas, context, bullets }) {
    this.#canvas = canvas;
    this.#ctx = context;
    this.#bullets = bullets;
  }

  #checkBulletOutOfBounds(bullet, canvas) {
    const { x, y, radius } = bullet;
  
    if(x < -radius || x > canvas.width + radius || y < -radius || y > canvas.height + radius) {
      bullet.toDestroy = true;
    }
  }

  #deleteBullets() {
    for(let i = 0; i < this.#bullets.length; i++) {
      if(this.#bullets[i].toDestroy) {
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