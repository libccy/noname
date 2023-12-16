import { ITEM } from "./show-status-bar-ios/item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';
export const SHOW_STATUS_BAR_IOS = {
	name: "显示状态栏",
	init: "off",
	unfrequent: true,
	item: ITEM,
	onclick(bool) {
		game.saveConfig("show_statusbar_ios", bool);
		if (window.StatusBar && lib.device == "ios") {
			if (bool != "off" && bool != "auto") {
				if (lib.config.show_statusbar_ios == "default") {
					window.StatusBar.overlaysWebView(false);
					document.body.classList.remove("statusbar");
				}
				else {
					window.StatusBar.overlaysWebView(true);
					document.body.classList.add("statusbar");
				}
				window.StatusBar.backgroundColorByName("black");
				window.StatusBar.show();
			}
			else {
				document.body.classList.remove("statusbar");
				window.StatusBar.hide();
			}
		}
	}
};
