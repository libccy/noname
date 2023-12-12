import { ITEM } from "./cursor-style/item.js";

export const CURSOR_STYLE = {
	name: "鼠标指针",
	init: "auto",
	intro: "设置为固定后鼠标指针将不随移动到的区域而变化",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		game.saveConfig("cursor_style", item);
		if (item == "pointer") {
			ui.window.classList.add("nopointer");
		}
		else {
			ui.window.classList.remove("nopointer");
		}
	}
};
