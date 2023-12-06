import { Game } from "../../../../game.js";
import { UI } from "../../../../ui.js";
import { Create } from "../../../../ui/create.js";
import { config } from "../../../config.js";

export const EXTENSION_CREATE = {
	name: "添加获取扩展地址",
	clear: true,
	unfrequent: true,
	onclick() {
		Game.prompt("请输入地址名称", str => {
			if (!str) return;

			var map = config.extension_sources;
			Game.prompt(`请输入${str}的地址`, str2 => {
				if (!str2) return;

				delete map[str];
				map[str] = str2;
				Game.saveConfig("extension_sources", map);
				Game.saveConfig("extension_source", str);
				var nodexx = UI.extension_source;
				nodexx.updateInner();
				var nodeyy = nodexx._link.menu;
				var nodezz = nodexx._link.config;
				for (var i = 0; i < nodeyy.childElementCount; i++) {
					if (nodeyy.childNodes[i]._link != str) continue;

					nodeyy.childNodes[i].remove();
					break;
				}
				var textMenu = Create.div("", str, nodeyy, function () {
					var node = this.parentNode._link;
					var config = node._link.config;
					node._link.current = this.link;
					var tmpName = node.lastChild.innerHTML;
					node.lastChild.innerHTML = config.item[this._link];
					if (config.onclick && config.onclick.call(node, this._link, this) === false) {
						node.lastChild.innerHTML = tmpName;
					}
					if (config.update) {
						config.update();
					}
				});
				textMenu._link = str;
				nodezz.item[name] = str;
				alert(`已添加扩展地址：${str}`);
			});
		});
	}
};
