import { Game } from "../../../../game.js";
import { Is } from "../../../../get/is.js";
import { SWIPE_ITEM } from "./swipe-item.js";

export const SWIPE_DOWN = {
	name: "下划操作",
	init: "menu",
	unfrequent: true,
	intro: "向下滑动时执行的操作",
	item: SWIPE_ITEM,
	onclick(item) {
		if (Is.nomenu("swipe_down", item)) return false;
		Game.saveConfig("swipe_down", item);
	}
};
