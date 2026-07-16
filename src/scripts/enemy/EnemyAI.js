class EnemyAI {
  #enemy;

  constructor(enemy) {
    this.#enemy = enemy;
  }

  followTarget(target, delta) {
    const enemy = this.#enemy;
    const dirX = target.x - enemy.x;
    const dirY = target.y - enemy.y;
    const angle = Math.atan2(dirY, dirX);
    if (Math.hypot(dirX, dirY) > enemy.radius) {
      enemy.x += Math.cos(angle) * enemy.speed * delta;
      enemy.y += Math.sin(angle) * enemy.speed * delta;
    }
  }
}

export { EnemyAI };
