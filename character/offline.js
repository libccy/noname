'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'offline',
		connect:true,
		characterSort:{
			offline:{
				offline_star:["sp_xiahoushi","jsp_zhaoyun","huangjinleishi","sp_pangtong","sp_daqiao","sp_ganning","sp_xiahoudun","sp_lvmeng","sp_zhangfei","sp_liubei"],
				offline_sticker:['sp_gongsunzan','sp_simazhao','sp_wangyuanji','sp_xinxianying','sp_liuxie'],
				offline_luanwu:["ns_lijue","ns_zhangji","ns_fanchou"],
				offline_yongjian:["ns_chendao","yj_caoang","yj_caocao"],
				offline_others:["ns_jiaxu","ns_caoanmin","jsp_liubei","longyufei"],
			},
		},
		character:{
			yj_caocao:['male','qun',4,['yjxiandao','yjsancai','yjyibing']],
			longyufei:['female','shu',3,['longyi','zhenjue']],
			sp_liubei:['male','shu',4,['zhaolie','shichou'],['zhu']],
			sp_zhangfei:['male','shu',4,['jie','dahe']],
			sp_lvmeng:['male','wu',3,['tanhu','mouduan']],
			sp_xiahoudun:['male','wei',4,['fenyong','xuehen'],['die_audio']],
			sp_ganning:['male','qun',4,['yinling','junwei']],
			sp_daqiao:['female','wu',3,['yanxiao','anxian']],
			sp_pangtong:['male','qun',3,['xinmanjuan','zuixiang']],
			huangjinleishi:['female','qun',3,['fulu','fuji']],
			jsp_zhaoyun:['male','qun',3,['chixin','reyicong','suiren']],
			sp_xiahoushi:["female","shu",3,["xinfu_yanyu","xinfu_xiaode"]],
			sp_gongsunzan:['male','qun',4,['spyicong','sptuji']],
			sp_simazhao:['male','wei',3,['spzhaoxin','splanggu']],
			sp_wangyuanji:['female','wei',3,['spfuluan','spshude']],
			sp_xinxianying:['female','wei',3,['spmingjian','spyinzhi']],
			sp_liuxie:['male','qun',3,['sphuangen','sphantong']],
			ns_lijue:['male','qun','4/6',['nsfeixiong','nscesuan']],
			ns_zhangji:['male','qun',4,['nslulve']],
			ns_fanchou:['male','qun',4,['nsyangwu']],
			ns_jiaxu:['male','qun',3,['nsyice','luanwu']],
			ns_chendao:['male','shu',4,['nsjianglie']],
			yj_caoang:['male','wei',4,['yjxuepin']],
			ns_caoanmin:['male','wei',4,['nskuishe']],
			jsp_liubei:['male','qun',4,['jsprende']],
		},
		characterIntro:{
			huangjinleishi:"黄巾军中负责施法的女祭司二人组。",
			longyufei:'《三国杀·阵面对决》中的虚构角色，设定是由刘备之女夏侯岚、关羽之女关银屏、张飞之女张星彩三人在与吕布之魔魂战斗时，释放雅典娜的惊叹而召唤出来的精元化神。',
		},
		perfectPair:{},
		card:{
			yanxiao_card:{
				type:'delay',
				judge:function(card){
					return 0;
				},
				effect:function(){},
				ai:{
					basic:{
						order:1,
						useful:1,
						value:8,
					},
					result:{
						target:1
					},
				}
			},
		},
		skill:{
			//群曹操
			yjxiandao:{
				trigger:{player:'_yongjian_zengyuEnd'},
				usable:1,
				forced:true,
				locked:false,
				filter:function(event,player){
					return !event._zengyu_denied&&event.target.isIn();
				},
				logTarget:'target',
				content:function(){
					'step 0'
					event.target=trigger.target;
					event.card=trigger.cards[0];
					event.target.markAuto('yjxiandao',[get.suit(event.card,false)])
					event.target.addTempSkill('yjxiandao_block');
					'step 1'
					var type=get.type(card,false);
					if(type=='trick') player.draw(2);
					if(type=='equip'){
						if(target.countGainableCards(player,'he',function(cardx){
							return cardx!=card;
						})>0) player.gainPlayerCard(target,'he',true).set('card',card).set('filterButton',function(button){
							return button.link!=_status.event.card;
						});
						if(get.subtype(card,false)=='equip1') target.damage();
					}
				},
				subSkill:{
					block:{
						charlotte:true,
						onremove:true,
						mod:{
							cardEnabled:function(card,player){
								if(player.getStorage('yjxiandao_block').contains(get.suit(card))) return false;
							},
							cardRespondable:function(card,player){
								if(player.getStorage('yjxiandao_block').contains(get.suit(card))) return false;
							},
							cardSavable:function(card,player){
								if(player.getStorage('yjxiandao_block').contains(get.suit(card))) return false;
							},
						},
						mark:true,
						intro:{content:'不能使用或打出$牌'},
					},
				},
			},
			yjsancai:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.showHandcards();
					var hs=player.getCards('h');
					if(hs.length>1){
						var type=get.type2(hs[0],player);
						for(var i=1;i<hs.length;i++){
							if(get.type(hs[i])!=type){
								event.finish();
								return;
							}
						}
					}
					'step 1'
					player.chooseCardTarget({
						prompt:'是否赠予一张手牌？',
						filterCard:true,
						filterTarget:lib.filter.notMe,
					});
					'step 2'
					if(result.bool){
						player.line(result.targets[0],'green');
						var next=game.createEvent('_yongjian_zengyu');
						next.player=player;
						next.target=result.targets[0];
						next.cards=result.cards;
						next.setContent(lib.skill._yongjian_zengyu.content);
					}
				},
			},
			yjyibing:{
				trigger:{player:'gainAfter'},
				direct:true,
				filter:function(event,player){
					if(event.getParent().name=='_yongjian_zengyu') return false;
					var evt=event.getParent('phaseDraw'),hs=player.getCards('h');
					return (!evt||evt.player!=player)&&event.cards.filter(function(card){
						return hs.contains(card)&&game.checkMod(card,player,'unchanged','cardEnabled2',player)!==false;
					}).length==event.cards.length&&player.hasUseTarget({
						name:'sha',
						cards:event.cards,
					},false);
				},
				content:function(){
					player.chooseUseTarget(get.prompt('yjyibing'),'将'+get.translation(trigger.cards)+'当做【杀】使用','sha',trigger.cards,false,'nodistance').logSkill='yjyibing';
				},
			},
			//龙羽飞
			longyi:{
				enable:['chooseToUse','chooseToRespond'],
				filter:function(event,player){
					if(event.type=='wuxie') return false;
					var hs=player.getCards('h');
					if(!hs.length) return false;
					for(var i of hs){
						if(game.checkMod(i,player,'unchanged','cardEnabled2',player)===false) return false;
					}
					for(var i of lib.inpile){
						if(i!='du'&&get.type(i)=='basic'&&event.filterCard({name:i,cards:hs},player,event)) return true;
						if(i=='sha'){
							var list=['fire','thunder','ice'];
							for(var j of list){
								if(event.filterCard({name:i,nature:j,cards:hs},player,event)) return true;
							}
						}
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var vcards=[],hs=player.getCards('h');
						for(var i of lib.inpile){
							if(i!='du'&&get.type(i)=='basic'&&event.filterCard({name:i,cards:hs},player,event)) vcards.push(['基本','',i]);
							if(i=='sha'){
								for(var j of lib.inpile_nature){
									if(event.filterCard({name:i,nature:j,cards:hs},player,event)) vcards.push(['基本','',i,j]);
								}
							}
						}
						return ui.create.dialog('龙裔',[vcards,'vcard']);
					},
					check:function(button,player){
						if(_status.event.getParent().type!='phase') return 1;
						return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
					},
					backup:function(links,player){
						return {
							audio:'longyi',
							popname:true,
							viewAs:{name:links[0][2],nature:links[0][3]},
							filterCard:true,
							selectCard:-1,
							position:'h',
						}
					},
					prompt:function(links,player){
						return '将所有手牌当做'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用或打出';
					}
				},
				hiddenCard:function(player,name){
					return name!='du'&&get.type(name)=='basic'&&player.countCards('h')>0;
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player){
						return player.countCards('h')>0;
					},
					order:0.5,
					result:{
						player:function(player){
							if(_status.event.dying){
								return get.attitude(player,_status.event.dying);
							}
							if(_status.event.type=='respondShan') return 1;
							var val=0,hs=player.getCards('h'),max=0;
							for(var i of hs){
								val+=get.value(i,player);
								if(get.type(i,player)=='trick') max+=5;
							}
							if(player.hasSkill('zhenjue')) max+=7;
							return val<=max?1:0;
						},
					},
				},
				group:'longyi_effect',
				subSkill:{
					effect:{
						trigger:{player:['useCard','respond']},
						forced:true,
						charlotte:true,
						popup:false,
						filter:function(event,player){
							if(event.skill!='longyi_backup') return false;
							for(var i of event.cards){
								var type=get.type2(i,player);
								if(type=='equip'||type=='trick') return true;
							}
							return false;
						},
						content:function(){
							var map={};
							for(var i of trigger.cards){
								map[get.type2(i,player)]=true;
							}
							if(map.trick) player.draw();
							if(map.equip&&trigger.directHit) trigger.directHit.addArray(game.players);
						},
					},
					backup:{},
				},
			},
			zhenjue:{
				trigger:{global:'phaseJieshuBegin'},
				filter:function(event,player){
					return player.countCards('h')==0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					trigger.player.chooseToDiscard('he','弃置一张牌，或令'+get.translation(player)+'摸一张牌').set('ai',function(card){
						if(_status.event.goon) return 7-get.value(card);
						return -get.value(card);
					}).set('goon',get.attitude(trigger.player,player)<0);
					'step 1'
					if(!result.bool) player.draw();
				},
			},
			//群刘备
			jsprende:{
				audio:'rerende',
				enable:'phaseUse',
				filterCard:true,
				selectCard:[1,Infinity],
				discard:false,
				lose:false,
				delay:false,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				onremove:true,
				check:function(card){
					if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
					if(!ui.selected.cards.length&&card.name=='du') return 20;
					var player=get.owner(card);
					if(ui.selected.cards.length>=Math.max(2,player.countCards('h')-player.hp)) return 0;
					if(player.hp==player.maxHp||player.storage.jsprende<0||player.countCards('h')<=1){
						var players=game.filterPlayer();
						for(var i=0;i<players.length;i++){
							if(players[i].hasSkill('haoshi')&&
								!players[i].isTurnedOver()&&
								!players[i].hasJudge('lebu')&&
								get.attitude(player,players[i])>=3&&
								get.attitude(players[i],player)>=3){
								return 11-get.value(card);
							}
						}
						if(player.countCards('h')>player.hp) return 10-get.value(card);
						if(player.countCards('h')>2) return 6-get.value(card);
						return -1;
					}
					return 10-get.value(card);
				},
				content:function(){
					'step 0'
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'&&!evt.jsprende){
						var next=game.createEvent('jsprende_clear');
						_status.event.next.remove(next);
						evt.after.push(next);
						evt.jsprende=true;
						next.player=player;
						next.setContent(function(){
							delete player.storage.jsprende;
						});
					}
					target.gain(cards,player,'giveAuto');
					if(typeof player.storage.jsprende!='number'){
						player.storage.jsprende=0;
					}
					if(player.storage.jsprende>=0){
						player.storage.jsprende+=cards.length;
						if(player.storage.jsprende>=2){
							var list=[];
							if(lib.filter.cardUsable({name:'sha'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('sha',current);
							})){
								list.push(['基本','','sha']);
							}
							for(var i of lib.inpile_nature){
							 if(lib.filter.cardUsable({name:'sha',nature:i},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
										return player.canUse({name:'sha',nature:i},current);
									})){
									list.push(['基本','','sha',i]);
								}
							}
							if(lib.filter.cardUsable({name:'tao'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('tao',current);
							})){
								list.push(['基本','','tao']);
							}
							if(lib.filter.cardUsable({name:'jiu'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('jiu',current);
							})){
								list.push(['基本','','jiu']);
							}
							if(list.length){
								player.chooseButton(['是否视为使用一张基本牌？',[list,'vcard']]).set('ai',function(button){
									var player=_status.event.player;
									var card={name:button.link[2],nature:button.link[3]};
									if(card.name=='tao'){
										if(player.hp==1||(player.hp==2&&!player.hasShan())||player.needsToDiscard()){
											return 5;
										}
										return 1;
									}
									if(card.name=='sha'){
										if(game.hasPlayer(function(current){
											return player.canUse(card,current)&&get.effect(current,card,player,player)>0
										})){
											if(card.nature=='fire') return 2.95;
											if(card.nature=='thunder'||card.nature=='ice') return 2.92;
											return 2.9;
										}
										return 0;
									}
									if(card.name=='jiu'){
										return 0.5;
									}
									return 0;
								});
							}
							else{
								event.finish();
							}
							player.storage.jsprende=-1;
						}
						else{
							event.finish();
						}
					}
					else{
						event.finish();
					}
					'step 1'
					if(result&&result.bool&&result.links[0]){
						var card={name:result.links[0][2],nature:result.links[0][3]};
						player.chooseUseTarget(card,true);
					}
				},
				ai:{
					fireAttack:true,
					order:function(skill,player){
						if(player.hp<player.maxHp&&player.storage.jsprende<2&&player.countCards('h')>1){
							return 10;
						}
						return 4;
					},
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if(target.hasJudge('lebu')) return 0;
							var nh=target.countCards('h');
							var np=player.countCards('h');
							if(player.hp==player.maxHp||player.storage.jsprende<0||player.countCards('h')<=1){
								if(nh>=np-1&&np<=player.hp&&!target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1,5-nh);
						}
					},
					effect:{
						target:function(card,player,target){
							if(player==target&&get.type(card)=='equip'){
								if(player.countCards('e',{subtype:get.subtype(card)})){
									if(game.hasPlayer(function(current){
										return current!=player&&get.attitude(player,current)>0;
									})){
										return 0;
									}
								}
							}
						}
					},
					threaten:0.8
				}
			},
			//曹安民
			nskuishe:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.choosePlayerCard(target,'he',true).set('ai',get.buttonValue);
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						event.card=card;
						player.chooseTarget('将'+get.translation(target)+'的'+(get.position(card)=='h'&&!player.hasSkillTag('viewHandcard',null,target,true)?'手牌':get.translation(card))+'交给一名角色',true,function(target){
							return target!=_status.event.getParent().target;
						}).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du){
								if(target.hasSkillTag('nodu')) return 0;
								return -att;
							}
							if(target.hasSkillTag('nogain')) return 0.1;
							if(att>0){
								return att+Math.max(0,5-target.countCards('h'));
							}
							return att;
						}).set('du',event.card.name=='du');
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var target2=result.targets[0];
						target.line(target2,'green');
						target2.gain(target,card,'giveAuto','bySelf');
					}
					else event.finish();
					'step 3'
					target.chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'是否对'+get.translation(player)+'使用一张杀？').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.filterTarget.apply(this,arguments);
					}).set('sourcex',player);
				},
				ai:{
					order:6,
					expose:0.2,
					result:{
						target:-1.5,
						player:function(player,target){
							if(!target.canUse('sha',player)) return 0;
							if(target.countCards('h')==1) return 0.1;
							if(player.hasShan()) return -0.5;
							if(player.hp<=1) return -2;
							if(player.hp<=2) return -1;
							return 0;
						}
					},
				},
			},
			//文和乱武
			nsyangwu:{
				enable:'phaseUse',
				usable:1,
				filterCard:{suit:'heart'},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>player.countCards('h');
				},
				filter:function(event,player){
					var info=lib.skill.nsyangwu;
					return player.countCards('h',info.filterCard)&&game.hasPlayer(function(target){
						return info.filterTarget(null,player,target);
					});
				},
				check:function(card){
					var num=0;
					var player=_status.event.player;
					game.countPlayer(function(current){
						if(current!=player&&get.attitude(player,current)<0) num=Math.max(num,current.countCards('h')-player.countCards('h'));
					});
					return Math.ceil((num+1)/2)*2+4-get.value(card);
				},
				content:function(){
					var num=Math.ceil((target.countCards('h')-player.countCards('h'))/2);
					if(num) player.gainPlayerCard(target,true,'h',num,'visible');
				},
				ai:{
					order:4,
					result:{
						target:function(player,target){
							return player.countCards('h')-target.countCards('h');
						},
					},
				},
			},
			nslulve:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.countCards('e')>0&&current.countCards('e')<=player.countCards('he');
					});
				},
				filterCard:function(){
					if(ui.selected.targets.length) return false;
					return true;
				},
				position:'he',
				selectCard:[1,Infinity],
				complexSelect:true,
				complexCard:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('e')>0&&ui.selected.cards.length==target.countCards('e');
				},
				check:function(card){
					var player=_status.event.player;
					if(game.hasPlayer(function(current){
						return current!=player&&current.countCards('e')>0&&ui.selected.cards.length==current.countCards('e')&&get.damageEffect(current,player,player)>0;
					})) return 0;
					switch(ui.selected.cards.length){
						case 0:return 8-get.value(card);
						case 1:return 6-get.value(card);
						case 2:return 3-get.value(card);
						default:return 0;
					}
				},
				content:function(){
					target.damage('nocard');
				},
				ai:{
					damage:true,
					order:2,
					result:{
						target:function(player,target){
							return get.damageEffect(target,player);
						}
					},
					expose:0.3
				}
			},
			nsfeixiong:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0&&game.hasPlayer(function(current){
						return current!=player&&player.canCompare(current);
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('nsfeixiong'),function(card,player,target){
						return player!=target&&player.canCompare(target);
					}).set('ai',function(target){
						var player=_status.event.player;
						var hs=player.getCards('h').sort(function(a,b){
							return b.number-a.number;
						});
						var ts=target.getCards('h').sort(function(a,b){
							return b.number-a.number;
						});
						if(!hs.length||!ts.length) return 0;
						if(hs[0].number>ts[0].number) return get.damageEffect(target,player,player);
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('nsfeixiong',target);
						player.chooseToCompare(target);
					}
					else event.finish();
					'step 2'
					if(!result.tie){
						var targets=[player,target];
						if(result.bool) targets.reverse();
						targets[0].damage(targets[1]);
					}
				},
			},
			nscesuan:{
				trigger:{player:'damageBegin3'},
				forced:true,
				content:function(){
					'step 0'
					trigger.cancel();
					event.lose=player.loseMaxHp();
					'step 1'
					if(event.lose&&event.lose.loseHp) player.draw();
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
				},
			},
			//S贾诩
			nsyice:{
				trigger:{
					player:'loseAfter',
					global:'cardsDiscardAfter',
				},
				filter:function(event,player){
					if(event.name=='lose'){
						if(event.type!='discard') return false;
					}
					else{
						var evt=event.getParent();
						if(evt.name!='orderingDiscard'||!evt.relatedEvent||evt.relatedEvent.player!=player||!['useCard','respond'].contains(evt.relatedEvent.name)) return false;
					}
					return (event.cards2||event.cards).filterInD('d').length>0;
				},
				forced:true,
				content:function(){
					'step 0'
					var evt=trigger.getParent().relatedEvent;
					if((trigger.name=='discard'&&!trigger.delay)||evt&&evt.name=='respond') game.delayx();
					'step 1'
					var cards=(trigger.cards2||trigger.cards).filterInD('d');
					player.$gain2(cards);
					if(cards.length==1) event._result={bool:true,links:cards};
					else{
						var dialog=['遗策：选择要放置的卡牌','<div class="text center">（从左到右为从旧到新，后选择的后置入）</div>',cards];
						var cards2=player.getStorage('nsyice');
						if(cards2.length){
							dialog.push('<div class="text center">原有“策”</div>');
							dialog.push(cards2);
						}
						player.chooseButton(dialog,true,cards.length).set('filterButton',function(button){
							return _status.event.cards.contains(button.link);
						}).set('cards',cards);
					}
					'step 2'
					game.cardsGotoSpecial(result.links);
					player.markAuto('nsyice',result.links);
					game.delayx();
					'step 3'
					var storage=player.storage.nsyice;
					var bool=false;
					for(var i=0;i<storage.length;i++){
						for(var j=storage.length-1;j>i;j--){
							if(get.number(storage[i])==get.number(storage[j])){
								bool=true;
								break;
							}
						}
						if(bool) break;
					}
					if(bool){
						event.cards=storage.slice(0);
						event.cards=storage.splice(i,j-i+1);
						player.unmarkAuto('nsyice',event.cards);
					}
					else event.finish();
					'step 4'
					var cardsx=[];
					cardsx.push(cards.shift());
					cardsx.push(cards.pop());
					if(cards.length) player.gain(cards,'gain2');
					event.cards=cardsx;
					'step 5'
					player.chooseButton(['将一张牌置于牌堆顶，将另一张牌置于牌堆底',cards],true);
					'step 6'
					ui.cardPile.insertBefore(result.links[0].fix(),ui.cardPile.firstChild);
					cards.remove(result.links[0]);
					ui.cardPile.appendChild(cards[0].fix());
					game.updateRoundNumber();
					if(_status.dying.length) event.finish();
					'step 7'
					player.chooseTarget('对一名角色造成1点伤害',true).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 8'
					if(result.bool){
						var target=result.targets[0];
						player.line(target);
						target.damage('nocard');
					}
				},
				marktext:'策',
				intro:{content:'cards'},
			},
			//用间篇
			yjxuepin:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(event,player,target){
					return player.inRange(target)&&target.countDiscardableCards(player,'he')>0;
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					if(target.countDiscardableCards(player,'he')>0) player.discardPlayerCard(target,2,'he',true);
					else event.finish();
					'step 2'
					if(result.bool&&result.cards.length==2&&get.type2(result.cards[0],result.cards[0].original=='h'?target:false)==get.type2(result.cards[1],result.cards[1].original=='h'?target:false)) player.recover();
				},
				ai:{
					order:4,
					result:{
						player:function(player,target){
							if(player.hp==1) return -8;
							if(target.countCards('e')>1) return 0;
							if(player.hp>2||target.countCards('h')>1) return -0.5;
							return -2;
						},
						target:function(player,target){
							if(target.countDiscardableCards(player,'he')<2) return 0;
							return -2;
						},
					},
				},
			},
			nsjianglie:{
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.countCards('h')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				logTarget:'target',
				content:function(){
					'step 0'
					trigger.target.showHandcards();
					'step 1'
					var cards=trigger.target.getCards('h');
					var list=[];
					for(var i=0;i<cards.length;i++){
						list.add(get.color(cards[i]));
					}
					if(list.length==1) event._result={control:list[0]};
					else{
						list.sort();
						trigger.target.chooseControl(list).set('prompt','选择弃置一种颜色的所有手牌').set('ai',function(){
							var player=_status.event.player;
							if(get.value(player.getCards('h',{color:'red'}))>=get.value(player.getCards('h',{color:'black'}))) return 'black';
							return 'red';
						});
					}
					'step 2'
					trigger.target.discard(trigger.target.getCards('h',{color:result.control}));
				},
			},
			//桌游志贴纸
			spyinzhi:{
				trigger:{player:'damageEnd'},
				frequent:true,
				content:function(){
					'step 0'
					event.count=trigger.num;
					'step 1'
					event.count--;
					var cards=game.cardsGotoOrdering(get.cards(2)).cards;
					player.showCards(cards);
					event.count2=0;
					for(var i=0;i<cards.length;i++){
						if(get.suit(cards[i])=='spade'){
							event.count2++;
							cards.splice(i--,1);
						}
					}
					event.cards=cards;
					if(!event.count2||!trigger.source) event.goto(4);
					'step 2'
					event.count2--;
					if(trigger.source.countCards('h')>0){
						player.chooseTarget('令一名角色获得'+get.translation(trigger.source)+'的一张手牌',function(card,player,target){
							var source=_status.event.source;
							return target!=source&&source.countGainableCards(target,'h')>0;
						}).set('source',trigger.source);
					}
					else event.goto(4);
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						player.line([trigger.source,target],'green');
						target.gainPlayerCard(trigger.source,'h',true);
						if(event.count2) event.goto(2)
					}
					'step 4'
					if(cards.length) player.gain(cards,'gain2','log');
					'step 5'
					if(event.count>0){
					 player.chooseBool(get.prompt2('spyinzhi')).set('frequentSkill','spyinzhi');
					}
					else event.finish();
					'step 6'
					if(result.bool){
						player.logSkill('spyinzhi');
						event.goto(1);
					};
				},
			},
			spmingjian:{
				trigger:{global:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					var next=player.chooseCard(get.prompt2('spmingjian',trigger.player),'he');
					next.set('ai',function(card){
						var target=_status.event.getTrigger().player;
						var player=_status.event.player;
						if(get.attitude(player,target)>0&&target.countCards('j')>0) return 5-get.value(card);
						return -1;
					});
					next.set('filterCard',function(card,player){
						if(get.position(card)=='e') return lib.filter.cardDiscardable.apply(this,arguments);
						return true;
					});
					//next.set('logSkill',['spmingjian',trigger.player]);
					'step 1'
					if(result.bool){
						player.logSkill('spmingjian',trigger.player);
						var card=result.cards[0];
						event.card=card;
						if(get.position(card)=='e') event._result={index:0};
						else if(!lib.filter.cardDiscardable(card,player,event)) event._result={index:1};
						else{
							var name=get.translation(trigger.player);
							player.chooseControl().set('choiceList',[
								'令'+name+'跳过本回合的判定阶段',
								'令'+name+'于本回合的判定中不触发「判定结果生效前」的时机',
							]).set('ai',function(){return 0});
						}
					}
					else event.finish();
					'step 2'
					if(result.index==0){
						player.discard(card);
						trigger.player.skip('phaseJudge');
					}
					else{
						player.lose(card,ui.special,'toStorage');
						trigger.player.addSkill('spmingjian_charlotte');
						trigger.player.storage.spmingjian_charlotte.add(card);
						trigger.player.markSkill('spmingjian_charlotte');
					}
				},
				ai:{
					expose:0.25,
				},
			},
			spmingjian_charlotte:{
				trigger:{player:['judgeBefore','phaseAfter']},
				forced:true,
				firstDo:true,
				silent:true,
				popup:false,
				charlotte:true,
				content:function(){
					if(trigger.name=='phase') player.removeSkill(event.name);
					else trigger.noJudgeTrigger=true;
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				marktext:'鉴',
				intro:{
					name:'明鉴',
					content:'cards',
					onunmark:'throw',
				},
			},
			spshude:{
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				filter:function(event,player){
					return player.countCards('h')<player.maxHp;
				},
				content:function(){
					player.drawTo(player.maxHp);
				},
			},
			spfuluan:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player.inRange(target);
				},
				selectCard:3,
				position:'he',
				check:function(card){
					return 5-get.value(card);
				},
				complexCard:true,
				filterCard:function(card,player){
					if(!ui.selected.cards.length) return player.countCards('he',{suit:get.suit(card)})>2;
					return get.suit(card)==get.suit(ui.selected.cards[0]);
				},
				content:function(){
					target.turnOver();
					player.addTempSkill('spfuluan2');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(target.isTurnedOver()) return 2;
							return -1;
						},
					},
				},
			},
			spfuluan2:{
				mod:{
					cardEnabled:function(card){
						if(card.name=='sha') return false;
					},
				},
			},
			spzhaoxin:{
				trigger:{player:'phaseDrawEnd'},
				check:function(event,player){
					return player.getUseValue({name:'sha',isCard:true})>0;
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.showHandcards();
					'step 1'
					player.chooseUseTarget('sha',false);
				},
			},
			splanggu:{
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return get.itemtype(event.source)=='player';
				},
				logTarget:'source',
				content:function(){
					'step 0'
					player.judge();
					'step 1'
					if(trigger.source.countCards('h')>0){
						var next=player.discardPlayerCard(trigger.source,'h',[1,Infinity]);
						next.set('suit',result.suit);
						next.set('filterButton',function(button){
							return get.suit(button.link)==_status.event.suit;
						});
						next.set('visible',true);
					}
				},
				group:'splanggu_rewrite',
			},
			splanggu_rewrite:{
				trigger:{player:'judge'},
				filter:function (event,player){
					return player.countCards('hs')>0&&event.getParent().name=='splanggu';
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseCard('狼顾的判定结果为'+
					get.translation(trigger.player.judging[0])+'，是否打出一张手牌进行代替？','hs',function(card){
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
						if(mod!='unchanged') return mod;
						return true;
					}).set('ai',function(card){
						return -1;
					});
					"step 1"
					if(result.bool){
						player.respond(result.cards,'highlight','splanggu','noOrdering');
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
			},
			sphantong:{
				trigger:{player:'loseEnd'},
				frequent:true,
				filter:function(event,player){
					return event.type=='discard'&&event.getParent(3).name=='phaseDiscard'&&event.cards.filterInD('d').length>0;
				},
				content:function(){
					if(!player.storage.sphantong) player.storage.sphantong=[];
					var cards=trigger.cards.filterInD('d');
					player.storage.sphantong.addArray(cards);
					player.$gain2(cards);
					game.log(player,'将',cards,'置于武将牌上');
					player.markSkill('sphantong');
				},
				group:['sphantong_gain'],
				derivation:['hujia','jijiang','jiuyuan','xueyi'],
				marktext:'诏',
				intro:{
					content:'cards',
					onunmark:'throw',
				},
			},
			sphantong_gain:{
				trigger:{global:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					return player.storage.sphantong&&player.storage.sphantong.length>0;
				},
				content:function(){
					'step 0'
					player.chooseButton([get.prompt('sphantong'),player.storage.sphantong],function(button){return -1});
					'step 1'
					if(result.bool){
						player.logSkill('sphantong');
						var card=result.links[0];
						player.$throw(card);
						game.log(player,'将',card,'置入了弃牌堆');
						player.storage.sphantong.remove(card);
						player[player.storage.sphantong.length>0?'markSkill':'unmarkSkill']('sphantong');
						game.cardsDiscard(card);
						var list=['hujia','jijiang','jiuyuan','xueyi'];
						for(var i=0;i<list.length;i++){
							if(player.hasZhuSkill(list[i])) list.splice(i--,1);
						}
						if(list.length>0) player.chooseControl(list).set('prompt','选择获得以下技能中的一个');
						else event.finish();
					}
					else event.finish();
					'step 2'
					var skill=result.control;
					player.addTempSkill(skill);
					if(!player.storage.zhuSkill_sphantong) player.storage.zhuSkill_sphantong=[];
					player.storage.zhuSkill_sphantong.add(skill);
					player.popup(skill,'wood');
					game.log(player,'获得了技能','#g【'+get.translation(skill)+'】');
					var next=game.createEvent('sphantong_clear',false);
					event.next.remove(next);
					trigger.after.push(next);
					next.player=player;
					next.skill=skill;
					next.setContent(function(){
						if(player.storage.zhuSkill_sphantong) player.storage.zhuSkill_sphantong.remove(event.skill);
					})
				},
			},
			sphuangen:{
			trigger:{global:'useCardToPlayered'},
				filter:function(event,player){
					if(!event.isFirstTarget) return false;
					if(get.type(event.card)!='trick') return false;
					if(get.info(event.card).multitarget) return false;
					if(event.targets.length<2) return false;
					return player.hp>0;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('sphuangen'),
						[1,Math.min(player.hp,trigger.targets.length)],function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('ai',function(target){
						return -get.effect(target,trigger.card,trigger.player,_status.event.player);
					}).set('targets',trigger.targets);
					"step 1"
					if(result.bool){
						player.logSkill('sphuangen',result.targets);
						trigger.excluded.addArray(result.targets);
						player.draw();
					}
				},
			},
			spyicong:{
				trigger:{player:'phaseDiscardEnd'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('he',[1,player.countCards('he')],get.prompt2('spyicong')).set('ai',function(card){
						if(card.name=='du') return 10;
						if(ui.selected.cards.length) return -1;
						return 4-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('spyicong');
						if(!player.storage.spyicong) player.storage.spyicong=[];
						player.storage.spyicong.addArray(result.cards);
						player.$giveAuto(result.cards.length,player,false);
						game.log(player,'扣置了'+get.cnNumber(player.lose(result.cards,'toStorage',ui.special).cards.length)+'张【扈】');
						player.markSkill('spyicong');
					}
				},
				mod:{
					globalTo:function(from,to,num){
						if(to.storage.spyicong&&to.storage.spyicong.length) return num+to.storage.spyicong.length;
					},
				},
				marktext:'扈',
				intro:{
					name:'义从',
					content:'cardCount',
					onunmark:'throw',
				},
			},
			sptuji:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.storage.spyicong&&player.storage.spyicong.length>0;
				},
				content:function(){
					var num=player.storage.spyicong.length;
					player.addMark('sptuji2',num,false);
					player.addTempSkill('sptuji2');
					player.unmarkSkill('spyicong');
					if(num<=1) player.draw();
				},
			},
			sptuji2:{
				onremove:true,
				charlotte:true,
				mod:{
					globalFrom:function(from,to,num){
						return num-from.countMark('sptuji2');
					},
				},
				marktext:'突',
				intro:{
					name:'突骑',
					content:'至其他角色的距离-#',
				},
			},
			xinfu_yanyu:{
				trigger:{
					global:"phaseUseBegin",
				},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					var next=player.chooseToDiscard(get.prompt('xinfu_yanyu'),get.translation('xinfu_yanyu_info'),'he').set('logSkill','xinfu_yanyu');
					if(player==trigger.player){
						next.set('goon',function(){
							var map={
								basic:0,
								trick:0.1,
							};
							var hs=trigger.player.getCards('h');
							var sha=false;
							var jiu=false;
							for(var i=0;i<hs.length;i++){
								if(trigger.player.hasValueTarget(hs[i])){
									if(hs[i].name=='sha'&&!sha){
										sha=true;
										map.basic+=2;
									}
									if(hs[i].name=='tao') map.basic+=6;
									if(hs[i].name=='jiu'){jiu=true;map.basic+=2.5;}
									if(get.type(hs[i])=='trick') map.trick+=get.value(hs[i],player,'raw');
								}
							}
							return map;
						}());
						next.set('ai',function(card){
							var map=_status.event.goon;
							var type=get.type(card,'trick');
							if(!map[type]) return -1;
							return map[type]-get.value(card);
						});
					}
					else{
						next.set('ai',function(cardx){
							var map={
								basic:0,
								trick:0,
							};
							var hs=trigger.player.getCards('h');
							var sha=false;
							var jiu=false;
							for(var i=0;i<hs.length;i++){
								if(hs[i]!=cardx&&trigger.player.hasValueTarget(hs[i])){
									if(hs[i].name=='sha'&&!sha){
										sha=true;
										map.basic+=2;
									}
									if(hs[i].name=='tao') map.basic+=6;
									if(hs[i].name=='jiu'){jiu=true;map.basic+=3;}
									if(get.type(hs[i])=='trick') map.trick+=player.getUseValue(hs[i]);
								}
							}
							var type=get.type(cardx,'trick');
							if(!map[type]) return -get.value(cardx);
							return map[type]-get.value(cardx);
						});
					}
					'step 1'
					if(result.bool){
						player.storage.xinfu_yanyu=get.type(result.cards[0],'trick');
						player.addTempSkill('xinfu_yanyu2','phaseUseAfter');
					}
				},
			},
			"xinfu_yanyu2":{
				init:function (player,skill){
					player.storage[skill]=0;
				},
				onremove:function (player,skill){
					delete player.storage.xinfu_yanyu;
					delete player.storage.xinfu_yanyu2;
				},
				trigger:{
					global:["loseAfter","cardsDiscardAfter"],
				},
				direct:true,
				filter:function (event,player){
					if(player.storage.xinfu_yanyu2>=3) return false;
					//var evt=event.getParent();
					//if(evt&&(evt.name=='useCard'||evt.name=='respond')) return false;
					var type=player.storage.xinfu_yanyu;
					var cards=event.cards;
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i],'trick')==type&&get.position(cards[i],true)=='d') return true;
					}
					return false;
				},
				content:function (){
					'step 0'
					event.logged=false;
					event.cards=[];
					var type=player.storage.xinfu_yanyu;
					var cards=trigger.cards;
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i],'trick')==type&&get.position(cards[i],true)=='d') event.cards.push(cards[i]);
					}
					'step 1'
					if(player.storage.xinfu_yanyu2>=3) event.finish();
					else player.chooseCardButton(event.cards,'【燕语】：是否将其中的一张牌交给一名角色？').ai=function(card){
						if(card.name=='du') return 10;
						return get.value(card);
					};
					'step 2'
					if(result.bool){
						player.storage.xinfu_yanyu2++;
						if(!event.logged){
							player.logSkill('xinfu_yanyu');
							player.addExpose(0.25);
							event.logged=true;
						}
						event.togain=result.links[0];
						event.cards.remove(event.togain);
						player.chooseTarget(true,'请选择要获得'+get.translation(event.togain)+'的角色').set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							var card=_status.event.card;
							var val=get.value(card);
							if(player.storage.xinfu_yanyu2<3&&target==_status.currentPhase&&target.hasValueTarget(card,null,true)) att=att*5;
							else if(target==player&&!player.hasJudge('lebu')&&get.type(card)=='trick') att=att*3;
							if(target.hasSkillTag('nogain')) att/=10;
							return att*val;
						}).set('card',event.togain);
					}
					else event.finish();
					'step 3'
					var target=result.targets[0];
					player.line(target,'green');
					target.gain(event.togain,'gain2');
					if(event.cards.length) event.goto(1);
				},
			},
			"xinfu_xiaode":{
				subSkill:{
					remove:{
						unique:true,
						charlotte:true,
						trigger:{
							player:"phaseAfter",
						},
						forced:true,
						popup:false,
						content:function(){
							player.removeAdditionalSkill('xinfu_xiaode');
							player.removeSkill('xinfu_xiaode_remove');
						},
					},
				},
				trigger:{
					global:"dieAfter",
				},
				direct:true,
				filter:function (skill,event){
					return !event.hasSkill('xinfu_xiaode_remove');
				},
				content:function (){
					'step 0'
					var list=[];
					var listm=[];
					var listv=[];
					if(trigger.player.name1!=undefined) listm=lib.character[trigger.player.name1][3];
					else listm=lib.character[trigger.player.name][3];
					if(trigger.player.name2!=undefined) listv=lib.character[trigger.player.name2][3];
					listm=listm.concat(listv);
					var func=function(skill){
						var info=get.info(skill);
						if(info.charlotte||info.zhuSkill||(info.unique&&!info.limited)||info.juexingji||info.dutySkill||info.hiddenSkill) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					if(list.length){
						player.chooseControl(list,'cancel2').set('prompt',get.prompt('xinfu_xiaode')).set('prompt2',get.translation('xinfu_xiaode_info')).set('ai',function(){
							return list.randomGet();
						});
					}
					else event.finish();
					'step 1'
					if(result.control&&result.control!='cancel2'){
						player.logSkill('xinfu_xiaode');
						player.popup(result.control,'thunder');
						game.log(player,'获得了技能','#g【'+get.translation(result.control)+'】');
						player.addAdditionalSkill('xinfu_xiaode',[result.control]);
						player.addSkill('xinfu_xiaode_remove');
					}
				},
			},
			chixin:{
				group:['chixin1','chixin2'],
				mod:{
					cardUsableTarget:function(card,player,target){
						if(card.name=='sha'&&!target.hasSkill('chixin3')&&player.inRange(target)) return true;
					},
				},
				trigger:{player:'useCardToPlayered'},
				silent:true,
				firstDo:true,
				content:function(){
					trigger.target.addTempSkill('chixin3');
				}
			},
			chixin1:{
				enable:['chooseToRespond','chooseToUse'],
				filterCard:{suit:'diamond'},
				position:'hes',
				viewAs:{name:'sha'},
				prompt:'将一张♦牌当杀使用或打出',
				check:function(card){return 5-get.value(card)},
				ai:{
					respondSha:true,
				}
			},
			chixin2:{
				enable:['chooseToUse','chooseToRespond'],
				filterCard:{suit:'diamond'},
				viewAs:{name:'shan'},
				position:'hes',
				prompt:'将一张♦牌当闪使用或打出',
				check:function(card){return 5-get.value(card)},
				ai:{
					respondShan:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.8
						}
					},
				}
			},
			chixin3:{},
			suiren:{
				trigger:{player:'phaseZhunbeiBegin'},
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return !player.storage.suiren;
				},
				intro:{
					content:'limited',
				},
				mark:true,
				direct:true,
				unique:true,
				limited:true,
				content:function(){
					"step 0"
					var check=(player.hp==1||(player.hp==2&&player.countCards('h')<=1));
					player.chooseTarget(get.prompt2('suiren')).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.attitude(_status.event.player,target);
					}).set('check',check);
					"step 1"
					if(result.bool){
						player.storage.suiren=true;
						player.awakenSkill('suiren');
						player.logSkill('suiren',result.targets);
						player.removeSkill('reyicong');
						player.gainMaxHp();
						player.recover();
						result.targets[0].draw(3);
					}
				}
			},
			xinmanjuan:{
				audio:'manjuan',
				forced:true,
				priority:15,
				trigger:{player:'gainAfter'},
				filter:function(event,player){
					return event.type!='xinmanjuan';
				},
				content:function(){
					"step 0"
					player.lose(trigger.cards,ui.discardPile,'visible');
					player.$throw(trigger.cards,1000);
					game.log(player,'将',trigger.cards,'置入了弃牌堆')
					"step 1"
					event.cards=trigger.cards.slice(0);
					if(_status.currentPhase!=player) event.finish();
					"step 2"
					event.card=event.cards.shift();
					event.togain=[];
					var number=get.number(event.card);
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						var current=ui.discardPile.childNodes[i];
						if((!trigger.cards.contains(current))&&get.number(current)==number) event.togain.push(current);
					}
					if(!event.togain.length) event.goto(5);
					"step 3"
					player.chooseButton(['是否获得其中的一张牌？',event.togain]).ai=function(button){
						return get.value(button.link);
					};
					"step 4"
					if(result.bool){
						player.gain(result.links[0],'gain2').type='xinmanjuan';
					}
					"step 5"
					if(event.cards.length) event.goto(2);
				},
				ai:{
					threaten:4.2,
					nogain:1,
					skillTagFilter:function(player){
						return player!=_status.currentPhase;
					},
				},
			},
			manjuan:{
				audio:true,
				trigger:{global:'loseAfter'},
				filter:function(event,player){
					if(event.type!='discard') return false;
					if(event.player==player) return false;
					if(!player.countCards('he')) return false;
					for(var i=0;i<event.cards2.length;i++){
						if(get.position(event.cards2[i],true)=='d'){
							return true;
						}
					}
					return false;
				},
				direct:true,
				unique:true,
				gainable:true,
				content:function(){
					"step 0"
					if(trigger.delay==false) game.delay();
					"step 1"
					var cards=[];
					var suits=['club','spade','heart','diamond']
					for(var i=0;i<trigger.cards2.length;i++){
						if(get.position(trigger.cards2[i],true)=='d'){
							cards.push(trigger.cards2[i]);
							suits.remove(get.suit(trigger.cards2[i]));
						}
					}
					if(cards.length){
						var maxval=0;
						for(var i=0;i<cards.length;i++){
							var tempval=get.value(cards[i]);
							if(tempval>maxval){
								maxval=tempval;
							}
						}
						maxval+=cards.length-1;
						var next=player.chooseToDiscard('he',{suit:suits});
						next.set('ai',function(card){
							return _status.event.maxval-get.value(card);
						});
						next.set('maxval',maxval);
						next.set('dialog',[get.prompt(event.name),'hidden',cards])
						next.logSkill=event.name;
						event.cards=cards;
					}
					"step 2"
					if(result.bool){
						player.gain(event.cards,'gain2','log');
					}
				},
				ai:{
					threaten:1.3
				}
			},
			zuixiang:{
				skillAnimation:true,
				animationColor:'gray',
				audio:true,
				unique:true,
				limited:true,
				trigger:{player:'phaseZhunbeiBegin'},
				content:function(){
					'step 0'
					player.awakenSkill('zuixiang');
					event.cards=player.showCards(get.cards(3)).cards;
					player.markAuto('zuixiang2',event.cards);
					game.cardsGotoSpecial(event.cards);
					'step 1'
					if(lib.skill.zuixiang.filterSame(cards)){
						player.gain(cards,'gain2').type='xinmanjuan';
						delete player.storage.zuixiang2;
						player.unmarkSkill('zuixiang2');
					}
					else{
						trigger._zuixiang=true;
						player.addSkill('zuixiang2');
					}
				},
				filterSame:function(c){
					for(var i=0;i<c.length;i++){
						for(var j=i+1;j<c.length;j++){
							if(get.number(c[i])==get.number(c[j])) return true;
						}
					}
					return false;
				},
			},
			zuixiang2:{
				intro:{
					content:'cards',
					onunmark:'throw',
				},
				mod:{
					cardEnabled:function(card,player){
						var type=get.type2(card);
						var list=player.getStorage('zuixiang2');
						for(var i of list){
							if(get.type2(i)==type) return false;
						}
					},
					cardRespondable:function(){
						return lib.skill.zuixiang2.mod.cardEnabled.apply(this,arguments)
					},
					cardSavable:function(){
						return lib.skill.zuixiang2.mod.cardEnabled.apply(this,arguments);
					},
				},
				trigger:{
					player:'phaseZhunbeiBegin',
					target:'useCardToBefore',
				},
				forced:true,
				filter:function(event,player){
					if(event.name=='phaseZhunbei') return !event._zuixiang;
					var type=get.type2(event.card);
					var list=player.getStorage('zuixiang2');
					for(var i of list){
						if(get.type2(i)==type) return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					if(event.triggername=='useCardToBefore'){
						trigger.cancel();
						event.finish();
						return;
					}
					var cards=get.cards(3);
					player.markAuto('zuixiang2',cards);
					player.showCards(player.storage.zuixiang2);
					game.cardsGotoSpecial(cards);
					'step 1'
					var cards=player.getStorage('zuixiang2');
					if(lib.skill.zuixiang.filterSame(cards)){
						player.gain(cards,'gain2','log').type='xinmanjuan';
						delete player.storage.zuixiang2;
						player.removeSkill('zuixiang2');
					}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							var type=get.type2(card);
							var list=target.getStorage('zuixiang2');
							for(var i of list){
								if(get.type2(i)==type) return 'zeroplayertarget';
							}
						},
					},
				},
			},
			yanxiao:{
				audio:2,
				enable:'phaseUse',
				filterCard:{suit:'diamond'},
				filterTarget:true,
				check:function(card){
					return 7-get.value(card);
				},
				position:'he',
				filter:function(event,player){
					return player.countCards('he',{suit:'diamond'})>0;
				},
				discard:false,
				lose:false,
				delay:false,
				prepare:'give',
				content:function(){
					'step 0'
					game.addGlobalSkill('yanxiao_global');
					target.addJudge({name:'yanxiao_card'},cards);
					'step 1'
					game.delay();
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(target.countCards('j',function(card){
								return get.effect(target,{
									name:card.viewAs||card.name,
									cards:[card],
								},target,target)<0;
							})) return 1;
							return 0;
						}
					}
				}
			},
			yanxiao_global:{
				trigger:{player:'phaseJudgeBegin'},
				forced:true,
				filter:function(event,player){
					return player.countCards('j')>0&&player.hasJudge('yanxiao_card');
				},
				content:function(){
					player.gain(player.getCards('j'),'gain2');
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.type(card)=='delay'&&target.hasJudge('yanxiao_card')) return [0,0,0,0.1];
						}
					}
				}
			},
			anxian:{
				audio:2,
				group:['anxian_source','anxian_target'],
				subSkill:{
					source:{
						audio:"anxian",
						trigger:{source:'damageBegin2'},
						filter:function(event,player){
							return event.card&&event.card.name=='sha';
						},
						check:function(event,player){
							if(get.damageEffect(event.player,player,player)<=0) return true;
							return false;
						},
						content:function(){
							'step 0'
							if(trigger.player.countCards('h')){
								trigger.player.chooseToDiscard(true);
							}
							'step 1'
							player.draw();
							trigger.cancel();
						}
					},
					target:{
						audio:"anxian",
						trigger:{target:'useCardToTargeted'},
						direct:true,
						filter:function(event,player){
							return event.card.name=='sha'&&player.countCards('h');
						},
						content:function(){
							"step 0"
							var next=player.chooseToDiscard(get.prompt2('anxian'));
							next.set('ai',function(card){
								var player=_status.event.player;
								var trigger=_status.event.getTrigger();
								if(get.attitude(player,trigger.player)>0){
									return 9-get.value(card);
								}
								if(player.countCards('h',{name:'shan'})) return -1;
								return 7-get.value(card);
							});
							next.logSkill='anxian';
							"step 1"
							if(result.bool){
								trigger.player.draw();
								trigger.getParent().excluded.push(player);
							}
						},
					}
				}
			},
			junwei:{
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.storage.yinling&&player.storage.yinling.length>=3;
				},
				content:function(){
					'step 0'
					if(player.storage.yinling.length>3){
						player.chooseButton(3,[get.prompt('junwei'),'hidden',player.storage.yinling]).set('ai',function(button){
							return 1;
						});
					}
					else{
						player.chooseBool().set('createDialog',[get.prompt('junwei'),'hidden',player.storage.yinling]).set('dialogselectx',true).set('choice',true);
						event.cards=player.storage.yinling.slice(0);
					}
					'step 1'
					if(result.bool){
						player.logSkill('junwei');
						var cards=event.cards||result.links;
						for(var i=0;i<cards.length;i++){
							player.storage.yinling.remove(cards[i]);
						}
						game.cardsDiscard(cards);
						player.$throw(cards);
						player.syncStorage('yinling');
						if(player.storage.yinling.length==0){
							player.unmarkSkill('yinling');
						}
						else{
							player.markSkill('yinling');
						}
						game.delay();
						player.chooseTarget(true,function(card,player,target){
							return player!=target;
						}).set('ai',function(target){
							return -get.attitude(_status.event.player,target)/Math.sqrt(1+target.hp);
						});
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool&&result.targets&&result.targets.length){
						var target=result.targets[0];
						player.line(result.targets);
						event.target=target;
						var nshan=target.countCards('h',function(card){
							if(_status.connectMode) return true;
							return card.name=='shan';
						});
						if(nshan==0){
							event.directfalse=true;
						}
						else{
							target.chooseCard('交给'+get.translation(player)+'一张【闪】，或失去一点体力',function(card){
								return card.name=='shan';
							}).set('ai',function(card){
								if(_status.event.nshan>1) return 1;
								if(_status.event.player.hp>=3) return 0;
								return 1;
							}).set('nshan',nshan);
						}
					}
					else{
						event.finish();
					}
					'step 3'
					if(!event.directfalse&&result.bool) game.delay();
					ui.clear();
					'step 4'
					if(!event.directfalse&&result.bool){
						event.cards=result.cards;
						event.target.$throw(result.cards);
						player.chooseTarget('将'+get.translation(event.cards)+'交给一名角色',true,function(card,player,target){
							return target!=_status.event.getParent().target;
						}).set('ai',function(target){
							return get.attitude(_status.event.player,target)/(target.countCards('h','shan')+1);
						});
					}
					else{
						event.target.loseHp();
						delete event.cards;
					}
					'step 5'
					if(event.cards){
						player.line(result.targets,'green');
						result.targets[0].gain(event.cards,'gain2');
						game.log(player,'将',event.cards,'交给',result.targets[0]);
						event.finish();
					}
					else{
						if(event.target.countCards('e')){
							player.choosePlayerCard('e','将'+get.translation(event.target)+'的一张装备牌移出游戏',true,event.target);
						}
						else{
							event.finish();
						}
					}
					'step 6'
					if(result.bool){
						var card=result.links[0];
						if(event.target.storage.junwei2){
							event.target.storage.junwei2.push(card);
							event.target.markSkill('junwei2');
						}
						else{
							event.target.storage.junwei2=[card];
						}
						event.target.lose(card,ui.special,'toStorage');
						event.target.addSkill('junwei2');
						event.target.syncStorage('junwei2');
					}
				}
			},
			junwei2:{
				mark:true,
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
				},
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				content:function(){
					'step 0'
					if(player.storage.junwei2.length){
						var card=player.storage.junwei2.shift();
						player.equip(card);
						event.redo();
					}
					'step 1'
					player.removeSkill('junwei2');
					delete player.storage.junwei2;
				}
			},
			yinling:{
				enable:'phaseUse',
				filterCard:{color:'black'},
				position:'he',
				intro:{
					content:'cards',
					onunmark:'throw'
				},
				filter:function(event,player){
					return player.countCards('he',{color:'black'})>0&&player.storage.yinling.length<4;
				},
				filterTarget:function(card,player,target){
					return target.countCards('he')>0&&target!=player;
				},
				init:function(player){
					player.storage.yinling=[];
				},
				check:function(card){
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					player.choosePlayerCard('hej',target,true);
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						target.$give(result.links,player,false);
						target.lose(result.links,ui.special,'toStorage');
						player.storage.yinling.push(result.links[0]);
						player.markSkill('yinling');
						player.syncStorage('yinling');
					}
				},
				ai:{
					order:10.1,
					expose:0.1,
					result:{
						target:function(player,target){
							if(target.hasSkill('tuntian')) return 0;
							var es=target.getCards('e');
							var nh=target.countCards('h');
							var noe=(es.length==0||target.hasSkillTag('noe'));
							var noe2=(es.length==1&&es[0].name=='baiyin'&&target.hp<target.maxHp);
							var noh=(nh==0||target.hasSkillTag('noh'));
							if(noh&&noe) return 0;
							if(noh&&noe2) return 0.01;
							if(get.attitude(player,target)<=0) return (target.countCards('he'))?-1.5:1.5;
							var js=target.getCards('j');
							if(js.length){
								var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
								if(jj.name=='guohe') return 3;
								if(js.length==1&&get.effect(target,jj,target,player)>=0){
									return -1.5;
								}
								return 2;
							}
							return -1.5;
						},
					},
				}
			},
			fenyong:{
				audio:2,
				trigger:{player:'damageEnd'},
				content:function(){
					player.addTempSkill('fenyong2');
				}
			},
			fenyong2:{
				audio:'fenyong',
				mark:true,
				intro:{
					content:'防止你受到的所有伤害'
				},
				trigger:{player:'damageBegin3'},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					nofire:true,
					nothunder:true,
					nodamage:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')) return [0,0];
						}
					},
				}
			},
			xuehen:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					return player.hasSkill('fenyong2')&&event.player.isAlive();
				},
				content:function(){
					'step 0'
					player.removeSkill('fenyong2');
					player.chooseControl('弃牌','出杀',function(){
						var player=_status.event.player;
						var trigger=_status.event.getTrigger();
						if(get.attitude(player,trigger.player)<0){
							var he=trigger.player.countCards('he');
							if(he<2) return '出杀';
							if(player.maxHp-player.hp>=2&&he<=3){
								return '弃牌';
							}
							if(player.maxHp-player.hp>=3&&he<=5){
								return '弃牌';
							}
							if(player.maxHp-player.hp>3){
								return '弃牌';
							}
							return '出杀';
						}
						return '出杀';
					}).set('prompt','弃置'+get.translation(trigger.player)+get.cnNumber(player.maxHp-player.hp)+'张牌，或对任意一名角色使用一张杀');
					'step 1'
					if(result.control=='弃牌'){
						player.line(trigger.player,'green');
						if(player.hp<player.maxHp&&trigger.player.countCards('he')){
							player.discardPlayerCard(trigger.player,true,'he',player.maxHp-player.hp);
						}
					}
					else{
						player.chooseUseTarget({name:'sha'},true,false,'nodistance');
					}
				}
			},
			mouduan:{
				audio:1,
				init2:function(player){
					game.broadcastAll(function(player){
						player._mouduan_mark=player.mark('武',{
							content:'拥有技能【激昂】、【谦逊】'
						});
					},player);
					player.addAdditionalSkill('mouduan',['jiang','qianxun']);
				},
				onremove:function(player){
					game.broadcastAll(function(player){
						if(player._mouduan_mark){
							player._mouduan_mark.delete();
							delete player._mouduan_mark;
						}
					},player);
					player.removeAdditionalSkill('mouduan');
				},
				trigger:{player:'loseEnd'},
				forced:true,
				filter:function(event,player){
					return player._mouduan_mark&&player._mouduan_mark.name=='武'&&player.countCards('h')<=2;
				},
				content:function(){
					game.broadcastAll(function(player){
						if(!player._mouduan_mark) return;
						player._mouduan_mark.name='文';
						player._mouduan_mark.skill='文';
						player._mouduan_mark.firstChild.innerHTML='文';
						player._mouduan_mark.info.content='拥有技能【英姿】、【克己】';
					},player);
					player.addAdditionalSkill('mouduan',['yingzi','keji']);
				},
				group:'mouduan2'
			},
			mouduan2:{
				audio:1,
				trigger:{global:'phaseZhunbeiBegin'},
				//priority:5,
				filter:function(event,player){
					return player._mouduan_mark&&player._mouduan_mark.name=='文'&&player.countCards('h')>2;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToDiscard('he','谋断：是否弃置一张牌将标记变为“武”？').ai=function(){
						return -1;
					}
					'step 1'
					if(result.bool&&player.countCards('h')>2){
						game.broadcastAll(function(player){
							if(!player._mouduan_mark) return;
							player._mouduan_mark.name='武';
							player._mouduan_mark.skill='武';
							player._mouduan_mark.firstChild.innerHTML='武';
							player._mouduan_mark.info.content='拥有技能【激昂】、【谦逊】';
						},player);
						player.addAdditionalSkill('mouduan',['jiang','qianxun']);
					}
				}
			},
			tanhu:{
				audio:1,
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
					player.chooseToCompare(target);
					'step 1'
					if(result.bool){
						target.addTempSkill('tanhu2');
					}
				},
				ai:{
					result:{
						target:function(player,target){
							var hs=player.getCards('h');
							if(hs.length<3) return 0;
							var bool=false;
							for(var i=0;i<hs.length;i++){
								if(hs[i].number>=9&&get.value(hs[i])<7){
									bool=true;
									break;
								}
							}
							if(!bool) return 0;
							return -1;
						}
					},
					order:9,
				},
				group:'tanhu3'
			},
			tanhu2:{
				mark:true,
				intro:{
					content:'已成为探虎目标'
				}
			},
			tanhu3:{
				mod:{
					globalFrom:function(from,to){
						if(to.hasSkill('tanhu2')) return -Infinity;
					},
					wuxieRespondable:function(card,player,target){
						if(target&&target.hasSkill('tanhu2')) return false;
					}
				}
			},
			jie:{
				audio:1,
				trigger:{source:'damageBegin1'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&get.color(event.card)=='red'&&event.notLink();
				},
				forced:true,
				content:function(){
					trigger.num++;
				}
			},
			dahe:{
				audio:1,
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
					player.chooseToCompare(target).set('preserve','win');
					'step 1'
					if(result.bool&&result.target){
						event.type=true;
						event.card=result.target;
						player.chooseTarget('将'+get.translation(result.target)+'交给一名角色',function(card,player,target){
							return target.hp<=player.hp;
						}).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du) return -att;
							return att;
						}).set('du',event.card.name=='du');
						target.addTempSkill('dahe2');
					}
					else{
						event.type=false;
						if(player.countCards('h')){
							player.showHandcards();
							player.chooseToDiscard('h',true);
						}
					}
					'step 2'
					if(event.type){
						if(result.bool){
							player.line(result.targets,'green');
							result.targets[0].gain(event.card,'gain2');
						}
					}
				},
				ai:{
					result:{
						target:function(player,target){
							var hs=player.getCards('h');
							if(hs.length<3) return 0;
							var bool=false;
							for(var i=0;i<hs.length;i++){
								if(hs[i].number>=9&&get.value(hs[i])<7){
									bool=true;
									break;
								}
							}
							if(!bool) return 0;
							if(player.canUse('sha',target)&&(player.countCards('h','sha'))){
								return -2;
							}
							return -0.5;
						}
					},
					order:9,
				}
			},
			dahe2:{
				mark:true,
				intro:{
					content:'非红桃闪无效'
				},
				mod:{
					cardRespondable:function(card,player){
						if(card.name=='shan'&&get.suit(card)!='heart') return false;
					},
					cardEnabled:function(card,player){
						if(card.name=='shan'&&get.suit(card)!='heart') return false;
					},
				}
			},
			shichou:{
				//audio:1,
				skillAnimation:true,
				animationColor:'orange',
				unique:true,
				limited:true,
				mark:false,
				trigger:{player:'phaseZhunbeiBegin'},
				zhuSkill:true,
				direct:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('shichou'))return false;
					if(player.countCards('he')<2) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.group=='shu';
					});
				},
				init:function(player){
					if(player.hasZhuSkill('shichou')){
						player.markSkill('shichou');
						player.storage.shichou=false;
					}
				},
				content:function(){
					"step 0"
					player.chooseCardTarget({
						prompt:get.prompt2('shichou'),
						selectCard:2,
						filterTarget:function(card,player,target){
							return target.group=='shu'&&target!=player;
						},
						filterCard:true,
						position:'he',
						ai1:function(card){
							return 7-get.value(card);
						},
						ai2:function(target){
							var player=_status.event.player;
							if(player.hasUnknown()) return 0;
							var att=get.attitude(player,target);
							if(att<=0){
								if(target.hp==1) return (10-att)/2;
								return 10-att;
							}
							else{
								if(target.hp==1) return 0;
								return (10-att)/4;
							}
						},
					});
					"step 1"
					if(!result.bool) return;
					var target=result.targets[0];
					var cards=result.cards;
					player.storage.shichou=true;
					player.logSkill('shichou',target);
					player.awakenSkill('shichou');
					target.gain(cards,player,'giveAuto');
					player.storage.shichou_target=target;
					player.addSkill('shichou2');
					target.markSkillCharacter('shichou',player,'誓仇','代替'+get.translation(player)+'承受伤害直到首次进入濒死状态');
				},
				intro:{
					content:'limited'
				},
			},
			shichou2:{
				group:'shichou3',
				trigger:{player:'damageBegin3'},
				forced:true,
				popup:false,
				content:function(){
					trigger.player=player.storage.shichou_target;
					trigger.shichou4=true;
					trigger.player.addSkill('shichou4');
					player.logSkill('shichou2',player.storage.shichou_target);
					game.delay(0.5);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(get.attitude(player,target)>0) return [0,0];
								var eff=get.damageEffect(target.storage.shichou_target,player,target);
								if(eff>0){
									return [0,1];
								}
								else if(eff<0){
									return [0,-2];
								}
								else{
									return [0,0];
								}
							}
						}
					}
				}
			},
			shichou3:{
				trigger:{global:['dying','dieBegin']},
				forced:true,
				popup:false,
				//priority:10,
				filter:function(event,player){
					return event.player==player.storage.shichou_target;
				},
				content:function(){
					trigger.player.unmarkSkill('shichou');
					delete player.storage.shichou_target;
					player.removeSkill('shichou2');
				}
			},
			shichou4:{
				trigger:{player:['damageAfter','damageCancelled']},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					if(!trigger.shichou4) return;
					if(event.triggername=='damageAfter'&&trigger.num){
						player.draw(trigger.num);
					}
					player.removeSkill('shichou4');
				}
			},
			zhaolie:{
				trigger:{player:'phaseDrawBegin2'},
				direct:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('zhaolie'),function(card,player,target){
						return target!=player&&player.inRange(target);
					}).set('ai',function(target){
						var player=_status.event.player;
						if(get.attitude(player,target)>0) return 0;
						return get.damageEffect(target,player,player);
					});
					'step 1'
					if(result.bool){
						trigger.num--;
						player.storage.zhaolie=result.targets[0];
						player.logSkill('zhaolie',result.targets);
						player.addTempSkill('zhaolie2','phaseDrawAfter');
					}
				}
			},
			zhaolie2:{
				trigger:{player:'phaseDrawEnd'},
				forced:true,
				popup:false,
				content:function(){
					'step 0'
					event.cards=get.cards(3);
					player.showCards(event.cards);
					'step 1'
					event.basic=[];
					event.nonbasic=[];
					event.todis=[];
					for(var i=0;i<event.cards.length;i++){
						if(get.type(event.cards[i])=='basic'){
							if(event.cards[i].name=='tao'){
								event.todis.push(event.cards[i]);
							}
							else{
								event.basic.push(event.cards[i]);
							}
						}
						else{
							event.todis.push(event.cards[i]);
							event.nonbasic.push(event.cards[i]);
						}
					}
					game.cardsDiscard(event.todis);
					var num=event.nonbasic.length;
					if(num==0){
						if(event.basic.length==0){
							event.finish();
							return;
						}
						player.storage.zhaolie.chooseTarget(function(card,player,target){
							var source=_status.event.source;
							return target==source||target==source.storage.zhaolie;
						},true,'选择一个目标获得'+get.translation(event.basic)).set('ai',function(target){
							return get.attitude(_status.event.player,target);
						}).set('source',player);
					}
					else{
						player.storage.zhaolie.chooseToDiscard(num,'he','弃置'+get.cnNumber(num)+
						'张牌并令'+get.translation(player)+'拿牌，或受到'+get.cnNumber(num)+'点伤害并拿牌').set('ai',function(card){
							var player=_status.event.player;
							switch(_status.event.num){
								case 1:return player.hp>1?0:7-get.value(card);
								case 2:return 8-get.value(card);
								case 3:return 10-get.value(card);
								default:return 0;
							}
						}).set('num',num);
					}
					'step 2'
					var num=event.nonbasic.length;
					var undone=false;
					if(num==0){
						if(event.basic.length){
							result.targets[0].gain(event.basic,'gain2','log');
						}
					}
					else{
						if(result.bool){
							if(event.basic.length){
								player.gain(event.basic,'gain2','log');
							}
						}
						else{
							player.storage.zhaolie.damage(num);
							if(event.basic.length){
								undone=true;
							}
						}
					}
					if(!undone){
						delete player.storage.zhaolie;
						event.finish();
					}
					'step 3'
					if(player.storage.zhaolie.isAlive()){
						player.storage.zhaolie.gain(event.basic,'gain2','log');
					}
					else{
						game.cardsDiscard(event.basic);
					}
					delete player.storage.zhaolie;
				}
			},
			fulu:{
				trigger:{player:'useCard1'},
				filter:function(event,player){
					if(event.card.name=='sha'&&!event.card.nature) return true;
				},
				audio:true,
				check:function(event,player){
					var eff=0;
					for(var i=0;i<event.targets.length;i++){
						var target=event.targets[i];
						var eff1=get.damageEffect(target,player,player);
						var eff2=get.damageEffect(target,player,player,'thunder');
						eff+=eff2;
						eff-=eff1;
					}
					return eff>=0;
				},
				content:function(){
					trigger.card.nature='thunder';
					if(get.itemtype(trigger.card)=='card'){
						var next=game.createEvent('fulu_clear');
						next.card=trigger.card;
						event.next.remove(next);
						trigger.after.push(next);
						next.setContent(function(){
							delete card.nature;
						});
					}
				}
			},
			fuji:{
				trigger:{global:'damageBegin1'},
				filter:function(event){
					return event.source&&event.nature=='thunder';
				},
				check:function(event,player){
					return get.attitude(player,event.source)>0&&get.attitude(player,event.player)<0;
				},
				prompt:function(event){
					return get.translation(event.source)+'即将对'+get.translation(event.player)+'造成伤害，'+get.prompt('fuji');
				},
				logTarget:'source',
				content:function(){
					trigger.source.judge().callback=lib.skill.fuji.callback;
				},
				callback:function(){
					var evt=event.getParent(2);
					if(event.judgeResult.color=='black'){
						//game.cardsDiscard(card);
						evt._trigger.num++;
					}
					else{
						evt._trigger.source.gain(card,'gain2');
					}
				},
			},
		},
		characterReplace:{},
		translate:{
			sp_gongsunzan:'SP公孙瓒',
			sp_simazhao:'SP司马昭',
			sp_wangyuanji:'SP王元姬',
			sp_xinxianying:'SP辛宪英',
			sp_liuxie:'SP刘协',
			spyicong_info:'弃牌阶段结束时，你可以将任意张牌置于你的武将牌上，称为「扈」。每有一张「扈」，其他角色与你计算距离时便+1。',
			spyicong:'义从',
			sptuji:'突骑',
			sptuji_info:'准备开始时，你将所有「扈」置于弃牌堆，然后你本回合内计算与其他角色的距离时-X。若X不大于1，你摸一张牌。（X为以此法进入弃牌堆的「扈」的数量）',
			sphuangen:'皇恩',
			sphuangen_info:'一名角色使用锦囊牌指定目标时，若此牌的目标数大于1，则你可以令此牌对其中的至多X个目标无效，然后摸一张牌。（X为你的体力值）',
			sphantong:'汉统',
			sphantong_gain:'汉统',
			sphantong_info:'当你的牌因弃牌阶段的游戏规则要求而进入弃牌堆后，你可以将这些牌置于你的武将牌上，称为「诏」。一名角色的回合开始时，你可以弃置一张「诏」并获得〖护驾〗/〖激将〗/〖救援〗/〖血裔〗中的一个技能直至当前回合结束。',
			spzhaoxin:'昭心',
			spzhaoxin_info:'摸牌阶段结束时，你可以展示所有手牌，然后视为使用一张【杀】。',
			splanggu:'狼顾',
			splanggu_rewrite:'狼顾',
			splanggu_info:'当你受到有来源的伤害后，你可以进行判定（此判定结果生效前，你可以打出一张手牌替换判定牌）。然后你可以观看伤害来源的手牌并弃置其中的任意张与判定结果花色相同的牌。',
			spfuluan:'扶乱',
			spfuluan_info:'出牌阶段限一次，你可以弃置三张花色相同的牌并选择攻击范围内的一名角色。若如此做，该角色翻面且你不能使用【杀】直到回合结束',
			spshude:'淑德',
			spshude_info:'结束阶段开始时，你可以将手牌补至体力上限。',
			spmingjian:'明鉴',
			spmingjian_info:'一名角色的回合开始时，你可以选择一项：①弃置一张牌，然后其跳过本回合的判定阶段。②将一张手牌置于其武将牌上，然后其本回合内进行判定时不触发「判定结果生效前」的时机，且其回合结束时将此牌置入弃牌堆。',
			spyinzhi:'隐智',
			spyinzhi_info:'当你受到1点伤害后，你可以展示牌堆顶的两张牌。若其中有黑桃牌，则你可以进行至多X次「令一名角色获得伤害来源的一张手牌」的步骤。然后获得其余的牌。（X为其中黑桃牌的数量）',
			yj_caoang:'SP曹昂',
			yjxuepin:'血拼',
			yjxuepin_info:'出牌阶段限一次，你可以选择攻击范围内的一名角色并失去1点体力。你弃置其两张牌。若这两张牌类型相同，你回复1点体力。',
			ns_chendao:'SP陈到',
			nsjianglie:'将烈',
			nsjianglie_info:'当你使用【杀】指定目标后，你可以令其展示所有手牌，然后弃置其中一种颜色的牌。',
			ns_jiaxu:'☆贾诩',
			nsyice:'遗策',
			nsyice_info:'锁定技，当你使用/打出/弃置的牌进入弃牌堆后，你将这些牌以任意顺序置于你的武将牌上，称为“策”。若这些“策”中有点数相同的牌，则你获得这两张牌中的所有牌，将这两张牌置于牌堆两端。若场上没有处于濒死状态的角色，则你对一名角色造成1点伤害。',
			ns_lijue:'SP李傕',
			ns_zhangji:'SP张济',
			nsfeixiong:'飞熊',
			nsfeixiong_info:'出牌阶段开始时，你可以和一名其他角色拼点。赢的角色对没赢的角色造成1点伤害。',
			nscesuan:'策算',
			nscesuan_info:'锁定技，当你受到伤害时，你防止此伤害并失去一点体力上限。若你因以此法失去体力上限导致体力值减少，则你摸一张牌。',
			nslulve:'掳掠',
			nslulve_info:'出牌阶段限一次，你可以弃置X张牌并选择一名装备区内有牌的其他角色，然后对其造成1点伤害（X为其装备区内的牌数）。',
			ns_fanchou:'SP樊稠',
			nsyangwu:'扬武',
			nsyangwu_info:'出牌阶段限一次，你可以弃置一张♥手牌并选择一名手牌数大于你的其他角色。你观看其手牌并获得其中的X张牌（X为其与你手牌数之差的一半且向上取整）。',
			jsp_liubei:'群刘备',
			jsp_liubei_ab:'刘备',
			jsprende:'仁德',
			jsprende_info:'出牌阶段，你可以将至少一张手牌交给其他角色；若你于此阶段内给出的牌首次达到两张，你可以视为使用一张基本牌',
			ns_caoanmin:'曹安民',
			nskuishe:'窥舍',
			nskuishe_info:'出牌阶段限一次，你可以选择一名其他角色A的一张牌，并将此牌交给不为A的一名角色。然后A可以对你使用一张【杀】。',
			sp_xiahoushi:"SP夏侯氏",
			xinfu_yanyu:"燕语",
			xinfu_yanyu_info:"一名角色的出牌阶段开始时，你可以弃置一张牌。若如此做，则该出牌阶段内，当有与你弃置的牌类别相同的其他牌进入弃牌堆后，你可令任意一名角色获得此牌。每阶段以此法获得的牌不能超过三张。",
			xinfu_yanyu2:"燕语",
			xinfu_xiaode:"孝德",
			xinfu_xiaode_info:"其他角色死亡后，你可以声明该角色武将牌上的一个技能（主公技、觉醒技、隐匿技、使命技除外）。若如此做，你获得此技能且不能再发动〖孝德〗直到你的回合结束。",
			jsp_zhaoyun:'☆SP赵云',
			chixin:'赤心',
			chixin1:'赤心',
			chixin2:'赤心',
			chixin_info:'你可以将♦牌当作【杀】或【闪】使用或打出。出牌阶段，你对在你攻击范围内且本回合内未成为过你使用的【杀】的目标的角色使用的【杀】没有次数限制。',
			suiren:'随仁',
			suiren_info:'限定技，准备阶段开始时，你可以失去技能〖义从〗，然后加1点体力上限并回复1点体力，然后令一名角色摸三张牌。',
			huangjinleishi:'黄巾雷使',
			fulu:'符箓',
			fulu_info:'当你声明使用普通【杀】时，你可以将此【杀】改为雷【杀】。',
			fuji:'助祭',
			fuji_info:'当一名角色造成雷属性伤害时，你可以令其进行判定，若结果为黑色，此伤害+1；若结果为红色，该角色获得判定牌。',
			sp_pangtong:'SP庞统',
			manjuan:'漫卷',
			manjuan_info:'其他角色的牌因弃置而进入弃牌堆后，你可以弃置一张花色与之不同的牌，然后获得此牌。',
			xinmanjuan:'漫卷',
			xinmanjuan_info:'锁定技，当你不因【漫卷】或【醉乡】而获得牌时，你将此牌置入弃牌堆。然后若此时处于你的回合内，则你可以从弃牌堆中选择获得一张与此牌点数相同的其他牌。',
			zuixiang:'醉乡',
			zuixiang2:'醉乡',
			zuixiang_info:'限定技，准备阶段开始时，你可以展示牌堆顶的3张牌并置于你的武将牌上。你不能使用或打出与该些牌同类的牌，所有同类牌对你无效。之后的每个准备阶段，你须重复展示一次，直到这些牌中任意两张点数相同。然后，你获得这些牌。',
			sp_daqiao:'☆SP大乔',
			yanxiao:'言笑',
			yanxiao_info:'出牌阶段，你可以将一张♦牌置于一名角色的判定区内。判定区内有〖言笑〗牌的角色下个判定阶段开始时，其获得判定区里的所有牌。',
			anxian:'安娴',
			anxian_info:'当你使用【杀】对目标角色造成伤害时，你可以防止此伤害，令其弃置一张手牌，然后你摸一张牌；当你成为【杀】的目标后，你可以弃置一张手牌，令此【杀】对你无效，然后此【杀】的使用者摸一张牌。',
			sp_ganning:'☆SP甘宁',
			yinling:'银铃',
			yinling_bg:'锦',
			yinling_info:'出牌阶段，若你的“锦”小于四张，你可以弃置一张黑色牌并指定一名其他角色。若如此做，你将其的一张牌置于你的武将牌上，称为“锦”。',
			junwei:'军威',
			junwei2:'军威',
			junwei_info:'结束阶段开始时，你可以移去三张“锦”。若如此做，你须指定一名角色并令其选择一项：1.展示一张【闪】，然后你将此【闪】交给一名其他角色。2.该角色失去1点体力，然后你将其装备区内的一张牌移出游戏。该角色的回合结束后，将以此法移出游戏的装备牌移回原处。',
			sp_xiahoudun:'☆SP夏侯惇',
			fenyong:'愤勇',
			fenyong2:'愤勇',
			fenyong2_bg:'勇',
			fenyong_info:'每当你受到一次伤害后，你可以获得一枚「愤勇」标记；当你拥有「愤勇」标记时，防止你受到的所有伤害。',
			xuehen:'雪恨',
			xuehen_info:'每个角色的结束阶段开始时，若你有愤勇标记，你弃置之，然后选择一项：1.弃置当前回合角色X张牌（X为你已损失的体力值）；2.视为对一名任意角色使用一张【杀】。',
			sp_lvmeng:'☆SP吕蒙',
			tanhu:'探虎',
			tanhu2:'探虎',
			tanhu3:'探虎',
			tanhu_info:'出牌阶段限一次，你可以与一名其他角色拼点。若你赢，你获得以下效果直到回合结束：你与该角色的距离为1，你对该角色使用的普通锦囊牌不能被【无懈可击】响应。',
			mouduan:'谋断',
			mouduan_info:'游戏开始时，你获得标记“武”并获得技能〖激昂〗和〖谦逊〗。当你失去手牌后，若手牌数不大于2，你须将你的标记变为“文”，将这两项技能改为〖英姿〗和〖克己〗。一名角色的回合开始前，你可弃一张牌将标记翻回。',
			sp_zhangfei:'☆SP张飞',
			jie:'嫉恶',
			jie_info:'锁定技，当你使用红色【杀】造成伤害时，此伤害+1。',
			dahe:'大喝',
			dahe2:'大喝',
			dahe2_bg:'喝',
			dahe_info:'出牌阶段限一次，你可以与一名其他角色拼点。若你赢，该角色不能使用或打出不为♥花色的【闪】直到回合结束，且你可将该角色拼点的牌交给场上一名体力不多于你的角色。若你没赢，你须展示手牌并弃置其中的一张。',
			sp_liubei:'☆SP刘备',
			zhaolie:'昭烈',
			zhaolie_info:'摸牌阶段摸牌时，你可以少摸一张牌并指定攻击范围内的一名角色。你展示牌堆顶的三张牌，将其中的非基本牌和【桃】置于弃牌堆，然后该角色选择一项：1.你对其造成X点伤害，然后其获得这些基本牌；2.其弃置X张牌，然后你获得这些基本牌。（X为其中非基本牌的数量）',
			shichou:'誓仇',
			shichou2:'誓仇',
			shichou_info:'主公技，限定技，准备阶段，你可指定一名蜀势力角色并交给其两张牌。本局游戏中，当你受到伤害时，改为该角色受到等量的伤害并摸等量的牌，直至该角色第一次进入濒死状态。',
			longyufei:'龙羽飞',
			longyi:'龙裔',
			longyi_info:'你可将所有手牌当做任意基本牌使用或打出。若此牌对应的实体牌中：有锦囊牌，你摸一张牌；有装备牌，此牌不可被响应。',
			zhenjue:'阵绝',
			zhenjue_info:'一名角色的结束阶段开始时，若你没有手牌，则你可以令其选择一项：①弃置一张牌。②令你摸一张牌。',
			yj_caocao:'SP曹操',
			yjxiandao:'献刀',
			yjxiandao_info:'每回合限一次。当你对其他角色发动〖赠予〗后，你令其不能使用或打出与本次赠予移动的牌A花色相同的牌直到回合结束。然后若牌A：为锦囊牌，你摸两张牌。为装备牌，你获得其一张不为A的牌。为武器牌，你对其造成1点伤害。',
			yjsancai:'散财',
			yjsancai_info:'出牌阶段限一次，你可以展示所有手牌。若这些牌的类别均相同，则你可以发动一次〖赠予〗（可以选择任意手牌）。',
			yjyibing:'义兵',
			yjyibing_info:'当你不因〖赠予〗而于摸牌阶段外获得牌时，你可以将此次获得的所有牌当做【杀】使用（无距离限制且不计入使用次数）。',
			
			offline_star:'桌游志·SP',
			offline_sticker:'桌游志·贴纸',
			offline_luanwu:'文和乱武',
			offline_yongjian:'用间篇',
			offline_others:'线下其他系列',
		},
	};
});
