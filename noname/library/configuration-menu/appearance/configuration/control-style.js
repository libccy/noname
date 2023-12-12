import { ITEM } from "./control-style/item.js";

export const CONTROL_STYLE = {
	name: "按钮背景",
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
				game.putDB("image", "control_style", file, function () {
					game.getDB("image", "control_style", function (fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function (fileLoadedEvent) {
							var data = fileLoadedEvent.target.result;
							button.style.backgroundImage = "url(" + data + ")";
							button.className = "button character controlbutton";
							node.classList.add("showdelete");
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				});
			}
		}).inputNode.accept = "image/*";
		deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
			if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
				game.deleteDB("image", "control_style");
				button.style.backgroundImage = "none";
				button.className = "button character controlbutton dashedmenubutton";
				node.classList.remove("showdelete");
				if (lib.config.control_style == "custom") {
					lib.configMenu.appearence.config.control_style.onclick("default");
					switcher.lastChild.innerHTML = "默认";
				}
				button.classList.add("transparent");
			}
		});
	},
	visualMenu(node, link, name, config) {
		node.className = "button character controlbutton";
		node.style.backgroundSize = "";
		switch (link) {
			case "default": case "custom": {
				node.style.backgroundImage = "none";
				node.classList.add("dashedmenubutton");
				break;
			}
			case "wood": node.setBackgroundImage("theme/woodden/wood.jpg"); break;
			case "music": node.style.backgroundImage = "linear-gradient(#4b4b4b, #464646)"; break;
			case "simple": node.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))"; break;
		}
		if (link == "custom") {
			node.classList.add("transparent");
			game.getDB("image", "control_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					var data = fileLoadedEvent.target.result;
					node.style.backgroundImage = "url(" + data + ")";
					node.className = "button character controlbutton";
					node.parentNode.lastChild.classList.add("showdelete");
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
	},
	onclick(layout) {
		game.saveConfig("control_style", layout);
		if (ui.css.control_stylesheet) {
			ui.css.control_stylesheet.remove();
			delete ui.css.control_stylesheet;
		}
		if (layout == "custom") {
			game.getDB("image", "control_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.control_stylesheet) {
						ui.css.control_stylesheet.remove();
					}
					ui.css.control_stylesheet = lib.init.sheet(`#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("${fileLoadedEvent.target.result}")}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		else if (layout != "default") {
			var str = "";
			switch (layout) {
				case "wood": str = `url("${lib.assetURL}theme/woodden/wood.jpg")`; break;
				case "music": str = "linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px"; break;
				case "simple": str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px"; break;
			}
			if (layout == "wood") {
				ui.css.control_stylesheet = lib.init.sheet("#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:" + str + "}");
			}
			else {
				ui.css.control_stylesheet = lib.init.sheet("#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:" + str + "}");
			}
		}
	},
	unfrequent: true
};
