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
 * @param {importCharacterConfig} character
 */
export function loadCharacter(character) {
	let name = character.name;

	if (character.character) {
		const characterPack = lib.characterPack[name];
		if (characterPack) {
			Object.assign(characterPack, character.character);
		} else {
			lib.characterPack[name] = character.character;
		}
	}

	// 摆了
	for (let key in character) {
		let value = character[key];

		switch (key) {
			case "name":
			case "mode":
			case "forbid":
				break;
			case "connect":
				// @ts-ignore
				lib.connectCharacterPack.push(name);
				break;
			case "character":
				if (!lib.config.characters.includes(name) && lib.config.mode !== "connect") {
					if (lib.config.mode === "chess" && get.config("chess_mode") === "leader" && get.config("chess_leader_allcharacter")) {
						for (let charaName in value) {
							// @ts-ignore
							lib.hiddenCharacters.push(charaName);
						}
					} else if (lib.config.mode !== "boss" || name !== "boss") {
						break;
					}
				}
			// [falls through]
			default:
				if (Array.isArray(lib[key]) && Array.isArray(value)) {
					lib[key].addArray(value);
					break;
				}

				for (let key2 in value) {
					let value2 = value[key2];

					if (key === "character") {
						if (lib.config.forbidai_user && lib.config.forbidai_user.includes(key2)) {
							lib.config.forbidai.add(key2);
						}
						if (Array.isArray(value2)) {
							if (!value2[4]) {
								value2[4] = [];
							}
							if (value2[4].includes("boss") || value2[4].includes("hiddenboss")) {
								lib.config.forbidai.add(key2);
							}
							for (let skill of value2[3]) {
								lib.skilllist.add(skill);
							}
						} else {
							if (value2.isBoss || value2.isHiddenBoss) {
								lib.config.forbidai.add(key2);
							}
							if (value2.skills) {
								for (let skill of value2.skills) {
									lib.skilllist.add(skill);
								}
							}
						}
					}

					if (key === "skill" && key2[0] === "_" && (lib.config.mode !== "connect" ? !lib.config.characters.includes(name) : !character.connect)) {
						continue;
					}

					if (key === "translate" && key2 === name) {
						lib[key][`${key2}_character_config`] = value2;
					} else {
						if (lib[key][key2] == null) {
							if (key === "skill" && !value2.forceLoad && lib.config.mode === "connect" && !character.connect) {
								lib[key][key2] = {
									nopop: value2.nopop,
									derivation: value2.derivation,
								};
							} else if (key === "character") {
								lib.character[key2] = value2;
							} else {
								// @ts-ignore
								Object.defineProperty(lib[key], key2, Object.getOwnPropertyDescriptor(character[key], key2));
							}
							if (key === "card" && lib[key][key2].derivation) {
								// @ts-ignore
								if (!lib.cardPack.mode_derivation) {
									// @ts-ignore
									lib.cardPack.mode_derivation = [key2];
								} else {
									// @ts-ignore
									lib.cardPack.mode_derivation.push(key2);
								}
							}
						} else if (Array.isArray(lib[key][key2]) && Array.isArray(value2)) {
							lib[key][key2].addArray(value2);
						} else {
							console.log(`duplicated ${key} in character ${name}:\n${key2}:\nlib.${key}.${key2}`, lib[key][key2], `\ncharacter.${name}.${key}.${key2}`, value2);
						}
					}
				}
				break;
		}
	}
}

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
