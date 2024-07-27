import { get } from "../get/index.js";
import { lib } from "../library/index.js";
import { Basic } from "./basic.js";

export class AI {
	basic = new Basic();
	get = get;
	/**
	 * @param { any } obj
	 * @param { boolean } [similar] true伪equals, false统一前缀
	 * @returns { string } cacheKey
	 */
	getCacheKey(obj, similar) {
		let str = "";
		if (typeof obj !== "object" || obj === null) {
			if (similar) str = "[" + typeof obj + ":";
			return String(obj);
		}
		if (Array.isArray(obj)) {
			return "[array:[" + obj.map(i => {
				return this.getCacheKey(i);
			}).join("-") + "]]";
		}
		if (typeof obj.getCacheKey === "function") {
			return obj.getCacheKey(similar);
		}
		try {
			return JSON.stringify(obj);
		} catch (error) {
			return get.translation(obj);
		}
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
