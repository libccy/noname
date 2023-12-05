import { Library as lib } from "../noname.js";
import { aiStatus } from "./status/ai.js";
import { cardTag } from "./status/card-tag.js";
import { postReconnect } from "./status/post-reconnect.js";

export const status = {
	paused: false,
	paused2: false,
	paused3: false,
	over: false,
	clicked: false,
	auto: false,
	event: lib.element.GameEvent.initialGameEvent(),
	ai: aiStatus,
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
	postReconnect: postReconnect
}
