import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const SHOW_WUXIE = {
	name: "显示无懈按钮",
	intro: "在右上角显示不询问无懈",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_wuxie", bool);
		if (lib.config.show_wuxie) {
			ui.wuxie.style.display = "";
		}
		else {
			ui.wuxie.style.display = "none";
		}
	}
};
