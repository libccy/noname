'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'extra',
		connect:true,
		connectBanned:['shen_diaochan'],
		characterSort:{
			extra:{
				extra_feng:['shen_guanyu','shen_lvmeng'],
				extra_huo:['shen_zhugeliang','shen_zhouyu'],
				extra_lin:['shen_caocao','shen_lvbu'],
				extra_shan:['shen_zhaoyun','shen_simayi'],
				extra_yin:['shen_liubei','shen_luxun'],
				extra_lei:['shen_ganning','shen_zhangliao'],
				extra_key:['key_kagari','key_shiki','key_hina'],
				extra_ol:['ol_zhangliao','shen_caopi','shen_zhenji'],
				extra_offline:['shen_diaochan','boss_zhaoyun'],
				extra_mini:['mini_zhugeliang','mini_lvbu','mini_lvmeng'],
			},
		},
		character:{
			key_kagari:['female','shen',3,['kagari_zongsi'],['key']],
			key_shiki:['female','shen','3/5',['shiki_omusubi'],['key']],
			key_hina:['female','shen',3,['hina_shenxian','hina_mashu','hina_tieji'],['key','hiddenSkill']],
			
			shen_diaochan:['female','shen',3,['meihun','huoxin'],['qun']],
			shen_guanyu:['male','shen',5,['new_wuhun','wushen'],['shu']],
			shen_zhaoyun:['male','shen',2,['xinjuejing','relonghun'],['shu']],
			shen_zhugeliang:['male','shen',3,['qixing','kuangfeng','dawu'],['shu']],
			shen_lvmeng:['male','shen',3,['shelie','gongxin'],['wu']],
			shen_zhouyu:['male','shen',4,['yeyan','qinyin'],['wu']],
			shen_simayi:['male','shen',4,['renjie','sbaiyin','lianpo'],['wei']],
			shen_caocao:['male','shen',3,['new_guixin','feiying'],['wei']],
			shen_lvbu:['male','shen',5,['baonu','wumou','ol_wuqian','ol_shenfen'],['qun']],
			
			"shen_liubei":["male","shen",6,["nzry_longnu","nzry_jieying"],["shu"]],
			"shen_luxun":["male","shen",4,["nzry_junlve","nzry_cuike","nzry_dinghuo"],["wu"]],
			"shen_zhangliao":["male","shen",4,["drlt_duorui","drlt_zhiti"],["wei"]],
			"shen_ganning":["male","shen","3/6",["drlt_poxi","drlt_jieying"],["wu"]],
			ol_zhangliao:['male','shen',4,['olduorui','olzhiti'],['wei']],
			shen_caopi:['male','shen',5,['chuyuan','dengji'],['wei']],
			shen_zhenji:['female','shen',4,['shenfu','qixian'],['wei']],
			boss_zhaoyun:['male','shen',1,['boss_juejing','xinlonghun','zhanjiang'],['shu']],
			
			mini_zhugeliang:['male','shen',3,['qixing','minikuangfeng','minidawu'],['shu']],
			mini_lvbu:['male','shen',6,['miniwuqian','minishenfen']],
			mini_lvmeng:['male','shen',3,['shelie','minigongxin'],['wu']],
		},
		characterIntro:{
			shen_guanyu:'关羽，字云长。曾水淹七军、擒于禁、斩庞德、威震华夏，吓得曹操差点迁都躲避，但是东吴偷袭荆州，关羽兵败被害。后传说吕蒙因关羽之魂索命而死。',
			shen_lvmeng:'吕蒙，字子明，汝南富陂人，东吴名将，原有“吴下阿蒙”之贬称，后受孙权劝说，奋发读书，最终成就一代名将。',
			shen_zhouyu:'字公瑾，庐江舒县人。东汉末年名将。有姿貌、精音律，江东有“曲有误，周郎顾”之语。周瑜少与孙策交好，后孙策遇刺身亡，孙权继任。周瑜将兵赴丧，以中护军的身份与长史张昭共掌众事，建安十三年（208年），周瑜率东吴军与刘备军联合，在赤壁击败曹操。此战也奠定了三分天下的基础。',
			shen_zhugeliang:'字孔明、号卧龙，汉族，琅琊阳都人，三国时期蜀汉丞相、杰出的政治家、军事家、发明家、文学家。在世时被封为武乡侯，死后追谥忠武侯，后来东晋政权推崇诸葛亮军事才能，特追封他为武兴王。诸葛亮为匡扶蜀汉政权，呕心沥血、鞠躬尽瘁、死而后已。其代表作有《前出师表》、《后出师表》、《诫子书》等。曾发明木牛流马等，并改造连弩，可一弩十矢俱发。于234年在宝鸡五丈原逝世。',
		},
		characterTitle:{
			//shen_ganning:"体力上限：6",
		},
		characterReplace:{
			shen_zhangliao:['shen_zhangliao','ol_zhangliao'],
			shen_zhugeliang:['shen_zhugeliang','mini_zhugeliang'],
			shen_lvbu:['shen_lvbu','mini_lvbu'],
			shen_lvmeng:['shen_lvmeng','mini_lvmeng'],
			shen_zhaoyun:['shen_zhaoyun','boss_zhaoyun'],
		},
		characterFilter:{
			shen_diaochan:function(mode){
				return mode=='identity'||mode=='doudizhu'||mode=='single'||(mode=='versus'&&_status.mode!='standard'&&_status.mode!='three');
			},
		},
		skill:{
			hina_shenxian:{
				hiddenSkill:true,
				trigger:{player:'showCharacterAfter'},
				forced:true,
				filter:function(event,player){
					return event.toShow.contains('key_hina');
				},
				content:function(){
					player.equip(game.createCard('hina_shenji','diamond',13));
				},
			},
			hina_mashu:{
				mod:{
					globalFrom:function(from,to,distance){
						return distance-1;
					}
				},
			},
			hina_tieji:{
				shaRelated:true,
				trigger:{player:'useCardToPlayered'},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				filter:function(event,player){
					return event.card.name=='sha';
				},
				logTarget:'target',
				content:function(){
					"step 0"
					player.judge(function(){return 0});
					if(!trigger.target.hasSkill('fengyin')){
						trigger.target.addTempSkill('fengyin');
					}
					"step 1"
					var suit=result.suit;
					if(result.suit=='spade'){
						var id=trigger.target.playerid;
						var map=trigger.customArgs;
						if(!map[id]) map[id]={};
						if(!map[id].extraDamage) map[id].extraDamage=0;
						map[id].extraDamage++;
					}
					var target=trigger.target;
					var num=target.countCards('h','shan');
					target.chooseToDiscard('请弃置一张'+get.translation(suit)+'牌，否则不能使用闪抵消此杀','he',function(card){
						return get.suit(card)==_status.event.suit;
					}).set('ai',function(card){
						var num=_status.event.num;
						if(num==0) return 0;
						if(card.name=='shan') return num>1?2:0;
						return 8-get.value(card);
					}).set('num',num).set('suit',suit);
					"step 2"
					if(!result.bool){
						trigger.directHit.add(trigger.target);
					}
				},
				ai:{
					ignoreSkill:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||arg.isLink||!arg.card||arg.card.name!='sha') return false;
						if(!arg.target||get.attitude(player,arg.target)>=0) return false;
						if(!arg.skill||!lib.skill[arg.skill]||lib.skill[arg.skill].charlotte||get.is.locked(arg.skill)||!arg.target.getSkills(true,false).contains(arg.skill)) return false;
					},
				},
			},
			hina_guixin:{
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				filter:function(event,player){
					return player.hasSkill('hina_shenxian');
				},
				content:function(){
					"step 0"
					var targets=game.filterPlayer();
					targets.remove(player);
					targets.sort(lib.sort.seat);
					event.targets=targets;
					"step 1"
					event.num=0;
					player.line(targets,'green');
					player.chooseControl('手牌区','装备区','判定区').set('ai',function(){
						if(game.hasPlayer(function(current){
							return current.countCards('j')&&current!=player&&get.attitude(player,current)>0;
						})) return 2;
						return Math.floor(Math.random()*3);
					}).set('prompt','请选择优先获得的区域');
					"step 2"
					event.range={
						手牌区:['h','e','j'],
						装备区:['e','h','j'],
						判定区:['j','h','e'],
					}[result.control||'手牌区'];
					"step 3"
					if(num<event.targets.length){
						var target=event.targets[num];
						var range=event.range;
						for(var i=0;i<range.length;i++){
							var cards=target.getCards(range[i]);
							if(cards.length){
								var card=cards.randomGet();
								player.gain(card,target,'giveAuto','bySelf');
								break;
							}
						}
						event.num++;
					}
					"step 4"
					if(num<event.targets.length) event.goto(3);
					"step 5"
					player.turnOver();
				},
			},
			hina_shenfen:{
				trigger:{
					player:"phaseJieshuBegin",
				},
				filter:function(event,player){
					return player.hasSkill('hina_shenxian');
				},
				content:function(){
					"step 0"
					event.delay=false;
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					player.line(event.targets,'green');
					event.targets2=event.targets.slice(0);
					event.targets3=event.targets.slice(0);
					"step 1"
					if(event.targets2.length){
						event.targets2.shift().damage('nocard');
						event.redo();
					}
					"step 2"
					if(event.targets.length){
						event.current=event.targets.shift()
						if(event.current.countCards('e')) event.delay=true;
						event.current.discard(event.current.getCards('e')).delay=false;
					}
					"step 3"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets.length) event.goto(2);
					"step 4"
					if(event.targets3.length){
						var target=event.targets3.shift();
						target.chooseToDiscard(4,'h',true).delay=false;
						if(target.countCards('h')) event.delay=true;
					}
					"step 5"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets3.length) event.goto(4);
					"step 6"
					player.turnOver();
				},
			},
			zhanjiang:{
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&players[i].getEquip('qinggang')){
							return true;
						}
					}
				},
				content:function(){
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i]!=player){
							var e=players[i].getEquip('qinggang');
							if(e){
								player.line(players[i],'green');
								players[i].give(e,player);
							}
						}
					}
				}
			},
			boss_juejing:{
				trigger:{player:'phaseDrawBefore'},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					noh:true,
					nogain:true,
				},
				group:'boss_juejing2'
			},
			boss_juejing2:{
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				forced:true,
				filter:function(event,player){
					if(event.name=='gain'&&event.player==player) return player.countCards('h')>4;
					var evt=event.getl(player);
					if(!evt||!evt.hs||evt.hs.length==0||player.countCards('h')>=4) return false;
					var evt=event;
					for(var i=0;i<4;i++){
						evt=evt.getParent('boss_juejing2');
						if(evt.name!='boss_juejing2') return true;
					}
					return false;
				},
				content:function(){
					var num=4-player.countCards('h');
					if(num>0) player.draw(num);
					else player.chooseToDiscard('h',true,-num);
				},
			},
			miniwuqian:{
				audio:'wuqian', 
				trigger:{
					player:'useCardToPlayered',
				},
				filter:function(event,player){
					return (event.card.name=='sha'||event.card.name=='juedou')&&player==_status.currentPhase&&
					player.getHistory('useCard',function(evt){
						return (evt.card.name=='sha'||evt.card.name=='juedou');
					}).indexOf(event.getParent())==0;
				},
				forced:true,
				logTarget:'target',
				content:function(){
					trigger.target.addTempSkill('qinggang2');
					trigger.target.storage.qinggang2.add(trigger.card);
					if(trigger.card.name=='sha'){
						var id=trigger.target.playerid;
						var map=trigger.getParent().customArgs;
						if(!map[id]) map[id]={};
						if(typeof map[id].shanRequired=='number'){
							map[id].shanRequired++;
						}
						else{
							map[id].shanRequired=2;
						}
					}
					else{
						var id=trigger.target.playerid;
						var idt=trigger.target.playerid;
						var map=trigger.getParent().customArgs;
						if(!map[idt]) map[idt]={};
						if(!map[idt].shaReq) map[idt].shaReq={};
						if(!map[idt].shaReq[id]) map[idt].shaReq[id]=1;
						map[idt].shaReq[id]++;
					}
				},
				ai:{
					unequip_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.name=='sha'&&!player.countUsed('sha')) return true;
						return false;
					}
				}
			},
			minishenfen:{
				audio:'ol_shenfen',
				enable:'phaseUse',
				skillAnimation:true,
				animationColor:'metal',
				limited:true,
				content:function(){
					"step 0"
					player.awakenSkill('minishenfen');
					player.loseHp(3);
					event.delay=false;
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					player.line(event.targets,'green');
					event.targets2=event.targets.slice(0);
					event.targets3=event.targets.slice(0);
					"step 1"
					if(event.targets2.length){
						event.targets2.shift().damage('nocard');
						event.redo();
					}
					"step 2"
					if(event.targets.length){
						event.current=event.targets.shift()
						if(event.current.countCards('e')) event.delay=true;
						event.current.discard(event.current.getCards('e')).delay=false;
					}
					"step 3"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets.length) event.goto(2);
					"step 4"
					if(event.targets3.length){
						var target=event.targets3.shift();
						target.chooseToDiscard(4,'h',true).delay=false;
						if(target.countCards('h')) event.delay=true;
					}
					"step 5"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets3.length) event.goto(4);
				},
				ai:{
					order:10,
					result:{
						player:function(player){
							if(player.hp<5||player.hasUnknown()) return 0;
							return game.countPlayer(function(current){
								if(current!=player){
									return get.sgn(get.damageEffect(current,player,player));
								}
							});
						}
					}
				}
			},
			minikuangfeng:{
				audio:'kuangfeng',
				trigger:{player:'phaseUseEnd'},
				direct:true,
				filter:function(event,player){
					return player.getStorage('qixing').length>0;
				},
				content:function(){
					'step 0'
					player.chooseTarget([1,Math.min(game.players.length,player.getStorage('qixing').length)],get.prompt2('minikuangfeng')).set('ai',function(target){
						var player=_status.event.player;
						var eff=get.damageEffect(target,player,player);
						if(target.hp==1||!ui.selected.targets.length) return eff;
						return 0;
					});
					'step 1'
					if(result.bool){
						event.targets=result.targets;
						player.chooseButton(['请选择要移去的“星”',player.getStorage('qixing')],true,result.targets.length).set('ai',function(button){
							return -get.value(button.link);
						});
					}
					else event.finish();
					'step 2'
					var cards=result.links;
					player.logSkill('minikuangfeng',targets);
					player.$throw(cards,2000);
					player.unmarkAuto('qixing',cards);
					game.cardsDiscard(cards);
					for(var i of targets) i.damage();
				},
			},
			minidawu:{
				audio:'dawu',
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.getStorage('qixing').length>0;
				},
				content:function(){
					'step 0'
					player.chooseButton([get.prompt('minidawu'),player.getStorage('qixing')]).set('ai',function(button){
						return 1/Math.max(0.01,get.value(button.link));
					});
					'step 1'
					if(result.bool){
						var cards=result.links;
						player.logSkill('minidawu');
						player.$throw(cards,2000);
						player.unmarkAuto('qixing',cards);
						game.cardsDiscard(cards);
						player.addTempSkill('minidawu2',{player:'phaseBegin'});
					}
				},
			},
			minidawu2:{
				audio:'dawu',
				trigger:{player:'damageBegin3'},
				forced:true,
				charlotte:true,
				content:function(){
					trigger.num--;
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')&&(card.name!='sha'||!player.hasSkill('jiu'))) return 'zerotarget';
						},
					},
				},
			},
			meihun:{
				audio:2,
				trigger:{
					player:'phaseJieshuBegin',
					target:'useCardToTargeted',
				},
				direct:true,
				filter:function(event,player){
					if(event.name!='phaseJieshu'&&event.card.name!='sha') return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('h');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('meihun'),function(card,player,target){
						return target!=player&&target.countCards('h')>0;
					}).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att>0) return 0;
						return 0.1-att/target.countCards('h');
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('meihun',target);
						event.target=target;
						player.chooseControl(lib.suit).set('prompt','请选择一种花色').set('ai',function(){
							return lib.suit.randomGet();
						})
					}
					else event.finish();
					'step 2'
					var suit=result.control;
					player.chat(get.translation(suit+2));
					game.log(player,'选择了','#y'+get.translation(suit+2))
					if(target.countCards('h',{suit:suit})){
						target.chooseCard('h','交给'+get.translation(player)+'一张'+get.translation(suit)+'花色的手牌',true,function(card,player){
							return get.suit(card,player)==_status.event.suit;
						}).set('suit',suit);
					}
					else{
						player.discardPlayerCard(target,true,'h','visible');
						event.finish();
					}
					'step 3'
					if(result.bool&&result.cards&&result.cards.length) player.gain(result.cards,target,'give');
				},
			},
			//Connect Mode support after Angel Beats! -2nd beat-
			huoxin:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(game.countPlayer()<3) return false;
					for(var i of lib.suit){
						if(player.countCards('h',{suit:i})>1) return true;
					}
					return false;
				},
				complexCard:true,
				position:'h',
				filterCard:function(card,player){
					if(!ui.selected.cards.length){
						var suit=get.suit(card);
						return player.countCards('h',function(card2){
							return card!=card2&&get.suit(card2,player)==suit;
						})>0;
					}
					return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
				},
				selectCard:2,
				selectTarget:2,
				filterTarget:lib.filter.notMe,
				multitarget:true,
				multiline:true,
				delay:false,
				check:function(card){
					return 6-get.value(card);
				},
				targetprompt:['拼点发起人','拼点目标'],
				content:function(){
					'step 0'
					player.showCards(cards);
					'step 1'
					var target=targets[0];
					targets.sortBySeat();
					if(target!=targets[0]) cards.reverse();
					for(var i=0;i<targets.length;i++){
						targets[i].gain(cards[i],player,'visible');
						player.$give(cards[i],targets[i]);
					}
					'step 2'
					if(targets[0].canCompare(targets[1])){
						targets[0].chooseToCompare(targets[1]);
					}
					else event.finish();
					'step 3'
					if(result.winner!==targets[0]) targets[0].addMark('huoxin',1);
					if(result.winner!==targets[1]) targets[1].addMark('huoxin',1);
				},
				marktext:'魅',
				intro:{
					name:'魅惑',
					name2:'魅惑',
					content:'mark',
				},
				group:'huoxin_control',
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(target.hasMark('huoxin')) return -2;
							return -1;
						},
					},
				},
			},
			huoxin_control:{
				audio:'huoxin',
				forced:true,
				trigger:{global:'phaseBeginStart'},
				filter:function(event,player){
					return player!=event.player&&!event.player._trueMe&&event.player.countMark('huoxin')>1;
				},
				logTarget:'player',
				skillAnimation:true,
				animationColor:'key',
				content:function(){
					trigger.player.removeMark('huoxin',trigger.player.countMark('huoxin'));
					trigger.player._trueMe=player;
					game.addGlobalSkill('autoswap');
					if(trigger.player==game.me){
						game.notMe=true;
						if(!_status.auto) ui.click.auto();
					}
					trigger.player.addSkill('huoxin2');
				},
			},
			huoxin2:{
				trigger:{
					player:['phaseAfter','dieAfter'],
					global:'phaseBefore',
				},
				lastDo:true,
				charlotte:true,
				forceDie:true,
				forced:true,
				silent:true,
				content:function(){
					player.removeSkill('huoxin2');
				},
				onremove:function(player){
					if(player==game.me){
						if(!game.notMe) game.swapPlayerAuto(player._trueMe)
						else delete game.notMe;
						if(_status.auto) ui.click.auto();
					}
					delete player._trueMe;
				},
			},
			shiki_omusubi:{
				audio:2,
				trigger:{global:'roundStart'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('shiki_omusubi'),lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
							if(player.isHealthy()) return 0;
							if(player.hp<3&&player.getDamagedHp()<2) return 0;
							var list=[];
							if(lib.character[target.name]) list.addArray(lib.character[target.name][3]);
							if(lib.character[target.name1]) list.addArray(lib.character[target.name1][3]);
							if(lib.character[target.name2]) list.addArray(lib.character[target.name2][3]);
							list=list.filter(function(i){
								return !player.hasSkill(i);
							});
							if(!list.length) return 0;
						return 1+Math.random();
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('shiki_omusubi',target);
						player.loseMaxHp();
						var list=[];
						if(lib.character[target.name]) list.addArray(lib.character[target.name][3]);
						if(lib.character[target.name1]) list.addArray(lib.character[target.name1][3]);
						if(lib.character[target.name2]) list.addArray(lib.character[target.name2][3]);
						player.addSkill(list);
						game.broadcastAll(function(list){
							lib.character.key_shiki[3].addArray(list);
							game.expandSkills(list);
							for(var i of list){
								var info=lib.skill[i];
								if(!info) continue;
								if(!info.audioname2) info.audioname2={};
								info.audioname2.key_shiki='shiki_omusubi';
							}
						},list);
					}
				},
			},
			kagari_zongsi:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					var controls=[];
					if(ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
					if(ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
					if(game.hasPlayer(function(current){
						return current.countCards('hej')>0;
					})) controls.push('选择一名角色区域内的一张牌');
					if(!controls.length){event.finish();return;}
					event.controls=controls;
					var next=player.chooseControl();
					next.set('choiceList',controls)
					next.set('prompt','请选择要移动的卡牌的来源');
					next.ai=function(){return 0};
					'step 1'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index=i;break;}
					}
					if(event.index==2){
						player.chooseTarget('请选择要移动的卡牌的来源',true,function(card,kagari,target){
							return target.countCards('hej')>0;
						});
					}
					else{
						var source=ui[event.index==0?'discardPile':'cardPile'].childNodes;
						var list=[];
						for(var i=0;i<source.length;i++) list.push(source[i]);
						player.chooseButton(['请选择要移动的卡牌',list],true).ai=get.buttonValue;
					}
					'step 2'
					if(event.index==2){
						player.line(result.targets[0]);
						event.target1=result.targets[0];
						player.choosePlayerCard(result.targets[0],true,'hej').set('visible',true);
					}
					else{
						event.card=result.links[0];
					}
					'step 3'
					if(event.index==2) event.card=result.cards[0];
					var controls=[
						'将这张牌移动到牌堆的顶部或者底部',
						'将这张牌移动到弃牌堆的顶部或者底部',
						'将这张牌移动到一名角色对应的区域里',
					];
					event.controls=controls;
					var next=player.chooseControl();
					next.set('prompt','要对'+get.translation(event.card)+'做什么呢？');
					next.set('choiceList',controls);
					next.ai=function(){return 2};
					'step 4'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index2=i;break;}
					}
					if(event.index2==2){
						player.chooseTarget('要将'+get.translation(card)+'移动到哪一名角色的对应区域呢',true).ai=function(target){
							return target==_status.event.player?1:0;
						};
					}
					else{
						player.chooseControl('顶部','底部').set('prompt','把'+get.translation(card)+'移动到'+(event.index2==0?'弃':'')+'牌堆的...');
					}
					'step 5'
					if(event.index2!=2){
						//if(event.target1) event.target1.lose(card,ui.special);
						//else card.goto(ui.special);
						event.way=result.control;
					}
					else{
						event.target2=result.targets[0];
						var list=['手牌区'];
						if(lib.card[card.name].type=='equip'&&event.target2.isEmpty(lib.card[card.name].subtype)) list.push('装备区');
						if(lib.card[card.name].type=='delay'&&!event.target2.storage._disableJudge&&!event.target2.hasJudge(card.name)) list.push('判定区');
						if(list.length==1) event._result={control:list[0]};
						else{
							player.chooseControl(list).set('prompt','把'+get.translation(card)+'移动到'+get.translation(event.target2)+'的...').ai=function(){return 0};
						}
					}
					'step 6'
					if(event.index2!=2){
						var node=ui[event.index==0?'discardPile':'cardPile'];
						if(event.target1){
							var next=event.target1.lose(card,event.position);
							if(event.way=='顶部') next.insert_card=true;
						}
						else{
							if(event.way=='底部') node.appendChild(card);
							else node.insertBefore(card,node.firstChild);
						}
						game.updateRoundNumber();
						event.finish();
					}
					else{
						if(result.control=='手牌区'){
							var next=event.target2.gain(card);
							if(event.target1){
								next.source=event.target1;
								next.animate='giveAuto';
							}
							else next.animate='draw';
						}
						else if(result.control=='装备区'){
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.equip(card);
						}
						else{
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.addJudge(card);
						}
					}
					'step 7'
					game.updateRoundNumber();
				},
				ai:{
					order:10,
					result:{player:1},
				},
			},
			
			caopi_xingdong:{
				audio:'olfangquan',
				audioname:['shen_caopi'],
				subSkill:{
					mark:{
						mark:true,
						marktext:'令',
						intro:{
							content:'跳过下个回合的判定阶段和摸牌阶段',
						},
					},
				},
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h',lib.skill.caopi_xingdong.filterCard);
				},
				filterCard:function(card){
					return card.name=='sha'||get.type(card)=='trick';
				},
				check:function(card){return 1},
				filterTarget:lib.filter.notMe,
				discard:false,
				lose:false,
				delay:0,
				content:function(){
					'step 0'
					target.gain(cards,player,'give');
					'step 1'
					target.chooseUseTarget(cards[0],game.filterPlayer(function(current){
						return current!=player;
					}),'请使用得到的牌，或者跳过下回合的判定阶段和摸牌阶段');
					'step 2'
					if(result.bool) game.asyncDraw([player,target]);
					else{
						target.addTempSkill('caopi_xingdong_mark','phaseJudgeSkipped');
						target.skip('phaseJudge');
						target.skip('phaseDraw');
						event.finish();
					}
					'step 3'
					game.delay();
				},
				ai:{
					order:12,
					result:{
						target:function(player,target){
							var card=ui.selected.cards[0];
							if(target.hasSkill('pingkou')) return 1;
							if(!card) return 0;
							var info=get.info(card);
							if(info.selectTarget==-1){
								var eff=0;
								game.countPlayer(function(current){
									if(current!=player&&target.canUse(card,current)) eff+=get.effect(current,card,target,target)>0
								});
								if(eff>0||get.value(card)<3) return eff;
								return 0;
							}
							else if(game.hasPlayer(function(current){
								return current!=player&&target.canUse(card,current)&&get.effect(current,card,target,target)>0
							})) return 1.5;
							else if(get.value(card)<3) return -1;
							return 0;
						},
					},
				},
			},
			shenfu:{
				audio:2,
				trigger:{player:'phaseEnd'},
				direct:true,
				content:function(){
					'step 0'
					event.logged=false;
					event.targets=[];
					event.goto(player.countCards('h')%2==1?1:4);
					'step 1'
					player.chooseTarget(get.prompt('shenfu'),'对一名其他角色造成1点雷属性伤害',lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player,'thunder')*(target.hp==1?2:1);
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						if(!event.logged){
							event.logged=true;
							player.logSkill('shenfu',target,'thunder');
						}
						else player.line(target,'thunder');
						target.damage('thunder');
					}
					else event.finish();
					'step 3'
					if(target.isDead()) event.goto(1);
					else event.finish();
					'step 4'
					player.chooseTarget(get.prompt('shenfu'),'令一名角色摸一张牌或弃置其一张手牌',function(card,player,target){
						return !_status.event.getParent().targets.contains(target);
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						var delta=target.hp-target.countCards('h');
						if(Math.abs(delta)==1&&get.sgn(delta)==get.sgn(att)) return 3*Math.abs(att);
						if(att>0||target.countCards('h')>0) return Math.abs(att);
						return 0;
					});
					'step 5'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						if(!event.logged){
							event.logged=true;
							player.logSkill('shenfu',target);
						}
						else player.line(target,'green');
						targets.push(target);
						if(!target.countCards('h')) event._result={bool:false};
						else player.discardPlayerCard(target,'h','弃置'+get.translation(target)+'一张手牌，或点【取消】令其摸一张牌。');
					}
					else event.finish();
					'step 6'
					if(!result.bool) target.draw();
					'step 7'
					if(target.hp==target.countCards('h')) event.goto(4);
				},
				ai:{expose:0.25},
			},
			qixian:{
				mod:{
					maxHandcardBase:function(player,num){
						return 7;
					},
				},
			},
			chuyuan:{
				audio:2,
				trigger:{global:'damageEnd'},
				filter:function(event,player){
					return event.player.isAlive()&&player.getStorage('chuyuan').length<player.maxHp;
				},
				logTarget:'player',
				locked:false,
				content:function(){
					'step 0'
					trigger.player.draw();
					'step 1'
					if(!trigger.player.countCards('h')) event.finish();
					else trigger.player.chooseCard('h',true,'选择一张牌置于'+get.translation(player)+'的武将牌上作为「储」');
					'step 2'
					trigger.player.lose(result.cards,ui.special,'visible','toStorage');
					trigger.player.$give(result.cards,player,false);
					game.log(trigger.player,'选择了',result.cards);
					player.markAuto('chuyuan',result.cards);
				},
				//mod:{
				//	maxHandcard:function(player,num){
				//		return num+player.getStorage('chuyuan').length;
				//	},
				//},
				intro:{
					content:'cards',
					onunmark:'throw',
				},
			},
			dengji:{
				audio:2,
				derivation:['tianxing','new_rejianxiong','rerende','rezhiheng','olluanji','caopi_xingdong'],
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'water',
				filter:function(event,player){
					return player.getStorage('chuyuan').length>=3;
				},
				content:function(){
					player.awakenSkill(event.name);
					player.addSkill('tianxing');
					player.addSkill('new_rejianxiong');
					player.loseMaxHp();
					player.gain(player.storage.chuyuan,'gain2','fromStorage');
					player.unmarkAuto('chuyuan',player.storage.chuyuan);
				},
			},
			tianxing:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.getStorage('chuyuan').length>=3;
				},
				content:function(){
					'step 0'
					player.awakenSkill(event.name);
					player.loseMaxHp();
					player.gain(player.storage.chuyuan,'gain2','fromStorage');
					player.unmarkAuto('chuyuan',player.storage.chuyuan);
					player.removeSkill('chuyuan');
					player.chooseControl('rerende','rezhiheng','olluanji','caopi_xingdong').set('prompt','选择获得一个技能').set('ai',function(){
						var player=_status.event.player;
						if(!player.hasSkill('luanji')&&!player.hasSkill('olluanji')&&player.getUseValue({name:'wanjian'})>4) return 'olluanji';
						if(!player.hasSkill('rezhiheng')) return 'rezhiheng';
						if(!player.hasSkill('caopi_xingdong')) return 'caopi_xingdong';
						return 'rerende';
					});
					'step 1'
					player.addSkillLog(result.control);
				},
			},
			olzhiti:{
				audio:'drlt_zhiti',
				global:'olzhiti2',
				mod:{
					maxHandcard:function(player,num){
						if(game.hasPlayer(function(current){
							return current.isDamaged();
						})) return num+1;
					},
				},
				trigger:{player:['phaseDrawBegin2','phaseEnd']},
				forced:true,
				filter:function(event,player){
					var num=event.name=='phase'?5:3;
					if(num==3?event.numFixed:!game.hasPlayer(function(current){
						return current.countDisabled()<5;
					})) return false;
					return game.countPlayer(function(current){
						return current.isDamaged();
					})>=num;
				},
				direct:true,
				content:function(){
					'step 0'
					if(trigger.name=='phaseDraw'){
						player.logSkill('olzhiti');
						trigger.num++;
						event.finish();
					}
					else{
						player.chooseTarget(get.prompt('olzhiti'),'废除一名角色的一个随机装备栏',function(card,player,target){
							return target.countDisabled()<5;
						}).set('ai',function(target){
							return -get.attitude(_status.event.player,target)*(target.countCards('e')+1)
						});
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('olzhiti',target);
						var list=[];
						for(var i=1;i<6;i++){
							if(!target.isDisabled(i)) list.add((i==3||i==4)?6:i);
						}
						var num=list.randomGet();
						if(num!=6) target.disableEquip(num);
						else{
							target.disableEquip(3);
							target.disableEquip(4);
						}
					}
				},
			},
			olzhiti2:{
				mod:{
					maxHandcard:function(player,num){
						if(player.isDamaged()) return num-game.countPlayer(function(current){
							return current.hasSkill('olzhiti')&&current.inRange(player);
						})
					},
				},
			},
			olduorui:{
				audio:'drlt_duorui',
				trigger:{
					source:'damageSource'
				},
				filter:function(event,player){
					if(!player.isPhaseUsing()||event.player.isDead()) return false;
					for(var i in event.player.disabledSkills){
						if(event.player.disabledSkills[i].contains('olduorui2')) return false;
					}
					var list=[];
					var listm=[];
					var listv=[];
					if(event.player.name1!=undefined) listm=lib.character[event.player.name1][3];
					else listm=lib.character[event.player.name][3];
					if(event.player.name2!=undefined) listv=lib.character[event.player.name2][3];
					listm=listm.concat(listv);
					var func=function(skill){
						var info=get.info(skill);
						if(!info||info.charlotte) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					return list.length>0;
				},
				check:function(event,player){
					if(get.attitude(player,event.player)>=0) return false;
					if(event.getParent('phaseUse').skipped) return true;
					var nd=player.needsToDiscard();
					return player.countCards('h',function(card){
						return player.getUseValue(card,null,true)>0&&(nd?true:get.tag(card,'damage')>0);
					})==0;
				},
				logTarget:'player',
				content:function(){
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
						if(!info||info.charlotte) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					event.skills=list;
					player.chooseControl(list).set('prompt','选择'+get.translation(trigger.player)+'武将牌上的一个技能并令其失效');
					'step 1'
					trigger.player.disableSkill('olduorui2',result.control);
					trigger.player.addTempSkill('olduorui2',{player:'phaseAfter'});
					game.log(player,'选择了',trigger.player,'的技能','#g【'+get.translation(result.control)+'】');
					event.getParent('phaseUse').skipped=true;
				},
			},
			olduorui2:{
				onremove:function(player,skill){
					player.enableSkill(skill);
				},
				locked:true,
				mark:true,
				charlotte:true,
				intro:{
					content:function(storage,player,skill){
						var list=[];
						for(var i in player.disabledSkills){
							if(player.disabledSkills[i].contains(skill)) list.push(i);
						};
						if(list.length){
							var str='失效技能：';
							for(var i=0;i<list.length;i++){
								if(lib.translate[list[i]+'_info']) str+=get.translation(list[i])+'、';
							};
							return str.slice(0,str.length-1);
						};
					},
				},
			},
			wuhun21:{audio:true},
			wuhun22:{
				audio:true,
				skillAnimation:true,
				animationColor:'soil',
			},
			wuhun23:{
				audio:true,
				skillAnimation:true,
				animationColor:'soil',
			},
			"new_wuhun":{
				audio:"wuhun21",
				group:["new_wuhun_mark","new_wuhun_die","wuhun22","wuhun23"],
				trigger:{
					player:"damageEnd",
				},
				forced:true,
				filter:function (event,player){
					return event.source!=undefined;
				},
				content:function (){
				trigger.source.addMark('new_wuhun_mark',trigger.num);
				},
				subSkill:{
					die:{
						//audio:"wuhun2",
						skillAnimation:true,
						animationColor:'soil',
						trigger:{
							player:"die",
						},
						forced:true,
						forceDie:true,
						direct:true,
						filter:function (event,player){
							return game.hasPlayer(function(current){
								return current!=player&&current.hasMark('new_wuhun_mark');
							});
						},
						content:function (){
							"step 0"
							var num=0;
							for(var i=0;i<game.players.length;i++){
								var current=game.players[i];
								if(current!=player&&current.countMark('new_wuhun_mark')>num){
									num=current.countMark('new_wuhun_mark');
								}
							}
							player.chooseTarget(true,'请选择【武魂】的目标',function(card,player,target){
								return target!=player&&target.countMark('new_wuhun_mark')==_status.event.num;
							}).set('ai',function(target){
								return -get.attitude(_status.event.player,target);
							}).set('forceDie',true).set('num',num);
							"step 1"
							if(result.bool&&result.targets&&result.targets.length){
								var target=result.targets[0];
								event.target=target;
								player.logSkill(Math.random()<0.5?'wuhun22':'wuhun23',target);
								player.line(target,{color:[255, 255, 0]});
								game.delay(2);
							}
							"step 2"
							target.judge(function(card){
								if(['tao','taoyuan'].contains(card.name)) return 10;
								return -10;
							});
							"step 3"
							if(!result.bool){
								lib.element.player.die.apply(target,[]);
							}
						},
						sub:true,
					},
					mark:{
						marktext:"魇",
						intro:{
							name:"梦魇",
							content:"mark",
						},
						sub:true,
					},
				},
				ai:{
					threaten:0.01,
					notemp:true,
				},
			},
			"new_guixin":{
				audio:"guixin",
				trigger:{
					player:"damageEnd",
				},
				check:function (event,player){
					if(player.isTurnedOver()||event.num>1) return true;
					var num=game.countPlayer(function(current){
						if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
							return true;
						}
						if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
							return true;
						}
					});
					return num>=2;
				},
				content:function (){
					"step 0"
					var targets=game.filterPlayer();
					targets.remove(player);
					targets.sort(lib.sort.seat);
					event.targets=targets;
					event.count=trigger.num;
					"step 1"
					event.num=0;
					player.line(targets,'green');
					player.chooseControl('手牌区','装备区','判定区').set('ai',function(){
						if(game.hasPlayer(function(current){
							return current.countCards('j')&&current!=player&&get.attitude(player,current)>0;
						})) return 2;
						return Math.floor(Math.random()*3);
					}).set('prompt','请选择优先获得的区域');
					"step 2"
					event.range={
						手牌区:['h','e','j'],
						装备区:['e','h','j'],
						判定区:['j','h','e'],
					}[result.control||'手牌区'];
					"step 3"
					if(num<event.targets.length){
						var target=event.targets[num];
						var range=event.range;
						for(var i=0;i<range.length;i++){
							var cards=target.getCards(range[i]);
							if(cards.length){
								var card=cards.randomGet();
								player.gain(card,target,'giveAuto','bySelf');
								break;
							}
						}
						event.num++;
					}
					"step 4"
					if(num<event.targets.length) event.goto(3);
					"step 5"
					player.turnOver();
					"step 6"
					event.count--;
					if(event.count){
						player.chooseBool(get.prompt2('new_guixin')).ai=function(){
							return lib.skill.new_guixin.check({num:event.count},player);
						};
					}
					else{
						event.finish();
					}
					"step 7"
					if(event.count&&result.bool){
						player.logSkill('new_guixin');
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					threaten:function (player,target){
						if(target.hp==1) return 2.5;
						return 1;
					},
					effect:{
						target:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp==1) return 0.8;
								if(target.isTurnedOver()) return [0,3];
								var num=game.countPlayer(function(current){
									if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
										return true;
									}
									if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
										return true;
									}
								});
								if(num>2) return [0,1];
								if(num==2) return [0.5,1];
							}
						},
					},
				},
			},
			ol_shenfen:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countMark('baonu')>=6;
				},
				usable:1,
				skillAnimation:true,
				animationColor:'metal',
				content:function(){
					"step 0"
					event.delay=false;
					player.removeMark('baonu',6);
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					player.line(event.targets,'green');
					event.targets2=event.targets.slice(0);
					event.targets3=event.targets.slice(0);
					"step 1"
					if(event.targets2.length){
						event.targets2.shift().damage('nocard');
						event.redo();
					}
					"step 2"
					if(event.targets.length){
						event.current=event.targets.shift()
						if(event.current.countCards('e')) event.delay=true;
						event.current.discard(event.current.getCards('e')).delay=false;
					}
					"step 3"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets.length) event.goto(2);
					"step 4"
					if(event.targets3.length){
						var target=event.targets3.shift();
						target.chooseToDiscard(4,'h',true).delay=false;
						if(target.countCards('h')) event.delay=true;
					}
					"step 5"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets3.length) event.goto(4);
					"step 6"
					player.turnOver();
				},
				ai:{
					combo:'baonu',
					order:10,
					result:{
						player:function(player){
							return game.countPlayer(function(current){
								if(current!=player){
									return get.sgn(get.damageEffect(current,player,player));
								}
							});
						}
					}
				}
			},
			ol_wuqian:{
				audio:2,
				enable:'phaseUse',
				derivation:'wushuang',
				filter:function(event,player){
					return player.countMark('baonu')>=2;
				},
				filterTarget:function(card,player,target){
					return target!=player&&!target.hasSkill('ol_wuqian_targeted');
				},
				content:function(){
					player.removeMark('baonu',2);
					player.addTempSkill('wushuang');
					player.storage.ol_wuqian_target=target;
					player.addTempSkill('ol_wuqian_target');
					target.addTempSkill('ol_wuqian_targeted');
				},
				subSkill:{
					equip:{
						ai:{
							unequip:true,
							skillTagFilter:function(player,tag,arg){
								if(arg&&arg.target&&arg.target.hasSkill('ol_wuqian_targeted')) return true;
								return false;
							}
						}
					},
					targeted:{ai:{unequip2:true}},
					target:{
						mark:'character',
						onremove:true,
						intro:{
							content:'获得无双且$防具失效直到回合结束'
						},
					}
				}
			},
			wumou:{
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event){
					return get.type(event.card)=='trick';
				},
				content:function(){
					'step 0'
					if(player.hasMark('baonu')){
						player.chooseControlList([
							'移去一枚【暴怒】标记',
							'失去一点体力'
						],true).set('ai',function(event,player){
							if(player.storage.baonu>6) return 0;
							if(player.hp+player.num('h','tao')>3) return 1;
							return 0;
						});
					}
					else{
						player.loseHp();
						event.finish();
					}
					'step 1'
					if(result.index==0){
						player.removeMark('baonu',1);
					}
					else{
						player.loseHp();
					}
				},
				ai:{
					effect:{
						player:function(card,player){
							if (get.type(card)=='trick'&&get.value(card)<6){
								return [0,-2];
							}
						}
					}
				}
			},
			qinyin:{
				audio:2,
				trigger:{player:'phaseDiscardEnd'},
				direct:true,
				filter:function(event,player){
					var cards=[];
					player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event) cards.addArray(evt.cards2);
					});
					return cards.length>1;
				},
				content:function(){
					"step 0"
					event.forceDie=true;
					if(typeof event.count!='number'){
						// event.count=trigger.cards.length-1;
						event.count=1;
					}
					var recover=0,lose=0,players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].hp<players[i].maxHp){
							if(get.attitude(player,players[i])>0){
								if(players[i].hp<2){
									lose--;
									recover+=0.5;
								}
								lose--;
								recover++;
							}
							else if(get.attitude(player,players[i])<0){
								if(players[i].hp<2){
									lose++;
									recover-=0.5;
								}
								lose++;
								recover--;
							}
						}
						else{
							if(get.attitude(player,players[i])>0){
								lose--;
							}
							else if(get.attitude(player,players[i])<0){
								lose++;
							}
						}
					}
					var prompt=get.prompt('qinyin')+'（剩余'+get.cnNumber(event.count)+'次）';
					player.chooseControl('失去体力','回复体力','cancel2',
					ui.create.dialog(get.prompt('qinyin'),'hidden')).ai=function(){
						if(lose>recover&&lose>0) return 0;
						if(lose<recover&&recover>0) return 1;
						return 2;
					}
					"step 1"
					if(result.control=='cancel2'){
						event.finish();
					}
					else{
						player.logSkill('qinyin');
						event.bool=(result.control=='回复体力');
						event.num=0;
						event.players=game.filterPlayer();
					}
					"step 2"
					if(event.num<event.players.length){
						var target=event.players[event.num];
						if(event.bool){
							target.recover();
						}
						else{
							target.loseHp();
						}
						event.num++;
						event.redo();
					}
					"step 3"
					if(event.count>1){
						event.count--;
						event.goto(0);
					}
				},
				ai:{
					expose:0.1,
					threaten:2
				}
			},
			lianpo:{
				audio:2,
				trigger:{global:'phaseAfter'},
				frequent:true,
				filter:function(event,player){
					return player.getStat('kill')>0;
				},
				content:function(){
					player.insertPhase();
				}
			},
			baonu:{
				audio:2,
				marktext:'暴',
				unique:true,
				trigger:{
					source:'damageSource',
					player:['damageEnd','enterGame'],
					global:'gameDrawAfter',
				},
				forced:true,
				filter:function(event){
					return event.name!='damage'||event.num>0; 
				},
				content:function(){
					player.addMark('baonu',trigger.name=='damage'?trigger.num:2);
				},
				intro:{
					name:'暴怒',
					content:'mark'
				},
				ai:{
					combo:'ol_shenfen',
					maixie:true,
					maixie_hp:true
				}
			},
			shenfen:{
				audio:2,
				unique:true,
				enable:'phaseUse',
				filter:function(event,player){
					return player.storage.baonu>=6;
				},
				skillAnimation:true,
				animationColor:'metal',
				limited:true,
				content:function(){
					"step 0"
					player.awakenSkill('shenfen');
					player.storage.baonu-=6;
					player.markSkill('baonu');
					player.syncStorage('baonu');
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					event.targets2=event.targets.slice(0);
					player.line(event.targets,'green');
					"step 1"
					if(event.targets.length){
						event.targets.shift().damage();
						event.redo();
					}
					"step 2"
					if(event.targets2.length){
						var cur=event.targets2.shift();
						if(cur&&cur.countCards('he')){
							cur.chooseToDiscard('he',true,4);
						}
						event.redo();
					}
				},
				ai:{
					order:10,
					result:{
						player:function(player){
							return game.countPlayer(function(current){
								if(current!=player){
									return get.sgn(get.damageEffect(current,player,player));
								}
							});
						}
					}
				}
			},
			wuqian:{
				audio:2,
				enable:'phaseUse',
				derivation:'wushuang',
				filter:function(event,player){
					return player.storage.baonu>=2&&!player.hasSkill('wushuang');
				},
				content:function(){
					player.storage.baonu-=2;
					player.addTempSkill('wushuang');
				},
				ai:{
					order:5,
					result:{
						player:function(player){
							if(!player.storage.shenfen) return 0;
							var cards=player.getCards('h','sha');
							if(cards.length){
								if(game.hasPlayer(function(current){
									return (player.canUse('sha',current)&&
									get.effect(current,cards[0],player,player)>0&&current.hasShan());
								})){
									return 1;
								}
							}
							return 0;
						}
					}
				}
			},
			renjie:{
				audio:'renjie2',
				trigger:{player:'damageEnd'},
				forced:true,
				unique:true,
				group:'renjie2',
				notemp:true,
				//mark:true,
				filter:function(event){
					return event.num>0;
				},
				content:function(){
					player.addMark('renjie',trigger.num);
				},
				intro:{
					name2:'忍',
					content:'mark'
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					combo:'sbaiyin',
					/*effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
							if(get.tag(card,'damage')){
								if(target.hp==target.maxHp){
									if(!target.hasSkill('jilue')){
										return [0,1];
									}
									return [0.7,1];
								}
								return 0.7;
							}
						},
						player:function(card,player){
							if(_status.currentPhase!=player) return;
							if(_status.event.name!='chooseToUse'||_status.event.player!=player) return;
							if(get.type(card)=='basic') return;
							if(get.tag(card,'gain')) return;
							if(get.value(card,player,'raw')>=7) return;
							if(player.hp<=2) return;
							if(!player.hasSkill('jilue')||player.storage.renjie==0){
								return 'zeroplayertarget';
							}
						}
					}*/
				}
			},
			renjie2:{
				audio:2,
				trigger:{player:'loseAfter'},
				forced:true,
				filter:function(event,player){
					if(event.type!='discard'||!event.cards2) return false;
					var evt=event.getParent('phaseDiscard');
					return evt&&evt.name=='phaseDiscard'&&evt.player==player;
				},
				content:function(){
					player.addMark('renjie',trigger.cards2.length);
				}
			},
			sbaiyin:{
				skillAnimation:'epic',
				animationColor:'thunder',
				juexingji:true,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				unique:true,
				audio:2,
				filter:function(event,player){
					return player.countMark('renjie')>=4;
				},
				content:function(){
					player.loseMaxHp();
					player.addSkill('jilue');
					player.awakenSkill('sbaiyin');
				}
			},
			jilue:{
				unique:true,
				group:['jilue_guicai','jilue_fangzhu','jilue_wansha','jilue_zhiheng','jilue_jizhi','jilue_jizhi_clear']
			},
			jilue_guicai:{
				audio:1,
				trigger:{global:'judge'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0&&player.hasMark('renjie');
				},
				content:function(){
					"step 0"
					player.chooseCard('是否弃置一枚“忍”，并发动〖鬼才〗？','he',function(card){
  				var player=_status.event.player;
  				var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
  				if(mod2!='unchanged') return mod2;
  				var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
  				if(mod!='unchanged') return mod;
  				return true;
					}).ai=function(card){
						var trigger=_status.event.parent._trigger;
						var player=_status.event.player;
						var result=trigger.judge(card)-trigger.judge(trigger.player.judging[0]);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result-get.value(card)/2;
						}
						else{
							return -result-get.value(card)/2;
						}
					};
					"step 1"
					if(result.bool){
						player.respond(result.cards,'highlight','jilue_guicai','noOrdering');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.removeMark('renjie',1);
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.delete();
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
						rejudge:1,
					}
				}
			},
			jilue_fangzhu:{
				audio:1,
				trigger:{player:'damageEnd'},
				direct:true,
				//priority:-1,
				filter:function(event,player){
					return player.hasMark('renjie');
				},
				content:function(){
					"step 0"
					player.chooseTarget('是否弃置一枚“忍”，并发动【放逐】？',function(card,player,target){
						return player!=target
					}).ai=function(target){
						if(target.hasSkillTag('noturn')) return 0;
						if(target.isTurnedOver()){
							return get.attitude(player,target)-1;
						}
						else{
							if(player.maxHp-player.hp==1){
								return -get.attitude(player,target)-1;
							}
						}
						return 0;
					}
					"step 1"
					if(result.bool){
						player.removeMark('renjie',1);
						player.logSkill('jilue_fangzhu',result.targets);
						result.targets[0].draw(player.maxHp-player.hp);
						result.targets[0].turnOver();
					}
				},
			},
			jilue_wansha:{
				audio:'wansha',
				audioname:['shen_simayi'],
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasMark('renjie');
				},
				content:function(){
					player.removeMark('renjie',1);
					player.addTempSkill('wansha');
				}
			},
			jilue_zhiheng:{
				audio:1,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasMark('renjie');
				},
				position:'he',
				filterCard:lib.filter.cardDiscardable,
				discard:false,
				lose:false,
				delay:false,
				selectCard:[1,Infinity],
				prompt:'弃置一枚“忍”，然后弃置任意张牌并摸等量的牌。若弃置了所有的手牌，则可以多摸一张牌。',
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='h'&&!player.countCards('h',function(card){
						return get.value(card)>=8;
					})){
						return 8-get.value(card);
					}
					return 6-get.value(card)
				},
				content:function(){
					'step 0'
					player.removeMark('renjie',1);
					player.discard(cards);
					event.num=1;
					var hs=player.getCards('h');
					if(!hs.length) event.num=0;
					for(var i=0;i<hs.length;i++){
						if(!cards.contains(hs[i])){
							event.num=0;break;
						}
					}
					'step 1'
					player.draw(event.num+cards.length);
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							var num=0;
							var cards=player.getCards('he');
							for(var i=0;i<cards.length;i++){
								if(get.value(cards[i])<6){
									num++;
								}
							}
							if(cards.length>2) return 1;
							if(cards.length==2&&player.storage.jilue>1);
							return 0;
						}
					},
					threaten:1.5
				},
			},
			jilue_jizhi:{
				audio:1,
				trigger:{player:'useCard'},
				filter:function(event,player){
					return (get.type(event.card,'trick')=='trick'&&event.card.isCard&&player.hasMark('renjie'));
				},
				init:function(player){
					player.storage.jilue_jizhi=0;
				},
				content:function(){
					'step 0'
					player.removeMark('renjie',1);
					player.draw();
					'step 1'
					event.card=result[0];
					if(get.type(event.card)=='basic'){
						player.chooseBool('是否弃置'+get.translation(event.card)+'并令本回合手牌上限+1？').set('ai',function(evt,player){
							return _status.currentPhase==player&&player.needsToDiscard(-3)&&_status.event.value<6;
						}).set('value',get.value(event.card,player));
					}
					'step 2'
					if(result.bool){
						player.discard(event.card);
						player.storage.jilue_jizhi++;
						if(_status.currentPhase==player){
							player.markSkill('jilue_jizhi');
						}
					}
				},
				ai:{
					threaten:1.4
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.storage.jilue_jizhi;
					}
				},
				intro:{
					content:'本回合手牌上限+#',
				},
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.storage.jilue_jizhi=0;
							player.unmarkSkill('jilue_jizhi');
						}
					}
				}
			},
			wushen:{
				mod:{
					cardname:function(card,player,name){
						if(get.suit(card)=='heart') return 'sha';
					},
					cardnature:function(card,player){
						if(get.suit(card)=='heart') return false;
					},
					targetInRange:function(card){
						if(get.suit(card)=='heart') return true;
					},
					cardUsable:function(card){
						if(card.name=='sha'&&get.suit(card)=='heart') return Infinity;
					}
				},
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&get.suit(event.card)=='heart';
				},
				content:function(){
					trigger.directHit.addArray(game.players);
					if(trigger.addCount!==false){
 					trigger.addCount=false;
 					if(player.stat[player.stat.length-1].card.sha>0){
 						player.stat[player.stat.length-1].card.sha--;
 					}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondSha')&&current<0) return 0.6
						}
					},
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return arg.card.name=='sha'&&get.suit(arg.card)=='heart';
					},
				}
			},
			wuhun:{
				trigger:{
					player:"damageEnd",
				},
				//alter:true,
				filter:function (event,player){
					if(event.source==undefined) return false;
					if(!get.is.altered('wuhun')) return false	
					return true;
				},
				forced:true,
				content:function (){
					if(!trigger.source.storage.wuhun_mark){
						trigger.source.storage.wuhun_mark=0;
					}				 
					trigger.source.storage.wuhun_mark+=trigger.num;
					trigger.source.syncStorage('wuhun_mark');
					trigger.source.markSkill('wuhun_mark');
				},
				global:["wuhun_mark"],
				subSkill:{
					mark:{
						marktext:"魇",
						intro:{
							content:"mark",
						},
						sub:true,
					},
				},
		 		group:["wuhun2","wuhun4","wuhun5"],
			},
			wuhun2:{
				trigger:{
				player:'dieBegin',
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].storage.wuhun_mark) return true;
					}
					return false;
				},
				content:function (){
					"step 0"
					player.chooseTarget(true,get.prompt('wuhun2'),function(card,player,target){
						if(player==target) return false;
						if(!target.storage.wuhun_mark) return false;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].storage.wuhun_mark>target.storage.wuhun_mark){
								return false;
							}
						}
						return true;
					}).set('ai',function(target){
						return -ai.get.attitude(_status.event.player,target);
					});
					"step 1"
						player.line(result.targets[0],'fire');
						result.targets[0].addSkill('wuhun3')
				},
				ai:{
					threaten:0.5,
					effect:{
						target:function (card,player,target,current){
							if(get.tag(card,'damage')){
								if(player.hasSkill('jueqing')) return [1,-5];
								var hasfriend=false;
								for(var i=0;i<game.players.length;i++){
									if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
										hasfriend=true;break;
									}
								}
								if(!hasfriend) return;
								if(player.hp>2&&ai.get.attitude(player,target)<=0) return [0,2];
								return [1,0,0,-player.hp];
							}
						},
					},
				},
			},
			wuhun3:{
				audio:3,
				trigger:{
					global:'dieAfter',
				},
				forced:true,
				content:function (){
					"step 0"
					player.judge(function(card){
						if(card.name=='tao'||card.name=='taoyuan') return 2;
						return -2;
					})
					"step 1"
					if(result.judge==-2){
						player.die();
					}
					player.removeSkill('wuhun3');
				},
			},
			wuhun4:{
				trigger:{
					player:'dieAfter',
				},
				forced:true,
				popup:false,
				content:function (){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].storage.wuhun_mark){
							game.players[i].storage.wuhun_mark=0;
							game.players[i].unmarkSkill('wuhun_mark');
						}
					}
				},
			},
			wuhun5:{
				trigger:{player:'dieBegin'},
				forced:true,
				popup:false,
				filter:function(event){
					if(event.source!=player&&event.source!=undefined&&!get.is.altered('wuhun')) return true							 
					return false;
				},
				content:function(){
					trigger.source.addSkill('wuhun6');
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 0.5;
					},
					effect:{
						target:function(card,player,target,current){
							if(target.hp<=1&&get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-5];
								if(!target.hasFriend()) return;
								if(player.hp>2&&get.attitude(player,target)<=0) return [0,2];
								return [1,0,0,-player.hp];
							}
						}
					}
				}
			},
			wuhun6:{
				audio:3,
				trigger:{global:'dieAfter'},
				forced:true,
				content:function(){
					if(player.hp<Infinity){
						player.loseHp(player.hp);
					}
					player.removeSkill('wuhun6');
				}
			}, 
			guixin:{
				audio:2,
				// alter:true,
				trigger:{player:'damageEnd'},
				check:function(event,player){
					if(player.isTurnedOver()||event.num>1) return true;
					var num=game.countPlayer(function(current){
						if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
							return true;
						}
						if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
							return true;
						}
					});
					return num>=2;
				},
				content:function(){
					"step 0"
					var targets=game.filterPlayer();
					targets.remove(player);
					targets.sort(lib.sort.seat);
					event.targets=targets;
					event.count=trigger.num;
					"step 1"
					event.num=0;
					player.line(targets,'green');
					"step 2"
					if(num<event.targets.length){
						if(!get.is.altered('guixin')){
							if(event.targets[num].countGainableCards(player,'hej')){
								player.gainPlayerCard(event.targets[num],true,'hej');
							}
						}
						else{
							var hej=event.targets[num].getCards('hej')
							if(hej.length){
								var card=hej.randomGet();
								player.gain(card,event.targets[num]);
								if(get.position(card)=='h'){
									event.targets[num].$giveAuto(card,player);
								}
								else{
									event.targets[num].$give(card,player);
								}
							}
						}
						event.num++;
						event.redo();
					}
					"step 3"
					player.turnOver();
					"step 4"
					event.count--;
					if(event.count){
						player.chooseBool(get.prompt2('guixin'));
					}
					else{
						event.finish();
					}
					"step 5"
					if(event.count&&result.bool){
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					threaten:function(player,target){
						if(target.hp==1) return 2.5;
						return 1;
					},
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp==1) return 0.8;
								if(target.isTurnedOver()) return [0,3];
								var num=game.countPlayer(function(current){
									if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
										return true;
									}
									if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
										return true;
									}
								});
								if(num>2) return [0,1];
								if(num==2) return [0.5,1];
							}
						}
					}
				}
			},
			qixing:{
				audio:2,
				unique:true,
				trigger:{global:'gameDrawAfter',player:'phaseZhunbeiBegin'},
				forced:true,
				check:function(event,player){
					return player.hp<=1;
				},
				filter:function(event,player){
					return !player.storage.qixing;
				},
				content:function(){
					"step 0"
					player.storage.qixing=game.cardsGotoSpecial(get.cards(7)).cards;
					player.markSkill('qixing');
					game.addVideo('storage',player,['qixing',get.cardsInfo(player.storage.qixing),'cards']);
					"step 1"
					player.chooseCard('选择任意张手牌与“星”交换',[1,Math.min(player.countCards('h'),player.storage.qixing.length)]).set('promptx',[player.storage.qixing]).ai=function(card){
						var val=get.value(card);
						if(val<0) return 10;
						if(player.skipList.contains('phaseUse')){
							return val;
						}
						return -val;
					};
					"step 2"
					if(result.bool){
						player.logSkill('qixing');
						player.lose(result.cards,ui.special,'toStorage');
						player.storage.qixing=player.storage.qixing.concat(result.cards);
						player.syncStorage('qixing');
						event.num=result.cards.length;
					}
					else{
						event.finish();
					}
					"step 3"
					player.chooseCardButton(player.storage.qixing,'选择'+event.num+'张牌作为手牌',event.num,true).ai=function(button){
						var val=get.value(button.link);
						if(val<0) return -10;
						if(player.skipList.contains('phaseUse')){
							return -val;
						}
						return val;
					}
					if(player==game.me&&!event.isMine()){
						game.delay(0.5);
					}
					"step 4"
					player.gain(result.links,'fromStorage');
					for(var i=0;i<result.links.length;i++){
						player.storage.qixing.remove(result.links[i]);
					}
					player.syncStorage('qixing');
					if(player==game.me&&_status.auto){
						game.delay(0.5);
					}
				},
				mark:true,
				intro:{
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
					mark:function(dialog,content,player){
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								dialog.addAuto(content);
							}
							else{
								return '共有'+get.cnNumber(content.length)+'张星';
							}
						}
					},
					content:function(content,player){
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								return get.translation(content);
							}
							return '共有'+get.cnNumber(content.length)+'张星';
						}
					}
				},
				group:['qixing2'],
			},
			qixing2:{
				trigger:{player:'phaseDrawAfter'},
				direct:true,
				filter:function(event,player){
					return player.storage.qixing&&player.storage.qixing.length;
				},
				content:function(){
					"step 0"
					player.chooseCard('选择任意张手牌与“星”交换',[1,Math.min(player.countCards('h'),player.storage.qixing.length)]).set('promptx',[player.storage.qixing]).ai=function(card){
						var val=get.value(card);
						if(val<0) return 10;
						if(player.skipList.contains('phaseUse')){
							return val;
						}
						return -val;
					};
					"step 1"
					if(result.bool){
						player.logSkill('qixing');
						player.lose(result.cards,ui.special,'toStorage');
						player.storage.qixing=player.storage.qixing.concat(result.cards);
						player.syncStorage('qixing');
						event.num=result.cards.length;
					}
					else{
						event.finish();
					}
					"step 2"
					player.chooseCardButton(player.storage.qixing,'选择'+event.num+'张牌作为手牌',event.num,true).ai=function(button){
						var val=get.value(button.link);
						if(val<0) return -10;
						if(player.skipList.contains('phaseUse')){
							return -val;
						}
						return val;
					}
					if(player==game.me&&!event.isMine()){
						game.delay(0.5);
					}
					"step 3"
					player.gain(result.links,'fromStorage');
					for(var i=0;i<result.links.length;i++){
						player.storage.qixing.remove(result.links[i]);
					}
					player.syncStorage('qixing');
					if(player==game.me&&_status.auto){
						game.delay(0.5);
					}
				}
			},
			dawu:{
				unique:true,
				trigger:{player:'phaseJieshuBegin'},
				//priority:1,
				direct:true,
				filter:function(event,player){
					return player.storage.qixing&&player.storage.qixing.length;
				},
				audio:2,
				content:function(){
					"step 0"
					player.chooseTarget('选择角色获得大雾标记',
					[1,Math.min(game.countPlayer(),player.storage.qixing.length)]).ai=function(target){
						if(target.isMin()) return 0;
						if(target.hasSkill('biantian2')) return 0;
						var att=get.attitude(player,target);
						if(att>=4){
							if(target.hp==1&&target.maxHp>2) return att;
							if(target.hp==2&&target.maxHp>3&&target.countCards('he')==0) return att*0.7;
							return 0;
						}
						return -1;
					}
					"step 1"
					if(result.bool){
						var length=result.targets.length;
						for(var i=0;i<length;i++){
							result.targets[i].addSkill('dawu2');
						}
						player.logSkill('dawu',result.targets,'thunder');
						player.chooseCardButton('弃置'+get.cnNumber(length)+'枚星',length,player.storage.qixing,true);
					}
					else{
						event.finish();
					}
					"step 2"
					for(var i=0;i<result.links.length;i++){
						player.storage.qixing.remove(result.links[i]);
					}
					if(player.storage.qixing.length==0){
						player.unmarkSkill('qixing');
					}
					game.addVideo('storage',player,['qixing',get.cardsInfo(player.storage.qixing),'cards']);
					game.cardsDiscard(result.links);
				},
				group:'dawu3'
			},
			dawu2:{
				trigger:{player:'damageBegin4'},
				filter:function(event){
					if(event.nature!='thunder') return true;
					return false;
				},
				mark:true,
				forced:true,
				charlotte:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					nodamage:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')&&!get.tag(card,'thunderDamage')) return [0,0];
						}
					},
				},
				intro:{
					content:'已获得大雾标记'
				}
			},
			dawu3:{
				trigger:{player:['phaseZhunbeiBegin','dieBegin']},
				silent:true,
				content:function(){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].hasSkill('dawu2')){
							game.players[i].removeSkill('dawu2');
							//game.players[i].popup('dawu2');
						}
						if(game.players[i].hasSkill('kuangfeng2')){
							game.players[i].removeSkill('kuangfeng2');
							//game.players[i].popup('kuangfeng2');
						}
					}
				}
			},
			kuangfeng:{
				unique:true,
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.storage.qixing&&player.storage.qixing.length;
				},
				content:function(){
					"step 0"
					player.chooseTarget('选择一名角色获得狂风标记').ai=function(target){
						return -1;
					}
					"step 1"
					if(result.bool){
						var length=result.targets.length;
						for(var i=0;i<length;i++){
							result.targets[i].addSkill('kuangfeng2');
						}
						player.logSkill('kuangfeng',result.targets,'fire');
						player.chooseCardButton('弃置'+get.cnNumber(length)+'枚星',length,player.storage.qixing,true);
					}
					else{
						event.finish();
					}
					"step 2"
					for(var i=0;i<result.links.length;i++){
						player.storage.qixing.remove(result.links[i]);
					}
					if(player.storage.qixing.length==0){
						player.unmarkSkill('qixing');
					}
					game.addVideo('storage',player,['qixing',get.cardsInfo(player.storage.qixing),'cards']);
					game.cardsDiscard(result.links);
					game.log(player,'将',result.links,'置入了弃牌堆')
				},
			},
			kuangfeng2:{
				trigger:{player:'damageBegin3'},
				filter:function(event){
					if(event.nature=='fire') return true;
					return false;
				},
				mark:true,
				intro:{
					content:'已获得狂风标记'
				},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'fireDamage')) return 1.5;
						}
					}
				}
			},
			yeyan:{
				unique:true,
				forceDie:true,
				enable:'phaseUse',
				audio:3,
				animationColor:'metal',
				skillAnimation:'legend',
				filterTarget:function(card,player,target){
					var length=ui.selected.cards.length;
					return (length==0||length==4);
				},
				filterCard:function(card){
					var suit=get.suit(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.suit(ui.selected.cards[i])==suit) return false;
					}
					return true;
				},
				complexCard:true,
				limited:true,
				selectCard:[0,4],
				line:'fire',
				check:function (){return -1},
				selectTarget:function (){
					if(ui.selected.cards.length==4) return [1,2];
					if(ui.selected.cards.length==0) return [1,3];
					game.uncheck('target');
					return [1,3];
				},
				multitarget:true,
				multiline:true,
				content:function (){
					"step 0"
					player.awakenSkill('yeyan');
					event.num=0;
					targets.sortBySeat();
					"step 1"
					if(cards.length==4) event.goto(2);
					else {
						if(event.num<targets.length){
						targets[event.num].damage('fire',1,'nocard');
						event.num++;
					}
					if(event.num==targets.length) event.finish();
					else event.redo();
					}
					"step 2"
					player.loseHp(3);
					if(targets.length==1) event.goto(4);
					else{
						player.chooseTarget('请选择受到2点伤害的角色',true,function(card,player,target){
							return _status.event.targets.contains(target)
						}).set('ai',function(target){
							return 1;
						}).set('forceDie',true).set('targets',targets);
					}
					"step 3"
					if(event.num<targets.length){
						var dnum=1;
						if(result.bool&&result.targets&&targets[event.num]==result.targets[0]) dnum=2;
						targets[event.num].damage('fire',dnum,'nocard');
						event.num++;
					}
					if(event.num==targets.length) event.finish();
					else event.redo();
					"step 4"
					player.chooseControl("2点","3点").set('prompt','请选择伤害点数').set('ai',function(){
						return "3点";
					}).set('forceDie',true);
					"step 5"
					targets[0].damage('fire',result.control=="2点"?2:3,'nocard'); 
				},
				ai:{
					order:1,
					fireAttack:true,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nofire')) return 0;
							if(lib.config.mode=='versus') return -1;
							if(player.hasUnknown()) return 0;
							return get.damageEffect(target,player);
						}
					}
				}
			},
			longhun:{
				audio:4,
				group:['longhun1','longhun2','longhun3','longhun4'],
				ai:{
					fireAttack:true,
					skillTagFilter:function(player,tag){
						switch(tag){
							case 'respondSha':{
								if(player.countCards('he',{suit:'diamond'})<Math.max(1,player.hp)) return false;
								break;
							}
							case 'respondShan':{
								if(player.countCards('he',{suit:'club'})<Math.max(1,player.hp)) return false;
								break;
							}
							case 'save':{
								if(player.countCards('he',{suit:'heart'})<Math.max(1,player.hp)) return false;
								break;
							}
							default:return true;break;
						}
					},
					maixie:true,
					respondSha:true,
					respondShan:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'recover')&&target.hp>=1) return [0,0];
							if(!target.hasFriend()) return;
							if((get.tag(card,'damage')==1||get.tag(card,'loseHp'))&&target.hp>1) return [0,1];
						}
					},
					threaten:function(player,target){
						if(target.hp==1) return 2;
						return 0.5;
					},
				}
			},
			longhun1:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张红桃牌当作桃使用';
				},
				position:'hes',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'tao'},
				viewAsFilter:function(player){
					return player.countCards('hes',{suit:'heart'})>=player.hp;
				},
				filterCard:function(card){
					return get.suit(card)=='heart';
				}
			},
			longhun2:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张方片当作火杀使用或打出';
				},
				position:'hes',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'sha',nature:'fire'},
				viewAsFilter:function(player){
					return player.countCards('hes',{suit:'diamond'})>=player.hp;
				},
				filterCard:function(card){
					return get.suit(card)=='diamond';
				}
			},
			longhun3:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张黑桃牌当作无懈可击使用';
				},
				position:'hes',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 7-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'wuxie'},
				viewAsFilter:function(player){
					return player.countCards('hes',{suit:'spade'})>=player.hp;
				},
				filterCard:function(card){
					return get.suit(card)=='spade';
				}
			},
			longhun4:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张梅花牌当作闪使用或打出';
				},
				position:'hes',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAsFilter:function(player){
					return player.countCards('hes',{suit:'club'})>=player.hp;
				},
				viewAs:{name:'shan'},
				filterCard:function(card){
					return get.suit(card)=='club';
				}
			},
			juejing:{
				mod:{
					maxHandcard:function(player,num){
						return 2+num;
					}
				},
				audio:true,
				trigger:{player:'phaseDrawBegin2'},
				//priority:-5,
				filter:function(event,player){
					return !event.numFixed&&player.hp<player.maxHp;
				},
				forced:true,
				content:function(){
					trigger.num+=(player.getDamagedHp());
				}
			},
			relonghun:{
				audio:2,
				//技能发动时机
				enable:['chooseToUse','chooseToRespond'],
				//发动时提示的技能描述
				prompt:'将♦牌当做杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出',
				//动态的viewAs
				viewAs:function(cards,player){
					var name=false;
					var nature=null;
					//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
					switch(get.suit(cards[0],player)){
						case 'club':name='shan';break;
						case 'diamond':name='sha';nature='fire';break;
						case 'spade':name='wuxie';break;
						case 'heart':name='tao';break;
					}
					//返回判断结果
					if(name) return {name:name,nature:nature};
					return null;
				},
				//AI选牌思路
				check:function(card){
					if(ui.selected.cards.length) return 0;
					var player=_status.event.player;
					if(_status.event.type=='phase'){
						var max=0;
						var name2;
						var list=['sha','tao'];
						var map={sha:'diamond',tao:'heart'}
						for(var i=0;i<list.length;i++){
							var name=list[i];
		 				if(player.countCards('hes',function(card){
		 					return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
		 				})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
		 					var temp=get.order({name:name,nature:name=='sha'?'fire':null});
		 					if(temp>max){
		 						max=temp;
		 						name2=map[name];
		 					}
		 				}
		 			}
		 			if(name2==get.suit(card,player)) return (name2=='diamond'?(5-get.value(card)):20-get.value(card));
		 			return 0;
					}
					return 1;
				},
				//选牌数量
				selectCard:[1,2],
				//确保选择第一张牌后 重新检测第二张牌的合法性 避免选择两张花色不同的牌
				complexCard:true,
				//选牌范围：手牌区和装备区和木马
				position:'hes',
				//选牌合法性判断
				filterCard:function(card,player,event){
					//如果已经选了一张牌 那么第二张牌和第一张花色相同即可
					if(ui.selected.cards.length) return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
					event=event||_status.event;
					//获取当前时机的卡牌选择限制
					var filter=event._backup.filterCard;
					//获取卡牌花色
					var name=get.suit(card,player);
					//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
					if(name=='club'&&filter({name:'shan',cards:[card]},player,event)) return true;
					//如果这张牌是方片并且当前时机能够使用/打出火杀 那么这张牌可以选择
					if(name=='diamond'&&filter({name:'sha',cards:[card],nature:'fire'},player,event)) return true;
					//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
					if(name=='spade'&&filter({name:'wuxie',cards:[card]},player,event)) return true;
					//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
					if(name=='heart'&&filter({name:'tao',cards:[card]},player,event)) return true;
					//上述条件都不满足 那么就不能选择这张牌
					return false;
				},
				//判断当前时机能否发动技能
				filter:function(event,player){
					//获取当前时机的卡牌选择限制
					var filter=event.filterCard;
					//如果当前时机能够使用/打出火杀并且角色有方片 那么可以发动技能
					if(filter({name:'sha',nature:'fire'},player,event)&&player.countCards('hes',{suit:'diamond'})) return true;
					//如果当前时机能够使用/打出闪并且角色有梅花 那么可以发动技能
					if(filter({name:'shan'},player,event)&&player.countCards('hes',{suit:'club'})) return true;
					//如果当前时机能够使用/打出桃并且角色有红桃 那么可以发动技能
					if(filter({name:'tao'},player,event)&&player.countCards('hes',{suit:'heart'})) return true;
					//如果当前时机能够使用/打出无懈可击并且角色有黑桃 那么可以发动技能
					if(filter({name:'wuxie'},player,event)&&player.countCards('hes',{suit:'spade'})) return true;
					return false;
				},
				ai:{
					respondSha:true,
					respondShan:true,
					//让系统知道角色“有杀”“有闪”
					skillTagFilter:function(player,tag){
						var name;
						switch(tag){
							case 'respondSha':name='diamond';break;
							case 'respondShan':name='club';break;
							case 'save':name='heart';break;
						}
						if(!player.countCards('hes',{suit:name})) return false;
					},
					//AI牌序
					order:function(item,player){
						if(player&&_status.event.type=='phase'){
							var max=0;
							var list=['sha','tao'];
							var map={sha:'diamond',tao:'heart'}
							for(var i=0;i<list.length;i++){
								var name=list[i];
			 				if(player.countCards('hes',function(card){
		 						return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
		 					})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
			 					var temp=get.order({name:name,nature:name=='sha'?'fire':null});
			 					if(temp>max) max=temp;
			 				}
			 			}
			 			max/=1.1;
			 			return max;
						}
						return 2;
					},
				},
				//让系统知道玩家“有无懈”“有桃”
				hiddenCard:function(player,name){
					if(name=='wuxie'&&_status.connectMode&&player.countCards('hs')>0) return true;
					if(name=='wuxie') return player.countCards('hes',{suit:'spade'})>0;
					if(name=='tao') return player.countCards('hes',{suit:'heart'})>0;
				},
				group:['relonghun_num','relonghun_discard'],
				subSkill:{
					num:{
						trigger:{player:'useCard'},
						forced:true,
						popup:false,
						filter:function(event){
							var evt=event;
							return ['sha','tao'].contains(evt.card.name)&&evt.skill=='relonghun'&&evt.cards&&evt.cards.length==2;
						},
						content:function(){
							trigger.baseDamage++;
						}
					},
					discard:{
						trigger:{player:['useCardAfter','respondAfter']},
						forced:true,
						popup:false,
						logTarget:function(){
							return _status.currentPhase;
						},
						autodelay:function(event){
							return event.name=='respond'?0.5:false;
						},
						filter:function(evt,player){
							return ['shan','wuxie'].contains(evt.card.name)&&evt.skill=='relonghun'&&
								evt.cards&&evt.cards.length==2&&_status.currentPhase&&_status.currentPhase!=player&&_status.currentPhase.countDiscardableCards(player,'he');
						},
						content:function(){
							player.line(_status.currentPhase,'green');
							player.discardPlayerCard(_status.currentPhase,'he',true);
						}
					}
				}
			},
			xinlonghun:{
				audio:'longhun',
				enable:['chooseToUse','chooseToRespond'],
				prompt:'将♦牌当做杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出',
				viewAs:function(cards,player){
					var name=false;
					var nature=null;
					switch(get.suit(cards[0],player)){
						case 'club':name='shan';break;
						case 'diamond':name='sha';nature='fire';break;
						case 'spade':name='wuxie';break;
						case 'heart':name='tao';break;
					}
					if(name) return {name:name,nature:nature};
					return null;
				},
				check:function(card){
					var player=_status.event.player;
					if(_status.event.type=='phase'){
						var max=0;
						var name2;
						var list=['sha','tao'];
						var map={sha:'diamond',tao:'heart'}
						for(var i=0;i<list.length;i++){
							var name=list[i];
		 				if(player.countCards('hs',function(card){
		 					return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
		 				})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
		 					var temp=get.order({name:name,nature:name=='sha'?'fire':null});
		 					if(temp>max){
		 						max=temp;
		 						name2=map[name];
		 					}
		 				}
		 			}
		 			if(name2==get.suit(card,player)) return (name2=='diamond'?(5-get.value(card)):20-get.value(card));
		 			return 0;
					}
					return 1;
				},
				position:'hs',
				filterCard:function(card,player,event){
					event=event||_status.event;
					var filter=event._backup.filterCard;
					var name=get.suit(card,player);
					if(name=='club'&&filter({name:'shan',cards:[card]},player,event)) return true;
					if(name=='diamond'&&filter({name:'sha',cards:[card],nature:'fire'},player,event)) return true;
					if(name=='spade'&&filter({name:'wuxie',cards:[card]},player,event)) return true;
					if(name=='heart'&&filter({name:'tao',cards:[card]},player,event)) return true;
					return false;
				},
				filter:function(event,player){
					var filter=event.filterCard;
					if(filter({name:'sha',nature:'fire'},player,event)&&player.countCards('hs',{suit:'diamond'})) return true;
					if(filter({name:'shan'},player,event)&&player.countCards('hs',{suit:'club'})) return true;
					if(filter({name:'tao'},player,event)&&player.countCards('hs',{suit:'heart'})) return true;
					if(filter({name:'wuxie'},player,event)&&player.countCards('hs',{suit:'spade'})) return true;
					return false;
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag){
						var name;
						switch(tag){
							case 'respondSha':name='diamond';break;
							case 'respondShan':name='club';break;
							case 'save':name='heart';break;
						}
						if(!player.countCards('hs',{suit:name})) return false;
					},
					order:function(item,player){
						if(player&&_status.event.type=='phase'){
							var max=0;
							var list=['sha','tao'];
							var map={sha:'diamond',tao:'heart'}
							for(var i=0;i<list.length;i++){
								var name=list[i];
			 				if(player.countCards('hs',function(card){
		 						return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
		 					})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
			 					var temp=get.order({name:name,nature:name=='sha'?'fire':null});
			 					if(temp>max) max=temp;
			 				}
			 			}
			 			max/=1.1;
			 			return max;
						}
						return 2;
					},
				},
				hiddenCard:function(player,name){
					if(name=='wuxie'&&_status.connectMode&&player.countCards('hs')>0) return true;
					if(name=='wuxie') return player.countCards('hs',{suit:'spade'})>0;
					if(name=='tao') return player.countCards('hs',{suit:'heart'})>0;
				},
			},
			xinjuejing:{
				mod:{
					maxHandcard:function(player,num){
						return 2+num;
					}
				},
				audio:2,
				trigger:{player:['dying','dyingAfter']},
				forced:true,
				content:function(){
					player.draw();
				}
			},
			shelie:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					"step 0"
					trigger.changeToZero();
					event.cards=get.cards(5);
					game.cardsGotoOrdering(event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str;
						if(player==game.me&&!_status.auto){
							str='涉猎：获取花色各不相同的牌';
						}
						else{
							str='涉猎';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,['涉猎',get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					"step 1"
					var next=player.chooseButton([0,5],true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link)) return false;
						}
						return true;
					});
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					"step 2"
					if(result.bool&&result.links){
						event.cards2=result.links;
					}
					else{
						event.finish();
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					"step 3"
					game.broadcastAll('closeDialog',event.videoId);
					var cards2=event.cards2;
					player.gain(cards2,'log','gain2');
				},
				ai:{
					threaten:1.2
				}
			},
			gongxin:{
				audio:2,
				audioname:['re_lvmeng','gexuan'],
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h');
				},
				content:function(){
					"step 0"
					event.videoId=lib.status.videoId++;
					var cards=target.getCards('h');
					if(player.isOnline2()){
						player.send(function(cards,id){
							ui.create.dialog('攻心',cards).videoId=id;
						},cards,event.videoId);
					}
					event.dialog=ui.create.dialog('攻心',cards);
					event.dialog.videoId=event.videoId;
					if(!event.isMine()){
						event.dialog.style.display='none';
					}
					player.chooseButton().set('filterButton',function(button){
						return get.suit(button.link)=='heart';
					}).set('dialog',event.videoId);
					"step 1"
					if(result.bool){
						event.card=result.links[0];
						var func=function(card,id){
							var dialog=get.idDialog(id);
							if(dialog){
								for(var i=0;i<dialog.buttons.length;i++){
									if(dialog.buttons[i].link==card){
										dialog.buttons[i].classList.add('selectedx');
									}
									else{
										dialog.buttons[i].classList.add('unselectable');
									}
								}
							}
						}
						if(player.isOnline2()){
							player.send(func,event.card,event.videoId);
						}
						else if(event.isMine()){
							func(event.card,event.videoId);
						}
						player.chooseControl('gongxin_discard','gongxin_top');
					}
					else{
						if(player.isOnline2()){
							player.send('closeDialog',event.videoId);
						}
						event.dialog.close();
						event.finish();
					}
					"step 2"
					if(player.isOnline2()){
						player.send('closeDialog',event.videoId);
					}
					event.dialog.close();
					var card=event.card;
					if(result.control=='gongxin_top'){
						player.showCards(card,'置于牌堆顶');
						target.lose(card,ui.cardPile,'insert','visible');
						game.log(player,'将',event.card,'置于牌堆顶');
					}
					else{
						target.discard(card);
					}
				},
				ai:{
					threaten:1.5,
					result:{
						target:function(player,target){
							return -target.countCards('h');
						}
					},
					order:10,
					expose:0.4,
				}
			},
			minigongxin:{
				audio:'gongxin',
				audioname:['re_lvmeng','gexuan'],
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				usable:1,
				filter:function(event,player){
					if(event.player==event.target||event.targets.length!=1) return false;
					return (player==event.player?event.target:event.player).countCards('h')>0;
				},
				logTarget:function(event,player){
					return player==event.player?event.target:event.player;
				},
				check:function(event,player){
					return get.attitude(player,player==event.player?event.target:event.player)<=0;
				},
				content:function(){
					"step 0"
					var target=(player==trigger.player?trigger.target:trigger.player);
					event.target=target;
					event.videoId=lib.status.videoId++;
					var cards=target.getCards('h');
					if(player.isOnline2()){
						player.send(function(cards,id){
							ui.create.dialog('攻心',cards).videoId=id;
						},cards,event.videoId);
					}
					event.dialog=ui.create.dialog('攻心',cards);
					event.dialog.videoId=event.videoId;
					if(!event.isMine()){
						event.dialog.style.display='none';
					}
					player.chooseButton().set('filterButton',function(button){
						return get.color(button.link)=='red';
					}).set('dialog',event.videoId).set('ai',function(button){
						return get.value(button.link);
					});
					"step 1"
					if(result.bool){
						event.card=result.links[0];
						var func=function(card,id){
							var dialog=get.idDialog(id);
							if(dialog){
								for(var i=0;i<dialog.buttons.length;i++){
									if(dialog.buttons[i].link==card){
										dialog.buttons[i].classList.add('selectedx');
									}
									else{
										dialog.buttons[i].classList.add('unselectable');
									}
								}
							}
						}
						if(player.isOnline2()){
							player.send(func,event.card,event.videoId);
						}
						else if(event.isMine()){
							func(event.card,event.videoId);
						}
						player.chooseControl('获得此牌','gongxin_top');
					}
					else{
						if(player.isOnline2()){
							player.send('closeDialog',event.videoId);
						}
						event.dialog.close();
						event.finish();
					}
					"step 2"
					if(player.isOnline2()){
						player.send('closeDialog',event.videoId);
					}
					event.dialog.close();
					var card=event.card;
					if(result.control=='gongxin_top'){
						player.showCards(card,'置于牌堆顶');
						target.lose(card,ui.cardPile,'insert','visible');
						game.log(player,'将',event.card,'置于牌堆顶');
					}
					else{
						player.gain(card,target,'give');
					}
				},
				ai:{
					threaten:1.7,
					expose:0.4,
				}
			},
			"nzry_longnu":{
				mark:true,
				locked:true,
				marktext:'龙',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.nzry_longnu==true) return '锁定技，出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷杀且无使用次数限制';
						return '锁定技，出牌阶段开始时，你流失一点体力并摸一张牌，然后本阶段内你的红色手牌均视为火杀且无距离限制';
					},
				},
				audio:2,
				trigger:{
					player:'phaseUseBegin'
				},
				forced:true,
				content:function(){
					'step 0'
					if(player.storage.nzry_longnu==true){
						player.loseMaxHp();
					}
					else{
						player.loseHp();
					}
					player.draw();
					'step 1'
					if(player.storage.nzry_longnu==true){
						player.storage.nzry_longnu=false;
						player.addTempSkill('nzry_longnu_2','phaseUseAfter');
					}
					else{
						player.storage.nzry_longnu=true;
						player.addTempSkill('nzry_longnu_1','phaseUseAfter');
					};
				},
				subSkill:{
					'1':{
						mod:{
							cardname:function(card,player){
								if(get.color(card)=='red') return 'sha';
							},
							cardnature:function(card,player){
								if(get.color(card)=='red') return 'fire';
							},
							targetInRange:function(card){
								if(get.color(card)=='red') return true;
							},
						},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.6
								}
							},
							respondSha:true,
						},
					},
					'2':{
						mod:{
							cardname:function(card,player){
								if(['trick','delay'].contains(lib.card[card.name].type)) return 'sha';
							},
							cardnature:function(card,player){
								if(['trick','delay'].contains(lib.card[card.name].type)) return 'thunder';
							},
							cardUsable:function(card,player){
								if(card.name=='sha'&&card.nature=='thunder') return Infinity;
							},
						},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.6
								}
							},
							respondSha:true,
						},
					},
				},
				ai:{
					fireAttack:true,
					halfneg:true,
					threaten:1.05,
				},
			},
			"nzry_jieying":{
				audio:2,
				locked:true,
				global:"g_nzry_jieying",
				ai:{
					effect:{
						target:function(card){
							if(card.name=='tiesuo') return 'zeroplayertarget';
						},
					},
				},
				group:["nzry_jieying_1","nzry_jieying_2"],
				subSkill:{
					'1':{
						audio:2,
						trigger:{
							player:['linkBefore','enterGame'],
							global:'gameDrawAfter',
						},
						forced:true,
						filter:function(event,player){
							return player.isLinked()==(event.name=='link');
						},
						content:function(){
							if(trigger.name!='link') player.link(true);
							else trigger.cancel();
						},	
					},
					'2':{
						audio:2,
						trigger:{
							player:'phaseJieshuBegin',
						},
						direct:true,
						filter:function(event,player){
							return game.hasPlayer(function(current){
								return current!=player&&!current.isLinked();
							});
						},
						content:function(){
							"step 0"
							player.chooseTarget(true,'请选择【结营】的目标',function(card,player,target){
								return target!=player&&!target.isLinked();
							}).ai=function(target){
								return 1+Math.random();
							};
							"step 1"
							if(result.bool){
								player.line(result.targets);
								player.logSkill('nzry_jieying');
								result.targets[0].link(true);
							}else{
								event.finish();
							};
						},
					},
				},
			},
			"g_nzry_jieying":{
				mod:{
					maxHandcard:function (player,num){
						if(game.countPlayer(function(current){return current.hasSkill('nzry_jieying')})>0&&player.isLinked()) return num+2;
					},
				},
			},
			"nzry_junlve":{
				audio:2,
				//marktext:"军",
				intro:{
					content:'当前有#个标记',
				},
				//mark:true,
				trigger:{
					player:"damageAfter",
					source:"damageSource",
				},
				forced:true,
				content:function(){
					player.addMark('nzry_junlve',trigger.num);
				},
			},
			"nzry_cuike":{
				audio:2,
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				content:function(){
					'step 0'
					if(player.countMark('nzry_junlve')%2==1){
						player.chooseTarget('是否发动【摧克】，对一名角色造成一点伤害？').ai=function(target){
							return -get.attitude(player,target);
						};
					}
					else{
						player.chooseTarget('是否发动【摧克】，横置一名角色并弃置其区域内的一张牌？').ai=function(target){
							return -get.attitude(player,target);
						};
					}
					'step 1'
					if(result.bool){
						player.logSkill('nzry_cuike',result.targets);
						if(player.countMark('nzry_junlve')%2==1){
							result.targets[0].damage();
						}
						else{
							result.targets[0].link(true);
							player.discardPlayerCard(result.targets[0],1,'hej',true);
						};
					};
					'step 2'
					if(player.countMark('nzry_junlve')>7){
						player.chooseBool().set('ai',function(){
							return true;
						}).set('prompt','是否弃置所有“军略”标记并对所有其他角色造成一点伤害？');
					}else{
						event.finish();
					};
					'step 3'
					if(result.bool){
						var players=game.players.slice(0).sortBySeat();
						player.line(players);
						player.removeMark('nzry_junlve',player.countMark('nzry_junlve'));
						for(var i=0;i<players.length;i++){
							if(players[i]!=player) players[i].damage();
						};
					};
				},
			},
			"nzry_dinghuo":{
				audio:2,
				limited:true,
				init:function (player){
					player.storage.nzry_dinghuo=false;
				},
				intro:{
					content:"limited",
				},
				unique:true,
				mark:true,
				skillAnimation:true,
				animationColor:'metal',
				enable:'phaseUse',
				filter:function (event,player){
					return !player.storage.nzry_dinghuo&&player.countMark('nzry_junlve')>0;
				},
				check:function (event,player){
					var num=game.countPlayer(function(current){return get.attitude(player,current)<0&&current.isLinked()});
					return player.storage.nzry_junlve>=num&&num==game.countPlayer(function(current){return get.attitude(player,current)<0});
				},
				filterTarget:function(card,player,target){
					return target.isLinked();
				},
				selectTarget:function(){
					return [1,_status.event.player.countMark('nzry_junlve')];
				},
				multiline:true,
				multitarget:true,
				content:function (){
					'step 0'
					player.awakenSkill('nzry_dinghuo');
					player.storage.nzry_dinghuo=true;
					'step 1'
						player.removeMark('nzry_junlve',player.countMark('nzry_junlve'));
					for(var i=0;i<targets.length;i++){
						targets[i].discard(targets[i].getCards('e'));
					}
					player.chooseTarget(true,'对一名目标角色造成1点火焰伤害',function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('targets',targets).ai=function(){return 1};
					'step 2'
					if(result.bool){
						result.targets[0].damage('fire','nocard');
					}
				},
				ai:{
					order:1,
					fireAttack:true,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nofire')) return 0;
							if(lib.config.mode=='versus') return -1;
							if(player.hasUnknown()) return 0;
							return get.damageEffect(target,player)-target.countCards('e');
						}
					}
				}
			},
			
			"drlt_duorui":{
				audio:2,
				init:function(player,skill){
					if(!player.storage.drlt_duorui) player.storage.drlt_duorui=[];
				},
				trigger:{
					source:'damageSource'
				},
				filter:function(event,player){
					if(player.storage.drlt_duorui.length) return false;
					return player!=event.player&&event.player.isAlive()&&_status.currentPhase==player;
				},
				check:function(event,player){
					if(player.countDisabled()<5&&player.isDisabled(5)) return false;
					return true;
				},
				bannedList:[
					'bifa','buqu','gzbuqu','songci','funan','xinfu_guhuo','reguhuo','huashen','rehuashen','old_guhuo','shouxi','xinpojun','taoluan','xintaoluan','yinbing','xinfu_yingshi','zhenwei','zhengnan','xinzhengnan','zhoufu',
				],
				content:function(){
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
						if(!info||info.charlotte||info.hiddenSkill||info.zhuSkill||info.juexingji||info.limited||(info.unique&&!info.gainable)||lib.skill.drlt_duorui.bannedList.contains(skill)) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					event.skills=list;
					if(player.countDisabled()<5){
						player.chooseToDisable().ai=function(event,player,list){
							if(list.contains('equip5')) return 'equip5';
							return list.randomGet();
						};
					}
					'step 1'
					if(event.skills.length>0){
						player.chooseControl(event.skills).set('prompt','请选择要获得的技能').set('ai',function(){return event.skills.randomGet()});
					}
					else event.finish();
					'step 2'
					player.addTempSkill(result.control,{player:'dieAfter'});
					player.popup(result.control,'thunder');
					player.storage.drlt_duorui=[result.control];
					player.storage.drlt_duorui_player=trigger.player;
					trigger.player.storage.drlt_duorui=[result.control];
					trigger.player.addTempSkill('drlt_duorui1',{player:'phaseAfter'});
					game.log(player,'获得了技能','#g【'+get.translation(result.control)+'】')
				},
				group:['duorui_clear'],
			},
			"duorui_clear":{
				trigger:{global:['phaseAfter','dieAfter'],},
				filter:function(event,player){
					if(!player.storage.drlt_duorui_player||!player.storage.drlt_duorui) return false;
					return player.storage.drlt_duorui_player==event.player&&player.storage.drlt_duorui.length;
				},
				silent:true,
				forced:true,
				popup:false,
				content:function(){
					player.removeSkill(player.storage.drlt_duorui[0]);
					delete player.storage.drlt_duorui_player;
					player.storage.drlt_duorui=[];
				},
			},
			"drlt_duorui1":{
				init:function(player,skill){
					player.disableSkill(skill,player.storage.drlt_duorui);
				},
				onremove:function(player,skill){
					player.enableSkill(skill);
				},
				locked:true,
				mark:true,
				charlotte:true,
				intro:{
					content:function(storage,player,skill){
						var list=[];
						for(var i in player.disabledSkills){
							if(player.disabledSkills[i].contains(skill)) list.push(i);
						};
						if(list.length){
							var str='失效技能：';
							for(var i=0;i<list.length;i++){
								if(lib.translate[list[i]+'_info']) str+=get.translation(list[i])+'、';
							};
							return str.slice(0,str.length-1);
						};
					},
				},
			},
			drlt_zhiti:{
				audio:2,
				locked:true,
				group:["drlt_zhiti_1","drlt_zhiti_2","drlt_zhiti_3","drlt_zhiti_4","drlt_zhiti_5"],
				global:'g_drlt_zhiti',
				subSkill:{
					'1':{
						audio:"drlt_zhiti",
						trigger:{
							global:'juedouAfter'
						},
						forced:true,
						filter:function(event,player){
							return event.targets&&event.targets.contains(player)&&event.turn!=player&&player.storage.disableEquip!=undefined&&player.storage.disableEquip.length>0;
						},
						content:function(){
							player.chooseToEnable();
						},
					},
					'2':{
						audio:"drlt_zhiti",
						trigger:{
							player:'juedouAfter',
						},
						forced:true,
						filter:function(event,player){
							return event.turn!=player&&player.storage.disableEquip!=undefined&&player.storage.disableEquip.length>0;
						},
						content:function(){
							player.chooseToEnable();
						},
					},
					'3':{
						audio:"drlt_zhiti",
						trigger:{
							player:'chooseToCompareAfter'
						},
						forced:true,
						filter:function(event,player){
							return event.result.bool==true&&player.storage.disableEquip!=undefined&&player.storage.disableEquip.length>0;
						},
						content:function(){
							'step 0'
							player.chooseToEnable();
						},
					},
					'4':{
						audio:"drlt_zhiti",
						trigger:{
							global:'chooseToCompareAfter'
						},
						forced:true,
						filter:function(event,player){
							return (event.targets!=undefined&&event.targets.contains(player)||event.target==player)&&event.result.bool==false&&player.storage.disableEquip!=undefined&&player.storage.disableEquip.length>0;
						},
						content:function(){
							player.chooseToEnable();
						},
					},
					'5':{
						audio:"drlt_zhiti",
						trigger:{
							player:['damageEnd']
						},
						forced:true,
						filter:function(event,player){
							return player.storage.disableEquip!=undefined&&player.storage.disableEquip.length>0;
						},
						content:function(){
							player.chooseToEnable();
						},
					},
				},
			},
			g_drlt_zhiti:{
				mod:{
					maxHandcard:function (player,num){
						if(player.maxHp>player.hp&&game.countPlayer(function(current){
							return current!=player&&current.hasSkill('drlt_zhiti')&&current.inRange(player);
						})) return num-1;
					},
				},
			},
			'drlt_poxi':{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
					//return target!=player;
				},
				content:function(){
					'step 0'
					event.list1=[];
					event.list2=[];
					if(player.countCards('h')>0){
						var chooseButton=player.chooseButton(4,['你的手牌',player.getCards('h'),get.translation(target.name)+'的手牌',target.getCards('h')]);
					}
					else{
						var chooseButton=player.chooseButton(4,[get.translation(target.name)+'的手牌',target.getCards('h')]);
					}
					chooseButton.set('target',target);
					chooseButton.set('ai',function(button){
						var player=_status.event.player;
						var target=_status.event.target;
						var ps=[];
						var ts=[];
						for(var i=0;i<ui.selected.buttons.length;i++){
							var card=ui.selected.buttons[i].link;
							if(target.getCards('h').contains(card)) ts.push(card);
							else ps.push(card);
						}
						var card=button.link;
						var owner=get.owner(card);
						var val=get.value(card)||1;
						if(owner==target){
							if(ts.length>1) return 0;
							if(ts.length==0||player.hp>3) return val;
							return 2*val;
						}
						return 7-val;
					});
					chooseButton.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(button.link)==get.suit(ui.selected.buttons[i].link)) return false;
						};
						return true;
					});
					'step 1'
					if(result.bool){
						var list=result.links;
						for(var i=0;i<list.length;i++){
							if(get.owner(list[i])==player){
								event.list1.push(list[i]);
							}else{
								event.list2.push(list[i]);
							};
						};
						if(event.list1.length&&event.list2.length){
							target.discard(event.list2).delay=false;
							player.discard(event.list1);
						}
						else if(event.list2.length){
							target.discard(event.list2);
						}
						else player.discard(event.list1);
					};
					'step 2'
					if(event.list1.length+event.list2.length==4){
						if(event.list1.length==0) player.loseMaxHp();
						if(event.list1.length==1){
							var evt=_status.event;
							for(var i=0;i<10;i++){
								if(evt&&evt.getParent)evt=evt.getParent();
								if(evt.name=='phaseUse'){
								evt.skipped=true;
									break;
								};
							};
							player.addTempSkill('drlt_poxi1',{player:'phaseAfter'});
						};
						if(event.list1.length==3) player.recover();
						if(event.list1.length==4) player.draw(4);
					};
				},
				ai:{
					order:13,
					result:{
						target:function(target,player){
							return -1;
						},
					},
				},
			},
			'drlt_poxi1':{
				mod:{
					maxHandcard:function (player,num){
						return num-1;
					},
				},
			},
			drlt_jieying_mark:{
				marktext:"营",
				intro:{
					name:'营',
					content:'mark',
				},
				mod:{
					cardUsable:function (card,player,num){
						if(player.hasMark('drlt_jieying_mark')&&card.name=='sha') return num+game.countPlayer(function(current){
							return current.hasSkill('drlt_jieying');
						});
					},
					maxHandcard:function (player,num){
						if(player.hasMark('drlt_jieying_mark')) return num+game.countPlayer(function(current){
							return current.hasSkill('drlt_jieying');
						});
					},
				},
				audio:'drlt_jieying',
				trigger:{
					player:'phaseDrawBegin2'
				},
				forced:true,
				filter:function(event,player){
					return !event.numFixed&&player.hasMark('drlt_jieying_mark')&&game.hasPlayer(function(current){
						return current.hasSkill('drlt_jieying');
					});
				},
				content:function(){
					trigger.num+=game.countPlayer(function(current){
						return current.hasSkill('drlt_jieying');
					});
				},
				ai:{
					nokeep:true,
					skillTagFilter:function(player){
						if(!player.hasMark('drlt_jieying_mark')) return false;
					},
				},
			},
			'drlt_jieying':{
				audio:2,
				locked:false,
				global:'drlt_jieying_mark',
				group:["drlt_jieying_1","drlt_jieying_2","drlt_jieying_3"],
				subSkill:{
					'1':{
						audio:'drlt_jieying',
						trigger:{
							player:'phaseZhunbeiBegin'
						},
						forced:true,
						filter:function(event,player){
							return !game.hasPlayer(function(current){
								return current.hasMark('drlt_jieying_mark');
							});
						},
						content:function(){
							player.addMark('drlt_jieying_mark',1);
						},
					},
					'2':{
						audio:'drlt_jieying',
						trigger:{
							player:"phaseJieshuBegin",
						},
						direct:true,
						filter:function(event,player){
							return player.hasMark('drlt_jieying_mark');
						},
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('drlt_jieying'),"将“营”交给一名角色；其摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1且手牌上限+1。该角色回合结束后，其移去“营”标记，然后你获得其所有手牌。",function(card,player,target){
								return target!=player;
							}).ai=function(target){
								if(get.attitude(player,target)>0)
								return 0.1;
								if(get.attitude(player,target)<1&&(target.isTurnedOver()||target.countCards('h')<1))
								return 0.2;
									if(get.attitude(player,target)<1&&target.countCards('h')>0&&target.countCards('j',{name:'lebu'})>0)
								return target.countCards('h')*0.8+target.getHandcardLimit()*0.7+2;
								if(get.attitude(player,target)<1&&target.countCards('h')>0)
								return target.countCards('h')*0.8+target.getHandcardLimit()*0.7;
								return 1;
							};
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.line(target);
								player.logSkill('drlt_jieying',target);
								var mark=player.countMark('drlt_jieying_mark');
								player.removeMark('drlt_jieying_mark',mark);
								target.addMark('drlt_jieying_mark',mark);
							};
						},
					},
					'3':{
						audio:'drlt_jieying',
						trigger:{
							global:'phaseEnd',
						},
						forced:true,
						filter:function(event,player){
							return player!=event.player&&event.player.hasMark('drlt_jieying_mark')&&event.player.isAlive();
						},
						logTarget:'player',
						content:function(){
							if(trigger.player.countCards('h')>0){
								trigger.player.give(trigger.player.getCards('h'),player);
							}
							trigger.player.removeMark('drlt_jieying_mark',trigger.player.countMark('drlt_jieying_mark'));
						},
					},
				},
			},
		},
		card:{
			hina_shenji:{
				type:'equip',
				subtype:'equip5',
				derivation:'key_hina',
				skills:['hina_guixin','hina_shenfen'],
				fullskin:true,
				ai:{
					equipValue:function(card,player){
						if(player.hasSkill('hina_shenxian')) return 100;
						return 0;
					},
					basic:{
						equipValue:100
					}
				},
			},
		},
		dynamicTranslate:{
			nzry_longnu:function(player){
				if(player.hasSkill('nzry_longnu_2')) return '转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。<span class="legendtext">阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。</span>';
				if(player.hasSkill('nzry_longnu_1')) return '转换技，锁定技，<span class="legendtext">阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。</span>阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。';
				if(player.storage.nzry_longnu==true) return '转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。<span class="bluetext">阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。</span>';
				return '转换技，锁定技，<span class="bluetext">阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。</span>阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。';
			},
		},
		translate:{
			"shen_luxun":"神陆逊",
			"nzry_junlve":"军略",
			"nzry_junlve_info":"锁定技，当你受到或造成伤害后，你获得X个“军略”标记(X为伤害点数)",
			"nzry_cuike":"摧克",
			"nzry_cuike_info":"出牌阶段开始时，若“军略”标记的数量为奇数，你可以对一名角色造成一点伤害；若“军略”标记的数量为偶数，你可以横置一名角色并弃置其区域内的一张牌。然后，若“军略”标记的数量超过7个，你可以移去全部“军略”标记并对所有其他角色造成一点伤害",
			"nzry_dinghuo":"绽火",
			"nzry_dinghuo_info":"限定技，出牌阶段，你可以移去全部“军略”标记，令至多等量的已横置角色弃置所有装备区内的牌。然后，你对其中一名角色造成1点火焰伤害。",
			"shen_liubei":"神刘备",
			"nzry_longnu":"龙怒",
			"nzry_longnu_info":"转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。",
			"nzry_jieying":"结营",
			"nzry_jieying_info":"锁定技，游戏开始时或当你的武将牌重置时，你横置；所有已横置的角色手牌上限+2；结束阶段，你横置一名其他角色。",
			
			"shen_ganning":"神甘宁",
			"shen_zhangliao":"神张辽",
			
			"drlt_poxi":"魄袭",
			"drlt_poxi_info":"出牌阶段限一次，你可以观看一名其他角色的手牌，然后你可以弃置你与其手牌中的四张花色不同的牌。若如此做，根据此次弃置你的牌的数量执行以下效果：零张，扣减一点体力上限；一张，你结束出牌阶段且本回合手牌上限-1；三张，你回复一点体力；四张，你摸四张牌",
			"drlt_jieying":"劫营",
			"drlt_jieying_info":"回合开始时，若场上没有拥有“营”标记的角色，你获得1个“营”标记；结束阶段，你可以将你的一个“营”标记交给一名角色；有“营”标记的角色摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1，手牌上限+1。有“营”的其他角色回合结束时，其移去“营”标记，然后你获得其所有手牌。",
			drlt_jieying_mark:"劫营",
			"drlt_duorui1":"失效技能",
			"drlt_duorui1_bg":"锐",
			"drlt_duorui":"夺锐",
			"drlt_duorui_info":"当你于出牌阶段内对一名其他角色造成伤害后，你可以废除你装备区内的一个装备栏（若已全部废除则可以跳过此步骤），然后获得该角色的一个技能直到其的下回合结束或其死亡(觉醒技，限定技，主公技，隐匿技等特殊技能除外)。若如此做，该角色该技能失效且你不能再发动〖夺锐〗直到你失去以此法获得的技能。",
			"drlt_zhiti":"止啼",
			"drlt_zhiti_info":"锁定技，你攻击范围内已受伤的其他角色手牌上限-1；当你拼点或【决斗】胜利，或受到伤害后，你恢复一个装备栏",
			
			shen_zhaoyun:'神赵云',
			shen_guanyu:'神关羽',
			shen_lvmeng:'神吕蒙',
			shen_simayi:'神司马懿',
			shen_caocao:'神曹操',
			shen_zhugeliang:'神诸葛亮',
			shen_zhouyu:'神周瑜',
			shen_lvbu:'神吕布',
			xinjuejing:'绝境',
			xinjuejing_info:'锁定技，你的手牌上限+2；当你进入或脱离濒死状态时，你摸一张牌。',
			relonghun:'龙魂',
			relonghun_info:'你可以将同花色的一至两张牌按下列规则使用或打出：红桃当【桃】，方块当火【杀】，梅花当【闪】，黑桃当普【无懈可击】。若你以此法使用了两张红色牌，则此牌回复值或伤害值+1。若你以此法使用了两张黑色牌，则你弃置当前回合角色一张牌。',
			xinlonghun:'龙魂',
			xinlonghun_info:'你可以将你的手牌按下列规则使用或打出：红桃当【桃】，方块当火【杀】，梅花当【闪】，黑桃当普【无懈可击】。',
			longhun:'龙魂',
			longhun1:'龙魂♥︎',
			longhun2:'龙魂♦︎',
			longhun3:'龙魂♠︎',
			longhun4:'龙魂♣︎',
			juejing:'绝境',
			longhun_info:'你可以将同花色的X张牌按下列规则使用或打出：红桃当【桃】，方块当具火焰伤害的【杀】，梅花当【闪】，黑桃当【无懈可击】（X为你当前的体力值且至少为1）',
			juejing_info:'锁定技，摸牌阶段，你摸牌的数量改为你已损失的体力值+2；你的手牌上限+2。',
			wushen:'武神',
			wushen_info:'锁定技，你的红桃手牌均视为【杀】；锁定技，你使用红桃【杀】无距离和次数限制且不可被响应。',
			wuhun:'武魂',
			wuhun21:'武魂',
			wuhun22:'武魂',
			wuhun23:'武魂',
			wuhun2:'武魂',
			wuhun3:'武魂',		
			wuhun_info_alter:'锁定技，当你受到1点伤害后，你令伤害来源获得1枚“梦魇”标记；当你死亡时，你令拥有最多“梦魇”标记的一名其他角色判定，若结果不为【桃】或【桃园结义】，则该角色死亡。',
			wuhun_info:'锁定技，杀死你的角色立即进入濒死状态',
			shelie:'涉猎',
			gongxin:'攻心',
			gongxin_discard:'弃置',
			gongxin_top:'牌堆顶',
			renjie:'忍戒',
			renjie2:'忍戒',
			renjie_info:'锁定技，当你受到1点伤害后，你获得一枚“忍”标记；锁定技，当你于弃牌阶段内弃置牌后，你获得等同于失去的牌数量的“忍”标记。',
			sbaiyin:'拜印',
			sbaiyin_info:'觉醒技，准备阶段开始时，若你的“忍”标记数不小于4，你减1点体力上限，然后获得〖极略〗',
			jilue:'极略',
			jilue_info:'当一名角色的判定牌生效前，你可以弃1枚“忍”标记并发动〖鬼才〗；每当你受到伤害后，你可以弃1枚“忍”标记并发动〖放逐〗；当你使用锦囊牌时，你可以弃1枚“忍”标记并发动〖集智〗；出牌阶段限一次，你可以弃1枚“忍”标记并发动〖制衡〗；出牌阶段，你可以弃1枚“忍”标记并获得〖完杀〗直到回合结束。',
			jilue_guicai:'鬼才',
			jilue_fangzhu:'放逐',
			jilue_wansha:'完杀',
			jilue_zhiheng:'制衡',
			jilue_jizhi:'集智',
			lianpo:'连破',
			lianpo_info:'一名角色的回合结束时，若你本回合内杀死过角色，则你可以进行一个额外的回合。',
			guixin:'归心',
			qinyin:'琴音',
			yeyan:'业炎',
			shelie_info:'摸牌阶段，你可以改为从牌堆顶亮出五张牌，然后选择获得不同花色的牌各一张。',
			gongxin_info:'出牌阶段限一次，你可以观看一名其他角色的手牌，并可以展示其中一张红桃牌，然后将其弃置或置于牌堆顶。',
			guixin_info:'当你受到1点伤害后，你可以获得每名其他角色区域里的一张牌，然后你翻面',
			guixin_info_alter:'当你受到1点伤害后，你可以随机获得每名其他角色区域里的一张牌，然后你翻面',
			qinyin_info:'弃牌阶段结束时，若你于此阶段内弃置过两张或更多的牌，则你可以选择一项：1. 令所有角色各回复1点体力；2. 令所有角色各失去1点体力。',
			// qinyin_info:'每当你于弃牌阶段内因你的弃置而失去第X张手牌时（X至少为2），你可以选择一项：1.令所有角色各回复1点体力；2.令所有角色各失去1点体力。每阶段限一次。',
			yeyan_info:'限定技，出牌阶段，你可以对一至三名角色造成至多共3点火焰伤害（你可以任意分配每名目标角色受到的伤害点数），若你将对一名角色分配2点或更多的火焰伤害，你须先弃置四张不同花色的手牌再失去3点体力。',
			qixing:'七星',
			qixing_bg:'星',
			qixing2:'七星',
			qixing3:'七星',
			qixing_info:'游戏开始时，你将牌堆顶的七张牌置于你的武将牌上，称之为“星”。然后/摸牌阶段结束后，你可用任意数量的手牌等量交换这些“星”。',
			dawu:'大雾',
			dawu2_bg:'雾',
			dawu2:'大雾',
			dawu3:'大雾',
			// dawu2_info:'已获得大雾标记',
			dawu_info:'结束阶段，你可以弃置X张“星”并指定等量的角色：直到你的下回合开始，当这些角色受到非雷电伤害时，防止此伤害。',
			kuangfeng:'狂风',
			kuangfeng2:'狂风',
			kuangfeng2_bg:'风',
			// kuangfeng2_info:'已获得狂风标记',
			kuangfeng3:'狂风',
			kuangfeng_info:'结束阶段，你可以弃置1张“星”并指定一名角色：直到你的下回合开始，该角色受到火焰伤害时，此伤害+1。',
			baonu:'狂暴',
			baonu_bg:'暴',
			baonu_info:'锁定技，游戏开始时，你获得两枚“暴怒”标记；锁定技，当你造成/受到1点伤害后，你获得1枚“暴怒”标记。',
			shenfen:'神愤',
			shenfen_info:'限定技，出牌阶段，你可以弃置6枚暴怒标记，对场上所有其他角色造成一点伤害，然后令其弃置4张牌',
			wuqian:'无前',
			wuqian_info:'出牌阶段，你可以弃置两枚暴怒标记并获得技能【无双】直到回合结束',
			wumou:'无谋',
			wumou_info:'锁定技，当你使用普通锦囊牌时，你选择一项：1.弃置1枚“暴怒”标记；2.失去1点体力。',
			ol_wuqian:'无前',
			ol_wuqian_info:'出牌阶段，你可以弃置2枚“暴怒”标记并选择一名本回合内未选择过的其他角色，你获得技能〖无双〗并令其防具无效直到回合结束。',
			ol_shenfen:'神愤',
			ol_shenfen_info:'出牌阶段限一次，你可以弃置6枚“暴怒”标记并选择所有其他角色，对这些角色各造成1点伤害。然后这些角色先各弃置其装备区里的牌，再各弃置四张手牌。最后你将你的武将牌翻面。',
			"new_wuhun":"武魂",
			"new_wuhun_info":"锁定技，当你受到伤害后，伤害来源获得X个“梦魇”标记（X为伤害点数）。锁定技，当你死亡时，你选择一名“梦魇”标记数量最多的其他角色。该角色进行判定：若判定结果不为【桃】或【桃园结义】，则该角色死亡。",
			"new_guixin":"归心",
			"new_guixin_info":"当你受到1点伤害后，你可以按照你选择的区域优先度随机获得每名其他角色区域里的一张牌，然后你翻面。",
			ol_zhangliao:'OL神张辽',
			olduorui:'夺锐',
			olduorui2:'夺锐',
			olduorui_info:'当你于出牌阶段内对一名角色造成伤害后，你可以选择该角色武将牌上的一个技能。若如此做，你结束出牌阶段，且你令此技能于其下个回合结束之前无效。',
			olzhiti:'止啼',
			olzhiti_info:'锁定技，你攻击范围内已受伤角色的手牌上限-1。若场上已受伤的角色数：不小于1，你的手牌上限+1；不小于3，你于摸牌阶段开始时令额定摸牌数+1；不小于5，回合结束时，你废除一名角色的一个随机装备栏。',
			shen_caopi:'神曹丕',
			chuyuan:'储元',
			chuyuan_info:'一名角色受到伤害后，若你武将牌上「储」的数量小于体力上限，你可以令其摸一张牌。然后其将一张手牌置于你的武将牌上，称为「储」。',
			//chuyuan_info:'一名角色受到伤害后，你可以令其摸一张牌。然后其将一张手牌置于你的武将牌上，称为「储」。你的手牌上限+X（X为你武将牌上的「储」数）。',
			dengji:'登极',
			dengji_info:'觉醒技，准备阶段，若你武将牌上的「储」数不小于3，则你减1点体力上限并获得所有「储」，然后获得技能〖天行〗和〖奸雄〗',
			tianxing:'天行',
			tianxing_info:'觉醒技，准备阶段，若你武将牌上的「储」数不小于3，则你减1点体力上限并获得所有「储」，然后失去技能〖储元〗，选择获得以下技能中的一个：〖仁德〗/〖制衡〗/〖乱击〗/〖行动〗',
			shen_zhenji:'神甄姬',
			shenfu:'神赋',
			shenfu_info:'回合结束时，若你的手牌数为：奇数，你可对一名其他角色造成1点伤害。若其死亡，你可重复此流程。偶数，你可选择一名本回合内未选择过的角色，你令其摸一张牌或弃置其一张手牌。若其手牌数等于体力值，你可重复此流程。',
			qixian:'七弦',
			qixian_info:'锁定技，你的手牌上限视为7。',
			caopi_xingdong:'行动',
			caopi_xingdong_info:'出牌阶段限一次，你可以将一张【杀】或普通锦囊牌交给一名其他角色，然后该角色选择一项：对除你以外的角色使用此牌并在此牌结算完成后和你各摸一张牌；或跳过下回合的判定阶段和摸牌阶段。',
			shen_diaochan:'神貂蝉',
			meihun:'魅魂',
			meihun_info:'结束阶段或当你成为【杀】的目标后，你可以令一名其他角色交给你一张你声明的花色的手牌，若其没有则你观看其手牌然后弃置其中一张。',
			huoxin_control:'惑心',
			huoxin:'惑心',
			huoxin_info:'出牌阶段限一次，你可以展示两张花色相同的手牌并分别交给两名其他角色，然后令这两名角色拼点，没赢的角色获得1个“魅惑”标记。拥有2个或更多“魅惑”的角色回合即将开始时，该角色移去其所有“魅惑”，此回合改为由你操控。',
			mini_zhugeliang:'SP神诸葛亮',
			minikuangfeng:'狂风',
			minikuangfeng_info:'出牌阶段结束时，你可选择任意名角色并将等量的“星”置入弃牌堆，然后对这些角色各造成1点伤害。',
			minidawu:'大雾',
			minidawu2:'大雾',
			minidawu_info:'结束阶段，你可以将一张“星”置入弃牌堆。当你于下回合开始前受到伤害时，此伤害-1。',
			mini_lvbu:'SP神吕布',
			miniwuqian:'无前',
			miniwuqian_info:'锁定技，当你于回合内使用【杀】或【决斗】指定目标后，若此牌是你本回合内使用的第一张【杀】或【决斗】，则你令其每次响应此牌需要使用的【闪】或打出的【杀】的数量+1，且令其防具无效直到此牌对其结束。',
			minishenfen:'神愤',
			minishenfen_info:'限定技，出牌阶段，你可以失去3点体力，对所有其他角色各造成1点伤害。这些角色弃置装备区内的所有牌，然后弃置四张手牌。',
			mini_lvmeng:'SP神吕蒙',
			minigongxin:'攻心',
			minigongxin_info:'每回合限一次，当你使用牌指定其他角色为唯一目标后，或成为其他角色使用牌的唯一目标后，你可观看对方的手牌。然后你可以展示其中的一张红色牌并选择一项：①获得此牌。②将此牌置于牌堆顶。',
			boss_zhaoyun:'高达一号',
			boss_zhaoyun_ab:'神赵云',
			boss_juejing:'绝境',
			boss_juejing2:'绝境',
			boss_juejing_info:'锁定技，摸牌阶段开始前，你跳过此阶段。当你获得牌/失去手牌后，若你的手牌数大于4/小于4，则你将手牌摸至4张/弃置至4张。',
			zhanjiang:'斩将',
			zhanjiang_info:'准备阶段开始时，如果其他角色的装备区内有【青釭剑】，你可以获得之',
			
			key_kagari:'篝',
			kagari_zongsi:'纵丝',
			kagari_zongsi_info:'出牌阶段限一次，你可以选择一张不在游戏外的牌，然后将其置于牌堆/弃牌堆的顶部/底部或一名角色的对应区域内。',
			key_shiki:'神山识',
			key_shiki_ab:'神山识',
			shiki_omusubi:'御结',
			shiki_omusubi_info:'一轮游戏开始时，你可以减1点体力上限，然后将一名其他角色武将牌上的技能加入到你的武将牌上。',
			shiki_omusubi_append:'<span style="font-family: yuanli">来吧，羽依里。用你的手，让我变成那只真正的鬼吧！</span>',
			key_hina:'佐藤雏',
			hina_shenxian:'神现',
			hina_shenxian_info:'隐匿技，锁定技，当你明置此武将牌时，你将一张【神机】置入装备区。',
			hina_mashu:'马术',
			hina_mashu_info:'锁定技，你计算于其他角色的距离时始终-1。',
			hina_tieji:'铁骑',
			hina_tieji_info:'当你使用【杀】指定目标后，你可进行判定。你令目标角色的所有非锁定技失效直到回合结束。除非其弃置一张与判定结果花色相同的牌，则其不能响应此【杀】。若判定结果为♠，则此【杀】对其的伤害+1。',
			hina_tieji_append:'<span style="font-family: yuanli">她成为神明的那一天，世界走向毁灭。</span>',
			
			hina_shenji:'神机',
			hina_shenji_info:'若你拥有技能〖神现〗，则你可以于准备阶段发动〖归心〗，并可于结束阶段发动〖神愤〗。',
			hina_guixin:'归心',
			hina_shenfen:'神愤',
			
			extra_feng:'神话再临·风',
			extra_huo:'神话再临·火',
			extra_lin:'神话再临·林',
			extra_shan:'神话再临·山',
			extra_yin:'神话再临·阴',
			extra_lei:'神话再临·雷',
			extra_key:'神话再临·论外',
			extra_ol:'神话再临OL',
			extra_offline:'神话再临·线下',
			extra_mini:'欢乐三国杀',
		},
	};
});
