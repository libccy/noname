import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const SHOW_SORT_CARD = {
	name: "显示整理手牌按钮",
	init: true,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_sortcard", bool);
		if (lib.config.show_sortcard) {
			ui.sortCard.style.display = "";
		}
		else {
			ui.sortCard.style.display = "none";
		}
	}
};
