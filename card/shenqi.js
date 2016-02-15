card.shenqi={
	card:{
		donghuangzhong:{
			type:'equip',
			subtype:'equip5',
			skills:['donghuangzhong'],
			enable:function(card,player){return player==game.me;},
			onEquip:function(){
				//if(player==game.me) player.loseHp();
			},
			onLose:function(){
				//if(player==game.me) player.loseHp();
			}
		},
		xuanyuanjian:{
			type:'equip',
			subtype:'equip1',
			skills:['xuanyuanjian','xuanyuanjian2'],
			enable:function(card,player){
				return player.skills.contains('xuanyuan')||player.hp>2;
			},
			distance:{attackFrom:-Infinity},
			onEquip:function(){
				//player.loseHp();
				if(!player.skills.contains('xuanyuan')&&player.hp<=2){
					player.discard(card);
				}
			},
			onLose:function(){
				if(!player.skills.contains('xuanyuan')) player.loseHp();
			},
			ai:{
				equipValue:20
			}
		},
		pangufu:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			skills:['pangufu'],
			distance:{attackFrom:-3},
			ai:{
				equipValue:8
			}
		},
		lianyaohu:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			onLose:function(){
				delete player.storage.lianhua;
			},
			ai:{
				equipValue:8
			},
			skills:['lianhua','shouna']
		},
		haotianta:{
			type:'equip',
			subtype:'equip5',
			skills:['haotianta'],
			enable:function(card,player){return player==game.me;},
			onEquip:function(){
				//player.loseHp();
			},
			onLose:function(){
				//player.loseHp();
			},
			ai:{
				equipValue:0
			}
		},
		fuxiqin:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['kongxin'],
			ai:{
				equipValue:6
			}
		},
		shennongding:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['shennongding'],
			ai:{
				equipValue:6
			}
		},
		kongdongyin:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['kongdongyin'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.hp==2) return 7;
						if(player.hp==1) return 10;
						return 5;
					}
				}
			}
		},
		// kunlunjing:{
		// 	type:'equip',
		// 	subtype:'equip5',
		// 	skills:['kunlunjing'],
		// 	onEquip:function(){
		// 		//if(player==game.me) player.loseHp();
		// 	},
		// 	onLose:function(){
		// 		//if(player==game.me) player.loseHp();
		// 	},
		// 	ai:{
		// 		equipValue:5
		// 	}
		// },
		nvwashi:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['nvwashi'],
			ai:{
				equipValue:5
			}
		}
	},
	skill:{
		lianhua:{
			enable:'phaseUse',
			filter:function(event,player){
				var hu=player.get('e','5');
				if(hu&&hu.storage.shouna&&hu.storage.shouna.length>1){
					return true;
				}
				return false;
			},
			usable:1,
			content:function(){
				"step 0"
				event.hu=player.get('e','5');
				player.chooseCardButton('弃置两张壶中的牌，然后从牌堆中获得一张类别不同的牌',2,event.hu.storage.shouna).ai=function(){
					return 1;
				}
				"step 1"
				if(result.bool){
					var type=[];
					player.$throw(result.links);
					game.log(player,'弃置了',result.links);
					for(var i=0;i<result.links.length;i++){
						event.hu.storage.shouna.remove(result.links[i]);
						ui.discardPile.appendChild(result.links[i]);
						type.add(get.type(result.links[i],'trick'));
					}
					for(var i=0;i<ui.cardPile.childNodes.length;i++){
						if(!type.contains(get.type(ui.cardPile.childNodes[i],'trick'))){
							player.gain(ui.cardPile.childNodes[i],'gain');
							break;
						}
					}
				}
				else{
					player.getStat('skill').lianhua--;
				}
			},
			ai:{
				order:11,
				result:{
					player:1
				}
			}
		},
		shouna:{
			trigger:{global:'discardAfter'},
			filter:function(event,player){
				if(player.skills.contains('shouna2')) return false;
				if(_status.currentPhase==event.player) return false;
				if(event.player==player) return false;
				for(var i=0;i<event.cards.length;i++){
					if(get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			forced:true,
			content:function(){
				var cards=trigger.cards.slice(0);
				for(var i=0;i<cards.length;i++){
					if(get.position(cards[i])!='d'){
						cards.splice(i,1);i--;
					}
				}
				var hu=player.get('e','5');
				if(cards.length&&hu){
					if(!hu.storage.shouna){
						hu.storage.shouna=[];
					}
					player.addTempSkill('shouna2','phaseAfter');
					player.$gain2(cards);
					for(var i=0;i<cards.length;i++){
						hu.storage.shouna.push(cards[i]);
						ui.special.appendChild(cards[i]);
					}
					game.log(player,'将',cards,'收入炼妖壶');
				}
			},
		},
		shouna2:{},
		donghuangzhong:{
			mode:['identity','guozhan'],
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return event.player==game.me&&
				(game.dead.length||game.players.length+game.dead.length<8);
			},
			content:function(){
				"step 0"
				var list=[];
				for(var i=0;i<game.dead.length;i++){
					list.push(game.dead[i].name);
				}
				if(game.dead.length){
					player.chooseButton(ui.create.dialog([list,'character']),function(button){
						for(var i=0;i<game.dead.length&&game.dead[i].name!=button.link;i++);
						return -ai.get.attitude(_status.event.player,game.dead[i]);
					},true);
					if(game.players.length+game.dead.length<8){
						event.control=ui.create.control('新角色',ui.click.cancel)
					}
				}
				"step 1"
				if(result.bool){
					for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
					game.removePlayer(game.dead[i]);
					player.recover();
				}
				else{
					var group=player.group;
					if(group=='unknown') group=lib.group.randomGet();
					var list=[];
					for(var i in lib.character){
						if(lib.character[i][1]==group) list.push(i);
					}
					var player2=game.addPlayer();
					if(get.config('double_character')){
						var list2=list.randomGets(2);
						player2.init(list2[0],list2[1]);
					}
					else{
						player2.init(list.randomGet())
					}
					player2.identity=player.identity;
					if(player2.identity=='zhu') player2.identity='zhong';
					player2.setIdentity();
					player2.identityShown=true;
					if(group!='unknown') player.loseHp(player2.maxHp);
				}
				if(event.control) event.control.close();
			}
		},
		xuanyuanjian:{
			mod:{
				selectTarget:function(card,player,range){
					if(card.name=='sha'&&range[1]!=-1) range[1]++;
				},
			},
			trigger:{player:'changeHp'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.skills.contains('xuanyuan')&&player.hp<=2
			},
			content:function(){
				player.discard(player.get('e','1'));
			},
			ai:{
				threaten:1.5
			}
		},
		xuanyuanjian2:{
			trigger:{source:'damageBefore'},
			forced:true,
			filter:function(event){
				return Math.random()<0.5;
			},
			content:function(){
				trigger.num++;
				if(!trigger.nature) trigger.nature='thunder';
				player.get('e','1').animate('thunder');
			}
		},
		pangufu:{
			trigger:{source:'damageEnd'},
			forced:true,
			priority:55,
			filter:function(event){
				return event.player.num('he')>0;
			},
			content:function(){
				trigger.player.chooseToDiscard(true,'he');
			}
		},
		shouhua:{
			mode:['identity','infinity'],
			enable:'phaseUse',
			filter:function(event,player){
				return player==game.me;
			},
			usable:1,
			filterTarget:function(card,player,target){
				return target!=game.zhu&&target!=game.me&&target.hp<target.maxHp;
			},
			filterCard:true,
			check:function(card){
				return ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player){
				player.$throw(cards);
			},
			content:function(){
				"step 0"
				target.$turn2();
				target.style.left='calc(50% - 120px)';
				target.style.top='calc(50% - 60px)';
				game.delay(0,2500);
				"step 1"
				target.removeAttribute('style');
				if(Math.random()<(ai.get.value(cards[0])+1)*(target.maxHp-target.hp)/(60*target.maxHp)){
					event.position=target.dataset.position;
					target.dataset.position=player.dataset.position;
					target.delete();
					event.success=true;
				}
				game.delay();
				"step 2"
				if(event.success){
					player.popup('收化成功');
					game.log(player,'将',target,'收化');
					target.dataset.position=event.position;
					var card=player.get('e','5');
					if(!card.storage.shouhua) card.storage.shouhua=[];
					card.storage.shouhua.push(target);
					game.removePlayer(target);
					game.checkResult();
				}
				else{
					player.popup('收化失败');
					target.gain(cards);
					target.$gain2(cards);
				}
				game.delay();
			},
			ai:{
				result:{
					player:function(){
						return Math.random()-0.4;
					}
				}
			}
		},
		haotianta:{
			trigger:{global:'judgeBefore'},
			content:function(){
				"step 0"
				event.cards=get.cards(9);
				player.chooseCardButton(event.cards,'选择一张牌作为判定结果',true).ai=function(button){
					if(ai.get.attitude(player,trigger.player)>0){
						return trigger.judge(button.link);
					}
					if(ai.get.attitude(player,trigger.player)<0){
						return -trigger.judge(button.link);
					}
				};
				"step 1"
				var card=result.links[0];
				event.cards.remove(card);
				for(var i=0;i<event.cards.length;i++) ui.discardPile.appendChild(event.cards[i]);
				var node=card.copy('thrown','center',ui.arena).animate('start');
				if(card){
					trigger.untrigger();
					trigger.finish();
					trigger.result={
						card:card,
						judge:trigger.judge(card),
						node:node,
					};
					if(trigger.result.judge>0){
						trigger.result.bool=true;
						trigger.player.popup('洗具');
					}
					if(trigger.result.judge<0){
						trigger.result.bool=false;
						trigger.player.popup('杯具');
					}
					game.log(trigger.player,'的判定结果为',card);
					trigger.direct=true;
					trigger.position.appendChild(card);
					game.delay(2);
				}
				else{
					event.finish();
				}
				"step 2"
				var card=trigger.result.card;
				if(trigger.position!=ui.discardPile){
					trigger.position.appendChild(card);
					trigger.result.node.delete();
				}
				else{
					player.gain(card);
					player.$gain2(card);
				}
				game.delay();
			},
			ai:{
				tag:{
					rejudge:10
				}
			}
		},
		shennongding:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			selectCard:2,
			check:function(card){
				if(get.tag(card,'recover')>=1) return 0;
				return 7-ai.get.value(card);
			},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				player.recover();
			},
			ai:{
				result:{
					player:function(player){
						return ai.get.recoverEffect(player);
					}
				},
				order:2.5
			}
		},
		kongdongyin:{
			trigger:{player:'dieBefore'},
			forced:true,
			filter:function(event,player){
				return player.maxHp>0;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.hp=1;
				player.draw();
				player.discard(player.get('e',{subtype:'equip5'}));
				game.delay();
			}
		},

		nvwashi:{
			trigger:{global:'dying'},
			priority:6,
			filter:function(event,player){
				return event.player.hp<=0;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>0;
			},
			content:function(){
				"step 0"
				trigger.player.judge(function(card){
					return get.suit(card)=='heart'?1:0;
				});
				"step 1"
				if(result.bool){
					trigger.player.recover();
				}
			},
			ai:{
				threaten:1.2,
				expose:0.2
			}
		},
		kongxin:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('h');
			},
			filter:function(event,player){
				return player.num('h')?true:false;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target);
				"step 1"
				if(result.bool){
					event.bool=true;
					player.chooseTarget('选择一个目标视为'+get.translation(target)+'对其使用一张杀',function(card,player,target2){
						return player!=target2&&target.canUse('sha',target2);
					}).ai=function(target){
						return ai.get.effect(target,{name:'sha'},target,player);
					}
				}
				else{
					target.discardPlayerCard(player);
				}
				"step 2"
				if(event.bool&&result.bool){
					target.useCard({name:'sha'},result.targets);
				}
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						if(player.num('h')<=1) return 0;
						if(ai.get.attitude(player,target)>=0) return 0;
						for(var i=0;i<game.players.length;i++){
							if(player!=game.players[i]&&
								target.canUse('sha',game.players[i])&&
								ai.get.effect(game.players[i],{name:'sha'},target,player)>0){
								return -1;
							}
						}
						return 0;
					}
				}
			}
		},
		kongxin2:{
			trigger:{player:'dying'},
			priority:10,
			forced:true,
			popup:false,
			filter:function(event,player){
				return player==game.me;
			},
			content:function(){
				player.removeSkill('kongxin2');
				game.swapPlayer(player);
				player.storage.kongxin.lockOut=false;
				player.storage.kongxin.out();
				if(player==game.me) game.swapPlayer(player.storage.kongxin);
				if(lib.config.mode=='identity') player.storage.kongxin.setIdentity();
				delete player.storage.kongxin;
			},
		},
		lianyao_hujia:{
			mode:['identity','guozhan'],
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				if(player!=game.me) return false;
				var card=player.get('e','5');
				if(card.storage.shouhua&&card.storage.shouhua.length) return true;
				return false;
			},
			content:function(){
				"step 0"
				var list=[];
				var card=player.get('e','5');
				for(var i=0;i<card.storage.shouhua.length;i++){
					list.push(card.storage.shouhua[i].name);
				}
				var dialog=ui.create.dialog([list,'character']);
				for(var i=0;i<dialog.buttons.length;i++){
					dialog.buttons[i].link=card.storage.shouhua[i];
					dialog.buttons[i].querySelector('.intro').remove();
				}
				player.chooseButton(dialog,true);
				"step 1"
				if(result.bool){
					game.restorePlayer(result.links[0]);
					game.delay();
				}
				else{
					event.finish();
				}
				"step 2"
				game.swapPlayer(result.links[0]);
				result.links[0].hp=1;
				result.links[0].update();
				result.links[0].storage.lianyao_hujia=player;
				game.swapPlayer(result.links[0]);
				result.links[0].addSkill('lianyao_hujia2');
				result.links[0].phase();
				result.links[0].setIdentity();
				result.links[0].identityShown=true;
				player.out(true);
			}
		},
		lianyao_hujia2:{
			trigger:{player:['phaseAfter','changeHp']},
			forced:true,
			popup:false,
			content:function(){
				player.hp=1;
				player.update();
				var me=player.storage.lianyao_hujia;
				delete player.storage.lianyao_hujia;
				me.lockOut=false;
				me.out();
				player.removeSkill('lianyao_hujia2');
				if(player==game.me){
					game.swapPlayer(me);
					game.removePlayer(player);
					game.delay();
				}
			}
		}
	},
	translate:{
		donghuangzhong:'东皇钟',
		xuanyuanjian:'轩辕剑',
		xuanyuanjian2:'轩辕剑',
		pangufu:'盘古斧',
		lianyaohu:'炼妖壶',
		haotianta:'昊天塔',
		fuxiqin:'伏羲琴',
		shennongding:'神农鼎',
		kongdongyin:'崆峒印',
		//kunlunjing:'昆仑镜',
		//kunlunjing1:'昆仑镜',
		nvwashi:'女娲石',
		donghuangzhong_bg:'钟',
		lianyaohu_bg:'壶',
		haotianta_bg:'塔',
		fuxiqin_bg:'琴',
		shennongding_bg:'鼎',
		kongdongyin_bg:'印',
		kunlunjing_bg:'镜',
		nvwashi_bg:'石',
		kongxin:'控心',
		lianhua:'炼化',
		lianhua_info:'出牌阶段限一次，你可以弃置两张炼妖壶中的牌，从牌堆中获得一张与弃置的牌类别均不相同的牌',
		shouna:'收纳',
		shouna_info:'当一名其他角色于回合外弃置的卡牌进入弃牌堆后，你可以选择其中的一张放入炼妖壶，每名角色的回合限一次',
		// donghuangzhong_info:'出牌阶段，你可以将一名已死亡角色永久移出游戏，然后回复一点体力，或创建一名与你身份相同的新角色，然后流失X点体力，X为新角色的体力上限',
		// xuanyuanjian_info:'锁定技，你使用的杀无视距离，可以额外指定一个目标，每当你造成一次伤害，有50％的机率使伤害加一并变为雷属性。任何时候，若你体力值不超过2，则立即失去轩辕剑',
		pangufu_info:'锁定技，每当你造成一次伤害，受伤角色须弃置一张牌',
		// haotianta_info:'任意一名角色进行判定前，你可以亮出牌堆顶的9张牌，并选择一张作为判定结果，此结果不可被更改，也不能触发技能',
		shennongding_info:'出牌阶段，你可以弃置两张手牌，然后回复一点体力。每阶段限一次',
		kongdongyin_info:'令你抵挡一次死亡，将体力回复至1，并摸一张牌，发动后进入弃牌堆',
		//kunlunjing_info:'回合开始前，你可以令场上所有牌还原到你上一回合结束后的位置，然后流失一点体力',
		nvwashi_info:'意一名角色濒死时，你可以令其进行一次判定，若结果为红桃，其回复一点体力',
		kongxin_info:'出牌阶段限一次，你可以与一名其他角色进行拼点，若你赢，你可以指定另一名角色视为对方对该角色使用一张杀，否则对方可弃置你一张牌',
		fuxiqin_info:'出牌阶段限一次，你可以与一名其他角色进行拼点，若你赢，你可以指定另一名角色视为对方对该角色使用一张杀，否则对方可弃置你一张牌',
		lianyaohu_info:'当一名其他角色于回合外弃置的卡牌进入弃牌堆后，你将其放入炼妖壶（每回合只发动一次）；出牌阶段限一次，你可以弃置两张炼妖壶中的牌，从牌堆中获得一张与弃置的牌类别均不相同的牌',
		// fuxiqin_info:'出牌阶段，你可以选择一名角色并流失X点体力，然后获得其控制权直到其首次进入濒死状态，X为该角色当前的体力值',
		// fuxiqin_info:'',
	},
	list:[
		// ['diamond',13,'donghuangzhong'],
		['diamond',13,'fuxiqin'],
		// ['spade',13,'kunlunjing'],
		// ['spade',13,'xuanyuanjian'],
		['spade',13,'pangufu'],
		['club',13,'lianyaohu'],
		// ['diamond',13,'haotianta'],
		['club',13,'shennongding'],
		['heart',13,'nvwashi'],
		['heart',13,'kongdongyin'],
	],
}
