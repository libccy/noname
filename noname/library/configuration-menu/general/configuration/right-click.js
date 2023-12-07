import { Game } from "../../../../game.js";
import { Is } from "../../../../get/is.js";
import { ITEM } from "./right-click/item.js";

export const RIGHT_CLICK = {
	name: "右键操作",
	init: "pause",
	intro: "在空白区域点击右键时的操作",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		if (Is.nomenu("right_click", item)) return false;
		Game.saveConfig("right_click", item);
	}
};
