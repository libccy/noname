import { status as _status } from "./status";

export class Get {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

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

	/**
	 * @returns {string}
	 */
	static translation(str, arg) {
		if (str && typeof str == "object" && (str.name || str._tempTranslate)) {
			if (str._tempTranslate) return str._tempTranslate;
			var str2;
			if (arg == "viewAs" && str.viewAs) {
				str2 = get.translation(str.viewAs);
			}
			else {
				str2 = get.translation(str.name);
			}
			if (str2 == "杀") {
				str2 = "";
				if (typeof str.nature == "string") {
					let natures = str.nature.split(lib.natureSeparator).sort(lib.sort.nature);
					for (let nature of natures) {
						str2 += lib.translate["nature_" + nature] || lib.translate[nature] || "";
					}
				}
				str2 += "杀";
			}
			if (get.itemtype(str) == "card" || str.isCard) {
				if (_status.cardtag && str.cardid) {
					var tagstr = "";
					for (var i in _status.cardtag) {
						if (_status.cardtag[i].contains(str.cardid)) {
							tagstr += lib.translate[i + "_tag"];
						}
					}
					if (tagstr) {
						str2 += "·" + tagstr;
					}
				}
				if (str.suit && str.number || str.isCard) {
					var cardnum = get.number(str, false) || "";
					if ([1, 11, 12, 13].contains(cardnum)) {
						cardnum = { "1": "A", "11": "J", "12": "Q", "13": "K" }[cardnum]
					}
					if (arg == "viewAs" && str.viewAs != str.name && str.viewAs) {
						str2 += "（" + get.translation(str) + "）";
					}
					else {
						str2 += "【" + get.translation(get.suit(str, false)) + cardnum + "】";
					}
				}
			}
			return str2;
		}
		if (Array.isArray(str)) {
			var str2 = get.translation(str[0], arg);
			for (var i = 1; i < str.length; i++) {
				str2 += "、" + get.translation(str[i], arg);
			}
			return str2;
		}
		if (get.itemtype(str) == "natures") {
			let natures = str.split(lib.natureSeparator).sort(lib.sort.nature);
			var str2 = "";
			for (var nature of natures) {
				str2 += lib.translate["nature_" + nature] || lib.translate[nature] || "";
			}
			return str2;
		}
		if (arg == "skill") {
			if (lib.translate[str + "_ab"]) return lib.translate[str + "_ab"];
			if (lib.translate[str]) return lib.translate[str].slice(0, 2);
			return str;
		}
		else if (arg == "info") {
			if (lib.translate[str + "_info"]) return lib.translate[str + "_info"];
			var str2 = str.slice(0, str.length - 1);
			if (lib.translate[str2 + "_info"]) return lib.translate[str2 + "_info"];
			if (str.lastIndexOf("_") > 0) {
				str2 = str.slice(0, str.lastIndexOf("_"));
				if (lib.translate[str2 + "_info"]) return lib.translate[str2 + "_info"];
			}
			str2 = str.slice(0, str.length - 2);
			if (lib.translate[str2 + "_info"]) return lib.translate[str2 + "_info"];
			if (lib.skill[str] && lib.skill[str].prompt) return lib.skill[str].prompt;
		}
		if (lib.translate[str]) {
			return lib.translate[str];
		}
		if (typeof str == "string") {
			if (lib.translate["nature_" + str]) return lib.translate["nature_" + str];
			return str;
		}
		if (typeof str == "number" || typeof str == "boolean") {
			return str.toString();
		}
		if (str && str.toString) {
			return str.toString();
		}
		return "";
	}
}
