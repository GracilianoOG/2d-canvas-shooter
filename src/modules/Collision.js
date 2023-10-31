class Collision {
  static manageCollision(enemyControl, bulletControl) {
    const enemiesLength = enemyControl.enemies.length;
    const bulletsLength = bulletControl.bullets.length;

    for(let i = 0; i < enemiesLength; i++) {
      const enemy = enemyControl.enemies[i];

      for(let j = 0; j < bulletsLength; j++) {
        const bullet = bulletControl.bullets[j];
        
        if(!bullet.hasCollided && Collision.detectCircleCollision(enemy, bullet)) {
          bullet.hasCollided = true;
          enemy.takeDamage(10);
        }
      }
    }
  }

  static detectCircleCollision(circle1, circle2) {
    if(Math.hypot(circle1.x - circle2.x, circle1.y - circle2.y) < circle1.radius + circle2.radius) {
      return true;
    }
    return false;
  }

  static detectCircleSquareCollision(circle, square) {
    if(Math.hypot(circle.x - square.center.x, circle.y - square.center.y) < circle.radius + square.width / 2) {
      return true;
    }
    return false;
  }
}

export { Collision };