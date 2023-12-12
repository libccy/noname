import { Game } from "../../../../game.js";
import { status } from "../../../../status.js";
import { Cheat } from "../../../cheat.js";

export const DEVELOPER = {
	name: "开发者模式",
	intro: "开启后可使用浏览器控制台控制游戏，同时可更新到开发版",
	init: false,
	onclick(bool) {
		Game.saveConfig("dev", bool);
		if (status.connectMode) return;
		if (bool) {
			Cheat.i();
		}
		else {
			delete window.cheat;
			delete window.game;
			delete window.ui;
			delete window.get;
			delete window.ai;
			delete window.lib;
			delete window._status;
		}
	},
	unfrequent: true
};
