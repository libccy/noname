import { CUSTOM_BUTTON_ITEM } from "./custom-button-item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';

export const CUSTOM_BUTTON_CONTROL_TOP = {
	name: "技能上部高度",
	init: "0x",
	item: CUSTOM_BUTTON_ITEM,
	unfrequent: true,
	onclick(item) {
		game.saveConfig("custom_button_control_top", item);
		lib.configMenu.appearence.config.custom_button.onclick("skip");
	}
};
