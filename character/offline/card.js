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
		audio:true,
		fullskin:true,
		type:"trick",
		enable:true,
		filterTarget:lib.filter.notMe,
		selectTarget(){
			return game.countGroup();
		},
		complexTarget:true,
		contentBefore(){
			if(!targets.length){
				event.finish();
				return;
			}
			var num = game.countPlayer(),cards = get.cards(num);
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
			if(event.remained.length) player.gain(event.remained, "gain2");
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
				target(player, target) {
					const att = get.attitude(player, target);
					return att > 0 ? att : -0.1;
				},
			},
			tag: {
				draw: 1,
				multitarget: 1,
			},
		},
	},
};
export default cards;
