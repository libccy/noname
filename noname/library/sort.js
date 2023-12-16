import { Game as game } from '../game.js';
import { Get as get } from '../get.js';
import { Library as lib } from '../library.js';
import { status as _status } from '../status.js';
export class Sort {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}
	static nature(a, b) {
		return (lib.nature.get(b) || 0) - (lib.nature.get(a) || 0);
	}
	static group(a, b) {
		const groupSort = function (group) {
			let base = 0;
			if (group == "wei") return base;
			if (group == "shu") return base + 1;
			if (group == "wu") return base + 2;
			if (group == "qun") return base + 3;
			if (group == "jin") return base + 4;
			if (group == "key") return base + 5;
			if (group == "western") return base + 6;
			if (group == "shen") return base + 7;
			if (group == "double") return base + 7;
			return base + 9;
		}
		return groupSort(a) - groupSort(b);
	}
	static character(a, b) {
		const groupSort = function (name) {
			const info = get.character(name);
			if (!info) return 7;
			let base = 0;
			if (get.is.double(name, true)) base = 9;
			const group = info[1];
			if (group == "shen") return base - 1;
			if (group == "wei") return base;
			if (group == "shu") return base + 1;
			if (group == "wu") return base + 2;
			if (group == "qun") return base + 3;
			if (group == "jin") return base + 4;
			if (group == "key") return base + 5;
			if (group == "western") return base + 6;
			return base + 7;
		}
		const del = groupSort(a) - groupSort(b);
		if (del != 0) return del;
		let aa = a, bb = b;
		if (a.includes("_")) {
			a = a.slice(a.indexOf("_") + 1);
		}
		if (b.includes("_")) {
			b = b.slice(b.indexOf("_") + 1);
		}
		if (a != b) {
			return a > b ? 1 : -1;
		}
		return aa > bb ? 1 : -1;
	}
	static card(a, b) {
		var typeSort = function (name) {
			var type = get.type(name);
			if (!type) return 10;
			if (type == "basic") return -1;
			if (type == "trick") return 0;
			if (type == "delay") return 1;
			if (type == "equip") {
				var type2 = get.subtype(name, false);
				if (type2 && type2.slice) return 1 + parseInt(type2.slice(5) || 7);
				return 8.5
			}
			return 9;
		}
		var del = typeSort(a) - typeSort(b);
		if (del != 0) return del;
		var aa = a, bb = b;
		if (a.includes("_")) {
			a = a.slice(a.indexOf("_") + 1);
		}
		if (b.includes("_")) {
			b = b.slice(b.indexOf("_") + 1);
		}
		if (a != b) {
			return a > b ? 1 : -1;
		}
		return aa > bb ? 1 : -1;
	}
	static random() {
		return (Math.random() - 0.5);
	}
	static seat(a, b) {
		var player = lib.tempSortSeat || _status.event.player;
		var delta = get.distance(player, a, "absolute") - get.distance(player, b, "absolute");
		if (delta) return delta;
		delta = parseInt(a.dataset.position) - parseInt(b.dataset.position);
		if (player.side == game.me.side) return delta;
		return -delta;
	}
	static position(a, b) {
		return parseInt(a.dataset.position) - parseInt(b.dataset.position);
	}
	static priority(a, b) {
		var i1 = get.info(a[0]), i2 = get.info(b[0]);
		if (i1.priority == undefined) i1.priority = 0;
		if (i2.priority == undefined) i2.priority = 0;
		if (i1.priority == i2.priority) {
			if (i1.forced == undefined && i2.forced == undefined) return 0;
			if (i1.forced && i2.forced) return 0;
			if (i1.forced) return 1;
			if (i2.forced) return -1;
		}
		return i2.priority - i1.priority;
	}
	static number(a, b) {
		return get.number(a) - get.number(b);
	}
	static number2(a, b) {
		return get.number(b) - get.number(a);
	}
	static capt(a, b) {
		var aa = a, bb = b;
		if (aa.includes("_")) {
			aa = aa.slice(aa.indexOf("_") + 1);
		}
		if (bb.includes("_")) {
			bb = bb.slice(bb.indexOf("_") + 1);
		}
		if (aa != bb) {
			return aa > bb ? 1 : -1;
		}
		return a > b ? 1 : -1;
	}
	static name(a, b) {
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	}
}
