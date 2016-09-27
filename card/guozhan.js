'use strict';
card.guozhan={
	connect:true,
	card:{
		yuxi:{
			mode:['guozhan'],
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['yuxi_skill'],
			ai:{
				equipValue:9
			}
		},
		xietianzi:{
			fullskin:true,
			type:'trick',
			lianheng:true,
			enable:function(card,player){
				if(get.mode()=='guozhan'&&!player.isMajor()) return false;
				return _status.event.getParent().name=='phaseUse';
			},
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			content:function(){
				var evt=_status.event;
				for(var i=0;i<10;i++){
					if(evt&&evt.getParent){
						evt=evt.getParent();
					}
					if(evt.name=='phaseUse'){
						evt.skipped=true;
						break;
					}
				}
				target.addSkill('xietianzi');
			},
			ai:{
				order:0.5,
				value:4,
				useful:2,
				result:{
					target:function(player,target){
						if(target.num('he')>=2) return 1;
						return 0;
					}
				}
			}
		},
		shuiyanqijunx:{
			fullskin:true,
			type:'trick',
			filterTarget:function(card,player,target){
				return target!=player&&target.num('e')>0;
			},
			enable:true,
			content:function(){
				'step 0'
				target.chooseControl('discard_card','take_damage',function(event,player){
					if(ai.get.damageEffect(player,event.player,player,'thunder')>=0){
						return 'take_damage';
					}
					if(player.hp>=3&&player.num('e')>=2){
						return 'take_damage';
					}
					return 'discard_card';
				});
				'step 1'
				if(result.control=='discard_card'){
					target.discard(target.get('e'));
				}
				else{
					target.damage('thunder');
				}
			},
			ai:{
				order:7,
				value:4,
				useful:2,
				tag:{
					damage:1,
					thunderDamage:1,
					natureDamage:1
				},
				result:{
					target:function(player,target){
						return -target.num('e');
					}
				}
			}
		},
		lulitongxin:{
			fullskin:true,
			type:'trick',
			enable:function(card,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMajor()) return true;
				}
				return false;
			},
			mode:['guozhan'],
			filterTarget:true,
			chongzhu:true,
			changeTarget:function(player,targets){
				var target=targets[0];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMajor()==target.isMajor()&&game.players[i]!=target){
						targets.push(game.players[i]);
					}
				}
			},
			content:function(){
				if(target.isLinked()){
					target.draw();
				}
				else{
					target.link();
				}
			},
			ai:{
				order:7.5,
				value:4,
				useful:2,
				wuxie:function(){
					return 0;
				},
				result:{
					player:function(player,target){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(target.isMajor()==game.players[i].isMajor()){
								if(game.players[i].isLinked()){
									num+=ai.get.attitude(player,target);
								}
								else{
									num-=ai.get.attitude(player,target)*0.8;
								}
							}
						}
						return num;
					}
				}
			}
		},
		lianjunshengyan:{
			fullskin:true,
			type:'trick',
			enable:function(card,player){
				return !player.isUnseen();
			},
			mode:['guozhan'],
			filterTarget:function(card,player,target){
				return target.identity!='unknown'&&(target.identity!=player.identity||target.identity=='ye');
			},
			changeTarget:function(player,targets){
				var target=targets[0];
				targets.push(player);
				if(target.identity!='ye'){
					for(var i=0;i<game.players.length;i++){
						if(target!=game.players[i]&&target.identity==game.players[i].identity){
							targets.push(game.players[i]);
						}
					}
				}
			},
			content:function(){
				'step 0'
				if(target==player){
					target.draw(targets.length-1);
					event.finish();
				}
				else if(target.hp==target.maxHp){
					event.directdraw=true;
				}
				else{
					target.chooseControl('draw_card','recover_hp',function(event,target){
						if(target.hp>=2||target.hp>=target.maxHp-1) return 'draw_card';
						if(target.hp==2&&target.num('h')==0) return 'draw_card';
						return 'recover_hp';
					});
				}
				'step 1'
				if(!event.directdraw&&result&&result.control=='recover_hp'){
					target.recover();
					event.finish();
				}
				else{
					target.draw();
				}
				'step 2'
				if(target.isLinked()){
					target.link();
				}
			},
			ai:{
				order:3,
				value:4,
				useful:2,
				result:{
					player:0.8,
					target:1
				}
			}
		},
		chiling:{
			fullskin:true,
			type:'trick',
			enable:true,
			mode:['guozhan'],
			filterTarget:function(card,player,target){
				return target.isUnseen();
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				if(target.num('he',{type:'equip'})){
					target.chooseControl('选项一','选项二','选项三',function(){
						return Math.random()<0.5?'选项一':'选项二';
					}).set('prompt','敕令<br><br><div class="text">选项一：明置一张武将牌，然后摸一张牌</div><br><div class="text">选项二：失去1点体力</div><br><div class="text">选项三：弃置一张装备牌</div>');
				}
				else{
					target.chooseControl('选项一','选项二',function(){
						if(_status.event.player.hp>=3&&Math.random()<=0.3){
							return '选项二';
						}
						return '选项一';
					}).set('prompt','敕令<br><br><div class="text">选项一：明置一张武将牌，然后摸一张牌</div><br><div class="text">选项二：失去1点体力</div>');
				}
				'step 1'
				if(result.control=='选项一'){
					target.showCharacter(2);
					target.draw();
				}
				else if(result.control=='选项二'){
					target.loseHp();
				}
				else{
					target.chooseToDiscard('he',{type:'equip'},true);
				}
			},
			ai:{
				order:6,
				result:{
					target:-1
				}
			}
		},
		diaohulishan:{
			fullskin:true,
			type:'trick',
			lianheng:true,
			enable:true,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				target.addTempSkill('diaohulishan','phaseAfter');
			},
			ai:{
				order:10,
				value:4,
				useful:2,
				wuxie:function(){
					return 0;
				},
				result:{
					player:function(player,target){
						if(target.hp==1) return 0;
					},
					target:function(player,target){
						if(target.hp==1) return 0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]==target) continue;
							if(ai.get.attitude(player,game.players[i])<=ai.get.attitude(player,target)){
								if(target==player.next||target==player.previous){
									return -1.5;
								}
								return -1;
							}
						}
						return 0;
					}
				}
			}
		},
		huxinjing:{
			lianheng:true,
			fullskin:true,
			type:"equip",
			subtype:"equip2",
			skills:['huxinjing'],
			ai:{
				basic:{
					equipValue:6
				},
			},
		},
		huoshaolianying:{
			fullskin:true,
			type:'trick',
			lianheng:true,
			filterTarget:function(card,player,target){
				if(get.mode()=='guozhan'){
					var next=player.getNext();
					return target==next||target.inline(next);
				}
				if(player==target) return false;
				var link=false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isLinked()&&game.players[i]!=player){
						link=true;break;
					}
				}
				if(link){
					if(!target.isLinked()) return false;
					var distance=get.distance(player,target,'absolute');
					for(var i=0;i<game.players.length;i++){
						if(target!=game.players[i]&&
							game.players[i]!=player&&
							game.players[i].isLinked()){
							if(get.distance(player,game.players[i],'absolute')<distance){
								return false;
							}
							if(get.distance(player,game.players[i],'absolute')==distance&&
								parseInt(game.players[i].dataset.position)<parseInt(target.dataset.position)){
								return false;
							}
						}
					}
					return true;
				}
				else{
					var dist=get.distance(player,target);
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=player&&get.distance(player,game.players[i])<dist) return false;
					}
					return true;
				}
			},
			enable:true,
			selectTarget:-1,
			content:function(){
				target.damage('fire');
			},
			ai:{
				order:5,
				value:6,
				tag:{
					damage:1,
					natureDamage:1,
					fireDamage:1,
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nofire')||target.hasSkillTag('nodamage')) return 0;
						if(target.hasSkill('xuying')&&target.num('h')==0) return 0;
						if(!target.isLinked()){
							return ai.get.damageEffect(target,player,target,'fire');
						}
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].isLinked()){
								var eff=ai.get.damageEffect(game.players[i],player,target,'fire');
								if(eff>0){
									num++;
								}
								else if(eff<0){
									num--;
								}
							}
						}
						return num;
					}
				}
			}
		},
		yuanjiao:{
			audio:true,
			fullskin:true,
			type:'trick',
			enable:function(card,player){
				if(get.mode()=='guozhan'&&player.isUnseen()) return false;
				return true;
			},
			filterTarget:function(card,player,target){
				if(get.mode()!='guozhan') return player!=target;
				if(target.identity=='unknown'||player.identity=='unknown') return false;
				if(player==target) return false;
				if(player.identity=='ye') return true;
				return player.identity!=target.identity;
			},
			content:function(){
				game.asyncDraw([target,player],[1,get.mode()=='guozhan'?3:1]);
			},
			ai:{
				basic:{
					useful:4,
					value:8,
					order:9
				},
				result:{
					target:1,
					player:3,
				},
			},
		},
		zhibi:{
			audio:true,
			fullskin:true,
			type:'trick',
			enable:true,
			chongzhu:true,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return (target.get('h').length||
					target.classList.contains('unseen')||
					target.classList.contains('unseen2'))
			},
			content:function(){
				"step 0"
				if(!player.storage.zhibi){
					player.storage.zhibi=[];
				}
				player.storage.zhibi.add(target);
				var controls=[];
				if(target.get('h').length) controls.push('手牌');
				if(target.classList.contains('unseen')) controls.push('主将');
				if(target.classList.contains('unseen2')) controls.push('副将');
				if(controls.length>1){
					player.chooseControl(controls);
				}
				if(controls.length==0) event.finish();
				"step 1"
				var content;
				var str=get.translation(target)+'的';
				if(result.control){
					if(result.control=='手牌') content=[str+'手牌',target.get('h')];
					else if(result.control=='主将') content=[str+'主将',[[target.name1],'character']];
					else content=[str+'副将',[[target.name2],'character']];
				}
				else if(target.get('h').length){
					content=[str+'手牌',target.get('h')];
				}
				else if(target.classList.contains('unseen')){
					content=[str+'主将',[[target.name1],'character']];
				}
				else{
					content=[str+'副将',[[target.name2],'character']];
				}
				player.chooseControl('ok').set('dialog',content);
			},
			mode:['guozhan'],
			ai:{
				order:9.5,
				wuxie:function(){
					return 0;
				},
				result:{
					player:function(player,target){
						if(player.num('h')<=player.hp) return 0;
						if(player.storage.zhibi&&player.storage.zhibi.contains(target)) return 0;
						return target.isUnseen()?1:0;
					}
				}
			}
		},
		yiyi:{
			audio:true,
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				if(get.mode()=='guozhan'){
					if(player.identity=='unknown'||player.identity=='ye') return player==target;
					return player.identity==target.identity;
				}
				else{
					return true;
				}
			},
			selectTarget:function(){
				if(get.mode()=='guozhan') return -1;
				return [1,3];
			},
			content:function(){
				target.draw(2);
				target.chooseToDiscard(2,'he',true).ai=ai.get.disvalue;
			},
			ai:{
				wuxie:function(){
					return 0;
				},
				basic:{
					useful:3,
					value:3,
					order:5
				},
				result:{
					target:function(player,target){
						if(target.num('h')<=1){
							if(target==player){
								return 0;
							}
							return 0.3;
						}
						return 1;
					},
				},
			},
			// mode:['guozhan'],
		},
		wuliu:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			distance:{attackFrom:-1},
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.identity=='unknown'||player.identity=='ye') return 2.5;
						var num=2;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].identity==player.identity) num+=0.5;
						}
						return num;
					}
				}
			},
			skills:['wuliu_skill'],
			mode:['guozhan'],
		},
		sanjian:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			distance:{attackFrom:-2},
			ai:{
				basic:{
					equipValue:4
				}
			},
			skills:['sanjian_skill']
		},
		jingfanma:{
			fullskin:true,
			type:'equip',
			subtype:'equip4',
			lianheng:true,
			distance:{globalFrom:-1},
		},
	},
	skill:{
		yuxi_skill:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num++;
			},
			ai:{
				threaten:1.3
			},
			group:'yuxi_skill2'
		},
		yuxi_skill2:{
			trigger:{player:'phaseUseBegin'},
			forced:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(player.canUse({name:'zhibi'},game.players[i])) return true;
				}
				return false;
			},
			content:function(){
				'step 0'
				player.chooseTarget('玉玺：选择知己知彼的目标',function(card,player,target){
					return player.canUse({name:'zhibi'},target);
				},true).set('ai',function(target){
					var player=_status.event.player;
					return ai.get.effect(target,{name:'zhibi'},player,player);
				});
				'step 1'
				if(result.bool){
					player.useCard({name:'zhibi'},result.targets);
				}
			}
		},
		xietianzi:{
			trigger:{player:'phaseAfter'},
			filter:function(event,player){
				return player.hasSkill('xietianzi');
			},
			forced:true,
			popup:false,
			content:function(){
				"step 0"
				player.removeSkill('xietianzi');
				if(player.num('he')>0){
					player.chooseToDiscard('he','是否弃置一张牌并获得一个额外回合？').set('ai',function(card){
						return 10-ai.get.value(card);
					});
				}
				else{
					event.finish();
				}
				"step 1"
				if(result.bool){
					player.phase();
				}
			},
		},
		_chiling1:{
			mode:['guozhan'],
			trigger:{player:'discardAfter'},
			filter:function(event,player){
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].name=='chiling'&&get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			forced:true,
			popup:false,
			content:function(){
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					if(trigger.cards[i].name=='chiling'&&get.position(trigger.cards[i])=='d'){
						cards.push(trigger.cards[i]);
					}
				}
				if(cards.length){
					for(var i=0;i<cards.length;i++){
						cards[i].remove();
					}
					_status.chiling=true;
					player.popup('敕令');
				}
			},
		},
		_chiling2:{
			mode:['guozhan'],
			trigger:{player:'judgeAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				if(event.result.card.parentNode.id!='discardPile') return false;
				return event.result.card.name=='chiling';
			},
			content:function(){
				_status.chiling=true;
				trigger.result.card.remove();
				player.popup('敕令');
			}
		},
		_chiling3:{
			mode:['guozhan'],
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			filter:function(){
				return _status.chiling;
			},
			content:function(){
				'step 0'
				_status.chiling=false;
				var targets=game.filterPlayer(function(target){
					return target.isUnseen();
				});
				targets.sort(lib.sort.seat);
				event.targets=targets;
				'step 1'
				if(event.targets.length){
					var target=event.targets.shift();
					event.current=target;
					if(target.num('he',{type:'equip'})){
						target.chooseControl('选项一','选项二','选项三',function(){
							return Math.random()<0.5?'选项一':'选项三';
						}).set('prompt','敕令<br><br><div class="text">选项一：明置一张武将牌，然后摸一张牌</div><br><div class="text">选项二：失去1点体力</div><br><div class="text">选项三：弃置一张装备牌</div>');
					}
					else{
						target.chooseControl('选项一','选项二',function(){
							if(_status.event.player.hp>=3&&Math.random()<=0.3){
								return '选项二';
							}
							return '选项一';
						}).set('prompt','敕令<br><br><div class="text">选项一：明置一张武将牌，然后摸一张牌</div><br><div class="text">选项二：失去1点体力</div>');
					}
				}
				else{
					event.finish();
				}
				'step 2'
				var target=event.current;
				if(result.control=='选项一'){
					target.showCharacter(2);
					target.draw();
				}
				else if(result.control=='选项二'){
					target.loseHp();
				}
				else{
					target.chooseToDiscard('he',{type:'equip'},true);
				}
				'step 3'
				event.goto(1);
			}
		},
		_diaohulishan:{
			trigger:{player:'useCardAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.card.name=='diaohulishan';
			},
			content:function(){
				player.draw();
			}
		},
		diaohulishan:{
			mod:{
				cardEnabled:function(){
					return false;
				},
				cardSavable:function(){
					return false;
				},
				targetEnabled:function(){
					return false;
				}
			},
			mark:true,
			intro:{
				content:'不计入距离的计算且不能使用牌且不是牌的合法目标'
			},
			group:'undist'
		},
		huxinjing:{
			trigger:{player:'damageBegin'},
			priority:10,
			forced:true,
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				trigger.num--;
				player.addSkill('huxinjing2');
			}
		},
		huxinjing2:{
			trigger:{player:'damageEnd'},
			priority:10,
			forced:true,
			popup:false,
			content:function(){
				var card=player.get('e','2');
				if(card&&card.name.indexOf('huxinjing')==0){
					player.discard(card);
				}
			}
		},
		_lianheng:{
			mode:['guozhan'],
			enable:'phaseUse',
			prompt:'将可连横的牌交给一名与你势力不同的角色，或未确定势力的角色，若你交给与你势力不同的角色，则你摸一张牌',
			filter:function(event,player){
				return (player.get('h',function(card){
					return get.info(card).lianheng;
				}).length);
			},
			filterCard:function(card){
				return get.info(card).lianheng;
			},
			filterTarget:function(card,player,target){
				if(target==player) return false;
				if(player.isUnseen()) return target.isUnseen();
				if(player.identity=='ye') return true;
				return target.identity!=player.identity;
			},
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
			},
			discard:false,
			// delay:0.5,
			content:function(){
				"step 0"
				target.gain(cards);
				"step 1"
				if(!target.isUnseen()){
					player.draw();
				}
			},
			ai:{
				basic:{
					order:2
				},
				result:{
					player:function(player,target){
						if(target.isUnseen()) return 0;
						return 0.5;
					},
					target:function(player,target){
						if(target.isUnseen()) return 0;
						return 1;
					}
				},
			}
		},
		wuliu_skill:{},
		_wuliu_skill2:{
			mod:{
				attackFrom:function(from,to,distance){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==from) continue;
						if(game.players[i].identity=='unknown'||game.players[i].identity=='ye') continue;
						if(game.players[i].identity!=from.identity) continue;
						if(game.players[i].num('e','wuliu')) distance--;
					}
					return distance;
				}
			}
		},
		sanjian_skill:{
			audio:true,
			trigger:{source:'damageAfter'},
			direct:true,
			filter:function(event,player){
				if(player.num('h')==0) return false;
				if(!event.card) return false;
				if(event.card.name!='sha') return false;
				var num=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=event.player&&get.distance(event.player,game.players[i])<=1) num++;
				}
				return num>0;
			},
			content:function(){
				"step 0"
				var damaged=trigger.player;
				player.chooseCardTarget({
					filterTarget:function(card,player,target){
						var damaged=_status.event.damaged;
						return get.distance(damaged,target)<=1&&target!=damaged;
					},
					ai1:function(card){
						return 9-ai.get.value(card);
					},
					ai2:function(target){
						var player=_status.event.player;
						return ai.get.damageEffect(target,player,player);
					},
					prompt:get.prompt('sanjian')
				}).set('damaged',damaged);
				"step 1"
				if(result.bool){
					player.logSkill('sanjian_skill',result.targets);
					player.discard(result.cards);
					result.targets[0].damage();
				}
			}
		},
	},
	translate:{
		yuxi_skill:'玉玺',
		yuxi_skill2:'玉玺',
		yuxi:'玉玺',
		yuxi_info:'锁定技，若你有明置的武将牌，你的势力视为唯一的大势力；锁定技，摸牌阶段，若你有明置的武将牌，你多摸一张牌；锁定技，出牌阶段开始时，若你有明置的武将牌，你视为使用【知己知彼】',
		xietianzi:'挟令',
		xietianzi_info:'出牌阶段，对自己使用。你结束出牌阶段，若如此做，此回合结束时，你可以弃置一张牌，获得一个额外的回合',
		xietianzi_info_guozhan:'出牌阶段，对为大势力角色的你使用。你结束出牌阶段，若如此做，此回合结束时，你可以弃置一张牌，获得一个额外的回合',
		shuiyanqijunx:'水淹七军',
		shuiyanqijunx_info:'出牌阶段，对一名装备区里有牌的其他角色使用。目标角色选择一项：1、弃置装备区里的所有牌；2、受到你造成的1点雷电伤害',
		lulitongxin:'勠力同心',
		lulitongxin_info:'出牌阶段，对所有大势力角色或所有小势力角色使用。若目标角色：不处于“连环状态”，其横置；处于“连环状态”，其摸一张牌',
		lianjunshengyan:'联军盛宴',
		lianjunshengyan_info:'出牌阶段，对你和你选择的除你的势力外的一个势力的所有角色。若目标角色：为你，你摸X张牌（X为该势力的角色数）；不为你，其选择一项：1、回复1点体力；2、摸一张牌，然后重置',
		chiling:'敕令',
		chiling_info:'出牌阶段，对所有没有势力的角色使用。目标角色选择一项：1、明置一张武将牌，然后摸一张牌；2、弃置一张装备牌；3、失去1点体力。当【敕令】因判定或弃置而置入弃牌堆时，系统将之移出游戏，然后系统于当前回合结束后视为对所有没有势力的角色使用【敕令】',
		diaohulishan:'调虎离山',
		diaohulishan_info:'出牌阶段，对至多两名其他角色使用。目标角色于此回合结束之前不计入距离的计算且不能使用牌且不是牌的合法目标。此牌结算结束时，你摸一张牌',
		_lianheng:'连横',
		huoshaolianying:'火烧连营',
		huoshaolianying_bg:'烧',
		huoshaolianying_info_guozhan:'出牌阶段，对你的下家和与其处于同一队列的角色使用，每名角色受到一点火焰伤害',
		huoshaolianying_info:'对离你最近的一名横置角色使用（若无横置角色则改为对距离你最近的所有角色使用），对目标造成一点火焰伤害',
		yuanjiao:'远交近攻',
		yuanjiao_info_guozhan:'对一名不同势力的角色使用，对方摸一张牌，然后你摸3张牌',
		yuanjiao_info:'对一名其他角色使用，你与其各摸一张牌',
		yuanjiao_bg:'交',
		zhibi:'知己知彼',
		zhibi_info:'出牌阶段对一名其他角色使用，观看其手牌或武将牌',
		yiyi:'以逸待劳',
		yiyi_info_guozhan:'对与自己势力相同的所有角色使用，摸两张牌然后弃置两张牌',
		yiyi_info:'对与任意三名角色使用，摸两张牌然后弃置两张牌',
		yiyi_bg:'逸',
		wuliu:'吴六剑',
		wuliu_info:'其他与装备者势力相同的角色攻击范围+1',
		sanjian:'三尖两刃刀',
		sanjian_info:'当你使用杀造成伤害后，可以弃置1张手牌对一名距离受伤害角色1以内的其他角色造成1点伤害',
		wuliu_skill:'吴六剑',
		sanjian_skill:'三尖两刃刀',
		jingfanma_bg:'-马',
		jingfanma:'惊帆',
		jingfanma_info:'其他角色与你的距离-1',
		huxinjing_bg:'镜',
		huxinjing:'护心镜',
		huxinjing_info:'抵消一点伤害',
	},
	list:[
		['heart',9,'yuanjiao'],
		['club',3,'zhibi'],
		['club',4,'zhibi'],
		['diamond',4,'yiyi'],
		['heart',11,'yiyi'],
		['diamond',6,'wuliu'],
		['diamond',12,'sanjian'],
		['heart',3,'jingfanma'],
		["spade",4,'shunshou'],
		["spade",12,'guohe'],
		["spade",11,'wuxie'],
		['spade',3,'huoshaolianying','fire'],
		['club',11,'huoshaolianying','fire'],
		['heart',12,'huoshaolianying','fire'],
		['club',2,'huxinjing'],
		['heart',2,'diaohulishan'],
		['diamond',10,'diaohulishan'],
		['heart',1,'lianjunshengyan'],
		['club',3,'chiling'],
		['spade',12,'lulitongxin'],
		['club',10,'lulitongxin'],
		['club',12,'shuiyanqijunx'],
		['heart',13,'shuiyanqijunx'],
		['spade',1,'xietianzi'],
		['diamond',1,'xietianzi'],
		['diamond',4,'xietianzi'],
		['club',1,'yuxi'],
	],
}
