/// <reference path="../../typings/index.d.ts" />
game.import("extension", function (lib, game, ui, get, ai, _status) {
  var dynamicTranslate = {
    furrykill_qianlie: function (player) {
      if (player.storage.furrykill_qianlie == true)
        return '转换技，阳：以你为目标的锦囊牌结算完毕后，可以使用一张杀或伤害锦囊牌。<span class="bluetext">阴：你造成的伤害结算完毕后，可以发现一张牌，若此时是你的出牌阶段，结束此阶段并跳过本回合的弃牌阶段。</span>';
      return '转换技，<span class="bluetext">阳：以你为目标的锦囊牌结算完毕后，可以使用一张杀或伤害锦囊牌。</span>阴：你造成的伤害结算完毕后，可以发现一张牌，若此时是你的出牌阶段，结束此阶段并跳过本回合的弃牌阶段。';
    },
  }
  return {
    name: "FurryKill", editable: false, content: function (config, pack) {
      var f = function (英文名) { if (config[英文名]) { for (var i in lib.characterPack[英文名]) { if (lib.character[i][4].indexOf("forbidai") < 0) lib.character[i][4].push("forbidai"); } } };
      f("FurryKill");
      lib.dynamicTranslate["furrykill_qianlie"] = dynamicTranslate.furrykill_qianlie
    }, precontent: function (qs) {
      if (qs.enable) {
        game.导入character = function (英文名, 翻译名, obj, 扩展包名) { var oobj = get.copy(obj); oobj.name = 英文名; oobj.character = obj.character.character; oobj.skill = obj.skill.skill; oobj.translate = Object.assign({}, obj.character.translate, obj.skill.translate); game.import('character', function () { if (lib.device || lib.node) { for (var i in oobj.character) { oobj.character[i][4].push('ext:' + 扩展包名 + '/' + i + '.jpg'); } } else { for (var i in oobj.character) { oobj.character[i][4].push('db:extension-' + 扩展包名 + ':' + i + '.jpg'); } } return oobj; }); lib.config.all.characters.push(英文名); if (!lib.config.characters.contains(英文名)) { lib.config.characters.push(英文名); } lib.translate[英文名 + '_character_config'] = 翻译名; };
        game.导入card = function (英文名, 翻译名, obj) { var oobj = get.copy(obj); oobj.list = obj.card.list; oobj.card = obj.card.card; oobj.skill = obj.skill.skill; oobj.translate = Object.assign({}, obj.card.translate, obj.skill.translate); game.import('card', function () { return oobj }); lib.config.all.cards.push(英文名); if (!lib.config.cards.contains(英文名)) lib.config.cards.push(英文名); lib.translate[英文名 + '_card_config'] = 翻译名; };
        game.新增势力 = function (名字, 映射, 渐变) { var n, t; if (!名字) return; if (typeof 名字 == "string") { n = 名字; t = 名字 } else if (Array.isArray(名字) && 名字.length == 2 && typeof 名字[0] == "string") { n = 名字[0]; t = 名字[1] } else return; if (!映射 || !Array.isArray(映射) || 映射.length != 3) 映射 = [199, 21, 133]; var y = "(" + 映射[0] + "," + 映射[1] + "," + 映射[2]; var y1 = y + ",1)", y2 = y + ")"; var s = document.createElement('style'); var l; l = ".player .identity[data-color='diy" + n + "'],"; l += "div[data-nature='diy" + n + "'],"; l += "span[data-nature='diy" + n + "'] {text-shadow: black 0 0 1px,rgba" + y1 + " 0 0 2px,rgba" + y1 + " 0 0 5px,rgba" + y1 + " 0 0 10px,rgba" + y1 + " 0 0 10px}"; l += "div[data-nature='diy" + n + "m'],"; l += "span[data-nature='diy" + n + "m'] {text-shadow: black 0 0 1px,rgba" + y1 + " 0 0 2px,rgba" + y1 + " 0 0 5px,rgba" + y1 + " 0 0 5px,rgba" + y1 + " 0 0 5px,black 0 0 1px;}"; l += "div[data-nature='diy" + n + "mm'],"; l += "span[data-nature='diy" + n + "mm'] {text-shadow: black 0 0 1px,rgba" + y1 + " 0 0 2px,rgba" + y1 + " 0 0 2px,rgba" + y1 + " 0 0 2px,rgba" + y1 + " 0 0 2px,black 0 0 1px;}"; s.innerHTML = l; document.head.appendChild(s); if (渐变 && Array.isArray(渐变) && Array.isArray(渐变[0]) && 渐变[0].length == 3) { var str = "", st2 = []; for (var i = 0; i < 渐变.length; i++) { str += ",rgb(" + 渐变[i][0] + "," + 渐变[i][1] + "," + 渐变[i][2] + ")"; if (i < 2) st2[i] = "rgb(" + 渐变[i][0] + "," + 渐变[i][1] + "," + 渐变[i][2] + ")"; } var tenUi = document.createElement('style'); tenUi.innerHTML = ".player>.camp-zone[data-camp='" + n + "']>.camp-back {background: linear-gradient(to bottom" + str + ");}"; tenUi.innerHTML += ".player>.camp-zone[data-camp='" + n + "']>.camp-name {text-shadow: 0 0 5px " + st2[0] + ", 0 0 10px " + st2[1] + ";}"; document.head.appendChild(tenUi); } lib.group.add(n); lib.translate[n] = t; lib.groupnature[n] = "diy" + n; };

        game.新增势力(["furrykill_cat", "猫"], [37, 128, 237], [[37, 128, 237], [20, 60, 80]]);
        game.新增势力(["furrykill_fox", "狐"], [222, 68, 68], [[222, 68, 68], [80, 20, 20]]);
        game.新增势力(["furrykill_wolf", "狼"], [191, 191, 189], [[191, 191, 189], [60, 60, 60]]);
        game.新增势力(["furrykill_dragon", "龙"], [191, 191, 189], [[191, 191, 189], [60, 60, 60]]);
        game.新增势力(["furrykill_dog", "犬"], [68, 68, 222], [[68, 68, 222], [20, 20, 80]]);
        game.导入character("FurryKill", "FurryKill", {
          connect: true,
          character: {
            character: {
              furrykill_shifeng: [
                "male",
                "furrykill_cat",
                3,
                ["furrykill_dingchen", "furrykill_suixin", "furrykill_xiaoshi"],
                ["hiddenSkill", "des:夜刃"],
              ],
              furrykill_yongshi: [
                "male",
                "furrykill_cat",
                4,
                ["furrykill_fenyou", "furrykill_zhian"],
                ["des:小黄苟"],
              ],
              furrykill_sword: [
                "male",
                "furrykill_fox",
                4,
                ["furrykill_shanjian", "furrykill_yvnian"],
                ["des:剑"],
              ],
              furrykill_xuankai: [
                "male",
                "furrykill_cat",
                3,
                ["furrykill_qianlie", "furrykill_youxia"],
                ["des:丛林猎杀者"],
              ],
              furrykill_heibai: [
                "male",
                "furrykill_fox",
                3,
                ["furrykill_xulei", "furrykill_shineng"],
                ["des:AP钙奶"],
              ],
              furrykill_xiaoba: [
                "male",
                "furrykill_cat",
                3,
                ["furrykill_lingfeng", "furrykill_zhuiying"],
                ["des:蓝飞机"],
              ],
              furrykill_anliang: [
                "male",
                "furrykill_wolf",
                3,
                ["furrykill_lvbing", "furrykill_hanren", "furrykill_ruiyan"],
                ["hiddenSkill", "des:珀瞳"],
              ],
              furrykill_guoguo: [
                "male",
                "furrykill_cat",
                4,
                ["furrykill_fuyun", "furrykill_changlong", "furrykill_qifu"],
                ["des:招财游侠"],
              ],
              furrykill_baitu: [
                "male",
                "furrykill_dragon",
                4,
                ["furrykill_lianfu", "furrykill_pojia"],
                ["des:一叶障目"],
              ],
              furrykill_yizhichuan: [
                "male",
                "furrykill_dog",
                3,
                ["furrykill_dielang", "furrykill_shouhe"],
                ["des:水之魔武士"],
              ],
            },
            translate: {
              furrykill_shifeng: "时风",
              furrykill_yongshi: "勇士",
              furrykill_sword: "斯沃",
              furrykill_xuankai: "轩恺",
              furrykill_heibai: "黑白",
              furrykill_xiaoba: "小巴",
              furrykill_anliang: "安谅",
              furrykill_guoguo: "果果",
              furrykill_baitu: "白荼",
              furrykill_yizhichuan: "伊织川",
            },
          },
          characterTitle: {
          },
          skill: {
            skill: {
              furrykill_dingchen: {
                trigger: {
                  player: "showCharacterAfter",
                },
                hiddenSkill: true,
                logTarget: function () {
                  return _status.currentPhase;
                },
                filter: function (event, player) {
                  var target = _status.currentPhase;
                  return event.toShow.contains('furrykill_shifeng') && target && target != player;
                },
                content: function () {
                  var target = _status.currentPhase;
                  player.useCard({ name: 'sha', isCard: true }, target);
                },
              },

              furrykill_suixin: {
                group: ["furrykill_suixin_1", "furrykill_suixin_2"],
                locked: true,
                forced: true,
                subSkill: {
                  1: {
                    trigger: {
                      source: "damageBegin1",
                    },
                    forced: true,
                    filter: function (event) {
                      return event.player.isHealthy();
                    },
                    content: function () {
                      "step 0"
                      trigger.player.loseHp(1);
                    },
                    sub: true
                  },
                  2: {
                    trigger: {
                      target: "useCardToTargeted",
                    },
                    forced: true,
                    filter: function (event, player) {
                      if (event.card.name != 'sha' && event.card.name != 'juedou') return false;
                      return player.isTurnedOver() && player.countCards('he') > 0;;
                    },
                    content: function () {
                      "step 0";
                      player.chooseToDiscard("碎心：是否弃置一张牌以取消目标？", 'he');
                      "step 1"
                      if (result.bool) {
                        trigger.getParent().excluded.add(player);
                      }
                    },
                    sub: true
                  }
                },
              },

              furrykill_xiaoshi: {
                group: ["furrykill_xiaoshi_1", "furrykill_xiaoshi_damaged"],
                subSkill: {
                  1: {
                    trigger: {
                      global: "phaseZhunbeiBegin",
                    },
                    filter: function (event, player) {
                      return player != event.player;
                    },
                    round: 1,
                    content: function () {
                      "step 0";
                      player.storage.xiaoshi = true
                      event.card = { name: 'sha', isCard: true };
                      event.related = player.useCard(event.card, trigger.player);
                      "step 1";
                      if (!event.related || !game.hasPlayer2(function (current) {
                        return current.getHistory('damage', function (evt) {
                          return evt.getParent(2) == event.related;
                        }).length > 0;
                      })) {
                        player.storage.xiaoshi = undefined;
                        player.turnOver();
                      }
                    },
                    sub: true,
                  },
                  damaged: {
                    trigger: {
                      source: "damageAfter",
                    },
                    forced: true,
                    popup: false,
                    filter: function (event, player) {
                      return player.storage.xiaoshi;
                    },
                    content: function () {
                      player.storage.xiaoshi = undefined;
                      var target = trigger.player;
                      if (target.isDead() || !target.countCards('he')) return;
                      player.discardPlayerCard(target, true, 'he');
                    },
                    sub: true,
                  },
                }
              },

              furrykill_fenyou: {
                trigger: { global: "useCardToBefore" },
                filter: function (event, player) {
                  return event.target != player
                    && event.player != player
                    && event.targets.length == 1
                    && ['basic', 'trick'].contains(get.type(event.card, false))
                    && player.inRange(event.target);
                },
                content: function () {
                  player.loseHp();
                  trigger.cancel();
                },
                ai: {
                  threaten: 1,
                  result: {
                    target: function (player, target) {
                      if (player.hp > 1) return 3.5;
                      return 2;
                    },
                  },
                  order: 4,
                  expose: 0.4,
                },

              },

              furrykill_zhian: {
                trigger: {
                  global: "phaseZhunbeiBegin",
                },
                filter: function (event, player) {
                  if (!player.countCards('he', { color: 'black' })) return false;
                  return player != event.player;
                },
                frequent: true,
                content: function () {
                  'step 0';
                  player.chooseCard('he', '致安：将一张黑色牌交给' + get.translation(trigger.player) + "？", function (card, player, target) {
                    return get.color(card) === 'black';
                  });
                  'step 1';
                  if (result.bool) {
                    trigger.player.gain(result.cards, player, 'giveAuto');
                    event.check2Str = "弃置一张红色牌，令" + get.translation(player) + "回复一点体力"
                    var list = ["摸一张牌", event.check2Str]
                    if (!trigger.player.countCards('he', { color: 'red' })) list.remove(event.check2Str);
                    trigger.player.chooseControl(list, true, function () {
                      if (list.contains(event.check2Str) && get.attitude(player, event.player) > 0 && !player.isHealthy())
                        return event.check2Str;
                      return "摸一张牌";
                    }).set('prompt', get.prompt2('furrykill_zhian'));
                  } else {
                    event.finish();
                  }
                  'step 2';
                  if (result.control == "摸一张牌") {
                    trigger.player.draw();
                    game.log(trigger.player, '摸了一张牌');
                  } else {
                    trigger.player.chooseToDiscard('he', true, { color: 'red' }).set('ai', function (card) {
                      return 7 - get.value(card);
                    });
                    player.recover();
                    game.log(trigger.player, '使', player, "回复了一点体力");
                  }
                },
              },

              furrykill_shanjian: {
                enable: "phaseUse",
                usable: 1,
                unique: true,
                filterTarget: function (card, player, target) {
                  return target != player;
                },
                content: function () {
                  "step 0"
                  player.addTempSkill('furrykill_shanjian_1');
                  player.storage.furrykill_shanjian1 = target;
                  "step 1"
                  player.draw();
                },
                subSkill: {
                  1: {
                    onremove: function (player) {
                      delete player.storage.furrykill_shanjian1;
                    },
                    mod: {
                      globalFrom: function (from, to) {
                        if (to == from.storage.furrykill_shanjian1) return -Infinity;
                      },
                      playerEnabled: function (card, player, target) {
                        if (player != target && player.storage.furrykill_shanjian1 != target) return false;
                      }
                    },
                    charlotte: true,
                    sub: true,
                  }
                }
              },

              furrykill_yvnian: {
                trigger: {
                  source: "damageBegin1",
                },
                logTarget: "player",
                frequent: true,
                filter: function (event) {
                  return event.nature;
                },
                content: function () {
                  "step 0"
                  var list = ["伤害+1", "伤害-1", "取消"];
                  if (!player.countCards('he')) list.remove("伤害+1");
                  player.chooseControl(list, function () {
                    var isFriend = get.attitude(player, trigger.player) > 0
                    if (!isFriend && list.contains("伤害+1")) {
                      return "伤害+1";
                    }
                    if (isFriend) return "伤害-1";
                    return "取消";
                  }).set('prompt', get.prompt2('furrykill_yvnian'));
                  "step 1"
                  if (result.control == "伤害+1") {
                    player.chooseToDiscard(true, 'he');
                    trigger.num++;
                    game.log(player, '弃了一张牌并使伤害+1');
                  } else if (result.control == "伤害-1") {
                    trigger.num--;
                    player.draw();
                    game.log(player, '摸了一张牌并使伤害-1');
                  }
                }
              },

              furrykill_qianlie: {
                mark: true,
                locked: false,
                zhuanhuanji: true,
                marktext: "☯",
                intro: {
                  content: function (storage, player, skill) {
                    var str = !player.storage.furrykill_qianlie
                      ? "以你为目标的锦囊牌结算完毕后，可以使用一张杀或伤害锦囊牌。"
                      : "你造成的伤害结算完毕后，可以发现一张牌，若此时是你的出牌阶段，结束此阶段并跳过本回合的弃牌阶段。";
                    return str;
                  },
                },
                group: ["furrykill_qianlie_1", "furrykill_qianlie_2"],
                subSkill: {
                  1: {
                    prompt2:
                      "以你为目标的锦囊牌结算完毕后，可以使用一张杀或伤害锦囊牌。",
                    trigger: { global: "useCardAfter" },
                    audio: 2,
                    direct: true,
                    filter: function (event, player) {
                      return (
                        !player.storage.furrykill_qianlie
                        && event.targets.contains(player)
                        && get.type(event.card) == "trick"
                      );
                    },
                    content: function () {
                      "step 0";
                      var list = ["确定", "取消"];
                      event.qianlieUsable = player.hasCard(function (card) {
                        return get.name(card) == "sha"
                          || (get.type2(card, false) == "trick"
                            && get.tag({ name: card.name }, "damage"));
                      })
                      if (!event.qianlieUsable) list.remove("确定");

                      player.chooseControl(list, true, function () {
                        if (list.contains("确定"))
                          return "确定";
                        return "取消";
                      }).set('prompt', get.prompt2('furrykill_qianlie_1'));
                      'step 1'
                      if (result.control == "确定") {
                        player.changeZhuanhuanji("furrykill_qianlie");
                        player.markSkill("furrykill_qianlie");

                        player.chooseToUse(
                          "潜猎：是否使用一张杀或伤害锦囊牌", true,
                          function (card) {
                            return (
                              get.name(card) == "sha" ||
                              (get.type2(card, false) == "trick" &&
                                get.tag({ name: card.name }, "damage"))
                            );
                          }
                        ).logSkill = "furrykill_qianlie";
                      }
                    },
                    sub: true,
                  },
                  2: {
                    prompt2:
                      "你造成的伤害结算完毕后，可以发现一张牌，若此时是你的出牌阶段，结束此阶段并跳过本回合的弃牌阶段。",
                    trigger: { source: "damageEnd" },
                    audio: 2,
                    filter: function (event, player) {
                      return player.storage.furrykill_qianlie;
                    },
                    content: function () {
                      "step 0";
                      event.cards = get.cards(3);
                      game.cardsGotoOrdering(event.cards);
                      event.videoId = lib.status.videoId++;
                      event.time = get.utc();
                      "step 1";
                      player.chooseButton(['潜猎：发现一张牌', event.cards]).set('filterButton', function (button) {
                        return ui.selected.buttons.length == 0;
                      }).set('ai', function (button) {
                        return get.value(button.link);
                      }).set('cards', event.cards);
                      "step 2";
                      if (result.bool && result.links) {
                        event.cards2 = result.links;
                      } else {
                        event.finish();
                      }
                      var time = 1000 - (get.utc() - event.time);
                      if (time > 0) {
                        game.delay(0, time);
                      }
                      "step 3";
                      var cards2 = event.cards2[0];
                      player.gain(cards2, "draw");
                      game.log(player, '从牌堆顶发现了一张牌');

                      if (_status.currentPhase == player) {
                        var evt = _status.event.getParent("phaseUse");
                        if (evt && evt.name == "phaseUse") {
                          player.skip("phaseDiscard");
                          evt.skipped = true;
                        }
                      }
                      player.changeZhuanhuanji("furrykill_qianlie");
                      player.markSkill("furrykill_qianlie");
                    },
                    sub: true,
                  },
                }
              },

              furrykill_youxia: {
                audio: 2,
                trigger: {
                  player: "phaseDrawBegin2",
                },
                forced: true,
                filter: function (event, player) {
                  return !event.numFixed;
                },
                content: function () {
                  trigger.num++;
                },
              },

              furrykill_xulei: {
                group: ["furrykill_xulei_1", "furrykill_xulei_2", "furrykill_xulei_3", "furrykill_xulei_getCard"],
                locked: true,
                forced: true,
                subSkill: {
                  1: {
                    audio: 2,
                    trigger: {
                      player: "turnOverBefore"
                    },
                    forced: true,
                    filter: function (event, player) {
                      return player.isTurnedOver();
                    },
                    content: function () {
                      'step 0';
                      if (player.countCards('j')) {
                        var judges = player.getCards('j');
                        for (var i = 0; i < judges.length; i++) {
                          player.addJudgeNext(judges[i]);
                        }
                        player.disableJudge();
                      }
                      'step 1';
                      //player.turnOver();
                      trigger.cancel();
                    },
                    sub: true,
                  },
                  2: {
                    trigger: {
                      global: "gameStart",
                    },
                    forced: true,
                    popup: false,
                    content: function () {
                      player.turnOver();
                      player.disableJudge();
                    },
                    sub: true,
                  },
                  3: {
                    mod: {
                      targetEnabled: function (card, player, target) {
                        if (get.type(card) == 'delay') return false;
                      },
                    },
                    sub: true,
                  },
                  getCard: {
                    audio: 2,
                    forced: true,
                    trigger: {
                      target: "useCardToTarget",
                      global: "damageEnd",
                    },
                    filter: function (event, player) {
                      if (event.name == "useCardToTarget"
                        && get.type(event.card) == 'equip') return false;
                      return player.countCards('h') < 6;
                    },
                    content: function () {
                      player.draw();
                    },
                    sub: true,
                  }
                }
              },

              furrykill_shineng: {
                audio: 2,
                trigger: {
                  global: "phaseAfter",
                },
                frequent: true,
                filter: function (event, player) {
                  return player.countCards('he') > 0
                },
                content: function () {
                  'step 0'
                  player.chooseToDiscard('he',
                    '势能：你可以弃置任意数量的牌。若这些牌的点数之和不小于13，你可以使用其中的一张；若点数之和不小于32，你可以造成一点雷电伤害。',
                    [1, player.countCards('he')]).set('ai', function (card) {
                      if (player.countCards('he') >= 6) return 32;
                      return -1;// 势能的ai，暂时默认不弃牌
                    });
                  'step 1'
                  event.totalCards = 0;
                  if (result.bool) {
                    var total = 0;
                    var cards = result.cards;
                    for (var i = 0; i < cards.length; i++) {
                      total += get.number(cards[i]);
                    }
                    event.dropCards = cards;
                    event.totalCards = total;
                  } else {
                    event.finish();
                  }
                  'step 2'
                  if (event.totalCards >= 13) {
                    event.usableCards = event.dropCards.filter(function (i) {
                      return (get.position(i, true) == 'd' && i.name != "shan" && player.hasUseTarget(i));
                    })
                    if (event.usableCards.length > 0) {
                      player.chooseButton(['势能：是否使用其中的一张牌？', event.usableCards]).set('ai', function (button) {
                        return _status.event.player.getUseValue(button.link);
                      });
                    }
                  }
                  'step 3'
                  if (event.totalCards >= 13 && event.usableCards.length > 0 && result.bool) {
                    player.$gain2(result.links[0], false);
                    game.delayx();
                    player.chooseUseTarget(true, result.links[0], false).logSkill = 'furrykill_shineng';
                  }
                  'step 4'
                  if (event.totalCards >= 30) {
                    player.chooseTarget('势能：是否选择一个目标并对其造成1点雷电伤害？', false, function (card, player, target) {
                      return true;
                    }).set('ai', function (target) {
                      return get.damageEffect(target, _status.event.player, _status.event.player, 'thunder');
                    });
                  }
                  'step 5'
                  if (event.totalCards >= 30 && result.bool) {
                    var target = result.targets[0];
                    player.line(target, 'thunder');
                    target.damage(1, 'thunder');
                  }
                },
              },

              furrykill_lingfeng: {
                audio: true,
                trigger: {
                  global: "loseAfter",
                },
                filter: function (event, player) {
                  if (event.type != 'discard') return false;
                  if (event.player == player) return false;
                  var parentEvent = event.getParent("discardPlayerCard");
                  if (parentEvent != {} && parentEvent.target != parentEvent.player) return false;
                  if (!player.countCards('he')) return false;
                  for (var i = 0; i < event.cards2.length; i++) {
                    if (get.position(event.cards2[i], true) == 'd') {
                      return true;
                    }
                  }
                  return false;
                },
                direct: true,
                unique: true,
                gainable: true,
                content: function () {
                  "step 0"
                  if (trigger.delay == false) game.delay();
                  "step 1"
                  var cards = [];
                  for (var i = 0; i < trigger.cards2.length; i++) {
                    if (get.position(trigger.cards2[i], true) == 'd') {
                      cards.push(trigger.cards2[i]);
                    }
                  }
                  if (cards.length) {
                    var maxval = 0;
                    for (var i = 0; i < cards.length; i++) {
                      var tempval = get.value(cards[i]);
                      if (tempval > maxval) {
                        maxval = tempval;
                      }
                    }
                    maxval += cards.length - 1;
                    var next = player.chooseToDiscard('he', '灵风：弃置一张牌以获得其中一张牌');
                    next.set('ai', function (card) {
                      return _status.event.maxval - get.value(card);
                    });
                    next.set('maxval', maxval);
                    event.cards = cards;
                  }
                  "step 2"
                  if (result.bool) {
                    game.cardsGotoOrdering(event.cards);
                    event.videoId = lib.status.videoId++;
                    event.time = get.utc();

                    player.chooseButton(['灵风：获得其中一张牌', event.cards]).set('filterButton', function (button) {
                      return ui.selected.buttons.length == 0;
                    }).set('ai', function (button) {
                      return get.value(button.link);
                    }).set('cards', event.cards).logSkill = 'furrykill_lingfeng';

                    var time = 1000 - (get.utc() - event.time);
                    if (time > 0) {
                      game.delay(0, time);
                    }
                  } else {
                    event.finish();
                  }
                  "step 3"
                  if (result.bool && result.links) {
                    event.cards2 = result.links;
                  } else {
                    event.finish();
                  }
                  "step 4"
                  player.gain(event.cards2[0], 'gain2', 'log');
                },
                ai: {
                  threaten: 1.3,
                },
              },

              furrykill_zhuiying: {
                audio: 2,
                usable: 1,
                trigger: {
                  player: "loseAfter",
                },
                filter: function (event, player) {
                  if (event.type != 'discard') return false;
                  for (var i of event.cards2) {
                    if (get.position(i, true) == 'd' && player.hasUseTarget(i)) return true;
                  }
                  return false;
                },
                content: function () {
                  'step 0'
                  player.chooseButton(['追影：是否使用其中的一张牌？', trigger.cards2.filter(function (i) {
                    return (get.position(i, true) == 'd' && player.hasUseTarget(i));
                  })]).set('ai', function (button) {
                    return _status.event.player.getUseValue(button.link);
                  });
                  'step 1'
                  if (result.bool) {
                    player.$gain2(result.links[0], false);
                    game.delayx();
                    player.chooseUseTarget(true, result.links[0], false).logSkill = 'furrykill_zhuiying';
                  } else player.storage.counttrigger.furrykill_zhuiying--;
                },
              },

              furrykill_lvbing: {
                trigger: {
                  player: "showCharacterAfter",
                },
                hiddenSkill: true,
                popup: false,
                filter: function (event, player) {
                  var target = _status.currentPhase;
                  return event.toShow.contains('furrykill_anliang') && target && target != player;
                },
                content: function () {
                  'step 0';
                  if (player.countCards('he')) {
                    player.chooseCard('he', '履冰：是否将一张牌置于武将牌上作为【霜】？');
                  } else {
                    event.finish();
                  }
                  'step 1';
                  if (result.bool) {
                    player.addToExpansion(result.cards, player, 'giveAuto').gaintag.add('furrykill_hanren');
                    player.logSkill('furrykill_lvbing');
                  }
                },
              },

              furrykill_hanren: {
                group: ["furrykill_hanren_1"],
                trigger: { player: 'phaseJieshuBegin' },
                popup: false,
                notemp: true,
                filter: function (event, player) {
                  return player.countCards('he');
                },
                content: function () {
                  'step 0';
                  player.chooseCard('he', '寒刃：是否将一张牌置于武将牌上作为【霜】？');
                  'step 1';
                  if (result.bool) {
                    player.addToExpansion(result.cards, player, 'giveAuto').gaintag.add('furrykill_hanren');
                    player.logSkill('furrykill_hanren');
                  }
                },
                intro: {
                  content: 'expansion',
                  markcount: 'expansion',
                },
                marktext: '霜',
                onremove: function (player, skill) {
                  var cards = player.getExpansions("furrykill_hanren");
                  if (cards.length) player.loseToDiscardpile(cards);
                },
                subSkill: {
                  1: {
                    trigger: { global: "phaseUseBegin" },
                    popup: false,
                    frequent: true,
                    filter: function (event, player) {
                      return event.player != player
                        && event.player.isAlive()
                        && player.getExpansions('furrykill_hanren').length > 0;
                    },
                    content: function () {
                      'step 0';
                      event.target2 = _status.currentPhase;
                      event.shuang = player.getExpansions('furrykill_hanren');
                      player.chooseButton(['寒刃：是否弃置一张【霜】？弃置后该角色若使用了与此【霜】类别相同的牌，则本阶段不能再使用牌。', event.shuang]).set('filterButton', function (button) {
                        return ui.selected.buttons.length == 0;
                      }).set('ai', function (button) {
                        return get.value(button.link);
                      }).set('cards', event.shuang);
                      'step 1';
                      if (result.bool && result.links) {
                        event.usedShuang = result.links[0];
                        player.loseToDiscardpile(event.usedShuang);
                      } else {
                        event.finish();
                      }
                      'step 2';
                      var shuangType = get.type(event.usedShuang);
                      if (shuangType == 'delay') shuangType = 'trick';
                      event.target2.storage.furrykill_hanren2 = shuangType;
                      'step 3';
                      event.target2.addTempSkill("furrykill_hanren2");
                      game.log(player, '对', event.target2, '发动了【寒刃】，弃置的【霜】为', event.usedShuang);
                    },
                    sub: true,
                  }
                }
              },
              furrykill_hanren2: {
                trigger: { player: 'useCard' },
                direct: true,
                charlotte: true,
                filter: function (event, player) {
                  var usedType = get.type(event.card);
                  if (usedType == 'delay') usedType = 'trick';
                  return usedType == player.storage.furrykill_hanren2;
                },
                content: function () {
                  'step 0';
                  player.addTempSkill("furrykill_hanren2ed", "phaseUseEnd");
                  'step 1';
                  game.log(player, '因为【霜】本阶段不能再使用牌');
                }
              },
              furrykill_hanren2ed: {
                mod: {
                  cardEnabled: function (card, player) {
                    return false;
                  },
                },
              },

              furrykill_ruiyan: {
                enable: 'phaseUse',
                usable: 1,
                filterTarget: function (card, player, target) {
                  return target != player && target.countCards('h') > 0;
                },
                content: function () {
                  'step 0';
                  player.viewHandcards(target);
                  'step 1';
                  var cards = target.getCards('h');
                  var types = cards.map((c) => {
                    return get.type(c);
                  });
                  var typeCount = types.filter((item, index) => {
                    return types.indexOf(item) === index;
                  }).length;

                  if (typeCount >= 2) {
                    player.gainPlayerCard(1, 'h', target, true, 'visible')
                  } else {
                    target.gainPlayerCard(1, 'he', player, true)
                  }
                },
              },

              furrykill_fuyun: {
                locked: true,
                forced: true,
                trigger: { player: 'phaseBegin' },
                content: function () {
                  player.addTempSkill("furrykill_fuyun_1")
                },
                subSkill: {
                  1: {
                    locked: true,
                    forced: true,
                    mod: {
                      suit: function (card, suit) {
                        if (suit == 'spade') return 'heart';
                      },
                    },
                    sub: true,
                  }
                }
              },

              furrykill_changlong: {
                trigger: { player: 'useCardToTarget' },
                direct: true,
                filter: function (event, player) {
                  var card = event.card;
                  var info = get.info(card);
                  if (get.suit(card) != 'heart') return false;
                  if (!event.isFirstTarget) return false;
                  if (info.allowMultiple == false) return false;
                  console.log(info.allowMultiple);
                  if (event.targets && !info.multitarget) {
                    if (game.hasPlayer(function (current) {
                      return !event.targets.contains(current) && lib.filter.targetEnabled2(event.card, event.player, current);
                    })) {
                      return true;
                    }
                  }
                  return false;
                },
                content: function () {
                  'step 0'
                  var prompt2 = '为' + get.translation(trigger.card) + '额外指定一名角色成为目标'
                  player.chooseTarget(get.prompt('furrykill_changlong'), function (card, player, target) {
                    var player = _status.event.source;
                    return !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
                  }).set('prompt2', prompt2).set('ai', function (target) {
                    var trigger = _status.event.getTrigger();
                    var player = _status.event.source;
                    return get.effect(target, trigger.card, player, _status.event.player);
                  }).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player);
                  'step 1'
                  if (result.bool) {
                    if (!event.isMine() && !event.isOnline()) game.delayx();
                    event.targets = result.targets;
                  }
                  else {
                    event.finish();
                  }
                  'step 2'
                  if (event.targets) {
                    player.logSkill('furrykill_changlong', event.targets);
                    trigger.targets.addArray(event.targets);
                    game.log(event.targets, '也成为了', trigger.card, '的目标');
                  }
                }
              },

              furrykill_qifu: {
                unique: true,
                juexingji: true,
                forced: true,
                trigger: { player: 'phaseZhunbeiBegin' },
                skillAnimation: true,
                animationColor: 'thunder',
                init: function (player) {
                  if (!player.storage.furrykill_qifu) player.storage.furrykill_qifu = 0;
                },
                intro: {
                  content: '已祈福#次'
                },
                filter: function (event, player) {
                  return player.hasSkill('furrykill_changlong') && player.storage.furrykill_qifu >= 7;
                },
                content: function () {
                  player.awakenSkill('furrykill_qifu');
                  player.loseMaxHp();
                  player.removeSkill('furrykill_changlong');
                  player.removeSkill('furrykill_qifu_1');
                  player.addSkill('furrykill_zhaocai');
                },
                group: ["furrykill_qifu_1"],
                subSkill: {
                  1: {
                    forced: true,
                    trigger: { player: "useCard" },
                    filter: function (event, player) {
                      return event.card && get.suit(event.card) == 'heart';
                    },
                    content: function () {
                      player.storage.furrykill_qifu++;
                      player.markSkill('furrykill_qifu');
                    },
                  }
                }
              },

              furrykill_zhaocai: {
                enable: 'phaseUse',
                filterTarget: function (card, player, target) {
                  return target != player;
                },
                filter: function (event, player) {
                  return player.countCards('he', { suit: 'heart' });
                },
                filterCard: function (card) {
                  return get.suit(card) == 'heart';
                },
                position: 'he',
                content: function () {
                  target.draw(2);
                },
              },

              furrykill_lianfu: {
                init: function (player) {
                  if (!player.storage.furrykill_lianfu) player.storage.furrykill_lianfu = 0;
                },
                group: ["furrykill_lianfu_1", "furrykill_lianfu_2"],
                locked: true,
                forced: true,
                subSkill: {
                  1: {
                    trigger: { global: "gameStart" },
                    forced: true,
                    popup: false,
                    content: function () {
                      player.link();
                    },
                    sub: true,
                  },
                  2: {
                    trigger: { player: 'linkBefore' },
                    forced: true,
                    prompt2: "你的武将牌重置时，改为你增加一点体力上限，然后选择一项",
                    filter: function (event, player) {
                      return player.isLinked();
                    },
                    content: function () {
                      'step 0';
                      player.gainMaxHp();
                      var list = ["摸两张牌", "获得场上的一张牌", "于当前回合结束后横置至多两名其他角色"];

                      if (!game.hasPlayer(function (current) {
                        return current.countGainableCards(player, 'ej') > 0;
                      })) list.remove("获得场上的一张牌");

                      player.chooseControl(list, true, function () {
                        return "摸两张牌";
                      }).set('prompt', get.prompt2('furrykill_lianfu_2'));
                      'step 1';
                      if (result.control == "摸两张牌") {
                        player.draw(2);
                      } else if (result.control == "获得场上的一张牌") {
                        player.chooseTarget('请选择一名角色，获得其装备区或判定区内的一张牌', true, function (card, player, target) {
                          return target.countGainableCards(player, 'ej') > 0;
                        }).set('ai', function (target) {
                          var player = _status.event.player;
                          var att = get.attitude(player, target);
                          if (att > 0 && target.countCards('ej', function (card) {
                            return get.position(card) == 'j' || get.value(card, target) <= 0;
                          })) return 2 * att;
                          else if (att < 0 && target.countCards('e', function (card) {
                            return get.value(card, target) > 5;
                          })) return -att;
                          return -1;
                        });
                      } else {
                        if (!player.hasSkill("furrykill_lianfu_3")) player.addSkill("furrykill_lianfu_3");
                        player.storage.furrykill_lianfu++;
                      }
                      'step 2';
                      if (result.bool) {
                        var target = result.targets[0];
                        player.logSkill('furrykill_lianfu', target);
                        player.gainPlayerCard(target, 'ej', true);
                      }
                      trigger.cancel();
                    },
                    sub: true,
                  },
                  3: {
                    trigger: { global: "phaseAfter" },
                    direct: true,
                    filter: function (event, player) {
                      return player.storage.furrykill_lianfu > 0;
                    },
                    content: function () {
                      'step 0';
                      player.chooseTarget('链缚：横置至多两名其他角色', [0, 2], function (card, player, target) {
                        return target != player && !target.isLinked();
                      }).ai = function (target) {
                        return -get.attitude(player, target);
                      };
                      'step 1';
                      if (result.bool) {
                        var length = result.targets.length;
                        for (let i = 0; i < length; i++) {
                          result.targets[i].link(true);
                        }
                        player.logSkill('furrykill_lianfu', result.targets);
                      }
                      'step 2';
                      player.storage.furrykill_lianfu--;
                      if (player.storage.furrykill_lianfu > 0) {
                        event.goto(0);
                      } else {
                        player.removeSkill("furrykill_lianfu_3");
                      }
                    },
                    sub: true,
                  }
                }
              },

              furrykill_pojia: {
                skillAnimation: true,
                animationColor: "thunder",
                unique: true,
                juexingji: true,
                trigger: {
                  player: "dying",
                },
                forced: true,
                filter: function (event, player) {
                  return player.hasSkill("furrykill_lianfu");
                },
                content: function () {
                  "step 0"
                  player.removeSkill("furrykill_lianfu");
                  "step 1"
                  player.recover(Infinity);
                  "step 2"
                  player.addSkill('furrykill_pojia_after');
                }
              },
              furrykill_pojia_after: {
                trigger: { global: "phaseAfter" },
                direct: true,
                charlotte: true,
                content: function () {
                  "step 0"
                  player.drawTo(player.maxHp);
                  "step 1"
                  game.countPlayer(function (current) {
                    current.link(true);
                  });
                  game.log(player, '横置了所有角色')
                  game.delayx();
                  "step 2"
                  player.removeSkill("furrykill_pojia_after");
                }
              },

              furrykill_dielang: {
                locked: true,
                forced:true,
                trigger: { player: 'useCard' },
                filter: function (event, player) {
                  return _status.currentPhase == player;
                },
                intro: {
                  content: '点数为#'
                },
                content: function () {
                  'step 0';
                  var dice = get.number(trigger.card);
                  var drop = dice <= player.storage.furrykill_dielang;
                  player.storage.furrykill_dielang = dice;
                  player.markSkill('furrykill_dielang');
                  if (drop) event.goto(2);
                  'step 1';
                  player.draw();
                  event.finish();
                  'step 2';
                  var cards = player.getCards('he');
                  var hasBasic = false, hasTrick = false, hasEquip = false;
                  for (let i = 0; i < cards.length; i++) {
                    var type = get.type(cards[i]);
                    if (type == 'basic') {
                      hasBasic = true;
                    } else if (type == 'equip') {
                      hasEquip = true;
                    } else {
                      hasTrick = true;
                    }
                    if (hasBasic && hasTrick && hasEquip) break;
                  }
                  var list = ['弃置三张类别不同的牌', '结束出牌阶段'];
                  if (!hasBasic || !hasEquip || !hasTrick) {
                    list.remove('弃置三张类别不同的牌');
                  }
                  player.chooseControl(list, true, function () {
                    if (list.contains('弃置三张类别不同的牌')) return '弃置三张类别不同的牌';
                    return '结束出牌阶段';
                  }).set('prompt', '叠浪：弃置三张类别不同的牌或于此牌结算完毕后结束出牌阶段。');
                  'step 3';
                  if (result.control == '结束出牌阶段') {
                    var evt = _status.event.getParent('phaseUse');
                    if (evt && evt.name == 'phaseUse') {
                      evt.skipped = true;
                    }
                    event.finish();
                  }
                  'step 4';
                  var next = player.chooseToDiscard('叠浪：弃置三张类别不同的牌', 3, function(card){
                    var cards = ui.selected.cards;
                    var length = cards.length;
                    var allow = ['basic', 'trick', 'equip'];
                    if(length > 0) allow.remove(get.type(cards[0], 'trick'));
                    if(length > 1) allow.remove(get.type(cards[1], 'trick'));
                    return allow.contains(get.type(card, 'trick'));
                  }, 'he', true);
                  next.set('num',num);
                  next.set('complexCard',true);
                  next.set('ai', function (card) {
                    return 9 - get.value(card);
                  });
                },
                group: ["furrykill_dielang_1", "furrykill_dielang_2"],
                subSkill: {
                  1: {
                    direct: true,
                    charlotte: true,
                    trigger: { player: "phaseUseBegin" },
                    content: function () {
                      player.storage.furrykill_dielang = 0;
                    },
                    sub: true,
                  },
                  2: {
                    direct: true,
                    charlotte: true,
                    trigger: { player: "phaseUseAfter" },
                    content: function () {
                      player.unmarkSkill('furrykill_dielang');
                    },
                    sub: true,
                  }
                }
              },

              furrykill_shouhe: {
                enable: "phaseUse",
                filterCard: function (card, player) {
                  var minDice = player.getCards('h').map((item) => {
                    return get.number(item);
                  }).reduce((a, b) => a < b ? a : b);
                  console.log("min dice is" + minDice)
                  return get.number(card) == minDice;
                },
                viewAs: {
                  name: "sha",
                  nature: "thunder",
                  shouhe: true,
                },
                intro: {
                  content: '手牌上限加#'
                },
                viewAsFilter: function (player) {
                  if (!player.countCards('h')) return false;
                },
                prompt: "将一张点数最小的手牌当做无次数限制的雷杀使用",
                onuse: function (result, player) {
                  var dice = get.number(result.cards[0]);
                  var delta = player.storage.furrykill_dielang - dice;
                  if (delta <= -8 || delta >= 8) {
                    player.storage.furrykill_shouhe += 2;
                    player.markSkill('furrykill_shouhe');
                  }
                },
                group:["furrykill_shouhe_1", "furrykill_shouhe_2", "furrykill_shouhe_3"],
                subSkill: {
                  1:{
                    mod:{
                      cardUsable:function(card,player){
                        if(card.name=='sha'&&card.shouhe) return Infinity;
                      }
                    },
                    sub: true,
                  },
                  2: {
                    direct: true,
                    charlotte: true,
                    mod: {
                      maxHandcard: function (player, num) {
                        if(player.storage.furrykill_shouhe)
                          return num + player.storage.furrykill_shouhe;
                        return num;
                      },
                    },
                    trigger: { player: "phaseBefore" },
                    content: function () {
                      player.storage.furrykill_shouhe = 0;
                    },
                    sub: true,
                  },
                  3: {
                    direct: true,
                    charlotte: true,
                    trigger: { player: "phaseAfter" },
                    content: function () {
                      player.unmarkSkill('furrykill_shouhe');
                    },
                    sub: true,
                  }
                }
              },

            },
            dynamicTranslate: dynamicTranslate,
            translate: {
              furrykill_dingchen: "定尘",
              furrykill_dingchen_info: "隐匿，你于回合外登场后，可以视为对当前回合角色使用一张杀。",
              furrykill_suixin: "碎心",
              furrykill_suixin_info: "锁定技，你对未受伤角色造成伤害时，该角色失去一点体力；你成为杀或决斗的目标时，若你的武将牌背面朝上，可以弃置一张牌，取消目标。",
              furrykill_xiaoshi: "消逝",
              furrykill_xiaoshi_info: "每轮限一次，其他角色的准备阶段，你可以视为对该角色使用一张杀。若此杀造成伤害，你弃置该角色的一张牌；否则你翻面。",
              furrykill_fenyou: "分忧",
              furrykill_fenyou_info: "你攻击范围内的其他角色成为基本牌或普通锦囊的唯一目标时，若使用者不是你，你可以失去一点体力，取消之。",
              furrykill_zhian: "致安",
              furrykill_zhian_info: "其他角色的准备阶段，你可以交给其一张黑色牌，其选择一项：1、摸一张牌；2、弃置一张红色牌，令你回复一点体力。",
              furrykill_shanjian: "闪剑",
              furrykill_shanjian_info: "出牌阶段限一次，你可以摸一张牌并指定一名角色，直到此阶段结束，你与其结算距离为1，且使用的牌只能以你或该角色为目标。",
              furrykill_yvnian: "驭念",
              furrykill_yvnian_info: "你即将造成属性伤害时，可以弃一张牌令伤害+1，或摸一张牌令伤害-1。",
              furrykill_qianlie: "潜猎",
              furrykill_qianlie_info: "转换技，阳：以你为目标的锦囊牌结算完毕后，可以使用一张杀或伤害锦囊牌。阴：你造成的伤害结算完毕后，可以发现一张牌，若此时是你的出牌阶段，结束此阶段并跳过本回合的弃牌阶段。",
              furrykill_youxia: "游侠",
              furrykill_youxia_info: "锁定技，摸牌阶段，你额外摸一张牌。",
              furrykill_xulei: "蓄雷",
              furrykill_xulei_info: "锁定技，你的武将牌始终背面朝上，且你没有判定区。你成为非装备牌的目标时，或一名角色受到伤害后，若你的手牌数少于6，摸一张牌。",
              furrykill_shineng: "势能",
              furrykill_shineng_info: "一名角色的回合结束时，你可以弃置任意数量的牌。若这些牌的点数之和不小于13，你可以使用其中的一张；若点数之和不小于32，你可以造成一点雷电伤害。",
              furrykill_lingfeng: "灵风",
              furrykill_lingfeng_info: "其他角色弃置的牌进入弃牌堆后，你可以弃置一张牌并获得其中一张。",
              furrykill_zhuiying: "追影",
              furrykill_zhuiying_info: "每个回合限一次，你的牌因弃置进入弃牌堆后，你可以使用其中的一张。",
              furrykill_shuang: "霜",
              furrykill_lvbing: "履冰",
              furrykill_lvbing_info: "隐匿，你于其他角色的回合登场后，可以将一张牌置于武将牌上，称为霜。",
              furrykill_hanren: "寒刃",
              furrykill_hanren_info: "结束阶段，你可以将一张牌置于武将牌上，称为霜。其他角色的出牌阶段开始时，你可以弃置一张霜，然后该角色若使用了与此霜类别相同的牌，则本阶段不能再使用牌。",
              furrykill_ruiyan: "锐眼",
              furrykill_ruiyan_info: "出牌阶段限一次，你可以观看一名其他角色的手牌，若其中包含至少两种类别的牌，你选择其中一张获得；否则其获得你的一张牌。",
              furrykill_fuyun: "福运",
              furrykill_fuyun_info: "锁定技，你的回合内，你的♠牌均视为♥花色。",
              furrykill_changlong: "昌隆",
              furrykill_changlong_info: "你使用的♥牌可以额外指定一名角色成为目标。",
              furrykill_qifu: "祈福",
              furrykill_qifu_info: "觉醒技，准备阶段，若你本局游戏使用的♥牌数量不少于7，你减少一点体力上限，失去昌隆，然后获得招财。",
              furrykill_zhaocai: "招财",
              furrykill_zhaocai_info: "出牌阶段，你可以弃置一张♥牌，令一名其他角色摸两张牌。",
              furrykill_lianfu: "链缚",
              furrykill_lianfu_info: "锁定技，游戏开始时，你横置；你的武将牌重置时，改为你增加一点体力上限，然后选择一项:1、摸两张牌;2、获得场上的一张牌;3、于当前回合结束后横置至多两名其他角色。",
              furrykill_pojia: "破枷",
              furrykill_pojia_info: "觉醒技，你濒死时，恢复全部体力，失去链缚。当前回合结束后，你将手牌补至体力上限，然后横置所有角色。",
              furrykill_dielang: "叠浪",
              furrykill_dielang_info: "锁定技，你于出牌阶段使用牌时，若此牌点数大于你于此阶段使用的上一张牌，你摸一张牌；否则你弃置三张类别不同的牌或于此牌结算完毕后结束出牌阶段。",
              furrykill_shouhe: "收合",
              furrykill_shouhe_info: "出牌阶段限一次，你可以将手牌中点数最小的牌当做无次数限制的雷杀使用。若此牌点数与你本阶段使用的上一张牌相差至少8点，本回合你的手牌上限+2。",
            },
          },
        }, "FurryKill");
      }
    }, help: {}, config: {
      "FurryKill": { "name": "将FurryKill设为禁用", "init": false },
    }, package: {
      intro: `
				<span style='font-weight: bold;'>小动物的三国杀</span>
			`,
      author: "SwordFox & XuankaiCat",
      diskURL: "",
      forumURL: "",
      version: "1.9.115.1.7",
    },
  }
})