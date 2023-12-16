import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const REMEMBER_DIALOG = {
	name: "记住对话框位置",
	intro: "移动对话框后新的对话框也将在移动后的位置显示",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("remember_dialog", bool);
		if (!bool) {
			if (ui.dialog) {
				var dialog = ui.dialog;
				dialog.style.transform = "";
				dialog._dragtransform = [0, 0];
				dialog.style.transition = "all 0.3s";
				dialog._dragtouches;
				dialog._dragorigin;
				dialog._dragorigintransform;
				setTimeout(function () {
					dialog.style.transition = "";
				}, 500);
			}
			game.saveConfig("dialog_transform", [0, 0]);
		}
	}
};
