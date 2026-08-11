import { Adrenaline } from "../entities/items/Adrenaline";
import { Life } from "../entities/items/Life";
import { Nuke } from "../entities/items/Nuke";
import { SentryBox } from "../entities/items/SentryBox";
import { Shards } from "../entities/items/Shards";
import { Shield } from "../entities/items/Shield";
import { WeaponBox } from "../entities/items/WeaponBox";

const dropTable = [
  [() => new Nuke(), 5],
  [() => new Life(), 10],
  [() => new Shards(), 20],
  [() => new SentryBox(), 20],
  [() => new Shield(), 30],
  [() => new Adrenaline(), 60],
  [() => new WeaponBox(), 100],
];

export const dropRandomItem = (chance = 0.1) => {
  if (Math.random() > chance) return;

  const totalChance = dropTable.reduce((sum, dropSet) => sum + dropSet[1], 0);
  const randChance = Math.floor(totalChance * Math.random());

  for (let i = 0, currChance = 0; i < dropTable.length; i++) {
    currChance += dropTable[i][1];

    if (currChance >= randChance) {
      return dropTable[i][0]();
    }
  }
};
