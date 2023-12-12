import { ITEM } from "./card-shape/item.js";

export const CARD_SHAPE = {
	name: "手牌显示",
	intro: "将手牌设置为正方形或长方形",
	init: "default",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		var linked = false;
		if (game.me && game.me.isLinked()) {
			linked = true;
		}
		game.saveConfig("cardshape", item);
		if (item == "oblong" && (game.layout == "long" || game.layout == "mobile" || game.layout == "long2" || game.layout == "nova")) {
			ui.arena.classList.add("oblongcard");
			ui.window.classList.add("oblongcard");
		}
		else {
			ui.arena.classList.remove("oblongcard");
			ui.window.classList.remove("oblongcard");
		}
		if (linked) {
			if (get.is.linked2(game.me)) {
				game.me.classList.remove("linked");
				game.me.classList.add("linked2");
			}
			else {
				game.me.classList.add("linked");
				game.me.classList.remove("linked2");
			}
		}
	}
};
