import * as DiffMods from "../../constants/modifierTypes";

export const spawnerConfig = {
  spawnTime: 800,
  difficultyTime: 5000,
  specialChance: 0,
  specialIncrement: 0.005,
  maxSpecialChance: 0.3,
  minSpawnLevel: 1,
  spawnDecrementMs: 5,
};

export const defaultModifiers = [
  DiffMods.SPAWN_TIME,
  DiffMods.NEW_ENEMY,
  DiffMods.SPECIAL_CHANCE,
];
