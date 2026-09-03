import * as Colors from "@/game/constants/colors";

const sharedData = {
  radius: 10,
  despawnTime: 8000,
};

export const itemData = {
  fury: {
    color: Colors.ORANGE_RED,
    label: "charge",
    ...sharedData,
  },
  life: {
    color: Colors.CRIMSON,
    label: "life",
    ...sharedData,
  },
  nuke: {
    color: Colors.YELLOW,
    label: "nuke",
    ...sharedData,
  },
  sentry: {
    color: Colors.ROYAL_BLUE,
    label: "sentry",
    ...sharedData,
  },
  shards: {
    color: Colors.WHITE,
    label: "shards",
    ...sharedData,
  },
  shield: {
    color: Colors.ENERGETIC_BLUE,
    label: "shield",
    ...sharedData,
  },
  weapon: {
    color: Colors.CHARTREUSE,
    label: "gun",
    ...sharedData,
  },
};
