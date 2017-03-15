character.gwent={
	character:{
		gw_huoge:['male','qun',3,['quanzhang']],
		gw_aisinie:['female','wu',3,['huihun']],
		gw_enxier:['male','wei',4,['gwbaquan']],


		gw_kaerweite:['male','shu',4,['gwjiquan']],
		gw_falanxisika:['female','wu',3,['shewu']],
		gw_haluo:['male','qun',4,['nuhou']],

		gw_airuiting:['male','wei',4,['kuanglie']],

		// gw_gaier:['male','shu',3,['gwyinhua']],
		// gw_dagong:['male','qun',4,[]],
		// gw_bulanwang:['male','qun',3,[]],
		// gw_kuite:['male','qun',3,[]],
		// gw_fuertaisite:['male','qun',3,[]],
		// gw_hengsaite:['male','qun',3,[]],
		// gw_fulisi:['male','qun',3,[]],
		// gw_laduoweide:['male','qun',3,[]],

		gw_jieluote:['male','qun',6,['fayin']],
		gw_yenaifa:['female','qun',3,['xuezhou']],
		gw_telisi:['female','wei',3,['huandie']],
		gw_xili:['female','qun',3,['fengjian']],
		gw_luoqi:['male','wei',4,['gwzhanjiang']],
		gw_yioufeisi:['male','wu',4,['gwchuanxin']],
	},
	characterIntro:{
		gw_huoge:'那个老年痴呆?不知道他是活着还是已经被制成标本了!',
		gw_aisinie:'树精皇后有着熔银做成的眼睛，冰冷铸钢的心脏。',
		gw_gaier:'画作应该要传达情绪，而不是字句。',
		gw_enxier:'我可没什么耐心，最好小心点，否则脑袋不保',

		gw_yenaifa:'魔法是艺术、混沌与科学的结合。因为魔法的确是一门技艺也是一种诅咒。',
		gw_telisi:'我可以照顾我自己，相信我。',
		gw_jieluote:'如果要付出这种代价才能拯救世界，那最好还是让世界消逝吧。',
		gw_xili:'我想去哪，就去哪。',
		gw_luoqi:'是个爱国者…还是个货真价实的王八蛋。',
		gw_yioufeisi:'国王还是乞丐，两者有何区别，人类少一个算一个',
	},
	skill:{
		kuanglie:{
			trigger:{player:'useCardToBegin'},
			filter:function(event,player){
				return event.target&&event.target!=player&&event.target.num('he')&&get.color(event.card)=='black';
			},
			init:function(player){
				player.storage.kuanglie=0;
			},
			forced:true,
			content:function(){
				trigger.target.randomDiscard();
				player.storage.kuanglie++;
				if(player.storage.kuanglie%2==0){
					player.draw();
				}
			}
		},
		kuanglie2:{},
		gwjiquan:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('he');
			},
			selectTarget:[1,Infinity],
			content:function(){
				'step 0'
				player.gainPlayerCard(target,'he',true);
				'step 1'
				target.useCard({name:'sha'},player);
			},
			ai:{
				threaten:1.4,
				order:7,
				result:{
					target:function(player,target){
						if(player.getEquip('tengjia')||player.getEquip('bagua')) return -1;
						if(ai.get.effect(target,{name:'sha'},player,player)>=0) return -1;
						if(!player.hasShan()){
							if(ui.selected.targets.length) return 0;
							if(player.hp>=4) return -1;
							if(player.hp>=3&&target.hp==1) return -1;
							return 0;
						}
						var num=player.num('h','shan');
						if(num<1){
							num=1;
						}
						if(ui.selected.targets.length>=num){
							return 0;
						}
						return -1;
					}
				}
			}
		},
		nuhou:{
			enable:'phaseUse',
			usable:1,
			position:'he',
			filterCard:true,
			check:function(card){
				return 7-ai.get.value(card)
			},
			content:function(){
				'step 0'
				var list=player.getEnemies();
				list.sortBySeat();
				event.list=list;
				'step 1'
				if(event.list.length){
					var current=event.list.shift();
					var he=current.get('he');
					player.line(current,'green');
					if(he.length){
						current.discard(he.randomGet());
						current.addExpose(0.2);
					}
					event.redo();
				}
			},
			ai:{
				order:8.5,
				result:{
					player:1
				},
			},
		},
		shewu:{
			enable:'phaseUse',
			usable:1,
			position:'he',
			filterCard:true,
			selectCard:[1,3],
			check:function(card){
				if(!ui.selected.cards.length){
					return 6-ai.get.value(card)
				}
				var player=_status.event.player;
				if(player.isDamaged()){
					var hs=player.get('h');
					var num=0;
					for(var i=0;i<hs.length;i++){
						if(ai.get.value(hs[i])<6){
							num++;
						}
					}
					if(num>=3){
						return 6-ai.get.value(card);
					}
				}
				return 0;
			},
			content:function(){
				player.draw(3);
				if(cards.length>=2){
					player.addTempSkill('shewu_dist','phaseAfter');
				}
				if(cards.length==3){
					player.recover();
				}
			},
			ai:{
				order:1,
				result:{
					player:1
				},
				threaten:1.6
			},
			subSkill:{
				dist:{
					mod:{
						targetInRange:function(){
							return true;
						}
					}
				}
			}
		},
		gwzhanjiang:{
			trigger:{global:'phaseBegin'},
			direct:true,
			filter:function(event,player){
				return !player.hasSkill('gwzhanjiang2')&&event.player!=player;
			},
			content:function(){
				'step 0'
				var bool=(ai.get.effect(trigger.player,{name:'sha'},player,player)>0&&game.hasPlayer(function(current){
					return ai.get.attitude(current,player)>0&&current.hasSha();
				}));
				var next=player.chooseToDiscard(get.prompt('gwzhanjiang',trigger.player),'he');
				next.ai=function(card){
					if(bool) return 7-ai.get.value(card);
					return 0;
				};
				next.logSkill=['gwzhanjiang',trigger.player];
				'step 1'
				if(result.bool){
					player.addTempSkill('gwzhanjiang2',{player:'phaseBegin'});
					event.targets=game.filterPlayer(function(current){
						return current!=trigger.player;
					});
					event.targets.sortBySeat(trigger.player);
					event.list=[];
				}
				else{
					event.finish();
				}
				'step 2'
				if(event.targets.length){
					event.current=event.targets.shift();
					if(event.current.hasSha()){
						event.current.chooseToUse({name:'sha'},'是否对'+get.translation(trigger.player)+'使用一张杀？',trigger.player,-1);
					}
					else{
						event.redo();
					}
				}
				else{
					event.goto(4);
				}
				'step 3'
				if(result.bool){
					event.list.push(event.current);
				}
				event.goto(2);
				'step 4'
				if(event.list.length){
					game.asyncDrawAuto(event.list);
				}
			},
			ai:{
				expose:0.2
			}
		},
		gwzhanjiang2:{},
		gwchuanxin:{
			trigger:{player:'shaAfter'},
			filter:function(event,player){
				return event.target.isAlive();
			},
			check:function(event,player){
				return ai.get.effect(event.target,{name:'sha'},player,player)>0
			},
			logTarget:'target',
			logLine:false,
			content:function(){
				'step 0'
				player.judge(function(card){
					return get.color(card)=='black'?1:-1;
				});
				'step 1'
				if(result.color=='black'){
					player.useCard({name:'sha'},trigger.target,false);
				}
			}
		},
		fengjian:{
			trigger:{player:'useCard'},
			direct:true,
			filter:function(event,player){
				var type=get.type(event.card,'trick');
				return (type=='trick'||type=='equip')&&game.hasPlayer(function(current){
					return player.canUse('sha',current,false)&&!event.targets.contains(current);
				});
			},
			usable:2,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('fengjian'),function(card,player,target){
					return player.canUse('sha',target,false)&&!trigger.targets.contains(target);
				}).ai=function(target){
					return ai.get.effect(target,{name:'sha',nature:'thunder'},player,player);
				}
				"step 1"
				if(result.bool){
					player.logSkill('fengjian');
					player.useCard({name:'sha',nature:'thunder'},result.targets,false);
				}
			},
			ai:{
				expose:0.2,
				threaten:1.5
			},
			group:'fengjian_hide',
			subSkill:{
				hide:{
					trigger:{source:'damageEnd'},
					forced:true,
					popup:false,
					filter:function(event,player){
						return event.getParent(3).name=='fengjian';
					},
					content:function(){
						player.addTempSkill('qianxing',{player:'phaseBegin'});
					}
				}
			}
		},
		huandie:{
			trigger:{player:'phaseBegin'},
			direct:true,
			content:function(){
				'step 0'
				player.chooseTarget(get.prompt('huandie'),[0,game.countPlayer()],function(card,player,target){
					return target!=player;
				}).ai=function(target){
					return ai.get.attitude(player,target);
				}
				'step 1'
				if(result.bool){
					result.targets.sortBySeat();
					result.targets.unshift(player);
					player.logSkill('huandie',result.targets);
					game.asyncDrawAuto(result.targets,function(current){
						return current==player?1:2;
					});
					player.addTempSkill('huandie_discard','phaseAfter');
				}
			},
			ai:{
				threaten:1.5
			},
			subSkill:{
				discard:{
					trigger:{player:'phaseEnd'},
					forced:true,
					filter:function(event,player){
						return game.hasPlayer(function(current){
							return current.num('h')>current.hp;
						});
					},
					logTarget:function(){
						return game.filterPlayer(function(current){
							return current.num('h')>current.hp;
						}).sortBySeat();
					},
					content:function(){
						'step 0'
						var list=game.filterPlayer(function(current){
							return current.num('h')>current.hp;
						}).sortBySeat();
						event.list=list;
						'step 1'
						if(event.list.length){
							event.list.shift().chooseToDiscard('h',true,2);
							event.redo();
						}
					}
				}
			}
		},
		xuezhou:{
			trigger:{player:'phaseBegin'},
			direct:true,
			unique:true,
			forceunique:true,
			intro:{
				content:function(storage,player){
					var name=get.translation(player);
					if(storage==1){
						return '每当一名角色（'+name+'除外）受到一次伤害，该角色失去一点体力，'+name+'回复一点体力';
					}
					else if(storage==2){
						return '每当一名角色（'+name+'除外）造成一次伤害，该角色失去一点体力，'+name+'（若不是受伤害角色）回复一点体力';
					}
					else{
						return '未发动';
					}
				}
			},
			content:function(){
				'step 0'
				var next=player.chooseControl('选项一','选项二','cancel2',function(){
					if(Math.random()<0.65) return 0;
					return 1;
				});
				next.prompt=get.prompt('xuezhou');
				next.choiceList=[
					'每当一名其他角色受到一次伤害，该角色失去一点体力，你回复一点体力',
					'每当一名其他角色造成一次伤害，该角色失去一点体力，你（若不是受伤害角色）回复一点体力'
				];
				'step 1'
				if(result.control=='cancel2'){
					player.unmarkSkill('xuezhou');
					delete _status.xuezhou;
				}
				else{
					player.logSkill('xuezhou');
					player.storage.xuezhou=result.index+1;
					player.syncStorage('xuezhou');
					player.markSkill('xuezhou');
					_status.xuezhou=player;
				}
			},
			ai:{
				threaten:2.5
			},
			global:'xuezhou_hp'
		},
		xuezhou_hp:{
			trigger:{source:'damageEnd',player:'damageEnd'},
			filter:function(event,player){
				if(!_status.xuezhou) return false;
				if(player==_status.xuezhou) return false;
				if(!player.isIn()||!_status.xuezhou.isIn()) return false;
				switch(_status.xuezhou.storage.xuezhou){
					case 1:return player==event.player;
					case 2:return player==event.source;
					default:return false;
				}
			},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				'step 0'
				game.delayx();
				'step 1'
				_status.xuezhou.logSkill('xuezhou',player);
				player.loseHp();
				if(_status.xuezhou!=trigger.player){
					_status.xuezhou.recover();
				}
			}
		},
		fayin:{
			trigger:{player:'shaBegin'},
			direct:true,
			filter:function(event,player){
				return player.num('he')>0;
			},
			content:function(){
				'step 0'
				var target=trigger.target;
				var bool=ai.get.attitude(player,target)<0;
				var next=player.chooseToDiscard('he',get.prompt('fayin',target));
				next.ai=function(card){
					if(bool) return 7-ai.get.value(card);
					return 0;
				};
				next.logSkill=['fayin',target];
				'step 1'
				if(result.bool){
					var target=trigger.target;
					var num=5;
					if(target.isMad()){
						num=4;
					}
					switch(Math.floor(Math.random()*num)){
						case 0:target.randomDiscard(2);break;
						case 1:target.damage('fire');break;
						case 2:player.changeHujia();break;
						case 3:target.turnOver();target.draw();break;
						case 4:target.goMad({player:'phaseBegin'});break;
					}
				}
			}
		},
		gwbaquan:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('h')>0;
			},
			content:function(){
				'step 0'
				var hs=target.get('h');
				player.gain(hs,target);
				target.$giveAuto(hs,player);
				event.hs=hs;
				'step 1'
				var damage=(target.hp>=player.hp&&ai.get.damageEffect(target,player,player)>0);
				var hs=event.hs;
				if(damage&&target.hp>1){
					for(var i=0;i<hs.length;i++){
						if(ai.get.value(hs[i],player,'raw')>=8){
							damage=false;break;
						}
					}
				}
				player.chooseCard(hs.length,true,'选择还给'+get.translation(target)+'的牌').ai=function(card){
					if(damage){
						return hs.contains(card)?1:0;
					}
					else{
						return -ai.get.value(card,player,'raw');
					}
				}
				if(!event.isMine()) game.delay();
				'step 2'
				target.gain(result.cards,player);
				player.$giveAuto(result.cards,target);
				event.hs2=result.cards;
				if(player.hp>target.hp){
					event.finish();
				}
				'step 3'
				for(var i=0;i<event.hs2.length;i++){
					if(!event.hs.contains(event.hs2[i])) return;
				}
				player.line(target);
				target.damage();
			},
			ai:{
				order:11,
				result:{
					target:function(player,target){
						return -Math.sqrt(target.num('h'));
					}
				}
			}
		},
		hunmo:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target.num('h')!=Math.max(3,player.hp);
			},
			selectTarget:[1,Infinity],
			content:function(){
				var dh=Math.max(3,player.hp)-target.num('h');
				if(dh>0){
					target.draw(dh,false);
					target.$draw(dh);
					game.delay(0.5);
				}
				else if(dh<0){
					target.chooseToDiscard(-dh,true);
					if(player!=target) player.useCard({name:'sha'},target,false);
				}
			},
			ai:{
				order:11,
				result:{
					target:function(player,target){
						var att=get.sgn(ai.get.attitude(player,target));
						var dh=Math.max(3,player.hp)-target.num('h');
						if(dh<0){
							return att*dh+get.sgn(ai.get.effect(target,{name:'sha'},player,player));
						}
						return att*dh;
					}
				}
			}
		},
		huihun:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				if(!player.storage.huihun) return false;
				for(var i=0;i<player.storage.huihun.length;i++){
					if(get.position(player.storage.huihun[i])=='d') return true;
				}
				return false;
			},
			frequent:true,
			content:function(){
				var list=[];
				for(var i=0;i<player.storage.huihun.length;i++){
					if(get.position(player.storage.huihun[i])=='d'){
						list.push(player.storage.huihun[i]);
						if(list.length>=2) break;
					}
				}
				player.gain(list,'gain2','log');
			},
			ai:{
				threaten:1.8,
			},
			group:['huihun_count','huihun_count2'],
			subSkill:{
				count:{
					trigger:{player:'useCard'},
					forced:true,
					popup:false,
					silent:true,
					filter:function(event,player){
						return _status.currentPhase==player;
					},
					content:function(){
						if(!player.storage.huihun){
							player.storage.huihun=[];
						}
						for(var i=0;i<trigger.cards.length;i++){
							if(get.color(trigger.cards[i])=='red'){
								player.storage.huihun.add(trigger.cards[i]);
							}
						}
					}
				},
				count2:{
					trigger:{player:'phaseAfter'},
					forced:true,
					popup:false,
					silent:true,
					content:function(){
						delete player.storage.huihun;
					}
				}
			}
		},
		quanzhang:{
			enable:'phaseUse',
			usable:1,
			onChooseToUse:function(event){
				var cards=[];
				var num=6;
				if(ui.cardPile.childNodes.length<num){
					var discardcards=get.cards(num);
					for(var i=0;i<discardcards.length;i++){
						ui.discardPile.appendChild(discardcards[i]);
					}
				}
				for(var i=0;i<num;i++){
					cards.push(ui.cardPile.childNodes[i]);
				}
				event.set('quanzhangcards',cards);
			},
			chooseButton:{
				dialog:function(event,player){
					return ui.create.dialog('权杖：选择一张牌使用',event.quanzhangcards);
				},
				filter:function(button,player){
					var evt=_status.event.getParent();
					if(evt&&evt.filterCard){
						var type=get.type(button.link,'trick');
						return type!='equip'&evt.filterCard(button.link,player,evt);
					}
					return false;
				},
				check:function(button){
					return ai.get.value(button.link);
				},
				backup:function(links,player){
					return {
						filterCard:function(){return false},
						selectCard:-1,
						viewAs:links[0],
					}
				},
				prompt:function(links,player){
					return '选择'+get.translation(links)+'的目标';
				}
			},
			ai:{
				order:12,
				result:{
					player:1
				},
				threaten:1.5
			}
		},
	},
	translate:{
		gw_huoge:'霍格',
		gw_aisinie:'埃丝涅',
		gw_gaier:'盖尔',
		gw_enxier:'恩希尔',
		gw_kuite:'奎特',
		gw_dagong:'达贡',
		gw_airuiting:'艾瑞汀',
		gw_fuertaisite:'弗泰斯特',
		gw_falanxisika:'法兰西斯卡',
		gw_haluo:'哈洛',
		gw_hengsaite:'亨赛特',
		gw_kaerweite:'卡尔维特',
		gw_bulanwang:'布兰王',
		gw_fulisi:'符里斯',
		gw_laduoweide:'拉多维德',

		gw_jieluote:'杰洛特',
		gw_yenaifa:'叶奈法',
		gw_telisi:'特莉斯',
		gw_xili:'希里',
		gw_luoqi:'罗契',
		gw_yioufeisi:'伊欧菲斯',

		kuanglie:'狂猎',
		kuanglie_info:'锁定技，当一名其他角色成为你的黑色牌的目标后，该角色随机弃置一张牌；每当你发动两次“狂猎”，你摸一张牌',
		gwjiquan:'集权',
		gwjiquan_info:'出牌阶段限一次，你可以从任意名角色处各获得一张牌，每拿一张牌，被拿牌的角色视为对你使用一张杀',
		nuhou:'怒吼',
		nuhou_info:'出牌阶段限一次，你可以弃置一张牌，然后所有敌人随机弃置一张牌',
		shewu:'蛇舞',
		shewu_info:'出牌阶段限一次，你可以弃置1至3张牌然后摸3张牌；若你弃置了至少2张牌，你本回合使用卡牌无视距离；若你弃置了3张牌，你回复一点体力',
		gwzhanjiang:'斩将',
		gwzhanjiang_info:'每轮限一次，在一名角色的准备阶段，你可以弃置一张牌，然后所有角色可以对该角色使用一张杀，结算后所有出杀的角色摸一张牌',
		gwchuanxin:'穿心',
		gwchuanxin_info:'每当你对一名角色使用杀结算完毕后，你可以进行一判定，若结果为黑色，视为对目标再使用一张杀',
		fengjian:'风剑',
		fengjian_info:'每当你使用一张锦囊牌或装备牌，你可以视为对一名不是此牌目标的角色使用一张雷杀；若此杀造成伤害，你获得潜行直到下一回合开始，每回合最多发动两次',
		huandie:'幻蝶',
		huandie_info:'准备阶段，你可以摸一张牌，并令任意名其他角色摸两张牌，若如此做，此回合结束时，所有手牌数大于体力值的角色需弃置两张手牌',
		xuezhou:'血咒',
		xuezhou_info:'准备阶段，你可以选择一项效果直到下一回合开始：1. 每当一名其他角色受到一次伤害，该角色失去一点体力，你回复一点体力；2. 每当一名其他角色造成一次伤害，该角色失去一点体力，你（若不是受伤害角色）回复一点体力',
		fayin:'法印',
		fayin_info:'每当你使用一张杀，你可以弃置一张牌并获得一个随机法印效果：1. 目标随机弃置两张牌；2. 目标进入混乱状态直到下一回合开始；3. 对目标造成一点火属性伤害；4. 获得一点护甲；5. 令目标翻面并摸一张牌',
		gwbaquan:'霸权',
		gwbaquan_info:'出牌阶段限一次，你可以获得一名其他角色的所有牌，然后还给其等量的牌，若你归还的牌均为你获得的牌且该角色体力值不小于你，你对其造成一点伤害',
		hunmo:'魂墨',
		hunmo_info:'出牌阶段限一次，你可以选择任意名角色，令目标的手牌数变为与你当前的体力值相同（最多为3），并视为对其中弃牌的角色使用一张杀（不计入出杀次数）',
		huihun:'回魂',
		huihun_info:'结束阶段，你可以从弃牌堆中获得本回合使用的前两张红色牌',
		quanzhang:'权杖',
		quanzhang_backup:'权杖',
		quanzhang_info:'出牌阶段限一次，你可以观看牌堆顶的6张牌，并选择一张使用',
	}
}
