import { ITEM } from "./card-temporary-name/item.js";

export const CARD_TEMPORARY_NAME = {
	name: "视为卡牌名称显示",
	intro: "显示强制视为类卡牌（如武魂），包括拆顺对话框内的判定牌（国色）转换等名称的显示方式",
	init: "image",
	unfrequent: true,
	item: ITEM,
	onclick(item) {
		game.saveConfig("cardtempname", item);
		if (!game.me || !game.me.getCards) return;
		var hs = game.me.getCards("h");
		for (var i = 0; i < hs.length; i++) {
			if (hs[i]._tempName) {
				switch (item) {
					case "default":
					case "horizon":
					case "image":
						ui.create.cardTempName(hs[i]);
						break;
					default:
						hs[i]._tempName.delete();
						delete hs[i]._tempName;
				}
			}
		}
	}
};
