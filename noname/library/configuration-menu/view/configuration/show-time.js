import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const SHOW_TIME = {
	name: "显示时间",
	intro: "在屏幕顶部显示当前时间",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_time", bool);
		if (bool) {
			ui.time.style.display = "";
		}
		else {
			ui.time.style.display = "none";
		}
	}
};
