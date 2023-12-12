import { ITEM } from "./background-music/item.js";

export const BACKGROUND_MUSIC = {
	updatex() {
		this.lastChild.innerHTML = this._link.config.item[lib.config.background_music];
		var menu = this._link.menu;
		for (var i = 0; i < menu.childElementCount; i++) {
			if (!["music_off", "music_custom", "music_random"].concat(lib.config.all.background_music).includes(menu.childNodes[i]._link)) menu.childNodes[i].delete();
		}
	},
	name: "背景音乐",
	init: true,
	item: ITEM,
	onclick(item) {
		game.saveConfig("background_music", item);
		game.playBackgroundMusic();
	}
};
