import { lib, game, ui, get, ai, _status } from "../../noname.js";

const dynamicTranslates = {
	yizan_use(player) {
		if (player.storage.yizan) return "你可以将一张基本牌当做任意基本牌使用或打出。";
		return "你可以将两张牌（其中至少一张为基本牌）当做任意基本牌使用或打出。";
	},
	miaojian(player) {
		return ["出牌阶段限一次。你可将一张【杀】当做刺【杀】使用，或将一张锦囊牌当做【无中生有】使用。", "出牌阶段限一次。你可将一张基本牌当做刺【杀】使用，或将一张非基本牌当做【无中生有】使用。", "出牌阶段限一次。你可视为使用一张刺【杀】或【无中生有】。"][player.countMark("miaojian")];
	},
	shhlianhua(player) {
		return ["当你成为【杀】的目标后，你摸一张牌。", "当你成为【杀】的目标后，你摸一张牌。然后你进行判定，若结果为黑桃，则此【杀】对你无效。", "当你成为【杀】的目标后，你摸一张牌。然后此【杀】的使用者选择一项：①弃置一张牌。②令此【杀】对你无效。"][player.countMark("shhlianhua")];
	},
	spshidi(player) {
		if (player.countMark("spshidi") % 2 == 0) return '转换技，锁定技。①准备阶段/结束阶段开始时，若你发动此分支的累计次数为奇数/偶数，则你获得一个“☯”。<span class="bluetext">②若你的“☯”数为偶数，则你至其他角色的距离-1，且你使用的黑色【杀】不可被响应。</span>③若你的“☯”数为奇数，则其他角色至你的距离+1，且你不可响应红色【杀】。';
		return '转换技，锁定技。①准备阶段/结束阶段开始时，若你发动此分支的累计次数为奇数/偶数，则你获得一个“☯”。②若你的“☯”数为偶数，则你至其他角色的距离-1，且你使用的黑色【杀】不可被响应。<span class="bluetext">③若你的“☯”数为奇数，则其他角色至你的距离+1，且你不可响应红色【杀】。</span>';
	},
	mobilexingxue(player) {
		return lib.translate[(player.storage.mobileyanzhu ? "mobilexingxuex" : "mobilexingxue") + "_info"];
	},
	shoufa(player) {
		const zhoufa = player.storage.zhoulin_zhoufa;
		const nodoudizhu = get.mode() == "doudizhu" ? "与你距离大于/不大于1的" : "与你距离大于/不大于2的";
		if (!zhoufa) return "当你受到伤害后/于一回合首次造成伤害后，你可以选择一名" + nodoudizhu + "角色，令其随机执行以下一项：豹，令其受到1点无来源伤害；鹰，你随机获得其一张牌；熊，你随机弃置其装备区的一张牌；兔，令其摸一张牌。";
		let str = "当你受到伤害后/于一回合首次造成伤害后，你可以选择一名" + nodoudizhu + "角色，";
		str += ["令其受到1点无来源伤害", "你随机获得其一张牌", "你随机弃置其装备区的一张牌", "令其摸一张牌"][["豹", "鹰", "熊", "兔"].indexOf(zhoufa)];
		return str + "。";
	},
	mbxuetu(player) {
		const xuetu = player.storage.mbxuetu,
			status = player.countMark("mbxuetu_status");
		if (status === 0) {
			if (!xuetu) return '转换技。出牌阶段限一次，<span class="bluetext">阴：你可以弃置一张牌，然后令一名角色回复1点体力；</span>阳：你可以失去1点体力，然后令一名角色摸两张牌。';
			return '转换技。出牌阶段限一次，阴：你可以弃置一张牌，然后令一名角色回复1点体力；<span class="bluetext">阳：你可以失去1点体力，然后令一名角色摸两张牌。</span>';
		} else if (status === 1) {
			return lib.translate.mbxuetu_achieve_info;
		} else {
			if (!xuetu) return '转换技。出牌阶段限一次，<span class="bluetext">阴：你可以回复1点体力，然后令一名角色弃置两张牌；</span>阳：你可以摸一张牌，然后对一名角色造成1点伤害。';
			return '转换技。出牌阶段限一次，阴：你可以回复1点体力，然后令一名角色弃置两张牌；<span class="bluetext">阳：你可以摸一张牌，然后对一名角色造成1点伤害。</span>';
		}
	},
	mbzuoyou(player) {
		const mbzuoyou = player.storage.mbzuoyou;
		if (mbzuoyou) return '转换技。出牌阶段限一次，阴：你可以令一名角色摸两张牌，然后其弃置一张牌；<span class="bluetext">阳：你可以令一名手牌数不少于二的角色弃置两张手牌，然后其获得1点护甲。</span>';
		return '转换技。出牌阶段限一次，<span class="bluetext">阴：你可以令一名角色摸两张牌，然后其弃置一张牌；</span>阳：你可以令一名手牌数不少于二的角色弃置两张手牌，然后其获得1点护甲。';
	},
};
export default dynamicTranslates;
