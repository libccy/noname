'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'ddd',
		connect:true,
		character:{
			ddd_handang:["male","wu",4,["dddxianxi"]],
			ddd_wuzhi:["male","wei",3,["dddlingyong","dddxuxiao"]],
			ddd_xujing:["male","shu",3,["dddxuyu","dddshijian"]],
			ddd_caomao:["male","wei",3,["dddtaisi","dddquche","dddqianlong"],["zhu"]],
			ddd_xinxianying:["female","wei",3,["ddddongcha","dddzhijie"]],
			ddd_xianglang:["male","shu",3,["dddqiahua","dddfusi","dddtuoji"]],
			ddd_yujin:['male','wei',4,['dddzhengjun']],
			ddd_liuye:['male','wei',3,['dddchashi','dddqice']],
			ddd_baosanniang:['female','shu',3,['dddzhilian','dddjijian']],
			ddd_zhenji:['female','wei',3,['dddmiaoxing','dddfushi']],
			ddd_zhaoang:['male','wei',4,['dddfenji']],
			ddd_zhouchu:['male','wu',5,['dddxiaheng']],
			ddd_liuba:['male','shu',3,['dddfengzheng','dddyulv']],
			ddd_jianshuo:['male','qun',4,['dddfenye','dddshichao']],
			ddd_guanning:['male','qun',3,['dddyouxue','dddchengjing']],
			ddd_dingfeng:['male','wu',4,['dddduanbing']],
			ddd_caoshuang:['male','wei',5,['dddzhuanshe','dddweiqiu']],
			ddd_xuelingyun:['female','wei',3,['dddlianer','dddanzhi']],
			ddd_liuhong:['male','qun',4,['dddshixing','ddddanggu']],
			ddd_xiahouxuan:['male','wei',3,['dddlanghuai','dddxuanlun']],
			ddd_zhangkai:['male','qun','3/4',['dddjiexing','dddbailei']],
		},
		characterFilter:{},
		characterSort:{},
		skill:{
			dddzhilian:{
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					var targets=game.filterPlayer2(function(current){
						return current.getHistory('useCard').length>0;
					});
					return targets.length==2&&!targets.some(target=>!target.isIn());
				},
				content:function(){
					'step 0'
					var targets=game.filterPlayer(function(current){
						return current.getHistory('useCard').length>0;
					}).sortBySeat(trigger.player);
					event.targets=targets;
					var choices=['摸牌'];
					var prompt2='令';
					for(var i=0;i<2;i++){
						if(targets[i]==player) prompt2+='你';
						else prompt2+=get.translation(targets[i]);
						if(i==0) prompt2+='和'
					}
					prompt2+='各摸一张牌';
					if(targets.some(target=>target.countCards('he')>0)){
						prompt2+='或各弃置一张牌';
						choices.push('弃牌');
					}
					player.chooseControl(choices,'cancel2').set('prompt',get.prompt('dddzhilian')).set('prompt2',prompt2).set('ai',function(){
						var player=_status.event.player;
						var targets=_status.event.getParent().targets.slice(0);
						if(targets.contains(player)){
							targets.remove(player);
							if(get.attitude(player,targets[0])>0) return 0;
							if(targets[0].countCards('he')>0&&!targets[0].hasCard(card=>get.value(card,targets[0])<=0,'e')&&player.countCards('h','sha')>0) return 1;
							return 'cancel2';
						}
						else{
							var att1=get.attitude(player,targets[0]),att2=get.attitude(player,targets[1]);
							if(get.sgn(att1)!=get.sgn(att2)) return 'cancel2';
							return att1>0?0:1;
						}
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('dddzhilian',targets);
						if(result.control=='摸牌'){
							game.asyncDraw(targets);
							game.delayex();
						}
						else{
							for(var target of targets) target.chooseToDiscard('he',true);
						}
						if(!targets.contains(player)) event.finish();
					}
					else event.finish();
					'step 2'
					var cards=[];
					game.getGlobalHistory('cardMove',function(evt){
						if((evt.name=='lose'&&evt.position==ui.discardPile)||evt.name=='cardsDiscard') cards.addArray(evt.cards);
					});
					cards=cards.filter(card=>card.name=='sha'&&get.position(card,true)=='d');
					if(cards.length>0) player.gain(cards,'gain2');
				}
			},
			dddjijian:{
				enable:'phaseUse',
				usable:1,
				filter:(event,player)=>game.hasPlayer(current=>lib.skill.dddjijian.filterTarget(null,player,current)),
				filterTarget:(card,player,target)=>(target!=player&&target.hasSex('male')&&target.countCards('h')>0),
				content:function(){
					'step 0'
					target.chooseCard('h',true,[1,2],'请展示一至两张手牌').set('ai',function(card){
						var player=_status.event.player,source=_status.event.getParent().player;
						if(get.attitude(source,player)<=0) return -get.value(card);
						var name=get.name(card),color=get.color(card);
						if(name=='sha'||player.getUseValue(card)<=0||player.hasCard(card2=>{
							return card2!=card&&!ui.selected.cards.contains(card2)&&get.name(card2)==name;
						})){
							if(!ui.selected.cards.length&&color=='black') return 1+Math.random();
							return Math.random();
						}
						if(!ui.selected.cards.length||get.color(ui.selected.cards[0]=='red')){
							if(color=='black') return 0.2-player.getUseValue(card)/100+Math.random();
						}
						return 0.1-player.getUseValue(card)/100;
					});
					'step 1'
					if(result.bool){
						var cards=result.cards;
						event.cards=cards;
						target.showCards(cards,get.translation(player)+'对'+get.translation(target)+'发动了【赍剑】');
						if(!player.hasCard(card=>{
							if(_status.connectMode) return true;
							return get.name(card,player)=='sha';
						},'h')) event.finish();
					}
					else event.finish();
					'step 2'
					var colors=[];
					for(var card of cards) colors.add(get.color(card,target));
					colors.sort();
					var str='若你给出的【杀】为'
					for(var i=0;i<colors.length;i++){
						str+=get.translation(colors[i]);
						if(i<colors.length-1) str+='或';
					}
					str+='，则其获得后续增益效果'
					player.chooseCard(
						'h',(card,player)=>get.name(card,player)=='sha',
						'是否交给'+get.translation(target)+'一张【杀】？',str
					).set('colors',colors).set('ai',function(card){
						var player=_status.event.player,target=_status.event.getParent().target;
						if(get.attitude(player,target)<0) return false;
						if(!_status.event.colors.contains(get.color(card,player))) return 0;
						if(card.nature) return 1.2;
						return 1;
					})
					'step 3'
					if(result.bool){
						player.give(result.cards,target,'giveAuto');
						var num=0,color=get.color(result.cards[0],player);
						for(var card of cards){
							if(get.color(card,target)==color) num++;
						}
						if(!num) event.finish();
						else event.num=num;
					}
					else event.finish();
					'step 4'
					var cards=target.getCards('h');
					cards.removeArray(event.cards);
					var names=[];
					for(var card of cards){
						var name=get.name(card,target),type=get.type(card);
						if(type!='basic'&&type!='trick') continue;
						if(name=='sha'){
							var nature=get.nature(card,target);
							if(nature&&lib.nature.contains(nature)) name+=('|'+nature);
						}
						names.push(name);
					}
					if(!names.length) event.finish();
					else event.names=names;
					'step 5'
					event.num--;
					target.chooseButton([
						'是否视为使用一张牌？',
						[event.names.map(name=>{
							if(name.indexOf('sha|')==0){
								return ['基本','','sha',name.slice(4)];
							}
							return [get.type(name),'',name];
						}),'vcard']
					]).set('filterButton',function(button){
						var card={
							name:button.link[2],
							nature:button.link[3],
							isCard:true,
						},player=_status.event.player;
						return player.hasUseTarget(card);
					}).set('ai',function(button){
						var card={
							name:button.link[2],
							nature:button.link[3],
							isCard:true,
						},player=_status.event.player;
						return player.getUseValue(card);
					});
					'step 6'
					if(result.bool){
						var card={
							name:result.links[0][2],
							nature:result.links[0][3],
							isCard:true,
						}
						target.chooseUseTarget(card,true,false);
						if(event.num>0){
							var name=card.name;
							if(name=='sha'&&lib.nature.contains(card.nature)) name=(card.name+'|'+card.nature);
							event.names.remove(name);
							if(event.names.length>0) event.goto(5);
						}
					}
					else event.finish();
				},
				ai:{
					order:4,
					result:{
						player:function(player,target){
							if(get.attitude(player,target)>0&&player.hasCard(card=>get.name(card)=='sha','h')) return target.countCards('h');
							return 0.1/target.countCards('h');
						},
					},
				},
			},
			dddzhengjun:{
				trigger:{
					global:['loseAfter','equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					var boolh=!player.hasSkill('dddzhengjun_handcard',null,false,false),boole=(!player.hasSkill('dddzhengjun_equip')&&player.canMoveCard(null,true));
					var hs=player.countCards('h'),es=player.countCards('e');
					return game.hasPlayer(function(current){
						if(player==current) return false;
						if(boolh&&current.countCards('h')==hs){
							var num=event.getl(current).hs.length;
							if(event.getg) num-=event.getg(current).length;
							if(num!=0) return true;
						}
						if(boole&&current.countCards('e')==es){
							var num=event.getl(current).es.length;
							if(event.name=='equip'&&current==event.player) num--;
							if(num!=0) return true;
						}
						return false;
					});
				},
				direct:true,
				content:function(){
					'step 0'
					var boolh=!player.hasSkill('dddzhengjun_handcard',null,false,false),hs=player.countCards('h');
					if(boolh&&game.hasPlayer(function(current){
						if(player==current) return false;
						if(boolh&&current.countCards('h')==hs){
							var num=trigger.getl(current).hs.length;
							if(trigger.getg) num-=trigger.getg(current).length;
							if(num!=0) return true;
						}
						return false;
					})){
						player.chooseTarget('整军：是否令一名角色摸一张牌？').set('ai',function(target){
							var player=_status.event.player;
							return get.effect(target,{name:'wuzhong'},player,player);
						});
					}
					else event.goto(2);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dddzhengjun',target);
						player.addTempSkill('dddzhengjun_handcard','phaseUseAfter');
						target.draw();
					}
					'step 2'
					var boole=(!player.hasSkill('dddzhengjun_equip')&&player.canMoveCard(null,true)),es=player.countCards('h');
					if(boolh&&game.hasPlayer(function(current){
						if(player==current) return false;
						if(boole&&current.countCards('e')==es){
							var num=trigger.getl(current).es.length;
							if(trigger.name=='equip'&&trigger==event.player) num--;
							if(num!=0) return true;
						}
						return false;
					})){
						player.chooseBool('整军：是否移动场上的一张装备牌？').set('ai',function(){
							return _status.event.player.canMoveCard(true,true);
						})
					}
					else event.finish();
					'step 3'
					if(result.bool){
						player.logSkill('dddzhengjun');
						player.addTempSkill('dddzhengjun_equip','phaseUseAfter');
						player.moveCard(true).set('nojudge',true);
					}
				},
				group:'dddzhengjun_hp',
				subSkill:{
					equip:{charlotte:true},
					handcard:{charlotte:true},
					hp:{
						trigger:{global:['damageEnd','loseHpEnd','recoverEnd']},
						direct:true,
						filter:function(event,player){
							if(player==event.player||player.hp!=event.player.hp) return false;
							if(event.hujia&&event.hujia==event.num) return false;
							if(!game.hasPlayer(current=>current.isDamaged())) return false;
							var evt=event.getParent('phaseUse');
							if(!evt||evt.player!=player) return false;
							return !player.hasHistory('useSkill',function(evt){
								if(evt.skill=='dddzhengjun_hp'){
									if(evt.event.getParent('phaseUse')==event) return true;
								}
								return false;
							});
						},
						content:function(){
							'step 0'
							player.chooseTarget('整军：是否令一名角色回复1点体力？',function(card,player,target){
								return target.isDamaged();
							}).set('ai',function(target){
								var player=_status.event.player;
								return get.recoverEffect(target,player,player);
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('dddzhengjun_hp',target);
								target.recover();
							}
						}
					},
				},
			},
			dddxianxi:{
				trigger:{
					player:"useCard2",
				},
				direct:true,
				filter:function(event,player){
					if(event.card.name!='sha'||!player.isPhaseUsing()) return false;
					return game.hasPlayer(function(current){
						return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current);
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(
						get.prompt('dddxianxi'),
						'为'+get.translation(trigger.card)+'增加任意个目标',
						function(card,player,target){
							var event=_status.event.getTrigger();
							return !event.targets.contains(target)&&lib.filter.targetEnabled2(event.card,player,target);
						},
						[1,Infinity]
					).set('ai',function(target){
						var evt=_status.event.getTrigger();
						if(get.damageEffect(target,evt.player,evt.player)<0) return 0;
						return get.effect(target,evt.card,evt.player,evt.player);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						event.targets=targets;
						if(!event.isMine()&&!event.isOnline()) game.delayx();
					}
					else event.finish();
					'step 2'
					player.logSkill('dddxianxi',targets);
					trigger.targets.addArray(targets);
					if(!trigger._dddxianxi_map) trigger._dddxianxi_map={};
					trigger._dddxianxi_map[player.playerid]=targets.slice(0);
					player.addTempSkill('dddxianxi_delay');
				},
				subSkill:{
					delay:{
						charlotte:true,
						trigger:{
							player:"useCardAfter",
						},
						forced:true,
						filter:function(event,player){
							if(!event._dddxianxi_map||!event._dddxianxi_map[player.playerid]) return false;
							for(var target of event._dddxianxi_map[player.playerid]){
								if(!target.hasHistory('damage',function(evt){
									return evt.card==event.card;
								})) return true;
							}
							return false;
						},
						content:function(){
							'step 0'
							var targets=trigger._dddxianxi_map[player.playerid].filter(function(target){
								return !target.hasHistory('damage',function(evt){
									return evt.card==trigger.card;
								});
							}).sortBySeat();
							event.targets=targets;
							var num=targets.length;
							player.chooseToDiscard('he',num,'险袭：选择弃置'+get.cnNumber(num)+'张牌','然后对'+get.translation(targets)+'各造成1点伤害。或点击「取消」，改为摸'+get.cnNumber(num)+'张牌并失去1点体力').set('ai',function(card){
								return 7-get.value(card);
							})
							'step 1'
							if(result.bool){
								for(var i of targets){
									player.line(i);
									i.damage();
								}
							}
							else{
								player.draw(targets.length);
								player.loseHp();
							}
						},
						sub:true,
					},
				},
			},
			dddlingyong:{
				trigger:{
					global:["phaseZhunbeiSkipped","phaseZhunbeiCancelled","phaseDrawSkipped","phaseDrawCancelled","phaseJudgeSkipped","phaseJudgeCancelled","phaseUseSkipped","phaseUseCancelled","phaseDiscardSkipped","phaseDiscardCancelled","phaseJieshuSkipped","phaseJieshuCancelled"],
				},
				frequent:true,
				content:function (){
					'step 0'
					player.judge(function(card){
						var name=get.name(card,false);
						if(name=='sha') return -2;
						return 2;
					}).set('callback',function(){
						if(event.judgeResult.name!='sha'){
							var card=event.judgeResult.card;
							if(get.position(card,true)=='o') player.chooseUseTarget(card);
						}
					}).judge2=function(result){
						return result.bool;
					};
					'step 1'
					if(result.bool){
						player.chooseBool('是否继续进行【灵涌】判定？').set('frequentSkill','dddlingyong');
					}
					else event.finish();
					'step 2'
					if(result.bool) event.goto(0);
				},
			},
			"dddxuxiao":{
				trigger:{
					global:["loseAfter","loseAsyncAfter"],
				},
				direct:true,
				filter:function (event,player){
					if(event.type!='discard') return false;
					var cards=event.getd();
					for(var i of cards){
						if(get.position(i,true)=='d'&&get.color(i,false)=='black'&&get.type(i,null,true)=='basic'){
							var card=get.autoViewAs({name:'bingliang'},[i]);
							if(game.hasPlayer(function(current){
								return current.canAddJudge(card);
							})) return true;
						}
					}
					return false;
				},
				content:function (){
					'step 0'
					if(!event.cards) event.cards=[];
					var cards=trigger.getd().filter(function(i){
						if(!event.cards.contains(i)&&get.position(i,true)=='d'&&get.color(i,false)=='black'&&get.type(i,null,true)=='basic'){
							var card=get.autoViewAs({name:'bingliang'},[i]);
							if(game.hasPlayer(function(current){
								return current.canAddJudge(card);
							})) return true;
						}
						return false;
					});
					if(cards.length){
						player.chooseButton([get.prompt('dddxuxiao'),cards]);
					}
					else event.finish();
					'step 1'
					if(result.bool){
						var card=result.links[0];
						event.cards.push(card);
						event.card=card;
						player.chooseTarget(true,'请选择【兵粮寸断】的目标','将'+get.translation(card)+'置于一名角色的判定区内，然后其摸两张牌',function(card,player,target){
							var card=get.autoViewAs({name:'bingliang'},[_status.event.card]);
							return target.canAddJudge(card);
						}).set('card',card).set('ai',function(target){
							var card=get.autoViewAs({name:'bingliang'},[_status.event.card]),player=_status.event.player;
							return get.attitude(player,target)+Math.max(0,get.effect(target,card,player,player))
						})
					}
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dddxuxiao',target);
						target.addJudge({name:'bingliang'},[card]);
						target.draw(2);
						event.goto(0);
					}
				},
			},
			dddxuyu:{
				trigger:{
					player:"useCardAfter",
				},
				filter:function (event,player){
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=player) return false;
					return player.getHistory('useCard',function(evtx){
						return evtx.getParent('phaseUse')==evt;
					},event).length==1;
				},
				content:function (){
					player.draw(2);
					player.addTempSkill('dddxuyu_discard','phaseUseAfter');
				},
				subSkill:{
					discard:{
						trigger:{
							player:"useCardAfter",
						},
						filter:function (event,player){
							if(!player.countCards('he')) return false;
							var evt=event.getParent('phaseUse');
							if(!evt||evt.player!=player) return false;
							return player.getHistory('useCard',function(evtx){
								return evtx.getParent('phaseUse')==evt;
							},event).length==2;
						},
						forced:true,
						charlotte:true,
						content:function (){
							player.chooseToDiscard('he',true);
						},
						sub:true,
					},
				},
			},
			dddshijian:{
				trigger:{
					global:"useCardAfter",
				},
				filter:function (event,player){
					if(player==event.player) return false;
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=event.player) return false;
					return event.player.getHistory('useCard',function(evtx){
						return evtx.getParent('phaseUse')==evt;
					},event).length==3;
				},
				logTarget:"player",
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				content:function (){
					trigger.player.draw();
					player.addTempSkill('dddshijian_draw','phaseUseAfter');
				},
				subSkill:{
					draw:{
						trigger:{
							global:"useCardAfter",
						},
						filter:function (event,player){
							if(!event.player.countCards('he')) return false;
							var evt=event.getParent('phaseUse');
							if(!evt||evt.player!=event.player) return false;
							return event.player.getHistory('useCard',function(evtx){
								return evtx.getParent('phaseUse')==evt;
							},event).length==4;
						},
						forced:true,
						charlotte:true,
						content:function (){
							player.draw(2);
						},
						sub:true,
					},
				},
			},
			dddtaisi:{
				trigger:{
					global:"phaseEnd",
				},
				direct:true,
				filter:function (event,player){
					if(!game.getGlobalHistory('changeHp').some(evt=>evt.player==player)) return false;
					return game.getGlobalHistory('cardMove').some(function(evt){
						if(evt.name!='cardsDiscard'){
							if(evt.name!='lose'||evt.position!=ui.discardPile) return false;
						}
						return evt.cards.some(card=>get.position(card,true)=='d');
					});
				},
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt('dddtaisi'),'你可以令一名角色获得一张于本回合内进入弃牌堆的牌。若该角色于本回合内对你造成过伤害，则你摸两张牌。').set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(player.hasHistory('damage',evt=>evt.source==target)) return 10+att;
						return att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dddtaisi',target);
						event.target=target;
					}
					else event.finish();
					'step 2'
					var cards=[];
					game.getGlobalHistory('cardMove',function(evt){
						if(evt.name!='cardsDiscard'){
							if(evt.name!='lose'||evt.position!=ui.discardPile) return false;
						}
						cards.addArray(evt.cards.filter(card=>get.position(card,true)=='d'));
					});
					if(!cards.length) event.finish();
					else if(cards.length==1) event._result={bool:true,links:cards};
					else player.chooseButton(['令'+get.translation(target)+'获得一张牌',cards],true).set('ai',function(button){
						var player=_status.event.player,target=_status.event.getParent().target;
						var att=get.attitude(player,target)-0.1;
						return get.sgn(att)*get.value(button.link,target);
					});
					'step 3'
					if(result.bool){
						target.gain(result.links,'gain2');
					}
					else event.finish();
					'step 4'
					if(player.hasHistory('damage',evt=>evt.source==target)) player.draw(2);
				},
			},
			dddquche:{
				enable:"phaseUse",
				limited:true,
				skillAnimation:true,
				animationColor:"thunder",
				filter:function (event,player){
					return player.hasCard({color:'red'},'he');
				},
				filterCard:{
					color:"red",
				},
				filterTarget:function (card,player,target){
				return player!=target;
			},
				discard:false,
				delay:false,
				lose:false,
				content:function (){
					'step 0'
					event.count=1;
					player.awakenSkill('dddquche');
					player.addTempSkill('dddquche_effect');
					player.addMark('dddquche_effect',1,false);
					player.give(cards,target);
					event.goto(3);
					'step 1'
					if(player.hasCard(function(card){
						if(_status.connectMode&&get.position(card)=='h') return true;
						return get.color(card)=='red';
					},'he')){
						player.chooseCardTarget({
							prompt:'是否将一张红色牌交给一名其他角色？',
							filterCard:{color:'red'},
							filterTarget:lib.filter.notMe,
							position:'he',
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						player.addMark('dddquche_effect',1,false);
						player.give(result.cards,result.targets[0]);
					}
					else event.finish();
					'step 3'
					if(player.hasCard(function(card){
						if(_status.connectMode&&get.position(card)=='h') return true;
						return get.color(card)=='black';
					},'hes')){
						player.chooseCardTarget({
							prompt:'是否将一张黑色牌当做【杀】使用？',
							position:'he',
							filterCard:function(card,player){
								if(get.color(card)!='black') return false;
								var card=get.autoViewAs({name:'sha'},[card]);
								return lib.filter.cardEnabled(card,player);
							},
							selectTarget:function(){
								var card=get.autoViewAs({name:'sha'},ui.selected.cards);
								return lib.filter.selectTarget(card,_status.event.player);
							},
							filterTarget:function(card,player,target){
								var card=get.autoViewAs({name:'sha'},ui.selected.cards);
								return lib.filter.targetEnabled(card,player,target)&&lib.filter.targetInRange(card,player,target);
							},
						});
					}
					else event.finish();
					'step 4'
					if(result.bool){
						player.addMark('dddquche_effect',1,false);
						player.useCard({name:'sha'},result.cards,result.targets,false);
						event.goto(1);
					}
					else event.finish();
				},
				subSkill:{
					effect:{
						charlotte:true,
						onremove:true,
						mod:{
							globalFrom:function (from,to,distance){
								return distance-from.countMark('dddquche_effect');
							},
						},
						intro:{
							content:"至其他角色的距离-#",
						},
						sub:true,
					},
				},
				mark:true,
				intro:{
					content:"limited",
				},
				init:function (player,skill){
					player.storage[skill]=false;
				},
			},
			dddqianlong:{
				zhuSkill:true,
				trigger:{
					source:"dieAfter",
				},
				forced:true,
				filter:(event,player)=>player.hasZhuSkill('dddqianlong'),
				content:function (){
					player.draw(3);
				},
				group:"dddqianlong_cancel",
				subSkill:{
					cancel:{
						trigger:{
							player:["drawBefore","discardBefore"],
						},
						forced:true,
						popup:false,
						filter:function (event,player){
							if(!player.hasZhuSkill('dddqianlong')) return false;
							var evt=event.getParent();
							return evt&&evt.name=='die'&&evt.source==player;
						},
						content:function (){
							trigger.cancel();
						},
						sub:true,
					},
				},
			},
			ddddongcha:{
				trigger:{
					global:"phaseBegin",
				},
				logTarget:"player",
				filter:function (event,player){
					return player!=event.player&&player.countCards('h')>0&&event.player.countCards('h')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.player)<=0;
				},
				content:function (){
					'step 0'
					event.target=trigger.player;
					player.addTempSkill('ddddongcha_effect');
					if(player.countCards('h')>0) player.chooseCard('h',true,'选择一张牌作为“鉴”');
					'step 1'
					if(result.bool){
						player.addToExpansion(result.cards,player,'give').gaintag.add('ddddongcha_effect');
					}
					'step 2'
					if(target.countCards('h')>0) target.chooseCard('h',true,'选择一张牌作为“鉴”');
					'step 3'
					if(result.bool){
						player.addToExpansion(result.cards,target,'give').gaintag.add('ddddongcha_effect');
					}
				},
				subSkill:{
					effect:{
						charlotte:true,
						trigger:{
							global:"phaseEnd",
						},
						forced:true,
						filter:function (event,player){
							return player.getExpansions('ddddongcha_effect').length>0;
						},
						content:function (){
							'step 0'
							var cards=player.getExpansions('ddddongcha_effect');
							if(cards.length>0){
								if(cards.length==1) event._result={bool:true,links:cards};
								else player.chooseButton(['选择获得一张“鉴”',cards],true);
							}
							else event.finish();
							'step 1'
							if(result.bool) player.gain(result.links,'gain2');
							'step 2'
							var cards=player.getExpansions('ddddongcha_effect');
							if(cards.length>0&&trigger.player.isIn()){
								if(cards.length==1) event._result={bool:true,links:cards};
								else trigger.player.chooseButton(['选择获得一张“鉴”',cards],true).set('ai',function(button){
									return get.value(button.link,_status.event.player);
								})
							}
							else event.finish();
							'step 3'
							if(result.bool) trigger.player.gain(result.links,player,'give');
						},
						marktext:"鉴",
						intro:{
							content:"expansion",
							markcount:"expansion",
						},
						sub:true,
					},
				},
			},
			dddzhijie:{
				enable:"chooseToUse",
				filter:function (event,player){
					if(event.type=='phase') return false;
					var cards=player.getExpansions('ddddongcha_effect');
					if(cards.length<2) return false;
					var shan=false,wuxie=false;
					for(var i=0;i<cards.length;i++){
						for(var j=i+1;j<cards.length;j++){
							if(get.color(cards[i],false)==get.color(cards[j],false)) shan=true;
							else wuxie=true;
						}
					}
					if(shan&&event.filterCard({name:'shan'},player,event)) return true;
					if(wuxie&&event.filterCard({name:'wuxie'},player,event)) return true;
					return false;
				},
				hiddenCard:function (player,name){
					if(name!='shan'&&name!='wuxie') return false;
					var cards=player.getExpansions('ddddongcha_effect');
					if(cards.length<2) return false;
					var shan=false,wuxie=false;
					for(var i=0;i<cards.length;i++){
						for(var j=i+1;j<cards.length;j++){
							if(get.color(cards[i],false)==get.color(cards[j],false)) shan=true;
							else wuxie=true;
						}
					}
					if(shan&&name=='shan') return true;
					if(wuxie&&name=='wuxie') return true;
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						return ui.create.dialog('智解',player.getExpansions('ddddongcha_effect'),'hidden')
					},
					select:2,
					filter:function (button,player){
						if(!ui.selected.buttons.length) return true;
						var evt=_status.event.getParent(),buttons=ui.selected.buttons;
						return evt.filterCard(get.autoViewAs({
							name:(get.color(buttons[0].link)==get.color(button.link))?'shan':'wuxie',
						},[button.link,buttons[0].link]));
					},
					check:()=>1,
					backup:function (links,player){
						return {
							viewAs:{name:(get.color(links[0])==get.color(links[1]))?'shan':'wuxie'},
							cards:links,
							selectCard:-1,
							position:'x',
							filterCard:(card)=>lib.skill['dddzhijie_backup'].cards.contains(card),
							popname:true,
							precontent:function(){
								player.addTempSkill('dddzhijie_draw');
							},
						}
					},
				},
				ai:{
					combo:"ddddongcha",
					respondShan:true,
					skillTagFilter:function (player){
						return lib.skill['dddzhijie'].hiddenCard(player,'shan');
					},
					order:10,
					result:{player:1},
				},
				subSkill:{
					draw:{
						trigger:{
							player:"useCardAfter",
						},
						forced:true,
						charlotte:true,
						popup:false,
						filter:function (event,player){
							return event.skill=='dddzhijie_backup';
						},
						content:function (){
							player.draw(2);
						},
						sub:true,
					},
				},
			},
			dddqiahua:{
				trigger:{
					global:"phaseBegin",
				},
				direct:true,
				filter:function (event,player){
					return player!=event.player&&event.player.hp>0&&player.countCards('h',function(card){
						return !card.hasGaintag('dddxujing_tag');
					})>=event.player.hp;
				},
				content:function (){
					'step 0'
					var target=trigger.player;
					player.chooseCard('h',target.hp,get.prompt('dddqiahua',target),'选择'+get.cnNumber(target.hp)+'张手牌作为“明”，然后'+get.translation(target)+'获得技能〖恂恂〗直到本回合结束。',function(card){
						return !card.hasGaintag('dddxujing_tag');
					}).set('goon',get.attitude(player,target)>0).set('ai',function(card){
						if(_status.event.goon) return 1+Math.random();
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=trigger.player,cards=result.cards;
						player.logSkill('dddqiahua',target);
						target.addTempSkill('dddxunxun');
						player.addSkill('dddxujing_tag');
						player.addGaintag(result.cards,'dddxujing_tag');
						game.log(player,'选择了',cards,'作为“明”');
						player.showCards(cards,get.translation(player)+'对'+get.translation(target)+'发动了【恰化】');
						player.markSkill('dddxujing_tag');
					}
				},
				ai:{
					expose:0.15,
				},
				derivation:"dddxunxun",
			},
			dddxunxun:{
				inherit:"xunxun",
				audio:"ext:3D8测试包:2",
			},
			dddfusi:{
				mod:{
					ignoredHandcard:function (card,player){
						if(card.hasGaintag('dddxujing_tag')) return true;
					},
					cardDiscardable:function (card,player,name){
						if(name=='phaseDiscard'&&card.hasGaintag('dddxujing_tag')) return false;
					},
				},
				global:"dddfusi_global",
				subSkill:{
					refused:{
						charlotte:true,
						sub:true,
					},
					allowed:{
						charlotte:true,
						sub:true,
					},
				},
			},
			dddfusi_global:{
				mod:{
					"cardEnabled2":function (card,player){
						var source=_status.currentPhase;
						if(!source||source==player||!source.hasSkill('dddfusi')||source.countCards('h')==0||source.hasCard('h',function(card){
							return !card.hasGaintag('dddxujing_tag');
						})) return;
						if(player.getCards('h').contains(card)) return false;
					},
				},
				enable:"chooseToUse",
				filter:function (event,player){
					if(event._dddfusi_refused||player.hasSkill('dddfusi_refused')) return false;
					var players=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('dddfusi');
					});
					for(var source of players){
						var cards=source.getCards('h',function(card){
							return card.hasGaintag('dddxujing_tag');
						});
						for(var i of cards){
							var card=get.autoViewAs(i);
							if(event.filterCard(card,player,event)) return true;
						}
					}
					return false;
				},
				hiddenCard:function (player,name){
					if(player.hasSkill('dddfusi_refused')) return false;
					var players=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('dddfusi');
					});
					for(var source of players){
						var cards=source.getCards('h',function(card){
							return card.hasGaintag('dddxujing_tag');
						});
						for(var i of cards){
							var card=get.autoViewAs(i);
							if(name==card.name) return true;
						}
					}
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var dialog=ui.create.dialog('腹笥','hidden');
						var players=game.filterPlayer(function(current){
							return current!=player&&current.hasSkill('dddfusi');
						}).sortBySeat();
						for(var source of players){
							var cards=source.getCards('h',function(card){
								return card.hasGaintag('dddxujing_tag');
							});
							if(cards.length){
								var str='<div class="text center">';
								str+=get.translation(source);
								var num=source.getSeatNum();
								if(num>0) str+=('（'+get.cnNumber(num,true)+'号位）');
								str+='</div>';
								dialog.add(str);
								dialog.add(cards);
							}
						}
						return dialog;
					},
					filter:function (button,player){
						var card=get.autoViewAs(button.link),evt=_status.event.getParent();
						return evt.filterCard(card,player,evt);
					},
					check:function (button){
						if(_status.event.getParent().type!='phase') return 1;
						return _status.event.player.getUseValue(get.autoViewAs(button.link),null,true);
					},
					backup:function (links,player){
						return {
							card:links[0],
							viewAs:get.autoViewAs(links[0]),
							filterCard:()=>false,
							selectCard:-1,
							precontent:function(){
								'step 0'
								var card=lib.skill['dddfusi_global_backup'].card;
								event.card=card;
								event.result.cards=[card];
								event.source=get.owner(card);
								if(!event.result.card.storage) event.result.card.storage={};
								event.result.card.storage._dddfusi_owner=event.source;
								delete event.result.skill;
								player.logSkill('dddfusi_global',event.source);
								if(player.hasSkill('dddfusi_allowed')) event.finish();
								'step 1'
								if(event.result.targets&&event.result.targets.length) player.line(event.result.targets,event.result.card.nature);
								player.showCards([card],get.translation(player)+'向'+get.translation(source)+'发动【腹笥】');
								source.chooseButton([
									'是否同意'+get.translation(player)+'使用'+get.translation(card)+'？',
									'<div class="text center">'+function(){
										if(event.result.targets&&event.result.targets.length) return '（目标角色：'+get.translation(event.result.targets)+'）';
										return '（无目标角色）';
									}()+'</div>',
									[['　　 同意 　　','　　不同意　　'],'tdnodes'],
									[['　　 同意且本回合内不再提示 　　'],'tdnodes'],
									[['　　不同意且本回合内不再提示　　'],'tdnodes'],
									'forcebutton',
								],true).set('forceAuto',true);
								'step 2'
								if(result.links[0].indexOf('不同意')==-1){
									source.chat('同意');
									if(result.links[0].indexOf('本回合内不再提示')>0) player.addTempSkill('dddfusi_allowed');
								}
								else if(result.links[0].indexOf('不同意')!=-1){
									source.chat('不同意');
									if(result.links[0].indexOf('本回合内不再提示')>0) player.addTempSkill('dddfusi_refused');
									else if(event.result.card.name=='wuxie') player.addTempSkill('dddfusi_refused','_wuxieAfter');
									var evt=event.getParent();
									evt.set('_dddfusi_refused',true);
									evt.goto(0);
								}
							},
						}
					},
					prompt:function (links,player){
						return '请选择'+get.translation(links[0])+'的目标';
					},
				},
				ai:{
					order:10,
					result:{
						player:function (player,target){
							if(!game.hasPlayer(function(current){
								return current!=player&&current.hasSkill('dddfusi')&&get.attitude(player,current)>=0;
							})) return 0;
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						},
					},
					respondSha:true,
					respondShan:true,
					skillTagFilter:function (player,tag,arg){
						var name;
						switch(tag){
							case 'respondSha':name='sha';break;
							case 'respondShan':name='shan';break;
						}
						return lib.skill['dddfusi_global'].hiddenCard(player,name);
					},
				},
			},
			dddchashi:{
				trigger:{global:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					var target=trigger.player,history=target.getHistory('useCard',function(evt){
						return evt.getParent('phaseUse')==trigger;
					});
					event.target=target;
					if(history.length>0){
						var suit=get.suit(history[0].card);
						event.suit=suit;
						player.chooseCard('he',get.prompt('dddchashi',target),'你可以展示一张牌。若此牌花色为'+get.translation(suit)+'，则'+get.translation(target)+'获得你展示的牌，然后你摸一张牌。').set('goon',get.sgn(get.attitude(player,target))).set('ai',function(card){
							if(_status.event.goon<=0) return _status.event.goon*(get.value(card)+0.01);
							return 2/Math.max(0.1,get.value(card))
						});
					}
					else event.goto(2);
					'step 1'
					if(result.bool){
						player.logSkill('dddchashi',target);
						var card=result.cards[0];
						player.showCards(card,get.translation(player)+'对'+get.translation(target)+'发动了【察势】');
						if(get.color(card)==event.suit){
							target.gain(card,player,'give');
							player.draw();
						}
					}
					event.finish();
					'step 2'
					player.chooseCard('he',get.prompt('dddchashi',target),'你可以展示一张牌。若其本阶段内使用的第一张牌与此牌花色相同，则'+get.translation(target)+'获得你展示的牌，然后你摸一张牌。').set('goon',get.sgn(get.attitude(player,target))).set('ai',function(card){
						if(_status.event.goon<=0) return _status.event.goon*(get.value(card)+0.01);
						return 2/Math.max(0.1,get.value(card))
					});
					'step 3'
					if(result.bool){
						player.logSkill('dddchashi',target);
						var card=result.cards[0];
						player.showCards(card,get.translation(player)+'对'+get.translation(target)+'发动了【察势】');
						player.addTempSkill('dddchashi_effect','phaseUseAfter');
						player.addGaintag([card],'dddchashi');
						player.storage['dddchashi']=[card,target];
						target.addTempSkill('dddchashi_ai',{player:['phaseUseAfter','useCard1']});
					}
				},
				subSkill:{
					effect:{
						trigger:{global:'useCard'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							var storage=player.getStorage('dddchashi');
							if(!storage||!storage.length) return false;
							if(event.player!=storage[1]||!event.player.isIn()) return false;
							if(!player.getCards('h').contains(storage[0])||!storage[0].hasGaintag('dddchashi')) return false;
							if(get.suit(event.card)!=get.suit(storage[0])) return false;
							var evt=event.getParent('phaseUse');
							if(evt.player)
							if(event.player.getHistory('useCard',function(evtx){
								return evtx.getParent('phaseUse')==evt;
							}).indexOf(event)!=0) return false;
							return true;
						},
						content:function(){
							var storage=player.getStorage('dddchashi');
							storage[1].gain(storage[0],player,'give');
							player.draw();
						},
						onremove:function(player,storage){
							delete player.storage['dddchashi'];
							player.removeGaintag('dddchashi');
						},
					},
					ai:{
						charlotte:true,
					},
				},
			},
			dddqice:{
				trigger:{player:'phaseZhunbeiBegin'},
				content:function(){
					player.draw(2);
					player.addTempSkill('dddqice_effect');
				},
				subSkill:{
					effect:{
						trigger:{player:'phaseJieshuBegin'},
						forced:true,
						charlotte:true,
						content:function(){
							'step 0'
							var list=[];
							player.getHistory('useCard',function(evt){
								if(get.type(evt.card)=='trick') list.add(evt.card.name);
							});
							list.sort();
							if(list.length>0){
								player.chooseButton(['齐策：是否视为使用一张牌？',[list,'vcard']],function(button){
									return _status.event.player.hasUseTarget({name:button.link[2],isCard:true});
								}).set('ai',function(button){
									var card={
										name:button.link[2],
										nature:button.link[3],
										isCard:true,
									},player=_status.event.player;
									return player.getUseValue(card);
								});
							}
							else{
								game.log(player,'失去了技能','#g【齐策】');
								player.removeSkill('dddqice');
								event.finish();
							}
							'step 1'
							if(result.bool){
								player.chooseUseTarget(true,{
									name:result.links[0][2],
									isCard:true,
								});
							}
						},
					},
				},
			},
			//甄姬
			dddmiaoxing:{
				audio:2,
				trigger:{global:'gameDrawBegin'},
				forced:true,
				content:function(){
					var me=player;
					var numx=trigger.num;
					trigger.num=typeof numx=='function'?function(player){
						if(player==me){
							return 3*numx(player);
						}
						return numx(player);
					}:function(player){
						if(player==me){
							return 3*numx;
						}
						return numx;
					}
					player._dddmiaoxing=true;
				},
				group:['dddmiaoxing_out','dddmiaoxing_balance'],
				marktext:'水',
				intro:{
					name:'水相',
					markcount:function(storage,player){
						return ''+player.getExpansions('dddmiaoxing_1').length+'/'+player.getExpansions('dddmiaoxing_2').length;
					},
					mark:function(dialog,content,player){
						var content1=player.getExpansions('dddmiaoxing_1');
						var content2=player.getExpansions('dddmiaoxing_2');
						if(content1&&content1.length||content2&&content2.length){
							if(player==game.me||player.isUnderControl()){
								dialog.addText('第一组');
								dialog.addAuto(content1);
								dialog.addText('第二组');
								dialog.addAuto(content2);
							}
							else{
								return '第一组“水相”有'+get.cnNumber(content1.length)+'张；'+'第二组“水相”有'+get.cnNumber(content2.length)+'张';
							}
						}
					}
				},
				subSkill:{
					out:{
						trigger:{
							global:'phaseBefore',
						},
						forced:true,
						filter:function(event,player){
							return game.phaseNumber==0&&player._dddmiaoxing;
						},
						content:function(){
							'step 0'
							delete player._dddmiaoxing;
							var cardsx=player.getCards('h'),num=Math.ceil(cardsx.length/3);
							var cards=[cardsx.slice(0,num),cardsx.slice(num,2*num),cardsx.slice(2*num)];
							event.cards=cards;
							player.chooseControl('第一组','第二组','第三组').set('dialog',[
								'淼形：选择一组作为你的手牌',
								'<span class="text center">第一组</span>',
								cards[0],
								'<span class="text center">第二组</span>',
								cards[1],
								'<span class="text center">第三组</span>',
								cards[2]
							]);
							'step 1'
							event.cards.splice(result.index,1);
							var cards=event.cards;
							player.addToExpansion(cards[0],player,'giveAuto',false).gaintag.add('dddmiaoxing_1');
							player.addToExpansion(cards[1],player,'giveAuto').gaintag.add('dddmiaoxing_2');
							player.markSkill('dddmiaoxing');
						}
					},
					balance:{
						trigger:{player:'phaseDrawAfter'},
						forced:true,
						content:function(){
							'step 0'
							var forced=player.getExpansions('dddmiaoxing_1').length!=player.countCards('h')&&
							player.getExpansions('dddmiaoxing_2').length!=player.countCards('h');
							var next=player.chooseButton([1,2],[
								'淼形：将至少一组“水相”调整至与手牌数相等',
								[['第一组','第二组'],'tdnodes'],
								'<span class="text center">第一组</span>',
								player.getExpansions('dddmiaoxing_1'),
								'<span class="text center">第二组</span>',
								player.getExpansions('dddmiaoxing_2'),
							],forced);
							next.set('filterButton',button=>{
								var type=typeof button.link;
								return type!='object';
							})
							next.set('ai',button=>{
								var player=_status.event.player;
								var ind=['第一组','第二组'].indexOf(button.link)+1;
								if(ind==-1) return -100;
								return player.countCards('h')-player.getExpansions('dddmiaoxing_'+ind).length;
							})
							'step 1'
							if(result.bool){
								var choices=result.links;
								event.choices=choices;
								// var hs=result.moved[0],sx1=result.moved[1],sx2=result.moved[2];
								// hs.removeArray(player.getCards('h'));
								// sx1.removeArray(player.getExpansions('dddmiaoxing_1'));
								// sx2.removeArray(player.getExpansions('dddmiaoxing_2'));
								// if(!hs.length&&!sx1.length&&!sx2.length) return;
								// player.gain(hs,'gain2');
								// player.addToExpansion(sx1,player,'giveAuto').gaintag.add('dddmiaoxing_1');
								// player.addToExpansion(sx2,player,'giveAuto').gaintag.add('dddmiaoxing_2');
							}
							else event.finish();
							'step 2'
							if(event.choices.contains('第一组')){
								var del=player.countCards('h')-player.getExpansions('dddmiaoxing_1').length;
								if(del>=0){
									if(del!=0) player.addToExpansion(get.cards(del),player,'draw').gaintag.add('dddmiaoxing_1');
									event.goto(4);
								}
								else{
									player.chooseButton(['淼形：移除'+get.cnNumber(-del)+'张第一组的“水相”',player.getExpansions('dddmiaoxing_1')],-del,true).set('ai',button=>{
										return -get.buttonValue(button);
									});
								}
							}
							'step 3'
							if(result.bool){
								player.loseToDiscardpile(result.links);
							}
							'step 4'
							player.markSkill('dddmiaoxing');
							if(event.choices.contains('第二组')){
								var del=player.countCards('h')-player.getExpansions('dddmiaoxing_2').length;
								if(del>=0){
									if(del!=0) player.addToExpansion(get.cards(del),player,'draw').gaintag.add('dddmiaoxing_2');
									event.goto(6);
								}
								else{
									player.chooseButton(['淼形：移除'+get.cnNumber(-del)+'张第二组的“水相”',player.getExpansions('dddmiaoxing_2')],-del,true).set('ai',button=>{
										return -get.buttonValue(button);
									});
								}
							}
							'step 5'
							if(result.bool){
								player.loseToDiscardpile(result.links);
							}
							'step 6'
							player.markSkill('dddmiaoxing');
						}
					}
				}
			},
			dddfushi:{
				audio:2,
				trigger:{player:['useCardAfter','respondAfter']},
				filter:function(event,player){
					return get.type(event.card)=='basic'&&!player.hasSkill('dddfushi_used');
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseControl('第一组','第二组','cancel2').set('dialog',[
						get.prompt('dddfushi'),
						'<span class="text center">用所有手牌交换一组“水相”</span>',
						'<span class="text center">第一组</span>',
						player.getExpansions('dddmiaoxing_1'),
						'<span class="text center">第二组</span>',
						player.getExpansions('dddmiaoxing_2'),
					]).set('ai',()=>{
						return _status.event.choice;
					}).set('choice',function(){
						var fn=player==_status.currentPhase?'useful':'value';
						var list=[
							[1,player.getExpansions('dddmiaoxing_1').reduce((p,c)=>p+get[fn](c),0)],
							[2,player.getExpansions('dddmiaoxing_2').reduce((p,c)=>p+get[fn](c),0)],
							[3,player.getCards('h').reduce((p,c)=>p+get[fn](c),0)],
						].sort((a,b)=>b[1]-a[1]);
						return list[0][0]-1;
					}());
					'step 1'
					if(result.control=='cancel2') event.finish();
					else{
						player.logSkill('dddfushi');
						player.addTempSkill('dddfushi_used');
						var index=result.index+1;
						player.addToExpansion(player.getCards('h'),player,'giveAuto').gaintag.add('dddmiaoxing_'+index);
						player.gain(player.getExpansions('dddmiaoxing_'+index),'draw');
						game.log(player,'获得了'+get.cnNumber(player.getExpansions('dddmiaoxing_'+index).length)+'张“水相”');
					}
					'step 2'
					player.markSkill('dddmiaoxing');
					player.chooseTarget('是否令一名男性角色选择是否交换“水相”？',(card,player,target)=>{
						return target.hasSex('male');
					}).set('ai',target=>get.attitude(_status.event.player,target));
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target);
						target.chooseControl('第一组','第二组','cancel2').set('dialog',[
							'浮世：是否用所有手牌交换一组“水相”？',
							'<span class="text center">第一组</span>',
							player.getExpansions('dddmiaoxing_1'),
							'<span class="text center">第二组</span>',
							player.getExpansions('dddmiaoxing_2'),
						]).set('ai',()=>{
							return _status.event.choice;
						}).set('choice',function(){
							var fn=target==_status.currentPhase?'useful':'value';
							var list=[
								[1,player.getExpansions('dddmiaoxing_1').reduce((p,c)=>p+get[fn](c),0)],
								[2,player.getExpansions('dddmiaoxing_2').reduce((p,c)=>p+get[fn](c),0)],
								[3,target.getCards('h').reduce((p,c)=>p+get[fn](c),0)],
							].sort((a,b)=>b[1]-a[1]);
							return list[0]-1;
						}());
					}
					else event.finish();
					'step 4'
					if(result.control=='cancel2') event.finish();
					else{
						var index=result.index+1;
						player.addToExpansion(target.getCards('h'),target,'giveAuto').gaintag.add('dddmiaoxing_'+index);
						target.gain(player.getExpansions('dddmiaoxing_'+index),player,'giveAuto');
					}
					'step 5'
					player.markSkill('dddmiaoxing');
				},
				subSkill:{
					used:{charlotte:true}
				}
			},
			//赵昂
			dddfenji:{
				audio:2,
				trigger:{player:['phaseDrawBegin1','phaseDiscardBegin']},
				direct:true,
				filter:function(event,player){
					if(event.name=='phaseDraw'&&event.numFixed) return false;
					return lib.inpile.filter(i=>get.type(i)=='trick').removeArray(player.getStorage('dddfenji')).length;
				},
				content:function(){
					'step 0'
					var cards=lib.inpile.filter(i=>{
						return get.type(i)=='trick'&&!player.getStorage('dddfenji').contains(i);
					}).map(i=>['锦囊','',i]);
					player.chooseButton([get.prompt('dddfenji'),[cards,'vcard']]).set('ai',button=>{
						var evt=_status.event.getTrigger();
						if(evt.name=='phaseDraw'){
							if(!get.tag({name:button.link[2]},'damage')) return 0;
						}
						else{
							if(lib.skill.xunshi.isXunshi({name:button.link[2]})) return 0;
						}
						return _status.event.player.getUseValue({name:button.link[2]});
					}).set('filterButton',button=>{
						return player.hasUseTarget(button.link[2]);
					});
					'step 1'
					if(result.bool){
						player.logSkill('dddfenji');
						player.markAuto('dddfenji',[result.links[0][2]]);
						player.chooseUseTarget(result.links[0][2],true);
					}
					else event.finish();
					'step 2'
					if(trigger.name=='phaseDraw'){
						trigger.changeToZero();
						var num=0;
						game.filterPlayer(current=>{
							current.getHistory('sourceDamage',evt=>{
								if(evt.getParent(4)==event) num+=evt.num;
							});
						})
						if(num>0) player.draw(num);
					}
					else{
						trigger.cancel();
						var num=0;
						player.getHistory('useCard',evt=>{
							if(evt.getParent(2)==event) num=evt.targets.length;
						});
						if(num>0&&player.countCards('he')) player.chooseToDiscard(num,true);
					}
				}
			},
			//周处
			dddxiaheng:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				forced:true,
				onremove:['dddxiaheng','dddxiaheng_del'],
				intro:{content:'已因此技能对$造成过伤害'},
				content:function(){
					'step 0'
					event.targets=[];
					player.chooseTarget('侠横：令一名角色弃置两张牌',true).set('ai',target=>{
						var player=_status.event.player,eff=get.effect(target,{name:'guohe_copy2'},player,player),eff2=get.damageEffect(target,player,player);
						if(player.storage['dddxiaheng_del']) return eff;
						var toself=false;
						if(eff2>eff*2){
							toself=!player.isDamaged()&&player.countCards('he',card=>get.value(card,player)<5)>=2;
						}
						if(toself) return target==player?100:0;
						return eff*(eff2>eff*2?0.5:1.5);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.targets.add(target);
						player.line(target);
						target.chooseToDiscard(2,true,'he');
					}
					'step 2'
					player.chooseTarget('侠横：对一名角色造成1点伤害',true).set('ai',target=>{
						var player=_status.event.player,eff=get.damageEffect(target,player,player),targetx=_status.event.targetx;
						if(player.storage['dddxiaheng_del']) return eff;
						var fix=player.getStorage('dddxiaheng').contains(target)?0.75:1;
						if(target==player&&targetx!=player&&player.isHealthy()&&!player.getStorage('dddxiaheng').contains(player)&&player.hp>2) return 100;
						return eff*(player.hp==1&&target==targetx?0.5:1)*fix;
					}).set('targetx',targets[0]);
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						event.targets.add(target);
						player.line(target);
						target.damage();
						player.markAuto('dddxiaheng',[target]);
					}
					'step 4'
					if(player.storage['dddxiaheng_del']) event.finish();
					else{
						if(!targets.contains(player)) player.loseMaxHp();
						if(targets.length==1) player.loseHp();
					}
					'step 5'
					if(player.getStorage('dddxiaheng').length>=3){
						player.storage['dddxiaheng_del']=true;
					}
				}
			},
			//刘巴
			dddfengzheng:{
				audio:2,
				global:'dddfengzheng_global',
				trigger:{
					global:'roundStart',
				},
				filter:function(event,player){
					return game.hasPlayer(current=>{
						var history=current.actionHistory;
						for(var i=history.length-2;i>=0;i--){
							var evts=history[i].useSkill;
							for(evt of evts){
								if(evt.skill=='dddfengzheng_global') return true;
							}
							if(history[i].isRound) break;
						}
						return false;
					});
				},
				prompt2:function(event,player){
					var num=game.countPlayer(current=>{
						var history=current.actionHistory;
						for(var i=history.length-2;i>=0;i--){
							var evts=history[i].useSkill;
							for(evt of evts){
								if(evt.skill=='dddfengzheng_global') return true;
							}
							if(history[i].isRound) break;
						}
						return false;
					});
					return '观看并分配牌堆顶的'+get.cnNumber(num)+'张牌';
				},
				content:function(){
					'step 0'
					var num=game.countPlayer(current=>{
						var history=current.actionHistory;
						for(var i=history.length-2;i>=0;i--){
							var evts=history[i].useSkill;
							for(evt of evts){
								if(evt.skill=='dddfengzheng_global') return true;
							}
							if(history[i].isRound) break;
						}
						return false;
					});
					var cards=game.cardsGotoOrdering(get.cards(num)).cards;
					event.cards=cards;
					if(_status.connectMode) game.broadcastAll(function(){_status.noclearcountdown=true});
					event.given_map={};
					'step 1'
					if(event.cards.length>1){
						player.chooseCardButton('丰政：请选择要分配的牌',true,event.cards,[1,event.cards.length]).set('ai',function(button){
							if(ui.selected.buttons.length==0) return 1;
							return 0;
						});
					}
					else if(event.cards.length==1) event._result={links:event.cards.slice(0),bool:true};
					else event.finish();
					'step 2'
					if(result.bool){
						event.cards.removeArray(result.links);
						event.togive=result.links.slice(0);
						player.chooseTarget('选择一名角色获得'+get.translation(result.links),true).set('ai',function(target){
							var fix=(_status.event.getParent().given_map[target.playerid]||0)+1;
							var att=get.attitude(_status.event.player,target)/Math.sqrt(fix);
							if(_status.event.enemy) return -att;
							else if(att>0) return att/(1+target.countCards('h'));
							else return att/100;
						}).set('enemy',get.value(event.togive[0],player,'raw')<0);
					}
					'step 3'
					if(result.targets.length){
						var id=result.targets[0].playerid,map=event.given_map;
						if(!map[id]) map[id]=[];
						map[id].addArray(event.togive);
					}
					if(cards.length>0) event.goto(1);
					'step 4'
					if(_status.connectMode){
						game.broadcastAll(function(){delete _status.noclearcountdown;game.stopCountChoose()});
					}
					var list=[],lose=false;
					for(var i in event.given_map){
						var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
						player.line(source,'green');
						list.push([source,event.given_map[i]]);
						if(event.given_map[i].length>2) lose=true;
					}
					game.loseAsync({
						gain_list:list,
						giver:player,
						animate:'draw',
					}).setContent('gaincardMultiple');
					if(!lose) event.finish();
					'step 5'
					player.removeSkill('dddfengzheng');
					game.log(player,'失去了技能','#g【丰政】');
				},
				subSkill:{
					global:{
						audio:'dddfengzheng',
						enable:'phaseUse',
						usable:1,
						filterCard:function(card,player){
							var num=0;
							for(var i=0;i<ui.selected.cards.length;i++){
								num+=get.number(ui.selected.cards[i]);
							}
							return get.number(card)+num<=13;
						},
						selectCard:[1,Infinity],
						filterOk:function(){
							var num=0;
							for(var i=0;i<ui.selected.cards.length;i++){
								num+=get.number(ui.selected.cards[i]);
							}
							return num==13;
						},
						popname:true,
						complexCard:true,
						prompt:'将任意张点数和为K的手牌当【无中生有】使用',
						check:function(card){
							var num=0;
							for(var i=0;i<ui.selected.cards.length;i++){
								num+=get.number(ui.selected.cards[i]);
							}
							if(num+get.number(card)==13) return 5.5-get.value(card);
							if(ui.selected.cards.length==0){
								var cards=_status.event.player.getCards('h');
								for(var i=0;i<cards.length;i++){
									for(var j=i+1;j<cards.length;j++){
										if(get.number(cards[i])+get.number(cards[j])==13){
											if(cards[i]==card||cards[j]==card) return 6-get.value(card);
										}
									}
								}
							}
							return 0;
						},
						position:'hs',
						viewAs:{name:'wuzhong'},
					}
				}
			},
			dddyulv:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				group:'dddyulv_enter',
				content:function(){
					'step 0'
					player.chooseControl(Array.from({length:13},(_,i)=>get.strNumber(i+1))).set('prompt','玉律：声明一个点数').set('ai',()=>_status.event.controls.randomGet());
					'step 1'
					player.popup(result.control);
					var number=result.index+1;
					player.storage['dddyulv']=number;
					player.markSkill('dddyulv');
				},
				intro:{
					content:'声明的点数为#',
				},
				subSkill:{
					enter:{
						trigger:{global:['loseAfter','cardsDiscardAfter','loseAsyncAfter','equipAfter']},
						forced:true,
						direct:true,
						filter:function(event,player){
							var cards=event.getd();
							if(!cards.length||!player.storage['dddyulv']) return false;
							if(!_status.currentPhase||!_status.currentPhase.isIn()) return false;
							return cards.some(i=>get.number(i,false)==player.storage['dddyulv']);
						},
						content:function(){
							'step 0'
							player.chooseControl('摸牌','弃牌').set('prompt','玉律：令'+get.translation(_status.currentPhase)+'摸一张牌或弃置一张牌').set('ai',()=>{
								return get.attitude(_status.event.player,_status.currentPhase)>0?'摸牌':'弃牌';
							});
							'step 1'
							player.logSkill('dddyulv_enter',_status.currentPhase);
							var reset=false;
							if(result.index==0) _status.currentPhase.draw();
							else _status.currentPhase.chooseToDiscard(true,'he');
							if(_status.currentPhase.hasSkill('dddyulv_'+result.index)) reset=true;
							_status.currentPhase.removeSkill('dddyulv_0');
							_status.currentPhase.removeSkill('dddyulv_1');
							_status.currentPhase.addSkill('dddyulv_'+result.index);
							if(!reset) event.finish();
							'step 2'
							player.chooseControl(Array.from({length:13},(_,i)=>get.strNumber(i+1))).set('prompt','玉律：重新声明一个点数').set('ai',()=>_status.event.controls.randomGet());
							'step 3'
							player.popup(result.control);
							var number=result.index+1;
							player.storage['dddyulv']=number;
							player.markSkill('dddyulv');
							'step 4'
							var evt=trigger.getParent('phaseUse');
							if(evt&&evt.name=='phaseUse'){
								evt.skipped=true;
							}
							var evt=trigger.getParent('phase');
							if(evt&&evt.name=='phase'){
								game.log(evt.player,'结束了回合');
								evt.finish();
								evt.untrigger(true);
							}
						}
					},
					0:{charlotte:true},
					1:{charlotte:true},
				}
			},
			//蹇硕
			dddfenye:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player.canCompare(target);
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseToCompare([target]).setContent(lib.skill['dddfenye'].chooseToCompareFenye);
					'step 1'
					result.winner.forEach(i=>i.addExpose(0.05));
					result.loser.forEach(i=>i.addExpose(0.05));
					if(result.winner.length&&result.loser.length){
						var players=result.winner;
						event.players=players.sortBySeat();
						event.targets=result.loser;
					}
					else event.finish();
					'step 2'
					var current=event.players.shift();
					event.current=current;
					current.chooseTarget('是否视为对一名没赢的角色使用一张【杀】？',(card,player,target)=>{
						return player.canUse('sha',target,false)&&_status.event.targets.contains(target);
					}).set('ai',target=>{
						return get.effect(target,{name:'sha'},_status.event.player);
					}).set('targets',event.targets);
					'step 3'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						var target=result.targets[0];
						event.current.useCard({name:'sha',isCard:true},target,false);
						event.targets.remove(target);
					}
					if(event.targets.length&&event.players.length) event.goto(2);
				},
				chooseToCompareFenye:function(){
					"step 0"
					var target=event.targets[0];
					event.targets.unshift(player);
					event.targetx=target;
					if(player.countCards('h')==0||target.countCards('h')==0){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					game.log(player,'对',target,'发起拼点');
					"step 1"
					var send=function(targets){
						var next=game.createEvent('dddfenye_choose',false);
						// next.player=game.me;
						next.targets=targets;
						next.ai=event.ai;
						next.fixedResult=event.fixedResult;
						next.setContent(lib.skill['dddfenye'].contentx);
						game.resume();
					};
					var sendback=function(result,player){
						if(!Array.isArray(result)){
							result=[null,null];
						}
						event.results.push([player,result]);
					};
					event.ai_targets=[];
					event.results=[];
					var players=game.filterPlayer().sortBySeat();
					var time=10000;
					if(lib.configOL&&lib.configOL.choose_timeout) time=parseInt(lib.configOL.choose_timeout)*1000;
					for(var i=0;i<players.length;i++){
						players[i].showTimer(time);
						if(players[i].isOnline()){
							event.withol=true;
							players[i].send(send,targets);
							players[i].wait(sendback);
						}
						else if(players[i]==game.me){
							event.withme=true;
							var next=game.createEvent('dddfenye_choose',false);
							next.player=game.me;
							next.targets=targets;
							next.ai=event.ai;
							next.fixedResult=event.fixedResult;
							next.setContent(lib.skill['dddfenye'].contentx);
							if(_status.connectMode) game.me.wait(sendback);
						}
						else{
							event.ai_targets.push(players[i]);
						}
					}
					if(event.ai_targets.length){
						for(var i=0;i<event.ai_targets.length;i++){
							if(targets.contains(event.ai_targets[i])){
								var target=event.ai_targets[i];
								var cards=target.getCards('h').sort((a,b)=>{
									return event.ai(b)-event.ai(a);
								});
								sendback([target,cards[0]],target);
								event.ai_targets.splice(i--,1);
							}
						}
						if(event.ai_targets.length){
							event.ai_targets.randomSort();
							setTimeout(function(){
								event.interval=setInterval(function(){
									var target=event.ai_targets.shift();
									var cards=target.getCards('h',card=>get.value(card)<4).sort((a,b)=>{
										return event.ai(b)-event.ai(a);
									});
									if(!cards.length){
										sendback([null,null],target);
									}
									else{
										if(Math.abs(get.number(cards[0])-7)<=2){
											sendback([null,null],target);
										}
										else{
											var sgn=get.number(cards[0])>=7?1:-1;
											var targetsx=targets.slice().sort((a,b)=>{
												var attA=get.attitude(target,a),attB=get.attitude(target,b);
												return sgn*(attB-attA);
											});
											sendback([targetsx[0],cards[0]],target);
										}
									}
									if(!event.ai_targets.length){
										clearInterval(event.interval);
										if(event.withai) game.resume();
									}
								},_status.connectMode?750:75);
							},500);
						}
					}
					"step 2"
					if(event.withme){
						if(_status.connectMode) game.me.unwait(result,game.me);
						else{
							if(!Array.isArray(result)){
								result=[null,null];
							}
							event.results.push([game.me,result]);
						}
					}
					"step 3"
					if(event.withol&&!event.resultOL){
						game.pause();
					}
					"step 4"
					if(event.ai_targets.length>0){
						event.withai=true;
						game.pause();
					}
					"step 5"
					delete event._global_waiting;
					for(var i of game.players) i.hideTimer();
					var cards=[];
					var targets=[];
					var lose_list=[];
					event.results.sort((a,b)=>lib.sort.seat(a[0],b[0]));
					for(var res of event.results){
						var target=res[0],card=res[1][1],skill=res[1][2];
						if(!target||!card) continue;
						if(skill&&lib.skill[skill]&&lib.skill[skill].onCompare){
							target.logSkill(skill);
							res[1][1]=lib.skill[skill].onCompare(target);
							if(target!=player) cards.push(res[1][1]);
						}
						else{
							if(target!=player) cards.push(card);
							lose_list.push([target,[card]]);
						}
						if(target!=player) targets.push(target);
					}
					if(lose_list.length){
						game.loseAsync({
							lose_list:lose_list,
						}).setContent('chooseToCompareLose');
					}
					event.lose_list=lose_list;
					event.getNum=function(card){
						for(var i of event.lose_list){
							if(i[1].contains&&i[1].contains(card)) return get.number(card,i[0]);
						}
						return get.number(card,false);
					}
					event.cardlist=cards;
					event.cards=cards;
					event.card1=event.results[0][1][1];
					event.num1=event.getNum(event.card1);
					event.iwhile=0;
					event.targets=targets;
					event.tempplayer=event.player;
					event.players=event.results.filter(i=>i[1][0]==player&&i[1][1]).map(i=>i[0]);
					event.targetsx=event.results.filter(i=>i[1][0]==event.targetx&&i[1][1]).map(i=>i[0]);
					event.result={
						player:event.card1,
						targets:event.cardlist.slice(0),
						num1:[event.num1],
						num2:[],
						winner:[],
						loser:[],
					};
					game.log(player,'的拼点牌为',event.card1);
					"step 6"
					event.target=null;
					event.trigger('compare');
					lib.skill['dddfenye'].$compareFenye(event.players,event.results.filter(i=>i[1][0]==player).map(i=>i[1][1]),event.targetsx,event.results.filter(i=>i[1][0]==event.targetx).map(i=>i[1][1]));
					"step 7"
					if(event.iwhile<targets.length){
						event.target=targets[event.iwhile];
						event.target.animate('target');
						event.card2=event.cardlist[event.iwhile];
						event.num2=event.getNum(event.card2);
						game.log(event.target,'的拼点牌为',event.card2);
						delete event.player;
						event.trigger('compare');
					}
					else{
						game.delay(0,1000);
						event.goto(9);
					}
					"step 8"
					var key=event.players.contains(target)?'num1':'num2';
					event.result[key].push(event.num2);
					event.iwhile++;
					event.goto(7);
					"step 9"
					event.player=event.tempplayer;
					delete event.tempplayer;
					var str;
					var num1=event.result.num1.reduce((p,c)=>p+c,0)/event.result.num1.length,num2=event.result.num2.reduce((p,c)=>p+c,0)/event.result.num2.length;
					game.log(event.player,'方的点数均值为','#y'+Math.floor(num1*100)/100);
					game.log(event.targetx,'方的点数均值为','#y'+Math.floor(num2*100)/100);
					if(num1>num2){
						str=get.translation(event.players)+'拼点成功';
						event.players.forEach(i=>i.popup('胜'));
						event.targetsx.forEach(i=>i.popup('负'));
						event.result.winner=event.players;
						event.result.loser=event.targetsx;
					}
					else{
						str=get.translation(event.players)+'拼点失败';
						if(num1==num2){
							event.players.forEach(i=>i.popup('平'));
							event.targetsx.forEach(i=>i.popup('平'));
							event.result.loser=event.players.addArray(event.targetsx);
						}
						else{
							event.players.forEach(i=>i.popup('负'));
							event.targetsx.forEach(i=>i.popup('胜'));
							event.result.winner=event.targetsx;
							event.result.loser=event.players;
						}
					}
					game.broadcastAll(function(str){
						var dialog=ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(function(){
							dialog.close();
						},1000);
					},str);
					game.delay(3);
					"step 10"
					game.broadcastAll(ui.clear);
					"step 11"
					event.cards.add(event.card1);
				},
				contentx:function(){
					'step 0'
					var player=game.me;
					event.player=player;
					event._global_waiting=true;
					event.result=[];
					if(targets.contains(player)){
						if(event.fixedResult&&event.fixedResult[player.playerid]){
							event.result[0]=player;
							event.result[1]=event.fixedResult[player.playerid];
							event.finish();
						}
						else player.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).set('_global_waiting',true).ai=event.ai;
					}
					else{
						player.chooseCardTarget({
							targets:targets,
							filterTarget:function(card,player,target){
								return _status.event.targets.contains(target);
							},
							selectCard:1,
							prompt:'是否于此次拼点加入其中一方？',
							position:'h',
							_global_waiting:true,
							ai1:event.ai,
							ai2:function(target){
								var player=_status.event.player,sgn=-1;
								if(player.hasCard(card=>get.number(card)>10&&get.value(card)<5)) sgn=1;
								return sgn*get.attitude(player,target);
							},
						});
					}
					'step 1'
					if(targets.contains(player)){
						event.result[0]=player;
						event.result[1]=result.cards[0];
						event.result[2]=result.skill;
					}
					else{
						if(result.bool){
							event.result[0]=result.targets[0];
							event.result[1]=result.cards[0];
						}
						else{
							event.result=[null,null];
						}
					}
				},
				$compareFenye:function(players,cards1,targets,cards2){
					game.broadcast(function(players,cards1,targets,cards2){
						lib.skill['dddfenye'].$compareFenye(players,cards1,targets,cards2);
					},players,cards1,targets,cards2);
					
					var left0=-players.length*52-(players.length-1)*8;
					for(var i=0;i<players.length;i++){
						(function(target,card1,i){
							var left=left0+i*120;
							var node1;
							if(left<0){
								node1=target.$throwxy2(card1,
									'calc(50% - '+(-left)+'px)','calc(50% + 10px)','perspective(600px) rotateY(180deg)',true
								);
							}
							else{
								node1=target.$throwxy2(card1,
									'calc(50% + '+left+'px)','calc(50% + 10px)','perspective(600px) rotateY(180deg)',true
								);
							}
							if(lib.config.cardback_style!='default'){
								node1.style.transitionProperty='none';
								ui.refresh(node1);
								node1.classList.add('infohidden');
								ui.refresh(node1);
								node1.style.transitionProperty='';
							}
							else{
								node1.classList.add('infohidden');
							}
							node1.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
							var onEnd02=function(){
								node1.removeEventListener('webkitTransitionEnd',onEnd02);
								setTimeout(function(){
									node1.style.transition='all ease-in 0.3s';
									node1.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
									var onEnd=function(){
										node1.classList.remove('infohidden');
										node1.style.transition='all 0s';
										ui.refresh(node1);
										node1.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
										ui.refresh(node1);
										node1.style.transition='';
										ui.refresh(node1);
										node1.style.transform='';
										node1.removeEventListener('webkitTransitionEnd',onEnd);
									}
									node1.listenTransition(onEnd);
								},200);
							};
							node1.listenTransition(onEnd02);
						}(players[i],cards1[i],i))
					}

					setTimeout(function(){
						var left0=-targets.length*52-(targets.length-1)*8;
						for(var i=0;i<targets.length;i++){
							(function(target,card2,i){
								var left=left0+i*120;
								var node2;
								if(left<0){
									node2=target.$throwxy2(card2,
										'calc(50% - '+(-left)+'px)','calc(50% - 114px)','perspective(600px) rotateY(180deg)',true
									);
								}
								else{
									node2=target.$throwxy2(card2,
										'calc(50% + '+left+'px)','calc(50% - 114px)','perspective(600px) rotateY(180deg)',true
									);
								}
								if(lib.config.cardback_style!='default'){
									node2.style.transitionProperty='none';
									ui.refresh(node2);
									node2.classList.add('infohidden');
									ui.refresh(node2);
									node2.style.transitionProperty='';
								}
								else{
									node2.classList.add('infohidden');
								}
								node2.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
								var onEnd02=function(){
									node2.removeEventListener('webkitTransitionEnd',onEnd02);
									setTimeout(function(){
										node2.style.transition='all ease-in 0.3s';
										node2.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
										var onEnd=function(){
											node2.classList.remove('infohidden');
											node2.style.transition='all 0s';
											ui.refresh(node2);
											node2.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
											ui.refresh(node2);
											node2.style.transition='';
											ui.refresh(node2);
											node2.style.transform='';
											node2.removeEventListener('webkitTransitionEnd',onEnd);
										}
										node2.listenTransition(onEnd);
									},200);
								};
								node2.listenTransition(onEnd02);
							}(targets[i],cards2[i],i))
						}
					},200);
				},
				ai:{
					order:1,
					result:{
						target:-1,
					},
					threaten:1.3
				}
			},
			dddshichao:{
				audio:2,
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				filter:function(event,player){
					return player.countMark('dddshichao')+1<=game.countPlayer();
				},
				onremove:true,
				forced:true,
				content:function(){
					'step 0'
					var N=player.countMark('dddshichao')+1;
					player.chooseTarget('逝潮：选择一名手牌数第'+get.cnNumber(N)+'大的角色',true,(card,player,target)=>{
						return _status.event.targets.contains(target);
					}).set('ai',target=>{
						var zhu=get.zhu(player)||game.filterPlayer(i=>i.getSeatNum()==1)[0];
						return Math.min(target.countCards('h')-player.countCards('h'),zhu.maxHp-player.countCards('h'));
					}).set('targets',function(){
						var list=game.filterPlayer().map(i=>[i,i.countCards('h')]).sort((a,b)=>b[1]-a[1]);
						var targets=[];
						var ind=0,tmp=Infinity;
						for(var i of list){
							if(i[1]<tmp){
								ind++; tmp=i[1];
							}
							if(ind==N){
								targets.push(i[0]);
							}
							if(ind>N) break;
						}
						if(!targets.length) targets=game.filterPlayer(i=>i.countCards('h')==list[list.length-1][1]);
						return targets;
					}());
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dddshichao',target);
						var zhu=get.zhu(player)||game.filterPlayer(i=>i.getSeatNum()==1)[0];
						var del=Math.min(target.countCards('h')-player.countCards('h'),zhu.maxHp-player.countCards('h'));
						if(del>0) player.draw(del);
						if(del<0) player.chooseToDiscard(-del,true);
						target.addSkill('dddshichao_up');
						target.markAuto('dddshichao_up',[player]);
						player.addTempSkill('dddshichao_clear',{player:'phaseBegin'});
						player.markAuto('dddshichao_clear',[target]);
					}
				},
				subSkill:{
					up:{
						trigger:{source:'damageBegin2'},
						filter:function(event,player){
							return player.getStorage('dddshichao_up').contains(event.player);
						},
						charlotte:true,
						check:function(event,player){
							var eff=get.damageEffect(event.player,player,player);
							return event.player.hasSkill('dddshichao')&&eff<0||event.num==1&&eff<13;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							trigger.cancel();
							if(trigger.player.hasSkill('dddshichao')){
								trigger.player.addMark('dddshichao',1,false);
							}
						}
					},
					clear:{
						charlotte:true,
						onremove:function(player){
							game.filterPlayer(current=>{
								current.unmarkAuto('dddshichao_up',[player]);
							});
						}
					}
				}
			},
			//管宁
			dddyouxue:{
				audio:2,
				trigger:{global:'roundStart'},
				forced:true,
				content:function(){
					'step 0'
					var vpos=player.hasMark('dddyouxue')?game.filterPlayer2(i=>i.getSeatNum()==player.countMark('dddyouxue'))[0]:player;
					event.vpos=vpos;
					player.chooseTarget('游学：选择你的行动次序',true).set('ai',target=>{
						return get.distance(_status.event.vpos,target);
					}).set('vpos',vpos);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						if(event.vpos==player) player.line(target,'green');
						else player.line2([event.vpos,target],'green');
						event.num=get.distance(event.vpos,target);
						player.storage['dddyouxue']=target.getSeatNum();
						player.addSkill('dddyouxue_act');
						player.markSkill('dddyouxue');
					}
					else event.finish();
					'step 2'
					var next=player.phaseDraw();
					next.set('num',num);
					delete next.skill;
					'step 3'
					player.skip('phaseDraw');
				},
				marktext:'虚',
				intro:{
					name:'虚位',
					content:'当前虚位为#号',
				},
				subSkill:{
					act:{
						trigger:{
							global:'phaseBefore',
						},
						forced:true,
						firstDo:true,
						charlotte:true,
						filter:function(event,player){
							var seat=event.player.getSeatNum(),seatP=event.player.getPrevious().getSeatNum();
							return !player.hasSkill('dddyouxue_acted')&&seat>=player.countMark('dddyouxue')&&(seatP>seat||seatP<player.countMark('dddyouxue'))||
								event.player==player&&event.skill!='dddyouxue_act';
						},
						content:function(){
							'step 0'
							var seat=trigger.player.getSeatNum(),seatP=trigger.player.getPrevious().getSeatNum();
							if(trigger.player==player&&trigger.skill!='dddyouxue_act'&&(seat<player.countMark('dddyouxue')||seatP>=player.countMark('dddyouxue'))){
								trigger.finish();
								trigger.untrigger(true);
								trigger._triggered=5;
								event.finish();
								return;
							}
							trigger.player.getPrevious().getHistory('custom').push({'dddyouxue':true});
							player.insertPhase();
							player.addTempSkill('dddyouxue_acted','roundStart');
							if(!trigger._finished){
								trigger.finish();
								trigger.untrigger(true);
								trigger._triggered=5;
								var evt=trigger.player.insertPhase();
								delete evt.skill;
							}
						}
					},
					acted:{charlotte:true}
				}
			},
			dddchengjing:{
				audio:2,
				usable:1,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('hes')&&player.countMark('dddyouxue')&&lib.skill['dddchengjing'].getList(player).length;
				},
				getList:function(player){
					var vpos=player.hasMark('dddyouxue')?game.filterPlayer2(i=>i.getSeatNum()==player.countMark('dddyouxue'))[0]:player;
					if(!vpos||!vpos.isIn()) return [];
					var vcard=[];
					var history=vpos.getPrevious().actionHistory.filter(evt=>!evt.custom.some(i=>i['dddyouxue']));
					debugger
					history=history[history.length-2];
					var evts=history.useCard;
					for(var evt of evts){
						var card=evt.card;
						var type=get.type(card);
						if(type!='basic'&&type!='trick') continue;
						if(card.name=='sha'){
							vcard.push(['基本','',card.name,card.nature]);
						}
						else vcard.push([type,'',card.name]);
					}
					return vcard;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=lib.skill['dddchengjing'].getList(player);
						list.sort((a,b)=>{
							return 100*(lib.inpile.indexOf(a[2])-lib.inpile.indexOf(b[2]))+lib.inpile_nature.indexOf(a[3])-lib.inpile_nature.indexOf(b[3]);
						});
						list.filter(vcard=>{
							return event.filterCard({name:vcard[2],nature:vcard[3]},player,event);
						})
						return ui.create.dialog('承经',[list,'vcard']);
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function(button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						return player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						});
					},
					backup:function(links,player){
						return {
							filterCard:true,
							audio:'dddchengjing',
							popname:true,
							check:function(card){
								return 8-get.value(card);
							},
							position:'hes',
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
								storage:{'dddchengjing':true}
							},
							precontent:function(){
								player.addTempSkill('dddchengjing_effect');
							},
						}
					},
					prompt:function(links,player){
						return '将一张牌当做'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用';
					}
				},
				ai:{
					combo:'dddyouxue',
					order:1,
					result:{
						player:1,
					},
				},
				subSkill:{
					effect:{
						audio:'dddchengjing',
						trigger:{global:'useCardAfter'},
						charlotte:true,
						direct:true,
						filter:function(event,player){
							return event.card&&event.card.storage&&event.card.storage['dddchengjing'];
						},
						content:function(){
							'step 0'
							var damaged=game.hasPlayer2(current=>current.hasHistory('damage',evt=>evt.card==trigger.card));
							event.damaged=damaged;
							var vpos=player.hasMark('dddyouxue')?game.filterPlayer2(i=>i.getSeatNum()==player.countMark('dddyouxue'))[0]:player;
							var target=vpos.getNext();
							event.target=target;
							player.chooseControl(' +1 ',' -1 ','cancel2').set('prompt','是否令“虚位”下家('+get.translation(target)+')下回合的'+(damaged?'摸牌数':'手牌上限')+'+1或-1？').set('ai',function(){
								var sgn=get.sgn(get.attitude(_status.event.player,_status.event.target));
								if(sgn==0) return 2;
								if(sgn==1) return 0;
								return 1;
							}).set('target',target);
							'step 1'
							if(result.index!=2){
								player.logSkill('dddchengjing_effect',target);
								var name=(event.damaged?'draw':'limit')+result.index;
								target.addTempSkill('dddchengjing_check',{player:'phaseAfter'});
								target.addMark('dddchengjing_'+name,1,false);
								game.log(target,'下回合的'+(event.damaged?'摸牌数':'手牌上限'),'#y'+(['+1','-1'][result.index]));
							}
						}
					},
					check:{
						trigger:{player:'phaseDrawBegin2'},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return player.countMark('dddchengjing_draw0')||player.countMark('dddchengjing_draw1');
						},
						content:function(){
							trigger.num+=player.countMark('dddchengjing_draw0')-player.countMark('dddchengjing_draw1');
						},
						mod:{
							maxHandcard:function(player,num){
								return num+player.countMark('dddchengjing_limit0')-player.countMark('dddchengjing_limit1');
							}
						},
						onremove:function(player){
							delete player.storage['dddchengjing_draw0'];
							delete player.storage['dddchengjing_draw1'];
							delete player.storage['dddchengjing_limit0'];
							delete player.storage['dddchengjing_limit1'];
						},
						mark:true,
						marktext:'承',
						intro:{
							name:'承经',
							content:function(storage,player){
								var str='';
								if(player.countMark('dddchengjing_draw0')||player.countMark('dddchengjing_draw1')){
									var num=player.countMark('dddchengjing_draw0')-player.countMark('dddchengjing_draw1');
									str+='<li>摸牌阶段摸牌数'+(num>=0?'+':'')+num;
								}
								if(player.countMark('dddchengjing_limit0')||player.countMark('dddchengjing_limit1')){
									var num=player.countMark('dddchengjing_limit0')-player.countMark('dddchengjing_limit1');
									str+='<li>手牌上限'+(num>=0?'+':'')+num;
								}
								return str;
							}
						}
					},
					draw0:{charlotte:true},
					draw1:{charlotte:true},
					limit0:{charlotte:true},
					limit1:{charlotte:true},
				}
			},
			dddduanbing:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.canAddJudge('bingliang')&&player.hasCard((card)=>lib.skill['dddduanbing'].filterCard(card,player),'h');
				},
				filterCard:function(card,player){
					if(get.color(card)!='black'||get.type2(card)=='trick') return false;
					return player.canAddJudge(get.autoViewAs({name:'bingliang'},[card]));
				},
				check:function(card){
					return 6-get.value(card);
				},
				discard:false,
				lose:false,
				delay:false,
				prepare:'throw',
				content:function(){
					'step 0'
					player.addJudge({name:'bingliang'},cards);
					'step 1'
					game.delayx();
					player.draw(2);
					'step 2'
					player.addTempSkill('dddduanbing_effect');
					player.chooseUseTarget({
						name:'sha',
						isCard:true,
						storage:{_dddduanbing:true},
					},false,'nodistance');
				},
				ai:{
					order:function(item,player){
						return get.order({name:'sha'})-0.1;
					},
					result:{
						player:function(player){
							return player.getUseValue({name:'sha'},false)
						},
					},
				},
				subSkill:{
					effect:{
						trigger:{source:'damageSource'},
						charlotte:true,
						filter:function(event,player){
							if(!event.card||!event.card.storage||!event.card.storage._dddduanbing) return false;
							if(event.getParent().type!='card'||!event.player.isIn()) return false;
							var cards=event.getParent(4).cards;
							if(cards&&cards.length==1){
								var card=cards[0];
								return player.getCards('j').contains(card)&&(card.viewAs||card.name)=='bingliang'&&event.player.canAddJudge(card);
							}
							return false;
						},
						prompt:(event)=>('是否将【兵粮寸断】转移给'+get.translation(event.player)+'？'),
						check:function(event,player){
							var cards=event.getParent(4).cards;
							if(cards&&cards.length==1){
								var card=get.autoViewAs({name:'bingliang'},cards);
								return get.effect(event.player,card,player,player)>=0;
							}
							return false;
						},
						content:function(){
							var card=trigger.getParent(4).cards[0],target=trigger.player;
							player.line(target);
							player.$give(card,target);
							target.addJudge({name:'bingliang'},card);
						},
					},
				},
			},
			//轲比能
			dddxiaoxing:{
				audio:2,
				forced:true,
				trigger:{global:'gameDrawBegin'},
				forced:true,
				group:'dddxiaoxing_remove',
				content:function(){
					var me=player;
					var numx=trigger.num;
					trigger.num=typeof numx=='function'?function(player){
						if(player==me){
							return 3+numx(player);
						}
						return numx(player);
					}:function(player){
						if(player==me){
							return 3+numx;
						}
						return numx;
					}
				},
				mod:{
					attackRange:(player,num)=>num+3,
					maxHandcard:(player,num)=>num+3,
				},
				subSkill:{
					remove:{
						trigger:{player:'dying'},
						forced:true,
						direct:true,
						filter:function(event,player){
							return event.source&&event.source.isIn()&&event.source.getEquip(1);
						},
						content:function(){
							'step 0'
							trigger.source.chooseBool(get.prompt('dddxiaoxing',player),'废除武器栏，令其失去〖枭行〗').set('ai',()=>{
								if(_status.event.maybe) return Math.random()<0.5;
								return false;
							}).set('maybe',player.countCards('hs',{name:['tao','jiu']})&&player.countCards('h')>=3);
							'step 1'
							if(result.bool){
								trigger.source.logSkill('dddxiaoxing',player);
								trigger.source.disableEquip(1);
								player.removeSkill('dddxiaoxing');
								game.log(player,'失去了技能','#g【枭行】');
							}
						}
					}
				}
			},
			dddlangzhi:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				logTarget:function(event,player){
					return game.filterPlayer(current=>player.inRange(current)&&current.countCards('he'));
				},
				content:function(){
					'step 0'
					event.targets=game.filterPlayer(current=>player.inRange(current)&&current.countCards('he'));
					event.cards=[];
					event.num=0;
					'step 1'
					var target=targets[num];
					event.num++;
					event.target=target;
					player.choosePlayerCard('狼志：展示'+get.translation(target)+'一张牌','he',target,true);
					'step 2'
					if(result.bool){
						var card=result.links[0];
						player.showCards(card,get.translation(target)+'被展示');
						event.cards.push(card);
					}
					'step 3'
					if(num<targets.length) event.goto(1);
					else{
						event.videoId=lib.status.videoId++;
						if(event.isMine()){
							event.dialog=ui.create.dialog('###是否替换其中的任意张牌？###或点击“取消”，获得所有展示牌，然后失去〖狼志〗',cards);
							event.dialog.videoId=event.videoId;
						}
						else if(player.isOnline2()){
							player.send(function(cards,id){
								var dialog=ui.create.dialog('###是否替换其中的任意张牌？###或点击“取消”，获得所有展示牌，然后失去〖狼志〗',cards);
								dialog.videoId=id;
							},cards,event.videoId);
						}
						player.chooseCard([1,cards.length],'he').set('ai',card=>{
							if(ui.selected.cards.length>=_status.event.num) return 0;
							return 100-get.value(card);
						}).set('num',function(){
							if(cards.length<Math.floor(game.countPlayer()/2-0.5)) return 0;
							var val=cards.reduce((p,c)=>p+get.value(c),0);
							if(val<cards.length*6) return 0;
							var list1=player.getCards('he').map(card=>get.value(card,player)),list2=cards.map((card,i)=>get.value(card,targets[i])*get.sgnAttitude(player,targets[i]));
							list1.sort((a,b)=>a[1]-b[1]);
							list2.sort((a,b)=>b[1]-a[1]);
							list2=list2.filter(i=>i>0);
							var count=0;
							for(var i of list2){
								for(var j=0;j<list1.length;j++){
									if(i>list1[j]){
										count++;
										list1.splice(j,1);
										break;
									}
								}
							}
							return count;
						}()).set('prompt',false);
					}
					'step 4'
					if(result.bool){
						var cards2=result.cards;
						event.cards2=cards2;
						var func=function(id){
							var dialog=get.idDialog(id);
							if(dialog) dialog.content.childNodes[1].innerHTML='<div class="text center">选择要交换的牌（按选择的顺序一一交换）</div>';
						};
						if(event.isMine()) func(event.videoId);
						else if(player.isOnline2()) player.send(func,event.videoId);
						player.chooseButton(cards2.length,true).set('dialog',event.videoId).set('ai',button=>{
							return get.value(button.link);
						});
						event.goto(6);
					}
					else{
						for(var i=0;i<cards.length;i++){
							targets[i].$give(cards[i],player,false);
						}
						player.gain(cards,'log');
					}
					'step 5'
					player.removeSkill('dddlangzhi');
					game.log(player,'失去了技能','#g【狼志】');
					event.finish();
					'step 6'
					game.broadcastAll('closeDialog',event.videoId);
					if(result.bool){
						var cards2=event.cards2,cards3=result.links;
						if(cards2.length!=cards3.length) return;
						for(var i=0;i<cards2.length;i++){
							player.swapHandcards(get.owner(cards3[i]),[cards2[i]],[cards3[i]]);
						}
					}
					else event.finish();
					'step 7'
					game.delayx();
				}
			},
			dddfuyi:{
				audio:2,
				zhuSkill:true,
				trigger:{
					global:['discardBegin','drawBegin'],
				},
				filter:function(event,player){
					var evt=event.getParent();
					if(evt.name!='die'||evt.source!=event.player||event.player==player) return false;
					if(!player.hasZhuSkill('dddfuyi',event.player)) return false;
					var skills=player.getSkills('dddxiaoxing',null,false,false);
					return !skills.contains('dddxiaoxing')||!skills.contains('dddlangzhi');
				},
				direct:true,
				content:function(){
					'step 0'
					var str='取消此次奖惩，令其获得';
					var skills=player.getSkills('dddxiaoxing',null,false,false);
					var bool1=!skills.contains('dddxiaoxing'),bool2=!skills.contains('dddlangzhi');
					var choices=[];
					if(bool1) {
						str+='〖枭行〗';
						choices.push('dddxiaoxing');
					}
					if(bool1&&bool2) str+='/'; 
					if(bool2){
						str+='〖狼志〗';
						choices.push('dddlangzhi');
					}
					if(bool1&&bool2){
						str+='中的一或两个';
						choices.push('dddfuyi_both')
					}
					choices.push('cancel2');
					trigger.player.chooseControl(choices).set('prompt','是否对'+get.translation(player)+'发动【附义】？').set('prompt2',str).set('ai',()=>{
						if(get.attitude(_status.event.player,_status.event.getParent().player)<=2) return 'cancel2';
						if(_status.event.choices.contains('dddfuyi_both')) return 'dddfuyi_both';
						if(_status.event.choices.contains('dddlangzhi')) return 'dddlangzhi';
						return Math.random()<0.5?'dddxiaoxing':'cancel2';
					});
					'step 1'
					if(result.control!='cancel2'){
						trigger.player.logSkill('dddfuyi',player);
						trigger.cancel();
						var skills=[result.control];
						if(result.control=='dddfuyi_both'){
							skills=['dddxiaoxing','dddlangzhi'];
							player.draw(3);
						}
						else event.finish();
						for(var i of skills){
							player.addSkillLog(i);
						}
					}
					else event.finish();
					'step 2'
					player.removeSkill('dddfuyi');
					game.log(player,'失去了技能','#g【附义】');
				}
			},
			//曹爽
			dddzhuanshe:{
				audio:2,
				trigger:{global:'phaseUseBegin'},
				filter:function(event,player){
					return player.countCards('h')&&event.player!=player;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard(get.prompt2('dddzhuanshe',trigger.player)).set('ai',card=>{
						var target=_status.event.getTrigger().player;
						if(!_status.event.goon){
							if(get.value(card)<4) return -target.getUseValue(card)+0.001;
							return 0;
						}
						return target.getUseValue(card);
					}).set('goon',get.attitude(player,trigger.player));
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						player.logSkill('dddzhuanshe',trigger.player);
						player.give(card,trigger.player,true);
						player.addTempSkill('dddzhuanshe_effect');
						player.markAuto('dddzhuanshe_effect',[card.name]);
					}
				},
				subSkill:{
					effect:{
						audio:'dddzhuanshe',
						trigger:{global:'useCard2'},
						filter:function(event,player){
							if(!player.getStorage('dddzhuanshe_effect').contains(event.card.name)) return false;
							if(event.player!=_status.currentPhase) return false;
							var type=get.type(event.card,null,false);
							if(type!='basic'&&type!='trick') return false;
							var info=get.info(event.card);
							if(info.allowMultiple==false) return false;
							if(event.targets&&!info.multitarget){
								if(game.hasPlayer(function(current){
									return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,event.player,current);
								})){
									return true;
								}
							}
							return false;
						},
						direct:true,
						group:'dddzhuanshe_damage',
						charlotte:true,
						onremove:true,
						content:function(){
							'step 0'
							var prompt2='为'+get.translation(trigger.card)+'增加一个目标'
							player.chooseTarget(get.prompt('dddzhuanshe_effect'),function(card,player,target){
								var player=_status.event.source;
								return !_status.event.targets.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var trigger=_status.event.getTrigger();
								var player=_status.event.source;
								return get.effect(target,trigger.card,player,_status.event.player);
							}).set('targets',trigger.targets).set('card',trigger.card).set('source',trigger.player);
							'step 1'
							if(result.bool){
								if(!event.isMine()&&!event.isOnline()) game.delayx();
								event.targets=result.targets;
							}
							else{
								event.finish();
							}
							'step 2'
							if(event.targets){
								player.logSkill(event.name,event.targets);
								trigger.targets.addArray(event.targets);
								game.log(event.targets,'也成为了',trigger.card,'的目标');
							}
						}
					},
					damage:{
						audio:'dddzhuanshe',
						trigger:{global:'phaseEnd'},
						filter:function(event,player){
							var list=player.getStorage('dddzhuanshe_effect').slice();
							event.player.getHistory('useCard',evt=>{
								list.remove(evt.card.name);
							})
							return list.length;
						},
						charlotte:true,
						logTarget:'player',
						prompt2:'对其造成1点伤害',
						check:function(event,player){
							return get.damageEffect(event.player,player,player)>=0;
						},
						content:function(){
							trigger.player.damage(player);
						}
					}
				}
			},
			dddweiqiu:{
				audio:2,
				trigger:{global:'recoverBefore'},
				filter:function(event,player){
					return !player.countCards('h');
				},
				forced:true,
				direct:true,
				content:function(){
					trigger.player.logSkill('dddweiqiu',player);
					trigger.cancel();
					player.draw();
				}
			},
			//薛灵芸
			dddlianer:{
				audio:2,
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					return event.cards.filterInD('od').length&&get.color(event.card)=='red';
				},
				content:function(){
					'step 0'
					var cards=trigger.cards.filterInD('od');
					event.cards=cards;
					player.gain(cards,'gain2');
					'step 1'
					var number=get.number(cards[0]);
					if(cards.length==1&&typeof number=='number'){
						player.addTempSkill('dddlianer_ceiling');
						player.storage['dddlianer_ceiling']=number;
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&get.color(card)=='red'){
							if(!player.storage['dddlianer_ceiling']) return;
							var numx=get.number(card);
							if(typeof numx=='number'){
								return num+10/Math.max(1,player.storage['dddlianer_ceiling']-numx);
							}
						}
					}
				},
				subSkill:{
					ceiling:{
						onremove:true,
						charlotte:true,
						mod:{
							cardEnabled:function(card,player){
								if(!player.storage['dddlianer_ceiling']) return;
								var num=get.number(card);
								if(typeof num!='number'||player.storage['dddlianer_ceiling']<=num) return false;
							},
							cardRespondable:function(card,player){
								if(!player.storage['dddlianer_ceiling']) return;
								var num=get.number(card);
								if(typeof num!='number'||player.storage['dddlianer_ceiling']<=num) return false;
							},
							cardSavable:function(card,player){
								if(!player.storage['dddlianer_ceiling']) return;
								var num=get.number(card);
								if(typeof num!='number'||player.storage['dddlianer_ceiling']<=num) return false;
							},
						}
					}
				}
			},
			dddanzhi:{
				audio:2,
				trigger:{global:'phaseBegin'},
				filter:function(event,player){
					var evts=game.getAllGlobalHistory('cardMove');
					if(!evts.length) return false;
					var cards=evts[evts.length-1].cards;
					return cards.some(i=>{
						return get.color(i,false)=='black'&&get.position(i,true)=='d';
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('dddanzhi'),'选择一名角色，此回合其第一次成为黑色牌的目标时，此牌对其无效').set('ai',target=>{
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dddanzhi',target);
						target.addTempSkill('dddanzhi_effect');
					}
				},
				subSkill:{
					effect:{
						trigger:{target:'useCardToTarget'},
						filter:function(event,player){
							return get.color(event.card)=='black';
						},
						forced:true,
						charlotte:true,
						content:function(){
							trigger.targets.remove(player);
							trigger.getParent().triggeredTargets2.remove(player);
							trigger.untrigger();
							game.log(trigger.card,'对',player,'无效了');
							game.delayx();
							player.removeSkill('dddanzhi_effect');
						}
					}
				}
			},
			//刘宏
			dddshixing:{
				audio:2,
				trigger:{
					global:['changeHp','useCard1','phaseBefore'],
				},
				forced:true,
				onremove:true,
				filter:function(event,player){
					var num=player.countMark('dddshixing');
					if(event.name=='changeHp'){
						if(event.player.hasSex('female')){
							var bool=!event.player.isDamaged();
							if(bool&&((num&1)==0)||!bool&&((num&1)==1)){
								return true;
							}
						}
						return false;
					}
					if(event.name=='useCard'){
						var bool=game.getGlobalHistory('useCard',evt=>get.type2(evt.card)=='trick').length==0;
						if((bool&&(num&2)==0)||!bool&&((num&2)==2)){
							return true;
						}
						return false;
					}
					return true;
				},
				content:function(){
					lib.skill['dddshixing'].applyChange(player);
				},
				applyChange:function(player){
					player.removeAdditionalSkill('dddshixing');
					var bool1=game.hasPlayer(current=>!current.isDamaged()&&current.hasSex('female')),
						bool2=game.getGlobalHistory('useCard',evt=>get.type2(evt.card)=='trick').length==0;
					player.storage['dddshixing']=bool1+2*bool2;
					var list=[];
					if(bool1) list.push('xiangle');
					if(bool2) list.push('jiushi');
					if(!bool1&&!bool2) list.push('rezhiheng');
					player.addAdditionalSkill('dddshixing',list);
				},
				derivation:['xiangle','jiushi','rezhiheng'],
			},
			ddddanggu:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				filter:function(event,player){
					return game.countPlayer(current=>current.isLinked())<game.countPlayer(current=>current.group=='qun');
				},
				forced:true,
				group:'ddddanggu_negative',
				content:function(){
					'step 0'
					if(!event.loop) event.loop=0;
					var num=game.countPlayer(current=>current.group=='qun')-game.countPlayer(current=>current.isLinked());
					player.chooseTarget('党锢：横置至少'+get.cnNumber(num)+'名角色',[num,Infinity],true,(card,player,target)=>{
						return !target.isLinked();
					}).set('ai',target=>{
						return get.effect(target,{name:'tiesuo'},_status.event.player);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						player.logSkill('ddddanggu',targets);
						targets.forEach(i=>i.link());
					}
				},
				discard:function(){
					"step 0"
					game.log(player,'进入了弃牌阶段');
					event.num=(function(){
						var num=0;
						var hs=player.getCards('he');
						num+=hs.length;
						for(var i=0;i<hs.length;i++){
							if(game.checkMod(hs[i],player,false,'ignoredHandcard',player)==true){
								num--;
							}
						}
						return Math.max(0,num-player.getHandcardLimit());
					})();
					if(event.num<=0) event.finish();
					else{
						if(lib.config.show_phase_prompt){
							player.popup('弃牌阶段');
						}
					}
					event.trigger('phaseDiscard');
					"step 1"
					player.chooseToDiscard(num,true,'he');
					"step 2"
					event.cards=result.cards;
				},
				subSkill:{
					negative:{
						trigger:{global:'phaseDiscardBegin'},
						filter:function(event,player){
							return event.player!=player&&event.player.isLinked();
						},
						forced:true,
						logTarget:'player',
						content:function(){
							trigger.setContent(lib.skill['ddddanggu'].discard);
						},
					}
				}
			},
			//夏侯玄
			dddlanghuai:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				zhuanhuanji:true,
				direct:true,
				content:function(){
					'step 0'
					if(player.hasMark('dddxuanlun_del')) event._result={bool:true};
					else player.chooseBool(get.prompt('dddlanghuai'),'展示手牌（无牌则不展示），并改为摸其中'+(!player.storage['dddlanghuai']?'包含':'缺少')+'花色数的牌').set('ai',()=>_status.event.bool).set('bool',function(){
						var list=[],cards=player.getCards('h');
						for(var i of cards){
							var suit=get.suit(i,player);
							if(!lib.suit.contains(suit)) continue;
							list.add(suit);
						}
						if(player.storage['dddlanghuai']){
							list=list.removeArray(lib.suit);
						}
						return list.length==2&&!player.storage['dddlanghuai']||list.length>2;
					}());
					'step 1'
					if(result.bool){
						player.logSkill('dddlanghuai');
						delete player.storage['dddxuanlun_del'];
						if(player.countCards('h')) player.showHandcards();
					}
					else event.finish();
					'step 2'
					var list=[],cards=player.getCards('h');
					for(var i of cards){
						var suit=get.suit(i,player);
						if(!lib.suit.contains(suit)) continue;
						list.add(suit);
					}
					if(player.storage['dddlanghuai']){
						list=lib.suit.slice().removeArray(list);
					}
					player.changeZhuanhuanji('dddlanghuai');
					trigger.changeToZero();
					if(list.length) player.draw(list.length);
				},
				mark:true,
				intro:{
					content:function(storage,player){
						return '摸牌阶段，你可展示手牌（无牌则不展示），并改为摸其中'+(!storage?'包含':'缺少')+'花色数的牌。';
					},
				},
				marktext:'☯',
			},
			dddxuanlun:{
				audio:2,
				trigger:{player:'damageEnd'},
				content:function(){
					player.draw(4);
					player.addTempSkill('dddxuanlun_choose');
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					result:{
						effect:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								var num=1;
								if(get.attitude(player,target)>0){
									if(player.needsToDiscard()){
										num=0.7;
									}
									else{
										num=0.5;
									}
								}
								if(target.hp>=4) return [1,num*2.5];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						},
					},
					threaten:0.6,
				},
				subSkill:{
					choose:{
						trigger:{global:'phaseEnd'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							if(player.hasMark('dddxuanlun_del')&&!player.countCards('h')) return false;
							return true;
						},
						content:function(){
							'step 0'
							var choices=[];
							var choiceList=['将四张牌以任意顺序置于牌堆顶或底','删去此项和〖朗怀〗中的“可”，直到你发动〖朗怀〗'];
							if(player.countCards('he')>=4||player.hasMark('dddxuanlun_del')) choices.push('选项一');
							else choiceList[0]='<span style="opacity:0.5; ">'+choiceList[0]+'</span>';
							if(!player.hasMark('dddxuanlun_del')) choices.push('选项二');
							else choiceList[1]='<span style="opacity:0.5; text-decoration:line-through; ">'+choiceList[1]+'</span>';
							if(choices.length==1&&choices[0]=='选项一') event._result={control:'选项一'};
							else player.chooseControl(choices).set('choiceList',choiceList).set('ai',()=>{
								if(!_status.event.controls.contains('选项一')) return 1;
								if(!_status.event.controls.contains('选项二')) return 0;
								var player=_status.event.player;
								var num=0;
								for(var card of player.getCards('he')){
									if(get.value(card,player)<=5) num++;
									if(num>=4) break;
								}
								return num>=4?0:1;
							});
							'step 1'
							game.log(player,'选择了','#y'+result.control);
							if(result.control=='选项一'){
								var cards=player.getCards('he');
								if(cards.length<=4) event._result={bool:true,cards:cards};
								else player.chooseCard('玄论：将四张牌置于牌堆顶或牌堆底','he',true,4);
							}
							else{
								player.addMark('dddxuanlun_del',1,false);
								event.finish();
							}
							'step 2'
							if(result.bool){
								var cards=result.cards;
								event.cards=cards;
								player.chooseToMove().set('list',[
									['牌堆顶',cards],
									['牌堆底'],
								]).set('prompt','玄论：将这些牌置于牌堆顶或牌堆底').set('processAI',function(list){
									var cards=list[0][1],player=_status.event.player;
									var target=_status.currentPhase.next;
									var att=get.sgn(get.attitude(player,target));
									var top=[];
									var judges=target.getCards('j');
									var stopped=false;
									if(player!=target||!target.hasWuxie()){
										for(var i=0;i<judges.length;i++){
											var judge=get.judge(judges[i]);
											cards.sort(function(a,b){
												return (judge(b)-judge(a))*att;
											});
											if(judge(cards[0])*att<0){
												stopped=true;break;
											}
											else{
												top.unshift(cards.shift());
											}
										}
									}
									var bottom;
									if(!stopped){
										cards.sort(function(a,b){
											return (get.value(b,player)-get.value(a,player))*att;
										});
										while(cards.length){
											if((get.value(cards[0],player)<=5)==(att>0)) break;
											top.unshift(cards.shift());
										}
									}
									bottom=cards;
									return [top,bottom];
								});
							}
							else event.finish();
							'step 3'
							if(result.bool){
								var top=result.moved[0];
								var bottom=result.moved[1];
								top.reverse();
								player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
								var cards=top.addArray(bottom);
								player.$throw(cards.length,1000);
								player.lose(cards,ui.cardPile).set('top',top).insert_index=function(event,card){
									if(event.top.contains(card)) return ui.cardPile.firstChild;
									return null;
								};
							}
						}
					}
				}
			},
			//张闿
			dddjiexing:{
				audio:2,
				trigger:{
					global:['recoverBegin','useCard'],
				},
				filter:function(event,player){
					if(event.player==player) return false;
					if(event.name=='recover') return player.isDamaged();
					return get.type(event.card,false)=='equip'&&event.cards.some(i=>get.position(i,true)=='o'&&player.canEquip(i,true));
				},
				limited:true,
				skillAnimation:true,
				animationColor:'legend',
				logTarget:'player',
				check:function(event,player){
					if(get.attitude(player,event.player)>=0) return false;
					if(event.name=='recover') return get.recoverEffect(event.player,player,player)<get.recoverEffect(player,player,player);
					return get.effect(event.targets[0],event.card,player,player)<get.effect(player,event.card,player,player);
				},
				content:function(){
					player.awakenSkill('dddjiexing');
					player.addSkill('dddjiexing_reset');
					if(trigger.name=='recover'){
						trigger.cancel();
						player.recover(trigger.num);
					}
					else{
						trigger.all_excluded=true;
						trigger.targets.length=0;
						var cards=trigger.cards.filterInD();
						for(var i of cards){
							if(player.canEquip(i,true)) player.equip(i);
						}
					}
				},
				subSkill:{
					reset:{
						audio:'dddjiexing',
						trigger:{player:['recoverAfter','useCardAfter']},
						filter:function(event,player){
							if(event.getParent().name=='dddjiexing') return false;
							if(event.name=='useCard') return get.type(event.card,false)=='equip';
							return true;
						},
						forced:true,
						charlotte:true,
						content:function(){
							player.restoreSkill('dddjiexing');
							player.removeSkill('dddjiexing_reset');
						}
					}
				}
			},
			dddbailei:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return game.hasPlayer(current=>current.isMaxEquip(true)&&current.countGainableCards(player,'he'))||game.countPlayer(current=>current.hp==1)==1;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('dddbailei'),(card,player,target)=>{
						return target.isMaxEquip(true)&&target.countGainableCards(player,'he')||target.hp==1&&game.countPlayer(current=>current.hp==1)==1;
					}).set('ai',target=>{
						var att=get.attitude(_status.event.player,target);
						if(att>=3) return false;
						if(target.hp==1&&game.countPlayer(current=>current.hp==1)==1) return 100;
						return 1;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('dddbailei',target);
						if(target.isMaxEquip(true)&&target.hp==1&&game.countPlayer(current=>current.hp==1)==1){
							if(target.countGainableCards(player,'he')){
								player.gainPlayerCard('拜泪：获得'+get.translation(target)+'一张牌，或点击“取消”杀死其','he',target);
							}
							else event._result={bool:false};
						}
						else if(target.isMaxEquip(true)) player.gainPlayerCard('拜泪：获得'+get.translation(target)+'一张牌','he',target,true);
						else{
							event._result={bool:false};
						}
					}
					else event.finish();
					'step 2'
					if(!result.bool){
						player.line(target);
						player.trySkillAnimate('dddbailei_animate','dddbailei_animate',player.checkShow('dddbailei'));
						game.delayx();
					}
					else event.finish();
					'step 3'
					target.die({source:player});
					player.removeSkill('dddbailei');
					game.log(player,'失去了技能','#g【拜泪】');
				},
				subSkill:{
					animate:{
						skillAnimation:true,
						animationColor:'fire',
					}
				}
			},
		},
		dynamicTranslate:{
			dddxiaheng:function(player){
				return '锁定技，出牌阶段开始时，你令一名角色弃置两张牌（不足则全弃），再对一名角色造成1点伤害'+(player.storage['dddxiaheng_del']?'':'。“若两名角色：均不为你，你失去一点体力上限；为同一名角色，你失去一点体力；然后若以此法对包括你在内三名不同的角色造成伤害，删除双引号里的描述内容”')+'。';
			},
			dddshichao:function(player){
				return '锁定技，准备阶段，你选择一名手牌数为全场第（'+(1+player.countMark('dddshichao'))+'）大的角色，将手牌数调整至与其相等且至多等于主公的体力上限；其于你的下回合开始前对你造成伤害时，其可防止之，然后令（）内的数字+1。';
			},
			dddlanghuai:function(player){
				return '转换技，摸牌阶段，你'+(player.hasMark('dddxuanlun_del')?'':'可')+'展示手牌（无牌则不展示），并改为摸其中'+(!player.storage['dddlanghuai']?'包含':'缺少')+'花色数的牌。';
			},
			dddxuanlun:function(player){
				var deleted=player.hasMark('dddxuanlun_del');
				return '你受到伤害后，你可摸四张牌；你发动此技能的回合结束时，'+(deleted?'你':'须选择一项：')+'将四张牌以任意顺序置于牌堆顶或底'+(deleted?'。':'；或删去此项和“朗怀”中的“可”，直到你发动“朗怀”。');
			},
		},
		translate:{
			ddd_handang:"韩当",
			dddxianxi:"险袭",
			dddxianxi_info:"出牌阶段，你使用【杀】时可无视距离额外指定任意名角色为目标；此【杀】结算后，若额外指定的目标中有未受到此【杀】伤害的，你须选择一项：弃置X张牌对其各造成1点伤害；或摸X张牌并失去1点体力（X为未受到此【杀】伤害的目标数）。",
			ddd_wuzhi:"吴质",
			dddlingyong:"灵涌",
			dddlingyong_info:"一名角色跳过其的阶段时，你可进行判定。若结果不为【杀】，则你可以使用判定牌，然后重复此流程。",
			dddxuxiao:"虚孝",
			dddxuxiao_info:"当有黑色基本牌因弃置而进入弃牌堆后，你可将其当做【兵粮寸断】置于一名角色的判定区，然后其摸两张牌。",
			ddd_xujing:"许靖",
			dddxuyu:"虚誉",
			dddxuyu_info:"当你于出牌阶段使用的第一张牌结算结束后，你可以摸两张牌。若如此做，当你于本阶段使用的第三张牌结算结束后，你弃置一张牌。",
			dddshijian:"实荐",
			dddshijian_info:"其他角色于出牌阶段使用的第三张牌结算结束后，你可以令其摸一张牌。若如此做，当其于本阶段使用的第四张牌结算结束后，你摸两张牌。",
			ddd_caomao:"曹髦",
			dddtaisi:"太思",
			dddtaisi_info:"一名角色的回合结束时，若你的体力值于本回合内发生过变化，则你可以令一名角色获得一张于本回合内进入弃牌堆的牌。然后若该角色于本回合内对你造成过伤害，则你摸两张牌。",
			dddquche:"驱车",
			dddquche_info:"限定技。出牌阶段，你可依次执行大括号内的流程至多X次（X为你的体力上限）：｛[⒈将一张牌交给一名其他角色]+[将一张黑色牌当做【杀】使用（不计入次数限制）]｝。你每执行一个中括号内的选项，本回合内至其他角色的距离便-1。",
			dddqianlong:"潜龙",
			dddqianlong_info:"主公技，锁定技。当你因执行奖惩而摸牌或弃置牌时，取消之；当你杀死一名角色后，你摸三张牌。",
			ddd_xinxianying:"辛宪英",
			ddddongcha:"洞察",
			ddddongcha_info:"其他角色的回合开始时，你可以令你和其依次将一张手牌置于你的武将牌上，称为“鉴”。若如此做，本回合结束时，你与其依次选择获得一张“鉴”。",
			dddzhijie:"智解",
			dddzhijie_info:"你可以将两张颜色相同的“鉴”当做【闪】使用，或将两张颜色不同的“鉴”当做【无懈可击】使用；然后你摸两张牌。",
			ddd_xianglang:'向朗',
			dddqiahua:"恰化",
			dddqiahua_info:"其他角色的回合开始时，你可选择X张不为“明”的手牌作为“明”（X为其体力值，这些牌对所有角色可见），然后其于本回合内获得〖恂恂〗。",
			dddfusi:"腹笥",
			dddfusi_info:"锁定技。①你的“明”不计入手牌上限。②其他角色需要使用牌时，可以改为使用你的“明”（需经过你的确认）。③你的回合内，若你的手牌均为“明”，则其他角色不能使用各自的手牌。",
			dddfusi_global:"腹笥",
			dddtuoji:"拓籍",
			dddtuoji_info:"其他角色因〖腹笥〗而使用你的牌后，若你的手牌均为“明”，则你可以摸三张牌。",
			dddxujing_tag:"明",
			ddd_yujin:'于禁',
			dddzhengjun:'整军',
			dddzhengjun_info:'出牌阶段内每项各限一次。当有其他角色的手牌数/体力值/装备区内牌数变化后，若其的对应数值与你相同，则你可以执行对应的选项。体力值：你令一名角色回复1点体力；手牌数：你令一名角色摸一张牌；装备区内牌数：你移动场上的一张装备牌。',
			ddd_liuye:'刘晔',
			dddchashi:'察势',
			dddchashi_info:'其他角色的出牌阶段开始时，你可展示一张牌A。若其本阶段内：已经使用过牌，{则你判断A和第一张使用的牌的花色，若花色相同，则其获得A，你摸一张牌}；未使用过牌，{则当其于本阶段内使用第一张牌时，若此牌与A花色相同，其获得A，然后你摸一张牌}。',
			dddqice:'齐策',
			dddqice_info:'准备阶段开始时，你可以摸两张牌。若如此做，本回合的结束阶段开始时，若你本回合内：使用过普通锦囊牌，则你可以视为使用这些牌中的一张；未使用过普通锦囊牌，则你失去此技能。',
			ddd_baosanniang:'鲍三娘',
			dddzhilian:'枝连',
			dddzhilian_info:'一名角色的回合结束时，若本回合使用过牌的角色数为2，则你可以令这些角色各摸一张牌或各弃置一张牌。然后若这两名角色中包含你，则你获得本回合内进入弃牌堆的所有【杀】。',
			dddjijian:'赍剑',
			dddjijian_info:'出牌阶段限一次。你可以指定一名其他男性角色，令其展示至多两张手牌。然后你可以交给其一张【杀】，且其可以依次视为使用X张与其手牌中未展示牌牌名相同的不重复基本牌或普通锦囊牌（X为此【杀】与其展示牌中颜色相同的牌的数量）。',
			ddd_zhenji:'甄姬',
			dddmiaoxing:'淼形',
			dddmiaoxing_info:'锁定技，分发起始手牌时，共发你三份起始手牌，你将其中两份移出游戏，称为“水相”；摸牌阶段结束后，你须将至少一份“水相”调整至与你的手牌数相等。',
			dddfushi:'浮世',
			dddfushi_info:'每回合限一次，你使用或打出的基本牌结算后，你可用所有手牌交换一份“水相”，然后你可令一名男性角色选择是否用其所有手牌交换一份“水相”。',
			ddd_zhaoang:'赵昂',
			dddfenji:'奋计',
			dddfenji_info:'摸牌/弃牌阶段开始时，你可视为使用一张未以此法使用过的普通锦囊牌，然后将此阶段摸牌/弃牌数改为此牌造成的伤害值/目标数。',
			ddd_zhouchu:'周处',
			dddxiaheng:'侠横',
			dddxiaheng_info:'锁定技，出牌阶段开始时，你令一名角色弃置两张牌（不足则全弃），再对一名角色造成1点伤害。“若两名角色：均不为你，你失去一点体力上限；为同一名角色，你失去一点体力；然后若以此法对包括你在内三名不同的角色造成伤害，删除双引号里的描述内容”。',
			ddd_liuba:'刘巴',
			dddfengzheng:'丰政',
			dddfengzheng_info:'每名角色的出牌阶段限一次，其可将点数之和为K的任意张手牌当一张【无中生有】使用；轮次结束时，你可观看并分配牌堆顶的X张牌（X为此轮发动过“丰政”的角色数），若有角色以此法获得的牌数多于两张，你失去“丰政”。',
			dddyulv:'玉律',
			dddyulv_info:'锁定技，游戏开始时，你声明一个点数；此点数的牌进入弃牌堆后，你令当前回合角色摸或弃置一张牌；一名角色连续以此法摸牌或弃牌后，你为“玉律”重新声明一个点数，然后于结算后结束当前回合。',
			ddd_jianshuo:'蹇硕',
			dddfenye:'分野',
			dddfenye_info:'出牌阶段限一次，你可与一名其他角色拼点，然后其余角色可加入其中一方并扣置一张手牌作为其拼点牌，比较双方点数均值，拼点胜方角色依次可视为对一名不同的拼点败方角色使用【杀】。',
			dddshichao:'逝潮',
			dddshichao_info:'锁定技，准备阶段，你选择一名手牌数为全场第（1）大的角色，将手牌数调整至与其相等且至多等于主公的体力上限；其于你的下回合开始前对你造成伤害时，其可防止之，然后令（）内的数字+1。',
			ddd_guanning:'管宁',
			dddyouxue:'游学',
			dddyouxue_info:'锁定技，每轮开始时，你选定你的行动次序，其对应的座次位置称为“虚位”，然后执行额定的摸牌阶段，且摸牌数改为“虚位”移动的距离。',
			dddchengjing:'承经',
			dddchengjing_info:'出牌阶段限一次，你可将一张牌当虚位上家角色上回合使用的一张基本牌或普通锦囊牌使用，若之造成/未造成伤害，你可令虚位下家角色下回合的摸牌数/手牌上限+1或-1。',
			ddd_dingfeng:'丁奉',
			dddduanbing:'短兵',
			dddduanbing_info:'出牌阶段，你可将一张黑色非锦囊牌当一张【兵粮寸断】置入自己的判定区，摸两张牌，然后视为使用一张无视距离限制的【杀】；当此【杀】对目标角色造成伤害后，你可将此【兵粮寸断】移至目标角色的判定区。',
			ddd_kebineng:'轲比能',
			dddxiaoxing:'枭行',
			dddxiaoxing_info:'锁定技，你的初始手牌，攻击范围和手牌上限+3；你进入濒死状态时，伤害来源可以废除其有装备牌的武器栏，再令你失去“枭行”。',
			dddlangzhi:'狼志',
			dddlangzhi_info:'结束阶段，你可展示你攻击范围内的所有角色各一张牌，然后选择一项：1.用任意张牌替换其中等量张牌；2.获得所有展示牌，再失去“狼志”。',
			dddfuyi:'附义',
			dddfuyi_both:'〖枭行〗和〖狼志〗',
			dddfuyi_info:'主公技，其他群势力角色执行奖惩时，若你已失去“枭行”或“狼志”，其可改为令你获得其中一或两个；若为两个，你摸三张牌，再失去“附义”。',
			ddd_caoshuang:'曹爽',
			ddd_xuelingyun:'薛灵芸',
			ddd_liuhong:'刘宏',
			ddd_xiahouxuan:'夏侯玄',
			ddd_zhangkai:'张闿',
			dddzhuanshe:'专摄',
			'dddzhuanshe_info':'其他角色的出牌阶段开始时，你可将一张手牌正面朝上交给该角色，则当其在此回合内：使用与之名称相同的基本牌或普通锦囊牌时，你可无视距离限制为之额外选择一个目标；未使用与之名称相同的牌，你可在回合结束时对其造成1点伤害。',
			'dddweiqiu':'危秋',
			'dddweiqiu_info':'锁定技，一名角色回复体力前，若你没有手牌，改为令你摸一张牌。',
			'dddlianer':'涟洏',
			'dddlianer_info':'当你使用红色牌结算后，你可以获得之，然后你只能使用点数小于此牌的牌直到回合结束。',
			'dddanzhi':'暗织',
			'dddanzhi_info':'一名角色的回合开始时，若最近进入并在弃牌堆的牌包含黑色，你可以指定一名角色，此回合其第一次成为黑色牌的目标时，此牌对其无效。',
			'dddshixing':'失兴',
			'dddshixing_info':'锁定技，若有未受伤的女性角色，你视为拥有“享乐”；若当前回合没有锦囊牌被使用，你视为拥有“酒诗”；若你没有上述技能，你视为拥有“制衡”。',
			'ddddanggu':'党锢',
			'ddddanggu_info':'锁定技，结束阶段，你横置任意名角色的武将牌，直到场上已横置的角色数不少于X（X为群势力角色数）；其他角色的弃牌阶段，若其处于“连环状态”，其装备区里的牌视为手牌。',
			'dddlanghuai':'朗怀',
			'dddlanghuai_info':'转换技，摸牌阶段，你可展示手牌（无牌则不展示），并改为摸其中①包含②缺少花色数的牌。',
			'dddxuanlun':'玄论',
			'dddxuanlun_info':'你受到伤害后，你可摸四张牌；你发动此技能的回合结束时，须选择一项：将四张牌以任意顺序置于牌堆顶或底；或删去此项和“朗怀”中的“可”，直到你发动“朗怀”。',
			'dddjiexing':'劫行',
			'dddjiexing_info':'限定技，其他角色回复体力时，你可改为你回复等量体力；其他角色使用装备牌时，你可改为将此牌置入你的装备区。当你不以此法回复体力后或使用装备牌后，重置此技能。',
			'dddbailei':'拜泪',
			'dddbailei_info':'准备阶段，你可获得装备区牌数唯一最多的角色的一张牌，或杀死体力值唯一为一的角色并失去此技能。',
		},
	};
});
