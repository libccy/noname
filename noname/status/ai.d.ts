import { Player } from "../library/element/player";

interface AIStatus extends Record<string, any> {
	customAttitude: ((from: Player, to: Player) => number)[];
}

export const aiStatus: AIStatus;
