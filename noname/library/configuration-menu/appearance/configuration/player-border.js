import { ITEM } from "./player-border/item.js";

export const PLAYER_BORDER = {
	name: "边框宽度",
	init: "normal",
	intro: "设置角色的边框宽度",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		game.saveConfig("player_border", item);
		if (item != "wide" || game.layout == "long" || game.layout == "long2") {
			ui.arena.classList.add("slim_player");
		}
		else {
			ui.arena.classList.remove("slim_player");
		}
		if (item == "slim") {
			ui.arena.classList.add("uslim_player");
		}
		else {
			ui.arena.classList.remove("uslim_player");
		}
		if (item == "narrow") {
			ui.arena.classList.add("mslim_player");
		}
		else {
			ui.arena.classList.remove("mslim_player");
		}
		if (item == "normal" && lib.config.mode != "brawl" && (game.layout == "long" || game.layout == "long2")) {
			ui.arena.classList.add("lslim_player");
		}
		else {
			ui.arena.classList.remove("lslim_player");
		}
		ui.window.dataset.player_border = item;
	}
};
