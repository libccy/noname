import { Game } from "../../../../game.js";
import { Create } from "../../../../ui/create.js";
import { configuration } from "../../../configuration.js";
import { Initialization } from "../../../initialization.js";
import { ITEM } from "./image-background/item.js";

export const IMAGE_BACKGROUND = {
	name: "游戏背景",
	init: "default",
	item: ITEM,
	visualBar(node, item, create) {
		if (node.created) {
			node.lastChild.classList.remove("active");
			return;
		}
		node.created = true;
		Create.filediv(".menubutton", "添加背景", node, function (file) {
			if (file) {
				var name = file.name;
				if (name.includes(".")) {
					name = name.slice(0, name.indexOf("."));
				}
				var link = `${Game.writeFile ? "cdv_" : "custom_"}${name}`;
				if (item[link]) {
					for (var i = 1; i < 1000; i++) {
						if (!item[`${link}_${i}`]) {
							link = `${link}_${i}`; break;
						}
					}
				}
				item[link] = name;
				var callback = function () {
					create(link, node.parentNode.defaultNode);
					node.parentNode.updateBr();
					configuration.customBackgroundPack.add(link);
					Game.saveConfig("customBackgroundPack", configuration.customBackgroundPack);
				};
				if (Game.writeFile) {
					Game.writeFile(file, "image/background", `${link}.jpg`, callback);
				}
				else {
					Game.putDB("image", link, file, callback);
				}
				if (node.lastChild.classList.contains("active")) {
					editbg.call(node.lastChild);
				}
			}
		}).inputNode.accept = "image/*";
		var editbg = function () {
			this.classList.toggle("active");
			var page = this.parentNode.parentNode;
			for (var i = 0; i < page.childElementCount; i++) {
				if (page.childNodes[i].classList.contains("button")) {
					var link = page.childNodes[i]._link;
					if (link && link != "default") {
						var str;
						if (this.classList.contains("active")) {
							if (link.startsWith("custom_") || link.startsWith("cdv_")) {
								str = "删除";
							}
							else {
								str = "隐藏";
							}
						}
						else {
							str = item[link];
						}
						page.childNodes[i].firstChild.innerHTML = get.verticalStr(str);
					}
				}
			}
		};
		Create.div(".menubutton", "编辑背景", node, editbg);
	},
	visualMenu(node, link, name, config) {
		node.className = "button character";
		node.style.backgroundImage = "";
		node.style.backgroundSize = "";
		if (node.firstChild) {
			node.firstChild.innerHTML = get.verticalStr(name);
		}
		if (link == "default" || link.startsWith("custom_")) {
			node.style.backgroundImage = "none";
			node.classList.add("dashedmenubutton");
			if (link.startsWith("custom_")) {
				Game.getDB("image", link, function (fileToLoad) {
					if (!fileToLoad) return;
					var fileReader = new FileReader();
					fileReader.onload = function (fileLoadedEvent) {
						var data = fileLoadedEvent.target.result;
						node.style.backgroundImage = `url(${data})`;
						node.style.backgroundSize = "cover";
						node.classList.remove("dashedmenubutton");
					};
					fileReader.readAsDataURL(fileToLoad, "UTF-8");
				});
			}
			else {
				node.parentNode.defaultNode = node;
			}
		}
		else {
			node.setBackgroundImage(`image/background/${link}.jpg`);
			node.style.backgroundSize = "cover";
		}
	},
	onclick(background, node) {
		if (node && node.firstChild) {
			var menu = node.parentNode;
			if (node.firstChild.innerHTML == get.verticalStr("隐藏")) {
				menu.parentNode.noclose = true;
				node.remove();
				menu.updateBr();
				if (!configuration.prompt_hidebg) {
					alert("隐藏的背景可通过选项-其它-重置隐藏内容恢复");
					Game.saveConfig("prompt_hidebg", true);
				}
				configuration.hiddenBackgroundPack.add(background);
				Game.saveConfig("hiddenBackgroundPack", configuration.hiddenBackgroundPack);
				delete ITEM[background];
				if (configuration.image_background == background) {
					background = "default";
					this.lastChild.innerHTML = "默认";
				}
				else {
					this.lastChild.innerHTML = ITEM[configuration.image_background];
					return;
				}
			}
			else if (node.firstChild.innerHTML == get.verticalStr("删除")) {
				menu.parentNode.noclose = true;
				if (confirm("是否删除此背景？（此操作不可撤销）")) {
					node.remove();
					menu.updateBr();
					configuration.customBackgroundPack.remove(background);
					Game.saveConfig("customBackgroundPack", configuration.customBackgroundPack);
					if (background.startsWith("cdv_")) {
						Game.removeFile(`image/background/${background}.jpg`);
					}
					else {
						Game.deleteDB("image", background);
					}
					delete ITEM[background];
					if (configuration.image_background == background) {
						background = "default";
						this.lastChild.innerHTML = "默认";
					}
					else {
						this.lastChild.innerHTML = ITEM[configuration.image_background];
						return;
					}
				}
			}
		}
		Game.saveConfig("image_background", background);
		Initialization.background();
		Game.updateBackground();
	},
};
