export const weaponData = {
  bazooka: {
    name: "Bazooka",
    ammoType: "rocket",
    patternType: "single",
    options: {
      cooldown: 300,
    },
  },
  broom: {
    name: "Broom",
    ammoType: "grenade",
    patternType: "multi",
    options: {
      bullets: 3,
      cooldown: 350,
      propagation: 0.3,
      spread: 0.2,
    },
  },
  bouncy: {
    name: "Bouncy Shotgun",
    ammoType: "bouncy",
    patternType: "multi",
    options: {
      bullets: 3,
      cooldown: 200,
      propagation: 0.2,
      spread: 0.3,
    },
  },
  cannon: {
    name: "Cannon",
    ammoType: "cannon",
    patternType: "single",
    options: {
      cooldown: 250,
    },
  },
  hell: {
    name: "Bullet Hell",
    ammoType: "common",
    patternType: "explosive",
    options: {
      bullets: 20,
      cooldown: 150,
    },
  },
  launcher: {
    name: "Grenade Launcher",
    ammoType: "grenade",
    patternType: "single",
    options: {
      cooldown: 220,
    },
  },
  minigun: {
    name: "Minigun",
    ammoType: "heavy",
    patternType: "single",
    options: {
      cooldown: 100,
      spread: 0.1,
    },
  },
  mine: {
    name: "Mine Launcher",
    ammoType: "mine",
    patternType: "single",
    options: {
      cooldown: 280,
    },
  },
  nuke: {
    name: "BFG",
    ammoType: "nuke",
    patternType: "single",
    options: {
      cooldown: 380,
    },
  },
  pistol: {
    name: "Pistol",
    ammoType: "common",
    patternType: "single",
    options: {
      cooldown: 150,
    },
  },
  rifle: {
    name: "Rifle",
    ammoType: "pierce",
    patternType: "single",
    options: {
      cooldown: 200,
    },
  },
  ricochet: {
    name: "Ricochet Pistol",
    ammoType: "bouncy",
    patternType: "single",
    options: {
      cooldown: 140,
    },
  },
  super: {
    name: "Super Shotgun",
    ammoType: "heavy",
    patternType: "multi",
    options: {
      bullets: 2,
      cooldown: 220,
      propagation: 0.2,
      spread: 0.02,
    },
  },
  shotgun: {
    name: "Shotgun",
    ammoType: "common",
    patternType: "multi",
    options: {
      bullets: 3,
      cooldown: 200,
      propagation: 0.2,
      spread: 0.08,
    },
  },
  smg: {
    name: "SMG",
    ammoType: "common",
    patternType: "single",
    options: {
      cooldown: 110,
      spread: 0.05,
    },
  },
  sonar: {
    name: "Sonar",
    ammoType: "common",
    patternType: "multi",
    options: {
      bullets: 8,
      cooldown: 300,
      propagation: 0.1,
      spread: 0,
    },
  },
  that: {
    name: "That Shotgun",
    ammoType: "common",
    patternType: "multi",
    options: {
      bullets: 13,
      cooldown: 500,
      propagation: 0.1,
      spread: 0.75,
    },
  },
};
