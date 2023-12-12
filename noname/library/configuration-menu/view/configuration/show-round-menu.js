export const SHOW_ROUND_MENU = {
	name: "显示触屏按钮",
	init: true,
	unfrequent: true,
	onclick(bool) {
		if (get.is.nomenu("show_round_menu", bool)) return false;
		game.saveConfig("show_round_menu", bool);
		if (bool && ui.roundmenu) {
			ui.roundmenu.style.display = "";
		}
		else {
			ui.roundmenu.style.display = "none";
			alert("关闭触屏按钮后可通过手势打开菜单（默认为下划）")
		}
	}
};
