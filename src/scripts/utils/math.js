export const TAU = Math.PI * 2;

export const clamp = (min, value, max) => {
  if (value > max) {
    return max;
  } else if (value < min) {
    return min;
  } else {
    return value;
  }
};

export const randomNumber = (max, min = 0) => Math.random() * (max - min) + min;

export const randomInt = (max, min = 0) => Math.floor(randomNumber(max, min));
