import { lib, game, ui, get, ai, _status } from "../../noname.js";

const dynamicTranslates = {
	dcjianxiong(player) {
		return "当你受到伤害后，你可以摸" + get.cnNumber(player.countMark("dcjianxiong") + 1) + "张牌并获得对你造成伤害的牌，然后你令此技能摸牌数+1（至多为5）。";
	},
	dcbenxi(player) {
		if(player.storage.dcbenxi) return "转换技，锁定技。当你失去手牌后，阴：系统随机检索出一句转换为拼音后包含“wu,yi”的技能台词，然后你念出此台词。<span class='bluetext'>阳：你获得上次所念出的台词对应的技能；若你已拥有该技能，则改为对其他角色各造成1点伤害。</span>";
		return "转换技，锁定技。当你失去手牌后，<span class='bluetext'>阴：系统随机检索出一句转换为拼音后包含“wu,yi”的技能台词，然后你念出此台词。</span>阳：你获得上次所念出的台词对应的技能；若你已拥有该技能，则改为对其他角色各造成1点伤害。";
	},
};
export default dynamicTranslates;
