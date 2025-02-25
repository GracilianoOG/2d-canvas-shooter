export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const minOrMaxPoint = (minPoint, maxPoint) =>
  Math.random() > 0.5 ? minPoint : maxPoint;

export const randomLinePoint = lineWidth =>
  Math.floor(Math.random() * lineWidth);
