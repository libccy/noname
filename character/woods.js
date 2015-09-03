'use strict';
character.woods={
	character:{
		menghuo:['male','shu',4,['huoshou','zaiqi'],['fullskin']],
		zhurong:['female','shu',4,['juxiang','lieren'],['fullskin']],
		caopi:['male','wei',3,['xingshang','fangzhu','songwei'],['zhu','fullskin']],
		xuhuang:['male','wei',4,['duanliang'],['fullskin']],
		lusu:['male','wu',3,['haoshi','dimeng'],['fullskin']],
		sunjian:['male','wu',4,['yinghun'],['fullskin']],
		dongzhuo:['male','qun',8,['jiuchi','roulin','benghuai','baonue'],['zhu','fullskin']],
		jiaxu:['male','qun',3,['luanwu','wansha','weimu'],['fullskin']],
	},
	perfectPair:{
		menghuo:['zhurong']
	},
	skill:{
		huoshou:{
			locked:true,
			group:['huoshou1','huoshou2'],
			ai:{
				effect:{
					target:function(card,player,target){
						if(card.name=='nanman') return 0;
					}
				}
			}
		},
		huoshou1:{
			audio:2,
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:15,
			filter:function(event,player){
				return (event.card.name=='nanman');
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
		},
		huoshou2:{
			trigger:{global:'damageBefore'},
			forced:true,
			filter:function(event,player){
				return (event.card&&event.card.name=='nanman');
			},
			content:function(){
				trigger.source=player;
			}
		},
		zaiqi:{
			audio:2,
			trigger:{player:'phaseDrawBefore'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			check:function(event,player){
				if(player.maxHp-player.hp<2){
					return false;
				}
				else if(player.maxHp-player.hp==2){
					return player.num('h')>=2;
				}
				return true;
			},
			content:function(){
				"step 0"
				trigger.untrigger();
				trigger.finish();
				event.cards=get.cards(player.maxHp-player.hp);
				player.showCards(event.cards);
				"step 1"
				var num=0;
				for(var i=0;i<event.cards.length;i++){
					if(get.suit(event.cards[i])=='heart'){
						num++;
						ui.discardPile.appendChild(event.cards[i]);
						event.cards.splice(i--,1);
					}
				}
				if(num){
					player.recover(num);
				}
				"step 2"
				if(event.cards.length){
					player.gain(event.cards);
					player.$gain2(event.cards);
					game.delay();
				}
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 2;
					if(target.hp==2) return 1.5;
					return 1;
				},
			}
		},
		juxiang:{
			unique:true,
			locked:true,
			group:['juxiang1','juxiang2'],
			ai:{
				effect:{
					target:function(card){
						if(card.name=='nanman') return [0,1];
					}
				}
			}
		},
		juxiang1:{
			audio:2,
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:15,
			filter:function(event,player){
				return (event.card.name=='nanman');
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			}
		},
		juxiang2:{
			trigger:{global:'useCardAfter'},
			forced:true,
			filter:function(event,player){
				return (event.card.name=='nanman'&&event.player!=player&&get.position(event.card)=='d'&&get.itemtype(event.card)=='card');
			},
			content:function(){
				player.gain(trigger.card);
				player.$gain2(trigger.card);
			}
		},
		lieren:{
			audio:2,
			trigger:{source:'damageEnd'},
			filter:function(event,player){
				return (event.card&&event.card.name=='sha'&&
					event.player.classList.contains('dead')==false&&
					event.player.num('h')&&player.num('h'));
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<=0;
			},
			priority:5,
			content:function(){
				"step 0"
				player.chooseToCompare(trigger.player);
				"step 1"
				if(result.bool&&trigger.player.num('he')){
					player.gainPlayerCard(trigger.player,true,'he');
				}
			}
		},
		xingshang:{
			audio:2,
			unique:true,
			gainable:true,
			trigger:{global:'dieEnd'},
			priority:5,
			filter:function(event){
				return event.cards.length>0
			},
			content:function(){
				"step 0"
				player.gain(trigger.playerCards);
				player.$draw(trigger.playerCards);
				//trigger.player.$give(trigger.cards,player);
				game.delay();
				// var card=trigger.cards;
				// var str=get.translation(player)+'获得了'+get.translation(card[0]);
				// for(var i=1;i<card.length;i++){
				// 	str+='、'+get.translation(card[i]);
				// }
				// game.log(str);
				"step 1"
				for(var i=0;i<trigger.playerCards.length;i++){
					trigger.cards.remove(trigger.playerCards[i]);
				}
				trigger.playerCards.length=0;
			}
		},
		fangzhu:{
			audio:2,
			trigger:{player:'damageEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【放逐】？',function(card,player,target){
					return player!=target
				}).ai=function(target){
					var player=_status.event.player;
					if(ai.get.attitude(_status.event.player,target)==0) return 0;
					if(ai.get.attitude(_status.event.player,target)>0){
						if(target.classList.contains('turnedover')) return 1000-target.num('h');
						if(player.maxHp-player.hp<3) return -1;
						return 100-target.num('h');
					}
					else{
						if(target.classList.contains('turnedover')) return -1;
						if(player.maxHp-player.hp>=3) return -1;
						return 1+target.num('h');
					}
				}
				"step 1"
				if(result.bool){
					player.logSkill('fangzhu',result.targets);
					result.targets[0].draw(player.maxHp-player.hp);
					result.targets[0].turnOver();
				}
			},
			ai:{
				maixie:true,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.skills.contains('jueqing')) return [1,-2];
							var hastarget=false;
							var hasfriend=false;
							var turnfriend=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0&&!game.players[i].isTurnedOver()){
									hastarget=true;
								}
								if(ai.get.attitude(target,game.players[i])>0&&game.players[i].isTurnedOver()){
									hastarget=true;
									turnfriend=true;
								}
								if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
									hasfriend=true;
								}
							}
							if(ai.get.attitude(player,target)>0&&!hastarget) return;
							if(!hasfriend) return;
							if(turnfriend||target.hp==target.maxHp) return [0.5,1];
							if(target.hp>1) return [1,1];
						}
					}
				}
			}
		},
		songwei:{
			unique:true,
			global:'songwei2',
		},
		songwei2:{
			audio:2,
			forceaudio:true,
			trigger:{player:'judgeEnd'},
			filter:function(event,player){
				if(!game.zhu) return false;
				return (player!=game.zhu&&game.zhu.skills.contains('songwei')&&player.group=='wei'&&get.color(event.result.card)=='black');
			},
			check:function(event,player){
				return ai.get.attitude(player,game.zhu)>0;
			},
			content:function(){
				game.zhu.draw();
			}
		},
		duanliang:{
			group:['duanliang1','duanliang2'],
			ai:{
				threaten:1.2
			}
		},
		duanliang1:{
			audio:2,
			enable:'chooseToUse',
			filterCard:function(card){
				if(get.type(card)=='trick') return false;
				if(get.type(card)=='delay') return false;
				return get.color(card)=='black';
			},
			position:'he',
			viewAs:{name:'bingliang'},
			prompt:'将一黑色的基本牌或装备牌当兵粮寸断使用',
			check:function(card){return 6-ai.get.value(card)},
			ai:{
				order:9
			}
		},
		duanliang2:{
			mod:{
				targetInRange:function(card,player,target){
					if(card.name=='bingliang'){
						if(get.distance(player,target)<=2) return true;
					}
				}
			}
		},
		haoshi:{
			audio:2,
			trigger:{player:'phaseDrawBegin'},
			threaten:1.4,
			check:function(event,player){
				if(player.num('h')<=1) return true;
				var min=[];
				var temp=player.next.num('h');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')<temp){
						temp=game.players[i].num('h');
					}
				}
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')==temp){
						min.push(game.players[i]);
					}
				}
				for(var i=0;i<min.length;i++){
					if(ai.get.attitude(player,min[i])>0) return true;
				}
				return false;
			},
			content:function(){
				trigger.num+=2;
				player.addSkill('haoshi2');
			},
			ai:{
				threaten:2
			}
		},
		haoshi2:{
			trigger:{player:'phaseDrawEnd'},
			forced:true,
			popup:false,
			content:function(){
				"step 0"
				player.removeSkill('haoshi2');
				if(player.num('h')<=5){
					event.finish();
					return;
				}
				var temp=player.next.num('h');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')<temp){
						temp=game.players[i].num('h');
					}
				}
				player.chooseCardTarget({
					selectCard:Math.floor(player.num('h')/2),
					filterTarget:function(card,player,target){
						return target.num('h')==temp;
					},
					forced:true,
					ai2:function(target){
						return ai.get.attitude(player,target);
					}
				});
				"step 1"
				result.targets[0].gain(result.cards);
				player.$give(result.cards.length,result.targets[0]);
			}
		},
		dimeng:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			position:'he',
			filterCard:true,
			selectCard:[0,Infinity],
			selectTarget:2,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				if(ui.selected.targets.length==0) return true;
				return (Math.abs(ui.selected.targets[0].num('h')-target.num('h'))==
					ui.selected.cards.length);
			},
			multitarget:true,
			content:function(){
				var cards0=targets[0].get('h');
				var cards1=targets[1].get('h');
				targets[0].gain(cards1);
				targets[1].gain(cards0);
				targets[0].$give(cards0.length,targets[1]);
				targets[1].$give(cards1.length,targets[0]);
			},
			check:function(card){
				var list=[],player=_status.event.player;
				var num=player.num('he');
				var count;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>3) list.push(game.players[i]);
				}
				list.sort(function(a,b){
					return a.num('h')-b.num('h');
				});
				if(list.length==0) return -1;
				var from=list[0];
				list.length=0;

				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])<1) list.push(game.players[i]);
				}
				list.sort(function(a,b){
					return b.num('h')-a.num('h');
				});
				if(from.num('h')>=list[0].num('h')) return -1;
				for(var i=0;i<list.length&&from.num('h')<list[i].num('h');i++){
					if(list[i].num('h')-from.num('h')<=num){
						count=list[i].num('h')-from.num('h');break;
					}
				}
				if(count<2&&from.num('h')>=2) return -1;
				if(ui.selected.cards.length<count) return 11-ai.get.value(card);
				return -1;
			},
			ai:{
				order:6,
				threaten:3,
				expose:0.9,
				result:{
					target:function(player,target){
						var list=[];
						var num=player.num('he');
						if(ui.selected.targets.length==0){
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>3) list.push(game.players[i]);
							}
							list.sort(function(a,b){
								return a.num('h')-b.num('h');
							});
							if(target==list[0]) return ai.get.attitude(player,target);
							return -ai.get.attitude(player,target);
						}
						else{
							var from=ui.selected.targets[0];
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])<1) list.push(game.players[i]);
							}
							list.sort(function(a,b){
								return b.num('h')-a.num('h');
							});
							if(from.num('h')>=list[0].num('h')) return -ai.get.attitude(player,target);
							for(var i=0;i<list.length&&from.num('h')<list[i].num('h');i++){
								if(list[i].num('h')-from.num('h')<=num){
									var count=list[i].num('h')-from.num('h');
									if(count<2&&from.num('h')>=2) return -ai.get.attitude(player,target);
									if(target==list[i]) return ai.get.attitude(player,target);
									return -ai.get.attitude(player,target);
								}
							}
						}
					}
				}
			}
		},
		yinghun:{
			audio:2,
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(function(card,player,target){
					return player!=target;
				}).ai=function(target){
					if(player.maxHp-player.hp==1&&target.num('he')==0){
						return 0;
					}
					if(ai.get.attitude(_status.event.player,target)>0){
						return 10+ai.get.attitude(_status.event.player,target);
					}
					if(player.maxHp-player.hp==1){
						return -1;
					}
					return 1;
				}
				"step 1"
				if(result.bool){
					player.logSkill('yinghun',result.targets);
					event.target=result.targets[0];
					player.chooseControl('yinghun_true','yinghun_false',function(event,player){
						if(ai.get.attitude(player,event.target)>0) return 'yinghun_true';
						return 'yinghun_false';
					})
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.control=='yinghun_true'){
					event.target.draw(player.maxHp-player.hp);
					event.target.chooseToDiscard(true,'he');
				}
				else{
					event.target.draw();
					event.target.chooseToDiscard(player.maxHp-player.hp,true,'he');
				}
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 2;
					if(target.hp==2) return 1.5;
					return 0.5;
				},
				maixie:true,
				effect:{
					target:function(card,player,target){
						if(target.maxHp<=3) return;
						if(get.tag(card,'damage')){
							if(target.hp==target.maxHp) return [0,1];
						}
						if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
					}
				}
			}
		},
		jiuchi:{
			audio:2,
			enable:'chooseToUse',
			filterCard:function(card){
				return get.suit(card)=='spade';
			},
			viewAs:{name:'jiu'},
			viewAsFilter:function(player){
				if(!player.num('h',{suit:'spade'})) return false;
			},
			prompt:'将一张黑桃手牌当酒使用',
			check:function(card){
				if(_status.event.type=='dying') return 1;
				return 4-ai.get.value(card);
			},
			ai:{
				skillTagFilter:function(player){
					return player.num('h',{suit:'spade'})>0;
				},
				threaten:1.5,
				save:true,
			}
		},
		roulin:{
			audio:2,
			trigger:{player:'shaBegin',target:'shaBegin'},
			forced:true,
			filter:function(event,player){
				if(player==event.player){
					return event.target.sex=='female';
				}
				return event.player.sex=='female';
			},
			check:function(event,player){
				return player==event.player;
			},
			content:function(){
				"step 0"
				var next=trigger.target.chooseToRespond({name:'shan'});
				next.autochoose=lib.filter.autoRespondShan;
				next.ai=function(card){
					if(trigger.target.num('h','shan')>1){
						return ai.get.unuseful2(card);
					}
					return -1;
				};
				"step 1"
				if(result.bool==false){
					trigger.untrigger();
					trigger.directHit=true;
				}
			}
		},
		benghuai:{
			audio:2,
			trigger:{player:'phaseEnd'},
			forced:true,
			check:function(){
				return false;
			},
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].hp<player.hp) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				player.chooseControl('baonue_hp','baonue_maxHp',function(event,player){
					if(player.hp<player.maxHp-1||player.hp<=2) return 'baonue_maxHp';
					return 'baonue_hp';
				});
				"step 1"
				if(result.control=='baonue_hp'){
					player.loseHp();
				}
				else{
					player.loseMaxHp();
				}
			},
			ai:{
				threaten:0.5
			}
		},
		baonue:{
			unique:true,
			global:'baonue2'
		},
		baonue2:{
			audio:2,
			forceaudio:true,
			trigger:{source:'damageEnd'},
			filter:function(event,player){
				if(!game.zhu) return false;
				return (player!=game.zhu&&game.zhu.skills.contains('baonue')&&player.group=='qun')&&game.zhu.hp<game.zhu.maxHp;
			},
			check:function(event,player){
				return ai.get.attitude(player,game.zhu)>0;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					if(get.suit(card)=='spade') return 4;
					return 0;
				})
				"step 1"
				if(result.bool){
					game.zhu.recover();
				}
			}
		},
		luanwu:{
			audio:2,
			unique:true,
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.luanwu;
			},
			init:function(player){
				player.storage.luanwu=false;
			},
			mark:true,
			intro:{
				content:'limited'
			},
			content:function(){
				"step 0"
				player.unmarkSkill('luanwu')
				player.storage.luanwu=true;
				event.current=player.next;
				"step 1"
				event.current.chooseToUse({name:'sha'},function(card,player,target){
					if(player==target) return false;
					if(get.distance(player,target)<=1) return true;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==player) continue;
						if(get.distance(player,game.players[i])<get.distance(player,target)) return false;
					}
					return true;
				})
				"step 2"
				if(result.bool==false) event.current.loseHp();
				if(event.current.next!=player){
					event.current=event.current.next;
					game.delay(0.5);
					event.goto(1);
				}
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							var att=ai.get.attitude(player,game.players[i]);
							if(att>0) att=1;
							if(att<0) att=-1;
							if(game.players[i]!=player&&game.players[i].hp<=3){
								if(game.players[i].num('h')==0) num+=att/game.players[i].hp;
								else if(game.players[i].num('h')==1) num+=att/2/game.players[i].hp;
								else if(game.players[i].num('h')==2) num+=att/4/game.players[i].hp;
							}
							if(game.players[i].hp==1) num+=att*1.5;
						}
						// console.log(num);
						if(player.hp==1){
							return -num;
						}
						if(player.hp==2){
							return -game.players.length/4-num;
						}
						return -game.players.length/3-num;
					}
				}
			}
		},
		wansha:{
			locked:true,
			global:'wansha2'
		},
		wansha2:{
			mod:{
				cardSavable:function(card,player){
					if(_status.currentPhase.skills.contains('wansha')&&_status.currentPhase!=player){
						if(card.name=='tao'&&_status.dying!=player) return false;
					}
				}
			}
		},
		weimu:{
			mod:{
				targetEnabled:function(card){
					if((get.type(card)=='trick'||get.type(card)=='delay')&&
						get.color(card)=='black') return false;
				}
			}
		},
	},
	translate:{
		zhurong:'祝融',
		menghuo:'孟获',
		caopi:'曹丕',
		xuhuang:'徐晃',
		lusu:'鲁肃',
		sunjian:'孙坚',
		dongzhuo:'董卓',
		jiaxu:'贾诩',
		huoshou:'祸首',
		huoshou1:'祸首',
		huoshou2:'祸首',
		zaiqi:'再起',
		juxiang:'巨象',
		juxiang1:'巨象',
		juxiang2:'巨象',
		lieren:'烈刃',
		xingshang:'行殇',
		fangzhu:'放逐',
		songwei:'颂威',
		songwei2:'颂威',
		duanliang:'断粮',
		duanliang1:'断粮',
		haoshi:'好施',
		dimeng:'缔盟',
		yinghun:'英魂',
		yinghun_true:'摸X弃1',
		yinghun_false:'摸1弃X',
		jiuchi:'酒池',
		roulin:'肉林',
		benghuai:'崩坏',
		baonue:'暴虐',
		baonue2:'暴虐',
		baonue_hp:'体力',
		baonue_maxHp:'体力上限',
		luanwu:'乱舞',
		wansha:'完杀',
		weimu:'帷幕',
		huoshou_info:'【南蛮入侵】对你无效；你是任何【南蛮入侵】造成伤害的来源。',
		zaiqi_info:'摸牌阶段，若你已受伤，你可以放弃摸牌并展示牌堆顶的X张牌，X为你已损失的体力值，其中每有一张♥牌，你回复1点体力，然后弃掉这些♥牌，将其余的牌收入手牌。',
		juxiang_info:'南蛮入侵】对你无效；若其他角色使用的【南蛮入侵】在结算完时进入弃牌堆，你立即获得它。',
		lieren_info:'你每使用【杀】造成一次伤害，可与受到该伤害的角色拼点；若你赢，你获得对方的一张牌。',
		xingshang_info:'你可以立即获得死亡角色的所有牌。',
		fangzhu_info:'你每受到一次伤害，可令除你以外的任一角色补X张牌，X为你已损失的体力值，然后该角色将其武将牌翻面。',
		songwei_info:'其他魏势力的角色的判定牌结果为♠或♣且失效后，可以让你摸一张牌。',
		duanliang_info:'出牌阶段，你可以将你的任意一张♠或♣的基本牌或装备牌当【兵粮寸断】使用；你可以对与你距离2以内的角色使用【兵粮寸断】。',
		haoshi_info:'摸牌阶段，你可以额外摸两张牌，若此时你的手牌数多于五张，你必须将一半(向下取整)的手牌交给场上除你外手牌数最少的一名角色。',
		dimeng_info:'出牌阶段，你可以选择其他两名角色，你弃掉等同于这两名角色手牌数量的牌，然后交换他们的手牌，每回合限一次。',
		yinghun_info:'回合开始阶段，若你已受伤，可选择一名其他角色执行下列两项中的一项： 1.摸X张牌，然后弃一张牌。 2.摸一张牌，然后弃X张牌。 X为你已损失的体力值，每回合限一次。',
		jiuchi_info:'你可将你的任意一张♠手牌当【酒】使用。',
		roulin_info:'你对女性角色、女性角色对你使用【杀】时，都需连续使用两张【闪】才能抵消。',
		benghuai_info:'回合结束阶段，若你的体力不是全场最少的(或之一)，你须减1点体力或体力上限。',
		baonue_info:'其他群雄角色每造成一次伤害，可进行一次判定，若为♠，你回复1点体力。',
		luanwu_info:'出牌阶段，可令除你外的所有角色依次对与其距离最近的另一名角色使用一张【杀】，无法如此做者失去1点体力。',
		wansha_info:'在你的回合，除你以外，只有处于濒死状态的角色才能使用【桃】。',
		weimu_info:'你不能成为♠或♣锦囊的目标。',
	},
}
