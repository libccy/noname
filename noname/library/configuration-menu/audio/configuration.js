import { BACKGROUND_AUDIO } from "./configuration/background-audio.js";
import { BACKGROUND_MUSIC } from "./configuration/background-music.js";
import { BACKGROUND_SPEAK } from "./configuration/background-speak.js";
import { CLEAR_BACKGROUND_MUSIC } from "./configuration/clear-background-music.js";
import { EQUIP_AUDIO } from "./configuration/equip-audio.js";
import { IMPORT_MUSIC } from "./configuration/import-music.js";
import { REPEAT_AUDIO } from "./configuration/repeat-audio.js";
import { VOLUME_AUDIO } from "./configuration/volume-audio.js";
import { VOLUME_BACKGROUND } from "./configuration/volume-background.js";
import { Get as get } from '../../../get.js';
import { Library as lib } from '../../../library.js';
import { status as _status } from '../../../status.js';
import { UI as ui } from '../../../ui.js';

export const CONFIGURATION = {
	update(config, map) {
		if (config.background_music == "music_custom" && (lib.device || lib.node)) {
			map.import_music.show();
		}
		else {
			map.import_music.hide();
		}
		map.clear_background_music[get.is.object(config.customBackgroundMusic) ? "show" : "hide"]();
		ui.background_music_setting = map.background_music;
		map.background_music._link.config.updatex.call(map.background_music, []);
	},
	background_music: BACKGROUND_MUSIC,
	import_music: IMPORT_MUSIC,
	background_audio: BACKGROUND_AUDIO,
	background_speak: BACKGROUND_SPEAK,
	equip_audio: EQUIP_AUDIO,
	repeat_audio: REPEAT_AUDIO,
	volumn_audio: VOLUME_AUDIO,
	volumn_background: VOLUME_BACKGROUND,
	clear_background_music: CLEAR_BACKGROUND_MUSIC
};
