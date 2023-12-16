import { ITEM } from "./show-history/item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';

export const SHOW_HISTORY = {
	name: "出牌记录栏",
	init: "off",
	intro: "在屏幕左侧或右侧显示出牌记录",
	unfrequent: true,
	item: ITEM,
	onclick(bool) {
		if (lib.config.show_history == "right") ui.window.animate("rightbar2");
		game.saveConfig("show_history", bool);
		if (_status.video || !_status.prepareArena) return;
		if (bool == "left") {
			ui.window.classList.add("leftbar");
			ui.window.classList.remove("rightbar");
		}
		else if (bool == "right") {
			ui.window.classList.remove("leftbar");
			ui.window.classList.add("rightbar");
		}
		else {
			ui.window.classList.remove("leftbar");
			ui.window.classList.remove("rightbar");
		}
	}
};
