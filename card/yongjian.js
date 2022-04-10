'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'yongjian',
		connect:true,
		card:{
			du:{
				type:'basic',
				fullskin:true,
				global:['g_du','g_du_give'],
				content:function(){},
				ai:{
					value:-5,
					useful:6,
					result:{
						player:function(player,target){
							if(player.hasSkillTag('usedu')) return 5;
							return -1;
						}
					},
					order:7.5
				},
			},
			guaguliaodu:{
				type:'trick',
				fullskin:true,
				enable:true,
				filterTarget:function(card,player,target){
					return target.isDamaged();
				},
				content:function(){
					'step 0'
					target.recover();
					'step 1'
					if(target.hasCard(function(card){
						return _status.connectMode||get.name(card,target)=='du';
					},'h')) target.chooseToDiscard('h',{name:'du'},'是否弃置一张【毒】？（不失去体力）').set('ai',()=>1);
				},
				ai:{
					order:2,
					tag:{
						recover:1,
					},
					result:{
						target:1.5,
					}
				},
			},
			chenghuodajie:{
				type:'trick',
				fullskin:true,
				enable:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				content:function(){
					'step 0'
					if(typeof event.baseDamage!='number') event.baseDamage=1;
					if(!target.countCards('h')||!player.isIn()) event.finish();
					else player.choosePlayerCard(target,'h',true);
					'step 1'
					if(result.bool){
						event.show_card=result.cards[0],str=get.translation(player);
						player.showCards(event.show_card);
						target.chooseControl().set('choiceList',[
							'令'+str+'获得'+get.translation(event.show_card),
							'受到'+str+'造成的'+event.baseDamage+'点伤害',
						]).set('ai',function(){
							var evt=_status.event.getParent(),player=evt.target,source=evt.player,card=evt.show_card;
							if(get.damageEffect(player,source,player)>0) return 1;
							if(get.attitude(player,source)*get.value(card,source)>=0) return 0;
							if(card.name=='tao') return 1;
							return get.value(card,player)>(6+(Math.max(player.maxHp,3)-player.hp)*1.5)?1:0;
						});
					}
					else event.finish();
					'step 2'
					if(result.index==0) player.gain(event.show_card,target,'give');
					else target.damage();
				},
				ai:{
					order:6,
					tag:{
						damage:1,
						loseCard:1,
						gain:1,
					},
					result:{
						player:0.1,
						target:-1.2,
					},
				},
			},
			tuixinzhifu:{
				type:'trick',
				fullskin:true,
				enable:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.countGainableCards(player,'hej')>0;
				},
				range:{global:1},
				content:function(){
					'step 0'
					player.gainPlayerCard(target,'hej',true,[1,2]);
					'step 1'
					if(result.bool&&target.isIn()){
						var num=result.cards.length,hs=player.getCards('h');
						if(!hs.length) event.finish();
						else if(hs.length<num) event._result={bool:true,cards:hs.length};
						else player.chooseCard('h',true,num,'交给'+get.translation(target)+get.cnNumber(num)+'张牌');
					}
					else event.finish();
					'step 2'
					if(result.bool) target.gain(result.cards,player,'giveAuto');
				},
				ai:{
					order:5,
					tag:{
						loseCard:1,
						gain:0.5,
					},
					result:{
						target:function(player,target){
							if(get.attitude(player,target)<=0) return ((target.countCards('he',function(card){
								return get.value(card,target)>0&&card!=target.getEquip('jinhe');
							})>0)?-0.3:0.3)*Math.sqrt(player.countCards('h'));
							return ((target.countCards('ej',function(card){
								if(get.position(card)=='e') return get.value(card,target)<=0;
								var cardj=card.viewAs?{name:card.viewAs}:card;
								return get.effect(target,cardj,target,player)<0;
							})>0)?1.5:-0.3)*Math.sqrt(player.countCards('h'));
						},
					},
				},
			},
			yitianjian:{
				type:'equip',
				subtype:'equip1',
				fullskin:true,
				distance:{attackFrom:-1},
				skills:['yitianjian'],
				ai:{
					equipValue:1.5,
					basic:{
						equipValue:1.5,
					},
				}
			},
			qixingbaodao:{
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-1},
				fullskin:true,
				skills:['qixingbaodao'],
				selectTarget:[-1,-2],
				ai:{
					order:9,
					value:function(card,player){
						if(player.getEquip(1)==card) return 0;
						return 4;
					},
					equipValue:function(card,player){
						if(player.getCards('e').contains(card)) return 0;
						return -get.value(player.getCards('e'));
					},
					basic:{
						equipValue:5,
					},
					result:{
						keepAI:true,
						target:function(player,target){
							var cards=target.getCards('e'),js=target.getCards('j');
							var val=get.value(cards,target);
							for(var card of js) val-=get.effect(target,card.viewAs?{name:card.viewAs}:card,target,target)
							return -val;
						},
					},
				},
			},
			duanjian:{
				type:'equip',
				subtype:'equip1',
				fullskin:true,
				distance:{attackFrom:1},
				selectTarget:[-1,-2],
				ai:{
					order:9,
					equipValue:function(card,player){
						if(get.position(card)=='e') return -2;
						return 2;
					},
					value:function(card,player){
						if(player.getEquip(1)==card) return -3;
						return 3;
					},
					basic:{
						equipValue:5,
					},
					result:{
						keepAI:true,
						target:function(player,target){
							var val=2.5;
							var val2=0;
							var card=target.getEquip(1);
							if(card){
								val2=get.value(card,target);
								if(val2<0) return 0;
							}
							return -val-val2;
						},
					},
				},
			},
			serafuku:{
				type:'equip',
				subtype:'equip2',
				fullskin:true,
				skills:['serafuku'],
				selectTarget:[-1,-2],
				ai:{
					order:9,
					equipValue:function(card,player){
						if(get.position(card)=='e') return -2;
						return 2;
					},
					value:function(card,player){
						if(player.getEquip(2)==card) return -3;
						return 3;
					},
					basic:{
						equipValue:5,
					},
					result:{
						keepAI:true,
						target:function(player,target){
							var val=(target.hasSex('male')?2.5:0);
							var val2=0;
							var card=target.getEquip(1);
							if(card){
								val2=get.value(card,target);
								if(val2<0) return 0;
							}
							return -val-val2;
						},
					},
				},
			},
			yinfengyi:{
				type:'equip',
				subtype:'equip2',
				fullskin:true,
				skills:['yinfengyi'],
				selectTarget:[-1,-2],
				ai:{
					order:9,
					equipValue:function(card,player){
						if(get.position(card)=='e') return -1;
						return 1;
					},
					value:function(card,player){
						if(player.getEquip(2)==card) return -2.5;
						return 2.5;
					},
					basic:{
						equipValue:5,
					},
					result:{
						keepAI:true,
						target:function(player,target){
							var val=2;
							var val2=0;
							var card=target.getEquip(2);
							if(card){
								val2=get.value(card,target);
								if(val2<0) return 0;
							}
							return -val-val2;
						},
					},
				},
			},
			yonglv:{
				type:'equip',
				subtype:'equip4',
				fullskin:true,
				selectTarget:[-1,-2],
				distance:{
					globalFrom:-1,
					globalTo:-Infinity,
				},
				ai:{
					order:9,
					equipValue:0,
					value:function(card,player){
						if(player.getEquip(2)==card) return 0;
						return 0.5;
					},
					basic:{
						equipValue:0,
					},
				},
			},
			zhanxiang:{
				type:'equip',
				subtype:'equip3',
				fullskin:true,
				distance:{globalTo:1},
				skills:['zhanxiang'],
				ai:{
					equipValue:3.5,
					basic:{
						equipValue:3.5,
					},
				}
			},
			xinge:{
				type:'equip',
				subtype:'equip5',
				fullskin:true,
				skills:['xinge'],
				ai:{
					equipValue:2,
					basic:{
						equipValue:2,
					},
				}
			},
		},
		skill:{
			yitianjian:{
				audio:true,
				trigger:{source:'damageSource'},
				direct:true,
				equipSkill:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.getParent().name=='sha'&&player.isDamaged()&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('h',get.prompt('yitianjian'),'弃置一张手牌并回复1点体力').set('ai',(card)=>7-get.value(card)).logSkill='yitianjian';
					'step 1'
					if(result.bool) player.recover();
				},
			},
			serafuku:{
				audio:true,
				trigger:{target:'useCardToTargeted'},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return event.card.name=='sha'&&player.hasSex('male');
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						return get.color(card)=='black'?-2:0;
					}).judge2=function(result){
						return result.bool==false?true:false;
					};
					'step 1'
					if(result.bool===false){
						var map=trigger.customArgs,id=player.playerid;
						if(!map[id]) map[id]={};
						if(!map[id].extraDamage) map[id].extraDamage=0;
						map[id].extraDamage++;
						game.log(trigger.card,'对',player,'的伤害+1');
					}
				},
			},
			yinfengyi:{
				audio:true,
				equipSkill:true,
				forced:true,
				trigger:{player:['damageBegin3','loseHpBegin']},
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.name=='damage'){
						if(event.source&&event.source.hasSkillTag('unequip',false,{
							name:event.card?event.card.name:null,
							target:player,
							card:event.card
						})) return false;
						return event.card&&get.type2(event.card)=='trick';
					}
					return event.type=='du';
				},
				content:function(){
					trigger.num++;
				},
			},
			zhanxiang:{
				audio:true,
				equipSkill:true,
				forced:true,
				trigger:{target:'_yongjian_zengyuBegin'},
				content:function(){
					trigger._zengyu_denied=true;
					game.log(player,'拒绝了',trigger.player,'发起的赠予');
				},
				ai:{
					refuseGifts:true,
				},
			},
			xinge:{
				audio:true,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterCard:true,
				position:'h',
				filterTarget:lib.filter.notMe,
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					target.gain(cards,player,'giveAuto');
				},
			},
			qixingbaodao:{
				trigger:{player:'equipAfter'},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					return event.card.name=='qixingbaodao'&&player.hasCard(function(card){
						return card!=event.card;
					},'ej');
				},
				content:function(){
					var cards=player.getCards('ej',function(card){
						return card!=trigger.card&&lib.filter.cardDiscardable(card,player,'qixingbaodao');
					});
					if(cards.length) player.discard(cards);
				},
			},
			g_du:{
				trigger:{
					player:['loseAfter','compare'],
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
					target:'compare',
				},
				cardSkill:true,
				filter:function(event,player,name){
					if(name=='compare'){
						if(player==event.player){
							if(event.iwhile>0) return false;
							return event.card1.name=='du';
						}
						return event.card2.name=='du';
					}
					if(event.name!='equip'&&event.name!='addJudge'&&!event.visible) return false;
					var evt=event.getl(player);
					if(!evt||!evt.hs||!evt.hs.filter(function(i){
						return get.name(i,player)=='du';
					}).length) return false;
					for(var i of lib.skill.g_du.whiteListFilter){
						if(i(event,player)) return false;
					}
					return true;
				},
				whiteListFilter:[
					(event)=>event.getParent().name=='g_du_give',
					(event)=>event.getParent(3).name=='guaguliaodu',
				],
				forced:true,
				popup:false,
				content:function(){
					'step 0'
					if(trigger.delay===false) game.delayx();
					'step 1'
					game.log(player,'触发了','#g【毒】','的效果');
					var num=1;
					if(typeof trigger.getl=='function'){
						num=trigger.getl(player).hs.filter(function(i){
							return get.name(i,player)=='du';
						}).length;
					}
					player.loseHp(num).type='du';
				},
			},
			g_du_give:{
				trigger:{
					player:'gainAfter',
					global:'phaseBefore',
				},
				cardSkill:true,
				direct:true,
				filter:function(event,player){
					if(event.name=='phase'){
						if(game.phaseNumber!=0) return false;
						if(!player._start_cards) return false;
						var hs=player.getCards('h');
						for(var card of player._start_cards){
							if(get.name(card,player)=='du'&&hs.contains(card)) return true;
						}
					}
					else{
						if(event.getParent().name!='draw') return false;
						var hs=player.getCards('h');
						for(var card of event.cards){
							if(get.name(card,player)=='du'&&hs.contains(card)) return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					var hs=player.getCards('h');
					if(trigger.name=='phase'){
						event.cards=player._start_cards.filter(function(card){
							return (get.name(card,player)=='du'&&hs.contains(card));
						});
					}
					else{
						event.cards=trigger.cards.filter(function(card){
							return (get.name(card,player)=='du'&&hs.contains(card));
						});
					}
					if(_status.connectMode) game.broadcastAll(function(){_status.noclearcountdown=true});
					event.given_map={};
					'step 1'
					player.chooseCardTarget({
						filterCard:function(card){
							return _status.event.cards.contains(card);
						},
						filterTarget:lib.filter.notMe,
						selectCard:[1,cards.length],
						cards:event.cards,
						prompt:'是否发动【赠毒】？',
						prompt2:'将本次获得的【毒】交给其他角色',
						ai1:function(card){
							if(!ui.selected.cards.length) return 1;
							return 0;
						},
						ai2:function(target){
							return -get.attitude(_status.event.player,target);
						},
					});
					'step 2'
					if(result.bool){
						event.given=true;
						var res=result.cards,target=result.targets[0].playerid;
						player.addGaintag(res,'du_given');
						cards.removeArray(res);
						if(!event.given_map[target]) event.given_map[target]=[];
						event.given_map[target].addArray(res);
						if(cards.length) event.goto(1);
					}
					else if(!event.given){
						if(_status.connectMode){
							game.broadcastAll(function(){delete _status.noclearcountdown});
							game.stopCountChoose();
						}
						event.finish();
					}
					'step 3'
					if(_status.connectMode){
						game.broadcastAll(function(){delete _status.noclearcountdown});
						game.stopCountChoose();
					}
					var logs=[];
					for(var i in event.given_map){
						var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
						logs.push(source);
						source.gain(event.given_map[i],player,'give');
					}
					logs.sortBySeat();
					event.next.sort(function(a,b){
						return lib.sort.seat(a.player,b.player);
					});
					player.logSkill('g_du_give',logs);
					player.removeGaintag('du_given');
				},
				ai:{expose:0.1},
			},
			_yongjian_zengyu:{
				enable:'phaseUse',
				forceLoad:true,
				filter:function(event,player){
					return player.hasCard((card)=>lib.skill._yongjian_zengyu.filterCard(card),'h');
				},
				filterCard:function(card){
					return get.cardtag(card,'gifts');
				},
				filterTarget:function(card,player,target){
					if(player==target) return false;
					var card=ui.selected.cards[0];
					if(get.type(card,false)=='equip'){
						return target.canEquip(card,true);
					}
					return true;
				},
				discard:false,
				lose:false,
				delay:false,
				check:function(card){
					var player=_status.event.player;
					if(get.cardtag(card,'gifts')&&get.type(card,false)=='equip'&&game.hasPlayer(function(current){
						return current!=player&&current.canEquip(card,true)&&!current.hasSkillTag('refuseGifts')&&get.effect(current,card,player,player)>0;
					})) return 2;
					if(!player.needsToDiscard()) return 0;
					return 1+Math.random();
				},
				content:function(){
					'step 0'
					if(event._zengyu_denied){
						player.$throw(cards[0],1000);
						player.lose(cards,ui.discardPile,'visible');
					}
					else{
						if(get.type(cards[0],false)=='equip'){
							player.$give(cards[0],target,false);
							game.delay(0.5);
							target.equip(cards[0]);
						}
						else{
							target.gain(cards,player,'give');
							event.finish();
						}
					}
					'step 1'
					game.delayx();
				},
				ai:{
					order:function(item,player){
						if(player.hasCard(function(card){
							return get.cardtag(card,'gifts')&&get.type(card,false)=='equip'&&game.hasPlayer(function(current){
								return current!=player&&current.canEquip(card,true)&&!current.hasSkillTag('refuseGifts')&&get.effect(current,card,player,player)>0;
							});
						},'h')) return 7;
						return 0.51;
					},
					result:{
						target:function(player,target){
							var card=ui.selected.cards[0];
							if(!card||target.hasSkillTag('refuseGifts')) return 0;
							if(get.type(card,false)=='equip') return get.effect(target,card,target,target);
							if(card.name=='du') return player.hp>target.hp?-1:0;
							if(target.hasSkillTag('nogain')) return 0;
							return Math.max(1,get.value(card,player)-get.value(card,target));
						},
					},
				},
			},
		},
		translate:{
			gifts_tag:'赠',
			du:'毒',
			du_info:'①当此牌正面向上离开你的手牌区，或作为你的拼点牌而亮出时，你失去1点体力。②当你因摸牌或分发起始手牌而获得【毒】后，你可将其分配给其他角色（正面朝上移动，且不触发〖毒①〗）。',
			g_du:'毒',
			g_du_give:'赠毒',
			du_given:'已分配',
			guaguliaodu:'刮骨疗毒',
			guaguliaodu_info:'出牌阶段，对一名已受伤的角色使用。目标角色回复1点体力，然后其可以弃置一张【毒】（不触发〖毒①〗失去体力的效果）。',
			chenghuodajie:'趁火打劫',
			chenghuodajie_info:'出牌阶段，对一名有手牌的其他角色使用。你展示其一张手牌，然后令其选择一项：①将此牌交给你。②你对其造成1点伤害。',
			tuixinzhifu:'推心置腹',
			tuixinzhifu_info:'出牌阶段，对一名距离为1的其他角色使用。你获得其区域内的至多两张牌，然后交给其等量的牌。',
			yitianjian:'倚天剑',
			yitianjian_info:'当你因执行【杀】的效果而造成伤害后，若你已受伤，则你可弃置一张手牌，然后回复1点体力。',
			qixingbaodao:'七星宝刀',
			qixingbaodao_info:'锁定技。当此牌进入你的装备区后，你弃置装备区和判定区内的所有其他牌。',
			duanjian:'断剑',
			duanjian_info:'这是一把坏掉的武器…',
			duanjian_append:'<span class="text" style="font-family: yuanli">不要因为手快而装给自己。</span>',
			serafuku:'水手服',
			serafuku_info:'锁定技。当你成为【杀】的目标后，若你的性别包含男性，则你进行判定：若结果为黑色，则此牌对你的伤害值基数+1。',
			serafuku_append:'<span class="text" style="font-family: yuanli">セーラー服だからです、<br>结论！ </span>',
			yinfengyi:'引蜂衣',
			yinfengyi_info:'锁定技。当你受到渠道为锦囊牌的伤害时，此伤害+1。当你因〖毒①〗而失去体力时，失去体力的量值+1。',
			yonglv:'庸驴',
			yonglv_info:'锁定技。其他角色至你的距离视为1。',
			yonglv_append:'<span class="text" style="font-family: yuanli">它旁边的就是王仲宣。</span>',
			zhanxiang:'战象',
			zhanxiang_info:'锁定技。当你成为〖赠予〗的目标后，你将此次赠予的效果改为“将赠予牌移动至弃牌堆”。',
			xinge:'信鸽',
			xinge_info:'出牌阶段限一次。你可以将一张牌交给一名其他角色。',
			xinge_append:'<span class="text" style="font-family: yuanli">咕咕咕。</span>',
			
			_yongjian_zengyu:'赠予',
			_yongjian_zengyu_info:'出牌阶段，你可将一张拥有“赠”标签的手牌区装备牌置于一名其他角色的装备区内，或将一张拥有“赠”标签的手牌区非装备牌正面朝上交给一名其他角色。',
		},
		list:[
			['spade',1,'guaguliaodu'],
			['spade',2,'qixingbaodao',null,['gifts']],
			['spade',3,'shunshou',null,['gifts']],
			['spade',4,'du',null,['gifts']],
			['spade',5,'du',null,['gifts']],
			['spade',6,'sha','stab'],
			['spade',7,'sha','stab'],
			['spade',8,'sha','stab'],
			['spade',9,'du',null,['gifts']],
			['spade',10,'du',null,['gifts']],
			['spade',11,'wuxie'],
			['spade',12,'chenghuodajie'],
			['spade',13,'chenghuodajie'],
			
			['heart',1,'guaguliaodu'],
			['heart',2,'shan',null,['gifts']],
			['heart',3,'wugu',null,['gifts']],
			['heart',4,'xinge',null,['gifts']],
			['heart',5,'sha',null,['gifts']],
			['heart',6,'chenghuodajie'],
			['heart',7,'tao'],
			['heart',8,'tao'],
			['heart',9,'serafuku',null,['gifts']],
			['heart',10,'sha',null,['gifts']],
			['heart',11,'sha',null,['gifts']],
			['heart',12,'sha',null,['gifts']],
			['heart',13,'zhanxiang',null,['gifts']],
			
			['club',1,'duanjian',null,['gifts']],
			['club',2,'sha','stab'],
			['club',3,'yinfengyi',null,['gifts']],
			['club',4,'du'],
			['club',5,'yitianjian'],
			['club',6,'sha','stab'],
			['club',7,'sha','stab'],
			['club',8,'sha','stab'],
			['club',9,'sha','stab'],
			['club',10,'sha','stab'],
			['club',11,'wuxie'],
			['club',12,'wuxie'],
			['club',13,'yonglv',null,['gifts']],
			
			['diamond',1,'juedou',null,['gifts']],
			['diamond',2,'shan'],
			['diamond',3,'kaihua',null,['gifts']],
			['diamond',4,'kaihua',null,['gifts']],
			['diamond',5,'shan'],
			['diamond',6,'shan'],
			['diamond',7,'shan'],
			['diamond',8,'shan'],
			['diamond',9,'tuixinzhifu'],
			['diamond',10,'tuixinzhifu'],
			['diamond',11,'tao',null,['gifts']],
			['diamond',12,'shan'],
			['diamond',13,'sha','stab'],
		],
	}
});
