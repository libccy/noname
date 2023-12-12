export const MODE = {
	identity: {
		name: "身份",
		connect: {
			update(config, map) {
				if (config.connect_identity_mode == "stratagem") {
					map.connect_round_one_use_fury.show();
				}
				else {
					map.connect_round_one_use_fury.hide();
				}
				if (config.connect_identity_mode == "zhong") {
					map.connect_player_number.hide();
					map.connect_limit_zhu.hide();
					map.connect_enhance_zhu.hide();
					map.connect_double_nei.hide();
					map.connect_enable_commoner.hide();
					map.connect_enable_year_limit.show();
					map.connect_zhong_card.show();
					map.connect_special_identity.hide();
					map.connect_double_character.show();
				}
				else if (config.connect_identity_mode == "stratagem") {
					map.connect_double_character.show();
					map.connect_player_number.show();
					map.connect_limit_zhu.hide();
					map.connect_enhance_zhu.hide();
					map.connect_double_nei.hide();
					map.connect_enable_commoner.hide();
					map.connect_enable_year_limit.show();
					map.connect_zhong_card.hide();
					map.connect_special_identity.hide();
				}
				else if (config.connect_identity_mode == "purple") {
					map.connect_player_number.hide();
					map.connect_limit_zhu.hide();
					map.connect_enhance_zhu.hide();
					map.connect_double_nei.hide();
					map.connect_enable_commoner.hide();
					map.connect_enable_year_limit.hide();
					map.connect_zhong_card.hide();
					map.connect_special_identity.hide();
					map.connect_double_character.hide();
				}
				else {
					map.connect_double_character.show();
					map.connect_player_number.show();
					map.connect_limit_zhu.show();
					map.connect_enhance_zhu.show();
					map.connect_double_nei[config.connect_player_number != "2" && !config.connect_enable_commoner ? "show" : "hide"]();
					map.connect_enable_commoner[config.connect_player_number != "2" && !config.connect_double_nei ? "show" : "hide"]();
					map.connect_enable_year_limit.show();
					map.connect_zhong_card.hide();

					if (config.connect_player_number == "8") {
						map.connect_special_identity.show();
					}
					else {
						map.connect_special_identity.hide();
					}
				}
			},
			connect_identity_mode: {
				name: "游戏模式",
				init: "normal",
				item: {
					normal: "标准",
					zhong: "明忠",
					stratagem: "谋攻",
					purple: "3v3v2",
				},
				restart: true,
				frequent: true,
				intro: "明忠模式和3v3v2模式详见帮助"
			},
			connect_player_number: {
				name: "游戏人数",
				init: "8",
				get item() {
					return lib.mode.identity.config.player_number.item;
				},
				frequent: true,
				restart: true,
			},
			connect_limit_zhu: {
				name: "常备主候选武将数",
				init: "group",
				restart: true,
				item: {
					off: "不限制",
					group: "按势力筛选",
					"4": "四",
					"6": "六",
					"8": "八",
				},
			},
			connect_zhong_card: {
				name: "明忠卡牌替换",
				init: true,
				frequent: true,
				restart: true
			},
			connect_double_nei: {
				name: "双内奸",
				init: false,
				restart: true,
				// frequent:true,
				get intro() {
					return lib.mode.identity.config.double_nei.intro;
				}
			},
			connect_enable_commoner: {
				name: "启用平民",
				init: false,
				restart: true,
				frequent: false,
				get intro() {
					return lib.mode.identity.config.enable_commoner.intro;
				}
			},
			connect_double_character: {
				name: "双将模式",
				init: false,
				frequent: true,
				restart: true,
			},
			connect_change_card: {
				name: "启用手气卡",
				init: false,
				frequent: true,
				restart: true,
			},
			connect_special_identity: {
				name: "特殊身份",
				init: false,
				restart: true,
				frequent: true,
				intro: "开启后游戏中将增加军师、大将、贼首三个身份"
			},
			connect_enable_year_limit: {
				name: "启用年机制",
				init: false,
				restart: true,
				frequent: false,
				get intro() {
					return lib.mode.identity.config.enable_year_limit.intro;
				}
			},
			connect_round_one_use_fury: {
				name: "开启首轮强化卡牌",
				init: false,
				frequent: false,
				restart: true,
				intro: "谋攻篇规则为第二轮开始才可使用怒气强化卡牌，开启此选项从游戏开始即可强化卡牌。"
			},
			connect_enhance_zhu: {
				name: "加强主公",
				init: false,
				restart: true,
				intro: "为主公增加一个额外技能"
			},
		},
		config: {
			update(config, map) {
				if (config.identity_mode == "stratagem") {
					map.round_one_use_fury.show();
					map.nei_auto_mark_camouflage.show();
				}
				else {
					map.round_one_use_fury.hide();
					map.nei_auto_mark_camouflage.hide();
				}
				if (config.identity_mode == "zhong") {
					map.player_number.hide();
					map.enhance_zhu.hide();
					map.double_nei.hide();
					map.auto_identity.hide();
					map.choice_zhu.hide();
					map.limit_zhu.hide();
					map.choice_zhong.hide();
					map.choice_nei.hide();
					map.choice_fan.hide();
					map.enable_commoner.hide();
					map.choice_commoner.hide();
					map.enable_year_limit.show();
					map.ban_identity.hide();
					map.ban_identity2.hide();
					map.ban_identity3.hide();
					map.zhong_card.show();
					map.special_identity.hide();
					map.choose_group.show();
					map.change_choice.show();
					map.auto_mark_identity.show();
					map.double_character.show();
					map.free_choose.show();
					map.change_identity.show();
					if (config.double_character) {
						map.double_hp.show();
					}
					else {
						map.double_hp.hide();
					}
					map.continue_game.show();
				}
				else if (config.identity_mode == "stratagem") {
					map.continue_game.show();
					map.player_number.show();
					map.enhance_zhu.hide();
					map.auto_identity.hide();
					if (config.player_number != "2") {
						map.double_nei.show();
					}
					else {
						map.double_nei.hide();
					}
					map.choice_zhu.show();
					map.limit_zhu.hide();
					map.choice_zhong.show();
					map.choice_nei.show();
					map.choice_fan.show();
					map.enable_commoner.hide();
					map.choice_commoner.hide();
					map.enable_year_limit.show();
					map.ban_identity.show();
					if (config.ban_identity == "off") {
						map.ban_identity2.hide();
					}
					else {
						map.ban_identity2.show();
					}
					if (config.ban_identity == "off" || config.ban_identity2 == "off") {
						map.ban_identity3.hide();
					}
					else {
						map.ban_identity3.show();
					}
					map.zhong_card.hide();
					map.choose_group.show();
					map.auto_mark_identity.hide();
					map.change_choice.show();
					map.free_choose.show();
					map.change_identity.show();
					map.special_identity.hide();
					map.double_character.show();
					if (config.double_character) {
						map.double_hp.show();
					}
					else {
						map.double_hp.hide();
					}
				}
				else if (config.identity_mode == "purple") {
					map.player_number.hide();
					map.enhance_zhu.hide();
					map.double_nei.hide();
					map.auto_identity.hide();
					map.choice_zhu.hide();
					map.limit_zhu.hide();
					map.choice_zhong.hide();
					map.choice_nei.hide();
					map.choice_fan.hide();
					map.enable_commoner.hide();
					map.choice_commoner.hide();
					map.enable_year_limit.hide();
					map.ban_identity.hide();
					map.ban_identity2.hide();
					map.ban_identity3.hide();
					map.zhong_card.hide();
					map.special_identity.hide();
					map.double_character.hide();
					map.double_hp.hide();
					map.choose_group.hide();
					map.auto_mark_identity.hide();
					map.change_choice.hide();
					map.free_choose.hide();
					map.change_identity.hide();
					map.continue_game.hide();
				}
				else {
					map.continue_game.show();
					map.player_number.show();
					map.enhance_zhu.show();
					map.auto_identity.show();
					map.double_nei[config.player_number != "2" && !config.enable_commoner ? "show" : "hide"]();
					map.choice_zhu.show();
					map.limit_zhu.show();
					map.choice_zhong.show();
					map.choice_nei.show();
					map.choice_fan.show();
					map.enable_commoner[config.player_number != "2" && !config.double_nei ? "show" : "hide"]();
					map.choice_commoner[config.enable_commoner ? "show" : "hide"]();
					map.enable_year_limit.show();
					map.ban_identity.show();
					if (config.ban_identity == "off") {
						map.ban_identity2.hide();
					}
					else {
						map.ban_identity2.show();
					}
					if (config.ban_identity == "off" || config.ban_identity2 == "off") {
						map.ban_identity3.hide();
					}
					else {
						map.ban_identity3.show();
					}
					map.zhong_card.hide();
					map.choose_group.show();
					map.auto_mark_identity.show();
					map.change_choice.show();
					map.free_choose.show();
					map.change_identity.show();
					if (config.player_number == "8") {
						map.special_identity.show();
					}
					else {
						map.special_identity.hide();
					}
					map.double_character.show();
					if (config.double_character) {
						map.double_hp.show();
					}
					else {
						map.double_hp.hide();
					}
				}
			},
			identity_mode: {
				name: "游戏模式",
				init: "normal",
				item: {
					normal: "标准",
					zhong: "明忠",
					stratagem: "谋攻",
					purple: "3v3v2",
				},
				restart: true,
				frequent: true,
				intro: "明忠模式与谋攻模式详见帮助"
			},
			player_number: {
				name: "游戏人数",
				init: "8",
				get item() {
					const minimumNumberOfPlayers = 2, maximumNumberOfPlayers = Math.max(_status.maximumNumberOfPlayers || 10, minimumNumberOfPlayers), item = {};
					for (let playerNumber = minimumNumberOfPlayers; playerNumber <= maximumNumberOfPlayers; playerNumber++) {
						item[playerNumber] = `${get.cnNumber(playerNumber)}人`;
					}
					return item;
				},
				frequent: true,
				restart: true,
			},
			double_nei: {
				name: "双内奸",
				init: false,
				restart: true,
				frequent: true,
				intro: "若游戏人数不大于9，则开启后游戏中将有两个内奸（内奸胜利条件仍为主内1v1时击杀主公）"
			},
			choose_group: {
				name: "神武将选择势力",
				init: true,
				restart: true,
				frequent: true,
				intro: "若开启此选项，选择神武将的玩家需在亮出自己的武将牌之前为自己选择一个势力。"
			},
			nei_fullscreenpop: {
				name: "主内单挑特效",
				intro: "在进入主内单挑时，弹出全屏文字特效",
				init: true,
				unfrequent: true,
			},
			double_character: {
				name: "双将模式",
				init: false,
				frequent: true,
				restart: true,
			},
			special_identity: {
				name: "特殊身份",
				init: false,
				restart: true,
				frequent: true,
				intro: "开启后游戏中将增加军师、大将、贼首三个身份"
			},
			zhong_card: {
				name: "明忠卡牌替换",
				init: true,
				frequent: true,
				restart: true
			},
			double_hp: {
				name: "双将体力上限",
				init: "pingjun",
				item: {
					hejiansan: "和减三",
					pingjun: "平均值",
					zuidazhi: "最大值",
					zuixiaozhi: "最小值",
					zonghe: "相加",
				},
				restart: true,
			},
			auto_identity: {
				name: "自动显示身份",
				item: {
					off: "关闭",
					one: "一轮",
					two: "两轮",
					three: "三轮",
					always: "始终"
				},
				init: "off",
				onclick(bool) {
					game.saveConfig("auto_identity", bool, this._link.config.mode);
					if (get.config("identity_mode") == "zhong") return;
					var num;
					switch (bool) {
						case "一轮": num = 1; break;
						case "两轮": num = 2; break;
						case "三轮": num = 3; break;
						default: num = 0; break;
					}
					if (num & !_status.identityShown && game.phaseNumber > game.players.length * num && game.showIdentity) {
						_status.identityShown = true;
						game.showIdentity(false);
					}
				},
				intro: "游戏进行若干轮将自动显示所有角色的身份",
			},
			auto_mark_identity: {
				name: "自动标记身份",
				init: true,
				intro: "根据角色的出牌行为自动标记可能的身份",
			},
			enhance_zhu: {
				name: "加强主公",
				init: false,
				restart: true,
				intro: "为主公增加一个额外技能"
			},
			free_choose: {
				name: "自由选将",
				init: true,
				onclick(bool) {
					game.saveConfig("free_choose", bool, this._link.config.mode);
					if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat2 && get.config("free_choose")) ui.create.cheat2();
					else if (ui.cheat2 && !get.config("free_choose")) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
				}
			},
			change_identity: {
				name: "自由选择身份和座位",
				init: true,
				onclick(bool) {
					game.saveConfig("change_identity", bool, this._link.config.mode);
					if (get.mode() != "identity" || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					var dialog;
					if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
					else dialog = _status.event.dialog;
					if (!_status.brawl || !_status.brawl.noAddSetting) {
						if (!dialog.querySelector("table") && get.config("change_identity")) _status.event.getParent().addSetting(dialog);
						else _status.event.getParent().removeSetting(dialog);
					}
					ui.update();
				}
			},
			change_choice: {
				name: "开启换将卡",
				init: true,
				onclick(bool) {
					game.saveConfig("change_choice", bool, this._link.config.mode);
					if (get.mode() != "identity" || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat && get.config("change_choice")) ui.create.cheat();
					else if (ui.cheat && !get.config("change_choice")) {
						ui.cheat.close();
						delete ui.cheat;
					}
				}
			},
			change_card: {
				name: "开启手气卡",
				init: "disabled",
				item: {
					disabled: "禁用",
					once: "一次",
					twice: "两次",
					unlimited: "无限",
				},
			},
			round_one_use_fury: {
				name: "开启首轮强化卡牌",
				init: false,
				frequent: false,
				restart: true,
				intro: "谋攻篇规则为第二轮开始才可使用怒气强化卡牌，开启此选项从游戏开始即可强化卡牌。"
			},
			nei_auto_mark_camouflage: {
				name: "内奸自动标记伪装反贼",
				intro: "玩家内奸在游戏开始洞察结束后，自动将被洞察角色标记为反贼。",
				init: false,
				unfrequent: true,
			},
			continue_game: {
				name: "显示再战",
				init: false,
				onclick(bool) {
					game.saveConfig("continue_game", bool, this._link.config.mode);
					if (get.config("continue_game") && get.mode() == "identity") {
						if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
							ui.continue_game = ui.create.control("再战", game.reloadCurrent);
						}
					}
					else if (ui.continue_game) {
						ui.continue_game.close();
						delete ui.continue_game;
					}
				},
				intro: "游戏结束后可选择用相同的武将再进行一局游戏"
			},
			dierestart: {
				name: "死亡后显示重来",
				init: true,
				onclick(bool) {
					game.saveConfig("dierestart", bool, this._link.config.mode);
					if (get.config("dierestart") && get.mode() == "identity") {
						if (!ui.restart && game.me.isDead() && !_status.connectMode) {
							ui.restart = ui.create.control("restart", game.reload);
						}
					}
					else if (ui.restart) {
						ui.restart.close();
						delete ui.restart;
					}
				}
			},
			revive: {
				name: "死亡后显示复活",
				init: false,
				onclick(bool) {
					game.saveConfig("revive", bool, this._link.config.mode);
					if (get.config("revive") && get.mode() == "identity") {
						if (!ui.revive && game.me.isDead()) {
							ui.revive = ui.create.control("revive", ui.click.dierevive);
						}
					}
					else if (ui.revive) {
						ui.revive.close();
						delete ui.revive;
					}
				}
			},
			ban_identity: {
				name: "屏蔽身份",
				init: "off",
				item: {
					off: "关闭",
					zhu: "主公",
					zhong: "忠臣",
					nei: "内奸",
					fan: "反贼",
				},
			},
			ban_identity2: {
				name: "屏蔽身份2",
				init: "off",
				item: {
					off: "关闭",
					zhu: "主公",
					zhong: "忠臣",
					nei: "内奸",
					fan: "反贼",
				},
			},
			ban_identity3: {
				name: "屏蔽身份3",
				init: "off",
				item: {
					off: "关闭",
					zhu: "主公",
					zhong: "忠臣",
					nei: "内奸",
					fan: "反贼",
				},
			},
			ai_strategy: {
				name: "内奸策略",
				init: "ai_strategy_1",
				item: {
					ai_strategy_1: "均衡",
					ai_strategy_2: "偏反",
					ai_strategy_3: "偏忠",
					ai_strategy_4: "酱油",
					ai_strategy_5: "天使",
					ai_strategy_6: "仇主",
				},
				intro: "设置内奸对主忠反的态度"
			},
			difficulty: {
				name: "AI对人类态度",
				init: "normal",
				item: {
					easy: "友好",
					normal: "一般",
					hard: "仇视",
				},
			},
			choice_zhu: {
				name: "主公候选武将数",
				init: "3",
				restart: true,
				item: {
					"3": "三",
					"4": "四",
					"5": "五",
					"6": "六",
					"8": "八",
					"10": "十",
				},
			},
			limit_zhu: {
				name: "常备主候选武将数",
				init: "group",
				restart: true,
				item: {
					off: "不限制",
					group: "按势力筛选",
					"4": "四",
					"6": "六",
					"8": "八",
				},
			},
			choice_zhong: {
				name: "忠臣候选武将数",
				init: "4",
				restart: true,
				item: {
					"3": "三",
					"4": "四",
					"5": "五",
					"6": "六",
					"8": "八",
					"10": "十",
				},
			},
			choice_nei: {
				name: "内奸候选武将数",
				init: "5",
				restart: true,
				item: {
					"3": "三",
					"4": "四",
					"5": "五",
					"6": "六",
					"8": "八",
					"10": "十",
				},
			},
			choice_fan: {
				name: "反贼候选武将数",
				init: "3",
				restart: true,
				item: {
					"3": "三",
					"4": "四",
					"5": "五",
					"6": "六",
					"8": "八",
					"10": "十",
				},
			},
			enable_commoner: {
				name: "启用平民",
				init: false,
				restart: true,
				frequent: false,
				intro: "开启后游戏中将有一个平民（身份）加入游戏。<br>具体规则请查看帮助。",
			},
			choice_commoner: {
				name: "平民候选武将数",
				init: "4",
				restart: true,
				item: {
					"3": "三",
					"4": "四",
					"5": "五",
					"6": "六",
					"8": "八",
					"10": "十",
				},
			},
			enable_year_limit: {
				name: "启用年机制",
				init: false,
				restart: true,
				frequent: false,
				intro: "开启后将会加入年机制。<br>年机制的具体规则请查看帮助。",
			},
		}
	},
	guozhan: {
		name: "国战",
		connect: {
			connect_guozhan_mode: {
				name: "游戏模式",
				init: "normal",
				item: {
					normal: "势备",
					yingbian: "应变",
					old: "怀旧",
				},
				frequent: true,
				restart: true,
				intro: "<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。",
			},
			connect_player_number: {
				name: "游戏人数",
				init: "8",
				get item() {
					return lib.mode.guozhan.config.player_number.item;
				},
				frequent: true,
				restart: true,
			},
			connect_aozhan: {
				name: "鏖战模式",
				init: true,
				intro: "若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。",
				frequent: true,
				restart: true,
			},
			get connect_separatism() {
				return lib.mode.guozhan.config.separatism;
			},
			connect_initshow_draw: {
				name: "首亮奖励",
				item: {
					"off": "关闭",
					"draw": "摸牌",
					"mark": "标记",
				},
				init: "mark",
				frequent: true,
				intro: "第一个明置武将牌的角色可获得首亮奖励"
			},
			connect_viewnext: {
				name: "观看下家副将",
				init: false,
				intro: "若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。",
			},
			connect_zhulian: {
				name: "珠联璧合",
				init: true,
				intro: "主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记"
			},
			connect_junzhu: {
				name: "替换君主",
				init: true,
				restart: true,
				intro: "若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。"
			},
			connect_change_card: {
				name: "启用手气卡",
				init: false,
				frequent: true,
				restart: true,
			}
		},
		config: {
			update(config, map) {
				if (config.onlyguozhan) {
					map.junzhu.show();
				}
				else {
					map.junzhu.hide();
				}
				ui.aozhan_bgm = map.aozhan_bgm;
				map.aozhan_bgm._link.config.updatex.call(map.aozhan_bgm, []);
			},
			guozhan_mode: {
				name: "游戏模式",
				init: "normal",
				item: {
					normal: "势备",
					yingbian: "应变",
					old: "怀旧",
					free: "自由",
				},
				frequent: true,
				restart: true,
				intro: "<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。<br><li>自由：使用玩家的自定义牌堆进行游戏。",
			},
			player_number: {
				name: "游戏人数",
				init: "8",
				get item() {
					const minimumNumberOfPlayers = 2, maximumNumberOfPlayers = Math.max(_status.maximumNumberOfPlayers || 12, minimumNumberOfPlayers), item = {};
					for (let playerNumber = minimumNumberOfPlayers; playerNumber <= maximumNumberOfPlayers; playerNumber++) {
						item[playerNumber] = `${get.cnNumber(playerNumber)}人`;
					}
					return item;
				},
				frequent: true,
				restart: true,
			},
			aozhan: {
				name: "鏖战模式",
				init: true,
				frequent: true,
				restart: true,
				intro: "若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。",
			},
			separatism: {
				name: "群雄割据",
				init: false,
				frequent: true,
				restart: true,
				intro: "开放不同势力组合，以优先亮出的武将牌作为自己的势力，双势力武将则使用列表的第一个势力"
			},
			initshow_draw: {
				name: "首亮奖励",
				item: {
					"off": "关闭",
					"draw": "摸牌",
					"mark": "标记",
				},
				init: "mark",
				frequent: true,
				intro: "第一个明置身份牌的角色可获得摸牌奖励"
			},
			viewnext: {
				name: "观看下家副将",
				init: false,
				intro: "若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。",
			},
			aozhan_bgm: {
				updatex() {
					this.lastChild.innerHTML = this._link.config.item[lib.config.mode_config.guozhan.aozhan_bgm];
					if (!Array.isArray(_status.aozhanBGMToRemove)) return;
					const menu = this._link.menu;
					for (let i = 0; i < menu.childElementCount; i++) {
						const link = menu.childNodes[i]._link;
						if (["disabled", "random"].includes(link) || !_status.aozhanBGMToRemove.includes(link)) continue;
						_status.aozhanBGMToRemove.remove(link);
						menu.childNodes[i].delete();
					}
				},
				name: "鏖战背景音乐",
				item: {
					disabled: "不启用",
					online: "Online",
					rewrite: "Rewrite",
					chaoming: "潮鸣",
					random: "随机播放",
				},
				init: "rewrite",
				onclick(item) {
					game.saveConfig("aozhan_bgm", item, this._link.config.mode);
					if (_status._aozhan == true) game.playBackgroundMusic();
				},
			},
			zhulian: {
				name: "珠联璧合",
				init: true,
				// frequent:true,
				intro: "主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记"
			},
			changeViceType: {
				name: "副将变更方式",
				init: "default",
				item: {
					default: "发现式",
					online: "随机式",
				},
				frequent: true,
				restart: true,
			},
			onlyguozhan: {
				name: "使用国战武将",
				init: true,
				frequent: true,
				restart: true,
				intro: "开启武将技能将替换为国战版本并禁用非国战武将"
			},
			guozhanSkin: {
				name: "使用国战皮肤",
				init: true,
				frequent: true,
				restart: true,
				intro: "开启此选项后，将会把有国战专属皮肤的武将替换为国战皮肤"
			},
			junzhu: {
				name: "替换君主",
				init: true,
				// frequent:true,
				restart: true,
				intro: "若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。"
			},
			double_hp: {
				name: "双将体力上限",
				init: "pingjun",
				item: {
					hejiansan: "和减三",
					pingjun: "平均值",
					zuidazhi: "最大值",
					zuixiaozhi: "最小值",
					zonghe: "相加",
				},
				restart: true,
			},
			free_choose: {
				name: "自由选将",
				init: true,
				onclick(bool) {
					game.saveConfig("free_choose", bool, this._link.config.mode);
					if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat2 && get.config("free_choose")) ui.create.cheat2();
					else if (ui.cheat2 && !get.config("free_choose")) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
				}
			},
			onlyguozhanexpand: {
				name: "默认展开自由选将",
				init: false,
				restart: true,
				intro: "开启后自由选将对话框将默认显示全部武将"
			},
			change_identity: {
				name: "自由选择座位",
				init: true,
				onclick(bool) {
					game.saveConfig("change_identity", bool, this._link.config.mode);
					if (get.mode() != "guozhan" || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					var dialog;
					if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
					else dialog = _status.event.dialog;
					if (!_status.brawl || !_status.brawl.noAddSetting) {
						if (!dialog.querySelector("table") && get.config("change_identity")) _status.event.getParent().addSetting(dialog);
						else _status.event.getParent().removeSetting(dialog);
					}
					ui.update();
				}
			},
			change_choice: {
				name: "开启换将卡",
				init: true,
				onclick(bool) {
					game.saveConfig("change_choice", bool, this._link.config.mode);
					if (get.mode() != "guozhan" || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat && get.config("change_choice")) ui.create.cheat();
					else if (ui.cheat && !get.config("change_choice")) {
						ui.cheat.close();
						delete ui.cheat;
					}
				}
			},
			change_card: {
				name: "开启手气卡",
				init: "disabled",
				item: {
					disabled: "禁用",
					once: "一次",
					twice: "两次",
					unlimited: "无限",
				}
			},
			continue_game: {
				name: "显示再战",
				init: true,
				intro: "游戏结束后可选择用相同的武将再进行一局游戏",
				onclick(bool) {
					game.saveConfig("continue_game", bool, this._link.config.mode);
					if (get.config("continue_game") && get.mode() == "guozhan") {
						if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
							ui.continue_game = ui.create.control("再战", game.reloadCurrent);
						}
					}
					else if (ui.continue_game) {
						ui.continue_game.close();
						delete ui.continue_game;
					}
				}
			},
			dierestart: {
				name: "死亡后显示重来",
				init: true,
				onclick(bool) {
					game.saveConfig("dierestart", bool, this._link.config.mode);
					if (get.config("dierestart") && get.mode() == "guozhan") {
						if (!ui.restart && game.me.isDead() && !_status.connectMode) {
							ui.restart = ui.create.control("restart", game.reload);
						}
					}
					else if (ui.restart) {
						ui.restart.close();
						delete ui.restart;
					}
				}
			},
			revive: {
				name: "死亡后显示复活",
				init: false,
				onclick(bool) {
					game.saveConfig("revive", bool, this._link.config.mode);
					if (get.config("revive") && get.mode() == "guozhan") {
						if (!ui.revive && game.me.isDead()) {
							ui.revive = ui.create.control("revive", ui.click.dierevive);
						}
					}
					else if (ui.revive) {
						ui.revive.close();
						delete ui.revive;
					}
				}
			},
			difficulty: {
				name: "AI对人类态度",
				init: "normal",
				item: {
					easy: "友好",
					normal: "一般",
					hard: "仇视",
				}
			},
			choice_num: {
				name: "候选武将数",
				init: "7",
				restart: true,
				item: {
					"5": "五",
					"6": "六",
					"7": "七",
					"8": "八",
					"9": "九",
					"10": "十",
				}
			},
		}
	},
	versus: {
		name: "对决",
		connect: {
			update(config, map) {
				if (config.connect_versus_mode == "1v1") {
					map.connect_choice_num.show();
					map.connect_replace_number.show();
				}
				else {
					map.connect_choice_num.hide();
					map.connect_replace_number.hide();
				}
				if (config.connect_versus_mode == "2v2" || config.connect_versus_mode == "3v3") {
					map.connect_replace_handcard.show();
				}
				else {
					map.connect_replace_handcard.hide();
				}
			},
			connect_versus_mode: {
				name: "游戏模式",
				init: "1v1",
				item: {
					"1v1": "1v1",
					"2v2": "2v2",
					"3v3": "3v3",
					"4v4": "4v4",
					"guandu": "官渡",
				},
				frequent: true
			},
			connect_replace_handcard: {
				name: "四号位保护",
				init: true,
				frequent: true,
				intro: "最后行动的角色起始手牌数+1"
			},
			connect_olfeiyang_four: {
				name: "四号位获得【飞扬】",
				init: true,
				frequent: true,
				intro: "最后行动的角色获得技能【飞扬】（准备阶段，你可以弃置三张牌，然后弃置判定区的一张牌）",
			},
			connect_choice_num: {
				name: "侯选武将数",
				init: "20",
				frequent: true,
				item: {
					"12": "12人",
					"16": "16人",
					"20": "20人",
					"24": "24人",
					"40": "40人",
				}
			},
			connect_replace_number: {
				name: "替补人数",
				init: "2",
				frequent: true,
				item: {
					"0": "无",
					"1": "1人",
					"2": "2人",
					"3": "3人",
					"4": "4人",
					"5": "5人",
				}
			}
		},
		config: {
			update(config, map) {
				if (config.versus_mode == "four") {
					map.change_choice.hide();
					map.ladder.show();
					if (config.ladder) {
						map.ladder_monthly.show();
						map.ladder_reset.show();
					}
					else {
						map.ladder_monthly.hide();
						map.ladder_reset.hide();
					}
					map.enable_all.show();
					map.enable_all_cards_four.show();
					map.four_assign.show();
					map.four_phaseswap.show();
					map.expand_dialog.show();
					map.fouralign.show();
					map.edit_character_four.show();
					map.reset_character_four.show();
				}
				else {
					map.change_choice.show();
					map.ladder.hide();
					map.ladder_monthly.hide();
					map.ladder_reset.hide();
					map.enable_all.hide();
					map.enable_all_cards_four.hide();
					map.four_assign.hide();
					map.four_phaseswap.hide();
					map.expand_dialog.hide();
					map.fouralign.hide();
					map.edit_character_four.hide();
					map.reset_character_four.hide();
				}
				if (config.versus_mode == "three") {
					map.edit_character_three.show();
					map.reset_character_three.show();
				}
				else {
					map.edit_character_three.hide();
					map.reset_character_three.hide();
				}
				if (config.versus_mode == "three" || config.versus_mode == "one") {
					map.enable_all_three.show();
					map.enable_all_cards.show();
				}
				else {
					map.enable_all_three.hide();
					map.enable_all_cards.hide();
				}
				if (config.versus_mode == "jiange" || config.versus_mode == "two" || config.versus_mode == "endless" ||
					config.versus_mode == "three" || config.versus_mode == "one" || config.versus_mode == "siguo") {
					map.free_choose.show();
				}
				else {
					map.free_choose.hide();
				}
				if (config.versus_mode == "jiange") {
					map.double_character_jiange.show();
				}
				else {
					map.double_character_jiange.hide();
				}
				if (config.versus_mode == "two") {
					map.replace_handcard_two.show();
					map.olfeiyang_four.show();
					map.replace_character_two.show();
					map.two_assign.show();
					map.two_phaseswap.show();
				}
				else {
					map.replace_handcard_two.hide();
					map.olfeiyang_four.hide();
					map.replace_character_two.hide();
					map.two_assign.hide();
					map.two_phaseswap.hide();
				}
				if (config.versus_mode == "two" || config.versus_mode == "siguo" || config.versus_mode == "four") {
					if (config.versus_mode == "four" && (config.four_assign || config.four_phaseswap)) {
						map.change_identity.hide();
					}
					else {
						map.change_identity.show();
					}
				}
				else {
					map.change_identity.hide();
				}
				if (config.versus_mode == "siguo") {
					map.siguo_character.show();
				}
				else {
					map.siguo_character.hide();
				}
			},
			versus_mode: {
				name: "游戏模式",
				init: "four",
				item: {
					four: "对抗",
					three: "统率",
					two: "欢乐",
					guandu: "官渡",
					jiange: "剑阁",
					siguo: "四国",
					standard: "自由"
				},
				restart: true,
				frequent: true,
			},
			ladder: {
				name: "天梯模式",
				init: true,
				frequent: true,
				restart: true
			},
			ladder_monthly: {
				name: "每月重置天梯",
				init: true,
				frequent: true,
			},
			enable_all: {
				name: "启用全部武将",
				init: false,
				frequent: true,
				restart: true,
			},
			enable_all_cards_four: {
				name: "启用全部卡牌",
				init: false,
				frequent: true,
				restart: true,
			},
			enable_all_three: {
				name: "启用全部武将",
				init: false,
				frequent: true,
				restart: true,
			},
			enable_all_cards: {
				name: "启用全部卡牌",
				init: false,
				frequent: true,
				restart: true,
			},
			four_assign: {
				name: "代替队友选将",
				init: false,
				restart: true,
			},
			four_phaseswap: {
				name: "代替队友行动",
				init: false,
				restart: true,
			},
			two_assign: {
				name: "代替队友选将",
				init: false,
				restart: true,
			},
			two_phaseswap: {
				name: "代替队友行动",
				init: false,
				restart: true,
			},
			free_choose: {
				name: "自由选将",
				init: true,
				frequent: true,
				onclick(bool) {
					game.saveConfig("free_choose", bool, this._link.config.mode);
					if (!ui.create.cheat2) return;
					if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat2 && get.config("free_choose")) ui.create.cheat2();
					else if (ui.cheat2 && !get.config("free_choose")) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
				}
			},
			fouralign: {
				name: "自由选择阵型",
				init: false
			},
			change_identity: {
				name: "自由选择座位",
				init: true,
				onclick(bool) {
					game.saveConfig("change_identity", bool, this._link.config.mode);
					if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (_status.mode == "four") {
						if (get.config("four_assign") || get.config("four_phaseswap")) return;
						if (bool) {
							if (_status.event.parent.addSetting) {
								_status.event.parent.addSetting();
							}
						}
						else {
							var seats = _status.event.parent.seatsbutton;
							if (seats) {
								while (seats.length) {
									seats.shift().remove();
								}
								delete _status.event.parent.seatsbutton;
							}
						}
					}
					else {
						var dialog;
						if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
						else dialog = _status.event.dialog;
						if (!_status.brawl || !_status.brawl.noAddSetting) {
							if (!dialog.querySelector("table") && get.config("change_identity")) _status.event.getParent().addSetting(dialog);
							else _status.event.getParent().removeSetting(dialog);
						}
						ui.update();
					}
				}
			},
			change_choice: {
				name: "开启换将卡",
				init: true,
				onclick(bool) {
					game.saveConfig("change_choice", bool, this._link.config.mode);
					if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat && get.config("change_choice")) ui.create.cheat();
					else if (ui.cheat && !get.config("change_choice")) {
						ui.cheat.close();
						delete ui.cheat;
					}
				},
				frequent: true,
			},
			double_character_jiange: {
				name: "双将模式",
				init: false,
				frequent: true,
			},
			replace_handcard_two: {
				name: "四号位保护",
				init: true,
				frequent: true,
				intro: "最后行动的角色起始手牌+1"
			},
			olfeiyang_four: {
				name: "四号位获得【飞扬】",
				init: true,
				frequent: true,
				intro: "最后行动的角色获得技能【飞扬】（准备阶段，你可以弃置三张牌，然后弃置判定区的一张牌）",
			},
			replace_character_two: {
				name: "替补模式",
				init: false,
				frequent: true,
				intro: "每个额外选择一名武将，死亡后用该武将代替重新上场，替补武将用完时失败"
			},
			expand_dialog: {
				name: "默认展开选将框",
				intro: "选将框打开时直接显示全部武将（可能使游戏在开始时卡顿）",
				init: false,
			},
			siguo_character: {
				name: "专属武将出场率",
				init: "increase",
				item: {
					increase: "大概率",
					normal: "默认概率",
					off: "不出现",
				},
				frequent: true
			},
			ladder_reset: {
				name: "重置天梯数据",
				onclick() {
					var node = this;
					if (node._clearing) {
						game.save("ladder", {
							current: 900,
							top: 900,
							month: (new Date()).getMonth()
						});
						ui.ladder.innerHTML = "卫士五";
						clearTimeout(node._clearing);
						node.firstChild.innerHTML = "重置天梯数据";
						delete node._clearing;
						return;
					}
					node.firstChild.innerHTML = "单击以确认 (3)";
					node._clearing = setTimeout(function () {
						node.firstChild.innerHTML = "单击以确认 (2)";
						node._clearing = setTimeout(function () {
							node.firstChild.innerHTML = "单击以确认 (1)";
							node._clearing = setTimeout(function () {
								node.firstChild.innerHTML = "重置天梯数据";
								delete node._clearing;
							}, 1000);
						}, 1000);
					}, 1000);
				},
				clear: true,
			},
			edit_character_three: {
				name: "编辑统率将池",
				clear: true,
				onclick() {
					if (get.mode() != "versus") {
						alert("请进入对决模式，然后再编辑将池");
						return;
					}
					var container = ui.create.div(".popup-container.editor");
					var node = container;
					var map = get.config("character_three") || lib.choiceThree;
					var str = "character=[\n    ";
					for (var i = 0; i < map.length; i++) {
						str += `"${map[i]}",`;
						if (i + 1 < map.length && (i + 1) % 5 == 0) str += "\n    ";
					}
					str += "\n];";
					node.code = str;
					ui.window.classList.add("shortcutpaused");
					ui.window.classList.add("systempaused");
					var saveInput = function () {
						var code;
						if (container.editor) {
							code = container.editor.getValue();
						}
						else if (container.textarea) {
							code = container.textarea.value;
						}
						try {
							var character = null;
							eval(code);
							if (!Array.isArray(character)) {
								throw ("err");
							}
						}
						catch (e) {
							var tip = lib.getErrorTip(e) || "";
							alert("代码语法有错误，请仔细检查（" + e + "）" + tip);
							window.focus();
							if (container.editor) {
								container.editor.focus();
							}
							else if (container.textarea) {
								container.textarea.focus();
							}
							return;
						}
						game.saveConfig("character_three", character, "versus");
						ui.window.classList.remove("shortcutpaused");
						ui.window.classList.remove("systempaused");
						container.delete();
						container.code = code;
						delete window.saveNonameInput;
					};
					window.saveNonameInput = saveInput;
					var editor = ui.create.editor(container, saveInput);
					if (node.aced) {
						ui.window.appendChild(node);
						node.editor.setValue(node.code, 1);
					}
					else if (lib.device == "ios") {
						ui.window.appendChild(node);
						if (!node.textarea) {
							var textarea = document.createElement("textarea");
							editor.appendChild(textarea);
							node.textarea = textarea;
							lib.setScroll(textarea);
						}
						node.textarea.value = node.code;
					}
					else {
						if (!window.CodeMirror) {
							lib.init.js(lib.assetURL + "game", "codemirror", () => lib.codeMirrorReady(node, editor));
							lib.init.css(lib.assetURL + "layout/default", "codemirror");
						}
						else {
							lib.codeMirrorReady(node, editor);
						}
					}
				},
			},
			reset_character_three: {
				name: "重置统率将池",
				intro: "将统率三军模式下的将池重置为默认将池",
				clear: true,
				onclick() {
					if (confirm("该操作不可撤销！是否清除统率三军模式的自定义将池，并将其重置为默认将池？")) {
						game.saveConfig("character_three", null, "versus");
						alert("将池已重置");
					}
				},
			},
			edit_character_four: {
				name: "编辑4v4将池",
				clear: true,
				onclick() {
					if (get.mode() != "versus") {
						alert("请进入对决模式，然后再编辑将池");
						return;
					}
					var container = ui.create.div(".popup-container.editor");
					var node = container;
					var map = get.config("character_four") || lib.choiceFour;
					var str = "character=[\n    ";
					for (var i = 0; i < map.length; i++) {
						str += `"${map[i]}",`;
						if (i + 1 < map.length && (i + 1) % 5 == 0) str += "\n    ";
					}
					str += "\n];";
					node.code = str;
					ui.window.classList.add("shortcutpaused");
					ui.window.classList.add("systempaused");
					var saveInput = function () {
						var code;
						if (container.editor) {
							code = container.editor.getValue();
						}
						else if (container.textarea) {
							code = container.textarea.value;
						}
						try {
							var character = null;
							eval(code);
							if (!Array.isArray(character)) {
								throw ("err");
							}
						}
						catch (e) {
							var tip = lib.getErrorTip(e) || "";
							alert("代码语法有错误，请仔细检查（" + e + "）" + tip);
							window.focus();
							if (container.editor) {
								container.editor.focus();
							}
							else if (container.textarea) {
								container.textarea.focus();
							}
							return;
						}
						game.saveConfig("character_four", character, "versus");
						ui.window.classList.remove("shortcutpaused");
						ui.window.classList.remove("systempaused");
						container.delete();
						container.code = code;
						delete window.saveNonameInput;
					};
					window.saveNonameInput = saveInput;
					var editor = ui.create.editor(container, saveInput);
					if (node.aced) {
						ui.window.appendChild(node);
						node.editor.setValue(node.code, 1);
					}
					else if (lib.device == "ios") {
						ui.window.appendChild(node);
						if (!node.textarea) {
							var textarea = document.createElement("textarea");
							editor.appendChild(textarea);
							node.textarea = textarea;
							lib.setScroll(textarea);
						}
						node.textarea.value = node.code;
					}
					else {
						if (!window.CodeMirror) {
							lib.init.js(lib.assetURL + "game", "codemirror", () => lib.codeMirrorReady(node, editor));
							lib.init.css(lib.assetURL + "layout/default", "codemirror");
						}
						else {
							lib.codeMirrorReady(node, editor);
						}
					}
				},
			},
			reset_character_four: {
				name: "重置4v4将池",
				intro: "将4v4模式下的将池重置为默认将池",
				clear: true,
				onclick() {
					if (confirm("该操作不可撤销！是否清除4v4模式的自定义将池，并将其重置为默认将池？")) {
						game.saveConfig("character_four", null, "versus");
						alert("将池已重置");
					}
				},
			},
		}
	},
	connect: {
		name: "联机",
		config: {
			connect_nickname: {
				name: "联机昵称",
				input: true,
				frequent: true,
			},
			connect_avatar: {
				name: "联机头像",
				init: "caocao",
				item: {},
				frequent: true,
				onclick(item) {
					game.saveConfig("connect_avatar", item);
					game.saveConfig("connect_avatar", item, "connect");
				}
			},
			hall_ip: {
				name: "联机大厅",
				input: true,
				frequent: true,
			},
			hall_button: {
				name: "联机大厅按钮",
				init: true,
				frequent: true,
				onclick(bool) {
					game.saveConfig("hall_button", bool, "connect");
					if (ui.hall_button) {
						if (bool) {
							ui.hall_button.style.display = "";
						}
						else {
							ui.hall_button.style.display = "none";
						}
					}
				}
			},
			wss_mode: {
				name: "使用WSS协议",
				init: false,
				frequent: true,
				intro: "在用户填写的IP地址没有直接指定使用WS/WSS协议的情况下，默认使用WSS协议，而非WS协议来连接到联机服务器。<br>请不要轻易勾选此项！",
			},
			read_clipboard: {
				name: "读取邀请链接",
				init: false,
				frequent: true,
				intro: "读取剪贴板以解析邀请链接自动加入联机房间",
			}
		}
	},
	boss: {
		name: "挑战",
		config: {
			free_choose: {
				name: "自由选将",
				init: true,
				frequent: true,
				onclick(bool) {
					game.saveConfig("free_choose", bool, this._link.config.mode);
					if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat2 && get.config("free_choose")) ui.create.cheat2();
					else if (ui.cheat2 && !get.config("free_choose")) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
				}
			},
			change_choice: {
				name: "开启换将卡",
				init: true,
				onclick(bool) {
					game.saveConfig("change_choice", bool, this._link.config.mode);
					if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat && get.config("change_choice")) ui.create.cheat();
					else if (ui.cheat && !get.config("change_choice")) {
						ui.cheat.close();
						delete ui.cheat;
					}
				},
				frequent: true,
			},
			single_control: {
				name: "单人控制",
				init: true,
				frequent: true,
				onclick(bool) {
					game.saveConfig("single_control", bool, this._link.config.mode);
					if (ui.single_swap && game.me != game.boss) {
						if (bool) {
							ui.single_swap.style.display = "none";
						}
						else {
							ui.single_swap.style.display = "";
						}
					}
				},
				intro: "只控制一名角色，其他角色由AI控制"
			}
		}
	},
	doudizhu: {
		name: "斗地主",
		connect: {
			update(config, map) {
				if (config.connect_doudizhu_mode == "online") {
					map.connect_change_card.hide();
				}
				else {
					map.connect_change_card.show();
				}
				if (config.connect_doudizhu_mode != "normal") {
					map.connect_double_character.hide();
				}
				else {
					map.connect_double_character.show();
				}
			},
			connect_doudizhu_mode: {
				name: "游戏模式",
				init: "normal",
				item: {
					normal: "休闲",
					kaihei: "开黑",
					huanle: "欢乐",
					binglin: "兵临",
					online: "智斗",
				},
				restart: true,
				frequent: true,
			},
			connect_double_character: {
				name: "双将模式",
				init: false,
				frequent: true,
				restart: true,
			},
			connect_change_card: {
				name: "启用手气卡",
				init: false,
				frequent: true,
				restart: true,
			},
		},
		config: {
			update(config, map) {
				if (config.doudizhu_mode == "online") {
					map.change_card.hide();
					map.edit_character.show();
					map.reset_character.show();
				}
				else {
					map.change_card.show();
					map.edit_character.hide();
					map.reset_character.hide();
				}
				if (config.doudizhu_mode != "normal") {
					map.double_character.hide();
					map.free_choose.hide();
					map.change_identity.hide();
					map.change_choice.hide();
					map.continue_game.hide();
					map.dierestart.hide();
					map.choice_zhu.hide();
					map.choice_fan.hide();
					map.revive.hide();
				}
				else {
					map.double_character.show();
					map.free_choose.show();
					map.change_identity.show();
					map.change_choice.show();
					map.continue_game.show();
					map.dierestart.show();
					map.choice_zhu.show();
					map.choice_fan.show();
					map.revive.show();
				}
				if (config.double_character && config.doudizhu_mode == "normal") {
					map.double_hp.show();
				}
				else {
					map.double_hp.hide();
				}
			},
			doudizhu_mode: {
				name: "游戏模式",
				init: "normal",
				item: {
					normal: "休闲",
					kaihei: "开黑",
					huanle: "欢乐",
					binglin: "兵临",
					online: "智斗",
				},
				restart: true,
				frequent: true,
			},
			double_character: {
				name: "双将模式",
				init: false,
				frequent: true,
				restart: true,
			},
			double_hp: {
				name: "双将体力上限",
				init: "pingjun",
				item: {
					hejiansan: "和减三",
					pingjun: "平均值",
					zuidazhi: "最大值",
					zuixiaozhi: "最小值",
					zonghe: "相加",
				},
				restart: true,
			},
			free_choose: {
				name: "自由选将",
				init: true,
				onclick(bool) {
					game.saveConfig("free_choose", bool, this._link.config.mode);
					if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat2 && get.config("free_choose")) ui.create.cheat2();
					else if (ui.cheat2 && !get.config("free_choose")) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
				}
			},
			change_identity: {
				name: "自由选择身份和座位",
				init: true,
				onclick(bool) {
					game.saveConfig("change_identity", bool, this._link.config.mode);
					if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
					var dialog;
					if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
					else dialog = _status.event.dialog;
					if (!_status.brawl || !_status.brawl.noAddSetting) {
						if (!dialog.querySelector("table") && get.config("change_identity")) _status.event.getParent().addSetting(dialog);
						else _status.event.getParent().removeSetting(dialog);
					}
					ui.update();
				}
			},
			change_choice: {
				name: "开启换将卡",
				init: true,
				onclick(bool) {
					game.saveConfig("change_choice", bool, this._link.config.mode);
					if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat && get.config("change_choice")) ui.create.cheat();
					else if (ui.cheat && !get.config("change_choice")) {
						ui.cheat.close();
						delete ui.cheat;
					}
				}
			},
			change_card: {
				name: "开启手气卡",
				init: "disabled",
				item: {
					disabled: "禁用",
					once: "一次",
					twice: "两次",
					unlimited: "无限",
				},
			},
			continue_game: {
				name: "显示再战",
				init: false,
				onclick(bool) {
					game.saveConfig("continue_game", bool, this._link.config.mode);
					if (get.config("continue_game")) {
						if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
							ui.continue_game = ui.create.control("再战", game.reloadCurrent);
						}
					}
					else if (ui.continue_game) {
						ui.continue_game.close();
						delete ui.continue_game;
					}
				},
				intro: "游戏结束后可选择用相同的武将再进行一局游戏"
			},
			dierestart: {
				name: "死亡后显示重来",
				init: true,
				onclick(bool) {
					game.saveConfig("dierestart", bool, this._link.config.mode);
					if (get.config("dierestart")) {
						if (!ui.restart && game.me.isDead() && !_status.connectMode) {
							ui.restart = ui.create.control("restart", game.reload);
						}
					}
					else if (ui.restart) {
						ui.restart.close();
						delete ui.restart;
					}
				}
			},
			revive: {
				name: "死亡后显示复活",
				init: false,
				onclick(bool) {
					game.saveConfig("revive", bool, this._link.config.mode);
					if (get.config("revive")) {
						if (!ui.revive && game.me.isDead()) {
							ui.revive = ui.create.control("revive", ui.click.dierevive);
						}
					}
					else if (ui.revive) {
						ui.revive.close();
						delete ui.revive;
					}
				}
			},
			choice_zhu: {
				name: "地主候选武将数",
				init: "3",
				restart: true,
				item: {
					"3": "三",
					"4": "四",
					"5": "五",
					"6": "六",
					"8": "八",
					"10": "十",
				},
			},
			choice_fan: {
				name: "农民候选武将数",
				init: "3",
				restart: true,
				item: {
					"3": "三",
					"4": "四",
					"5": "五",
					"6": "六",
					"8": "八",
					"10": "十",
				},
			},
			edit_character: {
				name: "编辑将池",
				clear: true,
				onclick() {
					if (get.mode() != "doudizhu") {
						alert("请进入斗地主模式，然后再编辑将池");
						return;
					}
					var container = ui.create.div(".popup-container.editor");
					var node = container;
					var map = get.config("character_online") || lib.characterOnline;
					node.code = "character=" + get.stringify(map) + "\n/*\n    这里是智斗三国模式的武将将池。\n    您可以在这里编辑对武将将池进行编辑，然后点击“保存”按钮即可保存。\n    将池中的Key势力武将，仅同时在没有被禁用的情况下，才会出现在选将框中。\n    而非Key势力的武将，只要所在的武将包没有被隐藏，即可出现在选将框中。\n    该将池为单机模式/联机模式通用将池。在这里编辑后，即使进入联机模式，也依然会生效。\n    但联机模式本身禁用的武将（如神貂蝉）不会出现在联机模式的选将框中。\n*/";
					ui.window.classList.add("shortcutpaused");
					ui.window.classList.add("systempaused");
					var saveInput = function () {
						var code;
						if (container.editor) {
							code = container.editor.getValue();
						}
						else if (container.textarea) {
							code = container.textarea.value;
						}
						try {
							var character = null;
							eval(code);
							if (!get.is.object(character)) {
								throw ("err");
							}
							var groups = [];
							for (var i in character) {
								if (!Array.isArray(character[i])) throw ("type");
								if (character[i].length >= 3) groups.push(i);
							}
							if (groups.length < 3) throw ("enough");
						}
						catch (e) {
							if (e == "type") {
								alert("请严格按照格式填写，不要写入不为数组的数据");
							}
							else if (e == "enough") {
								alert("请保证至少写入了3个势力，且每个势力至少有3个武将");
							}
							else if (e == "err") {
								alert("代码格式有错误，请对比示例代码仔细检查");
							}
							else {
								var tip = lib.getErrorTip(e) || "";
								alert("代码语法有错误，请仔细检查（" + e + "）" + tip);
							}
							window.focus();
							if (container.editor) {
								container.editor.focus();
							}
							else if (container.textarea) {
								container.textarea.focus();
							}
							return;
						}
						game.saveConfig("character_online", character, "doudizhu");
						ui.window.classList.remove("shortcutpaused");
						ui.window.classList.remove("systempaused");
						container.delete();
						container.code = code;
						delete window.saveNonameInput;
					};
					window.saveNonameInput = saveInput;
					var editor = ui.create.editor(container, saveInput);
					if (node.aced) {
						ui.window.appendChild(node);
						node.editor.setValue(node.code, 1);
					}
					else if (lib.device == "ios") {
						ui.window.appendChild(node);
						if (!node.textarea) {
							var textarea = document.createElement("textarea");
							editor.appendChild(textarea);
							node.textarea = textarea;
							lib.setScroll(textarea);
						}
						node.textarea.value = node.code;
					}
					else {
						if (!window.CodeMirror) {
							lib.init.js(lib.assetURL + "game", "codemirror", () => lib.codeMirrorReady(node, editor));
							lib.init.css(lib.assetURL + "layout/default", "codemirror");
						}
						else {
							lib.codeMirrorReady(node, editor);
						}
					}
				},
			},
			reset_character: {
				name: "重置将池",
				intro: "将智斗三国模式下的将池重置为默认将池",
				clear: true,
				onclick() {
					if (confirm("该操作不可撤销！是否清除智斗三国模式的自定义将池，并将其重置为默认将池？")) {
						game.saveConfig("character_online", null, "doudizhu");
						alert("将池已重置");
					}
				},
			},
		}
	},
	single: {
		name: "单挑",
		connect: {
			connect_single_mode: {
				name: "游戏模式",
				init: "normal",
				item: {
					normal: "新1v1",
					dianjiang: "点将单挑",
					changban: "血战长坂坡",
				},
				restart: true,
				frequent: true,
			},
			connect_enable_jin: {
				name: "启用晋势力武将",
				init: false,
				restart: true,
				frequent: true,
			},
			update(config, map) {
				if (config.connect_single_mode != "normal") {
					map.connect_enable_jin.hide();
				}
				else {
					map.connect_enable_jin.show();
				}
			},
		},
		config: {
			single_mode: {
				name: "游戏模式",
				init: "normal",
				item: {
					normal: "新1v1",
					dianjiang: "点将单挑",
					changban: "血战长坂坡",
				},
				restart: true,
				frequent: true,
			},
			enable_jin: {
				name: "启用晋势力武将",
				init: false,
				restart: true,
				frequent: true,
			},
			update(config, map) {
				if (config.single_mode != "normal") {
					map.enable_jin.hide();
				}
				else {
					map.enable_jin.show();
				}
			},
		}
	},
	chess: {
		name: "战棋",
		config: {
			chess_mode: {
				name: "游戏模式",
				init: "combat",
				item: {
					combat: "自由",
					three: "统率",
					leader: "君主",
				},
				restart: true,
				frequent: true,
			},
			update(config, map) {
				if (config.chess_mode == "leader") {
					map.chess_leader_save.show();
					map.chess_leader_clear.show();
					map.chess_leader_allcharacter.show();
					map.chess_character.hide();
				}
				else {
					map.chess_leader_save.hide();
					map.chess_leader_clear.hide();
					map.chess_leader_allcharacter.hide();
					map.chess_character.show();
				}
				if (config.chess_mode == "combat") {
					map.free_choose.show();
					map.change_choice.show();
				}
				else {
					map.free_choose.hide();
					map.change_choice.hide();
				}
			},
			chess_leader_save: {
				name: "选择历程",
				init: "save1",
				item: {
					save1: "一",
					save2: "二",
					save3: "三",
					save4: "四",
					save5: "五",
				},
				restart: true,
				frequent: true,
			},
			chess_leader_allcharacter: {
				name: "启用全部角色",
				init: true,
				onclick(bool) {
					if (confirm("调整该设置将清除所有进度，是否继续？")) {
						for (var i = 1; i < 6; i++) game.save("save" + i, null, "chess");
						game.saveConfig("chess_leader_allcharacter", bool, "chess")
						if (get.mode() == "chess") game.reload();
						return;
					}
					else this.classList.toggle("on");
				},
			},
			chess_leader_clear: {
				name: "清除进度",
				onclick() {
					var node = this;
					if (node._clearing) {
						for (var i = 1; i < 6; i++) game.save("save" + i, null, "chess");
						game.reload();
						return;
					}
					node._clearing = true;
					node.firstChild.innerHTML = "单击以确认 (3)";
					setTimeout(function () {
						node.firstChild.innerHTML = "单击以确认 (2)";
						setTimeout(function () {
							node.firstChild.innerHTML = "单击以确认 (1)";
							setTimeout(function () {
								node.firstChild.innerHTML = "清除进度";
								delete node._clearing;
							}, 1000);
						}, 1000);
					}, 1000);
				},
				clear: true,
				frequent: true,
			},
			chess_obstacle: {
				name: "随机路障",
				init: "0.2",
				item: {
					"0": "关闭",
					"0.2": "少量",
					"0.333": "中量",
					"0.5": "大量",
				},
				frequent: true,
			},
			show_range: {
				name: "显示卡牌范围",
				init: true,
			},
			show_distance: {
				name: "显示距离",
				init: true,
			},
			chess_character: {
				name: "战棋武将",
				init: true,
				frequent: true,
			},
			chess_card: {
				name: "战棋卡牌",
				init: true,
				frequent: true,
			},
			free_choose: {
				name: "自由选将",
				init: true,
				onclick(bool) {
					game.saveConfig("free_choose", bool, this._link.config.mode);
					if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat2 && get.config("free_choose")) ui.create.cheat2();
					else if (ui.cheat2 && !get.config("free_choose")) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
				},
			},
			change_choice: {
				name: "开启换将卡",
				init: true,
				onclick(bool) {
					game.saveConfig("change_choice", bool, this._link.config.mode);
					if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat && get.config("change_choice")) ui.create.cheat();
					else if (ui.cheat && !get.config("change_choice")) {
						ui.cheat.close();
						delete ui.cheat;
					}
				},
			},
			chessscroll_speed: {
				name: "边缘滚动速度",
				init: "20",
				intro: "鼠标移至屏幕边缘时自动滚屏",
				item: {
					"0": "不滚动",
					"10": "10格/秒",
					"20": "20格/秒",
					"30": "30格/秒",
				}
			}
		}
	},
	tafang: {
		name: "塔防",
		config: {
			tafang_turn: {
				name: "游戏胜利",
				init: "10",
				frequent: true,
				item: {
					"10": "十回合",
					"20": "二十回合",
					"30": "三十回合",
					"1000": "无限",
				}
			},
			tafang_difficulty: {
				name: "战斗难度",
				init: "2",
				frequent: true,
				item: {
					"1": "简单",
					"2": "普通",
					"3": "困难",
				}
			},
			show_range: {
				name: "显示卡牌范围",
				init: true,
			},
			show_distance: {
				name: "显示距离",
				init: true,
			},
			chessscroll_speed: {
				name: "边缘滚动速度",
				intro: "鼠标移至屏幕边缘时自动滚屏",
				init: "20",
				item: {
					"0": "不滚动",
					"10": "10格/秒",
					"20": "20格/秒",
					"30": "30格/秒",
				}
			}
		}
	},
	brawl: {
		name: "乱斗",
		config: {
			huanhuazhizhan: {
				name: "幻化之战",
				init: true,
				frequent: true
			},
			duzhansanguo: {
				name: "毒战三国",
				init: true,
				frequent: true
			},
			daozhiyueying: {
				name: "导师月英",
				init: true,
				frequent: true
			},
			weiwoduzun: {
				name: "唯我独尊",
				init: true,
				frequent: true
			},
			tongxingzhizheng: {
				name: "同姓之争",
				init: true,
				frequent: true
			},
			jiazuzhizheng: {
				name: "家族之争",
				init: true,
				frequent: true
			},
			tongqueduopao: {
				name: "铜雀夺袍",
				init: true,
				frequent: true
			},
			tongjiangmoshi: {
				name: "同将模式",
				init: true,
				frequent: true
			},
			baiyidujiang: {
				name: "白衣渡江",
				init: true,
				frequent: true
			},
			qianlidanji: {
				name: "千里单骑",
				init: true,
				frequent: true
			},
			liangjunduilei: {
				name: "两军对垒",
				init: true,
				frequent: true
			},
			scene: {
				name: "创建场景",
				init: true,
				frequent: true
			}
		}
	},
	stone: {
		name: "炉石",
		config: {
			battle_number: {
				name: "出场人数",
				init: "1",
				frequent: true,
				item: {
					"1": "一人",
					"2": "两人",
					"3": "三人",
					"4": "四人",
					"6": "六人",
					"8": "八人",
					"10": "十人",
				},
				onclick(num) {
					game.saveConfig("battle_number", num, this._link.config.mode);
					if (_status.connectMode) return;
					if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (_status.event.getParent().changeDialog) {
						_status.event.getParent().changeDialog();
					}
				}
			},
			mana_mode: {
				name: "行动值变化",
				init: "inc",
				item: {
					inf: "涨落",
					inc: "递增"
				},
				frequent: true
			},
			skill_bar: {
				name: "怒气值",
				init: true,
				frequent: true,
				restart: true,
			},
			double_character: {
				name: "双将模式",
				init: false,
				frequent: true,
				restart() {
					return _status.event.getParent().name != "chooseCharacter" || _status.event.name != "chooseButton";
				}
			},
			free_choose: {
				name: "自由选将",
				init: true,
				onclick(bool) {
					game.saveConfig("free_choose", bool, this._link.config.mode);
					if (_status.connectMode) return;
					if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat2 && get.config("free_choose")) ui.create.cheat2();
					else if (ui.cheat2 && !get.config("free_choose")) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
				}
			},
			change_choice: {
				name: "开启换将卡",
				init: true,
				onclick(bool) {
					game.saveConfig("change_choice", bool, this._link.config.mode);
					if (_status.connectMode) return;
					if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
					if (!ui.cheat && get.config("change_choice")) ui.create.cheat();
					else if (ui.cheat && !get.config("change_choice")) {
						ui.cheat.close();
						delete ui.cheat;
					}
				}
			}
		}
	}
};
