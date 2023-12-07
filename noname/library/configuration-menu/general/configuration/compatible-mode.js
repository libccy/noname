import { Game } from "../../../../game.js";
import { UI } from "../../../../ui.js";

export const COMPATIBLE_MODE = {
	name: "兼容模式",
	init: false,
	intro: "开启兼容模式可防止扩展使游戏卡死并提高对旧扩展的兼容性，但对游戏速度有一定影响，若无不稳定或不兼容的扩展建议关闭",
	onclick(bool) {
		Game.saveConfig("compatiblemode", bool);
		if (bool) {
			UI.window.classList.add("compatiblemode");
		}
		else {
			UI.window.classList.remove("compatiblemode");
		}
	}
};
