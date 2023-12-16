import { condition } from "./yingbian/condition.js";
import { Game as game } from '../game.js';
import { status as _status } from '../status.js';
export const yingbian = {
	condition,
	effect: new Map([
		["add", () => {
			trigger.yingbian_addTarget = true;
		}],
		["remove", () => {
			trigger.yingbian_removeTarget = true;
		}],
		["damage", () => {
			if (typeof trigger.baseDamage != "number") trigger.baseDamage = 1;
			trigger.baseDamage++;
			game.log(card, "的伤害值基数+1");
		}],
		["draw", () => {
			player.draw();
		}],
		["gain", () => {
			const cardx = trigger.respondTo;
			if (cardx && cardx[1] && cardx[1].cards && cardx[1].cards.filterInD("od").length) player.gain(cardx[1].cards.filterInD("od"), "gain2");
		}],
		["hit", () => {
			trigger.directHit.addArray(game.players).addArray(game.dead);
			game.log(card, "不可被响应");
		}],
		["all", () => {
			card.yingbian_all = true;
			game.log(card, "执行所有选项");
		}]
	]),
	prompt: new Map([
		["add", "目标+1"],
		["remove", "目标-1"],
		["damage", "伤害+1"],
		["draw", "摸一张牌"],
		["gain", "获得响应的牌"],
		["hit", "此牌不可被响应"],
		["all", "无视条件执行所有选项"]
	])
};
