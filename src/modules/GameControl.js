import { Particle } from "./Particle.js";

class GameControl {
  #bullets;
  #enemies;
  #particles;
  #player;
  #gameAudio;
  #scoreboard;

  constructor({ bullets, enemies, particles, player, gameAudio, scoreboard, screens }) {
    this.#bullets = bullets;
    this.#enemies = enemies;
    this.#particles = particles;
    this.#player = player;
    this.#gameAudio = gameAudio;
    this.#scoreboard = scoreboard;
    this.screens = screens;
  }

  #damageEnemy(enemy) {
    enemy.takeDamage(10);
    const { x, y, baseColor, health } = enemy;
    const isEnemyAlive = health > 0;
    this.#particles.push(
      ...Particle.createParticles(x, y, 8, 5, baseColor, isEnemyAlive ? 8 : 16)
    );
    this.#countScore(isEnemyAlive);
    this.#playStatusSound(isEnemyAlive);
  }

  #countScore(isEnemyAlive) {
    this.#scoreboard.score += isEnemyAlive ? 50 : 200;
  }

  #playStatusSound(isEnemyAlive) {
    this.#gameAudio.playSound(isEnemyAlive ? "hit" : "explosion");
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
        // this.#particles.push(
        //   ...Particle.createParticles(x, y, 8, 6, color, 20)
        // );
        this.#gameAudio.playSound("explosion");
        this.screens.restart.style.display = "flex";
      }
    }
  }

  update() {
    this.#destroyBullet();
    this.#killPlayer();
  }
}

export { GameControl };