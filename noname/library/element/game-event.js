import { Get as get } from "../../../noname.js";

export class GameEvent {
	/**
	 * @param {string} [name]
	 * @param {false} [trigger]
	 */
	constructor(name, trigger) {
		if (typeof name == 'string') {
			this.name = name;
			const gameEvent = get.event();

			if (gameEvent) {
				const type = `onNext${name[0].toUpperCase()}${name.slice(1)}`;
				if (gameEvent.hasHandler(type)) this.pushHandler(...gameEvent.getHandler(type));
			}

			game.globalEventHandlers.addHandlerToEvent(this);
		}

		this.step = 0;
		this.finished = false;
		/**
		 * @type {GameEvent[]}
		 */
		this.next = [];
		/**
		 * @type {GameEvent[]}
		 */
		this.after = [];
		this.custom = {
			add: {},
			replace: {}
		};
		this._aiexclude = [];
		this._notrigger = [];
		this._result = {};
		this._set = [];
		if (trigger !== false && !game.online) this._triggered = 0;
	}

	static initialGameEvent() {
		return (new this).finish();
	}

	finish() {
		this.finished = true;
		return this;
	}
}
