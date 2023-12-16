import { ITEM } from "./border-style/item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';

export const BORDER_STYLE = {
	name: "角色边框",
	init: "default",
	intro: "设置角色边框的样式，当设为自动时，样式将随着一局游戏中伤害或击杀的数量自动改变",
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
				game.putDB("image", "border_style", file, function () {
					game.getDB("image", "border_style", function (fileToLoad) {
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
				game.deleteDB("image", "border_style");
				button.style.backgroundImage = "none";
				button.className = "button character dashedmenubutton";
				node.classList.remove("showdelete");
				if (lib.config.border_style == "custom") {
					lib.configMenu.appearence.config.border_style.onclick("default");
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
		node.dataset.decoration = "";
		if (link == "default" || link == "custom" || link == "auto") {
			node.style.backgroundImage = "none";
			node.className = "button character dashedmenubutton";
		}
		else {
			if (link.startsWith("dragon_")) {
				link = link.slice(7);
				node.dataset.decoration = link;
			}
			node.setBackgroundImage("theme/style/player/" + link + "1.png");
			node.style.backgroundSize = "100% 100%";
		}
		if (link == "custom") {
			node.classList.add("transparent");
			game.getDB("image", "border_style", function (fileToLoad) {
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
		game.saveConfig("border_style", layout);
		if (ui.css.border_stylesheet) {
			ui.css.border_stylesheet.remove();
			delete ui.css.border_stylesheet;
		}
		if (layout == "custom") {
			game.getDB("image", "border_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.border_stylesheet) {
						ui.css.border_stylesheet.remove();
					}
					ui.css.border_stylesheet = lib.init.sheet();
					ui.css.border_stylesheet.id = "ui.css.border";
					ui.css.border_stylesheet.sheet.insertRule(`#window .player>.framebg{display:block;background-image:url("${fileLoadedEvent.target.result}")}`, 0);
					ui.css.border_stylesheet.sheet.insertRule(".player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}", 0);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		else if (layout != "default" && layout != "auto") {
			ui.css.border_stylesheet = lib.init.sheet();
			if (layout.startsWith("dragon_")) {
				layout = layout.slice(7);
				ui.arena.dataset.framedecoration = layout;
			}
			else {
				ui.arena.dataset.framedecoration = "";
			}
			ui.css.border_stylesheet.sheet.insertRule(`#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("${lib.assetURL}theme/style/player/${layout}1.png")}`, 0);
			ui.css.border_stylesheet.sheet.insertRule(`#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("${lib.assetURL}theme/style/player/${layout}3.png")}`, 0);
			ui.css.border_stylesheet.sheet.insertRule(".player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}", 0);
		}
	},
	unfrequent: true
};
