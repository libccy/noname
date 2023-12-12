import { Game } from "../game.js";
import { Get } from "../get.js";
import { status } from "../status.js";
import { Click } from "../ui/click.js";
import { selected } from "../ui/selected.js";

export class Basic {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static chooseButton(check) {
		var event = status.event;
		var i, j, range, buttons, buttons2;
		var ok = false, forced = event.forced;
		var iwhile = 100;
		while (iwhile--) {
			range = Get.select(event.selectButton);
			if (selected.buttons.length >= range[0]) {
				ok = true;
			}
			if (range[1] <= -1) {
				j = 0;
				for (i = 0; i < selected.buttons.length; i++) {
					j += check(selected.buttons[i]);
				}
				return (j > 0);
			}
			buttons = Get.selectableButtons();
			if (buttons.length == 0) {
				return ok;
			}
			buttons2 = buttons.slice(0);
			var ix = 0;
			var checkix = check(buttons[0], buttons2);
			for (i = 1; i < buttons.length; i++) {
				var checkixtmp = check(buttons[i], buttons2);
				if (checkixtmp > checkix) {
					ix = i;
					checkix = checkixtmp;
				}
			}
			// buttons.sort(function(a,b){
			// 	return check(b,buttons2)-check(a,buttons2);
			// });
			if (check(buttons[ix]) <= 0) {
				if (!forced || ok) {
					return ok;
				}
			}
			buttons[ix].classList.add('selected');
			selected.buttons.add(buttons[ix]);
			Game.check();
			if (selected.buttons.length >= range[0]) {
				ok = true;
			}
			if (selected.buttons.length == range[1]) {
				return true;
			}
		}
	}

	static chooseCard(check) {
		var event = status.event;
		if (event.filterCard == undefined) return (check() > 0);
		var i, j, range, cards, cards2, skills, check, effect;
		var ok = false, forced = event.forced;
		var iwhile = 100;
		while (iwhile--) {
			range = Get.select(event.selectCard);
			if (selected.cards.length >= range[0]) {
				ok = true;
			}
			if (range[1] <= -1) {
				if (selected.cards.length == 0) return true;
				j = 0;
				for (i = 0; i < selected.cards.length; i++) {
					effect = check(selected.cards[i]);
					if (effect < 0) j -= Math.sqrt(-effect);
					else j += Math.sqrt(effect);
				}
				return (j > 0);
			}
			cards = Get.selectableCards();
			if (!status.event.player._noSkill) {
				cards = cards.concat(Get.skills());
			}
			if (cards.length == 0) {
				return ok;
			}
			cards2 = cards.slice(0);
			// cards.sort(function(a,b){
			// 	return (check(b,cards2)-check(a,cards2));
			// });
			var ix = 0;
			var checkix = check(cards[0], cards2);
			for (i = 1; i < cards.length; i++) {
				var checkixtmp = check(cards[i], cards2);
				if (checkixtmp > checkix) {
					ix = i;
					checkix = checkixtmp;
				}
			}
			if (check(cards[ix]) <= 0) {
				if (!forced || ok) {
					return ok;
				}
			}
			if (typeof cards[ix] == 'string') {
				Click.skill(cards[ix]);
				var info = Get.info(event.skill);
				if (info.filterCard) {
					check = info.check || Get.unuseful2;
					return (this.chooseCard(check));
				}
				else {
					return true;
				}
			}
			else {
				cards[ix].classList.add('selected');
				selected.cards.add(cards[ix]);
				Game.check();
				if (selected.cards.length >= range[0]) {
					ok = true;
				}
				if (selected.cards.length == range[1]) {
					return true;
				}
			}
		}
	}

	static chooseTarget(check) {
		var event = status.event;
		if (event.filterTarget == undefined) return (check() > 0);
		var i, j, range, targets, targets2, effect;
		var ok = false, forced = event.forced;
		var iwhile = 100;
		while (iwhile--) {
			range = Get.select(event.selectTarget);
			if (selected.targets.length >= range[0]) {
				ok = true;
			}
			if (range[1] <= -1) {
				j = 0;
				for (i = 0; i < selected.targets.length; i++) {
					effect = check(selected.targets[i]);
					if (effect < 0) j -= Math.sqrt(-effect);
					else j += Math.sqrt(effect);
				}
				return (j > 0);
			}
			else if (range[1] == 0) {
				return check() > 0
			}
			targets = Get.selectableTargets();
			if (targets.length == 0) {
				return range[0] == 0 || ok;
			}
			targets2 = targets.slice(0);
			// targets.sort(function(a,b){
			// 	return check(b)-check(a);
			// });
			var ix = 0;
			var checkix = check(targets[0], targets2);
			for (i = 1; i < targets.length; i++) {
				var checkixtmp = check(targets[i], targets2);
				if (checkixtmp > checkix) {
					ix = i;
					checkix = checkixtmp;
				}
			}
			if (check(targets[ix]) <= 0) {
				if (!forced || ok) {
					return ok;
				}
			}
			targets[ix].classList.add('selected');
			selected.targets.add(targets[ix]);
			Game.check();
			if (selected.targets.length >= range[0]) {
				ok = true;
			}
			if (selected.targets.length == range[1]) {
				return true;
			}
		}
	}
}
