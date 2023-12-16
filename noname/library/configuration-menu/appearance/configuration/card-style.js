import { ITEM } from "./card-style/item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';

export const CARD_STYLE = {
	name: "卡牌样式",
	init: "default",
	intro: "设置正面朝上的卡牌的样式",
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
				game.putDB("image", "card_style", file, function () {
					game.getDB("image", "card_style", function (fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function (fileLoadedEvent) {
							var data = fileLoadedEvent.target.result;
							button.style.backgroundImage = "url(" + data + ")";
							button.className = "button card fullskin";
							node.classList.add("showdelete");
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				});
			}
		}).inputNode.accept = "image*";
		deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
			if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
				game.deleteDB("image", "card_style");
				button.style.backgroundImage = "none";
				button.className = "button character dashedmenubutton";
				node.classList.remove("showdelete");
				if (lib.config.card_style == "custom") {
					lib.configMenu.appearence.config.card_style.onclick("default");
					switcher.lastChild.innerHTML = "默认";
				}
				button.classList.add("transparent");
			}
		});
	},
	visualMenu(node, link, name, config) {
		node.className = "button card fullskin";
		node.style.backgroundSize = "100% 100%";
		switch (link) {
			case "default": case "custom": {
				if (lib.config.theme == "simple") {
					node.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";
					node.className = "button character";
				}
				else {
					node.style.backgroundImage = "none";
					node.className = "button character dashedmenubutton";
				}
				break;
			}
			case "new": node.setBackgroundImage("theme/style/card/image/new.png"); break;
			case "ol": node.setBackgroundImage("theme/style/card/image/ol.png"); break;
			case "wood": node.setBackgroundImage("theme/woodden/wood.jpg"); node.style.backgroundSize = "initial"; break;
			case "music": node.setBackgroundImage("theme/music/wood3.png"); break;
			case "simple": node.setBackgroundImage("theme/simple/card.png"); break;
		}
		if (link == "custom") {
			node.classList.add("transparent");
			game.getDB("image", "card_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					var data = fileLoadedEvent.target.result;
					node.style.backgroundImage = "url(" + data + ")";
					node.className = "button card fullskin";
					node.parentNode.lastChild.classList.add("showdelete");
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
	},
	onclick(layout) {
		game.saveConfig("card_style", layout);
		var style = ui.css.card_style;
		ui.css.card_style = lib.init.css(lib.assetURL + "theme/style/card", lib.config.card_style);
		style.remove();
		if (ui.css.card_stylesheet) {
			ui.css.card_stylesheet.remove();
			delete ui.css.card_stylesheet;
		}
		if (layout == "custom") {
			game.getDB("image", "card_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.card_stylesheet) {
						ui.css.card_stylesheet.remove();
					}
					ui.css.card_stylesheet = lib.init.sheet(".card:not(*:empty){background-image:url(" + fileLoadedEvent.target.result + ")}");
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
	},
	unfrequent: true
};
