import { Game } from "../../../../game.js";
import { status } from "../../../../status.js";
import { Click } from "../../../../ui/click.js";
import { ITEM } from "./change-skin-automatically/item.js";

export const CHANGE_SKIN_AUTOMATICALLY = {
	name: "自动换肤",
	init: "off",
	item: ITEM,
	intro: "游戏每进行一段时间自动为一个随机角色更换皮肤",
	onclick(item) {
		Game.saveConfig("change_skin_auto", item);
		clearTimeout(status.skintimeout);
		if (item != "off") {
			status.skintimeout = setTimeout(Click.autoskin, parseInt(item));
		}
	}
};
