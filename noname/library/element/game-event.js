import { Game as game } from '../../game.js';
import { Get as get } from '../../get.js';
import { Library as lib } from '../../library.js';
import { status as _status } from '../../status.js';
import { UI as ui } from '../../ui.js';
export class GameEvent {
	/**
	 * @param {string} [name]
	 * @param {false} [trigger]
	 */
	constructor(name, trigger) {
		if (typeof name == "string") {
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
		 * @type {this[]}
		 */
		this.next = [];
		/**
		 * @type {this[]}
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
	/**
	 * @param {keyof this} key
	 * @param {number} [value]
	 * @param {number} [baseValue]
	 */
	addNumber(key, value, baseValue) {
		if (typeof value != "number") value = 0;
		if (typeof this[key] == "number") this[key] += value;
		else {
			if (typeof baseValue != "number") baseValue = 0;
			this[key] = baseValue + value;
		}
		return this;
	}
	/**
	 * @param {keyof this} key
	 * @param {number} [baseValue]
	 */
	decrease(key, baseValue) {
		if (typeof this[key] == "number") this[key]--;
		else this.subtractNumber(key, 1, baseValue);
		return this;
	}
	/**
	 * @param {keyof this} key
	 * @param {number} [baseValue]
	 */
	increase(key, baseValue) {
		if (typeof this[key] == "number") this[key]++;
		else this.addNumber(key, 1, baseValue);
		return this;
	}
	/**
	 * @param {keyof this} key
	 * @param {number} [value]
	 * @param {number} [baseValue]
	 */
	subtractNumber(key, value, baseValue) {
		if (typeof value != "number") value = 0;
		if (typeof this[key] == "number") this[key] -= value;
		else {
			if (typeof baseValue != "number") baseValue = 0;
			this[key] = baseValue - value;
		}
		return this;
	}
	/**
	 * @param {Parameters<typeof this.hasHandler>[0]} type
	 * @param {GameEvent} event
	 * @param {{
	 * state?: "begin" | "end";
	 * }} option
	 * @returns {this}
	 */
	callHandler(type, event, option) {
		if (this.hasHandler(type)) this.getHandler(type).forEach(handler => {
			if (typeof handler == "function") handler(event, option);
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
	 * state?: "begin" | "end";
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
	 * state?: "begin" | "end";
	 * }) => void)[]} handlers
	 * @returns {number}
	 */
	/**
	 * @overload
	 * @param {Parameters<typeof this.hasHandler>[0]} type
	 * @param {...((event: GameEvent, option: {
	 * state?: "begin" | "end";
	 * }) => void)[]} handlers
	 * @returns {number}
	 */
	pushHandler(type) {
		return typeof type == "string" ? this.getHandler(type).push(...Array.from(arguments).slice(1)) : this.getHandler().push(...arguments);
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
		if (typeof func != "function") return;
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
		if (notrigger != "notrigger") {
			this.trigger(this.name + "Cancelled");
			if (this.player && lib.phaseName.contains(this.name)) this.player.getHistory("skipped").add(this.name);
		}
		return this;
	}
	neutralize(event) {
		this.untrigger();
		this.finish();
		this._neutralized = true;
		this.trigger("eventNeutralized");
		this._neutralize_event = event || _status.event;
		return this;
	}
	unneutralize() {
		this.untrigger();
		delete this._neutralized;
		delete this.finished;
		if (this.type == "card" && this.card && this.name == "sha") this.directHit = true;
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
		if (hidden.contains(skill)) this.set("hsskill", skill);
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
			if (typeof key != "string") {
				console.log("warning: using non-string object as event key");
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
					if (!lib.element.content[item]._parsed) {
						lib.element.content[item] = lib.init.parsex(lib.element.content[item]);
						lib.element.content[item]._parsed = true;
					}
				}
				catch (_) {
					throw new Error(`Content ${item} may not exist.\nlib.element.content[${item}] = ${lib.element.content[item]}`);
				}
				this.content = lib.element.content[item];
				break;
		}
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
	getParent(level, forced) {
		var parent, historys = [];
		if (this._modparent && game.online) {
			parent = this._modparent;
		}
		else {
			parent = this.parent;
		}
		var toreturn = {};
		if (typeof level == "string" && forced == true) {
			toreturn = null;
		}
		if (!parent) return toreturn;
		if (typeof level == "number") {
			for (var i = 1; i < level; i++) {
				if (!parent) return toreturn;
				parent = parent.parent;
			}
		}
		else if (typeof level == "string") {
			while (true) {
				if (!parent) return toreturn;
				historys.push(parent);
				if (parent.name == level) return parent;
				parent = parent.parent;
				if (historys.contains(parent)) return toreturn;
			}
		}
		if (toreturn === null) {
			return null;
		}
		return parent;
	}
	getTrigger() {
		return this.getParent()._trigger;
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
		const next = new lib.element.GameEvent(`${this.name}Inserted`, false);
		this.next.push(next);
		next.setContent(content);
		Object.entries(map).forEach(entry => next.set(entry[0], entry[1]));
		return next;
	}
	insertAfter(content, map) {
		const next = new lib.element.GameEvent(`${this.name}Inserted`, false);
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
		}
		if (skill) {
			var info = get.info(skill);
			this.skill = skill;
			this._aiexclude = [];
			if (typeof info.viewAs == "function") {
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
							var mod = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
							if (mod != "unchanged") return mod;
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
							var mod = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
							if (mod != "unchanged") return mod;
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
						if (evt._backup.filterOk) return evt._backup.filterOk()
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
		return this.getParent().name != "_lianhuan" && this.getParent().name != "_lianhuan2";
	}
	isPhaseUsing(player) {
		var evt = this.getParent("phaseUse");
		if (!evt || evt.name != "phaseUse") return false;
		return !player || player == evt.player;
	}
	addTrigger(skills, player) {
		if (!player || !skills) return this;
		let evt = this;
		if (typeof skills == "string") skills = [skills];
		game.expandSkills(skills);
		while (true) {
			evt = evt.getParent("arrangeTrigger");
			if (!evt || evt.name != "arrangeTrigger" || !evt.doingList) return this;
			const doing = (() => {
				if (evt.doing && evt.doing.player == player) return evt.doing;
				return evt.doingList.find(i => i.player == player);
			})();
			// if(!doing) return this;
			const firstDo = evt.doingList.find(i => i.player == "firstDo");
			const lastDo = evt.doingList.find(i => i.player == "lastDo");

			for (const skill of skills) {
				const info = lib.skill[skill];
				if (!info.trigger) continue;
				if (!Object.keys(info.trigger).some(i => {
					if (Array.isArray(info.trigger[i])) return info.trigger[i].includes(evt.triggername);
					return info.trigger[i] == evt.triggername;
				})) continue;

				const playerMap = game.players.concat(game.dead).sortBySeat(evt.starter);
				const priority = get.priority(skill);
				const toadd = {
					skill: skill,
					player: player,
					priority: priority,
				}
				const map = info.firstDo ? firstDo : info.lastDo ? lastDo : doing;
				if (!map) continue;
				if (map.doneList && map.doneList.some(i => i.skill == toadd.skill && i.player == toadd.player)) continue;
				if (map.todoList.some(i => i.skill == toadd.skill && i.player == toadd.player)) continue;
				map.todoList.add(toadd);
				map.todoList.sort((a, b) => (b.priority - a.priority) || (playerMap.indexOf(a) - playerMap.indexOf(b)));
			}
		}
	}
	removeTrigger(skills, player) {
		if (!player || !skills) return this;
		let evt = this;
		if (typeof skills == "string") skills = [skills];
		game.expandSkills(skills);
		while (true) {
			evt = evt.getParent("arrangeTrigger");
			if (!evt || evt.name != "arrangeTrigger" || !evt.doingList) return this;
			const doing = (() => {
				if (evt.doing && evt.doing.player == player) return evt.doing;
				return evt.doingList.find(i => i.player == player);
			})();
			// if(!doing) return this;
			const firstDo = evt.doingList.find(i => i.player == "firstDo");
			const lastDo = evt.doingList.find(i => i.player == "lastDo");

			for (const skill of skills) {
				[doing, firstDo, lastDo].forEach(map => {
					if (!map) return;
					const toremove = map.todoList.filter(i => i.skill == skill && i.player == player);
					if (toremove.length > 0) map.todoList.removeArray(toremove);
				});
			}
		}
	}
	trigger(name) {
		if (_status.video) return this;
		if ((this.name === "gain" || this.name === "lose") && !_status.gameDrawed) return this;
		if (name === "gameDrawEnd") _status.gameDrawed = true;
		if (name === "gameStart") {
			lib.announce.publish("gameStart", {});
			if (_status.brawl && _status.brawl.gameStart) _status.brawl.gameStart();
			if (lib.config.show_cardpile) ui.cardPileButton.style.display = "";
			_status.gameStarted = true;
			game.showHistory();
		}
		if (!lib.hookmap[name] && !lib.config.compatiblemode) return this;
		if (!game.players || !game.players.length) return this;
		const event = this;
		let start = [_status.currentPhase, event.source, event.player, game.me, game.players[0]].find(i => get.itemtype(i) == "player");
		if (!start) return this;
		if (!game.players.includes(start) && !game.dead.includes(start)) start = game.findNext(start);
		const firstDo = {
			player: "firstDo",
			todoList: [],
			doneList: [],
		}
		const lastDo = {
			player: "lastDo",
			todoList: [],
			doneList: [],
		}
		const doingList = [];
		let allbool = false;
		const roles = ["player", "source", "target", "global"];
		const playerMap = game.players.concat(game.dead).sortBySeat(start);
		function addList(skill, player) {
			if (this.listAdded[skill]) return;
			this.listAdded[skill] = true;
			if (player.forbiddenSkills[skill]) return;
			if (player.disabledSkills[skill]) return;

			const info = lib.skill[skill];
			const list = info.firstDo ? firstDo.todoList : info.lastDo ? lastDo.todoList : this.todoList;
			const priority = get.priority(skill);
			list.push({
				skill: skill,
				player: player,
				priority: priority,
			});
			if (typeof list.player == "string") list.sort((a, b) => (b.priority - a.priority) || (playerMap.indexOf(a) - playerMap.indexOf(b)));
			else list.sort((a, b) => b.priority - a.priority);
			allbool = true;
		}
		let player = start;
		do {
			const doing = {
				player: player,
				todoList: [],
				doneList: [],
				listAdded: {},
				addList: addList,
			}
			const notemp = player.skills.slice();
			for (const j in player.additionalSkills) {
				if (!j.startsWith("hidden:")) notemp.addArray(player.additionalSkills[j]);
			}
			for (const skill in player.tempSkills) {
				if (notemp.includes(skill)) continue;
				const expire = player.tempSkills[skill];
				if (typeof expire === "function" && expire(event, player, name)) {
					delete player.tempSkills[skill];
					player.removeSkill(skill);
				}
				else if (get.objtype(expire) === "object") {
					for (const role of roles) {
						if (role !== "global" && player !== event[role]) continue;
						if (expire[role] === name || (Array.isArray(expire[role]) && expire[role].includes(name))) {
							delete player.tempSkills[skill];
							player.removeSkill(skill);
						}
					}
				}
			}
			if (lib.config.compatiblemode) {
				let skills = player.getSkills("invisible").concat(lib.skill.global);
				game.expandSkills(skills);
				for (const skill of skills) {
					const info = get.info(skill);
					if (!info || !info.trigger) continue;
					if (roles.some(role => {
						if (info.trigger[role] === name) return true;
						if (Array.isArray(info.trigger[role]) && info.trigger[role].includes(name)) return true;
					})) doing.addList(skill, player);
				}
			}
			else {
				for (const role of roles) {
					const globalTriggername = role + "_" + name;
					if (lib.hook.globalskill[globalTriggername]) {
						lib.hook.globalskill[globalTriggername].forEach(skill => doing.addList(skill, player));
					}
					const triggername = player.playerid + "_" + role + "_" + name;
					if (lib.hook[triggername]) {
						lib.hook[triggername].forEach(skill => doing.addList(skill, player));
					}
				}
			}
			delete doing.listAdded;
			delete doing.addList;
			doingList.push(doing);
			player = player.nextSeat;
		} while (player && player !== start)
		doingList.unshift(firstDo);
		doingList.push(lastDo);
		// console.log(name,event.player,doingList.map(i=>({player:i.player,todoList:i.todoList.slice(),doneList:i.doneList.slice()})))

		if (allbool) {
			var next = game.createEvent("arrangeTrigger", false, event);
			next.setContent("arrangeTrigger");
			next.doingList = doingList;
			next._trigger = event;
			next.triggername = name;
			next.starter = start;
			event._triggering = next;
		}
		return this;
	}
	untrigger(all, player) {
		if (typeof all == "undefined") all = true;
		var evt = this._triggering;
		if (all) {
			if (evt && evt.doingList) {
				evt.doingList.forEach(doing => doing.todoList = []);
				evt.list = [];
				if (evt.doing) evt.doing.todoList = [];
			}
			this._triggered = 5;
		}
		else if (player) {
			this._notrigger.add(player);
			if (!evt || !evt.doingList) return this;
			const doing = evt.doingList.find(doing => doing.player == player);
			if (doing) doing.todoList = [];
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
		throw new Error("Do not call this method");
	}
	/**
	 * 事件转为Promise化
	 * 
	 * @returns { Promise<GameEvent> & GameEvent }
	 */
	toPromise() {
		if (this.async && this.resolve) {
			throw new TypeError("This event has been converted into a promise");
		}
		return new lib.element.GameEventPromise(this);
	}
}
