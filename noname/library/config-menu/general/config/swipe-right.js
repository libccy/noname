import { Game } from "../../../../game.js";
import { Is } from "../../../../get/is.js";
import { SWIPE_ITEM } from "./swipe-item.js";

export const SWIPE_RIGHT = {
	name: "右划操作",
	intro: "向右滑动时执行的操作",
	init: "system",
	unfrequent: true,
	item: SWIPE_ITEM,
	onclick(item) {
		if (Is.nomenu("swipe_right", item)) return false;
		Game.saveConfig("swipe_right", item);
	}
};
