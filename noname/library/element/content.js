import { ai } from "../../ai/index.js";
import { get } from "../../get/index.js";
import { game } from "../../game/index.js";
import { lib } from "../index.js";
import { _status } from "../../status/index.js";
import { ui } from "../../ui/index.js";
import { gnc } from "../../gnc/index.js";

// 未来再改
export const Content = {
	emptyEvent: async event => {
		await event.trigger(event.name);
	},
	chooseNumbers: function () {
		"step 0";
		event.numbers = [];
		if (event["chooseTime"] && _status.connectMode && !game.online) {
			event.time = lib.configOL.choose_timeout;
			game.broadcastAll(function (time) {
				lib.configOL.choose_timeout = time;
			}, event["chooseTime"]);
		}
		if (event.isMine()) {
			_status.imchoosing = true;
			event.settleed = false;
			event.dialog = ui.create.dialog(event.prompt || "请调整以下数值", "forcebutton", "hidden");
			if (event.prompt2) event.dialog.addText(event.prompt2);
			event.switchToAuto = function () {
				if (!event.filterOk(event)) {
					if (!event.forced) event._result = { bool: false };
					else event._result = "ai";
				} else {
					event._result = { bool: true, numbers: event.numbers };
				}
				event.dialog.close();
				if (ui.confirm) ui.confirm.close();
				game.resume();
				_status.imchoosing = false;
			};

			function optionUpdate(select) {
				var index = parseInt(select.id.slice(6));
				var item = event.list[index],
					thisNum = event.numbers[index];
				while (select.childElementCount) select.removeChild(select.firstChild);
				if (Array.isArray(item)) {
					var sort = item.sort((a, b) => a - b);
					if (!thisNum) {
						thisNum = sort[0];
						event.numbers.splice(index, 1, thisNum);
					}
					for (var num of sort) {
						var option = document.createElement("option");
						option.innerHTML = num;
						if (event["optprompt"]) {
							if (typeof event["optprompt"] == "string") {
								option.innerHTML = event["optprompt"].replace("#", num).replace("$", get.cnNumber(num, true));
							} else if (typeof event["optprompt"] == "function") {
								option.innerHTML = event["optprompt"](num, index);
							}
						}
						option.value = num;
						if (num == thisNum) option.selected = true;
						if (!event.filterSelect(num, index, event)) option.disabled = true;
						select.appendChild(option);
					}
				} else {
					var max = item.max || 9;
					if (!thisNum) {
						thisNum = item.min || 0;
						event.numbers.splice(index, 1, thisNum);
					}
					if (event.terminal) var actual = event.terminal - event.numbers.reduce((sum, num) => sum + num, 0) + thisNum;
					for (var num = item.min || 0; num <= Math.min(actual || max, max); num += item.base || 1) {
						var option = document.createElement("option");
						option.innerHTML = num;
						if (event["optprompt"]) {
							if (typeof event["optprompt"] == "string") {
								option.innerHTML = event["optprompt"].replace("#", num).replace("$", get.cnNumber(num, true));
							} else if (typeof event["optprompt"] == "function") {
								option.innerHTML = event["optprompt"](num, index);
							}
						}
						option.value = num;
						if (num == thisNum) option.selected = true;
						if (!event.filterSelect(num, index, event)) option.disabled = true;
						select.appendChild(option);
					}
				}
			}

			for (var index = 0; index < event.list.length; index++) {
				event.numbers.push(void 0);
				event.dialog.addText(event.list[index].prompt || "选择一个数值");
				var select = document.createElement("select");
				select.id = `select${index}`;
				select.classList.add("add-setting");
				select.style.margin = "0";
				select.style.width = "30%";
				select.style.position = "relative";
				select.onchange = function () {
					event.numbers[parseInt(this.id.slice(6))] = parseInt(this.value);
					for (var index = 0; index < event.list.length; index++) optionUpdate(event.dialog.content.querySelector(`[id = 'select${index}']`));
					if (event.filterOk(event)) {
						ui.create.confirm("o");
					} else {
						if (!event.forced) ui.create.confirm("c");
						else if (ui.confirm) ui.confirm.close();
					}
				};
				optionUpdate(select);
				event.dialog.content.appendChild(select);
			}
			event.dialog.add(" <br> ");
			event.dialog.open();
			event.custom.replace.confirm = function (bool) {
				if (bool) event._result = { bool: true, numbers: event.numbers };
				else event._result = { bool: false };
				event.dialog.close();
				if (ui.confirm) ui.confirm.close();
				game.resume();
				_status.imchoosing = false;
			};
			if (event.filterOk(event)) {
				ui.create.confirm("o");
			} else {
				if (!event.forced) ui.create.confirm("c");
				else if (ui.confirm) ui.confirm.close();
			}
			game.pause();
			game.countChoose();
			event.choosing = true;
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		if (event.time)
			game.broadcastAll(function (time) {
				lib.configOL.choose_timeout = time;
			}, event.time);
		var _result = event.result || result;
		if ((!_result || _result == "ai" || (event.forced && !_result.bool)) && event.processAI) {
			var numbers = event.processAI(event);
			if (numbers) _result = { numbers: numbers, bool: true };
			else _result = { bool: false };
		}
		event.result = _result;
	},
	//变更武将牌
	async changeCharacter(event, trigger, player) {
		const rawPairs = [player.name1];
		if (player.name2 && lib.character[player.name2]) rawPairs.push(player.name2);
		event.rawPairs = rawPairs;
		const newPairs = event.newPairs;
		for (let name of newPairs) {
			if (!lib.character[name]) {
				console.warn(`警告：Player[${player.name}]试图将武将牌变更为不存在的武将:`, name);
				return;
			}
		}
		const removeSkills = [],
			addSkills = [];
		//进行Log
		if (event.log !== false) {
			//变更前后数量相同的情况
			if (rawPairs.length == newPairs.length) {
				for (let i = 0; i < Math.min(2, rawPairs.length); i++) {
					let rawName = rawPairs[i],
						newName = newPairs[i];
					if (rawName != newName) {
						game.log(player, `将${i == 0 ? "主" : "副"}将从`, `#b${get.translation(rawName)}`, "变更为了", `#b${get.translation(newName)}`);
					}
				}
			} else if (rawPairs.length == 1 && newPairs.length == 2) {
				game.log(player, "将单将", `#b${get.translation(rawPairs[0])}`, "变更为了双将", `#b${get.translation(newPairs[0])}+${get.translation(newPairs[1])}`);
			} else if (rawPairs.length == 2 && newPairs.length == 1) {
				game.log(player, "将双将", `#b${get.translation(rawPairs[0])}+${get.translation(rawPairs[1])}`, "变更为了单将", `#b${get.translation(newPairs[0])}`);
			}
		}
		//确定要失去和获得的技能
		//失去技能时全部失去，但获得技能时，非主公角色不能获得主公技。
		rawPairs.forEach(name => {
			removeSkills.addArray(lib.character[name][3]);
		});
		newPairs.forEach(name => {
			addSkills.addArray(
				lib.character[name][3].filter(skill => {
					const info = get.info(skill);
					if (!info || (info.zhuSkill && !player.isZhu2())) return false;
					return true;
				})
			);
		});
		//实际变更武将牌
		player.reinit2(newPairs);
		//操作武将牌堆
		if (_status.characterlist) {
			_status.characterlist.removeArray(newPairs);
			_status.characterlist.addArray(rawPairs);
		}
		//变更一下获得前后的技能
		await player.changeSkills(addSkills, removeSkills);
		//变更角色的所属势力。如果新将是双势力，重选一下势力。
		if (event.changeGroup !== false) {
			let newGroups = [];
			if (!player.isUnseen(1)) {
				newGroups = get.is.double(player.name1, true) || [get.character(player.name1, 1)];
			} else if (player.name2 && !player.isUnseen(2)) {
				newGroups = get.is.double(player.name2, true) || [get.character(player.name2, 1)];
			}
			if (newGroups.length > 1) {
				const newGroup = await player.chooseControl(newGroups).set("prompt", "请选择一个新的势力").forResult("control");
				if (newGroup != player.group) {
					await player.changeGroup(newGroup);
				}
			} else if (newGroups.length == 1 && newGroups[0] != player.group) {
				await player.changeGroup(newGroups[0]);
			}
		}
	},
	//变更技能
	async changeSkills(event, trigger, player) {
		//获取玩家当前已有的技能
		const ownedSkills = player.getSkills(true, false, false);
		//去重检查
		event.addSkill.unique();
		event.removeSkill.unique();
		//避免失去还没拥有的技能
		event.removeSkill = event.removeSkill.filter(skill => ownedSkills.includes(skill));
		const duplicatedSkills = event.addSkill.filter(skill => event.removeSkill.includes(skill));
		if (duplicatedSkills.length) {
			event.addSkill.removeArray(duplicatedSkills);
			event.removeSkill.removeArray(duplicatedSkills);
		}
		//if (!event.addSkill.length&&!event.removeSkill.length) return;
		//手动触发时机
		await event.trigger("changeSkillsBefore");
		await event.trigger("changeSkillsBegin");
		//处理失去和获得的技能
		if (event.$handle) {
			event.$handle(player, event.addSkill, event.removeSkill, event);
		} else {
			if (event.addSkill.length) {
				player.addSkill(event.addSkill);
				game.log(
					player,
					"获得了技能",
					...event.addSkill
						.filter(i => i in lib.translate)
						.map(i => {
							return "#g【" + get.translation(i) + "】";
						})
				);
			}
			if (event.removeSkill.length) {
				player.removeSkill(event.removeSkill);
				game.log(
					player,
					"失去了技能",
					...event.removeSkill
						.filter(i => i in lib.translate)
						.map(i => {
							return "#g【" + get.translation(i) + "】";
						})
				);
			}
		}
		//手动触发时机
		await event.trigger("changeSkillsEnd");
		await event.trigger("changeSkillsAfter");
	},
	//增加明置手牌
	addShownCards: () => {
		const hs = player.getCards("h"),
			showingCards = event._cards.filter(showingCard => hs.includes(showingCard)),
			shown = player.getShownCards();
		event.gaintag.forEach(tag => player.addGaintag(showingCards, tag));
		if (!(event.cards = showingCards.filter(showingCard => !shown.includes(showingCard))).length) return;
		game.log(player, "明置了", event.cards);
		//if (event.animate != false) player.$give(event.cards, player, false);
		event.trigger("addShownCardsAfter");
	},
	//隐藏明置手牌
	hideShownCards: () => {
		var shown = player.getShownCards(),
			hidingCards = event._cards.filter(hidingCard => shown.includes(hidingCard));
		if (!hidingCards.length) return;
		if (event.gaintag.length) event.gaintag.forEach(tag => player.removeGaintag(tag, hidingCards));
		else {
			var map = hidingCards.reduce((constructingMap, hidingCard) => {
				hidingCard.gaintag.forEach(tag => {
					if (!tag.startsWith("visible_")) return;
					if (!constructingMap[tag]) constructingMap[tag] = [];
					constructingMap[tag].push(hidingCard);
				});
				return constructingMap;
			}, {});
			Object.keys(map).forEach(key => player.removeGaintag(key, map[key]));
		}
		hidingCards.removeArray(player.getShownCards());
		if (!hidingCards.length) return;
		game.log(player, "取消明置了", (event.cards = hidingCards));
		//if (event.animate != false) player.$give(hidingCards, player, false);
		event.trigger("hideShownCardsAfter");
	},
	//Execute the delay card effect
	//执行延时锦囊牌效果
	//TODO: 修改此处的虚拟牌/实体牌判断
	executeDelayCardEffect: () => {
		"step 0";
		target.$phaseJudge(card);
		event.cancelled = false;
		event.trigger("executeDelayCardEffect");
		event.cardName = card.viewAs || card.name;
		target.popup(event.cardName, "thunder");
		if (!lib.card[event.cardName].effect) {
			game.delay();
			event.finish();
		} else if (!lib.card[event.cardName].judge) {
			game.delay();
			event.nojudge = true;
		}
		"step 1";
		if (event.cancelled || event.nojudge) return;
		var next = player.judge(card),
			judge = event.judge;
		if (typeof judge == "function") next.judge = judge;
		var judge2 = event.judge2;
		if (typeof judge2 == "function") next.judge2 = judge2;
		"step 2";
		if (event.excluded) delete event.excluded;
		else {
			var cardName = event.cardName;
			if (event.cancelled && !event.direct) {
				var cardCancel = lib.card[cardName].cancel;
				if (cardCancel) {
					var next = game.createEvent(`${cardName}Cancel`);
					next.setContent(cardCancel);
					next.cards = [card];
					if (!card.viewAs) {
						var autoViewAs = (next.card = get.autoViewAs(card));
						autoViewAs.expired = card.expired;
					} else {
						var autoViewAs = (next.card = get.autoViewAs(
							{
								name: cardName,
							},
							next.cards
						));
						autoViewAs.expired = card.expired;
					}
					next.player = player;
				}
			} else {
				var next = game.createEvent(cardName);
				next.setContent(lib.card[cardName].effect);
				next._result = result;
				next.cards = [card];
				if (!card.viewAs) {
					var autoViewAs = (next.card = get.autoViewAs(card));
					autoViewAs.expired = card.expired;
				} else {
					var autoViewAs = (next.card = get.autoViewAs(
						{
							name: cardName,
						},
						next.cards
					));
					autoViewAs.expired = card.expired;
				}
				next.player = player;
			}
		}
		ui.clear();
		card.delete();
	},
	//Gift
	//赠予
	gift: () => {
		"step 0";
		event.num = 0;
		"step 1";
		if (num < cards.length) {
			event.card = cards[num];
			event.trigger("gift");
		} else {
			game.delayx();
			event.finish();
		}
		"step 2";
		if (event.deniedGifts.includes(card)) {
			game.log(target, "拒绝了", player, "赠予的", card);
			event.trigger("giftDeny");
			player.loseToDiscardpile(card).log = false;
			event.trigger("giftDenied");
			return;
		}
		game.log(player, "将", card, "赠予了", target);
		player.$give(card, target, false);
		game.delay(0.5);
		event.trigger("giftAccept");
		if (get.type(card) == "equip") target.equip(card).log = false;
		else target.gain(card, player).visible = true;
		event.trigger("giftAccepted");
		"step 3";
		event.num++;
		event.goto(1);
	},
	//Recast
	//重铸
	recast: () => {
		"step 0";
		game.log(player, "重铸了", cards);
		if (typeof event.recastingLose != "function") return;
		event.trigger("recastingLose");
		event.recastingLose(player, cards);
		event.trigger("recastingLost");
		event.recastingLosingEvents.push(...event.next.filter(value => value.name != "arrangeTrigger"));
		"step 1";
		event.trigger("recast");
		"step 2";
		if (typeof event.recastingGain != "function") return;
		event.trigger("recastingGain");
		event.recastingGain(player, cards);
		event.trigger("recastingGained");
		event.recastingGainingEvents.push(...event.next.filter(value => value.name != "arrangeTrigger"));
	},
	//装备栏相关
	disableEquip: function () {
		"step 0";
		event.cards = [];
		event.num = 0;
		event.slotsx = [];
		if (get.is.mountCombined()) {
			event.slots.forEach(type => {
				if (type == "equip3" || type == "equip4") event.slotsx.add("equip3_4");
				else event.slotsx.add(type);
			});
		} else {
			event.slotsx.addArray(event.slots);
		}
		event.slotsx.sort();
		if (!event.slots.length) event.finish();
		"step 1";
		var slot = event.slotsx[event.num];
		var slot_key = slot;
		var left = player.countEnabledSlot(slot),
			lose;
		if (slot == "equip3_4") {
			lose = Math.min(left, Math.max(get.numOf(event.slots, "equip3"), get.numOf(event.slots, "equip4")));
			slot_key = "equip3";
		} else lose = Math.min(left, get.numOf(event.slots, slot));
		if (lose <= 0) event.goto(3);
		else {
			game.log(player, "废除了" + get.cnNumber(lose) + "个", "#g" + get.translation(slot) + "栏");
			if (!player.disabledSlots) player.disabledSlots = {};
			if (!player.disabledSlots[slot_key]) player.disabledSlots[slot_key] = 0;
			player.disabledSlots[slot_key] += lose;
			var cards = player.getEquips(slot).filter(card => !event.cards.includes(card));
			if (cards.length > 0) {
				if (lose >= left) {
					event._result = { bool: true, links: cards };
				} else if (cards.length > left - lose) {
					var source = event.source,
						num = cards.length - (left - lose);
					if (!source || !source.isIn()) source = player;
					source
						.chooseButton(["选择" + (player == source ? "你" : get.translation(player)) + "的" + get.cnNumber(num) + "张" + get.translation(slot) + "牌置入弃牌堆", cards], true, [1, num])
						.set("filterOk", function () {
							var evt = _status.event;
							return (
								ui.selected.buttons.reduce(function (num, button) {
									if (evt.slot == "equip3_4") return num + Math.max(get.numOf(get.subtypes(button.link, false), "equip3"), get.numOf(get.subtypes(button.link, false), "equip4"));
									return num + get.numOf(get.subtypes(button.link, false), evt.slot);
								}, 0) == evt.required
							);
						})
						.set("required", num)
						.set("slot", slot);
				} else event.goto(3);
			} else event.goto(3);
		}
		"step 2";
		if (result.bool) event.cards.addArray(result.links);
		"step 3";
		event.num++;
		if (event.num < event.slotsx.length) event.goto(1);
		else {
			player.$syncDisable();
			if (cards.length > 0) player.loseToDiscardpile(cards);
		}
	},
	enableEquip: function () {
		if (!event.slots.length) return;
		var slotsx = [...new Set(event.slots)].sort();
		for (var slot of slotsx) {
			var lost = player.countDisabledSlot(slot),
				gain = Math.min(lost, get.numOf(event.slots, slot));
			if (lost <= 0) continue;
			else {
				game.log(player, "恢复了" + get.cnNumber(gain) + "个", "#g" + get.translation(slot) + "栏");
				if (!player.disabledSlots) player.disabledSlots = {};
				if (!player.disabledSlots[slot]) player.disabledSlots[slot] = 0;
				player.disabledSlots[slot] -= gain;
			}
		}
		player.$syncDisable();
	},
	expandEquip: function () {
		if (!event.slots.length) return;
		var slotsx = [];
		if (get.is.mountCombined()) {
			event.slots.forEach(type => {
				if (type == "equip3" || type == "equip4") slotsx.add("equip3_4");
				else slotsx.add(type);
			});
		} else {
			slotsx.addArray(event.slots);
		}
		slotsx.sort();
		for (var slot of slotsx) {
			var expand = get.numOf(event.slots, slot),
				slot_key = slot;
			if (slot == "equip3_4") {
				expand = Math.max(get.numOf(event.slots, "equip3"), get.numOf(event.slots, "equip4"));
				slot_key = "equip3";
			}
			game.log(player, "获得了" + get.cnNumber(expand) + "个额外的", "#g" + get.translation(slot) + "栏");
			if (!player.expandedSlots) player.expandedSlots = {};
			if (!player.expandedSlots[slot_key]) player.expandedSlots[slot_key] = 0;
			player.expandedSlots[slot_key] += expand;
		}
		player.$syncExpand();
	},
	//选择顶装备要顶的牌
	replaceEquip: async function (event, trigger, player) {
		const vcards = event.vcards ?? [event.card];
		const specializedVCards = [],
			normalVCards = [];
		const replacedCards = [];
		vcards.forEach(card => {
			const info = get.info(card, false);
			(info.customSwap ? specializedVCards : normalVCards).push(card);
		});
		specializedVCards.forEach(card => {
			const info = get.info(card, false);
			replacedCards.addArray(player.getVCards("e", card => info.customSwap(card)));
		});
		const types = normalVCards.reduce((types, card) => {
			return types.concat(get.subtypes(card, false));
		}, []);
		if (types.length > 0) {
			const slots = types,
				slotsx = [];
			if (get.is.mountCombined()) {
				slots.forEach(type => {
					if (type == "equip3" || type == "equip4") slotsx.add("equip3_4");
					else slotsx.add(type);
				});
			} else {
				slotsx.addArray(slots);
			}
			slotsx.sort();
			for (const slot of slotsx) {
				let left = player.countEquipableSlot(slot),
					lose;
				if (slot == "equip3_4") lose = Math.min(left, Math.max(get.numOf(slots, "equip3"), get.numOf(slots, "equip4")));
				else lose = Math.min(left, get.numOf(slots, slot));
				let result;
				if (lose <= 0) continue;
				else {
					const cards = player.getVEquips(slot).filter(card => {
						return !replacedCards.includes(card) && lib.filter.canBeReplaced(card, player);
					});
					if (cards.length > 0) {
						if (lose >= left) {
							result = { bool: true, links: cards };
						} else if (cards.length > left - lose) {
							var source = event.source,
								num = cards.length - (left - lose);
							if (!source || !source.isIn()) source = player;
							const chooseEvent = source
								.chooseButton(["选择替换掉" + get.cnNumber(num) + "张" + get.translation(slot) + "装备牌", [cards, "vcard"]], true, [1, num])
								.set("filterOk", function () {
									var evt = _status.event;
									return (
										ui.selected.buttons.reduce(function (num, button) {
											if (evt.slot == "equip3_4") return num + Math.max(get.numOf(get.subtypes(button.link, false), "equip3"), get.numOf(get.subtypes(button.link, false), "equip4"));
											return num + get.numOf(get.subtypes(button.link, false), evt.slot);
										}, 0) == evt.required
									);
								})
								.set("required", num)
								.set("slot", slot);
							result = await chooseEvent.forResult();
						}
					}
				}
				if (result?.links) replacedCards.addArray(result.links);
			}
		}
		event.result = {
			vcards: replacedCards,
			cards: replacedCards.reduce((cards, vcard) => {
				if (vcard.cards) cards.addArray(vcard.cards);
				return cards;
			}, []),
		};
	},
	replaceEquip_old: function () {
		"step 0";
		event.cards = [];
		var types = get.subtypes(card, false);
		if (types.length) {
			var info = get.info(card, false);
			if (info.customSwap) {
				event.cards.addArray(
					player.getCards("e", function (card) {
						return info.customSwap(card);
					})
				);
				event.goto(4);
			} else {
				event.num = 0;
				event.slots = types;
				event.slotsx = [];
				if (get.is.mountCombined()) {
					event.slots.forEach(type => {
						if (type == "equip3" || type == "equip4") event.slotsx.add("equip3_4");
						else event.slotsx.add(type);
					});
				} else {
					event.slotsx.addArray(event.slots);
				}
				event.slotsx.sort();
			}
		} else event.goto(4);
		"step 1";
		var slot = event.slotsx[event.num];
		var left = player.countEquipableSlot(slot),
			lose;
		if (slot == "equip3_4") lose = Math.min(left, Math.max(get.numOf(event.slots, "equip3"), get.numOf(event.slots, "equip4")));
		else lose = Math.min(left, get.numOf(event.slots, slot));
		if (lose <= 0) event.goto(3);
		else {
			var cards = player.getEquips(slot).filter(card => {
				return !event.cards.includes(card) && lib.filter.canBeReplaced(card, player);
			});
			if (cards.length > 0) {
				if (lose >= left) {
					event._result = { bool: true, links: cards };
				} else if (cards.length > left - lose) {
					var source = event.source,
						num = cards.length - (left - lose);
					if (!source || !source.isIn()) source = player;
					source
						.chooseButton(["选择替换掉" + get.cnNumber(num) + "张" + get.translation(slot) + "牌", cards], true, [1, num])
						.set("filterOk", function () {
							var evt = _status.event;
							return (
								ui.selected.buttons.reduce(function (num, button) {
									if (evt.slot == "equip3_4") return num + Math.max(get.numOf(get.subtypes(button.link, false), "equip3"), get.numOf(get.subtypes(button.link, false), "equip4"));
									return num + get.numOf(get.subtypes(button.link, false), evt.slot);
								}, 0) == evt.required
							);
						})
						.set("required", num)
						.set("slot", slot);
				} else event.goto(3);
			} else event.goto(3);
		}
		"step 2";
		if (result.bool) event.cards.addArray(result.links);
		"step 3";
		event.num++;
		if (event.num < event.slotsx.length) event.goto(1);
		"step 4";
		event.result = cards;
	},
	//装备牌
	equip: async function (event, trigger, player) {
		event.visible = true;
		if (event.vcards && !event.cards) {
			event.cards = event.vcards.reduce((cards, vcard) => {
				if (vcard.cards) cards.addArray(vcard.cards);
				return cards;
			}, []);
		}
		//进行第一轮先行判断，让所有装备牌的原主失去装备牌
		if (event.cards) {
			const map = {};
			//第一轮初判断的event.cards会在后面的步骤被覆盖，所以此处安心修改
			if (event.card) {
				const cardx = get.cardPile(cardx => {
					if (cardx[cardx.cardSymbol] !== event.card) return false;
					const owner = get.owner(cardx, "judge");
					return owner && (owner != player || get.position(cardx) != "e");
				}, "field");
				if (cardx) event.cards.add(cardx);
			}
			for (const i of event.cards) {
				var owner = get.owner(i, "judge");
				if (owner && (owner != player || get.position(i) != "e")) {
					var id = owner.playerid;
					if (!map[id]) map[id] = [[], [], []];
					map[id][0].push(i);
					var position = get.position(i);
					if (position == "h") map[id][1].push(i);
					else map[id][2].push(i);
				} else if (!event.updatePile && get.position(i) == "c") event.updatePile = true;
				if (event.visible) i.addKnower("everyone");
			}
			event.losing_map = map;
			for (const i in map) {
				const owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
				const next = owner.lose(map[i][0], ui.special).set("type", "equip").set("forceDie", true).set("getlx", false);
				if (event.visible == true) {
					// @ts-ignore
					next.visible = true;
				}
				await next;
				event.relatedLose = next;
			}
		}
		player.equiping = true;
		const handleEquip = async card => {
			let cards = [];
			// @ts-ignore
			if (get.itemtype(card) === "card") {
				cards = [card];
				card = get.autoViewAs(card, void 0, false);
			} else {
				cards = card.cards ?? [];
			}
			let cardInfo = get.info(card, false);
			if (player.isMin() || !player.canEquip(card)) {
				await game.cardsDiscard(cards);
				delete player.equiping;
				return;
			}
			let audioSubtype = get.subtype(card);
			if (audioSubtype == "equip6") audioSubtype = "equip3";
			// @ts-ignore
			game.broadcastAll(type => {
				if (lib.config.background_audio) {
					// @ts-ignore
					game.playAudio("effect", type);
				}
			}, audioSubtype);
			player.addVirtualEquip(card, cards);
			//player.$equip(card);
			//game.addVideo("equip", player, get.cardInfo(card));
			if (event.log != false) {
				const isViewAsCard = cards.length !== 1 || cards[0].name !== card.name;
				if (isViewAsCard && cards.length) {
					game.log(player, '装备了<span class="yellowtext">' + get.translation(card) + "</span>（", cards, "）");
				} else {
					game.log(player, "装备了", card);
				}
			}
			if (cardInfo.onEquip && (!cardInfo.filterEquip || cardInfo.filterEquip(card, player))) {
				if (Array.isArray(cardInfo.onEquip)) {
					for (var i = 0; i < cardInfo.onEquip.length; i++) {
						var next = game.createEvent("equip_" + card.name);
						next.setContent(cardInfo.onEquip[i]);
						next.player = player;
						next.card = card;
						await next;
					}
				} else {
					var next = game.createEvent("equip_" + card.name);
					next.setContent(cardInfo.onEquip);
					next.player = player;
					next.card = card;
					await next;
				}
				if (cardInfo.equipDelay != false) await game.delayx();
			}
			delete player.equiping;
			if (event.delay) {
				await game.delayx();
			}
		};
		//生成虚拟牌列表
		if (!event.vcards) {
			if (event.card) {
				// @ts-ignore
				if (get.itemtype(event.card) === "card") event.card = get.autoViewAs(event.card, void 0, false);
				event.vcards = [event.card];
			} else event.vcards = event.cards.map(card => get.autoViewAs(card, void 0, false));
		}
		//过滤被销毁的装备牌
		event.vcards = event.vcards.filter(card => {
			let cards;
			// @ts-ignore
			if (get.itemtype(card) === "card") {
				cards = [card];
				card = get.autoViewAs(card);
			} else {
				cards = card.cards ?? [];
			}
			let canMoveOn = true;
			cards.forEach(card => {
				if (card.willBeDestroyed("equip", player, event)) {
					card.selfDestroy(event);
					canMoveOn = false;
					return;
				} else if (canMoveOn) {
					// @ts-ignore
					if ("hejx".includes(get.position(card, true))) {
						canMoveOn = false;
						return;
					}
				}
			});
			return canMoveOn;
		});
		event.cards = event.vcards.reduce((cards, vcard) => {
			if (vcard.cards) cards.addArray(vcard.cards);
			return cards;
		}, []);
		//同时播放所有装备牌的装备动画
		if (event.cards.length) {
			if (event.draw) {
				player.$draw(event.cards);
				await game.delay(0, 300);
			} else {
				// @ts-ignore
				game.broadcast(
					function (cards, player) {
						cards.forEach(card => {
							if (card.clone) {
								card.clone.moveDelete(player);
							}
						});
					},
					event.cards,
					player
				);
				event.cards.forEach(card => {
					if (card.clone) {
						card.clone.moveDelete(player);
						game.addVideo("gain2", player, get.cardsInfo([card.clone]));
					}
				});
			}
		}
		//将多张装备牌的牌替换事件合并为一个，废弃卡牌的replaceEquip自定义事件属性（反正没人用）
		const replaceEquipEvent = game.createEvent("replaceEquip");
		replaceEquipEvent.player = player;
		// @ts-ignore
		replaceEquipEvent.vcards = event.vcards;
		replaceEquipEvent.setContent("replaceEquip");
		const result = await replaceEquipEvent.forResult();
		// @ts-ignore
		if (get.itemtype(result?.cards) == "cards") {
			// @ts-ignore
			event.swapped = true;
			const loseEvent = player.lose(result.cards, "visible").set("type", "equip").set("getlx", false);
			loseEvent.swapEquip = true;
			if (
				event.vcards.some(card => {
					const info = get.info(card, false);
					return info && info.loseThrow;
				})
			) {
				player.$throw(result.cards, 1000);
			}
			await loseEvent;
			// @ts-ignore
			for (let card of result.cards) {
				if (card.willBeDestroyed("discardPile", player, event)) {
					card.selfDestroy(event);
				}
			}
		}
		result?.vcards?.forEach(card => {
			player.removeVirtualEquip(card);
		});
		//然后处理每一张装备牌的装备
		for (const card of event.vcards) {
			event.card = card;
			await handleEquip(card);
		}
		if (event.updatePile) game.updateRoundNumber();
	},
	equip_old: function () {
		"step 0";
		var owner = get.owner(card);
		if (owner) {
			event.owner = owner;
			owner.lose(card, ui.special, "visible").set("type", "equip").set("getlx", false);
		} else if (get.position(card) == "c") event.updatePile = true;
		"step 1";
		if (event.cancelled) {
			event.finish();
			return;
		}
		if (card.willBeDestroyed("equip", player, event)) {
			card.selfDestroy(event);
			event.finish();
			return;
		} else if (event.owner) {
			if (event.owner.getCards("hejsx").includes(card)) {
				event.finish();
				return;
			}
		}
		if (event.draw) {
			game.delay(0, 300);
			player.$draw(card);
		}
		"step 2";
		if (card.clone) {
			game.broadcast(
				function (card, player) {
					if (card.clone) {
						card.clone.moveDelete(player);
					}
				},
				card,
				player
			);
			card.clone.moveDelete(player);
			game.addVideo("gain2", player, get.cardsInfo([card.clone]));
		}
		player.equiping = true;
		"step 3";
		var info = get.info(card, false);
		var next = game.createEvent("replaceEquip");
		next.player = player;
		next.card = card;
		next.setContent(info.replaceEquip || "replaceEquip");
		"step 4";
		var info = get.info(card, false);
		if (get.itemtype(result) == "cards") {
			player.lose(result, "visible").set("type", "equip").set("getlx", false).swapEquip = true;
			if (info.loseThrow) {
				player.$throw(result, 1000);
			}
			event.swapped = true;
		}
		"step 5";
		if (get.itemtype(result) == "cards") {
			for (let card of result) {
				if (card.willBeDestroyed("discardPile", player, event)) {
					card.selfDestroy(event);
				}
			}
		}
		"step 6";
		//if(player.isMin() || player.countCards('e',{subtype:get.subtype(card)})){
		if (player.isMin() || !player.canEquip(card)) {
			game.cardsDiscard(card);
			delete player.equiping;
			event.finish();
			return;
		}
		var subtype = get.subtype(card);
		if (subtype == "equip6") subtype = "equip3";
		game.broadcastAll(function (type) {
			if (lib.config.background_audio) {
				game.playAudio("effect", type);
			}
		}, subtype);
		player.$equip(card);
		game.addVideo("equip", player, get.cardInfo(card));
		if (event.log != false) game.log(player, "装备了", card);
		if (event.updatePile) game.updateRoundNumber();
		"step 7";
		var info = get.info(card, false);
		if (info.onEquip && (!info.filterEquip || info.filterEquip(card, player))) {
			if (Array.isArray(info.onEquip)) {
				for (var i = 0; i < info.onEquip.length; i++) {
					var next = game.createEvent("equip_" + card.name);
					next.setContent(info.onEquip[i]);
					next.player = player;
					next.card = card;
				}
			} else {
				var next = game.createEvent("equip_" + card.name);
				next.setContent(info.onEquip);
				next.player = player;
				next.card = card;
			}
			if (info.equipDelay != false) game.delayx();
		}
		delete player.equiping;
		if (event.delay) {
			game.delayx();
		}
	},
	//装备栏 END
	changeGroup: function () {
		"step 0";
		event.originGroup = player.group;
		if (!event.group) event.group = player.group;
		var group = event.group;
		game.addVideo("changeGroup", player, group);
		player.getHistory("custom").push(event);
		if (event.broadcast !== false) {
			game.broadcast(
				function (player, group) {
					player.group = group;
					player.node.name.dataset.nature = get.groupnature(group);
				},
				player,
				group
			);
		}
		player.group = group;
		player.node.name.dataset.nature = get.groupnature(group);
		if (event.log !== false) game.log(player, "将势力变为了", "#y" + get.translation(group + 2));
	},
	chooseToDebate: function () {
		"step 0";
		event.targets = event.list.filter(function (i) {
			return i.countCards("h") > 0;
		});
		if (!event.targets.length) event.result = { bool: false };
		else {
			if (event.fixedResult) {
				event.targets = event.targets.removeArray(event.fixedResult.map(i => i[0]));
			}
			if (event.targets.length) {
				var next = player
					.chooseCardOL(event.targets, get.translation(player) + "发起了议事，请选择展示的手牌", true)
					.set("type", "debate")
					.set("source", player)
					.set(
						"ai",
						event.ai ||
							function (card) {
								return Math.random();
							}
					)
					.set(
						"aiCard",
						event.aiCard ||
							function (target) {
								const getAi = get.event("ai") || function (card) {
									return Math.random();
								};
								let hs = target.getCards("h").sort((a, b) => getAi(b) - getAi(a));
								return { bool: true, cards: [hs[0]] };
							}
					);
				next._args.remove("glow_result");
			}
			else event.noselected = true;
		}
		"step 1";
		var red = [],
			black = [],
			others = [];
		event.opinions = ["red", "black"];
		event.videoId = lib.status.videoId++;
		if (!event.noselected) {
			for (var i = 0; i < event.targets.length; i++) {
				var card = result[i].cards[0],
					target = event.targets[i];
				if (card == "red" || get.color(card, target) == "red") red.push([target, card]);
				else if (card == "black" || get.color(card, target) == "black") black.push([target, card]);
				else others.push([target, card]);
			}
		}
		if (event.fixedResult) {
			for (var i = 0; i < event.fixedResult.length; i++) {
				var list = event.fixedResult[i];
				if (list[1] == "red" || get.color(list[1], list[0]) == "red") red.push(list);
				else if (list[1] == "black" || get.color(list[1], list[0]) == "black") black.push(list);
				else others.push(list);
				event.targets.push(list[0]);
			}
		}
		event.red = red;
		event.black = black;
		event.others = others;
		if (event.debateIgnore !== false) {
			event.opinions.add("others");
		} else {
			var colors = {};
			for (var list of others) {
				var color = typeof list[1] == "string" ? list[1] : get.color(list[1], list[0]);
				if (!colors[color]) colors[color] = [];
				colors[color].push(list);
			}
			for (var color in colors) {
				event.opinions.add(color);
				event[color] = colors[color];
			}
		}
		event.trigger("debateShowOpinion");
		"step 2";
		for (var color of event.opinions) {
			if (event[color].length) {
				let cards = event[color].filter(i => get.itemtype(i[1]) == "card");
				game.log(
					event[color]
						.map(function (i) {
							return i[0];
						})
						.unique(),
					color == "other" ? "没有意见" : '意见为<span class="firetext">' + get.translation(color) + "</span>",
					cards.length ? "，展示了" : "",
					cards.map(i => i[1])
				);
			}
		}
		game.broadcastAll(
			function (name, id, event) {
				var dialog = ui.create.dialog(name + "发起了议事", "hidden", "forcebutton");
				dialog.videoId = id;
				dialog.classList.add("scroll1");
				dialog.classList.add("scroll2");
				dialog.classList.add("fullwidth");
				var func = function (target) {
					if (target._tempTranslate) return target._tempTranslate;
					var name = target.name;
					if (lib.translate[name + "_ab"]) return lib.translate[name + "_ab"];
					return get.translation(name);
				};
				if (event.opinions.includes("others")) {
					if (event.others.length > 2) {
						dialog.classList.add("fullheight");
					}
					for (var color of event.opinions) {
						if (color == "others" && !event.others.length) continue;
						dialog.addNewRow(
							{ item: get.translation(color), ratio: 1 },
							{
								item: event[color].slice().map(list => {
									let element = get.copy(list[1]);
									if (typeof element == "string") {
										if (!lib.card["debate_" + element]) {
											lib.card["debate_" + element] = {};
											lib.translate["debate_" + element] = get.translation(element);
										}
										element = new lib.element.VCard(game.createCard("debate_" + element, " ", " "));
									}
									element._custom = button => {
										button.querySelector(".info").innerHTML = func(list[0]);
									};
									return element;
								}),
								ratio: 8,
							}
						);
					}
				} else {
					dialog.buttonss = [];
					dialog.add('<div class="text center">意见</div>');
					var buttons = ui.create.div(".buttons", dialog.content);
					dialog.buttonss.push(buttons);
					buttons.classList.add("popup");
					buttons.classList.add("guanxing");
					for (var color of event.opinions) {
						for (var list of event[color]) {
							var button;
							if (typeof list[1] == "string") {
								button = ui.create.button(["", "", list[1]], "vcard", dialog.buttonss[0]);
							} else button = ui.create.button(list[1], "card", dialog.buttonss[0]);
							button.querySelector(".info").innerHTML = func(list[0]);
						}
					}
				}
				dialog.open();
			},
			get.translation(player),
			event.videoId,
			event
		);
		game.delay(4);
		"step 3";
		game.broadcastAll("closeDialog", event.videoId);
		var opinion = event.opinions
			.slice()
			.filter(i => i != "others")
			.sort((a, b) => event[b].length - event[a].length);
		opinion = event[opinion[0]].length > event[opinion[1]].length ? opinion[0] : null;
		if (opinion) game.log(player, "本次发起的议事结果为", opinion == "red" ? '<span class="firetext">红色</span>' : "#g" + get.translation(opinion));
		else game.log(player, "本次发起的议事无结果");
		event.result = {
			bool: true,
			opinion: opinion,
			opinions: event.opinions,
			targets: event.targets,
		};
		for (var color of event.opinions) {
			event.result[color] = event[color];
		}
		"step 4";
		if (event.callback) {
			var next = game.createEvent("debateCallback", false);
			next.player = player;
			next.debateResult = get.copy(event.result);
			next.setContent(event.callback);
		}
	},
	delay: function () {
		game[event.name].apply(game, event._args);
	},
	chooseCooperationFor: function () {
		"step 0";
		var next = player.chooseButton(["选择和" + get.translation(target) + "的协力方式", [event.cardlist, "vcard"]], true);
		next.set(
			"ai",
			event.ai ||
				function () {
					return Math.random();
				}
		);
		"step 1";
		if (result.bool) {
			player.cooperationWith(target, result.links[0][2].slice(12), event.reason);
		}
	},
	chooseToPlayBeatmap: function () {
		"step 0";
		if (game.online) return;
		if (_status.connectMode) event.time = lib.configOL.choose_timeout;
		event.videoId = lib.status.videoId++;
		//给其他角色看的演奏框
		game.broadcastAll(
			function (player, id, beatmap) {
				if (_status.connectMode) lib.configOL.choose_timeout = (Math.ceil((beatmap.timeleap[beatmap.timeleap.length - 1] + beatmap.speed * 100 + (beatmap.current || 0)) / 1000) + 5).toString();
				if (player == game.me) return;
				var str = get.translation(player) + "正在演奏《" + beatmap.name + "》...";
				if (!_status.connectMode) str += "<br>（点击屏幕可以跳过等待AI操作）";
				ui.create.dialog(str).videoId = id;
				if (ui.backgroundMusic) ui.backgroundMusic.pause();
				if (lib.config.background_audio) {
					if (beatmap.filename.startsWith("ext:")) game.playAudio(beatmap.filename);
					else game.playAudio("effect", beatmap.filename);
				}
			},
			player,
			event.videoId,
			event.beatmap
		);
		"step 1";
		var beatmap = event.beatmap;
		if (event.isMine()) {
			var timeleap = beatmap.timeleap.slice(0);
			var current = beatmap.current;
			//获取两个音符的时间间隔
			var getTimeout = function () {
				var time = timeleap.shift();
				var out = time - current;
				current = time;
				return out;
			};
			//初始化一堆变量
			var score = 0;
			var added = timeleap.length;
			var number_of_tracks = beatmap.number_of_tracks || 6;
			var custom_mapping = Array.isArray(beatmap.mapping);
			var mapping = custom_mapping ? beatmap.mapping.slice() : beatmap.mapping;
			var hitsound = beatmap.hitsound || "hitsound.wav";
			if (hitsound.startsWith("ext:")) hitsound = lib.assetURL + "extension/" + hitsound.slice(4);
			else hitsound = lib.assetURL + "audio/effect/" + hitsound;
			var hitsound_audio = new Audio(hitsound);
			hitsound_audio.volume = 0.25;
			var abs = 1;
			var node_pos = 0;
			if (custom_mapping) {
				node_pos = mapping.shift();
			} else if (mapping == "random") {
				abs = get.rand(number_of_tracks);
				node_pos = abs;
			}
			var combo = 0;
			var max_combo = 0;
			var nodes = [];
			var roundmenu = false;
			//隐藏菜单按钮
			if (ui.roundmenu && ui.roundmenu.display != "none") {
				roundmenu = true;
				ui.roundmenu.style.display = "none";
			}
			if (ui.backgroundMusic) ui.backgroundMusic.pause();
			var event = _status.event;
			event.settleed = false;
			//建个框框
			var dialog = ui.create.dialog("forcebutton", "hidden");
			event.dialog = dialog;
			event.dialog.textPrompt = event.dialog.add('<div class="text center">' + (beatmap.prompt || "在音符滑条和底部判定区重合时点击屏幕！") + "</div>");
			event.switchToAuto = function () {};
			event.dialog.classList.add("fixed");
			event.dialog.classList.add("scroll1");
			event.dialog.classList.add("scroll2");
			event.dialog.classList.add("fullwidth");
			event.dialog.classList.add("fullheight");
			event.dialog.classList.add("noupdate");
			event.dialog.style.overflow = "hidden";
			//结束后操作
			event.settle = function () {
				if (event.settleed) return;
				event.settleed = true;
				//评分
				var acc = Math.floor((score / (added * 5)) * 100);
				if (!Array.isArray(lib.config.choose_to_play_beatmap_accuracies)) lib.config.choose_to_play_beatmap_accuracies = [];
				lib.config.choose_to_play_beatmap_accuracies.push(acc);
				if (lib.config.choose_to_play_beatmap_accuracies.length > 5) lib.config.choose_to_play_beatmap_accuracies.shift();
				game.saveConfigValue("choose_to_play_beatmap_accuracies");
				var rank;
				if (acc == 100) rank = ["SS", "metal"];
				else if (acc >= 94) rank = ["S", "orange"];
				else if (acc >= 87) rank = ["A", "wood"];
				else if (acc >= 80) rank = ["B", "water"];
				else if (acc >= 65) rank = ["C", "thunder"];
				else rank = ["D", "fire"];
				event.dialog.textPrompt.innerHTML = '<div class="text center">演奏结束！<br>最大连击数：' + max_combo + "  精准度：" + acc + "%</div>";
				game.me.$fullscreenpop('<span style="font-family:xinwei">演奏评级：<span data-nature="' + rank[1] + '">' + rank[0] + "</span></span>", null, null, false);
				//返回结果并继续游戏
				setTimeout(function () {
					event._result = {
						bool: true,
						accuracy: acc,
						rank: rank,
					};
					event.dialog.close();
					game.resume();
					_status.imchoosing = false;
					if (roundmenu) ui.roundmenu.style.display = "";
					if (ui.backgroundMusic && !isNaN(ui.backgroundMusic.duration)) ui.backgroundMusic.play();
					hitsound_audio.remove();
				}, 1000);
			};
			event.dialog.open();
			//操作容差
			var height = event.dialog.offsetHeight;
			var width = event.dialog.offsetWidth;
			var range1 = beatmap.range1 || [90, 110];
			var range2 = beatmap.range2 || [93, 107];
			var range3 = beatmap.range3 || [96, 104];
			var speed = beatmap.speed || 25;
			//初始化底部的条子
			var judger = ui.create.div("");
			judger.style["background-image"] = beatmap.judgebar_color || "linear-gradient(rgba(240, 235, 3, 1), rgba(230, 225, 5, 1))";
			judger.style["border-radius"] = "3px";
			judger.style.position = "absolute";
			judger.style.opacity = "0.3";
			var heightj = Math.ceil(height * (beatmap.judgebar_height || 0.1));
			judger.style.height = heightj + "px";
			judger.style.width = width + "px";
			judger.style.left = "0px";
			judger.style.top = height - heightj + "px";
			event.dialog.appendChild(judger);
			//生成每个音符
			var addNode = function () {
				var node = ui.create.div("");
				nodes.push(node);
				node.style["background-image"] = beatmap.node_color || "linear-gradient(rgba(120, 120, 240, 1), rgba(100, 100, 230, 1))";
				node.style["border-radius"] = "3px";
				node.style.position = "absolute";
				node.style.height = Math.ceil(height / 10) + "px";
				node.style.width = Math.ceil(width / number_of_tracks) - 10 + "px";
				node._position = get.utc();
				event.dialog.appendChild(node);

				node.style.left = Math.ceil((width * node_pos) / number_of_tracks + 5) + "px";
				node.style.top = "-" + Math.ceil(height / 10) + "px";
				ui.refresh(node);
				node.style.transition = "all " + speed * 110 + "ms linear";
				node.style.transform = "translateY(" + Math.ceil(height * 1.1) + "px)";
				node.timeout = setTimeout(function () {
					if (nodes.includes(node)) {
						nodes.remove(node);
						player.popup("Miss", "fire", false);
						if (player.damagepopups.length) player.$damagepop();
						combo = 0;
					}
				}, speed * 110);

				if (custom_mapping) {
					node_pos = mapping.shift();
				} else if (mapping == "random") {
					while (node_pos == abs) {
						node_pos = get.rand(number_of_tracks);
					}
					abs = node_pos;
				} else {
					node_pos += abs;
					if (node_pos > number_of_tracks - 1) {
						abs = -1;
						node_pos = number_of_tracks - 2;
					} else if (node_pos < 0) {
						abs = 1;
						node_pos = 1;
					}
				}
				if (timeleap.length) {
					setTimeout(function () {
						addNode();
					}, getTimeout());
				} else {
					setTimeout(function () {
						event.settle();
					}, speed * 110 + 100);
				}
			};
			//点击时的判断操作
			var click = function () {
				if (!nodes.length) return;
				for (var node of nodes) {
					//用生成到点击的时间差来判断距离
					var time = get.utc();
					var top = (time - node._position) / speed;
					if (top > range1[1]) continue;
					else if (top < range1[0]) return;
					nodes.remove(node);
					clearTimeout(node.timeout);
					node.style.transform = "";
					node.style.transition = "all 0s";
					node.style.top = height * ((top - 10) / 100) + "px";
					ui.refresh(node);
					node.style.transition = "all 0.5s";
					node.style.transform = "scale(1.2)";
					node.delete();
					if (top >= range3[0] && top < range3[1]) {
						score += 5;
						player.popup("Perfect", "orange", false);
					} else if (top >= range2[0] && top < range2[1]) {
						score += 3;
						player.popup("Great", "wood", false);
					} else {
						score += 1;
						player.popup("Good", "soil", false);
					}
					if (player.damagepopups.length) player.$damagepop();
					combo++;
					max_combo = Math.max(combo, max_combo);
					hitsound_audio.currentTime = 0;
					if (hitsound_audio.paused) Promise.resolve(hitsound_audio.play()).catch(() => void 0);
					break;
				}
			};
			document.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", click);

			game.pause();
			game.countChoose();
			setTimeout(() => {
				if (!lib.config.background_audio) return;
				if (beatmap.filename.startsWith("ext:")) game.playAudio(beatmap.filename);
				else game.playAudio("effect", beatmap.filename);
			}, Math.floor(speed * 100 * (0.9 + beatmap.judgebar_height)) + beatmap.current);
			setTimeout(function () {
				addNode();
			}, getTimeout());
		} else if (event.isOnline()) {
			event.send();
		} else {
			game.pause();
			game.countChoose();
			var settle = function () {
				_status.imchoosing = false;
				//Algorithm: Generate the random number range using the mean and the half standard deviation of accuracies of the player's last 5 plays
				//算法：用玩家的上5次游玩的准确率的平均数和半标准差生成随机数范围
				var choose_to_play_beatmap_accuracies = (lib.config.choose_to_play_beatmap_accuracies || []).concat(
					Array.from(
						{
							length: 6 - (lib.config.choose_to_play_beatmap_accuracies || []).length,
						},
						() => get.rand(70, 100)
					)
				);
				var mean = Math.round(choose_to_play_beatmap_accuracies.reduce((previousValue, currentValue) => previousValue + currentValue) / choose_to_play_beatmap_accuracies.length);
				var half_standard_deviation = Math.round(Math.sqrt(choose_to_play_beatmap_accuracies.reduce((previousValue, currentValue) => previousValue + Math.pow(currentValue - mean, 2), 0)) / 2);
				var acc = Math.min(Math.max(get.rand.apply(get, beatmap.aiAcc || [mean - half_standard_deviation - get.rand(0, half_standard_deviation), mean + half_standard_deviation + get.rand(0, half_standard_deviation)]), 0), 100);
				var rank;
				if (acc == 100) rank = ["SS", "metal"];
				else if (acc >= 94) rank = ["S", "orange"];
				else if (acc >= 87) rank = ["A", "green"];
				else if (acc >= 80) rank = ["B", "water"];
				else if (acc >= 65) rank = ["C", "thunder"];
				else rank = ["D", "fire"];
				event._result = {
					bool: true,
					accuracy: acc,
					rank: rank,
				};
				if (event.dialog) event.dialog.close();
				if (event.control) event.control.close();
				game.resume();
			};
			var song_duration = beatmap.timeleap[beatmap.timeleap.length - 1] + beatmap.speed * 100 + 1000 + (beatmap.current || 0);
			var settle_timeout = setTimeout(settle, song_duration);
			if (!_status.connectMode) {
				var skip_timeout;
				var skip = () => {
					settle();
					Array.from(ui.window.getElementsByTagName("audio")).forEach(audio => {
						if (audio.currentSrc.includes(beatmap.filename.startsWith("ext:") ? beatmap.name : beatmap.filename)) audio.remove();
					});
					document.removeEventListener(lib.config.touchscreen ? "touchend" : "click", skip);
					clearTimeout(settle_timeout);
					clearTimeout(skip_timeout);
				};
				document.addEventListener(lib.config.touchscreen ? "touchend" : "click", skip);
				skip_timeout = setTimeout(() => document.removeEventListener(lib.config.touchscreen ? "touchend" : "click", skip), song_duration);
			}
		}
		"step 2";
		game.broadcastAll(
			function (id, time) {
				if (_status.connectMode) lib.configOL.choose_timeout = time;
				var dialog = get.idDialog(id);
				if (dialog) {
					dialog.close();
				}
				if (ui.backgroundMusic && !isNaN(ui.backgroundMusic.duration)) ui.backgroundMusic.play();
			},
			event.videoId,
			event.time
		);
		var result = event.result || result;
		event.result = result;
	},
	chooseToMove: function () {
		"step 0";
		if (event.chooseTime && _status.connectMode && !game.online) {
			event.time = lib.configOL.choose_timeout;
			game.broadcastAll(function (time) {
				lib.configOL.choose_timeout = time;
			}, event.chooseTime);
		}
		if (event.isMine()) {
			delete ui.selected.guanxing_button;
			var list = event.list,
				filterMove = event.filterMove,
				filterOk = event.filterOk;
			_status.imchoosing = true;
			var event = _status.event;
			event.settleed = false;
			event.dialog = ui.create.dialog(event.prompt || "请选择要操作的牌", "hidden", "forcebutton");
			event.switchToAuto = function () {
				if (!filterOk(event.moved)) {
					if (!event.forced) event._result = { bool: false };
					else event._result = "ai";
				} else {
					event._result = {
						bool: true,
						moved: event.moved,
					};
				}
				event.dialog.close();
				if (ui.confirm) ui.confirm.close();
				game.resume();
				_status.imchoosing = false;
				setTimeout(function () {
					ui.arena.classList.remove("choose-to-move");
				}, 500);
			};
			event.dialog.classList.add("scroll1");
			event.dialog.classList.add("scroll2");
			event.dialog.classList.add("fullwidth");
			if (list.length > 2) {
				ui.arena.classList.add("choose-to-move");
				event.dialog.classList.add("fullheight");
			}

			/**
			 * @type { Card[][] } 保存每次移动后的对应实体牌的位置
			 */
			event.moved = [];
			/**
			 * @type { HTMLDivElement[] } 所有可移动的buttons数组
			 */
			var buttonss = [];
			event.buttonss = buttonss;
			/**
			 * 是否处于拖拽动画中(禁止其他的选择，拖拽)
			 */
			event.isPlayingAnimation = false;
			// 初始化触摸点位置和元素偏移量
			var touchStartX = 0;
			var touchStartY = 0;
			var elementOffsetX = 0;
			var elementOffsetY = 0;
			var currentElement;
			// 首次触发move事件的元素
			var firstOnDragElement;
			/**
			 * 每次移动后更新数据
			 */
			var updateButtons = function () {
				for (var i of buttonss) {
					// 更新每次移动后的对应实体牌的位置
					event.moved[i._link] = get.links(Array.from(i.childNodes));
					// 更新这个buttons的提示文本
					if (typeof i.textPrompt == "function") i.previousSibling.innerHTML = '<div class="text center">' + i.textPrompt(event.moved[i._link]) + "</div>";
				}
				if (filterOk(event.moved)) {
					ui.create.confirm("o");
				} else {
					if (!event.forced) ui.create.confirm("c");
					else if (ui.confirm) ui.confirm.close();
				}
			};

			/**
			 * 确认是否是拖拽开始
			 *
			 * 按下时，是不能判断出是否拖拽开始的，得在move事件才可以
			 *
			 * @this buttons
			 * @param { TouchEvent | MouseEvent } e
			 */
			var dragStart = function (e) {
				if (event.isPlayingAnimation) return;
				// 左键按下
				if (e instanceof MouseEvent) {
					if (e.which != 1) return;
				}
				// 单个手指按下
				if (window.TouchEvent && e instanceof TouchEvent) {
					if (e.touches.length != 1) return;
				}
				// 判断按下的元素是否是card
				var cards = Array.from(this.children);
				var target = cards.find(card => {
					// Node.contains()
					return card.contains(e.target);
				});
				if (target) {
					if (!target.copy) {
						target.copy = target.cloneNode(true);
						target.copy.style.opacity = "0.75";
						target.copy.style.pointerEvents = "none";
					}
					touchStartX = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) / game.documentZoom;
					touchStartY = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY) / game.documentZoom;
					elementOffsetX = target.getBoundingClientRect().x / game.documentZoom - touchStartX;
					elementOffsetY = target.getBoundingClientRect().y / game.documentZoom - touchStartY;
					currentElement = target;
					e.stopPropagation();
				}
			};

			/**
			 * 判断出是否拖拽开始
			 *
			 * move事件是在button元素上监听的，而不是在dialog.content上。
			 *
			 * @this dialog
			 * @param { TouchEvent | MouseEvent } e
			 */
			var onDrag = function (e) {
				if (event.isPlayingAnimation) return;
				if (e instanceof MouseEvent) {
					if (e.which != 1) return;
				}
				if (window.TouchEvent && e instanceof TouchEvent) {
					if (e.touches.length != 1) return;
				}
				if (!currentElement || !currentElement.copy) return;
				if (!firstOnDragElement) {
					if (!currentElement.contains(e.target)) {
						return;
					} else {
						firstOnDragElement = currentElement;
					}
				}
				// 拖动离开了这个牌的区域，进行赋值
				// if (!currentElement.contains(e.target)) {

				// }
				// 移除高亮
				ui.selected.guanxing_button?.classList.remove("glow2");
				ui.selected.guanxing_button = currentElement;
				ui.selected.guanxing_button.classList.add("glow2");
				// 显示拖拽的元素
				/**
				 * @type { HTMLDivElement }
				 */
				var copy = currentElement.copy;
				if (!ui.window.contains(copy)) {
					copy.style.position = "absolute";
					copy.style.transition = "none";
					copy.style.zIndex = "100";
					copy.css({
						boxShadow: "0px 0px 7px 2px rgba(233, 30, 77, 0.95)",
					});
					ui.window.appendChild(copy);
				}
				e = e instanceof MouseEvent ? e : e.touches[0];

				const ex = e.clientX / game.documentZoom;
				const ey = e.clientY / game.documentZoom;
				copy.style.left = `${ex + elementOffsetX}px`;
				copy.style.top = `${ey + elementOffsetY}px`;
			};

			var dragEnd = function (e) {
				if (event.isPlayingAnimation) return;
				if (e instanceof MouseEvent) {
					if (e.which != 1) return;
				}
				if (window.TouchEvent && e instanceof TouchEvent) {
					if (e.changedTouches.length != 1) return;
				}
				firstOnDragElement = null;
				buttonss.forEach(btn => {
					Array.from(btn.children).forEach(element => {
						if (element.copy && ui.window.contains(element.copy)) {
							ui.window.removeChild(element.copy);
						}
					});
				});
				if (!ui.selected.guanxing_button?.copy) return;
				var clientX = (e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX) / game.documentZoom;
				var clientY = (e instanceof MouseEvent ? e.clientY : e.changedTouches[0].clientY) / game.documentZoom;
				// 鼠标当前处于哪个元素上
				var target = document.elementFromPoint(clientX * game.documentZoom, clientY * game.documentZoom);
				// 相当于没移动，让它自己触发后续的click
				if (ui.selected.guanxing_button.contains(target)) return;
				// 停止拖拽的目标处于哪个button区域中
				var button = buttonss.find(b => {
					// Node.contains()
					return b.contains(target);
				});
				// 不能拖拽到区域外
				if (!button) return;
				var children = Array.from(button.children);
				// 与card交换位置
				var card = children.find(element => element.contains(target));
				// 判断是否可以移动
				if (!card) {
					if (!filterMove(ui.selected.guanxing_button, button._link, event.moved)) return;
				} else {
					if (!filterMove(card, ui.selected.guanxing_button, event.moved)) return;
				}
				//后续这里可以增加拖动到空白位置的效果
				/*

				 if (拖动到空白) {
					game.$elementGoto().then(){
						delete ui.selected.guanxing_button;
						event.isPlayingAnimation = false;
						updateButtons();
					}
					return

				
				}
				
				*/
				// FLIP动画
				// first
				buttonss.forEach(btn => {
					Array.from(btn.children).forEach(element => {
						element.style.transition = "none";
						element._rect = element.getBoundingClientRect();
					});
				});
				// last
				// 如果拖拽到一个空区域内
				if (!button.hasChildNodes()) {
					button.appendChild(ui.selected.guanxing_button);
				} else if (!card) {
					// 判断是加在第一个还是最后一个
					if (children.length > 0) {
						var firstChild = children[0];
						if (clientX < firstChild.getBoundingClientRect().left / game.documentZoom) {
							button.insertBefore(ui.selected.guanxing_button, firstChild);
						} else button.appendChild(ui.selected.guanxing_button);
					} else button.appendChild(ui.selected.guanxing_button);
				} else {
					// 是交换而不是到card前面
					var par1 = ui.selected.guanxing_button.parentNode,
						ind1 = ui.selected.guanxing_button.nextSibling,
						par2 = card.parentNode,
						ind2 = card.nextSibling;
					ui.selected.guanxing_button.classList.remove("glow2");
					par1.insertBefore(card, ind1);
					par2.insertBefore(ui.selected.guanxing_button, ind2);
				}
				// invert
				buttonss.forEach(btn => {
					Array.from(btn.children).forEach(element => {
						element._rect2 = element.getBoundingClientRect();
						element.style.transform = `translateX(${(element._rect.left - element._rect2.left) / game.documentZoom}px) translateY(${(element._rect.top - element._rect2.top) / game.documentZoom}px)`;
					});
				});
				// play
				event.isPlayingAnimation = true;
				setTimeout(() => {
					Promise.race([
						new Promise(resolve => setTimeout(resolve, 700)),
						Promise.all(
							buttonss
								.map(btn => Array.from(btn.children))
								.flat(1)
								.map(element => {
									return new Promise(resolve => {
										element.classList.remove("glow2");
										element.style.transition = "";
										const transformValue = element.style.transform;
										if (transformValue !== "translateX(0px) translateY(0px)" && transformValue !== "") {
											element.style.transform = "translateX(0px) translateY(0px)";
											element.addEventListener(
												"transitionend",
												event => {
													// 确保 transitionend 事件是针对当前元素的 transform 属性
													if (event.propertyName === "transform") {
														resolve();
													}
												},
												{ once: true }
											);
										} else resolve();
									});
								})
						),
					]).then(() => {
						delete ui.selected.guanxing_button;
						event.isPlayingAnimation = false;
						updateButtons();
					});
				}, 0);
			};

			// 根据数据创建区域
			for (var i = 0; i < list.length; i++) {
				var tex = event.dialog.add('<div class="text center">' + list[i][0] + "</div>");
				tex.classList.add("choosetomove");
				var buttons = ui.create.div(".buttons", event.dialog.content);
				buttons.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", dragStart, true);
				event.dialog.addEventListener(lib.config.touchscreen ? "touchmove" : "mousemove", onDrag, true);
				event.dialog.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", dragEnd, true);
				buttonss.push(buttons);
				buttons.classList.add("popup");
				buttons.classList.add("guanxing");
				buttons._link = i;
				if (list[i][1]) {
					if (get.itemtype(list[i][1]) == "cards") {
						var cardsb = ui.create.buttons(list[i][1], "card", buttons);
						if (list[i][2] && typeof list[i][2] == "string") {
							for (var ij of cardsb) ij.node.gaintag.innerHTML = get.translation(list[i][2]);
						}
					} else if (list[i][1].length == 2) {
						ui.create.buttons(list[i][1][0], list[i][1][1], buttons);
					}
				}
				if (list[i][2] && typeof list[i][2] == "function") buttons.textPrompt = list[i][2];
			}
			var tex = event.dialog.add('<div class="text center">点击或拖动两张牌以交换位置；点击一张牌并点击其他区域或拖动到其他区域以移动卡牌</div>');
			tex.classList.add("choosetomove");

			event.dialog.open();
			updateButtons();

			event.custom.replace.button = function (button) {
				if (event.isPlayingAnimation) return;
				var node = button.parentNode;
				if (!buttonss.includes(node)) return;
				if (!ui.selected.guanxing_button) {
					ui.selected.guanxing_button = button;
					button.classList.add("glow2");
					return;
				}
				if (ui.selected.guanxing_button == button) {
					button.classList.remove("glow2");
					delete ui.selected.guanxing_button;
					return;
				}
			};
			event.custom.replace.confirm = function (bool) {
				if (event.isPlayingAnimation) return;
				event.buttonss.forEach(btn => {
					Array.from(btn.children).forEach(element => {
						if (element.copy && ui.window.contains(element.copy)) {
							ui.window.removeChild(element.copy);
							delete element.copy;
						}
					});
				});
				if (bool)
					event._result = {
						bool: true,
						moved: event.moved,
					};
				else event._result = { bool: false };
				event.dialog.close();
				if (ui.confirm) ui.confirm.close();
				game.resume();
				_status.imchoosing = false;
				setTimeout(function () {
					ui.arena.classList.remove("choose-to-move");
				}, 500);
			};

			game.pause();
			game.countChoose();
			event.choosing = true;
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		if (event.time)
			game.broadcastAll(function (time) {
				lib.configOL.choose_timeout = time;
			}, event.time);
		var result = event.result || result;
		if ((!result || result == "ai" || (event.forced && !result.bool)) && event.processAI) {
			var moved = event.processAI(event.list);
			if (moved)
				result = {
					bool: true,
					moved,
				};
			else result = { bool: false };
		}
		event.result = result;
	},
	showCharacter: function () {
		"step 0";
		event.trigger("showCharacterEnd");
		"step 1";
		event.trigger("showCharacterAfter");
		if (get.mode() == "identity" && player.isZhu) event.trigger("zhuUpdate");
	},
	removeCharacter: function () {
		player.$removeCharacter(event.num);
	},
	chooseUseTarget: function () {
		"step 0";
		if (get.is.object(card) && event.viewAs === false) card.isCard = true;
		if (cards && get.itemtype(card) != "card") {
			card = get.copy(card);
			card.cards = cards.slice(0);
			event.card = card;
		}
		let evt = event.getParent("chooseToUse");
		if (get.itemtype(evt) !== "event") evt = event;
		if (!lib.filter.cardEnabled(card, player) || (event.addCount !== false && !lib.filter.cardUsable(card, player, evt))) {
			event.result = { bool: false };
			event.finish();
			return;
		}
		var info = get.info(card);
		var range;
		if (!info.notarget) {
			var select = get.copy(info.selectTarget);
			range = get.select(select);
			if (event.selectTarget) range = get.select(event.selectTarget);
			game.checkMod(card, player, range, "selectTarget", player);
		}
		if (info.notarget || range[1] <= -1) {
			if (!info.notarget && range[1] <= -1) {
				for (var i = 0; i < targets.length; i++) {
					if (event.filterTarget) {
						if (!event.filterTarget(card, player, targets[i])) {
							targets.splice(i--, 1);
						}
					} else if (!player.canUse(card, targets[i], event.nodistance ? false : null, event.addCount === false ? null : true)) {
						targets.splice(i--, 1);
					}
				}
				if (targets.length) {
					event.targets2 = targets;
				} else {
					event.finish();
					return;
				}
			} else event.targets2 = [];
			if (event.forced) {
				event._result = { bool: true };
				return;
			} else {
				var next = player.chooseBool();
				next.set("prompt", event.prompt || "是否" + (event.targets2.length ? "对" : "") + get.translation(event.targets2) + "使用" + get.translation(card) + "?");
				if (event.hsskill) next.setHiddenSkill(event.hsskill);
				if (event.prompt2) next.set("prompt2", event.prompt2);
				next.ai = function () {
					var eff = 0;
					for (var i = 0; i < event.targets2.length; i++) {
						eff += get.effect(event.targets2[i], card, player, player);
					}
					return eff > 0;
				};
			}
		} else {
			if (event.filterTarget) {
				var targets = game.filterPlayer(function (current) {
					return event.filterTarget(card, player, current);
				});
				if (targets.length < range[0]) {
					event._result = { bool: false };
					return;
				} else if (!info.complexTarget && targets.length == range[0] && range[0] == range[1]) {
					event.targets2 = targets;
					event._result = { bool: true };
					return;
				}
			}
			var next = player.chooseTarget();
			next.set("_get_card", card);
			next.set(
				"filterTarget",
				event.filterTarget ||
					function (card, player, target) {
						if (!_status.event.targets.includes(target)) return false;
						if (!_status.event.nodistance && !lib.filter.targetInRange(card, player, target)) return false;
						return lib.filter.targetEnabledx(card, player, target);
					}
			);
			next.set("ai", event.ai || get.effect_use);
			next.set("selectTarget", event.selectTarget || lib.filter.selectTarget);
			if (event.nodistance) next.set("nodistance", true);
			if (event.forced) next.set("forced", true);
			if (event.addCount !== false) next.set("addCount_extra", true);
			next.set("targets", targets);
			next.set("prompt", event.prompt || "选择" + get.translation(card) + "的目标");
			if (event.prompt2) next.set("prompt2", event.prompt2);
			if (event.hsskill) next.setHiddenSkill(event.hsskill);
		}
		"step 1";
		if (result.bool) {
			event.result = {
				bool: true,
				targets: event.targets2 || result.targets,
			};
			var args = [card, event.targets2 || result.targets];
			if (cards) args.push(cards.slice());
			var next = player.useCard(...args);
			next.oncard = event.oncard;
			if (cards) next.cards = cards.slice(0);
			if (event.nopopup) next.nopopup = true;
			if (event.animate === false) next.animate = false;
			if (event.throw === false) next.throw = false;
			if (event.addCount === false) next.addCount = false;
			if (event.noTargetDelay) next.targetDelay = false;
			if (event.nodelayx) next.delayx = false;
			if (event.logSkill) {
				if (typeof event.logSkill == "string") {
					next.skill = event.logSkill;
				} else if (Array.isArray(event.logSkill)) {
					player.logSkill.apply(player, event.logSkill);
				}
			}
		} else event.result = { bool: false };
	},
	chooseToDuiben: function () {
		"step 0";
		if (!event.namelist) event.namelist = ["全军出击", "分兵围城", "奇袭粮道", "开城诱敌"];
		game.broadcastAll(
			function (list, translationList = []) {
				var list2 = ["db_atk1", "db_atk2", "db_def1", "db_def2"];
				for (var i = 0; i < 4; i++) {
					lib.card[list2[i]].image = "card/" + list2[i] + (list[0] == "全军出击" ? "" : "_" + list[i]);
					lib.translate[list2[i]] = list[i];
					lib.translate[list2[i] + "_info"] = translationList[i];
				}
			},
			event.namelist,
			event.translationList
		);
		if (!event.title) event.title = "对策";
		game.log(player, "向", target, "发起了", "#y" + event.title);
		if (!event.ai)
			event.ai = function () {
				return 1 + Math.random();
			};
		if (_status.connectMode) {
			player
				.chooseButtonOL(
					[
						[
							player,
							[
								event.title + "：请选择一种策略",
								[
									[
										["", "", "db_def2"],
										["", "", "db_def1"],
									],
									"vcard",
								],
							],
							true,
						],
						[
							target,
							[
								event.title + "：请选择一种策略",
								[
									[
										["", "", "db_atk1"],
										["", "", "db_atk2"],
									],
									"vcard",
								],
							],
							true,
						],
					],
					function () {},
					event.ai
				)
				.set("switchToAuto", function () {
					_status.event.result = "ai";
				})
				.set("processAI", function () {
					var buttons = _status.event.dialog.buttons;
					return {
						bool: true,
						links: [buttons.randomGet().link],
					};
				});
		}
		"step 1";
		if (_status.connectMode) {
			event.mes = result[player.playerid].links[0][2];
			event.tes = result[target.playerid].links[0][2];
			event.goto(4);
		} else {
			player.chooseButton(
				[
					event.title + "：请选择一种策略",
					[
						[
							["", "", "db_def2"],
							["", "", "db_def1"],
						],
						"vcard",
					],
				],
				true
			).ai = event.ai;
		}
		"step 2";
		event.mes = result.links[0][2];
		target.chooseButton(
			[
				event.title + "：请选择一种策略",
				[
					[
						["", "", "db_atk1"],
						["", "", "db_atk2"],
					],
					"vcard",
				],
			],
			true
		).ai = event.ai;
		"step 3";
		event.tes = result.links[0][2];
		"step 4";
		game.broadcast(function () {
			ui.arena.classList.add("thrownhighlight");
		});
		ui.arena.classList.add("thrownhighlight");
		game.addVideo("thrownhighlight1");
		target.$compare(game.createCard(event.tes, "", ""), player, game.createCard(event.mes, "", ""));
		game.log(target, "选择的策略为", "#g" + get.translation(event.tes));
		game.log(player, "选择的策略为", "#g" + get.translation(event.mes));
		game.delay(0, 1500);
		"step 5";
		var mes = event.mes.slice(6);
		var tes = event.tes.slice(6);
		var str;
		if (mes == tes) {
			str = get.translation(player) + event.title + "成功";
			player.popup("胜", "wood");
			target.popup("负", "fire");
			game.log(player, "#g胜");
			event.result = { bool: true };
		} else {
			str = get.translation(player) + event.title + "失败";
			target.popup("胜", "wood");
			player.popup("负", "fire");
			game.log(target, "#g胜");
			event.result = { bool: false };
		}
		event.result.player = event.mes;
		event.result.target = event.tes;
		game.broadcastAll(function (str) {
			var dialog = ui.create.dialog(str);
			dialog.classList.add("center");
			setTimeout(function () {
				dialog.close();
			}, 1000);
		}, str);
		const skill = event.getParent().name + "_" + (event.result.bool ? "true" + mes : "false");
		game.trySkillAudio(skill, player, true, null, null, [event, event.player]);
		game.delay(2);
		"step 6";
		game.broadcastAll(function () {
			ui.arena.classList.remove("thrownhighlight");
		});
		game.addVideo("thrownhighlight2");
		if (event.clear !== false) {
			game.broadcastAll(ui.clear);
		}
	},
	chooseToPSS: function () {
		"step 0";
		game.log(player, "对", target, "发起了猜拳");
		if (_status.connectMode) {
			player
				.chooseButtonOL(
					[
						[
							player,
							[
								"猜拳：请选择一种手势",
								[
									[
										["", "", "pss_stone"],
										["", "", "pss_scissor"],
										["", "", "pss_paper"],
									],
									"vcard",
								],
							],
							true,
						],
						[
							target,
							[
								"猜拳：请选择一种手势",
								[
									[
										["", "", "pss_stone"],
										["", "", "pss_scissor"],
										["", "", "pss_paper"],
									],
									"vcard",
								],
							],
							true,
						],
					],
					function () {},
					function () {
						return 1 + Math.random();
					}
				)
				.set("switchToAuto", function () {
					_status.event.result = "ai";
				})
				.set("processAI", function () {
					var buttons = _status.event.dialog.buttons;
					return {
						bool: true,
						links: [buttons.randomGet().link],
					};
				});
		}
		"step 1";
		if (_status.connectMode) {
			event.mes = result[player.playerid].links[0][2];
			event.tes = result[target.playerid].links[0][2];
			event.goto(4);
		} else {
			player.chooseButton(
				[
					"猜拳：请选择一种手势",
					[
						[
							["", "", "pss_stone"],
							["", "", "pss_scissor"],
							["", "", "pss_paper"],
						],
						"vcard",
					],
				],
				true
			).ai = function () {
				return 1 + Math.random();
			};
		}
		"step 2";
		event.mes = result.links[0][2];
		target.chooseButton(
			[
				"猜拳：请选择一种手势",
				[
					[
						["", "", "pss_stone"],
						["", "", "pss_scissor"],
						["", "", "pss_paper"],
					],
					"vcard",
				],
			],
			true
		).ai = function () {
			return 1 + Math.random();
		};
		"step 3";
		event.tes = result.links[0][2];
		"step 4";
		game.broadcast(function () {
			ui.arena.classList.add("thrownhighlight");
		});
		ui.arena.classList.add("thrownhighlight");
		game.addVideo("thrownhighlight1");
		player.$compare(game.createCard(event.mes, "", ""), target, game.createCard(event.tes, "", ""));
		game.log(player, "选择的手势为", "#g" + get.translation(event.mes));
		game.log(target, "选择的手势为", "#g" + get.translation(event.tes));
		game.delay(0, 1500);
		"step 5";
		var mes = event.mes.slice(4);
		var tes = event.tes.slice(4);
		var str;
		if (mes == tes) {
			str = "二人平局";
			player.popup("平", "metal");
			target.popup("平", "metal");
			game.log("猜拳的结果为", "#g平局");
			event.result = { tie: true };
		} else {
			if ({ paper: "stone", scissor: "paper", stone: "scissor" }[mes] == tes) {
				str = get.translation(player) + "胜利";
				player.popup("胜", "wood");
				target.popup("负", "fire");
				game.log(player, "#g胜");
				event.result = { bool: true };
			} else {
				str = get.translation(target) + "胜利";
				target.popup("胜", "wood");
				player.popup("负", "fire");
				game.log(target, "#g胜");
				event.result = { bool: false };
			}
		}
		game.broadcastAll(function (str) {
			var dialog = ui.create.dialog(str);
			dialog.classList.add("center");
			setTimeout(function () {
				dialog.close();
			}, 1000);
		}, str);
		game.delay(2);
		"step 6";
		game.broadcastAll(function () {
			ui.arena.classList.remove("thrownhighlight");
		});
		game.addVideo("thrownhighlight2");
		if (event.clear !== false) {
			game.broadcastAll(ui.clear);
		}
	},
	cardsDiscard: function () {
		game.getGlobalHistory().cardMove.push(event);
		var withPile = false;
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].willBeDestroyed("discardPile", null, event)) {
				cards[i].selfDestroy(event);
				continue;
			}
			if (get.position(cards[i], true) == "c") withPile = true;
			cards[i].discard();
		}
		if (withPile) game.updateRoundNumber();
	},
	orderingDiscard: function () {
		var cards = event.relatedEvent.orderingCards.slice(0);
		for (var i = 0; i < cards.length; i++) {
			if (get.position(cards[i], true) != "o") cards.splice(i--, 1);
		}
		if (cards.length) game.cardsDiscard(cards);
	},
	cardsGotoOrdering: function () {
		game.getGlobalHistory().cardMove.push(event);
		var withPile = false;
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].willBeDestroyed("ordering", null, event)) {
				cards[i].selfDestroy(event);
				continue;
			}
			if (get.position(cards[i], true) == "c") withPile = true;
			cards[i].fix();
			ui.ordering.appendChild(cards[i]);
		}
		if (withPile) game.updateRoundNumber();
		var evt = event.relatedEvent || event.getParent();
		if (!evt.orderingCards) evt.orderingCards = [];
		if (!evt.noOrdering && !evt.cardsOrdered) {
			evt.cardsOrdered = true;
			var next = game.createEvent("orderingDiscard", false);
			event.next.remove(next);
			evt.after.push(next);
			next.relatedEvent = evt;
			next.setContent("orderingDiscard");
		}
		if (!evt.noOrdering) evt.orderingCards.addArray(cards);
		event.result = { cards };
	},
	cardsGotoSpecial: function () {
		game.getGlobalHistory().cardMove.push(event);
		var withPile = false;
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].willBeDestroyed("special", null, event)) {
				cards[i].selfDestroy(event);
				continue;
			}
			if (get.position(cards[i], true) == "c") withPile = true;
			cards[i].fix();
			ui.special.appendChild(cards[i]);
		}
		if (withPile) game.updateRoundNumber();
		if (event.toRenku) {
			_status.renku.addArray(cards);
			if (_status.renku.length > 6) {
				var cards = _status.renku.splice(0, _status.renku.length - 6);
				game.log(cards, "从仁库进入了弃牌堆");
				game.cardsDiscard(cards).set("outRange", true).fromRenku = true;
			}
			game.updateRenku();
		}
	},
	cardsGotoPile: function () {
		if (event.washCard) {
			event.trigger("washCard");
			for (var i = 0; i < lib.onwash.length; i++) {
				if (lib.onwash[i]() == "remove") {
					lib.onwash.splice(i--, 1);
				}
			}
		}
		game.getGlobalHistory().cardMove.push(event);
		if (!event._triggeronly) game.$cardsGotoPile(event);
	},
	/**
	 * @param {GameEventPromise} event
	 * @param {GameEventPromise} trigger
	 * @param {Player} player
	 */
	chooseToEnable: async function (event, trigger, player) {
		var source = event.source;
		if (event.selectButton) {
			var list = [];
			for (var i = 1; i <= 5; i++) {
				list.push("equip" + i);
			}
			var realList = [];
			realList = list.filter(current => {
				if (player.hasDisabledSlot(current)) return true;
			});
			if (!list.length) event.finish();
			else if (event.selectButton[0] >= realList.length) {
				event.list = list;
				var result = { links: list };
			} else {
				list.sort();
				list = list.map(current => [current, get.translation(current)]);
				event.list = list;
				var str = `请选择恢复${get.translation(player.name)}的`;
				var selectButton = get.select(event.selectButton);
				if (selectButton[0] == selectButton[1]) {
					str += get.cnNumber(selectButton[0]);
				} else if (selectButton[1] == Infinity) {
					str += "至少" + get.cnNumber(selectButton[0]);
				} else {
					str += get.cnNumber(selectButton[0]) + "至" + get.cnNumber(selectButton[1]);
				}
				str += "个装备栏";
				var next = source.chooseButton(selectButton, true, [str, [list, "tdnodes"]]);
				next.set("filterButton", function (button) {
					if (player.hasDisabledSlot(button.link)) return true;
					return false;
				});
				if (!event.ai) {
					event.ai = function () {
						return Math.random();
					};
				}
				next.set("ai", event.ai);
				var result = await next.forResult();
			}
			event.result = { links: result.links };
			var slots = result.links;
			await player.enableEquip(slots);
		} else {
			var list = [];
			for (var i = 1; i <= 5; i++) {
				if (player.hasDisabledSlot(i)) list.push("equip" + i);
			}
			if (!list.length) event.finish();
			else if (list.length == 1) {
				event.list = list;
				var result = { control: list[0] };
			} else {
				var next = source.chooseControl(list);
				next.set("prompt", "请选择恢复" + get.translation(player.name) + "的一个装备栏");
				if (!event.ai)
					event.ai = function (event, player, list) {
						return list.randomGet();
					};
				event.ai = event.ai(event.getParent(), player, list);
				next.ai = function () {
					return event.ai;
				};
				var result = await next.forResult();
			}
			event.result = { control: result.control };
			await player.enableEquip(result.control);
		}
	},
	/**
	 * @param {GameEventPromise} event
	 * @param {GameEventPromise} trigger
	 * @param {Player} player
	 */
	chooseToDisable: async function (event, trigger, player) {
		var source = event.source;
		if (event.selectButton) {
			var list = [];
			for (var i = 1; i <= 5; i++) {
				list.push("equip" + i);
			}
			var realList = [];
			realList = list.filter(current => {
				if (player.hasEnabledSlot(current)) return true;
			});
			if (event.horse) {
				if (list.includes("equip3") && (get.is.mountCombined() || list.includes("equip4"))) {
					list.push("equip3_4");
					realList.push("equip3_4");
				}
				list.remove("equip3", "equip4");
				realList.remove("equip3", "equip4");
			}
			if (!list.length) event.finish();
			else if (event.selectButton[0] >= realList.length) {
				event.list = list;
				var result = { links: list };
			} else {
				list.sort();
				list = list.map(current => [current, get.translation(current)]);
				event.list = list;
				var str = `请选择废除${get.translation(player.name)}的`;
				var selectButton = get.select(event.selectButton);
				if (selectButton[0] == selectButton[1]) {
					str += get.cnNumber(selectButton[0]);
				} else if (selectButton[1] == Infinity) {
					str += "至少" + get.cnNumber(selectButton[0]);
				} else {
					str += get.cnNumber(selectButton[0]) + "至" + get.cnNumber(selectButton[1]);
				}
				str += "个装备栏";
				var next = source.chooseButton(selectButton, true, [str, [list, "tdnodes"]]);
				next.set("filterButton", function (button) {
					if (player.hasEnabledSlot(button.link)) return true;
					return false;
				});
				if (!event.ai) {
					event.ai = function () {
						return Math.random();
					};
				}
				next.set("ai", event.ai);
				var result = await next.forResult();
			}
			event.result = { links: result.links };
			var slots = result.links.slice();
			if (slots.includes("equip3_4")) {
				slots.remove("equip3_4");
				slots.add("equip3");
				slots.add("equip4");
			}
			await player.disableEquip(slots);
		} else {
			var list = [];
			for (var i = 1; i <= 5; i++) {
				if (player.hasEnabledSlot(i)) list.push("equip" + i);
			}
			if (event.horse) {
				if (list.includes("equip3") && (get.is.mountCombined() || list.includes("equip4"))) list.push("equip3_4");
				list.remove("equip3");
				list.remove("equip4");
			}
			if (!list.length) event.finish();
			else if (list.length == 1) {
				event.list = list;
				var result = { control: list[0] };
			} else {
				list.sort();
				event.list = list;
				var next = source.chooseControl(list);
				next.set("prompt", "请选择废除" + get.translation(player.name) + "的一个装备栏");
				if (!event.ai)
					event.ai = function (event, player, list) {
						return list.randomGet();
					};
				event.ai = event.ai(event.getParent(), player, list);
				next.ai = function () {
					return event.ai;
				};
				var result = await next.forResult();
			}
			event.result = { control: result.control };
			if (result.control == "equip3_4") {
				await player.disableEquip(3, 4);
			} else {
				await player.disableEquip(result.control);
			}
		}
	},
	swapEquip: function () {
		"step 0";
		game.log(player, "和", target, "交换了装备区中的牌");
		event.cards = [player.getCards("e"), target.getCards("e")];
		event.vcards = [player.getVCards("e"), target.getVCards("e")];
		game.loseAsync({
			player: player,
			target: target,
			cards1: event.cards[0],
			cards2: event.cards[1],
			vcards1: event.vcards[0],
			vcards2: event.vcards[1],
		}).setContent("swapHandcardsx");
		"step 1";
		player.equip(event.vcards[1]);
		target.equip(event.vcards[0]);
	},
	disableJudge: function () {
		"step 0";
		game.log(player, "废除了判定区");
		var js = player.getCards("j");
		if (js.length) player.discard(js);
		player.storage._disableJudge = true;
		//player.markSkill('_disableJudge');
		"step 1";
		game.broadcastAll(function (player, card) {
			player.$disableJudge();
		}, player);
	},
	enableJudge: function () {
		if (!player.storage._disableJudge) return;
		game.log(player, "恢复了判定区");
		game.broadcastAll(function (player) {
			player.$enableJudge();
		}, player);
	},
	/*----分界线----*/
	phasing: function () {
		"step 0";
		while (ui.dialogs.length) {
			ui.dialogs[0].close();
		}
		game.phaseNumber++;
		player.phaseNumber++;
		game.broadcastAll(
			function (player, player2, num, popup) {
				if (lib.config.glow_phase) {
					if (player2) player2.classList.remove("glow_phase");
					player.classList.add("glow_phase");
				}
				player.phaseNumber = num;
				if (popup && lib.config.show_phase_prompt) player.popup("回合开始", null, false);
			},
			player,
			_status.currentPhase,
			player.phaseNumber,
			!player.noPhaseDelay
		);
		_status.currentPhase = player;
		_status.discarded = [];
		game.syncState();
		game.addVideo("phaseChange", player);
		if (game.phaseNumber == 1) {
			delete player._start_cards;
			if (lib.configOL.observe) {
				lib.configOL.observeReady = true;
				game.send("server", "config", lib.configOL);
			}
		}
		game.log();
		game.log(player, "的回合开始");
		player._noVibrate = true;
		if (get.config("identity_mode") != "zhong" && get.config("identity_mode") != "purple" && !_status.connectMode) {
			var num;
			switch (get.config("auto_identity")) {
				case "one":
					num = 1;
					break;
				case "two":
					num = 2;
					break;
				case "three":
					num = 3;
					break;
				case "always":
					num = -1;
					break;
				default:
					num = 0;
					break;
			}
			if (num && !_status.identityShown && game.phaseNumber > game.players.length * num && game.showIdentity) {
				if (!_status.video) player.popup("显示身份");
				_status.identityShown = true;
				game.showIdentity(false);
			}
		}
		player.ai.tempIgnore = [];
		if (ui.land && ui.land.player == player) {
			game.addVideo("destroyLand");
			ui.land.destroy();
		}
		"step 1";
		event.trigger("phaseBeginStart");
	},
	toggleSubPlayer: function () {
		"step 0";
		var list = event.list || player.storage.subplayer.skills.slice(0);
		list.remove(player.storage.subplayer.name2);
		event.list = list;
		if (!event.directresult) {
			if (list.length > 1) {
				var dialog = ui.create.dialog("更换一个随从", "hidden");
				dialog.add([list, "character"]);
				player.chooseButton(dialog, true);
			} else if (list.length == 1) {
				event.directresult = list[0];
			} else {
				event.finish();
			}
		} else {
			if (!list.includes(event.directresult)) {
				event.finish();
			}
		}
		"step 1";
		if (!event.directresult) {
			if (result && result.bool && result.links[0]) {
				event.directresult = result.links[0];
			} else {
				event.finish();
				return;
			}
		}
		if (player.storage.subplayer) {
			var current = player.storage.subplayer.name2;
			if (event.directresult == current) {
				event.finish();
				return;
			}
			player.storage[current].hp = player.hp;
			player.storage[current].maxHp = player.maxHp;
			player.storage[current].hujia = player.hujia;
			player.storage[current].hs = player.getCards("h");
			player.storage[current].es = player.getVCards("e");
			player.lose(player.getCards("he"), ui.special)._triggered = null;

			var cfg = player.storage[event.directresult];
			player.storage.subplayer.name2 = event.directresult;
			player.reinit(current, event.directresult, [cfg.hp, cfg.maxHp, cfg.hujia]);
			if (player.name == event.directresult || player.name1 == event.directresult) {
				const groupx = cfg.group || "qun";
				player.group = groupx;
				player.node.name.dataset.nature = get.groupnature(groupx);
			}
			if (cfg.hs.length) player.directgain(cfg.hs);
			if (cfg.es.length) player.directequip(cfg.es);
		}
	},
	exitSubPlayer: function () {
		"step 0";
		if (player.storage.subplayer) {
			var current = player.storage.subplayer.name2;
			const goon = player.name == current || player.name1 == current;
			if (event.remove) {
				player.lose(player.getCards("he"), ui.discardPile)._triggered = null;
			} else {
				player.storage[current].hp = player.hp;
				player.storage[current].maxHp = player.maxHp;
				player.storage[current].hujia = player.hujia;
				player.storage[current].hs = player.getCards("h");
				player.storage[current].es = player.getVCards("e");
				player.lose(player.getCards("he"), ui.special)._triggered = null;
			}
			player.reinit(current, player.storage.subplayer.name, [player.storage.subplayer.hp, player.storage.subplayer.maxHp, player.storage.subplayer.hujia]);
			if (goon) {
				const groupx = player.storage.subplayer.group || "qun";
				player.group = groupx;
				player.node.name.dataset.nature = get.groupnature(groupx);
			}
			player.update();
			if (event.remove) {
				if (player.storage[current].onremove) {
					player.storage[current].onremove(player, current);
				}
				delete player.storage[current];
				player.storage.subplayer.skills.remove(current);
				game.log(player, "牺牲了随从", "#g" + current);
			} else {
				game.log(player, "收回了随从", "#g" + current);
			}
			player.addSkill(player.storage.subplayer.skills);
		}
		"step 1";
		if (player.storage.subplayer) {
			player.directgain(player.storage.subplayer.hs);
			player.directequip(player.storage.subplayer.es);
		}
		player.removeSkill("subplayer");
		"step 2";
		if (event.remove) {
			event.trigger("subPlayerDie");
		}
	},
	callSubPlayer: function () {
		"step 0";
		var list = player.getSubPlayers(event.tag);
		event.list = list;
		if (!event.directresult) {
			if (list.length > 1) {
				var dialog = ui.create.dialog("调遣一个随从", "hidden");
				dialog.add([list, "character"]);
				player.chooseButton(dialog, true);
			} else if (list.length == 1) {
				event.directresult = list[0];
			} else {
				event.finish();
			}
		} else {
			if (!list.includes(event.directresult)) {
				event.finish();
			}
		}
		"step 1";
		if (!event.directresult) {
			if (result && result.bool && result.links[0]) {
				event.directresult = result.links[0];
			} else {
				event.finish();
				return;
			}
		}
		if (event.directresult) {
			var cfg = player.storage[event.directresult];
			var source = cfg.source || player.name;
			var name = event.directresult;
			game.log(player, "调遣了随从", "#g" + name);
			player.storage.subplayer = {
				name: source,
				name2: event.directresult,
				hp: player.hp,
				maxHp: player.maxHp,
				hujia: player.hujia,
				skills: event.list.slice(0),
				hs: player.getCards("h"),
				es: player.getVCards("e"),
				intro2: cfg.intro2,
				group: player.group,
			};
			player.removeSkill(event.list);
			player.reinit(source, name, [cfg.hp, cfg.maxHp, cfg.hujia]);
			if (player.name == name || player.name1 == name) {
				const groupx = cfg.group || "qun";
				player.group = groupx;
				player.node.name.dataset.nature = get.groupnature(groupx);
			}
			player.addSkill("subplayer");
			player.lose(player.getCards("he"), ui.special)._triggered = null;
			if (cfg.hs.length) player.directgain(cfg.hs);
			if (cfg.es.length) player.directequip(cfg.es);
		}
		"step 2";
		game.delay();
	},
	addExtraTarget: function () {
		"step 0";
		event.num = 0;
		"step 1";
		var target = targets[num],
			info = get.info(card);
		if (target == event.target && event.addedTarget) {
			event.addedTargets[num] = event.addedTarget;
			event._result = { bool: false };
		} else if (
			game.hasPlayer(function (current) {
				return info.filterAddedTarget(card, player, current, target);
			})
		) {
			var next = player.chooseTarget(
				get.translation(event.card) + "：选择" + get.translation(targets[num]) + "对应的指向目标",
				function (card, player, target) {
					var card = get.card(),
						info = get.info(card);
					return info.filterAddedTarget(card, player, target, _status.event.preTarget);
				},
				true
			);
			next.set("_get_card", card);
			next.set("preTarget", targets[num]);
			next.set("ai", target => get.effect(target, get.card(), player, _status.event.player));
		} else {
			event.addedTargets[num] = false;
			event._result = { bool: false };
		}
		"step 2";
		if (result.bool) {
			event.addedTargets[num] = result.targets[0];
			player.line2([targets[num], result.targets[0]]);
		}
		event.num++;
		if (event.num < targets.length) event.goto(1);
	},
	reverseOrder: function () {
		"step 0";
		game.delay();
		"step 1";
		var choice;
		if (get.tag(card, "multineg")) {
			choice = player.previous.side == player.side ? "逆时针" : "顺时针";
		} else {
			choice = player.next.side == player.side ? "逆时针" : "顺时针";
		}
		player
			.chooseControl("顺时针", "逆时针", function (event, player) {
				return _status.event.choice || "逆时针";
			})
			.set("prompt", "选择" + get.translation(card) + "的结算方向")
			.set("choice", choice)
			.set("forceDie", true);
		"step 2";
		if (result && result.control == "顺时针") {
			var evt = event.getParent(),
				sorter = _status.currentPhase || player;
			evt.fixedSeat = true;
			evt.targets.sortBySeat(sorter);
			evt.targets.reverse();
			if (evt.targets[evt.targets.length - 1] == sorter) {
				evt.targets.unshift(evt.targets.pop());
			}
		}
	},
	addJudgeCard: function () {
		if (
			!card?.cards.some(card => {
				return get.position(card, true) !== "o";
			})
		) {
			target.addJudge(card, cards);
		}
	},
	equipCard: function () {
		if (
			!card?.cards.some(card => {
				return get.position(card, true) !== "o";
			})
		) {
			target.equip(card);
		}
		//if (cards.length && get.position(cards[0], true) == "o") target.equip(cards[0]);
	},
	gameDraw: function () {
		"step 0";
		if (_status.brawl && _status.brawl.noGameDraw) {
			event.finish();
			return;
		}
		var end = player;
		var numx = num;
		do {
			if (typeof num == "function") {
				numx = num(player);
			}
			if (player.getTopCards) player.directgain(player.getTopCards(numx));
			else player.directgain(get.cards(numx));
			if (player.singleHp === true && get.mode() != "guozhan" && (lib.config.mode != "doudizhu" || _status.mode != "online")) {
				player.doubleDraw();
			}
			player._start_cards = player.getCards("h");
			player = player.next;
		} while (player != end);
		event.changeCard = get.config("change_card");
		if (_status.connectMode || (lib.config.mode == "single" && _status.mode != "wuxianhuoli") || (lib.config.mode == "doudizhu" && _status.mode == "online") || (lib.config.mode != "identity" && lib.config.mode != "guozhan" && lib.config.mode != "doudizhu" && lib.config.mode != "single")) {
			event.changeCard = "disabled";
		}
		"step 1";
		if (event.changeCard != "disabled" && !_status.auto) {
			event.dialog = ui.create.dialog("是否使用手气卡？");
			ui.create.confirm("oc");
			event.custom.replace.confirm = function (bool) {
				_status.event.bool = bool;
				game.resume();
			};
		} else {
			event.finish();
		}
		"step 2";
		if (event.changeCard == "once") {
			event.changeCard = "disabled";
		} else if (event.changeCard == "twice") {
			event.changeCard = "once";
		} else if (event.changeCard == "disabled") {
			event.bool = false;
			return;
		}
		_status.imchoosing = true;
		event.switchToAuto = function () {
			_status.event.bool = false;
			game.resume();
		};
		game.pause();
		"step 3";
		_status.imchoosing = false;
		if (event.bool) {
			if (game.changeCoin) {
				game.changeCoin(-3);
			}
			var hs = game.me.getCards("h");
			game.addVideo("lose", game.me, [get.cardsInfo(hs), [], [], []]);
			for (var i = 0; i < hs.length; i++) {
				hs[i].discard(false);
			}
			game.me.directgain(get.cards(hs.length));
			event.goto(2);
		} else {
			if (event.dialog) event.dialog.close();
			if (ui.confirm) ui.confirm.close();
			game.me._start_cards = game.me.getCards("h");
			event.finish();
		}
	},
	phaseLoop: function () {
		"step 0";
		var num = 1,
			current = player;
		while (current.getSeatNum() == 0) {
			current.setSeatNum(num);
			current = current.next;
			num++;
		}
		"step 1";
		for (var i = 0; i < lib.onphase.length; i++) {
			lib.onphase[i]();
		}
		player.phase();
		"step 2";
		event.trigger("phaseOver");
		"step 3";
		if (!game.players.includes(event.player.next)) {
			event.player = game.findNext(event.player.next);
		} else {
			event.player = event.player.next;
		}
		event.goto(1);
	},
	loadPackage: function () {
		"step 0";
		if (event.packages.length) {
			window.game = game;
			var pack = event.packages.shift().split("/");
			lib.init.js(lib.assetURL + pack[0], pack[1], game.resume);
			game.pause();
		} else {
			event.finish();
		}
		"step 1";
		if (!lib.config.dev) delete window.game;
		var character = lib.imported.character;
		var card = lib.imported.card;
		var i, j, k;
		for (i in character) {
			if (character[i].character) {
				var characterPack = lib.characterPack[i];
				if (characterPack) Object.assign(characterPack, character[i].character);
				else lib.characterPack[i] = character[i].character;
			}
			if (character[i].forbid && character[i].forbid.includes(lib.config.mode)) continue;
			if (character[i].mode && character[i].mode.includes(lib.config.mode) == false) continue;

			if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
				lib[j].addArray(character[i][j]);
				continue;
			}
			for (j in character[i]) {
				if (j == "mode" || j == "forbid" || j == "characterSort") continue;
				//TODO: 改掉这第二坨
				for (k in character[i][j]) {
					if (j == "character") {
						if (!character[i][j][k][4]) {
							character[i][j][k][4] = [];
						}
						if (character[i][j][k][4].includes("boss") || character[i][j][k][4].includes("hiddenboss")) {
							lib.config.forbidai.add(k);
						}
						if (lib.config.forbidai_user && lib.config.forbidai_user.includes(k)) {
							lib.config.forbidai.add(k);
						}
						for (var l = 0; l < character[i][j][k][3].length; l++) {
							lib.skilllist.add(character[i][j][k][3][l]);
						}
					}
					if (j == "translate" && k == i) {
						lib[j][k + "_character_config"] = character[i][j][k];
					} else {
						if (lib[j][k] == undefined) {
							Object.defineProperty(lib[j], k, Object.getOwnPropertyDescriptor(character[i][j], k));
						} else if (Array.isArray(lib[j][k]) && Array.isArray(character[i][j][k])) {
							lib[j][k].addArray(character[i][j][k]);
						} else {
							console.log(`duplicated ${j} in character ${i}:\n${k}:\nlib.${j}.${k}`, lib[j][k], `\ncharacter.${i}.${j}.${k}`, character[i][j][k]);
						}
					}
				}
			}
		}
		for (i in card) {
			var cardPack = lib.cardPack[i] ? lib.cardPack[i] : (lib.cardPack[i] = []);
			if (card[i].card) {
				for (var j in card[i].card) {
					if (!card[i].card[j].hidden && card[i].translate[j + "_info"]) {
						cardPack.push(j);
					}
				}
			}
			for (j in card[i]) {
				if (j == "mode" || j == "forbid") continue;
				if (j == "list") continue;
				for (k in card[i][j]) {
					if (j == "skill" && k[0] == "_" && !lib.config.cards.includes(i)) {
						continue;
					}
					if (j == "translate" && k == i) {
						lib[j][k + "_card_config"] = card[i][j][k];
					} else {
						if (lib[j][k] == undefined) Object.defineProperty(lib[j], k, Object.getOwnPropertyDescriptor(card[i][j], k));
						else {
							console.log(`duplicated ${j} in card ${i}:\n${k}\nlib.${j}.${k}`, lib[j][k], `\ncard.${i}.${j}.${k}`, card[i][j][k]);
						}
					}
				}
			}
		}
		event.goto(0);
	},
	async loadMode(event) {
		await game.loadModeAsync(event.mode, exports => {
			event.result = exports;
			if (lib.imported.mode[event.mode]) delete lib.imported.mode[event.mode];
		});
	},
	forceOver: function () {
		"step 0";
		while (ui.controls.length) {
			ui.controls[0].close();
		}
		while (ui.dialogs.length) {
			ui.dialogs[0].close();
		}
		"step 1";
		if (event.bool != "noover") {
			game.over(event.bool);
		}
		if (event.callback) {
			event.callback();
		}
	},
	arrangeTrigger: async function (event, trigger, player) {
		const doingList = event.doingList.slice(0);

		while (doingList.length > 0) {
			event.doing = doingList.shift();
			while (true) {
				if (trigger.filterStop && trigger.filterStop()) return;
				const usableSkills = event.doing.todoList.filter(info => {
					return lib.filter.filterTrigger(trigger, info.player, event.triggername, info.skill, info.indexedData);
				});
				if (usableSkills.length == 0) {
					break;
				} else {
					event.doing.todoList = event.doing.todoList.filter(i => i.priority <= usableSkills[0].priority);
					//firstDo时机和lastDo时机不进行技能优先级选择
					if (get.itemtype(event.doing.player) !== "player") {
						event.current = usableSkills[0];
					} else {
						event.choice = usableSkills.filter(n => n.priority == usableSkills[0].priority);
						//现在只要找到一个同优先度技能为silent，或没有技能描述的技能 便优先执行该技能
						const silentSkill = event.choice.find(item => {
							const skillInfo = lib.skill[item.skill];
							return skillInfo && (skillInfo.silent || !lib.translate[item.skill]);
						});
						if (silentSkill) {
							event.current = silentSkill;
						} else {
							const currentChoice = event.choice[0],
								skillsToChoose = event.choice.map(i => i.skill).unique();
							if (event.choice.length === 1 || skillsToChoose.length === 1) {
								event.current = currentChoice;
							} else {
								const currentPlayer = currentChoice.player;
								const next = currentPlayer.chooseControl(skillsToChoose);
								next.set("prompt", "选择下一个触发的技能");
								next.set("forceDie", true);
								next.set("arrangeSkill", true);
								next.set("includeOut", true);
								const { result } = await next;
								event.current = usableSkills.find(info => info.skill == result.control);
							}
						}
					}
					event.doing.doneList.push(event.current);
					event.doing.todoList.remove(event.current);
					const result = await game.createTrigger(event.triggername, event.current.skill, event.current.player, trigger, event.current.indexedData).forResult();
					if (get.itemtype(event.doing.player) === "player" && result === "cancelled") {
						for (let i = 0; i < event.doing.todoList.length; i++) {
							if (event.current.skill === event.doing.todoList[i].skill) {
								event.doing.doneList.push(event.doing.todoList.splice(i--, 1)[0]);
							}
						}
					}
				}
			}
		}
	},
	createTrigger: function () {
		"step 0";
		// console.log('triggering: ' + player.name+ ' \'s skill: ' + event.skill+' in ' + event.triggername)
		if (game.expandSkills(player.getSkills().concat(lib.skill.global)).includes(event.skill)) return;
		var info = get.info(event.skill);
		let hidden = player.hiddenSkills.slice(0);
		let invisible = player.invisibleSkills.slice(0);
		game.expandSkills(hidden);
		game.expandSkills(invisible);
		if (hidden.includes(event.skill)) {
			if (!info.silent && player.hasSkillTag("nomingzhi", false, null, true)) event.finish();
			else if (!info.direct && typeof info.cost !== "function") event.trigger("triggerHidden");
			else event.skillHidden = true;
		} else if (invisible.includes(event.skill)) event.trigger("triggerInvisible");
		else if (
			Object.keys(player.additionalSkills).every(i => {
				if (i.startsWith("hidden:")) return true;
				return !game.expandSkills(player.additionalSkills[i]).includes(event.skill);
			})
		)
			event.finish();
		"step 1";
		if (event.cancelled) return event.finish();
		var info = get.info(event.skill);
		if (event.revealed || info.forced) {
			event._result = { bool: true };
			return;
		}
		const checkFrequent = function (info) {
			if (player.hasSkillTag("nofrequent", false, event.skill)) return false;
			if (typeof info.frequent == "boolean") return info.frequent;
			if (typeof info.frequent == "function") return info.frequent(trigger, player, event.triggername, event.indexedData);
			if (info.frequent == "check" && typeof info.check == "function") return info.check(trigger, player);
			return false;
		};
		if (info.direct) {
			if (player.isUnderControl()) game.swapPlayerAuto(player);
			if (player.isOnline()) void 0;
			event._result = { bool: true };
			event._direct = true;
		} else if (typeof info.cost === "function") {
			if (checkFrequent(info)) event.frequentSkill = true;
			if (player.isUnderControl()) game.swapPlayerAuto(player);
			//创建cost事件
			var next = game.createEvent(`${event.skill}_cost`);
			next.player = player;
			if (event.frequentSkill) next.set("frequentSkill", event.skill);
			next.set("forceDie", true);
			next.set("includeOut", true);
			next._trigger = trigger;
			next.triggername = event.triggername;
			next.skillHidden = event.skillHidden;
			next.indexedData = event.indexedData;
			if (info.forceDie) next.forceDie = true;
			if (info.forceOut) next.includeOut = true;
			next.skill = event.skill;
			next.setContent(info.cost);
		} else {
			if (checkFrequent(info)) event.frequentSkill = true;
			var str;
			var check = info.check;
			if (info.prompt) str = info.prompt;
			else if (typeof info.logTarget == "string") str = get.prompt(event.skill, trigger[info.logTarget], player);
			else if (typeof info.logTarget == "function") {
				const logTarget = info.logTarget(trigger, player, event.triggername, event.indexedData);
				if (get.itemtype(logTarget).startsWith("player")) str = get.prompt(event.skill, logTarget, player);
			} else str = get.prompt(event.skill, null, player);
			if (typeof str == "function") str = str(trigger, player, event.triggername, event.indexedData);

			var next = player.chooseBool(str);
			if (event.frequentSkill) next.set("frequentSkill", event.skill);
			next.set("forceDie", true);
			next.set("includeOut", true);
			next.ai = () => !check || check(trigger, player, event.triggername, event.indexedData);

			if (typeof info.prompt2 == "function") next.set("prompt2", info.prompt2(trigger, player, event.triggername, event.indexedData));
			else if (typeof info.prompt2 == "string") next.set("prompt2", info.prompt2);
			else if (info.prompt2 != false) {
				if (lib.dynamicTranslate[event.skill]) next.set("prompt2", lib.dynamicTranslate[event.skill](player, event.skill));
				else if (lib.translate[event.skill + "_info"]) next.set("prompt2", lib.translate[event.skill + "_info"]);
			}

			if (trigger.skillwarn) {
				if (next.prompt2) next.set("prompt2", '<span class="thundertext">' + trigger.skillwarn + "。</span>" + next.prompt2);
				else next.set("prompt2", trigger.skillwarn);
			}
		}
		"step 2";
		var info = get.info(event.skill);
		if (result && result.control) result.bool = !result.control.includes("cancel");
		if (!result || !result.bool) return;
		var autodelay = info.autodelay;
		if (typeof autodelay == "function") autodelay = autodelay(trigger, player);
		if (autodelay && (info.forced || !event.isMine())) {
			if (typeof autodelay == "number") game.delayx(autodelay);
			else game.delayx();
		}
		"step 3";
		var info = get.info(event.skill);
		if (!result || !result.bool) {
			if (info.oncancel) info.oncancel(trigger, player);
			if (event.indexedData === true) {
				event.result = "cancelled";
			}
			return event.finish();
		}
		let targets = null;
		if (result.targets && result.targets.length > 0) {
			targets = result.targets.slice(0);
		} else if (info.logTarget) {
			if (typeof info.logTarget === "string") targets = trigger[info.logTarget];
			else if (typeof info.logTarget === "function") targets = info.logTarget(trigger, player, event.triggername, event.indexedData);
		}
		if (get.itemtype(targets) === "player") {
			targets = [targets];
		}
		if (info.popup != false && !info.direct && !("skill_popup" in result && !Boolean(result["skill_popup"]))) {
			const popup_info = typeof info.popup === "string" ? [event.skill, info.popup] : event.skill;
			const args = [trigger, player, event.triggername, event.indexedData, result];
			player.logSkill(popup_info, info.logLine === false ? false : targets, info.line, null, args);
		}
		var next = game.createEvent(event.skill);
		if (typeof info.usable == "number") {
			player.addSkill("counttrigger");
			if (!player.storage.counttrigger) player.storage.counttrigger = {};
			if (!player.storage.counttrigger[event.skill]) player.storage.counttrigger[event.skill] = 1;
			else player.storage.counttrigger[event.skill]++;
		}
		next.player = player;
		next._trigger = trigger;
		next.triggername = event.triggername;
		next.setContent(info.content);

		next.skillHidden = event.skillHidden;
		if (info.forceDie) next.forceDie = true;
		if (info.forceOut) next.includeOut = true;
		//传入数据
		if (get.itemtype(targets) == "players") next.targets = targets.slice(0);
		if (get.itemtype(result.cards) === "cards") next.cards = result.cards.slice(0);
		//语法糖部分
		if ("cost_data" in result) next.cost_data = result.cost_data;
		next.indexedData = event.indexedData;
		"step 4";
		if (event.skill.startsWith("player_when_")) {
			player.removeSkill(event.skill);
			delete lib.skill[event.skill];
			delete lib.translate[event.skill];
		}
		if (!player._hookTrigger) return;
		if (
			player._hookTrigger.some(i => {
				const info = lib.skill[i].hookTrigger;
				return info && info.after && info.after(event, player, event.triggername);
			})
		)
			event.trigger("triggerAfter");
	},
	playVideoContent: function () {
		"step 0";
		game.delay(0, 500);
		"step 1";
		if (!game.chess) {
			ui.control.innerHTML = "";
			var nodes = [];
			for (var i = 0; i < ui.arena.childNodes.length; i++) {
				nodes.push(ui.arena.childNodes[i]);
			}
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i] == ui.canvas) continue;
				if (nodes[i] == ui.control) continue;
				if (nodes[i] == ui.mebg) continue;
				if (nodes[i] == ui.me) continue;
				if (nodes[i] == ui.roundmenu) continue;
				nodes[i].remove();
			}
			ui.sidebar.innerHTML = "";
			ui.cardPile.innerHTML = "";
			ui.discardPile.innerHTML = "";
			ui.special.innerHTML = "";
			ui.ordering.innerHTML = "";
		}
		ui.system.firstChild.innerHTML = "";
		ui.system.lastChild.innerHTML = "";
		ui.system.firstChild.appendChild(ui.config2);
		if (ui.updateVideoMenu) {
			ui.updateVideoMenu();
		}
		_status.videoDuration = 1 / parseFloat(lib.config.video_default_play_speed.slice(0, -1));
		ui.create.system("返回", function () {
			var mode = localStorage.getItem(lib.configprefix + "playbackmode");
			if (mode) {
				game.saveConfig("mode", mode);
			}
			game.reload();
		});
		ui.create.system("重播", function () {
			_status.replayvideo = true;
			game.playVideo(_status.playback, lib.config.mode);
		});
		ui.create.system("暂停", ui.click.pause, true).id = "pausebutton";
		var atempo = ui.create.system(
			"原速",
			function () {
				_status.videoDuration = 1;
				updateDuration();
			},
			true
		);
		var slow = ui.create.system(
			"减速",
			function () {
				_status.videoDuration *= 1.5;
				updateDuration();
			},
			true
		);
		var fast = ui.create.system(
			"加速",
			function () {
				_status.videoDuration /= 1.5;
				updateDuration();
			},
			true
		);
		var updateDuration = function () {
			atempo.innerHTML = `原速(当前${Math.round(100 / _status.videoDuration) / 100}倍速)`;
			if (_status.videoDuration > 1) {
				slow.classList.add("glow");
			} else {
				slow.classList.remove("glow");
			}
			if (_status.videoDuration < 1) {
				fast.classList.add("glow");
			} else {
				fast.classList.remove("glow");
			}
		};
		updateDuration();
		ui.system.style.display = "";
		ui.refresh(ui.system);
		ui.system.show();
		ui.window.show();
		if (lib.config.mode != "versus" && lib.config.mode != "boss") {
			ui.arena.style.display = "";
			ui.refresh(ui.arena);
			ui.arena.show();
		}
		if (!game.chess) {
			game.playerMap = {};
		}
		game.finishCards();
		"step 2";
		if (event.video.length) {
			var content = event.video.shift();
			// console.log(content);
			if (content.type == "delay") {
				game.delay(content.content);
			} else if (content.type == "play") {
				window.play = {};
				if (!event.playtoload) {
					event.playtoload = 1;
				} else {
					event.playtoload++;
				}
				var script = lib.init.js(lib.assetURL + "play", content.name);
				script.addEventListener("load", function () {
					var play = window.play[content.name];
					if (play && play.video) {
						play.video(content.init);
					}
					event.playtoload--;
					if (event.playtoload == 0) {
						delete window.play;
					}
				});
			} else if (typeof content.player == "string" && game.playerMap[content.player] && game.playerMap[content.player].classList && !game.playerMap[content.player].classList.contains("obstacle")) {
				game.videoContent[content.type](game.playerMap[content.player], content.content);
			} else {
				game.videoContent[content.type](content.content);
			}
			if (event.video.length) {
				game.delay(0, _status.videoDuration * Math.min(2000, event.video[0].delay));
			}
			event.redo();
		} else {
			_status.over = true;
			ui.system.lastChild.hide();
			setTimeout(function () {
				ui.system.lastChild.innerHTML = "";
			}, 500);
		}
	},
	waitForPlayer: function () {
		"step 0";
		ui.auto.hide();
		ui.pause.hide();

		game.createServer();
		if (!lib.translate.zhu) {
			lib.translate.zhu = "主";
		}
		if (event.func) {
			event.func();
		}
		if (!lib.configOL.number) {
			lib.configOL.number = parseInt(lib.configOL.player_number);
		}
		if (game.onlineroom) {
			game.send("server", "config", lib.configOL);
		}

		ui.create.connectPlayers(game.ip);
		if (!window.isNonameServer) {
			var me = game.connectPlayers[0];
			me.setIdentity("zhu");
			me.initOL(get.connectNickname(), lib.config.connect_avatar);
			me.playerid = "1";
			game.onlinezhu = "1";
		}
		_status.waitingForPlayer = true;
		if (window.isNonameServer) {
			document.querySelector("#server_status").innerHTML = "等待中";
		}
		game.pause();
		"step 1";
		_status.waitingForPlayer = false;
		lib.configOL.gameStarted = true;
		if (window.isNonameServer) {
			document.querySelector("#server_status").innerHTML = "游戏中";
		}
		if (game.onlineroom) {
			game.send("server", "config", lib.configOL);
		}
		for (var i = 0; i < game.connectPlayers.length; i++) {
			game.connectPlayers[i].delete();
		}
		delete game.connectPlayers;
		if (ui.roomInfo) {
			ui.roomInfo.remove();
			delete ui.roomInfo;
		}
		if (ui.exitroom) {
			ui.exitroom.remove();
			delete ui.exitroom;
		}
		game.broadcast("gameStart");
		game.delay(2);
		ui.auto.show();
		ui.pause.show();
		if (lib.config.show_cardpile) {
			ui.cardPileButton.style.display = "";
		}
	},
	replaceHandcards: function () {
		"step 0";
		if (event.players.includes(game.me)) {
			game.me.chooseBool("是否置换手牌？");
		} else {
			event.finish();
		}
		"step 1";
		if (result && result.bool) {
			var hs = game.me.getCards("h");
			for (var i = 0; i < hs.length; i++) {
				hs[i].discard(false);
			}
			var cards = get.cards(hs.length);
			game.me._start_cards = cards;
			game.me.directgain(cards);
		}
	},
	replaceHandcardsOL: function () {
		"step 0";
		var send = function () {
			game.me.chooseBool("是否置换手牌？");
			game.resume();
		};
		var sendback = function (result, player) {
			if (result && result.bool) {
				var hs = player.getCards("h");
				game.broadcastAll(
					function (player, hs) {
						game.addVideo("lose", player, [get.cardsInfo(hs), [], [], []]);
						for (var i = 0; i < hs.length; i++) {
							hs[i].discard(false);
						}
					},
					player,
					hs
				);
				var cards = get.cards(hs.length);
				player.directgain(cards);
				player._start_cards = cards;
			}
		};
		for (var i = 0; i < event.players.length; i++) {
			if (event.players[i].isOnline()) {
				event.withol = true;
				event.players[i].send(send);
				event.players[i].wait(sendback);
			} else if (event.players[i] == game.me) {
				event.withme = true;
				game.me.chooseBool("是否置换手牌？");
				game.me.wait(sendback);
			}
		}
		"step 1";
		if (event.withme) {
			game.me.unwait(result);
		}
		"step 2";
		if (event.withol && !event.resultOL) {
			game.pause();
		}
	},
	phase: function () {
		"step 0";
		//规则集中的“回合开始后③（处理“游戏开始时”的时机）”
		//提前phaseBefore时机解决“游戏开始时”时机和“一轮开始时”先后
		event.trigger("phaseBefore");
		"step 1";
		game.phaseNumber++;
		//初始化阶段列表
		if (!event.phaseList) {
			event.phaseList = ["phaseZhunbei", "phaseJudge", "phaseDraw", "phaseUse", "phaseDiscard", "phaseJieshu"];
		}
		if (typeof event.num != "number") {
			event.num = 0;
		}
		//规则集中的“回合开始后①”，更新游戏轮数，触发“一轮游戏开始时”
		var isRound = false;
		if (lib.onround.every(i => i(event, player))) {
			isRound = _status.roundSkipped;
			if (_status.isRoundFilter) {
				isRound = _status.isRoundFilter(event, player);
			} else if (_status.seatNumSettled) {
				var seatNum = player.getSeatNum();
				if (seatNum != 0) {
					if (get.itemtype(_status.lastPhasedPlayer) != "player" || seatNum < _status.lastPhasedPlayer.getSeatNum()) isRound = true;
					_status.lastPhasedPlayer = player;
				}
			} else if (player == _status.roundStart) isRound = true;
			if (isRound) {
				delete _status.roundSkipped;
				game.roundNumber++;
				event._roundStart = true;
				game.updateRoundNumber();
				for (var i = 0; i < game.players.length; i++) {
					if (game.players[i].isOut() && game.players[i].outCount > 0) {
						game.players[i].outCount--;
						if (game.players[i].outCount == 0 && !game.players[i].outSkills) {
							game.players[i].in();
						}
					}
				}
				event.trigger("roundStart");
			}
		}
		_status.globalHistory.push({
			cardMove: [],
			custom: [],
			useCard: [],
			changeHp: [],
			everything: [],
		});
		var players = game.players.slice(0).concat(game.dead);
		for (var i = 0; i < players.length; i++) {
			var current = players[i];
			current.actionHistory.push({
				useCard: [],
				respond: [],
				skipped: [],
				lose: [],
				gain: [],
				sourceDamage: [],
				damage: [],
				custom: [],
				useSkill: [],
			});
			current.stat.push({ card: {}, skill: {} });
			if (isRound) {
				current.getHistory().isRound = true;
				current.getStat().isRound = true;
			}
		}
		if (isRound) {
			game.getGlobalHistory().isRound = true;
		}
		"step 2";
		//规则集中的“回合开始后②（1v1武将登场专用）”
		event.trigger("phaseBeforeStart");
		"step 3";
		//规则集中的“回合开始后④（卑弥呼〖纵傀〗的时机）”
		event.trigger("phaseBeforeEnd");
		"step 4";
		//规则集中的“回合开始后⑤”，进行翻面检测
		if (player.isTurnedOver() && !event._noTurnOver) {
			player.turnOver();
			player.phaseSkipped = true;
			var players = game.players.slice(0).concat(game.dead);
			for (var i = 0; i < players.length; i++) {
				var current = players[i];
				current.getHistory().isSkipped = true;
				current.getStat().isSkipped = true;
			}
			event.cancel();
		} else {
			player.phaseSkipped = false;
			player.getHistory().isMe = true;
			player.getStat().isMe = true;
		}
		"step 5";
		//规则集中的“回合开始后⑥”，更新“当前回合角色”
		while (ui.dialogs.length) {
			ui.dialogs[0].close();
		}
		player.phaseNumber++;
		game.broadcastAll(
			function (player, num, popup) {
				if (lib.config.glow_phase) {
					player.classList.add("glow_phase");
				}
				player.phaseNumber = num;
				_status.currentPhase = player;
				if (popup && lib.config.show_phase_prompt) player.popup("回合开始", null, false);
			},
			player,
			player.phaseNumber,
			!player.noPhaseDelay
		);
		_status.currentPhase = player;
		_status.discarded = [];
		game.syncState();
		game.addVideo("phaseChange", player);
		if (game.phaseNumber == 1) {
			if (lib.configOL.observe) {
				lib.configOL.observeReady = true;
				game.send("server", "config", lib.configOL);
			}
		}
		game.log();
		game.log(player, "的回合开始");
		player._noVibrate = true;
		if (get.config("identity_mode") != "zhong" && get.config("identity_mode") != "purple" && !_status.connectMode) {
			var num;
			switch (get.config("auto_identity")) {
				case "one":
					num = 1;
					break;
				case "two":
					num = 2;
					break;
				case "three":
					num = 3;
					break;
				case "always":
					num = -1;
					break;
				default:
					num = 0;
					break;
			}
			if (num && !_status.identityShown && game.phaseNumber > game.players.length * num && game.showIdentity) {
				if (!_status.video) player.popup("显示身份");
				_status.identityShown = true;
				game.showIdentity(false);
			}
		}
		player.ai.tempIgnore = [];
		if (ui.land && ui.land.player == player) {
			game.addVideo("destroyLand");
			ui.land.destroy();
		}
		"step 6";
		//规则集中的“回合开始后⑦”，国战武将明置武将牌
		event.trigger("phaseBeginStart");
		"step 7";
		//规则集中的“回合开始后⑨”，进行当先，化身等操作
		//没有⑧ 因为⑧用不到
		event.trigger("phaseBegin");
		//阶段部分
		"step 8";
		if (num < event.phaseList.length) {
			//规则集中没有的新时机 可以用来插入额外阶段啥的
			if (player.isIn()) event.trigger("phaseChange");
		} else event.goto(11);
		"step 9";
		if (player.isIn() && num < event.phaseList.length) {
			var phase = event.phaseList[num].split("|");
			event.currentPhase = phase[0];
			var next = player[event.currentPhase]();
			next.phaseIndex = num;
			if (phase.length > 1) {
				next._extraPhaseReason = phase[1];
			}
			if (event.currentPhase == "phaseDraw" || event.currentPhase == "phaseDiscard") {
				if (!player.noPhaseDelay) {
					if (player == game.me) {
						game.delay();
					} else {
						game.delayx();
					}
				}
			}
		}
		"step 10";
		if (event.currentPhase == "phaseUse") {
			game.broadcastAll(function () {
				if (ui.tempnowuxie) {
					ui.tempnowuxie.close();
					delete ui.tempnowuxie;
				}
			});
			delete player._noSkill;
		}
		event.num++;
		"step 11";
		if (event.num < event.phaseList.length) {
			event.goto(8);
		} else if (!event._phaseEndTriggered) {
			event._phaseEndTriggered = true;
			event.trigger("phaseEnd");
			event.redo();
		}
		"step 12";
		event.trigger("phaseAfter");
		"step 13";
		//删除当前回合角色 此时处于“不属于任何角色的回合”的阶段
		game.broadcastAll(function (player) {
			player.classList.remove("glow_phase");
			delete _status.currentPhase;
		}, player);
	},
	/**
	 * @deprecated
	 */
	phase_old: function () {
		"step 0";
		player.phaseZhunbei();
		"step 1";
		player.phaseJudge();
		"step 2";
		player.phaseDraw();
		if (!player.noPhaseDelay) {
			if (player == game.me) {
				game.delay();
			} else {
				game.delayx();
			}
		}
		"step 3";
		player.phaseUse();
		"step 4";
		game.broadcastAll(function () {
			if (ui.tempnowuxie) {
				ui.tempnowuxie.close();
				delete ui.tempnowuxie;
			}
		});
		player.phaseDiscard();
		if (!player.noPhaseDelay) game.delayx();
		//delete player.using;
		delete player._noSkill;
		"step 5";
		player.phaseJieshu();
	},
	phaseZhunbei: function () {
		event.trigger(event.name);
		game.log(player, "进入了准备阶段");
	},
	phaseJudge: function () {
		"step 0";
		game.log(player, "进入了判定阶段");
		event.cards = player.getVCards("j");
		if (!event.cards.length) event.finish();
		"step 1";
		if (cards.length) {
			event.card = cards.pop();
			var cardName = event.card.name,
				cardInfo = lib.card[cardName];
			var currentCards = player.getCards("j");
			if (cardInfo.noEffect || event.card.cards?.some(card => !currentCards.includes(card))) {
				event.redo();
			} else {
				if (event.card.cards?.length) player.lose(event.card.cards, "visible", ui.ordering);
				player.$phaseJudge(event.card);
				event.cancelled = false;
				event.trigger("phaseJudge");
				player.popup(cardName, "thunder");
				if (!cardInfo.effect) {
					game.delay();
					event.redo();
				} else if (!cardInfo.judge) {
					game.delay();
					event.nojudge = true;
				} else {
					event.nojudge = false;
				}
			}
		} else event.finish();
		"step 2";
		if (!event.cancelled && !event.nojudge) player.judge(event.card).set("type", "phase");
		"step 3";
		var name = event.card.name;
		if (event.excluded) {
			delete event.excluded;
		} else if (event.cancelled && !event.direct) {
			if (lib.card[name].cancel) {
				var next = game.createEvent(name + "Cancel");
				next.setContent(lib.card[name].cancel);
				next.card = event.card;
				next.cards = event.card.cards ?? [];
				next.player = player;
			}
		} else {
			var next = game.createEvent(name);
			next.setContent(lib.card[name].effect);
			next._result = result;
			next.card = event.card;
			next.cards = event.card.cards ?? [];
			next.player = player;
		}
		ui.clear();
		event.goto(1);
	},
	/**
	 * @deprecated
	 */
	phaseDraw: function () {
		"step 0";
		game.log(player, "进入了摸牌阶段");
		event.trigger("phaseDrawBegin1");
		"step 1";
		event.trigger("phaseDrawBegin2");
		"step 2";
		if (game.modPhaseDraw) {
			game.modPhaseDraw(player, event.num);
		} else {
			if (event.num > 0) {
				var num = event.num;
				if (event.attachDraw) {
					for (var i = 0; i < event.attachDraw.length; i++) {
						ui.cardPile.insertBefore(event.attachDraw[i], ui.cardPile.firstChild);
					}
					num += event.attachDraw.length;
				}
				var next = player.draw(num);
				if (event.attachDraw) {
					next.minnum = event.attachDraw.length;
				}
			}
		}
		"step 3";
		if (Array.isArray(result)) {
			event.cards = result;
		}
	},
	phaseUse: function () {
		"step 0";
		const stat = player.getStat();
		for (let i in stat.skill) {
			let bool = false;
			const info = lib.skill[i];
			if (!info) continue;
			if (info.enable != undefined) {
				if (typeof info.enable == "string" && info.enable == "phaseUse") bool = true;
				else if (typeof info.enable == "object" && info.enable.includes("phaseUse")) bool = true;
			}
			if (bool) stat.skill[i] = 0;
		}
		for (let i in stat.card) {
			let bool = false;
			const info = lib.card[i];
			if (!info) continue;
			if (info.updateUsable == "phaseUse") stat.card[i] = 0;
		}
		"step 1";
		event.trigger("phaseUseBefore");
		"step 2";
		event.trigger("phaseUseBegin");
		"step 3";
		if (!event.logged) {
			game.log(player, "进入了出牌阶段");
			event.logged = true;
		}
		var next = player.chooseToUse();
		if (!lib.config.show_phaseuse_prompt) {
			next.set("prompt", false);
		}
		next.set("type", "phase");
		"step 4";
		if (result.bool && !event.skipped) {
			event.goto(3);
		}
		game.broadcastAll(function () {
			if (ui.tempnowuxie) {
				ui.tempnowuxie.close();
				delete ui.tempnowuxie;
			}
		});
		"step 5";
		event.trigger("phaseUseEnd");
		"step 6";
		event.trigger("phaseUseAfter");
	},
	phaseDiscard: function () {
		"step 0";
		game.log(player, "进入了弃牌阶段");
		event.num = player.needsToDiscard();
		event.trigger("phaseDiscard");
		if (event.num <= 0) event.finish();
		else {
			game.broadcastAll(function (player) {
				if (lib.config.show_phase_prompt) {
					player.popup("弃牌阶段", null, false);
				}
			}, player);
		}
		"step 1";
		player.chooseToDiscard(num, true).set("useCache", true);
		"step 2";
		event.cards = result.cards;
	},
	phaseJieshu: function () {
		event.trigger(event.name);
		game.log(player, "进入了结束阶段");
	},
	chooseToUse: function () {
		"step 0";
		if (event.responded) return;
		if (game.modeSwapPlayer && !_status.auto && player.isUnderControl() && !lib.filter.wuxieSwap(event)) {
			game.modeSwapPlayer(player);
		}
		var skills = player.getSkills("invisible").concat(lib.skill.global);
		game.expandSkills(skills);
		for (var i = 0; i < skills.length; i++) {
			var info = lib.skill[skills[i]];
			if (info && info.onChooseToUse) {
				info.onChooseToUse(event);
			}
		}
		if (_status.noclearcountdown !== "direct") _status.noclearcountdown = true;
		if (event.type == "phase") {
			if (event.isMine()) {
				event.endButton = ui.create.control("结束回合", "stayleft", function () {
					var evt = _status.event;
					if (evt.name != "chooseToUse" || evt.type != "phase") return;
					if (evt.skill) {
						ui.click.cancel();
					}
					ui.click.cancel();
				});
				event.fakeforce = true;
			} else {
				if (event.endButton) {
					event.endButton.close();
					delete event.endButton;
				}
				event.fakeforce = false;
			}
		}
		if (event.player.isUnderControl() && !_status.auto) {
			event.result = {
				bool: false,
			};
			return;
		} else if (event.isMine()) {
			if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
				ui.click.cancel();
				return;
			}
			if (event.type == "wuxie") {
				if (ui.tempnowuxie) {
					var triggerevent = event.getTrigger();
					if (triggerevent && triggerevent.targets && triggerevent.num == triggerevent.targets.length - 1) {
						ui.tempnowuxie.close();
					}
				}
				if (lib.filter.wuxieSwap(event)) {
					event.result = {
						bool: false,
					};
					return;
				}
			}
			var ok = game.check();
			if (!ok || !lib.config.auto_confirm) {
				game.pause();
				if (lib.config.enable_vibrate && player._noVibrate) {
					delete player._noVibrate;
					game.vibrate();
				}
				if (typeof event.prompt == "string") {
					if (event.openskilldialog) {
						event.skillDialog = ui.create.dialog(event.openskilldialog);
						delete event.openskilldialog;
						event.dialog = event.prompt;
					} else {
						event.dialog = ui.create.dialog(event.prompt);
						if (event.prompt2) {
							event.dialog.addText(event.prompt2);
						}
					}
				} else if (typeof event.prompt == "function") {
					event.dialog = ui.create.dialog(event.prompt(event));
				} else if (event.prompt == undefined) {
					var str;
					if (typeof event.filterCard == "object") {
						var filter = event.filterCard;
						str = "请使用" + get.cnNumber(event.selectCard[0]) + "张";
						if (filter.name) {
							str += get.translation(filter.name);
						} else {
							str += "牌";
						}
					} else {
						str = "请选择要使用的牌";
					}
					if (event.openskilldialog) {
						event.skillDialog = ui.create.dialog(event.openskilldialog);
						delete event.openskilldialog;
						event.dialog = str;
					} else if (typeof event.skillDialog != "string") {
						event.dialog = ui.create.dialog(str);
					} else {
						event.dialog = str;
					}
				}
			} else {
				delete event.openskilldialog;
			}
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		if (event.result == "ai") {
			var ok = game.check();
			if (ok) {
				ui.click.ok();
			} else if (ai.basic.chooseCard(event.ai1) || forced) {
				if ((ai.basic.chooseTarget(event.ai2) || forced) && (!event.filterOk || event.filterOk())) {
					ui.click.ok();
					event._aiexcludeclear = true;
				} else {
					if (!event.norestore) {
						if (event.skill) {
							var skill = event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							var info = get.info(skill);
							if (info.sourceSkill) {
								event._aiexclude.add(info.sourceSkill);
							}
						} else {
							get.card(true).aiexclude();
							game.uncheck();
						}
						event.redo();
						game.resume();
					} else {
						ui.click.cancel();
					}
				}
			} else if (event.skill && !event.norestore) {
				var skill = event.skill;
				ui.click.cancel();
				event._aiexclude.add(skill);
				var info = get.info(skill);
				if (info.sourceSkill) {
					event._aiexclude.add(info.sourceSkill);
				}
				event.redo();
				game.resume();
			} else {
				ui.click.cancel();
			}
			if (event.aidelay && event.result && event.result.bool) {
				game.delayx();
			}
		}
		"step 2";
		if (event.endButton) {
			event.endButton.close();
			delete event.endButton;
		}
		event.resume();
		if (event.result) {
			if (event.result._sendskill) {
				lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
			}
			if (event.result.skill) {
				var info = get.info(event.result.skill);
				if (info && info.chooseButton) {
					if (event.dialog && typeof event.dialog == "object") event.dialog.close();
					var dialog = info.chooseButton.dialog(event, player);
					if (info.chooseButton.chooseControl) {
						var next = player.chooseControl(info.chooseButton.chooseControl(event, player));
						if (dialog.direct) next.direct = true;
						if (dialog.forceDirect) next.forceDirect = true;
						next.dialog = dialog;
						next.set(
							"ai",
							info.chooseButton.check ||
								function () {
									return 0;
								}
						);
						if (event.id) next._parent_id = event.id;
						next.type = "chooseToUse_button";
					} else {
						var next = player.chooseButton(dialog);
						if (dialog.direct) next.direct = true;
						if (dialog.forceDirect) next.forceDirect = true;
						next.set(
							"ai",
							info.chooseButton.check ||
								function () {
									return 1;
								}
						);
						next.set(
							"filterButton",
							info.chooseButton.filter ||
								function () {
									return true;
								}
						);
						next.set("selectButton", info.chooseButton.select || 1);
						next.set("complexSelect", info.chooseButton.complexSelect !== false);
						next.set("filterOk", info.chooseButton.filterOk || (() => true));
						if (event.id) next._parent_id = event.id;
						next.type = "chooseToUse_button";
					}
					event.buttoned = event.result.skill;
				} else if (info && info.precontent && !game.online && !event.nouse) {
					var next = game.createEvent("pre_" + event.result.skill);
					next.setContent(info.precontent);
					next.set("result", event.result);
					next.set("player", player);
				}
			}
		}
		"step 3";
		if (event.buttoned) {
			if (result.bool || (result.control && result.control != "cancel2")) {
				var info = get.info(event.buttoned).chooseButton;
				lib.skill[event.buttoned + "_backup"] = info.backup(info.chooseControl ? result : result.links, player);
				lib.skill[event.buttoned + "_backup"].sourceSkill = event.buttoned;
				if (game.online) {
					event._sendskill = [event.buttoned + "_backup", lib.skill[event.buttoned + "_backup"]];
				} else {
					game.broadcast(
						(skill, audio) => {
							if (!lib.skill[skill]) lib.skill[skill] = {};
							lib.skill[skill].audio = audio;
						},
						event.buttoned + "_backup",
						lib.skill[event.buttoned + "_backup"].audio
					);
				}
				event.backup(event.buttoned + "_backup");
				if (info.prompt) {
					event.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
				}
			} else {
				ui.control.addTempClass("nozoom", 100);
				event._aiexclude.add(event.buttoned);
			}
			event.goto(0);
			delete event.buttoned;
		}
		"step 4";
		if (event._aiexcludeclear) {
			delete event._aiexcludeclear;
			event._aiexclude.length = 0;
		}
		delete _status.noclearcountdown;
		if (event.skillDialog && get.objtype(event.skillDialog) == "div") {
			event.skillDialog.close();
		}
		if (event.result && event.result.bool && !game.online && !event.nouse) {
			player.useResult(event.result, event);
		} else if (event._sendskill) {
			event.result._sendskill = event._sendskill;
		}
		if ((!event.result || !event.result.bool || event.result._noHidingTimer) && (event.result.skill || event.logSkill)) {
			var info = get.info(event.result.skill || (Array.isArray(event.logSkill) ? event.logSkill[0] : event.logSkill));
			if (info.direct && !info.clearTime) {
				_status.noclearcountdown = "direct";
			}
		}
		if (event.dialog && typeof event.dialog == "object") event.dialog.close();
		if (!_status.noclearcountdown) {
			game.stopCountChoose();
		}
		"step 5";
		if (event._result && event.result) {
			event.result.result = event._result;
		}
	},
	chooseToRespond: function () {
		"step 0";
		if (event.responded) {
			delete event.dialog;
			return;
		}
		var skills = player.getSkills("invisible").concat(lib.skill.global);
		game.expandSkills(skills);
		for (var i = 0; i < skills.length; i++) {
			var info = lib.skill[skills[i]];
			if (info && info.onChooseToRespond) {
				info.onChooseToRespond(event);
			}
		}
		if (_status.noclearcountdown !== "direct") _status.noclearcountdown = true;
		if (!_status.connectMode && lib.config.skip_shan && event.autochoose && event.autochoose()) {
			event.result = { bool: false };
		} else {
			if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
				game.modeSwapPlayer(player);
			}
			if (event.isMine()) {
				if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
					ui.click.cancel();
					return;
				}
				var ok = game.check();
				if (!ok || !lib.config.auto_confirm) {
					game.pause();
					if (event.openskilldialog) {
						event.skillDialog = ui.create.dialog(event.openskilldialog);
						delete event.openskilldialog;
						event.dialog = event.prompt;
					} else {
						if (event.prompt) event.dialog = ui.create.dialog(event.prompt);
						if (event.prompt2) event.dialog.addText(event.prompt2);
					}
				} else {
					delete event.openskilldialog;
				}
			} else if (event.isOnline()) {
				event.send();
			} else {
				event.result = "ai";
			}
		}
		"step 1";
		if (event.result == "ai") {
			var ok = game.check();
			if (ok) {
				ui.click.ok();
			} else if (ai.basic.chooseCard(event.ai1 || event.ai) || forced) {
				if ((ai.basic.chooseTarget(event.ai2) || forced) && (!event.filterOk || event.filterOk())) {
					ui.click.ok();
					event._aiexcludeclear = true;
				} else {
					if (!event.norestore) {
						if (event.skill) {
							var skill = event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							var info = get.info(skill);
							if (info.sourceSkill) {
								event._aiexclude.add(info.sourceSkill);
							}
						} else {
							get.card(true).aiexclude();
							game.uncheck();
						}
						event.redo();
						game.resume();
					} else {
						ui.click.cancel();
					}
				}
			} else if (event.skill && !event.norestore) {
				var skill = event.skill;
				ui.click.cancel();
				event._aiexclude.add(skill);
				var info = get.info(skill);
				if (info.sourceSkill) {
					event._aiexclude.add(info.sourceSkill);
				}
				event.redo();
				game.resume();
			} else {
				ui.click.cancel();
			}
			if (event.aidelay && event.result && event.result.bool) {
				game.delayx();
			}
		}
		"step 2";
		event.resume();
		if (event.result) {
			if (event.result._sendskill) {
				lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
			}
			if (event.result.skill) {
				var info = get.info(event.result.skill);
				if (info && info.chooseButton) {
					if (event.dialog && typeof event.dialog == "object") event.dialog.close();
					var dialog = info.chooseButton.dialog(event, player);
					if (info.chooseButton.chooseControl) {
						var next = player.chooseControl(info.chooseButton.chooseControl(event, player));
						if (dialog.direct) next.direct = true;
						if (dialog.forceDirect) next.forceDirect = true;
						next.dialog = dialog;
						next.set(
							"ai",
							info.chooseButton.check ||
								function () {
									return 0;
								}
						);
					} else {
						var next = player.chooseButton(dialog);
						if (dialog.direct) next.direct = true;
						if (dialog.forceDirect) next.forceDirect = true;
						next.set(
							"ai",
							info.chooseButton.check ||
								function () {
									return 1;
								}
						);
						next.set(
							"filterButton",
							info.chooseButton.filter ||
								function () {
									return true;
								}
						);
						next.set("selectButton", info.chooseButton.select || 1);
						next.set("filterOk", info.chooseButton.filterOk || (() => true));
					}
					event.buttoned = event.result.skill;
				} else if (info && info.precontent && !game.online) {
					var next = game.createEvent("pre_" + event.result.skill);
					next.setContent(info.precontent);
					next.set("result", event.result);
					next.set("player", player);
				}
			}
		}
		"step 3";
		if (event.buttoned) {
			if (result.bool || (result.control && result.control != "cancel2")) {
				var info = get.info(event.buttoned).chooseButton;
				lib.skill[event.buttoned + "_backup"] = info.backup(info.chooseControl ? result : result.links, player);
				lib.skill[event.buttoned + "_backup"].sourceSkill = event.buttoned;
				if (game.online) {
					event._sendskill = [event.buttoned + "_backup", lib.skill[event.buttoned + "_backup"]];
				} else {
					game.broadcast(
						(skill, audio) => {
							if (!lib.skill[skill]) lib.skill[skill] = {};
							lib.skill[skill].audio = audio;
						},
						event.buttoned + "_backup",
						lib.skill[event.buttoned + "_backup"].audio
					);
				}
				event.backup(event.buttoned + "_backup");
				if (info.prompt) {
					event.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
				}
			} else {
				ui.control.addTempClass("nozoom", 100);
				event._aiexclude.add(event.buttoned);
			}
			event.goto(0);
			delete event.buttoned;
		}
		"step 4";
		delete _status.noclearcountdown;
		if (event.skillDialog && get.objtype(event.skillDialog) == "div") {
			event.skillDialog.close();
		}
		if (event.result.bool && !game.online) {
			if (event.result._sendskill) {
				lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
			}
			if (event.onresult) {
				event.onresult(event.result);
			}
			if ((!event.result || !event.result.bool || event.result._noHidingTimer) && (event.result.skill || event.logSkill)) {
				var info = get.info(event.result.skill || (Array.isArray(event.logSkill) ? event.logSkill[0] : event.logSkill));
				if (info.direct && !info.clearTime) {
					_status.noclearcountdown = "direct";
				}
			}
			if (event.logSkill) {
				if (typeof event.logSkill == "string") {
					player.logSkill(event.logSkill);
				} else if (Array.isArray(event.logSkill)) {
					player.logSkill.apply(player, event.logSkill);
				}
			}
			if (!event.result.card && event.result.skill) {
				event.result.used = event.result.skill;
				player.useSkill(event.result.skill, event.result.cards, event.result.targets);
			} else {
				if (info && info.prerespond) {
					info.prerespond(event.result, player);
				}
				var next = player.respond(event.result.cards, event.result.card, event.animate, event.result.skill, event.source);
				if (event.result.noanimate) next.animate = false;
				if (event.parent.card && event.parent.type == "card") {
					next.set("respondTo", [event.parent.player, event.parent.card]);
				}
				if (event.noOrdering) next.noOrdering = true;
			}
		} else if (event._sendskill) {
			event.result._sendskill = event._sendskill;
		}
		if (event.dialog && event.dialog.close) event.dialog.close();
		if (!_status.noclearcountdown) {
			game.stopCountChoose();
		}
	},
	chooseToGive: function () {
		"step 0";
		event.result = {
			bool: true,
			confirm: "ok",
			buttons: [],
			links: [],
			cards: [],
			targets: [],
		};
		event.filterCard = (event => {
			const filterCard = event.filterCard;
			return function (card, player) {
				if (!lib.filter.canBeGained(card, this.target, player)) return false;
				return filterCard.call(this, card, player);
			};
		})(event);
		if (event.directresult) {
			event.result.cards = event.directresult.slice(0);
			event.goto(2);
			return;
		}
		const directFilter = event.forced && typeof event.filterOk != "function" && typeof event.selectCard != "function" && !event.complexCard;
		const cards = directFilter ? player.getCards(event.position).filter(card => !card.classList.contains("uncheck") && lib.filter.cardAiIncluded(card) && event.filterCard(card, player)) : [];
		const range = get.select(event.selectCard);
		if (directFilter && (range[0] >= cards.length || range[1] <= -1)) {
			if (player.isOut()) event.result.cards = [];
			else event.result.cards = cards;
		} else if (event.isMine()) {
			game.check();
			if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
				ui.click.cancel();
				return;
			}
			game.pause();
			if (range[1] > 1 && typeof event.selectCard != "function") {
				event.aiChoose = ui.create.control("AI代选", function () {
					ai.basic.chooseCard(event.ai);
					if (_status.event.custom && _status.event.custom.add.card) {
						_status.event.custom.add.card();
					}
					ui.selected.cards.forEach(i => i.updateTransform(true));
				});
			}
			if (Array.isArray(event.dialog)) {
				event.dialog = ui.create.dialog.apply(this, event.dialog);
				event.dialog.open();
				event.dialog.classList.add("noselect");
			} else if (event.prompt != false) {
				let prompt;
				if (typeof event.prompt == "string") prompt = event.prompt;
				else {
					let select;
					if (range[0] == range[1]) select = get.cnNumber(range[0]);
					else if (range[1] == Infinity) select = "至少" + get.cnNumber(range[0]);
					else select = get.cnNumber(range[0]) + "至" + get.cnNumber(range[1]);
					const position = event.position == "h" ? "手" : event.position == "e" ? "装备" : "";
					prompt = `请交给${get.translation(target)}${select}张${position}牌`;
				}
				event.dialog = ui.create.dialog(prompt);
				if (event.prompt2) {
					event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
				}
				if (Array.isArray(event.promptx)) {
					event.promptx.forEach(i => event.dialog.add(i));
				}
				if (Array.isArray(event.selectCard)) {
					event.promptbar = event.dialog.add("0/" + get.numStr(event.selectCard[1], "card"));
					event.custom.add.card = function () {
						_status.event.promptbar.innerHTML = ui.selected.cards.length + "/" + get.numStr(_status.event.selectCard[1], "card");
					};
				}
			} else if (get.itemtype(event.dialog) == "dialog") {
				event.dialog.style.display = "";
				event.dialog.open();
			}
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		if (event.result == "ai") {
			game.check();
			if ((ai.basic.chooseCard(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
				ui.click.ok();
			} else if (event.skill) {
				ui.click.cancel();
				event._aiexclude.add(event.skill);
				event.redo();
				game.resume();
			} else {
				ui.click.cancel();
			}
		}
		"step 2";
		event.resume();
		if (event.aiChoose) event.aiChoose.close();
		if (event.glow_result && event.result.cards && !event.directresult) {
			event.result.cards.forEach(i => i.classList.add("glow"));
		}
		if (event.dialog) event.dialog.close();
		"step 3";
		if (event.result.bool && event.result.cards && !game.online) {
			event.cards = event.result.cards.slice(0);
			if (event.logSkill) {
				if (Array.isArray(event.logSkill)) player.logSkill(...event.logSkill);
				else player.logSkill(event.logSkill);
			}
			if (event.autodelay && !event.isMine()) {
				if (typeof event.autodelay == "number") game.delayx(event.autodelay);
				else game.delayx();
			}
		} else event.finish();
		"step 4";
		if (event.boolline) player.line(target, "green");
		event.done = target.gain(event.cards, player);
		event.done.giver = player;
		if (event.delay !== false) event.done.animate = event.visibleMove ? "give" : "giveAuto";
		else {
			target[event.visibleMove ? "$give" : "$giveAuto"](cards, player);
			if (event.visibleMove) event.done.visible = true;
		}
	},
	chooseToDiscard: function () {
		"step 0";
		if (event.autochoose()) {
			event.result = {
				bool: true,
				autochoose: true,
				cards: player.getCards(event.position),
				rawcards: player.getCards(event.position),
			};
			for (var i = 0; i < event.result.cards.length; i++) {
				if (!lib.filter.cardDiscardable(event.result.cards[i], player, event)) {
					event.result.cards.splice(i--, 1);
				}
			}
		} else {
			// &&!lib.filter.wuxieSwap(trigger)
			if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
				game.modeSwapPlayer(player);
			}
			event.rangecards = player.getCards(event.position);
			for (var i = 0; i < event.rangecards.length; i++) {
				if (lib.filter.cardDiscardable(event.rangecards[i], player, event)) {
					event.rangecards.splice(i--, 1);
				} else {
					event.rangecards[i].uncheck("chooseToDiscard");
				}
			}
			var range = get.select(event.selectCard);
			if (event.isMine()) {
				game.check();
				if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
					ui.click.cancel();
					return;
				}
				game.pause();
				if (range[1] > 1 && typeof event.selectCard != "function") {
					event.promptdiscard = ui.create.control("AI代选", function () {
						ai.basic.chooseCard(event.ai);
						if (_status.event.custom && _status.event.custom.add.card) {
							_status.event.custom.add.card();
						}
						for (var i = 0; i < ui.selected.cards.length; i++) {
							ui.selected.cards[i].updateTransform(true);
						}
					});
				}
				if (Array.isArray(event.dialog)) {
					event.dialog = ui.create.dialog.apply(this, event.dialog);
					event.dialog.open();
					event.dialog.classList.add("noselect");
				} else if (event.prompt != false) {
					var str;
					if (typeof event.prompt == "string") str = event.prompt;
					else {
						str = "请弃置";
						if (range[0] == range[1]) str += get.cnNumber(range[0]);
						else if (range[1] == Infinity) str += "至少" + get.cnNumber(range[0]);
						else str += get.cnNumber(range[0]) + "至" + get.cnNumber(range[1]);
						str += "张";
						if (event.position == "h" || event.position == undefined) str += "手";
						if (event.position == "e") str += "装备";
						str += "牌";
					}
					event.dialog = ui.create.dialog(str);
					if (event.prompt2) {
						event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
					}
					if (Array.isArray(event.selectCard)) {
						event.promptbar = event.dialog.add("0/" + get.numStr(event.selectCard[1], "card"));
						event.custom.add.card = function () {
							_status.event.promptbar.innerHTML = ui.selected.cards.length + "/" + get.numStr(_status.event.selectCard[1], "card");
						};
					}
				} else if (get.itemtype(event.dialog) == "dialog") {
					event.dialog.style.display = "";
					event.dialog.open();
				}
			} else if (event.isOnline()) {
				event.send();
			} else {
				event.result = "ai";
			}
		}
		"step 1";
		if (event.result == "ai") {
			game.check();
			if ((ai.basic.chooseCard(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
				ui.click.ok();
			} else if (event.skill) {
				var skill = event.skill;
				ui.click.cancel();
				event._aiexclude.add(skill);
				event.redo();
				game.resume();
			} else {
				ui.click.cancel();
			}
		}
		if (event.rangecards) {
			for (var i = 0; i < event.rangecards.length; i++) {
				event.rangecards[i].recheck("chooseToDiscard");
			}
		}
		"step 2";
		event.resume();
		if (event.promptdiscard) {
			event.promptdiscard.close();
		}
		"step 3";
		if (event.result.bool && event.result.cards && event.result.cards.length && !game.online && event.autodelay && !event.isMine()) {
			if (typeof event.autodelay == "number") {
				game.delayx(event.autodelay);
			} else {
				game.delayx();
			}
		}
		"step 4";
		if (event.logSkill && event.result.bool && !game.online) {
			if (typeof event.logSkill == "string") {
				player.logSkill(event.logSkill);
			} else if (Array.isArray(event.logSkill)) {
				player.logSkill.apply(player, event.logSkill);
			}
		}
		if (!game.online && !event.chooseonly) {
			if (typeof event.delay == "boolean") {
				event.done = player.discard(event.result.cards).set("delay", event.delay);
			} else {
				event.done = player.discard(event.result.cards);
			}
			event.done.discarder = player;
		}
		if (event.dialog && event.dialog.close) event.dialog.close();
	},
	gaincardMultiple: function () {
		"step 0";
		event.type = "gain";
		if (event.animate == "give" || event.animate == "gain2") event.visible = true;
		if (player && cards) {
			event._lose = true;
			player.lose(cards, ui.special).set("type", "gain").set("forceDie", true).set("getlx", false);
		}
		"step 1";
		switch (event.animate) {
			case "draw":
				game.delay(0, get.delayx(500, 500));
				for (var i of event.gain_list) {
					if (get.itemtype(i[1]) == "card") i[1] = [i[1]];
					if (event._lose) {
						i[1] = i[1].filter(card => {
							return !cards.includes(card) || !player.getCards("hejsx").includes(card);
						});
					}
					if (i[1].length > 0) i[0].$draw(i[1].length);
				}
				break;
			case "gain":
				game.delay(0, get.delayx(700, 700));
				for (var i of event.gain_list) {
					if (get.itemtype(i[1]) == "card") i[1] = [i[1]];
					if (event._lose) {
						i[1] = i[1].filter(card => {
							return !cards.includes(card) || !player.getCards("hejsx").includes(card);
						});
					}
					if (i[1].length > 0) i[0].$gain(i[1].length);
				}
				break;
			case "gain2":
			case "draw2":
				game.delay(0, get.delayx(500, 500));
				for (var i of event.gain_list) {
					if (get.itemtype(i[1]) == "card") i[1] = [i[1]];
					if (event._lose) {
						i[1] = i[1].filter(card => {
							return !cards.includes(card) || !player.getCards("hejsx").includes(card);
						});
					}
					if (i[1].length > 0) i[0].$gain2(i[1]);
				}
				break;
			case "give":
			case "giveAuto":
				if (!player) break;
				var evt = event.getl(player);
				game.delay(0, get.delayx(500, 500));
				for (var i of event.gain_list) {
					if (get.itemtype(i[1]) == "card") i[1] = [i[1]];
					if (event._lose) {
						i[1] = i[1].filter(card => {
							return !cards.includes(card) || !player.getCards("hejsx").includes(card);
						});
					}
					var shown = i[1].slice(0),
						hidden = [];
					if (event.animate == "giveAuto") {
						for (var card of i[1]) {
							if (evt.hs.includes(card)) {
								shown.remove(card);
								hidden.push(card);
							}
						}
					}
					if (shown.length > 0) player.$give(shown, i[0]);
					if (hidden.length > 0) player.$giveAuto(hidden, i[0]);
				}
				break;
		}
		for (var i of event.gain_list) {
			if (i[1].length > 0) {
				var next = i[0].gain(i[1]);
				next.getlx = false;
				if (event.visible) next.visible = true;
				if (event.giver) next.giver = event.giver;
				if (event.gaintag) next.gaintag.addArray(event.gaintag);
			}
		}
		"step 2";
		game.delayx();
	},
	discardMultiple: function () {
		"step 0";
		event.type = "discard";
		event.visible = true;
		if (!event.position) event.position = ui.discardPile;
		var cards = [];
		event.cards = cards;
		for (var i = 0; i < event.lose_list.length; i++) {
			var next = event.lose_list[i][0].lose(event.lose_list[i][1], event.position);
			game.log(event.lose_list[i][0], "弃置了", event.lose_list[i][1]);
			next.type = "discard";
			next.animate = false;
			next.delay = false;
			cards.addArray(event.lose_list[i][1]);
			next.getlx = false;
		}
		var evt = event;
		if (evt.animate != false) {
			evt.discardid = lib.status.videoId++;
			game.broadcastAll(
				function (list, id, cards) {
					for (var i of list) {
						for (var j of i[1]) {
							j.classList.remove("glow");
							j.classList.remove("glows");
						}
						i[0].$throw(i[1], null, "nobroadcast");
					}
					var cardnodes = [];
					cardnodes._discardtime = get.time();
					for (var ix of list) {
						var card = ix[1];
						for (var i = 0; i < cards.length; i++) {
							if (cards[i].clone) {
								cardnodes.push(cards[i].clone);
							}
						}
					}
					ui.todiscard[id] = cardnodes;
				},
				event.lose_list,
				evt.discardid,
				cards
			);
			if (lib.config.sync_speed && cards[0] && cards[0].clone) {
				if (evt.delay != false) {
					var waitingForTransition = get.time();
					evt.waitingForTransition = waitingForTransition;
					cards[0].clone.listenTransition(function () {
						if (_status.waitingForTransition == waitingForTransition && _status.paused) {
							game.resume();
						}
						delete evt.waitingForTransition;
					});
				} else if (evt.getParent().discardTransition) {
					delete evt.getParent().discardTransition;
					var waitingForTransition = get.time();
					evt.getParent().waitingForTransition = waitingForTransition;
					cards[0].clone.listenTransition(function () {
						if (_status.waitingForTransition == waitingForTransition && _status.paused) {
							game.resume();
						}
						delete evt.getParent().waitingForTransition;
					});
				}
			}
		}
		"step 1";
		if (event.delay != false) {
			if (event.waitingForTransition) {
				_status.waitingForTransition = event.waitingForTransition;
				game.pause();
			} else {
				game.delayx();
			}
		}
	},
	chooseToCompareLose: function () {
		for (var i = 0; i < event.lose_list.length; i++) {
			var next = event.lose_list[i][0].lose(event.lose_list[i][1], ui.ordering);
			next.relatedEvent = event.getParent();
			next.getlx = false;
		}
	},
	chooseToCompareMeanwhile: function () {
		"step 0";
		if (player.countCards("h") == 0) {
			event.result = { cancelled: true, bool: false };
			event.finish();
			return;
		}
		for (var i = 0; i < targets.length; i++) {
			if (targets[i].countCards("h") == 0) {
				event.result = { cancelled: true, bool: false };
				event.finish();
				return;
			}
		}
		if (!event.multitarget) {
			targets.sort(lib.sort.seat);
		}
		game.log(player, "对", targets, "发起了共同拼点");
		event.compareMeanwhile = true;
		if (!event.filterCard) event.filterCard = lib.filter.all;
		"step 1";
		event._result = [];
		event.list = targets.filter(function (current) {
			return !event.fixedResult || !event.fixedResult[current.playerid];
		});
		if (event.list.length || !event.fixedResult || !event.fixedResult[player.playerid]) {
			if (!event.fixedResult || !event.fixedResult[player.playerid]) event.list.unshift(player);
			player.chooseCardOL(event.list, "请选择拼点牌", true).set("filterCard", event.filterCard).set("type", "compare").set("ai", event.ai).set("source", player).aiCard = function (target) {
				var hs = target.getCards("h");
				var event = _status.event;
				event.player = target;
				hs.sort(function (a, b) {
					return event.ai(b) - event.ai(a);
				});
				delete event.player;
				return { bool: true, cards: [hs[0]] };
			};
		}
		"step 2";
		var cards = [];
		var lose_list = [];
		if (event.fixedResult && event.fixedResult[player.playerid]) {
			event.list.unshift(player);
			result.unshift({ bool: true, cards: [event.fixedResult[player.playerid]] });
			lose_list.push([player, [event.fixedResult[player.playerid]]]);
		} else {
			if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
				player.logSkill(result[0].skill);
				result[0].cards = lib.skill[result[0].skill].onCompare(player);
			} else lose_list.push([player, result[0].cards]);
		}
		for (var j = 0; j < targets.length; j++) {
			if (event.list.includes(targets[j])) {
				var i = event.list.indexOf(targets[j]);
				if (result[i].skill && lib.skill[result[i].skill] && lib.skill[result[i].skill].onCompare) {
					event.list[i].logSkill(result[i].skill);
					result[i].cards = lib.skill[result[i].skill].onCompare(event.list[i]);
				} else lose_list.push([targets[j], result[i].cards]);
				cards.push(result[i].cards[0]);
			} else if (event.fixedResult && event.fixedResult[targets[j].playerid]) {
				cards.push(event.fixedResult[targets[j].playerid]);
				lose_list.push([targets[j], [event.fixedResult[targets[j].playerid]]]);
			}
		}
		if (lose_list.length) {
			game.loseAsync({
				lose_list: lose_list,
			}).setContent("chooseToCompareLose");
		}
		event.lose_list = lose_list;
		event.getNum = function (card) {
			for (var i of event.lose_list) {
				if (i[1].contains && i[1].includes(card)) return get.number(card, i[0]);
			}
			return get.number(card, false);
		};
		event.cardlist = cards;
		event.cards = cards;
		event.card1 = result[0].cards[0];
		event.num1 = event.getNum(event.card1);
		event.iwhile = 0;
		event.winner = null;
		event.maxNum = -1;
		event.tempplayer = event.player;
		event.result = {
			winner: null,
			player: event.card1,
			targets: event.cardlist.slice(0),
			num1: [],
			num2: [],
		};
		"step 3";
		event.trigger("compareCardShowBefore");
		"step 4";
		player.$compareMultiple(event.card1, targets, cards);
		game.log(player, "的拼点牌为", event.card1);
		event.cardlist.forEach((card, index) => {
			game.log(targets[index], "的拼点牌为", card);
		});
		player.addTempClass("target");
		game.delay(0, 1000);
		"step 5";
		event.target = null;
		event.trigger("compare");
		"step 6";
		if (event.iwhile < targets.length) {
			event.target = targets[event.iwhile];
			event.target.addTempClass("target");
			event.card2 = event.cardlist[event.iwhile];
			event.num2 = event.getNum(event.card2);
			//event.tempplayer.line(event.target);
			delete event.player;
			event.trigger("compare");
		} else {
			event.iwhile = 0;
			game.delay(0, 1000);
			event.goto(9);
		}
		"step 7";
		event.result.num1[event.iwhile] = event.num1;
		event.result.num2[event.iwhile] = event.num2;
		var list = [
			[event.tempplayer, event.num1],
			[event.target, event.num2],
		];
		for (var i of list) {
			if (i[1] > event.maxNum) {
				event.maxNum = i[1];
				event.winner = i[0];
			} else if (event.winner && i[1] == event.maxNum && i[0] != event.winner) {
				event.winner = null;
			}
		}
		"step 8";
		event.iwhile++;
		event.goto(6);
		"step 9";
		event.player = event.tempplayer;
		event.trigger("compareFixing");
		"step 10";
		if (event.player) delete event.player;
		if (event.iwhile < targets.length) {
			event.target = targets[event.iwhile];
			event.card2 = event.cardlist[event.iwhile];
			event.num2 = event.result.num2[event.iwhile];
			event.trigger("compareFixing");
		} else {
			event.goto(12);
		}
		"step 11";
		event.iwhile++;
		event.goto(10);
		"step 12";
		var player = event.tempplayer;
		event.player = player;
		delete event.tempplayer;
		var str = "无人拼点成功";
		const winner = event.forceWinner || event.winner;
		if (winner) {
			event.result.winner = winner;
			str = get.translation(winner) + "拼点成功";
			game.log(winner, "拼点成功");
			winner.popup("胜");
		} else game.log("#b无人", "拼点成功");
		var list = [player].addArray(targets);
		list.remove(winner);
		for (var i of list) {
			i.popup("负");
		}
		if (str) {
			game.broadcastAll(function (str) {
				var dialog = ui.create.dialog(str);
				dialog.classList.add("center");
				setTimeout(function () {
					dialog.close();
				}, 1000);
			}, str);
		}
		game.delay(3);
		"step 13";
		game.broadcastAll(ui.clear);
		"step 14";
		event.cards.add(event.card1);
	},
	chooseToCompareMultiple: function () {
		"step 0";
		if (player.countCards("h") == 0) {
			event.result = { cancelled: true, bool: false };
			event.finish();
			return;
		}
		for (var i = 0; i < targets.length; i++) {
			if (targets[i].countCards("h") == 0) {
				event.result = { cancelled: true, bool: false };
				event.finish();
				return;
			}
		}
		if (!event.multitarget) {
			targets.sort(lib.sort.seat);
		}
		game.log(player, "对", targets, "发起拼点");
		if (!event.filterCard) event.filterCard = lib.filter.all;
		"step 1";
		event._result = [];
		event.list = targets.filter(function (current) {
			return !event.fixedResult || !event.fixedResult[current.playerid];
		});
		if (event.list.length || !event.fixedResult || !event.fixedResult[player.playerid]) {
			if (!event.fixedResult || !event.fixedResult[player.playerid]) event.list.unshift(player);
			player.chooseCardOL(event.list, "请选择拼点牌", true).set("filterCard", event.filterCard).set("type", "compare").set("ai", event.ai).set("source", player).aiCard = function (target) {
				var hs = target.getCards("h");
				var event = _status.event;
				event.player = target;
				hs.sort(function (a, b) {
					return event.ai(b) - event.ai(a);
				});
				delete event.player;
				return { bool: true, cards: [hs[0]] };
			};
		}
		"step 2";
		var cards = [];
		var lose_list = [];
		if (event.fixedResult && event.fixedResult[player.playerid]) {
			event.list.unshift(player);
			result.unshift({ bool: true, cards: [event.fixedResult[player.playerid]] });
			lose_list.push([player, [event.fixedResult[player.playerid]]]);
		} else {
			if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
				player.logSkill(result[0].skill);
				result[0].cards = lib.skill[result[0].skill].onCompare(player);
			} else lose_list.push([player, result[0].cards]);
		}
		for (var j = 0; j < targets.length; j++) {
			if (event.list.includes(targets[j])) {
				var i = event.list.indexOf(targets[j]);
				if (result[i].skill && lib.skill[result[i].skill] && lib.skill[result[i].skill].onCompare) {
					event.list[i].logSkill(result[i].skill);
					result[i].cards = lib.skill[result[i].skill].onCompare(event.list[i]);
				} else lose_list.push([targets[j], result[i].cards]);
				cards.push(result[i].cards[0]);
			} else if (event.fixedResult && event.fixedResult[targets[j].playerid]) {
				cards.push(event.fixedResult[targets[j].playerid]);
				lose_list.push([targets[j], [event.fixedResult[targets[j].playerid]]]);
			}
		}
		if (lose_list.length) {
			game.loseAsync({
				lose_list: lose_list,
			}).setContent("chooseToCompareLose");
		}
		event.lose_list = lose_list;
		event.getNum = function (card) {
			for (var i of event.lose_list) {
				if (i[1].contains && i[1].includes(card)) return get.number(card, i[0]);
			}
			return get.number(card, false);
		};
		event.cardlist = cards;
		event.cards = cards;
		event.card1 = result[0].cards[0];
		event.num1 = event.getNum(event.card1);
		event.iwhile = 0;
		event.result = {
			player: event.card1,
			targets: event.cardlist.slice(0),
			num1: [],
			num2: [],
		};
		"step 3";
		event.trigger("compareCardShowBefore");
		"step 4";
		game.log(player, "的拼点牌为", event.card1);
		"step 5";
		if (event.iwhile < targets.length) {
			event.target = targets[event.iwhile];
			event.target.addTempClass("target");
			player.addTempClass("target");
			event.card2 = event.cardlist[event.iwhile];
			event.num2 = event.getNum(event.card2);
			game.log(event.target, "的拼点牌为", event.card2);
			player.line(event.target);
			player.$compare(event.card1, event.target, event.card2);
			event.trigger("compare");
			game.delay(0, 1500);
		} else {
			event.goto(10);
		}
		"step 6";
		event.iiwhile = event.iwhile;
		delete event.iwhile;
		event.trigger("compareFixing");
		"step 7";
		event.result.num1[event.iiwhile] = event.num1;
		event.result.num2[event.iiwhile] = event.num2;
		var str;
		if (event.forceWinner === player || (event.forceWinner !== target && event.num1 > event.num2)) {
			event.winner = player;
			str = get.translation(player) + "拼点成功";
			player.popup("胜");
			target.popup("负");
		} else {
			str = get.translation(player) + "拼点失败";
			if (event.forceWinner !== target && event.num1 == event.num2) {
				player.popup("平");
				target.popup("平");
			} else {
				event.winner = target;
				player.popup("负");
				target.popup("胜");
			}
		}
		game.broadcastAll(function (str) {
			var dialog = ui.create.dialog(str);
			dialog.classList.add("center");
			setTimeout(function () {
				dialog.close();
			}, 1000);
		}, str);
		game.delay(2);
		"step 8";
		if (event.callback) {
			game.broadcastAll(
				function (card1, card2) {
					if (card1.clone) card1.clone.style.opacity = 0.5;
					if (card2.clone) card2.clone.style.opacity = 0.5;
				},
				event.card1,
				event.card2
			);
			var next = game.createEvent("compareMultiple");
			next.player = player;
			next.target = event.target;
			next.card1 = event.card1;
			next.card2 = event.card2;
			next.num1 = event.num1;
			next.num2 = event.num2;
			next.winner = event.winner;
			next.setContent(event.callback);
			event.compareMultiple = true;
		}
		"step 9";
		game.broadcastAll(ui.clear);
		delete event.winner;
		delete event.forceWinner;
		event.iwhile = event.iiwhile + 1;
		event.goto(5);
		"step 10";
		event.cards.add(event.card1);
	},
	chooseToCompare: function () {
		"step 0";
		if (((!event.fixedResult || !event.fixedResult[player.playerid]) && player.countCards("h") == 0) || ((!event.fixedResult || !event.fixedResult[target.playerid]) && target.countCards("h") == 0)) {
			event.result = { cancelled: true, bool: false };
			event.finish();
			return;
		}
		game.log(player, "对", target, "发起拼点");
		if (!event.filterCard) event.filterCard = lib.filter.all;
		"step 1";
		event.list = [player, target].filter(function (current) {
			return !event.fixedResult || !event.fixedResult[current.playerid];
		});
		if (event.list.length) {
			player.chooseCardOL(event.list, "请选择拼点牌", true).set("filterCard", event.filterCard).set("type", "compare").set("ai", event.ai).set("source", player).aiCard = function (target) {
				var hs = target.getCards("h");
				var event = _status.event;
				event.player = target;
				hs.sort(function (a, b) {
					return event.ai(b) - event.ai(a);
				});
				delete event.player;
				return { bool: true, cards: [hs[0]] };
			};
		}
		"step 2";
		const lose_list = [];
		if (event.fixedResult && event.fixedResult[player.playerid]) {
			lose_list.push([player, [event.fixedResult[player.playerid]]]);
		} else {
			if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
				player.logSkill(result[0].skill);
				result[0].cards = lib.skill[result[0].skill].onCompare(player);
			}
			lose_list.push([player, result[0].cards]);
		}
		event.card1 = lose_list[0][1][0];
		if (event.list.includes(target)) {
			let index = event.list.indexOf(target);
			if (result[index].skill && lib.skill[result[index].skill] && lib.skill[result[index].skill].onCompare) {
				target.logSkill(result[index].skill);
				result[index].cards = lib.skill[result[index].skill].onCompare(target);
			}
			lose_list.push([target, result[index].cards]);
		} else if (event.fixedResult && event.fixedResult[target.playerid]) {
			lose_list.push([target, [event.fixedResult[target.playerid]]]);
		}
		event.card2 = lose_list[1][1][0];
		event.lose_list = lose_list;
		"step 3"
		if (event.card2.number >= 10 || event.card2.number <= 4) {
			if (target.countCards("h") > 2) {
				event.addToAI = true;
			}
		}
		"step 4"
		if (event.lose_list.length) {
			game.loseAsync({
				lose_list: event.lose_list,
			}).setContent("chooseToCompareLose");
		}
		"step 5";
		event.trigger("compareCardShowBefore");
		"step 6";
		game.broadcast(function () {
			ui.arena.classList.add("thrownhighlight");
		});
		ui.arena.classList.add("thrownhighlight");
		game.addVideo("thrownhighlight1");
		player.$compare(event.card1, target, event.card2);
		game.log(player, "的拼点牌为", event.card1);
		game.log(target, "的拼点牌为", event.card2);
		var getNum = function (card) {
			for (var i of event.lose_list) {
				if (i[1].includes(card)) return get.number(card, i[0]);
			}
			return get.number(card, false);
		};
		event.num1 = getNum(event.card1);
		event.num2 = getNum(event.card2);
		event.trigger("compare");
		game.delay(0, 1500);
		"step 7";
		event.result = {
			player: event.card1,
			target: event.card2,
			num1: event.num1,
			num2: event.num2,
		};
		event.trigger("compareFixing");
		"step 8";
		var str;
		if (event.forceWinner === player || (event.forceWinner !== target && event.num1 > event.num2)) {
			event.result.bool = true;
			event.result.winner = player;
			str = get.translation(player) + "拼点成功";
			player.popup("胜");
			target.popup("负");
		} else {
			event.result.bool = false;
			str = get.translation(player) + "拼点失败";
			if (event.forceWinner !== target && event.num1 == event.num2) {
				event.result.tie = true;
				player.popup("平");
				target.popup("平");
			} else {
				event.result.winner = target;
				player.popup("负");
				target.popup("胜");
			}
		}
		game.broadcastAll(function (str) {
			var dialog = ui.create.dialog(str);
			dialog.classList.add("center");
			setTimeout(function () {
				dialog.close();
			}, 1000);
		}, str);
		game.delay(2);
		"step 9";
		if (typeof event.target.ai.shown == "number" && event.target.ai.shown <= 0.85 && event.addToAI) {
			event.target.ai.shown += 0.1;
		}
		game.broadcastAll(function () {
			ui.arena.classList.remove("thrownhighlight");
		});
		game.addVideo("thrownhighlight2");
		if (event.clear !== false) {
			game.broadcastAll(ui.clear);
		}
		if (typeof event.preserve == "function") {
			event.preserve = event.preserve(event.result);
		} else if (event.preserve == "win") {
			event.preserve = event.result.bool;
		} else if (event.preserve == "lose") {
			event.preserve = !event.result.bool;
		}
	},
	chooseSkill: function () {
		"step 0";
		var list;
		if (typeof event.target == "string") {
			list = get.gainableSkillsName(event.target, event.func);
		} else {
			list = event.target.getGainableSkills(event.func);
		}
		if (!list.length) {
			event.result = { bool: false };
			event.finish();
			return;
		}
		event.skillai = function (list) {
			return get.max(list, get.skillRank, "item");
		};
		if (event.isMine()) {
			var dialog = ui.create.dialog("forcebutton");
			dialog.add(event.prompt || "选择获得一项技能");
			_status.event.list = list;
			var clickItem = function () {
				_status.event._result = this.link;
				game.resume();
			};
			for (i = 0; i < list.length; i++) {
				if (lib.translate[list[i] + "_info"]) {
					var translation = get.translation(list[i]);
					if (translation[0] == "新" && translation.length == 3) {
						translation = translation.slice(1, 3);
					} else {
						translation = translation.slice(0, 2);
					}
					var item = dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + translation + "】</div><div>" + lib.translate[list[i] + "_info"] + "</div></div>");
					item.firstChild.addEventListener("click", clickItem);
					item.firstChild.link = list[i];
				}
			}
			dialog.add(ui.create.div(".placeholder"));
			event.dialog = dialog;
			event.switchToAuto = function () {
				event._result = event.skillai(event.list);
				game.resume();
			};
			_status.imchoosing = true;
			game.pause();
		} else {
			event._result = event.skillai(list);
		}
		"step 1";
		_status.imchoosing = false;
		if (event.dialog) {
			event.dialog.close();
		}
		event.result = { bool: true, skill: result };
	},
	discoverCard: function () {
		"step 0";
		var num = event.num || 3;
		var choice;
		if (typeof event.list == "string" || typeof event.list == "function") {
			choice = get.inpile(event.list).randomGets(num);
		} else if (Array.isArray(event.list)) {
			choice = event.list.randomGets(num);
		} else {
			choice = Array.from(event.list).randomGets(num);
		}
		if (choice.length) {
			var prompt = event.prompt;
			if (!prompt) {
				prompt = "选择一张牌";
				if (event.use) {
					prompt += "使用之";
				} else if (!event.nogain) {
					prompt += "获得之";
				}
			}
			if (typeof choice[0] === "string") {
				var next = player.chooseVCardButton(choice, prompt, event.forced);
				if (event.ai) {
					next.set("ai", event.ai);
				}
			} else if (get.itemtype(choice[0]) == "card") {
				var next = player.chooseCardButton(choice, prompt, event.forced);
				if (event.ai) {
					next.set("ai", event.ai);
				}
			} else {
				event.finish();
			}
		} else {
			event.finish();
		}
		"step 1";
		event.result = {
			bool: result.bool,
			card: null,
			choice: null,
		};
		if (result.bool && result.links.length) {
			var link = result.links[0];
			var togain = null;
			if (get.itemtype(link) == "card") {
				event.result.card = link;
				togain = link;
			} else if (Array.isArray(link)) {
				event.result.choice = link[2];
				togain = game.createCard(link[2]);
			}
			if (togain) {
				if (event.use) {
					player.chooseUseTarget(togain);
				} else if (!event.nogain) {
					player.gain(togain, "draw");
					game.log(player, "获得了一张牌");
				}
			}
		}
	},
	chooseButton: function () {
		"step 0";
		if (typeof event.dialog == "number") {
			event.dialog = get.idDialog(event.dialog);
		}
		if (event.createDialog && !event.dialog) {
			if (Array.isArray(event.createDialog)) {
				event.createDialog.add("hidden");
				event.dialog = ui.create.dialog.apply(this, event.createDialog);
			}
			event.closeDialog = true;
		}
		if (event.dialog == undefined) event.dialog = ui.dialog;
		if (event.isMine() || event.dialogdisplay) {
			event.dialog.style.display = "";
			event.dialog.open();
		}
		// if (['chooseCharacter', 'chooseButtonOL'].includes(event.getParent().name)) event.complexSelect = true;
		var filterButton =
			event.filterButton ||
			function () {
				return true;
			};
		var selectButton = get.select(event.selectButton);
		var buttons = event.dialog.buttons;
		var buttonsx = [];
		var num = 0;
		for (var i = 0; i < buttons.length; i++) {
			var button = buttons[i];
			if (filterButton(button, player)) {
				num++;
				buttonsx.add(button);
			}
		}
		if (event.isMine()) {
			if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
				ui.click.cancel();
				return;
			} else if ((event.direct && num == selectButton[0]) || event.forceDirect) {
				var buttons = buttonsx.slice(0, num);
				event.result = {
					bool: true,
					button: [buttons],
					links: get.links(buttons),
				};
				event.dialog.close();
			} else {
				game.check();
				game.pause();
			}
		} else if (event.isOnline()) {
			if ((event.direct && num == 1) || event.forceDirect) {
				var buttons = buttonsx.slice(0, num);
				event.result = {
					bool: true,
					button: [buttons],
					links: get.links(buttons),
				};
				event.dialog.close();
			} else {
				event.send();
			}
			delete event.callback;
		} else {
			event.result = "ai";
		}
		if (event.onfree) {
			lib.init.onfree();
		}
		"step 1";
		if (event.result == "ai") {
			if (event.processAI) {
				event.result = event.processAI();
			} else {
				game.check();
				if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) ui.click.ok();
				else ui.click.cancel();
			}
		}
		if (event.closeDialog) {
			event.dialog.close();
		}
		if (event.callback) {
			event.callback(event.player, event.result);
		}
		event.resume();
	},
	chooseCardOL: function () {
		"step 0";
		event.targets = event.list.slice(0);
		if (!_status.connectMode) {
			event.result = [];
			event.goto(7);
		} else {
			for (var i = 0; i < event.list.length; i++) {
				var target = event.list[i];
				target.wait();
				if (target.isOnline()) {
					target.send(
						function (args, set) {
							game.me.chooseCard.apply(game.me, args).set(set);
							game.resume();
						},
						event._args,
						event._set
					);
					event.list.splice(i--, 1);
				} else if (target == game.me) {
					event.withme = true;
					event.list.splice(i--, 1);
				}
			}
		}
		"step 1";
		if (event.list.length) {
			event.target = event.list.shift();
			event.target.chooseCard.apply(event.target, event._args).set(event._set);
		} else {
			event.goto(3);
		}
		"step 2";
		event.target.unwait(result);
		event.goto(1);
		"step 3";
		if (event.withme) {
			game.me.chooseCard.apply(game.me, event._args).set(event._set);
		} else {
			event.goto(5);
		}
		"step 4";
		game.me.unwait(result);
		"step 5";
		if (!event.resultOL) {
			game.pause();
		}
		"step 6";
		event.result = [];
		for (var i = 0; i < event.targets.length; i++) {
			event.result[i] = event.resultOL[event.targets[i].playerid] || {};
			if (event.result[i] == "ai" && event.aiCard) {
				event.result[i] = event.aiCard(event.targets[i]);
			}
		}
		event.finish();
		"step 7";
		if (event.list.length) {
			event.target = event.list.shift();
			event.target.chooseCard.apply(event.target, event._args).set(event._set);
		} else {
			for (var i = 0; i < event.targets.length; i++) {
				if (!event.result[i]) {
					event.result[i] = {};
				}
			}
			event.finish();
		}
		"step 8";
		event.result[event.targets.indexOf(event.target)] = result;
		event.goto(7);
	},
	chooseButtonOL: function () {
		"step 0";
		//ui.arena.classList.add('markhidden');
		for (var i = 0; i < event.list.length; i++) {
			var current = event.list[i];
			current[0].wait();
			if (current[0].isOnline()) {
				var target = current.shift();
				target.send(
					function (args, callback, switchToAuto, processAI) {
						//ui.arena.classList.add('markhidden');
						var next = game.me.chooseButton.apply(game.me, args);
						next.callback = callback;
						next.switchToAuto = switchToAuto;
						next.processAI = processAI;
						next.complexSelect = true;
						game.resume();
					},
					current,
					event.callback,
					event.switchToAuto,
					event.processAI
				);
				target._choose_button_ol = current;
				event.list.splice(i--, 1);
			} else if (current[0] == game.me) {
				event.last = current;
				event.last.shift();
				event.list.splice(i--, 1);
			}
		}
		"step 1";
		if (event.list.length) {
			var current = event.list.shift();
			event.target = current.shift();
			var next = event.target.chooseButton.apply(event.target, current);
			next.callback = event.callback;
			next.switchToAuto = event.switchToAuto;
			next.processAI = event.processAI;
		} else {
			event.goto(3);
		}
		"step 2";
		event.target.unwait(result);
		event.goto(1);
		"step 3";
		if (event.last) {
			var next = game.me.chooseButton.apply(game.me, event.last);
			next.callback = event.callback;
			next.switchToAuto = event.switchToAuto;
			next.processAI = event.processAI;
		} else {
			event.goto(5);
		}
		"step 4";
		game.me.unwait(result);
		"step 5";
		if (!event.resultOL) {
			game.pause();
		}
		"step 6";
		/*game.broadcastAll(function(){
			ui.arena.classList.remove('markhidden');
		});*/
		event.result = event.resultOL;
	},
	chooseCard: function () {
		"step 0";
		if (event.directresult) {
			event.result = {
				buttons: [],
				cards: event.directresult.slice(0),
				targets: [],
				confirm: "ok",
				bool: true,
				links: [],
			};
		} else if (event.autochoose()) {
			event.result = {
				bool: true,
				autochoose: true,
				cards: player.getCards(event.position),
				confirm: "ok",
				buttons: [],
				targets: [],
				links: [],
			};
		} else {
			if (event.isMine()) {
				game.check();
				game.pause();
				if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
					ui.click.cancel();
					return;
				}
				if (event.prompt != false) {
					var str;
					if (typeof event.prompt == "string") str = event.prompt;
					else {
						str = "请选择";
						var range = get.select(event.selectCard);
						if (range[0] == range[1]) str += get.cnNumber(range[0]);
						else if (range[1] == Infinity) str += "至少" + get.cnNumber(range[0]);
						else str += get.cnNumber(range[0]) + "至" + get.cnNumber(range[1]);
						str += "张";
						if (event.position == "h" || event.position == undefined) str += "手";
						if (event.position == "e") str += "装备";
						str += "牌";
					}
					event.dialog = ui.create.dialog(str);
					if (event.prompt2) {
						event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
					}
					if (Array.isArray(event.promptx)) {
						for (var i = 0; i < event.promptx.length; i++) {
							event.dialog.add(event.promptx[i]);
						}
					}
					if (Array.isArray(event.selectCard)) {
						event.promptbar = event.dialog.add("0/" + get.numStr(event.selectCard[1], "card"));
						event.custom.add.card = function () {
							_status.event.promptbar.innerHTML = ui.selected.cards.length + "/" + get.numStr(_status.event.selectCard[1], "card");
						};
					}
				}
			} else if (event.isOnline()) {
				event.send();
			} else {
				event.result = "ai";
			}
		}
		"step 1";
		if (event.result == "ai") {
			game.check();
			if ((ai.basic.chooseCard(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
				ui.click.ok();
			} else if (event.skill) {
				var skill = event.skill;
				ui.click.cancel();
				event._aiexclude.add(skill);
				event.redo();
				game.resume();
			} else {
				ui.click.cancel();
			}
		}
		"step 2";
		event.resume();
		if (event.glow_result && event.result.cards && !event.directresult) {
			for (var i = 0; i < event.result.cards.length; i++) {
				event.result.cards[i].classList.add("glow");
			}
		}
		if (event.dialog) event.dialog.close();
	},
	chooseTarget: function () {
		"step 0";
		if (event.isMine()) {
			if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
				ui.click.cancel();
				return;
			}
			game.check();
			game.pause();
			if (event.createDialog && !event.dialog && Array.isArray(event.createDialog)) {
				event.dialog = ui.create.dialog.apply(this, event.createDialog);
			} else if (event.prompt != false) {
				var str;
				if (typeof event.prompt == "string") str = event.prompt;
				else {
					str = "请选择";
					var range = get.select(event.selectTarget);
					if (range[0] == range[1]) str += get.cnNumber(range[0]);
					else if (range[1] == Infinity) str += "至少" + get.cnNumber(range[0]);
					else str += get.cnNumber(range[0]) + "至" + get.cnNumber(range[1]);
					str += "个目标";
				}
				event.dialog = ui.create.dialog(str);
				if (event.prompt2) {
					event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
				}
				if (event.promptbar != "none") {
					event.promptbar = event.dialog.add("0/" + get.numStr(get.select(event.selectTarget)[1], "target"));
					event.custom.add.target = function () {
						_status.event.promptbar.innerHTML = ui.selected.targets.length + "/" + get.numStr(get.select(event.selectTarget)[1], "target");
					};
				}
			} else if (get.itemtype(event.dialog) == "dialog") {
				event.dialog.open();
			}
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		if (event.result == "ai") {
			game.check();
			if ((ai.basic.chooseTarget(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
				ui.click.ok();
			} else {
				ui.click.cancel();
			}
		}
		if (event.result.bool && event.animate !== false) {
			for (var i = 0; i < event.result.targets.length; i++) {
				event.result.targets[i].addTempClass("target");
			}
		}
		if (event.dialog) event.dialog.close();
		event.resume();
		"step 2";
		if (event.onresult) {
			event.onresult(event.result);
		}
		if (event.result.bool && event.autodelay && !event.isMine()) {
			if (typeof event.autodelay == "number") {
				game.delayx(event.autodelay);
			} else {
				game.delayx();
			}
		}
	},
	chooseCardTarget: function () {
		"step 0";
		if (event.isMine()) {
			if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
				ui.click.cancel();
				return;
			}
			game.check();
			game.pause();
			if (event.prompt != false) {
				event.dialog = ui.create.dialog(event.prompt || "请选择卡牌和目标");
				if (event.prompt2) {
					event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
				}
			}
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		if (event.result == "ai") {
			game.check();
			if (ai.basic.chooseCard(event.ai1) || forced) {
				if ((ai.basic.chooseTarget(event.ai2) || forced) && (!event.filterOk || event.filterOk())) {
					ui.click.ok();
					_status.event._aiexclude.length = 0;
				} else {
					ui.click.cancel();
				}
			} else {
				ui.click.cancel();
			}
		}
		"step 2";
		event.resume();
		if (event.result.bool && event.animate !== false) {
			for (var i = 0; i < event.result.targets.length; i++) {
				event.result.targets[i].addTempClass("target");
			}
		}
		if (event.dialog) event.dialog.close();
	},
	chooseControl: function () {
		"step 0";
		if (event.controls.length == 0) {
			if (event.sortcard) {
				var sortnum = 2;
				if (event.sorttop) {
					sortnum = 1;
				}
				for (var i = 0; i < event.sortcard.length + sortnum; i++) {
					event.controls.push(get.cnNumber(i, true));
				}
			} else if (event.choiceList) {
				for (var i = 0; i < event.choiceList.length; i++) {
					event.controls.push("选项" + get.cnNumber(i + 1, true));
				}
			} else {
				event.finish();
				return;
			}
		} else if (event.choiceList && event.controls.length == 1 && event.controls[0] == "cancel2") {
			event.controls.shift();
			for (var i = 0; i < event.choiceList.length; i++) {
				event.controls.push("选项" + get.cnNumber(i + 1, true));
			}
			event.controls.push("cancel2");
		}
		if (event.isMine()) {
			if (event.arrangeSkill) {
				var hidden = player.hiddenSkills.slice(0);
				game.expandSkills(hidden);
				if (hidden.length) {
					for (var i of event.controls) {
						if (_status.prehidden_skills.includes(i) && hidden.includes(i)) {
							event.result = {
								bool: true,
								control: i,
							};
							return;
						}
					}
				}
			} else if (event.hsskill && _status.prehidden_skills.includes(event.hsskill) && event.controls.includes("cancel2")) {
				event.result = {
					bool: true,
					control: "cancel2",
				};
				return;
			}
			if (event.sortcard) {
				var prompt = event.prompt || "选择一个位置";
				if (event.tosort) {
					prompt += "放置" + get.translation(event.tosort);
				}
				event.dialog = ui.create.dialog(prompt, "hidden");
				if (event.sortcard && event.sortcard.length) {
					event.dialog.addSmall(event.sortcard);
				} else {
					event.dialog.buttons = [];
					event.dialog.add(ui.create.div(".buttons"));
				}
				var buttons = event.dialog.content.lastChild;
				var sortnum = 2;
				if (event.sorttop) {
					sortnum = 1;
				}
				for (var i = 0; i < event.dialog.buttons.length + sortnum; i++) {
					var item = ui.create.div(".button.card.pointerdiv.mebg");
					item.style.width = "50px";
					buttons.insertBefore(item, event.dialog.buttons[i]);
					item.innerHTML = '<div style="font-family: xinwei;font-size: 25px;height: 75px;line-height: 25px;top: 8px;left: 10px;width: 30px;">第' + get.cnNumber(i + 1, true) + "张</div>";
					if (i == event.dialog.buttons.length + 1) {
						item.firstChild.innerHTML = "牌堆底";
					}
					item.link = get.cnNumber(i, true);
					item.listen(ui.click.dialogcontrol);
				}

				event.dialog.forcebutton = true;
				event.dialog.classList.add("forcebutton");
				event.dialog.open();
			} else if (event.dialogcontrol) {
				event.dialog = ui.create.dialog(event.prompt || "选择一项", "hidden");
				for (var i = 0; i < event.controls.length; i++) {
					var item = event.dialog.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block">' + event.controls[i] + "</div>");
					item.firstChild.listen(ui.click.dialogcontrol);
					item.firstChild.link = event.controls[i];
				}
				event.dialog.forcebutton = true;
				event.dialog.classList.add("forcebutton");
				if (event.addDialog) {
					for (var i = 0; i < event.addDialog.length; i++) {
						if (get.itemtype(event.addDialog[i]) == "cards") {
							event.dialog.addSmall(event.addDialog[i]);
						} else {
							event.dialog.add(event.addDialog[i]);
						}
					}
					event.dialog.add(ui.create.div(".placeholder.slim"));
				}
				event.dialog.open();
			} else {
				if (event.seperate || lib.config.seperate_control) {
					var controls = event.controls.slice(0);
					var num = 0;
					controls.remove("cancel2");
					if ((event.direct && controls.length == 1) || event.forceDirect) {
						event.result = {
							control: event.controls[0],
							links: get.links([event.controls[0]]),
						};
						return;
					} else {
						event.controlbars = [];
						for (var i = 0; i < event.controls.length; i++) {
							event.controlbars.push(ui.create.control([event.controls[i]]));
						}
					}
				} else {
					var controls = event.controls.slice(0);
					var num = 0;
					controls.remove("cancel2");
					if ((event.direct && controls.length == 1) || event.forceDirect) {
						event.result = {
							control: event.controls[0],
							links: get.links([event.controls[0]]),
						};
						return;
					}
					event.controlbar = ui.create.control(event.controls);
				}
				if (event.dialog) {
					if (Array.isArray(event.dialog)) {
						event.dialog = ui.create.dialog.apply(this, event.dialog);
					}
					event.dialog.open();
				} else if (event.choiceList) {
					event.dialog = ui.create.dialog(event.prompt || "选择一项", "hidden");
					event.dialog.forcebutton = true;
					event.dialog.open();
					for (var i = 0; i < event.choiceList.length; i++) {
						event.dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">' + (event.displayIndex !== false ? "选项" + get.cnNumber(i + 1, true) + "：" : "") + event.choiceList[i] + "</div>");
					}
				} else if (event.prompt) {
					event.dialog = ui.create.dialog(event.prompt);
					if (event.prompt2) {
						event.dialog.addText(event.prompt2, Boolean(event.prompt2.length <= 20 || event.centerprompt2));
					}
				}
			}
			game.pause();
			game.countChoose();
			event.choosing = true;
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		if (event.result == "ai") {
			event.result = {};
			if (event.ai) {
				var result = event.ai(event.getParent(), player);
				if (typeof result == "number") event.result.control = event.controls[result];
				else event.result.control = result;
			} else event.result.control = event.controls[event.choice];
		}
		event.result.index = event.controls.indexOf(event.result.control);
		event.choosing = false;
		_status.imchoosing = false;
		if (event.dialog && event.dialog.close) event.dialog.close();
		if (event.controlbar) event.controlbar.close();
		if (event.controlbars) {
			for (var i = 0; i < event.controlbars.length; i++) {
				event.controlbars[i].close();
			}
		}
		event.resume();
	},
	chooseBool: function () {
		"step 0";
		if (event.isMine()) {
			if (event.frequentSkill && !lib.config.autoskilllist.includes(event.frequentSkill)) {
				ui.click.ok();
				return;
			} else if (event.hsskill && _status.prehidden_skills.includes(event.hsskill)) {
				ui.click.cancel();
				return;
			}
			ui.create.confirm("oc");
			if (event.createDialog && !event.dialog) {
				if (Array.isArray(event.createDialog)) {
					event.dialog = ui.create.dialog.apply(this, event.createDialog);
					if (event.dialogselectx) {
						for (var i = 0; i < event.dialog.buttons.length; i++) {
							event.dialog.buttons[i].classList.add("selectedx");
						}
					}
				}
			}
			if (event.dialog) {
				event.dialog.open();
			} else if (event.prompt) {
				event.dialog = ui.create.dialog(event.prompt);
				if (event.prompt2) {
					event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
				}
			}
			game.pause();
			game.countChoose();
			event.choosing = true;
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		if (event.result == "ai") {
			if (event.ai) {
				event.choice = event.ai(event.getParent(), player);
			}
			event.result = { bool: event.choice };
		}
		_status.imchoosing = false;
		event.choosing = false;
		if (event.dialog) event.dialog.close();
		event.resume();
	},
	chooseDrawRecover: function () {
		"step 0";
		if (player.isHealthy() && event.forced) {
			player.draw(event.num1);
			event.finish();
			return;
		}
		var controls = ["draw_card"];
		if (player.isDamaged()) {
			event.num2 = Math.min(event.num2, player.maxHp - player.hp);
			controls.push("recover_hp");
		}
		if (!event.forced) {
			controls.push("cancel2");
		}
		var prompt = event.prompt;
		if (!prompt) {
			if (player.isHealthy()) {
				prompt = "是否摸" + get.cnNumber(event.num1) + "张牌？";
			} else {
				prompt = "摸" + get.cnNumber(event.num1) + "张牌或回复" + get.cnNumber(event.num2) + "点体力";
			}
		}
		var next = player.chooseControl(controls);
		next.set("prompt", prompt);
		if (event.hsskill) next.setHiddenSkill(event.hsskill);
		if (event.ai) {
			next.set("ai", event.ai);
		} else {
			var choice;
			if (player.isDamaged() && get.recoverEffect(player) > 0 && (player.hp == 1 || player.needsToDiscard() || player.hasSkillTag("maixie_hp") || event.num2 > event.num1 || (event.num2 == event.num1 && player.needsToDiscard(1)))) {
				choice = "recover_hp";
			} else {
				choice = "draw_card";
			}
			next.set("ai", function () {
				return _status.event.choice;
			});
			next.set("choice", choice);
		}
		"step 1";
		if (result.control != "cancel2") {
			if (event.logSkill) {
				if (typeof event.logSkill == "string") {
					player.logSkill(event.logSkill);
				} else if (Array.isArray(event.logSkill)) {
					player.logSkill.apply(player, event.logSkill);
				}
			}
			if (result.control == "draw_card") {
				player.draw(event.num1);
			} else {
				player.recover(event.num2);
			}
		}
		event.result = result;
	},
	choosePlayerCard: function () {
		"step 0";
		if (!event.dialog) event.dialog = ui.create.dialog("hidden");
		else if (!event.isMine()) {
			event.dialog.style.display = "none";
		}
		if (event.prompt) {
			event.dialog.add(event.prompt);
		} else {
			event.dialog.add("选择" + get.translation(target) + "的一张牌");
		}
		if (event.prompt2) {
			event.dialog.addText(event.prompt2);
		}
		let expand_length = 0;
		const cs = target.getCards(event.position);
		const select = get.select(event.selectButton);
		const directFilter = event.forced && typeof event.filterOk != "function" && typeof event.selectButton != "function" && event.filterButton == lib.filter.all;
		let directh = !lib.config.unauto_choose && !event.isOnline() && select[0] == select[1] && (!event.complexSelect || select[1] === 1);

		for (var i = 0; i < event.position.length; i++) {
			if (event.position[i] == "h") {
				var hs = target.getCards("h");
				if (hs.length) {
					expand_length += Math.ceil(hs.length / 6);
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					hs.randomSort();
					if (event.visible || target.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, target, true)) {
						event.dialog.add(hs);
						directh = false;
					} else {
						var shown = hs.filter(card => get.is.shownCard(card));
						if (shown.length) {
							var hidden = hs.filter(card => !shown.includes(card));
							var buttons = ui.create.div(".buttons", event.dialog.content);
							event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
							event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
							if (event.dialog.forcebutton !== false) event.dialog.forcebutton = true;
							if (event.dialog.buttons.length > 3) {
								event.dialog.classList.remove("forcebutton-auto");
							} else if (!event.dialog.noforcebutton) {
								event.dialog.classList.add("forcebutton-auto");
							}
							directh = false;
						} else {
							event.dialog.add([hs, "blank"]);
						}
					}
				}
			} else if (event.position[i] == "e") {
				var es = target.getCards("e");
				if (es.length) {
					expand_length += Math.ceil(es.length / 6);
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					event.dialog.add(es);
					directh = false;
				}
			} else if (event.position[i] == "j") {
				var js = target.getCards("j");
				if (js.length) {
					expand_length += Math.ceil(js.length / 6);
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					var shown = js.filter(card => {
						var name = card.viewAs || card.name,
							info = lib.card[name];
						if (!info || !info.blankCard) return true;
						return false;
					});
					if (shown.length < js.length && !target.isUnderControl(true)) {
						var hidden = js.filter(card => !shown.includes(card));
						var buttons = ui.create.div(".buttons", event.dialog.content);
						event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
						event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
						if (event.dialog.forcebutton !== false) event.dialog.forcebutton = true;
						if (event.dialog.buttons.length > 3) {
							event.dialog.classList.remove("forcebutton-auto");
						} else if (!event.dialog.noforcebutton) {
							event.dialog.classList.add("forcebutton-auto");
						}
					} else {
						event.dialog.add(js);
					}
					directh = false;
				}
			}
		}
		if (event.dialog.buttons.length == 0) {
			event.finish();
			return;
		}
		if (directFilter && select[0] >= cs.length) {
			event.result = {
				bool: true,
				buttons: event.dialog.buttons,
				links: cs,
			};
		} else if (directFilter && directh) {
			event.result = {
				bool: true,
				buttons: event.dialog.buttons.randomGets(select[0]),
				links: [],
			};
			for (var i = 0; i < event.result.buttons.length; i++) {
				event.result.links[i] = event.result.buttons[i].link;
			}
		} else {
			if (event.isMine()) {
				if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
					ui.click.cancel();
					return;
				}
				event.dialog.open();
				game.check();
				game.pause();
				if (expand_length > 2) {
					ui.arena.classList.add("choose-player-card");
					event.dialog.classList.add("fullheight");
				}
			} else if (event.isOnline()) {
				event.send();
			} else {
				event.result = "ai";
			}
		}
		"step 1";
		if (event.result == "ai") {
			game.check();
			if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) ui.click.ok();
			else ui.click.cancel();
		}
		event.dialog.close();
		if (event.result.links) {
			event.result.cards = event.result.links.slice(0);
		}
		event.resume();
		setTimeout(function () {
			ui.arena.classList.remove("choose-player-card");
		}, 500);
	},
	discardPlayerCard: function () {
		"step 0";
		if (event.directresult) {
			event.result = {
				buttons: [],
				cards: event.directresult.slice(0),
				links: event.directresult.slice(0),
				targets: [],
				confirm: "ok",
				bool: true,
			};
			event.cards = event.directresult.slice(0);
			event.goto(2);
			return;
		}
		if (!event.dialog) event.dialog = ui.create.dialog("hidden");
		else if (!event.isMine()) {
			event.dialog.style.display = "none";
		}
		if (event.prompt == undefined) {
			var str = "弃置" + get.translation(target);
			var range = get.select(event.selectButton);
			if (range[0] == range[1]) str += get.cnNumber(range[0]);
			else if (range[1] == Infinity) str += "至少" + get.cnNumber(range[0]);
			else str += get.cnNumber(range[0]) + "至" + get.cnNumber(range[1]);
			str += "张";
			if (event.position == "h" || event.position == undefined) str += "手";
			if (event.position == "e") str += "装备";
			str += "牌";
			event.prompt = str;
		}
		if (event.prompt) {
			event.dialog.add(event.prompt);
		}
		if (event.prompt2) {
			event.dialog.addText(event.prompt2);
		}
		let expand_length = 0;
		const cs = target.getCards(event.position);
		const select = get.select(event.selectButton);
		const directFilter = event.forced && typeof event.filterOk != "function" && typeof event.selectButton != "function" && event.filterButton == lib.filter.all;
		let directh = !lib.config.unauto_choose && !event.isOnline() && select[0] == select[1] && (!event.complexSelect || select[1] === 1);

		for (var i = 0; i < event.position.length; i++) {
			if (event.position[i] == "h") {
				var hs = target.getDiscardableCards(player, "h");
				expand_length += Math.ceil(hs.length / 6);
				if (hs.length) {
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					hs.randomSort();
					if (event.visible || target.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, target, true)) {
						event.dialog.add(hs);
						directh = false;
					} else {
						var shown = hs.filter(card => get.is.shownCard(card));
						if (shown.length) {
							var hidden = hs.filter(card => !shown.includes(card));
							var buttons = ui.create.div(".buttons", event.dialog.content);
							event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
							event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
							if (event.dialog.forcebutton !== false) event.dialog.forcebutton = true;
							if (event.dialog.buttons.length > 3) {
								event.dialog.classList.remove("forcebutton-auto");
							} else if (!event.dialog.noforcebutton) {
								event.dialog.classList.add("forcebutton-auto");
							}
							directh = false;
						} else {
							event.dialog.add([hs, "blank"]);
						}
					}
				}
			} else if (event.position[i] == "e") {
				var es = target.getDiscardableCards(player, "e");
				if (es.length) {
					expand_length += Math.ceil(es.length / 6);
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					event.dialog.add(es);
					directh = false;
				}
			} else if (event.position[i] == "j") {
				var js = target.getDiscardableCards(player, "j");
				if (js.length) {
					expand_length += Math.ceil(js.length / 6);
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					var shown = js.filter(card => {
						var name = card.viewAs || card.name,
							info = lib.card[name];
						if (!info || !info.blankCard) return true;
						return false;
					});
					if (shown.length < js.length && !target.isUnderControl(true)) {
						var hidden = js.filter(card => !shown.includes(card));
						var buttons = ui.create.div(".buttons", event.dialog.content);
						event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
						event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
						if (event.dialog.forcebutton !== false) event.dialog.forcebutton = true;
						if (event.dialog.buttons.length > 3) {
							event.dialog.classList.remove("forcebutton-auto");
						} else if (!event.dialog.noforcebutton) {
							event.dialog.classList.add("forcebutton-auto");
						}
					} else {
						event.dialog.add(js);
					}
					directh = false;
				}
			}
		}
		if (event.dialog.buttons.length == 0) {
			event.finish();
			return;
		}
		if (directFilter && select[0] >= cs.length) {
			event.result = {
				bool: true,
				buttons: event.dialog.buttons,
				links: cs,
			};
		} else if (directFilter && directh) {
			event.result = {
				bool: true,
				buttons: event.dialog.buttons.randomGets(select[0]),
				links: [],
			};
			for (var i = 0; i < event.result.buttons.length; i++) {
				event.result.links[i] = event.result.buttons[i].link;
			}
		} else {
			if (event.isMine()) {
				event.dialog.open();
				game.check();
				game.pause();
				if (expand_length > 2) {
					ui.arena.classList.add("discard-player-card");
					event.dialog.classList.add("fullheight");
				}
			} else if (event.isOnline()) {
				event.send();
			} else {
				event.result = "ai";
			}
		}
		"step 1";
		if (event.result == "ai") {
			game.check();
			if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) ui.click.ok();
			else ui.click.cancel();
		}
		event.dialog.close();
		"step 2";
		event.resume();
		setTimeout(function () {
			ui.arena.classList.remove("discard-player-card");
		}, 500);
		if (event.result.bool && event.result.links && !game.online) {
			if (event.logSkill) {
				if (typeof event.logSkill == "string") {
					player.logSkill(event.logSkill);
				} else if (Array.isArray(event.logSkill)) {
					player.logSkill.apply(player, event.logSkill);
				}
			}
			var cards = [];
			for (var i = 0; i < event.result.links.length; i++) {
				cards.push(event.result.links[i]);
			}
			event.result.cards = event.result.links.slice(0);
			event.cards = cards;
			event.trigger("rewriteDiscardResult");
		}
		"step 3";
		if (event.boolline) {
			player.line(target, "green");
		}
		if (!event.chooseonly) {
			var next = target.discard(event.cards);
			if (player != target) next.notBySelf = true;
			next.discarder = player;
			event.done = next;
			if (event.delay === false) {
				next.set("delay", false);
			}
		}
	},
	gainPlayerCard: function () {
		"step 0";
		if (event.directresult) {
			event.result = {
				buttons: [],
				cards: event.directresult.slice(0),
				links: event.directresult.slice(0),
				targets: [],
				confirm: "ok",
				bool: true,
			};
			event.cards = event.directresult.slice(0);
			event.goto(2);
			return;
		}
		if (!event.dialog) event.dialog = ui.create.dialog("hidden");
		else if (!event.isMine()) {
			event.dialog.style.display = "none";
		}
		if (event.prompt == undefined) {
			var str = "获得" + get.translation(target);
			var range = get.select(event.selectButton);
			if (range[0] == range[1]) str += get.cnNumber(range[0]);
			else if (range[1] == Infinity) str += "至少" + get.cnNumber(range[0]);
			else str += get.cnNumber(range[0]) + "至" + get.cnNumber(range[1]);
			str += "张";
			if (event.position == "h" || event.position == undefined) str += "手";
			if (event.position == "e") str += "装备";
			str += "牌";
			event.prompt = str;
		}
		if (event.prompt) {
			event.dialog.add(event.prompt);
		}
		if (event.prompt2) {
			event.dialog.addText(event.prompt2);
		}
		let expand_length = 0;
		const cs = target.getCards(event.position);
		const select = get.select(event.selectButton);
		const directFilter = event.forced && typeof event.filterOk != "function" && typeof event.selectButton != "function" && event.filterButton == lib.filter.all;
		let directh = !lib.config.unauto_choose && !event.isOnline() && select[0] == select[1] && (!event.complexSelect || select[1] === 1);

		for (var i = 0; i < event.position.length; i++) {
			if (event.position[i] == "h") {
				var hs = target.getGainableCards(player, "h");
				if (hs.length) {
					expand_length += Math.ceil(hs.length / 6);
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					hs.randomSort();
					if (event.visible || target.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, target, true)) {
						event.dialog.add(hs);
						directh = false;
					} else {
						var shown = hs.filter(card => get.is.shownCard(card));
						if (shown.length) {
							var hidden = hs.filter(card => !shown.includes(card));
							var buttons = ui.create.div(".buttons", event.dialog.content);
							event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
							event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
							if (event.dialog.forcebutton !== false) event.dialog.forcebutton = true;
							if (event.dialog.buttons.length > 3) {
								event.dialog.classList.remove("forcebutton-auto");
							} else if (!event.dialog.noforcebutton) {
								event.dialog.classList.add("forcebutton-auto");
							}
							directh = false;
						} else {
							event.dialog.add([hs, "blank"]);
						}
					}
				}
			} else if (event.position[i] == "e") {
				var es = target.getGainableCards(player, "e");
				if (es.length) {
					expand_length += Math.ceil(es.length / 6);
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					event.dialog.add(es);
					directh = false;
				}
			} else if (event.position[i] == "j") {
				var js = target.getGainableCards(player, "j");
				if (js.length) {
					expand_length += Math.ceil(js.length / 6);
					var title = event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
					title.style.margin = "0px";
					title.style.padding = "0px";
					var shown = js.filter(card => {
						var name = card.viewAs || card.name,
							info = lib.card[name];
						if (!info || !info.blankCard) return true;
						return false;
					});
					if (shown.length < js.length && !target.isUnderControl(true)) {
						var hidden = js.filter(card => !shown.includes(card));
						var buttons = ui.create.div(".buttons", event.dialog.content);
						event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
						event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
						if (event.dialog.forcebutton !== false) event.dialog.forcebutton = true;
						if (event.dialog.buttons.length > 3) {
							event.dialog.classList.remove("forcebutton-auto");
						} else if (!event.dialog.noforcebutton) {
							event.dialog.classList.add("forcebutton-auto");
						}
					} else {
						event.dialog.add(js);
					}
					directh = false;
				}
			}
		}
		if (event.dialog.buttons.length == 0) {
			event.dialog.close();
			event.finish();
			return;
		}
		if (directFilter && select[0] >= cs.length) {
			event.result = {
				bool: true,
				buttons: event.dialog.buttons,
				links: cs,
			};
		} else if (directFilter && directh) {
			event.result = {
				bool: true,
				buttons: event.dialog.buttons.randomGets(select[0]),
				links: [],
			};
			for (var i = 0; i < event.result.buttons.length; i++) {
				event.result.links[i] = event.result.buttons[i].link;
			}
		} else {
			if (event.isMine()) {
				event.dialog.open();
				game.check();
				game.pause();
				if (expand_length > 2) {
					ui.arena.classList.add("gain-player-card");
					event.dialog.classList.add("fullheight");
				}
			} else if (event.isOnline()) {
				event.send();
			} else {
				event.result = "ai";
			}
		}
		"step 1";
		if (event.result == "ai") {
			game.check();
			if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) ui.click.ok();
			else ui.click.cancel();
		}
		event.dialog.close();
		"step 2";
		event.resume();
		setTimeout(function () {
			ui.arena.classList.remove("gain-player-card");
		}, 500);
		if (game.online || !event.result.bool) {
			event.finish();
		}
		"step 3";
		if (event.logSkill && event.result.bool && !game.online) {
			if (typeof event.logSkill == "string") {
				player.logSkill(event.logSkill);
			} else if (Array.isArray(event.logSkill)) {
				player.logSkill.apply(player, event.logSkill);
			}
		}
		var cards = [];
		for (var i = 0; i < event.result.links.length; i++) {
			cards.push(event.result.links[i]);
		}
		event.result.cards = event.result.links.slice(0);
		event.cards = cards;
		event.trigger("rewriteGainResult");
		"step 4";
		if (event.boolline) {
			player.line(target, "green");
		}
		if (!event.chooseonly) {
			if (event.delay !== false) {
				var next = player.gain(event.cards, target, event.visibleMove ? "give" : "giveAuto", "bySelf");
				event.done = next;
			} else {
				var next = player.gain(event.cards, target, "bySelf");
				event.done = next;
				target[event.visibleMove ? "$give" : "$giveAuto"](cards, player);
				if (event.visibleMove) next.visible = true;
			}
		} else target[event.visibleMove ? "$give" : "$giveAuto"](cards, player);
	},
	showHandcards: function () {
		"step 0";
		if (player.countCards("h") == 0) {
			event.finish();
			return;
		}
		var cards = player.getCards("h");
		player.showCards(cards).setContent(function () {});
		var str = get.translation(player.name) + "的手牌";
		if (typeof event.prompt == "string") {
			str = event.prompt;
		}
		event.dialog = ui.create.dialog(str, cards);
		event.dialogid = lib.status.videoId++;
		event.dialog.videoId = event.dialogid;
		game.broadcast(
			function (str, cards, id) {
				ui.create.dialog(str, cards).videoId = id;
			},
			str,
			cards,
			event.dialogid
		);
		game.log(player, "展示了", cards);
		game.addVideo("showCards", player, [str, get.cardsInfo(cards)]);
		game.delayx(2);
		"step 1";
		game.broadcast("closeDialog", event.dialogid);
		event.dialog.close();
	},
	showCards: function () {
		"step 0";
		if (get.itemtype(cards) != "cards") {
			event.finish();
			return;
		}
		if (!event.str) {
			event.str = get.translation(player.name) + "展示的牌";
		}
		event.dialog = ui.create.dialog(event.str, cards);
		event.dialogid = lib.status.videoId++;
		event.dialog.videoId = event.dialogid;

		if (event.hiddencards) {
			for (var i = 0; i < event.dialog.buttons.length; i++) {
				if (event.hiddencards.includes(event.dialog.buttons[i].link)) {
					event.dialog.buttons[i].className = "button card";
					event.dialog.buttons[i].innerHTML = "";
				}
			}
		}
		game.broadcast(
			function (str, cards, cards2, id) {
				var dialog = ui.create.dialog(str, cards);
				dialog.forcebutton = true;
				dialog.videoId = id;
				if (cards2) {
					for (var i = 0; i < dialog.buttons.length; i++) {
						if (cards2.includes(dialog.buttons[i].link)) {
							dialog.buttons[i].className = "button card";
							dialog.buttons[i].innerHTML = "";
						}
					}
				}
			},
			event.str,
			cards,
			event.hiddencards,
			event.dialogid
		);
		if (event.hiddencards) {
			var cards2 = cards.slice(0);
			for (var i = 0; i < event.hiddencards.length; i++) {
				cards2.remove(event.hiddencards[i]);
			}
			game.log(player, "展示了", cards2);
		} else {
			game.log(player, "展示了", cards);
		}
		game.addCardKnower(cards, "everyone");
		game.delayx(event.delay_time || 2.5);
		game.addVideo("showCards", player, [event.str, get.cardsInfo(cards)]);
		"step 1";
		game.broadcast("closeDialog", event.dialogid);
		event.dialog.close();
	},
	viewCards: function () {
		"step 0";
		game.addCardKnower(event.cards, player);
		if (player == game.me) {
			event.dialog = ui.create.dialog(event.str, event.cards);
			if (event.isMine()) {
				game.pause();
				ui.create.confirm("o");
				game.countChoose();
				event.choosing = true;
			} else {
				event.result = "viewed";
				setTimeout(function () {
					event.dialog.close();
				}, 2 * lib.config.duration);
				game.delayx(2);
				event.finish();
			}
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.finish();
		}
		"step 1";
		event.result = "viewed";
		_status.imchoosing = false;
		event.choosing = false;
		if (event.dialog) event.dialog.close();
	},
	moveCard: function () {
		"step 0";
		if (!player.canMoveCard(null, event.nojudge, event.sourceTargets, event.aimTargets, event.filter, event.canReplace ? "canReplace" : "noReplace")) {
			event.finish();
			return;
		}
		var next = player.chooseTarget(2, function (card, player, target) {
			var filterCard = get.event("filter");
			if (ui.selected.targets.length) {
				if (!get.event("aimTargets").includes(target)) return false;
				var from = ui.selected.targets[0];
				var js = from.getVCards("j", filterCard);
				for (var i = 0; i < js.length; i++) {
					if (_status.event.nojudge) break;
					if (target.canAddJudge(js[i])) return true;
				}
				if (target.isMin()) return false;
				var es = from.getVCards("e", filterCard);
				for (var i = 0; i < es.length; i++) {
					if (target.canEquip(es[i], _status.event.canReplace)) return true;
				}
				return false;
			} else {
				if (!get.event("sourceTargets").includes(target)) return false;
				var range = "ej";
				if (_status.event.nojudge) range = "e";
				return target.countVCards(range, filterCard) > 0;
			}
		});
		next.set("nojudge", event.nojudge || false);
		next.set("ai", function (target) {
			var player = _status.event.player;
			var att = get.attitude(player, target);
			var sgnatt = get.sgn(att);
			var aimTargets = get.event("aimTargets"),
				filterCard = get.event("filter");
			if (ui.selected.targets.length == 0) {
				if (att > 0) {
					let noEffect = true;
					if (
						!_status.event.nojudge &&
						target.countVCards("j", function (card) {
							if (!filterCard(card)) return false;
							if (get.effect(target, card, target, target) <= -5) noEffect = false;
							return game.hasPlayer(function (current) {
								if (!aimTargets.includes(current)) return false;
								return current != target && current.canAddJudge(card) && get.attitude(player, current) < 0;
							});
						})
					)
						return noEffect ? 8 : 14;
					if (
						target.countVCards("e", function (card) {
							if (!filterCard(card)) return false;
							return (
								get.value(card, target) < 0 &&
								game.hasPlayer(function (current) {
									if (!aimTargets.includes(current)) return false;
									return current != target && get.attitude(player, current) < 0 && current.canEquip(card, _status.event.canReplace) && get.effect(target, card, player, player) < 0;
								})
							);
						}) > 0
					)
						return 9;
				} else if (att < 0) {
					if (
						game.hasPlayer(function (current) {
							if (current != target && get.attitude(player, current) > 0) {
								var es = target.getVCards("e", filterCard);
								for (var i = 0; i < es.length; i++) {
									if (get.value(es[i], target) > 0 && current.canEquip(es[i], _status.event.canReplace) && get.effect(current, es[i], player, player) > (_status.event.canReplace ? get.effect(target, es[i], player, player) : 0)) return true;
								}
							}
						})
					) {
						return -att;
					}
				}
				return 0;
			}
			const current = ui.selected.targets[0],
				pos = get.event("nojudge") ? "e" : "ej",
				cards = current.getVCards(pos, filterCard),
				att2 = get.sgn(get.attitude(player, current));
			let maxEff = 0;
			for(let card of cards) {
				if (att2 <= 0 && get.sgn(get.value(card, current)) < 0) continue;
				let att3 = get.sgn(get.attitude(player, target)),
					val = get.effect(target, card, player, target);
				if (att3 != get.sgn(val)) continue;
				if (att2 > 0 && get.position(card) == "e") val /= 2;
				if (Math.abs(val) > maxEff) maxEff = Math.abs(val);
			}
			return maxEff;
		});
		next.set("multitarget", true);
		next.set("targetprompt", _status.event.targetprompt || ["被移走", "移动目标"]);
		next.set("prompt", event.prompt || "移动场上的一张牌");
		next.set("filter", event.filter);
		next.set("sourceTargets", event.sourceTargets || game.filterPlayer());
		next.set("aimTargets", event.aimTargets || game.filterPlayer());
		next.set("canReplace", event.canReplace);
		next.set("custom", get.copy(event.custom));
		if (event.prompt2) next.set("prompt2", event.prompt2);
		if (event.forced) next.set("forced", true);
		"step 1";
		event.result = result;
		if (result.bool) {
			if (event.logSkill) {
				if (typeof event.logSkill == "string") {
					player.logSkill(event.logSkill, result.targets, false);
				} else if (Array.isArray(event.logSkill)) {
					if (event.logSkill.length >= 3) {
						event.logSkill[1] = result.targets;
						event.logSkill[2] = false;
					} else if (event.logSkill.length) event.logSkill = [event.logSkill[0], result.targets, false];
					player.logSkill.apply(player, event.logSkill);
				}
			}
			player.line2(result.targets, "green");
			event.targets = result.targets;
		} else {
			event.finish();
		}
		"step 2";
		game.delay();
		"step 3";
		if (targets.length == 2) {
			const dialogArgs = ["请选择要移动的牌"];
			const es = targets[0].getVCards("e", card => {
					return event.filter(card) && targets[1].canEquip(card, event.canReplace);
				}),
				js = event.nojudge
					? []
					: targets[0].getVCards("j", card => {
							return event.filter(card) && targets[1].canAddJudge(card);
					  });
			if (es.length) {
				dialogArgs.push(`<div class="text center">装备区</div>`);
				dialogArgs.push([es, "vcard"]);
			}
			if (js.length) {
				dialogArgs.push(`<div class="text center">判定区</div>`);
				dialogArgs.push([js, "vcard"]);
			}
			if (es.length + js.length === 1) {
				event._result = {
					bool: true,
					links: es.length > 0 ? es : js,
				};
			} else
				player
					.chooseButton(dialogArgs, true, function (button) {
						var player = _status.event.player;
						var targets0 = _status.event.targets0;
						var targets1 = _status.event.targets1;
						if (get.attitude(player, targets0) > 0 && get.attitude(player, targets1) < 0) {
							if (get.position(button.link) == "j") return 12;
							if (get.value(button.link, targets0) < 0 && get.effect(targets1, button.link, player, targets1) > 0) return 10;
							return 0;
						} else {
							if (get.position(button.link) == "j") return -10;
							return get.value(button.link) * get.effect(targets1, button.link, player, targets1);
						}
					})
					.set("target", targets[0])
					.set("nojudge", event.nojudge || false)
					.set("targets0", targets[0])
					.set("targets1", targets[1])
					/*.set("filterButton", function (button) {
				var targets1 = _status.event.targets1;
				if (!get.event("filter")(button.link)) return false;
				if (get.position(button.link) == "j") {
					if (_status.event.nojudge) return false;
					return targets1.canAddJudge(button.link);
				} else {
					return targets1.canEquip(button.link, _status.event.canReplace);
				}
			})*/
					.set("filter", event.filter)
					.set("canReplace", event.canReplace)
					.set("custom", get.copy(event.custom));
		} else {
			event.finish();
		}
		"step 4";
		if (result.bool && result.links.length) {
			var link = result.links[0],
				position = "j";
			if (event.targets[0].getVCards("e").includes(link)) {
				if (!link.cards?.length) event.targets[0].removeVirtualEquip(link);
				event.targets[1].equip(link);
			} else {
				if (!link.cards?.length) event.targets[0].removeVirtualJudge(link);
				event.targets[1].addJudge(link, link?.cards);
			}
			if (link.cards?.length) event.targets[0].$give(link.cards, event.targets[1], false);
			game.log(event.targets[0], "的", link, "被移动给了", event.targets[1]);
			event.result.card = link;
			event.result.position = "e";
			game.delay();
		}
	},
	useCard: function () {
		"step 0";
		if (!card) {
			console.log("err: no card", get.translation(event.player));
			event.finish();
			return;
		}
		if (!get.info(card, false).noForceDie) event.forceDie = true;
		if (cards.length) {
			var owner = get.owner(cards[0]) || player;
			var next = owner.lose(cards, "visible", ui.ordering).set("type", "use");
			var directDiscard = [];
			for (var i = 0; i < cards.length; i++) {
				if (!next.cards.includes(cards[i])) {
					directDiscard.push(cards[i]);
				}
			}
			if (directDiscard.length) game.cardsGotoOrdering(directDiscard);
		}
		//player.using=cards;
		var cardaudio = true;
		if (event.skill) {
			if (lib.skill[event.skill].audio) {
				cardaudio = false;
			}
			if (lib.skill[event.skill].log != false) {
				player.logSkill(event.skill, false, null, null, [event, event.player]);
			}
			if (get.info(event.skill).popname) {
				player.tryCardAnimate(card, event.card.name, "metal", true);
			}
		} else if (!event.nopopup) {
			if (lib.translate[event.card.name + "_pop"]) {
				player.tryCardAnimate(card, lib.translate[event.card.name + "_pop"], "metal");
			} else {
				player.tryCardAnimate(card, event.card.name, "metal");
			}
		}
		if (event.audio === false) {
			cardaudio = false;
		}
		if (cardaudio)
			game.broadcastAll(
				(player, card) => {
					game.playCardAudio(card, player);
				},
				player,
				card
			);
		event.id = get.id();
		if (!Array.isArray(event.excluded)) event.excluded = [];
		if (!Array.isArray(event.directHit)) event.directHit = [];
		if (typeof event.customArgs != "object" || typeof event.customArgs.default != "object") event.customArgs = { default: {} };
		if (typeof event.baseDamage != "number") event.baseDamage = get.info(card, false).baseDamage || 1;
		if (typeof event.effectCount != "number") event.effectCount = get.info(card, false).effectCount || 1;
		event.effectedCount = 0;
		if (event.oncard) {
			event.oncard(event.card, event.player);
		}
		player.actionHistory[player.actionHistory.length - 1].useCard.push(event);
		game.getGlobalHistory().useCard.push(event);
		if (event.addCount !== false) {
			if (player.stat[player.stat.length - 1].card[card.name] == undefined) {
				player.stat[player.stat.length - 1].card[card.name] = 1;
			} else {
				player.stat[player.stat.length - 1].card[card.name]++;
			}
		}
		if (event.skill) {
			if (player.stat[player.stat.length - 1].skill[event.skill] == undefined) {
				player.stat[player.stat.length - 1].skill[event.skill] = 1;
			} else {
				player.stat[player.stat.length - 1].skill[event.skill]++;
			}
			var sourceSkill = get.info(event.skill).sourceSkill;
			if (sourceSkill) {
				if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
					player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
				} else {
					player.stat[player.stat.length - 1].skill[sourceSkill]++;
				}
			}
		}

		if (event.animate != false) {
			if (event.throw !== false) {
				player.$throw(cards);
				if (lib.config.sync_speed && cards[0] && cards[0].clone) {
					var waitingForTransition = get.time();
					event.waitingForTransition = waitingForTransition;
					cards[0].clone.listenTransition(function () {
						if (_status.waitingForTransition == waitingForTransition && _status.paused) {
							game.resume();
						}
						delete event.waitingForTransition;
					});
				}
			}
		}
		event.trigger("useCard0");
		"step 1";
		if (event.animate != false && event.line != false && !event.hideTargets) {
			if (card.name == "wuxie" && event.getParent()._info_map) {
				var evtmap = event.getParent()._info_map;
				if (evtmap._source) evtmap = evtmap._source;
				var lining = (evtmap.multitarget ? evtmap.targets : evtmap.target) || event.player;
				if (Array.isArray(lining) && event.getTrigger().name == "jiedao") {
					player.line(lining[0], "green");
				} else {
					player.line(lining, "green");
				}
			} else if (card.name == "youdishenru" && event.getParent().source) {
				var lining = event.getParent().sourcex || event.getParent().source2 || event.getParent().source;
				if (lining == player && event.getParent().sourcex2) {
					lining = event.getParent().sourcex2;
				}
				if (Array.isArray(lining) && event.getTrigger().name == "jiedao") {
					player.line(lining[0], "green");
				} else {
					player.line(lining, "green");
				}
			} else {
				var config = {};
				var nature = get.natureList(card)[0];
				if (nature || (card.classList && card.classList.contains(nature))) config.color = nature;
				if (event.addedTarget) {
					player.line2(targets.concat(event.addedTargets), config);
				} else if (get.info(card, false).multitarget && targets.length > 1 && !get.info(card, false).multiline) {
					player.line2(targets, config);
				} else {
					player.line(targets, config);
				}
			}
		}
		if (targets.length && !event.hideTargets) {
			var str = targets.length == 1 && targets[0] == player ? "#b自己" : targets;
			if (cards.length && !card.isCard) {
				if (event.addedTarget) {
					game.log(player, "对", str, "使用了", card, "（", cards, "，指向", event.addedTargets, "）");
				} else {
					game.log(player, "对", str, "使用了", card, "（", cards, "）");
				}
			} else {
				if (event.addedTarget) {
					game.log(player, "对", str, "使用了", card, "（指向", event.addedTargets, "）");
				} else {
					game.log(player, "对", str, "使用了", card);
				}
			}
		} else {
			if (cards.length && !card.isCard) {
				if (event.addedTarget) {
					game.log(player, "使用了", card, "（", cards, "，指向", event.addedTargets, "）");
				} else {
					game.log(player, "使用了", card, "（", cards, "）");
				}
			} else {
				if (event.addedTarget) {
					game.log(player, "使用了", card, "（指向", event.addedTargets, "）");
				} else {
					game.log(player, "使用了", card);
				}
			}
		}
		if (card.name == "wuxie") {
			game.logv(player, [card, cards], [event.getTrigger().card]);
		} else {
			game.logv(player, [card, cards], targets);
		}
		event.trigger("useCard1");
		"step 2";
		event.trigger("yingbian");
		"step 3";
		event.trigger("useCard2");
		"step 4";
		event.trigger("useCard");
		event._oncancel = function () {
			game.broadcastAll(function (id) {
				if (ui.tempnowuxie && ui.tempnowuxie._origin == id) {
					ui.tempnowuxie.close();
					delete ui.tempnowuxie;
				}
			}, event.id);
		};
		"step 5";
		event.sortTarget = function (animate, sort) {
			var info = get.info(card, false);
			if (num == 0 && targets.length > 1) {
				if (!info.multitarget) {
					if (!event.fixedSeat && !sort) {
						targets.sortBySeat(_status.currentPhase || player);
					}
					if (animate)
						for (var i = 0; i < targets.length; i++) {
							targets[i].addTempClass("target");
						}
				} else if (animate) {
					for (var i = 0; i < targets.length; i++) {
						targets[i].addTempClass("target");
					}
				}
			}
		};
		event.sortTarget();
		event.getTriggerTarget = function (list1, list2) {
			var listx = list1.slice(0).sortBySeat(_status.currentPhase || player);
			for (var i = 0; i < listx.length; i++) {
				if (get.numOf(list2, listx[i]) < get.numOf(listx, listx[i])) return listx[i];
			}
			return null;
		};
		"step 6";
		if (event.all_excluded) return;
		if (!event.triggeredTargets1) event.triggeredTargets1 = [];
		var target = event.getTriggerTarget(targets, event.triggeredTargets1);
		if (target) {
			event.triggeredTargets1.push(target);
			var next = game.createEvent("useCardToPlayer", false);
			if (!event.isFirstTarget1) {
				event.isFirstTarget1 = true;
				next.isFirstTarget = true;
			}
			next.setContent("emptyEvent");
			next.targets = targets;
			next.target = target;
			next.card = card;
			next.cards = cards;
			next.player = player;
			next.skill = event.skill;
			next.excluded = event.excluded;
			next.directHit = event.directHit;
			next.customArgs = event.customArgs;
			if (event.forceDie) next.forceDie = true;
			event.redo();
		}
		"step 7";
		if (event.all_excluded) return;
		if (!event.triggeredTargets2) event.triggeredTargets2 = [];
		var target = event.getTriggerTarget(targets, event.triggeredTargets2);
		if (target) {
			event.triggeredTargets2.push(target);
			var next = game.createEvent("useCardToTarget", false);
			if (!event.isFirstTarget2) {
				event.isFirstTarget2 = true;
				next.isFirstTarget = true;
			}
			next.setContent("emptyEvent");
			next.targets = targets;
			next.target = target;
			next.card = card;
			next.cards = cards;
			next.player = player;
			next.skill = event.skill;
			next.excluded = event.excluded;
			next.directHit = event.directHit;
			next.customArgs = event.customArgs;
			if (event.forceDie) next.forceDie = true;
			event.redo();
		}
		"step 8";
		var info = get.info(card, false);
		if (!info.nodelay && event.animate != false) {
			if (event.delayx !== false) {
				if (event.waitingForTransition) {
					_status.waitingForTransition = event.waitingForTransition;
					game.pause();
				} else {
					game.delayx();
				}
			}
		}
		"step 9";
		if (event.all_excluded) return;
		if (!event.triggeredTargets3) event.triggeredTargets3 = [];
		var target = event.getTriggerTarget(targets, event.triggeredTargets3);
		if (target) {
			event.triggeredTargets3.push(target);
			var next = game.createEvent("useCardToPlayered", false);
			if (!event.isFirstTarget3) {
				event.isFirstTarget3 = true;
				next.isFirstTarget = true;
			}
			next.setContent("emptyEvent");
			next.targets = targets;
			next.target = target;
			next.card = card;
			next.cards = cards;
			next.player = player;
			next.skill = event.skill;
			next.excluded = event.excluded;
			next.directHit = event.directHit;
			next.customArgs = event.customArgs;
			if (event.forceDie) next.forceDie = true;
			event.redo();
		}
		"step 10";
		if (event.all_excluded) return;
		if (!event.triggeredTargets4) event.triggeredTargets4 = [];
		var target = event.getTriggerTarget(targets, event.triggeredTargets4);
		if (target) {
			event.triggeredTargets4.push(target);
			var next = game.createEvent("useCardToTargeted", false);
			if (!event.isFirstTarget4) {
				event.isFirstTarget4 = true;
				next.isFirstTarget = true;
			}
			next.setContent("emptyEvent");
			next.targets = targets;
			next.target = target;
			next.card = card;
			next.cards = cards;
			next.player = player;
			next.skill = event.skill;
			next.excluded = event.excluded;
			next.directHit = event.directHit;
			next.customArgs = event.customArgs;
			if (event.forceDie) next.forceDie = true;
			if (targets.length == event.triggeredTargets4.length) {
				event.sortTarget();
			}
			event.redo();
		}
		"step 11";
		if (event.all_excluded) return;
		event.effectedCount++;
		event.num = 0;
		var info = get.info(card, false);
		if (info.contentBefore) {
			var next = game.createEvent(card.name + "ContentBefore");
			next.setContent(info.contentBefore);
			next.targets = targets;
			next.card = card;
			next.cards = cards;
			next.player = player;
			next.skill = event.skill;
			next.type = "precard";
			if (event.forceDie) next.forceDie = true;
		} else if (info.reverseOrder && get.is.versus() && targets.length > 1) {
			var next = game.createEvent(card.name + "ContentBefore");
			next.setContent("reverseOrder");
			next.targets = targets;
			next.card = card;
			next.cards = cards;
			next.player = player;
			next.skill = event.skill;
			next.type = "precard";
			if (event.forceDie) next.forceDie = true;
		} else if (info.singleCard && info.filterAddedTarget && event.addedTargets && event.addedTargets.length < targets.length) {
			var next = game.createEvent(card.name + "ContentBefore");
			next.setContent("addExtraTarget");
			next.target = target;
			next.targets = targets;
			next.card = card;
			next.cards = cards;
			next.player = player;
			next.skill = event.skill;
			next.type = "precard";
			next.addedTarget = event.addedTarget;
			next.addedTargets = event.addedTargets;
			if (event.forceDie) next.forceDie = true;
		}
		"step 12";
		if (event.all_excluded) return;
		var info = get.info(card, false);
		if (num == 0 && targets.length > 1) {
			event.sortTarget(true, true);
		}
		if (targets[num] && targets[num].isDead()) return;
		if (targets[num] && targets[num].isOut()) return;
		if (targets[num] && targets[num].removed) return;
		if (targets[num] && info.ignoreTarget && info.ignoreTarget(card, player, targets[num])) {
			var next = game.createEvent("useCardToIgnored", false);
			next.setContent("emptyEvent");
			next.targets = targets;
			next.target = targets[num];
			next.num = num;
			next.card = card;
			next.cards = cards;
			next.player = player;
			return;
			return;
		}
		if (targets.length == 0 && !info.notarget) return;
		if (targets[num] && event.excluded.includes(targets[num])) {
			var next = game.createEvent("useCardToExcluded", false);
			next.setContent("emptyEvent");
			next.targets = targets;
			next.target = targets[num];
			next.num = num;
			next.card = card;
			next.cards = cards;
			next.player = player;
			return;
		}
		var next = game.createEvent(card.name);
		next.setContent(info.content);
		next.targets = targets;
		next.card = card;
		next.cards = cards;
		next.player = player;
		next.num = num;
		next.type = "card";
		next.skill = event.skill;
		next.multitarget = info.multitarget;
		next.preResult = event.preResult;
		next.baseDamage = event.baseDamage;
		if (event.forceDie) next.forceDie = true;
		if (event.addedTargets) {
			next.addedTargets = event.addedTargets;
			next.addedTarget = event.addedTargets[num];
			next._targets = event._targets;
		}
		if (info.targetDelay === false) {
			event.targetDelay = false;
		}
		next.target = targets[num];
		for (var i in event.customArgs.default) next[i] = event.customArgs.default[i];
		if (next.target && event.customArgs[next.target.playerid]) {
			var customArgs = event.customArgs[next.target.playerid];
			for (var i in customArgs) next[i] = customArgs[i];
		}
		if (next.target && event.directHit.includes(next.target)) next.directHit = true;
		if (next.target && !info.multitarget) {
			if (num == 0 && targets.length > 1) {
				// var ttt=next.target;
				// setTimeout(function(){ttt.addTempClass('target');},0.5*lib.config.duration);
			} else {
				next.target.addTempClass("target");
			}
		}
		if (!info.nodelay && num > 0) {
			if (event.targetDelay !== false) {
				game.delayx(0.5);
			}
		}
		"step 13";
		if (event.all_excluded) return;
		if (!get.info(event.card, false).multitarget && num < targets.length - 1 && !event.cancelled) {
			event.num++;
			event.goto(12);
		}
		"step 14";
		if (event.all_excluded) return;
		if (get.info(card, false).contentAfter) {
			var next = game.createEvent(card.name + "ContentAfter");
			next.setContent(get.info(card, false).contentAfter);
			next.targets = targets;
			next.card = card;
			next.cards = cards;
			next.player = player;
			next.skill = event.skill;
			next.preResult = event.preResult;
			next.type = "postcard";
			if (event.forceDie) next.forceDie = true;
		}
		"step 15";
		if (event.all_excluded) return;
		if (event.effectedCount < event.effectCount) {
			if (document.getElementsByClassName("thrown").length) {
				if (event.delayx !== false && get.info(event.card, false).finalDelay !== false) game.delayx();
			}
			event.goto(11);
		}
		"step 16";
		if (event.postAi) {
			event.player.logAi(event.targets, event.card);
		}
		if (event._result) {
			event.result = event._result;
		}
		//delete player.using;
		if (document.getElementsByClassName("thrown").length) {
			if (event.delayx !== false && get.info(event.card, false).finalDelay !== false) game.delayx();
		} else {
			event.finish();
		}
		"step 17";
		event._oncancel();
	},
	useSkill: function () {
		"step 0";
		var info = get.info(event.skill);
		if (!info.noForceDie) event.forceDie = true;
		if (!info.noForceOut) event.includeOut = true;
		event._skill = event.skill;
		game.trySkillAudio(event.skill, player, null, null, null, [event, event.player]);
		var checkShow = player.checkShow(event.skill);
		if (info.discard != false && info.lose != false && !info.viewAs) {
			player.discard(cards).delay = false;
			if (lib.config.low_performance) {
				event.discardTransition = true;
			}
		} else {
			if (info.lose != false) {
				if (info.losetrigger == false) {
					var losecard = (player.lose(cards, ui.special)._triggered = null);
				} else {
					var losecard = player.lose(cards, ui.special);
					if (info.visible) losecard.visible = true;
					if (info.loseTo) losecard.position = ui[info.loseTo];
					if (info.insert) losecard.insert_card = true;
					if (losecard.position == ui.special && info.toStorage) losecard.toStorage = true;
				}
			}
			if (!info.prepare && info.viewAs) {
				player.$throw(cards);
				if (losecard) losecard.visible = true;
				if (lib.config.sync_speed && cards[0] && cards[0].clone) {
					var waitingForTransition = get.time();
					event.waitingForTransition = waitingForTransition;
					cards[0].clone.listenTransition(function () {
						if (_status.waitingForTransition == waitingForTransition && _status.paused) {
							game.resume();
						}
						delete event.waitingForTransition;
					});
				}
			}
		}
		if (info.line != false && targets.length) {
			var config = {};
			if (get.is.object(info.line)) config = info.line;
			else if (info.line == "fire") {
				config.color = "fire";
			} else if (info.line == "thunder") {
				config.color = "thunder";
			} else if (info.line === undefined || info.line == "green") {
				config.color = "green";
			}
			if (info.multitarget && !info.multiline && targets.length > 1) {
				player.line2(targets, config);
			} else {
				player.line(targets, config);
			}
		}
		var str = "";
		if (targets && targets.length && info.log != "notarget") {
			str += '对<span class="bluetext">' + (targets[0] == player ? "自己" : get.translation(targets[0]));
			for (var i = 1; i < targets.length; i++) {
				str += "、" + (targets[i] == player ? "自己" : get.translation(targets[i]));
			}
			str += "</span>";
		}
		str += "发动了";
		if (!info.direct && info.log !== false) {
			game.log(player, str, "【" + get.skillTranslation(skill, player) + "】");
			if (info.logv !== false) game.logv(player, skill, targets);
			player.trySkillAnimate(skill, skill, checkShow);
		}
		if (event.addCount != false) {
			if (player.stat[player.stat.length - 1].skill[skill] == undefined) {
				player.stat[player.stat.length - 1].skill[skill] = 1;
			} else {
				player.stat[player.stat.length - 1].skill[skill]++;
			}
			var sourceSkill = get.info(skill).sourceSkill;
			if (sourceSkill) {
				if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
					player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
				} else {
					player.stat[player.stat.length - 1].skill[sourceSkill]++;
				}
			}
		}
		if (player.stat[player.stat.length - 1].allSkills == undefined) {
			player.stat[player.stat.length - 1].allSkills = 1;
		} else {
			player.stat[player.stat.length - 1].allSkills++;
		}
		if (info.prepare) {
			switch (info.prepare) {
				case "give":
					if (losecard) losecard.visible = true;
					player.$give(cards, targets[0]);
					break;
				case "give2":
					player.$give(cards.length, targets[0]);
					break;
				case "throw":
					if (losecard) losecard.visible = true;
					player.$throw(cards);
					break;
				case "throw2":
					player.$throw(cards.length);
					break;
				default:
					info.prepare(cards, player, targets);
			}
		}
		if (info.round) {
			var roundname = skill + "_roundcount";
			player.storage[roundname] = game.roundNumber;
			player.syncStorage(roundname);
			player.markSkill(roundname);
		}
		var name = event.skill;
		var players = player.getSkills(false, false, false);
		var equips = player.getSkills("e");
		var global = lib.skill.global.slice(0);
		var logInfo = {
			skill: name,
			targets: targets,
			event: _status.event,
		};
		if (info.sourceSkill) {
			logInfo.sourceSkill = info.sourceSkill;
			if (global.includes(info.sourceSkill)) {
				logInfo.type = "global";
			} else if (players.includes(info.sourceSkill)) {
				logInfo.type = "player";
			} else if (equips.includes(info.sourceSkill)) {
				logInfo.type = "equip";
			}
		} else {
			if (global.includes(name)) {
				logInfo.sourceSkill = name;
				logInfo.type = "global";
			} else if (players.includes(name)) {
				logInfo.sourceSkill = name;
				logInfo.type = "player";
			} else if (equips.includes(name)) {
				logInfo.sourceSkill = name;
				logInfo.type = "equip";
			} else {
				var bool = false;
				for (var i of players) {
					var expand = [i];
					game.expandSkills(expand);
					if (expand.includes(name)) {
						bool = true;
						logInfo.sourceSkill = i;
						logInfo.type = "player";
						break;
					}
				}
				if (!bool) {
					for (var i of players) {
						var expand = [i];
						game.expandSkills(expand);
						if (expand.includes(name)) {
							logInfo.sourceSkill = i;
							logInfo.type = "equip";
							break;
						}
					}
				}
			}
		}
		event.sourceSkill = logInfo.sourceSkill;
		event.type = logInfo.type;
		player.getHistory("useSkill").push(logInfo);
		event.trigger("useSkill");
		"step 1";
		var info = get.info(event.skill);
		if (info && info.contentBefore) {
			var next = game.createEvent(event.skill + "ContentBefore");
			next.setContent(info.contentBefore);
			next.targets = targets;
			next.cards = cards;
			next.player = player;
			if (event.forceDie) next.forceDie = true;
			if (event.includeOut) next.includeOut = true;
		}
		"step 2";
		if (!event.skill) {
			console.log("error: no skill", get.translation(event.player), event.player.getSkills());
			if (event._skill) {
				event.skill = event._skill;
				console.log(event._skill);
			} else {
				event.finish();
				return;
			}
		}
		var info = get.info(event.skill);
		if ((targets[num] && targets[num].isDead() && !info?.deadTarget) || (targets[num] && targets[num].isOut() && !info?.includeOut) || (targets[num] && targets[num].removed)) {
			if (!info.multitarget && num < targets.length - 1) {
				event.num++;
				event.redo();
			}
			return;
		}
		var next = game.createEvent(event.skill);
		next.setContent(info.content);
		next.targets = targets;
		next.cards = cards;
		next.player = player;
		next.num = num;
		next.multitarget = info.multitarget;
		if (num == 0 && next.targets.length > 1) {
			if (!info.multitarget) {
				lib.tempSortSeat = player;
				targets.sort(lib.sort.seat);
				delete lib.tempSortSeat;
			}
			for (var i = 0; i < targets.length; i++) {
				targets[i].addTempClass("target");
			}
		}
		next.target = targets[num];
		if (event.forceDie) next.forceDie = true;
		if (event.includeOut) next.includeOut = true;
		if (next.target && !info.multitarget) {
			if (num == 0 && targets.length > 1) {
				// var ttt=next.target;
				// setTimeout(function(){ttt.addTempClass('target');},0.5*lib.config.duration);
			} else {
				next.target.addTempClass("target");
			}
		}
		if (num == 0) {
			if (typeof info.delay == "number") game.delay(info.delay);
			else if (info.delay !== false && info.delay !== 0) {
				if (event.waitingForTransition) {
					_status.waitingForTransition = event.waitingForTransition;
					game.pause();
				} else {
					game.delayx();
				}
			}
		} else game.delayx(0.5);
		if (!info.multitarget && num < targets.length - 1) {
			event.num++;
			event.redo();
		}
		"step 3";
		var info = get.info(event.skill);
		if (info && info.contentAfter) {
			var next = game.createEvent(event.skill + "ContentAfter");
			next.setContent(info.contentAfter);
			next.targets = targets;
			next.cards = cards;
			next.player = player;
			if (event.forceDie) next.forceDie = true;
			if (event.includeOut) next.includeOut = true;
		}
		"step 4";
		if (player.getStat().allSkills > 200) {
			player._noSkill = true;
			console.log(player.name, event.skill);
		}
		if (document.getElementsByClassName("thrown").length) {
			if (event.skill && get.info(event.skill).delay !== false && get.info(event.skill).delay !== 0) game.delayx();
		} else {
			event.finish();
		}
		"step 5";
		ui.clear();
	},
	draw: function () {
		// if(lib.config.background_audio){
		// 	game.playAudio('effect','draw');
		// }
		// game.broadcast(function(){
		//     if(lib.config.background_audio){
		// 		game.playAudio('effect','draw');
		// 	}
		// });
		if (typeof event.minnum == "number" && num < event.minnum) {
			num = event.minnum;
		}
		if (event.drawDeck) {
			if (event.drawDeck > num) {
				event.drawDeck = num;
			}
			num -= event.drawDeck;
		}
		if (event.log != false) {
			if (num > 0) {
				if (event.bottom) game.log(player, "从牌堆底摸了" + get.cnNumber(num) + "张牌");
				else game.log(player, "摸了" + get.cnNumber(num) + "张牌");
			}
			if (event.drawDeck) {
				game.log(player, "从牌库中获得了" + get.cnNumber(event.drawDeck) + "张牌");
			}
		}
		let cards;
		if (num > 0) {
			if (event.bottom) cards = get.bottomCards(num);
			else if (player.getTopCards) cards = player.getTopCards(num);
			else cards = get.cards(num);
		} else {
			cards = [];
		}
		if (event.drawDeck) {
			cards = cards.concat(player.getDeckCards(event.drawDeck));
		}
		let next;
		if (event.animate != false) {
			if (event.visible) {
				next = player.gain(cards, "gain2");
				if (event.bottom) game.log(player, "从牌堆底摸了" + get.cnNumber(num) + "张牌（", cards, "）");
				else game.log(player, "摸了" + get.cnNumber(num) + "张牌（", cards, "）");
			} else {
				next = player.gain(cards, "draw");
			}
		} else {
			next = player.gain(cards);
			if (event.$draw) {
				player.$draw(cards.length);
			}
		}
		if (event.gaintag) next.gaintag.addArray(event.gaintag);
		event.result = cards;
	},
	discard: function () {
		"step 0";
		game.log(player, "弃置了", cards);
		event.done = player.lose(cards, event.position, "visible");
		event.done.type = "discard";
		if (event.discarder) event.done.discarder = event.discarder;
		"step 1";
		event.trigger("discard");
	},
	loseToDiscardpile: function () {
		"step 0";
		if (event.log != false) game.log(player, "将", cards, "置入了弃牌堆");
		var next = player.lose(cards, event.position);
		if (event.insert_index) next.insert_index = event.insert_index;
		if (event.insert_card) next.insert_card = true;
		if (!event.blank) next.visible = true;
		next.type = "loseToDiscardpile";
		event.done = next;
		"step 1";
		event.trigger("loseToDiscardpile");
	},
	respond: function () {
		"step 0";
		var cardaudio = true;
		if (event.skill) {
			if (lib.skill[event.skill].audio) {
				cardaudio = false;
			}
			player.logSkill(event.skill);
			player.checkShow(event.skill, true);
			if (lib.skill[event.skill].onrespond && !game.online) {
				lib.skill[event.skill].onrespond(event, player);
			}
		} else if (!event.nopopup) player.tryCardAnimate(card, card.name, "wood");
		if (cardaudio && event.getParent(3).name == "useCard")
			game.broadcastAll(
				(player, card) => {
					game.playCardAudio(card, player);
					/*
			if(!lib.config.background_audio) return;
			const sex=player.sex=='female'?'female':'male',audio=lib.card[card.name].audio;
			if(typeof audio=='string'){
				const audioInfo=audio.split(':');
				if(audio.startsWith('db:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,audioInfo[2],`${card.name}_${sex}.${audioInfo[3]||'mp3'}`);
				else if(audio.startsWith('ext:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,`${card.name}_${sex}.${audioInfo[2]||'mp3'}`);
				else game.playAudio('card',sex,`${audioInfo[0]}.${audioInfo[1]||'mp3'}`);
			}
			else game.playAudio('card',sex,card.name);*/
				},
				player,
				card
			);
		if (event.skill) {
			if (player.stat[player.stat.length - 1].skill[event.skill] == undefined) {
				player.stat[player.stat.length - 1].skill[event.skill] = 1;
			} else {
				player.stat[player.stat.length - 1].skill[event.skill]++;
			}
			var sourceSkill = get.info(event.skill).sourceSkill;
			if (sourceSkill) {
				if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
					player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
				} else {
					player.stat[player.stat.length - 1].skill[sourceSkill]++;
				}
			}
		}
		if (cards.length && (cards.length > 1 || cards[0].name != card.name)) {
			game.log(player, "打出了", card, "（", cards, "）");
		} else {
			game.log(player, "打出了", card);
		}
		player.actionHistory[player.actionHistory.length - 1].respond.push(event);
		if (cards.length) {
			var owner = get.owner(cards[0]) || player;
			var next = owner.lose(cards, "visible", ui.ordering).set("type", "use");
			var directDiscard = [];
			for (var i = 0; i < cards.length; i++) {
				if (!next.cards.includes(cards[i])) {
					directDiscard.push(cards[i]);
				}
			}
			if (directDiscard.length) game.cardsGotoOrdering(directDiscard);
		}
		if (event.animate != false && event.throw !== false) {
			for (var i = 0; i < cards.length; i++) {
				player.$throw(cards[i]);
				if (event.highlight) {
					cards[i].clone.classList.add("thrownhighlight");
					game.addVideo("highlightnode", player, get.cardInfo(cards[i]));
				}
			}
			if (event.highlight) {
				game.broadcast(function (cards) {
					for (var i = 0; i < cards.length; i++) {
						if (cards[i].clone) {
							cards[i].clone.classList.add("thrownhighlight");
						}
					}
				}, cards);
			}
		}
		event.trigger("respond");
		"step 1";
		game.delayx(0.5);
	},
	swapHandcards: function () {
		"step 0";
		event.cards1 = event.cards1 || player.getCards("h");
		event.cards2 = event.cards2 || target.getCards("h");
		game.loseAsync({
			player: player,
			target: target,
			cards1: event.cards1,
			cards2: event.cards2,
		}).setContent("swapHandcardsx");
		"step 1";
		game.loseAsync({
			gain_list: [
				[player, event.cards2.filterInD()],
				[target, event.cards1.filterInD()],
			],
		}).setContent("gaincardMultiple");
		"step 2";
		game.delayx();
	},
	swapHandcardsx: function () {
		"step 0";
		player.$giveAuto(event.cards1, target);
		target.$giveAuto(event.cards2, player);
		"step 1";
		event.cards = event.cards1;
		var next = player.lose(event.cards, ui.ordering);
		next.getlx = false;
		next.relatedEvent = event.getParent();
		if (player == game.me) {
			event.delayed = true;
		} else {
			next.delay = false;
		}
		"step 2";
		event.cards = event.cards2;
		var next = target.lose(event.cards, ui.ordering);
		next.getlx = false;
		next.relatedEvent = event.getParent();
		if (target == game.me) {
			event.delayed = true;
		} else {
			next.delay = false;
		}
		"step 3";
		event.vcards1?.forEach(card => {
			if(card.cards?.every(cardx => get.position(cardx) != "e")) player.removeVirtualEquip(card);
			else event.getParent().vcards[0].remove(card);
		});
		event.vcards2?.forEach(card => {
			if(card.cards?.every(cardx => get.position(cardx) != "e")) target.removeVirtualEquip(card);
			else event.getParent().vcards[1].remove(card);
		});
		if (!event.delayed) game.delay();
	},
	gainMultiple: function () {
		"step 0";
		event.delayed = false;
		event.num = 0;
		event.cards = [];
		"step 1";
		player
			.gainPlayerCard(targets[num], event.position, true)
			.set("boolline", false)
			.set("delay", num == targets.length - 1);
		"step 2";
		if (result.bool) {
			event.cards.addArray(result.cards);
			if (num == targets.length - 1) event.delayed = true;
		}
		event.num++;
		if (event.num < targets.length) {
			event.goto(1);
		}
		"step 3";
		if (!event.delayed) game.delay();
	},
	gain: function () {
		"step 0";
		if (event.animate == "give" || event.animate == "gain2" || event.animate == "draw2") event.visible = true;
		if (cards) {
			var map = {};
			for (var i of cards) {
				var owner = get.owner(i, "judge");
				if (owner && (owner != player || get.position(i) != "h")) {
					var id = owner.playerid;
					if (!map[id]) map[id] = [[], [], []];
					map[id][0].push(i);
					var position = get.position(i);
					if (position == "h") map[id][1].push(i);
					else map[id][2].push(i);
				} else if (!event.updatePile && get.position(i) == "c") event.updatePile = true;
				if (event.visible) i.addKnower("everyone");
			}
			event.losing_map = map;
			for (var i in map) {
				var owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
				var next = owner.lose(map[i][0], ui.special).set("type", "gain").set("forceDie", true).set("getlx", false);
				if (event.visible == true) {
					next.visible = true;
				}
				event.relatedLose = next;
			}
		} else {
			event.finish();
		}
		"step 1";
		event.cards = cards = cards.map(i => (i.cards ? i.cards : [i])).flat();
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].willBeDestroyed("handcard", player, event)) {
				cards[i].selfDestroy(event);
				cards.splice(i--, 1);
			} else if (event.losing_map) {
				for (var id in event.losing_map) {
					if (event.losing_map[id][0].includes(cards[i])) {
						var source = (_status.connectMode ? lib.playerOL : game.playerMap)[id];
						var hs = source.getCards("hejsx");
						if (hs.includes(cards[i])) {
							cards.splice(i--, 1);
						} else {
							cards[i].addKnower(source);
						}
					}
				}
			}
		}
		if (cards.length == 0) {
			event.finish();
			return;
		}
		player.getHistory("gain").push(event);
		//if(event.source&&event.delay!==false) game.delayx();
		"step 2";
		if (player.getStat().gain == undefined) {
			player.getStat().gain = cards.length;
		} else {
			player.getStat().gain += cards.length;
		}
		"step 3";
		var sort;
		var frag1 = document.createDocumentFragment();
		var frag2 = document.createDocumentFragment();
		var hs = player.getCards("hs");
		for (var i = 0; i < cards.length; i++) {
			if (hs.includes(cards[i])) {
				cards.splice(i--, 1);
			}
		}
		for (var num = 0; num < cards.length; num++) {
			sort = lib.config.sort_card(cards[num]);
			if (lib.config.reverse_sort) sort = -sort;
			if (["o", "d"].includes(get.position(cards[num], true))) {
				cards[num].addKnower("everyone");
			}
			cards[num].fix();
			cards[num].style.transform = "";
			cards[num].addGaintag(event.gaintag);
			if (event.knowers) {
				cards[num].addKnower(event.knowers); //添加事件设定的知情者。
			}
			if (_status.discarded) {
				_status.discarded.remove(cards[num]);
			}
			// cards[num].vanishtag.length=0;
			for (var num2 = 0; num2 < cards[num].vanishtag.length; num2++) {
				if (cards[num].vanishtag[num2][0] != "_") {
					cards[num].vanishtag.splice(num2--, 1);
				}
			}
			if (player == game.me) {
				cards[num].classList.add("drawinghidden");
			}
			if (get.is.singleHandcard() || sort > 1) frag1.appendChild(cards[num]);
			else frag2.appendChild(cards[num]);
		}
		var addv = function () {
			if (player == game.me) {
				game.addVideo("gain12", player, [get.cardsInfo(frag1.childNodes), get.cardsInfo(frag2.childNodes), event.gaintag]);
			}
		};
		var broadcast = function () {
			game.broadcast(
				function (player, cards, num, gaintag) {
					player.directgain(cards, null, gaintag);
					_status.cardPileNum = num;
				},
				player,
				cards,
				ui.cardPile.childNodes.length,
				event.gaintag
			);
		};
		if (event.animate == "draw") {
			player.$draw(cards.length);
			game.pause();
			setTimeout(function () {
				addv();
				player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
				player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
				player.update();
				if (player == game.me) ui.updatehl();
				broadcast();
				game.resume();
			}, get.delayx(500, 500));
		} else if (event.animate == "gain") {
			player.$gain(cards, event.log);
			game.pause();
			setTimeout(function () {
				addv();
				player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
				player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
				player.update();
				if (player == game.me) ui.updatehl();
				broadcast();
				game.resume();
			}, get.delayx(700, 700));
		} else if (event.animate == "gain2" || event.animate == "draw2") {
			var gain2t = 300;
			if (player.$gain2(cards, event.log) && player == game.me) {
				gain2t = 500;
			}
			game.pause();
			setTimeout(function () {
				addv();
				player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
				player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
				player.update();
				if (player == game.me) ui.updatehl();
				broadcast();
				game.resume();
			}, get.delayx(gain2t, gain2t));
		} else if (event.animate == "give" || event.animate == "giveAuto") {
			var evtmap = event.losing_map;
			if (event.animate == "give") {
				for (var i in evtmap) {
					var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
					source.$give(evtmap[i][0], player, event.log);
				}
			} else {
				for (var i in evtmap) {
					var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
					if (evtmap[i][1].length) source.$giveAuto(evtmap[i][1], player, event.log);
					if (evtmap[i][2].length) source.$give(evtmap[i][2], player, event.log);
				}
			}
			game.pause();
			setTimeout(function () {
				addv();
				player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
				player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
				player.update();
				if (player == game.me) ui.updatehl();
				broadcast();
				game.resume();
			}, get.delayx(500, 500));
		} else if (typeof event.animate == "function") {
			var time = event.animate(event);
			game.pause();
			setTimeout(function () {
				addv();
				player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
				player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
				player.update();
				if (player == game.me) ui.updatehl();
				broadcast();
				game.resume();
			}, get.delayx(time, time));
		} else {
			addv();
			player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
			player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
			player.update();
			if (player == game.me) ui.updatehl();
			broadcast();
			event.finish();
		}
		"step 4";
		game.delayx();
		if (event.updatePile) game.updateRoundNumber();
	},
	addToExpansion: function () {
		"step 0";
		if (event.animate == "give") event.visible = true;
		if (cards) {
			var map = {};
			for (var i of cards) {
				var owner = get.owner(i, "judge");
				if (owner && (owner != player || get.position(i) != "x")) {
					var id = owner.playerid;
					if (!map[id]) map[id] = [[], [], []];
					map[id][0].push(i);
					var position = get.position(i);
					if (position == "h") map[id][1].push(i);
					else map[id][2].push(i);
				} else if (!event.updatePile && get.position(i) == "c") event.updatePile = true;
			}
			event.losing_map = map;
			for (var i in map) {
				var owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
				var next = owner.lose(map[i][0], ui.special).set("type", "loseToExpansion").set("forceDie", true).set("getlx", false);
				if (event.visible == true) next.visible = true;
				event.relatedLose = next;
			}
		} else {
			event.finish();
		}
		"step 1";
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].willBeDestroyed("expansion", player, event)) {
				cards[i].selfDestroy(event);
				cards.splice(i--, 1);
			} else if (event.losing_map) {
				for (var id in event.losing_map) {
					if (event.losing_map[id][0].includes(cards[i])) {
						var source = (_status.connectMode ? lib.playerOL : game.playerMap)[id];
						var hs = source.getCards("hejsx");
						if (hs.includes(cards[i])) {
							cards.splice(i--, 1);
						}
					}
				}
			}
		}
		if (cards.length == 0) {
			event.finish();
			return;
		}
		"step 2";
		var hs = player.getCards("x");
		for (var i = 0; i < cards.length; i++) {
			if (hs.includes(cards[i])) {
				cards.splice(i--, 1);
			}
		}
		for (var num = 0; num < cards.length; num++) {
			if (_status.discarded) {
				_status.discarded.remove(cards[num]);
			}
			for (var num2 = 0; num2 < cards[num].vanishtag.length; num2++) {
				if (cards[num].vanishtag[num2][0] != "_") {
					cards[num].vanishtag.splice(num2--, 1);
				}
			}
		}
		if (event.animate == "draw") {
			player.$draw(cards.length);
			if (event.log) game.log(player, "将", get.cnNumber(cards.length), "张牌置于了武将牌上");
			game.pause();
			setTimeout(function () {
				player.$addToExpansion(cards, null, event.gaintag);
				for (var i of event.gaintag) player.markSkill(i);
				game.resume();
			}, get.delayx(500, 500));
		} else if (event.animate == "gain") {
			player.$gain(cards, false);
			game.pause();
			setTimeout(function () {
				player.$addToExpansion(cards, null, event.gaintag);
				for (var i of event.gaintag) player.markSkill(i);
				game.resume();
			}, get.delayx(700, 700));
		} else if (event.animate == "gain2" || event.animate == "draw2") {
			var gain2t = 300;
			if (player.$gain2(cards) && player == game.me) {
				gain2t = 500;
			}
			game.pause();
			setTimeout(function () {
				player.$addToExpansion(cards, null, event.gaintag);
				for (var i of event.gaintag) player.markSkill(i);
				game.resume();
			}, get.delayx(gain2t, gain2t));
		} else if (event.animate == "give" || event.animate == "giveAuto") {
			var evtmap = event.losing_map;
			if (event.animate == "give") {
				for (var i in evtmap) {
					var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
					source.$give(evtmap[i][0], player, false);
					if (event.log) game.log(player, "将", evtmap[i][0], "置于了武将牌上");
				}
			} else {
				for (var i in evtmap) {
					var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
					if (evtmap[i][1].length) {
						source.$giveAuto(evtmap[i][1], player, false);
						if (event.log) game.log(player, "将", get.cnNumber(evtmap[i][1].length), "张牌置于了武将牌上");
					}
					if (evtmap[i][2].length) {
						source.$give(evtmap[i][2], player, false);
						if (event.log) game.log(player, "将", evtmap[i][2], "置于了武将牌上");
					}
				}
			}
			game.pause();
			setTimeout(function () {
				player.$addToExpansion(cards, null, event.gaintag);
				for (var i of event.gaintag) player.markSkill(i);
				game.resume();
			}, get.delayx(500, 500));
		} else if (typeof event.animate == "function") {
			var time = event.animate(event);
			game.pause();
			setTimeout(function () {
				player.$addToExpansion(cards, null, event.gaintag);
				for (var i of event.gaintag) player.markSkill(i);
				game.resume();
			}, get.delayx(time, time));
		} else {
			player.$addToExpansion(cards, null, event.gaintag);
			for (var i of event.gaintag) player.markSkill(i);
			event.finish();
		}
		"step 4";
		game.delayx();
		if (event.updatePile) game.updateRoundNumber();
	},
	lose: function () {
		"step 0";
		var evt = event.getParent();
		if ((evt.name != "discard" || event.type != "discard") && (evt.name != "loseToDiscardpile" || event.type != "loseToDiscardpile")) {
			event.delay = false;
			return;
		}
		if (evt.delay === false) event.delay = false;
		if (evt.animate != false) {
			evt.discardid = lib.status.videoId++;
			game.broadcastAll(
				function (player, cards, id, visible) {
					const cardx = cards
						.slice()
						.map(i => (i.cards ? i.cards : [i]))
						.flat();
					player.$throw(cardx, null, "nobroadcast");
					var cardnodes = [];
					cardnodes._discardtime = get.time();
					for (var i = 0; i < cardx.length; i++) {
						if (cardx[i].clone) {
							cardnodes.push(cardx[i].clone);
							if (!visible) {
								cardx[i].clone.classList.add("infohidden");
								cardx[i].clone.classList.add("infoflip");
							}
						}
					}
					ui.todiscard[id] = cardnodes;
				},
				player,
				cards,
				evt.discardid,
				event.visible
			);
			if (lib.config.sync_speed && cards[0] && cards[0].clone) {
				if (evt.delay != false) {
					var waitingForTransition = get.time();
					evt.waitingForTransition = waitingForTransition;
					cards[0].clone.listenTransition(function () {
						if (_status.waitingForTransition == waitingForTransition && _status.paused) {
							game.resume();
						}
						delete evt.waitingForTransition;
					});
				} else if (evt.getParent().discardTransition) {
					delete evt.getParent().discardTransition;
					var waitingForTransition = get.time();
					evt.getParent().waitingForTransition = waitingForTransition;
					cards[0].clone.listenTransition(function () {
						if (_status.waitingForTransition == waitingForTransition && _status.paused) {
							game.resume();
						}
						delete evt.getParent().waitingForTransition;
					});
				}
			}
		}
		"step 1";
		event.gaintag_map = {};
		var hs = [],
			es = [],
			js = [],
			ss = [],
			xs = [];
		var unmarks = [];
		if (event.insert_card && event.position == ui.cardPile) event.cards.reverse();
		var hej = player.getCards("hejsx");
		event.stockcards = cards.slice(0);
		for (var i = 0; i < cards.length; i++) {
			let cardx = [cards[i]];
			if (!hej.includes(cards[i])) {
				cards.splice(i--, 1);
				continue;
			} else if (cards[i].parentNode) {
				if (cards[i].parentNode.classList.contains("equips")) {
					cards[i].original = "e";
					let loseCards = cards[i].cards ? cards[i].cards : [cards[i]];
					cardx.addArray(loseCards);
					loseCards.forEach(cardi => {
						es.push(cardi);
						event.vcard_map.set(cardi, cards[i].card || get.autoViewAs(cards[i], void 0, false));
					});
				} else if (cards[i].parentNode.classList.contains("judges")) {
					cards[i].original = "j";
					js.push(cards[i]);
					const VJudge = player.getVCards("j").find(card => {
						return card.cards?.includes(cards[i]);
					});
					if (VJudge) {
						event.vcard_map.set(cards[i], VJudge);
					} else event.vcard_map.set(cards[i], get.autoViewAs(cards[i], void 0, false));
				} else if (cards[i].parentNode.classList.contains("expansions")) {
					cards[i].original = "x";
					xs.push(cards[i]);
					event.vcard_map.set(cards[i], get.autoViewAs(cards[i], void 0, false));
					if (cards[i].gaintag && cards[i].gaintag.length) unmarks.addArray(cards[i].gaintag);
				} else if (cards[i].parentNode.classList.contains("handcards")) {
					if (cards[i].classList.contains("glows")) {
						cards[i].original = "s";
						ss.push(cards[i]);
						event.vcard_map.set(cards[i], get.autoViewAs(cards[i], void 0, false));
					} else {
						cards[i].original = "h";
						hs.push(cards[i]);
						event.vcard_map.set(cards[i], get.autoViewAs(cards[i], void 0, player));
					}
				} else {
					cards[i].original = null;
				}
			}
			for (var j = 0; j < cardx.length; j++) {
				if (cardx[j].gaintag && cardx[j].gaintag.length) {
					event.gaintag_map[cardx[j].cardid] = cardx[j].gaintag.slice(0);
					cardx[j].removeGaintag(true);
				}

				cardx[j].style.transform += " scale(0.2)";
				cardx[j].classList.remove("glow");
				cardx[j].classList.remove("glows");
				cardx[j].recheck();

				var info = lib.card[cardx[j].name];
				if ("_destroy" in cardx[j]) {
					if (cardx[j]._destroy) {
						cardx[j].delete();
						cardx[j].destroyed = cardx[j]._destroy;
						continue;
					}
				} else if ("destroyed" in cardx[j]) {
					if (event.getlx !== false && event.position && cardx[j].willBeDestroyed(event.position.id, null, event)) {
						cardx[j].selfDestroy(event);
						continue;
					}
				} else if (info.destroy) {
					cardx[j].delete();
					cardx[j].destroyed = info.destroy;
					continue;
				}
				if (event.position) {
					if (_status.discarded) {
						if (event.position == ui.discardPile) {
							_status.discarded.add(cardx[j]);
						} else {
							_status.discarded.remove(cardx[j]);
						}
					}
					if (event.insert_index) {
						cardx[j].fix();
						event.position.insertBefore(cardx[j], event.insert_index(event, cardx[j]));
					} else if (event.insert_card) {
						cardx[j].fix();
						event.position.insertBefore(cardx[j], event.position.firstChild);
					} else if (event.position == ui.cardPile) {
						cardx[j].fix();
						event.position.appendChild(cardx[j]);
					} else cardx[j].goto(event.position);
				} else {
					cardx[j].remove();
				}
				//if(ss.includes(cardx[j])) cards.splice(i--,1);
			}
		}
		if (player == game.me) ui.updatehl();
		ui.updatej(player);
		game.broadcast(
			function (player, cards, num) {
				for (var i = 0; i < cards.length; i++) {
					cards[i].classList.remove("glow");
					cards[i].classList.remove("glows");
					cards[i].fix();
					cards[i].remove();
				}
				if (player == game.me) {
					ui.updatehl();
				}
				ui.updatej(player);
				_status.cardPileNum = num;
			},
			player,
			cards,
			ui.cardPile.childNodes.length
		);
		game.addVideo("lose", player, [get.cardsInfo(hs), get.cardsInfo(es), get.cardsInfo(js), get.cardsInfo(ss)]);
		event.cards2 = hs.concat(es);
		player.getHistory("lose").push(event);
		game.getGlobalHistory().cardMove.push(event);
		player.update();
		game.addVideo("loseAfter", player);
		event.num = 0;
		if (event.position == ui.ordering) {
			var evt = event.relatedEvent || event.getParent();
			if (!evt.orderingCards) evt.orderingCards = [];
			if (!evt.noOrdering && !evt.cardsOrdered) {
				evt.cardsOrdered = true;
				var next = game.createEvent("orderingDiscard", false);
				event.next.remove(next);
				evt.after.push(next);
				next.relatedEvent = evt;
				next.setContent("orderingDiscard");
			}
			if (!evt.noOrdering) {
				evt.orderingCards.addArray(cards);
			}
		} else if (event.position == ui.cardPile) {
			game.updateRoundNumber();
		}
		if (unmarks.length) {
			for (var i of unmarks) {
				player[(lib.skill[i] && lib.skill[i].mark) || player.hasCard(card => card.hasGaintag(i), "x") ? "markSkill" : "unmarkSkill"](i);
			}
		}
		event.hs = hs;
		event.es = es;
		event.js = js;
		event.ss = ss;
		event.xs = xs;
		game.clearCardKnowers(hs);
		if (hs.length && !event.visible) {
			player.getCards("h").forEach(hcard => {
				hcard.clearKnowers();
			});
		}
		"step 2";
		if (num < cards.length) {
			if (event.es.includes(cards[num]) || cards[num].cards?.some(i => event.es.includes(i))) {
				event.loseEquip = true;
				const VEquip = cards[num][cards[num].cardSymbol];
				if (VEquip) {
					player.removeVirtualEquip(VEquip);
					//player.removeEquipTrigger(cards[num]);
					var info = get.info(VEquip, false);
					if (info.onLose && (!info.filterLose || info.filterLose(VEquip, player))) {
						event.goto(3);
						event.currentVEquip = VEquip;
						return;
					}
				}
			} else if (event.js.includes(cards[num])) {
				const VJudge = player.getVCards("j").find(card => {
					return card.cards?.includes(cards[num]);
				});
				if (VJudge) {
					player.removeVirtualJudge(VJudge);
				}
			}
			event.num++;
			event.redo();
		} else {
			if (event.loseEquip) {
				player.addEquipTrigger();
			}
			event.goto(4);
		}
		"step 3";
		const VEquip = event.currentVEquip;
		var info = get.info(VEquip, false);
		if (info.loseDelay != false && (player.isAlive() || info.forceDie)) {
			player.popup(VEquip.name);
			game.delayx();
		}
		if (Array.isArray(info.onLose)) {
			for (var i = 0; i < info.onLose.length; i++) {
				var next = game.createEvent("lose_" + VEquip.name);
				next.setContent(info.onLose[i]);
				if (info.forceDie) next.forceDie = true;
				next.player = player;
				next.card = VEquip;
				next.cards = VEquip.cards;
			}
		} else {
			var next = game.createEvent("lose_" + VEquip.name);
			next.setContent(info.onLose);
			next.player = player;
			if (info.forceDie) next.forceDie = true;
			next.card = VEquip;
			next.cards = VEquip.cards;
		}
		event.num++;
		event.goto(2);
		"step 4";
		event.cards = cards.map(i => (i.cards ? i.cards : [i])).flat();
		if (event.toRenku) {
			_status.renku.addArray(
				cards.filter(function (card) {
					return !card.willBeDestroyed("renku", null, event);
				})
			);
			if (_status.renku.length > 6) {
				var cards = _status.renku.splice(0, _status.renku.length - 6);
				game.log(cards, "从仁库进入了弃牌堆");
				game.cardsDiscard(cards).set("outRange", true).fromRenku = true;
			}
			game.updateRenku();
		}
		"step 5";
		var evt = event.getParent();
		if (evt.name != "discard" && event.type != "discard" && evt.name != "loseToDiscardpile" && event.type != "loseToDiscardpile") return;
		if (event.animate === false || event.delay === false) return;
		if (evt.delay != false) {
			if (evt.waitingForTransition) {
				_status.waitingForTransition = evt.waitingForTransition;
				game.pause();
			} else {
				game.delayx();
			}
		}
	},
	damage: function () {
		"step 0";
		event.forceDie = true;
		if (event.unreal) {
			event.goto(4);
			return;
		}
		game.callHook("checkDamage1", [event, player]);
		event.trigger("damageBegin1");
		"step 1";
		game.callHook("checkDamage2", [event, player]);
		event.trigger("damageBegin2");
		"step 2";
		game.callHook("checkDamage3", [event, player]);
		event.trigger("damageBegin3");
		"step 3";
		game.callHook("checkDamage4", [event, player]);
		event.trigger("damageBegin4");
		"step 4";
		//moved changeHujia to changeHp
		if (player.hujia > 0 && !player.hasSkillTag("nohujia")) {
			var damageAudioInfo = lib.natureAudio.hujia_damage[event.nature];
			if (!damageAudioInfo || damageAudioInfo == "normal") {
				damageAudioInfo = "effect/hujia_damage" + (num > 1 ? "2" : "") + ".mp3";
			} else if (damageAudioInfo == "default") {
				damageAudioInfo = "effect/hujia_damage_" + event.nature + (num > 1 ? "2" : "") + ".mp3";
			} else {
				damageAudioInfo = damageAudioInfo[num > 1 ? 2 : 1];
			}
			game.broadcastAll(function (damageAudioInfo) {
				if (lib.config.background_audio) game.playAudio(damageAudioInfo);
			}, damageAudioInfo);
		} else {
			var damageAudioInfo = lib.natureAudio.damage[event.nature];
			if (!damageAudioInfo || damageAudioInfo == "normal") {
				damageAudioInfo = "effect/damage" + (num > 1 ? "2" : "") + ".mp3";
			} else if (damageAudioInfo == "default") {
				damageAudioInfo = "effect/damage_" + event.nature + (num > 1 ? "2" : "") + ".mp3";
			} else {
				damageAudioInfo = damageAudioInfo[num > 1 ? 2 : 1];
			}
			game.broadcastAll(function (damageAudioInfo) {
				if (lib.config.background_audio) game.playAudio(damageAudioInfo);
			}, damageAudioInfo);
		}
		var str = event.unreal ? "视为受到了" : "受到了";
		if (source) str += '来自<span class="bluetext">' + (source == player ? "自己" : get.translation(source)) + "</span>的";
		str += get.cnNumber(num) + "点";
		if (event.nature) str += get.translation(event.nature) + "属性";
		str += "伤害";
		game.log(player, str);
		if (player.stat[player.stat.length - 1].damaged == undefined) {
			player.stat[player.stat.length - 1].damaged = num;
		} else {
			player.stat[player.stat.length - 1].damaged += num;
		}
		if (source) {
			source.getHistory("sourceDamage").push(event);
			if (source.stat[source.stat.length - 1].damage == undefined) {
				source.stat[source.stat.length - 1].damage = num;
			} else {
				source.stat[source.stat.length - 1].damage += num;
			}
		}
		player.getHistory("damage").push(event);
		if (!event.unreal) {
			if (event.notrigger) {
				player.changeHp(-num, false)._triggered = null;
			} else {
				player.changeHp(-num, false);
			}
		}
		if (event.animate !== false) {
			player.$damage(source);
			var natures = (event.nature || "").split(lib.natureSeparator);
			game.broadcastAll(
				function (natures, player) {
					if (lib.config.animation && !lib.config.low_performance) {
						if (natures.includes("fire")) {
							player.$fire();
						}
						if (natures.includes("thunder")) {
							player.$thunder();
						}
					}
				},
				natures,
				player
			);
			var numx = player.hasSkillTag("nohujia") ? num : Math.max(0, num - player.hujia);
			player.$damagepop(-numx, natures[0]);
		}
		if (event.unreal) event.goto(6);
		if (!event.notrigger) {
			if (num == 0) {
				event.trigger("damageZero");
				event._triggered = null;
			} else {
				event.trigger("damage");
			}
		}
		"step 5";
		if (player.hp <= 0 && player.isAlive() && !event.nodying) {
			game.delayx();
			event._dyinged = true;
			player.dying(event);
		}
		if (source && lib.config.border_style == "auto") {
			var dnum = 0;
			for (var j = 0; j < source.stat.length; j++) {
				if (source.stat[j].damage != undefined) dnum += source.stat[j].damage;
			}
			if (dnum >= 2) {
				if (lib.config.autoborder_start == "silver") {
					dnum += 4;
				} else if (lib.config.autoborder_start == "gold") {
					dnum += 8;
				}
			}
			if (lib.config.autoborder_count == "damage") {
				source.node.framebg.dataset.decoration = "";
				if (dnum >= 10) {
					source.node.framebg.dataset.auto = "gold";
					if (dnum >= 12) source.node.framebg.dataset.decoration = "gold";
				} else if (dnum >= 6) {
					source.node.framebg.dataset.auto = "silver";
					if (dnum >= 8) source.node.framebg.dataset.decoration = "silver";
				} else if (dnum >= 2) {
					source.node.framebg.dataset.auto = "bronze";
					if (dnum >= 4) source.node.framebg.dataset.decoration = "bronze";
				}
				if (dnum >= 2) {
					source.classList.add("topcount");
				}
			} else if (lib.config.autoborder_count == "mix") {
				source.node.framebg.dataset.decoration = "";
				switch (source.node.framebg.dataset.auto) {
					case "bronze":
						if (dnum >= 4) source.node.framebg.dataset.decoration = "bronze";
						break;
					case "silver":
						if (dnum >= 8) source.node.framebg.dataset.decoration = "silver";
						break;
					case "gold":
						if (dnum >= 12) source.node.framebg.dataset.decoration = "gold";
						break;
				}
			}
		}
		"step 6";
		if (!event.notrigger) event.trigger("damageSource");
	},
	recover: function () {
		if (num > player.maxHp - player.hp) {
			num = player.maxHp - player.hp;
			event.num = num;
		}
		if (num > 0) {
			delete event.filterStop;
			if (lib.config.background_audio) {
				game.playAudio("effect", "recover");
			}
			game.broadcast(function () {
				if (lib.config.background_audio) {
					game.playAudio("effect", "recover");
				}
			});
			game.broadcastAll(function (player) {
				if (lib.config.animation && !lib.config.low_performance) {
					player.$recover();
				}
			}, player);
			player.$damagepop(num, "wood");
			game.log(player, "回复了" + get.cnNumber(num) + "点体力");

			player.changeHp(num, false);
		} else event._triggered = null;
	},
	loseHp: function () {
		"step 0";
		if (event.num <= 0) {
			event._triggered = null;
			event.finish();
			return;
		}
		if (lib.config.background_audio) {
			game.playAudio("effect", "loseHp");
		}
		game.broadcast(function () {
			if (lib.config.background_audio) {
				game.playAudio("effect", "loseHp");
			}
		});
		game.log(player, "失去了" + get.cnNumber(num) + "点体力");
		player.changeHp(-num);
		"step 1";
		if (player.hp <= 0 && !event.nodying) {
			game.delayx();
			event._dyinged = true;
			player.dying(event);
		}
	},
	doubleDraw: function () {
		"step 0";
		player.chooseBool("你的主副将体力上限之和是奇数，是否摸一张牌？");
		"step 1";
		if (result.bool) {
			player.draw();
		}
	},
	loseMaxHp: function () {
		"step 0";
		game.log(player, "减少了" + get.cnNumber(num) + "点体力上限");
		player.maxHp -= num;
		if (isNaN(player.maxHp)) {
			player.maxHp = 0;
		}
		event.loseHp = Math.max(0, player.hp - player.maxHp);
		player.update();
		"step 1";
		if (player.maxHp <= 0) {
			player.die(event);
		}
	},
	gainMaxHp: function () {
		"step 0";
		game.log(player, "增加了" + get.cnNumber(num) + "点体力上限");
		player.maxHp += num;
		player.update();
	},
	changeHp: function () {
		//add to GlobalHistory
		game.getGlobalHistory().changeHp.push(event);
		//changeHujia moved here
		if (num < 0 && player.hujia > 0 && event.getParent().name == "damage" && !player.hasSkillTag("nohujia")) {
			event.hujia = Math.min(-num, player.hujia);
			event.getParent().hujia = event.hujia;
			event.num += event.hujia;
			//log moved to changeHujia
			//game.log(player,'的护甲抵挡了'+get.cnNumber(event.hujia)+'点伤害');
			player.changeHujia(-event.hujia).type = "damage";
		}
		//old part
		num = event.num;
		player.hp += num;
		if (isNaN(player.hp)) player.hp = 0;
		if (player.hp > player.maxHp) player.hp = player.maxHp;
		player.update();
		if (event.popup !== false) {
			player.$damagepop(num, "water");
		}
		if (_status.dying.includes(player) && player.hp > 0) {
			_status.dying.remove(player);
			game.broadcast(function (list) {
				_status.dying = list;
			}, _status.dying);
			var evt = event.getParent("_save");
			if (evt && evt.finish) evt.finish();
			evt = event.getParent("dying");
			if (evt && evt.finish) evt.finish();
		}
		event.trigger("changeHp");
	},
	changeHujia: function () {
		if (num > 0) {
			game.log(player, "获得了" + get.cnNumber(num) + "点护甲");
		} else if (num < 0) {
			if (-num > player.hujia) {
				num = -player.hujia;
				event.num = num;
			}
			switch (
				event.type //log moved here
			) {
				case "damage":
					game.log(player, "的护甲抵挡了" + get.cnNumber(-num) + "点伤害");
					break;
				case "lose":
					game.log(player, "失去了" + get.cnNumber(-num) + "点护甲");
					break;
			}
		}
		player.hujia += num;
		//if(player.hujia<0){
		//	player.hujia=0;
		//}
		player.update();
	},
	dying: function () {
		"step 0";
		event.forceDie = true;
		if (player.isDying() || player.hp > 0) {
			event.finish();
			return;
		}
		_status.dying.unshift(player);
		game.broadcast(function (list) {
			_status.dying = list;
		}, _status.dying);
		event.trigger("dying");
		game.log(player, "濒死");
		"step 1";
		delete event.filterStop;
		if (player.hp > 0 || event.nodying) {
			_status.dying.remove(player);
			game.broadcast(function (list) {
				_status.dying = list;
			}, _status.dying);
			event.finish();
		} else if (!event.skipTao) {
			var next = game.createEvent("_save");
			var start = false;
			var starts = [_status.currentPhase, event.source, event.player, game.me, game.players[0]];
			for (var i = 0; i < starts.length; i++) {
				if (get.itemtype(starts[i]) == "player") {
					start = starts[i];
					break;
				}
			}
			next.player = start;
			next._trigger = event;
			next.triggername = "_save";
			next.forceDie = true;
			next.setContent(lib.skill._save.content);
		}
		"step 2";
		_status.dying.remove(player);
		game.broadcast(function (list) {
			_status.dying = list;
		}, _status.dying);
		if (player.hp <= 0 && !event.nodying && !player.nodying) player.die(event.reason);
	},
	die: function () {
		"step 0";
		event.forceDie = true;
		if (_status.roundStart == player) {
			_status.roundStart = player.next || player.getNext() || game.players[0];
		}
		if (ui.land && ui.land.player == player) {
			game.addVideo("destroyLand");
			ui.land.destroy();
		}
		var unseen = false;
		if (player.classList.contains("unseen")) {
			player.classList.remove("unseen");
			unseen = true;
		}
		var logvid = game.logv(player, "die", source);
		event.logvid = logvid;
		if (unseen) {
			player.classList.add("unseen");
		}
		if (source) {
			game.log(player, "被", source, "杀害");
			if (source.stat[source.stat.length - 1].kill == undefined) {
				source.stat[source.stat.length - 1].kill = 1;
			} else {
				source.stat[source.stat.length - 1].kill++;
			}
		} else {
			game.log(player, "阵亡");
		}

		// player.removeEquipTrigger();

		// for(var i in lib.skill.globalmap){
		//     if(lib.skill.globalmap[i].includes(player)){
		//      			lib.skill.globalmap[i].remove(player);
		//      			if(lib.skill.globalmap[i].length==0&&!lib.skill[i].globalFixed){
		//      						 game.removeGlobalSkill(i);
		//      			}
		//     }
		// }
		game.broadcastAll(function (player) {
			player.classList.add("dead");
			player.removeLink();
			player.classList.remove("turnedover");
			player.classList.remove("out");
			player.node.count.innerHTML = "0";
			player.node.hp.hide();
			player.node.equips.hide();
			player.node.count.hide();
			player.previous.next = player.next;
			player.next.previous = player.previous;
			game.players.remove(player);
			game.dead.push(player);
			_status.dying.remove(player);
		}, player);

		game.tryDieAudio(player);
		game.addVideo("diex", player);
		if (event.animate !== false) {
			player.$die(source);
		}
		if (player.hp != 0) {
			player.changeHp(0 - player.hp, false).forceDie = true;
		}
		"step 1";
		if (player.dieAfter) player.dieAfter(source);
		"step 2";
		event.trigger("die");
		"step 3";
		if (player.isDead()) {
			if (!game.reserveDead) {
				for (var mark in player.marks) {
					player.unmarkSkill(mark);
				}
				while (player.node.marks.childNodes.length > 1) {
					player.node.marks.lastChild.remove();
				}
				game.broadcast(function (player) {
					while (player.node.marks.childNodes.length > 1) {
						player.node.marks.lastChild.remove();
					}
				}, player);
				player.removeTip();
			}
			for (var i in player.tempSkills) {
				player.removeSkill(i);
			}
			var skills = player.getSkills();
			for (var i = 0; i < skills.length; i++) {
				if (lib.skill[skills[i]].temp) {
					player.removeSkill(skills[i]);
				}
			}
			if (_status.characterlist) {
				if (lib.character[player.name] && !player.name.startsWith("gz_shibing") && !player.name.startsWith("gz_jun_")) _status.characterlist.add(player.name);
				if (lib.character[player.name1] && !player.name1.startsWith("gz_shibing") && !player.name1.startsWith("gz_jun_")) _status.characterlist.add(player.name1);
				if (lib.character[player.name2] && !player.name2.startsWith("gz_shibing") && !player.name2.startsWith("gz_jun_")) _status.characterlist.add(player.name2);
			}
			event.cards = player.getCards("hejsx");
			if (event.cards.length) {
				player.discard(event.cards).forceDie = true;
				//player.$throw(event.cards,1000);
			}
		}
		"step 4";
		if (player.dieAfter2) player.dieAfter2(source);
		"step 5";
		game.broadcastAll(function (player) {
			if (game.online && player == game.me && !_status.over && !game.controlOver && !ui.exit) {
				if (lib.mode[lib.configOL.mode].config.dierestart) {
					ui.create.exit();
				}
			}
		}, player);
		if (!_status.connectMode && player == game.me && !_status.over && !game.controlOver) {
			ui.control.show();
			if (get.config("revive") && lib.mode[lib.config.mode].config.revive && !ui.revive) {
				ui.revive = ui.create.control("revive", ui.click.dierevive);
			}
			if (get.config("continue_game") && !ui.continue_game && lib.mode[lib.config.mode].config.continue_game && !_status.brawl && !game.no_continue_game) {
				ui.continue_game = ui.create.control("再战", game.reloadCurrent);
			}
			if (get.config("dierestart") && lib.mode[lib.config.mode].config.dierestart && !ui.restart) {
				ui.restart = ui.create.control("restart", game.reload);
			}
		}

		if (!_status.connectMode && player == game.me && !game.modeSwapPlayer) {
			// _status.auto=false;
			if (ui.auto) {
				// ui.auto.classList.remove('glow');
				ui.auto.hide();
			}
			if (ui.wuxie) ui.wuxie.hide();
		}

		if (typeof _status.coin == "number" && source && !_status.auto) {
			if (source == game.me || source.isUnderControl()) {
				_status.coin += 10;
			}
		}
		if (source && lib.config.border_style == "auto" && (lib.config.autoborder_count == "kill" || lib.config.autoborder_count == "mix")) {
			switch (source.node.framebg.dataset.auto) {
				case "gold":
				case "silver":
					source.node.framebg.dataset.auto = "gold";
					break;
				case "bronze":
					source.node.framebg.dataset.auto = "silver";
					break;
				default:
					source.node.framebg.dataset.auto = lib.config.autoborder_start || "bronze";
			}
			if (lib.config.autoborder_count == "kill") {
				source.node.framebg.dataset.decoration = source.node.framebg.dataset.auto;
			} else {
				var dnum = 0;
				for (var j = 0; j < source.stat.length; j++) {
					if (source.stat[j].damage != undefined) dnum += source.stat[j].damage;
				}
				source.node.framebg.dataset.decoration = "";
				switch (source.node.framebg.dataset.auto) {
					case "bronze":
						if (dnum >= 4) source.node.framebg.dataset.decoration = "bronze";
						break;
					case "silver":
						if (dnum >= 8) source.node.framebg.dataset.decoration = "silver";
						break;
					case "gold":
						if (dnum >= 12) source.node.framebg.dataset.decoration = "gold";
						break;
				}
			}
			source.classList.add("topcount");
		}
	},
	//暂时还是只能一次加一张牌，需要后续跟进处理
	addJudge: async function (event, trigger, player) {
		let card, cardName;
		if (typeof event.card == "string") {
			cardName = event.card;
			card = get.autoViewAs({ name: cardName }, event.cards);
			event.card = card;
		} else {
			cardName = event.card.name;
			if (get.itemtype(event.card) === "card") {
				event.cards = [event.card];
				card = get.autoViewAs(event.card, void 0, false);
				event.card = card;
			} else if (!event.card.cards?.length && event.cards?.length) {
				card = get.autoViewAs({ name: cardName, isCard: true }, event.cards);
				event.card = card;
			} else if (!event.cards) {
				event.cards = [];
			}
		}
		card = event.card;
		const cards = event.cards,
			cardInfo = lib.card[cardName],
			visible = cardInfo && !cardInfo.blankCard;
		event.visible = visible;
		//失去牌的一长串
		if (event.cards?.length) {
			const map = {};
			for (const i of event.cards) {
				var owner = get.owner(i, "judge");
				if (owner /* && (owner != player || get.position(i) != "e")*/) {
					var id = owner.playerid;
					if (!map[id]) map[id] = [[], [], []];
					map[id][0].push(i);
					var position = get.position(i);
					if (position == "h") map[id][1].push(i);
					else map[id][2].push(i);
				} else if (!event.updatePile && get.position(i) == "c") event.updatePile = true;
				if (event.visible) i.addKnower("everyone");
			}
			event.losing_map = map;
			for (const i in map) {
				const owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
				const next = owner.lose(map[i][0], ui.special).set("type", "addJudge").set("forceDie", true).set("getlx", false);
				if (event.visible == true) {
					// @ts-ignore
					next.visible = true;
				}
				await next;
				event.relatedLose = next;
			}
			let canMoveOn = true;
			event.cards.forEach(card => {
				if (card.willBeDestroyed("judge", player, event)) {
					card.selfDestroy(event);
					canMoveOn = false;
					return;
				} else if (canMoveOn) {
					// @ts-ignore
					if ("hejx".includes(get.position(card, true))) {
						canMoveOn = false;
						return;
					}
				}
			});
			if (!canMoveOn) return;
		}
		if (!cardInfo.effect && !cardInfo.noEffect) {
			if (event.cards.length) await game.cardsDiscard(event.cards);
			return;
		}
		game.broadcastAll(
			(player, card, cards) => {
				const cardsCloned = cards.filter(card => {
					return cards[0].clone && (cards[0].clone.parentNode == player.parentNode || cards[0].clone.parentNode == ui.arena);
				});
				if (cardsCloned.length) {
					cardsCloned.forEach(card => {
						card.clone.moveDelete(player);
					});
					game.addVideo("gain2", player, get.cardsInfo(cardsCloned));
				}
			},
			player,
			event.card,
			event.cards
		);
		player.addVirtualJudge(event.card, event.cards);
		const isViewAsCard = cards?.length !== 1 || cards[0].name !== card.name;
		if (isViewAsCard && cards?.length) {
			if (cardInfo.blankCard) {
				game.log(player, '被扣置了<span class="yellowtext">' + get.translation(cardName) + "</span>");
			} else {
				game.log(player, '被贴上了<span class="yellowtext">' + get.translation(cardName) + "</span>（", cards, "）");
			}
		} else {
			game.log(player, "被贴上了", card);
		}
	},
	addJudge_old: function () {
		"step 0";
		const cardName = typeof card == "string" ? card : card.name,
			cardInfo = lib.card[cardName];
		if (cards) {
			var owner = get.owner(cards[0]);
			if (owner) {
				event.relatedLose = owner.lose(cards, ui.special).set("getlx", false);
				if (cardInfo && !cardInfo.blankCard) {
					event.relatedLose.set("visible", true);
					event.set("visible", true);
				}
			} else if (get.position(cards[0]) == "c") event.updatePile = true;
		}
		"step 1";
		if (cards[0].willBeDestroyed("judge", player, event)) {
			cards[0].selfDestroy(event);
			event.finish();
			return;
		} else if (event.relatedLose) {
			var owner = event.relatedLose.player;
			if (owner.getCards("hejsx").includes(card)) {
				event.finish();
				return;
			}
		}
		cards[0].fix();
		cards[0].style.transform = "";
		cards[0].classList.remove("drawinghidden");
		delete cards[0]._transform;
		var viewAs = typeof card == "string" ? card : card.name;
		if (!lib.card[viewAs] || (!lib.card[viewAs].effect && !lib.card[viewAs].noEffect)) {
			game.cardsDiscard(cards[0]);
		} else {
			cards[0].style.transform = "";
			cards[0].classList.add("drawinghidden");
			player.node.judges.insertBefore(cards[0], player.node.judges.firstChild);
			if (_status.discarded) {
				_status.discarded.remove(cards[0]);
			}
			ui.updatej(player);
			game.broadcast(
				function (player, card, viewAs) {
					card.fix();
					card.style.transform = "";
					card.classList.add("drawinghidden");
					card.viewAs = viewAs;
					if (viewAs && viewAs != card.name && (card.classList.contains("fullskin") || card.classList.contains("fullborder"))) {
						card.classList.add("fakejudge");
						card.node.background.innerHTML = lib.translate[viewAs + "_bg"] || get.translation(viewAs)[0];
					} else {
						card.classList.remove("fakejudge");
					}
					player.node.judges.insertBefore(card, player.node.judges.firstChild);
					ui.updatej(player);
					if (card.clone && (card.clone.parentNode == player.parentNode || card.clone.parentNode == ui.arena)) {
						card.clone.moveDelete(player);
						game.addVideo("gain2", player, get.cardsInfo([card]));
					}
				},
				player,
				cards[0],
				viewAs
			);
			if (cards[0].clone && (cards[0].clone.parentNode == player.parentNode || cards[0].clone.parentNode == ui.arena)) {
				cards[0].clone.moveDelete(player);
				game.addVideo("gain2", player, get.cardsInfo(cards));
			}
			// player.$gain2(cards);
			if (get.itemtype(card) != "card") {
				if (typeof card == "string") cards[0].viewAs = card;
				else cards[0].viewAs = card.name;
			} else {
				delete cards[0].viewAs;
			}
			if (cards[0].viewAs && cards[0].viewAs != cards[0].name) {
				if (cards[0].classList.contains("fullskin") || cards[0].classList.contains("fullborder")) {
					cards[0].classList.add("fakejudge");
					cards[0].node.background.innerHTML = lib.translate[cards[0].viewAs + "_bg"] || get.translation(cards[0].viewAs)[0];
				}
				if (lib.card[viewAs].blankCard) {
					game.log(player, '被扣置了<span class="yellowtext">' + get.translation(cards[0].viewAs) + "</span>");
				} else {
					game.log(player, '被贴上了<span class="yellowtext">' + get.translation(cards[0].viewAs) + "</span>（", cards, "）");
				}
			} else {
				cards[0].classList.remove("fakejudge");
				game.log(player, "被贴上了", cards);
			}
			game.addVideo("addJudge", player, [get.cardInfo(cards[0]), cards[0].viewAs]);
		}
		if (event.updatePile) game.updateRoundNumber();
	},
	judge: function () {
		"step 0";
		var judgestr = get.translation(player) + "的" + event.judgestr + "判定";
		event.videoId = lib.status.videoId++;
		var cardj = event.directresult;
		if (!cardj) {
			if (player.getTopCards) cardj = player.getTopCards()[0];
			else cardj = get.cards()[0];
		}
		var owner = get.owner(cardj);
		if (owner) {
			owner.lose(cardj, "visible", ui.ordering);
		} else {
			var nextj = game.cardsGotoOrdering(cardj);
			if (event.position != ui.discardPile) nextj.noOrdering = true;
		}
		player.judging.unshift(cardj);
		game.addVideo("judge1", player, [get.cardInfo(player.judging[0]), judgestr, event.videoId]);
		game.broadcastAll(
			function (player, card, str, id, cardid) {
				var event;
				if (game.online) {
					event = {};
				} else {
					event = _status.event;
				}
				if (game.chess) {
					event.node = card.copy("thrown", "center", ui.arena).addTempClass("start");
				} else {
					event.node = player.$throwordered(card.copy(), true);
				}
				if (lib.cardOL) lib.cardOL[cardid] = event.node;
				event.node.cardid = cardid;
				event.node.classList.add("thrownhighlight");
				ui.arena.classList.add("thrownhighlight");
				event.dialog = ui.create.dialog(str);
				event.dialog.classList.add("center");
				event.dialog.videoId = id;
			},
			player,
			player.judging[0],
			judgestr,
			event.videoId,
			get.id()
		);

		game.log(player, "进行" + event.judgestr + "判定，亮出的判定牌为", player.judging[0]);
		game.delay(2);
		if (!event.noJudgeTrigger) event.trigger("judge");
		"step 1";
		event.result = {
			card: player.judging[0],
			name: player.judging[0].name,
			number: get.number(player.judging[0]),
			suit: get.suit(player.judging[0]),
			color: get.color(player.judging[0]),
			node: event.node,
		};
		if (event.fixedResult) {
			for (var i in event.fixedResult) {
				event.result[i] = event.fixedResult[i];
			}
		}
		event.result.judge = event.judge(event.result);
		if (event.result.judge > 0) event.result.bool = true;
		else if (event.result.judge < 0) event.result.bool = false;
		else event.result.bool = null;
		player.judging.shift();
		game.checkMod(player, event.result, "judge", player);
		if (event.judge2) {
			var judge2 = event.judge2(event.result);
			if (typeof judge2 == "boolean") player.tryJudgeAnimate(judge2);
		}
		if (event.clearArena != false) {
			game.broadcastAll(ui.clear);
		}
		game.broadcast(function (id) {
			var dialog = get.idDialog(id);
			if (dialog) {
				dialog.close();
			}
			ui.arena.classList.remove("thrownhighlight");
		}, event.videoId);
		event.dialog.close();
		game.addVideo("judge2", null, event.videoId);
		ui.arena.classList.remove("thrownhighlight");
		game.log(player, "的判定结果为", event.result.card);
		event.trigger("judgeFixing");
		if (event.callback) {
			var next = game.createEvent("judgeCallback", false);
			next.player = player;
			next.card = event.result.card;
			next.judgeResult = get.copy(event.result);
			next.setContent(event.callback);
		} else {
			if (!get.owner(event.result.card)) {
				if (event.position != ui.discardPile) event.position.appendChild(event.result.card);
			}
		}
	},
	turnOver: function () {
		game.log(player, "翻面");
		player.classList.toggle("turnedover");
		game.broadcast(function (player) {
			player.classList.toggle("turnedover");
		}, player);
		game.addVideo("turnOver", player, player.classList.contains("turnedover"));
	},
	link: function () {
		const isLinked = player.isLinked();
		game.log(player, (isLinked ? "解除" : "被") + "连环");
		game.broadcastAll(isLinked => {
			if (lib.config.background_audio) {
				game.playAudio("effect", "link" + (isLinked ? "_clear" : ""));
			}
		}, isLinked);
		player.classList.remove("target");
		if (get.is.linked2(player)) {
			player.classList.toggle("linked2");
		} else {
			player.classList.toggle("linked");
		}
		ui.updatej(player);
		ui.updatem(player);
		game.broadcast(
			function (player, linked) {
				player.classList.remove("target");
				if (get.is.linked2(player)) {
					if (linked) {
						player.classList.add("linked2");
					} else {
						player.classList.remove("linked2");
					}
				} else {
					if (linked) {
						player.classList.add("linked");
					} else {
						player.classList.remove("linked");
					}
				}
				ui.updatej(player);
				ui.updatem(player);
			},
			player,
			player.isLinked()
		);
		game.addVideo("link", player, player.isLinked());
	},
	/**
	 * @deprecated
	 */
	chooseToGuanxing: function () {
		"step 0";
		var cards = get.cards(num);
		game.cardsGotoOrdering(cards);
		var next = player.chooseToMove();
		next.set("list", [["牌堆顶", cards], ["牌堆底"]]);
		next.set("prompt", event.prompt || "点击或拖动将牌移动到牌堆顶或牌堆底");
		next.processAI =
			event.processAI ||
			function (list) {
				let cards = list[0][1],
					player = _status.event.player,
					target = _status.currentPhase || player,
					name = _status.event.getTrigger()?.name,
					countWuxie = current => {
						let num = current.getKnownCards(player, card => {
							return get.name(card, current) === "wuxie";
						});
						if (num && current !== player) return num;
						let skills = current.getSkills("invisible").concat(lib.skill.global);
						game.expandSkills(skills);
						for (let i = 0; i < skills.length; i++) {
							let ifo = get.info(skills[i]);
							if (!ifo) continue;
							if (ifo.viewAs && typeof ifo.viewAs != "function" && ifo.viewAs.name == "wuxie") {
								if (!ifo.viewAsFilter || ifo.viewAsFilter(current)) {
									num++;
									break;
								}
							} else {
								let hiddenCard = ifo.hiddenCard;
								if (typeof hiddenCard == "function" && hiddenCard(current, "wuxie")) {
									num++;
									break;
								}
							}
						}
						return num;
					},
					top = [];
				switch (name) {
					case "phaseJieshu":
						target = target.next;
					case "phaseZhunbei":
						let att = get.sgn(get.attitude(player, target)),
							judges = target.getCards("j"),
							needs = 0,
							wuxie = countWuxie(target);
						for (let i = Math.min(cards.length, judges.length) - 1; i >= 0; i--) {
							let j = judges[i],
								cardj = j.viewAs ? { name: j.viewAs, cards: j.cards || [j] } : j;
							if (wuxie > 0 && get.effect(target, j, target, target) < 0) {
								wuxie--;
								continue;
							}
							let judge = get.judge(j);
							cards.sort((a, b) => {
								return (judge(b) - judge(a)) * att;
							});
							if (judge(cards[0]) * att < 0) {
								needs++;
								continue;
							} else {
								top.unshift(cards.shift());
							}
						}
						if (needs > 0 && needs >= judges.length) {
							return [top, cards];
						}
						cards.sort((a, b) => {
							return (get.value(b, target) - get.value(a, target)) * att;
						});
						while (needs--) {
							top.unshift(cards.shift());
						}
						while (cards.length) {
							if (get.value(cards[0], target) > 6 == att > 0) top.unshift(cards.shift());
							else break;
						}
						return [top, cards];
					default:
						cards.sort((a, b) => {
							return get.value(b, target) - get.value(a, target);
						});
						while (cards.length) {
							if (get.value(cards[0], target) > 6) top.unshift(cards.shift());
							else break;
						}
						return [top, cards];
				}
			};
		"step 1";
		var top = result.moved[0];
		var bottom = result.moved[1];
		top.reverse();
		for (var i = 0; i < top.length; i++) {
			ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
		}
		for (i = 0; i < bottom.length; i++) {
			ui.cardPile.appendChild(bottom[i]);
		}
		event.result = {
			bool: true,
			moved: [top, bottom],
		};
		game.addCardKnower(top, player);
		game.addCardKnower(bottom, player);
		player.popup(get.cnNumber(top.length) + "上" + get.cnNumber(bottom.length) + "下");
		game.log(player, "将" + get.cnNumber(top.length) + "张牌置于牌堆顶");
		game.updateRoundNumber();
		game.delayx();
	},
	chooseToMove_new: function () {
		"step 0";
		//联机时间
		if (event.chooseTime && _status.connectMode && !game.online) {
			event.time = lib.configOL.choose_timeout;
			game.broadcastAll(function (time) {
				lib.configOL.choose_timeout = time;
			}, event.chooseTime);
		}
		if (event.isMine()) {
			//自动选择
			event.switchToAuto = function () {
				if (!event.filterOk(event.moved)) {
					if (!event.forced) event._result = { bool: false };
					else event._result = "ai";
				} else {
					event._result = {
						bool: true,
						moved: event.moved,
					};
				}
				event.dialog.close();
				if (ui.confirm) ui.confirm.close();
				game.resume();
				_status.imchoosing = false;
				setTimeout(function () {
					ui.arena.classList.remove("choose-to-move");
				}, 500);
			};
			//创造dialog
			event.dialog = ui.create.dialog();
			event.dialog.addNewRow(event.prompt || "请选择要操作的牌");
			event.dialog.selectedCard = null;
			event.dialog.isBusy = false;
			event.dialog.classList.add("scroll1");
			event.dialog.classList.add("scroll2");
			event.dialog.classList.add("fullwidth");
			if (get.is.phoneLayout() || event.list.length > 2) {
				ui.arena.classList.add("choose-to-move");
				event.dialog.classList.add("fullheight");
			}
			//刷新，确认是否返回结果
			function updateButtons() {
				event.moved = Array.from({
					length: event.list.slice().reduce((sum, currentList) => {
						if (!Array.isArray(currentList[0])) currentList = [currentList];
						return (sum += currentList.length);
					}, 0),
				}).map((_, i) => {
					const num = 2 * (i + 1);
					return Array.from(event.dialog.itemContainers[num].children).map(e => e.link);
				});
				if (event.filterOk(event.moved)) {
					ui.create.confirm("o");
				} else {
					if (!event.forced) ui.create.confirm("c");
					else if (ui.confirm) ui.confirm.close();
				}
			}
			//点击每个卡的事件
			function clickItem(card, container, allContainers) {
				if (event.dialog.isBusy) return;
				if (event.dialog.selectedCard) {
					if (card !== event.dialog.selectedCard && event.filterMove(event.dialog.selectedCard, card, event.moved)) {
						event.dialog.isBusy = true;
						game.$swapElement(card, event.dialog.selectedCard, 300).then(() => {
							event.dialog.isBusy = false;
							updateButtons();
						});
					}
					event.dialog.selectedCard.classList.remove("selected");
					event.dialog.selectedCard = null;
				} else {
					event.dialog.selectedCard = card;
					card.classList.add("selected");
				}
			}
			//点击容器的事件回调
			function clickItemContainer(itemContainer, i, allContainers) {
				if (event.dialog.isBusy || !event.dialog.selectedCard) return;
				if (itemContainer.contains(event.dialog.selectedCard)) return;
				let index = Array.from(event.dialog.itemContainers).indexOf(itemContainer) / 2 - 1;
				if (event.filterMove(event.dialog.selectedCard, index, event.moved)) {
					event.dialog.isBusy = true;
					game.$elementGoto(event.dialog.selectedCard, itemContainer, 300).then(() => {
						event.dialog.isBusy = false;
						updateButtons();
					});
				}
				event.dialog.selectedCard.classList.remove("selected");
				event.dialog.selectedCard = null;
			}
			//框的部分属性
			let itemContainerCss = event.itemContainerCss || {
				justifyContent: "center",
				minHeight: "100px",
			};
			for (let i = 0; i < event.list.length; i++) {
				let currentList = event.list[i].slice();
				if (!Array.isArray(currentList[0])) currentList = [currentList];
				event.dialog.addNewRow(
					...currentList
						.slice()
						.map(listx => {
							return [{ item: listx[0], ratio: 1 }, listx[1]?.length ? { item: listx[1], ratio: 6 / currentList.length, itemContainerCss, clickItem, clickItemContainer } : { item: listx[1], ratio: 6 / currentList.length, itemContainerCss, clickItemContainer }];
						})
						.flat()
				);
			}
			event.dialog.open();
			updateButtons();
			//获取结果
			event.custom.replace.confirm = function (bool) {
				if (bool)
					event._result = {
						bool: true,
						moved: event.moved,
					};
				else event._result = { bool: false };
				event.dialog.close();
				if (ui.confirm) ui.confirm.close();
				game.resume();
				_status.imchoosing = false;
				setTimeout(function () {
					ui.arena.classList.remove("choose-to-move");
				}, 500);
			};
			//开搞
			game.pause();
			game.countChoose();
			event.choosing = true;
		} else if (event.isOnline()) {
			event.send();
		} else {
			event.result = "ai";
		}
		"step 1";
		//时间限制
		if (event.time) {
			game.broadcastAll(function (time) {
				lib.configOL.choose_timeout = time;
			}, event.time);
		}
		//结果获取
		var result = event.result || result;
		if ((!result || result == "ai" || (event.forced && !result.bool)) && event.processAI) {
			var moved = event.processAI(event.list);
			if (moved)
				result = {
					bool: true,
					moved: moved,
				};
			else result = { bool: false };
		}
		event.result = result;
	},
};
