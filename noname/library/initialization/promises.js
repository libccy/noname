import { Initialization } from "../initialization.js";

/**
 * 部分函数的Promise版本
 */
export class Promises {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	/**
	 * Promise版的`Initialization.js`
	 * 
	 * @param {string} path - 文件路径
	 * @param {string | string[]} [file] - 文件名或文件名组，忽略则直接读取`path`的内容
	 * @returns {Promise<Event>}
	 */
	js(path, file) {
		return new Promise((resolve, reject) => Initialization.js(path, file, resolve, reject));
	}

	/**
	 * Promise版的`Initialization.css`
	 * 
	 * @param {string} path - 文件路径
	 * @param {string | string[]} [file] - 文件名或文件名组，忽略则直接读取`path`的内容
	 * @param {Element} [before] 新样式dom的位置
	 * @returns {Promise<HTMLLinkElement>}
	 */
	css(path, file, before) {
		return new Promise((resolve, reject) => {
			const style = Initialization.css(path, file, before);
			style.addEventListener("load", () => resolve(style));
			style.addEventListener("error", reject);
		});
	}

	/**
	 * Promise版的`Initialization.req`
	 * 
	 * @param {string} str - 要读取的地址
	 * @param {string} [master]
	 * @returns {Promise<ProgressEvent>}
	 */
	req(str, master) {
		return new Promise((resolve, reject) => Initialization.req(str, resolve, reject, master));
	}

	/**
	 * Promise版的`Initialization.json`
	 * 
	 * @param {string} url - 要读取的地址
	 * @returns {Promise<object>}
	 */
	json(url) {
		return new Promise((resolve, reject) => Initialization.json(url, resolve, reject));
	}

	/**
	 * Promise版的`Initialization.sheet`
	 * 
	 * @returns {Promise<HTMLStyleElement>}
	 */
	sheet() {
		return new Promise((resolve, reject) => {
			const style = Initialization.sheet(...arguments);
			style.addEventListener("load", () => resolve(style));
			style.addEventListener("error", reject);
		});
	}
}