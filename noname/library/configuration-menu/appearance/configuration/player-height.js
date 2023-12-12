import { Game } from "../../../../game.js";
import { UI } from "../../../../ui.js";
import { PLAYER_HEIGHT_ITEM } from "./player-height-item.js";

export const PLAYER_HEIGHT = {
	name: "角色高度",
	init: "long",
	item: PLAYER_HEIGHT_ITEM,
	onclick(item) {
		Game.saveConfig("player_height", item);
		UI.arena.dataset.player_height = item;
	}
};
