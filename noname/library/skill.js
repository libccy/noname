export const skill = {
	stratagem_fury: {
		marktext: "🔥",
		intro: {
			name: "怒气",
			content: (storage, player) => {
				const stratagemFuryMax = _status.stratagemFuryMax, fury = storage || 0;
				return `当前怒气值：${typeof stratagemFuryMax == "number" ? `${fury}/${stratagemFuryMax}` : fury}`;
			}
		}
	},
	_stratagem_add_buff: {
		log: false,
		enable: "chooseToUse",
		filter: (event, player) => {
			const fury = player.storage.stratagem_fury;
			if (!fury) return false;
			const stratagemSettings = event.stratagemSettings;
			if (!stratagemSettings || !stratagemSettings.roundOneUseFury && game.roundNumber < 2) return false;
			const cards = player.getCards("hs");
			if (!cards.length) return false;
			const cost = lib.stratagemBuff.cost, names = Array.from(cost.keys());
			if (!names.length) return false;
			return cards.some(card => game.checkMod(card, player, "unchanged", "cardEnabled2", player) && names.some(availableName => availableName == get.name(card, player) && event.filterCard(new lib.element.VCard({
				name: availableName,
				nature: get.nature(card, player),
				isCard: true,
				cards: [card]
			}), player, event) && fury >= cost.get(availableName)));
		},
		onChooseToUse: event => {
			const player = _status.event.player, fury = player.storage.stratagem_fury;
			if (!fury) return;
			if (!event.stratagemSettings && !game.online) event.set("stratagemSettings", {
				roundOneUseFury: _status.connectMode ? lib.configOL.round_one_use_fury : get.config("round_one_use_fury")
			});
			const cost = lib.stratagemBuff.cost.get("shan");
			if (typeof cost != "number" || !event.shanRequired) return;
			event.addNumber("shanIgnored", Math.min(player.countCards(lib.skill._stratagem_add_buff.position, {
				name: "shan"
			}), Math.floor(fury / cost)));
		},
		check: card => {
			const player = _status.event.player;
			if (_status.event.type == "phase") {
				const cardName = get.name(card, player);
				if (cardName == "sha") {
					if (game.hasPlayer(current => {
						if (!player.canUse(card, current)) return false;
						const storage = player.storage, zhibi = storage.zhibi;
						return (zhibi && !zhibi.includes(current) || (get.effect(current, card, player, player) >= 2 - Math.max(0, (storage.stratagem_fury || 0) - 1))) && current.mayHaveShan() && player.hasSkill("jiu");
					})) return 1;
					return 0;
				}
				if (cardName == "tao") {
					if (player.hp <= 2 && player.getDamagedHp() >= 2) return 1;
					return 0;
				}
				return 1;
			}
			if (_status.event.type == "dying") return get.attitude(player, _status.event.dying) > 3 ? 1 : 0;
			return (_status.event.getParent().shanRequired || 1) > 1 && get.damageEffect(player, _status.event.getParent().player || player, player) < 0 ? 1 : 0;
		},
		position: "hs",
		filterCard: (card, player, event) => {
			if (!event) event = _status.event;
			const filterCard = event._backup.filterCard;
			const cost = lib.stratagemBuff.cost;
			return Array.from(cost.keys()).some(availableName => availableName == get.name(card, player) && filterCard(new lib.element.VCard({
				name: availableName,
				nature: get.nature(card, player),
				isCard: true,
				cards: [card]
			}), player, _status.event) && player.storage.stratagem_fury >= cost.get(availableName));
		},
		viewAs: (cards, player) => {
			const cardName = get.name(cards[0], player);
			return cardName ? new lib.element.VCard({
				name: cardName,
				nature: get.nature(cards[0], player),
				suit: get.suit(cards[0], player),
				number: get.number(cards[0], player),
				isCard: true,
				cards: [cards[0]],
				storage: {
					stratagem_buffed: 1
				}
			}) : new lib.element.VCard();
		},
		prompt: () => {
			const span = document.createElement("span");
			span.classList.add("text");
			span.style.fontFamily = "yuanli";
			const stratagemBuff = lib.stratagemBuff, cost = stratagemBuff.cost;
			stratagemBuff.prompt.forEach((prompt, cardName) => {
				const li = document.createElement("li");
				li.innerHTML = `【${get.translation(cardName)}】：${cost.get(cardName)}点怒气。${prompt()}`;
				span.appendChild(li);
			});
			return `当你需要使用位于“强化表”内的非虚拟卡牌时，你可以消耗对应数量的怒气将其强化并使用。${document.createElement("hr").outerHTML}${span.outerHTML}`;
		},
		onuse: (result, player) => {
			player.logSkill(result.skill);
			const stratagemBuff = lib.stratagemBuff, cardName = result.card.name;
			player.changeFury(-stratagemBuff.cost.get(cardName), true);
			const gameEvent = get.event(), effect = stratagemBuff.effect.get(cardName);
			if (typeof effect == "function") gameEvent.pushHandler("onNextUseCard", effect);
			gameEvent.pushHandler("onNextUseCard", (event, option) => {
				if (event.step == 0 && option.state == "end") game.broadcastAll(cards => cards.forEach(card => card.clone.classList.add("stratagem-fury-glow")), event.cards);
			});
		},
		ai: {
			order: (item, player) => {
				if (!player) player = _status.event.player;
				if (_status.event.type == "phase") for (const card of player.getCards("hs")) {
					if (!game.checkMod(card, player, "unchanged", "cardEnabled2", player)) continue;
					const cardName = get.name(card, player);
					if (cardName == "sha") {
						if (game.hasPlayer(current => {
							if (!player.canUse(card, current)) return false;
							const storage = player.storage, zhibi = storage.zhibi;
							return (zhibi && !zhibi.contains(current) || (get.effect(current, card, player, player) >= 2 - Math.max(0, (storage.stratagem_fury || 0) - 1))) && current.mayHaveShan();
						})) return get.order(card, player) + 0.5;
					}
					else if (cardName == "tao" && player.hp <= 2 && player.getDamagedHp() >= 2) return get.order(card, player) + 0.5;
					return 8;
				}
				return 3.5;
			},
			directHit_ai: true,
			skillTagFilter: (player, tag, arg) => {
				const card = get.autoViewAs(arg.card);
				if (card.name != "sha" || !card.storage.stratagem_buffed) return false;
				const target = arg.target;
				if (target.countCards("h", "shan") >= 1 && !target.storage.stratagem_fury) return false;
			}
		}
	},
	expandedSlots: {
		markimage: "image/card/expandedSlots.png",
		intro: {
			markcount: function (storage, player) {
				var all = 0, storage = player.expandedSlots;
				if (!storage) return 0;
				for (var key in storage) {
					var num = storage[key];
					if (typeof num == "number" && num > 0) {
						all += num;
					}
				}
				return all;
			},
			content: function (storage, player) {
				storage = player.expandedSlots;
				if (!storage) return "当前没有扩展装备栏";
				const keys = Object.keys(storage).sort(), combined = get.is.mountCombined();
				let str = "";
				for (const key of keys) {
					const num = storage[key];
					if (typeof num == "number" && num > 0) {
						let trans = get.translation(key);
						if (combined && key == "equip3") trans = "坐骑";
						str += "<li>" + trans + "栏：" + num + "个<br>"
					}
				}
				if (str.length) return str.slice(0, str.length - 4);
				return "当前没有扩展装备栏";
			},
		},
	},
	charge: {
		markimage: "image/card/charge.png",
		intro: {
			content: "当前蓄力点数：#",
		},
	},
	cooperation: {
		charlotte: true,
		trigger: {
			global: ["phaseAfter", "dieAfter"],
		},
		forced: true,
		lastDo: true,
		filter: function (event, player) {
			if (event.name == "die" && event.player.isAlive()) return false;
			var storage = player.getStorage("cooperation");
			for (var info of storage) {
				if (info.target == event.player) return true;
			}
			return false;
		},
		content: function () {
			for (var i = 0; i < player.storage.cooperation.length; i++) {
				var info = player.storage.cooperation[i];
				if (info.target == trigger.player) {
					player.removeCooperation(info);
					i--;
				}
			}
		},
		onremove: function (player, skill) {
			var storage = player.getStorage(skill);
			var reasons = [];
			for (var i of storage) reasons.add(i.type);
			for (var i of reasons) player.removeSkill(skill + "_" + i);
			delete player.storage[i];
		},
		subSkill: {
			damage: {
				mark: true,
				trigger: { global: "damage" },
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					if (!event.source) return false;
					var storage = player.getStorage("cooperation");
					for (var info of storage) {
						if (info.type == "damage" && (event.source == player || event.source == info.target)) return true;
					}
					return false;
				},
				checkx: (info) => (info.damage && info.damage > 3),
				content: function () {
					var source = trigger.source;
					var storage = player.getStorage("cooperation");
					for (var info of storage) {
						if (info.type == "damage" && (source == player || source == info.target)) {
							if (!info.damage) info.damage = 0;
							info.damage += trigger.num;
						}
					}
					player.markSkill("cooperation_damage");
				},
				marktext: "仇",
				intro: {
					name: "协力 - 同仇",
					markcount: function (storage, player) {
						return Math.max.apply(Math, player.getStorage("cooperation").map(function (info) {
							return info.damage || 0;
						}));
					},
					content: function (storage, player) {
						var str = "", storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "damage") {
								str += "<br><li>协力角色：" + get.translation(info.target);
								str += "<br><li>协力原因：" + get.translation(info.reason);
								str += "<br><li>协力进度："
								var num = (info.damage || 0);
								str += num;
								str += "/4";
								str += (num > 3 ? " (已完成)" : " (未完成)");
								str += "<br>　　";
							}
						}
						return str.slice(4, str.length - 6);
					},
				},
			},
			draw: {
				mark: true,
				trigger: { global: "gainAfter" },
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					if (event.getParent().name != "draw") return false;
					var storage = player.getStorage("cooperation");
					for (var info of storage) {
						if (info.type == "draw" && (event.player == player || event.player == info.target)) return true;
					}
					return false;
				},
				checkx: (info) => (info.draw && info.draw > 7),
				content: function () {
					var source = trigger.player;
					var storage = player.getStorage("cooperation");
					for (var info of storage) {
						if (info.type == "draw" && (source == player || source == info.target)) {
							if (!info.draw) info.draw = 0;
							info.draw += trigger.cards.length;
						}
					}
					player.markSkill("cooperation_draw");
				},
				marktext: "进",
				intro: {
					name: "协力 - 并进",
					markcount: function (storage, player) {
						return Math.max.apply(Math, player.getStorage("cooperation").map(function (info) {
							return info.draw || 0;
						}));
					},
					content: function (storage, player) {
						var str = "", storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "draw") {
								str += "<br><li>协力角色：" + get.translation(info.target);
								str += "<br><li>协力原因：" + get.translation(info.reason);
								str += "<br><li>协力进度："
								var num = (info.draw || 0);
								str += num;
								str += "/8";
								str += (num > 7 ? " (已完成)" : " (未完成)");
								str += "<br>　　";
							}
						}
						return str.slice(4, str.length - 6);
					},
				},
			},
			discard: {
				mark: true,
				trigger: { global: "loseAfter" },
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					if (event.type != "discard") return false;
					var storage = player.getStorage("cooperation");
					for (var info of storage) {
						if (info.type == "discard" && (event.player == player || event.player == info.target)) return true;
					}
					return false;
				},
				checkx: (info) => (info.discard && info.discard.length > 3),
				content: function () {
					var source = trigger.player;
					var storage = player.getStorage("cooperation");
					for (var info of storage) {
						if (info.type == "discard" && (source == player || source == info.target)) {
							if (!info.discard) info.discard = [];
							for (var i of trigger.cards2) {
								var suit = get.suit(i, player);
								if (lib.suit.contains(suit)) info.discard.add(suit);
							}
						}
					}
					player.markSkill("cooperation_discard");
				},
				marktext: "财",
				intro: {
					name: "协力 - 疏财",
					markcount: function (storage, player) {
						return Math.max.apply(Math, player.getStorage("cooperation").map(function (info) {
							return info.discard ? info.discard.length : 0;
						}));
					},
					content: function (storage, player) {
						var str = "", storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "discard") {
								str += "<br><li>协力角色：" + get.translation(info.target);
								str += "<br><li>协力原因：" + get.translation(info.reason);
								str += "<br><li>进度：";
								var suits = info.discard || [];
								var suits2 = [["spade", "♠", "♤"], ["heart", "♥", "♡"], ["club", "♣", "♧"], ["diamond", "♦", "♢"]];
								for (var i of suits2) {
									str += (suits.contains(i[0]) ? i[1] : i[2]);
								}
								str += (suits.length > 3 ? " (已完成)" : " (未完成)");
								str += "<br>　　";
							}
						}
						return str.slice(4, str.length - 6);
					},
				},
			},
			use: {
				mark: true,
				trigger: { global: "useCard1" },
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					var suit = get.suit(event.card);
					if (!lib.suit.contains(suit)) return false;
					var storage = player.getStorage("cooperation");
					for (var info of storage) {
						if (info.type == "use"
							&& (event.player == player || event.player == info.target) &&
							(!info.used || !info.used.contains(suit))) return true;
					}
					return false;
				},
				checkx: (info) => (info.used && info.used.length > 3),
				content: function () {
					var source = trigger.player, suit = get.suit(trigger.card);
					var storage = player.getStorage("cooperation");
					for (var info of storage) {
						if (info.type == "use" && (source == player || source == info.target)) {
							if (!info.used) info.used = [];
							info.used.add(suit);
						}
					}
					player.markSkill("cooperation_use");
				},
				marktext: "戮",
				intro: {
					name: "协力 - 戮力",
					markcount: function (storage, player) {
						return Math.max.apply(Math, player.getStorage("cooperation").map(function (info) {
							return info.used ? info.used.length : 0;
						}));
					},
					content: function (storage, player) {
						var str = "", storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "use") {
								str += "<br><li>协力角色：" + get.translation(info.target);
								str += "<br><li>协力原因：" + get.translation(info.reason);
								str += "<br><li>进度：";
								var suits = info.used || [];
								var suits2 = [["spade", "♠", "♤"], ["heart", "♥", "♡"], ["club", "♣", "♧"], ["diamond", "♦", "♢"]];
								for (var i of suits2) {
									str += (suits.contains(i[0]) ? i[1] : i[2]);
								}
								str += (suits.length > 3 ? " (已完成)" : " (未完成)");
								str += "<br>　　";
							}
						}
						return str.slice(4, str.length - 6);
					},
				},
			},
		},
	},
	zhengsu: {
		trigger: { player: "phaseDiscardEnd" },
		forced: true,
		charlotte: true,
		filter: function (event, player) {
			return (player.storage.zhengsu_leijin || player.storage.zhengsu_bianzhen || player.storage.zhengsu_mingzhi);
		},
		content: function () {
			player.chooseDrawRecover(2, "整肃奖励：摸两张牌或回复1点体力");
		},
		subSkill: {
			leijin: {
				mod: {
					aiOrder: function (player, card, num) {
						if (typeof card.number != "number") return;
						var history = player.getHistory("useCard", evt => evt.isPhaseUsing());
						if (history.length == 0) return num + 10 * (14 - card.number);
						var num = get.number(history[0].card);
						if (!num) return;
						for (var i = 1; i < history.length; i++) {
							var num2 = get.number(history[i].card);
							if (!num2 || num2 <= num) return;
							num = num2;
						}
						if (card.number > num) return num + 10 * (14 - card.number);
					},
				},
				mark: true,
				trigger: { player: "useCard1" },
				lastDo: true,
				charlotte: true,
				forced: true,
				popup: false,
				onremove: true,
				filter: function (event, player) {
					return player.isPhaseUsing() && player.storage.zhengsu_leijin !== false;
				},
				content: function () {
					var list = player.getHistory("useCard", function (evt) {
						return evt.isPhaseUsing(player);
					});
					var goon = true;
					for (var i = 0; i < list.length; i++) {
						var num = get.number(list[i].card);
						if (typeof num != "number") {
							goon = false;
							break;
						}
						if (i > 0) {
							var num2 = get.number(list[i - 1].card);
							if (typeof num2 != "number" || num2 >= num) {
								goon = false;
								break;
							}
						}
					}
					if (!goon) {
						game.broadcastAll(function (player) {
							player.storage.zhengsu_leijin = false;
							if (player.marks.zhengsu_leijin) player.marks.zhengsu_leijin.firstChild.innerHTML = "╳";
							delete player.storage.zhengsu_leijin_markcount;
						}, player);
					}
					else {
						if (list.length > 2) {
							game.broadcastAll(function (player, num) {
								if (player.marks.zhengsu_leijin) player.marks.zhengsu_leijin.firstChild.innerHTML = "○";
								player.storage.zhengsu_leijin = true;
								player.storage.zhengsu_leijin_markcount = num;
							}, player, num);
						}
						else game.broadcastAll(function (player, num) {
							player.storage.zhengsu_leijin_markcount = num;
						}, player, num);
					}
					player.markSkill("zhengsu_leijin");
				},
				intro: {
					content: "<li>条件：回合内所有于出牌阶段使用的牌点数递增且不少于三张。",
				},
			},
			bianzhen: {
				mark: true,
				trigger: { player: "useCard1" },
				firstDo: true,
				charlotte: true,
				forced: true,
				popup: false,
				onremove: true,
				filter: function (event, player) {
					return player.isPhaseUsing() && player.storage.zhengsu_bianzhen !== false;
				},
				content: function () {
					var list = player.getHistory("useCard", function (evt) {
						return evt.isPhaseUsing();
					});
					var goon = true, suit = get.suit(list[0].card, false);
					if (suit == "none") {
						goon = false;
					}
					else {
						for (var i = 1; i < list.length; i++) {
							if (get.suit(list[i]) != suit) {
								goon = false;
								break;
							}
						}
					}
					if (!goon) {
						game.broadcastAll(function (player) {
							player.storage.zhengsu_bianzhen = false;
							if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = "╳";
						}, player);
					}
					else {
						if (list.length > 1) {
							game.broadcastAll(function (player) {
								if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = "○";
								player.storage.zhengsu_bianzhen = true;
							}, player);
						}
						else game.broadcastAll(function (player, suit) {
							if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = get.translation(suit);
						}, player, suit);
					}
					player.markSkill("zhengsu_bianzhen");
				},
				intro: {
					content: "<li>条件：回合内所有于出牌阶段使用的牌花色相同且不少于两张。",
				},
				ai: {
					effect: {
						player_use: function (card, player, target) {
							if (typeof card != "object" || !player.isPhaseUsing()) return;
							var suitx = get.suit(card);
							var history = player.getHistory("useCard");
							if (!history.length) {
								var val = 0;
								if (player.hasCard(function (cardx) {
									return get.suit(cardx) == suitx && card != cardx && (!card.cards || !card.cards.contains(cardx)) && player.hasValueTarget(cardx);
								}, "hs")) val = [2, 0.1];
								if (val) return val;
								return;
							}
							var num = 0;
							var suit = false;
							for (var i = 0; i < history.length; i++) {
								var suit2 = get.suit(history[i].card);
								if (!lib.suit.contains(suit2)) return;
								if (suit && suit != suit2) return;
								suit = suit2;
								num++;
							}
							if (suitx == suit && num == 1) return [1, 0.1];
							if (suitx != suit && (num > 1 || num <= 1 && player.hasCard(function (cardx) {
								return get.suit(cardx) == suit && player.hasValueTarget(cardx);
							}, "hs"))) return "zeroplayertarget";
						},
					},
				},
			},
			mingzhi: {
				mark: true,
				trigger: { player: "loseAfter" },
				firstDo: true,
				charlotte: true,
				forced: true,
				popup: false,
				onremove: true,
				filter: function (event, player) {
					if (player.storage.zhengsu_mingzhi === false || event.type != "discard") return false;
					var evt = event.getParent("phaseDiscard");
					return evt && evt.player == player;
				},
				content: function () {
					var goon = true, list = [];
					player.getHistory("lose", function (event) {
						if (!goon || event.type != "discard") return false;
						var evt = event.getParent("phaseDiscard");
						if (evt && evt.player == player) {
							for (var i of event.cards2) {
								var suit = get.suit(i, player);
								if (list.contains(suit)) {
									goon = false;
									break;
								}
								else list.push(suit);
							}
						}
					});
					if (!goon) {
						game.broadcastAll(function (player) {
							player.storage.zhengsu_mingzhi = false;
							if (player.marks.zhengsu_mingzhi) player.marks.zhengsu_mingzhi.firstChild.innerHTML = "╳";
							delete player.storage.zhengsu_mingzhi_list;
						}, player);
					}
					else {
						if (list.length > 1) {
							game.broadcastAll(function (player, list) {
								if (player.marks.zhengsu_mingzhi) player.marks.zhengsu_mingzhi.firstChild.innerHTML = "○";
								player.storage.zhengsu_mingzhi = true;
								player.storage.zhengsu_mingzhi_list = list;
								player.storage.zhengsu_mingzhi_markcount = list.length;
							}, player, list);
						}
						else game.broadcastAll(function (player, list) {
							player.storage.zhengsu_mingzhi_list = list;
							player.storage.zhengsu_mingzhi_markcount = list.length;
						}, player, list);
					}
					player.markSkill("zhengsu_mingzhi");
				},
				intro: {
					content: "<li>条件：回合内所有于弃牌阶段弃置的牌花色均不相同且不少于两张。",
				},
			},
		},
	},
	renku: {
		intro: {
			markcount: function () {
				return _status.renku.length;
			},
			mark: function (dialog, content, player) {
				if (!_status.renku.length) return "仁库中没有牌";
				else dialog.addAuto(_status.renku);
			},
			content: function () {
				if (!_status.renku.length) return "仁库中没有牌";
				return get.translation(_status.renku);
			},
		},
	},
	_showHiddenCharacter: {
		trigger: { player: ["changeHp", "phaseBeginStart", "loseMaxHpBegin", "gainMaxHpBegin"] },
		firstDo: true,
		forced: true,
		popup: false,
		priority: 25,
		filter: function (event, player, name) {
			return player.isUnseen(2) && get.mode() != "guozhan";
		},
		content: function () {
			player.showCharacter(2);
			player.removeSkill("g_hidden_ai");
		},
	},
	_kamisha: {
		trigger: { source: "damageBegin2" },
		//forced:true,
		popup: false,
		prompt: function (event, player) {
			return "是否防止即将对" + get.translation(event.player) + "造成的伤害，改为令其减少" + get.cnNumber(event.num) + "点体力上限？";
		},
		filter: function (event, player) {
			return event.hasNature("kami") && event.num > 0;
		},
		ruleSkill: true,
		check: function (event, player) {
			var att = get.attitude(player, event.player);
			if (event.player.hp == event.player.maxHp) return att < 0;
			if (event.player.hp == event.player.maxHp - 1 &&
				(event.player.maxHp <= 3 || event.player.hasSkillTag("maixie"))) return att < 0;
			return att > 0;
		},
		content: function () {
			trigger.cancel();
			trigger.player.loseMaxHp(trigger.num).source = player;
		},
	},
	aozhan: {
		charlotte: true,
		mod: {
			targetEnabled: function (card) {
				if (card.name == "tao" && (card.isCard && card.cardid || get.itemtype(card) == "card")) return false;
			},
			cardSavable: function (card) {
				if (card.name == "tao" && (card.isCard && card.cardid || get.itemtype(card) == "card")) return false;
			},
		},
		group: ["aozhan_sha", "aozhan_shan"],
		subSkill: {
			sha: {
				enable: ["chooseToUse", "chooseToRespond"],
				filterCard: {
					name: "tao",
				},
				viewAs: {
					name: "sha",
					isCard: true,
				},
				viewAsFilter: function (player) {
					if (!player.countCards("hs", "tao")) return false;
				},
				position: "hs",
				prompt: "将一张桃当杀使用或打出",
				check: function () { return 1 },
				ai: {
					respondSha: true,
					skillTagFilter: function (player) {
						if (!player.countCards("hs", "tao")) return false;
					},
					order: function () {
						return get.order({ name: "sha" }) - 0.1;
					},
				},
				sub: true,
			},
			shan: {
				enable: ["chooseToRespond", "chooseToUse"],
				filterCard: {
					name: "tao",
				},
				viewAs: {
					name: "shan",
					isCard: true,
				},
				prompt: "将一张桃当闪打出",
				check: function () { return 1 },
				viewAsFilter: function (player) {
					if (!player.countCards("hs", "tao")) return false;
				},
				position: "hs",
				ai: {
					respondShan: true,
					skillTagFilter: function (player) {
						if (!player.countCards("hs", "tao")) return false;
					},
				},
				sub: true,
			},
		},
	},
	global: [],
	globalmap: {},
	storage: {},
	undist: {},
	others: {},
	zhu: {},
	zhuSkill: {},
	land_used: {},
	unequip: { ai: { unequip: true } },
	subplayer: {
		trigger: { player: "dieBefore" },
		forced: true,
		priority: -9,
		onremove: true,
		mark: "character",
		intro: {
			content: function (storage, player) {
				if (typeof storage.intro2 == "string") return storage.intro2;
				if (typeof storage.intro2 == "function") return storage.intro2(storage, player);
				return "死亡前切换回主武将"
			},
			name: function (storage) {
				return get.rawName(storage.name);
			}
		},
		content: function () {
			trigger.cancel();
			var evt = trigger.getParent("damage");
			if (evt.player == player) {
				evt.untrigger(false, player);
			}
			player.exitSubPlayer(true);
		},
		ai: {
			nosave: true
		}
	},
	autoswap: {
		firstDo: true,
		trigger: {
			player: ["playercontrol", "chooseToUseBegin", "chooseToRespondBegin", "chooseToDiscardBegin", "chooseToCompareBegin",
				"chooseButtonBegin", "chooseCardBegin", "chooseTargetBegin", "chooseCardTargetBegin", "chooseControlBegin",
				"chooseBoolBegin", "choosePlayerCardBegin", "discardPlayerCardBegin", "gainPlayerCardBegin", "chooseToMoveBegin", "chooseToPlayBeatmapBegin"]
		},
		forced: true,
		priority: 100,
		forceDie: true,
		popup: false,
		filter: function (event, player) {
			if (event.autochoose && event.autochoose()) return false;
			if (lib.filter.wuxieSwap(event)) return false;
			if (_status.auto || !player.isUnderControl()) return false;
			return true;
		},
		content: function () {
			game.swapPlayerAuto(player);
		},
	},
	dualside: {
		charlotte: true,
		subSkill: {
			turn: {
				trigger: { player: ["turnOverAfter", "dieBefore"] },
				silent: true,
				filter: function (event, player) {
					if (player.storage.dualside_over) return false;
					return Array.isArray(player.storage.dualside);
				},
				content: function () {
					var cfg = player.storage.dualside;
					var bool = player.isTurnedOver();
					if (trigger.name == "die") {
						bool = !bool;
					}
					if (bool) {
						cfg[1] = player.hp;
						cfg[2] = player.maxHp;
						player.reinit(cfg[0], cfg[3], [cfg[4], cfg[5]]);
						player.unmarkSkill("dualside");
						player.markSkillCharacter("dualside", { name: cfg[0] }, "正面", "当前体力：" + cfg[1] + "/" + cfg[2]);
					}
					else {
						cfg[4] = player.hp;
						cfg[5] = player.maxHp;
						player.reinit(cfg[3], cfg[0], [cfg[1], cfg[2]]);
						player.unmarkSkill("dualside");
						player.markSkillCharacter("dualside", { name: cfg[3] }, "背面", "当前体力：" + cfg[4] + "/" + cfg[5]);
					}

					if (trigger.name == "die") {
						trigger.cancel();
						delete player.storage.dualside;
						player.storage.dualside_over = true;
						player.unmarkSkill("dualside");
					}
				}
			},
			init: {
				trigger: { global: "gameStart", player: "enterGame" },
				silent: true,
				content: function () {
					var list = [player.name, player.name1, player.name2];
					for (var i = 0; i < list.length; i++) {
						if (list[i] && lib.character[list[i]]) {
							var info = lib.character[list[i]];
							if (info[3].contains("dualside") && info[4]) {
								player.storage.dualside = [list[i], player.hp, player.maxHp];
								for (var j = 0; j < info[4].length; j++) {
									if (info[4][j].startsWith("dualside:")) {
										var name2 = info[4][j].slice(9);
										var info2 = lib.character[name2];
										player.storage.dualside.push(name2);
										player.storage.dualside.push(get.infoHp(info2[2]));
										player.storage.dualside.push(get.infoMaxHp(info2[2]));
									}
								}
							}
						}
					}
					var cfg = player.storage.dualside;
					if (get.mode() == "guozhan") {
						if (player.name1 == cfg[0]) {
							player.showCharacter(0);
						}
						else {
							player.showCharacter(1);
						}
					}
					player.markSkillCharacter("dualside", { name: cfg[3] }, "背面", "当前体力：" + cfg[4] + "/" + cfg[5]);
				}
			}
		},
		group: ["dualside_init", "dualside_turn"]
	},
	fengyin: {
		init: function (player, skill) {
			player.addSkillBlocker(skill);
		},
		onremove: function (player, skill) {
			player.removeSkillBlocker(skill);
		},
		charlotte: true,
		skillBlocker: function (skill, player) {
			return !lib.skill[skill].charlotte && !get.is.locked(skill, player);
		},
		mark: true,
		intro: {
			content: function (storage, player, skill) {
				var list = player.getSkills(null, false, false).filter(function (i) {
					return lib.skill.fengyin.skillBlocker(i, player);
				});
				if (list.length) return "失效技能：" + get.translation(list);
				return "无失效技能";
			}
		}
	},
	baiban: {
		init: function (player, skill) {
			player.addSkillBlocker(skill);
		},
		onremove: function (player, skill) {
			player.removeSkillBlocker(skill);
		},
		charlotte: true,
		skillBlocker: function (skill, player) {
			return !lib.skill[skill].charlotte;
		},
		mark: true,
		intro: {
			content: function (storage, player, skill) {
				var list = player.getSkills(null, false, false).filter(function (i) {
					return lib.skill.baiban.skillBlocker(i, player);
				});
				if (list.length) return "失效技能：" + get.translation(list);
				return "无失效技能";
			}
		}
	},
	qianxing: {
		mark: true,
		nopop: true,
		init: function (player) {
			game.log(player, "获得了", "【潜行】");
		},
		intro: {
			content: "锁定技，你不能成为其他角色的卡牌的目标"
		},
		mod: {
			targetEnabled: function (card, player, target) {
				if (player != target) return false;
			}
		}
	},
	mianyi: {
		trigger: { player: "damageBefore" },
		mark: true,
		forced: true,
		init: function (player) {
			game.log(player, "获得了", "【免疫】");
		},
		content: function () {
			trigger.cancel();
		},
		ai: {
			nofire: true,
			nothunder: true,
			nodamage: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "damage")) return [0, 0];
				}
			},
		},
		intro: {
			content: "防止一切伤害"
		}
	},
	mad: {
		mark: true,
		locked: true,
		intro: {
			content: "已进入混乱状态",
			name: "混乱",
			onunmark: function (storage, player) {
				game.log(player, "解除混乱状态");
			}
		}
	},
	ghujia: {
		intro: {
			content: function (content, player) {
				return "已有" + get.cnNumber(player.hujia) + "点护甲值";
			}
		},
		markimage: "image/card/shield.png",
	},
	counttrigger: {
		trigger: { global: "phaseAfter" },
		silent: true,
		charlotte: true,
		priority: -100,
		lastDo: true,
		content: function () {
			player.removeSkill("counttrigger");
			delete player.storage.counttrigger;
		},
		group: "counttrigger_2",
		subSkill: {
			2: {
				trigger: { global: ["phaseBeforeStart", "roundStart"] },
				silent: true,
				charlotte: true,
				firstDo: true,
				priority: 100,
				content: function () {
					player.removeSkill("counttrigger");
					delete player.storage.counttrigger;
				},
			}
		}
	},
	_recovercheck: {
		trigger: { player: "recoverBefore" },
		forced: true,
		priority: 100,
		firstDo: true,
		popup: false,
		filter: function (event, player) {
			return player.hp >= player.maxHp;
		},
		content: function () {
			trigger.cancel();
		},
	},
	_usecard: {
		trigger: { global: "useCardAfter" },
		forced: true,
		popup: false,
		priority: -100,
		lastDo: true,
		filter: function (event) {
			return !event._cleared && event.card.name != "wuxie";
		},
		content: function () {
			game.broadcastAll(function () {
				ui.clear();
			});
			event._cleared = true;
		}
	},
	_discard: {
		trigger: { global: ["discardAfter", "loseToDiscardpileAfter", "loseAsyncAfter"] },
		forced: true,
		popup: false,
		priority: -100,
		lastDo: true,
		filter: function (event) {
			return ui.todiscard[event.discardid] ? true : false;
		},
		content: function () {
			game.broadcastAll(function (id) {
				var todiscard = ui.todiscard[id];
				delete ui.todiscard[id];
				if (todiscard) {
					var time = 1000;
					if (typeof todiscard._discardtime == "number") {
						time += todiscard._discardtime - get.time();
					}
					if (time < 0) {
						time = 0;
					}
					setTimeout(function () {
						for (var i = 0; i < todiscard.length; i++) {
							todiscard[i].delete();
						}
					}, time);
				}
			}, trigger.discardid);
		}
	},
	_save: {
		priority: 5,
		forced: true,
		popup: false,
		filter: function (event, player) {
			return false;
		},
		content: function () {
			"step 0"
			event.dying = trigger.player;
			if (!event.acted) event.acted = [];
			"step 1"
			if (trigger.player.isDead()) {
				event.finish();
				return;
			}
			event.acted.push(player);
			var str = get.translation(trigger.player) + "濒死，是否帮助？";
			var str2 = "当前体力：" + trigger.player.hp;
			if (lib.config.tao_enemy && event.dying.side != player.side && lib.config.mode != "identity" && lib.config.mode != "guozhan" && !event.dying.hasSkillTag("revertsave")) {
				event._result = { bool: false }
			}
			else if (player.canSave(event.dying)) {
				player.chooseToUse({
					filterCard: function (card, player, event) {
						event = event || _status.event;
						return lib.filter.cardSavable(card, player, event.dying);
					},
					filterTarget: function (card, player, target) {
						if (target != _status.event.dying) return false;
						if (!card) return false;
						var info = get.info(card);
						if (!info.singleCard || ui.selected.targets.length == 0) {
							var mod = game.checkMod(card, player, target, "unchanged", "playerEnabled", player);
							if (mod == false) return false;
							var mod = game.checkMod(card, player, target, "unchanged", "targetEnabled", target);
							if (mod != "unchanged") return mod;
						}
						return true;
					},
					prompt: str,
					prompt2: str2,
					ai1: function (card) {
						if (typeof card == "string") {
							var info = get.info(card);
							if (info.ai && info.ai.order) {
								if (typeof info.ai.order == "number") {
									return info.ai.order;
								}
								else if (typeof info.ai.order == "function") {
									return info.ai.order();
								}
							}
						}
						return 1;
					},
					ai2: get.effect_use,
					type: "dying",
					targetRequired: true,
					dying: event.dying
				});
			}
			else {
				event._result = { bool: false }
			}
			"step 2"
			if (result.bool) {
				var player = trigger.player;
				if (player.hp <= 0 && !trigger.nodying && !player.nodying && player.isAlive() && !player.isOut() && !player.removed) event.goto(0);
				else trigger.untrigger();
			}
			else {
				for (var i = 0; i < 20; i++) {
					if (event.acted.contains(event.player.next)) {
						break;
					}
					else {
						event.player = event.player.next;
						if (!event.player.isOut()) {
							event.goto(1);
							break;
						}
					}
				}
			}
		}
	},
	_ismin: {
		mod: {
			cardEnabled: function (card, player) {
				if (player.isMin()) {
					if (get.type(card) == "equip") return false;
				}
			}
		}
	},
	_recasting: {
		enable: "phaseUse",
		logv: false,
		prompt: "将要重铸的牌置入弃牌堆并摸一张牌",
		filter: (event, player) => player.hasCard(card => lib.skill._recasting.filterCard(card, player), lib.skill._recasting.position),
		position: "he",
		filterCard: (card, player) => player.canRecast(card, null, true),
		discard: false,
		lose: false,
		delay: false,
		content: () => {
			player.recast(cards, null, (player, cards) => {
				var numberOfCardsToDraw = cards.length;
				cards.forEach(value => {
					if (lib.config.mode == "stone" && _status.mode == "deck" && !player.isMin() && get.type(value).startsWith("stone")) {
						var stonecard = get.stonecard(1, player.career);
						if (stonecard.length) {
							numberOfCardsToDraw -= stonecard.length;
							player.gain(game.createCard(stonecard.randomGet()), "draw");
						}
						else player.draw({
							drawDeck: 1
						}).log = false;
					}
					else if (get.subtype(value) == "spell_gold") {
						var libCard = get.libCard(info => info.subtype == "spell_silver");
						if (!libCard.length) return;
						numberOfCardsToDraw--;
						player.gain(game.createCard(libCard.randomGet()), "draw");
					}
					else if (get.subtype(value) == "spell_silver") {
						var libCard = get.libCard(info => info.subtype == "spell_bronze");
						if (!libCard.length) return;
						numberOfCardsToDraw--;
						player.gain(game.createCard(libCard.randomGet()), "draw");
					}
				});
				if (numberOfCardsToDraw) player.draw(numberOfCardsToDraw).log = false;
			});
		},
		ai: {
			basic: {
				order: 6
			},
			result: {
				player: 1
			}
		}
	},
	_lianhuan: {
		trigger: { player: "damageAfter" },
		filter: function (event, player) {
			return event.lianhuanable == true;
		},
		forced: true,
		popup: false,
		logv: false,
		forceDie: true,
		//priority:-5,
		content: function () {
			"step 0"
			event.logvid = trigger.getLogv();
			"step 1"
			event.targets = game.filterPlayer(function (current) {
				return current != event.player && current.isLinked();
			});
			lib.tempSortSeat = _status.currentPhase || player;
			event.targets.sort(lib.sort.seat);
			delete lib.tempSortSeat;
			event._args = [trigger.num, trigger.nature, trigger.cards, trigger.card];
			if (trigger.source) event._args.push(trigger.source);
			else event._args.push("nosource");
			"step 2"
			if (event.targets.length) {
				var target = event.targets.shift();
				if (target.isLinked()) target.damage.apply(target, event._args.slice(0));
				event.redo();
			}
		},
	},
	_lianhuan4: {
		trigger: { player: "changeHp" },
		priority: -10,
		forced: true,
		popup: false,
		forceDie: true,
		filter: function (event, player) {
			var evt = event.getParent();
			return evt && evt.name == "damage" && evt.hasNature("linked") && player.isLinked();
		},
		content: function () {
			player.link();
			if (trigger.getParent().notLink()) trigger.getParent().lianhuanable = true;
		}
	},
	/**
	 * @deprecated
	 */
	_chongzhu: {
		get filter() {
			return lib.skill._recasting.filter;
		},
		set filter(filter) {
			lib.skill._recasting.filter = filter;
		},
		get filterCard() {
			return lib.skill._recasting.filterCard;
		},
		set filterCard(filterCard) {
			lib.skill._recasting.filterCard = filterCard;
		},
		get content() {
			return lib.skill._recasting.content;
		},
		set content(content) {
			lib.skill._recasting.content = content;
		},
		get ai() {
			return lib.skill._recasting.ai;
		},
		set ai(ai) {
			lib.skill._recasting.ai = ai;
		}
	}
};
