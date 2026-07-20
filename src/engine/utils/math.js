export const TAU = Math.PI * 2;

export const clamp = (min, value, max) => Math.max(min, Math.min(value, max));

export const randomNumber = (max, min = 0) => Math.random() * (max - min) + min;

export const randomInt = (max, min = 0) => Math.floor(randomNumber(max, min));

export const between = (first, second) =>
  Math.random() > 0.5 ? first : second;
