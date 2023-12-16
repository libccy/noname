import { Game as game } from '../game.js';
import { Get as get } from '../get.js';
import { Library as lib } from '../library.js';
import { status as _status } from '../status.js';
import { UI as ui } from '../ui.js';

export class Filter {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}
	static all() {
		return true;
	}
	static none() {
		return false;
	}

	/**
	 * Check if the card does not count toward the player’s hand limit
	 * 
	 * 检测此牌是否不计入此角色的手牌上限
	 */
	static ignoredHandcard(card, player) {
		return game.checkMod(card, player, false, "ignoredHandcard", player);
	}

	/**
	 * Check if the card is giftable
	 * 检测此牌是否可赠予
	 */
	static cardGiftable(card, player, target, strict) {
		const mod = game.checkMod(card, player, target, "unchanged", "cardGiftable", player);
		if (!mod || strict && (mod == "unchanged" && (get.position(card) != "h" || !get.cardtag(card, "gifts")) || player == target)) return false;
		return get.type(card, false) != "equip" || target.canEquip(card, true);
	}

	/**
	 * Check if the card is recastable
	 * 检查此牌是否可重铸
	 */
	static cardRecastable(card, player, source, strict) {
		if (typeof player == "undefined") player = get.owner(card);
		const mod = game.checkMod(card, player, source, "unchanged", "cardRecastable", player);
		if (!mod) return false;
		if (strict && mod == "unchanged") {
			if (get.position(card) != "h") return false;
			const info = get.info(card), recastable = info.recastable || info.chongzhu;
			return Boolean(typeof recastable == "function" ? recastable(_status.event, player) : recastable);
		}
		return true;
	}
	// 装备栏相关
	static canBeReplaced(card, player) {
		var mod = game.checkMod(card, player, "unchanged", "canBeReplaced", player);
		if (mod != "unchanged") return mod;
		return true;
	}
	// 装备栏 END
	static buttonIncluded(button) {
		return !(_status.event.excludeButton && _status.event.excludeButton.contains(button));
	}
	static filterButton(button) {
		return true;
	}
	static cardSavable(card, player, target) {
		if (get.itemtype(card) == "card") {
			var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
			if (mod2 != "unchanged") return mod2;
		}
		var mod = game.checkMod(card, player, target, "unchanged", "cardSavable", player);
		if (mod != "unchanged") return mod;
		var savable = get.info(card).savable;
		if (typeof savable == "function") savable = savable(card, player, target);
		return savable;
	}
	static filterTrigger(event, player, name, skill) {
		if (player._hookTrigger && player._hookTrigger.some(i => {
			const info = lib.skill[i].hookTrigger;
			return info && info.block && info.block(event, player, name, skill);
		})) return false;
		const fullskills = game.expandSkills(player.getSkills(false).concat(lib.skill.global));
		const info = get.info(skill);
		if (!info) return console.log("缺少info的技能:", skill);
		if (!fullskills.includes(skill)) {
			if (get.mode() != "guozhan") return false;
			if (info && info.noHidden) return false;
		}
		if (!info.trigger) return false;
		if (!info.forceDie && player.isDead()) return false;
		if (!info.forceOut && player.isOut()) return false;
		if (!Object.keys(info.trigger).some(i => {
			if (i != "global" && player != event[i]) return false;
			if (Array.isArray(info.trigger[i])) return info.trigger[i].includes(name);
			return info.trigger[i] == name;
		})) return false;
		if (info.filter && !info.filter(event, player, name)) return false;
		if (event._notrigger.includes(player) && !lib.skill.global.includes(skill)) return false;
		if (typeof info.usable == "number" && player.hasSkill("counttrigger") &&
			player.storage.counttrigger && player.storage.counttrigger[skill] >= info.usable) {
			return false;
		}
		if (info.round && (info.round - (game.roundNumber - player.storage[skill + "_roundcount"]) > 0)) return false;
		if (player.storage[`temp_ban_${skill}`] === true) return false;
		return true;
	}
	static characterDisabled(i, libCharacter) {
		if (!lib.character[i] || lib.character[i][4] && lib.character[i][4].contains("forbidai")) return true;
		if (lib.character[i][4] && lib.character[i][4].contains("unseen")) return true;
		if (lib.config.forbidai.contains(i)) return true;
		if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) return true;
		if (_status.connectMode) {
			if (lib.configOL.banned.contains(i) || lib.connectBanned.contains(i)) return true;
			var double_character = false;
			if (lib.configOL.mode == "guozhan") {
				double_character = true;
			}
			else if (lib.configOL.double_character && (lib.configOL.mode == "identity" || lib.configOL.mode == "stone")) {
				double_character = true;
			}
			else if (lib.configOL.double_character_jiange && (lib.configOL.mode == "versus" && _status.mode == "jiange")) {
				double_character = true;
			}
			if (double_character && lib.config.forbiddouble.contains(i)) {
				return true;
			}
		}
		else {
			if (lib.config.banned.contains(i)) return true;
			var double_character = false;
			if (get.mode() == "guozhan") {
				double_character = true;
			}
			else if (get.config("double_character") && (lib.config.mode == "identity" || lib.config.mode == "stone")) {
				double_character = true;
			}
			else if (get.config("double_character_jiange") && (lib.config.mode == "versus" && _status.mode == "jiange")) {
				double_character = true;
			}
			if (double_character && lib.config.forbiddouble.contains(i)) {
				return true;
			}
		}
	}
	static characterDisabled2(i) {
		var info = lib.character[i];
		if (!info) return true;
		if (info[4]) {
			if (info[4].contains("boss")) return true;
			if (info[4].contains("hiddenboss")) return true;
			if (info[4].contains("minskin")) return true;
			if (info[4].contains("unseen")) return true;
			if (info[4].contains("forbidai") && (!_status.event.isMine || !_status.event.isMine())) return true;
			if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) return true;
		}
		return false;
	}
	static skillDisabled(skill) {
		if (!lib.translate[skill] || !lib.translate[skill + "_info"]) return true;
		var info = lib.skill[skill];
		if (info && !info.unique && !info.temp && !info.sub && !info.fixed && !info.vanish) {
			return false;
		}
		return true;
	}
	static cardEnabled(card, player, event) {
		if (player == undefined) player = _status.event.player;
		if (!player) return false;
		if (get.itemtype(card) == "card") {
			var mod2 = game.checkMod(card, player, event, "unchanged", "cardEnabled2", player);
			if (mod2 != "unchanged") return mod2;
		}
		card = get.autoViewAs(card);
		if (event === "forceEnable") {
			var mod = game.checkMod(card, player, event, "unchanged", "cardEnabled", player);
			if (mod != "unchanged") return mod;
			return true;
		}
		else {
			var filter = get.info(card).enable;
			if (!filter) return;
			var mod = game.checkMod(card, player, event, "unchanged", "cardEnabled", player);
			if (mod != "unchanged") return mod;
			if (typeof filter == "boolean") return filter;
			if (typeof filter == "function") return filter(card, player, event);
		}
	}
	static cardRespondable(card, player, event) {
		event = event || _status.event;
		if (event.name != "chooseToRespond") return true;
		var source = event.getParent().player;
		if (source && source != player) {
			if (source.hasSkillTag("norespond", false, [card, player, event], true)) {
				return false;
			}
		}
		if (player == undefined) player = _status.event.player;
		if (get.itemtype(card) == "card") {
			var mod2 = game.checkMod(card, player, event, "unchanged", "cardEnabled2", player);
			if (mod2 != "unchanged") return mod2;
		}
		var mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
		if (mod != "unchanged") return mod;
		return true;
	}
	static cardUsable2(card, player, event) {
		card = get.autoViewAs(card);
		var info = get.info(card);
		if (info.updateUsable == "phaseUse") {
			event = event || _status.event;
			if (event.type == "chooseToUse_button") event = event.getParent();
			if (player != _status.event.player) return true;
			if (event.getParent().name != "phaseUse") return true;
			if (event.getParent().player != player) return true;
		}
		var num = info.usable;
		if (typeof num == "function") num = num(card, player);
		num = game.checkMod(card, player, num, "cardUsable", player);
		if (typeof num != "number") return true;
		else return (player.countUsed(card) < num);
	}
	static cardUsable(card, player, event) {
		card = get.autoViewAs(card);
		var info = get.info(card);
		event = event || _status.event;
		if (event.type == "chooseToUse_button") event = event.getParent();
		if (player != _status.event.player) return true;
		if (info.updateUsable == "phaseUse") {
			if (event.getParent().name != "phaseUse") return true;
			if (event.getParent().player != player) return true;
		}
		event.addCount_extra = true;
		var num = info.usable;
		if (typeof num == "function") num = num(card, player);
		num = game.checkMod(card, player, num, "cardUsable", player);
		if (typeof num != "number") {
			return (typeof num == "boolean") ? num : true;
		}
		if (player.countUsed(card) < num) return true;
		if (game.hasPlayer(function (current) {
			return game.checkMod(card, player, current, false, "cardUsableTarget", player);
		})) {
			return true;
		}
		return false;
	}
	static cardDiscardable(card, player, event) {
		event = event || _status.event;
		if (typeof event != "string") event = event.getParent().name;
		var mod = game.checkMod(card, player, event, "unchanged", "cardDiscardable", player);
		if (mod != "unchanged") return mod;
		return true;
	}
	static canBeDiscarded(card, player, target, event) {
		event = event || _status.event;
		if (typeof event != "string") event = event.getParent().name;
		var mod = game.checkMod(card, player, target, event, "unchanged", "canBeDiscarded", target);
		if (mod != "unchanged") return mod;
		return true;
	}
	static canBeGained(card, player, target, event) {
		event = event || _status.event;
		if (typeof event != "string") event = event.getParent().name;
		var mod = game.checkMod(card, player, target, event, "unchanged", "canBeGained", target);
		if (mod != "unchanged") return mod;
		return true;
	}
	static cardAiIncluded(card) {
		if (_status.event.isMine()) return true;
		return (_status.event._aiexclude.contains(card) == false);
	}
	static filterCard(card, player, event) {
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
		else if (typeof select == "number") range = [select, select];
		else if (get.itemtype(select) == "select") range = select;
		else if (typeof select == "function") range = select(card, player);
		game.checkMod(card, player, range, "selectTarget", player);
		if (!range || range[1] != -1) return true;
		var filterTarget = (event && event.filterTarget) ? event.filterTarget : lib.filter.filterTarget;
		return game.hasPlayer(function (current) {
			return filterTarget(card, player, current);
		});
	}
	static targetEnabledx(card, player, target) {
		if (!card) return false;
		if (!target || !target.isIn()) return false;
		var event = _status.event;
		if (event._backup && event._backup.filterCard == lib.filter.filterCard && (!lib.filter.cardEnabled(card, player, event) || !lib.filter.cardUsable(card, player, event))) return false;
		if (event.addCount_extra) {
			if (!lib.filter.cardUsable2(card, player) && !game.checkMod(card, player, target, false, "cardUsableTarget", player)) return false;
		}
		var info = get.info(card);
		if (info.singleCard && info.filterAddedTarget && ui.selected.targets.length) return Boolean(info.filterAddedTarget(card, player, target, ui.selected.targets[ui.selected.targets.length - 1]));
		return lib.filter.targetEnabled.apply(this, arguments);
	}
	static targetEnabled(card, player, target) {
		if (!card) return false;
		if (!target || !target.isIn()) return false;
		var info = get.info(card);
		var filter = info.filterTarget;
		if (!info.singleCard || ui.selected.targets.length == 0) {
			var mod = game.checkMod(card, player, target, "unchanged", "playerEnabled", player);
			if (mod != "unchanged") return mod;
			var mod = game.checkMod(card, player, target, "unchanged", "targetEnabled", target);
			if (mod != "unchanged") return mod;
		}
		if (typeof filter == "boolean") return filter;
		if (typeof filter == "function") return Boolean(filter(card, player, target));
	}
	static targetEnabled2(card, player, target) {
		if (!card) return false;
		if (!target || !target.isIn()) return false;
		if (lib.filter.targetEnabled(card, player, target)) return true;

		if (game.checkMod(card, player, target, "unchanged", "playerEnabled", player) == false) return false;
		if (game.checkMod(card, player, target, "unchanged", "targetEnabled", target) == false) return false;

		var filter = get.info(card).modTarget;
		if (typeof filter == "boolean") return filter;
		if (typeof filter == "function") return Boolean(filter(card, player, target));
		return false;
	}
	static targetEnabled3(card, player, target) {
		if (!card) return false;
		if (!target || !target.isIn()) return false;
		var info = get.info(card);

		if (info.filterTarget == true) return true;
		if (typeof info.filterTarget == "function" && info.filterTarget(card, player, target)) return true;

		if (info.modTarget == true) return true;
		if (typeof info.modTarget == "function" && info.modTarget(card, player, target)) return true;
		return false;
	}
	static targetInRange(card, player, target) {
		var info = get.info(card);
		var range = info.range;
		var outrange = info.outrange;
		if (range == undefined && outrange == undefined) return true;

		var mod = game.checkMod(card, player, target, "unchanged", "targetInRange", player);
		var extra = 0;
		if (mod != "unchanged") {
			if (typeof mod == "boolean") return mod;
			if (typeof mod == "number") extra = mod;
		}
		if (typeof info.range == "function") return info.range(card, player, target);

		if (player.hasSkill("undist") || target.hasSkill("undist")) return false;
		for (var i in range) {
			if (i == "attack") {
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
			if (i == "attack") {
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
	}
	static filterTarget(card, player, target) {
		return (lib.filter.targetEnabledx(card, player, target) &&
			lib.filter.targetInRange(card, player, target));
	}
	static filterTarget2(card, player, target) {
		return (lib.filter.targetEnabled2(card, player, target) &&
			lib.filter.targetInRange(card, player, target));
	}
	static notMe(card, player, target) {
		return player != target;
	}
	static isMe(card, player, target) {
		return player == target;
	}
	static attackFrom(card, player, target) {
		return get.distance(player, target, "attack") <= 1;
	}
	static globalFrom(card, player, target) {
		return get.distance(player, target) <= 1;
	}
	static selectCard() {
		return [1, 1];
	}
	static selectTarget(card, player) {
		if (!card) card = get.card();
		if (!player) player = get.player();
		if (card == undefined) return;
		var range, info = get.info(card);
		var select = get.copy(info.selectTarget);
		if (select == undefined) {
			if (info.filterTarget == undefined) return [0, 0];
			range = [1, 1];
		}
		else if (typeof select == "number") range = [select, select];
		else if (get.itemtype(select) == "select") range = select;
		else if (typeof select == "function") range = select(card, player);
		game.checkMod(card, player, range, "selectTarget", player);
		if (info.singleCard && info.filterAddedTarget) return [range[0] * 2, range[1] * 2];
		return range;
	}
	static judge(card, player, target) {
		return target.canAddJudge(card);
	}
	static autoRespondSha() {
		return !this.player.hasSha(true);
	}
	static autoRespondShan() {
		return !this.player.hasShan();
	}
	static wuxieSwap(event) {
		if (event.type == "wuxie") {
			if (ui.wuxie && ui.wuxie.classList.contains("glow")) {
				return true;
			}
			if (ui.tempnowuxie && ui.tempnowuxie.classList.contains("glow") && event.state > 0) {
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
				if (tw.player && tw.player.isUnderControl(true) && !tw.player.hasSkillTag("noautowuxie") &&
					(!tw.targets || tw.targets.length <= 1) && !tw.noai) {
					return true;
				}
			}
		}
	}
}
