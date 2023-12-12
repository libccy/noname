import { ITEM } from "./target-shake/item.js";

export const TARGET_SHAKE = {
	name: "目标效果",
	intro: "一名玩家成为卡牌或技能的目标时的显示效果",
	init: "off",
	item: ITEM,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("target_shake", bool);
		ui.arena.dataset.target_shake = bool;
	}
};
