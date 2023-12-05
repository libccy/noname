import { Library as lib, status as _status } from "../noname.js";

export class Get {
	/**
	 * @template T
	 * @overload
	 * @param {T} key
	 * @returns {typeof _status.event[T]}
	 */
	/**
	 * @overload
	 * @returns {typeof _status.event}
	 */
	static event(key) {
		return key ? _status.event[key] : _status.event;
	}
}
