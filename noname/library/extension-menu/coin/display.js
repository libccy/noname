import { ITEM } from "./display/item.js";

export const DISPLAY = {
	name: "金币显示",
	init: "text",
	item: ITEM,
	onclick(item) {
		game.saveConfig("coin_display_playpackconfig", item);
		if (game.changeCoin) game.changeCoin(0);
	}
};
