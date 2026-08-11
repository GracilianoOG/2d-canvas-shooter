import { itemData } from "@/data/itemData";
import { Adrenaline } from "../entities/items/Adrenaline";
import { Life } from "../entities/items/Life";
import { Nuke } from "../entities/items/Nuke";
import { SentryBox } from "../entities/items/SentryBox";
import { Shards } from "../entities/items/Shards";
import { Shield } from "../entities/items/Shield";
import { WeaponBox } from "../entities/items/WeaponBox";

const dropTable = [
  [() => new Nuke(itemData.nuke), 5],
  [() => new Life(itemData.life), 10],
  [() => new Shards(itemData.shards), 20],
  [() => new SentryBox(itemData.sentry), 20],
  [() => new Shield(itemData.shield), 30],
  [() => new Adrenaline(itemData.fury), 60],
  [() => new WeaponBox(itemData.weapon), 100],
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
