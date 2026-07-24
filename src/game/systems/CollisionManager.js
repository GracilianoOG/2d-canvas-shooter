import { Bullet } from "../entities/projectiles/Bullet";
import { Enemy } from "../entities/enemies/Enemy";
import { entityManager } from "./EntityManager";
import { Item } from "../entities/items/Item";
import { Player } from "../entities/Player";

class CollisionManager {
  #enemies;
  #bullets;
  #items;
  #player;

  #filterInstances() {
    for (let i = 0, len = entityManager.entities.length; i < len; i++) {
      const entity = entityManager.entities[i];

      if (entity instanceof Enemy) {
        this.#enemies.push(entity);
      } else if (entity instanceof Bullet) {
        this.#bullets.push(entity);
      } else if (entity instanceof Item) {
        this.#items.push(entity);
      }
    }
  }

  #initCollisionBatches() {
    this.#enemies = [];
    this.#bullets = [];
    this.#items = [];
  }

  checkCollisions() {
    this.#initCollisionBatches();
    this.#filterInstances();

    if (!this.#player) {
      this.#player = entityManager.entities.find(
        (ent) => ent instanceof Player,
      );
    }

    for (const item of this.#items) {
      this.#player.collidedWith(item);
    }

    for (const enemy of this.#enemies) {
      this.#player.collidedWith(enemy);
      for (const bullet of this.#bullets) {
        const collided = bullet.collidedWith(enemy);
        if (collided) return;
      }
    }
  }
}

export const collisionManager = new CollisionManager();
