class EnemyAI {
  #enemy;

  constructor(enemy) {
    this.#enemy = enemy;
  }

  followTarget(target, delta) {
    const enemy = this.#enemy;
    const position = { x: target.x, y: target.y };
    const angle = enemy.angleTo(position);
    if (enemy.distanceTo(position) > enemy.radius) {
      enemy.x += Math.cos(angle) * enemy.speed * delta;
      enemy.y += Math.sin(angle) * enemy.speed * delta;
    }
  }
}

export { EnemyAI };
