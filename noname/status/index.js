import { lib } from "../library/index.js"

export class status {
	paused = false
	paused2 = false
	paused3 = false
	over = false
	clicked = false
	auto = false
	/**
	 * @type { GameEventPromise }
	 */
	// @ts-ignore
	event = null
	ai = {}
	lastdragchange = []
	skillaudio = []
	dieClose = []
	dragline = []
	dying = []
	/**
	 * @type { GameHistory[] }
	 */
	globalHistory = [{
		cardMove: [],
		custom: [],
		useCard: [],
		changeHp: [],
		everything: [],
	}]
	cardtag = {
		yingbian_zhuzhan: [],
		yingbian_kongchao: [],
		yingbian_fujia: [],
		yingbian_canqu: [],
		yingbian_force: []
	}
	renku = []
	prehidden_skills = []
	postReconnect = {}
	/**
	 * @type { string | void }
	 */
	extension = undefined
	/**
	 * @type { boolean | void }
	 */
	dragged = undefined
	/**
	 * @type { boolean | void }
	 */
	touchconfirmed = undefined
	/**
	 * @type { boolean | void }
	 */
	connectMode = undefined
};

export let _status = new status();

/**
 * @param { InstanceType<typeof status> } [instance] 
 */
export let setStatus = (instance) => {
	_status = instance || new status();
	if (lib.config.dev) {
		window._status = _status;
	}
};