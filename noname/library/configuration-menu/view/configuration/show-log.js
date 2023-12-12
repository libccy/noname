import { ITEM } from "./show-log/item.js";

export const SHOW_LOG = {
	name: "历史记录栏",
	init: "off",
	intro: "在屏幕中部显示出牌文字记录",
	unfrequent: true,
	item: ITEM,
	onclick(bool) {
		game.saveConfig("show_log", bool);
		if (lib.config.show_log != "off") {
			ui.arenalog.style.display = "";
			ui.arenalog.dataset.position = bool;
		}
		else {
			ui.arenalog.style.display = "none";
			ui.arenalog.innerHTML = "";
		}
	}
};
