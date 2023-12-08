export const CUSTOM_BUTTON = {
	name: "自定义按钮高度",
	init: false,
	unfrequent: true,
	onclick(bool) {
		if (bool !== "skip") {
			game.saveConfig("custom_button", bool);
		}
		if (ui.css.buttonsheet) {
			ui.css.buttonsheet.remove();
		}
		if (lib.config.custom_button) {
			var cbnum1 = 6 + (parseInt(lib.config.custom_button_system_top) || 0);
			var cbnum2 = 6 + (parseInt(lib.config.custom_button_system_bottom) || 0);
			var cbnum3 = 3 + (parseInt(lib.config.custom_button_control_top) || 0);
			var cbnum4 = 3 + (parseInt(lib.config.custom_button_control_bottom) || 0);
			var cbnum5 = 2;
			var cbnum6 = 2;
			if (cbnum3 < 0) {
				cbnum5 += cbnum3;
				cbnum3 = 0;
			}
			if (cbnum4 < 0) {
				cbnum6 += cbnum4;
				cbnum4 = 0;
			}
			ui.css.buttonsheet = lib.init.sheet(
				"#system>div>div, .caption>div>.tdnode{padding-top:" + cbnum1 + "px !important;padding-bottom:" + cbnum2 + "px !important}",
				"#control>.control>div{padding-top:" + cbnum3 + "px;padding-bottom:" + cbnum4 + "px}",
				"#control>.control{padding-top:" + cbnum5 + "px;padding-bottom:" + cbnum6 + "px}"
			);
		}
	}
};
