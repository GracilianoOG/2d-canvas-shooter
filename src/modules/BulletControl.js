class BulletControl {
  #bullets;
  #enemies;
  #particles;
  #canvas;
  #ctx;

  constructor({ canvas, context, bullets, enemies, particles }) {
    this.#canvas = canvas;
    this.#ctx = context;
    this.#bullets = bullets;
    this.#enemies = enemies;
    this.#particles = particles;
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
        this.#particles.push(...enemy.bleed(enemy.health > 0 ? 8 : 16, 8, 5));
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