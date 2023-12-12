export const SHOW_PAUSE = {
	name: "显示暂停按钮",
	init: true,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_pause", bool);
		if (lib.config.show_pause) {
			ui.pause.style.display = "";
		}
		else {
			ui.pause.style.display = "none";
		}
	}
};
