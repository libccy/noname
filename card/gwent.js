'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'gwent',
		card:{
			gw_ansha:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:function(card,player){
					var enemies=player.getEnemies();
					return game.hasPlayer(function(current){
						return current.hp==1&&enemies.contains(current);
					});
				},
				notarget:true,
				contentBefore:function(){
					player.$skill('暗杀','legend','metal');
					game.delay(2);
				},
				content:function(){
					var enemies=player.getEnemies();
					var list=game.filterPlayer(function(current){
						return current.hp==1&&enemies.contains(current);
					});
					if(list.length){
						var target=list.randomGet();
						player.line(target);
						target.die()._triggered=null;
					}
				},
				contentAfter:function(){
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					useful:[6,1],
					result:{
						player:1
					},
					order:0.6,
				}
			},
			gw_xinsheng:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:function(card,player){
					return game.hasPlayer(function(current){
						return !current.isUnseen();
					});
				},
				notarget:true,
				contentBefore:function(){
					player.$skill('新生','legend','metal');
					game.delay(2);
				},
				content:function(){
					'step 0'
					var target=game.findMax(game.filterPlayer(function(current){
						return !current.isUnseen();
					}).randomSort(),function(current){
						var att=get.attitude(player,current);
						var rank=get.rank(current,true);
						if(current.maxHp>=3){
							if(current.hp<=1){
								return att*2;
							}
							else if(current.hp==2){
								if(att>0){
									att*=1.5;
								}
								else{
									att/=1.5;
								}
							}
						}
						if(rank>=7){
							if(att>0){
								return att/10;
							}
							return -att;
						}
						else if(rank<=4){
							if(att<0){
								return -att/10;
							}
							return att;
						}
						return Math.abs(att/2);
					})[0];
					event.aitarget=target;
					var list=[];
					for(var i in lib.character){
						if(!lib.filter.characterDisabled(i)&&lib.character[i][2]>=5){
							list.push(i);
						}
					}
    				var players=game.players.concat(game.dead);
    				for(var i=0;i<players.length;i++){
    					list.remove(players[i].name);
    					list.remove(players[i].name1);
    					list.remove(players[i].name2);
    				}
    				var dialog=ui.create.dialog('选择一张武将牌','hidden');
    				dialog.add([list.randomGets(12),'character']);
    				player.chooseButton(dialog,true).ai=function(button){
						if(get.attitude(player,event.aitarget)>0){
							return get.rank(button.link,true);
						}
						else{
							return -get.rank(button.link,true);
						}
    				};
    				'step 1'
					event.nametarget=result.links[0];
					player.chooseTarget(true,'使用'+get.translation(event.nametarget)+'替换一名角色的武将牌',function(card,player,target){
						return !target.isUnseen();
					}).ai=function(target){
						if(target==event.aitarget){
							return 1;
						}
						else{
							return 0;
						}
					}
					'step 2'
					var target=result.targets[0];
    				target.reinit(target.name,event.nametarget);
                    target.hp=target.maxHp;
                    target.update();
					player.line(target,'green');
				},
				contentAfter:function(){
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					useful:[6,1],
					result:{
						player:1
					},
					order:0.5,
				}
			},
			gw_niuquzhijing:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:function(card,player){
					return game.hasPlayer(function(current){
						return current.hp!=player.hp;
					});
				},
				notarget:true,
				contentBefore:function(){
					var list1=game.filterPlayer(function(current){
						return current.isHighestHp();
					});
					var list2=game.filterPlayer(function(current){
						return current.isLowestHp();
					});
					player.line(list1);
					for(var i=0;i<list1.length;i++){
						list1[i].animate('target');
					}
					setTimeout(function(){
						var list11=list1.slice(0);
						var list22=list2.slice(0);
						while(list22.length>list11.length){
							list11.push(list1.randomGet());
						}
						while(list22.length<list11.length){
							list22.push(list2.randomGet());
						}
						list11.sortBySeat();
						list22.sortBySeat();
						while(list11.length){
							list11.shift().line(list22.shift(),'green');
						}
					},500);
					player.$skill('纽曲之镜','legend','metal');
					game.delay(2);
				},
				content:function(){
					var max=null,min=null;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isHighestHp()){
							max=game.players[i].hp;break;
						}
					}
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isLowestHp()){
							min=game.players[i].hp;break;
						}
					}
					var targets=game.filterPlayer();
					if(max!=min&&max!=null&&min!=null){
						for(var i=0;i<targets.length;i++){
							if(targets[i].hp==max){
								targets[i].hp=min;
								targets[i].$damagepop(min-max);
							}
							else if(targets[i].hp==min){
								targets[i].hp=max;
								targets[i].$damagepop(max-min,'wood');
								if(targets[i].maxHp<targets[i].hp){
									targets[i].maxHp=targets[i].hp;
								}
							}
							targets[i].update();
						}
					}
				},
				contentAfter:function(){
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					useful:[6,1],
					result:{
						player:function(player,target){
							return game.countPlayer(function(current){
								if(current.isHighestHp()){
									return -get.sgn(get.attitude(player,current));
								}
								if(current.isLowestHp()){
									return get.sgn(get.attitude(player,current));
								}
							});
						}
					},
					order:3.5,
				}
			},
			gw_zhongmozhizhan:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:true,
				notarget:true,
				contentBefore:function(){
					player.line(game.filterPlayer());
					player.$skill('终末之战','legend','metal');
					game.delay(2);
				},
				content:function(){
					'step 0'
					event.num=0;
					event.targets=game.filterPlayer().sortBySeat();
					'step 1'
					if(event.num<targets.length){
						ui.clear();
						var target=targets[event.num];
						var cards=target.getCards('hej');
						target.lose(cards)._triggered=null;
						target.$throw(cards);
						event.num++;
						event.redo();
						game.delay(0.7);
					}
					'step 2'
					ui.clear();
				},
				contentAfter:function(){
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					useful:[6,1],
					result:{
						player:function(player,target){
							if(player.hasUnknown()) return 0;
							return -game.countPlayer(function(current){
								return current.countCards('he')*get.sgn(get.attitude(player,current));
							});
						}
					},
					order:0.5,
				}
			},

			gw_butianshu:{
				fullborder:'silver',
				type:'spell',
				subtype:'spell_silver',
				vanish:true,
				enable:true,
				filterTarget:true,
				// contentBefore:function(){
				// 	player.$skill('卜天术','legend','water');
				// 	game.delay(2);
				// },
				content:function(){
					'step 0'
    				var list=[];
    				for(var i in lib.card){
    					if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
    					if(lib.card[i].type=='delay') list.push([cards[0].suit,cards[0].number,i]);
    				}
    				var dialog=ui.create.dialog('卜天术',[list,'vcard']);
					var bing=target.countCards('h')<=1;
    				player.chooseButton(dialog,true,function(button){
                        if(ai.get.effect(target,{name:button.link[2]},player,player)>0){
							if(button.link[2]=='bingliang'){
                                if(bing) return 2;
                                return 0.7;
        					}
        					if(button.link[2]=='lebu'){
        						return 1;
        					}
        					if(button.link[2]=='guiyoujie'){
        						return 0.5;
        					}
        					if(button.link[2]=='caomu'){
        						return 0.3;
        					}
        					return 0.2;
                        }
                        return 0;
    				}).filterButton=function(button){
    					return !target.hasJudge(button.link[2]);
    				};
    				'step 1'
					var card=game.createCard(result.links[0][2]);
					event.judgecard=card;
					target.$draw(card);
					game.delay(0.7);
					'step 2'
    				target.addJudge(event.judgecard);
				},
				ai:{
					value:8,
					useful:[5,1],
					result:{
						player:function(player,target){
							var eff=0;
							for(var i in lib.card){
								if(lib.card[i].type=='delay'){
									var current=ai.get.effect(target,{name:i},player,player);
									if(current>eff){
										eff=current;
									}
								}
							}
							return eff;
						}
					},
					order:6,
				}
			},
			gw_shizizhaohuan:{
				fullborder:'silver',
				type:'spell',
				subtype:'spell_silver',
				vanish:true,
				enable:true,
				filterTarget:function(card,player,target){
					return target==player;
				},
				selectTarget:-1,
				// contentBefore:function(){
				// 	player.$skill('十字召唤','legend','water');
				// 	game.delay(2);
				// },
				content:function(){
    				var list=[];
					list.push(get.cardPile('sha','cardPile'));
					list.push(get.cardPile('shan','cardPile'));
					list.push(get.cardPile('tao','cardPile'));
					// list.push(get.cardPile('jiu','cardPile'));
					if(list.length){
						player.gain(list,'gain2');
					}
				},
				ai:{
					value:8,
					useful:[6,1],
					result:{
						player:1
					},
					order:6,
				}
			},
			gw_zuihouyuanwang:{
				fullborder:'silver',
				type:'spell',
				subtype:'spell_silver',
				vanish:true,
				enable:true,
				filterTarget:function(card,player,target){
					return target==player;
				},
				selectTarget:-1,
				// contentBefore:function(){
				// 	player.$skill('最后愿望','legend','water');
				// 	game.delay(2);
				// },
				content:function(){
					'step 0'
					event.num=game.countPlayer();
					player.draw(event.num);
					'step 1'
					player.chooseToDiscard(true,event.num,'he');
				},
				ai:{
					value:6,
					useful:[4,1],
					result:{
						player:1
					},
					order:7,
				}
			},
			gw_zirankuizeng:{
				fullborder:'silver',
				type:'spell',
				subtype:'spell_silver',
				vanish:true,
				enable:function(card,player){
					if(!player.storage.gw_zirankuizeng) return false;
					var evtcard=player.storage.gw_zirankuizeng[0];
					var targets=player.storage.gw_zirankuizeng[1];
					if(!lib.filter.cardEnabled(evtcard,player)) return false;
					for(var i=0;i<targets.length;i++){
						if(!targets[i].isIn()) return false;
						if(!player.canUse(evtcard,targets[i],false)){
							return false;
						}
					}
					return true;
				},
				notarget:true,
				// contentBefore:function(){
				// 	player.$skill('自然馈赠','legend','water');
				// 	game.delay(2);
				// },
				content:function(){
					'step 0'
					var info=player.storage.gw_zirankuizeng;
					player.useCard(game.createCard(info[0]),info[1]);
					'step 1'
					player.draw();
				},
				ai:{
					value:6,
					useful:[4,1],
					result:{
						player:1
					},
					order:7,
				}
			},

			gw_zhihuanjun:{
				fullborder:'bronze',
				type:'spell',
				subtype:'spell_bronze',
				enable:true,
				filterTarget:function(card,player,target){
					return target.isDamaged();
				},
				content:function(){
					target.loseMaxHp(true);
				},
				ai:{
					value:4,
					useful:[3,1],
					result:{
						target:function(player,target){
							if(target.maxHp-target.hp==1){
								return -1/target.maxHp;
							}
							else{
								return -1/target.maxHp/3;
							}
						}
					},
					order:8,
				}
			},
			gw_zumoshoukao:{
				fullborder:'bronze',
				type:'spell',
				subtype:'spell_bronze',
				enable:true,
				filterTarget:true,
				content:function(){
					target.addTempSkill('fengyin',{player:'phaseAfter'});
					if(target.hujia){
						target.changeHujia(-target.hujia);
					}
				},
				ai:{
					value:4,
					useful:[4,1],
					result:{
						target:function(player,target){
							var threaten=ai.get.threaten(target,player,true);
							if(target.hujia){
								threaten*=(target.hujia+1);
							}
							else if(target.hasSkill('fengyin')){
								return 0;
							}
							return -threaten;
						}
					},
					order:9.5,
				}
			},
			gw_aozuzhilei:{
				fullborder:'bronze',
				type:'spell',
				subtype:'spell_bronze',
				enable:true,
				cardnature:'thunder',
				filterTarget:function(card,player,target){
					return target.hp>=player.hp;
				},
				content:function(){
					'step 0'
					target.damage('thunder');
					'step 1'
					if(target.isIn()){
						target.draw();
					}
				},
				ai:{
					basic:{
						order:1.8,
						value:[6,1],
						useful:[4,1],
					},
					result:{
						target:-1
					},
					tag:{
						damage:1,
						thunderDamage:1,
						natureDamage:1,
					}
				}
			},
			gw_poxiao:{
				fullborder:'bronze',
				type:'spell',
				subtype:'spell_bronze',
				enable:true,
				notarget:true,
				content:function(){
					'step 0'
					var choice=1;
					if(game.countPlayer(function(current){
						if(current.countCards('j')){
							if(get.attitude(player,current)>0){
								choice=0;
							}
							return true;
						}
					})){
						player.chooseControl().set('choiceList',[
							'弃置一名角色判定区内的所有牌',
							'随机获得一张铜卡法术（破晓除外）并展示之'
						],function(){
							return choice;
						});
					}
					else{
						event.directfalse=true;
					}
					'step 1'
					if(!event.directfalse&&result.index==0){
						player.chooseTarget(true,'弃置一名角色判定区内的所有牌',function(card,player,target){
							return target.countCards('j');
						}).ai=function(target){
							return get.attitude(player,target)*target.countCards('j');
						};
					}
					else{
						var list=get.libCard(function(info,name){
							return name!='gw_poxiao'&&info.subtype=='spell_bronze';
						});
						if(list.length){
							player.gain(game.createCard(list.randomGet()),'gain2');
						}
						else{
							player.draw();
						}
						event.finish();
					}
					'step 2'
					if(result.targets[0]){
						player.line(result.targets[0],'green');
						result.targets[0].discard(result.targets[0].getCards('j'));
					}
				},
				ai:{
					order:4,
					useful:[3,1],
					result:{
						player:1,
					}
				}
			}
		},
		skill:{
			_gw_zirankuizeng:{
				trigger:{player:'useCard'},
				forced:true,
				popup:false,
				silent:true,
				filter:function(event,player){
					if(get.info(event.card).complexTarget) return false;
					if(!event.targets) return false;
					return (get.type(event.card)=='trick'&&event.cards[0]&&event.cards[0]==event.card);
				},
				content:function(){
					player.storage.gw_zirankuizeng=[trigger.cards[0],trigger.targets.concat(trigger.addedTargets||[])];
				}
			},
			_gainspell:{
				trigger:{player:'drawBegin'},
				forced:true,
				popup:false,
				silent:true,
				priority:-11,
				filter:function(event,player){
					return event.num>0&&event.parent.name=='phaseDraw';
				},
				content:function(){
					if(!player.storage.spell_gain||Math.max.apply(null,player.storage.spell_gain)<0){
						var tmp=player.storage.spell_gain2;
						player.storage.spell_gain=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].randomGets(3);
						player.storage.spell_gain2=Math.floor((15-Math.max.apply(null,player.storage.spell_gain))/2);
						if(tmp){
							for(var i=0;i<3;i++){
								player.storage.spell_gain[i]+=tmp;
							}
						}
					}
					for(var i=0;i<3;i++){
						if(player.storage.spell_gain[i]==0){
							var list;
							if(i==0){
								list=get.libCard(function(info){
									return info.subtype=='spell_gold';
								});
							}
							else{
								list=get.libCard(function(info){
									return info.subtype=='spell_silver';
								});
							}
							if(list&&list.length){
								ui.cardPile.insertBefore(game.createCard(list.randomGet()),ui.cardPile.firstChild);
							}
						}
						player.storage.spell_gain[i]--;
					}
				}
			}
		},
		help:{
			'昆特牌':'<ul><li>法术为分金、银、铜三类，金卡和银卡不出现在牌堆中<li>'+
			'摸牌阶段有一定概率摸到银卡，在16个摸牌阶段中至少会摸到2张银卡<li>'+
			'摸牌阶段有一定概率摸到金卡，在16个摸牌阶段中至少会摸到1张金卡<li>'+
			'金卡造成的任何效果不会触发相关技能，金卡无视调虎离山、潜行等免疫效果<li>'+
			'进行洗牌时金卡、银卡将从弃牌堆中消失，不进入牌堆'
		},
		translate:{
			spell:'法术',
			spell_gold:'金卡法术',
			spell_silver:'银卡法术',
			spell_bronze:'铜卡法术',
			gw_xinsheng:'新生',
			gw_xinsheng_info:'随机观看12张武将牌，选择一张替代一名角色的武将牌（不触发技能），然后结束出牌阶段',
			gw_zhongmozhizhan:'终末之战',
			gw_zhongmozhizhan_info:'将所有角色区域内的所有牌置入弃牌堆（不触发技能），然后结束出牌阶段',
			gw_butianshu:'卜天术',
			gw_butianshu_info:'出牌阶段对任意角色使用，将任意一张延时锦囊牌置入其判定区',
			gw_zhihuanjun:'致幻菌',
			gw_zhihuanjun_info:'出牌阶段对一名已受伤角色使用，令其减少一点体力上限',
			gw_niuquzhijing:'纽曲之镜',
			gw_niuquzhijing_info:'交换全场体力值最大和最小角色的体力值（不触发技能），然后结束出牌阶段',
			gw_ansha:'暗杀',
			gw_ansha_info:'令一名体力为1的随机敌方角立即死亡（不触发技能），然后结束出牌阶段',
			gw_shizizhaohuan:'十字召唤',
			gw_shizizhaohuan_info:'从牌堆中获得一张杀、一张闪和一张桃',
			gw_zuihouyuanwang:'最后愿望',
			gw_zuihouyuanwang_info:'摸X张牌并弃置X张牌，X为存活角色数',
			gw_zirankuizeng:'自然馈赠',
			gw_zirankuizeng_info:'重新结算一次你上一张使用的非转化普通锦囊牌，然后摸一张牌',
			gw_poxiao:'破晓',
			gw_poxiao_info:'选择一项：弃置一名角色判定区内的所有牌，或随机获得一张铜卡法术（破晓除外）并展示之',
			gw_baoxueyaoshui:'暴雪药水',
			gw_baoxueyaoshui_info:'令一名角色摸两张牌并翻面',
			gw_zumoshoukao:'阻魔手铐',
			gw_zumoshoukao_info:'令一名角色失去所有护甲且非锁定技失效直到下一回合结束',
			gw_aozuzhilei:'奥祖之雷',
			gw_aozuzhilei_info:'对一名体力值不小于你的角色造成一点雷属性伤害，然后该角色摸一张牌',
		},
		cardType:{
			spell:0.5,
			spell_bronze:0.2,
			spell_silver:0.3,
			spell_gold:0.4
		},
		list:[
			['club',3,'gw_zhihuanjun'],
			['spade',2,'gw_zhihuanjun'],

			['heart',7,'gw_poxiao'],
			['diamond',4,'gw_poxiao'],

			['spade',9,'gw_aozuzhilei','thunder'],
			['club',7,'gw_aozuzhilei','thunder'],

			['club',1,'gw_zumoshoukao'],
			['spade',1,'gw_zumoshoukao'],
		],
	};
});
