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
 * 此函数仅用于读取一个“数据库”形式的数据：即无论如何，`localStorage`存的必然是对象
 *
 * @param {string} name - 要读取数据的`key`
 * @param {string} type - `indexedDB`所使用的`storeName`和`localStorage`的`key`，当`type`为`"data"`时仅用于`indexedDB`
 * @param {boolean} [reinitLocalStorage=true] - 是否在用`localStorage`读取失败时将对应键的值初始化为空对象
 * @param {any} [reinitIndexedDB=undefined] - 是否在用`indexedDB`读取失败时将对应键的值初始化；若给定值，则初始化为给定的值
 * @return {Promise<any>}
 */
export function load(name, type, reinitLocalStorage = true, reinitIndexedDB = undefined) {
	if (lib.db) {
		let result = game.getDB(type, name);

		if (typeof reinitIndexedDB != "undefined") {
			result = result.catch(() => game.putDB(type, name, reinitIndexedDB).then(() => reinitIndexedDB));
		}

		return result;
	} else {
		let config;
		try {
			let json = localStorage.getItem(`${lib.configprefix}${type === "data" ? name : type}`);
			if (!json) jumpToCatchBlock();
			config = JSON.parse(json);
			if (typeof config != "object" || config == null) jumpToCatchBlock();
		} catch (err) {
			config = {};
			if (reinitLocalStorage) localStorage.setItem(`${lib.configprefix}${name}`, "{}");
		}
		return Promise.resolve(type === "data" ? config : config[name]);
	}
}
