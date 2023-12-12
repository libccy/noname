export const RESET_TUTORIAL = {
	name: "重置新手向导",
	onclick() {
		if (this.firstChild.innerHTML != "已重置") {
			this.firstChild.innerHTML = "已重置"
			game.saveConfig("new_tutorial", false);
			game.saveConfig("prompt_hidebg");
			game.saveConfig("prompt_hidepack");
			var that = this;
			setTimeout(function () {
				that.firstChild.innerHTML = "重置新手向导";
			}, 500);
		}
	},
	clear: true
};
