export const TURNED_STYLE = {
	name: "翻面文字",
	intro: "角色被翻面时显示“翻面”",
	init: true,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("turned_style", bool);
		if (bool) {
			ui.arena.classList.remove("hide_turned");
		}
		else {
			ui.arena.classList.add("hide_turned");
		}
	}
};
