export const SHOW_TIME_2 = {
	name: "显示时间",
	intro: "在触屏按钮处显示当前时间",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_time2", bool);
		if (bool) {
			ui.roundmenu.classList.add("clock");
		}
		else {
			ui.roundmenu.classList.remove("clock");
		}
	}
};
