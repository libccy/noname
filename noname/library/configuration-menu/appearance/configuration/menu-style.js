import { ITEM } from "./menu-style/item.js";

export const MENU_STYLE = {
	name: "菜单背景",
	init: "default",
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
				game.putDB("image", "menu_style", file, function () {
					game.getDB("image", "menu_style", function (fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function (fileLoadedEvent) {
							var data = fileLoadedEvent.target.result;
							button.style.backgroundImage = `url(${data})`;
							button.style.backgroundSize = "cover";
							button.className = "button character";
							node.classList.add("showdelete");
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				});
			}
		}).inputNode.accept = "image/*";
		deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
			if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
				game.deleteDB("image", "menu_style");
				button.style.backgroundImage = "none";
				button.style.backgroundSize = "auto";
				button.className = "button character dashedmenubutton";
				node.classList.remove("showdelete");
				if (lib.config.menu_style == "custom") {
					lib.configMenu.appearence.config.menu_style.onclick("default");
					switcher.lastChild.innerHTML = "默认";
				}
				button.classList.add("transparent");
			}
		});
	},
	visualMenu(node, link, name, config) {
		node.className = "button character";
		node.style.backgroundSize = "auto";
		switch (link) {
			case "default": case "custom": {
				node.style.backgroundImage = "none";
				node.classList.add("dashedmenubutton");
				break;
			}
			case "wood": node.setBackgroundImage("theme/woodden/wood2.png"); break;
			case "music": node.style.backgroundImage = "linear-gradient(#4b4b4b, #464646)"; break;
			case "simple": node.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))"; break;
		}
		if (link == "custom") {
			node.classList.add("transparent");
			game.getDB("image", "menu_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					var data = fileLoadedEvent.target.result;
					node.style.backgroundImage = "url(" + data + ")";
					node.style.backgroundSize = "cover";
					node.className = "button character";
					node.parentNode.lastChild.classList.add("showdelete");
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
	},
	onclick(layout) {
		game.saveConfig("menu_style", layout);
		if (ui.css.menu_stylesheet) {
			ui.css.menu_stylesheet.remove();
			delete ui.css.menu_stylesheet;
		}
		if (layout == "custom") {
			game.getDB("image", "menu_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.menu_stylesheet) {
						ui.css.menu_stylesheet.remove();
					}
					ui.css.menu_stylesheet = lib.init.sheet(`html #window>.dialog.popped,html .menu,html .menubg{background-image:url("${fileLoadedEvent.target.result}");background-size:cover}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		else if (layout != "default") {
			var str = "";
			switch (layout) {
				case "wood": str = `url("${lib.assetURL}theme/woodden/wood2.png")`; break;
				case "music": str = "linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px"; break;
				case "simple": str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px"; break;
			}
			ui.css.menu_stylesheet = lib.init.sheet(`html #window>.dialog.popped,html .menu,html .menubg{background-image:${str}}`);
		}
	},
	unfrequent: true,
};
