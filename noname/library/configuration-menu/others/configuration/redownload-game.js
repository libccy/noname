export const REDOWNLOAD_GAME = {
	name: "重新下载游戏",
	onclick() {
		var node = this;
		if (node._clearing) {
			localStorage.removeItem("noname_inited");
			game.reload();
			return;
		}
		node._clearing = true;
		node.firstChild.innerHTML = "单击以确认 (3)";
		setTimeout(function () {
			node.firstChild.innerHTML = "单击以确认 (2)";
			setTimeout(function () {
				node.firstChild.innerHTML = "单击以确认 (1)";
				setTimeout(function () {
					node.firstChild.innerHTML = "重新下载游戏";
					delete node._clearing;
				}, 1000);
			}, 1000);
		}, 1000);
	},
	clear: true
};
