export const status = {
	paused: false,
	paused2: false,
	paused3: false,
	over: false,
	clicked: false,
	auto: false,
	/**
	 * @type {import('../library/index.js').GameEventPromise & import('../library/index.js').GameEvent}
	 */
	// @ts-ignore
	event: null,
	ai: {},
	lastdragchange: [],
	skillaudio: [],
	dieClose: [],
	dragline: [],
	dying: [],
	globalHistory: [{
		cardMove: [],
		custom: [],
		useCard: [],
		changeHp: [],
		everything: [],
	}],
	cardtag: {
		yingbian_zhuzhan: [],
		yingbian_kongchao: [],
		yingbian_fujia: [],
		yingbian_canqu: [],
		yingbian_force: []
	},
	renku: [],
	prehidden_skills: [],
	postReconnect: {},
};

export const _status = status;