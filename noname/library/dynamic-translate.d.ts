import { Player } from "./element/player.js";

interface DynamicTranslate extends Record<string, (player: Player) => string> {
}

export const dynamicTranslate: DynamicTranslate;
