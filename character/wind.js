'use strict';
character.wind={
	character:{
		xiahouyuan:['male','wei',4,['shensu']],
		caoren:['male','wei',4,['jushou']],
		huangzhong:['male','shu',4,['liegong']],
		weiyan:['male','shu',4,['kuanggu']],
		xiaoqiao:['female','wu',3,['tianxiang','hongyan']],
		zhoutai:['male','wu',4,['buqu','fenji']],
		zhangjiao:['male','qun',3,['leiji','guidao','huangtian'],['zhu']],
		sp_zhangjiao:['male','qun',3,['diyleiji','guidao','huangtian'],['zhu']],
		// spzhangjiao:['male','qun',3,['spleiji','guidao','huangtian'],['zhu']],
		// yuji:['male','qun',3,['guhuo']],
	},
	skill:{
		diyleiji:{
			audio:2,
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget('是否发动新雷击？').ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				};
				"step 1"
				if(result.bool){
					player.logSkill('diyleiji',result.targets,'thunder');
					event.target=result.targets[0];
					event.target.judge(function(card){
						var suit=get.suit(card);
						if(suit=='spade') return -4;
						if(suit=='club') return -2;
						return 0;
					});
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.suit=='club'){
					event.target.damage('thunder');
					player.recover();
				}
				else if(result.suit=='spade'){
					event.target.damage(2,'thunder');
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'respondShan')){
							var hastarget=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0){
									hastarget=true;break;
								}
							}
							var be=target.num('e',{color:'black'});
							if(target.num('h','shan')&&be){
								if(!target.skills.contains('guidao')) return 0;
								return [0,hastarget?target.num('he')/2:0];
							}
							if(target.num('h','shan')&&target.num('h')>2){
								if(!target.skills.contains('guidao')) return 0;
								return [0,hastarget?target.num('h')/4:0];
							}
							if(target.num('h')>3||(be&&target.num('h')>=2)){
								return [0,0];
							}
							if(target.num('h')==0){
								return [1.5,0];
							}
							if(target.num('h')==1&&!be){
								return [1.2,0];
							}
							if(!target.skills.contains('guidao')) return [1,0.05];
							return [1,Math.min(0.5,(target.num('h')+be)/4)];
						}
					}
				}
			}
		},
		shensu:{
			group:['shensu1','shensu2']
		},
		shensu1:{
			audio:2,
			trigger:{player:'phaseBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.addSkill('shensu3');
				var check= player.num('h')>2;
				player.chooseTarget('是否发动【神速】？',function(card,player,target){
					if(player==target) return false;
					return player.canUse({name:'sha'},target);
				}).ai=function(target){
					if(!check) return 0;
					return ai.get.effect(target,{name:'sha'},_status.event.player);
				}
				"step 1"
				if(result.bool){
					player.logSkill('shensu1',result.targets);
					player.useCard({name:'sha'},result.targets[0],false);
					player.skip('phaseJudge');
					player.skip('phaseDraw');
				}
				player.removeSkill('shensu3');
			}
		},
		shensu2:{
			audio:2,
			trigger:{player:'phaseUseBefore'},
			direct:true,
			filter:function(event,player){
				return player.num('he',{type:'equip'})>0;
			},
			content:function(){
				"step 0"
				player.addSkill('shensu3');
				var check=player.num('h')<=player.hp;
				player.chooseCardTarget({
					prompt:'是否发动【神速】？',
					filterCard:function(card){
						return get.type(card)=='equip'
					},
					position:'he',
					filterTarget:function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target);
					},
					ai1:function(card){
						if(!check) return 0;
						return 6-ai.get.value(card);
					},
					ai2:function(target){
						if(!check) return 0;
						return ai.get.effect(target,{name:'sha'},_status.event.player);
					}
				});
				"step 1"
				if(result.bool){
					player.logSkill('shensu2',result.targets);
					player.discard(result.cards[0]);
					player.useCard({name:'sha'},result.targets[0]);
					trigger.untrigger();
					trigger.finish();
				}
				player.removeSkill('shensu3');
			}
		},
		shensu3:{
			mod:{
				targetInRange:function(card,player,target,now){
					return true;
				}
			},
		},
		jushou:{
			audio:true,
			trigger:{player:'phaseEnd'},
			content:function(){
				player.turnOver();
				player.draw(3);
			}
		},
		liegong:{
			audio:2,
			trigger:{player:'shaBegin'},
			filter:function(event,player){
				var length=event.target.num('h');
				return (length>=player.hp||length<=get.attackRange(player));
			},
			content:function(){
				trigger.directHit=true;
			}
		},
		kuanggu:{
			audio:2,
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return get.distance(player,event.player)<=1;
			},
			content:function(){
				player.recover(trigger.num);
			}
		},
		tianxiang:{
			audio:2,
			trigger:{player:'damageBefore'},
			direct:true,
			filter:function(event,player){
				return player.num('h',{suit:'heart'})>0&&event.num>0;
			},
			content:function(){
				"step 0"
				player.chooseCardTarget({
					filterCard:function(card){
						return get.suit(card)=='heart';
					},
					filterTarget:function(card,player,target){
						return player!=target;
					},
					ai1:function(card){
						return 10-ai.get.value(card);
					},
					ai2:function(target){
						var att=ai.get.attitude(player,target);
						if(trigger.num>1){
							if(target.maxHp>5&&target.hp>1) return -att/10;
							return -att;
						}
						var eff=ai.get.damageEffect(target,trigger.source,target,trigger.nature);
						if(att==0) return 0.1;
						if(eff>=0&&trigger.num==1){
							return att;
						}
						if(target.hp==target.maxHp) return -att;
						if(target.hp==1){
							if(target.maxHp<=4&&!target.hasSkillTag('maixie')){
								if(target.maxHp<=3){
									return -att;
								}
								return -att/2;
							}
							return 0;
						}
						if(target.hp==target.maxHp-1){
							if(target.hp>2||target.hasSkillTag('maixie')) return att/5;
							if(att>0) return 0.02;
							return 0.05;
						}
						return att/2;
					},
					prompt:'天香：弃置一张红桃牌转移伤害'
				});
				"step 1"
				if(result.bool){
					player.logSkill('tianxiang',result.targets);
					trigger.untrigger();
					trigger.player=result.targets[0];
					trigger.player.addSkill('tianxiang2');
					player.discard(result.cards[0]);
				}
				else{
					event.finish();
				}
				"step 2"
				trigger.trigger('damageBefore');
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(player.skills.contains('jueqing')) return;
						if(get.tag(card,'damage')&&target.num('h')>1) return 0.7;
					}
				},
				threaten:function(player,target){
					if(target.num('h')==0) return 2;
				}
			}
		},
		tianxiang2:{
			trigger:{player:['damageAfter','damageCancelled']},
			forced:true,
			popup:false,
			audio:false,
			content:function(){
				if(player.hp<player.maxHp) player.draw(player.maxHp-player.hp);
				player.removeSkill('tianxiang2');
				player.popup('tianxiang');
			}
		},
		hongyan:{
			mod:{
				suit:function(card,suit){
					if(suit=='spade') return 'heart';
				}
			}
		},
		buqu:{
			audio:2,
			trigger:{player:'dieBefore'},
			forced:true,
			filter:function(event,player){return player.maxHp>0},
			content:function(){
				"step 0"
				event.card=get.cards()[0];
				if(player.storage.buqu==undefined) player.storage.buqu=[];
				player.storage.buqu.push(event.card);
				game.addVideo('storage',player,['buqu',get.cardsInfo(player.storage.buqu),'cards']);
				player.showCards(player.storage.buqu,'不屈')
				game.log(player,'的不屈牌为',player.storage.buqu);
				player.markSkill('buqu');
				"step 1"
				for(var i=0;i<player.storage.buqu.length-1;i++){
					if(get.number(event.card)&&get.number(event.card)==get.number(player.storage.buqu[i])) return;
				}
				trigger.untrigger();
				trigger.finish();
				player.hp=0;
			},
			mod:{
				maxHandcard:function(player){
					if(player.storage.buqu&&player.storage.buqu.length) return player.storage.buqu.length;
				}
			},
			intro:{
				content:'cards',
				onunmark:function(storage,player){
					if(storage&&storage.length){
						player.$throw(storage);
						for(var i=0;i<storage.length;i++){
							ui.discardPile.appendChild(storage[i]);
						}
						delete player.storage.buqu;
					}
				}
			}
		},
		fenji:{
			audio:2,
			trigger:{global:'discardAfter'},
			filter:function(event){
				if(_status.currentPhase!=event.player){
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
				}
				return false;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>2;
			},
			content:function(){
				"step 0"
				player.loseHp();
				"step 1"
				trigger.player.draw(2);
			},
		},
		leiji:{
			audio:2,
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget('是否发动雷击？').ai=function(target){
					return ai.get.damageEffect(target,player,player);
				};
				"step 1"
				if(result.bool){
					player.logSkill('leiji',result.targets,'thunder');
					event.target=result.targets[0];
					event.target.judge(function(card){
						if(get.suit(card)=='spade') return -4;
						return 0;
					});
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool==false){
					event.target.damage(2,'thunder');
				}
			},
			ai:{
				mingzhi:false,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'respondShan')){
							var hastarget=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0){
									hastarget=true;break;
								}
							}
							if(target.num('h','shan')&&target.num('e',{suit:'spade'})){
								return [0,hastarget?target.num('he')/2:0];
							}
							if(target.num('h','shan')){
								return [1,hastarget?target.num('he')/2:0];
							}
							return [1,target.num('h')/4];
						}
					}
				}
			}
		},
		guidao:{
			audio:2,
			trigger:{global:'judge'},
			filter:function(event,player){
				return player.num('he',{color:'black'})>0;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
				get.translation(trigger.player.judging[0])+'，是否发动【鬼道】？','he',function(card){
					return get.color(card)=='black';
				}).ai=function(card){
					var trigger=_status.event.parent._trigger;
					var player=_status.event.player;
					var result=trigger.judge(card)-trigger.judge(trigger.player.judging[0]);
					var attitude=ai.get.attitude(player,trigger.player);
					if(attitude==0||result==0) return 0;
					if(attitude>0){
						return result;
					}
					else{
						return -result;
					}
				};
				"step 1"
				if(result.bool){
					player.respond(result.cards,'highlight');
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.logSkill('guidao');
					player.$gain2(trigger.player.judging[0]);
					player.gain(trigger.player.judging[0]);
					trigger.player.judging[0]=result.cards[0];
					trigger.position.appendChild(result.cards[0]);
					game.log(trigger.player,'的判定牌改为',result.cards[0]);
				}
				"step 3"
				game.delay(2);
			},
			ai:{
				tag:{
					rejudge:1
				}
			}
		},
		guhuo:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				player.draw();
				player.chooseToDiscard('hej',true).ai=ai.get.disvalue;
			},
			ai:{
				effect:{
					target:function(card){
						if(get.type(card)=='delay') return [0,1];
					}
				}
			}
		},
		huangtian:{
			unique:true,
			global:'huangtian2'
		},
		huangtian2:{
			audio:2,
			enable:'phaseUse',
			discard:false,
			line:true,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
			},
			filter:function(event,player){
				if(!game.zhu) return false;
				if(!game.zhu.isZhu) return false;
				return (player!=game.zhu&&game.zhu.skills.contains('huangtian')&&player.group=='qun')
			},
			filterCard:function(card){
				return (card.name=='shan'||card.name=='shandian')
			},
			filterTarget:function(card,player,target){
				return target==game.zhu;
			},
			usable:1,
			forceaudio:true,
			content:function(){
				target.gain(cards);
			},
			ai:{
				expose:0.3,
				order:10,
				result:{
					target:5
				}
			}
		}
	},
	translate:{
		xiahouyuan:'夏侯渊',
		caoren:'曹仁',
		huangzhong:'黄忠',
		sp_zhangjiao:'张角',
		weiyan:'魏延',
		xiaoqiao:'小乔',
		zhoutai:'周泰',
		zhangjiao:'张角',
		spzhangjiao:'张角',
		yuji:'于吉',
		shensu:'神速',
		shensu1:'神速',
		shensu2:'神速',
		jushou:'据守',
		liegong:'烈弓',
		kuanggu:'狂骨',
		tianxiang:'天香',
		hongyan:'红颜',
		buqu:'不屈',
		leiji:'雷击',
		spleiji:'新雷击',
		guidao:'鬼道',
		huangtian:'黄天',
		huangtian2:'黄天',
		guhuo:'蛊惑',
		fenji:'奋激',
		diyleiji:'雷击',
		diyleiji_info:'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为梅花，其受到一点雷电伤害，然后你回复一点体力；若结果为黑桃，其受到两点雷电伤害',
		tiangong:'天公',
		tiangong2:'天公',
		tiangong_info:'锁定技，你防止即将受到的雷电伤害，每当你造成一次雷电伤害，你摸一张牌',
		shensu_info:
		'你可以跳过摸牌阶段，或跳过出牌阶段并弃置一张装备牌，'+
		'若如此则视为对任意一名使用一张【杀】',
		jushou_info:
		'回合结束阶段，你可以将武将牌翻页并摸3张牌',
		liegong_info:
		'当你使用【杀】时，若目标的手牌数大于等于你的体力值，或小于等于你的攻击范围，你可令此【杀】不能闪避',
		kuanggu_info:
		'锁定技，每当你造成一点伤害，若受伤害角色与你的距离不大于1，你回复一点体力',
		tianxiang_info:
		'当你即将受到伤害时，你可以弃置一张红桃牌将伤害转移给任意一名其他角色，然后该角色摸x张牌，x为其已损失体力值',
		hongyan_info:
		'锁定技，你的黑桃牌均视为红桃',
		buqu_info:
		'锁定技，每当你扣减1点体力后，若你当前的体力值为0，你可以将牌堆顶的一张牌置于你的武将牌上，'+
		'称为“创”，若所有“创”的点数均不同，你不会死亡。你的手牌上限为“创”的个数',
		leiji_info:
		'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为黑桃，其受到两点雷电伤害',
		spleiji_info:
		'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为黑色，其受到一点雷电伤害，然后你回复一点体力',
		guidao_info:
		'任意一名角色的判定生效前，你可以打出一张黑色牌替换之',
		huangtian_info:
		'主公技，群雄角色可在他们各自的回合里给你一张【闪】或【闪电】。',
		guhuo_info:
		'锁定技，回合开始阶段，你摸一张牌并弃置区域内的一张牌',
		fenji_info:
		'每当一名角色的手牌于回合外被弃置时，你可以失去1点体力，然后该角色摸两张牌。'
	},
}
