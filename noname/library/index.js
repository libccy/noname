/**
 * @typedef { InstanceType<typeof lib.element.Player> } Player
 * @typedef { InstanceType<typeof lib.element.Card> } Card
 * @typedef { InstanceType<typeof lib.element.VCard> } VCard
 * @typedef { InstanceType<typeof lib.element.Button> } Button
 * @typedef { InstanceType<typeof lib.element.Dialog> } Dialog
 * @typedef { InstanceType<typeof lib.element.GameEvent> } GameEvent
 * @typedef { InstanceType<typeof lib.element.GameEvent> & InstanceType<typeof lib.element.GameEventPromise> & typeof Promise<typeof lib.element.GameEvent> } GameEventPromise
 * @typedef { InstanceType<typeof lib.element.NodeWS> } NodeWS
 * @typedef { 'male' | 'female' | 'dobule' | 'none' } Sex
 * @typedef { [Sex, string, number | string, string[], any[]] } Character
*/
import { nonameInitialized, assetURL, userAgent, Uninstantable, GeneratorFunction, AsyncFunction } from "../util/index.js";
import { AI as ai } from '../ai/index.js';
import { Get as get } from '../get/index.js';
import { Game as game } from '../game/index.js';
import { status as _status } from '../status/index.js';
import { UI as ui } from '../ui/index.js';
import { GNC as gnc } from '../gnc/index.js';

import { LibInit } from "./init/index.js";
import { Announce } from "./announce/index.js";
import Content from "./element/content.js";
import Contents from "./element/contents.js";

export class Library extends Uninstantable {
	static configprefix = 'noname_0.9_';
	static versionOL = 27;
	static updateURLS = {
		coding: 'https://gitcode.net/sinat_33405273/noname/-/raw/',
		github: 'https://raw.githubusercontent.com/libccy/noname',
	};
	static updateURL = 'https://raw.githubusercontent.com/libccy/noname';
	static mirrorURL = 'https://gitcode.net/sinat_33405273/noname/-/raw/';
	static hallURL = '47.99.105.222';
	static assetURL = assetURL;
	static userAgent = userAgent;
	static compatibleEdition = Boolean(typeof nonameInitialized == 'string' && nonameInitialized.match(/\/(?:com\.widget|yuri\.nakamura)\.noname\//));
	static changeLog = [];
	static updates = [];
	static canvasUpdates = [];
	/**
	 * @type { import('../game/index.js').Video[] }
	 */
	static video = [];
	static skilllist = [];
	static connectBanned = [];
	static characterIntro = {};
	static characterTitle = {};
	static characterPack = {};
	static characterFilter = {};
	static characterSort = {};
	static characterReplace = {};
	static characterGuozhanFilter = ["mode_guozhan"];
	static dynamicTranslate = {};
	static cardPack = {};
	static skin = {};
	static onresize = [];
	static onphase = [];
	static onwash = [];
	static onover = [];
	static ondb = [];
	static ondb2 = [];
	static chatHistory = [];
	static emotionList = {
		xiaowu_emotion: 14,
		xiaokuo_emotion: 8,
		shibing_emotion: 15,
		guojia_emotion: 20,
		zhenji_emotion: 20,
		xiaosha_emotion: 20,
		xiaotao_emotion: 20,
		xiaojiu_emotion: 20,
	};
	static animate = {
		skill: {},
		card: {},
	};
	static onload = [];
	static onload2 = [];
	static onprepare = [];
	static arenaReady = [];
	static onfree = [];
	static inpile = [];
	static inpile_nature = [];
	static extensions = [];
	static extensionPack = {};
	static cardType = {};
	static hook = { globalskill: {} };
	/**
	* @returns {never}
	*/
	static typeAnnotation() {
		/**
		 * @type { import('../game/index.js').Videos[] }
		 */
		// @ts-ignore
		this.videos;
		throw new Error('Do not call this method');
	}
	//函数钩子
	static hooks = {
		// 本体势力的颜色
		addGroup: [(id, _short, _name, config) => {
			if ("color" in config && config.color != null) {
				let color1, color2, color3, color4;
				if (typeof config.color == "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.color)) {
					let c1 = parseInt(`0x${config.color.slice(1, 3)}`);
					let c2 = parseInt(`0x${config.color.slice(3, 5)}`);
					let c3 = parseInt(`0x${config.color.slice(5, 7)}`);
					color1 = color2 = color3 = color4 = [c1, c2, c3, 1];
				}
				else if (Array.isArray(config.color) && config.color.length == 4) {
					if (config.color.every(item => Array.isArray(item))) {
						color1 = config.color[0];
						color2 = config.color[1];
						color3 = config.color[2];
						color4 = config.color[3];
					}
					else color1 = color2 = color3 = color4 = config.color;
				}
				if (color1 && color2 && color3 && color4) {
					const cs = lib.linq.cselector;
					const g1 = cs.group(
						cs.of(
							cs.class("player", "identity"),
							cs.isAttr("data-color", `"${id}"`)
						),
						cs.of(
							"div",
							cs.isAttr("data-nature", `"${id}"`)
						),
						cs.of(
							"span",
							cs.isAttr("data-nature", `"${id}"`)
						)
					);
					const g2 = cs.group(
						cs.of(
							"div",
							cs.isAttr("data-nature", `"${id}m"`)
						),
						cs.of(
							"span",
							cs.isAttr("data-nature", `"${id}m"`)
						)
					);
					const g3 = cs.group(
						cs.of(
							"div",
							cs.isAttr("data-nature", `"${id}mm"`)
						),
						cs.of(
							"span",
							cs.isAttr("data-nature", `"${id}mm"`)
						)
					);
					let result = {};
					result[g1] = {
						textShadow: cs.group(
							"black 0 0 1px",
							`rgba(${color1.join()}) 0 0 2px`,
							`rgba(${color2.join()}) 0 0 5px`,
							`rgba(${color3.join()}) 0 0 10px`,
							`rgba(${color4.join()}) 0 0 10px`
						)
					};
					result[g2] = {
						textShadow: cs.group(
							"black 0 0 1px",
							`rgba(${color1.join()}) 0 0 2px`,
							`rgba(${color2.join()}) 0 0 5px`,
							`rgba(${color3.join()}) 0 0 5px`,
							`rgba(${color4.join()}) 0 0 5px`,
							"black 0 0 1px"
						)
					};
					result[g3] = {
						textShadow: cs.group(
							"black 0 0 1px",
							`rgba(${color1.join()}) 0 0 2px`,
							`rgba(${color2.join()}) 0 0 2px`,
							`rgba(${color3.join()}) 0 0 2px`,
							`rgba(${color4.join()}) 0 0 2px`,
							"black 0 0 1px"
						)
					};
					game.dynamicStyle.addObject(result);
					lib.groupnature[id] = id;
				}
			}
			if (typeof config.image == 'string') Object.defineProperty(lib.card, `group_${id}`, {
				configurable: true,
				enumerable: false,
				writable: true,
				value: {
					fullskin: true,
					image: config.image
				}
			});
		}],
		//增加新属性杀
		addNature: [(nature, _translation, config) => {
			if (typeof config != 'object') config = {};
			let linked = config.linked, order = config.order, background = config.background, lineColor = config.lineColor;
			if (typeof linked != 'boolean') linked = true;
			if (typeof order != 'number') order = 0;
			if (typeof background != 'string') background = '';
			if (!Array.isArray(lineColor) || lineColor.length != 3) lineColor = [];
			else if (background.startsWith('ext:')) {
				background = background.replace(/^ext:/, 'extension/');
			}
			if (linked) lib.linked.add(nature);
			if (lineColor.length) lib.lineColor.set(nature, lineColor);
			lib.nature.set(nature, order);
			if (background.length > 0) lib.natureBg.set(nature, background);
			if (config.audio) {
				for (let key in config.audio) {
					if (!lib.natureAudio[key]) {
						lib.natureAudio[key] = config.audio[key];
					} else {
						for (let key2 in config.audio[key]) {
							lib.natureAudio[key][key2] = config.audio[key][key2];
						}
					}
				}
			}

			let color1, color2;
			if (typeof config.color == "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.color)) {
				let c1 = parseInt(`0x${item[1].slice(1, 3)}`);
				let c2 = parseInt(`0x${item[1].slice(3, 5)}`);
				let c3 = parseInt(`0x${item[1].slice(5, 7)}`);
				color1 = color2 = [c1, c2, c3, 1];
			}
			else if (Array.isArray(config.color) && config.color.length >= 2 && config.color.length <= 4) {
				if (config.color.every(item => Array.isArray(item))) {
					color1 = config.color[0];
					color2 = config.color[1];
				}
				else {
					let color = config.color.slice();
					if (color.length == 3) color.push(1);
					color1 = color2 = color;
				}
			}
			if (color1 && color2) {
				const cs = lib.linq.cselector;
				const g1 = cs.group(
					cs.of(
						cs.class("card", "fullskin", `${nature}`),
						'>',
						cs.class("name")
					)
				);
				let result = {};
				result[g1] = {
					color: `rgba(${color1.join()})`,
					border: cs.merge(
						'1px',
						'solid',
						`rgba(${color2.join()})`
					),
				};
				game.dynamicStyle.addObject(result);

				const g2 = cs.group(
					cs.of(
						cs.class("tempname", `${nature}`),
						':not([data-nature])>',
						cs.class("span")
					)
				);
				let result2 = {};
				result2[g2] = {
					color: `rgba(${color1.join()})`,
				};
				game.dynamicStyle.addObject(result2);
			}
		}],
	};
	/**
	 * **无名杀频道推送机制**
	 * 
	 * 鉴于`Javascript`的特性及自身对所需功能的思考，这是一个参考`Golang`的`channel`设计的、完全和`go channel`不一样的异步消息传递对象
	 * 
	 * 当且仅当接收方和发送方均存在时进行消息传递，完全保证信息传递的单一性（发送方/接收方一旦确定则无法更改）和准确性（发送方必然将消息发送给接收方）
	 * 
	 * 若存在发送方/接收方时调用`send`/`receive`，将报错
	 * 
	 * 若需要异步/不报错发送信息，请等待`lib.actor`
	 * 
	 * @template T
	 * @example
	 * // 创建一个频道
	 * const channel = new lib.channel();
	 * 
	 * // 从某个角落接收channel发出的消息，若无消息则等待
	 * const message = await channel.receive();
	 * 
	 * // 从某个角落向channel发消息，若无消息接收则等待
	 * await channel.send(item);
	 */
	static channel = class {
		/**
		 * @template TValue
		 * @callback PromiseResolve
		 * @param {TValue} value
		 * @returns {void}
		 */
		constructor() {
			/**
			 * @type {"active" | "receiving" | "sending"}
			 */
			this.status = "active";

			/**
			 * @type {PromiseResolve<T> | [T, PromiseResolve<void>] | null}
			 */
			this._buffer = null;
		}

		/**
		 * 向该频道发送消息，在消息未被接受前将等待
		 * 
		 * @param {T} value - 要发送的消息
		 * @returns {Promise<void>}
		 */
		send(value) {
			return new Promise((resolve, reject) => {
				switch (this.status) {
					case "sending":
						// TODO: handle the error.
						reject(new Error());
						break;
					case "receiving": {
						/**
						 * @type {PromiseResolve<T>}
						 */
						const buffer = this._buffer;
						this._buffer = null;
						buffer(value);
						this.status = "active";
						resolve();
						break;
					}
					case "active":
						this.status = "sending";
						this._buffer = [value, resolve];
						break;
				}
			});
		}

		/**
		 * 接收频道所发送的消息，若无消息发送则等待
		 * 
		 * @returns {Promise<T>} 接收到的消息
		 */
		receive() {
			return new Promise((resolve, reject) => {
				switch (this.status) {
					case "receiving":
						// TODO: handle the error.
						reject(new Error());
						break;
					case "sending": {
						/**
						 * @type {[T, PromiseResolve<void>]}
						 */
						const buffer = this._buffer;
						this._buffer = null;
						resolve(buffer[0]);
						this.status = "active";
						buffer[1]();
						break;
					}
					case "active":
						this.status = "receiving";
						this._buffer = resolve;
						break;
				}
			});
		}
	};
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
	static announce = new Announce(new EventTarget(), new WeakMap());
	static objectURL = new Map();
	static hookmap = {};
	static imported = {};
	static layoutfixed = ['chess', 'tafang', 'stone'];
	static pinyins = {
		_metadata: {
			shengmu: ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'l', 'n', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'],
			special_shengmu: ['j', 'q', 'x', 'y'],
			feijiemu: {
				i: ['ing', 'iu', 'ie', 'in'],
				u: ['ui', 'un'],
				ü: ['üe', 'ün'],
			},
			zhengtirendu: ['zhi', 'chi', 'shi', 'ri', 'zi', 'ci', 'si'],
			yunjiao: {
				'一麻': ['a', 'ia', 'ua'],
				'二波': ['o', 'e', 'uo'],
				'三皆': ['ie', 'üe'],
				'四开': ['ai', 'uai'],
				'五微': ['ei', 'ui'],
				'六豪': ['ao', 'iao'],
				'七尤': ['ou', 'iu'],
				'八寒': ['an', 'ian', 'uan', 'üan'],
				'九文': ['en', 'in', 'un', 'ün'],
				'十唐': ['ang', 'iang', 'uang'],
				'十一庚': ['eng', 'ing', 'ong', 'ung'],
				'十二齐': ['i', 'er', 'ü'],
				'十三支': ['-i'],
				'十四姑': ['u'],
			},
		}
	};
	/**
	 * Yingbian
	 * 
	 * 应变
	 */
	static yingbian = {
		condition: {
			color: new Map([
				['zhuzhan', 'wood'],
				['kongchao', 'soil'],
				['fujia', 'orange'],
				['canqu', 'fire'],
				['force', 'metal']
			]),
			complex: new Map([
				['zhuzhan', function (event) {
					const yingbianZhuzhan = game.createEvent('yingbianZhuzhan');
					yingbianZhuzhan.player = event.player;
					yingbianZhuzhan.card = event.card;
					yingbianZhuzhan._trigger = event;
					yingbianZhuzhan.yingbianZhuzhanAI = event.yingbianZhuzhanAI;
					yingbianZhuzhan.afterYingbianZhuzhan = event.afterYingbianZhuzhan;
					yingbianZhuzhan.setContent(() => {
						'step 0';
						event._global_waiting = true;
						event.send = (player, card, source, targets, id, id2, yingbianZhuzhanAI, skillState) => {
							if (skillState) player.applySkills(skillState);
							var type = get.type2(card), str = get.translation(source);
							if (targets && targets.length) str += `对${get.translation(targets)}`;
							str += `使用了${get.translation(card)}，是否弃置一张${get.translation(type)}为其助战？`;
							player.chooseCard({
								filterCard: (card, player) => get.type2(card) == type && lib.filter.cardDiscardable(card, player),
								prompt: str,
								position: 'h',
								_global_waiting: true,
								id: id,
								id2: id2,
								ai: typeof yingbianZhuzhanAI == 'function' ? yingbianZhuzhanAI(player, card, source, targets) : cardx => {
									var info = get.info(card);
									if (info && info.ai && info.ai.yingbian) {
										var ai = info.ai.yingbian(card, source, targets, player);
										if (!ai) return 0;
										return ai - get.value(cardx);
									}
									else if (get.attitude(player, source) <= 0) return 0;
									return 5 - get.value(cardx);
								}
							});
							if (!game.online) return;
							_status.event._resultid = id;
							game.resume();
						};
						'step 1';
						var type = get.type2(card);
						event.list = game.filterPlayer(current => current != player && current.countCards('h') && (_status.connectMode || current.hasCard(cardx => get.type2(cardx) == type, 'h'))).sortBySeat(_status.currentPhase || player);
						event.id = get.id();
						'step 2';
						if (!event.list.length) event.finish();
						else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] == game.me)) event.goto(4);
						else event.send(event.current = event.list.shift(), event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
						'step 3';
						if (result.bool) {
							event.zhuzhanresult = event.current;
							event.zhuzhanresult2 = result;
							if (event.current != game.me) game.delayx();
							event.goto(8);
						}
						else event.goto(2);
						'step 4';
						var id = event.id, sendback = (result, player) => {
							if (result && result.id == id && !event.zhuzhanresult && result.bool) {
								event.zhuzhanresult = player;
								event.zhuzhanresult2 = result;
								game.broadcast('cancel', id);
								if (_status.event.id == id && _status.event.name == 'chooseCard' && _status.paused) return () => {
									event.resultOL = _status.event.resultOL;
									ui.click.cancel();
									if (ui.confirm) ui.confirm.close();
								};
							}
							else if (_status.event.id == id && _status.event.name == 'chooseCard' && _status.paused) return () => event.resultOL = _status.event.resultOL;
						}, withme = false, withol = false, list = event.list;
						for (var i = 0; i < list.length; i++) {
							var current = list[i];
							if (current.isOnline()) {
								withol = true;
								current.wait(sendback);
								current.send(event.send, current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI, get.skillState(current));
								list.splice(i--, 1);
							}
							else if (current == game.me) {
								withme = true;
								event.send(current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
								list.splice(i--, 1);
							}
						}
						if (!withme) event.goto(6);
						if (_status.connectMode && (withme || withol)) game.players.forEach(value => {
							if (value != player) value.showTimer();
						});
						event.withol = withol;
						'step 5';
						if (!result || !result.bool || event.zhuzhanresult) return;
						game.broadcast('cancel', event.id);
						event.zhuzhanresult = game.me;
						event.zhuzhanresult2 = result;
						'step 6';
						if (event.withol && !event.resultOL) game.pause();
						'step 7';
						game.players.forEach(value => value.hideTimer());
						'step 8';
						if (event.zhuzhanresult) {
							var target = event.zhuzhanresult;
							target.line(player, 'green');
							target.discard(event.zhuzhanresult2.cards).discarder = target;
							if (typeof event.afterYingbianZhuzhan == 'function') event.afterYingbianZhuzhan(event, trigger);
							var yingbianCondition = event.name.slice(8).toLowerCase(), yingbianConditionTag = `yingbian_${yingbianCondition}_tag`;
							target.popup(yingbianConditionTag, lib.yingbian.condition.color.get(yingbianCondition));
							game.log(target, '响应了', player, '发起的', yingbianConditionTag);
							target.addExpose(0.2);
							event.result = {
								bool: true
							};
						}
						else event.result = {
							bool: false
						};
					});
					yingbianZhuzhan._args = Array.from(arguments);
					return yingbianZhuzhan;
				}]
			]),
			simple: new Map([
				['kongchao', event => !event.player.countCards('h')],
				['fujia', event => event.player.isMaxHandcard()],
				['canqu', event => event.player.getHp() == 1]
			])
		},
		effect: new Map([
			['add', () => {
				trigger.yingbian_addTarget = true;
			}],
			['remove', () => {
				trigger.yingbian_removeTarget = true;
			}],
			['damage', () => {
				if (typeof trigger.baseDamage != 'number') trigger.baseDamage = 1;
				trigger.baseDamage++;
				game.log(card, '的伤害值基数+1');
			}],
			['draw', () => {
				player.draw();
			}],
			['gain', () => {
				const cardx = trigger.respondTo;
				if (cardx && cardx[1] && cardx[1].cards && cardx[1].cards.filterInD('od').length) player.gain(cardx[1].cards.filterInD('od'), 'gain2');
			}],
			['hit', () => {
				trigger.directHit.addArray(game.players).addArray(game.dead);
				game.log(card, '不可被响应');
			}],
			['all', () => {
				card.yingbian_all = true;
				game.log(card, '执行所有选项');
			}]
		]),
		prompt: new Map([
			['add', '目标+1'],
			['remove', '目标-1'],
			['damage', '伤害+1'],
			['draw', '摸一张牌'],
			['gain', '获得响应的牌'],
			['hit', '此牌不可被响应'],
			['all', '无视条件执行所有选项']
		])
	};
	/**
	 * Stratagem buff
	 * 
	 * 谋攻强化
	 */
	static stratagemBuff = {
		cost: new Map([
			['sha', 1],
			['shan', 1],
			['juedou', 2],
			['huogong', 2],
			['tao', 3]
		]),
		effect: new Map([
			['sha', (event, option) => {
				if (event.step != 0 || option.state != 'end') return;
				game.log(event.player, '触发了强化效果');
				game.log(event.card, '抵消所需要的', new lib.element.VCard({
					name: 'shan'
				}), '数+1');
				const map = event.customArgs;
				game.players.concat(game.dead).forEach(current => {
					const id = current.playerid;
					if (!map[id]) map[id] = {};
					if (typeof map[id].shanRequired == 'number') map[id].shanRequired++;
					else map[id].shanRequired = 2;
				});
			}],
			['shan', (event, option) => {
				if (event.step != 0 || option.state != 'end') return;
				game.log(event.player, '触发了强化效果');
				game.log('使用', event.card, '时视为两张', new lib.element.VCard({
					name: 'shan'
				}), '的效果');
				event.player.when('useCard').filter(evt => evt == event).then(() => {
					trigger.getParent(2).decrease('shanRequired', 1);
				});
			}],
			['juedou', (event, option) => {
				if (event.step != 0 || option.state != 'end') return;
				game.log(event.player, '触发了强化效果');
				game.log('对', event.card, '的目标造成伤害时，伤害+1');
				event.player.when({
					source: 'damageBegin1'
				}).filter(evt => evt.getParent(2) == event && event.targets.includes(evt.player)).then(() => {
					trigger.increase('num');
				});
			}],
			['huogong', (event, option) => {
				if (event.step != 0 || option.state != 'end') return;
				game.log(event.player, '触发了强化效果');
				game.log(event.card, '造成的伤害+1');
				event.increase('baseDamage', 1);
			}],
			['tao', (event, option) => {
				if (event.step != 0 || option.state != 'end') return;
				game.log(event.player, '触发了强化效果');
				game.log(event.card, '回复的体力+1');
				event.increase('baseDamage', 1);
			}]
		]),
		prompt: new Map([
			[
				'sha',
				/**
				 * @type {() => string}
				 */
				() => `抵消所需要的【${get.translation('shan')}】数+1。`
			],
			[
				'shan',
				/**
				 * @type {() => string}
				 */
				() => `使用时视为两张【${get.translation('shan')}】的效果。`
			],
			[
				'juedou',
				() => '对此牌的目标造成伤害时，伤害+1。'
			],
			[
				'huogong',
				() => '造成的伤害+1。'
			],
			[
				'tao',
				() => '回复的体力+1。'
			]
		])
	};
	/**
	 * The actual card name
	 * 
	 * 实际的卡牌名称
	 */
	static actualCardName = new Map([
		['挟令', '挟天子以令诸侯'],
		['霹雳投石车', '霹雳车']
	]);
	static characterDialogGroup = {
		'收藏': function (name, capt) {
			return lib.config.favouriteCharacter.includes(name) ? capt : null;
		},
		'最近': function (name, capt) {
			var list = get.config('recentCharacter') || [];
			return list.includes(name) ? capt : null;
		}
	};
	static listenEnd(node) {
		if (!node._listeningEnd) {
			node._listeningEnd = true;
			node.listenTransition(function () {
				delete node._listeningEnd;
				if (node._onEndMoveDelete) {
					node.moveDelete(node._onEndMoveDelete);
				}
				else if (node._onEndDelete) {
					node.delete();
				}
				node._transitionEnded = true;
			});
		}
	}
	static configMenu = {
		general: {
			name: '通用',
			config: {
				mount_combine: {
					name: '合并坐骑栏',
					init: false,
					intro: '<li>将进攻坐骑栏和防御坐骑栏合并为同一个位置（重启后生效）。',
					restart: true,
				},
				low_performance: {
					name: '流畅模式',
					init: false,
					intro: '减少部分游戏特效，提高游戏速度',
					onclick: function (bool) {
						game.saveConfig('low_performance', bool);
						if (bool) {
							ui.window.classList.add('low_performance');
						}
						else {
							ui.window.classList.remove('low_performance');
						}
					}
				},
				compatiblemode: {
					name: '兼容模式',
					init: false,
					intro: '开启兼容模式可防止扩展使游戏卡死并提高对旧扩展的兼容性，但对游戏速度有一定影响，若无不稳定或不兼容的扩展建议关闭',
					onclick: function (bool) {
						game.saveConfig('compatiblemode', bool);
						if (bool) {
							ui.window.classList.add('compatiblemode');
						}
						else {
							ui.window.classList.remove('compatiblemode');
						}
					}
				},
				confirm_exit: {
					name: '确认退出',
					init: false,
					unfrequent: true,
					intro: '离开游戏前弹出确认对话框',
				},
				keep_awake: {
					name: '屏幕常亮',
					init: false,
					unfrequent: true,
					intro: '防止屏幕自动关闭<br>注：旧版本通过NoSleep.js实现的屏幕常亮可能会影响外置音频的音量',
					onclick: function (bool) {
						game.saveConfig('keep_awake', bool);
						if (bool) {
							if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.keepAwake();
							else if (window.noSleep) {
								document.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function enableNoSleepX() {
									document.removeEventListener(lib.config.touchscreen ? 'touchend' : 'click', enableNoSleepX, false);
									window.noSleep.enable();
								}, false);
							}
						}
						else {
							if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.allowSleepAgain();
							else if (window.noSleep) window.noSleep.disable();
						}
					}
				},
				auto_confirm: {
					name: '自动确认',
					init: true,
					unfrequent: true,
					intro: '当候选目标只有1个时，点击目标后无需再点击确认',
				},
				skip_shan: {
					name: '无闪自动取消',
					init: false,
					unfrequent: true,
					intro: '当自己需要使用或打出【闪】时，若自己没有【闪】，则跳过该步骤',
				},
				unauto_choose: {
					name: '拆顺手牌选择',
					init: false,
					unfrequent: true,
					intro: '拆牌或者顺牌时，就算只能选择对方的手牌依然手动选择',
				},
				wuxie_self: {
					name: '不无懈自己',
					init: true,
					unfrequent: true,
					intro: '自己使用的单目标普通锦囊即将生效时，不询问无懈',
				},
				tao_enemy: {
					name: '不对敌方出桃',
					init: false,
					intro: '双方阵营明确的模式中（如对决），敌方角色濒死时不询问出桃',
					unfrequent: true,
				},
				enable_drag: {
					name: '启用拖拽',
					init: true,
					intro: '按住卡牌后可将卡牌拖至目标',
					unfrequent: true,
				},
				enable_dragline: {
					name: '拖拽指示线',
					init: true,
					unfrequent: true,
					intro: '拖拽时显示虚线，可能降低游戏速度',
				},
				enable_touchdragline: {
					name: '拖拽指示线',
					init: false,
					unfrequent: true,
					intro: '拖拽时显示虚线，可能降低游戏速度',
				},
				// enable_pressure:{
				// 	name:'启用压感',
				// 	init:false,
				// 	intro:'开启后可通过按压执行操作',
				// 	unfrequent:true,
				// },
				// pressure_taptic:{
				// 	name:'触觉反馈',
				// 	init:false,
				// 	intro:'开启后按压操作执行时将产生震动',
				// 	unfrequent:true,
				// },
				// pressure_click:{
				// 	name:'按压操作',
				// 	init:'pause',
				// 	intro:'在空白区域按压时的操作',
				// 	unfrequent:true,
				// 	item:{
				// 		pause:'暂停',
				// 		config:'选项',
				// 		auto:'托管',
				// 	}
				// },
				touchscreen: {
					name: '触屏模式',
					init: false,
					restart: true,
					unfrequent: true,
					intro: '开启后可使触屏设备反应更快，但无法使用鼠标操作',
					onclick: function (bool) {
						if (get.is.nomenu('touchscreen', bool)) return false;
						game.saveConfig('touchscreen', bool);
					}
				},
				swipe: {
					name: '滑动手势',
					init: true,
					unfrequent: true,
					intro: '在非滚动区域向四个方向滑动可执行对应操作',
				},
				swipe_down: {
					name: '下划操作',
					init: 'menu',
					unfrequent: true,
					intro: '向下滑动时执行的操作',
					item: {
						system: '显示按钮',
						menu: '打开菜单',
						pause: '切换暂停',
						auto: '切换托管',
						chat: '显示聊天',
						off: '关闭',
					},
					onclick: function (item) {
						if (get.is.nomenu('swipe_down', item)) return false;
						game.saveConfig('swipe_down', item);
					}
				},
				swipe_up: {
					name: '上划操作',
					intro: '向上滑动时执行的操作',
					init: 'auto',
					unfrequent: true,
					item: {
						system: '显示按钮',
						menu: '打开菜单',
						pause: '切换暂停',
						auto: '切换托管',
						chat: '显示聊天',
						off: '关闭',
					},
					onclick: function (item) {
						if (get.is.nomenu('swipe_up', item)) return false;
						game.saveConfig('swipe_up', item);
					}
				},
				swipe_left: {
					name: '左划操作',
					intro: '向左滑动时执行的操作',
					init: 'system',
					unfrequent: true,
					item: {
						system: '显示按钮',
						menu: '打开菜单',
						pause: '切换暂停',
						auto: '切换托管',
						chat: '显示聊天',
						off: '关闭',
					},
					onclick: function (item) {
						if (get.is.nomenu('swipe_left', item)) return false;
						game.saveConfig('swipe_left', item);
					}
				},
				swipe_right: {
					name: '右划操作',
					intro: '向右滑动时执行的操作',
					init: 'system',
					unfrequent: true,
					item: {
						system: '显示按钮',
						menu: '打开菜单',
						pause: '切换暂停',
						auto: '切换托管',
						chat: '显示聊天',
						off: '关闭',
					},
					onclick: function (item) {
						if (get.is.nomenu('swipe_right', item)) return false;
						game.saveConfig('swipe_right', item);
					}
				},
				round_menu_func: {
					name: '触屏按钮操作',
					intro: '点击屏幕中圆形按钮时执行的操作',
					init: 'system',
					unfrequent: true,
					item: {
						system: '显示按钮',
						menu: '打开菜单',
						pause: '切换暂停',
						auto: '切换托管'
					},
					onclick: function (item) {
						if (get.is.nomenu('round_menu_func', item)) return false;
						game.saveConfig('round_menu_func', item);
					},
				},
				show_splash: {
					name: '显示开始界面',
					intro: '游戏开始前进入模式选择画面',
					init: 'init',
					item: {
						off: '关闭',
						init: '首次启动',
						always: '保持开启',
					}
				},
				game_speed: {
					name: '游戏速度',
					init: 'mid',
					item: {
						vslow: '慢',
						slow: '较慢',
						mid: '中',
						fast: '较快',
						vfast: '快',
						vvfast: '很快',
					},
					intro: '设置不同游戏操作间的时间间隔'
				},
				sync_speed: {
					name: '限制结算速度',
					intro: '在动画结算完成前不执行下一步操作，开启后游戏操作的间隔更长但画面更浏畅，在游戏较卡时建议开启',
					init: true
				},
				enable_vibrate: {
					name: '开启震动',
					intro: '回合开始时使手机震动',
					init: false
				},
				right_click: {
					name: '右键操作',
					init: 'pause',
					intro: '在空白区域点击右键时的操作',
					unfrequent: true,
					item: {
						pause: '暂停',
						shortcut: '工具',
						config: '选项',
						auto: '托管',
					},
					onclick: function (item) {
						if (get.is.nomenu('right_click', item)) return false;
						game.saveConfig('right_click', item);
					}
				},
				longpress_info: {
					name: '长按显示信息',
					init: true,
					unfrequent: true,
					restart: true,
					intro: '长按后弹出菜单',
				},
				right_info: {
					name: '右键显示信息',
					init: true,
					unfrequent: true,
					restart: true,
					intro: '右键点击后弹出菜单',
				},
				hover_all: {
					name: '悬停显示信息',
					init: true,
					unfrequent: true,
					restart: true,
					intro: '悬停后弹出菜单',
				},
				hover_handcard: {
					name: '悬停手牌显示信息',
					init: true,
					unfrequent: true,
					intro: '悬停手牌后弹出菜单',
				},
				hoveration: {
					name: '悬停菜单弹出时间',
					unfrequent: true,
					intro: '鼠标移至目标到弹出菜单的时间间隔',
					init: '1000',
					item: {
						'500': '0.5秒',
						'700': '0.7秒',
						'1000': '1秒',
						'1500': '1.5秒',
						'2500': '2.5秒',
					}
				},
				doubleclick_intro: {
					name: '双击显示武将资料',
					init: true,
					unfrequent: true,
					intro: '双击武将头像后显示其资料卡',
				},
				video: {
					name: '保存录像',
					init: '20',
					intro: '游戏结束后保存录像在最大条数，超过后将从最早的录像开始删除（已收藏的录像不计入条数）',
					item: {
						'0': '关闭',
						'5': '五局',
						'10': '十局',
						'20': '二十局',
						'50': '五十局',
						'10000': '无限',
					},
					unfrequent: true,
				},
				max_loadtime: {
					name: '最长载入时间',
					intro: '设置游戏从启动到完成载入所需的最长时间，超过此时间未完成载入会报错，若设备较慢或安装了较多扩展可适当延长此时间',
					init: '5000',
					unfrequent: true,
					item: {
						5000: '5秒',
						10000: '10秒',
						20000: '20秒',
						60000: '60秒'
					},
					onclick: function (item) {
						game.saveConfig('max_loadtime', item);
						if (item == '5000') {
							localStorage.removeItem(lib.configprefix + 'loadtime');
						}
						else {
							localStorage.setItem(lib.configprefix + 'loadtime', item);
						}
					}
				},
				mousewheel: {
					name: '滚轮控制手牌',
					init: true,
					unfrequent: true,
					intro: '开启后滚轮可使手牌横向滚动，在mac等可横向滚动的设备上建议关闭',
					onclick: function (bool) {
						game.saveConfig('mousewheel', bool);
						if (lib.config.touchscreen) return;
						if (lib.config.mousewheel) {
							ui.handcards1Container.onmousewheel = ui.click.mousewheel;
							ui.handcards2Container.onmousewheel = ui.click.mousewheel;
						}
						else {
							ui.handcards1Container.onmousewheel = null;
							ui.handcards2Container.onmousewheel = null;
						}
					}
				},
				auto_check_update: {
					name: '自动检查游戏更新',
					intro: '进入游戏时检查更新',
					init: false,
					unfrequent: true
				},
				lucky_star: {
					name: '幸运星模式',
					intro: '在涉及随机数等的技能中，必定得到效果最好的结果。（联机模式无效）',
					init: false,
					unfrequent: true
				},
				dev: {
					name: '开发者模式',
					intro: '开启后可使用浏览器控制台控制游戏，同时可更新到开发版',
					init: false,
					onclick: function (bool) {
						game.saveConfig('dev', bool);
						if (_status.connectMode) return;
						if (bool) {
							lib.cheat.i();
						}
						else {
							delete window.cheat;
							delete window.game;
							delete window.ui;
							delete window.get;
							delete window.ai;
							delete window.lib;
							delete window._status;
						}
					},
					unfrequent: true,
				},
				fuck_sojson: {
					name: '检测加密扩展',
					init: false,
				},
				errstop: {
					name: '出错时停止游戏',
					init: false,
					unfrequent: true
				},
				update_link: {
					name: '更新地址',
					init: 'coding',
					unfrequent: true,
					item: {
						coding: 'CSDN',
						github: 'GitHub',
					},
					onclick: function (item) {
						game.saveConfig('update_link', item);
						lib.updateURL = lib.updateURLS[item] || lib.updateURLS.coding;
					},
				},
				extension_source: {
					name: '获取扩展地址',
					init: 'GitHub Proxy',
					unfrequent: true,
					item: {},
					intro: () => `获取在线扩展时的地址。当前地址：${document.createElement('br').outerHTML}${lib.config.extension_sources[lib.config.extension_source]}`
				},
				extension_create: {
					name: '添加获取扩展地址',
					clear: true,
					unfrequent: true,
					onclick: function () {
						game.prompt('请输入地址名称', function (str) {
							if (str) {
								var map = lib.config.extension_sources;
								game.prompt('请输入' + str + '的地址', function (str2) {
									if (str2) {
										delete map[str];
										map[str] = str2;
										game.saveConfig('extension_sources', map);
										game.saveConfig('extension_source', str);
										var nodexx = ui.extension_source;
										nodexx.updateInner();
										var nodeyy = nodexx._link.menu;
										var nodezz = nodexx._link.config;
										for (var i = 0; i < nodeyy.childElementCount; i++) {
											if (nodeyy.childNodes[i]._link == str) {
												nodeyy.childNodes[i].remove();
												break;
											}
										}
										var textMenu = ui.create.div('', str, nodeyy, function () {
											var node = this.parentNode._link;
											var config = node._link.config;
											node._link.current = this.link;
											var tmpName = node.lastChild.innerHTML;
											node.lastChild.innerHTML = config.item[this._link];
											if (config.onclick) {
												if (config.onclick.call(node, this._link, this) === false) {
													node.lastChild.innerHTML = tmpName;
												}
											}
											if (config.update) {
												config.update();
											}
										});
										textMenu._link = str;
										nodezz.item[name] = str;
										alert('已添加扩展地址：' + str);
									}
								});
							}
						});
					},
				},
				extension_delete: {
					name: '删除当前扩展地址',
					clear: true,
					unfrequent: true,
					onclick: function () {
						var bool = false, map = lib.config.extension_sources;
						for (var i in map) {
							if (i != lib.config.extension_source) {
								bool = true;
								break;
							}
						}
						if (!bool) {
							alert('不能删除最后一个扩展地址！');
							return;
						}
						var name = lib.config.extension_source;
						game.saveConfig('extension_source', i);
						delete map[name];
						game.saveConfig('extension_sources', map);
						var nodexx = ui.extension_source;
						nodexx.updateInner();
						var nodeyy = nodexx._link.menu;
						var nodezz = nodexx._link.config;
						for (var i = 0; i < nodeyy.childElementCount; i++) {
							if (nodeyy.childNodes[i]._link == name) {
								nodeyy.childNodes[i].remove();
								break;
							}
						}
						delete nodezz.item[name];
						alert('已删除扩展地址：' + name);
					},
				},
				update: function (config, map) {
					if ('ontouchstart' in document) {
						map.touchscreen.show();
					}
					else {
						map.touchscreen.hide();
					}
					if (lib.device || lib.node) {
						map.auto_check_update.show();
					}
					else {
						map.auto_check_update.hide();
					}
					if (lib.device) {
						map.enable_vibrate.show();
						map.keep_awake.show();
					}
					else {
						map.enable_vibrate.hide();
						map.keep_awake.hide();
					}
					// if(config.enable_pressure){
					// 	map.pressure_click.show();
					// 	if(lib.device){
					// 		map.pressure_taptic.show();
					// 	}
					// 	else{
					// 		map.pressure_taptic.hide();
					// 	}
					// }
					// else{
					// 	map.pressure_click.hide();
					// 	map.pressure_taptic.hide();
					// }
					if (lib.config.touchscreen) {
						map.mousewheel.hide();
						map.hover_all.hide();
						map.hover_handcard.hide();
						map.hoveration.hide();
						map.right_info.hide();
						map.right_click.hide();
						map.longpress_info.show();
						map.swipe.show();
						if (lib.config.swipe) {
							map.swipe_up.show();
							map.swipe_down.show();
							map.swipe_left.show();
							map.swipe_right.show();
						}
						else {
							map.swipe_up.hide();
							map.swipe_down.hide();
							map.swipe_left.hide();
							map.swipe_right.hide();
						}
					}
					else {
						map.mousewheel.show();
						map.hover_all.show();
						map.right_info.show();
						map.right_click.show();
						map.longpress_info.hide();
						if (!config.hover_all) {
							map.hover_handcard.hide();
							map.hoveration.hide();
						}
						else {
							map.hover_handcard.show();
							map.hoveration.show();
						}
						map.swipe.hide();
						map.swipe_up.hide();
						map.swipe_down.hide();
						map.swipe_left.hide();
						map.swipe_right.hide();
					}
					if (lib.config.enable_drag) {
						if (lib.config.touchscreen) {
							map.enable_dragline.hide();
							map.enable_touchdragline.show();
						}
						else {
							map.enable_dragline.show();
							map.enable_touchdragline.hide();
						}
					}
					else {
						map.enable_dragline.hide();
						map.enable_touchdragline.hide();
					}
					if (!get.is.phoneLayout()) {
						map.round_menu_func.hide();
					}
					else {
						map.round_menu_func.show();
					}
					if (!lib.node && lib.device != 'ios') {
						map.confirm_exit.show();
					}
					else {
						map.confirm_exit.hide();
					}
					if (config.dev) {
						map.errstop.show();
					}
					else {
						map.errstop.hide();
					}
				}
			}
		},
		appearence: {
			name: '外观',
			config: {
				theme: {
					name: '主题',
					init: 'woodden',
					item: {},
					visualMenu: function (node, link) {
						if (!node.menu) {
							node.className = 'button character themebutton ' + link;
							node.menu = ui.create.div(node, '', '<div></div><div></div><div></div><div></div>');
						}
					},
					onclick: async (theme) => {
						game.saveConfig('theme', theme);
						ui.arena.hide();
						lib.init.background();
						if (lib.config.autostyle) {
							if (theme === "simple") {
								lib.configMenu.appearence.config.player_border.onclick("slim");
							}
							else {
								lib.configMenu.appearence.config.player_border.onclick("normal");
							}
						}
						lib.announce.publish("Noname.Apperaence.Theme.onChanging", theme);
						await new Promise(resolve => setTimeout(resolve, 500));

						const deletingTheme = ui.css.theme;
						ui.css.theme = lib.init.css(lib.assetURL + 'theme/' + lib.config.theme, 'style');
						deletingTheme.remove();
						lib.announce.publish("Noname.Apperaence.Theme.onChanged", theme);
						await new Promise(resolve => setTimeout(resolve, 100));

						ui.arena.show();
						lib.announce.publish("Noname.Apperaence.Theme.onChangeFinished", theme);
					}
				},
				layout: {
					name: '布局',
					init: 'mobile',
					item: {
						//default:'旧版',
						newlayout: '对称',
						mobile: '默认',
						long: '宽屏',
						long2: '手杀',
						nova: '新版'
					},
					visualMenu: function (node, link) {
						node.className = 'button character themebutton ' + lib.config.theme;
						if (!node.created) {
							node.created = true;
							node.style.overflow = 'hidden';
							node.firstChild.style.display = 'none';
							// node.firstChild.classList.add('shadowed');
							// node.firstChild.style.width='16px';
							// node.firstChild.style.height='auto';
							// node.firstChild.style.padding='2px';
							// node.firstChild.style.textAlign='center';
							var me = ui.create.div(node);
							me.style.top = 'auto';
							if (link == 'default' || link == 'newlayout') {
								me.style.width = 'calc(100% - 6px)';
								me.style.left = '3px';
								me.style.bottom = '3px';
								me.style.height = '25px';
								if (link == 'newlayout') {
									me.style.height = '23px';
									me.style.bottom = '4px';
								}
							}
							else if (link == 'long2' || link == 'nova') {
								me.style.display = 'none';
							}
							else {
								me.style.width = '120%';
								me.style.left = '-10%';
								me.style.bottom = '0';
								me.style.height = '22px';
							}
							me.style.borderRadius = '2px';
							var list = ['re_caocao', 're_liubei', 'sp_zhangjiao', 'sunquan'];
							for (var i = 0; i < 4; i++) {
								var player = ui.create.div('.fakeplayer', node);
								ui.create.div('.avatar', player).setBackground(list.randomRemove(), 'character');
								player.style.borderRadius = '2px';
								if (i != 3) {
									player.style.top = 'auto';
								}
								if (link == 'default') {
									player.style.height = '19px';
									player.style.width = '38px';
									player.classList.add('oldlayout');
								}
								else if (link == 'mobile' || link == 'newlayout') {
									player.style.width = '24px';
									player.style.height = '29px';
								}
								else if (link == 'nova') {
									player.style.width = '20px';
									player.style.height = '24px';
								}
								else {
									player.style.width = '20px';
									player.style.height = '34px';
								}
								if (i == 1) {
									player.style.left = '3px';
								}
								if (i == 2) {
									player.style.left = 'auto';
									player.style.right = '3px';
								}
								if (i == 3) {
									player.style.top = '3px';
								}
								if (link == 'default') {
									if (i == 0) {
										player.style.bottom = '6px';
									}
									if (i == 0 || i == 3) {
										player.style.left = 'calc(50% - 18px)';
									}
									if (i == 1 || i == 2) {
										player.style.bottom = '36px';
									}
								}
								else if (link == 'newlayout') {
									if (i == 0) {
										player.style.bottom = '1px';
									}
									if (i == 0 || i == 3) {
										player.style.left = 'calc(50% - 12px)';
									}
									if (i == 1 || i == 2) {
										player.style.bottom = '32px';
									}
								}
								else if (link == 'mobile') {
									if (i == 0 || i == 3) {
										player.style.left = 'calc(50% - 12px)';
									}
									if (i == 1 || i == 2) {
										player.style.bottom = '30px';
									}
								}
								else if (link == 'long') {
									if (i == 0 || i == 3) {
										player.style.left = 'calc(50% - 10px)';
									}
									if (i == 1 || i == 2) {
										player.style.bottom = '45px';
									}
								}
								else if (link == 'long2') {
									if (i == 0) {
										player.style.bottom = '2px';
										player.style.left = '3px';
									}
									if (i == 3) {
										player.style.left = 'calc(50% - 10px)';
									}
									if (i == 1 || i == 2) {
										player.style.bottom = '45px';
									}
								}
								else if (link == 'nova') {
									if (i == 0) {
										player.style.bottom = '2px';
										player.style.left = '3px';
									}
									if (i == 3) {
										player.style.left = 'calc(50% - 10px)';
									}
									if (i == 1 || i == 2) {
										player.style.left = '3px';
										player.style.bottom = (i * 30) + 'px';
									}
								}

								if (i == 0 && (link == 'mobile' || link == 'long')) {
									player.classList.add('me');
									player.style.borderRadius = '0px';
									player.style.width = '25px';
									player.style.height = '25px';
									player.style.bottom = '-3px';
									player.style.left = '-3px';
								}
							}
						}
					},
					onclick: function (layout) {
						if (lib.layoutfixed.contains(lib.config.mode)) {
							game.saveConfig('layout', layout);
						}
						else {
							lib.init.layout(layout);
						}
					}
				},
				splash_style: {
					name: '启动页',
					init: 'style1',
					item: {
						style1: '样式一',
						style2: '样式二',
					},
					visualMenu: (node, link) => {
						node.className = 'button character';
						node.style.width = '200px';
						node.style.height = `${node.offsetWidth * 1080 / 2400}px`;
						node.style.display = 'flex';
						node.style.flexDirection = 'column';
						node.style.alignItems = 'center';
						node.style.backgroundSize = '100% 100%';
						node.setBackgroundImage(`image/splash/${link}.jpg`);
					}
				},
				// fewplayer:{
				//     name:'启用人数',
				// 	intro:'设置启用新版布局的最小人数（不足时切换至默认布局）',
				//     init:'3',
				//     // unfrequent:true,
				//     item:{
				//      			'2':'两人',
				//      			'3':'三人',
				//      			'4':'四人',
				//      			'5':'五人',
				//      			'6':'六人',
				//      			'7':'七人',
				//      			'8':'八人',
				//     },
				//     onclick:function(item){
				//      			game.saveConfig('fewplayer',item);
				//      			if(ui.arena) ui.arena.setNumber(ui.arena.dataset.number);
				//     }
				// },
				player_height: {
					name: '角色高度',
					init: 'long',
					// unfrequent:true,
					item: {
						short: '矮',
						default: '中',
						long: '高',
					},
					onclick: function (item) {
						game.saveConfig('player_height', item);
						ui.arena.dataset.player_height = item;
					}
				},
				player_height_nova: {
					name: '角色高度',
					init: 'short',
					item: {
						// auto:'自动',
						short: '矮',
						default: '中',
						long: '高',
					},
					onclick: function (item) {
						game.saveConfig('player_height_nova', item);
						// if(item=='auto'){
						// 	if(parseInt(ui.arena.dataset.number)>=7){
						// 		ui.arena.dataset.player_height_nova='short';
						// 	}
						// 	else{
						// 		ui.arena.dataset.player_height_nova='default';
						// 	}
						// }
						// else{
						ui.arena.dataset.player_height_nova = item;
						// }
					}
				},
				// background_color_music:{
				// 	name:'背景色',
				// 	init:'black',
				// 	item:{
				// 		blue:'蓝色',
				// 		black:'黑色',
				// 	},
				// 	onclick:function(color){
				// 		game.saveConfig('background_color_music',color);
				// 		document.body.dataset.background_color_music=color;
				// 	}
				// },
				// background_color_wood:{
				// 	name:'背景色',
				// 	init:'blue',
				// 	item:{
				// 		blue:'蓝色',
				// 		black:'黑色',
				// 	},
				// 	onclick:function(color){
				// 		game.saveConfig('background_color_wood',color);
				// 		document.body.dataset.background_color_wood=color;
				// 	}
				// },
				// theme_color_music:{
				// 	name:'主题色',
				// 	init:'black',
				// 	item:{
				// 		blue:'蓝色',
				// 		black:'黑色',
				// 	},
				// 	onclick:function(color){
				// 		game.saveConfig('theme_color_music',color);
				// 		document.body.dataset.theme_color_music=color;
				// 	}
				// },
				ui_zoom: {
					name: '界面缩放',
					unfrequent: true,
					init: 'normal',
					item: {
						esmall: '80%',
						vsmall: '90%',
						small: '95%',
						normal: '100%',
						big: '105%',
						vbig: '110%',
						ebig: '120%',
						eebig: '150%',
						eeebig: '180%',
						eeeebig: '200%',
					},
					onclick: function (zoom) {
						game.saveConfig('ui_zoom', zoom);
						switch (zoom) {
							case 'esmall': zoom = 0.8; break;
							case 'vsmall': zoom = 0.9; break;
							case 'small': zoom = 0.93; break;
							case 'big': zoom = 1.05; break;
							case 'vbig': zoom = 1.1; break;
							case 'ebig': zoom = 1.2; break;
							case 'eebig': zoom = 1.5; break;
							case 'eeebig': zoom = 1.8; break;
							case 'eeeebig': zoom = 2; break;
							default: zoom = 1;
						}
						game.documentZoom = game.deviceZoom * zoom;
						ui.updatez();
						if (Array.isArray(lib.onresize)) {
							lib.onresize.forEach(fun => {
								if (typeof fun == 'function') fun();
							});
						}
					}
				},
				image_background: {
					name: '游戏背景',
					init: 'default',
					item: {},
					visualBar: function (node, item, create) {
						if (node.created) {
							node.lastChild.classList.remove('active');
							return;
						}
						node.created = true;
						ui.create.filediv('.menubutton', '添加背景', node, function (file) {
							if (file) {
								var name = file.name;
								if (name.includes('.')) {
									name = name.slice(0, name.indexOf('.'));
								}
								var link = (game.writeFile ? 'cdv_' : 'custom_') + name;
								if (item[link]) {
									for (var i = 1; i < 1000; i++) {
										if (!item[link + '_' + i]) {
											link = link + '_' + i; break;
										}
									}
								}
								item[link] = name;
								var callback = function () {
									create(link, node.parentNode.defaultNode);
									node.parentNode.updateBr();
									lib.config.customBackgroundPack.add(link);
									game.saveConfig('customBackgroundPack', lib.config.customBackgroundPack);
								};
								if (game.writeFile) {
									game.writeFile(file, 'image/background', link + '.jpg', callback);
								}
								else {
									game.putDB('image', link, file, callback);
								}
								if (node.lastChild.classList.contains('active')) {
									editbg.call(node.lastChild);
								}
							}
						}).inputNode.accept = 'image/*';
						var editbg = function () {
							this.classList.toggle('active');
							var page = this.parentNode.parentNode;
							for (var i = 0; i < page.childElementCount; i++) {
								if (page.childNodes[i].classList.contains('button')) {
									var link = page.childNodes[i]._link;
									if (link && link != 'default') {
										var str;
										if (this.classList.contains('active')) {
											if (link.startsWith('custom_') || link.startsWith('cdv_')) {
												str = '删除';
											}
											else {
												str = '隐藏';
											}
										}
										else {
											str = item[link];
										}
										page.childNodes[i].firstChild.innerHTML = get.verticalStr(str);
									}
								}
							}
						};
						ui.create.div('.menubutton', '编辑背景', node, editbg);
					},
					visualMenu: function (node, link, name, config) {
						node.className = 'button character';
						node.style.backgroundImage = '';
						node.style.backgroundSize = '';
						if (node.firstChild) {
							node.firstChild.innerHTML = get.verticalStr(name);
						}
						if (link == 'default' || link.startsWith('custom_')) {
							node.style.backgroundImage = 'none';
							node.classList.add('dashedmenubutton');
							if (link.startsWith('custom_')) {
								game.getDB('image', link, function (fileToLoad) {
									if (!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function (fileLoadedEvent) {
										var data = fileLoadedEvent.target.result;
										node.style.backgroundImage = 'url(' + data + ')';
										node.style.backgroundSize = 'cover';
										node.classList.remove('dashedmenubutton');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
							else {
								node.parentNode.defaultNode = node;
							}
						}
						else {
							node.setBackgroundImage('image/background/' + link + '.jpg');
							node.style.backgroundSize = 'cover';
						}
					},
					onclick: function (background, node) {
						if (node && node.firstChild) {
							var menu = node.parentNode;
							if (node.firstChild.innerHTML == get.verticalStr('隐藏')) {
								menu.parentNode.noclose = true;
								node.remove();
								menu.updateBr();
								if (!lib.config.prompt_hidebg) {
									alert('隐藏的背景可通过选项-其它-重置隐藏内容恢复');
									game.saveConfig('prompt_hidebg', true);
								}
								lib.config.hiddenBackgroundPack.add(background);
								game.saveConfig('hiddenBackgroundPack', lib.config.hiddenBackgroundPack);
								delete lib.configMenu.appearence.config.image_background.item[background];
								if (lib.config.image_background == background) {
									background = 'default';
									this.lastChild.innerHTML = '默认';
								}
								else {
									this.lastChild.innerHTML = lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
									return;
								}
							}
							else if (node.firstChild.innerHTML == get.verticalStr('删除')) {
								menu.parentNode.noclose = true;
								if (confirm('是否删除此背景？（此操作不可撤销）')) {
									node.remove();
									menu.updateBr();
									lib.config.customBackgroundPack.remove(background);
									game.saveConfig('customBackgroundPack', lib.config.customBackgroundPack);
									if (background.startsWith('cdv_')) {
										game.removeFile('image/background/' + background + '.jpg');
									}
									else {
										game.deleteDB('image', background);
									}
									delete lib.configMenu.appearence.config.image_background.item[background];
									if (lib.config.image_background == background) {
										background = 'default';
										this.lastChild.innerHTML = '默认';
									}
									else {
										this.lastChild.innerHTML = lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
										return;
									}
								}
							}
						}
						game.saveConfig('image_background', background);
						lib.init.background();
						game.updateBackground();
					},
				},
				image_background_random: {
					name: '随机背景',
					init: false,
					onclick: function (bool) {
						game.saveConfig('image_background_random', bool);
						lib.init.background();
					}
				},
				image_background_blur: {
					name: '背景模糊',
					init: false,
					onclick: function (bool) {
						game.saveConfig('image_background_blur', bool);
						if (lib.config.image_background_blur) {
							ui.background.style.filter = 'blur(8px)';
							ui.background.style.webkitFilter = 'blur(8px)';
							ui.background.style.transform = 'scale(1.05)';
						}
						else {
							ui.background.style.filter = '';
							ui.background.style.webkitFilter = '';
							ui.background.style.transform = '';
						}
					},
				},
				phonelayout: {
					name: '触屏布局',
					init: false,
					onclick: function (bool) {
						if (get.is.nomenu('phonelayout', bool)) return false;
						game.saveConfig('phonelayout', bool);
						if (get.is.phoneLayout()) {
							ui.css.phone.href = lib.assetURL + 'layout/default/phone.css';
							ui.arena.classList.add('phone');
						}
						else {
							ui.css.phone.href = '';
							ui.arena.classList.remove('phone');
						}
					}
				},
				change_skin: {
					name: '开启换肤',
					init: true,
					intro: '在武将的右键菜单中换肤，皮肤可在选项-文件-图片文件-皮肤图片中添加'
				},
				change_skin_auto: {
					name: '自动换肤',
					init: 'off',
					item: {
						'off': '关闭',
						'30000': '半分钟',
						'60000': '一分钟',
						'120000': '两分钟',
						'300000': '五分钟',
					},
					intro: '游戏每进行一段时间自动为一个随机角色更换皮肤',
					onclick: function (item) {
						game.saveConfig('change_skin_auto', item);
						clearTimeout(_status.skintimeout);
						if (item != 'off') {
							_status.skintimeout = setTimeout(ui.click.autoskin, parseInt(item));
						}
					}
				},
				card_style: {
					name: '卡牌样式',
					init: 'default',
					intro: '设置正面朝上的卡牌的样式',
					item: {
						wood: '木纹',
						music: '音乐',
						simple: '原版',
						ol: '手杀',
						// new:'新版',
						custom: '自定',
						default: '默认',
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == 'custom') {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv('.menubutton', '添加图片', node, function (file) {
							if (file) {
								game.putDB('image', 'card_style', file, function () {
									game.getDB('image', 'card_style', function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = 'url(' + data + ')';
											button.className = 'button card fullskin';
											node.classList.add('showdelete');
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = 'image*';
						deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
							if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
								game.deleteDB('image', 'card_style');
								button.style.backgroundImage = 'none';
								button.className = 'button character dashedmenubutton';
								node.classList.remove('showdelete');
								if (lib.config.card_style == 'custom') {
									lib.configMenu.appearence.config.card_style.onclick('default');
									switcher.lastChild.innerHTML = '默认';
								}
								button.classList.add('transparent');
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = 'button card fullskin';
						node.style.backgroundSize = '100% 100%';
						switch (link) {
							case 'default': case 'custom': {
								if (lib.config.theme == 'simple') {
									node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';
									node.className = 'button character';
								}
								else {
									node.style.backgroundImage = 'none';
									node.className = 'button character dashedmenubutton';
								}
								break;
							}
							case 'new': node.setBackgroundImage('theme/style/card/image/new.png'); break;
							case 'ol': node.setBackgroundImage('theme/style/card/image/ol.png'); break;
							case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); node.style.backgroundSize = 'initial'; break;
							case 'music': node.setBackgroundImage('theme/music/wood3.png'); break;
							case 'simple': node.setBackgroundImage('theme/simple/card.png'); break;
						}
						if (link == 'custom') {
							node.classList.add('transparent');
							game.getDB('image', 'card_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = 'url(' + data + ')';
									node.className = 'button card fullskin';
									node.parentNode.lastChild.classList.add('showdelete');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick: function (layout) {
						game.saveConfig('card_style', layout);
						var style = ui.css.card_style;
						ui.css.card_style = lib.init.css(lib.assetURL + 'theme/style/card', lib.config.card_style);
						style.remove();
						if (ui.css.card_stylesheet) {
							ui.css.card_stylesheet.remove();
							delete ui.css.card_stylesheet;
						}
						if (layout == 'custom') {
							game.getDB('image', 'card_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.card_stylesheet) {
										ui.css.card_stylesheet.remove();
									}
									ui.css.card_stylesheet = lib.init.sheet('.card:not(*:empty){background-image:url(' + fileLoadedEvent.target.result + ')}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					unfrequent: true,
				},
				cardback_style: {
					name: '卡背样式',
					intro: '设置背面朝上的卡牌的样式',
					init: 'default',
					item: {
						// wood:'木纹',
						// music:'音乐',
						official: '原版',
						// new:'新版',
						feicheng: '废城',
						liusha: '流沙',
						ol: '手杀',
						custom: '自定',
						default: '默认',
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == 'custom') {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv('.menubutton', '添加图片', node, function (file) {
							if (file) {
								game.putDB('image', 'cardback_style', file, function () {
									game.getDB('image', 'cardback_style', function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = 'url(' + data + ')';
											button.className = 'button character';
											node.classList.add('showdelete');
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = 'image/*';
						ui.create.filediv('.menubutton.deletebutton.addbutton', '添加翻转图片', node, function (file) {
							if (file) {
								game.putDB('image', 'cardback_style2', file, function () {
									node.classList.add('hideadd');
								});
							}
						}).inputNode.accept = 'image/*';
						deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
							if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
								game.deleteDB('image', 'cardback_style');
								game.deleteDB('image', 'cardback_style2');
								button.style.backgroundImage = 'none';
								button.className = 'button character dashedmenubutton';
								node.classList.remove('showdelete');
								node.classList.remove('hideadd');
								if (lib.config.cardback_style == 'custom') {
									lib.configMenu.appearence.config.cardback_style.onclick('default');
									switcher.lastChild.innerHTML = '默认';
								}
								button.classList.add('transparent');
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.style.backgroundSize = '100% 100%';
						switch (link) {
							case 'default': case 'custom': {
								node.style.backgroundImage = 'none';
								node.className = 'button character dashedmenubutton';
								break;
							}
							case 'new': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/new.png'); break;
							case 'feicheng': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/feicheng.png'); break;
							case 'official': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/official.png'); break;
							case 'liusha': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/liusha.png'); break;
							case 'ol': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/ol.png'); break;
							case 'wood': node.className = 'button card fullskin'; node.setBackgroundImage('theme/woodden/wood.jpg'); node.style.backgroundSize = 'initial'; break;
							case 'music': node.className = 'button card fullskin'; node.setBackgroundImage('theme/music/wood3.png'); break;
						}
						if (link == 'custom') {
							node.classList.add('transparent');
							game.getDB('image', 'cardback_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = 'url(' + data + ')';
									node.className = 'button character';
									node.parentNode.lastChild.classList.add('showdelete');
									game.getDB('image', 'cardback_style2', function (file) {
										if (file) {
											node.parentNode.lastChild.classList.add('hideadd');
										}
									});
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick: function (layout) {
						game.saveConfig('cardback_style', layout);
						var style = ui.css.cardback_style;
						ui.css.cardback_style = lib.init.css(lib.assetURL + 'theme/style/cardback', lib.config.cardback_style);
						style.remove();
						if (ui.css.cardback_stylesheet) {
							ui.css.cardback_stylesheet.remove();
							delete ui.css.cardback_stylesheet;
						}
						if (ui.css.cardback_stylesheet2) {
							ui.css.cardback_stylesheet2.remove();
							delete ui.css.cardback_stylesheet2;
						}
						if (layout == 'custom') {
							game.getDB('image', 'cardback_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.cardback_stylesheet) {
										ui.css.cardback_stylesheet.remove();
									}
									ui.css.cardback_stylesheet = lib.init.sheet('.card:empty,.card.infohidden{background-image:url(' + fileLoadedEvent.target.result + ')}');
									game.getDB('image', 'cardback_style2', function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											if (ui.css.cardback_stylesheet2) {
												ui.css.cardback_stylesheet2.remove();
											}
											ui.css.cardback_stylesheet2 = lib.init.sheet('.card.infohidden:not(.infoflip){background-image:url(' + fileLoadedEvent.target.result + ')}');
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					unfrequent: true,
				},
				hp_style: {
					name: '体力条样式',
					init: 'ol',
					item: {
						default: '默认',
						// official:'勾玉',
						emotion: '表情',
						glass: '勾玉',
						round: '国战',
						ol: '手杀',
						xinglass: '双鱼',
						xinround: 'OL',
						custom: '自定',
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == 'custom') {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv('.menubutton.addbutton', '添加图片', node, function (file) {
							if (file && node.currentDB) {
								game.putDB('image', 'hp_style' + node.currentDB, file, function () {
									game.getDB('image', 'hp_style' + node.currentDB, function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.childNodes[node.currentDB - 1].style.backgroundImage = 'url(' + data + ')';
											button.classList.add('shown');
											node.classList.add('showdelete');
											node.currentDB++;
											if (node.currentDB > 4) {
												node.classList.add('hideadd');
												button.classList.remove('transparent');
												delete node.currentDB;
											}
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = 'image/*';
						deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
							if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
								game.deleteDB('image', 'hp_style1');
								game.deleteDB('image', 'hp_style2');
								game.deleteDB('image', 'hp_style3');
								game.deleteDB('image', 'hp_style4');
								for (var i = 0; i < button.childElementCount; i++) {
									button.childNodes[i].style.backgroundImage = 'none';
								}
								node.classList.remove('showdelete');
								node.classList.remove('hideadd');
								if (lib.config.hp_style == 'custom') {
									lib.configMenu.appearence.config.hp_style.onclick('default');
									switcher.lastChild.innerHTML = '默认';
								}
								button.classList.add('transparent');
								button.classList.remove('shown');
								node.currentDB = 1;
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = 'button hpbutton dashedmenubutton';
						node.innerHTML = '';
						for (var i = 1; i <= 4; i++) {
							var div = ui.create.div(node);
							if (link == 'default') {
								ui.create.div(div);
							}
							else if (link != 'custom') {
								div.setBackgroundImage('theme/style/hp/image/' + link + i + '.png');
							}
							if (i == 4) {
								div.style.webkitFilter = 'grayscale(1)';
							}
						}
						if (link == 'custom') {
							node.classList.add('transparent');
							var getDB = function (num) {
								node.parentNode.lastChild.currentDB = num;
								game.getDB('image', 'hp_style' + num, function (fileToLoad) {
									if (!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function (fileLoadedEvent) {
										var data = fileLoadedEvent.target.result;
										node.childNodes[num - 1].style.backgroundImage = 'url(' + data + ')';
										node.classList.add('shown');
										node.parentNode.lastChild.classList.add('showdelete');
										if (num < 4) {
											getDB(num + 1);
										}
										else {
											node.parentNode.lastChild.classList.add('hideadd');
											node.classList.remove('transparent');
											delete node.parentNode.firstChild.currentDB;
										}
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							};
							getDB(1);
						}
					},
					onclick: function (layout) {
						game.saveConfig('hp_style', layout);
						var style = ui.css.hp_style;
						ui.css.hp_style = lib.init.css(lib.assetURL + 'theme/style/hp', lib.config.hp_style);
						style.remove();
						if (ui.css.hp_stylesheet1) {
							ui.css.hp_stylesheet1.remove();
							delete ui.css.hp_stylesheet1;
						}
						if (ui.css.hp_stylesheet2) {
							ui.css.hp_stylesheet2.remove();
							delete ui.css.hp_stylesheet2;
						}
						if (ui.css.hp_stylesheet3) {
							ui.css.hp_stylesheet3.remove();
							delete ui.css.hp_stylesheet3;
						}
						if (ui.css.hp_stylesheet4) {
							ui.css.hp_stylesheet4.remove();
							delete ui.css.hp_stylesheet4;
						}
						if (layout == 'custom') {
							game.getDB('image', 'hp_style1', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.hp_stylesheet1) {
										ui.css.hp_stylesheet1.remove();
									}
									ui.css.hp_stylesheet1 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
							game.getDB('image', 'hp_style2', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.hp_stylesheet2) {
										ui.css.hp_stylesheet2.remove();
									}
									ui.css.hp_stylesheet2 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
							game.getDB('image', 'hp_style3', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.hp_stylesheet3) {
										ui.css.hp_stylesheet3.remove();
									}
									ui.css.hp_stylesheet3 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
							game.getDB('image', 'hp_style4', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.hp_stylesheet4) {
										ui.css.hp_stylesheet4.remove();
									}
									ui.css.hp_stylesheet4 = lib.init.sheet('.hp:not(.text):not(.actcount)>.lost{background-image:url(' + fileLoadedEvent.target.result + ')}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					unfrequent: true,
				},
				player_style: {
					name: '角色背景',
					init: 'default',
					intro: '设置角色的背景图片',
					item: {
						wood: '木纹',
						music: '音乐',
						simple: '简约',
						custom: '自定',
						default: '默认',
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == 'custom') {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv('.menubutton', '添加图片', node, function (file) {
							if (file) {
								game.putDB('image', 'player_style', file, function () {
									game.getDB('image', 'player_style', function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = 'url(' + data + ')';
											button.className = 'button character';
											button.style.backgroundSize = '100% 100%';
											node.classList.add('showdelete');
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = 'image/*';
						deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
							if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
								game.deleteDB('image', 'player_style');
								button.style.backgroundImage = 'none';
								button.className = 'button character dashedmenubutton';
								node.classList.remove('showdelete');
								if (lib.config.player_style == 'custom') {
									lib.configMenu.appearence.config.player_style.onclick('default');
									switcher.lastChild.innerHTML = '默认';
								}
								button.classList.add('transparent');
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = 'button character';
						node.style.backgroundSize = '';
						node.style.height = '108px';
						switch (link) {
							case 'default': case 'custom': {
								node.style.backgroundImage = 'none';
								node.className = 'button character dashedmenubutton';
								break;
							}
							case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); break;
							case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
							case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
						}
						if (link == 'custom') {
							node.classList.add('transparent');
							game.getDB('image', 'player_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = 'url(' + data + ')';
									node.className = 'button character';
									node.parentNode.lastChild.classList.add('showdelete');
									node.style.backgroundSize = '100% 100%';
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick: function (layout) {
						game.saveConfig('player_style', layout);
						if (ui.css.player_stylesheet) {
							ui.css.player_stylesheet.remove();
							delete ui.css.player_stylesheet;
						}
						if (layout == 'custom') {
							game.getDB('image', 'player_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.player_stylesheet) {
										ui.css.player_stylesheet.remove();
									}
									ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:url("' + fileLoadedEvent.target.result + '");background-size:100% 100%;}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
						else if (layout != 'default') {
							var str = '';
							switch (layout) {
								case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
								case 'music': str = 'linear-gradient(#4b4b4b, #464646)'; break;
								case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
							}
							ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:' + str + '}');
						}
					},
					unfrequent: true,
				},
				border_style: {
					name: '角色边框',
					init: 'default',
					intro: '设置角色边框的样式，当设为自动时，样式将随着一局游戏中伤害或击杀的数量自动改变',
					item: {
						gold: '金框',
						silver: '银框',
						bronze: '铜框',
						dragon_gold: '金龙',
						dragon_silver: '银龙',
						dragon_bronze: '玉龙',
						custom: '自定',
						auto: '自动',
						default: '默认',
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == 'custom') {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv('.menubutton', '添加图片', node, function (file) {
							if (file) {
								game.putDB('image', 'border_style', file, function () {
									game.getDB('image', 'border_style', function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = 'url(' + data + ')';
											button.className = 'button character';
											button.style.backgroundSize = '100% 100%';
											node.classList.add('showdelete');
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = 'image/*';
						deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
							if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
								game.deleteDB('image', 'border_style');
								button.style.backgroundImage = 'none';
								button.className = 'button character dashedmenubutton';
								node.classList.remove('showdelete');
								if (lib.config.border_style == 'custom') {
									lib.configMenu.appearence.config.border_style.onclick('default');
									switcher.lastChild.innerHTML = '默认';
								}
								button.classList.add('transparent');
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = 'button character';
						node.style.backgroundSize = '';
						node.style.height = '108px';
						node.dataset.decoration = '';
						if (link == 'default' || link == 'custom' || link == 'auto') {
							node.style.backgroundImage = 'none';
							node.className = 'button character dashedmenubutton';
						}
						else {
							if (link.startsWith('dragon_')) {
								link = link.slice(7);
								node.dataset.decoration = link;
							}
							node.setBackgroundImage('theme/style/player/' + link + '1.png');
							node.style.backgroundSize = '100% 100%';
						}
						if (link == 'custom') {
							node.classList.add('transparent');
							game.getDB('image', 'border_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = 'url(' + data + ')';
									node.className = 'button character';
									node.parentNode.lastChild.classList.add('showdelete');
									node.style.backgroundSize = '100% 100%';
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick: function (layout) {
						game.saveConfig('border_style', layout);
						if (ui.css.border_stylesheet) {
							ui.css.border_stylesheet.remove();
							delete ui.css.border_stylesheet;
						}
						if (layout == 'custom') {
							game.getDB('image', 'border_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.border_stylesheet) {
										ui.css.border_stylesheet.remove();
									}
									ui.css.border_stylesheet = lib.init.sheet();
									ui.css.border_stylesheet.id = "ui.css.border";
									ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
									ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
						else if (layout != 'default' && layout != 'auto') {
							ui.css.border_stylesheet = lib.init.sheet();
							if (layout.startsWith('dragon_')) {
								layout = layout.slice(7);
								ui.arena.dataset.framedecoration = layout;
							}
							else {
								ui.arena.dataset.framedecoration = '';
							}
							ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("' + lib.assetURL + 'theme/style/player/' + layout + '1.png")}', 0);
							ui.css.border_stylesheet.sheet.insertRule('#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("' + lib.assetURL + 'theme/style/player/' + layout + '3.png")}', 0);
							ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
						}
					},
					unfrequent: true,
				},
				autoborder_count: {
					name: '边框升级方式',
					intro: '<strong>击杀</strong> 每击杀一人，边框提升两级<br><strong>伤害</strong> 每造成两点伤害，边框提升一级<br><strong>混合</strong> 击杀量决定边框颜色，伤害量决定边框装饰',
					init: 'kill',
					item: {
						kill: '击杀',
						damage: '伤害',
						mix: '混合',
					},
					unfrequent: true,
				},
				autoborder_start: {
					name: '基础边框颜色',
					init: 'bronze',
					item: {
						bronze: '铜',
						silver: '银',
						gold: '金'
					},
					unfrequent: true
				},
				player_border: {
					name: '边框宽度',
					init: 'normal',
					intro: '设置角色的边框宽度',
					unfrequent: true,
					item: {
						slim: '细',
						narrow: '窄',
						normal: '中',
						wide: '宽'
					},
					onclick: function (item) {
						game.saveConfig('player_border', item);
						if (item != 'wide' || game.layout == 'long' || game.layout == 'long2') {
							ui.arena.classList.add('slim_player');
						}
						else {
							ui.arena.classList.remove('slim_player');
						}
						if (item == 'slim') {
							ui.arena.classList.add('uslim_player');
						}
						else {
							ui.arena.classList.remove('uslim_player');
						}
						if (item == 'narrow') {
							ui.arena.classList.add('mslim_player');
						}
						else {
							ui.arena.classList.remove('mslim_player');
						}
						if (item == 'normal' && lib.config.mode != 'brawl' && (game.layout == 'long' || game.layout == 'long2')) {
							ui.arena.classList.add('lslim_player');
						}
						else {
							ui.arena.classList.remove('lslim_player');
						}
						ui.window.dataset.player_border = item;
					}
				},
				menu_style: {
					name: '菜单背景',
					init: 'default',
					item: {
						wood: '木纹',
						music: '音乐',
						simple: '简约',
						custom: '自定',
						default: '默认',
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == 'custom') {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv('.menubutton', '添加图片', node, function (file) {
							if (file) {
								game.putDB('image', 'menu_style', file, function () {
									game.getDB('image', 'menu_style', function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = 'url(' + data + ')';
											button.style.backgroundSize = 'cover';
											button.className = 'button character';
											node.classList.add('showdelete');
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = 'image/*';
						deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
							if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
								game.deleteDB('image', 'menu_style');
								button.style.backgroundImage = 'none';
								button.style.backgroundSize = 'auto';
								button.className = 'button character dashedmenubutton';
								node.classList.remove('showdelete');
								if (lib.config.menu_style == 'custom') {
									lib.configMenu.appearence.config.menu_style.onclick('default');
									switcher.lastChild.innerHTML = '默认';
								}
								button.classList.add('transparent');
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = 'button character';
						node.style.backgroundSize = 'auto';
						switch (link) {
							case 'default': case 'custom': {
								node.style.backgroundImage = 'none';
								node.classList.add('dashedmenubutton');
								break;
							}
							case 'wood': node.setBackgroundImage('theme/woodden/wood2.png'); break;
							case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
							case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
						}
						if (link == 'custom') {
							node.classList.add('transparent');
							game.getDB('image', 'menu_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = 'url(' + data + ')';
									node.style.backgroundSize = 'cover';
									node.className = 'button character';
									node.parentNode.lastChild.classList.add('showdelete');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick: function (layout) {
						game.saveConfig('menu_style', layout);
						if (ui.css.menu_stylesheet) {
							ui.css.menu_stylesheet.remove();
							delete ui.css.menu_stylesheet;
						}
						if (layout == 'custom') {
							game.getDB('image', 'menu_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.menu_stylesheet) {
										ui.css.menu_stylesheet.remove();
									}
									ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result + '");background-size:cover}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
						else if (layout != 'default') {
							var str = '';
							switch (layout) {
								case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood2.png")'; break;
								case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
								case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
							}
							ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:' + str + '}');
						}
					},
					unfrequent: true,
				},
				control_style: {
					name: '按钮背景',
					init: 'default',
					item: {
						wood: '木纹',
						music: '音乐',
						simple: '简约',
						custom: '自定',
						default: '默认',
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == 'custom') {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv('.menubutton', '添加图片', node, function (file) {
							if (file) {
								game.putDB('image', 'control_style', file, function () {
									game.getDB('image', 'control_style', function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = 'url(' + data + ')';
											button.className = 'button character controlbutton';
											node.classList.add('showdelete');
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = 'image/*';
						deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
							if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
								game.deleteDB('image', 'control_style');
								button.style.backgroundImage = 'none';
								button.className = 'button character controlbutton dashedmenubutton';
								node.classList.remove('showdelete');
								if (lib.config.control_style == 'custom') {
									lib.configMenu.appearence.config.control_style.onclick('default');
									switcher.lastChild.innerHTML = '默认';
								}
								button.classList.add('transparent');
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = 'button character controlbutton';
						node.style.backgroundSize = '';
						switch (link) {
							case 'default': case 'custom': {
								node.style.backgroundImage = 'none';
								node.classList.add('dashedmenubutton');
								break;
							}
							case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); break;
							case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
							case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
						}
						if (link == 'custom') {
							node.classList.add('transparent');
							game.getDB('image', 'control_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = 'url(' + data + ')';
									node.className = 'button character controlbutton';
									node.parentNode.lastChild.classList.add('showdelete');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick: function (layout) {
						game.saveConfig('control_style', layout);
						if (ui.css.control_stylesheet) {
							ui.css.control_stylesheet.remove();
							delete ui.css.control_stylesheet;
						}
						if (layout == 'custom') {
							game.getDB('image', 'control_style', function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.control_stylesheet) {
										ui.css.control_stylesheet.remove();
									}
									ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
						else if (layout != 'default') {
							var str = '';
							switch (layout) {
								case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
								case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
								case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
							}
							if (layout == 'wood') {
								ui.css.control_stylesheet = lib.init.sheet('#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:' + str + '}');
							}
							else {
								ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:' + str + '}');
							}
						}
					},
					unfrequent: true,
				},
				custom_button: {
					name: '自定义按钮高度',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						if (bool !== 'skip') {
							game.saveConfig('custom_button', bool);
						}
						if (ui.css.buttonsheet) {
							ui.css.buttonsheet.remove();
						}
						if (lib.config.custom_button) {
							var cbnum1 = 6 + (parseInt(lib.config.custom_button_system_top) || 0);
							var cbnum2 = 6 + (parseInt(lib.config.custom_button_system_bottom) || 0);
							var cbnum3 = 3 + (parseInt(lib.config.custom_button_control_top) || 0);
							var cbnum4 = 3 + (parseInt(lib.config.custom_button_control_bottom) || 0);
							var cbnum5 = 2;
							var cbnum6 = 2;
							if (cbnum3 < 0) {
								cbnum5 += cbnum3;
								cbnum3 = 0;
							}
							if (cbnum4 < 0) {
								cbnum6 += cbnum4;
								cbnum4 = 0;
							}
							ui.css.buttonsheet = lib.init.sheet(
								'#system>div>div, .caption>div>.tdnode{padding-top:' + cbnum1 + 'px !important;padding-bottom:' + cbnum2 + 'px !important}',
								'#control>.control>div{padding-top:' + cbnum3 + 'px;padding-bottom:' + cbnum4 + 'px}',
								'#control>.control{padding-top:' + cbnum5 + 'px;padding-bottom:' + cbnum6 + 'px}'
							);
						}
					}
				},
				custom_button_system_top: {
					name: '菜单上部高度',
					init: '0x',
					item: {
						'-5x': '-5px',
						'-4x': '-4px',
						'-3x': '-3px',
						'-2x': '-2px',
						'-1x': '-1px',
						'0x': '默认',
						'1x': '1px',
						'2x': '2px',
						'3x': '3px',
						'4x': '4px',
						'5x': '5px',
					},
					unfrequent: true,
					onclick: function (item) {
						game.saveConfig('custom_button_system_top', item);
						lib.configMenu.appearence.config.custom_button.onclick('skip');
					}
				},
				custom_button_system_bottom: {
					name: '菜单下部高度',
					init: '0x',
					item: {
						'-5x': '-5px',
						'-4x': '-4px',
						'-3x': '-3px',
						'-2x': '-2px',
						'-1x': '-1px',
						'0x': '默认',
						'1x': '1px',
						'2x': '2px',
						'3x': '3px',
						'4x': '4px',
						'5x': '5px',
					},
					unfrequent: true,
					onclick: function (item) {
						game.saveConfig('custom_button_system_bottom', item);
						lib.configMenu.appearence.config.custom_button.onclick('skip');
					}
				},
				custom_button_control_top: {
					name: '技能上部高度',
					init: '0x',
					item: {
						'-5x': '-5px',
						'-4x': '-4px',
						'-3x': '-3px',
						'-2x': '-2px',
						'-1x': '-1px',
						'0x': '默认',
						'1x': '1px',
						'2x': '2px',
						'3x': '3px',
						'4x': '4px',
						'5x': '5px',
					},
					unfrequent: true,
					onclick: function (item) {
						game.saveConfig('custom_button_control_top', item);
						lib.configMenu.appearence.config.custom_button.onclick('skip');
					}
				},
				custom_button_control_bottom: {
					name: '技能下部高度',
					init: '0x',
					item: {
						'-5x': '-5px',
						'-4x': '-4px',
						'-3x': '-3px',
						'-2x': '-2px',
						'-1x': '-1px',
						'0x': '默认',
						'1x': '1px',
						'2x': '2px',
						'3x': '3px',
						'4x': '4px',
						'5x': '5px',
					},
					unfrequent: true,
					onclick: function (item) {
						game.saveConfig('custom_button_control_bottom', item);
						lib.configMenu.appearence.config.custom_button.onclick('skip');
					}
				},
				radius_size: {
					name: '圆角大小',
					init: 'default',
					item: {
						off: '关闭',
						reduce: '减小',
						default: '默认',
						increase: '增大',
					},
					unfrequent: true,
					onclick: function (item) {
						game.saveConfig('radius_size', item);
						ui.window.dataset.radius_size = item;
					}
				},
				glow_phase: {
					name: '当前回合角色高亮',
					unfrequent: true,
					init: 'yellow',
					intro: '设置当前回合角色的边框颜色',
					item: {
						none: '无',
						yellow: '黄色',
						green: '绿色',
						purple: '紫色',
					},
					onclick: function (bool) {
						game.saveConfig('glow_phase', bool);
						lib.init.cssstyles();
					}
				},
				fold_card: {
					name: '折叠手牌',
					init: true,
					unfrequent: true,
				},
				fold_mode: {
					name: '折叠模式菜单',
					intro: '关闭后模式菜单中“更多”内的项目将直接展开',
					init: true,
					unfrequent: true,
				},
				seperate_control: {
					name: '分离选项条',
					init: true,
					unfrequent: true,
					intro: '开启后玩家在进行选择时不同的选项将分开，而不是连在一起',
				},
				blur_ui: {
					name: '模糊效果',
					intro: '在暂停或打开菜单时开启模糊效果',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('blur_ui', bool);
						if (bool) {
							ui.window.classList.add('blur_ui');
						}
						else {
							ui.window.classList.remove('blur_ui');
						}
					}
				},
				glass_ui: {
					name: '玻璃主题',
					intro: '为游戏主题打开玻璃效果（手机暂不支持）',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('glass_ui', bool);
						if (bool) {
							ui.window.classList.add('glass_ui');
						}
						else {
							ui.window.classList.remove('glass_ui');
						}
					}
				},
				damage_shake: {
					name: '伤害抖动',
					intro: '角色受到伤害时的抖动效果',
					init: true,
					unfrequent: true,
				},
				button_press: {
					name: '按钮效果',
					intro: '选项条被按下时将有按下效果',
					init: true,
					unfrequent: true,
				},
				jiu_effect: {
					name: '喝酒效果',
					init: true,
					unfrequent: true,
				},
				animation: {
					name: '游戏特效',
					intro: '开启后出现属性伤害、回复体力等情况时会显示动画',
					init: false,
					unfrequent: true,
				},
				skill_animation_type: {
					name: '技能特效',
					intro: '开启后觉醒技、限定技将显示全屏文字',
					init: 'default',
					unfrequent: true,
					item: {
						default: '默认',
						old: '旧版',
						off: '关闭'
					}
				},
				die_move: {
					name: '阵亡效果',
					intro: '阵亡后武将的显示效果',
					init: 'flip',
					unfrequent: true,
					item: {
						off: '关闭',
						move: '移动',
						flip: '翻面',
					}
				},
				target_shake: {
					name: '目标效果',
					intro: '一名玩家成为卡牌或技能的目标时的显示效果',
					init: 'off',
					item: {
						off: '关闭',
						zoom: '缩放',
						shake: '抖动',
					},
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('target_shake', bool);
						ui.arena.dataset.target_shake = bool;
					}
				},
				turned_style: {
					name: '翻面文字',
					intro: '角色被翻面时显示“翻面”',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('turned_style', bool);
						if (bool) {
							ui.arena.classList.remove('hide_turned');
						}
						else {
							ui.arena.classList.add('hide_turned');
						}
					}
				},
				link_style2: {
					name: '横置样式',
					intro: '设置角色被横置时的样式',
					init: 'chain',
					unfrequent: true,
					item: {
						chain: '铁索',
						rotate: '横置',
						mark: '标记'
					},
					onclick: function (style) {
						var list = [];
						for (var i = 0; i < game.players.length; i++) {
							if (game.players[i].isLinked()) {
								list.push(game.players[i]);
							}
						}
						game.saveConfig('link_style2', style);
						for (var i = 0; i < list.length; i++) {
							if (get.is.linked2(list[i])) {
								list[i].classList.add('linked2');
								list[i].classList.remove('linked');
							}
							else {
								list[i].classList.add('linked');
								list[i].classList.remove('linked2');
							}
						}
						if (style == 'chain') {
							ui.arena.classList.remove('nolink');
						}
						else {
							ui.arena.classList.add('nolink');
						}
						ui.updatem();
					}
				},
				cardshape: {
					name: '手牌显示',
					intro: '将手牌设置为正方形或长方形',
					init: 'default',
					unfrequent: true,
					item: {
						default: '默认',
						oblong: '长方',
					},
					onclick: function (item) {
						var linked = false;
						if (game.me && game.me.isLinked()) {
							linked = true;
						}
						game.saveConfig('cardshape', item);
						if (item == 'oblong' && (game.layout == 'long' || game.layout == 'mobile' || game.layout == 'long2' || game.layout == 'nova')) {
							ui.arena.classList.add('oblongcard');
							ui.window.classList.add('oblongcard');
						}
						else {
							ui.arena.classList.remove('oblongcard');
							ui.window.classList.remove('oblongcard');
						}
						if (linked) {
							if (get.is.linked2(game.me)) {
								game.me.classList.remove('linked');
								game.me.classList.add('linked2');
							}
							else {
								game.me.classList.add('linked');
								game.me.classList.remove('linked2');
							}
						}
					}
				},
				cardtempname: {
					name: '视为卡牌名称显示',
					intro: '显示强制视为类卡牌（如武魂），包括拆顺对话框内的判定牌（国色）转换等名称的显示方式',
					init: 'image',
					unfrequent: true,
					item: {
						default: '纵向',
						horizon: '横向',
						image: '图片',
						off: '禁用',
					},
					onclick: function (item) {
						game.saveConfig('cardtempname', item);
						if (!game.me || !game.me.getCards) return;
						var hs = game.me.getCards('h');
						for (var i = 0; i < hs.length; i++) {
							if (hs[i]._tempName) {
								switch (item) {
									case 'default':
									case 'horizon':
									case 'image':
										ui.create.cardTempName(hs[i]);
										break;
									default:
										hs[i]._tempName.delete();
										delete hs[i]._tempName;
								}
							}
						}
					}
				},
				/*textequip:{
					name:'装备显示',
					init:'image',
					unfrequent:true,
					item:{
						image:'图片',
						text:'文字',
					},
					onclick:function(item){
						game.saveConfig('textequip',item);
						if(item=='text'&&(game.layout=='long'||game.layout=='mobile')){
							ui.arena.classList.add('textequip');
						}
						else{
							ui.arena.classList.remove('textequip');
						}
					}
				},*/
				buttoncharacter_style: {
					name: '选将样式',
					init: 'default',
					item: {
						default: '默认',
						simple: '精简',
						old: '旧版'
					},
					unfrequent: true,
				},
				buttoncharacter_prefix: {
					name: '武将前缀',
					init: 'default',
					item: {
						default: '默认',
						simple: '不显示颜色',
						off: '不显示前缀'
					},
					unfrequent: true,
				},
				cursor_style: {
					name: '鼠标指针',
					init: 'auto',
					intro: '设置为固定后鼠标指针将不随移动到的区域而变化',
					unfrequent: true,
					item: {
						auto: '自动',
						pointer: '固定'
					},
					onclick: function (item) {
						game.saveConfig('cursor_style', item);
						if (item == 'pointer') {
							ui.window.classList.add('nopointer');
						}
						else {
							ui.window.classList.remove('nopointer');
						}
					}
				},
				name_font: {
					name: '人名字体',
					init: 'xingkai',
					unfrequent: true,
					item: {},
					textMenu: function (node, link) {
						if (link != 'default') {
							node.style.fontFamily = link;
						}
						node.style.fontSize = '20px';
					},
					onclick: function (font) {
						game.saveConfig('name_font', font);
						lib.init.cssstyles();
					}
				},
				identity_font: {
					name: '身份字体',
					init: 'huangcao',
					unfrequent: true,
					item: {},
					textMenu: function (node, link) {
						if (link != 'default') {
							node.style.fontFamily = link;
						}
						node.style.fontSize = '20px';
					},
					onclick: function (font) {
						game.saveConfig('identity_font', font);
						lib.init.cssstyles();
					}
				},
				cardtext_font: {
					name: '卡牌字体',
					init: 'default',
					unfrequent: true,
					item: {},
					textMenu: function (node, link) {
						if (link != 'default') {
							node.style.fontFamily = link;
						}
						node.style.fontSize = '20px';
					},
					onclick: function (font) {
						game.saveConfig('cardtext_font', font);
						lib.init.cssstyles();
					}
				},
				global_font: {
					name: '界面字体',
					init: 'default',
					unfrequent: true,
					item: {},
					textMenu: function (node, link) {
						if (link != 'default') {
							node.style.fontFamily = link;
						}
						else {
							node.style.fontFamily = "'STHeiti','SimHei','Microsoft JhengHei','Microsoft YaHei','WenQuanYi Micro Hei','Suits',Helvetica,Arial,sans-serif";
						}
						node.style.fontSize = '20px';
					},
					onclick: function (font) {
						game.saveConfig('global_font', font);
						lib.init.cssstyles();
					}
				},
				suits_font: {
					name: '替换花色字体',
					init: true,
					unfrequent: true,
					intro: '使用全角字符的花色替代系统自带的花色（重启游戏后生效）',
					onclick: function (bool) {
						game.saveConfig('suits_font', bool);
					}
				},
				update: function (config, map) {
					if (lib.config.custom_button) {
						map.custom_button_system_top.show();
						map.custom_button_system_bottom.show();
						map.custom_button_control_top.show();
						map.custom_button_control_bottom.show();
					}
					else {
						map.custom_button_system_top.hide();
						map.custom_button_system_bottom.hide();
						map.custom_button_control_top.hide();
						map.custom_button_control_bottom.hide();
					}
					if (lib.config.change_skin) {
						map.change_skin_auto.show();
					}
					else {
						map.change_skin_auto.hide();
					}
					if (lib.config.image_background_random) {
						map.image_background_blur.show();
						map.image_background.hide();
						// map.import_background.hide();
					}
					else {
						map.image_background.show();
						if (lib.config.image_background == 'default') {
							map.image_background_blur.hide();
						}
						else {
							map.image_background_blur.show();
						}
						// if(lib.config.image_background=='custom'&&lib.db){
						// 	map.import_background.show();
						// }
						// else{
						// 	map.import_background.hide();
						// }
					}
					if (lib.config.layout == 'long' || lib.config.layout == 'mobile') {
						//map.textequip.show();
						map.cardshape.show();
						map.phonelayout.show();
					}
					else {
						//map.textequip.hide();
						if (lib.config.layout == 'long2' || lib.config.layout == 'nova') {
							map.phonelayout.show();
							map.cardshape.show();
						}
						else {
							map.phonelayout.hide();
							map.cardshape.hide();
						}
					}
					if (lib.config.layout == 'long') {
						// map.fewplayer.show();
						map.player_height.show();
					}
					else {
						// map.fewplayer.hide();
						if (lib.config.layout == 'long2') {
							map.player_height.show();
						}
						else {
							map.player_height.hide();
						}
					}
					if (lib.config.layout == 'nova') {
						map.player_height_nova.show();
					}
					else {
						map.player_height_nova.hide();
					}
					if (lib.config.touchscreen) {
						map.cursor_style.hide();
					}
					else {
						map.cursor_style.show();
					}
					if (lib.config.border_style == 'auto') {
						map.autoborder_count.show();
						map.autoborder_start.show();
					}
					else {
						map.autoborder_count.hide();
						map.autoborder_start.hide();
					}
				},
			}
		},
		view: {
			name: '显示',
			config: {
				update: function (config, map) {
					if (lib.config.mode == 'versus' || lib.config.mode == 'chess' || lib.config.mode == 'tafang' || lib.config.mode == 'boss') {
						map.show_handcardbutton.show();
					}
					else {
						map.show_handcardbutton.hide();
					}
					if (lib.config.touchscreen) {
						map.pop_logv.hide();
					}
					else {
						map.pop_logv.show();
					}
					if (lib.device) {
						if (lib.device == 'android') {
							map.show_statusbar_android.show();
							map.show_statusbar_ios.hide();
						}
						else if (lib.device == 'ios') {
							map.show_statusbar_ios.show();
							map.show_statusbar_android.hide();
						}
						if (!game.download) {
							setTimeout(function () {
								if (!window.StatusBar) {
									map.show_statusbar.hide();
								}
							}, 5000);
						}
					}
					else {
						map.show_statusbar_ios.hide();
						map.show_statusbar_android.hide();
					}
					if (get.is.phoneLayout()) {
						map.remember_round_button.show();
						map.popequip.show();
						map.filternode_button.show();
						map.show_pause.hide();
						map.show_auto.hide();
						map.show_replay.hide();
						map.show_round_menu.show();
					}
					else {
						map.show_pause.show();
						map.show_auto.show();
						map.show_replay.show();
						map.show_round_menu.hide();
						map.remember_round_button.hide();
						map.popequip.hide();
						map.filternode_button.hide();
					}
					if (lib.config.show_card_prompt) {
						map.hide_card_prompt_basic.show();
						map.hide_card_prompt_equip.show();
					}
					else {
						map.hide_card_prompt_basic.hide();
						map.hide_card_prompt_equip.hide();
					}
					if (lib.config.show_log != 'off') {
						map.clear_log.show();
					}
					else {
						map.clear_log.hide();
					}
					if (get.is.phoneLayout()) {
						map.show_time2.show();
						map.show_time.hide();
						if (lib.config.show_time2) {
							map.watchface.show();
						}
						else {
							map.watchface.hide();
						}
					}
					else {
						map.show_time2.hide();
						map.show_time.show();
						map.watchface.hide();
					}
					if (lib.config.show_extensionmaker) {
						map.show_extensionshare.show();
					}
					else {
						map.show_extensionshare.hide();
					}
				},
				show_history: {
					name: '出牌记录栏',
					init: 'off',
					intro: '在屏幕左侧或右侧显示出牌记录',
					unfrequent: true,
					item: {
						off: '关闭',
						left: '靠左',
						right: '靠右',
					},
					onclick: function (bool) {
						if (lib.config.show_history == 'right') ui.window.animate('rightbar2');
						game.saveConfig('show_history', bool);
						if (_status.video || !_status.prepareArena) return;
						if (bool == 'left') {
							ui.window.classList.add('leftbar');
							ui.window.classList.remove('rightbar');
						}
						else if (bool == 'right') {
							ui.window.classList.remove('leftbar');
							ui.window.classList.add('rightbar');
						}
						else {
							ui.window.classList.remove('leftbar');
							ui.window.classList.remove('rightbar');
						}
					}
				},
				pop_logv: {
					name: '自动弹出记录',
					init: false,
					unfrequent: true
				},
				show_log: {
					name: '历史记录栏',
					init: 'off',
					intro: '在屏幕中部显示出牌文字记录',
					unfrequent: true,
					item: {
						off: '关闭',
						left: '靠左',
						center: '居中',
						right: '靠右',
					},
					onclick: function (bool) {
						game.saveConfig('show_log', bool);
						if (lib.config.show_log != 'off') {
							ui.arenalog.style.display = '';
							ui.arenalog.dataset.position = bool;
						}
						else {
							ui.arenalog.style.display = 'none';
							ui.arenalog.innerHTML = '';
						}
					}
				},
				clear_log: {
					name: '自动清除历史记录',
					init: false,
					unfrequent: true,
					intro: '开启后将定时清除历史记录栏的条目（而不是等记录栏满后再清除）'
				},
				log_highlight: {
					name: '历史记录高亮',
					init: true,
					unfrequent: true,
					intro: '开启后历史记录不同类别的信息将以不同颜色显示',
				},
				show_time: {
					name: '显示时间',
					intro: '在屏幕顶部显示当前时间',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_time', bool);
						if (bool) {
							ui.time.style.display = '';
						}
						else {
							ui.time.style.display = 'none';
						}
					}
				},
				show_time2: {
					name: '显示时间',
					intro: '在触屏按钮处显示当前时间',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_time2', bool);
						if (bool) {
							ui.roundmenu.classList.add('clock');
						}
						else {
							ui.roundmenu.classList.remove('clock');
						}
					}
				},
				watchface: {
					name: '表盘样式',
					init: 'none',
					unfrequent: true,
					item: {
						none: '默认',
						simple: '简约',
					},
					onclick: function (item) {
						game.saveConfig('watchface', item);
						ui.roundmenu.dataset.watchface = item;
					}
				},
				show_time3: {
					name: '显示游戏时间',
					init: false,
					unfrequent: true
				},
				show_statusbar_android: {
					name: '显示状态栏',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_statusbar', bool);
						if (window.StatusBar && lib.device == 'android') {
							if (bool) {
								window.StatusBar.overlaysWebView(false);
								window.StatusBar.backgroundColorByName('black');
								window.StatusBar.show();
							}
							else {
								window.StatusBar.hide();
							}
						}
					}
				},
				show_statusbar_ios: {
					name: '显示状态栏',
					init: 'off',
					unfrequent: true,
					item: {
						default: '默认',
						overlay: '嵌入',
						auto: '自动',
						off: '关闭'
					},
					onclick: function (bool) {
						game.saveConfig('show_statusbar_ios', bool);
						if (window.StatusBar && lib.device == 'ios') {
							if (bool != 'off' && bool != 'auto') {
								if (lib.config.show_statusbar_ios == 'default') {
									window.StatusBar.overlaysWebView(false);
									document.body.classList.remove('statusbar');
								}
								else {
									window.StatusBar.overlaysWebView(true);
									document.body.classList.add('statusbar');
								}
								window.StatusBar.backgroundColorByName('black');
								window.StatusBar.show();
							}
							else {
								document.body.classList.remove('statusbar');
								window.StatusBar.hide();
							}
						}
					}
				},
				show_card_prompt: {
					name: '显示出牌信息',
					intro: '出牌时在使用者上显示卡牌名称',
					init: true,
					unfrequent: true,
				},
				hide_card_prompt_basic: {
					name: '隐藏基本牌信息',
					intro: '不显示基本牌名称',
					init: false,
					unfrequent: true,
				},
				hide_card_prompt_equip: {
					name: '隐藏装备牌信息',
					intro: '不显示装备牌名称',
					init: false,
					unfrequent: true,
				},
				show_phase_prompt: {
					name: '显示阶段信息',
					intro: '在当前回合不同阶段开始时显示阶段名称',
					init: true,
					unfrequent: true,
				},
				show_phaseuse_prompt: {
					name: '出牌阶段提示',
					intro: '在你出牌时显示提示文字',
					init: true,
					unfrequent: true,
				},
				auto_popped_config: {
					name: '自动弹出选项',
					intro: '鼠标移至选项按钮时弹出模式选择菜单',
					init: true,
					unfrequent: true,
				},
				auto_popped_history: {
					name: '自动弹出历史',
					intro: '鼠标移至暂停按钮时弹出历史记录菜单',
					init: false,
					unfrequent: true,
				},
				show_round_menu: {
					name: '显示触屏按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						if (get.is.nomenu('show_round_menu', bool)) return false;
						game.saveConfig('show_round_menu', bool);
						if (bool && ui.roundmenu) {
							ui.roundmenu.style.display = '';
						}
						else {
							ui.roundmenu.style.display = 'none';
							alert('关闭触屏按钮后可通过手势打开菜单（默认为下划）');
						}
					}
				},
				remember_round_button: {
					name: '记住按钮位置',
					intro: '重新开始后触屏按钮将保存的上一局的位置',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('remember_round_button', bool);
						if (!bool) {
							ui.click.resetround();
						}
					}
				},
				remember_dialog: {
					name: '记住对话框位置',
					intro: '移动对话框后新的对话框也将在移动后的位置显示',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('remember_dialog', bool);
						if (!bool) {
							if (ui.dialog) {
								var dialog = ui.dialog;
								dialog.style.transform = '';
								dialog._dragtransform = [0, 0];
								dialog.style.transition = 'all 0.3s';
								dialog._dragtouches;
								dialog._dragorigin;
								dialog._dragorigintransform;
								setTimeout(function () {
									dialog.style.transition = '';
								}, 500);
							}
							game.saveConfig('dialog_transform', [0, 0]);
						}
					}
				},
				transparent_dialog: {
					name: '堆叠对话框虚化',
					init: false,
					intro: '当具有static属性的对话框堆叠（如五谷丰登对话框中提示无懈可击）时，将后方的对话框变为半透明',
					onclick: function (bool) {
						game.saveConfig('transparent_dialog', bool);
						if (bool) {
							for (var i = 0; i < ui.dialogs.length; i++) {
								if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
									ui.dialogs[i].unfocus();
								}
							}
						}
						else {
							for (var i = 0; i < ui.dialogs.length; i++) {
								if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
									ui.dialogs[i].refocus();
								}
							}
						}
					}
				},
				show_rarity: {
					name: '显示武将评级',
					init: false,
					intro: '仅供娱乐，重启后生效',
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_rarity', bool);
					}
				},
				mark_identity_style: {
					name: '标记身份操作',
					intro: '设置单击身份按钮时的操作',
					unfrequent: true,
					init: 'menu',
					item: {
						menu: '菜单',
						click: '单击',
					},
				},
				character_dialog_tool: {
					name: '自由选将显示',
					intro: '点击自由选将时默认显示的条目',
					init: '最近',
					item: {
						'收藏': '收藏',
						'最近': '最近',
						'all': '全部'
					},
					unfrequent: true,
				},
				recent_character_number: {
					name: '最近使用武将',
					intro: '自由选将对话框中最近使用武将的数量',
					init: '12',
					item: {
						'6': '6',
						'12': '12',
						'20': '24',
						'30': '36',
					},
					unfrequent: true
				},
				popequip: {
					name: '触屏装备选择',
					intro: '设置触屏布局中选择装备的方式',
					init: true,
					unfrequent: true,
				},
				filternode_button: {
					name: '触屏筛选按钮',
					intro: '设置自由选将对话框中筛选按钮的样式',
					init: true,
					unfrequent: true,
				},
				show_charactercard: {
					name: '显示武将资料',
					intro: '在武将界面单击时弹出武将资料卡',
					init: true,
					unfrequent: true
				},
				show_favourite: {
					name: '显示添加收藏',
					intro: '在角色的右键菜单中显示添加收藏',
					init: false,
					unfrequent: true
				},
				show_favmode: {
					name: '显示模式收藏',
					intro: '快捷菜单中显示收藏模式',
					init: true,
					unfrequent: true
				},
				show_favourite_menu: {
					name: '显示收藏菜单',
					intro: '在选项-武将中显示收藏一栏',
					init: true,
					unfrequent: true
				},
				show_ban_menu: {
					name: '显示禁将菜单',
					intro: '在选项-武将中显示禁将一栏',
					init: true,
					unfrequent: true
				},
				right_range: {
					name: '显示距离信息',
					intro: '在角色的右键菜单中显示距离等信息',
					init: true,
					unfrequent: true
				},
				hide_card_image: {
					name: '隐藏卡牌背景',
					intro: '所有卡牌将使用文字作为背景',
					init: false,
					unfrequent: true,
					restart: true,
				},
				show_name: {
					name: '显示角色名称',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_name', bool);
						if (bool) {
							ui.arena.classList.remove('hide_name');
						}
						else {
							ui.arena.classList.add('hide_name');
						}
					}
				},
				show_sex: {
					name: '显示角色性别',
					intro: '在角色的右键菜单中显示角色性别',
					init: true,
					unfrequent: true
				},
				show_group: {
					name: '显示角色势力',
					intro: '在角色的右键菜单中显示角色势力',
					init: true,
					unfrequent: true
				},
				show_replay: {
					name: '显示重来按钮',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_replay', bool);
						if (lib.config.show_replay) {
							ui.replay.style.display = '';
						}
						else {
							ui.replay.style.display = 'none';
						}
					}
				},
				show_playerids: {
					name: '显示身份按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_playerids', bool);
						if (lib.config.show_playerids) {
							ui.playerids.style.display = '';
						}
						else {
							ui.playerids.style.display = 'none';
						}
					}
				},
				show_sortcard: {
					name: '显示整理手牌按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_sortcard', bool);
						if (lib.config.show_sortcard) {
							ui.sortCard.style.display = '';
						}
						else {
							ui.sortCard.style.display = 'none';
						}
					}
				},
				show_pause: {
					name: '显示暂停按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_pause', bool);
						if (lib.config.show_pause) {
							ui.pause.style.display = '';
						}
						else {
							ui.pause.style.display = 'none';
						}
					}
				},
				show_auto: {
					name: '显示托管按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_auto', bool);
						if (lib.config.show_auto) {
							ui.auto.style.display = '';
						}
						else {
							ui.auto.style.display = 'none';
						}
					}
				},
				show_volumn: {
					name: '显示音量按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_volumn', bool);
						if (lib.config.show_volumn) {
							ui.volumn.style.display = '';
						}
						else {
							ui.volumn.style.display = 'none';
						}
					}
				},
				show_cardpile: {
					name: '显示牌堆按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_cardpile', bool);
						if (bool) {
							ui.cardPileButton.style.display = '';
						}
						else {
							ui.cardPileButton.style.display = 'none';
						}
					}
				},
				show_cardpile_number: {
					name: '显示剩余牌数',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_cardpile_number', bool);
						if (bool) {
							ui.cardPileNumber.style.display = '';
						}
						else {
							ui.cardPileNumber.style.display = 'none';
						}
					}
				},
				show_handcardbutton: {
					name: '显示手牌按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_handcardbutton', bool);
					}
				},
				show_giveup: {
					name: '显示投降按钮',
					init: true,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_giveup', bool);
					}
				},
				show_wuxie: {
					name: '显示无懈按钮',
					intro: '在右上角显示不询问无懈',
					init: false,
					unfrequent: true,
					onclick: function (bool) {
						game.saveConfig('show_wuxie', bool);
						if (lib.config.show_wuxie) {
							ui.wuxie.style.display = '';
						}
						else {
							ui.wuxie.style.display = 'none';
						}
					}
				},
				wuxie_right: {
					name: '无懈按钮靠左',
					init: true,
					unfrequent: true,
				},
				show_discardpile: {
					name: '暂停时显示弃牌堆',
					init: false,
					unfrequent: true,
				},
				show_extensionmaker: {
					name: '显示制作扩展',
					init: true,
					unfrequent: true,
				},
				show_extensionshare: {
					name: '显示分享扩展',
					init: true,
					unfrequent: true,
				},
				show_characternamepinyin: {
					name: '显示武将名注解',
					intro: '在武将资料卡显示武将名及其注解、性别、势力、体力等信息',
					init: 'showPinyin',
					unfrequent: true,
					item: {
						doNotShow: '不显示',
						showPinyin: '拼音(样式一)',
						showCodeIdentifier: '代码ID(样式一)',
						showPinyin2: '拼音(样式二)',
						showCodeIdentifier2: '代码ID(样式二)',
					},
					visualMenu: (node, link, name) => {
						node.classList.add('button', 'character');
						const style = node.style;
						style.alignItems = 'center';
						style.animation = 'background-position-left-center-right-center-left-center 15s ease infinite';
						style.background = 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)';
						style.backgroundSize = '400% 400%';
						style.display = 'flex';
						style.height = '60px';
						style.justifyContent = 'center';
						style.width = '180px';
						const firstChild = node.firstChild;
						firstChild.removeAttribute('class');
						firstChild.style.position = 'initial';
						if (link == 'doNotShow') return;
						const ruby = document.createElement('ruby');
						ruby.textContent = name;
						const rt = document.createElement('rt');
						rt.style.fontSize = 'smaller';
						if (link == 'showPinyin2' || link == 'showCodeIdentifier2') {
							rt.textContent = link == 'showCodeIdentifier2' ? '[' + link + ']' : '[' + get.pinyin(name) + ']';
							ruby.appendChild(rt);
						} else {
							const leftParenthesisRP = document.createElement('rp');
							leftParenthesisRP.textContent = '（';
							ruby.appendChild(leftParenthesisRP);
							rt.textContent = link == 'showCodeIdentifier' ? link : get.pinyin(name).join(' ');
							ruby.appendChild(rt);
							const rightParenthesisRP = document.createElement('rp');
							rightParenthesisRP.textContent = '）';
							ruby.appendChild(rightParenthesisRP);
						}
						firstChild.innerHTML = ruby.outerHTML;
					}
				},
				show_skillnamepinyin: {
					name: '显示技能名注解',
					intro: '在武将资料卡显示技能名注解',
					get init() {
						return lib.configMenu.view.config.show_characternamepinyin.init;
					},
					get unfrequent() {
						return lib.configMenu.view.config.show_characternamepinyin.unfrequent;
					},
					get item() {
						return lib.configMenu.view.config.show_characternamepinyin.item;
					},
					get visualMenu() {
						return lib.configMenu.view.config.show_characternamepinyin.visualMenu;
					}
				}
			}
		},
		audio: {
			name: '音效',
			config: {
				update: function (config, map) {
					if (lib.config.background_music == 'music_custom' && (lib.device || lib.node)) {
						map.import_music.show();
					}
					else {
						map.import_music.hide();
					}
					map.clear_background_music[get.is.object(lib.config.customBackgroundMusic) ? 'show' : 'hide']();
					ui.background_music_setting = map.background_music;
					map.background_music._link.config.updatex.call(map.background_music, []);
				},
				background_music: {
					updatex: function () {
						this.lastChild.innerHTML = this._link.config.item[lib.config.background_music];
						var menu = this._link.menu;
						for (var i = 0; i < menu.childElementCount; i++) {
							if (!['music_off', 'music_custom', 'music_random'].concat(lib.config.all.background_music).contains(menu.childNodes[i]._link)) menu.childNodes[i].delete();
						}
					},
					name: '背景音乐',
					init: true,
					item: {
						music_default: '默认',
					},
					onclick: function (item) {
						game.saveConfig('background_music', item);
						game.playBackgroundMusic();
					}
				},
				import_music: {
					name: '<div style="white-space:nowrap;width:calc(100% - 5px)">' +
						'<input type="file" style="width:calc(100% - 40px)" accept="audio/*">' +
						'<button style="width:40px">确定</button></div>',
					clear: true,
				},
				background_audio: {
					name: '游戏音效',
					init: true,
				},
				background_speak: {
					name: '人物配音',
					init: true,
				},
				equip_audio: {
					name: '装备配音',
					init: false,
				},
				repeat_audio: {
					name: '播放重复语音',
					init: false,
				},
				volumn_audio: {
					name: '音效音量',
					init: 8,
					item: {
						'0': '〇',
						'1': '一',
						'2': '二',
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'7': '七',
						'8': '八',
					},
					onclick: function (volume) {
						game.saveConfig('volumn_audio', parseInt(volume));
					}
				},
				volumn_background: {
					name: '音乐音量',
					init: 8,
					item: {
						'0': '〇',
						'1': '一',
						'2': '二',
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'7': '七',
						'8': '八',
					},
					onclick: function (volume) {
						game.saveConfig('volumn_background', parseInt(volume));
						ui.backgroundMusic.volume = volume / 8;
					}
				},
				clear_background_music: {
					name: '清除自定义背景音乐',
					clear: true,
					onclick: function () {
						if (confirm('是否清除已导入的所有自定义背景音乐？（该操作不可撤销！）')) {
							for (var i in lib.config.customBackgroundMusic) {
								lib.config.all.background_music.remove(i);
								if (i.startsWith('cdv_')) {
									game.removeFile('audio/background/' + i + '.mp3');
								}
								else {
									game.deleteDB('audio', i);
								}
							}
							lib.config.customBackgroundMusic = null;
							game.saveConfig('customBackgroundMusic', null);
							game.saveConfig('background_music', 'music_off');
							if (!_status._aozhan) game.playBackgroundMusic();
						}
					},
				},
			}
		},
		skill: {
			name: '技能',
			config: {
				update: function (config, map) {
					for (var i in map) {
						if (map[i]._link.config.type == 'autoskill') {
							if (!lib.config.autoskilllist.contains(i)) {
								map[i].classList.add('on');
							}
							else {
								map[i].classList.remove('on');
							}
						}
						else if (map[i]._link.config.type == 'banskill') {
							if (!lib.config.forbidlist.contains(i)) {
								map[i].classList.add('on');
							}
							else {
								map[i].classList.remove('on');
							}
						}
					}
				}
			}
		},
		others: {
			name: '其它',
			config: {
				// reset_database:{
				// 	name:'重置游戏',
				// 	onclick:function(){
				// 		var node=this;
				// 		if(node._clearing){
				// 			if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
				// 			game.reload();
				// 			return;
				// 		}
				// 		node._clearing=true;
				// 		node.innerHTML='单击以确认 (3)';
				// 		setTimeout(function(){
				// 			node.innerHTML='单击以确认 (2)';
				// 			setTimeout(function(){
				// 				node.innerHTML='单击以确认 (1)';
				// 				setTimeout(function(){
				// 					node.innerHTML='重置游戏录像';
				// 					delete node._clearing;
				// 				},1000);
				// 			},1000);
				// 		},1000);
				// 	},
				// 	clear:true
				// },
				reset_game: {
					name: '重置游戏设置',
					onclick: function () {
						var node = this;
						if (node._clearing) {
							var noname_inited = localStorage.getItem('noname_inited');
							var onlineKey = localStorage.getItem(lib.configprefix + 'key');
							localStorage.clear();
							if (noname_inited) {
								localStorage.setItem('noname_inited', noname_inited);
							}
							if (onlineKey) {
								localStorage.setItem(lib.configprefix + 'key', onlineKey);
							}
							game.deleteDB('config');
							game.deleteDB('data');
							game.reload();
							return;
						}
						node._clearing = true;
						node.firstChild.innerHTML = '单击以确认 (3)';
						setTimeout(function () {
							node.firstChild.innerHTML = '单击以确认 (2)';
							setTimeout(function () {
								node.firstChild.innerHTML = '单击以确认 (1)';
								setTimeout(function () {
									node.firstChild.innerHTML = '重置游戏设置';
									delete node._clearing;
								}, 1000);
							}, 1000);
						}, 1000);
					},
					clear: true
				},
				reset_hiddenpack: {
					name: '重置隐藏内容',
					onclick: function () {
						if (this.firstChild.innerHTML != '已重置') {
							this.firstChild.innerHTML = '已重置';
							game.saveConfig('hiddenModePack', []);
							game.saveConfig('hiddenCharacterPack', []);
							game.saveConfig('hiddenCardPack', []);
							game.saveConfig('hiddenPlayPack', []);
							game.saveConfig('hiddenBackgroundPack', []);
							var that = this;
							setTimeout(function () {
								that.firstChild.innerHTML = '重置隐藏内容';
								setTimeout(function () {
									if (confirm('是否重新启动使改变生效？')) {
										game.reload();
									}
								});
							}, 500);
						}
					},
					clear: true
				},
				reset_tutorial: {
					name: '重置新手向导',
					onclick: function () {
						if (this.firstChild.innerHTML != '已重置') {
							this.firstChild.innerHTML = '已重置';
							game.saveConfig('new_tutorial', false);
							game.saveConfig('prompt_hidebg');
							game.saveConfig('prompt_hidepack');
							var that = this;
							setTimeout(function () {
								that.firstChild.innerHTML = '重置新手向导';
							}, 500);
						}
					},
					clear: true
				},
				import_data: {
					name: '导入游戏设置',
					onclick: function () {
						ui.import_data_button.classList.toggle('hidden');
					},
					clear: true
				},
				import_data_button: {
					name: '<div style="white-space:nowrap;width:calc(100% - 10px)">' +
						'<input type="file" accept="*/*" style="width:calc(100% - 40px)">' +
						'<button style="width:40px">确定</button></div>',
					clear: true,
				},
				export_data: {
					name: '导出游戏设置',
					onclick: function () {
						var data;
						var export_data = function (data) {
							game.export(lib.init.encode(JSON.stringify(data)), '无名杀 - 数据 - ' + (new Date()).toLocaleString());
						};
						if (!lib.db) {
							data = {};
							for (var i in localStorage) {
								if (i.startsWith(lib.configprefix)) {
									data[i] = localStorage[i];
								}
							}
							export_data(data);
						}
						else {
							game.getDB('config', null, function (data1) {
								game.getDB('data', null, function (data2) {
									export_data({
										config: data1,
										data: data2
									});
								});
							});
						}

					},
					clear: true
				},
				redownload_game: {
					name: '重新下载游戏',
					onclick: function () {
						var node = this;
						if (node._clearing) {
							localStorage.removeItem('noname_inited');
							game.reload();
							return;
						}
						node._clearing = true;
						node.firstChild.innerHTML = '单击以确认 (3)';
						setTimeout(function () {
							node.firstChild.innerHTML = '单击以确认 (2)';
							setTimeout(function () {
								node.firstChild.innerHTML = '单击以确认 (1)';
								setTimeout(function () {
									node.firstChild.innerHTML = '重新下载游戏';
									delete node._clearing;
								}, 1000);
							}, 1000);
						}, 1000);
					},
					clear: true
				},
				update: function (config, map) {
					if (lib.device || lib.node) {
						map.redownload_game.show();
					}
					else {
						map.redownload_game.hide();
					}
				}
				// trim_game:{
				// 	name:'隐藏非官方扩展包',
				// 	onclick:function(){
				// 		if(this.innerHTML!='已隐藏'){
				// 			this.innerHTML='已隐藏';
				//      						 var pack=lib.config.all.cards.slice(0);
				//      						 if(Array.isArray(lib.config.hiddenCardPack)){
				//      									  for(var i=0;i<lib.config.hiddenCardPack.length;i++){
				//      															pack.add(lib.config.hiddenCardPack[i]);
				//      									  }
				//      						 }
				//      						 for(var i=0;i<pack.length;i++){
				//      									  if(lib.config.all.sgscards.contains(pack[i])){
				//      															pack.splice(i--,1);
				//      									  }
				//      						 }
				// 			game.saveConfig('hiddenCardPack',pack);
				//
				//      						 var pack=lib.config.all.characters.slice(0);
				//      						 if(Array.isArray(lib.config.hiddenCharacterPack)){
				//      									  for(var i=0;i<lib.config.hiddenCharacterPack.length;i++){
				//      															pack.add(lib.config.hiddenCharacterPack[i]);
				//      									  }
				//      						 }
				//      						 for(var i=0;i<pack.length;i++){
				//      									  if(lib.config.all.sgscharacters.contains(pack[i])){
				//      															pack.splice(i--,1);
				//      									  }
				//      						 }
				// 			game.saveConfig('hiddenCharacterPack',pack);
				//
				//      						 var pack=lib.config.all.mode.slice(0);
				//      						 if(Array.isArray(lib.config.hiddenModePack)){
				//      									  for(var i=0;i<lib.config.hiddenModePack.length;i++){
				//      															pack.add(lib.config.hiddenModePack[i]);
				//      									  }
				//      						 }
				//      						 for(var i=0;i<pack.length;i++){
				//      									  if(lib.config.all.sgsmodes.contains(pack[i])){
				//      															pack.splice(i--,1);
				//      									  }
				//      						 }
				// 			game.saveConfig('hiddenModePack',pack);
				//
				// 			var that=this;
				// 			setTimeout(function(){
				// 				that.innerHTML='隐藏非官方扩展包';
				// 			},500);
				// 		}
				// 	},
				// 	clear:true
				// }
			}
		}
	};
	static extensionMenu = {
		cardpile: {
			enable: {
				name: '开启',
				init: false,
				restart: true,
			},
			intro: {
				name: '将杀闪等牌在牌堆中的比例维持在与军争牌堆相同，防止开启扩展包后被过多地稀释',
				clear: true,
				nopointer: true,
			},
			sha: {
				name: '杀',
				init: '1',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			huosha: {
				name: '火杀',
				init: '1',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			leisha: {
				name: '雷杀',
				init: '1',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			shan: {
				name: '闪',
				init: '1',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			tao: {
				name: '桃',
				init: '0',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			jiu: {
				name: '酒',
				init: '0',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			wuxie: {
				name: '无懈可击',
				init: '0.5',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			nanman: {
				name: '南蛮入侵',
				init: '0',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			wanjian: {
				name: '万箭齐发',
				init: '0',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			guohe: {
				name: '过河拆桥',
				init: '0',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			shunshou: {
				name: '顺手牵羊',
				init: '0',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			tiesuo: {
				name: '铁索连环',
				init: '0',
				item: {
					'1': '补充全部',
					'0.5': '补充一半',
					'0': '不补充'
				}
			},
			hide: {
				name: '隐藏此扩展',
				clear: true,
				onclick: function () {
					if (this.firstChild.innerHTML == '隐藏此扩展') {
						this.firstChild.innerHTML = '此扩展将在重启后隐藏';
						lib.config.hiddenPlayPack.add('cardpile');
						if (!lib.config.prompt_hidepack) {
							alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
							game.saveConfig('prompt_hidepack', true);
						}
					}
					else {
						this.firstChild.innerHTML = '隐藏此扩展';
						lib.config.hiddenPlayPack.remove('cardpile');
					}
					game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
				}
			},
		},
		boss: {
			enable: {
				name: '开启',
				init: false,
				restart: true,
				onswitch: function (bool) {
					if (bool) {
						var storage = { boss: {}, versus: {}, translate: {} };
						var loadversus = function () {
							game.loadModeAsync('versus', function (mode) {
								for (var i in mode.translate) {
									storage.translate[i] = mode.translate[i];
								}
								for (var i in mode.jiangeboss) {
									if (mode.jiangeboss[i][4].contains('bossallowed')) {
										storage.versus[i] = mode.jiangeboss[i];
									}
								}
								localStorage.setItem('boss_storage_playpackconfig', JSON.stringify(storage));
							});
						};
						game.loadModeAsync('boss', function (mode) {
							for (var i in mode.translate) {
								storage.translate[i] = mode.translate[i];
							}
							for (var i in mode.characterPack.mode_boss) {
								if (mode.characterPack.mode_boss[i][4].contains('bossallowed')) {
									storage.boss[i] = mode.characterPack.mode_boss[i];
								}
							}
							loadversus();
						});
					}
					else {
						localStorage.removeItem('boss_storage_playpackconfig');
					}
				}
			},
			intro: {
				name: '将剑阁和挑战模式的武将添加到其它模式',
				clear: true,
				nopointer: true,
			},
			enableai: {
				name: '随机选将可用',
				init: false
			},
			hide: {
				name: '隐藏此扩展',
				clear: true,
				onclick: function () {
					if (this.firstChild.innerHTML == '隐藏此扩展') {
						this.firstChild.innerHTML = '此扩展将在重启后隐藏';
						lib.config.hiddenPlayPack.add('boss');
						if (!lib.config.prompt_hidepack) {
							alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
							game.saveConfig('prompt_hidepack', true);
						}
					}
					else {
						this.firstChild.innerHTML = '隐藏此扩展';
						lib.config.hiddenPlayPack.remove('boss');
					}
					game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
				}
			},
		},
		wuxing: {
			enable: {
				name: '开启',
				init: false,
				restart: true,
			},
			intro: {
				name: '每名角色和部分卡牌在游戏开始时随机获得一个属性',
				clear: true,
				nopointer: true,
			},
			num: {
				name: '带属性卡牌',
				init: '0.3',
				item: {
					'0.1': '10%',
					'0.2': '20%',
					'0.3': '30%',
					'0.5': '50%',
				}
			},
			hide: {
				name: '隐藏此扩展',
				clear: true,
				onclick: function () {
					if (this.firstChild.innerHTML == '隐藏此扩展') {
						this.firstChild.innerHTML = '此扩展将在重启后隐藏';
						lib.config.hiddenPlayPack.add('wuxing');
						if (!lib.config.prompt_hidepack) {
							alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
							game.saveConfig('prompt_hidepack', true);
						}
					}
					else {
						this.firstChild.innerHTML = '隐藏此扩展';
						lib.config.hiddenPlayPack.remove('wuxing');
					}
					game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
				}
			},
		},
		coin: {
			enable: {
				name: '开启',
				init: false,
				restart: true,
				onclick: function (bool) {
					if (bool) {
						lib.config.plays.add('coin');
					}
					else {
						lib.config.plays.remove('coin');
					}
					game.saveConfig('plays', lib.config.plays);
				}
			},
			intro: {
				name: '每完成一次对局，可获得一定数量的金币；金币可用于购买游戏特效',
				clear: true,
				nopointer: true,
			},
			display: {
				name: '金币显示',
				init: 'text',
				item: {
					symbol: '符号',
					text: '文字'
				},
				onclick: function (item) {
					game.saveConfig('coin_display_playpackconfig', item);
					if (game.changeCoin) game.changeCoin(0);
				}
			},
			canvas: {
				name: '特效置顶',
				init: false,
				onclick: function (bool) {
					game.saveConfig('coin_canvas_playpackconfig', bool);
					if (bool) {
						ui.window.classList.add('canvas_top');
					}
					else {
						ui.window.classList.remove('canvas_top');
					}
				}
			},
			hide: {
				name: '隐藏此扩展',
				clear: true,
				onclick: function () {
					if (this.firstChild.innerHTML == '隐藏此扩展') {
						this.firstChild.innerHTML = '此扩展将在重启后隐藏';
						lib.config.hiddenPlayPack.add('coin');
						if (!lib.config.prompt_hidepack) {
							alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
							game.saveConfig('prompt_hidepack', true);
						}
					}
					else {
						this.firstChild.innerHTML = '隐藏此扩展';
						lib.config.hiddenPlayPack.remove('coin');
					}
					game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
				}
			},
		},
	};
	static mode = {
		identity: {
			name: '身份',
			connect: {
				update: function (config, map) {
					if (config.connect_identity_mode == 'stratagem') {
						map.connect_round_one_use_fury.show();
					}
					else {
						map.connect_round_one_use_fury.hide();
					}
					if (config.connect_identity_mode == 'zhong') {
						map.connect_player_number.hide();
						map.connect_limit_zhu.hide();
						map.connect_enhance_zhu.hide();
						map.connect_double_nei.hide();
						map.connect_enable_commoner.hide();
						map.connect_enable_year_limit.show();
						map.connect_zhong_card.show();
						map.connect_special_identity.hide();
						map.connect_double_character.show();
					}
					else if (config.connect_identity_mode == 'stratagem') {
						map.connect_double_character.show();
						map.connect_player_number.show();
						map.connect_limit_zhu.hide();
						map.connect_enhance_zhu.hide();
						map.connect_double_nei.hide();
						map.connect_enable_commoner.hide();
						map.connect_enable_year_limit.show();
						map.connect_zhong_card.hide();
						map.connect_special_identity.hide();
					}
					else if (config.connect_identity_mode == 'purple') {
						map.connect_player_number.hide();
						map.connect_limit_zhu.hide();
						map.connect_enhance_zhu.hide();
						map.connect_double_nei.hide();
						map.connect_enable_commoner.hide();
						map.connect_enable_year_limit.hide();
						map.connect_zhong_card.hide();
						map.connect_special_identity.hide();
						map.connect_double_character.hide();
					}
					else {
						map.connect_double_character.show();
						map.connect_player_number.show();
						map.connect_limit_zhu.show();
						map.connect_enhance_zhu.show();
						map.connect_double_nei[config.connect_player_number != '2' && !config.connect_enable_commoner ? 'show' : 'hide']();
						map.connect_enable_commoner[config.connect_player_number != '2' && !config.connect_double_nei ? 'show' : 'hide']();
						map.connect_enable_year_limit.show();
						map.connect_zhong_card.hide();

						if (config.connect_player_number == '8') {
							map.connect_special_identity.show();
						}
						else {
							map.connect_special_identity.hide();
						}
					}
				},
				connect_identity_mode: {
					name: '游戏模式',
					init: 'normal',
					item: {
						normal: '标准',
						zhong: '明忠',
						stratagem: '谋攻',
						purple: '3v3v2',
					},
					restart: true,
					frequent: true,
					intro: '明忠模式和3v3v2模式详见帮助'
				},
				connect_player_number: {
					name: '游戏人数',
					init: '8',
					get item() {
						return lib.mode.identity.config.player_number.item;
					},
					frequent: true,
					restart: true,
				},
				connect_limit_zhu: {
					name: '常备主候选武将数',
					init: 'group',
					restart: true,
					item: {
						off: '不限制',
						group: '按势力筛选',
						'4': '四',
						'6': '六',
						'8': '八',
					},
				},
				connect_zhong_card: {
					name: '明忠卡牌替换',
					init: true,
					frequent: true,
					restart: true
				},
				connect_double_nei: {
					name: '双内奸',
					init: false,
					restart: true,
					// frequent:true,
					get intro() {
						return lib.mode.identity.config.double_nei.intro;
					}
				},
				connect_enable_commoner: {
					name: '启用平民',
					init: false,
					restart: true,
					frequent: false,
					get intro() {
						return lib.mode.identity.config.enable_commoner.intro;
					}
				},
				connect_double_character: {
					name: '双将模式',
					init: false,
					frequent: true,
					restart: true,
				},
				connect_change_card: {
					name: '启用手气卡',
					init: false,
					frequent: true,
					restart: true,
				},
				connect_special_identity: {
					name: '特殊身份',
					init: false,
					restart: true,
					frequent: true,
					intro: '开启后游戏中将增加军师、大将、贼首三个身份'
				},
				connect_enable_year_limit: {
					name: '启用年机制',
					init: false,
					restart: true,
					frequent: false,
					get intro() {
						return lib.mode.identity.config.enable_year_limit.intro;
					}
				},
				connect_round_one_use_fury: {
					name: '开启首轮强化卡牌',
					init: false,
					frequent: false,
					restart: true,
					intro: '谋攻篇规则为第二轮开始才可使用怒气强化卡牌，开启此选项从游戏开始即可强化卡牌。'
				},
				// connect_ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// connect_ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
				connect_enhance_zhu: {
					name: '加强主公',
					init: false,
					restart: true,
					intro: '为主公增加一个额外技能'
				},
			},
			config: {
				update: function (config, map) {
					if (config.identity_mode == 'stratagem') {
						map.round_one_use_fury.show();
						map.nei_auto_mark_camouflage.show();
					}
					else {
						map.round_one_use_fury.hide();
						map.nei_auto_mark_camouflage.hide();
					}
					if (config.identity_mode == 'zhong') {
						map.player_number.hide();
						map.enhance_zhu.hide();
						map.double_nei.hide();
						map.auto_identity.hide();
						map.choice_zhu.hide();
						map.limit_zhu.hide();
						map.choice_zhong.hide();
						map.choice_nei.hide();
						map.choice_fan.hide();
						map.enable_commoner.hide();
						map.choice_commoner.hide();
						map.enable_year_limit.show();
						map.ban_identity.hide();
						map.ban_identity2.hide();
						map.ban_identity3.hide();
						map.zhong_card.show();
						map.special_identity.hide();
						map.choose_group.show();
						map.change_choice.show();
						map.auto_mark_identity.show();
						map.double_character.show();
						map.free_choose.show();
						map.change_identity.show();
						if (config.double_character) {
							map.double_hp.show();
						}
						else {
							map.double_hp.hide();
						}
						map.continue_game.show();
					}
					else if (config.identity_mode == 'stratagem') {
						map.continue_game.show();
						map.player_number.show();
						map.enhance_zhu.hide();
						map.auto_identity.hide();
						if (config.player_number != '2') {
							map.double_nei.show();
						}
						else {
							map.double_nei.hide();
						}
						map.choice_zhu.show();
						map.limit_zhu.hide();
						map.choice_zhong.show();
						map.choice_nei.show();
						map.choice_fan.show();
						map.enable_commoner.hide();
						map.choice_commoner.hide();
						map.enable_year_limit.show();
						map.ban_identity.show();
						if (config.ban_identity == 'off') {
							map.ban_identity2.hide();
						}
						else {
							map.ban_identity2.show();
						}
						if (config.ban_identity == 'off' || config.ban_identity2 == 'off') {
							map.ban_identity3.hide();
						}
						else {
							map.ban_identity3.show();
						}
						map.zhong_card.hide();
						map.choose_group.show();
						map.auto_mark_identity.hide();
						map.change_choice.show();
						map.free_choose.show();
						map.change_identity.show();
						map.special_identity.hide();
						map.double_character.show();
						if (config.double_character) {
							map.double_hp.show();
						}
						else {
							map.double_hp.hide();
						}
					}
					else if (config.identity_mode == 'purple') {
						map.player_number.hide();
						map.enhance_zhu.hide();
						map.double_nei.hide();
						map.auto_identity.hide();
						map.choice_zhu.hide();
						map.limit_zhu.hide();
						map.choice_zhong.hide();
						map.choice_nei.hide();
						map.choice_fan.hide();
						map.enable_commoner.hide();
						map.choice_commoner.hide();
						map.enable_year_limit.hide();
						map.ban_identity.hide();
						map.ban_identity2.hide();
						map.ban_identity3.hide();
						map.zhong_card.hide();
						map.special_identity.hide();
						map.double_character.hide();
						map.double_hp.hide();
						map.choose_group.hide();
						map.auto_mark_identity.hide();
						map.change_choice.hide();
						map.free_choose.hide();
						map.change_identity.hide();
						map.continue_game.hide();
					}
					else {
						map.continue_game.show();
						map.player_number.show();
						map.enhance_zhu.show();
						map.auto_identity.show();
						map.double_nei[config.player_number != '2' && !config.enable_commoner ? 'show' : 'hide']();
						map.choice_zhu.show();
						map.limit_zhu.show();
						map.choice_zhong.show();
						map.choice_nei.show();
						map.choice_fan.show();
						map.enable_commoner[config.player_number != '2' && !config.double_nei ? 'show' : 'hide']();
						map.choice_commoner[config.enable_commoner ? 'show' : 'hide']();
						map.enable_year_limit.show();
						map.ban_identity.show();
						if (config.ban_identity == 'off') {
							map.ban_identity2.hide();
						}
						else {
							map.ban_identity2.show();
						}
						if (config.ban_identity == 'off' || config.ban_identity2 == 'off') {
							map.ban_identity3.hide();
						}
						else {
							map.ban_identity3.show();
						}
						map.zhong_card.hide();
						map.choose_group.show();
						map.auto_mark_identity.show();
						map.change_choice.show();
						map.free_choose.show();
						map.change_identity.show();
						if (config.player_number == '8') {
							map.special_identity.show();
						}
						else {
							map.special_identity.hide();
						}
						map.double_character.show();
						if (config.double_character) {
							map.double_hp.show();
						}
						else {
							map.double_hp.hide();
						}
					}
				},
				identity_mode: {
					name: '游戏模式',
					init: 'normal',
					item: {
						normal: '标准',
						zhong: '明忠',
						stratagem: '谋攻',
						purple: '3v3v2',
					},
					restart: true,
					frequent: true,
					intro: '明忠模式与谋攻模式详见帮助'
				},
				player_number: {
					name: '游戏人数',
					init: '8',
					get item() {
						const minimumNumberOfPlayers = 2, maximumNumberOfPlayers = Math.max(_status.maximumNumberOfPlayers || 10, minimumNumberOfPlayers), item = {};
						for (let playerNumber = minimumNumberOfPlayers; playerNumber <= maximumNumberOfPlayers; playerNumber++) {
							item[playerNumber] = `${get.cnNumber(playerNumber)}人`;
						}
						return item;
					},
					frequent: true,
					restart: true,
				},
				double_nei: {
					name: '双内奸',
					init: false,
					restart: true,
					frequent: true,
					intro: '若游戏人数不大于9，则开启后游戏中将有两个内奸（内奸胜利条件仍为主内1v1时击杀主公）'
				},
				choose_group: {
					name: '神武将选择势力',
					init: true,
					restart: true,
					frequent: true,
					intro: '若开启此选项，选择神武将的玩家需在亮出自己的武将牌之前为自己选择一个势力。'
				},
				nei_fullscreenpop: {
					name: '主内单挑特效',
					intro: '在进入主内单挑时，弹出全屏文字特效',
					init: true,
					unfrequent: true,
				},
				double_character: {
					name: '双将模式',
					init: false,
					frequent: true,
					restart: true,
				},
				special_identity: {
					name: '特殊身份',
					init: false,
					restart: true,
					frequent: true,
					intro: '开启后游戏中将增加军师、大将、贼首三个身份'
				},
				zhong_card: {
					name: '明忠卡牌替换',
					init: true,
					frequent: true,
					restart: true
				},
				double_hp: {
					name: '双将体力上限',
					init: 'pingjun',
					item: {
						hejiansan: '和减三',
						pingjun: '平均值',
						zuidazhi: '最大值',
						zuixiaozhi: '最小值',
						zonghe: '相加',
					},
					restart: true,
				},
				auto_identity: {
					name: '自动显示身份',
					item: {
						off: '关闭',
						one: '一轮',
						two: '两轮',
						three: '三轮',
						always: '始终'
					},
					init: 'off',
					onclick: function (bool) {
						game.saveConfig('auto_identity', bool, this._link.config.mode);
						if (get.config('identity_mode') == 'zhong') return;
						var num;
						switch (bool) {
							case '一轮': num = 1; break;
							case '两轮': num = 2; break;
							case '三轮': num = 3; break;
							default: num = 0; break;
						}
						if (num & !_status.identityShown && game.phaseNumber > game.players.length * num && game.showIdentity) {
							_status.identityShown = true;
							game.showIdentity(false);
						}
					},
					intro: '游戏进行若干轮将自动显示所有角色的身份',
				},
				auto_mark_identity: {
					name: '自动标记身份',
					init: true,
					intro: '根据角色的出牌行为自动标记可能的身份',
				},
				// ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
				enhance_zhu: {
					name: '加强主公',
					init: false,
					restart: true,
					intro: '为主公增加一个额外技能'
				},
				free_choose: {
					name: '自由选将',
					init: true,
					onclick: function (bool) {
						game.saveConfig('free_choose', bool, this._link.config.mode);
						if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
						else if (ui.cheat2 && !get.config('free_choose')) {
							ui.cheat2.close();
							delete ui.cheat2;
						}
					}
				},
				change_identity: {
					name: '自由选择身份和座位',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_identity', bool, this._link.config.mode);
						if (get.mode() != 'identity' || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						var dialog;
						if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
						else dialog = _status.event.dialog;
						if (!_status.brawl || !_status.brawl.noAddSetting) {
							if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
							else _status.event.getParent().removeSetting(dialog);
						}
						ui.update();
					}
				},
				change_choice: {
					name: '开启换将卡',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_choice', bool, this._link.config.mode);
						if (get.mode() != 'identity' || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
						else if (ui.cheat && !get.config('change_choice')) {
							ui.cheat.close();
							delete ui.cheat;
						}
					}
				},
				change_card: {
					name: '开启手气卡',
					init: 'disabled',
					item: {
						disabled: '禁用',
						once: '一次',
						twice: '两次',
						unlimited: '无限',
					},
				},
				round_one_use_fury: {
					name: '开启首轮强化卡牌',
					init: false,
					frequent: false,
					restart: true,
					intro: '谋攻篇规则为第二轮开始才可使用怒气强化卡牌，开启此选项从游戏开始即可强化卡牌。'
				},
				nei_auto_mark_camouflage: {
					name: '内奸自动标记伪装反贼',
					intro: '玩家内奸在游戏开始洞察结束后，自动将被洞察角色标记为反贼。',
					init: false,
					unfrequent: true,
				},
				continue_game: {
					name: '显示再战',
					init: false,
					onclick: function (bool) {
						game.saveConfig('continue_game', bool, this._link.config.mode);
						if (get.config('continue_game') && get.mode() == 'identity') {
							if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
								ui.continue_game = ui.create.control('再战', game.reloadCurrent);
							}
						}
						else if (ui.continue_game) {
							ui.continue_game.close();
							delete ui.continue_game;
						}
					},
					intro: '游戏结束后可选择用相同的武将再进行一局游戏'
				},
				dierestart: {
					name: '死亡后显示重来',
					init: true,
					onclick: function (bool) {
						game.saveConfig('dierestart', bool, this._link.config.mode);
						if (get.config('dierestart') && get.mode() == 'identity') {
							if (!ui.restart && game.me.isDead() && !_status.connectMode) {
								ui.restart = ui.create.control('restart', game.reload);
							}
						}
						else if (ui.restart) {
							ui.restart.close();
							delete ui.restart;
						}
					}
				},
				revive: {
					name: '死亡后显示复活',
					init: false,
					onclick: function (bool) {
						game.saveConfig('revive', bool, this._link.config.mode);
						if (get.config('revive') && get.mode() == 'identity') {
							if (!ui.revive && game.me.isDead()) {
								ui.revive = ui.create.control('revive', ui.click.dierevive);
							}
						}
						else if (ui.revive) {
							ui.revive.close();
							delete ui.revive;
						}
					}
				},
				ban_identity: {
					name: '屏蔽身份',
					init: 'off',
					item: {
						off: '关闭',
						zhu: '主公',
						zhong: '忠臣',
						nei: '内奸',
						fan: '反贼',
					},
				},
				ban_identity2: {
					name: '屏蔽身份2',
					init: 'off',
					item: {
						off: '关闭',
						zhu: '主公',
						zhong: '忠臣',
						nei: '内奸',
						fan: '反贼',
					},
				},
				ban_identity3: {
					name: '屏蔽身份3',
					init: 'off',
					item: {
						off: '关闭',
						zhu: '主公',
						zhong: '忠臣',
						nei: '内奸',
						fan: '反贼',
					},
				},
				ai_strategy: {
					name: '内奸策略',
					init: 'ai_strategy_1',
					item: {
						ai_strategy_1: '均衡',
						ai_strategy_2: '偏反',
						ai_strategy_3: '偏忠',
						ai_strategy_4: '酱油',
						ai_strategy_5: '天使',
						ai_strategy_6: '仇主',
					},
					intro: '设置内奸对主忠反的态度'
				},
				difficulty: {
					name: 'AI对人类态度',
					init: 'normal',
					item: {
						easy: '友好',
						normal: '一般',
						hard: '仇视',
					},
				},
				choice_zhu: {
					name: '主公候选武将数',
					init: '3',
					restart: true,
					item: {
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'8': '八',
						'10': '十',
					},
				},
				limit_zhu: {
					name: '常备主候选武将数',
					init: 'group',
					restart: true,
					item: {
						off: '不限制',
						group: '按势力筛选',
						'4': '四',
						'6': '六',
						'8': '八',
					},
				},
				choice_zhong: {
					name: '忠臣候选武将数',
					init: '4',
					restart: true,
					item: {
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'8': '八',
						'10': '十',
					},
				},
				choice_nei: {
					name: '内奸候选武将数',
					init: '5',
					restart: true,
					item: {
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'8': '八',
						'10': '十',
					},
				},
				choice_fan: {
					name: '反贼候选武将数',
					init: '3',
					restart: true,
					item: {
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'8': '八',
						'10': '十',
					},
				},
				enable_commoner: {
					name: '启用平民',
					init: false,
					restart: true,
					frequent: false,
					intro: '开启后游戏中将有一个平民（身份）加入游戏。<br>具体规则请查看帮助。',
				},
				choice_commoner: {
					name: '平民候选武将数',
					init: '4',
					restart: true,
					item: {
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'8': '八',
						'10': '十',
					},
				},
				enable_year_limit: {
					name: '启用年机制',
					init: false,
					restart: true,
					frequent: false,
					intro: '开启后将会加入年机制。<br>年机制的具体规则请查看帮助。',
				},
			}
		},
		guozhan: {
			name: '国战',
			connect: {
				connect_guozhan_mode: {
					name: '游戏模式',
					init: 'normal',
					item: {
						normal: '势备',
						yingbian: '应变',
						old: '怀旧',
					},
					frequent: true,
					restart: true,
					intro: '<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。',
				},
				connect_player_number: {
					name: '游戏人数',
					init: '8',
					get item() {
						return lib.mode.guozhan.config.player_number.item;
					},
					frequent: true,
					restart: true,
				},
				connect_aozhan: {
					name: '鏖战模式',
					init: true,
					intro: '若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。',
					frequent: true,
					restart: true,
				},
				get connect_separatism() {
					return lib.mode.guozhan.config.separatism;
				},
				connect_initshow_draw: {
					name: '首亮奖励',
					item: {
						'off': '关闭',
						'draw': '摸牌',
						'mark': '标记',
					},
					init: 'mark',
					frequent: true,
					intro: '第一个明置武将牌的角色可获得首亮奖励'
				},
				connect_viewnext: {
					name: '观看下家副将',
					init: false,
					intro: '若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。',
				},
				connect_zhulian: {
					name: '珠联璧合',
					init: true,
					// frequent:true,
					intro: '主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记'
				},
				connect_junzhu: {
					name: '替换君主',
					init: true,
					// frequent:true,
					restart: true,
					intro: '若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。'
				},
				connect_change_card: {
					name: '启用手气卡',
					init: false,
					frequent: true,
					restart: true,
				},
				// connect_ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:false,
				// 	restart:true,
				// },
				// connect_ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
			},
			config: {
				update: function (config, map) {
					if (config.onlyguozhan) {
						map.junzhu.show();
					}
					else {
						map.junzhu.hide();
					}
					ui.aozhan_bgm = map.aozhan_bgm;
					map.aozhan_bgm._link.config.updatex.call(map.aozhan_bgm, []);
				},
				guozhan_mode: {
					name: '游戏模式',
					init: 'normal',
					item: {
						normal: '势备',
						yingbian: '应变',
						old: '怀旧',
						free: '自由',
					},
					frequent: true,
					restart: true,
					intro: '<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。<br><li>自由：使用玩家的自定义牌堆进行游戏。',
				},
				player_number: {
					name: '游戏人数',
					init: '8',
					get item() {
						const minimumNumberOfPlayers = 2, maximumNumberOfPlayers = Math.max(_status.maximumNumberOfPlayers || 12, minimumNumberOfPlayers), item = {};
						for (let playerNumber = minimumNumberOfPlayers; playerNumber <= maximumNumberOfPlayers; playerNumber++) {
							item[playerNumber] = `${get.cnNumber(playerNumber)}人`;
						}
						return item;
					},
					frequent: true,
					restart: true,
				},
				aozhan: {
					name: '鏖战模式',
					init: true,
					frequent: true,
					restart: true,
					intro: '若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。',
				},
				separatism: {
					name: '群雄割据',
					init: false,
					frequent: true,
					restart: true,
					intro: '开放不同势力组合，以优先亮出的武将牌作为自己的势力，双势力武将则使用列表的第一个势力'
				},
				initshow_draw: {
					name: '首亮奖励',
					item: {
						'off': '关闭',
						'draw': '摸牌',
						'mark': '标记',
					},
					init: 'mark',
					frequent: true,
					intro: '第一个明置身份牌的角色可获得摸牌奖励'
				},
				viewnext: {
					name: '观看下家副将',
					init: false,
					intro: '若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。',
				},
				aozhan_bgm: {
					updatex: function () {
						this.lastChild.innerHTML = this._link.config.item[lib.config.mode_config.guozhan.aozhan_bgm];
						if (!Array.isArray(_status.aozhanBGMToRemove)) return;
						const menu = this._link.menu;
						for (let i = 0; i < menu.childElementCount; i++) {
							const link = menu.childNodes[i]._link;
							if (['disabled', 'random'].includes(link) || !_status.aozhanBGMToRemove.includes(link)) continue;
							_status.aozhanBGMToRemove.remove(link);
							menu.childNodes[i].delete();
						}
					},
					name: '鏖战背景音乐',
					item: {
						disabled: '不启用',
						online: 'Online',
						rewrite: 'Rewrite',
						chaoming: '潮鸣',
						random: '随机播放',
					},
					init: 'rewrite',
					onclick: function (item) {
						game.saveConfig('aozhan_bgm', item, this._link.config.mode);
						if (_status._aozhan == true) game.playBackgroundMusic();
					},
				},
				zhulian: {
					name: '珠联璧合',
					init: true,
					// frequent:true,
					intro: '主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记'
				},
				changeViceType: {
					name: '副将变更方式',
					init: 'default',
					item: {
						default: '发现式',
						online: '随机式',
					},
					frequent: true,
					restart: true,
				},
				onlyguozhan: {
					name: '使用国战武将',
					init: true,
					frequent: true,
					restart: true,
					intro: '开启武将技能将替换为国战版本并禁用非国战武将'
				},
				guozhanSkin: {
					name: '使用国战皮肤',
					init: true,
					frequent: true,
					restart: true,
					intro: '开启此选项后，将会把有国战专属皮肤的武将替换为国战皮肤'
				},
				junzhu: {
					name: '替换君主',
					init: true,
					// frequent:true,
					restart: true,
					intro: '若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。'
				},
				double_hp: {
					name: '双将体力上限',
					init: 'pingjun',
					item: {
						hejiansan: '和减三',
						pingjun: '平均值',
						zuidazhi: '最大值',
						zuixiaozhi: '最小值',
						zonghe: '相加',
					},
					restart: true,
				},
				// ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
				free_choose: {
					name: '自由选将',
					init: true,
					onclick: function (bool) {
						game.saveConfig('free_choose', bool, this._link.config.mode);
						if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
						else if (ui.cheat2 && !get.config('free_choose')) {
							ui.cheat2.close();
							delete ui.cheat2;
						}
					}
				},
				onlyguozhanexpand: {
					name: '默认展开自由选将',
					init: false,
					restart: true,
					intro: '开启后自由选将对话框将默认显示全部武将'
				},
				change_identity: {
					name: '自由选择座位',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_identity', bool, this._link.config.mode);
						if (get.mode() != 'guozhan' || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						var dialog;
						if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
						else dialog = _status.event.dialog;
						if (!_status.brawl || !_status.brawl.noAddSetting) {
							if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
							else _status.event.getParent().removeSetting(dialog);
						}
						ui.update();
					}
				},
				change_choice: {
					name: '开启换将卡',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_choice', bool, this._link.config.mode);
						if (get.mode() != 'guozhan' || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
						else if (ui.cheat && !get.config('change_choice')) {
							ui.cheat.close();
							delete ui.cheat;
						}
					}
				},
				change_card: {
					name: '开启手气卡',
					init: 'disabled',
					item: {
						disabled: '禁用',
						once: '一次',
						twice: '两次',
						unlimited: '无限',
					}
				},
				continue_game: {
					name: '显示再战',
					init: true,
					intro: '游戏结束后可选择用相同的武将再进行一局游戏',
					onclick: function (bool) {
						game.saveConfig('continue_game', bool, this._link.config.mode);
						if (get.config('continue_game') && get.mode() == 'guozhan') {
							if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
								ui.continue_game = ui.create.control('再战', game.reloadCurrent);
							}
						}
						else if (ui.continue_game) {
							ui.continue_game.close();
							delete ui.continue_game;
						}
					}
				},
				dierestart: {
					name: '死亡后显示重来',
					init: true,
					onclick: function (bool) {
						game.saveConfig('dierestart', bool, this._link.config.mode);
						if (get.config('dierestart') && get.mode() == 'guozhan') {
							if (!ui.restart && game.me.isDead() && !_status.connectMode) {
								ui.restart = ui.create.control('restart', game.reload);
							}
						}
						else if (ui.restart) {
							ui.restart.close();
							delete ui.restart;
						}
					}
				},
				revive: {
					name: '死亡后显示复活',
					init: false,
					onclick: function (bool) {
						game.saveConfig('revive', bool, this._link.config.mode);
						if (get.config('revive') && get.mode() == 'guozhan') {
							if (!ui.revive && game.me.isDead()) {
								ui.revive = ui.create.control('revive', ui.click.dierevive);
							}
						}
						else if (ui.revive) {
							ui.revive.close();
							delete ui.revive;
						}
					}
				},
				difficulty: {
					name: 'AI对人类态度',
					init: 'normal',
					item: {
						easy: '友好',
						normal: '一般',
						hard: '仇视',
					}
				},
				choice_num: {
					name: '候选武将数',
					init: '7',
					restart: true,
					item: {
						'5': '五',
						'6': '六',
						'7': '七',
						'8': '八',
						'9': '九',
						'10': '十',
					}
				},
			}
		},
		versus: {
			name: '对决',
			connect: {
				update: function (config, map) {
					if (config.connect_versus_mode == '1v1') {
						map.connect_choice_num.show();
						map.connect_replace_number.show();
					}
					else {
						map.connect_choice_num.hide();
						map.connect_replace_number.hide();
					}
					if (config.connect_versus_mode == '2v2' || config.connect_versus_mode == '3v3') {
						map.connect_replace_handcard.show();
					}
					else {
						map.connect_replace_handcard.hide();
					}
				},
				connect_versus_mode: {
					name: '游戏模式',
					init: '1v1',
					item: {
						'1v1': '1v1',
						'2v2': '2v2',
						'3v3': '3v3',
						'4v4': '4v4',
						'guandu': '官渡',
					},
					frequent: true
				},
				connect_replace_handcard: {
					name: '四号位保护',
					init: true,
					frequent: true,
					intro: '最后行动的角色起始手牌数+1'
				},
				connect_olfeiyang_four: {
					name: '四号位获得【飞扬】',
					init: true,
					frequent: true,
					intro: '最后行动的角色获得技能【飞扬】（准备阶段，你可以弃置三张牌，然后弃置判定区的一张牌）',
				},
				connect_choice_num: {
					name: '侯选武将数',
					init: '20',
					frequent: true,
					item: {
						'12': '12人',
						'16': '16人',
						'20': '20人',
						'24': '24人',
						'40': '40人',
					}
				},
				connect_replace_number: {
					name: '替补人数',
					init: '2',
					frequent: true,
					item: {
						'0': '无',
						'1': '1人',
						'2': '2人',
						'3': '3人',
						'4': '4人',
						'5': '5人',
					}
				},
				// connect_ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// connect_ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
			},
			config: {
				update: function (config, map) {
					if (config.versus_mode == 'four') {
						map.change_choice.hide();
						map.ladder.show();
						if (config.ladder) {
							map.ladder_monthly.show();
							map.ladder_reset.show();
						}
						else {
							map.ladder_monthly.hide();
							map.ladder_reset.hide();
						}
						map.enable_all.show();
						map.enable_all_cards_four.show();
						map.four_assign.show();
						map.four_phaseswap.show();
						map.expand_dialog.show();
						map.fouralign.show();
						map.edit_character_four.show();
						map.reset_character_four.show();
					}
					else {
						map.change_choice.show();
						map.ladder.hide();
						map.ladder_monthly.hide();
						map.ladder_reset.hide();
						map.enable_all.hide();
						map.enable_all_cards_four.hide();
						map.four_assign.hide();
						map.four_phaseswap.hide();
						map.expand_dialog.hide();
						map.fouralign.hide();
						map.edit_character_four.hide();
						map.reset_character_four.hide();
					}
					if (config.versus_mode == 'three') {
						map.edit_character_three.show();
						map.reset_character_three.show();
					}
					else {
						map.edit_character_three.hide();
						map.reset_character_three.hide();
					}
					if (config.versus_mode == 'three' || config.versus_mode == 'one') {
						map.enable_all_three.show();
						map.enable_all_cards.show();
					}
					else {
						map.enable_all_three.hide();
						map.enable_all_cards.hide();
					}
					if (config.versus_mode == 'jiange' || config.versus_mode == 'two' || config.versus_mode == 'endless' ||
						config.versus_mode == 'three' || config.versus_mode == 'one' || config.versus_mode == 'siguo') {
						map.free_choose.show();
					}
					else {
						map.free_choose.hide();
					}
					if (config.versus_mode == 'jiange') {
						map.double_character_jiange.show();
					}
					else {
						map.double_character_jiange.hide();
					}
					if (config.versus_mode == 'two') {
						map.replace_handcard_two.show();
						map.olfeiyang_four.show();
						map.replace_character_two.show();
						map.two_assign.show();
						map.two_phaseswap.show();
					}
					else {
						map.replace_handcard_two.hide();
						map.olfeiyang_four.hide();
						map.replace_character_two.hide();
						map.two_assign.hide();
						map.two_phaseswap.hide();
					}
					if (config.versus_mode == 'two' || config.versus_mode == 'siguo' || config.versus_mode == 'four') {
						if (config.versus_mode == 'four' && (config.four_assign || config.four_phaseswap)) {
							map.change_identity.hide();
						}
						else {
							map.change_identity.show();
						}
					}
					else {
						map.change_identity.hide();
					}
					if (config.versus_mode == 'siguo') {
						map.siguo_character.show();
					}
					else {
						map.siguo_character.hide();
					}
				},
				versus_mode: {
					name: '游戏模式',
					init: 'four',
					item: {
						four: '对抗',
						three: '统率',
						two: '欢乐',
						guandu: '官渡',
						jiange: '剑阁',
						siguo: '四国',
						standard: '自由'
						// endless:'无尽',
						// triple:'血战',
						// one:'<span style="display:inline-block;width:100%;text-align:center">1v1</span>',
					},
					restart: true,
					frequent: true,
				},
				ladder: {
					name: '天梯模式',
					init: true,
					frequent: true,
					restart: true
				},
				ladder_monthly: {
					name: '每月重置天梯',
					init: true,
					frequent: true,
				},
				enable_all: {
					name: '启用全部武将',
					init: false,
					frequent: true,
					restart: true,
				},
				enable_all_cards_four: {
					name: '启用全部卡牌',
					init: false,
					frequent: true,
					restart: true,
				},
				enable_all_three: {
					name: '启用全部武将',
					init: false,
					frequent: true,
					restart: true,
				},
				enable_all_cards: {
					name: '启用全部卡牌',
					init: false,
					frequent: true,
					restart: true,
				},
				four_assign: {
					name: '代替队友选将',
					init: false,
					restart: true,
				},
				four_phaseswap: {
					name: '代替队友行动',
					init: false,
					restart: true,
				},
				two_assign: {
					name: '代替队友选将',
					init: false,
					restart: true,
				},
				two_phaseswap: {
					name: '代替队友行动',
					init: false,
					restart: true,
				},
				free_choose: {
					name: '自由选将',
					init: true,
					frequent: true,
					onclick: function (bool) {
						game.saveConfig('free_choose', bool, this._link.config.mode);
						if (!ui.create.cheat2) return;
						if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
						else if (ui.cheat2 && !get.config('free_choose')) {
							ui.cheat2.close();
							delete ui.cheat2;
						}
					}
				},
				fouralign: {
					name: '自由选择阵型',
					init: false
				},
				change_identity: {
					name: '自由选择座位',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_identity', bool, this._link.config.mode);
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (_status.mode == 'four') {
							if (get.config('four_assign') || get.config('four_phaseswap')) return;
							if (bool) {
								if (_status.event.parent.addSetting) {
									_status.event.parent.addSetting();
								}
							}
							else {
								var seats = _status.event.parent.seatsbutton;
								if (seats) {
									while (seats.length) {
										seats.shift().remove();
									}
									delete _status.event.parent.seatsbutton;
								}
							}
						}
						else {
							var dialog;
							if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
							else dialog = _status.event.dialog;
							if (!_status.brawl || !_status.brawl.noAddSetting) {
								if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
								else _status.event.getParent().removeSetting(dialog);
							}
							ui.update();
						}
					}
				},
				change_choice: {
					name: '开启换将卡',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_choice', bool, this._link.config.mode);
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
						else if (ui.cheat && !get.config('change_choice')) {
							ui.cheat.close();
							delete ui.cheat;
						}
					},
					frequent: true,
				},
				double_character_jiange: {
					name: '双将模式',
					init: false,
					frequent: true,
				},
				replace_handcard_two: {
					name: '四号位保护',
					init: true,
					frequent: true,
					intro: '最后行动的角色起始手牌+1'
				},
				olfeiyang_four: {
					name: '四号位获得【飞扬】',
					init: true,
					frequent: true,
					intro: '最后行动的角色获得技能【飞扬】（准备阶段，你可以弃置三张牌，然后弃置判定区的一张牌）',
				},
				replace_character_two: {
					name: '替补模式',
					init: false,
					frequent: true,
					intro: '每个额外选择一名武将，死亡后用该武将代替重新上场，替补武将用完时失败'
				},
				expand_dialog: {
					name: '默认展开选将框',
					intro: '选将框打开时直接显示全部武将（可能使游戏在开始时卡顿）',
					init: false,
				},
				siguo_character: {
					name: '专属武将出场率',
					init: 'increase',
					item: {
						increase: '大概率',
						normal: '默认概率',
						off: '不出现',
					},
					frequent: true
				},
				// ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true
				// },
				ladder_reset: {
					name: '重置天梯数据',
					onclick: function () {
						var node = this;
						if (node._clearing) {
							game.save('ladder', {
								current: 900,
								top: 900,
								month: (new Date()).getMonth()
							});
							ui.ladder.innerHTML = '卫士五';
							clearTimeout(node._clearing);
							node.firstChild.innerHTML = '重置天梯数据';
							delete node._clearing;
							return;
						}
						node.firstChild.innerHTML = '单击以确认 (3)';
						node._clearing = setTimeout(function () {
							node.firstChild.innerHTML = '单击以确认 (2)';
							node._clearing = setTimeout(function () {
								node.firstChild.innerHTML = '单击以确认 (1)';
								node._clearing = setTimeout(function () {
									node.firstChild.innerHTML = '重置天梯数据';
									delete node._clearing;
								}, 1000);
							}, 1000);
						}, 1000);
					},
					clear: true,
				},
				edit_character_three: {
					name: '编辑统率将池',
					clear: true,
					onclick: function () {
						if (get.mode() != 'versus') {
							alert('请进入对决模式，然后再编辑将池');
							return;
						}
						var container = ui.create.div('.popup-container.editor');
						var node = container;
						var map = get.config('character_three') || lib.choiceThree;
						var str = 'character=[\n    ';
						for (var i = 0; i < map.length; i++) {
							str += '"' + map[i] + '",';
							if (i + 1 < map.length && (i + 1) % 5 == 0) str += '\n    ';
						}
						str += '\n];';
						node.code = str;
						ui.window.classList.add('shortcutpaused');
						ui.window.classList.add('systempaused');
						var saveInput = function () {
							var code;
							if (container.editor) {
								code = container.editor.getValue();
							}
							else if (container.textarea) {
								code = container.textarea.value;
							}
							try {
								var character = null;
								eval(code);
								if (!Array.isArray(character)) {
									throw ('err');
								}
							}
							catch (e) {
								var tip = lib.getErrorTip(e) || '';
								alert('代码语法有错误，请仔细检查（' + e + '）' + tip);
								window.focus();
								if (container.editor) {
									container.editor.focus();
								}
								else if (container.textarea) {
									container.textarea.focus();
								}
								return;
							}
							game.saveConfig('character_three', character, 'versus');
							ui.window.classList.remove('shortcutpaused');
							ui.window.classList.remove('systempaused');
							container.delete();
							container.code = code;
							delete window.saveNonameInput;
						};
						window.saveNonameInput = saveInput;
						var editor = ui.create.editor(container, saveInput);
						if (node.aced) {
							ui.window.appendChild(node);
							node.editor.setValue(node.code, 1);
						}
						else if (lib.device == 'ios') {
							ui.window.appendChild(node);
							if (!node.textarea) {
								var textarea = document.createElement('textarea');
								editor.appendChild(textarea);
								node.textarea = textarea;
								lib.setScroll(textarea);
							}
							node.textarea.value = node.code;
						}
						else {
							if (!window.CodeMirror) {
								lib.init.js(lib.assetURL + 'game', 'codemirror', () => lib.codeMirrorReady(node, editor));
								lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
							}
							else {
								lib.codeMirrorReady(node, editor);
							}
						}
					},
				},
				reset_character_three: {
					name: '重置统率将池',
					intro: '将统率三军模式下的将池重置为默认将池',
					clear: true,
					onclick: function () {
						if (confirm('该操作不可撤销！是否清除统率三军模式的自定义将池，并将其重置为默认将池？')) {
							game.saveConfig('character_three', null, 'versus');
							alert('将池已重置');
						}
					},
				},
				edit_character_four: {
					name: '编辑4v4将池',
					clear: true,
					onclick: function () {
						if (get.mode() != 'versus') {
							alert('请进入对决模式，然后再编辑将池');
							return;
						}
						var container = ui.create.div('.popup-container.editor');
						var node = container;
						var map = get.config('character_four') || lib.choiceFour;
						var str = 'character=[\n    ';
						for (var i = 0; i < map.length; i++) {
							str += '"' + map[i] + '",';
							if (i + 1 < map.length && (i + 1) % 5 == 0) str += '\n    ';
						}
						str += '\n];';
						node.code = str;
						ui.window.classList.add('shortcutpaused');
						ui.window.classList.add('systempaused');
						var saveInput = function () {
							var code;
							if (container.editor) {
								code = container.editor.getValue();
							}
							else if (container.textarea) {
								code = container.textarea.value;
							}
							try {
								var character = null;
								eval(code);
								if (!Array.isArray(character)) {
									throw ('err');
								}
							}
							catch (e) {
								var tip = lib.getErrorTip(e) || '';
								alert('代码语法有错误，请仔细检查（' + e + '）' + tip);
								window.focus();
								if (container.editor) {
									container.editor.focus();
								}
								else if (container.textarea) {
									container.textarea.focus();
								}
								return;
							}
							game.saveConfig('character_four', character, 'versus');
							ui.window.classList.remove('shortcutpaused');
							ui.window.classList.remove('systempaused');
							container.delete();
							container.code = code;
							delete window.saveNonameInput;
						};
						window.saveNonameInput = saveInput;
						var editor = ui.create.editor(container, saveInput);
						if (node.aced) {
							ui.window.appendChild(node);
							node.editor.setValue(node.code, 1);
						}
						else if (lib.device == 'ios') {
							ui.window.appendChild(node);
							if (!node.textarea) {
								var textarea = document.createElement('textarea');
								editor.appendChild(textarea);
								node.textarea = textarea;
								lib.setScroll(textarea);
							}
							node.textarea.value = node.code;
						}
						else {
							if (!window.CodeMirror) {
								lib.init.js(lib.assetURL + 'game', 'codemirror', () => lib.codeMirrorReady(node, editor));
								lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
							}
							else {
								lib.codeMirrorReady(node, editor);
							}
						}
					},
				},
				reset_character_four: {
					name: '重置4v4将池',
					intro: '将4v4模式下的将池重置为默认将池',
					clear: true,
					onclick: function () {
						if (confirm('该操作不可撤销！是否清除4v4模式的自定义将池，并将其重置为默认将池？')) {
							game.saveConfig('character_four', null, 'versus');
							alert('将池已重置');
						}
					},
				},
			}
		},
		connect: {
			name: '联机',
			config: {
				connect_nickname: {
					name: '联机昵称',
					input: true,
					frequent: true,
				},
				connect_avatar: {
					name: '联机头像',
					init: 'caocao',
					item: {},
					frequent: true,
					onclick: function (item) {
						game.saveConfig('connect_avatar', item);
						game.saveConfig('connect_avatar', item, 'connect');
					}
				},
				hall_ip: {
					name: '联机大厅',
					input: true,
					frequent: true,
				},
				hall_button: {
					name: '联机大厅按钮',
					init: true,
					frequent: true,
					onclick: function (bool) {
						game.saveConfig('hall_button', bool, 'connect');
						if (ui.hall_button) {
							if (bool) {
								ui.hall_button.style.display = '';
							}
							else {
								ui.hall_button.style.display = 'none';
							}
						}
					}
				},
				wss_mode: {
					name: '使用WSS协议',
					init: false,
					frequent: true,
					intro: '在用户填写的IP地址没有直接指定使用WS/WSS协议的情况下，默认使用WSS协议，而非WS协议来连接到联机服务器。<br>请不要轻易勾选此项！',
				},
				read_clipboard: {
					name: '读取邀请链接',
					init: false,
					frequent: true,
					intro: '读取剪贴板以解析邀请链接自动加入联机房间',
				}
			}
		},
		boss: {
			name: '挑战',
			config: {
				free_choose: {
					name: '自由选将',
					init: true,
					frequent: true,
					onclick: function (bool) {
						game.saveConfig('free_choose', bool, this._link.config.mode);
						if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
						else if (ui.cheat2 && !get.config('free_choose')) {
							ui.cheat2.close();
							delete ui.cheat2;
						}
					}
				},
				change_choice: {
					name: '开启换将卡',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_choice', bool, this._link.config.mode);
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
						else if (ui.cheat && !get.config('change_choice')) {
							ui.cheat.close();
							delete ui.cheat;
						}
					},
					frequent: true,
				},
				single_control: {
					name: '单人控制',
					init: true,
					frequent: true,
					onclick: function (bool) {
						game.saveConfig('single_control', bool, this._link.config.mode);
						if (ui.single_swap && game.me != game.boss) {
							if (bool) {
								ui.single_swap.style.display = 'none';
							}
							else {
								ui.single_swap.style.display = '';
							}
						}
					},
					intro: '只控制一名角色，其他角色由AI控制'
				},
				// ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
			}
		},
		doudizhu: {
			name: '斗地主',
			connect: {
				update: function (config, map) {
					if (config.connect_doudizhu_mode == 'online') {
						map.connect_change_card.hide();
					}
					else {
						map.connect_change_card.show();
					}
					if (config.connect_doudizhu_mode != 'normal') {
						map.connect_double_character.hide();
					}
					else {
						map.connect_double_character.show();
					}
				},
				connect_doudizhu_mode: {
					name: '游戏模式',
					init: 'normal',
					item: {
						normal: '休闲',
						kaihei: '开黑',
						huanle: '欢乐',
						binglin: '兵临',
						online: '智斗',
					},
					restart: true,
					frequent: true,
				},
				connect_double_character: {
					name: '双将模式',
					init: false,
					frequent: true,
					restart: true,
				},
				connect_change_card: {
					name: '启用手气卡',
					init: false,
					frequent: true,
					restart: true,
				},
			},
			config: {
				update: function (config, map) {
					if (config.doudizhu_mode == 'online') {
						map.change_card.hide();
						map.edit_character.show();
						map.reset_character.show();
					}
					else {
						map.change_card.show();
						map.edit_character.hide();
						map.reset_character.hide();
					}
					if (config.doudizhu_mode != 'normal') {
						map.double_character.hide();
						map.free_choose.hide();
						map.change_identity.hide();
						map.change_choice.hide();
						map.continue_game.hide();
						map.dierestart.hide();
						map.choice_zhu.hide();
						map.choice_fan.hide();
						map.revive.hide();
					}
					else {
						map.double_character.show();
						map.free_choose.show();
						map.change_identity.show();
						map.change_choice.show();
						map.continue_game.show();
						map.dierestart.show();
						map.choice_zhu.show();
						map.choice_fan.show();
						map.revive.show();
					}
					if (config.double_character && config.doudizhu_mode == 'normal') {
						map.double_hp.show();
					}
					else {
						map.double_hp.hide();
					}
				},
				doudizhu_mode: {
					name: '游戏模式',
					init: 'normal',
					item: {
						normal: '休闲',
						kaihei: '开黑',
						huanle: '欢乐',
						binglin: '兵临',
						online: '智斗',
					},
					restart: true,
					frequent: true,
				},
				double_character: {
					name: '双将模式',
					init: false,
					frequent: true,
					restart: true,
				},
				double_hp: {
					name: '双将体力上限',
					init: 'pingjun',
					item: {
						hejiansan: '和减三',
						pingjun: '平均值',
						zuidazhi: '最大值',
						zuixiaozhi: '最小值',
						zonghe: '相加',
					},
					restart: true,
				},
				free_choose: {
					name: '自由选将',
					init: true,
					onclick: function (bool) {
						game.saveConfig('free_choose', bool, this._link.config.mode);
						if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
						else if (ui.cheat2 && !get.config('free_choose')) {
							ui.cheat2.close();
							delete ui.cheat2;
						}
					}
				},
				change_identity: {
					name: '自由选择身份和座位',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_identity', bool, this._link.config.mode);
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						var dialog;
						if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
						else dialog = _status.event.dialog;
						if (!_status.brawl || !_status.brawl.noAddSetting) {
							if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
							else _status.event.getParent().removeSetting(dialog);
						}
						ui.update();
					}
				},
				change_choice: {
					name: '开启换将卡',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_choice', bool, this._link.config.mode);
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
						else if (ui.cheat && !get.config('change_choice')) {
							ui.cheat.close();
							delete ui.cheat;
						}
					}
				},
				change_card: {
					name: '开启手气卡',
					init: 'disabled',
					item: {
						disabled: '禁用',
						once: '一次',
						twice: '两次',
						unlimited: '无限',
					},
				},
				continue_game: {
					name: '显示再战',
					init: false,
					onclick: function (bool) {
						game.saveConfig('continue_game', bool, this._link.config.mode);
						if (get.config('continue_game')) {
							if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
								ui.continue_game = ui.create.control('再战', game.reloadCurrent);
							}
						}
						else if (ui.continue_game) {
							ui.continue_game.close();
							delete ui.continue_game;
						}
					},
					intro: '游戏结束后可选择用相同的武将再进行一局游戏'
				},
				dierestart: {
					name: '死亡后显示重来',
					init: true,
					onclick: function (bool) {
						game.saveConfig('dierestart', bool, this._link.config.mode);
						if (get.config('dierestart')) {
							if (!ui.restart && game.me.isDead() && !_status.connectMode) {
								ui.restart = ui.create.control('restart', game.reload);
							}
						}
						else if (ui.restart) {
							ui.restart.close();
							delete ui.restart;
						}
					}
				},
				revive: {
					name: '死亡后显示复活',
					init: false,
					onclick: function (bool) {
						game.saveConfig('revive', bool, this._link.config.mode);
						if (get.config('revive')) {
							if (!ui.revive && game.me.isDead()) {
								ui.revive = ui.create.control('revive', ui.click.dierevive);
							}
						}
						else if (ui.revive) {
							ui.revive.close();
							delete ui.revive;
						}
					}
				},
				choice_zhu: {
					name: '地主候选武将数',
					init: '3',
					restart: true,
					item: {
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'8': '八',
						'10': '十',
					},
				},
				choice_fan: {
					name: '农民候选武将数',
					init: '3',
					restart: true,
					item: {
						'3': '三',
						'4': '四',
						'5': '五',
						'6': '六',
						'8': '八',
						'10': '十',
					},
				},
				edit_character: {
					name: '编辑将池',
					clear: true,
					onclick: function () {
						if (get.mode() != 'doudizhu') {
							alert('请进入斗地主模式，然后再编辑将池');
							return;
						}
						var container = ui.create.div('.popup-container.editor');
						var node = container;
						var map = get.config('character_online') || lib.characterOnline;
						node.code = 'character=' + get.stringify(map) + '\n/*\n    这里是智斗三国模式的武将将池。\n    您可以在这里编辑对武将将池进行编辑，然后点击“保存”按钮即可保存。\n    将池中的Key势力武将，仅同时在没有被禁用的情况下，才会出现在选将框中。\n    而非Key势力的武将，只要所在的武将包没有被隐藏，即可出现在选将框中。\n    该将池为单机模式/联机模式通用将池。在这里编辑后，即使进入联机模式，也依然会生效。\n    但联机模式本身禁用的武将（如神貂蝉）不会出现在联机模式的选将框中。\n*/';
						ui.window.classList.add('shortcutpaused');
						ui.window.classList.add('systempaused');
						var saveInput = function () {
							var code;
							if (container.editor) {
								code = container.editor.getValue();
							}
							else if (container.textarea) {
								code = container.textarea.value;
							}
							try {
								var character = null;
								eval(code);
								if (!get.is.object(character)) {
									throw ('err');
								}
								var groups = [];
								for (var i in character) {
									if (!Array.isArray(character[i])) throw ('type');
									if (character[i].length >= 3) groups.push(i);
								}
								if (groups.length < 3) throw ('enough');
							}
							catch (e) {
								if (e == 'type') {
									alert('请严格按照格式填写，不要写入不为数组的数据');
								}
								else if (e == 'enough') {
									alert('请保证至少写入了3个势力，且每个势力至少有3个武将');
								}
								else if (e == 'err') {
									alert('代码格式有错误，请对比示例代码仔细检查');
								}
								else {
									var tip = lib.getErrorTip(e) || '';
									alert('代码语法有错误，请仔细检查（' + e + '）' + tip);
								}
								window.focus();
								if (container.editor) {
									container.editor.focus();
								}
								else if (container.textarea) {
									container.textarea.focus();
								}
								return;
							}
							game.saveConfig('character_online', character, 'doudizhu');
							ui.window.classList.remove('shortcutpaused');
							ui.window.classList.remove('systempaused');
							container.delete();
							container.code = code;
							delete window.saveNonameInput;
						};
						window.saveNonameInput = saveInput;
						var editor = ui.create.editor(container, saveInput);
						if (node.aced) {
							ui.window.appendChild(node);
							node.editor.setValue(node.code, 1);
						}
						else if (lib.device == 'ios') {
							ui.window.appendChild(node);
							if (!node.textarea) {
								var textarea = document.createElement('textarea');
								editor.appendChild(textarea);
								node.textarea = textarea;
								lib.setScroll(textarea);
							}
							node.textarea.value = node.code;
						}
						else {
							if (!window.CodeMirror) {
								lib.init.js(lib.assetURL + 'game', 'codemirror', () => lib.codeMirrorReady(node, editor));
								lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
							}
							else {
								lib.codeMirrorReady(node, editor);
							}
						}
					},
				},
				reset_character: {
					name: '重置将池',
					intro: '将智斗三国模式下的将池重置为默认将池',
					clear: true,
					onclick: function () {
						if (confirm('该操作不可撤销！是否清除智斗三国模式的自定义将池，并将其重置为默认将池？')) {
							game.saveConfig('character_online', null, 'doudizhu');
							alert('将池已重置');
						}
					},
				},
			}
		},
		single: {
			name: '单挑',
			connect: {
				connect_single_mode: {
					name: '游戏模式',
					init: 'normal',
					item: {
						normal: '新1v1',
						dianjiang: '点将单挑',
						changban: '血战长坂坡',
					},
					restart: true,
					frequent: true,
				},
				connect_enable_jin: {
					name: '启用晋势力武将',
					init: false,
					restart: true,
					frequent: true,
				},
				update: function (config, map) {
					if (config.connect_single_mode != 'normal') {
						map.connect_enable_jin.hide();
					}
					else {
						map.connect_enable_jin.show();
					}
				},
			},
			config: {
				single_mode: {
					name: '游戏模式',
					init: 'normal',
					item: {
						normal: '新1v1',
						dianjiang: '点将单挑',
						changban: '血战长坂坡',
					},
					restart: true,
					frequent: true,
				},
				enable_jin: {
					name: '启用晋势力武将',
					init: false,
					restart: true,
					frequent: true,
				},
				update: function (config, map) {
					if (config.single_mode != 'normal') {
						map.enable_jin.hide();
					}
					else {
						map.enable_jin.show();
					}
				},
			}
		},
		chess: {
			name: '战棋',
			config: {
				chess_mode: {
					name: '游戏模式',
					init: 'combat',
					item: {
						combat: '自由',
						three: '统率',
						leader: '君主',
					},
					restart: true,
					frequent: true,
				},
				update: function (config, map) {
					if (config.chess_mode == 'leader') {
						map.chess_leader_save.show();
						map.chess_leader_clear.show();
						map.chess_leader_allcharacter.show();
						map.chess_character.hide();
					}
					else {
						map.chess_leader_save.hide();
						map.chess_leader_clear.hide();
						map.chess_leader_allcharacter.hide();
						map.chess_character.show();
					}
					if (config.chess_mode == 'combat') {
						// map.battle_number.show();
						// map.chess_ordered.show();
						map.free_choose.show();
						map.change_choice.show();
					}
					else {
						// map.battle_number.hide();
						// map.chess_ordered.hide();
						map.free_choose.hide();
						map.change_choice.hide();
					}
					// if(config.chess_mode!='leader'){
					// 	map.ban_weak.show();
					// 	map.ban_strong.show();
					// }
					// else{
					// 	map.ban_weak.hide();
					// 	map.ban_strong.hide();
					// }
				},
				chess_leader_save: {
					name: '选择历程',
					init: 'save1',
					item: {
						save1: '一',
						save2: '二',
						save3: '三',
						save4: '四',
						save5: '五',
					},
					restart: true,
					frequent: true,
				},
				chess_leader_allcharacter: {
					name: '启用全部角色',
					init: true,
					onclick: function (bool) {
						if (confirm('调整该设置将清除所有进度，是否继续？')) {
							for (var i = 1; i < 6; i++) game.save('save' + i, null, 'chess');
							game.saveConfig('chess_leader_allcharacter', bool, 'chess');
							if (get.mode() == 'chess') game.reload();
							return;
						}
						else this.classList.toggle('on');
					},
				},
				chess_leader_clear: {
					name: '清除进度',
					onclick: function () {
						var node = this;
						if (node._clearing) {
							for (var i = 1; i < 6; i++) game.save('save' + i, null, 'chess');
							game.reload();
							return;
						}
						node._clearing = true;
						node.firstChild.innerHTML = '单击以确认 (3)';
						setTimeout(function () {
							node.firstChild.innerHTML = '单击以确认 (2)';
							setTimeout(function () {
								node.firstChild.innerHTML = '单击以确认 (1)';
								setTimeout(function () {
									node.firstChild.innerHTML = '清除进度';
									delete node._clearing;
								}, 1000);
							}, 1000);
						}, 1000);
					},
					clear: true,
					frequent: true,
				},
				// chess_treasure:{
				// 	name:'战场机关',
				// 	init:'0',
				// 	frequent:true,
				// 	item:{
				// 		'0':'关闭',
				// 		'0.1':'较少出现',
				// 		'0.2':'偶尔出现',
				// 		'0.333':'时常出现',
				// 		'0.5':'频繁出现',
				// 	}
				// },
				chess_obstacle: {
					name: '随机路障',
					init: '0.2',
					item: {
						'0': '关闭',
						'0.2': '少量',
						'0.333': '中量',
						'0.5': '大量',
					},
					frequent: true,
				},
				show_range: {
					name: '显示卡牌范围',
					init: true,
				},
				show_distance: {
					name: '显示距离',
					init: true,
				},
				chess_character: {
					name: '战棋武将',
					init: true,
					frequent: true,
				},
				chess_card: {
					name: '战棋卡牌',
					init: true,
					frequent: true,
				},
				free_choose: {
					name: '自由选将',
					init: true,
					onclick: function (bool) {
						game.saveConfig('free_choose', bool, this._link.config.mode);
						if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
						else if (ui.cheat2 && !get.config('free_choose')) {
							ui.cheat2.close();
							delete ui.cheat2;
						}
					},
				},
				change_choice: {
					name: '开启换将卡',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_choice', bool, this._link.config.mode);
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
						else if (ui.cheat && !get.config('change_choice')) {
							ui.cheat.close();
							delete ui.cheat;
						}
					},
				},
				// ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
				chessscroll_speed: {
					name: '边缘滚动速度',
					init: '20',
					intro: '鼠标移至屏幕边缘时自动滚屏',
					item: {
						'0': '不滚动',
						'10': '10格/秒',
						'20': '20格/秒',
						'30': '30格/秒',
					}
				},
			}
		},
		tafang: {
			name: '塔防',
			config: {
				tafang_turn: {
					name: '游戏胜利',
					init: '10',
					frequent: true,
					item: {
						'10': '十回合',
						'20': '二十回合',
						'30': '三十回合',
						'1000': '无限',
					}
				},
				// tafang_size:{
				// 	name:'战场大小',
				// 	init:'9',
				// 	frequent:true,
				// 	item:{
				// 		'6':'小',
				// 		'9':'中',
				// 		'12':'大',
				// 	}
				// },
				tafang_difficulty: {
					name: '战斗难度',
					init: '2',
					frequent: true,
					item: {
						'1': '简单',
						'2': '普通',
						'3': '困难',
					}
				},
				show_range: {
					name: '显示卡牌范围',
					init: true,
				},
				show_distance: {
					name: '显示距离',
					init: true,
				},
				// ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
				chessscroll_speed: {
					name: '边缘滚动速度',
					intro: '鼠标移至屏幕边缘时自动滚屏',
					init: '20',
					item: {
						'0': '不滚动',
						'10': '10格/秒',
						'20': '20格/秒',
						'30': '30格/秒',
					}
				},
			}
		},
		brawl: {
			name: '乱斗',
			config: {
				huanhuazhizhan: {
					name: '幻化之战',
					init: true,
					frequent: true
				},
				duzhansanguo: {
					name: '毒战三国',
					init: true,
					frequent: true
				},
				daozhiyueying: {
					name: '导师月英',
					init: true,
					frequent: true
				},
				weiwoduzun: {
					name: '唯我独尊',
					init: true,
					frequent: true
				},
				tongxingzhizheng: {
					name: '同姓之争',
					init: true,
					frequent: true
				},
				jiazuzhizheng: {
					name: '家族之争',
					init: true,
					frequent: true
				},
				tongqueduopao: {
					name: '铜雀夺袍',
					init: true,
					frequent: true
				},
				tongjiangmoshi: {
					name: '同将模式',
					init: true,
					frequent: true
				},
				baiyidujiang: {
					name: '白衣渡江',
					init: true,
					frequent: true
				},
				qianlidanji: {
					name: '千里单骑',
					init: true,
					frequent: true
				},
				liangjunduilei: {
					name: '两军对垒',
					init: true,
					frequent: true
				},
				scene: {
					name: '创建场景',
					init: true,
					frequent: true
				}
			}
		},
		stone: {
			name: '炉石',
			config: {
				// update:function(config,map){
				// 	if(config.stone_mode=='deck'){
				// 		// map.deck_length.show();
				// 		// map.deck_repeat.show();
				// 		map.random_length.hide();
				// 		map.skill_bar.show();
				// 	}
				// 	else{
				// 		// map.deck_length.hide();
				// 		// map.deck_repeat.hide();
				// 		map.random_length.show();
				// 		map.skill_bar.hide();
				// 	}
				// },
				// stone_mode:{
				// 	name:'游戏模式',
				// 	init:'deck',
				// 	item:{
				// 		deck:'构筑',
				// 		random:'随机'
				// 	},
				// 	restart:true,
				// 	frequent:true,
				// },
				// deck_length:{
				// 	name:'卡组长度',
				// 	init:'30',
				// 	item:{
				// 		'30':'30张',
				// 		'50':'50张',
				// 		'80':'80张',
				// 	},
				// 	frequent:true,
				// },
				// deck_repeat:{
				// 	name:'重复卡牌',
				// 	init:'2',
				// 	item:{
				// 		'2':'2张',
				// 		'3':'3张',
				// 		'5':'5张',
				// 		'80':'无限',
				// 	},
				// 	frequent:true,
				// },
				// random_length:{
				// 	name:'随从牌数量',
				// 	init:'1/80',
				// 	item:{
				// 		'1/120':'少',
				// 		'1/80':'中',
				// 		'1/50':'多',
				// 	},
				// 	frequent:true,
				// },
				battle_number: {
					name: '出场人数',
					init: '1',
					frequent: true,
					item: {
						'1': '一人',
						'2': '两人',
						'3': '三人',
						'4': '四人',
						'6': '六人',
						'8': '八人',
						'10': '十人',
					},
					onclick: function (num) {
						game.saveConfig('battle_number', num, this._link.config.mode);
						if (_status.connectMode) return;
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (_status.event.getParent().changeDialog) {
							_status.event.getParent().changeDialog();
						}
					},
				},
				mana_mode: {
					name: '行动值变化',
					init: 'inc',
					item: {
						inf: '涨落',
						inc: '递增'
					},
					frequent: true
				},
				skill_bar: {
					name: '怒气值',
					init: true,
					frequent: true,
					restart: true,
				},
				double_character: {
					name: '双将模式',
					init: false,
					frequent: true,
					restart: function () {
						return _status.event.getParent().name != 'chooseCharacter' || _status.event.name != 'chooseButton';
					}
				},
				free_choose: {
					name: '自由选将',
					init: true,
					onclick: function (bool) {
						game.saveConfig('free_choose', bool, this._link.config.mode);
						if (_status.connectMode) return;
						if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
						else if (ui.cheat2 && !get.config('free_choose')) {
							ui.cheat2.close();
							delete ui.cheat2;
						}
					},
				},
				change_choice: {
					name: '开启换将卡',
					init: true,
					onclick: function (bool) {
						game.saveConfig('change_choice', bool, this._link.config.mode);
						if (_status.connectMode) return;
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
						else if (ui.cheat && !get.config('change_choice')) {
							ui.cheat.close();
							delete ui.cheat;
						}
					},
				},
				// ban_weak:{
				// 	name:'屏蔽弱将',
				// 	init:true,
				// 	restart:true,
				// },
				// ban_strong:{
				// 	name:'屏蔽强将',
				// 	init:false,
				// 	restart:true,
				// },
			}
		},
	};
	static status = {
		running: false,
		canvas: false,
		time: 0,
		reload: 0,
		delayed: 0,
		frameId: 0,
		videoId: 0,
		globalId: 0,
	};
	static help = {
		'关于游戏': '<div style="margin:10px">关于无名杀</div><ul style="margin-top:0"><li>无名杀官方发布地址仅有GitHub仓库！<br><a href="https://github.com/libccy/noname">点击前往Github仓库</a><br><li>无名杀基于GPLv3开源协议。<br><a href="https://www.gnu.org/licenses/gpl-3.0.html">点击查看GPLv3协议</a><br><li>其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！',
		'游戏操作': '<ul><li>长按/鼠标悬停/右键单击显示信息。<li>触屏模式中，双指点击切换暂停；下划显示菜单，上划切换托管。<li>键盘快捷键<br>' +
			'<table><tr><td>A<td>切换托管<tr><td>W<td>切换不询问无懈<tr><td>空格<td>暂停</table><li>编辑牌堆<br>在卡牌包中修改牌堆后，将自动创建一个临时牌堆，在所有模式中共用，当保存当前牌堆后，临时牌堆被清除。每个模式可设置不同的已保存牌堆，设置的牌堆优先级大于临时牌堆。</ul>',
		'游戏命令': '<div style="margin:10px">变量名</div><ul style="margin-top:0"><li>场上角色<br>game.players<li>阵亡角色<br>game.dead' +
			'<li>玩家<br>game.me<li>玩家的上/下家<br>game.me.previous/next' +
			'<li>玩家的上/下家（含阵亡）<br>game.me.previousSeat/<br>nextSeat' +
			'<li>牌堆<br>ui.cardPile<li>弃牌堆<br>ui.discardPile</ul>' +
			'<div style="margin:10px">角色属性</div><ul style="margin-top:0"><li>体力值<br>player.hp' +
			'<li>体力上限<br>player.maxHp<li>身份<br>player.identity<li>手牌<br>player.getCards("h")<li>装备牌<br>player.getCards("e")<li>判定牌<br>player.getCards("j")' +
			'<li>是否存活/横置/翻面<br>player.isAlive()/<br>isLinked()/<br>isTurnedOver()</ul>' +
			'<div style="margin:10px">角色操作</div><ul style="margin-top:0"><li>受到伤害<br>player.damage(source,<br>num)' +
			'<li>回复体力<br>player.recover(num)<li>摸牌<br>player.draw(num)<li>获得牌<br>player.gain(cards)<li>弃牌<br>player.discard(cards)' +
			'<li>使用卡牌<br>player.useCard(card,<br>targets)<li>死亡<br>player.die()<li>复活<br>player.revive(hp)</ul>' +
			'<div style="margin:10px">游戏操作</div><ul style="margin-top:0"><li>在命令框中输出结果<br>game.print(str)<li>清除命令框中的内容<br>cls<li>上一条/下一条输入的内容<br>up/down<li>游戏结束<br>game.over(bool)' +
			'<li>角色资料<br>lib.character<li>卡牌资料<br>lib.card</ul>',
		'游戏名词': '<ul><li>智囊：无名杀默认为过河拆桥/无懈可击/无中生有/洞烛先机。牌堆中没有的智囊牌会被过滤。可在卡牌设置中自行增减。若没有可用的智囊，则改为随机选取的三种锦囊牌的牌名。' +
			'<li>仁库：部分武将使用的游戏外共通区域。至多包含六张牌。当有新牌注入后，若牌数超过上限，则将最早进入仁库的溢出牌置入弃牌堆。' +
			'<li>护甲：和体力类似，每点护甲可抵挡1点伤害，但不影响手牌上限。' +
			'<li>随从：通过技能获得，拥有独立的技能、手牌区和装备区（共享判定区），出场时替代主武将的位置；随从死亡时自动切换回主武将。' +
			'<li>发现：从三张随机亮出的牌中选择一张，若无特殊说明，则获得此牌。' +
			'<li>蓄能技：发动时可以增大黄色的数字。若如此做，红色数字于技能的结算过程中改为原来的两倍。' +
			'<li>施法：若技能的拥有者未拥有等待执行的同名“施法”效果，则其可以发动“施法”技能。其须选择声明一个数字X（X∈[1, 3]），在此之后的第X个回合结束时，其执行“施法”效果，且效果中的数字X视为与技能发动者声明的X相同。' +
			'<li>共同拼点：一种特殊的拼点结算。发起者与被指定的拼点目标同时亮出拼点牌，进行一次决算：其中拼点牌点数唯一最大的角色赢，其他角色均没赢；若没有点数唯一最大的拼点牌，则所有角色拼点均没赢。' +
			'<li>强令：若一名角色拥有带有“强令”的技能，则该技能的发动时机为“出牌阶段开始时”。若技能拥有者发动该技能，其须发布“强令”给一名其他角色，并在对应技能的时间节点加以判断目标角色是否成功完成该强令所要求的任务条件。成功或失败则会根据技能效果执行不同结算流程。' +
			'<li>摧坚：若一名角色拥有带有“摧坚”的技能，则该技能的发动时机为“当你使用伤害牌指定第一个目标后”。你可以对其中一个目标发动“摧坚”技能，然后执行后续效果。其中，后续效果里的X等于该目标的非charlotte技能的数量。' +
			'<li>妄行：一种特殊的选项。若一名角色拥有带有“妄行”的技能，则该技能触发时，你须选择声明一个数字X（X∈{1,2,3,4}），技能后续中的X即为你选择的数字。选择完毕后，你获得如下效果：回合结束时，你选择一项：1.弃置X张牌；2.减1点体力上限。' +
			'<li>搏击：若一名角色拥有带有“搏击”的技能，则当该搏击技能触发时，若本次技能的目标角色在你攻击范围内，且你在其攻击范围内，则你执行技能主体效果时，同时额外执行“搏击”后的额外效果。' +
			'<li>游击：若一名角色拥有带有“游击”的技能，则当该游击技能执行至“游击”处时，若本次技能的目标角色在你的攻击范围内，且你不在其攻击范围内，则你可以执行“游击”后的额外效果。' +
			'<li>激昂：一名角色发动“昂扬技”标签技能后，此技能失效，直至从此刻至满足此技能“激昂”条件后。' +
			''
	};
	/**
	 * @type {import('path')}
	 */
	// @ts-ignore
	static path = {};
	static getErrorTip(msg) {
		if (typeof msg != 'string') {
			try {
				msg = msg.toString();
				if (typeof msg != 'string') throw 'err';
			} catch (_) {
				throw '传参错误:' + msg;
			}
		}
		if (msg.startsWith('Uncaught ')) msg = msg.slice(9);
		let newMessage = msg;
		if (/RangeError/.test(newMessage)) {
			if (newMessage.includes("Maximum call stack size exceeded")) {
				newMessage = "堆栈溢出";
			} else if (/argument must be between 0 and 20/.test(newMessage)) {
				let funName = newMessage.slice(newMessage.indexOf('RangeError: ') + 12, newMessage.indexOf(')') + 1);
				newMessage = funName + "参数必须在0和20之间";
			} else {
				newMessage = "传递错误值到数值计算方法";
			}
		} else if (/ReferenceError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes("is not defined")) {
				messageName = newMessage.replace('ReferenceError: ', '').replace(' is not defined', '');
				newMessage = "引用了一个未定义的变量：" + messageName;
			} else if (newMessage.includes("invalid assignment left-hand side")) {
				newMessage = "赋值运算符或比较运算符不匹配";
			} else if (newMessage.includes("Octal literals are not allowed in strict mode")) {
				newMessage = "八进制字面量与八进制转义序列语法已经被废弃";
			} else if (newMessage.includes("Illegal 'use strict' directive in function with non-simple parameter list")) {
				newMessage = "'use strict'指令不能使用在带有‘非简单参数’列表的函数";
			} else if (newMessage.includes("Invalid left-hand side in assignment")) {
				newMessage = "赋值中的左侧无效，即number，string等不可赋值的非变量数据";
			}
		} else if (/SyntaxError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes("Unexpected token ")) {
				messageName = newMessage.replace('SyntaxError: Unexpected token ', '');
				newMessage = "使用了未定义或错误的语法 : (" + messageName + ")";
			} else if (newMessage.includes(
				"Block-scoped declarations (let, const, function, class) not yet supported outside strict mode")) {
				newMessage = "请在严格模式下运行let，const，class";
			} else if (newMessage.includes("for-of loop variable declaration may not have an initializer.")) {
				newMessage = "for...of 循环的头部包含有初始化表达式";
			} else if (newMessage.includes("for-in loop variable declaration may not have an initializer.")) {
				newMessage = "for...in 循环的头部包含有初始化表达式";
			} else if (newMessage.includes("Delete of an unqualified identifier in strict mode.")) {
				newMessage = "普通变量不能通过 delete 操作符来删除";
			} else if (newMessage.includes("Unexpected identifier")) {
				newMessage = "不合法的标识符或错误的语法";
			} else if (newMessage.includes("Invalid or unexpected token")) {
				newMessage = "非法的或者不期望出现的标记符号出现在不该出现的位置";
			} else if (newMessage.includes("Invalid regular expression flags")) {
				newMessage = "无效的正则表达式的标记";
			} else if (newMessage.includes("missing ) after argument list")) {
				newMessage = "参数列表后面缺少 ')' (丢失运算符或者转义字符等)";
			} else if (newMessage.includes("Invalid shorthand property initializer")) {
				newMessage = "在定义一个{}对象时，应该使用':'而不是'='";
			} else if (newMessage.includes("Missing initializer in const declaration")) {
				newMessage = "在使用const定义一个对象时，必须指定初始值";
			} else if (newMessage.includes("Unexpected number") || newMessage.includes("Unexpected string")) {
				newMessage = "在定义函数时，函数参数必须为合法标记符";
			} else if (newMessage.includes("Unexpected end of input")) {
				newMessage = "遗漏了符号或符号顺序不对(小括号，花括号等)";
			} else if (newMessage.includes("has already been declared")) {
				messageName = newMessage.replace('SyntaxError: Identifier ', '').replace(' has already been declared', '');
				newMessage = messageName + "变量已经被声明过，不能被重新声明";
			} else if (newMessage.includes("Duplicate parameter name not allowed in this context")) {
				newMessage = "参数名不允许重复";
			} else if (newMessage.includes("Unexpected reserved word") || newMessage.includes(
				"Unexpected strict mode reserved word")) {
				newMessage = "保留字被用作标记符";
			}
		} else if (/TypeError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes(" is not a function")) {
				messageName = newMessage.replace('TypeError: ', '').replace(' is not a function', '');
				newMessage = messageName + "不是一个函数";
			} else if (newMessage.includes(" is not a constructor")) {
				messageName = newMessage.replace('TypeError: ', '').replace(' is not a constructor', '');
				newMessage = messageName + "不是一个构造函数";
			} else if (newMessage.includes("Cannot read property")) {
				messageName = newMessage.replace('TypeError: Cannot read property ', '').replace(' of null', '').replace(' of undefined', '');
				let ofName = newMessage.slice(newMessage.indexOf(" of ") + 4);
				newMessage = "无法读取'" + ofName + "'的属性值" + messageName;
			} else if (newMessage.includes("Cannot read properties")) {
				messageName = newMessage.slice(newMessage.indexOf("reading '") + 9, -2);
				let ofName = newMessage.slice(newMessage.indexOf(" of ") + 4, newMessage.indexOf("(") - 1);
				newMessage = "无法读取'" + ofName + "'的属性值" + messageName;
			} else if (newMessage.includes("Property description must be an object")) {
				messageName = newMessage.replace('TypeError: Property description must be an object: ', '');
				newMessage = messageName + "是非对象类型的值";
			} else if (newMessage.includes("Cannot assign to read only property ")) {
				messageName = newMessage.slice(47, newMessage.lastIndexOf(' of ') + 1);
				newMessage = messageName + "属性禁止写入";
			} else if (newMessage.includes("Object prototype may only be an Object or null")) {
				newMessage = messageName + "对象原型只能是对象或null";
			} else if (newMessage.includes("Cannot create property")) {
				messageName = newMessage.slice(newMessage.indexOf('\'') + 1);
				messageName = messageName.slice(0, messageName.indexOf('\''));
				let obj = newMessage.slice(newMessage.indexOf(messageName) + 16);
				newMessage = obj + "不能添加或修改'" + messageName + "'属性，任何 Primitive 值都不允许有property";
			} else if (newMessage.includes("Can't add property") && newMessage.includes("is not extensible")) {
				newMessage = "对象不可添加属性（不可扩展）";
			} else if (newMessage.includes("Cannot redefine property")) {
				messageName = newMessage.slice(37);
				newMessage = messageName + "不可配置";
			} else if (newMessage.includes("Converting circular structure to JSON")) {
				messageName = newMessage.slice(37);
				newMessage = "JSON.stringify() 方法处理循环引用结构的JSON会失败";
			} else if (newMessage.includes("Cannot use 'in' operator to search for ")) {
				newMessage = "in不能用来在字符串、数字或者其他基本类型的数据中进行检索";
			} else if (newMessage.includes("Right-hand side of 'instanceof' is not an object")) {
				newMessage = "instanceof 操作符 希望右边的操作数为一个构造对象，即一个有 prototype 属性且可以调用的对象";
			} else if (newMessage.includes("Assignment to constant variable")) {
				newMessage = "const定义的变量不可修改";
			} else if (newMessage.includes("Cannot delete property")) {
				newMessage = "不可配置的属性不能删除";
			} else if (newMessage.includes("which has only a getter")) {
				newMessage = "仅设置了getter特性的属性不可被赋值";
			} else if (newMessage.includes("called on incompatible receiver undefined")) {
				newMessage = "this提供的绑定对象与预期的不匹配";
			}
		} else if (/URIError/.test(newMessage)) {
			newMessage = "一个不合法的URI";
		} else if (/EvalError/.test(newMessage)) {
			newMessage = "非法调用 eval()";
		} else if (/InternalError/.test(newMessage)) {
			if (newMessage.includes("too many switch cases")) {
				newMessage = "过多case子句";
			} else if (newMessage.includes("too many parentheses in regular expression")) {
				newMessage = "正则表达式中括号过多";
			} else if (newMessage.includes("array initializer too large")) {
				newMessage = "超出数组大小的限制";
			} else if (newMessage.includes("too much recursion")) {
				newMessage = "递归过深";
			}
		}
		if (newMessage != msg) {
			return newMessage;
		}
	}
	static codeMirrorReady(node, editor) {
		ui.window.appendChild(node);
		node.style.fontSize = 20 / game.documentZoom + 'px';
		const mirror = window.CodeMirror(editor, {
			value: node.code,
			mode: "javascript",
			lineWrapping: !lib.config.touchscreen && lib.config.mousewheel,
			lineNumbers: true,
			indentUnit: 4,
			autoCloseBrackets: true,
			fixedGutter: false,
			hintOptions: { completeSingle: false },
			theme: lib.config.codeMirror_theme || 'mdn-like',
			extraKeys: {
				"Ctrl-Z": "undo",//撤销
				"Ctrl-Y": "redo",//恢复撤销
				//"Ctrl-A":"selectAll",//全选
			},
		});
		lib.setScroll(editor.querySelector('.CodeMirror-scroll'));
		node.aced = true;
		node.editor = mirror;
		setTimeout(() => mirror.refresh(), 0);
		node.editor.on('change', (e, change) => {
			let code;
			if (node.editor) {
				code = node.editor.getValue();
			} else if (node.textarea) {
				code = node.textarea.value;
			}
			//动态绑定文本
			if (code.length && change.origin == "+input" &&
				/{|}|\s|=|;|:|,|，|。|？|！|!|\?|&|#|%|@|‘|’|；/.test(change.text[0]) == false &&
				change.text.length == 1) {
				//输入了代码，并且不包括空格，{}，=， ; ， : ， 逗号等，才可以自动提示
				node.editor.showHint();
			}
		});
		//防止每次输出字符都创建以下元素
		const event = _status.event;
		const trigger = _status.event;
		const player = ui.create.player().init('sunce');
		const target = player;
		const targets = [player];
		const source = player;
		const card = game.createCard();
		const cards = [card];
		const result = { bool: true };
		function forEach(arr, f) {
			Array.from(arr).forEach(v => f(v));
		}
		function forAllProps(obj, callback) {
			if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
				for (let name in obj) callback(name);
			} else {
				for (let o = obj; o; o = Object.getPrototypeOf(o)) Object.getOwnPropertyNames(o).forEach(callback);
			}
		}
		function scriptHint(editor, keywords, getToken, options) {
			//Find the token at the cursor
			let cur = editor.getCursor(), token = editor.getTokenAt(cur);
			if (/\b(?:string|comment)\b/.test(token.type)) return;
			const innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
			if (innerMode.mode.helperType === "json") return;
			token.state = innerMode.state;
			//If it's not a 'word-style' token, ignore the token.
			if (!/^[\w$_]*$/.test(token.string)) {
				token = {
					start: cur.ch,
					end: cur.ch,
					string: "",
					state: token.state,
					type: token.string == "." ? "property" : null
				};
			} else if (token.end > cur.ch) {
				token.end = cur.ch;
				token.string = token.string.slice(0, cur.ch - token.start);
			}
			let tprop = token, context;
			//If it is a property, find out what it is a property of.
			while (tprop.type == "property") {
				tprop = editor.getTokenAt(CodeMirror.Pos(cur.line, tprop.start));
				if (tprop.string != ".") return;
				tprop = editor.getTokenAt(CodeMirror.Pos(cur.line, tprop.start));
				if (!context) context = [];
				context.push(tprop);
			}
			const list = [];
			let obj;
			if (Array.isArray(context)) {
				try {
					const code = context.length == 1 ? context[0].string : context.reduceRight((pre, cur) => (pre.string || pre) + '.' + cur.string);
					obj = eval(code);
					if (![null, undefined].includes(obj)) {
						const keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj))).filter(key => key.startsWith(token.string));
						list.addArray(keys);
					}
				} catch (_) { return; }
			} else if (token && typeof token.string == 'string') {
				//非开发者模式下，提示这些单词
				list.addArray(['player', 'card', 'cards', 'result', 'trigger', 'source', 'target', 'targets', 'lib', 'game', 'ui', 'get', 'ai', '_status']);
			}
			return {
				list: [...new Set(getCompletions(token, context, keywords, options).concat(list))]
					.filter(key => key.startsWith(token.string))
					.sort((a, b) => (a + '').localeCompare(b + ''))
					.map(text => {
						return {
							render(elt, data, cur) {
								var icon = document.createElement("span");
								var className = "cm-completionIcon cm-completionIcon-";
								if (obj) {
									const type = typeof obj[text];
									if (type == 'function') {
										className += 'function';
									}
									else if (type == 'string') {
										className += 'text';
									}
									else if (type == 'boolean') {
										className += 'variable';
									}
									else {
										className += 'namespace';
									}
								} else {
									if (javascriptKeywords.includes(text)) {
										className += 'keyword';
									}
									else if (window[text]) {
										const type = typeof window[text];
										if (type == 'function') {
											className += 'function';
										}
										else if (type == 'string') {
											className += 'text';
										}
										else if (text == 'window' || type == 'boolean') {
											className += 'variable';
										}
										else {
											className += 'namespace';
										}
									} else {
										className += 'namespace';
									}
								}
								icon.className = className;
								elt.appendChild(icon);
								elt.appendChild(document.createTextNode(text));
							},
							displayText: text,
							text: text,
						};
					}),
				from: CodeMirror.Pos(cur.line, token.start),
				to: CodeMirror.Pos(cur.line, token.end)
			};
		}
		function javascriptHint(editor, options) {
			return scriptHint(editor, javascriptKeywords, function (e, cur) { return e.getTokenAt(cur); }, options);
		}
		//覆盖原本的javascript提示
		CodeMirror.registerHelper("hint", "javascript", javascriptHint);
		const stringProps = Object.getOwnPropertyNames(String.prototype);
		const arrayProps = Object.getOwnPropertyNames(Array.prototype);
		const funcProps = Object.getOwnPropertyNames(Array.prototype);
		const javascriptKeywords = ("break case catch class const continue debugger default delete do else export extends from false finally for function " +
			"if in import instanceof let new null return super switch this throw true try typeof var void while with yield").split(" ");
		function getCompletions(token, context, keywords, options) {
			let found = [], start = token.string, global = options && options.globalScope || window;
			function maybeAdd(str) {
				if (str.lastIndexOf(start, 0) == 0 && !found.includes(str)) found.push(str);
			}
			function gatherCompletions(obj) {
				if (typeof obj == "string") forEach(stringProps, maybeAdd);
				else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
				else if (obj instanceof Function) forEach(funcProps, maybeAdd);
				forAllProps(obj, maybeAdd);
			}
			if (context && context.length) {
				//If this is a property, see if it belongs to some object we can
				//find in the current environment.
				let obj = context.pop(), base;
				if (obj.type && obj.type.indexOf("variable") === 0) {
					if (options && options.additionalContext)
						base = options.additionalContext[obj.string];
					if (!options || options.useGlobalScope !== false)
						base = base || global[obj.string];
				} else if (obj.type == "string") {
					base = "";
				} else if (obj.type == "atom") {
					base = 1;
				} else if (obj.type == "function") {
					if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') && (typeof global.jQuery == 'function'))
						base = global.jQuery();
					else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
						base = global._();
				}
				while (base != null && context.length)
					base = base[context.pop().string];
				if (base != null) gatherCompletions(base);
			} else {
				//If not, just look in the global object, any local scope, and optional additional-context
				//(reading into JS mode internals to get at the local and global variables)
				for (let v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
				for (let c = token.state.context; c; c = c.prev) for (let v = c.vars; v; v = v.next) maybeAdd(v.name);
				for (let v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
				if (options && options.additionalContext != null) for (let key in options.additionalContext) maybeAdd(key);
				if (!options || options.useGlobalScope !== false) gatherCompletions(global);
				forEach(keywords, maybeAdd);
			}
			return found.sort((a, b) => (a + '').localeCompare(b + ''));
		}
	}
	static setIntro(node, func, left) {
		if (lib.config.touchscreen) {
			if (left) {
				node.listen(ui.click.touchintro);
			}
			else {
				lib.setLongPress(node, ui.click.intro);
			}
		}
		else {
			if (left) {
				node.listen(ui.click.intro);
			}
			if (lib.config.hover_all && !lib.device) {
				lib.setHover(node, ui.click.hoverplayer);
			}
			if (lib.config.right_info) {
				node.oncontextmenu = ui.click.rightplayer;
			}
		}
		// if(!left){
		// 	lib.setPressure(node,ui.click.rightpressure);
		// }
		if (func) {
			node._customintro = func;
		}
	}
	static setPopped(node, func, width, height, forceclick, paused2) {
		node._poppedfunc = func;
		node._poppedwidth = width;
		node._poppedheight = height;
		if (forceclick) {
			node.forceclick = true;
		}
		if (lib.config.touchscreen || forceclick) {
			node.listen(ui.click.hoverpopped);
		}
		else {
			node.addEventListener('mouseenter', ui.click.hoverpopped);
			// node.addEventListener('mouseleave',ui.click.hoverpopped_leave);
		}
		if (paused2) {
			node._paused2 = true;
		}
	}
	static placePoppedDialog(dialog, e) {
		if (dialog._place_text) {
			if (dialog._place_text.firstChild.offsetWidth >= 190 || dialog._place_text.firstChild.offsetHeight >= 30) {
				dialog._place_text.style.marginLeft = '14px';
				dialog._place_text.style.marginRight = '14px';
				dialog._place_text.style.textAlign = 'left';
				dialog._place_text.style.width = 'calc(100% - 28px)';
			}
		}
		if (e.touches && e.touches[0]) {
			e = e.touches[0];
		}
		var height = Math.min(ui.window.offsetHeight - 20, dialog.content.scrollHeight);
		if (dialog._mod_height) {
			height += dialog._mod_height;
		}
		dialog.style.height = height + 'px';
		if (e.clientX / game.documentZoom < ui.window.offsetWidth / 2) {
			dialog.style.left = (e.clientX / game.documentZoom + 10) + 'px';
		}
		else {
			dialog.style.left = (e.clientX / game.documentZoom - dialog.offsetWidth - 10) + 'px';
		}
		var idealtop = (e.clientY || 0) / game.documentZoom - dialog.offsetHeight / 2;
		if (typeof idealtop != 'number' || isNaN(idealtop) || idealtop <= 5) {
			idealtop = 5;
		}
		else if (idealtop + dialog.offsetHeight + 10 > ui.window.offsetHeight) {
			idealtop = ui.window.offsetHeight - 10 - dialog.offsetHeight;
		}
		dialog.style.top = idealtop + 'px';
	}
	static setHover(node, func, hoveration, width) {
		node._hoverfunc = func;
		if (typeof hoveration == 'number') {
			node._hoveration = hoveration;
		}
		if (typeof width == 'number') {
			node._hoverwidth = width;
		}
		node.addEventListener('mouseenter', ui.click.mouseenter);
		node.addEventListener('mouseleave', ui.click.mouseleave);
		node.addEventListener('mousedown', ui.click.mousedown);
		node.addEventListener('mousemove', ui.click.mousemove);
		return node;
	}
	static setScroll(node) {
		node.ontouchstart = ui.click.touchStart;
		node.ontouchmove = ui.click.touchScroll;
		node.style.webkitOverflowScrolling = 'touch';
		return node;
	}
	static setMousewheel(node) {
		if (lib.config.mousewheel) node.onmousewheel = ui.click.mousewheel;
	}
	static setLongPress(node, func) {
		node.addEventListener('touchstart', ui.click.longpressdown);
		node.addEventListener('touchend', ui.click.longpresscancel);
		node._longpresscallback = func;
		return node;
	}
	static updateCanvas(time) {
		if (lib.canvasUpdates.length === 0) {
			lib.status.canvas = false;
			return false;
		}
		ui.canvas.width = ui.arena.offsetWidth;
		ui.canvas.height = ui.arena.offsetHeight;
		var ctx = ui.ctx;
		ctx.shadowBlur = 5;
		ctx.shadowColor = 'rgba(0,0,0,0.3)';
		ctx.strokeStyle = 'white';
		// ctx.lineCap='round';
		ctx.lineWidth = 3;
		ctx.save();
		for (var i = 0; i < lib.canvasUpdates.length; i++) {
			ctx.restore();
			ctx.save();
			var update = lib.canvasUpdates[i];
			if (!update.starttime) {
				update.starttime = time;
			}
			if (update(time - update.starttime, ctx) === false) {
				lib.canvasUpdates.splice(i--, 1);
			}
		}
	}
	static run(time) {
		lib.status.time = time;
		for (var i = 0; i < lib.updates.length; i++) {
			if (!('_time' in lib.updates[i])) {
				lib.updates[i]._time = time;
			}
			if (lib.updates[i](time - lib.updates[i]._time - lib.status.delayed) === false) {
				lib.updates.splice(i--, 1);
			}
		}
		if (lib.updates.length) {
			lib.status.frameId = requestAnimationFrame(lib.run);
		}
		else {
			lib.status.time = 0;
			lib.status.delayed = 0;
		}
	}
	static getUTC(date) {
		return date.getTime();
	}
	static saveVideo() {
		if (_status.videoToSave) {
			game.export(lib.init.encode(JSON.stringify(_status.videoToSave)),
				'无名杀 - 录像 - ' + _status.videoToSave.name[0] + ' - ' + _status.videoToSave.name[1]);
		}
	}
	static genAsync(fn) { return gnc.of(fn); }
	static genAwait(item) { return gnc.is.generator(item) ? gnc.of(function* () { for (const content of item) { yield content; } })() : Promise.resolve(item); }
	static gnc = {
		of: fn => gnc.of(fn),
		is: {
			coroutine: item => gnc.is.coroutine(item),
			generatorFunc: item => gnc.is.generatorFunc(item),
			generator: item => gnc.is.generator(item)
		}
	};
	static comparator = {
		equals: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return true;
			for (let i = 1; i < arguments.length; ++i) if (arguments[i] !== arguments[0]) return false;
			return true;
		},
		equalAny: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return true;
			for (let i = 1; i < arguments.length; ++i) if (arguments[i] === arguments[0]) return true;
			return false;
		},
		notEquals: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return true;
			for (let i = 1; i < arguments.length; ++i) if (arguments[i] === arguments[0]) return false;
			return true;
		},
		notEqualAny: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return true;
			for (let i = 1; i < arguments.length; ++i) if (arguments[i] !== arguments[0]) return true;
			return false;
		},
		typeEquals: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return arguments[0] !== null;
			const type = typeof arguments[0];
			for (let i = 1; i < arguments.length; ++i) if (type !== arguments[i]) return false;
			return true;
		}
	};
	static creation = {
		get array() {
			return [];
		},
		get object() {
			return {};
		},
		get nullObject() {
			return Object.create(null);
		},
		get string() {
			return "";
		}
	};
	static linq = {
		cselector: {
			hasAttr: name => `[${name}]`,
			isAttr: (name, item) => `[${name}=${item}]`,
			inAttr: (name, item) => `[${name}~=${item}]`,
			conAttr: (name, item) => `[${name}*=${item}]`,
			onAttr: (name, item) => `[${name}|=${item}]`,
			bgnAttr: (name, item) => `[${name}^=${item}]`,
			endAttr: (name, item) => `[${name}^=${item}]`,
			merge: function () { return Array.from(arguments).join(" "); },
			of: function () { return Array.from(arguments).join(""); },
			class: function () { return `.${Array.from(arguments).join(".")}`; },
			group: function () { return Array.from(arguments).join(","); },
			media: type => `@media ${type}`
		},
		dom: {
			attributes: {
				style(name, value) {
					return {
						_type: "style",
						name: name,
						value: value
					};
				}
			},
			inject(element, options) {
				//处理id和class
				if (options.identity) {
					for (const item of options.identity) {
						if (item.startsWith("#")) element.id = item.slice(1);
						else element.classList.add(item);
					}
				}
				//处理属性
				if (options.attributes) {
					for (const item in options.attributes) element.setAttribute(item, options.attributes[item]);
				}
				//处理样式
				if (options.style) {
					for (const item in options.style) element.style[item] = options.style[item];
				}
				//处理内容
				if (options.content) {
					element.innerHTML = options.content;
				}
				//处理子元素
				if (options.childs) {
					for (const item of options.childs) {
						element.appendChild(item);
					}
				}
				return element;
			},
			generate() {
				let result = lib.creation.nullObject;
				const args = Array.from(arguments);
				for (const item of args) {
					switch (typeof item) {
						case "object":
							switch (item.constructor) {
								case Object:
								case null:
									if ("_type" in item) {
										const type = item["_type"];
										if (!(type in result)) result[type] = lib.creation.nullObject;
										result[type][item.name] = item.value;
									}
									else {
										if (!("style" in result)) result.style = lib.creation.nullObject;
										for (const name in item) {
											result.style[name] = item[name];
										}
									}
									break;
								default:
									if (!("childs" in result)) result.childs = lib.creation.array;
									result.childs.add(item);
									break;
							}
							break;
						case "string":
							if (/^\.|#/.test(item)) {
								if (!("identity" in result)) result.identity = lib.creation.array;
								const identities = item.split(".").filter(Boolean);
								for (const item of identities) result.identity.add(item);
							}
							else result.content = item;
							break;
					}
				}
				return result;
			},
			attribute(name, value) {
				return {
					_type: "attributes",
					name: name,
					value: value
				};
			},
			div() {
				const dom = lib.linq.dom;
				return dom.inject(document.createElement("div"), dom.generate(...arguments));
			}
		}
	};
	static init = LibInit;
	static cheat = {
		i: function () {
			window.cheat = lib.cheat;
			window.game = game;
			window.ui = ui;
			window.get = get;
			window.ai = ai;
			window.lib = lib;
			window._status = _status;
		},
		dy: function () {
			var next = game.me.next;
			for (var i = 0; i < 10; i++) {
				if (next.identity != 'zhu') {
					break;
				}
				next = next.next;
			}
			next.die();
		},
		x: function () {
			var gl = function (dir, callback) {
				var files = [], folders = [];
				dir = '/Users/widget/Documents/extension/' + dir;
				lib.node.fs.readdir(dir, function (err, filelist) {
					for (var i = 0; i < filelist.length; i++) {
						if (filelist[i][0] != '.' && filelist[i][0] != '_') {
							if (lib.node.fs.statSync(dir + '/' + filelist[i]).isDirectory()) {
								folders.push(filelist[i]);
							}
							else {
								files.push(filelist[i]);
							}
						}
					}
					callback(folders, files);
				});
			};
			var args = Array.from(arguments);
			for (var i = 0; i < args.length; i++) {
				args[i] = args[i][0];
			}
			gl('', function (list) {
				if (args.length) {
					for (var i = 0; i < list.length; i++) {
						if (!args.contains(list[i][0])) {
							list.splice(i--, 1);
						}
					}
				}
				if (list.length) {
					for (var i = 0; i < list.length; i++) {
						(function (str) {
							gl(str, function (folders, files) {
								if (files.length > 1) {
									for (var i = 0; i < files.length; i++) {
										if (files[i].includes('extension.js')) {
											files.splice(i--, 1);
										}
										else {
											if (i % 5 == 0) {
												str += '\n\t\t\t';
											}
											str += '"' + files[i] + '",';
										}
									}
									console.log(str.slice(0, str.length - 1));
								}
							});
						}(list[i]));
					}
				}
			});
		},
		cfg: function () {
			var mode = lib.config.all.mode.slice(0);
			mode.remove('connect');
			mode.remove('brawl');
			var banned = ['shen_guanyu', 'shen_caocao', 'caopi', 're_daqiao', 'caorui',
				'daqiao', 'lingcao', 'liuzan', 'lusu', 'luxun', 'yanwen', 'zhouyu', 'ns_wangyue', 'gw_yenaifa',
				'old_caozhen', 'swd_jiangziya', 'xuhuang', 'maliang', 'guojia', 'simayi', 'swd_kangnalishi', 'hs_siwangzhiyi', 'hs_nozdormu', 'old_zhuzhi'];
			var bannedcards = ['zengbin'];
			var favs = ["hs_tuoqi", "hs_siwangxianzhi", "hs_xukongzhiying", "hs_hsjiasha", "gjqt_xieyi", "gjqt_yunwuyue", "gjqt_beiluo",
				"gjqt_cenying", "shen_lvmeng", "shen_zhaoyun", "shen_zhugeliang", "ow_ana", "chenlin", "ns_guanlu", "hs_guldan", "swd_guyue",
				"pal_jiangyunfan", "mtg_jiesi", "swd_lanyin", "pal_liumengli", "swd_muyun", "pal_nangonghuang", "swd_muyue", "pal_murongziying",
				"swd_qiner", "pal_shenqishuang", "hs_taisi", "wangji", "pal_xingxuan", "xunyou", "hs_yelise", "pal_yuejinzhao", "pal_yueqi",
				"gjqt_yuewuyi", "swd_yuxiaoxue", "ow_zhaliya", "zhangchunhua", "hs_zhihuanhua", "swd_zhiyin", "old_zhonghui", "gjqt_bailitusu",
				"hs_barnes", "ow_dva", "swd_hengai", "pal_jushifang", "hs_kazhakusi", "hs_lafamu", "ow_liekong", "hs_lreno", "pal_mingxiu",
				"swd_murongshi", "gw_oudimu", "gjqt_ouyangshaogong", "hs_pyros", "qinmi", "gw_sanhanya", "hs_selajin", "swd_shuwaner",
				"swd_situqiang", "hs_xialikeer", "pal_xuejian", "swd_yuchiyanhong", "swd_yuwentuo", "swd_zhaoyun", "zhugeliang", "gw_aigeleisi",
				"gw_aimin", "gjqt_aruan", "hs_aya", "swd_cheyun", "swd_chenjingchou", "gw_diandian", "swd_huzhongxian", "hs_jinglinglong",
				"hs_kaituozhe", "hs_kalimosi", "gw_linjing", "ow_luxiao", "re_luxun", "hs_morgl", "swd_sikongyu", "hs_sthrall", "sunquan",
				"sunshangxiang", "gw_yioufeisisp", "gw_yisilinni", "hs_yogg", "hs_ysera", "pal_yuntianhe", "zhugejin", "zhugeke", "gw_zhuoertan",
				"hs_anduin", "swd_anka", "ow_banzang", "ow_chanyata", "diaochan", "swd_duguningke", "sp_diaochan", "hetaihou", "ns_huamulan",
				"swd_huanglei", "swd_huanyuanzhi", "re_huatuo", "gw_huoge", "pal_jiangcheng", "yj_jushou", "swd_kendi", "yxs_libai",
				"mtg_lilianna", "xin_liru", "liuxie", "pal_lixiaoyao", "pal_longkui", "ns_nanhua", "swd_qi", "swd_septem", "gw_shasixiwusi",
				"ow_tianshi", "swd_weida", "gjqt_xiayize", "swd_xiyan", "hs_xsylvanas", "hs_yelinlonghou", "ow_yuanshi", "zuoci"];
			var vintage = ['tianjian', 'shuiyun', 'zhuyue', 'zhimeng', 'poyun', 'qianfang', 'xfenxin', 'danqing', 'ywuhun', 'tianwu', 'xuelu',
				'shahun', 'yuling', 'duhun', 'liaoyuan', 'touxi', 'wangchen', 'poyue', 'kunlunjing', 'huanhun', 'yunchou', 'tuzhen', 'cyqiaoxie',
				'mufeng', 'duanyi', 'guozao', 'yaotong', 'pozhen', 'tanlin', 'susheng', 'jikong', 'shouyin', 'jilve', 'hxunzhi', 'huodan', 'shanxian',
				'ziyu', 'kuoyin', 'feiren', 'zihui', 'jidong', 'baoxue', 'aqianghua', 'maoding', 'bfengshi', 'zhongdun', 'pingzhang', 'maichong',
				'guozai', 'jingxiang', 'yuelu', 'liechao', 'fengnu', 'hanshuang', 'enze', 'malymowang', 'xshixin', 'qingzun'];
			var favmodes = ["versus|three", "versus|four", "versus|two", "chess|combat"];
			for (var i = 0; i < mode.length; i++) {
				game.saveConfig(mode[i] + '_banned', banned);
				game.saveConfig(mode[i] + '_bannedcards', bannedcards);
			}
			var characters = lib.config.all.characters.slice(0);
			characters.remove('standard');
			characters.remove('old');
			game.saveConfig('vintageSkills', vintage);
			game.saveConfig('favouriteCharacter', favs);
			game.saveConfig('favouriteMode', favmodes);
			game.saveConfig('theme', 'simple');
			game.saveConfig('player_border', 'slim');
			game.saveConfig('cards', lib.config.all.cards);
			game.saveConfig('characters', characters);
			game.saveConfig('change_skin', false);
			game.saveConfig('show_splash', 'off');
			game.saveConfig('show_favourite', false);
			game.saveConfig('animation', false);
			game.saveConfig('hover_all', false);
			game.saveConfig('asset_version', 'v1.9');
			// game.saveConfig('characters',lib.config.all.characters);
			// game.saveConfig('cards',lib.config.all.cards);
			game.saveConfig('plays', ['cardpile']);
			game.saveConfig('skip_shan', false);
			game.saveConfig('tao_enemy', true);
			game.saveConfig('layout', 'long2');
			game.saveConfig('hp_style', 'ol');
			game.saveConfig('background_music', 'music_off');
			game.saveConfig('background_audio', false);
			game.saveConfig('background_speak', false);
			game.saveConfig('show_volumn', false);
			game.saveConfig('show_replay', true);
			game.saveConfig('autostyle', true);
			game.saveConfig('debug', true);
			game.saveConfig('dev', true);
			if (!lib.device) {
				game.saveConfig('sync_speed', false);
			}
			game.reload();
		},
		o: function () {
			ui.arena.classList.remove('observe');
		},
		pt: function () {
			var list = Array.from(arguments);
			while (list.length) {
				var card = cheat.gn(list.pop());
				if (card) ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
			}
		},
		q: function () {
			// if(lib.config.layout!='mobile') lib.init.layout('mobile');
			if (arguments.length == 0) {
				var style = ui.css.card_style;
				if (lib.config.card_style != 'simple') {
					lib.config.card_style = 'simple';
					ui.css.card_style = lib.init.css(lib.assetURL + 'theme/style/card', 'simple');
				}
				else {
					lib.config.card_style = 'default';
					ui.css.card_style = lib.init.css(lib.assetURL + 'theme/style/card', 'default');
				}
				style.remove();
			}
			else {
				for (var i = 0; i < arguments.length; i++) {
					cheat.g(arguments[i]);
				}
			}
			ui.arena.classList.remove('selecting');
			ui.arena.classList.remove('tempnoe');
		},
		p: function (name, i, skin) {
			var list = ['swd', 'hs', 'pal', 'gjqt', 'ow', 'gw'];
			if (!lib.character[name]) {
				for (var j = 0; j < list.length; j++) {
					if (lib.character[list[j] + '_' + name]) {
						name = list[j] + '_' + name; break;
					}
				}
			}
			if (skin) {
				lib.config.skin[name] = skin;
			}
			var target;
			if (typeof i == 'number') {
				target = game.players[i];
			}
			else {
				target = game.me.next;
			}
			if (!lib.character[name]) {
				target.node.avatar.setBackground(name, 'character');
				target.node.avatar.show();
			}
			else {
				target.init(name);
			}
			if (i === true) {
				if (lib.config.layout == 'long2') {
					lib.init.layout('mobile');
				}
				else {
					lib.init.layout('long2');
				}
			}
		},
		e: function () {
			var cards = [], target;
			for (var i = 0; i < arguments.length; i++) {
				if (get.itemtype(arguments[i]) == 'player') {
					target = arguments[i];
				}
				else {
					cards.push(game.createCard(arguments[i]));
				}
			}
			if (!cards.length) {
				cards.push(game.createCard('qilin'));
				cards.push(game.createCard('bagua'));
				cards.push(game.createCard('dilu'));
				cards.push(game.createCard('chitu'));
				cards.push(game.createCard('muniu'));
			}
			target = target || game.me;
			for (var i = 0; i < cards.length; i++) {
				var card = target.getEquip(cards[i]);
				if (card) {
					card.discard();
					target.removeEquipTrigger(card);
				}
				target.$equip(cards[i]);
			}
		},
		c: function () {
			(function () {
				var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0;
				var sa = 0, sb = 0, sc = 0, sd = 0, se = 0, sf = 0, sg = 0;
				for (var i in lib.character) {
					switch (lib.character[i][1]) {
						case 'wei': a++; if (lib.config.banned.contains(i)) sa++; break;
						case 'shu': b++; if (lib.config.banned.contains(i)) sb++; break;
						case 'wu': c++; if (lib.config.banned.contains(i)) sc++; break;
						case 'qun': d++; if (lib.config.banned.contains(i)) sd++; break;
						case 'jin': g++; if (lib.config.banned.contains(i)) sg++; break;
						case 'western': e++; if (lib.config.banned.contains(i)) se++; break;
						case 'key': f++; if (lib.config.banned.contains(i)) sf++; break;
					}
				}
				console.log('魏：' + (a - sa) + '/' + a);
				console.log('蜀：' + (b - sb) + '/' + b);
				console.log('吴：' + (c - sc) + '/' + c);
				console.log('群：' + (d - sd) + '/' + d);
				console.log('晋：' + (g - sg) + '/' + g);
				console.log('西：' + (e - se) + '/' + e);
				console.log('键：' + (f - sf) + '/' + f);
				console.log('已启用：' + ((a + b + c + d + e + f) - (sa + sb + sc + sd + se + sf)) + '/' + (a + b + c + d + e + f));
			}());
			(function () {
				var a = 0, b = 0, c = 0, d = 0;
				var aa = 0, bb = 0, cc = 0, dd = 0;
				var sa = 0, sb = 0, sc = 0, sd = 0;
				var sha = 0, shan = 0, tao = 0, jiu = 0, wuxie = 0, heisha = 0, hongsha = 0;
				var num = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 };
				for (var i in lib.card) {
					if (get.objtype(lib.card[i]) == 'object' && lib.translate[i + '_info']) {
						switch (lib.card[i].type) {
							case 'basic': a++; break;
							case 'trick': b++; break;
							case 'equip': c++; break;
							default: d++; break;
						}
					}
				}
				for (var i = 0; i < lib.card.list.length; i++) {
					if (typeof lib.card[lib.card.list[i][2]] == 'object') {
						switch (lib.card[lib.card.list[i][2]].type) {
							case 'basic': aa++; break;
							case 'trick': case 'delay': bb++; break;
							case 'equip': cc++; break;
							default: dd++; break;
						}
						switch (lib.card.list[i][0]) {
							case 'heart': sa++; break;
							case 'diamond': sb++; break;
							case 'club': sc++; break;
							case 'spade': sd++; break;
						}
						if (lib.card.list[i][2] == 'sha') {
							sha++;
							if (lib.card.list[i][0] == 'club' || lib.card.list[i][0] == 'spade') {
								heisha++;
							}
							else {
								hongsha++;
							}
						}
						if (lib.card.list[i][2] == 'shan') {
							shan++;
						}
						if (lib.card.list[i][2] == 'tao') {
							tao++;
						}
						if (lib.card.list[i][2] == 'jiu') {
							jiu++;
						}
						if (lib.card.list[i][2] == 'wuxie') {
							wuxie++;
						}
						num[lib.card.list[i][1]]++;
					}
				}
				var str = '基本牌' + aa + '； ' + '锦囊牌' + bb + '； ' + '装备牌' + cc + '； ' + '其它牌' + dd;
				console.log(str);
				str = '红桃牌' + sa + '； ' + '方片牌' + sb + '； ' + '梅花牌' + sc + '； ' + '黑桃牌' + sd;
				console.log(str);
				str = '杀' + sha + '； ' + '黑杀' + heisha + '； ' + '红杀' + hongsha + '； ' + '闪' + shan + '； ' + '桃' + tao + '； ' + '酒' + jiu + '； ' + '无懈' + wuxie;
				console.log(str);
				if (arguments[1]) {
					for (var i = 1; i <= 13; i++) {
						if (i < 10) {
							console.log(i + ' ', num[i]);
						}
						else {
							console.log(i, num[i]);
						}
					}
				}
				var arr = [];
				for (var i = 1; i <= 13; i++) {
					arr.push(num[i]);
				}
				console.log((a + b + c + d) + '/' + (aa + bb + cc + dd), ...arr);
			}());
		},
		id: function () {
			game.showIdentity();
		},
		b: function () {
			if (!ui.dialog || !ui.dialog.buttons) return;
			for (var i = 0; i < Math.min(arguments.length, ui.dialog.buttons.length); i++) {
				ui.dialog.buttons[i].link = arguments[i];
			}
		},
		uy: function (me) {
			if (me) {
				game.me.useCard({ name: 'spell_yexinglanghun' }, game.me);
			}
			else {
				var enemy = game.me.getEnemy();
				enemy.useCard({ name: 'spell_yexinglanghun' }, enemy);
			}
		},
		gs: function (name, act) {
			var card = game.createCard('spell_' + (name || 'yexinglanghun'));
			game.me.node.handcards1.appendChild(card);
			if (!act) {
				game.me.actused = -99;
			}
			ui.updatehl();
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			setTimeout(game.check, 300);
		},
		gc: function (name, act) {
			var card = game.createCard('stone_' + (name || 'falifulong') + '_stonecharacter');
			game.me.node.handcards1.appendChild(card);
			if (!act) {
				game.me.actused = -99;
			}
			ui.updatehl();
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			setTimeout(game.check, 300);
		},
		a: function (bool) {
			if (lib.config.test_game) {
				game.saveConfig('test_game');
			}
			else {
				if (bool) {
					if (typeof bool === 'string') {
						game.saveConfig('test_game', bool);
					}
					else {
						game.saveConfig('test_game', '_');
					}
				}
				else {
					game.saveConfig('test_game', true);
				}
			}
			game.reload();
		},
		as: function () {
			ui.window.classList.remove('testing');
			var bg = ui.window.querySelector('.pausedbg');
			if (bg) {
				bg.remove();
			}
		},
		uj: function () {
			cheat.e('qilin');
			game.me.next.useCard({ name: 'jiedao' }, [game.me, game.me.previous]);
		},
		u: function () {
			var card = { name: 'sha' }, source = game.me.next, targets = [];
			for (var i = 0; i < arguments.length; i++) {
				if (get.itemtype(arguments[i]) == 'player') {
					source = arguments[i];
				}
				else if (Array.isArray(arguments[i])) {
					targets = arguments[i];
				}
				else if (typeof arguments[i] == 'object' && arguments[i]) {
					card = arguments[i];
				}
				else if (typeof arguments[i] == 'string') {
					card = { name: arguments[i] };
				}
			}
			if (!targets.length) targets.push(game.me);
			source.useCard(game.createCard(card.name, card.suit, card.number, card.nature), targets);
		},
		r: function (bool) {
			var list = ['s', 'ap', 'a', 'am', 'bp', 'b', 'bm', 'c', 'd'];
			var str = '';
			for (var i = 0; i < list.length; i++) {
				if (str) str += ' 、 ';
				str += list[i] + '-' + lib.rank[list[i]].length;
			}
			console.log(str);
			for (var i in lib.characterPack) {
				if (!bool && lib.config.all.sgscharacters.contains(i)) continue;
				var map = {};
				var str = '';
				for (var j in lib.characterPack[i]) {
					var rank = get.rank(j);
					if (!map[rank]) {
						map[rank] = 1;
					}
					else {
						map[rank]++;
					}
				}
				for (var j = 0; j < list.length; j++) {
					if (map[list[j]]) {
						if (str) str += ' 、 ';
						str += list[j] + '-' + map[list[j]];
					}
				}
				if (str) {
					console.log(lib.translate[i + '_character_config'] + '：' + str);
				}
			}

			var list = lib.rank.s.concat(lib.rank.ap).concat(lib.rank.a).concat(lib.rank.am).
				concat(lib.rank.bp).concat(lib.rank.b).concat(lib.rank.bm).concat(lib.rank.c).concat(lib.rank.d);
			Object.keys(lib.character).forEach(key => {
				if (!lib.config.forbidai.includes(key) && !key.startsWith('boss_') && !key.startsWith('tafang_') && !list.includes(key)) console.log(get.translation(key), key);
			});
		},
		h: function (player) {
			console.log(get.translation(player.getCards('h')));
		},
		g: function () {
			for (var i = 0; i < arguments.length; i++) {
				if (i > 0 && typeof arguments[i] == 'number') {
					for (var j = 0; j < arguments[i] - 1; j++) {
						cheat.gx(arguments[i - 1]);
					}
				}
				else {
					cheat.gx(arguments[i]);
				}
			}
		},
		ga: function (type) {
			for (var i in lib.card) {
				if (lib.card[i].type == type || lib.card[i].subtype == type) {
					cheat.g(i);
				}
			}
		},
		gg: function () {
			for (var i = 0; i < game.players.length; i++) {
				for (var j = 0; j < arguments.length; j++) {
					cheat.gx(arguments[j], game.players[i]);
				}
			}
		},
		gx: function (name, target) {
			target = target || game.me;
			var card = cheat.gn(name);
			if (!card) return;
			target.node.handcards1.appendChild(card);
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			game.check();
			target.update();
			ui.updatehl();
		},
		gn: function (name) {
			var nature = null;
			var suit = null;
			var suits = ['club', 'spade', 'diamond', 'heart'];
			for (var i = 0; i < suits.length; i++) {
				if (name.startsWith(suits[i])) {
					suit = suits[i];
					name = name.slice(suits[i].length);
					break;
				}
			}
			if (name.startsWith('red')) {
				name = name.slice(3);
				suit = ['diamond', 'heart'].randomGet();
			}
			if (name.startsWith('black')) {
				name = name.slice(5);
				suit = ['spade', 'club'].randomGet();
			}

			if (name == 'huosha') {
				name = 'sha';
				nature = 'fire';
			}
			else if (name == 'leisha') {
				name = 'sha';
				nature = 'thunder';
			}
			if (!lib.card[name]) {
				return null;
			}
			return game.createCard(name, suit, null, nature);
		},
		ge: function (target) {
			if (target) {
				cheat.gx('zhuge', target);
				cheat.gx('qinglong', target);
				cheat.gx('bagua', target);
				cheat.gx('dilu', target);
				cheat.gx('chitu', target);
				cheat.gx('muniu', target);
			}
			else {
				cheat.g('zhuge');
				cheat.g('qinglong');
				cheat.g('bagua');
				cheat.g('dilu');
				cheat.g('chitu');
				cheat.g('muniu');
			}
		},
		gj: function () {
			cheat.g('shandian');
			cheat.g('huoshan');
			cheat.g('hongshui');
			cheat.g('lebu');
			cheat.g('bingliang');
			cheat.g('guiyoujie');
		},
		gf: function () {
			for (var i in lib.card) {
				if (lib.card[i].type == 'food') {
					cheat.g(i);
				}
			}
		},
		d: function (num, target) {
			if (num == undefined) num = 1;
			var cards = get.cards(num);
			for (var i = 0; i < num; i++) {
				var card = cards[i];
				game.me.node.handcards1.appendChild(card);
				delete _status.event._cardChoice;
				delete _status.event._targetChoice;
				delete _status.event._skillChoice;
				game.check();
				game.me.update();
				ui.updatehl();
			}
		},
		s: function () {
			for (var i = 0; i < arguments.length; i++) {
				game.me.addSkill(arguments[i], true);
			}
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			game.check();
		},
		t: function (num) {
			if (game.players.contains(num)) {
				num = game.players.indexOf(num);
			}
			if (num == undefined) {
				for (var i = 0; i < game.players.length; i++) cheat.t(i);
				return;
			}
			var player = game.players[num];
			var cards = player.getCards('hej');
			for (var i = 0; i < cards.length; i++) {
				cards[i].discard();
			}
			player.removeEquipTrigger();
			player.update();
		},
		to: function () {
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i] != game.me) {
					cheat.t(i);
				}
			}
		},
		tm: function () {
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i] == game.me) {
					cheat.t(i);
				}
			}
		},
		k: function (i) {
			if (i == undefined) i = 1;
			game.players[i].hp = 1;
			cheat.t(i);
			cheat.g('juedou');
		},
		z: function (name) {
			switch (name) {
				case 'cc': name = 're_caocao'; break;
				case 'lb': name = 're_liubei'; break;
				case 'sq': name = 'sunquan'; break;
				case 'dz': name = 'dongzhuo'; break;
				case 'ys': name = 're_yuanshao'; break;
				case 'zj': name = 'sp_zhangjiao'; break;
				case 'ls': name = 'liushan'; break;
				case 'sc': name = 'sunce'; break;
				case 'cp': name = 'caopi'; break;
				case 'cr': name = 'caorui'; break;
				case 'sx': name = 'sunxiu'; break;
				case 'lc': name = 'liuchen'; break;
				case 'sh': name = 'sunhao'; break;
			}
			game.zhu.init(name);
			game.zhu.maxHp++;
			game.zhu.hp++;
			game.zhu.update();
		},
	};
	static translate = {
		flower: '鲜花',
		egg: '鸡蛋',
		wine: '酒杯',
		shoe: '拖鞋',
		yuxisx: '玉玺',
		jiasuo: '枷锁',
		junk: '平凡',
		common: '普通',
		rare: '精品',
		epic: '史诗',
		legend: '传说',
		default: "默认",
		special: '特殊',
		zhenfa: '阵法',
		aozhan: "鏖战",
		mode_derivation_card_config: '衍生',
		mode_banned_card_config: '禁卡',
		mode_favourite_character_config: '收藏',
		mode_banned_character_config: '禁将',
		heart: "♥︎",
		diamond: "♦︎",
		spade: "♠︎",
		club: "♣︎",
		none: '◈',
		ghujia: '护甲',
		ghujia_bg: '甲',
		heart2: "红桃",
		diamond2: "方片",
		spade2: "黑桃",
		club2: "梅花",
		none2: '无色',
		red: '红色',
		black: '黑色',
		ok: "确定",
		ok2: "确定",
		cancel: "取消",
		cancel2: "取消",
		restart: "重新开始",
		setting: "设置",
		start: "开始",
		random: "随机",
		_out: '无效',
		agree: '同意',
		refuse: '拒绝',
		fire: "火",
		thunder: "雷",
		poison: "毒",
		kami: '神',
		ice: '冰',
		stab: '刺',
		wei: '魏',
		shu: '蜀',
		wu: '吴',
		qun: '群',
		shen: '神',
		western: '西',
		key: '键',
		jin: '晋',
		double: '双',
		wei2: '魏国',
		shu2: '蜀国',
		wu2: '吴国',
		qun2: '群雄',
		shen2: '神明',
		western2: '西方',
		key2: 'KEY',
		jin2: '晋朝',
		double2: '双势力',
		male: '男',
		female: '女',
		mad: '混乱',
		mad_bg: '疯',
		draw_card: '摸牌',
		discard_card: '弃牌',
		take_damage: '受伤害',
		reset_character: '复原武将牌',
		recover_hp: '回复体力',
		lose_hp: '失去体力',
		get_damage: '受伤害',
		weiColor: "#b0d0e2",
		shuColor: "#ffddb9",
		wuColor: "#b2d9a9",
		qunColor: "#f6f6f6",
		shenColor: "#ffe14c",
		westernColor: "#ffe14c",
		jinColor: "#ffe14c",
		keyColor: "#c9b1fd",
		basic: '基本',
		equip: '装备',
		trick: '锦囊',
		delay: '延时锦囊',
		character: '角色',
		revive: '复活',
		equip1: '武器',
		equip2: '防具',
		equip3: '防御马',
		'equip3_4': '坐骑',
		equip4: '攻击马',
		equip5: '宝物',
		equip6: '特殊装备',
		zero: '零',
		one: '一',
		two: '二',
		three: '三',
		four: '四',
		five: '五',
		six: '六',
		seven: '七',
		eight: '八',
		nine: '九',
		ten: '十',
		_recasting: '重铸',
		_lianhuan: '连环',
		_lianhuan2: '连环',
		_kamisha: '神杀',
		_icesha: '冰杀',
		qianxing: '潜行',
		mianyi: '免疫',
		fengyin: '封印',
		baiban: '白板',
		_disableJudge: "判定区",

		xiaowu_emotion: '小无表情',
		guojia_emotion: '郭嘉表情',
		zhenji_emotion: '甄姬表情',
		shibing_emotion: '士兵表情',
		xiaosha_emotion: '小杀表情',
		xiaotao_emotion: '小桃表情',
		xiaojiu_emotion: '小酒表情',
		xiaokuo_emotion: '小扩表情',

		pause: '暂停',
		config: '选项',
		auto: '托管',

		unknown: '未知',
		unknown0: '一号位',
		unknown1: '二号位',
		unknown2: '三号位',
		unknown3: '四号位',
		unknown4: '五号位',
		unknown5: '六号位',
		unknown6: '七号位',
		unknown7: '八号位',
		unknown8: '九号位',
		unknown9: '十号位',
		unknown10: '十一号位',
		unknown11: '十二号位',

		feichu_equip1: "已废除",
		feichu_equip1_info: "武器栏已废除",
		feichu_equip2: "已废除",
		feichu_equip2_info: "防具栏已废除",
		feichu_equip3: "已废除",
		feichu_equip3_info: "防御坐骑栏已废除",
		feichu_equip4: "已废除",
		feichu_equip4_info: "攻击坐骑栏已废除",
		feichu_equip5: "已废除",
		feichu_equip5_info: "宝物栏已废除",
		feichu_equip6: '已废除',
		feichu_equip6_info: '特殊装备栏已废除',
		feichu_equip1_bg: "废",
		feichu_equip2_bg: "废",
		feichu_equip3_bg: "废",
		feichu_equip4_bg: "废",
		feichu_equip5_bg: "废",
		feichu_equip6_bg: '废',
		disable_judge: '已废除',
		disable_judge_info: '判定区已废除',
		disable_judge_bg: '废',
		pss: '手势',
		pss_paper: '布',
		pss_scissor: '剪刀',
		pss_stone: '石头',
		pss_paper_info: '石头剪刀布时的一种手势。克制石头，但被剪刀克制。',
		pss_scissor_info: '石头剪刀布时的一种手势。克制布，但被石头克制。',
		pss_stone_info: '石头剪刀布时的一种手势。克制剪刀，但被布克制。',
		renku: '仁库',
		group_wei: "魏势力",
		group_shu: "蜀势力",
		group_wu: "吴势力",
		group_qun: "群势力",
		group_key: "键势力",
		group_jin: "晋势力",
		group_wei_bg: "魏",
		group_shu_bg: "蜀",
		group_wu_bg: "吴",
		group_qun_bg: "群",
		group_key_bg: "键",
		group_jin_bg: "晋",
		zhengsu: '整肃',
		zhengsu_leijin: '擂进',
		zhengsu_bianzhen: '变阵',
		zhengsu_mingzhi: '鸣止',
		zhengsu_leijin_info: '回合内所有于出牌阶段使用的牌点数递增且不少于三张。',
		zhengsu_bianzhen_info: '回合内所有于出牌阶段使用的牌花色相同且不少于两张。',
		zhengsu_mingzhi_info: '回合内所有于弃牌阶段弃置的牌花色均不相同且不少于两张。',
		db_atk: '策略',
		db_atk1: '全军出击',
		db_atk2: '分兵围城',
		db_def: '策略',
		db_def1: '奇袭粮道',
		db_def2: '开城诱敌',
		cooperation_damage: '同仇',
		cooperation_damage_info: '双方累计造成至少4点伤害',
		cooperation_draw: '并进',
		cooperation_draw_info: '双方累计摸至少八张牌',
		cooperation_discard: '疏财',
		cooperation_discard_info: '双方累计弃置至少4种花色的牌',
		cooperation_use: '戮力',
		cooperation_use_info: '双方累计使用至少4种花色的牌',
		charge: '蓄力值',
		expandedSlots: '扩展装备栏',
		stratagem_fury: '怒气',
		_stratagem_add_buff: '强化'
	};
	static element = {
		content: Content,
		contents: Contents,
		Player: class extends HTMLDivElement {
			/**
			 * @param {HTMLDivElement} [position]
			 * @param {true} [noclick]
			 */
			constructor(position, noclick) {
				/**
				 * @type {Player}
				 */
				const player = ui.create.div('.player', position);
				Object.setPrototypeOf(player, lib.element.Player.prototype);
				player.build(noclick);
				return player;
			}
			build(noclick) {
				let player = this;
				player.buildNode();
				player.buildProperty();
				player.buildExtra();
				player.buildEventListener(noclick);
			}
			buildNode() {
				let player = this;
				const node = player.node = {
					avatar: ui.create.div('.avatar', player, ui.click.avatar).hide(),
					avatar2: ui.create.div('.avatar2', player, ui.click.avatar2).hide(),
					turnedover: ui.create.div('.turned', '<div>翻面<div>', player),
					framebg: ui.create.div('.framebg', player),
					intro: ui.create.div('.intro', player),
					identity: ui.create.div('.identity', player),
					hp: ui.create.div('.hp', player),
					name: ui.create.div('.name', player),
					name2: ui.create.div('.name.name2', player),
					nameol: ui.create.div('.nameol', player),
					count: ui.create.div('.count', player).hide(),
					equips: ui.create.div('.equips', player).hide(),
					judges: ui.create.div('.judges', player),
					marks: ui.create.div('.marks', player),
					chain: ui.create.div('.chain', '<div></div>', player),
					handcards1: ui.create.div('.handcards'),
					handcards2: ui.create.div('.handcards'),
					expansions: ui.create.div('.expansions')
				};
				node.expansions.style.display = 'none';
				const chainLength = game.layout == 'default' ? 64 : 40;
				for (let repetition = 0; repetition < chainLength; repetition++) {
					ui.create.div(node.chain.firstChild, '.cardbg').style.transform = `translateX(${repetition * 5 - 5}px)`;
				}
				node.action = ui.create.div('.action', node.avatar);
			}
			buildExtra() {
				let player = this;
				let node = player.node;
				node.link = player.mark(' ', {
					mark: get.linkintro
				});
				node.link.firstChild.setBackgroundImage('image/card/tiesuo_mark.png');
				node.link.firstChild.style.backgroundSize = 'cover';
				ui.create.div(node.identity);
			}
			buildProperty() {
				let player = this;
				player.phaseNumber = 0;
				player.skipList = [];
				player.skills = [];
				player.invisibleSkills = [];
				player.initedSkills = [];
				player.additionalSkills = {};
				player.disabledSkills = {};
				player.hiddenSkills = [];
				player.awakenedSkills = [];
				player.forbiddenSkills = {};
				player.popups = [];
				player.damagepopups = [];
				player.judging = [];
				player.stat = [{
					card: {},
					skill: {}
				}];
				player.actionHistory = [{
					useCard: [],
					respond: [],
					skipped: [],
					lose: [],
					gain: [],
					sourceDamage: [],
					damage: [],
					custom: [],
					useSkill: []
				}];
				player.tempSkills = {};
				player.storage = {};
				player.marks = {};
				player.expandedSlots = {};
				player.disabledSlots = {};
				player.ai = {
					friend: [],
					enemy: [],
					neutral: [],
					handcards: {
						global: [],
						source: [],
						viewed: []
					}
				};
				player.queueCount = 0;
				player.outCount = 0;
			}
			buildEventListener(noclick) {
				let player = this;
				let node = player.node;
				if (noclick) player.noclick = true;
				else {
					player.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.target);
					node.identity.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.identity);
					if (lib.config.touchscreen) player.addEventListener('touchstart', ui.click.playertouchstart);
				}
			}
			//新函数
			changeFury(amount, limit) {
				if (typeof this.storage.stratagem_fury != 'number') this.storage.stratagem_fury = 0;
				if (!amount) return;
				const furyBefore = this.storage.stratagem_fury;
				if (limit === true && typeof _status.stratagemFuryMax == 'number') this.storage.stratagem_fury = Math.min(Math.max(furyBefore + amount, 0), _status.stratagemFuryMax);
				else this.storage.stratagem_fury = Math.max(furyBefore + amount, 0);
				const difference = this.storage.stratagem_fury - furyBefore;
				if (!difference) return;
				game.log(this, difference > 0 ? '获得了' : '失去了', get.cnNumber(Math.abs(difference)), '点', '#r怒气');
				this.markSkill('stratagem_fury');
			}
			/**
			 * version 1.7
			 * 
			 * 链式创建一次性技能的api。
			 *
			 * 使用者只需要关注技能的效果，而不是技能的本身。
			 * 
			 * v1.7 可传递作用域
			 * @example
			 * ```js
			 * (function () {
			 * 	let _var = 1;
			 * 	let me = player;
			 * 	player.when('drawAfter')
			 * 		.apply(code => eval(code))
			 * 		.then(() => console.log(_var))
			 * 		.then('me.gainMaxHp(5)');
			 * })();
			 * ```
			 */
			when() {
				if (!_status.postReconnect.player_when) _status.postReconnect.player_when = [
					function (map) {
						"use strict";
						for (let i in map) {
							lib.skill[i] = {
								charlotte: true,
								forced: true,
								popup: false,
							};
							if (typeof map[i] == 'string') lib.translate[i] = map[i];
						}
					}, {}
				];
				let triggerNames = Array.from(arguments);
				let trigger;
				if (triggerNames.length == 0) throw 'player.when的参数数量应大于0';
				//add other triggerNames
				//arguments.length = 1
				if (triggerNames.length == 1) {
					//以下两种情况:
					//triggerNames = [ ['xxAfter', ...args] ]
					//triggerNames = [ 'xxAfter' ]
					if (Array.isArray(triggerNames[0]) || typeof triggerNames[0] == 'string') trigger = { player: triggerNames[0] };
					//triggerNames = [ {player:'xxx'} ]
					else if (get.is.object(triggerNames[0])) trigger = triggerNames[0];
				}
				//arguments.length > 1
				else {
					//triggerNames = [ 'xxAfter', 'yyBegin' ]
					if (triggerNames.every(t => typeof t == 'string')) trigger = { player: triggerNames };
					//triggerNames = [ {player: 'xxAfter'}, {global: 'yyBegin'} ]
					//此处不做特殊的合并处理，由使用者自行把握，同名属性后者覆盖前者
					else if (triggerNames.every(t => get.is.object(t))) trigger = triggerNames.reduce((pre, cur) => Object.assign(pre, cur));
				}
				if (!trigger) throw 'player.when传参数类型错误:' + triggerNames;
				let skillName;
				do {
					skillName = 'player_when_' + Math.random().toString(36).slice(-8);
				} while (lib.skill[skillName] != null);
				const after = `${skillName}After`;
				if (!trigger.player) trigger.player = after;
				else if (Array.isArray(trigger.player)) trigger.player.add(after);
				else if (typeof trigger.player == 'string') trigger.player = [trigger.player, after];
				const vars = {};
				/**
				 * 作用域
				 * @type { (code: string) => any }
				 */
				let scope;
				let skill = {
					trigger: trigger,
					forced: true,
					charlotte: true,
					popup: false,
					//必要条件
					filterFuns: [],
					//充分条件
					filter2Funs: [],
					contentFuns: [],
					//外部变量
					get vars() {
						return vars;
					},
					get filter() {
						return (event, player, name) => {
							if (name == `${skillName}After`) {
								skill.popup = false;
								return true;
							}
							return skill.filterFuns.every(fun => Boolean(fun(event, player, name))) &&
								skill.filter2(event, player, name);
						};
					},
					get filter2() {
						return (event, player, name) => {
							return skill.filter2Funs.length == 0 ||
								skill.filter2Funs.some(fun => Boolean(fun(event, player, name)));
						};
					}
				};
				const warnVars = ['event', 'step', 'source', 'player', 'target', 'targets',
					'card', 'cards', 'skill', 'forced', 'num', 'trigger', 'result'];
				const errVars = ['_status', 'lib', 'game', 'ui', 'get', 'ai'];
				const createContent = () => {
					let varstr = '';
					for (const key in vars) {
						if (warnVars.includes(key)) console.warn(`Variable '${key}' should not be referenced by vars objects`);
						if (errVars.includes(key)) throw new Error(`Variable '${key}' should not be referenced by vars objects`);
						varstr += `var ${key}=lib.skill['${skillName}'].vars['${key}'];\n`;
					}
					let str = `
							function content(){
								${varstr}if(event.triggername=='${skillName}After'){
									player.removeSkill('${skillName}');
									delete lib.skill['${skillName}'];
									delete lib.translate['${skillName}'];
									return event.finish();
								}
						`;
					for (let i = 0; i < skill.contentFuns.length; i++) {
						const fun2 = skill.contentFuns[i];
						const a = fun2.toString();
						//防止传入()=>xxx的情况
						const begin = a.indexOf("{") == a.indexOf("}") && a.indexOf("{") == -1 && a.indexOf("=>") > -1 ? a.indexOf("=>") + 2 : a.indexOf("{") + 1;
						const str2 = a.slice(begin, a.lastIndexOf("}") != -1 ? a.lastIndexOf("}") : undefined).trim();
						str += `'step ${i}'\n\t${str2}\n\t`;
					}
					skill.content = lib.init.parsex((scope || eval)(str + `\n};content;`), scope);
					skill.content._parsed = true;
				};
				Object.defineProperty(lib.skill, skillName, {
					configurable: true,
					//这类技能不需要被遍历到
					enumerable: false,
					writable: true,
					value: skill
				});
				game.broadcast(function (skillName) {
					Object.defineProperty(lib.skill, skillName, {
						configurable: true,
						enumerable: false,
						writable: true,
						value: {
							forced: true,
							charlotte: true,
							popup: false,
							vars: {},
						}
					});
				}, skillName);
				this.addSkill(skillName);
				_status.postReconnect.player_when[1][skillName] = true;
				return {
					filter(fun) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						skill.filterFuns.push(fun);
						return this;
					},
					removeFilter(fun) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						skill.filterFuns.remove(fun);
						return this;
					},
					filter2(fun) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						skill.filter2Funs.push(fun);
						return this;
					},
					removeFilter2(fun) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						skill.filter2Funs.remove(fun);
						return this;
					},
					then(fun) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						skill.contentFuns.push(fun);
						createContent();
						return this;
					},
					popup(str) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						if (typeof str == 'string') skill.popup = str;
						return this;
					},
					translation(translation) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						if (typeof translation == 'string') {
							_status.postReconnect.player_when[1][skillName] = translation;
							game.broadcastAll((skillName, translation) => lib.translate[skillName] = translation, skillName, translation);
						}
						return this;
					},
					assign(obj) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						if (typeof obj == 'object' && obj !== null) Object.assign(skill, obj);
						return this;
					},
					vars(arg) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						if (!get.is.object(arg)) throw 'vars的第一个参数必须为对象';
						Object.assign(vars, arg);
						createContent();
						return this;
					},
					/**
					 * 传递外部作用域
					 * 
					 * 一般是传递一个 code=>eval(code) 函数
					 * 
					 * 传递后可在then中使用外部变量(vars的上位替代)
					 * 
					 * @param {Function} _scope 
					 */
					apply(_scope) {
						if (lib.skill[skillName] != skill) throw `This skill has been destroyed`;
						scope = _scope;
						if (skill.contentFuns.length > 0) createContent();
						return this;
					}
				};
			}
			//让一名角色明置一些手牌
			addShownCards() {
				const cards = [], tags = [];
				for (const argument of arguments) {
					const type = get.itemtype(argument);
					if (type == 'cards') cards.addArray(argument);
					else if (type == 'card') cards.add(argument);
					else if (typeof argument == 'string' && argument.startsWith('visible_')) tags.add(argument);
				}
				if (!cards.length || !tags.length) return;
				const next = game.createEvent('addShownCards', false);
				next.player = this;
				next._cards = cards;
				next.gaintag = tags;
				next.setContent('addShownCards');
				return next;
			}
			hideShownCards() {
				const cards = [], tags = [];
				for (const argument of arguments) {
					const type = get.itemtype(argument);
					if (type == 'cards') cards.addArray(argument);
					else if (type == 'card') cards.add(argument);
					else if (typeof argument == 'string' && argument.startsWith('visible_')) tags.add(argument);
				}
				if (!cards.length) return;
				const next = game.createEvent('hideShownCards', false);
				next.player = this;
				next._cards = cards;
				next.gaintag = tags;
				next.setContent('hideShownCards');
				return next;
			}
			//获取角色所有的明置手牌
			getShownCards() {
				return this.getCards('h', function (card) {
					return get.is.shownCard(card);
				});
			}
			//获取该角色被other所知的牌。
			getKnownCards(other, filter) {
				if (!other) other = _status.event.player;
				if (!other) other = this;
				if (!filter) filter = (card) => { return true; };
				return this.getCards('h', function (card) {
					return card.isKnownBy(other) && filter(card);
				});
			}
			//判断此角色的手牌是否已经被看光了。
			isAllCardsKnown(other) {
				if (!other) other = _status.event.player;
				if (!other) other = this;
				return this.countCards('h', function (card) {
					return !card.isKnownBy(other);
				}) == 0;
			}
			//判断此角色是否有被知的牌。
			hasKnownCards(other, filter) {
				if (!other) other = _status.event.player;
				if (!other) other = this;
				if (!filter) filter = (card) => { return true; };
				return this.countCards('h', function (card) {
					return card.isKnownBy(other) && filter(card);
				}) > 0;
			}
			//数此角色被知道的牌。
			countKnownCards(other, filter) {
				return this.getKnownCards(other, filter).length;
			}
			//Execute the delay card effect
			//执行延时锦囊牌效果
			executeDelayCardEffect(card, target, judge, judge2) {
				const executeDelayCardEffect = game.createEvent('executeDelayCardEffect');
				executeDelayCardEffect.player = this;
				executeDelayCardEffect.target = target || this;
				if (typeof card == 'string') {
					const virtualCard = executeDelayCardEffect.card = ui.create.card();
					virtualCard._destroy = true;
					virtualCard.expired = true;
					const info = lib.card[card];
					virtualCard.init(['', '', card, info && info.cardnature]);
				}
				else if (get.itemtype(card) == 'card') executeDelayCardEffect.card = card;
				else _status.event.next.remove(executeDelayCardEffect);
				executeDelayCardEffect.judge = judge;
				executeDelayCardEffect.judge2 = judge2;
				executeDelayCardEffect.setContent('executeDelayCardEffect');
				executeDelayCardEffect._args = Array.from(arguments);
				return executeDelayCardEffect;
			}
			//Check if the card does not count toward hand limit
			//检测此牌是否不计入手牌上限
			canIgnoreHandcard(card) {
				return lib.filter.ignoredHandcard(card, this);
			}
			//Gift
			//赠予
			gift(cards, target) {
				const gift = game.createEvent('gift');
				gift.player = this;
				gift.target = target;
				const isArray = Array.isArray(cards);
				if (cards && !isArray) gift.cards = [cards];
				else if (isArray && cards.length) gift.cards = cards;
				else _status.event.next.remove(gift);
				gift.deniedGifts = [];
				gift.setContent('gift');
				gift._args = Array.from(arguments);
				return gift;
			}
			//Check if the player can gift the card
			//检测角色是否能赠予此牌
			canGift(card, target, strict) {
				return lib.filter.cardGiftable(card, this, target, strict);
			}
			//Check if the player refuses gifts
			//检测角色是否拒绝赠予
			refuseGifts(card, player) {
				return this.hasSkillTag('refuseGifts', null, {
					player: player,
					card: card
				});
			}
			//Gift AI related
			//赠予AI相关
			getGiftAIResultTarget(card, target) {
				if (!card || target.refuseGifts(card, this)) return 0;
				if (get.type(card, false) == 'equip') return get.effect(target, card, target, target);
				if (card.name == 'du') return this.hp > target.hp ? -1 : 0;
				if (target.hasSkillTag('nogain')) return 0;
				return Math.max(1, get.value(card, this) - get.value(card, target));
			}
			getGiftEffect(card, target) {
				return this.getGiftAIResultTarget(card, target) * get.attitude(this, target);
			}
			//Recast
			//重铸
			recast(cards, recastingLose, recastingGain) {
				const recast = game.createEvent('recast');
				recast.player = this;
				const isArray = Array.isArray(cards);
				if (cards && !isArray) recast.cards = [cards];
				else if (isArray && cards.length) recast.cards = cards;
				else _status.event.next.remove(recast);
				if (typeof recastingLose != 'function') recastingLose = (player, cards) => player.loseToDiscardpile(cards).log = false;
				recast.recastingLose = recastingLose;
				recast.recastingLosingEvents = [];
				if (typeof recastingGain != 'function') recastingGain = (player, cards) => player.draw(cards.length).log = false;
				recast.recastingGain = recastingGain;
				recast.recastingGainingEvents = [];
				recast.setContent('recast');
				recast._args = Array.from(arguments);
				return recast;
			}
			//Check if the player can recast the card
			//检测角色是否能重铸此牌
			canRecast(card, source, strict) {
				return lib.filter.cardRecastable(card, this, source, strict);
			}
			//装备栏相关
			//判断一名角色的某个区域是否被废除
			//type为要判断的区域 若为空 则判断玩家是否有任意一个被废除的区域
			hasDisabledSlot(type) {
				var player = this;
				if (type == 'horse' || type == 'equip3_4') {
					return player.hasDisabledSlot(3) && (get.is.mountCombined() || player.hasDisabledSlot(4));
				}
				else if (get.is.mountCombined() && type == 'equip4') {
					return false;
				}
				return player.countDisabledSlot(type) > 0;
			}
			//判断一名角色的某个区域被废除的数量
			//用法同上
			countDisabledSlot(type) {
				var player = this;
				var map = (player.disabledSlots || {});
				if (type == undefined) {
					num = 0;
					for (var i = 1; i <= 5; i++) {
						num += player.countDisabledSlot(i);
					}
					return num;
				}
				else {
					if (typeof type == 'number') type = ('equip' + type);
					if (get.is.mountCombined() && type == 'equip4') {
						return 0;
					}
					var num = map[type];
					if (typeof num == 'number' && num > 0) return num;
					return 0;
				}
			}
			//判断一名角色是否有某个装备栏空着
			hasEmptySlot(type) {
				var player = this;
				if (type == 'horse' || type == 'equip3_4') {
					return player.hasEmptySlot(3) && (get.is.mountCombined() || player.hasEmptySlot(4));
				}
				else if (get.is.mountCombined() && type == 'equip4') {
					return false;
				}
				return player.countEmptySlot(type) > 0;
			}
			//判断一名角色的某个装备栏空位的数量
			countEmptySlot(type) {
				if (!type) return 0;
				var player = this;
				if (typeof type == 'number') type = ('equip' + type);
				else if (type == 'equip3_4') {
					type = 'equip3';
				}
				return Math.max(0, player.countEnabledSlot(type) - player.getEquips(type).reduce(function (num, card) {
					var types = get.subtypes(card, false);
					return num + get.numOf(types, type);
				}, 0));
			}
			//判断一名角色是否有可以用于装备新装备牌的区域（排除金箍棒和六龙等“不可被替换装备”）
			//用法同下
			hasEquipableSlot(type) {
				return this.countEquipableSlot(type) > 0;
			}
			//统计一名角色有多少个可以用于装备新的装备牌的区域
			//用法同下
			countEquipableSlot(type) {
				if (!type) return 0;
				var player = this;
				if (typeof type == 'number') type = ('equip' + type);
				else if (type == 'equip3_4') {
					type = 'equip3';
				}
				else if (get.is.mountCombined() && type == 'equip4') {
					return 0;
				}
				return Math.max(0, player.countEnabledSlot(type) - player.getEquips(type).reduce(function (num, card) {
					var types = get.subtypes(card, false);
					if (!lib.filter.canBeReplaced(card, player)) num += get.numOf(types, type);
					return num;
				}, 0));
			}
			//判断一名角色是否拥有未被废除的某个区域
			//type为要判断的区域 若为空 则判断玩家是否有任意一个未被废除的区域
			hasEnabledSlot(type) {
				var player = this;
				if (type == 'horse' || type == 'equip3_4') {
					return player.hasEnabledSlot(3) && (get.is.mountCombined() || player.hasEnabledSlot(4));
				}
				// else if(type=='equip3_4'){
				// 	type='equip3';
				// }
				else if (get.is.mountCombined() && type == 'equip4') {
					return false;
				}
				return player.countEnabledSlot(type) > 0;
			}
			//判断一名角色的某个区域未被废除的数量
			//用法同上
			countEnabledSlot(type) {
				var player = this;
				var map = (player.expandedSlots || {});
				if (!type) {
					num = 0;
					for (var i = 1; i <= 5; i++) {
						num += player.countEnabledSlot(i);
					}
					return num;
				}
				else {
					if (typeof type == 'number') type = ('equip' + type);
					if (get.is.mountCombined() && type == 'equip4') {
						return 0;
					}
					var slots = 1;
					var num = map[type];
					if (typeof num == 'number' && num > 0) slots += num;
					slots -= player.countDisabledSlot(type);
					return slots;
				}
			}
			//获取一名角色装备区内某种类型的装备牌
			//参数可以为数字/区域字符串/实体牌/虚拟牌/牌名
			getEquips(subtype) {
				var type = (typeof subtype);
				switch (type) {
					case 'string':
						if (subtype == 'equip3_4') {
							const cards = [];
							cards.addArray(this.getEquips(3));
							cards.addArray(this.getEquips(4));
							return cards;
						}
						else if (subtype.startsWith('equip') && parseInt(subtype.slice(5)) > 0) {
							break;
						}
						else if (lib.card[subtype]) {
							return this.getCards('e', card => card.name == subtype);
						}
						else return [];
					case 'number':
						subtype = 'equip' + subtype;
						break;
					case 'object':
						subtype = get.subtype(subtype, false);
						break;
					default:
						return [];
				}
				if (!subtype) return [];
				return this.getCards('e', function (card) {
					return get.subtypes(card, false).contains(subtype);
				});
			}
			//新的废除装备区/恢复装备区/扩展装备区
			//参数：废除来源角色（不写默认当前事件角色），废除区域（数字/区域字符串/数组，可以写多个，重复废除）
			disableEquip() {
				var next = game.createEvent('disableEquip');
				next.player = this;
				next.slots = [];
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (Array.isArray(arguments[i])) {
						for (var arg of arguments[i]) {
							if (typeof arg == 'string') {
								if (arg.startsWith('equip') && parseInt(arg.slice(5)) > 0) next.slots.push(arg);
							}
							else if (typeof arg == 'number') {
								next.slots.push('equip' + arg);
							}
						}
					}
					else if (typeof arguments[i] == 'string') {
						if (arguments[i].startsWith('equip') && parseInt(arguments[i].slice(5)) > 0) next.slots.push(arguments[i]);
					}
					else if (typeof arguments[i] == 'number') {
						next.slots.push('equip' + arguments[i]);
					}
				}
				if (!next.source) next.source = _status.event.player;
				if (!next.slots.length) {
					_status.event.next.remove(next);
				}
				next.setContent('disableEquip');
				return next;
			}
			enableEquip() {
				var next = game.createEvent('enableEquip');
				next.player = this;
				next.slots = [];
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (Array.isArray(arguments[i])) {
						for (var arg of arguments[i]) {
							if (typeof arg == 'string') {
								if (arg.startsWith('equip') && parseInt(arg.slice(5)) > 0) next.slots.push(arg);
							}
							else if (typeof arg == 'number') {
								next.slots.push('equip' + arg);
							}
						}
					}
					else if (typeof arguments[i] == 'string') {
						if (arguments[i].startsWith('equip') && parseInt(arguments[i].slice(5)) > 0) next.slots.push(arguments[i]);
					}
					else if (typeof arguments[i] == 'number') {
						next.slots.push('equip' + arguments[i]);
					}
				}
				if (!next.source) next.source = _status.event.player;
				if (!next.slots.length) {
					_status.event.next.remove(next);
				}
				next.setContent('enableEquip');
				return next;
			}
			expandEquip() {
				var next = game.createEvent('expandEquip');
				next.player = this;
				next.slots = [];
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (Array.isArray(arguments[i])) {
						for (var arg of arguments[i]) {
							if (typeof arg == 'string') {
								if (arg.startsWith('equip') && parseInt(arg.slice(5)) > 0) next.slots.push(arg);
							}
							else if (typeof arg == 'number') {
								next.slots.push('equip' + arg);
							}
						}
					}
					else if (typeof arguments[i] == 'string') {
						if (arguments[i].startsWith('equip') && parseInt(arguments[i].slice(5)) > 0) next.slots.push(arguments[i]);
					}
					else if (typeof arguments[i] == 'number') {
						next.slots.push('equip' + arguments[i]);
					}
				}
				if (!next.source) next.source = _status.event.player;
				if (!next.slots.length) {
					_status.event.next.remove(next);
				}
				next.setContent('expandEquip');
				return next;
			}
			//判断判定区是否被废除
			isDisabledJudge() {
				return Boolean(this.storage._disableJudge);
			}
			//同步显示扩展装备区状态
			$syncExpand(map) {
				var player = this;
				if (!map) {
					map = (player.expandedSlots || {});
				}
				game.addVideo('$syncExpand', player, get.copy(map));
				game.broadcast(function (player, map) {
					player.expandedSlots = map;
					player.$syncExpand(map);
				}, player, map);
				player.markSkill('expandedSlots');
			}
			//同步装备区废除牌显示状态
			$syncDisable(map) {
				const player = this;
				const suits = { equip3: '+1马栏', equip4: '-1马栏', equip6: '特殊栏' };
				if (get.is.mountCombined()) suits.equip3 = '坐骑栏';
				if (!map) {
					map = (player.disabledSlots || {});
				}
				game.addVideo('$syncDisable', player, get.copy(map));
				game.broadcast(function (player, map) {
					player.disabledSlots = map;
					player.$syncDisable(map);
				}, player, map);
				const map2 = get.copy(map);
				const cards = Array.from(player.node.equips.childNodes);
				for (const card of cards) {
					if (card.name.startsWith('feichu_')) {
						const index = card.name.slice(7);
						if (!map2[index]) map2[index] = 0;
						map2[index]--;
					}
				}
				for (const index in map2) {
					if (!index.startsWith('equip') || !(parseInt(index.slice(5)) > 0)) continue;
					const num = map2[index];
					if (num > 0) {
						for (let i = 0; i < num; i++) {
							const card = game.createCard('feichu_' + index, (suits[index] || (get.translation(index) + '栏')), '');
							card.fix();
							card.style.transform = '';
							card.classList.remove('drawinghidden');
							card.classList.add('feichu');
							delete card._transform;
							const equipNum = get.equipNum(card);
							let equipped = false;
							for (let j = 0; j < player.node.equips.childNodes.length; j++) {
								if (get.equipNum(player.node.equips.childNodes[j]) >= equipNum) {
									player.node.equips.insertBefore(card, player.node.equips.childNodes[j]);
									equipped = true;
									break;
								}
							}
							if (!equipped) {
								player.node.equips.appendChild(card);
								if (_status.discarded) {
									_status.discarded.remove(card);
								}
							}
						}
					}
					else if (num < 0) {
						for (let i = 0; i > num; i--) {
							const card = cards.find(card => card.name == 'feichu_' + index);
							if (card) {
								player.node.equips.removeChild(card);
								cards.remove(card);
							}
						}
					}
				}
			}
			//以下函数涉及到本次更新内容而进行修改
			canEquip(name, replace) {
				const ranges = get.subtypes(name), rangex = [], player = this, combined = get.is.mountCombined();
				if (combined) {
					ranges.forEach(type => {
						if (type == 'equip3' || type == 'equip4') rangex.add('equip3_4');
						else rangex.add(type);
					});
				}
				else {
					rangex.push(...new Set(ranges));
				}
				for (let range of rangex) {
					let num = this.countEquipableSlot(range);
					let num2 = get.numOf(rangex, range);
					if (!replace) num -= this.getEquips(range).filter(card => lib.filter.canBeReplaced(card, player)).length;
					if (num < num2) return false;
				}
				return true;
			}
			//以下函数将不再进行后续维护
			countDisabled() {
				return this.countDisabledSlot.apply(this, arguments);
			}
			isDisabled(arg) {
				return this.hasDisabledSlot(arg) && !this.hasEnabledSlot(arg);
			}
			isEmpty(num) {
				return this.countEnabledSlot(num) > this.getEquips(num).length;
			}
			//以下函数将被废弃
			$disableEquip() { }
			$enableEquip() { }
			//装备区End
			chooseToDebate() {
				var next = game.createEvent('chooseToDebate');
				next.player = this;
				next._args = [];
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'players') {
						next.list = arguments[i].slice(0);
					}
					else {
						next._args.push(arguments[i]);
					}
				}
				next.setContent('chooseToDebate');
				return next;
			}
			cooperationWith(target, type, reason) {
				var player = this;
				if (!player.storage.cooperation) player.storage.cooperation = [];
				var info = {
					target: target,
					type: type,
					reason: reason,
				};
				player.storage.cooperation.add(info);
				player.addTempSkill('cooperation', { player: 'dieAfter' });
				player.addSkill('cooperation_' + type, { player: 'dieAfter' });
				game.log(player, '向', target, '发起了“协力”，合作类型是', '#g' + get.translation('cooperation_' + type));
			}
			chooseCooperationFor() {
				var next = game.createEvent('chooseCooperationFor');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.target = arguments[i];
					}
					else if (Array.isArray(arguments[i])) {
						next.cardlist = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						next.reason = arguments[i];
					}
				}
				if (!next.cardlist) next.cardlist = ['cooperation_damage', 'cooperation_draw', 'cooperation_discard', 'cooperation_use'];
				next.setContent('chooseCooperationFor');
				return next;
			}
			checkCooperationStatus(target, reason) {
				var storage = this.getStorage('cooperation');
				for (var info of storage) {
					if (info.target == target && info.reason == reason) {
						var skill = lib.skill['cooperation_' + info.type];
						if (skill && skill.checkx && skill.checkx(info)) return true;
					}
				}
				return false;
			}
			removeCooperation(info) {
				var player = this;
				var storage = player.getStorage('cooperation');
				if (!storage.contains(info)) return;
				storage.remove(info);
				var unmark = true, reason = info.type;
				if (!storage.length) {
					player.removeSkill('cooperation');
				}
				else {
					for (var i of storage) {
						if (i.type == reason) {
							unmark = false;
							break;
						}
					}
				}
				if (unmark) player.removeSkill('cooperation_' + reason);
				else player.markSkill('cooperation_' + reason);
			}
			hasClan(clan, unseen) {
				if (unseen || !this.isUnseen(0)) {
					var info = lib.character[this.name1];
					if (info && info[4]) {
						for (var i of info[4]) {
							if (typeof i == 'string' && i.startsWith('clan:') && i.slice(5) == clan) return true;
						}
					}
				}
				if (this.name2 && (unseen || !this.isUnseen(1))) {
					var info = lib.character[this.name2];
					if (info && info[4]) {
						for (var i of info[4]) {
							if (typeof i == 'string' && i.startsWith('clan:') && i.slice(5) == clan) return true;
						}
					}
				}
				return false;
			}
			changeZhuanhuanji(skill) {
				var player = this, info = get.info(skill), zhuanhuan = info.zhuanhuanji;
				if (typeof zhuanhuan == 'function') zhuanhuan(player, skill);
				else if (zhuanhuan == 'number') player.addMark(skill, 1, false);
				else player.storage[skill] = !player.storage[skill];
				game.broadcastAll(function (player, skill) {
					player.$changeZhuanhuanji(skill);
				}, player, skill);
			}
			$changeZhuanhuanji(skill) {
				var mark = this.marks[skill];
				if (mark) {
					if (mark.firstChild.reversed) {
						mark.firstChild.reversed = false;
						mark.firstChild.style.transform = 'none';
					}
					else {
						mark.firstChild.reversed = true;
						mark.firstChild.style.transform = 'rotate(180deg)';
					}
				}
			}
			setSeatNum(num) {
				_status.seatNumSettled = true;
				game.broadcastAll(function (player, num) {
					player.seatNum = num;
				}, this, num);
			}
			getSeatNum() {
				if (typeof this.seatNum == 'number') return this.seatNum;
				return 0;
			}
			hasSex(sex) {
				if (this.sex == 'unknown') return false;
				if (this.sex == 'double') return true;
				return this.sex == sex;
			}
			sameSexAs(target) {
				var sex1 = this.sex, sex2 = target.sex;
				if (sex1 == 'unknown' || sex2 == 'unknown') return false;
				if (sex1 == 'double' || sex2 == 'double') return true;
				return sex1 == sex2;
			}
			differentSexFrom(target) {
				var sex1 = this.sex, sex2 = target.sex;
				if (sex1 == 'unknown' || sex2 == 'unknown') return false;
				if (sex1 == 'double' || sex2 == 'double') return true;
				return sex1 != sex2;
			}
			addSkillBlocker(skill) {
				if (!this.storage.skill_blocker) this.storage.skill_blocker = [];
				this.storage.skill_blocker.push(skill);
			}
			removeSkillBlocker(skill) {
				if (this.storage.skill_blocker) {
					this.storage.skill_blocker.remove(skill);
					if (!this.storage.skill_blocker.length) delete this.storage.skill_blocker;
				}
			}
			loseToSpecial(cards, tag, target) {
				var next = game.loseAsync({
					player: this,
					cards: cards,
					tag: tag,
					toStorage: true,
					target: target || this,
				});
				next.setContent(function () {
					"step 0";
					player.lose(cards, ui.special).set('getlx', false);
					"step 1";
					var cards = event.cards.slice(0);
					cards.removeArray(player.getCards('hejsx'));
					if (cards.length) target.directgains(cards, null, event.tag);
				});
				return next;
			}
			addGaintag(cards, tag) {
				if (get.itemtype(cards) == 'card') cards = [cards];
				game.addVideo('addGaintag', this, [get.cardsInfo(cards), tag]);
				game.broadcastAll(function (player, cards, tag) {
					var hs = player.getCards('hejsx');
					for (var i of cards) {
						if (hs.contains(i)) i.addGaintag(tag);
					}
				}, this, cards, tag);
			}
			removeGaintag(tag, cards) {
				cards = cards || this.getCards('h');
				game.addVideo('removeGaintag', this, [tag, get.cardsInfo(cards)]);
				game.broadcastAll(function (player, tag, cards) {
					for (var i of cards) i.removeGaintag(tag);
				}, this, tag, cards);
			}
			canSave(target) {
				var player = this;
				if (player.hasSkillTag('save', true, target, true)) return true;
				var name = {}, hs = player.getCards('hs');
				for (var i of hs) name[get.name(i)] = true;
				for (var i in lib.card) {
					if (lib.card[i].savable && (lib.inpile.contains(i) || name[i])) {
						if (lib.filter.cardSavable({ name: i }, player, target) && (_status.connectMode || player.hasUsableCard(i))) return true;
					}
				}
				return false;
			}
			canSaveCard(card, target) {
				var player = this;
				var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
				if (mod2 != 'unchanged') return mod2;
				var mod = game.checkMod(card, player, target, 'unchanged', 'cardSavable', player);
				if (mod != 'unchanged') return mod;
				var savable = get.info(card).savable;
				if (typeof savable == 'function') savable = savable(card, player, target);
				return savable;
			}
			showCharacter(num, log) {
				var toShow = [];
				if ((num == 0 || num == 2) && this.isUnseen(0)) toShow.add(this.name1);
				if ((num == 1 || num == 2) && this.isUnseen(1)) toShow.add(this.name2);
				if (!toShow.length) return;
				this.$showCharacter(num, log);
				var next = game.createEvent('showCharacter', false);
				next.player = this;
				next.num = num;
				next.toShow = toShow;
				next._args = Array.from(arguments);
				next.setContent('showCharacter');
				var evt = _status.event;
				evt.next.remove(next);
				if (evt.logSkill) evt = evt.getParent();
				evt.after.push(next);
				return next;
			}
			$showCharacter(num, log) {
				if (num == 0 && !this.isUnseen(0)) {
					return;
				}
				if (num == 1 && (!this.name2 || !this.isUnseen(1))) {
					return;
				}
				if (!this.isUnseen(2)) {
					return;
				}
				game.addVideo('showCharacter', this, num);
				var skills;
				switch (num) {
					case 0:
						if (log !== false) game.log(this, '展示了主将', '#b' + this.name1);
						this.name = this.name1;
						skills = lib.character[this.name][3] || [];
						this.sex = lib.character[this.name][0];
						if (this.group == 'unknown') this.group = lib.character[this.name][1];
						this.classList.remove('unseen');
						break;
					case 1:
						if (log !== false) game.log(this, '展示了副将', '#b' + this.name2);
						skills = lib.character[this.name2][3] || [];
						if (this.sex == 'unknown') this.sex = lib.character[this.name2][0];
						if (this.name.startsWith('unknown')) this.name = this.name2;
						this.classList.remove('unseen2');
						break;
					case 2:
						if (log !== false) {
							if (this.name2) game.log(this, '展示了主将', '#b' + this.name1, '、副将', '#b' + this.name2);
							else game.log(this, '展示了主将', '#b' + this.name1);
						}
						this.name = this.name1;
						var skills = (lib.character[this.name][3] || []);
						if (this.name2) skills = skills.concat(lib.character[this.name2][3] || []);
						this.sex = lib.character[this.name][0];
						if (this.group == 'unknown') this.group = lib.character[this.name][1];
						this.classList.remove('unseen');
						this.classList.remove('unseen2');
						break;
				}
				if (!this.isUnseen(2)) {
					delete this.storage.nohp;
					this.hp = this.storage.rawHp + this.maxHp - 1;
					this.maxHp = this.storage.rawMaxHp + this.maxHp - 1;
					this.node.hp.show();
					this.update();
				}
				game.broadcast(function (player, name, sex, num, group) {
					player.group = group;
					player.name = name;
					player.sex = sex;
					switch (num) {
						case 0: player.classList.remove('unseen'); break;
						case 1: player.classList.remove('unseen2'); break;
						case 2: player.classList.remove('unseen'); player.classList.remove('unseen2'); break;
					}
					if (!player.isUnseen(2)) {
						delete player.storage.nohp;
						player.node.hp.show();
						player.update();
					}
				}, this, this.name, this.sex, num, this.group);
				skills = skills.filter(skill => {
					var info = get.info(skill);
					if (info && info.zhuSkill && !this.isZhu2()) return false;
					return true;
				});
				for (var i = 0; i < skills.length; i++) {
					if (this.hiddenSkills.contains(skills[i])) {
						this.hiddenSkills.remove(skills[i]);
						this.addSkill(skills[i]);
					}
				}
				this.checkConflict();
			}
			chooseToPlayBeatmap(beatmap) {
				var next = game.createEvent('chooseToPlayBeatmap');
				next.player = this;
				next.beatmap = beatmap;
				next._args = Array.from(arguments);
				next.setContent('chooseToPlayBeatmap');
				return next;
			}
			chooseToMove() {
				var next = game.createEvent('chooseToMove');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						next.prompt = arguments[i];
					}
				}
				next.setContent('chooseToMove');
				next.filterOk = function () { return true; };
				next.filterMove = function () { return true; };
				return next;
			}
			chooseToGuanxing(num) {
				var next = game.createEvent('chooseToGuanxing');
				next.num = num || 1;
				next.player = this;
				next.setContent('chooseToGuanxing');
				return next;
			}
			$throwEmotion(target, name, rotate) {
				game.addVideo('throwEmotion', this, [target.dataset.position, name]);
				var getLeft = function (player) {
					if (player == game.me && !ui.fakeme && !ui.chess) return player.getLeft() + player.node.avatar.offsetWidth / 2;
					return player.getLeft() + player.offsetWidth / 2;
				};
				var player = this;
				var emotion = ui.create.div('', '<div style="text-align:center"> <img src="' + lib.assetURL + 'image/emotion/throw_emotion/' + name + '1.png"> </div>', game.chess ? ui.chess : ui.window);
				emotion.style.width = '60px';
				emotion.style.height = '60px';
				var width = emotion.offsetWidth / 2;
				var height = emotion.offsetHeight / 2;
				if (game.chess) width += 60;
				var left = getLeft(player) - width;
				var top = player.getTop() + player.offsetHeight / 3 - height;
				emotion.style.left = left + 'px';
				emotion.style.top = top + 'px';
				var left2 = getLeft(target) - width;
				var top2 = target.getTop() + target.offsetHeight / 3 - height;
				if (['egg', 'flower', 'shoe'].contains(name) || rotate) {
					var num1 = 0.95 + Math.random() * (1.1 - 0.95);
					var num2 = 1 + Math.random() * (3 - 1);
					var left2 = getLeft(target) / num1 - width;
					var top2 = target.getTop() + target.offsetHeight / num2 - height;
				}
				else {
					var left2 = getLeft(target) - width;
					var top2 = target.getTop() + target.offsetHeight / 3 - height;
				}
				emotion.style['z-index'] = 10;
				emotion.style.transform = 'translateY(' + (top2 - top) + 'px) translateX(' + (left2 - left) + 'px)';
				if (['egg', 'flower', 'shoe'].contains(name) || rotate) emotion.firstElementChild.style.transform = 'rotate(1440deg)';
				if (lib.config.background_audio) game.playAudio('effect', 'throw_' + name + get.rand(1, 2));
				setTimeout(function () {
					emotion.innerHTML = ('<div style="text-align:center"> <img src="' + lib.assetURL + 'image/emotion/throw_emotion/' + name + '2.png"> </div>');
					setTimeout(function () {
						emotion.delete();
					}, 1200);
				}, 600);
			}
			tryJudgeAnimate(bool) {
				var player = this;
				game.broadcast(function (player, bool) {
					player.trySkillAnimate(bool);
				}, player, bool);
				if (bool) this.popup('判定生效', 'wood', false);
				else this.popup('判定失效', 'fire', false);
			}
			trySkillAnimate(name, popname, checkShow) {
				if (!game.online && lib.config.skill_animation_type != 'off' && lib.skill[name] && lib.skill[name].skillAnimation) {
					if (lib.config.skill_animation_type == 'default') {
						checkShow = checkShow || 'main';
					}
					else {
						checkShow = false;
					}
					if (lib.skill[name].textAnimation) {
						checkShow = false;
					}
					this.$skill(lib.skill[name].animationStr || lib.translate[name], lib.skill[name].skillAnimation, lib.skill[name].animationColor, checkShow);
					return;
				}
				var player = this;
				game.broadcast(function (player, name, popname) {
					player.trySkillAnimate(name, popname);
				}, player, name, popname);
				if (lib.animate.skill[name]) lib.animate.skill[name].apply(this, arguments);
				else {
					if (popname != name) this.popup(popname, 'water', false);
					else this.popup(get.skillTranslation(name, this), 'water', false);
				}
			}
			tryCardAnimate(card, name, nature, popname) {
				var player = this;
				game.broadcast(function (player, card, name, nature, popname) {
					player.tryCardAnimate(card, name, nature, popname);
				}, player, card, name, nature, popname);
				if (lib.animate.card[card.name]) lib.animate.card[card.name].apply(this, arguments);
				else {
					if (!lib.config.show_card_prompt) return;
					if (get.type(card) == 'equip' && lib.config.hide_card_prompt_equip) return;
					if (get.type(card) == 'basic' && lib.config.hide_card_prompt_basic) return;
					if (popname) player.popup({ name: card.name, nature: card.nature }, nature, false);
					else player.popup(name, nature, false);
				}
			}
			hasUsableCard(name) {
				var player = this;
				if (player.countCards('hs', name)) return true;
				var skills = player.getSkills('invisible').concat(lib.skill.global);
				game.expandSkills(skills);
				for (var i = 0; i < skills.length; i++) {
					var ifo = get.info(skills[i]);
					if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == name) {
						if (!ifo.viewAsFilter || ifo.viewAsFilter(player) !== false) {
							return true;
						}
					}
					else {
						var hiddenCard = get.info(skills[i]).hiddenCard;
						if (typeof hiddenCard == 'function' && hiddenCard(player, name)) {
							return true;
						}
					}
				}
			}
			inRange(to) {
				var from = this;
				if (from == to || from.hasSkill('undist') || to.hasSkill('undist')) return false;
				if (!game.players.contains(from) && !game.dead.contains(from)) return false;
				if (!game.players.contains(to) && !game.dead.contains(to)) return false;
				var mod1 = game.checkMod(from, to, 'unchanged', 'inRange', from);
				if (mod1 != 'unchanged') return mod1;
				var mod2 = game.checkMod(from, to, 'unchanged', 'inRangeOf', to);
				if (mod2 != 'unchanged') return mod2;
				var range = from.getAttackRange();
				if (range < 1) return false;
				var player = from, m, n = 1, i;
				var fxy, txy;
				if (game.chess) {
					fxy = from.getXY();
					txy = to.getXY();
					n = Math.abs(fxy[0] - txy[0]) + Math.abs(fxy[1] - txy[1]);
				}
				else if (to.isMin(true) || from.isMin(true)) {/* empty */ }
				else {
					var length = game.players.length;
					var totalPopulation = game.players.length + game.dead.length + 1;
					for (var iwhile = 0; iwhile < totalPopulation; iwhile++) {
						if (player.nextSeat != to) {
							player = player.nextSeat;
							if (player.isAlive() && !player.isOut() && !player.hasSkill('undist') && !player.isMin(true)) n++;
						}
						else {
							break;
						}
					}
					for (i = 0; i < game.players.length; i++) {
						if (game.players[i].isOut() || game.players[i].hasSkill('undist') || game.players[i].isMin(true)) length--;
					}
					if (from.isDead()) length++;
					if (to.isDead()) length++;
					var left = from.hasSkillTag('left_hand');
					var right = from.hasSkillTag('right_hand');
					if (left === right) n = Math.min(n, length - n);
					else if (left == true) n = length - n;
				}
				n = game.checkMod(from, to, n, 'globalFrom', from);
				n = game.checkMod(from, to, n, 'globalTo', to);
				m = n;
				m = game.checkMod(from, to, m, 'attackFrom', from);
				m = game.checkMod(from, to, m, 'attackTo', to);
				var equips1 = from.getCards('e', function (card) {
					return !ui.selected.cards || !ui.selected.cards.contains(card);
				}), equips2 = to.getCards('e', function (card) {
					return !ui.selected.cards || !ui.selected.cards.contains(card);
				});
				for (i = 0; i < equips1.length; i++) {
					var info = get.info(equips1[i]).distance;
					if (!info) continue;
					if (info.globalFrom) {
						m += info.globalFrom;
						n += info.globalFrom;
					}
				}
				for (i = 0; i < equips2.length; i++) {
					var info = get.info(equips2[i]).distance;
					if (!info) continue;
					if (info.globalTo) {
						m += info.globalTo;
						n += info.globalTo;
					}
					if (info.attaclTo) {
						m += info.attaclTo;
					}
				}
				return m <= range;
			}
			inRangeOf(source) {
				return source.inRange(this);
			}
			//Get the player's HP not less than 0. Set “raw” to true to get the player's raw HP instead.
			//获取角色的体力值。设置“raw”为true以获取角色的体力。
			getHp(raw) {
				return raw ? this.hp : Math.max(0, this.hp);
			}
			//Set “raw” to true to get the player's raw damaged HP instead.
			//设置“raw”为true以获取角色已损失的体力。
			getDamagedHp(raw) {
				return this.maxHp - this.getHp(raw);
			}
			changeGroup(group, log, broadcast) {
				var next = game.createEvent('changeGroup');
				next.player = this;
				next.log = true;
				for (var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (lib.group.contains(arg)) {
						next.group = arg;
					}
					else if (typeof arg === 'boolean') {
						next.log = arg;
					}
					else if (arg === 'nobroadcast') {
						next.broadcast = false;
					}
				}
				next.setContent('changeGroup');
				return next;
			}
			chooseToDuiben(target) {
				var next = game.createEvent('chooseToDuiben');
				next.player = this;
				next.target = target;
				next.setContent('chooseToDuiben');
				return next;
			}
			chooseToPSS(target) {
				var next = game.createEvent('chooseToPSS');
				next.player = this;
				next.target = target;
				next.setContent('chooseToPSS');
				return next;
			}
			chooseToEnable() {
				var next = game.createEvent('chooseToEnable');
				next.player = this;
				next.setContent('chooseToEnable');
				return next;
			}
			chooseToDisable(horse) {
				var next = game.createEvent('chooseToDisable');
				next.player = this;
				if (horse) next.horse = true;
				next.setContent('chooseToDisable');
				return next;
			}
			isPhaseUsing(notmeisok) {
				if (!notmeisok && _status.currentPhase != this) return false;
				return _status.event.name == 'phaseUse' || _status.event.getParent('phaseUse').name == 'phaseUse';
			}
			swapEquip(target) {
				var next = game.createEvent('swapEquip');
				next.player = this;
				next.target = target;
				next.setContent('swapEquip');
				return next;
			}
			canCompare(target, goon, bool) {
				if (this == target) return false;
				if ((!this.countCards('h') && goon !== true) || (!target.countCards('h') && bool !== true)) return false;
				if (this.hasSkillTag('noCompareSource') || target.hasSkillTag('noCompareTarget')) return false;
				return true;
			}
			$disableJudge() {
				var player = this;
				game.addVideo('$disableJudge', player);
				player.storage._disableJudge = true;
				var card = game.createCard('disable_judge', '', '');
				card.fix();
				card.classList.add('feichu');
				card.style.transform = '';
				card.classList.add('drawinghidden');
				player.node.judges.insertBefore(card, player.node.judges.firstChild);
				ui.updatej(player);
			}
			$enableJudge() {
				var player = this;
				game.addVideo('$enableJudge', player);
				player.storage._disableJudge = false;
				for (var i = 0; i < player.node.judges.childNodes.length; i++) {
					if (player.node.judges.childNodes[i].name == 'disable_judge') {
						player.node.judges.removeChild(player.node.judges.childNodes[i]);
						break;
					}
				}
			}
			disableJudge() {
				var next = game.createEvent('disableJudge');
				next.player = this;
				next.source = _status.event.player;
				next.setContent('disableJudge');
				return next;
			}
			enableJudge() {
				var next = game.createEvent('enableJudge');
				next.player = this;
				next.source = _status.event.player;
				next.setContent('enableJudge');
				return next;
			}
			//原有函数
			init(character, character2, skill, update) {
				if (typeof character == 'string' && !lib.character[character]) {
					lib.character[character] = get.character(character);
				}
				if (typeof character2 == 'string' && !lib.character[character2]) {
					lib.character[character2] = get.character(character2);
				}
				if (!lib.character[character]) return;
				if (get.is.jun(character2)) {
					var tmp = character;
					character = character2;
					character2 = tmp;
				}
				if (character2 == false) {
					skill = false;
					character2 = null;
				}
				var info = lib.character[character];
				if (!info) {
					info = ['', '', 1, [], []];
				}
				if (!info[4]) {
					info[4] = [];
				}
				var skills = info[3].slice(0);
				this.clearSkills(true);

				var hp1 = get.infoHp(info[2]);
				var maxHp1 = get.infoMaxHp(info[2]);
				var hujia1 = get.infoHujia(info[2]);

				this.name = character;
				this.name1 = character;
				this.tempname = [];
				this.sex = info[0];
				this.group = info[1];
				this.hp = hp1;
				this.maxHp = maxHp1;
				this.hujia = hujia1;
				this.node.intro.innerHTML = lib.config.intro;
				this.node.name.dataset.nature = get.groupnature(this.group);
				lib.setIntro(this);
				this.node.name.innerHTML = get.slimName(character);
				if (this.classList.contains('minskin') && this.node.name.querySelectorAll('br').length >= 4) {
					this.node.name.classList.add('long');
				}
				if (info[4].contains('hiddenSkill') && !this.noclick) {
					if (!this.hiddenSkills) this.hiddenSkills = [];
					this.hiddenSkills.addArray(skills);
					skills = [];
					this.name = 'unknown';
					this.sex = 'male';
					this.storage.nohp = true;
					skills.add('g_hidden_ai');
				}
				if (character2 && lib.character[character2]) {
					var info2 = lib.character[character2];
					if (!info2) {
						info2 = ['', '', 1, [], []];
					}
					if (!info2[4]) {
						info2[4] = [];
					}

					this.name2 = character2;
					var hp2 = get.infoHp(info2[2]);
					var maxHp2 = get.infoMaxHp(info2[2]);
					var hujia2 = get.infoHujia(info2[2]);
					this.hujia += hujia2;
					var double_hp;
					if (_status.connectMode || get.mode() == 'single') {
						double_hp = 'pingjun';
					}
					else {
						double_hp = get.config('double_hp');
					}
					switch (double_hp) {
						case 'pingjun': {
							this.maxHp = Math.floor((maxHp1 + maxHp2) / 2);
							this.hp = Math.floor((hp1 + hp2) / 2);
							this.singleHp = ((maxHp1 + maxHp2) % 2 === 1);
							break;
						}
						case 'zuidazhi': {
							this.maxHp = Math.max(maxHp1, maxHp2);
							this.hp = Math.max(hp1, hp2);
							break;
						}
						case 'zuixiaozhi': {
							this.maxHp = Math.min(maxHp1, maxHp2);
							this.hp = Math.min(hp1, hp2);
							break;
						}
						case 'zonghe': {
							this.maxHp = maxHp1 + maxHp2;
							this.hp = hp1 + hp2;
							break;
						}
						default: {
							this.maxHp = maxHp1 + maxHp2 - 3;
							this.hp = hp1 + hp2 - 3;
						}
					}
					if (info2[4].contains('hiddenSkill') && !this.noclick) {
						if (!this.hiddenSkills) this.hiddenSkills = [];
						this.hiddenSkills.addArray(info2[3]);
						this.storage.nohp = true;
						skills.add('g_hidden_ai');
					}
					else skills = skills.concat(info2[3]);
				}
				if (this.storage.nohp) {
					this.storage.rawHp = this.hp;
					this.storage.rawMaxHp = this.maxHp;
					this.hp = 1;
					this.maxHp = 1;
					this.node.hp.hide();
				}
				if (skill != false) {
					skills = skills.filter(skill => {
						var info = get.info(skill);
						if (info && info.zhuSkill && !this.isZhu2()) return false;
						return true;
					});
					for (var i = 0; i < skills.length; i++) {
						this.addSkill(skills[i], null, true);
					}
					this.checkConflict();
				}
				lib.group.add(this.group);

				this.$init(character, character2);

				if (this.inits) {
					for (var i = 0; i < this.inits.length; i++) {
						this.inits[i](this);
					}
				}
				if (this._inits) {
					for (var i = 0; i < this._inits.length; i++) {
						this._inits[i](this);
					}
				}
				if (update !== false) this.$update();
				return this;
			}
			$init(character, character2) {
				this.classList.add('fullskin');
				var info = lib.character[character];
				if (!info) {
					info = ['', '', 1, [], []];
				}
				if (!info[4]) {
					info[4] = [];
				}

				if (!game.minskin && get.is.newLayout() && !info[4].contains('minskin')) {
					this.classList.remove('minskin');
					this.node.avatar.setBackground(character, 'character');
				}
				else {
					this.node.avatar.setBackground(character, 'character');
					if (info[4].contains('minskin')) {
						this.classList.add('minskin');
					}
					else if (game.minskin) {
						this.classList.add('minskin');
					}
					else {
						this.classList.remove('minskin');
					}
				}

				this.node.avatar.show();
				this.node.count.show();
				this.node.equips.show();

				this.node.intro.innerHTML = lib.config.intro;
				this.node.name.dataset.nature = get.groupnature(this.group);
				lib.setIntro(this);
				this.node.name.innerHTML = get.slimName(character);
				if (this.classList.contains('minskin') && this.node.name.querySelectorAll('br').length >= 4) {
					this.node.name.classList.add('long');
				}
				if (info[4].contains('hiddenSkill') && !this.noclick) {
					this.classList.add(_status.video ? 'unseen_v' : 'unseen');
					if (!this.node.name_seat && !_status.video) {
						this.node.name_seat = ui.create.div('.name.name_seat', get.verticalStr(get.translation(this.name)), this);
						this.node.name_seat.dataset.nature = get.groupnature(this.group);
					}
				}
				if (character2 && lib.character[character2]) {
					var info2 = lib.character[character2];
					if (!info2) {
						info2 = ['', '', 1, [], []];
					}
					if (!info2[4]) {
						info2[4] = [];
					}
					this.classList.add('fullskin2');
					this.node.avatar2.setBackground(character2, 'character');
					this.node.avatar2.show();
					this.name2 = character2;

					this.node.count.classList.add('p2');
					if (info2[4].contains('hiddenSkill') && !this.noclick) {
						this.classList.add(_status.video ? 'unseen2_v' : 'unseen2');
					}
					this.node.name2.innerHTML = get.slimName(character2);
				}
				if (this.storage.nohp) {
					this.node.hp.hide();
				}

				return this;
			}
			initOL(name, character) {
				this.node.avatar.setBackground(character, 'character');
				this.node.avatar.show();
				this.node.name.innerHTML = get.verticalStr(name);
				this.nickname = name;
				this.avatar = character;
				this.node.nameol.innerHTML = '';
				if (lib.character[character]) this.sex = lib.character[character][0];
			}
			uninitOL() {
				this.node.avatar.hide();
				this.node.name.innerHTML = '';
				this.node.identity.firstChild.innerHTML = '';
				delete this.nickname;
				delete this.avatar;
				delete this.sex;
			}
			initRoom(info, info2) {
				var str = '';
				this.serving = false;
				if (!info || info == 'server') {
					this.roomempty = true;
					str = '空房间';
					this.roomfull = false;
					this.roomgaming = false;
					this.version = null;
					if (info == 'server') {
						this.serving = true;
					}
				}
				else {
					var config = info[2];
					this.key = info[4];
					this.roomempty = false;
					str += get.modetrans(config);
					str += ' 模式　';
					for (var i = str.length; i < 11; i++) str += '　';
					this.version = config.version;
					if (config.gameStarted) {
						str += '<span class="firetext">游戏中</span>　';
						if (config.observe && config.observeReady && this.version == lib.versionOL) {
							this.classList.remove('exclude');
						}
						else {
							this.classList.add('exclude');
						}
					}
					else {
						str += '<span class="greentext">等待中</span>　';
						if (this.version != lib.versionOL) {
							this.classList.add('exclude');
						}
						else {
							this.classList.remove('exclude');
						}
					}
					this.maxHp = parseInt(config.number);
					this.hp = Math.min(this.maxHp, info[3]);
					if (this.hp < this.maxHp || config.gameStarted) str += ('人数：' + this.hp + '/' + this.maxHp);
					else str += ('人数：<span class="firetext">' + this.hp + '/' + this.maxHp + '</span>');

					str += ('　(' + info[0].slice(0, 12) + ' 的房间)');
					if (config.mode != 'guozhan' && (config.mode != 'doudizhu' || config.doudizhu_mode != 'online')) {
						str += '【';
						for (var i = 0; i < config.cardPack.length; i++) {
							str += (get.translation(config.cardPack[i] + '_card_config').slice(0, 2));
							if (i < config.cardPack.length - 1) str += '+';
						}
						str += '】';
					}
					this.config = config;
					if (this.hp == this.maxHp && !config.gameStarted) {
						this.roomfull = true;
					}
					else {
						this.roomfull = false;
					}
					if (config.gameStarted && (!config.observe || !config.observeReady)) {
						this.roomgaming = true;
					}
					else {
						this.roomgaming = false;
					}
				}
				this.firstChild.innerHTML = str;
				return this;
			}
			reinit(from, to, maxHp, online) {
				var info1 = lib.character[from];
				var info2 = lib.character[to];
				var smooth = true, replaced = null;
				if (maxHp == 'nosmooth') {
					smooth = false;
					maxHp = null;
				}
				if (this.name2 == from) {
					this.name2 = to;
				}
				else if (this.name == from || this.name1 == from) {
					if (this.name1 == from) {
						this.name1 = to;
					}
					if (!this.isUnseen(1)) {
						this.name = to;
						this.sex = info2[0];
					}
				}
				else {
					return this;
				}
				if (online) {
					return;
				}
				for (var i = 0; i < info1[3].length; i++) {
					this.removeSkill(info1[3][i]);
				}
				for (var i = 0; i < info2[3].length; i++) {
					var info = get.info(info2[3][i]);
					if (info && info.zhuSkill && !this.isZhu2()) continue;
					this.addSkill(info2[3][i]);
				}
				if (Array.isArray(maxHp)) {
					this.maxHp = maxHp[1];
					this.hp = maxHp[0];
				}
				else {
					var num;
					if (maxHp === false) {
						num = 0;
					}
					else {
						if (typeof maxHp != 'number') {
							maxHp = get.infoMaxHp(info2[2]);
						}
						num = maxHp - get.infoMaxHp(info1[2]);
					}
					if (typeof this.singleHp == 'boolean') {
						if (num % 2 != 0) {
							if (this.singleHp) {
								this.maxHp += (num + 1) / 2;
								this.singleHp = false;
							}
							else {
								this.maxHp += (num - 1) / 2;
								this.singleHp = true;
								if (!game.online) {
									this.doubleDraw();
								}
							}
						}
						else {
							this.maxHp += num / 2;
						}
					}
					else {
						this.maxHp += num;
					}
				}
				game.broadcast(function (player, from, to, skills) {
					player.reinit(from, to, null, true);
					player.applySkills(skills);
				}, this, from, to, get.skillState(this));
				game.addVideo('reinit3', this, {
					from: from,
					to: to,
					hp: this.maxHp,
					avatar2: this.name2 == to
				});

				this.$reinit(from, to, maxHp, online);
				this.update();
			}
			$reinit(from, to, maxHp, online) {
				var smooth = true;
				if (maxHp == 'nosmooth') {
					smooth = false;
					maxHp = null;
				}
				if (this.name2 == to) {
					if (smooth) this.smoothAvatar(true);
					this.node.avatar2.setBackground(to, 'character');
					this.node.name2.innerHTML = get.slimName(to);
				}
				else if (this.name == to || this.name1 == to) {
					if (smooth) this.smoothAvatar(false);
					this.node.avatar.setBackground(to, 'character');
					this.node.name.innerHTML = get.slimName(to);

					if (this == game.me && ui.fakeme) {
						ui.fakeme.style.backgroundImage = this.node.avatar.style.backgroundImage;
					}
				}
			}
			uninit() {
				this.expandedSlots = {};
				this.disabledSlots = {};

				delete this.name;
				delete this.name1;
				delete this.tempname;
				delete this.sex;
				delete this.group;
				delete this.hp;
				delete this.maxHp;
				delete this.hujia;
				this.clearSkills(true);

				if (this.name2) {
					delete this.singleHp;
					delete this.name2;
				}
				for (var mark in this.marks) {
					this.marks[mark].remove();
				}
				ui.updatem(this);

				this.skipList = [];
				this.skills = this.skills.filter(skill => {
					return lib.skill[skill] && lib.skill[skill].superCharlotte;
				});
				this.initedSkills = [];
				this.additionalSkills = {};
				this.disabledSkills = {};
				this.hiddenSkills = [];
				this.awakenedSkills = [];
				this.forbiddenSkills = {};
				this.phaseNumber = 0;
				this.stat = [{ card: {}, skill: {} }];
				this.tempSkills = {};
				this.storage = {};
				this.marks = {};
				this.ai = { friend: [], enemy: [], neutral: [] };

				this.$uninit();

				return this;
			}
			$uninit() {
				this.$syncDisable();
				if (this.isDisabledJudge()) {
					game.broadcastAll(function (player) {
						player.storage._disableJudge = false;
						for (var i = 0; i < player.node.judges.childNodes.length; i++) {
							if (player.node.judges.childNodes[i].name == 'disable_judge') {
								player.node.judges.removeChild(player.node.judges.childNodes[i]);
								break;
							}
						}
					}, this);
				}
				this.node.avatar.hide();
				this.node.count.hide();
				if (this.node.wuxing) {
					this.node.wuxing.hide();
				}
				if (this.node.name_seat) {
					this.node.name_seat.remove();
					delete this.node.name_seat;
				}
				this.node.hp.show();
				this.classList.remove('unseen');
				this.classList.remove('unseen2');

				this.node.identity.style.backgroundColor = '';
				this.node.intro.innerHTML = '';
				this.node.name.innerHTML = '';
				this.node.hp.innerHTML = '';
				this.node.count.innerHTML = '0';

				this.node.avatar2.hide();
				this.node.name2.innerHTML = '';
				this.classList.remove('fullskin2');
				this.node.count.classList.remove('p2');

				for (var mark in this.marks) {
					this.marks[mark].remove();
				}
				ui.updatem(this);
			}
			getLeft() {
				return this.offsetLeft;
			}
			getTop() {
				return this.offsetTop;
			}
			smoothAvatar(vice, video) {
				var div = ui.create.div('.fullsize');
				if (vice) {
					div.style.background = getComputedStyle(this.node.avatar2).background;
					this.node.avatar2.appendChild(div);
				}
				else {
					div.style.background = getComputedStyle(this.node.avatar).background;
					this.node.avatar.appendChild(div);
				}
				ui.refresh(div);
				div.style.transition = 'all 1s';
				setTimeout(function () {
					div.classList.add('removing');
					setTimeout(function () {
						div.remove();
					}, 2000);
				}, 100);
				if (video != false) {
					game.addVideo('smoothAvatar', this, vice);
				}
			}
			changeSeat(position, video) {
				var player = this;
				if (video !== false) game.addVideo('changeSeat', player, position);
				var rect1 = player.getBoundingClientRect();
				player.style.transition = 'all 0s';
				ui.refresh(player);
				player.dataset.position = position;
				var rect2 = player.getBoundingClientRect();
				var dx = rect1.left - rect2.left;
				var dy = rect1.top - rect2.top;
				if ((game.chess || (player.dataset.position != 0 && position != 0)) && player.classList.contains('linked')) {
					player.style.transform = 'rotate(-90deg) translate(' + (-dy) + 'px,' + (dx) + 'px)';
				}
				else {
					player.style.transform = 'translate(' + (dx) + 'px,' + (dy) + 'px)';
				}
				setTimeout(function () {
					player.style.transition = '';
					ui.refresh(player);
					player.style.transform = '';
				}, 100);
			}
			send() {
				if (!this.ws || this.ws.closed) return this;
				this.ws.send.apply(this.ws, arguments);
				return this;
			}
			getId() {
				if (_status.video || _status.connectMode) return this;
				if (this.playerid) {
					delete game.playerMap[this.playerid];
				}
				this.playerid = get.id();
				game.playerMap[this.playerid] = this;
				return this;
			}
			throwEmotion(target, emotion, rotate) {
				game.broadcastAll(function (player, target, emotion, rotate) {
					player.$throwEmotion(target, emotion, rotate);
				}, this, target, emotion, rotate);
			}
			emotion(pack, id) {
				var str = '<img src="##assetURL##image/emotion/' + pack + '/' + id + '.gif" width="50" height="50">';
				this.say(str);
				game.broadcast(function (id, str) {
					if (lib.playerOL[id]) {
						lib.playerOL[id].say(str);
					}
					else if (game.connectPlayers) {
						for (var i = 0; i < game.connectPlayers.length; i++) {
							if (game.connectPlayers[i].playerid == id) {
								game.connectPlayers[i].say(str);
								return;
							}
						}
					}
				}, this.playerid, str);
			}
			chat(str) {
				if (get.is.banWords(str)) return;
				this.say(str);
				game.broadcast(function (id, str) {
					if (lib.playerOL[id]) {
						lib.playerOL[id].say(str);
					}
					else if (game.connectPlayers) {
						for (var i = 0; i < game.connectPlayers.length; i++) {
							if (game.connectPlayers[i].playerid == id) {
								game.connectPlayers[i].say(str);
								return;
							}
						}
					}
				}, this.playerid, str);
			}
			say(str) {
				str = str.replace(/##assetURL##/g, lib.assetURL);
				var dialog = ui.create.dialog('hidden');
				dialog.classList.add('static');
				dialog.add('<div class="text" style="word-break:break-all;display:inline">' + str + '</div>');
				dialog.classList.add('popped');
				ui.window.appendChild(dialog);
				var width = dialog.content.firstChild.firstChild.offsetWidth;
				if (width < 190) {
					dialog._mod_height = -16;
				}
				else {
					dialog.content.firstChild.style.textAlign = 'left';
				}
				dialog.style.width = (width + 16) + 'px';
				var refnode;
				if (this.node && this.node.avatar && this.parentNode == ui.arena) {
					refnode = this.node.avatar;
				}
				if (refnode) {
					lib.placePoppedDialog(dialog, {
						clientX: (ui.arena.offsetLeft + this.getLeft() + refnode.offsetLeft + refnode.offsetWidth / 2) * game.documentZoom,
						clientY: (ui.arena.offsetTop + this.getTop() + refnode.offsetTop + refnode.offsetHeight / 4) * game.documentZoom
					});
				}
				else {
					lib.placePoppedDialog(dialog, {
						clientX: (this.getLeft() + this.offsetWidth / 2) * game.documentZoom,
						clientY: (this.getTop() + this.offsetHeight / 4) * game.documentZoom
					});
				}
				if (dialog._mod_height) {
					dialog.content.firstChild.style.padding = 0;
				}
				setTimeout(function () {
					dialog.delete();
				}, lib.quickVoice.includes(str) ? 3800 : 2000);
				var name = get.translation(this.name);
				var info = [name ? (name + '[' + this.nickname + ']') : this.nickname, str];
				lib.chatHistory.push(info);
				if (_status.addChatEntry) {
					if (_status.addChatEntry._origin.parentNode) {
						_status.addChatEntry(info, false);
					}
					else {
						delete _status.addChatEntry;
					}
				}
				if (lib.config.background_speak && lib.quickVoice.includes(str)) {
					game.playAudio('voice', (this.sex == 'female' ? 'female' : 'male'), lib.quickVoice.indexOf(str));
				}
			}
			showGiveup() {
				this._giveUp = true;
				if (this == game.me) {
					ui.create.giveup();
				}
				else if (this.isOnline2()) {
					this.send(ui.create.giveup);
				}
			}
			applySkills(skills) {
				for (var i in skills) {
					if (i == 'global') {
						lib.skill.global = skills[i];
					}
					//else if(i=='skillinfo'){
					//	for(var j in skills[i]){
					//		if(!lib.skill[j]){
					//			lib.skill[j]={};
					//		}
					//		lib.skill[j].chooseButton=skills[i][j];
					//	}
					//}
					else if (i == 'stat') {
						this.stat = [skills.stat];
					}
					else if (lib.playerOL[i]) {
						for (var j in skills[i]) {
							lib.playerOL[i][j] = skills[i][j];
						}
					}
				}
			}
			getState() {
				var state = {
					hp: this.hp,
					maxHp: this.maxHp,
					nickname: this.nickname,
					sex: this.sex,
					group: this.group,
					name: this.name,
					name1: this.name1,
					name2: this.name2,
					handcards: this.getCards('hs'),
					gaintag: [],
					equips: this.getCards('e'),
					judges: this.getCards('j'),
					specials: this.getCards('s'),
					expansions: this.getCards('x'),
					expansion_gaintag: [],
					disableJudge: this.isDisabledJudge(),
					disabledSlots: this.disabledSlots,
					expandedSlots: this.expandedSlots,
					views: [],
					position: parseInt(this.dataset.position),
					hujia: this.hujia,
					side: this.side,
					identityShown: this.identityShown,
					identityNode: [this.node.identity.innerHTML, this.node.identity.dataset.color],
					identity: this.identity,
					dead: this.isDead(),
					linked: this.isLinked(),
					turnedover: this.isTurnedOver(),
					out: this.isOut(),
					phaseNumber: this.phaseNumber,
					unseen: this.isUnseen(0),
					unseen2: this.isUnseen(1),
					seatNum: this.seatNum,
				};
				for (var i = 0; i < state.judges.length; i++) {
					state.views[i] = state.judges[i].viewAs;
				}
				for (var i = 0; i < state.handcards.length; i++) {
					state.gaintag[i] = state.handcards[i].gaintag;
				}
				for (var i = 0; i < state.expansions.length; i++) {
					state.expansion_gaintag[i] = state.expansions[i].gaintag;
				}
				if (this.getModeState) {
					state.mode = this.getModeState();
				}
				return state;
			}
			setNickname(str) {
				this.node.nameol.innerHTML = (str || this.nickname || '').slice(0, 12);
				return this;
			}
			setAvatar(name, name2, video, fakeme) {
				var node;
				if (this.name2 == name) {
					node = this.node.avatar2;
					this.smoothAvatar(true, video);
				}
				else if (this.name == name) {
					node = this.node.avatar;
					this.smoothAvatar(false, video);
				}
				if (node) {
					node.setBackground(name2, 'character');
					if (this == game.me && ui.fakeme && fakeme !== false) {
						ui.fakeme.style.backgroundImage = node.style.backgroundImage;
					}
					if (video != false) {
						game.addVideo('setAvatar', this, [name, name2]);
					}
				}
				game.broadcast(function (player, name, name2) {
					player.setAvatar(name, name2, false);
				}, this, name, name2);
			}
			setAvatarQueue(name, list) {
				var node;
				var player = this;
				if (player.name2 == name) {
					node = player.node.avatar2;
				}
				else {
					node = player.node.avatar;
				}
				if (node._avatarqueue) {
					for (var i = 0; i < list.length; i++) {
						node._avatarqueue.push(list[i]);
					}
				}
				else {
					var func = function () {
						if (node._avatarqueue.length) {
							player.setAvatar(name, node._avatarqueue.shift(), false, false);
						}
						else {
							clearInterval(node._avatarqueueinterval);
							delete node._avatarqueue;
							delete node._avatarqueueinterval;
							player.setAvatar(name, name, false, false);
						}
					};
					node._avatarqueue = list.slice(0);
					node._avatarqueueinterval = setInterval(func, 1000);
					func();
				}
				game.addVideo('setAvatarQueue', this, [name, list]);
			}
			flashAvatar(skill, name) {
				if (lib.skill[name] && !lib.character[name]) {
					var stop = false;
					var list = lib.config.all.characters.slice(0);
					for (var i in lib.characterPack) {
						list.add(i);
					}
					for (var i = 0; i < list.length; i++) {
						for (var j in lib.characterPack[list[i]]) {
							if (lib.characterPack[list[i]][j][3].contains(name)) {
								name = j;
								stop = true;
								break;
							}
						}
						if (stop) {
							break;
						}
					}
				}
				if (lib.character[this.name2] && lib.character[this.name2][3].contains(skill)) {
					this.setAvatarQueue(this.name2, [name]);
				}
				else {
					this.setAvatarQueue(this.name, [name]);
				}
			}
			update() {
				if (_status.video && arguments.length == 0) return;
				if (this.hp >= this.maxHp) this.hp = this.maxHp;
				game.broadcast(function (player, hp, maxHp, hujia) {
					player.hp = hp;
					player.maxHp = maxHp;
					player.hujia = hujia;
					player.$update();
				}, this, this.hp, this.maxHp, this.hujia);
				this.$update(...arguments);
			}
			$update() {
				if (this.hp >= this.maxHp) this.hp = this.maxHp;
				var hp = this.node.hp;
				hp.style.transition = 'none';
				if (!_status.video) {
					if (this.hujia) {
						this.markSkill('ghujia');
					}
					else {
						this.unmarkSkill('ghujia');
					}
				}
				if (!this.storage.nohp) {
					if (this.maxHp == Infinity) {
						hp.innerHTML = '∞';
					}
					else if (game.layout == 'default' && this.maxHp > 14) {
						hp.innerHTML = this.hp + '/' + this.maxHp;
						hp.classList.add('text');
					}
					else if (get.is.newLayout() &&
						(
							this.maxHp > 9 ||
							(this.maxHp > 5 && this.classList.contains('minskin')) ||
							((game.layout == 'mobile' || game.layout == 'long') && this.dataset.position == 0 && this.maxHp > 7)
						)) {
						hp.innerHTML = this.hp + '<br>/<br>' + this.maxHp + '<div></div>';
						if (this.hp == 0) {
							hp.lastChild.classList.add('lost');
						}
						hp.classList.add('textstyle');
						// hp.classList.remove('long');
					}
					else {
						hp.innerHTML = '';
						hp.classList.remove('text');
						hp.classList.remove('textstyle');
						while (this.maxHp > hp.childNodes.length) {
							ui.create.div(hp);
						}
						while (Math.max(0, this.maxHp) < hp.childNodes.length) {
							hp.removeChild(hp.lastChild);
						}
						for (var i = 0; i < this.maxHp; i++) {
							var index = i;
							if (get.is.newLayout()) {
								index = this.maxHp - i - 1;
							}
							if (i < this.hp) {
								hp.childNodes[index].classList.remove('lost');
							}
							else {
								hp.childNodes[index].classList.add('lost');
							}
						}
						// if(this.maxHp==9){
						// 	hp.classList.add('long');
						// }
						// else{
						// 	hp.classList.remove('long');
						// }
					}
					if (hp.classList.contains('room')) {
						hp.dataset.condition = 'high';
					}
					else if (this.hp == 0) {
						hp.dataset.condition = '';
					}
					else if (this.hp > Math.round(this.maxHp / 2) || this.hp === this.maxHp) {
						hp.dataset.condition = 'high';
					}
					else if (this.hp > Math.floor(this.maxHp / 3)) {
						hp.dataset.condition = 'mid';
					}
					else {
						hp.dataset.condition = 'low';
					}

					setTimeout(function () {
						hp.style.transition = '';
					});
				}
				var numh = this.countCards('h');
				if (_status.video) {
					numh = arguments[0];
				}
				if (numh >= 10) {
					numh = numh.toString();
					this.node.count.dataset.condition = 'low';
					this.node.count.innerHTML = numh[0] + '<br>' + numh[1];
				}
				else {
					if (numh > 5) {
						this.node.count.dataset.condition = 'higher';
					}
					else if (numh > 2) {
						this.node.count.dataset.condition = 'high';
					}
					else if (numh > 0) {
						this.node.count.dataset.condition = 'mid';
					}
					else {
						this.node.count.dataset.condition = 'none';
					}
					this.node.count.innerHTML = numh;
				}
				if (this.updates) {
					for (var i = 0; i < this.updates.length; i++) {
						this.updates[i](this);
					}
				}
				if (!_status.video) {
					game.addVideo('update', this, [this.countCards('h'), this.hp, this.maxHp, this.hujia]);
				}
				this.updateMarks();
				return this;
			}
			clearMark(i, log) {
				let num = this.countMark(i);
				if (num > 0) this.removeMark(i, num, log);
			}
			removeMark(i, num, log) {
				if (typeof num != 'number' || !num) num = 1;
				if (typeof this.storage[i] != 'number' || !this.storage[i]) return;
				if (num > this.storage[i]) num = this.storage[i];
				this.storage[i] -= num;
				if (log !== false) {
					var str = false;
					var info = get.info(i);
					if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
					else str = lib.translate[i];
					if (str) game.log(this, '移去了', get.cnNumber(num), '个', '#g【' + str + '】');
				}
				this.syncStorage(i);
				this[(this.storage[i] || (lib.skill[i] && lib.skill[i].mark)) ? 'markSkill' : 'unmarkSkill'](i);
			}
			addMark(i, num, log) {
				if (typeof num != 'number' || !num) num = 1;
				if (typeof this.storage[i] != 'number') this.storage[i] = 0;
				this.storage[i] += num;
				if (log !== false) {
					var str = false;
					var info = get.info(i);
					if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
					else str = lib.translate[i];
					if (str) game.log(this, '获得了', get.cnNumber(num), '个', '#g【' + str + '】');
				}
				this.syncStorage(i);
				this.markSkill(i);
			}
			setMark(name, num, log) {
				const count = this.countMark(name);
				if (count > num) this.removeMark(name, count - num, log);
				else if (count < num) this.addMark(name, num - count, log);
			}
			countMark(i) {
				if (this.storage[i] == undefined) return 0;
				if (typeof this.storage[i] == 'number') return this.storage[i];
				if (Array.isArray(this.storage[i])) return this.storage[i].length;
				return 0;
			}
			hasMark(i) {
				return this.countMark(i) > 0;
			}
			updateMark(i, storage) {
				if (!this.marks[i]) {
					if (lib.skill[i] && lib.skill[i].intro && (this.storage[i] || lib.skill[i].intro.markcount)) {
						this.markSkill(i);
						if (!this.marks[i]) return this;
					}
					else {
						return this;
					}
				}
				if (storage && this.storage[i]) {
					this.syncStorage(i);
				}
				if (i == 'ghujia' || ((!this.marks[i].querySelector('.image') || this.storage[i + '_markcount']) &&
					lib.skill[i] && lib.skill[i].intro && !lib.skill[i].intro.nocount &&
					(this.storage[i] || this.storage[i + '_markcount'] || lib.skill[i].intro.markcount))) {
					this.marks[i].classList.add('overflowmark');
					var num = 0;
					if (typeof lib.skill[i].intro.markcount == 'function') {
						num = lib.skill[i].intro.markcount(this.storage[i], this);
					}
					else if (lib.skill[i].intro.markcount == 'expansion') {
						num = this.countCards('x', (card) => card.hasGaintag(i));
					}
					else if (typeof this.storage[i + '_markcount'] == 'number') {
						num = this.storage[i + '_markcount'];
					}
					else if (i == 'ghujia') {
						num = this.hujia;
					}
					else if (typeof this.storage[i] == 'number') {
						num = this.storage[i];
					}
					else if (Array.isArray(this.storage[i])) {
						num = this.storage[i].length;
					}
					if (num) {
						if (!this.marks[i].markcount) {
							this.marks[i].markcount = ui.create.div('.markcount.menubutton', this.marks[i]);
						}
						this.marks[i].markcount.innerHTML = num;
					}
					else if (this.marks[i].markcount) {
						this.marks[i].markcount.delete();
						delete this.marks[i].markcount;
					}
				}
				else {
					if (this.marks[i].markcount) {
						this.marks[i].markcount.delete();
						delete this.marks[i].markcount;
					}
					if (lib.skill[i].mark == 'auto') {
						this.unmarkSkill(i);
					}
				}
				return this;
			}
			updateMarks(connect) {
				if (typeof connect == 'string' && _status.connectMode && !game.online) {
					game.broadcast(function (player, storage, skill) {
						player.storage[skill] = storage;
						player.updateMarks();
					}, this, this.storage[connect], connect);
				}
				for (var i in this.marks) {
					this.updateMark(i);
				}
			}
			num(arg1, arg2, arg3) {
				if (get.itemtype(arg1) == 'position') {
					return this.get(arg1, arg2, arg3).length;
				}
				else if (arg1 == 's') {
					if (typeof arg2 == 'boolean') {
						return game.expandSkills(this.getSkills(arg2).concat(lib.skill.global)).contains(arg3);
					}
					else {
						return game.expandSkills(this.getSkills().concat(lib.skill.global)).contains(arg2);
					}
				}
			}
			line(target, config) {
				if (get.itemtype(target) == 'players') {
					for (var i = 0; i < target.length; i++) {
						this.line(target[i], config);
					}
				}
				else if (get.itemtype(target) == 'player') {
					if (target == this) return;
					game.broadcast(function (player, target, config) {
						player.line(target, config);
					}, this, target, config);
					game.addVideo('line', this, [target.dataset.position, config]);
					game.linexy([
						this.getLeft() + this.offsetWidth / 2,
						this.getTop() + this.offsetHeight / 2,
						target.getLeft() + target.offsetWidth / 2,
						target.getTop() + target.offsetHeight / 2
					], config, true);
				}
			}
			line2(targets, config) {
				this.line(targets[0], config);
				targets = targets.slice(0);
				for (var i = 1; i < targets.length; i++) {
					(function (j) {
						setTimeout(function () {
							targets[j - 1].line(targets[j], config);
						}, lib.config.duration * i);
					}(i));
				}
			}
			getNext() {
				if (this.hasSkill('undist')) return null;
				var target = this;
				for (var i = 0; i < game.players.length - 1; i++) {
					target = target.next;
					if (!target.hasSkill('undist')) {
						return target;
					}
				}
				return null;
			}
			getPrevious() {
				if (this.hasSkill('undist')) return null;
				var target = this;
				for (var i = 0; i < game.players.length - 1; i++) {
					target = target.previous;
					if (!target.hasSkill('undist')) {
						return target;
					}
				}
				return null;
			}
			countUsed(card, type) {
				if (type === true) {
					var num = 0;
					var history = this.getHistory('useCard');
					for (var i = 0; i < history.length; i++) {
						if (!card) num++;
						else if (typeof card == 'string' && history[i].card && card == history[i].card.name) num++;
						else if (typeof card == 'object' && history[i].card && card.name == history[i].card.name) num++;
					}
					return num;
				}
				var num;
				var stat = this.getStat('card');
				if (!card) {
					num = 0;
					for (var i in stat) {
						if (typeof stat[i] == 'number') num += stat[i];
					}
					return num;
				}
				if (typeof card == 'object') {
					card = card.name;
				}
				num = stat[card];
				if (typeof num != 'number') return 0;
				return num;
			}
			countSkill(skill) {
				var num = this.getStat('skill')[skill];
				if (num == undefined) return 0;
				return num;
			}
			getStockSkills(unowned, unique, hidden) {
				var list = [];
				if (lib.character[this.name] && (hidden || !this.isUnseen(0))) {
					list.addArray(lib.character[this.name][3]);
				}
				if (lib.character[this.name1] && (hidden || !this.isUnseen(0))) {
					list.addArray(lib.character[this.name1][3]);
				}
				if (lib.character[this.name2] && (hidden || !this.isUnseen(1))) {
					list.addArray(lib.character[this.name2][3]);
				}
				if (!unowned) {
					for (var i = 0; i < list.length; i++) {
						if (!this.hasSkill(list[i])) {
							list.splice(i--, 1);
						}
					}
				}
				if (!unique) {
					for (var i = 0; i < list.length; i++) {
						var info = lib.skill[list[i]];
						if (!info || info.unique || info.temp || info.sub || info.charlotte) {
							list.splice(i--, 1);
						}
					}
				}
				return list;
			}
			/**
			 * @param {string} [arg1='h']
			 * @param {string | Record<string, any> | (card: Card) => boolean} [arg2]
			 * @returns {Card[]}
			 */
			getCards(arg1, arg2) {
				if (typeof arg1 != 'string') {
					arg1 = 'h';
				}
				var cards = [], cards1 = [];
				var i, j;
				for (i = 0; i < arg1.length; i++) {
					if (arg1[i] == 'h') {
						for (j = 0; j < this.node.handcards1.childElementCount; j++) {
							if (!this.node.handcards1.childNodes[j].classList.contains('removing') && !this.node.handcards1.childNodes[j].classList.contains('glows')) {
								cards.push(this.node.handcards1.childNodes[j]);
							}
						}
						for (j = 0; j < this.node.handcards2.childElementCount; j++) {
							if (!this.node.handcards2.childNodes[j].classList.contains('removing') && !this.node.handcards2.childNodes[j].classList.contains('glows')) {
								cards.push(this.node.handcards2.childNodes[j]);
							}
						}
					}
					else if (arg1[i] == 's') {
						for (j = 0; j < this.node.handcards1.childElementCount; j++) {
							if (!this.node.handcards1.childNodes[j].classList.contains('removing') && this.node.handcards1.childNodes[j].classList.contains('glows')) {
								cards.push(this.node.handcards1.childNodes[j]);
							}
						}
						for (j = 0; j < this.node.handcards2.childElementCount; j++) {
							if (!this.node.handcards2.childNodes[j].classList.contains('removing') && this.node.handcards2.childNodes[j].classList.contains('glows')) {
								cards.push(this.node.handcards2.childNodes[j]);
							}
						}
					}
					else if (arg1[i] == 'e') {
						for (j = 0; j < this.node.equips.childElementCount; j++) {
							if (!this.node.equips.childNodes[j].classList.contains('removing') && !this.node.equips.childNodes[j].classList.contains('feichu')) {
								cards.push(this.node.equips.childNodes[j]);
							}
						}
					}
					else if (arg1[i] == 'j') {
						for (j = 0; j < this.node.judges.childElementCount; j++) {
							if (!this.node.judges.childNodes[j].classList.contains('removing') && !this.node.judges.childNodes[j].classList.contains('feichu')) {
								cards.push(this.node.judges.childNodes[j]);
								if (this.node.judges.childNodes[j].viewAs && arguments.length > 1) {
									this.node.judges.childNodes[j].tempJudge = this.node.judges.childNodes[j].name;
									this.node.judges.childNodes[j].name = this.node.judges.childNodes[j].viewAs;
									cards1.push(this.node.judges.childNodes[j]);
								}
							}
						}
					}
					else if (arg1[i] == 'x') {
						for (j = 0; j < this.node.expansions.childElementCount; j++) {
							if (!this.node.expansions.childNodes[j].classList.contains('removing')) {
								cards.push(this.node.expansions.childNodes[j]);
							}
						}
					}
				}
				if (arguments.length == 1) {
					return cards;
				}
				if (arg2) {
					if (typeof arg2 == 'string') {
						for (i = 0; i < cards.length; i++) {
							if (get.name(cards[i]) != arg2) {
								cards.splice(i, 1); i--;
							}
						}
					}
					else if (typeof arg2 == 'object') {
						for (i = 0; i < cards.length; i++) {
							for (j in arg2) {
								var value;
								if (j == 'type' || j == 'subtype' || j == 'color' || j == 'suit' || j == 'number') {
									value = get[j](cards[i]);
								}
								else {
									value = cards[i][j];
								}
								if ((typeof arg2[j] == 'string' && value != arg2[j]) ||
									(Array.isArray(arg2[j]) && !arg2[j].contains(value))) {
									cards.splice(i--, 1); break;
								}
							}
						}
					}
					else if (typeof arg2 == 'function') {
						for (i = 0; i < cards.length; i++) {
							if (!arg2(cards[i])) {
								cards.splice(i--, 1);
							}
						}
					}
				}
				for (i = 0; i < cards1.length; i++) {
					if (cards1[i].tempJudge) {
						cards1[i].name = cards1[i].tempJudge;
						delete cards1[i].tempJudge;
					}
				}
				return cards;
			}
			getDiscardableCards(player, arg1, arg2) {
				var cards = this.getCards(arg1, arg2);
				for (var i = 0; i < cards.length; i++) {
					if (!lib.filter.canBeDiscarded(cards[i], player, this)) {
						cards.splice(i--, 1);
					}
				}
				return cards;
			}
			getGainableCards(player, arg1, arg2) {
				var cards = this.getCards(arg1, arg2);
				for (var i = 0; i < cards.length; i++) {
					if (!lib.filter.canBeGained(cards[i], player, this)) {
						cards.splice(i--, 1);
					}
				}
				return cards;
			}
			getGainableSkills(func) {
				var list = [];
				var names = [this.name, this.name1, this.name2];
				for (var i = 0; i < names.length; i++) {
					list.addArray(get.gainableSkillsName(names[i], func));
				}
				return list;
			}
			countCards(arg1, arg2) {
				return this.getCards(arg1, arg2).length;
			}
			countDiscardableCards(player, arg1, arg2) {
				return this.getDiscardableCards(player, arg1, arg2).length;
			}
			countGainableCards(player, arg1, arg2) {
				return this.getGainableCards(player, arg1, arg2).length;
			}
			getOriginalSkills() {
				var skills = [];
				if (lib.character[this.name] && !this.isUnseen(0)) {
					skills.addArray(lib.character[this.name][3]);
				}
				if (this.name2 && lib.character[this.name2] && !this.isUnseen(1)) {
					skills.addArray(lib.character[this.name2][3]);
				}
				return skills;
			}
			getModableSkills(useCache) {
				var func = function (player) {
					var skills = player.getSkills().concat(lib.skill.global);
					game.expandSkills(skills);
					skills = skills.filter(function (skill) {
						var info = get.info(skill);
						return info && info.mod;
					});
					skills.sort((a, b) => get.priority(a) - get.priority(b));
					return skills;
				};
				if (!useCache) return func(this);
				return game.callFuncUseStepCache("player.getModableSkills", func, [this]);
			}
			getSkills(arg2, arg3, arg4) {
				var skills = this.skills.slice(0);
				var es = [];
				var i, j;
				if (arg3 !== false) {
					for (i = 0; i < this.node.equips.childElementCount; i++) {
						if (!this.node.equips.childNodes[i].classList.contains('removing')) {
							var equipskills = get.info(this.node.equips.childNodes[i], false).skills;
							if (equipskills) {
								es.addArray(equipskills);
							}
						}
					}
					if (arg2 == 'e') {
						return es;
					}
				}
				for (var i in this.additionalSkills) {
					if (Array.isArray(this.additionalSkills[i]) && (arg2 || i.indexOf('hidden:') !== 0)) {
						for (j = 0; j < this.additionalSkills[i].length; j++) {
							if (this.additionalSkills[i][j]) {
								skills.add(this.additionalSkills[i][j]);
							}
						}
					}
					else if (this.additionalSkills[i] && typeof this.additionalSkills[i] == 'string') {
						skills.add(this.additionalSkills[i]);
					}
				}
				for (var i in this.tempSkills) {
					skills.add(i);
				}
				if (arg2) skills.addArray(this.hiddenSkills);
				if (arg2 === false || arg2 == 'invisible') skills.addArray(this.invisibleSkills);
				if (arg3 !== false) skills.addArray(es);
				for (var i in this.forbiddenSkills) {
					skills.remove(i);
				}
				if (arg4 !== false) {
					skills = game.filterSkills(skills, this, es);
				}
				return skills;
			}
			get(arg1, arg2, arg3, arg4) {
				var i, j;
				if (arg1 == 's') {
					var skills = this.skills.slice(0);
					var es = [];
					if (arg3 !== false) {
						for (i = 0; i < this.node.equips.childElementCount; i++) {
							if (!this.node.equips.childNodes[i].classList.contains('removing') && !this.node.equips.childNodes[i].classList.contains('feichu')) {
								var equipskills = get.info(this.node.equips.childNodes[i]).skills;
								if (equipskills) {
									es.addArray(equipskills);
								}
							}
						}
						if (arg2 == 'e') {
							return es;
						}
					}
					for (var i in this.additionalSkills) {
						if (Array.isArray(this.additionalSkills[i])) {
							for (j = 0; j < this.additionalSkills[i].length; j++) {
								if (this.additionalSkills[i][j]) {
									skills.add(this.additionalSkills[i][j]);
								}
							}
						}
						else if (this.additionalSkills[i] && typeof this.additionalSkills[i] == 'string') {
							skills.add(this.additionalSkills[i]);
						}
					}
					for (var i in this.tempSkills) {
						skills.add(i);
					}
					if (arg2) skills.addArray(this.hiddenSkills);
					if (arg3 !== false) skills.addArray(es);
					for (var i in this.forbiddenSkills) {
						skills.remove(i);
					}
					if (arg4 !== false) {
						skills = game.filterSkills(skills, this, es);
					}
					return skills;
				}
				else if (get.is.pos(arg1)) {
					var cards = [], cards1 = [];
					for (i = 0; i < arg1.length; i++) {
						if (arg1[i] == 'h') {
							for (j = 0; j < this.node.handcards1.childElementCount; j++) {
								if (!this.node.handcards1.childNodes[j].classList.contains('removing') && !this.node.handcards1.childNodes[j].classList.contains('feichu') && !this.node.handcards1.childNodes[j].classList.contains('glows')) {
									cards.push(this.node.handcards1.childNodes[j]);
								}
							}
							for (j = 0; j < this.node.handcards2.childElementCount; j++) {
								if (!this.node.handcards2.childNodes[j].classList.contains('removing') && !this.node.handcards2.childNodes[j].classList.contains('feichu') && !this.node.handcards2.childNodes[j].classList.contains('glows')) {
									cards.push(this.node.handcards2.childNodes[j]);
								}
							}
						}
						else if (arg1[i] == 'e') {
							for (j = 0; j < this.node.equips.childElementCount; j++) {
								if (!this.node.equips.childNodes[j].classList.contains('removing') && !this.node.equips.childNodes[j].classList.contains('feichu')) {
									cards.push(this.node.equips.childNodes[j]);
								}
							}
							if (arguments.length == 2 && typeof arg2 == 'string' && /1|2|3|4|5/.test(arg2)) {
								for (j = 0; j < cards.length; j++) {
									if (get.subtype(cards[j]) == 'equip' + arg2) return cards[j];
								}
								return;
							}
						}
						else if (arg1[i] == 'j') {
							for (j = 0; j < this.node.judges.childElementCount; j++) {
								if (!this.node.judges.childNodes[j].classList.contains('removing') && !this.node.judges.childNodes[j].classList.contains('feichu')) {
									cards.push(this.node.judges.childNodes[j]);
									if (this.node.judges.childNodes[j].viewAs && arguments.length > 1) {
										this.node.judges.childNodes[j].tempJudge = this.node.judges.childNodes[j].name;
										this.node.judges.childNodes[j].name = this.node.judges.childNodes[j].viewAs;
										cards1.push(this.node.judges.childNodes[j]);
									}
								}
							}
						}
					}
					if (arguments.length == 1) {
						return cards;
					}
					if (arg2 != undefined) {
						if (typeof arg3 == 'function') {
							var cards2 = cards.slice(0);
							cards.sort(function (a, b) {
								return arg3(b, cards2) - arg3(a, cards2);
							});
						}
						if (typeof arg2 == 'string') {
							for (i = 0; i < cards.length; i++) {
								if (cards[i].name != arg2) {
									cards.splice(i, 1); i--;
								}
							}
						}
						else if (typeof arg2 == 'object') {
							for (i = 0; i < cards.length; i++) {
								for (j in arg2) {
									if (j == 'type') {
										if (typeof arg2[j] == 'object') {
											if (arg2[j].contains(get.type(cards[i])) == false) {
												cards.splice(i, 1); i--; break;
											}
										}
										else if (typeof arg2[j] == 'string') {
											if (get.type(cards[i]) != arg2[j]) {
												cards.splice(i, 1); i--; break;
											}
										}
									}
									else if (j == 'subtype') {
										if (typeof arg2[j] == 'object') {
											if (arg2[j].contains(get.subtype(cards[i])) == false) {
												cards.splice(i, 1); i--; break;
											}
										}
										else if (typeof arg2[j] == 'string') {
											if (get.subtype(cards[i]) != arg2[j]) {
												cards.splice(i, 1); i--; break;
											}
										}
									}
									else if (j == 'color') {
										if (typeof arg2[j] == 'object') {
											if (arg2[j].contains(get.color(cards[i])) == false) {
												cards.splice(i, 1); i--; break;
											}
										}
										else if (typeof arg2[j] == 'string') {
											if (get.color(cards[i]) != arg2[j]) {
												cards.splice(i, 1); i--; break;
											}
										}
									}
									else if (j == 'suit') {
										if (typeof arg2[j] == 'object') {
											if (arg2[j].contains(get.suit(cards[i])) == false) {
												cards.splice(i, 1); i--; break;
											}
										}
										else if (typeof arg2[j] == 'string') {
											if (get.suit(cards[i]) != arg2[j]) {
												cards.splice(i, 1); i--; break;
											}
										}
									}
									else if (j == 'number') {
										if (typeof arg2[j] == 'object') {
											if (arg2[j].contains(get.number(cards[i])) == false) {
												cards.splice(i, 1); i--; break;
											}
										}
										else if (typeof arg2[j] == 'string') {
											if (get.number(cards[i]) != arg2[j]) {
												cards.splice(i, 1); i--; break;
											}
										}
									}
									else if (typeof arg2[j] == 'object') {
										if (arg2[j].contains(cards[i][j]) == false) {
											cards.splice(i, 1); i--; break;
										}
									}
									else if (typeof arg2[j] == 'string') {
										if (cards[i][j] != arg2[j]) {
											cards.splice(i, 1); i--; break;
										}
									}
								}
							}
						}
						else if (typeof arg2 == 'number' && arg2 > 0) {
							cards.splice(arg2);
						}
						else if (typeof arg2 == 'function') {
							for (i = 0; i < cards.length; i++) {
								if (!arg2(cards[i])) {
									cards.splice(i, 1); i--;
								}
							}
						}
					}
					for (i = 0; i < cards1.length; i++) {
						if (cards1[i].tempJudge) {
							cards1[i].name = cards1[i].tempJudge;
							delete cards1[i].tempJudge;
						}
					}
					if (arg2 === 0) return cards[0];
					if (typeof arg3 == 'number') {
						if (arg3 == 0) return cards[0];
						cards.splice(arg3);
					}
					if (typeof arg4 == 'number') {
						if (arg4 == 0) return cards[0];
						cards.splice(arg4);
					}
					return cards;
				}
			}
			syncStorage(skill) {
				switch (get.itemtype(this.storage[skill])) {
					case 'cards': game.addVideo('storage', this, [skill, get.cardsInfo(this.storage[skill]), 'cards']); break;
					case 'card': game.addVideo('storage', this, [skill, get.cardInfo(this.storage[skill]), 'card']); break;
					default:
						try {
							game.addVideo('storage', this, [skill, JSON.parse(JSON.stringify(this.storage[skill]))]);
						}
						catch (e) {
							console.log(this.storage[skill]);
						}
				}
			}
			syncSkills() {
				game.broadcast(function (player, skills) {
					player.applySkills(skills);
				}, this, get.skillState(this));
			}
			playerfocus(time) {
				time = time || 1000;
				this.classList.add('playerfocus');
				ui.arena.classList.add('playerfocus');
				var that = this;
				setTimeout(function () {
					that.classList.remove('playerfocus');
					ui.arena.classList.remove('playerfocus');
				}, time);
				game.addVideo('playerfocus', this, time);
				game.broadcast(function (player, time) {
					player.playerfocus(time);
				}, this, time);
				return this;
			}
			setIdentity(identity, nature) {
				if (!identity) identity = this.identity;
				if (get.is.jun(this)) {
					this.node.identity.firstChild.innerHTML = '君';
				}
				else {
					this.node.identity.firstChild.innerHTML = get.translation(identity);
				}
				this.node.identity.dataset.color = nature || identity;
				return this;
			}
			insertPhase(skill, insert) {
				var evt = _status.event.getParent('phase');
				var next;
				if (evt && evt.parent && evt.parent.next) {
					evt = evt.parent;
					next = game.createEvent('phase', false, evt);
				}
				else if (_status.event.parent && _status.event.parent.next) {
					evt = _status.event.parent;
					next = game.createEvent('phase', false, evt);
				}
				else {
					evt = null;
					next = game.createEvent('phase', false);
				}
				if (evt && insert && evt.next.contains(next)) {
					evt.next.remove(next);
					evt.next.unshift(next);
				}
				next.player = this;
				next.forceDie = true;
				next.includeOut = true;
				next.skill = skill || _status.event.name;
				next.setContents('phase');
				return next;
			}
			insertEvent(name, content, arg) {
				var evt = _status.event.getParent('phase');
				var next;
				if (evt && evt.parent && evt.parent.next) {
					next = game.createEvent(name, null, evt.parent);
				}
				else {
					next = game.createEvent(name);
				}
				for (var i in arg) {
					next[i] = arg[i];
				}
				next.player = this;
				next.setContent(content);
				return next;
			}
			phase(skill) {
				var next = game.createEvent('phase', false);
				next.player = this;
				next.setContents('phase');
				if (!_status.roundStart) {
					_status.roundStart = this;
				}
				if (skill) {
					next.skill = skill;
				}
				next.forceDie = true;
				next.includeOut = true;
				return next;
			}
			phaseZhunbei() {
				var next = game.createEvent('phaseZhunbei');
				next.player = this;
				next.setContent('phaseZhunbei');
				return next;
			}
			phaseJudge() {
				var next = game.createEvent('phaseJudge');
				next.player = this;
				next.setContent('phaseJudge');
				return next;
			}
			phaseDraw() {
				var next = game.createEvent('phaseDraw');
				next.player = this;
				next.num = 2;
				if ((get.config('first_less') || _status.connectMode || _status.first_less_forced) && game.phaseNumber == 1 && _status.first_less) {
					next.num--;
				}
				next.setContent('phaseDraw');
				return next;
			}
			phaseUse() {
				var next = game.createEvent('phaseUse');
				next.player = this;
				next.setContent('phaseUse');
				return next;
			}
			phaseDiscard() {
				var next = game.createEvent('phaseDiscard');
				next.player = this;
				next.setContent('phaseDiscard');
				return next;
			}
			phaseJieshu() {
				var next = game.createEvent('phaseJieshu');
				next.player = this;
				next.setContent('phaseJieshu');
				return next;
			}
			chooseToUse(use) {
				var next = game.createEvent('chooseToUse');
				next.player = this;
				if (arguments.length == 1 && get.objtype(arguments[0]) == 'object') {
					for (var i in use) {
						next[i] = use[i];
					}
				}
				else {
					for (var i = 0; i < arguments.length; i++) {
						if (typeof arguments[i] == 'number' || get.itemtype(arguments[i]) == 'select') {
							next.selectTarget = arguments[i];
						}
						else if ((typeof arguments[i] == 'object' && arguments[i]) || typeof arguments[i] == 'function') {
							if (get.itemtype(arguments[i]) == 'player' || next.filterCard) {
								next.filterTarget = arguments[i];
							}
							else next.filterCard = arguments[i];
						}
						else if (typeof arguments[i] == 'boolean') {
							next.forced = arguments[i];
						}
						else if (typeof arguments[i] == 'string') {
							next.prompt = arguments[i];
						}
					}
				}
				if (typeof next.filterCard == 'object') {
					next.filterCard = get.filter(next.filterCard);
				}
				if (typeof next.filterTarget == 'object') {
					next.filterTarget = get.filter(next.filterTarget, 2);
				}
				if (next.filterCard == undefined) {
					next.filterCard = lib.filter.filterCard;
				}
				if (next.selectCard == undefined) {
					next.selectCard = [1, 1];
				}
				if (next.filterTarget == undefined) {
					next.filterTarget = lib.filter.filterTarget;
				}
				if (next.selectTarget == undefined) {
					next.selectTarget = lib.filter.selectTarget;
				}
				if (next.position == undefined) {
					next.position = 'hs';
				}
				if (next.ai1 == undefined) next.ai1 = get.order;
				if (next.ai2 == undefined) next.ai2 = get.effect_use;
				next.setContent('chooseToUse');
				next._args = Array.from(arguments);
				return next;
			}
			chooseToRespond() {
				var next = game.createEvent('chooseToRespond');
				next.player = this;
				var filter;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'number') {
						next.selectCard = [arguments[i], arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectCard = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'position') {
						next.position = arguments[i];
					}
					else if (typeof arguments[i] == 'function') {
						if (next.filterCard) next.ai = arguments[i];
						else next.filterCard = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i]) {
						next.filterCard = get.filter(arguments[i]);
						filter = arguments[i];
					}
					else if (arguments[i] == 'nosource') {
						next.nosource = true;
					}
					else if (typeof arguments[i] == 'string') {
						next.prompt = arguments[i];
					}
				}
				if (next.filterCard == undefined) next.filterCard = lib.filter.all;
				if (next.selectCard == undefined) next.selectCard = [1, 1];
				if (next.source == undefined && !next.nosource) next.source = _status.event.player;
				if (next.ai == undefined) next.ai = get.unuseful2;
				if (next.prompt != false) {
					if (typeof next.prompt == 'string') {
						//next.dialog=next.prompt;
					}
					else {
						var str = '请打出' + get.cnNumber(next.selectCard[0]) + '张';
						if (filter) {
							if (filter.name) {
								str += get.translation(filter.name);
							}
							else {
								str += '牌';
							}
						}
						else {
							str += '牌';
						}
						if (_status.event.getParent().name == 'useCard') {
							var cardname = _status.event.name;
							if (lib.card[cardname] && lib.translate[cardname]) {
								str += '响应' + lib.translate[cardname];
							}
						}
						next.prompt = str;
					}
				}
				next.position = 'hs';
				if (next.ai2 == undefined) next.ai2 = (() => 1);
				next.setContent('chooseToRespond');
				next._args = Array.from(arguments);
				return next;
			}
			chooseToGive(...args) {
				const next = game.createEvent('chooseToGive');
				next.player = this;
				if (args.length == 1 && get.is.object(args[0])) {
					for (const i in args[0]) next[i] = args[0][i];
				}
				else for (const arg of args) {
					if (get.itemtype(arg) == 'player') {
						next.target = arg;
					}
					else if (typeof arg == 'number') {
						next.selectCard = [arg, arg];
					}
					else if (get.itemtype(arg) == 'select') {
						next.selectCard = arg;
					}
					else if (get.itemtype(arg) == 'dialog') {
						next.dialog = arg;
						next.prompt = false;
					}
					else if (typeof arg == 'boolean') {
						next.forced = arg;
					}
					else if (get.itemtype(arg) == 'position') {
						next.position = arg;
					}
					else if (typeof arg == 'function') {
						if (next.filterCard) next.ai = arg;
						else next.filterCard = arg;
					}
					else if (typeof arg == 'object' && arg) {
						next.filterCard = get.filter(arg);
					}
					else if (typeof arg == 'string') {
						get.evtprompt(next, arg);
					}
					if (arg === null) console.log(args);
				}
				if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
				if (next.filterCard == undefined) next.filterCard = lib.filter.all;
				if (next.selectCard == undefined) next.selectCard = [1, 1];
				if (next.position == undefined) next.position = 'h';
				if (next.ai == undefined) next.ai = get.unuseful;
				next.setContent('chooseToGive');
				next._args = args;
				return next;
			}
			chooseToDiscard() {
				var next = game.createEvent('chooseToDiscard');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'number') {
						next.selectCard = [arguments[i], arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectCard = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'dialog') {
						next.dialog = arguments[i];
						next.prompt = false;
					}
					else if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'position') {
						next.position = arguments[i];
					}
					else if (typeof arguments[i] == 'function') {
						if (next.filterCard) next.ai = arguments[i];
						else next.filterCard = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i]) {
						next.filterCard = get.filter(arguments[i]);
					}
					else if (typeof arguments[i] == 'string') {
						get.evtprompt(next, arguments[i]);
					}
					if (arguments[i] === null) {
						for (var i = 0; i < arguments.length; i++) {
							console.log(arguments[i]);
						}
					}
				}
				if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
				if (next.filterCard == undefined) next.filterCard = lib.filter.all;
				if (next.selectCard == undefined) next.selectCard = [1, 1];
				if (next.ai == undefined) next.ai = get.unuseful;
				next.autochoose = function () {
					if (!this.forced) return false;
					if (typeof this.selectCard == 'function') return false;
					var cards = this.player.getCards(this.position);
					var num = cards.length;
					for (var i = 0; i < cards.length; i++) {
						if (!lib.filter.cardDiscardable(cards[i], this.player, this)) num--;
					}
					return get.select(this.selectCard)[0] >= num;
				};
				next.setContent('chooseToDiscard');
				next._args = Array.from(arguments);
				return next;
			}
			chooseToCompare(target, check) {
				var next = game.createEvent('chooseToCompare');
				next.player = this;
				if (Array.isArray(target)) {
					next.targets = target;
					if (check) next.ai = check;
					else next.ai = function (card) {
						if (typeof card == 'string' && lib.skill[card]) {
							var ais = lib.skill[card].check || function () { return 0; };
							return ais();
						}
						var addi = (get.value(card) >= 8 && get.type(card) != 'equip') ? -3 : 0;
						if (card.name == 'du') addi -= 3;
						var source = _status.event.source;
						var player = _status.event.player;
						var event = _status.event.getParent();
						var getn = function (card) {
							if (player.hasSkill('tianbian') && get.suit(card) == 'heart') return 13 * (Boolean(event.small) ? -1 : 1);
							return get.number(card) * (Boolean(event.small) ? -1 : 1);
						};
						if (source && source != player) {
							if (get.attitude(player, source) > 1) {
								if (Boolean(event.small)) return getn(card) - get.value(card) / 3 + addi;
								return -getn(card) - get.value(card) / 3 + addi;
							}
							if (Boolean(event.small)) return -getn(card) - get.value(card) / 5 + addi;
							return getn(card) - get.value(card) / 5 + addi;
						}
						else {
							if (Boolean(event.small)) return -getn(card) - get.value(card) / 5 + addi;
							return getn(card) - get.value(card) / 5 + addi;
						}
					};
					next.setContent('chooseToCompareMultiple');
				}
				else {
					next.target = target;
					if (check) next.ai = check;
					else next.ai = function (card) {
						if (typeof card == 'string' && lib.skill[card]) {
							var ais = lib.skill[card].check || function () { return 0; };
							return ais();
						}
						var player = get.owner(card);
						var getn = function (card) {
							if (player.hasSkill('tianbian') && get.suit(card) == 'heart') return 13;
							return get.number(card);
						};
						var event = _status.event.getParent();
						var to = (player == event.player ? event.target : event.player);
						var addi = (get.value(card) >= 8 && get.type(card) != 'equip') ? -6 : 0;
						var friend = get.attitude(player, to) > 0;
						if (card.name == 'du') addi -= 5;
						if (player == event.player) {
							if (Boolean(event.small)) return -getn(card) - get.value(card) / (friend ? 4 : 5) + addi;
							return getn(card) - get.value(card) / (friend ? 4 : 5) + addi;
						}
						else {
							if (friend == Boolean(event.small)) return getn(card) - get.value(card) / (friend ? 3 : 5) + addi;
							return -getn(card) - get.value(card) / (friend ? 3 : 5) + addi;
						}
					};
					next.setContent('chooseToCompare');
				}
				next.forceDie = true;
				next._args = Array.from(arguments);
				return next;
			}
			chooseSkill(target) {
				var next = game.createEvent('chooseSkill');
				next.player = this;
				next.setContent('chooseSkill');
				next.target = target;
				for (var i = 1; i < arguments.length; i++) {
					if (typeof arguments[i] == 'string') {
						next.prompt = arguments[i];
					}
					else if (typeof arguments[i] == 'function') {
						next.func = arguments[i];
					}
				}
			}
			discoverCard(list) {
				var next = game.createEvent('discoverCard');
				next.player = this;
				next.setContent('discoverCard');
				next.list = list || lib.inpile.slice(0);
				next.forced = true;
				for (var i = 1; i < arguments.length; i++) {
					if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						switch (arguments[i]) {
							case 'use': next.use = true; break;
							case 'nogain': next.nogain = true; break;
							default: next.prompt = arguments[i];
						}
					}
					else if (typeof arguments[i] == 'number') {
						next.num = arguments[i];
					}
					else if (typeof arguments[i] === 'function') {
						next.ai = arguments[i];
					}
				}
				return next;
			}
			chooseCardButton() {
				var cards, prompt, forced, select;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'cards') cards = arguments[i];
					else if (typeof arguments[i] == 'boolean') forced = arguments[i];
					else if (typeof arguments[i] == 'string') prompt = arguments[i];
					else if (get.itemtype(arguments[i]) == 'select' || typeof arguments[i] == 'number') select = arguments[i];
				}
				if (prompt == undefined) prompt = '请选择卡牌';
				return this.chooseButton(forced, select, 'hidden', [prompt, cards, 'hidden']);
			}
			chooseVCardButton() {
				var list, prompt, forced, select, notype = false;
				for (var i = 0; i < arguments.length; i++) {
					if (Array.isArray(arguments[i])) {
						list = arguments[i];
					}
					else if (arguments[i] == 'notype') {
						notype = true;
					}
					else if (typeof arguments[i] == 'boolean') forced = arguments[i];
					else if (typeof arguments[i] == 'string') prompt = arguments[i];
					else if (get.itemtype(arguments[i]) == 'select' || typeof arguments[i] == 'number') select = arguments[i];
				}
				for (var i = 0; i < list.length; i++) {
					list[i] = [notype ? '' : (get.subtype(list[i], false) || get.type(list[i])), '', list[i]];
				}
				if (prompt == undefined) prompt = '请选择卡牌';
				return this.chooseButton(forced, select, 'hidden', [prompt, [list, 'vcard'], 'hidden']);
			}
			chooseButton() {
				var next = game.createEvent('chooseButton');
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'dialog') {
						next.dialog = arguments[i];
						next.closeDialog = true;
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectButton = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.selectButton = [arguments[i], arguments[i]];
					}
					else if (typeof arguments[i] == 'function') {
						if (next.ai) next.filterButton = arguments[i];
						else next.ai = arguments[i];
					}
					else if (Array.isArray(arguments[i])) {
						next.createDialog = arguments[i];
					}
				}
				next.player = this;
				if (typeof next.forced != 'boolean') next.forced = false;
				if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
				if (next.filterButton == undefined) next.filterButton = lib.filter.filterButton;
				if (next.selectButton == undefined) next.selectButton = [1, 1];
				if (next.ai == undefined) next.ai = function () { return 1; };
				next.setContent('chooseButton');
				next._args = Array.from(arguments);
				next.forceDie = true;
				return next;
			}
			chooseButtonOL(list, callback, ai) {
				var next = game.createEvent('chooseButtonOL');
				next.list = list;
				next.setContent('chooseButtonOL');
				next.ai = ai;
				next.callback = callback;
				next._args = Array.from(arguments);
				return next;
			}
			chooseCardOL() {
				var next = game.createEvent('chooseCardOL');
				next._args = [];
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'players') {
						next.list = arguments[i].slice(0);
					}
					else {
						next._args.push(arguments[i]);
					}
				}
				next.setContent('chooseCardOL');
				next._args.add('glow_result');
				return next;
			}
			chooseCard(choose) {
				var next = game.createEvent('chooseCard');
				next.player = this;
				if (arguments.length == 1 && get.is.object(choose)) {
					for (var i in choose) {
						next[i] = choose[i];
					}
				}
				else {
					for (var i = 0; i < arguments.length; i++) {
						if (typeof arguments[i] == 'number') {
							next.selectCard = [arguments[i], arguments[i]];
						}
						else if (get.itemtype(arguments[i]) == 'select') {
							next.selectCard = arguments[i];
						}
						else if (typeof arguments[i] == 'boolean') {
							next.forced = arguments[i];
						}
						else if (get.itemtype(arguments[i]) == 'position') {
							next.position = arguments[i];
						}
						else if (typeof arguments[i] == 'function') {
							if (next.filterCard) next.ai = arguments[i];
							else next.filterCard = arguments[i];
						}
						else if (typeof arguments[i] == 'object' && arguments[i]) {
							next.filterCard = get.filter(arguments[i]);
						}
						else if (arguments[i] == 'glow_result') {
							next.glow_result = true;
						}
						else if (typeof arguments[i] == 'string') {
							get.evtprompt(next, arguments[i]);
						}
					}
				}
				if (next.filterCard == undefined) next.filterCard = lib.filter.all;
				if (next.selectCard == undefined) next.selectCard = [1, 1];
				if (next.ai == undefined) next.ai = get.unuseful3;
				next.setContent('chooseCard');
				next._args = Array.from(arguments);
				return next;
			}
			chooseUseTarget() {
				var next = game.createEvent('chooseUseTarget');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.card = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'players') {
						next.targets = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'player') {
						next.targets = [arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectTarget = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.selectTarget = [arguments[i], arguments[i]];
					}
					else if (get.is.object(arguments[i]) && arguments[i].name) {
						next.card = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						if (arguments[i] == 'nopopup') {
							next.nopopup = true;
						}
						else if (arguments[i] == 'noanimate') {
							next.animate = false;
						}
						else if (arguments[i] == 'nothrow') {
							next.throw = false;
						}
						else if (arguments[i] == 'nodistance') {
							next.nodistance = true;
						}
						else if (arguments[i] == 'noTargetDelay') {
							next.noTargetDelay = true;
						}
						else if (arguments[i] == 'nodelayx') {
							next.nodelayx = true;
						}
						else if (lib.card[arguments[i]] && !next.card) {
							next.card = { name: arguments[i], isCard: true };
						}
						else get.evtprompt(next, arguments[i]);
					}
					else if (arguments[i] === true) {
						next.forced = true;
					}
					else if (arguments[i] === false) {
						next.addCount = false;
					}
				}
				if (!next.targets) next.targets = game.players.slice(0);
				if (next.cards == undefined) {
					if (get.itemtype(next.card) == 'card') {
						next.cards = [next.card];
					}
					else next.cards = [];
				}
				else if (next.card == undefined) {
					if (next.cards) {
						next.card = next.cards[0];
					}
				}
				next.setContent('chooseUseTarget');
				next._args = Array.from(arguments);
				return next;
				// Fully Online-Ready! Enjoy It!
			}
			chooseTarget() {
				var next = game.createEvent('chooseTarget');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'number') {
						next.selectTarget = [arguments[i], arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectTarget = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'dialog') {
						next.dialog = arguments[i];
						next.prompt = false;
					}
					else if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (typeof arguments[i] == 'function') {
						if (next.filterTarget) next.ai = arguments[i];
						else next.filterTarget = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						get.evtprompt(next, arguments[i]);
					}
				}
				if (next.filterTarget == undefined) next.filterTarget = lib.filter.all;
				if (next.selectTarget == undefined) next.selectTarget = [1, 1];
				if (next.ai == undefined) next.ai = get.attitude2;
				next.setContent('chooseTarget');
				next._args = Array.from(arguments);
				next.forceDie = true;
				return next;
			}
			chooseCardTarget(choose) {
				var next = game.createEvent('chooseCardTarget');
				next.player = this;
				if (arguments.length == 1) {
					for (var i in choose) {
						next[i] = choose[i];
					}
				}
				if (typeof next.filterCard == 'object') {
					next.filterCard = get.filter(next.filterCard);
				}
				if (typeof next.filterTarget == 'object') {
					next.filterTarget = get.filter(next.filterTarget, 2);
				}
				if (next.filterCard == undefined || next.filterCard === true) {
					next.filterCard = lib.filter.all;
				}
				if (next.selectCard == undefined) {
					next.selectCard = 1;
				}
				if (next.filterTarget == undefined || next.filterTarget === true) {
					next.filterTarget = lib.filter.all;
				}
				if (next.selectTarget == undefined) {
					next.selectTarget = 1;
				}
				if (next.ai1 == undefined) next.ai1 = get.unuseful2;
				if (next.ai2 == undefined) next.ai2 = get.attitude2;
				next.setContent('chooseCardTarget');
				next._args = Array.from(arguments);
				return next;
			}
			chooseControlList() {
				var list = [];
				var prompt = null;
				var forced = 'cancel2';
				var func = null;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'string') {
						if (!prompt) {
							prompt = arguments[i];
						}
						else {
							list.push(arguments[i]);
						}
					}
					else if (Array.isArray(arguments[i])) {
						list = arguments[i];
					}
					else if (arguments[i] === true) {
						forced = null;
					}
					else if (typeof arguments[i] == 'function') {
						func = arguments[i];
					}
				}
				return this.chooseControl(forced, func).set('choiceList', list).set('prompt', prompt);
			}
			chooseControl() {
				var next = game.createEvent('chooseControl');
				next.controls = [];
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'string') {
						if (arguments[i] == 'dialogcontrol') {
							next.dialogcontrol = true;
						}
						else if (arguments[i] == 'seperate') {
							next.seperate = true;
						}
						else {
							next.controls.push(arguments[i]);
						}
					}
					else if (Array.isArray(arguments[i])) {
						next.controls = next.controls.concat(arguments[i]);
					}
					else if (typeof arguments[i] == 'function') {
						next.ai = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.choice = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'dialog') {
						next.dialog = arguments[i];
					}
				}
				next.player = this;
				if (next.choice == undefined) next.choice = 0;
				next.setContent('chooseControl');
				next._args = Array.from(arguments);
				next.forceDie = true;
				return next;
			}
			chooseBool() {
				var next = game.createEvent('chooseBool');
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'boolean') {
						next.choice = arguments[i];
					}
					else if (typeof arguments[i] == 'function') {
						next.ai = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						get.evtprompt(next, arguments[i]);
					}
					else if (get.itemtype(arguments[i]) == 'dialog') {
						next.dialog = arguments[i];
					}
					if (next.choice == undefined) next.choice = true;
				}
				next.player = this;
				next.setContent('chooseBool');
				next._args = Array.from(arguments);
				next.forceDie = true;
				return next;
			}
			chooseDrawRecover() {
				var next = game.createEvent('chooseDrawRecover', false);
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'number') {
						if (typeof next.num1 == 'number') {
							next.num2 = arguments[i];
						}
						else {
							next.num1 = arguments[i];
						}
					}
					else if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						next.prompt = arguments[i];
					}
					else if (typeof arguments[i] == 'function') {
						next.ai = arguments[i];
					}
				}
				if (typeof next.num1 != 'number') {
					next.num1 = 1;
				}
				if (typeof next.num2 != 'number') {
					next.num2 = 1;
				}
				next.setContent('chooseDrawRecover');
				return next;
			}
			choosePlayerCard() {
				var next = game.createEvent('choosePlayerCard');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.target = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.selectButton = [arguments[i], arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectButton = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'position') {
						next.position = arguments[i];
					}
					else if (arguments[i] == 'visible') {
						next.visible = true;
					}
					else if (typeof arguments[i] == 'function') {
						if (next.ai) next.filterButton = arguments[i];
						else next.ai = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i]) {
						next.filterButton = get.filter(arguments[i]);
					}
					else if (typeof arguments[i] == 'string') {
						next.prompt = arguments[i];
					}
				}
				if (next.filterButton == undefined) next.filterButton = lib.filter.all;
				if (next.position == undefined) next.position = 'he';
				if (next.selectButton == undefined) next.selectButton = [1, 1];
				if (next.ai == undefined) next.ai = function (button) {
					var val = get.buttonValue(button);
					if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
					return val;
				};
				next.setContent('choosePlayerCard');
				next._args = Array.from(arguments);
				return next;
			}
			discardPlayerCard() {
				var next = game.createEvent('discardPlayerCard');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.target = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.selectButton = [arguments[i], arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectButton = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'position') {
						next.position = arguments[i];
					}
					else if (arguments[i] == 'visible') {
						next.visible = true;
					}
					else if (typeof arguments[i] == 'function') {
						if (next.ai) next.filterButton = arguments[i];
						else next.ai = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i]) {
						next.filterButton = get.filter(arguments[i]);
					}
					else if (typeof arguments[i] == 'string') {
						next.prompt = arguments[i];
					}
				}
				if (next.filterButton == undefined) next.filterButton = lib.filter.all;
				if (next.position == undefined) next.position = 'he';
				if (next.selectButton == undefined) next.selectButton = [1, 1];
				if (next.ai == undefined) next.ai = function (button) {
					var val = get.buttonValue(button);
					if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
					return val;
				};
				next.setContent('discardPlayerCard');
				next._args = Array.from(arguments);
				return next;
			}
			gainPlayerCard() {
				var next = game.createEvent('gainPlayerCard');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.target = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.selectButton = [arguments[i], arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectButton = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'position') {
						next.position = arguments[i];
					}
					else if (arguments[i] == 'visible') {
						next.visible = true;
					}
					else if (arguments[i] == 'visibleMove') {
						next.visibleMove = true;
					}
					else if (typeof arguments[i] == 'function') {
						if (next.ai) next.filterButton = arguments[i];
						else next.ai = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i]) {
						next.filterButton = get.filter(arguments[i]);
					}
					else if (typeof arguments[i] == 'string') {
						next.prompt = arguments[i];
					}
				}
				if (next.filterButton == undefined) next.filterButton = lib.filter.all;
				if (next.position == undefined) next.position = 'he';
				if (next.selectButton == undefined) next.selectButton = [1, 1];
				if (next.ai == undefined) next.ai = function (button) {
					var val = get.buttonValue(button);
					if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
					return val;
				};
				next.setContent('gainPlayerCard');
				next._args = Array.from(arguments);
				return next;
			}
			showHandcards(str) {
				var next = game.createEvent('showHandcards');
				next.player = this;
				if (typeof str == 'string') {
					next.prompt = str;
				}
				next.setContent('showHandcards');
				next._args = Array.from(arguments);
				return next;
			}
			showCards(cards, str) {
				var next = game.createEvent('showCards');
				next.player = this;
				next.str = str;
				if (typeof cards == 'string') {
					str = cards;
					cards = next.str;
					next.str = str;
				}
				if (get.itemtype(cards) == 'card') next.cards = [cards];
				else if (get.itemtype(cards) == 'cards') next.cards = cards.slice(0);
				else _status.event.next.remove(next);
				next.setContent('showCards');
				next._args = Array.from(arguments);
				return next;
			}
			viewCards(str, cards) {
				var next = game.createEvent('viewCards');
				next.player = this;
				next.str = str;
				next.cards = cards.slice(0);
				next.setContent('viewCards');
				next._args = Array.from(arguments);
				return next;
			}
			viewHandcards(target) {
				var cards = target.getCards('h');
				if (cards.length) {
					return this.viewCards(get.translation(target) + '的手牌', cards);
				}
				else {
					return false;
				}
			}
			canMoveCard(withatt, nojudge) {
				const player = this;
				const args = Array.from(arguments).slice(2);
				let sourceTargets, aimTargets, filterCard, canReplace;
				args.forEach(arg => {
					if (get.itemtype(arg) == 'players') {
						if (!sourceTargets) sourceTargets = arg;
						else if (!aimTargets) aimTargets = arg;
					}
					else if (get.itemtype(arg) == 'player') {
						if (!sourceTargets) sourceTargets = [arg];
						else if (!aimTargets) aimTargets = [arg];
					}
					else if (typeof arg == 'function') {
						filterCard = arg;
					}
					else if (typeof arg == 'object' && arg) {
						filterCard = get.filter(arg);
					}
					else if (arg == 'canReplace') {
						canReplace = true;
					}
				});
				if (!sourceTargets) sourceTargets = game.filterPlayer();
				if (!aimTargets) aimTargets = game.filterPlayer();
				return sourceTargets.some(current => {
					const att = get.sgn(get.attitude(player, current));
					if (!withatt || att != 0) {
						var es = current.getCards('e', filterCard);
						for (var i = 0; i < es.length; i++) {
							if (aimTargets.some(current2 => {
								if (withatt) {
									if (get.sgn(get.value(es[i], current)) != -att) return false;
									var att2 = get.sgn(get.attitude(player, current2));
									if (!canReplace || att < 0 && current2.countEquipableSlot(get.subtype(es[i]))) {
										if (att == att2 || att2 != get.sgn(get.effect(current2, es[i], player, current2))) return false;
									}
								}
								return current != current2 && !current2.isMin() && current2.canEquip(es[i], canReplace);
							})) {
								return true;
							}
						}
					}
					if (!nojudge && (!withatt || att > 0)) {
						var js = current.getCards('j', filterCard);
						for (var i = 0; i < js.length; i++) {
							if (game.hasPlayer(function (current2) {
								if (withatt) {
									var att2 = get.attitude(player, current2);
									if (att2 >= 0) return false;
								}
								return current != current2 && current2.canAddJudge(js[i]);
							})) {
								return true;
							}
						}
					}
				});
			}
			moveCard() {
				var next = game.createEvent('moveCard');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'players') {
						if (!next.sourceTargets) next.sourceTargets = arguments[i];
						else if (!next.aimTargets) next.aimTargets = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'player') {
						if (!next.sourceTargets) next.sourceTargets = [arguments[i]];
						else if (!next.aimTargets) next.aimTargets = [arguments[i]];
					}
					else if (typeof arguments[i] == 'string') {
						if (arguments[i] == 'canReplace') {
							next.canReplace = true;
						}
						else {
							get.evtprompt(next, arguments[i]);
						}
					}
					else if (Array.isArray(arguments[i])) {
						for (var j = 0; j < arguments[i].length; j++) {
							if (typeof arguments[i][j] != 'string') break;
						}
						if (j == arguments[i].length) {
							next.targetprompt = arguments[i];
						}
					}
					else if (typeof arguments[i] == 'function') {
						next.filter = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i]) {
						next.filter = get.filter(arguments[i]);
					}
				}
				if (!next.sourceTargets) next.sourceTargets = game.filterPlayer();
				if (!next.aimTargets) next.aimTargets = game.filterPlayer();
				if (next.filter == undefined) next.filter = lib.filter.all;
				next.setContent('moveCard');
				next._args = Array.from(arguments);
				return next;
			}
			useResult(result, event) {
				event = event || _status.event;
				if (result._sendskill) {
					lib.skill[result._sendskill[0]] = result._sendskill[1];
				}
				if (event.onresult) {
					event.onresult(result);
				}
				if (result.skill) {
					var info = get.info(result.skill);
					if (info.onuse) {
						info.onuse(result, this);
					}
					// if(info.direct&&!info.clearTime){
					// 	_status.noclearcountdown=true;
					// }
				}
				if (event.logSkill) {
					if (typeof event.logSkill == 'string') {
						this.logSkill(event.logSkill);
					}
					else if (Array.isArray(event.logSkill)) {
						this.logSkill.apply(this, event.logSkill);
					}
				}
				if (result.card || !result.skill) {
					result.used = result.card || result.cards[0];
					var next = this.useCard(result.used, result.cards, result.targets, result.skill);
					next.oncard = event.oncard;
					next.respondTo = event.respondTo;
					if (event.addCount === false) {
						next.addCount = false;
					}
					if (result._apply_args) {
						for (var i in result._apply_args) {
							next[i] = result._apply_args[i];
						}
					}
					return next;
				}
				else if (result.skill) {
					result.used = result.skill;
					return this.useSkill(result.skill, result.cards, result.targets);
				}
			}
			useCard() {
				var next = game.createEvent('useCard');
				next.player = this;
				next.num = 0;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'players') {
						next.targets = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'player') {
						next.targets = [arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.card = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
						next.card = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						if (arguments[i] == 'noai') {
							next.noai = true;
						}
						else if (arguments[i] == 'nowuxie') {
							next.nowuxie = true;
						}
						else {
							next.skill = arguments[i];
						}
					}
					else if (typeof arguments[i] == 'boolean') {
						next.addCount = arguments[i];
					}
				}
				if (next.cards == undefined) {
					if (get.itemtype(next.card) == 'card') {
						next.cards = [next.card];
					}
					else next.cards = [];
				}
				else if (next.card == undefined) {
					if (next.cards) {
						next.card = next.cards[0];
					}
				}
				if (!next.targets) {
					next.targets = [];
				}
				if (next.card) {
					next.card = get.autoViewAs(next.card, next.cards);
					var info = get.info(next.card);
					if (info.changeTarget) {
						info.changeTarget(next.player, next.targets);
					}
					if (info.singleCard) {
						next._targets = next.targets.slice(0);
						next.target = next.targets[0];
						next.addedTargets = next.targets.splice(1);
						if (next.addedTargets.length) {
							next.addedTarget = next.addedTargets[0];
						}
					}
				}
				for (var i = 0; i < next.targets.length; i++) {
					if (get.attitude(this, next.targets[i]) >= -1 && get.attitude(this, next.targets[i]) < 0) {
						if (!this.ai.tempIgnore) this.ai.tempIgnore = [];
						this.ai.tempIgnore.add(next.targets[i]);
					}
				}
				if (typeof this.logAi == 'function' && !next.noai && !get.info(next.card).noai) {
					var postAi = get.info(next.card).postAi;
					if (postAi && postAi(next.targets)) {
						next.postAi = true;
					}
					else {
						this.logAi(next.targets, next.card);
					}
				}
				next.stocktargets = next.targets.slice(0);
				next.setContent('useCard');
				return next;
			}
			useSkill() {
				var next = game.createEvent('useSkill');
				next.player = this;
				next.num = 0;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'players') {
						next.targets = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.card = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						next.skill = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.addCount = arguments[i];
					}
				}
				if (next.cards == undefined) {
					next.cards = [];
				}
				if (next.skill && get.info(next.skill) && get.info(next.skill).changeTarget) {
					get.info(next.skill).changeTarget(next.player, next.targets);
				}
				if (next.targets) {
					for (var i = 0; i < next.targets.length; i++) {
						if (get.attitude(this, next.targets[i]) >= -1 && get.attitude(this, next.targets[i]) < 0) {
							if (!this.ai.tempIgnore) this.ai.tempIgnore = [];
							this.ai.tempIgnore.add(next.targets[i]);
						}
					}
					if (typeof this.logAi == 'function') {
						this.logAi(next.targets, next.skill);
					}
				}
				else {
					next.targets = [];
				}
				next.setContent('useSkill');
				return next;
			}
			drawTo(num, args) {
				var num2 = num - this.countCards('h');
				if (!num2) return;
				var next = this.draw(num2);
				if (Array.isArray(args)) {
					for (var i = 0; i < args.length; i++) {
						if (get.itemtype(args[i]) == 'player') {
							next.source = args[i];
						}
						else if (typeof args[i] == 'boolean') {
							next.animate = args[i];
						}
						else if (args[i] == 'nodelay') {
							next.animate = false;
							next.$draw = true;
						}
						else if (args[i] == 'visible') {
							next.visible = true;
						}
						else if (args[i] == 'bottom') {
							next.bottom = true;
						}
						else if (typeof args[i] == 'object' && args[i] && args[i].drawDeck != undefined) {
							next.drawDeck = args[i].drawDeck;
						}
					}
				}
				return next;
			}
			draw() {
				var next = game.createEvent('draw');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.num = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.animate = arguments[i];
					}
					else if (arguments[i] == 'nodelay') {
						next.animate = false;
						next.$draw = true;
					}
					else if (arguments[i] == 'visible') {
						next.visible = true;
					}
					else if (arguments[i] == 'bottom') {
						next.bottom = true;
					}
					else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].drawDeck != undefined) {
						next.drawDeck = arguments[i].drawDeck;
					}
				}
				if (next.num == undefined) next.num = 1;
				if (next.num <= 0) _status.event.next.remove(next);
				next.setContent('draw');
				if (lib.config.mode == 'stone' && _status.mode == 'deck' &&
					next.drawDeck == undefined && !next.player.isMin() && next.num > 1) {
					next.drawDeck = 1;
				}
				next.result = [];
				return next;
			}
			randomDiscard() {
				var position = 'he', num = 1, delay = null;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'number') {
						num = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'position') {
						position = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						delay = arguments[i];
					}
				}
				var cards = this.getCards(position).randomGets(num);
				if (cards.length) {
					var next = this.discard(cards, 'notBySelf');
					if (typeof delay == 'boolean') {
						next.delay = delay;
					}
				}
				return cards;
			}
			randomGain() {
				var position = 'he', num = 1, target = null, line = false;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'number') {
						num = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'position') {
						position = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'player') {
						target = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						line = arguments[i];
					}
				}
				if (target) {
					var cards = target.getCards(position).randomGets(num);
					if (cards.length) {
						if (line) {
							this.line(target, 'green');
						}
						this.gain(cards, target, 'log', 'bySelf');
						target.$giveAuto(cards, this);
					}
					return cards;
				}
				return [];
			}
			discard() {
				var next = game.createEvent('discard');
				next.player = this;
				next.num = 0;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.cards = [arguments[i]];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.animate = arguments[i];
					}
					else if (['div', 'fragment'].includes(get.objtype(arguments[i]))) {
						next.position = arguments[i];
					}
					else if (arguments[i] == 'notBySelf') {
						next.notBySelf = true;
					}
				}
				if (next.cards == undefined) _status.event.next.remove(next);
				next.setContent('discard');
				return next;
			}
			loseToDiscardpile() {
				var next = game.createEvent('loseToDiscardpile');
				next.player = this;
				next.num = 0;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.cards = [arguments[i]];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.animate = arguments[i];
					}
					else if (['div', 'fragment'].includes(get.objtype(arguments[i]))) {
						next.position = arguments[i];
					}
					else if (arguments[i] == 'notBySelf') {
						next.notBySelf = true;
					}
					else if (arguments[i] == 'insert') {
						next.insert_card = true;
					}
					else if (arguments[i] == 'blank') {
						next.blank = true;
					}
				}
				if (next.cards == undefined) _status.event.next.remove(next);
				next.setContent('loseToDiscardpile');
				return next;
			}
			respond() {
				var next = game.createEvent('respond');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.card = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
						next.card = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') next.animate = arguments[i];
					else if (arguments[i] == 'highlight') next.highlight = true;
					else if (arguments[i] == 'noOrdering') next.noOrdering = true;
					else if (typeof arguments[i] == 'string') next.skill = arguments[i];
				}
				if (next.cards == undefined) {
					if (get.itemtype(next.card) == 'card') {
						next.cards = [next.card];
					}
					else {
						next.cards = [];
					}
				}
				else if (next.card == undefined) {
					if (next.cards) {
						next.card = next.cards[0];
						if (!next.skill) {
							next.card = get.autoViewAs(next.card, next.cards);
						}
					}
				}
				next.setContent('respond');
				return next;
			}
			swapHandcards(target, cards1, cards2) {
				var next = game.createEvent('swapHandcards', false);
				next.player = this;
				next.target = target;
				if (cards1) next.cards1 = cards1;
				if (cards2) next.cards2 = cards2;
				next.setContent('swapHandcards');
				return next;
			}
			directequip(cards) {
				for (var i = 0; i < cards.length; i++) {
					this.$equip(cards[i]);
				}
				if (!_status.video) {
					game.addVideo('directequip', this, get.cardsInfo(cards));
				}
			}
			$addToExpansion(cards, broadcast, gaintag) {
				var hs = this.getCards('x');
				for (var i = 0; i < cards.length; i++) {
					if (hs.contains(cards[i])) {
						cards.splice(i--, 1);
					}
				}
				for (var i = 0; i < cards.length; i++) {
					cards[i].fix();
					if (gaintag) cards[i].addGaintag(gaintag);
					var sort = lib.config.sort_card(cards[i]);
					this.node.expansions.insertBefore(cards[i], this.node.expansions.firstChild);
				}
				if (broadcast !== false) game.broadcast(function (player, cards, gaintag) {
					player.$addToExpansion(cards, null, gaintag);
				}, this, cards, gaintag);
				return this;
			}
			directgain(cards, broadcast, gaintag) {
				var hs = this.getCards('hs');
				for (var i = 0; i < cards.length; i++) {
					if (hs.contains(cards[i])) {
						cards.splice(i--, 1);
					}
				}
				for (var i = 0; i < cards.length; i++) {
					cards[i].fix();
					if (gaintag) cards[i].addGaintag(gaintag);
					var sort = lib.config.sort_card(cards[i]);
					if (this == game.me) {
						cards[i].classList.add('drawinghidden');
					}
					if (get.is.singleHandcard() || sort > 0) {
						this.node.handcards1.insertBefore(cards[i], this.node.handcards1.firstChild);
					}
					else {
						this.node.handcards2.insertBefore(cards[i], this.node.handcards2.firstChild);
					}
				}
				if (this == game.me || _status.video) ui.updatehl();
				if (!_status.video) {
					game.addVideo('directgain', this, get.cardsInfo(cards));
					this.update();
				}
				if (broadcast !== false) game.broadcast(function (player, cards) {
					player.directgain(cards);
				}, this, cards);
				return this;
			}
			directgains(cards, broadcast, gaintag) {
				var hs = this.getCards('hs');
				for (var i = 0; i < cards.length; i++) {
					if (hs.contains(cards[i])) {
						cards.splice(i--, 1);
					}
				}
				var addLast = function (card, node) {
					if (gaintag) {
						for (var i = 0; i < node.childNodes.length; i++) {
							var add = node.childNodes[node.childNodes.length - i - 1];
							if (!add.classList.contains('glows')) break;
							if (add.hasGaintag(gaintag)) {
								node.insertBefore(card, add.nextSibling);
								return;
							}
						}
					}
					node.appendChild(card);
				};
				for (var i = 0; i < cards.length; i++) {
					cards[i].fix();
					cards[i].remove();
					if (gaintag) cards[i].addGaintag(gaintag);
					cards[i].classList.add('glows');
					if (this == game.me) {
						cards[i].classList.add('drawinghidden');
					}
					if (get.is.singleHandcard()) {
						addLast(cards[i], this.node.handcards1);
					}
					else {
						addLast(cards[i], this.node.handcards2);
					}
				}
				if (this == game.me || _status.video) ui.updatehl();
				if (!_status.video) {
					game.addVideo('directgains', this, get.cardsInfo(cards));
					this.update();
				}
				if (broadcast !== false) game.broadcast(function (player, cards, gaintag) {
					player.directgains(cards, null, gaintag);
				}, this, cards, gaintag);
				return this;
			}
			gainMultiple(targets, position) {
				var next = game.createEvent('gainMultiple', false);
				next.setContent('gainMultiple');
				next.player = this;
				next.targets = targets;
				next.position = position || 'h';
				return next;
			}
			gain() {
				var next = game.createEvent('gain');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.cards = [arguments[i]];
					}
					else if (arguments[i] === 'log') {
						next.log = true;
					}
					else if (arguments[i] == 'fromStorage') {
						next.fromStorage = true;
					}
					else if (arguments[i] == 'fromRenku') {
						next.fromStorage = true;
						next.fromRenku = true;
					}
					else if (arguments[i] == 'bySelf') {
						next.bySelf = true;
					}
					else if (typeof arguments[i] == 'string') {
						next.animate = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.delay = arguments[i];
					}
				}
				if (next.animate == 'gain2' || next.animate == 'draw2') {
					if (!('log' in next)) {
						next.log = true;
					}
				}
				next.setContent('gain');
				next.getd = function (player, key, position) {
					if (!position) position = ui.discardPile;
					if (!key) key = 'cards';
					var cards = [], event = this;
					game.checkGlobalHistory('cardMove', function (evt) {
						if (evt.name != 'lose' || evt.position != position || evt.getParent() != event) return;
						if (player && player != evt.player) return;
						cards.addArray(evt[key]);
					});
					return cards;
				};
				next.getl = function (player) {
					const that = this;
					const map = {
						player: player,
						hs: [],
						es: [],
						js: [],
						ss: [],
						xs: [],
						cards: [],
						cards2: [],
						gaintag_map: {},
					};
					player.checkHistory('lose', function (evt) {
						if (evt.parent == that) {
							map.hs.addArray(evt.hs);
							map.es.addArray(evt.es);
							map.js.addArray(evt.js);
							map.ss.addArray(evt.ss);
							map.xs.addArray(evt.xs);
							map.cards.addArray(evt.cards);
							map.cards2.addArray(evt.cards2);
							for (let key in evt.gaintag_map) {
								if (!map.gaintag_map[key]) map.gaintag_map[key] = [];
								map.gaintag_map[key].addArray(evt.gaintag_map[key]);
							}
						}
					});
					return map;
				};
				next.getg = function (player) {
					if (this.getlx === false || player != this.player || !this.cards) return [];
					return this.cards.slice(0);
				};
				next.gaintag = [];
				return next;
			}
			addToExpansion() {
				var next = game.createEvent('addToExpansion');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.cards = [arguments[i]];
					}
					else if (arguments[i] === 'log') {
						next.log = true;
					}
					else if (arguments[i] == 'fromStorage') {
						next.fromStorage = true;
					}
					else if (arguments[i] == 'fromRenku') {
						next.fromStorage = true;
						next.fromRenku = true;
					}
					else if (arguments[i] == 'bySelf') {
						next.bySelf = true;
					}
					else if (typeof arguments[i] == 'string') {
						next.animate = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.delay = arguments[i];
					}
				}
				if (next.animate == 'gain2' || next.animate == 'draw2' || next.animate == 'give') {
					if (!('log' in next)) {
						next.log = true;
					}
				}
				next.setContent('addToExpansion');
				next.getd = function (player, key, position) {
					if (!position) position = ui.discardPile;
					if (!key) key = 'cards';
					var cards = [], event = this;
					game.checkGlobalHistory('cardMove', function (evt) {
						if (evt.name != 'lose' || evt.position != position || evt.getParent() != event) return;
						if (player && player != evt.player) return;
						cards.addArray(evt[key]);
					});
					return cards;
				};
				next.getl = function (player) {
					const that = this;
					const map = {
						player: player,
						hs: [],
						es: [],
						js: [],
						ss: [],
						xs: [],
						cards: [],
						cards2: [],
						gaintag_map: {},
					};
					player.checkHistory('lose', function (evt) {
						if (evt.parent == that) {
							map.hs.addArray(evt.hs);
							map.es.addArray(evt.es);
							map.js.addArray(evt.js);
							map.ss.addArray(evt.ss);
							map.xs.addArray(evt.xs);
							map.cards.addArray(evt.cards);
							map.cards2.addArray(evt.cards2);
							for (let key in evt.gaintag_map) {
								if (!map.gaintag_map[key]) map.gaintag_map[key] = [];
								map.gaintag_map[key].addArray(evt.gaintag_map[key]);
							}
						}
					});
					return map;
				};
				next.gaintag = [];
				return next;
			}
			give(cards, target, visible) {
				var next = target.gain(cards, this);
				next.animate = visible ? 'give' : 'giveAuto';
				next.giver = this;
				return next;
			}
			lose() {
				var next = game.createEvent('lose');
				next.player = this;
				next.forceDie = true;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.cards = [arguments[i]];
					}
					else if (['div', 'fragment'].includes(get.objtype(arguments[i]))) {
						next.position = arguments[i];
					}
					else if (arguments[i] == 'toStorage') {
						next.toStorage = true;
					}
					else if (arguments[i] == 'toRenku') {
						next.toStorage = true;
						next.toRenku = true;
					}
					else if (arguments[i] == 'visible') {
						next.visible = true;
					}
					else if (arguments[i] == 'insert') {
						next.insert_card = true;
					}
				}
				if (next.cards) {
					var hej = this.getCards('hejsx');
					for (var i = 0; i < next.cards.length; i++) {
						if (!hej.contains(next.cards[i])) {
							next.cards.splice(i--, 1);
						}
					}
				}
				if (!next.cards || !next.cards.length) {
					_status.event.next.remove(next);
				}
				else {
					if (next.position == undefined) next.position = ui.discardPile;
					next.cards = next.cards.slice(0);
				}
				next.setContent('lose');
				next.getd = function (player, key, position) {
					if (!position) position = ui.discardPile;
					if (!key) key = 'cards';
					if (this.getlx === false || this.position != position || (player && this.player != player) || !Array.isArray(this[key])) return [];
					return this[key].slice(0);
				};
				next.getl = function (player) {
					if (this.getlx !== false && this.player == player) return this;
					return {
						player: player,
						hs: [],
						es: [],
						js: [],
						ss: [],
						xs: [],
						cards: [],
						cards2: [],
						gaintag_map: {},
					};
				};
				return next;
			}
			damage() {
				const next = game.createEvent('damage');
				//next.forceDie=true;
				next.player = this;
				let noCard, noSource;
				const event = _status.event;
				for (const argument of arguments) {
					if (get.itemtype(argument) == 'cards') next.cards = argument.slice();
					else if (get.itemtype(argument) == 'card') next.card = argument;
					else if (typeof argument == 'number') next.num = argument;
					else if (get.itemtype(argument) == 'player') next.source = argument;
					else if (argument && typeof argument == 'object' && argument.name) next.card = argument;
					else if (argument == 'nocard') noCard = true;
					else if (argument == 'nosource') noSource = true;
					else if (argument == 'notrigger') {
						next._triggered = null;
						next.notrigger = true;
					}
					else if (argument == 'unreal') next.unreal = true;
					else if (get.itemtype(argument) == 'nature' && argument != 'stab') next.nature = argument;
					else if (get.itemtype(argument) == 'natures') {
						const natures = argument.split(lib.natureSeparator).remove('stab');
						if (natures.length) next.nature = natures.join(lib.natureSeparator);
					}
				}
				if (!next.card && !noCard) next.card = event.card;
				if (!next.cards && !noCard) next.cards = event.cards;
				if (!next.source && !noSource) {
					const source = event.customSource || event.player;
					if (source && !source.isDead()) next.source = source;
				}
				if (typeof next.num != 'number') next.num = (event.baseDamage || 1) + (event.extraDamage || 0);
				next.original_num = next.num;
				next.change_history = [];
				next.hasNature = function (nature) {
					if (!nature) return Boolean(this.nature && this.nature.length > 0);
					let natures = get.natureList(nature), naturesx = get.natureList(this.nature);
					if (nature == 'linked') return naturesx.some(n => lib.linked.includes(n));
					return get.is.sameNature(natures, naturesx);
				};
				if (next.hasNature('poison')) delete next._triggered;
				next.setContent('damage');
				next.filterStop = function () {
					if (this.source && this.source.isDead()) delete this.source;
					var num = this.original_num;
					for (var i of this.change_history) num += i;
					if (num != this.num) this.change_history.push(this.num - num);
					if (this.num <= 0) {
						delete this.filterStop;
						this.trigger('damageZero');
						this.finish();
						this._triggered = null;
						return true;
					}
				};
				return next;
			}
			recover() {
				var next = game.createEvent('recover');
				next.player = this;
				var nocard, nosource;
				var event = _status.event;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'cards') {
						next.cards = arguments[i].slice(0);
					}
					else if (get.itemtype(arguments[i]) == 'card') {
						next.card = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'player') {
						next.source = arguments[i];
					}
					else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
						next.card = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.num = arguments[i];
					}
					else if (arguments[i] == 'nocard') {
						nocard = true;
					}
					else if (arguments[i] == 'nosource') {
						nosource = true;
					}
				}
				if (next.card == undefined && !nocard) next.card = event.card;
				if (next.cards == undefined && !nocard) next.cards = event.cards;
				if (next.source == undefined && !nosource) next.source = event.customSource || event.player;
				if (next.num == undefined) next.num = (event.baseDamage || 1) + (event.extraDamage || 0);
				if (next.num <= 0) _status.event.next.remove(next);
				next.setContent('recover');
				return next;
			}
			doubleDraw() {
				if (get.is.changban()) return;
				var next = game.createEvent('doubleDraw');
				next.player = this;
				next.setContent('doubleDraw');
				return next;
			}
			loseHp(num) {
				var next = game.createEvent('loseHp');
				next.num = num;
				next.player = this;
				if (next.num == undefined) next.num = 1;
				next.setContent('loseHp');
				return next;
			}
			loseMaxHp() {
				var next = game.createEvent('loseMaxHp');
				next.player = this;
				next.num = 1;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] === 'number') {
						next.num = arguments[i];
					}
					else if (typeof arguments[i] === 'boolean') {
						next.forced = arguments[i];
					}
				}
				next.setContent('loseMaxHp');
				return next;
			}
			gainMaxHp() {
				var next = game.createEvent('gainMaxHp');
				next.player = this;
				next.num = 1;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] === 'number') {
						next.num = arguments[i];
					}
					else if (typeof arguments[i] === 'boolean') {
						next.forced = arguments[i];
					}
				}
				next.setContent('gainMaxHp');
				return next;
			}
			changeHp(num, popup) {
				var next = game.createEvent('changeHp');
				next.num = num;
				if (popup != undefined) next.popup = popup;
				next.player = this;
				next.setContent('changeHp');
				return next;
			}

			changeHujia(num, type, limit) {
				var next = game.createEvent('changeHujia');
				if (typeof num != 'number') {
					num = 1;
				}
				if (limit === true) limit = 5;
				if (typeof limit == 'number' && this.hujia + num > parseInt(limit)) {
					num = Math.max(0, parseInt(limit) - this.hujia);
				}
				if (typeof type != 'string') {
					if (num > 0) type = 'gain';
					else if (num < 0) type = 'lose';
					else type = 'null';
				}
				next.num = num;
				next.player = this;
				next.type = type;
				next.setContent('changeHujia');
				return next;
			}
			getBuff() {
				var list = [1, 2, 3, 4, 5, 6];
				var nodelay = false;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'number') {
						list.remove(arguments[i]);
					}
					else if (arguments[i] === false) {
						nodelay = true;
					}
				}
				if (this.isHealthy()) {
					list.remove(2);
				}
				if (!this.countCards('j')) {
					list.remove(5);
				}
				if (!this.isLinked() && !this.isTurnedOver()) {
					list.remove(6);
				}
				if (this.hasSkill('qianxing')) {
					list.remove(4);
				}
				switch (list.randomGet()) {
					case 1: this.draw(nodelay ? 'nodelay' : 1); break;
					case 2: this.recover(); break;
					case 3: this.changeHujia(); break;
					case 4: this.tempHide(); break;
					case 5: this.discard(this.getCards('j')).delay = (!nodelay); break;
					case 6: {
						if (this.isLinked()) this.link();
						if (this.isTurnedOver()) this.turnOver();
						break;
					}
				}
				return this;
			}
			getDebuff() {
				var list = [1, 2, 3, 4, 5, 6];
				var nodelay = false;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'number') {
						list.remove(arguments[i]);
					}
					else if (arguments[i] === false) {
						nodelay = true;
					}
				}
				if (this.countCards('he') == 0) {
					list.remove(1);
				}
				if (this.isLinked()) {
					list.remove(4);
				}
				if (this.hasSkill('fengyin')) {
					list.remove(5);
				}
				if (this.hp == 1) {
					list.remove(3);
					if (list.length > 1) list.remove(2);
				}
				if (!list.length) return this;
				var num = list.randomGet();
				switch (list.randomGet()) {
					case 1: this.randomDiscard(nodelay ? false : 'he'); break;
					case 2: this.loseHp(); break;
					case 3: this.damage(); break;
					case 4: if (!this.isLinked()) this.link(); break;
					case 5: this.addTempSkill('fengyin', { player: 'phaseAfter' }); break;
					case 6: {
						var list = [];
						for (var i = 0; i < lib.inpile.length; i++) {
							var info = lib.card[lib.inpile[i]];
							if (info.type == 'delay' && !info.cancel && !this.hasJudge(lib.inpile[i])) {
								list.push(lib.inpile[i]);
							}
						}
						if (list.length) {
							var card = game.createCard(list.randomGet());
							this.addJudge(card);
							this.$draw(card);
							if (!nodelay) game.delay();
						}
						else {
							this.getDebuff(6);
						}
						break;
					}
				}
				return this;
			}
			dying(reason) {
				if (this.nodying || this.hp > 0 || this.isDying()) return;
				var next = game.createEvent('dying');
				next.player = this;
				next.reason = reason;
				if (reason && reason.source) next.source = reason.source;
				next.setContent('dying');
				next.filterStop = function () {
					if (this.player.hp > 0 || this.nodying) {
						delete this.filterStop;
						return true;
					}
				};
				return next;
			}
			die(reason) {
				var next = game.createEvent('die');
				next.player = this;
				next.reason = reason;
				if (reason) next.source = reason.source;
				next.setContent('die');
				return next;
			}
			revive(hp, log) {
				if (log !== false) game.log(this, '复活');
				if (this.maxHp < 1) this.maxHp = 1;
				if (hp) this.hp = hp;
				else {
					this.hp = 1;
				}
				game.addVideo('revive', this);
				this.classList.remove('dead');
				this.removeAttribute('style');
				this.node.avatar.style.transform = '';
				this.node.avatar2.style.transform = '';
				this.node.hp.show();
				this.node.equips.show();
				this.node.count.show();
				this.update();
				var player;
				player = this.previousSeat;
				while (player.isDead()) player = player.previousSeat;
				player.next = this;
				this.previous = player;
				player = this.nextSeat;
				while (player.isDead()) player = player.nextSeat;
				player.previous = this;
				this.next = player;
				game.players.add(this);
				game.dead.remove(this);
				if (this == game.me) {
					if (ui.auto) ui.auto.show();
					if (ui.wuxie) ui.wuxie.show();
					if (ui.revive) {
						ui.revive.close();
						delete ui.revive;
					}
					if (ui.exit) {
						ui.exit.close();
						delete ui.exit;
					}
					if (ui.swap) {
						ui.swap.close();
						delete ui.swap;
					}
					if (ui.restart) {
						ui.restart.close();
						delete ui.restart;
					}
					if (ui.continue_game) {
						ui.continue_game.close();
						delete ui.continue_game;
					}
				}
			}
			isMad() {
				return this.hasSkill('mad');
			}
			goMad(end) {
				if (end) {
					this.addTempSkill('mad', end);
				}
				else {
					this.addSkill('mad');
				}
				game.log(this, '进入混乱状态');
			}
			unMad() {
				this.removeSkill('mad');
			}
			tempHide() {
				this.addTempSkill('qianxing', { player: 'phaseBeginStart' });
			}
			addExpose(num) {
				if (typeof this.ai.shown == 'number' && !this.identityShown && this.ai.shown < 1) {
					this.ai.shown += num;
					if (this.ai.shown > 0.95) {
						this.ai.shown = 0.95;
					}
				}
				return this;
			}
			equip(card, draw) {
				var next = game.createEvent('equip');
				next.card = card;
				next.player = this;
				if (draw) {
					next.draw = true;
				}
				next.setContent(lib.element.content.equip);
				if (get.is.object(next.card) && next.card.cards) next.card = next.card.cards[0];
				next.cards = [next.card];
				next.getd = function (player, key, position) {
					if (!position) position = ui.discardPile;
					if (!key) key = 'cards';
					var cards = [], event = this;
					game.checkGlobalHistory('cardMove', function (evt) {
						if (evt.name != 'lose' || evt.position != position || evt.getParent() != event) return;
						if (player && player != evt.player) return;
						cards.addArray(evt[key]);
					});
					return cards;
				};
				next.getl = function (player) {
					const that = this;
					const map = {
						player: player,
						hs: [],
						es: [],
						js: [],
						ss: [],
						xs: [],
						cards: [],
						cards2: [],
						gaintag_map: {},
					};
					player.checkHistory('lose', function (evt) {
						if (evt.parent == that) {
							map.hs.addArray(evt.hs);
							map.es.addArray(evt.es);
							map.js.addArray(evt.js);
							map.ss.addArray(evt.ss);
							map.xs.addArray(evt.xs);
							map.cards.addArray(evt.cards);
							map.cards2.addArray(evt.cards2);
							for (let key in evt.gaintag_map) {
								if (!map.gaintag_map[key]) map.gaintag_map[key] = [];
								map.gaintag_map[key].addArray(evt.gaintag_map[key]);
							}
						}
					});
					return map;
				};
				return next;
			}
			addJudge(card, cards) {
				var next = game.createEvent('addJudge');
				if (get.itemtype(card) == 'card') {
					next.card = card;
					next.cards = [card];
				}
				else {
					next.cards = cards;
					if (get.itemtype(next.cards) == 'card') next.cards = [next.cards];
					if (typeof card == 'string') {
						card = { name: card };
					}
					next.card = get.autoViewAs(card, next.cards);
				}
				next.player = this;
				next.setContent('addJudge');
				next.getd = function (player, key, position) {
					if (!position) position = ui.discardPile;
					if (!key) key = 'cards';
					var cards = [], event = this;
					game.checkGlobalHistory('cardMove', function (evt) {
						if (evt.name != 'lose' || evt.position != position || evt.getParent() != event) return;
						if (player && player != evt.player) return;
						cards.addArray(evt[key]);
					});
					return cards;
				};
				next.getl = function (player) {
					const that = this;
					const map = {
						player: player,
						hs: [],
						es: [],
						js: [],
						ss: [],
						xs: [],
						cards: [],
						cards2: [],
						gaintag_map: {},
					};
					player.checkHistory('lose', function (evt) {
						if (evt.parent == that) {
							map.hs.addArray(evt.hs);
							map.es.addArray(evt.es);
							map.js.addArray(evt.js);
							map.ss.addArray(evt.ss);
							map.xs.addArray(evt.xs);
							map.cards.addArray(evt.cards);
							map.cards2.addArray(evt.cards2);
							for (let key in evt.gaintag_map) {
								if (!map.gaintag_map[key]) map.gaintag_map[key] = [];
								map.gaintag_map[key].addArray(evt.gaintag_map[key]);
							}
						}
					});
					return map;
				};
				return next;
			}
			canAddJudge(card) {
				if (this.isDisabledJudge()) return false;
				var name;
				if (typeof card == 'string') {
					name = card;
				}
				else {
					name = card.viewAs || card.name;
				}
				if (!name) return false;
				if (this.hasJudge(name)) return false;
				if (this.isOut()) return false;
				var mod = game.checkMod(card, this, this, 'unchanged', 'targetEnabled', this);
				if (mod != 'unchanged') return mod;
				return true;
			}
			addJudgeNext(card, unlimited) {
				if (!card.expired) {
					let target = this.next;
					const name = card.viewAs || card.name;
					const cards = (get.itemtype(card) == 'card') ? [card] : card.cards;
					if (get.itemtype(cards) != 'cards') return;
					let bool = false;
					if (!unlimited && cards.some(card => {
						const position = get.position(card, true);
						return position != 'j' && position != 'o';
					})) {
						game.log(card, '已被移出处理区，无法置入判定区');
						return;
					}
					for (let iwhile = 0; iwhile < 20; iwhile++) {
						if (target.canAddJudge(card)) {
							bool = true; break;
						}
						target = target.next;
					}
					if (bool) {
						if (card.cards && card.cards.length) {
							target.addJudge(name, card.cards[0]);
						}
						else if (card.name != name) {
							target.addJudge(name, card);
						}
						else {
							target.addJudge(card);
						}
					}
				}
				else {
					card.expired = false;
				}
			}
			judge() {
				var next = game.createEvent('judge');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (get.itemtype(arguments[i]) == 'card') {
						next.card = arguments[i];
					}
					else if (typeof arguments[i] == 'string') {
						next.skill = arguments[i];
					}
					else if (typeof arguments[i] == 'function') {
						next.judge = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.clearArena = arguments[i];
					}
					else if (['div', 'fragment'].includes(get.objtype(arguments[i]))) {
						next.position = arguments[i];
					}
				}
				if (next.card && next.judge == undefined) {
					next.judge = get.judge(next.card);
					next.judge2 = get.judge2(next.card);
				}
				if (next.judge == undefined) next.judge = function () { return 0; };
				if (next.position == undefined) next.position = ui.discardPile;
				if (next.card) next.cardname = next.card.viewAs || next.card.name;

				var str = '';
				if (next.card) str = get.translation(next.card.viewAs || next.card.name);
				else if (next.skill) str = get.translation(next.skill);
				else str = get.translation(_status.event.name);
				next.judgestr = str;
				next.setContent('judge');
				return next;
			}
			turnOver(bool) {
				if (typeof bool == 'boolean') {
					if (bool) {
						if (this.isTurnedOver()) return;
					}
					else {
						if (!this.isTurnedOver()) return;
					}
				}
				var next = game.createEvent('turnOver');
				next.player = this;
				next.includeOut = true;
				next.setContent('turnOver');
				return next;
			}
			out(skill) {
				if (typeof skill == 'number') {
					this.outCount += skill;
				}
				else if (typeof skill == 'string') {
					if (!this.outSkills) {
						this.outSkills = [];
					}
					this.outSkills.add(skill);
				}
				else {
					this.outCount++;
				}
				if (!this.classList.contains('out')) {
					this.classList.add('out');
					game.log(this, '离开游戏');
				}
				if (!game.countPlayer()) {
					game.over();
				}
			}
			in(skill) {
				if (this.isOut()) {
					if (typeof skill == 'string') {
						if (this.outSkills) {
							this.outSkills.remove(skill);
							if (!this.outSkills.length) {
								delete this.outSkills;
							}
						}
					}
					else if (typeof skill == 'number') {
						this.outCount -= skill;
					}
					else {
						if (skill === true) {
							delete this.outSkills;
						}
						this.outCount = 0;
					}
					if (this.outCount <= 0 && !this.outSkills) {
						this.outCount = 0;
						this.classList.remove('out');
						game.log(this, '进入游戏');
					}
				}
			}
			link(bool) {
				if (typeof bool == 'boolean') {
					if (bool) {
						if (this.isLinked()) return;
					}
					else {
						if (!this.isLinked()) return;
					}
				}
				var next = game.createEvent('link');
				next.player = this;
				next.setContent('link');
				return next;
			}
			skip(name) {
				this.skipList.add(name);
			}
			wait(callback) {
				if (lib.node) {
					if (typeof callback == 'function') {
						callback._noname_waiting = true;
						lib.node.torespond[this.playerid] = callback;
					}
					else {
						lib.node.torespond[this.playerid] = '_noname_waiting';
					}
					clearTimeout(lib.node.torespondtimeout[this.playerid]);
					if (this.ws && !this.ws.closed) {
						var player = this;
						var time = parseInt(lib.configOL.choose_timeout) * 1000;
						if (_status.event._global_timer || _status.event.getParent().skillHidden) {
							for (var i = 0; i < game.players.length; i++) {
								game.players[i].showTimer(time);
							}
							player._hide_all_timer = true;
						}
						else if (!_status.event._global_waiting && _status.noclearcountdown !== 'direct') {
							player.showTimer(time);
						}
						lib.node.torespondtimeout[this.playerid] = setTimeout(function () {
							player.unwait('ai');
							player.ws.ws.close();
						}, time + 5000);
					}
				}
			}
			unwait(result) {
				if (this._hide_all_timer) {
					delete this._hide_all_timer;
					for (var i = 0; i < game.players.length; i++) {
						game.players[i].hideTimer();
					}
				}
				else if (!get.event('_global_waiting') && (_status.noclearcountdown !== 'direct' || result && result.bool) && !(result && result._noHidingTimer)) {
					this.hideTimer();
				}
				clearTimeout(lib.node.torespondtimeout[this.playerid]);
				delete lib.node.torespondtimeout[this.playerid];
				if (!(this.playerid in lib.node.torespond)) return;
				var noresume = false;
				var proceed = null;
				if (typeof lib.node.torespond[this.playerid] == 'function' && lib.node.torespond[this.playerid]._noname_waiting) {
					proceed = lib.node.torespond[this.playerid](result, this);
					if (proceed === false) {
						noresume = true;
					}
				}
				lib.node.torespond[this.playerid] = result;
				for (var i in lib.node.torespond) {
					if (lib.node.torespond[i] == '_noname_waiting') {
						return;
					}
					else if (lib.node.torespond[i] && lib.node.torespond[i]._noname_waiting) {
						return;
					}
				}
				_status.event.result = result;
				_status.event.resultOL = lib.node.torespond;
				lib.node.torespond = {};
				if (typeof proceed == 'function') proceed();
				else if (_status.paused && !noresume) game.resume();
			}
			tempUnwait(result) {
				if (!(this.playerid in lib.node.torespond)) return;
				var proceed;
				if (typeof lib.node.torespond[this.playerid] == 'function' && lib.node.torespond[this.playerid]._noname_waiting) {
					proceed = lib.node.torespond[this.playerid](result, this);
				}
				if (typeof proceed == 'function') proceed();
			}
			logSkill(name, targets, nature, logv) {
				if (get.itemtype(targets) == 'player') targets = [targets];
				var nopop = false;
				var popname = name;
				if (Array.isArray(name)) {
					popname = name[1];
					name = name[0];
				}
				var checkShow = this.checkShow(name);
				if (lib.translate[name]) {
					this.trySkillAnimate(name, popname, checkShow);
					if (Array.isArray(targets) && targets.length) {
						var str;
						if (targets[0] == this) {
							str = '#b自己';
							if (targets.length > 1) {
								str += '、';
								str += get.translation(targets.slice(1));
							}
						}
						else str = targets;
						game.log(this, '对', str, '发动了', '【' + get.skillTranslation(name, this) + '】');
					}
					else {
						game.log(this, '发动了', '【' + get.skillTranslation(name, this) + '】');
					}
				}
				if (nature != false) {
					if (nature === undefined) {
						nature = 'green';
					}
					this.line(targets, nature);
				}
				var info = lib.skill[name];
				if (info && info.ai && info.ai.expose != undefined &&
					this.logAi && (!targets || targets.length != 1 || targets[0] != this)) {
					this.logAi(lib.skill[name].ai.expose);
				}
				if (info && info.round) {
					var roundname = name + '_roundcount';
					this.storage[roundname] = game.roundNumber;
					this.syncStorage(roundname);
					this.markSkill(roundname);
				}
				game.trySkillAudio(name, this, true);
				if (game.chess) {
					this.chessFocus();
				}
				if (logv === true) {
					game.logv(this, name, targets, null, true);
				}
				else if (info && info.logv !== false) {
					game.logv(this, name, targets);
				}
				if (info) {
					var player = this;
					var players = player.getSkills(false, false, false);
					var equips = player.getSkills('e');
					var global = lib.skill.global.slice(0);
					var logInfo = {
						skill: name,
						targets: targets,
						event: _status.event,
					};
					if (info.sourceSkill) {
						logInfo.sourceSkill = info.sourceSkill;
						if (global.contains(info.sourceSkill)) {
							logInfo.type = 'global';
						}
						else if (players.contains(info.sourceSkill)) {
							logInfo.type = 'player';
						}
						else if (equips.contains(info.sourceSkill)) {
							logInfo.type = 'equip';
						}
					}
					else {
						if (global.contains(name)) {
							logInfo.sourceSkill = name;
							logInfo.type = 'global';
						}
						else if (players.contains(name)) {
							logInfo.sourceSkill = name;
							logInfo.type = 'player';
						}
						else if (equips.contains(name)) {
							logInfo.sourceSkill = name;
							logInfo.type = 'equip';
						}
						else {
							var bool = false;
							for (var i of players) {
								var expand = [i];
								game.expandSkills(expand);
								if (expand.contains(name)) {
									bool = true;
									logInfo.sourceSkill = i;
									logInfo.type = 'player';
									break;
								}
							}
							if (!bool) {
								for (var i of players) {
									var expand = [i];
									game.expandSkills(expand);
									if (expand.contains(name)) {
										logInfo.sourceSkill = i;
										logInfo.type = 'equip';
										break;
									}
								}
							}
						}
					}
					var next = game.createEvent('logSkill', false), evt = _status.event;
					next.player = player;
					next.forceDie = true;
					next.includeOut = true;
					evt.next.remove(next);
					if (evt.logSkill) evt = evt.getParent();
					for (var i in logInfo) {
						if (i == 'event') next.log_event = logInfo[i];
						else next[i] = logInfo[i];
					}
					evt.after.push(next);
					next.setContent('emptyEvent');
					player.getHistory('useSkill').push(logInfo);
					//尽可能别往这写插入结算
					//不能用来终止技能发动！！！
					var next2 = game.createEvent('logSkillBegin', false);
					next2.player = player;
					next2.forceDie = true;
					next2.includeOut = true;
					for (var i in logInfo) {
						if (i == 'event') next2.log_event = logInfo[i];
						else next2[i] = logInfo[i];
					}
					next2.setContent('emptyEvent');
				}
				if (this._hookTrigger) {
					for (var i = 0; i < this._hookTrigger.length; i++) {
						var info = lib.skill[this._hookTrigger[i]].hookTrigger;
						if (info && info.log) {
							info.log(this, name, targets);
						}
					}
				}
			}
			unprompt() {
				if (this.node.prompt) {
					this.node.prompt.delete();
					delete this.node.prompt;
				}
			}
			prompt(str, nature) {
				var node;
				if (this.node.prompt) {
					node = this.node.prompt;
					node.innerHTML = '';
					node.className = 'damage normal-font damageadded';
				}
				else {
					node = ui.create.div('.damage.normal-font', this);
					this.node.prompt = node;
					ui.refresh(node);
					node.classList.add('damageadded');
				}
				node.innerHTML = str;
				node.dataset.nature = nature || 'soil';
			}
			prompt_old(name2, className) {
				var node;
				if (this.node.prompt) {
					node = this.node.prompt;
					node.innerHTML = '';
					node.className = 'popup';
				}
				else {
					node = ui.create.div('.popup', this.parentNode);
					this.node.prompt = node;
				}
				node.dataset.position = this.dataset.position;
				if (this.dataset.position == 0 || parseInt(this.dataset.position) == parseInt(ui.arena.dataset.number) / 2 ||
					typeof name2 == 'number' || this.classList.contains('minskin')) {
					node.innerHTML = name2;
				}
				else {
					for (var i = 0; i < name2.length; i++) {
						node.innerHTML += name2[i] + '<br/>';
					}
				}
				if (className) {
					node.classList.add(className);
				}
			}
			popup(name, className, nobroadcast) {
				var name2 = get.translation(name);
				if (!name2) return;
				this.$damagepop(name2, className || 'water', true, nobroadcast);
			}
			popup_old(name, className) {
				var name2 = get.translation(name);
				var node = ui.create.div('.popup', this.parentNode);
				if (!name2) {
					node.remove();
					return node;
				}
				game.addVideo('popup', this, [name, className]);
				node.dataset.position = this.dataset.position;
				if (this.dataset.position == 0 || parseInt(this.dataset.position) == parseInt(ui.arena.dataset.number) / 2 ||
					typeof name2 == 'number' || this.classList.contains('minskin')) {
					node.innerHTML = name2;
				}
				else {
					for (var i = 0; i < name2.length; i++) {
						node.innerHTML += name2[i] + '<br/>';
					}
				}
				if (className) {
					node.classList.add(className);
				}
				this.popups.push(node);
				if (this.popups.length > 1) {
					node.hide();
				}
				else {
					var that = this;
					setTimeout(function () { that._popup(); }, 1000);
				}
				return node;
			}
			_popup() {
				if (this.popups.length) {
					this.popups.shift().delete();
					if (this.popups.length) {
						this.popups[0].show();
						var that = this;
						setTimeout(function () { that._popup(); }, 1000);
					}
				}
			}
			showTimer(time) {
				if (!time && lib.configOL) {
					time = parseInt(lib.configOL.choose_timeout) * 1000;
				}
				if (_status.connectMode && !game.online) {
					game.broadcast(function (player, time) {
						player.showTimer(time);
					}, this, time);
				}
				if (this == game.me) {
					return;
				}
				if (this.node.timer) {
					this.node.timer.remove();
				}
				var timer = ui.create.div('.timerbar', this);
				this.node.timer = timer;
				ui.create.div(this.node.timer);
				var bar = ui.create.div(this.node.timer);
				ui.refresh(bar);
				bar.style.transitionDuration = (time / 1000) + 's';
				bar.style.transform = 'scale(0,1)';
			}
			hideTimer() {
				if (_status.connectMode && !game.online && this.playerid) {
					game.broadcast(function (player) {
						player.hideTimer();
					}, this);
				}
				if (this.node.timer) {
					this.node.timer.delete();
					delete this.node.timer;
				}
			}
			markAuto(name, info) {
				if (typeof info != 'undefined') {
					if (!Array.isArray(this.storage[name])) this.storage[name] = [];
					if (Array.isArray(info)) {
						this.storage[name].addArray(info);
					}
					else this.storage[name].add(info);
					this.markSkill(name);
				}
				else {
					var storage = this.storage[name];
					if (Array.isArray(storage)) {
						this[storage.length > 0 ? 'markSkill' : 'unmarkSkill'](name);
					}
					else if (typeof storage == 'number') {
						this[storage > 0 ? 'markSkill' : 'unmarkSkill'](name);
					}
				}
			}
			unmarkAuto(name, info) {
				var storage = this.storage[name];
				if (Array.isArray(info) && Array.isArray(storage)) {
					storage.removeArray(info.slice(0));
					this.markAuto(name);
				}
			}
			getExpansions(tag) {
				return this.getCards('x', (card) => card.hasGaintag(tag));
			}
			countExpansions(tag) {
				return this.getExpansions(tag).length;
			}
			hasExpansions(tag) {
				return this.countExpansions(tag) > 0;
			}
			setStorage(name, value, mark) {
				this.storage[name] = value;
				if (mark) this.markAuto(name);
				return value;
			}
			getStorage(name) {
				return this.storage[name] || [];
			}
			hasStorage(name, value) {
				if (!(name in this.storage)) return false;
				if (typeof value == "undefined") return true;
				const storage = this.storage[name];
				if (storage === value) return true;
				return Array.isArray(storage) && storage.includes(value);
			}
			hasStorageAny(name, values) {
				const storage = this.storage[name];
				if (!Array.isArray(values)) values = Array.from(arguments).slice(1);
				if (!storage) return false;
				if (!Array.isArray(storage)) return values.contains(storage);
				return values.some(item => storage.contains(item));
			}
			hasStorageAll(name, values) {
				const storage = this.storage[name];
				if (!Array.isArray(values)) values = Array.from(arguments).slice(1);
				if (!storage) return false;
				if (!Array.isArray(storage)) return false;
				return values.every(item => storage.contains(item));
			}
			initStorage(name, value, mark) {
				return this.hasStorage(name) ? this.getStorage(name) : this.setStorage(name, value, mark);
			}
			updateStorage(name, operation, mark) {
				return this.setStorage(name, operation(this.getStorage(name)), mark);
			}
			updateStorageAsync(name, operation, mark) {
				return Promise.resolve(this.getStorage(name))
					.then(value => operation(value))
					.then(value => this.setStorage(name, value, mark));
			}
			removeStorage(name, mark) {
				if (!this.hasStorage(name)) return false;
				delete this.storage[name];
				if (mark) {
					this.unmarkSkill(name);
				}
				return true;
			}
			markSkill(name, info, card, nobroadcast) {
				if (info === true) {
					this.syncStorage(name);
					info = null;
				}
				if (get.itemtype(card) == 'card') {
					game.addVideo('markSkill', this, [name, get.cardInfo(card)]);
				}
				else {
					game.addVideo('markSkill', this, [name]);
				}
				const func = function (storage, player, name, info, card) {
					player.storage[name] = storage;
					if (!info) {
						if (player.marks[name]) {
							player.updateMarks();
							return;
						}
						if (lib.skill[name]) {
							info = lib.skill[name].intro;
						}
						if (!info) {
							return;
						}
					}
					if (player.marks[name]) {
						player.marks[name].info = info;
					}
					else {
						if (card) {
							player.marks[name] = player.mark(card, info, name);
						}
						else {
							player.marks[name] = player.mark(name, info);
						}
					}
					player.updateMarks();
				};
				func(this.storage[name], this, name, info, card);
				if (!nobroadcast) game.broadcast(func, this.storage[name], this, name, info, card);
				return this;
			}
			unmarkSkill(name, nobroadcast) {
				game.addVideo('unmarkSkill', this, name);
				if (!nobroadcast) game.broadcast(function (player, name) {
					if (player.marks[name]) {
						player.marks[name].delete();
						player.marks[name].style.transform += ' scale(0.2)';
						delete player.marks[name];
						ui.updatem(player);
					}
				}, this, name);
				if (this.marks[name]) {
					this.marks[name].delete();
					this.marks[name].style.transform += ' scale(0.2)';
					delete this.marks[name];
					ui.updatem(this);
					var info = lib.skill[name];
					if (!game.online && info && info.intro && info.intro.onunmark) {
						if (info.intro.onunmark == 'throw') {
							if (get.itemtype(this.storage[name]) == 'cards') {
								this.$throw(this.storage[name], 1000);
								game.cardsDiscard(this.storage[name]);
								game.log(this.storage[name], '进入了弃牌堆');
								this.storage[name].length = 0;
							}
						}
						else if (typeof info.intro.onunmark == 'function') {
							info.intro.onunmark(this.storage[name], this);
						}
						else delete this.storage[name];
					}
				}
				return this;
			}
			markSkillCharacter(id, target, name, content, nobroadcast) {
				if (typeof target == 'object') {
					target = target.name;
				}
				const func = function (player, target, name, content, id) {
					if (player.marks[id]) {
						player.marks[id].name = name + '_charactermark';
						player.marks[id]._name = target;
						player.marks[id].info = {
							name: name,
							content: content,
							id: id
						};
						player.marks[id].setBackground(target, 'character');
						game.addVideo('changeMarkCharacter', player, {
							id: id,
							name: name,
							content: content,
							target: target
						});
					}
					else {
						player.marks[id] = player.markCharacter(target, {
							name: name,
							content: content,
							id: id
						});
						player.marks[id]._name = target;
						game.addVideo('markCharacter', player, {
							name: name,
							content: content,
							id: id,
							target: target
						});
					}
				};
				func(this, target, name, content, id);
				if (!nobroadcast) game.broadcast(func, this, target, name, content, id);
				return this;
			}
			markCharacter(name, info, learn, learn2) {
				if (typeof name == 'object') {
					name = name.name;
				}
				var node;
				if (name.startsWith('unknown')) {
					node = ui.create.div('.card.mark.drawinghidden');
					ui.create.div('.background.skillmark', node).innerHTML = get.translation(name)[0];
				}
				else {
					if (!lib.character[name]) return;
					node = ui.create.div('.card.mark.drawinghidden').setBackground(name, 'character');
				}
				this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
				node.name = name + '_charactermark';
				if (!info) {
					info = {};
				}
				if (!info.name) {
					info.name = get.translation(name);
				}
				if (!info.content) {
					info.content = get.skillintro(name, learn, learn2);
				}
				node.info = info;
				node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
				if (!lib.config.touchscreen) {
					if (lib.config.hover_all) {
						lib.setHover(node, ui.click.hoverplayer);
					}
					if (lib.config.right_info) {
						node.oncontextmenu = ui.click.rightplayer;
					}
				}
				ui.updatem(this);
				return node;
			}
			mark(name, info, skill) {
				if (get.itemtype(name) == 'cards') {
					var marks = [];
					for (var i = 0; i < name.length; i++) {
						marks.push(this.mark(name[i], info));
					}
					return marks;
				}
				else {
					var node;
					if (get.itemtype(name) == 'card') {
						node = name.copy('mark');
						node.classList.add('drawinghidden');
						this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
						node.suit = name.suit;
						node.number = name.number;
						// if(name.name&&lib.card[name.name]&&lib.card[name.name].markimage){
						// 	node.node.image.style.left=lib.card[name.name].markimage;
						// }

						if (name.classList.contains('fullborder')) {
							node.classList.add('fakejudge');
							node.classList.add('fakemark');
							(node.querySelector('.background') || ui.create.div('.background', node)).innerHTML = lib.translate[name.name + '_bg'] || get.translation(name.name)[0];
						}

						name = name.name;
					}
					else {
						node = ui.create.div('.card.mark.drawinghidden');
						this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
						if (lib.skill[name] && lib.skill[name].markimage) {
							node.setBackgroundImage(lib.skill[name].markimage);
							node.style['box-shadow'] = 'none';
							node.style['background-size'] = 'contain';
						}
						else if (lib.skill[name] && lib.skill[name].markimage2) {
							let img = ui.create.div('.background.skillmark', node);
							img.setBackgroundImage(lib.skill[name].markimage2);
							img.style['background-size'] = 'contain';
						}
						else {
							var str = lib.translate[name + '_bg'];
							if (!str || str[0] == '+' || str[0] == '-') {
								str = get.translation(name)[0];
							}
							ui.create.div('.background.skillmark', node).innerHTML = str;
						}
					}
					node.name = name;
					node.skill = skill || name;
					if (typeof info == 'object') {
						node.info = info;
					}
					else if (typeof info == 'string') {
						node.markidentifer = info;
					}
					node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
					if (!lib.config.touchscreen) {
						if (lib.config.hover_all) {
							lib.setHover(node, ui.click.hoverplayer);
						}
						if (lib.config.right_info) {
							node.oncontextmenu = ui.click.rightplayer;
						}
					}
					this.updateMarks();
					ui.updatem(this);
					return node;
				}
			}
			unmark(name, info) {
				game.addVideo('unmarkname', this, name);
				if (get.itemtype(name) == 'card') {
					this.unmark(name.name, info);
				}
				else if (get.itemtype(name) == 'cards') {
					for (var i = 0; i < name.length; i++) {
						this.unmark(name[i].name, info);
					}
				}
				else {
					for (var i = 0; i < this.node.marks.childNodes.length; i++) {
						if (this.node.marks.childNodes[i].name == name &&
							(!info || this.node.marks.childNodes[i].markidentifer == info)) {
							this.node.marks.childNodes[i].delete();
							this.node.marks.childNodes[i].style.transform += ' scale(0.2)';
							ui.updatem(this);
							return;
						}
					}
				}
			}
			addLink() {
				if (get.is.linked2(this)) {
					this.classList.add('linked2');
				}
				else {
					this.classList.add('linked');
				}
			}
			removeLink() {
				if (get.is.linked2(this)) {
					this.classList.remove('linked2');
				}
				else {
					this.classList.remove('linked');
				}
			}
			canUse(card, target, distance, includecard) {
				if (typeof card == 'string') card = { name: card, isCard: true };
				var info = get.info(card);
				if (info.multicheck && !info.multicheck(card, this)) return false;
				if (!lib.filter.cardEnabled(card, this)) return false;
				if (includecard && !lib.filter.cardUsable(card, this)) return false;
				if (distance !== false && !lib.filter.targetInRange(card, this, target)) return false;
				return lib.filter[includecard ? 'targetEnabledx' : 'targetEnabled'](card, this, target);
			}
			hasUseTarget(card, distance, includecard) {
				var player = this;
				return game.hasPlayer(function (current) {
					return player.canUse(card, current, distance, includecard);
				});
			}
			hasValueTarget() {
				return this.getUseValue.apply(this, arguments) > 0;
			}
			getUseValue(card, distance, includecard) {
				if (typeof (card) == 'string') {
					card = { name: card, isCard: true };
				}
				var player = this;
				var targets = game.filterPlayer();
				var value = [];
				var min = 0;
				var info = get.info(card);
				if (!info || info.notarget) return 0;
				var range;
				var select = get.copy(info.selectTarget);
				if (select == undefined) {
					if (info.filterTarget == undefined) return true;
					range = [1, 1];
				}
				else if (typeof select == 'number') range = [select, select];
				else if (get.itemtype(select) == 'select') range = select;
				else if (typeof select == 'function') range = select(card, player);
				if (info.singleCard) range = [1, 1];
				game.checkMod(card, player, range, 'selectTarget', player);
				if (!range) return 0;

				for (var i = 0; i < targets.length; i++) {
					if (player.canUse(card, targets[i], distance, includecard)) {
						var eff = get.effect(targets[i], card, player, player);
						value.push(eff);
					}
				}
				value.sort(function (a, b) {
					return b - a;
				});
				for (var i = 0; i < value.length; i++) {
					if (i == range[1] || range[1] != -1 && value[i] <= 0) break;
					min += value[i];
				}
				return min;
			}
			addSubPlayer(cfg) {
				var skill = 'subplayer_' + cfg.name + '_' + get.id();
				game.log(this, '获得了随从', '#g' + get.translation(cfg.name));
				cfg.hs = cfg.hs || [];
				cfg.es = cfg.es || [];
				cfg.skills = cfg.skills || [];
				cfg.hp = cfg.hp || 1;
				cfg.maxHp = cfg.maxHp || 1;
				cfg.sex = cfg.sex || 'male';
				cfg.group = cfg.group || 'qun';
				cfg.skill = cfg.skill || _status.event.name;
				if (!cfg.source) {
					if (this.hasSkill(_status.event.name) && this.name2 && lib.character[this.name2] &&
						lib.character[this.name2][3].contains(_status.event.name)) {
						cfg.source = this.name2;
					}
					else {
						cfg.source = this.name;
					}
				}
				game.broadcastAll(function (player, skill, cfg) {
					lib.skill[skill] = {
						intro: {
							content: cfg.intro || ''
						},
						mark: 'character',
						subplayer: cfg.skill,
						ai: {
							subplayer: true
						}
					};
					lib.character[skill] = [cfg.sex, cfg.group, cfg.maxHp, cfg.skills, []];
					if (Array.isArray(cfg.image)) {
						cfg.image.forEach(image => lib.character[skill][4].push(image));
					} else if (typeof cfg.image == 'string') {
						lib.character[skill][4].push(cfg.image);
					} else {
						lib.character[skill][4].push('character:' + cfg.name);
					}
					lib.translate[skill] = cfg.caption || get.rawName(cfg.name);
					player.storage[skill] = cfg;
				}, this, skill, cfg);
				game.addVideo('addSubPlayer', this, [skill, lib.skill[skill], lib.character[skill], lib.translate[skill], { name: cfg.name }]);
				this.addSkill(skill);
				return skill;
			}
			removeSubPlayer(name) {
				if (this.hasSkill('subplayer') && this.name == name) {
					this.exitSubPlayer(true);
				}
				else {
					if (player.storage[name].onremove) {
						player.storage[name].onremove(player);
					}
					this.removeSkill(name);
					delete this.storage[name];
					game.log(player, '牺牲了随从', '#g' + name);
					_status.event.trigger('removeSubPlayer');
				}
			}
			callSubPlayer() {
				if (this.hasSkill('subplayer')) return;
				var next = game.createEvent('callSubPlayer');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'string') {
						next.directresult = arguments[i];
					}
				}
				next.setContent('callSubPlayer');
				return next;
			}
			toggleSubPlayer() {
				if (!this.hasSkill('subplayer')) return;
				var next = game.createEvent('toggleSubPlayer');
				next.player = this;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'string') {
						next.directresult = arguments[i];
					}
				}
				next.setContent('toggleSubPlayer');
				return next;
			}
			exitSubPlayer(remove) {
				if (!this.hasSkill('subplayer')) return;
				var next = game.createEvent('exitSubPlayer');
				next.player = this;
				next.remove = remove;
				next.setContent('exitSubPlayer');
				return next;
			}
			getSubPlayers(tag) {
				var skills = this.getSkills();
				var list = [];
				for (var i = 0; i < skills.length; i++) {
					var name = skills[i];
					var info = lib.skill[name];
					if (tag && info.subplayer != tag) continue;
					if (info.ai && info.ai.subplayer && this.storage[name] && this.storage[name].name) {
						list.push(name);
					}
				}
				return list;
			}
			addSkillTrigger(skills, hidden, triggeronly) {
				if (typeof skills == 'string') skills = [skills];
				game.expandSkills(skills);
				for (const skill of skills) {
					const info = lib.skill[skill];
					if (!info) {
						console.error(new ReferenceError(`Cannot find ${skill} in lib.skill, failed to add ${skill}'s trigger to ${this.name}`));
						continue;
					}
					if (!triggeronly) {
						if (info.global && (!hidden || info.globalSilent)) {
							let global = info.global;
							if (!Array.isArray(global)) global = [global];
							global.forEach(skill => game.addGlobalSkill(skill, this));
						}
						if (this.initedSkills.includes(skill)) continue;
						this.initedSkills.push(skill);
						if (info.init && !_status.video) info.init(this, skill);
					}
					if (info.trigger && this.playerid) {
						const setTrigger = (role, evt) => {
							const name = this.playerid + '_' + role + '_' + evt;
							if (!lib.hook[name]) lib.hook[name] = [];
							lib.hook[name].add(skill);
							lib.hookmap[evt] = true;
						};
						for (const role in info.trigger) {
							let evts = info.trigger[role];
							if (!Array.isArray(evts)) evts = [evts];
							evts.forEach(evt => setTrigger(role, evt));
						}
					}
					if (info.hookTrigger) {
						if (!this._hookTrigger) this._hookTrigger = [];
						this._hookTrigger.add(skill);
					}
					if (_status.event && _status.event.addTrigger) _status.event.addTrigger(skill, this);
					_status.event.clearStepCache();
				}
				return this;
			}
			addSkillLog(skill) {
				if (!skill) return this;
				this.addSkill(skill);
				if (!Array.isArray(skill)) skill = [skill];
				game.log(this, '获得了技能', ...skill.map(i => {
					this.popup(i);
					return '#g【' + get.translation(i) + '】';
				}));
			}
			removeSkillLog(skill, popup) {
				if (!skill) return this;
				this.removeSkill(skill);
				if (!Array.isArray(skill)) skill = [skill];
				game.log(this, '失去了技能', ...skill.map(i => {
					if (popup === true) this.popup(i);
					return '#g【' + get.translation(i) + '】';
				}));
			}
			addInvisibleSkill(skill) {
				if (Array.isArray(skill)) {
					_status.event.clearStepCache();
					for (var i = 0; i < skill.length; i++) {
						this.addInvisibleSkill(skill[i]);
					}
				}
				else {
					if (this.invisibleSkills.contains(skill)) return;
					_status.event.clearStepCache();
					var info = lib.skill[skill];
					if (!info) return;
					this.invisibleSkills.add(skill);
					this.addSkillTrigger(skill);
					if (this.awakenedSkills.contains(skill)) {
						this.awakenSkill(skill);
						return;
					}
				}
			}
			removeInvisibleSkill(skill) {
				if (!skill) return;
				if (Array.isArray(skill)) {
					for (var i = 0; i < skill.length; i++) {
						this.removeSkill(skill[i]);
					}
				}
				else {
					var info = lib.skill[skill];
					if (info && info.fixed && arguments[1] !== true) return skill;
					game.broadcastAll(function (player, skill) {
						player.invisibleSkills.remove(skill);
					}, this, skill);
					if (!player.hasSkill(skill, true)) player.removeSkill(skill);
				}
				return skill;
			}
			addSkill(skill, checkConflict, nobroadcast, addToSkills) {
				if (Array.isArray(skill)) {
					_status.event.clearStepCache();
					for (var i = 0; i < skill.length; i++) {
						this.addSkill(skill[i]);
					}
				}
				else {
					if (this.skills.contains(skill)) return;
					_status.event.clearStepCache();
					var info = lib.skill[skill];
					if (!info) return;
					if (!addToSkills) {
						this.skills.add(skill);
						if (!nobroadcast) {
							game.broadcast(function (player, skill) {
								player.skills.add(skill);
							}, this, skill);
						}
					}
					this.addSkillTrigger(skill);
					if (this.awakenedSkills.contains(skill)) {
						this.awakenSkill(skill);
						return;
					}
					if (info.init2 && !_status.video) {
						info.init2(this, skill);
					}
					if (info.mark) {
						if (info.mark == 'card' &&
							get.itemtype(this.storage[skill]) == 'card') {
							this.markSkill(skill, null, this.storage[skill], nobroadcast);
						}
						else if (info.mark == 'card' &&
							get.itemtype(this.storage[skill]) == 'cards') {
							this.markSkill(skill, null, this.storage[skill][0], nobroadcast);
						}
						else if (info.mark == 'image') {
							this.markSkill(skill, null, ui.create.card(null, 'noclick').init([null, null, skill]), nobroadcast);
						}
						else if (info.mark == 'character') {
							var intro = info.intro.content;
							if (typeof intro == 'function') {
								intro = intro(this.storage[skill], this);
							}
							else if (typeof intro == 'string') {
								intro = intro.replace(/#/g, this.storage[skill]);
								intro = intro.replace(/&/g, get.cnNumber(this.storage[skill]));
								intro = intro.replace(/\$/g, get.translation(this.storage[skill]));
							}
							var caption;
							if (typeof info.intro.name == 'function') {
								caption = info.intro.name(this.storage[skill], this);
							}
							else if (typeof info.intro.name == 'string') {
								caption = info.name;
							}
							else {
								caption = get.translation(skill);
							}
							this.markSkillCharacter(skill, this.storage[skill], caption, intro, nobroadcast);
						}
						else {
							this.markSkill(skill, null, null, nobroadcast);
						}
					}
				}
				if (checkConflict) this.checkConflict();
				return skill;
			}
			addAdditionalSkill(skill, skills, keep) {
				if (this.additionalSkills[skill]) {
					if (keep) {
						if (typeof this.additionalSkills[skill] == 'string') {
							this.additionalSkills[skill] = [this.additionalSkills[skill]];
						}
					}
					else {
						this.removeAdditionalSkill(skill);
						this.additionalSkills[skill] = [];
					}
				}
				else {
					this.additionalSkills[skill] = [];
				}
				if (typeof skills == 'string') {
					skills = [skills];
				}
				for (var i = 0; i < skills.length; i++) {
					this.addSkill(skills[i], null, true, true);
					//this.skills.remove(skills[i]);
					this.additionalSkills[skill].push(skills[i]);
				}
				this.checkConflict();
				_status.event.clearStepCache();
				return this;
			}
			removeAdditionalSkill(skill, target) {
				const player = this;
				if (this.additionalSkills[skill]) {
					const additionalSkills = this.additionalSkills[skill];
					const hasAnotherSKill = function (skillkey, skill) {
						return (player.skills.contains(skill) || player.tempSkills[skill] || Object.keys(player.additionalSkills).some(key => {
							if (key === skillkey) return false;
							if (Array.isArray(player.additionalSkills[key])) return player.additionalSkills[key].includes(skill);
							return player.additionalSkills[key] == skill;
						}));
					};
					if (Array.isArray(additionalSkills) && typeof target == 'string') {
						if (additionalSkills.contains(target)) {
							additionalSkills.remove(target);
							if (!hasAnotherSKill(skill, target)) this.removeSkill(target);
						}
					}
					else {
						delete this.additionalSkills[skill];
						if (typeof additionalSkills == 'string') {
							if (!hasAnotherSKill(skill, additionalSkills)) this.removeSkill(additionalSkills);
						}
						else if (Array.isArray(additionalSkills)) {
							const skillsToRemove = additionalSkills.filter(target => !hasAnotherSKill(skill, target));
							this.removeSkill(skillsToRemove);
						}
					}
				}
				_status.event.clearStepCache();
				return this;
			}
			awakenSkill(skill, nounmark) {
				if (!nounmark) this.unmarkSkill(skill);
				this.disableSkill(skill + '_awake', skill);
				this.awakenedSkills.add(skill);
				if (this.storage[skill] === false) this.storage[skill] = true;
				_status.event.clearStepCache();
				return this;
			}
			restoreSkill(skill, nomark) {
				if (this.storage[skill] === true) this.storage[skill] = false;
				this.awakenedSkills.remove(skill);
				this.enableSkill(skill + '_awake', skill);
				if (!nomark) this.markSkill(skill);
				_status.event.clearStepCache();
				return this;
			}
			disableSkill(skill, skills) {
				if (typeof skills == 'string') {
					if (!this.disabledSkills[skills]) {
						this.disabledSkills[skills] = [];
						var info = get.info(skills);
						if (info.ondisable && info.onremove) {
							if (typeof info.onremove == 'function') {
								info.onremove(this, skill);
							}
							else if (typeof info.onremove == 'string') {
								if (info.onremove == 'storage') {
									delete this.storage[skill];
								}
								else {
									var cards = this.storage[skill];
									if (get.itemtype(cards) == 'card') {
										cards = [cards];
									}
									if (get.itemtype(cards) == 'cards') {
										if (this.onremove == 'discard') {
											this.$throw(cards);
										}
										if (this.onremove == 'discard' || this.onremove == 'lose') {
											game.cardsDiscard(cards);
											delete this.storage[skill];
										}
									}
								}
							}
							else if (Array.isArray(info.onremove)) {
								for (var i = 0; i < info.onremove.length; i++) {
									delete this.storage[info.onremove[i]];
								}
							}
							else if (info.onremove === true) {
								delete this.storage[skill];
							}
						}
					}
					this.disabledSkills[skills].add(skill);
					var group = lib.skill[skills].group;
					if (typeof group == 'string' || Array.isArray(group)) {
						this.disableSkill(skill, group);
					}
				}
				else if (Array.isArray(skills)) {
					for (var i = 0; i < skills.length; i++) {
						this.disableSkill(skill, skills[i]);
					}
				}
				_status.event.clearStepCache();
				return this;
			}
			enableSkill(skill) {
				for (var i in this.disabledSkills) {
					this.disabledSkills[i].remove(skill);
					if (this.disabledSkills[i].length == 0) {
						delete this.disabledSkills[i];
					}
				}
				_status.event.clearStepCache();
				return this;
			}
			checkMarks() {
				var skills = this.getSkills();
				game.expandSkills(skills);
				for (var i in this.marks) {
					if (!skills.contains(i) && !this.marks[i].info.fixed) {
						this.unmarkSkill(i);
					}
				}
				return this;
			}
			addEquipTrigger(card) {
				if (card) {
					var info = get.info(card);
					if (info.skills) {
						for (var j = 0; j < info.skills.length; j++) {
							this.addSkillTrigger(info.skills[j]);
						}
					}
				}
				else {
					var es = this.getCards('e');
					for (var i = 0; i < es.length; i++) {
						this.addEquipTrigger(es[i]);
					}
				}
				_status.event.clearStepCache();
				return this;
			}
			removeEquipTrigger(card) {
				if (card) {
					var info = get.info(card);
					var skills = this.getSkills(null, false);
					if (info.skills) {
						for (var j = 0; j < info.skills.length; j++) {
							if (skills.contains(info.skills[j])) continue;
							this.removeSkillTrigger(info.skills[j]);
						}
					}
					if (info.clearLose && typeof info.onLose == 'function') {
						var next = game.createEvent('lose_' + card.name);
						next.setContent(info.onLose);
						next.player = this;
						next.card = card;
					}
				}
				else {
					var es = this.getCards('e');
					for (var i = 0; i < es.length; i++) {
						this.removeEquipTrigger(es[i]);
					}
				}
				_status.event.clearStepCache();
				return this;
			}
			removeSkillTrigger(skills, triggeronly) {
				if (typeof skills == 'string') skills = [skills];
				game.expandSkills(skills);
				for (const skill of skills) {
					const info = lib.skill[skill];
					if (!info) {
						console.error(new ReferenceError(`Cannot find ${skill} in lib.skill, failed to remove ${skill}'s trigger to ${this.name}`));
						continue;
					}
					if (!triggeronly) {
						if (info.global) {
							let global = info.global;
							if (!Array.isArray(global)) global = [global];
							global.forEach(skill => game.removeGlobalSkill(skill, this));
						}
						if (!this.initedSkills.includes(skill)) continue;
						this.initedSkills.remove(skill);
						// if(info.onremove&&!_status.video) info.onremove(this,skill);
					}
					if (info.trigger && this.playerid) {
						const removeTrigger = (role, evt) => {
							const name = this.playerid + '_' + role + '_' + evt;
							if (!lib.hook[name]) return;
							lib.hook[name].remove(skill);
							if (lib.hook[name].length == 0) delete lib.hook[name];
						};
						for (const role in info.trigger) {
							let evts = info.trigger[role];
							if (!Array.isArray(evts)) evts = [evts];
							evts.forEach(evt => removeTrigger(role, evt));
						}
					}
					if (info.hookTrigger && this._hookTrigger) {
						this._hookTrigger.remove(skill);
						if (!this._hookTrigger.length) delete this._hookTrigger;
					}
					if (_status.event && _status.event.removeTrigger) _status.event.removeTrigger(skill, this);
					_status.event.clearStepCache();
				}
				return this;
			}
			removeSkill(skill) {
				if (!skill) return;
				_status.event.clearStepCache();
				if (Array.isArray(skill)) {
					for (var i = 0; i < skill.length; i++) {
						this.removeSkill(skill[i]);
					}
				}
				else {
					var info = lib.skill[skill];
					if (info && info.fixed && arguments[1] !== true) return skill;
					this.unmarkSkill(skill);
					game.broadcastAll(function (player, skill) {
						player.skills.remove(skill);
						player.hiddenSkills.remove(skill);
						player.invisibleSkills.remove(skill);
						delete player.tempSkills[skill];
						for (var i in player.additionalSkills) {
							player.additionalSkills[i].remove(skill);
						}
					}, this, skill);
					this.checkConflict(skill);
					if (info) {
						if (info.onremove) {
							if (typeof info.onremove == 'function') {
								info.onremove(this, skill);
							}
							else if (typeof info.onremove == 'string') {
								if (info.onremove == 'storage') {
									delete this.storage[skill];
								}
								else {
									var cards = this.storage[skill];
									if (get.itemtype(cards) == 'card') {
										cards = [cards];
									}
									if (get.itemtype(cards) == 'cards') {
										if (this.onremove == 'discard') {
											this.$throw(cards);
										}
										if (this.onremove == 'discard' || this.onremove == 'lose') {
											game.cardsDiscard(cards);
											delete this.storage[skill];
										}
									}
								}
							}
							else if (Array.isArray(info.onremove)) {
								for (var i = 0; i < info.onremove.length; i++) {
									delete this.storage[info.onremove[i]];
								}
							}
							else if (info.onremove === true) {
								delete this.storage[skill];
							}
						}
						this.removeSkillTrigger(skill);
						if (!info.keepSkill) {
							this.removeAdditionalSkill(skill);
						}
					}
					this.enableSkill(skill + '_awake');
				}
				return skill;
			}
			addTempSkill(skill, expire, checkConflict) {
				if (this.hasSkill(skill) && this.tempSkills[skill] == undefined) return;
				this.addSkill(skill, checkConflict, true, true);

				if (!expire) expire = { global: ['phaseAfter', 'phaseBeforeStart'] };
				else if (typeof expire == 'string' || Array.isArray(expire)) expire = { global: expire };
				this.tempSkills[skill] = expire;

				if (get.objtype(expire) == 'object') {
					const roles = ['player', 'source', 'target', 'global'];
					for (const i of roles) {
						let triggers = expire[i];
						if (!Array.isArray(triggers)) triggers = [triggers];
						triggers.forEach(trigger => lib.hookmap[trigger] = true);
					}
				}

				return skill;
			}
			tempBanSkill(skill, expire, log) {
				if (this.isTempBanned(skill)) return;
				this.setStorage(`temp_ban_${skill}`, true);

				if (log !== false && this.hasSkill(skill)) game.log(this, '的技能', `#g【${get.translation(skill)}】`, '暂时失效了');

				if (!expire) expire = { global: ['phaseAfter', 'phaseBeforeStart'] };
				else if (typeof expire == 'string' || Array.isArray(expire)) expire = { global: expire };
				this.when(expire).assign({
					firstDo: true,
				}).vars({
					bannedSkill: skill,
				}).then(() => {
					delete player.storage[`temp_ban_${bannedSkill}`];
				});
				return skill;
			}
			isTempBanned(skill) {
				return this.hasStorage(`temp_ban_${skill}`);
			}
			attitudeTo(target) {
				if (typeof get.attitude == 'function') return get.attitude(this, target);
				return 0;
			}
			clearSkills(all) {
				var list = [];
				var exclude = [];
				for (var i = 0; i < arguments.length; i++) {
					exclude.push(arguments[i]);
				}
				for (i = 0; i < this.skills.length; i++) {
					if (lib.skill[this.skills[i]].superCharlotte) continue;
					if (!all && (lib.skill[this.skills[i]].temp || lib.skill[this.skills[i]].charlotte)) continue;
					if (!exclude.contains(this.skills[i])) {
						list.push(this.skills[i]);
					}
				}
				if (all) {
					for (var i in this.additionalSkills) {
						this.removeAdditionalSkill(i);
					}
				}
				this[all ? 'removeSkill' : 'removeSkillLog'](list);
				this.checkConflict();
				this.checkMarks();
				return list;
			}
			checkConflict(skill) {
				if (skill) {
					if (this.forbiddenSkills[skill]) {
						delete this.forbiddenSkills[skill];
					}
					else {
						for (var i in this.forbiddenSkills) {
							if (this.forbiddenSkills[i].includes(skill)) {
								this.forbiddenSkills[i].remove(skill);
								if (!this.forbiddenSkills[i].length) {
									delete this.forbiddenSkills[i];
								}
							}
						}
					}
				}
				else {
					this.forbiddenSkills = {};
					var forbid = [];
					var getName = function (arr) {
						var str = '';
						for (var i = 0; i < arr.length; i++) {
							str += arr[i] + '+';
						}
						return str.slice(0, str.length - 1);
					};
					var forbidlist = lib.config.forbid.concat(lib.config.customforbid);
					var skills = this.getSkills();
					for (var i = 0; i < forbidlist.length; i++) {
						if (lib.config.customforbid.contains(forbidlist[i]) ||
							!lib.config.forbidlist.contains(getName(forbidlist[i]))) {
							for (var j = 0; j < forbidlist[i].length; j++) {
								if (!skills.contains(forbidlist[i][j])) break;
							}
							if (j == forbidlist[i].length) {
								forbid.push(forbidlist[i]);
							}
						}
					}
					for (var i = 0; i < forbid.length; i++) {
						if (forbid[i][1] || this.name2) {
							this.forbiddenSkills[forbid[i][0]] = this.forbiddenSkills[forbid[i][0]] || [];
							if (forbid[i][1]) {
								this.forbiddenSkills[forbid[i][0]].add(forbid[i][1]);
							}
						}
					}
				}
			}
			getHistory(key, filter, last) {
				if (!key) return this.actionHistory[this.actionHistory.length - 1];
				if (!filter) return this.actionHistory[this.actionHistory.length - 1][key];
				else {
					const history = this.getHistory(key);
					if (last) {
						const lastIndex = history.indexOf(last);
						return history.filter((event, index) => {
							if (index > lastIndex) return false;
							return filter(event);
						});
					}
					return history.filter(filter);
				}
			}
			checkHistory(key, filter, last) {
				if (!key || !filter) return;
				else {
					const history = this.getHistory(key);
					if (last) {
						const lastIndex = history.indexOf(last);
						history.forEach((event, index) => {
							if (index > lastIndex) return false;
							filter(event);
						});
					}
					else {
						history.forEach(filter);
					}
				}
			}
			hasHistory(key, filter, last) {
				const history = this.getHistory(key);
				if (!filter || typeof filter != "function") filter = lib.filter.all;
				if (last) {
					const lastIndex = history.indexOf(last);
					return history.some((event, index) => {
						if (index > lastIndex) return false;
						return filter(event);
					});
				}
				return history.some(filter);
			}
			getLastHistory(key, filter, last) {
				let history = false;
				for (let i = this.actionHistory.length - 1; i >= 0; i--) {
					if (this.actionHistory[i].isMe) {
						history = this.actionHistory[i]; break;
					}
				}
				if (!history) return null;
				if (!key) return history;
				if (!filter) return history[key];
				else {
					if (last) {
						const lastIndex = history.indexOf(last);
						return history.filter((event, index) => {
							if (index > lastIndex) return false;
							return filter(event);
						});
					}
					return history.filter(filter);
				}
			}
			checkAllHistory(key, filter, last) {
				if (!key || !filter) return;
				this.actionHistory.forEach((value) => {
					let history = value[key];
					if (last && history.includes(last)) {
						const lastIndex = history.indexOf(last);
						history.forEach((event, index) => {
							if (index > lastIndex) return false;
							return filter(event);
						});
					}
					else {
						history.forEach(filter);
					}
				});
			}
			getAllHistory(key, filter, last) {
				const history = [];
				this.actionHistory.forEach((value) => {
					if (!key || !value[key]) {
						history.push(value);
					}
					else {
						history.push(...value[key]);
					}
				});
				if (filter) {
					if (last) {
						const lastIndex = history.indexOf(last);
						return history.filter((event, index) => {
							if (index > lastIndex) return false;
							return filter(event);
						});
					}
					return history.filter(filter);
				}
				return history;
			}
			hasAllHistory(key, filter, last) {
				return this.actionHistory.some((value) => {
					let history = value[key];
					if (last && history.includes(last)) {
						const lastIndex = history.indexOf(last);
						if (history.some(function (event, index) {
							if (index > lastIndex) return false;
							return filter(event);
						})) return true;
					}
					else {
						if (history.some(filter)) return true;
					}
					return false;
				});
			}
			getLastUsed(num) {
				if (typeof num != 'number') num = 0;
				var history = this.getHistory('useCard');
				if (history.length <= num) return null;
				return history[history.length - num - 1];
			}
			getStat(key) {
				if (!key) return this.stat[this.stat.length - 1];
				return this.stat[this.stat.length - 1][key];
			}
			getLastStat(key) {
				var stat = false;
				for (var i = this.stat.length - 1; i >= 0; i--) {
					if (this.stat[i].isMe) {
						stat = this.stat[i]; break;
					}
				}
				if (!stat) return null;
				if (!key) return stat;
				return stat[key];
			}
			queue(time) {
				if (time == false) {
					clearTimeout(this.queueTimeout);
					this.queueCount = 0;
					return;
				}
				if (time == undefined) time = 500;
				var player = this;
				player.queueCount++;
				this.queueTimeout = setTimeout(function () {
					player.queueCount--;
					if (player.queueCount == 0) {
						player.style.transform = '';
						player.node.avatar.style.transform = '';
						player.node.avatar2.style.transform = '';
						if (game.chess) {
							ui.placeChess(player, player.dataset.position);
						}
						if (player == game.me) ui.me.removeAttribute('style');
					}
				}, time);
			}
			getCardUsable(card, pure) {
				var player = this;
				if (typeof card == 'string') {
					card = { name: card };
				}
				card = get.autoViewAs(card);
				var num = get.info(card).usable;
				if (typeof num == 'function') num = num(card, player);
				num = game.checkMod(card, player, num, 'cardUsable', player);
				if (typeof num != 'number') return Infinity;
				if (!pure && _status.currentPhase == player) {
					return num - player.countUsed(card);
				}
				return num;
			}
			getAttackRange(raw) {
				const player = this;
				let range = 0;
				if (raw) {
					range = game.checkMod(player, player, range, 'globalFrom', player);
					range = game.checkMod(player, player, range, 'attackFrom', player);
					const equips = player.getCards('e', function (card) {
						return !ui.selected.cards || !ui.selected.cards.contains(card);
					});
					equips.forEach(card => {
						const info = get.info(card, false).distance;
						if (info && info.globalFrom) {
							range += info.globalFrom;
						}
					});
					return (player.getEquipRange() - range);
				}
				let base = game.checkMod(player, 'unchanged', 'attackRangeBase', player);
				if (base != 'unchanged') {
					range = base;
				}
				else {
					range = player.getEquipRange();
				}
				range = game.checkMod(player, range, 'attackRange', player);
				return range;
			}
			getEquipRange(cards) {
				const player = this;
				if (!cards) cards = player.getCards('e', function (card) {
					return !ui.selected.cards || !ui.selected.cards.contains(card);
				});
				const range = cards.reduce((range, card) => {
					let newRange = false;
					const info = get.info(card, false);
					if (info.distance) {
						//如果存在attackRange 则通过attackRange动态获取攻击范围
						if (typeof info.distance.attackRange == 'function') {
							newRange = info.distance.attackRange(card, player);
						}
						//否则采用祖宗之法
						else if (typeof info.distance.attackFrom == 'number') {
							newRange = (1 - info.distance.attackFrom);
						}
					}
					let isN1 = (typeof range == 'number');
					let isN2 = (typeof newRange == 'number');
					if (isN1 && isN2) return Math.max(range, newRange);
					else return (isN1 ? range : newRange);
				}, false);
				return (typeof range == 'number') ? range : 1;
			}
			getGlobalFrom() {
				var player = this;
				var range = 0;
				range = game.checkMod(player, player, range, 'globalFrom', player);
				var equips = player.getCards('e', function (card) {
					return !ui.selected.cards || !ui.selected.cards.contains(card);
				});
				for (var i = 0; i < equips.length; i++) {
					var info = get.info(equips[i]).distance;
					if (!info) continue;
					if (info.globalFrom) {
						range += info.globalFrom;
					}
				}
				return (-range);
			}
			getGlobalTo() {
				var player = this;
				var range = 0;
				range = game.checkMod(player, player, range, 'globalTo', player);
				var equips = player.getCards('e', function (card) {
					return !ui.selected.cards || !ui.selected.cards.contains(card);
				});
				for (var i = 0; i < equips.length; i++) {
					var info = get.info(equips[i]).distance;
					if (!info) continue;
					if (info.globalTo) {
						range += info.globalTo;
					}
				}
				return (range);
			}
			getHandcardLimit() {
				var num = Math.max(this.hp, 0);
				num = game.checkMod(this, num, 'maxHandcardBase', this);
				num = game.checkMod(this, num, 'maxHandcard', this);
				num = game.checkMod(this, num, 'maxHandcardFinal', this);
				return Math.max(0, num);
			}
			getEnemies(func) {
				var player = this;
				var targets;
				var mode = get.mode();
				if (mode == 'identity') {
					if (_status.mode == 'purple') {
						switch (player.identity) {
							case 'bZhu': case 'bZhong': case 'rNei': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return ['rZhu', 'rZhong', 'bNei'].contains(target.identity);
							}); break;
							case 'rZhu': case 'rZhong': case 'bNei': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return ['bZhu', 'bZhong', 'rNei'].contains(target.identity);
							}); break;
							case 'rYe': case 'bYe': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return !['rYe', 'bYe'].contains(target.identity);
							}); break;
						}
					}
					else {
						var num = get.population('fan');
						switch (player.identity) {
							case 'zhu': case 'zhong': case 'mingzhong': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								if (num >= 3) return target.identity == 'fan';
								return target.identity == 'nei' || target.identity == 'fan';
							}); break;
							case 'nei': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								if (num >= 3) return target.identity == 'fan';
								if (game.players.length == 2) return target != player;
								return target.identity == 'zhong' || target.identity == 'mingzhong' || target.identity == 'fan';
							}); break;
							case 'fan': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return target.identity != 'fan';
							}); break;
							case 'commoner': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								if (num >= 3) return target.identity != 'fan';
								return target.identity == 'fan';
							}); break;
						}
					}
				}
				else if (mode == 'guozhan') {
					if (player.identity == 'ye') {
						targets = game.filterPlayer(function (target) {
							if (func && !func(target)) return false;
							return true;
						});
					}
					else {
						var group = lib.character[player.name1][1];
						targets = game.filterPlayer(function (target) {
							if (func && !func(target)) return false;
							return target.identity == 'ye' || lib.character[target.name1][1] != group;
						});
					}
				}
				else if (mode == 'doudizhu') {
					targets = game.filterPlayer(function (target) {
						if (func && !func(target)) return false;
						return target.identity != player.identity;
					});
				}
				else {
					targets = game.filterPlayer(function (target) {
						if (func && !func(target)) return false;
						return target.side != player.side;
					});
				}
				targets.remove(player);
				return targets;
			}
			getFriends(func) {
				var player = this;
				var targets;
				var mode = get.mode();
				var self = false;
				if (func === true) {
					func = null;
					self = true;
				}
				if (mode == 'identity') {
					if (_status.mode == 'purple') {
						switch (player.identity) {
							case 'rZhu': case 'rZhong': case 'bNei': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return ['rZhu', 'rZhong', 'bNei'].contains(target.identity);
							}); break;
							case 'bZhu': case 'bZhong': case 'rNei': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return ['bZhu', 'bZhong', 'rNei'].contains(target.identity);
							}); break;
							case 'rYe': case 'bYe': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return ['rYe', 'bYe'].contains(target.identity);
							}); break;
						}
					}
					else {
						switch (player.identity) {
							case 'zhu': case 'zhong': case 'mingzhong': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return ['zhu', 'zhong', 'mingzhong'].contains(target.identity);
							}); break;
							case 'nei': targets = []; break;
							case 'fan': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return target.identity == 'fan';
							}); break;
							case 'commoner': targets = game.filterPlayer(function (target) {
								if (func && !func(target)) return false;
								return true;
							}); break;
						}
					}
				}
				else if (mode == 'guozhan') {
					if (player.identity == 'ye') {
						targets = [];
					}
					else {
						var group = lib.character[player.name1][1];
						targets = game.filterPlayer(function (target) {
							if (func && !func(target)) return false;
							return target.identity != 'ye' && lib.character[target.name1][1] == group;
						});
					}
				}
				else if (mode == 'doudizhu') {
					targets = game.filterPlayer(function (target) {
						if (func && !func(target)) return false;
						return target.identity == player.identity;
					});
				}
				else {
					targets = game.filterPlayer(function (target) {
						if (func && !func(target)) return false;
						return target.side == player.side;
					});
				}
				if (self) {
					targets.add(player);
				}
				else {
					targets.remove(player);
				}
				return targets;
			}
			isEnemyOf() {
				return !this.isFriendOf.apply(this, arguments);
			}
			isFriendOf(player) {
				if (get.mode() == 'guozhan') {
					if (this == player) return true;
					if (this.getStorage('yexinjia_friend').includes(player) || player.getStorage('yexinjia_friend').includes(this)) return true;
					if (this.identity == 'unknown' || this.identity == 'ye') return false;
					if (player.identity == 'unknown' || player.identity == 'ye') return false;
					return this.identity == player.identity;
				}
				if (get.mode() == 'doudizhu') {
					return this.identity == player.identity;
				}
				if (this.side != undefined && typeof player.side == 'boolean') {
					return this.side == player.side;
				}
				return this == player;
			}
			isFriendsOf(player) {
				return player.getFriends(true).contains(this);
			}
			isEnemiesOf(player) {
				return player.getEnemies().contains(this);
			}
			isAlive() {
				return this.classList.contains('dead') == false;
			}
			isDead() {
				return this.classList.contains('dead');
			}
			isDying() {
				return _status.dying.contains(this) && this.hp <= 0 && this.isAlive();
			}
			isDamaged() {
				return this.hp < this.maxHp && !this.storage.nohp;
			}
			isHealthy() {
				return this.hp >= this.maxHp || this.storage.nohp;
			}
			isMaxHp(only, raw) {
				return game.players.every(value => {
					if (value.isOut() || value == this) return true;
					return only ? value.getHp(raw) < this.getHp(raw) : value.getHp(raw) <= this.getHp(raw);
				});
			}
			isMinHp(only, raw) {
				return game.players.every(value => {
					if (value.isOut() || value == this) return true;
					return only ? value.getHp(raw) > this.getHp(raw) : value.getHp(raw) >= this.getHp(raw);
				});
			}
			isMaxCard(only) {
				const numberOfCards = this.countCards('he');
				return game.players.every(value => {
					if (value.isOut() || value == this) return true;
					return only ? value.countCards('he') < numberOfCards : value.countCards('he') <= numberOfCards;
				});
			}
			isMinCard(only) {
				const numberOfCards = this.countCards('he');
				return game.players.every(value => {
					if (value.isOut() || value == this) return true;
					return only ? value.countCards('he') > numberOfCards : value.countCards('he') >= numberOfCards;
				});
			}
			isMaxHandcard(only) {
				const numberOfHandCards = this.countCards('h');
				return game.players.every(value => {
					if (value.isOut() || value == this) return true;
					return only ? value.countCards('h') < numberOfHandCards : value.countCards('h') <= numberOfHandCards;
				});
			}
			isMinHandcard(only) {
				const numberOfHandCards = this.countCards('h');
				return game.players.every(value => {
					if (value.isOut() || value == this) return true;
					return only ? value.countCards('h') > numberOfHandCards : value.countCards('h') >= numberOfHandCards;
				});
			}
			isMaxEquip(only) {
				const numberOfEquipAreaCards = this.countCards('e');
				return game.players.every(value => {
					if (value.isOut() || value == this) return true;
					return only ? value.countCards('e') < numberOfEquipAreaCards : value.countCards('e') <= numberOfEquipAreaCards;
				});
			}
			isMinEquip(only) {
				const numberOfEquipAreaCards = this.countCards('e');
				return game.players.every(value => {
					if (value.isOut() || value == this) return true;
					return only ? value.countCards('e') > numberOfEquipAreaCards : value.countCards('e') >= numberOfEquipAreaCards;
				});
			}
			isLinked() {
				if (get.is.linked2(this)) {
					return this.classList.contains('linked2');
				}
				return this.classList.contains('linked');
			}
			isTurnedOver() {
				return this.classList.contains('turnedover');
			}
			isOut() {
				return this.classList.contains('out');
			}
			isMin(distance) {
				if (distance && lib.config.mode != 'stone') return false;
				if (this.forcemin) return true;
				return this.classList.contains('minskin') && !game.chess;
			}
			isIn() {
				return this.classList.contains('dead') == false && this.classList.contains('out') == false && !this.removed;
			}
			isUnseen(num) {
				switch (num) {
					case 0: return this.classList.contains('unseen');
					case 1: return this.classList.contains('unseen2');
					case 2: return this.classList.contains('unseen') || this.classList.contains('unseen2');
					default: return this.classList.contains('unseen') && (!this.name2 || this.classList.contains('unseen2'));
				}
			}
			isUnderControl(self, me) {
				me = (me || game.me);
				var that = this._trueMe || this;
				if (that.isMad() || game.notMe) return false;
				if (this === me) {
					if (self) return true;
					return false;
				}
				if (that === me || this == me._trueMe) return true;
				if (_status.connectMode) return false;
				if (lib.config.mode == 'versus') {
					if (_status.mode == 'three') return this.side == me.side;
					if (_status.mode == 'standard') return lib.storage.single_control && this.side == me.side;
					if (_status.mode == 'four') return get.config('four_phaseswap') && this.side == me.side;
					if (_status.mode == 'two') return get.config('two_phaseswap') && this.side == me.side;
					return false;
				}
				else if (lib.config.mode == 'boss') {
					if (me.side) return false;
					return this.side == me.side && get.config('single_control');
				}
				else if (game.chess) {
					if (lib.config.mode == 'chess') {
						if (_status.mode == 'combat' && !get.config('single_control')) return false;
					}
					return this.side == me.side;
				}
				return false;
			}
			isOnline() {
				if (this.ws && lib.node && !this.ws.closed && this.ws.inited && !this.isAuto) {
					return true;
				}
				return false;
			}
			isOnline2() {
				if (this.ws && lib.node && !this.ws.closed) {
					return true;
				}
				return false;
			}
			isOffline() {
				if (this.ws && lib.node && this.ws.closed) {
					return true;
				}
				return false;
			}
			checkShow(skill, showonly) {
				var sourceSkill = get.info(skill);
				var noshow = false;
				if (sourceSkill && sourceSkill.sourceSkill) {
					skill = sourceSkill.sourceSkill;
				}
				if (lib.skill.global.contains(skill)) return false;
				if (get.mode() != 'guozhan' || game.expandSkills(this.getSkills()).contains(skill)) {
					if (showonly) {
						return false;
					}
					else {
						noshow = true;
					}
				}
				var unseen0 = this.isUnseen(0);
				var name1 = this.name1 || this.name;
				if (lib.character[name1] && (!showonly || unseen0)) {
					var skills = game.expandSkills(lib.character[name1][3].slice(0));
					if (skills.contains(skill)) {
						if (!noshow && this.isUnseen(0)) this.showCharacter(0);
						return 'main';
					}
				}
				var unseen1 = this.isUnseen(1);
				var name2 = this.name2;
				if (lib.character[name2] && (!showonly || unseen1)) {
					var skills = game.expandSkills(lib.character[name2][3].slice(0));
					if (skills.contains(skill)) {
						if (!noshow && this.isUnseen(1)) this.showCharacter(1);
						return 'vice';
					}
				}
				return false;
			}
			needsToDiscard(filter, add) {
				/**
				 * filter: typeof 'number' -> 额外摸等量牌(逻辑上)
				 *         typeof 'function' -> 只考虑符合函数筛选的牌
				 * add: 额外获得这张/些牌(逻辑上)
				 */
				let cards = this.getCards('h', card => !this.canIgnoreHandcard(card)), num = 0;
				if (get.itemtype(add) === 'cards') cards.addArray(add);
				else if (get.itemtype(add) === 'card') cards.push(add);
				if (typeof filter === 'number') num = filter;
				else if (typeof filter === 'function') cards = cards.filter(card => {
					return filter(card);
				});
				return Math.max(0, num + cards.length - this.getHandcardLimit());
			}
			distanceTo(target, method) {
				return get.distance(this, target, method);
			}
			distanceFrom(target, method) {
				return get.distance(target, this, method);
			}
			hasSkill(skill, arg2, arg3, arg4) {
				return game.expandSkills(this.getSkills(arg2, arg3, arg4)).contains(skill);
			}
			hasStockSkill(skill, arg1, arg2, arg3) {
				return game.expandSkills(this.getStockSkills(arg1, arg2, arg3)).contains(skill);
			}
			isZhu2() {
				var player = this, mode = get.mode();
				if (!this.isZhu) return false;
				if (mode == 'identity') {
					if (_status.mode == 'stratagem' && !this.identityShown) return false;
					return true;
				}
				if (mode == 'versus' && (_status.mode == 'four' || _status.mode == 'guandu')) return true;
				return false;
			}
			hasZhuSkill(skill, player) {
				if (!this.hasSkill(skill)) return false;
				if (player) {
					var mode = get.mode();
					if (mode == 'identity' && _status.mode == 'purple') {
						if (this.identity.slice(0, 1) != player.identity.slice(0, 1)) return false;
					}
					if (mode == 'versus' && (_status.mode == 'four' || _status.mode == 'guandu')) {
						if (this.side != player.side) return false;
					}
				}
				return true;
			}
			hasGlobalTag(tag, arg) {
				var skills = lib.skill.global.slice(0);
				game.expandSkills(skills);
				for (var i = 0; i < skills.length; i++) {
					var info = lib.skill[skills[i]];
					if (info && info.ai) {
						if (info.ai.skillTagFilter && info.ai[tag] &&
							info.ai.skillTagFilter(this, tag, arg) === false) continue;
						if (typeof info.ai[tag] == 'string') {
							if (info.ai[tag] == arg) return true;
						}
						else if (info.ai[tag]) {
							return true;
						}
					}
				}
				return false;
			}
			hasSkillTag(tag, hidden, arg, globalskill) {
				var skills = this.getSkills(hidden);
				if (globalskill) {
					skills.addArray(lib.skill.global);
				}
				game.expandSkills(skills);
				for (var i = 0; i < skills.length; i++) {
					var info = lib.skill[skills[i]];
					if (info && info.ai) {
						if (info.ai.skillTagFilter && info.ai[tag] &&
							info.ai.skillTagFilter(this, tag, arg) === false) continue;
						if (typeof info.ai[tag] == 'string') {
							if (info.ai[tag] == arg) return true;
						}
						else if (info.ai[tag]) {
							return true;
						}
					}
				}
				return false;
			}
			hasJudge(name) {
				if (name && typeof name == 'object') {
					name = name.viewAs || name.name;
				}
				var judges = this.getCards('j');
				for (var i = 0; i < judges.length; i++) {
					if ((judges[i].viewAs || judges[i].name) == name) {
						return true;
					}
				}
				return false;
			}
			hasFriend() {
				for (var i = 0; i < game.players.length; i++) {
					if (game.players[i].isOut()) continue;
					if (game.players[i] != this && get.attitude(game.players[i], this) > 0) {
						return true;
					}
				}
				return false;
			}
			hasUnknown(num) {
				var mode = get.mode();
				if (typeof num != 'number') {
					num = 0;
				}
				if (mode == 'identity' || mode == 'guozhan') {
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].ai.shown == 0 && game.players[i] != this) {
							num--;
							if (num <= 0) {
								return true;
							}
						}
					}
				}
				return false;
			}
			isUnknown(player) {
				var mode = get.mode();
				if (mode == 'identity' || mode == 'guozhan') {
					if (this.ai.shown == 0 && this != player) {
						return true;
					}
				}
				return false;
			}
			hasWuxie(info) {
				if (this.countCards('hs', 'wuxie')) return true;
				var skills = this.getSkills('invisible').concat(lib.skill.global);
				game.expandSkills(skills);
				for (var i = 0; i < skills.length; i++) {
					var ifo = get.info(skills[i]);
					if (ifo.hiddenWuxie && info) {
						if (typeof ifo.hiddenWuxie == 'function' && ifo.hiddenWuxie(this, info)) {
							return true;
						}
					}
					else if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == 'wuxie') {
						if (!ifo.viewAsFilter || ifo.viewAsFilter(this)) {
							return true;
						}
					}
					else {
						var hiddenCard = ifo.hiddenCard;
						if (typeof hiddenCard == 'function' && hiddenCard(this, 'wuxie')) {
							return true;
						}
					}
				}
				return false;
			}
			hasSha(respond, noauto) {
				if (this.countCards('hs', 'sha')) return true;
				if (this.countCards('hs', 'hufu')) return true;
				if (!noauto && this.countCards('hs', 'yuchanqian')) return true;
				if (this.hasSkillTag('respondSha', true, respond ? 'respond' : 'use', true)) return true;
				return this.hasUsableCard('sha');
			}
			hasShan() {
				if (this.countCards('hs', 'shan')) return true;
				if (this.countCards('hs', 'hufu')) return true;
				if (this.hasSkillTag('respondShan', true, null, true)) return true;
				return this.hasUsableCard('shan');
			}
			mayHaveSha(viewer, type, ignore, rvt) {
				/**
				 * type: skill tag type 'use', 'respond'
				 * ignore: ignore cards, ui.selected.cards added
				 * rvt: return value type 'count', 'odds', 'bool'(default)
				 */
				let count = 0;
				if ((this.hp > 2 || !this.isZhu && this.hp > 1) && this.hasSkillTag('respondSha', true, type, true)) {
					if (rvt === 'count') count++;
					else return true;
				}
				if (get.itemtype(viewer) !== 'player') viewer = _status.event.player;
				let cards, selected = get.copy(ui.selected.cards);
				if (get.itemtype(ignore) === 'cards') selected.addArray(ignore);
				else if (get.itemtype(ignore) === 'card') selected.add(ignore);
				if (this === viewer || get.itemtype(viewer) == 'player') cards = this.getKnownCards(viewer);
				else cards = this.getShownCards();
				count += cards.filter(card => {
					if (selected.includes(card)) return false;
					let name = get.name(card, this);
					if (name == 'sha' || name == 'hufu' || name == 'yuchanqian') {
						if (type === 'use') return lib.filter.cardEnabled(card, this);
						if (type === 'respond') return lib.filter.cardRespondable(card, this);
						return true;
					}
					return false;
				}).length;
				if (count && rvt !== 'count') return true;
				let hs = this.getCards('hs').filter(i => !cards.includes(i) && !selected.includes(i)).length;
				if (!hs) {
					if (rvt === 'count') return count;
					return false;
				}
				if (rvt === 'count') {
					if (this.isPhaseUsing()) return count + hs / 4;
					return count + hs / 4.8;
				}
				if (this.isPhaseUsing()) count += Math.pow(2 + hs, 2) / 40;
				else count += -1.5 * Math.log(1 - hs / 10);
				if (rvt === 'odds') return Math.min(1, count);
				return count > _status.event.getRand('mayHaveSha' + hs + this.playerid);
			}
			mayHaveShan(viewer, type, ignore, rvt) {
				/**
				 * type: skill tag type 'use', 'respond'
				 * ignore: ignore cards, ui.selected.cards added
				 * rvt: return value type 'count', 'odds', 'bool'(default)
				 */
				let count = 0;
				if ((this.hp > 2 || !this.isZhu && this.hp > 1) && this.hasSkillTag('respondShan', true, type, true)) {
					if (rvt === 'count') count++;
					else return true;
				}
				if (get.itemtype(viewer) !== 'player') viewer = _status.event.player;
				let cards, selected = get.copy(ui.selected.cards);
				if (get.itemtype(ignore) === 'cards') selected.addArray(ignore);
				else if (get.itemtype(ignore) === 'card') selected.add(ignore);
				if (this === viewer || get.itemtype(viewer) == 'player') cards = this.getKnownCards(viewer);
				else cards = this.getShownCards();
				count += cards.filter(card => {
					if (selected.includes(card)) return false;
					let name = get.name(card, this);
					if (name === 'shan' || name === 'hufu') {
						if (type === 'use') return lib.filter.cardEnabled(card, this, 'forceEnable');
						if (type === 'respond') return lib.filter.cardRespondable(card, this);
						return true;
					}
					return false;
				}).length;
				if (count && rvt !== 'count') return true;
				let hs = this.getCards('hs').filter(i => !cards.includes(i) && !selected.includes(i)).length;
				if (!hs) {
					if (rvt === 'count') return count;
					return false;
				}
				if (rvt === 'count') {
					if (this.isPhaseUsing()) return count + hs / 6;
					return count + hs / 3.5;
				}
				if (this.isPhaseUsing()) count += -1.5 * Math.log(1 - hs / 10);
				else count += 2 * hs / (5 + hs);
				if (rvt === 'odds') return Math.min(1, count);
				return count > _status.event.getRand('mayHaveShan' + hs + this.playerid);
			}
			hasCard(name, position) {
				if (typeof name == 'function') {
					var hs = this.getCards(position);
					for (var i = 0; i < hs.length; i++) {
						if (name(hs[i])) return true;
					}
				}
				else {
					if (this.countCards(position, name)) return true;
				}
				return false;
			}
			getEquip(name) {
				var es = this.getCards('e');
				if (typeof name == 'object' && get.info(name)) {
					name = get.info(name).subtype;
					if (name) {
						name = parseInt(name[5]);
					}
				}
				else if (typeof name == 'string' && name.startsWith('equip') && name.length == 6) {
					name = parseInt(name[5]);
				}
				if (!name) {
					return null;
				}
				for (var i = 0; i < es.length; i++) {
					if (typeof name === 'number') {
						if (get.info(es[i]).subtype === 'equip' + name) {
							return es[i];
						}
					}
					else {
						if (es[i].name === name) return es[i];
						var source = get.info(es[i]).source;
						if (Array.isArray(source) && source.contains(name)) {
							return es[i];
						}
					}
				}
				return null;
			}
			getJudge(name) {
				var judges = this.node.judges.childNodes;
				for (var i = 0; i < judges.length; i++) {
					if (judges[i].classList.contains('removing')) continue;
					if ((judges[i].viewAs || judges[i].name) == name) {
						return judges[i];
					}
				}
				return null;
			}
			$drawAuto(cards, target) {
				if (this.isUnderControl(true, target)) {
					this.$draw(cards);
				}
				else {
					this.$draw(cards.length);
				}
			}
			$draw(num, init, config) {
				if (init !== false && init !== 'nobroadcast') {
					game.broadcast(function (player, num, init, config) {
						player.$draw(num, init, config);
					}, this, num, init, config);
				}
				var cards, node;
				if (get.itemtype(num) == 'cards') {
					cards = num;
					num = cards.length;
				}
				else if (get.itemtype(num) == 'card') {
					cards = [num];
					num = 1;
				}
				if (init !== false) {
					if (cards) {
						game.addVideo('drawCard', this, get.cardsInfo(cards));
					}
					else {
						game.addVideo('draw', this, num);
					}
				}
				if (cards) {
					cards = cards.slice(0);
					node = cards.shift().copy('thrown', 'drawingcard');
				}
				else {
					node = ui.create.div('.card.thrown.drawingcard');
				}
				node.fixed = true;
				node.hide();

				var dx, dy;
				if (game.chess) {
					var rect = this.getBoundingClientRect();

					if (rect.left <= 80) {
						dx = -10;
						if (rect.top <= 80) {
							dy = -10;
						}
						else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
							dy = 10;
						}
						else {
							dy = 0;
						}
					}
					else if (rect.left + rect.width + 80 >= ui.chessContainer.offsetWidth) {
						dx = 10;
						if (rect.top <= 80) {
							dy = -10;
						}
						else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
							dy = 10;
						}
						else {
							dy = 0;
						}
					}
					else if (rect.top <= 80) {
						dx = 0;
						dy = -10;
					}
					else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
						dx = 0;
						dy = 10;
					}
					else {
						dx = rect.left + this.offsetWidth / 2 - ui.arena.offsetWidth / 2;
						dy = rect.top + this.offsetHeight / 2 - ui.arena.offsetHeight / 2;
					}

					var coeff = 240 / Math.sqrt(dx * dx + dy * dy);
					dx *= coeff;
					dy *= coeff;

					node.style.left = (this.getLeft() + this.offsetWidth / 2 - 52 - dx) + 'px';
					node.style.top = (this.getTop() + this.offsetHeight / 2 - 52 - dy) + 'px';
					this.parentNode.appendChild(node);
				}
				else {
					this.parentNode.appendChild(node);
					node.style.left = 'calc(50% - 52px)';
					node.style.top = 'calc(50% - 52px)';

					dx = this.getLeft() + this.offsetWidth / 2 - 52 - node.offsetLeft;
					dy = this.getTop() + this.offsetHeight / 2 - 52 - node.offsetTop;

					if (get.is.mobileMe(this)) {
						dx += get.cardOffset();
						if (ui.arena.classList.contains('oblongcard')) {
							dy -= 16;
						}
					}
				}
				node.style.transitionDuration = '0.8s';
				ui.refresh(node);
				if (typeof num == 'number' && init !== false) {
					config = {
						total: num,
						current: 1
					};
				}
				if (config && config.total > 1) {
					var total = config.total, current = config.current;
					var dxtotal;
					if (total <= 5) {
						dxtotal = Math.min(80, (total - 1) * 20);
						dx += -dxtotal + 2 * dxtotal * (current - 1) / (total - 1);
					}
					else {
						var total2 = Math.floor(total / 2);
						if (current <= total2) {
							total = total2;
							dy -= 20;
						}
						else {
							current -= total2;
							total -= total2;
							dy += 20;
						}
						dxtotal = Math.min(80, (total - 1) * 20);
						dx += -dxtotal + 2 * dxtotal * (current - 1) / (total - 1);
					}
					config.current++;
				}
				if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
					node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
				}
				else {
					node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
				}
				node.show();

				node.listenTransition(function () {
					node.style.transitionDuration = '0.5s';
					ui.refresh(node);
					node.delete();
				});
				var that = this;
				if (num && num > 1) {
					if (config && config.total > 1) {
						setTimeout(function () {
							if (cards) {
								that.$draw(cards, false, config);
							}
							else {
								that.$draw(num - 1, false, config);
							}
						}, 50);
					}
					else {
						setTimeout(function () {
							if (cards) {
								that.$draw(cards, false, config);
							}
							else {
								that.$draw(num - 1, false, config);
							}
						}, 200);
					}
				}
			}
			$compareMultiple(card1, targets, cards) {
				game.broadcast(function (player, card1, targets, cards) {
					player.$compareMultiple(card1, targets, cards);
				}, this, card1, targets, cards);
				game.addVideo('compareMultiple', this, [get.cardInfo(card1), get.targetsInfo(targets), get.cardsInfo(cards)]);
				var player = this;
				var node1 = player.$throwxy2(card1,
					'calc(50% - 52px)', 'calc(50% + 10px)', 'perspective(600px) rotateY(180deg)', true
				);
				if (lib.config.cardback_style != 'default') {
					node1.style.transitionProperty = 'none';
					ui.refresh(node1);
					node1.classList.add('infohidden');
					ui.refresh(node1);
					node1.style.transitionProperty = '';
				}
				else {
					node1.classList.add('infohidden');
				}

				node1.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
				var onEnd01 = function () {
					//node1.removeEventListener('webkitTransitionEnd',onEnd01);
					setTimeout(function () {
						node1.style.transition = 'all ease-in 0.3s';
						node1.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
						var onEnd = function () {
							node1.classList.remove('infohidden');
							node1.style.transition = 'all 0s';
							ui.refresh(node1);
							node1.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
							ui.refresh(node1);
							node1.style.transition = '';
							ui.refresh(node1);
							node1.style.transform = '';
							//node1.removeEventListener('webkitTransitionEnd',onEnd);
						};
						node1.listenTransition(onEnd);
					}, 300);
				};
				node1.listenTransition(onEnd01);

				setTimeout(function () {
					var left0 = -targets.length * 52 - (targets.length - 1) * 8;
					for (var i = 0; i < targets.length; i++) {
						(function (target, card2, i) {
							var left = left0 + i * 120;
							var node2;
							if (left < 0) {
								node2 = target.$throwxy2(card2,
									'calc(50% - ' + (-left) + 'px)', 'calc(50% - 114px)', 'perspective(600px) rotateY(180deg)', true
								);
							}
							else {
								node2 = target.$throwxy2(card2,
									'calc(50% + ' + left + 'px)', 'calc(50% - 114px)', 'perspective(600px) rotateY(180deg)', true
								);
							}
							if (lib.config.cardback_style != 'default') {
								node2.style.transitionProperty = 'none';
								ui.refresh(node2);
								node2.classList.add('infohidden');
								ui.refresh(node2);
								node2.style.transitionProperty = '';
							}
							else {
								node2.classList.add('infohidden');
							}
							node2.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
							var onEnd02 = function () {
								//node2.removeEventListener('webkitTransitionEnd',onEnd02);
								setTimeout(function () {
									node2.style.transition = 'all ease-in 0.3s';
									node2.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
									var onEnd = function () {
										node2.classList.remove('infohidden');
										node2.style.transition = 'all 0s';
										ui.refresh(node2);
										node2.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
										ui.refresh(node2);
										node2.style.transition = '';
										ui.refresh(node2);
										node2.style.transform = '';
										//node2.removeEventListener('webkitTransitionEnd',onEnd);
									};
									node2.listenTransition(onEnd);
								}, 200);
							};
							node2.listenTransition(onEnd02);
						}(targets[i], cards[i], i));
					}
				}, 200);
			}
			$compare(card1, target, card2) {
				game.broadcast(function (player, target, card1, card2) {
					player.$compare(card1, target, card2);
				}, this, target, card1, card2);
				game.addVideo('compare', this, [get.cardInfo(card1), target.dataset.position, get.cardInfo(card2)]);
				var player = this;
				var node1 = player.$throwxy2(card1,
					'calc(50% - 114px)', 'calc(50% - 52px)', 'perspective(600px) rotateY(180deg)', true
				);
				if (lib.config.cardback_style != 'default') {
					node1.style.transitionProperty = 'none';
					ui.refresh(node1);
					node1.classList.add('infohidden');
					ui.refresh(node1);
					node1.style.transitionProperty = '';
				}
				else {
					node1.classList.add('infohidden');
				}

				node1.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
				var onEnd01 = function () {
					//node1.removeEventListener('webkitTransitionEnd',onEnd01);
					setTimeout(function () {
						node1.style.transition = 'all ease-in 0.3s';
						node1.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
						var onEnd = function () {
							node1.classList.remove('infohidden');
							node1.style.transition = 'all 0s';
							ui.refresh(node1);
							node1.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
							ui.refresh(node1);
							node1.style.transition = '';
							ui.refresh(node1);
							node1.style.transform = '';
							//node1.removeEventListener('webkitTransitionEnd',onEnd);
						};
						node1.listenTransition(onEnd);
					}, 300);
				};
				node1.listenTransition(onEnd01);
				setTimeout(function () {
					var node2 = target.$throwxy2(card2,
						'calc(50% + 10px)', 'calc(50% - 52px)', 'perspective(600px) rotateY(180deg)', true
					);
					if (lib.config.cardback_style != 'default') {
						node2.style.transitionProperty = 'none';
						ui.refresh(node2);
						node2.classList.add('infohidden');
						ui.refresh(node2);
						node2.style.transitionProperty = '';
					}
					else {
						node2.classList.add('infohidden');
					}
					node2.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
					var onEnd02 = function () {
						//node2.removeEventListener('webkitTransitionEnd',onEnd02);
						setTimeout(function () {
							node2.style.transition = 'all ease-in 0.3s';
							node2.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
							var onEnd = function () {
								node2.classList.remove('infohidden');
								node2.style.transition = 'all 0s';
								ui.refresh(node2);
								node2.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
								ui.refresh(node2);
								node2.style.transition = '';
								ui.refresh(node2);
								node2.style.transform = '';
								//node2.removeEventListener('webkitTransitionEnd',onEnd);
							};
							node2.listenTransition(onEnd);
						}, 200);
					};
					node2.listenTransition(onEnd02);
				}, 200);
			}
			$throw(card, time, init, nosource) {
				if (typeof card == 'number') {
					var tmp = card;
					card = [];
					while (tmp--) {
						var cardx = ui.create.card();
						cardx.classList.add('infohidden');
						cardx.classList.add('infoflip');
						card.push(cardx);
					}
				}
				if (init !== false) {
					if (init !== 'nobroadcast') {
						game.broadcast(function (player, card, time, init, nosource) {
							player.$throw(card, time, init, nosource);
						}, this, card, time, init);
					}
					if (get.itemtype(card) != 'cards') {
						if (get.itemtype(card) == 'card') {
							card = [card];
						}
						else {
							return;
						}
					}
					game.addVideo('throw', this, [get.cardsInfo(card), time, nosource]);
				}
				if (game.chess) {
					this.chessFocus();
				}
				if (get.itemtype(card) == 'cards') {
					var node;
					for (var i = 0; i < card.length; i++) {
						node = this.$throw(card[i], time, false, nosource);
					}
					return node;
				}
				else {
					var node;
					if (card == undefined || card.length == 0) return;
					node = this.$throwordered(card.copy('thrown'), nosource);
					if (time != undefined) {
						node.fixed = true;
						setTimeout(function () { node.delete(); }, time);
					}
					lib.listenEnd(node);
					return node;
				}
			}
			$throwordered() {
				return this.$throwordered2.apply(this, arguments);
				// if(lib.config.low_performance){
				// 	return this.$throwordered2.apply(this,arguments);
				// }
				// else{
				// 	return this.$throwordered1.apply(this,arguments);
				// }
			}
			$throwordered1(node, nosource) {
				node.classList.add('thrown');
				node.hide();
				node.style.transitionProperty = 'left,top,opacity,transform';
				for (var i = 0; i < ui.thrown.length; i++) {
					if (ui.thrown[i].parentNode != ui.arena ||
						ui.thrown[i].classList.contains('removing')) {
						ui.thrown.splice(i--, 1);
					}
				}
				ui.thrown.push(node);
				var uithrowns = ui.thrown.slice(0);
				var tops;
				if (game.chess) {
					switch (Math.floor((ui.thrown.length - 1) / 4)) {
						case 0:
							tops = ['calc(50% - 82px)'];
							break;
						case 1:
							tops = ['calc(50% - 139px)', 'calc(50% - 25px)'];
							break;
						case 2:
							tops = ['calc(50% - 196px)', 'calc(50% - 82px)', 'calc(50% + 32px)'];
							break;
						default:
							tops = ['calc(50% - 253px)', 'calc(50% - 139px)',
								'calc(50% - 25px)', 'calc(50% + 89px)'];
					}
				}
				else {
					switch (Math.floor((ui.thrown.length - 1) / 4)) {
						case 0:
							tops = ['calc(50% - 52px)'];
							break;
						case 1:
							tops = ['calc(50% - 109px)', 'calc(50% + 5px)'];
							break;
						case 2:
							tops = ['calc(50% - 166px)', 'calc(50% - 52px)', 'calc(50% + 62px)'];
							break;
						default:
							tops = ['calc(50% - 223px)', 'calc(50% - 109px)',
								'calc(50% + 5px)', 'calc(50% + 119px)'];
					}
				}
				while (uithrowns.length) {
					var throwns = uithrowns.splice(0, Math.min(uithrowns.length, 4));
					switch (throwns.length) {
						case 1:
							throwns[0].style.left = 'calc(50% - 52px)';
							break;
						case 2:
							throwns[0].style.left = 'calc(50% - 109px)';
							throwns[1].style.left = 'calc(50% + 5px)';
							break;
						case 3:
							throwns[0].style.left = 'calc(50% - 166px)';
							throwns[1].style.left = 'calc(50% - 52px)';
							throwns[2].style.left = 'calc(50% + 62px)';
							break;
						case 4:
							throwns[0].style.left = 'calc(50% - 223px)';
							throwns[1].style.left = 'calc(50% - 109px)';
							throwns[2].style.left = 'calc(50% + 5px)';
							throwns[3].style.left = 'calc(50% + 119px)';
							break;
					}
					var top;
					if (tops.length) {
						top = tops.shift();
					}
					else {
						if (game.chess) {
							top = 'calc(50% - 82px)';
						}
						else {
							top = 'calc(50% - 52px)';
						}
					}
					for (var i = 0; i < throwns.length; i++) {
						throwns[i].style.top = top;
					}
				}
				if (nosource) {
					node.style.transform = 'scale(0)';
					node.classList.add('center');
				}
				else {
					var parseCalc = function (str) {
						var per = str.slice(str.indexOf('calc(') + 5, str.indexOf('%'));
						var add = str.slice(str.indexOf('%') + 1, str.indexOf('px')).replace(/\s/g, '');
						return [parseInt(per), parseInt(add)];
					};
					var nx = parseCalc(node.style.left);
					var ny = parseCalc(node.style.top);
					nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
					ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
					var dx, dy;
					if (game.chess) {
						var rect = this.getBoundingClientRect();
						dx = rect.left + this.offsetWidth / 2 - 52 - nx;
						dy = rect.top + this.offsetHeight / 2 - 52 - ny;
					}
					else {
						dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
						dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
						if (get.is.mobileMe(this)) {
							dx += get.cardOffset();
							if (ui.arena.classList.contains('oblongcard')) {
								dy -= 16;
							}
						}
					}
					if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
						node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
					}
					else {
						node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
					}
				}
				ui.arena.appendChild(node);
				ui.refresh(node);
				node.style.transform = '';
				node.show();
				lib.listenEnd(node);
				return node;
			}
			$throwordered2(node, nosource) {
				node.classList.add('thrown');
				node.classList.add('center');
				node.hide();
				node.style.transitionProperty = 'left,top,opacity,transform';

				if (nosource) {
					// node.style.transform='scale(0)';
				}
				else {
					var nx = [50, -52];
					var ny = [50, -52];
					nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
					ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
					var dx, dy;
					if (game.chess) {
						var rect = this.getBoundingClientRect();
						dx = rect.left + this.offsetWidth / 2 - 52 - nx;
						dy = rect.top + this.offsetHeight / 2 - 52 - ny;
					}
					else {
						dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
						dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
						if (get.is.mobileMe(this)) {
							dx += get.cardOffset();
							if (ui.arena.classList.contains('oblongcard')) {
								dy -= 16;
							}
						}
					}
					if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
						node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
					}
					else {
						node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
					}
				}
				ui.arena.appendChild(node);
				ui.refresh(node);

				for (var i = 0; i < ui.thrown.length; i++) {
					if (ui.thrown[i].parentNode != ui.arena ||
						ui.thrown[i].classList.contains('removing')) {
						ui.thrown.splice(i--, 1);
					}
				}
				ui.thrown.push(node);
				var uithrowns = ui.thrown.slice(0);
				var tops;
				switch (Math.floor((ui.thrown.length - 1) / 4)) {
					case 0:
						tops = [0];
						break;
					case 1:
						tops = [-57, 57];
						break;
					case 2:
						tops = [-114, 0, 114];
						break;
					default:
						tops = [-171, -57, 57, 171];
				}
				while (uithrowns.length) {
					var throwns = uithrowns.splice(0, Math.min(uithrowns.length, 4));
					switch (throwns.length) {
						case 1:
							throwns[0]._transthrown = 'translate(0px,';
							break;
						case 2:
							throwns[0]._transthrown = 'translate(-57px,';
							throwns[1]._transthrown = 'translate(57px,';
							break;
						case 3:
							throwns[0]._transthrown = 'translate(-114px,';
							throwns[1]._transthrown = 'translate(0,';
							throwns[2]._transthrown = 'translate(114px,';
							break;
						case 4:
							throwns[0]._transthrown = 'translate(-171px,';
							throwns[1]._transthrown = 'translate(-57px,';
							throwns[2]._transthrown = 'translate(57px,';
							throwns[3]._transthrown = 'translate(171px,';
							break;
					}
					var top;
					if (tops.length) {
						top = tops.shift();
					}
					else {
						top = 0;
					}
					if (game.chess) {
						top -= 30;
					}
					for (var i = 0; i < throwns.length; i++) {
						throwns[i].style.transform = throwns[i]._transthrown + top + 'px)';
						delete throwns[i]._transthrown;
					}
				}

				node.show();
				lib.listenEnd(node);
				return node;
			}
			$throwxy(card, left, top) {
				var node = card.copy('thrown', 'thrownhighlight');
				node.dataset.position = this.dataset.position;
				node.hide();
				node.style.transitionProperty = 'left,top,opacity';

				ui.arena.appendChild(node);
				ui.refresh(node);
				node.show();
				node.style.left = left;
				node.style.top = top;
				lib.listenEnd(node);
				return node;
			}
			$throwxy2(card, left, top, trans, flipx, flipy) {
				if (game.chess) {
					return this.$throwxy.apply(this, arguments);
				}
				var node = card.copy('thrown', 'thrownhighlight');
				node.style.left = left;
				node.style.top = top;
				node.hide();
				// node.style.transitionProperty='left,top,opacity,transform';

				var parseCalc = function (str) {
					var per = str.slice(str.indexOf('calc(') + 5, str.indexOf('%'));
					var add = str.slice(str.indexOf('%') + 1, str.indexOf('px')).replace(/\s/g, '');
					return [parseInt(per), parseInt(add)];
				};
				var nx = parseCalc(node.style.left);
				var ny = parseCalc(node.style.top);
				nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
				ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
				var dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
				var dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
				if (flipx) dx = -dx;
				if (flipy) dy = -dy;
				if (trans) {
					node.style.transform = trans + ' translate(' + dx + 'px,' + dy + 'px)';
				}
				else {
					node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
				}

				ui.arena.appendChild(node);
				ui.refresh(node);
				node.show();
				// node.style.transform=trans||'';
				lib.listenEnd(node);
				return node;
			}
			throwDice(num) {
				if (typeof num != 'number') {
					num = get.rand(6) + 1;
					_status.event.num = num;
				}
				if (!game.online) {
					game.pause();
				}
				game.broadcastAll(function (num) {
					var diceContainer = ui.create.div('.fullsize.dice-container', ui.window);
					ui.window.classList.add('dicepaused');
					var dice = ui.create.div('.dice');
					var side;

					side = ui.create.div('.side.front', dice);
					ui.create.div('.dot.center', side);
					ui.create.div('.side.front.inner', dice);

					side = ui.create.div('.side.top', dice);
					ui.create.div('.dot.dtop.dleft', side);
					ui.create.div('.dot.dbottom.dright', side);
					ui.create.div('.side.top.inner', dice);

					side = ui.create.div('.side.right', dice);
					ui.create.div('.dot.dtop.dleft', side);
					ui.create.div('.dot.center', side);
					ui.create.div('.dot.dbottom.dright', side);
					ui.create.div('.side.right.inner', dice);

					side = ui.create.div('.side.left', dice);
					ui.create.div('.dot.dtop.dleft', side);
					ui.create.div('.dot.dtop.dright', side);
					ui.create.div('.dot.dbottom.dleft', side);
					ui.create.div('.dot.dbottom.dright', side);
					ui.create.div('.side.left.inner', dice);

					side = ui.create.div('.side.bottom', dice);
					ui.create.div('.dot.center', side);
					ui.create.div('.dot.dtop.dleft', side);
					ui.create.div('.dot.dtop.dright', side);
					ui.create.div('.dot.dbottom.dleft', side);
					ui.create.div('.dot.dbottom.dright', side);
					ui.create.div('.side.bottom.inner', dice);

					side = ui.create.div('.side.back', dice);
					ui.create.div('.dot.dtop.dleft', side);
					ui.create.div('.dot.dtop.dright', side);
					ui.create.div('.dot.dbottom.dleft', side);
					ui.create.div('.dot.dbottom.dright', side);
					ui.create.div('.dot.center dleft', side);
					ui.create.div('.dot.center dright', side);
					ui.create.div('.side.back.inner', dice);

					ui.create.div('.side.cover.x', dice);
					ui.create.div('.side.cover.y', dice);
					ui.create.div('.side.cover.z', dice);

					var map = {
						1: [75, 0, 45],
						2: [-15, 45, 0],
						3: [165, -45, 90],
						4: [345, -45, 90],
						5: [345, -45, 180],
						6: [255, 0, 135]
					};
					dice.roll = function (deg) {
						if (typeof deg == 'number') {
							dice.current[0] += deg;
							deg = dice.current;
						}
						deg = deg.slice(0);
						dice.current = deg;
						this.style.transform = 'rotateX(' + deg[0] + 'deg) rotateY(' + deg[1] + 'deg) rotateZ(' + deg[2] + 'deg)';
					};
					dice.roll(map[num]);
					diceContainer.appendChild(dice);
					ui.refresh(dice);
					dice.roll(1025);

					dice.addEventListener('webkitTransitionEnd', function () {
						if (!dice.over) {
							dice.style.transition = 'transform 0.8s ease';
							dice.roll(-20);
							dice.over = true;
						}
						else if (!dice.resumed) {
							setTimeout(function () {
								diceContainer.delete();
								ui.window.classList.remove('dicepaused');
							}, 300);
							if (!game.online) {
								setTimeout(game.resume, 800);
							}
							dice.resumed = true;
						}
					});
				}, num);
			}
			$giveAuto(card, player) {
				if (Array.isArray(card) && card.length == 0) return;
				var args = Array.from(arguments);
				if (_status.connectMode || (!this.isUnderControl(true) && !player.isUnderControl(true))) {
					if (Array.isArray(card)) {
						card = card.length;
					}
					else {
						card = 1;
					}
					args[0] = card;
				}
				return this.$give.apply(this, args);
			}
			$give(card, player, log, init) {
				if (init !== false) {
					game.broadcast(function (source, card, player, init) {
						source.$give(card, player, false, init);
					}, this, card, player, init);
					if (typeof card == 'number' && card >= 0) {
						game.addVideo('give', this, [card, player.dataset.position]);
					}
					else {
						if (get.itemtype(card) == 'card') {
							card = [card];
						}
						if (get.itemtype(card) == 'cards') {
							game.addVideo('giveCard', this, [get.cardsInfo(card), player.dataset.position]);
						}
					}
				}
				if (get.itemtype(card) == 'cards') {
					if (log != false && !_status.video) {
						game.log(player, '从', this, '获得了', card);
					}
					if (this.$givemod) {
						this.$givemod(card, player);
					}
					else {
						for (var i = 0; i < card.length; i++) {
							this.$give(card[i], player, false, false);
						}
					}
				}
				else if (typeof card == 'number' && card >= 0) {
					if (log != false && !_status.video) {
						game.log(player, '从', this, '获得了' + get.cnNumber(card) + '张牌');
					}
					if (this.$givemod) {
						this.$givemod(card, player);
					}
					else {
						while (card--) this.$give('', player, false, false);
					}
				}
				else {
					if (log != false && !_status.video) {
						if (get.itemtype(card) == 'card' && log != false) {
							game.log(player, '从', this, '获得了', card);
						}
						else {
							game.log(player, '从', this, '获得了一张牌');
						}
					}
					if (this.$givemod) {
						this.$givemod(card, player);
					}
					else {
						var node;
						if (get.itemtype(card) == 'card') {
							node = card.copy('card', 'thrown', false);
						}
						else {
							node = ui.create.div('.card.thrown');
						}
						// node.dataset.position=this.dataset.position;
						node.fixed = true;
						this.$throwordered(node);
						// lib.listenEnd(node);
						// node.hide();
						// node.style.transitionProperty='left,top,opacity';
						//
						// node.style.transform='rotate('+(Math.random()*16-8)+'deg)';
						//
						// ui.arena.appendChild(node);
						// ui.refresh(node);
						// node.show();
						// node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
						// node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*80+'px)';

						node.listenTransition(function () {
							var dx = player.getLeft() + player.offsetWidth / 2 - 52 - node.offsetLeft;
							var dy = player.getTop() + player.offsetHeight / 2 - 52 - node.offsetTop;
							if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
								node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
							}
							else {
								node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
							}

							node.delete();
						});
						// setTimeout(function(){
						// 	// node.removeAttribute('style');
						// 	// node.dataset.position=player.dataset.position;
						// 	var dx=player.offsetLeft+player.offsetWidth/2-52-node.offsetLeft;
						// 	var dy=player.offsetTop+player.offsetHeight/2-52-node.offsetTop;
						// 	if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
						// 		node.style.transform+=' translate('+dx+'px,'+dy+'px)';
						// 	}
						// 	else{
						// 		node.style.transform='translate('+dx+'px,'+dy+'px)';
						// 	}
						//
						// 	node.delete();
						// },700);
					}
				}
			}
			$equip(card) {
				game.broadcast(function (player, card) {
					player.$equip(card);
				}, this, card);
				card.fix();
				card.style.transform = '';
				card.classList.remove('drawinghidden');
				delete card._transform;
				var player = this;
				var equipNum = get.equipNum(card);
				var equipped = false;
				for (var i = 0; i < player.node.equips.childNodes.length; i++) {
					if (get.equipNum(player.node.equips.childNodes[i]) >= equipNum) {
						player.node.equips.insertBefore(card, player.node.equips.childNodes[i]);
						equipped = true;
						break;
					}
				}
				if (!equipped) {
					player.node.equips.appendChild(card);
					if (_status.discarded) {
						_status.discarded.remove(card);
					}
				}
				var info = get.info(card);
				if (info.skills) {
					for (var i = 0; i < info.skills.length; i++) {
						player.addSkillTrigger(info.skills[i]);
					}
				}
				return player;
			}
			$gain(card, log, init) {
				if (init !== false) {
					game.broadcast(function (player, card, init) {
						player.$gain(card, false, init);
					}, this, card, init);
					if (typeof card == 'number' && card >= 0) {
						game.addVideo('gain', this, card);
					}
					else {
						if (get.itemtype(card) == 'card') {
							card = [card];
						}
						if (get.itemtype(card) == 'cards') {
							game.addVideo('gainCard', this, get.cardsInfo(card));
						}
						else {
							game.addVideo('gain', this, 1);
						}
					}
				}
				if (get.itemtype(card) == 'cards') {
					if (log != false && !_status.video) {
						game.log(this, '获得了', card);
					}
					if (this.$gainmod) {
						this.$gainmod(card);
					}
					else {
						for (var i = 0; i < card.length; i++) {
							this.$gain(card[i], false, false);
						}
					}
				}
				else if (typeof card == 'number' && card > 1) {
					if (log != false && !_status.video) {
						game.log(this, '获得了' + get.cnNumber(card) + '张牌');
					}
					if (this.$gainmod) {
						this.$gainmod(card);
					}
					else {
						for (var i = 0; i < card; i++) {
							this.$gain(1, false, false);
						}
					}
				}
				else {
					if (get.itemtype(card) == 'card' && log != false && !_status.video) {
						game.log(this, '获得了', card);
					}
					if (this.$gainmod) {
						this.$gainmod(card);
					}
					else {
						var node;
						if (get.itemtype(card) == 'card') {
							// node=this.$throwordered(card.copy(),true);
							node = card.copy('thrown', false);
						}
						else {
							// node=this.$throwordered(ui.create.div('.card.thrown'),true);
							node = ui.create.div('.card.thrown');
							node.moveTo = lib.element.Card.prototype.moveTo;
							node.moveDelete = lib.element.Card.prototype.moveDelete;
						}
						node.fixed = true;
						node.style.left = 'calc(50% - 52px ' + ((Math.random() - 0.5 < 0) ? '+' : '-') + ' ' + Math.random() * 100 + 'px)';
						node.style.top = 'calc(50% - 52px ' + ((Math.random() - 0.5 < 0) ? '+' : '-') + ' ' + Math.random() * 100 + 'px)';
						node.style.transform = 'scale(0)';
						node.hide();
						ui.arena.appendChild(node);
						ui.refresh(node);
						node.show();
						node.style.transform = '';

						lib.listenEnd(node);
						var player = this;
						setTimeout(function () {
							node.moveDelete(player);
						}, 700);
					}
				}
			}
			$gain2(cards, log) {
				if (log === true) {
					game.log(this, '获得了', cards);
				}
				game.broadcast(function (player, cards) {
					player.$gain2(cards);
				}, this, cards);
				if (get.itemtype(cards) == 'card') cards = [cards];
				else if (get.itemtype(cards) != 'cards') return;
				var list = [], list2 = [];
				for (var i = 0; i < cards.length; i++) {
					if (cards[i].clone &&
						(cards[i].clone.parentNode == this.parentNode ||
							cards[i].clone.parentNode == ui.arena) &&
						parseFloat(getComputedStyle(cards[i].clone).opacity) > 0.3) {
						cards[i].clone.moveDelete(this);
						list2.push(cards[i].clone);
					}
					else {
						list.push(cards[i]);
					}
				}
				if (list2.length) {
					game.addVideo('gain2', this, get.cardsInfo(list2));
				}
				if (list.length) {
					this.$draw(list, 'nobroadcast');
					return true;
				}
			}
			$skill(name, type, color, avatar) {
				if (typeof type != 'string') type = 'legend';
				if (!avatar) {
					this.playerfocus(1500);
					game.delay(2);
				}
				else {
					game.addVideo('playerfocus2');
					game.broadcastAll(function () {
						ui.arena.classList.add('playerfocus');
						setTimeout(function () {
							ui.arena.classList.remove('playerfocus');
						}, 1800);
					});
					game.delay(3);
				}
				var that = this;
				setTimeout(function () {
					game.broadcastAll(function (that, type, name, color, avatar) {
						if (lib.config.animation && !lib.config.low_performance) {
							if (game.chess) {
								that['$' + type + '2'](1200);
							}
							else {
								that['$' + type](1200);
							}
						}
						if (name) {
							that.$fullscreenpop(name, color, avatar);
						}
					}, that, type, name, color, avatar);
				}, avatar ? 0 : 300);
			}
			$fire() {
				game.addVideo('flame', this, 'fire');
				var left, top;
				if (game.chess) {
					var rect = this.getBoundingClientRect();
					left = rect.left;
					top = rect.top;
				}
				else {
					left = this.getLeft();
					top = this.getTop();
				}
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 20, 700, 'fire');
			}
			$thunder() {
				game.addVideo('flame', this, 'thunder');
				var left, top;
				if (game.chess) {
					var rect = this.getBoundingClientRect();
					left = rect.left;
					top = rect.top;
				}
				else {
					left = this.getLeft();
					top = this.getTop();
				}
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, 700, 'thunder');
			}
			$rare2() {
				game.addVideo('flame', this, 'rare2');
				var rect = this.getBoundingClientRect();
				var left = rect.left;
				var top = rect.top + 15;
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, 700, 'rare');
			}
			$epic2() {
				game.addVideo('flame', this, 'epic2');
				var rect = this.getBoundingClientRect();
				var left = rect.left;
				var top = rect.top + 15;
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, 700, 'epic');
			}
			$legend2() {
				game.addVideo('flame', this, 'legend2');
				var rect = this.getBoundingClientRect();
				var left = rect.left;
				var top = rect.top + 15;
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, 700, 'legend');
			}
			$rare(time) {
				time = time || 700;
				game.addVideo('flame', this, 'rare');
				var left, top;
				if (game.chess) {
					left = this.getLeft() - ui.arena.offsetLeft;
					top = this.getTop() - ui.arena.offsetTop;
				}
				else {
					left = this.getLeft();
					top = this.getTop();
				}
				if (this.classList.contains('minskin')) {
					top += 15;
				}
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, time, 'rare');
			}
			$epic(time) {
				time = time || 700;
				game.addVideo('flame', this, 'epic');
				var left, top;
				if (game.chess) {
					left = this.getLeft() - ui.arena.offsetLeft;
					top = this.getTop() - ui.arena.offsetTop;
				}
				else {
					left = this.getLeft();
					top = this.getTop();
				}
				if (this.classList.contains('minskin')) {
					top += 15;
				}
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, time, 'epic');
			}
			$legend(time) {
				time = time || 700;
				game.addVideo('flame', this, 'legend');
				var left, top;
				if (game.chess) {
					left = this.getLeft() - ui.arena.offsetLeft;
					top = this.getTop() - ui.arena.offsetTop;
				}
				else {
					left = this.getLeft();
					top = this.getTop();
				}
				if (this.classList.contains('minskin')) {
					top += 15;
				}
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, time, 'legend');
			}
			$coin() {
				game.broadcast(function (player) {
					if (!lib.config.low_performance) {
						player.$coin();
					}
				}, this);
				game.addVideo('flame', this, 'coin');
				var left = this.getLeft() - ui.arena.offsetLeft;
				var top = this.getTop() - ui.arena.offsetTop;
				if (this.classList.contains('minskin')) {
					top += 15;
				}
				top -= 25;
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, 700, 'coin');
			}
			$dust() {
				game.broadcast(function (player) {
					if (!lib.config.low_performance) {
						player.$dust();
					}
				}, this);
				game.addVideo('flame', this, 'dust');
				var left = this.getLeft() - ui.arena.offsetLeft;
				var top = this.getTop() - ui.arena.offsetTop;
				if (this.classList.contains('minskin')) {
					top += 15;
				}
				top -= 25;
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, 700, 'dust');
			}
			$recover() {
				game.addVideo('flame', this, 'recover');
				var left, top;
				if (game.chess) {
					var rect = this.getBoundingClientRect();
					left = rect.left;
					top = rect.top;
				}
				else {
					left = this.getLeft();
					top = this.getTop();
				}
				game.animate.flame(left + this.offsetWidth / 2,
					top + this.offsetHeight - 30, 700, 'recover');
			}
			$fullscreenpop(str, nature, avatar, broadcast) {
				if (broadcast !== false) game.broadcast(function (player, str, nature, avatar) {
					player.$fullscreenpop(str, nature, avatar);
				}, this, str, nature, avatar);
				game.addVideo('fullscreenpop', this, [str, nature, avatar]);
				var node = ui.create.div('.damage');
				if (avatar && this.node) {
					if (avatar == 'vice') {
						if (lib.character[this.name2]) {
							avatar = this.node.avatar2;
						}
					}
					else {
						if (lib.character[this.name]) {
							avatar = this.node.avatar;
						}
					}
					if (!get.is.div(avatar)) {
						avatar = false;
					}
				}
				else {
					avatar = false;
				}
				if (avatar) {
					node.classList.add('fullscreenavatar');
					ui.create.div('', ui.create.div(node));
					// ui.create.div('',str.split('').join('<br>'),ui.create.div('.text.textbg',node));
					ui.create.div('', '<div>' + str.split('').join('</div><br><div>') + '</div>', ui.create.div('.text', node));
					node.firstChild.firstChild.style.backgroundImage = avatar.style.backgroundImage;
					node.dataset.nature = nature || 'unknown';
					var num = 0;
					var nodes = node.lastChild.firstChild.querySelectorAll('div');
					var interval = setInterval(function () {
						if (num < nodes.length) {
							nodes[num].classList.add('flashtext');
							num++;
						}
						else {
							clearInterval(interval);
						}
					}, 100);
				}
				else {
					avatar = false;
					node.innerHTML = str;
					node.dataset.nature = nature || 'soil';
				}
				if (avatar) {
					var rect1 = ui.window.getBoundingClientRect();
					var rect2 = this.getBoundingClientRect();
					var dx = Math.round(2 * rect2.left + rect2.width - rect1.width);
					var dy = Math.round(2 * rect2.top + rect2.height - rect1.height);
					node.style.transform = 'scale(0.5) translate(' + dx + 'px,' + dy + 'px)';
				}
				ui.window.appendChild(node);
				ui.refresh(node);
				if (avatar) {
					node.style.transform = 'scale(1)';
					node.style.opacity = 1;
				}
				else {
					node.classList.add('damageadded');
				}
				setTimeout(function () {
					node.delete();
					node.style.transform = 'scale(1.5)';
				}, avatar ? 1600 : 1000);
			}
			$damagepop(num, nature, font, nobroadcast) {
				if (typeof num == 'number' || typeof num == 'string') {
					game.addVideo('damagepop', this, [num, nature, font]);
					if (nobroadcast !== false) game.broadcast(function (player, num, nature, font) {
						player.$damagepop(num, nature, font);
					}, this, num, nature, font);
					var node = ui.create.div('.damage');
					if (font) {
						node.classList.add('normal-font');
					}
					if (typeof num == 'number' && num > 0) {
						if (num == Infinity) num = '+∞';
						else num = '+' + num;
					}
					else if (num == -Infinity) num = '-∞';
					node.innerHTML = num;
					this.damagepopups.push(node);
					node.dataset.nature = nature || 'soil';
					if (this.damagepopups.length == 1) {
						this.$damagepop();
					}
				}
				else if (this.damagepopups.length) {
					var node = this.damagepopups[0];
					this.appendChild(node);
					ui.refresh(node);
					node.classList.add('damageadded');
					node.listenTransition(function () {
						setTimeout(function () {
							node.delete();
						}, 200);
					});
					// setTimeout(function(){
					// 	node.delete();
					// },500);
					var that = this;
					setTimeout(function () {
						that.damagepopups.shift();
						that.$damagepop();
					}, 500);
				}
			}
			$damage(source) {
				if (get.itemtype(source) == 'player') {
					game.addVideo('damage', this, source.dataset.position);
				}
				else {
					game.addVideo('damage', this);
				}
				game.broadcast(function (player, source) {
					player.$damage(source);
				}, this, source);
				if (source && source != this && lib.config.damage_shake) {
					var left, top;
					if (source.getTop() == this.getTop()) {
						left = 20;
						top = 0;
					}
					else {
						var ratio = (source.getLeft() - this.getLeft()) / (source.getTop() - this.getTop());
						left = Math.abs(20 * ratio / Math.sqrt(1 + ratio * ratio));
						top = Math.abs(20 / Math.sqrt(1 + ratio * ratio));
					}
					if (source.getLeft() - this.getLeft() > 0) left = -left;
					if (source.getTop() - this.getTop() > 0) top = -top;
					if (get.is.mobileMe(this)) {
						if (this.classList.contains('linked')) {
							this.node.avatar.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
							this.node.avatar2.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
						}
						else {
							this.node.avatar.style.transform = 'translate(' + left + 'px,' + top + 'px)';
							this.node.avatar2.style.transform = 'translate(' + left + 'px,' + top + 'px)';
						}
					}
					else if (this.classList.contains('linked') && get.is.newLayout()) {
						this.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
					}
					else if (this._chesstransform) {
						this.style.transform = 'translate(' + (left + this._chesstransform[0]) + 'px,' + (top + this._chesstransform[1]) + 'px)';
					}
					else {
						this.style.transform = 'translate(' + left + 'px,' + top + 'px)';
					}
				}
				else {
					var zoom1 = 0.9, zoom2 = 0.95;
					if (arguments[1] == 'phase') {
						zoom1 = 1.05;
						zoom2 = 1.05;
					}
					if (get.is.mobileMe(this)) {
						if (this.classList.contains('linked')) {
							this.node.avatar.style.transform = 'scale(' + zoom1 + ') rotate(-90deg)';
							this.node.avatar2.style.transform = 'scale(' + zoom1 + ') rotate(-90deg)';
						}
						else {
							this.node.avatar.style.transform = 'scale(' + zoom1 + ')';
							this.node.avatar2.style.transform = 'scale(' + zoom1 + ')';
						}
					}
					else if (this.classList.contains('linked') && get.is.newLayout()) {
						this.style.transform = 'scale(' + zoom2 + ') rotate(-90deg)';
					}
					else if (game.chess && this._chesstransform) {
						this.style.transform = 'translate(' + this._chesstransform[0] + 'px,' + this._chesstransform[1] + 'px) scale(' + zoom2 + ')';
					}
					else {
						this.style.transform = 'scale(' + zoom2 + ')';
					}
				}
				this.queue();
			}
			$die() {
				game.addVideo('die', this);
				game.broadcast(function (player) {
					player.$die();
				}, this);
				if (lib.config.die_move != 'off') {
					this.$dieflip(lib.config.die_move);
				}
				if (this.$dieAfter) {
					this.$dieAfter();
				}
			}
			$dieflip(type) {
				var top0 = ui.window.offsetHeight / 2;
				var left0 = ui.window.offsetWidth / 2;
				var ratio = (left0 - this.getLeft()) / (top0 - this.getTop());
				var left = Math.abs(50 * ratio / Math.sqrt(1 + ratio * ratio));
				var top = Math.abs(50 / Math.sqrt(1 + ratio * ratio));
				if (left0 - this.getLeft() > 0) left = -left;
				if (top0 - this.getTop() > 0) top = -top;
				if (get.is.mobileMe(this)) {
					left = -Math.random() * 5 - 10;
					top = Math.random() * 5 + 10;
				}
				if (this._chesstransform) {
					left += this._chesstransform[0];
					top += this._chesstransform[1];
				}
				var transform = 'translate(' + left + 'px,' + top + 'px) ' +
					'rotate(' + (Math.random() * 20 - 10) + 'deg) ';
				if (type == 'flip') {
					if (game.layout == 'long' || game.layout == 'long2') {
						transform += 'rotateY(180deg)';
					}
					else {
						transform += ((Math.random() - 0.5 < 0) ? 'rotateX(180deg)' : 'rotateY(180deg)');
					}
				}
				if (get.is.mobileMe(this)) {
					this.node.avatar.style.transform = transform;
					this.node.avatar2.style.transform = transform;
					this.style.transform = '';
				}
				else {
					this.node.avatar.style.transform = '';
					this.node.avatar2.style.transform = '';
					this.style.transform = transform;
				}
				this.queue(false);
			}
			$phaseJudge(card) {
				game.addVideo('phaseJudge', this, get.cardInfo(card));
				var player = this;
				var clone = player.$throw(card);
				if (lib.config.low_performance && card && card.clone) {
					var waitingForTransition = get.time();
					_status.waitingForTransition = waitingForTransition;
					card.clone.listenTransition(function () {
						if (_status.waitingForTransition == waitingForTransition && _status.paused) {
							game.resume();
						}
					});
					game.pause();
				}
				else {
					game.delay();
				}
			}
		},
		Card: class extends HTMLDivElement {
			/**
			 * @param {HTMLDivElement} [position]
			 * @param {'noclick'} [info]
			 * @param {true} [noclick]
			 */
			constructor(position, info, noclick) {
				const card = ui.create.div('.card', position);
				Object.setPrototypeOf(card, lib.element.Card.prototype);
				card.build(info, noclick);
				return card;
			}
			build(info, noclick) {
				let card = this;
				card.buildNode();
				card.buildIntro(noclick);
				card.buildProperty();
				card.buildEventListener(info);
			}
			buildEventListener(info) {
				let card = this;
				if (info != 'noclick') {
					card.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
					if (lib.config.touchscreen) {
						card.addEventListener('touchstart', ui.click.cardtouchstart);
						card.addEventListener('touchmove', ui.click.cardtouchmove);
					}
					if (lib.cardSelectObserver) lib.cardSelectObserver.observe(card, {
						attributes: true
					});
				}
			}
			buildProperty() {
				let card = this;
				card.storage = {};
				card.vanishtag = [];
				card.gaintag = [];
				card._uncheck = [];
			}
			buildNode() {
				this.node = {
					image: ui.create.div('.image', this),
					info: ui.create.div('.info', this),
					name: ui.create.div('.name', this),
					name2: ui.create.div('.name2', this),
					background: ui.create.div('.background', this),
					intro: ui.create.div('.intro', this),
					range: ui.create.div('.range', this),
					gaintag: ui.create.div('.gaintag', this),
				};
				this.node.intro.innerHTML = lib.config.intro;
			}
			buildIntro(noclick) {
				if (!noclick) lib.setIntro(this);
			}
			//执行销毁一张牌的钩子函数
			selfDestroy(event) {
				if (this._selfDestroyed) return;
				this._selfDestroyed = true;
				this.fix();
				this.delete();
				const info = get.info(this, false);
				if (!info) return;
				if (info.destroyLog !== false) game.log(this, '被销毁了');
				if (info.onDestroy) info.onDestroy(this, event);
			}
			//判断一张牌进入某个区域后是否会被销毁
			willBeDestroyed(targetPosition, player, event) {
				const destroyed = this.destroyed;
				if (typeof destroyed == 'function') {
					return destroyed(this, targetPosition, player, event);
				}
				else if (lib.skill[destroyed]) {
					if (player) {
						if (player.hasSkill(destroyed)) {
							delete this.destroyed;
							return false;
						}
					}
					return true;
				}
				else if (typeof destroyed == 'string') {
					return (destroyed == targetPosition);
				}
				return destroyed;
			}
			hasNature(nature, player) {
				return game.hasNature(this, nature, player);
			}
			//只针对【杀】起效果
			addNature(nature) {
				let natures = [];
				if (!this.nature) this.nature = '';
				else {
					natures.addArray(get.natureList(this.nature));
				}
				natures.addArray(get.natureList(nature));
				this.nature = get.nature(natures);
				this.classList.add(nature);
				let str = get.translation(this.nature) + '杀';
				this.node.name.innerText = str;
				let name = get.name(this, false);
				do {
					if (name == 'sha') {
						let _bg;
						for (const n of natures) if (lib.natureBg.has(n)) _bg = n;
						if (_bg) {
							this.node.image.setBackgroundImage(lib.natureBg.get(_bg));
							break;
						}
					}
					this.node.image.setBackgroundImage('image/card/' + name + '.png');
				}
				while (0);
				return this.nature;
			}
			removeNature(nature) {
				if (!this.nature) return;
				let natures = get.natureList(this.nature);
				natures.remove(nature);
				if (!natures.length) delete this.nature;
				else this.nature = get.nature(natures);
				this.classList.remove(nature);
				let str = get.translation(this.nature) + '杀';
				this.node.name.innerText = str;
				let name = get.name(this, false);
				do {
					if (name == 'sha') {
						let _bg;
						for (const n of natures) if (lib.natureBg.has(n)) _bg = n;
						if (_bg) {
							this.node.image.setBackgroundImage(lib.natureBg.get(_bg));
							break;
						}
					}
					this.node.image.setBackgroundImage('image/card/' + name + '.png');
				}
				while (0);
				return this.nature;
			}
			addGaintag(gaintag) {
				if (Array.isArray(gaintag)) this.gaintag = gaintag.slice(0);
				else this.gaintag.add(gaintag);
				var str = '';
				for (var gi = 0; gi < this.gaintag.length; gi++) {
					var translate = get.translation(this.gaintag[gi]);
					if (translate != 'invisible') {
						str += translate;
						if (gi < this.gaintag.length - 1) str += ' ';
					}
				}
				this.node.gaintag.innerHTML = str;
			}
			removeGaintag(tag) {
				if (tag === true) {
					if (this.gaintag && this.gaintag.length || this.node.gaintag.innerHTML.length) this.addGaintag([]);
				}
				else if (this.hasGaintag(tag)) {
					this.gaintag.remove(tag);
					this.addGaintag(this.gaintag);
				}
			}
			hasGaintag(tag) {
				return this.gaintag && this.gaintag.contains(tag);
			}
			/**
			 * @param {[string, number, string, string] | {
			 * suit: string;
			 * number: number;
			 * name: string;
			 * nature: string;
			 * }} card
			 */
			init(card) {
				if (Array.isArray(card)) {
					if (card[2] == 'huosha') {
						card[2] = 'sha';
						card[3] = 'fire';
					}
					else if (card[2] == 'leisha') {
						card[2] = 'sha';
						card[3] = 'thunder';
					}
					else if (card[2] == 'cisha') {
						card[2] = 'sha';
						card[3] = 'stab';
					}
					else if (card[2].length > 3) {
						let prefix = card[2].slice(0, card[2].lastIndexOf('sha'));
						if (lib.nature.has(prefix)) {
							if (prefix.length + 3 == card[2].length) {
								card[2] = 'sha';
								card[3] = prefix;
							}
						}
						if (card[2].startsWith('sha_')) {
							let suffix = card[2].slice(4);
							let natureList = suffix.split('_');
							card[2] = 'sha';
							card[3] = get.nature(natureList);
						}
					}
				}
				else if (typeof card == 'object') {
					card = [card.suit, card.number, card.name, card.nature];
				}
				var cardnum = card[1] || '';
				if (parseInt(cardnum) == cardnum) cardnum = parseInt(cardnum);

				if (!lib.card[card[2]]) {
					lib.card[card[2]] = {};
				}
				var info = lib.card[card[2]];
				if (info.global && !this.classList.contains('button')) {
					if (Array.isArray(info.global)) {
						while (info.global.length) {
							game.addGlobalSkill(info.global.shift());
						}
					}
					else if (typeof info.global == 'string') {
						game.addGlobalSkill(info.global);
					}
					delete info.global;
				}
				this.suit = card[0];
				this.number = parseInt(card[1]) || 0;
				this.name = card[2];

				if (info.destroy && (typeof info.destroy != 'boolean' && !lib.skill[info.destroy])) {
					this.destroyed = info.destroy;
				}

				if (_status.connectMode && !game.online && lib.cardOL && !this.cardid) {
					this.cardid = get.id();
					lib.cardOL[this.cardid] = this;
				}
				if (!_status.connectMode && !_status.video) {
					this.cardid = get.id();
				}

				this.$init(card);

				if (this.inits) {
					for (var i = 0; i < this.inits.length; i++) {
						this.inits[i](this);
					}
				}
				if (typeof info.init == 'function') info.init();

				return this;
			}
			/**
			 * @param {[string, number, string, string]} card
			*/
			$init(card) {
				var info = lib.card[card[2]];
				var cardnum = card[1] || '';
				if (parseInt(cardnum) == cardnum) cardnum = parseInt(cardnum);
				if (cardnum > 0 && cardnum < 14) {
					cardnum = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][cardnum - 1];
				}
				if (this.name) {
					this.classList.remove('epic');
					this.classList.remove('legend');
					this.classList.remove('gold');
					this.classList.remove('unique');
					this.style.background = '';
					var subtype = get.subtype(this, false);
					if (subtype) {
						this.classList.remove(subtype);
					}
				}
				if (info.epic) {
					this.classList.add('epic');
				}
				else if (info.legend) {
					this.classList.add('legend');
				}
				else if (info.gold) {
					this.classList.add('gold');
				}
				else if (info.unique) {
					this.classList.add('unique');
				}
				var bg = card[2];
				if (info.cardimage) {
					bg = info.cardimage;
				}
				var img = lib.card[bg].image;
				if (img) {
					if (img.startsWith('db:')) {
						img = img.slice(3);
					}
					else if (!img.startsWith('ext:')) {
						img = null;
					}
				}
				this.classList.remove('fullskin');
				this.classList.remove('fullimage');
				this.classList.remove('fullborder');
				this.dataset.cardName = card[2];
				this.dataset.cardType = info.type || '';
				this.dataset.cardSubype = info.subtype || '';
				this.dataset.cardMultitarget = info.multitarget ? '1' : '0';
				this.node.name.dataset.nature = '';
				this.node.info.classList.remove('red');
				if (!lib.config.hide_card_image && lib.card[bg].fullskin) {
					this.classList.add('fullskin');
					if (img) {
						if (img.startsWith('ext:')) {
							this.node.image.setBackgroundImage(img.replace(/^ext:/, 'extension/'));
						}
						else {
							this.node.image.setBackgroundDB(img);
						}
					}
					else {
						if (lib.card[bg].modeimage) {
							this.node.image.setBackgroundImage('image/mode/' + lib.card[bg].modeimage + '/card/' + bg + '.png');
						}
						else {
							do {
								let nature = card[3];
								if (bg == 'sha' && typeof nature == 'string') {
									let natures = get.natureList(nature), _bg;
									for (const n of natures) if (lib.natureBg.has(n)) _bg = n;
									if (_bg) {
										this.node.image.setBackgroundImage(lib.natureBg.get(_bg));
										break;
									}
								}
								this.node.image.setBackgroundImage('image/card/' + bg + '.png');
							}
							while (0);
						}
					}
				}
				else if (lib.card[bg].image == 'background') {
					if (card[3]) this.node.background.setBackground(bg + '_' + get.natureList(card[3])[0], 'card');
					else this.node.background.setBackground(bg, 'card');
				}
				else if (lib.card[bg].fullimage) {
					this.classList.add('fullimage');
					if (img) {
						if (img.startsWith('ext:')) {
							this.setBackgroundImage(img.replace(/^ext:/, 'extension/'));
							this.style.backgroundSize = 'cover';
						}
						else {
							this.setBackgroundDB(img);
						}
					}
					else if (lib.card[bg].image) {
						if (lib.card[bg].image.startsWith('character:')) {
							this.setBackground(lib.card[bg].image.slice(10), 'character');
						}
						else {
							this.setBackground(lib.card[bg].image);
						}
					}
					else {
						var cardPack = lib.cardPack['mode_' + get.mode()];
						if (Array.isArray(cardPack) && cardPack.contains(bg)) {
							this.setBackground('mode/' + get.mode() + '/card/' + bg);
						}
						else {
							this.setBackground('card/' + bg);
						}
					}
				}
				else if (lib.card[bg].fullborder) {
					this.classList.add('fullborder');
					if (lib.card[bg].fullborder == 'gold') {
						this.node.name.dataset.nature = 'metalmm';
					}
					else if (lib.card[bg].fullborder == 'silver') {
						this.node.name.dataset.nature = 'watermm';
					}
					if (!this.node.avatar) {
						this.node.avatar = ui.create.div('.cardavatar');
						this.insertBefore(this.node.avatar, this.firstChild);
					}
					if (!this.node.framebg) {
						this.node.framebg = ui.create.div('.cardframebg');
						this.node.framebg.dataset.auto = lib.card[bg].fullborder;
						this.insertBefore(this.node.framebg, this.firstChild);
					}
					if (img) {
						if (img.startsWith('ext:')) {
							this.node.avatar.setBackgroundImage(img.replace(/^ext:/, 'extension/'));
							this.node.avatar.style.backgroundSize = 'cover';
						}
						else {
							this.node.avatar.setBackgroundDB(img);
						}
					}
					else if (lib.card[bg].image) {
						if (lib.card[bg].image.startsWith('character:')) {
							this.node.avatar.setBackground(lib.card[bg].image.slice(10), 'character');
						}
						else {
							this.node.avatar.setBackground(lib.card[bg].image);
						}
					}
					else {
						var cardPack = lib.cardPack['mode_' + get.mode()];
						if (Array.isArray(cardPack) && cardPack.contains(bg)) {
							this.node.avatar.setBackground('mode/' + get.mode() + '/card/' + bg);
						}
						else {
							this.node.avatar.setBackground('card/' + bg);
						}
					}
				}
				else if (lib.card[bg].image == 'card') {
					if (card[3]) this.setBackground(bg + '_' + get.natureList(card[3])[0], 'card');
					else this.setBackground(bg, 'card');
				}
				else if (typeof lib.card[bg].image == 'string' && !lib.card[bg].fullskin) {
					if (img) {
						if (img.startsWith('ext:')) {
							this.setBackgroundImage(img.replace(/^ext:/, 'extension/'));
							this.style.backgroundSize = 'cover';
						}
						else {
							this.setBackgroundDB(img);
						}
					}
					else {
						this.setBackground(lib.card[bg].image);
					}
				}
				else {
					this.node.background.innerHTML = lib.translate[bg + '_cbg'] || lib.translate[bg + '_bg'] || get.translation(bg)[0];
					// this.node.background.style.fontFamily=lib.config.card_font;
					if (this.node.background.innerHTML.length > 1) this.node.background.classList.add('tight');
					else this.node.background.classList.remove('tight');
				}
				if (!lib.card[bg].fullborder && this.node.avatar && this.node.framebg) {
					this.node.avatar.remove();
					this.node.framebg.remove();
					delete this.node.avatar;
					delete this.node.framebg;
				}
				if (info.noname && !this.classList.contains('button')) {
					this.node.name.style.display = 'none';
				}
				if (info.color) {
					this.style.color = info.color;
				}
				if (info.textShadow) {
					this.style.textShadow = info.textShadow;
				}
				if (info.opacity) {
					this.node.info.style.opacity = info.opacity;
					this.node.name.style.opacity = info.opacity;
				}
				if (info.modinfo) {
					this.node.info.innerHTML = info.modinfo;
				}
				else {
					this.node.info.innerHTML = get.translation(card[0]) + '<span style="font-family:xinwei"> </span><span style="font-family:xinwei">' + cardnum + '</span>';
				}
				if (info.addinfo) {
					if (!this.node.addinfo) {
						this.node.addinfo = ui.create.div('.range', this);
					}
					this.node.addinfo.innerHTML = info.addinfo;
				}
				else if (this.node.addinfo) {
					this.node.addinfo.remove();
					delete this.node.addinfo;
				}
				if (card[0] == 'heart' || card[0] == 'diamond') {
					this.node.info.classList.add('red');
				}
				this.node.image.className = 'image';
				var name = get.translation(card[2]);
				if (card[2] == 'sha') {
					name = '';
					let nature = card[3];
					if (nature) {
						let natures = get.natureList(nature);
						natures.sort(lib.sort.nature);
						for (let nature of natures) {
							name += lib.translate['nature_' + nature] || lib.translate[nature] || '';
							if (nature != 'stab') this.node.image.classList.add(nature);
						}
					}
					name += '杀';
				}
				this.node.name.innerHTML = name;
				if (name.length >= 5) {
					this.node.name.classList.add('long');
					if (name.length >= 7) {
						this.node.name.classList.add('longlong');
					}
				}
				this.node.name2.innerHTML = get.translation(card[0]) + cardnum + ' ' + name;
				this.classList.add('card');
				if (card[3]) {
					let natures = get.natureList(card[3]);
					natures.forEach(n => { if (n) this.classList.add(n); });
					this.nature = natures.filter(n => lib.nature.has(n)).sort(lib.sort.nature).join(lib.natureSeparator);
				}
				else if (this.nature) {
					this.classList.remove(this.nature);
					delete this.nature;
				}
				if (info.subtype) this.classList.add(info.subtype);
				this.node.range.innerHTML = '';
				switch (get.subtype(this, false)) {
					case 'equip1':
						var added = false;
						if (lib.card[this.name] && lib.card[this.name].distance) {
							var dist = lib.card[this.name].distance;
							if (dist.attackFrom) {
								added = true;
								this.node.range.innerHTML = '范围: ' + (-dist.attackFrom + 1);
							}
						}
						if (!added) {
							this.node.range.innerHTML = '范围: 1';
						}
						break;
					case 'equip3':
						if (info.distance && info.distance.globalTo) {
							this.node.range.innerHTML = '防御: ' + info.distance.globalTo;
							this.node.name2.innerHTML += '+';
						}
						break;
					case 'equip4':
						if (info.distance && info.distance.globalFrom) {
							this.node.range.innerHTML = '进攻: ' + (-info.distance.globalFrom);
							this.node.name2.innerHTML += '-';
						}
						break;
				}
				var tags = [];
				if (Array.isArray(card[4])) {
					tags.addArray(card[4]);
				}
				if (this.cardid) {
					if (!_status.cardtag) {
						_status.cardtag = {};
					}
					for (var i in _status.cardtag) {
						if (_status.cardtag[i].contains(this.cardid)) {
							tags.add(i);
						}
					}
					if (tags.length) {
						var tagstr = ' <span class="cardtag">';
						for (var i = 0; i < tags.length; i++) {
							var tag = tags[i];
							if (!_status.cardtag[tag]) {
								_status.cardtag[tag] = [];
							}
							_status.cardtag[tag].add(this.cardid);
							tagstr += lib.translate[tag + '_tag'];
							//if(i<tags.length-1) tagstr+=' ';
						}
						tagstr += '</span>';
						this.node.range.innerHTML += tagstr;
					}
				}
				return this;
			}
			updateTransform(bool, delay) {
				if (delay) {
					var that = this;
					setTimeout(function () {
						that.updateTransform(that.classList.contains('selected'));
					}, delay);
				}
				else {
					if (_status.event.player != game.me) return;
					if (this._transform && this.parentNode && this.parentNode.parentNode &&
						this.parentNode.parentNode.parentNode == ui.me &&
						(!_status.mousedown || _status.mouseleft) &&
						(!this.parentNode.parentNode.classList.contains('scrollh') || (game.layout == 'long2' || game.layout == 'nova'))) {
						if (bool) {
							this.style.transform = this._transform + ' translateY(-20px)';
						}
						else {
							this.style.transform = this._transform || '';
						}
					}
				}
			}
			aiexclude() {
				_status.event._aiexclude.add(this);
			}
			//为此牌添加知情者。参数可为数组，若参数为字符串'everyone'，则所有玩家均为知情者。
			addKnower(player) {
				if (!this._knowers) {
					this._knowers = [];
				}
				if (typeof player == 'string') {
					this._knowers.add(player);
				} else {
					let type = get.itemtype(player);
					if (type == 'player') {
						this._knowers.add(player.playerid);
					} else if (type == 'players') {
						player.forEach(p => this._knowers.add(p.playerid));
					}
				}
			}
			removeKnower(player) {
				if (!this._knowers) {
					return;
				}
				if (typeof player == 'string') {
					this._knowers.remove(player);
				} else {
					let type = get.itemtype(player);
					if (type == 'player') {
						this._knowers.remove(player.playerid);
					} else if (type == 'players') {
						player.forEach(p => this._knowers.remove(p.playerid));
					}
				}
			}
			//清除此牌的知情者。
			clearKnowers() {
				if (this._knowers) delete this._knowers;
			}
			//判断玩家对此牌是否知情。
			isKnownBy(player) {
				if (['e', 'j'].includes(get.position(this))) return true;//装备区或者判定区的牌，必知情。
				let owner = get.owner(this);
				if (owner) {
					if (owner == player) return true;//是牌主，必知情。
					if (player.hasSkillTag('viewHandcard', null, owner, true)) return true;//有viewHandcard标签，必知情。
					if (owner.isUnderControl(true, player)) return true;//被操控，必知情。
				}
				if (get.is.shownCard(this)) return true;//此牌是明置牌，必知情。
				if (this._knowers) {
					return this._knowers.includes('everyone') || this._knowers.includes(player.playerid);
				}
				return false;
			}
			getSource(name) {
				if (this.name == name) return true;
				var info = lib.card[this.name];
				if (info && Array.isArray(info.source)) {
					return info.source.contains(name);
				}
				return false;
			}
			moveDelete(player) {
				this.fixed = true;
				if (!this._listeningEnd || this._transitionEnded) {
					this.moveTo(player);
					var that = this;
					setTimeout(function () {
						that.delete();
					}, 200);
				}
				else {
					this._onEndMoveDelete = player;
				}
			}
			moveTo(player) {
				this.fixed = true;
				var dx, dy;
				if (this.classList.contains('center')) {
					var nx = [50, -52];
					var ny = [50, -52];
					nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
					ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
					dx = player.getLeft() + player.offsetWidth / 2 - 52 - nx;
					dy = player.getTop() + player.offsetHeight / 2 - 52 - ny;
				}
				else {
					this.style.left = this.offsetLeft + 'px';
					this.style.top = this.offsetTop + 'px';

					dx = player.getLeft() + player.offsetWidth / 2 - 52 - this.offsetLeft;
					dy = player.getTop() + player.offsetHeight / 2 - 52 - this.offsetTop;
				}
				if (get.is.mobileMe(player)) {
					dx += get.cardOffset();
					if (ui.arena.classList.contains('oblongcard')) {
						dy -= 16;
					}
				}


				if (this.style.transform && this.style.transform != 'none' && this.style.transform.indexOf('translate') == -1) {
					this.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
				}
				else {
					this.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
				}
				return this;
			}
			copy() {
				/**
				 * @type {Card}
				 */
				var node = this.cloneNode(true);
				node.style.transform = '';
				node.name = this.name;
				node.suit = this.suit;
				node.number = this.number;
				node.nature = this.nature;
				node.classList.remove('hidden');
				node.classList.remove('start');
				node.classList.remove('thrown');
				node.classList.remove('selectable');
				node.classList.remove('selected');
				node.classList.remove('removing');
				node.classList.remove('drawinghidden');
				node.classList.remove('glows');
				node.node = {
					name: node.querySelector('.name'),
					info: node.querySelector('.info'),
					intro: node.querySelector('.intro'),
					background: node.querySelector('.background'),
					image: node.querySelector('.image'),
					gaintag: node.querySelector('.gaintag'),
				};
				node.node.gaintag.innerHTML = '';
				var clone = true;
				var position;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == 'string') node.classList.add(arguments[i]);
					else if (['div', 'fragment'].includes(get.objtype(arguments[i]))) position = arguments[i];
					else if (typeof arguments[i] == 'boolean') clone = arguments[i];
				}
				node.moveTo = lib.element.Card.prototype.moveTo;
				node.moveDelete = lib.element.Card.prototype.moveDelete;
				if (clone) this.clone = node;
				if (position) position.appendChild(node);
				return node;
			}
			uncheck(skill) {
				if (skill) this._uncheck.add(skill);
				this.classList.add('uncheck');
			}
			recheck(skill) {
				if (skill) this._uncheck.remove(skill);
				else this._uncheck.length = 0;
				if (this._uncheck.length == 0) this.classList.remove('uncheck');
			}
			discard(bool) {
				if (!this._selfDestroyed) {
					this.fix();
					ui.discardPile.appendChild(this);
				}
				this.classList.remove('glow');
				if (bool === false) {
					ui.cardPile.insertBefore(this, ui.cardPile.childNodes[Math.floor(Math.random() * ui.cardPile.childNodes.length)]);
				}
				else {
					if (_status.discarded) {
						_status.discarded.add(this);
					}
				}
			}
			hasTag(tag) {
				if (this.cardid && _status.cardtag && _status.cardtag[tag] && _status.cardtag[tag].contains(this.cardid)) {
					return true;
				}
				return false;
			}
			hasPosition() {
				return ['h', 'e', 'j', 's', 'x'].contains(get.position(this));
			}
			isInPile() {
				return ['c', 'd'].contains(get.position(this));
			}
		},
		VCard: class {
			/**
			 * @param {any} [suitOrCard]
			 * @param {number | Card[]} [numberOrCards]
			 * @param {string} [name]
			 * @param {string} [nature]
			 */
			constructor(suitOrCard, numberOrCards, name, nature) {
				if (Array.isArray(suitOrCard)) {
					/**
					 * @type {string}
					 */
					this.suit = suitOrCard[0];
					/**
					 * @type {number}
					 */
					this.number = suitOrCard[1];
					/**
					 * @type {string}
					 */
					this.name = suitOrCard[2];
					/**
					 * @type {string}
					 */
					this.nature = suitOrCard[3];
				}
				else if (get.itemtype(suitOrCard) == 'card') {
					this.name = get.name(suitOrCard);
					this.suit = get.suit(suitOrCard);
					this.color = get.color(suitOrCard);
					this.number = get.number(suitOrCard);
					this.nature = get.nature(suitOrCard);
					this.isCard = true;
					this.cardid = suitOrCard.cardid;
					this.wunature = suitOrCard.wunature;
					/**
					 * @type {Record<string, any>}
					 */
					this.storage = get.copy(suitOrCard.storage);
					if (Array.isArray(numberOrCards)) this.cards = numberOrCards.slice();
					else this.cards = [suitOrCard];
					const info = get.info(this, false);
					if (info) {
						const autoViewAs = info.autoViewAs;
						if (typeof autoViewAs == 'string') this.name = autoViewAs;
					}
				}
				else if (suitOrCard && typeof suitOrCard != 'string') {
					Object.keys(suitOrCard).forEach(key => {
						const propertyDescriptor = Object.getOwnPropertyDescriptor(suitOrCard, key), value = propertyDescriptor.value;
						if (Array.isArray(value)) this[key] = value.slice();
						else Object.defineProperty(this, key, propertyDescriptor);
					});
					if (Array.isArray(numberOrCards)) {
						const noCards = !this.cards;
						/**
						 * @type {Card[]}
						 */
						this.cards = numberOrCards.slice();
						if (noCards) {
							if (!lib.suits.includes(this.suit)) this.suit = get.suit(this);
							if (!Object.keys(lib.color).includes(this.color)) this.color = get.color(this);
							if (typeof this.number != 'number') this.number = get.number(this);
							if (!this.nature) this.nature = get.nature(this);
						}
					}
					const info = get.info(this, false);
					if (info) {
						const autoViewAs = info.autoViewAs;
						if (typeof autoViewAs == 'string') this.name = autoViewAs;
					}
				}
				if (typeof suitOrCard == 'string') this.suit = suitOrCard;
				if (typeof numberOrCards == 'number') this.number = numberOrCards;
				if (typeof name == 'string') this.name = name;
				if (typeof nature == 'string') this.nature = nature;
				if (!this.storage) this.storage = {};
				if (!this.cards) this.cards = [];
			}
			sameSuitAs(card) {
				return get.suit(this) == get.suit(card);
			}
			differentSuitFrom(card) {
				return get.suit(this) != get.suit(card);
			}
			sameNumberAs(card) {
				return get.number(this) == get.number(card);
			}
			differentNumberFrom(card) {
				return get.number(this) != get.number(card);
			}
			sameNameAs(card) {
				return get.name(this) == get.name(card);
			}
			differentNameFrom(card) {
				return get.name(this) != get.name(card);
			}
			/**
			 * @param {Player} player
			 */
			hasNature(nature, player) {
				const natures = get.natureList(this, player);
				if (!nature) return natures.length > 0;
				if (nature == 'linked') return natures.some(n => lib.linked.includes(n));
				return get.is.sameNature(natures, nature);
			}
		},
		Button: class extends HTMLDivElement {
			/**
			 * @param {{}} item
			 * @param {keyof typeof ui.create.buttonPresets | (item: {}, type: Function, position?: HTMLDivElement, noClick?: true, button?: HTMLDivElement) => HTMLDivElement} type
			 * @param {HTMLDivElement|DocumentFragment} [position]
			 * @param {true} [noClick]
			 * @param {HTMLDivElement} [button]
			 */
			constructor(item, type, position, noClick, button) {
				if (ui.create.buttonPresets[type]) button = ui.create.buttonPresets[type](item, type, position, noClick, button);
				else if (typeof type == 'function') button = type(item, type, position, noClick, button);
				Object.setPrototypeOf(button, lib.element.Button.prototype);
				if (!noClick) button.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
				else {
					button.classList.add('noclick');
					const intro = button.querySelector('.intro');
					if (intro) intro.remove();
				}
				return button;
			}
			exclude() {
				if (_status.event.excludeButton == undefined) {
					_status.event.excludeButton = [];
				}
				_status.event.excludeButton.add(this);
			}
			get updateTransform() {
				return lib.element.Card.prototype.updateTransform;
			}
		},
		GameEvent: class {
			/** @type { GameEventPromise } */
			#promise;
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
				 * @type {(GameEventPromise)[]}
				 */
				this.next = [];
				/**
				 * @type {(GameEventPromise)[]}
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
				/** 
				 * @type {boolean} 这个事件是否使用异步函数处理 
				 **/
				this.async = false;
				/**
				 * @type {null|(event: GameEvent)=>any} 这个异步事件对应Promise的resolve函数
				 **/
				this.resolve = null;
				if (trigger !== false && !game.online) this._triggered = 0;
			}
			static initialGameEvent() {
				return new lib.element.GameEvent().finish().toPromise();
			}
			/**
			 * @param {keyof this} key
			 * @param {number} [value]
			 * @param {number} [baseValue]
			 */
			addNumber(key, value, baseValue) {
				if (typeof value != 'number') value = 0;
				if (typeof this[key] == 'number') this[key] += value;
				else {
					if (typeof baseValue != 'number') baseValue = 0;
					this[key] = baseValue + value;
				}
				return this;
			}
			/**
			 * @param {keyof this} key
			 * @param {number} [baseValue]
			 */
			decrease(key, baseValue) {
				if (typeof this[key] == 'number') this[key]--;
				else this.subtractNumber(key, 1, baseValue);
				return this;
			}
			/**
			 * @param {keyof this} key
			 * @param {number} [baseValue]
			 */
			increase(key, baseValue) {
				if (typeof this[key] == 'number') this[key]++;
				else this.addNumber(key, 1, baseValue);
				return this;
			}
			/**
			 * @param {keyof this} key
			 * @param {number} [value]
			 * @param {number} [baseValue]
			 */
			subtractNumber(key, value, baseValue) {
				if (typeof value != 'number') value = 0;
				if (typeof this[key] == 'number') this[key] -= value;
				else {
					if (typeof baseValue != 'number') baseValue = 0;
					this[key] = baseValue - value;
				}
				return this;
			}
			/**
			 * @param {Parameters<typeof this.hasHandler>[0]} type
			 * @param {GameEvent} event
			 * @param {{
			 * state?: 'begin' | 'end';
			 * }} option
			 * @returns {this}
			 */
			callHandler(type, event, option) {
				if (this.hasHandler(type)) this.getHandler(type).forEach(handler => {
					if (typeof handler == 'function') handler(event, option);
				});
				return this;
			}
			getDefaultHandlerType() {
				const eventName = this.name;
				if (eventName) return `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
			}
			/**
			 * @param {Parameters<typeof this.hasHandler>[0]} [type]
			 * @returns {((event: GameEvent, option: {
			 * state?: 'begin' | 'end';
			 * }) => void)[]}
			 */
			getHandler(type) {
				if (!type) type = this.getDefaultHandlerType();
				const currentHandler = this[type];
				if (!currentHandler) this[type] = [];
				else if (!Array.isArray(currentHandler)) this[type] = [currentHandler];
				return this[type];
			}
			/**
			 * @param {`on${Capitalize<string>}`} [type]
			 */
			hasHandler(type) {
				if (!type) type = this.getDefaultHandlerType();
				return Boolean(this[type] && this.getHandler(type).length);
			}
			/**
			 * @overload
			 * @param {...((event: GameEvent, option: {
			 * state?: 'begin' | 'end';
			 * }) => void)[]} handlers
			 * @returns {number}
			 */
			/**
			 * @overload
			 * @param {Parameters<typeof this.hasHandler>[0]} type
			 * @param {...((event: GameEvent, option: {
			 * state?: 'begin' | 'end';
			 * }) => void)[]} handlers
			 * @returns {number}
			 */
			pushHandler(type) {
				return typeof type == 'string' ? this.getHandler(type).push(...Array.from(arguments).slice(1)) : this.getHandler().push(...arguments);
			}
			changeToZero() {
				this.num = 0;
				this.numFixed = true;
				return this;
			}
			finish() {
				this.finished = true;
				return this;
			}
			putStepCache(key, value) {
				if (!this._stepCache) {
					this._stepCache = {};
				}
				this._stepCache[key] = value;
				return this;
			}
			getStepCache(key) {
				if (!this._stepCache) return undefined;
				return this._stepCache[key];
			}
			clearStepCache(key) {
				if (key !== undefined && key !== null) {
					delete this._stepCache[key];
				}
				delete this._stepCache;
				return this;
			}
			callFuncUseStepCache(prefix, func, params) {
				if (typeof func != 'function') return;
				if (_status.closeStepCache) return func.apply(null, params);
				var cacheKey = "[" + prefix + "]" + get.paramToCacheKey.apply(null, params);
				var ret = this.getStepCache(cacheKey);
				if (ret === undefined || ret === null) {
					ret = func.apply(null, params);
					this.putStepCache(cacheKey, ret);
				}
				return ret;
			}
			putTempCache(key1, key2, value) {
				if (!this._tempCache) {
					this._tempCache = {};
				}
				if (!this._tempCache[key1]) {
					this._tempCache[key1] = {};
				}
				this._tempCache[key1][key2] = value;
				return value;
			}
			getTempCache(key1, key2) {
				if (!this._tempCache) {
					return undefined;
				}
				if (!this._tempCache[key1]) {
					return undefined;
				}
				return this._tempCache[key1][key2];
			}
			cancel(arg1, arg2, notrigger) {
				this.untrigger(arg1, arg2);
				this.finish();
				if (notrigger != 'notrigger') {
					this.trigger(this.name + 'Cancelled');
					if (this.player && lib.phaseName.contains(this.name)) this.player.getHistory('skipped').add(this.name);
				}
				return this;
			}
			neutralize(event) {
				this.untrigger();
				this.finish();
				this._neutralized = true;
				this.trigger('eventNeutralized');
				this._neutralize_event = event || _status.event;
				return this;
			}
			unneutralize() {
				this.untrigger();
				delete this._neutralized;
				delete this.finished;
				if (this.type == 'card' && this.card && this.name == 'sha') this.directHit = true;
				return this;
			}
			goto(step) {
				this.step = step - 1;
				return this;
			}
			redo() {
				this.step--;
				return this;
			}
			setHiddenSkill(skill) {
				if (!this.player) return this;
				var hidden = this.player.hiddenSkills.slice(0);
				game.expandSkills(hidden);
				if (hidden.contains(skill)) this.set('hsskill', skill);
				return this;
			}
			set(key, value) {
				if (arguments.length == 1 && Array.isArray(arguments[0])) {
					for (var i = 0; i < arguments[0].length; i++) {
						if (Array.isArray(arguments[0][i])) {
							this.set(arguments[0][i][0], arguments[0][i][1]);
						}
					}
				}
				else {
					if (typeof key != 'string') {
						console.log('warning: using non-string object as event key');
						console.log(key, value);
						console.log(_status.event);
					}
					this[key] = value;
					this._set.push([key, value]);
				}
				return this;
			}
			/**
			 * @param {ArrayLike<Function> | Function | keyof typeof lib.element.content} item
			 */
			setContent(item) {
				switch (typeof item) {
					case "object":
					case "function":
						if (item instanceof AsyncFunction) {
							this.content = item;
						}
						else this.content = lib.init.parsex(item);
						break;
					default:
						try {
							if (!(lib.element.content[item] instanceof AsyncFunction) && !lib.element.content[item]._parsed) {
								lib.element.content[item] = lib.init.parsex(lib.element.content[item]);
								lib.element.content[item]._parsed = true;
							}
						}
						catch {
							throw new Error(`Content ${item} may not exist.\nlib.element.content[${item}] = ${lib.element.content[item]}`);
						}
						this.content = lib.element.content[item];
						break;
				}
				return this;
			}

			/**
			 * 
			 * @param {import("../util/index.js").AsyncFunction[] | keyof typeof lib.element.contents} contents
			 * @returns {GameEvent}
			 */
			setContents(contents) {
				if (Array.isArray(contents)) this.contents = contents;
				else if (contents in lib.element.contents) return this.setContents(lib.element.contents[contents]);
				else throw new Error('not supported value.');
				return this;
			}

			getLogv() {
				for (var i = 1; i <= 3; i++) {
					var event = this.getParent(i);
					if (event && event.logvid) return event.logvid;
				}
				return null;
			}
			send() {
				this.player.send(function (name, args, set, event, skills) {
					game.me.applySkills(skills);
					var next = game.me[name].apply(game.me, args);
					for (var i = 0; i < set.length; i++) {
						next.set(set[i][0], set[i][1]);
					}
					if (next._backupevent) {
						next.backup(next._backupevent);
					}
					next._modparent = event;
					game.resume();
				}, this.name, this._args || [], this._set,
					get.stringifiedResult(this.parent), get.skillState(this.player));
				this.player.wait();
				game.pause();
				return this;
			}
			resume() {
				delete this._cardChoice;
				delete this._targetChoice;
				delete this._skillChoice;
				return this;
			}
			/**
			 * 获取事件的父节点。
			 * 获取事件链上的指定事件。
			 * 默认获取上一个父节点（核心）。
			 * @param {number|string|(evt:gameEvent)=>boolean} [level=1] 获取深度（number）/指定名字（string）/指定特征（function）
			 * @param {boolean} [forced] 若获取不到节点，默认返回{}，若forced为true则返回null
			 * @param {boolean} [includeSelf] 若level不是数字，指定搜索时是否包含事件本身
			 * @returns {GameEvent|{}|null}
			 */
			getParent(level = 1, forced, includeSelf) {
				let event = this;
				const toreturn = forced ? null : {};
				if (!includeSelf || typeof level === 'number') {
					if (event._modparent && game.online) event = event._modparent;
					else event = this.parent;
				}
				if (typeof level === 'number') {
					for (let i = 1; i < level; i++) {
						if (!event) return toreturn;
						event = event.parent;
					}
					return event;
				}
				const historys = [];
				const filter = typeof level === 'function' ? level : evt => evt.name === level;
				while (true) {
					if (!event) return toreturn;
					historys.push(event);
					if (filter(event)) return event;
					event = event.parent;
					if (historys.includes(event)) return toreturn;
				}
			}
			getTrigger() {
				return this.getParent('arrangeTrigger')._trigger;
			}
			getRand(name) {
				if (name) {
					if (!this._rand_map) this._rand_map = {};
					if (!this._rand_map[name]) this._rand_map[name] = Math.random();
					return this._rand_map[name];
				}
				if (!this._rand) this._rand = Math.random();
				return this._rand;
			}
			insert(content, map) {
				const next = (new lib.element.GameEvent(`${this.name}Inserted`, false)).toPromise();
				this.next.push(next);
				next.setContent(content);
				Object.entries(map).forEach(entry => next.set(entry[0], entry[1]));
				return next;
			}
			insertAfter(content, map) {
				const next = (new lib.element.GameEvent(`${this.name}Inserted`, false)).toPromise();
				this.after.push(next);
				next.setContent(content);
				Object.entries(map).forEach(entry => next.set(entry[0], entry[1]));
				return next;
			}
			backup(skill) {
				this._backup = {
					filterButton: this.filterButton,
					selectButton: this.selectButton,
					filterTarget: this.filterTarget,
					selectTarget: this.selectTarget,
					filterCard: this.filterCard,
					selectCard: this.selectCard,
					position: this.position,
					forced: this.forced,
					fakeforce: this.fakeforce,
					_aiexclude: this._aiexclude,
					complexSelect: this.complexSelect,
					complexCard: this.complexCard,
					complexTarget: this.complexTarget,
					_cardChoice: this._cardChoice,
					_targetChoice: this._targetChoice,
					_skillChoice: this._skillChoice,
					ai1: this.ai1,
					ai2: this.ai2,
					filterOk: this.filterOk,
				};
				if (skill) {
					var info = get.info(skill);
					this.skill = skill;
					this._aiexclude = [];
					if (typeof info.viewAs == 'function') {
						if (info.filterButton != undefined) this.filterButton = get.filter(info.filterButton);
						if (info.selectButton != undefined) this.selectButton = info.selectButton;
						if (info.filterTarget != undefined) this.filterTarget = get.filter(info.filterTarget);
						if (info.selectTarget != undefined) this.selectTarget = info.selectTarget;
						if (info.filterCard != undefined) {
							if (info.ignoreMod) this.ignoreMod = true;
							this.filterCard2 = get.filter(info.filterCard);
							this.filterCard = function (card, player, event) {
								var evt = event || _status.event;
								if (!evt.ignoreMod && player) {
									var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
									if (mod != 'unchanged') return mod;
								}
								return get.filter(evt.filterCard2).apply(this, arguments);
							};
						}
						if (info.filterOk == undefined) {
							this.filterOk = function () {
								var evt = _status.event;
								var card = get.card(), player = get.player();
								var filter = evt._backup.filterCard;
								if (filter && !filter(card, player, evt)) return false;
								if (evt._backup.filterOk) return evt._backup.filterOk();
								return true;
							};
						}
						else this.filterOk = info.filterOk;
						if (info.selectCard != undefined) this.selectCard = info.selectCard;
						if (info.position != undefined) this.position = info.position;
						//if(info.forced!=undefined) this.forced=info.forced;
						if (info.complexSelect != undefined) this.complexSelect = info.complexSelect;
						if (info.complexCard != undefined) this.complexCard = info.complexCard;
						if (info.complexTarget != undefined) this.complexTarget = info.complexTarget;
						if (info.ai1 != undefined) this.ai1 = info.ai1;
						if (info.ai2 != undefined) this.ai2 = info.ai2;
					}
					else if (info.viewAs) {
						if (info.filterButton != undefined) this.filterButton = get.filter(info.filterButton);
						if (info.selectButton != undefined) this.selectButton = info.selectButton;
						if (info.filterTarget != undefined) this.filterTarget = get.filter(info.filterTarget);
						if (info.selectTarget != undefined) this.selectTarget = info.selectTarget;
						if (info.filterCard != undefined) {
							if (info.ignoreMod) this.ignoreMod = true;
							this.filterCard2 = get.filter(info.filterCard);
							this.filterCard = function (card, player, event) {
								var evt = event || _status.event;
								if (!evt.ignoreMod && player) {
									var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
									if (mod != 'unchanged') return mod;
								}
								return get.filter(evt.filterCard2).apply(this, arguments);
							};
						}
						if (info.filterOk == undefined) {
							this.filterOk = function () {
								var evt = _status.event;
								var card = get.card(), player = get.player();
								var filter = evt._backup.filterCard;
								if (filter && !filter(card, player, evt)) return false;
								if (evt._backup.filterOk) return evt._backup.filterOk();
								return true;
							};
						}
						else this.filterOk = info.filterOk;
						if (info.selectCard != undefined) this.selectCard = info.selectCard;
						if (info.position != undefined) this.position = info.position;
						//if(info.forced!=undefined) this.forced=info.forced;
						if (info.complexSelect != undefined) this.complexSelect = info.complexSelect;
						if (info.complexCard != undefined) this.complexCard = info.complexCard;
						if (info.complexTarget != undefined) this.complexTarget = info.complexTarget;
						if (info.ai1 != undefined) this.ai1 = info.ai1;
						if (info.ai2 != undefined) this.ai2 = info.ai2;
					}
					else {
						this.filterButton = info.filterButton ? get.filter(info.filterButton) : undefined;
						this.selectButton = info.selectButton;
						this.filterTarget = info.filterTarget ? get.filter(info.filterTarget) : undefined;
						this.selectTarget = info.selectTarget;
						this.filterCard = info.filterCard ? get.filter(info.filterCard) : undefined;
						this.selectCard = info.selectCard;
						this.position = info.position;
						//this.forced=info.forced;
						this.complexSelect = info.complexSelect;
						this.complexCard = info.complexCard;
						this.complexTarget = info.complexTarget;
						if (info.ai1 != undefined) this.ai1 = info.ai1;
						if (info.ai2 != undefined) this.ai2 = info.ai2;
						this.filterOk = info.filterOk;
					}
					delete this.fakeforce;
				}
				delete this._cardChoice;
				delete this._targetChoice;
				delete this._skillChoice;
				return this;
			}
			restore() {
				if (this._backup) {
					this.filterButton = this._backup.filterButton;
					this.selectButton = this._backup.selectButton;
					this.filterTarget = this._backup.filterTarget;
					this.selectTarget = this._backup.selectTarget;
					this.filterCard = this._backup.filterCard;
					this.selectCard = this._backup.selectCard;
					this.position = this._backup.position;
					this.forced = this._backup.forced;
					this.fakeforce = this._backup.fakeforce;
					this._aiexclude = this._backup._aiexclude;
					this.complexSelect = this._backup.complexSelect;
					this.complexCard = this._backup.complexCard;
					this.complexTarget = this._backup.complexTarget;
					this.ai1 = this._backup.ai1;
					this.ai2 = this._backup.ai2;
					this._cardChoice = this._backup._cardChoice;
					this._targetChoice = this._backup._targetChoice;
					this._skillChoice = this._backup._skillChoice;
					this.filterOk = this._backup.filterOk;
				}
				delete this.skill;
				delete this.ignoreMod;
				delete this.filterCard2;
				return this;
			}
			isMine() {
				return (this.player && this.player == game.me && !_status.auto && !this.player.isMad() && !game.notMe);
			}
			isOnline() {
				return (this.player && this.player.isOnline());
			}
			notLink() {
				return this.getParent().name != '_lianhuan' && this.getParent().name != '_lianhuan2';
			}
			isPhaseUsing(player) {
				var evt = this.getParent('phaseUse');
				if (!evt || evt.name != 'phaseUse') return false;
				return !player || player == evt.player;
			}
			addTrigger(skills, player) {
				if (!player || !skills) return this;
				let evt = this;
				if (typeof skills == 'string') skills = [skills];
				game.expandSkills(skills);
				while (true) {
					evt = evt.getParent('arrangeTrigger');
					if (!evt || evt.name != 'arrangeTrigger' || !evt.doingList) return this;
					const doing = evt.doingList.find(i => i.player === player);
					const firstDo = evt.doingList.find(i => i.player === "firstDo");
					const lastDo = evt.doingList.find(i => i.player === "lastDo");

					skills.forEach(skill => {
						const info = lib.skill[skill];
						if (!info.trigger) return;
						if (!Object.keys(info.trigger).some(i => {
							if (Array.isArray(info.trigger[i])) return info.trigger[i].includes(evt.triggername);
							return info.trigger[i] === evt.triggername;
						})) return;

						const toadd = {
							skill: skill,
							player: player,
							priority: get.priority(skill),
						};
						const map = info.firstDo ? firstDo : info.lastDo ? lastDo : doing;
						if (!map) return;
						if (map.doneList.some(i => i.skill === toadd.skill && i.player === toadd.player)) return;
						if (map.todoList.some(i => i.skill === toadd.skill && i.player === toadd.player)) return;
						map.todoList.add(toadd);
						if (typeof map.player === 'string') map.todoList.sort((a, b) => (b.priority - a.priority) || (evt.playerMap.indexOf(a) - evt.playerMap.indexOf(b)));
						else map.todoList.sort((a, b) => b.priority - a.priority);
					});
				}
			}
			removeTrigger(skills, player) {
				if (!player || !skills) return this;
				let evt = this;
				if (typeof skills == 'string') skills = [skills];
				game.expandSkills(skills);
				while (true) {
					evt = evt.getParent('arrangeTrigger');
					if (!evt || evt.name != 'arrangeTrigger' || !evt.doingList) return this;
					const doing = evt.doingList.find(i => i.player == player);
					const firstDo = evt.doingList.find(i => i.player == "firstDo");
					const lastDo = evt.doingList.find(i => i.player == "lastDo");

					skills.forEach(skill => [doing, firstDo, lastDo].forEach(map => {
						if (!map) return;
						const toremove = map.todoList.filter(i => i.skill == skill && i.player == player);
						if (toremove.length > 0) map.todoList.removeArray(toremove);
					}));
				}
			}
			trigger(name) {
				if (_status.video) return this;
				if ((this.name === 'gain' || this.name === 'lose') && !_status.gameDrawed) return this;
				if (name === 'gameDrawEnd') _status.gameDrawed = true;
				if (name === 'gameStart') {
					lib.announce.publish('gameStart', {});
					if (_status.brawl && _status.brawl.gameStart) _status.brawl.gameStart();
					if (lib.config.show_cardpile) ui.cardPileButton.style.display = '';
					_status.gameStarted = true;
					game.showHistory();
				}
				if (!lib.hookmap[name] && !lib.config.compatiblemode) return this;
				if (!game.players || !game.players.length) return this;
				const event = this;
				let start = [_status.currentPhase, event.source, event.player, game.me, game.players[0]].find(i => get.itemtype(i) == 'player');
				if (!start) return this;
				if (!game.players.includes(start) && !game.dead.includes(start)) start = game.findNext(start);
				const firstDo = {
					player: "firstDo",
					todoList: [],
					doneList: [],
				};
				const lastDo = {
					player: "lastDo",
					todoList: [],
					doneList: [],
				};
				const doingList = [];
				const roles = ['player', 'source', 'target', 'global'];
				const playerMap = game.players.concat(game.dead).sortBySeat(start);
				let player = start;
				let allbool = false;
				do {
					const doing = {
						player: player,
						todoList: [],
						doneList: [],
						listAdded: {},
						addList(skill) {
							if (!skill) return;
							if (Array.isArray(skill)) return skill.forEach(i => this.addList(i));
							if (this.listAdded[skill]) return;
							this.listAdded[skill] = true;

							const info = lib.skill[skill];
							const list = info.firstDo ? firstDo.todoList : info.lastDo ? lastDo.todoList : this.todoList;
							list.push({
								skill: skill,
								player: this.player,
								priority: get.priority(skill),
							});
							if (typeof list.player == 'string') list.sort((a, b) => (b.priority - a.priority) || (playerMap.indexOf(a) - playerMap.indexOf(b)));
							else list.sort((a, b) => b.priority - a.priority);
							allbool = true;
						}
					};

					const notemp = player.skills.slice();
					for (const j in player.additionalSkills) {
						if (!j.startsWith('hidden:')) notemp.addArray(player.additionalSkills[j]);
					}
					Object.keys(player.tempSkills).filter(skill => {
						if (notemp.includes(skill)) return false;
						const expire = player.tempSkills[skill];
						if (typeof expire === 'function') return expire(event, player, name);
						if (get.objtype(expire) === 'object') return roles.some(role => {
							if (role !== 'global' && player !== event[role]) return false;
							if (Array.isArray(expire[role])) return expire[role].includes(name);
							return expire[role] === name;
						});
					}).forEach(skill => {
						delete player.tempSkills[skill];
						player.removeSkill(skill);
					});

					if (lib.config.compatiblemode) {
						doing.addList(game.expandSkills(player.getSkills('invisible').concat(lib.skill.global)).filter(skill => {
							const info = get.info(skill);
							if (!info || !info.trigger) return false;
							return roles.some(role => {
								if (info.trigger[role] === name) return true;
								if (Array.isArray(info.trigger[role]) && info.trigger[role].includes(name)) return true;
							});
						}));
					}
					else roles.forEach(role => {
						doing.addList(lib.hook.globalskill[role + '_' + name]);
						doing.addList(lib.hook[player.playerid + '_' + role + '_' + name]);
					});
					delete doing.listAdded;
					delete doing.addList;
					doingList.push(doing);
					player = player.nextSeat;
				} while (player && player !== start);
				doingList.unshift(firstDo);
				doingList.push(lastDo);
				// console.log(name,event.player,doingList.map(i=>({player:i.player,todoList:i.todoList.slice(),doneList:i.doneList.slice()})))

				if (allbool) {
					const next = game.createEvent('arrangeTrigger', false, event);
					next.setContent('arrangeTrigger');
					next.doingList = doingList;
					next._trigger = event;
					next.triggername = name;
					next.playerMap = playerMap;
					event._triggering = next;
				}
				return this;
			}
			untrigger(all = true, player) {
				const evt = this._triggering;
				if (all) {
					this._triggered = 5;
					if (evt && evt.doingList) {
						evt.doingList.forEach(doing => doing.todoList = []);
					}
				}
				else if (player) {
					this._notrigger.add(player);
					// if(!evt||!evt.doingList) return this;
					// const doing=evt.doingList.find(doing=>doing.player==player);
					// if(doing) doing.todoList=[];
				}
				return this;
			}
			/**
			 * @returns {never}
			 */
			typeAnnotation() {
				/**
				 * @type {Player}
				 */
				this.source;
				/**
				 * @type {Player}
				 */
				this.player;
				/**
				 * @type {Player}
				 */
				this.target;
				/**
				 * @type {Player[]}
				 */
				this.targets;
				/**
				 * @type {Card}
				 */
				this.card;
				/**
				 * @type {Card[]}
				 */
				this.cards;
				/**
				 * @type {string}
				 */
				this.skill;
				/**
				 * @type {boolean}
				 */
				this.forced;
				/**
				 * @type {number}
				 */
				this.num;
				/**
				 * @type {GameEvent}
				 */
				this._trigger;
				/**
				 * @type {Record<string, any>}
				 */
				this._result;
				/**
				 * @type {number}
				 */
				this.baseDamage;
				/**
				 * @type {Player}
				 */
				this.customSource;
				/**
				 * @type {number}
				 */
				this.extraDamage;
				/**
				 * @type {string}
				 */
				this.nature;
				/**
				 * @type {boolean}
				 */
				this.notrigger;
				/**
				 * @type {number}
				 */
				this.original_num;
				/**
				 * @type {boolean}
				 */
				this.unreal;
				throw new Error('Do not call this method');
			}
			/**
			 * 事件转为Promise化
			 * 
			 * @returns { GameEventPromise }
			 */
			toPromise() {
				if (!this.#promise) {
					this.#promise = new lib.element.GameEventPromise(this);
				}
				return this.#promise;
			}
		},
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
		 * @todo 需要完成异步事件的debugger方法
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
		GameEventPromise: class extends Promise {
			// 我谢谢你，这里是必须有的
			// 否则Promise的方法对其子类无效
			static get [Symbol.species]() {
				return Promise;
			}
			#event;
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
					if (!_status.event) return;
					// game.createEvent的时候还没立即push到next里
					Promise.resolve().then(() => {
						/*
						// 事件自行处理skip情况
						if (event.player && event.player.skipList.includes(event.name)) {
							_status.event.trigger(event.name + 'Skipped');
							event.player.skipList.remove(event.name);
							if (lib.phaseName.includes(event.name)) event.player.getHistory('skipped').add(event.name);
							const eventPromise = _status.event.next.find(e => e.toEvent() == event);
							if (eventPromise) _status.event.next.remove(eventPromise);
							return;
						}
						*/
						game.executingAsyncEventMap.set(_status.event.toEvent(), (game.executingAsyncEventMap.get(_status.event.toEvent()) || Promise.resolve()).then(() => {
							let eventPromise = _status.event.next.find(e => e.toEvent() == event);
							// 如果父级事件也是一个异步的话，那应该立即执行这个事件的
							// 如果在AsyncFunction执行过程中在别的位置新建了一个异步事件，那也直接（等会set配置完）执行
							if (eventPromise && (_status.event.content instanceof AsyncFunction || Array.isArray(_status.event.contents))) {
								// 异步执行game.loop
								// 不直接game.loop(event)是因为需要让别人可以手动set()和setContent()
								// 再执行game.loop是因为原有的game.loop被await卡住了，
								// 得新执行一个只执行这个异步事件的game.loop

								if (_status.event != eventPromise) {
									eventPromise.parent = _status.event;
									_status.event = eventPromise;
									game.getGlobalHistory('everything').push(eventPromise);
								}
								return game.loop(eventPromise).then(() => {
									// 有时候event.finished还是false
									return eventPromise;
								});
							}
						}));
					});
				});
				this.#event = event;
				return new Proxy(this, {
					get(target, prop, receiver) {
						const thisValue = Reflect.get(target, prop);
						if (thisValue) {
							if (typeof thisValue == 'function') {
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
				return new Promise(resolve => {
					const runCode = function (event, code) {
						try {
							// 为了使玩家调试时使用var player=xxx时不报错，故使用var
							var { player, _trigger: trigger, _result: result } = event;
							return eval(code);
						} catch (error) {
							return error;
						}
					}.bind(window);
					const inputCallback = inputResult => {
						if (inputResult === false) {
							resolve(null);
						} else {
							const obj = runCode(this.toEvent(), inputResult);
							alert((!obj || obj instanceof Error) ? String(obj) : get.stringify(obj));
							game.promises.prompt('debugger调试').then(inputCallback);
						}
					};
					game.promises.prompt('debugger调试').then(inputCallback);
				});
			}
		},
		Dialog: class extends HTMLDivElement {
			constructor() {
				let hidden = false;
				let noTouchScroll = false;
				let forceButton = false;
				let noForceButton = false;
				/** @type {this} */
				const dialog = ui.create.div('.dialog');
				Object.setPrototypeOf(dialog, lib.element.Dialog.prototype);
				dialog.contentContainer = ui.create.div('.content-container', dialog);
				dialog.content = ui.create.div('.content', dialog.contentContainer);
				dialog.bar1 = ui.create.div('.bar.top', dialog);
				dialog.bar2 = ui.create.div('.bar.bottom', dialog);
				dialog.buttons = [];
				Array.from(arguments).forEach(argument => {
					if (typeof argument == 'boolean') dialog.static = argument;
					else if (argument == 'hidden') hidden = true;
					else if (argument == 'notouchscroll') noTouchScroll = true;
					else if (argument == 'forcebutton') forceButton = true;
					else if (argument == 'noforcebutton') noForceButton = true;
					else dialog.add(argument);
				});
				if (!hidden) dialog.open();
				if (!lib.config.touchscreen) dialog.contentContainer.onscroll = ui.update;
				if (!noTouchScroll) {
					dialog.contentContainer.ontouchstart = ui.click.dialogtouchStart;
					dialog.contentContainer.ontouchmove = ui.click.touchScroll;
					dialog.contentContainer.style.webkitOverflowScrolling = 'touch';
					dialog.ontouchstart = ui.click.dragtouchdialog;
				}
				if (noForceButton) dialog.noforcebutton = true;
				else if (forceButton) {
					dialog.forcebutton = true;
					dialog.classList.add('forcebutton');
				}
				return dialog;
			}
			add(item, noclick, zoom) {
				if (typeof item == 'string') {
					if (item.startsWith('###')) {
						var items = item.slice(3).split('###');
						this.add(items[0], noclick, zoom);
						this.addText(items[1], items[1].length <= 20, zoom);
					}
					else if (noclick) {
						var strstr = item;
						item = ui.create.div('', this.content);
						item.innerHTML = strstr;
					}
					else {
						item = ui.create.caption(item, this.content);
					}
				}
				else if (['div', 'fragment'].includes(get.objtype(item))) {
					this.content.appendChild(item);
				}
				else if (get.itemtype(item) == 'cards') {
					var buttons = ui.create.div('.buttons', this.content);
					if (zoom) buttons.classList.add('smallzoom');
					this.buttons = this.buttons.concat(ui.create.buttons(item, 'card', buttons, noclick));
				}
				else if (get.itemtype(item) == 'players') {
					var buttons = ui.create.div('.buttons', this.content);
					if (zoom) buttons.classList.add('smallzoom');
					this.buttons = this.buttons.concat(ui.create.buttons(item, 'player', buttons, noclick));
				}
				else if (item[1] == 'textbutton') {
					ui.create.textbuttons(item[0], this, noclick);
				}
				else {
					var buttons = ui.create.div('.buttons', this.content);
					if (zoom) buttons.classList.add('smallzoom');
					this.buttons = this.buttons.concat(ui.create.buttons(item[0], item[1], buttons, noclick));
				}
				if (this.buttons.length) {
					if (this.forcebutton !== false) this.forcebutton = true;
					if (this.buttons.length > 3 || (zoom && this.buttons.length > 5)) {
						this.classList.remove('forcebutton-auto');
					}
					else if (!this.noforcebutton) {
						this.classList.add('forcebutton-auto');
					}
				}
				ui.update();
				return item;
			}
			addText(str, center) {
				if (str && str.startsWith('<div')) this.add(str);
				else if (center !== false) {
					this.add('<div class="text center">' + str + '</div>');
				}
				else {
					this.add('<div class="text">' + str + '</div>');
				}
				return this;
			}
			addSmall(item, noclick) {
				return this.add(item, noclick, true);
			}
			addAuto(content) {
				if (content && content.length > 4 && !this._hovercustomed) {
					this.addSmall(content);
				}
				else {
					this.add(content);
				}
			}
			open() {
				if (this.noopen) return;
				for (var i = 0; i < ui.dialogs.length; i++) {
					if (ui.dialogs[i] == this) {
						this.show();
						this.refocus();
						ui.dialogs.remove(this);
						ui.dialogs.unshift(this);
						ui.update();
						return this;
					}
					if (ui.dialogs[i].static) ui.dialogs[i].unfocus();
					else ui.dialogs[i].hide();
				}
				ui.dialog = this;
				var translate;
				if (lib.config.remember_dialog && lib.config.dialog_transform && !this.classList.contains('fixed')) {
					translate = lib.config.dialog_transform;
					this._dragtransform = translate;
					this.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px) scale(0.8)';
				}
				else {
					this.style.transform = 'scale(0.8)';
				}
				this.style.transitionProperty = 'opacity,transform';
				this.style.opacity = 0;
				ui.arena.appendChild(this);
				ui.dialogs.unshift(this);
				ui.update();
				ui.refresh(this);
				if (lib.config.remember_dialog && lib.config.dialog_transform && !this.classList.contains('fixed')) {
					this.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px) scale(1)';
				}
				else {
					this.style.transform = 'scale(1)';
				}
				this.style.opacity = 1;
				var that = this;
				setTimeout(function () {
					that.style.transitionProperty = '';
				}, 500);
				return this;
			}
			close() {
				ui.dialogs.remove(this);
				this.delete();
				if (ui.dialogs.length > 0) {
					ui.dialog = ui.dialogs[0];
					ui.dialog.show();
					ui.dialog.refocus();
					ui.update();
				}
				// if(ui.arenalog){
				// 	ui.arenalog.classList.remove('withdialog');
				// }
				return this;
			}
			setCaption(str) {
				this.querySelector('.caption').innerHTML = str;
				return this;
			}
		},
		Control: class extends HTMLDivElement {
			constructor() {
				const nc = !ui.control.querySelector('div:not(.removing):not(.stayleft)');
				const controls = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
				const control = ui.create.div('.control');
				Object.setPrototypeOf(control, lib.element.Control.prototype);
				ui.control.insertBefore(control, _status.createControl || ui.confirm);
				controls.forEach(argument => {
					if (argument == 'nozoom') return;
					if (typeof argument == 'function') control.custom = argument;
					else if (argument == 'stayleft') {
						control.stayleft = true;
						control.classList.add('stayleft');
					}
					else control.add(argument);
				});
				ui.controls.unshift(control);
				if (nc) ui.control.animate('nozoom', 100);
				if (control.childNodes.length) {
					control.style.transition = 'opacity 0.5s';
					control.animate('controlpressdownx', 500);
					ui.refresh(control);
					if (!control.stayleft) control.style.transform = `translateX(-${control.offsetWidth / 2}px)`;
					control.style.opacity = 1;
					ui.refresh(control);
					control.style.transition = '';
				}

				control.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.control2);

				if (lib.config.button_press) {
					control.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
						if (this.classList.contains('disabled')) return;
						this.classList.add('controlpressdown');
						if (typeof this._offset == 'number') this.style.transform = `translateX(${this._offset}px) scale(0.97)`;
					});
					control.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
						this.classList.remove('controlpressdown');
						if (typeof this._offset == 'number') this.style.transform = `translateX(${this._offset}px)`;
					});
				}

				ui.updatec();
				return control;
			}
			open() {
				ui.control.insertBefore(this, _status.createControl || ui.confirm);
				ui.controls.unshift(this);
				if (this.childNodes.length) {
					this.style.transition = 'opacity 0.5s';
					ui.refresh(this);
					this.style.transform = 'translateX(-' + (this.offsetWidth / 2) + 'px)';
					this.style.opacity = 1;
					ui.refresh(this);
					this.style.transition = '';
				}
				else {
					this.animate('controlpressdownx', 500);
				}
				ui.updatec();
				return this;
			}
			add(item) {
				var node = document.createElement('div');
				this.appendChild(node);
				node.link = item;
				node.innerHTML = get.translation(item);
				node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.control);
			}
			close() {
				this.animate('controlpressdownx', 500);

				ui.controls.remove(this);
				this.delete();

				setTimeout(ui.updatec, 100);


				if (ui.confirm == this) delete ui.confirm;
				if (ui.skills == this) delete ui.skills;
				if (ui.skills2 == this) delete ui.skills2;
				if (ui.skills3 == this) delete ui.skills3;
			}
			replace() {
				// this.animate('controlpressdownx',500);
				if (this.replaceTransition === false) {
					this.style.transitionProperty = 'none';
					ui.refresh(this);
				}

				while (this.childNodes.length) this.firstChild.remove();
				var i, controls;
				if (Array.isArray(arguments[0])) controls = arguments[0];
				else controls = arguments;
				delete this.custom;
				for (i = 0; i < controls.length; i++) {
					if (typeof controls[i] == 'function') {
						this.custom = controls[i];
					}
					else {
						this.add(controls[i]);
					}
				}
				if (this.childNodes.length) {
					var width = 0;
					for (i = 0; i < this.childNodes.length; i++) width += this.childNodes[i].offsetWidth;
					ui.refresh(this);
					this.style.width = width + 'px';
				}
				ui.updatec();
				if (this.replaceTransition === false) {
					var that = this;
					setTimeout(function () {
						that.style.transitionProperty = '';
					}, 200);
				}
				return this;
			}
		},
		Client: class {
			/**
			 * @param {NodeWS | InstanceType<typeof import('ws').WebSocket>} ws
			 */
			constructor(ws) {
				this.ws = ws;
				this.id = ws.wsid || get.id();
				this.closed = false;
			}
			send() {
				if (this.closed) return this;
				var args = Array.from(arguments);
				if (typeof args[0] == 'function') {
					args.unshift('exec');
				}
				for (var i = 1; i < args.length; i++) {
					args[i] = get.stringifiedResult(args[i]);
				}
				try {
					this.ws.send(JSON.stringify(args));
				}
				catch (e) {
					this.ws.close();
				}
				return this;
			}
			close() {
				lib.node.clients.remove(this);
				lib.node.observing.remove(this);
				if (ui.removeObserve && !lib.node.observing.length) {
					ui.removeObserve.remove();
					delete ui.removeObserve;
				}
				this.closed = true;
				if (_status.waitingForPlayer) {
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == this.id) {
							game.connectPlayers[i].uninitOL();
							delete game.connectPlayers[i].playerid;
						}
					}
					if (game.onlinezhu == this.id) {
						game.onlinezhu = null;
					}
					game.updateWaiting();
				}
				else if (lib.playerOL[this.id]) {
					var player = lib.playerOL[this.id];
					player.setNickname(player.nickname + ' - 离线');
					game.broadcast(function (player) {
						player.setNickname(player.nickname + ' - 离线');
					}, player);
					player.unwait('ai');
				}

				if (window.isNonameServer) {
					document.querySelector('#server_count').innerHTML = lib.node.clients.length;
				}
				return this;
			}
		},
		NodeWS: class {
			/**
			 * @param {string} id
			 */
			constructor(id) {
				this.wsid = id;
			}
			send(message) {
				game.send('server', 'send', this.wsid, message);
			}
			on(type, func) {
				this['on' + type] = func;
			}
			close() {
				game.send('server', 'close', this.wsid);
			}
		},
		ws: {
			onopen: function () {
				if (_status.connectCallback) {
					_status.connectCallback(true);
					delete _status.connectCallback;
				}
			},
			onmessage: function (messageevent) {
				if (messageevent.data == 'heartbeat') {
					this.send('heartbeat');
					return;
				}
				var message;
				try {
					message = JSON.parse(messageevent.data);
					if (!Array.isArray(message) ||
						typeof lib.message.client[message[0]] !== 'function') {
						throw ('err');
					}
					for (var i = 1; i < message.length; i++) {
						message[i] = get.parsedResult(message[i]);
					}
				}
				catch (e) {
					console.log(e);
					console.log('invalid message: ' + messageevent.data);
					return;
				}
				lib.message.client[message.shift()].apply(null, message);
			},
			onerror: function (e) {
				if (this._nocallback) return;
				if (_status.connectCallback) {
					_status.connectCallback(false);
					delete _status.connectCallback;
				}
				else {
					alert('连接失败');
				}
			},
			onclose: function () {
				if (this._nocallback) return;
				if (_status.connectCallback) {
					_status.connectCallback(false);
					delete _status.connectCallback;
				}
				if (game.online || game.onlineroom) {
					if ((game.servermode || game.onlinehall) && _status.over) {
						void 0;
					}
					else {
						localStorage.setItem(lib.configprefix + 'directstart', true);
						game.reload();
					}
				}
				else {
					// game.saveConfig('reconnect_info');
				}
				game.online = false;
				game.ws = null;
			}
		},
		/**
		 * @legacy Use {@link lib.element.Player.prototype} instead.
		 */
		get player() {
			return this.Player.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Card.prototype} instead.
		 */
		get card() {
			return this.Card.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Button.prototype} instead.
		 */
		get button() {
			return this.Button.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.GameEvent.prototype} instead.
		 */
		get event() {
			return this.GameEvent.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Dialog.prototype} instead.
		 */
		get dialog() {
			return this.Dialog.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Control.prototype} instead.
		 */
		get control() {
			return this.Control.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Client.prototype} instead.
		 */
		get client() {
			return this.Client.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.NodeWS.prototype} instead.
		 */
		get nodews() {
			return this.NodeWS.prototype;
		}
	};
	static card = {
		list: [],
		cooperation_damage: {
			fullskin: true,
		},
		cooperation_draw: {
			fullskin: true,
			cardimage: 'cooperation_damage',
		},
		cooperation_discard: {
			fullskin: true,
			cardimage: 'cooperation_damage',
		},
		cooperation_use: {
			fullskin: true,
			cardimage: 'cooperation_damage',
		},
		pss_paper: {
			type: 'pss',
			fullskin: true,
		},
		pss_scissor: {
			type: 'pss',
			fullskin: true,
		},
		pss_stone: {
			type: 'pss',
			fullskin: true,
		},
		feichu_equip1: {
			type: "equip",
			subtype: "equip1",
		},
		feichu_equip2: {
			type: "equip",
			subtype: "equip2",
		},
		feichu_equip3: {
			type: "equip",
			subtype: "equip3",
		},
		feichu_equip4: {
			type: "equip",
			subtype: "equip4",
		},
		feichu_equip5: {
			type: "equip",
			subtype: "equip5",
		},
		feichu_equip6: {
			type: "equip",
			subtype: "equip6",
		},
		zhengsu_leijin: {},
		zhengsu_mingzhi: {},
		zhengsu_bianzhen: {},
		disable_judge: {},
		group_wei: { fullskin: true },
		group_shu: { fullskin: true },
		group_wu: { fullskin: true },
		group_qun: { fullskin: true },
		group_key: { fullskin: true },
		group_jin: { fullskin: true },

		db_atk1: {
			type: 'db_atk',
			fullimage: true,
		},
		db_atk2: {
			type: 'db_atk',
			fullimage: true,
		},
		db_def1: {
			type: 'db_def',
			fullimage: true,
		},
		db_def2: {
			type: 'db_def',
			fullimage: true,
		},
	};
	static filter = {
		all: () => true,
		none: () => false,
		//Check if the card does not count toward the player's hand limit
		//检测此牌是否不计入此角色的手牌上限
		ignoredHandcard: (card, player) => game.checkMod(card, player, false, 'ignoredHandcard', player),
		//Check if the card is giftable
		//检测此牌是否可赠予
		cardGiftable: (card, player, target, strict) => {
			const mod = game.checkMod(card, player, target, 'unchanged', 'cardGiftable', player);
			if (!mod || strict && (mod == 'unchanged' && (get.position(card) != 'h' || !get.cardtag(card, 'gifts')) || player == target)) return false;
			return get.type(card, false) != 'equip' || target.canEquip(card, true);
		},
		//Check if the card is recastable
		//检查此牌是否可重铸
		cardRecastable: (card, player, source, strict) => {
			if (typeof player == 'undefined') player = get.owner(card);
			const mod = game.checkMod(card, player, source, 'unchanged', 'cardRecastable', player);
			if (!mod) return false;
			if (strict && mod == 'unchanged') {
				if (get.position(card) != 'h') return false;
				const info = get.info(card), recastable = info.recastable || info.chongzhu;
				return Boolean(typeof recastable == 'function' ? recastable(_status.event, player) : recastable);
			}
			return true;
		},
		//装备栏相关
		canBeReplaced: function (card, player) {
			var mod = game.checkMod(card, player, 'unchanged', 'canBeReplaced', player);
			if (mod != 'unchanged') return mod;
			return true;
		},
		//装备栏 END
		buttonIncluded: function (button) {
			return !(_status.event.excludeButton && _status.event.excludeButton.contains(button));
		},
		filterButton: function (button) {
			return true;
		},
		cardSavable: function (card, player, target) {
			if (get.itemtype(card) == 'card') {
				var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
				if (mod2 != 'unchanged') return mod2;
			}
			var mod = game.checkMod(card, player, target, 'unchanged', 'cardSavable', player);
			if (mod != 'unchanged') return mod;
			var savable = get.info(card).savable;
			if (typeof savable == 'function') savable = savable(card, player, target);
			return savable;
		},
		/**
		 * 
		 * @param {GameEvent} event 
		 * @param {Player} player 
		 * @param {string} triggername 
		 * @param {string} skill 
		 * @returns {boolean}
		 */
		filterTrigger: function (event, player, triggername, skill) {
			if (player._hookTrigger && player._hookTrigger.some(i => {
				const info = lib.skill[i].hookTrigger;
				return info && info.block && info.block(event, player, triggername, skill);
			})) return false;
			const info = get.info(skill);
			if (!info) {
				console.error(new ReferenceError('缺少info的技能:', skill));
				return false;
			}
			if (!game.expandSkills(player.getSkills(true).concat(lib.skill.global)).includes(skill)) return false;
			if (!game.expandSkills(player.getSkills(false).concat(lib.skill.global)).includes(skill)) {//hiddenSkills
				if (get.mode() != 'guozhan') return false;
				if (info.noHidden) return false;
			}
			if (!info.forceDie && player.isDead()) return false;
			if (!info.forceOut && (player.isOut() || player.removed)) return false;
			if (!info.trigger) return false;
			if (!Object.keys(info.trigger).some(role => {
				if (role != 'global' && player != event[role]) return false;
				if (Array.isArray(info.trigger[role])) return info.trigger[role].includes(triggername);
				return info.trigger[role] == triggername;
			})) return false;
			if (info.filter && !info.filter(event, player, triggername)) return false;
			if (event._notrigger.includes(player) && !lib.skill.global.includes(skill)) return false;
			if (typeof info.usable == 'number' && player.hasSkill('counttrigger') &&
				player.storage.counttrigger && player.storage.counttrigger[skill] >= info.usable) return false;
			if (info.round && (info.round - (game.roundNumber - player.storage[skill + '_roundcount']) > 0)) return false;
			if (player.storage[`temp_ban_${skill}`] === true) return false;
			return true;
		},
		characterDisabled: function (i, libCharacter) {
			if (!lib.character[i] || lib.character[i][4] && lib.character[i][4].contains('forbidai')) return true;
			if (lib.character[i][4] && lib.character[i][4].contains('unseen')) return true;
			if (lib.config.forbidai.contains(i)) return true;
			if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) return true;
			if (_status.connectMode) {
				if (lib.configOL.banned.contains(i) || lib.connectBanned.contains(i)) return true;
				var double_character = false;
				if (lib.configOL.mode == 'guozhan') {
					double_character = true;
				}
				else if (lib.configOL.double_character && (lib.configOL.mode == 'identity' || lib.configOL.mode == 'stone')) {
					double_character = true;
				}
				else if (lib.configOL.double_character_jiange && (lib.configOL.mode == 'versus' && _status.mode == 'jiange')) {
					double_character = true;
				}
				if (double_character && lib.config.forbiddouble.contains(i)) {
					return true;
				}
				// if(lib.configOL.ban_weak){
				// 	if(lib.config.replacecharacter[i]&&libCharacter&&libCharacter[lib.config.replacecharacter[i]]) return true;
				// 	if(lib.config.forbidall.contains(i)) return true;
				// 	if(!double_character&&get.rank(i,true)<=2){
				// 		return true;
				// 	}
				// }
				// if(lib.configOL.ban_strong&&get.rank(i,true)>=8){
				// 	return true;
				// }
			}
			else {
				if (lib.config.banned.contains(i)) return true;
				var double_character = false;
				if (get.mode() == 'guozhan') {
					double_character = true;
				}
				else if (get.config('double_character') && (lib.config.mode == 'identity' || lib.config.mode == 'stone')) {
					double_character = true;
				}
				else if (get.config('double_character_jiange') && (lib.config.mode == 'versus' && _status.mode == 'jiange')) {
					double_character = true;
				}
				if (double_character && lib.config.forbiddouble.contains(i)) {
					return true;
				}
				// if(get.config('ban_weak')){
				// 	if(lib.config.replacecharacter[i]&&lib.character[lib.config.replacecharacter[i]]) return true;
				// 	if(lib.config.forbidall.contains(i)) return true;
				// 	if(!double_character&&get.rank(i,true)<=2){
				// 		return true;
				// 	}
				// }
				// if(get.config('ban_strong')&&get.rank(i,true)>=8){
				// 	return true;
				// }
			}
		},
		characterDisabled2: function (i) {
			var info = lib.character[i];
			if (!info) return true;
			if (info[4]) {
				if (info[4].contains('boss')) return true;
				if (info[4].contains('hiddenboss')) return true;
				if (info[4].contains('minskin')) return true;
				if (info[4].contains('unseen')) return true;
				if (info[4].contains('forbidai') && (!_status.event.isMine || !_status.event.isMine())) return true;
				if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) return true;
			}
			return false;
		},
		skillDisabled: function (skill) {
			if (!lib.translate[skill] || !lib.translate[skill + '_info']) return true;
			var info = lib.skill[skill];
			if (info && !info.unique && !info.temp && !info.sub && !info.fixed && !info.vanish) {
				return false;
			}
			return true;
		},
		cardEnabled: function (card, player, event) {
			if (player == undefined) player = _status.event.player;
			if (!player) return false;
			if (get.itemtype(card) == 'card') {
				var mod2 = game.checkMod(card, player, event, 'unchanged', 'cardEnabled2', player);
				if (mod2 != 'unchanged') return mod2;
			}
			card = get.autoViewAs(card);
			if (event === 'forceEnable') {
				var mod = game.checkMod(card, player, event, 'unchanged', 'cardEnabled', player);
				if (mod != 'unchanged') return mod;
				return true;
			}
			else {
				var filter = get.info(card).enable;
				if (!filter) return;
				var mod = game.checkMod(card, player, event, 'unchanged', 'cardEnabled', player);
				if (mod != 'unchanged') return mod;
				if (typeof filter == 'boolean') return filter;
				if (typeof filter == 'function') return filter(card, player, event);
			}
		},
		cardRespondable: function (card, player, event) {
			event = event || _status.event;
			if (event.name != 'chooseToRespond') return true;
			var source = event.getParent().player;
			if (source && source != player) {
				if (source.hasSkillTag('norespond', false, [card, player, event], true)) {
					return false;
				}
			}
			if (player == undefined) player = _status.event.player;
			if (get.itemtype(card) == 'card') {
				var mod2 = game.checkMod(card, player, event, 'unchanged', 'cardEnabled2', player);
				if (mod2 != 'unchanged') return mod2;
			}
			var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
			if (mod != 'unchanged') return mod;
			return true;
		},
		cardUsable2: function (card, player, event) {
			card = get.autoViewAs(card);
			var info = get.info(card);
			if (info.updateUsable == 'phaseUse') {
				event = event || _status.event;
				if (event.type == 'chooseToUse_button') event = event.getParent();
				if (player != _status.event.player) return true;
				if (event.getParent().name != 'phaseUse') return true;
				if (event.getParent().player != player) return true;
			}
			var num = info.usable;
			if (typeof num == 'function') num = num(card, player);
			num = game.checkMod(card, player, num, 'cardUsable', player);
			if (typeof num != 'number') return true;
			else return (player.countUsed(card) < num);
		},
		cardUsable: function (card, player, event) {
			card = get.autoViewAs(card);
			var info = get.info(card);
			event = event || _status.event;
			if (event.type == 'chooseToUse_button') event = event.getParent();
			if (player != _status.event.player) return true;
			if (info.updateUsable == 'phaseUse') {
				if (event.getParent().name != 'phaseUse') return true;
				if (event.getParent().player != player) return true;
			}
			event.addCount_extra = true;
			var num = info.usable;
			if (typeof num == 'function') num = num(card, player);
			num = game.checkMod(card, player, num, 'cardUsable', player);
			if (typeof num != 'number') {
				return (typeof num == 'boolean') ? num : true;
			}
			if (player.countUsed(card) < num) return true;
			if (game.hasPlayer(function (current) {
				return game.checkMod(card, player, current, false, 'cardUsableTarget', player);
			})) {
				return true;
			}
			return false;
		},
		cardDiscardable: function (card, player, event) {
			event = event || _status.event;
			if (typeof event != 'string') event = event.getParent().name;
			var mod = game.checkMod(card, player, event, 'unchanged', 'cardDiscardable', player);
			if (mod != 'unchanged') return mod;
			return true;
		},
		canBeDiscarded: function (card, player, target, event) {
			event = event || _status.event;
			if (typeof event != 'string') event = event.getParent().name;
			var mod = game.checkMod(card, player, target, event, 'unchanged', 'canBeDiscarded', target);
			if (mod != 'unchanged') return mod;
			return true;
		},
		canBeGained: function (card, player, target, event) {
			event = event || _status.event;
			if (typeof event != 'string') event = event.getParent().name;
			var mod = game.checkMod(card, player, target, event, 'unchanged', 'canBeGained', target);
			if (mod != 'unchanged') return mod;
			return true;
		},
		cardAiIncluded: function (card) {
			if (_status.event.isMine()) return true;
			return (_status.event._aiexclude.contains(card) == false);
		},
		filterCard: function (card, player, event) {
			var info = get.info(card);
			//if(info.toself&&!lib.filter.targetEnabled(card,player,player)) return false;
			if (player == undefined) player = _status.event.player;
			if (!lib.filter.cardEnabled(card, player, event) || !lib.filter.cardUsable(card, player, event)) return false;
			if (info.notarget) return true;
			var range;
			var select = get.copy(info.selectTarget);
			if (select == undefined) {
				if (info.filterTarget == undefined) return true;
				range = [1, 1];
			}
			else if (typeof select == 'number') range = [select, select];
			else if (get.itemtype(select) == 'select') range = select;
			else if (typeof select == 'function') range = select(card, player);
			game.checkMod(card, player, range, 'selectTarget', player);
			if (!range || range[1] != -1) return true;
			var filterTarget = (event && event.filterTarget) ? event.filterTarget : lib.filter.filterTarget;
			return game.hasPlayer(function (current) {
				return filterTarget(card, player, current);
			});
		},
		targetEnabledx: function (card, player, target) {
			if (!card) return false;
			if (!target || !target.isIn()) return false;
			var event = _status.event;
			if (event._backup && event._backup.filterCard == lib.filter.filterCard && (!lib.filter.cardEnabled(card, player, event) || !lib.filter.cardUsable(card, player, event))) return false;
			if (event.addCount_extra) {
				if (!lib.filter.cardUsable2(card, player) && !game.checkMod(card, player, target, false, 'cardUsableTarget', player)) return false;
			}
			var info = get.info(card);
			if (info.singleCard && info.filterAddedTarget && ui.selected.targets.length) return Boolean(info.filterAddedTarget(card, player, target, ui.selected.targets[ui.selected.targets.length - 1]));
			return lib.filter.targetEnabled.apply(this, arguments);
		},
		targetEnabled: function (card, player, target) {
			if (!card) return false;
			if (!target || !target.isIn()) return false;
			var info = get.info(card);
			var filter = info.filterTarget;
			if (!info.singleCard || ui.selected.targets.length == 0) {
				var mod = game.checkMod(card, player, target, 'unchanged', 'playerEnabled', player);
				if (mod != 'unchanged') return mod;
				var mod = game.checkMod(card, player, target, 'unchanged', 'targetEnabled', target);
				if (mod != 'unchanged') return mod;
			}
			if (typeof filter == 'boolean') return filter;
			if (typeof filter == 'function') return Boolean(filter(card, player, target));
		},
		targetEnabled2: function (card, player, target) {
			if (!card) return false;
			if (!target || !target.isIn()) return false;
			if (lib.filter.targetEnabled(card, player, target)) return true;

			if (game.checkMod(card, player, target, 'unchanged', 'playerEnabled', player) == false) return false;
			if (game.checkMod(card, player, target, 'unchanged', 'targetEnabled', target) == false) return false;

			var filter = get.info(card).modTarget;
			if (typeof filter == 'boolean') return filter;
			if (typeof filter == 'function') return Boolean(filter(card, player, target));
			return false;
		},
		targetEnabled3: function (card, player, target) {
			if (!card) return false;
			if (!target || !target.isIn()) return false;
			var info = get.info(card);

			if (info.filterTarget == true) return true;
			if (typeof info.filterTarget == 'function' && info.filterTarget(card, player, target)) return true;

			if (info.modTarget == true) return true;
			if (typeof info.modTarget == 'function' && info.modTarget(card, player, target)) return true;
			return false;
		},
		targetInRange: function (card, player, target) {
			var info = get.info(card);
			var range = info.range;
			var outrange = info.outrange;
			if (range == undefined && outrange == undefined) return true;

			var mod = game.checkMod(card, player, target, 'unchanged', 'targetInRange', player);
			var extra = 0;
			if (mod != 'unchanged') {
				if (typeof mod == 'boolean') return mod;
				if (typeof mod == 'number') extra = mod;
			}
			if (typeof info.range == 'function') return info.range(card, player, target);

			if (player.hasSkill('undist') || target.hasSkill('undist')) return false;
			for (var i in range) {
				if (i == 'attack') {
					var range2 = player.getAttackRange();
					if (range2 <= 0) return false;
					var distance = get.distance(player, target) + extra;
					if (range[i] <= distance - range2) return false;
				}
				else {
					var distance = get.distance(player, target, i) + extra;
					if (range[i] < distance) return false;
				}
			}
			for (var i in outrange) {
				if (i == 'attack') {
					var range2 = player.getAttackRange();
					if (range2 <= 0) return false;
					var distance = get.distance(player, target) + extra;
					if (outrange[i] > distance - range2 + 1) return false;
				}
				else {
					var distance = get.distance(player, target, i) + extra;
					if (outrange[i] > distance) return false;
				}
			}
			return true;
		},
		filterTarget: function (card, player, target) {
			return (lib.filter.targetEnabledx(card, player, target) &&
				lib.filter.targetInRange(card, player, target));
		},
		filterTarget2: function (card, player, target) {
			return (lib.filter.targetEnabled2(card, player, target) &&
				lib.filter.targetInRange(card, player, target));
		},
		notMe: function (card, player, target) {
			return player != target;
		},
		isMe: function (card, player, target) {
			return player == target;
		},
		attackFrom: function (card, player, target) {
			return get.distance(player, target, 'attack') <= 1;
		},
		globalFrom: function (card, player, target) {
			return get.distance(player, target) <= 1;
		},
		selectCard: function () {
			return [1, 1];
		},
		selectTarget: function (card, player) {
			if (!card) card = get.card();
			if (!player) player = get.player();
			if (card == undefined) return;
			var range, info = get.info(card);
			var select = get.copy(info.selectTarget);
			if (select == undefined) {
				if (info.filterTarget == undefined) return [0, 0];
				range = [1, 1];
			}
			else if (typeof select == 'number') range = [select, select];
			else if (get.itemtype(select) == 'select') range = select;
			else if (typeof select == 'function') range = select(card, player);
			game.checkMod(card, player, range, 'selectTarget', player);
			if (info.singleCard && info.filterAddedTarget) return [range[0] * 2, range[1] * 2];
			return range;
		},
		judge: function (card, player, target) {
			return target.canAddJudge(card);
		},
		autoRespondSha: function () {
			return !this.player.hasSha(true);
		},
		autoRespondShan: function () {
			return !this.player.hasShan();
		},
		wuxieSwap: function (event) {
			if (event.type == 'wuxie') {
				if (ui.wuxie && ui.wuxie.classList.contains('glow')) {
					return true;
				}
				if (ui.tempnowuxie && ui.tempnowuxie.classList.contains('glow') && event.state > 0) {
					var triggerevent = event.getTrigger();
					if (triggerevent) {
						if (ui.tempnowuxie._origin == triggerevent.parent.id) {
							return true;
						}
					}
					else if (ui.tempnowuxie._origin == _status.event.id2) {
						return true;
					}
				}
				if (lib.config.wuxie_self) {
					var tw = event.info_map;
					if (tw.player && tw.player.isUnderControl(true) && !tw.player.hasSkillTag('noautowuxie') &&
						(!tw.targets || tw.targets.length <= 1) && !tw.noai) {
						return true;
					}
				}
			}
		}
	};
	static sort = {
		nature: function (a, b) {
			return (lib.nature.get(b) || 0) - (lib.nature.get(a) || 0);
		},
		group: function (a, b) {
			const groupSort = function (group) {
				let base = 0;
				if (group == 'wei') return base;
				if (group == 'shu') return base + 1;
				if (group == 'wu') return base + 2;
				if (group == 'qun') return base + 3;
				if (group == 'jin') return base + 4;
				if (group == 'key') return base + 5;
				if (group == 'western') return base + 6;
				if (group == 'shen') return base + 7;
				if (group == 'double') return base + 7;
				return base + 9;
			};
			return groupSort(a) - groupSort(b);
		},
		character: function (a, b) {
			const groupSort = function (name) {
				const info = get.character(name);
				if (!info) return 7;
				let base = 0;
				if (get.is.double(name, true)) base = 9;
				const group = info[1];
				if (group == 'shen') return base - 1;
				if (group == 'wei') return base;
				if (group == 'shu') return base + 1;
				if (group == 'wu') return base + 2;
				if (group == 'qun') return base + 3;
				if (group == 'jin') return base + 4;
				if (group == 'key') return base + 5;
				if (group == 'western') return base + 6;
				return base + 7;
			};
			const del = groupSort(a) - groupSort(b);
			if (del != 0) return del;
			let aa = a, bb = b;
			if (a.includes('_')) {
				a = a.slice(a.indexOf('_') + 1);
			}
			if (b.includes('_')) {
				b = b.slice(b.indexOf('_') + 1);
			}
			if (a != b) {
				return a > b ? 1 : -1;
			}
			return aa > bb ? 1 : -1;
		},
		card: function (a, b) {
			var typeSort = function (name) {
				var type = get.type(name);
				if (!type) return 10;
				if (type == 'basic') return -1;
				if (type == 'trick') return 0;
				if (type == 'delay') return 1;
				if (type == 'equip') {
					var type2 = get.subtype(name, false);
					if (type2 && type2.slice) return 1 + parseInt(type2.slice(5) || 7);
					return 8.5;
				}
				return 9;
			};
			var del = typeSort(a) - typeSort(b);
			if (del != 0) return del;
			var aa = a, bb = b;
			if (a.includes('_')) {
				a = a.slice(a.indexOf('_') + 1);
			}
			if (b.includes('_')) {
				b = b.slice(b.indexOf('_') + 1);
			}
			if (a != b) {
				return a > b ? 1 : -1;
			}
			return aa > bb ? 1 : -1;
		},
		random: function () {
			return (Math.random() - 0.5);
		},
		seat: function (a, b) {
			var player = lib.tempSortSeat || _status.event.player;
			var delta = get.distance(player, a, 'absolute') - get.distance(player, b, 'absolute');
			if (delta) return delta;
			delta = parseInt(a.dataset.position) - parseInt(b.dataset.position);
			if (player.side == game.me.side) return delta;
			return -delta;
		},
		position: function (a, b) {
			return parseInt(a.dataset.position) - parseInt(b.dataset.position);
		},
		priority: function (a, b) {
			var i1 = get.info(a[0]), i2 = get.info(b[0]);
			if (i1.priority == undefined) i1.priority = 0;
			if (i2.priority == undefined) i2.priority = 0;
			if (i1.priority == i2.priority) {
				if (i1.forced == undefined && i2.forced == undefined) return 0;
				if (i1.forced && i2.forced) return 0;
				if (i1.forced) return 1;
				if (i2.forced) return -1;
			}
			return i2.priority - i1.priority;
		},
		number: function (a, b) {
			return get.number(a) - get.number(b);
		},
		number2: function (a, b) {
			return get.number(b) - get.number(a);
		},
		capt: function (a, b) {
			var aa = a, bb = b;
			if (aa.includes('_')) {
				aa = aa.slice(aa.indexOf('_') + 1);
			}
			if (bb.includes('_')) {
				bb = bb.slice(bb.indexOf('_') + 1);
			}
			if (aa != bb) {
				return aa > bb ? 1 : -1;
			}
			return a > b ? 1 : -1;
		},
		name: function (a, b) {
			if (a > b) return 1;
			if (a < b) return -1;
			return 0;
		}
	};
	static skill = {
		stratagem_fury: {
			marktext: '🔥',
			intro: {
				name: '怒气',
				content: (storage, player) => {
					const stratagemFuryMax = _status.stratagemFuryMax, fury = storage || 0;
					return `当前怒气值：${typeof stratagemFuryMax == 'number' ? `${fury}/${stratagemFuryMax}` : fury}`;
				}
			}
		},
		_stratagem_add_buff: {
			log: false,
			enable: 'chooseToUse',
			filter: (event, player) => {
				const fury = player.storage.stratagem_fury;
				if (!fury) return false;
				const stratagemSettings = event.stratagemSettings;
				if (!stratagemSettings || !stratagemSettings.roundOneUseFury && game.roundNumber < 2) return false;
				const cards = player.getCards('hs');
				if (!cards.length) return false;
				const cost = lib.stratagemBuff.cost, names = Array.from(cost.keys());
				if (!names.length) return false;
				return cards.some(card => game.checkMod(card, player, 'unchanged', 'cardEnabled2', player) && names.some(availableName => availableName == get.name(card, player) && event.filterCard(new lib.element.VCard({
					name: availableName,
					nature: get.nature(card, player),
					isCard: true,
					cards: [card]
				}), player, event) && fury >= cost.get(availableName)));
			},
			onChooseToUse: event => {
				const player = _status.event.player, fury = player.storage.stratagem_fury;
				if (!fury) return;
				if (!event.stratagemSettings && !game.online) event.set('stratagemSettings', {
					roundOneUseFury: _status.connectMode ? lib.configOL.round_one_use_fury : get.config('round_one_use_fury')
				});
				const cost = lib.stratagemBuff.cost.get('shan');
				if (typeof cost != 'number' || !event.shanRequired) return;
				event.addNumber('shanIgnored', Math.min(player.countCards(lib.skill._stratagem_add_buff.position, {
					name: 'shan'
				}), Math.floor(fury / cost)));
			},
			check: card => {
				const player = _status.event.player;
				if (_status.event.type == 'phase') {
					const cardName = get.name(card, player);
					if (cardName == 'sha') {
						if (game.hasPlayer(current => {
							if (!player.canUse(card, current)) return false;
							const storage = player.storage, zhibi = storage.zhibi;
							return (zhibi && !zhibi.includes(current) || (get.effect(current, card, player, player) >= 2 - Math.max(0, (storage.stratagem_fury || 0) - 1))) && current.mayHaveShan() && player.hasSkill('jiu');
						})) return 1;
						return 0;
					}
					if (cardName == 'tao') {
						if (player.hp <= 2 && player.getDamagedHp() >= 2) return 1;
						return 0;
					}
					return 1;
				}
				if (_status.event.type == 'dying') return get.attitude(player, _status.event.dying) > 3 ? 1 : 0;
				return (_status.event.getParent().shanRequired || 1) > 1 && get.damageEffect(player, _status.event.getParent().player || player, player) < 0 ? 1 : 0;
			},
			position: 'hs',
			filterCard: (card, player, event) => {
				if (!event) event = _status.event;
				const filterCard = event._backup.filterCard;
				const cost = lib.stratagemBuff.cost;
				return Array.from(cost.keys()).some(availableName => availableName == get.name(card, player) && filterCard(new lib.element.VCard({
					name: availableName,
					nature: get.nature(card, player),
					isCard: true,
					cards: [card]
				}), player, _status.event) && player.storage.stratagem_fury >= cost.get(availableName));
			},
			viewAs: (cards, player) => {
				const cardName = get.name(cards[0], player);
				return cardName ? new lib.element.VCard({
					name: cardName,
					nature: get.nature(cards[0], player),
					suit: get.suit(cards[0], player),
					number: get.number(cards[0], player),
					isCard: true,
					cards: [cards[0]],
					storage: {
						stratagem_buffed: 1
					}
				}) : new lib.element.VCard();
			},
			prompt: () => {
				const span = document.createElement('span');
				span.classList.add('text');
				span.style.fontFamily = 'yuanli';
				const stratagemBuff = lib.stratagemBuff, cost = stratagemBuff.cost;
				stratagemBuff.prompt.forEach((prompt, cardName) => {
					const li = document.createElement('li');
					li.innerHTML = `【${get.translation(cardName)}】：${cost.get(cardName)}点怒气。${prompt()}`;
					span.appendChild(li);
				});
				return `当你需要使用位于“强化表”内的非虚拟卡牌时，你可以消耗对应数量的怒气将其强化并使用。${document.createElement('hr').outerHTML}${span.outerHTML}`;
			},
			onuse: (result, player) => {
				player.logSkill(result.skill);
				const stratagemBuff = lib.stratagemBuff, cardName = result.card.name;
				player.changeFury(-stratagemBuff.cost.get(cardName), true);
				const gameEvent = get.event(), effect = stratagemBuff.effect.get(cardName);
				if (typeof effect == 'function') gameEvent.pushHandler('onNextUseCard', effect);
				gameEvent.pushHandler('onNextUseCard', (event, option) => {
					if (event.step == 0 && option.state == 'end') game.broadcastAll(cards => cards.forEach(card => card.clone.classList.add('stratagem-fury-glow')), event.cards);
				});
			},
			ai: {
				order: (item, player) => {
					if (!player) player = _status.event.player;
					if (_status.event.type == 'phase') for (const card of player.getCards('hs')) {
						if (!game.checkMod(card, player, 'unchanged', 'cardEnabled2', player)) continue;
						const cardName = get.name(card, player);
						if (cardName == 'sha') {
							if (game.hasPlayer(current => {
								if (!player.canUse(card, current)) return false;
								const storage = player.storage, zhibi = storage.zhibi;
								return (zhibi && !zhibi.contains(current) || (get.effect(current, card, player, player) >= 2 - Math.max(0, (storage.stratagem_fury || 0) - 1))) && current.mayHaveShan();
							})) return get.order(card, player) + 0.5;
						}
						else if (cardName == 'tao' && player.hp <= 2 && player.getDamagedHp() >= 2) return get.order(card, player) + 0.5;
						return 8;
					}
					return 3.5;
				},
				directHit_ai: true,
				skillTagFilter: (player, tag, arg) => {
					const card = get.autoViewAs(arg.card);
					if (card.name != 'sha' || !card.storage.stratagem_buffed) return false;
					const target = arg.target;
					if (target.countCards('h', 'shan') >= 1 && !target.storage.stratagem_fury) return false;
				}
			}
		},
		expandedSlots: {
			markimage: 'image/card/expandedSlots.png',
			intro: {
				markcount: function (storage, player) {
					var all = 0, storage = player.expandedSlots;
					if (!storage) return 0;
					for (var key in storage) {
						var num = storage[key];
						if (typeof num == 'number' && num > 0) {
							all += num;
						}
					}
					return all;
				},
				content: function (storage, player) {
					storage = player.expandedSlots;
					if (!storage) return '当前没有扩展装备栏';
					const keys = Object.keys(storage).sort(), combined = get.is.mountCombined();
					let str = '';
					for (const key of keys) {
						const num = storage[key];
						if (typeof num == 'number' && num > 0) {
							let trans = get.translation(key);
							if (combined && key == 'equip3') trans = '坐骑';
							str += '<li>' + trans + '栏：' + num + '个<br>';
						}
					}
					if (str.length) return str.slice(0, str.length - 4);
					return '当前没有扩展装备栏';
				},
			},
		},
		charge: {
			markimage: 'image/card/charge.png',
			intro: {
				content: '当前蓄力点数：#',
			},
		},
		cooperation: {
			charlotte: true,
			trigger: {
				global: ['phaseAfter', 'dieAfter'],
			},
			forced: true,
			lastDo: true,
			filter: function (event, player) {
				if (event.name == 'die' && event.player.isAlive()) return false;
				var storage = player.getStorage('cooperation');
				for (var info of storage) {
					if (info.target == event.player) return true;
				}
				return false;
			},
			content: function () {
				for (var i = 0; i < player.storage.cooperation.length; i++) {
					var info = player.storage.cooperation[i];
					if (info.target == trigger.player) {
						player.removeCooperation(info);
						i--;
					}
				}
			},
			onremove: function (player, skill) {
				var storage = player.getStorage(skill);
				var reasons = [];
				for (var i of storage) reasons.add(i.type);
				for (var i of reasons) player.removeSkill(skill + '_' + i);
				delete player.storage[i];
			},
			subSkill: {
				damage: {
					mark: true,
					trigger: { global: 'damage' },
					forced: true,
					charlotte: true,
					popup: false,
					firstDo: true,
					filter: function (event, player) {
						if (!event.source) return false;
						var storage = player.getStorage('cooperation');
						for (var info of storage) {
							if (info.type == 'damage' && (event.source == player || event.source == info.target)) return true;
						}
						return false;
					},
					checkx: (info) => (info.damage && info.damage > 3),
					content: function () {
						var source = trigger.source;
						var storage = player.getStorage('cooperation');
						for (var info of storage) {
							if (info.type == 'damage' && (source == player || source == info.target)) {
								if (!info.damage) info.damage = 0;
								info.damage += trigger.num;
							}
						}
						player.markSkill('cooperation_damage');
					},
					marktext: '仇',
					intro: {
						name: '协力 - 同仇',
						markcount: function (storage, player) {
							return Math.max.apply(Math, player.getStorage('cooperation').map(function (info) {
								return info.damage || 0;
							}));
						},
						content: function (storage, player) {
							var str = '', storage = player.getStorage('cooperation');
							for (var info of storage) {
								if (info.type == 'damage') {
									str += '<br><li>协力角色：' + get.translation(info.target);
									str += '<br><li>协力原因：' + get.translation(info.reason);
									str += '<br><li>协力进度：';
									var num = (info.damage || 0);
									str += num;
									str += '/4';
									str += (num > 3 ? ' (已完成)' : ' (未完成)');
									str += '<br>　　';
								}
							}
							return str.slice(4, str.length - 6);
						},
					},
				},
				draw: {
					mark: true,
					trigger: { global: 'gainAfter' },
					forced: true,
					charlotte: true,
					popup: false,
					firstDo: true,
					filter: function (event, player) {
						if (event.getParent().name != 'draw') return false;
						var storage = player.getStorage('cooperation');
						for (var info of storage) {
							if (info.type == 'draw' && (event.player == player || event.player == info.target)) return true;
						}
						return false;
					},
					checkx: (info) => (info.draw && info.draw > 7),
					content: function () {
						var source = trigger.player;
						var storage = player.getStorage('cooperation');
						for (var info of storage) {
							if (info.type == 'draw' && (source == player || source == info.target)) {
								if (!info.draw) info.draw = 0;
								info.draw += trigger.cards.length;
							}
						}
						player.markSkill('cooperation_draw');
					},
					marktext: '进',
					intro: {
						name: '协力 - 并进',
						markcount: function (storage, player) {
							return Math.max.apply(Math, player.getStorage('cooperation').map(function (info) {
								return info.draw || 0;
							}));
						},
						content: function (storage, player) {
							var str = '', storage = player.getStorage('cooperation');
							for (var info of storage) {
								if (info.type == 'draw') {
									str += '<br><li>协力角色：' + get.translation(info.target);
									str += '<br><li>协力原因：' + get.translation(info.reason);
									str += '<br><li>协力进度：';
									var num = (info.draw || 0);
									str += num;
									str += '/8';
									str += (num > 7 ? ' (已完成)' : ' (未完成)');
									str += '<br>　　';
								}
							}
							return str.slice(4, str.length - 6);
						},
					},
				},
				discard: {
					mark: true,
					trigger: { global: 'loseAfter' },
					forced: true,
					charlotte: true,
					popup: false,
					firstDo: true,
					filter: function (event, player) {
						if (event.type != 'discard') return false;
						var storage = player.getStorage('cooperation');
						for (var info of storage) {
							if (info.type == 'discard' && (event.player == player || event.player == info.target)) return true;
						}
						return false;
					},
					checkx: (info) => (info.discard && info.discard.length > 3),
					content: function () {
						var source = trigger.player;
						var storage = player.getStorage('cooperation');
						for (var info of storage) {
							if (info.type == 'discard' && (source == player || source == info.target)) {
								if (!info.discard) info.discard = [];
								for (var i of trigger.cards2) {
									var suit = get.suit(i, player);
									if (lib.suit.contains(suit)) info.discard.add(suit);
								}
							}
						}
						player.markSkill('cooperation_discard');
					},
					marktext: '财',
					intro: {
						name: '协力 - 疏财',
						markcount: function (storage, player) {
							return Math.max.apply(Math, player.getStorage('cooperation').map(function (info) {
								return info.discard ? info.discard.length : 0;
							}));
						},
						content: function (storage, player) {
							var str = '', storage = player.getStorage('cooperation');
							for (var info of storage) {
								if (info.type == 'discard') {
									str += '<br><li>协力角色：' + get.translation(info.target);
									str += '<br><li>协力原因：' + get.translation(info.reason);
									str += '<br><li>进度：';
									var suits = info.discard || [];
									var suits2 = [['spade', '♠', '♤'], ['heart', '♥', '♡'], ['club', '♣', '♧'], ['diamond', '♦', '♢']];
									for (var i of suits2) {
										str += (suits.contains(i[0]) ? i[1] : i[2]);
									}
									str += (suits.length > 3 ? ' (已完成)' : ' (未完成)');
									str += '<br>　　';
								}
							}
							return str.slice(4, str.length - 6);
						},
					},
				},
				use: {
					mark: true,
					trigger: { global: 'useCard1' },
					forced: true,
					charlotte: true,
					popup: false,
					firstDo: true,
					filter: function (event, player) {
						var suit = get.suit(event.card);
						if (!lib.suit.contains(suit)) return false;
						var storage = player.getStorage('cooperation');
						for (var info of storage) {
							if (info.type == 'use'
								&& (event.player == player || event.player == info.target) &&
								(!info.used || !info.used.contains(suit))) return true;
						}
						return false;
					},
					checkx: (info) => (info.used && info.used.length > 3),
					content: function () {
						var source = trigger.player, suit = get.suit(trigger.card);
						var storage = player.getStorage('cooperation');
						for (var info of storage) {
							if (info.type == 'use' && (source == player || source == info.target)) {
								if (!info.used) info.used = [];
								info.used.add(suit);
							}
						}
						player.markSkill('cooperation_use');
					},
					marktext: '戮',
					intro: {
						name: '协力 - 戮力',
						markcount: function (storage, player) {
							return Math.max.apply(Math, player.getStorage('cooperation').map(function (info) {
								return info.used ? info.used.length : 0;
							}));
						},
						content: function (storage, player) {
							var str = '', storage = player.getStorage('cooperation');
							for (var info of storage) {
								if (info.type == 'use') {
									str += '<br><li>协力角色：' + get.translation(info.target);
									str += '<br><li>协力原因：' + get.translation(info.reason);
									str += '<br><li>进度：';
									var suits = info.used || [];
									var suits2 = [['spade', '♠', '♤'], ['heart', '♥', '♡'], ['club', '♣', '♧'], ['diamond', '♦', '♢']];
									for (var i of suits2) {
										str += (suits.contains(i[0]) ? i[1] : i[2]);
									}
									str += (suits.length > 3 ? ' (已完成)' : ' (未完成)');
									str += '<br>　　';
								}
							}
							return str.slice(4, str.length - 6);
						},
					},
				},
			},
		},
		zhengsu: {
			trigger: { player: 'phaseDiscardEnd' },
			forced: true,
			charlotte: true,
			filter: function (event, player) {
				return (player.storage.zhengsu_leijin || player.storage.zhengsu_bianzhen || player.storage.zhengsu_mingzhi);
			},
			content: function () {
				player.chooseDrawRecover(2, '整肃奖励：摸两张牌或回复1点体力');
			},
			subSkill: {
				leijin: {
					mod: {
						aiOrder: function (player, card, num) {
							if (typeof card.number != 'number') return;
							var history = player.getHistory('useCard', evt => evt.isPhaseUsing());
							if (history.length == 0) return num + 10 * (14 - card.number);
							var num = get.number(history[0].card);
							if (!num) return;
							for (var i = 1; i < history.length; i++) {
								var num2 = get.number(history[i].card);
								if (!num2 || num2 <= num) return;
								num = num2;
							}
							if (card.number > num) return num + 10 * (14 - card.number);
						},
					},
					mark: true,
					trigger: { player: 'useCard1' },
					lastDo: true,
					charlotte: true,
					forced: true,
					popup: false,
					onremove: true,
					filter: function (event, player) {
						return player.isPhaseUsing() && player.storage.zhengsu_leijin !== false;
					},
					content: function () {
						var list = player.getHistory('useCard', function (evt) {
							return evt.isPhaseUsing(player);
						});
						var goon = true;
						for (var i = 0; i < list.length; i++) {
							var num = get.number(list[i].card);
							if (typeof num != 'number') {
								goon = false;
								break;
							}
							if (i > 0) {
								var num2 = get.number(list[i - 1].card);
								if (typeof num2 != 'number' || num2 >= num) {
									goon = false;
									break;
								}
							}
						}
						if (!goon) {
							game.broadcastAll(function (player) {
								player.storage.zhengsu_leijin = false;
								if (player.marks.zhengsu_leijin) player.marks.zhengsu_leijin.firstChild.innerHTML = '╳';
								delete player.storage.zhengsu_leijin_markcount;
							}, player);
						}
						else {
							if (list.length > 2) {
								game.broadcastAll(function (player, num) {
									if (player.marks.zhengsu_leijin) player.marks.zhengsu_leijin.firstChild.innerHTML = '○';
									player.storage.zhengsu_leijin = true;
									player.storage.zhengsu_leijin_markcount = num;
								}, player, num);
							}
							else game.broadcastAll(function (player, num) {
								player.storage.zhengsu_leijin_markcount = num;
							}, player, num);
						}
						player.markSkill('zhengsu_leijin');
					},
					intro: {
						content: '<li>条件：回合内所有于出牌阶段使用的牌点数递增且不少于三张。',
					},
				},
				bianzhen: {
					mark: true,
					trigger: { player: 'useCard1' },
					firstDo: true,
					charlotte: true,
					forced: true,
					popup: false,
					onremove: true,
					filter: function (event, player) {
						return player.isPhaseUsing() && player.storage.zhengsu_bianzhen !== false;
					},
					content: function () {
						var list = player.getHistory('useCard', function (evt) {
							return evt.isPhaseUsing();
						});
						var goon = true, suit = get.suit(list[0].card, false);
						if (suit == 'none') {
							goon = false;
						}
						else {
							for (var i = 1; i < list.length; i++) {
								if (get.suit(list[i]) != suit) {
									goon = false;
									break;
								}
							}
						}
						if (!goon) {
							game.broadcastAll(function (player) {
								player.storage.zhengsu_bianzhen = false;
								if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = '╳';
							}, player);
						}
						else {
							if (list.length > 1) {
								game.broadcastAll(function (player) {
									if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = '○';
									player.storage.zhengsu_bianzhen = true;
								}, player);
							}
							else game.broadcastAll(function (player, suit) {
								if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = get.translation(suit);
							}, player, suit);
						}
						player.markSkill('zhengsu_bianzhen');
					},
					intro: {
						content: '<li>条件：回合内所有于出牌阶段使用的牌花色相同且不少于两张。',
					},
					ai: {
						effect: {
							player_use: function (card, player, target) {
								if (typeof card != 'object' || !player.isPhaseUsing()) return;
								var suitx = get.suit(card);
								var history = player.getHistory('useCard');
								if (!history.length) {
									var val = 0;
									if (player.hasCard(function (cardx) {
										return get.suit(cardx) == suitx && card != cardx && (!card.cards || !card.cards.contains(cardx)) && player.hasValueTarget(cardx);
									}, 'hs')) val = [2, 0.1];
									if (val) return val;
									return;
								}
								var num = 0;
								var suit = false;
								for (var i = 0; i < history.length; i++) {
									var suit2 = get.suit(history[i].card);
									if (!lib.suit.contains(suit2)) return;
									if (suit && suit != suit2) return;
									suit = suit2;
									num++;
								}
								if (suitx == suit && num == 1) return [1, 0.1];
								if (suitx != suit && (num > 1 || num <= 1 && player.hasCard(function (cardx) {
									return get.suit(cardx) == suit && player.hasValueTarget(cardx);
								}, 'hs'))) return 'zeroplayertarget';
							},
						},
					},
				},
				mingzhi: {
					mark: true,
					trigger: { player: 'loseAfter' },
					firstDo: true,
					charlotte: true,
					forced: true,
					popup: false,
					onremove: true,
					filter: function (event, player) {
						if (player.storage.zhengsu_mingzhi === false || event.type != 'discard') return false;
						var evt = event.getParent('phaseDiscard');
						return evt && evt.player == player;
					},
					content: function () {
						var goon = true, list = [];
						player.getHistory('lose', function (event) {
							if (!goon || event.type != 'discard') return false;
							var evt = event.getParent('phaseDiscard');
							if (evt && evt.player == player) {
								for (var i of event.cards2) {
									var suit = get.suit(i, player);
									if (list.contains(suit)) {
										goon = false;
										break;
									}
									else list.push(suit);
								}
							}
						});
						if (!goon) {
							game.broadcastAll(function (player) {
								player.storage.zhengsu_mingzhi = false;
								if (player.marks.zhengsu_mingzhi) player.marks.zhengsu_mingzhi.firstChild.innerHTML = '╳';
								delete player.storage.zhengsu_mingzhi_list;
							}, player);
						}
						else {
							if (list.length > 1) {
								game.broadcastAll(function (player, list) {
									if (player.marks.zhengsu_mingzhi) player.marks.zhengsu_mingzhi.firstChild.innerHTML = '○';
									player.storage.zhengsu_mingzhi = true;
									player.storage.zhengsu_mingzhi_list = list;
									player.storage.zhengsu_mingzhi_markcount = list.length;
								}, player, list);
							}
							else game.broadcastAll(function (player, list) {
								player.storage.zhengsu_mingzhi_list = list;
								player.storage.zhengsu_mingzhi_markcount = list.length;
							}, player, list);
						}
						player.markSkill('zhengsu_mingzhi');
					},
					intro: {
						content: '<li>条件：回合内所有于弃牌阶段弃置的牌花色均不相同且不少于两张。',
					},
				},
			},
		},
		renku: {
			intro: {
				markcount: function () {
					return _status.renku.length;
				},
				mark: function (dialog, content, player) {
					if (!_status.renku.length) return '仁库中没有牌';
					else dialog.addAuto(_status.renku);
				},
				content: function () {
					if (!_status.renku.length) return '仁库中没有牌';
					return get.translation(_status.renku);
				},
			},
		},
		_showHiddenCharacter: {
			trigger: { player: ['changeHp', 'phaseBeginStart', 'loseMaxHpBegin', 'gainMaxHpBegin'] },
			firstDo: true,
			forced: true,
			popup: false,
			priority: 25,
			filter: function (event, player, name) {
				return player.isUnseen(2) && get.mode() != 'guozhan';
			},
			content: function () {
				player.showCharacter(2);
				player.removeSkill('g_hidden_ai');
			},
		},
		_kamisha: {
			trigger: { source: 'damageBegin2' },
			//forced:true,
			popup: false,
			prompt: function (event, player) {
				return '是否防止即将对' + get.translation(event.player) + '造成的伤害，改为令其减少' + get.cnNumber(event.num) + '点体力上限？';
			},
			filter: function (event, player) {
				return event.hasNature('kami') && event.num > 0;
			},
			ruleSkill: true,
			check: function (event, player) {
				var att = get.attitude(player, event.player);
				if (event.player.hp == event.player.maxHp) return att < 0;
				if (event.player.hp == event.player.maxHp - 1 &&
					(event.player.maxHp <= 3 || event.player.hasSkillTag('maixie'))) return att < 0;
				return att > 0;
			},
			content: function () {
				trigger.cancel();
				trigger.player.loseMaxHp(trigger.num).source = player;
			},
		},
		aozhan: {
			charlotte: true,
			mod: {
				targetEnabled: function (card) {
					if (card.name == 'tao' && (card.isCard && card.cardid || get.itemtype(card) == 'card')) return false;
				},
				cardSavable: function (card) {
					if (card.name == 'tao' && (card.isCard && card.cardid || get.itemtype(card) == 'card')) return false;
				},
			},
			group: ["aozhan_sha", "aozhan_shan"],
			subSkill: {
				sha: {
					enable: ["chooseToUse", "chooseToRespond"],
					filterCard: {
						name: "tao",
					},
					viewAs: {
						name: "sha",
						isCard: true,
					},
					viewAsFilter: function (player) {
						if (!player.countCards('hs', 'tao')) return false;
					},
					position: 'hs',
					prompt: "将一张桃当杀使用或打出",
					check: function () { return 1; },
					ai: {
						respondSha: true,
						skillTagFilter: function (player) {
							if (!player.countCards('hs', 'tao')) return false;
						},
						order: function () {
							return get.order({ name: 'sha' }) - 0.1;
						},
					},
					sub: true,
				},
				shan: {
					enable: ["chooseToRespond", "chooseToUse"],
					filterCard: {
						name: "tao",
					},
					viewAs: {
						name: "shan",
						isCard: true,
					},
					prompt: "将一张桃当闪打出",
					check: function () { return 1; },
					viewAsFilter: function (player) {
						if (!player.countCards('hs', 'tao')) return false;
					},
					position: 'hs',
					ai: {
						respondShan: true,
						skillTagFilter: function (player) {
							if (!player.countCards('hs', 'tao')) return false;
						},
					},
					sub: true,
				},
			},
		},
		global: [],
		globalmap: {},
		storage: {},
		undist: {},
		others: {},
		zhu: {},
		zhuSkill: {},
		land_used: {},
		unequip: { ai: { unequip: true } },
		subplayer: {
			trigger: { player: 'dieBefore' },
			forced: true,
			priority: -9,
			onremove: true,
			mark: 'character',
			intro: {
				content: function (storage, player) {
					if (typeof storage.intro2 == 'string') return storage.intro2;
					if (typeof storage.intro2 == 'function') return storage.intro2(storage, player);
					return '死亡前切换回主武将';
				},
				name: function (storage) {
					return get.rawName(storage.name);
				}
			},
			content: function () {
				trigger.cancel();
				var evt = trigger.getParent('damage');
				if (evt.player == player) {
					evt.untrigger(false, player);
				}
				player.exitSubPlayer(true);
			},
			ai: {
				nosave: true
			}
		},
		autoswap: {
			firstDo: true,
			trigger: {
				player: ['playercontrol', 'chooseToUseBegin', 'chooseToRespondBegin', 'chooseToDiscardBegin', 'chooseToCompareBegin',
					'chooseButtonBegin', 'chooseCardBegin', 'chooseTargetBegin', 'chooseCardTargetBegin', 'chooseControlBegin',
					'chooseBoolBegin', 'choosePlayerCardBegin', 'discardPlayerCardBegin', 'gainPlayerCardBegin', 'chooseToMoveBegin', 'chooseToPlayBeatmapBegin']
			},
			forced: true,
			priority: 100,
			forceDie: true,
			popup: false,
			filter: function (event, player) {
				if (event.autochoose && event.autochoose()) return false;
				if (lib.filter.wuxieSwap(event)) return false;
				if (_status.auto || !player.isUnderControl()) return false;
				return true;
			},
			content: function () {
				game.swapPlayerAuto(player);
			},
		},
		dualside: {
			charlotte: true,
			subSkill: {
				turn: {
					trigger: { player: ['turnOverAfter', 'dieBefore'] },
					silent: true,
					filter: function (event, player) {
						if (player.storage.dualside_over) return false;
						return Array.isArray(player.storage.dualside);
					},
					content: function () {
						var cfg = player.storage.dualside;
						var bool = player.isTurnedOver();
						if (trigger.name == 'die') {
							bool = !bool;
						}
						if (bool) {
							cfg[1] = player.hp;
							cfg[2] = player.maxHp;
							player.reinit(cfg[0], cfg[3], [cfg[4], cfg[5]]);
							player.unmarkSkill('dualside');
							player.markSkillCharacter('dualside', { name: cfg[0] }, '正面', '当前体力：' + cfg[1] + '/' + cfg[2]);
						}
						else {
							cfg[4] = player.hp;
							cfg[5] = player.maxHp;
							player.reinit(cfg[3], cfg[0], [cfg[1], cfg[2]]);
							player.unmarkSkill('dualside');
							player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', '当前体力：' + cfg[4] + '/' + cfg[5]);
						}

						if (trigger.name == 'die') {
							trigger.cancel();
							delete player.storage.dualside;
							player.storage.dualside_over = true;
							player.unmarkSkill('dualside');
						}
					}
				},
				init: {
					trigger: { global: 'gameStart', player: 'enterGame' },
					silent: true,
					content: function () {
						var list = [player.name, player.name1, player.name2];
						for (var i = 0; i < list.length; i++) {
							if (list[i] && lib.character[list[i]]) {
								var info = lib.character[list[i]];
								if (info[3].contains('dualside') && info[4]) {
									player.storage.dualside = [list[i], player.hp, player.maxHp];
									for (var j = 0; j < info[4].length; j++) {
										if (info[4][j].startsWith('dualside:')) {
											var name2 = info[4][j].slice(9);
											var info2 = lib.character[name2];
											player.storage.dualside.push(name2);
											player.storage.dualside.push(get.infoHp(info2[2]));
											player.storage.dualside.push(get.infoMaxHp(info2[2]));
										}
									}
								}
							}
						}
						var cfg = player.storage.dualside;
						if (get.mode() == 'guozhan') {
							if (player.name1 == cfg[0]) {
								player.showCharacter(0);
							}
							else {
								player.showCharacter(1);
							}
						}
						player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', '当前体力：' + cfg[4] + '/' + cfg[5]);
					}
				}
			},
			group: ['dualside_init', 'dualside_turn']
		},
		fengyin: {
			init: function (player, skill) {
				player.addSkillBlocker(skill);
			},
			onremove: function (player, skill) {
				player.removeSkillBlocker(skill);
			},
			charlotte: true,
			skillBlocker: function (skill, player) {
				return !lib.skill[skill].charlotte && !get.is.locked(skill, player);
			},
			mark: true,
			intro: {
				content: function (storage, player, skill) {
					var list = player.getSkills(null, false, false).filter(function (i) {
						return lib.skill.fengyin.skillBlocker(i, player);
					});
					if (list.length) return '失效技能：' + get.translation(list);
					return '无失效技能';
				}
			}
		},
		baiban: {
			init: function (player, skill) {
				player.addSkillBlocker(skill);
			},
			onremove: function (player, skill) {
				player.removeSkillBlocker(skill);
			},
			charlotte: true,
			skillBlocker: function (skill, player) {
				return !lib.skill[skill].charlotte;
			},
			mark: true,
			intro: {
				content: function (storage, player, skill) {
					var list = player.getSkills(null, false, false).filter(function (i) {
						return lib.skill.baiban.skillBlocker(i, player);
					});
					if (list.length) return '失效技能：' + get.translation(list);
					return '无失效技能';
				}
			}
		},
		qianxing: {
			mark: true,
			nopop: true,
			init: function (player) {
				game.log(player, '获得了', '【潜行】');
			},
			intro: {
				content: '锁定技，你不能成为其他角色的卡牌的目标'
			},
			mod: {
				targetEnabled: function (card, player, target) {
					if (player != target) return false;
				}
			}
		},
		mianyi: {
			trigger: { player: 'damageBefore' },
			mark: true,
			forced: true,
			init: function (player) {
				game.log(player, '获得了', '【免疫】');
			},
			content: function () {
				trigger.cancel();
			},
			ai: {
				nofire: true,
				nothunder: true,
				nodamage: true,
				effect: {
					target: function (card, player, target, current) {
						if (get.tag(card, 'damage')) return [0, 0];
					}
				},
			},
			intro: {
				content: '防止一切伤害'
			}
		},
		mad: {
			mark: true,
			locked: true,
			intro: {
				content: '已进入混乱状态',
				name: '混乱',
				onunmark: function (storage, player) {
					game.log(player, '解除混乱状态');
				}
			}
		},
		ghujia: {
			intro: {
				content: function (content, player) {
					return '已有' + get.cnNumber(player.hujia) + '点护甲值';
				}
			},
			markimage: 'image/card/shield.png',
		},
		counttrigger: {
			trigger: { global: 'phaseAfter' },
			silent: true,
			charlotte: true,
			priority: -100,
			lastDo: true,
			content: function () {
				player.removeSkill('counttrigger');
				delete player.storage.counttrigger;
			},
			group: 'counttrigger_2',
			subSkill: {
				2: {
					trigger: { global: ['phaseBeforeStart', 'roundStart'] },
					silent: true,
					charlotte: true,
					firstDo: true,
					priority: 100,
					content: function () {
						player.removeSkill('counttrigger');
						delete player.storage.counttrigger;
					},
				}
			}
		},
		_recovercheck: {
			trigger: { player: 'recoverBefore' },
			forced: true,
			priority: 100,
			firstDo: true,
			popup: false,
			filter: function (event, player) {
				return player.hp >= player.maxHp;
			},
			content: function () {
				trigger.cancel();
			},
		},
		/**
		 * @deprecated
		 */
		/*_turnover:{
			trigger:{player:'phaseBefore'},
			forced:true,
			forceOut:true,
			priority:100,
			popup:false,
			firstDo:true,
			content:function(){
				if(player.isTurnedOver()&&!trigger._noTurnOver){
					trigger.cancel();
					player.turnOver();
					player.phaseSkipped=true;
				}
				else{
					player.phaseSkipped=false;
				}
				var isRound=false;
				if(!trigger.skill){
					isRound=_status.roundSkipped;
					if(_status.isRoundFilter){
						isRound=_status.isRoundFilter(trigger,player);
					}
					else if(_status.seatNumSettled){
						var seatNum=player.getSeatNum();
						if(seatNum!=0){
							if(typeof _status.lastSeatNum!='number'||seatNum<_status.lastSeatNum) isRound=true;
							_status.lastSeatNum=seatNum;
						}
					}
					else if(player==_status.roundStart) isRound=true;
					if(isRound){
						delete _status.roundSkipped;
						game.roundNumber++;
						trigger._roundStart=true;
						game.updateRoundNumber();
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].isOut()&&game.players[i].outCount>0){
								game.players[i].outCount--;
								if(game.players[i].outCount==0&&!game.players[i].outSkills){
									game.players[i].in();
								}
							}
						}
						event.trigger('roundStart');
					}
				}
				_status.globalHistory.push({
					cardMove:[],
					custom:[],
					useCard:[],
					changeHp:[],
					everything:[],
				});
				var players=game.players.slice(0).concat(game.dead);
				for(var i=0;i<players.length;i++){
					var current=players[i];
					current.actionHistory.push({useCard:[],respond:[],skipped:[],lose:[],gain:[],sourceDamage:[],damage:[],custom:[],useSkill:[]});
					current.stat.push({card:{},skill:{}});
					if(isRound){
						current.getHistory().isRound=true;
						current.getStat().isRound=true;
					}
				};
				if(!player.phaseSkipped){
					player.getHistory().isMe=true;
					player.getStat().isMe=true;
				}
				if(isRound){
					game.getGlobalHistory().isRound=true;
				}
			},
		},*/
		_usecard: {
			trigger: { global: 'useCardAfter' },
			forced: true,
			popup: false,
			priority: -100,
			lastDo: true,
			filter: function (event) {
				return !event._cleared && event.card.name != 'wuxie';
			},
			content: function () {
				game.broadcastAll(function () {
					ui.clear();
				});
				event._cleared = true;
			}
		},
		_discard: {
			trigger: { global: ['discardAfter', 'loseToDiscardpileAfter', 'loseAsyncAfter'] },
			forced: true,
			popup: false,
			priority: -100,
			lastDo: true,
			filter: function (event) {
				return ui.todiscard[event.discardid] ? true : false;
			},
			content: function () {
				game.broadcastAll(function (id) {
					var todiscard = ui.todiscard[id];
					delete ui.todiscard[id];
					if (todiscard) {
						var time = 1000;
						if (typeof todiscard._discardtime == 'number') {
							time += todiscard._discardtime - get.time();
						}
						if (time < 0) {
							time = 0;
						}
						setTimeout(function () {
							for (var i = 0; i < todiscard.length; i++) {
								todiscard[i].delete();
							}
						}, time);
					}
				}, trigger.discardid);
			}
		},
		_save: {
			//trigger:{source:'dying2',player:'dying2'},
			priority: 5,
			forced: true,
			popup: false,
			filter: function (event, player) {
				//if(!event.player.isDying()) return false;
				//if(event.source&&event.source.isIn()&&event.source!=player) return false;
				//return true;
				return false;
			},
			content: function () {
				"step 0";
				event.dying = trigger.player;
				if (!event.acted) event.acted = [];
				"step 1";
				if (trigger.player.isDead()) {
					event.finish();
					return;
				}
				event.acted.push(player);
				var str = get.translation(trigger.player) + '濒死，是否帮助？';
				var str2 = '当前体力：' + trigger.player.hp;
				if (lib.config.tao_enemy && event.dying.side != player.side && lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && !event.dying.hasSkillTag('revertsave')) {
					event._result = { bool: false };
				}
				else if (player.canSave(event.dying)) {
					player.chooseToUse({
						filterCard: function (card, player, event) {
							event = event || _status.event;
							return lib.filter.cardSavable(card, player, event.dying);
						},
						filterTarget: function (card, player, target) {
							if (target != _status.event.dying) return false;
							if (!card) return false;
							var info = get.info(card);
							if (!info.singleCard || ui.selected.targets.length == 0) {
								var mod = game.checkMod(card, player, target, 'unchanged', 'playerEnabled', player);
								if (mod == false) return false;
								var mod = game.checkMod(card, player, target, 'unchanged', 'targetEnabled', target);
								if (mod != 'unchanged') return mod;
							}
							return true;
						},
						prompt: str,
						prompt2: str2,
						ai1: function (card) {
							if (typeof card == 'string') {
								var info = get.info(card);
								if (info.ai && info.ai.order) {
									if (typeof info.ai.order == 'number') {
										return info.ai.order;
									}
									else if (typeof info.ai.order == 'function') {
										return info.ai.order();
									}
								}
							}
							return 1;
						},
						ai2: get.effect_use,
						type: 'dying',
						targetRequired: true,
						dying: event.dying
					});
				}
				else {
					event._result = { bool: false };
				}
				"step 2";
				if (result.bool) {
					var player = trigger.player;
					if (player.hp <= 0 && !trigger.nodying && !player.nodying && player.isAlive() && !player.isOut() && !player.removed) event.goto(0);
					else trigger.untrigger();
				}
				else {
					for (var i = 0; i < 20; i++) {
						if (event.acted.contains(event.player.next)) {
							break;
						}
						else {
							event.player = event.player.next;
							if (!event.player.isOut()) {
								event.goto(1);
								break;
							}
						}
					}
				}
			}
		},
		_ismin: {
			mod: {
				cardEnabled: function (card, player) {
					if (player.isMin()) {
						if (get.type(card) == 'equip') return false;
					}
				}
			}
		},
		_recasting: {
			enable: 'phaseUse',
			logv: false,
			prompt: '将要重铸的牌置入弃牌堆并摸一张牌',
			filter: (event, player) => player.hasCard(card => lib.skill._recasting.filterCard(card, player), lib.skill._recasting.position),
			position: 'he',
			filterCard: (card, player) => player.canRecast(card, null, true),
			discard: false,
			lose: false,
			delay: false,
			content: () => {
				player.recast(cards, null, (player, cards) => {
					var numberOfCardsToDraw = cards.length;
					cards.forEach(value => {
						if (lib.config.mode == 'stone' && _status.mode == 'deck' && !player.isMin() && get.type(value).startsWith('stone')) {
							var stonecard = get.stonecard(1, player.career);
							if (stonecard.length) {
								numberOfCardsToDraw -= stonecard.length;
								player.gain(game.createCard(stonecard.randomGet()), 'draw');
							}
							else player.draw({
								drawDeck: 1
							}).log = false;
						}
						else if (get.subtype(value) == 'spell_gold') {
							var libCard = get.libCard(info => info.subtype == 'spell_silver');
							if (!libCard.length) return;
							numberOfCardsToDraw--;
							player.gain(game.createCard(libCard.randomGet()), 'draw');
						}
						else if (get.subtype(value) == 'spell_silver') {
							var libCard = get.libCard(info => info.subtype == 'spell_bronze');
							if (!libCard.length) return;
							numberOfCardsToDraw--;
							player.gain(game.createCard(libCard.randomGet()), 'draw');
						}
					});
					if (numberOfCardsToDraw) player.draw(numberOfCardsToDraw).log = false;
				});
			},
			ai: {
				basic: {
					order: 6
				},
				result: {
					player: 1
				}
			}
		},
		_lianhuan: {
			trigger: { player: 'damageAfter' },
			filter: function (event, player) {
				return event.lianhuanable == true;
			},
			forced: true,
			popup: false,
			logv: false,
			forceDie: true,
			//priority:-5,
			content: function () {
				"step 0";
				event.logvid = trigger.getLogv();
				"step 1";
				event.targets = game.filterPlayer(function (current) {
					return current != event.player && current.isLinked();
				});
				lib.tempSortSeat = _status.currentPhase || player;
				event.targets.sort(lib.sort.seat);
				delete lib.tempSortSeat;
				event._args = [trigger.num, trigger.nature, trigger.cards, trigger.card];
				if (trigger.source) event._args.push(trigger.source);
				else event._args.push("nosource");
				"step 2";
				if (event.targets.length) {
					var target = event.targets.shift();
					if (target.isLinked()) target.damage.apply(target, event._args.slice(0));
					event.redo();
				}
			},
		},
		_lianhuan4: {
			trigger: { player: 'changeHp' },
			priority: -10,
			forced: true,
			popup: false,
			forceDie: true,
			filter: function (event, player) {
				var evt = event.getParent();
				return evt && evt.name == 'damage' && evt.hasNature('linked') && player.isLinked();
			},
			content: function () {
				player.link();
				if (trigger.getParent().notLink()) trigger.getParent().lianhuanable = true;
			}
		},
		/**
		 * @deprecated
		 */
		_chongzhu: {
			get filter() {
				return lib.skill._recasting.filter;
			},
			set filter(filter) {
				lib.skill._recasting.filter = filter;
			},
			get filterCard() {
				return lib.skill._recasting.filterCard;
			},
			set filterCard(filterCard) {
				lib.skill._recasting.filterCard = filterCard;
			},
			get content() {
				return lib.skill._recasting.content;
			},
			set content(content) {
				lib.skill._recasting.content = content;
			},
			get ai() {
				return lib.skill._recasting.ai;
			},
			set ai(ai) {
				lib.skill._recasting.ai = ai;
			}
		}
	};
	static character = {};
	static perfectPair = {};
	static cardPile = {};
	static message = {
		server: {
			init: function (version, config, banned_info) {
				if (lib.node.banned.contains(banned_info)) {
					this.send('denied', 'banned');
				}
				else if (config.id && lib.playerOL && lib.playerOL[config.id]) {
					var player = lib.playerOL[config.id];
					player.setNickname();
					player.ws = this;
					player.isAuto = false;
					this.id = config.id;
					game.broadcast(function (player) {
						player.setNickname();
					}, player);
					this.send('reinit', lib.configOL, get.arenaState(), game.getState ? game.getState() : {}, game.ip, null, _status.onreconnect, _status.cardtag, _status.postReconnect);
				}
				else if (version != lib.versionOL) {
					this.send('denied', 'version');
					lib.node.clients.remove(this);
					this.closed = true;
				}
				else if (!_status.waitingForPlayer) {
					if (game.phaseNumber && lib.configOL.observe) {
						lib.node.observing.push(this);
						this.send('reinit', lib.configOL, get.arenaState(), game.getState ? game.getState() : {}, game.ip, game.players[0].playerid, null, _status.cardtag);
						if (!ui.removeObserve) {
							ui.removeObserve = ui.create.system('移除旁观', function () {
								lib.configOL.observe = false;
								if (game.onlineroom) {
									game.send('server', 'config', lib.configOL);
								}
								while (lib.node.observing.length) {
									lib.node.observing.shift().ws.close();
								}
								this.remove();
								delete ui.removeObserve;
							}, true, true);
						}
					}
					else {
						this.send('denied', 'gaming');
						lib.node.clients.remove(this);
						this.closed = true;
					}
				}
				else if (lib.node.clients.length - (window.isNonameServer ? 1 : 0) >= parseInt(lib.configOL.number)) {
					this.send('denied', 'number');
					lib.node.clients.remove(this);
					this.closed = true;
				}
				else {
					if (config) {
						this.avatar = config.avatar;
						this.nickname = config.nickname;
					}
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].classList.contains('unselectable2')) continue;
						if (game.connectPlayers[i] != game.me && !game.connectPlayers[i].playerid) {
							game.connectPlayers[i].playerid = this.id;
							game.connectPlayers[i].initOL(this.nickname, this.avatar);
							game.connectPlayers[i].ws = this;
							break;
						}
					}
					this.send('init', this.id, lib.configOL, game.ip, window.isNonameServer, game.roomId);
				}
			},
			inited: function () {
				this.inited = true;
				if (_status.waitingForPlayer) {
					game.updateWaiting();
				}
			},
			reinited: function () {
				this.inited = true;
			},
			result: function (result) {
				if (lib.node.observing.contains(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.unwait(result);
				}
			},
			tempResult: function (result) {
				if (lib.node.observing.contains(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.tempUnwait(result);
				}
			},
			startGame: function () {
				if (this.id == game.onlinezhu) {
					game.resume();
				}
			},
			changeRoomConfig: function (config) {
				if (this.id == game.onlinezhu) {
					game.broadcastAll(function (config) {
						for (var i in config) {
							lib.configOL[i] = config[i];
						}
						if (ui.connectStartBar) {
							ui.connectStartBar.firstChild.innerHTML = get.modetrans(lib.configOL, true);
						}
					}, config);
					if (lib.configOL.mode == 'identity' && lib.configOL.identity_mode == 'zhong' && game.connectPlayers) {
						for (var i = 0; i < game.connectPlayers.length; i++) {
							game.connectPlayers[i].classList.remove('unselectable2');
						}
						lib.configOL.number = 8;
						game.updateWaiting();
					}
					if (game.onlineroom) {
						game.send('server', 'config', lib.configOL);
					}
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == this.id) {
							game.connectPlayers[i].chat('房间设置已更改');
						}
					}
				}
			},
			changeNumConfig: function (num, index, bool) {
				if (this.id == game.onlinezhu) {
					lib.configOL.number = num;
					game.send('server', 'config', lib.configOL);
					if (game.connectPlayers && game.connectPlayers[index]) {
						if (bool) {
							game.connectPlayers[index].classList.add('unselectable2');
						}
						else {
							game.connectPlayers[index].classList.remove('unselectable2');
						}
						game.updateWaiting();
					}
				}
			},
			throwEmotion: function (target, emotion, rotate) {
				if (lib.node.observing.contains(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.throwEmotion(target, emotion, rotate);
				}
			},
			emotion: function (id, pack, emotion) {
				if (lib.node.observing.contains(this)) return;
				var that = this;
				if (!this.id || (!lib.playerOL[this.id] && (!game.connectPlayers || !function () {
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == that.id) {
							return true;
						}
					}
					return false;
				}()))) return;
				var player;
				if (lib.playerOL[id]) {
					player = lib.playerOL[id];
				}
				else if (game.connectPlayers) {
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == id) {
							player = game.connectPlayers[i]; break;
						}
					}
				}
				if (player) player.emotion(pack, emotion);
			},
			chat: function (id, str) {
				if (lib.node.observing.contains(this)) return;
				var that = this;
				if (!this.id || (!lib.playerOL[this.id] && (!game.connectPlayers || !function () {
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == that.id) {
							return true;
						}
					}
					return false;
				}()))) return;
				var player;
				if (lib.playerOL[id]) {
					player = lib.playerOL[id];
				}
				else if (game.connectPlayers) {
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == id) {
							player = game.connectPlayers[i]; break;
						}
					}
				}
				if (player) player.chat(str);
			},
			giveup: function (player) {
				if (lib.node.observing.contains(this) || !player || !player._giveUp) return;
				_status.event.next.length = 0;
				game.createEvent('giveup', false).set('includeOut', true).setContent(function () {
					game.log(player, '投降');
					player.popup('投降');
					player.die('nosource').includeOut = true;
				}).player = player;
			},
			auto: function () {
				if (lib.node.observing.contains(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.isAuto = true;
					player.setNickname(player.nickname + ' - 托管');
					game.broadcast(function (player) {
						player.setNickname(player.nickname + ' - 托管');
					}, player);
				}
			},
			unauto: function () {
				if (lib.node.observing.contains(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.isAuto = false;
					player.setNickname(player.nickname);
					game.broadcast(function (player) {
						player.setNickname(player.nickname);
					}, player);
				}
			},
			exec: function (func) {
				// if(typeof func=='function'){
				//     var args=Array.from(arguments);
				//     args.shift();
				//     func.apply(this,args);
				// }
			},
			log: function () {
				var items = [];
				try {
					for (var i = 0; i < arguments.length; i++) {
						eval('items.push(' + arguments[i] + ')');
					}
				}
				catch (e) {
					this.send('log', ['err']);
					return;
				}
				this.send('log', items);
			}
		},
		client: {
			log: function (arr) {
				if (Array.isArray(arr)) {
					for (var i = 0; i < arr.length; i++) {
						console.log(arr[i]);
					}
				}
			},
			opened: function () {
				game.send('init', lib.versionOL, {
					id: game.onlineID,
					avatar: lib.config.connect_avatar,
					nickname: get.connectNickname()
				}, lib.config.banned_info);
				if (ui.connecting && !ui.connecting.splashtimeout) {
					ui.connecting.firstChild.innerHTML = '重连成功';
				}
			},
			onconnection: id => lib.init.connection(lib.wsOL[id] = new lib.element.NodeWS(id)),
			onmessage: function (id, message) {
				if (lib.wsOL[id]) {
					lib.wsOL[id].onmessage(message);
				}
			},
			onclose: function (id) {
				if (lib.wsOL[id]) {
					lib.wsOL[id].onclose();
				}
			},
			selfclose: function () {
				if (game.online || game.onlineroom) {
					if ((game.servermode || game.onlinehall) && _status.over) {
						// later
					}
					else {
						game.saveConfig('tmp_user_roomId');
					}
				}
				game.ws.close();
			},
			reloadroom: function (forced) {
				if (window.isNonameServer && (forced || !_status.protectingroom)) {
					game.reload();
				}
			},
			createroom: function (index, config, mode) {
				game.online = false;
				game.onlineroom = true;
				game.roomId = index;
				lib.node = {};
				if (config && mode && window.isNonameServer) {
					if (mode == 'auto') {
						mode = lib.configOL.mode;
					}
					game.switchMode(mode, config);
				}
				else {
					game.switchMode(lib.configOL.mode);
				}
				ui.create.connecting(true);
			},
			enterroomfailed: function () {
				alert('请稍后再试');
				_status.enteringroom = false;
				ui.create.connecting(true);
			},
			roomlist: function (list, events, clients, wsid) {
				game.send('server', 'key', [game.onlineKey, lib.version]);
				game.online = true;
				game.onlinehall = true;
				lib.config.recentIP.remove(_status.ip);
				lib.config.recentIP.unshift(_status.ip);
				lib.config.recentIP.splice(5);
				if (!lib.config.reconnect_info || lib.config.reconnect_info[0] != _status.ip) {
					game.saveConfig('reconnect_info', [_status.ip, null]);
				}
				game.saveConfig('recentIP', lib.config.recentIP);
				_status.connectMode = true;

				game.clearArena();
				game.clearConnect();
				ui.pause.hide();
				ui.auto.hide();

				clearTimeout(_status.createNodeTimeout);
				game.send('server', 'changeAvatar', get.connectNickname(), lib.config.connect_avatar);

				var proceed = function () {
					game.ip = get.trimip(_status.ip);
					ui.create.connectRooms(list);
					if (events) {
						ui.connectEvents = ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv', '约战', ui.window, ui.click.connectEvents);
						ui.connectEventsCount = ui.create.div('.forceopaque.menubutton.icon.connectevents.highlight.hidden', '', ui.window);
						ui.connectClients = ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv.left', '在线', ui.window, ui.click.connectClients);
						ui.connectClientsCount = ui.create.div('.forceopaque.menubutton.icon.connectevents.highlight.left', '1', ui.window);
						ui.createRoomButton = ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv.left2', '创建房间', ui.window, function () {
							if (!_status.creatingroom) {
								_status.creatingroom = true;
								ui.click.connectMenu();
							}
						});
						if (events.length) {
							ui.connectEventsCount.innerHTML = events.filter(function (evt) {
								return evt.creator == game.onlineKey || !get.is.banWords(evt.content);
							}).length;
							ui.connectEventsCount.show();
						}
					}
					game.wsid = wsid;
					lib.message.client.updaterooms(list, clients);
					lib.message.client.updateevents(events);
					ui.exitroom = ui.create.system('退出房间', function () {
						game.saveConfig('tmp_owner_roomId');
						game.saveConfig('tmp_user_roomId');
						if (ui.rooms) {
							game.saveConfig('reconnect_info');
						}
						else {
							if (lib.config.reconnect_info) {
								lib.config.reconnect_info.length = 1;
								game.saveConfig('reconnect_info', lib.config.reconnect_info);
							}
						}
						game.reload();
					}, true);

					var findRoom = function (id) {
						for (var room of ui.rooms) {
							if (room.key == id) return room;
						}
						return false;
					};
					if (typeof lib.config.tmp_owner_roomId == 'string') {
						if (typeof game.roomId != 'string' && !findRoom(lib.config.tmp_owner_roomId)) {
							lib.configOL.mode = lib.config.connect_mode;
							game.roomId = lib.config.tmp_owner_roomId;
						}
						game.saveConfig('tmp_owner_roomId');
					}
					if (typeof lib.config.tmp_user_roomId == 'string') {
						if (typeof game.roomId != 'string') {
							if (findRoom(lib.config.tmp_user_roomId)) {
								game.roomId = lib.config.tmp_user_roomId;
							}
							else {
								ui.create.connecting();
								(function () {
									var n = 10;
									var id = lib.config.tmp_user_roomId;
									var interval = setInterval(function () {
										if (n > 0) {
											n--;
											if (findRoom(id)) {
												clearInterval(interval);
												game.send('server', 'enter', id, get.connectNickname(), lib.config.connect_avatar);
											}
										}
										else {
											ui.create.connecting(true);
											clearInterval(interval);
										}
									}, 500);
								}());
							}
						}
						game.saveConfig('tmp_user_roomId');
					}

					if (window.isNonameServer) {
						var cfg = 'pagecfg' + window.isNonameServer;
						if (lib.config[cfg]) {
							lib.configOL = lib.config[cfg][0];
							game.send('server', 'server', lib.config[cfg].slice(1));
							game.saveConfig(cfg);
							_status.protectingroom = true;
							setTimeout(function () {
								_status.protectingroom = false;
								if (!lib.node || !lib.node.clients || !lib.node.clients.length) {
									game.reload();
								}
							}, 15000);
						}
						else {
							game.send('server', 'server');
						}
					}
					else if (typeof game.roomId == 'string') {
						var room = findRoom(game.roomId);
						if (game.roomIdServer && room && (room.serving || !room.version)) {
							console.log();
							if (lib.config.reconnect_info) {
								lib.config.reconnect_info[2] = null;
								game.saveConfig('reconnect_info', lib.config.reconnect_info);
							}
						}
						else {
							ui.create.connecting();
							game.send('server', (game.roomId == game.onlineKey) ? 'create' : 'enter', game.roomId, get.connectNickname(), lib.config.connect_avatar);
						}
					}
					lib.init.onfree();
				};
				if (_status.event.parent) {
					game.forceOver('noover', proceed);
				}
				else {
					proceed();
				}
			},
			updaterooms: function (list, clients) {
				if (ui.rooms) {
					var map = {}, map2 = {};
					for (var i of ui.rooms) map2[i.key] = true;
					for (var i of list) {
						if (!i) continue;
						map[i[4]] = i;
					}
					ui.window.classList.add('more_room');
					for (var i = 0; i < ui.rooms.length; i++) {
						if (!map[ui.rooms[i].key]) {
							ui.rooms[i].remove();
							ui.rooms.splice(i--, 1);
						}
						else ui.rooms[i].initRoom(list[i]);
					}
					for (var i of list) {
						if (!i) continue;
						map[i[4]] = i;
						if (!map2[i[4]]) {
							var player = ui.roombase.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block;white-space:nowrap">空房间</div>');
							player.roomindex = i;
							player.initRoom = lib.element.Player.prototype.initRoom;
							player.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.connectroom);
							player.initRoom(i);
							ui.rooms.push(player);
						}
					}
					if (!_status.requestReadClipboard && get.config('read_clipboard', 'connect')) {
						const read = text => {
							try {
								var roomId = text.split('\n')[1].match(/\d+/);
								var caption = ui.rooms.find(caption => caption.key == roomId);
								if (caption && (_status.read_clipboard_text || confirm(`是否通过复制的内容加入${roomId}房间？`))) {
									ui.click.connectroom.call(caption);
									delete _status.read_clipboard_text;
								}
							} catch (e) { console.log(e); }
						};
						//每次启动只请求一次
						_status.requestReadClipboard = true;
						if (_status.read_clipboard_text) {
							read(_status.read_clipboard_text);
						} else {
							window.focus();
							if (navigator.clipboard && lib.node) {
								navigator.clipboard.readText().then(read).catch(_ => { });
							} else {
								var input = ui.create.node('textarea', ui.window, { opacity: '0' });
								input.select();
								var result = document.execCommand('paste');
								input.blur();
								ui.window.removeChild(input);
								if (result || input.value.length > 0) read(input.value);
								else if (confirm('是否输入邀请链接以加入房间？')) {
									var text = prompt('请输入邀请链接');
									if (typeof text == 'string' && text.length > 0) read(text);
								}
							}
						}
					}
				}
				lib.message.client.updateclients(clients, true);
			},
			updateclients: function (clients, bool) {
				if (clients && ui.connectClients) {
					ui.connectClients.info = clients;
					ui.connectClientsCount.innerHTML = clients.length;
				}
				if (_status.connectClientsCallback) {
					_status.connectClientsCallback();
				}
			},
			updateevents: function (events) {
				if (events && ui.connectEvents) {
					ui.connectEvents.info = events;
					var num = events.filter(function (evt) {
						return typeof evt.creator == 'string' && (evt.creator == game.onlineKey || !get.is.banWords(evt.content));
					}).length;
					if (num) {
						ui.connectEventsCount.innerHTML = num;
						ui.connectEventsCount.show();
					}
					else {
						ui.connectEventsCount.hide();
					}
					if (_status.connectEventsCallback) {
						_status.connectEventsCallback();
					}
				}
			},
			eventsdenied: function (reason) {
				var str = '创建约战失败';
				if (reason == 'total') {
					str += '，约战总数不能超过20';
				}
				else if (reason == 'time') {
					str += '，时间已过';
				}
				else if (reason == 'ban') {
					str += '，请注意文明发言';
				}
				alert(str);
			},
			init: function (id, config, ip, servermode, roomId) {
				game.online = true;
				game.onlineID = id;
				game.ip = ip;
				game.servermode = servermode;
				game.roomId = roomId;
				if (game.servermode) {
					game.saveConfig('reconnect_info', [_status.ip, id, game.roomId]);
				}
				else {
					game.saveConfig('reconnect_info', [_status.ip, id]);
					game.saveConfig('tmp_user_roomId', roomId);
				}
				lib.config.recentIP.remove(_status.ip);
				lib.config.recentIP.unshift(_status.ip);
				lib.config.recentIP.splice(5);
				game.saveConfig('recentIP', lib.config.recentIP);
				_status.connectMode = true;
				lib.configOL = config;
				lib.playerOL = {};
				lib.cardOL = {};

				game.clearArena();
				game.finishCards();
				ui.create.roomInfo();
				ui.create.chat();
				if (game.servermode) {
					ui.create.connectPlayers(get.modetrans(config, true));
				}
				else {
					ui.create.connectPlayers(ip);
				}
				ui.pause.hide();
				ui.auto.hide();
				game.clearConnect();
				clearTimeout(_status.createNodeTimeout);

				var proceed = function () {
					game.loadModeAsync(config.mode, function (mode) {
						for (var i in mode.ai) {
							if (typeof mode.ai[i] == 'object') {
								if (ai[i] == undefined) ai[i] = {};
								for (var j in mode.ai[i]) {
									ai[i][j] = mode.ai[i][j];
								}
							}
							else {
								ai[i] = mode.ai[i];
							}
						}
						for (var i in mode.get) {
							if (typeof mode.get[i] == 'object') {
								if (get[i] == undefined) get[i] = {};
								for (var j in mode.get[i]) {
									get[i][j] = mode.get[i][j];
								}
							}
							else {
								get[i] = mode.get[i];
							}
						}
						for (var i in mode.translate) {
							lib.translate[i] = mode.translate[i];
						}
						if (mode.game) {
							game.getIdentityList = mode.game.getIdentityList;
							game.updateState = mode.game.updateState;
							game.getRoomInfo = mode.game.getRoomInfo;
						}
						if (mode.element && mode.element.player) {
							Object.defineProperties(lib.element.Player.prototype, Object.getOwnPropertyDescriptors(mode.element.player));
						}
						if (mode.skill) {
							for (var i in mode.skill) {
								lib.skill[i] = mode.skill[i];
							}
						}
						if (mode.card) {
							for (var i in mode.card) {
								lib.card[i] = mode.card[i];
							}
						}
						game.finishCards();
						if (mode.characterPack) {
							for (var i in mode.characterPack) {
								lib.characterPack[i] = mode.characterPack[i];
							}
						}
						_status.event = lib.element.GameEvent.initialGameEvent();
						_status.paused = false;
						game.createEvent('game', false).setContent(lib.init.startOnline);
						game.loop();
						game.send('inited');
						ui.create.connecting(true);
					});
				};
				if (_status.event.parent) {
					game.forceOver('noover', proceed);
				}
				else {
					proceed();
				}
				for (var i in lib.characterPack) {
					for (var j in lib.characterPack[i]) {
						lib.character[j] = lib.character[j] || lib.characterPack[i][j];
					}
				}
			},
			reinit: function (config, state, state2, ip, observe, onreconnect, cardtag, postReconnect) {
				ui.auto.show();
				ui.pause.show();
				game.clearConnect();
				clearTimeout(_status.createNodeTimeout);
				game.online = true;
				game.ip = ip;
				game.servermode = state.servermode;
				game.roomId = state.roomId;
				if (state.over) {
					_status.over = true;
				}
				if (observe) {
					game.observe = true;
					game.onlineID = null;
					game.roomId = null;
				}
				if (game.servermode && !observe) {
					game.saveConfig('reconnect_info', [_status.ip, game.onlineID, game.roomId]);
				}
				else {
					game.saveConfig('reconnect_info', [_status.ip, game.onlineID]);
					if (!observe) {
						game.saveConfig('tmp_user_roomId', game.roomId);
					}
				}
				_status.connectMode = true;
				lib.configOL = config;
				lib.playerOL = {};
				lib.cardOL = {};

				game.loadModeAsync(config.mode, function (mode) {
					for (var i in mode.ai) {
						if (typeof mode.ai[i] == 'object') {
							if (ai[i] == undefined) ai[i] = {};
							for (var j in mode.ai[i]) {
								ai[i][j] = mode.ai[i][j];
							}
						}
						else {
							ai[i] = mode.ai[i];
						}
					}
					for (var i in mode.get) {
						if (typeof mode.get[i] == 'object') {
							if (get[i] == undefined) get[i] = {};
							for (var j in mode.get[i]) {
								get[i][j] = mode.get[i][j];
							}
						}
						else {
							get[i] = mode.get[i];
						}
					}
					for (var i in mode.translate) {
						lib.translate[i] = mode.translate[i];
					}
					if (mode.game) {
						game.getIdentityList = mode.game.getIdentityList;
						game.getIdentityList2 = mode.game.getIdentityList2;
						game.updateState = mode.game.updateState;
						game.showIdentity = mode.game.showIdentity;
					}
					if (mode.element && mode.element.player) {
						Object.defineProperties(lib.element.Player.prototype, Object.getOwnPropertyDescriptors(mode.element.player));
					}
					if (mode.skill) {
						for (var i in mode.skill) {
							lib.skill[i] = mode.skill[i];
						}
					}
					if (mode.card) {
						for (var i in mode.card) {
							lib.card[i] = mode.card[i];
						}
					}
					game.finishCards();
					if (mode.characterPack) {
						for (var i in mode.characterPack) {
							lib.characterPack[i] = mode.characterPack[i];
						}
					}
					if (mode.onreinit) {
						mode.onreinit();
					}
					_status.cardtag = get.parsedResult(cardtag);
					game.players = [];
					game.dead = [];
					for (var i in lib.characterPack) {
						for (var j in lib.characterPack[i]) {
							lib.character[j] = lib.character[j] || lib.characterPack[i][j];
						}
					}
					game.clearArena();
					game.finishCards();
					if (!observe) {
						ui.create.chat();
						if (ui.exitroom) {
							ui.exitroom.remove();
							delete ui.exitroom;
						}
					}
					else {
						if (!ui.exitroom) {
							ui.create.system('退出旁观', function () {
								game.saveConfig('reconnect_info');
								game.reload();
							}, true);
						}
						if (!lib.configOL.observe_handcard) {
							ui.arena.classList.add('observe');
						}
					}
					postReconnect = get.parsedResult(postReconnect);
					for (var i in postReconnect) {
						if (Array.isArray(postReconnect[i])) {
							postReconnect[i].shift().apply(this, postReconnect[i]);
						}
					}
					state = get.parsedResult(state);
					ui.arena.setNumber(state.number);
					_status.mode = state.mode;
					_status.renku = state.renku;
					lib.inpile = state.inpile;
					lib.inpile_nature = state.inpile_nature;
					var pos = state.players[observe || game.onlineID].position;
					for (var i in state.players) {
						var info = state.players[i];
						var player = ui.create.player(ui.arena).animate('start');
						player.dataset.position = (info.position < pos) ? info.position - pos + parseInt(state.number) : info.position - pos;
						if (i == observe || i == game.onlineID) {
							game.me = player;
						}
						if (player.setModeState) {
							player.setModeState(info);
						}
						else {
							player.init(info.name1, info.name2);
							if (info.name && info.name != info.name1) player.name = info.name;
						}
						if (!info.unseen) player.classList.remove('unseen');
						if (!info.unseen2) player.classList.remove('unseen2');
						if (!player.isUnseen(2) && player.storage.nohp) {
							delete player.storage.nohp;
							player.node.hp.show();
						}
						player.playerid = i;
						player.nickname = info.nickname;
						player.changeGroup(info.group, false, 'nobroadcast');
						player.identity = info.identity;
						player.identityShown = info.identityShown;
						player.hp = info.hp;
						player.maxHp = info.maxHp;
						player.hujia = info.hujia;
						player.sex = info.sex;
						player.side = info.side;
						player.phaseNumber = info.phaseNumber;
						player.seatNum = info.seatNum;
						player.disabledSlots = info.disabledSlots;
						player.expandedSlots = info.expandedSlots;
						player.setNickname();
						if (info.dead) {
							player.classList.add('dead');
							if (lib.config.die_move) {
								player.$dieflip();
							}
							if (player.$dieAfter) {
								player.$dieAfter();
							}
							game.dead.push(player);
						}
						else {
							game.players.push(player);
						}
						if (info.linked) {
							player.addLink();
						}
						if (info.turnedover) {
							player.classList.add('turnedover');
						}
						if (info.out) {
							player.classList.add('out');
						}
						if (info.disableJudge) {
							player.$disableJudge();
						}
						player.$syncDisable();

						player.directgain(info.handcards);
						lib.playerOL[i] = player;
						for (var i = 0; i < info.equips.length; i++) {
							player.$equip(info.equips[i]);
						}
						for (var i = 0; i < info.handcards.length; i++) {
							info.handcards[i].addGaintag(info.gaintag[i]);
						}
						for (var i = 0; i < info.specials.length; i++) {
							info.specials[i].classList.add('glows');
						}
						if (info.expansions.length) {
							var expansion_gaintag = [];
							player.$addToExpansion(info.expansions);
							for (var i = 0; i < info.expansions.length; i++) {
								info.expansions[i].addGaintag(info.expansion_gaintag[i]);
								expansion_gaintag.addArray(info.expansion_gaintag[i]);
							}
							for (var i of expansion_gaintag) player.markSkill[i];
						}
						for (var i = 0; i < info.judges.length; i++) {
							if (info.views[i] && info.views[i] != info.judges[i]) {
								info.judges[i].classList.add('fakejudge');
								info.judges[i].viewAs = info.views[i];
								info.judges[i].node.background.innerHTML = lib.translate[info.views[i] + '_bg'] || get.translation(info.views[i])[0];
							}
							player.node.judges.appendChild(info.judges[i]);
						}
						ui.updatej(player);
						if (!player.setModeState) {
							if (!game.getIdentityList && info.identityNode) {
								player.node.identity.innerHTML = info.identityNode[0];
								player.node.identity.dataset.color = info.identityNode[1];
							}
							else if (player == game.me || player.identityShown || observe) {
								player.setIdentity();
								player.forceShown = true;
							}
							else {
								player.setIdentity('cai');
							}
							if (!lib.configOL.observe_handcard && (lib.configOL.mode == 'identity' || lib.configOL.mode == 'guozhan')) {
								if (observe && !player.identityShown) {
									player.setIdentity('cai');
									player.forceShown = false;
								}
							}
						}
						player.update();
					}
					game.arrangePlayers();
					ui.create.me(true);

					_status.event = lib.element.GameEvent.initialGameEvent();
					_status.paused = false;
					_status.dying = get.parsedResult(state.dying) || [];

					if (game.updateState) {
						game.updateState(state2);
					}
					var next = game.createEvent('game', false);
					next.setContent(lib.init.startOnline);
					if (observe) {
						next.custom.replace.target = function (player) {
							if (!lib.configOL.observe_handcard && lib.configOL.mode == 'guozhan') {
								return;
							}
							if (player.isAlive()) {
								if (!game.me.identityShown && lib.configOL.mode == 'guozhan') {
									game.me.node.identity.firstChild.innerHTML = '猜';
									game.me.node.identity.dataset.color = 'unknown';
								}
								game.swapPlayer(player);
								if (!game.me.identityShown && lib.configOL.mode == 'guozhan') {
									game.me.node.identity.firstChild.innerHTML = '';
								}
							}
						};
					}
					else {
						if (Array.isArray(onreconnect)) {
							onreconnect.shift().apply(this, onreconnect);
						}
					}
					game.loop();
					game.send('reinited');
					game.showHistory();
					_status.gameStarted = true;
					if (lib.config.show_cardpile) {
						ui.cardPileButton.style.display = '';
					}
					if (!observe && game.me && (game.me.isDead() || _status.over)) {
						ui.create.exit();
					}
					ui.updatehl();
					ui.create.connecting(true);
				});
			},
			exec: function (func) {
				var key = game.onlineKey;
				if (typeof func == 'function') {
					var args = Array.from(arguments);
					args.shift();
					func.apply(this, args);
				}
				if (key) {
					game.onlineKey = key;
					localStorage.setItem(lib.configprefix + 'key', game.onlineKey);
				}
			},
			denied: function (reason) {
				switch (reason) {
					case 'version':
						alert('加入失败：版本不匹配，请将游戏更新至最新版');
						game.saveConfig('tmp_owner_roomId');
						game.saveConfig('tmp_user_roomId');
						game.saveConfig('reconnect_info');
						break;
					case 'gaming': alert('加入失败：游戏已开始'); break;
					case 'number': alert('加入失败：房间已满'); break;
					case 'banned': alert('加入失败：房间拒绝你加入'); break;
					case 'key':
						alert('您的游戏版本过低，请升级到最新版');
						game.saveConfig('tmp_owner_roomId');
						game.saveConfig('tmp_user_roomId');
						game.saveConfig('reconnect_info');
						break;
					case 'offline':
						if (_status.paused && _status.event.name == 'game') {
							setTimeout(game.resume, 500);
						}
						break;
				}
				game.ws.close();
				if (_status.connectDenied) {
					_status.connectDenied();
				}
			},
			cancel: function (id) {
				if (_status.event._parent_id == id) {
					ui.click.cancel();
				}
				if (_status.event.id == id) {
					if (_status.event._backup) ui.click.cancel();
					ui.click.cancel();
					if (ui.confirm) {
						ui.confirm.close();
					}
					if (_status.event.result) {
						_status.event.result.id = id;
					}
				}
			},
			closeDialog: function (id) {
				var dialog = get.idDialog(id);
				if (dialog) {
					dialog.close();
				}
			},
			createDialog: function (id) {
				var args = Array.from(arguments);
				args.shift();
				ui.create.dialog.apply(this, args).videoId = id;
			},
			gameStart: function () {
				for (var i = 0; i < game.connectPlayers.length; i++) {
					game.connectPlayers[i].delete();
				}
				delete game.connectPlayers;
				if (ui.connectStartButton) {
					ui.connectStartButton.delete();
					delete ui.connectStartButton;
				}
				if (ui.connectStartBar) {
					ui.connectStartBar.delete();
					delete ui.connectStartBar;
				}
				if (ui.connectShareButton) {
					ui.connectShareButton.delete();
					delete ui.connectShareButton;
				}
				if (ui.roomInfo) {
					ui.roomInfo.remove();
					delete ui.roomInfo;
				}
				if (ui.exitroom) {
					ui.exitroom.remove();
					delete ui.exitroom;
				}
				ui.auto.show();
				ui.pause.show();
				if (lib.config.show_cardpile) {
					ui.cardPileButton.style.display = '';
				}
				_status.gameStarted = true;
				game.showHistory();
			},
			updateWaiting: function (map) {
				if (!game.connectPlayers) return;
				if (!lib.translate.zhu) {
					lib.translate.zhu = '主';
				}
				game.onlinezhu = false;
				_status.waitingForPlayer = true;
				for (var i = 0; i < map.length; i++) {
					if (map[i] == 'disabled') {
						game.connectPlayers[i].classList.add('unselectable2');
					}
					else {
						game.connectPlayers[i].classList.remove('unselectable2');
						if (map[i]) {
							game.connectPlayers[i].initOL(map[i][0], map[i][1]);
							game.connectPlayers[i].playerid = map[i][2];
							if (map[i][3] == 'zhu') {
								game.connectPlayers[i].setIdentity('zhu');
								if (map[i][2] == game.onlineID) {
									game.onlinezhu = true;
									if (ui.roomInfo) {
										ui.roomInfo.innerHTML = '房间设置';
									}
									if (ui.connectStartButton) {
										ui.connectStartButton.innerHTML = '开始游戏';
									}
								}
							}
							else {
								game.connectPlayers[i].node.identity.firstChild.innerHTML = '';
							}
						}
						else {
							game.connectPlayers[i].uninitOL();
							delete game.connectPlayers[i].playerid;
						}
					}
				}
			}
		}
	};
	static suit = ['club', 'spade', 'diamond', 'heart'];
	static suits = ['club', 'spade', 'diamond', 'heart', 'none'];
	static color = {
		black: ['club', 'spade'],
		red: ['diamond', 'heart'],
		none: ['none'],
	};
	static group = ['wei', 'shu', 'wu', 'qun', 'jin', 'shen'];
	//数值代表各元素在名称中排列的先后顺序
	static nature = new Map([
		['fire', 20],
		['thunder', 30],
		['kami', 60],
		['ice', 40],
		['stab', 10],
		['poison', 50]
	]);
	static natureAudio = {
		damage: {
			'fire': 'default',//默认，即语音放置在audio/effect下，以damage_fire.mp3 damage_fire2.mp3命名。
			'thunder': 'default',
			'ice': 'default',
			'stab': 'normal',//正常，即与普通伤害音效相同。
			/*
			'example':{
				1:'../extension/XXX/damage_example.mp3',//1点伤害。
				2:'../extension/XXX/damage_example2.mp3',//2点及以上伤害
			}
			*/
		},
		hujia_damage: {
			'fire': 'default',//默认，即语音放置在audio/effect下，以hujia_damage_fire.mp3 hujia_damage_fire2.mp3命名。
			'thunder': 'default',
			'ice': 'normal',//正常，即与普通伤害音效相同。
			/*
			'example':{
				1:'../extension/XXX/damage_example.mp3',//1点伤害。
				2:'../extension/XXX/damage_example2.mp3',//2点及以上伤害
			}
			*/
		},
		sha: {
			'fire': 'default',//默认，即语音放置在audio/card/male与audio/card/female下，命名为sha_fire.mp3
			'thunder': 'default',
			'ice': 'default',
			'stab': 'default',
			'poison': 'normal',//正常，即播放“杀”的音效。
			'kami': 'normal',
			/*
			'example':{
				'male':'../extension/XXXX/sha_example_male.mp3',
				'female':'../extension/XXXX/sha_example_female.mp3'
			}
			*/
		}
	};
	static linked = ['fire', 'thunder', 'kami', 'ice'];
	static natureBg = new Map([
		['stab', 'image/card/cisha.png']
	]);
	static natureSeparator = '|';
	static namePrefix = new Map([
		['界', {
			color: '#fdd559',
			nature: 'soilmm',
		}],
		['谋', {
			color: '#def7ca',
			nature: 'woodmm',
		}],
		['武', {
			color: '#fd8359',
			nature: 'soilmm',
		}],
		['乐', {
			color: '#f7f4fc',
			nature: 'keymm',
		}],
		['神', {
			color: '#faecd1',
			nature: 'orangemm',
		}],
		['族', {
			color: '#ee9ac7',
			nature: 'firemm',
		}],
		['晋', {
			color: '#f3c5ff',
			nature: 'blackmm',
		}],
		['侠', {
			color: '#eeeeee',
			nature: 'qunmm',
		}],
		['起', {
			color: '#c3f9ff',
			nature: 'thundermm',
		}],
		['承', {
			color: '#c3f9ff',
			nature: 'thundermm',
		}],
		['转', {
			color: '#c3f9ff',
			nature: 'thundermm',
		}],
		['梦', {
			color: '#6affe2',
			nature: 'watermm',
		}],
		['用间', {
			color: '#c3f9ff',
			nature: 'thundermm',
		}],
		['战役篇', {
			color: '#c3f9ff',
			nature: 'thundermm',
			showName: '战',
		}],
		['武将传', {
			color: '#c3f9ff',
			nature: 'thundermm',
			showName: '传',
		}],
		['将', {
			nature: 'firemm',
		}],
		['新杀', {
			color: '#fefedc',
			nature: 'metalmm',
			showName: '新',
		}],
		['旧', {
			color: '#a4a4a4',
			nature: 'black',
		}],
		['旧界', {
			color: '#a4a4a4',
			nature: 'black',
		}],
		['节钺', {
			color: '#a4a4a4',
			nature: 'black',
		}],
		['毅重', {
			color: '#a4a4a4',
			nature: 'black',
		}],
		['★SP', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('SP')}`
		}],
		['☆SP', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('SP')}`
		}],
		['J.SP', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('SP')}`
		}],
		['K系列', {
			showName: 'Ｋ',
		}],
		['经典', {
			showName: '典',
		}],
		['君', {
			color: '#fefedc',
			nature: 'shenmm',
		}],
		['骰子', {
			getSpan: () => {
				const span = document.createElement('span');
				span.style.fontFamily = 'NonameSuits';
				span.textContent = '🎲';
				return span.outerHTML;
			}
		}],
		['SP', {
			getSpan: () => {
				const span = document.createElement('span'), style = span.style;
				style.writingMode = style.webkitWritingMode = 'horizontal-tb';
				style.fontFamily = 'MotoyaLMaru';
				style.transform = 'scaleY(0.85)';
				span.textContent = 'SP';
				return span.outerHTML;
			},
		}],
		['OL', {
			getSpan: () => {
				const span = document.createElement('span'), style = span.style;
				style.writingMode = style.webkitWritingMode = 'horizontal-tb';
				style.fontFamily = 'MotoyaLMaru';
				style.transform = 'scaleY(0.85)';
				span.textContent = 'OL';
				return span.outerHTML;
			},
		}],
		['RE', {
			getSpan: () => {
				const span = document.createElement('span'), style = span.style;
				style.writingMode = style.webkitWritingMode = 'horizontal-tb';
				style.fontFamily = 'MotoyaLMaru';
				style.transform = 'scaleY(0.85)';
				span.textContent = 'RE';
				return span.outerHTML;
			},
		}],
		['手杀', {
			getSpan: (prefix, name) => {
				const simple = lib.config.buttoncharacter_prefix == 'simple', span = document.createElement('span');
				if (lib.characterPack.shiji && name in lib.characterPack.shiji) {
					for (const entry of Object.entries(lib.characterSort.shiji)) {
						if (!entry[1].includes(name)) continue;
						prefix = get.translation(entry[0]).slice(-1);
						break;
					}
					if (!simple) {
						span.style.color = '#def7ca';
						span.dataset.nature = 'watermm';
					}
					span.innerHTML = prefix;
				}
				else if (simple) span.textContent = '手杀';
				else {
					span.style.fontFamily = 'NonameSuits';
					span.textContent = '📱';
				}
				return span.outerHTML;
			},
		}],
		['TW', {
			getSpan: () => {
				const span = document.createElement('span'), style = span.style;
				style.writingMode = style.webkitWritingMode = 'horizontal-tb';
				style.fontFamily = 'MotoyaLMaru';
				style.transform = 'scaleY(0.85)';
				span.textContent = 'TW';
				return span.outerHTML;
			},
		}],
		['TW神', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('TW')}${get.prefixSpan('神')}`
		}],
		['TW将', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('TW')}${get.prefixSpan('将')}`
		}],
		['OL神', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('OL')}${get.prefixSpan('神')}`
		}],
		['旧神', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('旧')}${get.prefixSpan('神')}`
		}],
		['旧晋', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('旧')}${get.prefixSpan('晋')}`
		}],
		['新杀SP', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('新杀')}${get.prefixSpan('SP')}`
		}],
		['界SP', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('界')}${get.prefixSpan('SP')}`
		}],
		['S特神', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('★')}${get.prefixSpan('神')}`
		}],
		['手杀界', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('手杀')}${get.prefixSpan('界')}`
		}],
		['战役篇神', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('战役篇')}${get.prefixSpan('神')}`
		}],
		['星', {
			color: '#ffd700',
			nature: 'glodenmm',
		}],
		['OL界', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('OL')}${get.prefixSpan('界')}`
		}],
		['OL谋', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('OL')}${get.prefixSpan('谋')}`
		}],
		['新杀谋', {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan('新杀')}${get.prefixSpan('谋')}`
		}]
	]);
	static groupnature = {
		shen: 'shen',
		wei: 'water',
		shu: 'soil',
		wu: 'wood',
		qun: 'qun',
		western: 'thunder',
		key: 'key',
		jin: 'thunder',
		ye: 'thunder',
	};
	static lineColor = new Map([
		['fire', [255, 146, 68]],
		['yellow', [255, 255, 122]],
		['blue', [150, 202, 255]],
		['green', [141, 255, 216]],
		['ice', [59, 98, 115]],
		['thunder', [141, 216, 255]],
		['kami', [90, 118, 99]],
		['white', [255, 255, 255]],
		['poison', [104, 221, 127]],
		['brown', [195, 161, 223]],
		['legend', [233, 131, 255]]
	]);
	static phaseName = ['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu'];
	static quickVoice = [
		'我从未见过如此厚颜无耻之人！',
		'这波不亏',
		'请收下我的膝盖',
		'你咋不上天呢',
		'放开我的队友，冲我来',
		'你随便杀，闪不了算我输',
		'见证奇迹的时刻到了',
		'能不能快一点啊，兵贵神速啊',
		'主公，别开枪，自己人',
		'小内再不跳，后面还怎么玩儿啊',
		'你们忍心，就这么让我酱油了？',
		'我，我惹你们了吗',
		'姑娘，你真是条汉子',
		'三十六计，走为上，容我去去便回',
		'人心散了，队伍不好带啊',
		'昏君，昏君啊！',
		'风吹鸡蛋壳，牌去人安乐',
		'小内啊，您老悠着点儿',
		'不好意思，刚才卡了',
		'你可以打得再烂一点吗',
		'哥们，给力点儿行嘛',
		'哥哥，交个朋友吧',
		'妹子，交个朋友吧',
	];
	static other = {
		ignore: () => void 0
	};
}
Library.config = undefined;

Library.configOL = undefined;
;

export const lib = Library;

/**
 * @template T
 * @param {T} object
 */
const setAllPropertiesEnumerable = object => {
	Object.getOwnPropertyNames(object).forEach(propertyKey => {
		if (propertyKey == 'constructor') return;
		const propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyKey);
		if (!propertyDescriptor.enumerable) propertyDescriptor.enumerable = true;
		Object.defineProperty(object, propertyKey, propertyDescriptor);
	}, {});
	return object;
};
setAllPropertiesEnumerable(lib.element.Player.prototype);
const cardPrototype = setAllPropertiesEnumerable(lib.element.Card.prototype), vCardPrototype = setAllPropertiesEnumerable(lib.element.VCard.prototype);
Object.keys(vCardPrototype).forEach(key => {
	Object.defineProperty(cardPrototype, key, Object.getOwnPropertyDescriptor(vCardPrototype, key));
});
setAllPropertiesEnumerable(lib.element.Button.prototype);
setAllPropertiesEnumerable(lib.element.GameEvent.prototype);
setAllPropertiesEnumerable(lib.element.Dialog.prototype);
setAllPropertiesEnumerable(lib.element.Control.prototype);
setAllPropertiesEnumerable(lib.element.Client.prototype);
setAllPropertiesEnumerable(lib.element.NodeWS.prototype);
