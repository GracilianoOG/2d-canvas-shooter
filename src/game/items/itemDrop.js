import { Adrenaline } from "../entities/items/Adrenaline";
import { Life } from "../entities/items/Life";
import { SentryBox } from "../entities/items/SentryBox";
import { Shield } from "../entities/items/Shield";
import { WeaponBox } from "../entities/items/WeaponBox";

export const dropRandomItem = (x, y, chance = 0.1) => {
  if (Math.random() > chance) return;

  const chances = [10, 20, 30, 60, 100];
  const items = [
    () => new Life(x, y),
    () => new SentryBox(x, y),
    () => new Shield(x, y),
    () => new Adrenaline(x, y),
    () => new WeaponBox(x, y),
  ];
  const totalChance = chances.reduce((sum, acc) => sum + acc, 0);
  const randChance = Math.floor(totalChance * Math.random());

  for (let i = 0, currChance = 0; i < chances.length; i++) {
    currChance += chances[i];

    if (currChance >= randChance) {
      return items[i]();
    }
  }
};
