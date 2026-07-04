import { Adrenaline } from "./Adrenaline";
import { Life } from "./Life";
import { Shield } from "./Shield";
import { WeaponBox } from "./WeaponBox";

export const dropRandomItem = (x, y, chance = 0.08) => {
  if (Math.random() > chance) return;

  const chances = [10, 30, 60, 100];
  const items = [
    () => new Life(x, y),
    () => new Shield(x, y),
    () => new Adrenaline(x, y),
    () => new WeaponBox(x, y),
  ];
  const totalChance = chances.reduce((sum, acc) => sum + acc, 0);
  const randChance = Math.floor(totalChance * Math.random());

  for (let i = 0, currChance = 0; i < chances.length; i++) {
    currChance += chances[i];

    if (currChance >= randChance) {
      items[i]();
      return;
    }
  }
};
