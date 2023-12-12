export const RESET_HIDDEN_PACK = {
	name: "重置隐藏内容",
	onclick() {
		if (this.firstChild.innerHTML != "已重置") {
			this.firstChild.innerHTML = "已重置"
			game.saveConfig("hiddenModePack", []);
			game.saveConfig("hiddenCharacterPack", []);
			game.saveConfig("hiddenCardPack", []);
			game.saveConfig("hiddenPlayPack", []);
			game.saveConfig("hiddenBackgroundPack", []);
			var that = this;
			setTimeout(function () {
				that.firstChild.innerHTML = "重置隐藏内容";
				setTimeout(function () {
					if (confirm("是否重新启动使改变生效？")) {
						game.reload();
					}
				});
			}, 500);
		}
	},
	clear: true
};
