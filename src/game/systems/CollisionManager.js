import { Layers } from "../constants/layers";

export class CollisionManager {
  check(entities) {
    const player = entities.get(Layers.PLAYER)[0];

    for (const item of entities.get(Layers.ITEMS)) {
      player.collidedWith(item);
    }

    for (const orb of entities.get(Layers.ORB)) {
      player.collidedWith(orb);
    }

    for (const enemy of entities.get(Layers.ENEMIES)) {
      player.collidedWith(enemy);
      for (const bullet of entities.get(Layers.AMMO)) {
        if (bullet.collidedWith(enemy)) return;
      }
    }
  }
}
