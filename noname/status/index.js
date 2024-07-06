import { lib } from "../library/index.js";
import PauseManager from "../game/PauseManager.ts";

export class status {
	imchoosing = false;
	clicked = false;
	auto = false;
	/**
	 * @type { GameEvent }
	 */
	get event() {
		//@ts-ignore
		return this.eventStack.at(-1) || this.#waitingEvent;
	}
	set event(event) {
		if (event == void 0) return;
		if (this.eventStack.length === 0) this.#waitingEvent = event;
		//@ts-ignore
		else _status.event.next.push(event);
	}
	/**
	 * @type { GameEvent | null }
	 */
	#waitingEvent;
	/**
	 * @type { GameEvent[] }
	 */
	eventStack = [];
	ai = {};
	lastdragchange = [];
	/**
	 * @type { string[] }
	 */
	skillaudio = []
	dieClose = [];
	dragline = [];
	dying = [];
	/**
	 * @type { GameHistory[] }
	 */
	globalHistory = [
		{
			cardMove: [],
			custom: [],
			useCard: [],
			changeHp: [],
			everything: [],
		},
	];
	cardtag = {
		yingbian_zhuzhan: [],
		yingbian_kongchao: [],
		yingbian_fujia: [],
		yingbian_canqu: [],
		yingbian_force: [],
	};
	renku = [];
	prehidden_skills = [];
	postReconnect = {};
	/**
	 * @type { string | undefined }
	 */
	extension = undefined;
	/**
	 * @type { boolean | undefined }
	 */
	dragged = undefined;
	/**
	 * @type { boolean | undefined }
	 */
	touchconfirmed = undefined;
	connectMode = false;
	/**
	 * @type { boolean | undefined }
	 */
	video = undefined
	/**
	 * @type { boolean | undefined }
	 */
	importingExtension = undefined;
	/**
	 * @type { Promise<any>[] | undefined }
	 */
	extensionLoaded = undefined;
	/**
	 * @type { Promise<any>[] | undefined }
	 */
	extensionLoading = undefined;
	/**
	 * @type { { [key: string]: Promise<any>[] } | undefined }
	 */
	importing = undefined;
	/**
	 * @type { Function | boolean | undefined }
	 */
	new_tutorial = undefined;
	/**
	 * @type { Player | undefined }
	 */
	roundStart = undefined;
	/**
	 * @type { boolean }
	 */
	roundSkipped;

	pauseManager = new PauseManager();
	get paused() {
		return this.pauseManager.pause.isStarted;
	}
	set paused(bool) {
		if (bool) this.pauseManager.pause.start();
		else this.pauseManager.pause.resolve();
	}
	get paused2() {
		return this.pauseManager.pause2.isStarted;
	}
	set paused2(bool) {
		if (bool) this.pauseManager.pause2.start();
		else this.pauseManager.pause2.resolve();
	}
	get paused3() {
		return this.pauseManager.pause3.isStarted;
	}
	set paused3(bool) {
		if (bool) this.pauseManager.pause3.start();
		else this.pauseManager.pause3.resolve();
	}
	get over() {
		return this.pauseManager.over.isStarted;
	}
	set over(bool) {
		if (bool) this.pauseManager.over.start();
		else this.pauseManager.over.resolve();
	}
}

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
