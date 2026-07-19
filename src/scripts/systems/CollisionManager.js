import { Bullet } from "../entities/projectiles/Bullet";
import { Enemy } from "../enemy/Enemy";
import { entityManager } from "./EntityManager";
import { Item } from "../entities/items/Item";
import { gameState } from "../singletons/GameState";

class CollisionManager {
  #filterInstances() {
    const instances = [[], [], []];

    for (let i = 0, len = entityManager.entities.length; i < len; i++) {
      const instance = entityManager.entities[i];

      if (instance instanceof Enemy) {
        instances[0].push(instance);
      } else if (instance instanceof Bullet) {
        instances[1].push(instance);
      } else if (instance instanceof Item) {
        instances[2].push(instance);
      }
    }

    return instances;
  }

  checkCollisions() {
    const [enemies, bullets, items] = this.#filterInstances();
    const player = gameState.getEntity("player");

    for (const item of items) {
      player.collidedWith(item);
    }

    for (const enemy of enemies) {
      player.collidedWith(enemy);
      for (const bullet of bullets) {
        const collided = bullet.collidedWith(enemy);
        if (collided) return;
      }
    }
  }
}

export const collisionManager = new CollisionManager();
