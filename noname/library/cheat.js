export class Cheat {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static i() {
		window.cheat = lib.cheat;
		window.game = game;
		window.ui = ui;
		window.get = get;
		window.ai = ai;
		window.lib = lib;
		window._status = _status;
	}

	static dy() {
		var next = game.me.next;
		for (var i = 0; i < 10; i++) {
			if (next.identity != "zhu") {
				break;
			}
			next = next.next;
		}
		next.die();
	}

	static x() {
		var gl = function (dir, callback) {
			var files = [], folders = [];
			dir = "/Users/widget/Documents/extension/" + dir;
			lib.node.fs.readdir(dir, function (err, filelist) {
				for (var i = 0; i < filelist.length; i++) {
					if (filelist[i][0] != "." && filelist[i][0] != "_") {
						if (lib.node.fs.statSync(dir + "/" + filelist[i]).isDirectory()) {
							folders.push(filelist[i]);
						}
						else {
							files.push(filelist[i]);
						}
					}
				}
				callback(folders, files);
			});
		}
		var args = Array.from(arguments);
		for (var i = 0; i < args.length; i++) {
			args[i] = args[i][0];
		}
		gl("", function (list) {
			if (args.length) {
				for (var i = 0; i < list.length; i++) {
					if (!args.contains(list[i][0])) {
						list.splice(i--, 1);
					}
				}
			}
			if (list.length) {
				for (var i = 0; i < list.length; i++) {
					(function (str) {
						gl(str, function (folders, files) {
							if (files.length > 1) {
								for (var i = 0; i < files.length; i++) {
									if (files[i].includes("extension.js")) {
										files.splice(i--, 1);
									}
									else {
										if (i % 5 == 0) {
											str += "\n\t\t\t";
										}
										str += `"${files[i]}",`;
									}
								}
								console.log(str.slice(0, str.length - 1));
							}
						});
					}(list[i]));
				}
			}
		});
	}

	static cfg() {
		var mode = lib.config.all.mode.slice(0);
		mode.remove("connect");
		mode.remove("brawl");
		var banned = ["shen_guanyu", "shen_caocao", "caopi", "re_daqiao", "caorui",
			"daqiao", "lingcao", "liuzan", "lusu", "luxun", "yanwen", "zhouyu", "ns_wangyue", "gw_yenaifa",
			"old_caozhen", "swd_jiangziya", "xuhuang", "maliang", "guojia", "simayi", "swd_kangnalishi", "hs_siwangzhiyi", "hs_nozdormu", "old_zhuzhi"];
		var bannedcards = ["zengbin"];
		var favs = ["hs_tuoqi", "hs_siwangxianzhi", "hs_xukongzhiying", "hs_hsjiasha", "gjqt_xieyi", "gjqt_yunwuyue", "gjqt_beiluo",
			"gjqt_cenying", "shen_lvmeng", "shen_zhaoyun", "shen_zhugeliang", "ow_ana", "chenlin", "ns_guanlu", "hs_guldan", "swd_guyue",
			"pal_jiangyunfan", "mtg_jiesi", "swd_lanyin", "pal_liumengli", "swd_muyun", "pal_nangonghuang", "swd_muyue", "pal_murongziying",
			"swd_qiner", "pal_shenqishuang", "hs_taisi", "wangji", "pal_xingxuan", "xunyou", "hs_yelise", "pal_yuejinzhao", "pal_yueqi",
			"gjqt_yuewuyi", "swd_yuxiaoxue", "ow_zhaliya", "zhangchunhua", "hs_zhihuanhua", "swd_zhiyin", "old_zhonghui", "gjqt_bailitusu",
			"hs_barnes", "ow_dva", "swd_hengai", "pal_jushifang", "hs_kazhakusi", "hs_lafamu", "ow_liekong", "hs_lreno", "pal_mingxiu",
			"swd_murongshi", "gw_oudimu", "gjqt_ouyangshaogong", "hs_pyros", "qinmi", "gw_sanhanya", "hs_selajin", "swd_shuwaner",
			"swd_situqiang", "hs_xialikeer", "pal_xuejian", "swd_yuchiyanhong", "swd_yuwentuo", "swd_zhaoyun", "zhugeliang", "gw_aigeleisi",
			"gw_aimin", "gjqt_aruan", "hs_aya", "swd_cheyun", "swd_chenjingchou", "gw_diandian", "swd_huzhongxian", "hs_jinglinglong",
			"hs_kaituozhe", "hs_kalimosi", "gw_linjing", "ow_luxiao", "re_luxun", "hs_morgl", "swd_sikongyu", "hs_sthrall", "sunquan",
			"sunshangxiang", "gw_yioufeisisp", "gw_yisilinni", "hs_yogg", "hs_ysera", "pal_yuntianhe", "zhugejin", "zhugeke", "gw_zhuoertan",
			"hs_anduin", "swd_anka", "ow_banzang", "ow_chanyata", "diaochan", "swd_duguningke", "sp_diaochan", "hetaihou", "ns_huamulan",
			"swd_huanglei", "swd_huanyuanzhi", "re_huatuo", "gw_huoge", "pal_jiangcheng", "yj_jushou", "swd_kendi", "yxs_libai",
			"mtg_lilianna", "xin_liru", "liuxie", "pal_lixiaoyao", "pal_longkui", "ns_nanhua", "swd_qi", "swd_septem", "gw_shasixiwusi",
			"ow_tianshi", "swd_weida", "gjqt_xiayize", "swd_xiyan", "hs_xsylvanas", "hs_yelinlonghou", "ow_yuanshi", "zuoci"];
		var vintage = ["tianjian", "shuiyun", "zhuyue", "zhimeng", "poyun", "qianfang", "xfenxin", "danqing", "ywuhun", "tianwu", "xuelu",
			"shahun", "yuling", "duhun", "liaoyuan", "touxi", "wangchen", "poyue", "kunlunjing", "huanhun", "yunchou", "tuzhen", "cyqiaoxie",
			"mufeng", "duanyi", "guozao", "yaotong", "pozhen", "tanlin", "susheng", "jikong", "shouyin", "jilve", "hxunzhi", "huodan", "shanxian",
			"ziyu", "kuoyin", "feiren", "zihui", "jidong", "baoxue", "aqianghua", "maoding", "bfengshi", "zhongdun", "pingzhang", "maichong",
			"guozai", "jingxiang", "yuelu", "liechao", "fengnu", "hanshuang", "enze", "malymowang", "xshixin", "qingzun"];
		var favmodes = ["versus|three", "versus|four", "versus|two", "chess|combat"];
		for (var i = 0; i < mode.length; i++) {
			game.saveConfig(mode[i] + "_banned", banned);
			game.saveConfig(mode[i] + "_bannedcards", bannedcards);
		}
		var characters = lib.config.all.characters.slice(0);
		characters.remove("standard");
		characters.remove("old");
		game.saveConfig("vintageSkills", vintage);
		game.saveConfig("favouriteCharacter", favs);
		game.saveConfig("favouriteMode", favmodes);
		game.saveConfig("theme", "simple");
		game.saveConfig("player_border", "slim");
		game.saveConfig("cards", lib.config.all.cards);
		game.saveConfig("characters", characters);
		game.saveConfig("change_skin", false);
		game.saveConfig("show_splash", "off");
		game.saveConfig("show_favourite", false);
		game.saveConfig("animation", false);
		game.saveConfig("hover_all", false);
		game.saveConfig("asset_version", "v1.9");
		// game.saveConfig("characters",lib.config.all.characters);
		// game.saveConfig("cards",lib.config.all.cards);
		game.saveConfig("plays", ["cardpile"]);
		game.saveConfig("skip_shan", false);
		game.saveConfig("tao_enemy", true);
		game.saveConfig("layout", "long2");
		game.saveConfig("hp_style", "ol");
		game.saveConfig("background_music", "music_off");
		game.saveConfig("background_audio", false);
		game.saveConfig("background_speak", false);
		game.saveConfig("show_volumn", false);
		game.saveConfig("show_replay", true);
		game.saveConfig("autostyle", true);
		game.saveConfig("debug", true);
		game.saveConfig("dev", true);
		if (!lib.device) {
			game.saveConfig("sync_speed", false);
		}
		game.reload();
	}

	static o() {
		ui.arena.classList.remove("observe");
	}

	static pt() {
		var list = Array.from(arguments);
		while (list.length) {
			var card = cheat.gn(list.pop());
			if (card) ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
		}
	}

	static q() {
		if (arguments.length == 0) {
			var style = ui.css.card_style;
			if (lib.config.card_style != "simple") {
				lib.config.card_style = "simple";
				ui.css.card_style = lib.init.css(lib.assetURL + "theme/style/card", "simple");
			}
			else {
				lib.config.card_style = "default";
				ui.css.card_style = lib.init.css(lib.assetURL + "theme/style/card", "default");
			}
			style.remove();
		}
		else {
			for (var i = 0; i < arguments.length; i++) {
				cheat.g(arguments[i]);
			}
		}
		ui.arena.classList.remove("selecting");
		ui.arena.classList.remove("tempnoe");
	}

	static p(name, i, skin) {
		var list = ["swd", "hs", "pal", "gjqt", "ow", "gw"];
		if (!lib.character[name]) {
			for (var j = 0; j < list.length; j++) {
				if (lib.character[list[j] + "_" + name]) {
					name = list[j] + "_" + name; break;
				}
			}
		}
		if (skin) {
			lib.config.skin[name] = skin
		}
		var target;
		if (typeof i == "number") {
			target = game.players[i];
		}
		else {
			target = game.me.next;
		}
		if (!lib.character[name]) {
			target.node.avatar.setBackground(name, "character");
			target.node.avatar.show();
		}
		else {
			target.init(name);
		}
		if (i === true) {
			if (lib.config.layout == "long2") {
				lib.init.layout("mobile");
			}
			else {
				lib.init.layout("long2");
			}
		}
	}

	static e() {
		var cards = [], target;
		for (var i = 0; i < arguments.length; i++) {
			if (get.itemtype(arguments[i]) == "player") {
				target = arguments[i];
			}
			else {
				cards.push(game.createCard(arguments[i]));
			}
		}
		if (!cards.length) {
			cards.push(game.createCard("qilin"));
			cards.push(game.createCard("bagua"));
			cards.push(game.createCard("dilu"));
			cards.push(game.createCard("chitu"));
			cards.push(game.createCard("muniu"));
		}
		target = target || game.me;
		for (var i = 0; i < cards.length; i++) {
			var card = target.getEquip(cards[i]);
			if (card) {
				card.discard();
				target.removeEquipTrigger(card);
			}
			target.$equip(cards[i]);
		}
	}

	static c() {
		(function () {
			var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0;
			var sa = 0, sb = 0, sc = 0, sd = 0, se = 0, sf = 0, sg = 0;
			for (var i in lib.character) {
				switch (lib.character[i][1]) {
					case "wei": a++; if (lib.config.banned.contains(i)) sa++; break;
					case "shu": b++; if (lib.config.banned.contains(i)) sb++; break;
					case "wu": c++; if (lib.config.banned.contains(i)) sc++; break;
					case "qun": d++; if (lib.config.banned.contains(i)) sd++; break;
					case "jin": g++; if (lib.config.banned.contains(i)) sg++; break;
					case "western": e++; if (lib.config.banned.contains(i)) se++; break;
					case "key": f++; if (lib.config.banned.contains(i)) sf++; break;
				}
			}
			console.log("魏：" + (a - sa) + "/" + a);
			console.log("蜀：" + (b - sb) + "/" + b);
			console.log("吴：" + (c - sc) + "/" + c);
			console.log("群：" + (d - sd) + "/" + d);
			console.log("晋：" + (g - sg) + "/" + g);
			console.log("西：" + (e - se) + "/" + e);
			console.log("键：" + (f - sf) + "/" + f);
			console.log("已启用：" + ((a + b + c + d + e + f) - (sa + sb + sc + sd + se + sf)) + "/" + (a + b + c + d + e + f));
		}());
		(function () {
			var a = 0, b = 0, c = 0, d = 0;
			var aa = 0, bb = 0, cc = 0, dd = 0;
			var sa = 0, sb = 0, sc = 0, sd = 0;
			var sha = 0, shan = 0, tao = 0, jiu = 0, wuxie = 0, heisha = 0, hongsha = 0;
			var num = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 };
			for (var i in lib.card) {
				if (get.objtype(lib.card[i]) == "object" && lib.translate[i + "_info"]) {
					switch (lib.card[i].type) {
						case "basic": a++; break;
						case "trick": b++; break;
						case "equip": c++; break;
						default: d++; break;
					}
				}
			}
			for (var i = 0; i < lib.card.list.length; i++) {
				if (typeof lib.card[lib.card.list[i][2]] == "object") {
					switch (lib.card[lib.card.list[i][2]].type) {
						case "basic": aa++; break;
						case "trick": case "delay": bb++; break;
						case "equip": cc++; break;
						default: dd++; break;
					}
					switch (lib.card.list[i][0]) {
						case "heart": sa++; break;
						case "diamond": sb++; break;
						case "club": sc++; break;
						case "spade": sd++; break;
					}
					if (lib.card.list[i][2] == "sha") {
						sha++;
						if (lib.card.list[i][0] == "club" || lib.card.list[i][0] == "spade") {
							heisha++;
						}
						else {
							hongsha++;
						}
					}
					if (lib.card.list[i][2] == "shan") {
						shan++;
					}
					if (lib.card.list[i][2] == "tao") {
						tao++;
					}
					if (lib.card.list[i][2] == "jiu") {
						jiu++;
					}
					if (lib.card.list[i][2] == "wuxie") {
						wuxie++;
					}
					num[lib.card.list[i][1]]++;
				}
			}
			var str = "基本牌" + aa + "； " + "锦囊牌" + bb + "； " + "装备牌" + cc + "； " + "其它牌" + dd
			console.log(str);
			str = "红桃牌" + sa + "； " + "方片牌" + sb + "； " + "梅花牌" + sc + "； " + "黑桃牌" + sd
			console.log(str);
			str = "杀" + sha + "； " + "黑杀" + heisha + "； " + "红杀" + hongsha + "； " + "闪" + shan + "； " + "桃" + tao + "； " + "酒" + jiu + "； " + "无懈" + wuxie
			console.log(str);
			if (arguments[1]) {
				for (var i = 1; i <= 13; i++) {
					if (i < 10) {
						console.log(i + " ", num[i]);
					}
					else {
						console.log(i, num[i]);
					}
				}
			}
			var arr = [];
			for (var i = 1; i <= 13; i++) {
				arr.push(num[i]);
			}
			console.log((a + b + c + d) + "/" + (aa + bb + cc + dd), ...arr)
		}());
	}

	static id() {
		game.showIdentity();
	}

	static b() {
		if (!ui.dialog || !ui.dialog.buttons) return;
		for (var i = 0; i < Math.min(arguments.length, ui.dialog.buttons.length); i++) {
			ui.dialog.buttons[i].link = arguments[i];
		}
	}

	static uy(me) {
		if (me) {
			game.me.useCard({ name: "spell_yexinglanghun" }, game.me);
		}
		else {
			var enemy = game.me.getEnemy();
			enemy.useCard({ name: "spell_yexinglanghun" }, enemy);
		}
	}

	static gs(name, act) {
		var card = game.createCard("spell_" + (name || "yexinglanghun"));
		game.me.node.handcards1.appendChild(card);
		if (!act) {
			game.me.actused = -99;
		}
		ui.updatehl();
		delete _status.event._cardChoice;
		delete _status.event._targetChoice;
		delete _status.event._skillChoice;
		setTimeout(game.check, 300);
	}

	static gc(name, act) {
		var card = game.createCard("stone_" + (name || "falifulong") + "_stonecharacter");
		game.me.node.handcards1.appendChild(card);
		if (!act) {
			game.me.actused = -99;
		}
		ui.updatehl();
		delete _status.event._cardChoice;
		delete _status.event._targetChoice;
		delete _status.event._skillChoice;
		setTimeout(game.check, 300);
	}

	static a(bool) {
		if (lib.config.test_game) {
			game.saveConfig("test_game");
		}
		else {
			if (bool) {
				if (typeof bool === "string") {
					game.saveConfig("test_game", bool);
				}
				else {
					game.saveConfig("test_game", "_");
				}
			}
			else {
				game.saveConfig("test_game", true);
			}
		}
		game.reload();
	}

	static as() {
		ui.window.classList.remove("testing");
		var bg = ui.window.querySelector(".pausedbg");
		if (bg) {
			bg.remove();
		}
	}

	static uj() {
		cheat.e("qilin");
		game.me.next.useCard({ name: "jiedao" }, [game.me, game.me.previous]);
	}

	static u() {
		var card = { name: "sha" }, source = game.me.next, targets = [];
		for (var i = 0; i < arguments.length; i++) {
			if (get.itemtype(arguments[i]) == "player") {
				source = arguments[i];
			}
			else if (Array.isArray(arguments[i])) {
				targets = arguments[i];
			}
			else if (typeof arguments[i] == "object" && arguments[i]) {
				card = arguments[i];
			}
			else if (typeof arguments[i] == "string") {
				card = { name: arguments[i] }
			}
		}
		if (!targets.length) targets.push(game.me);
		source.useCard(game.createCard(card.name, card.suit, card.number, card.nature), targets);
	}

	static r(bool) {
		var list = ["s", "ap", "a", "am", "bp", "b", "bm", "c", "d"];
		var str = "";
		for (var i = 0; i < list.length; i++) {
			if (str) str += " 、 ";
			str += list[i] + "-" + lib.rank[list[i]].length;
		}
		console.log(str);
		for (var i in lib.characterPack) {
			if (!bool && lib.config.all.sgscharacters.contains(i)) continue;
			var map = {};
			var str = "";
			for (var j in lib.characterPack[i]) {
				var rank = get.rank(j);
				if (!map[rank]) {
					map[rank] = 1;
				}
				else {
					map[rank]++;
				}
			}
			for (var j = 0; j < list.length; j++) {
				if (map[list[j]]) {
					if (str) str += " 、 ";
					str += list[j] + "-" + map[list[j]];
				}
			}
			if (str) {
				console.log(lib.translate[i + "_character_config"] + "：" + str);
			}
		}

		var list = lib.rank.s.concat(lib.rank.ap).concat(lib.rank.a).concat(lib.rank.am).
			concat(lib.rank.bp).concat(lib.rank.b).concat(lib.rank.bm).concat(lib.rank.c).concat(lib.rank.d);
		Object.keys(lib.character).forEach(key => {
			if (!lib.config.forbidai.includes(key) && !key.startsWith("boss_") && !key.startsWith("tafang_") && !list.includes(key)) console.log(get.translation(key), key);
		});
	}

	static h(player) {
		console.log(get.translation(player.getCards("h")));
	}

	static g() {
		for (var i = 0; i < arguments.length; i++) {
			if (i > 0 && typeof arguments[i] == "number") {
				for (var j = 0; j < arguments[i] - 1; j++) {
					cheat.gx(arguments[i - 1]);
				}
			}
			else {
				cheat.gx(arguments[i]);
			}
		}
	}

	static ga(type) {
		for (var i in lib.card) {
			if (lib.card[i].type == type || lib.card[i].subtype == type) {
				cheat.g(i);
			}
		}
	}

	static gg() {
		for (var i = 0; i < game.players.length; i++) {
			for (var j = 0; j < arguments.length; j++) {
				cheat.gx(arguments[j], game.players[i]);
			}
		}
	}

	static gx(name, target) {
		target = target || game.me;
		var card = cheat.gn(name);
		if (!card) return;
		target.node.handcards1.appendChild(card);
		delete _status.event._cardChoice;
		delete _status.event._targetChoice;
		delete _status.event._skillChoice;
		game.check();
		target.update();
		ui.updatehl();
	}

	static gn(name) {
		var nature = null;
		var suit = null;
		var suits = ["club", "spade", "diamond", "heart"];
		for (var i = 0; i < suits.length; i++) {
			if (name.startsWith(suits[i])) {
				suit = suits[i];
				name = name.slice(suits[i].length);
				break;
			}
		}
		if (name.startsWith("red")) {
			name = name.slice(3);
			suit = ["diamond", "heart"].randomGet();
		}
		if (name.startsWith("black")) {
			name = name.slice(5);
			suit = ["spade", "club"].randomGet();
		}

		if (name == "huosha") {
			name = "sha";
			nature = "fire";
		}
		else if (name == "leisha") {
			name = "sha";
			nature = "thunder";
		}
		if (!lib.card[name]) {
			return null;
		}
		return game.createCard(name, suit, null, nature);
	}

	static ge(target) {
		if (target) {
			cheat.gx("zhuge", target);
			cheat.gx("qinglong", target);
			cheat.gx("bagua", target);
			cheat.gx("dilu", target);
			cheat.gx("chitu", target);
			cheat.gx("muniu", target);
		}
		else {
			cheat.g("zhuge");
			cheat.g("qinglong");
			cheat.g("bagua");
			cheat.g("dilu");
			cheat.g("chitu");
			cheat.g("muniu");
		}
	}

	static gj() {
		cheat.g("shandian");
		cheat.g("huoshan");
		cheat.g("hongshui");
		cheat.g("lebu");
		cheat.g("bingliang");
		cheat.g("guiyoujie");
	}

	static gf() {
		for (var i in lib.card) {
			if (lib.card[i].type == "food") {
				cheat.g(i);
			}
		}
	}

	static d(num, target) {
		if (num == undefined) num = 1;
		var cards = get.cards(num);
		for (var i = 0; i < num; i++) {
			var card = cards[i];
			game.me.node.handcards1.appendChild(card);
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			game.check();
			game.me.update();
			ui.updatehl();
		}
	}

	static s() {
		for (var i = 0; i < arguments.length; i++) {
			game.me.addSkill(arguments[i], true);
		}
		delete _status.event._cardChoice;
		delete _status.event._targetChoice;
		delete _status.event._skillChoice;
		game.check();
	}

	static t(num) {
		if (game.players.contains(num)) {
			num = game.players.indexOf(num);
		}
		if (num == undefined) {
			for (var i = 0; i < game.players.length; i++) cheat.t(i);
			return;
		}
		var player = game.players[num];
		var cards = player.getCards("hej");
		for (var i = 0; i < cards.length; i++) {
			cards[i].discard();
		}
		player.removeEquipTrigger();
		player.update();
	}

	static to() {
		for (var i = 0; i < game.players.length; i++) {
			if (game.players[i] != game.me) {
				cheat.t(i);
			}
		}
	}

	static tm() {
		for (var i = 0; i < game.players.length; i++) {
			if (game.players[i] == game.me) {
				cheat.t(i);
			}
		}
	}

	static k(i) {
		if (i == undefined) i = 1;
		game.players[i].hp = 1;
		cheat.t(i);
		cheat.g("juedou");
	}

	static z(name) {
		switch (name) {
			case "cc": name = "re_caocao"; break;
			case "lb": name = "re_liubei"; break;
			case "sq": name = "sunquan"; break;
			case "dz": name = "dongzhuo"; break;
			case "ys": name = "re_yuanshao"; break;
			case "zj": name = "sp_zhangjiao"; break;
			case "ls": name = "liushan"; break;
			case "sc": name = "sunce"; break;
			case "cp": name = "caopi"; break;
			case "cr": name = "caorui"; break;
			case "sx": name = "sunxiu"; break;
			case "lc": name = "liuchen"; break;
			case "sh": name = "sunhao"; break;
		}
		game.zhu.init(name);
		game.zhu.maxHp++;
		game.zhu.hp++;
		game.zhu.update();
	}
}
