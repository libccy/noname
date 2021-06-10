'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'yingbian',
		connect:true,
		character:{
			weiguan:['male','jin',3,['zhongyun','shenpin']],
			cheliji:['male','qun',4,['chexuan','qiangshou']],
			simazhou:['male','jin',4,['caiwang','naxiang']],
			huangzu:['male','qun',4,['wangong'],['unseen']],
			ol_lisu:['male','qun',3,['qiaoyan','xianzhu']],
			jin_yanghuiyu:['female','jin',3,['huirong','ciwei','caiyuan'],['hiddenSkill']],
			shibao:['male','jin',4,['zhuosheng']],
			jin_zhangchunhua:['female','jin',3,['huishi','qingleng','xuanmu'],['hiddenSkill']],
			jin_simayi:['male','jin',3,['buchen','smyyingshi','xiongzhi','quanbian'],['hiddenSkill']],
			jin_wangyuanji:['female','jin',3,['shiren','yanxi'],['hiddenSkill']],
			jin_simazhao:['male','jin',3,['tuishi','choufa','zhaoran','chengwu'],['zhu','hiddenSkill']],
			jin_xiahouhui:['female','jin',3,['baoqie','jyishi','shiduo'],['hiddenSkill']],
			jin_simashi:['male','jin','3/4',['taoyin','yimie','ruilve','tairan'],['hiddenSkill','zhu']],
			zhanghuyuechen:['male','jin',4,['xijue']],
			duyu:['male','jin',4,['sanchen','zhaotao']],
		},
		characterSort:{
			yingbian:{
				yingbian_pack1:['jin_simayi','jin_zhangchunhua','ol_lisu','simazhou','cheliji'],
				yingbian_pack2:['jin_simashi','jin_xiahouhui','zhanghuyuechen','shibao','jin_yanghuiyu'],
				yingbian_pack3:['jin_simazhao','jin_wangyuanji','duyu','weiguan'],
			},
		},
		skill:{
			buchen:{
				audio:2,
				trigger:{player:'showCharacterAfter'},
				hiddenSkill:true,
				filter:function(event,player){
					var target=_status.currentPhase;
					return target&&target!=player&&target.countGainableCards(player,'he')>0;
				},
				direct:true,
				content:function(){
					var target=_status.currentPhase;
					player.gainPlayerCard(target,'he',get.prompt('buchen',target)).set('logSkill',['buchen',target]);
				},
			},
			smyyingshi:{
				audio:2,
				enable:'phaseUse',
				locked:true,
				filter:function(event,player){
					return Array.isArray(event.smyyingshi);
				},
				onChooseToUse:function(event){
					if(game.online||!event.player.hasSkill('smyyingshi')) return;
					var cards=[];
					for(var i=0;i<event.player.maxHp;i++){
						var card=ui.cardPile.childNodes[i];
						if(card) cards.push(card);
						else break;
					}
					event.set('smyyingshi',cards);
				},
				chooseButton:{
					dialog:function(event){
						var dialog=ui.create.dialog('鹰视','hidden');
						if(event.smyyingshi&&event.smyyingshi.length) dialog.add(event.smyyingshi);
						else dialog.addText('牌堆无牌');
						for(var i of dialog.buttons){
							i.classList.add('noclick');
						}
						dialog.buttons.length=0;
						return dialog;
					},
					filter:function(){
						return false;
					},
				},
			},
			xiongzhi:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					'step 0'
					player.awakenSkill('xiongzhi');
					'step 1'
					var card=get.cards()[0];
					event.card=card;
					player.showCards(card);
					if(!player.hasUseTarget(card)){
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
						event.finish();
					}
					'step 2'
					var next=player.chooseUseTarget(card,true);
					if(get.info(card).updateUsable=='phaseUse') next.addCount=false;
					'step 3'
					if(result.bool) event.goto(1);
					else{
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(!player.hasSkill('smyyingshi')) return 1;
							var cards=[];
							for(var i=0;i<Math.min(2,player.maxHp);i++){
								var card=ui.cardPile.childNodes[i];
								if(card){
									if(!player.hasValueTarget(card)) return 0;
								}
								else break;
							}
							return 1;
						},
					},
				},
			},
			quanbian:{
				audio:2,
				trigger:{player:['useCard','respond']},
				hasHand:function(event){
					var evts=event.player.getHistory('lose',function(evt){
						return evt.getParent()==event;
					});
					return evts&&evts.length==1&&evts[0].hs.length>0;
				},
				filter:function(event,player){
					var phase=event.getParent('phaseUse');
					if(!phase||phase.player!=player) return false;
					var suit=get.suit(event.card);
					if(!lib.suit.contains(suit)||!lib.skill.quanbian.hasHand(event)) return false;
					return player.getHistory('useCard',function(evt){
						return evt!=event&&get.suit(evt.card)==suit&&lib.skill.quanbian.hasHand(evt)&&evt.getParent('phaseUse')==phase;
					}).length+player.getHistory('respond',function(evt){
						return evt!=event&&get.suit(evt.card)==suit&&lib.skill.quanbian.hasHand(evt)&&evt.getParent('phaseUse')==phase;
					}).length==0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseControl('cancel2').set('prompt',get.prompt('quanbian')).set('choiceList',[
						'摸一张牌',
						'观看牌堆顶的'+get.cnNumber(player.maxHp)+'张牌并将其中一张置于牌堆底',
					]).set('ai',function(){
						var player=_status.event.player;
						var suit=get.suit(_status.event.getTrigger().card);
						if(player.countCards('h',function(card){
							return get.suit(card)==suit&&player.hasValueTarget(card,null,true);
						})) return 'cancel2';
						return 0;
					});
					'step 1'
					if(result.control=='cancel2'){
						event.finish();
						return;
					}
					player.addTempSkill('quanbian2');
					player.storage.quanbian2.add(get.suit(trigger.card));
					player.markSkill('quanbian2');
					if(result.index==0){
						player.draw();
						event.finish();
						return;
					}
					event.cards=get.cards(player.maxHp);
					player.chooseButton(['将一张牌置于牌堆底',event.cards],true);
					'step 2'
					while(cards.length){
						var card=cards.pop();
						card.fix();
						if(card==result.links[0]) ui.cardPile.appendChild(card);
						else ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
				},
			},
			quanbian2:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				mod:{
					cardEnabled2:function(card,player){
						if(get.position(card)=='h'&&player.storage.quanbian2.contains(get.suit(card))) return false;
					},
				},
				intro:{
					content:'本回合内不能使用$花色的手牌',
				},
			},
			//卫瓘
			zhongyun:{
				audio:2,
				trigger:{player:['damageEnd','recoverEnd']},
				forced:true,
				filter:function(event,player){
					return player.hp==player.countCards('h')&&(player.isDamaged()||game.hasPlayer(function(current){
						return player.inRange(current);
					}));
				},
				content:function(){
					'step 0'
					var filterTarget=function(card,player,target){
						return player.inRange(target);
					};
					if(game.hasPlayer((current)=>filterTarget('L∞pers',player,current))){
						var bool=player.isHealthy();
						player.chooseTarget('忠允：对攻击范围内的一名角色造成1点伤害'+(bool?'':'，或点取消回复1点体力'),filterTarget,bool);
					}
					else event._result={bool:false};
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.damage();
					}
					else player.recover();
				},
				group:'zhongyun2',
			},
			zhongyun2:{
				audio:'zhongyun',
				trigger:{
					player:['loseAfter','gainAfter'],
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				forced:true,
				filter:function(event,player){
					if(event.name!='gain'||player!=event.player){
						var evt=event.getl(player);
						if(!evt||!evt.hs||!evt.hs.length) return false;
					}
					return player.countCards('h')==player.hp;
				},
				usable:1,
				content:function(){
					'step 0'
					var filterTarget=function(card,player,target){
						return target!=player&&target.countDiscardableCards(player,'he')>0;
					}
					if(!game.hasPlayer((current)=>filterTarget('L∞pers',player,current))) event._result={bool:false};
					else player.chooseTarget(filterTarget,'忠允：弃置一名其他角色的一张牌，或点取消摸一张牌').set('ai',function(target){
						var att=get.attitude(player,target);
						if(att>=0) return 0;
						if(target.countCards('he',function(card){
							return get.value(card)>5;
						})) return -att;
						return 0;
					});
					'step 1'
					if(!result.bool) player.draw();
					else{
						var target=result.targets[0];
						player.line(target,'green');
						player.discardPlayerCard(target,true,'he');
					}
				},
			},
			shenpin:{
				audio:2,
				trigger:{global:'judge'},
				filter:function(event,player){
					var color=get.color(event.player.judging[0],event.player);
					return player.countCards('hes',function(card){
						if(_status.connectMode&&get.position(card)!='e') return true;
						return get.color(card)!=color;
					})>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var color=get.color(trigger.player.judging[0],trigger.player);
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('shenpin'),'hes',function(card){
						if(get.color(card)==_status.event.color) return false;
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
						if(mod!='unchanged') return mod;
						return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result;
						}
						else{
							return -result;
						}
					}).set('judging',trigger.player.judging[0]).set('color',color);
					"step 1"
					if(result.bool){
						player.respond(result.cards,'highlight','shenpin','noOrdering');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(function(card){
								if(card.clone){
									card.clone.classList.remove('thrownhighlight');
								}
							},trigger.player.judging[0]);
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1
					}
				}
			},
			//彻里吉
			chexuan:{
				audio:2,
				enable:'phaseUse',
				derivation:['cheliji_sichengliangyu','cheliji_tiejixuanyu','cheliji_feilunzhanyu'],
				filter:function(event,player){
					return !player.getEquip(5)&&player.countCards('he',{color:'black'})>0;
				},
				filterCard:{color:'black'},
				position:'he',
				check:function(card){
					return 5-get.value(card);
				},
				content:function(){
					'step 0'
					player.chooseButton(['请选择要装备的宝物',[lib.skill.chexuan.derivation.map(function(i){
						return ['宝物','',i];
					}),'vcard']],true).set('ai',function(button){
						if(button.link[2]=='cheliji_sichengliangyu'&&player.countCards('h')<player.hp) return 1;
						return Math.random();
					});
					'step 1'
					var card=game.createCard(result.links[0][2]);
					player.$gain2(card);
					player.equip(card);
					game.delay();
				},
				group:'chexuan_lose',
				subfrequent:['lose'],
				ai:{
					order:0.4,
					result:{
						player:1,
					},
				},
				subSkill:{
					lose:{
						audio:'chexuan',
						trigger:{
							player:'loseAfter',
							global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
						},
						frequent:true,
						filter:function(event,player){
							var evt=event.getl(player);
							if(!evt||!evt.es||!evt.es.length) return false;
							for(var i of evt.es){
								if(get.subtype(i,false)=='equip5') return true;
							}
							return false;
						},
						content:function(){
							'step 0'
							player.judge(function(card){
								if(get.color(card)=='black') return 3;
								return 0;
							});
							'step 1'
							if(result.bool){
								var card=game.createCard(lib.skill.chexuan.derivation.randomGet());
								player.$gain2(card);
								player.equip(card);
								game.delay();
							}
						},
					},
				}
			},
			qiangshou:{
				mod:{
					globalFrom:function(player,target,distance){
						if(player.getEquip(5)) return distance-1;
					}
				},
			},
			cheliji_sichengliangyu:{
				trigger:{global:'phaseJieshuBegin'},
				equipSkill:true,
				filter:function(event,player){
					return player.countCards('h')<player.hp&&player.getEquip('cheliji_sichengliangyu');
				},
				content:function(){
					'step 0'
					player.draw(2);
					'step 1'
					var card=player.getEquip('cheliji_sichengliangyu');
					if(card) player.discard(card);
				},
			},
			cheliji_tiejixuanyu:{
				trigger:{global:'phaseJieshuBegin'},
				equipSkill:true,
				filter:function(event,player){
					return player!=event.player&&!event.player.getHistory('sourceDamage').length
					&&event.player.countCards('he')>0&&player.getEquip('cheliji_tiejixuanyu');
				},
				logTarget:'player',
				check:function(event,player){
					return get.attitude(player,event.player)<0;
				},
				content:function(){
					'step 0'
					trigger.player.chooseToDiscard('he',2,true);
					'step 1'
					var card=player.getEquip('cheliji_tiejixuanyu');
					if(card) player.discard(card);
				},
			},
			cheliji_feilunzhanyu:{
				trigger:{global:'phaseJieshuBegin'},
				equipSkill:true,
				filter:function(event,player){
					return player!=event.player&&event.player.getHistory('useCard',function(card){
						return get.type(card)!='basic';
					}).length>0&&event.player.countCards('he')>0&&player.getEquip('cheliji_feilunzhanyu');
				},
				logTarget:'player',
				check:function(event,player){
					return get.attitude(player,event.player)<=0;
				},
				content:function(){
					'step 0'
					trigger.player.chooseCard('he',true,'将一张牌交给'+get.translation(player));
					'step 1'
					if(result.bool) player.gain(result.cards,trigger.player,'giveAuto');
					'step 2'
					var card=player.getEquip('cheliji_feilunzhanyu');
					if(card) player.discard(card);
				},
			},
			//司马伷和黄祖
			caiwang:{
				audio:2,
				trigger:{global:['useCard','respond']},
				filter:function(event,player){
					if(!Array.isArray(event.respondTo)||event.respondTo[0]==event.player||![event.respondTo[0],event.player].contains(player)) return false;
					var color=get.color(event.card);
					if(color=='none'||get.color(event.respondTo[1])!=color) return false;
					var target=lib.skill.caiwang.logTarget(event,player);
					return target[player.getStorage('naxiang2').contains(target)?'countGainableCards':'countDiscardableCards'](player,'he')>0
				},
				logTarget:function(event,player){
					return (player==event.respondTo[0]?event.player:event.respondTo[0]);
				},
				prompt2:function(event,player){
					var target=lib.skill.caiwang.logTarget(event,player);
					return (player.getStorage('naxiang2').contains(target)?'获得':'弃置')+'该角色的一张牌';
				},
				check:function(event,player){
					return get.attitude(player,lib.skill.caiwang.logTarget(event,player))<=0;
				},
				content:function(){
					var target=lib.skill.caiwang.logTarget(trigger,player);
					player[player.getStorage('naxiang2').contains(target)?'gainPlayerCard':'discardPlayerCard'](target,'he',true);
				},
			},
			naxiang:{
				audio:2,
				trigger:{
					player:'damageEnd',
					source:'damageSource',
				},
				forced:true,
				filter:function(event,player){
					var target=lib.skill.naxiang.logTarget(event,player);
					return target&&target!=player&&target.isAlive();
				},
				logTarget:function(event,player){
					return player==event.player?event.source:event.player;
				},
				content:function(){
					player.addTempSkill('naxiang2',{player:'phaseBegin'});
					if(!player.storage.naxiang2) player.storage.naxiang2=[];
					player.storage.naxiang2.add(lib.skill.naxiang.logTarget(trigger,player));
					player.markSkill('naxiang2');
				},
				ai:{
					combo:'caiwang',
				},
			},
			naxiang2:{
				onremove:true,
				intro:{
					content:'已接受$的投降；对这些角色发动【才望】时将“弃置”改为“获得”',
				},
			},
			wangong:{
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return get.type(event.card,false)=='basic';
				},
				content:function(){
					player.addSkill('wangong2');
				},
			},
			wangong2:{
				trigger:{player:'useCard1'},
				forced:true,
				popup:false,
				firstDo:true,
				charlotte:true,
				content:function(){
					player.removeSkill('wangong2');
					if(trigger.card.name=='sha') trigger.baseDamage++;
				},
				mod:{
					cardUsable:function(card){
						if(card.name=='sha') return Infinity;
					},
					targetInRange:function(card){
						if(card.name=='sha') return true;
					},
				},
				mark:true,
				intro:{
					content:'使用【杀】无距离和次数限制且伤害+1',
				},
			},
			//李肃
			qiaoyan:{
				trigger:{player:'damageBegin2'},
				forced:true,
				filter:function(event,player){
					return player!=_status.currentPhase&&event.source&&event.source!=player;
				},
				logTarget:'source',
				content:function(){
					'step 0'
					var cards=player.getStorage('qiaoyan');
					if(cards.length){
						var source=trigger.source;
						player.$give(cards,source,false);
						source.gain(cards,'log');
						player.unmarkAuto('qiaoyan',cards);
						event.goto(3);
					}
					else{
						trigger.cancel();
						player.draw();
					}
					'step 1'
					var hs=player.getCards('he');
					if(!hs.length) event.finish();
					else if(hs.length==1) event._result={bool:true,cards:hs};
					else player.chooseCard('he',true,'将一张牌作为“珠”置于武将牌上');
					'step 2'
					if(result.bool&&result.cards&&result.cards.length){
						var cards=result.cards;
						player.lose(cards,ui.special,'visible','toStorage');
						player.$give(cards,player,false);
						player.markAuto('qiaoyan',cards);
						game.log(player,'将',cards,'放在了武将牌上');
					}
					event.finish();
					'step 3'
					game.delayx();
				},
				marktext:'珠',
				intro:{content:'cards',onunmark:'throw'},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(!player.getStorage('qiaoyan').length) return false;
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
					combo:'xianzhu',
				},
			},
			xianzhu:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				locked:true,
				filter:function(event,player){
					return player.storage.qiaoyan&&player.storage.qiaoyan.length>0;
				},
				content:function(){
					'step 0'
					event.cards=player.storage.qiaoyan;
					player.chooseTarget(true,'请选择【献珠】的目标','令一名角色获得'+get.translation(event.cards)+'。若该角色不为你自己，则你令其视为对其攻击范围内的另一名角色使用【杀】').set('ai',function(target){
						var player=_status.event.player;
						var eff=get.sgn(get.attitude(player,target))*get.value(_status.event.getParent().cards[0],target);
						if(player!=target) eff+=Math.max.apply(null,game.filterPlayer(function(current){
							if(current!=target&&target.inRange(current)&&target.canUse('sha',current)) return true;
						}).map(function(current){
							return get.effect(current,{name:'sha'},target,player);
						}));
						return eff;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('xianzhu',target);
						player.$give(cards,target,false);
						target.gain(cards,'log');
						player.unmarkAuto('qiaoyan',cards);
					}
					else event.finish();
					'step 2'
					game.delayx();
					if(player!=target&&target.isIn()&&player.isIn()&&game.hasPlayer(function(current){
						return current!=target&&target.inRange(current)&&target.canUse('sha',current);
					})){
						var str=get.translation(target);
						player.chooseTarget(true,'选择'+str+'攻击范围内的一名角色，视为'+str+'对其使用【杀】',function(card,player,target){
							var source=_status.event.target;
							return source.inRange(target)&&source.canUse('sha',target);
						}).set('target',target).set('ai',function(target){
							var evt=_status.event;
							return get.effect(target,{name:'sha'},evt.target,evt.player)
						});
					}
					else event.finish();
					'step 3'
					if(result.bool) target.useCard({name:'sha',isCard:true},result.targets[0],false);
				},
				ai:{combo:'qiaoyan'},
			},
			huirong:{
				trigger:{player:'showCharacterAfter'},
				forced:true,
				filter:function(event,player){
					return event.toShow&&event.toShow.contains('jin_yanghuiyu')&&game.hasPlayer(function(target){
						var num=target.countCards('h');
						return num>target.hp||num<Math.min(5,target.hp);
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget('请选择【慧容】的目标','令一名角色将手牌数摸至/弃置至与其体力值相同（至多摸至五张）',true,function(card,player,target){
						var num=target.countCards('h');
						return num>target.hp||num<Math.min(5,target.hp);
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						var num=target.countCards('h');
						if(num>target.hp) return -att*(num-target.hp);
						return att*Math.max(0,Math.min(5,target.hp)-target.countCards('h'));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						if(target.countCards('h')<target.hp) target.drawTo(Math.min(5,target.hp));
						else target.chooseToDiscard('h',true,target.countCards('h')-target.hp);
					}
				},
			},
			ciwei:{
				trigger:{global:'useCard'},
				direct:true,
				filter:function(event,player){
					if(event.all_excluded||event.player==player||event.player!=_status.currentPhase||!player.countCards('he')) return false;
					return event.player.getHistory('useCard').indexOf(event)==1&&['basic','trick'].contains(get.type(event.card));
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt('ciwei',trigger.player),'弃置一张牌，取消'+get.translation(trigger.card)+'的所有目标','he').set('ai',function(card){
						return (_status.event.goon/1.4)-get.value(card);
					}).set('goon',function(){
						if(!trigger.targets.length) return -get.attitude(player,trigger.player);
						var num=0;
						for(var i of trigger.targets){
							num-=get.effect(i,trigger.card,trigger.player,player)
						}
						return num;
					}()).logSkill=['ciwei',trigger.player];
					'step 1'
					if(result.bool){
						trigger.targets.length=0;
						trigger.all_excluded=true;
					}
				},
				global:'ciwei_ai',
			},
			ciwei_ai:{
				mod:{
					aiOrder:function(player,card,num){
						if(player!=_status.currentPhase||player.getHistory('useCard').length>1||!game.hasPlayer(function(current){
							return current!=player&&(get.realAttitude||get.attitude)(current,player)<0&&current.hasSkill('ciwei')&&current.countCards('he')>0;
						})) return;
						if(player.getHistory('useCard').length==0){
							if(['basic','trick'].contains(get.type(card))) return num+10;
							return;
						}
						if(!['basic','trick'].contains(get.type(card))) return num+10;
						if(!player._ciwei_temp){
							player._ciwei_temp=true;
							num/=Math.max(1,player.getUseValue(card));
						}
						delete player._ciwei_temp;
						return num;
					},
				},
			},
			caiyuan:{
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					return !player.hasSkill('caiyuan_mark')&&player.phaseNumber>1;
				},
				content:function(){
					player.draw(2);
				},
				group:'caiyuan_count',
				subSkill:{
					mark:{
						//mark:true,
						marktext:'媛',
						charlotte:true,
						intro:{content:'已扣减过体力'},
					},
					count:{
						trigger:{player:'changeHp'},
						silent:true,
						charlotte:true,
						filter:function(event,player){
							return event.num<0&&!player.hasSkill('caiyuan_mark');
						},
						content:function(){
							player.addTempSkill('caiyuan_mark',{player:'phaseAfter'});
							if(player.hasSkill('caiyuan')) player.markSkill('caiyuan_mark');
						},
					},
				},
			},
			zhuosheng:{
				audio:2,
				locked:false,
				onremove:function(player){
					player.removeSkill('zhuosheng_count');
					player.removeGaintag('zhuosheng');
				},
				mod:{
					targetInRange:function(card,player,target){
						if(!card.cards||get.type(card)!='basic') return;
						for(var i of card.cards){
							if(i.hasGaintag('zhuosheng')) return (game.online?player==_status.currentPhase:player.isPhaseUsing());
						}
					},
					cardUsable:function(card,player,target){
						if(!card.cards||get.type(card)!='basic'||!(game.online?player==_status.currentPhase:player.isPhaseUsing())) return;
						for(var i of card.cards){
							if(i.hasGaintag('zhuosheng')) return Infinity;
						}
					},
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&card.hasGaintag('zhuosheng')&&get.type(card)=='basic') return num-0.1;
					},
				},
				trigger:{player:'useCard2'},
				direct:true,
				filterx:function(event,player){
					if(!player.isPhaseUsing()) return false;
					return player.getHistory('lose',function(evt){
						if(evt.getParent()!=event) return false;
						for(var i in evt.gaintag_map){
							if(evt.gaintag_map[i].contains('zhuosheng')) return true;
						}
						return false;
					}).length>0;
				},
				filter:function(event,player){
					if(!lib.skill.zhuosheng.filterx(event,player)) return false;
					if(get.type(event.card)!='trick') return false;
					if(event.targets&&event.targets.length>0) return true;
					var info=get.info(event.card);
					if(info.allowMultiple==false) return false;
					if(event.targets&&!info.multitarget){
						if(game.hasPlayer(function(current){
							return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current)&&lib.filter.targetInRange(event.card,player,current);
						})){
							return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					var prompt2='为'+get.translation(trigger.card)+'增加或减少一个目标'
					player.chooseTarget(get.prompt('zhuosheng'),function(card,player,target){
						var player=_status.event.player;
						if(_status.event.targets.contains(target)) return true;
						return lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
					}).set('prompt2',prompt2).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return get.effect(target,trigger.card,player,player)*(_status.event.targets.contains(target)?-1:1);
					}).set('targets',trigger.targets).set('card',trigger.card);
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
						player.logSkill('zhuosheng',event.targets);
						if(trigger.targets.contains(event.targets[0])) trigger.targets.removeArray(event.targets);
						else trigger.targets.addArray(event.targets);
					}
				},
				group:['zhuosheng_equip','zhuosheng_silent'],
				subfrequent:['equip'],
				subSkill:{
					equip:{
						audio:'zhuosheng',
						trigger:{player:'useCard'},
						filter:function(event,player){
							return get.type(event.card)=='equip'&&lib.skill.zhuosheng.filterx(event,player);
						},
						frequent:true,
						prompt:'是否发动【擢升】摸一张牌？',
						content:function(){
							player.draw();
						},
					},
					silent:{
						trigger:{
							player:['enterGame','useCard1'],
							global:'gameDrawAfter',
						},
						silent:true,
						firstDo:true,
						filter:function(event,player){
							if(event.name=='useCard') return get.type(event.card)=='basic'&&lib.skill.zhuosheng.filterx(event,player)&&event.addCount!==false;
							return true;
						},
						content:function(){
							if(trigger.name=='useCard'){
								trigger.addCount=false;
								var stat=player.getStat();
								if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
							}
							else{
								player.addSkill('zhuosheng_count');
								player.addGaintag(player.getCards('h'),'zhuosheng');
							}
						},
					},
				},
			},
			zhuosheng_count:{
				trigger:{
					player:'gainBegin',
					global:'roundStart',
				},
				silent:true,
				filter:function(event,player){
					if(event.name=='gain') return event.getParent(2).name!='zhuosheng_equip';
					return game.roundNumber>1;
				},
				content:function(){
					if(trigger.name=='gain') trigger.gaintag.add('zhuosheng');
					else player.removeGaintag('zhuosheng');
				},
			},
			xinquanbian:{
				audio:'quanbian',
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					var phase=event.getParent('phaseUse');
					if(!phase||phase.player!=player) return false;
					var suit=get.suit(event.card);
					if(!lib.suit.contains(suit)||!lib.skill.quanbian.hasHand(event)) return false;
					return player.getHistory('useCard',function(evt){
						return evt!=event&&get.suit(evt.card)==suit&&lib.skill.quanbian.hasHand(evt)&&evt.getParent('phaseUse')==phase;
					}).length+player.getHistory('respond',function(evt){
						return evt!=event&&get.suit(evt.card)==suit&&lib.skill.quanbian.hasHand(evt)&&evt.getParent('phaseUse')==phase;
					}).length==0;
				},
				content:function(){
					'step 0'
					var cards=get.cards(Math.min(5,player.maxHp));
					event.cards=cards;
					var suit=get.suit(trigger.card);
					player.chooseButton(['权变：获得一张不为'+get.translation(suit)+'花色的牌',cards]).set('suit',suit).set('filterButton',function(button){
						return get.suit(button)!=_status.event.suit;
					});
					'step 1'
					if(result.bool){
						var card=result.links[0];
						cards.remove(card);
						player.gain(card,'gain2','log');
						if(!cards.length) event.finish();
					}
					'step 2'
					player.chooseCardButton(cards.length,true,cards,'按顺序将卡牌置于牌堆顶（先选择的在上）');
					'step 3'
					if(result.bool){
						var list=result.links.slice(0);
						while(list.length){
							ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
						}
						game.updateRoundNumber();
					}
				},
				group:'xinquanbian_count',
			},
			xinquanbian_count:{
				trigger:{player:'useCard1'},
				silent:true,
				firstDo:true,
				filter:function(event,player){
					return player.isPhaseUsing()&&lib.skill.quanbian.hasHand(event)&&get.type(event.card)!='equip';
				},
				content:function(){
					var stat=player.getStat('skill');
					if(!stat.quanbian) stat.quanbian=0;
					stat.quanbian++;
				},
				mod:{
					cardEnabled2:function(card,player){
						var stat=player.getStat('skill');
						if(stat.quanbian&&stat.quanbian>=player.maxHp&&get.position(card)=='h'&&get.type(card,player)!='equip') return false;
					},
				},
			},
			taoyin:{
				audio:2,
				trigger:{player:'showCharacterAfter'},
				logTarget:function(){
					return _status.currentPhase;
				},
				filter:function(event,player){
					var target=_status.currentPhase;
					return target&&target!=player&&target.isAlive();
				},
				check:function(event,player){
					return get.attitude(player,_status.currentPhase)<0;
				},
				content:function(){
					_status.currentPhase.addTempSkill('taoyin2');
					_status.currentPhase.addMark('taoyin2',2,false);
				},
				ai:{
					expose:0.2,
				},
			},
			taoyin2:{
				onremove:true,
				charlotte:true,
				intro:{
					content:'手牌上限-#',
				},
				mod:{
					maxHandcard:function(player,num){
						return num-player.countMark('taoyin2');
					},
				},
			},
			yimie:{
				audio:2,
				usable:1,
				trigger:{source:'damageBegin1'},
				filter:function(event,player){
					return player!=event.player&&event.num<event.player.hp;
				},
				check:function(event,player){
					if(get.attitude(player,event.player)>-2) return false;
					if(player.hp>2) return true;
					if(player.hp==2&&event.player.hp<3) return false;
					return player.hp>1;
				},
				logTarget:'player',
				content:function(){
					player.loseHp();
					trigger.player.addTempSkill('yimie2');
					trigger.yimie_num=trigger.player.hp-trigger.num;
					trigger.num=trigger.player.hp;
				},
			},
			yimie2:{
				trigger:{player:'damageEnd'},
				forced:true,
				popup:false,
				charlotte:true,
				filter:function(event,player){
					return typeof event.yimie_num=='number';
				},
				content:function(){
					player.recover(trigger.yimie_num);
				},
			},
			ruilve:{
				unique:true,
				audio:2,
				global:'ruilve2',
				zhuSkill:true,
			},
			ruilve2:{
				enable:'phaseUse',
				discard:false,
				lose:false,
				delay:false,
				line:true,
				direct:true,
				clearTime:true,
				prepare:function(cards,player,targets){
					targets[0].logSkill('ruilve');
				},
				prompt:function(){
					var player=_status.event.player;
					var list=game.filterPlayer(function(target){
						return target!=player&&target.hasZhuSkill('ruilve',player);
					});
					var str='将一张具有伤害标签的基本牌或锦囊牌交给'+get.translation(list);
					if(list.length>1) str+='中的一人';
					return str;
				},
				filter:function(event,player){
					if(player.group!='jin') return false;
					if(player.countCards('h',lib.skill.ruilve2.filterCard)==0) return false;
					return game.hasPlayer(function(target){
						return target!=player&&target.hasZhuSkill('ruilve',player)&&!target.hasSkill('ruilve3');
					});
				},
				filterCard:function(card){
					if(!get.tag(card,'damage')) return false;
					var type=get.type(card);
					return (type=='basic'||type=='trick');
				},
				log:false,
				visible:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.hasZhuSkill('ruilve',player)&&!target.hasSkill('ruilve3');
				},
				content:function(){
					target.gain(cards,player,'giveAuto');
					target.addTempSkill('ruilve3','phaseUseEnd');
				},
				ai:{
					expose:0.3,
					order:1,
					result:{
						target:5
					}
				}
			},
			ruilve3:{},
			tairan:{
				audio:2,
				trigger:{player:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player.hp<player.maxHp||player.countCards('h')<player.maxHp;
				},
				content:function(){
					'step 0'
					player.addSkill('tairan2');
					if(!player.storage.tairan2) player.storage.tairan2=0;
					var num=Math.min(player.maxHp-player.hp,5);
					if(num>0){
						player.storage.tairan2+=num;
						player.recover(num);
					}
					'step 1'
					if(player.countCards('h')<player.maxHp) player.drawTo(Math.min(player.maxHp,5+player.countCards('h'))).gaintag=['tairan'];
				},
			},
			tairan2:{
				mod:{
					aiValue:function(player,card,num){
						if(card.hasGaintag&&card.hasGaintag('tairan')) return num/10;
					},
				},
				audio:'tairan',
				trigger:{player:'phaseUseBegin'},
				charlotte:true,
				forced:true,
				onremove:true,
				content:function(){
					var map=player.storage.tairan2;
					if(map>0) player.loseHp(map);
					var hs=player.getCards('h',function(card){
						return card.hasGaintag('tairan');
					});
					if(hs.length) player.discard(hs);
					player.removeSkill('tairan2');
				},
			},
			baoqie:{
				audio:2,
				trigger:{player:'showCharacterAfter'},
				forced:true,
				filter:function(event,player){
					return event.toShow&&event.toShow.contains('jin_xiahouhui');
				},
				content:function(){
					'step 0'
					var card=get.cardPile(function(card){
						return get.subtype(card,false)=='equip5'&&!get.cardtag(card,'gifts');
					});
					if(!card){
						event.finish();
						return;
					}
					event.card=card;
					player.gain(card,'gain2');
					'step 1'
					if(player.getCards('h').contains(card)&&get.subtype(card)=='equip5') player.chooseUseTarget(card).nopopup=true;
				},
			},
			jyishi:{
				audio:2,
				trigger:{global:'loseAfter'},
				direct:true,
				filter:function(event,player){
					return (event.type=='discard'&&event.hs&&event.hs.filterInD('d').length&&event.player.isAlive()&&
					event.player!=player&&event.player.isPhaseUsing()&&!player.hasSkill('jyishi2'));
				},
				content:function(){
					'step 0'
					event.cards=trigger.hs.filterInD('d');
					var str='是否发动【宜室】令'+get.translation(trigger.player)+'获得一张牌';
					if(event.cards.length>1) str+='，然后获得其余的牌';
					str+='？';
					player.chooseButton([str,event.cards]).set('ai',function(button){
						var card=button.link;
						var source=_status.event.source;
						if(get.attitude(player,source)>0) return Math.max(1,source.getUseValue(card,null,true));
						var cards=_status.event.getParent().cards.slice(0);
						if(cards.length==1) return -get.value(card);
						cards.remove(card);
						return (get.value(cards)-get.value(card)-2);
					}).set('source',trigger.player);
					'step 1'
					if(result.bool){
						player.addTempSkill('jyishi2');
						player.logSkill('jyishi',trigger.player);
						if(cards.length>1){
							trigger.player.$gain2(result.links[0]);
							trigger.player.gain(result.links[0],'log');
						}
						else trigger.player.gain(result.links[0],'gain2');
						cards.remove(result.links[0]);
						if(cards.length) player.gain(cards,'gain2');
					}
				},
			},
			jyishi2:{},
			shiduo:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(target){
						return player!=target&&player.canCompare(target);
					})
				},
				filterTarget:function(card,player,target){
					return player!=target&&player.canCompare(target);
				},
				content:function(){
					'step 0'
					player.chooseToCompare(target);
					'step 1'
					if(result.bool&&target.isAlive()){
						var cards=target.getCards('h');
						if(cards.length) player.gain(cards,target,'giveAuto');
					}
					else event.finish();
					'step 2'
					var num=Math.floor(player.countCards('h')/2);
					if(num&&target.isAlive()) player.chooseCard('h',num,true,'交给'+get.translation(target)+get.cnNumber(num)+'张牌')
					else event.finish();
					'step 3'
					if(result.bool&&result.cards&&result.cards.length) target.gain(result.cards,player,'giveAuto');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var delta=(target.countCards('h')-player.countCards('h'));
							if(delta<0) return 0;
							return -1-delta;
						},
					},
				},
			},
			tuishi:{
				audio:2,
				trigger:{player:'showCharacterAfter'},
				forced:true,
				filter:function(event,player){
					var target=_status.currentPhase;
					return player!=target&&target&&target.isAlive()&&event.toShow&&event.toShow.contains('jin_simazhao');
				},
				content:function(){
					player.addTempSkill('tuishi2');
				},
			},
			tuishi2:{
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					var target=_status.currentPhase;
					return target!=player&&target&&target.isAlive()&&game.hasPlayer(function(current){
						return current!=target&&target.inRange(current);
					});
				},
				content:function(){
					'step 0'
					var target=_status.currentPhase;
					event.target=target;
					player.chooseTarget(get.prompt2('tuishi',event.target),function(card,player,target){
						var source=_status.event.source;
						return source!=target&&source.inRange(target);
					}).set('source',target).set('goon',get.damageEffect(target,player,player)>0).set('ai',function(target){
						if(!_status.event.goon) return 0;
						var evt=_status.event;
						return get.effect(target,{name:'sha'},evt.source,evt.player)
					});
					'step 1'
					if(result.bool){
						event.target2=result.targets[0];
						player.logSkill('tuishi');
						player.line2([target,event.target2]);
						game.delayx();
					}
					else event.finish();
					'step 2'
					target.chooseToUse({
						preTarget:event.target2,
						prompt:'请对'+get.translation(event.target2)+'使用一张【杀】，或受到来自'+get.translation(player)+'的一点伤害',
						filterCard:function(card,player){
							return get.name(card)=='sha'&&lib.filter.filterCard.apply(this,arguments);
						},
						filterTarget:function(card,player,target){
							return target==_status.event.preTarget&&lib.filter.filterTarget.apply(this,arguments);
						},
						addCount:false,
					});
					'step 3'
					if(!result.bool) target.damage();
				},
			},
			choufa:{
				enable:'phaseUse',
				audio:2,
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return lib.skill.choufa.filterTarget(null,player,current);
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&!target.hasSkill('choufa2')&&target.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.choosePlayerCard(target,'h',true);
					'step 1'
					player.showCards(result.cards);
					var type=get.type2(result.cards[0],target);
					target.storage.choufa2=type;
					target.addTempSkill('choufa2',{player:'phaseAfter'});
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return -target.countCards('h');
						},
					},
				},
			},
			choufa2:{
				onremove:true,
				charlotte:true,
				mark:true,
				intro:{content:'手牌中的非$牌均视为杀'},
				mod:{
					cardname:function(card,player){
						if(get.type2(card,false)!=player.storage.choufa2) return 'sha';
					},
					cardnature:function(card,player){
						if(get.type2(card,false)!=player.storage.choufa2) return false;
					},
				},
			},
			zhaoran:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				content:function(){
					player.addTempSkill('zhaoran2','phaseUseEnd');
				},
			},
			zhaoran2:{
				audio:'zhaoran',
				global:'zhaoran3',
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				forced:true,
				charlotte:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				filter:function(event,player){
					var evt=event.getl(player);
					if(!evt||!evt.hs||!evt.hs.length) return false;
					var list=player.getStorage('zhaoran2');
					for(var i of evt.hs){
						var suit=get.suit(i,player);
						if(!list.contains(suit)&&!player.countCards('h',{suit:suit})) return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					var list=[];
					var suits=get.copy(player.storage.zhaoran2);
					suits.addArray(player.getCards('h').map(function(card){
						return get.suit(card);
					}));
					var evt=trigger.getl(player);
					for(var i of evt.hs){
						var suit=get.suit(i,player);
						if(!suits.contains(suit)) list.add(suit);
					}
					event.count=list.length;
					player.markAuto('zhaoran2',list);
					'step 1'
					event.count--;
					var filterTarget=function(card,player,target){
						return target!=player&&target.countDiscardableCards(player,'he')>0;
					}
					if(!game.hasPlayer(function(current){
						return filterTarget(null,player,current);
					})) event._result={bool:false};
					else player.chooseTarget(filterTarget,'弃置一名其他角色的一张牌或摸一张牌').set('ai',function(target){
						var att=get.attitude(player,target);
						if(att>=0) return 0;
						if(target.countCards('he',function(card){
							return get.value(card)>5;
						})) return -att;
						return 0;
					});
					'step 2'
					if(!result.bool) player.draw();
					else{
						var target=result.targets[0];
						player.line(target,'green');
						player.discardPlayerCard(target,true,'he');
					}
					if(event.count>0) event.goto(1);
				},
				intro:{
					content:'已因$牌触发过效果',
				},
			},
			zhaoran3:{
				ai:{
					viewHandcard:true,
					skillTagFilter:function(player,arg,target){
						return target!=player&&target.hasSkill('zhaoran2');
					}
				},
			},
			chengwu:{
				zhuSkill:true,
				mod:{
					inRange:function(from,to){
						if(!from.hasZhuSkill('chengwu')||from._chengwu) return;
						from._chengwu=true;
						var bool=game.hasPlayer(function(current){
							return current!=from&&current!=to&&current.group=='jin'&&from.hasZhuSkill('chengwu',current)&&current.inRange(to);
						});
						delete from._chengwu;
						if(bool) return true;
					},
				},
			},
			shiren:{
				trigger:{player:'showCharacterAfter'},
				hiddenSkill:true,
				logTarget:function(){
					return _status.currentPhase;
				},
				filter:function(event,player){
					if(!event.toShow||!event.toShow.contains('jin_wangyuanji')) return false;
					var target=_status.currentPhase;
					return target&&target!=player&&target.isAlive()&&target.countCards('h')>0;
				},
				content:function(){
					var next=game.createEvent('yanxi',false);
					next.player=player;
					next.target=_status.currentPhase;
					next.setContent(lib.skill.yanxi.content);
				},
			},
			yanxi:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')>0;
					});
				},
				content:function(){
					'step 0'
					event.card=target.getCards('h').randomGet();
					var cards;
					cards=get.cards(2);
					event.cards=cards.concat([event.card]);
					while(cards.length){
						ui.cardPile.insertBefore(cards.pop().fix(),ui.cardPile.firstChild);
					}
					if(get.mode()=='guozhan'){
						var num=ui.cardPile.childElementCount;
						var num1=get.rand(1,num-1),num2=get.rand(1,num-1);
						if(num1==num2){
							if(num1==0) num2++;
							else num1--;
						}
						event.cards=[event.card,ui.cardPile.childNodes[num1],ui.cardPile.childNodes[num2]];
					}
					game.updateRoundNumber();
					event.cards.randomSort();
					game.log(player,'展示了',event.cards);
					event.videoId=lib.status.videoId++;
					var str=get.translation(player)+'对'+get.translation(target)+'发动了【宴戏】';
					game.broadcastAll(function(str,id,cards){
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},str,event.videoId,event.cards);
					game.addVideo('showCards',player,[str,get.cardsInfo(event.cards)]);
					game.delay(2);
					'step 1'
					var func=function(id,target){
						var dialog=get.idDialog(id);
						if(dialog) dialog.content.firstChild.innerHTML='猜猜哪张是'+get.translation(target)+'的手牌？';
					};
					if(player==game.me) func(event.videoId,target);
					else if(player.isOnline()) player.send(func,event.videoId,target);
					'step 2'
					var next=player.chooseButton(true);
					next.set('dialog',event.videoId);
					next.set('ai',function(button){
						if(_status.event.answer) return button.link==_status.event.answer?1:0;
						return get.value(button.link,_status.event.player);
					});
					if(player.hasSkillTag('viewHandcard',null,target,true)) next.set('answer',card);
					'step 3'
					game.broadcastAll('closeDialog',event.videoId);
					player.addTempSkill('yanxi2');
					var card2=result.links[0];
					if(card2==card){
						player.popup('洗具');
						cards.remove(card2);
						player.$gain2(cards);
						player.gain(cards,'log').gaintag.add('yanxi');
						player.gain(card,target,'bySelf','give').gaintag.add('yanxi');
					}
					else{
						player.popup('杯具');
						player.gain(card2,'gain2').gaintag.add('yanxi');
					}
				},
				ai:{
					order:6,
					result:{
						player:1,
						target:-0.6,
					},
				},
			},
			yanxi2:{
				mod:{
					ignoredHandcard:function(card,player){
						if(card.hasGaintag('yanxi')) return true;
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&card.hasGaintag('yanxi')) return false;
					},
				},
				onremove:function(player){
					player.removeGaintag('yanxi');
				},
			},
			sanchen:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var stat=player.getStat('sanchen');
					return game.hasPlayer(function(current){
						return (!stat||!stat.contains(current));
					});
				},
				filterTarget:function(card,player,target){
					var stat=player.getStat('sanchen');
					return (!stat||!stat.contains(target));
				},
				content:function(){
					'step 0'
					var stat=player.getStat();
					if(!stat.sanchen) stat.sanchen=[];
					stat.sanchen.push(target);
					if(get.mode()!='guozhan') player.addMark('sanchen',1,false);
					target.draw(3);
					'step 1'
					if(!target.countCards('he')) event.finish();
					else target.chooseToDiscard('he',true,3).set('ai',function(card){
						var list=ui.selected.cards.map(function(i){
							return get.type2(i);
						});
						if(!list.contains(get.type2(card))) return 7-get.value(card);
						return -get.value(card);
					});
					'step 2'
					if(result.bool&&result.cards&&result.cards.length){
						var list=[];
						for(var i of result.cards) list.add(get.type2(i));
						if(list.length==result.cards.length){
							target.draw();
							player.getStat('skill').sanchen--;
							if(get.mode()=='guozhan') player.addTempSkill('pozhu');
						}
					}
					else{
						target.draw();
						player.getStat('skill').sanchen--;
						if(get.mode()=='guozhan') player.addTempSkill('pozhu');
					}
				},
				ai:{
					order:9,
					threaten:1.7,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0.1;
							return Math.sqrt(target.countCards('he'));
						},
					},
				},
				intro:{
					content:'已发动过#次技能',
				},
				marktext:'陈',
			},
			zhaotao:{
				forbid:['guozhan'],
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.countMark('sanchen')>2;
				},
				content:function(){
					player.awakenSkill('zhaotao');
					player.loseMaxHp();
					player.addSkillLog('pozhu');
				},
				derivation:'pozhu',
			},
			pozhu:{
				enable:'phaseUse',
				viewAsFilter:function(player){
					return !player.hasSkill('pozhu3')&&player.countCards('hs')>0;
				},
				viewAs:{name:'chuqibuyi'},
				filterCard:true,
				position:'hs',
				check:function(card){
					return 7-get.value(card);
				},
				group:'pozhu2',
			},
			pozhu2:{
				trigger:{player:'useCardAfter'},
				silent:true,
				filter:function(event,player){
					return event.skill=='pozhu'&&(get.mode()=='guozhan'||!player.getHistory('sourceDamage',function(evt){
						return evt.card==event.card;
					}).length);
				},
				content:function(){
					player.addTempSkill('pozhu3');
				},
			},
			pozhu3:{},
			xijue:{
				audio:2,
				trigger:{
					global:'gameDrawAfter',
					player:['enterGame','showCharacterAfter'],
				},
				forced:true,
				filter:function(event,player){
					if(player._xijue) return false;
					if(get.mode()=='guozhan') return event.name=='showCharacter'&&event.toShow&&event.toShow.contains('gz_zhanghuyuechen');
					return event.name!='showCharacter';
				},
				content:function(){
					player.addMark('xijue',4);
					player._xijue=true;
				},
				intro:{
					name2:'爵',
					content:'mark',
				},
				derivation:['xijue_tuxi','xijue_xiaoguo'],
				group:['xijue_gain','xijue_tuxi','xijue_xiaoguo'],
			},
			xijue_gain:{
				audio:'xijue',
				trigger:{player:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					var stat=player.getStat();
					return stat.damage&&stat.damage>0;
				},
				content:function(){
					player.addMark('xijue',player.getStat().damage);
				},
			},
			xijue_tuxi:{
				audio:2,
				trigger:{
					player:"phaseDrawBegin2",
				},
				direct:true,
				filter:function(event,player){
					return event.num>0&&!event.numFixed&&player.hasMark('xijue')&&game.hasPlayer(function(target){
						return player!=target&&target.countCards('h')>0;
					});
				},
				content:function (){
					"step 0"
					var num=trigger.num;
					if(get.mode()=='guozhan'&&num>2) num=2;
					player.chooseTarget('是否弃置一枚“爵”发动【突袭】？','获得至多'+get.translation(num)+'名角色的各一张手牌，然后少摸等量的牌',[1,num],function(card,player,target){
						return target.countCards('h')>0&&player!=target;
					},function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkill('tuntian')) return att/10;
						return 1-att;
					});
					"step 1"
					if(result.bool){
						result.targets.sortBySeat();
						player.logSkill('xijue_tuxi',result.targets);
						player.removeMark('xijue',1);
						player.gainMultiple(result.targets);
						trigger.num-=result.targets.length;
					}
					else{
						event.finish();
					}
					"step 2"
					if(trigger.num<=0) game.delay();
				},
				ai:{
					expose:0.2,
				},
			},
			xijue_xiaoguo:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				filter:function(event,player){
					return player.hasMark('xijue')&&event.player.isAlive()&&event.player!=player&&player.countCards('h',function(card){
						if(_status.connectMode) return true;
						return get.type(card)=='basic';
					});
				},
				direct:true,
				content:function(){
					"step 0"
					var nono=(Math.abs(get.attitude(player,trigger.player))<3||trigger.player.hp>(player.countMark('xijue')*1.5)||trigger.player.countCards('e',function(card){
						return get.value(card,trigger.player)<=0;
					}));
					if(get.damageEffect(trigger.player,player,player)<=0){
						nono=true;
					}
					var next=player.chooseToDiscard('是否弃置一枚“爵”和一张基本牌，对'+get.translation(trigger.player)+'发动【骁果】？',{type:'basic'});
					next.set('ai',function(card){
						if(_status.event.nono) return 0;
						return 8-get.useful(card);
					});
					next.set('logSkill',['xijue_xiaoguo',trigger.player]);
					next.set('nono',nono);
					"step 1"
					if(result.bool){
						player.removeMark('xijue',1);
						var nono=(get.damageEffect(trigger.player,player,trigger.player)>=0);
						trigger.player.chooseToDiscard('he','弃置一张装备牌并令'+get.translation(player)+'摸一张牌，或受到一点伤害',{type:'equip'}).set('ai',function(card){
							if(_status.event.nono){
								return 0;
							}
							if(_status.event.player.hp==1) return 10-get.value(card);
							return 9-get.value(card);
						}).set('nono',nono);
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						if(get.mode()!='guozhan') player.draw();
					}
					else{
						trigger.player.damage();
					}
				},
				ai:{
					expose:0.3,
					threaten:1.3
				}
			},
			huishi:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return ui.cardPile.childElementCount%10>0&&!event.numFixed;
				},
				prompt:function(){
					return get.prompt('huishi')+'（当前牌堆尾数：'+ui.cardPile.childElementCount%10+'）';
				},
				check:function(event,player){
					return ui.cardPile.childElementCount%10>3;
				},
				content:function(){
					'step 0'
					trigger.changeToZero();
					event.cards=game.cardsGotoOrdering(get.cards(ui.cardPile.childElementCount%10)).cards;
					var num=Math.ceil(event.cards.length/2);
					var str='按顺序将卡牌置于牌堆底';
					if(event.cards.length>num) str='按顺序将'+get.cnNumber(num)+'张牌置于牌堆底，然后获得其余的牌';
					player.chooseButton([str,'<div class="text center">（先选择的在上）</div>',event.cards],true,num).set('ai',function(card){
						return -get.value(card);
					});
					'step 1'
					for(var i of result.links){
						cards.remove(i);
						i.fix();
						ui.cardPile.appendChild(i);
					}
					game.updateRoundNumber();
					if(cards.length) player.gain(cards,'gain2','log');
				},
			},
			qingleng:{
				audio:2,
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					var target=event.player;
					return target!=player&&!target.storage.nohp&&(target.hp+target.countCards('h'))>=(ui.cardPile.childElementCount%10)&&player.countCards('he')>0&&player.canUse({name:'sha',nature:'ice'},target,false);
				},
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt('qingleng',trigger.player),'将一张牌当做冰【杀】对其使用',function(card,player){
						return player.canUse(get.autoViewAs({name:'sha',nature:'ice'},[card]),_status.event.target,false);
					}).set('target',trigger.player).set('ai',function(card){
						if(get.effect(_status.event.target,get.autoViewAs({name:'sha',nature:'ice'},[card]),player)<=0) return false;
						return 6-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.useCard(get.autoViewAs({name:'sha',nature:'ice'},result.cards),result.cards,false,trigger.player,'qingleng');
						if(!player.storage.qingleng||!player.storage.qingleng.contains(trigger.player)){
							player.draw();
							player.markAuto('qingleng',[trigger.player]);
							player.storage.qingleng.sortBySeat();
						}
					}
				},
				intro:{
					content:'已对$发动过此技能',
				},
			},
			xuanmu:{
				audio:2,
				trigger:{player:'showCharacterAfter'},
				forced:true,
				hiddenSkill:true,
				filter:function(event,player){
					return event.toShow.contains('jin_zhangchunhua')&&player!=_status.currentPhase;
				},
				content:function(){
					player.addTempSkill('xuanmu2');
				},
			},
			xuanmu2:{
				trigger:{player:'damageBegin4'},
				forced:true,
				popup:false,
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')&&!player.hasSkillTag('jueqing',false,target)) return 'zerotarget';
						},
					},
				},
			},
		},
		card:{
			cheliji_sichengliangyu:{
				fullskin:true,
				vanish:true,
				derivation:'cheliji',
				destroy:'chexuan',
				type:'equip',
				subtype:'equip5',
				skills:['cheliji_sichengliangyu'],
			},
			cheliji_tiejixuanyu:{
				fullskin:true,
				vanish:true,
				derivation:'cheliji',
				destroy:'chexuan',
				type:'equip',
				subtype:'equip5',
				skills:['cheliji_tiejixuanyu'],
			},
			cheliji_feilunzhanyu:{
				fullskin:true,
				vanish:true,
				derivation:'cheliji',
				destroy:'chexuan',
				type:'equip',
				subtype:'equip5',
				skills:['cheliji_feilunzhanyu'],
			},
		},
		characterIntro:{
			zhanghuyuechen:'张虎，生卒年不详，雁门马邑（今山西朔城区大夫庄）人。三国时期曹魏将领。名将张辽之子。官至偏将军，袭封晋阳侯，有一子张统。乐綝（195~257年），字号不详，阳平郡卫国县（今河南省清丰县）人。三国时期曹魏将领，右将军乐进的儿子。果毅坚毅，袭封广昌亭侯，累迁扬州刺史。甘露二年，为叛乱的征东大将军诸葛诞所杀，追赠卫尉。',
			duyu:'杜预（222年－285年），字元凯，京兆郡杜陵县（今陕西西安）人，中国魏晋时期军事家、经学家、律学家，曹魏散骑常侍杜恕之子。杜预初仕曹魏，任尚书郎，后成为权臣司马昭的幕僚，封丰乐亭侯。西晋建立后，历任河南尹、安西军司、秦州刺史、度支尚书等职。咸宁四年（278年）接替羊祜出任镇南大将军，镇守荆州。他积极备战，支持晋武帝司马炎对孙吴作战，并在咸宁五年（279年）成为晋灭吴之战的统帅之一。战后因功进封当阳县侯，仍镇荆州。太康五年（285年），杜预被征入朝，拜司隶校尉，途中于邓县逝世，终年六十三岁。获赠征南大将军、开府仪同三司，谥号为成。杜预耽思经籍，博学多通，多有建树，时誉为“杜武库”。著有《春秋左氏传集解》及《春秋释例》等。为明朝之前唯一一个同时进入文庙和武庙之人。',
			xiahouhui:'夏侯徽（211年－234年），字媛容，沛国谯县（今安徽亳州）人，司马师第一任妻子。征南大将军夏侯尚之女，母德阳乡主为大司马曹真之妹。夏侯徽与司马师之间，生有五个女儿。夏侯徽很有见识器度，每当司马师有什么想法时，都由她从旁策划协助。当时司马师之父司马懿位居上将重位，而他的儿子们都有雄才大略。夏侯徽深知司马师绝非曹魏忠臣，而司马师对出身曹魏家族的夏侯徽也非常顾忌。青龙二年（234年），正逢“大疫”、“大病”之年，夏侯徽被司马师毒杀，时年二十四岁，死后葬于峻平陵。西晋建国后，追谥夏侯徽为景怀皇后。',
			shibao:'石苞（？～273年），字仲容，渤海南皮（今河北省南皮县）人。三国时曹魏至西晋重要将领，西晋开国功臣。西晋建立后，历任大司马、侍中、司徒等职，封乐陵郡公，卒后谥号为“武”。',
			simazhou:'司马伷（zhòu）（227年～283年6月12日），字子将，河内郡温县（今河南省温县）人。西晋宗室、将领，晋宣帝司马懿第三子，伏太妃所生。晋景帝司马师、文帝司马昭的同父异母弟，晋武帝司马炎的叔父。司马伷少有才气，在曹魏历任宁朔将军、散骑常侍、征虏将军等职，先后受封南安亭侯、东武乡侯，五等爵制建立后，改封南皮伯。西晋建立后，获封东莞郡王，入朝任尚书右仆射、抚军将军，出外拜镇东大将军。后改封琅邪王，加开府仪同三司。西晋伐吴时，率军出涂中，孙皓向他投降并奉上玉玺。战后因功拜大将军，增邑三千户。太康四年（283年），司马伷去世，享年五十七岁。谥号为武，世称“琅邪武王”。著有《周官宁朔新书》八卷，今已亡佚。',
			huangzu:'黄祖（？－208年），东汉末年将领。刘表任荆州牧时，黄祖出任江夏太守。初平二年（191年），黄祖在与长沙太守孙坚交战时，其部下将孙坚射死，因此与孙家结下仇怨。之后，黄祖多次率部与东吴军队交战，射杀凌操、徐琨等人。建安十三年（208年），在与孙权的交战中，兵败被杀。',
			cheliji:'彻里吉是历史小说《三国演义》中的虚构人物，西羌国王。蜀相诸葛亮伐魏，魏都督曹真驰书赴羌，国王彻里吉即命雅丹丞相与越吉元帅起羌兵一十五万、并战车直扣西平关。后军大败，越吉亡，雅丹被俘，亮将所获羌兵及车马器械，尽给还雅丹，俱放回国。彻里吉感蜀恩义，与之结盟。正史中没有关于彻里吉的记载。',
			weiguan:'卫瓘（220年－291年），字伯玉。河东郡安邑县（今山西省夏县）人。三国曹魏后期至西晋初年重臣、书法家，曹魏尚书卫觊之子。卫瓘出身官宦世家，年轻时仕官于曹魏，历任尚书郎、散骑常侍、侍中、廷尉等职。后以镇西军司、监军身份参与伐蜀战争。蜀汉亡后，与钟会一道逮捕邓艾；钟会谋反时，又成功平息叛乱，命田续杀邓艾父子。回师后转任督徐州诸军事、镇东将军，封菑阳侯。西晋建立后，历任青州、幽州刺史、征东大将军等职，成功化解北方边境威胁，因功进爵菑阳公。后入朝为尚书令、侍中，又升任司空，领太子少傅。后逊位，拜太保。晋惠帝即位后，与贾皇后对立，终在政变中满门遇害，享年七十二岁。卫瓘善隶书及章草。不仅兼工各体，还能学古人之长，是颇有创意的书法家。唐朝张怀瓘《书断》中评其章草为“神品”。',
		},
		characterTitle:{},
		perfectPair:{},
		characterFilter:{},
		dynamicTranslate:{},
		perfectPair:{
			jin_simayi:['jin_zhangchunhua'],
			jin_simazhao:['jin_wangyuanji'],
			jin_simashi:['jin_xiahouhui','jin_yanghuiyu'],
		},
		characterReplace:{},
		translate:{
			jin_zhangchunhua:'晋张春华',
			jin_zhangchunhua_ab:'张春华',
			huishi:'慧识',
			huishi_info:'摸牌阶段，你可以放弃摸牌，改为观看牌堆顶的X张牌，获得其中的一半（向下取整），然后将其余牌置入牌堆底。（X为牌堆数量的个位数）',
			qingleng:'清冷',
			qingleng_info:'一名角色的回合结束时，若其体力值与手牌数之和不小于X，则你可将一张牌当无距离限制的冰属性【杀】对其使用（X为牌堆数量的个位数）。若你本局游戏内未对其发动过此技能，则你摸一张牌。',
			xuanmu:'宣穆',
			xuanmu2:'宣穆',
			xuanmu_info:'锁定技，隐匿技。你于其他角色的回合登场时，防止你受到的伤害直到回合结束。',
			jin_simayi:'晋司马懿',
			jin_simayi_ab:'司马懿',
			zhanghuyuechen:'张虎乐綝',
			xijue:'袭爵',
			xijue_gain:'袭爵',
			xijue_info:'锁定技，游戏开始时，你获得4枚“爵”。回合结束时，你获得X枚“爵”（X为你本回合内造成的伤害数）。你可弃置一枚“爵”并在合适的时机发动〖突袭〗和〖骁果〗。',
			xijue_info_guozhan:'锁定技，当你首次明置此武将牌时，你获得4枚“爵”。回合结束时，你获得X枚“爵”（X为你本回合内造成的伤害数）。你可弃置一枚“爵”并在合适的时机发动〖突袭〗和〖骁果〗。',
			xijue_tuxi:'突袭',
			xijue_tuxi_info:'摸牌阶段摸牌时，你可以少摸任意张牌，然后获得等量的角色的各一张手牌。',
			xijue_tuxi_info_guozhan:'摸牌阶段摸牌时，你可以少摸至多两张牌，然后获得等量的角色的各一张手牌。',
			xijue_xiaoguo:'骁果',
			xijue_xiaoguo_info:'其他角色的结束阶段开始时，你可以弃置一张基本牌，令该角色选择一项：1.弃置一张装备牌，然后你摸一张牌；2.受到你对其造成的1点伤害。',
			xijue_xiaoguo_info_guozhan:'其他角色的结束阶段开始时，你可以弃置一张基本牌，令该角色选择一项：1.弃置一张装备牌；2.受到你对其造成的1点伤害。',
			duyu:'杜预',
			sanchen:'三陈',
			sanchen_info:'出牌阶段，你可选择一名本回合内未选择过的角色。其摸三张牌，然后弃置三张牌。若其未以此法弃置牌或以此法弃置的牌的类别均不相同，则其摸一张牌。否则你本阶段内不能再发动〖三陈〗。',
			sanchen_info_guozhan:'出牌阶段，你可选择一名本回合内未选择过的角色。其摸三张牌，然后弃置三张牌。若其未以此法弃置牌或以此法弃置的牌的类别均不相同，则其摸一张牌且你获得技能〖破竹〗直到回合结束。否则你本阶段内不能再发动〖三陈〗。',
			zhaotao:'诏讨',
			zhaotao_info:'觉醒技，准备阶段，若你本局游戏内发动〖三陈〗的次数大于2，则你减1点体力上限并获得〖破竹〗。',
			pozhu:'破竹',
			pozhu_info:'出牌阶段，你可以将一张手牌当做【出其不意】使用。若你未因此牌造成过伤害，则你不能再发动〖破竹〗直到回合结束。',
			pozhu_info_guozhan:'出牌阶段限一次，你可以将一张手牌当做【出其不意】使用。',
			jin_wangyuanji:'晋王元姬',
			jin_wangyuanji_ab:'王元姬',
			shiren:'识人',
			shiren_info:'隐匿技。你于其他角色的回合内登场时，若其有手牌，则你可对其发动〖宴戏〗。',
			yanxi:'宴戏',
			yanxi2:'宴戏',
			yanxi_info:'出牌阶段，你可选择一名有手牌的角色。你将该角色的一张随机手牌与牌堆顶的两张牌混合后展示，并选择其中一张。若你以此法选择的是该角色的手牌，则你获得这三张牌。否则你获得选择的牌。你通过〖宴戏〗获得的牌，不计入当前回合的手牌上限。',
			yanxi_info_guozhan:'出牌阶段，你可选择一名有手牌的角色。你将该角色的一张随机手牌与牌堆中的两张随机牌混合后展示，并选择其中一张。若你以此法选择的是该角色的手牌，则你获得这三张牌。否则你获得选择的牌。你通过〖宴戏〗获得的牌，不计入当前回合的手牌上限。',
			jin_simazhao:'晋司马昭',
			jin_simazhao_ab:'司马昭',
			tuishi:'推弑',
			tuishi_info:'隐匿技，你于其他角色A的回合内登场时，可于此回合结束时选择其攻击范围内的一名角色B。A选择一项：①对B使用一张【杀】。②你对A造成1点伤害。',
			choufa:'筹伐',
			choufa2:'筹伐',
			choufa_info:'出牌阶段限一次，你可展示一名其他角色的一张手牌并记录其类型A。你令其原类型不为A的手牌的牌名均视为【杀】且均视为无属性，直到其回合结束。',
			zhaoran:'昭然',
			zhaoran2:'昭然',
			zhaoran_info:'出牌阶段开始时，你可令你的手牌对其他角色可见直到出牌阶段结束。若如此做，当你于此阶段内失去一张手牌后，若你的手牌里没有与此牌花色相同的牌且你本回合内未因该花色的牌触发过此效果，则你选择一项：①摸一张牌。②弃置一名其他角色的一张牌。',
			chengwu:'成务',
			chengwu_info:'主公技，锁定技，其他晋势力角色攻击范围内的角色视为在你的攻击范围内。',
			jin_xiahouhui:'晋夏侯徽',
			jin_xiahouhui_ab:'夏侯徽',
			baoqie:'宝箧',
			baoqie_info:'隐匿技，锁定技。你登场后，从牌堆中获得一张不为赠物的宝物牌。若此牌在你的手牌区内为宝物牌，则你可以使用此牌。',
			jyishi:'宜室',
			jyishi_info:'每回合限一次，当有其他角色于其出牌阶段内因弃置而失去手牌后，你可令其获得这些牌中位于弃牌堆的一张，然后你获得其余位于弃牌堆的牌。',
			shiduo:'识度',
			shiduo_info:'出牌阶段限一次，你可以与一名其他角色拼点。若你赢，你获得其所有手牌。然后你交给其X张手牌（X为你手牌数的一半，向下取整）。',
			jin_simashi:'晋司马师',
			jin_simashi_ab:'司马师',
			taoyin:'韬隐',
			taoyin2:'韬隐',
			taoyin_info:'隐匿技，当你登场后，若当前回合角色存在且不是你，则你可令该角色本回合的手牌上限-2。',
			yimie:'夷灭',
			yimie2:'夷灭',
			yimie_info:'每回合限一次，当你对其他角色造成伤害时，若伤害值X小于Y，则你可失去1点体力，将伤害值改为Y。此伤害结算结束后，其回复(Y-X)点体力。（Y为其体力值）’',
			ruilve:'睿略',
			ruilve2:'睿略',
			ruilve_info:'主公技，其他晋势力角色的出牌阶段限一次，该角色可以将一张带有伤害标签的基本牌或锦囊牌交给你。',
			tairan:'泰然',
			tairan2:'泰然',
			tairan_info:'锁定技，回合结束时，你回复Y点体力，并将手牌摸至X张。出牌阶段开始时，你失去Y点体力，弃置上次以此法获得的牌。（X为你的体力上限；Y=(X-你的体力值)且至多为5）；摸牌至多摸五张',
			gz_jin_simayi:'司马懿',
			gz_jin_zhangchunhua:'张春华',
			gz_jin_simazhao:'司马昭',
			gz_jin_wangyuanji:'王元姬',
			gz_jin_simashi:'司马师',
			gz_jin_xiahouhui:'夏侯徽',
			xinquanbian:'权变',
			xinquanbian_info:'出牌阶段，每当你首次使用/打出一种花色的手牌时，你可以从牌堆顶的X张牌中获得一张与此牌花色不同的牌，并将其余牌以任意顺序置于牌堆顶。出牌阶段，你至多可使用X张非装备手牌。（X为你的体力上限）',
			shibao:'石苞',
			zhuosheng:'擢升',
			zhuosheng_info:'出牌阶段，①你使用本轮内获得的基本牌时无次数和距离限制。②你使用本轮内获得的普通锦囊牌选择目标后，可令此牌的目标数+1或-1。③你使用本轮内获得的装备牌时可以摸一张牌（以此法获得的牌不能触发〖擢升〗）。',
			jin_yanghuiyu:'晋羊徽瑜',
			jin_yanghuiyu_ab:'羊徽瑜',
			gz_jin_yanghuiyu:'羊徽瑜',
			huirong:'慧容',
			huirong_info:'隐匿技，锁定技。当你登场后，你令一名角色将手牌数摸至/弃至与体力值相同（至多摸至五张）。',
			ciwei:'慈威',
			ciwei_info:'一名角色于其回合内使用第二张牌时，若此牌为基本牌或普通锦囊牌，则你可以弃置一张牌，取消此牌的所有目标。',
			caiyuan:'才媛',
			caiyuan_info:'锁定技，当你扣减体力时，你获得一枚“才媛”标记直到你的下回合结束。结束阶段开始时，若你没有“才媛”标记且此回合不是你的第一个回合 ，则你摸两张牌。',
			huangzu:'黄祖',
			wangong:'挽弓',
			wangong2:'挽弓',
			wangong_info:'锁定技，当你使用基本牌时，你获得如下效果：当你使用下一张牌时，若此牌为【杀】，则此牌无次数和距离限制且伤害+1。',
			simazhou:'司马伷',
			caiwang:'才望',
			caiwang_info:'当你使用或打出牌响应其他角色使用的牌，或其他角色使用或打出牌响应你使用的牌后，若这两张牌颜色相同，则你可以弃置对方的一张牌。',
			naxiang:'纳降',
			naxiang2:'纳降',
			naxiang_info:'锁定技，当你受到其他角色造成的伤害后，或你对其他角色造成伤害后，你对其发动〖才望〗时的“弃置”改为“获得”直到你的下回合开始。',
			cheliji:'彻里吉',
			chexuan:'车悬',
			chexuan_info:'出牌阶段，若你的装备区里没有宝物牌，你可弃置一张黑色牌，选择一张【舆】置入你的装备区；当你失去装备区里的宝物牌后，你可进行判定，若结果为黑色，将一张随机的【舆】置入你的装备区。',
			qiangshou:'羌首',
			qiangshou_info:'锁定技，若你的装备区内有宝物牌，你与其他角色的距离-1。',
			cheliji_sichengliangyu:'四乘粮舆',
			cheliji_sichengliangyu_bg:'粮',
			cheliji_sichengliangyu_info:'一名角色的回合结束时，若你的手牌数小于体力值，你可以摸两张牌，然后弃置此牌。',
			cheliji_tiejixuanyu:'铁蒺玄舆',
			cheliji_tiejixuanyu_bg:'蒺',
			cheliji_tiejixuanyu_info:'其他角色的回合结束时，若其本回合未造成过伤害，你可以令其弃置两张牌，然后弃置此牌。',
			cheliji_feilunzhanyu:'飞轮战舆',
			cheliji_feilunzhanyu_bg:'轮',
			cheliji_feilunzhanyu_info:'其他角色的回合结束时，若其本回合使用过非基本牌，你可以令其交给你一张牌，然后弃置此牌。',
			weiguan:'卫瓘',
			zhongyun:'忠允',
			zhongyun2:'忠允',
			zhongyun_info:'锁定技。每名角色的回合限一次，你受伤/回复体力后，若你的体力值与手牌数相等，你回复一点体力或对你攻击范围内的一名角色造成1点伤害；每名角色的回合限一次，你获得手牌或失去手牌后，若你的体力值与手牌数相等，你摸一张牌或弃置一名其他角色一张牌。',
			shenpin:'神品',
			shenpin_info:'当一名角色的判定牌生效前，你可以打出一张与判定牌颜色不同的牌代替之。',

			yingbian_pack1:'文德武备·理',
			yingbian_pack2:'文德武备·备',
			yingbian_pack3:'文德武备·果',
		},
	};
});
