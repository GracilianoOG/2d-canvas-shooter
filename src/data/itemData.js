import * as Colors from "@/game/constants/colors";

const sharedData = {
  radius: 10,
  despawnTime: 8000,
};

export const itemData = {
  fury: {
    color: Colors.ORANGE_RED,
    event: "fury",
    label: "charge",
    ...sharedData,
  },
  life: {
    color: Colors.CRIMSON,
    event: "life",
    label: "life",
    ...sharedData,
  },
  nuke: {
    color: Colors.YELLOW,
    event: "nuke",
    label: "nuke",
    ...sharedData,
  },
  sentry: {
    color: Colors.ROYAL_BLUE,
    event: "sentry",
    label: "sentry",
    ...sharedData,
  },
  shards: {
    color: Colors.WHITE,
    event: "shards",
    label: "shards",
    ...sharedData,
  },
  shield: {
    color: Colors.ENERGETIC_BLUE,
    event: "shield",
    label: "shield",
    ...sharedData,
  },
  weapon: {
    color: Colors.CHARTREUSE,
    event: "gun",
    label: "gun",
    ...sharedData,
  },
};
