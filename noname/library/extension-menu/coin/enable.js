import { Game as game } from '../../../game.js';
import { Library as lib } from '../../../library.js';
import { status as _status } from '../../../status.js';
export const ENABLE = {
	name: '开启',
	init: false,
	restart: true,
	onclick(bool) {
		if (bool) {
			lib.config.plays.add('coin');
		}
		else {
			lib.config.plays.remove('coin');
		}
		game.saveConfig('plays', lib.config.plays);
	}
};
