import { Gun } from "./Gun";

class Shotgun extends Gun {
  createProjectile(x, y, angle) {
    const propagation = this.options.propagation;
    const amount = this.options.bullets;
    let nextCurve = -propagation * Math.floor(amount / 2);

    nextCurve += amount % 2 === 0 ? propagation / 2 : 0;

    for (let i = 0; i < amount; i++) {
      this.ammoType.create(x, y, angle + nextCurve + this.rollAccuracy());
      nextCurve += propagation;
    }
  }
}

export { Shotgun };
