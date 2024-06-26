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
    for(let i = 0; !this.#player.isDead && i < this.#enemies.length; i++) {
      if(this.#player.collidedWith(this.#enemies[i])) {
        const { x: playerX, y: playerY, color: playerColor } = this.#player;
        this.#player.isDead = true;
        this.#gameAudio.playSound("explosion");
        this.#particles.push(
          ...Particle.createParticles(playerX, playerY, 8, 5, playerColor, 16)
        );
        setTimeout(() => {
          cancelAnimationFrame(this.#animation.id);
          this.#screens.restart.style.display = "flex";
          this.#storeHighscore();
          this.#cleanUp();
        }, 2400);
      }
    }
  }

  #storeHighscore() {
    const KEY = "js-shooter-highscore";
    const currentScore = this.#scoreboard.score;
    const highscore = parseInt(localStorage.getItem(KEY) || 0);
    if(currentScore > highscore) {
      localStorage.setItem(KEY, currentScore);
    }
  }

  #cleanUp() {
    this.#enemies.length = 0;
    this.#particles.length = 0;
    this.#bullets.length = 0;
  }

  #notifyScoreEarned(x, y, scoreAmount) {
    const score = document.createElement("div");
    score.setAttribute("class", "score");
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