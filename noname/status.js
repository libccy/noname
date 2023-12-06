import { GameEvent } from "./library/element/game-event.js";
import { ai } from "./status/ai.js";
import { cardTag } from "./status/card-tag.js";
import { postReconnect } from "./status/post-reconnect.js";

export const status = {
	paused: false,
	paused2: false,
	paused3: false,
	over: false,
	clicked: false,
	auto: false,
	event: GameEvent.initialGameEvent(),
	ai,
	lastdragchange: [],
	skillaudio: [],
	dieClose: [],
	dragline: [],
	dying: [],
	/**
	 * @type {import("./status/global-history.js").GlobalHistory[]}
	 */
	globalHistory: [{
		cardMove: [],
		custom: [],
		useCard: [],
		changeHp: [],
		everything: []
	}],
	cardtag: cardTag,
	renku: [],
	prehidden_skills: [],
	postReconnect
}
