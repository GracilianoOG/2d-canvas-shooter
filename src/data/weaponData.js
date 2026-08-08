import { AmmoFactory } from "@/game/arsenal/ammo/AmmoFactory";

export const weaponData = {
  bazooka: {
    name: "Bazooka",
    ammoType: AmmoFactory.request("rocket"),
    options: {
      cooldown: 300,
    },
  },
  broom: {
    name: "Broom",
    ammoType: AmmoFactory.request("grenade"),
    options: {
      bullets: 3,
      cooldown: 350,
      propagation: 0.3,
      spread: 0.2,
    },
  },
  bouncy: {
    name: "Bouncy Shotgun",
    ammoType: AmmoFactory.request("bouncy"),
    options: {
      bullets: 3,
      cooldown: 200,
      propagation: 0.2,
      spread: 0.3,
    },
  },
  cannon: {
    name: "Cannon",
    ammoType: AmmoFactory.request("cannon"),
    options: {
      cooldown: 250,
    },
  },
  hell: {
    name: "Bullet Hell",
    ammoType: AmmoFactory.request("common"),
    options: {
      bullets: 20,
      cooldown: 150,
    },
  },
  launcher: {
    name: "Grenade Launcher",
    ammoType: AmmoFactory.request("grenade"),
    options: {
      cooldown: 220,
    },
  },
  minigun: {
    name: "Minigun",
    ammoType: AmmoFactory.request("heavy"),
    options: {
      cooldown: 100,
      spread: 0.1,
    },
  },
  mine: {
    name: "Mine Launcher",
    ammoType: AmmoFactory.request("mine"),
    options: {
      cooldown: 280,
    },
  },
  nuke: {
    name: "BFG",
    ammoType: AmmoFactory.request("nuke"),
    options: {
      cooldown: 380,
    },
  },
  pistol: {
    name: "Pistol",
    ammoType: AmmoFactory.request("common"),
    options: {
      cooldown: 150,
    },
  },
  rifle: {
    name: "Rifle",
    ammoType: AmmoFactory.request("pierce"),
    options: {
      cooldown: 200,
    },
  },
  ricochet: {
    name: "Ricochet Pistol",
    ammoType: AmmoFactory.request("bouncy"),
    options: {
      cooldown: 140,
    },
  },
  super: {
    name: "Super Shotgun",
    ammoType: AmmoFactory.request("heavy"),
    options: {
      bullets: 2,
      cooldown: 220,
      propagation: 0.2,
      spread: 0.02,
    },
  },
  shotgun: {
    name: "Shotgun",
    ammoType: AmmoFactory.request("common"),
    options: {
      bullets: 3,
      cooldown: 200,
      propagation: 0.2,
      spread: 0.08,
    },
  },
  smg: {
    name: "SMG",
    ammoType: AmmoFactory.request("common"),
    options: {
      cooldown: 110,
      spread: 0.05,
    },
  },
  sonar: {
    name: "Sonar",
    ammoType: AmmoFactory.request("common"),
    options: {
      bullets: 8,
      cooldown: 300,
      propagation: 0.1,
      spread: 0,
    },
  },
  that: {
    name: "That Shotgun",
    ammoType: AmmoFactory.request("common"),
    options: {
      bullets: 13,
      cooldown: 500,
      propagation: 0.1,
      spread: 0.75,
    },
  },
};
