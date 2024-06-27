import { get } from "../../get/index.js";
import { game } from "../../game/index.js";
import { lib } from "../index.js";
import { _status } from "../../status/index.js";
import { AsyncFunction } from "../../util/index.js";
import security from '../../util/security.js';

/**
 * 将事件Promise化以使用async异步函数来执行事件。
 *
 * 事件Promise化后，需要既能使用await等待事件完成，
 * 又需要在执行之前对事件进行配置。
 *
 * 所以这个类的实例集成了事件和Promise二者的所有属性，
 * 且Promise的原有属性无法被修改，一切对这个类实例的属性修改，删除，
 * 再配置等操作都会转发到事件对应的属性中。
 *
 * @extends {Promise<GameEvent>}
 *
 * @example
 * 使用await xx()等待异步事件执行：
 * ```js
 * await game.xxx().setContent('yyy').set(zzz, 'i');
 * ```
 * 使用await player.xxx()等待异步事件执行：
 * ```js
 * await player.draw(2);
 * game.log('等待', player, '摸牌完成执行log');
 * ```
 */
export class GameEventPromise extends Promise {
	// 我谢谢你，这里是必须有的
	// 否则Promise的方法对其子类无效
	static get [Symbol.species]() {
		return Promise;
	}
	#event;
	/**
	 * @param { GameEvent } arg
	 */
	constructor(arg) {
		if (arg instanceof GameEventPromise) throw new Error("GameEventPromise cannot copy.");
		const event = arg;
		super((resolve) => {
			// 设置为异步事件
			event.async = true;
			// 事件结束后触发resolve
			event.resolve = resolve;
			if (!_status.event) return;
			// game.createEvent的时候还没立即push到next里
			Promise.resolve().then(() => {
				game.executingAsyncEventMap.set(
					_status.event.toEvent(),
					(game.executingAsyncEventMap.get(_status.event.toEvent()) || Promise.resolve()).then(
						() => {
							let eventPromise = _status.event.next.find((e) => e.toEvent() == event);
							// 如果父级事件也是一个异步的话，那应该立即执行这个事件的
							// 如果在AsyncFunction执行过程中在别的位置新建了一个异步事件，那也直接（等会set配置完）执行
							if (
								eventPromise &&
								(_status.event.content instanceof AsyncFunction ||
									Array.isArray(_status.event.contents))
							) {
								// 异步执行game.loop
								// 不直接game.loop(event)是因为需要让别人可以手动set()和setContent()
								// 再执行game.loop是因为原有的game.loop被await卡住了，
								// 得新执行一个只执行这个异步事件的game.loop
								_status.event.next.remove(eventPromise);
								
								/**
								 * @param { import("noname-typings/nonameModules/noname/library/index.js").GameEventPromise } event 
								 */
								const check = event => {
									if (event.player) {
										const { player } = event;
										if (player.skipList.includes(event.name)) {
											_status.event.trigger(event.name + "Skipped");
											player.skipList.remove(event.name);
											if (lib.phaseName.includes(event.name))
												player.getHistory("skipped").add(event.name);
											_status.event.next.remove(event);
											event.finish();
											resolve(event.toEvent());
										} else if (player.classList.contains("dead") && !event.forceDie && event.name != "phaseLoop") {
											game.broadcastAll(function () {
												while (_status.dieClose.length) {
													_status.dieClose.shift().close();
												}
											});
											if (event._oncancel) event._oncancel();
											event.finish();
											resolve(event.toEvent());
										} else if (player.removed && event.name != "phaseLoop") {
											event.finish();
											resolve(event.toEvent());
										} else if (player.isOut() && event.name != "phaseLoop" && !event.includeOut) {
											if (event.name == "phase" && player == _status.roundStart && !event.skill) {
												_status.roundSkipped = true;
											}
											event.finish();
											resolve(event.toEvent());
										}
									}
								};

								check(eventPromise)
								if (eventPromise.finished) {
									return eventPromise;
								}

								const oldEvent = _status.event;
								// 处理eventNeutralized反复横跳
								if (!oldEvent.finished) {
									if (_status.event != eventPromise) {
										eventPromise.parent = _status.event;
										_status.event = eventPromise;
										game.getGlobalHistory("everything").push(eventPromise);
									}
									return game.loop(eventPromise).then(() => {
										// 有时候event.finished还是false
										return eventPromise;
									}).then(event => {
										check(event.toPromise());
										return event.toPromise();
									}); 
								}
								else {
									// event.neutralize()执行后只允许带有eventNeutralized的arrangeTrigger执行
									if (eventPromise.name == "arrangeTrigger" &&
										eventPromise.triggername == "eventNeutralized") {
										if (_status.event != eventPromise) {
											eventPromise.parent = _status.event;
											_status.event = eventPromise;
											game.getGlobalHistory("everything").push(eventPromise);
										}
										return game.loop(eventPromise).then(() => {
											// 有时候event.finished还是false
											return eventPromise;
										}).then(event => {
											// 如果它终于不给我跳了就给老子停
											if (oldEvent.finished === true && typeof oldEvent.resolveContent == 'function') {
												oldEvent.resolveContent();
											}
											return event.toPromise();
										});
									}
									// 否则以其他形式使finished为true的时候停止oldEvent
									else {
										console.log(`不继续执行event(${eventPromise.name})`, eventPromise.toEvent());
										// 给老子停
										if (oldEvent.finished === true && typeof oldEvent.resolveContent == 'function') {
											oldEvent.resolveContent();
											console.log(`事件结束(${oldEvent.name})`, oldEvent.toEvent());
										}
										else {
											if (oldEvent.finished === true) {
												console.log(`事件未结束(${oldEvent.name})`, oldEvent.toEvent());
											}
											if (typeof oldEvent.resolveContent != 'function') {
												console.log(`事件未结束, event.resolveContent不是一个函数`, oldEvent.toEvent());
											}
										}
									}
								}
							}
						}
					)
				);
			});
		});
		this.#event = event;
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
				return eventValue == event ? receiver : eventValue;
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
			ownKeys(target) {
				return Reflect.ownKeys(event);
			},
			getOwnPropertyDescriptor(target, prop) {
				return Reflect.getOwnPropertyDescriptor(event, prop);
			},
		});
	}
	/** 获取原事件对象 */
	toEvent() {
		return this.#event;
	}
	/**
	 * 在某个异步事件中调试变量信息
	 *
	 * 注: 在调试步骤中`定义的变量只在当前输入的语句有效`
	 *
	 * @example
	 * 在技能中调试技能content相关的信息
	 * ```js
	 * await event.debugger();
	 * ```
	 * 在技能中调试触发此技能事件的相关的信息
	 * ```js
	 * await trigger.debugger();
	 * ```
	 */
	async debugger() {
		if (security.isSandboxRequired()) throw new Error("当前模式下禁止调试");
		return new Promise((resolve) => {
			const runCode = function (event, code) {
				try {
					// 为了使玩家调试时使用var player=xxx时不报错，故使用var
					// var { player, _trigger: trigger, _result: result } = event;
					var context = { 
						event,
						player: event.player,
						_trigger: event.trigger,
						_result: event.result,
					};
					return security.exec(`return ${code}`, context);
				} catch (error) {
					return error;
				}
			}.bind(window);
			const inputCallback = (inputResult) => {
				if (inputResult === false) {
					resolve(null);
				} else {
					const obj = runCode(this.toEvent(), inputResult);
					alert(!obj || obj instanceof Error ? String(obj) : get.stringify(obj));
					game.promises.prompt("debugger调试").then(inputCallback);
				}
			};
			game.promises.prompt("debugger调试").then(inputCallback);
		});
	}

	/**
	 * 获取 Result 对象中的信息。
	 * @example 
	 * ```js
	// 示例 1：
	const chooseCardResult = await player.chooseCard().forResult();
	// 获取整个结果对象，然后访问如 chooseCardResult.cards 等属性
	
	// 示例 2：
	const cards = await player.chooseCard().forResult('cards');
	// 获取结果对象中 'cards' 属性的值
	
	// 示例 3：
	const [success, cards, targets] = await player.chooseCardTarget().forResult('bool', 'cards', 'targets');
	// 获取结果对象中多个属性的值
	// - success 表示是否成功
	// - cards 表示选择的卡片
	// - targets 表示选择的目标
	```
	 * @template {keyof Result} T
	 * @overload
	 * @returns {Promise<Result>}
	 * 
	 * @overload
	 * @param {T} param0
	 * @returns {Promise<Exclude<Result[T], undefined>>}
	 * 
	 * @overload
	 * @param { T[] } params
	 * @returns { Promise<Exclude<Result[T], undefined>[]> }
	 */
	forResult(...params) {
		if (params.length == 0) {
			return this.then(({ result }) => result);
		} else if (params.length == 1) {
			return this.then((event) => event.result[params[0]]);
		} else {
			return this.then((event) => Array.from(params).map((key) => event.result[key]));
		}
	}
	/**
	 * 返回result中的bool项
	 */
	forResultBool() {
		return this.forResult("bool");
	}

	/**
	 * 返回result中的targets项。
	 */
	forResultTargets() {
		return this.forResult("targets");
	}

	/**
	 * 返回result中的cards项
	 */
	forResultCards() {
		return this.forResult("cards");
	}

	/**
	 * 返回result中的card项
	 *
	 * @returns {Promise<VCard>|Promise<Card>} 返回的card项。
	 *
	 */
	forResultCard() {
		return this.forResult("card");
	}

	/**
	 * 返回result中的control项。
	 */
	forResultControl() {
		return this.forResult("control");
	}

	/**
	 * 返回result中的links项。
	 */
	forResultLinks() {
		return this.forResult("links");
	}
}
