import { EXPORT_DATA } from "./configuration/export-data.js";
import { IMPORT_DATA_BUTTON } from "./configuration/import-data-button.js";
import { IMPORT_DATA } from "./configuration/import-data.js";
import { REDOWNLOAD_GAME } from "./configuration/redownload-game.js";
import { RESET_GAME } from "./configuration/reset-game.js";
import { RESET_HIDDEN_PACK } from "./configuration/reset-hidden-pack.js";
import { RESET_TUTORIAL } from "./configuration/reset-tutorial.js";

export const CONFIGURATION = {
	reset_game: RESET_GAME,
	reset_hiddenpack: RESET_HIDDEN_PACK,
	reset_tutorial: RESET_TUTORIAL,
	import_data: IMPORT_DATA,
	import_data_button: IMPORT_DATA_BUTTON,
	export_data: EXPORT_DATA,
	redownload_game: REDOWNLOAD_GAME,
	update(config, map) {
		if (lib.device || lib.node) {
			map.redownload_game.show();
		}
		else {
			map.redownload_game.hide();
		}
	}
};
