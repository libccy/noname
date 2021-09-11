'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'tw',
		connect:true,
		characterSort:{
			tw:{
				tw_mobile:['tw_beimihu','nashime','tw_gexuan','tw_dongzhao'],
				tw_yijiang:['tw_caoang','tw_caohong','tw_zumao','tw_dingfeng','tw_maliang','tw_xiahouba'],
				tw_english:['kaisa'],
			},
		},
		character:{
			tw_dongzhao:['male','wei',3,['twmiaolve','twyingjia']],
			tw_gexuan:['male','qun',3,['twdanfa','twlingbao','twsidao']],
			tw_beimihu:['female','qun',3,['zongkui','guju','baijia','bingzhao'],['zhu']],
			nashime:['male','qun',3,['chijie','waishi','renshe']],
			tw_xiahouba:['male','shu',4,['twyanqin','twbaobian']],
			tw_zumao:['male','wu',4,['twtijin']],
			tw_caoang:['male','wei',4,['twxiaolian']],
			tw_dingfeng:['male','wu',4,['twqijia','twzhuchen']],
			tw_caohong:['male','wei',4,['twhuzhu','twliancai']],
			tw_maliang:['male','shu',3,['twrangyi','twbaimei']],
			kaisa:["male","western",4,["zhengfu"]],
		},
		characterIntro:{
			nashime:'难升米（なしめ，或なんしょうまい）是倭国大夫。景初二年六月，受女王卑弥呼之命，与都市牛利出使魏国，被魏国拜为率善中郎将。',
		},
		card:{
			dz_mantianguohai:{
				fullskin:true,
				type:'trick',
				enable:true,
				derivation:'tw_dongzhao',
				global:['dz_mantianguohai'],
				selectTarget:[1,2],
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('hej')>0;
				},
				content:function(){
					player.gainPlayerCard(target,'hej',true);
				},
				contentAfter:function(){
					'step 0'
					var evtx=event.getParent();
					event.targets=targets.filter(function(target){
						return target.getHistory('lose',function(evt){
							return evt.getParent(3).name==''&&evt.getParent(4)==evtx;
						})
					});
					if(!event.targets.length||!player.countCards('he')) event.finish();
					'step 1'
					var target=targets.shift();
					event.target=target;
					var next=player.chooseCard('he',true,'交给'+get.translation(target)+'一张牌');
					if(player.hasSkill('twyingjia')&&player.countUsed('dz_mantianguohai')==1) next.set('ai',function(card){
						if(card.name=='dz_mantianguohai') return -10;
						return -get.value(card,_status.event.getParent().target);
					});
					'step 2'
					if(result.bool){
						target.gain(result.cards,player,'giveAuto');
					}
					'step 3'
					if(targets.length&&player.countCards('h')>0) event.goto(1);
				},
				ai:{
					order:6,
					tag:{
						lose:1,
						loseCard:1,
					},
					result:{
						target:-0.1,
					},
				},
			},
			gx_lingbaoxianhu:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				derivation:'tw_gexuan',
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:['gx_lingbaoxianhu']
			},
			gx_taijifuchen:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				derivation:'tw_gexuan',
				distance:{attackFrom:-4},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:['gx_taijifuchen']
			},
			gx_chongyingshenfu:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				derivation:'tw_gexuan',
				ai:{
					basic:{
						equipValue:7,
					}
				},
				skills:['gx_chongyingshenfu']
			},
		},
		characterFilter:{
			nashime:function(mode){
				return mode!='guozhan';
			},
			tw_xiahouba:function(mode){
				return mode!='guozhan';
			},
		},
		skill:{
			dz_mantianguohai:{
				mod:{
					ignoredHandcard:function(card,player){
						if(get.name(card)=='dz_mantianguohai') return true;
					},
					cardDiscardable:function(card,player,name){
						if(name=='cardsDiscard'&&get.name(card)=='dz_mantianguohai') return false;
					},
				},
			},
			twmiaolve:{
				audio:2,
				trigger:{
					global:'gameDrawAfter',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				content:function(){
					if(!lib.inpile.contains('dz_mantianguohai')) lib.inpile.add('dz_mantianguohai');
					if(!_status.dz_mantianguohai_suits) _status.dz_mantianguohai_suits=lib.suit.slice(0);
					var list=_status.dz_mantianguohai_suits.randomRemove(2).map(function(i){
						return game.createCard2('dz_mantianguohai',i,get.rand(1,13));
					});
					if(list.length) player.gain(list,'gain2','log');
				},
				group:'twmiaolve_damage',
				subSkill:{
					damage:{
						trigger:{player:'damageEnd'},
						direct:true,
						content:function(){
							'step 0'
							event.count=trigger.num;
							'step 1'
							event.count--;
							var list=['dz_mantianguohai'];
							list.addArray(get.zhinangs());
							player.chooseButton([get.prompt('twmiaolve'),[list,'vcard']]).set('ai',function(button){
								if(button.link[2]=='dz_mantianguohai'&&player.countCards('hs','dz_mantianguohai')<2) return 10;
								return get.value({name:button.link[2]});
							});
							'step 2'
							if(result.bool){
								player.logSkill('twmiaolve');
								var name=result.links[0][2];
								if(name=='dz_mantianguohai'){
									if(!lib.inpile.contains('dz_mantianguohai')) lib.inpile.add('dz_mantianguohai');
									if(!_status.dz_mantianguohai_suits) _status.dz_mantianguohai_suits=lib.suit.slice(0);
									if(_status.dz_mantianguohai_suits.length) player.gain(game.createCard2('dz_mantianguohai',_status.dz_mantianguohai_suits.randomRemove(),get.rand(1,13)),'gain2');
									else{
										var card=get.cardPile(function(card){
											return card.name==name;
										});
										if(card) player.gain(card,'gain2');
									}
									player.draw();
								}
								else{
									var card=get.cardPile(function(card){
										return card.name==name;
									});
									if(card) player.gain(card,'gain2');
								}
								if(event.count>0) event.goto(1);
							}
						},
					},
				},
			},
			twyingjia:{
				audio:2,
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he')) return false;
					var history=player.getHistory('useCard'),map={};
					for(var i of history){
						if(get.type2(i.card)=='trick'){
							if(!map[i.card.name]) map[i.card.name]=true;
							else return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:get.prompt('twyingjia'),
						prompt2:'弃置一张牌并令一名角色进行一个额外回合',
						filterCard:lib.filter.cardDiscardable,
						filterTarget:true,
						ai1:function(card){
							return 8-get.value(card);
						},
						ai2:function(target){
							if(target.hasJudge('lebu')) return -1;
							var player=_status.event.player;
							if(get.attitude(player,target)>4){
								return get.threaten(target)/Math.sqrt(target.hp+1)/Math.sqrt(target.countCards('h')+1);
							}
							return -1;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('twyingjia',target);
						player.discard(result.cards);
						target.insertPhase();
					}
				},
			},
			gx_lingbaoxianhu:{
				trigger:{
					source:'damageSource',
					global:'dieAfter',
				},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					if(event.name=='damage') return event.num>1;
					return true;
				},
				content:function(){
					player.gainMaxHp();
					player.recover();
				},
			},
			gx_taijifuchen:{
				trigger:{player:'useCardToPlayered'},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha';
				},
				logTarget:'target',
				content:function(){
					'step 0'
					var suit=get.suit(trigger.card);
					var num=trigger.target.countCards('h','shan');
					var next=trigger.target.chooseToDiscard('弃置一张牌，或不能响应'+get.translation(trigger.card)).set('ai',function(card){
						var num=_status.event.num;
						if(num==0) return 0;
						if(card.name=='shan') return num>1?2:0;
						return (get.suit(card)!=_status.event.suit?9:6)-get.value(card);
					}).set('num',num);
					if(lib.suit.contains(suit)){
						next.set('prompt2','若弃置的是'+get.suit(suit)+'牌，则改为'+get.translation(player)+'获得之');
						next.set('suit',suit);
					}
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						if(get.suit(card,trigger.target)==get.suit(trigger.card,false)&&get.position(card)=='d') player.gain(card,'gain2');
					}
					else trigger.directHit.add(trigger.target);
				},
			},
			gx_chongyingshenfu:{
				trigger:{player:'damageEnd'},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					if(!event.card||!event.card.name||player.getStorage('gx_chongyingshenfu_effect').contains(event.card.name)) return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source.hasSkillTag('unequip',false,{
						name:event.card.name,
						target:player,
						card:event.card,
					})) return false;
					return true;
				},
				content:function(){
					player.addSkill('gx_chongyingshenfu_effect');
					player.markAuto('gx_chongyingshenfu_effect',[trigger.card.name]);
				},
				subSkill:{
					effect:{
						trigger:{player:'damageBegin4'},
						forced:true,
						equipSkill:true,
						charlotte:true,
						filter:function(event,player){
							if(!event.card||!event.card.name||!player.getStorage('gx_chongyingshenfu_effect').contains(event.card.name)) return false;
							if(player.hasSkillTag('unequip2')) return false;
							if(event.source.hasSkillTag('unequip',false,{
								name:event.card.name,
								target:player,
								card:event.card,
							})) return false;
							return true;
						},
						content:function(){
							trigger.num--;
						},
						onremove:true,
						intro:{
							content:'受到$造成的伤害-1',
						},
					},
				},
			},
			twdanfa:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','phaseJieshuBegin']},
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt('twdanfa'),'将一张牌作为“丹”置于武将牌上').set('ai',function(card){
						if(player.storage.twdanfa){
							var suit=get.suit(card);
							for(var i of player.storage.twdanfa){
								if(get.suit(i,false)==suit) return 4-get.value(card);
							}
						}
						return 5.5-get.value(card);
					});
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						player.logSkill('twdanfa');
						game.log(player,'将',card,'放在了武将牌上');
						player.$give(card,player,false);
						player.lose(card,ui.special,'toStorage');
						player.markAuto('twdanfa',result.cards);
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
				mark:true,
				intro:{
					content:'cards',
					onunmark:'throw',
				},
				group:'twdanfa_draw',
				subSkill:{
					draw:{
						audio:'twdanfa',
						trigger:{player:'useCard'},
						forced:true,
						locked:false,
						filter:function(event,player){
							if(!player.storage.twdanfa||!player.storage.twdanfa.length) return false;
							var suit=get.suit(event.card,false);
							if(suit=='none'||player.storage.twdanfa_count&&player.storage.twdanfa_count.contains(suit)) return false;
							for(var i of player.storage.twdanfa){
								if(get.suit(i,false)==suit) return true;
							}
							return false;
						},
						content:function(){
							player.draw();
							player.addTempSkill('twdanfa_count');
							if(!player.storage.twdanfa_count) player.storage.twdanfa_count=[];
							player.storage.twdanfa_count.push(get.suit(trigger.card,false));
						},
					},
					count:{onremove:true},
				},
			},
			twlingbao:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var list=player.getStorage('twdanfa');
					if(list.length<2) return false;
					var suit=get.suit(list[0],false);
					for(var i=1;i<list.length;i++){
						if(get.suit(list[i],false)!=suit) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('灵宝',player.storage.twdanfa);
					},
					filter:function(button,player){
						if(!ui.selected.buttons.length) return true;
						return get.suit(button.link)!=get.suit(ui.selected.buttons[0].link);
					},
					select:2,
					backup:function(links){
						var obj=get.copy(lib.skill['twlingbao_'+get.color(links)]);
						obj.cards=links;
						obj.audio='twlingbao';
						obj.filterCard=()=>false;
						obj.selectCard=-1;
						return obj;
					},
					prompt:function(links){
						return lib.skill['twlingbao_'+get.color(links)].prompt;
					},
					check:function(button){
						var storage=_status.event.player.storage.twdanfa.slice(0);
						storage.remove(button.link);
						if(storage.filter(function(card){
							return card.suit==button.link.suit;
						}).length) return 1+Math.random();
						return 0;
					},
				},
				subSkill:{
					red:{
						filterTarget:function(card,player,target){
							return target.isDamaged();
						},
						delay:false,
						prompt:'令一名角色回复1点体力',
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							target.recover();
						},
						ai:{
							tag:{
								recover:1,
							},
							result:{
								target:1.5,
							},
						},
					},
					black:{
						filterTarget:function(card,player,target){
							return target.countDiscardableCards(player,'hej')>0;
						},
						delay:false,
						prompt:'弃置一名角色区域内至多两张区域不同的牌',
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							var num=0;
							if(target.countDiscardableCards(player,'h')) num++;
							if(target.countDiscardableCards(player,'e')) num++;
							if(target.countDiscardableCards(player,'j')) num++;
							if(num){
								player.discardPlayerCard(target,[1,Math.max(2,num)],'hej',true).set('filterButton',function(button){
									for(var i=0;i<ui.selected.buttons.length;i++){
										if(get.position(button.link)==get.position(ui.selected.buttons[i].link)) return false;
									}
									return true;
								});
							}
						},
						ai:{
							tag:{
								lose:1.5,
								loseCard:1.5,
								discard:1.5,
							},
							result:{
								target:function(player,target){
									if(get.attitude(player,target)>0&&target.countCards('e',function(card){
										return get.value(card,target)<=0;
									})>0&&target.countCards('j',function(card){
										return get.effect(target,card,target,target)<0;
									})>8) return 3;
									if(target.countCards('h')>0&&target.countCards('e',function(card){
										return get.value(card,target)>0;
									})>0) return -2;
									return 0;
								},
							},
						},
					},
					none:{
						selectTarget:2,
						filterTarget:function(card,player,target){
							return target.countCards('he')>0;
						},
						complexSelect:true,
						targetprompt:['摸牌','弃牌'],
						delay:false,
						prompt:'令一名角色摸一张牌并令另一名角色弃置一张牌',
						multitarget:true,
						multiline:true,
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							targets[0].draw();
							targets[1].chooseToDiscard('he',true);
						},
						ai:{
							result:{
								target:function(player,target){
									if(!ui.selected.targets.length) return 1;
									if(target.countCards('e',function(card){
										return get.value(card,target)<=0;
									})>0) return 1;
									return -1;
								},
							},
						},
					},
					backup:{audio:'twlingbao'},
				},
				ai:{
					order:1,
					result:{player:1},
				},
			},
			twsidao:{
				audio:2,
				trigger:{
					global:'gameDrawAfter',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return !player.storage.twsidao;
				},
				content:function(){
					'step 0'
					player.chooseButton(['请选择你的初始法宝',[['gx_lingbaoxianhu','gx_taijifuchen','gx_chongyingshenfu'],'vcard']],true).set('ai',function(button){
						return button.link[2]=='gx_chongyingshenfu'?2:1;
					});
					'step 1'
					if(result.bool){
						var card=game.createCard2(result.links[0][2]);
						lib.inpile.add(result.links[0][2]);
						player.storage.twsidao=card;
						player.chooseUseTarget(card,'nopopup',true);
					}
				},
				group:'twsidao_equip',
				subSkill:{
					equip:{
						audio:'twsidao',
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						filter:function(event,player){
							var card=player.storage.twsidao;
							return card&&card.isInPile()&&player.hasUseTarget(card);
						},
						content:function(){
							player.chooseUseTarget(player.storage.twsidao,'nopopup',true);
						},
					},
				},
			},
			twrangyi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:lib.filter.notMe,
				delay:0,
				content:function(){
					'step 0'
					event.cards=player.getCards('h');
					target.gain(event.cards,player,'giveAuto').gaintag.add('twrangyi');
					target.addTempSkill('twrangyi2');
					'step 1'
					target.chooseToUse({
						prompt:'请使用得到的一张牌，或者受到来自'+get.translation(player)+'的一点伤害',
						filterCard:function(card,player){
							if(get.itemtype(card)!='card'||!card.hasGaintag('twrangyi')) return false;
							return lib.filter.filterCard(card,player,event);
						},
						cards:cards,
					});
					'step 2'
					target.removeSkill('twrangyi');
					if(!result.bool) target.damage('nocard');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var hs=player.getCards('h');
							for(var i=0;i<hs.length;i++){
								var hi=hs[i];
								if(hi.name=='tao'||game.hasPlayer(function(current){
									return target.canUse(hi,current)&&get.effect(current,hi,target,target);
								})) return 1;
							}
							return get.damageEffect(target,player,target);
						},
					},
				},
			},
			twrangyi2:{
				trigger:{player:'useCard'},
				forced:true,
				popup:false,
				filter:function(event,player){
					var evt=event.getParent(2);
					return evt.name=='twrangyi'&&evt.player.isAlive()&&player.countCards('h',function(card){
						return card.hasGaintag('twrangyi');
					})>0;
				},
				content:function(){
					var cards=player.getCards('h',function(card){
						return card.hasGaintag('twrangyi');
					});
					trigger.getParent(2).player.gain(cards,player,'giveAuto');
				},
				onremove:function(player){
					player.removeGaintag('twrangyi');
				},
			},
			twbaimei:{
				audio:2,
				trigger:{
					player:"damageBegin4",
				},
				forced:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					if(event.nature) return true;
					return get.type(event.card,'trick')=='trick';
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.countCards('h')) return;
							if(get.tag(card,'natureDamage')) return 'zerotarget';
							if(get.type(card)=='trick'&&get.tag(card,'damage')){
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			twhuzhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(e,player){
					return player.countCards('e')>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0
				},
				content:function(){
					'step 0'
					target.chooseCard('交给'+get.translation(player)+'一张手牌','h',true);
					'step 1'
					target.give(result.cards,player);
					'step 2'
					if(player.countGainableCards(player,'e')) target.gainPlayerCard(player,'e',true);
					'step 3'
					if(target.isDamaged()&&target.hp<=player.hp){
						player.chooseBool('是否令'+get.translation(target)+'回复1点体力？').set('ai',function(){
							return get.recoverEffect(target,player,player);
						});
					}
					'step 4'
					if(result.bool) target.recover();
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							var eff=(target.isDamaged()&&target.hp<=player.hp)?get.recoverEffect(target,player,target):0;
							if(eff<=0&&!player.countGainableCards(target,'e')) return -1;
							return eff;
						},
					},
				},
			},
			twliancai:{
				audio:2,
				trigger:{player:['turnOverEnd','phaseJieshuBegin']},
				filter:function(card,player,target){
					return target=='phaseJieshuBegin'||player.countCards('h')<player.hp;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countGainableCards(player,'e')>0;
				},
				check:function(card,player){
					if(card.name=='turnOver') return true;
					if(player.isTurnedOver()) return true;
					if(player.hp-player.countCards('h')>1) return true;
					return game.hasPlayer(function(current){
						return lib.skill.twliancai.filterTarget(null,player,current)&&lib.skill.twliancai.filterAI(current);
					});
				},
				filterAI:function(target){
					var player=_status.event.player;
					var att=get.attitude(player,target);
					if(target.isDamaged()&&target.countCards('e','baiyin')&&att>0) return 2*att;
					return -att;
				},
				prompt2:function(card,player,target){
					return card.name=='phaseJieshu'?'将武将牌翻面，然后获得一名其他角色装备区内的一张牌':'将手牌摸至与体力值相同';
				},
				content:function(){
					'step 0'
					if(event.triggername=='phaseJieshuBegin') player.turnOver();
					else{
						player.draw(player.hp-player.countCards('h'));
						event.finish();
					}
					'step 1'
					player.chooseTarget('获得一名角色装备区内的一张牌',lib.skill.twliancai.filterTarget).ai=lib.skill.twliancai.filterAI;
					'step 2'
					if(result.bool){
						player.line(result.targets,'thunder');
						player.gainPlayerCard('e',true,result.targets[0]);
					}
				},
			},
			twqijia:{
				//group:'twqijia_alka',
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('e',function(card){
						return !player.getStorage('twqijia_alka').contains(get.subtype(card));
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&player.canUse({name:'sha'},target);
				},
				position:'e',
				filterCard:function(card,player){
					return !player.getStorage('twqijia_alka').contains(get.subtype(card));
				},
				content:function(){
					'step 0'
					player.addTempSkill('twqijia_alka');
					player.storage.twqijia_alka.push(get.subtype(cards[0]));
					player.useCard({name:'sha'},target,false);
				},
				subSkill:{
					alka:{
						charlotte:true,
						onremove:function(player){
							delete player.storage.twqijia_alka;
							delete player.storage.twzhuchen;
							player.unmarkSkill('twzhuchen');
						},
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
							if(!player.storage.twzhuchen) player.storage.twzhuchen=[];
						},
						mod:{
							globalFrom:function(from,to,distance){
								if(from.storage.twzhuchen&&from.storage.twzhuchen.contains(to)) return -Infinity;
							}
						},
					},
				},
				check:function(card){
					return 7-get.value(card);
				},
				ai:{
					order:function(){
						return get.order({name:'sha'})-0.2;
					},
					result:{
						target:function(player,target){
							return get.effect(target,{name:'sha'},player,player);
						},
					},
				},
			},
			twzhuchen:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',lib.skill.twzhuchen.filterCard)>0;
				},
				filterCard:function(card,player){
					var name=get.name(card,player);
					return name=='tao'||name=='jiu';
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					player.addTempSkill('twqijia_alka');
					player.storage.twzhuchen.add(target);
					player.markSkill('twzhuchen');
				},
				intro:{
					content:function(content,player){
						return '至'+get.translation(content)+'的距离视为1';
					},
				},
			},
			twxiaolian:{
				audio:2,
				trigger:{global:'useCardToTarget'},
				logTarget:'target',
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player!=player&&
					event.targets.length==1&&event.targets[0]!=player;
				},
				check:function(event,player){
					return get.effect(event.targets[0],event.card,event.player,player)<=get.effect(player,event.card,event.player,player);
				},
				content:function(){
					trigger.getParent().twxiaolian=trigger.targets[0];
					trigger.targets.length=0;
					trigger.getParent().triggeredTargets2.length=0;
					trigger.targets.push(player);
				},
				group:'twxiaolian_damage',
				subSkill:{
					distance:{
						sub:true,
						charlotte:true,
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						mark:true,
						marktext:'马',
						intro:{
							content:'cards',
							onunmark:'throw',
						},
						mod:{
							globalTo:function(from,to,distance){
								if(from!=to&&to.storage.twxiaolian_distance) return distance+to.storage.twxiaolian_distance.length;
							},
						},
					},
					damage:{
						sub:true,
						trigger:{player:'damageEnd'},
						direct:true,
						filter:function(event,player){
							return event.getParent(2).twxiaolian!=undefined;
						},
						content:function(){
							'step 0'
							var target=trigger.getParent(2).twxiaolian;
							event.target=target;
							player.chooseCard('是否将一张牌当做【马】置于'+get.translation(target)+'的武将牌旁？','he').ai=function(card){
								if(get.attitude(_status.event.player,_status.event.getParent('twxiaolian_damage').target)>2) return 7-get.value(card);
								return 0;
							};
							'step 1'
							if(result.bool){
								player.logSkill('twxiaolian',target);
								player.lose(result.cards,ui.special,'toStorage');
								target.addSkill('twxiaolian_distance');
								target.storage.twxiaolian_distance.addArray(result.cards);
								target.markSkill('twxiaolian_distance');
							}
						},
					},
				},
			},
			twtijin:{
				audio:2,
				trigger:{global:'useCardToPlayer'},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player!=player&&event.target!=player&&
					event.targets.length==1&&event.player.inRange(player);
				},
				logTarget:'target',
				check:function(event,player){
					return get.effect(event.targets[0],event.card,event.player,player)<=get.effect(player,event.card,event.player,player);
				},
				content:function(){
					'step 0'
					trigger.targets.length=0;
					trigger.getParent().triggeredTargets1.length=0;
					trigger.targets.push(player);
					var next=game.createEvent('twtijin_discard',null,trigger.getParent(2));
					next.player=player;
					next.target=trigger.player;
					next.setContent(function(){
						if(target.isDead()||!target.countCards('he')) return;
						player.line(target,'green');
						player.discardPlayerCard(target,true,'he');
					});
				},
			},
			twyanqin:{
				forbid:['guozhan'],
				audio:2,
				trigger:{player:'phaseBegin'},
				direct:true,
				content:function(){
					'step 0'
					var list=[];
					if(player.group!='wei') list.push('wei2');
					if(player.group!='shu') list.push('shu2');
					list.push('cancel2');
					player.chooseControl(list).set('ai',function(){
						return list.randomGet();
					}).set('prompt',get.prompt2('twyanqin'));
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('twyanqin');
						var group=result.control.slice(0,3);
						player.changeGroup(group);
					}
				},
			},
			twbaobian:{
				audio:2,
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					var card=event.card;
					if(!card||(card.name!='sha'&&card.name!='juedou')) return false;
					return event.player.group==player.group||event.player.countCards('h')>event.player.hp
				},
				check:function(event,player){
					var att=get.attitude(player,event.player);
					if(event.player.group==player.group) return att>0;
					return att<0;
				},
				logTarget:'player',
				content:function(){
					var target=trigger.player;
					if(target.group==player.group){
						trigger.cancel();
						var num=target.maxHp-target.countCards('h');
						if(num) target.draw(num);
					}
					else{
						player.discardPlayerCard(target,'h',true,target.countCards('h')-target.hp)
					}
				},
			},
			renshe:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					'step 0'
					var choiceList=['令一名其他角色与你各摸一张牌','令自己下个出牌阶段可以多发动一次【外使】'];
					if(lib.skill.chijie.filter&&lib.skill.chijie.filter({},player)) choiceList.push('将自己的势力变更为场上存在的一个其他势力');
					player.chooseControl('cancel2').set('prompt',get.prompt('renshe')).set('choiceList',choiceList).set('ai',function(){
						if(game.hasPlayer(function(current){
							return get.attitude(player,current)>0||current.hasSkillTag('nogain');
						})) return 0;
						return 1;
					});
					'step 1'
					if(result.control=='cancel2') event.finish();
					else{
						event.index=result.index;
						player.logSkill('renshe');
						if(event.index==0){
							player.chooseTarget('请选择一名角色，与其各摸一张牌',lib.filter.notMe,true).ai=function(target){
								if(target.hasSkillTag('nogain')) return 0.1;
								return get.attitude(_status.event.player,target);
							};
						}
						else if(result.index==1){
							player.storage.waishi++;
							event.finish();
						}
						else{
							var next=game.createEvent('renshe_changeGroup');
							next.player=player;
							next.renshe=true;
							next.setContent(lib.skill.chijie.content);
							event.finish();
						}
					}
					'step 2'
					if(result.bool){
						player.line(result.targets[0],'green');
						game.asyncDraw([player,result.targets[0]].sortBySeat());
					}
					else event.finish();
					'step 3'
					game.delay();
				},
			},
			waishi:{
				audio:2,
				group:'waishi_afterstory',
				subSkill:{
					afterstory:{
						trigger:{player:'phaseUseEnd'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){player.storage.waishi=1},
					},
				},
				init:function(player,skill){
					player.storage[skill]=1;
				},
				enable:'phaseUse',
				filter:function(event,player){
					return typeof player.storage.waishi!='number'||player.storage.waishi>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>=ui.selected.cards.length;
				},
				filterCard:true,
				position:'he',
				check:function(card){
					if(!game.hasPlayer(function(current){
						return current!=_status.event.player&&current.countCards('h')>ui.selected.cards.length;
					})) return 0;
					return 6-get.value(card);
				},
				selectCard:function(){
					if(!ui.selected.targets.length) return [1,game.countGroup()];
					return [1,Math.min(ui.selected.targets[0].countCards('h'),game.countGroup())];
				},
				discard:false,
				lose:false,
				delay:0,
				content:function(){
					'step 0'
					if(typeof player.storage.waishi!='number') player.storage.waishi=1;
					player.storage.waishi--;
					player.lose(cards,ui.special);
					player.choosePlayerCard(target,true,'h',cards.length).chooseonly=true;
					'step 1'
					event.cards2=result.cards;
					target.lose(event.cards2,ui.special);
					'step 2'
					player.gain(event.cards2);
					target.gain(cards);
					player.$give(cards.length,target);
					target.$give(event.cards2.length,player);
					'step 3'
					game.delay(1.2);
					'step 4'
					if(target.countCards('h')>player.countCards('h')||player.group==target.group) player.draw();
				},
				ai:{
					result:{
						player:function(player,target){
							if(player.countCards('h')<target.countCards('h')||player.group==target.group) return 1;
							return 0.1;
						},
					},
				},
			},
			chijie:{
				audio:true,
				forbid:['guozhan'],
				trigger:{global:'gameDrawAfter'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.group!=player.group;
					});
				},
				content:function(){
					'step 0'
					var list=lib.group.filter(function(group){
						return group!=player.group&&game.hasPlayer(function(current){
							return current.group==group;
						});
					})
					if(!event.renshe) list.push('cancel2');
					player.chooseControl(list).set('prompt',event.renshe?'请选择一个势力':get.prompt('chijie')).set('prompt2',event.renshe?'':'将自己的势力变更为场上存在的一个势力').set('',function(){
						return list.randomGet();
					});
					'step 1'
					if(result.control!='cancel2'){
						if(!event.renshe) player.logSkill('chijie');
						player.changeGroup(result.control);
					}
				},
			},
		},
		translate:{
			tw_beimihu:'TW卑弥呼',
			nashime:'难升米',
			tw_xiahouba:'TW夏侯霸',
			tw_zumao:'TW祖茂',
			tw_caoang:'TW曹昂',
			tw_dingfeng:'TW丁奉',
			tw_caohong:'TW曹洪',
			tw_maliang:'TW马良',
			
			twyanqin:'姻亲',
			twyanqin_info:'准备阶段，你可以将势力变更为魏或蜀。',
			twbaobian:'豹变',
			twbaobian_info:'当你使用【杀】或【决斗】造成伤害时，若目标角色的势力与你相同，则你可以防止此伤害，然后其将手牌数补充至与体力值相同。若不同且其手牌数大于体力值，则你可以将其手牌弃置至与其体力值相同。',
			twtijin:'替巾',
			twtijin_info:'当你攻击范围内的一名其他角色使用【杀】指定另一名其他角色为目标时，你可以将此【杀】的目标改为你。若如此做，此【杀】结算完成后，你弃置该角色的一张牌。',
			twxiaolian:'孝廉',
			twxiaolian_info:'当一名其他角色使用【杀】指定另一名其他角色为目标时，你可以将此【杀】的目标改为你。若如此做，当你受到此【杀】的伤害后，你可以将一张牌放在此【杀】原目标的武将牌旁，称之为“马”。锁定技，场上的一名角色每有一张“马”，其他角色计算与其的距离便+1。',
			twqijia:'弃甲',
			twqijia_info:'出牌阶段，你可以弃置一张装备区内的牌（每种类型的装备牌限一次），然后视为对攻击范围内的一名其他角色使用了一张【杀】。',
			twzhuchen:'诛綝',
			twzhuchen_info:'出牌阶段，你可以弃置一张【桃】或【酒】并选择一名其他角色。你与其的距离视为1直到此阶段结束。',
			twhuzhu:'护主',
			twhuzhu_info:'出牌阶段限一次，若你的装备区内有牌，则你可以令一名其他角色交给你一张手牌，然后获得你装备区内的一张牌。若其体力值不大于你，则你可以令其回复1点体力。',
			twliancai:'敛财',
			twliancai_info:'结束阶段，你可以将武将牌翻面，然后获得一名其他角色装备区内的一张牌。当你的武将牌翻面时，你可以将手牌补至与体力值相同。',
			twrangyi:'攘夷',
			twrangyi2:'攘夷',
			twrangyi_info:'出牌阶段限一次，你可以将所有手牌交给一名其他角色，然后令其选择一项：1.使用其中的一张牌，并于此牌被使用时将其余的牌交还给你。2.受到来自你的1点伤害。',
			twbaimei:'白眉',
			twbaimei_info:'锁定技，若你没有手牌，则防止你受到的所有属性伤害和锦囊牌造成的伤害。',
			chijie:'持节',
			chijie_info:' 游戏开始时，你可以选择一个现存势力，你的势力视为该势力。 ',
			waishi:'外使',
			waishi_info:' 出牌阶段限一次，你可以用至多X张牌交换一名其他角色等量的手牌（X为现存势力数），然后若其与你势力相同或手牌多于你，你摸一张牌。',
			renshe:'忍涉',
			renshe_info:'当你受到伤害后，你可以选择一项：将势力改为现存的另一个势力；或可以额外发动一次“外使”直到你的下个出牌阶段结束；或与另一名其他角色各摸一张牌。',
			tw_gexuan:'TW葛玄',
			twdanfa:'丹法',
			twdanfa_info:'准备阶段或结束阶段开始时，你可将一张牌置于武将牌上，称为“丹”。每回合每种花色限一次，当你使用牌时，若“丹”中有与此牌花色相同的牌，则你摸一张牌。',
			twlingbao:'灵宝',
			twlingbao_info:'出牌阶段限一次，你可以将两张花色不同的“丹”置入弃牌堆。若这两张牌：均为红色，你令一名其他角色回复1点体力；均为黑色，你弃置一名其他角色区域内至多两张区域不同牌；颜色不同，则你令一名角色摸一张牌，并令另一名角色弃置一张牌。',
			twsidao:'司道',
			twsidao_info:'游戏开始时，你选择一张“法宝”置入装备区。准备阶段，若你以此法选择的法宝在牌堆/弃牌堆中，则你使用之。',
			gx_lingbaoxianhu:'灵宝仙壶',
			gx_lingbaoxianhu_info:'锁定技，当你造成点数大于1的伤害后，或有角色死亡后，你加1点体力上限并回复1点体力。',
			gx_taijifuchen:'太极拂尘',
			gx_taijifuchen_info:'锁定技，当你使用【杀】指定目标后，你令目标角色选择一项：①弃置一张牌，若此牌和【杀】花色相同，则你获得之。②其不可响应此【杀】。',
			gx_chongyingshenfu:'冲应神符',
			gx_chongyingshenfu_info:'锁定技，当你受到牌造成的伤害后，你令所有同名牌对你造成的伤害-1直到游戏结束。',
			tw_dongzhao:'TW董昭',
			twmiaolve:'妙略',
			twmiaolve_info:'游戏开始时，你获得两张【瞒天过海】。当你受到1点伤害后，你可选择：①获得一张【瞒天过海】并摸一张牌。②获得一张智囊。',
			twyingjia:'迎驾',
			twyingjia_info:'一名角色的回合结束时，若你本回合内使用过两张或更多的同名锦囊牌，则你可弃置一张手牌并令一名角色进行一个额外回合。',
			dz_mantianguohai:'瞒天过海',
			dz_mantianguohai_info:'此牌不计入拥有者的手牌上限。出牌阶段，对一至两名区域内有牌的其他角色使用。你获得目标角色一张牌，然后依次交给每名目标角色各一张牌。',
			tw_mobile:'移动版',
			tw_yijiang:'一将成名TW',
			tw_english:'英文版',
		}
	};
});
