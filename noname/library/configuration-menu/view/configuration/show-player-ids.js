export const SHOW_PLAYER_IDS = {
	name: "显示身份按钮",
	init: true,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_playerids", bool);
		if (lib.config.show_playerids) {
			ui.playerids.style.display = "";
		}
		else {
			ui.playerids.style.display = "none";
		}
	}
};
