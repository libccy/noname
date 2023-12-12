import { ITEM } from "./player-style/item.js";

export const PLAYER_STYLE = {
	name: "角色背景",
	init: "default",
	intro: "设置角色的背景图片",
	item: ITEM,
	visualBar(node, item, create, switcher) {
		if (node.created) {
			return;
		}
		var button;
		for (var i = 0; i < node.parentNode.childElementCount; i++) {
			if (node.parentNode.childNodes[i]._link == "custom") {
				button = node.parentNode.childNodes[i];
			}
		}
		if (!button) {
			return;
		}
		node.created = true;
		var deletepic;
		ui.create.filediv(".menubutton", "添加图片", node, function (file) {
			if (file) {
				game.putDB("image", "player_style", file, function () {
					game.getDB("image", "player_style", function (fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function (fileLoadedEvent) {
							var data = fileLoadedEvent.target.result;
							button.style.backgroundImage = "url(" + data + ")";
							button.className = "button character";
							button.style.backgroundSize = "100% 100%";
							node.classList.add("showdelete");
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				});
			}
		}).inputNode.accept = "image/*";
		deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
			if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
				game.deleteDB("image", "player_style");
				button.style.backgroundImage = "none";
				button.className = "button character dashedmenubutton";
				node.classList.remove("showdelete");
				if (lib.config.player_style == "custom") {
					lib.configMenu.appearence.config.player_style.onclick("default");
					switcher.lastChild.innerHTML = "默认";
				}
				button.classList.add("transparent");
			}
		});
	},
	visualMenu(node, link, name, config) {
		node.className = "button character";
		node.style.backgroundSize = "";
		node.style.height = "108px";
		switch (link) {
			case "default": case "custom": {
				node.style.backgroundImage = "none";
				node.className = "button character dashedmenubutton";
				break;
			}
			case "wood": node.setBackgroundImage("theme/woodden/wood.jpg"); break;
			case "music": node.style.backgroundImage = "linear-gradient(#4b4b4b, #464646)"; break;
			case "simple": node.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))"; break;
		}
		if (link == "custom") {
			node.classList.add("transparent");
			game.getDB("image", "player_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					var data = fileLoadedEvent.target.result;
					node.style.backgroundImage = "url(" + data + ")";
					node.className = "button character";
					node.parentNode.lastChild.classList.add("showdelete");
					node.style.backgroundSize = "100% 100%";
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
	},
	onclick(layout) {
		game.saveConfig("player_style", layout);
		if (ui.css.player_stylesheet) {
			ui.css.player_stylesheet.remove();
			delete ui.css.player_stylesheet;
		}
		if (layout == "custom") {
			game.getDB("image", "player_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.player_stylesheet) {
						ui.css.player_stylesheet.remove();
					}
					ui.css.player_stylesheet = lib.init.sheet(`#window .player{background-image:url("${fileLoadedEvent.target.result}");background-size:100% 100%;}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		else if (layout != "default") {
			var str = "";
			switch (layout) {
				case "wood": str = `url("${lib.assetURL}theme/woodden/wood.jpg")`; break;
				case "music": str = "linear-gradient(#4b4b4b, #464646)"; break;
				case "simple": str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))"; break;
			}
			ui.css.player_stylesheet = lib.init.sheet(`#window .player{background-image:${str}}`);
		}
	},
	unfrequent: true
};
