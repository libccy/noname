'use strict';
card.refresh={
	card:{
		muniu:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['muniu_skill','muniu_skill2','muniu_skill7'],
			ai:{
				basic:{
					equipValue:function(card){
						if(card.card) return 8+card.card.length;
						return 8;
					}
				}
			}
		}
	},
	skill:{
		muniu_skill:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			check:function(card){
				var player=_status.event.player;
				var nh=player.num('h');
				if(nh<=player.hp){
					if(nh<3) return 0;
					if(nh==3) return 5-ai.get.value(card);
					return 7-ai.get.value(card);
				}
				return 10-ai.get.useful(card);
			},
			discard:false,
			lose:true,
			sync:function(muniu){
				if(game.online){
					return;
				}
				if(!muniu.cards){
					muniu.cards=[];
				}
				for(var i=0;i<muniu.cards.length;i++){
					if(!muniu.cards[i].parentNode||muniu.cards[i].parentNode.id!='special'){
						muniu.cards.splice(i--,1);
					}
				}
				game.broadcast(function(muniu,cards){
					muniu.cards=cards;
				},muniu,muniu.cards);
			},
			filter:function(event,player){
				return player.num('h')>0;
			},
			prepare:function(cards,player){
				player.$give(1,player,false);
			},
			content:function(){
				"step 0"
				for(var i=0;i<cards.length;i++){
					ui.special.appendChild(cards[i]);
				}
				var muniu=player.get('e','5');
				if(!muniu){
					for(var i=0;i<cards.length;i++){
						ui.discardPile.appendChild(cards[i]);
					}
					event.finish();
					return;
				}
				if(muniu.cards==undefined) muniu.cards=[];
				muniu.cards.push(cards[0]);
				game.broadcast(function(muniu,cards){
					muniu.cards=cards;
				},muniu,muniu.cards);
				var players=[];
				for(var i=0;i<game.players.length;i++){
					if(!game.players[i].get('e','5')&&game.players[i]!=player&&
						!game.players[i].isTurnedOver()&&
						ai.get.attitude(player,game.players[i])>=3&&ai.get.attitude(game.players[i],player)>=3){
						players.push(game.players[i]);
					}
				}
				players.sort(lib.sort.seat);
				var choice=players[0];
				var next=player.chooseTarget('是否移动木牛流马？',function(card,player,target){
					return !target.isMin()&&player!=target&&!target.get('e','5');
				});
				next.set('ai',function(target){
					return target==_status.event.choice?1:-1;
				});
				next.set('choice',choice);
				"step 1"
				if(result.bool){
					var card=player.get('e','5');
					result.targets[0].equip(card);
					player.addTempSkill('muniu_skill6','equipAfter');
					player.$give(card,result.targets[0]);
					game.delay();
				}
			},
			ai:{
				save:true,
				respondSha:true,
				respondShan:true,
				order:1,
				expose:0.1,
				result:{
					player:1
				}
			}
		},
		muniu_skill2:{
			group:['muniu_skill3','muniu_skill4']
		},
		muniu_skill3:{
			trigger:{player:'chooseToRespondBegin'},
			filter:function(event,player){
				if(event.responded) return false;
				var muniu=player.get('e','5');
				if(!muniu.cards) return false;
				lib.skill.muniu_skill.sync(muniu);
				for(var i=0;i<muniu.cards.length;i++){
					if(event.filterCard(muniu.cards[i])) return true;
				}
				return false;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseButton(['木牛流马',player.get('e','5').cards]).set('filterButton',function(button){
					var evt=_status.event.getParent()._trigger;
					if(evt&&evt.filterCard){
						return evt.filterCard(button.link,_status.event.player);
					}
					return true;
				});
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.responded=true;
					trigger.result={bool:true,card:result.links[0]};
					var muniu=player.get('e','5');
					muniu.cards.remove(result.links[0]);
					lib.skill.muniu_skill.sync(muniu);
				}
			},
			ai:{
				order:4,
				useful:-1,
				value:-1
			}
		},
		muniu_skill4:{
			enable:'chooseToUse',
			filter:function(event,player){
				var muniu=player.get('e','5');
				if(!muniu.cards) return false;
				lib.skill.muniu_skill.sync(muniu);
				for(var i=0;i<muniu.cards.length;i++){
					if(event.filterCard(muniu.cards[i],player)) return true;
				}
				return false;
			},
			chooseButton:{
				dialog:function(event,player){
					return ui.create.dialog('木牛流马',player.get('e','5').cards,'hidden');
				},
				filter:function(button,player){
					var evt=_status.event.getParent();
					if(evt&&evt.filterCard){
						return evt.filterCard(button.link,player,_status.event.getParent());
					}
					return true;
				},
				check:function(button){
					var player=_status.event.player;
					if(get.select(get.info(button.link).selectTarget)[1]==-1){
						if(get.type(button.link)=='delay') return -1;
						if(get.type(button.link)=='equip'){
							var current=player.get('e',{subtype:get.subtype(button.link)})[0];
							if(current&&ai.get.equipValue(current)>=ai.get.equipValue(button.link)) return -1;
							return 1;
						}
						if(get.tag(button.link,'multitarget')) return -1;
						if(button.link.name=='huoshaolianying') return -1;
					}
					if(button.link.name=='jiu'){
						if(ai.get.effect(player,{name:'jiu'},player)>0){
							return 1;
						}
						return -1;
					}
					return 1;
				},
				backup:function(links,player){
					return {
						filterCard:function(){return false},
						selectCard:-1,
						viewAs:links[0],
						onuse:function(result,player){
							var muniu=player.get('e','5');
							if(muniu&&muniu.cards){
								muniu.cards.remove(result.card);
								lib.skill.muniu_skill.sync(muniu);
							}
						}
					}
				},
				prompt:function(links,player){
					return '选择'+get.translation(links)+'的目标';
				}
			},
			ai:{
				order:4,
				result:{
					player:function(player){
						if(_status.dying) return ai.get.attitude(player,_status.dying);
						return 1;
					}
				},
				useful:-1,
				value:-1
			}
		},
		muniu_skill6:{},
		muniu_skill7:{
			filter:function(){return false},
			hiddenCard:function(player,name){
				var muniu=player.get('e','5');
				if(!muniu.cards) return false;
				lib.skill.muniu_skill.sync(muniu);
				for(var i=0;i<muniu.cards.length;i++){
					if(muniu.cards[i].name==name) return true;
				}
				return false;
			},
		},
		_muliu:{
			trigger:{player:'loseEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].name=='muniu'&&event.cards[i].original=='e'&&
						player.skills.contains('muniu_skill6')==false&&
						get.position(event.cards[i])==='d') return true;
				}
				return false;
			},
			content:function(){
				for(var i=0;i<trigger.cards.length;i++){
					if(trigger.cards[i].name=='muniu'&&trigger.cards[i].original=='e'&&
						player.skills.contains('muniu_skill6')==false){
						var card=trigger.cards[i];
						var card2;
						if(card.cards&&card.cards.length){
							player.$throw(card.cards,1000);
							player.popup('muniu');
							game.log('木牛流马掉落了',card.cards);
							while(card.cards.length){
								card2=card.cards.shift();
								if(card2.parentNode.id=='special'){
									ui.discardPile.appendChild(card2);
								}
							}
						}

						break;
					}
				}
			}
		},
	},
	translate:{
		muniu:'木牛流马',
		muniu_bg:'牛',
		muniu_skill:'木牛',
		muniu_skill2:'流马',
		muniu_skill3:'流马',
		muniu_skill4:'流马',
		muniu_skill6:'流马',
		muniu_skill4_backup:'流马',
		muniu_info:'出牌阶段限一次，你可以将一张手牌扣置于你装备区里的【木牛流马】下，若如此做，你可以将此装备移动到一名其他角色的装备区里；你可以将此装备牌下的牌如手牌般使用或打出。',
		muniu_skill_info:'出牌阶段限一次，你可以将一张手牌扣置于你装备区里的【木牛流马】下，若如此做，你可以将此装备移动到一名其他角色的装备区里；你可以将此装备牌下的牌如手牌般使用或打出。',
	},
	list:[
		["diamond",5,'muniu'],
	],
}
