export class MultiShot {
  create(gun, x, y, angle) {
    const propagation = gun.options.propagation;
    const amount = gun.options.bullets;
    let nextCurve = -propagation * Math.floor(amount / 2);

    nextCurve += amount % 2 === 0 ? propagation / 2 : 0;

    for (let i = 0; i < amount; i++) {
      gun.ammoType.create(x, y, angle + nextCurve + gun.rollAccuracy());
      nextCurve += propagation;
    }
  }
}
