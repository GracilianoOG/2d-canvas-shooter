class Collision {
  static manageCollision(enemyControl, bulletControl) {
    for(let i = 0; i < enemyControl.enemies.length; i++) {
      for(let j = 0; j < bulletControl.bullets.length; j++) {
        const enemy = enemyControl.enemies[i];
        const bullet = bulletControl.bullets[j];

        if(Collision.detectCircleCollision(enemy, bullet) && !bullet.hasCollided) {
          enemy.hasCollided = true;
          bullet.hasCollided = true;
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