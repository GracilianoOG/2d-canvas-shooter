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
    const { x: bx, y: by, radius: br } = bullet;
    const { width: cw, height: ch } = canvas;
    return bx < -br || bx > cw + br || by < -br || by > ch + br;
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
  }
}

export { BulletControl };