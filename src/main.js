import { Game } from "@/game/core/Game";
import { config } from "./game/config";

const game = new Game(config);
const main = async () => await game.init();
main();
