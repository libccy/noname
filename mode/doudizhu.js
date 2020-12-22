'use strict';
game.import('mode',function(lib,game,ui,get,ai,_status){
	return {
		name:'doudizhu',
		start:function(){
			"step 0"
			var playback=localStorage.getItem(lib.configprefix+'playback');
			if(playback){
				ui.create.me();
				ui.arena.style.display='none';
				ui.system.style.display='none';
				_status.playback=playback;
				localStorage.removeItem(lib.configprefix+'playback');
				var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
				store.get(parseInt(playback)).onsuccess=function(e){
					if(e.target.result){
						game.playVideoContent(e.target.result.video);
					}
					else{
						alert('播放失败：找不到录像');
						game.reload();
					}
				}
				event.finish();
			}
			else if(!_status.connectMode){
				game.prepareArena(3);
			}
			"step 1"
			_status.mode=get.config('doudizhu_mode');
			if(_status.connectMode){
				_status.mode=lib.configOL.doudizhu_mode;
				game.waitForPlayer(function(){
						lib.configOL.number=3;
				});
			}
			"step 2"
			if(_status.connectMode){
				if(lib.configOL.number<3){
					lib.configOL.number=3;
				}
				game.randomMapOL();
			}
			else{
				for(var i=0;i<game.players.length;i++){
					game.players[i].getId();
				}
				game.chooseCharacter();
			}
			"step 3"
			if(ui.coin){
				_status.coinCoeff=get.coinCoeff([game.me.name]);
			}
			game.showIdentity(true);
			var map={};
			for(var i in lib.playerOL){
				map[i]=lib.playerOL[i].identity;
			}
			game.broadcast(function(map){
				for(var i in map){
					lib.playerOL[i].identity=map[i];
					lib.playerOL[i].setIdentity();
					lib.playerOL[i].ai.shown=1;
				}
			},map);
			
			game.syncState();
			event.trigger('gameStart');
			
			var players=get.players(lib.sort.position);
			var info=[];
			for(var i=0;i<players.length;i++){
				info.push({
					name:players[i].name1,
					name2:players[i].name2,
					identity:players[i].identity
				});
			}
			_status.videoInited=true;
			game.addVideo('init',null,info);
			if(_status.mode=='kaihei') game.addGlobalSkill('kaihei');

			game.gameDraw(game.zhu||_status.firstAct||game.me);
			if(_status.connectMode&&lib.configOL.change_card) game.replaceHandcards(game.players.slice(0));
			game.phaseLoop(game.zhu||_status.firstAct||game.me);
			game.zhu.showGiveup();
		},
		game:{
			recommendDizhu:[
				're_guojia','re_huanggai','re_lvbu','re_guanyu','re_sunquan','re_xusheng','re_wuyi','re_sunben',
				'xuyou','zhangchunhua','caochong','zhangsong','zhongyao','wangyi',
				'caochun','maliang','sp_diaochan','quyi','sp_zhaoyun','shamoke',
				'lijue','liuzan','wenyang','shen_lvmeng','shen_ganning',
				'jiakui','wangyuanji','lingcao','miheng',
				'sp_key_yuri','key_hinata','key_rin','key_kyousuke',
				'ns_chendao','old_jiakui',
			],
			addRecord:function(bool){
				if(typeof bool=='boolean'){
					var data=lib.config.gameRecord.doudizhu.data;
					var identity=game.me.identity;
					if(!data[identity]){
						data[identity]=[0,0];
					}
					if(bool){
						data[identity][0]++;
					}
					else{
						data[identity][1]++;
					}
					var list=['zhu','fan'];
					var str='';
					for(var i=0;i<list.length;i++){
						if(data[list[i]]){
							str+=lib.translate[list[i]+'2']+'：'+data[list[i]][0]+'胜'+' '+data[list[i]][1]+'负<br>';
						}
					}
					lib.config.gameRecord.doudizhu.str=str;
					game.saveConfig('gameRecord',lib.config.gameRecord);
				}
			},
			getState:function(){
				var state={};
				for(var i in lib.playerOL){
					var player=lib.playerOL[i];
					state[i]={identity:player.identity};
				}
				return state;
			},
			updateState:function(state){
				for(var i in state){
					var player=lib.playerOL[i];
					if(player){
						player.identity=state[i].identity;
					}
				}
			},
			getRoomInfo:function(uiintro){
				uiintro.add('<div class="text chat">双将模式：'+(lib.configOL.double_character?'开启':'关闭'));
				// uiintro.add('<div class="text chat">屏蔽弱将：'+(lib.configOL.ban_weak?'开启':'关闭'));
				// var last=uiintro.add('<div class="text chat">屏蔽强将：'+(lib.configOL.ban_strong?'开启':'关闭'));
				if(lib.configOL.banned.length){
					uiintro.add('<div class="text chat">禁用武将：'+get.translation(lib.configOL.banned));
				}
				if(lib.configOL.bannedcards.length){
					uiintro.add('<div class="text chat">禁用卡牌：'+get.translation(lib.configOL.bannedcards));
				}
				uiintro.style.paddingBottom='8px';
			},
			getVideoName:function(){
				var str=get.translation(game.me.name);
				if(game.me.name2){
					str+='/'+get.translation(game.me.name2);
				}
				var name=[
					str,
					'欢乐斗地主'+' - '+lib.translate[game.me.identity+'2']
				];
				return name;
			},
			showIdentity:function(me){
				for(var i=0;i<game.players.length;i++){
					// if(me===false&&game.players[i]==game.me) continue;
					game.players[i].node.identity.classList.remove('guessing');
					game.players[i].identityShown=true;
					game.players[i].ai.shown=1;
					game.players[i].setIdentity(game.players[i].identity);
					if(game.players[i].identity=='zhu'){
						game.players[i].isZhu=true;
					}
				}
				if(_status.clickingidentity){
					for(var i=0;i<_status.clickingidentity[1].length;i++){
						_status.clickingidentity[1][i].delete();
						_status.clickingidentity[1][i].style.transform='';
					}
					delete _status.clickingidentity;
				}
			},
			checkResult:function(){
				var me=game.me._trueMe||game.me;
				if(game.zhu.isAlive()){
					if(game.players.length>1) return;
					if(me==game.zhu){
						game.over(true);
					}
					else{
						game.over(false);
					}
				}
				else {
					if(me==game.zhu){
						game.over(false);
					}
					else{
						game.over(true);
					}
				}
			},
			checkOnlineResult:function(player){
				if(game.zhu.isAlive()){
					return player.identity=='zhu';
				}
				else return player.identity=='fan';
			},
			chooseCharacterHuanle:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					event.list=[];
					event.list2=[];
					var list4=[];
					if(!event.map) event.map={};
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							var name=ix.randomGet();
							event.list.push(name);
							if(game.recommendDizhu.contains(name)) event.list2.push(name);
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(list4.contains(i)||lib.filter.characterDisabled(i)) continue;
						event.list.push(i);
						if(game.recommendDizhu.contains(i)) event.list2.push(i);
					}
					event.list.randomSort();
					_status.characterlist=event.list.slice(0);
					event.controls=['不叫','叫地主'];
					for(var player of game.players){
						var id=player.playerid;
						if(!event.map[id]) event.map[id]=[];
						event.map[id].addArray(event.list2.randomRemove(1));
						event.list.removeArray(event.map[id]);
						event.map[id].addArray(event.list.randomRemove(4-event.map[id].length));
						event.list2.removeArray(event.map[id]);
					}
					event.dialog=ui.create.dialog('你的选将框',[event.map[game.me.playerid],'character']);
					event.start=game.players.randomGet();
					event.current=event.start;
					lib.init.onfree();
					game.delay(2.5);
					"step 1"
					event.current.chooseControl(event.controls).set('ai',function(){
						return Math.random()>0.5?'不叫':'叫地主';
					});
					if(event.current==game.me){
						event.dialog.content.childNodes[0].innerHTML='是否抢地主？';
					}
					"step 2"
					event.current.chat(result.control);
					if(result.control=='叫地主'||event.current==event.start.next){
						game.zhu=result.control=='叫地主'?event.current:event.current.next;
						for(var player of game.players){
							player.identity=player==game.zhu?'zhu':'fan';
							player.showIdentity();
						}
						event.dialog.close();
						event.map[game.zhu.playerid].addArray(event.list.randomRemove(3));
					}
					else{
						event.current=event.current.next;
						event.goto(1);
						game.delay(1.5);
					}
					"step 3"
					game.me.chooseButton(['请选择你的武将',[event.map[game.me.playerid],'character']],true);
					"step 4"
					game.me.init(result.links[0]);
					for(var player of game.players){
						if(player!=game.me) player.init(event.map[player.playerid].randomGet());
					}
					game.zhu.hp++;
					game.zhu.maxHp++;
					game.zhu.update();
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			
			chooseCharacterKaihei:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var identityList=['zhu','fan','fan'];
					game.saveConfig('continue_name');
					event.list=[];
					var list4=[];
					identityList.randomSort();
					for(i=0;i<game.players.length;i++){
						game.players[i].identity=identityList[i];
						game.players[i].showIdentity();
						if(identityList[i]=='zhu'){
							game.zhu=game.players[i];
						}
					}

					if(!game.zhu) game.zhu=game.me;
					else{
						game.zhu.setIdentity();
						game.zhu.identityShown=true;
						game.zhu.isZhu=(game.zhu.identity=='zhu');
						game.zhu.node.identity.classList.remove('guessing');
						game.me.setIdentity();
						game.me.node.identity.classList.remove('guessing');
					}
					
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							event.list.push(ix.randomGet());
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(list4.contains(i)||lib.filter.characterDisabled(i)) continue;
						event.list.push(i);
					}
					event.list.randomSort();
					_status.characterlist=event.list.slice(0);
					for(var player of game.players){
						player._characterChoice=event.list.randomRemove(player.identity=='zhu'?5:3);
						if(player.identity=='fan') player._friend=(player.next.identity=='fan'?player.next:player.previous);
					}
					var createDialog=['选择武将'];
					createDialog.push([game.me._characterChoice,'character']);
					if(game.me._friend){
						createDialog.push('队友的武将');
						createDialog.push([game.me._friend._characterChoice,'character']);
					}
					game.me.chooseButton(createDialog,true).set('onfree',true).set('filterButton',function(button){
						return _status.event.player._characterChoice.contains(button.link);
					});
					"step 1"
					game.me.init(result.links[0]);
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me) game.players[i].init(game.players[i]._characterChoice.randomGet());
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
						if(game.players[i]==game.zhu){
							game.players[i].hp++;
							game.players[i].maxHp++;
							game.players[i].update();
						}
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

				});
			},
			chooseCharacter:function(){
				if(_status.mode=='kaihei'){
					game.chooseCharacterKaihei();
					return;
				}
				if(_status.mode=='huanle'){
					game.chooseCharacterHuanle();
					return;
				}
				var next=game.createEvent('chooseCharacter',false);
				next.showConfig=true;
				next.addPlayer=function(player){
					var list=lib.config.mode_config.identity.identity[game.players.length-3].slice(0);
					var list2=lib.config.mode_config.identity.identity[game.players.length-2].slice(0);
					for(var i=0;i<list.length;i++) list2.remove(list[i]);
					player.identity=list2[0];
					player.setIdentity('cai');
				};
				next.removePlayer=function(){
					return game.players.randomGet(game.me,game.zhu);
				};
				next.ai=function(player,list,list2,back){
					var listc=list.slice(0,2);
					for(var i=0;i<listc.length;i++){
						var listx=lib.characterReplace[listc[i]];
						if(listx&&listx.length) listc[i]=listx.randomGet();
					}
					if(get.config('double_character')){
						player.init(listc[0],listc[1]);
					}
					else{
						player.init(listc[0]);
					}
					if(player==game.zhu){
						player.hp++;
						player.maxHp++;
						player.update();
					}
					if(back){
						list.remove(get.sourceCharacter(player.name1));
						list.remove(get.sourceCharacter(player.name2));
						for(var i=0;i<list.length;i++){
							back.push(list[i]);
						}
					}
					if(typeof lib.config.test_game=='string'&&player==game.me.next){
						player.init(lib.config.test_game);
					}
					player.node.name.dataset.nature=get.groupnature(player.group);
				}
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var list;
					var list4=[];
					var identityList=['zhu','fan','fan'];
					var chosen=lib.config.continue_name||[];
					game.saveConfig('continue_name');
					event.chosen=chosen;

					var addSetting=function(dialog){
						dialog.add('选择身份').classList.add('add-setting');
						var table=document.createElement('div');
						table.classList.add('add-setting');
						table.style.margin='0';
						table.style.width='100%';
						table.style.position='relative';
						
						var listi=['random','zhu','fan'];
						for(var i=0;i<listi.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.link=listi[i];
							if(td.link===game.me.identity){
								td.classList.add('bluebg');
							}
							table.appendChild(td);
							td.innerHTML='<span>'+get.translation(listi[i]+'2')+'</span>';
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								_status.tempNoButton=true;
								setTimeout(function(){
									_status.tempNoButton=false;
								},500);
								var link=this.link;
								if(game.zhu.name){
									if(link!='random'){
										_status.event.parent.fixedseat=get.distance(game.me,game.zhu,'absolute');
									}
									game.zhu.uninit();
									delete game.zhu.isZhu;
									delete game.zhu.identityShown;
								}
								var current=this.parentNode.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								current=seats.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								if(link=='random'){
									link=['zhu','fan'].randomGet();
									for(var i=0;i<this.parentNode.childElementCount;i++){
										if(this.parentNode.childNodes[i].link==link){
											this.parentNode.childNodes[i].classList.add('bluebg');
										}
									}
								}
								else{
									this.classList.add('bluebg');
								}
								num=get.config('choice_'+link);
								_status.event.parent.swapnodialog=function(dialog,list){
									var buttons=ui.create.div('.buttons');
									var node=dialog.buttons[0].parentNode;
									dialog.buttons=ui.create.buttons(list,'characterx',buttons);
									dialog.content.insertBefore(buttons,node);
									buttons.animate('start');
									node.remove();
									game.uncheck();
									game.check();
									for(var i=0;i<seats.childElementCount;i++){
										if(get.distance(game.zhu,game.me,'absolute')===seats.childNodes[i].link){
											seats.childNodes[i].classList.add('bluebg');
										}
									}
								}
								_status.event=_status.event.parent;
								_status.event.step=0;
								_status.event.identity=link;
								if(link!=(event.zhongmode?'mingzhong':'zhu')){
									seats.previousSibling.style.display='';
									seats.style.display='';
								}
								else{
									seats.previousSibling.style.display='none';
									seats.style.display='none';
								}
								game.resume();
							});
						}
						dialog.content.appendChild(table);

						dialog.add('选择座位').classList.add('add-setting');
						var seats=document.createElement('div');
						seats.classList.add('add-setting');
						seats.style.margin='0';
						seats.style.width='100%';
						seats.style.position='relative';
						for(var i=2;i<=game.players.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML=get.cnNumber(i,true);
							td.link=i-1;
							seats.appendChild(td);
							if(get.distance(game.zhu,game.me,'absolute')===i-1){
								td.classList.add('bluebg');
							}
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								if(get.distance(game.zhu,game.me,'absolute')==this.link) return;
								var current=this.parentNode.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								this.classList.add('bluebg');
								for(var i=0;i<game.players.length;i++){
									if(get.distance(game.players[i],game.me,'absolute')==this.link){
										game.swapSeat(game.zhu,game.players[i],false);return;
									}
								}
							});
						}
						dialog.content.appendChild(seats);
						if(game.me==game.zhu){
							seats.previousSibling.style.display='none';
							seats.style.display='none';
						}

						dialog.add(ui.create.div('.placeholder.add-setting'));
						dialog.add(ui.create.div('.placeholder.add-setting'));
						if(get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
					};
					var removeSetting=function(){
						var dialog=_status.event.dialog;
						if(dialog){
							dialog.style.height='';
							delete dialog._scrollset;
							var list=Array.from(dialog.querySelectorAll('.add-setting'));
							while(list.length){
								list.shift().remove();
							}
							ui.update();
						}
					};
					event.addSetting=addSetting;
					event.removeSetting=removeSetting;
					event.list=[];
					identityList.randomSort();
					if(event.identity){
						identityList.remove(event.identity);
						identityList.unshift(event.identity);
						if(event.fixedseat){
							var zhuIdentity='zhu';
							if(zhuIdentity!=event.identity){
								identityList.remove(zhuIdentity);
								identityList.splice(event.fixedseat,0,zhuIdentity);
							}
							delete event.fixedseat;
						}
						delete event.identity;
					}
					for(i=0;i<game.players.length;i++){
							game.players[i].identity=identityList[i];
							game.players[i].showIdentity();
							if(identityList[i]=='zhu'){
								game.zhu=game.players[i];
							}
					}

					if(!game.zhu) game.zhu=game.me;
					else{
						game.zhu.setIdentity();
						game.zhu.identityShown=true;
						game.zhu.isZhu=(game.zhu.identity=='zhu');
						game.zhu.node.identity.classList.remove('guessing');
						game.me.setIdentity();
						game.me.node.identity.classList.remove('guessing');
					}
					//选将框分配
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(chosen.contains(ix[j])||lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							event.list.push(i);
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(chosen.contains(i)||list4.contains(i)) continue;
						if(lib.filter.characterDisabled(i)) continue;
						event.list.push(i);
						list4.push(i);
					}
					event.list.randomSort();
					_status.characterlist=list4.slice(0);
					var num=get.config('choice_'+game.me.identity);
					list=event.list.slice(0,num);
					delete event.swapnochoose;
					var dialog;
					if(event.swapnodialog){
						dialog=ui.dialog;
						event.swapnodialog(dialog,list);
						delete event.swapnodialog;
					}
					else{
						var str='选择角色';
						if(_status.brawl&&_status.brawl.chooseCharacterStr){
							str=_status.brawl.chooseCharacterStr;
						}
						dialog=ui.create.dialog(str,'hidden',[list,'characterx']);
						if(!_status.brawl||!_status.brawl.noAddSetting){
							if(get.config('change_identity')){
								addSetting(dialog);
							}
						}
					}
					dialog.setCaption('选择角色');
					game.me.setIdentity();
					
					if(!event.chosen.length){
						game.me.chooseButton(dialog,true).set('onfree',true).selectButton=function(){
							return get.config('double_character')?2:1
						};
					}
					else{
						lib.init.onfree();
					}
					ui.create.cheat=function(){
						_status.createControl=ui.cheat2;
						ui.cheat=ui.create.control('更换',function(){
							if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
								return;
							}
							if(game.changeCoin){
								game.changeCoin(-3);
							}
							
							event.list.randomSort();
							list=event.list.slice(0,num);
							
							var buttons=ui.create.div('.buttons');
							var node=_status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons=ui.create.buttons(list,'characterx',buttons);
							_status.event.dialog.content.insertBefore(buttons,node);
							buttons.animate('start');
							node.remove();
							game.uncheck();
							game.check();
						});
						delete _status.createControl;
					};
					if(lib.onfree){
						lib.onfree.push(function(){
							event.dialogxx=ui.create.characterDialog('heightset');
							if(ui.cheat2){
								ui.cheat2.animate('controlpressdownx',500);
								ui.cheat2.classList.remove('disabled');
							}
						});
					}
					else{
						event.dialogxx=ui.create.characterDialog('heightset');
					}

					ui.create.cheat2=function(){
						ui.cheat2=ui.create.control('自由选将',function(){
							if(this.dialog==_status.event.dialog){
								if(game.changeCoin){
									game.changeCoin(50);
								}
								this.dialog.close();
								_status.event.dialog=this.backup;
								this.backup.open();
								delete this.backup;
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.animate('controlpressdownx',500);
									ui.cheat.classList.remove('disabled');
								}
							}
							else{
								if(game.changeCoin){
									game.changeCoin(-10);
								}
								this.backup=_status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog=_status.event.parent.dialogxx;
								this.dialog=_status.event.dialog;
								this.dialog.open();
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.classList.add('disabled');
								}
							}
						});
						if(lib.onfree){
							ui.cheat2.classList.add('disabled');
						}
					}
					if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
						if(!ui.cheat&&get.config('change_choice'))
						ui.create.cheat();
						if(!ui.cheat2&&get.config('free_choose'))
						ui.create.cheat2();
					}
					"step 1"
					if(ui.cheat){
						ui.cheat.close();
						delete ui.cheat;
					}
					if(ui.cheat2){
						ui.cheat2.close();
						delete ui.cheat2;
					}
					var chooseGroup=false;
					if(event.chosen.length){
						if(lib.character[event.chosen[0]][1]=='shen'){
							chooseGroup=true;
						}
					}
					else if(event.modchosen){
						if(event.modchosen[0]=='random') event.modchosen[0]=result.buttons[0].link;
						else event.modchosen[1]=result.buttons[0].link;
					}
					else if(result.buttons.length==2){
						event.choosed=[result.buttons[0].link,result.buttons[1].link];
						game.addRecentCharacter(result.buttons[0].link,result.buttons[1].link);
						if(lib.character[event.choosed[0]][1]=='shen'){
							chooseGroup=true;
						}
					}
					else{
						event.choosed=[result.buttons[0].link];
						if(lib.character[event.choosed[0]][1]=='shen'){
							chooseGroup=true;
						}
						game.addRecentCharacter(result.buttons[0].link);
					}
					"step 2"
					if(event.chosen.length){
						game.me.init(event.chosen[0],event.chosen[1]);
					}
					else if(event.modchosen){
						game.me.init(event.modchosen[0],event.modchosen[1]);
					}
					else if(event.choosed.length==2){
						game.me.init(event.choosed[0],event.choosed[1]);
					}
					else{
						game.me.init(event.choosed[0]);
					}
					event.list.remove(get.sourceCharacter(game.me.name1));
					event.list.remove(get.sourceCharacter(game.me.name2));
					if(game.me==game.zhu){
						game.me.hp++;
						game.me.maxHp++;
						game.me.update();
					}
					
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							event.list.randomSort();
							event.ai(game.players[i],event.list.splice(0,get.config('choice_'+game.players[i].identity)),null,event.list)
						}
					}
					"step 3"
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(get.sourceCharacter(game.players[i].name1));
						_status.characterlist.remove(get.sourceCharacter(game.players[i].name2));
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

				});
			},
			
			chooseCharacterKaiheiOL:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var identityList=['fan','fan','fan'];
					var aiList=game.filterPlayer(function(current){
						return current!=game.me&&!current.isOnline();
					});
					if(aiList.length==1){
						identityList[game.players.indexOf(aiList[0])]='zhu';
					}
					else{
						identityList[0]='zhu';
						identityList.randomSort();
					}
					for(i=0;i<game.players.length;i++){
						game.players[i].identity=identityList[i];
						game.players[i].showIdentity();
						game.players[i].identityShown=true;
						if(identityList[i]=='zhu') game.zhu=game.players[i];
					}
					event.list=[];
					var list4=[];
					
					var libCharacter={};
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(j=='zuoci') continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(!libCharacter[ix[j]]||lib.filter.characterDisabled(ix[j],libCharacter)) ix.splice(j--,1);
						}
						if(ix.length){
							event.list.push(ix.randomGet());
							list4.addArray(ix);
						}
					}
					for(i in libCharacter){
						if(list4.contains(i)||lib.filter.characterDisabled(i,libCharacter)) continue;
						event.list.push(i);
					}
					_status.characterlist=event.list.slice(0);
					
					var map={};
					for(var player of game.players){
						player._characterChoice=event.list.randomRemove(player.identity=='zhu'?5:3);
						if(player.identity=='fan') player._friend=(player.next.identity=='fan'?player.next:player.previous);
						map[player.playerid]=player._characterChoice;
					}
					game.broadcast(function(map){
						for(var i in map){
							lib.playerOL[i]._characterChoice=map[i];
						}
					},map);
					"step 1"
					var list=[];
					for(var i=0;i<game.players.length;i++){
						var dialog=['请选择武将',[game.players[i]._characterChoice,'character']];
						if(game.players[i]._friend){
							dialog.push('队友的武将');
							dialog.push([game.players[i]._friend._characterChoice,'character']);
						}
						list.push([game.players[i],dialog,true,function(){return Math.random()},function(button){
							return _status.event.player._characterChoice.contains(button.link);
						}]);
					}
					game.me.chooseButtonOL(list,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0]);
					});
					"step 2"
					for(var i in lib.playerOL){
						if(!result[i]||result[i]=='ai'||!result[i].links||!result[i].links.length){
							result[i]=lib.playerOL[i]._characterChoice.randomGet();
						}
						else{
							result[i]=result[i].links[0];
						}
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i]);
						}
					}
					
					game.zhu.maxHp++;
					game.zhu.hp++;
					game.zhu.update();
					
					game.broadcast(function(result,zhu){
						for(var i in result){
							if(!lib.playerOL[i].name){
								lib.playerOL[i].init(result[i]);
							}
						}
						game.zhu=zhu;
						zhu.maxHp++;
						zhu.hp++;
						zhu.update();
						
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
					},result,game.zhu);
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			chooseCharacterHuanleOL:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					event.list=[];
					event.list2=[];
					var list4=[];
					event.controls=['不叫','叫地主'];
					if(!event.map) event.map={};
					var libCharacter={};
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(j=='zuoci') continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(!libCharacter[ix[j]]||lib.filter.characterDisabled(ix[j],libCharacter)) ix.splice(j--,1);
						}
						if(ix.length){
							var name=ix.randomGet();
							event.list.push(name);
							if(game.recommendDizhu.contains(name)) event.list2.push(name);
							list4.addArray(ix);
						}
					}
					for(i in libCharacter){
						if(list4.contains(i)||lib.filter.characterDisabled(i,libCharacter)) continue;
						event.list.push(i);
						if(game.recommendDizhu.contains(i)) event.list2.push(i);
					}
					for(var player of game.players){
						var id=player.playerid;
						if(!event.map[id]) event.map[id]=[];
						event.map[id].addArray(event.list2.randomRemove(1));
						event.list.removeArray(event.map[id]);
						event.map[id].addArray(event.list.randomRemove(4-event.map[id].length));
						event.list2.removeArray(event.map[id]);
					}
					_status.characterlist=event.list.slice(0);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(map,id){
						ui.create.dialog('你的选将框',[map[game.me.playerid],'character']).videoId=id;
					},event.map,event.videoId);
					event.start=game.players.randomGet();
					event.current=event.start;
					if(event.current!=game.me||!event.current.isOnline()) game.delay(3);
					"step 1"
					event.current.chooseControl(event.controls).set('ai',function(){
						return Math.random()>0.5?'不叫':'叫地主';
					});
					"step 2"
					event.current.chat(result.control);
					if(result.control=='叫地主'||event.current==event.start.next){
						game.zhu=result.control=='叫地主'?event.current:event.current.next;
						for(var player of game.players){
							player.identity=player==game.zhu?'zhu':'fan';
							player.showIdentity();
							player.identityShown=true;
						}
						game.broadcastAll('closeDialog',event.videoId)
						event.map[game.zhu.playerid].addArray(event.list.randomRemove(3));
					}
					else{
						event.current=event.current.next;
						event.goto(1);
					}
					"step 3"
					var list=[];
					var str='选择角色';
					for(var i=0;i<game.players.length;i++){
						list.push([game.players[i],[str,[event.map[game.players[i].playerid],'character']],true]);
					}
					game.me.chooseButtonOL(list,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0],result.links[1]);
					});
					"step 4"
					for(var i in result){
						if(result[i]&&result[i].links){
							for(var j=0;j<result[i].links.length;j++){
								event.list2.remove(result[i].links[j]);
							}
						}
					}
					for(var i in result){
						if(result[i]=='ai'){
							result[i]=event.list2.randomRemove(lib.configOL.double_character?2:1);
						}
						else{
							result[i]=result[i].links
						}
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i][0],result[i][1]);
						}
					}
					
					game.zhu.maxHp++;
					game.zhu.hp++;
					game.zhu.update();
					
					game.broadcast(function(result,zhu){
						for(var i in result){
							if(!lib.playerOL[i].name){
								lib.playerOL[i].init(result[i][0],result[i][1]);
							}
						}
						game.zhu=zhu;
						zhu.maxHp++;
						zhu.hp++;
						zhu.update();
						
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
					},result,game.zhu);
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			chooseCharacterOL:function(){
				if(_status.mode=='kaihei'){
					game.chooseCharacterKaiheiOL();
					return;
				}
				else if(_status.mode=='huanle'){
					game.chooseCharacterHuanleOL();
					return;
				}
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var identityList=['zhu','fan','fan'];
					identityList.randomSort();
					for(i=0;i<game.players.length;i++){
						game.players[i].identity=identityList[i];
						game.players[i].showIdentity();
						game.players[i].identityShown=true;
						if(identityList[i]=='zhu') game.zhu=game.players[i];
					}

					var list;
					var list4=[];
					event.list=[];

					var libCharacter={};
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(j=='zuoci') continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(!libCharacter[ix[j]]||lib.filter.characterDisabled(ix[j],libCharacter)) ix.splice(j--,1);
						}
						if(ix.length){
							event.list.push(i);
							list4.addArray(ix);
						}
					}
					game.broadcast(function(list){
						for(var i in lib.characterReplace){
							var ix=lib.characterReplace[i];
							for(var j=0;j<ix.length;j++){
								if(!list.contains(ix[j])) ix.splice(j--,1);
							}
						}
					},list4);
					for(i in libCharacter){
						if(list4.contains(i)||lib.filter.characterDisabled(i,libCharacter)) continue;
						event.list.push(i);
						list4.push(i)
					}
					_status.characterlist=list4;
					"step 1"
					var list=[];
					var selectButton=(lib.configOL.double_character?2:1);

					var num,num2=0;
					num=Math.floor(event.list.length/game.players.length);
					num2=event.list.length-num*game.players.length;
					if(num>5){
						num=5;
					}
					if(num2>2){
						num2=2;
					}
					
					for(var i=0;i<game.players.length;i++){
							var num3=0;
							if(game.players[i]==game.zhu) num3=3;
							var str='选择角色';
							list.push([game.players[i],[str,[event.list.randomRemove(num+num3),'characterx']],selectButton,true]);
					}
					game.me.chooseButtonOL(list,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0],result.links[1]);
					});
					"step 2"
					for(var i in result){
						if(result[i]&&result[i].links){
							for(var j=0;j<result[i].links.length;j++){
								event.list.remove(get.sourceCharacter(result[i].links[j]));
							}
						}
					}
					for(var i in result){
						if(result[i]=='ai'){
							var listc=event.list.randomRemove(lib.configOL.double_character?2:1);
							for(var i=0;i<listc.length;i++){
								var listx=lib.characterReplace[listc[i]];
								if(listx&&listx.length) listc[i]=listx.randomGet();
							}
							result[i]=listc;
						}
						else{
							result[i]=result[i].links
						}
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i][0],result[i][1]);
						}
					}
					
					game.zhu.maxHp++;
					game.zhu.hp++;
					game.zhu.update();
					
					game.broadcast(function(result,zhu){
						for(var i in result){
							if(!lib.playerOL[i].name){
								lib.playerOL[i].init(result[i][0],result[i][1]);
							}
						}
						game.zhu=zhu;
						zhu.maxHp++;
						zhu.hp++;
						zhu.update();
						
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
					},result,game.zhu);
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
		},
		translate:{
			zhu:"主",
			fan:"反",
			zhu2:"地主",
			fan2:"农民",
			random2:"随机",
			_feiyang:"飞扬",
			_bahu:"跋扈",
			_feiyang_info:"判定阶段开始时，若你的判定区有牌，则你可以弃置两张手牌，然后弃置你判定区的一张牌。每回合限一次。",
			_bahu_info:"锁定技，准备阶段开始时，你摸一张牌。出牌阶段，你可以多使用一张【杀】。",
			kaihei:'强易',
			kaihei_info:'出牌阶段，你可以获得一名其他角色的至多两张牌，然后交给其等量的牌。每名角色每局游戏限一次。',
		},
		element:{
			player:{
				hasZhuSkill:function(){return false;},
				$dieAfter:function(){
					if(_status.video) return;
					if(!this.node.dieidentity){
						var str={zhu:'地主',fan:'农民'}[this.identity];
						var node=ui.create.div('.damage.dieidentity',str,this);
						ui.refresh(node);
						node.style.opacity=1;
						this.node.dieidentity=node;
					}
					var trans=this.style.transform;
					if(trans){
						if(trans.indexOf('rotateY')!=-1){
							this.node.dieidentity.style.transform='rotateY(180deg)';
						}
						else if(trans.indexOf('rotateX')!=-1){
							this.node.dieidentity.style.transform='rotateX(180deg)';
						}
						else{
							this.node.dieidentity.style.transform='';
						}
					}
					else{
						this.node.dieidentity.style.transform='';
					}
				},
				dieAfter:function(source){
					game.checkResult();
				},
				logAi:function(targets,card){},
				showIdentity:function(){
					game.broadcastAll(function(player,identity){
						player.identity=identity;
						player.node.identity.classList.remove('guessing');
						player.identityShown=true;
						player.ai.shown=1;
						player.setIdentity();
						if(player.identity=='zhu'){
							player.isZhu=true;
						}
						if(_status.clickingidentity){
							for(var i=0;i<_status.clickingidentity[1].length;i++){
								_status.clickingidentity[1][i].delete();
								_status.clickingidentity[1][i].style.transform='';
							}
							delete _status.clickingidentity;
						}
					},this,this.identity);
				}
			}
		},
		get:{
			rawAttitude:function(from,to){
				if(from.identity==to.identity) return 10;
				return -10;
			},
		},
		skill:{
			kaihei:{
				enable:'phaseUse',
				filter:function(event,player){
					return player==game.zhu&&game.hasPlayer(function(current){
						return lib.skill.kaihei.filterTarget(null,player,current);
					});
				},
				filterTarget:function(card,player,target){
					return player!=target&&!target.storage.kaihei&&target.countGainableCards(player,'he')>0;
				},
				content:function(){
					'step 0'
					player.gainPlayerCard(target,[1,2],'he',true);
					target.storage.kaihei=true;
					'step 1'
					if(!result.bool||!result.cards.length){
						event.finish();return;
					}
					var num=result.cards.length;
					var hs=player.getCards('he');
					if(hs.length){
						if(hs.length<=num) event._result={bool:true,cards:hs};
						else player.chooseCard('he',true,num,'选择交给'+get.translation(target)+get.cnNumber(num)+'张牌');
					}
					else event.finish();
					'step 2'
					if(result.bool&&result.cards&&result.cards.length) target.gain(result.cards,player,'giveAuto');
				},
				ai:{
					viewHandcard:true,
					skillTagFilter:function(player,tag,target){
						if(player==target||player.identity!='fan'||target.identity!='fan') return false;
					},
				},
			},
			_feiyang:{
				trigger:{player:'phaseJudgeBegin'},
				direct:true,
				filter:function(event,player){
					return player==game.zhu&&player.countCards('j')&&player.countCards('h')>1;
				},
				content:function(){
					"step 0"
					player.chooseToDiscard('h',2,'是否发动【飞扬】，弃置两张手牌并弃置自己判定区的一张牌？').set('logSkill','_feiyang').ai=function(card){
						return 6-get.value(card);
					};
					"step 1"
					if(result.bool){
						player.discardPlayerCard(player,'j',true);
					}
				},
			},
			_bahu:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player==game.zhu;
				},
				content:function(){
					player.draw();
				},
				mod:{
					cardUsable:function(card,player,num){
						if(player==game.zhu&&card.name=='sha') return num+1;
					},
				},
			},
			_dieAfterDraw:{
				trigger:{global:'dieAfter'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return event.player.identity==player.identity;
				},
				content:function(){
					player.chooseDrawRecover(2);
					player.showGiveup();
				},
			},
		},
		help:{
			'斗地主':'<div style="margin:10px">游戏规则</div><ul style="margin-top:0"><li>游戏人数<br>游戏人数为3人（地主x1 + 农民x2）。<li>胜利条件<br>农民：地主死亡。<br>地主：所有农民死亡且自己存活。'+
			'<li>死亡奖惩<br>当有农民死亡时，若另一名农民存活，则其可以选择摸两张牌或回复一点体力。<li>地主专属技能<br>地主可以使用专属技能【飞扬】和【跋扈】。<br>【飞扬】判定阶段开始时，若你的判定区有牌，则你可以弃置两张手牌，然后弃置你判定区的一张牌。每回合限一次。<br>【跋扈】锁定技，准备阶段开始时，你摸一张牌。出牌阶段，你可以多使用一张【杀】。</ul>',
		}
	};
});
