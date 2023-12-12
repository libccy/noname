import { CUSTOM_BUTTON_ITEM } from "./custom-button-item.js";

export const CUSTOM_BUTTON_SYSTEM_TOP = {
	name: "菜单上部高度",
	init: "0x",
	item: CUSTOM_BUTTON_ITEM,
	unfrequent: true,
	onclick(item) {
		game.saveConfig("custom_button_system_top", item);
		lib.configMenu.appearence.config.custom_button.onclick("skip");
	}
};
