import { ITEM } from "./radius-size/item.js";
import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';

export const RADIUS_SIZE = {
	name: "圆角大小",
	init: "default",
	item: ITEM,
	unfrequent: true,
	onclick(item) {
		game.saveConfig("radius_size", item);
		ui.window.dataset.radius_size = item;
	}
};
