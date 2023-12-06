import { Game } from "../../../../game.js";
import { UI } from "../../../../ui.js";
import { config } from "../../../config.js";

export const EXTENSION_DELETE = {
	name: "删除当前扩展地址",
	clear: true,
	unfrequent: true,
	onclick() {
		var bool = false, map = config.extension_sources;
		for (var i in map) {
			if (i != config.extension_source) {
				bool = true;
				break;
			}
		}
		if (!bool) {
			alert("不能删除最后一个扩展地址！");
			return;
		}
		var name = config.extension_source;
		Game.saveConfig("extension_source", i);
		delete map[name];
		Game.saveConfig("extension_sources", map);
		var nodexx = UI.extension_source;
		nodexx.updateInner();
		var nodeyy = nodexx._link.menu;
		var nodezz = nodexx._link.config;
		for (var i = 0; i < nodeyy.childElementCount; i++) {
			if (nodeyy.childNodes[i]._link == name) {
				nodeyy.childNodes[i].remove();
				break;
			}
		}
		delete nodezz.item[name];
		alert(`已删除扩展地址：${name}`);
	}
};
