import { Game } from "../../../../game.js";
import { UI } from "../../../../ui.js";

export const lowPerformance = {
	name: "流畅模式",
	init: false,
	intro: "减少部分游戏特效，提高游戏速度",
	onclick(bool) {
		Game.saveConfig("low_performance", bool);
		if (bool) {
			UI.window.classList.add("low_performance");
		}
		else {
			UI.window.classList.remove("low_performance");
		}
	}
};
