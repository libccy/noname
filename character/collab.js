'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'collab',
		connect:true,
		character:{
			libai:['male','qun',2,['dclbjiuxian','dcshixian']],
			sunwukong:['male','qun',3,['dcjinjing','dccibei','dcruyi']],
			longwang:['male','qun',3,['dclonggong','dcsitian']],
			taoshen:['male','qun',3,['dcnutao']],
			sunyang:['male','wu',4,['clbshuijian']],
			yeshiwen:['female','wu',3,['clbjisu','clbshuiyong']],
		},
		skill:{
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
				mod:{
					cardUsable:function(card){
						if(card.name=='jiu') return Infinity;
					},
				},
			},
			dcshixian:{
				audio:2,
				trigger:{player:'useCard'},
				frequent:true,
				direct:true,
				filter:function(event,player){
					var history=player.getHistory('useCard'),index=history.indexOf(event);
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
				content:function(){
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
		},
		characterIntro:{
			sunwukong:'孙悟空是中国古典小说《西游记》的主人公，也是中国神话中的民俗神祇之一，明代百回本《西游记》书中最为深入人心的形象之一。《西游记》中的孙悟空本是天地生成的一个石猴，率领群猴在花果山水帘洞过着逍遥自在的日子，后来为学习长生的法术而拜菩提祖师为师，学会了七十二变和筋斗云等绝技。后来他前往东海龙宫夺取如意金箍棒，又大闹地府勾了生死簿，惊动天庭，天庭两次派兵征讨花果山，仍然降他不得，只好请西天如来佛祖前来助阵。如来佛祖以五行山将悟空压在山下五百年。五百年后，悟空在观音菩萨的指点下拜唐僧为师，并跟随唐僧前往西天求取真经。路上唐僧又收了猪八戒、沙和尚两个徒弟，众人在途中斩妖除魔、历经磨难，终于取得真经，修成正果。',
			longwang:'东海龙王，名敖广，是中国古代神话传说中的龙族之王，为“四海龙王”之首，亦为所有水族之王。统治东海之洋，主宰着雨水、雷鸣、洪灾、海潮、海啸等。曾下陷东京、水淹陈塘关（影视设定）。在中国以东方为尊位，按周易来说东为阳，故此东海龙王排第一便是理所应当。常记载于《西游记》《封神演义》《三教搜神大全》等文学典籍。东海龙王居于东海的海底水晶宫（花果山瀑布顺流可直抵龙宫）。虽为司雨之神，但其保持着较大的特殊自由性，人间降雨由其它江河湖井龙王完成，很少需要东海龙王亲自降雨。海洋管辖之权为龙王所有，天庭一般任其自治。',
			taoshen:'涛神，是司掌钱塘江的神，传说其原型为春秋战国时期的吴国大臣伍子胥。伍子胥从楚国投奔吴国，为吴国立下了汗马功劳；但吴王夫差听信太宰伯嚭的谗言，逐渐疏远了伍子胥，最后还赐死了他。伍子胥含冤身亡，十分悲愤，做出了吴国灭亡的预言后自杀。暴怒的夫差下令用皮革包裹住伍子胥的尸身，在五月五日这天丢进钱塘江。百姓可怜伍子胥忠于吴王却遭受惨死，因此将五月五日这一天定为节日，以此纪念伍子胥，这也是端午节的来历之一。',
			libai:'李白（701年2月28日—762年12月），字太白，号青莲居士，祖籍陇西成纪（今甘肃省秦安县），出生于蜀郡绵州昌隆县（一说出生于西域碎叶）。唐朝伟大的浪漫主义诗人，凉武昭王李暠九世孙。<br>为人爽朗大方，乐于交友，爱好饮酒作诗，名列“酒中八仙”。曾经得到唐玄宗李隆基赏识，担任翰林学士，赐金放还，游历全国，先后迎娶宰相许圉师、宗楚客的孙女。唐肃宗即位后，卷入永王之乱，流放夜郎，辗转到达当涂县令李阳冰家。上元二年，去世，时年六十二。<br>著有《李太白集》，代表作有《望庐山瀑布》《行路难》《蜀道难》《将进酒》《早发白帝城》等。李白所作词赋，就其开创意义及艺术成就而言，享有极为崇高的地位，后世誉为“诗仙”，与诗圣杜甫并称“李杜”。',
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
			libai:'李白',
			dclbjiuxian:'酒仙',
			dclbjiuxian_info:'①你可以将额定目标数大于1的锦囊牌当做【酒】使用。②你使用【酒】无次数限制。',
			dcshixian:'诗仙',
			dcshixian_info:'当你使用一张牌时，若此牌的牌名与你本回合使用的上一张牌的牌名押韵，则你可以选择一项：⒈摸一张牌。⒉令此牌额外结算一次。',
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
		},
	};
});
