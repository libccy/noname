import { Game } from "../../../../game.js";
import { Is } from "../../../../get/is.js";
import { SWIPE_ITEM } from "./swipe-item.js";

export const SWIPE_UP = {
	name: "上划操作",
	intro: "向上滑动时执行的操作",
	init: "auto",
	unfrequent: true,
	item: SWIPE_ITEM,
	onclick(item) {
		if (Is.nomenu("swipe_up", item)) return false;
		Game.saveConfig("swipe_up", item);
	}
};
