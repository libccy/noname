import { Game } from "../game.js";
import { Get } from "../get.js";
import { GameEvent } from "./element/game-event.js";
import { VCard } from "./element/v-card.js";
import { status as _status } from '../status.js';
export const stratagemBuff = {
	cost: new Map([
		["sha", 1],
		["shan", 1],
		["juedou", 2],
		["huogong", 2],
		["tao", 3]
	]),
	/**
	 * @type {Map<string, (event: GameEvent, option: import("./handler-option").HandlerOption) => void>}
	 */
	effect: new Map([
		["sha", (event, option) => {
			if (event.step != 0 || option.state != "end") return;
			Game.log(event.player, "触发了强化效果");
			Game.log(event.card, "抵消所需要的", new VCard({
				name: "shan"
			}), "数+1");
			const map = event.customArgs;
			Game.players.concat(Game.dead).forEach(current => {
				const id = current.playerid;
				if (!map[id]) map[id] = {};
				if (typeof map[id].shanRequired == "number") map[id].shanRequired++;
				else map[id].shanRequired = 2;
			});
		}],
		["shan", (event, option) => {
			if (event.step != 0 || option.state != "end") return;
			Game.log(event.player, "触发了强化效果");
			Game.log("使用", event.card, "时视为两张", new VCard({
				name: "shan"
			}), "的效果");
			event.player.when("useCard").filter(evt => evt == event).then(() => {
				trigger.getParent(2).decrease("shanRequired", 1);
			});
		}],
		["juedou", (event, option) => {
			if (event.step != 0 || option.state != "end") return;
			Game.log(event.player, "触发了强化效果");
			Game.log("对", event.card, "的目标造成伤害时，伤害+1");
			event.player.when({
				source: "damageBegin1"
			}).filter(evt => evt.getParent(2) == event && event.targets.includes(evt.player)).then(() => {
				trigger.increase("num");
			});
		}],
		["huogong", (event, option) => {
			if (event.step != 0 || option.state != "end") return;
			Game.log(event.player, "触发了强化效果");
			Game.log(event.card, "造成的伤害+1");
			event.increase("baseDamage", 1);
		}],
		["tao", (event, option) => {
			if (event.step != 0 || option.state != "end") return;
			Game.log(event.player, "触发了强化效果");
			Game.log(event.card, "回复的体力+1");
			event.increase("baseDamage", 1);
		}]
	]),
	prompt: new Map([
		["sha", () => `抵消所需要的【${Get.translation("shan")}】数+1。`],
		["shan", () => `使用时视为两张【${Get.translation("shan")}】的效果。`],
		["juedou", () => "对此牌的目标造成伤害时，伤害+1。"],
		["huogong", () => "造成的伤害+1。"],
		["tao", () => "回复的体力+1。"]
	])
};
