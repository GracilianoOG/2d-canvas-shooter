export class CollisionManager {
  check(entities) {
    const player = entities.get("player")[0];

    for (const item of entities.get("items")) {
      player.collidedWith(item);
    }

    for (const enemy of entities.get("enemies")) {
      player.collidedWith(enemy);
      for (const bullet of entities.get("ammo")) {
        if (bullet.collidedWith(enemy)) return;
      }
    }
  }
}
