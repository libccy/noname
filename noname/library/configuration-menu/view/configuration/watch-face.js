import { ITEM } from "./watch-face/item.js";
import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const WATCH_FACE = {
	name: "表盘样式",
	init: "none",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		game.saveConfig("watchface", item);
		ui.roundmenu.dataset.watchface = item;
	}
};
