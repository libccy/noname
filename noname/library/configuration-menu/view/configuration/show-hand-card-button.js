import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';

export const SHOW_HAND_CARD_BUTTON = {
	name: '显示手牌按钮',
	init: true,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig('show_handcardbutton', bool);
	}
};
