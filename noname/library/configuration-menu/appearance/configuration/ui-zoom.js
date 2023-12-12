import { Game } from "../../../../game.js";
import { Library } from "../../../../library.js";
import { UI } from "../../../../ui.js";
import { ITEM } from "./ui-zoom/item.js";

export const UI_ZOOM = {
	name: "界面缩放",
	unfrequent: true,
	init: "normal",
	item: ITEM,
	onclick(zoom) {
		Game.saveConfig("ui_zoom", zoom);
		switch (zoom) {
			case "esmall": zoom = 0.8; break;
			case "vsmall": zoom = 0.9; break;
			case "small": zoom = 0.93; break;
			case "big": zoom = 1.05; break;
			case "vbig": zoom = 1.1; break;
			case "ebig": zoom = 1.2; break;
			case "eebig": zoom = 1.5; break;
			case "eeebig": zoom = 1.8; break;
			case "eeeebig": zoom = 2; break;
			default: zoom = 1;
		}
		Game.documentZoom = Game.deviceZoom * zoom;
		UI.updatez();
		if (Array.isArray(Library.onresize)) {
			Library.onresize.forEach(fun => {
				if (typeof fun == "function") fun();
			});
		}
	}
};
