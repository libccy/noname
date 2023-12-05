import { GameEvent } from "../library/element/game-event";

export interface GlobalHistory {
	cardMove: GameEvent[];
	custom: any[];
	useCard: GameEvent[];
	changeHp: GameEvent[];
	everything: GameEvent[];
}
