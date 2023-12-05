import { Player } from "./element/player";

interface DynamicTranslate extends Record<string, (player: Player) => string> { }

export const dynamicTranslate: DynamicTranslate;
