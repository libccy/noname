import { lib, game, ui, get, ai, _status } from "../../noname.js";

const dynamicTranslates = {
	nzry_juzhan(player) {
		if (player.storage.jdjuqi) return '转换技。阴：准备阶段，你摸三张牌；其他角色的准备阶段，其可以展示并交给你一张黑色手牌。<span class="bluetext">阳：准备阶段，你令你本回合使用牌无次数限制且造成的伤害+1；其他角色的准备阶段，其可以展示并交给你一张红色手牌。</span>';
		return '转换技。<span class="bluetext">阴：准备阶段，你摸三张牌；其他角色的准备阶段，其可以展示并交给你一张黑色手牌。</span>阳：准备阶段，你令你本回合使用牌无次数限制且造成的伤害+1；其他角色的准备阶段，其可以展示并交给你一张红色手牌。';
	},
};
export default dynamicTranslates;
