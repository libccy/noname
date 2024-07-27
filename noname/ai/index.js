import { get } from "../get/index.js";
import { lib } from "../library/index.js";
import { Basic } from "./basic.js";

export class AI {
	basic = new Basic();
	get = get;
	/**
	 * @param { any } obj
	 * @param { boolean } [similar] true伪equals, false去除前缀
	 * @returns { string } cacheKey
	 */
	getCacheKey(obj, similar) {
		let str = "";
		if (typeof obj !== "object" || obj === null) {
			if (similar) str = typeof obj + ": ";
			return String(obj);
		}
		if (Array.isArray(obj)) {
			return "[arr: " + obj.map(i => {
				return this.getCacheKey(i);
			}).join(", ") + "]";
		}
		if (obj instanceof lib.element.Card) {
			if (similar !== false) str = "card: ";
			if (obj.cardid) return str + obj.cardid;
			return str + `${obj.name}+${
				obj.suit ? obj.suit : "none"
			}+${
				obj.number === undefined ? "none" : obj.number
			}${
				obj.nature ? "+" + obj.nature : ""
			}`;
		}
		if (obj instanceof lib.element.VCard) {
			if (similar !== false) str = similar ? "card: " : "vcard: ";
			if (obj.cardid) return str + obj.cardid;
			if (!obj.cards.length) return str + `${obj.name}+${
				obj.suit ? obj.suit : (obj.color || "none")
			}+${
				obj.number === undefined ? "none" : obj.number
			}${
				obj.nature ? "+" + obj.nature : ""
			}`;
			if (obj.cards.length === 1) return this.getCacheKey(obj.cards[0], similar);
			return str + "[arr: " + obj.cards.map(i => {
				return this.getCacheKey(i, similar);
			}).join(", ") + "]";
		}
		if (obj instanceof lib.element.Player) { //滥竽充数的
			if (similar !== false) str = "player: ";
			if (obj.playerid) return str + obj.playerid;
			return str + `${obj.name}+${obj.sex}+${obj.group}+${obj.hp}+${obj.maxHp}+${obj.hujia}+${
				"[" + obj.skills.join(", ") + "]"
			}+${obj.name1}+${obj.name2}`;
		}
		return get.translation(obj); //兜底
	}
}

export let ai = new AI();

/**
 * @param { InstanceType<typeof AI> } [instance]
 */
export let setAI = (instance) => {
	ai = instance || new AI();
	if (lib.config.dev) {
		window.nonameAI = ai;
	}
};

export { Basic };
