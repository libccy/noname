'use strict';
character.fire={
	character:{
		zhugeliangwolong:['male','shu',3,['huoji','bazhen','kanpo'],['fullskin']],
		pangtong:['male','shu',3,['lianhuan','niepan'],['fullskin']],
		xunyu:['male','wei',3,['quhu','jieming'],['fullskin']],
		dianwei:['male','wei',4,['qiangxi'],['fullskin']],
		taishici:['male','wu',4,['tianyi'],['fullskin']],
		yanwen:['male','qun',4,['shuangxiong'],['fullskin']],
		yuanshao:['male','qun',4,['luanji','xueyi'],['zhu','fullskin']],
		pangde:['male','qun',4,['mashu','mengjin'],['fullskin']],
	},
	perfectPair:{
		zhugeliangwolong:['pangtong','huangyueying'],
		yuanshao:['yanwen']
	},
	skill:{
		huoji:{
			audio:2,
			enable:'chooseToUse',
			filterCard:function(card){
				return get.color(card)=='red';
			},
			viewAs:{name:'huogong',nature:'fire'},
			viewAsFilter:function(player){
				if(!player.num('h',{color:'red'})) return false;
			},
			prompt:'将一张红色牌当火攻使用',
			check:function(card){
				var player=_status.currentPhase;
				if(player.num('h')>player.hp){
					return 6-ai.get.value(card);
				}
				return 4-ai.get.value(card)
			}
		},
		bazhen:{
			audio:2,
			inherit:'bagua_skill',
			filter:function(event,player){
				if(!event.filterCard({name:'shan'})) return false;
				if(event.parent.player.num('s','unequip')) return false;
				if(player.get('e','2')) return false;
				return true;
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(player==target&&get.subtype(card)=='equip2'){
							if(ai.get.equipValue(card)<=8) return 0;
						}
						if(target.num('e','2')) return;
						if(player.skills.contains('unequip')) return;
						if(get.tag(card,'respondShan')) return [0.5,0];
					}
				}
			}
		},
		kanpo:{
			audio:2,
			enable:'chooseToUse',
			filterCard:function(card){
				return get.color(card)=='black';
			},
			viewAsFilter:function(player){
				return player.num('h',{color:'black'})>0;
			},
			viewAs:{name:'wuxie'},
			prompt:'将一张黑色牌当无懈可击使用',
			check:function(card){return 8-ai.get.value(card)},
			threaten:1.2
		},
		lianhuan:{
			group:['lianhuan1','lianhuan2']
		},
		lianhuan1:{
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h',{suit:'club'})>0;
			},
			filterCard:function(card){
				return get.suit(card)=='club';
			},
			viewAs:{name:'tiesuo'},
			prompt:'将一张梅花牌当铁锁连环使用',
			check:function(card){return 4-ai.get.value(card)}
		},
		lianhuan2:{
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h',{suit:'club'})>0;
			},
			filterCard:function(card){
				return get.suit(card)=='club';
			},
			check:function(card){
				return 5-ai.get.useful(card);
			},
			content:function(){
				player.draw();
			},
			discard:false,
			prepare:function(cards,player){
				player.$throw(cards);
			},
			ai:{
				basic:{
					order:1
				},
				result:{
					player:1,
				},
			}
		},
		niepan:{
			audio:2,
			unique:true,
			enable:'chooseToUse',
			mark:true,
			init:function(player){
				player.storage.niepan=false;
			},
			filter:function(event,player){
				if(event.type!='dying') return false;
				if(player!=_status.dying) return false;
				if(player.storage.niepan) return false;
			},
			content:function(){
				player.hp=Math.min(3,player.maxHp);
				player.discard(player.get('hej'));
				player.draw(3);
				player.unmarkSkill('niepan');
				if(player.classList.contains('linked')) player.link();
				if(player.classList.contains('turnedover')) player.turnOver();
				player.storage.niepan=true;
			},
			ai:{
				skillTagFilter:function(player){
					if(player.storage.niepan) return false;
					if(player.hp>0) return false;
				},
				save:true,
				result:{
					player:10
				},
				threaten:function(player,target){
					if(!target.storage.niepan) return 0.6;
				}
			},
			intro:{
				content:'limited'
			}
		},
		quhu:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				if(player.num('h')==0) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hp>player.hp&&game.players[i].num('h')) return true;
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return target.hp>player.hp&&target.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target);
				"step 1"
				if(result.bool){
					player.chooseTarget(function(card,player,target1){
						return target1!=target&&get.distance(target,target1,'attack')<=1;
					},true).ai=function(target1){
						return ai.get.damageEffect(target1,target,player);
					}
				}
				else{
					player.damage(target);
					event.finish();
				}
				"step 2"
				if(result.bool){
					result.targets[0].damage(target);
				}
			},
			ai:{
				order:0.5,
				result:{
					target:function(player,target){
						var att=ai.get.attitude(player,target);
						var oc=(target.num('h')==1);
						if(att>0&&oc) return 0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&game.players[i]!=player&&
								get.distance(target,game.players[i],'attack')<=1){
								if(ai.get.damageEffect(game.players[i],target,player)>0){
									return att>0?att/2:att-(oc?5:0);
								}
							}
						}
						return 0;
					},
					player:function(player,target){
						if(target.skills.contains('jueqing')) return -10;
						var mn=1;
						var hs=player.get('h');
						for(var i=0;i<hs.length;i++){
							mn=Math.max(mn,hs[i].number);
						}
						if(mn<=11&&player.hp<2) return -20;
						var max=player.maxHp-hs.length;
						for(var i=0;i<game.players.length;i++){
							if(ai.get.attitude(player,game.players[i])>2){
								max=Math.max(Math.min(5,game.players[i].hp)-game.players[i].num('h'),max);
							}
						}
						switch(max){
							case 0:return mn==13?0:-20;
							case 1:return mn>=12?0:-15;
							case 2:return 0;
							case 3:return 1;
							default:return max;
						}
					}
				},
				expose:0.2
			}
		},
		jieming:{
			audio:2,
			trigger:{player:'damageEnd'},
			direct:true,
			filter:function(event,player){
				return event.num>0
			},
			content:function(){
				"step 0"
				player.chooseTarget([1,trigger.num],function(card,player,target){
					return target.num('h')<Math.min(target.maxHp,5);
				}).ai=function(target){
					var att=ai.get.attitude(_status.event.player,target);
					if(att>2){
						return Math.min(5,target.maxHp)-target.num('h');
					}
					return att/3;
				}
				"step 1"
				if(result.bool){
					player.logSkill('jieming',result.targets);
					for(var i=0;i<result.targets.length;i++){
						result.targets[i].draw(Math.min(5,result.targets[i].maxHp)-result.targets[i].num('h'));
					}
				}
			},
			ai:{
				maixie:true,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'damage')&&target.hp>1){
							if(player.skills.contains('jueqing')) return [1,-2];
							var max=0;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])>0){
									max=Math.max(Math.min(5,game.players[i].hp)-game.players[i].num('h'),max);
								}
							}
							switch(max){
								case 0:return 2;
								case 1:return 1.5;
								case 2:return [1,2];
								default:return [0,max];
							}
						}
						if((card.name=='tao'||card.name=='caoyao')&&
							target.hp>1&&target.num('h')<=target.hp) return [0,0];
					}
				},
			}
		},
		qiangxi:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterCard:function(card){
				return get.subtype(card)=='equip1';
			},
			selectCard:[0,1],
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return get.distance(player,target,'attack')<=1;
			},
			content:function(){
				"step 0"
				if(cards.length==0){
					player.loseHp();
				}
				"step 1"
				target.damage();
			},
			check:function(card){
				return 10-ai.get.value(card);
			},
			position:'he',
			ai:{
				order:8,
				result:{
					player:function(player,target){
						if(ui.selected.cards.length) return 0;
						if(player.hp>=target.hp) return -0.9;
						if(player.hp<=2) return -10;
						return -2;
					},
					target:function(player,target){
						if(player.hp<=2) return 0;
						return ai.get.damageEffect(target,player);
					}
				}
			},
			threaten:1.3
		},
		tianyi:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player!=target&&target.num('h')>0;
			},
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target);
				"step 1"
				if(result.bool){
					player.addTempSkill('tianyi2','phaseAfter');
				}
				else{
					player.addTempSkill('tianyi3','phaseAfter');
				}
			},
			ai:{
				order:function(name,player){
					var cards=player.get('h');
					if(player.num('h','sha')==0){
						return 1;
					}
					for(var i=0;i<cards.length;i++){
						if(cards[i].name!='sha'&&cards[i].number>11&&ai.get.value(cards[i])<7){
							return 9;
						}
					}
					return lib.card.sha.ai.order-1;
				},
				result:{
					player:function(player){
						if(player.num('h','sha')>0) return 0.6;
						var num=player.num('h');
						if(num>player.hp) return 0;
						if(num==1) return -2;
						if(num==2) return -1;
						return -0.7;
					},
					target:function(player,target){
						var num=target.num('h');
						if(num==1) return -1;
						if(num==2) return -0.7;
						return -0.5
					},
				},
				threaten:1.3
			}
		},
		tianyi2:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha') return true;
				},
				selectTarget:function(card,player,range){
					if(card.name=='sha'&&range[1]!=-1) range[1]++;
				},
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num+1;
				}
			},
		},
		tianyi3:{
			mod:{
				cardEnabled:function(card){if(card.name=='sha') return false}
			}
		},
		shuangxiong:{
			audio:true,
			trigger:{player:'phaseDrawBefore'},
			check:function(event,player){
				if(player.num('h')>player.hp) return true;
				if(player.num('h')>3) return true;
				return false;
			},
			content:function(){
				"step 0"
				player.judge(ui.special);
				"step 1"
				player.gain(result.card);
				player.$gain2(result.card);
				player.addTempSkill('shuangxiong2','phaseAfter');
				player.storage.shuangxiong=get.color(result.card);
				trigger.untrigger();
				trigger.finish();
			}
		},
		shuangxiong2:{
			audio:true,
			enable:'phaseUse',
			viewAs:{name:'juedou'},
			filterCard:function(card,player){
				return get.color(card)!=player.storage.shuangxiong;
			},
			check:function(card){
				return 6-ai.get.value(card);
			},
			ai:{
				basic:{
					order:10
				}
			}
		},
		luanji:{
			audio:2,
			enable:'phaseUse',
			viewAs:{name:'wanjian'},
			filterCard:function(card,player){
				if(ui.selected.cards.length){
					return get.suit(card)==get.suit(ui.selected.cards[0]);
				}
				var cards=player.get('h');
				for(var i=0;i<cards.length;i++){
					if(card!=cards[i]){
						if(get.suit(card)==get.suit(cards[i])) return true;
					}
				}
				return false;
			},
			selectCard:2,
			check:function(card){
				return 6-ai.get.value(card);
			},
			ai:{
				basic:{
					order:10
				}
			}
		},
		xueyi:{
			mod:{
				maxHandcard:function(player,num){
					if(player.isZhu){
						for(var i=0;i<game.players.length;i++){
							if(player!=game.players[i]&&game.players[i].group=='qun') num+=2;
						}
					}
					return num;
				}
			}
		},
		mengjin:{
			audio:2,
			trigger:{player:'shaMiss'},
			priority:-1,
			filter:function(event){
				return event.target.num('he')>0;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.target)<0;
			},
			content:function(){
				player.discardPlayerCard('he',trigger.target,true);
			}
		},
	},
	translate:{
		zhugeliangwolong:'卧龙',
		pangtong:'庞统',
		xunyu:'荀彧',
		dianwei:'典韦',
		taishici:'太史慈',
		yanwen:'颜良文丑',
		yuanshao:'袁绍',
		pangde:'庞德',
		huoji:'火计',
		bazhen:'八阵',
		kanpo:'看破',
		lianhuan:'连环',
		lianhuan1:'连环',
		lianhuan2:'重铸♣︎',
		niepan:'涅槃',
		quhu:'驱虎',
		jieming:'节命',
		qiangxi:'强袭',
		tianyi:'天义',
		shuangxiong:'双雄',
		shuangxiong2:'双雄',
		luanji:'乱击',
		xueyi:'血裔',
		mengjin:'猛进',
		huoji_info:'出牌阶段，你可以将你的任意一张♥或♦手牌当【火攻】使用。',
		bazhen_info:'当你没装备防具时，始终视为你装备着【八卦阵】。',
		kanpo_info:'你可以将你的任意一张♠或♣手牌当【无懈可击】使用。',
		lianhuan_info:'出牌阶段，你可以将你任意一张梅花手牌当【铁索连环】使用或重铸。',
		niepan_info:'当你处于濒死状态时，你可以丢弃你所有的牌和你判定区里的牌，并重置你的武将牌，然后摸三张牌且体力回复至3点。',
		quhu_info:'出牌阶段，你可以与一名体力比你多的角色拼电，若你赢，则该角色对其攻击范围内另一名由你指定的角色造成1点伤害。若你没赢，他/她对你造成一点伤害。每回合限用一次。',
		jieming_info:'你每受到1点伤害，可令任意一名角色将手牌补至其体力上限的张数(不能超过五张)。',
		qiangxi_info:'出牌阶段，你可以自减一点体力或弃一张武器牌，然后你对你攻击范围内的一名角色造成一点伤害，每回合限一次。',
		tianyi_info:'出牌阶段，你可以和一名角色拼点，若你赢，你获得以下技能直到回合结束：攻击范围无限；可额外使用一张【杀】；使用【杀】时可额外指定一个目标，若你没赢，你不能使用【杀】直到回合结束。每回合限一次。',
		shuangxiong_info:'摸牌阶段，你可选择放弃摸牌并进行一次判定：你获得此判定牌，且于此回合的出牌阶段，你可以将任意一张与此判定牌不同颜色的手牌当【决斗】使用。',
		luanji_info:'出牌阶段，你可以将任意两张相同花色的手牌当【万箭齐发】使用。',
		xueyi_info:'场上每有一名其他群雄角色存活，你的手牌上限便+2。',
		mengjin_info:'当你使用的【杀】被【闪】抵消时，你可以弃掉对方的一张牌。',
	},
}
