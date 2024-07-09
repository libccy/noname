import { game } from "../game/index.js";
import { lib } from "../library/index.js";
import { jumpToCatchBlock } from "./index.js";

/**
 * @param {string} name
 * @returns {any}
 */
export function get(name) {
	const config = Reflect.get(lib, "config");
	if (!config) return null;
	return Reflect.get(config, name);
}

/**
 * @param {string} name
 * @param {any} value
 * @returns {void}
 */
export function set(name, value) {
	const config = Reflect.get(lib, "config");
	if (!config) return;
	Reflect.set(config, name, value);
}

/**
 * @param {string} name
 * @returns {boolean}
 */
export function has(name) {
	const config = Reflect.get(lib, "config");
	if (!config) return false;
	return Reflect.has(config, name);
}

/**
 * 从数据库中读取数据，根据目前可用情况自动选择相应地数据库
 *
 * @param {string} name - 要读取数据的`key`
 * @param {string} type - `indexedDB`所使用的`storeName`
 * @param {boolean} [reinitLocalStorage=true] - 是否在用`localStorage`读取失败时将对应键的值初始化为空对象
 * @param {boolean} [reinitIndexedDB=false] - 是否在用`indexedDB`读取失败时将对应键的值初始化为空对象
 * @return {Promise<any>}
 */
export function load(name, type, reinitLocalStorage = true, reinitIndexedDB = false) {
	if (lib.db) {
		let result = game.getDB(type, name);

		if (reinitIndexedDB) {
			result = result.catch(() => game.putDB(type, name, {}).then(() => ({})));
		}

		return result;
	} else {
		let config;
		try {
			let json = localStorage.getItem(`${lib.configprefix}${name}`);
			if (!json) jumpToCatchBlock();
			config = JSON.parse(json);
			if (typeof config != "object" || config == null) jumpToCatchBlock();
		} catch (err) {
			config = {};
			if (reinitLocalStorage) localStorage.setItem(`${lib.configprefix}${name}`, "{}");
		}
		return Promise.resolve(config);
	}
}
