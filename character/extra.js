'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'extra',
		character:{
			shen_guanyu:['male','shen',5,['wuhun','wushen'],['shu']],
			shen_zhaoyun:['male','shen',2,['juejing','longhun'],['shu']],
			shen_zhugeliang:['male','shen',3,['qixing','kuangfeng','dawu'],['shu']],
			shen_lvmeng:['male','shen',3,['shelie','gongxin'],['wu']],
			shen_zhouyu:['male','shen',4,['yeyan','qinyin'],['wu']],
			shen_simayi:['male','shen',4,['renjie','sbaiyin','lianpo'],['wei']],
			shen_caocao:['male','shen',3,['guixin','feiying'],['wei']],
			shen_lvbu:['male','shen',5,['baonu','wumou','ol_wuqian','ol_shenfen'],['qun']],
		},
		characterIntro:{
			shen_guanyu:'关羽，字云长。曾水淹七军、擒于禁、斩庞德、威震华夏，吓得曹操差点迁都躲避，但是东吴偷袭荆州，关羽兵败被害。后传说吕蒙因关羽之魂索命而死。',
			shen_lvmeng:'吕蒙，字子明，汝南富陂人，东吴名将，原有“吴下阿蒙”之贬称，后受孙权劝说，奋发读书，最终成就一代名将。',
			shen_zhouyu:'字公瑾，庐江舒县人。东汉末年名将。有姿貌、精音律，江东有“曲有误，周郎顾”之语。周瑜少与孙策交好，后孙策遇刺身亡，孙权继任。周瑜将兵赴丧，以中护军的身份与长史张昭共掌众事，建安十三年（208年），周瑜率东吴军与刘备军联合，在赤壁击败曹操。此战也奠定了三分天下的基础。',
			shen_zhugeliang:'字孔明、号卧龙，汉族，琅琊阳都人，三国时期蜀汉丞相、杰出的政治家、军事家、发明家、文学家。在世时被封为武乡侯，死后追谥忠武侯，后来东晋政权推崇诸葛亮军事才能，特追封他为武兴王。诸葛亮为匡扶蜀汉政权，呕心沥血、鞠躬尽瘁、死而后已。其代表作有《前出师表》、《后出师表》、《诫子书》等。曾发明木牛流马等，并改造连弩，可一弩十矢俱发。于234年在宝鸡五丈原逝世。',
		},
		skill:{
			ol_shenfen:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.storage.baonu>=6;
				},
				usable:1,
				skillAnimation:true,
				animationColor:'metal',
				content:function(){
					"step 0"
					player.storage.baonu-=6;
					player.syncStorage('baonu');
					player.updateMarks('baonu');
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
					                cur.chooseToDiscard('e',true,Infinity);
							cur.chooseToDiscard('h',true,4);
						}
						event.redo();
					         }				
				        "step 3"
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
					return player.storage.baonu>=2;
				},
				filterTarget:function(card,player,target){
					return target!=player&&!target.hasSkill('ol_wuqian_targeted');
				},
				content:function(){
					player.storage.baonu-=2;
					player.syncStorage('baonu');
					player.updateMarks('baonu');
					player.addTempSkill('wushuang');
					player.storage.ol_wuqian_target=target;
					player.addTempSkill('ol_wuqian_target');
					target.addTempSkill('ol_wuqian_targeted');
					var list=game.filterPlayer();
					for(var i=0;i<list.length;i++){
						list[i].addTempSkill('ol_wuqian_equip');
					}
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
					targeted:{},
					target:{
						mark:'character',
						onremove:true,
						intro:{
							content:'获得无双且$防具失效直到回合结束'
						}
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
					if(player.storage.baonu>0){
						player.chooseControlList([
							'移去一枚【暴怒】标记',
							'失去一点体力'
						]).set('ai',function(event,player){
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
						player.storage.baonu--;
						player.syncStorage('baonu');
						player.updateMarks('baonu');
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
					return event.cards&&event.cards.length>1
				},
				content:function(){
					"step 0"
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
				audio:true,
				trigger:{source:'dieAfter'},
				forced:true,
				filter:function(event,player){
					return !player.hasSkill('lianpo2');
				},
				content:function(){
					player.insertPhase();
				}
			},
			baonu:{
				audio:2,
				mark:true,
				marktext:'暴',
				init:function(player){
					player.storage.baonu=2;
					player.markSkill('baonu');
					player.syncStorage('baonu');
				},
				trigger:{source:'damageEnd',player:'damageEnd'},
				forced:true,
				filter:function(event){
					return event.num>0; 
				},
				content:function(){
					player.storage.baonu+=trigger.num;
					player.markSkill('baonu');
					player.syncStorage('baonu');
				},
				intro:{
					content:'mark'
				},
				ai:{
					combo:'shenfen',
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
				audio:true,
				trigger:{player:'damageEnd'},
				forced:true,
				unique:true,
				group:'renjie2',
				notemp:true,
				mark:true,
				filter:function(event){
					return event.num>0;
				},
				init:function(player){
					player.storage.renjie=0;
					game.addVideo('storage',player,['renjie',player.storage.renjie]);
				},
				content:function(){
					player.storage.renjie+=trigger.num;
					game.addVideo('storage',player,['renjie',player.storage.renjie]);
				},
				intro:{
					content:'mark'
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
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
					}
				}
			},
			renjie2:{
				audio:true,
				trigger:{player:'phaseDiscardEnd'},
				forced:true,
				filter:function(event){
					return event.cards&&event.cards.length>0;
				},
				content:function(){
					player.storage.renjie+=trigger.cards.length;
					game.addVideo('storage',player,['renjie',player.storage.renjie]);
				}
			},
			sbaiyin:{
				skillAnimation:'epic',
				trigger:{player:'phaseBegin'},
				forced:true,
				unique:true,
				audio:true,
				filter:function(event,player){
					return player.storage.renjie>=4;
				},
				content:function(){
					player.loseMaxHp();
					player.addSkill('jilue');
					player.awakenSkill('sbaiyin');
				}
			},
			jilue:{
				unique:true,
				group:['jilue_guicai','jilue_fangzhu','jilue_wansha','jilue_zhiheng','jilue_jizhi']
			},
			jilue_guicai:{
				audio:true,
				trigger:{global:'judge'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0&&player.storage.renjie>0;
				},
				content:function(){
					"step 0"
					player.chooseCard('是否弃置一枚“忍”，并发动【鬼才】？').ai=function(card){
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
						player.respond(result.cards,'highlight');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.logSkill('jilue_guicai');
						player.storage.renjie--;
						player.updateMarks();
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.delete();
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						trigger.player.judging[0].discard();
						trigger.player.judging[0]=result.cards[0];
						trigger.position.appendChild(result.cards[0]);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					tag:{
						rejudge:1,
					}
				}
			},
			jilue_fangzhu:{
				audio:true,
				trigger:{player:'damageEnd'},
				direct:true,
				priority:-1,
				filter:function(event,player){
					return player.storage.renjie>0;
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
						player.storage.renjie--;
						player.updateMarks();
						player.logSkill('jilue_fangzhu',result.targets);
						result.targets[0].draw(player.maxHp-player.hp);
						result.targets[0].turnOver();
					}
				},
			},
			jilue_wansha:{
				audio:true,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.storage.renjie>0;
				},
				content:function(){
					player.storage.renjie--;
					player.updateMarks();
					player.addTempSkill('wansha');
				}
			},
			jilue_zhiheng:{
				audio:true,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.storage.renjie>0;
				},
				position:'he',
				filterCard:true,
				selectCard:[1,Infinity],
				prompt:'弃置一枚“忍”，然后弃置任意张牌并摸等量的牌',
				check:function(card){return 6-get.value(card)},
				content:function(){
					player.storage.renjie--;
					player.updateMarks();
					player.draw(cards.length);
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
				audio:true,
				trigger:{player:'useCard'},
				filter:function(event,player){
					return (get.type(event.card)=='trick'&&event.cards[0]&&event.cards[0]==event.card)&&player.storage.renjie>0;
				},
				content:function(){
					player.storage.renjie--;
					player.updateMarks();
					player.draw();
				},
				ai:{
					threaten:1.4
				}
			},
			wushen:{
				mod:{
					cardEnabled:function(card,player){
						if(_status.event.skill!='wushen'&&card.name!='sha'&&get.suit(card)=='heart') return false;
					},
					cardUsable:function(card,player){
						if(_status.event.skill!='wushen'&&card.name!='sha'&&get.suit(card)=='heart') return false;
					},
					cardRespondable:function(card,player){
						if(_status.event.skill!='wushen'&&card.name!='sha'&&get.suit(card)=='heart') return false;
					},
					cardSavable:function(card,player){
						if(_status.event.skill!='wushen'&&card.name!='sha'&&get.suit(card)=='heart') return false;
					},
					targetInRange:function(card){
						if(get.suit(card)=='heart'||_status.event.skill=='wushen') return true;
					}
				},
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				filterCard:{suit:'heart'},
				viewAs:{name:'sha'},
				check:function(){return 1},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondSha')&&current<0) return 0.6
						}
					},
					respondSha:true,
					order:4,
					useful:-1,
					value:-1
				}
			},
			wuhun:{
				trigger:{
                player:"damageEnd",
                              },
                              alter:true,
                       filter:function (event,player){
                       if(event.source==undefined) return false                           
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
				alter:true,
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
				trigger:{global:'gameDrawAfter',player:'phaseBegin'},
				forced:true,
				check:function(event,player){
					return player.hp<=1;
				},
				filter:function(event,player){
					return !player.storage.qixing;
				},
				content:function(){
					"step 0"
					player.gain(get.cards(7))._triggered=null;
					"step 1"
					if(player==game.me){
						game.addVideo('delay',null);
					}
					player.chooseCard('选择七张牌作为星',7,true).ai=function(card){
						return get.value(card);
					};
					"step 2"
					player.lose(result.cards,ui.special)._triggered=null;
					player.storage.qixing=result.cards;
					game.addVideo('storage',player,['qixing',get.cardsInfo(player.storage.qixing),'cards']);
				},
				mark:true,
				intro:{
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
					player.chooseCard('选择任意张手牌与“星”交换',[1,Math.min(player.countCards('h'),player.storage.qixing.length)]).ai=function(card){
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
						player.lose(result.cards,ui.special)._triggered=null;
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
					player.gain(result.links)._triggered=null;
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
				trigger:{player:'phaseEnd'},
				priority:1,
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
					player.discard(result.links);
				},
				group:'dawu3'
			},
			dawu2:{
				trigger:{player:'damageBefore'},
				filter:function(event){
					if(event.nature!='thunder') return true;
					return false;
				},
				mark:true,
				forced:true,
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
				trigger:{player:['phaseBegin','dieBegin']},
				silent:true,
				content:function(){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].hasSkill('dawu2')){
							game.players[i].removeSkill('dawu2');
							game.players[i].popup('dawu2');
						}
						if(game.players[i].hasSkill('kuangfeng2')){
							game.players[i].removeSkill('kuangfeng2');
							game.players[i].popup('kuangfeng2');
						}
					}
				}
			},
			kuangfeng:{
				unique:true,
				audio:2,
				trigger:{player:'phaseEnd'},
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
					player.discard(result.links);
				},
			},
			kuangfeng2:{
				trigger:{player:'damageBegin'},
				filter:function(event){
					if(event.nature=='fire') return true;
					return false;
				},
				mark:true,
				intro:{
					content:'已获得大雾标记'
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
				enable:'phaseUse',
				audio:3,
				animationColor:'fire',
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
				check:function(){return -1},
				selectTarget:function(){
					if(ui.selected.cards.length==4) return 1;
					if(ui.selected.cards.length==0) return [1,3];
					game.uncheck('target');
					return [1,3];
				},
				content:function(){
					player.awakenSkill('yeyan');
					player.storage.yeyan=true;
					if(cards.length==4){
						player.loseHp(3);
						target.damage('fire',3,'nocard');
					}
					else{
						target.damage('fire','nocard');
					}
				},
				ai:{
					order:1,
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
				group:['longhun1','longhun2','longhun3','longhun4'],
				ai:{
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
						}
					},
					maixie:true,
					save:true,
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
				position:'he',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'tao'},
				filter:function(event,player){
					return player.countCards('he',{suit:'heart'})>=player.hp;
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
				position:'he',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'sha',nature:'fire'},
				filter:function(event,player){
					return player.countCards('he',{suit:'diamond'})>=player.hp;
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
				position:'he',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 7-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'wuxie'},
				viewAsFilter:function(player){
					return player.countCards('he',{suit:'spade'})>=player.hp;
				},
				filterCard:function(card){
					return get.suit(card)=='spade';
				}
			},
			longhun4:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张梅花牌当作闪打出';
				},
				position:'he',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
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
				trigger:{player:'phaseDrawBegin'},
				priority:-5,
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				forced:true,
				content:function(){
					trigger.num=2+player.maxHp-player.hp;
				}
			},
			shelie:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				content:function(){
					"step 0"
					trigger.cancel();
					"step 1"
					event.cards=get.cards(5);
					if(event.isMine()==false){
						event.dialog=ui.create.dialog('涉猎',event.cards);
						game.delay(2);
					}
					"step 2"
					if(event.dialog) event.dialog.close();
					var dialog=ui.create.dialog('涉猎',event.cards);
					player.chooseButton([0,5],dialog,true).set('ai',function(button){
						return get.value(button.link);
					}).filterButton=function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(button.link)==get.suit(ui.selected.buttons[i].link)) return false;
						}
						return true;
					}
					"step 3"
					var cards2=[];
					for(var i=0;i<result.buttons.length;i++){
						cards2.push(result.buttons[i].link);
						cards.remove(result.buttons[i].link);
					}
					player.gain(cards2,'log');
					if(cards2.length) player.$gain2(cards2);
					for(var i=0;i<cards.length;i++){
						cards[i].discard();
					}
					game.delay(2);
				},
				ai:{
					threaten:1.2
				}
			},
			gongxin:{
				audio:2,
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
						target.lose(card);
						player.showCards(card,'置于牌堆顶');
					}
					else{
						target.discard(card);
						event.finish();
					}
					"step 3"
					event.card.fix();
					ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
					game.log(player,'将',event.card,'置于牌堆顶');
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
			}
		},
		translate:{
			shen_zhaoyun:'神赵云',
			shen_guanyu:'神关羽',
			shen_lvmeng:'神吕蒙',
			shen_simayi:'神司马懿',
			shen_caocao:'神曹操',
			shen_zhugeliang:'神诸葛亮',
			shen_zhouyu:'神周瑜',
			shen_lvbu:'神吕布',
			longhun:'龙魂',
			longhun1:'龙魂♥︎',
			longhun2:'龙魂♦︎',
			longhun3:'龙魂♠︎',
			longhun4:'龙魂♣︎',
			juejing:'绝境',
			longhun_info:'你可以将同花色的X张牌按下列规则使用或打出：红桃当【桃】，方块当具火焰伤害的【杀】，梅花当【闪】，黑桃当【无懈可击】（X为你当前的体力值且至少为1）',
			juejing_info:'锁定技，摸牌阶段，你摸牌的数量改为你已损失的体力值+2；你的手牌上限+2。',
			wushen:'武神',
			wushen_info:'锁定技，你的红桃手牌视为杀；锁定技，你使用红桃杀时无距离限制。',
			wuhun:'武魂',
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
			renjie_info:'锁定技，每当你受到一次伤害后，你获得等同于你受到的伤害数量的“忍”标记；锁定技，每当你于弃牌阶段内因你的弃置而失去手牌时，你获得等同于你失去的手牌数量的“忍”标记。',
			sbaiyin:'拜印',
			sbaiyin_info:'觉醒技，准备阶段开始时，若你拥有的“忍”标记枚数不小于4，你减1点体力上限，然后获得“极略”',
			jilue:'极略',
			jilue_info:'每当一名角色的判定牌生效前，若你有手牌，你可以弃1枚“忍”标记发动“鬼才”；每当你受到伤害后，你可以弃1枚“忍”标记，发动“放逐”；每当你使用锦囊牌时，你可以弃1枚“忍”标记，发动“集智”；出牌阶段限一次，若你有牌，你可以弃1枚“忍”标记，发动“制衡”；出牌阶段，你可以弃1枚“忍”标记，执行“完杀”的效果，直到回合结束。',
			jilue_guicai:'鬼才',
			jilue_fangzhu:'放逐',
			jilue_wansha:'完杀',
			jilue_zhiheng:'制衡',
			jilue_jizhi:'集智',
			lianpo:'连破',
			lianpo2:'连破',
			lianpo_info:'若你在一回合内杀死了至少一名角色，此回合结束后，你可以进行一个额外的回合。',
			guixin:'归心',
			qinyin:'琴音',
			yeyan:'业炎',
			shelie_info:'摸牌阶段，你可以改为从牌堆顶亮出五张牌，你获得不同花色的牌各一张',
			gongxin_info:'出牌阶段，你可以观看一名其他角色的手牌，并可以展示其中一张红桃牌，然后将其弃置或置于牌堆顶，每阶段限一次。',
			guixin_info:'当你受到1点伤害后，你可以获得每名其他角色区域里的一张牌，然后你翻面',
			guixin_info_alter:'当你受到1点伤害后，你可以随机获得每名其他角色区域里的一张牌，然后你翻面',
			qinyin_info:'弃牌阶段结束时，若你于此阶段内弃置过你的至少两张手牌，则你可以选择一项：1. 所有角色各回复1点体力；2. 所有角色各失去1点体力。',
			// qinyin_info:'每当你于弃牌阶段内因你的弃置而失去第X张手牌时（X至少为2），你可以选择一项：1.令所有角色各回复1点体力；2.令所有角色各失去1点体力。每阶段限一次。',
			yeyan_info:'限定技，出牌阶段，你可以对一至三名角色造成至多共3点火焰伤害（你可以任意分配每名目标角色受到的伤害点数），若你将对一名角色分配2点或更多的火焰伤害，你须先弃置四张不同花色的手牌再失去3点体力。',
			qixing:'七星',
			qixing_bg:'星',
			qixing2:'七星',
			qixing3:'七星',
			qixing_info:'游戏开始前，共发你11张牌，选4张作为手牌，其余的面朝下置于一旁（移出游戏），称之为“星”。每当你于摸牌阶段摸牌后，可用任意数量的手牌等量交换这些“星”。',
			dawu:'大雾',
			dawu2_bg:'雾',
			dawu2:'大雾',
			dawu3:'大雾',
			// dawu2_info:'已获得大雾标记',
			dawu_info:'结束阶段，你可以弃掉X枚“星”指定X名角色：直到你的下回合开始，防止他们受到的除雷电伤害外的一切伤害。',
			kuangfeng:'狂风',
			kuangfeng2:'狂风',
			kuangfeng2_bg:'风',
			// kuangfeng2_info:'已获得狂风标记',
			kuangfeng3:'狂风',
			kuangfeng_info:'结束阶段，你可以弃掉1枚“星”指定一名角色：直到你的下回合开始，该角色每次受到的火焰伤害+1。',
			baonu:'狂暴',
			baonu_bg:'暴',
			baonu_info:'锁定技，游戏开始时，你获得两枚“暴怒”标记，；锁定技，每当你造成/受到1点伤害后，你获得1枚“暴怒”标记。',
			shenfen:'神愤',
			shenfen_info:'限定技，出牌阶段，你可以弃置6枚暴怒标记，对场上所有其他角色造成一点伤害，然后令其弃置4张牌',
			wuqian:'无前',
			wuqian_info:'出牌阶段，你可以弃置两枚暴怒标记并获得技能【无双】直到回合结束',
			wumou:'无谋',
			wumou_info:'锁定技，每当你使用非延时类锦囊牌选择目标后，你选择一项：1.弃1枚“暴怒”标记；2.失去1点体力。',
			ol_wuqian:'无前',
			ol_wuqian_info:'出牌阶段，你可以弃2枚“暴怒”标记并选择一名其他角色，你视为拥有技能“无双”并令其防具无效，直到回合结束。',
			ol_shenfen:'神愤',
			ol_shenfen_info:'出牌阶段，你可以弃6枚“暴怒”标记并选择所有其他角色，对这些角色各造成1点伤害，然后这些角色先各弃置其装备区里的牌，再各弃置四张手牌，最后你将你的武将牌翻面。每阶段限一次。',
		},
	};
});
