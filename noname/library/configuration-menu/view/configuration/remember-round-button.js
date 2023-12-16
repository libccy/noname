import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const REMEMBER_ROUND_BUTTON = {
	name: "记住按钮位置",
	intro: "重新开始后触屏按钮将保存的上一局的位置",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("remember_round_button", bool);
		if (!bool) {
			ui.click.resetround();
		}
	}
};
