export const RESET_GAME = {
	name: "重置游戏设置",
	onclick() {
		var node = this;
		if (node._clearing) {
			var noname_inited = localStorage.getItem("noname_inited");
			var onlineKey = localStorage.getItem(lib.configprefix + "key");
			localStorage.clear();
			if (noname_inited) {
				localStorage.setItem("noname_inited", noname_inited);
			}
			if (onlineKey) {
				localStorage.setItem(lib.configprefix + "key", onlineKey);
			}
			game.deleteDB("config");
			game.deleteDB("data");
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
					node.firstChild.innerHTML = "重置游戏设置";
					delete node._clearing;
				}, 1000);
			}, 1000);
		}, 1000);
	},
	clear: true
};
