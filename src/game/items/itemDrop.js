import { itemData } from "@/data/itemData";
import { Item } from "../entities/collectibles/Item";

const dropTable = [
  [(events) => new Item(itemData.nuke, events), 5],
  [(events) => new Item(itemData.life, events), 10],
  [(events) => new Item(itemData.shards, events), 20],
  [(events) => new Item(itemData.sentry, events), 20],
  [(events) => new Item(itemData.shield, events), 30],
  [(events) => new Item(itemData.fury, events), 60],
  [(events) => new Item(itemData.weapon, events), 100],
];

export const dropRandomItem = (chance = 0.1, events) => {
  if (Math.random() > chance) return;

  const totalChance = dropTable.reduce((sum, dropSet) => sum + dropSet[1], 0);
  const randChance = Math.floor(totalChance * Math.random());

  for (let i = 0, currChance = 0; i < dropTable.length; i++) {
    currChance += dropTable[i][1];

    if (currChance >= randChance) {
      return dropTable[i][0](events);
    }
  }
};
