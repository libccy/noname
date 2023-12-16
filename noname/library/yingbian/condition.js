import { Game as game } from '../../game.js';
import { Get as get } from '../../get.js';
import { Library as lib } from '../../library.js';
import { status as _status } from '../../status.js';
import { UI as ui } from '../../ui.js';
export const condition = {
	color: new Map([
		["zhuzhan", "wood"],
		["kongchao", "soil"],
		["fujia", "orange"],
		["canqu", "fire"],
		["force", "metal"]
	]),
	complex: new Map([
		["zhuzhan", function (event) {
			const yingbianZhuzhan = game.createEvent("yingbianZhuzhan");
			yingbianZhuzhan.player = event.player;
			yingbianZhuzhan.card = event.card;
			yingbianZhuzhan._trigger = event;
			yingbianZhuzhan.yingbianZhuzhanAI = event.yingbianZhuzhanAI;
			yingbianZhuzhan.afterYingbianZhuzhan = event.afterYingbianZhuzhan;
			yingbianZhuzhan.setContent(() => {
				"step 0"
				event._global_waiting = true;
				event.send = (player, card, source, targets, id, id2, yingbianZhuzhanAI, skillState) => {
					if (skillState) player.applySkills(skillState);
					var type = get.type2(card), str = get.translation(source);
					if (targets && targets.length) str += `对${get.translation(targets)}`;
					str += `使用了${get.translation(card)}，是否弃置一张${get.translation(type)}为其助战？`;
					player.chooseCard({
						filterCard: (card, player) => get.type2(card) == type && lib.filter.cardDiscardable(card, player),
						prompt: str,
						position: "h",
						_global_waiting: true,
						id: id,
						id2: id2,
						ai: typeof yingbianZhuzhanAI == "function" ? yingbianZhuzhanAI(player, card, source, targets) : cardx => {
							var info = get.info(card);
							if (info && info.ai && info.ai.yingbian) {
								var ai = info.ai.yingbian(card, source, targets, player);
								if (!ai) return 0;
								return ai - get.value(cardx);
							}
							else if (get.attitude(player, source) <= 0) return 0;
							return 5 - get.value(cardx);
						}
					});
					if (!game.online) return;
					_status.event._resultid = id;
					game.resume();
				};
				"step 1"
				var type = get.type2(card);
				event.list = game.filterPlayer(current => current != player && current.countCards("h") && (_status.connectMode || current.hasCard(cardx => get.type2(cardx) == type, "h"))).sortBySeat(_status.currentPhase || player);
				event.id = get.id();
				"step 2"
				if (!event.list.length) event.finish();
				else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] == game.me)) event.goto(4);
				else event.send(event.current = event.list.shift(), event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
				"step 3"
				if (result.bool) {
					event.zhuzhanresult = event.current;
					event.zhuzhanresult2 = result;
					if (event.current != game.me) game.delayx();
					event.goto(8);
				}
				else event.goto(2);
				"step 4"
				var id = event.id, sendback = (result, player) => {
					if (result && result.id == id && !event.zhuzhanresult && result.bool) {
						event.zhuzhanresult = player;
						event.zhuzhanresult2 = result;
						game.broadcast("cancel", id);
						if (_status.event.id == id && _status.event.name == "chooseCard" && _status.paused) return () => {
							event.resultOL = _status.event.resultOL;
							ui.click.cancel();
							if (ui.confirm) ui.confirm.close();
						};
					}
					else if (_status.event.id == id && _status.event.name == "chooseCard" && _status.paused) return () => event.resultOL = _status.event.resultOL;
				}, withme = false, withol = false, list = event.list;
				for (var i = 0; i < list.length; i++) {
					var current = list[i];
					if (current.isOnline()) {
						withol = true;
						current.wait(sendback);
						current.send(event.send, current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI, get.skillState(current));
						list.splice(i--, 1);
					}
					else if (current == game.me) {
						withme = true;
						event.send(current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
						list.splice(i--, 1);
					}
				}
				if (!withme) event.goto(6);
				if (_status.connectMode && (withme || withol)) game.players.forEach(value => {
					if (value != player) value.showTimer();
				});
				event.withol = withol;
				"step 5"
				if (!result || !result.bool || event.zhuzhanresult) return;
				game.broadcast("cancel", event.id);
				event.zhuzhanresult = game.me;
				event.zhuzhanresult2 = result;
				"step 6"
				if (event.withol && !event.resultOL) game.pause();
				"step 7"
				game.players.forEach(value => value.hideTimer());
				"step 8"
				if (event.zhuzhanresult) {
					var target = event.zhuzhanresult;
					target.line(player, "green");
					target.discard(event.zhuzhanresult2.cards).discarder = target;
					if (typeof event.afterYingbianZhuzhan == "function") event.afterYingbianZhuzhan(event, trigger);
					var yingbianCondition = event.name.slice(8).toLowerCase(), yingbianConditionTag = `yingbian_${yingbianCondition}_tag`;
					target.popup(yingbianConditionTag, lib.yingbian.condition.color.get(yingbianCondition));
					game.log(target, "响应了", player, "发起的", yingbianConditionTag);
					target.addExpose(0.2);
					event.result = {
						bool: true
					}
				}
				else event.result = {
					bool: false
				};
			});
			yingbianZhuzhan._args = Array.from(arguments);
			return yingbianZhuzhan;
		}]
	]),
	simple: new Map([
		["kongchao", event => !event.player.countCards("h")],
		["fujia", event => event.player.isMaxHandcard()],
		["canqu", event => event.player.getHp() == 1]
	])
};
