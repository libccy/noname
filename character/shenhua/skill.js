import { lib, game, ui, get, ai, _status } from "../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	//庞统写法修改
	lianhuan: {
		audio: 2,
		hiddenCard(player, name) {
			return name == "tiesuo" && player.hasCard(card => get.suit(card) == "club", "sh");
		},
		enable: "chooseToUse",
		filter(event, player) {
			if (!player.hasCard(card => get.suit(card) == "club", "sh")) return false;
			return event.type == "phase" || event.filterCard(get.autoViewAs({ name: "tiesuo" }, "unsure"), player, event);
		},
		position: "hs",
		filterCard(card, player, event) {
			if (!event) event = _status.event;
			if (get.suit(card) != "club") return false;
			if (event.type == "phase" && get.position(card) != "s" && player.canRecast(card)) {
				return true;
			} else {
				if (game.checkMod(card, player, "unchanged", "cardEnabled2", player) === false) return false;
				const cardx = get.autoViewAs({ name: "tiesuo" }, [card]);
				return event._backup.filterCard(cardx, player, event);
			}
		},
		filterTarget(fuck, player, target) {
			const card = ui.selected.cards[0],
				event = _status.event,
				backup = event._backup;
			if (!card || game.checkMod(card, player, "unchanged", "cardEnabled2", player) === false) return false;
			const cardx = get.autoViewAs({ name: "tiesuo" }, [card]);
			return backup.filterCard(cardx, player, event) && backup.filterTarget(cardx, player, target);
		},
		selectTarget() {
			const card = ui.selected.cards[0],
				event = _status.event,
				player = event.player,
				backup = event._backup;
			let recast = false,
				use = false;
			const cardx = get.autoViewAs({ name: "tiesuo" }, [card]);
			if (event.type == "phase" && player.canRecast(card)) recast = true;
			if (game.checkMod(card, player, "unchanged", "cardEnabled2", player) !== false) {
				if (backup.filterCard(cardx, player, event)) use = true;
			}
			if (!use) return [0, 0];
			else {
				const select = backup.selectTarget(cardx, player);
				if (recast && select[0] > 0) select[0] = 0;
				return select;
			}
		},
		filterOk() {
			const card = ui.selected.cards[0],
				event = _status.event,
				player = event.player,
				backup = event._backup;
			const selected = ui.selected.targets.length;
			let recast = false,
				use = false;
			const cardx = get.autoViewAs({ name: "tiesuo" }, [card]);
			if (event.type == "phase" && player.canRecast(card)) recast = true;
			if (game.checkMod(card, player, "unchanged", "cardEnabled2", player) !== false) {
				if (backup.filterCard(cardx, player, event)) use = true;
			}
			if (recast && selected == 0) {
				return true;
			} else if (use) {
				const select = backup.selectTarget(cardx, player);
				if (select[0] <= -1) return true;
				return selected >= select[0] && selected <= select[1];
			}
		},
		discard: false,
		lose: false,
		delay: false,
		async precontent(event, trigger, player) {
			var result = event.result;
			if (result.targets.length > 0) result.card = get.autoViewAs({ name: "tiesuo" }, result.cards);
		},
		async content(event, trigger, player) {
			player.recast(event.cards);
		},
	},
	//新杀小加强 陈到
	dcwanglie: {
		audio: "drlt_wanglie",
		locked: false,
		mod: {
			targetInRange(card, player, target) {
				if (player.hasSkill("dcwanglie_effect", null, null, false)) return true;
			},
		},
		trigger: {
			player: "useCard",
		},
		filter(event, player) {
			return player.isPhaseUsing() && (event.card.name == "sha" || get.type(event.card) == "trick");
		},
		preHidden: true,
		check(event, player) {
			if (player.hasSkill("dcwanglie2", null, null, false)) return true;
			if (["wuzhong", "kaihua", "dongzhuxianji"].includes(event.card.name)) return false;
			player._wanglie_temp = true;
			var eff = 0;
			for (var i of event.targets) {
				eff += get.effect(i, event.card, player, player);
			}
			delete player._wanglie_temp;
			if (eff < 0) return true;
			if (
				!player.countCards("h", function (card) {
					return player.hasValueTarget(card, null, true);
				})
			)
				return true;
			if (
				get.tag(event.card, "damage") &&
				!player.needsToDiscard() &&
				!player.countCards("h", function (card) {
					return get.tag(card, "damage") && player.hasValueTarget(card, null, true);
				})
			)
				return true;
			return false;
		},
		prompt2(event) {
			return "令" + get.translation(event.card) + "不能被响应，然后本阶段你使用牌只能指定自己为目标";
		},
		group: "dcwanglie_startup",
		async content(event, trigger, player) {
			trigger.nowuxie = true;
			trigger.directHit.addArray(game.players);
			player.addTempSkill("dcwanglie2", "phaseUseAfter");
		},
		subSkill: {
			startup: {
				trigger: { player: "phaseUseBegin" },
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					player.addTempSkill("dcwanglie_effect", "phaseUseAfter");
				},
			},
			effect: {
				forced: true,
				charlotte: true,
				firstDo: true,
				popup: false,
				trigger: { player: "useCard1" },
				filter(event, player) {
					return event.targets.some(target => target != player);
				},
				async content(event, trigger, player) {
					player.addMark("dcwanglie_effect", 1, false);
					if (player.countMark("dcwanglie_effect") >= 2) player.removeSkill("dcwanglie_effect");
				},
				onremove: true,
			},
		},
		ai: {
			//pretao:true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				//if(tag=='pretao') return true;
				if (player._wanglie_temp) return false;
				player._wanglie_temp = true;
				var bool = (function () {
					if (["wuzhong", "kaihua", "dongzhuxianji"].includes(arg.card.name)) return false;
					if (get.attitude(player, arg.target) > 0 || !player.isPhaseUsing()) return false;
					var cards = player.getCards("h", function (card) {
						return card != arg.card && (!arg.card.cards || !arg.card.cards.includes(card));
					});
					var sha = player.getCardUsable("sha");
					if (arg.card.name == "sha") sha--;
					cards = cards.filter(function (card) {
						if (card.name == "sha" && sha <= 0) return false;
						return player.hasValueTarget(card, null, true);
					});
					if (!cards.length) return true;
					if (!get.tag(arg.card, "damage")) return false;
					if (
						!player.needsToDiscard() &&
						!cards.filter(function (card) {
							return get.tag(card, "damage");
						}).length
					)
						return true;
					return false;
				})();
				delete player._wanglie_temp;
				return bool;
			},
		},
	},
	dcwanglie2: {
		charlotte: true,
		mod: {
			playerEnabled(card, player, target) {
				if (player != target) return false;
			},
		},
	},
	//周妃
	olliangyin: {
		audio: "liangyin",
		trigger: {
			global: ["loseAfter", "addToExpansionAfter", "cardsGotoSpecialAfter", "loseAsyncAfter"],
		},
		filter(event, player, name) {
			if (event.name == "lose" || event.name == "loseAsync") return event.getlx !== false && event.toStorage == true;
			if (event.name == "cardsGotoSpecial") return !event.notrigger;
			return true;
		},
		direct: true,
		usable: 1,
		async content(event, trigger, player) {
			const {
				result: { bool, targets },
			} = await player.chooseTarget(get.prompt("olliangyin"), "选择一名其他角色，你与其各摸一张牌", lib.filter.notMe).set("ai", function (target) {
				var player = _status.event.player,
					num = player.getExpansions("olkongsheng").length - 1;
				var att = get.attitude(player, target);
				if (att <= 0) return 0;
				if (target.countCards("h") == num && target.isDamaged() && get.recoverEffect(target, player, player) > 0) return 3 * att;
				return att;
			});
			if (bool) {
				const target = targets[0];
				event.target = target;
				player.logSkill("olliangyin", target);
				await game.asyncDraw([player, target].sortBySeat());
			} else return;
			await game.asyncDelayx();
			let num = player.getExpansions("olkongsheng").length;
			let check = player => {
				if (!player.isIn() || player.isHealthy()) return false;
				return player.countCards("h") == num;
			};
			const { target } = event;
			if (check(player) || check(target)) {
				const choiceList = ["令自己回复1点体力", "令" + get.translation(target) + "回复1点体力"];
				const choices = [];
				if (check(player)) choices.push("选项一");
				else choiceList[0] = '<span style="opacity:0.5">' + choiceList[0] + "</span>";
				if (check(target)) choices.push("选项二");
				else choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "</span>";
				choices.push("cancel2");
				const {
					result: { control },
				} = await player
					.chooseControl(choices)
					.set("choiceList", choiceList)
					.set("prompt", "良姻：是否令一名角色回复体力？")
					.set("ai", function () {
						var player = _status.event.player,
							target = _status.event.getParent().target;
						var list = _status.event.controls.slice(0),
							eff1 = 0,
							eff2 = 0;
						if (list.includes("选项一")) eff1 = get.recoverEffect(player, player, player);
						if (list.includes("选项二")) eff2 = get.recoverEffect(target, player, player);
						if (eff1 > Math.max(0, eff2)) return "选项一";
						if (eff2 > 0) return "选项二";
						return "cancel2";
					});
				if (control == "选项一") await player.recover();
				else if (control == "选项二") await target.recover();
			}
		},
		group: "olliangyin_gain",
		subSkill: {
			gain: {
				audio: "liangyin",
				trigger: {
					global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				direct: true,
				filter(event, player) {
					return game.hasPlayer(function (current) {
						var evt = event.getl(current);
						return evt && (evt.xs.length > 0 || evt.ss.length > 0);
					});
				},
				usable: 1,
				async content(event, trigger, player) {
					if (!player.countCards("he") || !game.hasPlayer(current => current != player && current.countCards("he") > 0)) return;
					const {
						result: { bool, targets, cards },
					} = await player.chooseCardTarget({
						prompt: get.prompt("olliangyin"),
						prompt2: "弃置一张牌，并令一名其他角色也弃置一张牌",
						position: "he",
						filterCard: lib.filter.cardDiscardable,
						filterTarget(card, player, target) {
							return target != player && target.countCards("he") > 0;
						},
						ai1(card) {
							let player = _status.event.player;
							if (_status.event.me) {
								if (get.position(card) === _status.event.me) return 12 - player.hp - get.value(card);
								return 0;
							}
							return 5 - get.value(card);
						},
						ai2(target) {
							let player = _status.event.player,
								att = get.attitude(player, target);
							if (att > 0 && (_status.event.me || target.isHealthy())) return -att;
							if (
								att > 0 &&
								(target.countCards("he") > target.hp ||
									target.hasCard(function (card) {
										return get.value(card, target) <= 0;
									}, "e"))
							)
								return att;
							return -att;
						},
						me: (() => {
							if (player.isHealthy() || get.recoverEffect(player, player, _status.event.player) <= 0) return false;
							let ph = player.countCards("h"),
								num = player.getExpansions("olkongsheng").length;
							if (ph === num) {
								if (player.hasSkillTag("noh")) return "h";
								return "e";
							}
							if (ph - 1 === num) return "h";
							return false;
						})(),
					});
					if (bool) {
						const target = targets[0];
						event.target = target;
						player.logSkill("olliangyin_gain", target);
						await player.discard(cards);
						await target.chooseToDiscard("he", true);
					} else return;
					await game.asyncDelayx();
					let num = player.getExpansions("olkongsheng").length;
					let check = player => {
						if (!player.isIn() || player.isHealthy()) return false;
						return player.countCards("h") == num;
					};
					const { target } = event;
					if (check(player) || check(target)) {
						const choiceList = ["令自己回复1点体力", "令" + get.translation(target) + "回复1点体力"];
						const choices = [];
						if (check(player)) choices.push("选项一");
						else choiceList[0] = '<span style="opacity:0.5">' + choiceList[0] + "</span>";
						if (check(target)) choices.push("选项二");
						else choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "</span>";
						choices.push("cancel2");
						const {
							result: { control },
						} = await player
							.chooseControl(choices)
							.set("choiceList", choiceList)
							.set("prompt", "良姻：是否令一名角色回复体力？")
							.set("ai", function () {
								var player = _status.event.player,
									target = _status.event.getParent().target;
								var list = _status.event.controls.slice(0),
									eff1 = 0,
									eff2 = 0;
								if (list.includes("选项一")) eff1 = get.recoverEffect(player, player, player);
								if (list.includes("选项二")) eff2 = get.recoverEffect(target, player, player);
								if (eff1 > Math.max(0, eff2)) return "选项一";
								if (eff2 > 0) return "选项二";
								return "cancel2";
							});
						if (control == "选项一") await player.recover();
						else if (control == "选项二") await target.recover();
					}
				},
			},
		},
	},
	olkongsheng: {
		audio: "kongsheng",
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		filter(event, player) {
			return player.countCards("he") > 0;
		},
		content() {
			"step 0";
			player.chooseCard("he", [1, player.countCards("he")], get.prompt("olkongsheng"), "将任意张牌作为“箜”置于武将牌上").set("ai", function (card) {
				var player = _status.event.player,
					num = player.getExpansions("olkongsheng") + ui.selected.cards.length;
				if (
					ui.selected.cards.length > 0 &&
					game.hasPlayer(function (current) {
						if (current.isHealthy() || get.recoverEffect(current, player, player) <= 0) return false;
						var num2 =
							current.countCards("h", function (card) {
								if (current != player) return true;
								return !ui.selected.cards.includes(card);
							}) + 1;
						return num == num2;
					})
				)
					return 0;
				if (get.type(card, null, false) == "equip") {
					for (var i of ui.selected.cards) {
						if (get.type(i, null, false) == "equip") return 0;
					}
					return 5 - get.value(card);
				}
				if (!player.hasValueTarget(card)) return 1;
				return 0;
			});
			"step 1";
			if (result.bool) {
				player.logSkill("olkongsheng");
				player.addToExpansion(result.cards, player, "give").gaintag.add("olkongsheng");
			}
		},
		onremove(player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		group: "olkongsheng_kessoku",
		subSkill: {
			kessoku: {
				trigger: { player: "phaseJieshuBegin" },
				forced: true,
				locked: false,
				filter(event, player) {
					return (
						player.getExpansions("olkongsheng").filter(function (card) {
							return get.type(card, false) != "equip";
						}).length > 0
					);
				},
				content() {
					"step 0";
					var cards = player.getExpansions("olkongsheng").filter(function (card) {
						return get.type(card, false) != "equip";
					});
					if (cards.length) player.gain(cards, "gain2");
					"step 1";
					var cards = player.getExpansions("olkongsheng");
					if (cards.length > 0) {
						player.chooseTarget(true, "令一名角色使用以下装备牌", get.translation(cards)).set("ai", function (target) {
							var player = _status.event.player;
							return get.effect(target, { name: "losehp" }, player, player);
						});
					} else event.finish();
					"step 2";
					var target = result.targets[0];
					event.target = target;
					player.line(target, "green");
					"step 3";
					var cards = player.getExpansions("olkongsheng").filter(function (i) {
						return target.hasUseTarget(i);
					});
					if (cards.length == 1) {
						event._result = { bool: true, links: cards };
					} else if (cards.length)
						target.chooseButton(true, ["选择要使用的装备牌", cards]).set("ai", function (button) {
							return get.order(button.link);
						});
					else event.goto(5);
					"step 4";
					if (result.bool) {
						target.chooseUseTarget(result.links[0], true);
						event.goto(3);
					}
					"step 5";
					target.loseHp();
				},
			},
		},
	},
	//新毌丘俭
	zhengrong: {
		trigger: { player: "useCardToPlayered" },
		direct: true,
		audio: "drlt_zhenrong",
		filter(event, player) {
			if (!event.isFirstTarget) return false;
			if (!["basic", "trick"].includes(get.type(event.card))) return false;
			if (get.tag(event.card, "damage"))
				return game.hasPlayer(function (current) {
					return event.targets.includes(current) && current.countCards("h") >= player.countCards("h") && current.countCards("he") > 0;
				});
			return false;
		},
		content() {
			"step 0";
			player
				.chooseTarget(get.prompt("zhengrong"), "将一名手牌数不小于你的目标角色的一张牌置于你的武将牌上，成为「荣」", function (card, player, target) {
					return _status.event.targets.includes(target) && target.countCards("h") >= player.countCards("h") && target.countCards("he") > 0;
				})
				.set("ai", function (target) {
					return (1 - get.attitude(_status.event.player, target)) / target.countCards("he");
				})
				.set("targets", trigger.targets);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = result.targets[0];
				player.logSkill("zhengrong", target);
				player.choosePlayerCard(target, "he", true).ai = get.buttonValue;
			} else event.finish();
			"step 2";
			if (result.bool) {
				var card = result.links[0];
				player.addToExpansion(card, "give", "log", target).gaintag.add("zhengrong");
			}
		},
		onremove(player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		marktext: "荣",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
	},
	hongju: {
		trigger: { player: "phaseZhunbeiBegin" },
		audio: "drlt_hongju",
		forced: true,
		unique: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "thunder",
		derivation: "qingce",
		filter(event, player) {
			return player.getExpansions("zhengrong").length >= 3;
		},
		content() {
			"step 0";
			player.awakenSkill("hongju");
			var cards = player.getExpansions("zhengrong");
			if (!cards.length || !player.countCards("h")) {
				event.goto(2);
				return;
			}
			var next = player.chooseToMove("征荣：是否交换“荣”和手牌？");
			next.set("list", [
				[get.translation(player) + "（你）的“荣”", cards],
				["手牌区", player.getCards("h")],
			]);
			next.set("filterMove", function (from, to) {
				return typeof to != "number";
			});
			next.set("processAI", function (list) {
				var player = _status.event.player,
					cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
						return get.value(a) - get.value(b);
					}),
					cards2 = cards.splice(0, player.getExpansions("zhengrong").length);
				return [cards2, cards];
			});
			"step 1";
			if (result.bool) {
				var pushs = result.moved[0],
					gains = result.moved[1];
				pushs.removeArray(player.getExpansions("zhengrong"));
				gains.removeArray(player.getCards("h"));
				if (!pushs.length || pushs.length != gains.length) return;
				player.addToExpansion(pushs).gaintag.add("zhengrong");
				player.gain(gains, "gain2", "log");
			}
			"step 2";
			player.addSkills("qingce");
			game.log(player, "获得了技能", "#g【清侧】");
			player.loseMaxHp();
		},
		ai: {
			combo: "zhengrong",
		},
	},
	qingce: {
		enable: "phaseUse",
		audio: "drlt_qingce",
		filter(event, player) {
			return player.getExpansions("zhengrong").length > 0 && player.countCards("h") > 0;
		},
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog("请选择要获得的「荣」", player.getExpansions("zhengrong"), "hidden");
			},
			backup(links, player) {
				return {
					card: links[0],
					filterCard: true,
					position: "h",
					filterTarget(card, player, target) {
						return target.countDiscardableCards(player, "ej") > 0;
					},
					delay: false,
					audio: "drlt_qingce",
					content: lib.skill.qingce.contentx,
					ai: {
						result: {
							target(player, target) {
								var att = get.attitude(player, target);
								if (
									att > 0 &&
									(target.countCards("j") > 0 ||
										target.countCards("e", function (card) {
											return get.value(card, target) < 0;
										}))
								)
									return 2;
								if (att < 0 && target.countCards("e") > 0 && !target.hasSkillTag("noe")) return -1;
								return 0;
							},
						},
					},
				};
			},
			prompt(links, player) {
				return "选择弃置一张手牌，获得" + get.translation(links[0]) + "并弃置一名角色装备区或判定区内的一张牌";
			},
		},
		contentx() {
			"step 0";
			var card = lib.skill.qingce_backup.card;
			player.gain(card, "gain2", "log");
			"step 1";
			if (target.countDiscardableCards(player, "ej") > 0) {
				player.discardPlayerCard("ej", true, target);
			}
		},
		ai: {
			combo: "zhengrong",
			order: 8,
			result: {
				player(player) {
					if (
						game.hasPlayer(function (current) {
							var att = get.attitude(player, current);
							if ((att > 0 && current.countCards("j") > 0) || (att < 0 && current.countCards("e") > 0)) return true;
							return false;
						})
					)
						return 1;
					return 0;
				},
			},
		},
	},
	//阴雷
	drlt_zhenrong: {
		marktext: "荣",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		audio: 2,
		trigger: {
			source: "damageSource",
		},
		filter(event, player) {
			return event.player != player && event.player.countCards("h") > player.countCards("h");
		},
		direct: true,
		content() {
			"step 0";
			player.choosePlayerCard("hej", get.prompt("drlt_zhenrong"), trigger.player).set("ai", function (button) {
				return -get.attitude(player, trigger.player) + 1;
			});
			"step 1";
			if (result && result.links && result.links.length) {
				player.line(player, trigger.player);
				player.logSkill("drlt_zhenrong");
				player.addToExpansion(result.links, trigger.player, "give", "log").gaintag.add("drlt_zhenrong");
			}
		},
	},
	drlt_hongju: {
		skillAnimation: true,
		animationColor: "thunder",
		audio: 2,
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		forced: true,
		unique: true,
		juexingji: true,
		derivation: ["drlt_qingce"],
		filter(event, player) {
			return player.getExpansions("drlt_zhenrong").length >= 3 && game.dead.length > 0;
		},
		content() {
			"step 0";
			player.awakenSkill("drlt_hongju");
			var cards = player.getExpansions("drlt_zhenrong");
			if (!cards.length || !player.countCards("h")) {
				event.goto(2);
				return;
			}
			var next = player.chooseToMove("征荣：是否交换“荣”和手牌？");
			next.set("list", [
				[get.translation(player) + "（你）的“荣”", cards],
				["手牌区", player.getCards("h")],
			]);
			next.set("filterMove", function (from, to) {
				return typeof to != "number";
			});
			next.set("processAI", function (list) {
				var player = _status.event.player,
					cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
						return get.value(a) - get.value(b);
					}),
					cards2 = cards.splice(0, player.getExpansions("drlt_zhenrong").length);
				return [cards2, cards];
			});
			"step 1";
			if (result.bool) {
				var pushs = result.moved[0],
					gains = result.moved[1];
				pushs.removeArray(player.getExpansions("drlt_zhenrong"));
				gains.removeArray(player.getCards("h"));
				if (!pushs.length || pushs.length != gains.length) return;
				player.addToExpansion(pushs).gaintag.add("drlt_zhenrong");
				player.gain(gains, "gain2", "log");
			}
			"step 2";
			player.addSkills("drlt_qingce");
			player.loseMaxHp();
		},
		ai: {
			combo: "drlt_zhenrong",
		},
	},
	drlt_qingce: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return player.getExpansions("drlt_zhenrong").length > 0;
		},
		filterTarget(card, player, target) {
			return target.countDiscardableCards(player, "ej") > 0;
		},
		content() {
			"step 0";
			player.chooseCardButton(player.getExpansions("drlt_zhenrong"), 1, "请选择需要弃置的“荣”", true).ai = function (button) {
				return 6 - get.value(button.link);
			};
			"step 1";
			if (result.bool) {
				var cards = result.links;
				player.loseToDiscardpile(cards);
				player.discardPlayerCard(target, "ej", 1, true);
			}
		},
		ai: {
			combo: "drlt_zhenrong",
			order: 13,
			result: {
				target(player, target) {
					if (get.attitude(player, target) > 0 && target.countCards("j") > 0) return 1;
					return -1;
				},
			},
		},
	},
	drlt_zhenggu: {
		audio: 2,
		trigger: {
			player: "phaseJieshuBegin",
		},
		direct: true,
		content() {
			"step 0";
			player
				.chooseTarget(get.prompt2("drlt_zhenggu"), function (card, player, target) {
					//if(target.storage.drlt_zhenggu_mark&&target.storage.drlt_zhenggu_mark.includes(player)) return false;
					return target != player;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					//if(target.storage.drlt_zhenggu_mark&&target.storage.drlt_zhenggu_mark.includes(player)) return 0;
					var num = Math.min(5, player.countCards("h")) - target.countCards("h");
					var att = get.attitude(player, target);
					return num * att;
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("drlt_zhenggu", target);
				player.addSkill("drlt_zhenggu2");
				target.addSkill("drlt_zhenggu_mark");
				target.storage.drlt_zhenggu_mark.push(player);
				target.markSkill("drlt_zhenggu_mark");
				lib.skill.drlt_zhenggu.sync(player, target);
			}
		},
		sync(player, target) {
			var num = player.countCards("h");
			var num2 = target.countCards("h");
			if (num < num2) {
				target.chooseToDiscard(num2 - num, true, "h");
			} else target.drawTo(Math.min(5, num));
		},
	},
	drlt_zhenggu2: {
		audio: "drlt_zhenggu",
		trigger: {
			global: "phaseEnd",
		},
		forced: true,
		charlotte: true,
		logTarget: "player",
		filter(event, player) {
			return event.player.storage.drlt_zhenggu_mark && event.player.storage.drlt_zhenggu_mark.includes(player);
		},
		content() {
			while (trigger.player.storage.drlt_zhenggu_mark.includes(player)) {
				trigger.player.storage.drlt_zhenggu_mark.remove(player);
			}
			if (trigger.player.storage.drlt_zhenggu_mark.length == 0) trigger.player.unmarkSkill("drlt_zhenggu_mark");
			lib.skill.drlt_zhenggu.sync(player, trigger.player);
		},
	},
	drlt_zhenggu_mark: {
		init(player, skill) {
			if (!player.storage[skill]) player.storage[skill] = [];
		},
		marktext: "镇",
		intro: {
			name: "镇骨",
			content: "已成为$〖镇骨〗的目标",
		},
	},
	xinfu_zuilun: {
		audio: 2,
		trigger: {
			player: "phaseJieshuBegin",
		},
		check(event, player) {
			var num = 0;
			if (
				player.hasHistory("lose", function (evt) {
					return evt.type == "discard";
				})
			)
				num++;
			if (!player.isMinHandcard()) num++;
			if (!player.getStat("damage")) num++;
			if (num == 3) return player.hp >= 2;
			return true;
		},
		prompt(event, player) {
			var num = 3;
			if (
				player.hasHistory("lose", function (evt) {
					return evt.type == "discard";
				})
			)
				num--;
			if (!player.isMinHandcard()) num--;
			if (!player.getStat("damage")) num--;
			return get.prompt("xinfu_zuilun") + "（可获得" + get.cnNumber(num) + "张牌）";
		},
		content() {
			"step 0";
			event.num = 0;
			event.cards = get.cards(3);
			game.cardsGotoOrdering(cards);
			if (
				player.hasHistory("lose", function (evt) {
					return evt.type == "discard";
				})
			)
				event.num++;
			if (!player.isMinHandcard()) event.num++;
			if (!player.getStat("damage")) event.num++;
			"step 1";
			if (event.num == 0) {
				player.gain(event.cards, "draw");
				event.finish();
			} else {
				var prompt = "罪论：将" + get.cnNumber(num) + "张牌置于牌堆顶";
				if (num < 3) prompt += "并获得其余的牌";
				var next = player.chooseToMove(prompt, true);
				if (num < 3) {
					next.set("list", [["牌堆顶", cards], ["获得"]]);
					next.set("filterMove", function (from, to, moved) {
						if (to == 1 && moved[0].length <= _status.event.num) return false;
						return true;
					});
					next.set("filterOk", function (moved) {
						return moved[0].length == _status.event.num;
					});
				} else {
					next.set("list", [["牌堆顶", cards]]);
				}
				next.set("num", num);
				next.set("processAI", function (list) {
					var check = function (card) {
						var player = _status.event.player;
						var next = player.next;
						var att = get.attitude(player, next);
						var judge = next.getCards("j")[tops.length];
						if (judge) {
							return get.judge(judge)(card) * att;
						}
						return next.getUseValue(card) * att;
					};
					var cards = list[0][1].slice(0),
						tops = [];
					while (tops.length < _status.event.num) {
						list.sort(function (a, b) {
							return check(b) - check(a);
						});
						tops.push(cards.shift());
					}
					return [tops, cards];
				});
			}
			"step 2";
			if (result.bool) {
				var list = result.moved[0];
				var num = list.length - 1;
				for (var i = 0; i < list.length; i++) {
					event.cards.remove(list[num - i]);
					ui.cardPile.insertBefore(list[num - i], ui.cardPile.firstChild);
				}
			}
			"step 3";
			game.updateRoundNumber();
			if (event.cards.length) {
				player.gain(event.cards, "draw");
				event.finish();
			} else {
				player.chooseTarget("请选择一名角色，与其一同失去1点体力", true, function (card, player, target) {
					return target != player;
				}).ai = function (target) {
					return -get.attitude(_status.event.player, target);
				};
			}
			"step 4";
			player.line(result.targets[0], "fire");
			player.loseHp();
			result.targets[0].loseHp();
		},
	},
	xinfu_fuyin: {
		trigger: {
			target: "useCardToTargeted",
		},
		forced: true,
		audio: 2,
		filter(event, player) {
			if (event.player.countCards("h") < player.countCards("h")) return false;
			if (event.card.name != "sha" && event.card.name != "juedou") return false;
			return !game.hasPlayer2(function (current) {
				return (
					current.getHistory("useCard", function (evt) {
						return evt != event.getParent() && evt.card && ["sha", "juedou"].includes(evt.card.name) && evt.targets.includes(player);
					}).length > 0
				);
			});
		},
		content() {
			trigger.getParent().excluded.add(player);
		},
		ai: {
			effect: {
				target(card, player, target) {
					let hs = player.getCards("h", i => i !== card && (!card.cards || !card.cards.includes(i))),
						num = player.getCardUsable("sha");
					if ((card.name !== "sha" && card.name !== "juedou") || hs.length < target.countCards("h")) return 1;
					if (
						game.hasPlayer2(function (current) {
							return (
								current.getHistory("useCard", function (evt) {
									return evt.card && ["sha", "juedou"].includes(evt.card.name) && evt.targets.includes(player);
								}).length > 0
							);
						})
					)
						return 1;
					if (card.name === "sha") num--;
					hs = hs.filter(i => {
						if (!player.canUse(i, target)) return false;
						if (i.name === "juedou") return true;
						if (num && i.name === "sha") {
							num--;
							return true;
						}
						return false;
					});
					if (!hs.length) return "zeroplayertarget";
					num = 1 - 2 / 3 / hs.length;
					return [num, 0, num, 0];
				},
			},
		},
	},
	drlt_qianjie: {
		group: ["drlt_qianjie_1", "drlt_qianjie_2", "drlt_qianjie_3"],
		locked: true,
		ai: {
			effect: {
				target(card) {
					if (card.name == "tiesuo") return "zeroplayertarget";
				},
			},
		},
		subSkill: {
			1: {
				audio: "drlt_qianjie",
				trigger: {
					player: "linkBegin",
				},
				forced: true,
				filter(event, player) {
					return !player.isLinked();
				},
				content() {
					trigger.cancel();
				},
			},
			2: {
				mod: {
					targetEnabled(card, player, target) {
						if (get.type(card) == "delay") return false;
					},
				},
			},
			3: {
				ai: { noCompareTarget: true },
			},
		},
	},
	drlt_jueyan: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.hasEnabledSlot(1) || player.hasEnabledSlot(2) || player.hasEnabledSlot(5) || player.hasEnabledSlot("horse");
		},
		content() {
			"step 0";
			player.chooseToDisable(true).set("ai", function (event, player, list) {
				if (list.includes("equip2")) return "equip2";
				if (
					list.includes("equip1") &&
					player.countCards("h", function (card) {
						return get.name(card, player) == "sha" && player.hasUseTarget(card);
					}) -
						player.getCardUsable("sha") >
						1
				)
					return "equip1";
				if (
					list.includes("equip5") &&
					player.countCards("h", function (card) {
						return get.type2(card, player) == "trick" && player.hasUseTarget(card);
					}) > 1
				)
					return "equip5";
			});
			"step 1";
			switch (result.control) {
				case "equip1":
					player.addTempSkill("drlt_jueyan1");
					break;
				case "equip2":
					player.draw(3);
					player.addTempSkill("drlt_jueyan3");
					break;
				case "equip3_4":
					player.addTempSkill("drlt_jueyan2");
					break;
				case "equip5":
					player.addTempSkills("rejizhi");
					break;
			}
		},
		ai: {
			order: 13,
			result: {
				player(player) {
					if (player.hasEnabledSlot("equip2")) return 1;
					if (
						player.hasEnabledSlot("equip1") &&
						player.countCards("h", function (card) {
							return get.name(card, player) == "sha" && player.hasValueTarget(card);
						}) -
							player.getCardUsable("sha") >
							1
					)
						return 1;
					if (
						player.hasEnabledSlot("equip5") &&
						player.countCards("h", function (card) {
							return get.type2(card, player) == "trick" && player.hasUseTarget(card);
						}) > 1
					)
						return 1;
					return -1;
				},
			},
		},
		derivation: "rejizhi",
	},
	drlt_jueyan1: {
		mod: {
			cardUsable(card, player, num) {
				if (card.name == "sha") return num + 3;
			},
		},
		mark: true,
		marktext: "决",
		intro: { name: "决堰 - 武器", content: "本回合内可以多使用三张【杀】" },
	},
	drlt_jueyan2: {
		mod: {
			targetInRange(card, player, target, now) {
				return true;
			},
		},
		mark: true,
		marktext: "决",
		intro: { name: "决堰 - 坐骑", content: "本回合内使用牌没有距离限制" },
	},
	drlt_jueyan3: {
		mod: {
			maxHandcard(player, num) {
				return num + 3;
			},
		},
		mark: true,
		marktext: "决",
		intro: { name: "决堰 - 防具", content: "本回合内手牌上限+3" },
	},
	drlt_poshi: {
		audio: 2,
		skillAnimation: true,
		animationColor: "wood",
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		forced: true,
		unique: true,
		juexingji: true,
		derivation: ["drlt_huairou"],
		filter(event, player) {
			return !player.hasEnabledSlot() || player.hp == 1;
		},
		content() {
			"step 0";
			player.awakenSkill("drlt_poshi");
			player.loseMaxHp();
			"step 1";
			var num = player.maxHp - player.countCards("h");
			if (num > 0) player.draw(num);
			player.changeSkills(["drlt_huairou"], ["drlt_jueyan"]);
		},
	},
	drlt_huairou: {
		audio: 2,
		enable: "phaseUse",
		position: "he",
		filter: (event, player) => player.hasCard(card => lib.skill.drlt_huairou.filterCard(card, player), lib.skill.drlt_huairou.position),
		filterCard: (card, player) => get.type(card) == "equip" && player.canRecast(card),
		check(card) {
			if (!_status.event.player.canEquip(card)) return 5;
			return 3 - get.value(card);
		},
		content() {
			player.recast(cards);
		},
		discard: false,
		lose: false,
		delay: false,
		prompt: "将一张装备牌置入弃牌堆并摸一张牌",
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
	},
	drlt_yongsi: {
		audio: 2,
		group: ["drlt_yongsi_1", "drlt_yongsi_2"],
		locked: true,
		subSkill: {
			1: {
				audio: "drlt_yongsi",
				trigger: {
					player: "phaseDrawBegin2",
				},
				forced: true,
				filter(event, player) {
					return !event.numFixed;
				},
				content() {
					trigger.num = game.countGroup();
				},
			},
			2: {
				audio: "drlt_yongsi",
				trigger: {
					player: "phaseUseEnd",
				},
				forced: true,
				filter(event, player) {
					var num = 0;
					player.getHistory("sourceDamage", function (evt) {
						if (evt.getParent("phaseUse") == event) num += evt.num;
					});
					return !num || num > 1;
				},
				content() {
					var numx = 0;
					player.getHistory("sourceDamage", function (evt) {
						if (evt.getParent("phaseUse") == trigger) numx += evt.num;
					});
					if (!numx) {
						var num = player.hp - player.countCards("h");
						if (num > 0) player.draw(num);
					} else {
						player.addTempSkill("drlt_yongsi1", { player: "phaseDiscardAfter" });
					}
				},
			},
		},
	},
	drlt_yongsi1: {
		mod: {
			maxHandcard(player, num) {
				return num + player.maxHp - 2 * Math.max(0, player.hp);
			},
		},
	},
	drlt_weidi: {
		audio: 2,
		forceaudio: true,
		unique: true,
		zhuSkill: true,
		trigger: {
			player: "phaseDiscardBegin",
		},
		direct: true,
		filter(event, player) {
			if (!player.hasZhuSkill("drlt_weidi")) return false;
			return (
				player.needsToDiscard() > 0 &&
				game.countPlayer(function (current) {
					return current != player && current.group == "qun";
				}) > 0
			);
		},
		content() {
			"step 0";
			var num = Math.min(
				player.needsToDiscard(),
				game.countPlayer(function (target) {
					return target != player && target.group == "qun";
				})
			);
			if (num) {
				player.chooseCardTarget({
					prompt: get.prompt("drlt_weidi"),
					prompt2: "你可以将" + (num > 1 ? "至多" : "") + get.cnNumber(num) + "张手牌交给等量的其他群势力角色。先按顺序选中所有要给出的手牌，然后再按顺序选择等量的目标角色",
					selectCard: [1, num],
					selectTarget() {
						return ui.selected.cards.length;
					},
					filterTarget(card, player, target) {
						return target != player && target.group == "qun";
					},
					complexSelect: true,
					filterOk() {
						return ui.selected.cards.length == ui.selected.targets.length;
					},
					ai1(card) {
						var player = _status.event.player;
						var value = get.value(card, player, "raw");
						if (
							game.hasPlayer(function (target) {
								return target != player && target.group == "qun" && !ui.selected.targets.includes(target) && get.sgn(value) == get.sgn(get.attitude(player, target));
							})
						)
							return 1 / Math.max(1, get.useful(card));
						return -1;
					},
					ai2(target) {
						var player = _status.event.player;
						var card = ui.selected.cards[ui.selected.targets.length];
						if (card && get.value(card, player, "raw") < 0) return -get.attitude(player, target);
						return get.attitude(player, target);
					},
				});
			} else event.finish();
			"step 1";
			if (result.bool && result.cards.length > 0) {
				var list = [];
				for (var i = 0; i < result.targets.length; i++) {
					var target = result.targets[i];
					var card = result.cards[i];
					list.push([target, card]);
				}
				player.logSkill("drlt_weidi", result.targets);
				game.loseAsync({
					gain_list: list,
					player: player,
					cards: result.cards,
					giver: player,
					animate: "giveAuto",
				}).setContent("gaincardMultiple");
			} else event.finish();
		},
	},
	drlt_xiongluan: {
		audio: 2,
		unique: true,
		enable: "phaseUse",
		mark: true,
		skillAnimation: true,
		animationColor: "gray",
		limited: true,
		filter(event, player) {
			return !player.isDisabledJudge() || player.hasEnabledSlot();
		},
		filterTarget(card, player, target) {
			return target != player;
		},
		content() {
			player.awakenSkill("drlt_xiongluan");
			var disables = [];
			for (var i = 1; i <= 5; i++) {
				for (var j = 0; j < player.countEnabledSlot(i); j++) {
					disables.push(i);
				}
			}
			if (disables.length > 0) player.disableEquip(disables);
			player.disableJudge();
			player.addTempSkill("drlt_xiongluan1");
			player.storage.drlt_xiongluan1 = target;
			target.addSkill("drlt_xiongluan2");
			target.markSkillCharacter("drlt_xiongluan1", player, "雄乱", "无法使用或打出任何手牌");
		},
		ai: {
			order: 13,
			result: {
				target: (player, target) => {
					let hs = player.countCards("h", card => {
							if (!get.tag(card, "damage") || get.effect(target, card, player, player) <= 0) return 0;
							if (get.name(card, player) === "sha") {
								if (target.getEquip("bagua")) return 0.5;
								if (target.getEquip("rewrite_bagua")) return 0.25;
							}
							return 1;
						}),
						ts =
							target.hp +
							target.hujia +
							game.countPlayer(current => {
								if (get.attitude(current, target) > 0) return current.countCards("hs") / 8;
								return 0;
							});
					if (hs >= ts) return -hs;
					return 0;
				},
			},
		},
		intro: {
			content: "limited",
		},
	},
	drlt_xiongluan1: {
		onremove(player) {
			player.storage.drlt_xiongluan1.removeSkill("drlt_xiongluan2");
			player.storage.drlt_xiongluan1.unmarkSkill("drlt_xiongluan1");
			delete player.storage.drlt_xiongluan1;
		},
		mod: {
			targetInRange(card, player, target) {
				if (target.hasSkill("drlt_xiongluan2")) {
					return true;
				}
			},
			cardUsableTarget(card, player, target) {
				if (target.hasSkill("drlt_xiongluan2")) return true;
			},
		},
		charlotte: true,
	},
	drlt_xiongluan2: {
		mod: {
			cardEnabled2(card, player) {
				if (get.position(card) == "h") return false;
			},
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) return [0, -999999];
				},
			},
		},
		charlotte: true,
	},
	drlt_congjian: {
		audio: 2,
		audioname2: { tongyuan: "ocongjian_tongyuan" },
		trigger: {
			target: "useCardToTargeted",
		},
		direct: true,
		filter(event, player) {
			return get.type(event.card) == "trick" && event.targets.length > 1 && player.countCards("he") > 0;
		},
		content() {
			"step 0";
			player.chooseCardTarget({
				filterCard: true,
				selectCard: 1,
				position: "he",
				filterTarget(card, player, target) {
					return player != target && _status.event.targets.includes(target);
				},
				ai1(card) {
					if (card.name == "du") return 20;
					if (_status.event.player.storage.drlt_xiongluan && get.type(card) == "equip") return 15;
					return 6 - get.value(card);
				},
				ai2(target) {
					var att = get.attitude(_status.event.player, target);
					if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
						if (target.hasSkillTag("nodu")) return 0.1;
						return 1 - att;
					}
					return att - 3;
				},
				prompt: get.prompt2("drlt_congjian"),
				targets: trigger.targets,
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("drlt_congjian", target);
				player.give(result.cards, target, "give");
				var num = 1;
				if (get.type(result.cards[0]) == "equip") num = 2;
				player.draw(num);
			}
		},
	},
	drlt_wanglie: {
		locked: false,
		mod: {
			targetInRange(card, player, target, now) {
				if (game.online) {
					if (!player.countUsed()) return true;
				} else {
					var evt = _status.event.getParent("phaseUse");
					if (
						evt &&
						evt.name == "phaseUse" &&
						player.getHistory("useCard", function (evt2) {
							return evt2.getParent("phaseUse") == evt;
						}).length == 0
					)
						return true;
				}
			},
		},
		audio: 2,
		trigger: {
			player: "useCard",
		},
		filter(event, player) {
			return player.isPhaseUsing() && (event.card.name == "sha" || get.type(event.card) == "trick");
		},
		preHidden: true,
		check(event, player) {
			if (["wuzhong", "kaihua", "dongzhuxianji"].includes(event.card.name)) return false;
			player._wanglie_temp = true;
			var eff = 0;
			for (var i of event.targets) {
				eff += get.effect(i, event.card, player, player);
			}
			delete player._wanglie_temp;
			if (eff < 0) return true;
			if (
				!player.countCards("h", function (card) {
					return player.hasValueTarget(card, null, true);
				})
			)
				return true;
			if (
				get.tag(event.card, "damage") &&
				!player.needsToDiscard() &&
				!player.countCards("h", function (card) {
					return get.tag(card, "damage") && player.hasValueTarget(card, null, true);
				})
			)
				return true;
			return false;
		},
		prompt2(event) {
			return "令" + get.translation(event.card) + "不能被响应，然后本阶段不能再使用牌";
		},
		content() {
			trigger.nowuxie = true;
			trigger.directHit.addArray(game.players);
			player.addTempSkill("drlt_wanglie2", "phaseUseAfter");
		},
		ai: {
			pretao: true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "pretao") return true;
				if (player._wanglie_temp) return false;
				player._wanglie_temp = true;
				var bool = (function () {
					if (["wuzhong", "kaihua", "dongzhuxianji"].includes(arg.card.name)) return false;
					if (get.attitude(player, arg.target) > 0 || !player.isPhaseUsing()) return false;
					var cards = player.getCards("h", function (card) {
						return card != arg.card && (!arg.card.cards || !arg.card.cards.includes(card));
					});
					var sha = player.getCardUsable("sha");
					if (arg.card.name == "sha") sha--;
					cards = cards.filter(function (card) {
						if (card.name == "sha" && sha <= 0) return false;
						return player.hasValueTarget(card, null, true);
					});
					if (!cards.length) return true;
					if (!get.tag(arg.card, "damage")) return false;
					if (
						!player.needsToDiscard() &&
						!cards.filter(function (card) {
							return get.tag(card, "damage");
						}).length
					)
						return true;
					return false;
				})();
				delete player._wanglie_temp;
				return bool;
			},
		},
	},
	drlt_wanglie2: {
		mod: {
			cardEnabled(card, player) {
				return false;
			},
		},
	},
	liangyin: {
		audio: 2,
		group: ["liangyin_1", "liangyin_2"],
		subSkill: {
			1: {
				trigger: {
					global: ["loseAfter", "addToExpansionAfter", "cardsGotoSpecialAfter", "loseAsyncAfter"],
				},
				filter(event, player, name) {
					if (event.name == "lose" || event.name == "loseAsync") return event.getlx !== false && event.toStorage == true;
					if (event.name == "cardsGotoSpecial") return !event.notrigger;
					return true;
				},
				direct: true,
				content() {
					"step 0";
					player.chooseTarget("是否发动【良姻】令手牌数大于你的一名角色摸一张牌？", function (card, player, target) {
						return target != player && target.countCards("h") > player.countCards("h");
					}).ai = function (target) {
						return get.attitude(player, target);
					};
					"step 1";
					if (result.bool) {
						player.logSkill("liangyin", result.targets);
						result.targets[0].draw();
					}
				},
				sub: true,
			},
			2: {
				trigger: {
					global: "gainAfter",
				},
				filter(event, player) {
					return (
						event.fromStorage == true ||
						game.hasPlayer2(function (current) {
							var evt = event.getl(current);
							return evt && evt.xs && evt.xs.length > 0;
						})
					);
				},
				direct: true,
				content() {
					"step 0";
					player.chooseTarget("是否发动【良姻】令手牌数小于你的一名角色弃置一张牌？", function (card, player, target) {
						return target != player && target.countCards("h") < player.countCards("h") && target.countCards("he") > 0;
					}).ai = function (target) {
						return -get.attitude(player, target);
					};
					"step 1";
					if (result.bool) {
						player.logSkill("liangyin", result.targets);
						result.targets[0].chooseToDiscard("he", 1, true);
					}
				},
				sub: true,
			},
		},
	},
	kongsheng: {
		audio: 2,
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		direct: true,
		filter(event, player) {
			return player.countCards("he") > 0;
		},
		content() {
			"step 0";
			player.chooseCard(get.prompt("kongsheng"), "将任意张牌置于武将牌上", "he", [1, player.countCards("he")]).set("ai", function (card) {
				if (get.position(card) == "e") return 1 - get.value(card);
				if (card.name == "shan" || card.name == "du" || !player.hasValueTarget(card)) return 1;
				return 4 - get.value(card);
			});
			"step 1";
			if (result.bool) {
				player.logSkill("kongsheng");
				player.addSkill("kongsheng2");
				player.addToExpansion(result.cards, "log", "give", player).gaintag.add("kongsheng2");
			}
		},
	},
	kongsheng_ai: { ai: { reverseOrder: true } },
	kongsheng2: {
		audio: "kongsheng",
		marktext: "箜",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		trigger: {
			player: "phaseJieshuBegin",
		},
		filter(event, player) {
			return player.getExpansions("kongsheng2").length > 0;
		},
		forced: true,
		charlotte: true,
		content() {
			"step 0";
			player.addTempSkill("kongsheng_ai", "kongsheng2After");
			"step 1";
			var cards = player.getExpansions("kongsheng2").filter(function (i) {
				return get.type(i, false) == "equip" && player.hasUseTarget(i);
			});
			if (cards.length == 1) {
				event._result = { bool: true, links: cards };
			} else if (cards.length)
				player.chooseButton(true, ["选择要使用的装备牌", cards]).set("ai", function (button) {
					return get.order(button.link);
				});
			else event.goto(3);
			"step 2";
			if (result.bool) {
				player.chooseUseTarget(result.links[0], true);
				event.goto(1);
			}
			"step 3";
			var cards = player.getExpansions("kongsheng2");
			if (cards.length) player.gain(cards, "gain2");
		},
	},
	nzry_juzhan: {
		audio: "nzry_juzhan_1",
		mark: true,
		locked: false,
		zhuanhuanji: true,
		marktext: "☯",
		intro: {
			content(storage, player, skill) {
				if (player.storage.nzry_juzhan == true) return "当你使用【杀】指定一名角色为目标后，你可以获得其一张牌，然后你本回合内不能再对其使用牌";
				return "当你成为其他角色【杀】的目标后，你可以与其各摸一张牌，然后其本回合内不能再对你使用牌";
			},
		},
		group: ["nzry_juzhan_1", "nzry_juzhan_2"],
		subSkill: {
			1: {
				audio: 2,
				trigger: {
					target: "useCardToTargeted",
				},
				prompt2: "当你成为其他角色【杀】的目标后，你可以与其各摸一张牌，然后其本回合内不能再对你使用牌。",
				filter(event, player) {
					return event.card.name == "sha" && !player.storage.nzry_juzhan;
				},
				logTarget: "player",
				content() {
					"step 0";
					game.asyncDraw([player, trigger.player]);
					trigger.player.addTempSkill("nzry_juzhany");
					player.changeZhuanhuanji("nzry_juzhan");
					player.addTempSkill("nzry_juzhanx");
					"step 1";
					game.delayx();
				},
			},
			2: {
				audio: "nzry_juzhan_1",
				trigger: {
					player: "useCardToPlayered",
				},
				prompt2: "当你使用【杀】指定一名角色为目标后，你可以获得其一张牌，然后你本回合内不能再对其使用牌",
				filter(event, player) {
					return event.card.name == "sha" && player.storage.nzry_juzhan == true && event.target.countGainableCards(player, "he") > 0;
				},
				check(event, player) {
					return event.player.countCards("he") > 0 && event.targets && event.targets.length == 1;
				},
				logTarget: "target",
				content() {
					player.gainPlayerCard(trigger.targets[0], "he", true);
					player.changeZhuanhuanji("nzry_juzhan");
					trigger.target.addTempSkill("nzry_juzhanx");
					player.addTempSkill("nzry_juzhany");
				},
			},
		},
	},
	nzry_juzhanx: {
		mod: {
			targetEnabled(card, player, target) {
				if (player.hasSkill("nzry_juzhany")) return false;
			},
		},
	},
	nzry_juzhany: {},
	nzry_feijun: {
		init: player => {
			if (!Array.isArray(player.storage.nzry_feijun)) player.storage.nzry_feijun = [];
		},
		intro: {
			content(storage) {
				if (!storage || !storage.length) return "尚未发动";
				var str = get.translation(storage);
				return "已对" + str + "发动过〖飞军〗";
			},
		},
		mark: true,
		enable: "phaseUse",
		usable: 1,
		position: "he",
		audio: 2,
		filter(event, player) {
			return (
				game.hasPlayer(function (current) {
					return current.countCards("h") >= player.countCards("h");
				}) ||
				game.hasPlayer(function (current) {
					return current.countCards("e") >= player.countCards("e");
				}) > 0
			);
		},
		filterCard: true,
		check(card) {
			return 5 - get.value(card);
		},
		content() {
			"step 0";
			var list = [];
			if (
				game.hasPlayer(function (current) {
					return current.countCards("h") > player.countCards("h");
				})
			)
				list.push("令一名手牌数大于你的角色交给你一张牌");
			if (
				game.hasPlayer(function (current) {
					return current.countCards("e") > player.countCards("e");
				}) > 0
			)
				list.push("令一名装备区内牌数大于你的角色弃置一张装备牌");
			if (list.length == 0) event.finish();
			else if (list.length < 2) {
				if (
					game.hasPlayer(function (current) {
						return current.countCards("h") > player.countCards("h");
					})
				)
					event._result = { index: 0 };
				else event._result = { index: 1 };
			} else {
				player
					.chooseControl()
					.set("ai", function () {
						if (
							game.hasPlayer(function (current) {
								return current.countCards("h") > player.countCards("h") && get.attitude(player, current) < 0;
							})
						)
							return 0;
						return 1;
					})
					.set("choiceList", list);
			}
			"step 1";
			event.index = result.index;
			if (result.index == 0) {
				player
					.chooseTarget(function (card, player, target) {
						return target != player && target.countCards("h") > player.countCards("h");
					}, "选择一名手牌数大于你的角色")
					.set("ai", function (target) {
						return -get.attitude(player, target);
					});
			} else {
				player.chooseTarget(function (card, player, target) {
					return target.countCards("e") > player.countCards("e") && target != player;
				}, "选择一名装备区里牌数大于你的角色").ai = function (target) {
					return -get.attitude(player, target);
				};
			}
			"step 2";
			if (result.bool) {
				event.target = result.targets[0];
				var list = player.getStorage("nzry_feijun");
				if (!list.includes(event.target)) {
					event._nzry_binglve = true;
					player.markAuto("nzry_feijun", [event.target]);
				}
				player.line(event.target, "green");
				if (event.index == 0) {
					event.target.chooseCard("he", true, "选择一张牌交给" + get.translation(player)).set("ai", function (card) {
						return 6 - get.value(card);
					});
				} else {
					event.target.chooseToDiscard("he", true, { type: "equip" }, "请弃置一张装备牌");
					event.finish();
				}
			} else {
				event.finish();
			}
			"step 3";
			if (result.bool) {
				target.give(result.cards, player);
			}
		},
		ai: {
			order: 11,
			result: {
				player(player) {
					if (
						game.hasPlayer(function (current) {
							return (current.countCards("h") > player.countCards("h") || current.countCards("e") > player.countCards("e")) && get.attitude(player, current) < 0 && player.getStorage("nzry_feijun").includes(current);
						}) ||
						game.hasPlayer(function (current) {
							return current.countCards("h") > player.countCards("h") && get.attitude(player, current) < 0;
						}) ||
						(player.countCards("h") >= 2 &&
							game.hasPlayer(function (current) {
								return current.countCards("e") > player.countCards("e") && get.attitude(player, current) < 0;
							}))
					)
						return 1;
				},
			},
		},
	},
	nzry_binglve: {
		audio: 2,
		trigger: { player: "nzry_feijunAfter" },
		forced: true,
		filter(event, player) {
			return event._nzry_binglve == true;
		},
		content() {
			player.draw(2);
		},
		ai: { combo: "nzry_feijun" },
	},
	nzry_huaiju_ai: {
		charlotte: true,
		ai: {
			filterDamage: true,
			skillTagFilter(player, tag, arg) {
				if (!player.hasMark("nzry_huaiju")) return false;
				if (
					!game.hasPlayer(function (current) {
						return current.hasSkill("tachibana_effect");
					})
				)
					return false;
				if (arg && arg.player) {
					if (arg.player.hasSkillTag("jueqing", false, player)) return false;
				}
			},
		},
	},
	nzry_huaiju: {
		marktext: "橘",
		intro: {
			name: "怀橘",
			name2: "橘",
			content: "当前有#个“橘”",
		},
		audio: 2,
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		filter(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		content() {
			player.addMark("nzry_huaiju", 3);
			player.addSkill("nzry_huaiju_ai");
		},
		group: ["tachibana_effect"],
	},
	//没错 这是个橘
	tachibana_effect: {
		audio: "nzry_huaiju",
		trigger: {
			global: ["damageBegin4", "phaseDrawBegin2"],
		},
		forced: true,
		filter(event, player) {
			return event.player.hasMark("nzry_huaiju") && (event.name == "damage" || !event.numFixed);
		},
		content() {
			player.line(trigger.player, "green");
			if (trigger.name == "damage") {
				trigger.cancel();
				trigger.player.removeMark("nzry_huaiju", 1);
			} else trigger.num++;
		},
	},
	nzry_yili: {
		audio: 2,
		trigger: {
			player: "phaseUseBegin",
		},
		direct: true,
		content() {
			"step 0";
			player.chooseTarget(get.prompt("nzry_yili"), "移去一个【橘】或失去1点体力，然后令一名其他角色获得一个【橘】", function (card, player, target) {
				return target != player;
			}).ai = function (target) {
				var player = _status.event.player;
				if (player.storage.nzry_huaiju > 2 || player.hp > 2) return get.attitude(player, target);
				return -1;
			};
			"step 1";
			if (result.bool) {
				event.target = result.targets[0];
				if (player.hasMark("nzry_huaiju")) {
					player
						.chooseControl()
						.set("choiceList", ["失去1点体力", "移去一个“橘”"])
						.set("ai", function () {
							if (player.hp > 2) return 0;
							return 1;
						});
				} else event._result = { index: 0 };
			} else {
				event.finish();
			}
			"step 2";
			player.logSkill("nzry_yili", target);
			if (result.index == 1) {
				player.removeMark("nzry_huaiju", 1);
			} else {
				player.loseHp();
			}
			target.addMark("nzry_huaiju", 1);
			target.addSkill("nzry_huaiju_ai");
		},
		ai: {
			combo: "nzry_huaiju",
		},
	},
	nzry_zhenglun: {
		audio: 2,
		trigger: {
			player: "phaseDrawBefore",
		},
		filter(event, player) {
			return !player.hasMark("nzry_huaiju");
		},
		check(event, player) {
			return player.countCards("h") >= 2 || player.skipList.includes("phaseUse");
		},
		content() {
			trigger.cancel();
			player.addMark("nzry_huaiju", 1);
		},
		ai: {
			combo: "nzry_huaiju",
		},
	},
	nzry_kuizhu: {
		audio: 2,
		trigger: {
			player: "phaseDiscardAfter",
		},
		direct: true,
		filter(event, player) {
			var cards = [];
			player.getHistory("lose", function (evt) {
				if (evt.type == "discard" && evt.getParent("phaseDiscard") == event) cards.addArray(evt.cards2);
			});
			return cards.length > 0;
		},
		content() {
			"step 0";
			var cards = [];
			player.getHistory("lose", function (evt) {
				if (evt.type == "discard" && evt.getParent("phaseDiscard") == trigger) cards.addArray(evt.cards2);
			});
			event.num = cards.length;
			event.str1 = "令至多" + event.num + "名角色摸一张牌";
			event.str2 = "对任意名体力值之和为" + event.num + "的角色造成1点伤害";
			player
				.chooseControl("cancel2")
				.set("ai", function () {
					if (
						game.countPlayer(function (current) {
							return get.attitude(player, current) < 0 && current.hp == event.num;
						}) > 0 &&
						event.num <= 3
					)
						return 1;
					return 0;
				})
				.set("choiceList", [event.str1, event.str2])
				.set("prompt", "是否发动【溃诛】？");
			"step 1";
			if (result.control == "cancel2") event.finish();
			event.control = [event.str1, event.str2][result.index];
			"step 2";
			var str = "请选择〖溃诛〗的目标";
			if (event.bool == false) str = "<br>所选目标体力之和不足" + event.num + "，请重选";
			if (event.control == event.str2) {
				player
					.chooseTarget(str, function (card, player, target) {
						var targets = ui.selected.targets;
						var num = 0;
						for (var i = 0; i < targets.length; i++) {
							num += targets[i].hp;
						}
						return num + target.hp <= _status.event.num;
					})
					.set("ai", function (target) {
						if (ui.selected.targets[0] != undefined) return -1;
						return get.attitude(player, target) < 0;
					})
					.set("promptbar", "none")
					.set("num", event.num)
					.set("selectTarget", function () {
						var targets = ui.selected.targets;
						var num = 0;
						for (var i = 0; i < targets.length; i++) {
							num += targets[i].hp;
						}
						if (num == _status.event.num) return ui.selected.targets.length;
						return ui.selected.targets.length + 1;
					});
			} else {
				player.chooseTarget("请选择〖溃诛〗的目标", [1, event.num]).ai = function (target) {
					return get.attitude(player, target);
				};
			}
			"step 3";
			if (result.bool) {
				var targets = result.targets.sortBySeat();
				if (event.control == event.str1) {
					//player.line(targets);
					player.logSkill("nzry_kuizhu", targets);
					game.asyncDraw(targets);
				} else {
					var num = 0;
					for (var i = 0; i < targets.length; i++) {
						num += targets[i].hp;
					}
					if (num < event.num) {
						event.bool = false;
						event.goto(2);
					} else {
						//player.line(targets);
						player.logSkill("nzry_kuizhu", targets);
						for (var i = 0; i < targets.length; i++) {
							targets[i].damage();
						}
						//if(targets.length>=2) player.loseHp();
					}
				}
			}
		},
	},
	rechezheng: {
		audio: "nzry_zhizheng",
		trigger: { source: "damageBegin2" },
		filter(event, player) {
			return player.isPhaseUsing() && !player.inRangeOf(event.player);
		},
		forced: true,
		logTarget: "player",
		content() {
			trigger.cancel();
		},
		ai: {
			effect: {
				player(card, player, target) {
					if (get.tag(card, "damage") && !player.inRangeOf(target)) return "zerotarget";
				},
			},
		},
	},
	nzry_zhizheng: {
		audio: 2,
		//mod:{
		//	playerEnabled:function(card,player,target){
		//		var info=get.info(card);
		//		if(target!=player&&(!info||!info.singleCard||!ui.selected.targets.length)&&player.isPhaseUsing()&&!target.inRange(player)) return false;
		//	},
		//},
		trigger: {
			player: "phaseUseEnd",
		},
		forced: true,
		filter(event, player) {
			return (
				player.getHistory("useCard", function (evt) {
					return evt.getParent("phaseUse") == event;
				}).length <
					game.countPlayer(function (current) {
						return current != player && !current.inRange(player);
					}) &&
				game.hasPlayer(function (target) {
					return target != player && !target.inRange(player) && target.countDiscardableCards(player, "he");
				})
			);
		},
		content() {
			"step 0";
			player.chooseTarget("请选择〖掣政〗的目标", "弃置一名攻击范围内不包含你的角色的一张牌", true, function (card, player, target) {
				return target != player && !target.inRange(player) && target.countDiscardableCards(player, "he");
			}).ai = function (target) {
				return -get.attitude(player, target);
			};
			"step 1";
			if (result.bool) {
				player.line(result.targets);
				player.discardPlayerCard(result.targets[0], "he", 1, true);
			}
		},
		group: "rechezheng",
	},
	nzry_lijun: {
		unique: true,
		global: "nzry_lijun1",
		audio: "nzry_lijun1",
		zhuSkill: true,
	},
	nzry_lijun2: {
		mod: {
			cardUsable(card, player, num) {
				if (card.name == "sha") return num + player.countMark("nzry_lijun2");
			},
		},
		onremove: true,
	},
	nzry_lijun1: {
		audio: 2,
		//forceaudio:true,
		trigger: {
			player: "useCardAfter",
		},
		filter(event, player) {
			if (event.card.name != "sha" || player.group != "wu") return false;
			if (player.hasSkill("nzry_lijun2")) return false;
			if (!player.isPhaseUsing()) return false;
			if (
				!game.hasPlayer(function (target) {
					return player != target && target.hasZhuSkill("nzry_lijun", player);
				})
			)
				return false;
			for (var i = 0; i < event.cards.length; i++) {
				if (get.position(event.cards[i], true) == "o") {
					return true;
				}
			}
			return false;
		},
		direct: true,
		content() {
			"step 0";
			var list = game.filterPlayer(function (target) {
				return player != target && target.hasZhuSkill("nzry_lijun", player);
			});
			player.chooseTarget(get.prompt("nzry_lijun"), "将" + get.translation(trigger.cards) + "交给" + get.translation(list) + (list.length > 1 ? "中的一人" : ""), function (card, player, target) {
				return player != target && target.hasZhuSkill("nzry_lijun", player);
			}).ai = function (target) {
				return get.attitude(_status.event.player, target);
			};
			"step 1";
			if (!result.bool) event.finish();
			else {
				player.addTempSkill("nzry_lijun2", "phaseUseEnd");
				var zhu = result.targets[0];
				player.line(zhu, "green");
				zhu.logSkill("nzry_lijun");
				var list = [];
				for (var i = 0; i < trigger.cards.length; i++) {
					if (get.position(trigger.cards[i], true) == "o") {
						list.push(trigger.cards[i]);
					}
				}
				zhu.gain(list, "gain2").giver = player;
				zhu.chooseBool()
					.set("ai", function () {
						if (get.attitude(zhu, player) > 0) return true;
						return false;
					})
					.set("prompt", "是否令" + get.translation(player) + "摸一张牌？");
			}
			"step 2";
			if (result.bool) {
				player.draw();
				player.addMark("nzry_lijun2", 1, false);
			}
		},
	},
	nzry_chenglve: {
		mark: true,
		locked: false,
		zhuanhuanji: true,
		marktext: "☯",
		intro: {
			content(storage, player, skill) {
				var str = player.storage.nzry_chenglve ? "出牌阶段限一次，你可以摸两张牌，然后弃置一张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制" : "出牌阶段限一次，你可以摸一张牌，然后弃置两张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制";
				if (player.storage.nzry_chenglve1) {
					str += "<br><li>当前花色：";
					str += get.translation(player.storage.nzry_chenglve1);
				}
				return str;
			},
		},
		enable: "phaseUse",
		usable: 1,
		audio: 2,
		content() {
			"step 0";
			if (player.storage.nzry_chenglve == true) {
				player.draw(2);
				player.chooseToDiscard("h", true);
			} else {
				player.draw();
				player.chooseToDiscard("h", 2, true);
			}
			player.changeZhuanhuanji("nzry_chenglve");
			"step 1";
			if (result.bool) {
				player.storage.nzry_chenglve1 = [];
				for (var i = 0; i < result.cards.length; i++) {
					player.storage.nzry_chenglve1.add(get.suit(result.cards[i], player));
				}
				player.markSkill("nzry_chenglve");
				player.addTempSkill("nzry_chenglve1");
			}
		},
		ai: {
			order: 2.7,
			result: {
				player(player) {
					if (!player.storage.nzry_chenglve && player.countCards("h") < 3) return 0;
					return 1;
				},
			},
		},
	},
	nzry_chenglve1: {
		mod: {
			cardUsable(card, player) {
				const suit = get.suit(card);
				if (suit == "unsure" || player.getStorage("nzry_chenglve1").includes(suit)) return Infinity;
			},
			targetInRange(card, player) {
				const suit = get.suit(card);
				if (suit == "unsure" || player.getStorage("nzry_chenglve1").includes(suit)) return true;
			},
		},
		onremove: true,
	},
	nzry_shicai: {
		audio: "nzry_shicai_2",
		trigger: { player: ["useCardAfter", "useCardToTargeted"] },
		prompt2(event, player) {
			const cards = event.cards.filterInD("oe");
			return "你可以将" + get.translation(cards) + (cards.length > 1 ? "以任意顺序" : "") + "置于牌堆顶，然后摸一张牌";
		},
		filter(event, player) {
			if (!event.cards.someInD()) return false;
			let evt = event,
				type = get.type2(evt.card, false);
			if (event.name == "useCardToTargeted") {
				if (type != "equip" || player != event.target) return false;
				evt = evt.getParent();
			} else {
				if (type == "equip") return false;
			}
			return !player.hasHistory(
				"useCard",
				evtx => {
					return evtx != evt && get.type2(evtx.card, false) == type;
				},
				evt
			);
		},
		check(event, player) {
			if (get.type(event.card) == "equip") {
				if (get.subtype(event.card) == "equip6") return true;
				if (get.equipResult(player, player, event.card.name) <= 0) return true;
				var eff1 = player.getUseValue(event.card);
				var subtype = get.subtype(event.card);
				return (
					player.countCards("h", function (card) {
						return get.subtype(card) == subtype && player.getUseValue(card) >= eff1;
					}) > 0
				);
			}
			return true;
		},
		content() {
			"step 0";
			var cards = trigger.cards.filterInD();
			if (cards.length == 1) {
				event._result = { bool: true, moved: [cards] };
			} else {
				var next = player.chooseToMove("恃才：将牌按顺序置于牌堆顶", true);
				next.set("list", [["牌堆顶", cards]]);
				next.set("reverse", _status.currentPhase && _status.currentPhase.next ? get.attitude(player, _status.currentPhase.next) > 0 : false);
				next.set("processAI", function (list) {
					var cards = list[0][1].slice(0);
					cards.sort(function (a, b) {
						return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
					});
					return [cards];
				});
			}
			"step 1";
			if (result.bool) {
				var cards = result.moved[0];
				cards.reverse();
				game.cardsGotoPile(cards, "insert");
				game.log(player, "将", cards, "置于了牌堆顶");
			}
			player.draw();
		},
		subSkill: { 2: { audio: 2 } },
		ai: {
			reverseOrder: true,
			skillTagFilter(player) {
				if (
					player.getHistory("useCard", function (evt) {
						return get.type(evt.card) == "equip";
					}).length > 0
				)
					return false;
			},
			effect: {
				target(card, player, target) {
					if (
						player == target &&
						get.type(card) == "equip" &&
						!player.getHistory("useCard", function (evt) {
							return get.type(evt.card) == "equip";
						}).length
					)
						return [1, 3];
				},
			},
		},
	},
	nzry_cunmu: {
		audio: 2,
		audioname: ["ol_pengyang"],
		trigger: {
			player: "drawBegin",
		},
		forced: true,
		content() {
			trigger.bottom = true;
		},
	},
	nzry_mingren: {
		audio: "nzry_mingren_1",
		audioname: ["sb_yl_luzhi"],
		marktext: "任",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		group: ["nzry_mingren_1", "nzry_mingren_2"],
		ai:{
			combo: "nzry_zhenliang",
		},
		subSkill: {
			1: {
				audio: 2,
				audioname: ["sb_yl_luzhi"],
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				forced: true,
				locked: false,
				filter(event, player) {
					return (event.name != "phase" || game.phaseNumber == 0) && !player.getExpansions("nzry_mingren").length;
				},
				content() {
					"step 0";
					player.draw(2);
					"step 1";
					if (!player.countCards("h")) event.finish();
					else
						player.chooseCard("h", "将一张手牌置于武将牌上，称为“任”", true).set("ai", function (card) {
							return 6 - get.value(card);
						});
					"step 2";
					if (result.bool) {
						player.addToExpansion(result.cards[0], player, "give", "log").gaintag.add("nzry_mingren");
					}
				},
			},
			2: {
				trigger: {
					player: "phaseJieshuBegin",
				},
				filter(event, player) {
					return player.countCards("h") > 0 && player.getExpansions("nzry_mingren").length > 0;
				},
				direct: true,
				content() {
					"step 0";
					player.chooseCard("h", get.prompt("nzry_mingren"), "选择一张手牌替换“任”（" + get.translation(player.getExpansions("nzry_mingren")[0]) + "）").set("ai", function (card) {
						var player = _status.event.player;
						var color = get.color(card);
						if (color == get.color(player.getExpansions("nzry_mingren")[0])) return false;
						var num = 0;
						var list = [];
						player.countCards("h", function (cardx) {
							if (cardx != card || get.color(cardx) != color) return false;
							if (list.includes(cardx.name)) return false;
							list.push(cardx.name);
							switch (cardx.name) {
								case "wuxie":
									num += game.countPlayer() / 2.2;
									break;
								case "caochuan":
									num += 1.1;
									break;
								case "shan":
									num += 1;
									break;
							}
						});
						return num * (30 - get.value(card));
					});
					"step 1";
					if (result.bool) {
						player.logSkill("nzry_mingren");
						player.addToExpansion(result.cards[0], "log", "give", player).gaintag.add("nzry_mingren");
						var card = player.getExpansions("nzry_mingren")[0];
						if (card) player.gain(card, "gain2");
					}
				},
			},
		},
	},
	nzry_zhenliang: {
		audio: "nzry_zhenliang_1",
		mark: true,
		locked: false,
		zhuanhuanji: true,
		marktext: "☯",
		intro: {
			content(storage, player, skill) {
				if (player.storage.nzry_zhenliang == true) return "当你于回合外使用或打出的牌结算完成后，若此牌与“任”颜色相同，则你可以令一名角色摸一张牌。";
				return "出牌阶段限一次，你可以弃置一张与“任”颜色相同的牌并对攻击范围内的一名角色造成1点伤害。";
			},
		},
		group: ["nzry_zhenliang_1", "nzry_zhenliang_2"],
		subSkill: {
			1: {
				prompt: "弃置一张与“任”颜色相同的牌，并对攻击范围内的一名角色造成1点伤害。",
				audio: 2,
				enable: "phaseUse",
				filter(event, player) {
					if (player.storage.nzry_zhenliang) return false;
					var storage = player.getExpansions("nzry_mingren");
					if (!storage.length) return false;
					var color = get.color(storage[0]);
					if (
						player.countCards("he", function (card) {
							return get.color(card) == color;
						}) == 0
					)
						return false;
					return game.hasPlayer(function (current) {
						return player.inRange(current);
					});
				},
				position: "he",
				filterCard(card, player) {
					return get.color(card) == get.color(player.getExpansions("nzry_mingren")[0]);
				},
				filterTarget(card, player, target) {
					return player.inRange(target);
				},
				check(card) {
					return 6.5 - get.value(card);
				},
				content() {
					player.changeZhuanhuanji("nzry_zhenliang");
					target.damage("nocard");
				},
				ai: {
					order: 5,
					result: {
						player(player, target) {
							return get.damageEffect(target, player, player);
						},
					},
				},
			},
			2: {
				trigger: {
					player: ["useCardAfter", "respondAfter"],
				},
				filter(event, player) {
					if (_status.currentPhase == player || !player.storage.nzry_zhenliang) return false;
					var card = player.getExpansions("nzry_mingren")[0];
					return card && get.color(event.card) == get.color(card);
				},
				direct: true,
				content() {
					"step 0";
					player.chooseTarget(get.prompt("nzry_zhenliang"), "令一名角色摸一张牌").ai = function (target) {
						if (target.hasSkillTag("nogain")) return 0.1;
						var att = get.attitude(player, target);
						return att * (Math.max(5 - target.countCards("h"), 2) + 3);
					};
					"step 1";
					if (result.bool) {
						player.changeZhuanhuanji("nzry_zhenliang");
						player.logSkill("nzry_zhenliang", result.targets);
						result.targets[0].draw();
					}
				},
			},
		},
		ai: {
			combo: "nzry_mingren",
		},
	},
	nzry_jianxiang: {
		audio: 2,
		trigger: {
			target: "useCardToTargeted",
		},
		filter(event, player) {
			return event.player != player;
		},
		direct: true,
		content() {
			"step 0";
			player.chooseTarget(get.prompt("nzry_jianxiang"), "令场上手牌数最少的一名角色摸一张牌", function (card, player, target) {
				return target.isMinHandcard();
			}).ai = function (target) {
				return get.attitude(player, target);
			};
			"step 1";
			if (result.bool) {
				player.logSkill("nzry_jianxiang", result.targets);
				result.targets[0].draw();
			}
		},
	},
	nzry_shenshi: {
		mark: true,
		audio: "nzry_shenshi_1",
		locked: false,
		zhuanhuanji: true,
		marktext: "☯",
		intro: {
			content(storage, player, skill) {
				if (player.storage.nzry_shenshi == true) return "其他角色对你造成伤害后，你可以观看该角色的手牌，然后交给其一张牌，当前角色回合结束时，若此牌仍在该角色的区域内，你将手牌摸至四张";
				return "出牌阶段限一次，你可以将一张牌交给一名手牌数最多的角色，然后对其造成1点伤害，若该角色因此死亡，则你可以令一名角色将手牌摸至四张";
			},
		},
		group: ["nzry_shenshi_1", "nzry_shenshi_2"],
		subSkill: {
			1: {
				audio: 2,
				prompt: "出牌阶段限一次，你可以将一张牌交给一名手牌数最多的角色，然后对其造成1点伤害，若该角色因此死亡，则你可以令一名角色将手牌摸至四张",
				enable: "phaseUse",
				usable: 1,
				filter(event, player) {
					return player.countCards("he") > 0 && player.storage.nzry_shenshi != true;
				},
				discard: false,
				line: true,
				lose: false,
				delay: false,
				position: "he",
				filterCard: true,
				filterTarget(card, player, target) {
					return (
						target != player &&
						!game.hasPlayer(function (current) {
							return current != player && current.countCards("h") > target.countCards("h");
						})
					);
				},
				check(card) {
					return 5 - get.value(card);
				},
				content() {
					"step 0";
					player.changeZhuanhuanji("nzry_shenshi");
					player.give(cards, target);
					target.damage("nocard");
					"step 1";
					if (!target.isIn()) {
						player
							.chooseTarget("令一名角色将手牌摸至四张", function (card, player, target) {
								return target.countCards("h") < 4;
							})
							.set("ai", function (target) {
								return get.attitude(player, target);
							});
					} else {
						event.finish();
					}
					"step 2";
					if (result.bool) {
						player.line(result.targets);
						result.targets[0].draw(4 - result.targets[0].countCards("h"));
					}
				},
				ai: {
					order: 1,
					result: {
						target(player, target) {
							return -1;
						},
					},
				},
			},
			2: {
				audio: "nzry_shenshi_1",
				trigger: {
					player: "damageEnd",
				},
				filter(event, player) {
					return player.countCards("he") > 0 && event.source && event.source != player && player.storage.nzry_shenshi == true;
				},
				check(event, player) {
					return event.source && event.source.countCards("h") <= 2 && player.countCards("h") < 4;
				},
				logTarget: "source",
				prompt2: "其他角色对你造成伤害后，你可以观看该角色的手牌，然后交给其一张牌，当前角色回合结束时，若此牌仍在该角色的区域内，你将手牌摸至四张",
				content() {
					"step 0";
					player.changeZhuanhuanji("nzry_shenshi");
					player.viewHandcards(trigger.source);
					player.chooseCard("he", true, "交给" + get.translation(trigger.source) + "一张牌").set("ai", function (card) {
						return 5 - get.value(card);
					});
					"step 1";
					if (result.bool) {
						player.give(result.cards, trigger.source);
						trigger.source.storage.nzry_shenshi1 = result.cards[0];
						trigger.source.storage.nzry_shenshi2 = player;
						trigger.source.addSkill("nzry_shenshi1");
					}
				},
			},
		},
	},
	nzry_shenshi1: {
		audio: 2,
		trigger: {
			global: "phaseJieshuBegin",
		},
		forced: true,
		popup: false,
		charlotte: true,
		filter(event, player) {
			return player.storage.nzry_shenshi1 != undefined && player.storage.nzry_shenshi2 != undefined;
		},
		content() {
			var pl = player.storage.nzry_shenshi2;
			var card = player.storage.nzry_shenshi1;
			if (player.getCards("he").includes(card) && 4 - pl.countCards("h") > 0) {
				pl.draw(4 - pl.countCards("h"));
				pl.logSkill("nzry_shenshi");
			}
			player.removeSkill("nzry_shenshi1");
			delete player.storage.nzry_shenshi1;
			delete player.storage.nzry_shenshi2;
		},
	},
	xinjushou: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		content() {
			"step 0";
			player.draw(4);
			player.turnOver();
			"step 1";
			player
				.chooseCard("h", true, "弃置一张手牌，若以此法弃置的是装备牌，则你改为使用之")
				.set("ai", function (card) {
					if (get.type(card) == "equip") {
						return 5 - get.value(card);
					}
					return -get.value(card);
				})
				.set("filterCard", lib.filter.cardDiscardable);
			"step 2";
			if (result.bool && result.cards.length) {
				var card = result.cards[0];
				if (get.type(card) == "equip" && player.hasUseTarget(card)) {
					player.chooseUseTarget(card, true, "nopopup");
				} else {
					player.discard(card);
				}
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (card.name == "guiyoujie") return [0, 1];
				},
			},
		},
	},
	xinjiewei: {
		audio: 2,
		enable: "chooseToUse",
		filterCard: true,
		position: "e",
		viewAs: { name: "wuxie" },
		filter(event, player) {
			return player.countCards("e") > 0;
		},
		viewAsFilter(player) {
			return player.countCards("e") > 0;
		},
		prompt: "将一张装备区内的牌当无懈可击使用",
		check(card) {
			return 8 - get.equipValue(card);
		},
		threaten: 1.2,
		group: "xinjiewei_move",
		subSkill: {
			move: {
				trigger: { player: "turnOverEnd" },
				direct: true,
				audio: "jiewei",
				filter(event, player) {
					return !player.isTurnedOver() && player.canMoveCard();
				},
				content() {
					"step 0";
					player
						.chooseToDiscard("he", get.prompt("xinjiewei"), "弃置一张牌并移动场上的一张牌", lib.filter.cardDiscardable)
						.set("ai", function (card) {
							if (!_status.event.check) return 0;
							return 7 - get.value(card);
						})
						.set("check", player.canMoveCard(true))
						.set("logSkill", "xinjiewei");
					"step 1";
					if (result.bool) {
						player.moveCard(true);
					} else {
						event.finish();
					}
				},
			},
		},
	},
	jianchu: {
		shaRelated: true,
		audio: 2,
		audioname: ["re_pangde"],
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			return event.card.name == "sha" && event.target.countDiscardableCards(player, "he") > 0;
		},
		preHidden: true,
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		logTarget: "target",
		content() {
			"step 0";
			player
				.discardPlayerCard(trigger.target, get.prompt("jianchu", trigger.target), true)
				.set("ai", function (button) {
					if (!_status.event.att) return 0;
					if (get.position(button.link) == "e") {
						if (get.subtype(button.link) == "equip2") return 2 * get.value(button.link);
						return get.value(button.link);
					}
					return 1;
				})
				.set("att", get.attitude(player, trigger.target) <= 0);
			"step 1";
			if (result.bool && result.links && result.links.length) {
				if (get.type(result.links[0], null, result.links[0].original == "h" ? player : false) == "equip") {
					trigger.getParent().directHit.add(trigger.target);
				} else if (trigger.cards) {
					var list = [];
					for (var i = 0; i < trigger.cards.length; i++) {
						if (get.position(trigger.cards[i], true) == "o") list.push(trigger.cards[i]);
					}
					if (list.length) trigger.target.gain(list, "gain2", "log");
				}
			}
		},
		ai: {
			unequip_ai: true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "directHit_ai")
					return (
						arg.card.name == "sha" &&
						arg.target.countCards("e", function (card) {
							return get.value(card) > 1;
						}) > 0
					);
				if (arg && arg.name == "sha" && arg.target.getEquip(2)) return true;
				return false;
			},
		},
	},
	redimeng: {
		audio: "dimeng",
		enable: "phaseUse",
		usable: 1,
		position: "he",
		filterCard() {
			if (ui.selected.targets.length == 2) return false;
			return true;
		},
		selectCard: [0, Infinity],
		selectTarget: 2,
		complexCard: true,
		complexSelect: true,
		filterTarget(card, player, target) {
			if (player == target) return false;
			if (ui.selected.targets.length == 0) return true;
			return Math.abs(ui.selected.targets[0].countCards("h") - target.countCards("h")) == ui.selected.cards.length;
		},
		multitarget: true,
		multiline: true,
		content() {
			"step 0";
			var cards = targets[0].getCards("h").concat(targets[1].getCards("h"));
			var dialog = ui.create.dialog("缔盟", true);
			if (player.isUnderControl(true) || targets[0].isUnderControl(true) || targets[1].isUnderControl(true)) {
				dialog.add(cards);
				dialog.seeing = true;
			} else {
				dialog.add([cards, "blank"]);
			}
			_status.dieClose.push(dialog);
			dialog.videoId = lib.status.videoId++;
			game.addVideo("cardDialog", null, ["缔盟", get.cardsInfo(cards), dialog.videoId]);
			game.broadcast(
				function (cards, id, player, targets) {
					var dialog = ui.create.dialog("缔盟", true);
					if (player.isUnderControl(true) || targets[0].isUnderControl(true) || targets[1].isUnderControl(true)) {
						dialog.add(cards);
						dialog.seeing = true;
					} else {
						dialog.add([cards, "blank"]);
					}
					_status.dieClose.push(dialog);
					dialog.videoId = id;
				},
				cards,
				dialog.videoId,
				player,
				targets
			);

			event.current = targets[0];
			event.dialog = dialog;
			event.num1 = 0;
			event.num2 = 0;
			game.delay();
			"step 1";
			if (event.dialog.buttons.length > 1) {
				var next = event.current.chooseButton(true, function (button) {
					return get.value(button.link, _status.event.player);
				});
				next.set("dialog", event.dialog.videoId);
				next.set("closeDialog", false);
				next.set("dialogdisplay", true);
			} else {
				event.directButton = event.dialog.buttons[0];
			}
			"step 2";
			var dialog = event.dialog;
			var card;
			if (event.directButton) {
				card = event.directButton.link;
			} else {
				card = result.links[0];
			}
			for (var i = 0; i < dialog.buttons.length; i++) {
				if (dialog.buttons[i].link == card) {
					var button = dialog.buttons[i];
					if (dialog.seeing) {
						button.querySelector(".info").innerHTML = get.translation(event.current.name);
						if (!_status.connectMode) {
							game.log(event.current, "选择了", button.link);
						}
					}
					dialog.buttons.remove(button);
					break;
				}
			}
			if (card) {
				event.current.gain(card);
				if (dialog.seeing) {
					event.current.$draw(card, "nobroadcast");
				} else {
					event.current.$draw(1, "nobroadcast");
				}
				game.broadcast(
					function (card, id, target) {
						var dialog = get.idDialog(id);
						if (dialog && dialog.seeing) {
							for (var i = 0; i < dialog.buttons.length; i++) {
								if (dialog.buttons[i].link == card) {
									dialog.buttons[i].querySelector(".info").innerHTML = get.translation(target.name);
									dialog.buttons.splice(i--, 1);
									break;
								}
							}
							target.$draw(card, "nobroadcast");
						} else {
							target.$draw(1, "nobroadcast");
						}
					},
					card,
					dialog.videoId,
					event.current
				);
			}
			game.delay(2);
			if (event.current == targets[0]) {
				event.num1++;
				event.current = targets[1];
			} else {
				event.num2++;
				event.current = targets[0];
			}
			if (dialog.buttons.length) {
				event.goto(1);
			}
			"step 3";
			if (!_status.connectMode) {
				game.log(targets[0], "获得了" + get.cnNumber(event.num1) + "张牌");
				game.log(targets[1], "获得了" + get.cnNumber(event.num2) + "张牌");
			}
			var dialog = event.dialog;
			dialog.close();
			_status.dieClose.remove(dialog);
			game.broadcast(function (id) {
				var dialog = get.idDialog(id);
				if (dialog) {
					dialog.close();
					_status.dieClose.remove(dialog);
				}
			}, dialog.videoId);
			game.addVideo("cardDialog", null, dialog.videoId);
		},
		targetprompt: ["先拿牌", "后拿牌"],
		find(type) {
			var list = game.filterPlayer(function (current) {
				return current != player && get.attitude(player, current) > 3;
			});
			var player = _status.event.player;
			var num = player.countCards("he", function (card) {
				return get.value(card) < 7;
			});
			var count = null;
			var from, nh;
			if (list.length == 0) return null;
			list.sort(function (a, b) {
				return a.countCards("h") - b.countCards("h");
			});
			if (type == 1) return list[0];
			from = list[0];
			nh = from.countCards("h");

			list = game.filterPlayer(function (current) {
				return current != player && get.attitude(player, current) < 1;
			});
			if (list.length == 0) return null;
			list.sort(function (a, b) {
				return b.countCards("h") - a.countCards("h");
			});
			for (var i = 0; i < list.length; i++) {
				var nh2 = list[i].countCards("h");
				if (nh2 - nh <= num) {
					count = nh2 - nh;
					break;
				}
			}
			if (count == null || count < 0) return null;
			if (type == 3) return count;
			return list[i];
		},
		check(card) {
			var count = lib.skill.redimeng.find(3);
			if (count == null) return -1;
			if (ui.selected.cards.length < count) return 7 - get.value(card);
			return -1;
		},
		ai: {
			order: 8,
			threaten: 1.6,
			expose: 0.5,
			result: {
				player(player, target) {
					if (ui.selected.targets.length == 0) {
						if (target == lib.skill.redimeng.find(1)) return 1;
						return 0;
					} else {
						if (target == lib.skill.redimeng.find(2)) return 1;
						return 0;
					}
				},
			},
		},
	},
	reluanji: {
		audio: 2,
		enable: "phaseUse",
		viewAs: { name: "wanjian" },
		filterCard(card, player) {
			if (!player.storage.reluanji) return true;
			return !player.storage.reluanji.includes(get.suit(card));
		},
		position: "hs",
		selectCard: 2,
		check(card) {
			var player = _status.event.player;
			var targets = game.filterPlayer(function (current) {
				return player.canUse("wanjian", current);
			});
			var num = 0;
			for (var i = 0; i < targets.length; i++) {
				var eff = get.sgn(get.effect(targets[i], { name: "wanjian" }, player, player));
				if (targets[i].hp == 1) {
					eff *= 1.5;
				}
				num += eff;
			}
			if (!player.needsToDiscard(-1)) {
				if (targets.length >= 7) {
					if (num < 2) return 0;
				} else if (targets.length >= 5) {
					if (num < 1.5) return 0;
				}
			}
			return 6 - get.value(card);
		},
		ai: {
			basic: {
				order: 8.9,
			},
		},
		group: ["reluanji_count", "reluanji_reset", "reluanji_respond", "reluanji_damage", "reluanji_draw"],
		subSkill: {
			reset: {
				trigger: { player: "phaseAfter" },
				silent: true,
				content() {
					delete player.storage.reluanji;
					delete player.storage.reluanji2;
				},
			},
			count: {
				trigger: { player: "useCard" },
				silent: true,
				filter(event) {
					return event.skill == "reluanji";
				},
				content() {
					player.storage.reluanji2 = trigger.card;
					if (!player.storage.reluanji) {
						player.storage.reluanji = [];
					}
					for (var i = 0; i < trigger.cards.length; i++) {
						player.storage.reluanji.add(get.suit(trigger.cards[i]));
					}
				},
			},
			respond: {
				trigger: { global: "respond" },
				silent: true,
				filter(event) {
					return event.getParent(2).skill == "reluanji";
				},
				content() {
					trigger.player.draw();
				},
			},
			damage: {
				trigger: { source: "damage" },
				forced: true,
				silent: true,
				popup: false,
				filter(event, player) {
					return player.storage.reluanji2 && event.card == player.storage.reluanji2;
				},
				content() {
					delete player.storage.reluanji2;
				},
			},
			draw: {
				trigger: { player: "useCardAfter" },
				forced: true,
				silent: true,
				popup: false,
				filter(event, player) {
					return player.storage.reluanji2 && event.card == player.storage.reluanji2;
				},
				content() {
					player.draw(trigger.targets.length);
					delete player.storage.reluanji2;
				},
			},
		},
	},
	qimou: {
		unique: true,
		limited: true,
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return !player.storage.qimou;
		},
		init(player) {
			player.storage.qimou = false;
		},
		mark: true,
		intro: {
			content: "limited",
		},
		skillAnimation: true,
		animationColor: "orange",
		content() {
			"step 0";
			var shas = player.getCards("h", "sha");
			var num;
			if (player.hp >= 4 && shas.length >= 3) {
				num = 3;
			} else if (player.hp >= 3 && shas.length >= 2) {
				num = 2;
			} else {
				num = 1;
			}
			var map = {};
			var list = [];
			for (var i = 1; i <= player.hp; i++) {
				var cn = get.cnNumber(i, true);
				map[cn] = i;
				list.push(cn);
			}
			event.map = map;
			player.awakenSkill("qimou");
			player.storage.qimou = true;
			player
				.chooseControl(list, function () {
					return get.cnNumber(_status.event.goon, true);
				})
				.set("prompt", "失去任意点体力")
				.set("goon", num);
			"step 1";
			var num = event.map[result.control] || 1;
			player.storage.qimou2 = num;
			player.loseHp(num);
			player.addTempSkill("qimou2");
		},
		ai: {
			order: 2,
			result: {
				player(player) {
					if (player.hp == 1) return 0;
					var shas = player.getCards("h", "sha");
					if (!shas.length) return 0;
					var card = shas[0];
					if (!lib.filter.cardEnabled(card, player)) return 0;
					if (lib.filter.cardUsable(card, player)) return 0;
					var mindist;
					if (player.hp >= 4 && shas.length >= 3) {
						mindist = 4;
					} else if (player.hp >= 3 && shas.length >= 2) {
						mindist = 3;
					} else {
						mindist = 2;
					}
					if (
						game.hasPlayer(function (current) {
							return current.hp <= mindist - 1 && get.distance(player, current, "attack") <= mindist && player.canUse(card, current, false) && get.effect(current, card, player, player) > 0;
						})
					) {
						return 1;
					}
					return 0;
				},
			},
		},
	},
	qimou2: {
		onremove: true,
		mod: {
			cardUsable(card, player, num) {
				if (typeof player.storage.qimou2 == "number" && card.name == "sha") {
					return num + player.storage.qimou2;
				}
			},
			globalFrom(from, to, distance) {
				if (typeof from.storage.qimou2 == "number") {
					return distance - from.storage.qimou2;
				}
			},
		},
	},
	xinkuanggu: {
		audio: "kuanggu",
		audioname: ["re_weiyan", "ol_weiyan"],
		trigger: { source: "damageSource" },
		filter(event, player) {
			return event.kuangguCheck && event.num > 0;
		},
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			event.num = trigger.num;
			"step 1";
			var choice;
			if (
				player.isDamaged() &&
				get.recoverEffect(player) > 0 &&
				player.countCards("hs", function (card) {
					return card.name == "sha" && player.hasValueTarget(card);
				}) >= player.getCardUsable("sha")
			) {
				choice = "recover_hp";
			} else {
				choice = "draw_card";
			}
			var next = player.chooseDrawRecover("###" + get.prompt(event.name) + "###摸一张牌或回复1点体力").set("logSkill", event.name);
			next.set("choice", choice);
			next.set("ai", function () {
				return _status.event.getParent().choice;
			});
			next.setHiddenSkill("xinkuanggu");
			"step 2";
			if (result.control != "cancel2") {
				event.num--;
				if (event.num > 0 && player.hasSkill("xinkuanggu")) {
					event.goto(1);
				}
			}
		},
		group: "kuanggu_check",
	},
	xinliegong: {
		shaRelated: true,
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && (card.name === "sha" || get.tag(card, "draw"))) return num + 6;
			},
			targetInRange(card, player, target) {
				if (card.name == "sha" && typeof get.number(card) == "number") {
					if (get.distance(player, target) <= get.number(card)) return true;
				}
			},
		},
		audio: "liegong",
		audioname: ["re_huangzhong", "ol_huangzhong"],
		trigger: { player: "useCardToTargeted" },
		logTarget: "target",
		locked: false,
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		filter(event, player) {
			if (event.card.name != "sha") return false;
			if (event.target.countCards("h") <= player.countCards("h")) return true;
			if (event.target.hp >= player.hp) return true;
			return false;
		},
		content() {
			if (trigger.target.countCards("h") <= player.countCards("h")) trigger.getParent().directHit.push(trigger.target);
			if (trigger.target.hp >= player.hp) {
				var id = trigger.target.playerid;
				var map = trigger.getParent().customArgs;
				if (!map[id]) map[id] = {};
				if (typeof map[id].extraDamage != "number") {
					map[id].extraDamage = 0;
				}
				map[id].extraDamage++;
			}
		},
		ai: {
			threaten: 0.5,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (
					get.attitude(player, arg.target) <= 0 &&
					arg.card.name == "sha" &&
					player.countCards("h", function (card) {
						return card != arg.card && (!arg.card.cards || !arg.card.cards.includes(card));
					}) >= arg.target.countCards("h")
				)
					return true;
				return false;
			},
		},
	},
	tiaoxin: {
		audio: 2,
		audioname: ["sp_jiangwei", "xiahouba", "re_jiangwei", "gz_jiangwei", "ol_jiangwei"],
		audioname2: {
			dc_xiahouba: "tiaoxin_xiahouba",
		},
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			return target != player && target.inRange(player) && target.countCards("he") > 0;
		},
		content() {
			"step 0";
			target
				.chooseToUse(
					function (card, player, event) {
						if (get.name(card) != "sha") return false;
						return lib.filter.filterCard.apply(this, arguments);
					},
					"挑衅：对" + get.translation(player) + "使用一张杀，或令其弃置你的一张牌"
				)
				.set("targetRequired", true)
				.set("complexSelect", true)
				.set("filterTarget", function (card, player, target) {
					if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
					return lib.filter.filterTarget.apply(this, arguments);
				})
				.set("sourcex", player);
			"step 1";
			if (result.bool == false && target.countCards("he") > 0) {
				player.discardPlayerCard(target, "he", true);
			} else {
				event.finish();
			}
		},
		ai: {
			order: 4,
			expose: 0.2,
			result: {
				target: -1,
				player(player, target) {
					if (target.countCards("h") == 0) return 0;
					if (target.countCards("h") == 1) return -0.1;
					if (player.hp <= 2) return -2;
					if (player.countCards("h", "shan") == 0) return -1;
					return -0.5;
				},
			},
			threaten: 1.1,
		},
	},
	tiaoxin_xiahouba: { audio: 2 },
	zhiji: {
		skillAnimation: true,
		animationColor: "fire",
		audio: 2,
		audioname: ["re_jiangwei"],
		unique: true,
		juexingji: true,
		//priority:-10,
		derivation: "reguanxing",
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		filter(event, player) {
			if (player.storage.zhiji) return false;
			return player.countCards("h") == 0;
		},
		content() {
			"step 0";
			player.awakenSkill("zhiji");
			player.chooseDrawRecover(2, true);
			"step 1";
			player.loseMaxHp();
			player.addSkills("reguanxing");
		},
	},
	xiangle: {
		audio: 2,
		audioname: ["re_liushan", "ol_liushan"],
		trigger: { target: "useCardToTargeted" },
		forced: true,
		preHidden: true,
		filter(event, player) {
			return event.card.name == "sha";
		},
		content() {
			"step 0";
			var eff = get.effect(player, trigger.card, trigger.player, trigger.player);
			trigger.player
				.chooseToDiscard("享乐：弃置一张基本牌，否则杀对" + get.translation(player) + "无效", function (card) {
					return get.type(card) == "basic";
				})
				.set("ai", function (card) {
					if (_status.event.eff > 0) {
						return 10 - get.value(card);
					}
					return 0;
				})
				.set("eff", eff);
			"step 1";
			if (result.bool == false) {
				trigger.getParent().excluded.add(player);
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (card.name == "sha" && get.attitude(player, target) < 0) {
						if (_status.event.name == "xiangle") return;
						if (get.attitude(player, target) > 0 && current < 0) return "zerotarget";
						var bs = player.getCards("h", { type: "basic" });
						bs.remove(card);
						if (card.cards) bs.removeArray(card.cards);
						else bs.removeArray(ui.selected.cards);
						if (!bs.length) return "zerotarget";
						if (player.hasSkill("jiu") || player.hasSkill("tianxianjiu")) return;
						if (bs.length <= 2) {
							for (var i = 0; i < bs.length; i++) {
								if (get.value(bs[i]) < 7) {
									return [1, 0, 1, -0.5];
								}
							}
							return [1, 0, 0.3, 0];
						}
						return [1, 0, 1, -0.5];
					}
				},
			},
		},
	},
	fangquan: {
		audio: 2,
		trigger: { player: "phaseUseBefore" },
		filter(event, player) {
			return player.countCards("h") > 0 && !player.hasSkill("fangquan3");
		},
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			var fang = player.countMark("fangquan2") == 0 && player.hp >= 2 && player.countCards("h") <= player.hp + 1;
			player
				.chooseBool(get.prompt2("fangquan"))
				.set("ai", function () {
					if (!_status.event.fang) return false;
					return game.hasPlayer(function (target) {
						if (target.hasJudge("lebu") || target == player) return false;
						if (get.attitude(player, target) > 4) {
							return get.threaten(target) / Math.sqrt(target.hp + 1) / Math.sqrt(target.countCards("h") + 1) > 0;
						}
						return false;
					});
				})
				.set("fang", fang)
				.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				player.logSkill("fangquan");
				trigger.cancel();
				player.addTempSkill("fangquan2");
				player.addMark("fangquan2", 1, false);
				//player.storage.fangquan=result.targets[0];
			}
		},
	},
	fangquan2: {
		trigger: { player: "phaseEnd" },
		forced: true,
		popup: false,
		audio: false,
		//priority:-50,
		onremove: true,
		content() {
			"step 0";
			event.count = player.countMark(event.name);
			player.removeMark(event.name, event.count);
			"step 1";
			event.count--;
			player.chooseToDiscard("是否弃置一张牌并令一名其他角色进行一个额外回合？").set("logSkill", player.name == "re_liushan" ? "refangquan" : "fangquan").ai = function (card) {
				return 20 - get.value(card);
			};
			"step 2";
			if (result.bool) {
				player.chooseTarget(true, "请选择进行额外回合的目标角色", lib.filter.notMe).ai = function (target) {
					if (target.hasJudge("lebu") || get.attitude(player, target) <= 0) return -1;
					if (target.isTurnedOver()) return 0.18;
					return get.threaten(target) / Math.sqrt(target.hp + 1) / Math.sqrt(target.countCards("h") + 1);
				};
			} else event.finish();
			"step 3";
			var target = result.targets[0];
			player.line(target, "fire");
			target.markSkillCharacter("fangquan", player, "放权", "进行一个额外回合");
			target.insertPhase();
			target.addSkill("fangquan3");
			if (event.count > 0) event.goto(1);
		},
	},
	fangquan3: {
		trigger: { player: ["phaseAfter", "phaseCancelled"] },
		forced: true,
		popup: false,
		audio: false,
		content() {
			player.unmarkSkill("fangquan");
			player.removeSkill("fangquan3");
		},
	},
	ruoyu: {
		skillAnimation: true,
		animationColor: "fire",
		audio: 2,
		audioname: ["re_liushan"],
		unique: true,
		juexingji: true,
		zhuSkill: true,
		keepSkill: true,
		derivation: "rejijiang",
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		filter(event, player) {
			return player.isMinHp();
		},
		content() {
			"step 0";
			player.awakenSkill("ruoyu");
			player.gainMaxHp();
			player.recover();
			"step 1";
			player.addSkills("rejijiang");
		},
	},
	qiaobian: {
		audio: 2,
		trigger: {
			player: ["phaseJudgeBefore", "phaseDrawBefore", "phaseUseBefore", "phaseDiscardBefore"],
		},
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			var check,
				str = "弃置一张手牌并跳过";
			str += ["判定", "摸牌", "出牌", "弃牌"][lib.skill.qiaobian.trigger.player.indexOf(event.triggername)];
			str += "阶段";
			if (trigger.name == "phaseDraw") str += "，然后可以获得至多两名角色各一张手牌";
			if (trigger.name == "phaseUse") str += "，然后可以移动场上的一张牌";
			switch (trigger.name) {
				case "phaseJudge":
					check = player.countCards("j");
					break;
				case "phaseDraw":
					var i,
						num = 0,
						num2 = 0,
						players = game.filterPlayer();
					for (i = 0; i < players.length; i++) {
						if (player != players[i] && players[i].countCards("h")) {
							var att = get.attitude(player, players[i]);
							if (att <= 0) {
								num++;
							}
							if (att < 0) {
								num2++;
							}
						}
					}
					check = num >= 2 && num2 > 0;
					break;
				case "phaseUse":
					if (!player.canMoveCard(true)) {
						check = false;
					} else {
						check = game.hasPlayer(function (current) {
							return get.attitude(player, current) > 0 && current.countCards("j");
						});
						if (!check) {
							if (player.countCards("h") > player.hp + 1) {
								check = false;
							} else if (player.countCards("h", { name: "wuzhong" })) {
								check = false;
							} else {
								check = true;
							}
						}
					}
					break;
				case "phaseDiscard":
					check = player.needsToDiscard();
					break;
			}
			player
				.chooseToDiscard(get.prompt("qiaobian"), str, lib.filter.cardDiscardable)
				.set("ai", card => {
					if (!_status.event.check) return -1;
					return 7 - get.value(card);
				})
				.set("check", check)
				.set("logSkill", "qiaobian")
				.setHiddenSkill("qiaobian");
			"step 1";
			if (result.bool) {
				trigger.cancel();
				game.log(player, "跳过了", "#y" + ["判定", "摸牌", "出牌", "弃牌"][lib.skill.qiaobian.trigger.player.indexOf(event.triggername)] + "阶段");
				if (trigger.name == "phaseUse") {
					if (player.canMoveCard()) player.moveCard();
					event.finish();
				} else if (trigger.name == "phaseDraw") {
					player
						.chooseTarget([1, 2], "获得至多两名角色各一张手牌", function (card, player, target) {
							return target != player && target.countCards("h");
						})
						.set("ai", function (target) {
							return 1 - get.attitude(_status.event.player, target);
						});
				} else event.finish();
			} else event.finish();
			"step 2";
			if (result.bool) {
				result.targets.sortBySeat();
				player.line(result.targets, "green");
				event.targets = result.targets;
				if (!event.targets.length) event.finish();
			} else event.finish();
			"step 3";
			player.gainMultiple(event.targets);
			"step 4";
			game.delay();
		},
		ai: { threaten: 3 },
	},
	tuntian: {
		audio: 2,
		audioname: ["gz_dengai"],
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		frequent: true,
		preHidden: true,
		filter(event, player) {
			if (player == _status.currentPhase) return false;
			if (event.name == "gain" && event.player == player) return false;
			var evt = event.getl(player);
			return evt && evt.cards2 && evt.cards2.length > 0;
		},
		content() {
			"step 0";
			var next = player.judge(function (card) {
				if (get.suit(card) == "heart") return -1;
				return 1;
			});
			next.judge2 = function (result) {
				return result.bool;
			};
			if (get.mode() != "guozhan") {
				next.callback = lib.skill.tuntian.callback;
				event.finish();
			}
			"step 1";
			if (!result.bool || get.position(result.card) != "d") {
				//game.cardsDiscard(card);
				event.finish();
				return;
			}
			event.card = result.card;
			player.chooseBool("是否将" + get.translation(event.card) + "作为“田”置于武将牌上？").ai = function () {
				return true;
			};
			"step 2";
			if (!result.bool && !event.directbool) {
				return;
			}
			player.addToExpansion(event.card, "gain2").gaintag.add("tuntian");
		},
		callback() {
			if (!event.judgeResult.bool) {
				event.finish();
				return;
			}
			player.addToExpansion(event.judgeResult.card, "gain2").gaintag.add("tuntian");
		},
		marktext: "田",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		group: "tuntian_dist",
		locked: false,
		subSkill: {
			dist: {
				locked: false,
				mod: {
					globalFrom(from, to, distance) {
						var num = distance - from.getExpansions("tuntian").length;
						if (_status.event.skill == "jixi_backup" || _status.event.skill == "gzjixi_backup") num++;
						return num;
					},
				},
			},
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (
						typeof card === "object" &&
						get.name(card) === "sha" &&
						target.mayHaveShan(
							player,
							"use",
							target.getCards("h", i => {
								return i.hasGaintag("sha_notshan");
							})
						)
					)
						return [0.6, 0.75];
					if (!target.hasFriend() && !player.hasUnknown()) return;
					if (_status.currentPhase == target || get.type(card) === "delay") return;
					if (card.name != "shuiyanqijunx" && get.tag(card, "loseCard") && target.countCards("he")) {
						if (target.hasSkill("ziliang")) return 0.7;
						return [0.5, Math.max(2, target.countCards("h"))];
					}
					if (target.isUnderControl(true, player)) {
						if ((get.tag(card, "respondSha") && target.countCards("h", "sha")) || (get.tag(card, "respondShan") && target.countCards("h", "shan"))) {
							if (target.hasSkill("ziliang")) return 0.7;
							return [0.5, 1];
						}
					} else if (get.tag(card, "respondSha") || get.tag(card, "respondShan")) {
						if (get.attitude(player, target) > 0 && card.name == "juedou") return;
						if (get.tag(card, "damage") && target.hasSkillTag("maixie")) return;
						if (target.countCards("h") == 0) return 2;
						if (target.hasSkill("ziliang")) return 0.7;
						if (get.mode() == "guozhan") return 0.5;
						return [0.5, Math.max(target.countCards("h") / 4, target.countCards("h", "sha") + target.countCards("h", "shan"))];
					}
				},
			},
			threaten(player, target) {
				if (target.countCards("h") == 0) return 2;
				return 0.5;
			},
			nodiscard: true,
			nolose: true,
		},
	},
	zaoxian: {
		skillAnimation: true,
		animationColor: "thunder",
		audio: 2,
		audioname: ["re_dengai"],
		unique: true,
		juexingji: true,
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		filter(event, player) {
			return player.getExpansions("tuntian").length >= 3;
		},
		derivation: "jixi",
		content() {
			player.awakenSkill("zaoxian");
			player.loseMaxHp();
			player.addSkills("jixi");
		},
		ai: {
			combo: "tuntian",
		},
	},
	jixi: {
		audio: 2,
		audioname: ["re_dengai", "gz_dengai", "ol_dengai"],
		enable: "phaseUse",
		filter(event, player) {
			return player.getExpansions("tuntian").length > 0 && event.filterCard({ name: "shunshou" }, player, event);
		},
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog("急袭", player.getExpansions("tuntian"), "hidden");
			},
			filter(button, player) {
				var card = button.link;
				if (!game.checkMod(card, player, "unchanged", "cardEnabled2", player)) return false;
				var evt = _status.event.getParent();
				return evt.filterCard(get.autoViewAs({ name: "shunshou" }, [card]), player, evt);
			},
			backup(links, player) {
				var skill = _status.event.buttoned;
				return {
					audio: "jixi",
					audioname: ["re_dengai", "gz_dengai", "ol_dengai"],
					selectCard: -1,
					position: "x",
					filterCard: skill == "jixi" ? card => card == lib.skill.jixi_backup.card : card => card == lib.skill.gzjixi_backup.card,
					viewAs: { name: "shunshou" },
					card: links[0],
				};
			},
			prompt(links, player) {
				return "选择 顺手牵羊（" + get.translation(links[0]) + "）的目标";
			},
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					return player.getExpansions("tuntian").length - 1;
				},
			},
			combo: "tuntian",
		},
	},
	jiang: {
		shaRelated: true,
		audio: 2,
		preHidden: true,
		audioname: ["sp_lvmeng", "re_sunben", "re_sunce"],
		mod: {
			aiOrder(player, card, num) {
				if (get.color(card) === "red" && get.name(card) === "sha") return get.order({ name: "sha" }) + 0.15;
			},
		},
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player) {
			if (!(event.card.name == "juedou" || (event.card.name == "sha" && get.color(event.card) == "red"))) return false;
			return player == event.target || event.getParent().triggeredTargets3.length == 1;
		},
		locked: false,
		frequent: true,
		content() {
			player.draw();
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (card.name == "sha" && get.color(card) == "red") return [1, 0.6];
				},
				player(card, player, target) {
					if (card.name == "sha" && get.color(card) == "red") return [1, 1];
				},
			},
		},
	},
	hunzi: {
		//audioname:['re_sunben'],
		skillAnimation: true,
		animationColor: "wood",
		audio: 2,
		juexingji: true,
		derivation: ["reyingzi", "gzyinghun"],
		unique: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return player.hp <= 1 && !player.storage.hunzi;
		},
		forced: true,
		//priority:3,
		content() {
			player.awakenSkill(event.name);
			player.loseMaxHp();
			player.addSkills(["reyingzi", "gzyinghun"]);
		},
		ai: {
			threaten(player, target) {
				if (target.hp == 1) return 2;
				return 0.5;
			},
			maixie: true,
			effect: {
				target(card, player, target) {
					if (!target.hasFriend()) return;
					if (target.hp === 2 && get.tag(card, "damage") == 1 && !target.isTurnedOver() && _status.currentPhase !== target && get.distance(_status.currentPhase, target, "absolute") <= 3) return [0.5, 1];
					if (target.hp === 1 && get.tag(card, "recover") && !target.isTurnedOver() && _status.currentPhase !== target && get.distance(_status.currentPhase, target, "absolute") <= 3) return [1, -3];
				},
			},
		},
	},
	zhiba: {
		unique: true,
		global: "zhiba2",
		audioname: ["re_sunben"],
		audio: "zhiba2",
		zhuSkill: true,
	},
	zhiba2: {
		audio: 2,
		audioname: ["re_sunben"],
		//forceaudio:true,
		enable: "phaseUse",
		prompt() {
			var player = _status.event.player;
			var list = game.filterPlayer(function (target) {
				return target.hasZhuSkill("zhiba", player) && player.canCompare(target);
			});
			var str = "和" + get.translation(list);
			if (list.length > 1) str += "中的一人";
			str += "进行拼点。若你没赢，其可以获得两张拼点牌。";
			return str;
		},
		filter(event, player) {
			if (player.group != "wu" || player.countCards("h") == 0) return false;
			return game.hasPlayer(function (target) {
				return target.hasZhuSkill("zhiba", player) && player.canCompare(target);
			});
		},
		filterTarget(card, player, target) {
			return target.hasZhuSkill("zhiba", player) && player.canCompare(target);
		},
		log: false,
		prepare(cards, player, targets) {
			targets[0].logSkill("zhiba");
		},
		usable: 1,
		content() {
			"step 0";
			if (target.storage.hunzi || target.storage.rehunzi) {
				target
					.chooseControl("拒绝", "不拒绝")
					.set("prompt", "是否拒绝制霸拼点？")
					.set("choice", get.attitude(target, player) <= 0);
			} else {
				event.forced = true;
			}
			"step 1";
			if (!event.forced && result.control == "拒绝") {
				game.log(target, "拒绝了拼点");
				target.chat("拒绝");
				event.finish();
				return;
			}
			player
				.chooseToCompare(target, function (card) {
					if (card.name == "du") return 20;
					var player = get.owner(card);
					var target = _status.event.getParent().target;
					if (player != target && get.attitude(player, target) > 0) {
						return -get.number(card);
					}
					return get.number(card);
				})
				.set("preserve", "lose");
			"step 2";
			if (result.bool == false) {
				var list = [];
				if (get.position(result.player) == "d") list.push(result.player);
				if (get.position(result.target) == "d") list.push(result.target);
				if (!list.length) event.finish();
				else {
					event.list = list;
					target.chooseBool("是否获得" + get.translation(list) + "？").ai = function () {
						return get.value(list) > 0;
					};
				}
			} else event.finish();
			"step 3";
			if (result.bool) target.gain(event.list, "gain2");
		},
		ai: {
			basic: {
				order: 1,
			},
			expose: 0.2,
			result: {
				target(player, target) {
					if (player.countCards("h", "du") && get.attitude(player, target) < 0) return -1;
					if (player.countCards("h") <= player.hp) return 0;
					var maxnum = 0;
					var cards2 = target.getCards("h");
					for (var i = 0; i < cards2.length; i++) {
						if (get.number(cards2[i]) > maxnum) {
							maxnum = get.number(cards2[i]);
						}
					}
					if (maxnum > 10) maxnum = 10;
					if (maxnum < 5 && cards2.length > 1) maxnum = 5;
					var cards = player.getCards("h");
					for (var i = 0; i < cards.length; i++) {
						if (get.number(cards[i]) < maxnum) return 1;
					}
					return 0;
				},
			},
		},
	},
	zhijian: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return player.countCards("h", { type: "equip" }) > 0;
		},
		filterCard(card) {
			return get.type(card) == "equip";
		},
		check(card) {
			var player = _status.currentPhase;
			if (player.countCards("he", { subtype: get.subtype(card) }) > 1) {
				return 11 - get.equipValue(card);
			}
			return 6 - get.value(card);
		},
		filterTarget(card, player, target) {
			if (target.isMin()) return false;
			return player != target && target.canEquip(card);
		},
		async content(event, trigger, player) {
			event.target.equip(event.cards[0]);
			player.draw();
		},
		discard: false,
		lose: false,
		prepare(cards, player, targets) {
			player.$give(cards, targets[0], false);
		},
		ai: {
			basic: {
				order: 10,
			},
			result: {
				target(player, target) {
					var card = ui.selected.cards[0];
					if (card) return get.effect(target, card, target, target);
					return 0;
				},
			},
			threaten: 1.3,
		},
	},
	guzheng: {
		audio: 2,
		audioname: ["re_zhangzhang"],
		trigger: { global: "phaseDiscardAfter" },
		filter(event, player) {
			if (event.player != player && event.player.isIn()) {
				return (
					event.player.getHistory("lose", function (evt) {
						return evt.type == "discard" && evt.getParent("phaseDiscard") == event && evt.hs.someInD("d");
					}).length > 0
				);
			}
			return false;
		},
		checkx(event, player, cards, cards2) {
			if (cards.length > 2 || get.attitude(player, event.player) > 0) return true;
			for (var i = 0; i < cards2.length; i++) {
				if (get.value(cards2[i], event.player, "raw") < 0) return true;
			}
			return false;
		},
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			var cards = [],
				cards2 = [];
			var target = trigger.player;
			game.getGlobalHistory("cardMove", function (evt) {
				if (evt.name == "cardsDiscard") {
					if (evt.getParent("phaseDiscard") == trigger) {
						var moves = evt.cards.filterInD("d");
						cards.addArray(moves);
						cards2.removeArray(moves);
					}
				}
				if (evt.name == "lose") {
					if (evt.type != "discard" || evt.position != ui.discardPile || evt.getParent("phaseDiscard") != trigger) return;
					var moves = evt.cards.filterInD("d");
					cards.addArray(moves);
					if (evt.player == target) cards2.addArray(moves);
					else cards2.removeArray(moves);
				}
			});
			if (!cards2.length) event.finish();
			else if (cards.length == 1) {
				event.card = cards[0];
				player
					.chooseBool()
					.set("createDialog", [get.prompt("guzheng", target), '<span class="text center">点击“确认”以令其收回此牌</span>', cards])
					.set("choice", lib.skill.guzheng.checkx(trigger, player, cards, cards2))
					.set("ai", function () {
						return _status.event.choice;
					})
					.setHiddenSkill("guzheng");
			} else {
				player
					.chooseButton(2, [get.prompt("guzheng", target), '<span class="text center">被选择的牌将成为对方收回的牌</span>', cards, [["获得剩余的牌", "放弃剩余的牌"], "tdnodes"]])
					.set("filterButton", function (button) {
						var type = typeof button.link;
						if (ui.selected.buttons.length && type == typeof ui.selected.buttons[0].link) return false;
						return type == "string" || _status.event.allowed.includes(button.link);
					})
					.set("allowed", cards2)
					.set("check", lib.skill.guzheng.checkx(trigger, player, cards, cards2))
					.set("ai", function (button) {
						if (typeof button.link == "string") {
							return button.link == "获得剩余的牌" ? 1 : 0;
						}
						if (_status.event.check) {
							return 20 - get.value(button.link, _status.event.getTrigger().player);
						}
						return 0;
					})
					.setHiddenSkill("guzheng");
			}
			"step 1";
			if (result.bool) {
				var target = trigger.player;
				player.logSkill("guzheng", target);
				if (!result.links || !result.links.length) {
					target.gain(card, "gain2").giver = player;
				} else {
					if (typeof result.links[0] != "string") result.links.reverse();
					var card = result.links[1];
					target.gain(card, "gain2").giver = player;
					if (result.links[0] != "获得剩余的牌") event.finish();
				}
			} else event.finish();
			"step 2";
			//避免插入结算改变弃牌堆 重新判断一次
			var cards = [];
			game.getGlobalHistory("cardMove", function (evt) {
				if (evt.name == "cardsDiscard") {
					if (evt.getParent("phaseDiscard") == trigger) {
						var moves = evt.cards.filterInD("d");
						cards.addArray(moves);
					}
				}
				if (evt.name == "lose") {
					if (evt.type != "discard" || evt.position != ui.discardPile || evt.getParent("phaseDiscard") != trigger) return;
					var moves = evt.cards.filterInD("d");
					cards.addArray(moves);
				}
			});
			if (cards.length > 0) player.gain(cards, "gain2");
		},
		ai: {
			threaten: 1.3,
			expose: 0.2,
		},
	},
	beige: {
		audio: 2,
		audioname: ["re_caiwenji", "ol_caiwenji"],
		trigger: { global: "damageEnd" },
		filter(event, player) {
			return event.card && event.card.name == "sha" && event.source && event.player.isIn() && player.countCards("he");
		},
		direct: true,
		checkx(event, player) {
			var att1 = get.attitude(player, event.player);
			var att2 = get.attitude(player, event.source);
			return att1 > 0 && att2 <= 0;
		},
		preHidden: true,
		content() {
			"step 0";
			var next = player.chooseToDiscard("he", get.prompt2("beige", trigger.player));
			var check = lib.skill.beige.checkx(trigger, player);
			next.set("ai", function (card) {
				if (_status.event.goon) return 8 - get.value(card);
				return 0;
			});
			next.set("logSkill", "beige");
			next.set("goon", check);
			next.setHiddenSkill("beige");
			"step 1";
			if (result.bool) {
				trigger.player.judge();
			} else {
				event.finish();
			}
			"step 2";
			switch (result.suit) {
				case "heart":
					trigger.player.recover();
					break;
				case "diamond":
					trigger.player.draw(2);
					break;
				case "club":
					trigger.source.chooseToDiscard("he", 2, true);
					break;
				case "spade":
					trigger.source.turnOver();
					break;
			}
		},
		ai: {
			expose: 0.3,
		},
	},
	duanchang: {
		audio: 2,
		audioname: ["re_caiwenji", "ol_caiwenji"],
		forbid: ["boss"],
		trigger: { player: "die" },
		forced: true,
		forceDie: true,
		skillAnimation: true,
		animationColor: "gray",
		filter(event) {
			return event.source && event.source.isIn();
		},
		content() {
			trigger.source.clearSkills();
		},
		logTarget: "source",
		ai: {
			maixie_defend: true,
			threaten(player, target) {
				if (target.hp == 1) return 0.2;
				return 1.5;
			},
			effect: {
				target(card, player, target, current) {
					if (!target.hasFriend()) return;
					if (target.hp <= 1 && get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) return 3;
						return [1, 0, 0, -3 * get.threaten(player)];
					}
				},
			},
		},
	},
	huashen: {
		audio: "huashen2",
		unique: true,
		init(player) {
			if (!player.storage.huashen) {
				player.storage.huashen = {
					owned: {},
				};
			}
			player.when("dieBegin").then(() => {
				const name = player.name ? player.name : player.name1;
				if (name) {
					const sex = get.character(name, 0);
					const group = get.character(name, 1);
					if (player.sex != sex) {
						game.broadcastAll(
							(player, sex) => {
								player.sex = sex;
							},
							player,
							sex
						);
						game.log(player, "将性别变为了", "#y" + get.translation(sex) + "性");
					}
					if (player.group != group) player.changeGroup(group);
				}
			});
		},
		intro: {
			content(storage, player) {
				var str = "";
				var list = Object.keys(storage.owned);
				if (list.length) {
					str += get.translation(list[0]);
					for (var i = 1; i < list.length; i++) {
						str += "、" + get.translation(list[i]);
					}
				}
				var skill = player.storage.huashen.current2;
				if (skill) {
					str += "<p>当前技能：" + get.translation(skill);
				}
				return str;
			},
			onunmark(storage, player) {
				_status.characterlist.addArray(Object.keys(storage.owned));
				storage.owned = [];
			},
			mark(dialog, content, player) {
				var list = Object.keys(content.owned);
				if (list.length) {
					var skill = player.storage.huashen.current2;
					var character = player.storage.huashen.current;
					if (skill && character) {
						dialog.addSmall([[character], (item, type, position, noclick, node) => lib.skill.rehuashen.$createButton(item, type, position, noclick, node)]);
						dialog.add('<div><div class="skill">【' + get.translation(lib.translate[skill + "_ab"] || get.translation(skill).slice(0, 2)) + "】</div>" + "<div>" + get.skillInfoTranslation(skill, player) + "</div></div>");
					}
					if (player.isUnderControl(true)) {
						dialog.addSmall([list, (item, type, position, noclick, node) => lib.skill.rehuashen.$createButton(item, type, position, noclick, node)]);
					} else {
						dialog.addText("共有" + get.cnNumber(list.length) + "张“化身”");
					}
				} else {
					return "没有化身";
				}
			},
		},
		addHuashen(player) {
			if (!player.storage.huashen) return;
			if (!_status.characterlist) {
				lib.skill.pingjian.initList();
			}
			_status.characterlist.randomSort();
			for (var i = 0; i < _status.characterlist.length; i++) {
				let name = _status.characterlist[i];
				if (name.indexOf("zuoci") != -1 || name.indexOf("key_") == 0 || name.indexOf("sp_key_") == 0 || lib.skill.rehuashen.banned.includes(name) || player.storage.huashen.owned[name]) continue;
				let skills = lib.character[name][3].filter(skill => {
					const categories = get.skillCategoriesOf(skill);
					return !categories.some(type => lib.skill.rehuashen.bannedType.includes(type));
				});
				if (skills.length) {
					player.storage.huashen.owned[name] = skills;
					_status.characterlist.remove(name);
					return name;
				}
			}
		},
		addHuashens(player, num) {
			var list = [];
			for (var i = 0; i < num; i++) {
				var name = lib.skill.huashen.addHuashen(player);
				if (name) list.push(name);
			}
			if (list.length) {
				player.syncStorage("huashen");
				player.markSkill("huashen");
				game.log(player, "获得了", get.cnNumber(list.length) + "张", "#g化身");
				lib.skill.rehuashen.drawCharacter(player, list);
			}
		},
		trigger: {
			global: "phaseBefore",
			player: ["enterGame", "phaseBegin", "phaseEnd"],
		},
		filter(event, player, name) {
			if (event.name != "phase") return true;
			if (name == "phaseBefore") return game.phaseNumber == 0;
			return !get.is.empty(player.storage.huashen.owned);
		},
		direct: true,
		content() {
			"step 0";
			var name = event.triggername;
			if (trigger.name != "phase" || (name == "phaseBefore" && game.phaseNumber == 0)) {
				player.logSkill("huashen");
				lib.skill.huashen.addHuashens(player, 2);
				event.logged = true;
			}
			var cards = [];
			var skills = [];
			for (var i in player.storage.huashen.owned) {
				cards.push(i);
				skills.addArray(player.storage.huashen.owned[i]);
			}
			var cond = event.triggername == "phaseBegin" ? "in" : "out";
			skills.randomSort();
			skills.sort(function (a, b) {
				return get.skillRank(b, cond) - get.skillRank(a, cond);
			});
			if (player.isUnderControl()) {
				game.swapPlayerAuto(player);
			}
			var switchToAuto = function () {
				_status.imchoosing = false;
				var skill = skills[0],
					character;
				for (var i in player.storage.huashen.owned) {
					if (player.storage.huashen.owned[i].includes(skill)) {
						character = i;
						break;
					}
				}
				event._result = {
					bool: true,
					skill: skill,
					character: character,
				};
				if (event.dialog) event.dialog.close();
				if (event.control) event.control.close();
			};
			var chooseButton = function (player, list, forced) {
				var event = _status.event;
				player = player || event.player;
				if (!event._result) event._result = {};
				var prompt = forced ? "化身：选择获得一项技能" : get.prompt("huashen");
				var dialog = ui.create.dialog(prompt, [list, (item, type, position, noclick, node) => lib.skill.rehuashen.$createButton(item, type, position, noclick, node)]);
				event.dialog = dialog;
				event.forceMine = true;
				event.button = null;
				for (var i = 0; i < event.dialog.buttons.length; i++) {
					event.dialog.buttons[i].classList.add("pointerdiv");
					event.dialog.buttons[i].classList.add("selectable");
				}
				event.dialog.open();
				event.custom.replace.button = function (button) {
					if (!event.dialog.contains(button.parentNode)) return;
					if (event.control) event.control.style.opacity = 1;
					if (button.classList.contains("selectedx")) {
						event.button = null;
						button.classList.remove("selectedx");
						if (event.control) {
							event.control.replacex(["cancel2"]);
						}
					} else {
						if (event.button) {
							event.button.classList.remove("selectedx");
						}
						button.classList.add("selectedx");
						event.button = button;
						if (event.control && button.link) {
							event.control.replacex(player.storage.huashen.owned[button.link]);
						}
					}
					game.check();
				};
				event.custom.replace.window = function () {
					if (event.button) {
						event.button.classList.remove("selectedx");
						event.button = null;
					}
					event.control.replacex(["cancel2"]);
				};

				event.switchToAuto = function () {
					var cards = [];
					var skills = [];
					for (var i in player.storage.huashen.owned) {
						cards.push(i);
						skills.addArray(player.storage.huashen.owned[i]);
					}
					var cond = event.triggername == "phaseBegin" ? "in" : "out";
					skills.randomSort();
					skills.sort(function (a, b) {
						return get.skillRank(b, cond) - get.skillRank(a, cond);
					});
					_status.imchoosing = false;
					var skill = skills[0],
						character;
					for (var i in player.storage.huashen.owned) {
						if (player.storage.huashen.owned[i].includes(skill)) {
							character = i;
							break;
						}
					}
					event._result = {
						bool: true,
						skill: skill,
						character: character,
					};
					if (event.dialog) event.dialog.close();
					if (event.control) event.control.close();
				};
				var controls = [];
				event.control = ui.create.control();
				event.control.replacex = function () {
					var args = Array.from(arguments)[0];
					if (args.includes("cancel2") && forced) {
						args.remove("cancel2");
						this.style.opacity = "";
					}
					args.push(function (link) {
						var result = event._result;
						if (link == "cancel2") result.bool = false;
						else {
							if (!event.button) return;
							result.bool = true;
							result.skill = link;
							result.character = event.button.link;
						}
						event.dialog.close();
						event.control.close();
						game.resume();
						_status.imchoosing = false;
					});
					return this.replace.apply(this, args);
				};
				if (!forced) {
					controls.push("cancel2");
					event.control.style.opacity = 1;
				}
				event.control.replacex(controls);
				game.pause();
				game.countChoose();
			};
			if (event.isMine()) {
				chooseButton(player, cards, event.logged);
			} else if (event.isOnline()) {
				event.player.send(chooseButton, event.player, cards, event.logged);
				event.player.wait();
				game.pause();
			} else {
				switchToAuto();
			}
			"step 1";
			var map = event.result || result;
			if (map.bool) {
				if (!event.logged) player.logSkill("huashen");
				var skill = map.skill,
					character = map.character;
				if (character != player.storage.huashen.current) {
					const old = player.storage.huashen.current;
					player.storage.huashen.current = character;
					player.markSkill("huashen");
					game.broadcastAll(
						function (player, character, old) {
							player.tempname.remove(old);
							player.tempname.add(character);
							player.sex = lib.character[character][0];
							//player.group=lib.character[character][1];
							//player.node.name.dataset.nature=get.groupnature(player.group);
							var mark = player.marks.huashen;
							if (mark) {
								mark.style.transition = "all 0.3s";
								setTimeout(function () {
									mark.style.transition = "all 0s";
									ui.refresh(mark);
									mark.setBackground(character, "character");
									if (mark.firstChild) {
										mark.firstChild.remove();
									}
									setTimeout(function () {
										mark.style.transition = "";
										mark.show();
									}, 50);
								}, 200);
							}
						},
						player,
						character,
						old
					);
					game.log(player, "将性别变为了", "#y" + get.translation(lib.character[character][0]) + "性");
					player.changeGroup(lib.character[character][1]);
				}
				player.storage.huashen.current2 = skill;
				if (!player.additionalSkills.huashen || !player.additionalSkills.huashen.includes(skill)) {
					player.addAdditionalSkills("huashen", skill);
					player.flashAvatar("huashen", character);
					player.syncStorage("huashen");
					player.updateMarks("huashen");
					// lib.skill.rehuashen.createAudio(character,skill,'zuoci');
				}
			}
		},
	},
	huashen2: { audio: 2 },
	xinsheng: {
		audio: 2,
		unique: true,
		trigger: { player: "damageEnd" },
		frequent: true,
		content() {
			"step 0";
			event.num = trigger.num;
			"step 1";
			lib.skill.huashen.addHuashens(player, 1);
			"step 2";
			if (--event.num > 0 && player.hasSkill(event.name) && !get.is.blocked(event.name, player)) {
				player.chooseBool(get.prompt2("xinsheng")).set("frequentSkill", event.name);
			} else event.finish();
			"step 3";
			if (result.bool && player.hasSkill("xinsheng")) {
				player.logSkill("xinsheng");
				event.goto(1);
			}
		},
		ai: {
			combo: "huashen",
		},
	},
	huoshou: {
		audio: "huoshou1",
		audioname: ["re_menghuo"],
		locked: true,
		group: ["huoshou1", "huoshou2"],
		preHidden: ["huoshou1", "huoshou2"],
		ai: {
			effect: {
				target(card, player, target) {
					if (card.name == "nanman") return 0;
				},
			},
		},
	},
	huoshou1: {
		audio: 2,
		audioname: ["re_menghuo"],
		trigger: { target: "useCardToBefore" },
		forced: true,
		priority: 15,
		filter(event, player) {
			return event.card.name == "nanman";
		},
		content() {
			trigger.cancel();
		},
	},
	huoshou2: {
		audio: "huoshou1",
		audioname: ["re_menghuo"],
		trigger: { global: "useCard" },
		forced: true,
		filter(event, player) {
			return event.card && event.card.name == "nanman" && event.player != player;
		},
		content() {
			trigger.customArgs.default.customSource = player;
		},
	},
	zaiqixx: {
		audio: "zaiqi",
		inherit: "zaiqi",
	},
	zaiqi: {
		audio: 2,
		trigger: { player: "phaseDrawBegin1" },
		filter(event, player) {
			return !event.numFixed && player.hp < player.maxHp;
		},
		check(event, player) {
			if (player.getDamagedHp() < 2) {
				return false;
			} else if (player.getDamagedHp() == 2) {
				return player.countCards("h") >= 2;
			}
			return true;
		},
		content() {
			"step 0";
			trigger.changeToZero();
			event.cards = get.cards(player.getDamagedHp() + (event.name == "zaiqi" ? 0 : 1));
			game.cardsGotoOrdering(event.cards);
			player.showCards(event.cards);
			"step 1";
			var num = 0;
			for (var i = 0; i < event.cards.length; i++) {
				if (get.suit(event.cards[i]) == "heart") {
					num++;
					event.cards.splice(i--, 1);
				}
			}
			if (num) {
				player.recover(num);
			}
			"step 2";
			if (event.cards.length) {
				player.gain(event.cards, "gain2");
			}
		},
		ai: {
			threaten(player, target) {
				if (target.hp == 1) return 2;
				if (target.hp == 2) return 1.5;
				return 1;
			},
		},
	},
	juxiang: {
		//unique:true,
		locked: true,
		audio: "juxiang1",
		audioname: ["re_zhurong", "ol_zhurong"],
		group: ["juxiang1", "juxiang2"],
		preHidden: ["juxiang1", "juxiang2"],
		ai: {
			effect: {
				target(card) {
					if (card.name == "nanman") return [0, 1];
				},
			},
		},
	},
	juxiang1: {
		audio: 2,
		audioname: ["re_zhurong", "ol_zhurong"],
		trigger: { target: "useCardToBefore" },
		forced: true,
		priority: 15,
		filter(event, player) {
			return event.card.name == "nanman";
		},
		content() {
			trigger.cancel();
		},
	},
	juxiang2: {
		audio: "juxiang1",
		audioname: ["re_zhurong", "ol_zhurong"],
		trigger: { global: "useCardAfter" },
		forced: true,
		filter(event, player) {
			return event.card.name == "nanman" && event.player != player && event.cards.someInD();
		},
		content() {
			player.gain(trigger.cards.filterInD(), "gain2");
		},
	},
	lieren: {
		shaRelated: true,
		audio: 2,
		audioname: ["boss_lvbu3", "ol_zhurong"],
		trigger: { source: "damageSource" },
		filter(event, player) {
			if (event._notrigger.includes(event.player)) return false;
			return event.card && event.card.name == "sha" && event.getParent().name == "sha" && event.player.isIn() && player.canCompare(event.player);
		},
		check(event, player) {
			return get.attitude(player, event.player) < 0 && player.countCards("h") > 1;
		},
		//priority:5,
		content() {
			"step 0";
			player.chooseToCompare(trigger.player);
			"step 1";
			if (result.bool && trigger.player.countGainableCards(player, "he")) {
				player.gainPlayerCard(trigger.player, true, "he");
			}
		},
	},
	xingshang: {
		audio: 2,
		trigger: { global: "die" },
		preHidden: true,
		filter(event) {
			return event.player.countCards("he") > 0;
		},
		content() {
			"step 0";
			event.togain = trigger.player.getCards("he");
			player.gain(event.togain, trigger.player, "giveAuto", "bySelf");
		},
	},
	fangzhu: {
		audio: 2,
		trigger: { player: "damageEnd" },
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			var draw = player.getDamagedHp();
			player
				.chooseTarget(get.prompt("fangzhu"), "令一名其他角色翻面" + (draw > 0 ? "并摸" + get.cnNumber(draw) + "张牌" : ""), function (card, player, target) {
					return player != target;
				})
				.setHiddenSkill("fangzhu")
				.set("ai", target => {
					if (target.hasSkillTag("noturn")) return 0;
					var player = _status.event.player;
					var current = _status.currentPhase;
					var dis = current ? get.distance(current, target, "absolute") : 1;
					var draw = player.getDamagedHp();
					var att = get.attitude(player, target);
					if (att == 0) return target.hasJudge("lebu") ? Math.random() / 3 : Math.sqrt(get.threaten(target)) / 5 + Math.random() / 2;
					if (att > 0) {
						if (target.isTurnedOver()) return att + draw;
						if (draw < 4) return -1;
						if (current && target.getSeatNum() > current.getSeatNum()) return att + draw / 3;
						return (10 * Math.sqrt(Math.max(0.01, get.threaten(target)))) / (3.5 - draw) + dis / (2 * game.countPlayer());
					} else {
						if (target.isTurnedOver()) return att - draw;
						if (draw >= 5) return -1;
						if (current && target.getSeatNum() <= current.getSeatNum()) return -att + draw / 3;
						return (4.25 - draw) * 10 * Math.sqrt(Math.max(0.01, get.threaten(target))) + (2 * game.countPlayer()) / dis;
					}
				});
			"step 1";
			if (result.bool) {
				player.logSkill("fangzhu", result.targets);
				var draw = player.getDamagedHp();
				if (draw > 0) result.targets[0].draw(draw);
				result.targets[0].turnOver();
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
						if (target.hp <= 1) return;
						if (!target.hasFriend()) return;
						var hastarget = false;
						var turnfriend = false;
						var players = game.filterPlayer();
						for (var i = 0; i < players.length; i++) {
							if (get.attitude(target, players[i]) < 0 && !players[i].isTurnedOver()) {
								hastarget = true;
							}
							if (get.attitude(target, players[i]) > 0 && players[i].isTurnedOver()) {
								hastarget = true;
								turnfriend = true;
							}
						}
						if (get.attitude(player, target) > 0 && !hastarget) return;
						if (turnfriend || target.hp == target.maxHp) return [0.5, 1];
						if (target.hp > 1) return [1, 0.5];
					}
				},
			},
		},
	},
	songwei: {
		unique: true,
		group: "songwei2",
		audioname: ["re_caopi"],
		audio: "songwei2",
		zhuSkill: true,
	},
	songwei2: {
		audio: 2,
		audioname: ["re_caopi"],
		forceaudio: true,
		trigger: { global: "judgeEnd" },
		filter(event, player) {
			if (event.player == player || event.player.group != "wei") return false;
			if (event.result.color != "black") return false;
			return player.hasZhuSkill("songwei", event.player);
		},
		direct: true,
		content() {
			"step 0";
			trigger.player.chooseBool("是否发动【颂威】，令" + get.translation(player) + "摸一张牌？").set("choice", get.attitude(trigger.player, player) > 0);
			"step 1";
			if (result.bool) {
				player.logSkill("songwei2");
				trigger.player.line(player, "green");
				player.draw();
			}
		},
	},
	jiezi: {
		trigger: { global: ["phaseDrawSkipped", "phaseDrawCancelled"] },
		audio: 2,
		forced: true,
		filter(event, player) {
			return event.player != player;
		},
		content() {
			player.draw();
		},
	},
	gzduanliang: {
		audio: "duanliang1",
		audioname: ["re_xuhuang"],
		group: ["duanliang1", "duanliang2"],
		ai: {
			threaten: 1.2,
		},
	},
	duanliang: {
		audio: "duanliang1",
		audioname: ["re_xuhuang"],
		group: ["duanliang1", "duanliang3"],
		ai: {
			threaten: 1.2,
		},
	},
	duanliang1: {
		audio: 2,
		audioname: ["re_xuhuang"],
		enable: "chooseToUse",
		filterCard(card) {
			if (get.type(card) != "basic" && get.type(card) != "equip") return false;
			return get.color(card) == "black";
		},
		filter(event, player) {
			return player.countCards("hes", { type: ["basic", "equip"], color: "black" });
		},
		position: "hes",
		viewAs: { name: "bingliang" },
		prompt: "将一黑色的基本牌或装备牌当兵粮寸断使用",
		check(card) {
			return 6 - get.value(card);
		},
		ai: {
			order: 9,
		},
	},
	duanliang2: {
		mod: {
			targetInRange(card, player, target) {
				if (card.name == "bingliang") {
					if (get.distance(player, target) <= 2) return true;
				}
			},
		},
	},
	duanliang3: {
		mod: {
			targetInRange(card, player, target) {
				if (card.name == "bingliang") {
					if (target.countCards("h") >= player.countCards("h")) return true;
				}
			},
		},
	},
	haoshi: {
		audio: 2,
		trigger: { player: "phaseDrawBegin2" },
		filter(event, player) {
			return !event.numFixed;
		},
		preHidden: true,
		check(event, player) {
			return (
				player.countCards("h") + 2 + event.num <= 5 ||
				game.hasPlayer(function (target) {
					return (
						player !== target &&
						!game.hasPlayer(function (current) {
							return current !== player && current !== target && current.countCards("h") < target.countCards("h");
						}) &&
						get.attitude(player, target) > 0
					);
				})
			);
		},
		content() {
			trigger.num += 2;
			player.addSkill("haoshi2");
		},
		ai: {
			threaten: 2,
			noh: true,
			skillTagFilter(player, tag) {
				if (tag == "noh") {
					if (player.countCards("h") != 2) return false;
				}
			},
		},
	},
	haoshi2: {
		trigger: { player: "phaseDrawEnd" },
		forced: true,
		popup: false,
		audio: false,
		content() {
			"step 0";
			player.removeSkill("haoshi2");
			if (player.countCards("h") <= 5) {
				event.finish();
				return;
			}
			player.chooseCardTarget({
				selectCard: Math.floor(player.countCards("h") / 2),
				filterTarget(card, player, target) {
					return target.isMinHandcard();
				},
				prompt: "将一半的手牌交给场上手牌数最少的一名角色",
				forced: true,
				ai2(target) {
					return get.attitude(_status.event.player, target);
				},
			});
			"step 1";
			if (result.targets && result.targets[0]) {
				player.give(result.cards, result.targets[0]);
			}
		},
	},
	dimeng: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		position: "he",
		filterCard() {
			var targets = ui.selected.targets;
			if (targets.length == 2) {
				if (Math.abs(targets[0].countCards("h") - targets[1].countCards("h")) <= ui.selected.cards.length) return false;
			}
			return true;
		},
		selectCard: [0, Infinity],
		selectTarget: 2,
		complexCard: true,
		filterTarget(card, player, target) {
			if (player == target) return false;
			return true;
		},
		filterOk() {
			var targets = ui.selected.targets;
			if (targets.length != 2) return false;
			return Math.abs(targets[0].countCards("h") - targets[1].countCards("h")) == ui.selected.cards.length;
		},
		multitarget: true,
		multiline: true,
		content() {
			targets[0].swapHandcards(targets[1]);
		},
		check(card) {
			var list = [],
				player = _status.event.player;
			var num = player.countCards("he");
			var count;
			var players = game.filterPlayer();
			for (var i = 0; i < players.length; i++) {
				if (players[i] != player && get.attitude(player, players[i]) > 3) list.push(players[i]);
			}
			list.sort(function (a, b) {
				return a.countCards("h") - b.countCards("h");
			});
			if (list.length == 0) return -1;
			var from = list[0];
			list.length = 0;

			for (var i = 0; i < players.length; i++) {
				if (players[i] != player && get.attitude(player, players[i]) < 1) list.push(players[i]);
			}
			if (list.length == 0) return -1;
			list.sort(function (a, b) {
				return b.countCards("h") - a.countCards("h");
			});
			if (from.countCards("h") >= list[0].countCards("h")) return -1;
			for (var i = 0; i < list.length && from.countCards("h") < list[i].countCards("h"); i++) {
				if (list[i].countCards("h") - from.countCards("h") <= num) {
					count = list[i].countCards("h") - from.countCards("h");
					break;
				}
			}
			if (count < 2 && from.countCards("h") >= 2) return -1;
			if (ui.selected.cards.length < count) return 11 - get.value(card);
			return -1;
		},
		ai: {
			order: 6,
			threaten: 3,
			expose: 0.9,
			result: {
				target(player, target) {
					var list = [];
					var num = player.countCards("he");
					var players = game.filterPlayer();
					if (ui.selected.targets.length == 0) {
						for (var i = 0; i < players.length; i++) {
							if (players[i] != player && get.attitude(player, players[i]) > 3) list.push(players[i]);
						}
						list.sort(function (a, b) {
							return a.countCards("h") - b.countCards("h");
						});
						if (target == list[0]) return get.attitude(player, target);
						return -get.attitude(player, target);
					} else {
						var from = ui.selected.targets[0];
						for (var i = 0; i < players.length; i++) {
							if (players[i] != player && get.attitude(player, players[i]) < 1) list.push(players[i]);
						}
						list.sort(function (a, b) {
							return b.countCards("h") - a.countCards("h");
						});
						if (from.countCards("h") >= list[0].countCards("h")) return -get.attitude(player, target);
						for (var i = 0; i < list.length && from.countCards("h") < list[i].countCards("h"); i++) {
							if (list[i].countCards("h") - from.countCards("h") <= num) {
								var count = list[i].countCards("h") - from.countCards("h");
								if (count < 2 && from.countCards("h") >= 2) return -get.attitude(player, target);
								if (target == list[i]) return get.attitude(player, target);
								return -get.attitude(player, target);
							}
						}
					}
				},
			},
		},
	},
	yinghun: {
		audio: 2,
		audioname: ["re_sunjian", "sunce", "re_sunben", "re_sunce", "ol_sunjian"],
		audioname2: {
			re_sunyi: "gzyinghun_re_sunyi",
			tw_ol_sunjian: "yinghun_ol_sunjian",
		},
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && _status.event && _status.event.type == "phase" && get.tag(card, "recover")) {
					if (player.needsToDiscard()) return num / 3;
					return 0;
				}
			},
		},
		locked: false,
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			player
				.chooseTarget(get.prompt2("yinghun"), function (card, player, target) {
					return player != target;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					if (player.getDamagedHp() == 1 && target.countCards("he") == 0) {
						return 0;
					}
					if (get.attitude(_status.event.player, target) > 0) {
						return 10 + get.attitude(_status.event.player, target);
					}
					if (player.getDamagedHp() == 1) {
						return -1;
					}
					return 1;
				})
				.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				event.num = player.getDamagedHp();
				player.logSkill(event.name, result.targets);
				event.target = result.targets[0];
				if (event.num == 1) {
					event.directcontrol = true;
				} else {
					var str1 = "摸" + get.cnNumber(event.num, true) + "弃一";
					var str2 = "摸一弃" + get.cnNumber(event.num, true);
					player
						.chooseControl(str1, str2, function (event, player) {
							if (player.isHealthy()) return 1 - _status.event.choice;
							return _status.event.choice;
						})
						.set("choice", get.attitude(player, event.target) > 0 ? 0 : 1);
					event.str = str1;
				}
			} else {
				event.finish();
			}
			"step 2";
			if (event.directcontrol || result.control == event.str) {
				if (event.num > 0) event.target.draw(event.num);
				event.target.chooseToDiscard(true, "he");
			} else {
				event.target.draw();
				if (event.num > 0) event.target.chooseToDiscard(event.num, true, "he");
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (
						get.tag(card, "damage") &&
						get.itemtype(player) === "player" &&
						target.hp >
							(player.hasSkillTag("damageBonus", true, {
								target: target,
								card: card,
							})
								? 2
								: 1)
					)
						return [1, 1];
				},
			},
			threaten(player, target) {
				return Math.max(0.5, target.getDamagedHp() / 2);
			},
			maixie: true,
		},
	},
	gzyinghun: {
		audio: "yinghun",
		audioname: ["re_sunjian", "sunce", "re_sunben", "re_sunce", "ol_sunjian", "sb_sunce"],
		audioname2: {
			re_sunyi: "gzyinghun_re_sunyi",
			tw_ol_sunjian: "yinghun_ol_sunjian",
		},
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && _status.event && _status.event.type == "phase" && get.tag(card, "recover")) {
					if (player.needsToDiscard()) return num / 3;
					return 0;
				}
			},
		},
		locked: false,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return player.getDamagedHp() > 0;
		},
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			player
				.chooseTarget(get.prompt2("gzyinghun"), function (card, player, target) {
					return player != target;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					if (player.getDamagedHp() == 1 && target.countCards("he") == 0) {
						return 0;
					}
					if (get.attitude(_status.event.player, target) > 0) {
						return 10 + get.attitude(_status.event.player, target);
					}
					if (player.getDamagedHp() == 1) {
						return -1;
					}
					return 1;
				})
				.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				event.num = player.getDamagedHp();
				player.logSkill(event.name, result.targets);
				event.target = result.targets[0];
				if (event.num == 1) {
					event.directcontrol = true;
				} else {
					var str1 = "摸" + get.cnNumber(event.num, true) + "弃一";
					var str2 = "摸一弃" + get.cnNumber(event.num, true);
					player
						.chooseControl(str1, str2, function (event, player) {
							return _status.event.choice;
						})
						.set("choice", get.attitude(player, event.target) > 0 ? str1 : str2);
					event.str = str1;
				}
			} else {
				event.finish();
			}
			"step 2";
			if (event.directcontrol || result.control == event.str) {
				event.target.draw(event.num);
				event.target.chooseToDiscard(true, "he");
			} else {
				event.target.draw();
				event.target.chooseToDiscard(event.num, true, "he");
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (
						get.tag(card, "damage") &&
						get.itemtype(player) === "player" &&
						target.hp >
							(player.hasSkillTag("damageBonus", true, {
								target: target,
								card: card,
							})
								? 2
								: 1)
					)
						return [1, 1];
				},
			},
			threaten(player, target) {
				return Math.max(0.5, target.getDamagedHp() / 2);
			},
			maixie: true,
		},
	},
	yinghun_ol_sunjian: { audio: 2 },
	jiuchi: {
		audio: 2,
		audioname: ["re_dongzhuo"],
		enable: "chooseToUse",
		filterCard(card) {
			return get.suit(card) == "spade";
		},
		viewAs: { name: "jiu" },
		viewAsFilter(player) {
			if (!player.countCards("hs", { suit: "spade" })) return false;
			return true;
		},
		prompt: "将一张黑桃手牌当酒使用",
		check(card) {
			if (_status.event.type == "dying") return 1 / Math.max(0.1, get.value(card));
			return 4 - get.value(card);
		},
		ai: {
			threaten: 1.5,
		},
	},
	roulin: {
		audio: 2,
		audioname: ["re_dongzhuo", "ol_dongzhuo"],
		trigger: { player: "useCardToPlayered", target: "useCardToTargeted" },
		forced: true,
		filter(event, player) {
			if (event.card.name != "sha") return false;
			if (player == event.player) {
				return event.target.hasSex("female");
			}
			return event.player.hasSex("female");
		},
		check(event, player) {
			return player == event.player;
		},
		content() {
			var id = (player == trigger.player ? trigger.target : player).playerid;
			var map = trigger.getParent().customArgs;
			if (!map[id]) map[id] = {};
			if (typeof map[id].shanRequired == "number") {
				map[id].shanRequired++;
			} else {
				map[id].shanRequired = 2;
			}
		},
		ai: {
			halfneg: true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (tag === "directHit_ai") return;
				if (arg.card.name != "sha" || !arg.target.hasSex("female") || arg.target.countCards("h", "shan") > 1) return false;
			},
		},
	},
	benghuai: {
		audio: 2,
		audioname: ["zhugedan", "re_dongzhuo", "ol_dongzhuo", "re_zhugedan"],
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		check() {
			return false;
		},
		filter(event, player) {
			return !player.isMinHp() && !player.hasSkill("rejiuchi_air") && !player.hasSkill("oljiuchi_air");
		},
		content() {
			"step 0";
			player
				.chooseControl("baonue_hp", "baonue_maxHp", function (event, player) {
					if (player.hp == player.maxHp) return "baonue_hp";
					if (player.hp < player.maxHp - 1 || player.hp <= 2) return "baonue_maxHp";
					return "baonue_hp";
				})
				.set("prompt", "崩坏：失去1点体力或减1点体力上限");
			"step 1";
			if (result.control == "baonue_hp") {
				player.loseHp();
			} else {
				player.loseMaxHp(true);
			}
		},
		ai: {
			threaten: 0.5,
			neg: true,
		},
	},
	baonue: {
		unique: true,
		group: "baonue2",
		audioname: ["re_dongzhuo"],
		audio: "baonue2",
		zhuSkill: true,
	},
	baonue2: {
		audio: 2,
		audioname: ["re_dongzhuo"],
		//forceaudio:true,
		trigger: { global: "damageSource" },
		filter(event, player) {
			if (player == event.source || !event.source || event.source.group != "qun") return false;
			return player.hasZhuSkill("baonue", event.source);
		},
		direct: true,
		content() {
			"step 0";
			trigger.source.chooseBool("是否对" + get.translation(player) + "发动【暴虐】？").set("choice", get.attitude(trigger.source, player) > 0);
			"step 1";
			if (result.bool) {
				player.logSkill("baonue");
				trigger.source.line(player, "green");
				trigger.source.judge(function (card) {
					if (get.suit(card) == "spade") return 4;
					return 0;
				}).judge2 = function (result) {
					return result.bool ? true : false;
				};
			} else {
				event.finish();
			}
			"step 2";
			if (result.suit == "spade") {
				player.recover();
			}
		},
	},
	luanwu: {
		audio: 2,
		audioname: ["re_jiaxu"],
		unique: true,
		enable: "phaseUse",
		limited: true,
		skillAnimation: "epic",
		animationColor: "thunder",
		filterTarget(card, player, target) {
			return target != player;
		},
		selectTarget: -1,
		multitarget: true,
		multiline: true,
		content() {
			"step 0";
			player.awakenSkill("luanwu");
			event.current = player.next;
			event.currented = [];
			"step 1";
			event.currented.push(event.current);
			event.current.addTempClass("target");
			event.current
				.chooseToUse(
					"乱武：使用一张杀或失去1点体力",
					function (card) {
						if (get.name(card) != "sha") return false;
						return lib.filter.cardEnabled.apply(this, arguments);
					},
					function (card, player, target) {
						if (player == target) return false;
						var dist = get.distance(player, target);
						if (dist > 1) {
							if (
								game.hasPlayer(function (current) {
									return current != player && get.distance(player, current) < dist;
								})
							) {
								return false;
							}
						}
						return lib.filter.filterTarget.apply(this, arguments);
					}
				)
				.set("ai2", function () {
					return get.effect_use.apply(this, arguments) + 0.01;
				})
				.set("addCount", false);
			"step 2";
			if (result.bool == false) event.current.loseHp();
			event.current = event.current.next;
			if (event.current != player && !event.currented.includes(event.current)) {
				game.delay(0.5);
				event.goto(1);
			}
		},
		ai: {
			order: 1,
			result: {
				player(player) {
					if (lib.config.mode == "identity" && game.zhu.isZhu && player.identity == "fan") {
						if (game.zhu.hp == 1 && game.zhu.countCards("h") <= 2) return 1;
					}
					var num = 0;
					var players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						var att = get.attitude(player, players[i]);
						if (att > 0) att = 1;
						if (att < 0) att = -1;
						if (players[i] != player && players[i].hp <= 3) {
							if (players[i].countCards("h") == 0) num += att / players[i].hp;
							else if (players[i].countCards("h") == 1) num += att / 2 / players[i].hp;
							else if (players[i].countCards("h") == 2) num += att / 4 / players[i].hp;
						}
						if (players[i].hp == 1) num += att * 1.5;
					}
					if (player.hp == 1) {
						return -num;
					}
					if (player.hp == 2) {
						return -game.players.length / 4 - num;
					}
					return -game.players.length / 3 - num;
				},
			},
		},
	},
	wansha: {
		locked: true,
		audio: 2,
		audioname: ["boss_lvbu3", "shen_simayi"],
		global: "wansha2",
		trigger: { global: "dying" },
		priority: 15,
		forced: true,
		preHidden: true,
		filter(event, player, name) {
			return _status.currentPhase == player && event.player != player;
		},
		content() {},
	},
	wansha2: {
		mod: {
			cardSavable(card, player) {
				if (card.name == "tao" && _status.currentPhase && _status.currentPhase.isIn() && _status.currentPhase.hasSkill("wansha") && _status.currentPhase != player) {
					if (!player.isDying()) return false;
				}
			},
			cardEnabled(card, player) {
				if (card.name == "tao" && _status.currentPhase && _status.currentPhase.isIn() && _status.currentPhase.hasSkill("wansha") && _status.currentPhase != player) {
					if (!player.isDying()) return false;
				}
			},
		},
	},
	weimu: {
		trigger: { global: "useCard1" },
		audio: 2,
		forced: true,
		firstDo: true,
		filter(event, player, card) {
			if (get.color(event.card) != "black") return false;
			return (event.card.name == "nanman" && player != event.player) || (event.card.name == "wanjian" && player != event.player) || (event.card.name == "taoyuan" && player.hp < player.maxHp) || event.card.name == "wugu";
		},
		content() {},
		mod: {
			targetEnabled(card) {
				if ((get.type(card) == "trick" || get.type(card) == "delay") && get.color(card) == "black") return false;
			},
		},
	},
	huoji: {
		audio: 2,
		enable: "chooseToUse",
		filterCard(card) {
			return get.color(card) == "red";
		},
		viewAs: { name: "huogong" },
		viewAsFilter(player) {
			if (!player.countCards("hs", { color: "red" })) return false;
		},
		position: "hs",
		prompt: "将一张红色牌当火攻使用",
		check(card) {
			var player = get.player();
			if (player.countCards("h") > player.hp) {
				return 6 - get.value(card);
			}
			return 3 - get.value(card);
		},
		ai: {
			fireAttack: true,
		},
	},
	bazhen: {
		audio: 2,
		audioname: ["re_sp_zhugeliang", "ol_sp_zhugeliang", "ol_pangtong"],
		group: "bazhen_bagua",
		locked: true,
	},
	bazhen_bagua: {
		audio: "bazhen",
		audioname: ["re_sp_zhugeliang", "ol_sp_zhugeliang", "ol_pangtong"],
		equipSkill: true,
		noHidden: true,
		inherit: "bagua_skill",
		filter(event, player) {
			if (!lib.skill.bagua_skill.filter(event, player)) return false;
			if (!player.hasEmptySlot(2)) return false;
			return true;
		},
		ai: {
			respondShan: true,
			freeShan: true,
			skillTagFilter(player, tag, arg) {
				if (tag !== "respondShan" && tag !== "freeShan") return;
				if (!player.hasEmptySlot(2) || player.hasSkillTag("unequip2")) return false;
				if (!arg || !arg.player) return true;
				if (
					arg.player.hasSkillTag("unequip", false, {
						target: player,
					})
				)
					return false;
				return true;
			},
			effect: {
				target(card, player, target) {
					if (player == target && get.subtype(card) == "equip2") {
						if (get.equipValue(card) <= 7.5) return 0;
					}
					if (!target.hasEmptySlot(2)) return;
					return lib.skill.bagua_skill.ai.effect.target.apply(this, arguments);
				},
			},
		},
	},
	kanpo: {
		mod: {
			aiValue(player, card, num) {
				if (get.name(card) != "wuxie" && get.color(card) != "black") return;
				var cards = player.getCards("hs", function (card) {
					return get.name(card) == "wuxie" || get.color(card) == "black";
				});
				cards.sort(function (a, b) {
					return (get.name(b) == "wuxie" ? 1 : 2) - (get.name(a) == "wuxie" ? 1 : 2);
				});
				var geti = function () {
					if (cards.includes(card)) {
						return cards.indexOf(card);
					}
					return cards.length;
				};
				if (get.name(card) == "wuxie") return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6;
				return Math.max(num, [6, 4, 3][Math.min(geti(), 2)]);
			},
			aiUseful() {
				return lib.skill.kanpo.mod.aiValue.apply(this, arguments);
			},
		},
		locked: false,
		audio: 2,
		enable: "chooseToUse",
		filterCard(card) {
			return get.color(card) == "black";
		},
		viewAsFilter(player) {
			return player.countCards("hs", { color: "black" }) > 0;
		},
		viewAs: { name: "wuxie" },
		position: "hs",
		prompt: "将一张黑色手牌当无懈可击使用",
		check(card) {
			var tri = _status.event.getTrigger();
			if (tri && tri.card && tri.card.name == "chiling") return -1;
			return 8 - get.value(card);
		},
		threaten: 1.2,
	},
	niepan: {
		audio: 2,
		audioname: ["re_pangtong"],
		unique: true,
		enable: "chooseToUse",
		mark: true,
		limited: true,
		skillAnimation: true,
		animationColor: "fire",
		init(player) {
			player.storage.niepan = false;
		},
		filter(event, player) {
			if (player.storage.niepan) return false;
			if (event.type == "dying") {
				if (player != event.dying) return false;
				return true;
			} else if (event.parent.name == "phaseUse") {
				return true;
			}
			return false;
		},
		content() {
			"step 0";
			player.awakenSkill("niepan");
			player.storage.niepan = true;
			player.discard(player.getCards("hej"));
			"step 1";
			player.link(false);
			"step 2";
			player.turnOver(false);
			"step 3";
			player.draw(3);
			"step 4";
			if (player.hp < 3) {
				player.recover(3 - player.hp);
			}
		},
		ai: {
			order: 0.5,
			skillTagFilter(player, tag, target) {
				if (player != target || player.storage.niepan) return false;
			},
			save: true,
			result: {
				player(player) {
					if (player.hp <= 0) return 10;
					if (player.hp <= 1 && player.countCards("he") <= 1) return 10;
					return 0;
				},
			},
			threaten(player, target) {
				if (!target.storage.niepan) return 0.6;
			},
		},
		intro: {
			content: "limited",
		},
	},
	oldniepan: {
		audio: "niepan",
		unique: true,
		enable: "chooseToUse",
		mark: true,
		skillAnimation: true,
		limited: true,
		animationColor: "orange",
		init(player) {
			player.storage.oldniepan = false;
		},
		filter(event, player) {
			if (player.storage.oldniepan) return false;
			if (event.type == "dying") {
				if (player != event.dying) return false;
				return true;
			}
			return false;
		},
		content() {
			"step 0";
			player.awakenSkill("oldniepan");
			player.storage.oldniepan = true;
			player.discard(player.getCards("hej"));
			"step 1";
			player.link(false);
			"step 2";
			player.turnOver(false);
			"step 3";
			player.draw(3);
			"step 4";
			if (player.hp < 3) {
				player.recover(3 - player.hp);
			}
		},
		ai: {
			order: 1,
			skillTagFilter(player, arg, target) {
				if (player != target || player.storage.oldniepan) return false;
			},
			save: true,
			result: {
				player(player) {
					if (player.hp <= 0) return 10;
					if (player.hp <= 2 && player.countCards("he") <= 1) return 10;
					return 0;
				},
			},
			threaten(player, target) {
				if (!target.storage.oldniepan) return 0.6;
			},
		},
		intro: {
			content: "limited",
		},
	},
	quhu: {
		audio: 2,
		audioname: ["re_xunyu", "ol_xunyu"],
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			if (player.countCards("h") == 0) return false;
			return game.hasPlayer(function (current) {
				return current.hp > player.hp && player.canCompare(current);
			});
		},
		filterTarget(card, player, target) {
			return target.hp > player.hp && player.canCompare(target);
		},
		content() {
			"step 0";
			player.chooseToCompare(target);
			"step 1";
			if (result.bool) {
				if (
					game.hasPlayer(function (player) {
						return player != target && target.inRange(player);
					})
				) {
					player
						.chooseTarget(function (card, player, target) {
							var source = _status.event.source;
							return target != source && source.inRange(target);
						}, true)
						.set("ai", function (target) {
							return get.damageEffect(target, _status.event.source, player);
						})
						.set("source", target);
				} else {
					event.finish();
				}
			} else {
				player.damage(target);
				event.finish();
			}
			"step 2";
			if (result.bool && result.targets && result.targets.length) {
				target.line(result.targets[0], "green");
				result.targets[0].damage(target);
			}
		},
		ai: {
			order: 0.5,
			result: {
				target(player, target) {
					var att = get.attitude(player, target);
					var oc = target.countCards("h") == 1;
					if (att > 0 && oc) return 0;
					var players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						if (players[i] != target && players[i] != player && target.inRange(players[i])) {
							if (get.damageEffect(players[i], target, player) > 0) {
								return att > 0 ? att / 2 : att - (oc ? 5 : 0);
							}
						}
					}
					return 0;
				},
				player(player, target) {
					if (target.hasSkillTag("jueqing", false, target)) return -10;
					var mn = 1;
					var hs = player.getCards("h");
					for (var i = 0; i < hs.length; i++) {
						mn = Math.max(mn, get.number(hs[i]));
					}
					if (mn <= 11 && player.hp < 2) return -20;
					var max = player.maxHp - hs.length;
					var players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						if (get.attitude(player, players[i]) > 2) {
							max = Math.max(Math.min(5, players[i].hp) - players[i].countCards("h"), max);
						}
					}
					switch (max) {
						case 0:
							return mn == 13 ? 0 : -20;
						case 1:
							return mn >= 12 ? 0 : -15;
						case 2:
							return 0;
						case 3:
							return 1;
						default:
							return max;
					}
				},
			},
			expose: 0.2,
		},
	},
	jieming: {
		audio: 2,
		trigger: { player: "damageEnd" },
		direct: true,
		content() {
			"step 0";
			event.count = trigger.num;
			"step 1";
			event.count--;
			player
				.chooseTarget(get.prompt2("jieming"), function (card, player, target) {
					return true; //target.countCards('h')<Math.min(target.maxHp,5);
				})
				.set("ai", function (target) {
					var att = get.attitude(_status.event.player, target);
					if (target.hasSkillTag("nogain")) att /= 6;
					if (att > 2) {
						return Math.max(0, Math.min(5, target.maxHp) - target.countCards("h"));
					}
					return att / 3;
				});
			"step 2";
			if (result.bool) {
				player.logSkill("jieming", result.targets);
				for (var i = 0; i < result.targets.length; i++) {
					result.targets[i].drawTo(Math.min(5, result.targets[i].maxHp));
				}
				if (event.count && player.hasSkill("jieming")) event.goto(1);
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, "damage") && target.hp > 1) {
						if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
						var max = 0;
						var players = game.filterPlayer();
						for (var i = 0; i < players.length; i++) {
							if (get.attitude(target, players[i]) > 0) {
								max = Math.max(Math.min(5, players[i].hp) - players[i].countCards("h"), max);
							}
						}
						switch (max) {
							case 0:
								return 2;
							case 1:
								return 1.5;
							case 2:
								return [1, 2];
							default:
								return [0, max];
						}
					}
					if ((card.name == "tao" || card.name == "caoyao") && target.hp > 1 && target.countCards("h") <= target.hp) return [0, 0];
				},
			},
		},
	},
	qiangxix: {
		inherit: "reqiangxi",
		audioname: ["boss_lvbu3"],
		audio: "qiangxi",
		usable: 2,
		filterTarget(card, player, target) {
			if (player == target) return false;
			if (target.hasSkill("reqiangxi_off")) return false;
			return true;
		},
	},
	qiangxi: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		audioname: ["boss_lvbu3"],
		filterCard(card) {
			return get.subtype(card) == "equip1";
		},
		selectCard: [0, 1],
		filterTarget(card, player, target) {
			if (player == target) return false;
			return player.inRange(target);
		},
		content() {
			"step 0";
			if (cards.length == 0) {
				player.loseHp();
			}
			"step 1";
			target.damage("nocard");
		},
		check(card) {
			return 10 - get.value(card);
		},
		position: "he",
		ai: {
			damage: true,
			order: 8,
			result: {
				player(player, target) {
					if (ui.selected.cards.length) return 0;
					if (player.hp >= target.hp) return -0.9;
					if (player.hp <= 2) return -10;
					return -2;
				},
				target(player, target) {
					if (!ui.selected.cards.length) {
						if (player.hp < 2) return 0;
						if (player.hp == 2 && target.hp >= 2) return 0;
						if (target.hp > player.hp) return 0;
					}
					return get.damageEffect(target, player);
				},
			},
			threaten: 1.3,
		},
	},
	xinqiangxi: {
		audio: "qiangxi",
		enable: "phaseUse",
		filter(event, player) {
			if (player.hasSkill("xinqiangxi2")) {
				return !player.hasSkill("xinqiangxi3");
			} else if (player.hasSkill("xinqiangxi3")) {
				return !player.hasSkill("xinqiangxi2") && player.countCards("he", { type: "equip" }) > 0;
			} else {
				return true;
			}
		},
		filterCard(card) {
			var player = _status.event.player;
			if (player.hasSkill("xinqiangxi2")) return false;
			return get.type(card) == "equip";
		},
		selectCard() {
			var player = _status.event.player;
			if (player.hasSkill("xinqiangxi2")) return -1;
			if (player.hasSkill("xinqiangxi3")) return [1, 1];
			return [0, 1];
		},
		filterTarget(card, player, target) {
			if (player == target) return false;
			return player.inRange(target);
		},
		content() {
			"step 0";
			if (cards.length == 0) {
				player.loseHp();
				player.addTempSkill("xinqiangxi3");
			} else {
				player.addTempSkill("xinqiangxi2");
			}
			"step 1";
			target.damage("nocard");
		},
		check(card) {
			return 10 - get.value(card);
		},
		position: "he",
		ai: {
			order: 8.5,
			result: {
				target(player, target) {
					if (!ui.selected.cards.length) {
						if (player.hp < 2) return 0;
						if (target.hp >= player.hp) return 0;
					}
					return get.damageEffect(target, player);
				},
			},
		},
		threaten: 1.5,
	},
	xinqiangxi2: {},
	xinqiangxi3: {},
	tianyi: {
		audio: 2,
		audioname: ["re_taishici"],
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			return player.canCompare(target);
		},
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		content() {
			"step 0";
			player.chooseToCompare(target);
			"step 1";
			if (result.bool) {
				player.addTempSkill("tianyi2");
			} else {
				player.addTempSkill("tianyi3");
			}
		},
		ai: {
			order(name, player) {
				var cards = player.getCards("h");
				if (player.countCards("h", "sha") == 0) {
					return 1;
				}
				for (var i = 0; i < cards.length; i++) {
					if (cards[i].name != "sha" && get.number(cards[i]) > 11 && get.value(cards[i]) < 7) {
						return 9;
					}
				}
				return get.order({ name: "sha" }) - 1;
			},
			result: {
				player(player) {
					if (player.countCards("h", "sha") > 0) return 0.6;
					var num = player.countCards("h");
					if (num > player.hp) return 0;
					if (num == 1) return -2;
					if (num == 2) return -1;
					return -0.7;
				},
				target(player, target) {
					var num = target.countCards("h");
					if (num == 1) return -1;
					if (num == 2) return -0.7;
					return -0.5;
				},
			},
			threaten: 1.3,
		},
	},
	tianyi2: {
		mod: {
			targetInRange(card, player, target, now) {
				if (card.name == "sha") return true;
			},
			selectTarget(card, player, range) {
				if (card.name == "sha" && range[1] != -1) range[1]++;
			},
			cardUsable(card, player, num) {
				if (card.name == "sha") return num + 1;
			},
		},
		charlotte: true,
	},
	tianyi3: {
		mod: {
			cardEnabled(card) {
				if (card.name == "sha") return false;
			},
		},
		charlotte: true,
	},
	shuangxiong: {
		audio: 2,
		audioname: ["re_yanwen"],
		group: "shuangxiong1",
		subSkill: {
			re_yanwen1: { audio: true },
			re_yanwen2: { audio: true },
		},
	},
	shuangxiong1: {
		audio: true,
		trigger: { player: "phaseDrawBegin1" },
		check(event, player) {
			if (player.countCards("h") > player.hp) return true;
			if (player.countCards("h") > 3) return true;
			return false;
		},
		filter(event, player) {
			return !event.numFixed;
		},
		preHidden: true,
		prompt2: () => "进行一次判定，本回合可以将一张与此牌颜色不同的手牌当作【决斗】使用",
		content() {
			player.judge().set("callback", lib.skill.shuangxiong1.callback);
			trigger.changeToZero();
		},
		callback() {
			player.gain(card, "gain2");
			player.addTempSkill("shuangxiong2");
			player.markAuto("shuangxiong2", [event.judgeResult.color]);
		},
	},
	shuangxiong2: {
		charlotte: true,
		onremove: true,
		audio: true,
		audioname2: {
			re_yanwen: "shuangxiong_re_yanwen2",
		},
		enable: "chooseToUse",
		viewAs: { name: "juedou" },
		position: "hs",
		viewAsFilter(player) {
			return player.hasCard(card => lib.skill.shuangxiong2.filterCard(card, player), "hs");
		},
		filterCard(card, player) {
			var color = get.color(card),
				colors = player.getStorage("shuangxiong2");
			for (var i of colors) {
				if (color != i) return true;
			}
			return false;
		},
		prompt() {
			var colors = _status.event.player.getStorage("shuangxiong2");
			var str = "将一张颜色";
			for (var i = 0; i < colors.length; i++) {
				if (i > 0) str += "或";
				str += "不为";
				str += get.translation(colors[i]);
			}
			str += "的牌当做【决斗】使用";
			return str;
		},
		check(card) {
			var player = _status.event.player;
			var raw = player.getUseValue(card, null, true);
			var eff = player.getUseValue(get.autoViewAs({ name: "juedou" }, [card]));
			return eff - raw;
		},
		ai: { order: 7 },
	},
	luanji: {
		audio: 2,
		enable: "phaseUse",
		position: "hs",
		viewAs: { name: "wanjian" },
		filterCard(card, player) {
			if (ui.selected.cards.length) {
				return get.suit(card) == get.suit(ui.selected.cards[0]);
			}
			var cards = player.getCards("hs");
			for (var i = 0; i < cards.length; i++) {
				if (card != cards[i]) {
					if (get.suit(card) == get.suit(cards[i])) return true;
				}
			}
			return false;
		},
		selectCard: 2,
		complexCard: true,
		check(card) {
			var player = _status.event.player;
			var targets = game.filterPlayer(function (current) {
				return player.canUse("wanjian", current);
			});
			var num = 0;
			for (var i = 0; i < targets.length; i++) {
				var eff = get.sgn(get.effect(targets[i], { name: "wanjian" }, player, player));
				if (targets[i].hp == 1) {
					eff *= 1.5;
				}
				num += eff;
			}
			if (!player.needsToDiscard(-1)) {
				if (targets.length >= 7) {
					if (num < 2) return 0;
				} else if (targets.length >= 5) {
					if (num < 1.5) return 0;
				}
			}
			return 6 - get.value(card);
		},
		ai: {
			basic: {
				order: 8.5,
			},
		},
	},
	xueyi: {
		trigger: { player: "phaseDiscardBefore" },
		audio: 2,
		audioname: ["re_yuanshao"],
		forced: true,
		firstDo: true,
		filter(event, player) {
			return (
				player.hasZhuSkill("xueyi") &&
				game.hasPlayer(function (current) {
					return current != player && current.group == "qun";
				}) &&
				player.countCards("h") > player.hp
			);
		},
		content() {},
		mod: {
			maxHandcard(player, num) {
				if (player.hasZhuSkill("xueyi")) {
					return (
						num +
						game.countPlayer(function (current) {
							if (player != current && current.group == "qun") return 2;
						})
					);
				}
				return num;
			},
		},
		zhuSkill: true,
	},
	mengjin: {
		shaRelated: true,
		audio: 2,
		trigger: { player: "shaMiss" },
		//priority:-1,
		filter(event) {
			return event.target.countCards("he") > 0;
		},
		check(event, player) {
			return get.attitude(player, event.target) < 0;
		},
		logTarget: "target",
		content() {
			player.discardPlayerCard("he", trigger.target, true);
		},
	},
	jiewei: {
		trigger: { player: "turnOverEnd" },
		//direct:true,
		frequent: true,
		audio: "xinjiewei",
		content() {
			"step 0";
			player.draw();
			player.chooseToUse(function (card) {
				if (!lib.filter.cardEnabled(card, _status.event.player, _status.event)) {
					return false;
				}
				var type = get.type(card, "trick");
				return type == "trick" || type == "equip";
			}, "是否使用一张锦囊牌或装备牌？");
			"step 1";
			if (result.bool) {
				var type = get.type(result.card || result.cards[0]);
				if (
					game.hasPlayer(function (current) {
						if (type == "equip") {
							return current.countCards("e");
						} else {
							return current.countCards("j");
						}
					})
				) {
					var next = player.chooseTarget("是否弃置场上的一张" + get.translation(type) + "牌？", function (card, player, target) {
						if (_status.event.type == "equip") {
							return target.countCards("e") > 0;
						} else {
							return target.countCards("j") > 0;
						}
					});
					next.set("ai", function (target) {
						if (type == "equip") {
							return -get.attitude(player, target);
						} else {
							return get.attitude(player, target);
						}
					});
					next.set("type", type);
					event.type = type;
				} else {
					event.finish();
				}
			} else {
				event.finish();
			}
			"step 2";
			if (event.type && result.bool && result.targets && result.targets.length) {
				player.line(result.targets, "green");
				if (event.type == "equip") {
					player.discardPlayerCard(result.targets[0], "e", true);
				} else {
					player.discardPlayerCard(result.targets[0], "j", true);
				}
			}
		},
	},
	releiji: {
		audio: 2,
		audioname: ["boss_qinglong"],
		trigger: { player: ["useCard", "respond"] },
		filter(event, player) {
			return event.card.name == "shan";
		},
		direct: true,
		content() {
			"step 0";
			player.chooseTarget(get.prompt2("releiji"), function (card, player, target) {
				return target != player;
			}).ai = function (target) {
				if (target.hasSkill("hongyan")) return 0;
				return get.damageEffect(target, _status.event.player, _status.event.player, "thunder");
			};
			"step 1";
			if (result.bool) {
				player.logSkill("releiji", result.targets, "thunder");
				event.target = result.targets[0];
				event.target.judge(function (card) {
					var suit = get.suit(card);
					if (suit == "spade") return -4;
					if (suit == "club") return -2;
					return 0;
				}).judge2 = function (result) {
					return result.bool == false ? true : false;
				};
			} else {
				event.finish();
			}
			"step 2";
			if (result.suit == "club") {
				player.recover();
				event.target.damage("thunder");
			} else if (result.suit == "spade") {
				event.target.damage(2, "thunder");
			}
		},
		ai: {
			useShan: true,
			effect: {
				target(card, player, target, current) {
					if (
						get.tag(card, "respondShan") &&
						!player.hasSkillTag(
							"directHit_ai",
							true,
							{
								target: target,
								card: card,
							},
							true
						)
					) {
						let club = 0,
							spade = 0;
						if (
							game.hasPlayer(function (current) {
								return get.attitude(target, current) < 0 && get.damageEffect(current, target, target, "thunder") > 0;
							})
						) {
							club = 2;
							spade = 4;
						}
						if (!target.isHealthy()) club += 2;
						if (!club && !spade) return 1;
						if (card.name === "sha") {
							if (
								!target.mayHaveShan(
									player,
									"use",
									target.getCards("h", i => {
										return i.hasGaintag("sha_notshan");
									})
								)
							)
								return;
						} else if (!target.mayHaveShan(player)) return 1 - 0.1 * Math.min(5, target.countCards("hs"));
						if (!target.hasSkillTag("rejudge")) return [1, (club + spade) / 4];
						let pos = player.hasSkillTag("viewHandcard", null, target, true) ? "hes" : "e",
							better = club > spade ? "club" : "spade",
							max = 0;
						target.hasCard(function (cardx) {
							if (get.suit(cardx) === better) {
								max = 2;
								return true;
							}
							if (spade && get.color(cardx) === "black") max = 1;
						}, pos);
						if (max === 2) return [1, Math.max(club, spade)];
						if (max === 1) return [1, Math.min(club, spade)];
						if (pos === "e") return [1, Math.min((Math.max(1, target.countCards("hs")) * (club + spade)) / 4, Math.max(club, spade))];
						return [1, (club + spade) / 4];
					}
				},
			},
		},
	},
	shensu: {
		audio: "shensu1",
		audioname: ["xiahouba", "re_xiahouyuan", "ol_xiahouyuan"],
		group: ["shensu1", "shensu2"],
		preHidden: ["shensu1", "shensu2"],
	},
	xinshensu: {
		audio: "shensu1",
		audioname: ["xiahouba", "re_xiahouyuan", "ol_xiahouyuan"],
		audioname2: {
			dc_xiahouba: "shensu1_xiahouba",
		},
		group: ["shensu1", "shensu2", "shensu4"],
	},
	shensu1_xiahouba: { audio: 2 },
	shensu1: {
		audio: 2,
		audioname: ["xiahouba", "re_xiahouyuan", "ol_xiahouyuan"],
		audioname2: {
			dc_xiahouba: "shensu1_xiahouba",
		},
		trigger: { player: "phaseJudgeBefore" },
		direct: true,
		content() {
			"step 0";
			player
				.chooseTarget(get.prompt("shensu"), "跳过判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】", function (card, player, target) {
					if (player == target) return false;
					return player.canUse({ name: "sha" }, target, false);
				})
				.set("check", player.countCards("h") > 2)
				.set("ai", function (target) {
					if (!_status.event.check) return 0;
					return get.effect(target, { name: "sha" }, _status.event.player);
				})
				.setHiddenSkill("shensu1");
			"step 1";
			if (result.bool) {
				player.logSkill("shensu1", result.targets);
				player.useCard({ name: "sha", isCard: true }, result.targets[0], false);
				trigger.cancel();
				player.skip("phaseDraw");
			}
		},
	},
	shensu2: {
		audio: "shensu1",
		audioname: ["xiahouba", "re_xiahouyuan", "ol_xiahouyuan"],
		audioname2: {
			dc_xiahouba: "shensu1_xiahouba",
		},
		trigger: { player: "phaseUseBefore" },
		direct: true,
		filter(event, player) {
			return (
				player.countCards("he", function (card) {
					if (_status.connectMode) return true;
					return get.type(card) == "equip";
				}) > 0
			);
		},
		content() {
			"step 0";
			player
				.chooseCardTarget({
					prompt: get.prompt("shensu"),
					prompt2: "弃置一张装备牌并跳过出牌阶段，视为对一名其他角色使用一张【杀】",
					filterCard(card, player) {
						return get.type(card) == "equip" && lib.filter.cardDiscardable(card, player);
					},
					position: "he",
					filterTarget(card, player, target) {
						if (player == target) return false;
						return player.canUse({ name: "sha" }, target, false);
					},
					ai1(card) {
						if (_status.event.check) return 0;
						return 6 - get.value(card);
					},
					ai2(target) {
						if (_status.event.check) return 0;
						return get.effect(target, { name: "sha" }, _status.event.player);
					},
					check:
						player.countCards("hs", i => {
							return player.hasValueTarget(i, null, true);
						}) >
						player.hp - 1,
				})
				.setHiddenSkill("shensu2");
			"step 1";
			if (result.bool) {
				player.logSkill("shensu2", result.targets);
				player.discard(result.cards[0]);
				player.useCard({ name: "sha", isCard: true }, result.targets[0], false);
				trigger.cancel();
			}
		},
	},
	shensu4: {
		audio: "shensu1",
		audioname: ["xiahouba", "re_xiahouyuan", "ol_xiahouyuan"],
		audioname2: {
			dc_xiahouba: "shensu1_xiahouba",
		},
		trigger: { player: "phaseDiscardBefore" },
		direct: true,
		content() {
			"step 0";
			var check = player.needsToDiscard() || player.isTurnedOver() || (player.hasSkill("shebian") && player.canMoveCard(true, true));
			player
				.chooseTarget(get.prompt("shensu"), "跳过弃牌阶段并将武将牌翻面，视为对一名其他角色使用一张【杀】", function (card, player, target) {
					if (player == target) return false;
					return player.canUse({ name: "sha" }, target, false);
				})
				.set("check", check)
				.set("ai", function (target) {
					if (!_status.event.check) return 0;
					return get.effect(target, { name: "sha" }, _status.event.player, _status.event.player);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("shensu4", result.targets);
				player.turnOver();
				player.useCard({ name: "sha", isCard: true }, result.targets[0], false);
				trigger.cancel();
			}
		},
	},
	jushou: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		check(event, player) {
			return event.player.hp + player.countCards("h") < 4;
		},
		content() {
			player.draw(3);
			player.turnOver();
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (card.name == "guiyoujie") return [0, 1];
				},
			},
		},
	},
	moon_jushou: {
		audio: "xinjushou",
		trigger: { player: "phaseJieshuBegin" },
		check(event, player) {
			return event.player.hp + player.countCards("h") < 4;
		},
		content() {
			player.draw();
			player.turnOver();
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (card.name == "guiyoujie") return [0, 1];
				},
			},
		},
	},
	liegong: {
		shaRelated: true,
		audio: 2,
		audioname: ["re_huangzhong"],
		trigger: { player: "useCardToPlayered" },
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		logTarget: "target",
		filter(event, player) {
			if (event.card.name != "sha") return false;
			var length = event.target.countCards("h");
			return length >= player.hp || length <= player.getAttackRange();
		},
		preHidden: true,
		content() {
			trigger.getParent().directHit.push(trigger.target);
		},
		locked: false,
		mod: {
			attackRange(player, distance) {
				if (get.zhu(player, "shouyue")) return distance + 1;
			},
		},
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (get.attitude(player, arg.target) > 0 || arg.card.name != "sha") return false;
				var length = arg.target.countCards("h");
				return length >= player.hp || length <= player.getAttackRange();
			},
		},
	},
	kuanggu: {
		audio: 2,
		audioname: ["re_weiyan", "ol_weiyan"],
		trigger: { source: "damageSource" },
		forced: true,
		filter(event, player) {
			return event.kuangguCheck && player.isDamaged();
		},
		content() {
			player.recover(trigger.num);
		},
		group: "kuanggu_check",
		subSkill: {
			check: {
				charlotte: true,
				trigger: { source: "damage" },
				filter(event, player) {
					return get.distance(player, event.player) <= 1;
				},
				firstDo: true,
				silent: true,
				content() {
					trigger.kuangguCheck = true;
				},
			},
		},
	},
	tianxiang: {
		audio: 2,
		audioname: ["daxiaoqiao", "re_xiaoqiao", "ol_xiaoqiao"],
		trigger: { player: "damageBegin3" },
		direct: true,
		filter(event, player) {
			return player.countCards("h", { suit: "heart" }) > 0 && event.num > 0;
		},
		content() {
			"step 0";
			player.chooseCardTarget({
				filterCard(card, player) {
					return get.suit(card) == "heart" && lib.filter.cardDiscardable(card, player);
				},
				filterTarget(card, player, target) {
					return player != target;
				},
				ai1(card) {
					return 10 - get.value(card);
				},
				ai2(target) {
					var att = get.attitude(_status.event.player, target);
					var trigger = _status.event.getTrigger();
					var da = 0;
					if (_status.event.player.hp == 1) {
						da = 10;
					}
					if (trigger.num > 1) {
						if (target.maxHp > 5 && target.hp > 1) return -att / 10 + da;
						return -att + da;
					}
					var eff = get.damageEffect(target, trigger.source, target, trigger.nature);
					if (att == 0) return 0.1 + da;
					if (eff >= 0 && trigger.num == 1) {
						return att + da;
					}
					if (target.hp == target.maxHp) return -att + da;
					if (target.hp == 1) {
						if (target.maxHp <= 4 && !target.hasSkillTag("maixie")) {
							if (target.maxHp <= 3) {
								return -att + da;
							}
							return -att / 2 + da;
						}
						return da;
					}
					if (target.hp == target.maxHp - 1) {
						if (target.hp > 2 || target.hasSkillTag("maixie")) return att / 5 + da;
						if (att > 0) return 0.02 + da;
						return 0.05 + da;
					}
					return att / 2 + da;
				},
				prompt: get.prompt2("tianxiang"),
			});
			"step 1";
			if (result.bool) {
				player.logSkill(event.name, result.targets);
				trigger.player = result.targets[0];
				trigger.player.addSkill("tianxiang2");
				player.discard(result.cards[0]);
			}
		},
		ai: {
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) return;
					if (get.tag(card, "damage") && target.countCards("h") > 1) return 0.7;
				},
			},
			threaten(player, target) {
				if (target.countCards("h") == 0) return 2;
			},
		},
	},
	tianxiang2: {
		trigger: { player: ["damageAfter", "damageCancelled", "damageZero"] },
		forced: true,
		popup: false,
		audio: false,
		vanish: true,
		charlotte: true,
		content() {
			if (player.getDamagedHp()) player.draw(player.getDamagedHp());
			player.removeSkill("tianxiang2");
			player.popup("tianxiang");
		},
	},
	retianxiang: {
		audio: "tianxiang",
		audioname: ["daxiaoqiao", "re_xiaoqiao", "ol_xiaoqiao"],
		trigger: { player: "damageBegin4" },
		direct: true,
		preHidden: true,
		filter(event, player) {
			return (
				player.countCards("h", function (card) {
					return _status.connectMode || get.suit(card, player) == "heart";
				}) > 0 && event.num > 0
			);
		},
		content() {
			"step 0";
			player
				.chooseCardTarget({
					filterCard(card, player) {
						return get.suit(card) == "heart" && lib.filter.cardDiscardable(card, player);
					},
					filterTarget(card, player, target) {
						return player != target;
					},
					ai1(card) {
						return 10 - get.value(card);
					},
					ai2(target) {
						var att = get.attitude(_status.event.player, target);
						var trigger = _status.event.getTrigger();
						var da = 0;
						if (_status.event.player.hp == 1) {
							da = 10;
						}
						var eff = get.damageEffect(target, trigger.source, target);
						if (att == 0) return 0.1 + da;
						if (eff >= 0 && att > 0) {
							return att + da;
						}
						if (att > 0 && target.hp > 1) {
							if (target.maxHp - target.hp >= 3) return att * 1.1 + da;
							if (target.maxHp - target.hp >= 2) return att * 0.9 + da;
						}
						return -att + da;
					},
					prompt: get.prompt("retianxiang"),
					prompt2: lib.translate.retianxiang_info,
				})
				.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				player.discard(result.cards);
				var target = result.targets[0];
				player
					.chooseControlList(
						true,
						function (event, player) {
							var target = _status.event.target;
							var att = get.attitude(player, target);
							if (target.hasSkillTag("maihp")) att = -att;
							if (att > 0) {
								return 0;
							} else {
								return 1;
							}
						},
						["令" + get.translation(target) + "受到伤害来源对其造成的1点伤害，然后摸X张牌（X为其已损失体力值且至多为5）", "令" + get.translation(target) + "失去1点体力，然后获得" + get.translation(result.cards)]
					)
					.set("target", target);
				player.logSkill(event.name, target);
				trigger.cancel();
				event.target = target;
				event.card = result.cards[0];
			} else {
				event.finish();
			}
			"step 2";
			if (typeof result.index == "number") {
				event.index = result.index;
				if (result.index) {
					event.related = event.target.loseHp();
				} else {
					event.related = event.target.damage(trigger.source || "nosource", "nocard");
				}
			} else event.finish();
			"step 3";
			//if(event.related.cancelled||target.isDead()) return;
			if (event.index && card.isInPile()) target.gain(card, "gain2");
			else if (target.getDamagedHp()) target.draw(Math.min(5, target.getDamagedHp()));
		},
		ai: {
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) return;
					if (get.tag(card, "damage") && target.countCards("he") > 1) return 0.7;
				},
			},
		},
	},
	retianxiang3: {
		trigger: { player: "loseHpAfter" },
		forced: true,
		popup: false,
		filter(event) {
			return event.type == "retianxiang";
		},
		vanish: true,
		content() {
			"step 0";
			player.gain(player.storage.retianxiang3, "gain2");
			"step 1";
			player.removeSkill("retianxiang3");
		},
		onremove(player) {
			var card = player.storage.retianxiang3;
			if (get.position(card) == "s") {
				game.cardsDiscard(card);
			}
			delete player.storage.retianxiang3;
		},
	},
	retianxiang2: {
		trigger: { player: "damageAfter" },
		forced: true,
		popup: false,
		filter(event) {
			return event.type == "retianxiang";
		},
		vanish: true,
		content() {
			if (player.isDamaged()) {
				player.draw(player.getDamagedHp());
			}
			player.removeSkill("retianxiang2");
		},
	},
	xintianxiang: {
		audio: "tianxiang",
		trigger: { player: "damageBefore" },
		direct: true,
		filter(event, player) {
			return player.countCards("he", { suit: "heart" }) > 0 && event.num > 0 && !player.hasSkill("xintianxiang3");
		},
		content() {
			"step 0";
			player.chooseCardTarget({
				filterCard(card, player) {
					return get.suit(card) == "heart" && lib.filter.cardDiscardable(card, player);
				},
				filterTarget(card, player, target) {
					return player != target;
				},
				position: "he",
				ai1(card) {
					return 10 - get.value(card);
				},
				ai2(target) {
					var att = get.attitude(_status.event.player, target);
					var trigger = _status.event.getTrigger();
					var da = 0;
					if (_status.event.player.hp == 1) {
						da = 10;
					}
					if (trigger.num > 1) {
						if (target.maxHp > 5 && target.hp > 1) return -att / 10 + da;
						return -att + da;
					}
					var eff = get.damageEffect(target, trigger.source, target, trigger.nature);
					if (att == 0) return 0.1 + da;
					if (eff >= 0 && trigger.num == 1) {
						return att + da;
					}
					if (target.hp == target.maxHp) return -att + da;
					if (target.hp == 1) {
						if (target.maxHp <= 4 && !target.hasSkillTag("maixie")) {
							if (target.maxHp <= 3) {
								return -att + da;
							}
							return -att / 2 + da;
						}
						return da;
					}
					if (target.hp == target.maxHp - 1) {
						if (target.hp > 2 || target.hasSkillTag("maixie")) return att / 5 + da;
						if (att > 0) return 0.02 + da;
						return 0.05 + da;
					}
					return att / 2 + da;
				},
				prompt: get.prompt2("xintianxiang"),
			});
			"step 1";
			if (result.bool) {
				player.logSkill(event.name, result.targets);
				trigger.player = result.targets[0];
				trigger.player.addSkill("xintianxiang2");
				trigger.player.storage.xintianxiang = player;
				player.discard(result.cards[0]);
			} else {
				event.finish();
			}
		},
		ai: {
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) return;
					if (get.tag(card, "damage") && target.countCards("he") > 1) return 0.7;
				},
			},
		},
	},
	xintianxiang2: {
		trigger: { player: ["damageAfter", "damageCancelled", "damageZero"] },
		forced: true,
		popup: false,
		audio: false,
		vanish: true,
		content() {
			"step 0";
			var source = player.storage.xintianxiang;
			if (source.isDead()) {
				event.finish();
				return;
			}
			var num = player.maxHp - player.hp || 0;
			var str1 = "令" + get.translation(player) + "摸" + get.cnNumber(num) + "张牌";
			var str2 = "令" + get.translation(player) + "防止造成和受到的所有伤害且天香失效直到你下一回合开始";
			var att = get.attitude(source, player);
			var choice = "选项一";
			if (att < 0) {
				if (num >= 2) {
					choice = "选项二";
				}
			} else if (att > 0) {
				if (num < 2 && !player.hasSkillTag("maixie")) {
					choice = "选项二";
				}
			}
			source
				.chooseControl(function () {
					return _status.event.choice;
				})
				.set("choiceList", [str1, str2])
				.set("choice", choice);
			"step 1";
			if (result.control == "选项一") {
				if (player.isDamaged()) {
					player.draw(player.maxHp - player.hp);
				}
			} else {
				player.storage.xintianxiang.addSkill("xintianxiang3");
				player.storage.xintianxiang.storage.xintianxiang3 = player;
				player.addSkill("xintianxiang4");
			}
			player.removeSkill("xintianxiang2");
			delete player.storage.xintianxiang;
		},
	},
	xintianxiang3: {
		trigger: { player: ["phaseZhunbeiBegin", "dieBegin"] },
		silent: true,
		content() {
			if (player.storage.xintianxiang3) {
				player.storage.xintianxiang3.removeSkill("xintianxiang4");
				delete player.storage.xintianxiang3;
			}
			player.removeSkill("xintianxiang3");
		},
	},
	xintianxiang4: {
		trigger: { source: "damageBefore", player: "damageBefore" },
		forced: true,
		mark: true,
		intro: {
			content: "防止造成和受到的一切伤害",
		},
		priority: 15,
		content() {
			trigger.cancel();
		},
		ai: {
			nofire: true,
			nothunder: true,
			nodamage: true,
			notrick: true,
			notricksource: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, "damage")) {
						return "zeroplayertarget";
					}
				},
				player(card, player, target, current) {
					if (get.tag(card, "damage")) {
						return "zeroplayertarget";
					}
				},
			},
		},
	},
	hongyan: {
		mod: {
			suit(card, suit) {
				if (suit == "spade") return "heart";
			},
		},
	},
	xinhongyan: {
		audio: 2,
		audioname: ["sb_xiaoqiao"],
		mod: {
			suit(card, suit) {
				if (suit == "spade") return "heart";
			},
		},
		trigger: { global: "judge" },
		direct: true,
		filter(event, player) {
			if (event.fixedResult && event.fixedResult.suit) return event.fixedResult.suit == "heart";
			return get.suit(event.player.judging[0], event.player) == "heart";
		},
		content() {
			"step 0";
			var str = "红颜：" + get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定为" + get.translation(trigger.player.judging[0]) + "，请将其改为一种花色";
			player
				.chooseControl("spade", "heart", "diamond", "club")
				.set("prompt", str)
				.set("ai", function () {
					var judging = _status.event.judging;
					var trigger = _status.event.getTrigger();
					var res1 = trigger.judge(judging);
					var list = lib.suit.slice(0);
					var attitude = get.attitude(player, trigger.player);
					if (attitude == 0) return 0;
					var getj = function (suit) {
						return trigger.judge({
							name: get.name(judging),
							nature: get.nature(judging),
							suit: suit,
							number: get.number(judging),
						});
					};
					list.sort(function (a, b) {
						return (getj(b) - getj(a)) * get.sgn(attitude);
					});
					return list[0];
				})
				.set("judging", trigger.player.judging[0]);
			"step 1";
			if (result.control != "cancel2") {
				player.addExpose(0.25);
				player.popup(result.control);
				game.log(player, "将判定结果改为了", "#y" + get.translation(result.control + 2));
				if (!trigger.fixedResult) trigger.fixedResult = {};
				trigger.fixedResult.suit = result.control;
				trigger.fixedResult.color = get.color({ suit: result.control });
			}
		},
		ai: {
			rejudge: true,
			tag: {
				rejudge: 0.4,
			},
			expose: 0.5,
		},
	},
	gzbuqu: {
		audio: 2,
		trigger: { player: "changeHp" },
		filter(event, player) {
			return player.hp <= 0 && event.num < 0;
		},
		marktext: "创",
		intro: {
			markcount: "expansion",
			content: "expansion",
		},
		group: "gzbuqu_recover",
		frequent: true,
		ondisable: true,
		onremove(player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) {
				//delete player.nodying;
				player.loseToDiscardpile(cards);
				if (player.hp <= 0) player.dying({});
			}
		},
		process(player) {
			//delete player.nodying;
			var nums = [];
			var cards = player.getExpansions("gzbuqu");
			for (var i = 0; i < cards.length; i++) {
				if (nums.includes(get.number(cards[i]))) {
					return false;
				} else {
					nums.push(get.number(cards[i]));
				}
			}
			return true;
			//player.nodying=true;
		},
		subSkill: {
			recover: {
				trigger: { player: "recoverAfter" },
				filter(event, player) {
					return player.getExpansions("gzbuqu").length > 0 && event.num > 0;
				},
				forced: true,
				popup: false,
				content() {
					"step 0";
					event.count = trigger.num;
					"step 1";
					event.count--;
					var cards = player.getExpansions("gzbuqu"),
						count = cards.length;
					if (count > 0 && player.hp + count > 1) {
						if (count == 1) event._result = { links: cards };
						else
							player.chooseCardButton("不屈：移去一张“创”", true, cards).set("ai", function (button) {
								var buttons = get.selectableButtons();
								for (var i = 0; i < buttons.length; i++) {
									if (buttons[i] != button && get.number(buttons[i].link) == get.number(button.link) && !ui.selected.buttons.includes(buttons[i])) {
										return 1;
									}
								}
								return 0;
							});
					} else event.finish();
					"step 2";
					var cards = result.links;
					player.loseToDiscardpile(cards);
					if (event.count) event.goto(1);
					"step 3";
					if (lib.skill.gzbuqu.process(player)) {
						if (player.isDying()) {
							var evt = event,
								histories = [evt];
							while (true) {
								evt = event.getParent("dying");
								if (!evt || evt.name != "dying" || histories.includes(evt)) break;
								histories.push(evt);
								if (evt.player == player) evt.nodying = true;
							}
						}
					}
				},
			},
		},
		content() {
			"step 0";
			var num = -trigger.num - Math.max(player.hp - trigger.num, 1) + 1;
			player.addToExpansion(get.cards(num), "gain2").gaintag.add("gzbuqu");
			"step 1";
			player.showCards(get.translation(player) + "的不屈牌", player.getExpansions("gzbuqu"));
			"step 2";
			if (lib.skill.gzbuqu.process(player)) {
				var evt = trigger.getParent();
				if (evt.name == "damage" || evt.name == "loseHp") evt.nodying = true;
			}
		},
		ai: {
			mingzhi: true,
		},
	},
	buqu: {
		audio: 2,
		audioname: ["key_yuri"],
		trigger: { player: "chooseToUseBefore" },
		forced: true,
		preHidden: true,
		filter(event, player) {
			return event.type == "dying" && player.isDying() && event.dying == player && !event.getParent()._buqu;
		},
		content() {
			"step 0";
			trigger.getParent()._buqu = true;
			var card = get.cards()[0];
			event.card = card;
			player.addToExpansion(card, "gain2").gaintag.add("buqu");
			"step 1";
			var cards = player.getExpansions("buqu"),
				num = get.number(card);
			player.showCards(cards, "不屈");
			for (var i = 0; i < cards.length; i++) {
				if (cards[i] != card && get.number(cards[i]) == num) {
					player.loseToDiscardpile(card);
					return;
				}
			}
			trigger.cancel();
			trigger.result = { bool: true };
			if (player.hp <= 0) {
				player.recover(1 - player.hp);
			}
		},
		mod: {
			maxHandcardBase(player, num) {
				if (get.mode() != "guozhan" && player.getExpansions("buqu").length) return player.getExpansions("buqu").length;
			},
		},
		ai: {
			save: true,
			mingzhi: true,
			skillTagFilter(player, tag, target) {
				if (player != target) return false;
			},
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
	},
	fenji: {
		audio: 2,
		trigger: {
			global: ["gainAfter", "loseAfter", "loseAsyncAfter"],
		},
		direct: true,
		filter(event, player) {
			if (event.name == "lose") {
				if (event.type != "discard" || !event.player.isIn()) return false;
				if ((event.discarder || event.getParent(2).player) == event.player) return false;
				if (!event.getl(event.player).hs.length) return false;
				return true;
			} else if (event.name == "gain") {
				if (event.giver || event.getParent().name == "gift") return false;
				var cards = event.getg(event.player);
				if (!cards.length) return false;
				return game.hasPlayer(function (current) {
					if (current == event.player) return false;
					var hs = event.getl(current).hs;
					for (var i of hs) {
						if (cards.includes(i)) return true;
					}
					return false;
				});
			} else if (event.type == "gain") {
				if (event.giver || !event.player || !event.player.isIn()) return false;
				var hs = event.getl(event.player);
				return game.hasPlayer(function (current) {
					if (current == event.player) return false;
					var cards = event.getg(current);
					for (var i of cards) {
						if (hs.includes(i)) return true;
					}
				});
			} else if (event.type == "discard") {
				if (!event.discarder) return false;
				return game.hasPlayer(function (current) {
					return current != event.discarder && event.getl(current).hs.length > 0;
				});
			}
			return false;
		},
		content() {
			"step 0";
			var targets = [];
			if (trigger.name == "gain") {
				var cards = trigger.getg(trigger.player);
				targets.addArray(
					game.filterPlayer(function (current) {
						if (current == trigger.player) return false;
						var hs = trigger.getl(current).hs;
						for (var i of hs) {
							if (cards.includes(i)) return true;
						}
						return false;
					})
				);
			} else if (trigger.name == "loseAsync" && trigger.type == "discard") {
				targets.addArray(
					game.filterPlayer(function (current) {
						return current != trigger.discarder && trigger.getl(current).hs.length > 0;
					})
				);
			} else targets.push(trigger.player);
			event.targets = targets.sortBySeat();
			if (!event.targets.length) event.finish();
			"step 1";
			var target = targets.shift();
			event.target = target;
			if (target.isIn())
				player.chooseBool(get.prompt("fenji", target), "失去1点体力，令该角色摸两张牌").set("ai", function () {
					var evt = _status.event.getParent();
					return get.attitude(evt.player, evt.target) > 4;
				});
			else {
				if (targets.length > 0) event.goto(1);
				else event.finish();
			}
			"step 2";
			if (result.bool) {
				player.logSkill("fenji", target);
				player.loseHp();
			} else {
				if (targets.length > 0) event.goto(1);
				else event.finish();
			}
			"step 3";
			target.draw(2);
			if (targets.length > 0) event.goto(1);
		},
	},
	new_fenji: {
		audio: "fenji",
		trigger: {
			global: "phaseJieshuBegin",
		},
		filter(event, player) {
			if (event.player.countCards("h") == 0 && event.player.isIn()) return true;
			return false;
		},
		preHidden: true,
		check(event, player) {
			return get.attitude(player, event.player) > 2;
		},
		content() {
			player.line(trigger.player, "green");
			trigger.player.draw(2);
			player.loseHp();
		},
	},
	leiji: {
		audio: 2,
		trigger: { player: ["useCard", "respond"] },
		filter(event, player) {
			return event.card.name == "shan";
		},
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			player.chooseTarget(get.prompt2("leiji")).setHiddenSkill(event.name).ai = function (target) {
				if (target.hasSkill("hongyan")) return 0;
				return get.damageEffect(target, _status.event.player, _status.event.player, "thunder");
			};
			"step 1";
			if (result.bool) {
				player.logSkill("leiji", result.targets, "thunder");
				event.target = result.targets[0];
				event.target.judge(function (card) {
					if (get.suit(card) == "spade") return -4;
					return 0;
				}).judge2 = function (result) {
					return result.bool == false ? true : false;
				};
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool == false) {
				event.target.damage(2, "thunder");
			}
		},
		ai: {
			mingzhi: false,
			useShan: true,
			effect: {
				target(card, player, target, current) {
					if (
						get.tag(card, "respondShan") &&
						!player.hasSkillTag(
							"directHit_ai",
							true,
							{
								target: target,
								card: card,
							},
							true
						) &&
						game.hasPlayer(function (current) {
							return get.attitude(target, current) < 0 && get.damageEffect(current, target, target, "thunder") > 0;
						})
					) {
						if (card.name === "sha") {
							if (
								!target.mayHaveShan(
									player,
									"use",
									target.getCards("h", i => {
										return i.hasGaintag("sha_notshan");
									})
								)
							)
								return;
						} else if (!target.mayHaveShan(player)) return 1 - 0.1 * Math.min(5, target.countCards("hs"));
						if (!target.hasSkillTag("rejudge")) return [1, 1];
						let pos = player.hasSkillTag("viewHandcard", null, target, true) ? "hes" : "e";
						if (
							target.hasCard(function (cardx) {
								return get.suit(cardx) === "spade";
							}, pos)
						)
							return [1, 4];
						if (pos === "e") return [1, Math.min(4, 1 + 0.75 * Math.max(1, target.countCards("hs")))];
						return [1, 1];
					}
				},
			},
		},
	},
	guidao: {
		audio: 2,
		audioname: ["sp_zhangjiao"],
		trigger: { global: "judge" },
		filter(event, player) {
			return player.countCards("hes", { color: "black" }) > 0;
		},
		direct: true,
		content() {
			"step 0";
			player
				.chooseCard(get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定为" + get.translation(trigger.player.judging[0]) + "，" + get.prompt("guidao"), "hes", function (card) {
					if (get.color(card) != "black") return false;
					var player = _status.event.player;
					var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") return mod2;
					var mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
					if (mod != "unchanged") return mod;
					return true;
				})
				.set("ai", function (card) {
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					var judging = _status.event.judging;
					var result = trigger.judge(card) - trigger.judge(judging);
					var attitude = get.attitude(player, trigger.player);
					if (attitude == 0 || result == 0) return 0;
					if (attitude > 0) {
						return result;
					} else {
						return -result;
					}
				})
				.set("judging", trigger.player.judging[0]);
			"step 1";
			if (result.bool) {
				player.respond(result.cards, "highlight", "guidao", "noOrdering");
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				player.$gain2(trigger.player.judging[0]);
				player.gain(trigger.player.judging[0]);
				trigger.player.judging[0] = result.cards[0];
				trigger.orderingCards.addArray(result.cards);
				game.log(trigger.player, "的判定牌改为", result.cards[0]);
			}
			"step 3";
			game.delay(2);
		},
		ai: {
			rejudge: true,
			tag: {
				rejudge: 1,
			},
		},
	},
	// 蛊惑（guhuo）技能错误，请勿引用
	/*
	guhuo:{
		enable:'phaseUse',
		usable:1,
		audio:2,
		filter:function(event,player){
			return player.countCards('hs')>0
		},
		chooseButton:{
			dialog:function(){
				var list=['sha','tao','jiu','taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman'];
				for(var i=0;i<list.length;i++){
					if(i<3){
						list[i]=['基本','',list[i]];
					}
					else{
						list[i]=['锦囊','',list[i]];
					}
				}
				return ui.create.dialog([list,'vcard']);
			},
			filter:function(button,player){
				return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function(button){
				var player=_status.event.player;
				if(player.countCards('h','wuzhong')){
					if(player.hp==1&&player.countCards('h','tao')){
						return button.link=='tao'?1:0;
					}
					return button.link=='wuzhong'?1:0;
				}
				if(player.hp<player.maxHp){
					if(player.countCards('h','tao')){
						return button.link=='tao'?1:0;
					}
				}
			},
			backup:function(links,player){
				return {
					filterCard:true,
					selectCard:-1,
					audio:2,
					popname:true,
					viewAs:{name:links[0][2]},
				}
			},
			prompt:function(links,player){
				return '将全部手牌当'+get.translation(links[0][2])+'使用';
			}
		},
		ai:{
			order:1,
			result:{
				player:function(player){
					var num=0;
					var cards=player.getCards('h');
					if(cards.length>=3&&player.hp>=3) return 0;
					for(var i=0;i<cards.length;i++){
						num+=Math.max(0,get.value(cards[i],player,'raw'));
					}
					num/=cards.length;
					num*=Math.min(cards.length,player.hp);
					return 12-num;
				}
			},
			threaten:1.6,
		}
	},
	*/
	huangtian: {
		unique: true,
		audio: "huangtian2",
		audioname: ["zhangjiao", "re_zhangjiao"],
		global: "huangtian2",
		zhuSkill: true,
	},
	huangtian2: {
		audio: 2,
		enable: "phaseUse",
		discard: false,
		lose: false,
		delay: false,
		line: true,
		prepare(cards, player, targets) {
			targets[0].logSkill("huangtian");
		},
		prompt() {
			var player = _status.event.player;
			var list = game.filterPlayer(function (target) {
				return target != player && target.hasZhuSkill("huangtian", player);
			});
			var str = "将一张【闪】或【闪电】交给" + get.translation(list);
			if (list.length > 1) str += "中的一人";
			return str;
		},
		filter(event, player) {
			if (player.group != "qun") return false;
			if (player.countCards("h", "shan") + player.countCards("h", "shandian") == 0) return 0;
			return game.hasPlayer(function (target) {
				return target != player && target.hasZhuSkill("huangtian", player) && !target.hasSkill("huangtian3");
			});
		},
		filterCard(card) {
			return card.name == "shan" || card.name == "shandian";
		},
		log: false,
		visible: true,
		filterTarget(card, player, target) {
			return target != player && target.hasZhuSkill("huangtian", player) && !target.hasSkill("huangtian3");
		},
		//usable:1,
		//forceaudio:true,
		content() {
			player.give(cards, target);
			target.addTempSkill("huangtian3", "phaseUseEnd");
		},
		ai: {
			expose: 0.3,
			order: 10,
			result: {
				target: 5,
			},
		},
	},
	huangtian3: {},
	xinfu_guhuo: {
		audio: "guhuo_guess",
		derivation: ["chanyuan"],
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard(player, name) {
			return lib.inpile.includes(name) && player.countCards("hs") > 0 && !player.hasSkill("guhuo_phase");
		},
		filter(event, player) {
			if (player.hasSkill("guhuo_phase")) return false;
			if (!player.countCards("hs")) return false;
			for (var i of lib.inpile) {
				var type = get.type(i);
				if ((type == "basic" || type == "trick") && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event)) return true;
				if (i == "sha") {
					for (var j of lib.inpile_nature) {
						if (event.filterCard(get.autoViewAs({ name: i, nature: j }, "unsure"), player, event)) return true;
					}
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i of lib.inpile) {
					if (event.type != "phase") if (!event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event)) continue;
					var type = get.type(i);
					if (type == "basic" || type == "trick") list.push([type, "", i]);
					if (i == "sha") {
						if (event.type != "phase") if (!event.filterCard(get.autoViewAs({ name: i, nature: j }, "unsure"), player, event)) continue;
						for (var j of lib.inpile_nature) list.push(["基本", "", "sha", j]);
					}
				}
				return ui.create.dialog("蛊惑", [list, "vcard"]);
			},
			filter(button, player) {
				var evt = _status.event.getParent();
				return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
			},
			check(button) {
				var player = _status.event.player;
				var enemyNum = game.countPlayer(function (current) {
					return current != player && !current.hasSkill("chanyuan") && (get.realAttitude || get.attitude)(current, player) < 0;
				});
				var card = { name: button.link[2], nature: button.link[3] };
				var val = _status.event.getParent().type == "phase" ? player.getUseValue(card) : 1;
				if (val <= 0) return 0;
				if (enemyNum) {
					if (
						!player.hasCard(function (cardx) {
							if (card.name == cardx.name) {
								if (card.name != "sha") return true;
								return get.is.sameNature(card, cardx);
							}
							return false;
						}, "hs")
					) {
						if (get.value(card, player, "raw") < 6) return Math.sqrt(val) * (0.25 + Math.random() / 1.5);
						if (enemyNum <= 2) return Math.sqrt(val) / 1.5;
						return 0;
					}
					return 3 * val;
				}
				return val;
			},
			backup(links, player) {
				return {
					filterCard(card, player, target) {
						var result = true;
						var suit = card.suit,
							number = card.number;
						card.suit = "none";
						card.number = null;
						var mod = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
						if (mod != "unchanged") result = mod;
						card.suit = suit;
						card.number = number;
						return result;
					},
					selectCard: 1,
					position: "hs",
					ignoreMod: true,
					aiUse: Math.random(),
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						suit: "none",
						number: null,
					},
					ai1(card) {
						var player = _status.event.player;
						var enemyNum = game.countPlayer(function (current) {
							return current != player && !current.hasSkill("chanyuan") && (get.realAttitude || get.attitude)(current, player) < 0;
						});
						var cardx = lib.skill.xinfu_guhuo_backup.viewAs;
						if (enemyNum) {
							if (card.name == cardx.name && (card.name != "sha" || get.is.sameNature(card, cardx))) return 2 + Math.random() * 3;
							else if (lib.skill.xinfu_guhuo_backup.aiUse < 0.5 && !player.isDying()) return 0;
						}
						return 6 - get.value(card);
					},
					precontent() {
						player.logSkill("xinfu_guhuo");
						player.addTempSkill("guhuo_guess");
						var card = event.result.cards[0];
						event.result.card.suit = get.suit(card);
						event.result.card.number = get.number(card);
					},
				};
			},
			prompt(links, player) {
				return "将一张手牌当做" + get.translation(links[0][2]) + (_status.event.name == "chooseToRespond" ? "打出" : "使用");
			},
		},
		ai: {
			save: true,
			respondSha: true,
			respondShan: true,
			fireAttack: true,
			skillTagFilter(player) {
				if (!player.countCards("hs") || player.hasSkill("guhuo_phase")) return false;
			},
			threaten: 1.2,
			order: 8.1,
			result: { player: 1 },
		},
	},
	guhuo_guess: {
		audio: 2,
		trigger: {
			player: ["useCardBefore", "respondBefore"],
		},
		forced: true,
		silent: true,
		popup: false,
		firstDo: true,
		charlotte: true,
		filter(event, player) {
			return event.skill && (event.skill.indexOf("guhuo_") == 0 || event.skill.indexOf("xinfu_guhuo_") == 0);
		},
		content() {
			"step 0";
			player.addTempSkill("guhuo_phase");
			event.fake = false;
			event.betrayer = null;
			var card = trigger.cards[0];
			if (card.name != trigger.card.name || (card.name == "sha" && !get.is.sameNature(trigger.card, card))) event.fake = true;
			player.popup(trigger.card.name, "metal");
			player.lose(card, ui.ordering).relatedEvent = trigger;
			// player.line(trigger.targets,trigger.card.nature);
			trigger.throw = false;
			trigger.skill = "xinfu_guhuo_backup";
			game.log(player, "声明", trigger.targets && trigger.targets.length ? "对" : "", trigger.targets || "", trigger.name == "useCard" ? "使用" : "打出", trigger.card);
			event.prompt = get.translation(player) + "声明" + (trigger.targets && trigger.targets.length ? "对" + get.translation(trigger.targets) : "") + (trigger.name == "useCard" ? "使用" : "打出") + (get.translation(trigger.card.nature) || "") + get.translation(trigger.card.name) + "，是否质疑？";
			event.targets = game
				.filterPlayer(function (current) {
					return current != player && !current.hasSkill("chanyuan");
				})
				.sortBySeat(_status.currentPhase);

			game.broadcastAll(
				function (card, player) {
					_status.guhuoNode = card.copy("thrown");
					if (lib.config.cardback_style != "default") {
						_status.guhuoNode.style.transitionProperty = "none";
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.classList.add("infohidden");
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.style.transitionProperty = "";
					} else {
						_status.guhuoNode.classList.add("infohidden");
					}
					_status.guhuoNode.style.transform = "perspective(600px) rotateY(180deg) translateX(0)";
					player.$throwordered2(_status.guhuoNode);
				},
				trigger.cards[0],
				player
			);
			event.onEnd01 = function () {
				_status.guhuoNode.removeEventListener("webkitTransitionEnd", _status.event.onEnd01);
				setTimeout(function () {
					_status.guhuoNode.style.transition = "all ease-in 0.3s";
					_status.guhuoNode.style.transform = "perspective(600px) rotateY(270deg)";
					var onEnd = function () {
						_status.guhuoNode.classList.remove("infohidden");
						_status.guhuoNode.style.transition = "all 0s";
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.style.transform = "perspective(600px) rotateY(-90deg)";
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.style.transition = "";
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.style.transform = "";
						_status.guhuoNode.removeEventListener("webkitTransitionEnd", onEnd);
					};
					_status.guhuoNode.listenTransition(onEnd);
				}, 300);
			};
			if (!event.targets.length) event.goto(3);
			"step 1";
			event.target = event.targets.shift();
			event.target.chooseButton([event.prompt, [["reguhuo_ally", "reguhuo_betray"], "vcard"]], true).set("ai", function (button) {
				var player = _status.event.player;
				var evt = _status.event.getParent("guhuo_guess"),
					evtx = evt.getTrigger();
				if (!evt) return Math.random();
				var card = { name: evtx.card.name, nature: evtx.card.nature, isCard: true };
				var ally = button.link[2] == "reguhuo_ally";
				if (ally && (player.hp <= 1 || get.attitude(player, evt.player) >= 0)) return 1.1;
				if (!ally && get.attitude(player, evt.player) < 0 && evtx.name == "useCard") {
					var eff = 0;
					var targetsx = evtx.targets || [];
					for (var target of targetsx) {
						var isMe = target == evt.player;
						eff += get.effect(target, card, evt.player, player) / (isMe ? 1.5 : 1);
					}
					eff /= 1.5 * targetsx.length || 1;
					if (eff > 0) return 0;
					if (eff < -7) return Math.random() + Math.pow(-(eff + 7) / 8, 2);
					return Math.pow((get.value(card, evt.player, "raw") - 4) / (eff == 0 ? 5 : 10), 2);
				}
				return Math.random();
			});
			"step 2";
			if (result.links[0][2] == "reguhuo_betray") {
				target.addExpose(0.2);
				game.log(target, "#y质疑");
				target.popup("质疑！", "fire");
				event.betrayer = target;
			} else {
				game.log(target, "#g不质疑");
				target.popup("不质疑", "wood");
				if (targets.length) event.goto(1);
			}
			"step 3";
			game.delayx();
			game.broadcastAll(function (onEnd) {
				_status.event.onEnd01 = onEnd;
				if (_status.guhuoNode) _status.guhuoNode.listenTransition(onEnd, 300);
			}, event.onEnd01);
			"step 4";
			game.delay(2);
			"step 5";
			if (!event.betrayer) event.finish();
			"step 6";
			if (event.fake) {
				event.betrayer.popup("质疑正确", "wood");
				game.log(player, "声明的", trigger.card, "作废了");
				trigger.cancel();
				trigger.getParent().goto(0);
				trigger.line = false;
			} else {
				event.betrayer.popup("质疑错误", "fire");
				event.betrayer.addSkills("chanyuan");
			}
			"step 7";
			game.delay(2);
			"step 8";
			if (event.fake) game.broadcastAll(ui.clear);
		},
	},
	chanyuan: {
		init(player, skill) {
			if (player.hp == 1) player.logSkill(skill);
			player.addSkillBlocker(skill);
		},
		onremove(player, skill) {
			player.removeSkillBlocker(skill);
		},
		skillBlocker(skill, player) {
			return skill != "chanyuan" && skill != "rechanyuan" && !lib.skill[skill].charlotte && player.hp == 1;
		},
		mark: true,
		intro: {
			content(storage, player, skill) {
				var str = "<li>锁定技。你不能于〖蛊惑〗的结算流程中进行质疑。当你的体力值为1时，你的其他技能失效。";
				var list = player.getSkills(null, false, false).filter(function (i) {
					return lib.skill.rechanyuan.skillBlocker(i, player);
				});
				if (list.length) str += "<br><li>失效技能：" + get.translation(list);
				return str;
			},
		},
		audio: 2,
		trigger: { player: "changeHp" },
		filter(event, player) {
			return player.hp == 1;
		},
		forced: true,
		content() {},
	},
	guhuo_phase: {},
};

export default skills;
