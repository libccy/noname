import { lib, game, ui, get, ai, _status } from "../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	xinyingshi: {
		audio: "xinfu_yingshi",
		trigger: { player: "phaseUseBegin" },
		direct: true,
		filter: function (event, player) {
			return (
				player.countCards("he") > 0 &&
				!game.hasPlayer(function (current) {
					return current.getExpansions("xinyingshi_cards").length > 0;
				})
			);
		},
		content: function () {
			"step 0";
			player.chooseCardTarget({
				filterCard: true,
				filterTarget: lib.filter.notMe,
				selectCard: [1, player.countCards("he")],
				position: "he",
				prompt: get.prompt("xinyingshi"),
				prompt2: "将任意张牌置于一名其他角色的武将牌上作为“酬”",
				ai1: function (card) {
					return 1 - player.getUseValue(card);
				},
				ai2: function (target) {
					var player = _status.event.player;
					return (
						(1 +
							game.countPlayer(function (current) {
								return get.attitude(player, current) > 0 && current.inRange(target) && get.damageEffect(target, current, player) > 0;
							})) *
						-get.attitude(player, target)
					);
				},
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0],
					cards = result.cards;
				player.logSkill("xinyingshi", target);
				target.addSkill("xinyingshi_cards");
				target.addToExpansion(player, "give", cards).gaintag.add("xinyingshi_cards");
				target.storage.xinyingshi_source = player;
			}
		},
		subSkill: {
			cards: {
				trigger: { player: "damageSource" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return event.source && event.source.isIn() && event.card && event.getParent().type == "card" && player.getExpansions("xinyingshi_cards").length;
				},
				logTarget: "source",
				content: function () {
					"step 0";
					event.target = trigger.source;
					event.target.chooseButton(["应势：请选择你的赏金", player.getExpansions("xinyingshi_cards")]);
					"step 1";
					if (result.bool) {
						var cards = [result.links[0]];
						for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
							var card = ui.cardPile.childNodes[i];
							if (card.number == cards[0].number && card.suit == cards[0].suit) cards.push(card);
						}
						player.$give(cards[0], target);
						if (cards.length > 1) {
							setTimeout(
								function () {
									target.$gain2(cards.slice(1));
								},
								get.delayx(200, 200)
							);
							game.log(target, "从牌堆获得了", cards.slice(1));
						}
						game.delay(0, get.delayx(500, 500));
						target.gain(cards);
					}
					"step 2";
					if (!player.getExpansions("xinyingshi_cards").length) player.removeSkill("xinyingshi_cards");
				},
				marktext: "酬",
				intro: {
					content: "expansion",
					markcount: "expansion",
				},
				ai: { threaten: 3 },
				group: "xinyingshi_regain",
				onremove: function (player, skill) {
					var cards = player.getExpansions(skill);
					if (cards.length) player.loseToDiscardpile(cards);
					delete player.storage.xinyingshi_source;
				},
			},
			regain: {
				trigger: { player: "die" },
				forced: true,
				charlotte: true,
				forceDie: true,
				filter: function (event, player) {
					return player.storage.xinyingshi_source && player.storage.xinyingshi_source.isIn() && player.getExpansions("xinyingshi_cards").length > 0;
				},
				content: function () {
					player.storage.xinyingshi_source.gain(player.getExpansions("xinyingshi_cards"), player, "give", "bySelf");
				},
			},
		},
	},
	xinfu_guolun: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("h") > 0;
		},
		content: function () {
			"step 0";
			player.choosePlayerCard(target, true, "h");
			"step 1";
			event.cardt = result.cards[0];
			target.showCards(event.cardt);
			player.chooseCard("he").set("ai", function (card) {
				var event = _status.event.getParent(),
					player = event.player;
				var numt = get.number(event.cardt);
				var att = get.attitude(player, target);
				var value = get.value(event.cardt);
				var num = get.number(card);
				if (num < numt || att > 2) return value + 6 - get.value(card);
				else if (num == numt) return value - get.value(card);
				return -1;
			});
			"step 2";
			if (!result.bool) event.finish();
			else {
				player.showCards(result.cards);
				event.cardp = result.cards[0];
			}
			"step 3";
			player.swapHandcards(target, [event.cardp], [event.cardt]);
			"step 4";
			var nump = get.number(event.cardp, player);
			var numt = get.number(event.cardt, target);
			if (nump < numt) {
				player.draw();
			} else if (nump > numt) {
				target.draw();
			}
		},
		ai: {
			threaten: 1.5,
			order: 8,
			result: {
				player: function (player, target) {
					if (get.attitude(player, target) > 0) return 1.5;
					return 0.5;
				},
			},
		},
	},
	xinfu_zhanji: {
		audio: 2,
		trigger: {
			player: "gainAfter",
		},
		forced: true,
		filter: function (event, player) {
			if (!player.isPhaseUsing()) return false;
			return event.getParent().name == "draw" && event.getParent(2).name != "xinfu_zhanji";
		},
		content: function () {
			player.draw("nodelay");
		},
	},
	xinfu_songsang: {
		limited: true,
		skillAnimation: true,
		animationColor: "wood",
		audio: 2,
		derivation: "xinfu_zhanji",
		trigger: { global: "dieAfter" },
		logTarget: "player",
		async content(e, t, player) {
			player.awakenSkill("xinfu_songsang");
			if (player.isDamaged()) {
				player.recover();
			} else player.gainMaxHp();
			player.addSkills("xinfu_zhanji");
		},
	},
	xinfu_jixu: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		filterTarget: function (card, player, target) {
			if (player == target) return false;
			if (ui.selected.targets.length) {
				return target.hp == ui.selected.targets[0].hp;
			}
			return true;
		},
		selectTarget: [1, Infinity],
		multitarget: true,
		multiline: true,
		content: function () {
			"step 0";
			targets.sort(lib.sort.seat);
			"step 1";
			if (!event.num) event.num = 0;
			if (!event.caicuolist) event.caicuolist = [];
			targets[event.num].chooseBool("是否押杀？").ai = function (event, player) {
				var evt = _status.event.getParent();
				if (get.attitude(targets[event.num], evt.player) > 0) return evt.player.countCards("h", "sha") ? false : true;
				return Math.random() < 0.5;
			};
			"step 2";
			if (result.bool) {
				targets[event.num].chat("有杀");
				game.log(targets[event.num], "认为", player, "#g有杀");
				if (!player.countCards("h", "sha")) event.caicuolist.add(targets[event.num]);
			} else {
				targets[event.num].chat("没杀");
				game.log(targets[event.num], "认为", player, "#y没有杀");
				if (player.countCards("h", "sha")) event.caicuolist.add(targets[event.num]);
			}
			event.num++;
			game.delay();
			if (event.num < targets.length) event.goto(1);
			"step 3";
			player.popup(player.countCards("h", "sha") ? "有杀" : "没杀");
			game.log(player, player.countCards("h", "sha") ? "有杀" : "没杀");
			if (event.caicuolist.length == 0) {
				var evt = _status.event.getParent("phaseUse");
				if (evt && evt.name == "phaseUse") {
					evt.skipped = true;
					event.finish();
				}
			} else {
				player.draw(event.caicuolist.length);
				if (player.countCards("h", "sha")) {
					player.addTempSkill("jixu_sha");
					player.storage.jixu_sha = event.caicuolist;
					event.finish();
				} else event.num = 0;
			}
			"step 4";
			if (event.num < event.caicuolist.length) {
				var target = event.caicuolist[event.num];
				player.discardPlayerCard(true, "he", target);
				event.num++;
				event.redo();
			}
		},
		ai: {
			order: function () {
				return get.order({ name: "sha" }) + 0.1;
			},
			result: {
				target: function (player, target) {
					var raweffect = function (player, target) {
						if (player.countCards("h", "sha")) {
							return get.effect(target, { name: "sha" }, player, target);
						} else {
							var att = get.attitude(player, target);
							var nh = target.countCards("h");
							if (att > 0) {
								if (target.getEquip("baiyin") && target.isDamaged() && get.recoverEffect(target, player, player) > 0) {
									if (target.hp == 1 && !target.hujia) return 1.6;
									if (target.hp == 2) return 0.01;
									return 0;
								}
							}
							var es = target.getCards("e");
							var noe = es.length == 0 || target.hasSkillTag("noe");
							var noe2 = es.length == 1 && es[0].name == "baiyin" && target.isDamaged();
							var noh = nh == 0 || target.hasSkillTag("noh");
							if (noh && (noe || noe2)) return 0;
							if (att <= 0 && !target.countCards("he")) return 1.5;
							return -1.5;
						}
					};
					var num = game.countPlayer(function (current) {
						return current != player && current.hp == target.hp && raweffect(player, current) * get.attitude(player, current) > 0;
					});
					return raweffect(player, target) * Math.max(0, num - 1);
				},
			},
			expose: 0.4,
		},
	},
	jixu_sha: {
		audio: "xinfu_jixu",
		trigger: {
			player: "useCard",
		},
		onremove: function (player) {
			delete player.storage.jixu_sha;
		},
		filter: function (event, player) {
			if (event.card.name == "sha") {
				return game.hasPlayer(function (current) {
					return current != player && player.storage.jixu_sha.includes(current) && !event.targets.includes(current);
				});
			}
			return false;
		},
		forced: true,
		silent: true,
		popup: false,
		content: function () {
			player.logSkill("xinfu_jixu");
			for (var i = 0; i < player.storage.jixu_sha.length; i++) {
				if (!trigger.targets.includes(player.storage.jixu_sha[i]) && player.canUse("sha", player.storage.jixu_sha[i], false)) {
					player.line(player.storage.jixu_sha[i], trigger.card.nature);
					trigger.targets.push(player.storage.jixu_sha[i]);
				}
			}
		},
	},
	xinfu_sanwen: {
		audio: 2,
		usable: 1,
		trigger: {
			player: "gainAfter",
			global: "loseAsyncAfter",
		},
		filter: function (event, player) {
			var cards = event.getg(player);
			if (!cards || !cards.length) return false;
			var namelist = [];
			var namedlist = [];
			for (var i = 0; i < cards.length; i++) {
				namelist.add(get.name(cards[i]));
			}
			var hs = player.getCards("h");
			for (var j = 0; j < hs.length; j++) {
				if (namelist.includes(get.name(hs[j])) && !cards.includes(hs[j])) return true;
			}
			return false;
		},
		content: function () {
			"step 0";
			var namelist = [];
			var namedlist = [];
			var nameddlist = [];
			var namedddlist = [];
			var cards = trigger.getg(player);
			for (var i = 0; i < cards.length; i++) {
				namelist.add(get.name(cards[i]));
			}
			var hs = player.getCards("h");
			for (var j = 0; j < hs.length; j++) {
				if (namelist.includes(get.name(hs[j])) && !cards.includes(hs[j])) {
					namedlist.push(hs[j]);
					namedddlist.add(get.name(hs[j]));
				}
			}
			for (var k = 0; k < cards.length; k++) {
				if (namedddlist.includes(get.name(cards[k]))) nameddlist.push(cards[k]);
			}
			var showlist = namedlist.concat(nameddlist);
			player.showCards(showlist);
			player.discard(nameddlist);
			player.draw(2 * nameddlist.length);
		},
	},
	xinfu_qiai: {
		skillAnimation: true,
		animationColor: "gray",
		trigger: { player: "dying" },
		limited: true,
		audio: 2,
		content: function () {
			"step 0";
			player.awakenSkill("xinfu_qiai");
			event.targets = game
				.filterPlayer(function (current) {
					return current != player;
				})
				.sortBySeat();
			if (!event.targets.length) event.finish();
			"step 1";
			event.current = event.targets.shift();
			if (!event.current.countCards("he")) event.goto(3);
			else
				event.current.chooseCard("交给" + get.translation(player) + "一张牌", "he", true).set("ai", function (card) {
					var evt = _status.event.getParent();
					if (get.attitude(_status.event.player, evt.player) > 2) {
						if (card.name == "jiu") return 120;
						if (card.name == "tao") return 110;
					}
					return 100 - get.value(card);
				});
			"step 2";
			if (result.bool && result.cards && result.cards.length) {
				event.current.give(result.cards, player);
			}
			"step 3";
			if (event.targets.length > 0) event.goto(1);
		},
	},
	xinfu_denglou: {
		audio: 2,
		trigger: {
			player: "phaseJieshuBegin",
		},
		limited: true,
		filter: function (event, player) {
			return player.countCards("h") == 0;
		},
		skillAnimation: true,
		animationColor: "gray",
		content: function () {
			"step 0";
			player.awakenSkill("xinfu_denglou");
			event.cards = get.cards(4);
			event.gains = [];
			event.discards = [];
			var content = ["牌堆顶的四张牌", event.cards];
			game.log(player, "观看了", "#y牌堆顶的四张牌");
			player.chooseControl("ok").set("dialog", content);
			"step 1";
			if (get.type(event.cards[0]) != "basic") {
				event.gains.push(event.cards[0]);
				event.cards.remove(event.cards[0]);
			} else {
				var bool = game.hasPlayer(function (current) {
					return player.canUse(event.cards[0], current);
				});
				if (bool) {
					player.chooseUseTarget(event.cards[0], true, false);
				} else event.discards.push(event.cards[0]);
				event.cards.remove(event.cards[0]);
			}
			"step 2";
			if (event.cards.length) event.goto(1);
			else {
				if (event.gains.length) player.gain(event.gains, "gain2");
				if (event.discards.length) {
					player.$throw(event.discards);
					game.cardsDiscard(event.discards);
				}
			}
		},
	},
	qinguo_use: { audio: 2 },
	xinfu_qinguo: {
		group: "xinfu_qinguo_recover",
		audio: "qinguo_use",
		subfrequent: ["recover"],
		trigger: {
			player: "useCardEnd",
		},
		filter: function (event, player) {
			return get.type(event.card) == "equip";
		},
		direct: true,
		content: function () {
			player.chooseUseTarget({ name: "sha" }, get.prompt("xinfu_qinguo"), "视为使用一张【杀】", false).logSkill = "xinfu_qinguo";
		},
		subSkill: {
			recover: {
				audio: "qinguo_use",
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				prompt: "是否发动【勤国】回复1点体力？",
				filter: function (event, player) {
					if (player.isHealthy() || player.countCards("e") != player.hp) return false;
					var evt = event.getl(player);
					if (event.name == "equip" && event.player == player) return !evt || evt.cards.length != 1;
					return evt && evt.es.length;
				},
				frequent: true,
				content: function () {
					player.recover();
				},
			},
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (
						get.type(card) == "equip" &&
						!get.cardtag(card, "gifts") &&
						game.hasPlayer(function (current) {
							return target.canUse("sha", current);
						})
					)
						return [1, 1.5];
				},
			},
			noe: true,
			reverseEquip: true,
			skillTagFilter: function (player, tag, arg) {
				if (tag == "noe") return player.countCards("e") == player.hp + 1;
				return game.hasPlayer(function (current) {
					return player.canUse("sha", current);
				});
			},
		},
	},
	xinfu_jijun: {
		ai: {
			reverseEquip: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.type(card) == "equip" && player == target && player == _status.currentPhase && get.subtype(card) == "equip1") return [1, 3];
				},
			},
			combo: "xinfu_fangtong",
		},
		audio: 2,
		trigger: {
			player: "useCardToPlayered",
		},
		frequent: true,
		filter: function (event, player) {
			if (player != _status.currentPhase) return false;
			if (event.getParent().triggeredTargets3.length > 1) return false;
			if (get.type(event.card) == "equip" && get.subtype(event.card) != "equip1") return false;
			if (event.targets.includes(player)) return true;
			return false;
		},
		callback: function () {
			player.addToExpansion(card, "gain2").gaintag.add("xinfu_jijun");
		},
		content: function () {
			player.judge(function (card) {
				return 1;
			}).callback = lib.skill.xinfu_jijun.callback;
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
			mark: function (dialog, content, player) {
				var content = player.getExpansions("xinfu_jijun");
				if (content && content.length) {
					dialog.addAuto(content);
					if (player == game.me || player.isUnderControl()) {
						var list = lib.skill.xinfu_fangtong.getAuto(player);
						if (list.length > 0) {
							dialog.addText("<li>推荐方案：" + get.translation(list[0]) + "+ " + get.translation(list.slice(1)));
						}
					}
				}
			},
		},
		marktext: "方",
	},
	xinfu_fangtong: {
		getAuto: function (player) {
			var hs = player.getCards("he");
			var ss = player.getExpansions("xinfu_jijun");
			var bool = false,
				max = Math.pow(2, ss.length),
				index,
				i;
			for (i = 0; i < hs.length; i++) {
				for (var j = 1; j < max; j++) {
					var num = get.number(hs[i]);
					index = j.toString(2);
					while (index.length < ss.length) {
						index = "0" + index;
					}
					for (var k = 0; k < ss.length; k++) {
						if (index[k] == "1") num += get.number(ss[k]);
					}
					if (num == 36) {
						bool = true;
						break;
					}
				}
				if (bool) break;
			}
			if (!bool) return [];
			var list = [hs[i]];
			for (var k = 0; k < ss.length; k++) {
				if (index[k] == "1") list.push(ss[k]);
			}
			return list;
		},
		audio: 2,
		trigger: {
			player: "phaseJieshuBegin",
		},
		filter: function (event, player) {
			return player.countCards("he") > 0 && player.getExpansions("xinfu_jijun").length > 0;
		},
		direct: true,
		skillAnimation: true,
		animationColor: "metal",
		content: function () {
			"step 0";
			var info = ["是否发动【方统】？"];
			info.push('<div class="text center">' + get.translation(player) + "的“方”</div>");
			info.push(player.getExpansions("xinfu_jijun"));
			if (player.countCards("h")) {
				info.push('<div class="text center">' + get.translation(player) + "的手牌区</div>");
				info.push(player.getCards("h"));
			}
			if (player.countCards("e")) {
				info.push('<div class="text center">' + get.translation(player) + "的装备区</div>");
				info.push(player.getCards("e"));
			}
			var next = player.chooseButton();
			next.set("createDialog", info);
			next.set("selectButton", function () {
				var num = 0;
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					num += get.number(ui.selected.buttons[i]);
				}
				if (num == 36) return ui.selected.buttons.length;
				return ui.selected.buttons.length + 2;
			});
			next.set("filterButton", function (button) {
				var player = _status.event.player,
					cards = player.getExpansions("xinfu_jijun");
				if (ui.selected.buttons.length) {
					if (!cards.includes(button.link)) return false;
				} else if (cards.includes(button.link)) return false;
				var num = 0;
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					num += get.number(ui.selected.buttons[i]);
				}
				return get.number(button.link) + num <= 36;
			});
			next.set("autolist", lib.skill.xinfu_fangtong.getAuto(player));
			next.set("processAI", function () {
				if (_status.event.autolist && _status.event.autolist.length > 0) {
					return {
						bool: true,
						links: _status.event.autolist,
					};
				}
				return { bool: false };
			});
			next.set("complexSelect", true);
			"step 1";
			if (result.bool) {
				player.logSkill("xinfu_fangtong");
				var tothrow = [];
				var cards = result.links.slice(0);
				for (var i = 0; i < cards.length; i++) {
					if (get.position(cards[i]) == "x") {
						tothrow.push(cards[i]);
					} else {
						player.discard(cards[i]).delay = false;
					}
				}
				player.loseToDiscardpile(tothrow);
				player
					.chooseTarget("选择一个目标并对其造成3点雷电伤害", true, function (card, player, target) {
						return target != player;
					})
					.set("ai", function (target) {
						return get.damageEffect(target, _status.event.player, _status.event.player, "thunder");
					});
			} else {
				event.finish();
			}
			"step 2";
			var target = result.targets[0];
			player.line(target, "thunder");
			target.damage(3, "thunder");
		},
		ai: {
			combo: "xinfu_jijun",
		},
	},
	xinfu_weilu: {
		audio: 2,
		trigger: {
			player: "damageEnd",
		},
		filter: function (event, player) {
			return event.source && event.source.isIn() && !player.getStorage("xinfu_weilu_effect").includes(event.source);
		},
		check: function (event, player) {
			return get.effect(event.source, { name: "losehp" }, player, player) >= 0;
		},
		forced: true,
		logTarget: "source",
		content: function () {
			player.addTempSkill("xinfu_weilu_effect", { player: "die" });
			player.markAuto("xinfu_weilu_effect", [trigger.source]);
			game.delayx();
		},
		ai: {
			maixie_defend: true,
			threaten: 0.85,
			effect: {
				target: function (card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) return;
					return 0.9;
				},
			},
		},
		subSkill: {
			effect: {
				audio: "xinfu_weilu",
				trigger: { player: "phaseUseBegin" },
				charlotte: true,
				forced: true,
				logTarget: function (event, player) {
					return player.getStorage("xinfu_weilu_effect").filter(function (current) {
						return current.isIn() && current.hp > 1;
					});
				},
				content: function () {
					"step 0";
					var targets = player.getStorage("xinfu_weilu_effect");
					player.removeSkill("xinfu_weilu_effect");
					event.targets = targets.sortBySeat();
					"step 1";
					var target = targets.shift();
					if (target.isIn() && target.hp > 1) {
						event._delay = true;
						var num = target.hp - 1;
						player.markAuto("xinfu_weilu_recover", [[target, num]]);
						target.loseHp(num);
					}
					if (targets.length > 0) event.redo();
					else if (!event._delay) event.finish();
					"step 2";
					player.addTempSkill("xinfu_weilu_recover", {
						player: ["phaseUseAfter", "phaseAfter"],
					});
					game.delayx();
				},
				onremove: true,
				intro: { content: "已将$列入“威虏”战略打击目标" },
			},
			recover: {
				audio: "xinfu_weilu",
				charlotte: true,
				trigger: { player: "phaseUseEnd" },
				forced: true,
				filter: function (event, player) {
					var targets = player.getStorage("xinfu_weilu_recover");
					for (var i of targets) {
						if (i[0].isIn() && i[0].isDamaged()) return true;
					}
					return false;
				},
				onremove: true,
				logTarget: function (event, player) {
					var logs = [],
						targets = player.getStorage("xinfu_weilu_recover");
					for (var i of targets) {
						if (i[0].isIn() && i[0].isDamaged()) logs.add(i[0]);
					}
					return logs;
				},
				content: function () {
					"step 0";
					event.list = player.getStorage("xinfu_weilu_recover").slice(0);
					event.list.sort(function (a, b) {
						return lib.sort.seat(a[0], b[0]);
					});
					"step 1";
					var group = event.list.shift();
					if (group[0].isIn() && group[0].isDamaged()) {
						group[0].recover(group[1]);
						event._delay = true;
					}
					if (event.list.length > 0) event.redo();
					else if (!event._delay) event.finish();
					"step 2";
					game.delayx();
				},
			},
		},
	},
	xinfu_zengdao: {
		audio: 2,
		limited: true,
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countCards("e") > 0;
		},
		filterTarget: lib.filter.notMe,
		skillAnimation: true,
		animationColor: "thunder",
		position: "e",
		filterCard: true,
		selectCard: [1, Infinity],
		discard: false,
		lose: false,
		content: function () {
			player.awakenSkill("xinfu_zengdao");
			target.addToExpansion(cards, player, "give").gaintag.add("xinfu_zengdao2");
			target.addSkill("xinfu_zengdao2");
		},
		ai: {
			order: function () {
				var player = _status.event.player,
					num = 0;
				if (player.hasCard(card => get.value(card, player) < 0, "e")) return 9;
				for (var i = 1; i < 6; i++) {
					num += player.countEquipableSlot(i);
				}
				if (num <= 2) return 9;
				var targets = player.getStorage("xinfu_weilu_recover"),
					num = 0;
				if (
					player.hp <= 2 ||
					!game.hasPlayer(current => {
						if (player == current || get.attitude(player, current) < 0 || current.hp <= 1) return false;
						for (var arr of targets) {
							if (current == arr[0]) break;
						}
						return current.hp > 2 || current.countCards("hs") > 2;
					})
				)
					return 1;
				return 0;
			},
			result: {
				target: function (player, target) {
					if (target.hasValueTarget({ name: "sha", isCard: true })) return ui.selected.cards.length;
					return 0;
				},
			},
		},
	},
	xinfu_zengdao2: {
		trigger: { source: "damageBegin1" },
		forced: true,
		charlotte: true,
		filter: function (event, player) {
			return player.getExpansions("xinfu_zengdao2").length > 0;
		},
		content: function () {
			"step 0";
			player.chooseCardButton("将一张“刀”置入弃牌堆", player.getExpansions("xinfu_zengdao2"), true);
			"step 1";
			if (result.bool) {
				trigger.num++;
				player.loseToDiscardpile(result.links);
			}
		},
		marktext: "刀",
		intro: {
			content: "expansion",
			markcount: "expansion",
			onunmark: function (storage, player) {
				player.removeSkill("xinfu_zengdao2");
			},
		},
	},
	xinfu_guanwei: {
		audio: 2,
		usable: 1,
		init: () => {
			game.addGlobalSkill("xinfu_guanwei_ai");
		},
		onremove: () => {
			if (!game.hasPlayer(i => i.hasSkill("xinfu_guanwei"), true)) game.removeGlobalSkill("xinfu_guanwei_ai");
		},
		trigger: {
			global: "phaseUseEnd",
		},
		filter: function (event, player) {
			var history = event.player.getHistory("useCard");
			var num = 0;
			var suit = false;
			for (var i = 0; i < history.length; i++) {
				var suit2 = get.suit(history[i].card);
				if (!lib.suit.includes(suit2)) return false;
				if (suit && suit != suit2) return false;
				suit = suit2;
				num++;
			}
			return num > 1;
		},
		direct: true,
		content: function () {
			"step 0";
			var target = trigger.player;
			player
				.chooseToDiscard("he", get.prompt("xinfu_guanwei", trigger.player), "弃置一张牌，令其摸两张牌并进行一个额外的出牌阶段。")
				.set("ai", function (card) {
					if (get.attitude(_status.event.player, _status.event.targetx) < 1) return 0;
					return 9 - get.value(card);
				})
				.set("logSkill", ["xinfu_guanwei", target])
				.set("targetx", target);
			"step 1";
			if (result.bool) {
				player.line(trigger.player, "green");
				trigger.player.draw(2);
			} else {
				player.storage.counttrigger.xinfu_guanwei--;
				event.finish();
			}
			"step 2";
			var next = trigger.player.phaseUse();
			event.next.remove(next);
			trigger.getParent("phase").next.push(next);
		},
		ai: {
			expose: 0.5,
		},
		subSkill: {
			ai: {
				trigger: { player: "dieAfter" },
				filter: () => {
					return !game.hasPlayer(i => i.hasSkill("xinfu_guanwei"), true);
				},
				silent: true,
				forceDie: true,
				content: () => {
					game.removeGlobalSkill("xinfu_guanwei_ai");
				},
				ai: {
					effect: {
						player_use: function (card, player, target) {
							if (typeof card != "object" || !player.isPhaseUsing()) return;
							var hasPanjun = game.hasPlayer(function (current) {
								return (
									current.hasSkill("xinfu_guanwei") &&
									(!current.storage.counttrigger || !current.storage.counttrigger.xinfu_guanwei) &&
									get.attitude(current, player) >= 1 &&
									current.hasCard(function (card) {
										return get.value(card) < 7 || (current != game.me && !current.isUnderControl() && !current.isOnline() && get.value(card) < 9);
									}, "he")
								);
							});
							if (!hasPanjun) return;
							var suitx = get.suit(card);
							var history = player.getHistory("useCard");
							if (!history.length) {
								var val = 0;
								if (
									player.hasCard(function (cardx) {
										return get.suit(cardx) == suitx && card != cardx && (!card.cards || !card.cards.includes(cardx)) && player.hasValueTarget(cardx);
									}, "hs")
								)
									val = [2, 0.1];
								if (val) return val;
								return;
							}
							var num = 0;
							var suit = false;
							for (var i = 0; i < history.length; i++) {
								var suit2 = get.suit(history[i].card);
								if (!lib.suit.includes(suit2)) return;
								if (suit && suit != suit2) return;
								suit = suit2;
								num++;
							}
							if (suitx == suit && num == 1) return [1, 0.1];
							if (
								suitx != suit &&
								(num > 1 ||
									(num <= 1 &&
										player.hasCard(function (cardx) {
											return get.suit(cardx) == suit && player.hasValueTarget(cardx);
										}, "hs")))
							)
								return "zeroplayertarget";
						},
					},
				},
			},
		},
	},
	xinfu_gongqing_gz_panjun: { audio: 2 },
	xinfu_gongqing: {
		audio: 2,
		audioname2: { gz_panjun: "xinfu_gongqing_gz_panjun" },
		trigger: {
			player: ["damageBegin3", "damageBegin4"],
		},
		forced: true,
		filter: function (event, player, name) {
			if (!event.source) return false;
			var range = event.source.getAttackRange();
			if (name == "damageBegin3") return range > 3;
			return event.num > 1 && range < 3;
		},
		preHidden: true,
		content: function () {
			trigger.num = event.triggername == "damageBegin4" ? 1 : trigger.num + 1;
		},
		ai: {
			filterDamage: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg && arg.player) {
					if (arg.player.hasSkillTag("jueqing", false, player)) return false;
					if (arg.player.getAttackRange() < 3) return true;
				}
				return false;
			},
		},
	},
	xinfu_andong: {
		subSkill: {
			add: {
				sub: true,
				mod: {
					ignoredHandcard: function (card, player) {
						if (get.suit(card) == "heart") {
							return true;
						}
					},
					cardDiscardable: function (card, player, name) {
						if (name == "phaseDiscard" && get.suit(card) == "heart") return false;
					},
				},
			},
		},
		audio: 2,
		trigger: {
			player: "damageBegin4",
		},
		filter: function (event, player) {
			return get.itemtype(event.source) == "player";
		},
		logTarget: "source",
		content: function () {
			"step 0";
			if (!trigger.source.countCards("h")) event._result = { index: 1 };
			else
				trigger.source.chooseControlList(["令" + get.translation(player) + "观看你的手牌，并获得其中所有的红桃牌。", "防止即将对" + get.translation(player) + "造成的伤害，并使自己本回合内的红桃手牌不计入手牌上限。"], true).set("ai", function (event, player) {
					var target = _status.event.getParent().player;
					var player = _status.event.player;
					if (get.attitude(player, target) > 0) return 1;
					return 0;
				});
			"step 1";
			if (result.index == 1) {
				trigger.cancel();
				trigger.source.addTempSkill("xinfu_andong_add");
				event.finish();
			} else {
				player.viewHandcards(trigger.source);
			}
			"step 2";
			var cards = trigger.source.getCards("h");
			var togain = [];
			for (var i = 0; i < cards.length; i++) {
				if (get.suit(cards[i]) == "heart") togain.push(cards[i]);
			}
			if (togain.length) player.gain(togain, trigger.source, "giveAuto", "bySelf");
		},
	},
	xinfu_yingshi: {
		audio: 2,
		group: ["yingshi_die"],
		trigger: {
			player: "phaseUseBegin",
		},
		direct: true,
		filter: function (event, player) {
			return (
				player.countCards("he", { suit: "heart" }) > 0 &&
				!game.hasPlayer(function (current) {
					return current.hasSkill("yingshi_heart");
				})
			);
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("xinfu_yingshi"), function (card, player, target) {
					return target != player;
				})
				.set("ai", function () {
					return -1;
				});
			"step 1";
			if (result.bool) {
				var cards = player.getCards("he", { suit: "heart" });
				var target = result.targets[0];
				player.logSkill("xinfu_yingshi", target);
				target.addSkill("yingshi_heart");
				target.addToExpansion(cards, player, "give").gaintag.add("xinfu_yingshi");
			}
		},
		marktext: "酬",
		intro: {
			markcount: "expansion",
			content: "expansion",
			onunmark: function (storage, player) {
				player.removeSkill("yingshi_heart");
			},
		},
	},
	yingshi_heart: {
		charlotte: true,
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.source && event.source.isIn() && event.card && event.card.name == "sha" && player.getExpansions("xinfu_yingshi").length > 0;
		},
		forced: true,
		logTarget: "source",
		content: function () {
			"step 0";
			trigger.source.chooseCardButton("应势：选择获得一张“酬”", player.getExpansions("xinfu_yingshi"), true);
			"step 1";
			if (result.bool) {
				trigger.source.gain(result.links, player, "give");
			}
		},
	},
	yingshi_die: {
		audio: "xinfu_yingshi",
		forced: true,
		trigger: { global: "die" },
		logTarget: "player",
		filter: function (event, player) {
			return event.player.getExpansions("xinfu_yingshi").length > 0;
		},
		content: function () {
			var target = trigger.player;
			player.gain(target.getExpansions("xinfu_yingshi"), target, "give", "bySelf");
		},
	},
	xinfu_duanfa: {
		init: function (player) {
			player.storage.xinfu_duanfa = 0;
		},
		audio: 2,
		enable: "phaseUse",
		position: "he",
		filter: function (card, player) {
			return player.storage.xinfu_duanfa < player.maxHp;
		},
		filterCard: function (card) {
			return get.color(card) == "black";
		},
		selectCard: function () {
			var player = _status.event.player;
			return [1, player.maxHp - player.storage.xinfu_duanfa];
		},
		check: function (card) {
			return 6 - get.value(card);
		},
		delay: false,
		content: function () {
			player.draw(cards.length);
			player.storage.xinfu_duanfa += cards.length;
		},
		group: "xinfu_duanfa_clear",
		subSkill: {
			clear: {
				trigger: {
					player: "phaseBefore",
				},
				forced: true,
				silent: true,
				popup: false,
				content: function () {
					player.storage.xinfu_duanfa = 0;
				},
				sub: true,
			},
		},
		ai: {
			order: 1,
			result: {
				player: 1,
			},
		},
	},
	xinfu_youdi: {
		audio: 2,
		trigger: {
			player: "phaseJieshuBegin",
		},
		direct: true,
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("xinfu_youdi"), function (card, player, target) {
					return player != target;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					if (player.countCards("h", "sha") > player.countCards("h") / 3 && player.countCards("h", { color: "red" }) > player.countCards("h") / 2) return 0;
					if (target.countCards("he") == 0) return 0.1;
					return -get.attitude(_status.event.player, target);
				});
			"step 1";
			if (result.bool) {
				game.delay();
				player.logSkill("xinfu_youdi", result.targets);
				event.target = result.targets[0];
				event.target.discardPlayerCard(player, "h", true);
			} else {
				event.finish();
			}
			"step 2";
			if (get.color(result.links[0]) != "black") player.draw("nodelay");
			if (result.links[0].name != "sha" && event.target.countCards("he")) {
				player.gainPlayerCard("he", event.target, true);
			}
		},
		ai: {
			expose: 0.3,
			threaten: 1.4,
		},
	},
	xinfu_guanchao: {
		subSkill: {
			dizeng: {
				mark: true,
				marktext: "增",
				intro: {
					content: "单调递增",
				},
				trigger: {
					player: "useCard",
				},
				audio: "xinfu_guanchao",
				forced: true,
				mod: {
					aiOrder: function (player, card, num) {
						if (typeof card.number != "number") return;
						var history = player.getHistory("useCard", function (evt) {
							return (
								evt.isPhaseUsing() &&
								evt.getParent("phaseUse") === _status.event.getParent("phaseUse")
							);
						});
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
				filter: function (event, player) {
					var history = player.getHistory("useCard", function (evt) {
						return (
							evt.isPhaseUsing() &&
							evt.getParent("phaseUse") === event.getParent("phaseUse")
						);
					});
					if (history.length < 2) return false;
					var num = get.number(history[0].card);
					if (!num) return false;
					for (var i = 1; i < history.length; i++) {
						var num2 = get.number(history[i].card);
						if (!num2 || num2 <= num) return false;
						num = num2;
					}
					return true;
				},
				content: function () {
					player.draw();
				},
				sub: true,
			},
			dijian: {
				mark: true,
				marktext: "减",
				intro: {
					content: "单调递减",
				},
				init: function (player) {
					player.storage.guanchao = 0;
				},
				onremove: function (player) {
					delete player.storage.guanchao;
				},
				trigger: {
					player: "useCard",
				},
				audio: "xinfu_guanchao",
				forced: true,
				mod: {
					aiOrder: function (player, card, num) {
						if (typeof card.number != "number") return;
						var history = player.getHistory("useCard", function (evt) {
							return (
								evt.isPhaseUsing() &&
								evt.getParent("phaseUse") === _status.event.getParent("phaseUse")
							);
						});
						if (history.length == 0) return num + 10 * card.number;
						var num = get.number(history[0].card);
						if (!num) return;
						for (var i = 1; i < history.length; i++) {
							var num2 = get.number(history[i].card);
							if (!num2 || num2 >= num) return;
							num = num2;
						}
						if (card.number < num) return num + 10 * card.number;
					},
				},
				filter: function (event, player) {
					var history = player.getHistory("useCard", function (evt) {
						return (
							evt.isPhaseUsing() &&
							evt.getParent("phaseUse") === event.getParent("phaseUse")
						);
					});
					if (history.length < 2) return false;
					var num = get.number(history[0].card);
					if (!num) return false;
					for (var i = 1; i < history.length; i++) {
						var num2 = get.number(history[i].card);
						if (!num2 || num2 >= num) return false;
						num = num2;
					}
					return true;
				},
				content: function () {
					player.draw();
				},
				sub: true,
			},
		},
		audio: 2,
		trigger: {
			player: "phaseUseBegin",
		},
		direct: true,
		content: function () {
			"step 0";
			var list = ["递增", "递减", "取消"];
			player
				.chooseControl(list)
				.set("prompt", get.prompt2("xinfu_guanchao"))
				.set("ai", function () {
					return [0, 1].randomGet();
				});
			"step 1";
			switch (result.control) {
				case "递增": {
					player.logSkill("xinfu_guanchao");
					player.addTempSkill("xinfu_guanchao_dizeng", "phaseUseEnd");
					break;
				}
				case "递减": {
					player.logSkill("xinfu_guanchao");
					player.addTempSkill("xinfu_guanchao_dijian", "phaseUseEnd");
					break;
				}
				case "取消": {
					break;
				}
			}
		},
	},
	xinfu_xunxian: {
		usable: 1,
		audio: 2,
		trigger: {
			player: ["useCardAfter", "respond"],
		},
		filter: function (event, player) {
			if (
				get.itemtype(event.cards) !== "cards" ||
				!game.hasPlayer(current => {
					if (current === player) return false;
					return current.getHp() > player.getHp() || current.countCards("h") > player.countCards("h");
				})
			)
				return false;
			for (var i = 0; i < event.cards.length; i++) {
				if (event.cards[i].isInPile()) {
					return true;
				}
			}
			return false;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2("xinfu_xunxian"), (card, player, target) => {
					if (target === player) return false;
					return target.getHp() > player.getHp() || target.countCards("h") > player.countCards("h");
				})
				.set("ai", target => {
					let att = get.attitude(_status.event.player, target),
						name = _status.event.cards[0].name;
					if (att < 3) return 0;
					if (target.hasJudge("lebu")) att /= 5;
					if (name === "sha" && target.hasSha()) att /= 5;
					if (name === "wuxie" && target.needsToDiscard(_status.event.cards)) att /= 5;
					return att / (1 + get.distance(player, target, "absolute"));
				})
				.set("cards", trigger.cards)
				.forResult();
		},
		async content(event, trigger, player) {
			let list = [];
			for (let i = 0; i < trigger.cards.length; i++) {
				if (trigger.cards[i].isInPile()) {
					list.push(trigger.cards[i]);
				}
			}
			if (get.mode() !== "identity" || player.identity !== "nei") player.addExpose(0.2);
			event.targets[0].gain(list, "gain2").giver = player;
		},
	},
	xinfu_kannan: {
		audio: 2,
		subSkill: {
			phase: {
				sub: true,
			},
		},
		enable: "phaseUse",
		filter: function (event, player) {
			if (player.hasSkill("xinfu_kannan_phase")) return false;
			if (player.getStat().skill.xinfu_kannan >= player.hp) return false;
			return player.countCards("h") > 0;
		},
		filterTarget: function (card, player, target) {
			if (target.hasSkill("xinfu_kannan_phase")) return false;
			return player.canCompare(target);
		},
		ai: {
			order: function () {
				return get.order({ name: "sha" }) + 0.4;
			},
			result: {
				target: function (player, target) {
					if (
						player.hasCard(function (card) {
							if (get.position(card) != "h") return false;
							var val = get.value(card);
							if (val < 0) return true;
							if (val <= 5) {
								return card.number >= 12;
							}
							if (val <= 6) {
								return card.number >= 13;
							}
							return false;
						})
					)
						return -1;
					return 0;
				},
			},
		},
		content: function () {
			"step 0";
			player.chooseToCompare(target);
			"step 1";
			if (result.bool) {
				player.addTempSkill("xinfu_kannan_phase");
				if (!player.hasSkill("kannan_eff")) {
					player.addSkill("kannan_eff");
				} else {
					if (!player.storage.kannan_eff) player.storage.kannan_eff = 0;
				}
				player.storage.kannan_eff++;
				player.markSkill("kannan_eff");
			} else {
				target.addTempSkill("xinfu_kannan_phase");
				if (!target.hasSkill("kannan_eff")) {
					target.addSkill("kannan_eff");
				} else {
					if (!target.storage.kannan_eff) player.storage.kannan_eff = 0;
					//target.storage.kannan_eff++;
					//target.markSkill('kannan_eff');
				}
				target.storage.kannan_eff++;
				target.markSkill("kannan_eff");
			}
		},
	},
	kannan_eff: {
		mark: true,
		intro: {
			content: "下一张杀的伤害基数+#",
		},
		trigger: {
			player: "useCard",
		},
		filter: function (event) {
			return event.card && event.card.name == "sha";
		},
		forced: true,
		content: function () {
			if (!trigger.baseDamage) trigger.baseDamage = 1;
			trigger.baseDamage += player.storage.kannan_eff;
			player.removeSkill("kannan_eff");
		},
		init: function (player) {
			player.storage.kannan_eff = 0;
		},
		onremove: function (player) {
			delete player.storage.kannan_eff;
		},
		ai: {
			damageBonus: true,
		},
	},
	xinfu_tushe: {
		audio: 2,
		mod: {
			aiOrder(player, card, num) {
				if (get.tag(card, "multitarget")) {
					if (player.countCards("h", { type: "basic" })) return num / 10;
					return num * 10;
				}
				if (get.type(card) === "basic") return num + 10;
			},
			aiValue(player, card, num) {
				if (card.name === "zhangba") {
					let fact = n => {
							if (n > 1) return n * fact(n - 1);
							return 1;
						},
						basic = 0;
					return fact(
						Math.min(
							player.countCards("hs", i => {
								if (get.tag(i, "multitarget")) return 2;
								if (!["shan", "tao", "jiu"].includes(card.name)) return 1;
								basic++;
							}) /
								(1 + basic),
							player.getCardUsable("sha")
						)
					);
				}
				if (["shan", "tao", "jiu"].includes(card.name)) {
					if (player.getEquip("zhangba") && player.countCards("hs") > 1) return 0.01;
					return num / 2;
				}
				if (get.tag(card, "multitarget")) return num + game.players.length;
			},
			aiUseful(player, card, num) {
				if (get.name(card, player) === "shan") {
					if (
						player.countCards("hs", i => {
							if (card === i || (card.cards && card.cards.includes(i))) return false;
							return get.name(i, player) === "shan";
						})
					)
						return -1;
					return num / Math.pow(Math.max(1, player.hp), 2);
				}
			},
		},
		trigger: {
			player: "useCardToPlayered",
		},
		locked: false,
		frequent: true,
		filter: function (event, player) {
			if (get.type(event.card) == "equip") return false;
			if (event.getParent().triggeredTargets3.length > 1) return false;
			return event.targets.length > 0 && !player.countCards("h", { type: "basic" });
		},
		content: function () {
			player.draw(trigger.targets.length);
		},
		ai: {
			presha: true,
			pretao: true,
			threaten: 1.8,
			effect: {
				player(card, player, target) {
					if (
						typeof card === "object" &&
						card.name !== "shan" &&
						get.type(card) !== "equip" &&
						!player.countCards("h", i => {
							if (card === i || (card.cards && card.cards.includes(i))) return false;
							return get.type(i) === "basic";
						})
					) {
						let targets = [],
							evt = _status.event.getParent("useCard");
						targets.addArray(ui.selected.targets);
						if (evt && evt.card == card) targets.addArray(evt.targets);
						if (targets.length) return [1, targets.length];
						if (get.tag(card, "multitarget")) return [1, game.players.length - 1];
						return [1, 1];
					}
				},
			},
		},
	},
	xinfu_limu: {
		mod: {
			targetInRange: function (card, player, target) {
				if (player.countCards("j") && player.inRange(target)) {
					return true;
				}
			},
			cardUsableTarget: function (card, player, target) {
				if (player.countCards("j") && player.inRange(target)) return true;
			},
			aiOrder(player, card, num) {
				if (get.type(card, "delay") && player.canUse(card, player) && player.canAddJudge(card)) return 15;
			},
		},
		locked: false,
		audio: 2,
		enable: "phaseUse",
		discard: false,
		filter: function (event, player) {
			if (player.hasJudge("lebu")) return false;
			return player.countCards("hes", { suit: "diamond" }) > 0;
		},
		viewAs: { name: "lebu" },
		//prepare:"throw",
		position: "hes",
		filterCard: function (card, player, event) {
			return get.suit(card) == "diamond" && player.canAddJudge({ name: "lebu", cards: [card] });
		},
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return player == target;
		},
		check(card) {
			var player = _status.event.player;
			if (!player.getEquip("zhangba")) {
				let damaged = player.maxHp - player.hp - 1;
				if (
					player.countCards("h", function (cardx) {
						if (cardx == card) return false;
						if (cardx.name == "tao") {
							if (damaged < 1) return true;
							damaged--;
						}
						return ["shan", "jiu"].includes(cardx.name);
					}) > 0
				)
					return 0;
			}
			if (card.name == "shan") return 15;
			if (card.name == "tao" || card.name == "jiu") return 10;
			return 9 - get.value(card);
		},
		onuse: function (links, player) {
			var next = game.createEvent("limu_recover", false, _status.event.getParent());
			next.player = player;
			next.setContent(function () {
				player.recover();
			});
		},
		ai: {
			result: {
				target(player, target) {
					let res = lib.card.lebu.ai.result.target(player, target);
					if (target.isDamaged()) return res + 2 * Math.abs(get.recoverEffect(target, player, target));
					return res;
				},
				ignoreStatus: true,
			},
			order(item, player) {
				if (player.hp > 1 && player.countCards("j")) return 0;
				return 12;
			},
			effect: {
				target(card, player, target) {
					if (target.isPhaseUsing() && typeof card === "object" && get.type(card, target) === "delay" && !target.countCards("j")) {
						let shas =
							target.getCards("hs", i => {
								if (card === i || (card.cards && card.cards.includes(i))) return false;
								return get.name(i, target) === "sha" && target.getUseValue(i) > 0;
							}) - target.getCardUsable("sha");
						if (shas > 0) return [1, 1.5 * shas];
					}
				},
			},
		},
	},
};

export default skills;
