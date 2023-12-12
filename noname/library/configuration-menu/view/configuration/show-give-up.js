export const SHOW_GIVE_UP = {
	name: "显示投降按钮",
	init: true,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_giveup", bool);
	}
};
