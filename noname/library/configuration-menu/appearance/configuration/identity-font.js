import { ITEM } from "./identity-font/item.js";

export const IDENTITY_FONT = {
	name: "身份字体",
	init: "huangcao",
	unfrequent: true,
	item: ITEM,
	textMenu(node, link) {
		if (link != "default") {
			node.style.fontFamily = link;
		}
		node.style.fontSize = "20px";
	},
	onclick(font) {
		game.saveConfig("identity_font", font);
		lib.init.cssstyles();
	}
};
