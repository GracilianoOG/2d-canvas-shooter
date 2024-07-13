import { CSS_CLASSES } from "../utils/constants.js";
import { storeHighscore } from "../utils/helpers.js";
import { Particle } from "./Particle.js";

class GameControl {
  #bullets;
  #enemies;
  #particles;
  #player;
  #gameAudio;
  #scoreboard;
  #screens;
  #animation;

  constructor({ bullets, enemies, particles, player, gameAudio, scoreboard, screens, animation }) {
    this.#bullets = bullets;
    this.#enemies = enemies;
    this.#particles = particles;
    this.#player = player;
    this.#gameAudio = gameAudio;
    this.#scoreboard = scoreboard;
    this.#screens = screens;
    this.#animation = animation;
  }

  #damageEnemy(enemy) {
    enemy.takeDamage(10);
    const { x, y, baseColor, health } = enemy;
    const isEnemyAlive = health > 0;
    const scoreGiven = isEnemyAlive ? 50 : 200;
    this.#particles.push(
      ...Particle.createParticles(x, y, 8, 5, baseColor, isEnemyAlive ? 8 : 16)
    );
    this.#countScore(scoreGiven);
    this.#notifyScoreEarned(x, y, scoreGiven);
    this.#playStatusSound(isEnemyAlive);
  }

  #countScore(scoreAmount) {
    this.#scoreboard.score += scoreAmount;
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

  #endGame() {
    if(!this.#isGameOver()) {
      return;
    }

    const { x: playerX, y: playerY, color: playerColor } = this.#player;
    this.#player.isDead = true;
    this.#gameAudio.playSound("explosion");
    this.#particles.push(
      ...Particle.createParticles(playerX, playerY, 8, 5, playerColor, 16)
    );
    this.#prepareRestart(2.4);
  }

  #isGameOver() {
    for(let i = 0; !this.#player.isDead && i < this.#enemies.length; i++) {
      if(this.#player.collidedWith(this.#enemies[i])) {
        return true;
      }
    }
    return false;
  }

  #prepareRestart(delayInSeconds) {
    setTimeout(() => {
      cancelAnimationFrame(this.#animation.id);
      storeHighscore(this.#scoreboard.score);
      this.#screens.restart.style.display = "flex";
      this.#cleanUpEntities();
    }, delayInSeconds * 1000);
  }

  #cleanUpEntities() {
    this.#enemies.length = 0;
    this.#particles.length = 0;
    this.#bullets.length = 0;
  }

  #notifyScoreEarned(x, y, scoreAmount) {
    const score = document.createElement("div");
    score.setAttribute("class", CSS_CLASSES.SCORE);
    score.textContent = scoreAmount;
    score.style.left = x + "px";
    score.style.top = y + "px";

    score.addEventListener("animationend", () => document.body.removeChild(score));
    document.body.appendChild(score);
  }

  update() {
    this.#destroyBullet();
    this.#endGame();
  }
}

export { GameControl };