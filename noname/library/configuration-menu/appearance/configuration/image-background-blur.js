import { Game } from "../../../../game.js";
import { UI } from "../../../../ui.js";
import { configuration } from "../../../configuration.js";

export const IMAGE_BACKGROUND_BLUR = {
	name: "背景模糊",
	init: false,
	onclick(bool) {
		Game.saveConfig("image_background_blur", bool);
		if (configuration.image_background_blur) {
			UI.background.style.filter = "blur(8px)";
			UI.background.style.webkitFilter = "blur(8px)";
			UI.background.style.transform = "scale(1.05)";
		}
		else {
			UI.background.style.filter = "";
			UI.background.style.webkitFilter = "";
			UI.background.style.transform = "";
		}
	}
};
