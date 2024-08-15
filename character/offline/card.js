import { lib, game, ui, get, ai, _status } from "../../noname.js";

const cards = {
	yanxiao_card: {
		type: "special_delay",
		fullimage: true,
		noEffect: true,
		ai: {
			basic: {
				order: 1,
				useful: 1,
				value: 8,
			},
			result: {
				target: 1,
			},
		},
	},
	jingxiangshengshi: {
		audio: true,
		fullskin: true,
		derivation: "shen_liubiao",
		type: "trick",
		enable: true,
		filterTarget: lib.filter.notMe,
		selectTarget() {
			return game.countGroup();
		},
		complexTarget: true,
		contentBefore() {
			if (!targets.length) {
				event.finish();
				return;
			}
			var num = game.countPlayer(), cards = get.cards(num);
			game.cardsGotoOrdering(cards).relatedEvent = event.getParent();
			var dialog = ui.create.dialog("荆襄盛世", cards, true);
			_status.dieClose.push(dialog);
			dialog.videoId = lib.status.videoId++;
			game.addVideo("cardDialog", null, ["荆襄盛世", get.cardsInfo(cards), dialog.videoId]);
			event.getParent().preResult = dialog.videoId;
			game.broadcast(
				function (cards, id) {
					var dialog = ui.create.dialog("荆襄盛世", cards, true);
					_status.dieClose.push(dialog);
					dialog.videoId = id;
				},
				cards,
				dialog.videoId
			);
			game.log(event.card, "亮出了", cards);
		},
		content() {
			"step 0";
			for (var i = 0; i < ui.dialogs.length; i++) {
				if (ui.dialogs[i].videoId == event.preResult) {
					event.dialog = ui.dialogs[i];
					break;
				}
			}
			if (!event.dialog || event.dialog.buttons.length == 0) {
				event.finish();
				return;
			}
			if (event.dialog.buttons.length > 1) {
				var next = target.chooseButton(true);
				next.set("ai", button => {
					let player = _status.event.player, card = button.link, val = get.value(card, player);
					if (get.tag(card, "recover")) {
						val += game.countPlayer(target => {
							return target.hp < 2 && get.attitude(player, target) > 0 && lib.filter.cardSavable(card, player, target);
						});
						if (player.hp <= 2 && game.checkMod(card, player, "unchanged", "cardEnabled2", player)) val *= 2;
					}
					return val;
				});
				next.set("dialog", event.preResult);
				next.set("closeDialog", false);
				next.set("dialogdisplay", true);
			} else {
				event.directButton = event.dialog.buttons[0];
			}
			"step 1";
			var dialog = event.dialog;
			var card;
			if (event.directButton) {
				card = event.directButton.link;
			} else {
				for (var i of dialog.buttons) {
					if (i.link == result.links[0]) {
						card = i.link;
						break;
					}
				}
				if (!card) card = event.dialog.buttons[0].link;
			}
			var button;
			for (var i = 0; i < dialog.buttons.length; i++) {
				if (dialog.buttons[i].link == card) {
					button = dialog.buttons[i];
					button.querySelector(".info").innerHTML = (function (target) {
						if (target._tempTranslate) return target._tempTranslate;
						var name = target.name;
						if (lib.translate[name + "_ab"]) return lib.translate[name + "_ab"];
						return get.translation(name);
					})(target);
					dialog.buttons.remove(button);
					break;
				}
			}
			var capt = get.translation(target) + "选择了" + get.translation(button.link);
			if (card) {
				target.gain(card, "visible");
				target.$gain2(card);
				game.broadcast(
					function (card, id, name, capt) {
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.content.firstChild.innerHTML = capt;
							for (var i = 0; i < dialog.buttons.length; i++) {
								if (dialog.buttons[i].link == card) {
									dialog.buttons[i].querySelector(".info").innerHTML = name;
									dialog.buttons.splice(i--, 1);
									break;
								}
							}
						}
					},
					card,
					dialog.videoId,
					(function (target) {
						if (target._tempTranslate) return target._tempTranslate;
						var name = target.name;
						if (lib.translate[name + "_ab"]) return lib.translate[name + "_ab"];
						return get.translation(name);
					})(target),
					capt
				);
			}
			dialog.content.firstChild.innerHTML = capt;
			game.addVideo("dialogCapt", null, [dialog.videoId, dialog.content.firstChild.innerHTML]);
			game.log(target, "选择了", button.link);
			game.delay();
		},
		contentAfter() {
			"step 0"
			event.remained = [];
			for (var i = 0; i < ui.dialogs.length; i++) {
				if (ui.dialogs[i].videoId == event.preResult) {
					var dialog = ui.dialogs[i];
					dialog.close();
					_status.dieClose.remove(dialog);
					if (dialog.buttons.length) {
						for (var i = 0; i < dialog.buttons.length; i++) {
							event.remained.push(dialog.buttons[i].link);
						}
					}
					break;
				}
			}
			game.broadcast(function (id) {
				var dialog = get.idDialog(id);
				if (dialog) {
					dialog.close();
					_status.dieClose.remove(dialog);
				}
			}, event.preResult);
			game.addVideo("cardDialog", null, event.preResult);
			"step 1"
			if (event.remained.length) player.gain(event.remained, "gain2");
		},
		//ai简略，待补充
		ai: {
			wuxie() {
				if (Math.random() < 0.5) return 0;
			},
			basic: {
				order: 3,
				useful: 0.5,
			},
			result: {
				player(player, target) {
					return game.countPlayer() / game.countGroup() - 1;
				},
				target(player, target) {
					return 1.8 / Math.sqrt(1 + get.distance(player, target, "absolute"));
				},
			},
			tag: {
				draw: 1,
				multitarget: 1,
			},
		},
	},
	xingbian: {
		audio: true,
		fullskin: true,
		derivation: "yj_tianchuan",
		type: "equip",
		skills: ["xingbian_skill"],
		async content(event, trigger, player) {
			if (!event.card.subtypes) {
				const choices = [];
				for (let i = 0; i <= 5; i++) {
					if (player.hasEquipableSlot(i)) choices.push(`equip${i}`);
				}
				if (!choices.length) return;
				const result = await player.chooseControl(choices)
					.set("prompt", "请选择置入【刑鞭】的装备栏")
					.set("ai", () => _status.event.controls.randomGet())
					.forResult();
				event.card.subtypes = [result.control];
			}
			if (
				!event.card?.cards.some(card => {
					return get.position(card, true) !== "o";
				})
			) {
				await event.target.equip(event.card);
			}
		},
		ai: {
			equipValue: function (card, player) {
				if (get.nameList(player).includes("yj_tianchuan")) {
					return 5;
				}
				return 0;
			},
			basic: {
				equipValue: 5,
			},
		},
	},
	tiejili: {
		fullskin: true,
		derivation: "ty_shamoke",
		type: "equip",
		subtype: "equip1",
		distance: {
			attackRange(card, player) {
				return player.storage.tiejili_skill || 2;
			},
			attackFrom: -1,
		},
		ai: {
			basic: {
				equipValue: 2,
			},
		},
		skills: ["tiejili_skill"],
		onLose() {
			delete player.storage.tiejili_skill;
			player.unmarkSkill("tiejili_skill");
		},
		onEquip() {
			if (!card.storage.tiejili_skill) card.storage.tiejili_skill = 2;
			player.storage.tiejili_skill = card.storage.tiejili_skill;
			player.markSkill("tiejili_skill");
		},
	},
	lx_huoshaolianying: {
		audio: true,
		fullskin: true,
		type: "trick",
		enable: true,
		filterTarget(card, player, target) {
			return target.countCards("he") > 0;
		},
		async content(event, trigger, player) {
			const target = event.target;
			if (target.countCards("he") == 0) return;
			let result;
			if (target.countCards("he") == 1) result = { cards: target.getCards("he") };
			else {
				result = await player
					.choosePlayerCard(target, true, "he")
					.set("ai", function (card) {
						if (_status.event.getRand() < 0.5) return Math.random();
						return get.value(card);
					})
					.forResult();
			}
			if (!result || !result.bool) return;
			await target.showCards(result.cards).setContent(function () { });
			event.dialog = ui.create.dialog(get.translation(target) + "展示的手牌", result.cards);
			event.videoId = lib.status.videoId++;

			game.broadcast(
				"createDialog",
				event.videoId,
				get.translation(target) + "展示的手牌",
				result.cards
			);
			game.addVideo("cardDialog", null, [
				get.translation(target) + "展示的手牌",
				get.cardsInfo(result.cards),
				event.videoId,
			]);
			game.log(target, "展示了", result.cards);
			game.addCardKnower(result.cards, "everyone");
			const result2 = await player
				.chooseToDiscard({ suit: get.suit(result.cards[0]) }, function (card) {
					var evt = _status.event.getParent();
					if (get.damageEffect(evt.target, evt.player, evt.player, "fire") > 0) {
						return 6.2 + Math.min(4, evt.player.hp) - get.value(card, evt.player);
					}
					return -1;
				})
				.set("prompt", false)
				.forResult();
			await game.delay();
			if (result2.bool) {
				await target.discard(result.cards);
				await target.damage("fire");
				if (target.isLinked() && event.cards?.someInD()) await player.gain(event.cards.filterInD(),"gain2");
			}
			else target.addTempSkill("huogong2");
			event.dialog.close();
			game.addVideo("cardDialog", null, event.videoId);
			game.broadcast("closeDialog", event.videoId);
		},
		ai: {
			basic: {
				order: 9.2,
				value: [3, 1],
				useful: 0.6,
			},
			wuxie: function (target, card, player, viewer, status) {
				if (get.attitude(viewer, player._trueMe || player) > 0) return 0;
				if (
					status *
					get.attitude(viewer, target) *
					get.effect(target, card, player, target) >=
					0
				)
					return 0;
				if (_status.event.getRand("huogong_wuxie") * 4 > player.countCards("h")) return 0;
			},
			result: {
				player: function (player) {
					var nh = player.countCards("h");
					if (nh <= player.hp && nh <= 4 && _status.event.name == "chooseToUse") {
						if (
							typeof _status.event.filterCard == "function" &&
							_status.event.filterCard(
								new lib.element.VCard({ name: "lx_huoshaolianying" }),
								player,
								_status.event
							)
						) {
							return -10;
						}
						if (_status.event.skill) {
							var viewAs = get.info(_status.event.skill).viewAs;
							if (viewAs == "lx_huoshaolianying") return -10;
							if (viewAs && viewAs.name == "huogong") return -10;
						}
					}
					return 0;
				},
				target: function (player, target) {
					if (target.hasSkill("huogong2") || target.countCards("h") == 0) return 0;
					if (player.countCards("h") <= 1) return 0;
					if (_status.event.player == player) {
						if (target.isAllCardsKnown(player)) {
							if (
								!target.countCards("h", (card) => {
									return player.countCards("h", (card2) => {
										return get.suit(card2) == get.suit(card);
									});
								})
							) {
								return 0;
							}
						}
					}
					if (target == player) {
						if (
							typeof _status.event.filterCard == "function" &&
							_status.event.filterCard(
								new lib.element.VCard({ name: "lx_huoshaolianying" }),
								player,
								_status.event
							)
						) {
							return -1.15;
						}
						if (_status.event.skill) {
							var viewAs = get.info(_status.event.skill).viewAs;
							if (viewAs == "lx_huoshaolianying") return -1.15;
							if (viewAs && viewAs.name == "lx_huoshaolianying") return -1.15;
						}
						return 0;
					}
					return -1.15;
				},
			},
			tag: {
				damage: 1,
				fireDamage: 1,
				natureDamage: 1,
				norepeat: 1,
			},
		},
	},
};
export default cards;
