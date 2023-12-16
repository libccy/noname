import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';

export const CLEAR_BACKGROUND_MUSIC = {
	name: "清除自定义背景音乐",
	clear: true,
	onclick() {
		if (confirm("是否清除已导入的所有自定义背景音乐？（该操作不可撤销！）")) {
			for (var i in lib.config.customBackgroundMusic) {
				lib.config.all.background_music.remove(i);
				if (i.startsWith("cdv_")) {
					game.removeFile("audio/background/" + i + ".mp3");
				}
				else {
					game.deleteDB("audio", i);
				}
			}
			lib.config.customBackgroundMusic = null;
			game.saveConfig("customBackgroundMusic", null);
			game.saveConfig("background_music", "music_off");
			if (!_status._aozhan) game.playBackgroundMusic();
		}
	}
};
