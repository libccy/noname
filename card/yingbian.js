'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'yingbian',
		//connect:true,
		card:{
			suijiyingbian:{
				global:'suijiyingbian_skill',
				fullskin:true,
				type:'trick',
			},
			zhujinqiyuan:{
				type:'trick',
				enable:true,
				audio:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('hej')>0;
				},
				content:function(){
					var dist=get.distance(player,target);
					if(dist>1||card.yingbian) player.discardPlayerCard(target,'hej',true);
					if(dist<=1||card.yingbian) player.gainPlayerCard(target,'hej',true);
				},
				fullskin:true,
				postAi:function(targets){
					return targets.length==1&&targets[0].countCards('j');
				},
				ai:{
					wuxie:function(target,card,player,viewer){
						if(get.attitude(viewer,player)>0&&get.attitude(viewer,target)>0){
							return 0;
						}
					},
					basic:{
						order:7.5,
						useful:4,
						value:9
					},
					result:{
						target:function(player,target){
							var discard=get.distance(player,target)>1;
							if(get.attitude(player,target)<=0) return (target.countCards('he',function(card){
								return get.value(card,target)>0&&(discard||card!=target.getEquip('jinhe'));
							})>0)?-1.5:1.5;
							var js=target.getCards('j');
							if(js.length){
								var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
								if(js.length==1&&get.effect(target,jj,target,player)>=0){
									return -1.5;
								}
								return 3;
							}
							return -1.5;
						},
						player:function(player,target){
							if(get.distance(player,target)>1) return 0;
							if(get.attitude(player,target)<0&&!target.countCards('he',function(card){
								return get.value(card,target)>0&&card!=target.getEquip('jinhe');
							})){
								return 0;
							}
							if(get.attitude(player,target)>1){
								var js=target.getCards('j');
								if(js.length){
									var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
									if(js.length==1&&get.effect(target,jj,target,player)>=0){
										return 0;
									}
									return 1;
								}
								return 0;
							}
							return 1;
						}
					},
					tag:{
						loseCard:1,
						gain:1,
					}
				},
			},
			dongzhuxianji:{
				audio:true,
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:-1,
				toself:true,
				filterTarget:function(card,player,target){
					return target==player;
				},
				modTarget:true,
				content:function(){
					target.chooseToGuanxing(2);
					target.draw(2);
				},
				ai:{
					basic:{
						order:7.2,
						useful:4.5,
						value:9.2
					},
					result:{
						target:2.1,
					},
					tag:{
						draw:2
					}
				}
			},
			chuqibuyi:{
				audio:true,
				enable:true,
				type:'trick',
				fullskin:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				yingbian:function(event){
					event.yingbian_addTarget=true;
				},
				content:function(){
					'step 0'
					if(player.isDead()||!target.countCards('h')){
						event.finish();
						return;
					}
					player.choosePlayerCard(target,'h',true);
					'step 1'
					if(result.bool){
						target.showCards(result.cards);
						if(get.suit(card)!=get.suit(result.cards[0])) target.damage();
					}
				},
				ai:{
					basic:{
						order:5,
						useful:2,
						value:6
					},
					result:{
						target:function(player,target,cardx){
							if(player.hasSkillTag('viewHandcard',null,target,true)) return target.countCards('h',function(card){
								return get.suit(card)!=get.suit(cardx)
							})>0?-1.5:0;
							return -1.4;
						},
					},
					tag:{
						damage:1,
					}
				}
			},
			wuxinghelingshan:{
				audio:true,
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-3},
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['wuxinghelingshan_skill']
			},
			wutiesuolian:{
				audio:true,
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['wutiesuolian_skill']
			},
			heiguangkai:{
				audio:true,
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['heiguangkai_skill']
			},
			tongque:{
				audio:true,
				fullskin:true,
				type:'equip',
				subtype:'equip5',
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['tongque_skill']
			},
			tianjitu:{
				audio:true,
				fullskin:true,
				type:'equip',
				subtype:'equip5',
				loseDelay:false,
				onEquip:function(){
					player.logSkill('tianjitu');
					if(player.countCards('he',function(cardx){
						return cardx!=card;
					})) player.chooseToDiscard(true,function(card){
						return card!=_status.event.card;
					},'he').set('card',card);
				},
				onLose:function(){
					var next=game.createEvent('tianjitu_lose');
					event.next.remove(next);
					var evt=event.getParent();
					if(evt.getlx===false) evt=evt.getParent();
					evt.after.push(next);
					next.player=player;
					next.setContent(function(){
						if(player.countCards('h')<5){
							player.logSkill('tianjitu');
							player.drawTo(5);
						}
					});
				},
			},
			taigongyinfu:{
				audio:true,
				fullskin:true,
				type:'equip',
				subtype:'equip5',
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['taigongyinfu_skill']
			},
		},
		skill:{
			suijiyingbian_skill:{
				mod:{
					cardname:function(card,player){
						if(card.name=='suijiyingbian'&&player.storage.suijiyingbian) return player.storage.suijiyingbian;
					},
				},
				trigger:{
					player:['useCard1','respond','phaseBeginStart'],
				},
				silent:true,
				firstDo:true,
				filter:function(event,player,name){
					if(name=='phaseBeginStart') return true;
					var type=get.type(event.card);
					return type=='basic'||type=='trick';
				},
				content:function(){
					if(event.triggername=='phaseBeginStart') delete player.storage.suijiyingbian;
					else player.storage.suijiyingbian=trigger.card.name;
				},
			},
			wuxinghelingshan_skill:{
				equipSkill:true,
				trigger:{player:'useCard1'},
				filter:function(event,player){
					return (event.card.name=='sha'&&event.card.nature&&event.card.nature!='kami');
				},
				audio:true,
				direct:true,
				content:function(){
					'step 0'
					var list=lib.linked.slice(0);
					list.remove('kami');
					list.remove(trigger.card.nature);
					list.push('cancel2');
					player.chooseControl(list).set('prompt',get.prompt('wuxinghelingshan_skill')).set('prompt2','将'+get.translation(trigger.card)+'转换为以下属性之一');
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('wuxinghelingshan_skill');
						trigger.card.nature=result.control;
						player.popup(get.translation(result.control)+'杀',result.control);
						game.log(trigger.card,'被转为了','#y'+get.translation(result.control),'属性')
					}
				}
			},
			wutiesuolian_skill:{
				trigger:{player:'useCardToPlayered'},
				forced:true,
				equipSkill:true,
				audio:true,
				filter:function(event,player){
					return event.card.name=='sha'&&(!event.target.isLinked()||event.target.countCards('h'));
				},
				logTarget:'target',
				content:function(){
					var target=trigger.target;
					if(!target.isLinked()) target.link();
					else player.viewHandcards(target);
				},
			},
			heiguangkai_skill:{
				equipSkill:true,
				trigger:{target:'useCardToTargeted'},
				forced:true,
				audio:true,
				filter:function(event,player){
					if(event.targets.length<2||(event.card.name!='sha'&&get.type(event.card)!='trick')) return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				content:function(){
					trigger.excluded.add(player);
				},
			},
			tongque_skill:{
				ai:{forceYingbian:true},
			},
			tianjitu_skill:{
				audio:true,
			},
			taigongyinfu_skill:{
				audio:true,
			},
			_yingbian:{
				trigger:{player:'useCard1'},
				forced:true,
				popup:false,
				firstDo:true,
				filter:function(event,player){
					var bool=player.hasSkillTag('forceYingbian');
					var card=event.card;
					if(get.cardtag(card,'yingbian_kongchao')&&(!player.countCards('h')||bool)) return true;
					if(get.cardtag(card,'yingbian_canqu')&&(player.hp==1||bool)) return true;
					if(get.cardtag(card,'yingbian_fujia')&&(player.isMaxHandcard()||bool)) return true;
					if(get.cardtag(card,'yingbian_zhuzhan')||bool) return true;
					return false;
				},
				content:function(){
					'step 0'
					var card=trigger.card;
					event.card=card;
					var bool=false;
					if(get.cardtag(card,'yingbian_kongchao')&&!player.countCards('h')){
						player.popup('空巢','soil');
						bool=true;
					}
					else if(get.cardtag(card,'yingbian_canqu')&&player.hp==1){
						player.popup('残躯','fire');
						bool=true;
					}
					else if(get.cardtag(card,'yingbian_fujia')&&player.isMaxHandcard()){
						player.popup('富甲','orange');
						bool=true;
					}
					else if(player.hasSkillTag('forceYingbian')) bool=true;
					if(bool){
						game.log(player,'触发了',card,'的应变条件');
						event.goto(10);
					}
					'step 1'
					event._global_waiting=true;
					event.send=function(player,card,source,id,id2,skillState){
						if(skillState){
							player.applySkills(skillState);
						}
						var type=get.type(card);
						var next=player.chooseCard({
							filterCard:function(card){
								return get.type(card)==type&&lib.filter.cardDiscardable.apply(this,arguments);
							},
							prompt:(get.translation(source)+'使用了'+get.translation(card)+'，是否弃置一张'+get.translation(type)+'为其助战？'),
							position:'h',
							_global_waiting:true,
							id:id,
							id2:id2,
							ai:function(card){
								if(get.attitude(player,source)<=0) return false;
								return 5-get.value(card);
							},
						});
						if(game.online){
							_status.event._resultid=id;
							game.resume();
						}
					};
					'step 2'
					var type=get.type(card);
					var list=game.filterPlayer(function(current){
						if(current==player) return false;
						if(!current.countCards('h')) return false;
						return _status.connectMode||current.countCards('h',function(cardx){
							return get.type(cardx)==type;
						})
					});
					event.list=list;
					event.id=get.id();
					list.sort(function(a,b){
						return get.distance(event.source,a,'absolute')-get.distance(event.source,b,'absolute');
					});
					'step 3'
					if(event.list.length==0){
						event.finish();
						return;
					}
					else if(_status.connectMode&&(event.list[0].isOnline()||event.list[0]==game.me)){
						event.goto(5);
					}
					else{
						event.current=event.list.shift();
						event.send(event.current,event.card,player,event.id,trigger.parent.id);
					}
					'step 4'
					if(result.bool){
						event.zhuzhanresult=event.current;
						event.zhuzhanresult2=result;
						if(event.current!=game.me) game.delayx();
						event.goto(9);
					}
					else{
						event.goto(3);
					}
					'step 5'
					var id=event.id;
					var sendback=function(result,player){
						if(result&&result.id==id&&!event.zhuzhanresult&&result.bool){
							event.zhuzhanresult=player;
							event.zhuzhanresult2=result;
							game.broadcast('cancel',id);
							if(_status.event.id==id&&_status.event.name=='chooseCard'&&_status.paused){
								return (function(){
									event.resultOL=_status.event.resultOL;
									ui.click.cancel();
									if(ui.confirm) ui.confirm.close();
								});
							}
						}
						else{
							if(_status.event.id==id&&_status.event.name=='chooseCard'&&_status.paused){
								return (function(){
									event.resultOL=_status.event.resultOL;
								});
							}
						}
					};

					var withme=false;
					var withol=false;
					var list=event.list;
					for(var i=0;i<list.length;i++){
						if(list[i].isOnline()){
							withol=true;
							list[i].wait(sendback);
							list[i].send(event.send,list[i],event.card,player,event.id,trigger.parent.id,get.skillState(list[i]));
							list.splice(i--,1);
						}
						else if(list[i]==game.me){
							withme=true;
							event.send(list[i],event.card,event.source,event.id,trigger.parent.id);
							list.splice(i--,1);
						}
					}
					if(!withme){
						event.goto(7);
					}
					if(_status.connectMode){
						if(withme||withol){
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=player) game.players[i].showTimer();
							}
						}
					}
					event.withol=withol;
					'step 6'
					if(result&&result.bool&&!event.zhuzhanresult){
						game.broadcast('cancel',event.id);
						event.zhuzhanresult=game.me;
						event.zhuzhanresult2=result;
					}
					'step 7'
					if(event.withol&&!event.resultOL){
						game.pause();
					}
					'step 8'
					for(var i=0;i<game.players.length;i++){
						game.players[i].hideTimer();
					}
					'step 9'
					if(event.zhuzhanresult){
						var target=event.zhuzhanresult;
						target.line(player,'green');
						target.discard(event.zhuzhanresult2.cards);
						target.popup('助战','wood');
						game.log(target,'响应了',player,'发起的助战');
					}
					else event.finish();
					'step 10'
					trigger.card.yingbian=true;
					var info=get.info(trigger.card);
					if(info&&info.yingbian) info.yingbian(trigger);
					player.addTempSkill('yingbian_changeTarget');
				},
			},
			yingbian_changeTarget:{
				trigger:{player:'useCard2'},
				forced:true,
				popup:false,
				filter:function(event,player){
					if(event.yingbian_removeTarget&&event.targets&&event.targets.length>1) return true;
					if(!event.yingbian_addTarget) return false;
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
					if(trigger.yingbian_addTarget) player.chooseTarget('应变：是否为'+get.translation(trigger.card)+'增加一个目标？',function(card,player,target){
						var trigger=_status.event.getTrigger();
						var card=trigger.card;
						return !trigger.targets.contains(target)&&lib.filter.targetEnabled2(card,player,target)&&lib.filter.targetInRange(card,player,target);
					}).set('ai',function(target){
						var player=_status.event.player;
						var card=_status.event.getTrigger().card;
						return get.effect(target,card,player,player);
					});
					else event.goto(2);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						game.log(player,'发动应变效果，令',target,'也成为了',trigger.card,'的目标');
						trigger.targets.add(target);
					}
					'step 2'
					if(trigger.yingbian_removeTarget&&trigger.targets.length>1) player.chooseTarget('应变：是否为'+get.translation(trigger.card)+'减少一个目标？',function(card,player,target){
						var trigger=_status.event.getTrigger();
						return trigger.targets.contains(target);
					}).set('ai',function(target){
						var player=_status.event.player;
						var card=_status.event.getTrigger().card;
						return -get.effect(target,card,player,player);
					});
					else event.finish();
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						game.log(player,'发动应变效果，将',target,'从',trigger.card,'的目标中移除了');
						trigger.targets.remove(target);
					}
				},
			}
		},
		translate:{
			suijiyingbian:'随机应变',
			suijiyingbian_info:'此牌的牌名视为你本回合内使用或打出的上一张基本牌或普通锦囊牌的牌名。',
			zhujinqiyuan:'逐近弃远',
			zhujinqiyuan_info:'出牌阶段，对一名有牌的其他角色使用。若你与其距离的大于1，你弃置其区域内的一张牌；若你与其的距离等于1，你获得其区域内的一张牌。',
			dongzhuxianji:'洞烛先机',
			dongzhuxianji_info:'出牌阶段，对包含你在内的一名角色使用。你观看牌堆顶的两张牌并将其以任意顺序置于牌堆顶或牌堆底，然后摸两张牌。',
			chuqibuyi:'出其不意',
			chuqibuyi_info:'出牌阶段，对一名有手牌的其他角色使用。你展示其一张手牌，若此牌与【出其不意】的花色不同，则你对其造成1点伤害。',
			wuxinghelingshan:'五行鹤翎扇',
			wuxinghelingshan_skill:'五行鹤翎扇',
			wuxinghelingshan_info:'当你声明使用不为神属性的属性【杀】时，你可将此【杀】的属性改为不为神属性的其他属性。',
			wutiesuolian:'乌铁锁链',
			wutiesuolian_skill:'乌铁锁链',
			wutiesuolian_skill_info:'当你使用【杀】指定目标后，若其：已横置，你观看其手牌。未横置，其横置。',
			heiguangkai:'黑光铠',
			heiguangkai_skill:'黑光铠',
			heiguangkai_info:'锁定技，当你成为【杀】或普通锦囊牌的目标后，若此牌的目标数大于1，则你令此牌对你无效。',
			tongque:'铜雀',
			tongque_info:'你使用带有【应变】效果的牌可以无视条件直接生效。',
			tianjitu:'天机图',
			tianjitu_skill:'天机图',
			tianjitu_info:'锁定技，当此牌进入你的装备区时，你弃置一张不为此【天机图】的牌。当此牌离开你的装备区后，你将手牌摸至五张。',
			taigongyinfu:'太公阴符',
			taigongyinfu_info:'出牌阶段开始时，你可以横置一名角色。出牌阶段结束时，你可以重置一张手牌。',
			yingbian_zhuzhan_tag:'助战',
			yingbian_kongchao_tag:'空巢',
			yingbian_fujia_tag:'富甲',
			yingbian_canqu_tag:'残躯',
			_yingbian:'应变',
			yingbian_changeTarget:'应变',
		},
		list:[
			['spade',1,'juedou',null,['yingbian_fujia']],
			['spade',1,'taigongyinfu'],
			['spade',1,'guding'],
			['spade',2,'cixiong'],
			['spade',2,'bagua'],
			['spade',2,'tengjia'],
			['spade',2,'suijiyingbian'],
			['spade',3,'jiu'],
			['spade',3,'zhujinqiyuan'],
			['spade',3,'shuiyanqijunx',null,['yingbian_zhuzhan']],
			['spade',4,'sha','thunder'],
			['spade',4,'guohe'],
			['spade',4,'shuiyanqijunx',null,['yingbian_zhuzhan']],
			['spade',5,'sha','thunder'],
			['spade',5,'qinglong'],
			['spade',5,'jueying'],
			['spade',6,'sha','thunder'],
			['spade',6,'lebu'],
			['spade',6,'qinggang'],
			['spade',7,'sha','ice'],
			['spade',7,'sha','ice'],
			['spade',7,'nanman',null,['yingbian_fujia']],
			['spade',8,'sha','ice'],
			['spade',8,'sha','ice'],
			['spade',8,'sha','ice'],
			['spade',9,'sha',null,['yingbian_canqu']],
			['spade',9,'sha',null,['yingbian_canqu']],
			['spade',9,'jiu'],
			['spade',10,'sha',null,['yingbian_canqu']],
			['spade',10,'sha',null,['yingbian_canqu']],
			['spade',10,'bingliang'],
			['spade',11,'wuxie'],
			['spade',11,'shuiyanqijunx'],
			['spade',11,'tiesuo'],
			['spade',12,'zhujinqiyuan',null,['yingbian_zhuzhan']],
			['spade',12,'tiesuo'],
			['spade',12,'zhangba'],
			['spade',13,'wuxie',null,['yingbian_kongchao']],
			['spade',13,'nanman',null,['yingbian_fujia']],
			['spade',13,'dawan'],
			
			['heart',1,'taoyuan'],
			['heart',1,'wanjian'],
			['heart',1,'wuxie'],
			['heart',2,'shan',null,['yingbian_kongchao']],
			['heart',2,'shan',null,['yingbian_kongchao']],
			['heart',2,'chuqibuyi',null,['yingbian_zhuzhan']],
			['heart',3,'wugu'],
			['heart',3,'tao'],
			['heart',3,'chuqibuyi',null,['yingbian_zhuzhan']],
			['heart',4,'sha','fire'],
			['heart',4,'tao'],
			['heart',4,'suijiyingbian'],
			['heart',5,'chitu'],
			['heart',5,'tao'],
			['heart',5,'qilin'],
			['heart',6,'tao'],
			['heart',6,'tao'],
			['heart',6,'lebu'],
			['heart',7,'sha','fire'],
			['heart',7,'tao'],
			['heart',7,'dongzhuxianji'],
			['heart',8,'tao'],
			['heart',8,'shan'],
			['heart',8,'dongzhuxianji'],
			['heart',9,'tao'],
			['heart',9,'shan'],
			['heart',9,'dongzhuxianji'],
			['heart',10,'sha','fire',['yingbian_canqu']],
			['heart',10,'sha'],
			['heart',10,'sha'],
			['heart',11,'sha'],
			['heart',11,'shan'],
			['heart',11,'dongzhuxianji'],
			['heart',12,'tao'],
			['heart',12,'shan'],
			['heart',12,'guohe'],
			['heart',1,'shandian'],
			['heart',13,'wuxie',null,['yingbian_kongchao']],
			['heart',13,'shan'],
			['heart',13,'zhuahuang'],
			
			['club',1,'juedou',null,['yingbian_fujia']],
			['club',1,'zhuge'],
			['club',1,'huxinjing'],
			['club',2,'sha',null,['yingbian_kongchao']],
			['club',2,'heiguangkai'],
			['club',2,'tengjia'],
			['club',1,'renwang'],
			['club',3,'sha',null,['yingbian_kongchao']],
			['club',3,'jiu'],
			['club',3,'zhujinqiyuan',null,['yingbian_zhuzhan']],
			['club',4,'sha',null,['yingbian_kongchao']],
			['club',4,'bingliang'],
			['club',4,'zhujinqiyuan',null,['yingbian_zhuzhan']],
			['club',5,'sha',null,['yingbian_kongchao']],
			['club',5,'sha'],
			['club',5,'dilu'],
			['club',6,'sha'],
			['club',6,'sha','thunder'],
			['club',6,'lebu'],
			['club',7,'sha'],
			['club',7,'sha','thunder'],
			['club',7,'nanman'],
			['club',8,'sha'],
			['club',8,'sha','thunder'],
			['club',8,'jiu'],
			['club',9,'sha','thunder'],
			['club',9,'sha','thunder'],
			['club',9,'jiu'],
			['club',10,'sha','thunder'],
			['club',10,'sha','thunder'],
			['club',10,'tiesuo'],
			['club',11,'sha'],
			['club',11,'sha',null,['yingbian_canqu']],
			['club',11,'tiesuo'],
			['club',12,'wuxie'],
			['club',12,'tianjitu'],
			['club',12,'tiesuo'],
			['club',13,'wuxie'],
			['club',13,'tongque'],
			['club',13,'tiesuo'],
			
			['diamond',1,'juedou'],
			['diamond',1,'zhuge'],
			['diamond',1,'wuxinghelingshan'],
			['diamond',2,'tao'],
			['diamond',2,'shan',null,['yingbian_kongchao']],
			['diamond',2,'shan',null,['yingbian_kongchao']],
			['diamond',3,'tao'],
			['diamond',3,'shan'],
			['diamond',3,'shunshou'],
			['diamond',4,'sha','fire',['yingbian_canqu']],
			['diamond',4,'shan'],
			['diamond',4,'shunshou'],
			['diamond',5,'sha','fire'],
			['diamond',5,'shan'],
			['diamond',5,'guanshi'],
			['diamond',6,'sha'],
			['diamond',6,'shan'],
			['diamond',6,'shan'],
			['diamond',7,'sha'],
			['diamond',7,'shan'],
			['diamond',7,'shan'],
			['diamond',8,'sha',null,['yingbian_canqu']],
			['diamond',8,'shan'],
			['diamond',8,'shan'],
			['diamond',9,'sha'],
			['diamond',9,'shan'],
			['diamond',9,'jiu'],
			['diamond',10,'sha','fire'],
			['diamond',10,'shan'],
			['diamond',10,'shan'],
			['diamond',11,'chuqibuyi'],
			['diamond',11,'shan'],
			['diamond',11,'shan'],
			['diamond',12,'tao'],
			['diamond',12,'shan'],
			['diamond',12,'wutiesuolian'],
			['diamond',12,'wuxie'],
			['diamond',13,'sha','fire'],
			['diamond',13,'zixin'],
			['diamond',13,'hualiu'],
		],
	}
});
