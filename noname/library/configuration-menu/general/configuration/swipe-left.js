import { Game } from "../../../../game.js";
import { Is } from "../../../../get/is.js";
import { SWIPE_ITEM } from "./swipe-item.js";

export const SWIPE_LEFT = {
	name: "左划操作",
	intro: "向左滑动时执行的操作",
	init: "system",
	unfrequent: true,
	item: SWIPE_ITEM,
	onclick(item) {
		if (Is.nomenu("swipe_left", item)) return false;
		Game.saveConfig("swipe_left", item);
	}
};
