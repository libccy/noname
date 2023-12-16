import { Game as game } from '../../../../game.js';
import { UI as ui } from '../../../../ui.js';
export const BLUR_UI = {
	name: "模糊效果",
	intro: "在暂停或打开菜单时开启模糊效果",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("blur_ui", bool);
		if (bool) {
			ui.window.classList.add("blur_ui");
		}
		else {
			ui.window.classList.remove("blur_ui");
		}
	}
};
