import { lib, game, ui, get, ai, _status } from "../../noname.js";

const dynamicTranslates = {
	dcjianxiong(player) {
		return "当你受到伤害后，你可以摸" + get.cnNumber(player.countMark("dcjianxiong") + 1) + "张牌并获得对你造成伤害的牌，然后你令此技能摸牌数+1（至多为5）。";
	},
};
export default dynamicTranslates;
