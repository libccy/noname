import { UI } from "../../../../ui.js";
import { ITEM } from "./player-height-nova/item.js";

export const PLAYER_HEIGHT_NOVA = {
	name: "角色高度",
	init: "short",
	item: ITEM,
	onclick(item) {
		game.saveConfig("player_height_nova", item);
		UI.arena.dataset.player_height_nova = item;
	}
};
