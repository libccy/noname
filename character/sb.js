'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		//strategy and battle, "sb" in short
		name:'sb',
		connect:true,
		character:{
			sb_yujin:['male','wei',4,['sbxiayuan','sbjieyue']],
			sb_huaxiong:['male','qun','3/4/1',['new_reyaowu','sbyangwei']],
			liucheng:['female','qun',3,['splveying','spyingwu']],
			sp_yangwan:['female','shu',3,['spmingxuan','spxianchou']],
			sb_huangzhong:['male','shu',4,['sbliegong']],
		},
		skill:{
			//于禁
			sbxiayuan:{
				audio:2,
				trigger:{global:'damageEnd'},
				direct:true,
				filter:function(event,player){
					return event.hujia&&!event.player.hujia&&event.player.isIn()&&player.countCards('h')>1&&!player.hasSkill('sbxiayuan_round',null,false,false);
				},
				content:function(){
					'step 0'
					player.addTempSkill('sbxiayuan_round','roundStart');
					player.chooseToDiscard(2,'h',get.prompt('sbxiayuan',trigger.player),'弃置两张手牌，令其获得'+get.cnNumber(trigger.hujia)+'点护甲').set('goon',get.attitude(player,trigger.player)>0).set('ai',function(card){
						if(!_status.event.goon) return 0;
						return 5-get.value(card);
					}).logSkill=['sbxiayuan',trigger.player];
					'step 1'
					if(result.bool){
						var target=trigger.player;
						player.logSkill('sbxiayuan',target);
						target.changeHujia(trigger.hujia);
						game.delayx();
					}
					else player.removeSkill('sbxiayuan_round');
				},
				subSkill:{round:{charlotte:true}},
				ai:{expose:0.2},
			},
			sbjieyue:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(lib.filter.notMe,get.prompt('sbjieyue'),'令一名其他角色获得1点护甲，然后该角色可以交给你一张牌。').set('ai',function(target){
						return get.attitude(_status.event.player,target)/Math.sqrt(Math.min(1,target.hp+target.hujia));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('sbjieyue',target);
						target.changeHujia(1);
						target.chooseCard('he','是否交给'+get.translation(player)+'一张牌？').set('ai',(card)=>0.1-get.value(card));
					}
					else event.finish();
					'step 2'
					if(result.bool){
						player.gain(result.cards,target,'giveAuto');
					}
				},
				ai:{
					threaten:2.7,
					expose:0.2,
				},
			},
			//华雄
			sbyangwei:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return !player.hasSkill('sbyangwei_counter',null,null,false);
				},
				content:function(){
					player.draw(2);
					player.addTempSkill('sbyangwei_effect');
					player.addSkill('sbyangwei_counter');
				},
				ai:{
					order:9,
					result:{player:1},
				},
				subSkill:{
					effect:{
						audio:'sbyangwei',
						equipSkill:false,
						inherit:'qinggang_skill',
						charlotte:true,
						nopop:true,
						mod:{
							targetInRange:function(card){
								if(card.name=='sha') return true;
							},
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+1;
							},
						},
						mark:true,
						marktext:'威',
						intro:{content:'使用【杀】的次数上限+1且无距离限制且无视防具'},
					},
					counter:{
						trigger:{player:'phaseJieshu'},
						silent:true,
						popup:false,
						forced:true,
						charlotte:true,
						onremove:true,
						content:function(){
							if(!player.storage.sbyangwei_counter) player.storage.sbyangwei_counter=true;
							else player.removeSkill('sbyangwei_counter');
						},
					},
				},
			},
			//黄忠
			sbliegong:{
				audio:2,
				mod:{
				 cardnature:function(card,player){
				 	if(!player.getEquip(1)&&get.name(card,player)=='sha') return false;
				 },
				},
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return !event.getParent()._sbliegong_player&&event.targets.length==1&&event.card.name=='sha'&&player.getStorage('sbliegong').length>0;
				},
				prompt2:function(event,player){
					var str='',storage=player.getStorage('sbliegong');
					if(storage.length>1){
						str+=('展示牌堆顶的'+get.cnNumber(storage.length-1)+'张牌并增加伤害；且');
					}
					str+=('令'+get.translation(event.target)+'不能使用花色为');
					for(var i=0;i<storage.length;i++){
						str+=get.translation(storage[i]);
					}
					str+=('的牌响应'+get.translation(event.card));
					return str;
				},
				logTarget:'target',
				check:function(event,player){
					var target=event.target;
					if(get.attitude(player,target)>0) return false;
					if(target.hasSkillTag('filterDamage',null,{
						player:player,
						card:event.card,
					})) return false;
					var storage=player.getStorage('sbliegong');
					if(storage.length>=4) return true;
					if(storage.length<3) return false;
					if(target.hasShan()) return storage.contains('heart')&&storage.contains('diamond');
					return true;
				},
				content:function(){
					var storage=player.getStorage('sbliegong').slice(0);
					var num=storage.length-1;
					var evt=trigger.getParent();
					if(num>0){
						if(typeof evt.baseDamage!='number') evt.baseDamage=1;
						var cards=get.cards(num);
						player.showCards(cards.slice(0),get.translation(player)+'发动了【烈弓】');
						while(cards.length>0){
							var card=cards.pop();
							if(storage.contains(get.suit(card,false))) evt.baseDamage++;
							ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						}
						game.updateRoundNumber();
					}
					evt._sbliegong_player=player;
					player.addTempSkill('sbliegong_clear');
					var target=trigger.target;
					target.addTempSkill('sbliegong_block');
					if(!target.storage.sbliegong_block) target.storage.sbliegong_block=[];
					target.storage.sbliegong_block.push([evt.card,storage]);
				},
				ai:{
					threaten:3.5,
					directHit_ai:true,
					halfneg:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.card&&arg.card.name=='sha'){
							var storage=player.getStorage('sbliegong');
							if(storage.length<3||!storage.contains('heart')||!storage.contains('diamond')) return false;
							var target=arg.target;
							if(target.hasSkill('bagua_skill')||target.hasSkill('bazhen')||target.hasSkill('rw_bagua_skill')) return false;
							return true;
						}
						return false;
					},
				},
				intro:{
					content:'已记录花色：$',
					onunmark:true,
				},
				group:'sbliegong_count',
				subSkill:{
					clear:{
						trigger:{player:'useCardAfter'},
						forced:true,
						charlotte:true,
						popup:false,
						filter:function(event,player){
							return event._sbliegong_player==player;
						},
						content:function(){
							player.unmarkSkill('sbliegong');
						},
					},
					block:{
						mod:{
							cardEnabled:function(card,player){
								if(!player.storage.sbliegong_block) return;
								var suit=get.suit(card);
								if(suit=='none') return;
								var evt=_status.event;
								if(evt.name!='chooseToUse') evt=evt.getParent('chooseToUse');
								if(!evt||!evt.respondTo||evt.respondTo[1].name!='sha') return;
								for(var i of player.storage.sbliegong_block){
									if(i[1].contains(suit)) return false;
								}
							},
						},
						trigger:{
							player:['damageBefore','damageCancelled','damageZero'],
							target:['shaMiss','useCardToExcluded','useCardToEnd'],
							global:['useCardEnd'],
						},
						forced:true,
						firstDo:true,
						charlotte:true,
						onremove:true,
						filter:function(event,player){
							if(!event.card||!player.storage.sbliegong_block) return false;
							for(var i of player.storage.sbliegong_block){
								if(i[0]==event.card) return true;
							}
							return false;
						},
						content:function(){
							var storage=player.storage.sbliegong_block;
							for(var i=0;i<storage.length;i++){
								if(storage[i][0]==trigger.card){
									storage.splice(i--,1);
								}
							}
							if(!storage.length) player.removeSkill('sbliegong_block');
						},
					},
					count:{
						trigger:{
							player:'useCard',
							target:'useCardToTargeted',
						},
						forced:true,
						filter:function(event,player,name){
							if(name!='useCard'&&player==event.player) return false;
							var suit=get.suit(event.card);
							if(!lib.suit.contains(suit)) return false;
							if(player.storage.sbliegong&&player.storage.sbliegong.contains(suit)) return false;
							return true;
						},
						content:function(){
							player.markAuto('sbliegong',[get.suit(trigger.card)]);
						},
					},
				},
			},
			//刘赪
			splveying:{
				audio:2,
				trigger:{player:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&player.countMark('splveying')>1;
				},
				logTarget:'targets',
				content:function(){
					player.removeMark('splveying',2);
					for(var i of trigger.targets) player.discardPlayerCard(i,true,'he');
				},
				marktext:'椎',
				intro:{
					name:'椎(掠影/莺舞)',
					name2:'椎',
					content:'mark',
				},
				group:'splveying_add',
				subSkill:{
					add:{
						trigger:{player:'useCardToPlayered'},
						forced:true,
						usable:2,
						filter:function(event,player){
							return event.card.name=='sha'&&player.isPhaseUsing();
						},
						content:function(){
							player.addMark('splveying',1);
						},
					},
				},
			},
			spyingwu:{
				group:'spyingwu_add',
				audio:2,
				trigger:{player:'useCardAfter'},
				forced:true,
				locked:false,
				filter:function(event,player){
					return  player.hasSkill('splveying')&&(get.type(event.card)=='trick'&&!get.tag(event.card,'damage'))&&player.countMark('splveying')>1;
				},
				content:function(){
					player.removeMark('splveying',2);
					player.chooseUseTarget('sha',false);
				},
				ai:{combo:'splveying'},
				subSkill:{
					add:{
						trigger:{player:'useCardToPlayered'},
						forced:true,
						locked:false,
						usable:2,
						filter:function(event,player){
							return player.hasSkill('splveying')&&(get.type(event.card)=='trick'&&!get.tag(event.card,'damage'))&&player.isPhaseUsing();
						},
						content:function(){
							player.addMark('splveying',1);
						},
					},
				},
			},
			//手杀杨婉
			spmingxuan:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				forced:true,
				filter:function(event,player){
					var list=player.getStorage('spmingxuan');
					return player.countCards('h')>0&&game.hasPlayer(function(current){
						return current!=player&&!list.contains(current);
					});
				},
				content:function(){
					'step 0'
					var suits=[],hs=player.getCards('h');
					for(var i of hs) suits.add(get.suit(i,player));
					var list=player.getStorage('spmingxuan'),num=Math.min(suits.length,game.countPlayer(function(current){
						return current!=player&&!list.contains(current);
					}));
					player.chooseCard('h',true,[1,num],'瞑昡：请选择至多'+get.cnNumber(num)+'张花色各不相同的手牌',function(card,player){
						if(!ui.selected.cards.length) return true;
						var suit=get.suit(card);
						for(var i of ui.selected.cards){
							if(get.suit(i,player)==suit) return false;
						}
						return true;
					}).set('complexCard',true).set('ai',(card)=>6-get.value(card));
					'step 1'
					if(result.bool){
						var list=player.getStorage('spmingxuan'),cards=result.cards.randomSort();
						var targets=game.filterPlayer((current)=>(current!=player&&!list.contains(current))).randomGets(cards.length).sortBySeat();
						player.line(targets,'green');
						for(var i=0;i<targets.length;i++){
							targets[i].gain(cards[i],player);
							player.$giveAuto(cards[i],targets[i]);
						}
						event.targets=targets;
						event.num=0;
					}
					else event.finish();
					'step 2'
					game.delayx();
					'step 3'
					if(num<targets.length){
						var target=targets[num];
						event.num++;
						if(target.isIn()){
							event.target=target;
							target.chooseToUse(function(card,player,event){
								if(get.name(card)!='sha') return false;
									return lib.filter.filterCard.apply(this,arguments);
								},'对'+get.translation(player)+'使用一张杀，否则交给其一张牌，且其摸一张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
								if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
								return lib.filter.targetEnabled.apply(this,arguments);
							}).set('sourcex',player).set('addCount',false);
						}
						else{
							if(event.num<targets.length) event.redo();
							else event.finish();
						}
					}
					'step 4'
					if(result.bool){
						player.markAuto('spmingxuan',[target]);
						if(event.num<targets.length) event.goto(3);
						else event.finish();
					}
					else{
						var he=target.getCards('he');
						if(he.length){
							if(he.length==1) event._result={bool:true,cards:he};
							else target.chooseCard('he',true,'交给'+get.translation(player)+'一张牌')
						}
						else{
							if(event.num<targets.length) event.goto(3);
							else event.finish();
						}
					}
					'step 5'
					if(result.bool){
						player.gain(result.cards,target,'giveAuto');
						player.draw();
					}
					if(event.num<targets.length) event.goto(3);
				},
				intro:{content:'已被$使用过杀'},
			},
			spxianchou:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					return event.source&&event.source.isIn()&&game.hasPlayer(function(current){
						return current!=player&&current!=event.source;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('spxianchou'),function(card,player,target){
						return target!=player&&target!=_status.event.getTrigger().source;
					}).set('ai',function(target){
						return get.attitude(target,_status.event.player)*Math.sqrt(target.countCards('he'));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('spxianchou',target);
						player.line2([target,trigger.source]);
						target.chooseToDiscard('he','是否弃置一张牌，视为对'+get.translation(trigger.source)+'使用一张【杀】？').set('ai',function(card){
							if(_status.event.goon) return 8-get.value(card);
							return 0;
						}).set('goon',((target.canUse('sha',trigger.source,false)?get.effect(trigger.source,{name:'sha',isCard:true},target,target):0)+get.recoverEffect(player,target,target))>0);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						if(target.canUse('sha',trigger.source,false)) target.useCard({name:'sha',isCard:true},trigger.source,false);
						else event.finish();
					}
					else event.finish();
					'step 3'
					if(target.hasHistory('sourceDamage',function(evt){
						var card=evt.card;
						if(!card||card.name!='sha') return false;
						var evtx=evt.getParent('useCard');
						return evtx.card==card&&evtx.getParent()==event;
					})) player.recover();
				},
			},
		},
		translate:{
			sp_yangwan:'手杀杨婉',
			spmingxuan:'瞑昡',
			spmingxuan_info:'锁定技。出牌阶段开始时，你须选择至多X张花色各不相同的手牌（X为未选择过选项一的角色），将这些牌随机交给这些角色中的等量角色。然后这些角色依次选择一项：⒈对你使用一张【杀】。⒉交给你一张牌，然后你摸一张牌。',
			spxianchou:'陷仇',
			spxianchou_info:'当你受到有来源的伤害后，你可选择一名不为伤害来源的其他角色。该角色可以弃置一张牌，然后视为对伤害来源使用一张【杀】（无距离限制）。若其因此【杀】造成了伤害，则你回复1点体力。',
			liucheng:'刘赪',
			splveying:'掠影',
			splveying_info:'锁定技。①每回合限两次，当你使用【杀】指定目标后，你获得一个“椎”。②当你使用的【杀】结算结束后，若你的“椎”数大于1，则你弃置两个“椎”，然后弃置所有目标角色的各一张手牌。',
			spyingwu:'莺舞',
			spyingwu_info:'若你拥有〖掠影〗，则：①每回合限两次，当你使用非伤害类普通锦囊牌指定目标后，你获得一个“椎”。②当你使用的非伤害类普通锦囊牌结算结束后，若你的“椎”数大于1，则你弃置两个“椎”，然后可以视为使用一张【杀】。',
			sb_huangzhong:'谋黄忠',
			sbliegong:'烈弓',
			sbliegong_info:'①若你的装备区内没有武器牌，则你手牌区内所有【杀】的属性视为无属性。②当你使用牌时，或成为其他角色使用牌的目标后，你记录此牌的花色。③当你使用【杀】指定唯一目标后，若你〖烈弓②〗的记录不为空，则你可亮出牌堆顶的X张牌（X为你〖烈弓②〗记录过的花色数-1），令此【杀】的伤害值基数+Y（Y为亮出牌中被〖烈弓②〗记录过花色的牌的数量），且目标角色不能使用〖烈弓②〗记录过花色的牌响应此【杀】。此【杀】使用结算结束后，你清除〖烈弓②〗的记录。',
			sb_huaxiong:'谋华雄',
			sbyangwei:'扬威',
			sbyangwei_info:'出牌阶段，你可以摸两张牌，令此技能于你的下下个结束阶段前失效，且你获得如下效果直到回合结束：使用【杀】无距离限制，次数上限+1且无视防具。',
			sb_yujin:'谋于禁',
			sbxiayuan:'狭援',
			sbxiayuan_info:'每轮限一次。其他角色受到伤害后，若其因此伤害触发过护甲效果且其没有护甲，则你可弃置两张手牌，令其获得X点护甲（X为其因此伤害触发护甲效果而失去的护甲数量）。',
			sbjieyue:'节钺',
			sbjieyue_info:'结束阶段，你可以令一名其他角色获得1点护甲。然后其可以交给你一张牌。',
		},
	};
});
