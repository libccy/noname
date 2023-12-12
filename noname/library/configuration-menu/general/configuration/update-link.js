import { Game } from "../../../../game.js";
import { Library } from "../../../../library.js";
import { updateURLs } from "../../../update-urls.js";
import { ITEM } from "./update-link/item.js";

export const UPDATE_LINK = {
	name: "更新地址",
	init: "coding",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		Game.saveConfig("update_link", item);
		Library.updateURL = updateURLs[item] || updateURLs.coding;
	}
};
