import * as EnemyMods from "../utils/constants/enemyModTypes";
import * as DiffMods from "../utils/constants/modifierTypes";

export const defaultConfig = {
  spawnTime: 800,
  difficultyTime: 5000,
  modChance: 5,
  modChanceIncrement: 0.5,
  maxModChance: 50,
  minSpawnLevel: 1,
  spawnDecrementMs: 5,
};

export const defaultModifiers = [
  DiffMods.SPAWN_TIME,
  DiffMods.NEW_ENEMY,
  DiffMods.MOD_CHANCE,
];
export const enemyModifiers = [
  EnemyMods.FAST,
  EnemyMods.STRONG,
  EnemyMods.SLOW_STRONGER,
];
