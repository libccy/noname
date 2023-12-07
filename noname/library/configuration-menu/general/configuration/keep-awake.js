import { Game } from "../../../../game.js";

export const KEEP_AWAKE = {
	name: "屏幕常亮",
	init: false,
	unfrequent: true,
	intro: `防止屏幕自动关闭${document.createElement("br").outerHTML}注：旧版本通过NoSleep.js实现的屏幕常亮可能会影响外置音频的音量`,
	onclick(bool) {
		Game.saveConfig("keep_awake", bool);
		if (bool) {
			if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.keepAwake();
			else if (window.noSleep) {
				document.addEventListener(lib.config.touchscreen ? "touchend" : "click", function enableNoSleepX() {
					document.removeEventListener(lib.config.touchscreen ? "touchend" : "click", enableNoSleepX, false);
					window.noSleep.enable();
				}, false);
			}
		}
		else {
			if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.allowSleepAgain();
			else if (window.noSleep) window.noSleep.disable();
		}
	}
};
