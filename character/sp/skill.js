import { lib, game, ui, get, ai, _status } from "../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	//王匡
	olrenxia: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		chooseButton: {
			dialog(event, player) {
				var dialog = ui.create.dialog("任侠：请选择一项", "hidden");
				dialog.add([
					[
						["discard", "重复弃置两张牌，直至手牌中没有【杀】或伤害类锦囊牌"],
						["draw", "重复摸两张牌，直至手牌中有【杀】或伤害类锦囊牌"],
					],
					"textbutton",
				]);
				return dialog;
			},
			filter(button, player) {
				if (button.link == "discard" && !player.countCards("he")) return false;
				return true;
			},
			check(button) {
				const player = get.player();
				if (button.link == "discard") return 2;
				let bool = card => get.type(card) == "trick" && get.tag(card, "damage") > 0.5;
				if (player.countCards("h", "sha") > 1 && player.countCards("h", bool) > 1) return 1;
				return 3;
			},
			backup(links) {
				return get.copy(lib.skill["olrenxia_" + links[0]]);
			},
		},
		subSkill: {
			backup: { audio: "olrenxia" },
			discard: {
				audio: "olrenxia",
				async content(event, trigger, player) {
					while (true) {
						await player.chooseToDiscard(2, "he", true).set("ai", card => {
							let player = get.player();
							let bool = card => get.type(card) == "trick" && get.tag(card, "damage") > 0.5;
							if (card.name == "sha" || bool(card)) return 10 - get.value(card);
							return 5 - get.value(card);
						});
						if (
							!player.countCards("h", card => {
								if (card.name == "sha") return true;
								return get.type(card) == "trick" && get.tag(card, "damage") > 0.5;
							})
						)
							break;
					}
					const evt = event.getParent("phaseUse", true);
					if (!evt || event.name == "renxia_discard") return;
					player
						.when("phaseUseEnd")
						.filter(evtx => evtx == evt)
						.then(() => {
							const next = game.createEvent("renxia_draw", false);
							next.player = player;
							next.setContent(lib.skill.olrenxia_draw.content);
						});
				},
			},
			draw: {
				audio: "olrenxia",
				async content(event, trigger, player) {
					while (true) {
						await player.draw(2);
						if (player.countCards("h", card => card.name == "sha")) break;
						if (player.countCards("h", card => get.type(card) == "trick" && get.tag(card, "damage") > 0.5)) break;
					}
					const evt = event.getParent("phaseUse", true);
					if (!evt || event.name == "renxia_draw") return;
					player
						.when("phaseUseEnd")
						.filter(evtx => evtx == evt)
						.then(() => {
							const next = game.createEvent("renxia_discard", false);
							next.player = player;
							next.setContent(lib.skill.olrenxia_discard.content);
						});
				},
			},
		},
		ai: {
			order: 1,
			result: {
				player: 1,
			},
		},
	},
	//孔淑
	olleiluan: {
		audio: 2,
		onChooseToUse(event) {
			if (!game.online && !event.olleiluan) {
				const player = event.player;
				let basic = lib.inpile.filter(i => get.type(i) == "basic");
				player.getRoundHistory("useCard", evt => {
					if (get.type(evt.card) == "basic") basic.remove(evt.card.name);
				});
				event.set("olleiluan", [basic, lib.skill.olleiluan.getNum(player)]);
			}
		},
		getNum(player) {
			let i = 0,
				num = 0,
				keep = true;
			while (i < game.roundNumber) {
				if (player.getRoundHistory("useSkill", evt => evt.skill == "olleiluan_backup", i).length + player.getRoundHistory("useSkill", evt => evt.skill == "olleiluan_effect", i - 1).length > 0) {
					keep = false;
					num++;
				} else if (!keep) break;
				i++;
			}
			return Math.max(1, num);
		},
		enable: "chooseToUse",
		filter(event, player) {
			if (!event.olleiluan || player.countCards("hes") < event.olleiluan[1] || event.type == "wuxie") return false;
			return get
				.inpileVCardList(info => {
					const name = info[2],
						type = get.type(name);
					return type == "basic" && event.olleiluan[0].includes(name);
				})
				.some(card => {
					return event.filterCard({ name: card[2], nature: card[3] }, player, event);
				});
		},
		usable: 1,
		chooseButton: {
			dialog(event, player) {
				const list = get
					.inpileVCardList(info => {
						const name = info[2],
							type = get.type(name);
						return type == "basic" && event.olleiluan[0].includes(name);
					})
					.filter(card => {
						return event.filterCard({ name: card[2], nature: card[3] }, player, event);
					});
				return ui.create.dialog("累卵", [list, "vcard"]);
			},
			check(button) {
				if (get.event().getParent().type != "phase") return 1;
				return get.player().getUseValue({ name: button.link[2], nature: button.link[3] });
			},
			backup(links, player) {
				return {
					audio: "olleiluan",
					filterCard: true,
					selectCard: () => get.event().olleiluan[1],
					check(card) {
						return 1 / (get.value(card) || 0.5);
					},
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					position: "hes",
					popname: true,
				};
			},
			prompt(links) {
				return "将" + get.cnNumber(get.event().olleiluan[1]) + "张牌当作" + (get.translation(links[0][3]) || "") + "【" + get.translation(links[0][2]) + "】使用";
			},
		},
		hiddenCard(player, name) {
			if (player.getStat("skill").olleiluan) return false;
			let basic = lib.inpile.filter(i => get.type(i) == "basic");
			player.getRoundHistory("useCard", evt => {
				if (get.type(evt.card) == "basic") basic.remove(evt.card.name);
			});
			const num = lib.skill.olleiluan.getNum(player);
			return basic.includes(name) && player.countCards("he") >= num;
		},
		ai: {
			order(item, player) {
				if (player && get.event().type == "phase") {
					let list = get
						.inpileVCardList(info => {
							return get.info("olleiluan").hiddenCard(player, info[2]);
						})
						.map(card => {
							return { name: card[2], nature: card[3] };
						})
						.filter(card => player.getUseValue(card, true, true) > 0);
					if (!list.length) return 0;
					list.sort((a, b) => {
						return player.getUseValue(b, true, true) - player.getUseValue(a, true, true);
					});
					return get.order(list[0], player) * 1.01;
				}
				return 0.001;
			},
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag, arg) {
				if (arg === "respond") return false;
				const name = tag == "respondSha" ? "sha" : "shan";
				return get.info("olleiluan").hiddenCard(player, name);
			},
			result: { player: 1 },
		},
		frequent: true,
		subfrequent: ["effect"],
		group: "olleiluan_effect",
		subSkill: {
			backup: {},
			effect: {
				trigger: { global: "roundStart" },
				filter(event, player) {
					if (game.roundNumber <= 1) return false;
					return (
						player.getRoundHistory(
							"useCard",
							evt => {
								return get.type(evt.card) == "basic";
							},
							1
						).length >= lib.skill.olleiluan.getNum(player)
					);
				},
				frequent: true,
				prompt2(event, player) {
					return "摸" + get.cnNumber(lib.skill.olleiluan.getNum(player)) + "张牌，然后视为使用一张上一轮进入弃牌堆的普通锦囊牌";
				},
				async content(event, trigger, player) {
					await player.draw(lib.skill.olleiluan.getNum(player));
					let cards = [];
					const historys = _status.globalHistory;
					for (let i = historys.length - 2; i >= 0; i--) {
						const history = historys[i].everything;
						for (let j = history.length - 1; j >= 0; j--) {
							const evt = history[j];
							if (evt.name == "cardsDiscard" || (evt.name == "lose" && evt.position == ui.discardPile)) {
								cards.addArray(evt.cards.filterInD("d").reverse());
							}
						}
						if (historys[i].isRound) break;
					}
					cards.reverse();
					cards = cards.filter(card => get.type(card, false) == "trick" && player.hasUseTarget(card));
					if (cards.length) {
						const result = await player
							.chooseButton(["视为使用其中一张普通锦囊牌", cards], true)
							.set("ai", button => {
								const card = {
									name: get.name(button.link, false),
									nature: get.nature(button.link, false),
									suit: "none",
									number: null,
									isCard: true,
								};
								return get.player().getUseValue(card);
							})
							.forResult();
						if (result.bool) {
							const card = {
								name: get.name(result.links[0], false),
								nature: get.nature(result.links[0], false),
								suit: "none",
								number: null,
								isCard: true,
							};
							if (player.hasUseTarget(card)) await player.chooseUseTarget(card, false, true);
						}
					}
				},
			},
		},
	},
	olfuchao: {
		audio: 2,
		trigger: { player: ["useCard", "respond"] },
		filter(event, player) {
			return Array.isArray(event.respondTo) && event.respondTo[0] != player;
		},
		forced: true,
		logTarget: event => event.respondTo[0],
		async content(event, trigger, player) {
			const evt = game.getGlobalHistory("everything", evt => {
				return evt.name === "useCard" && evt.card == trigger.respondTo[1];
			})[0];
			let result;
			if (!player.countCards("he") && !evt.player.countCards("he")) {
				result = { index: 1 };
			} else {
				result = await player
					.chooseControl()
					.set("choiceList", ["弃置你与" + get.translation(evt.player) + "的各一张牌，然后其他角色不可响应此牌", "令" + get.translation(evt.card) + "对其他角色无效，然后" + get.translation(evt.card) + "对你额外结算一次"])
					.set("prompt", "覆巢：请选择一项")
					.set("ai", () => 0) //插眼，PZ157
					.forResult();
			}
			const targets = game.filterPlayer(i => i != player);
			if (result.index == 0) {
				await player.chooseToDiscard("he", true);
				await player.discardPlayerCard(evt.player, "he", true);
				if (targets.length) {
					evt.directHit.addArray(targets);
					game.log(targets, "不可响应", evt.card);
				}
			} else {
				evt.effectCount++;
				evt.excluded.addArray(targets);
				if (targets.length) {
					game.log(evt.card, "对", targets, "无效");
				}
			}
		},
	},
	//OL袁姬
	oljieyan: {
		audio: 2,
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.name.slice(0, -5)))
				.set("ai", target => {
					const player = get.player(),
						att = get.attitude(player, target),
						goon = player.hasSkill("olshuiyue", null, null, false);
					let eff = get.damageEffect(target, player, player);
					if (goon) {
						if (player.storage.olshuiyue) eff += get.effect(target, { name: "guohe_copy2" }, player, player) * Math.min(2, target.countCards("he"));
						else eff += get.effect(target, { name: "draw" }, player, player);
					}
					if (goon && target.getHp() > 2 && att > 0 && target != player && !player.storage.olshuiyue) {
						return 0.1 + (target.countCards("h") - target.getHp());
					}
					return eff;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			await target.damage();
			const {
				result: { index },
			} = await target
				.chooseControl()
				.set("choiceList", ["跳过下个弃牌阶段", "回复1点体力，下个弃牌阶段手牌上限-2"])
				.set("ai", () => {
					const player = get.event("player"),
						target = get.event().getTrigger().player;
					if ((get.recoverEffect(player, target, target) > 0 || get.attitude(player, target) > 0) && game.hasPlayer(current => current != player && get.attitude(player, current) > 0)) return 1;
					return 0;
				});
			if (index == 0) {
				target.skip("phaseDiscard");
				game.log(target, "跳过下个弃牌阶段");
			} else {
				await target.recover();
				target.addTempSkill("oljieyan_effect", { player: "phaseDiscardAfter" });
				target.addMark("oljieyan_effect", 2, false);
				target.when("phaseDiscardBefore").then(() => {
					player.addTempSkill("oljieyan_hand", { player: "phaseDiscardAfter" });
				});
				player.addSkill("oljieyan_gain");
				player.markAuto("oljieyan_gain", [target]);
			}
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				mark: true,
				marktext: "弃",
				intro: {
					content: "下个弃牌阶段手牌上限-#",
				},
				mod: {
					maxHandcard(player, num) {
						if (player.hasSkill("oljieyan_hand")) return num - player.countMark("oljieyan_effect");
					},
				},
			},
			hand: {
				charlotte: true,
			},
			gain: {
				charlotte: true,
				onremove: true,
				intro: {
					content: "节言角色：$",
				},
				trigger: {
					global: "phaseDiscardAfter",
				},
				filter(event, player) {
					return player.getStorage("oljieyan_gain").includes(event.player);
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const target = trigger.player,
						cards = [];
					target.getHistory("lose", evt => {
						if (evt.type == "discard" && evt.getParent("phaseDiscard") == trigger) cards.addArray(evt.cards2.filterInD("d"));
					});
					player.unmarkAuto("oljieyan_gain", [target]);
					if (cards.length && game.hasPlayer(current => current != target)) {
						const targets = await player
							.chooseTarget(get.prompt(event.name), `令一名不为${get.translation(target)}的角色获得${get.translation(cards)}`, (card, player, target) => {
								return target != get.event().getTrigger().player;
							})
							.set("ai", target => {
								const player = get.player();
								let att = get.attitude(player, target);
								if (att < 3) return 0;
								if (target.hasSkillTag("nogain")) att /= 10;
								return att;
							})
							.forResultTargets();
						if (targets && targets.length) {
							const next = targets[0].gain(cards, "gain2");
							next.giver = player;
							await next;
						}
					}
					if (!player.getStorage("oljieyan_gain").length) player.removeSkill("oljieyan_gain");
				},
			},
		},
	},
	oljinghua: {
		audio: 2,
		trigger: {
			global: "gainAfter",
			player: "loseAsyncAfter",
		},
		filter(event, player, triggername, target) {
			if (event.name == "loseAsync" && event.type != "gain") return false;
			return target?.isIn();
		},
		getIndex(event, player) {
			return game
				.filterPlayer(target => {
					if (target == player) return false;
					if (!player.storage.oljinghua && target.isHealthy()) return false;
					const cards = event.getg(target);
					if (!cards.length) return false;
					if (event.giver === player) return true;
					return event.getl && event.getl(player)?.cards2?.some(card => cards.includes(card));
				})
				.sortBySeat();
		},
		logTarget(event, player, triggername, target) {
			return target;
		},
		check(event, player, triggername, target) {
			return player.storage.oljinghua ? get.effect(target, { name: "losehp" }, player, player) > 0 : get.recoverEffect(target, player, player) > 0;
		},
		locked: false,
		forced: true,
		async content(event, trigger, player) {
			event.targets[0][player.storage.oljinghua ? "loseHp" : "recover"]();
		},
		group: "oljinghua_change",
		subSkill: {
			change: {
				audio: "oljinghua",
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					if (player.countCards("h") || player.storage.oljinghua) return false;
					const evt = event.getl(player);
					return evt && evt.hs && evt.hs.length;
				},
				prompt2: "修改【镜花】为：当其他角色获得你的牌后，其失去1点体力。",
				async content(event, trigger, player) {
					player.storage.oljinghua = true;
				},
			},
		},
	},
	olshuiyue: {
		audio: 2,
		trigger: {
			global: "damageEnd",
		},
		filter(event, player) {
			const target = event.player,
				source = event.source;
			if (!target.isIn() || target == player || !source || source != player) return false;
			if (player.storage.olshuiyue) return target.countCards("he");
			return true;
		},
		locked: false,
		forced: true,
		logTarget: "player",
		async content(event, trigger, player) {
			const target = trigger.player;
			if (player.storage.olshuiyue) await target.chooseToDiscard("he", true);
			else await target.draw();
		},
		group: "olshuiyue_change",
		subSkill: {
			change: {
				audio: "olshuiyue",
				trigger: {
					source: "dying",
				},
				filter(event, player) {
					return !player.storage.olshuiyue && event.player != player;
				},
				prompt2: "修改【水月】为：当其他角色受到你造成的伤害后，其弃置一张牌。",
				async content(event, trigger, player) {
					player.storage.olshuiyue = true;
				},
			},
		},
	},
	//OL轲比能
	olpingduan: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget: true,
		async content(event, trigger, player) {
			const target = event.targets[0],
				str = player != target ? `###${get.translation(player)}对你发动了【平端】###` : `###平端###`;
			const use = await target
				.chooseToUse(function (card, player, event) {
					return get.type(card) == "basic" && lib.filter.cardEnabled.apply(this, arguments);
				}, str + `你可以使用一张基本牌，然后摸一张牌`)
				.set("addCount", false)
				.forResultBool();
			if (!use) return;
			await target.draw();
			if (!target.countCards("he", card => get.type2(card) == "trick" && player.canRecast(card, player))) return;
			const cards = await target
				.chooseCard(
					"he",
					(card, player) => {
						return get.type2(card) == "trick" && player.canRecast(card, player);
					},
					str + `你可以重铸一张锦囊牌，然后摸一张牌`
				)
				.set("ai", card => 11 - get.value(card))
				.forResultCards();
			if (!cards || !cards.length) return;
			await target.recast(cards);
			await target.draw();
			if (!target.countGainableCards(player, "e")) return;
			const result = await target
				.chooseToGive(str + `你可以交给${get.translation(player)}你装备区的一张牌，然后摸一张牌`, player, "e")
				.set("ai", card => {
					if (get.attitude(get.player(), get.event("target")) > 0) return get.value(card);
					return 0;
				})
				.set("target", player)
				.forResult();
			if (!result.bool) return;
			await target.draw();
		},
		ai: {
			order: 6,
			result: {
				target(player, target) {
					return target.countCards("he") + 0.5;
				},
			},
		},
	},
	//OL孙茹
	//持室神将
	olchishi: {
		audio: 2,
		trigger: { global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"] },
		filter(event, player) {
			const target = _status.currentPhase;
			if (!target || !target.isIn()) return false;
			const evt = event.getl(target);
			return evt && ["h", "e", "j"].some(pos => (evt[pos + "s"] || []).length > 0 && !target.countCards(pos));
		},
		check(event, player) {
			return get.effect(_status.currentPhase, { name: "draw" }, player, player) > 0;
		},
		usable: 1,
		logTarget: () => _status.currentPhase,
		async content(event, trigger, player) {
			const target = _status.currentPhase;
			await target.draw(2);
			target.addTempSkill("olchishi_effect");
			target.addMark("olchishi_effect", 2, false);
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				markimage: "image/card/handcard.png",
				intro: { content: "手牌上限+#" },
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark("olchishi_effect");
					},
				},
			},
		},
	},
	olweimian: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return player.hasEnabledSlot();
		},
		usable: 1,
		chooseButton: {
			dialog(event, player) {
				let dialog = ui.create.dialog("###" + get.translation("olweimian") + "###" + lib.translate.olweimian_info, "hidden");
				let equips = [];
				for (let i = 1; i < 6; i++) {
					if (!player.hasEnabledSlot(i)) continue;
					for (let j = 1; j <= player.countEnabledSlot(i); j++) {
						equips.push(["equip" + i, get.translation("equip" + i)]);
					}
				}
				if (equips.length > 0) dialog.add([equips, "tdnodes"]);
				return dialog;
			},
			check(button) {
				const player = get.event().player;
				if (player.countCards("e") <= 3 && _status.currentPhase === player && ((player.storage.counttrigger || {}).olchishi || 0) <= 0) {
					if (
						player
							.getCards("e")
							.slice()
							.map(i => get.subtype(i))
							.includes(button.link)
					)
						return 10;
				}
				if (
					ui.selected.buttons.length >=
					Math.max(
						...game.filterPlayer().map(target => {
							let max = 0;
							if (get.attitude(player, target) > 0 && (target == player || target.hasDisabledSlot())) max++;
							if (get.recoverEffect(target, player, player) > 0) max++;
							if (
								target.countCards("h") > 0 &&
								target
									.getCards("h", card => {
										return lib.filter.cardDiscardable(card, target);
									})
									.reduce((sum, card) => {
										return sum + get.value(card, target);
									}, 0) <=
									get.effect(target, { name: "draw" }, player, player) * 4
							)
								max++;
							return max;
						})
					)
				)
					return 0;
				return [2, 1, 4, 3, 5].indexOf(parseInt(button.link.slice("equip".length))) + 1;
			},
			select: [1, 3],
			backup(links, player) {
				return {
					audio: "olweimian",
					types: links.slice().sort((a, b) => parseInt(a.slice("equip".length)) - parseInt(b.slice("equip".length))),
					filterTarget(card, player, target) {
						return true;
					},
					async content(event, trigger, player) {
						const target = event.target,
							types = lib.skill.olweimian_backup.types;
						for (const t of types) await player.disableEquip(t);
						const num = Math.min(target.hasDisabledSlot() + target.isDamaged() + 1, types.length),
							selected = [];
						while (selected.length < num) {
							const result = await target
								.chooseButton([
									"慰勉：是否执行其中一项？",
									[
										[
											["equip", "恢复一个装备栏"],
											["recover", "回复1点体力"],
											["discard", "弃置所有手牌，然后摸四张牌"],
										],
										"textbutton",
									],
								])
								.set("forceAuto", true)
								.set("filterButton", button => {
									const player = get.event().player;
									if (get.event("selected").includes(button.link)) return false;
									switch (button.link) {
										case "equip":
											return player.hasDisabledSlot();
										case "recover":
											return player.isDamaged();
										case "discard":
											return true;
									}
								})
								.set("ai", button => {
									const player = get.event().player;
									switch (button.link) {
										case "equip":
											return 1;
										case "recover":
											return get.recoverEffect(player, player, player);
										case "discard":
											return (
												get.effect(player, { name: "draw" }, player, player) * 4 -
												player
													.getCards("h", card => {
														return lib.filter.cardDiscardable(card, player);
													})
													.reduce((sum, card) => {
														return sum + get.value(card, player);
													}, 0)
											);
									}
								})
								.set("selected", selected)
								.forResult();
							if (result.bool) {
								selected.addArray(result.links);
								if (result.links.includes("equip")) {
									await target.chooseToEnable();
								}
								if (result.links.includes("recover")) {
									await target.recover();
								}
								if (result.links.includes("discard")) {
									const cards = target.getDiscardableCards(target, "h");
									if (cards.length) await target.discard(cards);
									await target.draw(4);
								}
							} else break;
						}
					},
					ai: {
						result: {
							target(player, target) {
								let max = 0;
								if (get.attitude(player, target) > 0 && (target == player || target.hasDisabledSlot())) max++;
								if (get.recoverEffect(target, player, player) > 0) max++;
								if (
									target.countCards("h") > 0 &&
									target
										.getCards("h", card => {
											return lib.filter.cardDiscardable(card, target);
										})
										.reduce((sum, card) => {
											return sum + get.value(card, target);
										}, 0) <=
										get.effect(target, { name: "draw" }, player, player) * 4
								)
									max++;
								return max;
							},
						},
					},
				};
			},
			prompt(links, player) {
				const types = links.slice().sort((a, b) => parseInt(a.slice("equip".length)) - parseInt(b.slice("equip".length)));
				return "废除" + types.map(i => get.translation(i) + "栏").join("、") + "，令一名角色选择执行等量项";
			},
		},
		ai: {
			order: 7,
			result: { player: 1 },
		},
		subSkill: {
			backup: {},
		},
	},
	//曹腾
	olyongzu: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return game.hasPlayer(t => t != player);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2("olyongzu"), lib.filter.notMe)
				.set("ai", target => {
					const player = get.event().player;
					if (get.attitude(player, target) <= 0) return 0;
					const list = get
						.info("olyongzu")
						.getList(player, target)
						.map(listx => listx[0][1])
						.filter(effect => !effect.filter || effect.filter(player));
					return Math.max(...list.map(effect => effect.ai(player))) + Math.max(...list.map(effect => effect.ai(target)));
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			let list = get.info("olyongzu").getList(player, target),
				choosed;
			for (const current of [player, target]) {
				const result = await current
					.chooseButton(["拥族：请选择一项执行", [list.filter(effect => choosed !== effect[0][0]), "textbutton"]], true)
					.set("filterButton", button => {
						const effect = button.link[1];
						return !effect.filter || effect.filter(get.player());
					})
					.set("ai", button => {
						const effect = button.link[1];
						return effect.ai(get.event().player);
					})
					.forResult();
				if (result.bool) {
					if (!choosed) choosed = result.links[0][0];
					await result.links[0][1].content(current);
				}
			}
		},
		getList(player, target) {
			let list = [
				[
					"摸两张牌",
					{
						async content(player) {
							await player.draw(2);
						},
						ai(player) {
							return get.effect(player, { name: "wuzhong" }, player, player);
						},
					},
				],
				[
					"回复1点体力",
					{
						async content(player) {
							await player.recover();
						},
						ai(player) {
							return get.recoverEffect(player, player, player);
						},
					},
				],
				[
					"复原武将牌",
					{
						async content(player) {
							if (player.isTurnedOver()) {
								await player.turnOver(false);
							}
							if (player.isLinked()) {
								await player.link(false);
							}
						},
						ai(player) {
							return (player.isTurnedOver() ? 3 : 0) + player.isLinked();
						},
					},
				],
			];
			if (get.mode() == "guozhan" ? target.isFriendOf(player) : target.group == player.group) {
				list.addArray([
					[
						"手牌上限+1",
						{
							async content(player) {
								player.addSkill("olyongzu_hand");
								player.addMark("olyongzu_hand", 1, false);
							},
							ai: () => 1,
						},
					],
					[
						"若为魏/群势力，则获得【奸雄】/【天命】直到你的下个回合开始",
						{
							async content(player) {
								player.addTempSkill("olyongzu_skill", { player: "phaseBegin" });
								const group = player[get.mode() == "guozhan" ? "identity" : "group"];
								const skill = group == "wei" ? "rejianxiong" : "tianming";
								player.popup(skill);
								await player.addAdditionalSkills("olyongzu_skill", skill, true);
							},
							filter: player => ["wei", "qun"].includes(player[get.mode() == "guozhan" ? "identity" : "group"]),
							ai(player) {
								return player[get.mode() == "guozhan" ? "identity" : "group"] == "wei" ? 2 : 3;
							},
						},
					],
				]);
			}
			return list.map(listx => [listx, listx[0]]);
		},
		derivation: ["rejianxiong", "tianming"],
		ai: { threaten: 3.5 },
		subSkill: {
			skill: {
				charlotte: true,
			},
			hand: {
				charlotte: true,
				markimage: "image/card/handcard.png",
				intro: { content: "手牌上限+#" },
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark("olyongzu_hand");
					},
				},
			},
		},
	},
	olqingliu: {
		audio: 2,
		trigger: {
			global: "phaseBefore",
			player: ["enterGame", "dyingAfter"],
		},
		filter(event, player) {
			if (event.name == "dying") {
				const group = player.storage.olqingliu;
				if (!group || player.group == group) return false;
				return (
					game
						.getAllGlobalHistory("everything", evt => {
							return (
								evt.name == "dying" &&
								evt.player == player &&
								!game.getAllGlobalHistory("everything", evtx => {
									return evtx.name == "die" && evtx.player == player && evtx.getParent().name == "dying";
								}).length
							);
						})
						.indexOf(event) == 0
				);
			}
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		async content(event, trigger, player) {
			if (trigger.name == "dying") await player.changeGroup(player.storage.olqingliu);
			else {
				const result = await player
					.chooseControl("wei", "qun")
					.set("ai", () => {
						return get.rand(0, 1);
					})
					.set("prompt", "清流：请选择你的势力")
					.forResult();
				if (result.control) {
					const group = result.control;
					player.popup(group + "2");
					game.log(player, "选择了", "#y" + get.translation(group + "2"));
					player.storage.olqingliu = group == "wei" ? "qun" : "wei";
					if (player.group != group) await player.changeGroup(group);
				}
			}
		},
	},
	rejianxiong_caoteng: { audio: true },
	tianming_caoteng: { audio: true },
	//步度根
	//古希腊掌管扣工资的神（bushi
	olkouchao: {
		audio: 2,
		init(player, skill) {
			if (!player.storage[skill]) {
				player.storage[skill] = ["sha", "huogong", "guohe"];
			}
		},
		hiddenCard(player, name) {
			const storage = player.getStorage("olkouchao");
			for (let i = 0; i < storage.length; i++) {
				if (!player.getStorage("olkouchao_used").includes(i) && name == storage[i]) return true;
			}
			return false;
		},
		enable: "chooseToUse",
		filter(event, player) {
			if (!player.countCards("hes")) return false;
			const storage = player.getStorage("olkouchao");
			for (let i = 0; i < storage.length; i++) {
				if (player.getStorage("olkouchao_used").includes(i)) continue;
				if (event.filterCard(get.autoViewAs({ name: storage[i] }, "unsure"), player, event)) return true;
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				const storage = player.getStorage("olkouchao");
				let list = [];
				for (let i = 0; i < storage.length; i++) {
					const name = storage[i];
					list.push([get.translation(get.type(name)), "", name, undefined, i]);
				}
				return ui.create.dialog("寇钞", [list, "vcard"]);
			},
			filter(button, player) {
				const evt = get.event().getParent();
				return evt.filterCard(get.autoViewAs({ name: button.link[2] }, "unsure"), player, evt) && !player.getStorage("olkouchao_used").includes(button.link[4]);
			},
			check(button) {
				const evt = get.event().getParent();
				const player = get.event().player;
				if (evt.type != "phase") return 1;
				if (button.link[2] == "jiu") {
					if (player.getUseValue({ name: "jiu" }) <= 0) return 0;
					if (player.countCards("h", "sha")) return player.getUseValue({ name: "jiu" });
					return 0;
				}
				return player.getUseValue({ name: button.link[2] }) / 4;
			},
			backup(links, player) {
				return {
					filterCard: true,
					position: "hes",
					viewAs: {
						name: links[0][2],
						storage: { olkouchao: links[0][4] + 1 },
					},
					precontent() {
						if (!player.storage.olkouchao_used) {
							player.when({ global: "roundStart" }).then(() => delete player.storage.olkouchao_used);
						}
						player.markAuto("olkouchao_used", [lib.skill.olkouchao_backup.viewAs.storage.olkouchao - 1]);
						player.addTempSkill("olkouchao_effect");
					},
				};
			},
			prompt(links, player) {
				const name = links[0][2],
					index = links[0][4] + 1;
				return '###寇钞###<div class="text center">将一张牌当作【' + get.translation(name) + "】使用，然后修改【寇钞】的第" + get.cnNumber(index, true) + "项</div>";
			},
		},
		ai: {
			order(_, player) {
				if (!player || get.event().type != "phase") return 1;
				let names = player.getStorage("olkouchao");
				for (let i = 0; i < names.length; i++) {
					if (player.getStorage("olkouchao_used").includes(i)) names.splice(i--, 1);
				}
				names = names.map(name => {
					return { name: name };
				});
				names.sort((a, b) => {
					return player.getUseValue(b, true, true) - player.getUseValue(a, true, true);
				});
				let max = get.order(names[0], player);
				if (max > 0) max += 0.3;
				return max;
			},
			respondShan: true,
			respondSha: true,
			skillTagFilter(player, tag, arg) {
				if (arg == "respond") return false;
				if (!player.countCards("hes")) return false;
				return player.getStorage("olkouchao").includes(tag == "respondSha" ? "sha" : "shan");
			},
			result: {
				player(player) {
					const dying = get.event().dying;
					return dying ? get.attitude(player, dying) : 1;
				},
			},
		},
		subSkill: {
			backup: {},
			effect: {
				charlotte: true,
				trigger: { player: "useCardAfter" },
				filter(event, player) {
					return (event.card.storage || {}).olkouchao;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const cards = game
						.getAllGlobalHistory("everything", evt => {
							if (!evt.cards || !evt.cards.someInD("d")) return false;
							if (evt.name == "lose") return evt.position == ui.discardPile;
							if (evt.name != "cardsDiscard") return false;
							const evtx = evt.getParent();
							if (evtx.name != "orderingDiscard") return false;
							const evt2 = evtx.relatedEvent || evtx.getParent();
							return evt2 && evt2.name != "useCard";
						})
						.map(evt => evt.cards.filterInD("d"))
						.flat()
						.reverse();
					const card = cards.find(card => ["basic", "trick"].includes(get.type(card)));
					if (card) {
						const index = (trigger.card.storage || {}).olkouchao;
						player.storage.olkouchao[index - 1] = card.name;
						game.log(player, "修改", "#g【寇钞】", "的", "#y第" + get.cnNumber(index, true) + "项", "为", "#g【" + get.translation(card.name) + "】");
						if (player.storage.olkouchao.every(name => get.type(name) == "basic")) {
							player.storage.olkouchao = ["shunshou", "shunshou", "shunshou"];
							game.log(player, "修改", "#g【寇钞】", "的", "#y所有项", "为", "#g【顺手牵羊】");
						}
					}
				},
			},
		},
	},
	//马玩
	olhunjiang: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return game.hasPlayer(target => lib.skill.olhunjiang.filterTarget(null, player, target));
		},
		filterTarget(card, player, target) {
			return target != player && player.inRange(target);
		},
		usable: 1,
		selectTarget: [1, Infinity],
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			const targets = event.targets.sortBySeat();
			let answer_result = [[], []];
			let humans = targets.filter(current => current === game.me || current.isOnline());
			let locals = targets.slice(0).randomSort();
			locals.removeArray(humans);
			const eventId = get.id();
			const send = (question, current, eventId) => {
				lib.skill.olhunjiang.chooseControl(question, current, eventId);
				game.resume();
			};
			event._global_waiting = true;
			let time = 10000;
			if (lib.configOL && lib.configOL.choose_timeout) time = parseInt(lib.configOL.choose_timeout) * 1000;
			targets.forEach(current => current.showTimer(time));
			if (humans.length > 0) {
				const solve = function (resolve, reject) {
					return function (result, player) {
						if (result && typeof result.index == "number") {
							resolve();
							answer_result[result.index].push(player);
						} else reject();
					};
				};
				await Promise.any(
					humans.map(current => {
						return new Promise(async (resolve, reject) => {
							if (current.isOnline()) {
								current.send(send, question, current, eventId);
								current.wait(solve(resolve, reject));
							} else {
								const next = lib.skill.olhunjiang.chooseControl(current, player, eventId);
								const solver = solve(resolve, reject);
								if (_status.connectMode) game.me.wait(solver);
								const result = await next.forResult();
								if (_status.connectMode) game.me.unwait(result, current);
								else solver(result, current);
							}
						});
					})
				).catch(() => {});
				game.broadcastAll("cancel", eventId);
			}
			if (locals.length > 0) {
				for (const current of locals) {
					const result = await lib.skill.olhunjiang.chooseControl(current, player).forResult();
					if (result && typeof result.index == "number") {
						answer_result[result.index].push(current);
					}
				}
			}
			delete event._global_waiting;
			for (const i of targets) {
				i.hideTimer();
				i.addExpose(0.05);
				i.popup(answer_result[0].includes(i) ? "成为目标" : "令其摸牌");
				game.log(i, "选择了", "#y" + (answer_result[0].includes(i) ? "成为目标" : "令其摸牌"));
			}
			await game.delay();
			if (answer_result[0].length) {
				answer_result[0].sortBySeat();
				player.addTempSkill("olhunjiang_addTarget");
				player.markAuto("olhunjiang_addTarget", answer_result[0]);
				if (!answer_result[1].length) {
					await player.draw(answer_result[0].length);
				}
			}
			if (answer_result[1].length) {
				answer_result[1].sortBySeat();
				await player.draw(answer_result[1].length);
				if (!answer_result[0].length) {
					player.addTempSkill("olhunjiang_addTarget");
					player.markAuto("olhunjiang_addTarget", answer_result[1]);
				}
			}
		},
		ai: {
			order(_, player) {
				return get.order({ name: "sha" }, player) + 1;
			},
			result: {
				target(player, target) {
					return get.sgn(get.sgn(get.attitude(player, target)) + 0.5);
				},
			},
		},
		chooseControl(player, source, eventId) {
			const str = get.translation(source);
			return player
				.chooseControl("成为目标", "令其摸牌")
				.set("prompt", "###" + str + "对你发动了【浑疆】，请选择一项" + '###<div class="text center">若所有角色选择了同一项，则所有角色也执行另一项</div>')
				.set("choiceList", ["令" + str + "本阶段使用【杀】可以额外指定你为目标", "令" + str + "摸一张牌"])
				.set("source", source)
				.set("id", eventId)
				.set("_global_waiting", true)
				.set("ai", () => get.event().idx)
				.set(
					"idx",
					(function () {
						let cha = get.effect(player, { name: "sha" }, source, player) * source.mayHaveSha(player, "use", null, "odds") - get.effect(player, { name: "draw" }, source, player);
						if (Math.abs(cha) < player.hp * player.hp) return [0, 1].randomGet();
						if (cha > 0) return 0;
						return 1;
					})()
				);
		},
		subSkill: {
			addTarget: {
				charlotte: true,
				onremove: true,
				intro: { content: "本阶段使用【杀】可以额外指定$为目标" },
				trigger: { player: "useCard2" },
				filter(event, player) {
					if (event.card.name != "sha") return false;
					return game.hasPlayer(target => {
						if (!player.getStorage("olhunjiang_addTarget").includes(target)) return false;
						return !event.targets.includes(target) && lib.filter.targetEnabled2(event.card, player, target) && lib.filter.targetInRange(event.card, player, target);
					});
				},
				async cost(event, trigger, player) {
					event.result = await player
						.chooseTarget(
							get.prompt("olhunjiang_addTarget"),
							"令任意名【浑疆】选择成为额外目标的角色成为" + get.translation(trigger.card) + "的目标",
							(card, player, target) => {
								if (!player.getStorage("olhunjiang_addTarget").includes(target)) return false;
								const event = get.event().getTrigger();
								return !event.targets.includes(target) && lib.filter.targetEnabled2(event.card, player, target) && lib.filter.targetInRange(event.card, player, target);
							},
							[1, Infinity]
						)
						.set("ai", target => {
							const player = get.event("player"),
								event = get.event().getTrigger();
							return get.effect(target, event.card, player);
						})
						.forResult();
				},
				async content(event, trigger, player) {
					trigger.targets.addArray(event.targets);
					game.log(event.targets, "成为了", trigger.card, "的额外目标");
				},
			},
		},
	},
	//蒋琬
	olziruo: {
		audio: 2,
		trigger: { player: "useCard" },
		filter(event, player) {
			if (!event.olziruo || !event.olziruo[player.playerid]) return false;
			return event.olziruo[player.playerid][Boolean(player.storage.olziruo) ? 1 : 0];
		},
		forced: true,
		async content(event, trigger, player) {
			player.changeZhuanhuanji("olziruo");
			await player.draw();
		},
		mark: true,
		marktext: "☯",
		zhuanhuanji: true,
		intro: { content: storage => "当你使用最" + (storage ? "右" : "左") + "侧的卡牌时，你摸一张牌。你以此法摸牌后本回合不能整理手牌。" },
		global: "olziruo_mark",
		mod: {
			aiOrder(player, card, num) {
				if (typeof card == "object") {
					const cards = player.getCards("h");
					if (cards.indexOf(card) == (player.storage.olziruo ? cards.length - 1 : 0)) return num + 10;
				}
			},
		},
		group: ["olziruo_gain", "olziruo_sort"],
		subSkill: {
			mark: {
				charlotte: true,
				trigger: { player: "useCardBegin" },
				filter(event, player) {
					const cards = player.getCards("h");
					if (!cards.length) return false;
					return (event.cards || []).some(card => cards[0] == card || cards[cards.length - 1] == card);
				},
				forced: true,
				popup: false,
				content() {
					const cards = player.getCards("h");
					if (!trigger.olziruo) trigger.olziruo = {};
					trigger.olziruo[player.playerid] = [trigger.cards.some(card => cards[0] == card), trigger.cards.some(card => cards[cards.length - 1] == card)];
				},
			},
			gain: {
				trigger: {
					player: "gainAfter",
				},
				filter(event, player) {
					if (player.hasSkill("olziruo_ban", null, null, false)) return false;
					return event.getParent().name == "draw" && event.getParent(2).name == "olziruo";
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					player.addTempSkill("olziruo_ban");
				},
			},
			ban: {
				charlotte: true,
				mark: true,
				intro: {
					content: "本回合不能整理手牌",
				},
				ai: { noSortCard: true },
			},
			sort: {
				enable: "chooseToUse",
				filter(event, player) {
					return player.countCards("h") > 1 && !player.hasSkillTag("noSortCard");
				},
				direct: true,
				lose: false,
				discard: false,
				delay: 0,
				prompt: "整理手牌顺序",
				async content(event, trigger, player) {
					event.getParent(2).goto(0);
					if (_status.connectMode || !event.isMine()) {
						player.tempBanSkill("olziruo_sort", { player: ["useCard1", "useSkillBegin", "chooseToUseEnd"] });
					}
					const next = player.chooseToMove("自若：请整理手牌顺序", true);
					next.set("list", [["手牌", player.getCards("h")]]);
					next.set("processAI", list => {
						let player = get.player(),
							cards = list[0][1].slice(0);
						cards.sort((a, b) => get.useful(b, player) - get.useful(a, player));
						if (player.storage.olziruo) cards.reverse();
						return [cards];
					});
					const result = await next.forResult();
					if (!result || !result.bool) return;
					let hs = result.moved[0].reverse();
					game.addVideo("lose", player, [get.cardsInfo(hs), [], [], []]);
					game.broadcastAll(
						function (hs, player) {
							hs.forEach(i => i.goto(ui.special));
							player.directgain(hs, false);
						},
						hs,
						player
					);
				},
				ai: {
					order: 10,
					result: { player: 1 },
				},
			},
		},
	},
	olxvfa: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			const list = player.getStorage("olxvfa_used");
			return (!list.includes("0") && player.countCards("h")) || (!list.includes("1") && player.getExpansions("olxvfa").length);
		},
		chooseButton: {
			dialog(_, player) {
				let dialog = ui.create.dialog("蓄发：请选择一项", "hidden");
				const list = [
					["0", "将至少一半手牌称为“蓄发”置于武将牌上，然后可以将一张牌当作“蓄发”牌中的一张普通锦囊牌使用"],
					["1", "移去至少一半“蓄发”牌，然后可以将一张牌当作其中一张普通锦囊牌使用"],
				].filter(listx => {
					if (player.getStorage("olxvfa_used").includes(listx[0])) return false;
					if (listx[0] == "0") return player.countCards("h");
					return player.getExpansions("olxvfa").length;
				});
				dialog.add([list, "textbutton"]);
				if (list.length == 1) dialog.direct = true;
				return dialog;
			},
			filter(button, player) {
				if (player.getStorage("olxvfa_used").includes(button.link)) return false;
				if (button.link == "0") return player.countCards("h");
				return player.getExpansions("olxvfa").length;
			},
			check: () => 1 + Math.random(),
			backup: links => get.copy(lib.skill["olxvfa_" + ["put", "remove"][parseInt(links[0])]]),
			prompt(links) {
				if (links[0] == "0") return "###蓄发###将至少一半手牌称为“蓄发”置于武将牌上，然后可以将一张牌当作“蓄发”牌中的一张普通锦囊牌使用";
				return "###蓄发###移去一半“蓄发”牌，然后可以将一张牌当作其中一张普通锦囊牌使用";
			},
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			const cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		subSkill: {
			backup: {},
			used: { charlotte: true, onremove: true },
			put: {
				audio: "olxvfa",
				filterCard: true,
				selectCard: () => [Math.ceil(get.event("player").countCards("h") / 2), Infinity],
				position: "h",
				check(card) {
					const player = get.event("player"),
						value = player.getUseValue(card, true);
					if (value > 0) return get.type(card) == "trick" ? 20 + value : 0;
					return 15 - get.value(card) - get.useful(card);
				},
				lose: false,
				discard: false,
				delay: 0,
				async content(event, trigger, player) {
					player.addTempSkill("olxvfa_used", "phaseUseAfter");
					player.markAuto("olxvfa_used", ["0"]);
					await player.addToExpansion(event.cards, player, "give").set("gaintag", ["olxvfa"]);
					const cards = player.getExpansions("olxvfa");
					if (cards.some(card => get.type(card) == "trick" && player.hasCard(cardx => player.hasUseTarget(get.autoViewAs({ name: card.name }, [cardx]), true), "hes"))) {
						const result = await player
							.chooseButton(['###蓄发###<div class="text center">是否将一张牌当作一张“蓄发”牌使用？</div>', cards])
							.set("filterButton", button => {
								const player = get.event("player"),
									card = button.link;
								return get.type(card) == "trick" && player.hasCard(cardx => player.hasUseTarget(get.autoViewAs({ name: card.name }, [cardx]), true), "hes");
							})
							.set("ai", button => {
								const player = get.event("player"),
									card = button.link;
								return player.getUseValue({ name: card.name, isCard: true }, true);
							})
							.forResult();
						if (result.bool) {
							const card = result.links[0];
							game.broadcastAll(function (card) {
								lib.skill.olxvfa_backupx.viewAs = { name: card.name };
							}, card);
							await player
								.chooseToUse()
								.set("openskilldialog", "###蓄发###将一张牌当作【" + get.translation(card.name) + "】使用")
								.set("norestore", true)
								.set("addCount", false)
								.set("_backupevent", "olxvfa_backupx")
								.set("custom", {
									add: {},
									replace: { window: function () {} },
								})
								.backup("olxvfa_backupx");
						}
					}
				},
			},
			remove: {
				audio: "olxvfa",
				filterCard: () => false,
				selectCard: -1,
				delay: 0,
				async content(event, trigger, player) {
					player.addTempSkill("olxvfa_used", "phaseUseAfter");
					player.markAuto("olxvfa_used", ["1"]);
					const cards = player.getExpansions("olxvfa"),
						num = Math.ceil(cards.length / 2);
					const result = await player
						.chooseButton(['###蓄发###<div class="text center">请移去至少' + get.cnNumber(num) + "张“蓄发”牌</div>", cards], [num, Infinity], true)
						.set("ai", button => {
							const player = get.event("player"),
								value = player.getUseValue(button.link, true);
							if (value > 0 && get.type(button.link) == "trick") {
								if (
									!ui.selected.buttons.some(but => {
										return get.type(but.link) == "trick" && player.getUseValue(but.link, true) > 0;
									})
								)
									return 20 + value;
								return 0;
							}
							return 1 / (get.useful(button.link) || 0.5);
						})
						.forResult();
					if (result.bool) {
						const cardx = result.links;
						await player.loseToDiscardpile(cardx);
						if (cardx.some(card => get.type(card) == "trick" && player.hasCard(cardxx => player.hasUseTarget(get.autoViewAs({ name: card.name }, [cardxx]), true), "hes"))) {
							const result2 = await player
								.chooseButton(['###蓄发###<div class="text center">是否将一张牌当作一张移去的“蓄发”牌使用？</div>', cardx])
								.set("filterButton", button => {
									const player = get.event("player"),
										card = button.link;
									return get.type(card) == "trick" && player.hasCard(cardx => player.hasUseTarget(get.autoViewAs({ name: card.name }, [cardx]), true), "hes");
								})
								.set("ai", button => {
									const player = get.event("player"),
										card = button.link;
									return player.getUseValue({ name: card.name, isCard: true }, true);
								})
								.forResult();
							if (result2.bool) {
								const card = result2.links[0];
								game.broadcastAll(function (card) {
									lib.skill.olxvfa_backupx.viewAs = { name: card.name };
								}, card);
								await player
									.chooseToUse()
									.set("openskilldialog", "###蓄发###将一张牌当作【" + get.translation(card.name) + "】使用")
									.set("norestore", true)
									.set("addCount", false)
									.set("_backupevent", "olxvfa_backupx")
									.set("custom", {
										add: {},
										replace: { window: function () {} },
									})
									.backup("olxvfa_backupx");
							}
						}
					}
				},
			},
			backupx: {
				filterCard(card) {
					return get.itemtype(card) == "card";
				},
				position: "hes",
				check(card) {
					const player = get.event("player");
					if (player.hasValueTarget(card, true, true)) return 0;
					if (player.hasSkill("olziruo")) {
						const cards = player.getCards("h");
						if (cards.indexOf(card) == (player.storage.olziruo ? cards.length - 1 : 0)) {
							return 15 - get.value(card);
						}
					}
					return 5 - get.value(card);
				},
				log: false,
				precontent() {
					delete event.result.skill;
				},
			},
		},
		ai: {
			order: 1,
			result: { player: 1 },
		},
	},
	//蔡瑁
	olzuolian: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return player.getHp() > 0 && game.hasPlayer(target => target.countCards("h"));
		},
		filterTarget(card, player, target) {
			return target.countCards("h");
		},
		selectTarget() {
			return [1, get.event("player").getHp()];
		},
		usable: 1,
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			const targets = event.targets.sortBySeat();
			const cards = targets.slice().map(i => i.getCards("h").randomGet());
			const videoId = lib.status.videoId++;
			game.broadcastAll(
				(targets, cards, id, player) => {
					let dialog = ui.create.dialog(get.translation(player) + "发动了【佐练】", cards);
					dialog.videoId = id;
					const getName = target => {
						if (target._tempTranslate) return target._tempTranslate;
						var name = target.name;
						if (lib.translate[name + "_ab"]) return lib.translate[name + "_ab"];
						return get.translation(name);
					};
					for (let i = 0; i < targets.length; i++) {
						dialog.buttons[i].querySelector(".info").innerHTML = getName(targets[i]);
					}
				},
				targets,
				cards,
				videoId,
				player
			);
			await game.delay(3);
			game.broadcastAll("closeDialog", videoId);
			const result = await player.chooseBool("是否将这些牌与牌堆或弃牌堆中的属性杀交换？").forResult();
			if (!result.bool) return;
			const cards_cardPile = Array.from(ui.cardPile.childNodes).filter(i => i.name == "sha" && get.nature(i, false));
			const cards_discardPile = Array.from(ui.discardPile.childNodes).filter(i => i.name == "sha" && get.nature(i, false));
			let hasFire = true;
			for (let i = 0; i < targets.length; i++) {
				let target = targets[i];
				let card = cards[i];
				let cardx;
				if (hasFire) {
					let cardxs = get.cardPile(card => {
						return card.name == "sha" && game.hasNature(card, "fire");
					});
					if (cardxs) cardx = cardxs;
					else hasFire = false;
				}
				if (!hasFire) {
					let cardxs = get.cardPile(card => {
						return card.name == "sha" && get.nature(card, false);
					});
					if (cardxs) cardx = cardxs;
					else {
						player.popup("杯具");
						player.chat("我属性【杀】呢？！");
						game.log("但牌堆和弃牌堆都没有属性【杀】！");
						return;
					}
				}
				if (!cardx) return;
				if (cards_cardPile.includes(cardx)) {
					target.$throw([card], 1000);
					await target
						.lose([card], ui.cardPile)
						.set("insert_index", () => {
							return ui.cardPile.childNodes[get.event("num")];
						})
						.set("num", cards_cardPile.indexOf(cardx));
				} else if (cards_discardPile.includes(cardx)) {
					await target.loseToDiscardpile(card);
				}
				await target.gain(cardx, "gain2");
			}
		},
		ai: {
			order: 10,
			result: {
				target(player, target) {
					//插个眼，等PZ157拯救此AI
					return 0.5 - Math.random();
				},
			},
		},
	},
	oljingzhou: {
		audio: 2,
		trigger: { player: "damageBegin3" },
		filter(event, player) {
			return player.getHp() > 0;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2("oljingzhou"), [1, player.getHp()])
				.set("ai", target => {
					const player = get.event("player"),
						trigger = get.event().getTrigger();
					if (trigger.hasNature() && target == player) {
						return -get.effect(target, { name: "tiesuo" }, player, player);
					}
					return get.effect(target, { name: "tiesuo" }, player, player);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			for (const i of event.targets) {
				await i.link(!i.isLinked());
			}
		},
	},
	//裴秀
	//我们三国杀也有属于自己的爽文.jpg
	olmaozhu: {
		audio: 2,
		trigger: { source: "damageBegin1" },
		filter(event, player) {
			const count = lib.skill.olmaozhu.countSkill;
			if (!player.isPhaseUsing() || count(player) <= count(event.player)) return false;
			const evtx = event.getParent("phaseUse");
			return !player.getHistory("sourceDamage", evt => {
				return evt.getParent("phaseUse") == evtx && count(player) > count(evt.player);
			}).length;
		},
		forced: true,
		logTarget: "player",
		content() {
			trigger.increase("num");
		},
		countSkill(player) {
			//飞扬跋扈，OL你无敌了
			const list = [
				["feiyang", "飞扬"],
				["bahu", "跋扈"],
			];
			return player.getSkills(null, false, false).filter(i => {
				if (list.some(text => i.includes(text[0]) && get.translation(i) == text[1])) return true;
				const info = get.info(i);
				return !info || !info.charlotte;
			}).length;
		},
		mod: {
			cardUsable(card, player, num) {
				if (card.name == "sha") return num + lib.skill.olmaozhu.countSkill(player);
			},
			maxHandcard(player, num) {
				return num + lib.skill.olmaozhu.countSkill(player);
			},
		},
	},
	oljinlan: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			const count = lib.skill.olmaozhu.countSkill;
			return player.countCards("h") < Math.max(...game.filterPlayer().map(i => count(i)));
		},
		filterCard: () => false,
		selectCard: [0, 1],
		prompt() {
			const count = lib.skill.olmaozhu.countSkill;
			return "将手牌数摸至" + get.cnNumber(Math.max(...game.filterPlayer().map(i => count(i)))) + "张";
		},
		usable: 1,
		content() {
			const count = lib.skill.olmaozhu.countSkill;
			player.drawTo(Math.max(...game.filterPlayer().map(i => count(i))));
		},
		ai: {
			order: 0.000000114514191981,
			result: { player: 1 },
		},
	},
	//鸭蛋
	olqingya: {
		audio: 2,
		trigger: {
			player: "useCardToPlayered",
		},
		filter(event, player) {
			if (event.targets.length != 1 || event.target == player || event.target.hasSkill("nodis")) return false;
			if (event.card.name != "sha") return false;
			const target = event.target;
			let left = [],
				right = [],
				left2 = player,
				right2 = player;
			while (left2 != target && right2 != target) {
				left2 = left2.getPrevious();
				right2 = right2.getNext();
				if (left2 != target) left.push(left2);
				if (right2 != target) right.push(right2);
			}
			if (target == left2) {
				for (const i of left) {
					if (i.countDiscardableCards(player)) return true;
				}
			}
			if (target == right2) {
				for (const i of right) {
					if (i.countDiscardableCards(player)) return true;
				}
			}
			return false;
		},
		aiJudge(player, target, bool) {
			let left = [],
				right = [],
				left2 = player,
				right2 = player,
				left3 = false,
				right3 = false;
			let eff_left = 0,
				eff_right = 0;
			while (left2 != target && right2 != target) {
				left2 = left2.getPrevious();
				right2 = right2.getNext();
				if (left2 != target) left.push(left2);
				if (right2 != target) right.push(right2);
			}
			const card = { name: "guohe", position: "h" };
			if (target == left2) {
				for (const i of left) {
					if (i.countDiscardableCards(player)) {
						left3 = true;
						eff_left += get.effect(i, card, player, player);
					}
				}
			}
			if (target == right2) {
				for (const i of right) {
					if (i.countDiscardableCards(player)) {
						right3 = true;
						eff_right += get.effect(i, card, player, player);
					}
				}
			}
			if (left3 && right3) {
				if (!bool) return Math.max(eff_left, eff_right);
				if (eff_left > Math.max(0, eff_right)) return "↖顺时针";
				if (eff_right > Math.max(0, eff_left)) return "逆时针↗";
				return "cancel2";
			} else if (left3) {
				if (bool) return eff_left > 0 ? "↖顺时针" : "cancel2";
				return eff_left;
			} else if (right3) {
				if (bool) return eff_right > 0 ? "逆时针↗" : "cancel2";
				return eff_right;
			} else return bool ? "cancel2" : 0;
		},
		async cost(event, trigger, player) {
			const choices = [];
			const target = trigger.target;
			let left = [],
				right = [],
				left2 = player,
				right2 = player;
			while (left2 != target && right2 != target) {
				left2 = left2.getPrevious();
				right2 = right2.getNext();
				if (left2 != target) left.push(left2);
				if (right2 != target) right.push(right2);
			}
			if (target == left2) {
				for (const i of left) {
					if (lib.filter.targetEnabled2(trigger.card, player, i)) {
						choices.push("↖顺时针");
						break;
					}
				}
			}
			if (target == right2) {
				for (const i of right) {
					if (lib.filter.targetEnabled2(trigger.card, player, i)) {
						choices.push("逆时针↗");
						break;
					}
				}
			}
			choices.push("cancel2");
			const result = await player
				.chooseControl(choices)
				.set("prompt", get.prompt("olqingya"))
				.set("prompt2", `弃置自己和${get.translation(trigger.target)}某个方向之间的所有角色（不包括你与其）各一张手牌`)
				.set("choices", choices)
				.set("ai", () => {
					var evt = _status.event.getTrigger();
					return lib.skill.olqingya.aiJudge(evt.player, evt.target, true);
				})
				.forResult();
			if (result.control !== "cancel2") {
				event.result = {
					bool: true,
					cost_data: {
						control: result.control,
					},
				};
			}
		},
		async content(event, trigger, player) {
			const result = event.cost_data;
			const targets = [];
			game.log(player, "选择了", "#g" + result.control);
			if (result.control == "↖顺时针") {
				let current = player.getPrevious();
				while (current != trigger.target) {
					if (current.countDiscardableCards(player)) targets.push(current);
					current = current.getPrevious();
				}
			} else {
				let current = player.getNext();
				while (current != trigger.target) {
					if (current.countDiscardableCards(player)) targets.push(current);
					current = current.getNext();
				}
			}
			for (const current of targets) {
				if (!current.countDiscardableCards(player)) continue;
				player.line(current);
				await player.discardPlayerCard(current, true);
			}
			await game.delayx();
			let evt = trigger;
			while (true) {
				if (!evt.name || lib.phaseName.includes(evt.name)) break;
				evt = evt.getParent();
			}
			if (player.getHistory("custom", evtx => evtx.olqingya === evt.name).length) return;
			player.getHistory("custom").push({ olqingya: evt.name });
			player
				.when({
					global: lib.phaseName.map(name => name + "End").concat("phaseAfter"),
				})
				.filter(evt => {
					if (evt.name === "phase") return true;
					let evt2 = trigger;
					while (true) {
						if (!evt2.name || lib.phaseName.includes(evt2.name)) break;
						evt2 = evt2.getParent();
					}
					return evt2.name !== evt.name;
				})
				.vars({
					curPhaseName: evt.name,
				})
				.then(() => {
					if (trigger.name === "phase") {
						return event.finish();
					}
					const history = player.getHistory("useSkill", evt => {
							if (evt.skill !== "olqingya") return false;
							const evtx = evt.event.getParent(curPhaseName);
							if (!evtx || evtx.name !== curPhaseName) return false;
							return true;
						}),
						cards = [];
					history.forEach(evt => {
						game.countPlayer2(current => {
							current.checkHistory("lose", evtx => {
								if (evtx.getParent(4) !== evt.event) return;
								cards.addArray(evtx.cards.filterInD("d"));
							});
						}, true);
					});
					if (!cards.length) {
						return event.finish();
					}
					event.cards = cards;
					player
						.chooseButton(["倾轧：是否使用其中的一张牌？", event.cards])
						.set("filterButton", button => {
							return get.player().hasUseTarget(button.link);
						})
						.set("ai", button => {
							return get.player().getUseValue(button.link);
						});
				})
				.then(() => {
					if (result.bool) {
						const card = result.links[0];
						player.$gain2(card, false);
						game.delayx();
						player.chooseUseTarget(card, true);
					}
				});
		},
		ai: {
			effect: {
				player_use(card, player, target) {
					if (!target || player._olqingya_judging || ui.selected.targets.length || player == target || target.hasSkill("nodis")) return;
					if (typeof card != "object" || card.name != "sha") return false;
					player._olqingya_judging = true;
					var effect = lib.skill.olqingya.aiJudge(player, target);
					delete player._olqingya_judging;
					if (effect > 0) return [1, effect / Math.max(0.01, get.attitude(player, player))];
				},
			},
		},
	},
	oltielun: {
		audio: 2,
		mod: {
			globalFrom(from, to, distance) {
				let usedCount = 0;
				const stats = from.stat.slice();
				stats.reverse();
				for (const stat of stats) {
					Object.values(stat.card).forEach(cnt => {
						usedCount += cnt;
					});
					if (stat.isRound) break;
				}
				return distance - usedCount;
			},
		},
	},
	//SP孙策
	olliantao: {
		audio: 2,
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			return game.hasPlayer(target => target != player);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.name.slice(0, -"_cost".length)), lib.filter.notMe)
				.set("ai", target => {
					const player = get.event("player"),
						att = get.attitude(player, target);
					const colors = Object.keys(lib.color).filter(i => i != "none");
					if (
						!colors.some(color =>
							player.hasCard(card => {
								const juedou = get.autoViewAs({ name: "juedou" }, [card]);
								return player.canUse(juedou, target, false);
							}, "h")
						)
					)
						return 20 + (3 - get.sgn(att)) + Math.random();
					const effs = colors.reduce((list, color) => {
						const cards = player.getCards("h", card => {
							const juedou = get.autoViewAs({ name: "juedou" }, [card]);
							return player.canUse(juedou, target, false);
						});
						if (cards.length) {
							list.push(
								cards.reduce((sum, card) => {
									const juedou = get.autoViewAs({ name: "juedou" }, [card]);
									return sum + get.effect(target, juedou, player, player);
								}, 0)
							);
						}
						return list;
					}, []);
					return Math[att > 0 ? "max" : "min"].apply(Math, effs);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			const colors = Object.keys(lib.color).filter(i => i != "none");
			if (colors.length && player.countCards("h")) {
				const result = await target
					.chooseControl(colors)
					.set("prompt", "连讨：请选择一个颜色")
					.set("ai", () => {
						const player = get.event("player"),
							source = get.event().getParent().player;
						let controls = get.event("controls").slice();
						if (controls.length == 1) return controls[0];
						const getSum = function (color, player, source) {
							return source
								.getCards("h", card => {
									if (get.color(card) != color) return false;
									const juedou = get.autoViewAs({ name: "juedou" }, [card]);
									return source.canUse(juedou, player, false);
								})
								.reduce((num, card) => {
									const juedou = get.autoViewAs({ name: "juedou" }, [card]);
									return num + get.effect(player, juedou, source, player);
								}, 0);
						};
						return controls.sort((a, b) => getSum(b, player, source) - getSum(a, player, source))[0];
					})
					.set("prompt2", get.translation(player) + "将对你依次使用由其手牌中所有此颜色的牌转化的【决斗】")
					.forResult();
				const color = result.control;
				game.broadcastAll(
					(color, target) => {
						lib.skill.olliantao_backup.filterCardx = [color, target];
						lib.skill.olliantao_backup.filterCard = function (card, player) {
							const list = lib.skill.olliantao_backup.filterCardx;
							if (get.color(card) != list[0]) return false;
							const juedou = get.autoViewAs({ name: "juedou" }, [card]);
							return player.canUse(juedou, list[1], false);
						};
					},
					color,
					target
				);
				await player.showHandcards();
				while (
					target.isIn() &&
					player.hasCard(card => lib.skill.olliantao_backup.filterCard(card, player)) &&
					!game.getGlobalHistory("everything", evt => {
						return evt.name == "dying" && [player, target].includes(evt.player) && evt.getParent(event.name) == event;
					}).length
				) {
					await player
						.chooseToUse()
						.set("forced", true)
						.set("openskilldialog", "连讨：将一张" + get.translation(color) + "手牌当作【决斗】对" + get.translation(target) + "使用")
						.set("norestore", true)
						.set("_backupevent", "olliantao_backup")
						.set("custom", {
							add: {},
							replace: { window: function () {} },
						})
						.backup("olliantao_backup")
						.set("targetRequired", true)
						.set("complexSelect", true)
						.set("filterTarget", function (card, player, target) {
							if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
							return lib.filter.targetEnabled.apply(this, arguments);
						})
						.set("sourcex", target)
						.set("addCount", false);
				}
			}
			const num = player
				.getHistory("sourceDamage", evt => {
					return evt.getParent(4) == event;
				})
				.reduce((sum, evt) => sum + evt.num, 0);
			if (num) await player.draw(num);
			if (
				event.name == "olliantao" &&
				!game.hasPlayer2(current => {
					return current.getHistory("damage", evt => {
						return evt.getParent(4) == event;
					}).length;
				})
			) {
				await player.draw(3);
				player.addTempSkill("olliantao_buff");
				player.addMark("olliantao_buff", 3, false);
			}
			if (
				event.name == "junkliantao" &&
				!target.getHistory("damage", evt => {
					return evt.getParent(4) == event;
				}).length
			) {
				await player.draw();
				player.addTempSkill("olliantao_buff");
				player.addMark("olliantao_buff", 1, false);
			}
		},
		subSkill: {
			backup: {
				viewAs: { name: "juedou" },
				position: "h",
				check: () => 1 + Math.random(),
				precontent() {
					delete event.result.skill;
				},
			},
			buff: {
				charlotte: true,
				onremove: true,
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark("olliantao_buff");
					},
					cardEnabled(card) {
						if (card.name == "sha") return false;
					},
				},
				intro: { content: "手牌上限+#，不能使用【杀】" },
			},
		},
	},
	//王战孙策，但是通渠
	junkliantao: {
		audio: "olliantao",
		inherit: "olliantao",
	},
	//刘辟
	olyicheng: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		async content(event, trigger, player) {
			let num = player.maxHp,
				cards = get.cards(num, true);
			await player.showCards(cards, get.translation(player) + "发动了【易城】");
			if (player.countCards("h")) {
				const sum = cards.reduce((num, card) => num + get.number(card), 0);
				const {
					result: { bool, moved },
				} = await player
					.chooseToMove("易城：请选择你要交换的牌")
					.set("filterMove", (from, to) => {
						return typeof to !== "number";
					})
					.set("list", [
						[
							"牌堆顶",
							cards,
							list => {
								const sum2 = list.reduce((num, card) => num + get.number(card, false), 0);
								return "牌堆顶（现" + sum2 + { 0: "=", "-1": "<", 1: ">" }[get.sgn(sum2 - sum).toString()] + "原" + sum + "）";
							},
						],
						["手牌", player.getCards("h")],
					])
					.set("filterOk", moved => moved[1].some(i => !get.owner(i)))
					.set("processAI", list => {
						const player = get.event("player"),
							limit = Math.min(get.event("num"), player.countCards("h"));
						let cards = list[0][1].slice(),
							hs = player.getCards("h");
						if (cards.reduce((num, card) => num + get.value(card), 0) > player.getCards("h").reduce((num, card) => num + get.value(card), 0)) {
							cards.sort((a, b) => get.number(a) - get.number(b));
							hs.sort((a, b) => get.number(b) - get.number(a));
							let cards2 = cards.slice(0, limit),
								hs2 = hs.slice(0, limit);
							if (hs2.reduce((num, card) => num + get.number(card), 0) > cards2.reduce((num, card) => num + get.number(card), 0)) {
								cards.removeArray(cards2);
								hs.removeArray(hs2);
								return [cards.concat(hs2), hs.concat(cards2)];
							}
							return [cards, hs];
						} else {
							cards.sort((a, b) => get.value(b) - get.value(a));
							hs.sort((a, b) => get.value(a) - get.value(b));
							let cards2 = cards.slice(0, limit),
								hs2 = hs.slice(0, limit),
								list = [cards, hs];
							for (let i = 0; i < limit; i++) {
								if (get.value(cards2[i]) > get.value(hs2[i])) {
									const change = [cards2[i], hs2[i]];
									cards[i] = change[1];
									hs[i] = change[0];
								} else break;
							}
							return list;
						}
					})
					.set("num", num);
				if (bool) {
					const puts = player.getCards("h", i => moved[0].includes(i));
					const gains = cards.filter(i => moved[1].includes(i));
					if (puts.length && gains.length) {
						player.$throw(puts, 1000);
						await player.lose(puts, ui.special);
						await player.gain(gains, "gain2");
						//调整手牌顺序
						player.getCards("h").forEach(i => i.goto(ui.special));
						player.directgain(moved[1].reverse(), false);

						cards = moved[0].slice();
						if (cards.length) {
							await game.cardsGotoOrdering(cards);
							for (let i = cards.length - 1; i >= 0; i--) {
								ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
							}
							game.log(cards, "被放回了牌堆顶");
							game.updateRoundNumber();
						}
						await player.showCards(cards, get.translation(player) + "【易城】第一次交换后");
						if (cards.reduce((num, card) => num + get.number(card), 0) > sum && player.countCards("h")) {
							const {
								result: { bool },
							} = await player.chooseBool("易城：是否使用全部手牌交换" + get.translation(cards) + "？").set(
								"choice",
								(() => {
									return cards.reduce((num, card) => num + get.value(card), 0) > player.getCards("h").reduce((num, card) => num + get.value(card), 0);
								})()
							);
							if (bool) {
								const hs = player.getCards("h");
								player.$throw(hs, 1000);
								await player.lose(hs, ui.special);
								await player.gain(cards, "gain2");
								cards = hs.slice();
								if (cards.length) {
									await game.cardsGotoOrdering(cards);
									for (let i = cards.length - 1; i >= 0; i--) {
										ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
									}
									game.log(cards, "被放回了牌堆顶");
									game.updateRoundNumber();
								}
								await player.showCards(cards, get.translation(player) + "【易城】第二次交换后");
							}
						}
					}
				}
			}
		},
		ai: {
			order: 9,
			result: { player: 1 },
		},
	},
	//陆凯
	olxuanzhu: {
		mark: true,
		marktext: "☯",
		zhuanhuanji: true,
		audio: 2,
		enable: "chooseToUse",
		filter(event, player) {
			if (!player.countCards("he") || event.type == "wuxie") return false;
			return get
				.inpileVCardList(info => {
					const name = info[2],
						type = get.type(name),
						infox = get.info({ name: name });
					if (type != "basic" && type != "trick") return false;
					if (type == "trick" && (!infox || !infox.filterTarget || get.info("xunshi").isXunshi({ name: name }))) return false;
					return (type != "basic") == (player.storage.olxuanzhu || false);
				})
				.some(card => event.filterCard({ name: card[2], nature: card[3] }, player, event));
		},
		usable: 1,
		chooseButton: {
			dialog(event, player) {
				const list = get
					.inpileVCardList(info => {
						const name = info[2],
							type = get.type(name),
							infox = get.info({ name: name });
						if (type != "basic" && type != "trick") return false;
						if (type == "trick" && (!infox || !infox.filterTarget || get.info("xunshi").isXunshi({ name: name }))) return false;
						return (type != "basic") == (player.storage.olxuanzhu || false);
					})
					.filter(card => event.filterCard({ name: card[2], nature: card[3] }, player, event));
				return ui.create.dialog("玄注", [list, "vcard"]);
			},
			check(button) {
				if (get.event().getParent().type != "phase") return 1;
				return get.event("player").getUseValue({ name: button.link[2], nature: button.link[3] });
			},
			backup(links, player) {
				let next = {
					audio: "olxuanzhu",
					filterCard: true,
					popname: true,
					check(card) {
						return 1 / (get.value(card) || 0.5);
					},
					position: "he",
					ignoreMod: true,
					precontent() {
						const cards = event.result.cards.slice();
						player.addToExpansion(cards, player, "give").gaintag.add("olxuanzhu");
						const viewAs = {
							name: event.result.card.name,
							nature: event.result.card.nature,
						};
						event.result.card = viewAs;
						event.result.cards = [];
						player
							.when("useCardAfter")
							.filter(evt => evt.skill == "olxuanzhu_backup")
							.then(() => {
								const card = cards[0];
								if (get.type(card) != "equip") player.chooseToDiscard("he", true);
								else {
									const cardx = player.getExpansions("olxuanzhu");
									if (cardx.length) {
										player.loseToDiscardpile(cardx);
										player.draw(cardx.length);
									}
								}
							})
							.vars({ cards: cards });
					},
					onuse(result, player) {
						player.changeZhuanhuanji("olxuanzhu");
					},
				};
				const viewAs = {
					name: links[0][2],
					nature: links[0][3],
					suit: "none",
					number: null,
					isCard: true,
				};
				next.viewAs = viewAs;
				if (get.info("xunshi").isXunshi(viewAs)) {
					next.filterTarget = function (card, player, target) {
						const info = get.info(card);
						if (info.changeTarget) {
							let targets = [target];
							info.changeTarget(player, targets);
							if (targets.length > 1) return false;
						}
						return lib.filter.filterTarget(card, player, target);
					};
					next.selectTarget = 1;
				}
				return next;
			},
			prompt(links, player) {
				const viewAs = {
					name: links[0][2],
					nature: links[0][3],
					suit: "none",
					number: null,
					isCard: true,
				};
				const str = "将一张牌称为“玄”置于武将牌上，然后视为使用" + (get.translation(links[0][3]) || "") + "【" + get.translation(links[0][2]) + "】";
				return str + (get.info("xunshi").isXunshi(viewAs) ? "（仅能指定一个目标）" : "");
			},
		},
		hiddenCard(player, name) {
			if (!lib.inpile.includes(name) || player.getStat("skill").olxuanzhu || !player.countCards("he")) return false;
			return get
				.inpileVCardList(info => {
					const name = info[2],
						type = get.type(name),
						infox = get.info({ name: name });
					if (type != "basic" && type != "trick") return false;
					if (type == "trick" && (!infox || !infox.filterTarget || get.info("xunshi").isXunshi({ name: name }))) return false;
					return (type != "basic") == (player.storage.olxuanzhu || false);
				})
				.map(card => card[2])
				.includes(name);
		},
		ai: {
			order(item, player) {
				if (player && get.event().type == "phase") {
					let list = get
						.inpileVCardList(info => {
							const name = info[2],
								type = get.type(name),
								infox = get.info({ name: name });
							if (type != "basic" && type != "trick") return false;
							if (type == "trick" && (!infox || !infox.filterTarget || get.info("xunshi").isXunshi({ name: name }))) return false;
							return (type != "basic") == (player.storage.olxuanzhu || false);
						})
						.map(card => {
							return { name: card[2], nature: card[3] };
						})
						.filter(card => player.getUseValue(card, true, true) > 0);
					if (!list.length) return 0;
					list.sort((a, b) => {
						const getNum = function (card) {
							if (get.info("xunshi").isXunshi(card))
								return get.effect(
									game
										.filterPlayer(target => {
											return player.canUse(card, target, true, true);
										})
										.sort((a, b) => get.effect(b, card, player, player) - get.effect(a, card, player, player))[0],
									card,
									player,
									player
								);
							return player.getUseValue(card, true, true);
						};
						return (getNum(b) || 0) - (getNum(a) || 0);
					});
					return get.order(list[0], player) * 0.99;
				}
				return 0.001;
			},
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag, arg) {
				if (arg == "respond") return false;
				const name = tag == "respondSha" ? "sha" : "shan";
				return get.info("olxuanzhu").hiddenCard(player, name);
			},
			result: { player: 1 },
		},
		intro: {
			markcount: "expansion",
			mark(dialog, storage, player) {
				const cards = player.getExpansions("olxuanzhu");
				if (cards.length) dialog.addSmall(player.getExpansions("olxuanzhu"));
				dialog.addText(
					(() => {
						if (storage) return "每回合限一次，你可以将一张牌称为“玄”置于武将牌上，然后视为使用任意普通锦囊牌（须指定目标且仅指定一个目标）。若此次置于武将牌上的“玄”：不为装备牌，你弃置一张牌；为装备牌，你将所有“玄”置入弃牌堆，然后摸等量的牌。";
						return "每回合限一次，你可以将一张牌称为“玄”置于武将牌上，然后视为使用任意基本牌。若此次置于武将牌上的“玄”：不为装备牌，你弃置一张牌；为装备牌，你将所有“玄”置入弃牌堆，然后摸等量的牌。";
					})(storage)
				);
			},
		},
		onremove(player, skill) {
			const cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		subSkill: { backup: {} },
	},
	oljiane: {
		audio: 2,
		trigger: { player: ["shaDamage", "useCardToEnd"] },
		filter(event, player, name) {
			if (event.type != "card" || !event.target || !event.target.isIn() || event.target == player) return false;
			if (name == "shaDamage") return true;
			return event.card.name != "sha" && !event.getParent()._neutralized;
		},
		logTarget: "target",
		forced: true,
		async content(event, trigger, player) {
			trigger.target.addTempSkill("oljiane_neutralized");
		},
		group: "oljiane_neutralize",
		global: "oljiane_ai",
		subSkill: {
			neutralize: {
				audio: "oljiane",
				trigger: {
					target: "shaMiss",
					global: "eventNeutralized",
				},
				filter(event, player, name) {
					if (event.type != "card") return false;
					return name == "shaMiss" || event._neutralize_event.player == player;
				},
				forced: true,
				async content(event, trigger, player) {
					player.addTempSkill("oljiane_nouse");
				},
			},
			ai: {
				ai: {
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						if (!arg || !arg.target || !arg.target.hasSkill("oljiane_neutralized")) return false;
					},
				},
			},
			neutralized: {
				charlotte: true,
				mark: true,
				marktext: "牌",
				intro: { content: "本回合无法抵消牌" },
				trigger: { global: "useCard" },
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const id = player.playerid;
					const map = trigger.customArgs;
					if (!map[id]) map[id] = {};
					map[id].directHit2 = true;
				},
				mod: {
					wuxieJudgeEnabled: () => false,
					wuxieEnabled: () => false,
				},
			},
			nouse: {
				charlotte: true,
				mark: true,
				marktext: '<span style="text-decoration: line-through;">牌</span>',
				intro: { content: "本回合无法成为牌的目标" },
				mod: { targetEnabled: () => false },
			},
		},
	},
	//刘磐
	olpijing: {
		audio: 2,
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			return (event.card.name == "sha" || get.type(event.card) == "trick") && event.targets.length == 1;
		},
		usable: 1,
		locked: false,
		async cost(event, trigger, player) {
			const num = Math.max(1, player.getDamagedHp());
			event.result = await player
				.chooseTarget(get.prompt("olpijing"), [1, num], (card, player, target) => {
					const trigger = get.event().getTrigger();
					if (target == player) return false;
					if (trigger.targets.includes(target)) return true;
					return lib.filter.targetEnabled2(trigger.card, player, target) && lib.filter.targetInRange(trigger.card, player, target);
				})
				.set("ai", target => {
					const player = get.event("player"),
						trigger = get.event().getTrigger();
					return (trigger.targets.includes(target) ? -1 : 1) * get.effect(target, trigger.card, player, player) * (target.getStorage("olpijing_effect").includes(player) ? 2 : 1) + get.effect(target, { name: "shunshou_copy2" }, player, player);
				})
				.set("prompt2", "令至多" + get.cnNumber(num) + "名角色成为或取消成为" + get.translation(trigger.card) + "的目标并随机交给你一张牌")
				.forResult();
		},
		async content(event, trigger, player) {
			const targets = event.targets;
			for (const i of targets) {
				trigger.targets[!trigger.targets.includes(i) ? "add" : "remove"](i);
			}
			for (const target of targets) {
				target.addSkill("olpijing_effect");
				target.markAuto("olpijing_effect", [player]);
				const cards = target.getGainableCards(player, "he");
				if (cards.length) {
					await target.give(cards.randomGets(1), player);
				}
			}
		},
		mod: {
			aiOrder(player, card, num) {
				if (!(card.name == "sha" || get.type(card) == "trick")) return;
				const info = get.info(card);
				if (
					info &&
					!info.notarget &&
					(info.toself || info.singleCard || !info.selectTarget || info.selectTarget == 1) &&
					game.countPlayer(target => {
						if (get.effect(target, card, player, player) <= 0) return false;
						return lib.filter.targetEnabled2(card, player, target) && lib.filter.targetInRange(card, player, target);
					}) > 1
				)
					return num + 0.01;
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				intro: {
					content: "使用的下一张基本牌或普通锦囊牌指定唯一目标时，可指定$为额外目标或摸一张牌",
				},
				trigger: { player: "useCardToPlayer" },
				filter(event, player) {
					return (get.type(event.card) == "basic" || get.type(event.card) == "trick") && event.targets.length == 1;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const storage = player.getStorage("olpijing_effect");
					player.removeSkill("olpijing_effect");
					const {
						result: { bool, targets },
					} = await player
						.chooseTarget("披荆：请选择此牌的额外目标", [1, storage.length], (card, player, target) => {
							const trigger = get.event().getTrigger();
							return !trigger.targets.includes(target) && get.event("storage").includes(target) && lib.filter.targetEnabled2(trigger.card, player, target) && lib.filter.targetInRange(trigger.card, player, target);
						})
						.set("prompt2", "不选择的角色视为你选择摸牌项")
						.set("ai", target => {
							const player = get.event("player"),
								trigger = get.event().getTrigger();
							return get.effect(target, trigger.card, player, player) - get.effect(player, { name: "draw" }, player, player);
						})
						.set("storage", storage);
					if (bool) {
						player.line(targets);
						trigger.targets.addArray(targets);
						if (storage.length - targets.length > 0) {
							player.draw(storage.length - targets.length);
						}
					} else player.draw(storage.length);
				},
			},
		},
	},
	//郭图
	olqushi: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		delay: false,
		async content(event, trigger, player) {
			await player.draw();
			if (player.countCards("h") && game.hasPlayer(target => target != player)) {
				const {
					result: { bool, targets, cards },
				} = await player.chooseCardTarget({
					forced: true,
					prompt: "将一张手牌作为“趋”扣置于其他角色的武将牌上",
					filterTarget: lib.filter.notMe,
					filterCard: true,
					position: "h",
					ai1(card) {
						if (get.type2(card, false) == "equip") return 1 - get.value(card);
						return 7 - get.value(card);
					},
					ai2(target) {
						const att = get.sgn(get.sgn(get.attitude(get.event("player"), target)) + 0.5);
						return (target.countCards("h") + 1) * att;
					},
				});
				if (bool) {
					const target = targets[0];
					target.addSkill("olqushi_effect");
					target.markAuto("olqushi_effect", [player]);
					game.log(player, "将一张牌扣置于", target, "的武将牌上");
					target.addToExpansion(cards, player, "giveAuto").gaintag.add("olqushi_effect");
				}
			}
		},
		ai: {
			order: 1,
			result: { player: 1 },
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove(player, skill) {
					delete player.storage[skill];
					const cards = player.getExpansions(skill);
					if (cards.length) player.loseToDiscardpile(cards);
				},
				marktext: "趋",
				intro: {
					content: "expansion",
					markcount: "expansion",
					mark(dialog, storage, player) {
						if (storage.some(source => source.isUnderControl(true))) dialog.add(player.getExpansions("olqushi_effect"));
						else return "共扣置" + get.cnNumber(player.getExpansions("olqushi_effect").length) + "张“趋”";
					},
				},
				trigger: { player: "phaseJieshuBegin" },
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const cards = player.getExpansions("olqushi_effect");
					if (cards.length) {
						await player.loseToDiscardpile(cards);
						const targets = player
							.getStorage("olqushi_effect")
							.filter(i => {
								return i.isIn();
							})
							.sortBySeat();
						const num = Math.min(
							player
								.getHistory("useCard", evt => {
									return evt.targets && evt.targets.length;
								})
								.reduce((targets, evt) => {
									targets.addArray(evt.targets);
									return targets;
								}, []).length,
							5
						);
						if (
							targets.length &&
							num > 0 &&
							player.getHistory("useCard", evt => {
								return cards.some(card => get.type2(card) == get.type2(evt.card));
							}).length
						) {
							for (const target of targets) await target.draw(num);
						}
					}
					player.removeSkill("olqushi_effect");
				},
			},
		},
	},
	olweijie: {
		audio: 2,
		enable: ["chooseToUse", "chooseToRespond"],
		filter(event, player) {
			if (
				!game.hasPlayer(target => {
					return get.distance(player, target) == 1 && target.countCards("h");
				}) ||
				_status.currentPhase === player ||
				event.olweijie
			)
				return false;
			return get
				.inpileVCardList(info => {
					const name = info[2];
					return get.type(name) == "basic";
				})
				.some(card => event.filterCard({ name: card[2], nature: card[3], isCard: true }, player, event));
		},
		chooseButton: {
			dialog(event, player) {
				const list = get
					.inpileVCardList(info => {
						const name = info[2];
						return get.type(name) == "basic";
					})
					.filter(card => event.filterCard({ name: card[2], nature: card[3], isCard: true }, player, event));
				return ui.create.dialog("诿解", [list, "vcard"]);
			},
			filter(button, player) {
				return get.event().getParent().filterCard({ name: button.link[2], nature: button.link[3], isCard: true }, player, _status.event.getParent());
			},
			check(button) {
				if (get.event().getParent().type != "phase") return 1;
				return get.event("player").getUseValue({ name: button.link[2], nature: button.link[3], isCard: true });
			},
			backup(links, player) {
				return {
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						isCard: true,
					},
					filterCard: () => false,
					selectCard: -1,
					*precontent(event, map) {
						delete event.result.skill;
						const player = map.player;
						let stop = false;
						const result = yield player
							.chooseTarget("请选择一名距离为1的角色", "弃置其一张手牌，若此牌牌名为【" + get.translation(event.result.card.name) + "】，则视为你使用/打出之", (card, player, target) => {
								return get.distance(player, target) == 1 && target.countCards("h");
							})
							.set("ai", target => 1 - get.sgn(get.attitude(get.event("player"), target)));
						if (result.bool) {
							const target = result.targets[0];
							player.logSkill("olweijie", target);
							player.tempBanSkill("olweijie", null, false);
							const result2 = yield player
								.discardPlayerCard(target, "h", true)
								.set("prompt2", "若弃置的牌名为【" + get.translation(event.result.card.name) + "】，则视为你使用/打出之")
								.set("ai", button => {
									if (button.link.isKnownBy(get.event("player")) && button.link.name == get.event("namex")) return 114514;
									return 1 + Math.random();
								})
								.set("namex", event.result.card.name);
							if (result2.bool) {
								const card = result2.cards[0];
								if (get.name(card, target) == event.result.card.name) {
									player.popup("洗具");
									stop = true;
								} else player.popup("杯具");
							}
						}
						if (!stop) {
							const evt = event.getParent();
							evt.set("olweijie", true);
							evt.goto(0);
							delete evt.openskilldialog;
							return;
						}
					},
				};
			},
			prompt(links, player) {
				const nature = get.translation(links[0][3]) || "";
				const name = "【" + get.translation(links[0][2]) + "】";
				return "弃置距离为1的一名角色的一张手牌，若此牌牌名为" + name + "，则你视为使用" + nature + name;
			},
		},
		ai: {
			order: 10,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag) {
				const name = tag == "respondSha" ? "sha" : "shan";
				return lib.skill.olweijie.hiddenCard(player, name);
			},
			result: {
				player(player) {
					if (_status.event.dying && get.attitude(player, _status.event.dying) <= 0) return 0;
					return game.hasPlayer(target => {
						if (get.attitude(player, target) > 0) return false;
						return get.distance(player, target) == 1 && target.countCards("h");
					})
						? 1
						: 0;
				},
			},
		},
		hiddenCard(player, name) {
			if (!lib.inpile.includes(name) || _status.currentPhase === player || player.isTempBanned("olweijie")) return false;
			return (
				get.type(name) == "basic" &&
				game.hasPlayer(target => {
					return get.distance(player, target) == 1 && target.countCards("h");
				})
			);
		},
	},
	//胡金定
	olqingyuan: {
		audio: 2,
		trigger: {
			global: ["phaseBefore", "gainAfter", "loseAsyncAfter"],
			player: ["enterGame", "damageEnd"],
		},
		filter(event, player) {
			const storage = player.getStorage("olqingyuan");
			if (event.name == "gain" || event.name == "loseAsync") {
				if (player.hasSkill("olqingyuan_used")) return false;
				return storage.some(target => event.getg(target).length) && storage.some(target => target.hasCard(card => lib.filter.canBeGained(card, target, player), "h"));
			}
			if (!game.hasPlayer(target => !storage.includes(target) && target != player)) return false;
			if (event.name == "damage" && player.getAllHistory("damage").indexOf(event) != 0) return false;
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		async content(event, trigger, player) {
			if (trigger.name == "gain" || trigger.name == "loseAsync") {
				const target = player
					.getStorage("olqingyuan")
					.filter(target => target.hasCard(card => lib.filter.canBeGained(card, target, player), "h"))
					.randomGet();
				player.line(target);
				player.addTempSkill("olqingyuan_used");
				player.gain(
					target
						.getCards("h", card => {
							return lib.filter.canBeGained(card, target, player);
						})
						.randomGet(),
					target,
					"giveAuto"
				);
			} else {
				const filterTarget = (card, player, target) => {
						return target != player && !player.getStorage("olqingyuan").includes(target);
					},
					targetsx = game.filterPlayer(current => filterTarget(null, player, current));
				let result;
				if (targetsx.length == 1) result = { bool: true, targets: targetsx };
				else
					result = await player
						.chooseTarget(filterTarget, true)
						.set("prompt2", "每回合限一次，当你以此法选择的角色获得牌后，你随机获得其中一名角色的一张手牌")
						.set("prompt", "请选择【轻缘】的目标")
						.set("ai", target => {
							const player = get.event("player");
							return get.effect(target, new lib.element.VCard({ name: "shunshou_copy2" }), player, player);
						})
						.forResult();
				if (result.bool) {
					const target = result.targets[0];
					player.line(target);
					game.log(player, "选择了", target);
					player.markAuto("olqingyuan", [target]);
				}
			}
		},
		subSkill: { used: { charlotte: true } },
		intro: { content: "已选择$为目标" },
		ai: {
			expose: 0.3,
		},
	},
	olchongshen: {
		audio: 2,
		locked: false,
		enable: "chooseToUse",
		filterCard(card) {
			return get.itemtype(card) == "card" && card.hasGaintag("olchongshen") && get.color(card) == "red";
		},
		position: "h",
		viewAs: { name: "shan" },
		viewAsFilter(player) {
			if (!player.countCards("h", card => card.hasGaintag("olchongshen") && get.color(card) == "red")) return false;
		},
		prompt: "将本轮得到的红色牌当作【闪】使用",
		check(card) {
			return 7 - get.value(card);
		},
		ai: {
			order: 2,
			respondShan: true,
			skillTagFilter(player, tag, arg) {
				if (arg == "respond" || !player.countCards("h", card => _status.connectMode || (card.hasGaintag("olchongshen") && get.color(card) == "red"))) return false;
			},
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, "respondShan") && current < 0) return 0.6;
				},
			},
		},
		group: "olchongshen_mark",
		mod: {
			aiValue(player, card, num) {
				if (get.name(card) != "shan" && get.itemtype(card) == "card" && (!card.hasGaintag("olchongshen") || get.color(card) != "red")) return;
				let cards = player.getCards("hs", card => get.name(card) == "shan" || card.hasGaintag("olchongshen"));
				cards.sort((a, b) => (get.name(b) == "shan" ? 1 : 2) - (get.name(a) == "shan" ? 1 : 2));
				const geti = () => {
					if (cards.includes(card)) return cards.indexOf(card);
					return cards.length;
				};
				if (get.name(card) == "shan") return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6;
				return Math.max(num, [6.5, 4, 3][Math.min(geti(), 2)]);
			},
			aiUseful() {
				return lib.skill.olchongshen.mod.aiValue.apply(this, arguments);
			},
			// ignoredHandcard(card,player){
			// 	if(card.hasGaintag('olchongshen')) return true;
			// },
			// cardDiscardable(card,player,name){
			// 	if(name=='phaseDiscard'&&card.hasGaintag('olchongshen')) return false;
			// },
		},
		init(player) {
			if (game.phaseNumber > 0) {
				const hs = player.getCards("h"),
					history = player.getAllHistory();
				let cards = [];
				for (let i = history.length - 1; i >= 0; i--) {
					for (const evt of history[i].gain) {
						cards.addArray(evt.cards);
					}
					if (history[i].isRound) break;
				}
				cards = cards.filter(i => hs.includes(i));
				if (cards.length) player.addGaintag(cards, "olchongshen");
			}
		},
		onremove(player) {
			player.removeGaintag("olchongshen");
		},
		subSkill: {
			mark: {
				charlotte: true,
				trigger: { player: "gainBegin", global: "roundStart" },
				filter(event, player) {
					return event.name == "gain" || game.roundNumber > 1;
				},
				forced: true,
				popup: false,
				content() {
					if (trigger.name == "gain") trigger.gaintag.add("olchongshen");
					else player.removeGaintag("olchongshen");
				},
			},
		},
	},
	//田畴
	olshandao: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return game.hasPlayer(target => lib.skill.olshandao.filterTarget(null, player, target));
		},
		filterTarget(card, player, target) {
			return target.countCards("he");
		},
		usable: 1,
		selectTarget: [1, Infinity],
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			const wugu = new lib.element.VCard({ name: "wugu" });
			const wanjian = new lib.element.VCard({ name: "wanjian" });
			const targets = game.filterPlayer(target => {
					if (target == player) return false;
					return !event.targets.includes(target) && player.canUse(wanjian, target, false);
				}),
				targetx = event.targets.sortBySeat();
			let dialog = ["将这些角色的各一张牌置于牌堆顶，然后视为对这些角色使用【五谷丰登】"];
			for (const target of targetx) {
				const name = target == player ? "你" : get.translation(target);
				if (target.countCards("h")) {
					dialog.add('<div class="text center">' + name + "的手牌区</div>");
					if (player.hasSkillTag("viewHandcard", null, target, true) || player == target) dialog.push(target.getCards("h"));
					else dialog.push([target.getCards("h"), "blank"]);
				}
				if (target.countCards("e")) dialog.addArray(['<div class="text center">' + name + "的装备区</div>", target.getCards("e")]);
			}
			const {
				result: { bool, links },
			} = await player
				.chooseButton(dialog, event.targets.length, true)
				.set("filterButton", button => {
					return !ui.selected.buttons.some(but => get.owner(but.link) == get.owner(button.link));
				})
				.set("ai", button => 1 / (get.value(button.link, get.owner(button.link)) || 0.5));
			if (bool) {
				const cards = links.sort((a, b) => targetx.indexOf(get.owner(a)) - targetx.indexOf(get.owner(b)));
				for (const card of cards) {
					const target = get.owner(card);
					target.$throw(1, 1000);
					await target.lose([card], ui.cardPile, "insert");
				}
				const targety = targetx.filter(target => player.canUse(wugu, target, false));
				if (targety.length) await player.useCard(wugu, targety, false);
				if (targets.length) await player.useCard(wanjian, targets, false);
			}
		},
		ai: {
			order: 9,
			result: { target: 1 },
		},
	},
	//李异
	olchanshuang: {
		audio: 2,
		enable: "phaseUse",
		filterTarget: lib.filter.notMe,
		usable: 1,
		content: function* (event, map) {
			const player = map.player,
				target = event.target;
			const choiceList = ["重铸一张牌", "使用一张【杀】", "弃置两张牌"],
				list = ["重铸", "出杀", "弃牌", "无法选择"];
			let result = [];
			for (let current of [player, target]) {
				let list1 = list.slice(),
					choiceList1 = choiceList.slice();
				list1 = list1.filter(control => {
					if (control == "无法选择") return false;
					if (control == "重铸") return current.countCards("he", card => current.canRecast(card));
					if (control == "出杀") return current.countCards("he", card => card.name == "sha" && current.hasUseTarget(card));
					if (control == "弃牌") return current.countCards("he", card => lib.filter.cardDiscardable(card, current)) > 1;
				});
				choiceList1 = choiceList.filter(control => {
					if (choiceList.indexOf(control) == 0) return current.countCards("he", card => current.canRecast(card));
					if (choiceList.indexOf(control) == 1) return current.countCards("he", card => card.name == "sha" && current.hasUseTarget(card));
					if (choiceList.indexOf(control) == 2) return current.countCards("he", card => lib.filter.cardDiscardable(card, current)) > 1;
				});
				if (list1.length) {
					if (list1.length == 1) result.push(list.indexOf(list1[0]));
					else {
						let result1 = yield current
							.chooseControl(list1)
							.set("ai", () => {
								const current = _status.event.player;
								const controls = _status.event.controls.slice();
								if (controls.includes("出杀") && current.countCards("hs", card => card.name == "sha" && current.hasValueTarget(card))) return "出杀";
								if (controls.includes("重铸")) return "重铸";
								return "弃牌";
							})
							.set("choiceList", choiceList1);
						if (result1.control) result.push(list.indexOf(result1.control));
					}
				} else result.push(3);
			}
			player.popup(list[result[0]]);
			target.popup(list[result[1]]);
			for (let current of [player, target]) {
				switch (list[result[current == player ? 0 : 1]]) {
					case "重铸": {
						if (current.countCards("he", card => current.canRecast(card))) {
							let result2 = yield current.chooseCard("he", "请重铸一张牌", (card, player) => player.canRecast(card), true);
							if (result2.bool) current.recast(result2.cards);
						}
						break;
					}
					case "出杀": {
						if (current.hasUsableCard("sha"))
							current.chooseToUse({
								prompt: "请使用一张【杀】",
								filterCard: function (card, player) {
									if (card.name != "sha") return false;
									return lib.filter.filterCard.apply(this, arguments);
								},
								forced: true,
								ai1: function (card) {
									return _status.event.player.getUseValue(card);
								},
							});
						break;
					}
					case "弃牌": {
						if (current.countCards("he", card => lib.filter.cardDiscardable(card, current))) current.chooseToDiscard("he", 2, true);
						break;
					}
				}
			}
		},
		ai: {
			order: function (item, player) {
				return get.order({ name: "sha" }, player) - 0.1;
			},
			result: {
				target: function (player, target) {
					const att = get.attitude(player, target);
					if (
						target.countCards("hs", card => {
							return (
								card.name == "sha" &&
								game.hasPlayer(current => {
									return target.canUse(card, current) && get.effect(current, card, target, target) > 0 && get.effect(current, card, target, player) > 0;
								})
							);
						})
					)
						return 3;
					if (att > 0) return 2;
					if (!target.countCards("h")) return get.sgn(att) + (att == 0 ? 1 : 0);
					return 0;
				},
			},
		},
		group: "olchanshuang_end",
		subSkill: {
			end: {
				audio: "olchanshuang",
				trigger: { player: "phaseJieshuBegin" },
				filter: function (event, player) {
					return (
						player.getHistory("lose", evt => {
							if (evt.type == "discard") {
								var evtx = evt.getl(player);
								return evtx && evtx.cards2.length == 2;
							}
							return evt.getParent(2).name == "recast";
						}).length || player.getHistory("useCard", evt => evt.card.name == "sha").length
					);
				},
				forced: true,
				locked: false,
				content: function* (event, map) {
					let num = 0,
						player = map.player;
					if (player.getHistory("lose", evt => evt.getParent(2).name == "recast").length) num++;
					if (player.getHistory("useCard", evt => evt.card.name == "sha").length) num++;
					if (
						player.getHistory("lose", evt => {
							if (evt.type == "discard") {
								var evtx = evt.getl(player);
								return evtx && evtx.cards2.length == 2;
							}
						}).length
					)
						num++;
					if (num && player.countCards("he", card => player.canRecast(card))) {
						let result = yield player.chooseCard("he", "请重铸一张牌", (card, player) => player.canRecast(card), true);
						if (result.bool) yield player.recast(result.cards);
					}
					if (num > 1 && player.countCards("he", card => card.name == "sha" && player.hasUseTarget(card))) {
						yield player.chooseToUse({
							prompt: "请使用一张【杀】",
							filterCard: function (card, player) {
								if (card.name != "sha") return false;
								return lib.filter.filterCard.apply(this, arguments);
							},
							forced: true,
							ai1: function (card) {
								return _status.event.player.getUseValue(card);
							},
						});
					}
					if (num > 2 && player.countCards("he", card => lib.filter.cardDiscardable(card, player))) yield player.chooseToDiscard("he", 2, true);
				},
			},
		},
	},
	olzhanjin: {
		audio: 2,
		locked: true,
		group: "olzhanjin_guanshi",
		subSkill: {
			guanshi: {
				audio: "olzhanjin",
				nobracket: true,
				equipSkill: true,
				trigger: { player: ["shaMiss", "eventNeutralized"] },
				filter: function (event, player) {
					if (!player.hasEmptySlot(1) || !lib.card.guanshi || player.hasSkillTag("unequip_equip1")) return false;
					if (event.type != "card" || event.card.name != "sha" || !event.target.isIn()) return false;
					return player.countCards("he") >= 2;
				},
				direct: true,
				locked: false,
				content: function () {
					"step 0";
					player
						.chooseToDiscard(get.prompt("olzhanjin_guanshi"), "弃置两张牌，令" + get.translation(trigger.card) + "强制命中", 2, "he")
						.set("ai", function (card) {
							var evt = _status.event.getTrigger();
							if (get.attitude(evt.player, evt.target) < 0) {
								if (player.needsToDiscard()) return 15 - get.value(card);
								if (evt.baseDamage + evt.extraDamage >= Math.min(2, evt.target.hp)) return 8 - get.value(card);
								return 5 - get.value(card);
							}
							return -1;
						})
						.set("complexCard", true).logSkill = "olzhanjin_guanshi";
					"step 1";
					if (result.bool) {
						if (event.triggername == "shaMiss") {
							trigger.untrigger();
							trigger.trigger("shaHit");
							trigger._result.bool = false;
							trigger._result.result = null;
						} else trigger.unneutralize();
					}
				},
				mod: {
					attackRange: function (player, num) {
						if (lib.card.guanshi && player.hasEmptySlot(1)) return num - lib.card.guanshi.distance.attackFrom;
					},
				},
				ai: {
					directHit_ai: true,
					skillTagFilter: function (player, tag, arg) {
						if (player._olzhanjin_guanshi_temp || !player.hasEmptySlot(1) || !lib.card.guanshi || player.hasSkillTag("unequip_equip1")) return;
						player._olzhanjin_guanshi_temp = true;
						var bool =
							get.attitude(player, arg.target) < 0 &&
							arg.card &&
							arg.card.name == "sha" &&
							player.countCards("he", card => {
								return card != arg.card && (!arg.card.cards || !arg.card.cards.includes(card)) && get.value(card) < 5;
							}) > 1;
						delete player._olzhanjin_guanshi_temp;
						return bool;
					},
					effect: {
						target: function (card, player, target) {
							if (player.hasSkillTag("unequip_equip1")) return;
							if (player == target && get.subtype(card) == "equip1") {
								if (get.equipValue(card) <= get.equipValue({ name: "guanshi" })) return 0;
							}
						},
					},
				},
			},
		},
	},
	//曹宇
	olgongjie: {
		audio: 2,
		trigger: { global: "phaseBegin" },
		filter(event, player) {
			if (!player.countCards("he")) return false;
			return !game.hasPlayer(current => {
				var history = current.actionHistory;
				for (var num = history.length - 1; num >= 0; num--) {
					if (history[num].isRound) break;
					if (history[num].isSkipped) continue;
					return true;
				}
				return false;
			});
		},
		direct: true,
		async content(event, trigger, player) {
			var num = player.countCards("he"),
				draws = [];
			var {
				result: { bool, targets },
			} = await player.chooseTarget(get.prompt2("olgongjie"), [1, num], lib.filter.notMe).set("ai", target => get.attitude(_status.event.player, target));
			if (!bool) return;
			targets = targets.sortBySeat();
			player.logSkill("olgongjie", targets);
			for (var target of targets) {
				var {
					result: { bool, cards },
				} = await target.gainPlayerCard(player, true, "he");
				if (bool) draws.add(get.suit(cards[0], player));
			}
			player.draw(draws.length);
		},
	},
	olxiangxv: {
		audio: 2,
		trigger: { global: "phaseEnd" },
		filter(event, player) {
			const target = _status.currentPhase;
			if (!target?.isIn() || !player.hasSkill("olxiangxv_in")) return false;
			const num = target.countCards("h") - player.countCards("h");
			if (num == 0 || (num > 0 && player.countCards("h") >= 5)) return false;
			return num > 0 || player.countDisabledSlot(player, "h");
		},
		check(event, player) {
			const target = _status.currentPhase,
				num = target.countCards("h") - player.countCards("h");
			return num > 0 || (num == -2 && player.isDamaged());
		},
		usable: 1,
		logTarget: () => _status.currentPhase,
		async content(event, trigger, player) {
			const target = _status.currentPhase,
				num = target.countCards("h") - player.countCards("h");
			if (num > 0) {
				if (player.countCards("h") < 5) await player.draw(Math.min(5 - player.countCards("h"), num));
			} else {
				const result = await player.chooseToDiscard(-num, "h", true).forResult();
				if (result.bool && result.cards.length > 1) {
					if (player.isDamaged()) await player.recover();
				}
			}
		},
		group: "olxiangxv_mark",
		subSkill: {
			mark: {
				charlotte: true,
				trigger: {
					player: "loseAfter",
					global: ["gainAfter", "equipAfter", "addJudgeAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					if (!_status.currentPhase || !_status.currentPhase.isIn()) return false;
					if (!player.isMinHandcard()) return false;
					const evt = event.getl(player);
					return evt?.player == player && evt?.hs?.length > 0;
				},
				firstDo: true,
				forced: true,
				popup: false,
				content() {
					player.addTempSkill("olxiangxv_in");
				},
			},
			in: { charlotte: true },
		},
	},
	olxiangzuo: {
		audio: 2,
		trigger: { player: "dying" },
		filter(event, player) {
			return player.countCards("he") && game.hasPlayer(target => target != player);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCardTarget({
					prompt: get.prompt2("olxiangzuo"),
					filterCard: true,
					selectCard: [1, Infinity],
					filterTarget: lib.filter.notMe,
					position: "he",
					complexCard: true,
					complexTarget: true,
					complexSelect: true,
					ai1(card) {
						const player = get.event("player");
						if (!ui.selected.targets.length) return 0;
						const target = ui.selected.targets[0];
						if (
							player.hasAllHistory("useSkill", evt => {
								return evt.skill == "olgongjie" && (evt.targets || [evt.target]).includes(target);
							}) &&
							player.hasAllHistory("useSkill", evt => {
								return evt.skill == "olxiangxv" && (evt.targets || [evt.target]).includes(target);
							})
						) {
							if (get.attitude(player, target) > 0) return 1;
							if (player.canSaveCard(card, player)) return 0;
							if (ui.selected.cards.length + player.hp >= player.maxHp) return 0;
							return 20 - get.value(card);
						}
						if (get.attitude(player, target) > 0 && !player.countCards("he", cardx => player.canSaveCard(cardx, player))) return 1;
						return 0;
					},
					ai2(target) {
						const player = get.event("player");
						const goon =
								player.hasAllHistory("useSkill", evt => {
									return evt.skill == "olgongjie" && (evt.targets || [evt.target]).includes(target);
								}) &&
								player.hasAllHistory("useSkill", evt => {
									return evt.skill == "olxiangxv" && (evt.targets || [evt.target]).includes(target);
								}),
							att = get.attitude(player, target);
						if (goon) return 5 * att;
						if (player.countCards("he", cardx => player.canSaveCard(cardx, player)) > 0) return att;
						return 0;
					},
				})
				.forResult();
		},
		limited: true,
		skillAnimation: true,
		animationColor: "water",
		async content(event, trigger, player) {
			const target = event.targets[0],
				cards = event.cards;
			player.awakenSkill("olxiangzuo");
			await player.give(cards, target);
			if (
				player.hasAllHistory("useSkill", evt => {
					return evt.skill == "olgongjie" && evt.targets.includes(target);
				}) &&
				player.hasAllHistory("useSkill", evt => {
					return evt.skill == "olxiangxv" && evt.targets.includes(target);
				})
			)
				await player.recover(cards.length);
		},
		ai: {
			combo: "olgongjie",
		},
	},
	//OL飞扬
	olfeiyang: {
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return (
				player.countCards("he", card => {
					if (_status.connectMode && get.position(card) == "h") return true;
					return lib.filter.cardDiscardable(card, player);
				}) >= lib.skill.olfeiyang.getNum && player.countCards("j")
			);
		},
		direct: true,
		limited: true,
		getNum: 2,
		//skillAnimation:true,
		//animationColor:'orange',
		content: function () {
			"step 0";
			player
				.chooseToDiscard(get.prompt2("olfeiyang"), "he", lib.skill.olfeiyang.getNum)
				.set("ai", function (card) {
					var player = _status.event.player;
					if (
						player.hasCard(function (card) {
							return (
								get.effect(
									player,
									{
										name: card.viewAs || card.name,
										cards: [card],
									},
									player,
									player
								) < 0
							);
						}, "j")
					)
						return 6 - get.value(card);
					return 0;
				})
				.set("logSkill", "olfeiyang");
			"step 1";
			if (result.bool) {
				player.awakenSkill("olfeiyang");
				player.discardPlayerCard(player, "j", true);
			}
		},
	},
	//李婉
	ollianju: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		filter: function (event, player) {
			var history = player.getHistory("useCard");
			if (!history.length) return false;
			var evt = history[history.length - 1];
			return evt.cards && evt.cards.filterInD("d").length;
		},
		direct: true,
		content: function () {
			"step 0";
			var history = player.getHistory("useCard");
			var evt = history[history.length - 1];
			event.evt = evt;
			player
				.chooseTarget(get.prompt("ollianju"), "令一名角色获得" + get.translation(evt.cards.filterInD("d")) + "并记录" + get.translation(evt.card.name), lib.filter.notMe)
				.set("ai", target => {
					var player = _status.event.player,
						att = get.attitude(player, target);
					var cards = _status.event.cards;
					if (cards.filter(card => get.name(card, false) == "du").length >= Math.ceil(cards.length / 2)) att *= -1;
					if (target.skipList.includes("phaseUse") || target.hasJudge("lebu")) return att / 20;
					return att;
				})
				.set("cards", evt.cards.filterInD("d"));
			"step 1";
			if (result.bool) {
				var evt = event.evt;
				var target = result.targets[0];
				player.logSkill("oliandui", target);
				target.gain(evt.cards.filterInD("d"), "gain2");
				player.addSkill("ollianju_effect");
				player.storage.ollianju = evt.card.name;
				player.markSkill("ollianju");
				if (!player.storage.ollianju_effect[target.playerid]) player.storage.ollianju_effect[target.playerid] = [];
				player.storage.ollianju_effect[target.playerid].add(evt.card.name);
			}
		},
		onunmark: true,
		intro: {
			content: function (storage, player) {
				var str = "当前最后一次记录牌名：" + get.translation(storage);
				if (player.storage.ollianju_effect) {
					for (var i in player.storage.ollianju_effect) {
						var target = game.findPlayer(target => target.playerid == i);
						if (!i) continue;
						str += "<br>";
						str += get.translation(target) + "的下个结束阶段，其可令你获得其本回合使用的最后一张牌对应的所有位于弃牌堆的实体牌";
						str += "，然后若此牌名为" + get.translation(player.storage.ollianju_effect[i]) + "，则你失去1点体力，否则你可以视为使用" + get.translation(player.storage.ollianju_effect[i]);
					}
				}
				return str;
			},
		},
		subSkill: {
			effect: {
				init: function (player) {
					if (!player.storage.ollianju_effect) player.storage.ollianju_effect = {};
				},
				charlotte: true,
				trigger: { global: ["phaseJieshuBegin", "die"] },
				filter: function (event, player) {
					return player.storage.ollianju_effect[event.player.playerid];
				},
				direct: true,
				content: function () {
					"step 0";
					if (trigger.name == "phaseJieshu") event.list = player.storage.ollianju_effect[trigger.player.playerid];
					delete player.storage.ollianju_effect[trigger.player.playerid];
					var history = trigger.player.getHistory("useCard");
					var evt = history[history.length - 1];
					event.evt = evt;
					if (trigger.name == "die" || !history.length || !evt.cards || !evt.cards.filterInD("d").length) event.finish();
					"step 1";
					var evt = event.evt;
					trigger.player.chooseBool(get.prompt("ollianju", player), "令" + get.translation(player) + "获得" + get.translation(evt.cards.filterInD("d")) + (event.list.includes(evt.card.name) ? "，然后" + get.translation(player) + "失去1点体力" : "")).set("choice", get.attitude(trigger.player, player) > 0 && (!event.list.includes(evt.card.name) || player.getHp() > 1));
					"step 2";
					if (result.bool) {
						var evt = event.evt,
							cards = evt.cards.filterInD("d");
						trigger.player.line(player);
						player.gain(cards, "gain2");
						if (event.list.includes(evt.card.name)) player.loseHp();
						else {
							var card = {
								name: evt.card.name,
								isCard: true,
							};
							if (player.hasUseTarget(card)) player.chooseUseTarget(card, false);
						}
					}
				},
			},
		},
	},
	olsilv: {
		audio: 2,
		trigger: {
			player: ["loseAfter", "gainAfter"],
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter: function (event, player) {
			var name = player.storage.ollianju;
			if (!name) return false;
			const list = player.getStorage("olsilv_used");
			if (event.getg) return event.getg(player).some(card => card.name == name) && !list.includes("gain");
			return event.getl(player).cards2.some(card => card.name == name) && !list.includes("lose");
		},
		forced: true,
		content: function () {
			"step 0";
			player.addTempSkill("olsilv_used");
			player.markAuto("olsilv_used", trigger.getg ? "gain" : "lose");
			if (!trigger.visible) {
				var cards,
					name = player.storage.ollianju;
				if (trigger.getg) cards = trigger.getg(player).filter(card => card.name == name);
				else cards = trigger.getl(player).cards2.filter(card => card.name == name);
				if (cards.length) player.showCards(cards, get.translation(player) + "发动了【思闾】");
			}
			"step 1";
			player.draw();
		},
		ai: { combo: "ollianju" },
		subSkill: {
			used: { charlotte: true, charlotte: true },
		},
	},
	relianju: {
		audio: "ollianju",
		trigger: { player: "phaseJieshuBegin" },
		filter(event, player) {
			return player.hasHistory("useCard", evt => {
				return (evt.cards || []).some(card => get.position(card, true) == "d");
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("relianju"), "令一名其他角色获得你本回合使用的且进入弃牌堆的至多两张颜色相同的牌", lib.filter.notMe)
				.set("ai", target => {
					const player = get.event("player");
					let att = get.attitude(_status.event.player, target);
					if (target.hasJudge("lebu")) att /= 2;
					if (target.hasSkillTag("nogain")) att /= 10;
					return att / (1 + get.distance(player, target, "absolute"));
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const cards = player
					.getHistory("useCard", evt => {
						return (evt.cards || []).some(card => get.position(card, true) == "d");
					})
					.reduce((sum, evt) => {
						return sum.addArray(evt.cards.filter(card => get.position(card, true) == "d"));
					}, []),
				target = event.targets[0];
			const result = await player
				.chooseButton(["联句：选择令" + get.translation(target) + "获得的牌", cards], [1, 2], true)
				.set("filterButton", button => {
					return !ui.selected.buttons.some(but => get.color(but.link) != get.color(button.link));
				})
				.set("ai", button => {
					return get.value(button.link, get.event("target"));
				})
				.set("target", target)
				.forResult();
			if (result.bool) {
				const color = get.color(result.links[0], false);
				await target.gain(result.links, "gain2").set("gaintag", ["resilv"]);
				player
					.when({ global: "phaseJieshuBegin" })
					.filter(
						evt =>
							evt.player == target &&
							target.hasHistory("useCard", evt => {
								return (evt.cards || []).some(card => get.position(card, true) == "d" && get.color(card) != color);
							})
					)
					.then(() => {
						const cards = trigger.player
							.getHistory("useCard", evt => {
								return (evt.cards || []).some(card => get.position(card, true) == "d" && get.color(card) != color);
							})
							.reduce((sum, evt) => {
								return sum.addArray(evt.cards.filter(card => get.position(card, true) == "d" && get.color(card) != color));
							}, []);
						player
							.chooseButton(["联句：请选择获得的牌", cards], [1, 2], true)
							.set("filterButton", button => {
								return !ui.selected.buttons.some(but => get.color(but.link) != get.color(button.link));
							})
							.set("ai", button => {
								return get.value(button.link, get.event("target"));
							});
					})
					.then(() => {
						if (result.bool) {
							player.gain(result.links, "gain2").gaintag.add("resilv");
						}
					})
					.vars({ color: color });
			}
		},
	},
	resilv: {
		audio: "olsilv",
		trigger: { player: "damageEnd" },
		forced: true,
		content() {
			player.draw().gaintag = ["resilv"];
		},
		group: "resilv_restore",
		subSkill: {
			restore: {
				audio: "olsilv",
				trigger: { global: ["loseAfter", "loseAsyncAfter"] },
				filter(event, player) {
					if (event.type != "discard" || event.getlx === false) return false;
					if (event.name == "lose") {
						if (!event.player.isIn()) return false;
						return event.cards2.some(card => {
							return (event.gaintag_map[card.cardid] || []).includes("resilv") && get.position(card, true) == "d";
						});
					}
					return game.hasPlayer(target => {
						return target.hasHistory("lose", evt => {
							if (evt.getParent() != event || evt.position != ui.discardPile) return false;
							return evt.cards2.some(card => {
								if (get.position(card, true) != "d") return false;
								return (evt.gaintag_map[card.cardid] || []).includes("resilv");
							});
						});
					});
				},
				forced: true,
				logTarget(event, player) {
					if (event.name == "lose") return event.player;
					return game
						.filterPlayer(target => {
							return target.hasHistory("lose", evt => {
								if (evt.getParent() != event || evt.position != ui.discardPile) return false;
								return evt.cards2.some(card => {
									if (get.position(card, true) != "d") return false;
									return evt.gaintag_map[card.cardid] && evt.gaintag_map[card.cardid].includes("resilv");
								});
							});
						})
						.sortBySeat();
				},
				async content(event, trigger, player) {
					if (trigger.name == "lose") {
						await trigger.player.gain(
							trigger.cards2.filter(card => {
								return (trigger.gaintag_map[card.cardid] || []).includes("resilv") && get.position(card, true) == "d";
							}),
							"gain2"
						);
					} else {
						for (const target of lib.skill.resilv_restore.logTarget(trigger, player)) {
							await target.gain(
								target
									.getHistory("lose", evt => {
										if (evt.getParent() != trigger || evt.position != ui.discardPile) return false;
										return evt.cards2.some(card => {
											if (get.position(card, true) != "d") return false;
											return (evt.gaintag_map[card.cardid] || []).includes("resilv");
										});
									})
									.reduce((sum, evt) => {
										return sum.addArray(
											evt.cards2.filter(card => {
												if (get.position(card, true) != "d") return false;
												return (evt.gaintag_map[card.cardid] || []).includes("resilv");
											})
										);
									}, []),
								"gain2"
							);
						}
					}
				},
			},
		},
	},
	//丁尚涴
	olfudao: {
		audio: 2,
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		locked: false,
		content: function () {
			"step 0";
			player.draw(3);
			"step 1";
			var num = player.countCards("h");
			if (num > 0) {
				player.chooseCardTarget({
					prompt: "抚悼：将至多三张手张牌交给一名其他角色",
					selectCard: [1, 3],
					filterCard: true,
					filterTarget: lib.filter.notMe,
					position: "h",
					ai1: function (card) {
						if (card.name == "du") return 10;
						else if (ui.selected.cards.length && ui.selected.cards[0].name == "du") return 0;
						var player = _status.event.player;
						if (
							ui.selected.cards.length > 4 ||
							!game.hasPlayer(function (current) {
								return get.attitude(player, current) > 0 && !current.hasSkillTag("nogain");
							})
						)
							return 0;
						return 1 / Math.max(0.1, get.value(card));
					},
					ai2: function (target) {
						var player = _status.event.player,
							att = get.attitude(player, target);
						if (ui.selected.cards[0].name == "du") return -att;
						if (target.hasSkillTag("nogain")) att /= 6;
						return att;
					},
				});
			} else event.goto(3);
			"step 2";
			if (result.bool) {
				player.give(result.cards, result.targets[0]);
			}
			"step 3";
			var num = player.countCards("h");
			if (num > 0) player.chooseToDiscard("h", [1, num], "抚悼：弃置任意张手牌，然后记录手牌数");
			"step 4";
			player.storage.olfudao = player.countCards("h");
			player.markSkill("olfudao");
		},
		intro: {
			content: "一名角色的回合结束时，若其手牌数等于#，你可以与其各摸一张牌。",
		},
		group: "olfudao_qiaoshi",
		subSkill: {
			qiaoshi: {
				audio: "olfudao",
				trigger: { global: "phaseEnd" },
				filter: function (event, player) {
					if (typeof player.storage.olfudao != "number") return false;
					return event.player.countCards("h") == player.storage.olfudao && event.player.isIn();
				},
				check: function (event, player) {
					return get.attitude(player, event.player) >= 0;
				},
				logTarget: "player",
				prompt2: function (event, player) {
					return "与" + get.translation(event.player) + "各摸一张牌";
				},
				content: function () {
					game.asyncDraw([trigger.player, player]);
				},
			},
		},
	},
	olfengyan: {
		audio: 2,
		trigger: { player: ["damageEnd", "useCard", "respond"] },
		filter: function (event, player) {
			if (event.name == "damage") return event.source && event.source.isIn() && event.source != player;
			return Array.isArray(event.respondTo) && event.respondTo[0] != player;
		},
		logTarget: function (event, player) {
			if (event.name == "damage") return event.source;
			return event.respondTo[0];
		},
		forced: true,
		content: function () {
			"step 0";
			var target = lib.skill.olfengyan.logTarget(trigger, player);
			var str = get.translation(target);
			event.target = target;
			player
				.chooseControl()
				.set("choiceList", ["摸一张牌，然后交给" + str + "一张牌", "令" + str + "摸一张牌，然后" + str + "弃置两张牌"])
				.set("ai", () => (_status.event.att > 0 ? 0 : 1))
				.set("att", get.attitude(player, target));
			"step 1";
			if (result.index == 0) {
				player.draw();
				player.chooseToGive(target, "he", true);
			} else {
				target.draw();
				target.chooseToDiscard(2, "he", true);
			}
		},
	},
	//张燕
	olsuji: {
		audio: 2,
		trigger: { global: "phaseUseBegin" },
		filter: function (event, player) {
			if (!event.player.isDamaged()) return false;
			return (
				(_status.connectMode && player.countCards("hes")) ||
				(!_status.connectMode &&
					player.hasCard(card => {
						return get.color(card) == "black";
					}, "hes"))
			);
		},
		direct: true,
		async content(event, trigger, player) {
			const next = player.chooseToUse();
			next.set("openskilldialog", `###${get.prompt("olsuji")}###将一张黑色牌当【杀】使用${player == trigger.player ? "" : `。若${get.translation(trigger.player)}受到了此【杀】的伤害，你获得其一张牌。`}`);
			next.set("norestore", true);
			next.set("_backupevent", "olsuji_backup");
			next.set("addCount", false);
			next.set("logSkill", "olsuji");
			next.set("custom", {
				add: {},
				replace: { window: function () {} },
			});
			next.backup("olsuji_backup");
			const result = await next.forResult();
			if (result.bool) {
				if (
					trigger.player.isIn() &&
					trigger.player.hasHistory("damage", evt => {
						return evt.card && evt.card.storage && evt.card.storage.olsuji;
					}) &&
					trigger.player.countGainableCards(player, "he")
				)
					player.gainPlayerCard(trigger.player, "he", true);
			}
		},
		subSkill: {
			backup: {
				filterCard: function (card) {
					return get.itemtype(card) == "card" && get.color(card) == "black";
				},
				viewAs: {
					name: "sha",
					storage: { olsuji: true },
				},
				selectCard: 1,
				position: "hes",
				ai1: function (card) {
					return 5 - get.value(card);
				},
				precontent: function () {
					delete event.result.skill;
				},
			},
		},
	},
	ollangdao: {
		audio: 2,
		trigger: { player: "useCardToPlayer" },
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			return event.isFirstTarget && event.targets.length == 1 && player.getStorage("ollangdao").length < 3;
		},
		logTarget: "target",
		onremove: true,
		check: function (event, player) {
			if (get.attitude(player, event.target) > 0) {
				if (
					player.getStorage("ollangdao").includes(1) &&
					game.hasPlayer(current => {
						return player.canUse(event.card, current) && get.effect(current, event.card, player, player) > 0;
					})
				)
					return event.getRand() < 0.5;
				return false;
			}
			return event.target.getHp() <= 2 || player.getDamagedHp() > 1 || !player.hasCard({ color: "black" }, "hes");
		},
		content: function* (event, map) {
			var player = map.player,
				trigger = map.trigger,
				result = map.result;
			var target = trigger.target;
			var send = function (card, list) {
				var next = game.createEvent("ollangdao_choose", false);
				next.setContent(lib.skill.ollangdao.contentx);
				next.set("card", card);
				next.set("list", list);
				game.resume();
			};
			var sendback = function (result, player) {
				if (!result) result = {};
				if (typeof result.index !== "number" || result.index < 0) {
					result.index = [0, 1, 2].find(i => !event.player.getStorage("ollangdao").includes(i));
				}
				results.push([player, result]);
			};
			var ai_targets = [];
			var results = [];
			var players = [player, target];
			var withme = false,
				withol = false,
				withai = false;
			for (var i = 0; i < players.length; i++) {
				if (_status.connectMode) players[i].showTimer();
				var card = trigger.card,
					list = player.getStorage("ollangdao");
				if (players[i].isOnline()) {
					withol = true;
					players[i].send(send, card, list);
					players[i].wait(sendback);
				} else if (players[i] == game.me) {
					withme = true;
					var next = game.createEvent("ollangdao_choose", false);
					next.setContent(lib.skill.ollangdao.contentx);
					next.set("card", card);
					next.set("list", list);
					if (_status.connectMode) game.me.wait(sendback);
				} else {
					ai_targets.push(players[i]);
				}
			}
			if (ai_targets.length) {
				for (var i = 0; i < ai_targets.length; i++) {
					if (players.includes(ai_targets[i])) {
						var target = ai_targets[i];
						var list = [0, 1, 2].removeArray(player.getStorage("ollangdao"));
						var index = list[0];
						if (get.attitude(target, player) < 0) {
							if (
								!game.hasPlayer(current => {
									return !trigger.targets.includes(current) && player.canUse(trigger.card, current) && get.effect(current, trigger.card, player, target) < 0;
								})
							)
								list.removeArray([0, 2]);
							if (player.getStorage("ollangdao").includes(2)) list.remove(0);
						} else {
							if (
								!game.hasPlayer(current => {
									return !trigger.targets.includes(current) && player.canUse(trigger.card, current) && get.effect(current, trigger.card, player, target) > 0;
								})
							)
								list.remove(1);
							if (!list.includes(1)) list.remove(0);
						}
						if (list.length) index = list.randomGet();
						sendback({ index: index }, target);
						ai_targets.splice(i--, 1);
					}
				}
				if (ai_targets.length) {
					ai_targets.randomSort();
					setTimeout(function () {
						event.interval = setInterval(
							function () {
								var target = ai_targets.shift();
								var list = [0, 1, 2].removeArray(player.getStorage("ollangdao"));
								var index = list[0];
								if (get.attitude(target, player) < 0) {
									if (
										!game.hasPlayer(current => {
											return !trigger.targets.includes(current) && player.canUse(trigger.card, current) && get.effect(current, trigger.card, player, target) < 0;
										})
									)
										list.removeArray([0, 2]);
									if (player.getStorage("ollangdao").includes(2)) list.remove(0);
								} else {
									if (
										!game.hasPlayer(current => {
											return !trigger.targets.includes(current) && player.canUse(trigger.card, current) && get.effect(current, trigger.card, player, target) > 0;
										})
									)
										list.remove(1);
									if (!list.includes(1)) list.remove(0);
								}
								if (list.length) index = list.randomGet();
								sendback({ index: index }, target);
								if (!ai_targets.length) {
									clearInterval(event.interval);
									if (withai) game.resume();
								}
							},
							_status.connectMode ? 750 : 75
						);
					}, 500);
				}
			}
			if (withme) {
				result = yield next;
				if (_status.connectMode) {
					game.me.unwait(result, game.me);
				} else {
					if (!result) result = {};
					if (typeof result.index !== "number" || result.index < 0) {
						result.index = [0, 1, 2].find(i => !event.player.getStorage("ollangdao").includes(i));
					}
					results.push([player, result]);
				}
			}
			if (withol && !event.resultOL) {
				game.pause();
				yield null;
			}
			if (ai_targets.length > 0) {
				withai = true;
				game.pause();
				yield null;
			}
			if (_status.connectMode) {
				for (var i of [player, target]) i.hideTimer();
			}
			var chosenCount = [0, 0, 0];
			results.sort((a, b) => lib.sort.seat(a[0], b[0]));
			player
				.when("useCardAfter")
				.assign({
					card: trigger.card,
				})
				.then(() => {
					var card = get.info(event.name).card;
					var dieEvts = game.getGlobalHistory("everything", evt => evt.name == "die");
					if (
						trigger.card == card &&
						!game.hasPlayer2(current => {
							for (var evt of dieEvts) {
								if (evt.player != current) continue;
								var evtx = evt.getParent(2);
								if (evtx.name != "damage") continue;
								if (evtx.card && evtx.card == card) return true;
							}
							return false;
						}, true)
					) {
						var toRemove = card.storage.ollangdao_remove;
						var list = [0, 1, 2].filter(i => (toRemove >> i) & 1);
						if (!list.length) return;
						player.markAuto("ollangdao", list);
						game.log(
							player,
							"移去了",
							"#g【狼蹈】",
							"的",
							"#y选项" +
								list
									.map(i => {
										return get.cnNumber(i + 1, true);
									})
									.join("、")
						);
					}
				});
			if (!trigger.card.storage) trigger.card.storage = {};
			if (!trigger.card.storage.ollangdao_remove) trigger.card.storage.ollangdao_remove = 0;
			var config = [
				["伤害+1", "fire"],
				["目标+1", "wood"],
				["不能响应", "water"],
			];
			for (var res of results) {
				var target = res[0],
					result = res[1];
				if (!target || !result) continue;
				var ind = result.index;
				var conf = config[ind];
				trigger.card.storage.ollangdao_remove |= 1 << ind;
				target.popup(conf[0], conf[1]);
				game.log(target, "选择令", trigger.card, `#g${conf[0]}`);
				chosenCount[ind]++;
			}
			game.delay();
			var extraBaseDamage = chosenCount[0],
				extraTargetNum = chosenCount[1],
				directHit = chosenCount[2];
			trigger.getParent().baseDamage += extraBaseDamage;
			if (directHit) trigger.directHit.addArray(game.players);
			if (extraTargetNum <= 0) {
				event.finish();
				return;
			}
			result = yield player
				.chooseTarget(`狼蹈：为${get.translation(trigger.card)}额外指定至多${get.cnNumber(extraTargetNum)}个目标`, (card, player, target) => {
					return !_status.event.targets.includes(target) && player.canUse(_status.event.card, target);
				})
				.set("targets", trigger.targets)
				.set("ai", target => {
					var player = _status.event.player;
					return get.effect(target, _status.event.card, player, player);
				})
				.set("card", trigger.card);
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayex();
				var targets = result.targets;
				player.line(targets);
				trigger.targets.addArray(targets);
				game.log(targets, "也成为了", trigger.card, "的目标");
			}
		},
		contentx: function () {
			"step 0";
			var name = get.translation(card);
			var choices = [],
				choiceList = [`令${name}伤害基数+1`, `令${name}可以多选择一个目标`, `令${name}不可被响应`];
			[0, 1, 2].forEach((item, index) => {
				if (event.list.includes(item)) {
					choiceList[index] = `<span style="text-decoration: line-through; opacity:0.5; ">${choiceList[index]}</span>`;
				} else choices.push(`选项${get.cnNumber(index + 1, true)}`);
			});
			game.me
				.chooseControl(choices)
				.set("prompt", "狼蹈：请选择一项")
				.set("choiceList", choiceList)
				.set("ai", () => {
					return _status.event.controls.randomGet();
				});
			"step 1";
			event.result = { index: ["选项一", "选项二", "选项三"].indexOf(result.control) };
		},
		intro: {
			content: (storage, player) => `已移除选项${storage.map(i => get.cnNumber(i + 1, true)).join("、")}`,
		},
	},
	//张既
	skill_zhangji_A: {
		audio: 2,
		trigger: { player: "useCardToPlayered" },
		filter: function (event, player) {
			if (player.countMark("skill_zhangji_A_count") >= player.hp) return false;
			return event.target != player && event.target.countCards("h") && player.isPhaseUsing();
		},
		check: function (event, player) {
			return get.attitude(player, event.target) < 0;
		},
		logTarget: "target",
		content: function () {
			"step 0";
			player.addTempSkill("skill_zhangji_A_count", "phaseUseAfter");
			player.addMark("skill_zhangji_A_count", 1, false);
			player.viewHandcards(trigger.target);
			var list = [],
				choiceList = ["弃置" + get.translation(trigger.target) + "的一张牌，然后若弃置的牌的是能造成火焰伤害的牌，你摸一张牌", "重铸" + get.translation(trigger.target) + "手牌中的所有【杀】和【决斗】", "你与" + get.translation(trigger.target) + "互相对对方造成1点伤害"];
			list.push("选项一");
			if (trigger.target.countCards("h", { name: ["sha", "juedou"] })) list.push("选项二");
			else choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "</span>";
			if (!trigger.target.countCards("h", { name: "shan" })) list.push("选项三");
			else choiceList[2] = '<span style="opacity:0.5">' + choiceList[2] + "</span>";
			player
				.chooseControl(list)
				.set("prompt", get.prompt("tspowei", target))
				.set("choiceList", choiceList)
				.set("ai", function () {
					var player = _status.event.player,
						target = _status.event.target;
					if (list.includes("选项三") && player.hp + player.countCards("hs", { name: "tao" }) > 2) return "选项三";
					if (list.includes("选项二") && target.countCards("h", { name: ["sha", "juedou"] }) > 1) return "选项二";
					return "选项一";
				})
				.set("target", trigger.target);
			"step 1";
			game.log(player, "选择了", "#y" + result.control);
			switch (result.control) {
				case "选项一":
					player.discardPlayerCard("he", trigger.target, "visible", true);
					break;
				case "选项二":
					var cards = trigger.target.getCards("h", { name: ["sha", "juedou"] }).filter(card => trigger.target.canRecast(card));
					trigger.target.recast(cards);
					event.finish();
					break;
				case "选项三":
					trigger.target.damage(player);
					player.damage(trigger.target);
					event.finish();
					break;
			}
			"step 2";
			if (result.bool && get.tag(result.cards[0], "fireDamage")) player.draw();
		},
		subSkill: {
			count: {
				charlotte: true,
				onremove: true,
			},
		},
	},
	skill_zhangji_B: {
		getNum: function (name) {
			var num = 0;
			if (name == "litong") num = 1;
			else
				switch (game.getRarity(name)) {
					case "junk":
						num = 1;
						break;
					case "rare":
						num = 2;
						break;
					case "epic":
						num = 3;
						break;
					case "legend":
						num = 4;
						break;
				}
			return num;
		},
		getCharacter: function (list) {
			var listx = [],
				num = 0;
			for (var name of list) {
				var numx = lib.skill.skill_zhangji_B.getNum(name);
				if (numx > num) {
					num = numx;
					listx = [name];
				} else if (numx == num) listx.push(name);
			}
			return listx;
		},
		group: "skill_zhangji_B_jieming",
		audio: 2,
		trigger: { player: "dying" },
		skillAnimation: true,
		animationColor: "water",
		direct: true,
		content: function () {
			"step 0";
			if (!_status.characterlist) lib.skill.pingjian.initList();
			player.chooseTarget(get.prompt("skill_zhangji_B"), "令一名其他角色选择是否更换武将牌", lib.filter.notMe).set("ai", function (target) {
				var att = get.attitude(_status.event.player, target);
				var num = lib.skill.skill_zhangji_B.getNum(target.name);
				if (target.name2 != undefined) num = Math.min(num, lib.skill.skill_zhangji_B.getNum(target.name2));
				return att * (4 - num);
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("skill_zhangji_B", target);
				var list = [];
				for (var i = 0; i < _status.characterlist.length; i++) {
					if (lib.character[_status.characterlist[i]][1] == "wei") list.push(_status.characterlist[i]);
				}
				list = list.randomGets(5);
				var bolDialog = ["请选择替换的武将", [list, "character"]];
				target.chooseButton(bolDialog).set("ai", function (button) {
					var target = _status.event.player;
					var num = lib.skill.skill_zhangji_B.getNum(target.name);
					if (target.name2 != undefined) num = Math.min(num, lib.skill.skill_zhangji_B.getNum(target.name2));
					return lib.skill.skill_zhangji_B.getNum(button.link) - num;
				});
			} else event.finish();
			"step 2";
			if (result.bool) {
				event.character = result.links[0];
				if (target.name2 != undefined)
					target
						.chooseControl(target.name1, target.name2)
						.set("prompt", "请选择要更换的武将牌")
						.set("ai", function () {
							return lib.skill.skill_zhangji_B.getNum(target.name) < lib.skill.skill_zhangji_B.getNum(target.name2) ? target.name : target.name2;
						});
				else result.control = target.name1;
			} else {
				target.chat("拒绝");
				game.log("但", target, "拒绝更换其武将牌");
				event.finish();
			}
			"step 3";
			target.reinitCharacter(result.control, event.character);
			target.update();
		},
		subSkill: {
			jieming: {
				audio: "skill_zhangji_B",
				trigger: { player: "damageEnd" },
				filter: function (event, player) {
					return game.hasPlayer(function (current) {
						return current.countCards("h") < current.maxHp;
					});
				},
				direct: true,
				content: function () {
					"step 0";
					event.count = trigger.num;
					"step 1";
					event.count--;
					player
						.chooseTarget(get.prompt("skill_zhangji_B"), "令一名手牌数小于其体力上限的角色摸三张牌，然后其将手牌数调整至其体力上限值", function (card, player, target) {
							return target.countCards("h") < target.maxHp;
						})
						.set("ai", function (target) {
							var att = get.attitude(_status.event.player, target);
							if (target.hasSkillTag("nogain")) att /= 6;
							if (att > 2) return Math.min(5, target.maxHp) - target.countCards("h");
							return att / 3;
						});
					"step 2";
					if (result.bool) {
						var target = result.targets[0];
						event.target = target;
						player.logSkill("skill_zhangji_B_jieming", target);
						target.draw(3);
					} else event.finish();
					"step 3";
					if (target.countCards("h") > target.maxHp) target.chooseToDiscard("h", target.countCards("h") - target.maxHp, true);
					if (
						event.count > 0 &&
						game.hasPlayer(function (current) {
							return current.countCards("h") < current.maxHp;
						}) &&
						player.hasSkill("skill_zhangji_B")
					)
						event.goto(1);
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					effect: {
						target: function (card, player, target, current) {
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
		},
	},
	//费祎
	yanru: {
		audio: 2,
		enable: "phaseUse",
		filter: function (event, player) {
			if (!player.countCards("h")) return false;
			var num = player.countCards("h") % 2;
			return !player.getStorage("yanru_used").includes(num);
		},
		filterCard: function (card, player) {
			if (player.countCards("h") && player.countCards("h") % 2 == 0) return lib.filter.cardDiscardable(card, player);
			return false;
		},
		selectCard: function () {
			var player = _status.event.player;
			if (player.countCards("h") && player.countCards("h") % 2 == 0) return [player.countCards("h") / 2, Infinity];
			return -1;
		},
		prompt: function () {
			var player = _status.event.player;
			return [(player.countCards("h") ? "弃置至少一半的手牌，然后" : "") + "摸三张牌", "摸三张牌，然后弃置至少一半的手牌"][player.countCards("h") % 2];
		},
		check: function (card) {
			var player = _status.event.player;
			if (player.hasSkill("hezhong") && player.getStorage("hezhong_used").length < 2) {
				if (player.countCards("h") - ui.selected.cards.length > 1) return 1 / (get.value(card) || 0.5);
				return 0;
			}
			if (ui.selected.cards.length < player.countCards("h") / 2) return 5 - get.value(card);
			return 0;
		},
		complexCard: true,
		discard: false,
		lose: false,
		delay: 0,
		content: function () {
			"step 0";
			var bool = player.countCards("h") % 2;
			if (cards) player.discard(cards);
			player.addTempSkill("yanru_used", "phaseUseAfter");
			player.markAuto("yanru_used", [bool]);
			player.draw(3);
			if (!bool) event.finish();
			"step 1";
			player.chooseToDiscard("h", "宴如：弃置至少一半手牌", [Math.floor(player.countCards("h") / 2), Infinity], true).set("ai", card => {
				var player = _status.event.player;
				if (player.hasSkill("hezhong") && !(player.hasSkill("hezhong_0") && player.hasSkill("hezhong_1")) && player.countCards("h") - ui.selected.cards.length > 2) return 1 / (get.value(card) || 0.5);
				if (!player.hasSkill("hezhong") && ui.selected.cards.length < Math.floor(player.countCards("h") / 2)) return 1 / (get.value(card) || 0.5);
				return 0;
			});
		},
		subSkill: {
			used: { charlotte: true, onremove: true },
		},
		ai: {
			order: 3,
			result: { player: 1 },
		},
	},
	hezhong: {
		audio: 2,
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter: function (event, player) {
			if (player.countCards("h") != 1 || typeof get.number(player.getCards("h")[0], player) != "number") return false;
			if (player.getStorage("hezhong_used").length > 1) return false;
			let gain = 0,
				lose = 0;
			if (event.getg) gain = event.getg(player).length;
			if (event.getl) lose = event.getl(player).hs.length;
			return gain != lose;
		},
		prompt2: function (event, player) {
			let str = "展示最后一张手牌并摸一张牌";
			let list = player.getStorage("hezhong_used");
			if (list.length < 2) {
				str += "，然后令本回合使用点数";
				if (!list.includes("max")) str += "大于";
				if (!list.length) str += "或";
				if (!list.includes("min")) str += "小于";
				str += get.number(player.getCards("h")[0], player);
				str += "的普通锦囊牌额外结算一次";
			}
			return str;
		},
		frequent: true,
		content: function () {
			"step 0";
			player.showHandcards(get.translation(player) + "发动了【和衷】");
			event.num = get.number(player.getCards("h")[0], player);
			"step 1";
			player.draw();
			"step 2";
			if (player.getStorage("hezhong_used").includes("max")) event._result = { index: 1 };
			else if (player.getStorage("hezhong_used").includes("min")) event._result = { index: 0 };
			else {
				player
					.chooseControl()
					.set("choiceList", ["本回合使用点数大于" + num + "的普通锦囊牌额外结算一次", "本回合使用点数小于" + num + "的普通锦囊牌额外结算一次"])
					.set("ai", () => {
						var player = _status.event.player;
						var num = _status.event.player;
						if (
							player.getCards("h").reduce(function (num, card) {
								return num + (get.number(card, player) || 0);
							}, 0) >
							num * 2
						)
							return 0;
						return 1;
					})
					.set("num", num);
			}
			"step 3";
			var skill = "hezhong_" + result.index;
			player.addTempSkill(skill);
			player.addTempSkill("hezhong_used");
			player.markAuto("hezhong_used", ["max", "min"][result.index]);
			player.markAuto(skill, [num]);
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
			0: {
				charlotte: true,
				onremove: true,
				marktext: "＞",
				intro: {
					markcount: list => {
						return list.reduce((str, num) => {
							return str + get.strNumber(num);
						}, "");
					},
					content: "使用的下一张点数大于$的普通锦囊牌额外结算一次",
				},
				audio: "hezhong",
				trigger: { player: "useCard" },
				filter: function (event, player) {
					if (get.type(event.card) != "trick") return false;
					if (!event.targets.length) return false;
					var num = get.number(event.card, player);
					return typeof num == "number" && player.getStorage("hezhong_0").some(numx => num > numx);
				},
				forced: true,
				usable: 1,
				content: function () {
					player.unmarkSkill("hezhong_0");
					trigger.effectCount++;
					game.log(trigger.card, "额外结算一次");
				},
				ai: {
					effect: {
						player_use(card, player, target) {
							if (card.name == "tiesuo" && (!player.storage.counttrigger || !player.storage.counttrigger.hezhong_0)) return "zerotarget";
						},
					},
				},
			},
			1: {
				charlotte: true,
				onremove: true,
				marktext: "<",
				intro: {
					markcount: list => {
						return list.reduce((str, num) => {
							return str + get.strNumber(num);
						}, "");
					},
					content: "使用的下一张点数小于$的普通锦囊牌额外结算一次",
				},
				audio: "hezhong",
				trigger: { player: "useCard" },
				filter: function (event, player) {
					if (get.type(event.card) != "trick") return false;
					if (!event.targets.length) return false;
					var num = get.number(event.card, player);
					return typeof num == "number" && player.getStorage("hezhong_1").some(numx => num < numx);
				},
				forced: true,
				usable: 1,
				content: function () {
					player.unmarkSkill("hezhong_1");
					trigger.effectCount++;
					game.log(trigger.card, "额外结算一次");
				},
				ai: {
					effect: {
						player_use(card, player, target) {
							if (card.name == "tiesuo" && (!player.storage.counttrigger || !player.storage.counttrigger.hezhong_1)) return "zerotarget";
						},
					},
				},
			},
		},
	},
	//吕伯奢
	olfushi: {
		audio: 2,
		trigger: { global: "useCardAfter" },
		filter: function (event, player) {
			return event.player.isIn() && event.card.name == "sha" && event.cards && event.cards.filterInD().length && get.distance(player, event.player) <= 1;
		},
		forced: true,
		locked: false,
		logTarget: "player",
		content: function () {
			player.addToExpansion(trigger.cards.filterInD(), "gain2").gaintag.add("olfushi");
		},
		marktext: "豕",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		group: "olfushi_wusheng",
		subSkill: {
			wusheng: {
				enable: "chooseToUse",
				filter: function (event, player) {
					return player.getExpansions("olfushi").length && event.filterCard({ name: "sha", isCard: true }, player, event);
				},
				chooseButton: {
					dialog: function (event, player) {
						return ui.create.dialog('###缚豕###<div class="text center">将任意“缚豕”牌置入弃牌堆并摸等量的牌，视为使用一张【杀】并执行等量项</div>', player.getExpansions("olfushi"), [["额外目标", "伤害-1", "伤害+1"], "tdnodes"], "hidden");
					},
					filter: function (button) {
						const cards = ui.selected.buttons.filter(button => typeof button.link == "object");
						if (cards.length >= 3 && typeof button.link == "string") return false;
						return true;
					},
					select: [2, Infinity],
					filterOk: () => {
						if (!ui.selected.buttons.length) return false;
						const controls = ui.selected.buttons.filter(button => typeof button.link == "string");
						const cards = ui.selected.buttons.filter(button => typeof button.link == "object");
						if (cards.length >= 3) {
							const dialog = get.event().dialog;
							if (dialog && dialog.buttons) {
								dialog.buttons.forEach(button => {
									if (typeof button.link != "string") return;
									button.classList.remove("selectable");
									button.classList.remove("selected");
									ui.selected.buttons.remove(button);
								});
							}
							return true;
						}
						return cards.length == controls.length;
					},
					check: function (button) {
						const player = get.player();
						const card = new lib.element.VCard({ name: "sha", isCard: true });
						const targets = game.filterPlayer(target => {
							return player.canUse(card, target);
						});
						const num0 = targets.filter(target => get.effect(target, card, player, player) > 0).length;
						if (num0 <= 0) return 0;
						const num1 = Math.max(0, num0 - 1);
						const num2 = targets.length - num1;
						const num3 = player.getExpansions("olfushi").length;
						let list;
						if ((num1 > 0 && num2 > 0) || (num1 == 0 && num2 == 0)) {
							switch (num3) {
								case 1:
									list = [["额外目标", "伤害+1"].randomGet()];
									break;
								case 2:
									list = [["额外目标", "伤害+1"].randomGet(), "伤害-1"];
									break;
								default:
									list = ["额外目标", "伤害-1", "伤害+1"];
									break;
							}
						} else if (num2 == 0) {
							switch (num3) {
								case 1:
									list = ["伤害+1"];
									break;
								case 2:
									list = ["额外目标", "伤害+1"];
									break;
								default:
									list = ["额外目标", "伤害-1", "伤害+1"];
									break;
							}
						} else if (num1 == 0) {
							switch (num3) {
								case 1:
									list = ["伤害+1"];
									break;
								default:
									list = ["伤害-1", "伤害+1"];
									break;
							}
						}
						if (typeof button.link == "string") {
							if (list.includes(button.link)) return 114514;
							return -1;
						} else {
							const cards = ui.selected.buttons.filter(button => typeof button.link == "object");
							if ((list.length == 3 && (player.getHp() <= 2 || cards.length < num3 - 1)) || cards.length < list.length) return 1 / (get.value(button.link) || 0.5);
							return -1;
						}
					},
					backup: function (links, player) {
						var cards = links.filter(button => typeof button == "object");
						var controls = links.filter(button => typeof button == "string");
						if (!controls.length) controls = ["额外目标", "伤害-1", "伤害+1"];
						return {
							audio: "olfushi",
							selectCard: -1,
							position: "x",
							cards: cards,
							controls: controls,
							filterCard: function (card) {
								return lib.skill.olfushi_wusheng_backup.cards.includes(card);
							},
							viewAs: {
								name: "sha",
								isCard: true,
							},
							precontent: function () {
								var cards = lib.skill.olfushi_wusheng_backup.cards.slice();
								var controls = lib.skill.olfushi_wusheng_backup.controls.slice();
								player.logSkill("olfushi");
								delete event.result.skill;
								event.result.card = new lib.element.VCard(lib.skill.olfushi_wusheng_backup.viewAs);
								event.result.cards = [];
								player.loseToDiscardpile(cards);
								player.draw(cards.length);
								event.result.card.storage.olfushi_buff = controls;
								player.addTempSkill("olfushi_buff");
							},
						};
					},
					prompt: function (links, player) {
						let controls = links.filter(button => typeof button == "string");
						if (!controls.length) controls = ["额外目标", "伤害-1", "伤害+1"];
						return `请选择【杀】的目标（${controls.join("、")}）`;
					},
				},
				ai: {
					order: function (item, player) {
						return get.order({ name: "sha" }) + 0.1;
					},
					result: { player: 1 },
					respondSha: true,
					skillTagFilter: function (player, tag, arg) {
						if (arg == "respond") return false;
						if (!player.getExpansions("olfushi").length) return false;
					},
				},
			},
			buff: {
				charlotte: true,
				trigger: { player: ["useCard2", "useCardToPlayered"] },
				filter: function (event, player, name) {
					if (!event.card.storage || !event.card.storage.olfushi_buff) return false;
					if (name == "useCard2") return true;
					return event.getParent().triggeredTargets3.length == event.targets.length && event.card.storage.olfushi_buff.length > 1 && event.card.storage.olfushi_buff.includes("伤害-1") && !event.targets.some(target => !event.targets.includes(target.getPrevious()) && !event.targets.includes(target.getNext()));
				},
				forced: true,
				popup: false,
				content: function () {
					"step 0";
					if (event.triggername == "useCardToPlayered") {
						if (trigger.getParent().addCount !== false) {
							trigger.getParent().addCount = false;
							if (player.stat[player.stat.length - 1].card.sha > 0) {
								player.stat[player.stat.length - 1].card.sha--;
							}
						}
						game.log(trigger.card, "不计入次数");
						event.finish();
						return;
					}
					var list = trigger.card.storage.olfushi_buff;
					event.list = list;
					var canBeAddedTargets = game.filterPlayer(target => {
						return !trigger.targets.includes(target) && player.canUse(trigger.card, target);
					});
					if (!list.includes("额外目标") || !canBeAddedTargets.length) event._result = { bool: false };
					else if (canBeAddedTargets.length == 1) event._result = { bool: true, targets: canBeAddedTargets };
					else
						player
							.chooseTarget(
								"请选择" + get.translation(trigger.card) + "的额外目标",
								function (card, player, target) {
									var trigger = _status.event.getTrigger();
									return !trigger.targets.includes(target) && player.canUse(trigger.card, target);
								},
								true
							)
							.set("ai", function (target) {
								var player = _status.event.player;
								return get.attitude(player, target);
							});
					"step 1";
					if (result.bool) {
						var targets = result.targets.sortBySeat();
						player.line(targets);
						trigger.targets.addArray(targets);
						game.log(targets, "成为了", trigger.card, "的额外目标");
					}
					"step 2";
					if (!event.list.includes("伤害-1")) event._result = { bool: false };
					else if (trigger.targets.length == 1) event._result = { bool: true, targets: trigger.targets.slice() };
					else
						player
							.chooseTarget(
								"请选择" + get.translation(trigger.card) + "伤害-1的目标",
								function (card, player, target) {
									var trigger = _status.event.getTrigger();
									return trigger.targets.includes(target);
								},
								true
							)
							.set("animate", false)
							.set("ai", function (target) {
								var player = _status.event.player;
								return get.attitude(player, target);
							});
					"step 3";
					if (result.bool) {
						var target = result.targets[0];
						//player.line(target);
						//game.log(trigger.card, "对", target, "的伤害-1");
						player.addTempSkill("olfushi_buff2");
						player.initStorage("olfushi_buff2", []);
						player.getStorage("olfushi_buff2").push([target, trigger.card]);
					}
					"step 4";
					if (!event.list.includes("伤害+1")) event.finish();
					else if (trigger.targets.length == 1) event._result = { bool: true, targets: trigger.targets.slice() };
					else
						player
							.chooseTarget(
								"请选择" + get.translation(trigger.card) + "伤害+1的目标",
								function (card, player, target) {
									var trigger = _status.event.getTrigger();
									return trigger.targets.includes(target);
								},
								true
							)
							.set("animate", false)
							.set("ai", function (target) {
								var player = _status.event.player;
								return get.damageEffect(target, player, player);
							});
					"step 5";
					if (result.bool) {
						var target = result.targets[0];
						//player.line(target);
						//game.log(trigger.card, "对", target, "的伤害+1");
						player.addTempSkill("olfushi_buff3");
						player.initStorage("olfushi_buff3", []);
						player.getStorage("olfushi_buff3").push([target, trigger.card]);
					}
				},
			},
			buff2: {
				charlotte: true,
				onremove: true,
				trigger: { source: "damageBegin2" },
				filter: function (event, player) {
					return event.card && player.getStorage("olfushi_buff2").some(info => info[0] == event.player && info[1] == event.card);
				},
				forced: true,
				popup: false,
				content: function () {
					trigger.num--;
				},
				ai: {
					effect: {
						target: function (card, player, target) {
							if (player.hasSkillTag("jueqing", false, target)) return;
							if (!card || !player.getStorage("olfushi_buff2").includes(card)) return;
							var num = get.tag(card, "damage");
							if (num) {
								if (num > 1) return 0.5;
								return 0;
							}
						},
					},
				},
			},
			buff3: {
				charlotte: true,
				onremove: true,
				trigger: { source: "damageBegin1" },
				filter: function (event, player) {
					return event.card && player.getStorage("olfushi_buff3").some(info => info[0] == event.player && info[1] == event.card);
				},
				forced: true,
				popup: false,
				content: function () {
					trigger.num++;
				},
			},
			wusheng_backup: {},
		},
	},
	oldongdao: {
		mode: ["doudizhu"],
		zhuanhuanji: true,
		mark: true,
		marktext: "☯",
		intro: {
			content: function (storage) {
				if (storage) return "农民的回合结束时，其可以进行一个额外回合";
				return "农民的回合结束时，你可以令地主进行一个额外回合";
			},
		},
		audio: 2,
		trigger: { global: "phaseEnd" },
		filter: function (event, player) {
			return event.player.identity == "fan";
		},
		direct: true,
		content: function () {
			"step 0";
			var target = player.storage.oldongdao ? trigger.player : game.zhu;
			event.target = target;
			var target2 = player.storage.oldongdao ? trigger.player : player;
			event.target2 = target2;
			target2.chooseBool(get.prompt("oldongdao"), "令" + get.translation(target) + "进行一个额外回合").set("ai", () => {
				var event = _status.event.getParent();
				return get.attitude(event.target2, event.target) > 0;
			});
			"step 1";
			if (result.bool) {
				player.logSkill("oldongdao");
				event.target2.line(target);
				player.changeZhuanhuanji("oldongdao");
				target.insertPhase();
			}
		},
	},
	//OL陆郁生
	olcangxin: {
		audio: 2,
		trigger: { player: "damageBegin4" },
		filter(event, player) {
			return (
				game
					.getGlobalHistory(
						"everything",
						evt => {
							return evt.name == "damage" && evt.player == player;
						},
						event
					)
					.indexOf(event) == 0
			);
		},
		checkx: function (event, player) {
			var target = event.source;
			return get.damageEffect(player, target, player) <= 0;
		},
		forced: true,
		content: function () {
			"step 0";
			var cards = get.bottomCards(3, true);
			player
				.chooseButton(["###藏心：请选择要弃置的牌###若以此法弃置了红桃牌，则减少弃置红桃牌数的伤害", cards], [1, cards.length], true)
				.set("ai", function (button) {
					if (!_status.event.bool && get.suit(button.link, false) == "heart") return 0;
					if (get.suit(button.link, false) != "heart") return 1;
					const num = get.event().getTrigger().num;
					if (num > ui.selected.buttons.filter(but => get.suit(but.link, false) == "heart").length) return 1;
					return 0;
				})
				.set("bool", lib.skill.olcangxin.checkx(trigger, player));
			"step 1";
			if (result.bool) {
				player.$throw(result.links, 1000);
				game.cardsDiscard(result.links);
				const num = result.links.filter(card => get.suit(card, false) == "heart").length;
				if (num) trigger.num -= Math.min(trigger.num, num);
			} else event.finish();
			"step 2";
			game.delayx();
		},
		group: "olcangxin_yingzi",
		subSkill: {
			yingzi: {
				audio: "olcangxin",
				trigger: { player: "phaseDrawBegin" },
				forced: true,
				content: function () {
					var cards = get.bottomCards(3, true);
					player.showCards(cards, get.translation(player) + "发动了【藏心】");
					var num = cards.filter(card => get.suit(card, false) == "heart").length;
					if (num) player.draw(num);
				},
			},
		},
	},
	olrunwei: {
		audio: 2,
		trigger: { global: "phaseDiscardBegin" },
		filter: function (event, player) {
			return event.player.isDamaged();
		},
		async cost(event, trigger, player) {
			let str = get.translation(trigger.player);
			const result = await player
				.chooseControl("弃牌，+1", "摸牌，-1", "cancel2")
				.set("choiceList", ["令" + str + "弃置一张牌，且其本回合手牌上限+1", "令" + str + "摸一张牌，且其本回合手牌上限-1"])
				.set("ai", function () {
					let player = _status.event.player,
						target = _status.event.getTrigger().player,
						att = get.sgn(get.attitude(player, target));
					if (!att) return 2;
					let dis = target.needsToDiscard(0, null, true),
						res = [
							-att *
								(1 +
									Math.max(
										0,
										dis -
											(target.hasCard(i => {
												return get.value(i, target) <= 6;
											}, "e")
												? 1
												: 2)
									)),
							att * (1 - Math.max(0, dis + 2)),
							-att * dis,
						];
					return res.indexOf(Math.max(...res));
				})
				.set("prompt", get.prompt("olrunwei", trigger.player))
				.forResult();
			event.result = {
				bool: result.control !== "cancel2",
				cost_data: result.index,
			};
		},
		logTarget: "player",
		async content(event, trigger, player) {
			if (event.cost_data === 0) {
				await trigger.player
					.chooseToDiscard("he", true)
					.set("ai", card => {
						if (get.position(card) == "e") return get.event().e - get.value(card);
						return 1 / (get.value(card) || 0.5);
					})
					.set(
						"e",
						(function () {
							if (
								!trigger.player.hasCard(i => {
									return get.value(i, trigger.player) <= 6;
								}, "e")
							)
								return 0;
							if (!trigger.player.needsToDiscard(-2)) return 0;
							return 6.2;
						})()
					);
				trigger.player.addTempSkill("olrunwei_+");
				trigger.player.addMark("olrunwei_+", 1, false);
			}
			if (event.cost_data === 1) {
				await trigger.player.draw();
				trigger.player.addTempSkill("olrunwei_-");
				trigger.player.addMark("olrunwei_-", 1, false);
			}
		},
		subSkill: {
			"+": {
				charlotte: true,
				onremove: true,
				marktext: "+",
				intro: { content: "手牌上限+#" },
				mod: {
					maxHandcard: function (player, num) {
						return num + player.countMark("olrunwei_+");
					},
				},
			},
			"-": {
				charlotte: true,
				onremove: true,
				marktext: "-",
				intro: { content: "手牌上限-#" },
				mod: {
					maxHandcard: function (player, num) {
						return num - player.countMark("olrunwei_-");
					},
				},
			},
		},
	},
	//曹羲
	olgangshu: {
		audio: 2,
		trigger: {
			player: "useCardAfter",
		},
		filter: function (event, player) {
			return get.type2(event.card, false) != "basic";
		},
		getInfo: player => {
			if (!player.storage.olgangshu_buff) player.storage.olgangshu_buff = [0, 0, 0];
			return player.storage.olgangshu_buff;
		},
		init(player) {
			let info = lib.skill.olgangshu.getInfo(player);
			player.addTip("olgangshu_buff", "刚述 " + info.slice().join(" "));
		},
		direct: true,
		group: "olgangshu_reset",
		content: function () {
			"step 0";
			var info = lib.skill.olgangshu.getInfo(player);
			player
				.chooseControl("攻击范围(" + info[0] + ")", "摸牌数(" + info[1] + ")", "使用杀的上限(" + info[2] + ")", "cancel2")
				.set("prompt", get.prompt("olgangshu"))
				.set("prompt2", '<div class="text center">令以下一个数值+1（每项至多+5）：<br>1.攻击范围；<br>2.下个摸牌阶段的摸牌数；<br>3.使用【杀】的次数上限。</div>')
				.set("ai", () => {
					return _status.event.choice;
				})
				.set(
					"choice",
					(function () {
						var info = lib.skill.olgangshu.getInfo(player);
						if (info[1] == 0) return 1;
						if (
							info[2] < 5 &&
							player.hasCard(card => {
								return get.name(card) == "sha" && player.hasValueTarget(card);
							}, "hs") &&
							!player.getCardUsable("sha")
						)
							return 2;
						if (
							info[0] < 5 &&
							!game.hasPlayer(current => {
								return player.inRange(current) && get.effect(current, { name: "sha" }, player, player) > 0;
							})
						)
							return 0;
						var rand = Math.random();
						var list = [0, 1, 2].filter(i => info[i] < 5);
						if (!list.length) return "cancel2";
						if (rand < 0.2 && list.includes(0)) return 0;
						if (rand < 0.7 && list.includes(1)) return 1;
						if (rand < 1.0 && list.includes(2)) return 2;
						return list.randomGet();
					})()
				);
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("olgangshu");
				player.addSkill("olgangshu_buff");
				var info = lib.skill.olgangshu.getInfo(player);
				info[result.index] = Math.min(5, info[result.index] + 1);
				game.log(player, "的", result.control.slice(0, result.control.indexOf("(")), "#y+1");
				player.markSkill("olgangshu_buff");
			}
		},
		ai: {
			threaten: 3,
		},
		subSkill: {
			buff: {
				trigger: { player: "phaseDrawBegin2" },
				charlotte: true,
				onremove: true,
				forced: true,
				filter: function (event, player) {
					var info = lib.skill.olgangshu.getInfo(player);
					if (!info[1]) return false;
					return !event.numFixed;
				},
				content: function () {
					var info = lib.skill.olgangshu.getInfo(player);
					trigger.num += info[1];
					info[1] = 0;
					player.markSkill("olgangshu_buff");
				},
				mod: {
					attackRange: function (player, range) {
						var info = lib.skill.olgangshu.getInfo(player);
						if (info) return range + info[0];
					},
					cardUsable: function (card, player, num) {
						if (card.name != "sha") return;
						var info = lib.skill.olgangshu.getInfo(player);
						if (info) return num + info[2];
					},
				},
				mark: true,
				intro: {
					markcount: function (storage, player) {
						var info = lib.skill.olgangshu.getInfo(player);
						var str = "";
						info.forEach(num => (str += parseFloat(num)));
						return str;
					},
					content: function (storage, player) {
						var info = lib.skill.olgangshu.getInfo(player);
						var str = "";
						if (info[0] > 0) str += "<li>攻击范围+" + info[0];
						if (info[1] > 0) str += "<li>下个摸牌阶段摸牌数+" + info[1];
						if (info[2] > 0) str += "<li>使用【杀】的次数上限+" + info[2];
						return str;
					},
				},
			},
			reset: {
				audio: "olgangshu",
				trigger: {
					global: ["shaMiss", "eventNeutralized"],
				},
				filter: function (event, player) {
					if (event.type != "card") return false;
					var responder;
					if (event.name == "sha") {
						responder = event.target;
					} else {
						responder = event._neutralize_event.player;
					}
					return player == responder;
				},
				forced: true,
				locked: false,
				content: function () {
					player.removeSkill("olgangshu_buff");
					game.log(player, "重置了", "#g【刚述】", "的数值");
				},
			},
		},
	},
	oljianxuan: {
		audio: 2,
		trigger: {
			player: "damageEnd",
		},
		direct: true,
		content: function () {
			"step 0";
			var info = lib.skill.olgangshu.getInfo(player);
			var list = [];
			list.add(player.getAttackRange());
			list.add(2 + info[1]);
			list.add(player.getCardUsable("sha", true));
			list.sort();
			var str = list.join("、").replace(/(.*)、/, "$1或");
			event.list = list;
			player
				.chooseTarget(get.prompt("oljianxuan"), "令一名角色摸一张牌，然后若其手牌数为" + str + "，其重复此流程")
				.set("ai", target => {
					var list = _status.event.list;
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (att <= 0) return 0;
					var num = target.countCards("h") + 1;
					var value = 1;
					while (true) {
						if (list.includes(num)) {
							value++;
							num++;
						} else break;
					}
					return value + att / 10;
				})
				.set("list", list);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("oljianxuan", target);
				if (player != target) player.addExpose(0.15);
			} else event.finish();
			"step 2";
			target.draw();
			"step 3";
			if (event.list.includes(target.countCards("h"))) event.goto(2);
		},
		ai: {
			combo: "olgangshu",
			maixie: true,
		},
	},
	//OL彭羕
	olxiaofan: {
		audio: 2,
		enable: "chooseToUse",
		onChooseToUse(event) {
			const sum = ui.cardPile.childNodes.length;
			if (game.online || !sum || !event.player.hasSkill("olxiaofan") || event.player.isTempBanned("olxiaofan")) return;
			const cards = [],
				num = lib.skill.olxiaofan.getNum(event.player) + 1;
			for (let i = 0; i < num; i++) {
				const card = ui.cardPile.childNodes[sum - 1 - i];
				if (card) cards.push(card);
				else break;
			}
			event.set("olxiaofan_cards", cards);
		},
		hiddenCard(player, name) {
			if (player.isTempBanned("olxiaofan")) return false;
			return lib.inpile.includes(name);
		},
		getNum(player) {
			return player.getHistory("useCard").reduce((list, evt) => list.add(get.type2(evt.card)), []).length;
		},
		filter(event, player) {
			if (!Array.isArray(event.olxiaofan_cards) || event.responded || event.olxiaofan) return false;
			return lib.inpile.some(i => event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event));
		},
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog("嚣翻", event.olxiaofan_cards, "hidden");
			},
			filter(button, player) {
				const evt = _status.event.getParent();
				return evt.filterCard(button.link, player, evt);
			},
			check(button) {
				const card = button.link,
					player = get.player();
				if (get.type(card) == "equip") return 0;
				return player.getUseValue(card);
			},
			backup(links, player) {
				return {
					audio: "olxiaofan",
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					viewAs: links[0],
					card: links[0],
					async precontent(event, trigger, player) {
						const card = lib.skill.olxiaofan_backup.card;
						event.result.cards = [card];
						event.result.card = get.autoViewAs(card, [card]);
						event.result.card.olxiaofan = true;
						player
							.when("useCardAfter")
							.filter(evt => evt.card.olxiaofan)
							.then(() => {
								let num = lib.skill.olxiaofan.getNum(player),
									pos = "jeh".slice(0, num);
								if (num > 0 && player.countCards(pos) > 0) {
									event.maxNum = Math.min(3, num);
									event.num = 0;
								} else event.finish();
							})
							.then(() => {
								let pos = "jeh"[event.num],
									hs = player.countCards(pos);
								if (hs > 0) player.chooseToDiscard(hs, pos, true);
								event.num++;
								if (event.num < event.maxNum) event.redo();
							});
					},
				};
			},
			prompt(links, player) {
				return "嚣翻：是否使用" + get.translation(links[0]) + "？";
			},
		},
		ai: {
			effect: {
				target: function (card, player, target, effect) {
					if (get.tag(card, "respondShan")) return 0.7;
					if (get.tag(card, "respondSha")) return 0.7;
				},
			},
			order: 12,
			respondShan: true,
			respondSha: true,
			result: {
				player: function (player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
		subSkill: {
			backup: {},
		},
	},
	oltuishi: {
		audio: 2,
		mod: {
			wuxieJudgeEnabled: () => false,
			wuxieEnabled: () => false,
			cardEnabled: card => {
				if (card.name == "wuxie") return false;
			},
			targetInRange: card => {
				if (card.storage && card.storage.oltuishi) return true;
			},
			aiValue: (player, card, val) => {
				if (card.name == "wuxie") return 0;
				var num = get.number(card);
				if ([1, 11, 12, 13].includes(num)) return val * 1.1;
			},
			aiUseful: (player, card, val) => {
				if (card.name == "wuxie") return 0;
				var num = get.number(card);
				if ([1, 11, 12, 13].includes(num)) return val * 1.1;
			},
			aiOrder: (player, card, order) => {
				if (get.name(card) == "sha" && player.hasSkill("oltuishi_unlimit")) order += 9;
				var num = get.number(card);
				if ([1, 11, 12, 13].includes(num)) order += 3;
				return order;
			},
		},
		trigger: { player: ["useCard", "useCardAfter"] },
		filter: function (event, player, name) {
			if (name == "useCardAfter") {
				if (player.isTempBanned("olxiaofan")) return false;
				return (
					player
						.getHistory("useCard", evt => {
							return (
								!player.getHistory("sourceDamage", evt2 => {
									return evt2.card && evt2.card == evt.card;
								}).length && get.tag(evt.card, "damage") > 0.5
							);
						})
						.indexOf(event) >= 2
				);
			}
			return [1, 11, 12, 13].includes(get.number(event.card));
		},
		forced: true,
		content: function () {
			"step 0";
			if (event.triggername == "useCardAfter") {
				player.tempBanSkill("olxiaofan");
				event.finish();
				return;
			}
			trigger.targets.length = 0;
			trigger.all_excluded = true;
			game.log(trigger.card, "被无效了");
			"step 1";
			player.draw();
			player.addSkill("oltuishi_unlimit");
		},
		subSkill: {
			unlimit: {
				charlotte: true,
				mod: {
					cardUsableTarget: (card, player, target) => {
						if (target.countCards("h") < player.countCards("h")) return true;
					},
					targetInRange: (card, player, target) => {
						if (target.countCards("h") < player.countCards("h")) return true;
					},
				},
				trigger: { player: "useCard1" },
				filter: function (event, player) {
					if (!event.targets || !event.targets.length) return false;
					let num = 0;
					if (event.cards && event.cards.length) {
						const history = player.getHistory("lose", evt => {
							if (evt.getParent() != event) return false;
							return event.cards.some(card => evt.hs.includes(card));
						});
						if (history.length) num += event.cards.filter(card => history[0].hs.includes(card)).length;
					}
					return event.targets.some(target => player.countCards("h") + num > target.countCards("h") + (target == player ? num : 0));
				},
				forced: true,
				popup: false,
				silent: true,
				firstDo: true,
				content: function () {
					player.removeSkill("oltuishi_unlimit");
					var card = trigger.card;
					if (!card.storage) card.storage = {};
					card.storage.oltuishi = true;
					if (trigger.addCount !== false) {
						trigger.addCount = false;
						player.getStat("card")[card.name]--;
					}
				},
				mark: true,
				intro: { content: "对手牌数小于你的角色使用的下一张牌无距离次数限制" },
			},
		},
	},
	//OL牵招
	olweifu: {
		audio: 2,
		enable: "phaseUse",
		filterCard: lib.filter.cardDiscardable,
		position: "he",
		filter: function (event, player) {
			return player.hasCard(card => lib.filter.cardDiscardable(card, player), "he");
		},
		check: function (card) {
			var player = get.player();
			return (5 - get.value(card)) / Math.pow(Math.max(0.1, player.getUseValue(card)), 0.33);
		},
		content: function () {
			"step 0";
			player
				.judge(card => {
					var evt = get.event().getParent("olweifu");
					if (evt.name !== "olweifu") return 0;
					var cardx = evt.cards[0];
					if (get.type2(card) == get.type2(cardx)) return 0.5;
					return 0.1;
				})
				.set("callback", function () {
					var card = event.judgeResult.card;
					player.addTempSkill("olweifu_clear");
					player.addTempSkill("olweifu_add");
					if (!get.is.object(player.storage.olweifu_add)) player.storage.olweifu_add = {};
					var type = get.type2(card, player);
					if (typeof player.storage.olweifu_add[type] != "number") player.storage.olweifu_add[type] = 0;
					player.storage.olweifu_add[type]++;
					player.markSkill("olweifu_add");
					if (type == get.type2(event.getParent(2).cards[0], player)) player.draw();
				})
				.set("judge2", result => result.bool);
		},
		ai: {
			order: 7,
			result: {
				player: function (player) {
					return player.hasCard(card => {
						var type = get.type2(card);
						if (type == "equip") return false;
						return (
							player.hasUseTarget(card) &&
							player.getUseValue(card) > 5 &&
							game.countPlayer(current => {
								return lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0;
							}) +
								1 >
								(get.is.object(player.storage.olweifu_add) ? player.storage.olweifu_add[type] || 0 : 0)
						);
					}, "hs")
						? 1
						: 0;
				},
			},
		},
		subSkill: {
			clear: {
				trigger: { player: "useCard1" },
				filter: function (event, player) {
					var type = get.type2(event.card);
					if (get.is.object(player.storage.olweifu_add) && typeof player.storage.olweifu_add[type] == "number") return true;
					return false;
				},
				silent: true,
				firstDo: true,
				charlotte: true,
				content: function () {
					var type = get.type2(trigger.card);
					var num = player.storage.olweifu_add[type];
					delete player.storage.olweifu_add[type];
					if (get.is.empty(player.storage.olweifu_add)) {
						delete player.storage.olweifu_add;
						player.unmarkSkill("olweifu_add");
					}
					trigger._olweifu_clear = num;
				},
			},
			add: {
				trigger: { player: "useCard2" },
				filter: function (event, player) {
					if (!event._olweifu_clear) return false;
					var info = get.info(event.card);
					if (info.allowMultiple == false) return false;
					if (event.targets && !info.multitarget) {
						if (
							game.hasPlayer(current => {
								return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, player, current);
							})
						)
							return true;
					}
					return false;
				},
				onremove: true,
				charlotte: true,
				direct: true,
				content: function () {
					"step 0";
					var num = trigger._olweifu_clear;
					player
						.chooseTarget(get.prompt("olweifu"), "为" + get.translation(trigger.card) + "额外指定" + get.cnNumber(num) + "个目标。", [1, num], (card, player, target) => {
							return !_status.event.sourcex.includes(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
						})
						.set("sourcex", trigger.targets)
						.set("ai", function (target) {
							var player = _status.event.player;
							return get.effect(target, _status.event.card, player, player);
						})
						.set("card", trigger.card);
					"step 1";
					if (result.bool) {
						var targets = result.targets;
						player.logSkill("olweifu_add", targets);
						trigger.targets.addArray(targets);
						game.log(targets, "也成为了", trigger.card, "的目标");
						if (!event.isMine() && !event.isOnline()) game.delayex();
					}
				},
				intro: {
					markcount: () => 0,
					content: (storage, player) => {
						if (!get.is.object(storage)) return;
						var str = "使用下一张以下类型的牌无距离限制，且可以额外指定对应数量个目标：";
						for (var type in storage) {
							str += "<li>" + get.translation(type) + "牌：+" + storage[type];
						}
						return str;
					},
				},
				mod: {
					targetInRange: (card, player) => {
						var type = get.type2(card);
						if (get.is.object(player.storage.olweifu_add) && typeof player.storage.olweifu_add[type] == "number") return true;
					},
				},
			},
		},
	},
	olkuansai: {
		audio: 2,
		trigger: {
			global: "useCardToPlayered",
		},
		filter: function (event, player) {
			return event.isFirstTarget && event.targets.length >= player.getHp();
		},
		direct: true,
		usable: 1,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("olkuansai"), "令其中一个目标选择一项：1.交给你一张牌；2.令你回复1点体力。", (card, player, target) => {
					return _status.event.targets.includes(target);
				})
				.set("targets", trigger.targets)
				.set("ai", target => {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (att > 0) return 1;
					return (1 - att) / Math.sqrt(1 + target.countCards("he"));
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("olkuansai", target);
				var position = "e";
				if (player != target) position += "h";
				var forced = player.isHealthy();
				var str = "请交给其一张牌" + (forced ? "" : "或点击“取消”令其回复1点体力") + "。";
				if (!target.countCards(position)) event._result = { bool: false };
				else
					target
						.chooseCard(get.translation(player) + "对你发动了【款塞】", str, position, forced)
						.set("ai", card => {
							if (_status.event.recover) return 0;
							var target = _status.event.player,
								player = _status.event.getParent().player;
							if (get.attitude(target, player) > 0) {
								return get.value(card, target) - get.value(card, player);
							}
							if (get.tag(card, "recover")) return -1;
							return 6.5 - get.value(card);
						})
						.set(
							"recover",
							(function () {
								if (forced) return false;
								var recoverEff = get.recoverEffect(player, target, target);
								var att = get.attitude(target, player);
								if (att < 0) {
									if (recoverEff >= 0) return true;
									if (
										target.hasCard(card => {
											return (get.value(card) < 6.5 && !get.tag(card, "recover")) || get.value(card) <= 0.05;
										}, position)
									)
										return false;
								} else {
									if (recoverEff > 0) return true;
									if (
										target.hasCard(card => {
											return get.value(card, target) < get.value(card, player);
										}, position)
									)
										return false;
								}
								return true;
							})()
						);
			} else {
				player.storage.counttrigger.olkuansai--;
				event.finish();
			}
			"step 2";
			if (result.bool) {
				target.give(result.cards, player);
			} else player.recover(target);
		},
	},
	//牛金
	olcuorui: {
		audio: "cuorui",
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
			target: "useCardToTargeted",
		},
		filter: function (event, player) {
			if (event.name == "useCardToTargeted") return get.type(event.card) == "delay" && !player.hasSkill("olcuorui_skip");
			return (event.name != "phase" || game.phaseNumber == 0) && player.countCards("h") < Math.min(8, game.countPlayer());
		},
		forced: true,
		content: function () {
			if (trigger.name == "useCardToTargeted") {
				player.skip("phaseJudge");
				player.addTempSkill("olcuorui_skip", { player: "phaseJudgeSkipped" });
			} else player.drawTo(Math.min(8, game.countPlayer()));
		},
		ai: {
			effect: {
				target_use: function (card, player, target) {
					if (get.type(card) == "delay") return 0.1;
				},
			},
		},
		subSkill: {
			skip: {
				mark: true,
				intro: { content: "跳过下个判定阶段" },
			},
		},
	},
	//何进
	olmouzhu: {
		audio: "mouzhu",
		inherit: "mouzhu",
		content: function () {
			"step 0";
			target.chooseCard("h", "交给" + get.translation(player) + "一张手牌", true);
			"step 1";
			if (result.bool) target.give(result.cards, player);
			"step 2";
			if (player.countCards("h") <= target.countCards("h")) {
				event.finish();
				return;
			}
			var list = [];
			if (target.hasUseTarget({ name: "sha" })) list.push("sha");
			if (target.hasUseTarget({ name: "sha" })) list.push("juedou");
			if (!list.length) event.finish();
			else if (list.length == 1) event._result = { control: list[0] };
			else
				target
					.chooseControl(list)
					.set("prompt", "谋诛：视为使用一张【杀】或【决斗】")
					.set("ai", function () {
						var player = _status.event.player;
						return player.getUseValue({ name: "sha" }) > player.getUseValue({ name: "juedou" }) ? "sha" : "juedou";
					});
			"step 3";
			if (result.control) target.chooseUseTarget({ name: result.control }, true);
		},
		ai: {
			order: 7,
			result: {
				target: function (player, target) {
					if (
						get.attitude(target, player) > 0 &&
						game.hasPlayer(function (current) {
							if (current == target) return false;
							for (var card of [{ name: "sha" }, { name: "juedou" }]) {
								if (target.canUse(card, current) && get.effect(current, card, target, player) > 0 && get.effect(current, card, target, target) > 0) return true;
							}
							return false;
						}) &&
						target.countCards("h") < player.countCards("h") + 2
					)
						return 3;
					if (!target.hasValueTarget({ name: "sha" }) && !target.hasValueTarget({ name: "juedou" })) return -2;
					if (target.countCards("h") + 1 > player.countCards("h")) return -2;
					var canSave = function (player, target) {
						return target.hp + player.countCards("hs", card => player.canSaveCard(card, target)) > 1 + ((get.mode() == "identity" && target.identity == "zhu") || (get.mode() == "guozhan" && get.is.jun(target)));
					};
					if (target.hasValueTarget({ name: "sha" })) {
						var aimx = game
							.filterPlayer(current => {
								return target.canUse({ name: "sha" }, current) && get.effect(current, { name: "sha" }, target, target) > 0;
							})
							.sort((a, b) => get.effect(b, { name: "sha" }, target, target) - get.effect(a, { name: "sha" }, target, target))[0];
						if (aimx && get.effect(aimx, { name: "sha" }, target, player) < 0 && get.effect(aimx, { name: "sha" }, target, aimx) < 0 && !canSave(player, aimx)) return 0;
					}
					if (target.hasValueTarget({ name: "juedou" })) {
						var aimy = game
							.filterPlayer(current => {
								return target.canUse({ name: "juedou" }, current) && get.effect(current, { name: "juedou" }, target, target) > 0;
							})
							.sort((a, b) => get.effect(b, { name: "juedou" }, target, target) - get.effect(a, { name: "juedou" }, target, target))[0];
						if (aimy && get.effect(aimy, { name: "juedou" }, target, player) < 0 && get.effect(aimy, { name: "sha" }, target, aimy) < 0 && !canSave(player, aimy)) return 0;
					}
					return -1;
				},
			},
		},
	},
	olyanhuo: {
		audio: "yanhuo",
		trigger: { player: "die" },
		forceDie: true,
		filter: function (event, player) {
			if (!event.source || !event.source.isIn() || !event.source.countCards("he")) return false;
			return player.countCards("he") > 0;
		},
		check: function (event, player) {
			return get.effect(event.source, { name: "guohe_copy2" }, player, player) > 0;
		},
		logTarget: "source",
		skillAnimation: true,
		animationColor: "thunder",
		content: function () {
			player.discardPlayerCard(trigger.source, "he", [1, player.countCards("he")], true).set("forceDie", true);
		},
	},
	//韩遂
	olniluan: {
		audio: "niluan",
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return (
				event.player.getHp() > player.getHp() &&
				event.player.getHistory("useCard", function (card) {
					return card.card.name == "sha";
				}).length &&
				player.countCards("hes", card => get.color(card, player) == "black" && player.canUse(get.autoViewAs({ name: "sha" }, [card]), event.player, false))
			);
		},
		direct: true,
		content: function () {
			var next = player.chooseToUse();
			next.set("openskilldialog", "逆乱：是否将一张黑色牌当作【杀】对" + get.translation(trigger.player) + "使用？");
			next.set("norestore", true);
			next.set("_backupevent", "niluanx");
			next.set("custom", {
				add: {},
				replace: { window: function () {} },
			});
			next.backup("niluanx");
			next.set("targetRequired", true);
			next.set("complexSelect", true);
			next.set("filterTarget", function (card, player, target) {
				if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
				return lib.filter.targetEnabled.apply(this, arguments);
			});
			next.set("sourcex", trigger.player);
			next.set("addCount", false);
			next.logSkill = "olniluan";
		},
	},
	olxiaoxi: {
		audio: "xiaoxi",
		audioname: ["machao", "hansui", "pangde"],
		trigger: { global: "roundStart" },
		filter: function (event, player) {
			return player.hasUseTarget({ name: "sha" }, false);
		},
		direct: true,
		content: function () {
			player.chooseUseTarget({ name: "sha" }, get.prompt("olxiaoxi"), "视为使用一张无距离限制的【杀】", false, "nodistance").logSkill = "olxiaoxi";
		},
	},
	//段颎
	olsaogu: {
		audio: 2,
		zhuanhuanji: true,
		mark: true,
		marktext: "☯",
		intro: {
			content: function (storage) {
				if (storage) return "转换技。①出牌阶段，你可以摸一张牌。②结束阶段，你可以弃置一张牌，令一名其他角色摸一张牌。";
				return "转换技。①出牌阶段，你可以弃置两张牌（不能包含你本阶段弃置过的花色），然后使用其中的【杀】。②结束阶段，你可以弃置一张牌，令一名其他角色弃置两张牌，然后其使用弃置的【杀】。";
			},
		},
		onChooseToUse: function (event) {
			if (!game.online && !event.olsaogu) {
				var list = [],
					player = event.player;
				var evtx = event.getParent("phaseUse");
				player.getHistory("lose", evt => {
					if (evt.type == "discard" && evt.getParent("phaseUse") == evtx) list.addArray(evt.cards2);
				});
				event.set("olsaogu", list);
			}
		},
		enable: "phaseUse",
		filter: function (event, player) {
			var storage = player.storage.olsaogu;
			if (storage) return true;
			return (
				player.getDiscardableCards(player, "he").filter(card => {
					if (event.olsaogu && event.olsaogu.some(cardx => get.suit(cardx, false) == get.suit(card, player))) return false;
					return true;
				}).length > 1
			);
		},
		filterCard: function (card, player) {
			if (player.storage.olsaogu) return false;
			if (_status.event.olsaogu && _status.event.olsaogu.some(cardx => get.suit(cardx, false) == get.suit(card, player))) return false;
			return true;
		},
		selectCard: function () {
			var player = _status.event.player;
			return player.storage.olsaogu ? -1 : 2;
		},
		position: "he",
		check: function (card) {
			var player = _status.event.player;
			if (card.name == "sha") return player.hasValueTarget(card) ? 10 : 0.001;
			return 6 - get.value(card);
		},
		prompt: function () {
			var player = _status.event.player;
			var storage = player.storage.olsaogu;
			if (storage) return "摸一张牌";
			var list = _status.event.olsaogu,
				str = "";
			if (list && list.length) {
				var text = "",
					suits = list
						.reduce(function (list, card) {
							return list.add(get.suit(card, false)), list;
						}, [])
						.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
				for (var i = 0; i < suits.length; i++) text += get.translation(suits[i]);
				str += "（不能弃置" + text + "花色的牌）";
			}
			return "弃置两张牌" + str + "，然后使用其中的【杀】";
		},
		content: function () {
			player.changeZhuanhuanji("olsaogu");
			if (!cards.length) player.draw();
			else {
				var cardx = cards.filter(card => card.name == "sha");
				if (cardx.length) {
					var next = game.createEvent("olsaogu_chooseToUseSha");
					next.player = player;
					next.cards = cardx;
					next.setContent(lib.skill.olsaogu.chooseToUseSha);
				}
			}
		},
		ai: {
			order: function (item, player) {
				return get.order({ name: "sha" }, player) - 0.2;
			},
			result: {
				player: function (player) {
					var storage = player.storage.olsaogu;
					if (storage) return 1;
					if (
						player.getDiscardableCards(player, "he").filter(card => {
							if (card.name != "sha") return false;
							if (_status.event.olsaogu && _status.event.olsaogu.some(cardx => get.suit(cardx, false) == get.suit(card, player))) return false;
							return true;
						}).length
					)
						return 1;
					return 0;
				},
			},
		},
		group: "olsaogu_effect",
		subSkill: {
			effect: {
				trigger: { player: "phaseJieshuBegin" },
				filter: function (event, player) {
					if (_status.connectMode) return player.countCards("he");
					return player.countDiscardableCards(player, "he");
				},
				direct: true,
				content: function () {
					"step 0";
					var list = [];
					player.getHistory("lose", evt => {
						if (evt.type == "discard" && evt.getParent("phaseJieshu").name == "phaseJieshu") list.addArray(evt.cards2);
					});
					event.list = list;
					var str,
						storage = player.storage.olsaogu;
					if (storage) str = "弃置一张牌，令一名其他角色摸一张牌。";
					else {
						str = "弃置一张牌，令一名其他角色弃置两张牌（不能包含你本阶段弃置过的花色），然后其使用弃置的【杀】。";
						if (list.length) {
							var text = "",
								suits = list
									.reduce(function (list, card) {
										return list.add(get.suit(card, false)), list;
									}, [])
									.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
							for (var i = 0; i < suits.length; i++) text += get.translation(suits[i]);
							str += "<br>本阶段已弃置过" + text + "花色的牌。";
						}
					}
					player
						.chooseCardTarget({
							prompt: get.prompt("olsaogu"),
							prompt2: str,
							filterTarget: function (card, player, target) {
								return player != target && target.countCards("he") > 1;
							},
							filterCard: lib.filter.cardDiscardable,
							position: "he",
							complexCard: true,
							complexSelect: true,
							ai1: function (card) {
								var player = _status.event.player;
								if (!player.storage.olsaogu && _status.event.list.some(cardx => get.suit(cardx, false) == get.suit(card, player))) return 7 - get.value(card);
								return 5 - get.value(card);
							},
							ai2: function (target) {
								var player = _status.event.player;
								var att = get.attitude(player, target);
								if (player.storage.olsaogu) return att;
								var list = _status.event.list.slice();
								if (ui.selected.cards.length) list.addArray(ui.selected.cards);
								var cards = target.getCards("he", card => {
									if (card.name != "sha" || list.some(cardx => get.suit(cardx, false) == get.suit(card, target))) return false;
									return (
										lib.filter.cardDiscardable(card, target) &&
										game.hasPlayer(function (current) {
											if (!current.canUse(card, target, false)) return false;
											return get.effect(current, card, target, target) > 0 && get.effect(current, card, target, player) > 0;
										})
									);
								});
								if (cards.length && att > 0)
									return (
										Math.sqrt(Math.min(2, cards.length)) *
										cards.reduce(function (num, card) {
											var players = game.filterPlayer(current => target.canUse(card, current, false));
											players.sort((a, b) => get.effect(b, card, target, target) * get.effect(b, card, target, player) - get.effect(a, card, target, target) * get.effect(a, card, target, player));
											return (num = get.effect(players[0], card, target, target) * get.effect(players[0], card, target, player));
										}, 0)
									);
								return (
									get.effect(target, { name: "guohe_copy2" }, player, player) *
									Math.sqrt(
										Math.min(
											2,
											target.getDiscardableCards(player, "he").filter(card => {
												return !list.some(cardx => get.suit(cardx, false) == get.suit(card, target));
											}).length
										)
									)
								);
							},
						})
						.set("list", list);
					"step 1";
					if (result.bool) {
						var cards = result.cards,
							target = result.targets[0];
						player.logSkill("olsaogu", target);
						player.discard(cards);
						if (player.storage.olsaogu) {
							target.draw();
							event.finish();
						} else {
							event.target = target;
							var list = result.cards.slice();
							player.getHistory("lose", evt => {
								if (evt.type == "discard" && evt.getParent("phaseJieshu").name == "phaseJieshu") list.addArray(evt.cards2);
							});
							var cards = target.getCards("he", card => {
								return lib.filter.cardDiscardable(card, target) && !list.some(cardx => get.suit(cardx, false) == get.suit(card, target));
							});
							if (cards.length) {
								var text = "",
									suits = list
										.reduce(function (list, card) {
											return list.add(get.suit(card, false)), list;
										}, [])
										.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
								for (var i = 0; i < suits.length; i++) text += get.translation(suits[i]);
								target
									.chooseToDiscard(
										"he",
										"扫谷：弃置两张牌（不能弃置" + text + "花色的牌），然后使用其中的【杀】",
										function (card, player) {
											var list = _status.event.list;
											return !list.some(cardx => get.suit(cardx, false) == get.suit(card, player));
										},
										Math.min(cards.length, 2),
										true
									)
									.set("ai", function (card) {
										var player = _status.event.player;
										if (card.name == "sha" && player.hasValueTarget(card)) return 10;
										return -get.value(card);
									})
									.set("list", list);
							} else event.finish();
						}
					} else event.finish();
					"step 2";
					if (result.bool) {
						var cards = result.cards.filter(card => card.name == "sha");
						if (cards.length) {
							var next = game.createEvent("olsaogu_chooseToUseSha");
							next.player = target;
							next.cards = cards;
							next.setContent(lib.skill.olsaogu.chooseToUseSha);
						}
					}
				},
			},
		},
		chooseToUseSha: function () {
			"step 0";
			event.cards2 = cards.filter(i => get.position(i, true) == "d" && player.hasUseTarget(i));
			if (!event.cards2.length) event.finish();
			"step 1";
			if (event.cards2.length == 1) event._result = { bool: true, links: event.cards2 };
			else
				player
					.chooseButton(["扫谷：请使用其中的【杀】", event.cards2], true)
					.set("filterButton", button => {
						return _status.event.player.hasUseTarget(button.link, false);
					})
					.set("ai", button => {
						return _status.event.player.getUseValue(button.link);
					});
			"step 2";
			if (result.bool) {
				var card = result.links[0];
				event.cards2.remove(card);
				player.$gain2(card, false);
				game.delayx();
				player.chooseUseTarget(true, card, false);
			} else event.finish();
			"step 3";
			if (event.cards2.length) event.goto(1);
		},
	},
	//OL周群
	oltianhou: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		content: function () {
			"step 0";
			var card = get.cards()[0];
			event.card = card;
			game.cardsGotoOrdering(card);
			"step 1";
			if (player.countCards("he") > 0) {
				player
					.chooseCard("he", "天候：是否用一张牌交换牌堆顶的" + get.translation(card) + "?")
					.set("promptx", [[card]])
					.set("card", card)
					.set("ai", cardx => {
						let card = _status.event.card,
							val = get.value(card, player) - get.value(cardx, player);
						if (val < 0) return -val;
						let suit = get.suit(card);
						if (suit === "heart")
							return (
								val +
								game.countPlayer(current => {
									if (player !== current && !game.hasPlayer(tar => tar.hp - current.hp > 1)) return get.sgn(get.attitude(player, current));
									return 0;
								})
							);
						if (suit == "club")
							return (
								val +
								game.countPlayer(current => {
									if (player !== current && (current.hp < 2 || !game.hasPlayer(tar => current.hp - tar.hp > 1))) return get.sgn(get.attitude(player, current));
									return 0;
								})
							);
						return val + 0.1;
					});
			} else {
				event._result = { bool: false };
			}
			"step 2";
			if (result.bool) {
				player.lose(result.cards, ui.cardPile, "insert");
				player.gain(event.card, "draw");
			} else {
				ui.cardPile.insertBefore(event.card, ui.cardPile.firstChild);
			}
			"step 3";
			var card = get.cards()[0];
			ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
			player.showCards(card, get.translation(player) + "发动了【天候】");
			var suit = get.suit(card, false),
				skill = "oltianhou_" + suit;
			if (!lib.skill.oltianhou.derivation.includes(skill)) event.finish();
			else {
				event.weather_skill = skill;
				player.chooseTarget(true, "令一名角色获得技能【" + get.translation(skill) + "】", get.translation(skill + "_info")).set("ai", function (target) {
					return get.attitude(_status.event.player, target);
				});
			}
			"step 4";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "green");
				target.addAdditionalSkill("oltianhou_" + player.playerid, event.weather_skill);
				player.addTempSkill("oltianhou_expire", { player: "phaseZhunbeiBegin" });
				game.log(target, "获得了天气技能", "#g【" + get.translation(event.weather_skill) + "】");
				game.broadcastAll(function (bg) {
					_status.tempBackground = bg;
					game.updateBackground();
				}, event.weather_skill + "_bg");
				game.addVideo("skill", player, ["oltianhou", [true, event.weather_skill + "_bg"]]);
			}
		},
		video: function (player, info) {
			if (info[0]) {
				_status.tempBackground = info[1];
			} else {
				delete _status.tempBackground;
			}
			game.updateBackground();
		},
		derivation: ["oltianhou_spade", "oltianhou_heart", "oltianhou_club", "oltianhou_diamond"],
		subSkill: {
			expire: {
				charlotte: true,
				onremove: function (player) {
					var key = "oltianhou_" + player.playerid,
						players = game.players.concat(game.dead);
					for (var current of players) {
						current.removeAdditionalSkill(key);
					}
					game.removeGlobalSkill("oltianhou_" + player.playerid + "_ai");
					game.broadcastAll(function () {
						delete _status.tempBackground;
						game.updateBackground();
					});
					game.addVideo("skill", player, ["oltianhou", [false]]);
				},
			},
			spade: {
				audio: true,
				mark: true,
				marktext: "雨",
				intro: {
					content: "锁定技。其他角色造成火属性伤害时，取消之；一名角色受到雷属性伤害后，所有与其座次相邻的角色失去1点体力。",
				},
				trigger: { global: "damageEnd" },
				forced: true,
				filter: function (event) {
					return event.hasNature("thunder") && lib.skill.oltianhou_spade.logTarget(event).length > 0;
				},
				logTarget: function (event) {
					var list = [];
					if (!event.player.isIn()) return [];
					if (event.player.getNext().isIn()) list.push(event.player.getNext());
					if (event.player.getPrevious().isIn()) list.push(event.player.getPrevious());
					return list.sortBySeat(_status.currentPhase);
				},
				content: function () {
					var targets = lib.skill.oltianhou_spade.logTarget(trigger);
					for (var i of targets) i.loseHp();
					game.delayex();
				},
				group: "oltianhou_miehuo",
				global: "oltianhou_spade_ai",
			},
			spade_ai: {
				ai: {
					effect: {
						player: function (card, player, target, current) {
							if (((typeof card == "object" && game.hasNature(card, "fire")) || get.tag(card, "fireDamage")) && !player.hasSkill("oltianhou_spade")) return "zeroplayertarget";
							if ((typeof card == "object" && game.hasNature(card, "thunder")) || get.tag(card, "thunderDamage")) {
								var list = lib.skill.oltianhou_spade.logTarget({ player: target });
								var eff = list.reduce(function (eff, current) {
									eff += get.effect(current, { name: "losehp" }, player, player) / get.attitude(player, player);
								}, 0);
								return [1, eff];
							}
						},
					},
				},
			},
			miehuo: {
				audio: "oltianhou_spade",
				trigger: { global: "damageBegin2" },
				forced: true,
				logTarget: "source",
				filter: function (event, player) {
					return event.hasNature("fire") && event.source && event.source.isIn() && event.source != player;
				},
				content: function () {
					trigger.cancel();
				},
			},
			heart: {
				audio: true,
				mark: true,
				marktext: "暑",
				intro: {
					content: "锁定技。其他角色的结束阶段开始时，若其体力值为全场最大，则其失去1点体力。",
				},
				trigger: { global: "phaseJieshuBegin" },
				forced: true,
				filter: function (event, player) {
					return player != event.player && event.player.isIn() && event.player.isMaxHp();
				},
				logTarget: "player",
				content: function () {
					trigger.player.loseHp();
				},
				global: "oltianhou_heart_ai",
			},
			heart_ai: {
				mod: {
					aiOrder: function (player, card, num) {
						if (
							num > 0 &&
							_status.event &&
							_status.event.type == "phase" &&
							!player.hasSkill("oltianhou_heart") &&
							get.tag(card, "recover") &&
							!player.isMaxHp() &&
							player.needsToDiscard() <= 1 &&
							!game.hasPlayer(function (current) {
								return current.hp - player.hp > 1;
							}) &&
							get.effect(player, { name: "losehp" }, player, player) < 0
						)
							return 0;
					},
				},
			},
			club: {
				audio: true,
				mark: true,
				marktext: "霜",
				intro: {
					content: "锁定技。其他角色的结束阶段开始时，若其体力值为全场最小，则其失去1点体力。",
				},
				trigger: { global: "phaseJieshuBegin" },
				forced: true,
				filter: function (event, player) {
					return player != event.player && event.player.isIn() && event.player.isMinHp();
				},
				logTarget: "player",
				content: function () {
					trigger.player.loseHp();
				},
				global: "oltianhou_club_ai",
			},
			club_ai: {
				ai: {
					nokeep: true,
					skillTagFilter: function (player, tag, arg) {
						return _status.event && _status.event.type == "phase" && (!arg || (arg.card && get.name(arg.card) === "tao")) && !player.hasSkill("oltianhou_club") && player.isMinHp() && get.effect(player, { name: "losehp" }, player, player) < 0;
					},
				},
			},
			diamond: {
				audio: true,
				mark: true,
				marktext: "雾",
				intro: {
					content: "锁定技。其他角色使用【杀】指定与其座次不相邻唯一目标时，则其判定。若判定结果的点数大于此【杀】，则此【杀】对其无效。",
				},
				trigger: { global: "useCardToPlayer" },
				forced: true,
				filter: function (event, player) {
					if (event.card.name != "sha" || event.player == player || event.targets.length != 1 || !event.player.isIn()) return false;
					return event.target != event.player.getNext() && event.target != event.player.getPrevious();
				},
				logTarget: "player",
				content: function () {
					"step 0";
					var num = get.number(trigger.card);
					event.num = num;
					trigger.player
						.judge(card => {
							var num = get.number(card),
								num2 = _status.event.getParent("oltianhou_diamond").num;
							return num > num2 ? -4 : 4;
						})
						.set("judge2", result => {
							if (result.bool == false) return true;
							return false;
						});
					"step 1";
					if (!result.bool) {
						trigger.getParent().all_excluded = true;
						trigger.untrigger();
					}
				},
				global: "oltianhou_diamond_ai",
			},
			diamond_ai: {
				ai: {
					effect: {
						player(card, player, target) {
							if (get.name(card) == "sha" && !player.hasSkill("oltianhou_diamond") && target != player.getNext() && target != player.getPrevious()) {
								let num = get.number(card),
									max = _status.aiyh_MAXNUM || 13;
								return [num / max, 0, num / max, 0];
							}
						},
					},
				},
			},
		},
	},
	olchenshuo: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		hasSame: function (info, card) {
			if (info.type == get.type2(card, false)) return true;
			if (info.suit != "none" && info.suit == get.suit(card, false)) return true;
			if (typeof info.number == "number" && info.number > 0 && info.number == get.number(card, false)) return true;
			return info.length == get.cardNameLength(card);
		},
		content: function () {
			"step 0";
			player.chooseCard("h", get.prompt("olchenshuo"), "展示一张手牌，然后展示并获得牌堆顶的牌").set("ai", function (card) {
				if (get.type(card) == "basic") return 1 + Math.random();
				return Math.random();
			});
			"step 1";
			if (result.bool) {
				player.logSkill("olchenshuo");
				player.showCards(result.cards, get.translation(player) + "发动了【谶说】");
				var card = result.cards[0];
				event.cardInfo = {
					type: get.type2(card, player),
					suit: get.suit(card, player),
					number: get.number(card, player),
					length: get.cardNameLength(card),
				};
				event.cards = [];
				event.forceDie = true;
				event.includeOut = true;
			} else event.finish();
			"step 2";
			var judgestr = get.translation(player) + "展示的第" + get.cnNumber(cards.length + 1, true) + "张【谶说】牌";
			event.videoId = lib.status.videoId++;
			var card = get.cards()[0];
			event.card = card;
			cards.add(card);
			game.cardsGotoOrdering(card);
			game.addVideo("judge1", player, [get.cardInfo(card), judgestr, event.videoId]);
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
				card,
				judgestr,
				event.videoId,
				get.id()
			);
			game.log(player, "展示了牌堆顶的", card);
			game.delay(2);
			"step 3";
			game.broadcastAll(function (id) {
				var dialog = get.idDialog(id);
				if (dialog) {
					dialog.close();
				}
				ui.arena.classList.remove("thrownhighlight");
			}, event.videoId);
			game.addVideo("judge2", null, event.videoId);
			if (cards.length < 3 && player.isIn() && lib.skill.olchenshuo.hasSame(event.cardInfo, card)) event.goto(2);
			else {
				game.broadcastAll(function () {
					ui.clear();
				});
				player.gain(cards, "gain2");
			}
		},
	},
	//OL文钦
	olguangao: {
		audio: 2,
		trigger: {
			global: "useCard2",
		},
		filter: function (event, player) {
			var card = event.card;
			if (card.name != "sha") return false;
			if (event.player == player) {
				return game.hasPlayer(current => {
					return current.isIn() && !event.targets.includes(current) && player.canUse(card, current);
				});
			}
			return event.player.isIn() && !event.targets.includes(player) && event.player.canUse(card, player);
		},
		direct: true,
		content: function () {
			"step 0";
			if (trigger.player == player) {
				player
					.chooseTarget(get.prompt("olguangao"), "为" + get.translation(trigger.card) + "额外指定一个目标。然后若你手牌数为偶数，你摸一张牌并令此牌对任意目标无效。", (card, player, target) => {
						return !_status.event.sourcex.includes(target) && player.canUse(_status.event.card, target);
					})
					.set("sourcex", trigger.targets)
					.set("ai", function (target) {
						var player = _status.event.player;
						if (player.countCards("h") % 2 == 0) return true;
						var eff = get.effect(target, _status.event.card, player, player);
						if (
							player.hasSkill("olxieju") &&
							player.isPhaseUsing() &&
							!player.getStat().skill.olxieju &&
							get.attitude(player, target) > 0 &&
							!game.hasGlobalHistory("useCard", evt => {
								return evt.targets && evt.targets.includes(target);
							})
						)
							return 6 + eff;
						return eff;
					})
					.set("card", trigger.card);
			} else {
				trigger.player
					.chooseBool("是否发动" + get.translation(player) + "的【犷骜】？", "令其成为" + get.translation(trigger.card) + "的额外目标。然后若其手牌数为偶数，其摸一张牌并令此牌对任意目标无效。")
					.set("ai", () => {
						return _status.event.bool;
					})
					.set(
						"bool",
						(function () {
							var att = get.attitude(trigger.player, player);
							if (player.countCards("h") % 2 == 0) {
								if (att > 0) return true;
								return false;
							}
							if (get.effect(player, trigger.card, trigger.player, trigger.player) > 0) return true;
							return false;
						})()
					);
			}
			"step 1";
			if (result.bool) {
				var target = result.targets && result.targets[0];
				if (!target) {
					target = player;
					trigger.player.logSkill("olguangao", player);
				} else {
					player.logSkill("olguangao", target);
				}
				trigger.targets.add(target);
				game.delayex();
			} else event.finish();
			"step 2";
			if (player.countCards("h") % 2 == 0) {
				player.draw();
				player
					.chooseTarget("犷骜：令此杀对其任意个目标无效", [1, Infinity], (card, player, target) => {
						return _status.event.targetsx.includes(target);
					})
					.set("ai", target => {
						return 1 - get.effect(target, _status.event.getTrigger().card, _status.event.player, _status.event.player);
					})
					.set("targetsx", trigger.targets);
			} else event.finish();
			"step 3";
			if (result.bool) {
				player.line(result.targets);
				trigger.excluded.addArray(result.targets);
			}
		},
	},
	olhuiqi: {
		audio: 2,
		trigger: {
			global: "phaseEnd",
		},
		juexingji: true,
		forced: true,
		skillAnimation: true,
		animationColor: "thunder",
		derivation: "olxieju",
		filter: function (event, player) {
			var targets = [];
			game.getGlobalHistory("useCard", evt => {
				if (evt.targets && evt.targets.length) {
					targets.addArray(evt.targets);
				}
			});
			return targets.length == 3 && targets.includes(player);
		},
		content: function () {
			"step 0";
			player.awakenSkill("olhuiqi");
			if (player.isDamaged()) player.recover();
			"step 1";
			player.addSkills("olxieju");
		},
	},
	olxieju: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return event.olxieju && event.olxieju.length;
		},
		onChooseToUse: function (event) {
			if (!event.olxieju && !game.online) {
				var targets = [];
				game.getGlobalHistory("useCard", evt => {
					if (evt.targets && evt.targets.length) {
						targets.addArray(evt.targets);
					}
				});
				event.set("olxieju", targets);
			}
		},
		filterTarget: function (card, player, target) {
			var event = _status.event;
			if (event.olxieju.includes(target)) return true;
			return false;
		},
		selectTarget: [1, Infinity],
		content: function () {
			let next = target.chooseToUse();
			next.set("openskilldialog", "偕举：是否将一张黑色牌当杀使用？");
			next.set("norestore", true);
			next.set("_backupevent", "olxieju_backup");
			next.set("custom", {
				add: {},
				replace: { window: function () {} },
			});
			next.backup("olxieju_backup");
		},
		ai: {
			order: 1,
			result: {
				target: function (player, target) {
					var val = target.getUseValue({ name: "sha" }, true);
					return Math.sign(val);
				},
			},
		},
		subSkill: {
			backup: {
				filterCard: function (card) {
					return get.itemtype(card) == "card" && get.color(card) == "black";
				},
				position: "hes",
				viewAs: {
					name: "sha",
				},
				prompt: "将一张黑色牌当杀使用",
				check: function (card) {
					return 7 - get.value(card);
				},
			},
		},
	},
	//郝普
	olzhenying: {
		audio: 2,
		enable: "phaseUse",
		usable: 2,
		filter: function (event, player) {
			return game.hasPlayer(current => {
				return lib.skill.olzhenying.filterTarget(null, player, current);
			});
		},
		filterTarget: function (card, player, target) {
			return player != target && target.countCards("h") <= player.countCards("h");
		},
		content: function () {
			"step 0";
			var send = function () {
				var next = game.createEvent("olzhenying_adjust", false);
				next.setContent(lib.skill.olzhenying.contentx);
				game.resume();
			};
			var sendback = function (result, player) {
				if (!result && typeof result !== "number") {
					result = player.getCards("h");
					if (!result.length) result = 0;
				}
				event.results.push([player, result]);
			};
			event.ai_targets = [];
			event.results = [];
			var players = [player, target];
			for (var i = 0; i < players.length; i++) {
				if (_status.connectMode) players[i].showTimer();
				if (players[i].isOnline()) {
					event.withol = true;
					players[i].send(send);
					players[i].wait(sendback);
				} else if (players[i] == game.me) {
					event.withme = true;
					var next = game.createEvent("olzhenying_adjust", false);
					next.setContent(lib.skill.olzhenying.contentx);
					if (_status.connectMode) game.me.wait(sendback);
				} else {
					event.ai_targets.push(players[i]);
				}
			}
			if (event.ai_targets.length) {
				for (var i = 0; i < event.ai_targets.length; i++) {
					if (players.includes(event.ai_targets[i])) {
						var target = event.ai_targets[i];
						var cards = target.getCards("h");
						cards = cards.sort((a, b) => {
							return get.value(b) - get.value(a);
						});
						var beginInd = 1;
						var endInd = 2;
						var eff = get.effect(player, { name: "juedou" }, target, target),
							eff2 = get.effect(target, { name: "juedou" }, player, target);
						var att = get.attitude(player, target);
						if (att > 0 || eff2 > 0) {
							if (cards.length <= 2) {
								cards = 2 - cards.length;
							} else {
								beginInd = 2;
								endInd = 2;
							}
						} else {
							if (get.value(cards, target) <= 5 && !target.isZhu) {
								if (eff > 0 && Math.random() < 0.65) {
									beginInd = 0;
									endInd = 1;
								}
							}
						}
						if (typeof cards != "number") {
							cards = cards.slice([beginInd, endInd].randomGet(), cards.length);
						}
						sendback(cards, target);
						event.ai_targets.splice(i--, 1);
					}
				}
				if (event.ai_targets.length) {
					event.ai_targets.randomSort();
					setTimeout(function () {
						event.interval = setInterval(
							function () {
								var target = event.ai_targets.shift();
								var cards = target.getCards("h");
								cards = cards.sort((a, b) => {
									return get.value(b) - get.value(a);
								});
								var beginInd = 1;
								var endInd = 2;
								var eff = get.effect(player, { name: "juedou" }, target, target),
									eff2 = get.effect(target, { name: "juedou" }, player, target);
								var att = get.attitude(player, target);
								if (att > 0 || eff2 > 0) {
									if (cards.length <= 2) {
										cards = 2 - cards.length;
									} else {
										beginInd = 2;
										endInd = 2;
									}
								} else {
									if (get.value(cards, target) <= 5 && !target.isZhu) {
										if (eff > 0 && Math.random() < 0.65) {
											beginInd = 0;
											endInd = 1;
										}
									}
								}
								if (typeof cards != "number") {
									cards = cards.slice([beginInd, endInd].randomGet(), cards.length);
								}
								sendback(cards, target);
								if (!event.ai_targets.length) {
									clearInterval(event.interval);
									if (event.withai) game.resume();
								}
							},
							_status.connectMode ? 750 : 75
						);
					}, 500);
				}
			}
			"step 1";
			if (event.withme) {
				if (_status.connectMode) game.me.unwait(result, game.me);
				else {
					if (!result && typeof result !== "number") {
						result = game.me.getCards("h");
						if (!result.length) result = 0;
					}
					event.results.push([game.me, result]);
				}
			}
			"step 2";
			if (event.withol && !event.resultOL) {
				game.pause();
			}
			"step 3";
			if (event.ai_targets.length > 0) {
				event.withai = true;
				game.pause();
			}
			"step 4";
			if (_status.connectMode) {
				for (var i of [player, target]) i.hideTimer();
			}
			var lose_list = [];
			var draw_list = [];
			event.results.sort((a, b) => lib.sort.seat(a[0], b[0]));
			for (var res of event.results) {
				var target = res[0],
					cardsx = res[1];
				if (!target || !cardsx) continue;
				if (typeof cardsx === "number") draw_list.push([target, cardsx]);
				else if (cardsx.length) lose_list.push([target, cardsx]);
			}
			if (lose_list.length) {
				game.loseAsync({
					lose_list: lose_list,
				}).setContent("discardMultiple");
			}
			if (draw_list.length) {
				for (var list of draw_list) {
					var target = list[0],
						num = list[1];
					target.draw(num, "nodelay");
				}
			}
			"step 5";
			game.delay();
			var num1 = player.countCards("h"),
				num2 = target.countCards("h");
			if (num1 == num2) {
				event.finish();
				return;
			}
			var players = [player, target];
			if (num2 < num1) players.reverse();
			var card = {
				name: "juedou",
				isCard: true,
			};
			if (players[0].canUse(card, players[1])) players[0].useCard(card, players[1]);
		},
		contentx: function () {
			"step 0";
			var player = game.me;
			event.player = player;
			var num = player.countCards("h");
			if (num >= 2) {
				var cards = player.getCards("h", card => {
					return lib.filter.cardDiscardable(card, player, "olzhenying");
				});
				if (cards.length < num - 2) event._result = { cards: cards };
				else
					player.chooseCard("镇荧：请将手牌弃置至至多两张", [num - 2, num], true, (card, player, target) => {
						return lib.filter.cardDiscardable(card, player, "olzhenying");
					});
				event.goto(2);
			} else {
				var choices = ["零", "一", "二"];
				player
					.chooseControl(choices)
					.set("prompt", "镇荧：请选择要将手牌调整至的张数")
					.set("ai", () => {
						return [0, 1, 2].randomGet();
					});
			}
			"step 1";
			var num = result.index;
			var len = player.countCards("h");
			if (len > num) {
				var cards = player.getCards("h", card => {
					return lib.filter.cardDiscardable(card, player, "olzhenying");
				});
				if (num == 0 || cards.length < len - num) {
					event._result = { cards: cards };
				} else
					player.chooseCard("镇荧：请将手牌弃置至" + get.cnNumber(num) + "张", len - num, true, (card, player, target) => {
						return lib.filter.cardDiscardable(card, player, "olzhenying");
					});
			} else event._result = { cards: num - len };
			"step 2";
			if (result && result.cards) {
				var cards = result.cards;
			}
			event.result = cards;
		},
		ai: {
			order: function (item, player) {
				if (
					game.hasPlayer(current => {
						return current.countCards("h") < player.countCards("h");
					})
				)
					return 3;
				return 7;
			},
			result: {
				player: function (player, target) {
					var delt = 2 - player.countCards("h");
					return Math.sqrt(Math.abs(delt)) * Math.sign(delt) + 0.1;
				},
				target: function (player, target) {
					if (get.attitude(player, target) > 0 && target.countCards("h") + player.countCards("h") <= 3) return 1;
					return get.sgn(get.effect(target, { name: "juedou" }, player, target)) * 1.2;
				},
			},
		},
	},
	//OL孟达
	olgoude: {
		audio: 2,
		trigger: {
			global: "phaseEnd",
		},
		filter: function (event, player) {
			var list = [];
			game.countPlayer(current => {
				if (current.group != player.group) return false;
				var listx = lib.skill.olgoude.getActed(current);
				list.addArray(listx);
			});
			return list.length && list.length < 4;
		},
		getActed: function (target) {
			var list = [];
			if (
				target.hasHistory("gain", evt => {
					return evt.getParent().name == "draw" && evt.cards.length == 1;
				})
			) {
				list.push(1);
			}
			if (
				game.hasPlayer2(current => {
					return current.hasHistory("lose", evt => {
						if (evt.type != "discard") return false;
						if ((evt.discarder || evt.getParent(2).player) != target) return false;
						var evtx = evt.getl(current);
						if (!evtx || evtx.hs.length != 1) return false;
						return true;
					});
				})
			) {
				list.push(2);
			}
			if (
				target.hasHistory("useCard", evt => {
					if (evt.card.name == "sha" && evt.cards && !evt.cards.length) return true;
					return false;
				})
			) {
				list.push(3);
			}
			if (
				target.hasHistory("custom", evt => {
					return evt.name == "changeGroup";
				})
			) {
				list.push(4);
			}
			return list;
		},
		direct: true,
		content: function () {
			"step 0";
			var list = [1, 2, 3, 4];
			game.countPlayer(current => {
				if (current.group != player.group) return false;
				var listx = lib.skill.olgoude.getActed(current);
				list.removeArray(listx);
			});
			var list2 = list.slice();
			var nochai = false,
				nosha = false;
			if (
				!game.hasPlayer(current => {
					return current.countDiscardableCards(player, "h");
				})
			) {
				nochai = true;
				list2.remove(2);
			}
			if (
				!game.hasPlayer(current => {
					return player.canUse({ name: "sha", isCard: true }, current, true, false);
				})
			) {
				nosha = true;
				list2.remove(3);
			}
			var choices = list2.map(i => {
				return "选项" + get.cnNumber(i, true);
			});
			var choiceList = ["摸一张牌", "弃置一名角色的一张手牌", "视为使用一张【杀】", "将势力改为任意一个势力"].map((text, ind) => {
				var hint = "";
				if (list2.includes(ind + 1)) {
					return text;
				} else if (!list.includes(ind + 1)) {
					hint += "已被执行过且";
				}
				if (ind == 1 && nochai && !list2.includes(ind + 1)) hint += "无有手牌角色且";
				if (ind == 2 && nosha && !list2.includes(ind + 1)) hint += "无可选目标且";
				hint = hint.slice(0, -1);
				return '<span style="opacity:0.5">' + text + "（" + hint + "）</span>";
			});
			choices.push("cancel2");
			if (_status.connectMode)
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			player
				.chooseControl(choices)
				.set("choiceList", choiceList)
				.set("prompt", get.prompt("olgoude"))
				.set("ai", () => {
					return _status.event.choice;
				})
				.set(
					"choice",
					(function () {
						var fn = function (control) {
							switch (control) {
								case "选项一":
									return player.getUseValue({ name: "draw" });
								case "选项二":
									return Math.max.apply(
										Math,
										game.filterPlayer().map(current => {
											if (current.hasSkillTag("noh")) return -1;
											return -1.5 * get.attitude(player, current) - Math.max(0, current.countCards("h") - 2) / 3;
										})
									);
								case "选项三":
									return player.getUseValue({ name: "sha" });
								case "选项四":
									var myPopulation =
										game.countPlayer(current => {
											return current.group == player.group;
										}) - 1;
									var value = Math.max.apply(
										Math,
										lib.group.map(group => {
											return (
												game.countPlayer(current => {
													return current.group == group && current != player;
												}) - myPopulation
											);
										})
									);
									return 10 * value + 0.1 * (Math.random() - 0.5);
								case "cancel2":
									return 0;
							}
						};
						var choicesx = choices.map(choice => {
							return [choice, fn(choice)];
						});
						choicesx = choicesx.sort((a, b) => {
							return b[1] - a[1];
						});
						var choice = choicesx[0];
						if (choice[1] < 0) return "cancel2";
						return choice[0];
					})()
				);
			"step 1";
			if (result.control == "cancel2") {
				event.finish();
				return;
			}
			var contents = {
				选项一: function () {
					player.logSkill("olgoude");
					player.draw();
				},
				选项二: function () {
					"step 0";
					player
						.chooseTarget("苟得：弃置一名角色的一张手牌", true, (card, player, target) => {
							return target.countDiscardableCards(player, "h");
						})
						.set("ai", target => {
							if (target.hasSkillTag("noh")) return 0;
							return -get.attitude(_status.event.player, target);
						});
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						if (_status.connectMode) {
							game.broadcastAll(function () {
								delete _status.noclearcountdown;
								game.stopCountChoose();
							});
						}
						player.logSkill("olgoude", target);
						player.discardPlayerCard(target, true, "h");
					}
				},
				选项三: function () {
					player.chooseUseTarget("sha", true, false).set("logSkill", "olgoude").set("prompt", "苟得：选择【杀】的目标");
				},
				选项四: function () {
					"step 0";
					var list = lib.group.slice();
					var maxGroup = list.slice().sort((a, b) => {
						return (
							game.countPlayer(current => {
								return current.group == b && current != player;
							}) -
							game.countPlayer(current => {
								return current.group == a && current != player;
							})
						);
					})[0];
					player
						.chooseControl(list)
						.set("prompt", "苟得：请选择要变更为的势力")
						.set("ai", () => {
							return _status.event.choice;
						})
						.set("choice", maxGroup);
					"step 1";
					if (_status.connectMode) {
						game.broadcastAll(function () {
							delete _status.noclearcountdown;
							game.stopCountChoose();
						});
					}
					var group = result.control;
					player.logSkill("olgoude");
					player.changeGroup(group);
					player.popup(group + "2", get.groupnature(group, "raw"));
				},
			};
			var next = game.createEvent("olgoude_" + result.control);
			next.player = player;
			next.setContent(contents[result.control]);
		},
		ai: {
			threaten: 3,
			effect: {
				player_use(card, player, target) {
					if (
						typeof card == "object" &&
						card.cards &&
						card.cards.some(card => {
							return get.position(card) == "h";
						}) &&
						!get.tag(card, "draw") &&
						!get.tag(card, "gain") &&
						!get.tag(card, "discard") &&
						player == _status.currentPhase &&
						player.needsToDiscard() == 1 &&
						game.countPlayer(current => {
							return current.group == player.group && current != player;
						}) <= 1 &&
						lib.group.some(group => {
							return (
								game.countPlayer(current => {
									return current.group == group && current != player;
								}) > 2
							);
						})
					)
						return "zeroplayertarget";
				},
			},
		},
	},
	//OL新改王朗
	oljici: {
		audio: "jici",
		trigger: {
			player: "compare",
			target: "compare",
		},
		filter: function (event, player) {
			if (event.player == player) {
				if (event.iwhile) return false;
				return event.num1 <= player.countMark("gushe");
			}
			return event.num2 <= player.countMark("gushe");
		},
		content: function () {
			var num = player.countMark("gushe");
			if (player == trigger.player) {
				trigger.num1 += num;
				if (trigger.num1 > 13) trigger.num1 = 13;
			} else {
				trigger.num2 += num;
				if (trigger.num2 > 13) trigger.num2 = 13;
			}
			game.log(player, "的拼点牌点数+" + num);
			var stat = player.getStat().skill;
			delete stat.gushe;
		},
		ai: {
			combo: "gushe",
		},
	},
	//OL刘老板
	olpianan: {
		audio: 2,
		trigger: {
			player: ["enterGame", "phaseDiscardEnd"],
			global: "phaseBefore",
		},
		forced: true,
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		content: function () {
			"step 0";
			var hs = player.getCards("h", card => {
				return get.name(card) != "shan" && lib.filter.cardDiscardable(card, player, "olpianan");
			});
			if (hs.length) player.discard(hs);
			"step 1";
			var num = player.hp - player.countCards("h");
			if (num > 0) {
				var cards = [];
				for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
					var card = ui.cardPile.childNodes[i];
					if (card.name == "shan") {
						cards.add(card);
						num--;
					}
					if (num == 0) break;
				}
				if (num > 0) {
					for (var i = 0; i < ui.discardPile.childNodes.length; i++) {
						var card = ui.discardPile.childNodes[i];
						if (card.name == "shan") {
							cards.add(card);
							num--;
						}
						if (num == 0) break;
					}
				}
				if (cards.length) player.gain(cards, "gain2");
			}
		},
		mod: {
			aiValue: function (player, card, num) {
				if (card.name != "shan") return;
				if (player == _status.currentPhase) return 0;
			},
			aiUseful: function () {
				return lib.skill.olpianan.mod.aiValue.apply(this, arguments);
			},
		},
	},
	olyinji: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		filter: function (event, player) {
			return !player.isMaxHp(true);
		},
		content: function () {
			"step 0";
			player
				.chooseControl("体力", "体力上限")
				.set("prompt", "殷积：回复1点体力或加1点体力上限")
				.set("ai", () => {
					var player = _status.event.player;
					if (!player.isDamaged() || (player.hp > 3 && player.getDamagedHp() == 1) || player.maxHp < 3) return 1;
					return 0;
				});
			"step 1";
			player[result.index == 0 ? "recover" : "gainMaxHp"]();
		},
	},
	olkuisi: {
		audio: 2,
		trigger: { player: "phaseDrawBefore" },
		forced: true,
		content: function () {
			"step 0";
			trigger.cancel();
			var cards = game.cardsGotoOrdering(get.cards(4)).cards;
			event.cards = cards.slice();
			"step 1";
			player
				.chooseButton(["窥伺：是否使用其中的一张牌？", cards])
				.set("filterButton", button => {
					return _status.event.player.hasUseTarget(button.link);
				})
				.set("ai", button => {
					var player = _status.event.player,
						card = button.link,
						cards = _status.event.getParent().cards;
					var val = player.getUseValue(card) + 0.01;
					if ((val > 0 && cards.length > 1) || (val > 4 && cards.length == 1 && (player.maxHp > 3 || player.isDamaged()))) return get.order(card) + val / 5;
					return 0;
				});
			"step 2";
			if (result.bool) {
				var card = result.links[0];
				event.cards.remove(card);
				player.$gain2(card, false);
				game.delayx();
				player.chooseUseTarget(true, card, false);
			} else event.goto(4);
			"step 3";
			if (cards.some(i => get.position(i, true) == "o" && player.hasUseTarget(i))) event.goto(1);
			"step 4";
			if (cards.length != 1 && cards.length != 2) {
				player.loseMaxHp();
			}
		},
	},
	//卢氏
	olzhuyan: {
		audio: 2,
		trigger: { player: "phaseDiscardEnd" },
		init: function (player) {
			player.addSkill("olzhuyan_record");
		},
		onremove: ["olzhuyan_true", "olzhuyan_false"],
		direct: true,
		filter: function (event, player) {
			for (var bool of [true, false]) {
				var targeted = player.getStorage("olzhuyan_" + bool);
				if (
					game.hasPlayer(current => {
						return !targeted.includes(current) && lib.skill.olzhuyan.getNum(current, bool);
					})
				)
					return true;
			}
			return false;
		},
		getNum: function (player, status) {
			if (!_status.olzhuyan || !_status.olzhuyan[player.playerid]) return 0;
			var num = _status.olzhuyan[player.playerid][status ? 1 : 0];
			if (status) {
				let no = num > 5;
				num -= player.countCards("h");
				if (no) num = Math.min(0, num);
			} else {
				num -= player.hp;
				if (num + player.hp < 1) num = 1 - player.hp;
			}
			return num;
		},
		content: function () {
			"step 0";
			var map = {};
			for (var bool of [true, false]) {
				var targeted = player.getStorage("olzhuyan_" + bool);
				game.countPlayer(current => {
					if (targeted.includes(current)) return false;
					if (!map[current.playerid]) map[current.playerid] = [];
					map[current.playerid][bool ? 1 : 0] = lib.skill.olzhuyan.getNum(current, bool);
				});
			}
			event.map = map;
			player
				.chooseTarget(get.prompt("olzhuyan"), "令一名角色将{体力值/手牌数}调整至与其上个结束阶段相同(“--”表示已对其发动过该分支)", (card, player, target) => {
					var list = _status.event.map[target.playerid];
					return list && (list[0] || list[1]);
				})
				.set("map", map)
				.set("targetprompt", target => {
					var list = _status.event.map[target.playerid];
					var str = "";
					for (var i = 0; i < 2; i++) {
						if (list[i] === undefined) str += "--";
						else {
							str += (list[i] > 0 ? "+" : "") + list[i];
						}
						str += "/";
					}
					return str.slice(0, -1);
				})
				.set("ai", target => {
					var list = _status.event.map[target.playerid];
					var att = get.attitude(_status.event.player, target);
					var v1 = list[0],
						v2 = get.sgn(list[1]) * Math.sqrt(Math.abs(list[1]));
					return Math[att > 0 ? "max" : "min"](v1, v2) * att;
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("olzhuyan", target);
				event.target = target;
				var list = event.map[target.playerid];
				var choices = ["体力值", "手牌数"];
				if (list[0] && list[1]) {
					player
						.chooseControl(choices)
						.set("choiceList", ["令" + get.translation(target) + (list[0] > 0 ? "回复" : "失去") + Math.abs(list[0]) + "点体力" + (list[0] < 0 ? "（至多失去至1）" : ""), "令" + get.translation(target) + (list[1] > 0 ? "摸" : "弃置") + get.cnNumber(Math.abs(list[1])) + "张" + (list[1] > 0 ? "" : "手") + "牌" + (list[1] > 0 ? "（至多摸至5）" : "")])
						.set("prompt", "驻颜：请选择一项")
						.set("ai", () => _status.event.choice)
						.set(
							"choice",
							(function () {
								var v1 = list[0],
									v2 = get.sgn(list[1]) * Math.sqrt(Math.abs(list[1]));
								if (get.attitude(player, target) > 0) {
									return v1 > v2 ? 0 : 1;
								}
								return v1 > v2 ? 1 : 0;
							})()
						);
				} else {
					event._result = { index: list[0] ? 0 : 1 };
				}
			} else event.finish();
			"step 2";
			var ind = result.index;
			player.markAuto("olzhuyan_" + Boolean(ind), [target]);
			var num = event.map[target.playerid][ind];
			if (ind == 0) {
				if (num > 0) {
					target.recover(num);
				} else {
					num = Math.min(target.hp - 1, -num);
					target.loseHp(num);
				}
			} else {
				if (num > 0) {
					num = Math.min(5 - target.countCards("h"), num);
					if (num > 0) target.draw(num);
				} else {
					num = -num;
					target.chooseToDiscard(num, true).set("prompt", "驻颜：请弃置" + get.cnNumber(Math.abs(num)) + "张手牌");
				}
			}
		},
		subSkill: {
			record: {
				trigger: {
					global: ["phaseJieshuAfter", "phaseBefore", "enterGame"],
				},
				lastDo: true,
				charlotte: true,
				forced: true,
				popup: false,
				forceDie: true,
				filter: function (event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				content: function () {
					if (!_status.olzhuyan) _status.olzhuyan = {};
					if (event.triggername == "phaseBefore") {
						game.countPlayer(current => {
							_status.olzhuyan[current.playerid] = [current.hp, current.countCards("h")];
						});
					} else {
						_status.olzhuyan[trigger.player.playerid] = [trigger.player.hp, trigger.player.countCards("h")];
					}
				},
			},
		},
	},
	olleijie: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("olleijie"), "令一名角色判定。若结果为♠2~9，其受到2点雷电伤害，否则其摸两张牌。")
				.set("ai", target => {
					var player = _status.event.player,
						sgn = _status.event.sgn;
					if (sgn > 0) {
						return get.damageEffect(target, target, player, "thunder");
					} else if (sgn == 0) {
						return get.attitude(player, target);
					}
					return 0;
				})
				.set(
					"sgn",
					(function () {
						var sgn = 0;
						game.countPlayer(current => {
							if (!current.hasSkillTag("rejudge")) return;
							sgn = get.sgnAttitude(player, current);
						});
						return sgn;
					})()
				);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("olleijie", target);
				target
					.judge(card => {
						var number = get.number(card);
						if (get.suit(card) == "spade" && number >= 2 && number <= 9) return -4;
						return 2;
					})
					.set("judge2", result => {
						return result.bool === false ? true : false;
					});
			} else event.finish();
			"step 2";
			if (result.bool) {
				target.draw(2);
			} else {
				target.damage(2, "thunder");
			}
		},
	},
	releijie: {
		audio: "olleijie",
		enable: "phaseUse",
		filterTarget: true,
		usable: 1,
		async content(event, trigger, player) {
			const target = event.target,
				result = await target
					.judge(card => {
						var number = get.number(card);
						if (get.suit(card) == "spade" && number >= 2 && number <= 9) return -4;
						return 2;
					})
					.set("judge2", result => {
						return result.bool === false ? true : false;
					})
					.forResult();
			if (result.bool) await target.draw(2);
			else {
				const card = new lib.element.VCard({ name: "sha", nature: "thunder" });
				if (player.canUse(card, target, false)) {
					for (let i = 1; i <= 2; i++) {
						await player.useCard(card, target, false);
					}
				}
			}
		},
		ai: {
			order: 10,
			result: {
				target(player, target) {
					let sgn = 0,
						eff = 0,
						num = get.attitude(player, target);
					const card = new lib.element.VCard({ name: "sha", nature: "thunder" });
					game.countPlayer(current => {
						if (!current.hasSkillTag("rejudge")) return;
						sgn = get.sgnAttitude(player, current);
					});
					if (sgn > 0 && player.canUse(card, target, false)) {
						eff += get.effect(target, card, player, player) * 2;
						return eff * get.sgn(num);
					} else if (sgn == 0) return num * get.sgn(num);
					return 0;
				},
			},
		},
	},
	//张世平
	olhongji: {
		audio: 2,
		trigger: { global: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			const list = player.getStorage("olhongji_used");
			if (event.player.isMinHandcard() && !list.includes("min")) return true;
			if (event.player.isMaxHandcard() && !list.includes("max")) return true;
			return false;
		},
		direct: true,
		content: function () {
			"step 0";
			let target = trigger.player;
			event.target = target;
			const list = player.getStorage("olhongji_used");
			let bool1 = target.isMinHandcard() && !list.includes("min"),
				str1 = "其手牌数为全场最少。你可以令其于本回合摸牌阶段结束后执行一个额外的摸牌阶段，然后本轮你不能再发动该分支。";
			let bool2 = target.isMaxHandcard() && !list.includes("max"),
				str2 = "其手牌数为全场最多。你可以令其于本回合出牌阶段结束后执行一个额外的出牌阶段，然后本轮你不能再发动该分支。";
			if (bool1 && !bool2) {
				event.branch = 0;
				player
					.chooseBool(get.prompt("olhongji", target), str1)
					.set("ai", () => {
						return _status.event.bool;
					})
					.set("bool", get.attitude(player, trigger.player) > 1);
			} else if (!bool1 && bool2) {
				event.branch = 1;
				player
					.chooseBool(get.prompt("olhongji", target), str2)
					.set("ai", () => {
						return _status.event.bool;
					})
					.set("bool", get.attitude(player, trigger.player) > 1);
			} else if (bool1 && bool2) {
				player
					.chooseControl("摸牌阶段", "出牌阶段", "cancel2")
					.set("prompt", get.prompt("olhongji", target))
					.set("choiceList", [str1.slice(13), str2.slice(13)])
					.set("ai", () => _status.event.bool)
					.set("bool", () => (get.attitude(player, trigger.player) > 1 ? [0, 1].randomGet() : "cancel2"));
			}
			"step 1";
			var choice = -1;
			if ((event.branch == 0 && result.bool) || result.control == "摸牌阶段") choice = 0;
			if ((event.branch == 1 && result.bool) || result.control == "出牌阶段") choice = 1;
			if (choice == 0) {
				player.logSkill("olhongji", target);
				target.addTempSkill("olhongji_draw");
			} else if (choice == 1) {
				player.logSkill("olhongji", target);
				target.addTempSkill("olhongji_use");
			}
			player.addTempSkill("olhongji_used", "roundStart");
			player.markAuto("olhongji_used", ["min", "max"][choice]);
		},
		ai: { expose: 0.25 },
		subSkill: {
			used: { charlotte: true, onremove: true },
			draw: {
				trigger: { player: "phaseDrawAfter" },
				charlotte: true,
				forced: true,
				popup: false,
				content: function () {
					const evt = trigger.getParent("phase", true, true);
					if (evt && evt.phaseList) evt.phaseList.splice(evt.num + 1, 0, "phaseDraw|olhongji");
					player.removeSkill("olhongji_draw");
				},
			},
			use: {
				trigger: { player: "phaseUseAfter" },
				charlotte: true,
				forced: true,
				popup: false,
				content: function () {
					const evt = trigger.getParent("phase", true, true);
					if (evt && evt.phaseList) evt.phaseList.splice(evt.num + 1, 0, "phaseUse|olhongji");
					player.removeSkill("olhongji_use");
				},
			},
		},
	},
	olxinggu: {
		audio: 2,
		trigger: { global: "phaseBefore", player: "enterGame" },
		forced: true,
		locked: false,
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		group: "olxinggu_trade",
		content: function () {
			"step 0";
			var cards = [];
			for (var i = 0; i < 3; i++) {
				var card = get.cardPile2(function (card) {
					if (cards.includes(card)) return false;
					var type = get.subtype(card);
					return type == "equip3" || type == "equip4" || type == "equip6";
				});
				if (card) cards.add(card);
				else break;
			}
			if (cards.length) player.addToExpansion(cards, "draw").gaintag.add("olxinggu");
		},
		marktext: "贾",
		intro: {
			markcount: "expansion",
			mark: function (dialog, content, player) {
				var content = player.getExpansions("olxinggu");
				if (content && content.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addAuto(content);
					} else {
						return "剩余" + get.cnNumber(content.length) + "匹马";
					}
				}
			},
		},
		subSkill: {
			trade: {
				audio: "olxinggu",
				trigger: { player: "phaseJieshuBegin" },
				filter: function (event, player) {
					return player.getExpansions("olxinggu").length;
				},
				direct: true,
				content: function () {
					"step 0";
					var cards = player.getExpansions("olxinggu");
					if (_status.connectMode)
						game.broadcastAll(function () {
							_status.noclearcountdown = true;
						});
					player
						.chooseButton([get.prompt("olxinggu"), cards])
						.set("ai", button => {
							if (_status.event.toChoose == button.link) return 1;
							return 0;
						})
						.set(
							"toChoose",
							!event.aiCancel &&
								cards.find(card => {
									return game.hasPlayer(current => {
										if (!lib.skill.zhijian.filterTarget(card, player, current)) return false;
										return get.effect(current, card, player, player) > 0;
									});
								})
						);
					"step 1";
					if (result.bool) {
						var card = result.links[0];
						event.card = card;
						player
							.chooseTarget("将" + get.translation(card) + "置入一名其他角色的装备区", lib.skill.zhijian.filterTarget)
							.set("ai", target => {
								var player = _status.event.player;
								return get.effect(target, _status.event.card, player, player);
							})
							.set("card", card);
					} else {
						if (_status.connectMode) {
							game.broadcastAll(function () {
								delete _status.noclearcountdown;
								game.stopCountChoose();
							});
						}
						event.finish();
					}
					"step 2";
					if (result.bool) {
						var target = result.targets[0];
						event.target = target;
						if (_status.connectMode) {
							game.broadcastAll(function () {
								delete _status.noclearcountdown;
								game.stopCountChoose();
							});
						}
						player.logSkill("olxinggu", target);
						player.$give(card, target, false);
					} else {
						if (!event.isMine() && !event.isOnline()) event.aiCancel = true;
						event.goto(0);
					}
					"step 3";
					target.equip(card);
					"step 4";
					var card = get.cardPile2(cardx => {
						return get.suit(cardx) == "diamond";
					});
					if (card) player.gain(card, "gain2");
					else {
						game.log("但是牌堆中并没有♦牌了！");
						player.chat("做了个亏本买卖…");
					}
				},
			},
		},
	},
	//孙弘
	olxianbi: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return !player.getStorage("olzenrun").includes(target) && target.countCards("e") != player.countCards("h");
		},
		content: function () {
			"step 0";
			var del = target.countCards("e") - player.countCards("h");
			if (del == 0) event.finish();
			else if (del > 0) {
				player.draw(Math.min(5, del));
			} else {
				player.chooseToDiscard("险诐：弃置" + get.cnNumber(-del) + "张手牌", -del, "h", true);
				player.addTempSkill("olxianbi_gain");
			}
		},
		ai: {
			order: 5,
			result: {
				player: function (player, target) {
					return player.countCards("h", card => {
						return get.value(card) > 6;
					}) >= target.countCards("e")
						? 0
						: 1;
				},
			},
		},
		subSkill: {
			gain: {
				trigger: {
					player: "loseAfter",
				},
				filter: function (event, player) {
					return event.getParent(3).name == "olxianbi";
				},
				forced: true,
				charlotte: true,
				popup: false,
				content: function () {
					var cards = [],
						cards2 = trigger.cards;
					for (var cardx of cards2) {
						var type = get.type2(cardx, player);
						var card = get.discardPile(function (card) {
							return get.type2(card, false) == type && !cards2.includes(card) && !cards.includes(card);
						});
						if (card) cards.push(card);
					}
					if (cards.length) player.gain(cards, "gain2");
				},
			},
		},
	},
	olzenrun: {
		audio: 2,
		trigger: { player: "drawBefore" },
		filter: function (event, player) {
			return (
				!player.hasSkill("olzenrun_used") &&
				game.hasPlayer(current => {
					return (
						!player.getStorage("olzenrun").includes(current) &&
						current != player &&
						current.hasCard(function (card) {
							return lib.filter.canBeGained(card, player, current);
						}, "he")
					);
				})
			);
		},
		direct: true,
		check: function (event, player) {
			return true;
		},
		content: function () {
			"step 0";
			var num = trigger.num;
			player
				.chooseTarget(get.prompt("olzenrun"), "改为获得一名其他角色" + get.cnNumber(num) + "张牌", (card, player, target) => {
					return (
						!player.getStorage("olzenrun").includes(target) &&
						target != player &&
						target.hasCard(function (card) {
							return lib.filter.canBeGained(card, player, target);
						}, "he")
					);
				})
				.set("ai", target => {
					return get.attitude(_status.event.player, target) / 5 + Math.random() + 2.5;
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("olzenrun", target);
				player.addTempSkill("olzenrun_used", ["phaseZhunbeiAfter", "phaseJudgeAfter", "phaseDrawAfter", "phaseUseAfter", "phaseDiscardAfter", "phaseJieshuAfter"]);
				trigger.cancel();
				player.gainPlayerCard(target, trigger.num, "he", true);
			}
			"step 2";
			if (result.bool) {
				var cards = result.cards;
				var num = cards.length;
				event.num = num;
				target
					.chooseControl()
					.set("choiceList", ["摸" + get.cnNumber(num) + "张牌", "令其不能再对你发动〖险诐〗和〖谮润〗"])
					.set("prompt", get.translation(player) + "对你发动了【谮润】，请选择一项")
					.set("ai", () => {
						if (_status.event.bool) return 0;
						return 1;
					})
					.set("bool", get.attitude(target, player) > 0 || (num == 1 && Math.random() < 0.5) || num >= 2);
			} else event.finish();
			"step 3";
			game.log(target, "选择了", "#y" + result.control);
			if (result.index == 0) {
				target.draw(num);
			} else {
				player.markAuto("olzenrun", [target]);
			}
		},
		subSkill: {
			used: {
				charlotte: true,
			},
		},
	},
	//罗宪
	oldaili: {
		audio: 2,
		trigger: { global: "phaseEnd" },
		filter: function (event, player) {
			return (
				player.countCards("h", card => {
					return card.hasGaintag("oldaili_tag");
				}) %
					2 ==
				0
			);
		},
		group: "oldaili_record",
		locked: false,
		check: function (event, player) {
			if (get.distance(event.player, player, "absolute") == 1 && !player.isTurnedOver()) return false;
			return true;
		},
		content: function () {
			player.turnOver();
			player.draw(3, "visible").gaintag = ["oldaili_tag"];
		},
		mod: {
			aiValue: function (player, card, num) {
				if (num < 0 || get.itemtype(card) != "card" || !card.hasGaintag("oldaili_tag")) return;
				if (get.distance(_status.currentPhase, player, "absolute") == 1 && !player.isTurnedOver()) return;
				let dai = player.countCards("h", card => {
					return card.hasGaintag("oldaili_tag");
				});
				if (ui.selected.cards && ui.selected.cards.length)
					dai += ui.selected.cards.filter(card => {
						return card.hasGaintag("oldaili_tag");
					}).length;
				if (dai % 2) return Math.sqrt(num);
				return num + 6;
			},
			aiUseful: function () {
				return lib.skill.oldaili.mod.aiValue.apply(this, arguments);
			},
		},
		mark: true,
		marktext: "砺",
		intro: {
			markcount: function (storage, player) {
				return player.countCards("h", card => card.hasGaintag("oldaili_tag"));
			},
			mark: function (dialog, content, player) {
				var cards = player.getCards("h", card => card.hasGaintag("oldaili_tag"));
				if (cards.length) {
					dialog.addAuto(cards);
				} else return "无展示牌";
			},
		},
		subSkill: {
			record: {
				trigger: { global: "showCardsEnd" },
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					return event.cards.some(i => get.owner(i) == player);
				},
				content: function () {
					game.broadcastAll(
						function (cards) {
							cards.forEach(card => card.addGaintag("oldaili_tag"));
						},
						trigger.cards.filter(i => get.owner(i) == player)
					);
					player.markSkill("oldaili");
				},
			},
		},
	},
	//胡班
	olhuiyun: {
		audio: 2,
		enable: "phaseUse",
		viewAs: {
			name: "huogong",
			storage: { olhuiyun: true },
		},
		filterCard: true,
		position: "hes",
		onuse: function (links, player) {
			player.addTempSkill("olhuiyun_after");
			player.addTempSkill("olhuiyun_record");
		},
		ai: {
			effect: {
				player: function (card, player, target) {
					if (get.attitude(player, target) > 0 && card && card.name == "huogong" && card.storage && card.storage.olhuiyun && !player.hasSkill("olhuiyun_3")) return [0, 0.5, 0, 0.5];
				},
			},
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
			after: {
				audio: "olhuiyun",
				trigger: { global: "useCardAfter" },
				charlotte: true,
				forced: true,
				direct: true,
				filter: function (event, player) {
					return event.card.name == "huogong" && event.card.storage && event.card.storage.olhuiyun && event.targets.some(i => i.isIn());
				},
				content: function () {
					"step 0";
					var choices = [];
					var choiceList = ["使用展示牌，然后重铸所有手牌", "使用一张手牌，然后重铸展示牌", "摸一张牌"];
					for (var i = 1; i <= 3; i++) {
						if (!player.getStorage("olhuiyun_used").includes(i)) choices.push("选项" + get.cnNumber(i, true));
						else choiceList[i - 1] = '<span style="opacity:0.5">' + choiceList[i - 1] + "</span>";
					}
					if (!choices.length) event.finish();
					else {
						player.logSkill("olhuiyun_after");
						player
							.chooseControl(choices)
							.set("choiceList", choiceList)
							.set("prompt", "晖云：选择一项，令" + get.translation(trigger.targets) + "可以选择执行")
							.set("ai", () => {
								return _status.event.choice;
							})
							.set(
								"choice",
								(function () {
									if (choices.length == 1) return choices[0];
									var choicesx = choices.slice();
									if (get.attitude(player, trigger.targets[0]) > 0 && choices.includes("选项三")) return "选项三";
									choicesx.remove("选项三");
									return choicesx.randomGet();
								})()
							);
					}
					"step 1";
					if (result.control != "cancel2") {
						var index = ["选项一", "选项二", "选项三"].indexOf(result.control) + 1;
						event.index = index;
						game.log(player, "选择了", "#y" + result.control);
						player.addTempSkill("olhuiyun_used", "roundStart");
						player.markAuto("olhuiyun_used", [index]);
						event.targets = trigger.targets.slice(0);
					} else event.finish();
					"step 2";
					var target = targets.shift();
					event.target = target;
					if (target.isIn()) {
						var cards = target.getCards("h", card => card.hasGaintag("olhuiyun_tag"));
						if (event.index == 3) {
							target.chooseBool("是否摸一张牌？").set("ai", () => true);
							event.goto(5);
						} else if (event.index == 1 && cards.length) {
							target.chooseToUse({
								filterCard: function (card) {
									if (get.itemtype(card) != "card" || !card.hasGaintag("olhuiyun_tag")) return false;
									return lib.filter.filterCard.apply(this, arguments);
								},
								prompt: "是否使用一张展示牌，然后重铸所有手牌？",
								addCount: false,
							});
						} else if (event.index == 2) {
							target.chooseToUse({
								filterCard: function (card) {
									if (get.itemtype(card) != "card" || (get.position(card) != "h" && get.position(card) != "s")) return false;
									return lib.filter.filterCard.apply(this, arguments);
								},
								prompt: "是否使用一张手牌，然后重铸展示牌？",
								addCount: false,
							});
							event.goto(4);
						} else event.goto(6);
					} else event.goto(6);
					"step 3";
					if (result.bool) {
						var hs = target.getCards("h", lib.filter.cardRecastable);
						if (hs.length) {
							target.recast(hs);
						}
					}
					event.goto(6);
					"step 4";
					if (result.bool) {
						var hs = target.getCards("h", card => {
							if (!card.hasGaintag("olhuiyun_tag")) return false;
							return target.canRecast(card);
						});
						if (hs.length) {
							target.recast(hs);
						}
					}
					event.goto(6);
					"step 5";
					if (result.bool) {
						target.draw();
					}
					"step 6";
					if (targets.length) event.goto(2);
				},
			},
			record: {
				trigger: { global: "showCardsEnd" },
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					if (event.getParent().name != "huogong") return false;
					var card = event.getParent(2).card;
					if (card && card.storage && card.storage.olhuiyun) return true;
					return false;
				},
				content: function () {
					game.broadcastAll(function (cards) {
						cards.forEach(card => card.addGaintag("olhuiyun_tag"));
					}, trigger.cards);
				},
			},
		},
	},
	//王瓘
	olmiuyan: {
		audio: 2,
		enable: "chooseToUse",
		viewAsFilter: function (player) {
			return player.hasCard(card => get.color(card) == "black", "hes");
		},
		viewAs: { name: "huogong" },
		filterCard: { color: "black" },
		position: "hes",
		check: function (card) {
			var player = _status.event.player,
				suits = lib.suit.slice(0);
			if (
				player.countCards("h") > 4 &&
				player.hasCard(function (card) {
					suits.remove(get.suit(card));
					return suits.length == 0;
				}, "h")
			)
				return 8 - get.value(card);
			return 4 - get.value(card);
		},
		promptfunc: function () {
			if (_status.event.player.storage.olmiuyan) return "转换技。你可以将一张黑色牌当做【火攻】使用。若此牌未造成伤害，则你令此技能失效直到本轮结束。";
			return "转换技。你可以将一张黑色牌当做【火攻】使用。若此牌造成了伤害，则你获得此阶段内所有被展示过的牌。";
		},
		precontent: function () {
			player.changeZhuanhuanji("olmiuyan");
			var card = event.result.card;
			if (!card.storage) card.storage = {};
			if (player.storage.olmiuyan) {
				card.storage.olmiuyan_gain = true;
				player.addTempSkill("olmiuyan_gain");
			} else {
				card.storage.olmiuyan_remove = true;
				player.addTempSkill("olmiuyan_remove");
			}
		},
		init: function (player) {
			player.addSkill("olmiuyan_counter");
		},
		onremove: function (player) {
			player.removeSkill("olmiuyan_counter");
		},
		zhuanhuanji: true,
		mark: true,
		marktext: "☯",
		ai: {
			order: function (item, player) {
				if (player.storage.olmiuyan) return 1;
				return 8;
			},
		},
		intro: {
			content: function (storage) {
				if (storage) return "转换技。你可以将一张黑色牌当做【火攻】使用。然后若此牌未造成伤害，则你令此技能失效直到本轮结束。";
				return "转换技。你可以将一张黑色牌当做【火攻】使用。然后若此牌造成了伤害，则你获得此阶段内所有被展示过的牌。";
			},
		},
		subSkill: {
			counter: {
				trigger: {
					global: ["showCardsEnd", "phaseZhunbeiBefore", "phaseJudgeBefore", "phaseDrawBefore", "phaseUseBefore", "phaseDiscardBefore", "phaseJieshuBefore"],
				},
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					if (event.name == "showCards") return get.itemtype(event.cards) == "cards";
					return true;
				},
				content: function () {
					if (trigger.name == "showCards") {
						game.broadcastAll(function (cards) {
							cards.forEach(card => card.addGaintag("olmiuyan_tag"));
						}, trigger.cards);
					} else game.players.forEach(current => current.removeGaintag("olmiuyan_tag"));
				},
			},
			gain: {
				trigger: { player: "useCardAfter" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return (
						event.card.storage &&
						event.card.storage.olmiuyan_gain &&
						player.hasHistory("sourceDamage", function (evt) {
							return evt.card == event.card;
						}) &&
						game.hasPlayer(function (current) {
							return current != player && current.hasCard(card => card.hasGaintag("olmiuyan_tag"));
						})
					);
				},
				logTarget: function (event, player) {
					return game.filterPlayer(function (current) {
						return current != player && current.hasCard(card => card.hasGaintag("olmiuyan_tag"));
					});
				},
				content: function () {
					var cards = [],
						players = game.filterPlayer(current => current != player).sortBySeat();
					players.forEach(current => {
						var cardsx = current.getCards("h", function (card) {
							return card.hasGaintag("olmiuyan_tag");
						});
						if (cardsx.length) cards.addArray(cardsx);
					});
					player.gain(cards, "give");
				},
			},
			remove: {
				trigger: { player: "useCardAfter" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return (
						event.card.storage &&
						event.card.storage.olmiuyan_remove &&
						!player.hasHistory("sourceDamage", function (evt) {
							return evt.card == event.card;
						})
					);
				},
				content: function () {
					player.tempBanSkill("olmiuyan", "roundStart");
				},
			},
		},
	},
	olshilu: {
		audio: 2,
		trigger: { player: "damageEnd" },
		forced: true,
		filter: function (event, player) {
			return player.hp > 0;
		},
		content: function () {
			"step 0";
			player.draw(Math.min(5, player.hp));
			"step 1";
			var targets = game.filterPlayer(current => current != player && current.countCards("h") > 0 && player.inRange(current));
			if (targets.length > 0) {
				if (targets.length == 1) event._result = { bool: true, targets: targets };
				else
					player
						.chooseTarget(true, "请选择一名攻击范围内的角色", "然后你选择该角色的一张手牌，令此牌视为【杀】", function (card, player, target) {
							return target != player && target.countCards("h") > 0 && player.inRange(target);
						})
						.set("ai", function (target) {
							return -get.attitude(_status.event.player, target);
						});
			} else event.finish();
			"step 2";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.line(target, "green");
				player.choosePlayerCard(target, true, "h");
			}
			"step 3";
			if (result.bool) {
				target.addSkill("olshilu_viewas");
				target.showCards(result.cards);
				target.addGaintag(result.cards, "olshilu");
			}
		},
		ai: {
			maixie: true,
		},
		subSkill: {
			viewas: {
				mod: {
					cardname: function (card) {
						if (get.itemtype(card) == "card" && card.hasGaintag("olshilu")) return "sha";
					},
				},
				charlotte: true,
			},
		},
	},
	//张翼
	oldianjun: {
		audio: 2,
		trigger: { player: "phaseEnd" },
		forced: true,
		content: function () {
			"step 0";
			player.damage("nosource");
			"step 1";
			trigger.phaseList.splice(trigger.num, 0, "phaseUse|oldianjun");
		},
		ai: {
			combo: "olkangrui",
			halfneg: true,
		},
	},
	olkangrui: {
		audio: 2,
		init: () => {
			game.addGlobalSkill("olkangrui_ai");
		},
		onremove: () => {
			if (!game.hasPlayer(i => i.hasSkill("olkangrui", null, null, false), true)) game.removeGlobalSkill("olkangrui_ai");
		},
		trigger: { global: "damageEnd" },
		filter: function (event, player) {
			return event.player == _status.currentPhase && event.player.getHistory("damage").indexOf(event) == 0;
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseControl("cancel2")
				.set("choiceList", ["令" + get.translation(trigger.player) + "回复1点体力，且造成伤害时本回合手牌上限为0", "令" + get.translation(trigger.player) + "于本回合下次造成的伤害+1，且造成伤害时本回合手牌上限为0"])
				.set("prompt", get.prompt("olkangrui", trigger.player))
				.set("ai", () => {
					return _status.event.choice;
				})
				.set(
					"choice",
					(function () {
						if (get.attitude(player, trigger.player) <= 0) return "cancel2";
						if (!trigger.player.isDamaged()) return "选项二";
						var list = [];
						if (trigger.player.hp + trigger.player.countCards("hs", "tao") <= 2) list.push("选项一");
						if (
							trigger.player.hasCard(card => {
								if (!get.tag(card, "damage")) return false;
								if (
									game.hasPlayer(current => {
										return (
											get.effect(current, card, trigger.player, player) > 0 &&
											trigger.player.canUse(card, current) &&
											!current.hasSkillTag("filterDamage", null, {
												player: trigger.player,
												card: card,
											})
										);
									}, "hs")
								) {
									return true;
								}
							})
						)
							list.push("选项二");
						if (list.length) return list.randomGet();
						return "选项一";
					})()
				);
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("olkangrui", trigger.player);
				player.draw();
				if (result.index == 0) {
					trigger.player.recover();
					trigger.player.addTempSkill("olkangrui_nil");
				} else {
					trigger.player.addTempSkill("olkangrui_add");
					trigger.player.addMark("olkangrui_add", 1, false);
				}
			}
		},
		ai: {
			expose: 0.2,
			threaten: 1.5,
		},
		subSkill: {
			add: {
				trigger: { source: "damageBegin1" },
				charlotte: true,
				forced: true,
				onremove: ["olkangrui_add", "olkangrui_nil"],
				filter: function (event, player) {
					return player.hasMark("olkangrui_add");
				},
				content: function () {
					trigger.num += player.countMark("olkangrui_add");
					player.removeMark("olkangrui_add", player.countMark("olkangrui_add"), false);
					player.storage.olkangrui_nil = true;
					game.log(player, "本回合手牌上限基数为", "#g0");
				},
				mod: {
					maxHandcardBase: function (player, num) {
						if (player.storage.olkangrui_nil) return 0;
					},
				},
			},
			nil: {
				trigger: { source: "damageBegin1" },
				charlotte: true,
				forced: true,
				onremove: true,
				filter: function (event, player) {
					return !player.storage.olkangrui_nil;
				},
				content: function () {
					player.storage.olkangrui_nil = true;
					game.log(player, "本回合手牌上限基数为", "#g0");
				},
				mod: {
					maxHandcardBase: function (player, num) {
						if (player.storage.olkangrui_nil) return 0;
					},
				},
			},
			ai: {
				trigger: { player: "dieAfter" },
				filter: () => {
					return !game.hasPlayer(i => i.hasSkill("olkangrui", null, null, false), true);
				},
				silent: true,
				forceDie: true,
				content: () => {
					game.removeGlobalSkill("olkangrui_ai");
				},
				ai: {
					effect: {
						target: function (card, player, target) {
							if (target != player || !get.tag(card, "damage")) return;
							var list = game.filterPlayer(current => current.hasSkill("olkangrui") && get.attitude(current, player) > 0);
							var history = player.getHistory("damage");
							if (!list.length || history.length != 0) return;
							return [1, 2];
						},
					},
				},
			},
		},
	},
	//朱儁
	olcuipo: {
		audio: 2,
		trigger: { player: "useCard" },
		forced: true,
		filter: function (event, player) {
			return get.cardNameLength(event.card) == player.getHistory("useCard").indexOf(event) + 1;
		},
		content: function () {
			var card = trigger.card;
			if (card.name == "sha" || (get.type(card) == "trick" && get.tag(card, "damage") > 0)) trigger.baseDamage++;
			else player.draw();
		},
		/*
		trigger:{source:'damageBegin1'},
		forced:true,
		filter:function(event,player){
			var card=event.card;
			if(player!=_status.currentPhase||!card||event.getParent().type!='card') return false;
			return get.cardNameLength(card)==player.getHistory('useCard').indexOf(event.getParent(2))+1;
		},
		content:function(){
			trigger.num++;
		},*/
		mod: {
			aiOrder: function (player, card, num) {
				if (typeof card == "object" && get.cardNameLength(card) == player.getHistory("useCard").length + 1) return num + 10;
			},
		},
	},
	//马休马铁
	rekenshang: {
		audio: "olkenshang",
		enable: "chooseToUse",
		filterCard: true,
		selectCard: [2, Infinity],
		viewAsFilter: function (player) {
			return player.countCards("hes") > 1;
		},
		check: function (card) {
			var player = _status.event.player;
			if (
				game.countPlayer(function (current) {
					return current != player && player.canUse("sha", current) && get.effect(current, { name: "sha" }, player, player) > 0;
				}) <= ui.selected.cards.length
			)
				return 0;
			if (_status.event.player.countCards("hes") >= 3) return 8 - ui.selected.cards.length - get.value(card);
			return 6 - ui.selected.cards.length - get.value(card);
		},
		position: "hes",
		viewAs: {
			name: "sha",
			storage: { olkenshang: true },
		},
		onuse: function (links, player) {
			player.addTempSkill("rekenshang_effect");
		},
		ai: {
			order: function (item, player) {
				if (player.countCards("hes") >= 3) return 6;
				return 4;
			},
			result: {
				target: function (player, target, card, isLink) {
					let eff = -1.5,
						odds = 1.35,
						num = 1;
					if (isLink) {
						let cache = _status.event.getTempCache("sha_result", "eff");
						if (typeof cache !== "object" || cache.card !== get.translation(card)) return eff;
						if (cache.odds < 1.35 && cache.bool) return 1.35 * cache.eff;
						return cache.odds * cache.eff;
					}
					if (
						player.hasSkill("jiu") ||
						player.hasSkillTag("damageBonus", true, {
							target: target,
							card: card,
						})
					) {
						if (
							target.hasSkillTag("filterDamage", null, {
								player: player,
								card: card,
								jiu: true,
							})
						)
							eff = -0.5;
						else {
							num = 2;
							if (get.attitude(player, target) > 0) eff = -7;
							else eff = -4;
						}
					}
					if (
						!player.hasSkillTag(
							"directHit_ai",
							true,
							{
								target: target,
								card: card,
							},
							true
						)
					)
						odds -=
							0.7 *
							target.mayHaveShan(
								player,
								"use",
								target.getCards("h", i => {
									return i.hasGaintag("sha_notshan");
								}),
								"odds"
							);
					_status.event.putTempCache("sha_result", "eff", {
						bool: target.hp > num && get.attitude(player, target) > 0,
						card: get.translation(card),
						eff: eff,
						odds: odds,
					});
					return odds * eff;
				},
			},
			respondSha: true,
			skillTagFilter: player => player.countCards("hes") > 1,
		},
		subSkill: {
			effect: {
				audio: "olkenshang",
				trigger: { player: "useCard2" },
				charlotte: true,
				group: "rekenshang_after",
				direct: true,
				filter: function (event, player) {
					return (
						event.card.storage &&
						event.card.storage.olkenshang &&
						game.countPlayer(function (current) {
							return current != player && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
						}) >= event.cards.length
					);
				},
				content: function () {
					"step 0";
					player
						.chooseTarget(trigger.cards.length, "是否更改" + get.translation(trigger.card) + "的目标？", "选择" + get.cnNumber(trigger.cards.length) + "名角色作为" + get.translation(trigger.card) + "的目标，覆盖原先存在的目标", function (card, player, target) {
							var evt = _status.event.getTrigger();
							return target != player && lib.filter.targetEnabled2(evt.card, player, target) && lib.filter.targetInRange(evt.card, player, target);
						})
						.set("ai", function (target) {
							var evt = _status.event.getTrigger();
							return get.effect(target, evt.card, evt.player, evt.player);
						});
					"step 1";
					if (result.bool) {
						if (player != event.player && !player.isOnline()) game.delayx();
					} else event.finish();
					"step 2";
					var targets = result.targets;
					player.logSkill("rekenshang_effect", targets);
					trigger.targets.length = 0;
					trigger.targets.addArray(targets);
					game.log(targets, "成为了", trigger.card, "的新目标");
				},
			},
			after: {
				audio: "olkenshang",
				trigger: { player: "useCardAfter" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					if (event.card.name != "sha" || !event.card.storage || !event.card.storage.olkenshang) return false;
					var num = 0;
					game.countPlayer2(current => {
						current.getHistory("damage", evt => {
							if (evt.card == event.card) num += evt.num;
						});
					});
					return num < event.cards.length;
				},
				content: function () {
					player.draw();
				},
			},
		},
	},
	olkenshang: {
		audio: 2,
		enable: "phaseUse",
		filterCard: true,
		selectCard: [1, Infinity],
		check: function (card) {
			return 5.5 - get.value(card);
		},
		position: "hes",
		viewAs: {
			name: "sha",
			storage: { olkenshang: true },
		},
		onuse: function (links, player) {
			player.addTempSkill("olkenshang_effect");
		},
		ai: {
			order: 1,
			threaten: 1.1,
			effect: {
				player_use(card, player, target) {
					if (_status._olkenshang_aiChecking || ui.selected.targets.length) return;
					if (typeof card != "object" || !card.storage || !card.storage.olkenshang) return false;
					_status._olkenshang_aiChecking = true;
					var eff = 0;
					var targets = game.filterPlayer(current => current != player && player.canUse(card, current, false) && !player.inRange(current));
					for (var target of targets) {
						eff += get.effect(target, card, player, player);
					}
					delete _status._olkenshang_aiChecking;
					if (eff > 0) return [0, eff / Math.max(0.01, get.attitude(player, player))];
				},
			},
		},
		subSkill: {
			effect: {
				audio: "olkenshang",
				trigger: { player: "useCard2" },
				charlotte: true,
				logTarget: function (event, player) {
					return game.filterPlayer(current => current != player && player.canUse(event.card, current, false) && !player.inRange(current));
				},
				prompt2: "将此牌目标改为攻击范围外的所有其他角色",
				group: "olkenshang_after",
				check: function (event, player) {
					var eff1 = 0,
						eff2 = 0;
					for (var target of event.targets) {
						eff1 += get.effect(target, event.card, event.player, player);
					}
					var targets = game.filterPlayer(current => current != player && player.canUse(event.card, current, false) && !player.inRange(current));
					for (var target of targets) {
						eff2 += get.effect(target, event.card, event.player, player);
					}
					return eff2 > eff1;
				},
				filter: function (event, player) {
					return event.card.name == "sha" && event.card.storage && event.card.storage.olkenshang && event.targets.length && game.filterPlayer(current => current != player && player.canUse(event.card, current, false) && !player.inRange(current)).length;
				},
				content: function () {
					"step 0";
					trigger.targets.removeArray(trigger.targets);
					var targets = game.filterPlayer(current => current != player && player.canUse(trigger.card, current, false) && !player.inRange(current));
					if (targets.length) trigger.targets.addArray(targets);
				},
			},
			after: {
				audio: "olkenshang",
				trigger: { player: "useCardAfter" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					if (event.card.name != "sha" || !event.card.storage || !event.card.storage.olkenshang) return false;
					var num = 0;
					game.countPlayer2(current => {
						current.getHistory("damage", evt => {
							if (evt.card == event.card) num += evt.num;
						});
					});
					return num > 0;
				},
				content: function () {
					"step 0";
					var num = 0,
						len = trigger.cards.length;
					game.countPlayer2(current => {
						current.getHistory("damage", evt => {
							if (evt.card == trigger.card) num += evt.num;
						});
					});
					if (len > num) {
						player.draw(num);
						event.finish();
					} else {
						var skills = player.getSkills(null, false, false).filter(skill => {
							var info = get.info(skill);
							if (!info || info.charlotte || get.skillInfoTranslation(skill, player).length == 0) return false;
							return true;
						});
						if (skills.length == 1) event._result = { control: skills[0] };
						else
							player
								.chooseControl(skills)
								.set(
									"choiceList",
									skills.map(i => {
										return '<div class="skill">【' + get.translation(lib.translate[i + "_ab"] || get.translation(i).slice(0, 2)) + "】</div><div>" + get.skillInfoTranslation(i, player) + "</div>";
									})
								)
								.set("displayIndex", false)
								.set("prompt", "垦伤：选择失去一个技能")
								.set("ai", () => {
									var choices = _status.event.controls.slice();
									var negs = choices.filter(i => {
										var info = get.info(i);
										if (!info || !info.ai) return false;
										return info.ai.neg || info.ai.halfneg;
									});
									if (negs.length) return negs.randomGet();
									if (choices.includes("mashu")) return "mashu";
									return choices.randomGet();
								});
					}
					"step 1";
					player.removeSkills(result.control);
				},
			},
		},
	},
	//董荼那
	oljianman: {
		audio: 2,
		trigger: { global: "phaseEnd" },
		forced: true,
		direct: true,
		filter: function (event, player) {
			var history = game.getGlobalHistory("useCard", evt => {
				return get.type(evt.card) == "basic";
			});
			if (history.length < 2) return false;
			var users = history.slice(0, 2).map(i => i.player);
			var list = users.filter(user => user == player);
			if (list.length == 1) {
				var target = users.filter(user => user != player)[0];
				return target && target.isIn() && target.countDiscardableCards(player, "he");
			}
			if (list.length == 2) {
				return history.slice(0, 2).some(evt => {
					var card = evt.card;
					return player.hasUseTarget({
						name: card.name,
						nature: card.nature,
						isCard: true,
					});
				});
			}
			return false;
		},
		content: function () {
			"step 0";
			var history = game.getGlobalHistory("useCard", evt => {
				return get.type(evt.card) == "basic";
			});
			var list = history
				.slice(0, 2)
				.map(i => i.player)
				.filter(user => user == player);
			if (list.length == 1) {
				var users = history.slice(0, 2).map(i => i.player);
				var target = users.filter(user => user != player)[0];
				player.logSkill("oljianman", target);
				player.discardPlayerCard(target, "he", true);
				event.finish();
			} else if (list.length == 2) {
				var evts = history.slice(0, 2);
				var vcard = [];
				for (var evt of evts) {
					var card = evt.card;
					if (vcard.length && vcard[0][2] == card.name && vcard[0][3] == card.nature) continue;
					if (player.hasUseTarget({ name: card.name, nature: card.nature, isCard: true })) {
						vcard.push(["基本", "", card.name, card.nature]);
					}
				}
				if (vcard.length == 1) event._result = { bool: true, links: [vcard[0]] };
				else {
					player.chooseButton(["鹣蛮：视为使用其中一张牌", [vcard, "vcard"]]).set("ai", function (button) {
						return _status.event.player.getUseValue({
							name: button.link[2],
							nature: button.link[3],
						});
					});
				}
			} else event.finish();
			"step 1";
			if (result.bool) {
				var card = { name: result.links[0][2], nature: result.links[0][3], isCard: true };
				player
					.chooseUseTarget(card, true)
					.set("logSkill", "oljianman")
					.set("prompt", "鹣蛮：选择" + get.translation(card) + "的目标");
			}
		},
	},
	//张华
	olbihun: {
		audio: 2,
		trigger: { player: "useCardToPlayer" },
		forced: true,
		filter: function (event, player) {
			return event.isFirstTarget && player.countCards("h") > player.getHandcardLimit() && event.targets.some(target => target != player);
		},
		//group:'olbihun_give',
		content: function () {
			if (trigger.targets.length == 1) {
				var cards = trigger.cards.filterInD();
				if (cards.length) {
					game.delayx();
					trigger.targets[0].gain(cards, "gain2");
				}
			}
			var targets = trigger.targets.filter(target => target != player);
			trigger.targets.removeArray(targets);
			trigger.getParent().triggeredTargets1.removeArray(targets);
		},
		ai: {
			threaten: 0.8,
			neg: true,
			effect: {
				player(card, player, target) {
					if ((!card.isCard || !card.cards) && get.itemtype(card) != "card") return;
					let cs = 0;
					if (
						target &&
						player != target &&
						player.countCards("h", i => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								cs++;
								return false;
							}
							return true;
						}) > player.getHandcardLimit()
					) {
						let targets = [],
							evt = _status.event.getParent("useCard");
						targets.addArray(ui.selected.targets);
						if (evt && evt.card == card) targets.addArray(evt.targets);
						if (targets.length) {
							if (targets.length > 1 || !targets.includes(target)) return "zeroplayertarget";
							return;
						}
						let info = get.info(card);
						if (!info || info.notarget || !info.filterTarget) return;
						let range,
							select = get.copy(info.selectTarget),
							filter;
						if (select === undefined) range = [1, 1];
						else if (typeof select === "number") range = [select, select];
						else if (get.itemtype(select) === "select") range = select;
						else if (typeof select === "function") range = select(card, player);
						if (info.singleCard) range = [1, 1];
						game.checkMod(card, player, range, "selectTarget", player);
						if (range[1] < -1) range = [1, 1];
						else if (range[0] < 0) {
							if (info.filterTarget === true) filter = game.players.length;
							else
								filter = game.countPlayer(current => {
									return info.filterTarget(card, player, current);
								});
							range = [filter, filter];
						}
						if (range && range[0] > 1 && range[1] > 1) return "zeroplayertarget";
						return [0, 0, 0, 1];
					}
				},
			},
		},
		/*subSkill:{
			give:{
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					return event._olbihun&&event._olbihun.isIn()&&event.cards.filterInD().length;
				},
				forced:true,
				popup:false,
				content:function(){
					trigger._olbihun.gain(trigger.cards.filterInD(),'gain2');
				}
			}
		}*/
	},
	olchuanwu: {
		audio: 2,
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		forced: true,
		filter: function (event, player) {
			return player.getAttackRange() > 0;
		},
		content: function () {
			var skills = game.filterSkills(
				player.getStockSkills(true, true).filter(skill => {
					const info = get.info(skill);
					return !info.persevereSkill || !info.charlotte;
				}),
				player
			);
			var num = Math.min(player.getAttackRange(), skills.length);
			skills = skills.slice(0, num);
			player.disableSkill("olchuanwu", skills);
			player.addTempSkill("olchuanwu_restore");
			var str = "";
			for (var i of skills) {
				str += "【" + get.translation(i) + "】、";
				player.popup(i);
			}
			str = str.slice(0, -1);
			game.log(player, "的技能", "#g" + str, "失效了");
			player.draw(num);
		},
		subSkill: {
			restore: {
				charlotte: true,
				forced: true,
				popup: false,
				onremove: function (player) {
					player.enableSkill("olchuanwu");
					game.log(player, "恢复了技能");
				},
			},
		},
	},
	oljianhe: {
		audio: 2,
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			return !player.getStorage("oljianhe_used").includes(target);
		},
		filterCard: function (card, player) {
			if (ui.selected.cards.length) {
				var cardx = ui.selected.cards[0];
				if (get.type(cardx) == "equip") return get.type(card) == "equip";
				return get.name(card) == get.name(cardx);
			}
			var cards = player.getCards("he");
			for (var cardx of cards) {
				if (card != cardx) {
					if (get.type(cardx) == "equip" && get.type(card) == "equip") return true;
					if (get.name(card) == get.name(cardx)) return true;
				}
			}
			return false;
		},
		selectCard: [2, Infinity],
		position: "he",
		complexCard: true,
		discard: false,
		lose: false,
		delay: 0.5,
		check: function (card) {
			if (get.type(card) == "equip") return 15 - get.value(card);
			return 7 - get.value(card);
		},
		content: function () {
			"step 0";
			event.type = get.type2(cards[0], player);
			player.recast(cards);
			player.addTempSkill("oljianhe_used", "phaseUseAfter");
			player.markAuto("oljianhe_used", [target]);
			"step 1";
			const type = event.type;
			target
				.chooseCard(get.translation(player) + "对你发动了【剑合】", "请重铸" + get.cnNumber(cards.length) + "张" + get.translation(type) + "牌，或点“取消”受到1点雷电伤害", cards.length, "he", (card, player) => {
					return get.type2(card) == _status.event.type && player.canRecast(card);
				})
				.set("ai", card => {
					if (_status.event.goon) return (get.type(card) == "equip" ? 15 : 7) - get.value(card);
					return 0;
				})
				.set("type", type)
				.set("goon", get.damageEffect(target, player, target, "thunder") < 0);
			"step 2";
			if (result.bool) {
				target.recast(result.cards);
			} else {
				target.damage(player, "thunder");
			}
			"step 3";
			game.delayx();
		},
		ai: {
			order: function (item, player) {
				if (player.hasSkill("olbihun") && player.countCards("h") > player.getHandcardLimit()) return 11;
				return 4;
			},
			threaten: 2.4,
			expose: 0.1,
			result: {
				target: function (player, target) {
					var cards = ui.selected.cards,
						type = get.type2(cards[0]);
					if (
						target.countCards("he", card => {
							return get.type(card) == type && get.value(card) <= 5;
						}) >= cards.length
					)
						return 1;
					return -1;
				},
			},
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
				intro: { content: "本阶段已对$发动过技能" },
			},
		},
	},
	//屈晃
	olqiejian: {
		audio: 2,
		trigger: {
			global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		direct: true,
		filter: function (event, player) {
			return game.hasPlayer(current => {
				if (current.countCards("h")) return false;
				var evt = event.getl(current);
				return evt && evt.hs && evt.hs.length && !player.getStorage("olqiejian_ban").includes(current);
			});
		},
		content: function () {
			"step 0";
			event.targets = game
				.filterPlayer(current => {
					if (current.countCards("h")) return false;
					var evt = trigger.getl(current);
					return evt && evt.hs && evt.hs.length && !player.getStorage("olqiejian_ban").includes(current);
				})
				.sortBySeat(_status.currentPhase);
			"step 1";
			var target = targets.shift();
			event.target = target;
			if (target.isIn()) {
				player
					.chooseBool(get.prompt2("olqiejian", target))
					.set("ai", () => {
						return _status.event.bool;
					})
					.set(
						"bool",
						get.attitude(player, target) > 0 ||
							target.hasCard(card => {
								return get.value(card, target) * get.sgnAttitude(player, target) < -6;
							}, "ej")
					);
			} else event.goto(5);
			"step 2";
			if (result.bool) {
				player.logSkill("olqiejian", target);
				player.draw("nodelay");
				target.draw();
			} else event.goto(5);
			"step 3";
			player
				.chooseTarget("切谏：选择一名角色", "弃置你或其场上的一张牌；或点击“取消”令你于本轮不能再对其发动此技能", (card, player, target) => {
					return (target == player || target == _status.event.getParent().target) && target.countDiscardableCards(player, "ej") > 0;
				})
				.set("ai", target => {
					var sign = get.sgnAttitude(_status.event.player, target);
					return (
						6 -
						target
							.getCards("ej")
							.map(i => {
								var val = 0;
								if (get.position(i) == "e") val = get.value(i, target);
								else {
									val = get.effect(
										player,
										{
											name: i.viewAs || i.name,
											cards: [i],
										},
										target,
										target
									);
								}
								return sign * val;
							})
							.sort((a, b) => a - b)[0]
					);
				});
			"step 4";
			if (result.bool) {
				var targetx = result.targets[0];
				player.discardPlayerCard(targetx, "ej", true);
			} else {
				player.addTempSkill("olqiejian_ban", "roundStart");
				player.markAuto("olqiejian_ban", [target]);
			}
			"step 5";
			if (targets.length) event.goto(1);
		},
		subSkill: {
			ban: {
				onremove: true,
				charlotte: true,
				intro: {
					content: "本轮不能再对$发动〖切谏〗",
				},
			},
		},
	},
	olnishou: {
		audio: 2,
		trigger: {
			player: "loseAfter",
			global: ["loseAsyncAfter", "equipAfter"],
		},
		forced: true,
		filter: function (event, player) {
			var phaseName;
			for (var name of lib.phaseName) {
				var evt = event.getParent(name);
				if (!evt || evt.name != name) continue;
				phaseName = name;
			}
			var cards = event.getd(player, "es");
			return (
				cards.length &&
				(cards.some(card => {
					if (get.position(card, true) != "d") return false;
					return player.hasUseTarget(get.autoViewAs({ name: "shandian" }, [card]));
				}) ||
					(phaseName && !player.hasSkill("olnishou_swap")))
			);
		},
		direct: true,
		content: function () {
			"step 0";
			var cards = trigger.getd(player, "es");
			var choices = [];
			var choiceList = ["将" + (cards.length ? get.translation(cards[0]) : "这些牌中第一张能当【闪电】对你使用的牌") + "当【闪电】使用", "本阶段结束时，你与一名手牌数最少的角色交换手牌"];
			cards = cards.filter(card => {
				if (get.position(card, true) != "d") return false;
				return player.hasUseTarget(get.autoViewAs({ name: "shandian" }, [card]));
			});
			event.cards = cards;
			var phaseName;
			for (var name of lib.phaseName) {
				var evt = trigger.getParent(name);
				if (!evt || evt.name != name) continue;
				phaseName = name;
			}
			if (cards.length) choices.push("选项一");
			else choiceList[0] = '<span style="opacity:0.5">' + choiceList[0] + "</span>";
			if (phaseName && !player.hasSkill("olnishou_swap")) choices.push("选项二");
			else choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "</span>";
			event.phaseName = phaseName;
			if (!choices.length) event.finish();
			else
				player
					.chooseControl(choices)
					.set("choiceList", choiceList)
					.set("prompt", "泥首：选择一项")
					.set("ai", () => 0);
			"step 1";
			player.logSkill("olnishou");
			game.log(player, "选择了", "#y" + result.control);
			if (result.control == "选项一") {
				var card = cards[0];
				player.chooseUseTarget({ name: "shandian" }, [card], true);
			} else {
				var name = event.phaseName;
				player.storage.olnishou_swap = name;
				player.addTempSkill("olnishou_swap", name + "After");
			}
		},
		ai: {
			neg: true,
		},
		subSkill: {
			swap: {
				audio: "olnishou",
				charlotte: true,
				forced: true,
				direct: true,
				onremove: true,
				trigger: {
					global: ["phaseZhunbeiEnd", "phaseJudgeEnd", "phaseDrawEnd", "phaseUseEnd", "phaseDiscardEnd", "phaseJieshuEnd"],
				},
				content: function () {
					"step 0";
					if (trigger.name != player.storage.olnishou_swap || !event.player.isIn()) {
						player.removeSkill("olnishou_swap");
						event.finish();
						return;
					}
					player.chooseTarget("泥首：与一名手牌数最少的角色交换手牌", true, (card, player, target) => {
						return target.isMinHandcard();
					});
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.logSkill("olnishou_swap", target);
						if (target != player) {
							player.swapHandcards(target);
						}
					}
					"step 2";
					player.removeSkill("olnishou_swap");
				},
			},
		},
	},
	//马承
	olchenglie: {
		audio: 2,
		trigger: { player: "useCard2" },
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			return game.hasPlayer(function (current) {
				return !event.targets.includes(current) && player.canUse(event.card, current);
			});
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("olchenglie"), "为" + get.translation(trigger.card) + "多指定至多两个目标，并发动后续效果", [1, 2], (card, player, target) => {
					var evt = _status.event.getTrigger();
					return !evt.targets.includes(target) && player.canUse(evt.card, target);
				})
				.set("ai", function (target) {
					var player = _status.event.player,
						evt = _status.event.getTrigger();
					return get.effect(target, evt.card, player, player);
				});
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.targets = result.targets;
			} else event.finish();
			"step 2";
			player.logSkill("olchenglie", targets);
			trigger.targets.addArray(targets);
			var targets = trigger.targets;
			event.targets = targets;
			event.given = [];
			var cards = get.cards(targets.length);
			event.cards = cards.slice();
			player.showCards(event.cards, get.translation(player) + "发动了【骋烈】");
			while (cards.length) ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
			"step 3";
			game.updateRoundNumber();
			var hs = player.getCards("h");
			var next = player.chooseToMove("骋烈：是否交换一张牌？");
			next.set("list", [
				["〖骋烈〗展示", event.cards, "olchenglie"],
				["你的手牌", hs],
			]);
			next.set("filterMove", function (from, to, moved) {
				if (typeof to == "number") return false;
				var player = _status.event.player;
				var hs = player.getCards("h");
				var changed = hs.filter(function (card) {
					return !moved[1].includes(card);
				});
				var changed2 = moved[1].filter(function (card) {
					return !hs.includes(card);
				});
				if (changed.length < 1) return true;
				var pos1 = moved[0].includes(from.link) ? 0 : 1,
					pos2 = moved[0].includes(to.link) ? 0 : 1;
				if (pos1 == pos2) return true;
				if (pos1 == 0) {
					if (changed.includes(from.link)) return true;
					return changed2.includes(to.link);
				}
				if (changed2.includes(from.link)) return true;
				return changed.includes(to.link);
			});
			next.set("processAI", function (list) {
				var cards1 = list[0][1].slice(),
					cards2 = list[1][1].slice();
				var card1 = cards1.sort((a, b) => get.value(b) - get.value(a))[0];
				var card2 = cards2.sort((a, b) => get.value(a) - get.value(b))[0];
				if (card1 && card2 && get.value(card1) > get.value(card2)) {
					cards1.remove(card1);
					cards2.remove(card2);
					cards1.push(card2);
					cards2.push(card1);
				}
				return [cards1, cards2];
			});
			"step 4";
			var moved = result.moved;
			var hs = player.getCards("h"),
				ts = event.cards;
			var card1, card2;
			for (var i of moved[0]) {
				if (!ts.includes(i)) card1 = i;
			}
			for (var i of moved[1]) {
				if (!hs.includes(i)) card2 = i;
			}
			if (card1 && card2) {
				player.$throw(1, 1000);
				event.cards.forEach((i, ind, arr) => {
					if (i == card2) arr[ind] = card1;
				});
				player
					.lose(card1, ui.cardPile)
					.set("insert_index", event => event.cardx)
					.set("cardx", card2);
				player.gain(card2, "draw");
				game.log(player, "交换了一张牌");
			}
			"step 5";
			game.cardsGotoOrdering(event.cards);
			"step 6";
			if (event.cards.length == 1) event._result = { bool: true, links: event.cards };
			else player.chooseButton(["骋烈：将这些牌置于目标角色的武将牌上", event.cards], true);
			game.updateRoundNumber();
			"step 7";
			if (result.bool) {
				var card = result.links[0];
				event.card = card;
				player
					.chooseTarget("将" + get.translation(card) + "置于一名目标角色的武将牌上", true, (card, player, target) => {
						return _status.event.getTrigger().targets.includes(target) && !_status.event.getParent().given.includes(target);
					})
					.set("ai", target => {
						var color = _status.event.color,
							player = _status.event.player;
						var evt = _status.event.getTrigger();
						if (color == "red") {
							var eff = get.effect(target, evt.card, player, target),
								att = get.attitude(player, target);
							if (eff >= 0 && att < 0) return -1;
							if (eff < 0 && att < 0 && target.hasCard(card => ["shan", "caochuan"].includes(get.name(card)), "hs")) return 10;
						}
						return 1;
					})
					.set("color", get.color(card));
			} else event.finish();
			"step 8";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target);
				event.given.push(target);
				target.addToExpansion(card).gaintag.add("olchenglie");
				player.addTempSkill("olchenglie_effect", "phaseUseAfter");
				if (!trigger.card.storage) trigger.card.storage = {};
				trigger.card.storage.olchenglie = player;
				target.storage.olchenglie_viewer = player;
				event.cards.remove(card);
				var cardx = player == game.me || player.isUnderControl() ? card : 1;
				player.$give(cardx, target, false);
			} else event.finish();
			"step 9";
			if (event.cards.length) event.goto(6);
			else if (!event.isMine() && !event.isOnline()) game.delayx();
		},
		marktext: "骋",
		intro: {
			markcount: "expansion",
			mark: function (dialog, content, player) {
				var content = player.getExpansions("olchenglie");
				if (content && content.length) {
					if (game.me == player.storage.olchenglie_viewer) {
						dialog.addAuto(content);
					} else {
						return "有" + get.cnNumber(content.length) + "张扣置的“骋烈”牌";
					}
				}
			},
			content: function (content, player) {
				var content = player.getExpansions("olchenglie");
				if (content && content.length) {
					if (game.me == player.storage.olchenglie_viewer) {
						return get.translation(content);
					}
					return "有" + get.cnNumber(content.length) + "张扣置的“骋烈”牌";
				}
			},
		},
		subSkill: {
			effect: {
				trigger: { global: "useCardAfter" },
				forced: true,
				charlotte: true,
				forceDie: true,
				popup: false,
				filter: function (event, player) {
					return event.card.storage && event.card.storage.olchenglie;
				},
				content: function () {
					"step 0";
					var targets = game
						.filterPlayer(current => {
							var cards = current.getExpansions("olchenglie");
							return cards.some(i => get.color(i, false) == "red");
						})
						.sortBySeat();
					event.targets = targets;
					var togive = trigger.card.storage.olchenglie;
					event.togive = togive;
					if (!targets.length || !togive.isIn()) event.goto(3);
					"step 1";
					var target = event.targets.shift();
					event.target = target;
					player.line(target);
					if (
						target.hasHistory("useCard", evt => {
							return evt.respondTo && evt.respondTo[1] == trigger.card;
						})
					) {
						if (target.countCards("he")) target.chooseCard("骋烈：交给" + get.translation(event.togive) + "一张牌", true, "he");
					} else {
						target.recover();
					}
					"step 2";
					if (result.bool) {
						target.give(result.cards, event.togive);
					}
					if (targets.length) event.goto(1);
					"step 3";
					game.filterPlayer(current => {
						var cards = current.getExpansions("olchenglie");
						return cards.length;
					}).forEach(i => {
						i.loseToDiscardpile(i.getExpansions("olchenglie"));
						delete i.storage.olchenglie_viewer;
					});
				},
			},
		},
	},
	//新贺齐
	olqizhou: {
		audio: "qizhou",
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter", "phaseBefore"],
		},
		forced: true,
		onremove: true,
		filter: function (event, player) {
			if (event.name != "phase" && (event.name != "equip" || event.player != player)) {
				var evt = event.getl(player);
				if (!evt || !evt.es || !evt.es.length) return false;
			}
			var num = player.countMark("olqizhou");
			return lib.skill.olqizhou.getSuitNum(player) != num;
		},
		content: function () {
			lib.skill.olqizhou.applyChange(player);
		},
		getSuitNum: function (player) {
			var suits = [],
				es = player.getCards("e");
			for (var i of es) suits.add(get.suit(i, player));
			return Math.min(4, suits.length);
		},
		applyChange: function (player) {
			player.removeAdditionalSkill("olqizhou");
			var num = lib.skill.olqizhou.getSuitNum(player);
			player.storage.olqizhou = num;
			if (num > 0) player.addAdditionalSkill("olqizhou", lib.skill.olqizhou.derivation.slice(0, num));
		},
		derivation: ["reduanbing", "reyingzi", "fenwei", "lanjiang"],
	},
	duanbing_heqi: { audio: 1 },
	reyingzi_heqi: { audio: 1 },
	fenwei_heqi: { audio: 1 },
	lanjiang_heqi: { audio: 1 },
	olshanxi: {
		audio: "shanxi",
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return (
				Array.from({ length: 5 })
					.map((_, i) => i + 1)
					.some(i => player.hasEmptySlot(i)) && game.hasPlayer(current => lib.skill.olshanxi.filterTarget(null, player, current))
			);
		},
		filterTarget: function (card, player, target) {
			return target != player && player.countCards("h") + target.countCards("h") > 0 && !player.inRangeOf(target);
		},
		content: function () {
			"step 0";
			var cards1 = player.getCards("h"),
				cards2 = target.getCards("h");
			var num = Array.from({ length: 5 })
				.map((_, i) => i + 1)
				.reduce((sum, i) => sum + player.countEmptySlot(i), 0);
			var dialog = ["闪袭：选择展示至多" + get.cnNumber(num) + "张牌"];
			if (cards1.length > 0) {
				dialog.push('<div class="text center">你的手牌</div>');
				dialog.push(cards1);
			}
			if (cards2.length > 0) {
				dialog.push('<div class="text center">' + get.translation(target) + "的手牌</div>");
				if (player.hasSkillTag("viewHandcard", null, target, true)) dialog.push(cards2);
				else dialog.push([cards2.randomSort(), "blank"]);
			}
			player.chooseButton(dialog, [1, num], true).set("ai", function (button) {
				var player = _status.event.player,
					target = _status.event.getParent().target;
				var card = button.link,
					cards = ui.selected.buttons.map(button => button.link);
				var hs = player.getCards("h"),
					discard = false;
				for (var i of cards) {
					if (hs.includes(i)) {
						discard = true;
						break;
					}
				}
				if (hs.includes(card)) {
					if (discard || get.name(card) != "shan") return 0;
					if (target.hasCard(card => get.value(card, target) > 5, "e")) return 2;
					return 0;
				}
				if (
					discard &&
					!target.hasCard(function (cardx) {
						return cardx != card && !cards.includes(cardx) && get.value(cardx, target) > 0;
					}, "he")
				)
					return 0;
				return 1 + Math.random();
			});
			"step 1";
			if (result.bool) {
				event.cards = result.links;
				var list1 = [],
					list2 = [];
				var hs = player.getCards("h");
				for (var card of result.links) {
					if (hs.includes(card)) {
						list1.push(card);
					} else {
						list2.push(card);
					}
				}
				event.list1 = list1;
				event.list2 = list2;
				event.videoId = lib.status.videoId++;
				game.broadcastAll(
					function (player, target, list1, list2, id) {
						var dialog = ui.create.dialog(player + "对" + target + "发动了【闪袭】");
						dialog.videoId = id;
						if (list1.length > 0) {
							dialog.add('<div class="text center">' + player + "展示的牌</div>");
							dialog.add(list1);
						}
						if (list2.length > 0) {
							dialog.add('<div class="text center">' + target + "被展示的牌</div>");
							dialog.add(list2);
						}
					},
					get.translation(player),
					get.translation(target),
					list1,
					list2,
					event.videoId
				);
				game.delay(4);
			} else event.finish();
			"step 2";
			game.broadcastAll("closeDialog", event.videoId);
			var list1 = event.list1.filter(card => get.name(card, player) == "shan");
			var list2 = event.list2.filter(card => get.name(card, target) == "shan");
			if (list1.length && list2.length) {
				game.loseAsync({
					lose_list: [
						[player, list1],
						[target, list2],
					],
					discarder: player,
				}).setContent("discardMultiple");
			} else if (list2.length) {
				target.discard(list2);
			} else if (list1.length) player.discard(list1);
			else event.finish();
			"step 3";
			if (
				target.hasCard(function (card) {
					return !cards.includes(card) && lib.filter.canBeGained(card, player, target);
				}, "he")
			)
				player
					.gainPlayerCard(target, true, "he")
					.set("filterButton", function (button) {
						return !_status.event.cards.includes(button.link);
					})
					.set("cards", cards);
		},
		ai: {
			order: 14,
			result: {
				target: function (player, target) {
					return -target.countCards("h");
				},
			},
		},
	},
	//刘巴
	oltongduo: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("oltongduo"), function (card, player, target) {
					return target != player && target.countCards("h") > 0;
				})
				.set("ai", function (target) {
					var att = get.attitude(_status.event.player, target);
					if (att > 0) return Math.sqrt(att) / 10;
					return 5 - att;
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("oltongduo", target);
				target.chooseCard("h", true, "统度：将一张手牌交给" + get.translation(player) + "，然后其于此阶段结束时将此牌置于牌堆顶");
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				player.addTempSkill("oltongduo_put");
				event.target.give(result.cards, player, true).gaintag.add("oltongduo");
			}
		},
		subSkill: {
			put: {
				trigger: { player: "phaseUseEnd" },
				charlotte: true,
				forced: true,
				filter: function (event, player) {
					return player.hasCard(card => card.hasGaintag("oltongduo"), "h");
				},
				content: function () {
					var cards = player.getCards("h", card => card.hasGaintag("oltongduo"));
					player.lose(cards, ui.cardPile, "insert");
					game.log(player, "将", get.cnNumber(cards.length) + "张牌", "置于牌堆顶");
					game.broadcastAll(function (player) {
						var cardx = ui.create.card();
						cardx.classList.add("infohidden");
						cardx.classList.add("infoflip");
						player.$throw(cardx, 1000, "nobroadcast");
					}, player);
				},
				onremove: function (player) {
					player.removeGaintag("oltongduo");
				},
			},
		},
	},
	olzhubi: {
		audio: 2,
		enable: "phaseUse",
		group: "olzhubi_replace",
		filter: function (event, player) {
			return (player.getStat("skill").olzhubi || 0) < player.maxHp;
		},
		filterTarget: function (card, player, target) {
			return target.countCards("he") > 0;
		},
		content: function () {
			"step 0";
			target.chooseCard("he", true, "铸币：请重铸一张牌", lib.filter.cardRecastable);
			"step 1";
			if (result.bool) {
				target.recast(result.cards, void 0, player => (player.draw().set("log", false).gaintag = ["olzhubi_tag"]));
			}
		},
		ai: {
			order: 6,
			result: {
				target: function (player, target) {
					if (target.hasCard(card => card.hasGaintag("olzhubi_tag"), "h")) return 0.5;
					return 1;
				},
			},
		},
		subSkill: {
			replace: {
				trigger: { global: "phaseJieshuBegin" },
				filter: function (event, player) {
					return event.player.hasCard(card => card.hasGaintag("olzhubi_tag"), "h");
				},
				forced: true,
				locked: false,
				logTarget: "player",
				content: function () {
					"step 0";
					var cards = get.bottomCards(5);
					event.cards2 = cards;
					game.cardsGotoOrdering(cards);
					var player = trigger.player;
					var next = player.chooseToMove("铸币：用任意“币”交换牌堆底等量张牌");
					var hs = player.getCards("h", card => card.hasGaintag("olzhubi_tag"));
					next.set("filterMove", function (from, to) {
						return typeof to != "number";
					});
					next.set("list", [
						["牌堆底", cards],
						["你的手牌", hs, "olzhubi_tag"],
					]);
					next.set("processAI", function (list) {
						var all = list[0][1].concat(list[1][1]),
							cards = all.slice(0);
						var num = _status.event.num;
						cards.sort(function (a, b) {
							return get.value(b) - get.value(a);
						});
						return [cards.slice(num), cards.slice(0, num)];
					});
					next.set("num", hs.length);
					"step 1";
					if (result.bool) {
						event.forceDie = true;
						var cards = result.moved[0];
						event.cards = cards;
						var player = trigger.player;
						var hs = player.getCards("h");
						var lose = [],
							gain = event.cards2;
						for (var i of cards) {
							if (hs.includes(i)) lose.push(i);
							else gain.remove(i);
						}
						if (lose.length) player.lose(lose, ui.cardPile);
						if (gain.length) player.gain(gain, "draw");
					} else event.finish();
					"step 2";
					for (var i of cards) {
						if (!"hejsdx".includes(get.position(i, true))) {
							i.fix();
							ui.cardPile.appendChild(i);
						}
					}
					game.updateRoundNumber();
				},
			},
		},
	},
	//傅肜
	olxiaosi: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return target.countCards("h") > 0 && player != target;
		},
		filterCard: function (card, player, target) {
			return get.type(card) == "basic";
		},
		check: function (card) {
			var player = _status.event.player;
			if (player.hasValueTarget(card)) return 10 - get.value(card);
			return 0.1;
		},
		content: function () {
			"step 0";
			if (
				target.countCards("h", card => {
					return get.type(card) == "basic" && lib.filter.cardDiscardable(card, target, "olxiaosi");
				}) == 0
			)
				event.draw = true;
			else {
				target.chooseToDiscard("h", true, "效死：弃置一张基本牌", { type: "basic" });
			}
			"step 1";
			var cards2 = cards.slice(0);
			if (result.bool) {
				cards2 = cards2.addArray(result.cards);
			}
			event.cards2 = cards2;
			"step 2";
			var cardsx = event.cards2.filter(i => get.position(i, true) == "d" && player.hasUseTarget(i, false));
			if (!cardsx.length) event.goto(5);
			else
				player
					.chooseButton(["效死：是否使用其中的一张牌？", cardsx])
					.set("filterButton", button => {
						return _status.event.player.hasUseTarget(button.link, false);
					})
					.set("ai", button => {
						if (button.link.name == "jiu") return 10;
						return _status.event.player.getUseValue(button.link);
					});
			"step 3";
			if (result.bool) {
				var card = result.links[0];
				event.cards2.remove(card);
				player.$gain2(card, false);
				game.delayx();
				player.chooseUseTarget(true, card, false, "nodistance");
			} else event.goto(5);
			"step 4";
			if (event.cards2.filter(i => get.position(i, true) == "d" && player.hasUseTarget(i, false)).length) event.goto(2);
			"step 5";
			if (event.draw) player.draw();
		},
		ai: {
			order: 4.5,
			result: {
				player: 1,
				target: -1,
			},
		},
	},
	//阿会喃
	jueman: {
		audio: 2,
		trigger: { global: "phaseEnd" },
		forced: true,
		direct: true,
		filter: function (event, player) {
			var history = game.getGlobalHistory("useCard", evt => {
				return get.type(evt.card) == "basic";
			});
			if (history.length < 2) return false;
			var users = history.slice(0, 2).map(i => i.player);
			var list = users.filter(user => user == player);
			if (list.length == 1) return true;
			if (list.length == 0) {
				var evtx = history[2];
				if (evtx) {
					var name = evtx.card.name,
						nature = evtx.card.nature;
					if (evtx && player.hasUseTarget({ name: name, nature: nature, isCard: true })) return true;
				}
			}
			return false;
		},
		content: function () {
			"step 0";
			var history = game.getGlobalHistory("useCard", evt => {
				return get.type(evt.card) == "basic";
			});
			var list = history
				.slice(0, 2)
				.map(i => i.player)
				.filter(user => user == player);
			if (list.length == 1) {
				player.logSkill("jueman");
				player.draw();
			} else if (list.length == 0) {
				var evtx = history[2],
					name = evtx.card.name,
					nature = evtx.card.nature;
				player.chooseUseTarget({ name: name, nature: nature, isCard: true }, true).set("logSkill", "jueman");
			}
		},
	},
	//张芝
	olbixin: {
		audio: 2,
		trigger: {
			global: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
		},
		direct: true,
		onremove: ["olbixin", "olbixin_basic", "olbixin_trick", "olbixin_equip"],
		group: "olbixin_full",
		map: { 基本: "basic", 锦囊: "trick", 装备: "equip" },
		filter: function (event, player) {
			var count = player.countMark("olbixin");
			if (count > 0 && event.player != player) return false;
			if (count > 1 && event.name == "phaseZhunbei") return false;
			if (count > 2) return false;
			var num = count >= 3 ? 3 : 1;
			var types = ["basic", "trick", "equip"].filter(type => {
				return player.countMark("olbixin_" + type) < num;
			});
			if (!types.length) return false;
			return lib.skill.olbixin.getList(player).length > 0;
		},
		getList: function (player, event) {
			var natures = lib.inpile_nature.slice(0),
				used = [];
			var history = player.actionHistory;
			for (var i = history.length - 1; i >= 0; i--) {
				var info = history[i];
				for (var evt of info.useCard) {
					var name = evt.card.name;
					if (get.type(name) != "basic") continue;
					if (name == "sha") {
						if (evt.card.nature) natures.remove(evt.card.nature);
						else used.push(name);
					} else used.push(name);
				}
				if (info.isRound) break;
			}
			var vcards = [];
			for (var name of lib.inpile) {
				if (get.type(name) != "basic") continue;
				if (!event) {
					if (name == "sha") {
						if (!used.includes("sha") && player.hasUseTarget({ name: "sha" })) vcards.push(["基本", "", "sha"]);
						for (var nature of natures) {
							if (player.hasUseTarget({ name: "sha", nature: nature })) vcards.push(["基本", "", "sha", nature]);
						}
					} else if (!used.includes(name) && player.hasUseTarget({ name: name })) vcards.push(["基本", "", name]);
				} else {
					if (name == "sha") {
						if (!used.includes("sha") && event.filterCard({ name: "sha" }, player, event)) vcards.push(["基本", "", "sha"]);
						for (var nature of natures) {
							if (event.filterCard({ name: "sha", nature: nature }, player, event)) vcards.push(["基本", "", "sha", nature]);
						}
					} else if (!used.includes(name) && event.filterCard({ name: name }, player, event)) vcards.push(["基本", "", name]);
				}
			}
			return vcards;
		},
		content: function () {
			"step 0";
			var types = ["basic", "trick", "equip"];
			var list = lib.skill.olbixin.getList(player);
			if (list.length) {
				var dialog = ["###" + get.prompt("olbixin") + '###<div class="text center">摸' + get.cnNumber(player.countMark("olbixin") >= 3 ? 1 : 3) + "张牌，然后将所有指定类型的手牌当一张基本牌使用</div>"];
				dialog.push([types.map(i => get.translation(i)), "tdnodes"]);
				dialog.push([list, "vcard"]);
				player
					.chooseButton(dialog, 2)
					.set("filterButton", button => {
						var player = _status.event.player,
							count = player.countMark("olbixin"),
							num = count >= 3 ? 3 : 1;
						var type = typeof button.link;
						if (ui.selected.buttons.length && type == typeof ui.selected.buttons[0].link) return false;
						if (type == "string" && player.countMark("olbixin_" + lib.skill.olbixin.map[button.link]) >= num) return false;
						if (type != "string" && !player.hasUseTarget({ name: button.link[2], nature: button.link[3] })) return false;
						return true;
					})
					.set("ai", button => {
						var list = _status.event.list;
						var type = typeof button.link;
						if (type == "string") return (1.2 - list.indexOf(lib.skill.olbixin.map[button.link])) * 10;
						return _status.event.player.getUseValue({
							name: button.link[2],
							nature: button.link[3],
						});
					})
					.set(
						"list",
						types
							.map(i => [
								i,
								player
									.getCards("h", { type: i })
									.map(i => get.value(i))
									.reduce((p, c) => p + c, 0),
							])
							.sort((a, b) => a[1] - b[1])
							.map(i => i[0])
					);
			} else event.finish();
			"step 1";
			if (result.bool) {
				if (typeof result.links[0] != "string") result.links.reverse();
				var type = result.links[0],
					name = result.links[1][2],
					nature = result.links[1][3];
				player.logSkill("olbixin");
				game.log(player, "声明了", type + "牌");
				type = lib.skill.olbixin.map[type];
				event.type = type;
				event.card = { name: name, nature: nature };
				player.addMark("olbixin_" + type, 1, false);
				player.draw(player.countMark("olbixin") >= 3 ? 1 : 3);
				game.delayx();
			} else event.finish();
			"step 2";
			if (player.hasCard(card => get.type2(card) == event.type, "h")) {
				var cards = player.getCards("h", card => get.type2(card) == event.type);
				var cardx = get.autoViewAs(card, cards);
				if (player.hasUseTarget(cardx, true, false)) {
					player.chooseUseTarget(cardx, cards, true, false).set("prompt", "选择" + get.translation(cardx) + "（" + get.translation(cards) + "）的目标");
				}
			}
		},
		subSkill: {
			full: {
				enable: "chooseToUse",
				filter: function (event, player) {
					if (event.olbixin) return false;
					var count = player.countMark("olbixin");
					if (count <= 2) return false;
					var num = count >= 3 ? 3 : 1;
					var types = ["basic", "trick", "equip"].filter(type => {
						return player.countMark("olbixin_" + type) < num;
					});
					if (!types.length) return false;
					return lib.skill.olbixin.getList(player, event).length > 0;
				},
				prompt: "你可以声明一种牌的类型（每种类型限三次），并选择一种你本轮未使用过且有合法目标的的基本牌。你摸一张牌，然后若你有此类型的手牌，你将所有此类型的手牌当此基本牌使用。",
				chooseButton: {
					dialog: function (event, player) {
						var list = lib.skill.olbixin.getList(player, event);
						var types = ["basic", "trick", "equip"];
						return ui.create.dialog('###笔心###<div class="text center">摸一张牌，然后将所有指定类型的手牌当一张基本牌使用</div>', [types.map(i => get.translation(i)), "tdnodes"], [list, "vcard"]);
					},
					filter: function (button, player) {
						var player = _status.event.player,
							count = player.countMark("olbixin"),
							num = count >= 3 ? 3 : 1;
						var type = typeof button.link;
						if (ui.selected.buttons.length && type == typeof ui.selected.buttons[0].link) return false;
						if (type == "string" && player.countMark("olbixin_" + lib.skill.olbixin.map[button.link]) >= num) return false;
						if (type != "string" && !_status.event.getParent().filterCard({ name: button.link[2], nature: button.link[3] }, player, _status.event.getParent())) return false;
						return true;
					},
					select: 2,
					check: function (button) {
						var types = ["basic", "trick", "equip"];
						var type = typeof button.link;
						var player = _status.event.player;
						var list = types
							.map(i => [
								i,
								player
									.getCards("h", { type: i })
									.map(i => get.value(i))
									.reduce((p, c) => p + c, 0),
							])
							.sort((a, b) => a[1] - b[1])
							.map(i => i[0]);
						if (type == "string") return (1.2 - list.indexOf(button.link) + Math.sqrt(3 - player.countMark("olbixin_" + lib.skill.olbixin.map[button.link]))) * 10;
						if (_status.event.getParent().type != "phase") return 1;
						return player.getUseValue({ name: button.link[2], nature: button.link[3] });
					},
					backup: function (links, player) {
						if (typeof links[0] != "string") links.reverse();
						return {
							popname: true,
							position: "h",
							filterCard: () => false,
							selectCard: -1,
							type: lib.skill.olbixin.map[links[0]],
							viewAs: { name: links[1][2], nature: links[1][3] },
							precontent: function () {
								"step 0";
								player.logSkill("olbixin");
								var type = lib.skill.olbixin_full_backup.type;
								game.log(player, "声明了", type, "牌");
								delete event.result.skill;
								player.addMark("olbixin_" + type, 1, false);
								player.draw(player.countMark("olbixin") >= 3 ? 1 : 3);
								"step 1";
								var cards = player.getCards("h", card => get.type2(card) == lib.skill.olbixin_full_backup.type);
								var cardsx = cards.filter(i => game.checkMod(i, player, "unchanged", "cardEnabled2", player) !== false);
								if (cardsx.length && cardsx.length == cards.length) {
									event.result.cards = cards;
									game.delayx();
								} else {
									event.cancel();
									// event.getParent().set('olbixin',true);
									event.getParent().goto(0);
									delete event.getParent().openskilldialog;
								}
							},
						};
					},
					prompt: function (links, player) {
						return "摸一张牌，然后将所有" + get.translation(links[0]) + "牌当做" + (get.translation(links[1][3]) || "") + get.translation(links[1][2]) + "使用";
					},
				},
				hiddenCard: function (player, name) {
					var count = player.countMark("olbixin");
					if (!lib.inpile.includes(name) || get.type(name) != "basic" || count < 3) return false;
					var types = ["basic", "trick", "equip"].filter(type => {
						return player.countMark("olbixin_" + type) < 3;
					});
					return types.length;
				},
				ai: {
					fireAttack: true,
					respondSha: true,
					respondShan: true,
					skillTagFilter: function (player) {
						var count = player.countMark("olbixin");
						if (count < 3) return;
						var types = ["basic", "trick", "equip"].filter(type => {
							return player.countMark("olbixin_" + type) < 3;
						});
						if (types.length) return true;
					},
					order: 1,
					result: {
						player: function (player) {
							if (_status.event.dying) return get.attitude(player, _status.event.dying);
							return 1;
						},
					},
				},
			},
			full_backup: {},
		},
	},
	olximo: {
		audio: 3,
		trigger: { player: "logSkill" },
		derivation: "olfeibai",
		filter: function (event, player) {
			return event.skill == "olbixin" && player.countMark("olbixin") < 3;
		},
		forced: true,
		logAudio(event, player) {
			return "olximo" + (1 + player.countMark("olbixin")) + ".mp3";
		},
		content: function () {
			player.addMark("olbixin", 1, false);
			game.log(player, "删除了", "#g【笔心】", "描述的前五个字符");
			if (player.countMark("olbixin") == 3) {
				game.log(player, "交换了", "#g【笔心】", "方括号中的两个数字");
				//player.removeSkill('olximo');
				//game.log(player,'失去了技能','#g【洗墨】');
				player.changeSkills(["olfeibai"], ["olximo"]);
			}
		},
		ai: {
			combo: "olbixin",
		},
	},
	olfeibai: {
		audio: 2,
		trigger: {
			source: "damageBegin1",
			player: "recoverBegin",
		},
		filter: function (event, player) {
			var storage = player.storage.olfeibai;
			var evt = event.getParent(),
				card = event.card;
			if (evt.player != player || !card) return false;
			if (storage && event.name == "recover") {
				return get.color(card) != "red";
			}
			if (!storage && event.name == "damage") {
				return get.color(card) != "black";
			}
			return false;
		},
		content: function () {
			player.changeZhuanhuanji("olfeibai");
			trigger.num++;
		},
		zhuanhuanji: true,
		forced: true,
		mark: true,
		marktext: "☯",
		intro: {
			content: function (storage, player) {
				if (storage) return "转换技。当你因执行你使用的非红色牌的效果而回复体力时，此回复值+1。";
				return "转换技。当你因执行你使用的非黑色牌的效果而造成伤害时，此伤害值+1。";
			},
		},
	},
	//新诸葛瑾
	olhuanshi: {
		audio: "huanshi",
		trigger: { global: "judge" },
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		logTarget: "player",
		prompt2: function (event, player) {
			var str = get.translation(event.player) + "的" + event.judgestr + "判定为" + get.translation(event.player.judging[0]) + "。你可以令其观看你的牌，其选择一张牌进行改判。";
			if (!player.hasSkill("olhuanshi_mark", null, null, false)) str += "然后你可以重铸任意张牌。";
			return str;
		},
		check: function (event, player) {
			if (get.attitude(player, event.player) <= 0) return false;
			var cards = player.getCards("he");
			var judge = event.judge(event.player.judging[0]);
			for (var i = 0; i < cards.length; i++) {
				var judge2 = event.judge(cards[i]);
				if (judge2 > judge) return true;
				if (_status.currentPhase != player && judge2 == judge && get.color(cards[i]) == "red" && get.useful(cards[i]) < 5) return true;
			}
			return false;
		},
		content: function () {
			"step 0";
			var target = trigger.player;
			var judge = trigger.judge(target.judging[0]);
			var attitude = get.attitude(target, player);
			target
				.choosePlayerCard("请选择代替判定的牌", "he", "visible", true, player)
				.set("ai", function (button) {
					var card = button.link;
					var judge = _status.event.judge;
					var attitude = _status.event.attitude;
					var result = trigger.judge(card) - judge;
					var player = _status.event.player;
					if (result > 0) {
						return 20 + result;
					}
					if (result == 0) {
						if (_status.currentPhase == player) return 0;
						if (attitude >= 0) {
							return get.color(card) == "red" ? 7 : 0 - get.value(card);
						} else {
							return get.color(card) == "black" ? 10 : 0 + get.value(card);
						}
					}
					if (attitude >= 0) {
						return get.color(card) == "red" ? 0 : -10 + result;
					} else {
						return get.color(card) == "black" ? 0 : -10 + result;
					}
				})
				.set("filterButton", function (button) {
					var player = _status.event.target;
					var card = button.link;
					var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") return mod2;
					var mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
					if (mod != "unchanged") return mod;
					return true;
				})
				.set("judge", judge)
				.set("attitude", attitude);
			"step 1";
			if (result.bool) {
				event.card = result.links[0];
				player.respond(event.card, "highlight", "noOrdering").nopopup = true;
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				if (trigger.player.judging[0].clone) {
					trigger.player.judging[0].clone.classList.remove("thrownhighlight");
					game.broadcast(function (card) {
						if (card.clone) {
							card.clone.classList.remove("thrownhighlight");
						}
					}, trigger.player.judging[0]);
					game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
				}
				game.cardsDiscard(trigger.player.judging[0]);
				trigger.player.judging[0] = event.card;
				trigger.orderingCards.add(event.card);
				game.log(trigger.player, "的判定牌改为", event.card);
				game.delay(2);
			}
			if (!player.countCards("h") || player.hasSkill("olhuanshi_mark", null, null, false)) event.finish();
			"step 3";
			player.chooseCard("是否重铸任意张手牌？", "操作提示：选择要重铸的牌并点击“确定”", [1, player.countCards("h")], lib.filter.cardRecastable).set("ai", function (card) {
				var player = _status.event.player,
					cards = ui.selected.cards;
				if (!player.hasSkill("olmingzhe")) return 5 - get.value(card);
				for (var i of cards) {
					if (get.color(i, player) == "red") return 5 - get.value(card);
				}
				return 7.5 - get.value(card);
			});
			"step 4";
			if (result.bool) {
				player.addTempSkill("olhuanshi_mark");
				player.recast(result.cards);
			}
		},
		ai: {
			rejudge: true,
			tag: {
				rejudge: 1,
			},
		},
		subSkill: { mark: { charlotte: true } },
	},
	olhongyuan: {
		audio: "hongyuan",
		trigger: { player: "gainAfter", global: "loseAsyncAfter" },
		filter(event, player) {
			if (!player.countCards("he") || player.hasSkill("olhongyuan_blocker", null, null, false)) return false;
			return event.getg(player).length >= 2;
		},
		async content(event, trigger, player) {
			player.addTempSkill("olhongyuan_blocker", ["phaseZhunbeiBefore", "phaseJudgeBefore", "phaseDrawBefore", "phaseUseBefore", "phaseDiscardBefore", "phaseJieshuBefore", "phaseBefore"]);
			let selectedTargets = [];
			while (
				selectedTargets.length < 2 &&
				player.countCards("he") &&
				game.hasPlayer(target => {
					return target != player && !selectedTargets.includes(target);
				})
			) {
				const {
					result: { bool, targets, cards },
				} = await player
					.chooseCardTarget({
						prompt: "弘援：将一张牌交给一名其他角色",
						filterCard: true,
						position: "he",
						filterTarget(card, player, target) {
							return target != player && !get.event("selectedTargets").includes(target);
						},
						complexCard: true,
						complexTarget: true,
						complexSelect: true,
						ai1(card) {
							const player = get.event("player");
							if (
								!game.hasPlayer(current => {
									if (get.event("selectedTargets").includes(current)) return false;
									return current != player && get.attitude(player, current) > 0 && !current.hasSkillTag("nogain");
								})
							)
								return -get.value(card);
							return 4 + (player.hasSkill("olmingzhe") && get.color(card) == "red" ? 2 : 0) - Math.max(player.getUseValue(card), get.value(card, player));
						},
						ai2(target) {
							const player = _status.event.player,
								att = get.attitude(player, target);
							if (!ui.selected.cards.length) return att;
							const card = ui.selected.cards[0],
								val = get.value(card, target);
							if (val < 0) return -att * Math.sqrt(-val);
							return att * Math.sqrt(val + 2);
						},
					})
					.set("selectedTargets", selectedTargets);
				if (bool) {
					const target = targets[0];
					selectedTargets.push(target);
					player.line(target);
					await player.give(cards, target);
				} else break;
			}
		},
		ai: { threaten: 0.8 },
		subSkill: { blocker: { charlotte: true } },
	},
	olmingzhe: {
		audio: "mingzhe",
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		forced: true,
		filter: function (event, player) {
			if (player.isPhaseUsing()) return false;
			var evt = event.getl(player);
			for (var i of evt.cards2) {
				if (get.color(i, player) == "red") return true;
			}
			return false;
		},
		content: function () {
			if (!trigger.visible) {
				var cards = trigger.getl(player).hs.filter(function (i) {
					return get.color(i, player) == "red";
				});
				if (cards.length > 0) player.showCards(cards, get.translation(player) + "发动了【明哲】");
			}
			player.draw();
		},
	},
	//吕范
	xindiaodu: {
		audio: "diaodu",
		group: "xindiaodu_use",
		frequent: true,
		preHidden: true,
		isFriendOf: function (player, target) {
			if (get.mode() == "guozhan") return player.isFriendOf(target);
			return player.group == target.group;
		},
		subSkill: {
			temp: { charlotte: true },
			use: {
				trigger: {
					global: "useCard",
				},
				filter: function (event, player) {
					return get.type(event.card) == "equip" && event.player.isIn() && lib.skill.xindiaodu.isFriendOf(player, event.player) && (player == event.player || player.hasSkill("xindiaodu")) && !event.player.hasSkill("xindiaodu_temp");
				},
				direct: true,
				content: function () {
					"step 0";
					var next = trigger.player.chooseBool("是否发动【调度】摸一张牌？");
					if (player.hasSkill("xindiaodu")) next.set("frequentSkill", "xindiaodu");
					if (player == trigger.player) next.setHiddenSkill("xindiaodu");
					"step 1";
					if (result.bool) {
						player.logSkill("xindiaodu", trigger.player);
						trigger.player.draw("nodelay");
						trigger.player.addTempSkill("xindiaodu_temp");
					}
				},
			},
		},
		trigger: {
			player: "phaseUseBegin",
		},
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return lib.skill.xindiaodu.isFriendOf(current, player) && current.countGainableCards(player, "e") > 0;
			});
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("xindiaodu"), function (card, player, current) {
					return lib.skill.xindiaodu.isFriendOf(current, player) && current.countGainableCards(player, "e") > 0;
				})
				.setHiddenSkill(event.name).ai = function (target) {
				var num = 1;
				if (target.hasSkill("gzxiaoji")) num += 2.5;
				if (target.isDamaged() && target.getEquip("baiyin")) num += 2.5;
				if (target.hasSkill("xuanlve")) num += 2;
				return num;
			};
			"step 1";
			if (result.bool) {
				event.target1 = result.targets[0];
				player.logSkill("xindiaodu", event.target1);
				player.line(event.target1, "xindiaodu");
				player.gainPlayerCard(event.target1, "e", true);
			} else event.finish();
			"step 2";
			if (result.bool && player.getCards("h").includes(result.cards[0])) {
				event.card = result.cards[0];
				player
					.chooseTarget("是否将" + get.translation(event.card) + "交给一名其他角色？", function (card, player, current) {
						return current != player && current != _status.event.target1 && lib.skill.xindiaodu.isFriendOf(current, player);
					})
					.set("target1", event.target1);
			} else event.finish();
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "green");
				player.give(card, target);
			}
		},
	},
	//夏侯玄
	olhuanfu: {
		audio: 2,
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			if (player == event.player && !event.isFirstTarget) return false;
			if (event.olhuanfu_map && event.olhuanfu_map[player.playerid]) return false;
			return player.maxHp > 0 && player.countCards("he") > 0;
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseToDiscard("he", [1, player.maxHp], get.prompt("olhuanfu"), "通过弃牌，预测" + (player == trigger.player ? "你" : get.translation(trigger.player)) + "使用的" + get.translation(trigger.card) + "能造成多少伤害。如果弃置的牌数等于总伤害，则你摸两倍的牌。")
				.set(
					"predict",
					(function () {
						var target = trigger.target;
						if (player == target) {
							if (trigger.targets.length > 1 || player.hasShan() || get.effect(player, trigger.card, trigger.player, player) == 0) return 0;
						} else {
							var target = trigger.target;
							if (
								trigger.targets.length > 1 ||
								target.mayHaveShan(
									player,
									"use",
									target.getCards("h", i => {
										return i.hasGaintag("sha_notshan");
									})
								)
							)
								return 0;
						}
						var num = trigger.getParent().baseDamage;
						var map = trigger.getParent().customArgs,
							id = target.playerid;
						if (map[id]) {
							if (typeof map[id].baseDamage == "number") num = map[id].baseDamage;
							if (typeof map[id].extraDamage == "number") num += map[id].extraDamage;
						}
						if (
							target.hasSkillTag("filterDamage", null, {
								player: trigger.player,
								card: trigger.card,
							})
						)
							num = 1;
						return num;
					})()
				)
				.set("ai", function (card) {
					var num = _status.event.predict,
						player = _status.event.player;
					if (ui.selected.cards.length >= num) return 0;
					if (
						player.countCards("he", function (card) {
							return get.value(card) < 6 + num;
						}) < num
					)
						return 0;
					return 6 + num - get.value(card);
				}).logSkill = "olhuanfu";
			"step 1";
			if (result.bool) {
				player.addTempSkill("olhuanfu_lottery");
				var evt = trigger.getParent();
				if (!evt.olhuanfu_map) evt.olhuanfu_map = {};
				evt.olhuanfu_map[player.playerid] = result.cards.length;
			}
		},
		ai: {
			effect: {
				target_use: function (card, player, target, current) {
					if (card.name == "sha" && target.hp > 0 && current < 0 && target.countCards("he") > 0) return 0.7;
				},
			},
		},
		subSkill: {
			lottery: {
				trigger: { global: "useCardAfter" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var map = event.olhuanfu_map;
					if (!map || !map[player.playerid]) return false;
					var num = 0;
					event.player.getHistory("sourceDamage", function (evt) {
						if (evt.card == event.card && evt.getParent().type == "card") num += evt.num;
					});
					return num == map[player.playerid];
				},
				content: function () {
					player.draw(2 * trigger.olhuanfu_map[player.playerid]);
				},
			},
		},
	},
	olqingyi: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return (
				player.hasCard(function (card) {
					return lib.filter.cardDiscardable(card, player, "olqingyi");
				}, "he") && game.hasPlayer(current => lib.skill.olqingyi.filterTarget(null, player, current))
			);
		},
		selectTarget: [1, 2],
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("he") > 0;
		},
		multitarget: true,
		multiline: true,
		content: function () {
			"step 0";
			var list = [player];
			list.addArray(targets);
			list.sortBySeat();
			event.list = list;
			for (var target of event.list) {
				if (
					!target.hasCard(function (card) {
						return lib.filter.cardDiscardable(card, target, "olqingyi");
					}, "he")
				) {
					event.finish();
					break;
				}
			}
			"step 1";
			player
				.chooseCardOL(event.list, "he", true, "清议：选择弃置一张牌", function (card, player) {
					return lib.filter.cardDiscardable(card, player, "olqingyi");
				})
				.set("ai", get.unuseful);
			"step 2";
			var lose_list = [],
				cards = [];
			for (var i = 0; i < result.length; i++) {
				var current = event.list[i],
					card = result[i].cards[0];
				lose_list.push([current, result[i].cards]);
				cards.push(card);
			}
			game.loseAsync({
				lose_list: lose_list,
			}).setContent("discardMultiple");
			var type = get.type2(cards[0]);
			for (var i = 1; i < cards.length; i++) {
				if (get.type2(cards[i]) != type) event.finish();
			}
			"step 3";
			event.goto(1);
			for (var target of event.list) {
				if (
					!target.hasCard(function (card) {
						return lib.filter.cardDiscardable(card, target, "olqingyi");
					}, "he")
				) {
					event.finish();
					break;
				}
			}
		},
		ai: {
			threaten: 1.2,
			order: 9.1,
			result: {
				player: function (player) {
					let min = 24;
					player.countCards("he", function (card) {
						min = Math.min(min, get.value(card));
					});
					if (ui.selected.targets.length == 1) return 1 - min / 6;
					return 0.75 - min / 48;
				},
				target: function (player, target) {
					if (
						target.hasCard(function (card) {
							return lib.filter.cardDiscardable(card, player, "olqingyi");
						}, "he")
					)
						return -1;
					return 0;
				},
			},
		},
		group: "olqingyi_gain",
		subSkill: {
			gain: {
				audio: "olqingyi",
				trigger: { player: "phaseJieshuBegin" },
				direct: true,
				filter: function (event, player) {
					var history = player.getHistory("useSkill", evt => evt.skill == "olqingyi");
					if (!history.length) return false;
					var color = false;
					for (var evt of history) {
						var list = [player];
						list.addArray(evt.targets);
						for (var target of list) {
							target.getHistory("lose", function (evtx) {
								if (color === true || evtx.getParent(2).name != "olqingyi") return false;
								for (var card of evtx.cards) {
									if (color === true || get.position(card, true) != "d") continue;
									var color2 = get.color(card, false);
									if (!color) color = color2;
									else if (color != color2) color = true;
								}
							});
							if (color === true) return true;
						}
					}
					return false;
				},
				content: function () {
					"step 0";
					var history = player.getHistory("useSkill", evt => evt.skill == "olqingyi"),
						cards = [];
					for (var evt of history) {
						var list = [player];
						list.addArray(evt.targets);
						for (var target of list) {
							target.getHistory("lose", function (evtx) {
								if (evtx.getParent(2).name != "olqingyi") return false;
								for (var card of evtx.cards) {
									if (get.position(card, true) == "d") cards.add(card);
								}
							});
						}
					}
					player
						.chooseButton(["清议：选择获得两张异色牌", cards], 2)
						.set("filterButton", function (button) {
							if (!ui.selected.buttons.length) return true;
							return get.color(button.link, false) != get.color(ui.selected.buttons[0].link, false);
						})
						.set("ai", function (button) {
							return get.value(button.link, _status.event.player);
						});
					"step 1";
					if (result.bool) {
						player.logSkill("olqingyi_gain");
						player.gain(result.links, "gain2");
					}
				},
			},
		},
	},
	olzeyue: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		limited: true,
		skillAnimation: true,
		animationColor: "water",
		direct: true,
		filter: function (event, player) {
			var sources = [],
				history = player.actionHistory;
			for (var i = history.length - 1; i >= 0; i--) {
				if (i < history.length - 1 && history[i].isMe) break;
				for (var evt of history[i].damage) {
					if (evt.source && evt.source != player && evt.source.isIn()) sources.add(evt.source);
				}
			}
			for (var source of sources) {
				var skills = source.getStockSkills("一！", "五！");
				for (var skill of skills) {
					var info = get.info(skill);
					if (info && !info.persevereSkill && !info.charlotte && !get.is.locked(skill, source) && source.hasSkill(skill, null, null, false)) return true;
				}
			}
			return false;
		},
		content: function () {
			"step 0";
			var sources = [],
				history = player.actionHistory;
			for (var i = history.length - 1; i >= 0; i--) {
				if (i < history.length - 1 && history[i].isMe) break;
				for (var evt of history[i].damage) {
					if (evt.source && evt.source != player && evt.source.isIn()) sources.add(evt.source);
				}
			}
			sources = sources.filter(function (source) {
				var skills = source.getStockSkills("一！", "五！");
				for (var skill of skills) {
					var info = get.info(skill);
					if (info && !info.persevereSkill && !info.charlotte && !get.is.locked(skill, source) && source.hasSkill(skill, null, null, false)) return true;
				}
				return false;
			});
			player
				.chooseTarget(get.prompt("olzeyue"), "令一名可选角色的一个非锁定技失效", function (card, player, target) {
					return _status.event.sources.includes(target);
				})
				.set("sources", sources)
				.set("ai", function (target) {
					var player = _status.event.player,
						att = get.attitude(player, target);
					if (att >= 0) return 0;
					return get.threaten(target, player);
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("olzeyue", target);
				player.awakenSkill("olzeyue");
				event.target = target;
				var skills = target.getStockSkills("一！", "五！");
				skills = skills.filter(function (skill) {
					var info = get.info(skill);
					if (info && !info.charlotte && !get.is.locked(skill, target) && target.hasSkill(skill, null, null, false)) return true;
				});
				if (skills.length == 1) event._result = { control: skills[0] };
				else player.chooseControl(skills).set("prompt", "令" + get.translation(target) + "的一个技能失效");
			} else event.finish();
			"step 2";
			var skill = result.control;
			target.disableSkill("olzeyue_" + player.playerid, skill);
			target.storage["olzeyue_" + player.playerid] = true;
			player.addSkill("olzeyue_round");
			player.markAuto("olzeyue_round", [target]);
			if (!player.storage.olzeyue_map) player.storage.olzeyue_map = {};
			player.storage.olzeyue_map[target.playerid] = 0;
			game.log(target, "的技能", "#g【" + get.translation(skill) + "】", "被失效了");
		},
		ai: { threaten: 3 },
		subSkill: {
			round: {
				trigger: { global: "roundStart" },
				forced: true,
				charlotte: true,
				popup: false,
				filter: function (event, player) {
					var storage = player.getStorage("olzeyue_round");
					for (var source of storage) {
						if (source.isIn() && source.canUse("sha", player, false)) return true;
					}
					return false;
				},
				content: function () {
					"step 0";
					event.targets = player.storage.olzeyue_round.slice(0).sortBySeat();
					event.target = event.targets.shift();
					event.forceDie = true;
					"step 1";
					var map = player.storage.olzeyue_map;
					if (target.storage["olzeyue_" + player.playerid]) map[target.playerid]++;
					event.num = map[target.playerid] - 1;
					if (event.num <= 0) event.finish();
					"step 2";
					event.num--;
					target.useCard(player, { name: "sha", isCard: true }, false, "olzeyue_round");
					"step 3";
					var key = "olzeyue_" + player.playerid;
					if (
						target.storage[key] &&
						player.hasHistory("damage", function (evt) {
							return evt.card.name == "sha" && evt.getParent().type == "card" && evt.getParent(3) == event;
						})
					) {
						for (var skill in target.disabledSkills) {
							if (target.disabledSkills[skill].includes(key)) game.log(target, "恢复了技能", "#g【" + get.translation(skill) + "】");
						}
						delete target.storage[key];
						target.enableSkill(key);
					}
					if (event.num > 0 && player.isIn() && target.isIn() && target.canUse("sha", player, false)) {
						event.goto(2);
					} else if (event.targets.length > 0) {
						event.target = event.targets.shift();
						event.goto(1);
					}
				},
			},
		},
	},
	//邓忠
	dzkanpo: {
		audio: 2,
		trigger: { source: "damageSource" },
		filter: function (event, player) {
			return event.getParent().type == "card" && event.card && event.card.name == "sha" && event.player.countCards("he") > 0;
		},
		logTarget: "player",
		content: function () {
			var suit = get.suit(trigger.card);
			var next = player.gainPlayerCard(trigger.player, "h", "visible");
			next.set("suit", suit);
			next.set("filterButton", function (button) {
				var evt = _status.event;
				return get.suit(button.link, evt.target) == evt.suit;
			});
		},
		group: "dzkanpo_sha",
		subSkill: {
			sha: {
				enable: "chooseToUse",
				usable: 1,
				viewAs: { name: "sha" },
				viewAsFilter: function (player) {
					return player.countCards("hs") > 0;
				},
				filterCard: true,
				position: "hs",
				prompt: "将一张手牌当做【杀】使用",
				check: function (card) {
					return 6 - get.value(card);
				},
				ai: {
					respondSha: true,
					skillTagFilter: function (player) {
						if (player.getStat("skill").dzkanpo_sha) return false;
						if (!player.countCards("hs")) return false;
					},
				},
			},
		},
	},
	dzgengzhan: {
		audio: 2,
		trigger: {
			global: ["loseAfter", "loseAsyncAfter"],
		},
		usable: 1,
		filter: function (event, player) {
			if (event.type != "discard" || event.getlx === false || player == _status.currentPhase || !event.isPhaseUsing()) return false;
			for (var card of event.cards) {
				if (get.position(card, true) == "d" && get.name(card, event.hs && event.hs.includes(card) ? event.player : false) == "sha") return true;
			}
		},
		direct: true,
		content: function () {
			"step 0";
			var cards = trigger.cards.filter(function (card) {
				return get.position(card, true) == "d" && get.name(card, trigger.hs && trigger.hs.includes(card) ? trigger.player : false) == "sha";
			});
			player.chooseButton(["是否发动【更战】获得一张杀？", cards]).set("ai", function (button) {
				return get.value(button.link, _status.event.player);
			});
			"step 1";
			if (result.bool) {
				player.logSkill("dzgengzhan");
				player.gain(result.links, "gain2");
			} else player.storage.counttrigger.dzgengzhan--;
		},
		group: "dzgengzhan_add",
		subSkill: {
			add: {
				audio: "dzgengzhan",
				trigger: { global: "phaseJieshuBegin" },
				forced: true,
				locked: false,
				filter: function (event, player) {
					return (
						player != event.player &&
						!event.player.hasHistory("useCard", function (evt) {
							return evt.card.name == "sha";
						})
					);
				},
				logTarget: "player",
				content: function () {
					player.addTempSkill("dzgengzhan_effect", { player: "phaseUseAfter" });
					player.addMark("dzgengzhan_effect", 1, false);
					game.delayx();
				},
			},
			effect: {
				onremove: true,
				charlotte: true,
				mod: {
					cardUsable: function (card, player, num) {
						if (card.name == "sha") return num + player.countMark("dzgengzhan_effect");
					},
				},
				intro: { content: "使用杀的次数上限+#" },
			},
		},
	},
	//王衍
	yangkuang: {
		audio: 2,
		trigger: { player: "recoverEnd" },
		filter: function (event, player) {
			return player.isHealthy();
		},
		logTarget: function (event, player) {
			return _status.currentPhase || player;
		},
		check: function (event, player) {
			var target = _status.currentPhase || player;
			if (get.attitude(player, target) > 0) return true;
			if (player.countCards("h") > target.countCards("h")) return true;
			if (!target.getCardUsable("sha")) return true;
			return false;
		},
		content: function () {
			"step 0";
			player.chooseUseTarget("jiu", true);
			"step 1";
			var target = _status.currentPhase;
			if (target) target.draw("nodelay");
			player.draw();
		},
	},
	cihuang: {
		audio: 2,
		trigger: {
			global: ["eventNeutralized", "shaMiss"],
		},
		direct: true,
		filter: function (event, player) {
			if (event.player != _status.currentPhase || !event.targets || event.targets.length != 1 || event.type != "card" || !player.countCards("he")) return false;
			return lib.skill.cihuang.getList(player, event.player, true);
		},
		getList: function (player, target, bool) {
			var natures = lib.inpile_nature.slice(0);
			var tricks = [];
			for (var name of lib.inpile) {
				var info = lib.card[name];
				if (!info || info.type != "trick" || info.notarget || (info.selectTarget && info.selectTarget != 1 && (info.selectTarget != -1 || !info.toself))) continue;
				tricks.push(name);
			}
			var history = player.actionHistory;
			for (var i = history.length - 1; i >= 0; i--) {
				var info = history[i];
				for (var evt of info.useCard) {
					var name = evt.card.name;
					if (name == "sha") {
						if (evt.card.nature) natures.remove(evt.card.nature);
					} else tricks.remove(name);
				}
				if (info.isRound) break;
			}
			var vcards = [];
			for (var i of natures) {
				if (
					player.canUse(
						{
							name: "sha",
							nature: i,
							isCard: true,
						},
						target
					)
				) {
					if (bool) return true;
					else vcards.push(["基本", "", "sha", i]);
				}
			}
			for (var i of tricks) {
				if (
					player.canUse(
						{
							name: i,
							isCard: true,
						},
						target
					)
				) {
					if (bool) return true;
					else vcards.push(["锦囊", "", i]);
				}
			}
			if (bool) return false;
			return vcards;
		},
		content: function () {
			"step 0";
			var target = trigger.player;
			var list = lib.skill.cihuang.getList(player, target);
			if (_status.connectMode)
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			player.chooseButton([get.prompt("cihuang", target), '<div class="text center">将一张牌当以下的一张牌对' + get.translation(target) + "使用</div>", [list, "vcard"]]).set("ai", function (button) {
				var card = {
						name: button.link[2],
						nature: button.link[3],
						storage: { cihuang: true },
					},
					player = _status.event.player,
					target = _status.event.getTrigger().player;
				return get.effect(target, card, player, player);
			});
			"step 1";
			if (result.bool) {
				var card = {
					name: result.links[0][2],
					nature: result.links[0][3],
					storage: { cihuang: true },
				};
				event.card = card;
				player
					.chooseCard("hes", "雌黄：将一张牌当" + get.translation(card) + "对" + get.translation(trigger.player) + "使用", function (card, player) {
						return player.canUse(get.autoViewAs(_status.event.getParent().card, [card]), _status.event.target, false);
					})
					.set("target", trigger.player)
					.set("ai", function (card) {
						if (get.effect(_status.event.target, get.autoViewAs(_status.event.getParent().card, [card]), player) <= 0) return false;
						return 6 - get.value(card);
					});
			} else event._result = { bool: false };
			"step 2";
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			if (result.bool) {
				player.useCard(get.autoViewAs(event.card, result.cards), result.cards, false, trigger.player, "cihuang").oncard = function (card, player) {
					_status.event.directHit.addArray(game.filterPlayer());
				};
			}
		},
		ai: {
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				return arg && arg.card && arg.card.storage && arg.card.storage.cihuang;
			},
		},
	},
	sanku: {
		audio: 2,
		trigger: { player: "dying" },
		forced: true,
		group: "sanku_nogain",
		content: function () {
			"step 0";
			player.loseMaxHp();
			"step 1";
			var num = player.maxHp - player.hp;
			if (num > 0) player.recover(num);
		},
		ai: { halfneg: true },
		subSkill: {
			nogain: {
				audio: "sanku",
				trigger: { player: "gainMaxHpBegin" },
				forced: true,
				content: function () {
					trigger.cancel();
				},
			},
		},
	},
	//霍峻
	qiongshou: {
		audio: 2,
		trigger: {
			player: "enterGame",
			global: "phaseBefore",
		},
		forced: true,
		filter: function (event, player) {
			if (event.name == "phase" && game.phaseNumber != 0) return false;
			return player.hasEnabledSlot();
		},
		content: function () {
			var list = [];
			for (var i = 1; i < 6; i++) {
				for (var j = 0; j < player.countEnabledSlot(i); j++) {
					list.push(i);
				}
			}
			player.disableEquip(list);
			player.draw(4);
		},
		mod: {
			maxHandcard: function (player, num) {
				return num + 4;
			},
		},
		ai: {
			halfneg: true,
			threaten: 3.2,
		},
	},
	fenrui: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		onremove: true,
		filter: function (event, player) {
			var es = player.countCards("e");
			return (
				(player.hasDisabledSlot() && player.countCards("he") > 0) ||
				(!player.storage.fenrui &&
					game.hasPlayer(function (current) {
						return current != player && current.countCards("e") < es;
					}))
			);
		},
		content: function () {
			"step 0";
			if (player.hasDisabledSlot() && player.countCards("he") > 0) {
				var str = "弃置一张牌，恢复一个装备栏并使用一张对应装备牌";
				player.chooseToDiscard("he", get.prompt("fenrui"), str).set("ai", function (card) {
					return 7 - get.value(card);
				}).logSkill = "fenrui";
			} else event.goto(3);
			"step 1";
			if (result.bool) {
				player.chooseToEnable().set("ai", function () {
					var player = _status.event.player;
					var list = [2, 5, 1, 3, 4];
					for (var i of list) {
						if (player.hasDisabledSlot(i)) return "equip" + i;
					}
				});
			} else {
				var es = player.countCards("e");
				if (
					player.storage.fenrui ||
					!game.hasPlayer(function (current) {
						return current != player && current.countCards("e") < es;
					})
				)
					event.finish();
				else event.goto(3);
			}
			"step 2";
			var func = function (card) {
				return get.subtype(card, false) == result.control && player.canUse(card, player) && !get.cardtag(card, "gifts");
			};
			var card = get.discardPile(func) || get.cardPile2(func);
			if (card) {
				player.chooseUseTarget(card, true, "nopopup");
			}
			if (player.storage.fenrui) event.finish();
			"step 3";
			var es = player.countCards("e");
			if (
				es > 0 &&
				game.hasPlayer(function (current) {
					return current != player && current.countCards("e") < es;
				})
			) {
				player
					.chooseTarget("是否对一名装备数小于你的角色造成伤害？", "你可以选择一名装备区内牌数小于你的角色，并对其造成X点伤害（X为你与其装备区牌数之差），但此效果每局游戏内仅限一次。", function (card, player, target) {
						return player != target && player.countCards("e") > target.countCards("e");
					})
					.set("ai", function (target) {
						var player = _status.event.player;
						var num = player.countCards("e") - target.countCards("e");
						if (get.attitude(player, target) >= 0) return 0;
						if (num >= Math.min(2, player.hp, target.hp)) return get.damageEffect(target, player, player);
						return 0;
					});
			} else event.finish();
			"step 4";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("fenrui_animate", target);
				player.storage.fenrui = true;
				player.unmarkSkill("fenrui");
				game.delayx();
				target.damage(player.countCards("e") - target.countCards("e"));
			}
		},
		group: "fenrui_animate",
		mark: true,
		intro: { content: "王炸尚未使用" },
		subSkill: {
			animate: {
				skillAnimation: true,
				animationColor: "fire",
			},
		},
	},
	//曹宪曹华
	huamu: {
		audio: 6,
		trigger: { player: "useCardAfter" },
		locked: false,
		filter: function (event, player) {
			if (
				!player.hasHistory("lose", function (evt) {
					return evt.hs.length > 0 && evt.getParent() == event;
				}) ||
				!event.cards.filterInD("oe").length
			)
				return false;
			var history = game.getGlobalHistory("useCard");
			var index = history.indexOf(event);
			if (index < 1) return false;
			return get.color(event.card) != get.color(history[index - 1].card);
		},
		prompt2: event => "将" + get.translation(event.cards.filterInD("oe")) + "置于武将牌上",
		check: function (event, player) {
			if (
				!game.hasPlayer(function (current) {
					return current.hasSkill("qianmeng", null, null, false) && get.attitude(player, current) > 0;
				})
			)
				return false;
			var cards = event.cards.filterInD("e");
			if (!cards.length) return true;
			var card = cards[0];
			if (get.owner(card) == player) {
				if (get.value(card, player) <= 0) return true;
				var subtype = get.subtype(card);
				if (
					player.hasCard("hs", function (card) {
						return get.subtype(card) == subtype && player.canUse(card, player) && get.effect(player, card, player, player) > 0;
					})
				)
					return true;
			}
			return false;
		},
		content: function () {
			var cards = trigger.cards.filterInD("oe");
			player.addToExpansion(cards, "gain2").gaintag.add("huamu");
		},
		ai: {
			reverseOrder: true,
			combo: "qianmeng",
		},
		mod: {
			aiOrder: function (player, card, num) {
				if (typeof card == "object") {
					var history = game.getGlobalHistory("useCard");
					if (!history.length) return;
					var evt = history[history.length - 1];
					if (evt && evt.card && get.color(evt.card) != get.color(card)) {
						return num + 4;
					}
				}
			},
		},
		marktext: "木",
		intro: {
			name: "灵杉&玉树",
			markcount: function (storage, player) {
				var red = [],
					black = [];
				var cards = player.getExpansions("huamu");
				for (var i of cards) {
					var color = get.color(i, false);
					(color == "red" ? red : black).push(i);
				}
				return "" + black.length + "/" + red.length;
			},
			content: "expansion",
			mark: function (dialog, storage, player) {
				var red = [],
					black = [];
				var cards = player.getExpansions("huamu");
				for (var i of cards) {
					var color = get.color(i, false);
					(color == "red" ? red : black).push(i);
				}
				if (black.length) {
					dialog.addText("灵杉");
					dialog.addSmall(black);
				}
				if (red.length) {
					dialog.addText("玉树");
					dialog.addSmall(red);
				}
			},
		},
	},
	qianmeng: {
		audio: 2,
		trigger: {
			global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter: function (event, player) {
			if (event.name == "addToExpansion") {
				if (event.gaintag.includes("huamu")) {
					var cards = event.player.getExpansions("huamu"),
						red = cards.filter(function (i) {
							return get.color(i, false) == "red";
						});
					if (cards.length == red.length || red.length == 0 || cards.length == red.length * 2) return true;
				}
			}
			if (event.name == "lose" && event.getlx !== false) {
				for (var i in event.gaintag_map) {
					if (event.gaintag_map[i].includes("huamu")) {
						var cards = event.player.getExpansions("huamu"),
							red = cards.filter(function (i) {
								return get.color(i, false) == "red";
							});
						return cards.length == red.length || red.length == 0 || cards.length == red.length / 2;
					}
				}
				return false;
			}
			return (
				game.getGlobalHistory("cardMove", function (evt) {
					if (evt.name != "lose" || event != evt.getParent()) return false;
					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes("huamu")) {
							var cards = evt.player.getExpansions("huamu"),
								red = cards.filter(function (i) {
									return get.color(i, false) == "red";
								});
							return cards.length == red.length || red.length == 0 || cards.length == red.length / 2;
						}
					}
					return false;
				}).length > 0
			);
		},
		forced: true,
		content: function () {
			player.draw();
		},
		ai: { combo: "huamu" },
	},
	liangyuan: {
		audio: 2,
		enable: "chooseToUse",
		hiddenCard: function (player, name) {
			if (player.getStorage("liangyuan_used").includes(name)) return false;
			if (name == "tao") {
				return game.hasPlayer(function (current) {
					var storage = current.getExpansions("huamu");
					return (
						storage.length > 0 &&
						storage.filter(function (i) {
							return get.color(i, false) == "red";
						}).length > 0
					);
				});
			} else if (name == "jiu") {
				return game.hasPlayer(function (current) {
					var storage = current.getExpansions("huamu");
					return (
						storage.length > 0 &&
						storage.filter(function (i) {
							return get.color(i, false) == "black";
						}).length > 0
					);
				});
			}
			return false;
		},
		filter: function (event, player) {
			if (event.type == "wuxie") return false;
			if (
				!player.getStorage("liangyuan_used").includes("tao") &&
				event.filterCard(get.autoViewAs({ name: "tao" }, "unsure"), player, event) &&
				game.hasPlayer(function (current) {
					var storage = current.getExpansions("huamu");
					return (
						storage.length > 0 &&
						storage.filter(function (i) {
							return get.color(i, false) == "red";
						}).length > 0
					);
				})
			)
				return true;
			if (
				!player.getStorage("liangyuan_used").includes("jiu") &&
				event.filterCard(get.autoViewAs({ name: "jiu" }, "unsure"), player, event) &&
				game.hasPlayer(function (current) {
					var storage = current.getExpansions("huamu");
					return (
						storage.length > 0 &&
						storage.filter(function (i) {
							return get.color(i, false) == "black";
						}).length > 0
					);
				})
			)
				return true;
			return false;
		},
		chooseButton: {
			dialog: function () {
				return ui.create.dialog("良缘", [["tao", "jiu"], "vcard"], "hidden");
			},
			filter: function (button, player) {
				var evt = _status.event.getParent();
				var name = button.link[2],
					color = name == "tao" ? "red" : "black";
				if (player.getStorage("liangyuan_used").includes(name)) return false;
				var cards = [];
				game.countPlayer(function (current) {
					cards.addArray(
						current.getExpansions("huamu").filter(function (i) {
							return get.color(i, false) == color;
						})
					);
				});
				if (!cards.length) return false;
				var card = get.autoViewAs({ name: name }, cards);
				return evt.filterCard(card, player, evt);
			},
			check: function (button) {
				if (_status.event.getParent().type != "phase") return 1;
				var player = _status.event.player;
				var name = button.link[2],
					color = name == "tao" ? "red" : "black";
				var cards = [];
				game.countPlayer(function (current) {
					cards.addArray(
						current.getExpansions("huamu").filter(function (i) {
							return get.color(i, false) == color;
						})
					);
				});
				var card = get.autoViewAs({ name: name }, cards);
				return player.getUseValue(card, null, true);
			},
			backup: function (links, player) {
				var name = links[0][2],
					color = name == "tao" ? "red" : "black";
				var cards = [];
				game.countPlayer(function (current) {
					cards.addArray(
						current.getExpansions("huamu").filter(function (i) {
							return get.color(i, false) == color;
						})
					);
				});
				if (!cards.length) return false;
				var card = get.autoViewAs({ name: name }, cards);
				return {
					viewAs: card,
					color: color,
					selectCard: -1,
					filterCard: () => false,
					precontent: function () {
						player.addTempSkill("liangyuan_used", "roundStart");
						player.markAuto("liangyuan_used", event.result.card.name);
						player.logSkill("liangyuan");
						var list = [],
							color = lib.skill.liangyuan_backup.color;
						var cards = [];
						game.countPlayer(function (current) {
							var cardsx = current.getExpansions("huamu").filter(function (i) {
								return get.color(i, false) == color;
							});
							if (cardsx.length) {
								cards.addArray(cardsx);
								list.push([current, cardsx]);
								current.$throw(cardsx);
								game.log(current, "将", cardsx, "化作“" + (color == "black" ? "灵杉" : "玉树") + "”良缘");
							}
						});
						event.result.cards = cards;
						delete event.result.skill;
						event.result._apply_args = { throw: false };
						game.loseAsync({
							lose_list: list,
						}).setContent("chooseToCompareLose");
					},
				};
			},
			prompt: function (links, player) {
				var name = links[0][2],
					color = name == "tao" ? "玉树" : "灵杉";
				return "将场上所有的“" + color + "”当做【" + get.translation(name) + "】使用";
			},
		},
		subSkill: {
			used: { charlotte: true, onremove: true },
		},
		ai: {
			order: function (item, player) {
				if (!player) player = _status.event.player;
				return (
					get.order({
						name: lib.skill.liangyuan.hiddenCard(player, "jiu") ? "jiu" : "tao",
					}) + 4
				);
			},
			result: {
				player: function (player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
			combo: "huamu",
			threaten: 3,
		},
	},
	jisi: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		limited: true,
		skillAnimation: true,
		animationColor: "metal",
		filter: function (event, player) {
			var skills = player.getStockSkills("一！", "五！").filter(function (skill) {
				if (skill == "jisi") return false;
				var info = get.info(skill);
				return info && !info.charlotte;
			});
			var history = player.getAllHistory("useSkill");
			for (var i of history) {
				if (skills.includes(i.sourceSkill) || skills.includes(i.skill)) return true;
			}
			return false;
		},
		content: function () {
			"step 0";
			var skills2 = [];
			var skills = player.getStockSkills("只！", "因！").filter(function (skill) {
				if (skill == "jisi") return false;
				var info = get.info(skill);
				return info && !info.charlotte;
			});
			var history = player.getAllHistory("useSkill");
			for (var i of history) {
				if (skills.includes(i.sourceSkill)) skills2.add(i.sourceSkill);
				if (skills.includes(i.skill)) skills2.add(i.skill);
				if (skills.length == skills2.length) break;
			}
			event.skills2 = skills2;
			var str = "令一名其他角色获得";
			for (var i = 0; i < skills2.length; i++) {
				str += "〖" + get.translation(skills2[i]) + "〗";
				if (i != skills2.length - 1) str += ";";
			}
			if (skills2.length > 1) str += "中的一个技能";
			str += "然后你";
			if (player.countCards("h") > 0) str += "弃置所有手牌，并";
			str += "视为对其使用一张【杀】";
			player
				.chooseTarget(get.prompt("jisi"), str, lib.filter.notMe)
				.set("ai", function (target) {
					if (!_status.event.goon) return false;
					var att = get.attitude(player, target);
					if (att < 4) return false;
					var eff = get.effect(target, { name: "sha", isCard: true }, player, player);
					if (eff >= 0) return att + eff;
					if (target.hp <= 2) return false;
					return att / Math.max(1, -eff);
				})
				.set(
					"goon",
					(function () {
						if (player.hasUnknown() || player.identity == "nei") return false;
						var hs = player.getCards("h");
						if (!hs.length || get.value(hs, player) <= 9 - player.hp) return true;
						return false;
					})()
				);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("jisi", target);
				player.awakenSkill("jisi");
				var list = event.skills2;
				if (list.length == 0) event._result = { control: list[0] };
				player
					.chooseControl(list)
					.set("prompt", "令" + get.translation(target) + "获得一个技能")
					.set("ai", () => _status.event.choice)
					.set("choice", list.includes("qianmeng") ? "qianmeng" : list.randomGet());
			} else event.finish();
			"step 2";
			target.addSkills(result.control);
			"step 3";
			var num = player.countCards("h");
			if (num > 0) player.chooseToDiscard("h", num, true);
			"step 4";
			if (player.canUse("sha", target, false))
				player.useCard(
					false,
					target,
					{
						name: "sha",
						isCard: true,
					},
					"noai"
				);
		},
	},
	//周处
	shanduan: {
		audio: 2,
		trigger: { player: "damageEnd" },
		filter: (event, player) => player != _status.currentPhase,
		forced: true,
		content() {
			if (!player.storage.shanduan) player.storage.shanduan = [1, 2, 3, 4];
			var list = player.storage.shanduan;
			for (var i = 0; i < list.length; i++) {
				var num = list[i],
					add = true;
				for (var j = 0; j < list.length; j++) {
					if (list[j] < num) {
						add = false;
						break;
					}
				}
				if (add) {
					list[i]++;
					break;
				}
			}
			player.addTip("shanduan", get.translation("shanduan") + " " + player.storage["shanduan"].slice().join(" "));
			game.delayx();
		},
		init(player, skill) {
			player.storage[skill] = [1, 2, 3, 4];
			player.addTip(skill, get.translation(skill) + " " + player.storage[skill].slice().join(" "));
		},
		onremove: (player, skill) => player.removeTip(skill),
		group: ["shanduan_draw", "shanduan_use", "shanduan_discard"],
		ai: {
			notemp: true,
			threaten: 3.6,
		},
		subSkill: {
			draw: {
				audio: "shanduan",
				trigger: { player: "phaseDrawBegin" },
				filter(event, player) {
					var list = event.getParent()._shanduan;
					return !list || list.length > 0;
				},
				forced: true,
				content() {
					"step 0";
					var list = trigger.getParent()._shanduan;
					if (!list) {
						trigger.getParent()._shanduan = (player.storage.shanduan || [1, 2, 3, 4]).slice(0);
						player.storage.shanduan = [1, 2, 3, 4];
						player.addTip("shanduan", get.translation("shanduan") + " " + trigger.getParent()._shanduan.slice().join(" "));
					}
					"step 1";
					var list = trigger.getParent()._shanduan;
					if (list.length == 1) event._result = { index: 0 };
					else
						player
							.chooseControl(list)
							.set("prompt", "善断：为摸牌阶段的摸牌数分配一个数值")
							.set("choice", list.indexOf(Math.max.apply(Math, list)))
							.set("ai", () => _status.event.choice);
					"step 2";
					var list = trigger.getParent()._shanduan;
					var num = list[result.index];
					trigger.num = num;
					list.remove(num);
					game.log(player, "给", "#g摸牌阶段的摸牌数", "分配的数值是", "#y" + num);
					if (list.length) player.addTip("shanduan", get.translation("shanduan") + " " + list.slice().join(" "));
					else player.addTip("shanduan", get.translation("shanduan") + " " + player.storage.shanduan.slice().join(" "));
				},
			},
			use: {
				audio: "shanduan",
				trigger: { player: "phaseUseBegin" },
				filter(event, player) {
					var list = event.getParent()._shanduan;
					return !list || list.length > 0;
				},
				forced: true,
				content() {
					"step 0";
					var list = trigger.getParent()._shanduan;
					if (!list) {
						trigger.getParent()._shanduan = (player.storage.shanduan || [1, 2, 3, 4]).slice(0);
						player.storage.shanduan = [1, 2, 3, 4];
						player.addTip("shanduan", get.translation("shanduan") + " " + trigger.getParent()._shanduan.slice().join(" "));
					}
					"step 1";
					var list = trigger.getParent()._shanduan;
					if (list.length == 1) event._result = { index: 0 };
					else
						player
							.chooseControl(list)
							.set("prompt", "善断：为攻击范围基数分配一个数值")
							.set("list", list)
							.set("ai", function () {
								var player = _status.event.player,
									list = _status.event.list,
									card = { name: "sha" };
								if (player.hasSha() && player.hasValueTarget(card, false, true) && !player.hasValueTarget(card, null, true)) {
									var range = 1;
									var equips = player.getCards("e");
									for (var i = 0; i < equips.length; i++) {
										var info = get.info(equips[i], false).distance;
										if (!info) continue;
										if (info.attackFrom) {
											range -= info.attackFrom;
										}
									}
									var listx = list.slice(0).sort();
									for (var i of listx) {
										if (i <= range) continue;
										if (
											game.hasPlayer(function (current) {
												var distance = get.distance(player, current, "attack");
												if (distance > 1 && distance <= i - range) return true;
												return false;
											})
										)
											return list.indexOf(i);
									}
								}
								return list.indexOf(Math.min.apply(Math, list));
							});
					"step 2";
					var list = trigger.getParent()._shanduan;
					var num = list[result.index];
					if (!player.storage.shanduan_effect) player.storage.shanduan_effect = {};
					player.storage.shanduan_effect.range = num;
					player.addTempSkill("shanduan_effect");
					list.remove(num);
					game.log(player, "给", "#g攻击范围的基数", "分配的数值是", "#y" + num);
					if (list.length) player.addTip("shanduan", get.translation("shanduan") + " " + list.slice().join(" "));
					else player.addTip("shanduan", get.translation("shanduan") + " " + player.storage.shanduan.slice().join(" "));
					if (list.length == 0) event.finish();
					else if (list.length == 1) event._result = { index: 0 };
					else
						player
							.chooseControl(list)
							.set("prompt", "为使用【杀】的次数上限分配一个数值")
							.set("list", list)
							.set("ai", function () {
								var player = _status.event.player,
									list = _status.event.list;
								var sha = player.countCards("hs", function (card) {
									return get.name(card) == "sha" && player.hasValueTarget(card, null, true);
								});
								var max = player.getCardUsable("sha");
								if (sha <= max) {
									var listx = list.slice(0).sort();
									for (var i of listx) {
										if (max + i >= sha) return list.indexOf(i);
									}
									return list.indexOf(Math.max.apply(Math, list));
								}
								return list.indexOf(Math.min.apply(Math, list));
							});
					"step 3";
					var list = trigger.getParent()._shanduan;
					var num = list[result.index];
					if (!player.storage.shanduan_effect) player.storage.shanduan_effect = {};
					player.storage.shanduan_effect.sha = num;
					list.remove(num);
					game.log(player, "给", "#g使用【杀】的次数上限", "分配的数值是", "#y" + num);
					if (list.length) player.addTip("shanduan", get.translation("shanduan") + " " + list.slice().join(" "));
					else player.addTip("shanduan", get.translation("shanduan") + " " + player.storage.shanduan.slice().join(" "));
				},
			},
			discard: {
				audio: "shanduan",
				trigger: { player: "phaseDiscardBegin" },
				filter(event, player) {
					var list = event.getParent()._shanduan;
					return !list || list.length > 0;
				},
				forced: true,
				content() {
					"step 0";
					var list = trigger.getParent()._shanduan;
					if (!list) {
						trigger.getParent()._shanduan = (player.storage.shanduan || [1, 2, 3, 4]).slice(0);
						player.storage.shanduan = [1, 2, 3, 4];
						player.addTip("shanduan", get.translation("shanduan") + " " + trigger.getParent()._shanduan.slice().join(" "));
					}
					"step 1";
					var list = trigger.getParent()._shanduan;
					if (list.length == 1) event._result = { index: 0 };
					else
						player
							.chooseControl(list)
							.set("prompt", "善断：为手牌上限基数分配一个数值")
							.set("choice", list.indexOf(Math.max.apply(Math, list)))
							.set("ai", () => _status.event.choice);
					"step 2";
					var list = trigger.getParent()._shanduan;
					var num = list[result.index];
					if (!player.storage.shanduan_effect) player.storage.shanduan_effect = {};
					player.storage.shanduan_effect.limit = num;
					player.addTempSkill("shanduan_effect");
					list.remove(num);
					game.log(player, "给", "#g手牌上限的基数", "分配的数值是", "#y" + num);
					if (list.length) player.addTip("shanduan", get.translation("shanduan") + " " + list.slice().join(" "));
					else player.addTip("shanduan", get.translation("shanduan") + " " + player.storage.shanduan.slice().join(" "));
				},
			},
			effect: {
				charlotte: true,
				onremove: true,
				mod: {
					attackRangeBase(player) {
						var map = player.storage.shanduan_effect;
						if (typeof map.range != "number") return;
						var range = 1;
						var equips = player.getCards("e", function (card) {
							return !ui.selected.cards || !ui.selected.cards.includes(card);
						});
						for (var i = 0; i < equips.length; i++) {
							var info = get.info(equips[i], false).distance;
							if (!info) continue;
							if (info.attackFrom) {
								range -= info.attackFrom;
							}
						}
						return Math.max(range, map.range);
					},
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							var map = player.storage.shanduan_effect;
							if (typeof map.sha != "number") return;
							return num - 1 + map.sha;
						}
					},
					maxHandcardBase(player, num) {
						var map = player.storage.shanduan_effect;
						if (typeof map.limit != "number") return;
						return map.limit;
					},
				},
			},
		},
	},
	yilie: {
		audio: 2,
		enable: "chooseToUse",
		hiddenCard: function (player, name) {
			if (get.type(name) == "basic" && lib.inpile.includes(name) && !player.getStorage("yilie_count").includes(name)) {
				var hs = player.getCards("hs");
				if (hs.length < 2) return false;
				var bool = false,
					map = {};
				for (var card of hs) {
					var color = get.color(card);
					if (!map[color]) map[color] = true;
					else {
						bool = true;
						break;
					}
				}
				return bool;
			}
		},
		filter: function (event, player) {
			if (event.type == "wuxie") return false;
			var list = player.getStorage("yilie_count");
			var hs = player.getCards("hs");
			if (hs.length < 2) return false;
			var bool = false,
				map = {};
			for (var card of hs) {
				var color = get.color(card);
				if (!map[color]) map[color] = true;
				else {
					bool = true;
					break;
				}
			}
			if (!bool) return false;
			for (var name of lib.inpile) {
				if (get.type(name) != "basic" || list.includes(name)) continue;
				var card = { name };
				if (event.filterCard(get.autoViewAs(card, "unsure"), player, event)) return true;
				if (name == "sha") {
					for (var nature of lib.inpile_nature) {
						card.nature = nature;
						if (event.filterCard(get.autoViewAs(card, "unsure"), player, event)) return true;
					}
				}
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				var list = [];
				var storage = player.getStorage("yilie_count");
				for (var i of lib.inpile) {
					if (get.type(i) != "basic" || storage.includes(i)) continue;
					var card = { name: i };
					if (event.filterCard(get.autoViewAs(card, "unsure"), player, event)) list.push(["基本", "", i]);
					if (i == "sha") {
						for (var j of lib.inpile_nature) {
							card.nature = j;
							if (event.filterCard(get.autoViewAs(card, "unsure"), player, event)) list.push(["基本", "", i, j]);
						}
					}
				}
				return ui.create.dialog("义烈", [list, "vcard"], "hidden");
			},
			check: function (button) {
				var player = _status.event.player;
				var evt = _status.event.getParent();
				var name = button.link[2],
					card = { name: name, nature: button.link[3] };
				if (name == "shan") return 2;
				if (evt.type == "dying") {
					if (get.attitude(player, evt.dying) < 2) return 0;
					if (name == "jiu") return 2.1;
					return 1.9;
				}
				if (evt.type == "phase") {
					if (button.link[2] == "jiu") {
						if (player.getUseValue({ name: "jiu" }) <= 0) return 0;
						var cards = player.getCards("hs", cardx => get.value(cardx) < 8);
						cards.sort((a, b) => get.value(a) - get.value(b));
						if (cards.some(cardx => get.name(cardx) == "sha" && !cards.slice(0, 2).includes(cardx))) return player.getUseValue({ name: "jiu" });
						return 0;
					}
					return player.getUseValue(card) / 4;
				}
				return 1;
			},
			backup: function (links, player) {
				return {
					audio: "yilie",
					selectCard: 2,
					filterCard: function (card, player) {
						var color = get.color(card);
						if (ui.selected.cards.length) return color == get.color(ui.selected.cards[0]);
						return player.hasCard(function (cardx) {
							return card != cardx && get.color(cardx) == color;
						}, "hs");
					},
					position: "hs",
					complexCard: true,
					check: card => 8 - get.value(card),
					popname: true,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					precontent: function () {
						var name = event.result.card.name;
						player.addTempSkill("yilie_count", "roundStart");
						player.markAuto("yilie_count", [name]);
					},
				};
			},
			prompt: function (links, player) {
				var name = links[0][2];
				var nature = links[0][3];
				return "将两张颜色相同的手牌当做" + (get.translation(nature) || "") + get.translation(name) + "使用";
			},
		},
		ai: {
			order: function (item, player) {
				if (player && _status.event.type == "phase") {
					var add = false,
						max = 0;
					var names = lib.inpile.filter(name => get.type(name) == "basic" && !player.getStorage("yilie_count").includes(name));
					if (names.includes("sha")) add = true;
					names = names.map(namex => {
						return { name: namex };
					});
					if (add) lib.inpile_nature.forEach(nature => names.push({ name: "sha", nature: nature }));
					names.forEach(card => {
						if (player.getUseValue(card) > 0) {
							var temp = get.order(card);
							if (card.name == "jiu") {
								var cards = player.getCards("hs", cardx => get.value(cardx) < 8);
								cards.sort((a, b) => get.value(a) - get.value(b));
								if (!cards.some(cardx => get.name(cardx) == "sha" && !cards.slice(0, 2).includes(cardx))) temp = 0;
							}
							if (temp > max) max = temp;
						}
					});
					if (max > 0) max -= 0.001;
					return max;
				}
				return 0.5;
			},
			respondShan: true,
			respondSha: true,
			fireAttack: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg == "respond") return false;
				var hs = player.getCards("hs");
				if (hs.length < 2) return false;
				var bool = false,
					map = {};
				for (var card of hs) {
					var color = get.color(card);
					if (!map[color]) map[color] = true;
					else {
						bool = true;
						break;
					}
				}
				if (!bool) return false;
				var storage = player.storage.yilie_count;
				var name;
				switch (tag) {
					case "respondShan":
						name = "shan";
						break;
					default:
						name = "sha";
						break;
				}
				if (storage && storage.includes(name)) return false;
			},
			result: {
				player: function (player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
		subSkill: {
			count: { charlotte: true, onremove: true },
			backup: { audio: "yilie" },
		},
	},
	//赵俨
	tongxie: {
		audio: 2,
		trigger: { player: "phaseUseBegin" },
		direct: true,
		content: function () {
			"step 0";
			player.chooseTarget(get.prompt("tongxie"), "选择至多两名其他角色作为“同协角色”", lib.filter.notMe, [0, 2]).set("ai", function (target) {
				return get.attitude(_status.event.player, target);
			});
			"step 1";
			if (result.bool) {
				var targets = result.targets;
				targets.add(player);
				player.logSkill("tongxie", targets);
				player.addTempSkill("tongxie_effect", { player: "phaseBegin" });
				player.markAuto("tongxie_effect", targets);
				var min = player.countCards("h"),
					min_player = player;
				for (var i of targets) {
					if (i == player) continue;
					var num = i.countCards("h");
					if (num < min) {
						min = num;
						min_player = i;
					} else if (num == min) min_player = false;
				}
				if (min_player) min_player.draw();
				else game.delayx();
			}
		},
		subSkill: {
			effect: {
				audio: "tongxie",
				charlotte: true,
				trigger: { global: "useCardAfter" },
				onremove: true,
				forced: true,
				popup: false,
				filter: function (event, player) {
					if (event.card.name != "sha" || event.targets.length != 1 || !event.targets[0].isIn()) return false;
					if (event.getParent(2).name == "tongxie_effect") return false;
					var list = player.getStorage("tongxie_effect"),
						target = event.targets[0];
					if (!list.includes(event.player)) return false;
					for (var i of list) {
						if (i == event.player || !i.isIn()) continue;
						if (!i.canUse("sha", target, false)) continue;
						if (_status.connectMode && i.countCards("hs") > 0) return true;
						if (i.hasSha()) return true;
					}
					return false;
				},
				content: function () {
					"step 0";
					event.targets = player
						.getStorage("tongxie_effect")
						.filter(function (i) {
							return i !== trigger.player;
						})
						.sortBySeat();
					event.target = trigger.targets[0];
					"step 1";
					var current = targets.shift();
					if (current.isIn() && target.isIn() && current.canUse("sha", target, false) && (_status.connectMode || current.hasSha())) {
						current
							.chooseToUse(function (card, player, event) {
								if (get.name(card) != "sha") return false;
								return lib.filter.filterCard.apply(this, arguments);
							}, "同协：是否对" + get.translation(target) + "使用一张杀？")
							.set("targetRequired", true)
							.set("complexSelect", true)
							.set("filterTarget", function (card, player, target) {
								if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
								return lib.filter.targetEnabled.apply(this, arguments);
							})
							.set("sourcex", target)
							.set("logSkill", "tongxie_effect")
							.set("addCount", false);
						if (targets.length > 0) event.redo();
					}
				},
				group: ["tongxie_damage", "tongxie_count"],
			},
			damage: {
				audio: "tongxie",
				charlotte: true,
				trigger: { global: "damageBegin4" },
				filter: function (event, player) {
					var list = player.getStorage("tongxie_effect");
					if (!list.includes(event.player)) return false;
					for (var i of list) {
						if (i != event.player && i.isIn() && !i.hasSkill("tongxie_count2", null, null, false)) return true;
					}
					return false;
				},
				forced: true,
				popup: false,
				content: function () {
					"step 0";
					event.targets = player
						.getStorage("tongxie_effect")
						.filter(function (i) {
							return i != trigger.player && i.isIn() && !i.hasSkill("tongxie_count2", null, null, false);
						})
						.sortBySeat();
					event.num = 0;
					"step 1";
					var target = targets[num];
					event.num++;
					event.target = target;
					target.chooseBool("同协：是否为" + get.translation(trigger.player) + "阻挡伤害？", "失去1点体力，防止" + get.translation(trigger.player) + "即将受到的" + get.cnNumber(trigger.num) + "点伤害").set("ai", function () {
						var player = _status.event.player,
							target = _status.event.getTrigger().player;
						var trigger = _status.event.getTrigger();
						var eff1 = get.damageEffect(target, trigger.source, player, trigger.nature);
						if (trigger.num > 1) eff1 = Math.min(-1, eff1) * trigger.num;
						var eff2 = get.effect(player, { name: "losehp" }, player, player);
						return eff2 > eff1;
					});
					"step 2";
					if (result.bool) {
						target.logSkill("tongxie_damage", trigger.player);
						trigger.cancel();
						target.loseHp();
					} else if (num < targets.length) event.goto(1);
				},
			},
			count: {
				trigger: { global: "loseHpEnd" },
				charlotte: true,
				forced: true,
				firstDo: true,
				popup: false,
				silent: true,
				filter: function (event, player) {
					return player.getStorage("tongxie_effect").includes(event.player);
				},
				content: function () {
					trigger.player.addTempSkill("tongxie_count2");
				},
			},
			count2: { charlotte: true },
		},
	},
	//群马超
	olzhuiji: {
		mod: {
			globalFrom: function (from, to) {
				if (from.hp >= to.hp) return -Infinity;
			},
		},
		trigger: { player: "useCardToPlayered" },
		filter: function (event, player) {
			return event.card.name == "sha" && event.target.countCards("he") > 0 && get.distance(player, event.target) == 1;
		},
		forced: true,
		logTarget: "target",
		content: function () {
			"step 0";
			var target = trigger.target;
			event.target = target;
			if (target.countCards("e") == 0) event._result = { index: 0 };
			else
				target
					.chooseControl()
					.set("choiceList", ["弃置一张牌", "重铸装备区的所有牌"])
					.set("ai", function (card) {
						var min = Infinity,
							equ = 0,
							es = player.getCards("e"),
							hs = player.getCards("he");
						for (var i of hs) {
							var val = get.value(i);
							min = Math.min(min, val);
							if (es.includes(i)) equ += val;
						}
						equ /= es.length;
						if (min < equ - 1) return 0;
						return 1;
					});
			"step 1";
			if (result.index == 0) {
				target.chooseToDiscard("he", true);
			} else {
				target.recast(target.getCards("e", lib.filter.cardRecastable));
			}
		},
	},
	//蒲元
	olshengong: {
		audio: 2,
		enable: "phaseUse",
		usable: 3,
		filter: function (event, player) {
			var list = ["equip1", "equip2", "others"].filter(i => !player.getStorage("olshengong_used").includes(i));
			if (!list.length) return false;
			return player.hasCard(function (card) {
				var type = get.type(card);
				if (type != "equip") return false;
				var subtype = get.subtype(card);
				if (subtype != "equip1" && subtype != "equip2") subtype = "others";
				return list.includes(subtype);
			}, "eh");
		},
		filterCard: function (card, player) {
			var type = get.type(card);
			if (type != "equip") return false;
			var subtype = get.subtype(card);
			if (subtype != "equip1" && subtype != "equip2") subtype = "others";
			return !player.getStorage("olshengong_used").includes(subtype);
		},
		position: "he",
		check: function (card) {
			var val = 7.52 - get.value(card);
			if (val <= 0) return 0;
			var player = _status.event.player;
			if (player.getStorage("olshengong_destroy").includes(card)) val += 2;
			return val;
		},
		content: function () {
			"step 0";
			var subtype = get.subtype(cards[0]);
			if (subtype != "equip1" && subtype != "equip2") subtype = "others";
			player.addTempSkill("olshengong_used", "phaseUseAfter");
			player.markAuto("olshengong_used", subtype);
			var send = function () {
				game.me.chooseControl("助力锻造！", "妨碍锻造！", "什么都不做");
				game.resume();
			};
			var sendback = function (result, player) {
				if (result) {
					var index = result.index;
					game.log(player, "选择了", ["#b助力锻造", "#g妨碍锻造", "#b什么都不做"][index]);
					if (index > 1) return;
					var card = get.cards()[0];
					if (!card) return;
					game.log(player, "展示了", card);
					event.cardsx.push(card);
					event.cards2[index].push(card);
					game.broadcastAll(
						function (id, card, name, index) {
							var dialog = get.idDialog(id);
							if (!dialog) return;
							var button = ui.create.button(card, "card", dialog.buttonss[index]);
							button.querySelector(".info").innerHTML = name + "|" + get.strNumber(card.number);
						},
						event.videoId,
						card,
						(function (target) {
							if (target._tempTranslate) return target._tempTranslate;
							var name = target.name;
							if (lib.translate[name + "_ab"]) return lib.translate[name + "_ab"];
							return get.translation(name);
						})(player),
						index
					);
				}
			};
			event.players = game.filterPlayer();
			event.cardsx = [];
			event.cards2 = [[], []];
			event.videoId = lib.status.videoId++;
			event.ai_targets = [];
			game.broadcastAll(
				function (name, id) {
					var dialog = ui.create.dialog(name + "发起了“锻造”", "hidden", "forcebutton");
					dialog.videoId = id;
					dialog.classList.add("scroll1");
					dialog.classList.add("scroll2");
					dialog.classList.add("fullwidth");
					dialog.classList.add("fullheight");
					ui.arena.classList.add("choose-to-move");
					dialog.buttonss = [];

					var list = ["协力锻造的玩家", "妨碍锻造的玩家"];
					for (var i = 0; i < list.length; i++) {
						dialog.add('<div class="text center">' + list[i] + "</div>");
						var buttons = ui.create.div(".buttons", dialog.content);
						dialog.buttonss.push(buttons);
						buttons.classList.add("popup");
						buttons.classList.add("guanxing");
					}
					dialog.open();
				},
				get.translation(player),
				event.videoId
			);
			for (var i = 0; i < event.players.length; i++) {
				if (event.players[i] == player) {
					sendback({ index: 0 }, player);
				} else if (event.players[i].isOnline()) {
					event.withol = true;
					event.players[i].send(send);
					event.players[i].wait(sendback);
				} else if (event.players[i] == game.me) {
					event.withme = true;
					game.me.chooseControl("助力锻造！", "妨碍锻造！", "什么都不做");
					if (_status.connectMode) game.me.wait(sendback);
				} else {
					event.ai_targets.push(event.players[i]);
					if (_status.connectMode) event.players[i].showTimer();
				}
			}
			if (event.ai_targets.length) {
				event.ai_targets.randomSort();
				setTimeout(function () {
					event.interval = setInterval(function () {
						var target = event.ai_targets.shift();
						var att = get.attitude(target, player);
						var num = 2;
						if (att > 0) num = 0;
						else if (att < 0) num = 1;
						sendback({ index: num }, target);
						if (_status.connectMode) target.hideTimer();
						if (!event.ai_targets.length) {
							clearInterval(event.interval);
							if (event.withai) game.resume();
						}
					}, 750);
				}, 500);
			}
			"step 1";
			if (event.withme) {
				if (_status.connectMode) game.me.unwait(result);
				else {
					var index = result.index;
					game.log(game.me, "选择了", ["#b助力锻造", "#g妨碍锻造", "#b什么都不做"][index]);
					if (index > 1) return;
					var card = get.cards()[0];
					if (!card) return;
					game.log(game.me, "展示了", card);
					event.cardsx.push(card);
					event.cards2[index].push(card);
					game.broadcastAll(
						function (id, card, name, index) {
							var dialog = get.idDialog(id);
							if (!dialog) return;
							var button = ui.create.button(card, "card", dialog.buttonss[index]);
							button.querySelector(".info").innerHTML = name + "|" + get.strNumber(card.number);
						},
						event.videoId,
						card,
						(function (target) {
							if (target._tempTranslate) return target._tempTranslate;
							var name = target.name;
							if (lib.translate[name + "_ab"]) return lib.translate[name + "_ab"];
							return get.translation(name);
						})(game.me),
						index
					);
				}
			}
			"step 2";
			if (event.withol && !event.resultOL) {
				game.pause();
			}
			"step 3";
			if (event.ai_targets.length > 0) {
				event.withai = true;
				game.pause();
			}
			"step 4";
			game.broadcastAll(function () {
				setTimeout(function () {
					ui.arena.classList.remove("choose-to-move");
				}, 500);
			});
			game.delay(2);
			var num1 = 0,
				num2 = 0;
			for (var i of event.cards2[0]) num1 += get.number(i, false);
			for (var i of event.cards2[1]) num2 += get.number(i, false);
			var result = 2;
			if (num1 < num2) result = 0;
			else if (num2 > 0) result = 1;
			event.duanzao_result = result;
			game.broadcastAll(
				function (id, result) {
					var dialog = get.idDialog(id);
					if (dialog) dialog.content.firstChild.innerHTML = ["锻造失败…", "锻造成功", "完美锻造！"][result];
				},
				event.videoId,
				result
			);
			"step 5";
			game.cardsGotoOrdering(event.cardsx);
			game.broadcastAll("closeDialog", event.videoId);
			"step 6";
			var subtype = get.subtype(cards[0]);
			if (subtype != "equip1" && subtype != "equip2") subtype = "others";
			var card_map = {
				equip1: [
					["diamond", 13, "bintieshuangji"],
					["diamond", 1, "wuxinghelingshan"],
					["spade", 13, "wutiesuolian"],
					["diamond", 12, "wushuangfangtianji"],
					["spade", 6, "chixueqingfeng"],
					["spade", 5, "guilongzhanyuedao"],
				],
				equip2: [
					["club", 1, "huxinjing"],
					["club", 2, "heiguangkai"],
					["spade", 2, "linglongshimandai"],
					["club", 1, "hongmianbaihuapao"],
					["spade", 2, "qimenbagua"],
					["spade", 9, "guofengyupao"],
				],
				others: [
					["diamond", 1, "zhaogujing"],
					["spade", 5, "sanlve"],
					["club", 12, "tianjitu"],
					["spade", 2, "taigongyinfu"],
					["diamond", 1, "shufazijinguan"],
					["club", 4, "xuwangzhimian"],
				],
			};
			if (!_status.olshengong_map) _status.olshengong_map = {};
			if (!_status.olshengong_maken) _status.olshengong_maken = {};
			var list = card_map[subtype];
			for (var i = 0; i < list.length; i++) {
				var name = list[i][2];
				if (!lib.card[name] || _status.olshengong_map[name]) {
					list.splice(i--, 1);
				}
			}
			if (!list.length) event.finish();
			else
				player.chooseButton(["请选择一种装备牌", [list.randomGets(event.duanzao_result + 1), "vcard"]], true).set("ai", function (button) {
					return get.value({ name: button.link[2] }, player, "raw");
				});
			"step 7";
			var name = result.links[0][2];
			var card;
			if (_status.olshengong_maken[name]) card = _status.olshengong_maken[name];
			else {
				card = game.createCard2(name, result.links[0][0], result.links[0][1]);
				_status.olshengong_maken[name] = card;
			}
			event.card = card;
			player.addSkill("olshengong_destroy");
			player.markAuto("olshengong_destroy", [card]);
			if (
				!game.hasPlayer(function (current) {
					return current.canEquip(card);
				})
			) {
				event.finish();
				return;
			}
			player
				.chooseTarget(true, "将" + get.translation(card) + "置于一名角色的装备区内", function (card, player, target) {
					return target.canEquip(_status.event.card, true);
				})
				.set("card", card)
				.set("ai", function (target) {
					var card = _status.event.getParent().card,
						player = _status.event.player;
					return get.effect(target, card, player, player);
				});
			"step 8";
			if (result.bool) {
				_status.olshengong_map[card.name] = true;
				var target = result.targets[0];
				player.line(target, "green");
				target.$gain2(card);
				game.delayx();
				target.equip(card);
			}
		},
		ai: {
			order: 10,
			result: { player: 1 },
		},
		subSkill: {
			used: { charlotte: true, onremove: true },
			destroy: {
				trigger: { global: ["loseEnd", "cardsDiscardEnd"] },
				forced: true,
				charlotte: true,
				popup: false,
				onremove: true,
				filter: function (event, player) {
					if (event.name == "lose" && event.position != ui.discardPile) return false;
					var storage = player.storage.olshengong_destroy;
					if (!storage) return false;
					for (var i of event.cards) {
						if (storage.includes(i)) return true;
					}
					return false;
				},
				content: function () {
					var cards = [];
					var storage = player.storage.olshengong_destroy;
					for (var i of trigger.cards) {
						if (storage.includes(i)) {
							delete _status.olshengong_map[i.name];
							storage.remove(i);
							cards.push(i);
						}
					}
					game.cardsGotoSpecial(cards);
					game.log(cards, "被移出了游戏");
					player.addTempSkill("olshengong_draw");
					player.addMark("olshengong_draw", cards.length, false);
					if (!storage.length) player.removeSkill("olshengong_destroy");
				},
			},
			draw: {
				audio: "olshengong",
				trigger: { global: "phaseJieshuBegin" },
				forced: true,
				charlotte: true,
				onremove: true,
				filter: function (event, player) {
					return player.countMark("olshengong_draw") > 0;
				},
				content: function () {
					player.draw(player.countMark("olshengong_draw"));
				},
			},
		},
	},
	olqisi: {
		audio: 2,
		trigger: { player: "phaseDrawBegin2" },
		filter: function (event, player) {
			return !event.numFixed && event.num > 0;
		},
		check: function (event, player) {
			if (player.hasEmptySlot(2) || player.hasEmptySlot(5) || player.hasEmptySlot(1)) return true;
			return false;
		},
		prompt2: "摸牌阶段开始时，你可以少摸一张牌并声明一种装备牌的副类别，然后从牌堆或弃牌堆中获得一张该副类别的牌。",
		content: function () {
			"step 0";
			player
				.chooseControl("equip1", "equip2", "equip6", "equip5")
				.set("prompt", "选择获得一种副类别的装备牌")
				.set("ai", function (card) {
					if (player.hasEmptySlot(2)) return "equip2";
					if (player.hasEmptySlot(5)) return "equip5";
					if (player.hasEmptySlot(1)) return "equip1";
					return "equip6";
				});
			"step 1";
			var card = get.cardPile(function (card) {
				var type = get.subtype(card);
				if (result.control == "equip6") return type == "equip3" || type == "equip4";
				return type == result.control;
			});
			if (card) {
				trigger.num--;
				player.gain(card, "gain2");
			}
		},
		group: "olqisi_init",
		subSkill: {
			init: {
				audio: "olqisi",
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				forced: true,
				locked: false,
				filter: function (event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				content: function () {
					"step 0";
					var i = 0;
					var list = [];
					while (i++ < 2) {
						var card = get.cardPile(function (card) {
							if (get.type(card) != "equip") return false;
							return list.length == 0 || get.subtype(card) != get.subtype(list[0]);
						});
						if (card) list.push(card);
					}
					if (!list.length) {
						event.finish();
						return;
					}
					event.list = list;
					player.gain(event.list, "gain2");
					"step 1";
					game.delay(1);
					var card = event.list.shift();
					if (player.getCards("h").includes(card)) {
						player.$give(card, player, false);
						player.equip(card);
					}
					if (event.list.length) event.redo();
				},
			},
		},
	},
	//蒲元衍生
	zhaogujing_skill: {
		equipSkill: true,
		trigger: { player: "phaseUseEnd" },
		direct: true,
		filter: function (event, player) {
			return player.hasCard(function (card) {
				if (_status.connectMode) return true;
				var type = get.type(card, null, player);
				return type == "basic" || type == "trick";
			}, "h");
		},
		content: function () {
			"step 0";
			player
				.chooseCard("h", get.prompt("zhaogujing_skill"), "展示并视为使用一张基本牌或普通锦囊牌", function (card, player) {
					var type = get.type(card, null, player);
					return type == "basic" || type == "trick";
				})
				.set("ai", function (card) {
					var player = _status.event.player,
						name = get.name(card, player);
					if (name == "jiu") return 0;
					return player.getUseValue({
						name: name,
						nature: get.nature(card, player),
						isCard: true,
					});
				});
			"step 1";
			if (result.bool) {
				player.logSkill("zhaogujing_skill");
				player.showCards(result.cards, get.translation(player) + "发动了【照骨镜】");
				var card = {
					name: get.name(result.cards[0], player),
					nature: get.nature(result.cards[0], player),
					isCard: true,
				};
				player.chooseUseTarget(card, true, false);
			}
		},
	},
	sanlve_skill: {
		equipSkill: true,
		mod: {
			maxHandcard: function (player, num) {
				return num + 1;
			},
			attackRange: function (player, num) {
				return num + 1;
			},
			cardUsable: function (card, player, num) {
				if (card.name == "sha") return num + 1;
			},
		},
	},
	xuwangzhimian: {
		equipSkill: true,
		trigger: { player: "phaseDrawBegin2" },
		forced: true,
		filter: function (event, player) {
			return !event.numFixed;
		},
		content: function () {
			trigger.num += 2;
		},
		mod: {
			maxHandcard: function (player, num) {
				return num - 1;
			},
		},
	},
	shufazijinguan_skill: {
		equipSkill: true,
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("shufazijinguan"), "对一名其他角色造成1点伤害", function (card, player, target) {
					return player != target;
				})
				.set("ai", function (target) {
					return get.damageEffect(target, player, player);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("shufazijinguan_skill", result.targets[0]);
				result.targets[0].damage();
			}
		},
	},
	qimenbagua: {
		equipSkill: true,
		trigger: { target: "useCardToBefore" },
		forced: true,
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			if (player.hasSkillTag("unequip2")) return false;
			if (
				event.player.hasSkillTag("unequip", false, {
					name: event.card ? event.card.name : null,
					target: player,
					card: event.card,
				})
			)
				return false;
			return true;
		},
		content: function () {
			trigger.cancel();
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (card.name != "sha") return;
					if (
						target.hasSkillTag("unequip2") ||
						player.hasSkillTag("unequip", false, {
							name: card ? card.name : null,
							target: player,
							card: card,
						}) ||
						player.hasSkillTag("unequip_ai", false, {
							name: card ? card.name : null,
							target: player,
							card: card,
						})
					)
						return;
					return "zeroplayertarget";
				},
			},
		},
	},
	guofengyupao: {
		equipSkill: true,
		mod: {
			targetEnabled: function (card, player, target) {
				if (player == target || get.type(card) != "trick") return;
				if (target.hasSkillTag("unequip2")) return;
				if (
					player.hasSkillTag("unequip", false, {
						name: card ? card.name : null,
						target: player,
						card: card,
					})
				)
					return;
				return false;
			},
		},
	},
	hongmianbaihuapao_skill: {
		equipSkill: true,
		trigger: {
			player: "damageBegin4",
		},
		filter: function (event, player) {
			if (!event.hasNature("linked")) return false;
			if (player.hasSkillTag("unequip2")) return false;
			if (
				event.source &&
				event.source.hasSkillTag("unequip", false, {
					name: event.card ? event.card.name : null,
					target: player,
					card: event.card,
				})
			)
				return false;
			return true;
		},
		forced: true,
		content: function () {
			trigger.cancel();
		},
		ai: {
			nofire: true,
			nothunder: true,
			effect: {
				target: function (card, player, target, current) {
					if (!get.tag(card, "natureDamage")) return;
					if (
						!target.hasSkillTag("unequip2") &&
						!player.hasSkillTag("unequip", false, {
							name: card ? card.name : null,
							target: player,
							card: card,
						}) &&
						!player.hasSkillTag("unequip_ai", false, {
							name: card ? card.name : null,
							target: player,
							card: card,
						})
					)
						return "zeroplayertarget";
				},
			},
		},
	},
	linglongshimandai_skill: {
		equipSkill: true,
		trigger: {
			target: "useCardToTargeted",
		},
		filter: function (event, player) {
			if ((event.targets && event.targets.length > 1) || event.player == player) return false;
			if (player.hasSkillTag("unequip2")) return false;
			var evt = event.getParent();
			if (
				evt.player &&
				evt.player.hasSkillTag("unequip", false, {
					name: evt.card ? evt.card.name : null,
					target: player,
					card: evt.card,
				})
			)
				return false;
			return true;
		},
		audio: true,
		check: function (event, player) {
			return get.effect(player, event.card, event.player, player) <= 0;
		},
		prompt2: event => "进行一次判定。若结果为♥，则" + get.translation(event.card) + "对你无效",
		content: function () {
			"step 0";
			player.judge("linglongshimandai", function (card) {
				return get.suit(card) == "heart" ? 1.5 : -0.5;
			}).judge2 = function (result) {
				return result.bool ? true : false;
			};
			"step 1";
			if (result.judge > 0) {
				trigger.getParent().excluded.add(player);
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, effect) {
					if (
						effect > 0 ||
						player.hasSkillTag("unequip", false, {
							name: card ? card.name : null,
							target: player,
							card: card,
						}) ||
						player.hasSkillTag("unequip_ai", false, {
							name: card ? card.name : null,
							target: player,
							card: card,
						})
					)
						return;
					return 0.75;
				},
			},
		},
	},
	bintieshuangji_skill: {
		equipSkill: true,
		trigger: { player: "shaMiss" },
		filter: function (event, player) {
			return player.hp > 0;
		},
		prompt2: function (event, player) {
			var prompt = "失去1点体力，然后";
			var cards = event.cards.filterInD();
			if (cards.length) prompt += "获得" + get.translation(cards) + "、";
			prompt += "摸一张牌、本回合使用【杀】的次数上限+1";
			return prompt;
		},
		check: function (event, player) {
			if (get.effect(player, { name: "losehp" }, player, player) > 0) return true;
			return player.hp > event.target.hp && event.cards.filterInD().length > 0;
		},
		content: function () {
			"step 0";
			player.loseHp();
			"step 1";
			var cards = trigger.cards.filterInD();
			if (cards.length) player.gain(cards, "gain2");
			player.draw();
			"step 2";
			player.addTempSkill("bintieshuangji_skill_effect");
			player.addMark("bintieshuangji_skill_effect", 1, false);
		},
		subSkill: {
			effect: {
				charlotte: true,
				intro: { content: "使用【杀】的次数上限+#" },
				onremove: true,
				mod: {
					cardUsable: function (card, player, num) {
						if (card.name == "sha") return num + player.countMark("bintieshuangji_skill_effect");
					},
				},
			},
		},
	},
	chixueqingfeng: {
		equipSkill: true,
		trigger: { player: "useCardToPlayered" },
		filter: function (event) {
			return event.card.name == "sha";
		},
		logTarget: "target",
		forced: true,
		content: function () {
			var target = trigger.target;
			target.addTempSkill("chixueqingfeng2");
			target.markAuto("chixueqingfeng2", [trigger.card]);
		},
		ai: {
			unequip_ai: true,
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg && arg.card && arg.card.name == "sha") return true;
				return false;
			},
		},
	},
	chixueqingfeng2: {
		equipSkill: true,
		trigger: { global: "useCardAfter" },
		forced: true,
		charlotte: true,
		popup: false,
		firstDo: true,
		onremove: true,
		filter: function (event, player) {
			return player.storage.chixueqingfeng2 && player.storage.chixueqingfeng2.includes(event.card);
		},
		content: function () {
			player.storage.chixueqingfeng2.remove(trigger.card);
			if (!player.storage.chixueqingfeng2.length) player.removeSkill("chixueqingfeng2");
		},
		mark: true,
		marktext: "※",
		intro: {
			content: "防具技能无效，且不能使用或打出手牌",
		},
		mod: {
			cardEnabled2: function (card) {
				if (get.position(card) == "h") return false;
			},
		},
		ai: {
			unequip2: true,
		},
	},
	guilongzhanyuedao: {
		equipSkill: true,
		trigger: { player: "useCard" },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == "sha" && get.color(event.card) == "red";
		},
		content: function () {
			trigger.directHit.addArray(game.players);
		},
		ai: {
			unequip_ai: true,
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg && arg.card && arg.card.name == "sha" && get.color(arg.card) == "red") return true;
				return false;
			},
		},
	},
	wushuangfangtianji_skill: {
		equipSkill: true,
		trigger: {
			source: "damageSource",
		},
		filter: function (event, player) {
			return event.card && event.card.name == "sha" && event.getParent().type == "card";
		},
		direct: true,
		content: function () {
			"step 0";
			var target = trigger.player;
			var choices = ["摸一张牌"];
			if (
				target.hasCard(function (card) {
					return lib.filter.canBeDiscarded(card, player, target);
				}, "he")
			)
				choices.push("弃置" + get.translation(target) + "的一张牌");
			player
				.chooseControl("cancel2")
				.set("choiceList", choices)
				.set("prompt", get.prompt("wushuangfangtianji_skill"))
				.set("ai", function () {
					var player = _status.event.player,
						target = _status.event.getTrigger().player;
					if (
						target.hasCard(function (card) {
							return lib.filter.canBeDiscarded(card, player, target);
						}, "he") &&
						get.effect(target, { name: "guohe_copy2" }, player, player) > get.effect(player, { name: "draw" }, player, player)
					)
						return 1;
					return 0;
				});
			"step 1";
			if (result.control == "cancel2") return;
			if (result.index == 0) {
				player.logSkill("wushuangfangtianji_skill");
				player.draw();
			} else {
				var target = trigger.player;
				player.logSkill("wushuangfangtianji_skill", target);
				player.discardPlayerCard(target, "he", true);
			}
		},
	},
	//芮姬
	qiaoli: {
		onChooseToUse: function (event) {
			if (event.type == "phase" && !game.online && !(event.qiaoli_equip1 && event.qiaoli_noequip1)) {
				let player = event.player;
				const list = player.getStorage("qiaoli_used");
				if (list.includes("equip1")) event.set("qiaoli_equip1", true);
				if (list.length && list.some(i => i != "equip1")) event.set("qiaoli_noequip1", true);
			}
		},
		audio: 2,
		enable: "phaseUse",
		viewAs: {
			name: "juedou",
			qiaoli: true,
		},
		filterCard: function (card, player) {
			if (get.type(card) != "equip") return false;
			var event = _status.event;
			if (get.subtype(card) == "equip1" && event.qiaoli_equip1) return false;
			if (get.subtype(card) != "equip1" && event.qiaoli_noequip1) return false;
			return true;
		},
		viewAsFilter: function (player) {
			return (
				player.isPhaseUsing() &&
				player.hasCard(function (card) {
					return lib.skill.qiaoli.filterCard(card, player);
				}, "hes")
			);
		},
		check: function (card) {
			if (get.position(card) == "e") return 7.5 - get.value(card);
			return 12 - _status.event.player.getUseValue(card);
		},
		position: "hes",
		precontent: function () {
			player.addTempSkill("qiaoli_used");
			const subtype = get.subtype(event.result.cards[0]) || "equip";
			player.markAuto("qiaoli_used", [subtype]);
			player.addTempSkill("qiaoli_norespond");
			player.addTempSkill("qiaoli_effect");
		},
		ai: {
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				return arg && arg.card && arg.card.name == "juedou" && _status.event.skill == "qiaoli";
			},
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
			norespond: {
				charlotte: true,
				trigger: { player: "useCard1" },
				filter: function (event, player) {
					return event.card.qiaoli && get.subtype(event.cards[0]) != "equip1";
				},
				forced: true,
				popup: false,
				content: function () {
					player.addTempSkill("qiaoli_gain");
					trigger.directHit.addArray(game.players);
					game.log(trigger.card, "不可被响应");
				},
			},
			effect: {
				charlotte: true,
				trigger: { source: "damageSource" },
				filter: function (event, player) {
					return event.card && event.cards && event.card.qiaoli && get.subtype(event.cards[0]) == "equip1";
				},
				forced: true,
				popup: false,
				content: function () {
					"step 0";
					var card = trigger.cards[0];
					var num = 1;
					var info = get.info(card, false);
					if (info && info.distance && typeof info.distance.attackFrom == "number") num -= info.distance.attackFrom;
					player.draw(num);
					"step 1";
					var cards = result;
					if (get.itemtype(cards) != "cards") {
						event.finish(5);
						return;
					}
					var hs = player.getCards("h");
					cards = cards.filter(function (card) {
						return hs.includes(card);
					});
					if (!cards.length) {
						event.finish(5);
						return;
					}
					event.cards = cards;
					if (_status.connectMode)
						game.broadcastAll(function () {
							_status.noclearcountdown = true;
						});
					event.given_map = {};
					"step 2";
					player.chooseCardTarget({
						filterCard: function (card) {
							return _status.event.cards.includes(card) && !card.hasGaintag("qiaoli_given");
						},
						cards: cards,
						filterTarget: lib.filter.notMe,
						selectCard: [1, cards.length],
						prompt: "是否将获得的牌分配给其他角色？",
						ai1: function (card) {
							return -1;
						},
						ai2: function (target) {
							return -1;
						},
					});
					"step 3";
					if (result.bool) {
						var res = result.cards,
							target = result.targets[0].playerid;
						player.addGaintag(res, "qiaoli_given");
						cards.removeArray(res);
						if (!event.given_map[target]) event.given_map[target] = [];
						event.given_map[target].addArray(res);
						if (cards.length) event.goto(2);
					}
					"step 4";
					if (_status.connectMode) {
						game.broadcastAll(function () {
							delete _status.noclearcountdown;
						});
						game.stopCountChoose();
					}
					for (var i in event.given_map) {
						var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
						player.line(source, "green");
						source.gain(event.given_map[i], player, "giveAuto");
					}
					event.next.sort(function (a, b) {
						return lib.sort.seat(a.player, b.player);
					});
				},
			},
			gain: {
				charlotte: true,
				audio: "qiaoli",
				trigger: { player: "phaseJieshuBegin" },
				forced: true,
				content: function () {
					var card = get.cardPile2(function (card) {
						return get.type(card) == "equip";
					});
					if (card) player.gain(card, "gain2");
				},
			},
		},
	},
	qingliang: {
		audio: 2,
		trigger: { target: "useCardToTarget" },
		filter: function (event, player) {
			if (event.targets.length != 1) return false;
			var bool1 = event.card.name == "sha";
			var bool2 = get.type2(event.card) == "trick" && get.tag(event.card, "damage");
			if (!bool1 && !bool2) return false;
			return player != event.player && player.countCards("h") > 0;
		},
		usable: 1,
		logTarget: "player",
		check: function (event, player) {
			if (get.attitude(player, event.player) > 0 || event.player.hasSkillTag("nogain")) return true;
			var eff = get.effect(player, event.card, event.player, player);
			if (eff >= 0) return false;
			var suits = [],
				banned = [],
				hs = player.getCards("h");
			for (var i of hs) {
				var suit = get.suit(i, player);
				suits.add(suit);
				if (!lib.filter.cardDiscardable(i, player, "qingliang")) banned.add(suit);
			}
			suits.removeArray(banned);
			for (var i of suits) {
				var cards = player.getCards("h", function (card) {
					return get.suit(card, player) == i;
				});
				if (-eff / 2 - get.value(cards, player) > 0) return true;
			}
			return false;
		},
		content: function () {
			"step 0";
			player.showHandcards(get.translation(player) + "发动了【清靓】");
			"step 1";
			var suits = [],
				banned = [],
				hs = player.getCards("h");
			for (var i of hs) {
				var suit = get.suit(i, player);
				suits.add(suit);
				if (!lib.filter.cardDiscardable(i, player, "qingliang")) banned.add(suit);
			}
			if (suits.length > banned.length) {
				player
					.chooseControl()
					.set("choiceList", ["和" + get.translation(trigger.player) + "各摸一张牌", "弃置一种花色的所有手牌，令" + get.translation(trigger.card) + "对自己无效"])
					.set("ai", function () {
						var player = _status.event.player,
							event = _status.event.getTrigger();
						if (get.attitude(player, event.player) > 0 || event.player.hasSkillTag("nogain")) return 0;
						return 1;
					});
				event.suits = suits;
				suits.removeArray(banned);
				suits.sort();
			} else {
				event._result = { index: 0 };
			}
			"step 2";
			if (result.index == 0) {
				var list = [player, trigger.player].sortBySeat();
				list[0].draw("nodelay");
				list[1].draw();
				event.finish();
			} else {
				if (event.suits.length == 1) event._result = { control: event.suits[0] };
				else
					player
						.chooseControl(event.suits)
						.set("prompt", "选择弃置一种花色的所有牌")
						.set("ai", function () {
							var player = _status.event.player,
								list = _status.event.controls.slice(0);
							var gett = function (suit) {
								var cards = player.getCards("h", function (card) {
									return get.suit(card, player) == suit;
								});
								return get.value(cards);
							};
							return list.sort(function (b, a) {
								return gett(b) - gett(a);
							})[0];
						});
			}
			"step 3";
			var cards = player.getCards("h", function (card) {
				return get.suit(card) == result.control;
			});
			if (cards.length) player.discard(cards);
			trigger.targets.remove(player);
			trigger.getParent().triggeredTargets2.remove(player);
			trigger.untrigger();
		},
	},
	//卫兹
	yuanzi: {
		audio: 2,
		trigger: { global: "phaseZhunbeiBegin" },
		logTarget: "player",
		filter: function (event, player) {
			return player != event.player && event.player.isIn() && player.countCards("h") > 0 && !player.hasSkill("yuanzi_round", null, null, false);
		},
		check: function (event, player) {
			if (event.player.hasJudge("lebu") || get.attitude(player, event.player) < 2) return false;
			return game.hasPlayer(function (current) {
				return current !== player && current !== event.player && event.player.inRange(current) && get.attitude(event.player, current) < 0;
			});
		},
		content: function () {
			var cards = player.getCards("h");
			player.give(cards, trigger.player);
			player.addTempSkill("yuanzi_effect");
			player.addTempSkill("yuanzi_round", "roundStart");
		},
		subSkill: {
			effect: {
				charlotte: true,
				audio: "yuanzi",
				trigger: { global: "damageSource" },
				forced: true,
				filter: function (event, player) {
					var source = event.source;
					return source && source == _status.currentPhase && player.countCards("h") <= source.countCards("h");
				},
				content: function () {
					player.draw(2);
				},
			},
			round: { charlotte: true },
		},
	},
	liejie: {
		audio: 2,
		trigger: { player: "damageEnd" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("he") > 0;
		},
		content: function () {
			"step 0";
			var source = trigger.source;
			var prompt2 = "弃置至多三张牌并摸等量的牌";
			if (source) prompt2 += "，若弃置的牌中有红色牌，则弃置" + get.translation(source) + "至多等量的牌";
			var next = player.chooseToDiscard("he", [1, 3], get.prompt("liejie"), prompt2);
			next.set("ai", function (card) {
				return 6 - get.value(card);
			});
			if (source) next.logSkill = ["liejie", source];
			else next.logSkill = "liejie";
			"step 1";
			if (result.bool) {
				var cards = result.cards;
				player.draw(cards.length);
				if (trigger.source) {
					var num = cards.filter(function (i) {
						return get.color(i, player) == "red";
					}).length;
					if (num > 0) player.discardPlayerCard(trigger.source, "he", [1, num]).set("forceAuto", true);
				}
			}
		},
	},
	//滕芳兰
	luochong: {
		audio: 2,
		trigger: { player: ["phaseZhunbeiBegin", "damageEnd"] },
		direct: true,
		filter: function (event, player) {
			if (event.name == "damage") {
				var history = player.getHistory("damage");
				if (history.indexOf(event) != 0) return false;
			}
			var storage1 = player.storage.luochong_round,
				storage2 = player.getStorage("luochong");
			if (!storage1) storage1 = [[], []];
			for (var i = 0; i < 4; i++) {
				if (
					!storage1[0].includes(i) &&
					!storage2.includes(i) &&
					game.hasPlayer(function (current) {
						return !storage1[1].includes(current) && lib.skill.luochong.filterx[i](current);
					})
				)
					return true;
			}
			return false;
		},
		filterx: [target => target.isDamaged(), () => true, target => target.countCards("he") > 0, () => true],
		onremove: true,
		content: function () {
			"step 0";
			var list = [];
			var choiceList = ["令一名角色回复1点体力。", "令一名角色失去1点体力。", "令一名角色弃置两张牌。", "令一名角色摸两张牌。"];
			var storage1 = player.storage.luochong_round,
				storage2 = player.getStorage("luochong");
			if (!storage1) storage1 = [[], []];
			for (var i = 0; i < 4; i++) {
				if (storage2.includes(i)) {
					choiceList[i] = '<span style="text-decoration: line-through; opacity:0.5; ">' + choiceList[i] + "</span>";
				} else if (
					storage1[0].includes(i) ||
					!game.hasPlayer(function (current) {
						return !storage1[1].includes(current) && lib.skill.luochong.filterx[i](current);
					})
				) {
					choiceList[i] = '<span style="opacity:0.5;">' + choiceList[i] + "</span>";
				} else list.push("选项" + get.cnNumber(i + 1, true));
			}
			list.push("cancel2");
			player
				.chooseControl(list)
				.set("prompt", get.prompt("luochong"))
				.set("choiceList", choiceList)
				.set("ai", function () {
					var player = _status.event.player;
					var list = _status.event.controls.slice(0);
					var listx = (player.storage.luochong_round || [[], []])[1];
					var gett = function (choice) {
						if (choice == "cancel2") return 0.1;
						var max = 0,
							func = {
								选项一: function (current) {
									if (current.isDamaged()) max = Math.max(max, get.recoverEffect(current, player, player));
								},
								选项二: function (target) {
									max = Math.max(max, get.effect(target, { name: "losehp" }, player, player));
								},
								选项三: function (target) {
									var num = target.countDiscardableCards(player, "he");
									if (num > 0) max = Math.max(max, Math.sqrt(Math.min(2, num)) * get.effect(target, { name: "guohe_copy2" }, player, player));
								},
								选项四: function (target) {
									max = Math.max(max, 2 * get.effect(target, { name: "draw" }, player, player));
								},
							}[choice];
						game.countPlayer(function (current) {
							if (!listx.includes(current)) func(current);
						});
						return max;
					};
					return list.sort(function (a, b) {
						return gett(b) - gett(a);
					})[0];
				});
			"step 1";
			if (result.control != "cancel2") {
				var index = ["选项一", "选项二", "选项三", "选项四"].indexOf(result.control);
				event.index = index;
				var listx = (player.storage.luochong_round || [[], []])[1];
				var list = [
					[
						"选择一名角色，令其回复1点体力",
						function (target) {
							var player = _status.event.player;
							return get.recoverEffect(target, player, player);
						},
					],
					[
						"选择一名角色，令其失去1点体力",
						function (target) {
							return get.effect(target, { name: "losehp" }, player, player);
						},
					],
					[
						"选择一名角色，令其弃置两张牌",
						function (target) {
							var player = _status.event.player;
							return get.effect(target, { name: "guohe_copy2" }, player, player) * Math.sqrt(Math.min(2, target.countCards("he")));
						},
					],
					[
						"选择一名角色，令其摸两张牌",
						function (target) {
							var player = _status.event.player;
							return 2 * get.effect(target, { name: "draw" }, player, player);
						},
					],
				][index];
				var targets = game.filterPlayer(function (current) {
					return !listx.includes(current) && lib.skill.luochong.filterx[event.index](current);
				});
				var next = player.chooseTarget(list[0], true, function (card, player, target) {
					return _status.event.targets.includes(target);
				});
				next.set("targets", targets);
				next.set("ai", list[1]);
			} else event.finish();
			"step 2";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("luochong", target);
				if (player != target) player.addExpose(0.2);
				player.addTempSkill("luochong_round", "roundStart");
				if (!player.storage.luochong_round) player.storage.luochong_round = [[], []];
				player.storage.luochong_round[0].push(event.index);
				player.storage.luochong_round[1].push(target);
				switch (event.index) {
					case 0:
						target.recover();
						break;
					case 1:
						target.loseHp();
						break;
					case 2:
						target.chooseToDiscard(true, "he", 2);
						break;
					case 3:
						target.draw(2);
						break;
				}
			}
		},
		subSkill: {
			round: {
				charlotte: true,
				onremove: true,
			},
		},
	},
	aichen: {
		audio: 2,
		trigger: { player: "dying" },
		forced: true,
		filter: function (event, player) {
			return player.hasSkill("luochong", null, null, false) && player.getStorage("luochong").length < 3;
		},
		content: function () {
			"step 0";
			//var num=1-player.hp;
			//if(num>0) player.recover(num);
			var list = [];
			var choiceList = ["令一名角色回复1点体力。", "令一名角色失去1点体力。", "令一名角色弃置两张牌。", "令一名角色摸两张牌。"];
			var storage2 = player.getStorage("luochong");
			for (var i = 0; i < 4; i++) {
				if (storage2.includes(i)) {
					choiceList[i] = '<span style="text-decoration: line-through; opacity:0.5; ">' + choiceList[i] + "</span>";
				} else list.push("选项" + get.cnNumber(i + 1, true));
			}
			player
				.chooseControl(list)
				.set("prompt", "哀尘：选择移去一个〖落宠〗的选项")
				.set("choiceList", choiceList)
				.set("ai", function () {
					var controls = _status.event.controls.slice(0);
					var list = ["选项三", "选项四", "选项二", "选项一"];
					for (var i of list) {
						if (controls.includes(i)) return i;
					}
					return 0;
				});
			"step 1";
			var index = ["选项一", "选项二", "选项三", "选项四"].indexOf(result.control);
			player.markAuto("luochong", [index]);
			game.log(player, "移去了", "#g【落宠】", "的", "#y" + ["令一名角色回复1点体力", "令一名角色失去1点体力", "令一名角色弃置两张牌", "令一名角色摸两张牌"][index], "的选项");
		},
		ai: {
			combo: "luochong",
			neg: true,
		},
	},
	//SP孟获
	spmanwang: {
		audio: 2,
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countCards("he") > 0;
		},
		filterCard: true,
		position: "he",
		selectCard: [1, Infinity],
		check: function (card) {
			var player = _status.event.player;
			var max = Math.min(player.isDamaged() ? 3 : 2, 4 - player.countMark("spmanwang"));
			if (!max && !player.hasSkill("sppanqin")) return 0;
			if (max == 0 && ui.selected.length > 0) return 0;
			return 7 - ui.selected.cards.length - get.value(card);
		},
		content: function () {
			var num = Math.min(cards.length, 4 - player.countMark("spmanwang"));
			if (num >= 1) player.addSkills("sppanqin");
			if (num >= 2) player.draw();
			if (num >= 3) player.recover();
			if (num >= 4) {
				player.draw(2);
				player.removeSkills("sppanqin");
			}
		},
		intro: { content: "已经移去过#个选项" },
		ai: {
			order: 2,
			result: {
				player: function (player, target) {
					if (player.getUseValue({ name: "nanman" }) <= 0) return 0;
					if (player.getStat("skill").spmanwang && player.hasSkill("sppanqin")) return 0;
					return 1;
				},
			},
		},
		derivation: "sppanqin",
	},
	sppanqin: {
		audio: 2,
		trigger: { player: ["phaseUseEnd", "phaseDiscardEnd"] },
		filter: function (event, player) {
			var cards = [],
				bool = true;
			player.getHistory("lose", function (evt) {
				if (!bool || evt.type != "discard" || evt.getParent(event.name) != event) return false;
				for (var i of evt.cards2) {
					if (get.position(i, true) == "d") {
						cards.add(i);
						if (!game.checkMod(i, player, "unchanged", "cardEnabled2", player)) bool = false;
					}
				}
			});
			if (!bool || !cards.length) return false;
			return player.hasUseTarget(get.autoViewAs({ name: "nanman" }, cards));
		},
		prompt2: function (event, player) {
			var cards = [];
			player.getHistory("lose", function (evt) {
				if (evt.type != "discard" || evt.getParent(event.name) != event) return false;
				for (var i of evt.cards2) {
					if (get.position(i, true) == "d") {
						cards.add(i);
					}
				}
			});
			return "将" + get.translation(cards) + "（共计" + get.cnNumber(cards.length) + "张牌）当做【南蛮入侵】使用";
		},
		check: function (event, player) {
			var cards = [],
				bool = true;
			player.getHistory("lose", function (evt) {
				if (!bool || evt.type != "discard" || evt.getParent(event.name) != event) return false;
				for (var i of evt.cards2) {
					if (get.position(i, true) == "d") {
						cards.add(i);
						if (!game.checkMod(i, player, "unchanged", "cardEnabled2", player)) bool = false;
					}
				}
			});
			if (!bool || !cards.length) return false;
			return player.hasValueTarget(get.autoViewAs({ name: "nanman" }, cards));
		},
		content: function () {
			"step 0";
			var cards = [];
			player.getHistory("lose", function (evt) {
				if (evt.type != "discard" || evt.getParent(trigger.name) != trigger) return false;
				for (var i of evt.cards2) {
					if (get.position(i, true) == "d") {
						cards.add(i);
					}
				}
			});
			player.chooseUseTarget(true, { name: "nanman" }, cards);
			player.addTempSkill("sppanqin_eff");
		},
		subSkill: {
			eff: {
				trigger: { player: "useCard" },
				charlotte: true,
				forced: true,
				popup: false,
				filter: function (event, player) {
					return event.card.name == "nanman" && event.getParent(2).name == "sppanqin" && player.countMark("spmanwang") < 4 && player.hasSkill("spmanwang", null, null, false) && event.cards.length <= event.targets.length;
				},
				content: function () {
					player.addMark("spmanwang", 1, false);
					switch (player.countMark("spmanwang")) {
						case 1:
							player.draw(2);
							player.removeSkills("sppanqin");
							break;
						case 2:
							player.recover();
							break;
						case 3:
							player.draw();
							break;
						case 4:
							player.addSkills("sppanqin");
							break;
					}
				},
			},
		},
	},
	//清河公主
	zengou: {
		audio: 2,
		trigger: { global: "useCard" },
		filter: function (event, player) {
			return (
				event.card.name == "shan" &&
				player.inRange(event.player) &&
				(player.hp > 0 ||
					player.hasCard(function (card) {
						return get.type(card) != "basic" && lib.filter.cardDiscardable(card, player, "zengou");
					}, "eh"))
			);
		},
		logTarget: "player",
		check: function (event, player) {
			if (get.attitude(player, event.player) >= 0) return false;
			if (get.damageEffect(event.player, event.getParent(3).player, player, get.nature(event.card)) <= 0) return false;
			if (
				player.hasCard(function (card) {
					return get.type(card) != "basic" && get.value(card) < 7 && lib.filter.cardDiscardable(card, player, "zengou");
				}, "eh")
			)
				return true;
			return player.hp > Math.max(1, event.player.hp);
		},
		content: function () {
			"step 0";
			trigger.all_excluded = true;
			var str = "弃置一张非基本牌";
			if (player.hp > 0) str += "，或点「取消」失去1点体力";
			var next = player
				.chooseToDiscard(
					str,
					function (card) {
						return get.type(card) != "basic";
					},
					"he"
				)
				.set("ai", function (card) {
					return 7 - get.value(card);
				});
			if (player.hp <= 0) next.set("forced", true);
			"step 1";
			if (!result.bool) player.loseHp();
			"step 2";
			var cards = trigger.cards.filterInD();
			if (cards.length) player.gain(cards, "gain2");
		},
	},
	qhzhangji: {
		audio: 2,
		trigger: { global: "phaseJieshuBegin" },
		direct: true,
		filter: function (event, player) {
			if (!event.player.isIn()) return false;
			if (player.getHistory("sourceDamage").length > 0) return true;
			if (player.getHistory("damage").length > 0) return event.player.countCards("he") > 0;
			return false;
		},
		content: function () {
			"step 0";
			event.target = trigger.player;
			if (player.getHistory("sourceDamage").length)
				player
					.chooseBool(get.prompt("qhzhangji", event.target), "令" + get.translation(event.target) + "摸两张牌")
					.set("choice", get.attitude(player, event.target) > 0)
					.set("ai", () => _status.event.choice);
			else event.goto(2);
			"step 1";
			if (result.bool) {
				player.logSkill("qhzhangji", target);
				event.logged = true;
				target.draw(2);
			}
			"step 2";
			if (target.isIn() && target.countCards("he") > 0 && player.getHistory("damage").length > 0)
				player
					.chooseBool(get.prompt("qhzhangji", event.target), "令" + get.translation(event.target) + "弃置两张牌")
					.set("choice", get.attitude(player, event.target) < 0)
					.set("ai", () => _status.event.choice);
			else event.finish();
			"step 3";
			if (result.bool) {
				if (!event.logged) player.logSkill("qhzhangji", target);
				target.chooseToDiscard("he", true, 2);
			}
		},
	},
	//十周年夏侯霸
	rebaobian: {
		audio: 2,
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			for (var i of lib.skill.rebaobian.derivation) {
				if (!player.hasSkill(i, null, null, false)) return true;
			}
			return false;
		},
		forced: true,
		content: function () {
			for (var i of lib.skill.rebaobian.derivation) {
				if (!player.hasSkill(i, null, null, false)) {
					player.addSkills(i);
					break;
				}
			}
		},
		ai: {
			maixie: true,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage") && !target.hasSkill("oltiaoxin", null, null, false)) {
						if (!target.hasFriend()) return;
						if (target.hp >= 4) return [0, 1];
					}
				},
			},
		},
		derivation: ["tiaoxin", "olpaoxiao", "xinshensu"],
	},
	//范强张达
	yuanchou: {
		audio: 2,
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter: function (event) {
			return event.card.name == "sha" && get.color(event.card) == "black";
		},
		forced: true,
		logTarget: "target",
		content: function () {
			trigger.target.addTempSkill("qinggang2");
			trigger.target.storage.qinggang2.add(trigger.card);
		},
		ai: {
			unequip_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg && arg.name == "sha" && get.color(arg.card) == "black") return true;
				return false;
			},
		},
		global: "yuanchou_ai",
		subSkill: {
			ai: {
				unequip_ai: true,
				skillTagFilter: function (player, tag, arg) {
					if (arg && arg.name == "sha" && get.color(arg.card) == "black" && arg.target && arg.target.hasSkill("yuanchou")) return true;
					return false;
				},
			},
		},
	},
	juesheng: {
		audio: 2,
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "orange",
		viewAs: { name: "juedou", isCard: true },
		filterCard: () => false,
		selectCard: -1,
		precontent: function () {
			player.awakenSkill("juesheng");
			player.addTempSkill("juesheng_counter");
		},
		ai: {
			result: {
				player: function (player, target) {
					let num = target.getAllHistory("useCard", evt => evt.card.name == "sha").length + 1;
					if (num < target.hp) return 0;
					return num * lib.card.juedou.ai.result.player.apply(this, arguments);
				},
				target: function (player, target) {
					let num = target.getAllHistory("useCard", evt => evt.card.name == "sha").length + 1;
					if (num < target.hp) return 0;
					let res = num * lib.card.juedou.ai.result.target.apply(this, arguments);
					if (res >= 0) return 0;
					return res;
				},
			},
		},
		subSkill: {
			counter: {
				trigger: { global: "damageBegin1" },
				forced: true,
				popup: false,
				charlotte: true,
				filter: function (event, player) {
					var evt = event.getParent();
					return evt.skill == "juesheng" && evt.player == player;
				},
				content: function () {
					var target = trigger.getParent().target;
					trigger.num = 1 + target.getAllHistory("useCard", evt => evt.card.name == "sha").length;
					target.addTempSkills("juesheng", { player: "phaseAfter" });
				},
			},
		},
	},
	//田之间
	saodi: {
		audio: 2,
		trigger: {
			player: "useCardToPlayer",
		},
		direct: true,
		filter: function (event, player) {
			if (event.targets.length != 1 || event.target == player || event.target.hasSkill("nodis")) return false;
			if (event.card.name != "sha" && get.type(event.card) != "trick") return false;
			var target = event.target;
			var left = [],
				right = [],
				left2 = player,
				right2 = player;
			while (left2 != target && right2 != target) {
				left2 = left2.getPrevious();
				right2 = right2.getNext();
				if (left2 != target) left.push(left2);
				if (right2 != target) right.push(right2);
			}
			if (target == left2) {
				for (var i of left) {
					if (lib.filter.targetEnabled2(event.card, player, i)) return true;
				}
			}
			if (target == right2) {
				for (var i of right) {
					if (lib.filter.targetEnabled2(event.card, player, i)) return true;
				}
			}
			return false;
		},
		aiJudge: function (card, player, target, bool) {
			var left = [],
				right = [],
				left2 = player,
				right2 = player,
				left3 = false,
				right3 = false;
			var eff_left = 0,
				eff_right = 0;
			while (left2 != target && right2 != target) {
				left2 = left2.getPrevious();
				right2 = right2.getNext();
				if (left2 != target) left.push(left2);
				if (right2 != target) right.push(right2);
			}
			if (target == left2) {
				for (var i of left) {
					if (lib.filter.targetEnabled2(card, player, i)) {
						left3 = true;
						eff_left += get.effect(i, card, player, player);
					}
				}
			}
			if (target == right2) {
				for (var i of right) {
					if (lib.filter.targetEnabled2(card, player, i)) {
						right3 = true;
						eff_right += get.effect(i, card, player, player);
					}
				}
			}
			if (left3 && right3) {
				if (!bool) return Math.max(eff_left, eff_right);
				if (eff_left > Math.max(0, eff_right)) return "↖顺时针";
				if (eff_right > Math.max(0, eff_left)) return "逆时针↗";
				return "cancel2";
			} else if (left3) {
				if (bool) return eff_left > 0 ? "↖顺时针" : "cancel2";
				return eff_left;
			} else if (right3) {
				if (bool) return eff_right > 0 ? "逆时针↗" : "cancel2";
				return eff_right;
			} else return bool ? "cancel2" : 0;
		},
		content: function () {
			"step 0";
			var choices = [];
			var target = trigger.target;
			var left = [],
				right = [],
				left2 = player,
				right2 = player;
			while (left2 != target && right2 != target) {
				left2 = left2.getPrevious();
				right2 = right2.getNext();
				if (left2 != target) left.push(left2);
				if (right2 != target) right.push(right2);
			}
			if (target == left2) {
				for (var i of left) {
					if (lib.filter.targetEnabled2(trigger.card, player, i)) {
						choices.push("↖顺时针");
						break;
					}
				}
			}
			if (target == right2) {
				for (var i of right) {
					if (lib.filter.targetEnabled2(trigger.card, player, i)) {
						choices.push("逆时针↗");
						break;
					}
				}
			}
			choices.push("cancel2");
			player
				.chooseControl(choices)
				.set("prompt", get.prompt("saodi"))
				.set("prompt2", "令自己和" + get.translation(trigger.target) + "某个方向之间的所有角色均成为" + get.translation(trigger.card) + "的目标")
				.set("choices", choices)
				.set("ai", function () {
					var evt = _status.event.getTrigger();
					return lib.skill.saodi.aiJudge(evt.card, evt.player, evt.target, true);
				});
			"step 1";
			if (result.control != "cancel2") {
				var targets = [];
				if (result.control == "↖顺时针") {
					var current = player.getPrevious();
					while (current != trigger.target) {
						if (lib.filter.targetEnabled2(trigger.card, player, current)) targets.push(current);
						current = current.getPrevious();
					}
				} else {
					var current = player.getNext();
					while (current != trigger.target) {
						if (lib.filter.targetEnabled2(trigger.card, player, current)) targets.push(current);
						current = current.getNext();
					}
				}
				event.targets = targets;
				if (!event.isMine() && !event.isOnline()) game.delayx();
			} else event.finish();
			"step 2";
			player.logSkill("saodi", targets);
			trigger.targets.addArray(targets);
		},
		ai: {
			effect: {
				player_use(card, player, target) {
					if (!target || player._saodi_judging || ui.selected.targets.length || player == target || target.hasSkill("nodis")) return;
					if (typeof card != "object" || (card.name != "sha" && get.type(card) != "trick")) return false;
					player._saodi_judging = true;
					var effect = lib.skill.saodi.aiJudge(card, player, target);
					delete player._saodi_judging;
					if (effect > 0) return [1, effect / Math.max(0.01, get.attitude(player, player))];
				},
			},
		},
	},
	zhuitao: {
		audio: 2,
		direct: true,
		locked: false,
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			var storage = player.getStorage("zhuitao");
			return game.hasPlayer(function (current) {
				return current != player && !storage.includes(current);
			});
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("zhuitao"), "令自己至一名其他角色的距离-1", function (card, player, target) {
					return target != player && !player.getStorage("zhuitao").includes(target);
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (att < 0 && get.distance(player, target) == 2) return 100;
					return get.distance(player, target) * (1 - get.sgn(att) / 3);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("zhuitao", result.targets[0]);
				player.markAuto("zhuitao", result.targets);
				game.delayx();
			}
		},
		intro: {
			content: "至$的距离-1",
			onunmark: true,
		},
		onremove: true,
		mod: {
			globalFrom: function (player, target, distance) {
				if (player.getStorage("zhuitao").includes(target)) return distance - 1;
			},
		},
		group: "zhuitao_remove",
		subSkill: {
			remove: {
				audio: "zhuitao",
				trigger: {
					source: "damageSource",
				},
				forced: true,
				filter: function (event, player) {
					return player.getStorage("zhuitao").includes(event.player);
				},
				logTarget: "player",
				content: function () {
					player.unmarkAuto("zhuitao", [trigger.player]);
				},
			},
		},
	},
	//生鱼片
	olfengji: {
		audio: 2,
		trigger: { global: "roundStart" },
		forced: true,
		locked: false,
		content: function () {
			"step 0";
			player
				.chooseTarget("丰积：请选择增加摸牌的目标", "令自己本轮摸牌阶段的额定摸牌数-1，且目标本轮摸牌阶段的额定摸牌数+2。或者点击「取消」，令自己本轮摸牌阶段的额定摸牌数+1", lib.filter.notMe)
				.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target),
						dist = get.distance(player, target, "absolute");
					if (att > 0) {
						if (target.hasJudge("lebu") || target.hasJudge("bingliang")) return 0;
						if (_status.event.goon) {
							return att / dist;
						}
						if (
							game.countPlayer(function (current) {
								return current != player && current != target && get.attitude(player, current) < 0 && get.distance(player, current, "absolute") < dist;
							}) >= target.hp
						)
							return 0;
						return att / dist;
					}
					if (player.hasSkill("olxuanhui", null, null, false) && !player.isTempBanned("olxuanhui") && att < 0) {
						const first = get.event().getTrigger().player,
							list = ["draw", "sha"];
						if (first == player || get.distance(player, first, "absolute") > dist) {
							const targets = [target.storage["olfengji_" + list[0]] || 0, target.storage["olfengji_" + list[1]] || 0];
							return 1 + targets.reduce((sum, num) => sum + num, 0);
						}
					}
					return 0;
				})
				.set("goon", player.skipList.includes("lebu"));
			"step 1";
			if (!player.storage.olfengji_draw) player.storage.olfengji_draw = 0;
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "thunder");
				player.storage.olfengji_draw--;
				if (!target.storage.olfengji_draw) target.storage.olfengji_draw = 0;
				target.storage.olfengji_draw += 2;
				target.addTempSkill("olfengji_draw", "roundStart");
				target.markSkill("olfengji_draw");
			} else {
				player.storage.olfengji_draw++;
			}
			player.addTempSkill("olfengji_draw", "roundStart");
			player.markSkill("olfengji_draw");
			"step 2";
			player.chooseTarget("丰积：请选择增加使用杀次数的目标", "令自己本轮使用杀的次数上限-1，且目标本轮使用杀的次数上限+2。或者点击「取消」，令自己本轮使用杀的次数上限+1", lib.filter.notMe).set("ai", function (target) {
				var player = _status.event.player;
				if (target.countMark("olfengji_draw") > 0 && target.getCardUsable("sha") < 2 && get.attitude(player, target) > 0) return get.attitude(player, target);
				if (player.hasSkill("olxuanhui", null, null, false) && !player.isTempBanned("olxuanhui") && get.attitude(player, target) < 0) {
					const first = get.event().getTrigger().player,
						list = ["draw", "sha"];
					if (first == player || get.distance(player, first, "absolute") > get.distance(player, target, "absolute")) {
						const targets = [target.storage["olfengji_" + list[0]] || 0, target.storage["olfengji_" + list[1]] || 0];
						return 1 + targets.reduce((sum, num) => sum + num, 0);
					}
				}
				return 0;
			});
			"step 3";
			if (!player.storage.olfengji_sha) player.storage.olfengji_sha = 0;
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "fire");
				player.storage.olfengji_sha--;
				if (!target.storage.olfengji_sha) target.storage.olfengji_sha = 0;
				target.storage.olfengji_sha += 2;
				target.addTempSkill("olfengji_sha", "roundStart");
				target.markSkill("olfengji_sha");
			} else {
				player.storage.olfengji_sha++;
			}
			player.addTempSkill("olfengji_sha", "roundStart");
			player.markSkill("olfengji_sha");
		},
		subSkill: {
			sha: {
				charlotte: true,
				onremove: true,
				intro: {
					content: function (storage) {
						return "使用【杀】的次数上限" + (storage >= 0 ? "+" : "") + storage;
					},
				},
				mod: {
					cardUsable: function (card, player, num) {
						if (card.name == "sha") return num + player.storage.olfengji_sha;
					},
				},
			},
			draw: {
				charlotte: true,
				onremove: true,
				intro: {
					content: function (storage) {
						return "额定摸牌数" + (storage >= 0 ? "+" : "") + storage;
					},
				},
				trigger: { player: "phaseDrawBegin2" },
				forced: true,
				filter: function (event, player) {
					return !event.numFixed;
				},
				content: function () {
					trigger.num += player.storage.olfengji_draw;
				},
			},
		},
	},
	olxuanhui: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			const targets = lib.skill.olxuanhui.logTarget(event, player);
			return targets && targets.length;
		},
		logTarget(event, player) {
			return game.filterPlayer(target => {
				if (target == player) return false;
				return (player.hasSkill("olfengji_sha") && target.hasSkill("olfengji_sha")) || (player.hasSkill("olfengji_draw") && target.hasSkill("olfengji_draw"));
			});
		},
		check(event, player) {
			const targets = lib.skill.olxuanhui.logTarget(event, player),
				list = ["sha", "draw"];
			let sum = 0;
			for (const target of targets) {
				let eff = 0;
				for (const skill of list) {
					if (typeof player.storage["olfengji_" + skill] == "number") eff += player.storage["olfengji_" + skill];
					if (typeof target.storage["olfengji_" + skill] == "number") eff -= target.storage["olfengji_" + skill];
				}
				if (get.attitude(player, target) <= 0 || target.getSeatNum() < player.getSeatNum()) eff *= -1;
				sum += eff;
			}
			return sum > 0;
		},
		async content(event, trigger, player) {
			for (const target of event.targets) {
				const list = ["draw", "sha"];
				for (const effect of list) {
					const skill = `olfengji_${effect}`;
					if (typeof player.storage[skill] != "number") continue;
					if (typeof target.storage[skill] != "number") continue;
					const num = player.storage[skill];
					player.storage[skill] = target.storage[skill];
					target.storage[skill] = num;
					target.markSkill(skill);
					player.markSkill(skill);
					game.log(player, "与", target, "交换了", `#g【丰积·${effect == "draw" ? "摸牌" : "出杀"}】`, "的数值");
				}
			}
			player.tempBanSkill("olxuanhui", "dieAfter");
		},
	},
	//朱灵
	jixian: {
		audio: 2,
		trigger: { player: "phaseDrawAfter" },
		direct: true,
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return current != player && lib.skill.jixian.getNum(player, current) > 0 && player.canUse("sha", current, false);
			});
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("jixian"), "视为对一名满足条件的角色使用一张【杀】", function (card, player, target) {
					return target != player && lib.skill.jixian.getNum(player, target) > 0 && player.canUse("sha", target, false);
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					return get.effect(target, { name: "sha" }, player, player) * Math.sqrt(lib.skill.jixian.getNum(player, target));
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("jixian", target);
				var num = lib.skill.jixian.getNum(player, target);
				player.useCard({ name: "sha", isCard: true }, target, false);
				if (num > 0) player.draw(num);
			} else event.finish();
			"step 2";
			if (
				!player.hasHistory("sourceDamage", function (evt) {
					var card = evt.card;
					if (!card || card.name != "sha") return false;
					var evtx = evt.getParent("useCard");
					return evtx.card == card && evtx.getParent() == event;
				})
			)
				player.loseHp();
		},
		getNum: function (player, target) {
			var num = 0;
			if (target.isHealthy()) num++;
			if (target.getEquips(2).length) num++;
			var countSkill = function (player) {
				return player.getSkills(null, false, false).filter(function (skill) {
					var info = get.info(skill);
					if (!info || info.charlotte) return false;
					if (info.zhuSkill) return player.hasZhuSkill(skill);
					return true;
				}).length;
			};
			if (countSkill(player) < countSkill(target)) num++;
			return num;
		},
	},
	//吾彦
	lanjiang: {
		audio: 2,
		audioname2: { heqi: "lanjiang_heqi" },
		trigger: { player: "phaseJieshuBegin" },
		content: function () {
			"step 0";
			var ph = player.countCards("h");
			var targets = game.filterPlayer(current => current == player || current.countCards("h") >= ph).sortBySeat();
			player.line(targets, "green");
			event.targets = targets;
			event.num = 0;
			"step 1";
			var target = targets[num];
			event.num++;
			if (target.isIn()) {
				event.target = target;
				target.chooseBool("是否令" + (player == target ? "自己" : get.translation(player)) + "摸一张牌？").set("ai", () => get.attitude(_status.event.player, _status.event.getParent().player) > 0);
			} else {
				event.goto(event.num < targets.length ? 1 : 3);
			}
			"step 2";
			if (result.bool) {
				target.line(player);
				if (player !== target && (get.mode() !== "identity" || target.identity !== "nei")) target.addExpose(0.15);
				player.draw();
			}
			if (num < targets.length) event.goto(1);
			"step 3";
			player
				.chooseTarget("是否对一名手牌数等于自己的目标角色造成1点伤害？", function (card, player, target) {
					return _status.event.getParent().targets.includes(target) && target.countCards("h") == player.countCards("h");
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					return get.damageEffect(target, player, player);
				});
			"step 4";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "green");
				if (get.mode() !== "identity" || player.identity !== "nei") player.addExpose(0.15);
				target.damage();
			} else event.finish();
			"step 5";
			var ph = player.countCards("h");
			if (ph > 0 && targets.some(target => target.isIn() && target.countCards("h") < ph)) {
				player
					.chooseTarget(
						"请选择一名手牌数小于自己的目标角色，令其摸一张牌",
						function (card, player, target) {
							return _status.event.getParent().targets.includes(target) && target.countCards("h") < player.countCards("h");
						},
						true
					)
					.set("ai", function (target) {
						var player = _status.event.player;
						return get.attitude(player, target);
					});
			}
			"step 6";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target);
				if (player !== target && (get.mode() !== "identity" || player.identity !== "nei")) player.addExpose(0.1);
				target.draw();
			}
		},
	},
	//新SP张郃
	spolzhouxuan: {
		audio: 2,
		trigger: { player: "phaseDiscardBegin" },
		filter: function (event, player) {
			return player.countCards("h") > 0 && player.getExpansions("spolzhouxuan").length < 5;
		},
		direct: true,
		content: function () {
			"step 0";
			player.chooseCard("h", get.prompt("spolzhouxuan"), [1, 5 - player.getExpansions("spolzhouxuan").length], "将至多" + get.cnNumber(5 - player.getExpansions("spolzhouxuan").length) + "张手牌置于武将牌上").set("ai", function (card) {
				if (ui.selected.cards.length >= player.needsToDiscard()) return 6 - get.value(card);
				return 100 - get.useful(card);
			});
			"step 1";
			if (result.bool) {
				var cards = result.cards;
				player.logSkill("spolzhouxuan");
				player.addToExpansion(cards, player, "give").gaintag.add("spolzhouxuan");
			}
		},
		marktext: "旋",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		group: ["spolzhouxuan_use", "spolzhouxuan_discard"],
		subSkill: {
			use: {
				audio: "spolzhouxuan",
				trigger: { player: "useCard" },
				filter: function (event, player) {
					return player.getExpansions("spolzhouxuan").length > 0;
				},
				forced: true,
				locked: false,
				content: function () {
					"step 0";
					player.loseToDiscardpile(player.getExpansions("spolzhouxuan").randomGet());
					"step 1";
					var num = 1;
					if (!player.isMaxHandcard(true)) num += player.getExpansions("spolzhouxuan").length;
					player.draw(num);
				},
			},
			discard: {
				audio: "spolzhouxuan",
				trigger: { player: "phaseUseEnd" },
				filter: function (event, player) {
					return player.getExpansions("spolzhouxuan").length > 0;
				},
				forced: true,
				locked: false,
				content: function () {
					player.loseToDiscardpile(player.getExpansions("spolzhouxuan"));
				},
			},
		},
	},
	//董昭
	olxianlve: {
		audio: 2,
		mode: ["identity"],
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		direct: true,
		filter: function (event, player) {
			return event.player == game.zhu && event.player.isZhu;
		},
		content: function () {
			"step 0";
			var list = lib.inpile
				.filter(function (i) {
					return get.type2(i) == "trick";
				})
				.map(function (i) {
					return ["锦囊", "", i];
				});
			if (!list.length) event.finish();
			else
				player.chooseButton([get.prompt("olxianlve"), [list, "vcard"]]).set("ai", function (button) {
					switch (button.link[2]) {
						case "wuxie":
							return 0.6 + Math.random();
						case "wuzhong":
						case "dongzhuxianji":
							return 0.5 + Math.random();
						case "guohe":
						case "zhujinqiyuan":
							return 0.4 + Math.random();
						default:
							return Math.random();
					}
				});
			"step 1";
			if (result.bool) {
				var name = result.links[0][2];
				player.logSkill("olxianlve");
				player.storage.olxianlve = name;
				player.markSkill("olxianlve");
			}
		},
		intro: {
			content: function (name, player) {
				return "已声明" + (player.isUnderControl(true) ? "【" + get.translation(name) + "】" : "一个牌名");
			},
		},
		group: ["olxianlve_use", "olxianlve_count"],
		subSkill: {
			count: {
				trigger: { global: "useCard1" },
				silent: true,
				forced: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					return event.player != player && event.card.name == player.storage.olxianlve;
				},
				content: function () {
					if (!trigger.olxianlve_map) trigger.olxianlve_map = {};
					trigger.olxianlve_map[player.playerid] = true;
				},
			},
			use: {
				audio: "olxianlve",
				trigger: { global: "useCardAfter" },
				forced: true,
				locked: false,
				usable: 1,
				filter: function (event, player) {
					return event.player != player && event.olxianlve_map && event.olxianlve_map[player.playerid] && event.card.name == player.storage.olxianlve;
				},
				content: function () {
					"step 0";
					player.draw(2);
					"step 1";
					var cards = result;
					if (get.itemtype(cards) != "cards") {
						event.goto(5);
						return;
					}
					var hs = player.getCards("h");
					cards = cards.filter(function (card) {
						return hs.includes(card);
					});
					if (!cards.length) {
						event.goto(5);
						return;
					}
					event.cards = cards;
					if (_status.connectMode)
						game.broadcastAll(function () {
							_status.noclearcountdown = true;
						});
					event.given_map = {};
					event.ai_list = [];
					"step 2";
					player.chooseCardTarget({
						filterCard: function (card) {
							return _status.event.cards.includes(card) && !card.hasGaintag("olxianlve");
						},
						cards: cards,
						filterTarget: lib.filter.notMe,
						selectCard: [1, cards.length],
						prompt: "是否将得到的牌分配给其他角色？",
						ai1: function (card) {
							if (!ui.selected.cards.length) return 1;
							return 0;
						},
						ai2: function (target) {
							var player = _status.event.player,
								card = ui.selected.cards[0];
							var val = target.getUseValue(card);
							if (target.isPhaseUsing() && get.type2(card) == "trick") val *= 3;
							if (val > 0) return val * get.attitude(player, target) * 2;
							return get.value(card, target) * get.attitude(player, target);
						},
					});
					"step 3";
					if (result.bool) {
						var res = result.cards,
							target = result.targets[0].playerid;
						player.addGaintag(res, "olxianlve");
						cards.removeArray(res);
						if (!event.given_map[target]) event.given_map[target] = [];
						event.given_map[target].addArray(res);
						if (result.targets[0].isPhaseUsing() && get.type2(res[0]) == "trick") event.ai_list.push(res[0].name);
						if (cards.length) event.goto(2);
					}
					"step 4";
					if (_status.connectMode) {
						game.broadcastAll(function () {
							delete _status.noclearcountdown;
							game.stopCountChoose();
						});
					}
					var map = [],
						cards = [];
					for (var i in event.given_map) {
						var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
						player.line(source, "green");
						map.push([source, event.given_map[i]]);
						cards.addArray(event.given_map[i]);
					}
					if (map.length)
						game.loseAsync({
							gain_list: map,
							player: player,
							cards: cards,
							giver: player,
							animate: "giveAuto",
						}).setContent("gaincardMultiple");
					"step 5";
					var list = lib.inpile
						.filter(function (i) {
							return get.type2(i) == "trick";
						})
						.map(function (i) {
							return ["锦囊", "", i];
						});
					if (!list.length) event.finish();
					else
						player
							.chooseButton([get.prompt("olxianlve"), [list, "vcard"]])
							.set("list", event.ai_list)
							.set("ai", function (button) {
								if (_status.event.list.includes(button.link[2])) return 2 + Math.random();
								switch (button.link[2]) {
									case "wuxie":
										return 0.6 + Math.random();
									case "wuzhong":
									case "dongzhuxianji":
										return 0.5 + Math.random();
									case "guohe":
									case "zhujinqiyuan":
										return 0.4 + Math.random();
									default:
										return Math.random();
								}
							});
					"step 6";
					if (result.bool) {
						var name = result.links[0][2];
						player.storage.olxianlve = name;
						player.markSkill("olxianlve");
					}
				},
			},
		},
	},
	olzaowang: {
		mode: ["identity"],
		available: function (mode) {
			if (mode == "identity" && _status.mode == "purple") return false;
		},
		audio: 2,
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "water",
		filterTarget: true,
		content: function () {
			player.awakenSkill("olzaowang");
			target.gainMaxHp();
			target.recover();
			target.draw(3);
			target.addSkills("olzaowang2");
		},
		ai: {
			order: 2,
			result: {
				target: function (player, target) {
					if (player.hasUnknown(2)) return 0;
					if (target.identity == "zhong") return 20;
					if (target.identity == "zhu") return 10;
					if (target.identity == "nei") return 5;
					if (!target.hasFriend()) return 5;
					return 0;
				},
			},
		},
	},
	olzaowang2: {
		charlotte: true,
		trigger: { global: "dieBegin" },
		forced: true,
		sourceSkill: "olzaowang",
		filter: function (event, player) {
			return event.player.identity == "zhu" && (player.identity == "zhong" || player.identity == "mingzhong");
		},
		logTarget: "player",
		skillAnimation: true,
		animationColor: "orange",
		content: function () {
			game.broadcastAll(
				function (player, target) {
					target.identity = player.identity;
					if (player.identity == "mingzhong") game.zhong = target;
					delete target.isZhu;
					player.identity = "zhu";
					game.zhu = player;
					player.showIdentity();
					target.showIdentity();
				},
				player,
				trigger.player
			);
			event.trigger("zhuUpdate");
		},
		mark: true,
		marktext: "王",
		intro: { content: "造了个王" },
		group: "olzaowang2_kill",
		subSkill: {
			kill: {
				trigger: { player: "die" },
				forced: true,
				forceDie: true,
				skillAnimation: true,
				animationColor: "wood",
				filter: function (event, player) {
					return player.identity == "fan" && event.source && (event.source.identity == "zhu" || event.source.identity == "zhong" || event.source.identity == "mingzhong");
				},
				content: function () {
					game.over(game.me.identity == "zhu" || game.me.identity == "zhong" || game.me.identity == "mingzhong");
				},
			},
		},
	},
	//冯方女
	zhuangshu: {
		audio: 2,
		trigger: { global: "phaseBegin" },
		direct: true,
		derivation: ["zhuangshu_basic", "zhuangshu_trick", "zhuangshu_equip"],
		filter: function (event, player) {
			return event.player.isIn() && event.player.hasEmptySlot(5) && player.hasCard(lib.skill.zhuangshu.filterCard, "he");
		},
		filterCard: function (card) {
			if (_status.connectMode) return true;
			var type = get.type2(card);
			return type == "basic" || type == "trick" || type == "equip";
		},
		content: function () {
			"step 0";
			player
				.chooseToDiscard("he", get.prompt("zhuangshu", trigger.player), "弃置一张牌，并根据此牌的类型，按如下关系将一张宝物牌置入该角色的装备区：{<基本牌,【琼梳】>，<锦囊牌，【犀梳】>，<装备牌，【金梳】>}。", function (card) {
					var type = get.type2(card);
					return type == "basic" || type == "trick" || type == "equip";
				})
				.set("ai", function (card) {
					var player = _status.event.player;
					if (get.attitude(player, _status.event.getTrigger().player) < 4) return 0;
					var name = "zhuangshu_" + get.type2(card, player);
					if (
						game.hasPlayer(function (current) {
							return current.getEquip(name) && get.attitude(player, current) > 0;
						})
					)
						return 0;
					return 7 - get.value(card);
				}).logSkill = ["zhuangshu", trigger.player];
			"step 1";
			if (result.bool) {
				var name = "zhuangshu_" + get.type2(result.cards[0], result.cards[0].original == "h" ? player : false);
				if (lib.card[name] && trigger.player.isIn && trigger.player.hasEmptySlot(5)) {
					var target = game.findPlayer(function (current) {
						var equip = current.getEquip(name);
						return equip && equip.name == name;
					});
					if (target) {
						var card = target.getEquip(name);
						target.$give(card, trigger.player, false);
					} else {
						var card = game.createCard(name, lib.card[name].cardcolor, 12);
						trigger.player.$gain2(card, false);
					}
					game.delayx();
					trigger.player.equip(card);
				}
			}
		},
		group: "zhuangshu_gameStart",
		subSkill: {
			gameStart: {
				trigger: { global: "phaseBefore" },
				direct: true,
				filter: function (event, player) {
					return game.phaseNumber == 0;
				},
				content: function () {
					"step 0";
					player.chooseButton([get.prompt("zhuangshu"), [["zhuangshu_basic", "zhuangshu_trick", "zhuangshu_equip"], "vcard"]]).set("filterButton", function (button) {
						return !game.hasPlayer(function (current) {
							return current.getEquip(button.link[2]);
						});
					});
					"step 1";
					if (result.bool) {
						player.logSkill("zhuangshu");
						var name = result.links[0][2],
							card = game.createCard(name, lib.card[name].cardcolor, 12);
						player.$gain2(card, false);
						game.delayx();
						player.equip(card);
					}
				},
			},
		},
	},
	chuiti: {
		audio: 2,
		usable: 1,
		trigger: {
			global: ["loseAfter", "loseAsyncAfter"],
		},
		direct: true,
		filter: function (event, player) {
			if (event.type != "discard" || event.getlx === false) return false;
			return game.hasPlayer(function (current) {
				if (player != current) {
					var cards = current.getEquips(5);
					if (!cards.some(card => card.name.indexOf("zhuangshu_") == 0)) return false;
				}
				var evt = event.getl(current);
				if (!evt || !evt.cards2) return false;
				for (var i of evt.cards2) {
					if (get.position(i, true) == "d" && player.hasUseTarget(i)) return true;
				}
				return false;
			});
		},
		content: function () {
			"step 0";
			var cards = [];
			game.countPlayer(function (current) {
				if (player != current) {
					var cards2 = current.getEquips(5);
					if (!cards2.some(card => card.name.indexOf("zhuangshu_") == 0)) return false;
				}
				var evt = trigger.getl(current);
				for (var i of evt.cards2) {
					if (get.position(i, true) == "d" && player.hasUseTarget(i)) cards.push(i);
				}
				return false;
			});
			player.chooseButton(["垂涕：是否使用其中的一张牌？", cards]).set("ai", function (button) {
				return _status.event.player.getUseValue(button.link);
			});
			"step 1";
			if (result.bool) {
				player.$gain2(result.links[0], false);
				game.delayx();
				player.chooseUseTarget(true, result.links[0], false).logSkill = "chuiti";
			} else player.storage.counttrigger.chuiti--;
		},
	},
	zhuangshu_basic: {
		audio: true,
		equipSkill: true,
		trigger: { player: "damageBegin2" },
		direct: true,
		filter: function (event, player) {
			var equip = player.getEquip("zhuangshu_basic");
			return (
				event.num <=
				player.countCards("he", function (card) {
					return card != equip;
				})
			);
		},
		content: function () {
			"step 0";
			player
				.chooseToDiscard("he", trigger.num, get.prompt("zhuangshu_basic"), "弃置" + get.cnNumber(trigger.num) + "张牌并防止伤害", function (card, player) {
					return card != player.getEquip("zhuangshu_basic");
				})
				.set("ai", function (card) {
					var player = _status.event.player;
					return 4 + player.getUseValue(card) - get.value(card, player);
				});
			"step 1";
			if (result.bool) trigger.cancel();
		},
		/*usable:1,
		trigger:{player:'useCard2'},
		direct:true,
		filter:function(event,player){
			if(event.targets.length!=1) return false;
			if(event.card.name!='sha'&&get.type(event.card)!='trick') return false;
			var info=get.info(event.card);
			if(info.allowMultiple==false) return false;
			if(event.targets&&!info.multitarget){
				var target=event.targets[0],hp=target.hp,hs=target.countCards('h'),card=event.card;
				return game.hasPlayer(function(current){
					return current!=target&&current!=player&&(current.hp==hp||current.countCards('h')==hs)&&lib.filter.targetEnabled2(card,player,current);
				});
			}
			return false;
		},
		content:function(){
			'step 0'
			player.chooseTarget(get.prompt('zhuangshu_basic'),'为'+get.translation(trigger.card)+'增加一个满足条件的额外目标',function(card,player,current){
				var card=_status.event.getTrigger().card,target=_status.event.target,hp=target.hp,hs=target.countCards('h');
				return current!=target&&current!=player&&(current.hp==hp||current.countCards('h')==hs)&&lib.filter.targetEnabled2(card,player,current);
			}).set('target',trigger.targets[0]).set('ai',function(target){
				var card=_status.event.getTrigger().card,player=_status.event.player;
				return get.effect(target,card,player,player);
			});
			'step 1'
			if(result.bool){
				if(player!=event.player&&!player.isOnline()) game.delayx();
			}
			else{
				player.storage.counttrigger.zhuangshu_basic--;
				event.finish();
			}
			'step 2'
			var targets=result.targets;
			player.logSkill('zhuangshu_basic',targets);
			trigger.targets.addArray(targets);
			trigger.directHit.addArray(targets);
		},*/
	},
	zhuangshu_trick: {
		audio: true,
		trigger: { player: ["phaseJudgeBefore"] },
		equipSkill: true,
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseControl("判定阶段", "弃牌阶段", "cancel2")
				.set("prompt", get.prompt("zhuangshu_trick"))
				.set("prompt2", "跳过本回合的判定阶段或弃牌阶段")
				.set("ai", function () {
					var player = _status.event.player;
					if (
						player.hasCard(function (card) {
							return (
								get.effect(
									player,
									{
										name: card.viewAs || card.name,
										cards: [card],
									},
									player,
									player
								) < 0
							);
						}, "j")
					)
						return "判定阶段";
					return "弃牌阶段";
				});
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("zhuangshu_trick");
				if (result.control == "判定阶段") {
					trigger.cancel();
					game.log(player, "跳过了", "#y判定阶段");
				} else {
					player.skip("phaseDiscard");
					game.log(player, "跳过了", "#g弃牌阶段");
				}
			}
		},
	},
	zhuangshu_equip: {
		audio: true,
		trigger: { player: "phaseUseEnd" },
		forced: true,
		equipSkill: true,
		filter: function (event, player) {
			return player.countCards("h") < Math.min(5, player.getHandcardLimit());
		},
		content: function () {
			player.drawTo(Math.min(5, player.getHandcardLimit()));
		},
	},
	//杨仪
	oljuanxia: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		content: function () {
			"step 0";
			player.chooseTarget(get.prompt2("oljuanxia"), lib.filter.notMe).set("ai", function (target) {
				var player = _status.event.player,
					list = [];
				for (var name of lib.inpile) {
					var info = lib.card[name];
					if (!info || info.type != "trick" || info.notarget || (info.selectTarget && info.selectTarget != 1)) continue;
					if (!player.canUse(name, target, false)) continue;
					var eff = get.effect(target, { name: name }, player, player);
					if (eff > 0) list.push(eff);
				}
				list.sort().reverse();
				if (!list.length) return 0;
				return list[0] + (list[1] || 0) + (list[2] || 0);
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("oljuanxia", target);
			} else event.finish();
			"step 2";
			var list = [];
			for (var name of lib.inpile) {
				var info = lib.card[name];
				if (!info || info.type != "trick" || info.notarget || (info.selectTarget && info.selectTarget != 1)) continue;
				list.push(name);
			}
			if (!list.length) event.finish();
			else {
				event.list = list;
				event.count = 0;
			}
			"step 3";
			var list = event.list.filter(function (name) {
				return player.canUse(name, target, false);
			});
			if (list.length) {
				var next = player.chooseButton(["视为对" + get.translation(target) + "使用一张牌", [list, "vcard"]]).set("ai", function (button) {
					let evt = _status.event.getParent(),
						eff = get.effect(evt.target, { name: button.link[2] }, evt.player, evt.player);
					if (evt.target.hp < 2 || get.attitude(evt.player, evt.target) > 0 || (evt.target.hp < 3 && get.tag(button.link, "damage"))) return eff;
					return eff + get.effect(evt.player, { name: "sha" }, evt.target, evt.player);
				});
				if (event.count == 0) next.set("forced", true);
			} else {
				event.stopped = true;
				event.goto(5);
			}
			"step 4";
			if (result.bool) {
				event.count++;
				var name = result.links[0][2];
				event.list.remove(name);
				player.useCard({ name: name, isCard: true }, target, false);
			} else event.stopped = true;
			"step 5";
			if (target.isIn() && event.count > 0) {
				if (event.count < 3 && !event.stopped && event.list.length > 0) event.goto(3);
				else {
					target.addTempSkill("oljuanxia_counter", { player: "phaseAfter" });
					if (!target.storage.oljuanxia_counter) target.storage.oljuanxia_counter = {};
					if (!target.storage.oljuanxia_counter[player.playerid]) target.storage.oljuanxia_counter[player.playerid] = 0;
					target.storage.oljuanxia_counter[player.playerid] += event.count;
				}
			}
		},
		subSkill: {
			counter: {
				trigger: { player: "phaseEnd" },
				forced: true,
				charlotte: true,
				onremove: true,
				filter: function (event, player) {
					var map1 = _status.connectMode ? lib.playerOL : game.playerMap,
						map2 = player.storage.oljuanxia_counter;
					if (!map2) return false;
					for (var i in map2) {
						if (map1[i] && map1[i].isIn() && player.canUse("sha", map1[i], false)) return true;
					}
					return false;
				},
				logTarget: function (event, player) {
					var list = [];
					var map1 = _status.connectMode ? lib.playerOL : game.playerMap,
						map2 = player.storage.oljuanxia_counter;
					if (!map2) return false;
					for (var i in map2) {
						if (map1[i] && map1[i].isIn()) list.push(map1[i]);
					}
					return list;
				},
				content: function () {
					"step 0";
					var list = [];
					var map1 = _status.connectMode ? lib.playerOL : game.playerMap,
						map2 = player.storage.oljuanxia_counter;
					if (!map2) return false;
					for (var i in map2) {
						if (map1[i] && map1[i].isIn()) list.push(map1[i]);
					}
					list.sortBySeat();
					event.num = 0;
					event.targets = list;
					"step 1";
					var target = targets[num];
					event.target = target;
					if (target.isIn() && player.canUse("sha", target, false))
						player
							.chooseBool("狷狭：是否视为对" + get.translation(target) + "依次使用" + get.cnNumber(player.storage.oljuanxia_counter[target.playerid]) + "张【杀】？")
							.set("goon", get.effect(target, { name: "sha" }, player, player) > 0)
							.set("ai", () => _status.event.goon);
					"step 2";
					event.num++;
					if (result.bool) event.count = player.storage.oljuanxia_counter[target.playerid];
					else if (event.num < targets.length) event.goto(1);
					else event.finish();
					"step 3";
					event.count--;
					if (target.isIn() && player.canUse("sha", target, false)) player.useCard({ name: "sha", isCard: true }, target, false);
					if (event.count > 0) event.redo();
					else if (event.num < targets.length) event.goto(1);
				},
			},
		},
	},
	oldingcuo: {
		audio: 2,
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		usable: 1,
		content: function () {
			"step 0";
			player.draw(2);
			"step 1";
			if (Array.isArray(result) && result.length > 1) {
				var color = get.color(result[0], player);
				for (var i = 1; i < result.length; i++) {
					if (get.color(result[i], player) != color) {
						if (player.countCards("h")) player.chooseToDiscard("h", true);
						break;
					}
				}
			}
		},
	},
	//左棻
	zhaosong: {
		audio: 2,
		trigger: { global: "phaseDrawAfter" },
		logTarget: "player",
		filter: function (event, player) {
			if (player == event.player || !event.player.countCards("h")) return false;
			var types = ["basic", "trick", "equip"];
			for (var i of types) {
				if (event.player.hasMark("zhaosong_" + i)) return false;
			}
			return true;
		},
		prompt2: "令其交给你一张手牌，并根据类型获得对应的标记",
		check: function (event, player) {
			return get.attitude(_status.event.player, event.player) > 0;
		},
		content: function () {
			"step 0";
			event.target = trigger.player;
			event.target.chooseCard("h", true, get.translation(player) + "发动了【诏颂】；请交给其一张手牌");
			"step 1";
			if (result.bool) {
				var card = result.cards[0];
				target.give(card, player, "give");
				var type = get.type2(card, target);
				if (lib.skill["zhaosong_" + type]) {
					target.addSkill("zhaosong_" + type);
					target.addMark("zhaosong_" + type);
				}
			}
		},
		subSkill: {
			basic: {
				marktext: "颂",
				intro: {
					name: "诏颂(颂)",
					name2: "颂",
					content: "当你使用【杀】选择唯一目标时，你可移去“颂”，并为此【杀】增加至多两个目标。",
				},
				trigger: { player: "useCard2" },
				direct: true,
				charlotte: true,
				onremove: true,
				filter: function (event, player) {
					return (
						player.hasMark("zhaosong_basic") &&
						event.card.name == "sha" &&
						event.targets.length == 1 &&
						game.hasPlayer(function (current) {
							return current != player && current != event.targets[0] && lib.filter.targetEnabled2(event.card, player, current);
						})
					);
				},
				content: function () {
					"step 0";
					player
						.chooseTarget([1, 2], "是否弃置“颂”标记？", "为" + get.translation(trigger.card) + "增加至多两个目标", function (card, player, target) {
							var evt = _status.event.getTrigger();
							return target != player && target != evt.targets[0] && lib.filter.targetEnabled2(evt.card, player, target);
						})
						.set("ai", function (target) {
							var evt = _status.event.getTrigger();
							return get.effect(target, evt.card, evt.player, evt.player);
						});
					"step 1";
					if (result.bool) {
						if (player != event.player && !player.isOnline()) game.delayx();
						//player.addTempSkill('zhaosong_shaloss');
					} else event.finish();
					"step 2";
					var targets = result.targets;
					player.logSkill("zhaosong_basic", targets);
					player.removeMark("zhaosong_basic", 1);
					player.removeSkill("zhaosong_basic");
					trigger.targets.addArray(targets);
					trigger.zhaosong_basic = true;
				},
			} /*
			shaloss:{
				trigger:{player:'useCardAfter'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					if(!event.zhaosong_basic) return false;
					var num=0;
					player.getHistory('sourceDamage',function(evt){
						if(evt.card==event.card) num+=evt.num;
					});
					return num<2;
				},
				content:function(){
					player.loseHp();
				},
			},*/,
			trick: {
				marktext: "诔",
				intro: {
					name: "诏颂(诔)",
					name2: "诔",
					content: "当你进入濒死状态时，你可移去“诔”，然后将体力回复至1点并摸一张牌。",
				},
				trigger: { player: "dying" },
				prompt: "是否弃置“诔”标记？",
				prompt2: "回复体力至1点并摸一张牌。",
				charlotte: true,
				onremove: true,
				filter: function (event, player) {
					return player.hasMark("zhaosong_trick") && player.hp < 1;
				},
				check: function (event, player) {
					if (
						player.maxHp < 2 ||
						player.countCards("h", function (card) {
							var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
							if (mod2 != "unchanged") return mod2;
							var mod = game.checkMod(card, player, event.player, "unchanged", "cardSavable", player);
							if (mod != "unchanged") return mod;
							var savable = get.info(card).savable;
							if (typeof savable == "function") savable = savable(card, player, event.player);
							return savable;
						}) >=
							1 + event.num - event.player.hp
					)
						return false;
					return true;
				},
				content: function () {
					player.removeMark("zhaosong_trick", 1);
					player.removeSkill("zhaosong_trick");
					//player.loseMaxHp();
					if (player.hp < 1) player.recover(1 - player.hp);
					player.draw();
				},
			},
			equip: {
				marktext: "赋",
				intro: {
					name: "诏颂(赋)",
					name2: "赋",
					content: "出牌阶段开始时，你可移去“赋”并弃置一名角色区域内的至多两张牌。",
				},
				trigger: { player: "phaseUseBegin" },
				direct: true,
				charlotte: true,
				onremove: true,
				filter: function (event, player) {
					return (
						player.hasMark("zhaosong_equip") &&
						game.hasPlayer(function (current) {
							return current.hasCard(function (card) {
								return lib.filter.canBeDiscarded(card, player, current);
							}, "hej");
						})
					);
				},
				content: function () {
					"step 0";
					player
						.chooseTarget("是否弃置“赋”标记？", "弃置一名角色区域内的至多两张牌", function (card, player, current) {
							return current.hasCard(function (card) {
								return lib.filter.canBeDiscarded(card, player, current);
							}, "hej");
						})
						.set("ai", function (target) {
							var player = _status.event.player,
								att = get.attitude(player, target) > 0 ? 2 : 1;
							return get.effect(target, { name: "guohe_copy" }, player, player) * att;
						});
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						event.target = target;
						player.logSkill("zhaosong_equip", target);
						player.removeMark("zhaosong_equip", 1);
						player.removeSkill("zhaosong_equip");
						player.discardPlayerCard(target, true, "hej", [1, 2]);
					}
				},
			},
		},
	},
	lisi: {
		audio: 2,
		trigger: { player: "useCardAfter" },
		direct: true,
		filter: function (event, player) {
			if (player == _status.currentPhase || !event.cards.filterInD().length) return false;
			var hs = player.countCards("h");
			return game.hasPlayer(function (current) {
				return current != player && current.countCards("h") <= hs;
			});
		},
		content: function () {
			"step 0";
			player.chooseTarget(get.prompt("lisi"), "将" + get.translation(trigger.cards.filterInD()) + "交给一名手牌数不大于你的其他角色", function (card, player, target) {
				return target != player && target.countCards("h") <= player.countCards("h");
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("lisi", target);
				target.gain(trigger.cards.filterInD(), "gain2");
			}
		},
	},
	//王荣
	olfengzi: {
		audio: 2,
		trigger: { player: "useCard" },
		direct: true,
		usable: 1,
		filter: function (event, player) {
			if (event.olfengzi_buff || !event.targets.length || !player.isPhaseUsing() || player.hasSkill("olfengzi_buff")) return false;
			var type = get.type(event.card, null, false);
			if (type != "basic" && type != "trick") return false;
			return player.hasCard(function (i) {
				if (_status.connectMode) return true;
				return get.type2(i, player) == type;
			}, "h");
		},
		content: function () {
			"step 0";
			if (player != game.me && !player.isUnderControl() && !player.isOnline()) game.delayx();
			var type = get.type(trigger.card, null, false);
			player
				.chooseToDiscard("h", get.prompt("olfengzi"), "弃置一张" + get.translation(type) + "牌，令" + get.translation(trigger.card) + "结算两次", function (card, player) {
					return get.type2(card, player) == _status.event.type;
				})
				.set("type", type)
				.set("ai", function (card) {
					var player = _status.event.player;
					var trigger = _status.event.getTrigger();
					if (trigger.card.name == "tiesuo") return 0;
					var num = 0;
					for (var i of trigger.targets) num += get.effect(i, trigger.card, player, player);
					if (num <= 0) return 0;
					return 7 - get.value(card);
				}).logSkill = "olfengzi";
			"step 1";
			if (result.bool) {
				trigger.effectCount++;
			} else player.storage.counttrigger.olfengzi--;
		},
		/*subSkill:{
			buff:{
				trigger:{global:'useCardToTargeted'},
				forced:true,
				charlotte:true,
				popup:false,
				lastDo:true,
				filter:function(event,player){
					return (event.parent.olfengzi_buff==player&&event.targets.length==event.parent.triggeredTargets4.length);
				},
				content:function(){
					trigger.getParent().targets=trigger.getParent().targets.concat(trigger.targets);
					trigger.getParent().triggeredTargets4=trigger.getParent().triggeredTargets4.concat(trigger.targets);
				},
				onremove:function(player){
					delete player.storage.counttrigger.olfengji;
				},
			},
		},*/
	},
	oljizhan: {
		audio: 2,
		trigger: { player: "phaseDrawBegin1" },
		filter: function (event, player) {
			return !event.numFixed;
		},
		content: function () {
			"step 0";
			trigger.changeToZero();
			var card = get.cards()[0];
			game.cardsGotoOrdering(card);
			event.cards = [card];
			event.num = get.number(card, false);
			player.showCards(card, get.translation(player) + "发动了【吉占】");
			"step 1";
			var str = get.strNumber(num);
			player
				.chooseControl("大于" + str, "小于" + str, "cancel2")
				.set("prompt", "吉占：猜测下一张牌的点数")
				.set("choice", num < 7 ? 0 : 1)
				.set("ai", () => _status.event.choice);
			"step 2";
			var card = get.cards()[0];
			game.cardsGotoOrdering(card);
			event.cards.push(card);
			var num = get.number(card, false);
			if ((num > event.num && result.index == 0) || (num < event.num && result.index == 1)) {
				event.num = num;
				event.goto(1);
			}
			player.showCards(card);
			"step 3";
			player.gain(cards, "gain2");
		},
	},
	olfusong: {
		audio: 2,
		forceDie: true,
		trigger: { player: "die" },
		skillAnimation: true,
		animationColor: "gray",
		direct: true,
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return current.maxHp > player.maxHp;
			});
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("olfusong"), "令一名体力上限大于你的其他角色获得〖丰姿〗或〖吉占〗", function (card, player, target) {
					return target.maxHp > player.maxHp;
				})
				.set("forceDie", true)
				.set("ai", target => get.attitude(_status.event.player, target));
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("olfusong", target);
				target
					.chooseControl("olfengzi", "oljizhan")
					.set("prompt", "令" + get.translation(target) + "获得其中一个技能")
					.set("ai", () => (Math.random() > 0.5 ? 0 : 1));
			} else event.finish();
			"step 2";
			target.addSkills(result.control);
		},
	},
	//邓芝
	olxiuhao: {
		audio: 2,
		trigger: { global: "damageBegin4" },
		usable: 1,
		filter: function (event, player) {
			return event.source && event.source.isIn() && [event.source, event.player].includes(player) && event.source != event.player;
		},
		logTarget: function (event, player) {
			return player == event.player ? event.source : event.player;
		},
		check: function (event, player) {
			_status.olxiuhao_judging = true;
			var bool = false;
			if (get.attitude(player, event.player) > 0) bool = true;
			else if (2 * get.effect(event.source, { name: "draw" }, player, _status.event.player) + event.num * get.damageEffect(player, event.source, _status.event.player, event.nature) > 0) bool = true;
			else if (event.source.hasSkillTag("nogain")) bool = true;
			delete _status.olxiuhao_judging;
			return bool;
		},
		content: function () {
			trigger.cancel();
			trigger.source.draw(2);
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (!_status.olxiuhao_judging && get.tag(card, "damage") && get.attitude(target, player) > 0 && player != target && (!target.storage.counttrigger || !target.storage.counttrigger.olxiuhao)) return [0, 0.5, 0, 0.5];
				},
				player: function (card, player, target) {
					if (!_status.olxiuhao_judging && get.tag(card, "damage") && get.attitude(player, target) > 0 && player != target && (!player.storage.counttrigger || !player.storage.counttrigger.olxiuhao)) return [0, 0.5, 0, 0.5];
				},
			},
		},
	},
	olsujian: {
		audio: 2,
		trigger: { player: "phaseDiscardBefore" },
		forced: true,
		content: function () {
			trigger.setContent(lib.skill.olsujian.phaseDiscard);
		},
		phaseDiscard: function () {
			"step 0";
			game.log(player, "进入了弃牌阶段");
			game.broadcastAll(function (player) {
				if (lib.config.show_phase_prompt) {
					player.popup("弃牌阶段", null, false);
				}
			}, player);
			event.trigger("phaseDiscard");
			"step 1";
			var cards = lib.skill.olsujian.update(player);
			if (!cards.length) event.finish();
			else {
				event.cards = cards;
				var str = get.translation(cards);
				player
					.chooseControl()
					.set("choiceList", ["将" + str + "分配给任意名其他角色", "弃置" + str + "并弃置一名其他角色至多等量的牌"])
					.set("ai", function () {
						var cards = _status.event.getParent().cards,
							player = _status.event.player;
						if (
							!game.hasPlayer(function (current) {
								return player !== current && get.attitude(player, current) > 0;
							})
						)
							return 1;
						if (
							game.hasPlayer(function (current) {
								var att = get.attitude(player, current);
								return (
									att &&
									current.countDiscardableCards(player, "he", function (i) {
										if (att > 0) return get.value(i, current) < 0;
										return get.value(i, current) >= 4;
									}) >= cards.length &&
									get.effect(current, { name: "guohe_copy2" }, player, player) > 0
								);
							})
						)
							return 1;
						return 0;
					});
			}
			"step 2";
			if (result.index == 1) {
				cards = event.cards.filter(function (i) {
					return lib.filter.cardDiscardable(i, player, "olsujian");
				});
				if (cards.length) {
					event.num = cards.length;
					player.discard(cards);
					event.cards = cards;
				} else event.finish();
			} else event.goto(5);
			"step 3";
			if (
				game.hasPlayer(function (current) {
					return current != player && current.countDiscardableCards(player, "he") > 0;
				})
			) {
				player
					.chooseTarget(true, "弃置一名其他角色的至多" + get.cnNumber(num) + "张牌", function (card, player, current) {
						return current != player && current.countDiscardableCards(player, "he") > 0;
					})
					.set("ai", function (current) {
						var att = get.attitude(player, current);
						if (
							current.countDiscardableCards(player, "he", function (i) {
								if (att > 0) return get.value(i, current) >= 4;
								return get.value(i, current) <= 0;
							}) >= num
						)
							return 4 * get.effect(current, { name: "guohe_copy2" }, player, player);
						return get.effect(current, { name: "guohe_copy2" }, player, player);
					});
			} else event.finish();
			"step 4";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "green");
				player.discardPlayerCard(target, true, [1, num]);
			}
			event.finish();
			"step 5";
			if (_status.connectMode)
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			event.given_map = {};
			"step 6";
			player.chooseCardTarget({
				filterCard: function (card) {
					return card.hasGaintag("olsujian");
				},
				filterTarget: lib.filter.notMe,
				selectCard: [1, cards.length],
				forced: true,
				prompt: "请选择要分配的卡牌和目标",
				ai1: function (card) {
					if (!ui.selected.cards.length) return 1;
					return 0;
				},
				ai2: function (target) {
					var player = _status.event.player,
						card = ui.selected.cards[0];
					var val = target.getUseValue(card);
					if (val > 0) return val * get.attitude(player, target) * 2;
					return get.value(card, target) * get.attitude(player, target);
				},
			});
			"step 7";
			if (result.bool) {
				var res = result.cards,
					target = result.targets[0].playerid;
				player.removeGaintag("olsujian", res);
				player.addGaintag(res, "olsujian_given");
				cards.removeArray(res);
				if (!event.given_map[target]) event.given_map[target] = [];
				event.given_map[target].addArray(res);
				if (cards.length) event.goto(6);
			} else event.finish();
			"step 8";
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			var map = [],
				cards = [];
			for (var i in event.given_map) {
				var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
				player.line(source, "green");
				map.push([source, event.given_map[i]]);
				cards.addArray(event.given_map[i]);
			}
			if (map.length)
				game.loseAsync({
					gain_list: map,
					player: player,
					cards: cards,
					giver: player,
					animate: "giveAuto",
				}).setContent("gaincardMultiple");
			"step 9";
			event.cards = [];
		},
		update: function (player) {
			player.removeGaintag("olsujian");
			var hs = player.getCards("h");
			player.getHistory("gain", function (evt) {
				hs.removeArray(evt.cards);
			});
			if (hs.length) player.addGaintag(hs, "olsujian");
			return hs;
		},
		group: "olsujian_sync",
		subSkill: {
			sync: {
				trigger: { player: ["phaseBeginStart", "gainBegin"] },
				forced: true,
				popup: false,
				firstDo: true,
				filter: function (event, player) {
					if (event.name == "gain") return player == _status.currentPhase && event.getParent("olsujian").player != player;
					return true;
				},
				content: function () {
					lib.skill.olsujian.update(player);
				},
			},
		},
	},
	//卞夫人
	fuwei: {
		audio: "wanwei",
		trigger: {
			player: "loseAfter",
			global: "gainAfter",
		},
		filter: function (event, player) {
			var evt = event;
			if (event.name == "lose") {
				if (event.type != "discard") return false;
				evt = event.getParent();
			}
			if (evt[event.name == "gain" ? "bySelf" : "notBySelf"] != true) return false;
			var evtx = event.getl(player);
			return evtx && evtx.cards2 && evtx.cards2.length > 0;
		},
		prompt2: function (event, player) {
			var evt = event.getl(player),
				origins = evt.cards2.map(function (i) {
					return get.name(i, evt.hs.includes(i) ? player : false);
				});
			return "从牌堆中获得" + get.translation(origins) + "；若没有则改为摸一张牌";
		},
		usable: 1,
		content: function () {
			var num = 0,
				cards = [],
				evt = trigger.getl(player),
				origins = evt.cards2.map(function (i) {
					return get.name(i, evt.hs.includes(i) ? player : false);
				});
			for (var i of origins) {
				var card = get.cardPile2(function (card) {
					return card.name == i && !cards.includes(card);
				});
				if (card) cards.push(card);
				else num++;
			}
			if (cards.length) player.gain(cards, "gain2");
			if (num) player.draw(num);
		},
	},
	yuejian: {
		audio: 2,
		usable: 2,
		trigger: { global: "useCardAfter" },
		filter: function (event, player) {
			return player != event.player && event.targets && event.targets.includes(player) && player.countCards("h") > 0;
		},
		prompt2: function (event, player) {
			var suit = get.suit(event.card),
				hs = player.getCards("h"),
				cards = event.cards.filterInD();
			if (!lib.suit.includes(suit) || !cards.length) {
				return "展示所有手牌，然后无事发生";
			}
			for (var i of hs) {
				if (get.suit(i) == suit) {
					return "展示所有手牌，然后无事发生";
				}
			}
			return '展示所有手牌，然后<span class="yellowtext">获得' + get.translation(cards) + "</span>";
		},
		check: function (event, player) {
			var suit = get.suit(event.card),
				hs = player.getCards("h"),
				cards = event.cards.filterInD();
			if (!lib.suit.includes(suit) || !cards.length) {
				return false;
			}
			for (var i of hs) {
				if (get.suit(i) == suit) {
					return false;
				}
			}
			return true;
		},
		content: function () {
			"step 0";
			player.showHandcards(get.translation(player) + "发动了【约俭】");
			var suit = get.suit(trigger.card),
				hs = player.getCards("h");
			if (!lib.suit.includes(suit)) {
				event.finish();
				return;
			}
			for (var i of hs) {
				if (get.suit(i) == suit) {
					event.finish();
					return;
				}
			}
			"step 1";
			var cards = trigger.cards.filterInD();
			if (cards.length) player.gain(cards, "gain2");
		},
	},
	//杜袭
	quxi: {
		audio: 2,
		trigger: { player: "phaseUseEnd" },
		direct: true,
		limited: true,
		skillAnimation: true,
		animationColor: "water",
		filter: function (event, player) {
			if (player.isTurnedOver()) return false;
			var list = game.filterPlayer(target => target != player && !target.hasMark("quxi_gain") && !target.hasMark("quxi_lose"));
			if (list.length < 2) return false;
			var nf = list[0].countCards("h");
			for (var i = 1; i < list.length; i++) {
				if (list[i].countCards("h") != nf) return true;
			}
			return false;
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(2, get.prompt("quxi"), "选择两名手牌数不同的其他角色。你将翻至背面，令这两名角色中手牌数较少的角色获得另一名角色的一张牌并获得一枚“丰”，另一名角色获得一枚“歉”。", function (card, player, target) {
					if (player == target || target.hasMark("quxi_gain") || target.hasMark("quxi_lose")) return false;
					if (!ui.selected.targets.length) return true;
					return target.countCards("h") != ui.selected.targets[0].countCards("h");
				})
				.set("complexTarget", true)
				.set("ai", function (target) {
					if (!ui.selected.targets.length) {
						var player = _status.event.player,
							hs = target.countCards("h");
						if (
							game.hasPlayer(function (current) {
								return current != player && current != target && current.countCards("h") > hs && !current.hasMark("quxi_gain") && !current.hasMark("quxi_lose");
							})
						)
							return get.attitude(player, target) / Math.sqrt(1 + target.countCards("h"));
						return 0;
					}
					if (target.countCards("h") > ui.selected.targets[0].countCards("h")) return -get.attitude(_status.event.player, target);
					return 0;
				});
			"step 1";
			if (result.bool) {
				player.logSkill("quxi", result.targets);
				player.awakenSkill("quxi");
				player.skip("phaseDiscard");
				if (result.targets[0].countCards("h") > result.targets[1].countCards("h")) result.targets.reverse();
				event.gainner = result.targets[0];
				event.giver = result.targets[1];
				player.turnOver();
			} else event.finish();
			"step 2";
			event.gainner.gainPlayerCard(event.giver, true, "he");
			"step 3";
			player.addSkill("quxi_effect");
			event.gainner.addMark("quxi_gain", 1);
			event.giver.addMark("quxi_lose", 1);
		},
		subSkill: {
			effect: {
				global: "quxi_gainlose",
				trigger: { global: ["roundStart", "die"] },
				charlotte: true,
				direct: true,
				filter: function (event, player) {
					if (event.name == "die") return event.player.countMark("quxi_gain") > 0 || event.player.countMark("quxi_lose") > 0;
					return game.hasPlayer(function (target) {
						return target != player && (target.countMark("quxi_gain") > 0 || target.countMark("quxi_lose") > 0);
					});
				},
				content: function () {
					"step 0";
					if (trigger.name == "die") {
						var gain = trigger.player.countMark("quxi_gain"),
							lose = trigger.player.countMark("quxi_lose");
						player
							.chooseTarget("是否令一名角色获得" + get.translation(trigger.player) + "的“" + (gain && lose ? "丰”和“歉" : gain ? "丰" : "歉") + "”标记？", function (card, player, target) {
								return !target.hasMark("quxi_gain") && !target.hasMark("quxi_lose");
							})
							.set("goon", gain - lose)
							.set("ai", function (target) {
								var evt = _status.event;
								return evt.goon * get.attitude(evt.player, target);
							});
					} else event.goto(2);
					"step 1";
					if (result.bool) {
						var targets = result.targets;
						if (targets.length < 2) targets.unshift(trigger.player);
						player.logSkill("quxi_effect", targets, false);
						player.line2(targets);
						var gain = targets[0].countMark("quxi_gain"),
							lose = targets[0].countMark("quxi_lose");
						if (gain) {
							targets[0].removeMark("quxi_gain", gain);
							targets[1].addMark("quxi_gain", gain);
						}
						if (lose) {
							targets[0].removeMark("quxi_lose", lose);
							targets[1].addMark("quxi_lose", lose);
						}
						game.delayx();
						event.finish();
					}
					"step 2";
					if (
						game.hasPlayer(function (target) {
							return target.countMark("quxi_gain") > 0;
						})
					)
						player
							.chooseTarget(2, "是否转移“丰”标记？", function (card, player, target) {
								if (ui.selected.targets.length) return !target.hasMark("quxi_gain") && !target.hasMark("quxi_lose");
								return target.countMark("quxi_gain") > 0;
							})
							.set("complexTarget", true)
							.set("complexSelect", true)
							.set("targetprompt", ["移走标记", "获得标记"])
							.set("ai", function (target) {
								var player = _status.event.player;
								if (!ui.selected.targets.length) {
									return -get.attitude(player, target);
								}
								return get.attitude(player, target);
							});
					else event.goto(4);
					"step 3";
					if (result.bool) {
						var targets = result.targets;
						player.logSkill("quxi_effect", targets, false);
						player.line2(targets);
						var gain = targets[0].countMark("quxi_gain");
						if (gain) {
							targets[0].removeMark("quxi_gain", gain);
							targets[1].addMark("quxi_gain", gain);
						}
						game.delayx();
					}
					"step 4";
					if (
						game.hasPlayer(function (target) {
							return target.countMark("quxi_lose") > 0;
						})
					)
						player
							.chooseTarget(2, "是否转移“歉”标记？", function (card, player, target) {
								if (ui.selected.targets.length) return !target.hasMark("quxi_gain") && !target.hasMark("quxi_lose");
								return target.countMark("quxi_lose") > 0;
							})
							.set("complexTarget", true)
							.set("complexSelect", true)
							.set("targetprompt", ["移走标记", "获得标记"])
							.set("ai", function (target) {
								var player = _status.event.player;
								if (!ui.selected.targets.length) {
									return get.attitude(player, target);
								}
								return -get.attitude(player, target);
							});
					else event.finish();
					"step 5";
					if (result.bool) {
						var targets = result.targets;
						player.logSkill("quxi_effect", targets, false);
						player.line2(targets);
						var gain = targets[0].countMark("quxi_lose");
						if (gain) {
							targets[0].removeMark("quxi_lose", gain);
							targets[1].addMark("quxi_lose", gain);
						}
						game.delayx();
					}
				},
			},
			gainlose: {
				trigger: { player: "phaseDrawBegin" },
				forced: true,
				filter: function (event, player) {
					if (event.numFixed) return false;
					return player.countMark("quxi_gain") - player.countMark("quxi_lose") != 0;
				},
				content: function () {
					trigger.num += player.countMark("quxi_gain") - player.countMark("quxi_lose");
				},
			},
			gain: {
				marktext: "丰",
				intro: {
					name: "驱徙(丰)",
					name2: "丰",
					content: "mark",
				},
			},
			lose: {
				marktext: "歉",
				intro: {
					name: "驱徙(歉)",
					name2: "歉",
					content: "mark",
				},
			},
		},
	},
	bixiong: {
		audio: 2,
		trigger: {
			player: "loseAfter",
			global: "loseAsyncAfter",
		},
		forced: true,
		filter: function (event, player) {
			if (event.type != "discard" || event.getlx === false || event.getParent("phaseDiscard").player != player) return false;
			var evt = event.getl(player);
			return evt && evt.hs && evt.hs.length > 0;
		},
		content: function () {
			var cards = [],
				hs = trigger.getl(player).hs;
			for (var i of hs) cards.add(get.suit(i, player));
			player.addTempSkill("bixiong2", { player: "phaseBegin" });
			player.markAuto("bixiong2", cards);
		},
	},
	bixiong2: {
		onremove: true,
		mod: {
			targetEnabled: function (card, player, target) {
				if (player !== target && target.getStorage("bixiong2").includes(get.suit(card))) return false;
			},
		},
		intro: { content: "不能成为其他角色$牌的目标" },
	},
	//高干
	juguan: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return (
				event.filterCard(
					{
						name: "sha",
					},
					player,
					event
				) ||
				event.filterCard(
					{
						name: "juedou",
					},
					player,
					event
				)
			);
		},
		chooseButton: {
			dialog: function () {
				return ui.create.dialog("拒关", [["sha", "juedou"], "vcard"]);
			},
			filter: function (button, player) {
				var evt = _status.event.getParent();
				return evt.filterCard(
					{
						name: button.link[2],
					},
					player,
					evt
				);
			},
			check: function (button) {
				return (
					_status.event.player.getUseValue({
						name: button.link[2],
					}) * (button.link[2] == "juedou" ? 3 : 1)
				);
			},
			backup: function (links) {
				return {
					audio: "juguan",
					viewAs: { name: links[0][2] },
					filterCard: true,
					check: function (card) {
						return 6 - get.value(card);
					},
					position: "hs",
					onuse: function (result, player) {
						player.addTempSkill("juguan_effect");
					},
				};
			},
			prompt: function (links) {
				return "将一张手牌当做" + get.translation(links[0][2]) + "使用";
			},
		},
		ai: {
			order: function (item, player) {
				return Math.max(get.order({ name: "sha" }), get.order({ name: "juedou" })) + 0.2;
			},
			result: { player: 1 },
		},
		subSkill: {
			effect: {
				trigger: { global: "damage" },
				forced: true,
				charlotte: true,
				firstDo: true,
				silent: true,
				popup: false,
				filter: function (event, player) {
					var evt = event.getParent("useCard");
					return event.card && evt && event.card == evt.card && evt.skill == "juguan_backup" && evt.player == player;
				},
				content: function () {
					player.addSkill("juguan_draw");
					player.markAuto("juguan_draw", [trigger.player]);
				},
			},
			draw: {
				audio: "juguan",
				trigger: { player: "phaseDrawBegin" },
				forced: true,
				charlotte: true,
				onremove: true,
				content: function () {
					player.removeSkill("juguan_draw");
					if (!trigger.numFixed) trigger.num += 2;
				},
				group: "juguan_clear",
				intro: {
					content: "若没有受到$的伤害，则下个摸牌阶段多摸两张牌",
				},
			},
			clear: {
				trigger: { player: "damage" },
				forced: true,
				charlotte: true,
				firstDo: true,
				silent: true,
				popup: false,
				filter: function (event, player) {
					return player.storage.juguan_draw && player.storage.juguan_draw.includes(event.source);
				},
				content: function () {
					player.unmarkAuto("juguan_draw", [trigger.source]);
					if (!player.storage.juguan_draw || !player.storage.juguan_draw.length) player.removeSkill("juguan_draw");
				},
			},
		},
	},
	//OL鲍三娘
	olwuniang: {
		audio: "xinfu_wuniang",
		trigger: { player: "useCardAfter" },
		usable: 1,
		filter: function (event, player) {
			return event.card.name == "sha" && event.targets.length == 1 && event.targets[0].isIn();
		},
		logTarget: "targets",
		content: function () {
			"step 0";
			var target = trigger.targets[0];
			target
				.chooseToUse(function (card, player, event) {
					if (get.name(card) != "sha") return false;
					return lib.filter.filterCard.apply(this, arguments);
				}, "武娘：是否对" + get.translation(player) + "使用一张杀？")
				.set("targetRequired", true)
				.set("complexSelect", true)
				.set("filterTarget", function (card, player, target) {
					if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
					return lib.filter.filterTarget.apply(this, arguments);
				})
				.set("sourcex", player);
			"step 1";
			player.addTempSkill("olwuniang2");
			player.addMark("olwuniang2", 1, false);
			player.draw();
		},
	},
	olwuniang2: {
		onremove: true,
		charlotte: true,
		mod: {
			cardUsable: function (card, player, num) {
				if (card.name == "sha") return num + player.countMark("olwuniang2");
			},
		},
	},
	olxushen: {
		derivation: "olzhennan",
		audio: "xinfu_xushen",
		trigger: { player: "dying" },
		limited: true,
		skillAnimation: true,
		animationColor: "fire",
		filter: function (event, player) {
			return player.hp < 1;
		},
		content: function () {
			"step 0";
			player.awakenSkill("olxushen");
			player.addSkills("olzhennan");
			player.recover(1 - player.hp);
			"step 1";
			if (
				!player.isDying() &&
				!game.hasPlayer(function (current) {
					return current.name1 == "guansuo" || current.name2 == "guansuo";
				})
			) {
				player
					.chooseTarget(function (card, player, current) {
						return current != player && current.hasSex("male");
					}, "许身：是否令一名其他男性角色选择是否将其武将牌替换为“关索”？")
					.set("ai", function (target) {
						return get.attitude(_status.event.player, target) - 4;
					});
			} else event.finish();
			"step 2";
			if (!result.bool) {
				event.finish();
				return;
			}
			var target = result.targets[0];
			event.target = target;
			player.line(target, "fire");
			target.chooseBool("许身：是否将自己的一张武将牌替换为“关索”？");
			"step 3";
			if (result.bool) {
				if (target.name2 != undefined) {
					target.chooseControl(target.name1, target.name2).set("prompt", "请选择要更换的武将牌");
				} else event._result = { control: target.name1 };
			} else event.finish();
			"step 4";
			target.reinitCharacter(result.control, "guansuo");
		},
	},
	olzhennan: {
		audio: "xinfu_zhennan",
		enable: "phaseUse",
		usable: 1,
		viewAs: { name: "nanman" },
		filterCard: true,
		selectCard: function () {
			if (ui.selected.targets.length) return [ui.selected.targets.length, Math.min(ui.selected.targets.length + 1, game.players.length - 1)];
			return [1, Infinity];
		},
		check: function (card) {
			var player = _status.event.player;
			if (
				game.countPlayer(function (current) {
					return current != player && player.canUse("nanman", current) && get.effect(current, { name: "nanman" }, player, player) > 0;
				}) <= ui.selected.cards.length
			)
				return 0;
			return 6 - get.value(card);
		},
		selectTarget: function () {
			return ui.selected.cards.length;
		},
		ai: {
			order: 2,
		},
		group: "olzhennan2",
	},
	olzhennan2: {
		trigger: { target: "useCardToBefore" },
		forced: true,
		locked: false,
		audio: "olzhennan",
		sourceSkill: "olzhennan",
		filter: function (event, player) {
			return event.card.name == "nanman";
		},
		content: function () {
			trigger.cancel();
		},
	},
	//黄承彦
	guanxu: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return game.hasPlayer(current => lib.skill.guanxu.filterTarget(null, player, current));
		},
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("h") > 0;
		},
		content: function () {
			"step 0";
			var cards = get.cards(5);
			for (var i = cards.length - 1; i >= 0; i--) {
				ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
			}
			game.updateRoundNumber();
			var hs = target.getCards("h");
			var dialog = ["观虚：选择要操作的牌", '<div class="text center">' + get.translation(target) + "的手牌</div>", hs, '<div class="text center">牌堆顶</div>', cards];
			player
				.chooseButton(dialog, 2)
				.set("filterButton", function (button) {
					if (ui.selected.buttons.length) return get.position(button.link) != get.position(ui.selected.buttons[0].link);
					return true;
				})
				.set("cards1", hs)
				.set("cards2", cards)
				.set("ai", function (button) {
					var card = button.link,
						cards1 = _status.event.cards1.slice(0);
					var cards2 = _status.event.cards2.slice(0),
						target = _status.event.getParent().target;
					if (!ui.selected.buttons.length) {
						if (!cards1.includes(card)) return 0;
						cards1.remove(card);
						var suits = cards2.map(function (i) {
							return get.suit(i, target);
						});
						for (var i of lib.suit) {
							var num = cards1.filter(function (c) {
								return get.suit(c, target) == i;
							}).length;
							if (num > 2 || (num > 1 && suits.includes(i))) return 20 + get.value(card);
						}
						return get.value(card);
					}
					cards1.remove(ui.selected.buttons[0].link);
					cards1.push(card);
					for (var i of lib.suit) {
						if (
							cards1.filter(function (c) {
								return get.suit(c, target) == i;
							}).length > 2
						)
							return 20 - get.value(card);
						return get.value(ui.selected.buttons[0].link) - get.value(card);
					}
				});
			"step 1";
			if (result.bool) {
				var cards = result.links;
				if (get.position(cards[0]) != "h") cards.reverse();
				var next = target.lose(cards[0], ui.cardPile);
				next.insert_index_card = cards[1];
				next.insert_index = function (event) {
					return event.insert_index_card;
				};
				target.gain(cards[1], "draw");
			} else event.finish();
			"step 2";
			game.updateRoundNumber();
			var suits = [],
				map = {},
				hs = target.getCards("h");
			if (hs.length) {
				for (var i of hs) {
					if (!lib.filter.canBeDiscarded(i, player, target, "guanxu")) continue;
					var suit = get.suit(i, target);
					if (!map[suit]) map[suit] = 1;
					else map[suit]++;
					if (map[suit] > 2) suits.add(suit);
				}
				var next = player.discardPlayerCard(target, 3, "visible", "h");
				next.set("suits", suits);
				next.set("filterButton", function (button) {
					var suit = get.suit(button.link);
					if (!ui.selected.buttons.length) return _status.event.suits.includes(suit);
					return suit == get.suit(ui.selected.buttons[0].link);
				});
				if (suits.length) next.set("forced", true);
			}
		},
		ai: {
			order: 9,
			result: {
				target: function (player, target) {
					if (target.countCards("h") > 3) return -5;
					if (target.countCards("h") == 3) return -3;
					return -0.5;
				},
			},
		},
	},
	yashi: {
		audio: 2,
		trigger: { player: "damageEnd" },
		direct: true,
		filter: function (event, player) {
			if (event.source && event.source.isIn()) return true;
			return game.hasPlayer(current => lib.skill.guanxu.filterTarget(null, player, current));
		},
		content: function () {
			"step 0";
			event.addIndex = 0;
			var choiceList = [];
			if (trigger.source && trigger.source.isIn()) {
				choiceList.push("令" + get.translation(trigger.source) + "的所有非锁定技失效");
			} else event.addIndex++;
			if (game.hasPlayer(current => lib.skill.guanxu.filterTarget(null, player, current))) choiceList.push("发动一次〖观虚〗");
			player
				.chooseControl("cancel2")
				.set("prompt", get.prompt("yashi"))
				.set("choiceList", choiceList)
				.set("ai", function () {
					var player = _status.event.player,
						source = _status.event.getTrigger().source,
						index = _status.event.getParent().addIndex;
					if (
						game.hasPlayer(function (current) {
							return current != player && current.countCards("h") > 3 && get.attitude(player, current) < 0;
						})
					)
						return 1 - index;
					if (source && source.isIn() && get.attitude(player, source) < 0 && !source.hasSkill("fengyin")) return 0;
					if (
						game.hasPlayer(function (current) {
							return current != player && current.countCards("h") > 0 && get.attitude(player, current) < 0;
						})
					)
						return 1 - index;
					return "cancel2";
				});
			"step 1";
			if (result.control != "cancel2") {
				if (result.index + event.addIndex == 0) {
					var target = trigger.source;
					player.logSkill("yashi", target);
					//target.removeSkill('fengyin');
					target.addTempSkill("fengyin", { player: "phaseBegin" });
					event.finish();
				} else
					player.chooseTarget(true, "请选择〖观虚〗的目标", lib.skill.guanxu.filterTarget).set("ai", function (target) {
						var player = _status.event.player;
						return get.effect(target, "guanxu", player, player);
					});
			} else event.finish();
			"step 2";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("yashi", target);
				var next = game.createEvent("yashi_guanxu");
				next.player = player;
				next.target = target;
				next.setContent(lib.skill.guanxu.content);
			}
		},
	},
	//黄祖
	wangong: {
		audio: 2,
		trigger: { player: "useCard" },
		forced: true,
		filter: function (event, player) {
			return get.type(event.card, null, false) == "basic";
		},
		content: function () {
			player.addSkill("wangong2");
		},
	},
	wangong2: {
		trigger: { player: "useCard1" },
		forced: true,
		popup: false,
		firstDo: true,
		charlotte: true,
		sourceSkill: "wangong",
		content: function () {
			player.removeSkill("wangong2");
			if (trigger.card.name == "sha") trigger.baseDamage++;
		},
		mod: {
			cardUsable: function (card) {
				if (card.name == "sha") return Infinity;
			},
			targetInRange: function (card) {
				if (card.name == "sha") return true;
			},
		},
		mark: true,
		intro: {
			content: "使用【杀】无距离和次数限制且伤害+1",
		},
	},
	//潘淑
	weiyi: {
		audio: 2,
		trigger: { global: "damageEnd" },
		filter: function (event, player) {
			if (player.getStorage("weiyi").includes(event.player) || !event.player.isIn()) return false;
			return event.player.hp >= player.hp || event.player.isDamaged();
		},
		direct: true,
		content: function () {
			"step 0";
			var list = [];
			if (trigger.player.hp >= player.hp) list.push("失去体力");
			if (trigger.player.hp <= player.hp && trigger.player.isDamaged()) list.push("回复体力");
			list.push("cancel2");
			player
				.chooseControl(list)
				.set("prompt", get.prompt2("weiyi", trigger.player))
				.set("ai", function () {
					var player = _status.event.player,
						target = _status.event.getTrigger().player;
					var att = get.attitude(player, target),
						eff = get.recoverEffect(target, player, player);
					if (target.hp <= player.hp && target.isDamaged() && att > 2 && eff > 0) {
						if (player == target) {
							var storage = player.getStorage("weiyi");
							if (
								player.hp >= 2 &&
								game.hasPlayer(function (current) {
									return current.hp == player.hp + 1 && !storage.includes(current) && get.attitude(player, current) < 0;
								})
							)
								return "cancel2";
						}
						return "回复体力";
					}
					if (target.hp >= player.hp && att < -2 && eff < 0) return "失去体力";
					return "cancel2";
				});
			"step 1";
			if (result.control != "cancel2") {
				var target = trigger.player;
				player.logSkill("weiyi", target);
				player.markAuto("weiyi", [target]);
				target[result.control == "失去体力" ? "loseHp" : "recover"]();
			}
		},
		onremove: true,
		intro: {
			content: "已令$对汝威服",
		},
	},
	jinzhi: {
		audio: 2,
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard: function (player, name) {
			if (get.type(name) == "basic" && lib.inpile.includes(name) && player.countMark("jinzhi2") < player.countCards("he")) return true;
		},
		filter: function (event, player) {
			if (event.responded || event.jinzhi || player.countMark("jinzhi2") >= player.countCards("he")) return false;
			for (var i of lib.inpile) {
				if (get.type(i) == "basic" && event.filterCard({ name: i, isCard: true }, player, event)) return true;
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				var list = [];
				for (var i of lib.inpile) {
					if (get.type(i) == "basic" && event.filterCard({ name: i, isCard: true }, player, event)) {
						list.push(["基本", "", i]);
						if (i == "sha") {
							for (var j of lib.inpile_nature) list.push(["基本", "", "sha", j]);
						}
					}
				}
				return ui.create.dialog("锦织", [list, "vcard"], "hidden");
			},
			check: function (button) {
				if (_status.event.getParent().type != "phase") return 1;
				if (button.link[2] == "shan") return 3;
				var player = _status.event.player;
				if (button.link[2] == "jiu") {
					if (player.getUseValue({ name: "jiu" }) <= 0) return 0;
					if (player.countCards("h", "sha")) return player.getUseValue({ name: "jiu" });
				}
				return player.getUseValue({ name: button.link[2], nature: button.link[3] }) / 4;
			},
			backup: function (links, player) {
				return {
					selectCard: player.countMark("jinzhi2") + 1,
					filterCard: function (card, player) {
						if (ui.selected.cards.length) {
							if (get.color(card) != get.color(ui.selected.cards[0])) return false;
						}
						return lib.filter.cardDiscardable.apply(this, arguments);
					},
					complexCard: true,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						suit: "none",
						number: null,
						isCard: true,
					},
					position: "he",
					ignoreMod: true,
					check: function (card) {
						var player = _status.event.player,
							color = get.color(card, player);
						if (player.countCards("he", { color: color }) <= player.countMark("jinzhi2") || (ui.selected.cards.length && get.color(ui.selected.cards[0], player) != color)) return -1;
						if (
							lib.skill.jinzhi_backup.viewAs.name == "jiu" &&
							!player.countCards("h", function (cardx) {
								return card != cardx && !ui.selected.cards.includes(cardx) && get.name(cardx, player) == "sha";
							})
						)
							return 0;
						return Math.min(0.01, 6 - get.value(card));
					},
					precontent: function () {
						player.logSkill("jinzhi");
						player.addTempSkill("jinzhi2", "roundStart");
						player.addMark("jinzhi2", 1, false);
						var cards = event.result.cards;
						player.discard(cards);
						player.draw();
						event.result.card = {
							name: event.result.card.name,
							nature: event.result.card.nature,
							isCard: true,
						};
						event.result.cards = [];
						delete event.result.skill;
						if (cards.length > 1) {
							var color = get.color(cards[0], player);
							for (var i = 1; i < cards.length; i++) {
								if (get.color(cards[i], player) != color) {
									var evt = event.getParent();
									evt.set("jinzhi", true);
									evt.goto(0);
									return;
								}
							}
						}
					},
				};
			},
			prompt: function (links, player) {
				var name = links[0][2];
				var nature = links[0][3];
				return "弃置" + get.cnNumber(player.countMark("jinzhi2") + 1) + "张颜色相同的牌并摸一张牌，然后视为使用" + (get.translation(nature) || "") + get.translation(name);
			},
		},
		ai: {
			order: function (item, player) {
				if (_status.event.type == "phase" && !player.countMark("jinzhi2") && player.getUseValue({ name: "jiu" }, null, true) > 0 && player.countCards("h", "sha")) return get.order({ name: "jiu" }) + 1;
				return 1;
			},
			respondShan: true,
			respondSha: true,
			skillTagFilter: function (player) {
				if (player.countMark("jinzhi2") >= player.countCards("he")) return false;
			},
			result: {
				player: function (player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
	},
	jinzhi2: {
		charlotte: true,
		onremove: true,
		intro: {
			content: "本轮已发动过#次",
		},
	},
	//宗预
	zyqiao: {
		audio: 2,
		trigger: { target: "useCardToTargeted" },
		logTarget: "player",
		usable: 2,
		preHidden: true,
		filter: function (event, player) {
			var source = event.player;
			if (source == player) return false;
			if (get.mode() == "guozhan" && source.isFriendOf(player)) return false;
			return source.countDiscardableCards(player, "he") > 0;
		},
		check: function (event, player) {
			var target = event.player;
			if (get.attitude(player, target) >= 0) return false;
			if (
				!player.countCards("he", function (card) {
					return lib.filter.cardDiscardable(card, player, "zyqiao");
				})
			)
				return true;
			if (player.countCards("he", card => get.value(card, player) < 5)) return true;
			if (target.countCards("he", card => get.value(card, target) > 6) && player.countCards("he", card => get.value(card, player) < 7)) return true;
			return false;
		},
		content: function () {
			"step 0";
			player.discardPlayerCard(trigger.player, true, "he");
			"step 1";
			if (
				player.countCards("he", function (card) {
					return lib.filter.cardDiscardable(card, player, "zyqiao");
				})
			)
				player.chooseToDiscard("he", true);
		},
	},
	chengshang: {
		audio: 2,
		trigger: { player: "useCardAfter" },
		filter: function (event, player) {
			if (!lib.suit.includes(get.suit(event.card, false)) || typeof get.number(event.card) != "number") return false;
			if (
				player.getHistory("sourceDamage", function (evt) {
					return evt.card == event.card;
				}).length
			)
				return false;
			var phsu = event.getParent("phaseUse");
			if (!phsu || phsu.player != player) return false;
			if (
				player.getHistory("gain", function (evt) {
					return evt.getParent().name == "chengshang" && phsu === evt.getParent("phaseUse");
				}).length
			)
				return false;
			for (var i of event.targets) {
				if (i != player && (get.mode() != "guozhan" || i.isEnemyOf(player))) return true;
			}
			return false;
		},
		preHidden: true,
		content: function () {
			var suit = get.suit(trigger.card);
			var number = get.number(trigger.card);
			var cards = [];
			for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
				var card = ui.cardPile.childNodes[i];
				if (card.suit == suit && card.number == number) cards.push(card);
			}
			if (cards.length) player.gain(cards, "gain2");
		},
	},
	//新丁奉
	reduanbing: {
		audio: "duanbing",
		audioname2: { heqi: "duanbing_heqi" },
		trigger: { player: "useCard2" },
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			return game.hasPlayer(function (current) {
				return !event.targets.includes(current) && get.distance(player, current) <= 1 && player.canUse(event.card, current);
			});
		},
		direct: true,
		preHidden: ["reduanbing_sha"],
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("reduanbing"), "为" + get.translation(trigger.card) + "增加一个目标", function (card, player, target) {
					return !_status.event.sourcex.includes(target) && get.distance(player, target) <= 1 && player.canUse(_status.event.card, target);
				})
				.set("sourcex", trigger.targets)
				.set("ai", function (target) {
					var player = _status.event.player;
					return get.effect(target, _status.event.card, player, player);
				})
				.set("card", trigger.card)
				.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.target = result.targets[0];
			} else {
				event.finish();
			}
			"step 2";
			player.logSkill("reduanbing", event.target);
			trigger.targets.push(event.target);
		},
		ai: {
			effect: {
				player_use: function (card, player, target, current, isLink) {
					if (!isLink && card.name == "sha") {
						if (player._reduanbingtmp) return;
						player._reduanbingtmp = true;
						if (get.effect(target, card, player, player) <= 0) {
							delete player._reduanbingtmp;
							return;
						}
						if (
							game.hasPlayer(function (current) {
								return current != target && get.distance(player, current) <= 1 && player.canUse(card, current) && get.effect(current, card, player, player) > 0;
							})
						) {
							delete player._reduanbingtmp;
							return [1, 1];
						}
						delete player._reduanbingtmp;
					}
				},
			},
		},
		group: "reduanbing_sha",
		subSkill: {
			sha: {
				audio: "duanbing",
				audioname: ["heqi"],
				trigger: { player: "useCardToPlayered" },
				forced: true,
				filter: function (event, player) {
					return event.card.name == "sha" && !event.getParent().directHit.includes(event.target) && get.distance(player, event.target) <= 1;
				},
				logTarget: "target",
				content: function () {
					var id = trigger.target.playerid;
					var map = trigger.getParent().customArgs;
					if (!map[id]) map[id] = {};
					if (typeof map[id].shanRequired == "number") {
						map[id].shanRequired++;
					} else {
						map[id].shanRequired = 2;
					}
				},
				ai: {
					directHit_ai: true,
					skillTagFilter: function (player, tag, arg) {
						if (arg.card.name != "sha" || arg.target.countCards("h", "shan") > 1 || get.distance(player, arg.target) > 1) return false;
					},
				},
			},
		},
	},
	refenxun: {
		audio: "fenxun",
		enable: "phaseUse",
		usable: 1,
		position: "he",
		filterTarget: function (card, player, target) {
			return target != player;
		},
		content: function () {
			player.markAuto("refenxun2", targets);
			player.addTempSkill("refenxun2");
		},
		ai: {
			order: 6.5,
			result: {
				player: function (player, target) {
					if (get.distance(player, target) <= 1) return 0;
					var hs = player.getCards("h", "shunshou");
					if (hs.length && player.canUse(hs[0], target, false)) {
						return 1;
					}
					var geteff = function (current) {
						return player.canUse("sha", current, false, true) && get.effect(current, { name: "sha" }, player, player) > 0;
					};
					if (player.hasSha() && geteff(target)) {
						var num = game.countPlayer(function (current) {
							return current != player && get.distance(player, current) <= 1 && geteff(current);
						});
						if (num == 0) {
							if (
								game.hasPlayer(function (current) {
									return player.canUse("sha", current) && geteff(current) && current != target;
								})
							) {
								return 1;
							}
						} else if (num == 1) {
							return 1;
						}
					}
					return 0;
				},
			},
		},
	},
	refenxun2: {
		audio: "fenxun",
		trigger: {
			player: "phaseJieshuBegin",
		},
		forced: true,
		charlotte: true,
		sourceSkill: "refenxun",
		filter: function (event, player) {
			return (
				player.getHistory("sourceDamage", function (evt) {
					return player.storage.refenxun2.includes(evt.player);
				}).length == 0 &&
				player.countCards("he", function (card) {
					return lib.filter.cardDiscardable(card, player, "refenxun2");
				}) > 0
			);
		},
		content: function () {
			player.chooseToDiscard("he", true);
		},
		onremove: true,
		intro: {
			content: "到$的距离视为1",
		},
		mod: {
			globalFrom: function (from, to) {
				if (from.storage.refenxun2.includes(to)) {
					return -Infinity;
				}
			},
		},
	},
	//蔡阳新技能
	zhuixi: {
		mod: {
			cardUsable: function (card, player, num) {
				if (card.name == "sha") return num + 1;
			},
		},
	},
	//新塌顿
	reluanzhan: {
		audio: "luanzhan",
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		forced: true,
		locked: false,
		content: function () {
			player.addMark("reluanzhan", 1, false);
		},
		intro: { content: "mark" },
		ai: {
			notemp: true,
		},
		group: ["reluanzhan_add", "reluanzhan_remove"],
	},
	reluanzhan_add: {
		trigger: { player: "useCard2" },
		direct: true,
		sourceSkill: "reluanzhan",
		filter: function (event, player) {
			if ((event.card.name != "sha" && (get.color(event.card) != "black" || get.type(event.card) != "trick")) || !player.countMark("reluanzhan")) return false;
			var info = get.info(event.card);
			if (info.allowMultiple == false) return false;
			if (event.targets && !info.multitarget) {
				if (
					game.hasPlayer(function (current) {
						return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
					})
				) {
					return true;
				}
			}
			return false;
		},
		content: function () {
			"step 0";
			var num = player.countMark("reluanzhan");
			var prompt2 = "为" + get.translation(trigger.card) + "增加至多" + get.cnNumber(num) + "个目标";
			player
				.chooseTarget(
					get.prompt("reluanzhan"),
					function (card, player, target) {
						if (_status.event.targets.includes(target)) return false;
						var player = _status.event.player;
						return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
					},
					[1, num]
				)
				.set("prompt2", prompt2)
				.set("ai", function (target) {
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					return get.effect(target, trigger.card, player, player);
				})
				.set("card", trigger.card)
				.set("targets", trigger.targets);
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.targets = result.targets;
			} else {
				event.finish();
			}
			"step 2";
			if (event.targets) {
				player.logSkill("reluanzhan", event.targets);
				trigger.targets.addArray(event.targets);
			}
		},
	},
	reluanzhan_remove: {
		audio: "luanzhan",
		trigger: { player: "useCardToPlayered" },
		forced: true,
		locked: false,
		sourceSkill: "reluanzhan",
		filter: function (event, player) {
			if (!event.isFirstTarget || (event.card.name != "sha" && (get.color(event.card) != "black" || get.type(event.card) != "trick")) || !player.countMark("reluanzhan")) return false;
			var info = get.info(event.card);
			if (info.allowMultiple == false || info.multitarget) return false;
			return event.targets.length < player.countMark("reluanzhan");
		},
		content: function () {
			player.removeMark("reluanzhan", Math.ceil(player.countMark("reluanzhan") / 2));
		},
	},
	//卧龙凤雏双头祈福
	youlong: {
		enable: "chooseToUse",
		audio: 2,
		audioname: ["key_sakuya"],
		zhuanhuanji: true,
		marktext: "☯",
		mark: true,
		intro: {
			content: function (storage, player) {
				return storage ? "每轮限一次，你可以废除你的一个装备栏，视为使用一张未以此法使用过的基本牌。" : "每轮限一次，你可以废除你的一个装备栏，视为使用一张未以此法使用过的普通锦囊牌。";
			},
		},
		init: function (player) {
			player.storage.youlong = false;
			if (!player.storage.youlong2) player.storage.youlong2 = [];
		},
		hiddenCard: function (player, name) {
			if (player.storage.youlong2.includes(name) || !player.hasEnabledSlot()) return false;
			if (player.hasSkill("youlong_" + (player.storage.youlong || false))) return false;
			var type = get.type(name);
			if (player.storage.youlong) return type == "basic";
			return type == "trick";
		},
		filter: function (event, player) {
			if (player.storage.youlong2.includes(name) || !player.hasEnabledSlot()) return false;
			if (player.hasSkill("youlong_" + (player.storage.youlong || false))) return false;
			var type = player.storage.youlong ? "basic" : "trick";
			for (var name of lib.inpile) {
				if (player.storage.youlong2.includes(name)) continue;
				if (get.type(name) != type) continue;
				if (event.filterCard({ name: name, isCard: true }, player, event)) return true;
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				var dialog = ui.create.dialog("游龙", "hidden");
				const equips = [];
				for (let i = 1; i < 6; i++) {
					if (!player.hasEnabledSlot(i)) continue;
					equips.push([i, get.translation("equip" + i)]);
				}
				if (equips.length > 0) dialog.add([equips, "tdnodes"]);
				var type = player.storage.youlong ? "basic" : "trick";
				var list = [];
				for (var name of lib.inpile) {
					if (player.storage.youlong2.includes(name)) continue;
					if (get.type(name) != type) continue;
					if (event.filterCard({ name: name, isCard: true }, player, event)) {
						list.push([type, "", name]);
						if (name == "sha") {
							for (var j of lib.inpile_nature) list.push(["基本", "", "sha", j]);
						}
					}
				}
				dialog.add([list, "vcard"]);
				return dialog;
			},
			filter: function (button) {
				if (ui.selected.buttons.length && typeof button.link == typeof ui.selected.buttons[0].link) return false;
				return true;
			},
			select: 2,
			check: function (button) {
				var player = _status.event.player;
				if (typeof button.link == "number") {
					var card = player.getEquip(button.link);
					if (card) {
						var val = get.value(card);
						if (val > 0) return 0;
						return 5 - val;
					}
					switch (button.link) {
						case 3:
							return 4.5;
						case 4:
							return 4.4;
						case 5:
							return 4.3;
						case 2:
							return (3 - player.hp) * 1.5;
						case 1: {
							if (
								game.hasPlayer(function (current) {
									return (get.realAttitude || get.attitude)(player, current) < 0 && get.distance(player, current) > 1;
								})
							)
								return 0;
							return 3.2;
						}
					}
				}
				var name = button.link[2];
				var evt = _status.event.getParent();
				if (evt.type == "phase") {
					var card = { name: name, nature: button.link[3], isCard: true };
					if (name == "shan") return 2;
					if (evt.type == "dying") {
						if (get.attitude(player, evt.dying) < 2) return false;
						if (name == "jiu") return 2.1;
						return 1.9;
					}
					return player.getUseValue(card);
				}
				return 1;
			},
			backup: function (links, player) {
				if (typeof links[1] == "number") links.reverse();
				var equip = links[0];
				var name = links[1][2];
				var nature = links[1][3];
				return {
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					equip: equip,
					viewAs: {
						name: name,
						nature: nature,
						isCard: true,
					},
					popname: true,
					precontent: function () {
						player.logSkill("youlong");
						player.disableEquip(lib.skill.youlong_backup.equip);
						delete event.result.skill;
						player.addTempSkill("youlong_" + (player.storage.youlong || false), "roundStart");
						player.changeZhuanhuanji("youlong");
						player.storage.youlong2.add(event.result.card.name);
					},
				};
			},
			prompt: function (links, player) {
				if (typeof links[1] == "number") links.reverse();
				var equip = "equip" + links[0];
				var name = links[1][2];
				var nature = links[1][3];
				return "废除自己的" + get.translation(equip) + "栏，视为使用" + (get.translation(nature) || "") + get.translation(name);
			},
		},
		ai: {
			respondSha: true,
			respondShan: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg == "respond") return false;
				if (!player.storage.youlong || player.hasSkill("youlong_true")) return false;
				var name = tag == "respondSha" ? "sha" : "shan";
				return !player.storage.youlong2.includes(name);
			},
			order: function (item, player) {
				if (player && _status.event.type == "phase") {
					var max = 0,
						add = false;
					var type = player.storage.youlong ? "basic" : "trick";
					var list = lib.inpile.filter(name => get.type(name) == type && !player.storage.youlong2.includes(name));
					if (list.includes("sha")) add = true;
					list = list.map(namex => {
						return { name: namex, isCard: true };
					});
					if (add) lib.inpile_nature.forEach(naturex => list.push({ name: "sha", nature: naturex, isCard: true }));
					for (var card of list) {
						if (player.getUseValue(card) > 0) {
							var temp = get.order(card);
							if (temp > max) max = temp;
						}
					}
					if (max > 0) max += 0.3;
					return max;
				}
				return 1;
			},
			result: {
				player: function (player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
	},
	youlong_true: { charlotte: true },
	youlong_false: { charlotte: true },
	luanfeng: {
		audio: 2,
		audioname: ["key_sakuya"],
		trigger: { global: "dying" },
		filter: function (event, player) {
			return event.player.maxHp >= player.maxHp && event.player.hp < 1;
		},
		limited: true,
		skillAnimation: true,
		animationColor: "soil",
		logTarget: "player",
		check: function (event, player) {
			if (get.attitude(player, event.player) < 4) return false;
			if (
				player.countCards("h", function (card) {
					var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") return mod2;
					var mod = game.checkMod(card, player, event.player, "unchanged", "cardSavable", player);
					if (mod != "unchanged") return mod;
					var savable = get.info(card).savable;
					if (typeof savable == "function") savable = savable(card, player, event.player);
					return savable;
				}) >=
				1 - event.player.hp
			)
				return false;
			if (event.player == player || event.player == get.zhu(player)) return true;
			return !player.hasUnknown();
		},
		content: function () {
			"step 0";
			player.awakenSkill("luanfeng");
			trigger.player.recover(3 - trigger.player.hp);
			"step 1";
			var list = [],
				target = trigger.player;
			for (var i = 1; i < 6; i++) {
				for (var j = 0; j < target.countDisabledSlot(i); j++) {
					list.push(i);
				}
			}
			if (list.length > 0) target.enableEquip(list);
			if (list.length < 6) target.drawTo(6 - list.length);
			if (target.storage.kotarou_rewrite) target.storage.kotarou_rewrite = [];
			if (player == target) player.storage.youlong2 = [];
		},
	},
	//曹爽，韩遂，何进
	xiaoxi: {
		audio: 2,
		audioname: ["machao", "hansui", "pangde"],
		trigger: {
			player: "enterGame",
			global: "phaseBefore",
		},
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		direct: true,
		content: function () {
			player.chooseUseTarget("sha", get.prompt("xiaoxi"), "视为使用一张【杀】").logSkill = "xiaoxi";
		},
	},
	spmouzhu: {
		enable: "phaseUse",
		audio: "mouzhu",
		usable: 1,
		filter: function (event, player) {
			return game.hasPlayer(current => lib.skill.spmouzhu.filterTarget(null, player, current));
		},
		filterTarget: function (card, player, target) {
			if (!target.countCards("h")) return false;
			return player != target && (target.hp == player.hp || get.distance(player, target) == 1);
		},
		selectTarget: [1, Infinity],
		content: function () {
			"step 0";
			target.chooseCard("h", "交给" + get.translation(player) + "一张牌", true);
			"step 1";
			if (result.bool) target.give(result.cards, player);
			"step 2";
			if (player.countCards("h") <= target.countCards("h")) {
				event.finish();
				return;
			}
			var list = [];
			if (target.canUse("sha", player, false)) list.push("sha");
			if (target.canUse("juedou", player, false)) list.push("juedou");
			if (!list.length) event.finish();
			else if (list.length == 1) event._result = { control: list[0] };
			else
				target.chooseControl(list).set("prompt", "对" + get.translation(player) + "使用一张【杀】或【决斗】。").ai = function () {
					return get.effect(player, { name: "sha" }, target, target) >= get.effect(player, { name: "juedou" }, target, target) ? "sha" : "juedou";
				};
			"step 3";
			target.useCard({ name: result.control, isCard: true }, player, "noai");
		},
		ai: {
			order: 7,
			result: {
				target: -1.2,
				player: function (player, target) {
					if (ui.selected.targets.length) return 0;
					if (target.countCards("h") - player.countCards("h") > 1) return 1;
					if (get.damageEffect(target, player, player, player) > 0) return 1;
					if (player.hp > 3 || (player.countCards("h", "sha") && player.countCards("h", "shan"))) return 0;
					if (player.hp > 2) return -1.1;
					return -2;
				},
			},
		},
	},
	spyanhuo: {
		audio: "yanhuo",
		trigger: { player: "die" },
		forceDie: true,
		skillAnimation: true,
		animationColor: "soil",
		content: function () {
			player.line(game.players, "green");
			game.addGlobalSkill("spyanhuo_damage");
			game.broadcastAll(() => {
				if (!_status.yanhuo) _status.yanhuo = 0;
				_status.yanhuo++;
			});
		},
		subSkill: {
			damage: {
				trigger: { player: "useCard" },
				forced: true,
				filter: function (event, player) {
					return event.card.name == "sha";
				},
				content: function () {
					trigger.baseDamage += _status.yanhuo || 0;
				},
			},
		},
	},
	spniluan: {
		enable: "phaseUse",
		audio: "niluan",
		viewAs: { name: "sha" },
		check: function (card) {
			return 5.1 - get.value(card);
		},
		filterCard: { color: "black" },
		position: "hes",
		viewAsFilter: function (player) {
			return player.countCards("hes", lib.skill.spniluan.filterCard) > 0;
		},
		group: "spniluan_clear",
	},
	spniluan_clear: {
		trigger: { player: "useCardAfter" },
		forced: true,
		silent: true,
		charlotte: true,
		sourceSkill: "spniluan",
		filter: function (event, player) {
			return (
				event.skill == "spniluan" &&
				event.addCount !== false &&
				player.getHistory("sourceDamage", function (card) {
					return card.card == event.card;
				}).length == 0
			);
		},
		content: function () {
			trigger.addCount = false;
			if (player.stat[player.stat.length - 1].card.sha > 0) {
				player.stat[player.stat.length - 1].card.sha--;
			}
		},
	},
	spweiwu: {
		audio: 2,
		locked: false,
		enable: "phaseUse",
		usable: 1,
		viewAs: {
			name: "shunshou",
			storage: { spweiwu: true },
		},
		filterCard: { color: "red" },
		position: "hes",
		check: function (card) {
			return 7 - get.value(card);
		},
		mod: {
			targetInRange: function (card) {
				if (card.storage && card.storage.spweiwu) return true;
			},
		},
	},
	tuogu: {
		audio: 2,
		trigger: { global: "die" },
		filter: function (event, player) {
			return (
				event.player.getStockSkills("仲村由理", "天下第一").filter(function (skill) {
					var info = get.info(skill);
					return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited && !info.dutySkill;
				}).length > 0
			);
		},
		logTarget: "player",
		skillAnimation: true,
		limited: true,
		animationColor: "thunder",
		content: function () {
			"step 0";
			player.awakenSkill("tuogu");
			var list = trigger.player.getStockSkills("仲村由理", "天下第一").filter(function (skill) {
				var info = get.info(skill);
				return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited && !info.dutySkill;
			});
			if (list.length == 1) event._result = { control: list[0] };
			else
				trigger.player
					.chooseControl(list)
					.set("prompt", "选择令" + get.translation(player) + "获得一个技能")
					.set("forceDie", true)
					.set("ai", function () {
						return list.randomGet();
					});
			"step 1";
			player.addSkills(result.control);
			game.broadcastAll(function (skill) {
				var list = [skill];
				game.expandSkills(list);
				for (var i of list) {
					var info = lib.skill[i];
					if (!info) continue;
					if (!info.audioname2) info.audioname2 = {};
					info.audioname2.caoshuang = "tuogu";
				}
			}, result.control);
		},
	},
	retuogu: {
		audio: "tuogu",
		trigger: { global: "die" },
		filter: function (event, player) {
			return (
				event.player.getStockSkills("仲村由理", "天下第一").filter(function (skill) {
					var info = get.info(skill);
					return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited && !info.dutySkill;
				}).length > 0
			);
		},
		logTarget: "player",
		check: function (event, player) {
			var list = event.player.getStockSkills("仲村由理", "天下第一").filter(function (skill) {
				var info = get.info(skill);
				return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited && !info.dutySkill;
			});
			var negSkill = list.some(function (skill) {
				return get.skillRank(skill, "inout") <= 0;
			});
			var att = get.sgnAttitude(event.player, player);
			if (!player.storage.retuogu) {
				if (negSkill && att < 0) return false;
				return true;
			}
			list.sort(function (a, b) {
				return att * (get.skillRank(b, "inout") - get.skillRank(a, "inout"));
			})[0];
			return get.skillRank(list[0], "inout") >= get.skillRank(player.storage.retuogu, "inout");
		},
		content: function () {
			"step 0";
			var list = trigger.player.getStockSkills("仲村由理", "天下第一").filter(function (skill) {
				var info = get.info(skill);
				return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited && !info.dutySkill;
			});
			if (list.length == 1) event._result = { control: list[0] };
			else
				trigger.player
					.chooseControl(list)
					.set("prompt", "选择令" + get.translation(player) + "获得一个技能")
					.set("forceDie", true)
					.set("ai", function () {
						var att = get.sgnAttitude(_status.event.getTrigger().player, player);
						if (att == 0) return list.randomGet();
						var listx = list
							.map(function (skill) {
								return [skill, get.skillRank(skill, "inout")];
							})
							.sort(function (a, b) {
								return att * (b[1] - a[1]);
							})
							.slice(0, 2);
						var listx2 = [0];
						if (Math.abs(listx[0][1] - listx[1][1]) <= 0.5 && Math.sign(listx[0][1]) == Math.sign(listx[1][1])) listx2.push(1);
						return listx[listx2.randomGet()][0];
					});
			"step 1";
			if (player.storage.retuogu) player.removeSkill(player.storage.retuogu);
			player.storage.retuogu = result.control;
			player.markSkill("retuogu");
			player.addSkills(result.control);
			game.broadcastAll(function (skill) {
				var list = [skill];
				game.expandSkills(list);
				for (var i of list) {
					var info = lib.skill[i];
					if (!info) continue;
					if (!info.audioname2) info.audioname2 = {};
					info.audioname2.caoshuang = "tuogu";
				}
			}, result.control);
		},
		mark: true,
		intro: { content: "当前托孤技能：$" },
	},
	shanzhuan: {
		trigger: { source: "damageSource" },
		audio: 2,
		direct: true,
		filter: function (event, player) {
			return player != event.player && !event.player.isDisabledJudge() && event.player.countCards("he") && !event.player.countCards("j", card => get.type(card.viewAs || card.name) == "delay");
		},
		content: function () {
			"step 0";
			player.choosePlayerCard(trigger.player, "he", get.prompt("shanzhuan", trigger.player)).set("ai", function (card) {
				if (get.attitude(_status.event.player, _status.event.target) >= 0) return 0;
				return get.buttonValue(card);
			});
			"step 1";
			if (result.bool) {
				player.logSkill("shanzhuan", trigger.player);
				var card = result.cards[0];
				trigger.player.$throw(card);
				game.delayx();
				if (get.type(card, null, false) == "delay") trigger.player.addJudge(card);
				else trigger.player.addJudge({ name: get.color(card, false) == "red" ? "lebu" : "bingliang" }, result.cards);
			}
		},
		group: "shanzhuan_draw",
		subfrequent: ["draw"],
		subSkill: {
			draw: {
				audio: "shanzhuan",
				trigger: { player: "phaseEnd" },
				frequent: true,
				prompt: "是否发动【擅专】摸一张牌？",
				filter: function (event, player) {
					return !player.getHistory("sourceDamage").length;
				},
				content: function () {
					player.draw();
				},
			},
		},
	},
	olxingshen: {
		trigger: { player: "damageEnd" },
		frequent: true,
		audio: "xingshen",
		content: function () {
			"step 0";
			var next = player.draw();
			if (get.isLuckyStar(player) || Math.random() < 0.5) next.num = 2;
			var num = player.countMark("olxingshen");
			if (num < 6) player.addMark("olxingshen", Math.min(6 - num, player.getDamagedHp()), false);
		},
		intro: {
			content: "下一次发动〖严教〗时多展示X张牌",
		},
	},
	//张道陵
	zlhuji: {
		mod: {
			globalFrom: function (player, target, distance) {
				return distance - 1;
			},
		},
		audio: 2,
		trigger: { player: "damageEnd" },
		forced: true,
		filter: function (event, player) {
			return player != _status.currentPhase;
		},
		content: function () {
			"step 0";
			var func = function (result) {
				if (get.color(result) == "red") return 1;
				return 0;
			};
			if (get.itemtype(trigger.source) != "player" || !player.canUse("sha", trigger.source, false))
				func = function (result) {
					return 0;
				};
			else if (get.effect(trigger.source, { name: "sha" }, player, player) < 0)
				func = function (result) {
					if (get.color(result) == "red") return -1;
					return 0;
				};
			player.judge(func).judge2 = function (result) {
				return result.color == "red" ? true : false;
			};
			"step 1";
			if (result.color == "red" && get.itemtype(trigger.source) == "player" && player.canUse("sha", trigger.source, false)) {
				player.useCard({ name: "sha", isCard: true }, trigger.source, false, "noai");
			}
		},
	},
	zlshoufu: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		delay: false,
		content: function () {
			"step 0";
			player.draw();
			"step 1";
			var filterTarget = function (card, player, target) {
				return target != player && !target.hasSkill("zlshoufu2");
			};
			if (
				!player.countCards("h") ||
				!game.hasPlayer(function (current) {
					return filterTarget(null, player, current);
				})
			)
				event.finish();
			else
				player.chooseCardTarget({
					forced: true,
					prompt: "将一张手牌作为“箓”置于其他角色的武将牌上",
					filterTarget: filterTarget,
					filterCard: true,
					position: "h",
					ai1: function (card) {
						if (get.type2(card, false) == "equip") return 1 - get.value(card);
						return 7 - get.value(card);
					},
					ai2: function (target) {
						var player = _status.event.player;
						var att = get.attitude(player, target);
						if (att > 0) return -att;
						return -att / get.distance(player, target, "absolute");
					},
				});
			"step 2";
			var target = result.targets[0];
			var cards = result.cards;
			target.addToExpansion(cards, player, "give").gaintag.add("zlshoufu2");
			player.line(target, "green");
			if (get.mode() !== "identity" || player.identity !== "nei") player.addExpose(0.12);
			target.addSkill("zlshoufu2");
			"step 3";
			game.delayx();
		},
		ai: {
			order: 1,
			result: {
				player: function (player) {
					if (
						game.hasPlayer(function (target) {
							return target != player && !target.hasSkill("zlshoufu2") && get.attitude(player, target) < 0;
						}) ||
						!game.hasPlayer(function (target) {
							return target != player && !target.hasSkill("zlshoufu2") && get.attitude(player, target) > 0;
						})
					)
						return 1;
					return 0;
				},
			},
		},
	},
	zlshoufu2: {
		marktext: "箓",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		charlotte: true,
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		mod: {
			cardEnabled: function (card, player) {
				if (
					player.getExpansions("zlshoufu2").filter(function (magic) {
						return get.type2(magic) == get.type2(card);
					}).length
				)
					return false;
			},
			cardRespondable: function (card, player) {
				if (
					player.getExpansions("zlshoufu2").filter(function (magic) {
						return get.type2(magic) == get.type2(card);
					}).length
				)
					return false;
			},
			cardSavable: function (card, player) {
				if (
					player.getExpansions("zlshoufu2").filter(function (magic) {
						return get.type2(magic) == get.type2(card);
					}).length
				)
					return false;
			},
		},
		trigger: {
			player: ["damageEnd", "loseAfter"],
			global: "loseAsyncAfter",
		},
		forced: true,
		sourceSkill: "zlshoufu",
		filter: function (event, player) {
			var storage = player.getExpansions("zlshoufu2");
			if (!storage.length) return false;
			if (event.name == "damage") return true;
			if (event.type != "discard" || event.getlx === false || event.getParent("phaseDiscard").player != player) return false;
			var num = 0,
				evt = event.getl(player);
			if (!evt || !evt.cards2) return false;
			for (var i of evt.cards2) {
				if (
					storage.filter(function (magic) {
						return get.type2(magic) == get.type2(i, event.hs.includes(i) ? player : false);
					}).length
				)
					num++;
			}
			return num > 1;
		},
		content: function () {
			player.removeSkill("zlshoufu2");
		},
	},
	//蔡阳
	yinka: {
		trigger: { player: ["drawBegin", "judgeBegin"] },
		direct: true,
		filter: function () {
			return ui.cardPile.childNodes.length > 0;
		},
		content: function () {
			"step 0";
			player.chooseButton(["印卡：请选择要置于牌堆" + (trigger.bottom ? "底" : "顶") + "的牌（先选择的在上）", Array.from(ui.cardPile.childNodes)], [1, trigger.num || 1]);
			"step 1";
			if (result.bool) {
				while (result.links.length) {
					if (trigger.bottom) {
						var card = result.links.shift();
						ui.cardPile.removeChild(card);
						ui.cardPile.appendChild(card);
					} else {
						var card = result.links.pop();
						ui.cardPile.removeChild(card);
						ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
					}
				}
			}
		},
		ai: { isLuckyStar: true },
	},
	//新王允
	xinlianji: {
		enable: "phaseUse",
		audio: "wylianji",
		usable: 1,
		check: function (card) {
			return 5 - get.value(card);
		},
		filterTarget: function (card, player, target) {
			if (ui.selected.targets.length) return true;
			return target != player;
		},
		filterCard: true,
		selectTarget: 2,
		multitarget: true,
		targetprompt: ["打人", "被打"],
		content: function () {
			"step 0";
			//player.addMark('xinlianji',1,false);
			var card = get.cardPile2(function (card) {
				return get.subtype(card) == "equip1" && targets[0].hasUseTarget(card);
			});
			if (card) {
				if (card.name == "qinggang" && !lib.inpile.includes("qibaodao")) {
					card.remove();
					card = game.createCard("qibaodao", card.suit, card.number);
				}
				targets[0].chooseUseTarget(card, true, "nopopup", "nothrow");
			} else {
				player.chat("没有装备牌了吗");
				game.log("但是牌堆里已经没有装备牌了！");
			}
			"step 1";
			game.updateRoundNumber();
			targets[0]
				.chooseToUse("对" + get.translation(targets[1]) + "使用一张杀，或将装备区里的武器牌交给一名其他角色", { name: "sha" })
				.set("targetRequired", true)
				.set("complexSelect", true)
				.set("filterTarget", function (card, player, target) {
					if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
					return lib.filter.filterTarget.apply(this, arguments);
				})
				.set("sourcex", targets[1])
				.set("addCount", false);
			"step 2";
			var cards = targets[0].getEquips(1);
			if (!result.bool && cards.length) {
				event.cards = cards;
				player.chooseTarget(true, "将" + get.translation(cards) + "交给一名其他角色").set("ai", function (target) {
					var card = _status.event.getParent().cards;
					return (target.hasSkillTag("nogain") ? 0 : get.attitude(_status.event.player, target)) * Math.max(0.1, target.getUseValue(cards[0]));
				});
			} else event.finish();
			"step 3";
			result.targets[0].gain(cards, result.targets[0], "give").giver = player;
		},
		ai: {
			order: 4,
			result: {
				target: function (player, target) {
					if (ui.selected.targets.length) {
						var pretarget = ui.selected.targets[0];
						if (pretarget.hasSha() && pretarget.canUse({ name: "sha" }, target)) return get.effect(target, { name: "sha" }, pretarget, target);
						return Math.random();
					}
					if (!target.getEquip(1)) {
						if (
							game.hasPlayer(function (current) {
								return current != target && !current.hasSkillTag("nogain") && get.attitude(current, target) > 0;
							})
						)
							return 3;
						return -3;
					}
					if (
						!game.hasPlayer(function (current) {
							return current != target && !current.hasSkillTag("nogain") && get.attitude(current, target) > 0;
						})
					)
						return -6;
					return 4 - get.value(target.getEquip(1));
				},
			},
		},
	},
	xinmoucheng: {
		trigger: { player: "phaseZhunbeiBegin" },
		audio: "moucheng",
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "gray",
		derivation: "xinjingong",
		unique: true,
		filter: function (event, player) {
			return game.hasPlayer2(function (current) {
				return (
					current.getAllHistory("sourceDamage", function (evt) {
						if (!evt.card || evt.card.name != "sha" || evt.getParent().type != "card") return false;
						var evt2 = evt.getParent(4);
						return evt2 && evt2.name == "xinlianji" && evt2.player == player;
					}).length > 0
				);
			});
		},
		content: function () {
			player.awakenSkill("xinmoucheng");
			player.changeSkills(["xinjingong"], ["xinlianji"]);
		},
		ai: {
			combo: "xinlianji",
		},
	},
	xinjingong: {
		audio: "jingong",
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return (
				event.xinjingong_list &&
				player.countCards("hes", function (card) {
					return card.name == "sha" || get.type(card) == "equip";
				})
			);
		},
		onChooseToUse: function (event) {
			if (!game.online) {
				var evt = event.getParent();
				if (evt.name != "phaseUse") return;
				if (!evt.xinjingong_list) {
					var list = get.inpile("trick").randomGets(2);
					if (Math.random() < 0.5) {
						list.push("wy_meirenji");
					} else {
						list.push("wy_xiaolicangdao");
					}
					evt.xinjingong_list = list;
				}
				if (!event.xinjingong_list) event.set("xinjingong_list", evt.xinjingong_list);
			}
		},
		chooseButton: {
			dialog: function (event, player) {
				var list = [];
				for (var i of event.xinjingong_list) list.push(["锦囊", "", i]);
				return ui.create.dialog("矜功", [list, "vcard"]);
			},
			filter: function (button, player) {
				return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
			},
			check: function (button) {
				return _status.event.player.getUseValue({ name: button.link[2] });
			},
			backup: function (links, player) {
				return {
					audio: "jingong",
					popname: true,
					position: "hes",
					viewAs: { name: links[0][2] },
					check: function (card) {
						return 6 - get.value(card);
					},
					filterCard: function (card) {
						return card.name == "sha" || get.type(card) == "equip";
					},
				};
			},
			prompt: function (links, player) {
				return "将一张【杀】或装备牌当做" + get.translation(links[0][2]) + "使用";
			},
		},
		ai: {
			order: 2,
			result: {
				player: 1,
			},
		},
	},
	//孙邵
	bizheng: {
		trigger: { player: "phaseDrawEnd" },
		direct: true,
		audio: 2,
		content: function () {
			"step 0";
			player.chooseTarget(get.prompt2("bizheng"), lib.filter.notMe).set("ai", function (target) {
				var player = _status.event.player;
				if (player.countCards("h") > player.maxHp) return 0;
				var att = get.attitude(player, target);
				if (att <= 0 || target.hasSkillTag("nogain")) return 0;
				if (target.maxHp - target.countCards("h") >= 2) return att;
				return att / 2;
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("bizheng", target);
				target.draw(2);
			} else event.finish();
			"step 2";
			if (player.countCards("h") > player.maxHp) player.chooseToDiscard(2, "he", true);
			"step 3";
			if (target.countCards("h") > target.maxHp) target.chooseToDiscard(2, "he", true);
		},
		ai: {
			expose: 0.25,
		},
	},
	yidian: {
		audio: 2,
		trigger: { player: "useCard2" },
		filter: function (event, player) {
			var info = get.info(event.card);
			if (info.allowMultiple == false) return false;
			if (event.targets && !info.multitarget) {
				for (var i = 0; i < ui.discardPile.childElementCount; i++) {
					if (ui.discardPile.childNodes[i].name == event.card.name) return false;
				}
				if (
					game.hasPlayer(function (current) {
						return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.includes(current);
					})
				) {
					return true;
				}
			}
			return false;
		},
		direct: true,
		content: function () {
			"step 0";
			var prompt2 = "为" + get.translation(trigger.card) + "增加一个目标";
			player
				.chooseTarget(get.prompt("yidian"), function (card, player, target) {
					var player = _status.event.player;
					if (_status.event.targets.includes(target)) return false;
					return lib.filter.targetEnabled2(_status.event.card, player, target);
				})
				.set("prompt2", prompt2)
				.set("ai", function (target) {
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					return get.effect(target, trigger.card, player, player);
				})
				.set("targets", trigger.targets)
				.set("card", trigger.card);
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.targets = result.targets;
			} else {
				event.finish();
			}
			"step 2";
			if (event.targets) {
				player.logSkill("yidian", event.targets);
				trigger.targets.addArray(event.targets);
			}
		},
		ai: {
			expose: 0.25,
		},
	},
	//二袁
	neifa: {
		audio: 2,
		trigger: { player: "phaseUseBegin" },
		direct: true,
		content: function () {
			"step 0";
			_status.noclearcountdown = true;
			if (
				game.hasPlayer(function (current) {
					return current.countGainableCards(player, "ej") > 0;
				})
			) {
				player
					.chooseControl("cancel2")
					.set("choiceList", ["摸两张牌，然后弃置一张牌", "获得场上的一张牌，然后弃置一张牌"])
					.set("prompt", get.prompt("neifa"))
					.set("ai", function () {
						if (
							game.hasPlayer(function (current) {
								var att = get.attitude(player, current);
								if (att == 0) return false;
								if (att < 0)
									return (
										current.countCards("e", function (card) {
											return get.value(card, current) > 5;
										}) > 0
									);
								return (
									current.countCards("ej", function (card) {
										return get.position(card) == "j" || get.value(card, current) <= 0;
									}) > 0
								);
							})
						)
							return 1;
						return 0;
					});
			} else {
				player.chooseControl("ok", "cancel2").set("prompt", get.prompt2("neifa"));
			}
			"step 1";
			if (result.control == "cancel2") {
				delete _status.noclearcountdown;
				if (!_status.noclearcountdown) {
					game.stopCountChoose();
				}
				event.finish();
				return;
			} else if (result.index == 1) {
				player
					.chooseTarget("请选择一名角色，获得其装备区或判定区内的一张牌", true, function (card, player, target) {
						return target.countGainableCards(player, "ej") > 0;
					})
					.set("ai", function (target) {
						var player = _status.event.player;
						var att = get.attitude(player, target);
						if (
							att > 0 &&
							target.countCards("ej", function (card) {
								return get.position(card) == "j" || get.value(card, target) <= 0;
							})
						)
							return 2 * att;
						else if (
							att < 0 &&
							target.countCards("e", function (card) {
								return get.value(card, target) > 5;
							})
						)
							return -att;
						return -1;
					});
			} else {
				delete _status.noclearcountdown;
				if (!_status.noclearcountdown) {
					game.stopCountChoose();
				}
				player.logSkill("neifa");
				player.draw(2);
				event.goto(3);
			}
			"step 2";
			delete _status.noclearcountdown;
			if (!_status.noclearcountdown) {
				game.stopCountChoose();
			}
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("neifa", target);
				player.gainPlayerCard(target, "ej", true);
			}
			"step 3";
			player.chooseToDiscard(true, "he").set("ai", function (cardx) {
				var player = _status.event.player;
				var num = 0;
				var hs = player.getCards("h");
				var muniu = player.getEquip("muniu");
				var subs = [];
				if (muniu && muniu.cards) hs = hs.concat(muniu.cards);
				if (get.type(cardx) == "basic") {
					var shas = hs.filter(function (card) {
						return card != cardx && get.name(card, player) == "sha" && player.hasValueTarget(card);
					});
					var numx = player.countCards("h", function (card) {
						return get.type2(card, player) != "basic";
					});
					num += Math.min(numx, Math.max(0, shas.length - player.getCardUsable("sha"))) * 0.7;
					num +=
						Math.min(
							player.getCardUsable("sha") + numx,
							shas.filter(function (card) {
								return (
									game.countPlayer(function (current) {
										return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
									}) > 1
								);
							}).length
						) * 1.1;
					var taos = Math.min(
						player.maxHp - player.hp,
						hs.filter(function (card) {
							return cardx != card && get.name(card, player) == "tao";
						}).length
					);
					num += taos * player.getDamagedHp() * 1.2;
				} else {
					var numx = Math.sqrt(
						Math.min(
							5,
							player.countCards("h", function (card) {
								return get.type2(card, player) == "basic";
							})
						)
					);
					if (numx)
						num +=
							(numx *
								Math.min(
									2,
									hs.filter(function (card) {
										if (card == cardx || get.type(card) != "equip" || !player.hasUseTarget(card)) return false;
										subs.add(get.subtype(card));
										return true;
									}).length
								) *
								(2.5 + player.countCards("e"))) /
							2.5;
					num +=
						hs.filter(function (card) {
							return card != cardx && get.type2(card) == "trick" && player.hasValueTarget(card);
						}).length * 0.65;
				}
				if (get.position(cardx) == "e" && cardx.name != "muniu" && subs.includes(get.subtype(card))) num += 3;
				return num * 1.5 - get.value(cardx);
			});
			"step 4";
			if (result.bool && result.cards && result.cards.length) {
				var name = get.type(result.cards[0]) == "basic" ? "neifa_basic" : "neifa_nobasic";
				player.addTempSkill(name);
				var num = Math.min(
					5,
					player.countCards("h", function (cardx) {
						return (name == "neifa_basic") != (get.type2(cardx, player) == "basic");
					})
				);
				if (num > 0) player.addMark(name, num, false);
				else player.storage[name] = 0;
			}
		},
		ai: {
			threaten: 3,
		},
	},
	neifa_basic: {
		mark: true,
		marktext: "伐",
		onremove: true,
		intro: {
			name: "内伐 - 基本牌",
			content: "本回合内不能使用锦囊牌和装备牌，使用【杀】选择目标时可以额外指定一个目标且使用【杀】的目标次数上限+#。",
		},
		mod: {
			cardEnabled: function (card, player) {
				if (["trick", "equip"].includes(get.type(card, "trick"))) return false;
			},
			cardSavable: function (card, player) {
				if (["trick", "equip"].includes(get.type(card, "trick"))) return false;
			},
			cardUsable: function (card, player, num) {
				if (card.name == "sha") {
					return num + player.countMark("neifa_basic");
				}
			},
		},
		trigger: { player: "useCard2" },
		sourceSkill: "neifa",
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			return game.hasPlayer(function (current) {
				return !event.targets.includes(current) && player.canUse(event.card, current);
			});
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("neifa"), "为" + get.translation(trigger.card) + "额外指定一个目标", function (card, player, target) {
					return !_status.event.sourcex.includes(target) && player.canUse(_status.event.card, target);
				})
				.set("sourcex", trigger.targets)
				.set("ai", function (target) {
					var player = _status.event.player;
					return get.effect(target, _status.event.card, player, player);
				})
				.set("card", trigger.card);
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.targets = result.targets;
			} else {
				event.finish();
			}
			"step 2";
			player.logSkill("neifa", event.targets);
			trigger.targets.addArray(event.targets);
		},
	},
	neifa_nobasic: {
		trigger: { player: "useCard2" },
		direct: true,
		mark: true,
		marktext: "伐",
		onremove: true,
		mod: {
			cardEnabled: function (card, player) {
				if (get.type(card) == "basic") return false;
			},
			cardSavable: function (card, player) {
				if (get.type(card) == "basic") return false;
			},
		},
		intro: {
			name: "内伐 - 非基本牌",
			content: "本回合内不能使用基本牌，使用普通锦囊牌选择目标时可以增加或减少一个目标，且本回合的出牌阶段内前两次使用装备牌时摸#张牌。",
		},
		sourceSkill: "neifa",
		filter: function (event, player) {
			if (get.type(event.card) != "trick") return false;
			if (event.targets && event.targets.length > 0) return true;
			var info = get.info(event.card);
			if (info.allowMultiple == false) return false;
			if (event.targets && !info.multitarget) {
				if (
					game.hasPlayer(function (current) {
						return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
					})
				) {
					return true;
				}
			}
			return false;
		},
		content: function () {
			"step 0";
			var prompt2 = "为" + get.translation(trigger.card) + "增加或减少一个目标";
			player
				.chooseTarget(get.prompt("neifa"), function (card, player, target) {
					var player = _status.event.player;
					if (_status.event.targets.includes(target)) return true;
					return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
				})
				.set("prompt2", prompt2)
				.set("ai", function (target) {
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					return get.effect(target, trigger.card, player, player) * (_status.event.targets.includes(target) ? -1 : 1);
				})
				.set("targets", trigger.targets)
				.set("card", trigger.card);
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.targets = result.targets;
			} else {
				event.finish();
			}
			"step 2";
			if (event.targets) {
				player.logSkill("neifa", event.targets);
				if (trigger.targets.includes(event.targets[0])) trigger.targets.removeArray(event.targets);
				else trigger.targets.addArray(event.targets);
			}
		},
		group: "neifa_use",
	},
	neifa_use: {
		audio: "neifa",
		usable: 2,
		trigger: { player: "useCard" },
		forced: true,
		sourceSkill: "neifa",
		filter: function (event, player) {
			return get.type(event.card) == "equip" && player.countMark("neifa_nobasic") > 0;
		},
		content: function () {
			player.draw(player.countMark("neifa_nobasic"));
		},
		ai: {
			reverseOrder: true,
			skillTagFilter(player) {
				if (player.storage.counttrigger && player.storage.counttrigger.neifa_use >= 2) return false;
			},
			effect: {
				player_use(card, player, target) {
					if (player.countSkill("neifa_use") < 2 && get.type(card) == "equip") return [1, player.countMark("neifa_nobasic")];
				},
			},
		},
	},
	//许靖
	yuxu: {
		audio: 2,
		trigger: { player: "useCardAfter" },
		filter: function (event, player) {
			var evt = event.getParent("phaseUse");
			if (!evt || evt.player != player) return false;
			return true;
		},
		direct: true,
		content: function () {
			"step 0";
			var draw = !player.hasMark("yuxu_used");
			if (draw) player.chooseBool(get.prompt2("yuxu")).set("ai", () => 1);
			else event.goto(2);
			"step 1";
			if (result.bool) {
				player.logSkill("yuxu");
				player.draw();
				player.addMark("yuxu_used", 1, false);
				player.addTempSkill("yuxu_used", "phaseUseAfter");
			}
			event.finish();
			"step 2";
			player.logSkill("yuxu");
			player.removeMark("yuxu_used", player.countMark("yuxu_used"), false);
			player.chooseToDiscard("he", true);
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
		},
	},
	xjshijian: {
		audio: 2,
		trigger: { global: "useCardAfter" },
		direct: true,
		filter: function (event, player) {
			if (event.player == player) return false;
			var evt = event.getParent("phaseUse");
			if (!evt || evt.player != event.player) return false;
			return (
				event.player
					.getHistory("useCard", function (evtt) {
						return evtt.getParent("phaseUse") == evt;
					})
					.indexOf(event) == 1 && player.countCards("he") > 0
			);
		},
		content: function () {
			"step 0";
			var next = player.chooseToDiscard("he", get.prompt("xjshijian", trigger.player), "弃置一张牌并令其获得技能〖誉虚〗至回合结束");
			next.set("logSkill", ["xjshijian", trigger.player]);
			next.set("check", get.attitude(player, trigger.player) > 0 && trigger.player.countCards("h") > 2);
			next.ai = function (card) {
				if (_status.event.check) return 5 - get.value(card);
				return -1;
			};
			"step 1";
			if (result.bool) trigger.player.addTempSkills("yuxu");
		},
		ai: {
			expose: 0.25,
		},
	},
	//新1v1
	yanhuo: {
		audio: 2,
		trigger: { player: "die" },
		forceDie: true,
		filter: function (event, player) {
			return player.countCards("he") > 0;
		},
		direct: true,
		skillAnimation: true,
		animationColor: "thunder",
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("yanhuo"), function (card, player, target) {
					return target != player && target.countDiscardableCards(player, "he") > 0;
				})
				.set("forceDie", true).ai = function (target) {
				return -target.countCards("he") * get.attitude(player, target);
			};
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("yanhuo", target);
				event.count = player.countCards("he");
			} else event.finish();
			"step 2";
			if (target.countDiscardableCards(player, "he")) {
				player.line(target);
				player.discardPlayerCard(target, "he", true).set("forceDie", true);
				event.count--;
				if (event.count) event.redo();
			}
		},
	},
	mouzhu: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("h") > 0;
		},
		content: function () {
			"step 0";
			target.chooseCard("h", "交给" + get.translation(player) + "一张手牌", true);
			"step 1";
			if (result.bool) target.give(result.cards, player);
			"step 2";
			if (player.countCards("h") <= target.countCards("h")) {
				event.finish();
				return;
			}
			var list = [];
			if (target.canUse("sha", player, false)) list.push("sha");
			if (target.canUse("juedou", player, false)) list.push("juedou");
			if (!list.length) event.finish();
			else if (list.length == 1) event._result = { control: list[0] };
			else
				target.chooseControl(list).set("prompt", "对" + get.translation(player) + "使用一张【杀】或【决斗】。").ai = function () {
					return get.effect(player, { name: "sha" }, target, target) >= get.effect(player, { name: "juedou" }, target, target) ? "sha" : "juedou";
				};
			"step 3";
			target.useCard({ name: result.control, isCard: true }, player, "noai");
		},
		ai: {
			order: 7,
			result: {
				target: -1.2,
				player: function (player, target) {
					if (target.countCards("h") - player.countCards("h") > 1) return 1;
					if (get.damageEffect(target, player, player, player) > 0) return 1;
					if (player.hp > 3 || (player.countCards("h", "sha") && player.countCards("h", "shan"))) return 0;
					if (player.hp > 2) return -1.1;
					return -2;
				},
			},
		},
	},
	niluan: {
		audio: 2,
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return (
				event.player != player &&
				(event.player.hp > player.hp ||
					event.player.getHistory("useCard", function (card) {
						return card.card.name == "sha";
					}).length > 0)
			);
		},
		direct: true,
		content: function () {
			var next = player.chooseToUse();
			next.logSkill = "niluan";
			next.set("openskilldialog", get.prompt2("niluan"));
			next.set("norestore", true);
			next.set("_backupevent", "niluanx");
			next.set("custom", {
				add: {},
				replace: { window: function () {} },
			});
			next.backup("niluanx");
		},
	},
	niluanx: {
		viewAs: { name: "sha" },
		filterCard: { color: "black" },
		position: "hes",
		selectCard: 1,
		sourceSkill: "niluan",
		check: function (card) {
			return 5 - get.value(card);
		},
	},
	cuorui: {
		audio: 2,
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		filter: function (event, player) {
			return player.maxHp > 0 && !get.is.single() && (event.name != "phase" || game.phaseNumber == 0);
		},
		content: function () {
			player.draw(Math.min(5, player.maxHp), false);
		},
		group: "cuorui_nojudge",
		subSkill: {
			nojudge: {
				trigger: {
					player: "phaseJudgeBefore",
				},
				forced: true,
				audio: "cuorui",
				filter: function (event, player) {
					return !player.storage.cuorui && (get.is.single() || player.countCards("j"));
				},
				content: function () {
					player.storage.cuorui = true;
					trigger.cancel();
					game.log(player, "跳过了", "#g判定阶段");
				},
			},
		},
	},
	liewei: {
		audio: 2,
		trigger: { source: "dieAfter" },
		frequent: true,
		content: function () {
			player.draw(3);
		},
	},
	//蒋干
	weicheng: {
		audio: 2,
		trigger: {
			global: "gainAfter",
			player: "loseAsyncAfter",
		},
		//forced:true,
		frequent: true,
		filter: function (event, player) {
			if (player.getHp() <= player.countCards("h")) return false;
			if (event.name == "loseAsync") {
				if (event.type != "gain") return false;
				var cards = event.getl(player).hs;
				return game.hasPlayer(function (current) {
					if (current == player) return false;
					var cardsx = event.getg(current);
					for (var i of cardsx) {
						if (cards.includes(i)) return true;
					}
					return false;
				});
			}
			if (event.player == player) return false;
			var evt = event.getl(player);
			return evt && evt.hs && evt.hs.length > 0;
		},
		preHidden: true,
		content: function () {
			player.draw();
		},
	},
	daoshu: {
		audio: 2,
		enable: "phaseUse",
		filterTarget: function (c, p, t) {
			return t != p && t.countGainableCards(p, "h") > 0;
		},
		filter: function (e, p) {
			return !p.hasSkill("daoshu_used");
		},
		content: function () {
			"step 0";
			player
				.chooseControl(lib.suit)
				.set("prompt", "请选择一个花色")
				.set("ai", () => get.event().chosen)
				.set(
					"chosen",
					(function () {
						let suits = {},
							msuit,
							mcount = 0;
						target.getKnownCards(player).forEach(i => {
							let suit = get.suit(i);
							if (suits[suit]) suits[suit]++;
							else suits[suit] = 1;
						});
						for (let i in suits) {
							if (suits[i] > mcount && lib.suit.includes(i)) {
								msuit = i;
								mcount = suits[i];
							}
						}
						if (msuit) return msuit;
						return lib.suit.randomGet();
					})()
				);
			"step 1";
			event.suit = result.control;
			player.popup(event.suit + 2);
			game.log(player, "选择了", event.suit + 2);
			player.gainPlayerCard(target, true, "h", "visibleMove");
			"step 2";
			if (result.bool) {
				var suit2 = get.suit(result.cards[0]);
				if (suit2 == event.suit) {
					target.damage();
					event.finish();
				} else {
					player.addTempSkill("daoshu_used", "phaseUseEnd");
					if (
						player.countCards("h", function (card) {
							return get.suit(card) != suit2;
						}) == 0
					) {
						player.showHandcards();
						event.finish();
					} else
						player
							.chooseCard(
								"h",
								true,
								function (card) {
									return get.suit(card) != _status.event.suit2;
								},
								"交给" + get.translation(target) + "一张不为" + get.translation(suit2) + "花色的牌"
							)
							.set("suit2", suit2);
				}
			} else event.finish();
			"step 3";
			player.give(result.cards, target, true);
		},
		ai: {
			order: 1,
			result: {
				target: -1,
			},
		},
		subSkill: {
			used: { charlotte: true },
		},
	},
	//统率三军诸葛瑾和文聘
	zhenwei_three: {
		global: "zhenwei_three_others",
		subSkill: {
			others: {
				mod: {
					globalTo: function (from, to, distance) {
						if (
							from.side != to.side &&
							game.hasPlayer(function (current) {
								return current != to && current.side == to.side && current.hasSkill("zhenwei_three");
							})
						)
							return distance + 1;
					},
				},
				sub: true,
			},
		},
	},
	huanshi_three: {
		audio: "huanshi",
		trigger: {
			global: "judge",
		},
		filter: function (event, player) {
			return player.countCards("hes") > 0 && player.side == event.player.side;
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseCard(get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定为" + get.translation(trigger.player.judging[0]) + "，" + get.prompt("huanshi_three"), "hes", function (card) {
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
						return result - get.value(card) / 2;
					} else {
						return -result - get.value(card) / 2;
					}
				})
				.set("judging", trigger.player.judging[0]);
			"step 1";
			if (result.bool) {
				player.respond(result.cards, "highlight", "huanshi_three", "noOrdering");
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				if (trigger.player.judging[0].clone) {
					trigger.player.judging[0].clone.classList.remove("thrownhighlight");
					game.broadcast(function (card) {
						if (card.clone) {
							card.clone.classList.remove("thrownhighlight");
						}
					}, trigger.player.judging[0]);
					game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
				}
				game.cardsDiscard(trigger.player.judging[0]);
				trigger.player.judging[0] = result.cards[0];
				trigger.orderingCards.addArray(result.cards);
				game.log(trigger.player, "的判定牌改为", result.cards[0]);
				game.delay(2);
			}
		},
		ai: {
			rejudge: true,
			tag: {
				rejudge: 1,
			},
		},
	},
	//变权移植
	wanwei: {
		trigger: { target: ["rewriteGainResult", "rewriteDiscardResult"] },
		direct: true,
		preHidden: true,
		filter: function (event, player) {
			return event.player != player;
		},
		audio: 2,
		content: function () {
			"step 0";
			var prompt = "即将失去" + get.translation(trigger.result.cards) + "，是否发动【挽危】？";
			var next = player.choosePlayerCard(player, prompt, trigger.position);
			next.set("ai", function (button) {
				return 20 - get.value(button.link);
			});
			next.filterButton = trigger.filterButton;
			next.selectButton = trigger.result.cards.length;
			next.setHiddenSkill("wanwei");
			"step 1";
			if (result.bool) {
				player.logSkill("wanwei");
				trigger.result.cards = result.links.slice(0);
				trigger.result.links = result.links.slice(0);
				trigger.cards = result.links.slice(0);
				trigger.untrigger();
			}
		},
	},
	gzjili: {
		mod: {
			aiOrder: function (player, card, num) {
				if (player.isPhaseUsing() && get.subtype(card) == "equip1" && !get.cardtag(card, "gifts")) {
					var range0 = player.getAttackRange();
					var range = 0;
					var info = get.info(card);
					if (info && info.distance && info.distance.attackFrom) {
						range -= info.distance.attackFrom;
					}
					if (player.getEquip(1)) {
						var num = 0;
						var info = get.info(player.getEquip(1));
						if (info && info.distance && info.distance.attackFrom) {
							num -= info.distance.attackFrom;
						}
						range0 -= num;
					}
					range0 += range;
					if (
						range0 == player.getHistory("useCard").length + player.getHistory("respond").length + 2 &&
						player.countCards("h", function (cardx) {
							return get.subtype(cardx) != "equip1" && player.getUseValue(cardx) > 0;
						})
					)
						return num + 10;
				}
			},
		},
		trigger: { player: ["useCard", "respond"] },
		frequent: true,
		locked: false,
		preHidden: true,
		onremove(player) {
			player.removeTip("gzjili");
		},
		filter: function (event, player) {
			let count = player.getHistory("useCard").length + player.getHistory("respond").length;
			player.addTip("gzjili", "蒺藜 " + count, true);
			return count == player.getAttackRange();
		},
		audio: 2,
		content: function () {
			player.draw(player.getHistory("useCard").length + player.getHistory("respond").length);
		},
		ai: {
			threaten: 1.8,
			effect: {
				target_use(card, player, target, current) {
					let used = target.getHistory("useCard").length + target.getHistory("respond").length;
					if (get.subtype(card) == "equip1" && !get.cardtag(card, "gifts")) {
						if (player != target || !player.isPhaseUsing()) return;
						let range0 = player.getAttackRange();
						let range = 0;
						let info = get.info(card);
						if (info && info.distance && info.distance.attackFrom) {
							range -= info.distance.attackFrom;
						}
						if (player.getEquip(1)) {
							let num = 0;
							let info = get.info(player.getEquip(1));
							if (info && info.distance && info.distance.attackFrom) {
								num -= info.distance.attackFrom;
							}
							range0 -= num;
						}
						range0 += range;
						let delta = range0 - used;
						if (delta < 0) return;
						let num = player.countCards("h", function (card) {
							return (get.cardtag(card, "gifts") || get.subtype(card) != "equip1") && player.getUseValue(card) > 0;
						});
						if (delta == 2 && num > 0) return [1, 3];
						if (num >= delta) return "zeroplayertarget";
					} else if (get.tag(card, "respondShan") > 0) {
						if (current < 0 && used == target.getAttackRange() - 1) {
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
							} else if (!target.mayHaveShan(player)) return 0.9;
							return [1, (used + 1) / 2];
						}
					} else if (get.tag(card, "respondSha") > 0) {
						if (current < 0 && used == target.getAttackRange() - 1 && target.mayHaveSha(player)) return [1, (used + 1) / 2];
					}
				},
			},
		},
	},
	//新服曹笨
	xinshanjia: {
		group: ["xinshanjia_count"],
		locked: false,
		mod: {
			aiValue: function (player, card, num) {
				if ((player.storage.xinshanjia || 0) < 3 && get.type(card) == "equip" && !get.cardtag(card, "gifts")) {
					return num / player.hp;
				}
			},
		},
		audio: "shanjia",
		trigger: {
			player: "phaseUseBegin",
		},
		intro: {
			content: "本局游戏内已失去过#张装备牌",
		},
		frequent: true,
		sync: function (player) {
			var history = player.actionHistory;
			var num = 0;
			for (var i = 0; i < history.length; i++) {
				for (var j = 0; j < history[i].lose.length; j++) {
					if (history[i].lose[j].parent.name == "useCard") continue;
					num += history[i].lose[j].cards2.filter(function (card) {
						return get.type(card) == "equip";
					}).length;
				}
			}
			player.storage.xinshanjia = num;
			if (num > 0) player.markSkill("xinshanjia");
		},
		content: function () {
			"step 0";
			player.draw(3);
			"step 1";
			lib.skill.xinshanjia.sync(player);
			var num = 3 - player.storage.xinshanjia;
			if (num > 0) {
				player.chooseToDiscard("he", true, num).ai = get.disvalue;
			}
			"step 2";
			var bool1 = true,
				bool2 = true;
			if (result.cards) {
				var cards = result.cards;
				for (var i = 0; i < result.cards.length; i++) {
					var type = get.type(result.cards[i], "trick", result.cards[i].original == "h" ? player : false);
					if (type == "basic") bool1 = false;
					if (type == "trick") bool2 = false;
				}
			}
			if (bool1) player.addTempSkill("xinshanjia_sha", "phaseUseAfter");
			if (bool2) player.addTempSkill("xinshanjia_nodis", "phaseUseAfter");
			if (bool1 && bool2) {
				player.chooseUseTarget({ name: "sha" }, "是否视为使用一张【杀】？", false);
			}
		},
		ai: {
			threaten: 3,
			noe: true,
			reverseOrder: true,
			skillTagFilter: function (player) {
				if (player.storage.xinshanjia > 2) return false;
			},
			effect: {
				target: function (card, player, target) {
					if (player.storage.xinshanjia < 3 && get.type(card) == "equip" && !get.cardtag(card, "gifts")) return [1, 3];
				},
			},
		},
		subSkill: {
			count: {
				forced: true,
				silent: true,
				popup: false,
				trigger: {
					player: "loseEnd",
				},
				filter: function (event, player) {
					return event.cards2 && event.cards2.length > 0;
				},
				content: function () {
					lib.skill.xinshanjia.sync(player);
				},
			},
			sha: {
				mark: true,
				charlotte: true,
				intro: { content: "使用【杀】的次数上限+1" },
				mod: {
					cardUsable: function (card, player, num) {
						if (card.name == "sha") return num + 1;
					},
				},
			},
			nodis: {
				mark: true,
				charlotte: true,
				intro: { content: "使用牌无距离限制" },
				mod: {
					targetInRange: () => true,
				},
			},
		},
	},
	//OL马超
	ol_shichou: {
		audio: 2,
		trigger: { player: "useCard2" },
		filter: function (event, player) {
			return event.card && event.card.name == "sha";
		},
		direct: true,
		content: function () {
			"step 0";
			var num = player.getDamagedHp() + 1;
			player
				.chooseTarget("是否发动【誓仇】？", "为" + get.translation(trigger.card) + "添加至多" + get.cnNumber(num) + "个目标", [1, num], function (card, player, target) {
					var evt = _status.event.getTrigger();
					return target != player && !evt.targets.includes(target) && lib.filter.targetEnabled2(evt.card, player, target) && lib.filter.targetInRange(evt.card, player, target);
				})
				.set("ai", function (target) {
					return get.effect(target, _status.event.getTrigger().card, _status.event.player);
				});
			"step 1";
			if (result.bool && result.targets && result.targets.length) {
				var targets = result.targets;
				player.logSkill("ol_shichou", targets);
				player.line(targets, trigger.card.nature);
				trigger.targets.addArray(targets);
			}
		},
	},
	dc_olshichou: {
		audio: "ol_shichou",
		trigger: { player: "useCard2" },
		filter: function (event, player) {
			return (
				event.card &&
				event.card.name == "sha" &&
				player.isDamaged() &&
				game.hasPlayer(function (current) {
					return !event.targets.includes(current) && lib.filter.filterTarget(event.card, player, current);
				})
			);
		},
		direct: true,
		content: function () {
			"step 0";
			var num = Math.min(
				player.getDamagedHp(),
				game.countPlayer(function (current) {
					return !trigger.targets.includes(current) && lib.filter.filterTarget(trigger.card, player, current);
				})
			);
			player.chooseTarget("是否发动【誓仇】，令至多" + get.cnNumber(num) + "名其他角色也成为此【杀】的目标？", [1, num], function (card, player, target) {
				var evt = _status.event.getTrigger();
				return target != player && !evt.targets.includes(target) && lib.filter.targetEnabled2(evt.card, player, target) && lib.filter.targetInRange(evt.card, player, target);
			}).ai = function (target) {
				return get.effect(target, { name: "sha" }, _status.event.player);
			};
			"step 1";
			if (result.bool && result.targets && result.targets.length) {
				var targets = result.targets;
				player.logSkill("dc_olshichou", targets);
				player.line(targets, trigger.card.nature);
				trigger.targets.addArray(targets);
				trigger.ol_shichou = true;
				player.addTempSkill("ol_shichou2");
			}
		},
	},
	ol_shichou2: {
		charlotte: true,
		trigger: { player: "useCardAfter" },
		sourceSkill: "ol_shichou",
		filter: function (event, player) {
			return (
				event.ol_shichou &&
				!player.getHistory("sourceDamage", function (evt) {
					return evt.card == event.card;
				}).length &&
				event.cards.filterInD().length > 0
			);
		},
		forced: true,
		popup: false,
		content: function () {
			player.gain(trigger.cards.filterInD(), "gain2");
		},
	},
	//新大小乔
	new_xingwu: {
		audio: "xingwu",
		trigger: {
			player: "phaseDiscardBegin",
		},
		direct: true,
		intro: {
			content: "expansion",
			markcount: "expansion",
			onunmark: function (storage, player) {
				player.removeAdditionalSkill("new_luoyan");
			},
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		filter: function (event, player) {
			return player.countCards("he") > 0;
		},
		content: function () {
			"step 0";
			player
				.chooseCard("he", get.prompt("new_xingwu"), "将一张牌置于武将牌上作为“舞”")
				.set("ai", function (card) {
					if (_status.event.goon) return 20 - get.value(card);
					return 7 - get.value(card);
				})
				.set("goon", player.needsToDiscard() || player.getExpansions("new_xingwu").length > 1);
			"step 1";
			if (result.bool) {
				player.logSkill("new_xingwu");
				var cards = result.cards;
				player.addToExpansion(cards, player, "give").gaintag.add("new_xingwu");
				if (player.hasSkill("new_luoyan")) player.addAdditionalSkill("new_luoyan", ["oltianxiang", "liuli"]);
			} else event.finish();
			"step 2";
			game.delayx();
			var choices = [];
			event.addIndex = 0;
			if (player.getExpansions("new_xingwu").length > 2) {
				choices.push("将三张“星舞”牌置入弃牌堆");
			} else event.addIndex++;
			if (
				player.countCards("h", function (card) {
					return lib.filter.cardDiscardable(card, player, "new_xingwu");
				}) > 1
			)
				choices.push("弃置两张手牌并将武将牌翻面");
			if (choices.length) {
				player
					.chooseControl("cancel2")
					.set("prompt", "星舞：是否发射核弹？")
					.set("choiceList", choices)
					.set("ai", function () {
						var player = _status.event.player;
						if (player.getExpansions("new_xingwu").length > 2) return 0;
						if (player.isTurnedOver() || player.identity == "fan" || player.getEnemies().length == 1) return 0;
						return "cancel2";
					});
			} else event.finish();
			"step 3";
			if (result.control != "cancel2") {
				var num = result.index + event.addIndex;
				if (num == 1) {
					event.goto(5);
					return;
				}
				if (player.getExpansions("new_xingwu").length > 3) player.chooseButton(["请选择要移去的“星舞”牌", player.getExpansions("new_xingwu")], 3, true);
				else
					event._result = {
						bool: true,
						links: player.getExpansions("new_xingwu").slice(0),
					};
			} else event.finish();
			"step 4";
			if (result.bool && result.links && result.links.length == 3) {
				var cards = result.links;
				player.loseToDiscardpile(cards);
				event.goto(6);
			} else event.finish();
			"step 5";
			player.chooseToDiscard(true, "h", 2);
			player.turnOver();
			"step 6";
			player.chooseTarget("请选择【星舞】的目标", "弃置其装备区内的所有牌。然后对其造成2点伤害（目标为女性角色则改为1点）", true, lib.filter.notMe).set("ai", function (target) {
				return (
					-get.attitude(_status.event.player, target) *
					Math.sqrt(
						4 +
							target.countCards("e", function (card) {
								return get.value(card, target) > 0;
							})
					) *
					(target.hasSex("female") ? 1 : 2)
				);
			});
			"step 7";
			if (result.bool && result.targets && result.targets.length) {
				var target = result.targets[0];
				player.line(target, "green");
				var num = target.countCards("e");
				if (num) player.discardPlayerCard(target, "e", num, true);
				target.damage(target.hasSex("female") ? 1 : 2);
			}
		},
		ai: {
			threaten: 1.5,
		},
	},
	new_luoyan: {
		init: function (player) {
			if (player.getExpansions("new_xingwu").length) player.addAdditionalSkill("new_luoyan", ["oltianxiang", "liuli"]);
		},
		onremove: function (player) {
			player.removeAdditionalSkill("new_luoyan");
		},
		derivation: ["oltianxiang", "liuli"],
		locked: true,
		ai: {
			combo: "new_xingwu",
		},
	},
	//新孙鲁育
	new_meibu: {
		audio: "meibu",
		trigger: {
			global: "phaseUseBegin",
		},
		filter: function (event, player) {
			return event.player != player && event.player.isIn() && player.countCards("he") > 0 && event.player.inRange(player);
		},
		direct: true,
		derivation: ["new_zhixi"],
		checkx: function (event, player) {
			if (get.attitude(player, event.player) >= 0) return false;
			var e2 = player.getEquip(2);
			if (e2) {
				if (e2.name == "tengjia" || e2.name == "rewrite_tengjia") return true;
				if (e2.name == "bagua" || e2.name == "rewrite_bagua") return true;
			}
			return event.player.countCards("h") > event.player.hp;
		},
		content: function () {
			"step 0";
			var check = lib.skill.new_meibu.checkx(trigger, player);
			player
				.chooseToDiscard(get.prompt2("new_meibu", trigger.player), "he")
				.set("ai", function (card) {
					if (_status.event.check) return 6 - get.value(card);
					return 0;
				})
				.set("check", check)
				.set("logSkill", ["new_meibu", trigger.player]);
			"step 1";
			if (result.bool) {
				var target = trigger.player;
				var card = result.cards[0];
				player.line(target, "green");
				target.addTempSkills("new_zhixi", "phaseUseAfter");
				if (card.name != "sha" && !(get.type(card) == "trick" && get.color(card) == "black")) {
					target.addTempSkill("new_meibu_range", "phaseUseAfter");
					target.markAuto("new_meibu_range", player);
				}
				target.markSkillCharacter("new_meibu", player, "魅步", "锁定技，出牌阶段，你至多可使用X张牌，你使用了锦囊牌后不能再使用牌（X为你的体力值）。");
			}
		},
		ai: {
			expose: 0.2,
		},
		subSkill: {
			range: {
				onremove: true,
				charlotte: true,
				mod: {
					globalFrom: function (from, to, num) {
						if (from.getStorage("new_meibu_range").includes(to)) {
							return -Infinity;
						}
					},
				},
				sub: true,
			},
		},
	},
	new_mumu: {
		audio: "mumu",
		trigger: {
			player: "phaseUseBegin",
		},
		filter: function (event, player) {
			return game.hasPlayer(current => {
				if (current == player) return current.getEquips(2).length > 0;
				return current.countCards("e") > 0;
			});
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("new_mumu"), "弃置一名其他角色装备区内的一张牌，或者获得一名角色装备区内的防具牌", function (card, player, target) {
					if (target == player) return target.getEquips(2).length > 0;
					return target.countCards("e") > 0;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (target.getEquip(2) && player.hasEmptySlot(2)) {
						return -2 * att;
					}
					return -att;
				});
			"step 1";
			if (result.bool && result.targets && result.targets.length) {
				event.target = result.targets[0];
				player.logSkill("new_mumu", event.target);
				player.line(event.target, "green");
				var e = event.target.getEquips(2);
				event.e = e;
				if (target == player) event.choice = "获得一张防具牌";
				else if (e.length > 0) {
					player.chooseControl("弃置一张装备牌", "获得一张防具牌").set("ai", function () {
						if (_status.event.player.getEquips(2).length > 0) {
							return "弃置一张装备牌";
						}
						return "获得一张防具牌";
					});
				} else {
					event.choice = "弃置一张装备牌";
				}
			} else event.finish();
			"step 2";
			var choice = event.choice || result.control;
			if (choice == "弃置一张装备牌") {
				player.discardPlayerCard(event.target, "e", true);
			} else {
				if (event.e) {
					player.gain(event.e, event.target, "give", "bySelf");
					player.addTempSkill("new_mumu_notsha");
				}
			}
		},
		subSkill: {
			notsha: {
				mark: true,
				intro: {
					content: "不能使用【杀】",
				},
				charlotte: true,
				mod: {
					cardEnabled: function (card) {
						if (card.name == "sha") return false;
					},
				},
			},
		},
	},
	new_zhixi: {
		mod: {
			cardEnabled: function (card, player) {
				if (player.storage.new_zhixi2 || player.countMark("new_zhixi") >= player.hp) return false;
			},
			cardUsable: function (card, player) {
				if (player.storage.new_zhixi2 || player.countMark("new_zhixi") >= player.hp) return false;
			},
			cardSavable: function (card, player) {
				if (player.storage.new_zhixi2 || player.countMark("new_zhixi") >= player.hp) return false;
			},
		},
		trigger: {
			player: "useCard1",
		},
		forced: true,
		popup: false,
		firstDo: true,
		init: function (player, skill) {
			player.storage[skill] = 0;
			var evt = _status.event.getParent("phaseUse");
			if (evt && evt.player == player) {
				player.getHistory("useCard", function (evtx) {
					if (evtx.getParent("phaseUse") == evt) {
						player.storage[skill]++;
						if (get.type2(evtx.card) == "trick") player.storage.new_zhixi2 = true;
					}
				});
			}
		},
		onremove: function (player) {
			player.unmarkSkill("new_meibu");
			delete player.storage.new_zhixi;
			delete player.storage.new_zhixi2;
		},
		content: function () {
			player.addMark("new_zhixi", 1, false);
			if (get.type2(trigger.card) == "trick") player.storage.new_zhixi2 = true;
		},
		ai: {
			presha: true,
			pretao: true,
			neg: true,
			nokeep: true,
		},
	},
	qingzhong: {
		audio: 2,
		trigger: { player: "phaseUseBegin" },
		check: function (event, player) {
			if (
				game.hasPlayer(function (current) {
					return current != player && current.isMinHandcard() && get.attitude(player, current) > 0;
				})
			) {
				return true;
			}
			if (player.countCards("h") <= 2) return true;
			// if(player.countCards('h')<=3&&!player.countCards('h','shan')) return true;
			//if(player.countCards('h',{type:'basic'})<=1) return true;
			return false;
		},
		content: function () {
			player.draw(2);
			player.addTempSkill("qingzhong_give");
		},
		subSkill: {
			give: {
				audio: "qingzhong",
				trigger: { player: "phaseUseEnd" },
				filter: function (event, player) {
					return !player.isMinHandcard(true);
				},
				forced: true,
				content: function () {
					"step 0";
					var list = game.filterPlayer(function (current) {
						return current.isMinHandcard();
					});
					if (list.length == 1) {
						if (list[0] != player) {
							player.line(list[0], "green");
							player.swapHandcards(list[0]);
						}
						event.finish();
					} else {
						player
							.chooseTarget(true, "清忠：选择一名手牌最少的角色与其交换手牌", function (card, player, target) {
								return target.isMinHandcard();
							})
							.set("ai", function (target) {
								return get.attitude(_status.event.player, target);
							});
					}
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						if (target != player) {
							player.line(target, "green");
							player.swapHandcards(target);
						}
					}
				},
			},
		},
	},
	weijing: {
		audio: 2,
		enable: "chooseToUse",
		filter: function (event, player) {
			if (event.type == "wuxie" || player.hasSkill("weijing_used")) return false;
			for (var name of ["sha", "shan"]) {
				if (event.filterCard({ name: name, isCard: true }, player, event)) return true;
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				var vcards = [];
				for (var name of ["sha", "shan"]) {
					var card = { name: name, isCard: true };
					if (event.filterCard(card, player, event)) vcards.push(["基本", "", name]);
				}
				var dialog = ui.create.dialog("卫境", [vcards, "vcard"], "hidden");
				dialog.direct = true;
				return dialog;
			},
			backup: function (links, player) {
				return {
					filterCard: () => false,
					selectCard: -1,
					viewAs: {
						name: links[0][2],
						isCard: true,
					},
					popname: true,
					precontent: function () {
						player.logSkill("weijing");
						player.addTempSkill("weijing_used", "roundStart");
					},
				};
			},
			prompt: function (links, player) {
				return "卫境：视为使用一张【" + get.translation(links[0][2]) + "】";
			},
		},
		ai: {
			order: function (item, player) {
				var player = _status.event.player;
				var event = _status.event;
				if (event.filterCard({ name: "sha" }, player, event)) {
					if (
						!player.hasShan() &&
						!game.hasPlayer(function (current) {
							return player.canUse("sha", current) && current.hp == 1 && get.effect(current, { name: "sha" }, player, player) > 0;
						})
					) {
						return 0;
					}
					return 2.95;
				} else {
					var player = _status.event.player;
					if (player.hasSkill("qingzhong_give")) return 2.95;
					return 3.15;
				}
			},
			respondSha: true,
			respondShan: true,
			skillTagFilter: function (player, tag, arg) {
				if (player.hasSkill("weijing_used")) return false;
				if (arg != "use") return false;
			},
			result: {
				player: 1,
			},
		},
		subSkill: {
			used: {
				mark: true,
				intro: {
					content: "本轮已发动",
				},
			},
		},
	},
	zishu: {
		audio: 2,
		locked: true,
		subSkill: {
			discard: {
				trigger: { global: "phaseEnd" },
				audio: "zishu",
				forced: true,
				filter: function (event, player) {
					if (_status.currentPhase != player) {
						var he = player.getCards("h");
						var bool = false;
						player.getHistory("gain", function (evt) {
							if (!bool && evt && evt.cards) {
								for (var i = 0; i < evt.cards.length; i++) {
									if (he.includes(evt.cards[i])) bool = true;
									break;
								}
							}
						});
						return bool;
					}
					return false;
				},
				content: function () {
					var he = player.getCards("h");
					var list = [];
					player.getHistory("gain", function (evt) {
						if (evt && evt.cards) {
							for (var i = 0; i < evt.cards.length; i++) {
								if (he.includes(evt.cards[i])) list.add(evt.cards[i]);
							}
						}
					});
					player.$throw(list, 1000);
					player.lose(list, ui.discardPile, "visible");
					game.log(player, "将", list, "置入弃牌堆");
				},
			},
			mark: {
				trigger: {
					player: "gainBegin",
					global: "phaseBeginStart",
				},
				silent: true,
				filter: function (event, player) {
					return event.name != "gain" || player != _status.currentPhase;
				},
				content: function () {
					if (trigger.name == "gain") trigger.gaintag.add("zishu");
					else player.removeGaintag("zishu");
				},
			},
			draw: {
				trigger: {
					player: "gainAfter",
					global: "loseAsyncAfter",
				},
				audio: "zishu",
				forced: true,
				filter: function (event, player) {
					if (_status.currentPhase != player || event.getg(player).length == 0) return false;
					return event.getParent(2).name != "zishu_draw";
				},
				content: function () {
					player.draw("nodelay");
				},
			},
		},
		ai: {
			threaten: 1.2,
			nogain: 1,
			skillTagFilter: function (player) {
				return player != _status.currentPhase;
			},
		},
		group: ["zishu_draw", "zishu_discard", "zishu_mark"],
	},
	xinyingyuan: {
		audio: "yingyuan",
		trigger: { player: "useCardAfter" },
		direct: true,
		filter: function (event, player) {
			if (_status.currentPhase != player) return false;
			var type = get.type(event.card, "trick");
			return (
				player.getHistory("custom", function (evt) {
					return evt.xinyingyuan_name == type;
				}).length == 0
			);
		},
		content: function () {
			"step 0";
			event.type = get.type(trigger.card, "trick");
			player
				.chooseTarget(get.prompt("xinyingyuan"), "令一名其他角色从牌堆中获得一张" + get.translation(event.type) + "牌", function (card, player, target) {
					return target != player;
				})
				.set("ai", function (target) {
					var att = get.attitude(_status.event.player, target);
					if (att < 3) return 0;
					if (target.hasJudge("lebu")) att /= 2;
					if (target.hasSkillTag("nogain")) att /= 10;
					return att / (1 + get.distance(player, target, "absolute"));
				});
			"step 1";
			if (result.bool) {
				player.logSkill("xinyingyuan", result.targets[0]);
				var card = get.cardPile2(function (cardx) {
					return get.type(cardx, "trick") == event.type;
				});
				if (card) result.targets[0].gain(card, "log", "gain2");
				player.getHistory("custom").push({ xinyingyuan_name: event.type });
			}
		},
	},
	yingyuan: {
		audio: 2,
		trigger: { player: "useCardAfter" },
		direct: true,
		filter: function (event, player) {
			if (_status.currentPhase != player) return false;
			if (
				player.getHistory("custom", function (evt) {
					return evt.yingyuan_name == event.card.name;
				}).length > 0
			)
				return false;
			return event.cards.filterInD().length > 0;
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("yingyuan"), "将" + get.translation(trigger.cards) + "交给一名其他角色", function (card, player, target) {
					return target != player;
				})
				.set("ai", function (target) {
					if (target.hasJudge("lebu")) return 0;
					let att = get.attitude(_status.event.player, target),
						name = _status.event.cards[0].name;
					if (att < 3) return 0;
					if (target.hasSkillTag("nogain")) att /= 10;
					if (name === "sha" && target.hasSha()) att /= 5;
					if (name === "wuxie" && target.needsToDiscard(_status.event.cards)) att /= 5;
					return att / (1 + get.distance(player, target, "absolute"));
				})
				.set("cards", trigger.cards);
			"step 1";
			if (result.bool) {
				player.logSkill("yingyuan", result.targets[0]);
				result.targets[0].gain(trigger.cards.filterInD(), "gain2");
				player.getHistory("custom").push({ yingyuan_name: trigger.card.name });
			}
		},
	},
	shuimeng: {
		audio: 2,
		trigger: { player: "phaseUseAfter" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("h");
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("shuimeng"), function (card, player, target) {
					return player.canCompare(target);
				})
				.set("ai", function (target) {
					if (!_status.event.goon) return 0;
					return -get.attitude(_status.event.player, target);
				})
				.set(
					"goon",
					player.needsToDiscard() ||
						player.hasCard(function (card) {
							var val = get.value(card);
							if (val < 0) return true;
							if (val <= 5) {
								return card.number >= 11;
							}
							if (val <= 6) {
								return card.number >= 12;
							}
							return false;
						})
				);
			"step 1";
			if (result.bool) {
				player.logSkill("shuimeng", result.targets);
				event.target = result.targets[0];
				player.chooseToCompare(event.target);
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				player.chooseUseTarget({ name: "wuzhong", isCard: true }, true);
			} else {
				event.target.useCard({ name: "guohe", isCard: true }, player);
			}
		},
	},
	qianya: {
		audio: 2,
		trigger: { target: "useCardToTargeted" },
		filter: function (event, player) {
			return get.type(event.card, "trick") == "trick" && player.countCards("h");
		},
		async cost(event, trigger, player) {
			let nh = player.countCards("h");
			event.result = await player
				.chooseCardTarget({
					filterCard: true,
					filterTarget: function (card, player, target) {
						return target != player;
					},
					selectCard: [1, nh],
					ai1: function (card) {
						var player = _status.event.player;
						var cardname = _status.event.cardname;
						if (_status.event.du) return -get.value(card, player, "raw");
						else if (_status.event.shuimeng) {
							if (cardname == "wuzhong") {
								if (
									player.needsToDiscard(2, (i, player) => {
										return !ui.selected.cards.includes(i) && !player.canIgnoreHandcard(i);
									})
								)
									return 10 - get.value(card, player, "raw");
							} else if (cardname == "guohe") {
								if (
									player.needsToDiscard(-1, (i, player) => {
										return !ui.selected.cards.includes(i) && !player.canIgnoreHandcard(i);
									})
								)
									return 10 - get.value(card, player, "raw");
							}
							return 0;
						} else if (cardname == "lebu") {
							if (
								player.needsToDiscard(1, (i, player) => {
									return !ui.selected.cards.includes(i) && !player.canIgnoreHandcard(i);
								})
							) {
								return 8 - get.value(card, player, "raw");
							} else {
								if (!ui.selected.cards.length) {
									return 6 - get.value(card, player, "raw");
								}
								return 0;
							}
						} else if (cardname == "shunshou") {
							if (_status.event.nh <= 2) return get.value(card, player, "raw");
						} else if (cardname == "huogong") {
							if (player.hp == 1) return get.value(card, player, "raw");
						}
						if (ui.selected.cards.length) return 0;
						return 7 - get.value(card, player, "raw");
					},
					ai2: function (target) {
						var att = get.attitude(_status.event.player, target);
						var nh2 = target.countCards("h");
						var num = Math.sqrt(1 + nh2);
						var cardname = _status.event.cardname;
						if (_status.event.du) return 0.5 - att;
						else if (_status.event.shuimeng) {
							return att / num;
						} else if (cardname == "lebu") {
							return att / num;
						} else if (cardname == "shunshou") {
							if (_status.event.nh <= 2) return att / num;
						} else if (cardname == "huogong") {
							if (_status.event.player.hp == 1) return att / num;
						}
						if (_status.event.nh > nh2 + 1) {
							return att / num;
						}
						return 0;
					},
					du: player.hasCard(function (card) {
						return get.value(card, player, "raw") < 0;
					}),
					shuimeng: (function () {
						if (trigger.card.name == "guohe") return trigger.getParent(2).name == "shuimeng";
						if (trigger.card.name == "wuzhong") return trigger.getParent(3).name == "shuimeng";
					})(),
					nh: nh,
					cardname: trigger.card.name,
					prompt: get.prompt2("qianya"),
				})
				.forResult();
		},
		async content(event, trigger, player) {
			player.give(event.cards, event.targets[0]);
		},
	},
	xianfu: {
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		locked: true,
		filter: function (event, player) {
			return game.hasPlayer(current => current != player) && (event.name != "phase" || game.phaseNumber == 0);
		},
		audio: 6,
		async cost(event, trigger, player) {
			const result = await player
				.chooseTarget("请选择【先辅】的目标", lib.translate.xianfu_info, true, function (card, player, target) {
					return target != player && (!player.storage.xianfu2 || !player.storage.xianfu2.includes(target));
				})
				.set("ai", function (target) {
					let att = get.attitude(_status.event.player, target);
					if (att > 0) return att + 1;
					if (att == 0) return Math.random();
					return att;
				})
				.set("animate", false)
				.forResult();
			event.result = {
				bool: true,
				cost_data: result.targets[0],
			};
		},
		logAudio: () => 2,
		async content(event, trigger, player) {
			let target = event.cost_data;
			if (!player.storage.xianfu2) player.storage.xianfu2 = [];
			player.storage.xianfu2.push(target);
			player.addSkill("xianfu2");

			const func = (player, target) => {
				if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
				target.storage.xianfu_mark.add(player);
				target.storage.xianfu_mark.sortBySeat();
				target.markSkill("xianfu_mark", null, null, true);
			};
			if (event.isMine()) func(player, target);
			else if (player.isOnline2()) player.send(func, player, target);
		},
	},
	xianfu_mark: {
		marktext: "辅",
		intro: {
			name: "先辅",
			content: "当你受到伤害后，$受到等量的伤害，当你回复体力后，$回复等量的体力",
		},
	},
	xianfu2: {
		audio: "xianfu",
		charlotte: true,
		trigger: { global: ["damageEnd", "recoverEnd"] },
		forced: true,
		sourceSkill: "xianfu",
		filter: function (event, player) {
			if (event.player.isDead() || !player.storage.xianfu2 || !player.storage.xianfu2.includes(event.player) || event.num <= 0) return false;
			if (event.name == "damage") return true;
			return player.isDamaged();
		},
		logAudio(event, player) {
			if (event.name == "damage") return ["xianfu5.mp3", "xianfu6.mp3"];
			return ["xianfu3.mp3", "xianfu4.mp3"];
		},
		logTarget: "player",
		content: function () {
			"step 0";
			var target = trigger.player;
			if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
			target.storage.xianfu_mark.add(player);
			target.storage.xianfu_mark.sortBySeat();
			target.markSkill("xianfu_mark");
			game.delayx();
			"step 1";
			player[trigger.name](trigger.num, "nosource");
		},
		onremove: function (player) {
			if (!player.storage.xianfu2) return;
			game.countPlayer(function (current) {
				if (player.storage.xianfu2.includes(current) && current.storage.xianfu_mark) {
					current.storage.xianfu_mark.remove(player);
					if (!current.storage.xianfu_mark.length) current.unmarkSkill("xianfu_mark");
					else current.markSkill("xianfu_mark");
				}
			});
			delete player.storage.xianfu2;
		},
		group: "xianfu3",
	},
	xianfu3: {
		trigger: { global: "dieBegin" },
		silent: true,
		sourceSkill: "xianfu",
		filter: function (event, player) {
			return event.player == player || (player.storage.xianfu2 && player.storage.xianfu2.includes(player));
		},
		content: function () {
			if (player == trigger.player) lib.skill.xianfu2.onremove(player);
			else player.storage.xianfu2.remove(event.player);
		},
	},
	chouce: {
		audio: 2,
		trigger: { player: "damageEnd" },
		content: function () {
			"step 0";
			event.num = trigger.num;
			"step 1";
			player.judge();
			"step 2";
			event.color = result.color;
			switch (event.color) {
				case "black":
					if (
						game.hasPlayer(function (current) {
							return current.countDiscardableCards(player, "hej") > 0;
						})
					)
						player
							.chooseTarget(
								"弃置一名角色区域内的一张牌",
								function (card, player, target) {
									return target.countDiscardableCards(player, "hej");
								},
								true
							)
							.set("ai", function (target) {
								var player = _status.event.player;
								var att = get.attitude(player, target);
								if (att < 0) {
									att = -Math.sqrt(-att);
								} else {
									att = Math.sqrt(att);
								}
								return att * lib.card.guohe.ai.result.target(player, target);
							});
					else event.finish();
					break;

				case "red":
					var next = player.chooseTarget("令一名角色摸一张牌");
					if (player.storage.xianfu2 && player.storage.xianfu2.length) {
						next.set("prompt2", "（若目标为" + get.translation(player.storage.xianfu2) + "则改为摸两张牌）");
					}
					next.set("ai", function (target) {
						var player = _status.event.player;
						var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards("h"));
						if (target.hasSkillTag("nogain")) att /= 10;
						if (player.storage.xianfu2 && player.storage.xianfu2.includes(target)) return att * 2;
						return att;
					});
					break;

				default:
					break;
			}
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "green");
				if (event.color == "black") {
					player.discardPlayerCard(target, "hej", true);
				} else {
					if (player.storage.xianfu2 && player.storage.xianfu2.includes(target)) {
						if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
						target.storage.xianfu_mark.add(player);
						target.storage.xianfu_mark.sortBySeat();
						target.markSkill("xianfu_mark");
						target.draw(2);
					} else {
						target.draw();
					}
				}
			}
			"step 4";
			if (--event.num > 0 && player.hasSkill("chouce")) {
				player.chooseBool(get.prompt2("chouce"));
			} else {
				event.finish();
			}
			"step 5";
			if (result.bool) {
				player.logSkill("chouce");
				event.goto(1);
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
						if (!target.hasFriend()) return;
						if (target.hp >= 4) return [1, get.tag(card, "damage") * 1.5];
						if (target.hp == 3) return [1, get.tag(card, "damage") * 1];
						if (target.hp == 2) return [1, get.tag(card, "damage") * 0.5];
					}
				},
			},
		},
	},
	fuqi: {
		audio: 2,
		forced: true,
		trigger: {
			player: "useCard",
		},
		filter: function (event, player) {
			return (
				event.card &&
				(get.type(event.card) == "trick" || (get.type(event.card) == "basic" && !["shan", "tao", "jiu", "du"].includes(event.card.name))) &&
				game.hasPlayer(function (current) {
					return current != player && get.distance(current, player) <= 1;
				})
			);
		},
		content: function () {
			trigger.directHit.addArray(
				game.filterPlayer(function (current) {
					return current != player && get.distance(current, player) <= 1;
				})
			);
		},
		ai: {
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				return get.distance(arg.target, player) <= 1;
			},
		},
	},
	wylianji: {
		enable: "phaseUse",
		audio: 2,
		usable: 1,
		filter: function (event, player) {
			return player.hasCard(lib.skill.wylianji.filterCard);
		},
		check: function (card) {
			if (card.name == "sha") return 1;
			else {
				if (get.tag(card, "damage")) {
					if (get.tag(card, "multineg")) return 5;
					return 2;
				}
			}
			return 0;
		},
		filterCard: function (card) {
			return get.name(card) == "sha" || (get.type(card, "trick") == "trick" && get.color(card) == "black" && !get.info(card).multitarget && get.info(card).enable);
		},
		filterTarget: function (card, player, target) {
			return (
				target != player &&
				!target.isMin() &&
				(player.canUse(card, target, false) ||
					game.hasPlayer(function (current) {
						return current != player && target.canUse(card, current);
					}))
			);
		},
		discard: false,
		lose: true,
		delay: false,
		content: function () {
			"step 0";
			player.showCards(get.translation(player) + "对" + get.translation(target) + "发动了【连计】", cards);
			"step 1";
			var equip1 = get.cardPile2(function (card) {
				return get.subtype(card) == "equip1";
			});
			if (!equip1) {
				player.popup("杯具");
				game.log("牌堆中无装备");
				event.finish();
				return;
			}
			if (equip1.name == "qinggang" && !lib.inpile.includes("qibaodao")) {
				equip1.remove();
				equip1 = game.createCard2("qibaodao", equip1.suit, equip1.number);
			}
			target.$draw(equip1);
			target.chooseUseTarget(true, equip1, "nothrow", "nopopup");
			game.delay();
			"step 2";
			game.updateRoundNumber();
			var card = cards[0];
			var bool1 = game.hasPlayer(function (current) {
				return current != player && target.canUse(card, current);
			});
			var bool2 = player.canUse(card, target, false);
			if (bool1 && bool2) {
				target
					.chooseControl(function () {
						return 0;
					})
					.set("choiceList", ["对除" + get.translation(player) + "以外的角色使用" + get.translation(cards) + "，并将装备区里的武器牌交给该牌的一个目标角色", "视为" + get.translation(player) + "对你使用" + get.translation(cards) + "，并将装备区内的武器牌交给" + get.translation(player)]);
			} else if (bool1) {
				event.directindex = 0;
			} else if (bool2) {
				event.directindex = 1;
			} else {
				event.finish();
			}
			"step 3";
			var card = cards[0];
			if (result && typeof event.directindex != "number") {
				event.directindex = result.index;
			}
			if (event.directindex == 1) {
				event.insert(lib.skill.wylianji.content_use, {
					player: player,
					target: target,
					card: card,
				});
			} else {
				event.insert(lib.skill.wylianji.content_give, {
					player: target,
					card: card,
					targets: game.filterPlayer(function (current) {
						return current != player;
					}),
				});
			}
		},
		content_use: function () {
			"step 0";
			player.useCard(card, target);
			"step 1";
			if (!get.owner(card)) {
				target.gain(card, "gain2");
			}
			"step 2";
			var equip1 = target.getEquips(1);
			if (equip1.length) {
				game.delay();
				target.give(equip1, player);
				target.line(player);
			}
		},
		content_give: function () {
			"step 0";
			var select = get.select(get.info(card).selectTarget);
			if (select[1] == -1) {
				for (var i = 0; i < targets.length; i++) {
					if (!player.canUse(card, targets[i])) {
						targets.splice(i--, 1);
					}
				}
				if (targets.length) {
					player.useCard(card, targets);
				}
				event.list = targets.slice(0);
				event.goto(2);
			} else {
				player
					.chooseTarget(select, "选择" + get.translation(card) + "的目标", true, function (cardx, player, target) {
						var card = _status.event.card;
						return _status.event.targets.includes(target) && player.canUse(card, target);
					})
					.set("ai", function (target) {
						var card = _status.event.card;
						var player = _status.event.player;
						return get.effect(target, card, player, player);
					})
					.set("targets", targets)
					.set("card", card);
			}
			"step 1";
			if (result.bool) {
				player.useCard(card, result.targets);
				event.list = result.targets.slice(0);
			}
			"step 2";
			var equip1 = player.getEquips(1);
			if (equip1.length) {
				for (var i = 0; i < event.list.length; i++) {
					if (event.list[i].isDead()) event.list.splice(i--, 1);
				}
				if (event.list.length > 1) {
					player
						.chooseTarget(true, "将" + get.translation(equip1) + "交给一名角色", function (card, player, target) {
							return _status.event.list.includes(target);
						})
						.set("ai", function (target) {
							return get.attitude(player, target);
						})
						.set("list", _status.event.list);
					event.equip1 = equip1;
				} else {
					if (event.list.length == 1) {
						player.give(equip1, event.list[0]);
						player.line(event.list);
					}
					event.finish();
				}
			} else {
				event.finish();
			}
			"step 3";
			if (result.bool && result.targets.length && event.equip1) {
				player.give(event.equip1, result.targets[0]);
				player.line(result.targets);
			}
		},
		ai: {
			order: 7,
			result: {
				target: function (player, target) {
					if (ui.selected.cards.length) {
						var card = ui.selected.cards[0];
						var bool = card.name != "sha";
						if (
							game.hasPlayer(function (current) {
								return target.canUse(card, current, bool) && get.effect(current, card, target, player) > 0;
							})
						) {
							var num = 1;
							if (target.getEquip(1)) {
								num = 0.6;
							}
							if (target.hasSkillTag("noe")) num *= 2;
							return num;
						}
					}
					return 0;
				},
			},
		},
	},
	moucheng: {
		audio: 2,
		derivation: ["jingong", "wy_meirenji", "wy_xiaolicangdao"],
		trigger: { global: "damageEnd" },
		forced: true,
		popup: false,
		filter: function (event, player) {
			return event.source != player && event.getParent(2).name == "useCard" && event.getParent(3).name == "wylianjiInserted";
		},
		init: function (player) {
			player.storage.moucheng = 0;
		},
		intro: {
			content: "已造成#点伤害",
		},
		unique: true,
		juexingji: true,
		content: function () {
			player.storage.moucheng += trigger.num;
			if (player.hasSkill("moucheng")) {
				player.markSkill("moucheng");
				player.syncStorage("moucheng");
			}
			if (player.storage.moucheng >= 3) {
				event.trigger("mouchengAwaken");
			}
		},
		group: "moucheng_awaken",
		subSkill: {
			awaken: {
				trigger: { player: "mouchengAwaken" },
				forced: true,
				skillAnimation: true,
				animationColor: "gray",
				content: function () {
					player.awakenSkill("moucheng");
					game.log(player, "失去了技能", "#g【连计】");
					player.changeSkills(["jingong"], ["wylianji"]);
				},
			},
		},
		ai: {
			combo: "wylianji",
		},
	},
	jingong: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return (
				event.xinjingong_list &&
				player.countCards("hes", function (card) {
					return card.name == "sha" || get.type(card) == "equip";
				})
			);
		},
		onChooseToUse: function (event) {
			if (!game.online) {
				var evt = event.getParent();
				if (evt.name != "phaseUse") return;
				if (!evt.xinjingong_list) {
					var list = get.inpile("trick").randomGets(2);
					if (Math.random() < 0.5) {
						list.push("wy_meirenji");
					} else {
						list.push("wy_xiaolicangdao");
					}
					evt.xinjingong_list = list;
				}
				if (!event.xinjingong_list) event.set("xinjingong_list", evt.xinjingong_list);
			}
		},
		chooseButton: {
			dialog: function (event, player) {
				var list = [];
				for (var i of event.xinjingong_list) list.push(["锦囊", "", i]);
				return ui.create.dialog("矜功", [list, "vcard"]);
			},
			filter: function (button, player) {
				return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
			},
			check: function (button) {
				return _status.event.player.getUseValue({ name: button.link[2] });
			},
			backup: function (links, player) {
				return {
					audio: "jingong",
					popname: true,
					position: "hes",
					viewAs: { name: links[0][2] },
					check: function (card) {
						return 6 - get.value(card);
					},
					filterCard: function (card) {
						return card.name == "sha" || get.type(card) == "equip";
					},
					precontent: function () {
						player.addTempSkill("jingong2");
					},
				};
			},
			prompt: function (links, player) {
				return "将一张【杀】或装备牌当做" + get.translation(links[0][2]) + "使用";
			},
		},
		ai: {
			order: 2,
			result: {
				player: function (player) {
					if ((player.hp <= 2 || player.needsToDiscard()) && !player.getStat("damage")) return 0;
					return 1;
				},
			},
		},
	},
	jingong2: {
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		sourceSkill: "jingong",
		filter: function (event, player) {
			return !player.getStat("damage");
		},
		content: function () {
			player.loseHp();
		},
	},
	jingong3: { charlotte: true },
	weikui: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("h");
		},
		content: function () {
			"step 0";
			player.loseHp();
			"step 1";
			if (target.countCards("h", "shan")) {
				player.viewHandcards(target);
				if (player.canUse({ name: "sha", isCard: true }, target, false)) player.useCard({ name: "sha", isCard: true }, target, false);
				player.storage.weikui2 = target;
				player.addTempSkill("weikui2");
			} else {
				player.discardPlayerCard(target, "visible", true, "h").set("ai", function (button) {
					return get.value(button.link, _status.event.target);
				});
			}
		},
		ai: {
			order: 8,
			result: {
				target: function (player, target) {
					if (player.hp <= 2) return 0;
					if (player.hp == 3) return target.hp <= 2 ? -1 : 0;
					return -1;
				},
			},
		},
	},
	weikui2: {
		onremove: true,
		mod: {
			globalFrom: function (from, to) {
				if (to == from.storage.weikui2) return -Infinity;
			},
		},
		mark: "character",
		intro: {
			content: "与$的距离视为1直到回合结束",
		},
	},
	lizhan: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		filter: function (event, player) {
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i].isDamaged()) {
					return true;
				}
			}
			return false;
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("lizhan"), "令任意名已受伤的角色各摸一张牌", [1, Infinity], function (card, player, target) {
					return target.isDamaged();
				})
				.set("ai", function (target) {
					return get.attitude(player, target);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("lizhan", result.targets);
				game.asyncDraw(result.targets);
			}
		},
		ai: {
			expose: 0.3,
			threaten: 1.3,
		},
	},
	xinfenyue: {
		enable: "phaseUse",
		audio: "fenyue",
		filter: function (event, player) {
			var num = game.players.length - player.getFriends(true).length;
			if ((player.getStat().skill.xinfenyue || 0) >= num) return false;
			return player.countCards("h") > 0;
		},
		filterTarget: function (event, player, target) {
			return player.canCompare(target);
		},
		content: function () {
			"step 0";
			player.chooseToCompare(target);
			"step 1";
			if (!result.bool) event.finish();
			event.num = result.num1;
			"step 2";
			if (num <= 5 && target.countGainableCards(player, "he") > 0) player.gainPlayerCard(target, "he", true);
			"step 3";
			if (num <= 9) {
				var card = get.cardPile2(function (x) {
					return x.name == "sha";
				});
				if (card) player.gain(card, "gain2");
			}
			"step 4";
			if (num <= 13) {
				var card = { name: "sha", nature: "thunder" };
				if (player.canUse(card, target, false)) player.useCard(card, target, false);
			}
		},
		ai: {
			order: 4,
			result: {
				target: function (player, target) {
					var sort = function (a, b) {
						return b.number - a.number;
					};
					var ps = player.getCards("h").sort(sort);
					var ts = target.getCards("h").sort(sort);
					if (ps[0].number > ts[0].number) {
						var effect = get.effect(target, { name: "sha", nature: "thunder" }, player, player);
						if (ps[0].number < 6 && target.countCards("he") > 1) effect -= 2;
						if (ps[0].number < 10) effect -= 1;
						return effect;
					}
					return ps.length >= ts.length ? -0.5 : 0;
				},
			},
		},
	},
	fenyue: {
		audio: 2,
		enable: "phaseUse",
		filter: function (event, player) {
			if (!player.countCards("h")) return false;
			var num;
			if (get.mode() == "identity") {
				num = game.countPlayer(function (current) {
					return current.identity == "zhong" || current.identity == "mingzhong";
				});
			} else {
				num = 1;
			}
			if (player.getStat().skill.fenyue >= num) return false;
			return true;
		},
		filterTarget: function (card, player, target) {
			return player.canCompare(target);
		},
		ai: {
			order: 2.8,
			result: {
				target: function (player, target) {
					if (
						get.attitude(player, target) < 0 &&
						player.hasCard(function (card) {
							return (card.number >= 9 && get.value(card) <= 5) || get.value(card) <= 3;
						})
					) {
						return get.effect(target, { name: "sha" }, player, target);
					} else {
						return 0;
					}
				},
			},
		},
		content: function () {
			"step 0";
			player.chooseToCompare(target);
			"step 1";
			if (result.bool) {
				player
					.chooseControl(function () {
						return 1;
					})
					.set("choiceList", ["令" + get.translation(target) + "不能使用或打出手牌直到回合结束", "视为对" + get.translation(target) + "使用一张杀（不计入次数限制）"]);
			} else {
				var evt = _status.event.getParent("phaseUse");
				if (evt && evt.name == "phaseUse") {
					evt.skipped = true;
				}
				event.finish();
			}
			"step 2";
			if (result.control == "选项一") {
				target.addTempSkill("fenyue2");
			} else {
				player.useCard({ name: "sha", isCard: true }, target, false);
			}
		},
	},
	fenyue2: {
		mark: true,
		mod: {
			cardEnabled2: function (card) {
				if (get.position(card) == "h") return false;
			},
		},
		intro: {
			content: "不能使用或打出手牌",
		},
	},

	zfengshi: {
		audio: 2,
		trigger: { player: "useCardToPlayered" },
		filter: function (event, player) {
			return event.card.name == "sha" && event.target.countCards("e");
		},
		logTarget: "target",
		check: function (event, player) {
			if (event.target.hasSkillTag("noe")) return false;
			return get.attitude(player, event.target) < 0;
		},
		content: function () {
			trigger.target.chooseToDiscard("e", true);
		},
	},
	chuanxin: {
		audio: 2,
		trigger: { source: "damageBegin2" },
		preHidden: true,
		filter: function (event, player) {
			if (_status.currentPhase != player) return false;
			if (!_status.event.getParent("phaseUse")) return false;
			if (event.card && (event.card.name == "sha" || event.card.name == "juedou") && event.getParent().name == event.card.name) {
				if (get.mode() == "guozhan") {
					return (event.player.identity != "qun" || player.identity == "ye") && !event.player.isUnseen() && event.player.hasViceCharacter();
				} else {
					var info = lib.character[event.player.name];
					if (!info) return false;
					var skills = event.player.getSkills();
					for (var i = 0; i < info[3].length; i++) {
						if (lib.skill[info[3][i]].fixed) continue;
						if (skills.includes(info[3][i])) return true;
					}
				}
			}
			return false;
		},
		logTarget: "player",
		check: function (event, player) {
			if (get.mode() == "guozhan") {
				if (!event.player.isUnseen(1) && get.guozhanRank(event.player.name2, event.player) < 4) return false;
			}
			if (event.player.hasSkill("subplayer")) return false;
			if (get.attitude(player, event.player) < 0) {
				if (event.player.hp == 1 && event.player.countCards("e") < 2 && event.player.name2 != "gz_pangtong") return false;
				return true;
			}
			return false;
		},
		content: function () {
			"step 0";
			trigger.cancel();
			if (trigger.player.countCards("e")) {
				trigger.player
					.chooseControl(function (event, player) {
						if (get.mode() == "guozhan" && get.guozhanRank(player.name2, player) < 4) return 1;
						if (player.hp == 1) return 1;
						if (player.hp == 2 && player.countCards("e") >= 2) return 1;
						return 0;
					})
					.set("choiceList", ["弃置装备区内的所有牌并失去1点体力", get.mode() == "guozhan" ? "移除副将牌" : "随机移除武将牌上的一个技能"]);
			} else {
				event._result = { index: 1 };
			}
			"step 1";
			if (result.index == 1) {
				if (get.mode() != "guozhan") {
					var info = lib.character[trigger.player.name];
					var skills = trigger.player.getSkills();
					var list = [];
					for (var i = 0; i < info[3].length; i++) {
						if (lib.skill[info[3][i]].fixed) continue;
						if (skills.includes(info[3][i])) {
							list.push(info[3][i]);
						}
					}
					if (list.length) {
						var skill = list.randomGet();
						trigger.player.removeSkills(skill);
					}
				} else {
					trigger.player.removeCharacter(1);
				}
			} else {
				trigger.player.discard(trigger.player.getCards("e"));
				trigger.player.loseHp();
			}
		},
	},
	hengjiang: {
		audio: 2,
		trigger: { player: "damageEnd" },
		preHidden: true,
		check: function (event, player) {
			return get.attitude(player, _status.currentPhase) < 0 || !_status.currentPhase.needsToDiscard(2);
		},
		filter: function (event) {
			return _status.currentPhase && _status.currentPhase.isIn() && event.num > 0;
		},
		logTarget: function () {
			return _status.currentPhase;
		},
		content: function () {
			var source = _status.currentPhase;
			if (source.hasSkill("hengjiang2")) {
				source.storage.hengjiang2 += trigger.num;
				source.storage.hengjiang3.add(player);
				source.updateMarks();
			} else {
				source.storage.hengjiang3 = [player];
				source.storage.hengjiang2 = trigger.num;
				source.addTempSkill("hengjiang2");
			}
		},
		ai: {
			maixie_defend: true,
		},
	},
	hengjiang2: {
		mark: true,
		charlotte: true,
		intro: {
			content: "手牌上限-#",
		},
		mod: {
			maxHandcard: function (player, num) {
				return num - player.storage.hengjiang2;
			},
		},
		onremove: function (player) {
			delete player.storage.hengjiang2;
			delete player.storage.hengjiang3;
		},
		trigger: { player: "phaseDiscardEnd" },
		sourceSkill: "hengjiang",
		filter: function (event, player) {
			if (event.cards && event.cards.length) return false;
			var players = player.storage.hengjiang3;
			for (var i = 0; i < players.length; i++) {
				if (players[i].isIn()) return true;
			}
			return false;
		},
		forced: true,
		popup: false,
		content: function () {
			var players = player.storage.hengjiang3;
			for (var i = 0; i < players.length; i++) {
				if (players[i].isIn()) {
					players[i].logSkill("hengjiang");
					players[i].line(player, "green");
				}
			}
			game.asyncDraw(player.storage.hengjiang3);
		},
	},
	rehengjiang: {
		audio: "hengjiang",
		trigger: { player: "damageEnd" },
		check: function (event, player) {
			return get.attitude(player, _status.currentPhase) < 0 || !_status.currentPhase.needsToDiscard(2);
		},
		filter: function (event) {
			return _status.currentPhase && _status.currentPhase.isIn() && event.num > 0;
		},
		logTarget: function () {
			return _status.currentPhase;
		},
		preHidden: true,
		content: function () {
			"step 0";
			event.count = trigger.num;
			"step 1";
			event.count--;
			var source = _status.currentPhase;
			source.addTempSkill("rehengjiang2");
			source.addMark("rehengjiang2", 1, false);
			player.addTempSkill("rehengjiang3");
			"step 2";
			if (event.count && player.hasSkill("rehengjiang")) {
				player.chooseBool(get.prompt2("rehengjiang", _status.currentPhase)).set("ai", function () {
					return lib.skill.rehengjiang.check(_status.event.getTrigger(), _status.event.player);
				});
			} else event.finish();
			"step 3";
			if (result.bool) {
				player.logSkill("rehengjiang", _status.currentPhase);
				event.goto(1);
			}
		},
		ai: {
			maixie_defend: true,
		},
	},
	rehengjiang2: {
		mark: true,
		charlotte: true,
		onremove: true,
		intro: {
			content: "手牌上限-#",
		},
		mod: {
			maxHandcard: function (player, num) {
				return num - player.storage.rehengjiang2;
			},
		},
	},
	rehengjiang3: {
		audio: "hengjiang",
		trigger: { global: "phaseEnd" },
		forced: true,
		charlotte: true,
		sourceSkill: "rehengjiang",
		filterx: function (event, player) {
			if (!event.player.countMark("rehengjiang2")) return false;
			if (
				event.player.hasHistory("lose", function (evt) {
					return evt.type == "discard" && evt.cards2.length > 0 && evt.getParent("phaseDiscard").player == event.player;
				})
			)
				return false;
			return true;
		},
		logTarget: "player",
		content: function () {
			if (lib.skill.rehengjiang3.filterx(trigger, player)) {
				var num = player.getHistory("useSkill", function (evt) {
					return evt.skill == "rehengjiang" && evt.targets.includes(trigger.player);
				}).length;
				if (num > 0) player.draw(num);
			} else player.draw();
		},
	},
	shuangren: {
		audio: 2,
		trigger: { player: "phaseUseBegin" },
		direct: true,
		preHidden: true,
		filter: function (event, player) {
			return (
				player.countCards("h") > 0 &&
				game.hasPlayer(function (current) {
					return current != player && player.canCompare(current);
				})
			);
		},
		content: function () {
			"step 0";
			var goon;
			if (player.needsToDiscard() > 1) {
				goon = player.hasCard(function (card) {
					return card.number > 10 && get.value(card) <= 5;
				});
			} else {
				goon = player.hasCard(function (card) {
					return (card.number >= 9 && get.value(card) <= 5) || get.value(card) <= 3;
				});
			}
			player
				.chooseTarget(get.prompt2("shuangren"), function (card, player, target) {
					return player.canCompare(target);
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					if (_status.event.goon && get.attitude(player, target) < 0) {
						return get.effect(target, { name: "sha" }, player, player);
					}
					return 0;
				})
				.set("goon", goon)
				.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("shuangren", target);
				player.chooseToCompare(target);
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				var target = event.target;
				if (
					game.hasPlayer(function (current) {
						if (target == current) return false;
						if (!player.canUse("sha", current, false)) return false;
						return target.isFriendOf(current);
					})
				) {
					var str = "对一名与" + get.translation(target) + "势力相同的";
					player
						.chooseTarget(str + "角色使用一张杀", true, function (card, player, target) {
							if (!player.canUse("sha", target, false)) return false;
							if (get.mode() == "guozhan") {
								return target.isFriendOf(_status.event.identity);
							}
							return true;
						})
						.set("ai", function (target) {
							var player = _status.event.player;
							return get.effect(target, { name: "sha" }, player, player);
						})
						.set("identity", target);
				} else {
					player.useCard({ name: "sha", isCard: true }, target, false);
					event.finish();
				}
			} else {
				player.addTempSkill("zishou2");
				event.finish();
			}
			"step 3";
			if (result.bool && result.targets && result.targets.length) {
				player.useCard({ name: "sha", isCard: true }, result.targets[0], false);
			}
		},
	},
	kuanshi: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		content: function () {
			"step 0";
			player.chooseTarget(get.prompt2("kuanshi")).set("ai", function (target) {
				if (get.attitude(_status.event.player, target) > 0) {
					return 1 / Math.sqrt(target.hp + 1);
				}
				return 0;
			}).animate = false;
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("kuanshi");
				target.storage.kuanshi2 = player;
				target.addSkill("kuanshi2");
			}
		},
	},
	kuanshi2: {
		/*mark:'character',
		intro:{
			content:'下一次受到超过1点的伤害时，防止此伤害，然后$跳过下个回合的摸牌阶段'
		},*/
		trigger: { player: "damageBegin4" },
		forced: true,
		sourceSkill: "kuanshi",
		filter: function (event, player) {
			return event.num > 1;
		},
		//priority:-11,
		content: function () {
			trigger.cancel();
			player.storage.kuanshi2.skip("phaseDraw");
			player.removeSkill("kuanshi2");
		},
		group: "kuanshi2_remove",
		onremove: true,
		subSkill: {
			remove: {
				trigger: { global: ["phaseZhunbeiBegin", "dieAfter"] },
				forced: true,
				popup: false,
				filter: function (event, player) {
					return event.player == player.storage.kuanshi2;
				},
				content: function () {
					player.removeSkill("kuanshi2");
				},
			},
		},
	},
	xiashu: {
		audio: 2,
		trigger: { player: "phaseUseBegin" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		content: function () {
			"step 0";
			var maxval = 0;
			var hs = player.getCards("h");
			for (var i = 0; i < hs.length; i++) {
				maxval = Math.max(maxval, get.value(hs[i]));
			}
			player
				.chooseTarget(get.prompt2("xiashu"), lib.filter.notMe)
				.set("ai", function (target) {
					var player = _status.event.player;
					var maxval = _status.event.maxval;
					var dh = target.countCards("h") - player.countCards("h");
					var att = get.attitude(player, target);
					if (target.hasSkill("qingjian")) return false;
					if (dh <= 0) return 0;
					if (att > 0) return 0.1;
					if (maxval >= 8) return 0;
					if (att == 0) return 0.2;
					if (dh >= 3) return dh;
					if (dh == 2) {
						if (maxval <= 7) return dh;
					}
					if (maxval <= 6) return dh;
					return 0;
				})
				.set("maxval", maxval);
			"step 1";
			if (result.bool) {
				player.logSkill("xiashu", result.targets);
				event.target = result.targets[0];
				var hs = player.getCards("h");
				player.give(hs, event.target);
			} else {
				event.finish();
			}
			"step 2";
			var hs = event.target.getCards("h");
			if (!hs.length) {
				event.finish();
				return;
			}
			hs.sort(function (a, b) {
				return get.value(b, player, "raw") - get.value(a, player, "raw");
			});
			event.target
				.chooseCard([1, hs.length], "展示至少一张手牌", true)
				.set("ai", function (card) {
					var rand = _status.event.rand;
					var list = _status.event.list;
					if (_status.event.att) {
						if (ui.selected.cards.length >= Math.ceil(list.length / 2)) return 0;
						var value = get.value(card);
						if (_status.event.getParent().player.isHealthy()) {
							value += (get.tag(card, "damage") ? 1.5 : 0) + (get.tag(card, "draw") ? 2 : 0);
						}
						return value;
					}
					if (ui.selected.cards.length >= Math.floor(list.length / 2)) return 0;
					return list.indexOf(card) % 2 == rand ? 1 : 0;
				})
				.set("rand", Math.random() < 0.6 ? 1 : 0)
				.set("list", hs)
				.set("att", get.attitude(event.target, player) > 0);
			"step 3";
			event.target.showCards(result.cards);
			event.cards1 = result.cards;
			event.cards2 = event.target.getCards("h", function (card) {
				return !event.cards1.includes(card);
			});
			"step 4";
			var choice;
			var num1 = event.cards1.length;
			var num2 = event.cards2.length;
			if (get.attitude(event.target, player) > 0 && num1 >= num2) {
				choice = 0;
			} else if (num1 == num2) {
				choice = Math.random() < 0.45 ? 0 : 1;
			} else if (num1 > num2) {
				if (num1 - num2 == 1) {
					choice = Math.random() < 0.6 ? 0 : 1;
				} else {
					choice = 0;
				}
			} else {
				if (num2 - num1 == 1) {
					choice = Math.random() < 0.6 ? 1 : 0;
				} else {
					choice = 1;
				}
			}
			player
				.chooseControl(function (event, player) {
					return _status.event.choice;
				})
				.set("choiceList", ["获得" + get.translation(event.target) + "展示的牌", "获得" + get.translation(event.target) + "未展示的牌"])
				.set("choice", choice);
			"step 5";
			if (result.index == 0) {
				player.gain(event.cards1, target, "give", "bySelf");
			} else {
				player.gain(event.cards2, target, "giveAuto", "bySelf");
			}
		},
		ai: {
			expose: 0.1,
		},
	},
	sheyan: {
		audio: 2,
		trigger: { target: "useCardToTarget" },
		filter: function (event, player) {
			if (!event.targets || !event.targets.includes(player)) return false;
			var info = get.info(event.card);
			if (info.type != "trick") return false;
			if (info.multitarget) return false;
			if (event.targets.length > 1) return true;
			return game.hasPlayer(function (current) {
				return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, event.player, current);
			});
		},
		direct: true,
		content: function () {
			"step 0";
			var bool1 = trigger.targets.length > 1;
			var bool2 = game.hasPlayer(function (current) {
				return !trigger.targets.includes(current) && lib.filter.targetEnabled2(trigger.card, trigger.player, current);
			});
			if (bool1 && bool2) {
				player
					.chooseControlList(get.prompt("sheyan"), ["为" + get.translation(trigger.card) + "增加一个目标", "为" + get.translation(trigger.card) + "减少一个目标"], function (event, player) {
						if (_status.event.add) return 0;
						return 1;
					})
					.set("add", get.effect(player, trigger.card, trigger.player, player) >= 0);
			} else if (bool2) {
				event.type = "add";
				event.goto(2);
				event.unchosen = true;
			} else {
				event.type = "remove";
				event.goto(2);
				event.unchosen = true;
			}
			"step 1";
			if (result.control == "cancel2") {
				event.finish();
			} else if (result.index == 1) {
				event.type = "remove";
			} else {
				event.type = "add";
			}
			"step 2";
			if (event.type == "add") {
				player
					.chooseTarget(event.unchosen ? get.prompt("sheyan") : null, "为" + get.translation(trigger.card) + "增加一个目标", function (card, player, target) {
						var trigger = _status.event.getTrigger();
						return !trigger.targets.includes(target) && lib.filter.targetEnabled2(trigger.card, trigger.player, target);
					})
					.set("ai", function (target) {
						var trigger = _status.event.getTrigger();
						return get.effect(target, trigger.card, trigger.player, _status.event.player);
					});
			} else {
				player
					.chooseTarget(event.unchosen ? get.prompt("sheyan") : null, "为" + get.translation(trigger.card) + "减少一个目标", function (card, player, target) {
						return _status.event.targets.includes(target);
					})
					.set("ai", function (target) {
						var trigger = _status.event.getTrigger();
						return -get.effect(target, trigger.card, trigger.player, _status.event.player);
					})
					.set("targets", trigger.targets);
			}
			"step 3";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.target = result.targets[0];
			} else {
				event.finish();
			}
			"step 4";
			player.logSkill("sheyan", event.target);
			if (event.type == "add") {
				trigger.targets.push(event.target);
			} else {
				trigger.getParent().excluded.add(event.target);
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	bingzheng: {
		audio: 2,
		trigger: { player: "phaseUseEnd" },
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("bingzheng"), function (card, player, target) {
					return target.countCards("h") != target.hp;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					var nh = target.countCards("h");
					if (att > 0) {
						if (nh == target.hp - 1) {
							if (player == target) return att + 1;
							return att + 2;
						}
						if (player == target && player.needsToDiscard()) return att / 3;
						return att;
					} else {
						if (nh == target.hp + 1) return -att;
						if (nh == 0) return 0;
						return -att / 2;
					}
				});
			"step 1";
			if (result.bool) {
				player.logSkill("bingzheng", result.targets);
				event.target = result.targets[0];
				if (event.target.countCards("h")) {
					player
						.chooseControl(function (event, player) {
							var target = event.target;
							if (get.attitude(player, target) < 0) return 1;
							return 0;
						})
						.set("choiceList", ["令" + get.translation(event.target) + "摸一张牌", "令" + get.translation(event.target) + "弃置一张手牌"]);
				} else {
					event.directfalse = true;
				}
			} else {
				event.finish();
			}
			"step 2";
			if (event.directfalse || result.index == 0) {
				event.target.draw();
			} else {
				event.target.chooseToDiscard("h", true);
			}
			"step 3";
			if (event.target.countCards("h") == event.target.hp) {
				player.draw();
				if (event.target == player) {
					event.finish();
					return;
				}
				var next = player.chooseCard("是否交给" + get.translation(event.target) + "一张牌？", "he");
				next.set("ai", function (card) {
					if (get.position(card) != "h") return 0;
					if (_status.event.shan && card.name == "shan") {
						return 11;
					}
					if (_status.event.goon) {
						return 10 - get.value(card);
					}
					return -get.value(card, _status.event.player, "raw");
				});
				if (get.attitude(player, event.target) > 1 && player.countCards("h", "shan") > 1 && player.countCards("h") > event.target.countCards("h")) {
					next.set("shan", true);
				}
				if (get.attitude(player, event.target) > 0 && player.needsToDiscard()) {
					next.set("goon", true);
				}
			} else {
				event.finish();
			}
			"step 4";
			if (result.bool) {
				player.give(result.cards, target);
			}
		},
		ai: {
			expose: 0.2,
			threaten: 1.4,
		},
	},
	fuman: {
		audio: 2,
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			if (target == player) return false;
			var stat = player.getStat("skill").fuman_targets;
			return !stat || !stat.includes(target);
		},
		filter: function (event, player) {
			return player.countCards("h") > 0 && game.hasPlayer(current => lib.skill.fuman.filterTarget(null, player, current));
		},
		discard: false,
		lose: false,
		delay: false,
		filterCard: true,
		content: function () {
			player.give(cards, target).gaintag.add("fuman");
			target.addSkill("fuman2");
			player.addSkill("fuman_draw");
			var stat = player.getStat("skill");
			if (!stat.fuman_targets) stat.fuman_targets = [];
			stat.fuman_targets.push(target);
		},
		check: function (card) {
			return 6 - get.value(card);
		},
		ai: {
			order: 2,
			result: {
				target: function (player, target) {
					if (!target.hasSha()) return 1.2;
					return 1;
				},
			},
		},
		subSkill: {
			draw: {
				trigger: { global: "useCardAfter" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return event.player.hasHistory("lose", function (evt) {
						if (evt.getParent() != event) return false;
						for (var i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("fuman")) return true;
						}
						return false;
					});
				},
				logTarget: "player",
				content: function () {
					player.draw(
						trigger.player.hasHistory("sourceDamage", function (evt) {
							return evt.card == trigger.card;
						})
							? 2
							: 1
					);
				},
			},
		},
	},
	fuman2: {
		mod: {
			aiOrder: function (player, card, num) {
				if (get.itemtype(card) == "card" && card.hasGaintag("fuman")) return num + 1;
			},
			cardname: function (card, player) {
				if (get.itemtype(card) == "card" && card.hasGaintag("fuman")) return "sha";
			},
		},
	},
	qizhou: {
		trigger: { player: ["phaseBefore", "equipEnd", "loseEnd"] },
		forced: true,
		popup: false,
		derivation: ["mashu", "reyingzi", "reduanbing", "fenwei"],
		filter: function (event, player) {
			if (player.equiping) return false;
			var suits = [];
			var es = player.getCards("e");
			for (var i = 0; i < es.length; i++) {
				suits.add(get.suit(es[i]));
			}
			if (player.additionalSkills.qizhou) {
				return player.additionalSkills.qizhou.length != suits.length;
			} else {
				return suits.length > 0;
			}
		},
		content: function () {
			var suits = [];
			var es = player.getCards("e");
			for (var i = 0; i < es.length; i++) {
				suits.add(get.suit(es[i]));
			}
			player.removeAdditionalSkill("qizhou");
			switch (suits.length) {
				case 1:
					player.addAdditionalSkill("qizhou", ["mashu"]);
					break;
				case 2:
					player.addAdditionalSkill("qizhou", ["mashu", "reyingzi"]);
					break;
				case 3:
					player.addAdditionalSkill("qizhou", ["mashu", "reyingzi", "reduanbing"]);
					break;
				case 4:
					player.addAdditionalSkill("qizhou", ["mashu", "reyingzi", "reduanbing", "fenwei"]);
					break;
			}
		},
		ai: {
			threaten: 1.2,
		},
	},
	shanxi: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterCard: { color: "red", type: "basic" },
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("he") && player.inRange(target);
		},
		check: function (card) {
			return 6 - get.value(card);
		},
		content: function () {
			"step 0";
			player.discardPlayerCard(target, true);
			"step 1";
			if (result.bool) {
				if (get.name(result.cards[0], result.cards[0].original == "h" ? player : false) == "shan") {
					player.viewHandcards(target);
				} else {
					target.viewHandcards(player);
				}
			}
		},
		ai: {
			order: 8,
			result: {
				target: -1,
			},
		},
	},
	fenxun: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		position: "he",
		filterTarget: function (card, player, target) {
			return target != player;
		},
		content: function () {
			player.markAuto("fenxun2", [target]);
			player.addTempSkill("fenxun2");
		},
		check: function (card) {
			if (card.name == "sha" && _status.event.player.countCards("h", "sha") <= 1) return 0;
			return 6 - get.value(card);
		},
		filterCard: true,
		ai: {
			order: 4,
			result: {
				player: function (player, target) {
					if (get.distance(player, target) <= 1) return 0;
					var hs = player.getCards("h", "shunshou");
					if (hs.length && player.canUse(hs[0], target, false)) {
						return 1;
					}
					var geteff = function (current) {
						return player.canUse("sha", current, false, true) && get.effect(current, { name: "sha" }, player, player) > 0;
					};
					if (player.hasSha() && geteff(target)) {
						var num = game.countPlayer(function (current) {
							return current != player && get.distance(player, current) <= 1 && geteff(current);
						});
						if (num == 0) {
							if (
								game.hasPlayer(function (current) {
									return player.canUse("sha", current) && geteff(current) && current != target;
								})
							) {
								return 1;
							}
						} else if (num == 1) {
							return 1;
						}
					}
					return 0;
				},
			},
		},
	},
	fenxun2: {
		mark: "character",
		onremove: true,
		intro: {
			content: "到$的距离视为1",
		},
		mod: {
			globalFrom: function (from, to) {
				if (from.getStorage("fenxun2").includes(to)) {
					return -Infinity;
				}
			},
		},
	},
	duanbing: {
		audio: 2,
		audioname2: { heqi: "duanbing_heqi" },
		trigger: { player: "useCard2" },
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			return game.hasPlayer(function (current) {
				return !event.targets.includes(current) && get.distance(player, current) <= 1 && player.canUse(event.card, current);
			});
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("duanbing"), "为" + get.translation(trigger.card) + "增加一个目标", function (card, player, target) {
					return !_status.event.sourcex.includes(target) && get.distance(player, target) <= 1 && player.canUse(_status.event.card, target);
				})
				.set("sourcex", trigger.targets)
				.set("ai", function (target) {
					var player = _status.event.player;
					return get.effect(target, _status.event.card, player, player);
				})
				.set("card", trigger.card);
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.target = result.targets[0];
			} else {
				event.finish();
			}
			"step 2";
			player.logSkill("duanbing", event.target);
			trigger.targets.push(event.target);
		},
		ai: {
			effect: {
				player_use: function (card, player, target, current, isLink) {
					if (!isLink && card.name == "sha") {
						if (player._duanbingtmp) return;
						player._duanbingtmp = true;
						if (get.effect(target, card, player, player) <= 0) {
							delete player._duanbingtmp;
							return;
						}
						if (
							game.hasPlayer(function (current) {
								return current != target && get.distance(player, current) <= 1 && player.canUse(card, current) && get.effect(current, card, player, player) > 0;
							})
						) {
							delete player._duanbingtmp;
							return [1, 1];
						}
						delete player._duanbingtmp;
					}
				},
			},
		},
	},
	fuhan: {
		audio: 2,
		trigger: { player: "phaseBegin" },
		unique: true,
		limited: true,
		skillAnimation: true,
		animationColor: "orange",
		filter: function (event, player) {
			return player.storage.fanghun2 > 0;
		},
		prompt: function (event, player) {
			var num = Math.max(2, player.storage.fanghun2 || 0);
			num = Math.min(num, 8);
			return get.prompt("fuhan") + "（体力上限：" + num + "）";
		},
		check: function (event, player) {
			var num = Math.max(2, player.storage.fanghun2 || 0);
			if (num == 1) return false;
			if (player.hp <= 1) return true;
			if (num == 2) return false;
			if (num == 3) return player.hp < 3 && player.isMinHp();
			return true;
		},
		content: function () {
			"step 0";
			if (player.storage.fanghun) player.draw(player.storage.fanghun);
			player.removeMark("fanghun", player.storage.fanghun);
			event.num = Math.max(2, player.storage.fanghun2 || 0);
			var list;
			if (_status.characterlist) {
				list = [];
				for (var i = 0; i < _status.characterlist.length; i++) {
					var name = _status.characterlist[i];
					if (lib.character[name][1] == "shu") list.push(name);
				}
			} else if (_status.connectMode) {
				list = get.charactersOL(function (i) {
					return lib.character[i][1] != "shu";
				});
			} else {
				list = get.gainableCharacters(function (info) {
					return info[1] == "shu";
				});
			}
			var players = game.players.concat(game.dead);
			for (var i = 0; i < players.length; i++) {
				list.remove(players[i].name);
				list.remove(players[i].name1);
				list.remove(players[i].name2);
			}
			list.remove("zhaoyun");
			list.remove("re_zhaoyun");
			list.remove("ol_zhaoyun");
			// var dialog=ui.create.dialog();
			// dialog.add([list.randomGets(5),'character']);
			player
				.chooseButton(true)
				.set("ai", function (button) {
					return get.rank(button.link, true) - lib.character[button.link][2];
				})
				.set("createDialog", ["将武将牌替换为一名角色", [list.randomGets(5), "character"]]);
			player.awakenSkill("fuhan");
			"step 1";
			event.num = Math.min(event.num, 8);
			player.reinitCharacter(get.character(player.name2, 3).includes("fuhan") ? player.name2 : player.name1, result.links[0]);
			"step 2";
			var num = event.num - player.maxHp;
			if (num > 0) player.gainMaxHp(num);
			else player.loseMaxHp(-num);
			player.recover();
		},
		ai: {
			combo: "fanghun",
		},
	},
	refuhan: {
		audio: "fuhan",
		trigger: { player: "phaseZhunbeiBegin" },
		unique: true,
		limited: true,
		skillAnimation: true,
		animationColor: "orange",
		filter: function (event, player) {
			return player.countMark("fanghun") > 0;
		},
		content: function () {
			"step 0";
			if (player.storage.fanghun) player.draw(player.storage.fanghun);
			player.removeMark("fanghun", player.storage.fanghun);
			player.awakenSkill("refuhan");
			"step 1";
			var list;
			if (_status.characterlist) {
				list = [];
				for (var i = 0; i < _status.characterlist.length; i++) {
					var name = _status.characterlist[i];
					if (lib.character[name][1] == "shu") list.push(name);
				}
			} else if (_status.connectMode) {
				list = get.charactersOL(function (i) {
					return lib.character[i][1] != "shu";
				});
			} else {
				list = get.gainableCharacters(function (info) {
					return info[1] == "shu";
				});
			}
			var players = game.players.concat(game.dead);
			for (var i = 0; i < players.length; i++) {
				list.remove(players[i].name);
				list.remove(players[i].name1);
				list.remove(players[i].name2);
			}
			list.remove("zhaoyun");
			list.remove("re_zhaoyun");
			list.remove("ol_zhaoyun");
			list = list.randomGets(Math.max(4, game.countPlayer()));
			var skills = [];
			for (var i of list) {
				skills.addArray(
					(lib.character[i][3] || []).filter(function (skill) {
						var info = get.info(skill);
						return info && !info.zhuSkill && !info.limited && !info.juexingji && !info.hiddenSkill && !info.charlotte && !info.dutySkill;
					})
				);
			}
			if (!list.length || !skills.length) {
				event.finish();
				return;
			}
			if (player.isUnderControl()) {
				game.swapPlayerAuto(player);
			}
			var switchToAuto = function () {
				_status.imchoosing = false;
				event._result = {
					bool: true,
					skills: skills.randomGets(2),
				};
				if (event.dialog) event.dialog.close();
				if (event.control) event.control.close();
			};
			var chooseButton = function (list, skills) {
				var event = _status.event;
				if (!event._result) event._result = {};
				event._result.skills = [];
				var rSkill = event._result.skills;
				var dialog = ui.create.dialog("请选择获得至多两个技能", [list, "character"], "hidden");
				event.dialog = dialog;
				var table = document.createElement("div");
				table.classList.add("add-setting");
				table.style.margin = "0";
				table.style.width = "100%";
				table.style.position = "relative";
				for (var i = 0; i < skills.length; i++) {
					var td = ui.create.div(".shadowed.reduce_radius.pointerdiv.tdnode");
					td.link = skills[i];
					table.appendChild(td);
					td.innerHTML = "<span>" + get.translation(skills[i]) + "</span>";
					td.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
						if (_status.dragged) return;
						if (_status.justdragged) return;
						_status.tempNoButton = true;
						setTimeout(function () {
							_status.tempNoButton = false;
						}, 500);
						var link = this.link;
						if (!this.classList.contains("bluebg")) {
							if (rSkill.length >= 2) return;
							rSkill.add(link);
							this.classList.add("bluebg");
						} else {
							this.classList.remove("bluebg");
							rSkill.remove(link);
						}
					});
				}
				dialog.content.appendChild(table);
				dialog.add("　　");
				dialog.open();

				event.switchToAuto = function () {
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing = false;
				};
				event.control = ui.create.control("ok", function (link) {
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing = false;
				});
				for (var i = 0; i < event.dialog.buttons.length; i++) {
					event.dialog.buttons[i].classList.add("selectable");
				}
				game.pause();
				game.countChoose();
			};
			if (event.isMine()) {
				chooseButton(list, skills);
			} else if (event.isOnline()) {
				event.player.send(chooseButton, list, skills);
				event.player.wait();
				game.pause();
			} else {
				switchToAuto();
			}
			"step 2";
			var map = event.result || result;
			if (map && map.skills && map.skills.length) {
				player.addSkills(map.skills);
			}
			game.broadcastAll(function (list) {
				game.expandSkills(list);
				for (var i of list) {
					var info = lib.skill[i];
					if (!info) continue;
					if (!info.audioname2) info.audioname2 = {};
					info.audioname2.zhaoxiang = "fuhan";
				}
			}, map.skills);
			"step 3";
			if (player.isMinHp()) player.recover();
		},
		ai: {
			combo: "refanghun",
		},
	},
	refanghun: {
		mod: {
			aiValue: function (player, card, num) {
				if (card.name != "sha" && card.name != "shan") return;
				var geti = function () {
					var cards = player.getCards("hs", function (card) {
						return card.name == "sha" || card.name == "shan";
					});
					if (cards.includes(card)) {
						return cards.indexOf(card);
					}
					return cards.length;
				};
				return Math.max(num, [7, 5, 5, 3][Math.min(geti(), 3)]);
			},
		},
		locked: false,
		audio: "fanghun",
		inherit: "fanghun",
		trigger: {
			player: "useCard",
			target: "useCardToTargeted",
		},
	},
	fanghun: {
		hiddenCard: function (player, name) {
			if (!player.storage.fanghun || player.storage.fanghun <= 0) return false;
			if (name == "tao") return player.countCards("hs", "jiu") > 0;
			if (name == "jiu") return player.countCards("hs", "tao") > 0;
			return false;
		},
		audio: 2,
		marktext: "影",
		intro: {
			content: "mark",
			name: "梅影",
		},
		trigger: {
			source: "damageSource",
			player: "damageEnd",
		},
		forced: true,
		locked: false,
		filter: function (event) {
			return event.card && event.card.name == "sha";
		},
		content: function () {
			player.addMark("fanghun", trigger.num || 1);
			player.addMark("fanghun2", trigger.num || 1, false);
		},
		group: ["fanghun_sha", "fanghun_draw"],
		subSkill: {
			draw: {
				trigger: { player: ["useCardAfter", "respondAfter"] },
				forced: true,
				popup: false,
				filter: function (event) {
					return event.skill == "fanghun_sha" || event.skill == "fanghun_shan";
				},
				content: function () {
					player.draw();
				},
			},
			sha: {
				audio: "fanghun",
				inherit: "ollongdan",
				enable: ["chooseToUse", "chooseToRespond"],
				prompt: "弃置一枚【梅影】标记，将杀当做闪，或将闪当做杀，或将桃当做酒，或将酒当做桃使用或打出",
				filter: function (event, player) {
					return player.hasMark("fanghun") && get.info("ollongdan").filter(event, player);
				},
				onrespond: function () {
					return this.onuse.apply(this, arguments);
				},
				onuse: function (result, player) {
					player.removeMark("fanghun", 1);
				},
				ai: {
					respondSha: true,
					respondShan: true,
					skillTagFilter: function (player, tag) {
						if (!player.hasMark("fanghun")) return false;
						return get.info("ollongdan").ai.skillTagFilter(player, tag);
					},
					order: function (item, player) {
						if (!player || !player.storage) {
							player = _status.event.player;
							if (!player || !player.storage) return 0;
							if (
								Object.keys(player.storage).some(i => {
									return typeof i == "string" && i.indexOf("fuhan") != -1;
								})
							)
								return 4;
							return 1;
						}
						const awakened = Object.keys(player.storage).some(i => typeof i == "string" && i.indexOf("fuhan") != -1);
						if (_status.event.type == "phase") {
							var max = 0;
							var list = ["sha", "tao", "jiu"];
							var map = { sha: "shan", tao: "jiu", jiu: "tao" };
							for (var i = 0; i < list.length; i++) {
								var name = list[i];
								if (player.countCards("hs", map[name]) > (name == "jiu" ? 1 : 0) && player.getUseValue({ name: name }) > 0) {
									var temp = get.order({ name: name });
									if (temp > max) max = temp;
								}
							}
							if (max > 0) max += awakened ? 0.3 : -0.3;
							return max;
						}
						return awakened ? 4 : 1;
					},
				},
			},
		},
	},
	yjixi: {
		derivation: "rewangzun",
		audio: "weidi",
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		filter: function (event, player) {
			if (player.phaseNumber < 3) return false;
			var num = 0;
			for (var i = player.actionHistory.length - 1; i >= 0; i--) {
				if (!player.actionHistory[i].isMe) continue;
				if (_status.globalHistory[i].changeHp.some(evt => evt.player == player && evt.getParent().name == "loseHp")) return false;
				else {
					num++;
					if (num >= 3) break;
				}
			}
			return true;
		},
		skillAnimation: true,
		animationColor: "gray",
		unique: true,
		juexingji: true,
		content: function () {
			"step 0";
			player.awakenSkill("yjixi");
			player.gainMaxHp();
			player.recover();
			"step 1";
			var str = "摸两张牌";
			var mode = get.mode();
			var choice = "选项一";
			if (mode == "identity" || (mode == "versus" && _status.mode == "four")) {
				var list = [];
				var zhu = get.zhu(player);
				if (zhu && zhu != player && zhu.skills) {
					for (var i = 0; i < zhu.skills.length; i++) {
						if (lib.skill[zhu.skills[i]] && lib.skill[zhu.skills[i]].zhuSkill) {
							list.push(zhu.skills[i]);
						}
					}
				}
				if (list.length) {
					str += "并获得技能" + get.translation(list);
					event.list = list;
					choice = "选项二";
				}
			}
			player
				.chooseControl(function (event, player) {
					return _status.event.choice;
				})
				.set("choiceList", ["获得技能〖妄尊〗", str])
				.set("choice", choice);
			"step 2";
			if (result.control == "选项一") {
				player.addSkills("rewangzun");
			} else {
				player.draw(2);
				if (event.list) {
					player.addSkills(event.list);
					game.broadcastAll(function (list) {
						game.expandSkills(list);
						for (var i of list) {
							var info = lib.skill[i];
							if (!info) continue;
							if (!info.audioname2) info.audioname2 = {};
							info.audioname2.old_yuanshu = "weidi";
						}
					}, event.list);
				}
			}
		},
	},
	xinyongsi: {
		audio: "yongsi",
		group: ["xinyongsi1", "xinyongsi2"],
		locked: true,
	},
	xinyongsi1: {
		audio: "yongsi1",
		trigger: { player: "phaseDrawBegin1" },
		forced: true,
		sourceSkill: "xinyongsi",
		filter: function (event, player) {
			return !event.numFixed;
		},
		content: function () {
			player.draw(game.countGroup());
			trigger.changeToZero();
		},
	},
	xinyongsi2: {
		audio: "yongsi2",
		trigger: { player: "phaseDiscardBegin" },
		forced: true,
		sourceSkill: "xinyongsi",
		check: function () {
			return false;
		},
		content: function () {
			"step 0";
			player.chooseToDiscard("he", "庸肆").set("prompt2", "弃置一张牌，或取消并失去1点体力").ai = function (card) {
				return 8 - get.value(card);
			};
			"step 1";
			if (!result.bool) player.loseHp();
		},
	},
	lianzhu: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterCard: true,
		position: "he",
		filterTarget: function (card, player, target) {
			return target != player;
		},
		check: function (card) {
			var num = get.value(card);
			if (get.color(card) == "black") {
				if (num >= 6) return 0;
				return 20 - num;
			} else {
				if (_status.event.player.needsToDiscard()) return 7 - num;
			}
			return 0;
		},
		discard: false,
		lose: false,
		delay: false,
		content: function () {
			"step 0";
			player.give(cards, target);
			if (get.color(cards[0]) == "black") {
				target
					.chooseToDiscard(2, "he", "弃置两张牌，或令" + get.translation(player) + "摸两张牌")
					.set("ai", function (card) {
						if (_status.event.goon) return 7 - get.value(card);
						return 0;
					})
					.set("goon", get.attitude(target, player) < 0);
			} else {
				event.finish();
			}
			"step 1";
			if (!result.bool) {
				player.draw(2);
			}
		},
		ai: {
			order: 8,
			expose: 0.2,
			result: {
				target: function (player, target) {
					if (ui.selected.cards.length && get.color(ui.selected.cards[0]) == "red") {
						if (target.countCards("h") < player.countCards("h")) return 1;
						return 0.5;
					}
					return -1;
				},
			},
		},
	},
	xiahui: {
		mod: {
			ignoredHandcard: function (card, player) {
				if (get.color(card) == "black") {
					return true;
				}
			},
			cardDiscardable: function (card, player, name) {
				if (name == "phaseDiscard" && get.color(card) == "black") return false;
			},
		},
		trigger: {
			global: "gainAfter",
			player: "loseAsyncAfter",
		},
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (event.name == "loseAsync") {
				if (event.type != "gain") return false;
				return game.hasPlayer(function (current) {
					if (current == player) return false;
					var hs = current.getCards("h"),
						cards = event.getl(player).cards2;
					var cardsx = event.getg(current);
					for (var i of cardsx) {
						if (hs.includes(i) && cards.includes(i) && get.color(i, player) == "black") return true;
					}
					return false;
				});
			}
			if (event.player != player) {
				var hs = event.player.getCards("h");
				var evt = event.getl(player);
				return (
					evt &&
					evt.cards2 &&
					evt.cards2.filter(function (card) {
						return hs.includes(card) && get.color(card, player) == "black";
					}).length > 0
				);
			}
			return false;
		},
		content: function () {
			var cards = trigger.getl(player).cards2;
			game.countPlayer(function (current) {
				if (current == player) return;
				var hs = current.getCards("h"),
					cardsx = trigger.getg(current).filter(function (card) {
						return hs.includes(card) && cards.includes(card) && get.color(card, player) == "black";
					});
				if (cardsx.length > 0) {
					current.addSkill("xiahui2");
					current.addGaintag(cardsx, "xiahui");
				}
			});
		},
	},
	xiahui2: {
		mark: true,
		intro: {
			content: "不能使用、打出或弃置得到的黑色牌",
		},
		mod: {
			cardDiscardable: function (card, player) {
				if (card.hasGaintag("xiahui")) return false;
			},
			cardEnabled2: function (card, player) {
				if (get.itemtype(card) == "card" && card.hasGaintag("xiahui")) return false;
			},
		},
		trigger: { player: "changeHp" },
		forced: true,
		popup: false,
		charlotte: true,
		sourceSkill: "xiahui",
		filter: function (event) {
			return event.num < 0;
		},
		content: function () {
			player.removeSkill("xiahui2");
		},
		onremove: function (player) {
			player.removeGaintag("xiahui");
		},
	},
	shanjia: {
		sync: function (player) {
			if (game.online) return;
			var history = player.actionHistory;
			var num = 0;
			for (var i = 0; i < history.length; i++) {
				for (var j = 0; j < history[i].useCard.length; j++) {
					if (get.type(history[i].useCard[j].card) == "equip") num++;
				}
			}
			player.storage.shanjia = num;
			if (num > 0) player.markSkill("shanjia");
		},
		audio: 2,
		intro: {
			content: function (storage) {
				if (storage == 0) return "未使用过装备牌";
				return "已使用过" + storage + "张装备牌";
			},
		},
		group: "shanjia2",
		trigger: { player: "phaseUseBegin" },
		frequent: true,
		filter: function (event, player) {
			lib.skill.shanjia.sync(player);
			return player.storage.shanjia > 0;
		},
		content: function () {
			"step 0";
			lib.skill.shanjia.sync(player);
			player.draw(Math.min(7, player.storage.shanjia));
			"step 1";
			player.chooseToDiscard("he", Math.min(7, player.storage.shanjia), true);
			"step 2";
			var useCard = false;
			if (result.bool && result.cards) {
				for (var i = 0; i < result.cards.length; i++) {
					if (result.cards[i].original == "e") {
						useCard = true;
						break;
					}
				}
			}
			if (useCard) {
				player.chooseUseTarget({ name: "sha" }, false, "是否视为使用一张【杀】？", "nodistance");
			}
		},
		ai: {
			threaten: function (player, target) {
				if (typeof target.storage.shanjia == "number") {
					return Math.min(2, Math.sqrt(1 + target.storage.shanjia));
				}
			},
		},
	},
	shanjia2: {
		trigger: { player: "useCard" },
		silent: true,
		sourceSkill: "shanjia",
		filter: function (event, player) {
			return get.type(event.card) == "equip";
		},
		content: function () {
			lib.skill.shanjia.sync(player);
		},
	},
	zhanyi: {
		enable: "phaseUse",
		usable: 1,
		audio: 2,
		filterCard: true,
		position: "he",
		check: function (card) {
			var player = _status.event.player;
			if (player.hp < 3) return 0;
			var type = get.type(card, "trick");
			if (type == "trick") {
				return 6 - get.value(card);
			} else if (type == "equip") {
				if (
					player.hasSha() &&
					game.hasPlayer(function (current) {
						return player.canUse("sha", current) && get.attitude(player, current) < 0 && get.effect(current, { name: "sha" }, player, player) > 0;
					})
				) {
					return 6 - get.value(card);
				}
			}
			return 0;
		},
		content: function () {
			player.loseHp();
			switch (get.type(cards[0], "trick")) {
				case "basic":
					player.addTempSkill("zhanyi_basic");
					break;
				case "equip":
					player.addTempSkill("zhanyi_equip");
					break;
				case "trick":
					player.addTempSkill("zhanyi_trick");
					player.draw(2);
					break;
			}
		},
		ai: {
			order: 9.1,
			result: {
				player: 1,
			},
		},
	},
	zhanyi_basic: {
		group: ["zhanyi_basic_sha", "zhanyi_basic_jiu", "zhanyi_basic_tao"],
		sourceSkill: "zhanyi",
	},
	zhanyi_basic_tao: {
		enable: "chooseToUse",
		filterCard: { type: "basic" },
		viewAs: { name: "tao" },
		sourceSkill: "zhanyi",
		viewAsFilter: function (player) {
			if (!player.countCards("h", { type: "basic" })) return false;
		},
		prompt: "将一张基本牌当桃使用",
		check: function (card) {
			return 8 - get.value(card);
		},
		ai: {
			skillTagFilter: function (player) {
				if (!player.countCards("h", { type: "basic" })) return false;
			},
			save: true,
		},
	},
	zhanyi_basic_sha: {
		enable: "chooseToUse",
		filterCard: { type: "basic" },
		viewAs: { name: "sha" },
		sourceSkill: "zhanyi",
		viewAsFilter: function (player) {
			if (!player.countCards("h", { type: "basic" })) return false;
		},
		prompt: "将一张基本牌当杀使用",
		check: function (card) {
			return 4 - get.value(card);
		},
		ai: {
			skillTagFilter: function (player) {
				if (!player.countCards("h", { type: "basic" })) return false;
			},
			respondSha: true,
		},
	},
	zhanyi_basic_jiu: {
		enable: "chooseToUse",
		filterCard: { type: "basic" },
		viewAs: { name: "jiu" },
		sourceSkill: "zhanyi",
		viewAsFilter: function (player) {
			if (!player.countCards("h", { type: "basic" })) return false;
		},
		prompt: "将一张基本牌当酒使用",
		check: function (card) {
			if (_status.event.type == "dying") return 1;
			return 4 - get.value(card);
		},
		ai: {
			skillTagFilter: function (player) {
				return player.countCards("h", { type: "basic" }) > 0 && player.hp <= 0;
			},
			save: true,
		},
	},
	zhanyi_equip: {
		trigger: { player: "shaBegin" },
		forced: true,
		sourceSkill: "zhanyi",
		filter: function (event, player) {
			return event.target.countCards("he") > 0;
		},
		check: function (event, player) {
			return get.attitude(player, event.target) < 0;
		},
		content: function () {
			trigger.target.chooseToDiscard("he", true, 2);
		},
	},
	zhanyi_trick: {
		mod: {
			targetInRange: function () {
				return true;
			},
		},
	},
	dingpan: {
		audio: 2,
		enable: "phaseUse",
		filter: function (event, player) {
			var num;
			var mode = get.mode();
			if (mode == "identity" || mode == "doudizhu") {
				if (mode == "identity" && _status.mode == "purple") num = player.getEnemies().length;
				else num = get.population("fan");
			} else if (mode == "versus") {
				if (!_status.mode || _status.mode != "two") num = player.getEnemies().length;
				else {
					var target = game.findPlayer(x => {
						var num = x.getFriends().length;
						return !game.hasPlayer(y => {
							return x != y && y.getFriends().length > num;
						});
					});
					num = target ? target.getFriends(true).length : 1;
				}
			} else {
				num = 1;
			}
			if ((player.getStat().skill.dingpan || 0) >= num) return false;
			return true;
		},
		filterTarget: function (card, player, target) {
			return target.countCards("e") > 0;
		},
		content: function () {
			"step 0";
			target.draw();
			"step 1";
			var goon = get.damageEffect(target, player, target) >= 0;
			if (!goon && target.hp >= 4 && get.attitude(player, target) < 0) {
				var es = target.getCards("e");
				for (var i = 0; i < es.length; i++) {
					if (get.equipValue(es[i], target) >= 8) {
						goon = true;
						break;
					}
				}
			}
			target
				.chooseControl(function () {
					if (_status.event.goon) return "选项二";
					return "选项一";
				})
				.set("goon", goon)
				.set("prompt", "定叛")
				.set("choiceList", ["令" + get.translation(player) + "弃置你装备区里的一张牌", "获得你装备区内的所有牌并受到1点伤害"]);
			"step 2";
			if (result.control == "选项一") {
				player.discardPlayerCard(target, true, "e");
				event.finish();
			} else {
				target.gain(target.getCards("e"), "gain2");
			}
			"step 3";
			game.delay(0.5);
			target.damage();
		},
		ai: {
			order: 7,
			result: {
				target: function (player, target) {
					if (get.damageEffect(target, player, target) >= 0) return 2;
					var att = get.attitude(player, target);
					if (att == 0) return 0;
					var es = target.getCards("e");
					if (att > 0 && (target.countCards("h") > 2 || target.needsToDiscard(1))) return 0;
					if (es.length == 1 && att > 0) return 0;
					for (var i = 0; i < es.length; i++) {
						var val = get.equipValue(es[i], target);
						if (val <= 4) {
							if (att > 0) {
								return 1;
							}
						} else if (val >= 7) {
							if (att < 0) {
								return -1;
							}
						}
					}
					return 0;
				},
			},
		},
	},
	hongde: {
		audio: 2,
		trigger: {
			player: ["loseAfter", "gainAfter"],
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		direct: true,
		filter: function (event, player) {
			var num = event.getl(player).cards2.length;
			if (event.getg) num = Math.max(num, event.getg(player).length);
			return num > 1;
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("hongde"), "令一名其他角色摸一张牌", function (card, player, target) {
					return target != player;
				})
				.set("ai", function (target) {
					return get.attitude(get.player(), target);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("hongde", result.targets);
				result.targets[0].draw();
			}
		},
	},
	ziyuan: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterCard: function (card) {
			var num = 0;
			for (var i = 0; i < ui.selected.cards.length; i++) {
				num += get.number(ui.selected.cards[i]);
			}
			return get.number(card) + num <= 13;
		},
		complexCard: true,
		selectCard: function () {
			var num = 0;
			for (var i = 0; i < ui.selected.cards.length; i++) {
				num += get.number(ui.selected.cards[i]);
			}
			if (num == 13) return ui.selected.cards.length;
			return ui.selected.cards.length + 2;
		},
		discard: false,
		lose: false,
		delay: false,
		filterTarget: function (card, player, target) {
			return player != target;
		},
		check: function (card) {
			var num = 0;
			for (var i = 0; i < ui.selected.cards.length; i++) {
				num += get.number(ui.selected.cards[i]);
			}
			if (num + get.number(card) == 13) return 9 - get.value(card);
			if (ui.selected.cards.length == 0) {
				var cards = _status.event.player.getCards("h");
				for (var i = 0; i < cards.length; i++) {
					for (var j = i + 1; j < cards.length; j++) {
						if (cards[i].number + cards[j].number == 13) {
							if (cards[i] == card || cards[j] == card) return 8.5 - get.value(card);
						}
					}
				}
			}
			return 0;
		},
		content: function () {
			player.give(cards, target, "give");
			target.recover();
		},
		ai: {
			order: function (skill, player) {
				if (
					game.hasPlayer(function (current) {
						return current.hp < current.maxHp && current != player && get.recoverEffect(current, player, player) > 0;
					})
				) {
					return 10;
				}
				return 1;
			},
			result: {
				player: function (player, target) {
					if (get.attitude(player, target) < 0) return -1;
					var eff = get.recoverEffect(target, player, player);
					if (eff < 0) return 0;
					if (eff > 0) {
						if (target.hp == 1) return 3;
						return 2;
					}
					if (player.needsToDiscard()) return 1;
					return 0;
				},
			},
			threaten: 1.3,
		},
	},
	jugu: {
		audio: 2,
		mod: {
			maxHandcard: function (player, num) {
				return num + player.maxHp;
			},
		},
		trigger: { global: "phaseBefore", player: "enterGame" },
		forced: true,
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		content: function () {
			player.draw(player.maxHp);
		},
	},
	tuifeng: {
		audio: 2,
		trigger: { player: "damageEnd" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("he") > 0;
		},
		content: function () {
			"step 0";
			player.chooseCard(get.prompt2("tuifeng"), "he", [1, trigger.num]).set("ai", function (card) {
				if (card.name == "du") return 20;
				return 7 - get.useful(card);
			});
			"step 1";
			if (result.bool) {
				player.logSkill("tuifeng");
				player.addToExpansion(result.cards, player, "give").gaintag.add("tuifeng");
			}
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		marktext: "锋",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		group: "tuifeng2",
		ai: {
			threaten: 0.8,
			maixie: true,
			maixie_hp: true,
			notemp: true,
		},
	},
	tuifeng2: {
		audio: "tuifeng",
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		sourceSkill: "tuifeng",
		filter: function (event, player) {
			return player.getExpansions("tuifeng").length > 0;
		},
		content: function () {
			var cards = player.getExpansions("tuifeng");
			player.draw(2 * cards.length);
			player.addTempSkill("tuifeng3");
			player.addMark("tuifeng3", cards.length, false);
			player.loseToDiscardpile(cards);
		},
	},
	tuifeng3: {
		mod: {
			cardUsable: function (card, player, num) {
				if (card.name == "sha") return num + player.countMark("tuifeng3");
			},
		},
		onremove: true,
		charlotte: true,
	},
	weidi: {
		available(mode) {
			return mode == "identity" || (mode == "versus" && _status.mode == "four");
		},
		init(player) {
			const list = [];
			const zhu = get.zhu(player);
			if (zhu && zhu != player && zhu.skills) {
				for (var i = 0; i < zhu.skills.length; i++) {
					if (lib.skill[zhu.skills[i]] && lib.skill[zhu.skills[i]].zhuSkill) {
						list.push(zhu.skills[i]);
					}
				}
			}
			player.addAdditionalSkill("weidi", list);
			game.broadcastAll(function (list) {
				game.expandSkills(list);
				for (var i of list) {
					var info = lib.skill[i];
					if (!info) continue;
					if (!info.audioname2) info.audioname2 = {};
					info.audioname2.yuanshu = "weidi";
				}
			}, list);
		},
		trigger: { global: ["gameStart", "changeSkillsAfter"] },
		forced: true,
		audio: 2,
		filter: function (event, player) {
			const mode = get.mode();
			if (mode != "identity" && (mode != "versus" || _status.mode != "four")) return false;
			const zhu = get.zhu(player);
			if (!zhu || zhu == player) return false;
			if (event.name == "gameStart") return true;
			return (
				event.player == zhu &&
				(event.addSkill.some(skill => {
					return lib.skill[skill] && lib.skill[skill].zhuSkill;
				}) ||
					event.addSkill.some(skill => {
						return lib.skill[skill] && lib.skill[skill].zhuSkill;
					}))
			);
		},
		async content(event, trigger, player) {
			lib.skill.weidi.init(player);
		},
	},
	zhenlue: {
		audio: 2,
		trigger: { player: "useCard" },
		forced: true,
		filter: function (event) {
			return get.type(event.card) == "trick";
		},
		content: function () {
			trigger.nowuxie = true;
		},
		mod: {
			targetEnabled: function (card, player, target) {
				if (get.type(card) == "delay") {
					return false;
				}
			},
		},
	},
	jianshu: {
		audio: 2,
		unique: true,
		limited: true,
		enable: "phaseUse",
		animationColor: "thunder",
		skillAnimation: "epic",
		filter: function (event, player) {
			return !player.storage.jianshu && player.countCards("h", { color: "black" }) > 0;
		},
		init: function (player) {
			player.storage.jianshu = false;
		},
		filterTarget: function (card, player, target) {
			if (target == player) return false;
			if (ui.selected.targets.length) {
				return ui.selected.targets[0] != target && !ui.selected.targets[0].hasSkillTag("noCompareSource") && target.countCards("h") && !target.hasSkillTag("noCompareTarget");
			}
			return true;
		},
		filterCard: { color: "black" },
		mark: true,
		discard: false,
		lose: false,
		delay: false,
		check: function (card) {
			if (_status.event.player.hp == 1) return 8 - get.value(card);
			return 6 - get.value(card);
		},
		selectTarget: 2,
		multitarget: true,
		content: function () {
			"step 0";
			player.awakenSkill("jianshu");
			player.storage.jianshu = true;
			player.give(cards, targets[0], "give");
			"step 1";
			if (targets[0].canCompare(targets[1])) targets[0].chooseToCompare(targets[1]);
			else event.finish();
			"step 2";
			if (result.bool) {
				targets[0].chooseToDiscard("he", 2, true);
				targets[1].loseHp();
			} else if (result.tie) {
				targets[0].loseHp();
				targets[1].loseHp();
			} else {
				targets[1].chooseToDiscard("he", 2, true);
				targets[0].loseHp();
			}
		},
		intro: {
			content: "limited",
		},
		ai: {
			expose: 0.4,
			order: 4,
			result: {
				target: function (player, target) {
					if (player.hasUnknown()) return 0;
					if (ui.selected.targets.length) return -1;
					return -0.5;
				},
			},
		},
	},
	yongdi: {
		audio: 2,
		audioname: ["xinping"],
		unique: true,
		limited: true,
		trigger: { player: "phaseZhunbeiBegin" },
		animationColor: "thunder",
		skillAnimation: "legend",
		mark: true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2("yongdi"), (card, player, target) => {
					if (player === target) return false;
					return target.hasSex("male") || target.name == "key_yuri";
				})
				.set("ai", target => {
					if (!_status.event.goon) return 0;
					let player = _status.event.player;
					let att = get.attitude(player, target);
					if (att <= 1) return 0;
					let mode = get.mode();
					if (mode == "identity" || (mode == "versus" && (_status.mode == "four" || _status.mode == "guandu"))) {
						if (
							target.getStockSkills(true, true).some(i => {
								if (target.hasSkill(i)) return false;
								let info = get.info(i);
								return info && info.zhuSkill;
							})
						)
							return att * 2;
					}
					return att;
				})
				.set("goon", !player.hasUnknown(Math.round(game.players.length / 4 - 0.2)))
				.forResult();
		},
		async content(event, trigger, player) {
			player.awakenSkill("yongdi");
			let target = event.targets[0],
				mode = get.mode();
			if (mode !== "identity" || player.identity !== "nei") player.addExpose(0.25);
			target.gainMaxHp();
			target.recover();
			let skills = target.getStockSkills(true, true).filter(skill => {
				if (target.hasSkill(skill)) return false;
				let info = get.info(skill);
				return info && info.zhuSkill;
			});
			if (skills.length) target.addSkills(skills);
		},
	},
	regushe: {
		audio: "gushe",
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			return player.canCompare(target);
		},
		selectTarget: [1, 3],
		filter: function (event, player) {
			return player.countMark("regushe") + player.countMark("regushe2") < 7 && player.countCards("h") > 0;
		},
		multitarget: true,
		multiline: true,
		content: function () {
			player.addTempSkill("regushe2");
			player.chooseToCompare(targets).callback = lib.skill.regushe.callback;
		},
		intro: {
			name: "饶舌",
			content: "mark",
		},
		callback: function () {
			"step 0";
			if (event.winner !== player) {
				target.chat(lib.skill.gushe.chat[player.countMark("regushe")]);
				game.delay();
				player.addMark("regushe", 1);
				if (player.countMark("regushe") >= 7) {
					player.die();
				}
			} else player.addMark("regushe2", 1, false);
			"step 1";
			if (event.winner !== player) {
				player.chooseToDiscard("he", "弃置一张牌，或摸一张牌").set("ai", function () {
					return -1;
				});
			} else event.goto(3);
			"step 2";
			if (!result.bool) player.draw();
			"step 3";
			if (event.winner !== target) {
				target
					.chooseToDiscard("he", "弃置一张牌，或令" + get.translation(player) + "摸一张牌")
					.set("ai", function (card) {
						if (_status.event.goon) return 6 - get.value(card);
						return 0;
					})
					.set("goon", get.attitude(target, player) < 0);
			} else event.finish();
			"step 4";
			if (!result.bool) player.draw();
		},
		ai: {
			order: 7,
			result: {
				target: function (player, target) {
					var num = ui.selected.targets.length + 1;
					if (num + player.countMark("regushe") <= 6) return -1;
					var hs = player.getCards("h");
					for (var i = 0; i < hs.length; i++) {
						if (get.value(hs[i]) <= 6) {
							switch (hs[i].number) {
								case 13:
									return -1;
								case 12:
									if (player.countMark("regushe") + num <= 8) return -1;
									break;
								case 11:
									if (player.countMark("regushe") + num <= 7) return -1;
									break;
								default:
									if (hs[i].number > 5 && player.countMark("regushe") + num <= 6) return -1;
							}
						}
					}
					return 0;
				},
			},
		},
		marktext: "饶",
	},
	regushe2: {
		charlotte: true,
		onremove: true,
	},
	rejici: {
		audio: "jici",
		trigger: {
			player: "compare",
			target: "compare",
		},
		forced: true,
		filter: function (event, player) {
			// if(player!=event.target&&event.iwhile) return false;
			return (player == event.player ? event.num1 : event.num2) <= player.countMark("regushe");
		},
		content: function () {
			if (player == trigger.target || !trigger.iwhile) {
				trigger[player == trigger.player ? "num1" : "num2"] += player.countMark("regushe");
				game.log(player, "的拼点牌点数+" + player.countMark("regushe"));
			}
			game.delayx();
			// var cards=[trigger.card1];
			// if(trigger.cardlist) cards.addArray(trigger.cardlist);
			// else cards.push(trigger.card2);
			// cards.sort(function(a,b){
			// 	return get.number(b)-get.number(a);
			// });
			// var num=get.number(cards[0]);
			// for(var i=1;i<cards.length;i++){
			// 	if(get.number(cards[i])<num){
			// 		cards.splice(i);
			// 		break;
			// 	}
			// }
			// cards=cards.filterInD();
			var cards = [];
			if (trigger.num1 > trigger.num2) cards.push(trigger.card1);
			if (trigger.num1 < trigger.num2) cards.push(trigger.card2);
			cards = cards.filterInD();
			if (cards.length) player.gain(cards, "gain2");
		},
		group: "rejici2",
		ai: {
			combo: "regushe",
		},
	},
	rejici2: {
		audio: "jici",
		trigger: { player: "die" },
		forced: true,
		forceDie: true,
		skillAnimation: true,
		animationColor: "water",
		sourceSkill: "rejici",
		filter: function (event, player) {
			return event.source && event.source.isIn();
		},
		logTarget: "source",
		content: function () {
			var num = 7 - player.countMark("regushe");
			if (num > 0) trigger.source.chooseToDiscard(num, true, "he");
			trigger.source.loseHp();
		},
	},
	gushe: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return player.canCompare(target);
		},
		selectTarget: [1, 3],
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		multitarget: true,
		multiline: true,
		content: function () {
			player.chooseToCompare(targets).callback = lib.skill.gushe.callback;
		},
		intro: {
			name: "饶舌",
			content: "mark",
		},
		chat: ["粗鄙之语", "天地不容", "谄谀之臣", "皓首匹夫，苍髯老贼", "二臣贼子", "断脊之犬", "我从未见过有如此厚颜无耻之人！"],
		callback: function () {
			"step 0";
			if (event.winner !== player) {
				target.chat(lib.skill.gushe.chat[player.countMark("gushe")]);
				game.delay();
				player.addMark("gushe", 1);
				if (player.countMark("gushe") >= 7) {
					player.die();
				}
			}
			"step 1";
			if (event.winner !== player) {
				player.chooseToDiscard("he", "弃置一张牌，或摸一张牌").set("ai", function () {
					return -1;
				});
			} else event.goto(3);
			"step 2";
			if (!result.bool) {
				player.draw();
			}
			"step 3";
			if (event.winner !== target) {
				target
					.chooseToDiscard("he", "弃置一张牌，或令" + get.translation(player) + "摸一张牌")
					.set("ai", function (card) {
						if (_status.event.goon) return 6 - get.value(card);
						return 0;
					})
					.set("goon", get.attitude(target, player) < 0);
			} else event.finish();
			"step 4";
			if (!result.bool) player.draw();
		},
		ai: {
			order: 7,
			result: {
				target: function (player, target) {
					var num = ui.selected.targets.length + 1;
					if (num > 3) num = 3;
					var hs = player.getCards("h");
					for (var i = 0; i < hs.length; i++) {
						if (get.value(hs[i]) <= 6) {
							switch (hs[i].number) {
								case 13:
									return -1;
								case 12:
									if (player.countMark("gushe") + num <= 8) return -1;
									break;
								case 11:
									if (player.countMark("gushe") + num <= 7) return -1;
									break;
								default:
									if (hs[i].number > 5 && player.countMark("gushe") + num <= 6) return -1;
							}
						}
					}
					return 0;
				},
			},
		},
	},
	jici: {
		audio: 2,
		trigger: { player: "compare" },
		filter: function (event, player) {
			return event.getParent().name == "gushe" && !event.iwhile && event.num1 <= player.countMark("gushe");
		},
		content: function () {
			if (trigger.num1 < player.countMark("gushe")) {
				trigger.num1 += player.countMark("gushe");
			} else {
				player.getStat().skill.gushe--;
			}
		},
		ai: {
			combo: "gushe",
		},
	},
	juesi: {
		audio: 2,
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countCards("h", "sha") > 0;
		},
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("he") > 0 && player.inRange(target);
		},
		filterCard: { name: "sha" },
		content: function () {
			"step 0";
			target.chooseToDiscard("he", true);
			"step 1";
			if (target.hp >= player.hp && result.bool && result.cards[0].name != "sha") {
				player.useCard({ name: "juedou", isCard: true }, target);
			}
		},
		ai: {
			order: 2,
			result: {
				target: function (player, target) {
					if (get.effect(target, { name: "juedou" }, player, player) <= 0) {
						return 0;
					}
					if (target.hp < player.hp) {
						if (player.countCards("h") > player.hp) return -0.1;
						return 0;
					}
					var hs1 = target.getCards("h", "sha");
					var hs2 = player.getCards("h", "sha");
					if (hs1.length > hs2.length) {
						return 0;
					}
					var hsx = target.getCards("h");
					if (hsx.length > 2 && hs2.length <= 1 && hsx[0].number < 6) {
						return 0;
					}
					if (hsx.length > 3 && hs2.length <= 1) {
						return 0;
					}
					if (hs1.length > hs2.length - 1 && hs1.length > 0 && (hs2.length <= 1 || hs1[0].number > hs2[0].number)) {
						return 0;
					}
					return -1;
				},
			},
		},
	},
	shefu: {
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		audio: 2,
		init: function (player) {
			if (!player.storage.shefu) player.storage.shefu = [];
			if (!player.storage.shefu2) player.storage.shefu2 = [];
		},
		filter: function (event, player) {
			return player.countCards("he") > 0;
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		intro: {
			content: "cards",
			onunmark: function (storage, player) {
				player.storage.shefu = [];
				player.storage.shefu2 = [];
			},
			mark: function (dialog, content, player) {
				if (content && content.length) {
					dialog.addAuto(content);
					if (player.isUnderControl(true)) {
						var str = "";
						for (var i = 0; i < player.storage.shefu2.length; i++) {
							str += get.translation(player.storage.shefu2[i]);
							if (i < player.storage.shefu2.length - 1) {
								str += "、";
							}
						}
						dialog.add('<div class="text center">' + str + "</div>");
					}
				}
			},
		},
		content: function () {
			"step 0";
			var list1 = [],
				list2 = [],
				list3 = [];
			for (var i = 0; i < lib.inpile.length; i++) {
				var type = get.type(lib.inpile[i]);
				if (type == "basic") {
					list1.push(["基本", "", lib.inpile[i]]);
				} else if (type == "trick") {
					list2.push(["锦囊", "", lib.inpile[i]]);
				} else if (type == "delay") {
					list3.push(["锦囊", "", lib.inpile[i]]);
				}
			}
			player
				.chooseButton([get.prompt("shefu"), [list1.concat(list2).concat(list3), "vcard"]])
				.set("filterButton", function (button) {
					var player = _status.event.player;
					if (player.storage.shefu2 && player.storage.shefu2.includes(button.link[2])) return false;
					return true;
				})
				.set("ai", function (button) {
					var rand = _status.event.rand;
					switch (button.link[2]) {
						case "sha":
							return 5 + rand[1];
						case "tao":
							return 4 + rand[2];
						case "lebu":
							return 3 + rand[3];
						case "shan":
							return 4.5 + rand[4];
						case "wuzhong":
							return 4 + rand[5];
						case "shunshou":
							return 3 + rand[6];
						case "nanman":
							return 2 + rand[7];
						case "wanjian":
							return 2 + rand[8];
						default:
							return rand[0];
					}
				})
				.set("rand", [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
			"step 1";
			if (result.bool) {
				event.cardname = result.links[0][2];
				player.logSkill("shefu");
				player.chooseCard("he", "选择一张牌作为“伏兵”", true);
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				var card = result.cards[0];
				event.card = card;
				player.addToExpansion(card, player, "give").gaintag.add("shefu");
			}
			"step 3";
			if (player.getExpansions("shefu").includes(event.card)) {
				player.storage.shefu.push(card);
				player.storage.shefu2.push(event.cardname);
				if (player.isOnline2()) {
					player.send(function (storage) {
						game.me.storage.shefu2 = storage;
					}, player.storage.shefu2);
				}
				player.syncStorage("shefu");
				player.markSkill("shefu");
			}
		},
		group: ["shefu2"],
	},
	shefu2: {
		trigger: { global: ["useCard"] },
		//priority:15,
		audio: "shefu",
		sourceSkill: "shefu",
		filter: function (event, player) {
			if (_status.currentPhase == player || event.player == player) return false;
			return (
				player.storage.shefu2 &&
				player.storage.shefu2.includes(event.card.name) &&
				event.player.getHistory("lose", function (evt) {
					return evt.getParent() == event && evt.hs && evt.hs.length == event.cards.length;
				}).length
			);
		},
		direct: true,
		content: function () {
			"step 0";
			var effect = 0;
			if (trigger.card.name == "wuxie" || trigger.card.name == "shan") {
				if (get.attitude(player, trigger.player) < -1) {
					effect = -1;
				}
			} else if (trigger.targets && trigger.targets.length) {
				for (var i = 0; i < trigger.targets.length; i++) {
					effect += get.effect(trigger.targets[i], trigger.card, trigger.player, player);
				}
			}
			var str = "设伏：是否令" + get.translation(trigger.player);
			if (trigger.targets && trigger.targets.length) {
				str += "对" + get.translation(trigger.targets);
			}
			str += "使用的" + get.translation(trigger.card) + "失效？";
			var next = player.chooseBool(str, function () {
				var player = _status.event.player;
				var trigger = _status.event.getTrigger();
				if (_status.event.effect < 0) {
					if (trigger.card.name == "sha") {
						var target = trigger.targets[0];
						if (target == player) {
							return !player.countCards("h", "shan");
						} else {
							return target.hp == 1 || (target.countCards("h") <= 2 && target.hp <= 2);
						}
					} else {
						return true;
					}
				}
				return false;
			});
			next.set("effect", effect);
			"step 1";
			if (result.bool) {
				player.logSkill("shefu", trigger.player);
				var index = player.storage.shefu2.indexOf(trigger.card.name);
				if (index != -1) {
					var card = player.storage.shefu[index];
					player.loseToDiscardpile(card);
					player.storage.shefu.splice(index, 1);
					player.storage.shefu2.splice(index, 1);
					if (player.storage.shefu.length == 0) {
						player.unmarkSkill("shefu");
					} else {
						player.syncStorage("shefu");
						player.markSkill("shefu");
						if (player.isOnline2()) {
							player.send(function (storage) {
								game.me.storage.shefu2 = storage;
							}, player.storage.shefu2);
						}
					}
				}
				trigger.targets.length = 0;
				trigger.all_excluded = true;
				if (trigger.player == _status.currentPhase) trigger.player.addTempSkill("baiban");
			}
		},
		ai: {
			threaten: 1.8,
			expose: 0.3,
		},
	},
	benyu: {
		audio: 2,
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			if (!event.source) return false;
			var nh1 = player.countCards("h");
			var nh2 = event.source.countCards("h");
			var eh = player.countCards("e");
			if (nh1 + eh > nh2 && event.source.isIn()) return true;
			if (nh1 < Math.min(5, nh2)) return true;
		},
		direct: true,
		content: function () {
			"step 0";
			var num1 = player.countCards("h");
			var num2 = trigger.source.countCards("h");
			var eh = player.countCards("he", function (card) {
				return lib.filter.cardDiscardable(card, player, "benyu");
			});
			var bool1 = false,
				bool2 = false;
			if (num1 < Math.min(num2, 5)) bool1 = true;
			if (eh > num2 && trigger.source.isIn()) bool2 = true;
			if (bool1 && bool2) {
				event.chosen = true;
				player
					.chooseControl("cancel2")
					.set("prompt", get.prompt("benyu", trigger.source))
					.set("choiceList", ["将手牌摸至" + get.cnNumber(Math.min(num2, 5)) + "张", "弃置至少" + get.cnNumber(num2 + 1) + "张牌并对其造成1点伤害"]);
			} else if (bool2) event.goto(3);
			"step 1";
			if (event.chosen) {
				if (result.control == "cancel2") event.finish();
				else if (result.index == 1) event.goto(3);
				else event._result = { bool: true };
			} else player.chooseBool(get.prompt("benyu", trigger.source), "将手牌摸至" + get.cnNumber(Math.min(trigger.source.countCards("h"), 5)) + "张");
			"step 2";
			if (result.bool) {
				player.logSkill("benyu", trigger.source);
				player.drawTo(Math.min(trigger.source.countCards("h"), 5));
			}
			event.finish();
			"step 3";
			var num = trigger.source.countCards("h") + 1;
			var args = [[num, player.countCards("he")], "he"];
			if (event.chosen) {
				player.logSkill("benyu", trigger.source);
				args.push(true);
			} else {
				args.push(get.prompt("benyu", trigger.source));
				args.push("弃置" + get.cnNumber(num) + "张牌并对其造成1点伤害");
			}
			var next = player.chooseToDiscard.apply(player, args);
			if (!event.chosen) next.logSkill = ["benyu", trigger.source];
			next.set("ai", function (card) {
				var trigger = _status.event.getTrigger();
				var player = _status.event.player;
				if (ui.selected.cards.length >= _status.event.num) {
					return -1;
				}
				if (get.damageEffect(trigger.source, player, player) > 0 && (get.value(card, player) < 0 || _status.event.num <= 2)) {
					return 8 - get.value(card);
				}
				return -1;
			});
			next.set("num", num);
			"step 4";
			if (result.bool) trigger.source.damage();
		},
	},
	jili: {
		audio: 2,
		trigger: {
			global: "useCardToTarget",
		},
		forced: true,
		check: function (event, player) {
			return get.effect(player, event.card, event.player, player) > 0;
		},
		filter: function (event, player) {
			if (get.color(event.card) != "red") return false;
			if (!event.targets) return false;
			if (event.player == player) return false;
			if (event.targets.includes(player)) return false;
			if (get.info(event.card).multitarget) return false;
			var type = get.type(event.card);
			if (type != "basic" && type != "trick") return false;
			if (lib.filter.targetEnabled2(event.card, event.player, player)) {
				for (var i = 0; i < event.targets.length; i++) {
					if (get.distance(event.targets[i], player) <= 1) return true;
				}
			}
			return false;
		},
		autodelay: true,
		content: function () {
			trigger.getParent().targets.add(player);
			trigger.player.line(player, "green");
		},
	},
	zhidao: {
		audio: 2,
		mod: {
			aiOrder: function (player, card, num) {
				if (num > 0 && !player.hasSkill("zhidao2") && !get.tag(card, "damage") && (!lib.filter.targetEnabled(card, player, player) || get.effect(player, card, player) <= 0)) return num + 10;
			},
		},
		trigger: { source: "damageSource" },
		filter: function (event, player) {
			if (event._notrigger.includes(event.player)) return false;
			return _status.currentPhase == player && event.player.isIn() && event.player.countCards("hej") > 0 && event.player != player && !player.hasSkill("zhidao2");
		},
		forced: true,
		content: function () {
			var num = 0;
			if (trigger.player.countCards("h")) num++;
			if (trigger.player.countCards("e")) num++;
			if (trigger.player.countCards("j")) num++;
			if (num) {
				player.gainPlayerCard(trigger.player, num, "hej", true).set("filterButton", function (button) {
					for (var i = 0; i < ui.selected.buttons.length; i++) {
						if (get.position(button.link) == get.position(ui.selected.buttons[i].link)) return false;
					}
					return true;
				});
			}
			player.addTempSkill("zhidao2");
		},
	},
	zhidao2: {
		mod: {
			playerEnabled: function (card, player, target) {
				if (player != target) return false;
			},
		},
	},
	luanzhan: {
		mod: {
			selectTarget: function (card, player, range) {
				if (!player.storage.luanzhan) return;
				if (range[1] == -1) return;
				if (card.name == "sha") range[1] += player.storage.luanzhan;
				if (get.color(card) == "black" && get.type(card) == "trick") {
					var info = get.info(card);
					if (info.multitarget) return false;
					range[1] += player.storage.luanzhan;
				}
			},
		},
		trigger: { source: "damageSource" },
		audio: 2,
		forced: true,
		mark: true,
		intro: {
			content: function (storage) {
				return "可以额外指定" + storage + "个目标";
			},
		},
		init: function (player) {
			player.storage.luanzhan = 0;
		},
		init2: function (player) {
			player.markSkill("luanzhan");
		},
		content: function () {
			if (typeof player.storage.luanzhan == "number") {
				player.storage.luanzhan += trigger.num;
			} else {
				player.storage.luanzhan = trigger.num;
			}
			if (player.hasSkill("luanzhan")) {
				player.markSkill("luanzhan");
			}
		},
		group: "luanzhan_cancel",
		subSkill: {
			cancel: {
				audio: "luanzhan",
				trigger: { player: "useCard" },
				forced: true,
				filter: function (event, player) {
					if (!player.storage.luanzhan) return false;
					var check = false;
					var card = event.card;
					if (card.name == "sha") {
						check = true;
					} else if (get.color(card) == "black" && get.type(card) == "trick") {
						var info = get.info(card);
						if (!info.multitarget) {
							check = true;
							if (info.selectTarget == -1) {
								check = false;
							} else if (Array.isArray(info.selectTarget) && info.selectTarget[1] == -1) {
								check = false;
							}
						}
					}
					if (check && event.targets && event.targets.length < player.storage.luanzhan) {
						return true;
					}
					return false;
				},
				content: function () {
					player.storage.luanzhan = 0;
					player.markSkill("luanzhan");
				},
			},
		},
	},
	xinzhengnan: {
		audio: "zhengnan",
		trigger: { global: "dying" },
		frequent: true,
		filter: function (event, player) {
			return !player.storage.xinzhengnan || !player.storage.xinzhengnan.includes(event.player);
		},
		content: function () {
			"step 0";
			if (!player.storage.xinzhengnan) player.storage.xinzhengnan = [];
			player.storage.xinzhengnan.add(trigger.player);
			player.storage.xinzhengnan.sortBySeat();
			player.markSkill("xinzhengnan");
			player.recover();
			var list = [];
			if (!player.hasSkill("new_rewusheng")) {
				list.push("new_rewusheng");
			}
			if (!player.hasSkill("xindangxian")) {
				list.push("xindangxian");
			}
			if (!player.hasSkill("rezhiman")) {
				list.push("rezhiman");
			}
			if (list.length) {
				player.draw();
				event.list = list;
			} else {
				player.draw(3);
				event.finish();
			}
			"step 1";
			if (event.list.length == 1) event._result = { control: event.list[0] };
			else
				player
					.chooseControl(event.list)
					.set("prompt", "征南：选择获得下列技能中的一个")
					.set("ai", function () {
						if (event.list.includes("xindangxian")) return "xindangxian";
						return 0;
					});
			"step 2";
			if (result.control == "xindangxian") player.storage.xinfuli = true;
			player.addSkills(result.control);
		},
		ai: { threaten: 2.5 },
		intro: {
			content: "已因$发动过技能",
		},
		derivation: ["new_rewusheng", "xindangxian", "rezhiman"],
	},
	zhengnan: {
		derivation: ["new_rewusheng", "dangxian", "rezhiman"],
		audio: 2,
		trigger: { global: "dieAfter" },
		frequent: true,
		content: function () {
			"step 0";
			player.draw(3);
			"step 1";
			var list = lib.skill.zhengnan.derivation.filter(skill => !player.hasSkill(skill));
			if (list.length == 1) event._result = { control: list[0] };
			else if (list.length > 0) {
				player
					.chooseControl(list)
					.set("prompt", "选择获得一项技能")
					.set("ai", function () {
						if (_status.event.controls.includes("dangxian")) return "dangxian";
						return _status.event.controls[0];
					});
			} else event.finish();
			"step 2";
			if (result.control) {
				player.addSkills(result.control);
			}
		},
		ai: { threaten: 2 },
	},
	wusheng_guansuo: { audio: 1 },
	dangxian_guansuo: { audio: 1 },
	zhiman_guansuo: { audio: 1 },
	xiefang: {
		mod: {
			globalFrom: function (from, to, distance) {
				return (
					distance -
					game.countPlayer(function (current) {
						return current.hasSex("female");
					})
				);
			},
		},
	},
	qizhi: {
		audio: 2,
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			if (!event.targets || !event.isFirstTarget) return false;
			if (_status.currentPhase != player) return false;
			var type = get.type(event.card, "trick");
			if (type != "basic" && type != "trick") return false;
			if (event.noai) return false;
			return game.hasPlayer(function (target) {
				return !event.targets.includes(target) && target.countCards("he") > 0;
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt(event.name.slice(0, -"_cost".length)), "弃置一名角色的一张牌，然后其摸一张牌", function (card, player, target) {
					return !_status.event.targets.includes(target) && target.countCards("he") > 0;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					if (target == player) return 2;
					if (get.attitude(player, target) <= 0) {
						return 1;
					}
					return 0.5;
				})
				.set("targets", trigger.targets)
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.getHistory("custom").push({ [event.name]: true });
			await player.discardPlayerCard(target, true, "he");
			await target.draw();
		},
	},
	jinqu: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		check: function (event, player) {
			return (
				player.getHistory("custom", function (evt) {
					return evt.qizhi == true;
				}).length >= player.countCards("h")
			);
		},
		prompt: function (event, player) {
			var num = player.getHistory("custom", function (evt) {
				return evt.qizhi == true;
			}).length;
			return "进趋：是否摸两张牌并将手牌弃置至" + get.cnNumber(num) + "张？";
		},
		content: function () {
			"step 0";
			player.draw(2);
			"step 1";
			var dh =
				player.countCards("h") -
				player.getHistory("custom", function (evt) {
					return evt.qizhi == true;
				}).length;
			if (dh > 0) {
				player.chooseToDiscard(dh, true);
			}
		},
		ai: { combo: "qizhi" },
	},
	jiaozi: {
		audio: 2,
		trigger: { player: "damageBegin3", source: "damageBegin1" },
		forced: true,
		filter: function (event, player) {
			return player.isMaxHandcard(true);
		},
		content: function () {
			trigger.num++;
		},
		ai: { presha: true },
	},
	jiqiao: {
		audio: 2,
		trigger: { player: "phaseUseBegin" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("he", { type: "equip" }) > 0;
		},
		content: function () {
			"step 0";
			player
				.chooseToDiscard(get.prompt2("jiqiao"), [1, player.countCards("he", { type: "equip" })], "he", function (card) {
					return get.type(card) == "equip";
				})
				.set("ai", function (card) {
					if (card.name == "bagua") return 10;
					return 7 - get.value(card);
				}).logSkill = "jiqiao";
			"step 1";
			if (result.bool) {
				event.cards = get.cards(2 * result.cards.length);
				player.showCards(event.cards);
			} else {
				event.finish();
			}
			"step 2";
			var gained = [];
			var tothrow = [];
			for (var i = 0; i < event.cards.length; i++) {
				if (get.type(event.cards[i]) != "equip") {
					gained.push(event.cards[i]);
				} else {
					tothrow.push(event.cards[i]);
				}
			}
			player.gain(gained, "gain2");
			game.cardsDiscard(tothrow);
		},
		ai: {
			threaten: 1.5,
		},
	},
	linglong: {
		audio: 2,
		trigger: {
			player: ["loseAfter", "disableEquipAfter", "enableEquipAfter"],
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter", "phaseBefore"],
		},
		forced: true,
		onremove: true,
		derivation: "reqicai",
		filter: function (event, player) {
			if (event.name == "disableEquip" || event.name == "enableEquip") {
				if (!event.slots.includes("equip5")) return false;
			} else if (event.name != "phase" && (event.name != "equip" || event.player != player)) {
				var evt = event.getl(player);
				if (!evt || !evt.es || !evt.es.some(i => get.subtypes(i).includes("equip5"))) return false;
			}
			let skills = player.additionalSkills["linglong"];
			return (skills && skills.length > 0) != player.hasEmptySlot(5);
		},
		direct: true,
		content: function () {
			player.removeAdditionalSkill("linglong");
			if (player.hasEmptySlot(5)) {
				player.addAdditionalSkill("linglong", ["reqicai"]);
			}
		},
		group: "linglong_bagua",
		mod: {
			cardUsable: function (card, player, num) {
				if (card.name == "sha" && player.hasEmptySlot(1)) return num + 1;
			},
			maxHandcard: function (player, num) {
				if (!player.hasEmptySlot(3) || !player.hasEmptySlot(4)) return;
				return num + 1;
			},
			/*targetInRange: function (card, player, target, now) {
				if (!player.hasEmptySlot(5)) return;
				var type = get.type(card);
				if (type == "trick" || type == "delay") return true;
			},
			canBeDiscarded: function (card, source, player) {
				if (!player.hasEmptySlot(5)) return;
				if (get.position(card) == "e" && get.subtypes(card).some(slot => slot == "equip2" || slot == "equip5")) return false;
			},
			cardDiscardable:function (card,player){
				if(player.getEquip(5)) return;
				if(get.position(card)=='e') return false;
			},*/
		},
	},
	linglong_bagua: {
		audio: "linglong",
		audioname2: { re_jsp_huangyueying: "relinglong" },
		inherit: "bagua_skill",
		sourceSkill: "linglong",
		filter: function (event, player) {
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
				target: function (card, player, target) {
					if (player == target && get.subtype(card) == "equip2") {
						if (get.equipValue(card) <= 7.5) return 0;
					}
					if (target.getEquip(2)) return;
					return lib.skill.bagua_skill.ai.effect.target.apply(this, arguments);
				},
			},
		},
	},
	zhenwei: {
		audio: 2,
		audioname: ["re_wenpin"],
		trigger: {
			global: "useCardToTarget",
		},
		direct: true,
		filter: function (event, player) {
			if (player == event.target || player == event.player) return false;
			if (!player.countCards("he")) return false;
			if (event.targets.length > 1) return false;
			if (!event.target) return false;
			if (event.target.hp >= player.hp) return false;

			var card = event.card;
			if (card.name == "sha") return true;
			if (get.color(card) == "black" && get.type(card, "trick") == "trick") return true;
			return false;
		},
		content: function () {
			"step 0";
			var save = false;
			if (get.attitude(player, trigger.target) > 2) {
				if (trigger.card.name == "sha") {
					if (player.countCards("h", "shan") || player.getEquip(2) || trigger.target.hp == 1 || player.hp > trigger.target.hp + 1) {
						if (!trigger.target.countCards("h", "shan") || trigger.target.countCards("h") < player.countCards("h")) {
							save = true;
						}
					}
				} else if (trigger.card.name == "juedou" && trigger.target.hp == 1) {
					save = true;
				} else if (trigger.card.name == "shunshou" && get.attitude(player, trigger.player) < 0 && get.attitude(trigger.player, trigger.target) < 0) {
					save = true;
				}
			}
			var next = player.chooseToDiscard("he", get.prompt(event.name, trigger.target), "弃置一张牌，将" + get.translation(trigger.card) + "转移给自己，或令此牌对其无效");
			next.logSkill = [event.name, trigger.target];
			next.set("ai", function (card) {
				if (_status.event.aisave) {
					return 7 - get.value(card);
				}
				return 0;
			});
			next.set("aisave", save);
			"step 1";
			if (result.bool) {
				player
					.chooseControl("转移", "失效", function () {
						var trigger = _status.event.getTrigger();
						var player = _status.event.player;
						if (trigger.card.name == "sha") {
							if (player.countCards("h", "shan")) return "转移";
						} else if (trigger.card.name == "juedou") {
							if (player.countCards("h", "sha")) return "转移";
						}
						return "失效";
					})
					.set("prompt", "将" + get.translation(trigger.card) + "转移给你，或令其失效");
			} else {
				event.finish();
			}
			"step 2";
			if (result.control == "转移") {
				player.draw();
				trigger.getParent().targets.remove(trigger.target);
				trigger.getParent().triggeredTargets2.remove(trigger.target);
				trigger.getParent().targets.push(player);
				trigger.untrigger();
				trigger.player.line(player);
				game.delayx();
			} else {
				var cards = trigger.cards.filterInD();
				if (cards.length > 0) {
					trigger.player.addSkill("zhenwei2");
					trigger.player.addToExpansion(cards, "gain2").gaintag.add("zhenwei2");
				}
				trigger.targets.length = 0;
				trigger.getParent().triggeredTargets2.length = 0;
			}
		},
		ai: {
			threaten: 1.1,
		},
	},
	zhenwei2: {
		audio: false,
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		trigger: { global: "phaseEnd" },
		forced: true,
		charlotte: true,
		sourceSkill: "zhenwei",
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		content: function () {
			"step 0";
			var cards = player.getExpansions("zhenwei2");
			if (cards.length) player.gain(cards, "gain2");
			"step 1";
			player.removeSkill("zhenwei2");
		},
	},
	xunzhi: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		locked: false,
		init: function (player) {
			player.storage.xunzhi = 0;
		},
		filter: function (event, player) {
			var previous = player.getPrevious();
			var next = player.getNext();
			if (previous && next) {
				return player.hp != previous.hp && player.hp != next.hp;
			}
			return false;
		},
		check: function (event, player) {
			return player.hp >= 3 && player.countCards("h") > player.hp + 1 + player.storage.xunzhi;
		},
		content: function () {
			player.loseHp();
			player.storage.xunzhi += 2;
		},
		mark: true,
		intro: {
			content: function (storage, player) {
				return "手牌上限+" + player.storage.xunzhi;
			},
		},
		mod: {
			maxHandcard: function (player, num) {
				if (typeof player.storage.xunzhi == "number") {
					return num + player.storage.xunzhi;
				}
			},
		},
	},
	yawang: {
		audio: 2,
		trigger: { player: "phaseDrawBegin1" },
		forced: true,
		filter: function (event, player) {
			return !event.numFixed;
		},
		check: function (event, player) {
			var num = game.countPlayer(function (target) {
				return target.hp == player.hp;
			});
			if (!player.hasSkill("xunzhi2")) {
				var nh = player.countCards("h");
				if (nh > 5) return false;
				if (num == 3 && nh > 3) return false;
			}
			return num >= 3;
		},
		content: function () {
			trigger.changeToZero();
			var num = game.countPlayer(function (target) {
				return target.hp == player.hp;
			});
			if (num) {
				player.draw(num);
			}
			player.storage.yawang = num;
			player.addTempSkill("yawang2");
		},
		ai: {
			halfneg: true,
		},
	},
	yawang2: {
		mod: {
			cardEnabled: function (card, player) {
				if (_status.currentPhase != player) return;
				if (player.countUsed() >= player.storage.yawang) return false;
			},
			cardSavable: function (card, player) {
				if (_status.currentPhase != player) return;
				if (player.countUsed() >= player.storage.yawang) return false;
			},
		},
	},
	luoyan_tianxiang: {
		inherit: "tianxiang",
		filter: function (event, player) {
			if (!player.storage.xingwu || !player.storage.xingwu.length) return false;
			if (player.hasSkill("tianxiang")) return false;
			return lib.skill.tianxiang.filter(event, player);
		},
	},
	luoyan_liuli: {
		inherit: "liuli",
		filter: function (event, player) {
			if (!player.storage.xingwu || !player.storage.xingwu.length) return false;
			if (player.hasSkill("liuli")) return false;
			return lib.skill.liuli.filter(event, player);
		},
	},
	luoyan: {
		group: ["luoyan_tianxiang", "luoyan_liuli"],
		derivation: ["tianxiang", "liuli"],
		ai: {
			combo: "xingwu",
		},
	},
	xingwu: {
		audio: 2,
		group: ["xingwu_color", "xingwu_color2"],
		subSkill: {
			color: {
				trigger: { player: "phaseZhunbeiBegin" },
				silent: true,
				content: function () {
					player.storage.xingwu_color = ["black", "red"];
				},
			},
			color2: {
				trigger: { player: "useCard" },
				silent: true,
				filter: function (event, player) {
					return Array.isArray(player.storage.xingwu_color) && _status.currentPhase == player;
				},
				content: function () {
					player.storage.xingwu_color.remove(get.color(trigger.card));
				},
			},
		},
		trigger: { player: "phaseDiscardBegin" },
		direct: true,
		filter: function (event, player) {
			if (!player.storage.xingwu_color) return false;
			var length = player.storage.xingwu_color.length;
			if (length == 0) return false;
			var hs = player.getCards("h");
			if (hs.length == 0) return false;
			if (length == 2) return true;
			var color = player.storage.xingwu_color[0];
			for (var i = 0; i < hs.length; i++) {
				if (get.color(hs[i]) == color) return true;
			}
			return false;
		},
		intro: {
			content: "cards",
		},
		init: function (player) {
			player.storage.xingwu = [];
		},
		content: function () {
			"step 0";
			player
				.chooseCard(get.prompt("xingwu"), function (card) {
					return _status.event.player.storage.xingwu_color.includes(get.color(card));
				})
				.set("ai", function (card) {
					var player = _status.event.player;
					if (player.storage.xingwu.length == 2) {
						if (
							!game.hasPlayer(function (current) {
								return current != player && current.hasSex("male") && get.damageEffect(current, player, player) > 0 && get.attitude(player, current) < 0;
							})
						)
							return 0;
					}
					return 7 - get.value(card);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("xingwu");
				if (player.storage.xingwu.length < 2) {
					player.$give(result.cards, player);
				}
				player.lose(result.cards, ui.special);
				player.storage.xingwu = player.storage.xingwu.concat(result.cards);
				player.markSkill("xingwu");
				player.syncStorage("xingwu");
			} else {
				event.finish();
			}
			"step 2";
			if (player.storage.xingwu.length == 3) {
				player.$throw(player.storage.xingwu);
				while (player.storage.xingwu.length) {
					player.storage.xingwu.shift().discard();
				}
				player.unmarkSkill("xingwu");
				player
					.chooseTarget(function (card, player, target) {
						return target != player && target.hasSex("male");
					}, "对一名男性角色造成2点伤害并弃置其装备区内的牌")
					.set("ai", function (target) {
						var player = _status.event.player;
						if (get.attitude(player, target) > 0) return -1;
						return get.damageEffect(target, player, player) + target.countCards("e") / 2;
					});
			} else {
				event.finish();
			}
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				target.damage(2);
				event.target = target;
				player.line(target, "green");
			} else {
				event.finish();
			}
			"step 4";
			if (event.target && event.target.isIn()) {
				var es = event.target.getCards("e");
				if (es.length) {
					event.target.discard(es);
				}
			}
		},
		ai: {
			threaten: 1.5,
		},
	},
	yinbing: {
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		audio: 2,
		preHidden: true,
		filter: function (event, player) {
			return player.countCards("he", { type: "basic" }) < player.countCards("he");
		},
		marktext: "兵",
		content: function () {
			"step 0";
			player
				.chooseCard([1, player.countCards("he") - player.countCards("he", { type: "basic" })], "he", get.prompt("yinbing"), function (card) {
					return get.type(card) != "basic";
				})
				.set("ai", function (card) {
					return 6 - get.value(card);
				})
				.setHiddenSkill("yinbing");
			"step 1";
			if (result.bool) {
				player.logSkill("yinbing");
				player.addToExpansion(result.cards, player, "give").gaintag.add("yinbing");
			}
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (card.name == "sha" || card.name == "juedou") {
						if (current < 0) return 1.2;
					}
				},
			},
			threaten: function (player, target) {
				if (target.getExpansions("yinbing").length) return 2;
				return 1;
			},
			combo: "juedi",
		},
		subSkill: {
			discard: {
				trigger: { player: "damageEnd" },
				forced: true,
				filter: function (event, player) {
					return event.card && player.getExpansions("yinbing").length > 0 && (event.card.name == "sha" || event.card.name == "juedou");
				},
				content: function () {
					"step 0";
					player.chooseCardButton("移去一张引兵牌", true, player.getExpansions("yinbing"));
					"step 1";
					if (result.bool) player.loseToDiscardpile(result.links);
				},
			},
		},
		group: "yinbing_discard",
	},
	juedi: {
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return player.getExpansions("yinbing").length > 0;
		},
		forced: true,
		audio: 2,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("juedi"), true, function (card, player, target) {
					return player.hp >= target.hp;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (att < 2) return att - 10;
					var num = att / 10;
					if (target == player) {
						num += player.maxHp - player.countCards("h") + 0.5;
					} else {
						num += _status.event.n2 * 2;
						if (target.isDamaged()) {
							if (target.hp == 1) {
								num += 3;
							} else if (target.hp == 2) {
								num += 2;
							} else {
								num += 0.5;
							}
						}
					}
					if (target.hasJudge("lebu")) {
						num /= 2;
					}
					return num;
				})
				.set("n2", player.getExpansions("yinbing").length);
			"step 1";
			if (result.bool) {
				player.line(result.targets[0], "green");
				var cards = player.getExpansions("yinbing");
				if (result.targets[0] == player) {
					player.loseToDiscardpile(cards);
					var num = player.maxHp - player.countCards("h");
					if (num > 0) player.draw(num);
				} else {
					var target = result.targets[0];
					target.recover();
					player.give(cards, target, "give");
					target.draw(cards.length);
				}
			}
		},
		ai: {
			combo: "yinbing",
		},
	},
	meibu: {
		audio: 2,
		trigger: { global: "phaseUseBegin" },
		filter: function (event, player) {
			return event.player != player && get.distance(event.player, player, "attack") > 1;
		},
		logTarget: "player",
		check: function (event, player) {
			if (get.attitude(player, event.player) >= 0) return false;
			var e2 = player.getEquip(2);
			if (e2) {
				if (e2.name == "tengjia" || e2.name == "rewrite_tengjia") return true;
				if (e2.name == "bagua" || e2.name == "rewrite_bagua") return true;
			}
			return player.countCards("h", "shan") > 0;
		},
		content: function () {
			var target = trigger.player;
			target.addTempSkill("meibu_viewas");
			target.addTempSkill("meibu_range");
			target.storage.meibu = player;
			target.markSkillCharacter("meibu", player, "魅步", "锦囊牌均视为杀且" + get.translation(player) + "视为在攻击范围内");
		},
		ai: {
			expose: 0.2,
		},
		subSkill: {
			range: {
				mod: {
					targetInRange: function (card, player, target) {
						if (card.name == "sha" && target == player.storage.meibu) {
							return true;
						}
					},
				},
				onremove: function (player) {
					game.broadcast(function (player) {
						if (player.marks.meibu) {
							player.marks.meibu.delete();
							delete player.marks.meibu;
						}
					}, player);
					if (player.marks.meibu) {
						player.marks.meibu.delete();
						delete player.marks.meibu;
						game.addVideo("unmark", player, "meibu");
					}
				},
				trigger: { player: "useCard" },
				forced: true,
				popup: false,
				filter: function (event, player) {
					return event.skill == "meibu_viewas";
				},
				content: function () {
					player.removeSkill("meibu_viewas");
					game.broadcastAll(function (player) {
						if (player.marks.meibu && player.marks.meibu.info) {
							player.marks.meibu.info.content = player.marks.meibu.info.content.slice(8);
						}
					}, player);
				},
			},
			viewas: {
				mod: {
					cardEnabled: function (card, player) {
						if (card.name != "sha" && get.type(card, "trick") == "trick") return false;
					},
					cardUsable: function (card, player) {
						if (card.name != "sha" && get.type(card, "trick") == "trick") return false;
					},
					cardRespondable: function (card, player) {
						if (card.name != "sha" && get.type(card, "trick") == "trick") return false;
					},
					cardSavable: function (card, player) {
						if (card.name != "sha" && get.type(card, "trick") == "trick") return false;
					},
				},
				enable: ["chooseToUse", "chooseToRespond"],
				filterCard: function (card) {
					return get.type(card, "trick") == "trick";
				},
				viewAs: { name: "sha" },
				check: function () {
					return 1;
				},
				ai: {
					effect: {
						target: function (card, player, target, current) {
							if (get.tag(card, "respondSha") && current < 0) return 0.8;
						},
					},
					respondSha: true,
					order: 4,
					useful: -1,
					value: -1,
				},
			},
		},
	},
	mumu: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterCard: function (card, player, target) {
			return card.name == "sha" || (get.type(card, "trick") == "trick" && get.color(card) == "black");
		},
		check: function (card) {
			return 7 - get.value(card);
		},
		filterTarget: function (card, player, target) {
			if (target == player) return false;
			return target.getEquips(1).length > 0 || target.getEquips(2).length > 0;
		},
		content: function () {
			"step 0";
			var e1 = target.getEquips(1);
			var e2 = target.getEquips(2);
			event.e1 = e1;
			event.e2 = e2;
			if (e1.length && e2.length) {
				player.chooseControl("武器牌", "防具牌").set("ai", function () {
					if (_status.event.player.getEquip(2)) {
						return "武器牌";
					}
					return "防具牌";
				});
			} else if (e1.length) {
				event.choice = "武器牌";
			} else {
				event.choice = "防具牌";
			}
			"step 1";
			var choice = event.choice || result.control;
			if (choice == "武器牌") {
				if (event.e1) {
					target.discard(event.e1);
				}
				player.draw();
			} else {
				if (event.e2) {
					player.equip(event.e2);
					target.$give(event.e2, player);
				}
			}
		},
		ai: {
			order: 8,
			result: {
				target: function (player, target) {
					if (target.getEquip(2) && !player.getEquip(2)) {
						return -2;
					}
					return -1;
				},
			},
		},
	},
	fentian: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		filter: function (event, player) {
			if (player.countCards("h") >= player.hp) return false;
			return game.hasPlayer(function (current) {
				return player != current && player.inRange(current) && current.countCards("he");
			});
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		content: function () {
			"step 0";
			player
				.chooseTarget("焚天：选择一名攻击范围内的角色，将其一张牌置于你的武将牌上", true, function (card, player, target) {
					return player != target && player.inRange(target) && target.countCards("he") > 0;
				})
				.set("ai", function (target) {
					return -get.attitude(_status.event.player, target);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("fentian", result.targets);
				event.target = result.targets[0];
				player.choosePlayerCard(result.targets[0], "he", true);
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				player.addToExpansion(result.links, target, "give").gaintag.add("fentian");
			}
		},
		mod: {
			attackRange: function (from, distance) {
				return distance + from.getExpansions("fentian").length;
			},
		},
	},
	zhiri: {
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		unique: true,
		juexingji: true,
		audio: 2,
		skillAnimation: true,
		animationColor: "fire",
		derivation: "xintan",
		filter: function (event, player) {
			return player.getExpansions("fentian").length >= 3;
		},
		content: function () {
			player.awakenSkill("zhiri");
			player.loseMaxHp();
			player.storage.zhiri = true;
			player.addSkills("xintan");
		},
		ai: {
			combo: "fentian",
		},
	},
	xintan: {
		enable: "phaseUse",
		usable: 1,
		audio: 2,
		unique: true,
		filter: function (event, player) {
			return player.getExpansions("fentian").length >= 2;
		},
		filterTarget: true,
		prompt: "移去两张“焚”并令一名角色失去1点体力",
		content: function () {
			"step 0";
			player.chooseCardButton(2, "移去两张“焚”并令" + get.translation(target) + "失去1点体力", player.getExpansions("fentian"), true);
			"step 1";
			if (result.bool) {
				player.loseToDiscardpile(result.links);
				target.loseHp();
			}
		},
		ai: {
			order: 8,
			result: {
				target: -1,
			},
			combo: "fentian",
		},
	},
	danji: {
		audio: 2,
		skillAnimation: true,
		animationColor: "water",
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		unique: true,
		juexingji: true,
		derivation: ["mashu", "nuzhan"],
		filter: function (event, player) {
			var zhu = get.zhu(player);
			if (zhu && zhu.isZhu) {
				var name = zhu.name;
				while (name.indexOf("_") != -1) {
					name = name.slice(name.indexOf("_") + 1);
				}
				if (name.indexOf("liubei") == 0) return false;
			}
			return !player.storage.danji && player.countCards("h") > player.hp;
		},
		content: function () {
			player.awakenSkill("danji");
			player.loseMaxHp();
			player.addSkills(["mashu", "nuzhan"]);
		},
		ai: {
			maixie: true,
			skillTagFilter: (player, tag, arg) => {
				if (tag === "maixie") {
					if (player.hp < 2 || player.storage.danji || player.hasSkill("nuzhan") || player.countCards("h") !== player.hp) return false;
					let zhu = get.zhu(player);
					if (zhu && zhu.isZhu) {
						let name = zhu.name;
						while (name.indexOf("_") !== -1) {
							name = name.slice(name.indexOf("_") + 1);
						}
						if (name.indexOf("liubei") == 0) return false;
					}
					return true;
				}
			},
			effect: {
				target: (card, player, target) => {
					let hs = target.countCards("h");
					if (target.hp < 3 || target.storage.danji || target.hasSkill("nuzhan") || hs > target.hp + 1) return;
					let zhu = get.zhu(target);
					if (zhu && zhu.isZhu) {
						let name = zhu.name;
						while (name.indexOf("_") !== -1) {
							name = name.slice(name.indexOf("_") + 1);
						}
						if (name.indexOf("liubei") == 0) return;
					}
					if (get.tag(card, "draw")) return 1.6;
					if (get.tag(card, "lose") || get.tag(card, "discard")) return [1, -0.8];
					if (hs === target.hp && get.tag(card, "damage")) return [1, target.hp / 3];
					if (hs > target.hp && target.hp > 3 && (card.name === "shan" || card.name === "wuxie")) return "zeroplayertarget";
				},
			},
			combo: "new_rewusheng",
		},
	},
	nuzhan: {
		audio: 2,
		popup: false,
		silent: true,
		firstDo: true,
		trigger: { player: "useCard1" },
		filter: function (event, player) {
			return event.card && event.card.name == "sha" && event.addCount !== false && event.cards && event.cards.length == 1 && get.type(event.cards[0], "trick") == "trick";
		},
		forced: true,
		content: function () {
			trigger.addCount = false;
			if (player.stat[player.stat.length - 1].card.sha > 0) {
				player.stat[player.stat.length - 1].card.sha--;
			}
		},
		ai: {
			combo: "wusheng",
		},
		group: "nuzhan2",
	},
	nuzhan2: {
		audio: "nuzhan",
		trigger: { player: "useCard1" },
		forced: true,
		popup: false,
		silent: true,
		firstDo: true,
		sourceSkill: "nuzhan",
		filter: function (event, player) {
			return event.card && event.card.name == "sha" && event.cards && event.cards.length == 1 && get.type(event.cards[0]) == "equip";
		},
		content: function () {
			trigger.baseDamage++;
		},
	},
	jieyuan: {
		audio: ["jieyuan_more.mp3", "jieyuan_less.mp3"],
		group: ["jieyuan_more", "jieyuan_less"],
		subSkill: {
			more: {
				audio: true,
				trigger: { source: "damageBegin1" },
				direct: true,
				filter: function (event, player) {
					if (
						!player.countCards(player.hasSkill("fenxin_nei") ? "he" : "h", function (card) {
							if (player.hasSkill("fenxin_nei") || (_status.connectMode && get.position(card) == "h")) return true;
							return get.color(card) == "black";
						})
					)
						return false;
					return (event.player.hp >= player.hp || player.hasSkill("fenxin_fan")) && player != event.player;
				},
				content: function () {
					"step 0";
					var goon = get.attitude(player, trigger.player) < 0;
					var next = player.chooseToDiscard(get.prompt("jieyuan", trigger.player), player.hasSkill("fenxin_nei") ? "he" : "h");
					if (!player.hasSkill("fenxin_nei")) {
						next.set("filterCard", function (card) {
							return get.color(card) == "black";
						});
						next.set("prompt2", "弃置一张黑色手牌令伤害+1");
					} else {
						next.set("prompt2", "弃置一张手牌令伤害+1");
					}
					next.set("ai", function (card) {
						if (_status.event.goon) {
							return 8 - get.value(card);
						}
						return 0;
					});
					next.set("goon", goon);
					next.logSkill = ["jieyuan_more", trigger.player];
					"step 1";
					if (result.bool) {
						trigger.num++;
					}
				},
			},
			less: {
				audio: true,
				trigger: { player: "damageBegin2" },
				filter: function (event, player) {
					if (
						!player.countCards(player.hasSkill("fenxin_nei") ? "he" : "h", function (card) {
							if (player.hasSkill("fenxin_nei") || (_status.connectMode && get.position(card) == "h")) return true;
							return get.color(card) == "red";
						})
					)
						return false;
					return event.source && (event.source.hp >= player.hp || player.hasSkill("fenxin_zhong")) && player != event.source;
				},
				direct: true,
				content: function () {
					"step 0";
					var next = player.chooseToDiscard(get.prompt("jieyuan"), player.hasSkill("fenxin_nei") ? "he" : "h");
					if (!player.hasSkill("fenxin_nei")) {
						next.set("filterCard", function (card) {
							return get.color(card) == "red";
						});
						next.set("prompt2", "弃置一张红色手牌令伤害-1");
					} else {
						next.set("prompt2", "弃置一张手牌令伤害-1");
					}
					next.set("ai", function (card) {
						var player = _status.event.player;
						if (player.hp == 1 || _status.event.getTrigger().num > 1) {
							return 9 - get.value(card);
						}
						if (player.hp == 2) {
							return 8 - get.value(card);
						}
						return 7 - get.value(card);
					});
					next.logSkill = "jieyuan_less";
					"step 1";
					if (result.bool) {
						trigger.num--;
					}
				},
			},
		},
		ai: {
			expose: 0.2,
			threaten: 1.5,
		},
	},
	fenxin: {
		mode: ["identity", "versus"],
		available: function (mode) {
			if (mode == "identity" && _status.mode == "purple") return false;
			if (mode == "versus" && _status.mode != "two") return false;
		},
		audio: 2,
		trigger: { global: ["dieAfter", "damageEnd"] },
		filter: function (event, player) {
			var list = ["fan", "zhong", "nei"];
			if (get.mode() == "identity") return event.name == "die" && list.includes(event.player.identity) && !player.hasSkill("fenxin_" + event.player.identity);
			return event.name == "damage" && event.player != player && list.some(identity => !player.hasSkill("fenxin_" + identity)) && event.player.getAllHistory("damage").indexOf(event) == 0;
		},
		forced: true,
		logTarget: "player",
		content: function () {
			"step 0";
			if (get.mode() == "identity") {
				event._result = {
					bool: true,
					links: ["fenxin_" + trigger.player.identity],
				};
			} else {
				player
					.chooseButton(
						[
							"焚心：请选择〖竭缘〗的升级方式",
							[
								[
									["fenxin_fan", "发动〖竭缘〗增加伤害无体力值限制"],
									["fenxin_zhong", "发动〖竭缘〗减少伤害无体力值限制"],
									["fenxin_nei", "将〖竭缘〗中的黑色手牌和红色手牌改为一张牌"],
								].filter(list => !player.hasSkill(list[0])),
								"textbutton",
							],
						],
						true
					)
					.set("ai", function (button) {
						return ["fenxin_fan", "fenxin_zhong", "fenxin_nei"].indexOf(button.link) + 1;
					});
			}
			"step 1";
			if (result.bool) {
				var identity = result.links[0];
				player.addSkill(identity);
				player.markSkill("fenxin");
			}
		},
		intro: {
			mark: function (dialog, content, player) {
				if (player.hasSkill("fenxin_zhong")) {
					dialog.addText("你发动“竭缘”减少伤害无体力值限制");
				}
				if (player.hasSkill("fenxin_fan")) {
					dialog.addText("你发动“竭缘”增加伤害无体力值限制");
				}
				if (player.hasSkill("fenxin_nei")) {
					dialog.addText("将“竭缘”中的黑色手牌和红色手牌改为一张牌");
				}
			},
		},
		subSkill: {
			fan: { charlotte: true },
			zhong: { charlotte: true },
			nei: { charlotte: true },
		},
		ai: { combo: "jieyuan" },
	},
	xisheng: {
		enable: "chooseToUse",
		usable: 1,
		viewAs: { name: "tao" },
		viewAsFilter: function (player) {
			return player != _status.currentPhase && player.countCards("hes") > 1;
		},
		selectCard: 2,
		filterCard: true,
		position: "hes",
	},
	shulv: {
		inherit: "zhiheng",
		prompt: "弃置一张牌并摸一张牌",
		selectCard: 1,
		filter: function (event, player) {
			return player.countCards("hs") > player.hp;
		},
	},
	xiandeng: {
		mod: {
			cardUsable: function (card, player, num) {
				if (card.name == "sha") return num + 1;
			},
			targetInRange: function (card, player) {
				if (card.name == "sha" && player.countUsed("sha", true) == 0) return true;
			},
		},
	},
	qingyi: {
		audio: 2,
		trigger: { player: "phaseJudgeBefore" },
		direct: true,
		content: function () {
			"step 0";
			var check = player.countCards("h") > 2;
			player
				.chooseTarget(get.prompt("qingyi"), "跳过判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】", function (card, player, target) {
					if (player == target) return false;
					return player.canUse({ name: "sha" }, target, false);
				})
				.set("check", check)
				.set("ai", function (target) {
					if (!_status.event.check) return 0;
					return get.effect(target, { name: "sha" }, _status.event.player);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("qingyi", result.targets);
				player.useCard({ name: "sha", isCard: true }, result.targets[0], false);
				trigger.cancel();
				player.skip("phaseDraw");
			}
		},
	},
	qingyi1: {
		audio: true,
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		sourceSkill: "qingyi",
		content: function () {
			"step 0";
			player.addSkill("qingyi3");
			var check = player.countCards("h") > 2;
			player.chooseTarget(get.prompt2("qingyi"), function (card, player, target) {
				if (player == target) return false;
				return player.canUse({ name: "sha" }, target);
			}).ai = function (target) {
				if (!check) return 0;
				return get.effect(target, { name: "sha" }, _status.event.player);
			};
			"step 1";
			if (result.bool) {
				player.logSkill("qingyi1", result.targets);
				player.useCard({ name: "sha", isCard: true }, result.targets[0], false);
				player.skip("phaseJudge");
				player.skip("phaseDraw");
			}
			player.removeSkill("qingyi3");
		},
	},
	qingyi2: {
		audio: true,
		trigger: { player: "phaseUseBefore" },
		direct: true,
		sourceSkill: "qingyi",
		filter: function (event, player) {
			return player.countCards("he", { type: "equip" }) > 0;
		},
		content: function () {
			"step 0";
			player.addSkill("qingyi3");
			var check = player.countCards("h") <= player.hp;
			player.chooseCardTarget({
				prompt: get.prompt2("qingyi"),
				filterCard: function (card, player) {
					return get.type(card) == "equip" && lib.filter.cardDiscardable(card, player);
				},
				position: "he",
				filterTarget: function (card, player, target) {
					if (player == target) return false;
					return player.canUse({ name: "sha" }, target);
				},
				ai1: function (card) {
					if (!_status.event.check) return 0;
					return 6 - get.value(card);
				},
				ai2: function (target) {
					if (!_status.event.check) return 0;
					return get.effect(target, { name: "sha" }, _status.event.player);
				},
				check: check,
			});
			"step 1";
			if (result.bool) {
				player.logSkill("qingyi2", result.targets);
				player.discard(result.cards[0]);
				player.useCard({ name: "sha", isCard: true }, result.targets[0]);
				trigger.cancel();
			}
			player.removeSkill("qingyi3");
		},
	},
	qingyi3: {
		mod: {
			targetInRange: function (card, player, target, now) {
				return true;
			},
		},
	},
	qirang: {
		audio: 2,
		trigger: { player: "equipEnd" },
		frequent: true,
		content: function () {
			var card = get.cardPile(function (card) {
				return get.type(card, "trick") == "trick";
			});
			if (card) {
				var next = player.gain(card, "gain2");
				if (get.type(card) == "trick") next.gaintag.add("qirang");
				else {
					player.addMark("qirang_mark", 1, false);
					player.addTempSkill("qirang_mark", { player: "phaseBegin" });
				}
			}
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (get.type(card) == "equip" && !get.cardtag(card, "gifts")) return [1, 3];
				},
			},
			threaten: 1.3,
		},
		group: "qirang_use",
		subSkill: {
			mark: {
				charlotte: true,
				onremove: function (player) {
					var evt = _status.event;
					if (evt.name != "phase") evt = evt.getParent("phase");
					if (evt && evt.player == player) {
						if (!evt.qirang_num) evt.qirang_num = 0;
						evt.qirang_num += player.storage.qirang_mark;
					}
					delete player.storage.qirang_mark;
				},
				intro: {
					content: "下回合发动〖羽化〗时卜算量+#",
				},
			},
			use: {
				audio: "qirang",
				trigger: { player: "useCard2" },
				direct: true,
				filter: function (event, player) {
					if (get.type(event.card) != "trick") return false;
					if (!event.targets || event.targets.length != 1) return false;
					var info = get.info(event.card);
					if (info.allowMultiple == false) return false;
					if (
						!player.hasHistory("lose", function (evt) {
							if (evt.getParent() != event) return false;
							for (var i in evt.gaintag_map) {
								if (evt.gaintag_map[i].includes("qirang")) return true;
							}
							return false;
						})
					)
						return false;
					if (!info.multitarget) {
						if (
							game.hasPlayer(function (current) {
								return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
							})
						) {
							return true;
						}
					}
					return false;
				},
				content: function () {
					"step 0";
					var prompt2 = "为" + get.translation(trigger.card) + "增加一个目标";
					player
						.chooseTarget(get.prompt("qirang"), function (card, player, target) {
							var player = _status.event.player;
							if (_status.event.targets.includes(target)) return false;
							return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
						})
						.set("prompt2", prompt2)
						.set("ai", function (target) {
							var trigger = _status.event.getTrigger();
							var player = _status.event.player;
							return get.effect(target, trigger.card, player, player) * (_status.event.targets.includes(target) ? -1 : 1);
						})
						.set("targets", trigger.targets)
						.set("card", trigger.card);
					"step 1";
					if (result.bool) {
						if (!event.isMine() && !event.isOnline()) game.delayx();
						event.targets = result.targets;
					} else {
						event.finish();
					}
					"step 2";
					if (event.targets) {
						player.logSkill("qirang_use", event.targets);
						trigger.targets.addArray(event.targets);
					}
				},
			},
		},
	},
	yuhua: {
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		forced: true,
		audio: 2,
		async content(event, trigger, player) {
			let num = 1,
				evt = trigger.getParent();
			if (evt.qirang_num) num += evt.qirang_num;
			const result = await player.chooseToGuanxing(Math.min(5, num)).set("prompt", "观星：点击或拖动将牌移动到牌堆顶或牌堆底").forResult();
			if ((!result.bool || !result.moved[0].length) && event.triggername == "phaseZhunbeiBegin") {
				player.addTempSkill("guanxing_fail");
			}
		},
		mod: {
			ignoredHandcard: function (card, player) {
				if (get.type(card) != "basic") {
					return true;
				}
			},
			cardDiscardable: function (card, player, name) {
				if (name == "phaseDiscard" && get.type(card) != "basic") return false;
			},
		},
		ai: {
			guanxing: true,
		},
	},
	chenqing: {
		audio: 2,
		trigger: { global: "dying" },
		//priority:6,
		filter: function (event, player) {
			return event.player.hp <= 0 && !player.hasSkill("chenqing2");
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("chenqing"), function (card, player, target) {
					return target != player && target != _status.event.getTrigger().player;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var trigger = _status.event.getTrigger();
					if (get.attitude(player, trigger.player) > 0) {
						var att1 = get.attitude(target, player);
						var att2 = get.attitude(target, trigger.player);
						var att3 = get.attitude(player, target);
						if (att3 < 0) return 0;
						return att1 / 2 + att2 + att3;
					} else {
						return 0;
						// return get.attitude(player,target);
					}
				});
			"step 1";
			if (result.bool) {
				player.addTempSkill("chenqing2", "roundStart");
				event.target = result.targets[0];
				event.target.draw(4);
				player.logSkill("chenqing", event.target);
			} else {
				event.finish();
			}
			"step 2";
			var target = event.target;
			var tosave = trigger.player;
			var att = get.attitude(target, tosave);
			var hastao = target.countCards("h", "tao");
			target
				.chooseToDiscard(4, true, "he")
				.set("ai", function (card) {
					var hastao = _status.event.hastao;
					var att = _status.event.att;
					if (!hastao && att > 0) {
						var suit = get.suit(card);
						for (var i = 0; i < ui.selected.cards.length; i++) {
							if (get.suit(ui.selected.cards[i]) == suit) {
								return -4 - get.value(card);
							}
						}
					}
					if (att < 0 && ui.selected.cards.length == 3) {
						var suit = get.suit(card);
						for (var i = 0; i < ui.selected.cards.length; i++) {
							if (get.suit(ui.selected.cards[i]) == suit) {
								return -get.value(card);
							}
						}
						return -10 - get.value(card);
					}
					return -get.value(card);
				})
				.set("hastao", hastao)
				.set("att", att);
			"step 3";
			if (result.cards && result.cards.length == 4) {
				var suits = [];
				for (var i = 0; i < result.cards.length; i++) {
					suits.add(get.suit(result.cards[i]));
				}
				if (suits.length == 4 && game.checkMod({ name: "tao", isCard: true }, player, trigger.player, "unchanged", "cardSavable", player)) {
					event.target.useCard({ name: "tao", isCard: true }, trigger.player);
				}
			}
		},
		ai: {
			expose: 0.2,
			threaten: 1.5,
		},
	},
	mozhi: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		filter: function (event, player) {
			return (
				player.getHistory("useCard", function (evt) {
					return evt.isPhaseUsing() && ["basic", "trick"].includes(get.type(evt.card));
				}).length > 0 && player.countCards("hs") > 0
			);
		},
		content: function () {
			"step 0";
			event.count = 2;
			event.history = player.getHistory("useCard", function (evt) {
				return evt.isPhaseUsing() && ["basic", "trick"].includes(get.type(evt.card));
			});
			"step 1";
			event._result = {};
			if (event.count && event.history.length && player.countCards("hs")) {
				event.count--;
				var card = event.history.shift().card;
				card = { name: card.name, nature: card.nature };
				if (player.hasUseTarget(card, true, true)) {
					if (
						game.hasPlayer(function (current) {
							return player.canUse(card, current);
						})
					) {
						lib.skill.mozhix.viewAs = card;
						var next = player.chooseToUse();
						if (next.isOnline()) {
							player.send(function (card) {
								lib.skill.mozhix.viewAs = card;
							}, card);
						}
						next.logSkill = "mozhi";
						next.set("openskilldialog", "默识：将一张手牌当" + get.translation(card) + "使用");
						next.set("norestore", true);
						next.set("_backupevent", "mozhix");
						next.set("custom", {
							add: {},
							replace: { window: function () {} },
						});
						next.backup("mozhix");
					}
				}
			}
			"step 2";
			if (result && result.bool) event.goto(1);
		},
	},
	mozhix: {
		filterCard: function (card) {
			return get.itemtype(card) == "card";
		},
		selectCard: 1,
		position: "hs",
		popname: true,
		sourceSkill: "mozhi",
	},
	chenqing2: { charlotte: true },
	ranshang: {
		audio: 2,
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.hasNature("fire");
		},
		forced: true,
		check: function () {
			return false;
		},
		content: function () {
			player.addMark("ranshang", trigger.num);
		},
		intro: {
			name2: "燃",
			content: "mark",
		},
		ai: {
			neg: true,
			effect: {
				target: function (card, player, target, current) {
					if (card.name == "sha") {
						if (game.hasNature(card, "fire") || player.hasSkill("zhuque_skill")) return 2;
					}
					if (get.tag(card, "fireDamage") && current < 0) return 2;
				},
			},
		},
		group: "ranshang2",
	},
	ranshang2: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		sourceSkill: "ranshang",
		filter: function (event, player) {
			return player.countMark("ranshang") > 0;
		},
		content: function () {
			player.loseHp(player.countMark("ranshang"));
			if (player.countMark("ranshang") > 2) {
				player.loseMaxHp(2);
				player.draw(2);
			}
		},
	},
	hanyong: {
		audio: 2,
		trigger: { player: "useCard" },
		filter: function (event, player) {
			return event.card && (event.card.name == "nanman" || event.card.name == "wanjian" || (event.card.name == "sha" && !game.hasNature(event.card) && get.suit(event.card) == "spade")) && player.isDamaged();
		},
		content: function () {
			trigger.baseDamage++;
			if (game.roundNumber <= player.hp) player.addMark("ranshang", 1);
		},
	},
	hanyong3: {
		audio: false,
		trigger: { source: "damageBegin1" },
		forced: true,
		onremove: true,
		sourceSkill: "hanyong",
		filter: function (event, player) {
			return event.card == player.storage.hanyong3;
		},
		content: function () {
			trigger.num++;
		},
	},
	yishe: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		filter: function (event, player) {
			return !player.getExpansions("yishe").length;
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		content: function () {
			"step 0";
			player.draw(2);
			"step 1";
			var cards = player.getCards("he");
			if (!cards.length) event.finish();
			else if (cards.length <= 2) event._result = { bool: true, cards: cards };
			else player.chooseCard(2, "he", true, "选择两张牌作为“米”");
			"step 2";
			if (result.bool) player.addToExpansion(result.cards, player, "give").gaintag.add("yishe");
		},
		group: "yishe_recover",
		ai: { combo: "bushi" },
		subSkill: {
			recover: {
				audio: "yishe",
				trigger: {
					player: ["loseAfter"],
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter: function (event, player) {
					if (player.isHealthy()) return false;
					var evt = event.getl(player);
					if (!evt || !evt.xs || !evt.xs.length || player.getExpansions("yishe").length > 0) return false;
					if (event.name == "lose") {
						for (var i in event.gaintag_map) {
							if (event.gaintag_map[i].includes("yishe")) return true;
						}
						return false;
					}
					return player.hasHistory("lose", function (evt) {
						if (event != evt.getParent()) return false;
						for (var i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("yishe")) return true;
						}
						return false;
					});
				},
				forced: true,
				content: function () {
					player.recover();
				},
			},
		},
	},
	bushi: {
		audio: 2,
		trigger: { player: "damageEnd", source: "damageEnd" },
		filter: function (event, player) {
			if (event._notrigger.includes(event.player)) return false;
			return event.player.isIn() && player.getExpansions("yishe").length > 0;
		},
		direct: true,
		content: function () {
			"step 0";
			event.count = trigger.num;
			"step 1";
			trigger.player.chooseCardButton("选择获得一张“米”", player.getExpansions("yishe"));
			"step 2";
			if (result.bool) {
				event.count--;
				player.logSkill("bushi", trigger.player);
				trigger.player.gain(result.links[0], "give", player, "bySelf");
			} else event.finish();
			"step 3";
			if (event.count > 0 && player.getExpansions("yishe").length && player.hasSkill("bushi")) {
				event.goto(1);
			}
		},
		ai: { combo: "yishe" },
	},
	midao: {
		audio: 2,
		trigger: { global: "judge" },
		direct: true,
		filter: function (event, player) {
			return player.getExpansions("yishe").length && event.player.isIn();
		},
		content: function () {
			"step 0";
			var list = player.getExpansions("yishe");
			player
				.chooseButton([get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定为" + get.translation(trigger.player.judging[0]) + "，" + get.prompt("midao"), list, "hidden"], function (button) {
					var card = button.link;
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					var judging = _status.event.judging;
					var result = trigger.judge(card) - trigger.judge(judging);
					var attitude = get.attitude(player, trigger.player);
					return result * attitude;
				})
				.set("judging", trigger.player.judging[0])
				.set("filterButton", function (button) {
					var player = _status.event.player;
					var card = button.link;
					var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") return mod2;
					var mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
					if (mod != "unchanged") return mod;
					return true;
				});
			"step 1";
			if (result.bool) {
				event.forceDie = true;
				player.respond(result.links, "midao", "highlight", "noOrdering");
				result.cards = result.links;
				var card = result.cards[0];
				event.card = card;
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				if (trigger.player.judging[0].clone) {
					trigger.player.judging[0].clone.classList.remove("thrownhighlight");
					game.broadcast(function (card) {
						if (card.clone) {
							card.clone.classList.remove("thrownhighlight");
						}
					}, trigger.player.judging[0]);
					game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
				}
				game.cardsDiscard(trigger.player.judging[0]);
				trigger.player.judging[0] = result.cards[0];
				trigger.orderingCards.addArray(result.cards);
				game.log(trigger.player, "的判定牌改为", card);
				game.delay(2);
			}
		},
		ai: {
			combo: "yishe",
			rejudge: true,
			tag: {
				rejudge: 0.6,
			},
		},
	},
	fengpo: {
		audio: 2,
		trigger: {
			player: "useCardToPlayered",
		},
		filter: function (event, player) {
			if (event.targets.length != 1 || !["sha", "juedou"].includes(event.card.name)) return false;
			var evtx = event.getParent();
			return !player.hasHistory(
				"useCard",
				function (evt) {
					return evt != evtx && evt.card.name == event.card.name;
				},
				evtx
			);
		},
		direct: true,
		content: function () {
			"step 0";
			var str1 = get.translation(trigger.card),
				str2 = get.translation(trigger.target);
			player
				.chooseControl("摸X加1伤", "摸1加X伤", "cancel2")
				.set("prompt", get.prompt("fengpo", trigger.target))
				.set("prompt2", "你可以选择一项：1.摸X张牌，令" + str1 + "的伤害+1；2.摸一张牌，令" + str1 + "的伤害+X（X为" + str2 + "的♦牌的数量）。");
			"step 1";
			if (result.control && result.control != "cancel2") {
				player.logSkill("fengpo", trigger.target);
				var nd = trigger.target.countCards("he", { suit: "diamond" });
				var draw = 1,
					damage = 1;
				if (result.control == "摸X加1伤") draw = nd;
				else damage = nd;
				player.draw(draw);
				var trigger2 = trigger.getParent();
				if (typeof trigger2.baseDamage != "number") {
					trigger2.baseDamage = 1;
				}
				trigger2.baseDamage += damage;
			}
		},
	},
	fengpo2: {
		trigger: { source: "damageBegin1" },
		sourceSkill: "fengpo",
		filter: function (event) {
			return event.card && (event.card.name == "sha" || event.card.name == "juedou") && event.notLink();
		},
		forced: true,
		audio: false,
		content: function () {
			if (typeof player.storage.fengpo == "number") {
				trigger.num += player.storage.fengpo;
			}
		},
	},
	fengpo3: { charlotte: true },
	//士燮
	biluan: {
		audio: 2,
		trigger: { player: "phaseDrawBegin1" },
		check: function (event, player) {
			if (player.countCards("h") > player.hp) return true;
			if (player.hasJudge("lebu")) return true;
			var ng = [];
			var players = game.filterPlayer();
			for (var i = 0; i < players.length; i++) {
				if (players[i].group != "unknown") {
					ng.add(players[i].group);
				}
			}
			ng = ng.length;
			if (ng < 2) return false;
			var nai = 0;
			for (var i = 0; i < players.length; i++) {
				if (players[i] != player) {
					var dist = get.distance(players[i], player, "attack");
					if (dist <= 1 && dist + ng > 1) {
						nai++;
					}
				}
			}
			return nai >= 2;
		},
		filter: function (event, player) {
			return (
				!event.numFixed &&
				game.hasPlayer(function (current) {
					return current != player && get.distance(current, player) <= 1;
				})
			);
		},
		content: function () {
			if (!player.hasSkill("rebiluan2")) player.addSkill("rebiluan2");
			var ng = [];
			var players = game.filterPlayer();
			for (var i = 0; i < players.length; i++) {
				if (players[i].group != "unknown") {
					ng.add(players[i].group);
				}
			}
			player.$damagepop(ng.length, "unknownx");
			player.storage.rebiluan2 += ng.length;
			player.markSkill("rebiluan2");
			game.addVideo("storage", player, ["biluan", player.storage.rebiluan2]);
			trigger.changeToZero();
		},
	},
	lixia: {
		audio: 2,
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return event.player.isIn() && event.player != player && !event.player.inRange(player);
		},
		forced: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(
					function (card, player, target) {
						return target == player || target == _status.event.source;
					},
					true,
					"礼下：选择一个目标摸一张牌"
				)
				.set("ai", function (target) {
					if (get.attitude(player, trigger.player) > 2) return 114514 - target.countCards();
					return player == target ? 1 : 0;
				})
				.set("source", trigger.player);
			"step 1";
			if (result.targets.length) {
				result.targets[0].draw();
				player.line(result.targets[0], "green");
			}
			if (!player.hasSkill("rebiluan2")) player.addSkill("rebiluan2");
			player.storage.rebiluan2--;
			player.markSkill("rebiluan2");
			game.addVideo("storage", player, ["biluan", player.storage.rebiluan2]);
		},
		ai: {
			combo: "biluan",
			halfneg: true,
		},
	},
	olbiluan: {
		audio: "biluan",
		trigger: { player: "phaseJieshuBegin" },
		checkx: function (player) {
			var ng = Math.min(4, game.countPlayer());
			var nai = 0;
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i] != player) {
					var dist = get.distance(game.players[i], player, "attack");
					if (dist <= 1 && dist + ng > 1) nai++;
				}
			}
			return nai >= 2;
		},
		filter: function (event, player) {
			return (
				player.countCards("he") &&
				game.hasPlayer(function (current) {
					return current != player && get.distance(current, player) <= 1;
				})
			);
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseToDiscard("he", get.prompt2("olbiluan"))
				.set("logSkill", "olbiluan")
				.set("ai", function (card) {
					if (_status.event.check) return 6 - get.value(card);
					return 0;
				})
				.set("check", lib.skill.olbiluan.checkx(player));
			"step 1";
			if (result.bool) {
				player.addSkill("rebiluan2");
				var num = game.countGroup();
				player.$damagepop(num, "unknownx");
				player.storage.rebiluan2 += num;
				player.markSkill("rebiluan2");
				game.addVideo("storage", player, ["rebiluan2", player.storage.rebiluan2]);
			}
		},
	},
	ollixia: {
		audio: "lixia",
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return event.player.isIn() && event.player != player && !event.player.inRange(player);
		},
		forced: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(
					function (card, player, target) {
						return target == player || target == _status.event.source;
					},
					true,
					"礼下：请选择一个目标令其摸牌并减少你与其他角色的距离"
				)
				.set("ai", function (target) {
					return player == target ? 1 : 0;
				})
				.set("source", trigger.player);
			"step 1";
			if (result.targets.length) {
				var num = result.targets[0] == player ? 1 : 2;
				result.targets[0].draw(num);
				player.line(result.targets[0], "green");
			}
			if (!player.hasSkill("rebiluan2")) player.addSkill("rebiluan2");
			player.storage.rebiluan2--;
			player.markSkill("rebiluan2");
			game.addVideo("storage", player, ["rebiluan2", player.storage.rebiluan]);
		},
		ai: {
			combo: "rebiluan",
			halfneg: true,
		},
	},
	rebiluan2: {
		mark: true,
		charlotte: true,
		intro: {
			content: function (storage) {
				if (storage > 0) {
					return "其他角色计算与你的距离时+" + storage;
				} else if (storage < 0) {
					return "其他角色计算与你的距离时" + storage;
				} else {
					return "无距离变化";
				}
			},
		},
		init: function (player) {
			if (typeof player.storage.rebiluan2 != "number") player.storage.rebiluan2 = 0;
		},
		mod: {
			globalTo: function (from, to, distance) {
				if (typeof to.storage.rebiluan2 == "number") {
					return distance + to.storage.rebiluan2;
				}
			},
		},
	},
	rebiluan: {
		audio: "biluan",
		trigger: { player: "phaseJieshuBegin" },
		checkx: function (player) {
			var ng = Math.min(4, game.countPlayer());
			var nai = 0;
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i] != player) {
					var dist = get.distance(game.players[i], player, "attack");
					if (dist <= 1 && dist + ng > 1) {
						nai++;
					}
				}
			}
			return nai >= 2;
		},
		filter: function (event, player) {
			return (
				player.countCards("he") &&
				game.hasPlayer(function (current) {
					return current != player && get.distance(current, player) <= 1;
				})
			);
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseToDiscard("he", get.prompt2("rebiluan"))
				.set("logSkill", "rebiluan")
				.set("check", lib.skill.rebiluan.checkx(player))
				.set("ai", function (card) {
					if (_status.event.check) return 6 - get.value(card);
					return 0;
				});
			"step 1";
			if (result.bool) {
				player.addSkill("rebiluan2");
				var ng = Math.min(4, game.countPlayer());
				player.$damagepop(ng, "unknownx");
				player.storage.rebiluan2 += ng;
				player.markSkill("rebiluan2");
				game.addVideo("storage", player, ["rebiluan2", player.storage.rebiluan2]);
			}
		},
	},
	relixia: {
		audio: "lixia",
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return event.player.isIn() && event.player != player && !player.inRangeOf(event.player);
		},
		forced: true,
		content: function () {
			"step 0";
			if (trigger.player.isDead()) {
				event._result = { bool: true, links: [0] };
				return;
			}
			var list = ["令自己摸一张牌", "令XXX摸两张牌", "令XXX回复1点体力"];
			var card = get.translation(trigger.player);
			var next = player.chooseButton(
				[
					"【礼下】：请选择一至两项",
					[
						list.map((item, index) => {
							return [index, item.replace(/XXX/g, card)];
						}),
						"textbutton",
					],
				],
				true,
				[1, 2]
			);
			next.set("dialog", event.videoId);
			next.set("filterButton", function (button) {
				if (button.link == 2) {
					return _status.event.bool1;
				}
				return true;
			});
			next.set("bool1", trigger.player.isDamaged());
			next.set("ai", function (button) {
				var player = _status.event.player;
				var event = _status.event.getTrigger();
				if (button.link && get.attitude(player, event.player) <= 0) return 0;
				return button.link * Math.random();
			});
			"step 1";
			var map = [
				function (trigger, player, event) {
					player.draw();
				},
				function (trigger, player, event) {
					if (!result.links.includes(2)) player.line(trigger.player);
					trigger.player.draw(2);
				},
				function (trigger, player, event) {
					player.line(trigger.player);
					trigger.player.recover();
				},
			];
			result.links.sort();
			for (var i = 0; i < result.links.length; i++) {
				game.log(player, "选择了", "#g【礼下】", "的", "#y选项" + get.cnNumber(result.links[i] + 1, true));
				map[result.links[i]](trigger, player, event);
			}
			player.addSkill("rebiluan2");
			player.storage.rebiluan2 -= result.links.length;
			player.markSkill("rebiluan2");
			game.addVideo("storage", player, ["rebiluan2", player.storage.rebiluan2]);
		},
		ai: {
			combo: "olbiluan",
			halfneg: true,
		},
	},
	guiming: {
		audio: 2,
		unique: true,
		zhuSkill: true,
		locked: true,
		ai: {
			combo: "recanshi",
		},
	},
	canshi: {
		audio: 2,
		trigger: { player: "phaseDrawBegin1" },
		check: function (event, player) {
			var num = game.countPlayer(function (current) {
				if (player.hasZhuSkill("guiming") && current.group == "wu") return true;
				return current.isDamaged();
			});
			return num > 3;
		},
		prompt: function (event, player) {
			var num = game.countPlayer(function (current) {
				if (player.hasZhuSkill("guiming") && current.group == "wu" && current != player) return true;
				return current.isDamaged();
			});
			return "残蚀：是否改为摸" + get.cnNumber(num) + "张牌？";
		},
		filter: function (event, player) {
			return !event.numFixed;
		},
		content: function () {
			trigger.changeToZero();
			var num = game.countPlayer(function (current) {
				if (player.hasZhuSkill("guiming") && current.group == "wu" && current != player) return true;
				return current.isDamaged();
			});
			if (num > 0) {
				player.draw(num);
			}
			player.addTempSkill("canshi2");
		},
	},
	canshi2: {
		trigger: { player: "useCard" },
		forced: true,
		sourceSkill: "canshi",
		filter: function (event, player) {
			if (player.countCards("he") == 0) return false;
			var type = get.type(event.card, "trick");
			return type == "basic" || type == "trick";
		},
		autodelay: true,
		content: function () {
			player.chooseToDiscard(true, "he");
		},
	},
	chouhai: {
		audio: 2,
		trigger: { player: "damageBegin3" },
		forced: true,
		check: function () {
			return false;
		},
		filter: function (event, player) {
			return player.countCards("h") == 0;
		},
		content: function () {
			trigger.num++;
		},
		ai: {
			neg: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "damage") && target.countCards("h") == 0) return [1, -2];
				},
			},
		},
	},
	recanshi: {
		audio: "canshi",
		trigger: { player: "phaseDrawBegin2" },
		check: function (event, player) {
			if (
				player.skipList.includes("phaseUse") ||
				!player.countCards("h", function (card) {
					return get.type(card, "trick") == "trick" && player.hasUseTarget(card);
				})
			)
				return true;
			var num = game.countPlayer(function (current) {
				if (player.hasZhuSkill("guiming") && current.group == "wu") return true;
				return current.isDamaged();
			});
			return num > 1;
		},
		prompt: function (event, player) {
			var num = game.countPlayer(function (current) {
				if (player.hasZhuSkill("guiming") && current.group == "wu" && current != player) return true;
				return current.isDamaged();
			});
			return "残蚀：是否多摸" + get.cnNumber(num) + "张牌？";
		},
		filter: function (event, player) {
			return (
				!event.numFixed &&
				game.hasPlayer(function (current) {
					if (player.hasZhuSkill("guiming") && current.group == "wu" && current != player) return true;
					return current.isDamaged();
				})
			);
		},
		content: function () {
			var num = game.countPlayer(function (current) {
				if (player.hasZhuSkill("guiming") && current.group == "wu" && current != player) return true;
				return current.isDamaged();
			});
			if (num > 0) {
				trigger.num += num;
			}
			player.addTempSkill("recanshi2");
		},
	},
	recanshi2: {
		trigger: { player: "useCard" },
		forced: true,
		sourceSkill: "recanshi",
		filter: function (event, player) {
			if (player.countCards("he") == 0) return false;
			if (event.card.name == "sha") return true;
			return get.type(event.card) == "trick";
		},
		autodelay: true,
		content: function () {
			player.chooseToDiscard(true, "he");
		},
	},
	rechouhai: {
		audio: "chouhai",
		trigger: { player: "damageBegin3" },
		forced: true,
		check: function () {
			return false;
		},
		filter: function (event, player) {
			return event.card && event.card.name == "sha" && player.countCards("h") == 0;
		},
		content: function () {
			trigger.num++;
		},
		ai: {
			neg: true,
			effect: {
				target: function (card, player, target, current) {
					if (card.name == "sha" && target.countCards("h") == 0) return [1, -2];
				},
			},
		},
	},
	kunfen: {
		audio: 2,
		audioname2: { ol_sb_jiangwei: "kunfen_ol_sb_jiangwei" },
		trigger: { player: "phaseJieshuBegin" },
		locked: function (skill, player) {
			if (!player || !player.storage.kunfen) return true;
			return false;
		},
		direct: true,
		content: function () {
			"step 0";
			if (player.storage.kunfen || (get.mode() == "guozhan" && player.hiddenSkills.includes("kunfen"))) {
				if (!player.storage.kunfen) event.skillHidden = true;
				player.chooseBool(get.prompt("kunfen"), "失去1点体力，然后摸两张牌").set("ai", function () {
					var player = _status.event.player;
					if (player.hp > 3) return true;
					if (player.hp == 3 && player.countCards("h") < 3) return true;
					if (player.hp == 2 && player.countCards("h") == 0) return true;
					return false;
				});
			} else event._result = { bool: true };
			"step 1";
			if (result.bool) {
				player.logSkill("kunfen");
				player.loseHp();
			} else event.finish();
			"step 2";
			player.draw(2);
		},
		ai: { threaten: 1.5 },
	},
	fengliang: {
		skillAnimation: true,
		animationColor: "thunder",
		unique: true,
		juexingji: true,
		audio: 2,
		derivation: "oltiaoxin",
		trigger: { player: "dying" },
		//priority:10,
		forced: true,
		filter: function (event, player) {
			return !player.storage.kunfen;
		},
		content: function () {
			"step 0";
			player.awakenSkill("fengliang");
			player.loseMaxHp();
			"step 1";
			if (player.hp < 2) {
				player.recover(2 - player.hp);
			}
			"step 2";
			player.storage.kunfen = true;
			player.addSkills("oltiaoxin");
		},
	},
	zhuiji: {
		mod: {
			globalFrom: function (from, to) {
				if (from.hp >= to.hp) return -Infinity;
			},
		},
	},
	oldcihuai: {
		audio: "cihuai",
		trigger: { player: "phaseUseBegin" },
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		check: function (event, player) {
			return !player.countCards("h", "sha");
		},
		content: function () {
			player.showHandcards();
			if (!player.countCards("h", "sha")) player.addTempSkill("oldcihuai2");
		},
	},
	oldcihuai2: {
		group: "oldcihuai3",
		prompt: "视为使用一张杀",
		enable: "chooseToUse",
		viewAs: { name: "sha", isCard: true },
		sourceSkill: "oldcihuai",
		filterCard: function () {
			return false;
		},
		selectCard: -1,
		ai: {
			presha: true,
			respondSha: true,
		},
	},
	oldcihuai3: {
		trigger: {
			player: ["loseAfter"],
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter", "die"],
		},
		silent: true,
		firstDo: true,
		sourceSkill: "oldcihuai",
		filter: function (event, player) {
			if (event.name == "die") return true;
			var evt = event.getl(player);
			return evt && evt.hs && evt.hs.length > 0;
		},
		content: function () {
			player.removeSkill("oldcihuai2");
		},
	},
	cihuai: {
		trigger: { player: "phaseUseBegin" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("h", "sha") == 0;
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("cihuai"), function (card, player, target) {
					return player.canUse({ name: "sha", isCard: true }, target);
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					return get.effect(target, { name: "sha", isCard: true }, player, player);
				});
			"step 1";
			if (result.bool) {
				player.logSkill("cihuai");
				player.showHandcards();
				player.useCard({ name: "sha", isCard: true }, result.targets);
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	jilei: {
		trigger: { player: "damageEnd" },
		audio: 2,
		direct: true,
		filter: function (event) {
			return event.source && event.source.isIn();
		},
		content: function () {
			"step 0";
			player
				.chooseControl("basic", "trick", "equip", "cancel2", function () {
					var source = _status.event.source;
					if (get.attitude(_status.event.player, source) > 0) return "cancel2";
					var list = ["basic", "trick", "equip"].filter(function (name) {
						return !source.storage.jilei2 || !source.storage.jilei2.includes(name);
					});
					if (!list.length) return "cancel2";
					if (
						list.includes("trick") &&
						source.countCards("h", function (card) {
							return get.type(card, null, source) == "trick" && source.hasValueTarget(card);
						}) > 1
					)
						return "trick";
					return list[0];
				})
				.set("prompt", get.prompt2("jilei", trigger.source))
				.set("source", trigger.source);
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("jilei", trigger.source);
				player.popup(get.translation(result.control) + "牌");
				trigger.source.addTempSkill("jilei2", { player: "phaseBegin" });
				trigger.source.storage.jilei2.add(result.control);
				trigger.source.updateMarks("jilei2");
			}
		},
		ai: {
			maixie_defend: true,
			threaten: 0.7,
		},
	},
	jilei2: {
		unique: true,
		charlotte: true,
		intro: {
			content: function (storage) {
				return "不能使用、打出或弃置" + get.translation(storage) + "牌";
			},
		},
		init: function (player, skill) {
			if (!player.storage[skill]) player.storage[skill] = [];
		},
		mark: true,
		onremove: true,
		mod: {
			cardDiscardable: function (card, player) {
				if (player.storage.jilei2.includes(get.type(card, "trick"))) return false;
			},
			cardEnabled: function (card, player) {
				if (player.storage.jilei2.includes(get.type(card, "trick"))) {
					var hs = player.getCards("h"),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
			cardRespondable: function (card, player) {
				if (player.storage.jilei2.includes(get.type(card, "trick"))) {
					var hs = player.getCards("h"),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
			cardSavable: function (card, player) {
				if (player.storage.jilei2.includes(get.type(card, "trick"))) {
					var hs = player.getCards("h"),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
		},
	},
	danlao: {
		audio: 2,
		filter: function (event, player) {
			return (event.card.name == "sha" || get.type(event.card) == "trick") && event.targets && event.targets.length > 1;
		},
		check: function (event, player) {
			return event.getParent().excluded.includes(player) || get.tag(event.card, "multineg") || get.effect(player, event.card, event.player, player) <= 0;
		},
		trigger: { target: "useCardToTargeted" },
		content: function () {
			trigger.getParent().excluded.add(player);
			player.draw();
		},
		ai: {
			effect: {
				target(card) {
					if (get.type(card) != "trick") return;
					if (card.name == "tiesuo") return [0, 0];
					if (card.name == "yihuajiemu") return [0, 1];
					if (get.tag(card, "multineg")) return [0, 2];
				},
			},
		},
	},
	taichen: {
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return player.canUse("sha", target);
		},
		content: function () {
			"step 0";
			player.loseHp();
			"step 1";
			player.useCard({ name: "sha", isCard: true }, target, false);
		},
		ai: {
			order: 1,
			result: {
				target: function (player, target) {
					if (player.hp > 2 && player.hp > target.hp && target.countCards("he") < 4) {
						return get.effect(target, { name: "sha" }, player, target);
					}
					return 0;
				},
			},
		},
	},
	naman: {
		audio: 2,
		trigger: { global: "respondAfter" },
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			if (event.player == player) return false;
			if (event.cards) {
				for (var i = 0; i < event.cards.length; i++) {
					if (get.position(event.cards[i], true) == "o") return true;
				}
			}
			return false;
		},
		frequent: true,
		content: function () {
			var cards = trigger.cards.slice(0);
			for (var i = 0; i < cards.length; i++) {
				if (get.position(cards[i], true) != "o") {
					cards.splice(i--, 1);
				}
			}
			game.delay(0.5);
			player.gain(cards, "gain2");
		},
	},
	xiemu: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countCards("h", "sha") > 0;
		},
		filterCard: { name: "sha" },
		check: function (card) {
			return 6 - get.value(card);
		},
		content() {
			"step 0";
			let list = game.filterPlayer(target => {
				const group = target[get.mode() === "guozhan" ? "identity" : "group"];
				return group !== "unkonwn";
			}).map(current => current[get.mode() === "guozhan" ? "identity" : "group"]).unique();
			if (player.storage.xiemu2) list.removeArray(player.storage.xiemu2);
			var list2 = list.slice(0);
			list2.sort(function (a, b) {
				return lib.skill.xiemu.count(b) - lib.skill.xiemu.count(a);
			});
			player
				.chooseControl(list)
				.set("prompt", "请选择一个势力")
				.set("ai", function () {
					return _status.event.group;
				})
				.set("group", list2[0]);
			"step 1";
			player.popup(result.control + 2, get.groupnature(result.control));
			game.log(player, "选择了", "#g" + get.translation(result.control + 2));
			player.addTempSkill("xiemu2", { player: "phaseBegin" });
			player.storage.xiemu2.add(result.control);
			player.updateMarks("xiemu2");
		},
		ai: {
			order: 1,
			result: { player: 1 },
		},
		count(group) {
			var player = _status.event.player;
			return game.countPlayer(function (current) {
				return current != player && (current[get.mode() === "guozhan" ? "identity" : "group"] == group) == group && get.attitude(current, player) < 0;
			});
		},
	},
	xiemu2: {
		onremove: true,
		mark: true,
		forced: true,
		audio: "xiemu",
		sourceSkill: "xiemu",
		intro: {
			content: function (storage) {
				return "已指定" + get.translation(storage) + "势力";
			},
		},
		trigger: {
			target: "useCardToTargeted",
		},
		init: function (player) {
			if (!player.storage.xiemu2) player.storage.xiemu2 = [];
		},
		filter: function (event, player) {
			if (!player.storage.xiemu2) return false;
			if (get.color(event.card) != "black") return false;
			if (!event.player) return false;
			if (event.player == player || !player.storage.xiemu2.includes(event.player.group)) return false;
			return true;
		},
		content: function () {
			player.draw(2);
		},
	},
	oldxiemu: {
		audio: "xiemu",
		trigger: { target: "useCardToTargeted" },
		filter: function (event, player) {
			if (get.color(event.card) != "black") return false;
			if (!event.player) return false;
			if (event.player == player) return false;
			if (get.mode() != "guozhan") return false;
			return player.countCards("h", "sha") > 0;
		},
		direct: true,
		content: function () {
			"step 0";
			var next = player.chooseToDiscard("协穆：是否弃置一张杀并摸两张牌？", { name: "sha" });
			next.set("ai", function (card) {
				return 9 - get.value(card);
			});
			next.logSkill = "xiemu";
			"step 1";
			if (result.bool) {
				player.draw(2);
			}
		},
		ai: {
			effect: {
				target_use(card, player, target) {
					if (get.color(card) == "black" && target.countCards("h") > 0) {
						return [1, 0.5];
					}
				},
			},
		},
	},
	spmengjin: {
		trigger: { player: "shaBegin" },
		filter: function (event, player) {
			return event.target.countCards("he") > 0;
		},
		direct: true,
		content: function () {
			"step 0";
			var att = get.attitude(player, trigger.target);
			player.choosePlayerCard(get.prompt("spmengjin", trigger.target), "he", trigger.target).ai = function (button) {
				var val = get.buttonValue(button);
				if (att > 0) return -val;
				return val;
			};
			"step 1";
			if (result.bool) {
				trigger.target.discard(result.links);
				player.logSkill("spmengjin", trigger.target);
				trigger.target.addTempSkill("mengjin2", "shaAfter");
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	fenxun_old: {
		audio: 2,
		trigger: { player: "shaBefore" },
		direct: true,
		filter: function (event, player) {
			return event.targets.length == 1;
		},
		position: "he",
		content: function () {
			"step 0";
			player.chooseCardTarget({
				filterCard: lib.filter.cardDiscardable,
				filterTarget: function (card, player, target) {
					var trigger = _status.event.getTrigger();
					return lib.filter.targetEnabled(trigger.card, player, target) && target != trigger.targets[0];
				},
				ai1: function (card) {
					return 6 - get.value(card);
				},
				ai2: function (target) {
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					return get.effect(target, trigger.card, player, player);
				},
				prompt: get.prompt2("fenxun"),
			});
			"step 1";
			if (result.bool) {
				player.discard(result.cards);
				trigger.targets.push(result.targets[0]);
				player.logSkill("fenxun", result.targets);
			}
		},
	},
	rezhoufu: {
		audio: "zhoufu",
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return player.countCards("he") > 0;
		},
		filterCard: true,
		filterTarget: function (card, player, target) {
			return target != player && !target.getExpansions("rezhoufu_judge").length;
		},
		check: function (card) {
			return 6 - get.value(card);
		},
		position: "he",
		discard: false,
		lose: false,
		delay: false,
		content: function () {
			target.addToExpansion(cards, player, "give").gaintag.add("rezhoufu_judge");
			target.addSkill("rezhoufu_judge");
		},
		ai: {
			order: 1,
			result: {
				target: -1,
			},
		},
		group: ["rezhoufu_losehp"],
		subSkill: {
			judge: {
				audio: "zhoufu",
				init: player => {
					player.storage.rezhoufu_judge_markcount = 0;
				},
				onremove: player => {
					delete player.storage.rezhoufu_judge_markcount;
					let cards = player.getExpansions("rezhoufu_judge");
					if (cards.length) player.loseToDiscardpile(cards);
				},
				intro: {
					content: "expansion",
				},
				trigger: { player: "judgeBefore" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return !event.directresult && player.getExpansions("rezhoufu_judge").length;
				},
				content: function () {
					trigger.directresult = player.getExpansions("rezhoufu_judge")[0];
					player.storage.rezhoufu_judge_markcount = 0;
				},
			},
			losehp: {
				audio: "zhoufu",
				trigger: { global: "phaseEnd" },
				forced: true,
				filter: function (event, player) {
					return game.hasPlayer(function (current) {
						return current.hasHistory("lose", function (evt) {
							if (!evt || !evt.xs || !evt.xs.length) return false;
							for (var i in evt.gaintag_map) {
								if (evt.gaintag_map[i].includes("rezhoufu_judge")) return true;
							}
							return false;
						});
					});
				},
				logTarget: function (current) {
					return game
						.filterPlayer(function (current) {
							return current.hasHistory("lose", function (evt) {
								if (!evt || !evt.xs || !evt.xs.length) return false;
								for (var i in evt.gaintag_map) {
									if (evt.gaintag_map[i].includes("rezhoufu_judge")) return true;
								}
								return false;
							});
						})
						.sortBySeat();
				},
				content: function () {
					var targets = game
						.filterPlayer(function (current) {
							return current.hasHistory("lose", function (evt) {
								if (!evt || !evt.xs || !evt.xs.length) return false;
								for (var i in evt.gaintag_map) {
									if (evt.gaintag_map[i].includes("rezhoufu_judge")) return true;
								}
								return false;
							});
						})
						.sortBySeat();
					while (targets.length) {
						targets.shift().loseHp();
					}
				},
			},
		},
	},
	reyingbing: {
		audio: "yingbin",
		trigger: { global: "useCard" },
		forced: true,
		filter: function (event, player) {
			var cards = event.player.getExpansions("rezhoufu_judge");
			return cards.length && get.color(cards[0]) == get.color(event.card);
		},
		logTarget: "player",
		content: function () {
			"step 0";
			player.draw();
			"step 1";
			trigger.player.storage.rezhoufu_judge_markcount++;
			if (trigger.player.storage.rezhoufu_judge_markcount >= 2) {
				var cards = trigger.player.getExpansions("rezhoufu_judge");
				player.gain(cards, trigger.player, "give", "bySelf");
				trigger.player.removeSkill("rezhoufu_judge");
			} else trigger.player.markSkill("rezhoufu_judge");
		},
		ai: {
			combo: "rezhoufu",
		},
	},
	zhoufu: {
		audio: 2,
	},
	yingbin: {
		audio: 2,
	},
	kuiwei: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		check: function (event, player) {
			if (player.isTurnedOver()) return true;
			var num = game.countPlayer(function (current) {
				return current.getEquip(1);
			});
			return num > 1;
		},
		content: function () {
			"step 0";
			player.turnOver();
			"step 1";
			var num = game.countPlayer(function (current) {
				return current.getEquips(1).length;
			});
			player.draw(2 + num);
			player.addSkill("kuiwei2");
		},
	},
	kuiwei2: {
		trigger: { player: "phaseDrawBegin" },
		forced: true,
		audio: false,
		sourceSkill: "kuiwei",
		content: function () {
			var num = game.countPlayer(function (current) {
				return current.getEquips(1).length;
			});
			if (num >= player.countCards("he")) {
				player.discard(player.getCards("he"));
			} else if (num) {
				player.chooseToDiscard("he", num, true);
			}
			player.removeSkill("kuiwei2");
		},
	},
	yanzheng: {
		enable: "chooseToUse",
		audio: 2,
		filter: function (event, player) {
			return player.hp < player.countCards("h") && player.countCards("e") > 0;
		},
		viewAsFilter: function (player) {
			return player.hp < player.countCards("h") && player.countCards("e") > 0;
		},
		filterCard: true,
		position: "e",
		viewAs: { name: "wuxie" },
		prompt: "将一张装备区内的牌当无懈可击使用",
		check: function (card) {
			return 8 - get.equipValue(card);
		},
		threaten: 1.2,
	},
	tongji: {
		global: "tongji_disable",
		audio: 2,
		trigger: { global: "useCard1" },
		forced: true,
		filter: function (event, player) {
			return event.targets.includes(player) && player != event.player && event.card.name == "sha" && player.hp < player.countCards("h");
		},
		content: function () {},
		ai: {
			neg: true,
		},
		unique: true,
		gainable: true,
		subSkill: {
			disable: {
				mod: {
					targetEnabled: function (card, player, target) {
						if (card.name == "sha") {
							if (player.hasSkill("tongji")) return;
							if (target.hasSkill("tongji")) return;
							if (
								game.hasPlayer(function (current) {
									return current.hasSkill("tongji") && current.hp < current.countCards("h") && player.inRange(current);
								})
							) {
								return false;
							}
						}
					},
				},
			},
		},
	},
	wangzun: {
		audio: 2,
		audioname: ["old_yuanshu"],
		trigger: { global: "phaseZhunbeiBegin" },
		check: function (event, player) {
			var att = get.attitude(player, event.player);
			return !game.hasPlayer(function (current) {
				return get.attitude(player, current) < att;
			});
		},
		filter: function (event, player) {
			return event.player != player && !player.storage.wangzun;
		},
		logTarget: "player",
		content: function () {
			player.draw();
			player.markSkill("wangzun");
			player.storage.wangzun = trigger.player;
			trigger.player.addTempSkill("wangzun3");
		},
		ai: {
			expose: 0.2,
		},
		intro: {
			content: "player",
		},
		group: "wangzun2",
	},
	wangzun2: {
		trigger: { player: "phaseZhunbeiBegin" },
		silent: true,
		sourceSkill: "wangzun",
		content: function () {
			player.unmarkSkill("wangzun");
			player.storage.wangzun = null;
		},
	},
	wangzun3: {
		mod: {
			maxHandcard: function (player, num) {
				return num - 1;
			},
		},
	},
	kaikang: {
		audio: 2,
		trigger: { global: "useCardToTargeted" },
		filter: function (event, player) {
			return event.card.name == "sha" && get.distance(player, event.target) <= 1 && event.target.isIn();
		},
		check: function (event, player) {
			return get.attitude(player, event.target) >= 0;
		},
		logTarget: "target",
		content: function () {
			"step 0";
			player.draw();
			if (trigger.target != player) {
				player.chooseCard(true, "he", "交给" + get.translation(trigger.target) + "一张牌").set("ai", function (card) {
					if (get.position(card) == "e") return -1;
					if (card.name == "shan") return 1;
					if (get.type(card) == "equip") return 0.5;
					return 0;
				});
			} else {
				event.finish();
			}
			"step 1";
			player.give(result.cards, trigger.target, "give");
			game.delay();
			event.card = result.cards[0];
			"step 2";
			if (trigger.target.getCards("h").includes(card) && get.type(card) == "equip") {
				trigger.target.chooseUseTarget(card);
			}
		},
		ai: {
			threaten: 1.1,
		},
	},
	liangzhu: {
		audio: 2,
		trigger: { global: "recoverAfter" },
		direct: true,
		filter: function (event, player) {
			return event.player.isPhaseUsing();
		},
		content: function () {
			"step 0";
			if (player == trigger.player) {
				player
					.chooseControl("摸一张", "摸两张", "cancel2", function () {
						return "摸两张";
					})
					.set("prompt", get.prompt2("liangzhu"));
				event.single = true;
			} else {
				player
					.chooseTarget(get.prompt2("liangzhu"), function (card, player, target) {
						return target == _status.event.player || target == _status.event.target;
					})
					.set("target", trigger.player)
					.set("ai", function (target) {
						var player = _status.event.player;
						if (player == target) return 1;
						return get.attitude(player, target) - 1.5;
					});
			}
			"step 1";
			if (event.single) {
				if (result.control != "cancel2") {
					player.logSkill("liangzhu", player);
					if (result.control == "摸一张") {
						player.draw();
					} else {
						player.draw(2);
						if (!player.storage.liangzhu) player.storage.liangzhu = [];
						player.storage.liangzhu.add(player);
					}
				}
			} else if (result.bool) {
				var target = result.targets[0];
				player.logSkill("liangzhu", target);
				if (target == player) {
					target.draw();
				} else {
					target.draw(2);
					if (target.storage.liangzhu) {
						target.storage.liangzhu.add(player);
					} else {
						target.storage.liangzhu = [player];
					}
				}
			}
		},
		ai: {
			expose: 0.1,
		},
	},
	fanxiang: {
		skillAnimation: true,
		animationColor: "fire",
		audio: 2,
		unique: true,
		juexingji: true,
		derivation: "xiaoji",
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			if (player.storage.fanxiang) return false;
			return game.hasPlayer(function (current) {
				return current.storage.liangzhu && current.storage.liangzhu.includes(player) && current.isDamaged();
			});
		},
		forced: true,
		content: function () {
			player.awakenSkill("fanxiang");
			player.gainMaxHp();
			player.recover();
			player.changeSkills(["xiaoji"], ["liangzhu"]);
		},
		ai: {
			combo: "liangzhu",
		},
	},
	mingshi: {
		audio: 2,
		trigger: { player: "damageBegin3" },
		direct: true,
		filter: function (event, player) {
			return event.source && event.source.hp > player.hp;
		},
		content: function () {
			"step 0";
			var next = player.chooseToDiscard(get.prompt2("mingshi"), { color: "black" });
			next.set("ai", function (card) {
				return 9 - get.value(card);
			});
			next.set("logSkill", "mingshi");
			"step 1";
			if (result.bool) {
				trigger.num--;
			}
		},
		ai: {
			threaten: 0.8,
		},
	},
	lirang: {
		audio: 2,
		trigger: {
			player: "loseAfter",
			global: "loseAsyncAfter",
		},
		filter: function (event, player) {
			if (!game.hasPlayer(current => current != player)) return false;
			if (event.type != "discard" || event.getlx === false) return false;
			var evt = event.getl(player);
			if (!evt || !evt.cards2) return false;
			for (var i = 0; i < evt.cards2.length; i++) {
				if (get.position(evt.cards2[i]) == "d") {
					return true;
				}
			}
			return false;
		},
		direct: true,
		preHidden: true,
		content: function () {
			"step 0";
			if (trigger.delay == false) game.delay();
			event.cards = [];
			var cards2 = trigger.getl(player).cards2;
			for (var i = 0; i < cards2.length; i++) {
				if (get.position(cards2[i], true) == "d") {
					event.cards.push(cards2[i]);
				}
			}
			if (_status.connectMode)
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			event.given_map = {};
			"step 1";
			var goon = false;
			for (var i = 0; i < event.cards.length; i++) {
				if (event.cards[i].name == "du") {
					goon = true;
					break;
				}
			}
			if (!goon) {
				goon = game.hasPlayer(function (current) {
					return player != current && get.attitude(player, current) > 1;
				});
			}
			player
				.chooseButton(["礼让：是否分配本次弃置的牌？", event.cards], [1, event.cards.length])
				.set("ai", function (button) {
					if (_status.event.goon && ui.selected.buttons.length == 0) return 1 + Math.abs(get.value(button.link));
					return 0;
				})
				.set("goon", goon)
				.setHiddenSkill("lirang");
			"step 2";
			if (result.bool) {
				event.cards.removeArray(result.links);
				event.togive = result.links.slice(0);
				player
					.chooseTarget("选择一名其他角色获得" + get.translation(result.links), true, lib.filter.notMe)
					.set("ai", function (target) {
						var att = get.attitude(_status.event.player, target);
						if (_status.event.enemy) {
							return -att;
						} else if (att > 0) {
							return att / (1 + target.countCards("h"));
						} else {
							return att / 100;
						}
					})
					.set("enemy", get.value(event.togive[0], player, "raw") < 0);
			} else event.goto(4);
			"step 3";
			if (result.targets.length) {
				var id = result.targets[0].playerid,
					map = event.given_map;
				if (!map[id]) map[id] = [];
				map[id].addArray(event.togive);
			}
			if (cards.length > 0) event.goto(1);
			"step 4";
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			var list = [],
				targets = [];
			for (var i in event.given_map) {
				var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
				list.push([source, event.given_map[i]]);
				targets.push(source);
			}
			if (targets.length) {
				player.logSkill("lirang", targets);
				game.loseAsync({
					gain_list: list,
					giver: player,
					animate: "gain2",
				}).setContent("gaincardMultiple");
			}
		},
		ai: {
			expose: 0.1,
			effect: {
				target: function (card, player, target, current) {
					if (target.hasFriend() && get.tag(card, "discard")) {
						if (current < 0) return 0;
						return [1, 1];
					}
				},
			},
		},
	},
	moukui: {
		audio: 2,
		audioname: ["sp_mushun"],
		trigger: { player: "useCardToPlayered" },
		filter: function (event, player) {
			return event.card.name == "sha";
		},
		async cost(event, trigger, player) {
			const controls = ["draw_card"];
			if (trigger.target.countCards("he")) {
				controls.push("discard_card");
			}
			controls.push("cancel");
			const result = await player
				.chooseControl(controls)
				.set("ai", function () {
					var trigger = _status.event.getTrigger();
					if (trigger.target.countCards("he") && get.attitude(_status.event.player, trigger.target) < 0) {
						return "discard_card";
					} else {
						return "draw_card";
					}
				})
				.set("prompt", get.prompt2("moukui", trigger.target));
			event.result = {
				bool: result.control != "cancel",
				targets: [trigger.target],
				cost_data: result.control,
			};
		},
		async content(event, trigger, player) {
			const result = event.cost_data;
			if (result == "draw_card") {
				await player.draw();
			} else if (trigger.target.countCards("he")) {
				await player.discardPlayerCard(trigger.target, "he", true);
			}
			player.markAuto("moukui2", trigger.target);
		},
		group: "moukui2",
		ai: {
			expose: 0.1,
		},
	},
	moukui2: {
		audio: false,
		trigger: { player: "shaMiss" },
		forced: true,
		sourceSkill: "moukui",
		onremove: true,
		filter(event, player) {
			if (!player.getStorage("moukui2").includes(event.target)) return false;
			return player.countCards("he") > 0;
		},
		content() {
			trigger.target.line(player, "green");
			trigger.target.discardPlayerCard(player, true);
			player.unmarkAuto("moukui2", [trigger.target]);
		},
	},
	shenxian: {
		audio: 2,
		trigger: { global: ["loseAfter", "loseAsyncAfter"] },
		filter: function (event, player) {
			if (event.type != "discard" || _status.currentPhase == player || event.getlx === false) return false;
			if (event.name == "lose" && event.player == player) return false;
			if (player.hasSkill("shenxian2")) return false;
			var cards = event.cards.slice(0);
			var evt = event.getl(player);
			if (evt && evt.cards) cards.removeArray(evt.cards);
			for (var i = 0; i < cards.length; i++) {
				if (get.type(cards[i], null, event.hs && event.hs.includes(cards[i]) ? event.player : false) == "basic" && cards[i].original != "j") {
					return true;
				}
			}
			return false;
		},
		frequent: true,
		content: function () {
			"step 0";
			if (trigger.delay == false) game.delay();
			"step 1";
			player.draw();
			if (event.name == "shenxian") player.addTempSkill("shenxian2");
		},
		ai: {
			threaten: 1.5,
		},
	},
	shenxian2: { charlotte: true },
	qiangwu: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		content: function () {
			"step 0";
			player.judge(card => {
				if (
					game.hasPlayer(cur => {
						return get.event("player").canUse("sha", cur);
					})
				)
					return get.number(card);
				return 1 / get.number(card);
			});
			"step 1";
			player.storage.qiangwu = result.number;
			player.addTempSkill("qiangwu3", "phaseUseEnd");
		},
		ai: {
			result: {
				player: 1,
			},
			order: 11,
		},
	},
	qiangwu3: {
		mod: {
			targetInRange: function (card, player) {
				if (card.name == "sha") {
					const num = get.number(card);
					if (num == "unsure" || num < player.storage.qiangwu) return true;
				}
			},
			cardUsable: function (card, player) {
				if (card.name == "sha") {
					const num = get.number(card);
					if (num == "unsure" || num > player.storage.qiangwu) return true;
				}
			},
		},
		trigger: { player: "useCard1" },
		sourceSkill: "qiangwu",
		filter: function (event, player) {
			if (_status.currentPhase == player && event.card.name == "sha" && get.number(event.card) > player.storage.qiangwu && event.addCount !== false) return true;
			return false;
		},
		forced: true,
		popup: false,
		firstDo: true,
		content: function () {
			trigger.addCount = false;
			if (player.stat[player.stat.length - 1].card.sha > 0) {
				player.stat[player.stat.length - 1].card.sha--;
			}
		},
	},
	zhendu: {
		audio: 2,
		trigger: { global: "phaseUseBegin" },
		filter: function (event, player) {
			return /*(get.mode()!='guozhan'||event.player!=player)&&*/ event.player.isIn() && player.countCards("h") > 0 && event.player.hasUseTarget({ name: "jiu" }, null, true);
		},
		direct: true,
		preHidden: true,
		content: function () {
			"step 0";
			var nono = Math.abs(get.attitude(player, trigger.player)) < 3;
			if (player == trigger.player || get.damageEffect(trigger.player, player, player) <= 0 || !trigger.player.hasUseTarget({ name: "jiu" }, null, true)) {
				nono = true;
			} else if (trigger.player.hp > 2) {
				nono = true;
			} else if (trigger.player.hp > 1 && player.countCards("h") < 3 && trigger.player.canUse("sha", player) && !player.countCards("h", "shan") && trigger.player.countCards("h") >= 3) {
				nono = true;
			}
			var next = player.chooseToDiscard(get.prompt2("zhendu", trigger.player));
			next.set("ai", function (card) {
				if (_status.event.nono) return -1;
				return 7 - get.useful(card);
			});
			next.set("logSkill", ["zhendu", trigger.player]);
			next.set("nono", nono);
			next.setHiddenSkill("zhendu");
			"step 1";
			if (result.bool) {
				trigger.player.chooseUseTarget({ name: "jiu" }, true, "noTargetDelay", "nodelayx");
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool && trigger.player != player) trigger.player.damage();
		},
		ai: {
			threaten: 2,
			expose: 0.3,
		},
	},
	qiluan: {
		audio: "qiluan2",
		preHidden: true,
		trigger: { global: "phaseEnd" },
		frequent: true,
		filter: function (event, player) {
			return game.hasPlayer2(function (current) {
				return current.getStat("kill") > 0;
			});
		},
		prompt: function (event, player) {
			var num = game.countPlayer2(function (current) {
				return (current.getStat("kill") || 0) * (current == player ? 3 : 1);
			});
			return get.prompt("qiluan") + "（可摸" + get.cnNumber(num) + "张牌）";
		},
		content: function () {
			//if(get.mode()=='guozhan'){
			//	player.draw(3);
			//}
			//else{
			player.draw(
				game.countPlayer2(function (current) {
					return (current.getStat("kill") || 0) * (current == player ? 3 : 1);
				})
			);
			//}
		},
		subSkill: {
			draw: {
				trigger: { global: "dieAfter" },
				frequent: true,
				filter: function (event, player) {
					return /*get.mode()!='guozhan'&&*/ player != event.source;
				},
				content: function () {
					player.draw();
				},
			},
		},
	},
	qiluan2: {
		audio: 2,
	},
	zniaoxiang: {
		audio: 2,
		trigger: { player: "useCardToPlayered" },
		forced: true,
		filter: function (event, player) {
			return event.card.name == "sha" && !event.getParent().directHit.includes(event.target);
		},
		//priority:-1,
		logTarget: "target",
		content: function () {
			var id = trigger.target.playerid;
			var map = trigger.getParent().customArgs;
			if (!map[id]) map[id] = {};
			if (typeof map[id].shanRequired == "number") {
				map[id].shanRequired++;
			} else {
				map[id].shanRequired = 2;
			}
		},
	},
	shangyi: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return player != target && target.countCards("h");
		},
		content: function () {
			"step 0";
			player.chooseCardButton(target, target.getCards("h")).set("filterButton", function (button) {
				return get.color(button.link) == "black";
			});
			"step 1";
			if (result.bool) {
				target.discard(result.links[0]);
			}
		},
		ai: {
			order: 11,
			result: {
				target: function (player, target) {
					return -target.countCards("h");
				},
			},
			threaten: 1.1,
		},
	},
	shengxi: {
		trigger: { player: "phaseDiscardBegin" },
		frequent: true,
		filter: function (event, player) {
			return !player.getStat("damage");
		},
		content: function () {
			player.draw(2);
		},
		audio: 2,
		audioname: ["liushan"],
	},
	shoucheng: {
		init(player) {
			game.addGlobalSkill("shoucheng_draw", player);
		},
		onremove: () => {
			if (!game.hasPlayer(i => i.hasSkill("shoucheng", null, null, false), true)) game.removeGlobalSkill("shoucheng_draw");
		},
		trigger: {
			global: ["equipAfter", "addJudgeAfter", "loseAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		audio: 2,
		direct: true,
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				if (current == _status.currentPhase) return false;
				var evt = event.getl(current);
				return evt && evt.hs && evt.hs.length && current.countCards("h") == 0;
			});
		},
		content: function () {
			"step 0";
			event.list = game
				.filterPlayer(function (current) {
					if (current == _status.currentPhase) return false;
					var evt = trigger.getl(current);
					return evt && evt.hs && evt.hs.length;
				})
				.sortBySeat(_status.currentPhase);
			"step 1";
			var target = event.list.shift();
			event.target = target;
			if (target.isIn() && target.countCards("h") == 0) {
				player.chooseBool(get.prompt2("shoucheng", target)).set("ai", function () {
					return get.attitude(_status.event.player, _status.event.getParent().target) > 0;
				});
			} else event.goto(3);
			"step 2";
			if (result.bool) {
				player.logSkill(event.name, target);
				if (player !== target && (get.mode() !== "identity" || player.identity !== "nei")) player.addExpose(0.15);
				target.draw();
			}
			"step 3";
			if (event.list.length) event.goto(1);
		},
		ai: {
			threaten: 1.3,
		},
		subSkill: {
			draw: {
				trigger: { player: "dieAfter" },
				filter(event, player) {
					return !game.hasPlayer(current => {
						return current.hasSkill("shoucheng", null, null, false);
					}, true);
				},
				content() {
					game.removeGlobalSkill("shoucheng_draw");
				},
				ai: {
					noh: true,
					skillTagFilter(player, tag, arg) {
						if (player === _status.currentPhase || player.countCards("h") !== 1) return false;
						return game.hasPlayer(current => {
							return current.hasSkill("shoucheng") && player.isFriendOf(current);
						});
					},
				},
			},
		},
	},
	hengzheng: {
		audio: 2,
		trigger: { player: "phaseDrawBegin1" },
		preHidden: true,
		filter: function (event, player) {
			return !event.numFixed && (player.hp == 1 || player.countCards("h") == 0);
		},
		check: function (event, player) {
			var num = game.countPlayer(function (current) {
				if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
					return true;
				}
				if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
					return true;
				}
			});
			return num >= 2;
		},
		content: function () {
			"step 0";
			var targets = game.filterPlayer();
			targets.remove(player);
			targets.sort(lib.sort.seat);
			event.targets = targets;
			event.num = 0;
			trigger.changeToZero();
			player.line(targets, "green");
			"step 1";
			if (num < event.targets.length) {
				if (event.targets[num].countCards("hej")) {
					player.gainPlayerCard(event.targets[num], "hej", true);
				}
				event.num++;
				event.redo();
			}
		},
		ai: {
			noh: true,
			skillTagFilter: function (player, tag) {
				if (tag == "noh") {
					if (player.countCards("h") != 1) return false;
				}
			},
			threaten: function (player, target) {
				if (target.hp == 1) return 2.5;
				return 1;
			},
		},
	},
	yongjue: {
		audio: 2,
		trigger: { global: "useCardAfter" },
		usable: 1,
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			if (event.player == player) return false;
			if (event.targets.includes(player)) return false;
			if (event.cards) {
				for (var i = 0; i < event.cards.length; i++) {
					if (get.position(event.cards[i], true) == "o") return true;
				}
			}
			return false;
		},
		frequent: true,
		content: function () {
			var cards = trigger.cards.slice(0);
			for (var i = 0; i < cards.length; i++) {
				if (get.position(cards[i], true) != "o") {
					cards.splice(i--, 1);
				}
			}
			player.gain(cards, "gain2");
		},
	},
	guixiu: {
		audio: 2,
		trigger: { target: "useCardToTargeted" },
		frequent: true,
		filter: function (event, player) {
			return event.card.name == "sha" && player.countCards("h") < player.hp;
		},
		content: function () {
			player.draw();
		},
	},
	cunsi: {
		skillAnimation: true,
		animationColor: "orange",
		audio: 2,
		unique: true,
		enable: "phaseUse",
		mark: true,
		limited: true,
		derivation: "yongjue",
		filter: function (event, player) {
			return !player.storage.cunsi && player.countCards("h") && !player.isTurnedOver();
		},
		init: function (player) {
			player.storage.cunsi = false;
		},
		filterTarget: function (card, player, target) {
			return player != target && target.hasSex("male");
		},
		content: function () {
			"step 0";
			player.awakenSkill("cunsi");
			var cards = player.getCards("h");
			player.give(cards, target);
			"step 1";
			target.addSkills("yongjue");
			"step 2";
			target.markSkillCharacter("yongjue", player, "存嗣", '<div class="skill">【勇决】</div><div>每当其他角色于回合内使用一张杀，若目标不是你，你可以获得之，每回合限一次</div>');
			player.turnOver();
		},
		intro: {
			content: "limited",
		},
		ai: {
			order: 4,
			result: {
				target: function (player, target) {
					if (target.isMin()) return 0;
					if (player.hp > 1) {
						if (game.phaseNumber < game.players.length) return 0;
						if (target.hp == 1 && target.maxHp > 2) return 0;
						if (get.attitude(player, target) < 5) return 0;
					}
					if (get.attitude(player, target) < 5) return 0;
					if (target.hp == 1 && target.maxHp > 2) return 0.2;
					if (target == game.me) return 1.2;
					return 1;
				},
			},
			expose: 0.5,
			threaten: 1.5,
		},
	},
	fenming: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		check: function (event, player) {
			var num = game.countPlayer(function (current) {
				if (current.isLinked() && current.countCards("he")) {
					return get.effect(current, { name: "guohe_copy2" }, player, player);
				}
			});
			return num < 0;
		},
		filter: function (event, player) {
			return player.isLinked();
		},
		preHidden: true,
		prompt: "是否发动【奋命】？",
		logTarget: function (event, player) {
			return game.filterPlayer(function (current) {
				if (current.isLinked() && current.countCards("he")) {
					return true;
				}
			});
		},
		content: function () {
			"step 0";
			event.targets = game.filterPlayer(function (current) {
				if (current.isLinked() && current.countCards("he")) {
					return true;
				}
			});
			event.num = 0;
			event.targets.sort(lib.sort.seat);
			"step 1";
			if (event.num < event.targets.length) {
				var target = event.targets[event.num];
				if (player == target) {
					player.chooseToDiscard(true, "he");
				} else {
					player.discardPlayerCard(true, "he", target);
				}
				event.num++;
				event.redo();
			}
		},
	},
	duanxie: {
		enable: "phaseUse",
		usable: 1,
		audio: 2,
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return current != player && !current.isLinked();
			});
		},
		filterTarget: function (card, player, target) {
			return player != target && !target.isLinked();
		},
		selectTarget: function () {
			return [1, Math.max(1, _status.event.player.getDamagedHp())];
		},
		content: function () {
			if (!target.isLinked()) target.link();
		},
		contentAfter: function () {
			if (!player.isLinked()) player.link();
		},
		ai: {
			result: {
				player(player) {
					return player.isLinked() ? 0 : -0.8;
				},
				target(player, target) {
					return get.effect(target, { name: "tiesuo" }, player, target) / get.attitude(target, target);
				},
			},
			order: 2,
			expose: 0.3,
			effect: {
				target: function (card) {
					if (card.name == "tiesuo") {
						return 0.5;
					}
				},
			},
		},
	},
	xiaoguo: {
		audio: 2,
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return event.player.isIn() && event.player != player && player.countCards("h");
		},
		direct: true,
		content: function () {
			"step 0";
			var next = player.chooseToDiscard(get.prompt("xiaoguo", trigger.player));
			next.set("ai", function (card) {
				return _status.event.eff - get.useful(card);
			});
			next.set("logSkill", ["xiaoguo", trigger.player]);
			next.set(
				"eff",
				(function () {
					if (trigger.player.hasSkillTag("noe")) return get.attitude(_status.event.player, trigger.player);
					return get.damageEffect(trigger.player, player, _status.event.player);
				})()
			);
			"step 1";
			if (result.bool) {
				if (get.mode() !== "identity" || player.identity !== "nei") player.addExpose(0.15);
				trigger.player
					.chooseToDiscard("he", "弃置一张装备牌并令" + get.translation(player) + "摸一张牌，或受到1点伤害", { type: "equip" })
					.set("ai", function (card) {
						if (_status.event.damage > 0) return 0;
						if (_status.event.noe) return 12 - get.value(card);
						return -_status.event.damage - get.value(card);
					})
					.set("damage", get.damageEffect(trigger.player, player, trigger.player))
					.set("noe", trigger.player.hasSkillTag("noe"));
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				player.draw();
			} else {
				trigger.player.damage();
			}
		},
	},
	suishi: {
		audio: 2,
		trigger: { global: "dying" },
		forced: true,
		popup: false,
		logAudio(event, player, name) {
			if (name == "dying") return "suishi1.mp3";
			return "suishi2.mp3";
		},
		filter: function (event, player) {
			return event.player != player && event.parent.name == "damage" && event.parent.source && event.parent.source != event.player;
		},
		content: function () {
			"step 0";
			var str;
			if (trigger.parent.source == player) {
				str = "随势：是否摸一张牌？";
			} else {
				str = "随势：是否令" + get.translation(player) + "摸一张牌？";
			}
			trigger.parent.source
				.chooseBool(str)
				.set("ai", function () {
					return get.attitude(_status.event.player, _status.event.target) > 0;
				})
				.set("target", player);
			"step 1";
			if (result.bool) {
				player.logSkill("suishi");
				trigger.parent.source.line(player, "green");
				player.draw();
			}
		},
		ai: {
			halfneg: true,
		},
		group: "suishi2",
	},
	suishi2: {
		trigger: { global: "dieAfter" },
		forced: true,
		popup: false,
		sourceSkill: "suishi",
		filter: function (event, player) {
			return event.player != player && event.source && event.source != player && event.source != event.player;
		},
		content: function () {
			"step 0";
			var str;
			if (trigger.source == player) {
				str = "随势：是否失去1点体力？";
			} else {
				str = "随势：是否令" + get.translation(player) + "失去1点体力？";
			}
			trigger.source
				.chooseBool(str)
				.set("ai", function () {
					return get.attitude(_status.event.player, _status.event.target) < 0;
				})
				.set("target", player);
			"step 1";
			if (result.bool) {
				player.logSkill("suishi");
				trigger.source.line(player, "green");
				player.loseHp();
			}
		},
	},
	sijian: {
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		direct: true,
		audio: 2,
		preHidden: true,
		filter: function (event, player) {
			if (player.countCards("h")) return false;
			if (event.name == "gain" && event.player == player) return false;
			var evt = event.getl(player);
			return evt && evt.hs && evt.hs.length > 0;
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("sijian"), "弃置一名其他角色的一张牌", function (card, player, target) {
					return player != target && target.countCards("he") > 0;
				})
				.set("ai", function (target) {
					return -get.attitude(_status.event.player, target);
				})
				.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				player.logSkill("sijian", result.targets);
				event.target = result.targets[0];
				player.discardPlayerCard(event.target, true);
			} else {
				event.finish();
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	quji: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		position: "he",
		filterCard: true,
		selectCard: function () {
			var player = _status.event.player;
			return player.getDamagedHp();
		},
		filterTarget: function (card, player, target) {
			return target.hp < target.maxHp;
		},
		filter: function (event, player) {
			return player.hp < player.maxHp;
		},
		selectTarget: function () {
			return [1, ui.selected.cards.length];
		},
		complexSelect: true,
		check: function (card) {
			if (get.color(card) == "black") return -1;
			return 9 - get.value(card);
		},
		content: function () {
			"step 0";
			target.recover();
			"step 1";
			if (target == targets[targets.length - 1]) {
				for (var i = 0; i < cards.length; i++) {
					if (get.color(cards[i], player) == "black") {
						player.loseHp();
						break;
					}
				}
			}
		},
		ai: {
			result: {
				target: 1,
			},
			order: 6,
		},
	},
	junbing: {
		audio: 2,
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return event.player.countCards("h") <= 1 && (player == event.player || player.hasSkill("junbing"));
		},
		async cost(event, trigger, player) {
			event.result = await trigger.player
				.chooseBool(player == trigger.player ? get.prompt("rejunbing") : "是否响应" + get.translation(player) + "的【郡兵】？", "摸一张牌" + (player == trigger.player ? "" : "，将所有手牌交给" + get.translation(player) + "，然后其交给你等量张牌"))
				.set("ai", () => get.event("choice"))
				.set(
					"choice",
					(function () {
						let num = player.countCards("h"),
							att = get.attitude(trigger.player, player);
						if (num == 0) return true;
						if (num == 1) return att > -1;
						if (num == 2) return att > 0;
						return att > 1;
					})()
				)
				.forResult();
		},
		async content(event, trigger, player) {
			const target = trigger.player;
			if (target != player) game.log(target, "响应了", player, "的", "#g【郡兵】");
			await target.draw();
			let cards = target.getCards("h");
			if (target == player || !cards.length) {
				return;
			}
			await target.give(cards, player);
			let num = cards.length,
				result;
			if (player.countCards("he") > num)
				result = await player
					.chooseCard("郡兵：请还给" + get.translation(target) + get.translation(num) + "张牌", "he", true, num)
					.set("ai", card => {
						let player = _status.event.player,
							target = get.event("target");
						if (get.attitude(player, target) <= 0) {
							if (card.name == "du") return 30;
							return -get.value(card);
						}
						return 6 - get.value(card);
					})
					.set("target", target)
					.forResult();
			else
				result = {
					bool: player.hasCard(i => true, "he"),
					cards: player.getCards("he"),
				};
			if (result.bool) await player.give(result.cards, target);
		},
	},
	xiongyi: {
		skillAnimation: true,
		animationColor: "gray",
		unique: true,
		enable: "phaseUse",
		audio: 2,
		limited: true,
		filterTarget: function (card, player, target) {
			if (get.mode() == "guozhan") {
				if (player == target) return true;
				if (player.identity == "unknown") {
					if (!player.wontYe("qun")) return false;
					return target.identity == "qun";
				}
				return target.isFriendOf(player);
			} else {
				return true;
			}
		},
		multitarget: true,
		multiline: true,
		selectTarget: function () {
			if (get.mode() == "guozhan") return -1;
			return [1, Infinity];
		},
		content: function () {
			"step 0";
			player.awakenSkill("xiongyi");
			game.asyncDraw(targets, 3);
			"step 1";
			if (player.isDamaged()) {
				if (get.mode() == "guozhan") {
					if (player.isMinor(true)) {
						player.recover();
					}
				} else if (player.isMinHp()) {
					player.recover();
				}
			}
		},
		ai: {
			order: 1,
			result: {
				target: function (player) {
					var num = player.countCards("h");
					if (player.hp == 1) return 1;
					if (player.hp == 2 && num <= 2) return 1;
					if (player.hp == 3 && num <= 1) return 1;
					if (game.phaseNumber < game.players.length * 2) return 0;
					if (player.hasUnknown()) return 0;
					return 1;
				},
			},
		},
	},
	gzshushen: {
		audio: "shushen",
		trigger: { player: "recoverAfter" },
		direct: true,
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return player != current && player.sameIdentityAs(current);
			});
		},
		content: function () {
			"step 0";
			event.num = trigger.num || 1;
			"step 1";
			player
				.chooseTarget(get.prompt2("gzshushen"), function (card, player, target) {
					return target != player && player.sameIdentityAs(target);
				})
				.set("ai", function (target) {
					return get.attitude(_status.event.player, target);
				});
			"step 2";
			if (result.bool) {
				player.logSkill("gzshushen", result.targets);
				result.targets[0].draw();
				if (event.num > 1) {
					event.num--;
					event.goto(1);
				}
			}
		},
		ai: {
			threaten: 0.8,
			expose: 0.1,
		},
	},
	shushen: {
		audio: 2,
		trigger: { player: "recoverAfter" },
		direct: true,
		content: function () {
			"step 0";
			event.count = trigger.num;
			"step 1";
			player
				.chooseTarget(get.prompt("shushen"), "令一名其他角色选择摸两张牌或回复1点体力", function (card, player, target) {
					return target != player;
				})
				.set("ai", function (target) {
					return get.attitude(_status.event.player, target);
				});
			"step 2";
			if (result.bool) {
				event.count--;
				player.logSkill("shushen", result.targets);
				result.targets[0].chooseDrawRecover(2, true);
				if (event.count) event.goto(1);
			}
		},
		ai: {
			threaten: 0.8,
			expose: 0.1,
		},
	},
	shenzhi: {
		audio: 2,
		trigger: { player: "phaseZhunbeiBegin" },
		check: function (event, player) {
			if (player.hp > 2) return false;
			var cards = player.getCards("h");
			if (cards.length < player.hp) return false;
			if (cards.length > 3) return false;
			for (var i = 0; i < cards.length; i++) {
				if (get.value(cards[i]) > 7 || get.tag(cards[i], "recover") >= 1) return false;
			}
			return true;
		},
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		preHidden: true,
		content: function () {
			"step 0";
			var cards = player.getCards("h");
			event.bool = cards.length >= player.hp;
			player.discard(cards);
			"step 1";
			if (event.bool) {
				player.recover();
			}
		},
	},
	wuji: {
		skillAnimation: true,
		animationColor: "orange",
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		unique: true,
		juexingji: true,
		filter: function (event, player) {
			return player.getStat("damage") >= 3 && !player.storage.wuji;
		},
		content: function () {
			"step 0";
			player.removeSkills("huxiao");
			player.gainMaxHp();
			"step 1";
			player.recover();
			player.awakenSkill("wuji");
			player.storage.wuji = true;

			var card = get.cardPile("qinglong", "field");
			if (card) {
				player.gain(card, "gain2", "log");
			}
		},
	},
	xueji_old: {
		audio: "xueji",
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return player.hp < player.maxHp && player.countCards("he", { color: "red" }) > 0;
		},
		filterTarget: function (card, player, target) {
			return player != target && get.distance(player, target, "attack") <= 1;
		},
		selectTarget: function () {
			return [1, _status.event.player.maxHp - _status.event.player.hp];
		},
		position: "he",
		filterCard: function (card) {
			return get.color(card) == "red";
		},
		check: function (card) {
			return 8 - get.useful(card);
		},
		content: function () {
			"step 0";
			target.damage();
			"step 1";
			target.draw();
		},
		ai: {
			order: 7,
			result: {
				target: function (player, target) {
					return get.damageEffect(target, player);
				},
			},
			threaten: function (player, target) {
				if (target.hp == 1) return 2;
				if (target.hp == 2) return 1.5;
				return 0.5;
			},
			maixie: true,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage")) {
						if (target.hp == target.maxHp && target.hasFriend()) return [0, 1];
					}
					if (get.tag(card, "recover") && player.hp >= player.maxHp - 1) return [0, 0];
				},
			},
		},
	},
	//FW关银屏
	oldhuxiao: {
		audio: "huxiao",
		trigger: { player: "shaMiss" },
		forced: true,
		content: function () {
			if (player.stat[player.stat.length - 1].card.sha > 0) {
				player.stat[player.stat.length - 1].card.sha--;
			}
		},
	},
	oldwuji: {
		unique: true,
		audio: "wuji",
		trigger: { player: "phaseJieshuBegin" },
		filter: function (event, player) {
			return player.getStat("damage") >= 3 && !player.storage.oldwuji;
		},
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "orange",
		content: function () {
			"step 0";
			player.removeSkills("oldhuxiao");
			player.gainMaxHp();
			"step 1";
			player.recover();
			player.awakenSkill("oldwuji");
		},
	},
	xueji: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return player.countCards("he", { color: "red" }) > 0;
		},
		filterTarget: true,
		selectTarget: function () {
			var player = _status.event.player;
			return [1, Math.max(1, player.getDamagedHp())];
		},
		position: "he",
		filterCard: { color: "red" },
		check: function (card) {
			return 8 - get.value(card);
		},
		multitarget: true,
		multiline: true,
		line: "fire",
		content: function () {
			"step 0";
			event.delay = false;
			for (var i = 0; i < targets.length; i++) {
				if (!targets[i].isLinked()) {
					targets[i].link(true);
					event.delay = true;
				}
			}
			"step 1";
			if (event.delay) {
				game.delay();
			}
			"step 2";
			targets[0].damage("fire", "nocard");
		},
		ai: {
			damage: true,
			fireAttack: true,
			threaten: 1.5,
			order: 7,
			result: {
				target: function (player, target) {
					var eff = get.damageEffect(target, player, target, "fire");
					if (target.isLinked()) {
						return eff / 10;
					} else {
						return eff;
					}
				},
			},
		},
	},
	huxiao: {
		audio: 2,
		trigger: { source: "damageSource" },
		forced: true,
		filter: function (event, player) {
			if (event._notrigger.includes(event.player) || !event.player.isIn()) return false;
			return event.hasNature("fire");
		},
		logTarget: "player",
		content: function () {
			if (!player.storage.huxiao3) {
				player.storage.huxiao3 = [];
			}
			player.storage.huxiao3.add(trigger.player);
			trigger.player.draw();
			player.addTempSkill("huxiao3");
		},
	},
	huxiao3: {
		onremove: true,
		mark: true,
		intro: {
			content: "players",
		},
		mod: {
			cardUsableTarget: function (card, player, target) {
				if (player.storage.huxiao3 && player.storage.huxiao3.includes(target)) return true;
			},
		},
	},
	//诸葛恪
	aocai: {
		audio: 2,
		audioname: ["gz_zhugeke"],
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard(player, name) {
			if (player != _status.currentPhase && get.type(name) == "basic" && lib.inpile.includes(name)) return true;
		},
		filter(event, player) {
			if (event.responded || player == _status.currentPhase || event.aocai) return false;
			return lib.inpile.some(i => get.type(i) == "basic" && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event));
		},
		delay: false,
		async content(event, trigger, player) {
			const evt = event.getParent(2);
			const cards = get.cards(get.mode() != "guozhan" && player.countCards("h") == 0 ? 4 : 2, true);
			const cardsx = cards.slice().map(card => {
				const cardx = ui.create.card();
				cardx.init(get.cardInfo(card));
				cardx._cardid = card.cardid;
				return cardx;
			});
			evt.set("aocai", true);
			player.directgains(cardsx, null, "aocai_hs");
			const result = await player
				.chooseCard(
					"傲才：选择要" + (evt.name == "chooseToUse" ? "使用" : "打出") + "的牌",
					(card, player) => {
						return get.event().cards.includes(card);
					},
					"s"
				)
				.set(
					"cards",
					cardsx.filter(card => {
						if (player.hasSkill("aozhan") && card.name == "tao") {
							return (
								evt.filterCard(
									{
										name: "sha",
										isCard: true,
										cards: [card],
									},
									evt.player,
									evt
								) ||
								evt.filterCard(
									{
										name: "shan",
										isCard: true,
										cards: [card],
									},
									evt.player,
									evt
								)
							);
						}
						return evt.filterCard(card, evt.player, evt);
					})
				)
				.set("ai", card => {
					if (get.type(card) == "equip") return 0;
					const evt = get.event().getParent(3),
						player = get.event().player;
					if (evt.type == "phase" && !player.hasValueTarget(card, null, true)) return 0;
					if (evt && evt.ai) {
						const tmp = _status.event;
						_status.event = evt;
						const result = (evt.ai || event.ai1)(card, player, evt);
						_status.event = tmp;
						return result;
					}
					return 1;
				})
				.forResult();
			let card;
			if (result.bool) {
				card = cards.find(card => card.cardid === result.cards[0]._cardid);
			}
			const cards2 = player.getCards("s", card => card.hasGaintag("aocai_hs"));
			if (player.isOnline2()) {
				player.send(
					(cards, player) => {
						cards.forEach(i => i.delete());
						if (player == game.me) ui.updatehl();
					},
					cards2,
					player
				);
			}
			cards2.forEach(i => i.delete());
			if (player == game.me) ui.updatehl();
			if (card) {
				let name = card.name,
					aozhan = player.hasSkill("aozhan") && name == "tao";
				if (aozhan) {
					name = evt.filterCard(
						{
							name: "sha",
							isCard: true,
							cards: [card],
						},
						evt.player,
						evt
					)
						? "sha"
						: "shan";
				}
				if (evt.name == "chooseToUse") {
					game.broadcastAll(
						(result, name) => {
							lib.skill.aocai_backup.viewAs = { name: name, cards: [result], isCard: true };
						},
						card,
						name
					);
					evt.set("_backupevent", "aocai_backup");
					evt.set("openskilldialog", "请选择" + get.translation(card) + "的目标");
					evt.backup("aocai_backup");
				} else {
					delete evt.result.skill;
					delete evt.result.used;
					evt.result.card = get.autoViewAs(card);
					if (aozhan) evt.result.card.name = name;
					evt.result.cards = [card];
					evt.redo();
					return;
				}
			}
			evt.goto(0);
		},
		ai: {
			effect: {
				target(card, player, target, effect) {
					if (get.tag(card, "respondShan")) return 0.7;
					if (get.tag(card, "respondSha")) return 0.7;
				},
			},
			order: 11,
			respondShan: true,
			respondSha: true,
			result: {
				player(player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
		subSkill: {
			backup: {
				precontent() {
					delete event.result.skill;
					var name = event.result.card.name,
						cards = event.result.card.cards.slice(0);
					event.result.cards = cards;
					var rcard = cards[0],
						card;
					if (rcard.name == name) card = get.autoViewAs(rcard);
					else card = get.autoViewAs({ name, isCard: true });
					event.result.card = card;
				},
				filterCard: () => false,
				selectCard: -1,
			},
		},
	},
	hongyuan: {
		trigger: { player: "phaseDrawBegin2" },
		direct: true,
		audio: 2,
		filter: function (event, player) {
			return !event.numFixed && event.num > 0;
		},
		content: function () {
			"step 0";
			var check;
			if (player.countCards("h") == 0) {
				check = false;
			} else {
				check =
					game.countPlayer(function (current) {
						return player != current && get.attitude(player, current) > 1;
					}) >= 2;
			}
			if (get.is.versus()) {
				event.versus = true;
				player.chooseBool(get.prompt2("hongyuan")).ai = function () {
					return (
						game.countPlayer(function (current) {
							return player.side == current.side;
						}) > 2
					);
				};
			} else {
				player
					.chooseTarget(
						get.prompt2("hongyuan"),
						[1, 2],
						function (card, player, target) {
							return player != target;
						},
						function (target) {
							if (!_status.event.check) return 0;
							return get.attitude(_status.event.player, target);
						}
					)
					.set("check", check);
			}
			"step 1";
			if (result.bool) {
				var targets;
				if (event.versus) {
					targets = game.filterPlayer(function (current) {
						return current != player && current.side == player.side;
					});
				} else {
					targets = result.targets;
				}
				player.logSkill("hongyuan", targets);
				game.asyncDraw(targets);
				trigger.num--;
			}
		},
	},
	huanshi: {
		audio: 2,
		trigger: { global: "judge" },
		filter: function (event, player) {
			return player.countCards("he") > 0;
		},
		logTarget: "player",
		check: function (event, player) {
			if (get.attitude(player, event.player) <= 0) return false;
			var cards = player.getCards("he");
			var judge = event.judge(event.player.judging[0]);
			for (var i = 0; i < cards.length; i++) {
				var judge2 = event.judge(cards[i]);
				if (judge2 > judge) return true;
				if (_status.currentPhase != player && judge2 == judge && get.color(cards[i]) == "red" && get.useful(cards[i]) < 5) return true;
			}
			return false;
		},
		content: function () {
			"step 0";
			var target = trigger.player;
			var judge = trigger.judge(target.judging[0]);
			var attitude = get.attitude(target, player);
			target
				.choosePlayerCard("请选择代替判定的牌", "he", "visible", true, player)
				.set("ai", function (button) {
					var card = button.link;
					var judge = _status.event.judge;
					var attitude = _status.event.attitude;
					var result = trigger.judge(card) - judge;
					var player = _status.event.player;
					if (result > 0) {
						return 20 + result;
					}
					if (result == 0) {
						if (_status.currentPhase == player) return 0;
						if (attitude >= 0) {
							return get.color(card) == "red" ? 7 : 0 - get.value(card);
						} else {
							return get.color(card) == "black" ? 10 : 0 + get.value(card);
						}
					}
					if (attitude >= 0) {
						return get.color(card) == "red" ? 0 : -10 + result;
					} else {
						return get.color(card) == "black" ? 0 : -10 + result;
					}
				})
				.set("filterButton", function (button) {
					var player = _status.event.target;
					var card = button.link;
					var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") return mod2;
					var mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
					if (mod != "unchanged") return mod;
					return true;
				})
				.set("judge", judge)
				.set("attitude", attitude);
			"step 1";
			if (result.bool) {
				event.card = result.links[0];
				player.respond(event.card, "highlight", "noOrdering").nopopup = true;
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				if (trigger.player.judging[0].clone) {
					trigger.player.judging[0].clone.classList.remove("thrownhighlight");
					game.broadcast(function (card) {
						if (card.clone) {
							card.clone.classList.remove("thrownhighlight");
						}
					}, trigger.player.judging[0]);
					game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
				}
				game.cardsDiscard(trigger.player.judging[0]);
				trigger.player.judging[0] = event.card;
				trigger.orderingCards.add(event.card);
				game.log(trigger.player, "的判定牌改为", event.card);
				game.delay(2);
			}
		},
		ai: {
			rejudge: true,
			tag: {
				rejudge: 1,
			},
		},
	},
	mingzhe: {
		audio: 2,
		audioname2: {
			wangyuanji: "qc_mingzhe",
		},
		trigger: {
			player: ["useCard", "respond", "loseAfter"],
			global: "loseAsyncAfter",
		},
		frequent: true,
		filter: function (event, player) {
			if (player == _status.currentPhase) return false;
			if (event.name.indexOf("lose") != 0) return get.color(event.card) == "red";
			if (event.type != "discard") return false;
			var evt = event.getl(player);
			if (evt && evt.cards2) {
				for (var i = 0; i < evt.cards2.length; i++) {
					if (get.color(evt.cards2[i], player) == "red") return true;
				}
			}
			return false;
		},
		content: function () {
			"step 0";
			event.count = 1;
			if (trigger.name.indexOf("lose") == 0) {
				event.count = 0;
				var evt = trigger.getl(player);
				for (var i = 0; i < evt.cards2.length; i++) {
					if (get.color(evt.cards2[i], player) == "red") event.count++;
				}
			}
			"step 1";
			player.draw();
			event.count--;
			"step 2";
			if (event.count && player.hasSkill(event.name) && !get.is.blocked(event.name, player)) {
				player.chooseBool(get.prompt2("mingzhe")).set("frequentSkill", event.name);
			} else event.finish();
			"step 3";
			if (result.bool) {
				player.logSkill("mingzhe");
				event.goto(1);
			}
		},
		ai: {
			threaten: 0.7,
		},
	},

	duwu: {
		audio: 2,
		enable: "phaseUse",
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return current.hp > 0 && current.hp <= player.countCards("he") && player.inRange(current);
			});
		},
		filterCard: function () {
			if (ui.selected.targets.length) return false;
			return true;
		},
		position: "he",
		selectCard: [1, Infinity],
		complexSelect: true,
		complexCard: true,
		filterTarget: function (card, player, target) {
			return target != player && target.hp > 0 && player.inRange(target) && ui.selected.cards.length == target.hp;
		},
		check: function (card) {
			var player = _status.event.player;
			if (
				game.hasPlayer(function (current) {
					return current != player && current.hp > 0 && player.inRange(current) && ui.selected.cards.length == current.hp && get.damageEffect(current, player, player) > 0;
				})
			)
				return 0;
			switch (ui.selected.cards.length) {
				case 0:
					return 8 - get.value(card);
				case 1:
					return 6 - get.value(card);
				case 2:
					return 3 - get.value(card);
				default:
					return 0;
			}
		},
		content: function () {
			player.addTempSkill("duwu2");
			target.damage("nocard");
		},
		ai: {
			damage: true,
			order: 2,
			result: {
				target: function (player, target) {
					return get.damageEffect(target, player);
				},
			},
			threaten: 1.5,
			expose: 0.3,
		},
	},
	duwu2: {
		trigger: { global: "dyingAfter" },
		forced: true,
		popup: false,
		charlotte: true,
		sourceSkill: "duwu",
		filter: function (event, player) {
			if (!event.player.isIn() || !event.reason) return false;
			let evt = event.reason.getParent();
			return evt.name == "duwu" && evt.player == player;
		},
		content: function () {
			player.loseHp();
			player.tempBanSkill("duwu");
		},
	},
	yicong: {
		trigger: {
			player: ["changeHp"],
		},
		audio: 2,
		audioname: ["re_gongsunzan"],
		forced: true,
		filter: function (event, player) {
			return get.sgn(player.hp - 2.5) != get.sgn(player.hp - 2.5 - event.num);
		},
		content: function () {},
		mod: {
			globalFrom: function (from, to, current) {
				if (from.hp > 2) return current - 1;
			},
			globalTo: function (from, to, current) {
				if (to.hp <= 2) return current + 1;
			},
		},
		ai: {
			threaten: 0.8,
		},
	},
	yongsi: {
		audio: 2,
		group: ["yongsi1", "yongsi2"],
		locked: true,
		ai: {
			threaten: 3.2,
		},
	},
	yongsi1: {
		audio: true,
		trigger: { player: "phaseDrawBegin2" },
		forced: true,
		sourceSkill: "yongsi",
		filter: function (event, player) {
			return !event.numFixed;
		},
		content: function () {
			trigger.num += game.countGroup();
		},
	},
	yongsi2: {
		audio: true,
		trigger: { player: "phaseDiscardBegin" },
		forced: true,
		sourceSkill: "yongsi",
		content: function () {
			player.chooseToDiscard(game.countGroup(), "he", true);
		},
	},
	bifa: {
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		audio: 2,
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		content: function () {
			"step 0";
			player.chooseCardTarget({
				filterCard: true,
				filterTarget: function (card, player, target) {
					return player != target && !target.getExpansions("bifa2").length;
				},
				ai1: function (card) {
					return 7 - get.value(card);
				},
				ai2: function (target) {
					var num = target.hasSkillTag("maixie") ? 2 : 0;
					return -get.attitude(_status.event.player, target) - num;
				},
				prompt: get.prompt2("bifa"),
			});
			"step 1";
			if (result.bool) {
				event.forceDie = true;
				var target = result.targets[0];
				event.target = target;
				player.logSkill("bifa", result.targets[0]);
				event.card = result.cards[0];
				target.storage.bifa2 = [result.cards[0], player];
				if (!_status.connectMode && player.isUnderControl(true)) player.$giveAuto(result.cards[0], target, false);
				else player.$give(1, target, false);
				target.addToExpansion(result.cards[0]).gaintag.add("bifa2");
			} else event.finish();
			"step 2";
			if (target.getExpansions("bifa2").includes(card)) {
				target.addSkill("bifa2");
			} else delete target.storage.bifa2;
		},
		ai: {
			threaten: 1.7,
			expose: 0.3,
		},
	},
	bifa2: {
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		charlotte: true,
		audio: false,
		sourceSkill: "bifa",
		filter: function (event, player) {
			return player.storage.bifa2 && player.getExpansions("bifa2").includes(player.storage.bifa2[0]);
		},
		content: function () {
			"step 0";
			if (player.storage.bifa2[1].isIn() && player.countCards("h")) {
				player
					.chooseCard(get.translation(player.storage.bifa2[1]) + "的笔伐牌为：", function (card) {
						return get.type(card, "trick") == _status.event.type;
					})
					.set("ai", function (card) {
						return 8 - get.value(card);
					})
					.set("type", get.type(player.storage.bifa2[0], "trick"))
					.set("promptx", [[player.storage.bifa2[0]], "请交给其一张与此牌类别相同的手牌，否则失去1点体力"]);
			} else {
				event.directfalse = true;
			}
			"step 1";
			if (result.bool && !event.directfalse) {
				player.give(result.cards, player.storage.bifa2[1]);
				player.gain(player.storage.bifa2[0], "draw");
			} else {
				player.loseHp();
			}
			"step 2";
			player.removeSkill("bifa2");
		},
		marktext: "檄",
		intro: {
			markcount: () => 1,
			name: "笔伐",
			content: "已成为〖笔伐〗的目标",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
			delete player.storage[skill];
		},
	},
	songci: {
		audio: 2,
		enable: "phaseUse",
		filter: function (event, player) {
			if (!player.storage.songci) return true;
			return game.hasPlayer(function (current) {
				return !player.getStorage("songci").includes(current);
			});
		},
		filterTarget: function (card, player, target) {
			return !player.getStorage("songci").includes(target);
		},
		logAudio(event, player) {
			const target = event.targets[0],
				goon = target.countCards("h") > target.hp;
			return goon ? "songci2.mp3" : "songci1.mp3";
		},
		async content(event, trigger, player) {
			const target = event.target,
				goon = target.countCards("h") > target.hp;
			player.markAuto("songci", [target]);
			if (goon) {
				await target.chooseToDiscard(2, "he", true);
			} else {
				await target.draw(2);
			}
		},
		intro: {
			content: "已对$发动过〖颂词〗",
		},
		ai: {
			order: 7,
			threaten: 1.6,
			expose: 0.2,
			result: {
				target: function (player, target) {
					if (target.countCards("h") <= target.hp) {
						return 1;
					} else if (target.countCards("h") > target.hp) {
						return -1;
					}
				},
			},
		},
		group: "songci_draw",
	},
	songci_draw: {
		audio: "songci",
		trigger: { player: "phaseDiscardEnd" },
		forced: true,
		sourceSkill: "songci",
		filter: function (event, player) {
			if (!player.storage.songci) return false;
			return !game.hasPlayer(function (current) {
				return !player.storage.songci.includes(current);
			});
		},
		content: function () {
			player.draw();
		},
	},
	baobian: {
		audio: 2,
		trigger: { player: ["phaseBefore", "changeHp"] },
		forced: true,
		popup: false,
		init: function (player) {
			if (game.online) return;
			player.removeAdditionalSkill("baobian");
			var list = [];
			if (player.hp <= 3) {
				//if(trigger.num!=undefined&&trigger.num<0&&player.hp-trigger.num>1) player.logSkill('baobian');
				list.push("oltiaoxin");
			}
			if (player.hp <= 2) {
				list.push("olpaoxiao");
			}
			if (player.hp <= 1) {
				list.push("xinshensu");
			}
			if (list.length) {
				player.addAdditionalSkill("baobian", list);
			}
		},
		derivation: ["oltiaoxin", "olpaoxiao", "xinshensu"],
		content: function () {
			player.removeAdditionalSkill("baobian");
			var list = [];
			if (player.hp <= 3) {
				if (trigger.num != undefined && trigger.num < 0 && player.hp - trigger.num > 1) player.logSkill("baobian");
				list.push("oltiaoxin");
			}
			if (player.hp <= 2) {
				list.push("olpaoxiao");
			}
			if (player.hp <= 1) {
				list.push("xinshensu");
			}
			if (list.length) {
				player.addAdditionalSkill("baobian", list);
			}
		},
		ai: {
			maixie: true,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage")) {
						if (!target.hasFriend()) return;
						if (target.hp >= 4) return [0, 1];
					}
					if (get.tag(card, "recover") && player.hp >= player.maxHp - 1) return [0, 0];
				},
			},
		},
	},
	chongzhen: {
		audio: 2,
		audioname: ["huan_zhaoyun"],
		trigger: { player: ["useCard", "respond"] },
		filter: function (event, player) {
			if (event.card.name != "sha" && event.card.name != "shan") return false;
			if (!event.skill || event.skill.indexOf("fanghun") + event.skill.indexOf("longdan") == -2) return false;
			var target = lib.skill.chongzhen.logTarget(event, player);
			return target && target.countGainableCards(player, "h") > 0;
		},
		logTarget: function (event, player) {
			if (event.name == "respond") return event.source;
			if (event.card.name == "sha") return event.targets[0];
			return event.respondTo[0];
		},
		prompt2: function (event, player) {
			var target = lib.skill.chongzhen.logTarget(event, player);
			return "获得" + get.translation(target) + "的一张手牌";
		},
		content: function () {
			var target = lib.skill.chongzhen.logTarget(trigger, player);
			player.gainPlayerCard(target, "h", true);
		},
		ai: {
			combo: "ollongdan",
			mingzhi: false,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "respondShan") || get.tag(card, "respondSha")) {
						if (get.attitude(target, player) <= 0) {
							if (current > 0) return;
							if (target.countCards("h") == 0) return 1.6;
							if (target.countCards("h") == 1) return 1.2;
							if (target.countCards("h") == 2) return [0.8, 0.2, 0, -0.2];
							return [0.4, 0.7, 0, -0.7];
						}
					}
				},
			},
		},
	},
	lihun: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return player != target && target.hasSex("male");
		},
		filterCard: true,
		position: "he",
		logAudio: () => 1,
		content: function () {
			player.gainPlayerCard(target, true, "h", target.countCards("h"));
			player.turnOver();
			player.addSkill("lihun2");
			player.storage.lihun = target;
		},
		check: function (card) {
			return 8 - get.value(card);
		},
		ai: {
			order: 10,
			result: {
				player: function (player) {
					if (player.classList.contains("turnedover")) return 10;
					return 0;
				},
				target: function (player, target) {
					if (target.countCards("h") > target.hp) return target.hp - target.countCards("h");
					return 0;
				},
			},
			threaten: 1.5,
		},
	},
	lihun2: {
		trigger: { player: "phaseUseEnd" },
		forced: true,
		audio: "lihun2.mp3",
		sourceSkill: "lihun",
		content: function () {
			"step 0";
			var cards = player.getCards("he");
			player.removeSkill("lihun2");
			if (player.storage.lihun.classList.contains("dead") || player.storage.lihun.hp <= 0 || cards.length == 0) {
				event.finish();
			} else {
				if (cards.length < player.storage.lihun.hp) event._result = { bool: true, cards: cards };
				else player.chooseCard("he", true, player.storage.lihun.hp, "离魂：选择要交给" + get.translation(player.storage.lihun) + "的牌");
			}
			"step 1";
			player.give(result.cards, player.storage.lihun);
		},
	},
	yuanhu: {
		audio: 3,
		trigger: { player: "phaseJieshuBegin" },
		filter: function (event, player) {
			return player.countCards("he", { type: "equip" }) > 0;
		},
		logAudio(_1, _2, _3, _4, result) {
			return "yuanhu" + Math.min(get.equipNum(result.cards[0]), 3) + ".mp3";
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCardTarget({
					filterCard: function (card) {
						return get.type(card) == "equip";
					},
					position: "he",
					filterTarget: function (card, player, target) {
						return target.canEquip(card);
					},
					ai1: function (card) {
						return 6 - get.value(card);
					},
					ai2: function (target) {
						return get.attitude(_status.event.player, target) - 3;
					},
					prompt: get.prompt2("yuanhu"),
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			const card = event.cards[0];
			await target.equip(card);
			if (target != player) {
				player.$give(card, target, false);
			}
			switch (get.subtype(card)) {
				case "equip1": {
					if (
						!game.hasPlayer(function (current) {
							return get.distance(target, current) <= 1;
						})
					)
						return;
					await game.delay();
					const { targets } = await player
						.chooseTarget(
							true,
							function (card, player, target) {
								return get.distance(_status.event.thisTarget, target) <= 1 && target.countCards("hej");
							},
							"选择一名与" + get.translation(target) + "距离1以内的角色，弃置其一张牌"
						)
						.set("ai", function (target) {
							var attitude = get.attitude(_status.event.player, target);
							if (attitude > 0 && target.countCards("j")) {
								return attitude * 1.5;
							}
							return -attitude;
						})
						.set("thisTarget", target)
						.forResult();
					if (targets.length) await player.discardPlayerCard(true, targets[0], "hej");
					return;
				}
				case "equip2":
					await target.draw();
					return;
				case "equip5":
					return;
				default:
					await target.recover();
					return;
			}
		},
	},
	tianming: {
		audio: 2,
		audioname2: { caoteng: "tianming_caoteng" },
		trigger: { target: "useCardToTargeted" },
		check: function (event, player) {
			var cards = player.getCards("h");
			if (cards.length <= 2) {
				for (var i = 0; i < cards.length; i++) {
					if (cards[i].name == "shan" || cards[i].name == "tao") return false;
				}
			}
			return true;
		},
		filter: function (event, player) {
			return event.card.name == "sha";
		},
		content: function () {
			"step 0";
			player.chooseToDiscard(2, true, "he");
			player.draw(2);
			var players = game.filterPlayer();
			players.sort(function (a, b) {
				return b.hp - a.hp;
			});
			if (players[0].hp > players[1].hp && players[0] != player) {
				players[0].chooseBool(get.prompt2("tianming"));
				event.player = players[0];
			} else {
				event.finish();
			}
			"step 1";
			if (result.bool) {
				player.chooseToDiscard(2, true, "he");
				player.draw(2);
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (card.name == "sha") return [1, 0.5];
				},
			},
		},
	},
	mizhao: {
		enable: "phaseUse",
		usable: 1,
		audio: 2,
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		filterCard: true,
		selectCard: -1,
		filterTarget: function (card, player, target) {
			return player != target;
		},
		discard: false,
		lose: false,
		delay: false,
		ai: {
			order: 1,
			result: {
				player: 0,
				target: function (player, target) {
					if (target.hasSkillTag("nogain")) return 0;
					if (player.countCards("h") > 1) {
						return 1;
					}
					var players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						if (players[i].countCards("h") && players[i] != target && players[i] != player && get.attitude(player, players[i]) < 0) {
							break;
						}
					}
					if (i == players.length) {
						return 1;
					}
					return -2 / (target.countCards("h") + 1);
				},
			},
		},
		content: function () {
			"step 0";
			event.target1 = targets[0];
			player.give(cards, targets[0], "giveAuto");
			"step 1";
			if (!targets[0].countCards("h")) {
				event.finish();
				return;
			}
			var players = game.filterPlayer();
			for (var i = 0; i < players.length; i++) {
				if (players[i] != event.target1 && players[i] != player && event.target1.canCompare(players[i])) {
					break;
				}
			}
			if (i == players.length) {
				event.finish();
			}
			"step 2";
			player
				.chooseTarget(true, "选择拼点目标", function (card, player, target) {
					return _status.event.target1.canCompare(target) && target != player;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var eff = get.effect(target, { name: "sha" }, _status.event.target1, player);
					var att = get.attitude(player, target);
					if (att > 0) {
						return eff - 10;
					}
					return eff;
				})
				.set("target1", event.target1)
				.set("forceDie", true);
			"step 3";
			if (result.targets.length) {
				event.target2 = result.targets[0];
				event.target1.line(event.target2);
				event.target1.chooseToCompare(event.target2);
			} else {
				event.finish();
			}
			"step 4";
			if (!result.tie) {
				if (result.bool) {
					if (event.target1.canUse({ name: "sha", isCard: true }, event.target2, false)) event.target1.useCard({ name: "sha", isCard: true }, event.target2);
				} else if (event.target2.canUse({ name: "sha", isCard: true }, event.target1, false)) {
					event.target2.useCard({ name: "sha", isCard: true }, event.target1);
				}
			}
		},
	},
	gongao: {
		audio: 2,
		trigger: { global: "dieAfter" },
		forced: true,
		content: function () {
			player.gainMaxHp();
			player.recover();
		},
		ai: {
			threaten: 1.5,
		},
	},
	juyi: {
		skillAnimation: true,
		animationColor: "thunder",
		audio: 2,
		derivation: ["benghuai", "weizhong"],
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return player.maxHp > game.countPlayer() && !player.storage.juyi;
		},
		forced: true,
		unique: true,
		juexingji: true,
		content: function () {
			player.awakenSkill("juyi");
			player.draw(player.maxHp);
			player.addSkills(["benghuai", "weizhong"]);
		},
	},
	benghuai_zhugedan: { audio: 1 },
	weizhong: {
		audio: 1,
		trigger: { player: ["gainMaxHpEnd", "loseMaxHpEnd"] },
		forced: true,
		content: function () {
			player.draw(player.isMinHandcard() ? 2 : 1);
		},
	},
	kuangfu: {
		trigger: { source: "damageSource" },
		audio: 2,
		filter: function (event) {
			if (event._notrigger.includes(event.player)) return false;
			return event.card && event.card.name == "sha" && event.player.countCards("e");
		},
		logTarget: "player",
		preHidden: true,
		check: function (event, player) {
			return get.attitude(player, event.player) <= 0;
		},
		content: function () {
			"step 0";
			var neg = get.attitude(player, trigger.player) <= 0;
			player
				.choosePlayerCard("e", trigger.player)
				.set("ai", function (button) {
					if (_status.event.neg) {
						return get.buttonValue(button);
					}
					return 0;
				})
				.set("neg", neg);
			"step 1";
			if (result.bool) {
				event.card = result.links[0];
				if (player.canEquip(event.card)) {
					player.chooseBool("是否将" + get.translation(event.card) + "置入自己的装备区？").ai = function () {
						return true;
					};
				} else event._result = { bool: false };
			} else event.finish();
			"step 2";
			if (result.bool) {
				trigger.player.$give(event.card, player, false);
				player.equip(event.card);
			} else trigger.player.discard(event.card);
		},
	},
	xinfu_lingren: {
		audio: 2,
		trigger: {
			player: "useCardToPlayered",
		},
		filter: function (event, player) {
			if (event.getParent().triggeredTargets3.length > 1) return false;
			if (!["basic", "trick"].includes(get.type(event.card))) return false;
			if (get.tag(event.card, "damage")) return true;
			return false;
		},
		usable: 1,
		direct: true,
		derivation: ["lingren_jianxiong", "lingren_xingshang"],
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("xinfu_lingren"), "选择一名目标角色并猜测其手牌构成", function (card, player, target) {
					return _status.event.targets.includes(target);
				})
				.set("ai", function (target) {
					return 2 - get.attitude(_status.event.player, target);
				})
				.set("targets", trigger.targets);
			"step 1";
			if (result.bool) {
				player.logSkill("xinfu_lingren", result.targets);
				var target = result.targets[0];
				event.target = target;
				event.choice = {
					basic: false,
					trick: false,
					equip: false,
				};
				player.chooseButton(["凌人：猜测其有哪些类别的手牌", [["basic", "trick", "equip"], "vcard"]], [0, 3], true).set("ai", function (button) {
					switch (button.link[2]) {
						case "basic":
							var rand = 0.95;
							if (!target.countCards("h", { type: ["basic"] })) rand = 0.05;
							if (!target.countCards("h")) rand = 0;
							return Math.random() < rand ? true : false;
						case "trick":
							var rand = 0.9;
							if (!target.countCards("h", { type: ["trick", "delay"] })) rand = 0.1;
							if (!target.countCards("h")) rand = 0;
							return Math.random() < rand ? true : false;
						case "equip":
							var rand = 0.75;
							if (!target.countCards("h", { type: ["equip"] })) rand = 0.25;
							if (!target.countCards("h")) rand = 0;
							return Math.random() < rand ? true : false;
					}
				});
			} else {
				player.storage.counttrigger.xinfu_lingren--;
				event.finish();
			}
			"step 2";
			if (result.bool) {
				var choices = result.links.map(i => i[2]);
				if (!event.isMine() && !event.isOnline()) game.delayx();
				var list = [];
				event.num = 0;
				["basic", "trick", "equip"].forEach(type => {
					if (choices.includes(type) == target.hasCard(card => get.type2(card, target) === type, "h")) event.num++;
				});
			}
			"step 3";
			player.popup("猜对" + get.cnNumber(event.num) + "项");
			game.log(player, "猜对了" + get.cnNumber(event.num) + "项");
			if (event.num > 0) {
				target.addTempSkill("lingren_adddamage");
				target.storage.lingren = {
					card: trigger.card,
					//player:event.targett,
				};
			}
			if (event.num > 1) player.draw(2);
			if (event.num > 2) {
				player.addTempSkills(["lingren_jianxiong", "lingren_xingshang"], {
					player: "phaseBegin",
				});
			}
		},
		ai: {
			threaten: 2.4,
		},
	},
	lingren_adddamage: {
		onremove: function (player) {
			delete player.storage.lingren;
		},
		trigger: {
			player: "damageBegin3",
		},
		filter: function (event, player) {
			var info = player.storage.lingren;
			return event.card && event.card == info.card;
		},
		silent: true,
		popup: false,
		forced: true,
		charlotte: true,
		sourceSkill: "xinfu_lingren",
		content: function () {
			trigger.num++;
		},
	},
	lingren_jianxiong: {
		audio: 1,
		trigger: {
			player: "damageEnd",
		},
		content: function () {
			"step 0";
			if (get.itemtype(trigger.cards) == "cards" && get.position(trigger.cards[0], true) == "o") {
				player.gain(trigger.cards, "gain2");
			}
			player.draw("nodelay");
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target: function (card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) return [1, -1];
					if (get.tag(card, "damage") && player != target) return [1, 0.6];
				},
			},
		},
	},
	lingren_xingshang: {
		audio: 1,
		inherit: "rexingshang",
	},
	xinfu_fujian: {
		audio: 2,
		trigger: {
			player: "phaseJieshuBegin",
		},
		filter: function (event, player) {
			return !game.hasPlayer(function (current) {
				return current.countCards("h") == 0;
			});
		},
		forced: true,
		content: function () {
			event.num = 0;
			var list = game.filterPlayer(function (target) {
				if (target.isMinHandcard()) event.num = target.countCards("h");
				return player != target;
			});
			if (event.num < 1) {
				event.finish();
			} else {
				var target = list.randomGet();
				var cards = target.getCards("h").randomGets(event.num);
				player.line(target);
				var content = [get.translation(target) + "的部分手牌", cards];
				game.log(player, "观看了", target, "的部分手牌");
				player.chooseControl("ok").set("dialog", content);
			}
		},
	},
	fujian: {
		audio: "xinfu_fujian",
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		filter(event, player) {
			return game.hasPlayer(target => target != player && target.countCards("h") && !target.isMaxHandcard());
		},
		forced: true,
		async content(event, trigger, player) {
			const target = game
				.filterPlayer(target => {
					return target != player && target.countCards("h") && !target.isMaxHandcard();
				})
				.randomGet();
			player.line(target);
			game.log(player, "观看了", target, "的手牌");
			player.viewHandcards(target);
		},
	},
	xinfu_xionghuo: {
		audio: 2,
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countMark("xinfu_xionghuo") > 0;
		},
		filterTarget: function (card, player, target) {
			return player != target && !target.hasMark("xinfu_xionghuo");
		},
		content: function () {
			player.removeMark("xinfu_xionghuo", 1);
			target.addMark("xinfu_xionghuo", 1);
		},
		ai: {
			order: 11,
			result: {
				target: function (player, target) {
					if (
						(player.countMark("xinfu_xionghuo") >= 2 ||
							!game.hasPlayer(function (current) {
								return current != player && get.attitude(player, current) < 0 && current.hasMark("xinfu_xionghuo");
							})) &&
						player.countCards("h", function (card) {
							return (
								get.tag(card, "damage") &&
								player.canUse(card, target, null, true) &&
								player.getUseValue(card) > 0 &&
								get.effect_use(target, card, player) > 0 &&
								target.hasSkillTag("filterDamage", null, {
									player: player,
									card: card,
								})
							);
						})
					)
						return 3 / Math.max(1, target.hp);
					if (
						(!player.hasUnknown() &&
							game.countPlayer(function (current) {
								return get.attitude(player, current) < 0;
							}) <= 1) ||
						player.countMark("xinfu_xionghuo") >= 2
					) {
						return -1;
					}
					return 0;
				},
			},
			effect: {
				player: function (card, player, target) {
					if (
						player != target &&
						get.tag(card, "damage") &&
						target &&
						target.hasMark("xinfu_xionghuo") &&
						!target.hasSkillTag("filterDamage", null, {
							player: player,
							card: card,
						})
					)
						return [1, 0, 1, -2];
				},
			},
			threaten: 1.6,
		},
		marktext: "戾",
		intro: {
			name: "暴戾",
			content: "mark",
		},
		group: ["xinfu_xionghuo_init", "xinfu_xionghuo_damage", "xinfu_xionghuo_effect"],
		subSkill: {
			init: {
				audio: "xinfu_xionghuo",
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter: function (event, player) {
					if (player.countMark("xinfu_xionghuo") >= 3) return false;
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				content: function () {
					player.addMark("xinfu_xionghuo", 3 - player.countMark("xinfu_xionghuo"));
				},
			},
			damage: {
				audio: "xinfu_xionghuo",
				trigger: { source: "damageBegin1" },
				filter: function (event, player) {
					return event.player.countMark("xinfu_xionghuo") > 0 && event.player != player;
				},
				forced: true,
				locked: false,
				logTarget: "player",
				content: function () {
					trigger.num++;
				},
			},
			effect: {
				audio: "xinfu_xionghuo",
				trigger: { global: "phaseUseBegin" },
				filter: function (event, player) {
					return event.player.countMark("xinfu_xionghuo") > 0 && event.player != player;
				},
				line: false,
				forced: true,
				locked: false,
				logTarget: "player",
				content: function () {
					"step 0";
					trigger.player.removeMark("xinfu_xionghuo", trigger.player.countMark("xinfu_xionghuo"));
					"step 1";
					var num = get.rand(0, 2);
					switch (num) {
						case 0: {
							player.line(trigger.player, "fire");
							trigger.player.damage("fire");
							trigger.player.addTempSkill("xinfu_xionghuo_disable");
							trigger.player.markAuto("xinfu_xionghuo_disable", [player]);
							break;
						}
						case 1: {
							player.line(trigger.player, "water");
							trigger.player.loseHp();
							trigger.player.addMark("xinfu_xionghuo_low", 1, false);
							trigger.player.addTempSkill("xinfu_xionghuo_low");
							break;
						}
						case 2: {
							player.line(trigger.player, "green");
							/*
							var card1=trigger.player.getCards('h').randomGet();
							var card2=trigger.player.getCards('e').randomGet();
							var list=[];
							if(card1) list.push(card1);
							if(card2) list.push(card2);
							if(list.length) player.gain(list,trigger.player,'giveAuto','bySelf');
							*/
							const cards = trigger.player.getGainableCards(player, "he");
							if (cards.length) player.gain(cards.randomGets(2), trigger.player, "giveAuto", "bySelf");
							break;
						}
					}
					"step 2";
					game.delay();
				},
			},
			disable: {
				mod: {
					playerEnabled: function (card, player, target) {
						if (card.name == "sha" && player.getStorage("xinfu_xionghuo_disable").includes(target)) return false;
					},
				},
				charlotte: true,
				onremove: true,
				mark: true,
				marktext: "禁",
				intro: { content: "不能对$使用【杀】" },
			},
			low: {
				mod: {
					maxHandcard: function (player, num) {
						return num - player.countMark("xinfu_xionghuo_low");
					},
				},
				charlotte: true,
				onremove: true,
				mark: true,
				marktext: "减",
				intro: { content: "手牌上限-#" },
			},
		},
	},
	xinfu_shajue: {
		audio: 2,
		trigger: { global: "dying" },
		filter: function (event, player) {
			if (event.player == player) return false;
			const bool1 = !player.hasSkill("xinfu_xionghuo") || player.countMark("xinfu_xionghuo") < 3;
			const bool2 = event.player.hp < 0 && get.itemtype(event.parent.cards) == "cards" && event.parent.cards.some(card => get.position(card, true) == "o");
			return bool1 || bool2;
		},
		forced: true,
		content: function () {
			if (!player.hasSkill("xinfu_xionghuo") || player.countMark("xinfu_xionghuo") < 3) player.addMark("xinfu_xionghuo", 1);
			if (trigger.player.hp < 0 && get.itemtype(trigger.parent.cards) == "cards" && trigger.parent.cards.some(card => get.position(card, true) == "o")) {
				player.gain(
					trigger.parent.cards.filter(card => get.position(card, true) == "o"),
					"gain2"
				);
			}
		},
		ai: {
			combo: "xinfu_xionghuo",
		},
	},
	xinfu_jianjie: { audio: 3 },
	jianjie: {
		group: ["jianjie_use", "jianjie_die"],
		derivation: ["jianjie_huoji", "jianjie_lianhuan", "jianjie_yeyan"],
		audio: "xinfu_jianjie",
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		forced: true,
		locked: false,
		filter: function (event, player) {
			return player.phaseNumber <= 1 && game.hasPlayer(current => current != player);
		},
		logAudio: () => ["xinfu_jianjie1.mp3", "xinfu_jianjie2.mp3"],
		content: function () {
			"step 0";
			player.chooseTarget("荐杰：选择一名其他角色获得“龙印”", lib.filter.notMe, true).set("ai", target => {
				return get.attitude(get.player(), target);
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "fire");
				lib.skill.jianjie.addMark("huoji", player, target);
				event.target = target;
				game.delayx();
			} else event.finish();
			"step 2";
			if (
				game.hasPlayer(current => {
					return current != player && current != target;
				})
			) {
				player
					.chooseTarget(
						"荐杰：选择一名其他角色获得“凤印”",
						function (card, player, target) {
							return target != player && target != _status.event.getParent().target;
						},
						true
					)
					.set("ai", target => {
						return get.attitude(get.player(), target);
					});
			} else event.finish();
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "thunder");
				lib.skill.jianjie.addMark("lianhuan", player, target);
				game.delayx();
			}
		},
		ai: {
			threaten: 3,
		},
		hasMark: (mark, player, target) => {
			if (!target) return player.getStorage("jianjie_" + mark).length > 0;
			return target.getStorage("jianjie_" + mark).includes(player);
		},
		addMark: (mark, player, target) => {
			mark = "jianjie_" + mark;
			target.addAdditionalSkill(`${mark}_${player.playerid}`, mark);
			target.markAuto(mark, [player]);
			game.log(player, "令", target, "获得了", `#g“${mark == "jianjie_huoji" ? "龙印" : "凤印"}”`);
		},
		removeMark: (mark, player, target, log) => {
			if (lib.skill.jianjie.hasMark(mark, player, target, log)) {
				mark = "jianjie_" + mark;
				target.removeAdditionalSkill(`${mark}_${player.playerid}`);
				target.unmarkAuto(mark, [player]);
				if (log) game.log(target, "移去了", player, "给予的", `#g“${mark == "jianjie_huoji" ? "龙印" : "凤印"}”`);
				else game.log(player, "移去了", target, "的", `#g“${mark == "jianjie_huoji" ? "龙印" : "凤印"}”`);
			}
		},
		subSkill: {
			use: {
				audio: "xinfu_jianjie",
				enable: "phaseUse",
				usable: 1,
				filter: function (event, player) {
					if (player.phaseNumber <= 1) return false;
					const skill = lib.skill.jianjie;
					return game.hasPlayer(function (current) {
						return skill.hasMark("huoji", player, current) || skill.hasMark("lianhuan", player, current);
					});
				},
				filterTarget: function (card, player, target) {
					if (ui.selected.targets.length == 0) {
						const skill = lib.skill.jianjie;
						return skill.hasMark("huoji", player, target) || skill.hasMark("lianhuan", player, target);
					}
					return true;
				},
				logAudio: () => ["xinfu_jianjie1.mp3", "xinfu_jianjie2.mp3"],
				selectTarget: 2,
				complexSelect: true,
				complexTarget: true,
				multitarget: true,
				prompt: "移动场上的“龙印”或“凤印”",
				targetprompt: ["失去印", "获得印"],
				content: function () {
					"step 0";
					var skill = lib.skill.jianjie;
					var bool1 = skill.hasMark("huoji", player, targets[0]),
						bool2 = skill.hasMark("lianhuan", player, targets[0]);
					if (bool1 && bool2) {
						player.chooseControl("龙印", "凤印").set("prompt", "选择要移动的“印”");
					} else {
						event._result = { control: bool1 ? "龙印" : "凤印" };
					}
					"step 1";
					var skill = lib.skill.jianjie,
						mark = result.control == "龙印" ? "huoji" : "lianhuan";
					skill.removeMark(mark, player, targets[0]);
					skill.addMark(mark, player, targets[1]);
					if (skill.hasMark("huoji", player, targets[1]) && skill.hasMark("lianhuan", player, targets[1])) {
						game.broadcastAll(function () {
							if (lib.config.background_speak) game.playAudio("skill", "xinfu_jianjie3");
						});
					}
					game.delayx();
				},
				ai: {
					order: 8,
					result: {
						target: function (player, target) {
							if (ui.selected.targets.length == 0) {
								return get.attitude(player, target) < 0 ? -999 : -3;
							} else {
								return target.countCards("h") + 1;
							}
						},
					},
					expose: 0.4,
				},
			},
			die: {
				audio: "xinfu_jianjie",
				trigger: { global: "die" },
				filter: function (event, player) {
					const skill = lib.skill.jianjie;
					return skill.hasMark("huoji", player, event.player) || skill.hasMark("lianhuan", player, event.player);
				},
				forced: true,
				logTarget: "player",
				logAudio: () => ["xinfu_jianjie1.mp3", "xinfu_jianjie2.mp3"],
				content: function () {
					"step 0";
					if (lib.skill.jianjie.hasMark("huoji", player, trigger.player)) {
						player.chooseTarget("荐杰：选择一名角色获得“龙印”", true).set("ai", target => {
							return get.attitude(get.player(), target);
						});
					} else event.goto(2);
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, "fire");
						lib.skill.jianjie.addMark("huoji", player, target);
						if (lib.skill.jianjie.hasMark("huoji", player, target) && lib.skill.jianjie.hasMark("lianhuan", player, target)) {
							game.broadcastAll(function () {
								if (lib.config.background_speak) game.playAudio("skill", "xinfu_jianjie3");
							});
						}
						game.delayx();
					} else event.finish();
					"step 2";
					if (lib.skill.jianjie.hasMark("lianhuan", player, trigger.player)) {
						player.chooseTarget("荐杰：选择一名角色获得“凤印”", true).set("ai", target => {
							return get.attitude(get.player(), target);
						});
					} else event.finish();
					"step 3";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, "thunder");
						lib.skill.jianjie.addMark("lianhuan", player, target);
						if (lib.skill.jianjie.hasMark("huoji", player, target) && lib.skill.jianjie.hasMark("lianhuan", player, target)) {
							game.broadcastAll(function () {
								if (lib.config.background_speak) game.playAudio("skill", "xinfu_jianjie3");
							});
						}
						game.delayx();
					}
				},
			},
			huoji: {
				audio: "huoji",
				marktext: "龙",
				intro: {
					name: "龙印",
					content: "<li>出牌阶段限三次。你可以将一张红色牌当作【火攻】使用，且你以此法使用【火攻】的作用效果改为“目标角色随机展示一张手牌A，然后你可以弃置一张与A颜色相同的牌，对目标造成1点火属性伤害”。<br><li>若你同时拥有“凤印”，则你视为拥有技能〖业炎〗。（发动〖业炎〗时，弃置所有“龙印”和“凤印”）",
				},
				inherit: "rehuoji",
				usable: 3,
				charlotte: true,
				viewAsFilter: function (player) {
					const storage = player.getStorage("jianjie_huoji");
					if (
						!storage.some(source => {
							return source.isIn() && source.hasSkill("jianjie");
						})
					)
						return false;
					return player.hasCard(card => get.color(card) == "red", "she");
				},
				group: ["jianjie_yeyan", "jianjie_huoji_effect"],
			},
			huoji_effect: {
				trigger: { player: "huogongBegin" },
				forced: true,
				popup: false,
				charlotte: true,
				filter: function (event, player) {
					return event.skill == "jianjie_huoji";
				},
				content: function () {
					trigger.setContent(lib.skill.olhuoji.huogongContent);
				},
			},
			lianhuan: {
				audio: "lianhuan",
				marktext: "凤",
				intro: {
					name: "凤印",
					content: "<li>出牌阶段限三次。你可以将一张♣牌当作【铁索连环】使用或重铸，且你以此法使用【铁索连环】的目标数上限+1。<br><li>若你同时拥有“龙印”，则你视为拥有技能〖业炎〗。（发动〖业炎〗时，弃置所有“龙印”和“凤印”）",
				},
				charlotte: true,
				usable: 3,
				filter: function (event, player) {
					const storage = player.getStorage("jianjie_lianhuan");
					if (
						!storage.some(source => {
							return source.isIn() && source.hasSkill("jianjie");
						})
					)
						return false;
					if (!player.hasCard(card => get.suit(card) == "club", "she")) return false;
					return event.type == "phase" || event.filterCard({ name: "tiesuo" }, player, event);
				},
				inherit: "ollianhuan",
				group: ["jianjie_yeyan", "jianjie_lianhuan_effect"],
			},
			lianhuan_effect: {
				trigger: { player: "useCard2" },
				filter: function (event, player) {
					if (event.skill != "jianjie_lianhuan") return false;
					var info = get.info(event.card);
					if (info.allowMultiple == false) return false;
					if (event.targets && !info.multitarget) {
						if (
							game.hasPlayer(current => {
								return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, player, current);
							})
						)
							return true;
					}
					return false;
				},
				charlotte: true,
				forced: true,
				popup: false,
				content: function () {
					"step 0";
					player
						.chooseTarget("是否为" + get.translation(trigger.card) + "额外指定一个目标？", (card, player, target) => {
							return !_status.event.sourcex.includes(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
						})
						.set("sourcex", trigger.targets)
						.set("ai", function (target) {
							var player = _status.event.player;
							return get.effect(target, _status.event.card, player, player);
						})
						.set("card", trigger.card);
					"step 1";
					if (result.bool) {
						if (!event.isMine() && !event.isOnline()) game.delayex();
					} else event.finish();
					"step 2";
					if (result.bool) {
						var targets = result.targets;
						player.line(targets, "thunder");
						trigger.targets.addArray(targets);
						game.log(targets, "也成为了", trigger.card, "的目标");
					}
				},
			},
			yeyan: {
				audio: "yeyan",
				inherit: "yeyan",
				filter: function (event, player) {
					const huoji = player.getStorage("jianjie_huoji"),
						lianhuan = player.getStorage("jianjie_lianhuan");
					return (
						huoji.length > 0 &&
						lianhuan.some(source => {
							return huoji.includes(source) && source.isIn() && source.hasSkill("jianjie");
						})
					);
				},
				contentBefore: function () {
					player.awakenSkill("jianjie_yeyan");
					var skill = lib.skill.jianjie;
					var huoji = player.getStorage("jianjie_huoji").slice(0),
						lianhuan = player.getStorage("jianjie_lianhuan").slice(0);
					huoji.forEach(source => {
						skill.removeMark("huoji", source, player, true);
					});
					lianhuan.forEach(source => {
						skill.removeMark("lianhuan", source, player, true);
					});
				},
			},
		},
	},
	xinfu_yinshi: {
		audio: 2,
		trigger: { player: "damageBegin4" },
		forced: true,
		filter: function (event, player) {
			const skill = lib.skill.jianjie;
			if (skill.hasMark("huoji", player) || skill.hasMark("lianhuan", player)) return false;
			if (!player.hasEmptySlot(2)) return false;
			if (event.hasNature()) return true;
			return get.type(event.card, "trick") == "trick";
		},
		content: function () {
			trigger.cancel();
		},
		ai: {
			notrick: true,
			nofire: true,
			nothunder: true,
			effect: {
				target: function (card, player, target, current) {
					const skill = lib.skill.jianjie;
					if (skill.hasMark("huoji", target) || skill.hasMark("lianhuan", target)) return false;
					if (player == target && get.subtype(card) == "equip2") {
						if (get.equipValue(card) <= 8) return 0;
					}
					if (!target.hasEmptySlot(2)) return;
					if (get.tag(card, "natureDamage")) return "zeroplayertarget";
					if (get.type(card) == "trick" && get.tag(card, "damage")) {
						return "zeroplayertarget";
					}
				},
			},
		},
	},
	xinfu_chenghao: {
		audio: 2,
		trigger: {
			global: "damageEnd",
		},
		filter: function (event, player) {
			return event.lianhuanable == true && event.player.isIn();
		},
		frequent: true,
		content: function () {
			"step 0";
			event.cards = game.cardsGotoOrdering(
				get.cards(
					game.countPlayer(function (current) {
						return current.isLinked();
					}) + 1
				)
			).cards;
			if (_status.connectMode)
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			event.given_map = {};
			"step 1";
			if (event.cards.length > 1) {
				player.chooseCardButton("称好：请选择要分配的牌", true, event.cards, [1, event.cards.length]).set("ai", function (button) {
					if (ui.selected.buttons.length == 0) return 1;
					return 0;
				});
			} else if (event.cards.length == 1) {
				event._result = { links: event.cards.slice(0), bool: true };
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				event.cards.removeArray(result.links);
				event.togive = result.links.slice(0);
				player
					.chooseTarget("选择一名角色获得" + get.translation(result.links), true)
					.set("ai", function (target) {
						var att = get.attitude(_status.event.player, target);
						if (_status.event.enemy) {
							return -att;
						} else if (att > 0) {
							return att / (1 + target.countCards("h"));
						} else {
							return att / 100;
						}
					})
					.set("enemy", get.value(event.togive[0], player, "raw") < 0);
			}
			"step 3";
			if (result.targets.length) {
				var id = result.targets[0].playerid,
					map = event.given_map;
				if (!map[id]) map[id] = [];
				map[id].addArray(event.togive);
			}
			if (cards.length > 0) event.goto(1);
			"step 4";
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			var list = [];
			for (var i in event.given_map) {
				var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
				player.line(source, "green");
				list.push([source, event.given_map[i]]);
			}
			game.loseAsync({
				gain_list: list,
				giver: player,
				animate: "draw",
			}).setContent("gaincardMultiple");
		},
	},
	xinfu_wuniang: {
		trigger: {
			player: ["useCard", "respond"],
		},
		audio: 2,
		direct: true,
		filter: function (event, player) {
			return event.card.name == "sha";
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("xinfu_wuniang"), "获得一名其他角色的一张牌，然后其和场上所有的“关索”摸一张牌。", function (card, player, target) {
					if (player == target) return false;
					return target.countGainableCards(player, "he") > 0;
				})
				.set("ai", function (target) {
					return 10 - get.attitude(_status.event.player, target);
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("xinfu_wuniang", target);
				player.line(target, "fire");
				event.draws = game.filterPlayer(function (current) {
					if (current == target) return true;
					return current.name == "guansuo" || current.name2 == "guansuo";
				});
				player.gainPlayerCard(target, "he", true);
			} else event.finish();
			"step 2";
			game.asyncDraw(event.draws, 1);
			game.delay();
		},
	},
	xinfu_xushen: {
		derivation: ["xinfu_zhennan"],
		audio: 2,
		subSkill: {
			count: {
				trigger: {
					player: "recoverBegin",
				},
				forced: true,
				silent: true,
				popup: false,
				filter: function (event, player) {
					if (!event.card || event.card.name != "tao") return false;
					if (!event.source || !event.source.hasSex("male")) return false;
					if (!player.isDying()) return false;
					if (
						game.hasPlayer(function (current) {
							return current.name == "guansuo" || current.name2 == "guansuo";
						})
					)
						return false;
					return true;
				},
				content: function () {
					trigger.xinfu_xushen = true;
				},
				sub: true,
			},
		},
		group: ["xinfu_xushen_count"],
		trigger: {
			player: "recoverAfter",
		},
		limited: true,
		init: function (player) {
			player.storage.xinfu_xushen = false;
		},
		filter: function (event, player) {
			if (player.storage.xinfu_xushen) return false;
			if (player.isDying()) return false;
			return event.xinfu_xushen == true;
		},
		direct: true,
		skillAnimation: true,
		animationColor: "fire",
		content: function () {
			"step 0";
			trigger.source.chooseBool("【许身】：是否将自己的一张武将牌替换为“关索”？").set("ai", function () {
				return false;
			});
			"step 1";
			if (result.bool) {
				player.awakenSkill("xinfu_xushen");
				player.logSkill("xinfu_xushen", trigger.source);
				if (trigger.source.name2 != undefined) {
					trigger.source.chooseControl(trigger.source.name1, trigger.source.name2).set("prompt", "请选择要更换的武将牌");
				} else event._result = { control: trigger.source.name1 };
			} else event.finish();
			"step 2";
			trigger.source.reinitCharacter(result.control, "guansuo");
			player.recover();
			player.addSkills("xinfu_zhennan");
		},
		mark: true,
		intro: {
			content: "limited",
		},
	},
	xinfu_falu: {
		subSkill: {
			spade: {
				marktext: "♠︎️",
				intro: {
					name: "紫薇",
					content: "mark",
				},
			},
			heart: {
				marktext: "♥︎️",
				intro: {
					name: "玉清",
					content: "mark",
				},
			},
			club: {
				marktext: "♣︎️",
				intro: {
					name: "后土",
					content: "mark",
				},
			},
			diamond: {
				marktext: "♦︎",
				intro: {
					name: "勾陈",
					content: "mark",
				},
			},
		},
		forced: true,
		audio: 2,
		trigger: {
			player: ["loseAfter", "enterGame"],
			global: ["loseAsyncAfter", "phaseBefore"],
		},
		filter: function (event, player) {
			if (event.name.indexOf("lose") != 0) return event.name != "phase" || game.phaseNumber == 0;
			if (event.type != "discard" || event.getlx === false) return false;
			var evt = event.getl(player);
			for (var i = 0; i < evt.cards2.length; i++) {
				if (!player.hasMark("xinfu_falu_" + get.suit(evt.cards2[i]))) return true;
			}
			return false;
		},
		content: function () {
			if (trigger.name.indexOf("lose") !== 0) {
				for (var i = 0; i < lib.suit.length; i++) {
					if (!player.hasMark("xinfu_falu_" + lib.suit[i])) player.addMark("xinfu_falu_" + lib.suit[i]);
				}
				return;
			}
			var evt = trigger.getl(player);
			for (var i = 0; i < evt.cards2.length; i++) {
				var suit = get.suit(evt.cards2[i]);
				if (!player.hasMark("xinfu_falu_" + suit)) player.addMark("xinfu_falu_" + suit);
			}
		},
		ai: {
			threaten: 1.4,
			combo: "xinfu_zhenyi",
		},
	},
	xinfu_dianhua: {
		trigger: {
			player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
		},
		frequent: true,
		audio: 2,
		filter: function (event, player) {
			for (var i = 0; i < lib.suit.length; i++) {
				if (player.hasMark("xinfu_falu_" + lib.suit[i])) return true;
			}
			return false;
		},
		content: function () {
			"step 0";
			var num = 0;
			for (var i = 0; i < lib.suit.length; i++) {
				if (player.hasMark("xinfu_falu_" + lib.suit[i])) num++;
			}
			var cards = get.cards(num);
			game.cardsGotoOrdering(cards);
			var next = player.chooseToMove();
			next.set("list", [["牌堆顶", cards], ["牌堆底"]]);
			next.set("prompt", "点化：点击或拖动将牌移动到牌堆顶或牌堆底");
			next.processAI = function (list) {
				var cards = list[0][1],
					player = _status.event.player;
				var target = _status.event.getTrigger().name == "phaseZhunbei" ? player : player.next;
				var att = get.sgn(get.attitude(player, target));
				var top = [];
				var judges = target.getCards("j");
				var stopped = false;
				if (player != target || !target.hasWuxie()) {
					for (var i = 0; i < judges.length; i++) {
						var judge = get.judge(judges[i]);
						cards.sort(function (a, b) {
							return (judge(b) - judge(a)) * att;
						});
						if (judge(cards[0]) * att < 0) {
							stopped = true;
							break;
						} else {
							top.unshift(cards.shift());
						}
					}
				}
				var bottom;
				if (!stopped) {
					cards.sort(function (a, b) {
						return (get.value(b, player) - get.value(a, player)) * att;
					});
					while (cards.length) {
						if (get.value(cards[0], player) <= 5 == att > 0) break;
						top.unshift(cards.shift());
					}
				}
				bottom = cards;
				return [top, bottom];
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
			player.popup(get.cnNumber(top.length) + "上" + get.cnNumber(bottom.length) + "下");
			game.log(player, "将" + get.cnNumber(top.length) + "张牌置于牌堆顶");
			game.updateRoundNumber();
			game.delayx();
		},
		ai: {
			combo: "xinfu_falu",
			threaten: 2.2,
		},
	},
	xinfu_zhenyi: {
		group: ["zhenyi_spade", "zhenyi_club", "zhenyi_heart"],
		trigger: {
			player: "damageEnd",
		},
		audio: 2,
		filter: function (event, player) {
			//if(!event.hasNature()) return false;
			return player.hasMark("xinfu_falu_diamond");
		},
		prompt2: "弃置「勾陈♦」标记，从牌堆中获得每种类型的牌各一张。",
		content: function () {
			"step 0";
			player.removeMark("xinfu_falu_diamond");
			event.num = 0;
			event.togain = [];
			"step 1";
			var card = get.cardPile(function (card) {
				for (var i = 0; i < event.togain.length; i++) {
					if (get.type(card, "trick") == get.type(event.togain[i], "trick")) return false;
				}
				return true;
			});
			if (card) {
				event.togain.push(card);
				event.num++;
				if (event.num < 3) event.redo();
			}
			"step 2";
			if (event.togain.length) {
				player.gain(event.togain, "gain2");
			}
		},
		ai: {
			combo: "xinfu_falu",
		},
	},
	zhenyi_spade: {
		trigger: {
			global: "judge",
		},
		direct: true,
		sourceSkill: "xinfu_zhenyi",
		filter: function (event, player) {
			return player.hasMark("xinfu_falu_spade");
		},
		content: function () {
			"step 0";
			var str = get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定为" + get.translation(trigger.player.judging[0]) + "，是否发动【真仪】，弃置「紫薇♠」标记并修改判定结果？";
			player
				.chooseControl("spade", "heart", "diamond", "club", "cancel2")
				.set("prompt", str)
				.set("ai", function () {
					//return '取消';
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
							number: 5,
						});
					};
					list.sort(function (a, b) {
						return (getj(b) - getj(a)) * get.sgn(attitude);
					});
					if ((getj(list[0]) - res1) * attitude > 0) return list[0];
					return "cancel2";
				})
				.set("judging", trigger.player.judging[0]);
			"step 1";
			if (result.control != "cancel2") {
				player.addExpose(0.25);
				player.removeMark("xinfu_falu_spade");
				player.logSkill("xinfu_zhenyi", trigger.player);
				//player.line(trigger.player);
				player.popup(result.control);
				game.log(player, "将判定结果改为了", "#y" + get.translation(result.control + 2) + 5);
				trigger.fixedResult = {
					suit: result.control,
					color: get.color({ suit: result.control }),
					number: 5,
				};
			}
		},
		ai: {
			rejudge: true,
			tag: {
				rejudge: 1,
			},
			expose: 0.5,
		},
	},
	zhenyi_club: {
		audio: "xinfu_zhenyi",
		enable: "chooseToUse",
		sourceSkill: "xinfu_zhenyi",
		viewAsFilter: function (player) {
			if (player == _status.currentPhase) return false;
			return player.hasMark("xinfu_falu_club") && player.countCards("hs") > 0;
		},
		filterCard: true,
		position: "hs",
		viewAs: {
			name: "tao",
		},
		prompt: "弃置「后土♣」标记，将一张手牌当桃使用",
		check: function (card) {
			return 15 - get.value(card);
		},
		precontent: function () {
			player.removeMark("xinfu_falu_club");
		},
	},
	zhenyi_heart: {
		trigger: {
			source: "damageBegin1",
		},
		audio: "xinfu_zhenyi",
		sourceSkill: "xinfu_zhenyi",
		filter: function (event, player) {
			return player.hasMark("xinfu_falu_heart");
		},
		check: function (event, player) {
			if (get.attitude(player, event.player) >= 0) return false;
			if (
				event.player.hasSkillTag("filterDamage", null, {
					player: player,
					card: event.card,
				})
			)
				return false;
			return true;
			//return player.hasMark('xinfu_falu_spade')||get.color(ui.cardPile.firstChild)=='black';
		},
		prompt2: function (event) {
			return "弃置「玉清♥」标记，令对" + get.translation(event.player) + "即将造成的伤害+1。";
		},
		logTarget: "player",
		content: function () {
			player.removeMark("xinfu_falu_heart");
			trigger.num++;
		},
	},
	xinfu_zhennan: {
		audio: 2,
		trigger: {
			target: "useCardToTargeted",
		},
		filter: function (event, player) {
			return event.card.name == "nanman";
		},
		direct: true,
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("xinfu_zhennan"), "对一名其他角色造成1-3点随机伤害", function (card, player, target) {
					return target != player;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					return get.damageEffect(target, player, player);
				});
			"step 1";
			if (result.bool && result.targets && result.targets.length) {
				game.delay();
				player.logSkill("xinfu_zhennan", result.targets);
				var num = [1, 2, 3, 1, 1, 2].randomGet();
				if (get.isLuckyStar(player)) num = 3;
				//player.line(result.targets[0],'fire');
				result.targets[0].damage(num);
			}
		},
		ai: {
			expose: 0.25,
		},
	},
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
							setTimeout(function () {
								target.$gain2(cards.slice(1));
							}, get.delayx(200, 200));
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
				return Math.random() < evt.player.countCards("h") / 4;
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
					if (event.name == "equip" && event.player == player) return event.cards.length != (evt.es?.length ?? 0);
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
				target_use: function (card, player, target, current) {
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
		sourceSkill: "xinfu_zengdao",
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
			if (!game.hasPlayer(i => i.hasSkill("xinfu_guanwei", null, null, false), true)) game.removeGlobalSkill("xinfu_guanwei_ai");
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
			var evt = trigger.getParent("phase", true);
			if (evt) evt.phaseList.splice(evt.num, 0, "phaseUse|xinfu_guanwei");
		},
		ai: {
			expose: 0.5,
		},
		subSkill: {
			ai: {
				trigger: { player: "dieAfter" },
				filter: () => {
					return !game.hasPlayer(i => i.hasSkill("xinfu_guanwei", null, null, false), true);
				},
				silent: true,
				forceDie: true,
				content: () => {
					game.removeGlobalSkill("xinfu_guanwei_ai");
				},
				ai: {
					effect: {
						player_use(card, player, target) {
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
		sourceSkill: "xinfu_yingshi",
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
		sourceSkill: "xinfu_yingshi",
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
							return evt.isPhaseUsing() && evt.getParent("phaseUse") === _status.event.getParent("phaseUse");
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
						return evt.isPhaseUsing() && evt.getParent("phaseUse") === event.getParent("phaseUse");
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
							return evt.isPhaseUsing() && evt.getParent("phaseUse") === _status.event.getParent("phaseUse");
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
						return evt.isPhaseUsing() && evt.getParent("phaseUse") === event.getParent("phaseUse");
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
				player.tempBanSkill("xinfu_kannan");
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
		sourceSkill: "xinfu_kannan",
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
				if (card.name === "zhangba") return 114514;
				if (["shan", "tao", "jiu"].includes(card.name)) {
					if (player.getEquip("zhangba") && player.countCards("hs") > 1) return 0.01;
					return num / 2;
				}
				if (get.tag(card, "multitarget")) return num + game.players.length;
			},
			aiUseful(player, card, num) {
				if (card.name === "zhangba") return 114514;
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
				player_use(card, player, target) {
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
				if (get.type(card, null, player) == "trick" && player.canUse(card, player) && player.canAddJudge(card)) return 15;
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
					if (player.countCards("hes", "zhangba")) return player.countCards("h", { type: "basic" });
					let res = lib.card.lebu.ai.result.target(player, target);
					if (player.countCards("hs", "sha") >= player.hp) res++;
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
					if (target.isPhaseUsing() && typeof card === "object" && get.type(card, null, target) === "delay" && !target.countCards("j")) {
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
