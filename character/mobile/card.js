import { lib, game, ui, get, ai, _status } from "../../noname.js";

const cards = {
	ly_piliche: {
		fullskin: true,
		//vanish:true,
		derivation: "liuye",
		cardcolor: "diamond",
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -8 },
		skills: ["ly_piliche"],
		//destroy:'polu'
	},
	wolong_card: {
		type: "takaramono",
		fullskin: true,
		//derivation:"pangdegong",
	},
	fengchu_card: {
		type: "takaramono",
		fullskin: true,
		//derivation:"pangdegong",
	},
	xuanjian_card: {
		fullskin: true,
		type: "takaramono",
		//derivation:"pangdegong",
	},
	shuijing_card: {
		fullskin: true,
		type: "takaramono",
		//derivation:"pangdegong",
	},
	rewrite_bagua: {
		derivation: "majun",
		//cardimage:"bagua",
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		ai: {
			basic: {
				equipValue: 7.5,
			},
		},
		skills: ["rw_bagua_skill"],
	},
	rewrite_baiyin: {
		derivation: "majun",
		fullskin: true,
		//cardimage:"baiyin",
		type: "equip",
		subtype: "equip2",
		loseDelay: false,
		onLose: function () {
			player.addTempSkill("rw_baiyin_skill_lose");
		},
		skills: ["rw_baiyin_skill"],
		tag: {
			recover: 1,
		},
		ai: {
			order: 9.5,
			equipValue: function (card, player) {
				if (player.hp == player.maxHp) return 5;
				if (player.countCards("h", "rewrite_baiyin")) return 6;
				return 0;
			},
			basic: {
				equipValue: 5,
			},
		},
	},
	rewrite_lanyinjia: {
		derivation: "majun",
		//cardimage:"lanyinjia",
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ["rw_lanyinjia", "lanyinjia2"],
		ai: {
			equipValue: 6,
			basic: {
				equipValue: 1,
			},
		},
	},
	rewrite_renwang: {
		derivation: "majun",
		//cardimage:"renwang",
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ["rw_renwang_skill"],
		ai: {
			basic: {
				equipValue: 7.5,
			},
		},
	},
	rewrite_tengjia: {
		derivation: "majun",
		//cardimage:"tengjia",
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		//cardnature:"fire",
		ai: {
			equipValue: function (card, player) {
				if (player.hasSkillTag("maixie") && player.hp > 1) return 0;
				if (player.hasSkillTag("noDirectDamage")) return 10;
				if (get.damageEffect(player, player, player, "fire") >= 0) return 10;
				var num =
					3 -
					game.countPlayer(function (current) {
						return get.attitude(current, player) < 0;
					});
				if (player.hp == 1) num += 4;
				if (player.hp == 2) num += 1;
				if (player.hp == 3) num--;
				if (player.hp > 3) num -= 4;
				return num;
			},
			basic: {
				equipValue: 3,
			},
		},
		skills: ["rw_tengjia1", "rw_tengjia2", "rw_tengjia3", "rw_tengjia4"],
	},
	rewrite_zhuge: {
		derivation: "majun",
		//cardimage:"zhuge",
		distance: {
			attackFrom: -2,
		},
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		ai: {
			equipValue: function (card, player) {
				if (
					!game.hasPlayer(function (current) {
						return player.canUse("sha", current) && get.effect(current, { name: "sha" }, player, player) > 0;
					})
				) {
					return 1;
				}
				if (player.hasSha() && _status.currentPhase == player) {
					if (player.getEquip("zhuge") || player.getCardUsable("sha") == 0) {
						return 10;
					}
				}
				var num = player.countCards("h", "sha");
				if (num > 1) return 6 + num;
				return 3 + num;
			},
			basic: {
				equipValue: 5,
			},
			tag: {
				valueswap: 1,
			},
		},
		skills: ["rw_zhuge_skill"],
	},
};
export default cards;
