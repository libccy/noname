'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'collab',
		connect:true,
		character:{
			zhutiexiong:['male','qun',3,['dcbianzhuang']],
			wu_zhutiexiong:['male','qun',3,['dcbianzhuang'],['unseen']],
			xiaoyuehankehan:['male','qun',3,['dctongliao','dcwudao']],
			libai:['male','qun',3,['dclbjiuxian','dcshixian']],
			sunwukong:['male','qun',3,['dcjinjing','dccibei','dcruyi']],
			longwang:['male','qun',3,['dclonggong','dcsitian']],
			taoshen:['male','qun',3,['dcnutao']],
			sunyang:['male','wu',4,['clbshuijian']],
			yeshiwen:['female','wu',3,['clbjisu','clbshuiyong']],
			sp_jiben:['male','qun',3,['spduanzhi','spduyi']],
			sp_fuhuanghou:['female','qun',3,['spcangni','spmixin']],
			sp_fuwan:['male','qun',3,['spfengyin','spchizhong']],
			old_lingju:['female','qun',3,['jieyuan','fenxin_old']],
			sp_mushun:['male','qun',4,['dcmoukui']],
		},
		characterFilter:{
			old_lingju:function(mode){
				return mode=='identity';
			}
		},
		characterSort:{
			collab:{
				collab_olympic:['sunyang','yeshiwen'],
				collab_tongque:["sp_fuwan","sp_fuhuanghou","sp_jiben","old_lingju",'sp_mushun'],
				collab_duanwu:['sunwukong','longwang','taoshen'],
				collab_decade:['libai','xiaoyuehankehan','zhutiexiong','wu_zhutiexiong'],
			},
		},
		skill:{
			//朱铁雄
			dcbianzhuang:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					var list=[];
					for(var i in lib.skill.dcbianzhuang.characterMap){
						if(Array.isArray(lib.character[i])&&get.is.object(lib.skill[lib.skill.dcbianzhuang.characterMap[i]])) list.push(i);
					}
					var characters=list.randomGets(player.storage.dcbianzhuang_inited?3:2);
					if(!characters.length){
						event.finish();
						return;
					}
					var skills=characters.map(i=>lib.skill.dcbianzhuang.characterMap[i]);
					player.chooseControl(skills).set('dialog',[
						'选择获得一个技能并“变装”',
						[characters,'character']
					]);
					'step 1'
					var skill=result.control;
					player.addTempSkill(skill,'dcbianzhuangAfter');
					for(var i in lib.skill.dcbianzhuang.characterMap){
						if(lib.skill.dcbianzhuang.characterMap[i]==skill){
							player.flashAvatar('dcbianzhuang',i);
							player.popup(skill);
							game.log(player,'“变装”为了','#b'+get.translation(i));
							break;
						}
					}
					player.chooseUseTarget('sha',true,false,'nodistance');
					'step 2'
					if(result.bool&&!player.storage.dcbianzhuang_inited){
						player.addMark('dcbianzhuang',1,false);
						if(player.countMark('dcbianzhuang')>2){
							player.storage.dcbianzhuang_inited=true;
							player.reinit('zhutiexiong','wu_zhutiexiong');
						}
					}
				},
				group:'dcbianzhuang_refresh',
				ai:{
					order:16,
					result:{
						player:function(player){
							if(player.hasValueTarget('sha',false)) return 1;
							return 0;
						},
					},
					effect:{
						target:function(card,player,target,current){
							if(player==target&&player.isPhaseUsing()&&get.type(card)=='equip'){
								if(player.hasValueTarget('sha',false)&&typeof player.getStat('skill').dcbianzhuang=='number') return [1,3];
							}
						},
					},
				},
				subSkill:{
					refresh:{
						trigger:{player:'useCardAfter'},
						forced:true,
						filter:function(event,player){
							return get.type2(event.card,false)=='equip'&&typeof player.getStat('skill').dcbianzhuang=='number';
						},
						content:function(){
							var stat=player.getStat('skill');
							delete stat.dcbianzhuang;
						},
					},
				},
				characterMap:{
					re_zhangchunhua:'rejueqing',
					wangshuang:'spzhuilie',
					re_machao:'retieji',
					ol_weiyan:'xinkuanggu',
					re_lvbu:'wushuang',
					re_huangzhong:'xinliegong',
					ol_pangde:'rejianchu',
					ol_zhurong:'lieren',
					re_masu:'rezhiman',
					re_panzhangmazhong:'reanjian',
					mayunlu:'fengpo',
					re_quyi:'refuqi',
				},
			},
			//小约翰可汗
			dctongliao:{
				audio:3,
				trigger:{player:'phaseDrawAfter'},
				direct:true,
				locked:false,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt('dctongliao'),'选择一张牌标记为“通辽”',function(card,player){
						if(card.hasGaintag('dctongliao')) return false;
						var num=get.number(card,player);
						return !player.hasCard(card2=>{
							return card!=card2&&get.number(card2,player)<num;
						})
					}).set('ai',function(card){
					 var player=_status.event.player;
					 return 1+Math.max(0,player.getUseValue(card,null,true))
					})
					'step 1'
					if(result.bool){
						player.logSkill('dctongliao');
						player.addGaintag(result.cards,'dctongliao');
						game.delayx();
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&card.hasGaintag('dctongliao')) return num+0.6;
					},
				},
				group:'dctongliao_draw',
				subSkill:{
					draw:{
						trigger:{
							player:['loseAfter'],
							global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
						},
						filter:function(event,player){
							var evt=event.getl(player);
							if(!evt||!evt.hs||!evt.hs.length) return false;
							if(event.name=='lose'){
								for(var i in event.gaintag_map){
									if(event.gaintag_map[i].contains('dctongliao')) return true;
								}
								return false;
							}
							return player.hasHistory('lose',function(evt){
								if(event!=evt.getParent()) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('dctongliao')) return true;
								}
								return false;
							});
						},
						forced:true,
						content:function(){
							var num=0;
							var cards=trigger.getl(player).hs,ids=[];
							if(trigger.name=='lose'){
								for(var i in trigger.gaintag_map){
									if(trigger.gaintag_map[i].contains('dctongliao')) ids.push(i);
								}
							}
							else player.getHistory('lose',function(evt){
								if(trigger!=evt.getParent()) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('dctongliao')) ids.push(i);
								}
							});
							for(var card of cards){
								if(ids.contains(card.cardid)) num+=get.number(card,player);
							}
							if(num>0) player.draw(num);
						}
					},
				},
			},
			dcwudao:{
				audio:3,
				trigger:{player:'useCardAfter'},
				frequent:true,
				filter:function(event,player){
					if(player.getStorage('dcwudao_effect').contains(get.type2(event.card,false))) return false;
					var history=player.getHistory('useCard'),index=history.indexOf(event);
					if(index<1) return false;
					var evt=history[index-1];
					return get.type2(event.card,false)==get.type2(evt.card,false);
				},
				prompt2:function(event){
					return '令你本回合使用'+get.translation(get.type2(event.card,false))+'牌时不可被响应且伤害+1';
				},
				content:function(){
					player.addTempSkill('dcwudao_effect');
					player.markAuto('dcwudao_effect',[get.type2(trigger.card,false)])
				},
				subSkill:{
					effect:{
						trigger:{player:'useCard'},
						forced:true,
						popup:false,
						onremove:true,
						filter:function(event,player){
							return player.getStorage('dcwudao_effect').contains(get.type2(event.card,false));
						},
						content:function(){
							if(get.tag(trigger.card,'damage')>0) trigger.baseDamage++;
							trigger.directHit.addArray(game.filterPlayer());
						},
						intro:{content:'已经悟到了$牌'},
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								if(arg&&arg.card&&player.getStorage('dcwudao_effect').contains(get.type2(arg.card))) return true;
								return false;
							},
						},
					},
				},
			},
			//叶诗文
			clbjisu:{
				audio:2,
				trigger:{player:'phaseJudgeBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check=player.countCards('h')>2;
					player.chooseTarget(get.prompt("clbjisu"),"跳过判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】",function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target,false);
					}).set('check',check).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.effect(target,{name:'sha'},_status.event.player);
					}).setHiddenSkill('clbjisu');
					"step 1"
					if(result.bool){
						player.useCard({name:'sha',isCard:true},result.targets[0],false,'clbjisu');
						trigger.cancel();
						player.skip('phaseDraw');
					}
				}
			},
			clbshuiyong:{
				audio:2,
				trigger:{player:'damageBegin4'},
				filter:function(event){
					return event.nature=='fire';
				},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'fireDamage')) return 'zerotarget';
						}
					}
				}
			},
			//孙杨
			clbshuijian:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				frequent:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					var num=1+Math.floor(player.countCards('e')/2);
					trigger.num+=num;
				},
			},
			//李白
			dclbjiuxian:{
				audio:2,
				enable:'chooseToUse',
				locked:false,
				viewAs:{name:'jiu'},
				check:card=>6.5-get.value(card),
				filterCard:function(card){
					var info=get.info(card);
					if(!info||(info.type!='trick'&&info.type!='delay')) return false;
					if(info.notarget) return false;
					if(info.selectTarget!=undefined){
						if(Array.isArray(info.selectTarget)){
							if(info.selectTarget[0]<0) return !info.toself;
							return info.selectTarget[0]!=1||info.selectTarget[1]!=1;
						}
						else{
							if(info.selectTarget<0) return !info.toself;
							return info.selectTarget!=1;
						}
					}
					return false;
				},
				viewAsFilter:function(player){
					if(_status.connectMode&&player.countCards('hs')>0) return true;
					return player.hasCard(lib.skill.dclbjiuxian.filterCard,'hs')
				},
				ai:{
					order:(item,player)=>get.order({name:'jiu'},player),
				},
				mod:{
					cardUsable:function(card){
						if(card.name=='jiu') return Infinity;
					},
				},
			},
			dcshixian:{
				audio:2,
				trigger:{player:'useCard'},
				//frequent:true,
				//direct:true,
				locked:false,
				filter:function(event,player){
					var history=player.getAllHistory('useCard'),index=history.indexOf(event);
					if(index<1) return false;
					var evt=history[index-1];
					return get.is.yayun(get.translation(event.card.name),get.translation(evt.card.name));
				},
				filterx:function(event){
					if(event.targets.length==0) return false;
					var type=get.type(event.card);
					if(type!='basic'&&type!='trick') return false;
					return true;
				},
				prompt2:function(event,player){
					if(lib.skill.dcshixian.filterx(event)) return '摸一张牌并令'+get.translation(event.card)+'额外结算一次？';
					return '摸一张牌。';
				},
				check:function(event,player){
					if(lib.skill.dcshixian.filterx(event)) return !get.tag(event.card,'norepeat');
					return true;
				},
				content:function(){
					player.draw();
					if(lib.skill.dcshixian.filterx(trigger)){
						trigger.effectCount++;
						game.log(trigger.card,'额外结算一次');
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&!get.tag(card,'norepeat')){
							var history=player.getAllHistory('useCard');
							if(history.length>0){
								var cardx=history[history.length-1].card;
								if(get.is.yayun(get.translation(cardx.name),get.translation(card.name))) return num+20;
							}
						}
					},
				},
				content_old:function(){
					'step 0'
					if(lib.skill.dcshixian.filterx(trigger)){
						player.chooseControl('cancel2').set('choiceList',[
							'摸一张牌',
							'令'+get.translation(trigger.card)+'额外结算一次',
						]).set('prompt',get.prompt('dcsitian'));
					}
					else{
						player.chooseBool('是否发动【诗仙】摸一张牌？').set('frequentSkill','dcshixian');
					}
					'step 1'
					if(result.control){
						if(result.index==0){
							player.logSkill('dcshixian');
							player.draw();
						}
						else if(result.index==1){
							trigger.effectCount++;
						}
					}
					else if(result.bool){
						player.logSkill('dcshixian');
						player.draw();
					}
				},
			},
			//龙王
			dclonggong:{
				audio:2,
				trigger:{player:'damageBegin4'},
				usable:1,
				filter:function(event,player){
					return event.source&&event.source.isAlive();
				},
				logTarget:'source',
				check:function(event,player){
					return get.attitude(player,event.source)>=0||player.hp<=Math.max(2,event.num);
				},
				content:function(){
					'step 0'
					trigger.cancel();
					'step 1'
					var card=get.cardPile2(function(card){
						return get.type(card,null,false)=='equip';
					}),source=trigger.source;
					if(card&&source&&source.isAlive()) source.gain(card,'gain2');
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player){
						return !player.storage.counttrigger||!player.storage.counttrigger.dclonggong;
					},
				},
			},
			dcsitian:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					var colorx=false,hs=player.getCards('he');
					if(hs.length<2) return false;
					for(var card of hs){
						if(!lib.filter.cardDiscardable(card,player)) continue;
						var color=get.color(card,player);
						if(color=='none') continue;
						if(!colorx) colorx=color;
						else if(colorx!=color) return true;
					}
					return false;
				},
				filterCard:function(card,player){
					var color=get.color(card,player);
					if(color=='none') return false;
					return !ui.selected.cards.length||get.color(ui.selected.cards[0])!=color;
				},
				selectCard:2,
				complexCard:true,
				prompt:'弃置两张颜色不同的牌并改变天气',
				check:(card)=>4.5-get.value(card),
				content:function(){
					'step 0'
					var list=['烈日','雷电','大浪','暴雨','大雾'].randomGets(2);
					player.chooseButton(true,[
						'请选择执行一个天气',
						[list.map(i=>[
							i,
							'<div class="popup text" style="width:calc(100% - 10px);display:inline-block"><div class="skill">【'+i+'】</div><div>'+lib.skill.dcsitian.weathers[i].description+'</div></div>',
						]),'textbutton'],
					]).set('ai',function(button){
						return lib.skill.dcsitian.weathers[button.link].ai(_status.event.player);
					})
					'step 1'
					if(result.bool){
						var choice=result.links[0];
						game.log(player,'将当前天气变更为','#g'+choice);
						var next=game.createEvent('dcsitian_weather',false);
						next.player=player;
						next.setContent(lib.skill.dcsitian.weathers[choice].content);
					}
				},
				ai:{
					order:8,
					result:{
						player:function(player){
							var num1=0,num2=0;
							game.countPlayer(function(current){
								if(player==current) return;
								var att=get.attitude(player,current);
								if(att>0) num1++;
								else num2++;
							});
							return num2-num1;
						},
					},
				},
				subSkill:{
					dawu:{
						trigger:{player:'useCard'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							return get.type2(event.card,false)=='basic';
						},
						content:function(){
							trigger.targets.length=0;
							trigger.all_excluded=true;
							player.removeSkill('dcsitian_dawu');
						},
						mark:true,
						marktext:'雾',
						intro:{
							name:'司天 - 大雾',
							content:'使用的下一张基本牌无效',
						},
					},
				},
				weathers:{
					烈日:{
						description:'你对其他角色造成1点火属性伤害。',
						content:function(){
							var targets=game.filterPlayer(current=>current!=player).sortBySeat();
							player.line(targets,'fire');
							for(var target of targets){
								target.damage('fire');
							}
						},
						ai:function(player){
							var effect=0;
							game.countPlayer(function(current){
								if(current==player) return;
								effect+=get.damageEffect(current,player,player,'fire');
							});
							return effect;
						},
					},
					雷电:{
						description:'你令其他角色各进行一次判定。若结果为♠2~9，则其受到3点无来源雷属性伤害。',
						content:function(){
							'step 0'
							var targets=game.filterPlayer(current=>current!=player).sortBySeat();
							player.line(targets,'thunder');
							event.targets=targets;
							'step 1'
							var target=targets.shift();
							if(!target.isIn()){
								if(targets.length>0) event.redo();
								else{
									event.finish();
									return;
								}
							}
							event.target=target;
							event.judgestr=get.translation('shandian');
							target.judge(lib.card.shandian.judge,event.judgestr).judge2=lib.card.shandian.judge2;
							//game.delayx(1.5);
							'step 2'
							var name='shandian';
							if(event.cancelled&&!event.direct){
								if(lib.card[name].cancel){
									var next=game.createEvent(name+'Cancel');
									next.setContent(lib.card[name].cancel);
									next.cards=[];
									next.card=get.autoViewAs({name:name});
									next.player=target;
								}
							}
							else{
								var next=game.createEvent(name);
								next.setContent(function(){
									if(result.bool==false){
										player.damage(3,'thunder','nosource');
									}
								});
								next._result=result;
								next.cards=[];
								next.card=get.autoViewAs({name:name});
								next.player=target;
							}
							if(targets.length>0) event.goto(1);
						},
						ai:function(player){
							var effect=0;
							game.countPlayer(function(current){
								if(current==player) return;
								effect+=get.damageEffect(current,current,player,'thunder')/5;
							});
							return effect;
						},
					},
					大浪:{
						description:'你弃置其他角色装备区内的所有牌（装备区内没有牌的角色改为失去1点体力）。',
						content:function(){
							'step 0'
							var targets=game.filterPlayer(current=>current!=player).sortBySeat();
							player.line(targets,'green');
							event.targets=targets;
							'step 1'
							var target=targets.shift();
							if(target.isIn()){
								var num=target.countCards('e');
								if(num>0){
								 player.discardPlayerCard(target,true,'e',num)
								}
								else{
								 target.loseHp();
								 game.delayex();
								}
							}
							if(targets.length>0) event.redo();
						},
						ai:function(player){
							var effect=0;
							game.countPlayer(function(current){
								if(current==player) return;
								var es=current.getCards('e');
								if(es.length>0){
									var att=get.attitude(player,current),val=get.value(es,current);
									effect-=Math.sqrt(att)*val;
								}
								else effect+=get.effect(current,{name:'losehp'},player,player);
							});
							return effect;
						},
					},
					暴雨:{
						description:'你弃置一名角色的所有手牌。若其没有手牌，则改为令其失去1点体力。',
						content:function(){
							'step 0'
							player.chooseTarget('请选择【暴雨】的目标','令目标角色弃置所有手牌。若其没有手牌，则其改为失去1点体力。').set('ai',function(current){
								var es=current.getCards('h'),player=_status.event.player;
								if(es.length>0){
									var att=get.attitude(player,current),val=get.value(es,current);
									return -Math.sqrt(att)*val;
								}
								return get.effect(current,{name:'losehp'},player,player);
							})
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.line(target,'green');
								var num=target.countCards('h');
								if(num>0){
								 player.discardPlayerCard(target,true,'h',num)
								}
								else{
								 target.loseHp();
								 game.delayex();
								}
							}
						},
						ai:function(player){
							return Math.max.apply(Math,game.filterPlayer(function(current){
								return current!=player
							}).map(function(current){
								var es=current.getCards('h');
								if(es.length>0){
									var att=get.attitude(player,current),val=get.value(es,current);
									return -Math.sqrt(att)*val;
								}
								return get.effect(current,{name:'losehp'},player,player);
							}));
						},
					},
					大雾:{
						description:'你令所有其他角色获得如下效果：当其使用下一张基本牌时，取消之。',
						content:function(){
							var targets=game.filterPlayer(current=>current!=player).sortBySeat();
							player.line(targets);
							for(var target of targets) target.addSkill('dcsitian_dawu');
						},
						ai:function(player){
							var effect=0;
							game.countPlayer(function(current){
								if(current==player||current.hasSkill('dcsitian_dawu')) return;
								effect-=0.5*get.attitude(player,current);
							});
							return effect;
						},
					},
				},
			},
			//美猴王
			dcjinjing:{
				locked:true,
				ai:{
					viewHandcard:true,
					skillTagFilter:function(player,tag,arg){
						if(player==arg) return false;
					},
				},
			},
			dccibei:{
				audio:2,
				trigger:{source:'damageBegin2'},
				logTarget:'player',
				filter:function(event,player){
					return player!=event.player&&!player.hasHistory('useSkill',function(evt){
						return evt.skill=='dccibei'&&evt.targets.contains(event.player);
					});
				},
				check:function(event,player){
					var target=event.player;
					if(get.attitude(player,target)>=0) return true;
					return (!player.getStat('skill').ruyijingubang_skill||player.storage.ruyijingubang_skill==1);
				},
				content:function(){
					trigger.cancel();
					player.draw(5);
				},
				ai:{
					threaten:4.5,
				},
			},
			dcruyi:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&!player.isDisabled(1);
				},
				content:function(){
					var card=game.createCard2('ruyijingubang','heart',9);
					player.$gain2(card,false);
					player.equip(card);
				},
				mod:{
					canBeGained:function(card,source,player){
						if(card==player.getEquip(1)&&card.name=='ruyijingubang') return false;
					},
					canBeDiscarded:function(card,source,player){
						if(card==player.getEquip(1)&&card.name=='ruyijingubang') return false;
					},
					cardname:function(card){
						if(get.subtype(card,false)=='equip1') return 'sha';
					},
					cardnature:function(card){
						if(get.subtype(card,false)=='equip1') return false;
					},
					targetEnabled:function(card){
						if(get.subtype(card)=='equip1') return false;
					},
					cardDiscardable:function(card,player){
						if(card==player.getEquip(1)&&card.name=='ruyijingubang') return false;
					},
					cardEnabled2:function(card,player){
						if(card==player.getEquip(1)&&card.name=='ruyijingubang') return false;
					},
				},
				group:'dcruyi_blocker',
				subSkill:{
					blocker:{
						trigger:{player:['loseBefore','equipBefore','disableEquipBefore']},
						forced:true,
						filter:function(event,player){
							if(event.name=='disableEquip') return (event.pos=='equip1');
							var card=player.getEquip(1);
							if(!card||card.name!='ruyijingubang') return false;
							if(event.name=='equip'){
								return get.subtype(event.card)=='equip1';
							}
							return event.cards.contains(card);
						},
						content:function(){
							if(trigger.name=='lose') trigger.cards.remove(player.getEquip(1));
							else trigger.cancel();
						},
					},
				},
			},
			ruyijingubang_skill:{
				equipSkill:true,
				enable:'phaseUse',
				usable:1,
				chooseButton:{
					dialog:function(){
						var dialog=ui.create.dialog(
							'如意金箍棒：选择变化攻击范围',
							[[
								[1,'　　　⒈【杀】无次数限制　　　'],
								[2,'　　　⒉【杀】的伤害值+1　　　'],
							],'tdnodes'],
							[[
								[3,'　　　⒊【杀】不可被响应　　　'],
								[4,'　　　⒋【杀】的目标数+1　　　'],
							],'tdnodes']
						);
						return dialog;
					},
					filter:function(button,player){
						return button.link!=player.storage.ruyijingubang_skill;
					},
					check:function(button){
						if(button.link==1||button.link==3) return 1;
						return 0;
					},
					backup:function(links,player){
						return {
							audio:'dcruyi',
							num:links[0],
							popup:'如意金箍棒',
							content:function(){
								var num=lib.skill.ruyijingubang_skill_backup.num;
								player.storage.ruyijingubang_skill=num;
								var card=player.getEquip(1);
								if(card&&card.name=='ruyijingubang'){
									card.storage.ruyijingubang_skill=num;
									game.log(player,'将',card,'的攻击范围改为'+num)
								}
								player.markSkill('ruyijingubang_skill');
							},
						}
					},
				},
				mod:{
					attackRange:function(player,range){
						if(player.storage.ruyijingubang_skill) return range-3+player.storage.ruyijingubang_skill;
					},
					cardUsable:function(card,player,num){
						if(player.storage.ruyijingubang_skill==1&&card.name=='sha') return Infinity;
					},
				},
				ai:{
					order:1,
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return player.storage.ruyijingubang_skill==3;
					},
					effect:{
						player:function(card,player,target,current){
							if(get.tag(card,'damage')>0&&player!=target){
								if(player.getStat('skill').ruyijingubang_skill&&player.storage.ruyijingubang_skill!=1) return;
								if(player.hasSkill('dccibei')&&!player.hasHistory('useSkill',function(evt){
									return evt.skill=='dccibei'&&evt.targets.contains(target);
								})){
									return [1,3];
								}
							}
						},
					},
					result:{
						player:function(player){
							if(player.storage.ruyijingubang_skill==1){
								if(!player.hasSha()) return 1;
								return 0;
							}
							else{
								if(player.hasSha()&&player.getCardUsable('sha')<=0) return 1;
								return 0;
							}
						},
					}
				},
				intro:{
					name:'如意金箍棒',
					content:function(storage){
						if(!storage) storage=3;
						return '<li>攻击范围：'+storage+'<br><li>'+['你使用【杀】无次数限制。','你使用的【杀】伤害+1。','你使用的【杀】不可被响应。','你使用【杀】选择目标后，可以增加一个额外目标。'][storage-1]
					},
				},
				subSkill:{
					backup:{},
				},
			},
			ruyijingubang_effect:{
				equipSkill:true,
				trigger:{player:'useCard2'},
				direct:true,
				locked:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					var num=player.storage.ruyijingubang_skill;
					if(!num||num==1) return false;
					if(num!=4) return true;
					var card=event.card;
					if(game.hasPlayer(function(current){
						return !event.targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&lib.filter.targetInRange(card,player,current);
					})){
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					var num=player.storage.ruyijingubang_skill;
					if(num==4){
						player.chooseTarget(get.prompt('ruyijingubang_effect'),'为'+get.translation(trigger.card)+'额外指定一个目标',function(card,player,target){
							return !_status.event.sourcex.contains(target)&&player.canUse(_status.event.card,target,false);
						}).set('sourcex',trigger.targets).set('ai',function(target){
							var player=_status.event.player;
							return get.effect(target,_status.event.card,player,player);
						}).set('card',trigger.card);
					}
					else{
						player.logSkill('ruyijingubang_effect');
						if(num==2){
							trigger.baseDamage++;
							game.log(trigger.card,'的伤害+1');
						}
						else if(num==3){
							trigger.directHit.addArray(game.filterPlayer());
							game.log(trigger.card,'不可被响应');
						}
						event.finish();
					}
					'step 1'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 2'
					player.logSkill('ruyijingubang_effect',event.targets);
					trigger.targets.addArray(event.targets);
				},
			},
			//涛神
			dcnutao:{
				audio:4,
				trigger:{player:'useCardToPlayer'},
				forced:true,
				group:'dcnutao_add',
				filter:function(event,player){
					if(get.type2(event.card)!='trick') return false;
					return event.isFirstTarget&&event.targets.some(i=>i!=player);
				},
				content:function(){
					var target=trigger.targets.filter(i=>i!=player).randomGet();
					player.line(target,'thunder');
					target.damage('thunder');
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(ui.selected.targets.length) return;
							if(player!=target&&get.type2(card)=='trick') return [1,0,1,-2];
						},
					},
				},
				subSkill:{
					add:{
						audio:'dcnutao',
						trigger:{source:'damageSource'},
						filter:function(event,player){
							return event.nature=='thunder'&&player.isPhaseUsing();
						},
						forced:true,
						content:function(){
							player.addTempSkill('dcnutao_sha','phaseUseAfter');
							player.addMark('dcnutao_sha',1,false);
						}
					},
					sha:{
						charlotte:true,
						onremove:true,
						marktext:'涛',
						intro:{
							content:'此阶段使用【杀】的次数上限+#',
						},
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('dcnutao_sha');
							},
						}
					}
				}
			},
			//铜雀台
			spduanzhi:{
				trigger:{target:'useCardToTargeted'},
				logTarget:'player',
				check:function(event,player){
					var target=event.player;
					if(get.attitude(player,target)>=-2||target.countCards('he',function(card){
						return get.value(card,target)>5;
					})<2) return false;
					if(player.hp>2) return true;
					if(player.hp==1){
						if(get.tag(event.card,'respondSha')){
							if(player.countCards('h',{name:'sha'})==0){
								return true;
							}
						}
						else if(get.tag(event.card,'respondShan')){
							if(player.countCards('h',{name:'shan'})==0){
								return true;
							}
						}
						else if(get.tag(event.card,'damage')){
							if(event.card.name=='shuiyanqijunx') return player.countCards('e')==0;
							return true;
						}
					}
					return false;
				},
				filter:function(event,player){
					return player!=event.player&&event.player.countDiscardableCards(player,'he')>0;
				},
				content:function(){
					player.discardPlayerCard(trigger.player,true,'he',[1,2]);
					player.loseHp();
				},
			},
			spduyi:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					event.card=get.cards()[0];
					game.cardsGotoOrdering(event.card);
					player.showCards(event.card);
					'step 1'
					player.chooseTarget('令一名角色获得'+get.translation(card),true).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(_status.event.du){
							if(target.hasSkillTag('nodu')) return 0;
							return -att;
						}
						if(att>0){
							if(target==player) att*=0.6;
							return att+Math.sqrt(Math.max(0,5-target.countCards('h')));
						}
						return att;
					}).set('du',card.name=='du');
					'step 2'
					if(result&&result.bool){
						var target=result.targets[0];
						target.gain(card,'gain2');
						if(get.color(card,false)=='black') target.addTempSkill('spduyi2');
					}
				},
				ai:{
					order:0.1,
					result:{
						player:1,
					},
				},
			},
			spduyi2:{
				mod:{
					cardEnabled2:function(card){
						if(get.position(card)=='h') return false;
					},
				},
				mark:true,
				intro:{
					content:'不能使用或打出手牌',
				},
			},
			spcangni:{
				audio:'zhuikong',
				trigger:{player:'phaseDiscardBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseDrawRecover('###'+get.prompt('spcangni')+'###摸两张牌或回复1点体力，然后将武将牌翻面',2).set('ai',function(){
						return 'cancel2';
					}).logSkill='spcangni';
					'step 1'
					if(result.control!='cancel2') player.turnOver();
				},
				group:['spcangni_gain','spcangni_lose'],
				subSkill:{
					gain:{
						audio:'zhuikong',
						trigger:{
							player:'gainAfter',
							global:'loseAsyncAfter',
						},
						usable:1,
						filter:function(event,player){
							return player.isTurnedOver()&&player!=_status.currentPhase&&event.getg(player).length>0;
						},
						check:function(event,player){
							return get.attitude(player,_status.currentPhase)>0;
						},
						logTarget:function(){
							return _status.currentPhase;
						},
						prompt2:'令该角色摸一张牌',
						content:function(){
							_status.currentPhase.draw();
						},
					},
					lose:{
						audio:'zhuikong',
						trigger:{
							player:'loseAfter',
							global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
						},
						filter:function(event,player){
							if(event.name=='gain'&&player==event.player) return false;
							var evt=event.getl(player);
							if(!evt||!evt.cards2||!evt.cards2.length) return false;
							return player.isTurnedOver()&&player!=_status.currentPhase&&_status.currentPhase.countCards('he')>0;
						},
						check:function(event,player){
							var target=_status.currentPhase;
							var att=get.attitude(player,target);
							if(target.countCards('e',function(card){
								return get.value(card,target)<=0;
							})) return att>0;
							return att<0;
						},
						logTarget:function(){
							return _status.currentPhase;
						},
						prompt2:'令该角色弃置一张牌',
						content:function(){
							_status.currentPhase.chooseToDiscard('he',true);
						},
					},
				},
			},
			spmixin:{
				audio:'qiuyuan',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0&&game.countPlayer()>2;
				},
				filterCard:true,
				filterTarget:lib.filter.notMe,
				position:'h',
				selectTarget:2,
				targetprompt:['拿牌打人','被打'],
				multitarget:true,
				delay:false,
				discard:false,
				lose:false,
				check:function(card){
					if(card.name=='sha') return 4;
					return 4-get.value(card);
				},
				content:function(){
					'step 0'
					player.give(cards,targets[0]);
					'step 1'
					if(!targets[0].isAlive()||!targets[1].isAlive()){
						event.finish();
						return;
					}
					targets[0].chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'密信：对'+get.translation(targets[1])+'使用一张【杀】，或令其观看并获得你的一张手牌').set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.targetEnabled.apply(this,arguments);
					}).set('sourcex',targets[1]);
					'step 2'
					if(!result.bool&&targets[0].countCards('h')) targets[1].gainPlayerCard(targets[0],'visible','h',true);
				},
				ai:{
					order:1,
					expose:0.1,
					result:{
						target:function(player,target){
							var card=ui.selected.cards[0];
							if(!card) return 0;
							if(ui.selected.targets.length==0){
								if(card.name=='sha'||target.hasSha()) return 2;
								if(get.value(card,target)<0) return -2;
								return 0;
							}
							var target1=ui.selected.targets[0];
							if((card.name=='sha'||target1.hasSha())&&get.effect(target,{name:'sha'},target1,target1)>0) return get.effect(target,{name:'sha'},target1,target);
							return 1.5;
						},
					},
				},
			},
			spfengyin:{
				audio:'moukui',
				trigger:{global:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&event.player.hp>=player.hp&&player.countCards('h',function(card){
						if(_status.connectMode) return true;
						return get.name(card,player)=='sha';
					})>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt('spfengyin',trigger.player),'交给该角色一张【杀】并令其跳过出牌阶段和弃牌阶段',function(card,player){
						return get.name(card,player)=='sha';
					}).set('ai',function(card){
						if(_status.event.goon) return 5-get.value(card);
						return 0;
					}).set('goon',function(){
						if(get.attitude(player,trigger.player)>=0) return false;
						if(trigger.player.countCards('hs')<trigger.player.hp) return false;
						return true;
					}());
					'step 1'
					if(result.bool){
						var target=trigger.player;
						player.logSkill('spfengyin',target);
						player.give(result.cards,target,'give');
						target.skip('phaseUse');
						target.skip('phaseDiscard');
					}
				},
			},
			spchizhong:{
				mod:{
					maxHandcardBase:function(player,num){
						return player.maxHp;
					},
				},
				trigger:{global:'dieAfter'},
				forced:true,
				content:function(){
					player.gainMaxHp();
				},
			},
			fenxin_old:{
				mode:['identity'],
				trigger:{source:'dieBegin'},
				init:function(player){
					player.storage.fenxin=false;
				},
				intro:{
					content:'limited'
				},
				skillAnimation:'epic',
				animationColor:'fire',
				unique:true,
				limited:true,
				audio:2,
				mark:true,
				filter:function(event,player){
					if(player.storage.fenxin) return false;
					return event.player.identity!='zhu'&&player.identity!='zhu'&&
						player.identity!='mingzhong'&&event.player.identity!='mingzhong';
				},
				check:function(event,player){
					if(player.identity==event.player.identity) return Math.random()<0.5;
					var stat=get.situation();
					switch(player.identity){
						case 'fan':
							if(stat<0) return false;
							if(stat==0) return Math.random()<0.6;
							return true;
						case 'zhong':
							if(stat>0) return false;
							if(stat==0) return Math.random()<0.6;
							return true;
						case 'nei':
							if(event.player.identity=='fan'&&stat<0) return true;
							if(event.player.identity=='zhong'&&stat>0) return true;
							if(stat==0) return Math.random()<0.7;
							return false;
					}
				},
				prompt:function(event,player){
					return '焚心：是否与'+get.translation(event.player)+'交换身份？';
				},
				content:function(){
					game.broadcastAll(function(player,target,shown){
						var identity=player.identity;
						player.identity=target.identity;
						if(shown||player==game.me){
							player.setIdentity();
						}
						target.identity=identity;
					},player,trigger.player,trigger.player.identityShown);
					player.line(trigger.player,'green');
					player.storage.fenxin=true;
					player.awakenSkill('fenxin_old');
				}
			},
		},
		characterIntro:{
			sunwukong:'孙悟空是中国古典小说《西游记》的主人公，也是中国神话中的民俗神祇之一，明代百回本《西游记》书中最为深入人心的形象之一。《西游记》中的孙悟空本是天地生成的一个石猴，率领群猴在花果山水帘洞过着逍遥自在的日子，后来为学习长生的法术而拜菩提祖师为师，学会了七十二变和筋斗云等绝技。后来他前往东海龙宫夺取如意金箍棒，又大闹地府勾了生死簿，惊动天庭，天庭两次派兵征讨花果山，仍然降他不得，只好请西天如来佛祖前来助阵。如来佛祖以五行山将悟空压在山下五百年。五百年后，悟空在观音菩萨的指点下拜唐僧为师，并跟随唐僧前往西天求取真经。路上唐僧又收了猪八戒、沙和尚两个徒弟，众人在途中斩妖除魔、历经磨难，终于取得真经，修成正果。',
			longwang:'东海龙王，名敖广，是中国古代神话传说中的龙族之王，为“四海龙王”之首，亦为所有水族之王。统治东海之洋，主宰着雨水、雷鸣、洪灾、海潮、海啸等。曾下陷东京、水淹陈塘关（影视设定）。在中国以东方为尊位，按周易来说东为阳，故此东海龙王排第一便是理所应当。常记载于《西游记》《封神演义》《三教搜神大全》等文学典籍。东海龙王居于东海的海底水晶宫（花果山瀑布顺流可直抵龙宫）。虽为司雨之神，但其保持着较大的特殊自由性，人间降雨由其它江河湖井龙王完成，很少需要东海龙王亲自降雨。海洋管辖之权为龙王所有，天庭一般任其自治。',
			taoshen:'涛神，是司掌钱塘江的神，传说其原型为春秋战国时期的吴国大臣伍子胥。伍子胥从楚国投奔吴国，为吴国立下了汗马功劳；但吴王夫差听信太宰伯嚭的谗言，逐渐疏远了伍子胥，最后还赐死了他。伍子胥含冤身亡，十分悲愤，做出了吴国灭亡的预言后自杀。暴怒的夫差下令用皮革包裹住伍子胥的尸身，在五月五日这天丢进钱塘江。百姓可怜伍子胥忠于吴王却遭受惨死，因此将五月五日这一天定为节日，以此纪念伍子胥，这也是端午节的来历之一。',
			libai:'李白（701年2月28日—762年12月），字太白，号青莲居士，祖籍陇西成纪（今甘肃省秦安县），出生于蜀郡绵州昌隆县（一说出生于西域碎叶）。唐朝伟大的浪漫主义诗人，凉武昭王李暠九世孙。<br>为人爽朗大方，乐于交友，爱好饮酒作诗，名列“酒中八仙”。曾经得到唐玄宗李隆基赏识，担任翰林学士，赐金放还，游历全国，先后迎娶宰相许圉师、宗楚客的孙女。唐肃宗即位后，卷入永王之乱，流放夜郎，辗转到达当涂县令李阳冰家。上元二年，去世，时年六十二。<br>著有《李太白集》，代表作有《望庐山瀑布》《行路难》《蜀道难》《将进酒》《早发白帝城》等。李白所作词赋，就其开创意义及艺术成就而言，享有极为崇高的地位，后世誉为“诗仙”，与诗圣杜甫并称“李杜”。',
			sunyang:'孙杨，1991年12月1日生于浙江杭州，男子1500米自由泳世界纪录保持者，男子400米自由泳奥运会纪录保持者。年伦敦奥运会男子400米自由泳、男子1500米自由泳冠军；2016年里约奥运会男子200米自由泳冠军。孙杨是世界泳坛历史上唯一一位男子200米自由泳、男子400米自由泳、男子1500米自由泳的奥运会世锦赛大满贯冠军得主，史上唯一一位男子400米自由泳世锦赛四连冠，唯一一位男子800米自由泳世锦赛三连冠，男子自由泳个人单项金牌数居世界第一。',
			yeshiwen:'叶诗文，1996年3月1日生于浙江省杭州市，中国女子游泳队运动员，女子200米混合泳奥运会纪录保持者。叶诗文是中国泳坛首位集奥运会、长池世锦赛、短池世锦赛、游泳世界杯、亚运会、全运会冠军于一身的运动员，成为中国泳坛首个金满贯。2010年广州亚运会女子200米和400米个人混合泳冠军。2011年上海世界游泳锦标赛女子200米混合泳冠军。2012年伦敦奥运会女子200米混合泳、400米混合泳冠军。2012年伊斯坦布尔短池世锦赛女子200米混合泳冠军。2013年辽宁全运会女子200米、400米混合泳冠军。2016年里约奥运会女子200米混合泳第八名。2017年天津全运会女子200米混合泳冠军。2019年光州世界游泳锦标赛女子200米混合泳亚军、女子400米混合泳亚军。2018年1月30日，当选为浙江省出席第十三届全国人民代表大会代表。2019年7月28日，2019年韩国光州游泳世锦赛，叶诗文以4分32秒07获得亚军。2021年9月19日，叶诗文获得第十四届全国运动会游泳女子4×200米混合泳接力金牌。9月22日，叶诗文获得全运会女子200米个人混合泳银牌。',
			jiben:'吉本（？—218年），东汉末年太医令。建安二十三年春正月，时金祎自以世为汉臣，睹汉祚将移，谓可季兴，乃喟然发愤，遂与太医令本、少府耿纪、司直韦晃、本子邈、邈弟穆等结谋攻许，杀曹公长史王必，南援刘备。后必营，必与典农中郎将严匡讨斩之。在《三国演义》中，吉本在此为吉平或吉太，因字称平，故又唤作吉平。曾参与董承等人刺杀曹操的计划，并企图在为曹操治病时毒死曹操，但被曹操识破而遭处刑。之后其子吉邈和吉穆都参与了由耿纪和韦晃等人所发动的反叛曹操的行动，但都失败被杀。',
			xiaoyuehankehan:'小约翰可汗，知乎答主，<style type="text/css">#xiaoyuehankehan_bilibili:link, #xiaoyuehankehan_bilibili:visited {color:white;}</style><a id="xiaoyuehankehan_bilibili" href="https://space.bilibili.com/23947287" target="_blank">bilibili知识区up主</a>，其视频以介绍冷门国家和名人为主，因其视频极具特色的幽默风格而知名。代表作包括《奇葩小国》系列和《硬核狠人》系列。昵称里的“小约翰”来源于《纸牌屋》里的主角弗朗西斯·厄克特的外号Little John。家乡在内蒙古通辽市，在《奇葩小国》系列视频中，介绍小国面积和人口时，常用通辽市的面积和人口作为计量单位，后简化为T。1T=6万平方公里或287万人（如：阿富汗面积约为64万平方公里，超过10T）。此梗成为该系列视频的特色之一，可汗也因此被称为“通辽可汗”。',
			zhutiexiong:'朱铁雄，福建莆田人，1994年出生，短视频创作者。中国魔法少年的英雄梦，国风变装的热血与浪漫。抖音年度高光时刻作者，国风变装现象级人物。创玩节期间化身三国杀武将，来一场热血变身！',
		},
		card:{
			ruyijingubang:{
				fullskin:true,
				derivation:'sunwukong',
				type:'equip',
				subtype:'equip1',
				skills:['ruyijingubang_skill','ruyijingubang_effect'],
				equipDelay:false,
				distance:{attackFrom:-2},
				onEquip:function(){
					if(!card.storage.ruyijingubang_skill) card.storage.ruyijingubang_skill=3;
					player.storage.ruyijingubang_skill=card.storage.ruyijingubang_skill;
					player.markSkill('ruyijingubang_skill');
				},
			},
		},
		translate:{
			old_lingju:'SP灵雎',
			fenxin_old:'焚心',
			fenxin_old_info:'限定技，当你杀死一名非主公角色时，你可以与其交换未翻开的身份牌。（你的身份为主公时不能发动此技能）',
			sp_fuwan:'SP伏完',
			spfengyin:'奉印',
			spfengyin_info:'其他角色的回合开始时，若其体力值不少于你，你可以交给其一张【杀】，令其跳过出牌阶段和弃牌阶段。',
			spchizhong:'持重',
			spchizhong_info:'锁定技，你的手牌上限等于体力上限；其他角色死亡时，你加1点体力上限。',
			sp_fuhuanghou:'SP伏寿',
			spcangni:'藏匿',
			spcangni_info:'弃牌阶段开始时，你可以回复1点体力或摸两张牌，然后将你的武将牌翻面；其他角色的回合内，当你获得（每回合限一次）/失去一次牌时，若你的武将牌背面朝上，你可以令该角色摸/弃置一张牌。',
			spmixin:'密信',
			spmixin_info:'出牌阶段限一次，你可以将一张手牌交给一名其他角色，该角色须对你选择的另一名角色使用一张无距离限制的【杀】，否则你选择的角色观看其手牌并获得其中一张。',
			sp_jiben:'SP吉本',
			spduanzhi:'断指',
			spduanzhi_info:'当你成为其他角色使用的牌的目标后，你可以弃置其至多两张牌，然后失去1点体力。',
			spduyi:'毒医',
			spduyi2:'毒医',
			spduyi_info:'出牌阶段限一次，你可以亮出牌堆顶的一张牌并交给一名角色，若此牌为黑色，该角色不能使用或打出手牌，直到回到结束。',
			sp_mushun:'SP穆顺',
			libai:'李白',
			dclbjiuxian:'酒仙',
			dclbjiuxian_info:'①你可以将额定目标数大于1的锦囊牌当做【酒】使用。②你使用【酒】无次数限制。',
			dcshixian:'诗仙',
			dcshixian_info:'当你使用一张牌时，若此牌的牌名与你于本局游戏使用的上一张牌的牌名押韵，则你可以摸一张牌，并令此牌额外结算一次。',
			taoshen:'涛神',
			dcnutao:'怒涛',
			dcnutao_info:'锁定技。①当你使用锦囊牌指定第一个目标时，若目标角色包含其他角色，你随机对其中一名其他目标角色造成1点雷电伤害。②当你于出牌阶段造成雷电伤害后，你于此阶段使用【杀】的次数上限+1。',
			sunwukong:'孙悟空',
			dcjinjing:'金睛',
			dcjinjing_info:'锁定技。其他角色的手牌对你可见。',
			dccibei:'慈悲',
			dccibei_info:'每回合每名角色限一次。当你对其他角色造成伤害时，你可以防止此伤害，然后摸五张牌。',
			dcruyi:'如意',
			dcruyi_info:'锁定技。①游戏开始时，你将【如意金箍棒】置入装备区。②你手牌区内的武器牌均视为【杀】，且你不是武器牌的合法目标。③当你即将失去【如意金箍棒】或即将废除武器栏时，取消之。④你不能将装备区内的【如意金箍棒】当做其他牌使用或打出。',
			ruyijingubang:'如意金箍棒',
			ruyijingubang_skill:'如意',
			ruyijingubang_skill:'如意金箍棒',
			ruyijingubang_effect:'如意金箍棒',
			ruyijingubang_info:'出牌阶段限一次。你可以将此牌的实际攻击范围调整为1~4内的任意整数。你根据此牌的实际攻击范围拥有对应的效果：<br><li>⑴你使用【杀】无次数限制。<br><li>⑵你使用的【杀】伤害+1。<br><li>⑶你使用的【杀】不可被响应。<br><li>⑷你使用【杀】选择目标后，可以增加一个额外目标。',
			longwang:'龙王',
			dclonggong:'龙宫',
			dclonggong_info:'每回合限一次。当你受到伤害时，你可以防止此伤害，然后令伤害来源从牌堆中获得一张装备牌。',
			dcsitian:'司天',
			dcsitian_info:'出牌阶段，你可以弃置两张颜色不同的手牌。系统从所有天气中随机选择两个，你观看这些天气并选择一个执行。<br><li>烈日：你对其他角色依次造成1点火属性伤害。<br><li>雷电：你令其他角色各进行一次判定。若结果为♠2~9，则其受到3点无来源雷属性伤害。<br><li>大浪：你弃置其他角色装备区内的所有牌（装备区内没有牌的角色改为失去1点体力）。<br><li>暴雨：你弃置一名角色的所有手牌。若其没有手牌，则改为令其失去1点体力。<br><li>大雾：你令所有其他角色获得如下效果：当其使用下一张锦囊牌时，取消之。',
			sunyang:'孙杨',
			clbshuijian:'水箭',
			clbshuijian_info:'摸牌阶段开始时，你可以令额定摸牌数+X（X为你装备区内牌数的一半+1，且向下取整）',
			yeshiwen:'叶诗文',
			clbjisu:'急速',
			clbjisu_info:'判定阶段开始前，你可以跳过本回合的判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】。',
			clbshuiyong:'水泳',
			clbshuiyong_info:'锁定技。当你受到火属性伤害时，取消之。',
			xiaoyuehankehan:'小约翰可汗',
			dctongliao:'通辽',
			dctongliao_info:'①摸牌阶段结束时，你可以选择一张点数最小的手牌，将此牌标记为“通辽”。②当你失去一张具有“通辽”标签的牌时，你摸X张牌（X为此牌点数）。',
			dcwudao:'悟道',
			dcwudao_info:'当你使用牌结算结束后，若你使用的上一张牌与此牌类型相同，则你可以于本回合内获得如下效果：当你于回合内使用该类型的牌时，你令此牌不可被响应且伤害值基数+1。',
			zhutiexiong:'朱铁雄',
			wu_zhutiexiong:'朱铁雄',
			dcbianzhuang:'变装',
			dcbianzhuang_info:'①出牌阶段限一次，你可以从系统随机选择的两个技能中获得一个，并视为使用一张【杀】（无距离次数限制），然后失去以此法获得的技能。②当你使用装备牌后，你清空此技能的发动次数记录。③当你发动〖变装①〗后，若你发动〖变装①〗的次数大于2，则你将武将牌变更为诸葛亮，并将系统选择的技能数改为三个。',
			
			collab_olympic:'OL·伦敦奥运会',
			collab_tongque:'OL·铜雀台',
			collab_duanwu:'新服·端午畅玩',
			collab_decade:'新服·创玩节',
		},
	};
});
