export class GameEventPromise extends Promise {
	// 我谢谢你，这里是必须有的
	// 否则Promise的方法对其子类无效
	static get [Symbol.species]() {
		return Promise;
	}
	/**
	 * @param { GameEvent } event 
	 * @returns { Promise<GameEvent> & GameEvent }
	 */
	constructor(event) {
		super(resolve => {
			// 设置为异步事件
			event.async = true;
			// 事件结束后触发resolve
			event.resolve = resolve;
			// 如果父级事件也是一个异步的话，那应该立即执行这个事件的
			// 如果在AsyncFunction执行过程中在别的位置新建了一个异步事件，那也直接（等会set配置完）执行
			if (_status.event.next.includes(event) && _status.event.content instanceof AsyncFunction) {
				if (_status.event != event) {
					event.parent = _status.event;
					_status.event = event;
					game.getGlobalHistory("everything").push(event);
				}
				// 异步执行game.loop
				// 不直接game.loop(event)是因为需要让别人可以手动set()和setContent()
				// 再执行game.loop是因为原有的game.loop被await卡住了，
				// 得新执行一个只执行这个异步事件的game.loop
				Promise.resolve().then(() => game.loop(event));
			}
		});
		return new Proxy(this, {
			get(target, prop, receiver) {
				const thisValue = Reflect.get(target, prop);
				if (thisValue) {
					if (typeof thisValue == "function") {
						return thisValue.bind(target);
					}
					return thisValue;
				}
				const eventValue = Reflect.get(event, prop);
				// 返回值如果是event，则修改为GameEventPromise类实例
				if (typeof eventValue == "function") return (function (...args) {
					const returnValue = eventValue.call(event, ...args);
					return returnValue == event ? receiver : returnValue;
				}).bind(event);
				return eventValue;
			},
			set(target, prop, newValue) {
				return Reflect.set(event, prop, newValue);
			},
			deleteProperty(target, prop) {
				return Reflect.deleteProperty(event, prop);
			},
			defineProperty(target, prop, attributes) {
				return Reflect.defineProperty(event, prop, attributes);
			},
			has(target, prop) {
				return Reflect.has(event, prop);
			},
			ownKeys(target, prop) {
				return Reflect.ownKeys(event, prop);
			},
		});
	}
	/**
	 * TODO: 实现debugger
	 */
	async debugger() {
		return new Promise(resolve => {
			resolve(null);
		});
	}
}
