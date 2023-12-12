import { Game } from "../../../../game.js";
import { Initialization } from "../../../initialization.js";

export const IMAGE_BACKGROUND_RANDOM = {
	name: "随机背景",
	init: false,
	onclick(bool) {
		Game.saveConfig("image_background_random", bool);
		Initialization.background();
	}
};
