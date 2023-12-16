import { ITEM } from "./display/item.js";
import { Game as game } from '../../../game.js';
import { status as _status } from '../../../status.js';
export const DISPLAY = {
	name: "金币显示",
	init: "text",
	item: ITEM,
	onclick(item) {
		game.saveConfig("coin_display_playpackconfig", item);
		if (game.changeCoin) game.changeCoin(0);
	}
};
