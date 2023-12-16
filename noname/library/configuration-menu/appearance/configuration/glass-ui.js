import { Game as game } from '../../../../game.js';
import { UI as ui } from '../../../../ui.js';
export const GLASS_UI = {
	name: "玻璃主题",
	intro: "为游戏主题打开玻璃效果（手机暂不支持）",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("glass_ui", bool);
		if (bool) {
			ui.window.classList.add("glass_ui");
		}
		else {
			ui.window.classList.remove("glass_ui");
		}
	}
};
