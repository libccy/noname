'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'mtg',
	    character:{
			mtg_jiding:['male','qun',4,['mbaizhan','msilian']],
			// mtg_qianzhuo:['female','shu',3,[]],
			mtg_jiesi:['male','wei',3,['mtongnian','msuoling','mhuanyi']],
			// mtg_lilianna:['female','qun',3,[]],
			// mtg_nisha:['female','wu',3,[]],
			// mtg_ayeni:['male','qun',4,[]],
	    },
		characterIntro:{
			mtg_jiding:'这名白色魔法的使用者极其注重忠诚，正义和荣誉。他曾全力追捕茜卓纳拉，如今已不可思议地与这位火焰法师成为伙伴。',
			mtg_qianzhuo:'茜卓纳拉是使用红色法术力的旅法师。她擅长使用火焰：除了火焰，还是火焰。茜卓性格冲动、易怒、富有激情，不断增长的火焰法术能力随时都准备爆发。她的火花在还很年轻时便已点燃，如今已是相当有经验的烈焰术士和旅法师。',
			mtg_jiesi:'杰斯贝连是使用蓝色法术的鹏洛客。他擅长心灵法术：读取心灵，幻影，知识，以及欺瞒的咒语。',
			mtg_lilianna:'莉莲娜维斯是一位精通死灵术的旅法师，她擅长用黑色法术力来复活死者，腐化生者，并从死亡中召唤力量。',
			mtg_nisha:'赞迪卡妖精部落玖瑞加的一名战士，做事倾尽全力，与大地有密切的联系，还擅使元素魔法。她能够引导时空的魔法生机地脉，为土地赋予生命。',
			mtg_ayeni:'金鬃阿耶尼是使用白色法术的鹏洛客。他长于净化身体与心灵的法术：用咒语来治疗、强化盟友，以及唤醒他人内在的心灵精华。',
		},
	    skill:{
			msuoling:{
				enable:'chooseToUse',
				// round:1,
    			filterCard:function(card){
    				return get.type(card,'trick')=='trick';
    			},
    			viewAsFilter:function(player){
    				return player.countCards('h',{type:['trick','delay']})>0;
    			},
    			viewAs:{name:'wuxie',{storage:{nowuxie:true}}},
    			prompt:'将一张锦囊牌当无懈可击使用',
    			check:function(card){return 8-get.value(card)},
    			threaten:1.2
			},
			mtongnian:{
				trigger:{player:'phaseUseBegin'},
				forced:true,
				filter:function(event,player){
					var enemies=player.getEnemies();
					for(var i=0;i<enemies.length;i++){
						if(enemies[i].countCards('h')) return true;
					}
					return false;
				},
				getList:function(player){
					var list=[];
					var enemies=player.getEnemies();
					for(var i=0;i<enemies.length;i++){
						list.addArray(enemies[i].getCards('h'));
					}
					return list;
				},
				content:function(){
					var list=lib.skill.mtongnian.getList(player);
					var card=list.randomGet();
					var fake=game.createCard(card);
					fake.mtongnian_link=card;
					player.gain(fake,'draw')._triggered=null;
					fake.classList.add('glow');
					fake._destroy='mtongnian';
				},
				group:['mtongnian_change','mtongnian_use','mtongnian_lose'],
				subSkill:{
					change:{
						trigger:{player:'useCard'},
						silent:true,
						filter:function(event,player){
							return player.hasCard(function(card){
								return card.mtongnian_link?true:false;
							},'h');
						},
						content:function(){
							var list=lib.skill.mtongnian.getList(player);
							var hs=player.getCards('h',function(card){
								return card.mtongnian_link?true:false;
							});
							for(var i=0;i<hs.length;i++){
								var current=hs[i].mtongnian_link;
								hs[i].mtongnian_link=list.randomGet(current);
								if(!hs[i].mtongnian_link){
									hs[i].mtongnian_link=current;
								}
								hs[i].init(hs[i].mtongnian_link);
							}
						}
					},
					use:{
						trigger:{player:'useCardBefore'},
						silent:true,
						filter:function(event,player){
							return event.card.mtongnian_link?true:false;
						},
						content:function(){
							var link=trigger.card.mtongnian_link;
							var target=get.owner(link);
							if(target&&target!=player){
								trigger.cards.add(trigger.card);
								player.lose(trigger.cards,ui.discardPile);
								trigger.card=link;
								trigger.cards.length=0;
								trigger.cards.push(link);
								target.lose(link,ui.discardPile);
								player.logSkill('mtongnian',target);
								game.log(target,'失去了',link);
								game.delayx();
							}
							else{
								player.lose(trigger.card);
								trigger.cancel();
							}
						}
					},
					lose:{
						trigger:{player:'phaseUseEnd',global:'loseEnd'},
						silent:true,
						filter:function(event,player){
							if(event.name=='lose'){
								return lib.skill.mtongnian.getList(player).length==0;
							}
							return true;
						},
						content:function(){
							var hs=player.getCards('h',function(card){
								return card.mtongnian_link?true:false;
							});
							if(hs.length){
								player.lose(hs)._triggered=null;
							}
						}
					}
				},
				ai:{
					threaten:1.3
				}
			},
			mbaizhan:{
				trigger:{source:'damageEnd'},
				forced:true,
				filter:function(event){
					return event.num>0;
				},
				content:function(){
					player.changeHujia(trigger.num);
				}
			},
			msilian:{
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					return player.hujia>0;
				},
				check:function(event,player){
					return player.hujia>1&&player.hp>1;
				},
				content:function(){
					player.storage.msilian=player.hujia;
					player.changeHujia(-player.hujia);
					player.insertPhase();
				},
				group:['msilian_hp','msilian_draw'],
				subSkill:{
					hp:{
						trigger:{player:'phaseAfter'},
						silent:true,
						filter:function(event,player){
							return event.skill=='msilian'&&!player.getStat('damage');
						},
						content:function(){
							player.loseHp();
						}
					},
					draw:{
						trigger:{player:'phaseDrawBegin'},
						filter:function(event){
							return event.getParent('phase').skill=='msilian';
						},
						silent:true,
						content:function(){
							trigger.num+=player.storage.msilian-2;
						}
					}
				}
			}
	    },
	    translate:{
	        mtg_jiding:'基定',
			mtg_qianzhuo:'茜卓',
			mtg_jiesi:'杰斯',
			mtg_lilianna:'莉莲娜',
			mtg_nisha:'妮莎',
			mtg_ayeni:'阿耶尼',

			mbaizhan:'百战',
			mbaizhan_info:'锁定技，每当你造成一点伤害，你获得一点护甲',
			msilian:'祀炼',
			msilian_info:'结束阶段，若你有护甲，你可以移去全部护甲，然后进行一个额外回合；在额外回合中，你的摸牌阶段摸牌基数为你移去的护甲数；额外回合结束后，若你未造成伤害，你失去一点体力',
			mtongnian:'通念',
			mtongnian_info:'锁定技，出牌阶段开始时，你获得一张替身牌，此牌对应一名随机敌人的一张随机手牌；每当你使用一张非替身牌，随机更换替身牌对应的牌；当你使用替身牌时，改为使用替身牌对应的牌；当出牌阶段结束，或替身牌离开手牌区，或敌方角色没有手牌时，销毁替身牌',
			msuoling:'塑灵',
			msuoling_info:'你可以将一张锦囊牌当作无懈可击使用，此无懈可击不能被其它无懈可击响应',
			mhuanyi:'幻逸',
			mhuanyi_info:'结束阶段，你可以将【效果1】分配给任意名角色，然后将【效果2】分配给其余角色（分配结果对其他角色不可见）。效果1：当目标对你首次使用卡牌时，若此牌为基本牌，则取消之；效果2：当目标对你首次使用卡牌时，若此牌为非基本牌，则取消之',
	    },
	};
});
