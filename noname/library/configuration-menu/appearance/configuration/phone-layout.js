import { Game } from "../../../../game.js";
import { Is } from "../../../../get/is.js";
import { Library } from "../../../../library.js";
import { UI } from "../../../../ui.js";
import { css } from "../../../../ui/css.js";

export const PHONE_LAYOUT = {
	name: "触屏布局",
	init: false,
	onclick(bool) {
		if (Is.nomenu("phonelayout", bool)) return false;
		Game.saveConfig("phonelayout", bool);
		if (Is.phoneLayout()) {
			css.phone.href = `${Library.assetURL}layout/default/phone.css`;
			UI.arena.classList.add("phone");
		}
		else {
			css.phone.href = "";
			UI.arena.classList.remove("phone");
		}
	}
};
