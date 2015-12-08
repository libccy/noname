play.soldier={
	mode:['identity','guozhan','versus'],
	skill:{
		soldier:{
			group:['soldier2','soldier3'],
			intro:{
				content:function(storage){
					if(!storage.length) return;
					var str=get.translation(storage[0]);
					for(var i=1;i<storage.length;i++){
						str+='、'+get.translation(storage[i]);
					}
					return str;
				}
			}
		},
		_soldier:{
			trigger:{global:'gameStart'},
			forced:true,
			popup:false,
			content:function(){
				if(_status.soldierList==undefined){
					_status.soldierList=['qingbubing','zhongbubing','qingqibing','zhongqibing','gongjianbing',
					'qiangnubing','changqiangbing','yuandunbing','daojianbing','shuijun','junyi',
					'huojianbing','chihou','tongxinbing','yunshubing','qingchebing','zhongbubing','fubing',
					'qixiebing','qisheshou','weibing','shubing','wubing','qunbing'];
					_status.soldierList.sort(lib.sort.random);
				}
				player.storage.soldier=_status.soldierList.splice(0,3);
				player.addSkill('soldier');
			}
		},
		soldier2:{
			trigger:{player:'phaseBegin'},
			priority:10,
			forced:true,
			popup:false,
			filter:function(event,player){
				return player.storage.soldier.length>0;
			},
			content:function(){
				"step 0"
				var dialog=ui.create.dialog('选择一个士兵','hidden');
				for(var i=0;i<player.storage.soldier.length;i++){
					player.removeSkill(player.storage.soldier[i]);
					dialog.add('<div><div class="skill">【'+get.translation(player.storage.soldier[i]).slice(0,2)+'】</div><div>'+
					lib.translate[player.storage.soldier[i]+'_info']+'</div></div>');
				}
				player.chooseControl(player.storage.soldier,dialog).ai=function(){
					return Math.floor(Math.random()*player.storage.soldier.length);
				};
				"step 1"
				player.addSkill(result.control);
				player.popup(result.control);
			}
		},
		soldier3:{
			trigger:{player:'damageBefore'},
			direct:true,
			filter:function(event,player){
				return player.storage.soldier.length>0;
			},
			check:function(event,player){
				return event.num>=player.hp;
			},
			content:function(){
				"step 0"
				if(event.isMine()){
					event.dialog=ui.create.dialog('选择替你承受伤害的士兵');
				}
				player.chooseControl(player.storage.soldier,'cancel');
				"step 1"
				if(event.dialog) event.dialog.close();
				if(result.control!='cancel'&&result.control){
					game.log(player,'牺牲了'+get.translation(result.control));
					player.storage.soldier.remove(result.control);
					player.removeSkill(result.control);
					player.popup(result.control);
					trigger.untrigger();
					trigger.finish();
				}
			}
		},
		qingbubing:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.recover();
			}
		},
		zhongbubing2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.recover();
			}
		},
		zhongbubing:{
			group:['zhongbubing2'],
			trigger:{target:'shaBefore'},
			forced:true,
			filter:function(event,player){
				if(player.get('e','2')) return false;
				return (event.card.name=='sha'&&get.color(event.card)=='black')
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(target.get('e','2')) return;
						if(card.name=='sha'&&get.color(card)=='black') return 0;
					}
				}
			},
			mod:{
				globalTo:function(from,to,distance){
					return distance+1;
				}
			}
		},
		qingqibing:{
			mod:{
				selectTarget:function(card,player,range){
					if(card.name=='sha') range[1]++;
				},
			},
		},
		zhongqibing:{
			trigger:{player:'shaBegin'},
			forced:true,
			content:function(){
				"step 0"
				trigger.target.chooseToRespond({name:'shan'});
				"step 1"
				if(result.bool==false){
					trigger.untrigger();
					trigger.directHit=true;
				}
			},
			mod:{
				selectTarget:function(card,player,range){
					if(card.name=='sha') range[1]++;
				},
				globalTo:function(from,to,distance){
					return distance+1;
				}
			},
		},
		gongjianbing:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha') return true;
				},
				playerEnabled:function(card,player,target){
					if(card.name=='sha'&&get.distance(player,target)<=1) return false;
				}
			},
		},
		qiangnubing:{
			trigger:{player:'shaBefore'},
			forced:true,
			priority:10,
			filter:function(event){
				return event.card.name=='sha';
			},
			content:function(){
				player.addTempSkill('unequip','shaAfter');
			},
			mod:{
				attackFrom:function(from,to,distance){
					return distance-1;
				},
				playerEnabled:function(card,player,target){
					if(card.name=='sha'&&get.distance(player,target)>2) return false;
				}
			},
		},
		changqiangbing:{
			mod:{
				selectTarget:function(card,player,range){
					if(card.name=='sha') range[1]=Infinity;
				},
				playerEnabled:function(card,player,target){
					if(card.name=='sha'){
						if(ui.selected.targets.length==0) return;
						if(get.distance(player,target)<=2) return;
						for(var i=0;i<ui.selected.targets.length;i++){
							if(get.distance(player,ui.selected.targets[i])>2) return false;
						}
					}
				}
			},
		},
		yuandunbing:{
			mod:{
				targetEnabled:function(card,player,target){
					if(card.name=='sha'&&get.number(card)<8) return false;
				}
			}
		},
		daojianbing:{
			trigger:{player:'shaBegin'},
			forced:true,
			filter:function(event,player){
				return event.card&&get.number(event.card)>8;
			},
			content:function(){
				trigger.directHit=true;
			}
		},
		shuijun:{
			group:['shuijun2'],
			trigger:{player:'damageBefore'},
			filter:function(event){
				if(!event.nature) return true;
			},
			forced:true,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'damage')){
							if(!get.tag(card,'fireDamage')&&
								!get.tag(card,'thunderDamage')) return 0;
						}
					}
				}
			}
		},
		shuijun2:{
			trigger:{player:'damageBegin'},
			filter:function(event){
				if(event.nature) return true;
			},
			forced:true,
			content:function(){
				trigger.num++;
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if((get.tag(card,'fireDamage')||get.tag(card,'thunderDamage'))&&current<0) return 2;
					}
				}
			}
		},
		junyi:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				if(target.hp>=target.maxHp) return false;
				return true;
			},
			content:function(){
				target.recover();
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(player==target&&player.num('h')>player.hp) return 5;
						return 2;
					}
				},
				threaten:3
			}
		},
		huojianbing:{
			group:['huojianbing2','huojianbing3'],
			viewAs:{name:'sha',nature:'fire'},
			filterCard:{name:'sha'},
			enable:'phaseUse',
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha'&&card.nature=='fire') return true;
				},
			}
		},
		huojianbing2:{
			trigger:{player:'shaBegin'},
			forced:true,
			filter:function(event){
				return event.card&&event.card.nature=='fire';
			},
			content:function(){
				"step 0"
				trigger.target.chooseToRespond({name:'shan'});
				"step 1"
				if(result.bool==false){
					trigger.untrigger();
					trigger.directHit=true;
				}
			}
		},
		huojianbing3:{
			trigger:{player:'shaBegin'},
			forced:true,
			filter:function(event){
				return event.card&&event.card.nature=='fire';
			},
			content:function(){
				player.loseHp();
			}
		},
		chihou:{
			trigger:{player:'phaseUseBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('斥侯：观看一名角色的手牌',function(card,player,target){
					return player!=target&&target.num('h');
				});
				"step 1"
				if(result.bool){
					player.logSkill('chihou');
					player.viewHandcards(result.targets[0]);
				}
			}
		},
		tongxinbing:{
			global:'tongxinbing2',
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			discard:false,
			filterTarget:function(card,player,target){
				return player!=target;
			},
			check:function(card){
				return 10-ai.get.value(card);
			},
			content:function(){
				target.gain(cards);
				player.$give(cards.length,target);
				game.delay();
				player.draw(cards.length);
			},
			ai:{
				order:10,
				result:{
					target:function(player,target){
						return Math.max(1,5-target.num('h'));
					}
				}
			}
		},
		tongxinbing2:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				if(player.skills.contains('tongxinbing')) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].skills.contains('tongxinbing')) return true;
				}
				return false;
			},
			filterCard:true,
			discard:false,
			filterTarget:function(card,player,target){
				return player!=target&&target.skills.contains('tongxinbing');
			},
			check:function(card){
				return 10-ai.get.value(card);
			},
			content:function(){
				target.gain(cards);
				player.$give(cards.length,target);
				game.delay();
				player.draw(cards.length);
			},
			ai:{
				order:10,
				result:{
					target:function(player,target){
						return Math.max(1,5-target.num('h'));
					}
				}
			}
		},
		yunshubing:{
			enable:'phaseUse',
			usable:1,
			content:function(){
				"step 0"
				event.cards=get.cards(player.maxHp);
				player.chooseCardButton(event.cards,[1,player.maxHp-player.hp]);
				"step 1"
				var cards2=[];
				for(var i=0;i<result.buttons.length;i++){
					cards.remove(result.buttons[i].link);
					cards2.push(result.buttons[i].link);
				}
				if(cards2.length){
					player.gain(cards2);
					player.$gain(cards2);
				}
				for(var i=0;i<cards.length;i++){
					ui.discardPile.appendChild(cards[i]);
				}
			},
			ai:{
				order:8,
				result:{
					player:2
				}
			}
		},
		qingchebing:{
			mod:{
				globalFrom:function(from,to,distance){
					return distance-1;
				},
				selectTarget:function(card,player,range){
					if(card.name=='sha') {range[0]=-1;range[1]=-1;}
				},
			},
		},
		zhongchebing:{
			mod:{
				globalFrom:function(from,to,distance){
					return distance-1;
				},
				globalTo:function(from,to,distance){
					return distance+1;
				},
				selectTarget:function(card,player,range){
					if(card.name=='sha') {range[0]=-1;range[1]=-1;}
				},
				targetEnabled:function(card,player,target){
					if(card.name=='sha'&&get.distance(target,player)<=1) return false;
				},
				cardEnabled:function(card){
					if(get.type(card)=='equip') return false;
				}
			},
		},
		fubing:{
			trigger:{player:'shaBegin'},
			priority:5,
			filter:function(event){
				return event.target.get('e','2')!=undefined;
			},
			content:function(){
				trigger.target.discard(trigger.target.get('e','2'));
				player.addTempSkill('unequip','shaAfter');
			},
			group:['fubing2']
		},
		fubing2:{
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event){
				return !event.player.get('e','2')&&event.card&&event.card.name=='sha';
			},
			content:function(){
				trigger.num++;
			}
		},
		qixiebing:{
			trigger:{player:'loseEnd'},
			direct:true,
			filter:function(event,player){
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original=='e') return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				player.chooseTarget('选择一名目标获得其一件装备',function(card,player,target){
					if(target.get('e','1')&&!player.get('e','1')) return true;
					if(target.get('e','2')&&!player.get('e','2')) return true;
					if(target.get('e','3')&&!player.get('e','3')) return true;
					if(target.get('e','4')&&!player.get('e','4')) return true;
					if(target.get('e','5')&&!player.get('e','5')) return true;
					return false;
				}).ai=function(target){
					return 4-ai.get.attitude(player,target);
				}
				"step 1"
				if(result.bool){
					event.target=result.targets[0];
					player.logSkill('qixiebing',event.target);
					player.choosePlayerCard(event.target,'e',true).filterButton=function(button){
						return !player.get('e',get.subtype(button.link)[5]);
					};
				}
				else{
					event.finish();
				}
				"step 2"
				player.equip(result.buttons[0].link);
				target.$give(result.buttons[0].link,player,false);
			},
			effect:{
				target:function(card,player,target,current){
					if(get.type(card)=='equip') return [1,3];
				}
			}
		},
		qisheshou:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha') return true;
				},
				selectTarget:function(card,player,range){
					if(card.name=='sha') range[1]++;
				},
				playerEnabled:function(card,player,target){
					if(card.name=='sha'&&get.distance(player,target)<=1) return false;
				},
			},
			trigger:{player:'shaBefore'},
			forced:true,
			content:function(){
				"step 0"
			player.judge(function(card){
				if(get.suit(card)=='spade') return -2;
					return 0;
				});
				"step 1"
				if(result.judge==-2){
					trigger.untrigger();
					trigger.finish();
				}
			}
		},
		shubing:{
			trigger:{player:['phaseJudgeBefore','phaseEnd']},
			direct:true,
			filter:function(event,player,name){
				var notarget=true;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].group=='shu'){
						notarget=false;break;
					}
				}
				if(notarget) return false;
				if(name=='phaseJudgeBefore'){
					return player.num('j')>0;
				}
				return true;
			},
			content:function(){
				"step 0"
				player.chooseTarget('蜀兵：令一名蜀势力角色摸一张牌',function(card,player,target){
					return target.group=='shu';
				});
				"step 1"
				if(result.bool){
					player.logSkill('shubing',result.targets[0]);
					result.targets[0].draw();
				}
			}
		},
		weibing:{
			trigger:{player:['phaseJudgeBefore','phaseEnd']},
			direct:true,
			filter:function(event,player,name){
				var notarget=true;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].group=='wei'){
						notarget=false;break;
					}
				}
				if(notarget) return false;
				if(name=='phaseJudgeBefore'){
					return player.num('j')>0;
				}
				return true;
			},
			content:function(){
				"step 0"
				player.chooseTarget('魏兵：令一名魏势力角色摸一张牌',function(card,player,target){
					return target.group=='wei';
				});
				"step 1"
				if(result.bool){
					player.logSkill('weibing',result.targets[0]);
					result.targets[0].draw();
				}
			}
		},
		wubing:{
			trigger:{player:['phaseJudgeBefore','phaseEnd']},
			direct:true,
			filter:function(event,player,name){
				var notarget=true;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].group=='wu'){
						notarget=false;break;
					}
				}
				if(notarget) return false;
				if(name=='phaseJudgeBefore'){
					return player.num('j')>0;
				}
				return true;
			},
			content:function(){
				"step 0"
				player.chooseTarget('吴兵：令一名吴势力角色摸一张牌',function(card,player,target){
					return target.group=='wu';
				});
				"step 1"
				if(result.bool){
					player.logSkill('wubing',result.targets[0]);
					result.targets[0].draw();
				}
			}
		},
		qunbing:{
			trigger:{player:['phaseJudgeBefore','phaseEnd']},
			direct:true,
			filter:function(event,player,name){
				var notarget=true;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].group=='qun'){
						notarget=false;break;
					}
				}
				if(notarget) return false;
				if(name=='phaseJudgeBefore'){
					return player.num('j')>0;
				}
				return true;
			},
			content:function(){
				"step 0"
				player.chooseTarget('群兵：令一名群势力角色摸一张牌',function(card,player,target){
					return target.group=='qun';
				});
				"step 1"
				if(result.bool){
					player.logSkill('qunbing',result.targets[0]);
					result.targets[0].draw();
				}
			}
		}
	},
	translate:{
		soldier:'士兵',
		qingbubing:'轻步兵',
		qingbubing_info:'回合结束阶段，你回复一点体力。',
		zhongbubing:'重步兵',
		zhongbubing2:'重步兵',
		zhongbubing_info:'锁定技，回合结束阶段，你回复一点体力；黑【杀】对你无效；你计算与其他角色的距离时始终+1。',
		qingqibing:'轻骑兵',
		qingqibing_info:'你使用的【杀】可额外指定一个目标。',
		zhongqibing:'重骑兵',
		zhongqibing_info:'你使用的【杀】可额外指定一个目标。锁定技，目标角色需要额外出一张【闪】才能闪避你的【杀】；你计算与其他角色的距离时始终+1。',
		gongjianbing:'弓箭兵',
		gongjianbing_info:'锁定技，你的攻击范围无限；你不能对距离1以内的角色使用【杀】。',
		qiangnubing:'强弩兵',
		qiangnubing_info:'锁定技，你的【杀】无视防具；你的攻击范围+1；距离2以外的角色不能成为你【杀】的目标。',
		changqiangbing:'长枪兵',
		changqiangbing_info:'你的【杀】可指定距离2以内的目标。',
		yuandunbing:'圆盾兵',
		yuandunbing_info:'锁定技，你不能成为点数小于8的【杀】的目标。',
		daojianbing:'刀剑兵',
		daojianbing_info:'锁定技，你使用的点数大于8的杀不可闪避',
		shuijun:'水军',
		shuijun2:'水军',
		shuijun_info:'你防止非属性伤害；你受到的属性伤害+1。',
		junyi:'军医',
		junyi_info:'出牌阶段限一次，你可以令一名其他角色恢复一点体力。',
		huojianbing:'火箭兵',
		huojianbing2:'火箭兵',
		huojianbing3:'火箭兵',
		huojianbing_info:'你可以将一张普通【杀】当作火【杀】使用。锁定技，你使用的火【杀】无距离限制，且需要额外出一张【闪】才能闪避；你使用火【杀】指定目标后，失去一点体力。',
		chihou:'斥候',
		chihou_info:'出牌阶段开始时，你可以观看一名角色的所有手牌',
		tongxinbing:'通信兵',
		tongxinbing2:'通信兵',
		tongxinbing_info:'出牌阶段，你可以给其他角色一张牌，并摸一张牌；其他角色可以在其出牌阶段给你一张牌，并摸一张牌。',
		yunshubing:'运输兵',
		yunshubing_info:'出牌阶段，你可以观看牌堆顶的X张牌，并其中获得Y张牌（X为你体力上限，Y为你当前体力值）。',
		qingchebing:'轻车兵',
		qingchebing_info:'锁定技，其他角色计算与你的距离时始终-1；你的【杀】指定目标后，视为对其他在攻击范围内的所有角色各使用了一张【杀】。',
		zhongchebing:'重车兵',
		zhongchebing_info:'锁定技，其他角色计算与你的距离时始终-1；你的【杀】指定目标后，视为对其他在攻击范围内的所有角色各使用了一张【杀】；距离1以内的角色不能指定你成为【杀】目标；你不能使用装备牌；你计算与其他角色的距离时始终+1。',
		fubing:'斧兵',
		fubing2:'斧兵',
		fubing_info:'你使用【杀】指定目标后，你可以弃置其防具。你的【杀】指定目标时，若其没有防具，你对其造成伤害+1。',
		qixiebing:'器械兵',
		qixiebing_info:'你每失去一次装备区的牌，可立即将一名其他角色的装备牌置于你的装备区（不可替换已有装备）',
		qisheshou:'骑射手',
		qisheshou_info:'你使用的【杀】可额外指定一个目标。锁定技，你的攻击范围无限；你不能对距离1以内的角色使用【杀】；你的【杀】指定目标后须进行一次判定：若为♠，该【杀】无效。',
		shubing:'蜀兵',
		shubing_info:'判定阶段和回合结束阶段前，你可以令一名蜀势力角色摸一张牌',
		weibing:'魏兵',
		weibing_info:'判定阶段和回合结束阶段前，你可以令一名魏势力角色摸一张牌',
		wubing:'吴兵',
		wubing_info:'判定阶段和回合结束阶段前，你可以令一名吴势力角色摸一张牌',
		qunbing:'群兵',
		qunbing_info:'判定阶段和回合结束阶段前，你可以令一名群势力角色摸一张牌',
	},
	help:{
		'士兵模式':'<ul><li>游戏开始阶段，场上所有角色随机获得3名士兵。<li>回合开始阶段，你获得一名士兵的技能。<li>当你即将受到伤害时，你可以选择一名士兵替你承受此次伤害，然后失去此士兵'+
		'<li>轻步兵：回合结束阶段，你回复一点体力。'+
		'<li>重步兵：锁定技，回合结束阶段，你回复一点体力；黑【杀】对你无效；你计算与其他角色的距离时始终+1。'+
		'<li>轻骑兵：你使用的【杀】可额外指定一个目标。'+
		'<li>重骑兵：你使用的【杀】可额外指定一个目标。锁定技，目标角色需要额外出一张【闪】才能闪避你的【杀】；你计算与其他角色的距离时始终+1。'+
		'<li>弓箭兵：锁定技，你的攻击范围无限；你不能对距离1以内的角色使用【杀】。'+
		'<li>强弩兵：锁定技，你的【杀】无视防具；你的攻击范围+1；距离2以外的角色不能成为你【杀】的目标。'+
		'<li>长枪兵：你的【杀】可指定距离2以内的目标。'+
		'<li>圆盾兵：锁定技，你不能成为点数小于8的【杀】的目标。'+
		'<li>刀剑兵：锁定技，你使用的点数大于8的杀不可闪避'+
		'<li>水军：你防止非属性伤害；你受到的属性伤害+1。'+
		'<li>军医：出牌阶段限一次，你可以令一名其他角色恢复一点体力。'+
		'<li>火箭兵：你可以将一张普通【杀】当作火【杀】使用。锁定技，你使用的火【杀】无距离限制，且需要额外出一张【闪】才能闪避；你使用火【杀】指定目标后，失去一点体力。'+
		'<li>斥候：出牌阶段开始时，你可以观看一名角色的手牌'+
		'<li>通信兵：出牌阶段，你可以给其他角色一张牌，并摸一张牌；其他角色可以在其出牌阶段给你一张牌，并摸一张牌。'+
		'<li>运输兵：出牌阶段，你可以观看牌堆顶的X张牌，并其中获得Y张牌（X为你体力上限，Y为你当前体力值）。'+
		'<li>轻车兵：锁定技，其他角色计算与你的距离时始终-1；你的【杀】指定目标后，视为对其他在攻击范围内的所有角色各使用了一张【杀】。'+
		'<li>重车兵：锁定技，其他角色计算与你的距离时始终-1；你的【杀】指定目标后，视为对其他在攻击范围内的所有角色各使用了一张【杀】；距离1以内的角色不能指定你成为【杀】目标；你不能使用装备牌；你计算与其他角色的距离时始终+1。'+
		'<li>斧兵：你使用【杀】指定目标后，你可以弃置其防具。你的【杀】指定目标时，若其没有防具，你对其造成伤害+1。'+
		'<li>器械兵：你每失去一次装备区的牌，可立即将一名其他角色的装备牌置于你的装备区（不可替换已有装备）'+
		'<li>骑射手：你使用的【杀】可额外指定一个目标。锁定技，你的攻击范围无限；你不能对距离1以内的角色使用【杀】；你的【杀】指定目标后须进行一次判定：若为♠，该【杀】无效。'+
		'<li>蜀兵：判定阶段和回合结束阶段前，你可以令一名蜀势力角色摸一张牌'+
		'<li>魏兵：判定阶段和回合结束阶段前，你可以令一名魏势力角色摸一张牌'+
		'<li>吴兵：判定阶段和回合结束阶段前，你可以令一名吴势力角色摸一张牌'+
		'<li>群兵：判定阶段和回合结束阶段前，你可以令一名群势力角色摸一张牌'
	}
}
