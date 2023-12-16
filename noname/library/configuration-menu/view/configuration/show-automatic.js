import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const SHOW_AUTOMATIC = {
	name: "显示托管按钮",
	init: true,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_auto", bool);
		if (lib.config.show_auto) {
			ui.auto.style.display = "";
		}
		else {
			ui.auto.style.display = "none";
		}
	}
};
