import * as EnemyMods from "../constants/enemyModTypes";
import * as DiffMods from "../constants/modifierTypes";

export const spawnerConfig = {
  spawnTime: 800,
  difficultyTime: 5000,
  modChance: 0,
  modChanceIncrement: 0.25,
  specialChance: 0,
  specialIncrement: 0.005,
  maxSpecialChance: 0.3,
  maxModChance: 75,
  minSpawnLevel: 1,
  spawnDecrementMs: 5,
};

export const defaultModifiers = [
  DiffMods.SPAWN_TIME,
  DiffMods.NEW_ENEMY,
  DiffMods.MOD_CHANCE,
  DiffMods.SPECIAL_CHANCE,
];

export const enemyModifiers = [
  EnemyMods.FAST,
  EnemyMods.STRONG,
  EnemyMods.SLOW_STRONGER,
];
