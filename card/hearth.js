'use strict';
card.hearth={
	card:{
		linghunzhihuo:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:true,
			content:function(){
				target.damage('fire');
				var hs=player.get('h');
				if(hs.length){
					player.discard(hs.randomGet());
				}
			},
			ai:{
				basic:{
					order:1.8,
					value:[6,1],
					useful:2,
				},
				result:{
					player:function(player,target){
						if(player==target) return -1;
						if(player.num('h')>=player.hp) return -0.1;
						if(player.num('h')>1) return -0.5;
						return 0;
					},
					target:-1
				},
				tag:{
					damage:1,
					fireDamage:1,
					natureDamage:1,
				}
			}
		},
		jihuocard:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			content:function(){
				target.skip('phaseDiscard');
				target.draw();
			},
			ai:{
				order:10,
				result:{
					target:1
				}
			}
		},
		zhaomingdan:{
			fullskin:true,
			type:'trick',
			chongzhu:true,
			enable:function(card,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('j')) return true;
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return player!=target&&target.num('j')>0;
			},
			content:function(){
				target.discard(target.get('j'));
				player.draw();
			},
			ai:{
				order:9.5,
				value:1,
				result:{
					target:function(player,target){
						var js=target.get('j');
						var num=0;
						for(var i=0;i<js.length;i++){
							var jj=js[i].viewAs?{name:js[i].viewAs}:js[i];
							if(jj.name=='zhaomingdan') num++;
							else if(js.length==1&&ai.get.effect(target,jj,target,target)>=0){
								num--;
							}
							else{
								num++;
							}
						}
						return num;
					}
				}
			}
		},
		shijieshu:{
			fullskin:true,
			enable:true,
			type:'trick',
			filterTarget:function(card,player,target){
				return !target.isMin();
			},
			content:function(){
				'step 0'
				var cards=[];
				for(var i=0;i<2;i++){
					var card=get.cardPile(function(card){
						return get.type(card)=='equip';
					});
					if(card){
						ui.special.appendChild(card);
						cards.push(card);
					}
				}
				switch(cards.length){
					case 1:{
						target.$gain(cards[0]);
						game.delay();
						break;
					}
					case 2:{
						target.$gain(cards[0]);
						setTimeout(function(){
							target.$gain(cards[1]);
						},250);
						game.delay();
						break;
					}
				}
				event.cards=cards;
				'step 1'
				if(event.cards.length){
					target.equip(event.cards.shift());
					game.delay(0.5);
					if(event.cards.length){
						event.redo();
					}
				}
				'step 2'
				game.delay(0.5);
				'step 3'
				if(target.num('h')){
					target.chooseToDiscard('h',true);
				}
			},
			ai:{
				order:9,
				value:6,
				useful:2,
				result:{
					target:function(player,target){
						return Math.max(0,2-target.num('e'))+(target.num('h')?0:0.5);
					},
				}
			}
		},
		shandianjian:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				if(player!=game.me&&player.num('h')<2) return false;
				return target.num('h')>0;
			},
			content:function(){
				"step 0"
				if(target.get('h').length==0){
					event.finish();
					return;
				}
				var rand=Math.random()<0.5;
				target.chooseCard(true).ai=function(card){
					if(rand) return Math.random();
					return ai.get.value(card);
				};
				"step 1"
				event.dialog=ui.create.dialog(get.translation(target.name)+'展示的手牌',result.cards);
				event.card2=result.cards[0];
				event.videoId=lib.status.videoId++;
				game.addVideo('cardDialog',null,[get.translation(target.name)+'展示的手牌',get.cardsInfo(result.cards),event.videoId]);
				game.log(target,'展示了',event.card2);
				player.chooseToDiscard(function(card){
					return get.suit(card)==get.suit(_status.event.parent.card2);
				},function(card){
					if(ai.get.damageEffect(target,player,player,'thunder')>0){
						return 6-ai.get.value(card,_status.event.player);
					}
					return -1;
				}).prompt=false;
				game.delay(2);
				"step 2"
				if(result.bool){
					target.damage('thunder');
				}
				else{
					target.addTempSkill('shandianjian2','phaseBegin');
				}
				game.addVideo('cardDialog',null,event.videoId);
				event.dialog.close();
			},
			ai:{
				basic:{
					order:4,
					value:[3,1],
					useful:1,
				},
				wuxie:function(target,card,player,current,state){
					if(ai.get.attitude(current,player)>=0&&state>0) return false;
				},
				result:{
					player:function(player){
						var nh=player.num('h');
						if(nh<=player.hp&&nh<=4&&_status.event.name=='chooseToUse'){
							if(typeof _status.event.filterCard=='function'&&
								_status.event.filterCard({name:'shandianjian'})){
								return -10;
							}
							if(_status.event.skill){
								var viewAs=get.info(_status.event.skill).viewAs;
								if(viewAs=='shandianjian') return -10;
								if(viewAs&&viewAs.name=='shandianjian') return -10;
							}
						}
						return 0;
					},
					target:function(player,target){
						if(target.hasSkill('shandianjian2')||target.num('h')==0) return 0;
						if(player.num('h')<=1) return 0;
						if(target==player){
							if(typeof _status.event.filterCard=='function'&&
								_status.event.filterCard({name:'shandianjian'})){
								return -1.5;
							}
							if(_status.event.skill){
								var viewAs=get.info(_status.event.skill).viewAs;
								if(viewAs=='shandianjian') return -1.5;
								if(viewAs&&viewAs.name=='shandianjian') return -1.5;
							}
							return 0;
						}
						return -1.5;
					}
				},
				tag:{
					damage:1,
					thunderDamage:1,
					natureDamage:1,
				}
			}
		},
		shihuawuqi:{
			fullskin:true,
			type:'basic',
			enable:true,
			usable:1,
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			content:function(){
				player.addTempSkill('shihuawuqi','phaseAfter');
				if(!player.num('h','sha')){
					var card=get.cardPile('sha');
					if(card){
						player.gain(card,'gain2');
					}
				}
			},
			ai:{
				value:4,
				useful:2,
				order:8,
				result:{
					target:function(player,target){
						return target.num('h','sha')?0:1;
					}
				}
			}
		},
		siwangchanrao:{
			enable:true,
			type:'trick',
			filterTarget:function(card,player,target){
				return player!=target&&target.num('h')>0;
			},
			selectTarget:1,
			content:function(){
				'step 0'
				var hs=target.get('h');
				if(hs.length){
					target.discard(hs.randomGet());
				}
				'step 1'
				if(!target.num('h')){
					player.draw();
				}
			},
			ai:{
				order:9,
				value:4,
				useful:1,
				result:{
					target:-1,
					player:function(player,target){
						if(target.num('h')==1) return 1;
					}
				}
			}
		},
		dunpaigedang:{
			fullskin:true,
			enable:true,
			type:'trick',
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			modTarget:true,
			content:function(){
				target.changeHujia();
				target.draw();
			},
			ai:{
				order:8.5,
				value:7,
				useful:3,
				result:{
					target:1
				}
			}
		},
		chuansongmen:{
			fullskin:true,
			type:'trick',
			enable:true,
			discard:false,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player;
			},
			usable:3,
			forceUsable:true,
			content:function(){
				'step 0'
				ui.special.appendChild(cards[0]);
				player.storage.chuansongmen=cards[0];
				var gained=get.cards()[0];
				target.gain(gained,'gain2');
				if(lib.filter.filterCard(gained,player,event.parent.parent)){
					var next=player.chooseToUse();
					next.filterCard=function(card){
						return card==gained;
					};
					next.prompt='是否使用'+get.translation(gained)+'？';
				}
				else{
					ui.discardPile.appendChild(cards[0]);
					event.finish();
				}
				'step 1'
				if(result.bool){
					player.gain(cards,'gain2');
				}
				else{
					ui.discardPile.appendChild(cards[0]);
				}
			},
			ai:{
				order:9.5,
				value:7,
				useful:3,
				result:{
					target:1
				}
			}
		},
		tanshezhiren:{
			fullskin:true,
			type:'trick',
			enable:function(card,player){
				if(game.players.length<3) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')) return true;
				}
				return false;
			},
			chongzhu:true,
			filterTarget:function(card,player,target){
				return target.num('h')>0&&target!=player;
			},
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			content:function(){
				'step 0'
				for(var i=0;i<targets.length;i++){
					if(!targets[i].num('h')) targets.splice(i--,1);
				}
				if(targets.contains(player)){
					event.current=player;
				}
				else{
					event.current=targets.randomGet();
				}
				if(!targets.length) event.finish();
				event.num=0;
				'step 1'
				var current;
				if(targets.length>1){
					current=targets.randomGet(event.current);
					event.current.line(current);
				}
				else{
					current=targets[0];
				}
				var hs=current.get('h');
				if(hs.length){
					current.discard(hs.randomGet());
				}
				if(hs.length>1){
					event.current=current;
					event.num++;
					if(event.num<10){
						event.redo();
					}
				}
			},
			ai:{
				order:8,
				result:{
					target:-1
				},
				tag:{
					multineg:1,
					multitarget:1
				}
			}
		},
		xingjiegoutong:{
			fullskin:true,
			type:'trick',
			enable:true,
			selectTarget:-1,
			modTarget:true,
			filterTarget:function(card,player,target){return player==target},
			content:function(){
				target.gainMaxHp();
				target.recover();
				target.discard(target.get('h'));
			},
			ai:{
				basic:{
					useful:[1,1],
					value:[1,1],
				},
				order:1,
				result:{
					target:function(player,target){
						if(target.num('h','tao')) return 0;
						var nh=target.num('h');
						if(nh<=2) return 1;
						if(target.hp==1&&target.maxHp>2) return 1;
						return 0;
					},
				},
				tag:{
					recover:1
				}
			}
		},
		shenenshu:{
			fullskin:true,
			enable:true,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			type:'trick',
			content:function(){
				var num=player.num('h')-target.num('h');
				if(num<-3) num=-3;
				if(num>3) num=3;
				if(num>0){
					target.draw(num);
				}
				else if(num<0){
					player.draw(-num);
				}
				else{
					game.asyncDraw([target,player]);
				}
			},
			ai:{
				order:10,
				value:7,
				useful:2,
				result:{
					target:function(player,target){
						var nh=player.num('h')-target.num('h');
						if(!player.hasSkill('jizhi')){
							nh--;
						}
						if(nh>0) return nh;
						if(nh==0) return 1;
						return 0;
					},
					player:function(player,target){
						var nh=target.num('h')-player.num('h');
						if(!player.hasSkill('jizhi')){
							nh++;
						}
						if(nh>0) return nh;
						if(nh==0) return 1;
						return 0;
					}
				},
				expose:0.2
			}
        },
		zhiliaobo:{
			fullskin:true,
			enable:true,
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp;
			},
			type:'trick',
			content:function(){
				'step 0'
				target.recover();
				'step 1'
				if(target.hp<target.maxHp){
					target.judge(function(card){
						return get.color(card)=='red'?1:0;
					});
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool){
					target.recover();
				}
			},
			ai:{
				order:4,
				value:[8,3],
				useful:[6,3],
				result:{
					target:function(player,target){
						var eff=ai.get.recoverEffect(target,player,target);
						if(eff<=0) return 0;
						var num=target.maxHp-target.hp;
						if(num<1) return 0;
						if(num==1) return 1;
						if(target.hp==1) return 2.5;
						return 2;
					}
				},
				tag:{
					recover:1
				}
			}
		},
		yuansuhuimie:{
			fullskin:true,
			type:'trick',
			enable:true,
			selectTarget:-1,
			filterTarget:true,
			content:function(){
				"step 0"
				target.chooseToDiscard([1,2],'he').ai=function(card){
					if(ai.get.damageEffect(target,player,target,'thunder')>=0){
						if(target.hasSkillTag('maixie')){
							if(ui.selected.cards.length) return 0;
						}
						else{
							return 0;
						}
					}
					if(player.hasSkillTag('notricksource')) return 0;
					if(target.hasSkillTag('notrick')) return 0;
					if(card.name=='tao') return 0;
					if(target.hp==1&&card.name=='jiu') return 0;
					if(get.type(card)!='basic'){
						return 10-ai.get.value(card);
					}
					return 8-ai.get.value(card);
				};
				"step 1"
				if(!result.bool||result.cards.length<2){
					if(result.bool) target.damage(2-result.cards.length,'thunder');
					else target.damage(2,'thunder');
				}
			},
			ai:{
				basic:{
					order:7,
					useful:[5,1]
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nothunder')) return 0;
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0) num++;
						}
						if(num>1) return 0;
						var nh=target.num('he');
						if(target==player) nh--;
						if(nh==2) return -2.5;
						if(nh==1) return -3;
						if(nh==0) return -4;
						return -2;
					},
				},
				tag:{
					respond:1,
					respondSha:1,
					damage:1,
					natureDamage:1,
					thunderDamage:1,
					multitarget:1,
					multineg:1,
					discard:2,
					loseCard:2,
				}
			}
		}
	},
	skill:{
		shihuawuqi:{
			mod:{
				attackFrom:function(from,to,distance){
					return distance-1;
				}
			}
		},
		shandianjian2:{},
	},
	translate:{
		linghunzhihuo:'灵魂之火',
		linghunzhihuo_info:'对一名角色造成一点火焰伤害，然后随机弃置一张手牌',
		shenenshu:'神恩术',
		shenenshu_info:'对一名其他角色使用，令你与目标中手牌数较少的摸若干张牌，直到手牌数相等（X不大于3），若手牌数已相等，改为你与目标各摸一张牌',
		zhiliaobo:'治疗波',
		zhiliaobo_info:'对一名受伤角色使用，令其回复一点体力，若其仍处于受伤状态，则进行一次判定，若结果为红色则再回复一点体力',
		yuansuhuimie:'元素毁灭',
		yuansuhuimie_info:'对所有角色使用，令目标弃置0~2张牌，并受到2-X点雷电伤害，X为其弃置的手牌数',
		xingjiegoutong:'星界沟通',
		xingjiegoutong_info:'增加一点体力上限并回复一点体力，弃置你的所有手牌',
		tanshezhiren:'弹射之刃',
		tanshezhiren_info:'限场存活角色不小于3时使用，弃置一名随机角色（不含你）的手牌，重复此过程直到有一名角色失去最后一张手牌（最多重复10次）',
		chuansongmen:'传送门',
		chuansongmen_info:'摸一张牌，若你能立即使用之，则将此牌回手（每回合最多使用3次）',
		dunpaigedang:'盾牌格挡',
		dunpaigedang_info:'获得一点护甲值，摸一张牌',
		siwangchanrao:'死亡缠绕',
		siwangchanrao_infox:'弃置一名其他角色的一张手牌，若其此时没有手牌，则你摸一张牌',
		shihuawuqi:'石化武器',
		shihuawuqi_infox:'本回合内攻击范围+1；若你手牌中没有杀，则从牌堆中获得一张杀',
		shandianjian:'闪电箭',
		shandianjian_info:'目标角色展示一张手牌，然后若你能弃掉一张与所展示牌相同花色的手牌，则对该角色造成1点雷电伤害。',
		shijieshu:'视界术',
		shijieshu_info:'目标随机装备牌堆中的两张装备牌，然后弃置一张手牌',
		zhaomingdan:'照明弹',
		zhaomingdan_info:'弃置一名其他角色判定区内的所有牌，然后摸一张牌',
		jihuocard:'激活',
		jihuocard_info:'跳过本回合的弃牌阶段，摸一张牌',
	},
	list:[
		// ['heart',2,'shenenshu'],
		// ['diamond',12,'shenenshu'],
		['club',7,'zhiliaobo'],
		['spade',1,'zhiliaobo'],
		['spade',13,'yuansuhuimie'],
		['spade',13,'xingjiegoutong'],
		['diamond',2,'tanshezhiren'],
		['diamond',2,'chuansongmen'],
		['heart',2,'chuansongmen'],
		['club',3,'dunpaigedang'],
		['club',3,'shandianjian','thunder'],
		['spade',1,'shandianjian','thunder'],
		['spade',7,'shijieshu'],
		// ['diamond',5,'zhaomingdan'],
		// ['heart',10,'zhaomingdan'],
		['diamond',2,'jihuocard'],
		['diamond',1,'linghunzhihuo'],
	],
}
