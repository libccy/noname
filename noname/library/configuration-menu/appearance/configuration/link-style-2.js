import { ITEM } from "./link-style-2/item.js";

export const LINK_STYLE_2 = {
	name: "横置样式",
	intro: "设置角色被横置时的样式",
	init: "chain",
	unfrequent: true,
	item: ITEM,
	onclick(style) {
		var list = [];
		for (var i = 0; i < game.players.length; i++) {
			if (game.players[i].isLinked()) {
				list.push(game.players[i]);
			}
		}
		game.saveConfig("link_style2", style);
		for (var i = 0; i < list.length; i++) {
			if (get.is.linked2(list[i])) {
				list[i].classList.add("linked2");
				list[i].classList.remove("linked");
			}
			else {
				list[i].classList.add("linked");
				list[i].classList.remove("linked2");
			}
		}
		if (style == "chain") {
			ui.arena.classList.remove("nolink");
		}
		else {
			ui.arena.classList.add("nolink");
		}
		ui.updatem();
	}
};
