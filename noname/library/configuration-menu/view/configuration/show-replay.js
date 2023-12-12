export const SHOW_REPLAY = {
	name: "显示重来按钮",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_replay", bool);
		if (lib.config.show_replay) {
			ui.replay.style.display = "";
		}
		else {
			ui.replay.style.display = "none";
		}
	}
};
