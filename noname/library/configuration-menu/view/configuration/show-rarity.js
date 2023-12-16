import { Game as game } from '../../../../game.js';
import { status as _status } from '../../../../status.js';
export const SHOW_RARITY = {
	name: "显示武将评级",
	init: false,
	intro: "仅供娱乐，重启后生效",
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_rarity", bool);
	}
};
