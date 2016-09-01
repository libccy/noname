'use strict';
card.sp={
	connect:true,
	card:{
		yinyueqiang:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			distance:{attackFrom:-2},
			ai:{
				basic:{
					equipValue:4
				}
			},
			skills:['yinyueqiang']
		},
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
		},
		du:{
			type:'basic',
			fullskin:true,
			ai:{
				value:-5,
				useful:6,
			},
			enable:true,
			filterTarget:function(card,player,target){
				return target==player;
			},
			delay:false,
			content:function(){},
			selectTarget:-1
		},
		shengdong:{
            fullskin:true,
            enable:function(card,player){
				var hs=player.get('h');
				if(hs.length>1) return true;
				if(hs.length==1&&hs[0]!=card) return true;
				return false;
			},
            type:'trick',
			selectTarget:2,
			multitarget:true,
			targetprompt:['交给其一张牌','得两张牌'],
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				'step 0'
				if(!player.num('h')){
					event.finish();
				}
				else{
					event.target1=targets[0];
					event.target2=targets[1];
					player.chooseCard('h','将一张手牌交给'+get.translation(event.target1),true);
				}
				'step 1'
				player.$give(1,event.target1);
				event.target1.gain(result.cards);
				'step 2'
				if(!event.target1.num('h')){
					event.finish();
				}
				else{
					var he=event.target1.get('he');
					if(he.length<=2){
						event.directresult=he;
					}
					else{
						event.target1.chooseCard('he','将两张牌交给'+get.translation(event.target2),2,true);
					}
				}
				'step 3'
				if(!event.directresult){
					event.directresult=result.cards;
				}
				event.target1.$give(event.directresult.length,event.target2);
				event.target2.gain(event.directresult);
			},
			ai:{
				order:2.5,
				value:[4,1],
				useful:1,
				wuxie:function(){
					return 0;
				},
				result:{
					target:function(player,target){
						var ok=false;
						var hs=player.get('h');
						for(var i=0;i<hs.length;i++){
							if(ai.get.value(hs[i])<=5){
								ok=true;
								break;
							}
						}
						if(!ok) return 0;
						if(ui.selected.targets.length==1) return 2;
						if(target.num('he')==0) return 0;
						if(player.hasFriend()) return -1;
						return 0;
					}
				}
			}
        },
        zengbin:{
            fullskin:true,
            enable:true,
            type:'trick',
            filterTarget:true,
			content:function(){
				'step 0'
				target.draw(3);
				'step 1'
				if(target.num('he',{type:'basic'})<target.num('he')){
					target.chooseToDiscard('弃置一张非基本牌（或取消并弃置两张牌）','he',function(card){
						return get.type(card)!='basic';
					}).set('ai',function(card){
						if(_status.event.goon) return 7-ai.get.value(card);
						return 8-ai.get.value(card);
					}).set('goon',target.num('h','basic')>2);
					event.more=true;
				}
				else{
					target.chooseToDiscard('he',2,true);
				}
				'step 2'
				if(event.more&&!result.bool){
					target.chooseToDiscard('he',2,true);
				}
			},
			ai:{
				order:7,
				useful:4,
				value:10,
				result:{
					target:function(player,target){
						if(target.num('j','lebu')) return 0;
						return Math.max(1,2-target.num('h')/10);
					}
				}
			}
        },
        caomu:{
            fullskin:true,
            enable:true,
            type:'delay',
			filterTarget:function(card,player,target){
				return (lib.filter.judge(card,player,target)&&player!=target);
			},
			judge:function(card){
				if(get.suit(card)=='club') return 0;
				return -3;
			},
			effect:function(){
				if(result.bool==false){
					player.addTempSkill('caomu_skill','phaseAfter');
				}
			},
			ai:{
				basic:{
					order:1,
					useful:1,
					value:4.5,
				},
				result:{
					player:function(player,target){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(get.distance(target,game.players[i])<=1&&game.players[i]!=target){
								var att=ai.get.attitude(player,game.players[i]);
								if(att>3){
									num+=1.1;
								}
								else if(att>0){
									num++;
								}
								else if(att<-3){
									num-=1.1;
								}
								else if(att<0){
									num--;
								}
							}
						}
						return num;
					},
					target:-1
				},
			}
        }
	},
	skill:{
		yinyueqiang:{
			trigger:{player:['useCard','respondAfter']},
			direct:true,
			filter:function(event,player){
				if(_status.currentPhase==player) return false;
				if(!event.cards) return false;
				if(event.cards.length!=1) return false;
				if(lib.filter.autoRespondSha.call({player:player})) return false;
				return get.color(event.cards[0])=='black';
			},
			content:function(){
				'step 0'
				var next=player.chooseToUse('是否发动【银月枪】？',{name:'sha'});
				next.logSkill='yinyueqiang';
				next.noButton=true;
				'step 1'
				if(result.bool){
					game.delay();
				}
			}
		},
		muniu_skill:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			check:function(card){
				if(card.name=='du') return 20;
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
				skillTagFilter:function(player,tag){
					var muniu=player.get('e','5');
					if(!muniu||!muniu.cards) return false;
					for(var i=0;i<muniu.cards.length;i++){
						switch(tag){
							case 'respondSha':if(muniu.cards[i].name=='sha') return true;break;
							case 'respondShan':if(muniu.cards[i].name=='shan') return true;break;
							case 'save':{
								if(muniu.cards[i].name=='tao'||muniu.cards[i].name=='spell_zhiliaoshui') return true;
								if(player==_status.event.dying){
									if(muniu.cards[i].name=='jiu'||muniu.cards[i].name=='tianxianjiu') return true;
								}
								break;
							}
						}
					}
					return false;
				},
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
					if(event.filterCard(muniu.cards[i],player,event)) return true;
				}
				return false;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseButton(['木牛流马',player.get('e','5').cards]).set('filterButton',function(button){
					var evt=_status.event.getTrigger();
					if(evt&&evt.filterCard){
						return evt.filterCard(button.link,_status.event.player,evt);
					}
					return true;
				}).set('ai',function(button){
					var evt=_status.event.getTrigger();
					if(evt&&evt.ai){
						var tmp=_status.event;
						_status.event=evt;
						var result=evt.ai(button.link,_status.event.player,evt);
						_status.event=tmp;
						return result;
					}
					return 1;
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
						return evt.filterCard(button.link,player,evt);
					}
					return true;
				},
				check:function(button){
					if(button.link.name=='du') return -2;
					var player=_status.event.player;
					if(button.link.name=='xingjiegoutong'&&player.num('h')>1) return -2;
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
						player.hasSkill('muniu_skill6')==false&&
						get.position(event.cards[i])==='d') return true;
				}
				return false;
			},
			content:function(){
				for(var i=0;i<trigger.cards.length;i++){
					if(trigger.cards[i].name=='muniu'&&trigger.cards[i].original=='e'&&
						player.hasSkill('muniu_skill6')==false){
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
		_du:{
			trigger:{player:['useCardAfter','respondAfter','discardAfter']},
			popup:false,
			forced:true,
			filter:function(event,player){
				if(event.cards){
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].name=='du'&&event.cards[i].original!='j') return true;
					}
				}
				return false;
			},
			content:function(){
				var num=0;
				for(var i=0;i<trigger.cards.length;i++){
					if(trigger.cards[i].name=='du'&&trigger.cards[i].original!='j') num++;
				}
				player.popup('毒','wood');
				player.loseHp(num);
			},
		},
		caomu_skill:{
			unique:true,
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				trigger.num--;
			},
			group:'caomu_skill2'
		},
		caomu_skill2:{
			trigger:{player:'phaseDrawAfter'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				var targets=game.filterPlayer(function(current){
					return get.distance(player,current)<=1&&player!=current;
				});
				if(targets.length){
					game.asyncDraw(targets);
				}
			}
		}
	},
	translate:{
		yinyueqiang:'银月枪',
		yinyueqiang_info:'你的回合外，每当你使用或打出了一张黑色手牌（若为使用则在它结算之前），你可以立即对你攻击范围内的任意一名角色使用一张【杀】',
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
		du:'毒',
		du_info:'当你因使用、打出或弃置而失去此牌时，你失去一点体力',
        shengdong:'声东击西',
		shengdong_info:'出牌阶段，对一名其他角色使用。你交给目标角色一张手牌，若如此做，其将两张牌交给另一名由你选择的其他角色',
        zengbin:'增兵减灶',
        zengbin_info:'出牌阶段，对一名角色使用。目标角色摸三张牌，然后选择一项：1.弃置一张非基本牌；2.弃置两张牌',
        caomu:'草木皆兵',
        caomu_info:'出牌阶段，对一名其他角色使用。将【草木皆兵】放置于该角色的判定区里，若判定结果不为梅花：摸牌阶段，目标角色少摸一张牌；摸牌阶段结束时，与其距离为1的角色各摸一张牌',
	},
	list:[
		['spade',1,'caomu'],
		['club',3,'caomu'],
		['heart',12,'shengdong',],
        ['club',9,'shengdong'],
		['spade',9,'shengdong'],
        ['diamond',4,'zengbin'],
        ['heart',6,'zengbin'],
        ['spade',7,'zengbin'],
		['spade',3,'du'],
		['spade',9,'du'],
		['club',3,'du'],
		['club',9,'du'],
		['diamond',5,'du'],
		['diamond',9,'du'],
		["diamond",5,'muniu'],
		["diamond",12,'yinyueqiang'],
	],
}
