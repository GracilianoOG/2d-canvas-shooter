import { Particle } from "./Particle.js";

class GameControl {
  #bullets;
  #enemies;
  #particles;
  #player;

  constructor({ bullets, enemies, particles, player }) {
    this.#bullets = bullets;
    this.#enemies = enemies;
    this.#particles = particles;
    this.#player = player;
  }

  #damageEnemy(enemy) {
    const { x, y, baseColor, health } = enemy;
    enemy.takeDamage(10);
    this.#particles.push(
      ...Particle.createParticles(x, y, 8, 5, baseColor, health > 0 ? 8 : 16)
    );
  }

  #hasBulletHitEnemy(bullet) {
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

  #destroyBullet() {
    const bulletsLength = this.#bullets.length;
    
    for(let i = 0; i < bulletsLength; i++) {
      const bullet = this.#bullets[i];
      if(this.#hasBulletHitEnemy(bullet)) {
        bullet.toDestroy = true;
      }
    }
  }

  #killPlayer() {
    for(let i = 0; !this.#player.isDead && i < this.#enemies.length; i++) {
      if(this.#player.collidedWith(this.#enemies[i])) {
        const { x, y, color } = this.#player;
        this.#player.isDead = true;
        this.#particles.push(
          ...Particle.createParticles(x, y, 8, 6, color, 20)
        );
      }
    }
  }

  update() {
    this.#destroyBullet();
    this.#killPlayer();
  }
}

export { GameControl };