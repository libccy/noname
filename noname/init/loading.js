/**
 * 从读取的内容中获取数据
 */

import { ai, setAI } from "../ai/index.js";
import { get, setGet } from "../get/index.js";
import { lib, Library, setLibrary } from "../library/index.js";
import { game, setGame } from "../game/index.js";
import { _status } from "../status/index.js";
import { setUI, ui } from "../ui/index.js";
import { gnc } from "../gnc/index.js";
import { importMode } from "./import.js";
import { Mutex } from "../util/mutex.js";
import { load } from "../util/config.js";

/**
 * @param {importModeConfig} mode
 */
export function loadMode(mode) {
	modeMixinLibrary(mode, lib);
	modeMixinGeneral(mode, "game", game);
	modeMixinGeneral(mode, "ui", ui);
	modeMixinGeneral(mode, "get", get);
	modeMixinGeneral(mode, "ai", ai);

	// @ts-ignore
	delete window.noname_character_rank;

	["onwash", "onover"].forEach(name => {
		if (game[name]) {
			lib[name]?.push(game[name]);
			delete game[name];
		}
	});

	if (typeof mode.init == "function") {
		mode.init();
	}
}

/**
 * @template {Object} T
 * @param {importModeConfig} mode
 * @param {string} name
 * @param {T} where
 * @return {void}
 */
function modeMixinGeneral(mode, name, where) {
	if (mode[name]) {
		for (let key in mode[name]) {
			let value = mode[name][key];
			where[key] = typeof value == "object" ? Object.assign(where[key] ?? {}, value) : value;
		}
	}
}

/**
 *
 * @param {importModeConfig} mode
 * @param {Library} lib
 * @return {void}
 */
function modeMixinLibrary(mode, lib) {
	const KeptWords = ["name", "element", "game", "ai", "ui", "get", "config", "onreinit", "start", "startBefore"];

	// @ts-ignore
	lib.element = modeMixinElement(mode, lib.element);
	// @ts-ignore
	lib.banned = lib.config[`${lib.config.mode}_banned`] || [];
	// @ts-ignore
	lib.bannedcards = lib.config[`${lib.config.mode}_bannedcards`] || [];
	// @ts-ignore
	lib.rank = window.noname_character_rank;

	for (let name in mode) {
		if (KeptWords.includes(name)) continue;
		if (lib[name] == null) lib[name] = Array.isArray(mode[name]) ? [] : {};

		Object.assign(lib[name], mode[name]);
	}

	// 为了模式扩展，两个东西删不了
	// @ts-ignore
	lib.init.start = mode.start;
	// @ts-ignore
	lib.init.startBefore = mode.startBefore;
}

/**
 *
 * @param {importModeConfig} mode
 * @param {Record<string, Object>} element
 * @return {Record<string, Object>}
 */
function modeMixinElement(mode, element) {
	let newElement = { ...element };

	if (mode.element) {
		for (let name in mode.element) {
			if (!newElement[name]) newElement[name] = [];

			let source = mode.element[name];
			let target = newElement[name];

			for (let key in source) {
				if (key === "init") {
					if (!target.inits) target.inits = [];
					target.inits.push(source[key]);
				} else {
					target[key] = source[key];
				}
			}
		}
	}

	return newElement;
}
