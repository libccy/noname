import { lib, game, ui, get, ai, _status } from "../../noname.js";
import characters from "./character.js";
import cards from "./card.js";
import pinyins from "./pinyin.js";
import skills from "./skill.js";
import translates from "./translate.js";
import voices from "./voices.js";
import { characterSort, characterSortTranslate } from "./sort.js";

game.import("character", function () {
	return {
		name: "key",
		character: { ...characters },
		characterSort: {
			key: characterSort,
		},
		characterFilter: {
			key_jojiro(mode) {
				return mode == "chess" || mode == "tafang";
			},
			key_yuu(mode) {
				return mode == "identity" || mode == "doudizhu" || mode == "single" || (mode == "versus" && _status.mode != "standard" && _status.mode != "three");
			},
			key_tomoya(mode) {
				return mode != "chess" && mode != "tafang" && mode != "stone";
			},
			key_sunohara(mode) {
				return mode != "guozhan";
			},
		},
		characterTitle: {
			key_kotomi: "#g落英逐紫裙",
			key_jojiro: "战棋专属角色",
		},
		card: { ...cards },
		skill: { ...skills },
		translate: { ...translates, ...voices, ...characterSortTranslate },
		pinyins: { ...pinyins },
	};
});
