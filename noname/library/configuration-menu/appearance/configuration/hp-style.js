import { ITEM } from "./hp-style/item.js";
import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';
import { UI as ui } from '../../../../ui.js';

export const HP_STYLE = {
	name: "体力条样式",
	init: "ol",
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
		ui.create.filediv(".menubutton.addbutton", "添加图片", node, function (file) {
			if (file && node.currentDB) {
				game.putDB("image", "hp_style" + node.currentDB, file, function () {
					game.getDB("image", "hp_style" + node.currentDB, function (fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function (fileLoadedEvent) {
							var data = fileLoadedEvent.target.result;
							button.childNodes[node.currentDB - 1].style.backgroundImage = "url(" + data + ")";
							button.classList.add("shown");
							node.classList.add("showdelete");
							node.currentDB++;
							if (node.currentDB > 4) {
								node.classList.add("hideadd");
								button.classList.remove("transparent");
								delete node.currentDB;
							}
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				});
			}
		}).inputNode.accept = "image/*";
		deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
			if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
				game.deleteDB("image", "hp_style1");
				game.deleteDB("image", "hp_style2");
				game.deleteDB("image", "hp_style3");
				game.deleteDB("image", "hp_style4");
				for (var i = 0; i < button.childElementCount; i++) {
					button.childNodes[i].style.backgroundImage = "none";
				}
				node.classList.remove("showdelete");
				node.classList.remove("hideadd");
				if (lib.config.hp_style == "custom") {
					lib.configMenu.appearence.config.hp_style.onclick("default");
					switcher.lastChild.innerHTML = "默认";
				}
				button.classList.add("transparent");
				button.classList.remove("shown");
				node.currentDB = 1;
			}
		});
	},
	visualMenu(node, link, name, config) {
		node.className = "button hpbutton dashedmenubutton";
		node.innerHTML = "";
		for (var i = 1; i <= 4; i++) {
			var div = ui.create.div(node);
			if (link == "default") {
				ui.create.div(div);
			}
			else if (link != "custom") {
				div.setBackgroundImage("theme/style/hp/image/" + link + i + ".png");
			}
			if (i == 4) {
				div.style.webkitFilter = "grayscale(1)";
			}
		}
		if (link == "custom") {
			node.classList.add("transparent");
			var getDB = function (num) {
				node.parentNode.lastChild.currentDB = num;
				game.getDB("image", "hp_style" + num, function (fileToLoad) {
					if (!fileToLoad) return;
					var fileReader = new FileReader();
					fileReader.onload = function (fileLoadedEvent) {
						var data = fileLoadedEvent.target.result;
						node.childNodes[num - 1].style.backgroundImage = "url(" + data + ")";
						node.classList.add("shown");
						node.parentNode.lastChild.classList.add("showdelete");
						if (num < 4) {
							getDB(num + 1);
						}
						else {
							node.parentNode.lastChild.classList.add("hideadd");
							node.classList.remove("transparent");
							delete node.parentNode.firstChild.currentDB;
						}
					};
					fileReader.readAsDataURL(fileToLoad, "UTF-8");
				});
			}
			getDB(1);
		}
	},
	onclick(layout) {
		game.saveConfig("hp_style", layout);
		var style = ui.css.hp_style;
		ui.css.hp_style = lib.init.css(lib.assetURL + "theme/style/hp", lib.config.hp_style);
		style.remove();
		if (ui.css.hp_stylesheet1) {
			ui.css.hp_stylesheet1.remove();
			delete ui.css.hp_stylesheet1;
		}
		if (ui.css.hp_stylesheet2) {
			ui.css.hp_stylesheet2.remove();
			delete ui.css.hp_stylesheet2;
		}
		if (ui.css.hp_stylesheet3) {
			ui.css.hp_stylesheet3.remove();
			delete ui.css.hp_stylesheet3;
		}
		if (ui.css.hp_stylesheet4) {
			ui.css.hp_stylesheet4.remove();
			delete ui.css.hp_stylesheet4;
		}
		if (layout == "custom") {
			game.getDB("image", "hp_style1", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet1) {
						ui.css.hp_stylesheet1.remove();
					}
					ui.css.hp_stylesheet1 = lib.init.sheet(`.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(${fileLoadedEvent.target.result})}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB("image", "hp_style2", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet2) {
						ui.css.hp_stylesheet2.remove();
					}
					ui.css.hp_stylesheet2 = lib.init.sheet(`.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(${fileLoadedEvent.target.result})}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB("image", "hp_style3", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet3) {
						ui.css.hp_stylesheet3.remove();
					}
					ui.css.hp_stylesheet3 = lib.init.sheet(`.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(${fileLoadedEvent.target.result})}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB("image", "hp_style4", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet4) {
						ui.css.hp_stylesheet4.remove();
					}
					ui.css.hp_stylesheet4 = lib.init.sheet(`.hp:not(.text):not(.actcount)>.lost{background-image:url(${fileLoadedEvent.target.result})}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
	},
	unfrequent: true
};
