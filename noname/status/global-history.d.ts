import { GameEvent } from "../library/element/game-event";

export interface GlobalHistory {
	cardMove: GameEvent[];
	custom: unknown[];
	useCard: GameEvent[];
	changeHp: GameEvent[];
	everything: GameEvent[];
}
