import { ITEM } from "./global-font/item.js";

export const GLOBAL_FONT = {
	name: "界面字体",
	init: "default",
	unfrequent: true,
	item: ITEM,
	textMenu(node, link) {
		if (link != "default") {
			node.style.fontFamily = link;
		}
		else {
			node.style.fontFamily = `"STHeiti","SimHei","Microsoft JhengHei","Microsoft YaHei","WenQuanYi Micro Hei","Suits",Helvetica,Arial,sans-serif`;
		}
		node.style.fontSize = "20px";
	},
	onclick(font) {
		game.saveConfig("global_font", font);
		lib.init.cssstyles();
	}
};
