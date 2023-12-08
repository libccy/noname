import { POP_LOGV } from "./configuration/pop-logv.js";
import { SHOW_HISTORY } from "./configuration/show-history.js";

export const CONFIGURATION = {
	update(config, map) {
		if (config.mode == "versus" || config.mode == "chess" || config.mode == "tafang" || config.mode == "boss") {
			map.show_handcardbutton.show();
		}
		else {
			map.show_handcardbutton.hide();
		}
		if (config.touchscreen) {
			map.pop_logv.hide();
		}
		else {
			map.pop_logv.show();
		}
		if (device) {
			if (device == "android") {
				map.show_statusbar_android.show();
				map.show_statusbar_ios.hide();
			}
			else if (device == "ios") {
				map.show_statusbar_ios.show();
				map.show_statusbar_android.hide();
			}
			if (!game.download) {
				setTimeout(function () {
					if (!window.StatusBar) {
						map.show_statusbar.hide();
					}
				}, 5000);
			}
		}
		else {
			map.show_statusbar_ios.hide();
			map.show_statusbar_android.hide();
		}
		if (get.is.phoneLayout()) {
			map.remember_round_button.show();
			map.popequip.show();
			map.filternode_button.show();
			map.show_pause.hide();
			map.show_auto.hide();
			map.show_replay.hide();
			map.show_round_menu.show();
		}
		else {
			map.show_pause.show();
			map.show_auto.show();
			map.show_replay.show();
			map.show_round_menu.hide();
			map.remember_round_button.hide();
			map.popequip.hide();
			map.filternode_button.hide();
		}
		if (config.show_card_prompt) {
			map.hide_card_prompt_basic.show();
			map.hide_card_prompt_equip.show();
		}
		else {
			map.hide_card_prompt_basic.hide();
			map.hide_card_prompt_equip.hide();
		}
		if (config.show_log != "off") {
			map.clear_log.show();
		}
		else {
			map.clear_log.hide();
		}
		if (get.is.phoneLayout()) {
			map.show_time2.show();
			map.show_time.hide();
			if (config.show_time2) {
				map.watchface.show();
			}
			else {
				map.watchface.hide();
			}
		}
		else {
			map.show_time2.hide();
			map.show_time.show();
			map.watchface.hide();
		}
		if (config.show_extensionmaker) {
			map.show_extensionshare.show();
		}
		else {
			map.show_extensionshare.hide();
		}
	},
	show_history: SHOW_HISTORY,
	pop_logv: POP_LOGV
};