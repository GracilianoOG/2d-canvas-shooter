export class SingleShot {
  create(gun, x, y, angle) {
    gun.ammoType.create(x, y, angle + gun.rollAccuracy());
  }
}
