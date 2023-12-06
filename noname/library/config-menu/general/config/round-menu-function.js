import { Game } from "../../../../game.js";
import { Is } from "../../../../get/is.js";
import { ITEM } from "./round-menu-function/item.js";

export const ROUND_MENU_FUNCTION = {
	name: "触屏按钮操作",
	intro: "点击屏幕中圆形按钮时执行的操作",
	init: "system",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		if (Is.nomenu("round_menu_func", item)) return false;
		Game.saveConfig("round_menu_func", item);
	}
};
