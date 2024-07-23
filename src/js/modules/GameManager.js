import { notifyScoreEarned, storeHighscore } from "../utils/helpers.js";
import { Particle } from "./Particle.js";

class GameManager {
  #entities;

  constructor(entities) {
    this.#entities = entities;
  }

  #damageEnemy(enemy) {
    enemy.takeDamage(10);
    const { x, y, baseColor, health } = enemy;
    const isEnemyAlive = health > 0;
    const scoreGiven = isEnemyAlive ? 50 : 200;
    this.#entities.particles.push(
      ...Particle.createParticles(x, y, 8, 5, baseColor, isEnemyAlive ? 8 : 16)
    );
    this.#countScore(scoreGiven);
    notifyScoreEarned(x, y, scoreGiven);
    this.#playStatusSound(isEnemyAlive);
  }

  #countScore(scoreAmount) {
    this.#entities.scoreboard.score += scoreAmount;
  }

  #playStatusSound(isEnemyAlive) {
    this.#entities.gameAudio.playSound(isEnemyAlive ? "hit" : "explosion");
  }

  #hasBulletHitEnemy(bullet) {
    const enemiesLength = this.#entities.enemies.length;

    for(let i = 0; i < enemiesLength; i++) {
      const enemy = this.#entities.enemies[i];
      
      if(!bullet.toDestroy && bullet.collidedWith(enemy)) {
        this.#damageEnemy(enemy);
        return true;
      }
    }
    return false;
  }

  #destroyBullet() {
    const bulletsLength = this.#entities.bullets.length;
    
    for(let i = 0; i < bulletsLength; i++) {
      const bullet = this.#entities.bullets[i];
      if(this.#hasBulletHitEnemy(bullet)) {
        bullet.toDestroy = true;
      }
    }
  }

  #endGame() {
    if(!this.#isGameOver()) {
      return;
    }

    const { x: playerX, y: playerY, color: playerColor } = this.#entities.player;
    this.#entities.player.isDead = true;
    this.#entities.gameAudio.playSound("explosion");
    this.#entities.particles.push(
      ...Particle.createParticles(playerX, playerY, 8, 5, playerColor, 16)
    );
    this.#prepareRestart(2.4);
  }

  #isGameOver() {
    const enemiesLength = this.#entities.enemies.length;
    for(let i = 0; !this.#entities.player.isDead && i < enemiesLength; i++) {
      if(this.#entities.player.collidedWith(this.#entities.enemies[i])) {
        return true;
      }
    }
    return false;
  }

  #prepareRestart(delayInSeconds) {
    setTimeout(() => {
      cancelAnimationFrame(this.#entities.animation.id);
      storeHighscore(this.#entities.scoreboard.score);
      this.#entities.screens.restart.style.display = "flex";
      this.#cleanUpEntities();
    }, delayInSeconds * 1000);
  }

  #cleanUpEntities() {
    this.#entities.enemies.length = 0;
    this.#entities.particles.length = 0;
    this.#entities.bullets.length = 0;
  }

  update() {
    this.#destroyBullet();
    this.#endGame();
  }
}

export { GameManager };