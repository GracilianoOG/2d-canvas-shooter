import { Adrenaline } from "../entities/items/Adrenaline";
import { Life } from "../entities/items/Life";
import { Nuke } from "../entities/items/Nuke";
import { SentryBox } from "../entities/items/SentryBox";
import { Shards } from "../entities/items/Shards";
import { Shield } from "../entities/items/Shield";
import { WeaponBox } from "../entities/items/WeaponBox";

const dropTable = [
  [(x, y) => new Nuke(x, y), 5],
  [(x, y) => new Life(x, y), 10],
  [(x, y) => new Shards(x, y), 20],
  [(x, y) => new SentryBox(x, y), 20],
  [(x, y) => new Shield(x, y), 30],
  [(x, y) => new Adrenaline(x, y), 60],
  [(x, y) => new WeaponBox(x, y), 100],
];

export const dropRandomItem = (x, y, chance = 0.1) => {
  if (Math.random() > chance) return;

  const totalChance = dropTable.reduce((sum, dropSet) => sum + dropSet[1], 0);
  const randChance = Math.floor(totalChance * Math.random());

  for (let i = 0, currChance = 0; i < dropTable.length; i++) {
    currChance += dropTable[i][1];

    if (currChance >= randChance) {
      return dropTable[i][0](x, y);
    }
  }
};
