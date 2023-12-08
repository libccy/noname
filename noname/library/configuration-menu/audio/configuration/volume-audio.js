import { VOLUME_ITEM } from "./volume-item.js";

export const VOLUME_AUDIO = {
	name: "音效音量",
	init: 8,
	item: VOLUME_ITEM,
	onclick(volume) {
		game.saveConfig("volumn_audio", parseInt(volume));
	}
};
