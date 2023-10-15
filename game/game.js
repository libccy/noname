"use strict";
{
	const userAgent = navigator.userAgent.toLowerCase();
	if (!localStorage.getItem('gplv3_noname_alerted')) {
		if (confirm('①无名杀是一款基于GPLv3协议的开源软件！\n你可以在遵守GPLv3协议的基础上任意使用，修改并转发《无名杀》，以及所有基于《无名杀》开发的拓展。\n点击“确定”即代表您认可并接受GPLv3协议↓️\nhttps://www.gnu.org/licenses/gpl-3.0.html\n②无名杀官方发布地址仅有GitHub仓库！\n其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！')) {
			localStorage.setItem('gplv3_noname_alerted', true);
		}
		else {
			const ios = userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('macintosh');
			//electron
			if (typeof window.process == 'object' && typeof window.require == 'function') {
				const versions = window.process.versions;
				const electronVersion = parseFloat(versions.electron);
				let remote;
				if (electronVersion >= 14) {
					remote = require('@electron/remote');
				} else {
					remote = require('electron').remote;
				}
				const thisWindow = remote.getCurrentWindow();
				thisWindow.destroy();
				window.process.exit();
			}
			//android-cordova环境
			//ios-cordova环境或ios浏览器环境
			//非ios的网页版
			else if (!ios) {
				window.close();
			}
		}
	}
	const nonameInitialized = localStorage.getItem('noname_inited');
	const GeneratorFunction = (function* () { }).constructor;
	// gnc: GeNCoroutine
	const gnc = {
		of: fn => gnc.is.generatorFunc(fn) ? function genCoroutine() {
			let gen = fn.apply(this, arguments);
			gen.status = "next";
			gen.state = undefined;
			const callback = (resolve, reject) => {
				let result,
					nexts = resolve,
					throws = reject;
				try {
					result = gen[gen.status](gen.state);
				} catch (error) {
					reject(error);
					return;
				}
				if (!result.done) {
					nexts = (item) => {
						gen.state = item;
						gen.status = "next";
						callback(resolve, reject);
					}
					throws = (err) => {
						gen.state = err;
						gen.status = "throw";
						callback(resolve, reject);
					}
				}
				result = result.value;
				Promise.resolve(result).then(nexts, throws);
			}
			return new Promise(callback);
		} : (() => { throw new TypeError("gnc.of needs a GeneratorFunction.") })(),
		is: {
			coroutine: item => typeof item == "function" && item.name == "genCoroutine",
			generatorFunc: item => item instanceof GeneratorFunction,
			generator: item => (typeof item == "object") && ("constructor" in item) && item.constructor && ("constructor" in item.constructor) && item.constructor.constructor === GeneratorFunction
		}
	};
	const _status = {
		paused: false,
		paused2: false,
		paused3: false,
		over: false,
		clicked: false,
		auto: false,
		event: {
			finished: true,
			next: [],
			after: []
		},
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
	const lib = {
		configprefix: 'noname_0.9_',
		versionOL: 27,
		updateURLS: {
			coding: 'https://raw.fgit.cf/libccy/noname',
			github: 'https://raw.githubusercontent.com/libccy/noname',
		},
		updateURL: 'https://raw.githubusercontent.com/libccy/noname',
		mirrorURL: 'https://raw.fgit.cf/libccy/noname',
		hallURL: '47.99.105.222',
		assetURL: typeof nonameInitialized != 'string' || nonameInitialized == 'nodejs' ? '' : nonameInitialized,
		userAgent: userAgent,
		compatibleEdition: Boolean(typeof nonameInitialized == 'string' && nonameInitialized.match(/\/(?:com\.widget|yuri\.nakamura)\.noname\//)),
		changeLog: [],
		updates: [],
		canvasUpdates: [],
		video: [],
		skilllist: [],
		connectBanned: [],
		characterIntro: {},
		characterTitle: {},
		characterPack: {},
		characterFilter: {},
		characterSort: {},
		characterReplace: {},
		characterGuozhanFilter: ["mode_guozhan"],
		dynamicTranslate: {},
		cardPack: {},
		skin: {},
		onresize: [],
		onphase: [],
		onwash: [],
		onover: [],
		ondb: [],
		ondb2: [],
		chatHistory: [],
		emotionList: {
			xiaowu_emotion: 14,
			xiaokuo_emotion: 8,
			shibing_emotion: 15,
			guojia_emotion: 20,
			zhenji_emotion: 20,
			xiaosha_emotion: 20,
			xiaotao_emotion: 20,
			xiaojiu_emotion: 20,
		},
		animate: {
			skill: {},
			card: {},
		},
		onload: [],
		onload2: [],
		onprepare: [],
		arenaReady: [],
		onfree: [],
		inpile: [],
		inpile_nature: [],
		extensions: [],
		extensionPack: {},
		cardType: {},
		hook: { globaltrigger: {}, globalskill: {} },
		//函数钩子
		hooks: {},
		announce: {},
		objectURL: new Map(),
		hookmap: {},
		imported: {},
		layoutfixed: ['chess', 'tafang', 'stone'],
		pinyins: {},
		//Yingbian
		//应变
		yingbian: {
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
							'step 0'
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
							'step 1'
							var type = get.type2(card);
							event.list = game.filterPlayer(current => current != player && current.countCards('h') && (_status.connectMode || current.hasCard(cardx => get.type2(cardx) == type, 'h'))).sortBySeat(_status.currentPhase || player);
							event.id = get.id();
							'step 2'
							if (!event.list.length) event.finish();
							else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] == game.me)) event.goto(4);
							else event.send(event.current = event.list.shift(), event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
							'step 3'
							if (result.bool) {
								event.zhuzhanresult = event.current;
								event.zhuzhanresult2 = result;
								if (event.current != game.me) game.delayx();
								event.goto(8);
							}
							else event.goto(2);
							'step 4'
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
							'step 5'
							if (!result || !result.bool || event.zhuzhanresult) return;
							game.broadcast('cancel', event.id);
							event.zhuzhanresult = game.me;
							event.zhuzhanresult2 = result;
							'step 6'
							if (event.withol && !event.resultOL) game.pause();
							'step 7'
							game.players.forEach(value => value.hideTimer());
							'step 8'
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
								}
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
		},
		//The actual card name
		//实际的卡牌名称
		actualCardName: new Map([
			['挟令', '挟天子以令诸侯'],
			['霹雳投石车', '霹雳车']
		]),
		characterDialogGroup: {
			'收藏': function (name, capt) {
				return lib.config.favouriteCharacter.includes(name) ? capt : null;
			},
			'最近': function (name, capt) {
				var list = get.config('recentCharacter') || [];
				return list.includes(name) ? capt : null;
			}
		},
		configMenu: {},
		extensionMenu: {},
		mode: {},
		status: {
			running: false,
			canvas: false,
			time: 0,
			reload: 0,
			delayed: 0,
			frameId: 0,
			videoId: 0,
			globalId: 0,
		},
		help: {
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
				'<li>护甲：和体力类似，每点护甲可抵挡一点伤害，但不影响手牌上限。' +
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
		},
		path: {},
		// setPressure:function(node,func){
		// 	if(window.Pressure){
		// 		window.Pressure.set(node,{change: func}, {polyfill: false});
		// 	}
		// },
		genAsync: fn => gnc.of(fn),
		genAwait: item => gnc.is.generator(item) ? gnc.of(function* () { for (const content of item) { yield content; } })() : Promise.resolve(item),
		gnc: {
			of: fn => gnc.of(fn),
			is: {
				coroutine: item => gnc.is.coroutine(item),
				generatorFunc: item => gnc.is.generatorFunc(item),
				generator: item => gnc.is.generator(item)
			}
		},
		init: {},
		cheat: {},
		translate: {},
		element: {},
		card: {},
		filter: {},
		sort: {},
		skill: {},
		character: {},
		perfectPair: {},
		cardPile: {},
		message: {},
		suit: ['club', 'spade', 'diamond', 'heart'],
		suits: ['club', 'spade', 'diamond', 'heart', 'none'],
		color: {
			black: ['club', 'spade'],
			red: ['diamond', 'heart'],
			none: ['none'],
		},
		group: ['wei', 'shu', 'wu', 'qun', 'jin', 'shen'],
		//数值代表各元素在名称中排列的先后顺序
		nature: new Map(),
		natureAudio: {},
		linked: ['fire', 'thunder', 'kami', 'ice'],
		natureBg: new Map(),
		natureSeparator: '|',
		namePrefix: new Map(),
		groupnature: {
			shen: 'shen',
			wei: 'water',
			shu: 'soil',
			wu: 'wood',
			qun: 'qun',
			western: 'thunder',
			key: 'key',
			jin: 'thunder',
			ye: 'thunder',
		},
		lineColor: new Map(),
		phaseName: ['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu']
	};
	const game = {
		players: [],
		dead: [],
		imported: [],
		playerMap: {},
		phaseNumber: 0,
		roundNumber: 0,
		shuffleNumber: 0,
	};
	window['b' + 'ann' + 'e' + 'dE' + 'x' + 'ten' + 's' + 'i' + 'o' + 'ns'] = ['\u4fa0\u4e49', '\u5168\u6559\u7a0b'];
	const ui = {
		updates: [],
		thrown: [],
		touchlines: [],
		todiscard: {},
		create: {},
		click: {},
		selected: {
			buttons: [], cards: [], targets: []
		},
	};
	const get = {
		is: {}
	};
	const ai = {
		basic: {},
		get: get
	};

	/**
	 * 要读取的模组
	 */
	const modules = ["lib", "lib.config", "lib.init", "lib.element", "lib.nodiz", "game", "ui", "get", "ai"];

	/**
	 * 模块系统
	 */
	const Module = {
		/**
		 * 储存数据的地方，用于和函数区分
		 */
		cache: {
			/**
			 * 模块Promise的resolve函数
			 * 
			 * @type {[(value: any) => void]}
			 */
			resolves: [],
			/**
			 * 模块的Promise
			 * 
			 * @type {[Promise<void>]}
			 */
			promises: [],
			/**
			 * 被模块依赖的模块记录，`key`为被依赖的模块，`value`则为依赖模块
			 * 
			 * @type {Map<string, [string]>}
			 */
			dependencies: new Map(),
			/**
			 * 模块的回调函数
			 * 
			 * @type {Map<string, *]}
			 */
			contents: new Map()
		},

		/**
		 * 初始化全局变量
		 * 
		 * @param {[string]} modules - 要读取的模块
		 * - 此参数仅用于创建无副作用的链式调用
		 * @returns {Promise<[string]>}
		 */
		init(modules) {
			window.module = this.define.bind(this);
			return Promise.resolve(modules);
		},

		/**
		 * 读取给定的模块
		 * 
		 * @param {[string]} modules
		 * @returns {Promise<[void]>}
		 */
		read(modules) {
			return Promise.all(modules.map(name => new Promise((resolve, reject) => {
				let script = document.createElement("script");
				script.src = `${lib.assetURL}game/module/${name}.js`;
				script.onload = resolve;
				script.onerror = reject;
				document.head.appendChild(script);
			})));
		},


		/**
		 * > TODO: 以后再补正式文档，只需要知道这玩意就`window.module`就行
		 * 
		 * @param {string} name - 模块名 
		 * @param {[string]} requires - 模块的依赖
		 * @param {*} content - 模块的内容
		 * @returns {void}
		 */
		define(name, requires, content) {
			this.cache.contents.set(name, content);

			let promise = new Promise(resolve => {
				this.cache.resolves.push(resolve);
			});
			// 有依赖的情况下
			if (requires.length > 0) {
				promise = promise.then(() => Promise.all(requires.map(dependency => {
					if (!this.cache.dependencies.has(dependency)) this.cache.dependencies.set(dependency, new Array);

					return new Promise(resolve => {
						const dependencies = this.cache.dependencies.get(dependency);
						dependencies.push(resolve);
					});
				})));
			}

			promise = promise.then(() => this.cache.contents.get(name))
				.then(funcs => funcs(lib, game, ui, get, ai, _status))
				.then(() => {
					if (this.cache.dependencies.has(name)) {
						this.cache.dependencies.get(name).forEach(resolve => resolve());
					}
				});

			this.cache.promises.push(promise);
		},

		/**
		 * 开始读取模块
		 * 
		 * 由于重点都在`Module.define`中实现，故此函数仅用于“启动”各模块的`Promise`
		 */
		load() {
			this.cache.resolves.forEach(resolve => resolve());
		},

		/**
		 * 用于等待模块加载完后的善后工作
		 * 
		 * @returns {Promise<void>}
		 */
		dispose() {
			return Promise.all(this.cache.promises)
				.then(() => {
					delete window.module;
					return lib.init.init();
				})
		}
	}

	/**
	 * 初始化无名杀
	 * 
	 * @returns {void}
	 */
	function init() {
		Module.init(modules)
			.then(Module.read)
			.then(() => Module.load())
			.then(() => Module.dispose());
	}

	if ("__core-js_shared__" in window) init();
	else {
		const coreJSBundle = document.createElement('script');
		coreJSBundle.onerror = coreJSBundle.onload = init;
		coreJSBundle.src = `${lib.assetURL}game/core-js-bundle.js`;
		document.head.appendChild(coreJSBundle);
	}
}
