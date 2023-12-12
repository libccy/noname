export class Is {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}
	/**
	 * 判断是否为进攻坐骑
	 * @param {Card | VCard} card
	 * @param {false | Player} [player]
	 * @returns {boolean}
	 */
	static attackingMount(card, player) {
		const subtype = get.subtype(card, player);
		if (subtype == "equip4") return true;
		else if (subtype == "equip6") {
			const info = get.info(card, player), distance = info.distance;
			if (!distance) return false;
			if (distance.globalFrom && !info.notMount) return true;
		}
		return false;
	}
	/**
	 * 判断是否为防御坐骑
	 * @param {Card | VCard} card
	 * @param {false | Player} [player]
	 * @returns {boolean}
	 */
	static defendingMount(card, player) {
		const subtype = get.subtype(card, player);
		if (subtype == "equip3") return true;
		else if (subtype == "equip6") {
			const info = get.info(card, player), distance = info.distance;
			if (!distance) return false;
			if (distance.globalTo && !info.notMount) return true;
		}
		return false;
	}
	/**
	 * 判断坐骑栏是否被合并
	 */
	static mountCombined() {
		if (lib.configOL) {
			return lib.configOL.mount_combine;
		}
		else if (typeof _status.mountCombined != "boolean") {
			_status.mountCombined = lib.config.mount_combine;
		}
		return _status.mountCombined;
	}
	/**
	 * 判断传入的参数的属性是否相同（参数可以为卡牌、卡牌信息、属性等）
	 * @param {...} infos 要判断的属性列表
	 * @param {boolean} every 是否判断每一个传入的属性是否完全相同而不是存在部分相同
	 */
	static sameNature() {
		let processedArguments = [], every = false;
		Array.from(arguments).forEach(argument => {
			if (typeof argument == "boolean") every = argument;
			else if (argument) processedArguments.push(argument);
		});
		if (!processedArguments.length) return true;
		if (processedArguments.length == 1) {
			const argument = processedArguments[0];
			if (!Array.isArray(argument)) return false;
			if (!argument.length) return true;
			if (argument.length == 1) return false;
			processedArguments = argument;
		}
		const naturesList = processedArguments.map(card => {
			if (typeof card == "string") return card.split(lib.natureSeparator);
			else if (Array.isArray(card)) return card;
			return get.natureList(card || {});
		});
		const testingNaturesList = naturesList.slice(0, naturesList.length - 1);
		if (every) return testingNaturesList.every((natures, index) => naturesList.slice(index + 1).every(testingNatures => testingNatures.length == natures.length && testingNatures.every(nature => natures.includes(nature))));
		return testingNaturesList.every((natures, index) => {
			const comparingNaturesList = naturesList.slice(index + 1);
			if (natures.length) return natures.some(nature => comparingNaturesList.every(testingNatures => testingNatures.includes(nature)));
			return comparingNaturesList.every(testingNatures => !testingNatures.length);
		});
	}
	/**
	 * 判断传入的参数的属性是否不同（参数可以为卡牌、卡牌信息、属性等）
	 * @param ...infos 要判断的属性列表 
	 * @param every {boolean} 是否判断每一个传入的属性是否完全不同而不是存在部分不同
	 */
	static differentNature() {
		let processedArguments = [], every = false;
		Array.from(arguments).forEach(argument => {
			if (typeof argument == "boolean") every = argument;
			else if (argument) processedArguments.push(argument);
		});
		if (!processedArguments.length) return false;
		if (processedArguments.length == 1) {
			const argument = processedArguments[0];
			if (!Array.isArray(argument)) return true;
			if (!argument.length) return false;
			if (argument.length == 1) return true;
			processedArguments = argument;
		}
		const naturesList = processedArguments.map(card => {
			if (typeof card == "string") return card.split(lib.natureSeparator);
			else if (Array.isArray(card)) return card;
			return get.natureList(card || {});
		});
		const testingNaturesList = naturesList.slice(0, naturesList.length - 1);
		if (every) return testingNaturesList.every((natures, index) => naturesList.slice(index + 1).every(testingNatures => testingNatures.every(nature => !natures.includes(nature))));
		return testingNaturesList.every((natures, index) => {
			const comparingNaturesList = naturesList.slice(index + 1);
			if (natures.length) return natures.some(nature => comparingNaturesList.every(testingNatures => !testingNatures.length || testingNatures.some(testingNature => testingNature != nature)));
			return comparingNaturesList.every(testingNatures => testingNatures.length);
		});
	}
	/**
	 * 判断一张牌是否为明置手牌
	 */
	static shownCard(card) {
		if (!card) return false;
		const gaintag = card.gaintag;
		return Array.isArray(gaintag) && gaintag.some(tag => tag.startsWith("visible_"));
	}
	/**
	 * 是否是虚拟牌
	 */
	static vituralCard(card) {
		return card.isCard || (!("cards" in card) || !Array.isArray(card.cards) || card.cards.length == 0);
	}
	/**
	 * 是否是转化牌
	 */
	static convertedCard(card) {
		return !card.isCard && ("cards" in card) && Array.isArray(card.cards) && card.cards.length > 0;
	}
	/**
	 * 是否是实体牌
	 */
	static ordinaryCard(card) {
		return card.isCard && ("cards" in card) && Array.isArray(card.cards) && card.cards.length == 1;
	}
	/**
	 * 押韵判断
	 */
	static yayun(str1, str2) {
		if (str1 == str2) return true;
		var pinyin1 = get.pinyin(str1, false), pinyin2 = get.pinyin(str2, false);
		if (!pinyin1.length || !pinyin2.length) return false;
		var pron1 = pinyin1[pinyin1.length - 1], pron2 = pinyin2[pinyin2.length - 1];
		if (pron1 == pron2) return true;
		return get.yunjiao(pron1) == get.yunjiao(pron2);
	}
	static blocked(skill, player) {
		if (!player.storage.skill_blocker || !player.storage.skill_blocker.length) return false;
		for (var i of player.storage.skill_blocker) {
			if (lib.skill[i] && lib.skill[i].skillBlocker && lib.skill[i].skillBlocker(skill, player)) return true;
		}
		return false;
	}
	static double(name, array) {
		const extraInformations = get.character(name, 4);
		if (!extraInformations) return false;
		for (const extraInformation of extraInformations) {
			if (!extraInformation.startsWith("doublegroup:")) continue;
			return array ? extraInformation.split(":").slice(1) : true;
		}
		return false;
	}

	/**
	 * Check if the card has a Yingbian condition
	 * 
	 * 检测此牌是否具有应变条件
	 */
	static yingbianConditional(card) {
		return get.is.complexlyYingbianConditional(card) || get.is.simplyYingbianConditional(card);
	}
	static complexlyYingbianConditional(card) {
		for (const key of lib.yingbian.condition.complex.keys()) {
			if (get.cardtag(card, `yingbian_${key}`)) return true;
		}
		return false;
	}
	static simplyYingbianConditional(card) {
		for (const key of lib.yingbian.condition.simple.keys()) {
			if (get.cardtag(card, `yingbian_${key}`)) return true;
		}
		return false;
	}

	/**
	 * Check if the card has a Yingbian effect
	 * 
	 * 检测此牌是否具有应变效果
	 */
	static yingbianEffective(card) {
		for (const key of lib.yingbian.effect.keys()) {
			if (get.cardtag(card, `yingbian_${key}`)) return true;
		}
		return false;
	}
	static yingbian(card) {
		return get.is.yingbianConditional(card) || get.is.yingbianEffective(card);
	}
	static emoji(substring) {
		if (substring) {
			var reg = new RegExp("[~#^$@%&!?%*]", "g");
			if (substring.match(reg)) {
				return true;
			}
			for (var i = 0; i < substring.length; i++) {
				var hs = substring.charCodeAt(i);
				if (0xd800 <= hs && hs <= 0xdbff) {
					if (substring.length > 1) {
						var ls = substring.charCodeAt(i + 1);
						var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
						if (0x1d000 <= uc && uc <= 0x1f77f) {
							return true;
						}
					}
				}
				else if (substring.length > 1) {
					var ls = substring.charCodeAt(i + 1);
					if (ls == 0x20e3) {
						return true;
					}
				}
				else {
					if (0x2100 <= hs && hs <= 0x27ff) {
						return true;
					}
					else if (0x2B05 <= hs && hs <= 0x2b07) {
						return true;
					}
					else if (0x2934 <= hs && hs <= 0x2935) {
						return true;
					}
					else if (0x3297 <= hs && hs <= 0x3299) {
						return true;
					}
					else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
						|| hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
						|| hs == 0x2b50) {
						return true;
					}
				}
			}
		}
		return false;
	}
	static banWords(str) {
		return get.is.emoji(str) || window.bannedKeyWords.some(item => str.includes(item));
	}
	static converted(event) {
		return !(event.card && event.card.isCard);
	}
	static safari() {
		return userAgent.indexOf("safari" != -1) && userAgent.indexOf("chrome") == -1;
	}
	static freePosition(cards) {
		return !cards.some(card => !card.hasPosition || card.hasPosition());
	}
	static nomenu(name, item) {
		var menus = ["system", "menu"];
		var configs = {
			show_round_menu: lib.config.show_round_menu,
			round_menu_func: lib.config.round_menu_func,
			touchscreen: lib.config.touchscreen,
			swipe_up: lib.config.swipe_up,
			swipe_down: lib.config.swipe_down,
			swipe_left: lib.config.swipe_left,
			swipe_right: lib.config.swipe_right,
			right_click: lib.config.right_click,
			phonelayout: lib.config.phonelayout
		};
		configs[name] = item;
		if (!configs.phonelayout) return false;
		if (configs.show_round_menu && menus.contains(configs.round_menu_func)) {
			return false;
		}
		if (configs.touchscreen) {
			if (menus.contains(configs.swipe_up)) return false;
			if (menus.contains(configs.swipe_down)) return false;
			if (menus.contains(configs.swipe_left)) return false;
			if (menus.contains(configs.swipe_right)) return false;
		}
		else {
			if (configs.right_click == "config") return false;
		}
		if (name) {
			setTimeout(function () {
				alert("请将至少一个操作绑定为显示按钮或打开菜单，否则将永远无法打开菜单");
			});
		}
		return true;
	}
	static altered() {
		return false;
	}
	static node(obj) {
		var str = Object.prototype.toString.call(obj);
		if (str && str.indexOf("[object HTML")) return true;
		return false;
	}
	static div(obj) {
		return Object.prototype.toString.call(obj) === "[object HTMLDivElement]";
	}
	static map(obj) {
		return Object.prototype.toString.call(obj) === "[object Map]";
	}
	static set(obj) {
		return Object.prototype.toString.call(obj) === "[object Set]";
	}
	static object(obj) {
		return Object.prototype.toString.call(obj) === "[object Object]";
	}
	static singleSelect(func) {
		if (typeof func == "function") return false;
		var select = get.select(func);
		return select[0] == 1 && select[1] == 1;
	}
	static jun(name) {
		if (get.mode() == "guozhan") {
			if (name && typeof name == "object") {
				if (name.isUnseen && name.isUnseen(0)) return false;
				name = name.name1;
			}
			if (typeof name == "string" && name.startsWith("gz_jun_")) {
				return true;
			}
		}
		return false;
	}
	static versus() {
		return !_status.connectMode && get.mode() == "versus" && _status.mode == "three";
	}
	static changban() {
		return get.mode() == "single" && _status.mode == "changban";
	}
	static single() {
		return get.mode() == "single" && _status.mode == "normal";
	}
	static mobileMe(player) {
		return (game.layout == "mobile" || game.layout == "long") && !game.chess && player.dataset.position == 0;
	}
	static newLayout() {
		return game.layout != "default";
	}
	static phoneLayout() {
		if (!lib.config.phonelayout) return false;
		return (game.layout == "mobile" || game.layout == "long" || game.layout == "long2" || game.layout == "nova");
	}
	static singleHandcard() {
		return game.singleHandcard || game.layout == "mobile" || game.layout == "long" || game.layout == "long2" || game.layout == "nova";
	}
	static linked2(player) {
		if (game.chess) return true;
		if (lib.config.link_style2 != "rotate") return true;
		// if(game.chess) return false;
		if (game.layout == "long" || game.layout == "long2" || game.layout == "nova") return true;
		if (player.dataset.position == "0") {
			return ui.arena.classList.contains("oblongcard");
		}
		return false;
	}
	static empty(obj) {
		return Object.keys(obj).length == 0;
	}
	static pos(str) {
		return str == "h" || str == "e" || str == "j" || str == "he" || str == "hj" || str == "ej" || str == "hej";
	}
	static locked(skill, player) {
		var info = lib.skill[skill];
		if (typeof info.locked == "function") return info.locked(skill, player);
		if (info.locked == false) return false;
		if (info.trigger && info.forced) return true;
		if (info.mod) return true;
		if (info.locked) return true;
		return false;
	}
}
