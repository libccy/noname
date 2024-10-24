import { lib, game, ui, get, ai, _status } from "../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	//魏武帝
	junkguixin: {
		forbid: ["guozhan"],
		init: function () {
			if (!_status.junkguixin) {
				_status.junkguixin = [];
				if (!_status.characterlist) {
					lib.skill.pingjian.initList();
				}
				for (const name of _status.characterlist) {
					if (!lib.character[name][3]) continue;
					_status.junkguixin.addArray(
						lib.character[name][3].filter(skill => {
							var info = get.info(skill);
							return info && info.zhuSkill && (!info.ai || !info.ai.combo);
						})
					);
				}
			}
		},
		unique: true,
		audio: "guixin",
		trigger: { player: "phaseEnd" },
		direct: true,
		content: function () {
			"step 0";
			var controls = ["获得技能", "修改势力", "cancel2"];
			if (!_status.junkguixin.some(skill => !player.hasSkill(skill, null, false, false))) controls.shift();
			player
				.chooseControl(controls)
				.set("prompt", get.prompt2("junkguixin"))
				.set("ai", () => (_status.event.controls.length == 3 ? "获得技能" : "cancel2"));
			"step 1";
			if (result.control != "cancel2") {
				var next = game.createEvent("junkguixinx");
				next.player = player;
				next.setContent(lib.skill.junkguixin["content_" + result.control]);
			}
		},
		content_获得技能: function () {
			"step 0";
			var list = _status.junkguixin.slice().filter(skill => !player.hasSkill(skill, null, false, false));
			if (!list.length) {
				event.finish();
				return;
			}
			list = list.map(skill => {
				return [skill, '<div class="popup text" style="width:calc(100% - 10px);display:inline-block"><div class="skill">【' + get.translation(skill) + "】</div><div>" + lib.translate[skill + "_info"] + "</div></div>"];
			});
			player.chooseButton(["归心：选择获得一个主公技", [list, "textbutton"]], true).set("ai", button => 1 + Math.random());
			"step 1";
			if (result.bool) {
				player.logSkill("junkguixin");
				player.addSkills(result.links[0]);
			}
		},
		content_修改势力: function () {
			"step 0";
			player.chooseTarget("请选择【归心】的目标", "更改一名其他角色的势力", lib.filter.notMe, true).set("ai", target => 1 + Math.random());
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("junkguixin", target);
				var list = lib.group.slice();
				list.removeArray(["shen", target.group]);
				player
					.chooseControl(list)
					.set("prompt", "请选择" + get.translation(target) + "变更的势力")
					.set("ai", () => _status.event.controls.randomGet());
			} else event.finish();
			"step 2";
			if (result.control) {
				player.popup(get.translation(result.control + "2"));
				target.changeGroup(result.control);
			}
		},
	},
	oldqinqing: {
		audio: "qinqing",
		mode: ["identity", "versus"],
		available: function (mode) {
			if (mode == "versus" && _status.mode != "four") return false;
			if (mode == "identity" && _status.mode == "purple") return false;
		},
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		filter: function (event, player) {
			var zhu = get.zhu(player);
			if (!zhu || !zhu.isZhu) return false;
			return game.hasPlayer(function (current) {
				return current != zhu && current != player && current.inRange(zhu);
			});
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt2("dcqinqing"), function (card, player, target) {
					var zhu = get.zhu(player);
					return target != player && target.inRange(zhu);
				})
				.set("ai", function (target) {
					var zhu = get.zhu(player);
					var he = target.countCards("he");
					if (get.attitude(_status.event.player, target) > 0) {
						if (target.countCards("h") > zhu.countCards("h") + 1) return 0.1;
					} else {
						if (he > zhu.countCards("h") + 1) return 2;
						if (he > 0) return 1;
					}
					return 0;
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("dcqinqing", target);
				if (target.countDiscardableCards(player, "he")) player.discardPlayerCard(target, "he", true);
				target.draw();
			} else {
				event.finish();
			}
			"step 2";
			var zhu = get.zhu(player);
			if (zhu && zhu.isIn()) {
				if (target.countCards("h") > zhu.countCards("h")) player.draw();
			}
		},
	},
	oldhuisheng: {
		audio: "huisheng",
		trigger: { player: "damageBegin4" },
		direct: true,
		filter: function (event, player) {
			if (!player.countCards("he")) return false;
			if (!event.source || event.source == player || !event.source.isIn()) return false;
			if (player.storage.oldhuisheng && player.storage.oldhuisheng.includes(event.source)) return false;
			return true;
		},
		init: function (player) {
			if (player.storage.oldhuisheng) player.storage.oldhuisheng = [];
		},
		content: function () {
			"step 0";
			if (!player.storage.oldhuisheng) player.storage.oldhuisheng = [];
			player.storage.oldhuisheng.push(trigger.source);
			var att = get.attitude(player, trigger.source) > 0;
			var goon = false;
			if (player.hp == 1) {
				goon = true;
			} else {
				var he = player.getCards("he");
				var num = 0;
				for (var i = 0; i < he.length; i++) {
					if (get.value(he[i]) < 8) {
						num++;
						if (num >= 2) {
							goon = true;
							break;
						}
					}
				}
			}
			player
				.chooseCard("he", [1, player.countCards("he")], get.prompt2("oldhuisheng", trigger.source))
				.set("ai", function (card) {
					if (_status.event.att) {
						return 10 - get.value(card);
					}
					if (_status.event.goon) {
						return 8 - get.value(card);
					}
					if (!ui.selected.cards.length) {
						return 7 - get.value(card);
					}
					return 0;
				})
				.set("goon", goon)
				.set("att", att);
			"step 1";
			if (result.bool) {
				player.logSkill("oldhuisheng", trigger.source);
				game.delay();
				event.num = result.cards.length;
				var goon = false;
				if (event.num > 2 || get.attitude(trigger.source, player) >= 0) {
					goon = true;
				}
				var forced = false;
				var str = "获得其中一张牌并防止伤害";
				if (trigger.source.countCards("he") < event.num) {
					forced = true;
				} else {
					str += "，或取消并弃置" + get.cnNumber(result.cards.length) + "张牌";
				}
				trigger.source
					.chooseButton([str, result.cards], forced)
					.set("ai", function (button) {
						if (_status.event.goon) {
							return get.value(button.link);
						}
						return get.value(button.link) - 8;
					})
					.set("goon", goon);
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				var card = result.links[0];
				trigger.source.gain(card, player, "giveAuto", "bySelf");
				trigger.cancel();
			} else {
				trigger.source.chooseToDiscard(event.num, true, "he");
			}
		},
	},
	oldzishou: {
		audio: "zishou",
		audioname: ["re_liubiao"],
		trigger: { player: "phaseDrawBegin2" },
		check: function (event, player) {
			return (player.countCards("h") <= 2 && player.getDamagedHp() >= 2) || player.skipList.includes("phaseUse");
		},
		filter: function (event, player) {
			return !event.numFixed && player.isDamaged();
		},
		content: function () {
			trigger.num += player.getDamagedHp();
			player.skip("phaseUse");
		},
		ai: {
			threaten: 1.5,
		},
	},
	oldgongji: {
		audio: "gongji",
		enable: ["chooseToUse", "chooseToRespond"],
		locked: false,
		filterCard: { type: "equip" },
		position: "hes",
		viewAs: {
			name: "sha",
			storage: { oldgongji: true },
		},
		viewAsFilter: function (player) {
			if (!player.countCards("hes", { type: "equip" })) return false;
		},
		prompt: "将一张装备牌当无距离限制的【杀】使用或打出",
		check: function (card) {
			var val = get.value(card);
			if (_status.event.name == "chooseToRespond") return 1 / Math.max(0.1, val);
			return 5 - val;
		},
		mod: {
			targetInRange: function (card) {
				if (card.storage && card.storage.oldgongji) return true;
			},
		},
		ai: {
			respondSha: true,
			skillTagFilter: function (player) {
				if (!player.countCards("hes", { type: "equip" })) return false;
			},
		},
	},
	oldjiefan: {
		audio: "jiefan",
		enable: "chooseToUse",
		filter: function (event, player) {
			return event.type == "dying" && _status.currentPhase && _status.currentPhase.isIn();
		},
		direct: true,
		content: function () {
			player
				.chooseToUse(function (card, player, event) {
					if (get.name(card) != "sha") return false;
					return lib.filter.filterCard.apply(this, arguments);
				}, get.prompt2("oldjiefan"))
				.set("targetRequired", true)
				.set("complexSelect", true)
				.set("filterTarget", function (card, player, target) {
					if (target != _status.currentPhase && !ui.selected.targets.includes(_status.currentPhase)) return false;
					return lib.filter.filterTarget.apply(this, arguments);
				})
				.set("logSkill", "oldjiefan")
				.set("oncard", function () {
					_status.event.player.addTempSkill("oldjiefan_recover");
				})
				.set("custom", {
					add: {},
					replace: {
						window: () => {
							ui.click.cancel();
						},
					},
				});
		},
		ai: {
			save: true,
			order: 3,
			result: { player: 1 },
		},
		subSkill: {
			recover: {
				// audio:'jiefan',
				trigger: { source: "damageBegin2" },
				filter: function (event, player) {
					return event.getParent(4).name == "oldjiefan";
				},
				forced: true,
				popup: false,
				charlotte: true,
				content: function () {
					trigger.cancel();
					var evt = event.getParent("_save");
					var card = { name: "tao", isCard: true };
					if (evt && evt.dying && player.canUse(card, evt.dying)) {
						player.useCard(card, evt.dying, "oldjiefan_recover");
					}
				},
			},
		},
	},
	oldmingjian: {
		audio: "mingjian",
		trigger: { player: "phaseUseBefore" },
		filter: function (event, player) {
			return player.countCards("h");
		},
		direct: true,
		content: function () {
			"step 0";
			player.chooseTarget(get.prompt("oldmingjian"), "跳过出牌阶段并将所有手牌交给一名其他角色，你结束此回合，然后其于此回合后获得一个额外的出牌阶段", lib.filter.notMe).set("ai", target => {
				var player = _status.event.player,
					att = get.attitude(player, target);
				if (target.hasSkillTag("nogain")) return 0.01 * att;
				if (player.countCards("h") == player.countCards("h", "du")) return -att;
				if (target.hasJudge("lebu")) att *= 1.25;
				if (get.attitude(player, target) > 3) {
					var basis = get.threaten(target) * att;
					if (
						player == get.zhu(player) &&
						player.hp <= 2 &&
						player.countCards("h", "shan") &&
						!game.hasPlayer(function (current) {
							return get.attitude(current, player) > 3 && current.countCards("h", "tao") > 0;
						})
					)
						return 0;
					if (target.countCards("h") + player.countCards("h") > target.hp + 2) return basis * 0.8;
					return basis;
				}
				return 0;
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("oldmingjian", target);
				player.give(player.getCards("h"), target);
				trigger.cancel();
			} else event.finish();
			"step 2";
			var evt = trigger.getParent("phase");
			if (evt) {
				game.log(player, "结束了回合");
				evt.finish();
			}
			var next = target.insertPhase();
			next._noTurnOver = true;
			next.phaseList = ["phaseUse"];
			//next.setContent(lib.skill.oldmingjian.phase);
		},
		phase: function () {
			"step 0";
			player.phaseUse();
			"step 1";
			game.broadcastAll(function () {
				if (ui.tempnowuxie) {
					ui.tempnowuxie.close();
					delete ui.tempnowuxie;
				}
			});
		},
	},
	oldshenxian: {
		audio: "shenxian",
		inherit: "shenxian",
	},
	old_guhuo: {
		audio: 2,
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard: function (player, name) {
			return lib.inpile.includes(name) && player.countCards("hs") > 0;
		},
		filter: function (event, player) {
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
			dialog: function (event, player) {
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
			check: function (button) {
				var player = _status.event.player;
				var order = Math.max(0, get.order(card) + 1);
				var enemyNum = game.countPlayer(function (current) {
					return current != player && (get.realAttitude || get.attitude)(current, player) < 0 && current.hp > 0;
				});
				var card = { name: button.link[2], nature: button.link[3] };
				if (
					player.isDying() &&
					!player.hasCard(function (cardx) {
						if (get.suit(cardx) != "heart") return false;
						var mod2 = game.checkMod(cardx, player, "unchanged", "cardEnabled2", player);
						if (mod2 != "unchanged") return mod2;
						var mod = game.checkMod(cardx, player, player, "unchanged", "cardSavable", player);
						if (mod != "unchanged") return mod;
						var savable = get.info(cardx).savable;
						if (typeof savable == "function") savable = savable(card, player, player);
						return savable;
					}, "hs")
				) {
					if (!player.getStorage("old_guhuo_cheated").includes(card.name + card.nature) && Math.random() < 0.4) return 1;
					return 0;
				}
				var val = _status.event.getParent().type == "phase" ? player.getUseValue(card) : 1;
				if (
					player.getStorage("old_guhuo_cheated").includes(card.name + card.nature) &&
					!player.hasCard(function (cardx) {
						if (card.name == cardx.name) {
							if (card.name != "sha") return true;
							return get.is.sameNature(card, cardx);
						}
						return false;
					}, "hs") &&
					Math.random() < 0.7
				)
					return 0;
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
						if (enemyNum <= 2) return Math.sqrt(val) / 1.5 + order * 10;
						return 0;
					}
					return 3 * val + order * 10;
				}
				return val + order * 10;
			},
			backup: function (links, player) {
				return {
					filterCard: function (card, player, target) {
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
					ai1: function (card) {
						var player = _status.event.player;
						var enemyNum = game.countPlayer(function (current) {
							return current != player && (get.realAttitude || get.attitude)(current, player) < 0 && current.hp > 0;
						});
						var cardx = lib.skill.old_guhuo_backup.viewAs;
						if (enemyNum) {
							if ((card.name == cardx.name && (card.name != "sha" || get.is.sameNature(card, cardx))) || player.getStorage("old_guhuo_cheated").includes(card.name + card.nature)) return (get.suit(card) == "heart" ? 8 : 4) + Math.random() * 3;
							else if (lib.skill.old_guhuo_backup.aiUse < 0.5 && !player.isDying()) return 0;
						}
						return get.value(cardx) - get.value(card);
					},
					precontent: function () {
						player.logSkill("old_guhuo");
						player.addTempSkill("old_guhuo_guess");
						var card = event.result.cards[0];
						event.result.card.suit = get.suit(card);
						event.result.card.number = get.number(card);
					},
				};
			},
			prompt: function (links, player) {
				return "将一张手牌当做" + (links[0][3] ? get.translation(links[0][3]) : "") + "【" + get.translation(links[0][2]) + "】" + (_status.event.name == "chooseToRespond" ? "打出" : "使用");
			},
		},
		ai: {
			save: true,
			respondSha: true,
			respondShan: true,
			fireAttack: true,
			skillTagFilter: function (player) {
				if (!player.countCards("hs")) return false;
			},
			threaten: 1.2,
			order: 10,
			result: { player: 1 },
		},
		subSkill: {
			cheated: {
				trigger: {
					player: "gainAfter",
					global: "loseAsyncAfter",
				},
				charlotte: true,
				forced: true,
				silent: true,
				popup: false,
				firstDo: true,
				onremove: true,
				filter: function (event, player) {
					if (event.getParent().name == "draw") return true;
					var cards = event.getg(player);
					if (!cards.length) return false;
					return game.hasPlayer(current => {
						if (current == player) return false;
						var evt = event.getl(current);
						if (evt && evt.cards && evt.cards.length) return true;
						return false;
					});
				},
				content: function () {
					player.removeSkill("old_guhuo_cheated");
				},
			},
		},
	},
	old_guhuo_guess: {
		audio: "old_guhuo",
		trigger: {
			player: ["useCardBefore", "respondBefore"],
		},
		forced: true,
		silent: true,
		popup: false,
		firstDo: true,
		charlotte: true,
		sourceSkill: "old_guhuo",
		filter: function (event, player) {
			return event.skill && event.skill.indexOf("old_guhuo_") == 0;
		},
		content: function () {
			"step 0";
			event.fake = false;
			event.goon = true;
			event.betrayers = [];
			var card = trigger.cards[0];
			if (card.name != trigger.card.name || (card.name == "sha" && !get.is.sameNature(trigger.card, card))) event.fake = true;
			if (event.fake) {
				player.addSkill("old_guhuo_cheated");
				player.markAuto("old_guhuo_cheated", [trigger.card.name + trigger.card.nature]);
			}
			player.popup(trigger.card.name, "metal");
			player.lose(card, ui.ordering).relatedEvent = trigger;
			trigger.throw = false;
			trigger.skill = "old_guhuo_backup";
			game.log(player, "声明", trigger.targets && trigger.targets.length ? "对" : "", trigger.targets || "", trigger.name == "useCard" ? "使用" : "打出", trigger.card);
			event.prompt = get.translation(player) + "声明" + (trigger.targets && trigger.targets.length ? "对" + get.translation(trigger.targets) : "") + (trigger.name == "useCard" ? "使用" : "打出") + (get.translation(trigger.card.nature) || "") + get.translation(trigger.card.name) + "，是否质疑？";
			event.targets = game.filterPlayer(i => i != player && i.hp > 0).sortBySeat(_status.currentPhase);

			game.broadcastAll(
				function (card, player) {
					_status.old_guhuoNode = card.copy("thrown");
					if (lib.config.cardback_style != "default") {
						_status.old_guhuoNode.style.transitionProperty = "none";
						ui.refresh(_status.old_guhuoNode);
						_status.old_guhuoNode.classList.add("infohidden");
						ui.refresh(_status.old_guhuoNode);
						_status.old_guhuoNode.style.transitionProperty = "";
					} else {
						_status.old_guhuoNode.classList.add("infohidden");
					}
					_status.old_guhuoNode.style.transform = "perspective(600px) rotateY(180deg) translateX(0)";
					player.$throwordered2(_status.old_guhuoNode);
				},
				trigger.cards[0],
				player
			);
			event.onEnd01 = function () {
				_status.old_guhuoNode.removeEventListener("webkitTransitionEnd", _status.event.onEnd01);
				setTimeout(function () {
					_status.old_guhuoNode.style.transition = "all ease-in 0.3s";
					_status.old_guhuoNode.style.transform = "perspective(600px) rotateY(270deg)";
					var onEnd = function () {
						_status.old_guhuoNode.classList.remove("infohidden");
						_status.old_guhuoNode.style.transition = "all 0s";
						ui.refresh(_status.old_guhuoNode);
						_status.old_guhuoNode.style.transform = "perspective(600px) rotateY(-90deg)";
						ui.refresh(_status.old_guhuoNode);
						_status.old_guhuoNode.style.transition = "";
						ui.refresh(_status.old_guhuoNode);
						_status.old_guhuoNode.style.transform = "";
						_status.old_guhuoNode.removeEventListener("webkitTransitionEnd", onEnd);
					};
					_status.old_guhuoNode.listenTransition(onEnd);
				}, 300);
			};
			if (!event.targets.length) event.goto(3);
			"step 1";
			event.target = event.targets.shift();
			event.target.chooseButton([event.prompt, [["reguhuo_ally", "reguhuo_betray"], "vcard"]], true).set("ai", function (button) {
				var player = _status.event.player;
				var evt = _status.event.getParent("old_guhuo_guess"),
					evtx = evt.getTrigger();
				if (!evt) return Math.random();
				var card = { name: evtx.card.name, nature: evtx.card.nature, isCard: true };
				var ally = button.link[2] == "reguhuo_ally";
				if (ally && (player.hp <= 1 || get.attitude(player, evt.player) >= 0)) return 1.1;
				if (!ally && get.effect(player, { name: "losehp" }, player, player) >= 0) return 10;
				if (!ally && get.attitude(player, evt.player) < 0) {
					if (evtx.name == "useCard") {
						var eff = 0;
						var targetsx = evtx.targets || [];
						for (var target of targetsx) {
							var isMe = target == evt.player;
							eff += get.effect(target, card, evt.player, player) / (isMe ? 1.35 : 1);
						}
						eff /= 1.5 * targetsx.length || 1;
						if (eff > 0) return 0;
						if (eff < -7) return (Math.random() + Math.pow(-(eff + 7) / 8, 2)) / Math.sqrt(evt.betrayers.length + 1) + (player.hp - 3) * 0.05 + Math.max(0, 4 - evt.player.hp) * 0.05 - (player.hp == 1 && !get.tag(card, "damage") ? 0.2 : 0);
						return Math.pow((get.value(card, evt.player, "raw") - 4) / (eff == 0 ? 3.1 : 10), 2) / Math.sqrt(evt.betrayers.length || 1) + (player.hp - 3) * 0.05 + Math.max(0, 4 - evt.player.hp) * 0.05;
					}
					if (evt.player.getStorage("old_guhuo_cheated").includes(card.name + card.nature)) return Math.random() + 0.3;
				}
				return Math.random();
			});
			"step 2";
			if (result.links[0][2] == "reguhuo_betray") {
				target.addExpose(0.2);
				game.log(target, "#y质疑");
				target.popup("质疑！", "fire");
				event.betrayers.push(target);
			} else {
				game.log(target, "#g不质疑");
				target.popup("不质疑", "wood");
			}
			if (targets.length) event.goto(1);
			"step 3";
			game.delayx();
			game.broadcastAll(function (onEnd) {
				_status.event.onEnd01 = onEnd;
				if (_status.old_guhuoNode) _status.old_guhuoNode.listenTransition(onEnd, 300);
			}, event.onEnd01);
			"step 4";
			game.delay(2);
			"step 5";
			if (!event.betrayers.length) {
				event.goto(7);
			}
			"step 6";
			if (event.fake) {
				for (var target of event.betrayers) {
					target.popup("质疑正确", "wood");
				}
				event.goon = false;
			} else {
				for (var target of event.betrayers) {
					target.popup("质疑错误", "fire");
					target.loseHp();
				}
				if (get.suit(trigger.cards[0], player) != "heart") {
					event.goon = false;
				}
			}
			"step 7";
			if (!event.goon) {
				game.log(player, "声明的", trigger.card, "作废了");
				trigger.cancel();
				trigger.getParent().goto(0);
				trigger.line = false;
			}
			"step 8";
			game.delay();
			"step 9";
			if (!event.goon) {
				if (event.fake) game.asyncDraw(event.betrayers);
				game.broadcastAll(ui.clear);
			}
		},
	},
	old_zuilun: {
		audio: "xinfu_zuilun",
		subSkill: {
			e: {},
			h: {},
		},
		enable: "phaseUse",
		usable: 2,
		filterTarget: function (card, player, target) {
			if (player == target) return false;
			var pos = "he";
			if (player.hasSkill("old_zuilun_h")) pos = "e";
			if (player.hasSkill("old_zuilun_e")) pos = "h";
			return target.countGainableCards(player, pos) > 0;
		},
		content: function () {
			"step 0";
			var pos = "he";
			if (player.hasSkill("old_zuilun_h")) pos = "e";
			if (player.hasSkill("old_zuilun_e")) pos = "h";
			player.gainPlayerCard(target, pos, true);
			"step 1";
			if (result.bool && result.cards && result.cards.length) {
				target.draw();
				var pos = result.cards[0].original;
				if (pos == "h" || pos == "e") player.addTempSkill("old_zuilun_" + pos, "phaseUseAfter");
			}
		},
		ai: {
			order: 7,
			result: {
				target: -1,
			},
		},
	},
	old_fuyin: {
		mod: {
			targetEnabled: function (card, player, target) {
				if ((card.name == "juedou" || card.name == "sha" || card.name == "huogong") && player != target && player.countCards("h") >= target.countCards("h") && target.hasEmptySlot(2)) return false;
			},
		},
	},
	old_jijun: {
		marktext: "方",
		audio: "xinfu_jijun",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		enable: "phaseUse",
		filterCard: true,
		selectCard: [1, Infinity],
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		check: function (card) {
			var player = _status.event.player;
			if (36 - player.getExpansions("old_jijun").length <= player.countCards("h")) return 1;
			return 5 - get.value(card);
		},
		discard: false,
		lose: false,
		content: function () {
			player.addToExpansion(cards, player, "give").gaintag.add("old_jijun");
		},
		ai: {
			order: 1,
			result: {
				player: 1,
			},
			combo: "old_fangtong",
		},
	},
	old_fangtong: {
		trigger: {
			player: "phaseJieshuBegin",
		},
		audio: "xinfu_fangtong",
		forced: true,
		skillAnimation: true,
		animationColor: "metal",
		filter: function (event, player) {
			return player.getExpansions("old_jijun").length > 35;
		},
		content: function () {
			var winners = player.getFriends();
			game.over(player == game.me || winners.includes(game.me));
		},
		ai: {
			combo: "oldjijun",
		},
	},
	oldanxu: {
		enable: "phaseUse",
		usable: 1,
		multitarget: true,
		audio: 2,
		filterTarget: function (card, player, target) {
			if (player == target) return false;
			var num = target.countCards("h");
			if (ui.selected.targets.length) {
				return num < ui.selected.targets[0].countCards("h");
			}
			var players = game.filterPlayer();
			for (var i = 0; i < players.length; i++) {
				if (num > players[i].countCards("h")) return true;
			}
			return false;
		},
		selectTarget: 2,
		content: function () {
			"step 0";
			var gainner, giver;
			if (targets[0].countCards("h") < targets[1].countCards("h")) {
				gainner = targets[0];
				giver = targets[1];
			} else {
				gainner = targets[1];
				giver = targets[0];
			}
			gainner.gainPlayerCard(giver, "h", true).set("visible", true);
			"step 1";
			if (result.bool && result.links.length && get.suit(result.links[0]) != "spade") {
				player.draw();
			}
		},
		ai: {
			order: 10.5,
			threaten: 2,
			result: {
				target: function (player, target) {
					var num = target.countCards("h");
					var att = get.attitude(player, target);
					if (ui.selected.targets.length == 0) {
						if (att > 0) return -1;
						var players = game.filterPlayer();
						for (var i = 0; i < players.length; i++) {
							var num2 = players[i].countCards("h");
							var att2 = get.attitude(player, players[i]);
							if (att2 >= 0 && num2 < num) return -1;
						}
						return 0;
					} else {
						return 1;
					}
				},
				player: 0.1,
			},
		},
	},
	oldfaen: {
		audio: "faen",
		trigger: { global: ["turnOverAfter", "linkAfter"] },
		filter: function (event, player) {
			if (event.name == "link") return event.player.isLinked();
			return true;
		},
		check: function (event, player) {
			return get.attitude(player, event.player) > 0;
		},
		logTarget: "player",
		content: function () {
			trigger.player.draw();
		},
		ai: {
			expose: 0.2,
		},
		global: "faen_global",
	},
	oldxuanfeng: {
		audio: "xuanfeng",
		trigger: {
			player: ["loseAfter"],
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		direct: true,
		filter: function (event, player) {
			var evt = event.getl(player);
			return evt && evt.es && evt.es.length > 0;
		},
		content: function () {
			"step 0";
			player
				.chooseTarget(get.prompt("oldxuanfeng"), function (card, player, target) {
					if (target == player) return false;
					return get.distance(player, target) <= 1 || player.canUse("sha", target, false);
				})
				.set("ai", function (target) {
					if (get.distance(player, target) <= 1) {
						return get.damageEffect(target, player, player) * 2;
					} else {
						return get.effect(target, { name: "sha" }, player, player);
					}
				});
			"step 1";
			if (result.bool) {
				player.logSkill("oldxuanfeng", result.targets);
				var target = result.targets[0];
				var distance = get.distance(player, target);
				if (distance <= 1 && player.canUse("sha", target, false)) {
					player.chooseControl("出杀", "造成伤害").set("ai", function () {
						return "造成伤害";
					});
					event.target = target;
				} else if (distance <= 1) {
					target.damage();
					event.finish();
				} else {
					player.useCard({ name: "sha", isCard: true }, target, false).animate = false;
					game.delay();
					event.finish();
				}
			} else {
				event.finish();
			}
			"step 2";
			var target = event.target;
			if (result.control == "出杀") {
				player.useCard({ name: "sha", isCard: true }, target, false).animate = false;
				game.delay();
			} else {
				target.damage();
			}
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (get.type(card) == "equip") return [1, 3];
				},
			},
			reverseEquip: true,
			noe: true,
		},
	},
};

export default skills;
