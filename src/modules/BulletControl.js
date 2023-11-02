class BulletControl {
  #bullets;
  #enemies;
  #canvas;
  #ctx;

  constructor({ canvas, context, bullets, enemies }) {
    this.#canvas = canvas;
    this.#ctx = context;
    this.#bullets = bullets;
    this.#enemies = enemies;
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

  #checkEnemyCollision(bullet) {
    const enemiesLength = this.#enemies.length;

    for(let j = 0; j < enemiesLength; j++) {
      const enemy = this.#enemies[j];
      
      if(!bullet.toDestroy && bullet.collidedWith(enemy)) {
        bullet.toDestroy = true;
        enemy.takeDamage(10);
      }
    }
  }

  update() {
    const bulletsLength = this.#bullets.length;
    
    for(let i = 0; i < bulletsLength; i++) {
      const bullet = this.#bullets[i];
      bullet.update(this.#ctx);
      this.#checkBulletOutOfBounds(bullet, this.#canvas);
      this.#checkEnemyCollision(bullet);
    }
    this.#deleteBullets();
  }
}

export { BulletControl };