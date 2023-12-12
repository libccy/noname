import { ITEM } from "./name-font/item.js";

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
