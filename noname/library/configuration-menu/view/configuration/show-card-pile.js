import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';
export const SHOW_CARD_PILE = {
	name: "显示牌堆按钮",
	init: true,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_cardpile", bool);
		if (bool) {
			ui.cardPileButton.style.display = "";
		}
		else {
			ui.cardPileButton.style.display = "none";
		}
	}
};
