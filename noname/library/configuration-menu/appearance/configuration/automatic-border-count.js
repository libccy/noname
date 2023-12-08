import { ITEM } from "./automatic-border-count/item.js";

const introduction = document.createElement("body");
const kill = document.createElement("strong");
kill.textContent = "击杀";
introduction.append(kill, " 每击杀一人，边框提升两级", document.createElement("br"));
const damage = document.createElement("strong");
damage.textContent = "伤害";
introduction.append(damage, " 每造成两点伤害，边框提升一级", document.createElement("br"));
const mix = document.createElement("strong");
mix.textContent = "混合";
introduction.append(mix, " 击杀量决定边框颜色，伤害量决定边框装饰");

export const AUTOMATIC_BORDER_COUNT = {
	name: "边框升级方式",
	intro: introduction.innerHTML,
	init: "kill",
	item: ITEM,
	unfrequent: true
};
