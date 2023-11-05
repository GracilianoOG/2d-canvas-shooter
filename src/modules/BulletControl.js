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

  #isBulletOutOfBounds(bullet, canvas) {
    const { x, y, radius } = bullet;
  
    if(x < -radius || x > canvas.width + radius || y < -radius || y > canvas.height + radius) {
      return true;
    }
    return false;
  }

  #deleteBullets() {
    for(let i = this.#bullets.length - 1; i >= 0; i--) {
      if(this.#bullets[i].toDestroy) {
        this.#bullets.splice(i, 1);
      }
    }
  }

  #hasEnemyCollided(bullet) {
    const enemiesLength = this.#enemies.length;

    for(let i = 0; i < enemiesLength; i++) {
      const enemy = this.#enemies[i];
      
      if(!bullet.toDestroy && bullet.collidedWith(enemy)) {
        enemy.takeDamage(10);
        this.#particles.push(...enemy.bleed(enemy.health > 0 ? 8 : 16, 8, 5));
        return true;
      }
    }
    return false;
  }

  update() {
    const bulletsLength = this.#bullets.length;
    
    for(let i = 0; i < bulletsLength; i++) {
      const bullet = this.#bullets[i];
      bullet.update(this.#ctx);
      if(
        this.#hasEnemyCollided(bullet) ||
        this.#isBulletOutOfBounds(bullet, this.#canvas)
      ) {
        bullet.toDestroy = true;
      }
    }
    this.#deleteBullets();
  }
}

export { BulletControl };