import { Particle } from "./Particle.js";

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

  #damageEnemy(enemy) {
    const { x, y, baseColor, health } = enemy;
    enemy.takeDamage(10);
    this.#particles.push(
      ...Particle.createParticles(x, y, 8, 5, baseColor, health > 0 ? 8 : 16)
    );
  }

  #hasEnemyCollided(bullet) {
    const enemiesLength = this.#enemies.length;

    for(let i = 0; i < enemiesLength; i++) {
      const enemy = this.#enemies[i];
      
      if(!bullet.toDestroy && bullet.collidedWith(enemy)) {
        this.#damageEnemy(enemy);
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
      if(this.#hasEnemyCollided(bullet)) {
        bullet.toDestroy = true;
      }
    }
  }
}

export { BulletControl };