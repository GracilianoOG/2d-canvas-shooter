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
