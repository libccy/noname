import { ITEM } from "./glow-phase/item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';

export const GLOW_PHASE = {
	name: "当前回合角色高亮",
	unfrequent: true,
	init: "yellow",
	intro: "设置当前回合角色的边框颜色",
	item: ITEM,
	onclick(bool) {
		game.saveConfig("glow_phase", bool);
		lib.init.cssstyles();
	}
};
