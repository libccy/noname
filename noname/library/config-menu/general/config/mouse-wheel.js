import { Game } from "../../../../game.js";
import { UI } from "../../../../ui.js";
import { Click } from "../../../../ui/click.js";
import { config } from "../../../config.js";

export const MOUSE_WHEEL = {
	name: "滚轮控制手牌",
	init: true,
	unfrequent: true,
	intro: "开启后滚轮可使手牌横向滚动，在mac等可横向滚动的设备上建议关闭",
	onclick(bool) {
		Game.saveConfig("mousewheel", bool);
		if (config.touchscreen) return;
		if (config.mousewheel) {
			UI.handcards1Container.onmousewheel = Click.mousewheel;
			UI.handcards2Container.onmousewheel = Click.mousewheel;
		}
		else {
			UI.handcards1Container.onmousewheel = null;
			UI.handcards2Container.onmousewheel = null;
		}
	}
};
