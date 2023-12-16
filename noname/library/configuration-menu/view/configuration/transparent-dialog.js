import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const TRANSPARENT_DIALOG = {
	name: "堆叠对话框虚化",
	init: false,
	intro: "当具有static属性的对话框堆叠（如五谷丰登对话框中提示无懈可击）时，将后方的对话框变为半透明",
	onclick(bool) {
		game.saveConfig("transparent_dialog", bool);
		if (bool) {
			for (var i = 0; i < ui.dialogs.length; i++) {
				if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
					ui.dialogs[i].unfocus();
				}
			}
		}
		else {
			for (var i = 0; i < ui.dialogs.length; i++) {
				if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
					ui.dialogs[i].refocus();
				}
			}
		}
	}
};
