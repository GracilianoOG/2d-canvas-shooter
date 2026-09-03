import * as Colors from "@/game/constants/colors";

const sharedData = {
  radius: 6,
  speed: 300,
  range: 100,
};

export const orbData = {
  score1: {
    type: "score",
    color: Colors.GOLDEN,
    value: 100,
    ...sharedData,
  },
  score2: {
    type: "score",
    color: Colors.VERY_LIGHT_BLUE,
    value: 50,
    ...sharedData,
  },
  score3: {
    type: "score",
    color: Colors.VERY_LIGHT_PINK,
    value: 25,
    ...sharedData,
  },
  energy: {
    type: "energy",
    text: "ENERGY",
    color: Colors.ORANGE_RED,
    value: 1,
    ...sharedData,
  },
};

export const orbIds = Object.keys(orbData);
