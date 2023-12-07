import { Game } from "../../../../game.js";
import { Is } from "../../../../get/is.js";

export const TOUCHSCREEN = {
	name: "触屏模式",
	init: false,
	restart: true,
	unfrequent: true,
	intro: "开启后可使触屏设备反应更快，但无法使用鼠标操作",
	onclick(bool) {
		if (Is.nomenu("touchscreen", bool)) return false;
		Game.saveConfig("touchscreen", bool);
	}
};
