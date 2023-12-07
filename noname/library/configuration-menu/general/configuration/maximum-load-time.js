import { Game } from "../../../../game.js";
import { Library } from "../../../../library.js";
import { ITEM } from "./maximum-load-time/item.js";

export const MAXIMUM_LOAD_TIME = {
	name: "最长载入时间",
	intro: "设置游戏从启动到完成载入所需的最长时间，超过此时间未完成载入会报错，若设备较慢或安装了较多扩展可适当延长此时间",
	init: "5000",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		Game.saveConfig("max_loadtime", item);
		if (item == "5000") {
			localStorage.removeItem(`${Library.configprefix}loadtime`);
		}
		else {
			localStorage.setItem(`${Library.configprefix}loadtime`, item);
		}
	}
};
