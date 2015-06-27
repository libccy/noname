'use strict';
character.hearth={
	character:{
		hs_jaina:['female','wei',3,['huopu','bianxing','bingjia'],['fullskin']],
		hs_rexxar:['male','qun',4,['shoulie','gongji'],['fullskin']],
		hs_uther:['male','qun',4,['fengxian','jieming'],['fullskin']],
		hs_garrosh:['male','qun',4,['zhanhou','qiangxi'],['fullskin']],
		hs_malfurion:['male','wu',4,['jihuo'],['fullskin']],
		hs_guldan:['male','qun',3,['fenliu','hongxi'],['fullskin']],
		hs_anduin:['male','qun',3,['shengguang','shijie','anying'],['fullskin']],
		hs_thrall:['male','wu',4,['tuteng','tzhenji'],['fullskin']],
		hs_waleera:['female','qun',3,['jianren','mengun','wlianji'],['fullskin']],

		hs_medivh:['male','wei',3,['jingxiang','moying','mdzhoufu'],['fullskin']],
		hs_alleria:['male','wu',3,['fengxing','qiaodong','liegong'],['fullskin']],
		hs_magni:['male','qun',4,['zhongjia','dunji'],['fullskin']],
	},
	skill:{
		zhongjia:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				player.changeHujia();
			},
			ai:{
				nohujia:true,
				skillTagFilter:function(player){
					return player.hp>1;
				},
				threaten:function(player,target){
					if(!target.hujia) return 0.8;
				},
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.skills.contains('jueqing')) return [1,-1];
							return 0.8;
						}
					}
				}
			}
		},
		dunji:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.hujia?true:false;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			selectTarget:function(){
				return [1,_status.event.player.hujia];
			},
			content:function(){
				if(target==targets[0]){
					player.changeHujia(-player.hujia);
				}
				target.damage();
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target)+0.5;
					}
				}
			}
		},
		fengxing:{
			trigger:{player:['useCard','respondAfter']},
			frequent:true,
			filter:function(event){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				player.draw();
			}
		},
		fengxian:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target.num('h')>0;
			},
			selectTarget:-1,
			content:function(){
				target.chooseToDiscard(true);
			},
			ai:{
				order:8,
				result:{
					target:function(player,target){
						var nh=target.num('h');
						switch(nh){
							case 0:return 0;
							case 1:return -1.5;
							case 2:return -1.3;
							case 3:return -1;
							default:return -0.8;
						}
					}
				}
			}
		},
		qiaodong:{
			enable:['chooseToRespond'],
			filterCard:{type:'equip'},
			viewAs:{name:'shan'},
			position:'he',
			prompt:'将一张装备牌当闪使用或打出',
			check:function(){return 1},
			ai:{
				respondShan:true,
				skillTagFilter:function(player){
					if(!player.num('he',{type:'equip'})) return false;
				}
			}
		},
		zhanhou:{
			init:function(player){
				player.forcemin=true;
			},
			enable:'phaseUse',
			filterCard:{type:'equip'},
			check:function(){
				return 1;
			},
			content:function(){
				player.changeHujia();
			},
			ai:{
				order:2,
				result:{
					player:1
				}
			},
			mod:{
				globalFrom:function(from,to,distance){
					return distance-from.hujia;
				}
			},
		},
		shijie:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				player.chooseTarget('是否发动【视界】',function(card,player,target){
					return player!=target&&target.num('h')>0;
				}).ai=function(target){
					return 11-ai.get.attitude(player,target);
				};
				'step 1'
				if(result.bool){
					player.logSkill('shijie',result.targets);
					var target=result.targets[0];
					player.gain(target.get('h').randomGet());
					event.target=target;
					target.$give(1,player);
					game.delay();
					event.target.draw();
				}
			},
			ai:{
				expose:0.1
			}
		},
		shengguang:{
			enable:'phaseUse',
			filterCard:{color:'red'},
			filter:function(event,player){
				return player.num('he',{color:'red'})>0;
			},
			position:'he',
			usable:1,
			check:function(card){
				return 9-ai.get.value(card)
			},
			filterTarget:function(card,player,target){
				if(player.storage.anying) return true;
				if(target.hp>=target.maxHp) return false;
				return true;
			},
			content:function(){
				'step 0'
				if(player.storage.anying){
					target.loseHp();
					event.finish();
				}
				else{
					target.recover();
				}
				'step 1'
				if(target.hp<target.maxHp){
					target.draw();
				}
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(player.storage.anying) return -1;
						if(target.hp==1) return 5;
						if(player==target&&player.num('h')>player.hp) return 5;
						return 2;
					}
				},
				threaten:2,
				expose:0.2
			}
		},
		xinci:{
			enable:'phaseUse',
			filterCard:{color:'black'},
			filter:function(event,player){
				return player.num('he',{color:'black'})>0;
			},
			position:'he',
			usable:1,
			mark:true,
			intro:{
				content:'已进入暗影形态'
			},
			check:function(card){
				return 9-ai.get.value(card)
			},
			filterTarget:true,
			content:function(){
				target.loseHp();
			},
			ai:{
				order:9,
				result:{
					target:-1
				},
				threaten:2,
				expose:0.2
			}
		},
		anying:{
			unique:true,
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.anying&&player.num('he',{color:'black'})>1;
			},
			selectCard:2,
			filterCard:{color:'black'},
			position:'he',
			check:function(card){
				return 5-ai.get.value(card);
			},
			content:function(){
				player.storage.anying=true;
				player.removeSkill('shengguang');
				player.addSkill('xinci');
			},
			ai:{
				order:1,
				result:{
					player:1
				}
			}
		},
		bianxing:{
			trigger:{global:'useCard'},
			filter:function(event,player){
				if(player.skills.contains('bianxing2')) return false;
				if(event.player==player) return false;
				if(_status.currentPhase!=event.player) return false;
				if(!event.targets) return false;
				if(event.targets.length!=1) return false;
				var hs=player.get('h');
				for(var i=0;i<hs.length;i++){
					if(hs[i].name!=event.card.name){
						if(lib.filter.filterTarget(hs[i],event.player,event.targets[0])){
							var select=get.select(get.info(hs[i]).selectTarget);
							if(select[0]<=1&&select[1]>=1){
								return true;
							}
						}
					}
				}
				return false;
			},
			direct:true,
			content:function(){
				'step 0'
				var eff=ai.get.effect(trigger.targets[0],trigger.card,trigger.player,player);
				var att=ai.get.attitude(player,trigger.player);
				player.chooseCard('是否发动【变形】？',function(card){
					if(card.name!=trigger.card.name&&
						lib.filter.filterTarget(card,trigger.player,trigger.targets[0])){
						var select=get.select(get.info(card).selectTarget);
						if(select[0]<=1&&select[1]>=1){
							return true;
						}
					}
					return false;
				}).ai=function(card){
					if(att>=0) return 0;
					return ai.get.effect(trigger.targets[0],card,trigger.player,player)-eff;
				};
				'step 1'
				if(result.bool){
					var card=result.cards[0];
					player.lose(result.cards);
					event.cards=result.cards;
					player.logSkill('bianxing',trigger.player);
					game.delay(0.5);
					trigger.untrigger();
					trigger.card=card;
					trigger.cards=[card];
					player.addTempSkill('bianxing2','phaseAfter');
				}
				else{
					event.finish();
				}
				'step 2'
				player.$throw(event.cards);
				game.delay();
				trigger.trigger('useCard');
			},
			ai:{
				expose:0.2,
				threaten:1.8
			}
		},
		bingjia:{
			enable:'phaseUse',
			filter:function(event,player){
				return !player.skills.contains('bingjia2');
			},
			filterCard:{color:'black'},
			check:function(card){
				return 6-ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player){
				player.$give(1,player);
			},
			content:function(){
				player.storage.bingjia=cards[0];
				player.addSkill('bingjia2');
			},
			ai:{
				order:1,
				result:{
					player:1
				}
			}
		},
		bingjia2:{
			mark:true,
			trigger:{target:'useCardToBegin'},
			forced:true,
			filter:function(event,player){
				return event.player!=player&&event.card.number==player.storage.bingjia.number;
			},
			content:function(){
				'step 0'
				player.showCards([player.storage.bingjia],get.translation(player)+'发动了【冰甲】');
				'step 1'
				ui.discardPile.appendChild(player.storage.bingjia);
				delete player.storage.bingjia;
				player.changeHujia(2);
				player.removeSkill('bingjia2');
			},
			intro:{
				mark:function(dialog,content,player){
					if(player==game.me||player.isUnderControl()){
						dialog.add([player.storage.bingjia]);
					}
					else{
						return '已发动冰甲';
					}
				},
				content:function(content,player){
					if(player==game.me||player.isUnderControl()){
						return get.translation(player.storage.bingjia);
					}
					return '已发动冰甲';
				}
			}
		},
		bianxing2:{},
		moying:{
			trigger:{player:'phaseBegin'},
			filter:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].num('j','shandian')){
						return false;
					}
				}
				return true;
			},
			forced:true,
			check:function(){
				return false;
			},
			content:function(){
				'step 0'
				var card=null;
				for(var i=0;i<ui.cardPile.childNodes.length;i++){
					if(ui.cardPile.childNodes[i].name=='shandian'){
						card=ui.cardPile.childNodes[i];break;
					}
				}
				if(!card){
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						if(ui.discardPile.childNodes[i].name=='shandian'){
							card=ui.discardPile.childNodes[i];break;
						}
					}
				}
				if(card){
					player.addJudge(card);
				}
				'step 1'
				game.delay();
			},
			ai:{
				threaten:1.5
			}
		},
		mdzhoufu:{
			enable:'phaseUse',
			filterCard:{color:'black'},
			filter:function(event,player){
				return player.num('h',{color:'black'})>0;
			},
			filterTarget:function(card,player,target){
				return player!=target&&!target.skills.contains('mdzhoufu2');
			},
			prepare:function(cards,player){
				player.$throw(cards);
			},
			discard:false,
			content:function(){
				target.$gain2(cards);
				target.storage.mdzhoufu2=cards[0];
				target.addSkill('mdzhoufu2');
				target.storage.mdzhoufu3=player;
				ui.special.appendChild(cards[0]);
			},
			check:function(card){
				return 3-ai.get.value(card)
			},
			ai:{
				expose:0.1,
				order:1,
				result:{
					player:1
				}
			}
		},
		mdzhoufu2:{
			trigger:{player:'judge'},
			forced:true,
			priority:10,
			mark:'card',
			content:function(){
				"step 0"
				ui.discardPile.appendChild(player.storage.mdzhoufu2);
				player.$throw(player.storage.mdzhoufu2);
				if(player.storage.mdzhoufu3.isAlive()){
					player.storage.mdzhoufu3.draw();
				}
				else{
					game.delay(1.5);
				}
				"step 1"
				player.judging=player.storage.mdzhoufu2;
				trigger.position.appendChild(player.storage.mdzhoufu2);
				// trigger.untrigger();
				game.log(get.translation(player)+'的判定牌改为'+get.translation(player.storage.mdzhoufu2));
				player.removeSkill('mdzhoufu2');
				delete player.storage.mdzhoufu2;
				delete player.storage.mdzhoufu3;
			},
			intro:{
				content:'card'
			},
		},
		moying_old:{
			trigger:{player:'damageEnd',source:'damageEnd'},
			check:function(event,player){
				var target=(player==event.player)?event.source:event.player;
				return ai.get.attitude(player,target)<0;
			},
			filter:function(event,player){
				var target=(player==event.player)?event.source:event.player;
				return target.isAlive();
			},
			prompt:function(event,player){
				var target=(player==event.player)?event.source:event.player;
				return '是否对'+get.translation(target)+'发动【魔影】？';
			},
			content:function(){
				"step 0"
				event.target=(player==trigger.player)?trigger.source:trigger.player;
				event.target.judge(function(card){
					return get.color(card)=='black'?-1:0;
				});
				"step 1"
				if(result.color=='black'){
					event.target.loseHp();
				}
			},
			ai:{
				expose:0.1,
				threaten:1.3
			}
		},
		xianzhi:{
			trigger:{global:'judgeBegin'},
			direct:true,
			filter:function(){
				return ui.cardPile.childNodes.length>1;
			},
			content:function(){
				'step 0'
				var str='';
				if(trigger.card) str=get.translation(trigger.card.viewAs||trigger.card.name);
				else if(trigger.skill) str=get.translation(trigger.skill);
				else str=get.translation(trigger.parent.name);

				var cards=[ui.cardPile.childNodes[0],ui.cardPile.childNodes[1]];
				var att=ai.get.attitude(player,trigger.player);
				var delta=trigger.judge(ui.cardPile.childNodes[1])-trigger.judge(ui.cardPile.childNodes[0]);
				player.chooseControl('调换顺序','cancel',
				ui.create.dialog('先知：'+get.translation(trigger.player)+'的'+str+'判定',cards,'hidden')).ai=function(){
					if(att*delta>0) return '调换顺序';
					else return 'cancel';
				};
				'step 1'
				if(result.control=='调换顺序'){
					player.logSkill('xianzhi');
					var card=ui.cardPile.firstChild;
					ui.cardPile.removeChild(card);
					ui.cardPile.insertBefore(card,ui.cardPile.firstChild.nextSibling);
					game.log(get.translation(player)+'调换了牌堆顶两张牌的顺序');
				}
			},
			ai:{
				expose:0.1,
				tag:{
					rejudge:0.5
				}
			}
		},
		jingxiang:{
			trigger:{player:'chooseToRespondBegin'},
			direct:true,
			filter:function(event,player){
				if(event.responded) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				var players=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')){
						players.push(game.players[i]);
					}
				}
				if(!players.length){
					event.finish();
					return;
				}
				var target=players.randomGet();
				event.target=target;
				var cards=target.get('h');
				player.chooseCardButton('镜像：选择'+get.translation(target)+'的一张卡手牌打出',cards).filterButton=function(button){
					return trigger.filterCard(button.link);
				}
				"step 1"
				if(result.bool){
					player.logSkill('jingxiang',event.target);
					event.target.lose(result.links);
					trigger.untrigger();
					trigger.responded=true;
					result.buttons[0].link.remove();
					trigger.result={bool:true,card:result.buttons[0].link}
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,effect){
						if(get.tag(card,'respondShan')) return 0.7;
						if(get.tag(card,'respondSha')) return 0.7;
					}
				}
			},
		},
		wlianji:{
			trigger:{player:'phaseEnd'},
			frequent:true,
			filter:function(event,player){
				return get.cardCount(true,player)>player.hp;
			},
			content:function(){
				player.draw(2);
			},
			init:function(player){player.storage.jingce=true},
			intro:{
				content:function(storage,player){
					if(_status.currentPhase==player) return '已使用'+get.cardCount(true,player)+'张牌';
				}
			}
		},
		mengun:{
			trigger:{global:'useCardToBefore'},
			priority:12,
			filter:function(event,player){
				if(event.player==player) return false;
				if(_status.currentPhase!=event.player) return false;
				if(event.player.skills.contains('mengun2')) return false;
				if(get.itemtype(event.card)!='card') return false;
				if(!player.num('h',{suit:get.suit(event.card)})) return false;
				return get.type(event.card)=='basic';
			},
			direct:true,
			content:function(){
				"step 0"
				var val=ai.get.value(trigger.card);
				var suit=get.suit(trigger.card);
				var eff=ai.get.effect(trigger.target,trigger.card,trigger.player,player);
				player.chooseToDiscard('是否对'+get.translation(trigger.player)+'使用的'+get.translation(trigger.card)+'发动【闷棍】？',function(card){
					return get.suit(card)==suit;
				}).ai=function(card){
					if(eff>=0) return 0;
					return Math.min(8,1+val)-ai.get.value(card);
				}
				"step 1"
				if(result.bool){
					player.logSkill('mengun',trigger.player);
					game.log(get.translation(trigger.player)+'收回了'+get.translation(trigger.cards));
					trigger.untrigger();
					trigger.finish();
					game.delay();
				}
				"step 2"
				trigger.player.$gain2(trigger.cards);
				trigger.player.gain(trigger.cards);
				trigger.player.storage.mengun2=trigger.cards[0];
				trigger.player.addTempSkill('mengun2','phaseEnd');
			}
		},
		mengun2:{
			mark:'card',
			mod:{
				cardEnabled:function(card,player){
					if(card==player.storage.mengun2) return false;
				},
			},
			intro:{
				content:'card',
				onunmark:function(storage,player){
					delete player.storage.mengun2;
				}
			},
		},
		jianren:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.get('e','1')?true:false;
			},
			filterCard:function(card,player){
				return card==player.get('e','1');
			},
			position:'e',
			filterTarget:function(card,player,target){
				return target!=player;
			},
			selectCard:-1,
			selectTarget:-1,
			content:function(){
				target.damage();
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target);
					}
				}
			}
		},
		jihuo:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return !player.storage.jihuo&&player.num('h')>0;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseToDiscard('是否发动【激活】？').ai=ai.get.unuseful2;
				"step 1"
				if(result.bool){
					player.logSkill('jihuo');
					player.storage.jihuo=true;
				}
				else{
					event.finish();
				}
				"step 2"
				player.phase();
				"step 3"
				player.storage.jihuo=false;
			},
			ai:{
				threaten:1.2
			}
		},
		tzhenji:{
			trigger:{player:'discardAfter'},
			direct:true,
			filter:function(event){
				if(event.cards){
					for(var i=0;i<event.cards.length;i++){
						if(get.color(event.cards[i])=='black') return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0";
				player.chooseTarget('是否发动【震击】？').ai=function(target){
					var eff=ai.get.damageEffect(target,player,player,'thunder');
					if(eff>0){
						return eff+(target.num('he')?1:0);
					}
					return 0;
				};
				"step 1"
				if(result.bool){
					game.delay(0.5);
					var target=result.targets[0];
					player.logSkill('tzhenji',target,'thunder');
					target.damage('thunder',0);
					var cs=target.get('he');
					if(cs.length){
						target.discard(cs.randomGet());
					}
				}
			},
			ai:{
				threaten:1.2,
				expose:0.3,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'loseCard')&&target.num('he')){
							return 0.7;
						}
					}
				},
			}
		},
		tzhenji_old:{
			trigger:{player:['useCard','respondEnd']},
			filter:function(event){
				return get.suit(event.card)=='spade';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget('是否发动【震击】？').ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder')-1;
				};
				"step 1"
				if(result.bool){
					player.logSkill('tzhenji',result.targets,'thunder');
					event.target=result.targets[0];
					event.target.judge();
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.color=='red'){
					event.target.damage('fire');
				}
				else{
					event.target.damage('thunder');
					var cs=event.target.get('he');
					if(cs.length){
						event.target.discard(cs.randomGet());
					}
					cs=player.get('he');
					if(cs.length){
						player.discard(cs.randomGet());
					}
				}
			},
			ai:{
				expose:0.2,
				threaten:1.2,
				effect_old:{
					target:function(card,player,target){
						if(get.tag(card,'respondShan')){
							var hastarget=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0){
									hastarget=true;break;
								}
							}
							var ns=target.num('h','shan');
							var nh=target.num('h');
							if(ns>1){
								return [0,hastarget?1:0];
							}
							if(ns&&nh>=2){
								return [0,0];
							}
							if(nh>3){
								return [0,0];
							}
							if(nh==0){
								return 1.5;
							}
							return [1,0.05];
						}
					}
				}
			}
		},
		tuteng_s:{
			trigger:{player:'phaseUseBegin'},
			forced:true,
			filter:function(event,player){
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					rand.remove(player.skills[i]);
					if(rand.length==0) return false;
				}
				return true;
			},
			content:function(){
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					rand.remove(player.skills[i]);
				}
				if(rand.length){
					player.addSkill(rand.randomGet());
				}
			},
			ai:{
				effect:function(card,player){
					if(get.tag(card,'damage')){
						if(player.skills.contains('jueqing')) return [1,1];
						return 1.2;
					}
				},
				threaten:1.3
			},
			group:'tuteng_lose'
		},
		tuteng:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			filter:function(event,player){
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					rand.remove(player.skills[i]);
					if(rand.length==0) return false;
				}
				return true;
			},
			position:'he',
			content:function(){
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					rand.remove(player.skills[i]);
				}
				if(rand.length){
					player.addSkill(rand.randomGet());
				}
			},
			ai:{
				order:9,
				result:{
					player:1
				},
				effect:function(card,player){
					if(get.tag(card,'damage')){
						if(player.skills.contains('jueqing')) return [1,1];
						return 1.2;
					}
				},
				threaten:1.3
			},
			group:'tuteng_lose'
		},
		tuteng_lose:{
			trigger:{player:'damageEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				var tuteng=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					if(tuteng.contains(player.skills[i])) return true;
				}
				return false;
			},
			content:function(){
				var tuteng=['tuteng1','tuteng2','tuteng3','tuteng4'];
				var rand=[];
				for(var i=0;i<player.skills.length;i++){
					if(tuteng.contains(player.skills[i])){
						rand.push(player.skills[i]);
					}
				}
				if(rand.length){
					player.removeSkill(rand.randomGet());
				}
			}
		},
		tuteng1:{
			mark:'image',
			intro:{
				content:'回合结束阶段，你回复一点体力'
			},
			trigger:{player:'phaseEnd'},
			forced:true,
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				player.recover();
			}
		},
		tuteng2:{
			mark:'image',
			intro:{
				content:'每当你造成一次伤害，你摸一张牌'
			},
			filter:function(event){
				return event.num>0;
			},
			trigger:{source:'damageAfter'},
			forced:true,
			content:function(){
				player.draw();
			}
		},
		tuteng3:{
			mark:'image',
			intro:{
				content:'你受到的伤害-1'
			},
			trigger:{player:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				trigger.num--;
			},
		},
		tuteng4:{
			mark:'image',
			intro:{
				content:'你的属性伤害+1'
			},
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.nature?true:false;
			},
			content:function(){
				trigger.num++;
			}
		},
		fenliu:{
			enable:'phaseUse',
			prompt:'流失1点体力并摸两张牌',
			usable:1,
			content:function(){
				"step 0"
				player.loseHp(1);
				"step 1"
				player.draw(3);
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						if(player.num('h')>=player.hp-1) return -1;
						if(player.hp<3) return -1;
						return 1;
					}
				},
				effect:{
					target:function(card){
						if(get.tag(card,'damage')||get.tag(card,'loseHp')){
							return 1.5;
						}
					}
				},
				threaten:1.2
			}
		},
		hongxi:{
			trigger:{global:'dieAfter'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			forced:true,
			content:function(){
				player.recover(player.maxHp-player.hp);
			},
			ai:{
				threaten:1.2
			}
		},
	},
	card:{
		tuteng1:{
			image:'card/tuteng1',
		},
		tuteng2:{
			image:'card/tuteng2',
		},
		tuteng3:{
			image:'card/tuteng3',
		},
		tuteng4:{
			image:'card/tuteng4',
		}
	},
	translate:{
		hs_alleria:'奥蕾莉亚',
		hs_magni:'麦格尼',
		hs_medivh:'麦迪文',
		hs_jaina:'吉安娜',
		hs_rexxar:'雷克萨',
		hs_uther:'乌瑟尔',
		hs_garrosh:'加尔鲁什',
		hs_malfurion:'玛法里奥',
		hs_guldan:'古尔丹',
		hs_anduin:'安度因',
		hs_thrall:'萨尔',
		hs_waleera:'瓦莉拉',

		fengxing:'风行',
		fengxing_info:'每当你使用或打出一张杀，你可以摸一张牌',
		xinci:'心刺',
		xinci_info:'出牌阶段限一次，你可以弃置一张黑色牌令一名角色流失一点体力',
		zhongjia:'重甲',
		zhongjia_info:'锁定技，每当你受到一次伤害，你获得一点护甲值；当你的体力值大于1时，你的护甲不为你抵挡伤害',
		dunji:'盾击',
		dunji_info:'出牌阶段限，你可以失去你的所有护甲，并对等量的其他角色各造成一点伤害',
		qiaodong:'巧动',
		qiaodong_info:'你可以将一张装备牌当作当使用或打出',
		fengxian:'奉献',
		fengxian_info:'出牌阶段限一次，你可以令场上所有角色各弃置一张手牌',
		zhanhou:'战吼',
		zhanhou_info:'锁定技，你没有装备区，你可以弃置一张装备牌并获得一点护甲值；每有一点护甲值，你与其他角色的距离-1',
		anying:'暗影',
		anying_info:'限定技，出牌阶段，你可以弃置两张黑色牌，失去技能圣光，并获得技能心刺',
		shijie:'视界',
		shijie_info:'回合结束阶段，你可以获得一名其他角色的一张手牌，然后该角色摸一张牌',
		shengguang:'圣光',
		shengguang_info:'出牌阶段限一次，你可以弃置一张红色牌令一名角色回复一点体力，若其仍处于受伤状态则摸一张牌',
		bingjia:'冰甲',
		bingjia2:'冰甲',
		bingjia_info:'出牌阶段，若你武将牌上没有牌，你可以将一张黑色手牌背面朝上置于你的武将牌上，当你成为其他角色的与此牌点数相同的牌的目标时，你将此牌置于弃牌堆，并获得两点护甲值',
		bianxing:'变形',
		bianxing_info:'当一其他角色于回合内使用卡牌指定了惟一目标后，你可以用一张与之不同名的手牌替代此牌（使用者及目标必须合理），每名角色的回合限一次',
		xianzhi:'先知',
		xianzhi_info:'任意一名角色进行判定前，你可以观看牌堆顶的两张牌，并可以将其调换顺序',
		mdzhoufu:'诅咒',
		mdzhoufu_info:'出牌阶段，你可以将一张黑色手牌置于一名其他角色的武将牌上，在其判定时以此牌作为判定结果；当受此技能影响的角色进行判定时，你摸一张牌',
		moying:'魔影',
		moying_info:'锁定技，回合开始阶段，若场上没有闪电，你将牌堆中的一张闪电置于你的判定区',
		moying_old_info:'每当你造成或受到一次伤害，你可以令伤害目标或来源进行一次判定，若结果为黑色，其流失一点体力',
		jingxiang:'镜像',
		jingxiang_info:'每当你需要打出卡牌时，你可以观看一名随机角色的手牌并将其视为你的手牌打出',
		tuteng:'图腾',
		tuteng_info:'出牌阶段限一次，你可以弃置一张牌并随机获得一个图腾；每当你受到一次伤害，你随机失去一个图腾',
		tuteng1:'治疗图腾',
		tuteng2:'灼热图腾',
		tuteng3:'石爪图腾',
		tuteng4:'空气之怒图腾',
		tzhenji:'震击',
		tzhenji_info:'每当你因弃置而失去黑色牌，可对一名角色造成0点雷电伤害，然后随机弃置其一张牌',
		fenliu:'分流',
		fenliu_info:'出牌阶段限一次，你可以失去一点体力并获得3张牌',
		hongxi:'虹吸',
		hongxi_info:'锁定技，每当有一名角色死亡，你将体力回复至体力上限',
		jihuo:'激活',
		jihuo_info:'回合结束阶段，你可以弃置一张手牌并进行一个额外的回合',
		jianren:'剑刃',
		jianren_info:'出牌阶段限一次，你可以弃置装备区内的武器牌，对所有其他角色造成一点伤害',
		mengun:'闷棍',
		mengun2:'闷棍',
		mengun_info:'每当一名其他角色于回合内使用基本牌，你可以弃置一张与之花色相同的牌令其收回此牌，且在本回合内不能再次使用，每回合限一次',
		wlianji:'连击',
		wlianji_info:'回合结束阶段，若你本回合使用的卡牌数大于你当前的体力值，你可以摸两张牌',
	},
}
