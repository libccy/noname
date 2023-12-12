
/**
 * **无名杀消息推送库**
 * 
 * 通过`EventTarget`机制，实现消息推送和接收的解耦，
 * 从而使消息接收方无需依赖发布方，发布方也无需考虑接收方
 * 
 * > `lib.announce`不是`actor`模型，若不存在订阅者，则消息发送将无意义
 * 
 * @example
 * // 甲扩展（如《千幻聆音》）在角色皮肤切换后，调用：
 * lib.announce.publish("skinChange", {
 * 	player,
 * 	playerName: "zhangfei",
 * 	originSkin: "image/xxx.jpg",
 * 	currentSkin: "image/yyy.jpg"
 * });
 * 
 * // 乙扩展监听此`skinChange`事件，并修改自己扩展相关界面的图片：
 * const method = lib.announce.subscribe("skinChange", (e) => {
 * 	div.setBackgroundImage(e.currentSkin);
 * });
 * 
 * // 若此时乙扩展不想继续订阅`skinChange`事件，可以通过`unsubscribe`解除订阅
 * lib.announce.unsubscribe("skinChange", method);
 */
export const announce = {
	_announce: document.createElement("Announce"),
	/**
	 * @type {Map<(values: T) => void, Map<string, (event: Event) => void>>}
	 */
	_announce_cache: new Map(),
	/**
	 * 推送任意数据给所有监听了指定事件的订阅者，并返回给定的数据
	 * 
	 * 若不存在订阅指定事件的订阅者，则推送的数据将无意义
	 * 
	 * @template T
	 * @param {string} name - 要推送事件的名称
	 * @param {T} values - 要推送的数据
	 * @returns {T}
	 */
	publish(name, values) {
		if (this._announce) this._announce.dispatchEvent(new CustomEvent(name, {
			detail: values
		}));
		return values;
	},
	/**
	 * 订阅给定名字的事件，并返回给定的函数
	 * 
	 * 在事件触发时执行给定的函数
	 * 
	 * 给定的函数将被存储至当前实例中，用于取消订阅时获取
	 * 
	 * @template T
	 * @param {string} name - 要订阅事件的名称
	 * @param {(values: T) => void} method - 事件触发时执行的函数
	 * @returns {(values: T) => void}
	 */
	subscribe(name, method) {
		if (this._announce && this._announce_cache) {
			let subscribeFunction;
			if (this._announce_cache.has(method)) {
				let records = this._announce_cache.get(method);
				subscribeFunction = records.get("Listener");
				records.get("EventTargets").add(name);
			}
			else {
				subscribeFunction = event => method(event.detail);
				let records = new Map();
				records.set("Listener", subscribeFunction);
				records.set("EventTargets", [name]);
				this._announce_cache.set(method, records);
			}
			this._announce.addEventListener(name, subscribeFunction);
		}
		return method;
	},
	/**
	 * 取消指定事件某一函数的订阅，并返回该函数
	 * 
	 * 给定的函数将不再于事件触发时执行，其余同事件需触发的函数不受限制
	 * 
	 * @template T
	 * @param {string} name - 要取消订阅事件的名称
	 * @param {(values: T) => void} method - 订阅指定事件的函数
	 * @returns {(values: T) => void}
	 */
	unsubscribe(name, method) {
		if (this._announce && this._announce_cache && this._announce_cache.has(method)) {
			let records = this._announce_cache.get(method);
			const listener = records.get("Listener");
			let eventTargets = records.get("EventTargets");
			eventTargets.remove(name);
			if (eventTargets.length <= 0) this._announce_cache.remove(method);
			this._announce.removeEventListener(name, listener);
		}
		return method;
	}
};
