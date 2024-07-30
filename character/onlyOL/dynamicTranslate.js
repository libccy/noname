import { lib, game, ui, get, ai, _status } from "../../noname.js";

const dynamicTranslates = {
    oljinghua(player) {
        const storage = player.storage.oljinghua;
        var str = "当其他角色获得你的牌后，其";
        str += storage ? "失去" : "回复";
        str += "1点体力。";
        if (!storage) str += "当你失去最后的手牌后，你可以将此技能描述中的“回复”改为“失去”。";
        return str;
    },
    olshuiyue(player) {
        const storage = player.storage.olshuiyue;
        var str = "当其他角色受到你造成的伤害后，其";
        str += storage ? "弃置" : "摸";
        str += "一张牌。";
        if (!storage) str += "当你令其他角色进入濒死状态后，你可以将此技能描述中的“摸”改为“弃置”。";
        return str;
    },
};
export default dynamicTranslates;
