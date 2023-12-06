import { Library } from "./library.js";
import { status } from "./status.js";

export class Get {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	/**
	 * @template T
	 * @overload
	 * @param {T} key
	 * @returns {typeof status.event[T]}
	 */
	/**
	 * @overload
	 * @returns {typeof status.event}
	 */
	static event(key) {
		return key ? status.event[key] : status.event;
	}

	/**
	 * @returns {string}
	 */
	static translation(str, arg) {
		if (str && typeof str == "object" && (str.name || str._tempTranslate)) {
			if (str._tempTranslate) return str._tempTranslate;
			var str2;
			if (arg == "viewAs" && str.viewAs) {
				str2 = this.translation(str.viewAs);
			}
			else {
				str2 = this.translation(str.name);
			}
			if (str2 == "杀") {
				str2 = "";
				if (typeof str.nature == "string") {
					let natures = str.nature.split(Library.natureSeparator).sort(Library.sort.nature);
					for (let nature of natures) {
						str2 += Library.translate["nature_" + nature] || Library.translate[nature] || "";
					}
				}
				str2 += "杀";
			}
			if (this.itemtype(str) == "card" || str.isCard) {
				if (status.cardtag && str.cardid) {
					var tagstr = "";
					for (var i in status.cardtag) {
						if (status.cardtag[i].contains(str.cardid)) {
							tagstr += Library.translate[i + "_tag"];
						}
					}
					if (tagstr) {
						str2 += "·" + tagstr;
					}
				}
				if (str.suit && str.number || str.isCard) {
					var cardnum = this.number(str, false) || "";
					if ([1, 11, 12, 13].contains(cardnum)) {
						cardnum = { "1": "A", "11": "J", "12": "Q", "13": "K" }[cardnum]
					}
					if (arg == "viewAs" && str.viewAs != str.name && str.viewAs) {
						str2 += "（" + this.translation(str) + "）";
					}
					else {
						str2 += "【" + this.translation(this.suit(str, false)) + cardnum + "】";
					}
				}
			}
			return str2;
		}
		if (Array.isArray(str)) {
			var str2 = this.translation(str[0], arg);
			for (var i = 1; i < str.length; i++) {
				str2 += "、" + this.translation(str[i], arg);
			}
			return str2;
		}
		if (this.itemtype(str) == "natures") {
			let natures = str.split(Library.natureSeparator).sort(Library.sort.nature);
			var str2 = "";
			for (var nature of natures) {
				str2 += Library.translate["nature_" + nature] || Library.translate[nature] || "";
			}
			return str2;
		}
		if (arg == "skill") {
			if (Library.translate[str + "_ab"]) return Library.translate[str + "_ab"];
			if (Library.translate[str]) return Library.translate[str].slice(0, 2);
			return str;
		}
		else if (arg == "info") {
			if (Library.translate[str + "_info"]) return Library.translate[str + "_info"];
			var str2 = str.slice(0, str.length - 1);
			if (Library.translate[str2 + "_info"]) return Library.translate[str2 + "_info"];
			if (str.lastIndexOf("_") > 0) {
				str2 = str.slice(0, str.lastIndexOf("_"));
				if (Library.translate[str2 + "_info"]) return Library.translate[str2 + "_info"];
			}
			str2 = str.slice(0, str.length - 2);
			if (Library.translate[str2 + "_info"]) return Library.translate[str2 + "_info"];
			if (Library.skill[str] && Library.skill[str].prompt) return Library.skill[str].prompt;
		}
		if (Library.translate[str]) {
			return Library.translate[str];
		}
		if (typeof str == "string") {
			if (Library.translate["nature_" + str]) return Library.translate["nature_" + str];
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
