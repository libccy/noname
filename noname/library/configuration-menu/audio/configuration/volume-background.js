import { VOLUME_ITEM } from "./volume-item.js";

export const VOLUME_BACKGROUND = {
	name: "音乐音量",
	init: 8,
	item: VOLUME_ITEM,
	onclick(volume) {
		game.saveConfig("volumn_background", parseInt(volume));
		ui.backgroundMusic.volume = volume / 8;
	}
};
