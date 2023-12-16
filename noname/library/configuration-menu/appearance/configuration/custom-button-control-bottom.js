import { CUSTOM_BUTTON_ITEM } from "./custom-button-item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
export const CUSTOM_BUTTON_CONTROL_BOTTOM = {
	name: "技能下部高度",
	init: "0x",
	item: CUSTOM_BUTTON_ITEM,
	unfrequent: true,
	onclick(item) {
		game.saveConfig("custom_button_control_bottom", item);
		lib.configMenu.appearence.config.custom_button.onclick("skip");
	}
};
