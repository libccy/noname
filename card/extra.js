'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'extra',
		connect:true,
		card:{
			muniu:{
				fullskin:true,
				type:'equip',
				subtype:'equip5',
				nomod:true,
				onEquip:function(){
					player.markSkill('muniu_skill6');
				},
				forceDie:true,
				onLose:function(){
					player.unmarkSkill('muniu_skill6');
					if((event.getParent(2)&&event.getParent(2).name!='swapEquip')&&event.parent.type!='equip'&&card&&card.cards&&card.cards.length){
						player.$throw(card.cards,1000);
						player.popup('muniu');
						game.log(card,'掉落了',card.cards);
						while(card.cards.length){
							var card2=card.cards.shift();
							if(card2.parentNode.id=='special'){
								card2.discard();
							}
						}
					}
				},
				clearLose:true,
				equipDelay:false,
				loseDelay:false,
				skills:['muniu_skill','muniu_skill2','muniu_skill6','muniu_skill7'],
				ai:{
					equipValue:function(card){
						if(card.card) return 7+card.card.length;
						return 7;
					},
					basic:{
						equipValue:7
					}
				}
			},
			jiu:{
				audio:true,
				fullskin:true,
				type:"basic",
				toself:true,
				enable:function(event,player){
					//return !player.hasSkill('jiu');
					return true;
				},
				lianheng:true,
				logv:false,
				savable:function(card,player,dying){
					return dying==player;
				},
				usable:1,
				selectTarget:-1,
				modTarget:true,
				filterTarget:function(card,player,target){
					return target==player;
				},
				content:function(){
					if(target.isDying()){
						target.recover();
						if(_status.currentPhase==target){
							target.getStat().card.jiu--;
						}
					}
					else{
						game.addVideo('jiuNode',target,true);
						if(cards&&cards.length){
							card=cards[0];
						}
						if(!target.storage.jiu) target.storage.jiu=0;
						target.storage.jiu++;
						game.broadcastAll(function(target,card,gain2){
							target.addSkill('jiu');
							if(!target.node.jiu&&lib.config.jiu_effect){
								target.node.jiu=ui.create.div('.playerjiu',target.node.avatar);
								target.node.jiu2=ui.create.div('.playerjiu',target.node.avatar2);
							}
							if(gain2&&card.clone&&(card.clone.parentNode==target.parentNode||card.clone.parentNode==ui.arena)){
								card.clone.moveDelete(target);
							}
						},target,card,target==targets[0]&&cards.length==1);
						if(target==targets[0]&&cards.length==1){
							if(card.clone&&(card.clone.parentNode==target.parentNode||card.clone.parentNode==ui.arena)){
								game.addVideo('gain2',target,get.cardsInfo([card]));
							}
						}
					}
				},
				ai:{
					basic:{
						useful:function(card,i){
							if(_status.event.player.hp>1){
								if(i==0) return 4;
								return 1;
							}
							if(i==0) return 7.3;
							return 3;
						},
						value:function(card,player,i){
							if(player.hp>1){
								if(i==0) return 5;
								return 1;
							}
							if(i==0) return 7.3;
							return 3;
						},
					},
					order:function(){
						return get.order({name:'sha'})+0.2;
					},
					result:{
						target:function(player,target){
							if(target&&target.isDying()) return 2;
							if(target&&!target.isPhaseUsing()) return 0;
							if(lib.config.mode=='stone'&&!player.isMin()){
								if(player.getActCount()+1>=player.actcount) return 0;
							}
							var shas=player.getCards('h','sha');
							if(shas.length>1&&player.getCardUsable('sha')>1){
								return 0;
							}
							var card;
							if(shas.length){
								for(var i=0;i<shas.length;i++){
									if(lib.filter.filterCard(shas[i],target)){
										card=shas[i];break;
									}
								}
							}
							else if(player.hasSha()&&player.needsToDiscard()){
								if(player.countCards('h','hufu')!=1){
									card={name:'sha'};
								}
							}
							if(card){
								if(game.hasPlayer(function(current){
									return (get.attitude(target,current)<0&&
										target.canUse(card,current,true,true)&&
										!current.getEquip('baiyin')&&
										get.effect(current,card,target)>0);
								})){
									return 1;
								}
							}
							return 0;
						},
					},
					tag:{
						save:1
					}
				}
			},
			huogong:{
				audio:true,
				fullskin:true,
				type:'trick',
				enable:true,
				cardnature:'fire',
				filterTarget:function(card,player,target){
					if(player!=game.me&&player.countCards('h')<2) return false;
					return target.countCards('h')>0;
				},
				content:function(){
					"step 0"
					if(target.countCards('h')==0){
						event.finish();
						return;
					}
					target.chooseCard(true).ai=function(card){
						if(_status.event.getRand()<0.5) return Math.random();
						return get.value(card);
					};
					"step 1"
					event.dialog=ui.create.dialog(get.translation(target)+'展示的手牌',result.cards);
					event.videoId=lib.status.videoId++;

					game.broadcast('createDialog',event.videoId,get.translation(target)+'展示的手牌',result.cards);
					game.addVideo('cardDialog',null,[get.translation(target)+'展示的手牌',get.cardsInfo(result.cards),event.videoId]);
					event.card2=result.cards[0];
					game.log(target,'展示了',event.card2);
					player.chooseToDiscard({suit:get.suit(event.card2)},function(card){
						var evt=_status.event.getParent();
						if(get.damageEffect(evt.target,evt.player,evt.player,'fire')>0){
							return 7-get.value(card,evt.player);
						}
						return -1;
					}).prompt=false;
					game.delay(2);
					"step 2"
					if(result.bool){
						target.damage('fire');
					}
					else{
						target.addTempSkill('huogong2');
					}
					event.dialog.close();
					game.addVideo('cardDialog',null,event.videoId);
					game.broadcast('closeDialog',event.videoId);
				},
				ai:{
					basic:{
						order:4,
						value:[3,1],
						useful:1,
					},
					wuxie:function(target,card,player,current,state){
						if(get.attitude(current,player)>=0&&state>0) return false;
					},
					result:{
						player:function(player){
							var nh=player.countCards('h');
							if(nh<=player.hp&&nh<=4&&_status.event.name=='chooseToUse'){
								if(typeof _status.event.filterCard=='function'&&
									_status.event.filterCard({name:'huogong'},player,_status.event)){
									return -10;
								}
								if(_status.event.skill){
									var viewAs=get.info(_status.event.skill).viewAs;
									if(viewAs=='huogong') return -10;
									if(viewAs&&viewAs.name=='huogong') return -10;
								}
							}
							return 0;
						},
						target:function(player,target){
							if(target.hasSkill('huogong2')||target.countCards('h')==0) return 0;
							if(player.countCards('h')<=1) return 0;
							if(target==player){
								if(typeof _status.event.filterCard=='function'&&
									_status.event.filterCard({name:'huogong'},player,_status.event)){
									return -1.5;
								}
								if(_status.event.skill){
									var viewAs=get.info(_status.event.skill).viewAs;
									if(viewAs=='huogong') return -1.5;
									if(viewAs&&viewAs.name=='huogong') return -1.5;
								}
								return 0;
							}
							return -1.5;
						}
					},
					tag:{
						damage:1,
						fireDamage:1,
						natureDamage:1,
						norepeat:1
					}
				}
			},
			tiesuo:{
				audio:true,
				fullskin:true,
				type:'trick',
				enable:true,
				filterTarget:true,
				selectTarget:[1,2],
				complexTarget:true,
				content:function(){
					target.link();
				},
				chongzhu:true,
				ai:{
					wuxie:function(){
						if(_status.event.getRand()<0.5) return 0;
					},
					basic:{
						useful:4,
						value:4,
						order:7
					},
					result:{
						target:function(player,target){
							if(target.isLinked()){
								if(target.hasSkillTag('link')) return 0;
								var f=target.hasSkillTag('nofire');
								var t=target.hasSkillTag('nothunder');
								if(f&&t) return 0;
								if(f||t) return 0.5;
								return 2;
							}
							if(get.attitude(player,target)>=0) return -0.9;
							if(ui.selected.targets.length) return -0.9;
							if(game.hasPlayer(function(current){
								return get.attitude(player,current)<=-1&&current!=target&&!current.isLinked();
							})){
								return -0.9;
							}
							return 0;
						}
					},
					tag:{
						multitarget:1,
						multineg:1,
						norepeat:1
					}
				}
			},
			bingliang:{
				audio:true,
				fullskin:true,
				type:'delay',
				range:{global:1},
				filterTarget:function(card,player,target){
					return (lib.filter.judge(card,player,target)&&player!=target);
				},
				judge:function(card){
					if(get.suit(card)=='club') return 0;
					return -3;
				},
				effect:function(){
					if(result.bool==false){
						if(get.is.changban()) player.addTempSkill('bingliang_changban');
						else player.skip('phaseDraw');
					}
				},
				ai:{
					basic:{
						order:1,
						useful:1,
						value:4,
					},
					result:{
						target:function(player,target){
							if(target.hasJudge('caomu')) return 0;
							return -1.5/Math.sqrt(target.countCards('h')+1);
						}
					},
					tag:{
						skip:'phaseDraw'
					}
				}
			},
			hualiu:{
				fullskin:true,
				type:'equip',
				subtype:'equip3',
				distance:{globalTo:1},
			},
			zhuque:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				cardnature:'fire',
				distance:{attackFrom:-3},
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['zhuque_skill']
			},
			guding:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-1},
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['guding_skill']
			},
			tengjia:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				cardnature:'fire',
				ai:{
					equipValue:function(card,player){
						if(player.hasSkillTag('maixie')&&player.hp>1) return 0;
						if(player.hasSkillTag('noDirectDamage')) return 10;
						if(get.damageEffect(player,player,player,'fire')>=0) return 10;
						var num=3-game.countPlayer(function(current){
							return get.attitude(current,player)<0;
						});
						if(player.hp==1) num+=4;
						if(player.hp==2) num+=1;
						if(player.hp==3) num--;
						if(player.hp>3) num-=4;
						return num;
					},
					basic:{
						equipValue:3
					},
				},
				skills:['tengjia1','tengjia2','tengjia3']
			},
			baiyin:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				onLose:function(){
					player.recover();
				},
				filterLose:function(card,player){
					if(player.hasSkillTag('unequip2')) return false;
					return player.hp<player.maxHp;
				},
				skills:['baiyin_skill'],
				tag:{
					recover:1,
				},
				ai:{
					order:9.5,
					equipValue:function(card,player){
						if(player.hp==player.maxHp) return 5;
						if(player.countCards('h','baiyin')) return 6;
						return 0;
					},
					basic:{
						equipValue:5
					}
				}
			},
		},
		skill:{
			bingliang_changban:{
				cardSkill:true,
				unique:true,
				trigger:{player:'phaseDrawBegin'},
				silent:true,
				content:function(){
					trigger.num--;
				},
				group:'bingliang_changban2'
			},
			bingliang_changban2:{
				cardSkill:true,
				trigger:{player:'phaseDrawAfter'},
				silent:true,
				content:function(){
					if(player.enemy) player.enemy.draw();
				}
			},
			muniu_skill:{
				equipSkill:true,
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				check:function(card){
					if(card.name=='du') return 20;
					var player=_status.event.player;
					var nh=player.countCards('h');
					if(!player.needsToDiscard()){
						if(nh<3) return 0;
						if(nh==3) return 5-get.value(card);
						return 7-get.value(card);
					}
					return 10-get.useful(card);
				},
				discard:false,
				lose:true,
				toStorage:true,
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
					return player.countCards('h')>0;
				},
				prepare:function(cards,player){
					player.$give(1,player,false);
				},
				content:function(){
					"step 0"
					for(var i=0;i<cards.length;i++){
						if(!cards[i].destroyed){
							ui.special.appendChild(cards[i]);
						}
						else{
							cards[i].remove();
							cards.splice(i--,1);
						}
					}
					var muniu=player.getEquip(5);
					if(!muniu||!cards.length){
						for(var i=0;i<cards.length;i++){
							cards[i].discard();
						}
						event.finish();
						return;
					}
					if(muniu.cards==undefined) muniu.cards=[];
					muniu.cards.push(cards[0]);
					game.broadcast(function(muniu,cards){
						muniu.cards=cards;
					},muniu,muniu.cards);
					var players=game.filterPlayer(function(current){
						if(!current.getEquip(5)&&current!=player&&!current.isTurnedOver()&&
							get.attitude(player,current)>=3&&get.attitude(current,player)>=3){
							return true;
						}
					});
					players.sort(lib.sort.seat);
					var choice=players[0];
					var next=player.chooseTarget('是否移动木牛流马？',function(card,player,target){
						return !target.isMin()&&player!=target&&target.isEmpty(5);
					});
					next.set('ai',function(target){
						return target==_status.event.choice?1:-1;
					});
					next.set('choice',choice);
					"step 1"
					if(result.bool){
						var card=player.getEquip(5);
						result.targets[0].equip(card);
						player.$give(card,result.targets[0]);
						player.line(result.targets,'green');
						game.delay();
					}
					else{
						player.updateMarks();
					}
				},
				ai:{
					save:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag){
						var muniu=player.getEquip(5);
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
				cardSkill:true,
				filter:function(event,player){
					if(event.responded) return false;
					var muniu=player.getEquip(5);
					if(!muniu.cards) return false;
					lib.skill.muniu_skill.sync(muniu);
					for(var i=0;i<muniu.cards.length;i++){
						if(event.filterCard(muniu.cards[i],player,event)&&lib.filter.cardRespondable(muniu.cards[i],player,event)) return true;
					}
					return false;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseButton(['木牛流马',player.getEquip(5).cards]).set('filterButton',function(button){
						var evt=_status.event.getTrigger();
						if(evt&&evt.filterCard){
							return evt.filterCard(button.link,_status.event.player,evt)&&lib.filter.cardRespondable(button.link,_status.event.player,evt);
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
						trigger.result={bool:true,card:result.links[0],cards:result.links.slice(0)};
						var muniu=player.getEquip(5);
						muniu.cards.remove(result.links[0]);
						lib.skill.muniu_skill.sync(muniu);
						player.updateMarks();
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
					var muniu=player.getEquip(5);
					if(!muniu.cards) return false;
					lib.skill.muniu_skill.sync(muniu);
					for(var i=0;i<muniu.cards.length;i++){
						if(event.filterCard(muniu.cards[i],player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('木牛流马',player.getEquip(5).cards,'hidden');
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							return evt.filterCard(button.link,player,evt);
						}
						return true;
					},
					check:function(button){
						if(button.link.name=='du') return 2;
						var player=_status.event.player;
						if(button.link.name=='xingjiegoutong'&&player.countCards('h')>1) return -2;
						if(get.select(get.info(button.link).selectTarget)[1]==-1){
							if(get.type(button.link)=='delay') return -1;
							if(get.type(button.link)=='equip'){
								var current=player.getCards('e',{subtype:get.subtype(button.link)})[0];
								if(current&&get.equipValue(current)>=get.equipValue(button.link)) return -1;
								return 1;
							}
							if(get.tag(button.link,'multitarget')) return -1;
							if(button.link.name=='huoshaolianying') return -1;
						}
						if(button.link.name=='jiu'){
							if(get.effect(player,{name:'jiu'},player)>0){
								return 1;
							}
							return -1;
						}
						return 1;
					},
					backup:function(links,player){
						return {
							prompt:'选择'+get.translation(links)+'的目标',
							filterCard:function(){return false},
							selectCard:-1,
							viewAs:links[0],
							onuse:function(result,player){
								var muniu=player.getEquip(5);
								if(muniu&&muniu.cards){
									muniu.cards.remove(result.card);
									lib.skill.muniu_skill.sync(muniu);
								}
								player.updateMarks();
							}
						}
					},
				},
				ai:{
					order:4,
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						}
					},
					useful:-1,
					value:-1
				}
			},
			muniu_skill6:{
				mark:true,
				intro:{
					content:function(storage,player){
						var muniu=player.getEquip(5);
						if(!muniu||!muniu.cards||!muniu.cards.length) return '共有〇张牌';
						if(player.isUnderControl(true)){
							return get.translation(muniu.cards);
						}
						else{
							return '共有'+get.cnNumber(muniu.cards.length)+'张牌';
						}
					},
					mark:function(dialog,storage,player){
						var muniu=player.getEquip(5);
						if(!muniu||!muniu.cards||!muniu.cards.length) return '共有〇张牌';
						if(player.isUnderControl(true)){
							dialog.addAuto(muniu.cards);
						}
						else{
							return '共有'+get.cnNumber(muniu.cards.length)+'张牌';
						}
					},
					markcount:function(storage,player){
						var muniu=player.getEquip(5);
						if(muniu&&muniu.cards) return muniu.cards.length;
						return 0;
					}
				}
			},
			muniu_skill7:{
				filter:function(){return false},
				hiddenCard:function(player,name){
					var muniu=player.getEquip(5);
					if(!muniu.cards) return false;
					lib.skill.muniu_skill.sync(muniu);
					for(var i=0;i<muniu.cards.length;i++){
						if(muniu.cards[i].name==name) return true;
					}
					return false;
				},
			},
			huogong2:{},
			jiu:{
				trigger:{player:'useCard1'},
				filter:function(event){
					return event.card&&event.card.name=='sha';
				},
				forced:true,
				charlotte:true,
				firstDo:true,
				content:function(){
					if(!trigger.baseDamage) trigger.baseDamage=1;
					trigger.baseDamage+=player.storage.jiu;
					trigger.jiu=true;
					game.addVideo('jiuNode',player,false);
					game.broadcastAll(function(player){
						player.removeSkill('jiu');
					},player);
				},
				temp:true,
				vanish:true,
				silent:true,
				popup:false,
				onremove:function(player){
					if(player.node.jiu){
						player.node.jiu.delete();
						player.node.jiu2.delete();
						delete player.node.jiu;
						delete player.node.jiu2;
					}
					delete player.storage.jiu;
				},
				ai:{
					damageBonus:true
				},
				group:'jiu2'
			},
			jiu2:{
				trigger:{player:'useCardAfter',global:'phaseAfter'},
				priority:2,
				firstDo:true,
				charlotte:true,
				filter:function(event){
					if(event.name=='useCard') return (event.card&&(event.card.name=='sha'));
					return true;
				},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					game.broadcastAll(function(player){
						player.removeSkill('jiu');
					},player);
					game.addVideo('jiuNode',player,false);
				},
			},
			guding_skill:{
				equipSkill:true,
				audio:true,
				trigger:{source:'damageBegin1'},
				filter:function(event){
					if(event.parent.name=='_lianhuan'||event.parent.name=='_lianhuan2') return false;
					if(event.card&&event.card.name=='sha'){
						if(event.player.countCards('h')==0) return true;
					}
					return false;
				},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'&&target.countCards('h')==0) return [1,-2];
						}
					}
				}
			},
			tengjia1:{
				equipSkill:true,
				trigger:{target:['useCardToBefore']},
				forced:true,
				priority:6,
				audio:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					if(event.card.name=='nanman') return true;
					if(event.card.name=='wanjian') return true;
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:player,
								card:card
							})) return;
							if(card.name=='nanman'||card.name=='wanjian') return 'zerotarget';
							if(card.name=='sha'){
								var equip1=player.getEquip(1);
								if(equip1&&equip1.name=='zhuque') return 1.9;
								if(equip1&&equip1.name=='qinggang') return 1;
								if(!card.nature) return 'zerotarget';
							}
						}
					}
				}
			},
			tengjia2:{
				equipSkill:true,
				trigger:{player:'damageBegin3'},
				filter:function(event,player){
					if(event.nature!='fire') return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				audio:true,
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'){
								if(card.nature=='fire') return 2;
								if(player.hasSkill('zhuque_skill')) return 1.9;
							}
							if(get.tag(card,'fireDamage')&&current<0) return 2;
						}
					}
				}
			},
			tengjia3:{
				equipSkill:true,
				audio:'tengjia1',
				trigger:{target:'shaBefore'},
				forced:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					if(event.card.name=='sha'&&!event.card.nature) return true;
					return false;
				},
				content:function(){
					trigger.cancel();
				},
			},
			baiyin_skill:{
				equipSkill:true,
				trigger:{player:'damageBegin4'},
				forced:true,
				audio:true,
				filter:function(event,player){
					if(event.num<=1) return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				//priority:-10,
				content:function(){
					trigger.num=1;
				}
			},
			zhuque_skill:{
				equipSkill:true,
				trigger:{player:'useCard1'},
				//priority:7,
				filter:function(event,player){
					if(event.card.name=='sha'&&!event.card.nature) return true;
				},
				audio:true,
				check:function(event,player){
					var eff=0;
					for(var i=0;i<event.targets.length;i++){
						var target=event.targets[i];
						var eff1=get.damageEffect(target,player,player);
						var eff2=get.damageEffect(target,player,player,'fire');
						eff+=eff2;
						eff-=eff1;
					}
					return eff>=0;
				},
				content:function(){
					trigger.card.nature='fire';
					player.addSkill('zhuque_skill2');
					player.storage.zhuque_skill=trigger.card;
				}
			},
			zhuque_skill2:{
				trigger:{player:'useCardAfter'},
				forced:true,
				popup:false,
				content:function(){
					delete player.storage.zhuque_skill.nature;
				}
			},
			huogon2:{},
		},
		translate:{
			jiu:'酒',
			jiu_info:'出牌阶段，对自己使用，令自己的下一张使用的【杀】造成的伤害+1（每回合限使用1次）；濒死阶段，对自己使用，回复1点体力',
			huogong:'火攻',
			tiesuo:'铁索连环',
			tiesuo_info:'出牌阶段使用，选择1至2个角色，分别横置或重置这些角色',
			huogong_bg:'攻',
			huogong_info:'目标角色展示一张手牌，然后若你能弃掉一张与所展示牌相同花色的手牌，则火攻对该角色造成1点火焰伤害。',
			tiesuo_bg:'索',
			bingliang:'兵粮寸断',
			hualiu:'骅骝',
			zhuque:'朱雀羽扇',
			bingliang_bg:'粮',
			bingliang_info:'目标角色判定阶段进行判定：若判定结果不为梅花，则跳过该角色的摸牌阶段。',
			hualiu_bg:'+马',
			hualiu_info:'你的防御距离+1',
			zhuque_bg:'扇',
			zhuque_skill:'朱雀羽扇',
			zhuque_info:'你可以将一张普通【杀】当具火焰伤害的【杀】使用。',
			guding:'古锭刀',
			guding_info:'锁定技，当你使用【杀】对目标角色造成伤害时，若其没有手牌，此伤害+1。',
			guding_skill:'古锭刀',
			tengjia:'藤甲',
			tengjia_info:'锁定技，【南蛮入侵】、【万箭齐发】和普通【杀】对你无效。你每次受到火焰伤害时，该伤害+1。',
			tengjia1:'藤甲',
			tengjia2:'藤甲',
			tengjia3:'藤甲',
			baiyin:'白银狮子',
			baiyin_info:'锁定技，你每次受到伤害时，最多承受1点伤害（防止多余的伤害）；当你失去装备区里的【白银狮子】时，你回复1点体力。',
			baiyin_skill:'白银狮子',
			
			muniu:'木牛流马',
			muniu_bg:'牛',
			muniu_skill:'木牛',
			muniu_skill2:'流马',
			muniu_skill3:'流马',
			muniu_skill4:'流马',
			muniu_skill6:'木牛流马',
			muniu_skill6_bg:'辎',
			muniu_skill4_backup:'流马',
			muniu_info:'出牌阶段限一次，你可以将一张手牌扣置于你装备区里的【木牛流马】下，若如此做，你可以将此装备移动到一名其他角色的装备区里；你可以将此装备牌下的牌如手牌般使用或打出。',
			muniu_skill_info:'出牌阶段限一次，你可以将一张手牌扣置于你装备区里的【木牛流马】下，若如此做，你可以将此装备移动到一名其他角色的装备区里；你可以将此装备牌下的牌如手牌般使用或打出。',
		},
		list:[
			["heart",4,"sha","fire"],
			["heart",7,"sha","fire"],
			["heart",10,"sha","fire"],
			["diamond",4,"sha","fire"],
			["diamond",5,"sha","fire"],
			["spade",4,"sha","thunder"],
			["spade",5,"sha","thunder"],
			["spade",6,"sha","thunder"],
			["spade",7,"sha","thunder"],
			["spade",8,"sha","thunder"],
			["club",5,"sha","thunder"],
			["club",6,"sha","thunder"],
			["club",7,"sha","thunder"],
			["club",8,"sha","thunder"],
			["heart",8,"shan"],
			["heart",9,"shan"],
			["heart",11,"shan"],
			["heart",12,"shan"],
			["diamond",6,"shan"],
			["diamond",7,"shan"],
			["diamond",8,"shan"],
			["diamond",10,"shan"],
			["diamond",11,"shan"],
			["heart",5,"tao"],
			["heart",6,"tao"],
			["diamond",2,"tao"],
			["diamond",3,"tao"],
			["diamond",9,"jiu"],
			["spade",3,"jiu"],
			["spade",9,"jiu"],
			["club",3,"jiu"],
			["club",9,"jiu"],

			["diamond",13,"hualiu"],
			["club",1,"baiyin"],
			["spade",2,"tengjia"],
			["club",2,"tengjia",'fire'],
			["spade",1,"guding"],
			["diamond",1,"zhuque"],

			["heart",2,"huogong"],
			["heart",3,"huogong"],
			["diamond",12,"huogong"],
			["spade",11,"tiesuo"],
			["spade",12,"tiesuo"],
			["club",10,"tiesuo"],
			["club",11,"tiesuo"],
			["club",12,"tiesuo"],
			["club",13,"tiesuo"],
			["heart",13,"wuxie"],
			["heart",13,"wuxie"],
			["spade",13,"wuxie"],
			["spade",10,"bingliang"],
			["club",4,"bingliang"],
			
			['diamond',5,'muniu'],
		],
	}
});
