import { itemData } from "@/data/itemData";
import { Item } from "../entities/items/Item";

const dropTable = [
  [() => new Item(itemData.nuke), 5],
  [() => new Item(itemData.life), 10],
  [() => new Item(itemData.shards), 20],
  [() => new Item(itemData.sentry), 20],
  [() => new Item(itemData.shield), 30],
  [() => new Item(itemData.fury), 60],
  [() => new Item(itemData.weapon), 100],
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
