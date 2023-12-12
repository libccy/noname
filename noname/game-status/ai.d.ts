import { Player } from "../library/element/player.js";

interface AI extends Record<string, any> {
	customAttitude: ((from: Player, to: Player) => number)[];
}

export const ai: AI;
