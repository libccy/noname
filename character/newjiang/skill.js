import { lib, game, ui, get, ai, _status } from "../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	//星董卓
	xiongjin: {
		mark: true,
		marktext: "☯",
		zhuanhuanji: true,
		intro: {
			content(storage) {
				if (!storage) return "出牌阶段开始时，你可以摸X张牌，然后本回合的弃牌阶段开始时，你弃置所有非基本牌（X为你已损失的体力值，至少为1，至多为3）";
				return "其他角色的出牌阶段开始时，你可以令其摸X张牌，然后本回合的弃牌阶段开始时，其弃置所有基本牌（X为你已损失的体力值，至少为1，至多为3）";
			},
		},
		audio: 2,
		trigger: { global: "phaseUseBegin" },
		filter(event, player) {
			return (event.player !== player) === Boolean(player.storage.xiongjin);
		},
		logTarget: "player",
		prompt2(event, player) {
			const goon = event.player === player;
			return (goon ? "" : "令其") + "摸" + get.cnNumber(Math.min(3, Math.max(1, player.getDamagedHp()))) + "张牌，本回合的弃牌阶段开始时，" + (goon ? "弃置所有非基本牌" : "其弃置所有基本牌");
		},
		content() {
			player.changeZhuanhuanji("xiongjin");
			const target = trigger.player;
			target.addTempSkill("xiongjin_effect");
			target.markAuto("xiongjin_effect", [target === player ? "nobasic" : "basic"]);
			target.draw(Math.min(3, Math.max(1, player.getDamagedHp())));
		},
		subSkill: {
			effect: {
				charlotte: true,
				mark: true,
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) return "弃牌阶段开始时，弃置所有牌";
						return "弃牌阶段开始时，弃置所有" + (storage[0] === "basic" ? "基本" : "非基本") + "牌";
					},
				},
				trigger: { player: "phaseDiscardBegin" },
				forced: true,
				popup: false,
				content() {
					const storage = player.getStorage("xiongjin_effect");
					const cards = player.getCards("he", card => {
						if (!lib.filter.cardDiscardable(card, player)) return false;
						const type = get.type(card);
						return (type === "basic" && storage.includes("basic")) || (type !== "basic" && storage.includes("nobasic"));
					});
					if (cards.length) player.discard(cards);
				},
			},
		},
	},
	xiawei: {
		audio: 2,
		trigger: { global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter"] },
		filter(event, player) {
			if (event.name.indexOf("lose") === 0) {
				if (event.getlx === false || event.position !== ui.discardPile) return false;
			} else if (event.getParent()?.relatedEvent?.name == "useCard") return false;
			return event.cards.some(card => !player.getStorage("xiawei").includes(get.suit(card, false)));
		},
		forced: true,
		async content(event, trigger, player) {
			player.markAuto(
				"xiawei",
				trigger.cards.reduce((list, card) => list.add(get.suit(card, false)), [])
			);
			player.storage.xiawei.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
			player.addTip("xiawei", get.translation("xiawei") + player.getStorage("xiawei").reduce((str, suit) => str + get.translation(suit), ""));
			if (player.getStorage("xiawei").length >= 4 && player.maxHp < 9) {
				delete player.storage.xiawei;
				player.unmarkSkill("xiawei");
				player.removeTip("xiawei");
				await player.gainMaxHp();
				await player.draw();
			}
		},
		intro: { content: "已记录花色$" },
		mod: { maxHandcardBase: player => player.maxHp },
		onremove: (player, skill) => player.removeTip(skill),
	},
	baoxi: {
		audio: 2,
		trigger: { global: ["loseEnd", "cardsDiscardEnd", "loseAsyncEnd"] },
		filter(event, player) {
			if (player.getStorage("baoxi_used").includes("juedou")) return false;
			if (event.name.indexOf("lose") === 0 && (event.getlx === false || event.position !== ui.discardPile)) return false;
			return event.cards.filter(card => get.type(card) === "basic").length > 1 && player.hasUseTarget(new lib.element.VCard({ name: "juedou" }));
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("baoxi"), "减1点体力上限，视为对一名角色使用【决斗】", (card, player, target) => {
					return player.canUse(new lib.element.VCard({ name: "juedou" }), target);
				})
				.set("ai", target => {
					const player = get.player();
					if (player.maxHp === 1) return 0;
					return get.effect(target, new lib.element.VCard({ name: "juedou" }), player, player);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			player.addTempSkill("baoxi_used");
			player.markAuto("baoxi_used", ["juedou"]);
			await player.loseMaxHp();
			await player.useCard(new lib.element.VCard({ name: "juedou" }), event.targets[0], false);
		},
		group: "baoxi_sha",
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
			sha: {
				audio: "baoxi",
				trigger: { global: ["loseEnd", "cardsDiscardEnd", "loseAsyncEnd"] },
				filter(event, player) {
					if (player.getStorage("baoxi_used").includes("sha")) return false;
					if (event.name.indexOf("lose") === 0 && (event.getlx === false || event.position !== ui.discardPile)) return false;
					return event.cards.filter(card => get.type(card) !== "basic").length > 1 && player.hasUseTarget(new lib.element.VCard({ name: "sha" }));
				},
				async cost(event, trigger, player) {
					event.result = await player
						.chooseTarget(get.prompt("baoxi"), "减1点体力上限，视为对一名角色使用【杀】", (card, player, target) => {
							return player.canUse(new lib.element.VCard({ name: "sha" }), target);
						})
						.set("ai", target => {
							const player = get.player();
							if (player.maxHp === 1) return 0;
							return get.effect(target, new lib.element.VCard({ name: "sha" }), player, player);
						})
						.forResult();
				},
				async content(event, trigger, player) {
					player.addTempSkill("baoxi_used");
					player.markAuto("baoxi_used", ["sha"]);
					await player.loseMaxHp();
					await player.useCard(new lib.element.VCard({ name: "sha" }), event.targets[0], false);
				},
			},
		},
	},
	//向秀
	mpmiaoxi: {
		enable: "phaseUse",
		usable: 1,
		filterCard: true,
		position: "h",
		filterTarget(card, player, target) {
			return target.countCards("h") && target != player;
		},
		discard: false,
		lose: false,
		delay: false,
		async content(event, trigger, player) {
			const target = event.target;
			const carda = event.cards[0];
			const result = await player.choosePlayerCard(target, "h", true).forResult();
			if (result.bool) {
				const cardb = result.cards[0];
				player.$throw(carda);
				target.$throw(cardb);
				game.log(player, "展示了", player, "的", carda, "和", target, "的", cardb);
				await player.showCards([carda, cardb], get.translation(player) + "发动了【妙析】");
				if (get.color(carda) == get.color(cardb)) {
					await game
						.loseAsync({
							lose_list: [
								[player, [carda]],
								[target, [cardb]],
							],
							discarder: player,
						})
						.setContent("discardMultiple");
				}
				if (get.suit(carda) == get.suit(cardb)) await target.loseHp();
				if (get.name(carda) == get.name(cardb)) {
					if (get.owner(cardb)) await get.owner(cardb).give(cardb, player);
					else await player.gain(cardb, "gain2");
				}
				if (get.number(carda) == get.number(cardb) && !player.hasSkill("mpmiaoxi_fresh")) {
					player.addTempSkill("mpmiaoxi_fresh");
					player.getStat("skill").mpmiaoxi--;
				}
			}
		},
		ai: {
			order: 5,
			result: {
				target: -1,
			},
		},
		subSkill: {
			fresh: {
				charlotte: true,
			},
		},
	},
	mpsijiu: {
		trigger: {
			global: "roundStart",
		},
		filter(event, player) {
			return game.hasPlayer(current => {
				if (current == player) return false;
				return (
					current.getRoundHistory(
						"lose",
						evt => {
							let evtx = evt.getParent();
							if (!evtx.getg) return false;
							var cards = evtx.getg(player);
							if (!cards.length) return false;
							var cards2 = evt.cards2;
							for (var card of cards2) {
								if (cards.includes(card)) return true;
							}
							return false;
						},
						1
					).length > 0
				);
			});
		},
		frequent: true,
		async content(event, trigger, player) {
			await player.draw();
			const result = await player
				.chooseTarget("是否观看一名角色的手牌？", function (card, player, target) {
					return target != player && target.countCards("h");
				})
				.set("ai", target => {
					return 11 - get.attitude(get.player(), target);
				})
				.forResult();
			if (result.bool) {
				const target = result.targets[0];
				await player.viewHandcards(target);
			}
		},
	},
	//马钧
	yjgongqiao: {
		enable: "phaseUse",
		usable: 1,
		locked: false,
		filter(event, player) {
			if (!player.countCards("h")) return false;
			for (let i = 0; i <= 5; i++) {
				if (player.hasEquipableSlot(i)) return true;
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog("###工巧###你可将一张手牌置于你的任意装备栏内（可替换原装备牌）");
			},
			chooseControl(event, player) {
				const choices = [];
				for (let i = 0; i <= 5; i++) {
					if (player.hasEquipableSlot(i)) choices.push(`equip${i}`);
				}
				choices.push("cancel2");
				return choices;
			},
			backup(result, player) {
				return {
					audio: "yjgongqiao",
					slot: result.control,
					filterCard: true,
					position: "h",
					discard: false,
					lose: false,
					delay: false,
					prepare: "throw",
					async content(event, trigger, player) {
						const card = get.autoViewAs(event.cards[0]);
						card.subtypes = [lib.skill.yjgongqiao_backup.slot];
						await player.equip(card);
					},
				};
			},
			prompt(result, player) {
				return `选择一张手牌置入${get.translation(result.control)}栏`;
			},
		},
		mod: {
			maxHandcard(player, num) {
				if (
					player.hasCard(card => {
						return get.type2(card, false) === "equip";
					}, "e")
				)
					return num + 3;
			},
		},
		group: ["yjgongqiao_basic", "yjgongqiao_trick"],
		subSkill: {
			backup: {},
			basic: {
				trigger: { player: "useCard1" },
				forced: true,
				popup: false,
				filter(event, player) {
					return (
						get.type2(event.card, false) === "basic" &&
						player.hasCard(card => {
							return get.type2(card, false) === "basic";
						}, "e")
					);
				},
				async content(event, trigger, player) {
					trigger.baseDamage++;
					game.log(player, "使用的", trigger.card, "牌面数值+1");
				},
			},
			trick: {
				audio: "yjgongqiao",
				trigger: { player: "useCardAfter" },
				forced: true,
				filter(event, player) {
					const type = get.type2(event.card, false);
					if (
						player.hasHistory(
							"useCard",
							evt => {
								return evt !== event && get.type2(evt.card, false) === type;
							},
							event
						)
					)
						return false;
					return player.hasCard(card => {
						return get.type2(card, false) === "trick";
					}, "e");
				},
				async content(event, trigger, player) {
					await player.draw();
				},
			},
		},
	},
	yjjingyi: {
		trigger: { player: "equipAfter" },
		forced: true,
		filter(event, player) {
			return event.cards?.length > 0;
		},
		async content(event, trigger, player) {
			const num = player.countCards("e");
			if (num > 0) await player.draw(num);
			if (player.countCards("he") > 0) await player.chooseToDiscard(2, "he", true);
		},
	},
	//新谋郭嘉
	xianmou: {
		mark: true,
		marktext: "☯",
		zhuanhuanji(player, skill) {
			player.storage[skill] = !player.storage[skill];
			player.changeSkin({ characterName: "yj_sb_guojia" }, "yj_sb_guojia" + (player.storage[skill] ? "_shadow" : ""));
		},
		intro: {
			content: function (storage) {
				if (!storage) return "你失去过牌的回合结束时，你可以观看牌堆顶五张牌并获得至多X张牌，若未获得X张牌则获得〖遗计〗直到再发动此项（X为你本回合失去牌数）";
				return "你失去过牌的回合结束时，你可以观看一名角色手牌并弃置其中至多X张牌，若弃置X张牌则你进行一次【闪电】判定（X为你本回合失去牌数）";
			},
		},
		audio: 2,
		audioname: ["yj_sb_guojia_shadow"],
		trigger: {
			global: "phaseEnd",
		},
		filter(event, player) {
			return player.getHistory("lose", evt => evt.cards2 && evt.cards2.length).length;
		},
		async cost(event, trigger, player) {
			let num = 0;
			player.getHistory("lose", evt => {
				if (evt.cards2) num += evt.cards2.length;
			});
			if (player.storage.xianmou) {
				event.result = await player
					.chooseTarget(get.prompt("xianmou"), `观看一名角色手牌并弃置其中至多${num}张牌`, function (card, player, target) {
						return target.countCards("h");
					})
					.set("ai", function (target) {
						const player = _status.event.player;
						return get.effect(target, { name: "guohe_copy2" }, player, player);
					})
					.forResult();
			} else {
				event.result = await player.chooseBool(get.prompt("xianmou"), `观看牌堆顶五张牌并获得至多${num}张牌`).forResult();
			}
		},
		async content(event, trigger, player) {
			let num = 0;
			player.getHistory("lose", evt => {
				if (evt.cards2) num += evt.cards2.length;
			});
			player.changeZhuanhuanji("xianmou");
			if (player.storage.xianmou) {
				player.addAdditionalSkills("xianmou", []);
				let cards = game.cardsGotoOrdering(get.cards(5)).cards;
				const result = await player
					.chooseButton([`是否获得至多${num}张牌？`, cards], [1, num])
					.set("ai", function (button) {
						if (ui.selected.buttons.length + 1 >= _status.event.maxNum) return 0;
						return get.value(button.link);
					})
					.set("maxNum", num)
					.forResult();
				if (result.bool) {
					await player.gain(result.links, "gain2");
					cards.removeArray(result.links);
				}
				cards.reverse();
				for (var i = 0; i < cards.length; i++) {
					ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
				}
				if (!result.bool || result.links.length < num) await player.addAdditionalSkills("xianmou", "new_reyiji");
			} else {
				const target = event.targets[0];
				const result = await player
					.discardPlayerCard(target, "h", `是否弃置${get.translation(target)}至多${num}张牌?`, [1, num], "visible")
					.set("ai", function (button) {
						if (ui.selected.buttons.length + 1 >= _status.event.maxNum) return 5 - get.value(button.link);
						return get.value(button.link);
					})
					.set("maxNum", num)
					.forResult();
				if (result?.bool && result.links?.length >= num) await player.executeDelayCardEffect("shandian");
			}
		},
		derivation: "new_reyiji",
		group: "xianmou_change",
		subSkill: {
			change: {
				audio: "xianmou",
				audioname: ["yj_sb_guojia_shadow"],
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				prompt2(event, player) {
					return "切换【先谋】为状态" + (player.storage.dcsbyingmou ? "阳" : "阴");
				},
				check: () => Math.random() > 0.5,
				content() {
					player.changeZhuanhuanji("xianmou");
				},
			},
		},
	},
	lunshi: {
		audio: 2,
		audioname: ["yj_sb_guojia_shadow"],
		position: "hs",
		enable: "chooseToUse",
		filter(event, player) {
			if (!player.countCards("hs")) return false;
			if (player.countCards("h", { color: "black" }) != player.countCards("h", { color: "red" })) return false;
			if (event.type != "wuxie") return false;
			let info = event.info_map;
			if (!info || get.type(info.card) != "trick") return false;
			return info.player != info.target;
		},
		filterCard: true,
		viewAs: {
			name: "wuxie",
		},
		viewAsFilter(player) {
			if (!player.countCards("hs")) return false;
			if (player.countCards("h", { color: "black" }) != player.countCards("h", { color: "red" })) return false;
			return true;
		},
		prompt: "将一张手牌当无懈可击使用",
		check: function (card) {
			return 8 - get.value(card);
		},
		group: "lunshi_nowuxie",
		subSkill: {
			nowuxie: {
				trigger: {
					player: "useCard",
				},
				forced: true,
				locked: false,
				popup: false,
				filter: function (event, player) {
					return event.card.name == "wuxie" && event.skill && event.skill == "lunshi";
				},
				content: function () {
					trigger.directHit.addArray(game.players);
				},
			},
		},
	},
	//荀彧荀攸 - 想你了
	zhinang: {
		getMap() {
			if (!_status.zhinang_map) {
				_status.zhinang_map = {
					name: {},
					info: {},
				};
				let list;
				if (_status.connectMode) {
					list = get.charactersOL();
				} else {
					list = get.gainableCharacters();
				}
				list.forEach(name => {
					if (name !== "xunyuxunyou") {
						const skills = get.character(name, 3);
						skills.forEach(skill => {
							const info = get.info(skill);
							if (!info || (info.ai && info.ai.combo)) return;
							if (skill in _status.zhinang_map) return;
							if (get.translation(skill).includes("谋")) _status.zhinang_map.name[skill] = name;
							const voices = get.Audio.skill({ skill, name }).textList;
							if (voices.some(data => data.includes("谋"))) {
								_status.zhinang_map.info[skill] = name;
							}
						});
					}
				});
			}
			return _status.zhinang_map;
		},
		trigger: {
			player: "useCardAfter",
		},
		filter(event, player) {
			return ["trick", "equip"].includes(get.type2(event.card));
		},
		prompt2(event, player) {
			const type = get.type2(event.card),
				name = `zhinang_${type}`,
				skills = player.getRemovableAdditionalSkills(name);
			let str = `获得一个技能${type == "trick" ? "台词" : "名"}包含“谋”的技能`;
			if (skills.length) {
				str = `失去${skills.map(skill => `【${get.translation(skill)}】`)}并${str}`;
			}
			return str;
		},
		async content(event, trigger, player) {
			const map = lib.skill.zhinang.getMap(),
				type = get.type2(trigger.card) == "equip" ? "name" : "info",
				list = Object.keys(map[type]);
			if (list.length > 0) {
				const skill = list.randomGet(),
					voiceMap = get.Audio.skill({ skill, player: map[type][skill] }).audioList;
				if (type == "info") {
					findaudio: for (let data of voiceMap) {
						if (!data.text) continue;
						if (data.text.includes("谋")) {
							player.chat(data.text);
							game.broadcastAll(file => game.playAudio(file), data.file);
							break findaudio;
						}
					}
				} else player.flashAvatar("zhinang", map[type][skill]);
				player.popup(skill);
				await player.addAdditionalSkills(`zhinang_${get.type2(trigger.card)}`, skill);
			}
		},
		init(player, skill) {
			player.addSkill(["zhinang_equip", "zhinang_trick"]);
		},
		onremove(player, skill) {
			player.removeSkill(["zhinang_equip", "zhinang_trick"]);
		},
		subSkill: {
			equip: {},
			trick: {},
		},
	},
	gouzhu: {
		trigger: {
			player: "changeSkillsAfter",
		},
		filter(_1, player, _3, skill) {
			let list = get.skillCategoriesOf(skill, player);
			return list.length && list.some(item => item in lib.skill.gouzhu.effectMap);
		},
		getIndex(event, player) {
			if (!event.removeSkill.length) return false;
			return event.removeSkill;
		},
		prompt(_1, _2, _3, skill) {
			return `失去了技能【${get.translation(skill)}】，是否发动【苟渚】？`;
		},
		frequent: true,
		effectMap: {
			锁定技: async function () {
				let player = _status.event.player;
				if (player.isDamaged()) await player.recover();
			},
			觉醒技: async function () {
				let player = _status.event.player;
				let card = get.cardPile(card => get.type(card) == "basic");
				if (card) await player.gain(card, "gain2");
			},
			限定技: async function () {
				let player = _status.event.player;
				let target = game.filterPlayer(current => current != player).randomGet();
				if (target) {
					player.line(target, "green");
					await target.damage(player);
				}
			},
			转换技: async function () {
				let player = _status.event.player;
				player.addMark("gouzhu", 1, false);
				game.log(player, "手牌上限+1");
				await game.delay();
			},
			主公技: async function () {
				let player = _status.event.player;
				await player.gainMaxHp();
			},
		},
		mod: {
			maxHandcard: function (player, num) {
				return num + player.countMark("gouzhu");
			},
		},
		intro: {
			content: "手牌上限+#",
		},
		locked: false,
		onremove: true,
		async content(event, trigger, player) {
			let skill = event.indexedData;
			let list = get.skillCategoriesOf(skill, player);
			for (const item of list) {
				if (item in lib.skill.gouzhu.effectMap) {
					const next = game.createEvent("gouzhu_effect", false);
					next.player = player;
					next.setContent(lib.skill.gouzhu.effectMap[item]);
					await next;
				}
			}
		},
	},
	//一将2024
	//令狐愚
	xvzhi: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return (
				game.countPlayer(target => {
					return lib.skill.xvzhi.filterTarget(null, player, target);
				}) > 1
			);
		},
		filterTarget(card, player, target) {
			const stat = player.getStat("xvzhi");
			return target.countCards("h") && (!stat || !stat.includes(target));
		},
		selectTarget: 2,
		usable: 1,
		multiline: true,
		multitarget: true,
		async content(event, trigger, player) {
			const targets = event.targets;
			if (!player.getStat().xvzhi) player.getStat().xvzhi = [];
			player.getStat().xvzhi.addArray(targets);
			if (targets.some(i => !i.countCards("h"))) return;
			const result = await player
				.chooseCardOL(targets, "h", true, [1, Infinity], "蓄志：选择任意张手牌并与对方交换")
				.set("ai", card => {
					const player = get.event("player"),
						target = get
							.event()
							.getParent(2)
							.targets.find(i => i != player);
					const sha = new lib.element.VCard({ name: "sha" });
					const playerEffect = player.hasUseTarget(sha, false)
						? Math.max(
								...game
									.filterPlayer(current => player.canUse(sha, current, false))
									.map(current => {
										return get.effect(current, sha, player, player);
									})
						  )
						: 0;
					const targetEffect = target.hasUseTarget(sha, false)
						? Math.max(
								...game
									.filterPlayer(current => target.canUse(sha, current, false))
									.map(current => {
										return get.effect(current, sha, player, player);
									})
						  )
						: 0;
					return 5 + 2 * get.sgn(playerEffect - targetEffect) - get.value(card);
				})
				.forResult();
			await targets[0].swapHandcards(targets[1], result[0].cards, result[1].cards);
			if (result[0].cards.length == result[1].cards.length) {
				await player.draw(2);
				player.getStat("skill").xvzhi--;
			} else {
				const aim = targets[result[0].cards.length > result[1].cards.length ? 0 : 1];
				const sha = new lib.element.VCard({ name: "sha" });
				if (aim.hasUseTarget(sha, false)) {
					await aim.chooseUseTarget(sha, true, false, "nodistance");
				}
			}
		},
		ai: {
			order: 5,
			result: {
				target(player, target) {
					return get.sgn(get.attitude(player, target)) * target.countCards("h");
				},
			},
		},
	},
	//司马孚
	beiyu: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			return player.countCards("h") < player.maxHp;
		},
		usable: 1,
		async content(event, trigger, player) {
			await player.drawTo(player.maxHp);
			if (!player.countCards("h")) return;
			const suits = player
				.getCards("h")
				.reduce((list, card) => list.add(get.suit(card)), [])
				.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
			const result = await player
				.chooseControl(suits)
				.set("prompt", "备预：将一种花色的手牌牌置于牌堆底")
				.set("ai", () => {
					const player = get.event("player");
					let suits = get.event("controls").slice();
					suits.sort((a, b) => player.countCards("h", { suit: a }) - player.countCards("h", { suit: b }));
					return suits[0];
				})
				.forResult();
			if (result.control) {
				const suit = result.control,
					cards = player.getCards("h", { suit: suit });
				if (cards.length) {
					let resultx;
					if (cards.length == 1) {
						resultx = { bool: true, moved: [cards] };
					} else {
						resultx = await player
							.chooseToMove("备预：将牌按顺序置于牌堆底", true)
							.set("list", [["牌堆底", cards]])
							.set("processAI", list => {
								return [list[0][1].slice(0)];
							})
							.forResult();
					}
					if (resultx.bool) {
						const moved = resultx.moved[0];
						if (moved.length) {
							await player.lose(cards, ui.cardPile);
							for (let i = 0; i < moved.length; i++) {
								const card = moved[i];
								card.fix();
								ui.cardPile.appendChild(card);
							}
						}
					}
				}
			}
		},
		ai: {
			order: 0.001,
			result: { player: 1 },
		},
	},
	duchi: {
		audio: 2,
		trigger: { target: "useCardToTargeted" },
		filter(event, player) {
			return event.player != player;
		},
		usable: 1,
		logTarget: "player",
		check(event, player) {
			return get.effect(player, event.card, event.player, player) <= 0;
		},
		async content(event, trigger, player) {
			await player.draw().set("bottom", true);
			if (player.countCards("h")) {
				await player.showHandcards(get.translation(player) + "发动了【督持】");
				const colors = player.getCards("h").reduce((list, card) => list.add(get.color(card)), []);
				if (colors.length == 1) {
					player.popup("洗具");
					trigger.getParent().excluded.add(player);
					return;
				}
			}
			player.popup("杯具");
		},
		ai: { threaten: 0.8 },
	},
	//宣公主
	yjqimei: {
		audio: 2,
		enable: "phaseUse",
		filter(event, player) {
			const count = player.getStat("skill").yjqimei;
			if (count && count > 0 && !player.hasSkill("yjqimei_rewrite")) return false;
			return true;
		},
		filterTarget: lib.filter.notMe,
		usable: 2,
		async content(event, trigger, player) {
			const target = event.target;
			await player.draw(2, "nodelay");
			await target.draw(2);
			const targets = [player, target].filter(current => current.countDiscardableCards(current, "he"));
			if (targets.length) {
				const result = await player
					.chooseCardOL(targets, "he", true, 2, "齐眉：请弃置两张牌", (card, player, target) => {
						return lib.filter.cardDiscardable(card, player);
					})
					.forResult();
				if (result.length == 1) targets[0].discard(result[0].cards);
				else {
					await game
						.loseAsync({
							lose_list: [
								[targets[0], result[0].cards],
								[targets[1], result[1].cards],
							],
						})
						.setContent("discardMultiple");
					await game.asyncDelayx();
				}
				let cards = result.reduce((list, evt) => {
					list.addArray(evt.cards);
					return list;
				}, []);
				const suits = cards.reduce((list, card) => list.add(get.suit(card)), []);
				switch (suits.length) {
					case 1:
						while (cards.length) {
							const card = cards.shift();
							if (player.hasUseTarget(card)) {
								player.$gain2(card, false);
								await game.asyncDelayx();
								await player.chooseUseTarget(true, card, false);
							}
						}
						break;
					case 2:
						for (const current of [player, target]) {
							if (!current.isIn()) continue;
							if (current.isLinked()) await current.link(false);
							if (current.isTurnedOver()) await current.turnOver(false);
						}
						break;
					case 3:
						for (const current of [player, target]) {
							if (current.isIn() && !current.isLinked()) await current.link(true);
						}
						break;
					case 4:
						await player.draw("nodelay");
						await target.draw();
						player.addTempSkill("yjqimei_rewrite");
						break;
				}
			}
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					const att = get.sgn(get.attitude(player, target));
					return (2 + att) * att;
				},
			},
		},
		subSkill: { rewrite: { charlotte: true } },
	},
	yjzhuiji: {
		audio: 2,
		trigger: { player: "die" },
		filter(event, player) {
			return game.hasPlayer(target => {
				return (
					target != player &&
					Array.from({ length: 5 })
						.map((_, i) => i + 1)
						.some(i => target.hasEmptySlot(i))
				);
			});
		},
		forceDie: true,
		skillAnimation: true,
		animationColor: "water",
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2("yjzhuiji"), (card, player, target) => {
					return (
						target != player &&
						Array.from({ length: 5 })
							.map((_, i) => i + 1)
							.some(i => target.hasEmptySlot(i))
					);
				})
				.set("ai", target => {
					const player = get.event("player");
					return (
						get.sgn(get.attitude(player, target)) *
						Array.from({ length: 5 })
							.map((_, i) => i + 1)
							.reduce((sum, i) => sum + target.countEmptySlot(i), 0)
					);
				})
				.set("forceDie", true)
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			let num = 1,
				cards = [];
			while (num <= 5) {
				while (target.hasEmptySlot(num)) {
					const card = get.cardPile2(card => {
						return !cards.includes(card) && get.subtype(card) == "equip" + num && target.canUse(card, target);
					});
					if (card) {
						cards.push(card);
						target.$gain2(card, false);
						await game.asyncDelayx();
						await target.chooseUseTarget(card, true, "nopopup");
					} else break;
				}
				num++;
			}
			if (cards.length) {
				target.addSkill("yjzhuiji_buff");
				target.markAuto("yjzhuiji_buff", cards);
			}
		},
		subSkill: {
			buff: {
				charlotte: true,
				mod: {
					aiValue(player, card, num) {
						if (player.getStorage("yjzhuiji_buff").includes(card)) return num + 100;
					},
					aiUseful(player, card, num) {
						if (player.getStorage("yjzhuiji_buff").includes(card)) return num / 114514;
					},
				},
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					const evt = event.getl(player);
					return evt && evt.es && evt.es.some(i => player.getStorage("yjzhuiji_buff").includes(i));
				},
				forced: true,
				popup: false,
				firstDo: true,
				content() {
					const evt = trigger.getl(player);
					const cards = evt.es.filter(i => player.getStorage("yjzhuiji_buff").includes(i));
					player.unmarkAuto("yjzhuiji_buff", cards);
					for (const card of cards) player.disableEquip(get.subtype(card));
				},
				intro: {
					mark(dialog, storage) {
						if (storage && storage.length) dialog.addSmall([storage, "vcard"]);
						else return "暂无装备";
					},
				},
			},
		},
	},
	//徐琨（菜不菜我不知道）
	fazhu: {
		audio: 3,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return player.hasCard(card => !get.tag(card, "damage") && player.canRecast(card), "hej");
		},
		async cost(event, trigger, player) {
			event.result = await player
				.choosePlayerCard(get.prompt(event.name.slice(0, -5)), player, "hej", [1, Infinity])
				.set("ai", button => {
					const card = button.link;
					if (get.position(card) == "j") return 10;
					return 6 - get.value(card);
				})
				.set("filterButton", button => {
					const card = button.link,
						player = get.player();
					return !get.tag(card, "damage") && player.canRecast(card);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			await player.recast(event.cards);
			const cards = player
				.getHistory("gain", evt => evt.getParent(3) == event)
				.reduce((list, evt) => {
					list.addArray(evt.cards);
					return list;
				}, []);
			let num = Math.min(cards.length, game.countPlayer()),
				list = [];
			if (!num) return;
			if (_status.connectMode) game.broadcastAll(() => (_status.noclearcountdown = true));
			while (num - list.length > 0 && cards.some(i => get.owner(i) == player && get.position(i) == "h" && !i.hasGaintag("olsujian_given"))) {
				const result = await player
					.chooseCardTarget({
						prompt: "筏铸：将以此法获得的牌交给任意角色各一张",
						position: "he",
						animate: false,
						filterCard(card, player) {
							if (!get.event("cards").includes(card)) return false;
							return !get.event("list").some(list => list[1] == card);
						},
						filterTarget(card, player, target) {
							return !get.event("list").some(list => list[0] == target);
						},
						ai1(card) {
							if (card.name == "sha") return 2.5;
							return 1 + Math.random();
						},
						ai2(target) {
							return get.attitude(get.event("player"), target);
						},
					})
					.set("forced", !list.length)
					.set("list", list)
					.set("cards", cards)
					.forResult();
				if (result.bool) {
					list.push([result.targets[0], result.cards[0]]);
					player.addGaintag(result.cards, "olsujian_given");
				} else break;
			}
			if (_status.connectMode) {
				game.broadcastAll(() => {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			if (list.length) {
				const targets = list.slice().map(list => list[0]);
				await game
					.loseAsync({
						gain_list: list,
						player: player,
						cards: list.slice().map(list => list[1]),
						giver: player,
						animate: "giveAuto",
					})
					.setContent("gaincardMultiple");
				for (const target of targets) {
					await target
						.chooseToUse(function (card, player, event) {
							if (get.name(card) != "sha") return false;
							return lib.filter.cardEnabled.apply(this, arguments);
						})
						.set("openskilldialog", "筏铸：是否使用一张【杀】（无距离限制）？")
						.set("norestore", true)
						.set("custom", {
							add: {},
							replace: { window: function () {} },
						})
						.set("targetRequired", true)
						.set("complexSelect", true)
						.set("filterTarget", function (card, player, target) {
							return lib.filter.targetEnabled.apply(this, arguments);
						})
						.set("addCount", false);
				}
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (!card || get.type(card) != "delay") return;
					if (!get.tag(card, "damage") && target.canRecast(card)) return "zeroplayertarget";
				},
			},
		},
	},
	//一将2023
	//孙礼
	kangli: {
		audio: 2,
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		forced: true,
		locked: false,
		content: function () {
			player.draw(2).gaintag = ["kangli"];
			player.when({ source: "damageBegin1" }).then(() => {
				var cards = player.getCards("h", card => card.hasGaintag("kangli") && lib.filter.cardDiscardable(card, player, "kangli"));
				if (cards.length) player.discard(cards);
			});
		},
		ai: {
			maixie: true,
		},
	},
	//夏侯楙
	tongwei: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return player.countCards("he", card => lib.skill.tongwei.filterCard(card, player)) > 1 && game.hasPlayer(i => i != player);
		},
		filterTarget: lib.filter.notMe,
		filterCard: lib.filter.cardRecastable,
		selectCard: 2,
		position: "he",
		discard: false,
		lose: false,
		delay: false,
		popname: true,
		check: function (card) {
			var num = 6.5;
			if (ui.selected.cards.length) {
				var cardx = ui.selected.cards[0];
				num = get.number(cardx);
			}
			var del = Math.abs(get.number(card) - num);
			return 5 + del / 5 - get.value(card);
		},
		content: function () {
			"step 0";
			player.recast(cards);
			"step 1";
			var numbers = cards.map(c => get.number(c, player)).sort((a, b) => a - b);
			target.when("useCard1").then(() => {
				trigger._tongwei_checked = true;
			});
			target
				.when("useCardAfter")
				.assign({
					numbers: numbers,
					playerx: player,
					mod: {
						aiOrder: function (player, card, num) {
							var number = get.number(card);
							if (typeof number != "number" || number <= numbers[0] || number >= numbers[1]) return num + 10;
						},
					},
				})
				.filter((event, player) => {
					return event._tongwei_checked;
				})
				.then(() => {
					var number = get.number(trigger.card);
					var numbers = get.info(event.name).numbers;
					event.playerx = get.info(event.name).playerx;
					if (typeof number != "number" || number <= numbers[0] || number >= numbers[1]) event.finish();
				})
				.then(() => {
					var playerx = event.playerx;
					var names = ["sha", "guohe"].filter(name => playerx.canUse({ name: name, isCard: true }, player, false));
					if (!names.length) event.finish();
					else if (names.length == 1) event._result = { links: [[null, null, names[0]]] };
					else
						playerx
							.chooseButton([`请选择要视为对${get.translation(player)}使用的牌`, [names, "vcard"]], true)
							.set("ai", button => {
								return button.link[0][2] == _status.event.choice;
							})
							.set(
								"choice",
								(function () {
									var list = names
										.map(name => {
											return [name, get.effect(player, { name: name, isCard: true }, playerx, playerx)];
										})
										.sort((a, b) => {
											return b[1] - a[1];
										});
									return list[0][0];
								})()
							);
				})
				.then(() => {
					var name = result.links[0][2];
					var card = { name: name, isCard: true },
						playerx = event.playerx;
					if (playerx.canUse(card, player, false)) playerx.useCard(card, player, "tongwei");
				});
		},
		ai: {
			expose: 0.2,
			order: 7,
			threaten: 2.2,
			result: {
				target: -1,
			},
		},
	},
	cuguo: {
		audio: 2,
		trigger: { player: ["shaMiss", "eventNeutralized"] },
		filter: function (event, player) {
			if (event.type != "card" && event.name != "_wuxie") return false;
			if (
				!event.target ||
				!event.target.isIn() ||
				!player.canUse(
					{
						name: event.card.name,
						nature: event.card.nature,
						isCard: true,
					},
					event.target,
					false
				)
			)
				return false;
			if (!player.hasCard(card => lib.filter.cardDiscardable(card, player), "he")) return false;
			var history = game.getGlobalHistory("everything");
			for (var evt of history) {
				if (evt._neutralized || (evt.responded && (!evt.result || !evt.result.bool))) {
					var evtx = evt.getParent();
					return evtx.name == "useCard" && evtx.player == player && evt == event;
				}
			}
			return false;
		},
		forced: true,
		direct: true,
		content: function () {
			"step 0";
			var card = {
				name: trigger.card.name,
				nature: trigger.card.nature,
				isCard: true,
				storage: { cuguo: true },
			};
			event.card = card;
			player.chooseToDiscard("蹙国：请弃置一张牌", `视为你对${get.translation(trigger.target)}使用一张${get.translation(card.nature || "")}【${get.translation(card.name)}】`, "he", true).set("logSkill", ["cuguo", trigger.target]);
			"step 1";
			if (player.canUse(card, trigger.target, false)) {
				player.useCard(card, trigger.target);
				player
					.when("useCardAfter")
					.filter(event => {
						return event.card.storage && event.card.storage.cuguo;
					})
					.then(() => {
						if (
							game.hasGlobalHistory("everything", evt => {
								if (evt._neutralized || (evt.responded && (!evt.result || !evt.result.bool))) {
									if (evt.getParent() == trigger) return true;
								}
								return false;
							})
						) {
							player.loseHp();
						}
					});
			}
		},
	},
	//陈式
	qingbei: {
		audio: 2,
		trigger: { global: "roundStart" },
		direct: true,
		content: function () {
			"step 0";
			var next = player.chooseButton(['###擎北：是否选择任意种花色？###<div class="text center">你不能于本轮使用这些花色，且使用牌后摸等同于选择花色数的牌</div>', [lib.suit.map(i => ["", "", "lukai_" + i]), "vcard"]], [1, 4]);
			next.set("ai", button => {
				var player = _status.event.player;
				var suit = button.link[2].slice(6);
				var val = player
					.getCards("hs", { suit: suit })
					.map(card => {
						return get.value(card) + player.getUseValue(card) / 3;
					})
					.reduce((p, c) => {
						return p + c;
					}, 0);
				if (val > 10 && ui.selected.buttons.length > 0) return -1;
				if (val > 6 && ui.selected.buttons.length == 2) return -1;
				if (ui.selected.buttons.length == 3) return -1;
				return 1 + 1 / val;
			});
			"step 1";
			if (result.bool) {
				var suits = result.links.map(i => i[2].slice(6));
				player.logSkill("qingbei");
				player.addTempSkill("qingbei_effect", "roundStart");
				player.setStorage("qingbei_effect", suits);
				player.markSkill("qingbei_effect");
			}
		},
		ai: {
			threaten: 2.3,
		},
		subSkill: {
			effect: {
				audio: "qingbei",
				trigger: { player: "useCardAfter" },
				charlotte: true,
				onremove: true,
				forced: true,
				filter: function (event, player) {
					if (!lib.suit.includes(get.suit(event.card))) return false;
					return player.getStorage("qingbei_effect").length;
				},
				content: function () {
					player.draw(player.getStorage("qingbei_effect").length);
				},
				mark: true,
				intro: {
					content: storage => `本轮内不能使用${get.translation(storage)}花色的牌，且使用一张有花色的牌后摸${get.cnNumber(storage.length)}张牌`,
				},
				mod: {
					cardEnabled: function (card, player) {
						if (player.getStorage("qingbei_effect").includes(get.suit(card))) return false;
					},
					cardSavable: function (card, player) {
						if (player.getStorage("qingbei_effect").includes(get.suit(card))) return false;
					},
				},
			},
		},
	},
	//费曜
	zhenfeng: {
		audio: 2,
		trigger: { global: "useCard" },
		usable: 1,
		filter: function (event, player) {
			return event.player != player && event.player == _status.currentPhase && event.player.countCards("h") <= event.player.getHp();
		},
		check: function (event, player) {
			var type = get.type2(event.card, event.player);
			if (type == "equip" && event.player.hasCard(card => event.player.hasValueTarget(card))) return false;
			if (get.attitude(player, event.player) > 0 && event.player.getHp() + event.player.countCards("hs", ["shan", "caochuan"]) <= 3) return false;
			return true;
		},
		onremove: true,
		logTarget: "player",
		content: function () {
			"step 0";
			var choices = Array.from({ length: trigger.player.countCards("h") + 1 }).map((_, i) => get.cnNumber(i, true));
			var type = get.type2(trigger.card, trigger.player);
			player
				.chooseControl(choices)
				.set("prompt", "镇锋：猜测其手牌中的" + get.translation(type) + "牌数")
				.set("ai", () => {
					return _status.event.choice;
				})
				.set(
					"choice",
					(function () {
						var num = trigger.player.countCards("h", card => get.type2(card) == type);
						var knownNum = trigger.player.countKnownCards(_status.event.player, card => get.type2(card) == type);
						if (trigger.player.isAllCardsKnown(_status.event.player)) {
							return knownNum;
						}
						var restNum = num - knownNum;
						var numx;
						if (type == "basic") numx = num + Math.floor(Math.random() * restNum + 1);
						else if (type == "trick") {
							if (num > 2) numx = 2;
							else numx = 1;
							if (Math.random() < 0.5) {
								numx += Math.random() > 0.5 ? 1 : -1;
							}
						} else {
							numx = [0, 1].randomGet();
						}
						if (numx < knownNum) numx = knownNum;
						else if (numx >= choices.length) numx = choices.length - 1;
						return numx;
					})()
				);
			"step 1";
			var type = get.type2(trigger.card, trigger.player);
			var guessedNum = result.index;
			player.chat("我猜" + get.cnNumber(guessedNum) + "张");
			game.log(player, "猜测", trigger.player, "有", get.cnNumber(guessedNum) + "张" + get.translation(type) + "牌");
			event.guessedNum = guessedNum;
			game.delay();
			"step 2";
			var type = get.type2(trigger.card, trigger.player);
			var count = trigger.player.countCards("h", card => get.type2(card) == type);
			var guessedNum = event.guessedNum;
			if (count == guessedNum) {
				player.popup("洗具");
				game.log(player, "猜测", "#g正确");
				if (player.countMark("zhenfeng") < 5) player.addMark("zhenfeng", 1, false);
				player.draw(player.countMark("zhenfeng"));
				if (player.canUse("sha", trigger.player, false)) player.useCard({ name: "sha", isCard: true }, trigger.player);
			} else {
				player.popup("杯具");
				game.log(player, "猜测", "#y错误");
				player.clearMark("zhenfeng");
				if (Math.abs(count - guessedNum) > 1 && trigger.player.canUse("sha", player, false)) {
					trigger.player.useCard({ name: "sha", isCard: true }, player, false, "noai");
				}
			}
		},
		intro: {
			content: "已连续猜对#次",
		},
	},
	//新杀小加强 李严
	dcduliang: {
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return player != target && target.countCards("he") > 0;
		},
		audio: "duliang",
		content: function () {
			"step 0";
			player.gainPlayerCard(target, "he", true);
			"step 1";
			var name = get.translation(target);
			player
				.chooseControl(function () {
					return Math.random() < 0.5 ? "选项一" : "选项二";
				})
				.set("prompt", "督粮：请选择一项")
				.set("choiceList", ["你观看牌堆顶的两张牌，然后令" + name + "获得其中的一或两张基本牌", "令" + name + "于下回合的摸牌阶段额外摸一张牌"]);
			"step 2";
			if (result.control == "选项一") {
				var cards = get.cards(2),
					bool = false;
				event.cards = cards;
				game.cardsGotoOrdering(cards);
				for (var card of cards) {
					if (get.type(card) == "basic") {
						bool = true;
						break;
					}
				}
				player
					.chooseButton(["督粮：选择令" + get.translation(target) + "获得的牌", cards], [1, 2], bool)
					.set("filterButton", button => {
						return get.type(button.link) == "basic";
					})
					.set("ai", button => {
						return _status.event.sgn * get.value(button.link);
					})
					.set("sgn", get.sgnAttitude(player, target) > 0);
			} else {
				target.addTempSkill("dcduliang2", { player: "phaseAfter" });
				target.addMark("dcduliang2", 1, false);
				event.finish();
			}
			"step 3";
			if (result.bool) {
				var cardsx = result.links;
				target.gain(cardsx, "draw");
				game.log(target, "获得了" + get.cnNumber(cardsx.length) + "张牌");
				cards.removeArray(cardsx);
				cards.reverse();
			}
			for (var i = 0; i < cards.length; i++) {
				ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
			}
			game.updateRoundNumber();
		},
		ai: {
			order: 4,
			result: {
				target: -1,
				player: 0.1,
			},
		},
	},
	dcduliang2: {
		trigger: { player: "phaseDrawBegin" },
		forced: true,
		mark: true,
		audio: false,
		onremove: true,
		charlotte: true,
		intro: {
			content: "下回合的摸牌阶段额外摸#张牌",
		},
		sourceSkill: "dcduliang",
		content: function () {
			trigger.num += player.countMark("dcduliang2");
		},
	},
	//苏飞
	shuojian: {
		audio: 2,
		enable: "phaseUse",
		usable: 3,
		filterTarget: lib.filter.notMe,
		filterCard: true,
		position: "he",
		discard: false,
		lose: false,
		delay: false,
		check: function (card, player) {
			return 6 - get.value(card);
		},
		content: function () {
			"step 0";
			player.give(cards, target);
			"step 1";
			var num = 3 - get.skillCount("shuojian") + 1;
			event.num = num;
			event.num2 = num;
			if (event.num == 0) event.finish();
			"step 2";
			var forced = num != event.num2;
			var prompt = "###" + get.translation(player) + "对你发动了【数谏】###视为使用" + get.cnNumber(num) + "张【过河拆桥】" + (forced ? "" : "且" + get.translation(player) + "此技能本回合失效，或点击“取消”令其摸" + get.cnNumber(num) + "张牌");
			if (!target.hasUseTarget({ name: "guohe" })) event._result = { bool: false };
			else
				target
					.chooseUseTarget(prompt, "guohe", forced)
					.set("ai", function () {
						var evt = _status.event;
						if (evt.name == "chooseTarget") evt = evt.getParent();
						if (!evt.goon) return 0;
						return get.effect_use.apply(this, arguments);
					})
					.set("goon", target.getUseValue({ name: "guohe" }) > (get.sgnAttitude(target, player) * player.getUseValue({ name: "wuzhong" })) / (2 - num * 0.4));
			"step 3";
			if (!result.bool) {
				player.draw(num);
				if (num > 1) player.chooseToDiscard("he", num - 1, true);
				event.finish();
			}
			"step 4";
			if (--event.num2 > 0) {
				event.goto(2);
			} else player.tempBanSkill("shuojian");
		},
		ai: {
			expose: 0.15,
			order: 8,
			result: { target: 1 },
		},
	},
	//谯周
	shiming: {
		audio: 2,
		trigger: { global: "phaseDrawBegin1" },
		filter: function (event, player) {
			return !player.hasSkill("shiming_round");
		},
		check: function (event, player) {
			return true; //get.attitude(player,event.player)<0||get.damageEffect(event.player,event.player,player)>0;
		},
		logTarget: "player",
		content: function () {
			"step 0";
			player.addTempSkill("shiming_round", "roundStart");
			var cards = get.cards(3);
			player
				.chooseButton(["识命：是否将其中一张置于牌堆底？", cards.slice(0)])
				.set("ai", button => {
					var att = _status.event.att,
						damage = _status.event.damage,
						val = get.value(button.link, _status.event.player);
					if ((att > 0 && damage < 0) || (att <= 0 && damage > 0)) return 6 - val;
					return val - 5.99;
				})
				.set("att", get.attitude(player, trigger.player))
				.set("damage", get.damageEffect(trigger.player, trigger.player, player) > 0 && trigger.player.hp <= 3 ? 1 : -1);
			while (cards.length) ui.cardPile.insertBefore(cards.pop(), ui.cardPile.firstChild);
			"step 1";
			if (result.bool) {
				var card = result.links[0];
				card.fix();
				ui.cardPile.appendChild(card);
				player.popup("一下", "wood");
				game.log(player, "将一张牌置于了牌堆底");
			}
			"step 2";
			trigger.player
				.chooseBool("是否跳过摸牌阶段并对自己造成1点伤害，然后从牌堆底摸三张牌？")
				.set("ai", () => _status.event.bool)
				.set("bool", get.damageEffect(trigger.player, trigger.player) >= -6 || trigger.player.hp > 3);
			"step 3";
			if (result.bool) {
				trigger.cancel();
				trigger.player.damage(trigger.player);
			} else event.finish();
			"step 4";
			trigger.player.draw(3, "bottom");
		},
		subSkill: {
			round: {
				mark: true,
				intro: { content: "本轮已发动〖识命〗" },
			},
		},
	},
	jiangxi: {
		audio: 2,
		trigger: { global: "phaseEnd" },
		filter: function (event, player) {
			var zhu = game.findPlayer(i => i.getSeatNum() == 1);
			return (
				(zhu &&
					player.hasSkill("shiming_round") &&
					(game.getGlobalHistory("changeHp", evt => {
						return evt.player == zhu && evt._dyinged;
					}).length > 0 ||
						zhu.getHistory("damage").length == 0)) ||
				!game.hasPlayer2(current => current.getHistory("damage").length > 0)
			);
		},
		direct: true,
		seatRelated: true,
		content: function () {
			"step 0";
			var zhu = game.findPlayer(i => i.getSeatNum() == 1);
			if (zhu && player.hasSkill("shiming_round")) {
				if (
					game.getGlobalHistory("changeHp", evt => {
						return evt.player == zhu && evt._dyinged;
					}).length > 0 ||
					zhu.getHistory("damage").length == 0
				) {
					player.chooseBool(get.prompt("jiangxi"), "重置〖识命〗");
				}
			} else event.goto(2);
			"step 1";
			if (result.bool) {
				player.logSkill("jiangxi");
				event.logged = true;
				player.removeSkill("shiming_round");
				player.draw();
			}
			"step 2";
			if (!game.hasPlayer2(current => current.getHistory("damage").length > 0)) {
				player
					.chooseBool(get.prompt("jiangxi"), "与" + get.translation(trigger.player) + "各摸一张牌")
					.set("ai", () => _status.event.bool)
					.set("bool", trigger.player.getUseValue({ name: "wuzhong" }) + player.getUseValue({ name: "wuzhong" }) > 0);
			} else event.finish();
			"step 3";
			if (result.bool) {
				if (!event.logged) player.logSkill("jiangxi");
				trigger.player.draw("nodelay");
				player.draw();
			}
		},
	},
	//韩龙
	duwang: {
		audio: 2,
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		content: function () {
			var cards = [];
			for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
				var card = ui.cardPile.childNodes[i];
				if (card.name != "sha") cards.push(card);
				if (cards.length >= 5) break;
			}
			if (cards.length) player.addToExpansion(cards, "gain2").gaintag.add("duwang");
		},
		marktext: "刺",
		intro: {
			name: "刺",
			name2: "刺",
			content: "expansion",
			markcount: "expansion",
		},
		mod: {
			globalFrom: function (from, to, distance) {
				return distance + Math.min(1, from.getExpansions("duwang").filter(i => i.name != "sha").length);
			},
			globalTo: function (from, to, distance) {
				return distance + Math.min(1, to.getExpansions("duwang").filter(i => i.name != "sha").length);
			},
		},
	},
	cibei: {
		audio: 2,
		trigger: { global: "cardsDiscardAfter" },
		filter: function (event, player) {
			if (!player.getExpansions("duwang").filter(i => i.name != "sha").length) return false;
			var evt = event.getParent();
			if (evt.name != "orderingDiscard") return false;
			var evtx = evt.relatedEvent || evt.getParent();
			return (
				evtx.name == "useCard" &&
				evtx.card.name == "sha" &&
				evtx.card.isCard &&
				event.cards.filterInD("d").length &&
				game.hasPlayer2(current =>
					current.hasHistory("sourceDamage", evtxx => {
						return evtxx.card == evtx.card;
					})
				)
			);
		},
		direct: true,
		group: "cibei_fullyReady",
		content: function () {
			"step 0";
			player.chooseButton(["###" + get.prompt(event.name) + '###<div class="text center">将一张“刺”置入弃牌堆，并将' + get.translation(trigger.cards.filterInD("d")) + "置入“刺”</div>", player.getExpansions("duwang")]).set("filterButton", button => {
				return button.link.name != "sha";
			});
			"step 1";
			if (result.bool) {
				player.logSkill(event.name);
				player.loseToDiscardpile(result.links);
				player.addToExpansion(trigger.cards.filterInD("d"), "gain2").gaintag.add("duwang");
				if (game.hasPlayer(current => current.countDiscardableCards(player, "hej") > 0))
					player
						.chooseTarget("刺北：弃置一名角色区域内的一张牌", true, (card, player, target) => {
							return target.countDiscardableCards(player, "hej") > 0;
						})
						.set("ai", target => {
							return get.effect(target, { name: "guohe" }, _status.event.player);
						});
			} else event.finish();
			"step 2";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target);
				player.discardPlayerCard(target, "hej", true);
				player.addExpose(0.1);
			}
		},
		ai: {
			combo: "duwang",
		},
		subSkill: {
			fullyReady: {
				trigger: { global: "phaseEnd" },
				forced: true,
				locked: false,
				filter: function (event, player) {
					var storage = player.getExpansions("duwang");
					return storage.length > 0 && storage.every(i => i.name == "sha");
				},
				content: function () {
					player.gain(player.getExpansions("duwang"), "gain2").gaintag.add("cibei_mark");
					player.addSkill("cibei_mark");
				},
			},
			mark: {
				trigger: { player: "useCard1" },
				onremove: true,
				charlotte: true,
				silent: true,
				firstDo: true,
				filter: function (event, player) {
					return player.hasHistory("lose", evt => {
						if (evt.getParent() != event) return false;
						for (var i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("cibei_mark")) return true;
						}
						return false;
					});
				},
				content: function () {
					if (trigger.addCount !== false) {
						trigger.addCount = false;
						var stat = player.getStat().card,
							name = trigger.card.name;
						if (typeof stat[name] == "number") stat[name]--;
					}
				},
				mod: {
					ignoredHandcard: function (card, player) {
						if (card.hasGaintag("cibei_mark")) return true;
					},
					cardDiscardable: function (card, player, name) {
						if (card.hasGaintag("cibei_mark")) return false;
					},
					canBeDiscarded: function (card) {
						if (card.hasGaintag("cibei_mark")) return false;
					},
					targetInRange: function (card, player, target) {
						if (!card.cards) return;
						for (var i of card.cards) {
							if (i.hasGaintag("cibei_mark")) return true;
						}
					},
					cardUsable: function (card, player) {
						if (!card.cards) return;
						for (var i of card.cards) {
							if (i.hasGaintag("cibei_mark")) return true;
						}
					},
				},
			},
		},
	},
	//武安国
	diezhang: {
		audio: 2,
		locked: false,
		zhuanhuanji: function (player, skill) {
			if (!player.storage.duanwan) player.storage[skill] = !player.storage[skill];
		},
		trigger: { global: ["eventNeutralized", "shaMiss"] },
		filter: function (event, player) {
			if (player.hasSkill("diezhang_used")) return false;
			if (event.type != "card") return false;
			var evt = event._neutralize_event;
			var user, responder;
			if (event.name == "sha") {
				user = event.player;
				responder = event.target;
			} else {
				if (evt.type != "card") return false;
				user = event.player;
				responder = evt.player;
			}
			if (!player.storage.diezhang) {
				if (user != player || responder == player) return false;
				return player.countDiscardableCards(player, "he") > 0 && player.canUse("sha", responder, false);
			} else {
				if (user == player || responder != player) return false;
				return player.canUse("sha", user, false);
			}
		},
		direct: true,
		content: function () {
			"step 0";
			var evt = trigger._neutralize_event;
			var user, responder;
			if (trigger.name == "sha") {
				user = trigger.player;
				responder = trigger.target;
			} else {
				user = trigger.player;
				responder = evt.player;
			}
			var num = player.storage.duanwan ? 2 : 1;
			event.num = num;
			if (!player.storage.diezhang) {
				var target = responder;
				event.target = target;
				var next = player
					.chooseToDiscard(get.prompt("diezhang", target), "弃置一张牌，视为对其使用" + get.cnNumber(num) + "张【杀】", "he")
					.set("ai", card => {
						if (_status.event.goon) return 6 - get.value(card);
						return 0;
					})
					.set("logSkill", ["diezhang", target]);
			} else {
				var target = user;
				event.target = target;
				var next = player.chooseBool(get.prompt("diezhang", target), "摸" + get.cnNumber(num) + "张牌，视为对其使用一张【杀】").set("ai", () => _status.event.goon);
			}
			next.set("goon", get.effect(target, { name: "sha" }, player, player) > 0);
			"step 1";
			if (result.bool) {
				if (player.storage.duanwan) player.addTempSkill("diezhang_used");
				player.changeZhuanhuanji("diezhang");
				if (!result.cards || !result.cards.length) {
					player.logSkill("diezhang", target);
					player.draw(num, "nodelay");
					player.useCard({ name: "sha", isCard: true }, target, false);
				} else while (num--) player.useCard({ name: "sha", isCard: true }, target, false);
			}
		},
		marktext: "☯",
		mark: true,
		intro: {
			content: function (storage, player) {
				var cnNum = get.cnNumber(player.storage.duanwan ? 2 : 1);
				if (storage) return "当其他角色使用牌被你抵消后，你可以摸" + cnNum + "张牌，视为对其使用一张【杀】。";
				return "当你使用牌被其他角色抵消后，你可以弃置一张牌，视为对其使用" + cnNum + "张【杀】。";
			},
		},
		mod: {
			cardUsable: function (card, player, num) {
				if (!player.storage.duanwan && card.name == "sha") return num + 1;
			},
		},
		subSkill: { used: { charlotte: true } },
	},
	duanwan: {
		audio: 2,
		enable: "chooseToUse",
		skillAnimation: true,
		animationColor: "soil",
		limited: true,
		filter: function (event, player) {
			return event.type == "dying" && player == event.dying;
		},
		content: function () {
			player.changeZhuanhuanji("diezhang");
			player.awakenSkill("duanwan");
			var num = 2 - player.hp;
			if (num > 0) player.recover(num);
		},
		ai: {
			save: true,
			skillTagFilter: function (player, tag, target) {
				return player == target;
			},
			result: { player: 1 },
		},
	},
	//李婉
	liandui: {
		audio: 2,
		trigger: { global: "useCard" },
		filter: function (event, player) {
			const history = game.getAllGlobalHistory("useCard");
			const index = history.indexOf(event);
			if (index <= 0) return false;
			const previous = history[index - 1].player;
			if (event.player == player && previous != player && previous.isIn()) return true;
			if (event.player != player && previous == player) return true;
			return false;
		},
		async cost(event, trigger, player) {
			if (!trigger.player) return;
			const history = game.getAllGlobalHistory("useCard");
			const index = history.indexOf(trigger);
			const previous = history[index - 1].player;
			const { result } = await trigger.player
				.chooseBool("是否对" + get.translation(previous) + "发动【联对】？", "令" + get.translation(previous) + "摸两张牌")
				.set("ai", () => _status.event.bool)
				.set("bool", get.effect(previous, { name: "draw" }, trigger.player, trigger.player) > 0);
			if (result.bool) event.result = { bool: true, cost_data: previous };
		},
		async content(event, trigger, player) {
			const { cost_data: previous } = event;
			previous.draw(2);
		},
	},
	biejun: {
		audio: 2,
		global: "biejun_give",
		trigger: { player: "damageBegin4" },
		filter: function (event, player) {
			return (
				!player.hasSkill("biejun_used") &&
				player.countCards("h", card => {
					return card.hasGaintag("biejun");
				}) == 0
			);
		},
		prompt2: "翻面并防止此伤害",
		check: function (event, player) {
			return player.isTurnedOver() || event.num >= player.hp || get.distance(_status.currentPhase, player, "absolute") >= 3;
		},
		content: function () {
			player.addTempSkill("biejun_used");
			player.turnOver();
			trigger.cancel();
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
					if (get.tag(card, "damage")) {
						if (player.getNext() == target && lib.skill.biejun.filter(null, target) && target.isTurnedOver()) return [0, 1];
					}
				},
			},
		},
		subSkill: {
			used: { charlotte: true },
			give: {
				audio: 2,
				enable: "phaseUse",
				usable: 1,
				filter: function (event, player) {
					if (!player.countCards("h")) return false;
					var targets = game.filterPlayer(function (current) {
						return current != player && current.hasSkill("biejun");
					});
					if (!targets.length) return false;
					return true;
				},
				selectCard: 1,
				filterCard: true,
				filterTarget: function (card, player, target) {
					return target.hasSkill("biejun");
				},
				selectTarget: function () {
					var player = _status.event.player;
					var targets = game.filterPlayer(function (current) {
						return current != player && current.hasSkill("biejun");
					});
					return targets.length > 1 ? 1 : -1;
				},
				complexSelect: true,
				prompt: function () {
					var player = _status.event.player;
					var targets = game.filterPlayer(function (current) {
						return current != player && current.hasSkill("biejun");
					});
					return "将一张手牌交给" + get.translation(targets) + (targets.length > 1 ? "中的一人" : "");
				},
				position: "h",
				discard: false,
				lose: false,
				delay: false,
				check: function (card) {
					var player = _status.event.player;
					if (
						game.hasPlayer(function (current) {
							return lib.skill.biejun_give.filterTarget(null, player, current) && get.attitude(player, current) > 0;
						})
					) {
						return 5 - get.value(card);
					}
					return -get.value(card);
				},
				content: function () {
					game.trySkillAudio("biejun", target);
					player.give(cards, target).gaintag.add("biejun");
					target.addTempSkill("biejun_tag");
				},
				ai: {
					order: 2,
					result: { target: 1 },
				},
			},
			tag: {
				charlotte: true,
				forced: true,
				onremove: function (player) {
					player.removeGaintag("biejun");
				},
			},
		},
	},
	//诸葛尚
	sangu: {
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		getEffect: function (player, target, event, list1, list2) {
			let att = get.attitude(player, target);
			if (att === 0) return 0;
			let getv = function (name, player, arg) {
				let v = event.getTempCache("sangu", player.playerid + name);
				if (typeof v === "number") return v;
				v = player.getUseValue({ name: name, storage: { sangu: true } }, arg);
				event.putTempCache("sangu", player.playerid + name, v);
				return v;
			};
			if (att < 0) {
				for (let i of list1) {
					if (getv(i, target) <= 0 || getv(i, target) <= 0) return -att * Math.sqrt(get.threaten(target)) * 2;
				}
				return 0;
			} else {
				let list = list1.concat(player.hp > 1 ? list2 : []),
					eff = 0;
				list.sort(function (a, b) {
					return getv(b, target) - getv(a, target);
				});
				list = list.slice(3);
				for (let i of list) {
					let res = getv(i, target);
					if (res <= 5) break;
					else eff += res;
				}
				return Math.sqrt(eff / 1.5) * att;
			}
		},
		content: function () {
			"step 0";
			event.list1 = [];
			event.list2 = [];
			event.used = [];
			player.getHistory("useCard", function (evt) {
				event.used.add(evt.card.name);
			});
			for (let name of lib.inpile) {
				let add = false,
					type = get.type(name);
				if (name === "sha") add = true;
				else if (type === "trick") {
					let info = lib.card[name];
					if (info && !info.singleCard && !info.notarget) add = true;
				}
				if (!add) continue;
				if (event.used.includes(name)) event.list1.push(name);
				else event.list2.push(name);
			}
			if (!event.list1.length && !event.list2.length) event.finish();
			else
				player
					.chooseTarget(get.prompt2("sangu"), lib.filter.notMe)
					.set("ai", function (target) {
						return lib.skill.sangu.getEffect(_status.event.player, target, _status.event.getTrigger(), _status.event.list1, _status.event.list2);
					})
					.set("list1", event.list1)
					.set("list2", event.list2);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("sangu", target);
				event.target = target;
			} else event.finish();
			"step 2";
			var dialog = ["为" + get.translation(target) + "选择至多三个牌名"];
			if (event.list1.length) {
				dialog.push('<div class="text center">本回合已使用过的牌</div>');
				dialog.push([event.list1.map(i => [get.type(i), "", i]), "vcard"]);
			}
			if (event.list2.length) {
				dialog.push('<div class="text center">本回合未使用过的牌</div>');
				dialog.push([event.list2.map(i => [get.type(i), "", i]), "vcard"]);
			}
			player
				.chooseButton(dialog, true, [1, 3])
				.set("ai", function (button) {
					let name = button.link[2],
						list = _status.event.list,
						player = _status.event.player,
						target = _status.event.getParent().target,
						trigger = _status.event.getTrigger(),
						getv = (name, player) => {
							let v = trigger.getTempCache("sangu", player.playerid + name);
							if (typeof v === "number") return v;
							v = player.getUseValue({ name: name, storage: { sangu: true } });
							trigger.putTempCache("sangu", player.playerid + name, v);
							return v;
						};
					if (get.attitude(player, target) < 0) {
						if (!list.includes(name)) return 0;
						return -getv(name, target);
					} else {
						if (player.hp < 2 && !list.includes(name)) return 0;
						let val = getv(name, target),
							base = 5;
						val = Math.min(15, val - base);
						if (name === "wuzhong" || name === "dongzhuxianji") val += 15;
						else if (name === "shunshou") val += 6;
						return val;
					}
				})
				.set("list", event.list1);
			"step 3";
			if (result.bool) {
				var names = result.links.map(i => i[2]);
				if (!target.storage.sangu_effect) target.storage.sangu_effect = [];
				target.storage.sangu_effect = target.storage.sangu_effect.concat(names);
				game.log(player, "为", target, "选择了", "#y" + get.translation(names));
				target.addTempSkill("sangu_effect", { player: "phaseUseAfter" });
				target.markSkill("sangu_effect");
				var bool = true;
				for (var i of names) {
					if (!event.used.includes(i)) {
						bool = false;
						break;
					}
				}
				if (bool) {
					target.addTempSkill("sangu_prevent", { player: "phaseUseAfter" });
					target.markAuto("sangu_prevent", [player]);
				}
			}
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "damage") && card.storage && card.storage.sangu) return "zeroplayertarget";
				},
			},
		},
		subSkill: {
			effect: {
				trigger: { player: "phaseUseBegin" },
				charlotte: true,
				forced: true,
				popup: false,
				content: function () {
					player.addTempSkill("sangu_viewas");
				},
				onremove: true,
				intro: {
					mark: function (dialog, storage, player) {
						if (!storage || !storage.length) return "当前无可用牌";
						dialog.add([[storage[0]], "vcard"]);
						if (storage.length > 1) dialog.addSmall([storage.slice(1), "vcard"]);
					},
					content: "$",
				},
			},
			viewas: {
				mod: {
					hiddenCard: function (player, name) {
						var storage = player.getStorage("sangu_effect");
						if (storage.length) return name == storage[0];
					},
					cardname: function (card, player) {
						if (_status.event.name != "chooseToUse" || _status.event.skill) return;
						var storage = player.getStorage("sangu_effect");
						if (storage.length) return storage[0];
					},
					cardnature: function (card, player) {
						if (_status.event.name != "chooseToUse" || _status.event.skill) return;
						var storage = player.getStorage("sangu_effect");
						if (storage.length) return false;
					},
				},
				trigger: { player: ["useCard", "respond"] },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return event.cards.length > 0 && player.getStorage("sangu_effect").length > 0;
				},
				content: function () {
					if (!trigger.card.storage) trigger.card.storage = {};
					trigger.card.storage.sangu = true;
					player.unmarkAuto("sangu_effect", [player.getStorage("sangu_effect")[0]]);
				},
			},
			prevent: {
				trigger: { source: "damageBegin2" },
				forced: true,
				charlotte: true,
				onremove: true,
				filter: function (event, player) {
					return event.card && event.card.storage && event.card.storage.sangu && player.getStorage("sangu_prevent").includes(event.player);
				},
				content: function () {
					trigger.cancel();
				},
			},
		},
	},
	yizu: {
		audio: 2,
		trigger: { target: "useCardToTargeted" },
		forced: true,
		usable: 1,
		filter: function (event, player) {
			return player.isDamaged() && player.hp <= event.player.hp && (event.card.name == "sha" || event.card.name == "juedou");
		},
		content: function () {
			player.recover();
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (target.isHealthy() || (card.name != "sha" && card.name != "juedou")) return;
					if (target.storage.counttrigger && target.storage.counttrigger.yizu && current < 0) return 5;
					if (player.hp < target.hp) return;
					if (current > 0) return 1.2;
					if (get.attitude(player, target) >= 0) return;
					var copy = get.effect(target, { name: "shacopy" }, player, player);
					if (
						copy > 0 &&
						player.isPhaseUsing() &&
						Math.min(
							player.getCardUsable("sha"),
							player.countCards("hs", function (card) {
								return get.name(card) == "sha" && player.canUse(card, target, null, true);
							})
						) >= 2
					)
						return;
					return [0, 2];
				},
			},
		},
	},
	//轲比能
	kousheng: {
		audio: 2,
		trigger: { player: "phaseUseBegin" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		content: function () {
			"step 0";
			player
				.chooseCard("h", [1, player.countCards("h")], get.prompt("kousheng"), "你可以选择任意张手牌，这些手牌于本回合内视为无次数限制的【杀】。但当有角色受到这些【杀】的伤害后，其可以用所有手牌交换剩余的牌。")
				.set("standard", player.getUseValue({ name: "sha" }, null, true))
				.set("ai", function (card) {
					var player = _status.event.player,
						standard = _status.event.standard;
					if (standard <= 0) return 0;
					var eff = player.getUseValue(card, null, true);
					if (eff <= standard) return standard - eff + 0.1;
					return 0;
				});
			"step 1";
			if (result.bool) {
				player.logSkill("kousheng");
				player.addGaintag(result.cards, "kousheng");
				player.addTempSkill("kousheng_effect");
				game.delayx();
			}
		},
		subSkill: {
			effect: {
				audio: "kousheng",
				trigger: { player: "useCard1" },
				forced: true,
				charlotte: true,
				firstDo: true,
				filter: function (event, player) {
					if (event.card.name != "sha") return false;
					return player.hasHistory("lose", function (evt) {
						if (evt.getParent() != event) return false;
						for (var i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("kousheng")) return true;
						}
						return false;
					});
				},
				content: function () {
					if (!trigger.card.storage) trigger.card.storage = {};
					trigger.card.storage.kousheng = true;
					if (trigger.addCount !== false) {
						trigger.addCount = false;
						player.getStat("card").sha--;
					}
				},
				onremove: function (player) {
					player.removeGaintag("kousheng");
				},
				mod: {
					cardUsable: function (card, player, target) {
						if (card.name != "sha" || !card.cards) return;
						for (var i of card.cards) {
							if (i.hasGaintag("kousheng")) return Infinity;
						}
					},
					cardname: function (card) {
						if (get.itemtype(card) == "card" && card.hasGaintag("kousheng")) return "sha";
					},
					cardnature: function (card) {
						if (get.itemtype(card) == "card" && card.hasGaintag("kousheng")) return false;
					},
				},
				group: "kousheng_damage",
			},
			damage: {
				audio: "kousheng",
				trigger: { source: "damageSource" },
				forced: true,
				filter: function (event, player) {
					if (!event.card || !event.card.storage || !event.card.storage.kousheng || event.getParent().type != "card") return false;
					var target = event.player;
					return (
						target.isIn() &&
						player.hasCard(function (card) {
							return card.hasGaintag("kousheng");
						}, "h")
					);
				},
				content: function () {
					"step 0";
					var target = trigger.player;
					event.target = target;
					var cards = player.getCards("h", function (card) {
						return card.hasGaintag("kousheng");
					});
					event.cards = cards;
					var str = get.translation(player);
					player.showCards(cards, str + "的【寇旌】牌");
					if (target.countCards("h") > 0)
						target.chooseBool("是否交换“寇旌”牌？", "用你的所有手牌交换" + str + "的下列“寇旌”牌：" + get.translation(cards)).set("ai", function () {
							var player = _status.event.player,
								target = _status.event.getParent().player;
							if (player.hasShan() || player.countCards("hs", { name: ["tao", "jiu"] }) > 0 || get.attitude(player, target) >= 0) return false;
							var hs1 = player.getCards("h"),
								hs2 = _status.event.getParent().cards;
							if (hs2.length >= player.hp) return true;
							if (get.value(hs1, player) >= get.value(hs2, target)) return false;
							return true;
						});
					else event.finish();
					"step 1";
					if (result.bool) {
						player.swapHandcards(target, cards, target.getCards("h"));
					}
				},
			},
		},
	},
	//陆凯
	lkbushi: {
		audio: 2,
		getBushi(player) {
			if (!player.storage.lkbushi) return ["spade", "heart", "club", "diamond"];
			return player.storage.lkbushi;
		},
		init(player, skill) {
			player.addTip(skill, get.translation(skill) + lib.skill.lkbushi.getBushi(player).reduce((str, i) => str + get.translation(i), ""));
		},
		onremove: true,
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		locked: false,
		content() {
			"step 0";
			var list = lib.skill.lkbushi.getBushi(player);
			list = list.map(function (i) {
				return ["", "", "lukai_" + i];
			});
			var next = player.chooseToMove("卜筮：是否调整〖卜筮〗的花色顺序？");
			next.set("list", [
				[
					"无次数限制/使用打出摸牌<br>可弃牌无效/结束阶段获得",
					[list, "vcard"],
					function (list) {
						var list2 = list.map(function (i) {
							return get.translation(i[2].slice(6));
						});
						return "你使用" + list2[0] + "牌时无次数限制；使用或打出" + list2[1] + "时，摸一张牌；<br>成为" + list2[2] + "牌目标后可弃一张牌无效；结束阶段获得一张" + list2[3] + "牌";
					},
				],
			]);
			next.set("processAI", function () {
				var player = _status.event.player;
				var list = lib.skill.lkbushi.getBushi(player);
				var list2 = [];
				var hs = player.getCards("hs", function (card) {
					return player.hasValueTarget(card);
				});
				list.sort(function (a, b) {
					return hs.filter(i => get.suit(i) == b).length - hs.filter(i => get.suit(i) == a).length;
				});
				list2.push(list.shift());
				hs = player.getCards("hs", "sha");
				list.sort(function (a, b) {
					return hs.filter(i => get.suit(i) == b).length - hs.filter(i => get.suit(i) == a).length;
				});
				list2.unshift(list.shift());
				list.randomSort();
				list2.addArray(list);
				return [list2.map(i => ["", "", "lukai_" + i])];
			});
			"step 1";
			if (result.bool) {
				var list = lib.skill.lkbushi.getBushi(player),
					list2 = result.moved[0].map(function (i) {
						return i[2].slice(6);
					});
				for (var i = 0; i < 4; i++) {
					if (list[i] != list2[i]) {
						player.logSkill("lkbushi");
						player.storage.lkbushi = list2;
						player.addTip("lkbushi", get.translation("lkbushi") + lib.skill.lkbushi.getBushi(player).reduce((str, i) => str + get.translation(i), ""));
						var str = "#g";
						for (var j = 0; j < 4; j++) {
							str += get.translation(list2[j]);
							if (j != 3) str += "/";
						}
						game.log(player, "将", "#g【卜筮】", "的花色序列改为", str);
						game.delayx();
						break;
					}
				}
			}
		},
		mark: true,
		marktext: "筮",
		intro: {
			content(storage, player) {
				var list = lib.skill.lkbushi.getBushi(player).map(i => get.translation(i));
				return "①你使用" + list[0] + "牌无次数限制。②当你使用或打出" + list[1] + "牌后，你摸一张牌。③当你成为" + list[2] + "牌的目标后，你可以弃置一张牌，令此牌对你无效。④结束阶段开始时，你从牌堆或弃牌堆获得一张" + list[3] + "牌。⑤准备阶段开始时，你可调整此技能中四种花色的对应顺序。";
			},
		},
		group: ["lkbushi_unlimit", "lkbushi_draw", "lkbushi_defend", "lkbushi_gain"],
		subSkill: {
			unlimit: {
				mod: {
					cardUsable(card, player) {
						const list = lib.skill.lkbushi.getBushi(player),
							suit = get.suit(card);
						if (suit === "unsure" || list[0] === suit) return Infinity;
					},
				},
				trigger: { player: "useCard1" },
				forced: true,
				popup: false,
				silent: true,
				firstDo: true,
				filter(event, player) {
					if (event.addCount === false) return true;
					var list = lib.skill.lkbushi.getBushi(player);
					return list[0] == get.suit(event.card);
				},
				content() {
					trigger.addCount = false;
					var stat = player.getStat().card,
						name = trigger.card.name;
					if (stat[name] && typeof stat[name] == "number") stat[name]--;
				},
			},
			draw: {
				audio: "lkbushi",
				trigger: { player: ["useCardAfter", "respondAfter"] },
				forced: true,
				locked: false,
				filter(event, player) {
					var list = lib.skill.lkbushi.getBushi(player);
					return list[1] == get.suit(event.card);
				},
				content() {
					player.draw();
				},
			},
			defend: {
				audio: "lkbushi",
				trigger: { target: "useCardToTargeted" },
				direct: true,
				filter(event, player) {
					var list = lib.skill.lkbushi.getBushi(player);
					return list[2] == get.suit(event.card) && !event.excluded.includes(player) && player.countCards("he") > 0;
				},
				content() {
					"step 0";
					player
						.chooseToDiscard("he", get.prompt("lkbushi"), "弃置一张牌，令" + get.translation(trigger.card) + "对你无效")
						.set("ai", function (card) {
							if (_status.event.eff >= 0) return false;
							return -_status.event.eff * 1.1 - get.value(card);
						})
						.set("eff", get.effect(player, trigger.card, trigger.player, player)).logSkill = ["lkbushi_defend", trigger.player];
					"step 1";
					if (result.bool) {
						trigger.excluded.add(player);
					}
				},
			},
			gain: {
				audio: "lkbushi",
				trigger: { player: "phaseJieshuBegin" },
				forced: true,
				locked: false,
				content() {
					var list = lib.skill.lkbushi.getBushi(player);
					var card = get.cardPile(function (card) {
						return get.suit(card, false) == list[3];
					});
					if (card) player.gain(card, "gain2");
				},
			},
		},
	},
	lkzhongzhuang: {
		audio: 2,
		trigger: { source: ["damageBegin1", "damageBegin4"] },
		forced: true,
		filter(event, player, name) {
			if (!event.card || event.card.name != "sha" || event.getParent().type != "card") return false;
			var range = player.getAttackRange();
			if (name == "damageBegin1") return range > 3;
			return range < 3 && event.num > 1;
		},
		content() {
			if (event.triggername == "damageBegin1") trigger.num++;
			else trigger.num = 1;
		},
		global: "lkzhongzhuang_ai",
		subSkill: {
			ai: {
				ai: {
					filterDamage: true,
					skillTagFilter(player, tag, arg) {
						if (arg && arg.card && arg.card.name == "sha") {
							if (arg.player && arg.player.hasSkill("lkzhongzhuang") && arg.player.getAttackRange() < 3) return true;
						}
						return false;
					},
				},
			},
		},
	},
	//将星独具
	xinzhilve: {
		enable: "phaseUse",
		audio: "zhilve",
		usable: 1,
		chooseButton: {
			dialog: function (event, player) {
				var list = ["移动场上的一张牌", "摸一张牌并视为使用一张【杀】"];
				var choiceList = ui.create.dialog("知略：失去1点体力并...", "forcebutton", "hidden");
				choiceList.add([
					list.map((item, i) => {
						return [i, item];
					}),
					"textbutton",
				]);
				return choiceList;
			},
			filter: function (button, player) {
				if (button.link == 0) return player.canMoveCard();
				return player.hasUseTarget({ name: "sha", isCard: true }, false);
			},
			check: function (button) {
				return button.link;
			},
			backup: function (links) {
				return lib.skill["xinzhilve_" + ["move", "use"][links[0]]];
			},
			prompt: function () {
				return "请选择【杀】的目标";
			},
		},
		ai: {
			order: function (item, player) {
				return get.order({ name: "sha" }) + 0.1;
			},
			result: {
				player: function (player) {
					if (player.hp > 2 && player.hasValueTarget({ name: "sha" })) return 1;
					return 0;
				},
			},
		},
	},
	xinzhilve_move: {
		audio: "zhilve",
		sourceSkill: "xinzhilve",
		filterCard: function () {
			return false;
		},
		selectCard: -1,
		delay: false,
		content: function () {
			"step 0";
			event.forceDie = true;
			if (!player.canMoveCard(null, event.nojudge)) {
				event.finish();
				return;
			}
			var next = player.chooseTarget(2, function (card, player, target) {
				if (ui.selected.targets.length) {
					var from = ui.selected.targets[0];
					var js = from.getCards("j");
					for (var i = 0; i < js.length; i++) {
						if (_status.event.nojudge) break;
						if (target.canAddJudge(js[i])) return true;
					}
					if (target.isMin()) return false;
					var es = from.getCards("e");
					for (var i = 0; i < es.length; i++) {
						if (target.canEquip(es[i])) return true;
					}
					return false;
				} else {
					var range = "ej";
					if (_status.event.nojudge) range = "e";
					return target.countCards(range) > 0;
				}
			});
			next.set("nojudge", event.nojudge || false);
			next.set("ai", function (target) {
				var player = _status.event.player;
				var att = get.attitude(player, target);
				var sgnatt = get.sgn(att);
				if (ui.selected.targets.length == 0) {
					if (att > 0) {
						if (
							!_status.event.nojudge &&
							target.countCards("j", function (card) {
								return game.hasPlayer(function (current) {
									return current.canAddJudge(card) && get.attitude(player, current) < 0;
								});
							})
						)
							return 14;
						if (
							target.countCards("e", function (card) {
								return (
									get.value(card, target) < 0 &&
									game.hasPlayer(function (current) {
										return current != target && get.attitude(player, current) < 0 && current.canEquip(card);
									})
								);
							}) > 0
						)
							return 9;
					} else if (att < 0) {
						if (
							game.hasPlayer(function (current) {
								if (current != target && get.attitude(player, current) > 0) {
									var es = target.getCards("e");
									for (var i = 0; i < es.length; i++) {
										if (get.value(es[i], target) > 0 && current.canEquip(es[i]) && get.value(es[i], current) > 0) return true;
									}
								}
							})
						) {
							return -att;
						}
					}
					return 0;
				}
				var es = ui.selected.targets[0].getCards("e");
				var i;
				var att2 = get.sgn(get.attitude(player, ui.selected.targets[0]));
				for (i = 0; i < es.length; i++) {
					if (sgnatt != 0 && att2 != 0 && get.sgn(get.value(es[i], ui.selected.targets[0])) == -att2 && get.sgn(get.value(es[i], target)) == sgnatt && target.canEquip(es[i])) {
						return Math.abs(att);
					}
				}
				if (
					i == es.length &&
					(_status.event.nojudge ||
						!ui.selected.targets[0].countCards("j", function (card) {
							return target.canAddJudge(card);
						}))
				) {
					return 0;
				}
				return -att * get.attitude(player, ui.selected.targets[0]);
			});
			next.set("multitarget", true);
			next.set("targetprompt", _status.event.targetprompt || ["被移走", "移动目标"]);
			next.set("prompt", event.prompt || "移动场上的一张牌");
			if (event.prompt2) next.set("prompt2", event.prompt2);
			if (event.forced) next.set("forced", true);
			"step 1";
			event.result = result;
			if (result.bool) {
				player.line2(result.targets, "green");
				event.targets = result.targets;
			} else {
				event.finish();
			}
			"step 2";
			game.delay();
			"step 3";
			if (targets.length == 2) {
				player
					.choosePlayerCard(
						"ej",
						true,
						function (button) {
							var player = _status.event.player;
							var targets0 = _status.event.targets0;
							var targets1 = _status.event.targets1;
							if (get.attitude(player, targets0) > 0 && get.attitude(player, targets1) < 0) {
								if (get.position(button.link) == "j") return 12;
								if (get.value(button.link, targets0) < 0) return 10;
								return 0;
							} else {
								if (get.position(button.link) == "j") return -10;
								return get.equipValue(button.link);
							}
						},
						targets[0]
					)
					.set("nojudge", event.nojudge || false)
					.set("targets0", targets[0])
					.set("targets1", targets[1])
					.set("filterButton", function (button) {
						var targets1 = _status.event.targets1;
						if (get.position(button.link) == "j") {
							if (_status.event.nojudge) return false;
							return targets1.canAddJudge(button.link);
						} else {
							return targets1.canEquip(button.link);
						}
					});
			} else {
				event.finish();
			}
			"step 4";
			if (result.bool && result.links.length) {
				player.loseHp();
			}
			"step 5";
			if (result.bool && result.links.length) {
				var link = result.links[0];
				if (get.position(link) == "e") {
					event.targets[1].equip(link);
				} else if (link.viewAs) {
					event.targets[1].addJudge({ name: link.viewAs }, [link]);
				} else {
					event.targets[1].addJudge(link);
				}
				event.targets[0].$give(link, event.targets[1]);
				event.result.card = link;
				event.result.position = get.position(link);
				game.delay();
				player.addTempSkill("xinzhilve_mark");
				player.addMark("xinzhilve_mark", 1, false);
			}
		},
	},
	xinzhilve_use: {
		audio: "zhilve",
		sourceSkill: "xinzhilve",
		filterCard: function () {
			return false;
		},
		selectCard: -1,
		filterTarget: function (card, player, target) {
			return player.canUse({ name: "sha", isCard: true }, target, false);
		},
		content: function () {
			player.loseHp();
			player.draw();
			player.useCard({ name: "sha", isCard: true }, false, target).forceDie = true;
			player.addTempSkill("xinzhilve_mark");
			player.addMark("xinzhilve_mark", 1, false);
		},
		ai: {
			result: {
				target: function (player, target) {
					return get.effect(target, { name: "sha" }, player, target);
				},
			},
		},
	},
	xinzhilve_mark: {
		intro: { content: "本回合手牌上限+#" },
		onremove: true,
		charlotte: true,
		mod: {
			maxHandcard: function (player, num) {
				return num + player.countMark("xinzhilve_mark");
			},
		},
	},
	xinxhzhiyan: {
		audio: "xhzhiyan",
		enable: "phaseUse",
		filter: function (event, player) {
			const list = player.getStorage("xinxhzhiyan_used");
			return (!list.includes("give") && player.countCards("h") > player.hp) || (!list.includes("draw") && player.countCards("h") < player.maxHp);
		},
		filterCard: true,
		selectCard: function () {
			var player = _status.event.player;
			const list = player.getStorage("xinxhzhiyan_used");
			if (list.includes("give")) return 0;
			var num = Math.max(0, player.countCards("h") - player.hp);
			if (ui.selected.cards.length || !list.includes("draw") || player.countCards("h") >= player.maxHp) return [num, num];
			return [0, num];
		},
		filterTarget: lib.filter.notMe,
		selectTarget: function () {
			if (ui.selected.cards.length) return [1, 1];
			return [0, 0];
		},
		check: function (card) {
			var player = _status.event.player;
			var checkx = function (card) {
				if (
					player.getUseValue(card, null, true) <= 0 &&
					game.hasPlayer(function (current) {
						return current != player && get.value(card, current) > 0 && get.attitude(player, current) > 0;
					})
				)
					return 2;
				return 1;
			};
			if (
				player.countCards("h", function (card) {
					return checkx(card) > 0;
				}) <
				player.countCards("h") - player.hp
			)
				return 0;
			return checkx(card);
		},
		delay: false,
		discard: false,
		lose: false,
		content: function () {
			var bool = cards && cards.length > 0;
			player.addTempSkill("xinxhzhiyan_used", "phaseUseEnd");
			if (!bool) {
				player.markAuto("xinxhzhiyan_used", "draw");
				player.addTempSkill("xinxhzhiyan_false", "phaseUseEnd");
				player.draw(player.maxHp - player.countCards("h"));
			} else {
				player.markAuto("xinxhzhiyan_used", "give");
				player.give(cards, target);
			}
		},
		ai: {
			order: function (obj, player) {
				if (player.countCards("h") > player.hp) return 10;
				return 0.5;
			},
			result: {
				player: function (player, target) {
					if (!ui.selected.cards.length && player.countCards("h") < player.maxHp) return 1;
					return 0;
				},
				target: 1,
			},
		},
	},
	xinxhzhiyan_used: {
		charlotte: true,
		onremove: true,
	},
	xinxhzhiyan_false: {
		mod: {
			playerEnabled: function (card, player, target) {
				if (player != target && (!get.info(card) || !get.info(card).singleCard || !ui.selected.targets.length)) return false;
			},
		},
		charlotte: true,
		mark: true,
		intro: {
			content: "不能对其他角色使用牌",
		},
	},
	weifeng: {
		audio: 2,
		trigger: { player: "useCardAfter" },
		forced: true,
		filter: function (event, player) {
			if (
				!event.targets ||
				!event.targets.filter(function (target) {
					return target != player && !target.storage.weifeng2;
				}).length
			)
				return false;
			var evt = event.getParent("phaseUse");
			if (!evt || evt.player != player) return false;
			if (!get.tag(event.card, "damage")) return false;
			if (!["basic", "trick"].includes(get.type(event.card))) return false;
			return (
				player
					.getHistory("useCard", function (ev) {
						return ev.getParent("phaseUse") == evt && get.tag(ev.card, "damage") && ["basic", "trick"].includes(get.type(ev.card));
					})
					.indexOf(event) == 0 &&
				game.hasPlayer(function (current) {
					return current != player && !current.storage.weifeng2 && event.targets.includes(current);
				})
			);
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(true, "威风：请选择一个目标，令其获得一个【惧(" + get.translation(trigger.card.name) + ")】标记", function (card, player, target) {
					return player != target && !target.storage.weifeng2 && _status.event.getTrigger().targets.includes(target);
				})
				.set("ai", function (target) {
					return -get.attitude(_status.event.player, target);
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				target.storage.weifeng2 = trigger.card.name;
				player.line(target, "green");
				game.log(target, "获得了一个", "#g【惧(" + get.translation(trigger.card.name) + ")】", "标记");
				target.markSkill("weifeng2");
				player.addSkill("weifeng3");
			}
		},
	},
	weifeng2: {
		intro: {
			content: "当前“惧”标记名称：$",
			onunmark: function (storage, player) {
				if (player.storage.weifeng2) {
					game.log(player, "移去了一个", "#g【惧(" + get.translation(player.storage.weifeng2) + ")】", "标记");
					delete player.storage.weifeng2;
				}
			},
		},
		marktext: "惧",
	},
	weifeng3: {
		trigger: {
			global: "damageBegin3",
			player: ["phaseZhunbeiBegin", "dieBegin"],
		},
		forced: true,
		popup: false,
		sourceSkill: "weifeng",
		filter: function (event, player) {
			if (event.name != "damage") return true;
			return event.player != player && typeof event.player.storage.weifeng2 == "string";
		},
		content: function () {
			if (trigger.name == "damage") {
				player.logSkill("weifeng", trigger.player);
				if (trigger.card && trigger.card.name == trigger.player.storage.weifeng2) trigger.num++;
				else if (trigger.player.countGainableCards(player, "he") > 0) player.gainPlayerCard(trigger.player, "he", true);
				trigger.player.unmarkSkill("weifeng2");
			} else {
				game.countPlayer(function (current) {
					if (current.storage.weifeng2) current.unmarkSkill("weifeng2");
				});
				player.removeSkill("weifeng3");
			}
		},
	},
	gnjinfan: {
		trigger: { player: "phaseDiscardBegin" },
		direct: true,
		locked: false,
		audio: 2,
		filter: function (event, player) {
			var list = [];
			player.getCards("s", function (card) {
				if (card.hasGaintag("gnjinfan")) list.add(get.suit(card));
			});
			if (list.length >= lib.suit.length) return false;
			return (
				player.countCards("h", function (card) {
					return _status.connectMode || !list.includes(get.suit(card));
				}) > 0
			);
		},
		content: function () {
			"step 0";
			player
				.chooseCard(
					"h",
					get.prompt("gnjinfan"),
					"将任意张手牌当做“铃”置于武将牌上",
					[
						1,
						(function () {
							var list = [];
							var list2 = [];
							player.getCards("s", function (card) {
								if (card.hasGaintag("gnjinfan")) list.add(get.suit(card));
							});
							player.getCards("h", function (card) {
								list2.add(get.suit(card));
							});
							list2.removeArray(list);
							return Math.max(1, list2.length);
						})(),
					],
					function (card, player) {
						return (
							!player.countCards("s", function (cardx) {
								return cardx.hasGaintag("gnjinfan") && get.suit(cardx, false) == get.suit(card, player);
							}) &&
							!ui.selected.cards.filter(function (cardx) {
								return get.suit(cardx, player) == get.suit(card, player);
							}).length
						);
					}
				)
				.set("ai", function (card) {
					var player = _status.event.player;
					if (player.hasUseTarget(card) && !player.hasValueTarget(card)) return 0;
					if (["sha", "shan", "wuxie", "caochuan"].includes(card.name)) return 2 + Math.random();
					return 1 + Math.random();
				})
				.set("complexCard", true);
			"step 1";
			if (result.bool) {
				player.logSkill("gnjinfan");
				game.log(player, "将", result.cards, "放到了武将牌上");
				player.loseToSpecial(result.cards, "gnjinfan").visible = true;
			} else event.finish();
			"step 2";
			player.markSkill("gnjinfan");
		},
		group: ["gnjinfan_gain"],
		marktext: "铃",
		intro: {
			mark: function (dialog, storage, player) {
				dialog.addAuto(
					player.getCards("s", function (card) {
						return card.hasGaintag("gnjinfan");
					})
				);
			},
			markcount: function (storage, player) {
				return player.getCards("s", function (card) {
					return card.hasGaintag("gnjinfan");
				}).length;
			},
			onunmark: function (storage, player) {
				var cards = player.getCards("s", function (card) {
					return card.hasGaintag("gnjinfan");
				});
				if (cards.length) {
					player.lose(cards, ui.discardPile);
					player.$throw(cards, 1000);
					game.log(cards, "进入了弃牌堆");
				}
			},
		},
		mod: {
			aiOrder: function (player, card, num) {
				if (get.itemtype(card) == "card" && card.hasGaintag("gnjinfan")) return num + 0.5;
			},
		},
	},
	gnjinfan_gain: {
		audio: "gnjinfan",
		trigger: { player: "loseAfter" },
		forced: true,
		sourceSkill: "gnjinfan",
		filter: function (event, player) {
			if (!event.ss || !event.ss.length) return false;
			for (var i in event.gaintag_map) {
				if (event.gaintag_map[i].includes("gnjinfan")) return true;
				return false;
			}
		},
		content: function () {
			"step 0";
			var cards = [];
			for (var i of trigger.ss) {
				if (!trigger.gaintag_map[i.cardid] || !trigger.gaintag_map[i.cardid].includes("gnjinfan")) continue;
				var suit = get.suit(i, false);
				var card = get.cardPile2(function (card) {
					return !cards.includes(card) && get.suit(card, false) == suit;
				});
				if (card) cards.push(card);
			}
			if (cards.length) player.gain(cards, "gain2");
			var num = player.getCards("s", function (card) {
				return card.hasGaintag("gnjinfan");
			}).length;
			if (num) player.markSkill("gnjinfan");
			else player.unmarkSkill("gnjinfan");
			"step 1";
			game.updateRoundNumber();
		},
	},
	gnsheque: {
		audio: 2,
		trigger: { global: "phaseZhunbeiBegin" },
		direct: true,
		filter: function (event, player) {
			return event.player.isIn() && event.player.countCards("e") > 0 && lib.filter.targetEnabled({ name: "sha" }, player, event.player) && (player.hasSha() || (_status.connectMode && player.countCards("h") > 0));
		},
		content: function () {
			player
				.chooseToUse(function (card, player, event) {
					if (get.name(card) != "sha") return false;
					return lib.filter.filterCard.apply(this, arguments);
				}, "射却：是否对" + get.translation(trigger.player) + "使用一张杀？")
				.set("logSkill", "gnsheque")
				.set("complexSelect", true)
				.set("filterTarget", function (card, player, target) {
					if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
					return lib.filter.targetEnabled.apply(this, arguments);
				})
				.set("sourcex", trigger.player)
				.set("oncard", function (card) {
					try {
						card.gnsheque_tag = true;
					} catch (e) {
						alert("发生了一个导致【射却】无法正常触发无视防具效果的错误。请关闭十周年UI/手杀ui等扩展以解决");
					}
				});
		},
		ai: {
			unequip: true,
			unequip_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (tag == "unequip_ai") {
					if (_status.event.getParent().name != "gnsheque") return false;
				} else if (!arg || !arg.card || !arg.card.gnsheque_tag) return false;
			},
		},
	},
	//猩黄忠
	spshidi: {
		audio: 2,
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		zhuanhuanji: "number",
		filter: function (event, player) {
			return player.countMark("spshidi") % 2 == ["phaseJieshu", "phaseZhunbei"].indexOf(event.name);
		},
		logAudio(event, player) {
			return "spshidi" + (2 - (player.countMark("spshidi") % 2)) + ".mp3";
		},
		forced: true,
		content: function () {
			player.changeZhuanhuanji("spshidi");
		},
		mod: {
			globalFrom: function (from, to, distance) {
				if (from.countMark("spshidi") % 2 == 0) return distance - 1;
			},
			globalTo: function (from, to, distance) {
				if (to.countMark("spshidi") % 2 == 1) return distance + 1;
			},
			aiOrder: function (player, card, num) {
				if (player.countMark("spshidi") % 2 == 0 && card.name == "sha" && get.color(card) == "black") return num + 0.1;
			},
		},
		mark: true,
		marktext: "☯",
		intro: {
			content: function (storage, player) {
				return "已转换过" + (storage || 0) + "次";
			},
		},
		ai: {
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (!arg || !arg.card || !arg.target || arg.card.name != "sha") return false;
				return player.countMark("spshidi") % 2 == 0 && get.color(arg.card) == "black";
			},
		},
		group: ["spshidi_use", "spshidi_beused"],
		subSkill: {
			use: {
				audio: "spshidi1.mp3",
				trigger: { player: "useCard" },
				forced: true,
				filter: function (event, player) {
					return event.card.name == "sha" && player.countMark("spshidi") % 2 == 0 && get.color(event.card, false) == "black";
				},
				content: function () {
					trigger.directHit.addArray(game.players);
				},
			},
			beused: {
				audio: "spshidi2.mp3",
				trigger: { target: "useCardToTargeted" },
				forced: true,
				filter: function (event, player) {
					return event.card.name == "sha" && player.countMark("spshidi") % 2 == 1 && get.color(event.card, false) == "red";
				},
				content: function () {
					trigger.directHit.add(player);
				},
			},
		},
	},
	spyishi: {
		audio: 2,
		trigger: { source: "damageBegin2" },
		filter: function (event, player) {
			return player != event.player && event.player.countCards("e") > 0;
		},
		check: function (event, player) {
			return (
				get.damageEffect(event.player, player, player) <= 0 ||
				(get.attitude(player, event.player) <= 0 &&
					!event.player.hasSkillTag("noe") &&
					event.player.hasCard(function (card) {
						return get.value(card) > 9 - event.player.hp;
					}, "e"))
			);
		},
		logTarget: "player",
		content: function () {
			trigger.num--;
			player.gainPlayerCard(trigger.player, "e", true);
		},
	},
	spqishe: {
		audio: 2,
		enable: "chooseToUse",
		viewAs: { name: "jiu" },
		filterCard: { type: "equip" },
		position: "hes",
		viewAsFilter: function (player) {
			return player.hasCard({ type: "equip" }, "ehs");
		},
		check: function (card) {
			if (_status.event.type == "dying") return 1 / (get.value(card) || 0.5);
			return 5 - get.value(card);
		},
		locked: false,
		mod: {
			maxHandcard: function (player, num) {
				return num + player.countCards("e");
			},
		},
	},
	//☆胃炎
	mbguli: {
		audio: 2,
		enable: "phaseUse",
		filterCard: true,
		selectCard: -1,
		position: "h",
		filter: function (event, player) {
			if (player.hasSkill("mbguli_used")) return false;
			var hs = player.getCards("h");
			if (!hs.length) return false;
			for (var card of hs) {
				var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
				if (mod2 === false) return false;
			}
			return event.filterCard(get.autoViewAs({ name: "sha" }, hs));
		},
		viewAs: {
			name: "sha",
			storage: { mbguli: true },
		},
		onuse: function (links, player) {
			player.addTempSkill("mbguli_used", "phaseUseAfter");
		},
		ai: {
			order: 1,
			threaten: 1.14514,
			unequip_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg && arg.name == "sha" && arg.card && arg.card.storage && arg.card.storage.mbguli) return true;
				return false;
			},
		},
		subSkill: {
			used: {
				audio: "mbguli",
				trigger: { global: "useCardAfter" },
				charlotte: true,
				prompt2: "失去1点体力，然后将手牌摸至体力上限",
				check: function (event, player) {
					var num = player.maxHp - player.countCards("h");
					return (num >= 3 && player.hp >= 2) || (num >= 2 && player.hp >= 3);
				},
				filter: function (event, player) {
					return (
						event.card.storage &&
						event.card.storage.mbguli &&
						game.hasPlayer2(current => {
							return current.hasHistory("sourceDamage", evt => evt.card == event.card);
						})
					);
				},
				content: function () {
					"step 0";
					player.loseHp();
					"step 1";
					player.drawTo(player.maxHp);
				},
				group: "mbguli_unequip",
			},
			unequip: {
				trigger: {
					player: "useCardToPlayered",
				},
				filter: function ({ card }) {
					return card.name == "sha" && card.storage && card.storage.mbguli;
				},
				forced: true,
				popup: false,
				logTarget: "target",
				content: function () {
					trigger.target.addTempSkill("qinggang2");
					trigger.target.storage.qinggang2.add(trigger.card);
					trigger.target.markSkill("qinggang2");
				},
			},
		},
	},
	mbaosi: {
		audio: 2,
		trigger: { source: "damageSource" },
		forced: true,
		filter: function (event, player) {
			return player.inRange(event.player) && player.isPhaseUsing() && event.player.isIn() && !player.getStorage("mbaosi_inf").includes(event.player);
		},
		logTarget: "player",
		content: function () {
			player.addTempSkill("mbaosi_inf", "phaseUseAfter");
			player.markAuto("mbaosi_inf", [trigger.player]);
		},
		subSkill: {
			inf: {
				charlotte: true,
				onremove: true,
				forced: true,
				intro: { content: "对$使用牌无次数限制" },
				mod: {
					cardUsableTarget: function (card, player, target) {
						if (player.getStorage("mbaosi_inf").includes(target)) return true;
					},
				},
			},
		},
	},
	//☆周不疑
	mbhuiyao: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		// filterTarget:lib.filter.notMe,
		content: function () {
			"step 0";
			player.damage("nosource");
			"step 1";
			if (game.countPlayer() < 2) event.finish();
			if (game.countPlayer() == 2)
				event._result = {
					bool: true,
					targets: [game.findPlayer(i => i != player), player],
				};
			else
				player
					.chooseTarget(
						`慧夭：请选择两名角色`,
						`令不为你的第一名角色视为对第二名角色造成过1点伤害。`,
						(card, player, target) => {
							if (!ui.selected.targets.length) return player != target;
							return true;
						},
						2,
						true
					)
					.set("multitarget", true)
					.set("targetprompt", ["伤害来源", "受伤角色"])
					.set("ai", target => {
						return target == get.event("aiTargets")[ui.selected.targets.length] ? 10 : 0;
					})
					.set("aiTargets", lib.skill.mbhuiyao.getUnrealDamageTargets(player, [game.filterPlayer(i => i != player), game.filterPlayer()], true));
			"step 2";
			if (result.bool) {
				var targets = result.targets;
				player.line2(targets, "green");
				game.delaye();
				targets[1].damage(targets[0], "unreal");
			}
		},
		getUnrealDamageTargets: (player, lists, forced) => {
			const targets = [null, null];
			let sourceList, targetList;
			if (lists.length == 2 && lists.every(l => Array.isArray(l))) {
				sourceList = lists[0];
				targetList = lists[1];
			} else {
				sourceList = lists.slice();
				targetList = lists.slice();
			}
			const list = targetList
				.map(current => {
					const _hp = current.hp,
						_maxhp = current.maxHp;
					current.hp = 100;
					current.maxHp = 100;
					const att = -get.sgnAttitude(player, current);
					let val = get.damageEffect(current, player, current) * att;
					current.getSkills(null, false, false).forEach(skill => {
						const info = get.info(skill);
						if (info && info.ai && (info.ai.maixie || info.ai.maixie_hp || info.ai.maixie_defend)) val = Math[val > 0 ? "max" : "min"](val > 0 ? 0.1 : -0.1, val + 2 * att);
					});
					const eff = 100 / val + 15;
					current.hp = _hp;
					current.maxHp = _maxhp;
					return [current, eff];
				})
				.sort((a, b) => b[1] - a[1])[0];
			if (list[1] < 0 && !forced) return targets;
			const targetx = list[0];
			targets[1] = targetx;
			const list2 = sourceList
				.filter(i => i != targetx)
				.map(current => {
					const _hp = targetx.hp,
						_maxhp = targetx.maxHp;
					targetx.hp = 100;
					targetx.maxHp = 100;
					const att = -get.sgnAttitude(player, current);
					const eff = get.damageEffect(targetx, current, current) * att;
					targetx.hp = _hp;
					targetx.maxHp = _maxhp;
					return [current, eff];
				})
				.sort((a, b) => b[1] - a[1])[0];
			if (!list2) return targets;
			targets[0] = list2[0];
			return targets;
		},
		ai: {
			order: 6,
			result: {
				player: function (player) {
					if (player.getHp() + player.countCards("hs", card => player.canSaveCard(card, player)) <= 1) return 0;
					var limit = 25;
					var quesong = player.hasSkill("mbquesong") && !player.getStat().damaged;
					if (quesong) {
						limit -= 7.5;
					}
					if (
						quesong &&
						game.hasPlayer(target => {
							var att = get.attitude(player, target);
							if (att < 0) return false;
							return (
								att *
									Math.sqrt(
										Math.max(
											1,
											[1, 2, 3, 4].reduce((p, c) => p + target.countEmptySlot(c), 0)
										)
									) >=
									10 || target.getHp() <= 2
							);
						})
					)
						return 1;
					if (
						!quesong &&
						game.hasPlayer(target => {
							if (target == player) return false;
							var _hp = target.hp,
								_maxhp = target.maxHp;
							target.hp = 100;
							target.maxHp = 100;
							var att = -get.sgnAttitude(player, target);
							var val = get.damageEffect(target, player, target) * att;
							target.getSkills(null, false, false).forEach(skill => {
								var info = get.info(skill);
								if (info && info.ai && (info.ai.maixie || info.ai.maixie_hp || info.ai.maixie_defend)) val = Math[val > 0 ? "max" : "min"](val > 0 ? 0.1 : -0.1, val + 2 * att);
							});
							var eff = 100 / val;
							target.hp = _hp;
							target.maxHp = _maxhp;
							if (eff < limit) return false;
							return true;
						})
					)
						return 1;
					return 0;
				},
			},
			combo: "mbquesong",
			halfneg: true,
		},
	},
	mbquesong: {
		audio: 2,
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return player.getHistory("damage").length;
		},
		direct: true,
		content: function () {
			"step 0";
			player.chooseTarget(get.prompt2("mbquesong")).set("ai", target => {
				var player = _status.event.player;
				if (get.attitude(player, target) <= 0) return 0;
				var len = lib.skill.mbquesong.getNum(target),
					hp = target.getHp();
				return len + target.isTurnedOver() * 2 + (1.5 * Math.min(4, target.getDamagedHp())) / (hp + 1);
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("mbquesong", target);
				var len = lib.skill.mbquesong.getNum(target);
				if (target.isHealthy()) event._result = { index: 0 };
				else {
					target
						.chooseControl()
						.set("choiceList", ["摸" + get.cnNumber(len) + "张牌并复原武将牌", "回复1点体力"])
						.set("prompt", "雀颂：请选择一项")
						.set("ai", () => {
							var player = _status.event.player;
							var len = _status.event.len;
							return get.effect(player, { name: "draw" }, player, player) * len >= get.recoverEffect(player, player, player) ? 0 : 1;
						})
						.set("len", len);
				}
			} else event.finish();
			"step 2";
			if (result.index == 1) {
				target.recover();
				event.finish();
			} else target.draw(lib.skill.mbquesong.getNum(target));
			"step 3";
			target.link(false);
			"step 4";
			target.turnOver(false);
		},
		getNum: function (player) {
			return player.countCards("e", card => get.subtype(card) != "equip5") >= 3 ? 2 : 3;
		},
		ai: {
			expose: 0.2,
			maixie: true,
			skillTagFilter: function (player, tag) {
				if (player.getStat().damaged) return false;
			},
		},
	},
	//王戎
	mpjianlin: {
		audio: 2,
		trigger: {
			global: "phaseAfter",
		},
		getCards(player) {
			const cards = [];
			game.checkGlobalHistory("cardMove", evt => {
				if (evt.name == "lose") {
					if (evt.position !== ui.discardPile) return false;
				} else if (evt.name !== "cardsDiscard") return false;
				if (get.info("mpjianlin").isUseOrRespond(evt, player)) {
					cards.addArray(
						evt.cards.filter(card => {
							return get.type(card) == "basic" && get.position(card) === "d";
						})
					);
				}
			});
			player.checkHistory("lose", evt => {
				if (evt.type == "discard") {
					cards.addArray(
						evt.cards2.filter(card => {
							return get.type(card) == "basic" && get.position(card) === "d";
						})
					);
				}
			});
			return cards;
		},
		isUseOrRespond(event, player) {
			if (event.name !== "cardsDiscard") return false;
			const evtx = event.getParent();
			if (evtx.name !== "orderingDiscard") return false;
			const evt2 = evtx.relatedEvent || evtx.getParent();
			return ["useCard", "respond"].includes(evt2.name) && evt2.player == player;
		},
		filter(event, player) {
			return get.info("mpjianlin").getCards(player).length;
		},
		async cost(event, trigger, player) {
			const cards = get.info("mpjianlin").getCards(player);
			const {
				result: { bool, links },
			} = await player.chooseButton(["俭吝：你可以获得其中一张牌", cards]).set("ai", get.buttonValue);
			event.result = {
				bool: bool,
				cost_data: links,
			};
		},
		async content(event, trigger, player) {
			player.gain(event.cost_data, "gain2");
		},
	},
	mpsixiao: {
		audio: 2,
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		locked: true,
		filter(event, player) {
			return (event.name != "phase" || game.phaseNumber == 0) && game.hasPlayer(current => current != player);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(true, lib.filter.notMe, "死孝：请选择一名角色当其孝子", "当该角色需要使用或打出除【无懈可击】外的牌时，其可以观看你的手牌并可以使用或打出其中一张牌，然后你摸一张牌")
				.set("ai", target => {
					return get.attitude(get.player(), target);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			game.log(player, "成为了", target, "的孝子");
			target.storage.mpsixiao_use = player;
			target.addSkill("mpsixiao_use");
		},
		subSkill: {
			use: {
				charlotte: true,
				mark: "character",
				intro: {
					content: "当你需要使用或打出除【无懈可击】外的牌时，你可以观看$的手牌并可以使用或打出其中一张牌，然后$摸一张牌",
				},
				hiddenCard(player, name) {
					if (name == "wuxie" || !lib.inpile.includes(name) || player.hasSkill("mpsixiao_used", null, null, false)) return false;
					const target = player.storage.mpsixiao_use;
					const cards = target.getCards("h");
					for (var i of cards) {
						if (get.name(i, target) == name) return true;
					}
					return false;
				},
				enable: ["chooseToUse", "chooseToRespond"],
				filter(event, player) {
					const target = player.storage.mpsixiao_use;
					const cards = target.getCards("h");
					if (player.hasSkill("mpsixiao_used", null, null, false)) return false;
					return cards.some(i =>
						event.filterCard(
							{
								name: get.name(i, target),
								nature: get.nature(i, target),
								isCard: true,
							},
							player,
							event
						)
					);
				},
				chooseButton: {
					dialog(event, player) {
						const target = player.storage.mpsixiao_use;
						const cards = target.getCards("h");
						return ui.create.dialog("死孝", cards);
					},
					filter(button, player) {
						const evt = _status.event.getParent();
						const target = player.storage.mpsixiao_use;
						return evt.filterCard(
							{
								name: get.name(button.link, target),
								nature: get.nature(button.link, target),
								isCard: true,
							},
							player,
							evt
						);
					},
					check(button) {
						const player = get.player();
						const evt = _status.event.getParent();
						if (evt.dying) return get.attitude(player, evt.dying);
						if (_status.event.getParent().type != "phase") return 1;
						return player.getUseValue(get.autoViewAs(button.link), null, true);
					},
					backup(links, player) {
						const target = player.storage.mpsixiao_use;
						return {
							viewAs: {
								name: get.name(links[0], target),
								nature: get.nature(links[0], target),
								isCard: true,
							},
							card: links[0],
							filterCard: () => false,
							selectCard: -1,
							log: false,
							async precontent(event, trigger, player) {
								const card = lib.skill.mpsixiao_use_backup.card,
									target = player.storage.mpsixiao_use;
								event.result.card = card;
								event.result.cards = [card];
								player.addTempSkill("mpsixiao_used");
								target
									.when({ global: ["useCard", "respond"] })
									.filter(evt => evt.player == player && evt.skill == "mpsixiao_use_backup")
									.then(() => {
										player.draw();
									});
							},
						};
					},
					ai: {
						hasSha: true,
						hasShan: true,
						skillTagFilter(player, tag) {
							const name = "s" + tag.slice(4);
							return lib.skill.mpsixiao_use.hiddenCard(player, name);
						},
					},
				},
				ai: {
					order: 8,
					result: {
						player: 1,
					},
				},
			},
			used: {},
		},
	},
	//小程序刘伶
	mpjiusong: {
		audio: 2,
		enable: "chooseToUse",
		trigger: { global: "useCard" },
		filterCard: function (card) {
			return get.type2(card) == "trick";
		},
		viewAs: { name: "jiu" },
		position: "hs",
		viewAsFilter: function (player) {
			return player.hasCard(card => get.type2(card) == "trick", "hs");
		},
		check: function (card) {
			if (get.itemtype(card) !== "card") return true;
			if (get.event().type == "dying") return 1 / Math.max(0.1, get.value(card));
			return 4 - get.value(card);
		},
		prompt: "将一张锦囊牌当【酒】使用",
		filter: function (event, player) {
			if (event.name == "chooseToUse") return player.hasCard(card => get.type2(card) == "trick", "hs");
			return event.card.name == "jiu" && player.countMark("mpjiusong") < 3;
		},
		forced: true,
		locked: false,
		content: function () {
			player.addMark("mpjiusong");
		},
		marktext: "醉",
		intro: {
			name: "醉(酒颂/酕醄)",
			name2: "醉",
			content: "mark",
		},
	},
	mpmaotao: {
		audio: 2,
		trigger: { global: "useCardToPlayer" },
		filter: function (event, player) {
			if (event.targets.length != 1 || !event.isFirstTarget) return false;
			if (!["basic", "trick"].includes(get.type(event.card))) return false;
			return event.player != player && player.countMark("mpjiusong");
		},
		prompt2: function (event, player) {
			let list;
			if (get.type(event.card) != "delay")
				list = game.filterPlayer(current => {
					return lib.filter.targetEnabled2(event.card, event.player, current);
				});
			else list = game.filterPlayer(current => current.canAddJudge(event.card));
			const gainText = `${list.length > 1 && !player.storage.mpmaotao_gained ? `若新目标与原目标相同，你` : ""}${!player.storage.mpmaotao_gained ? "获得牌堆中的一张锦囊牌。" : ""}`;
			return `移去1枚“醉”${list.length > 1 ? `，令${get.translation(event.card)}目标改为${get.translation(list)}中的一名随机角色` : ""}。${gainText}`;
		},
		check: function (event, player) {
			const eff = get.effect(event.target, event.card, player, player);
			let list;
			if (get.type(event.card) != "delay")
				list = game.filterPlayer(current => {
					return lib.filter.targetEnabled2(event.card, event.player, current);
				});
			else list = game.filterPlayer(current => current.canAddJudge(event.card));
			let list2 = list.filter(current => get.effect(current, event.card, player, player) > eff);
			let list3 = list.filter(current => get.effect(current, event.card, player, player) > 0);
			return list2.length >= list.length / 2 || (player.countMark("mpjiusong") >= 2 && list3.length >= list.length / 2);
		},
		content: function () {
			player.removeMark("mpjiusong", 1);
			var list,
				oriTarget = trigger.target;
			trigger.targets.remove(oriTarget);
			trigger.getParent().triggeredTargets1.remove(oriTarget);
			trigger.untrigger();
			game.delayx();
			if (get.type(trigger.card) != "delay")
				list = game.filterPlayer(current => {
					return lib.filter.targetEnabled2(trigger.card, trigger.player, current);
				});
			else list = game.filterPlayer(current => current.canAddJudge(trigger.card));
			if (list.length) target = list.randomGet();
			trigger.targets.push(target);
			trigger.player.line(target, "thunder");
			game.log(trigger.card, "的目标被改为", target);
			if (target == oriTarget && !player.storage.mpmaotao_gained) {
				var card = get.cardPile2(card => get.type2(card) == "trick");
				if (card) {
					if (!player.storage.mpmaotao_gained) {
						player.when({ global: "phaseAfter" }).then(() => {
							delete player.storage.mpmaotao_gained;
						});
						player.storage.mpmaotao_gained = true;
					}
					player.gain(card, "gain2");
				} else {
					// player.chat('没酒了！');
					// game.log('但是牌堆中已经没有','#y酒','了!');
					player.chat("没牌了！");
					game.log("但是牌堆中已经没有", "#y锦囊牌", "了!");
				}
			}
		},
		ai: {
			combo: "mpjiusong",
		},
	},
	mpbishi: {
		audio: 2,
		forced: true,
		trigger: { global: "useCard1" },
		filter: function (event, player) {
			if (get.type2(event.card) != "trick" || !get.tag(event.card, "damage")) return false;
			if (!lib.skill.xunshi.isXunshi(event.card)) return false;
			const targets = event.targets.slice();
			targets.remove(event.player);
			return targets.length == game.countPlayer() - 2;
		},
		content: function* () {},
		mod: {
			targetEnabled: function (card) {
				if (get.type2(card) == "trick" && get.tag(card, "damage") > 0) return false;
			},
		},
	},
};

export default skills;
