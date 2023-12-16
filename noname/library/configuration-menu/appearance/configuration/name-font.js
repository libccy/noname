import { ITEM } from "./name-font/item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';

export const NAME_FONT = {
	name: "人名字体",
	init: "xingkai",
	unfrequent: true,
	item: ITEM,
	textMenu(node, link) {
		if (link != "default") {
			node.style.fontFamily = link;
		}
		node.style.fontSize = "20px";
	},
	onclick(font) {
		game.saveConfig("name_font", font);
		lib.init.cssstyles();
	}
};
