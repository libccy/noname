'use strict';
mode.guozhan={
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
		else if(_status.connectMode){
			game.waitForPlayer();
		}
		else{
			game.prepareArena();
			game.delay();
			game.showChangeLog();
		}
		if(!_status.connectMode){
			_status.mode=get.config('guozhan_mode');
			if(_status.brawl&&_status.brawl.submode){
				_status.mode=_status.brawl.submode;
			}
		}
		"step 1"
		if(_status.connectMode){
			game.randomMapOL();
			game.broadcastAll(function(){
				for(var i=0;i<game.players.length;i++){
					game.players[i].node.name.hide();
					game.players[i].node.name2.hide();
				}
			});
		}
		else{
			if(lib.storage.test){
				lib.config.game_speed='vfast';
				lib.config.low_performance=true;
				_status.auto=true;
				ui.auto.classList.add('glow');
			}
			for(var i=0;i<game.players.length;i++){
				game.players[i].node.name.hide();
				game.players[i].node.name2.hide();
				game.players[i].getId();
			}
			if(_status.brawl&&_status.brawl.chooseCharacterBefore){
				_status.brawl.chooseCharacterBefore();
			}
			game.chooseCharacter();
		}
		"step 2"
		if(ui.coin){
			_status.coinCoeff=get.coinCoeff([game.me.name1,game.me.name2]);
		}
		var player;
		if(_status.cheat_seat){
			var seat=_status.cheat_seat.link;
			if(seat==0){
				player=game.me;
			}
			else{
				player=game.players[game.players.length-seat];
			}
			if(!player) player=game.me;
			delete _status.cheat_seat;
		}
		else{
			player=game.players[Math.floor(Math.random()*game.players.length)];
		}
		event.trigger('gameStart');

		game.gameDraw(player);
		game.broadcastAll(function(player){
			for(var i=0;i<game.players.length;i++){
				game.players[i].name='unknown'+get.distance(player,game.players[i],'absolute');
				game.players[i].node.name_seat=ui.create.div('.name.name_seat',get.verticalStr(lib.translate[game.players[i].name]),game.players[i]);
				// if(game.players[i]==game.me){
				// 	lib.translate[game.players[i].name]+='（你）';
				// }
			}
		},player);

		var players=get.players(lib.sort.position);
		var info=[];
		for(var i=0;i<players.length;i++){
			info.push({
				name:game.players[i].name,
				translate:lib.translate[game.players[i].name],
				name1:players[i].name1,
				name2:players[i].name2,
			});
		}
		_status.videoInited=true,
		game.addVideo('init',null,info);
		if(_status.mode=='mingjiang'){
			game.showIdentity(true);
		}
		else{
			for(var i=0;i<game.players.length;i++){
				game.players[i].ai.shown=0;
			}
		}
		game.phaseLoop(player);
	},
	game:{
		getCharacterChoice:function(list,num){
			var choice=list.splice(0,num);
			var map={wei:[],shu:[],wu:[],qun:[]};
			for(var i=0;i<choice.length;i++){
				var group=lib.character[choice[i]][1];
				if(map[group]){
					map[group].push(choice[i]);
				}
			}
			for(var i in map){
				if(map[i].length<2){
					if(map[i].length==1){
						choice.remove(map[i][0]);
						list.push(map[i][0]);
					}
					delete map[i];
				}
			}
			if(choice.length==num-1){
				for(var i=0;i<list.length;i++){
					if(map[lib.character[list[i]][1]]){
						choice.push(list[i]);
						list.splice(i--,1);
						break;
					}
				}
			}
			else if(choice.length<num-1){
				var group=null
				for(var i=0;i<list.length;i++){
					if(group){
						if(lib.character[list[i]][1]==group){
							choice.push(list[i]);
							list.splice(i--,1);
							if(choice.length>=num){
								break;
							}
						}
					}
					else{
						if(!map[lib.character[list[i]][1]]){
							group=lib.character[list[i]][1];
							choice.push(list[i]);
							list.splice(i--,1);
						}
					}
				}
			}
			return choice;
		},
		getState:function(){
			var state={};
			for(var i in lib.playerOL){
				var player=lib.playerOL[i];
				state[i]={
					identity:player.identity,
					shown:player.ai.shown,
				};
			}
			return state;
		},
		updateState:function(state){
			for(var i in state){
				var player=lib.playerOL[i];
				if(player){
					player.identity=state[i].identity;
					player.ai.shown=state[i].shown;
				}
			}
		},
		getRoomInfo:function(uiintro){
			var num;
			if(lib.configOL.initshow_draw=='0'){
				num='关闭'
			}
			else{
				num=get.cnNumber(parseInt(lib.configOL.initshow_draw))+'张'
			}
			uiintro.add('<div class="text chat">首亮摸牌：'+num);
			uiintro.add('<div class="text chat">珠联璧合：'+(lib.configOL.zhulian?'开启':'关闭'));
			uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
			uiintro.add('<div class="text chat">屏蔽弱将：'+(lib.configOL.ban_weak?'开启':'关闭'));
			uiintro.add('<div class="text chat">屏蔽强将：'+(lib.configOL.ban_strong?'开启':'关闭')).style.paddingBottom='8px';
		},
		addRecord:function(bool){
			if(typeof bool=='boolean'){
				var data=lib.config.gameRecord.guozhan.data;
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
				var list=['wei','shu','wu','qun','ye'];
				var str='';
				for(var i=0;i<list.length;i++){
					if(data[list[i]]){
						str+=lib.translate[list[i]+'2']+'：'+data[list[i]][0]+'胜'+' '+data[list[i]][1]+'负<br>';
					}
				}
				lib.config.gameRecord.guozhan.str=str;
				game.saveConfig('gameRecord',lib.config.gameRecord);
			}
		},
		getIdentityList:function(player){
			if(!player.isUnseen()) return;
			if(player==game.me) return;
			var list={
				wei:'魏',
				shu:'蜀',
				wu:'吴',
				qun:'群',
				ye:'野',
				unknown:'猜'
			}
			var num=Math.floor((game.players.length+game.dead.length)/2);
			var noye=true;
			if(get.population('wei')>=num){
				delete list.wei;
				noye=false;
			}
			if(get.population('shu')>=num){
				delete list.shu;
				noye=false;
			}
			if(get.population('wu')>=num){
				delete list.wu;
				noye=false;
			}
			if(get.population('qun')>=num){
				delete list.qun;
				noye=false;
			}
			if(noye){
				delete list.ye;
			}
			return list;
		},
		getVideoName:function(){
			var str=get.translation(game.me.name1)+'/'+get.translation(game.me.name2);
			var str2=get.cnNumber(parseInt(get.config('player_number')))+'人'+
				get.translation(lib.config.mode);
			if(game.me.identity=='ye'){
				str2+=' - 野心家';
			}
			var name=[str,str2];
			return name;
		},
		showIdentity:function(started){
			if(game.phaseNumber==0&&!started) return;
			for(var i=0;i<game.players.length;i++){
				game.players[i].showCharacter(2,false);
			}
		},
		tryResult:function(){
			var hasunknown=false,check=true,unknown,giveup;
			var group=game.players[0]._group;
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].identity=='unknown'){
					hasunknown=true;
					if(unknown){
						unknown='no';
					}
					else{
						unknown=game.players[i];
					}
				}
				if(game.players[i]._group!=group){
					check=false;break;
				}
			}
			if(check){
				if(get.population('ye')){
					if(game.players.length>1){
						check=false;
					}
				}
				else{
					if(hasunknown){
						var players=game.players.concat(game.dead);
						var num=0;
						for(var i=0;i<players.length;i++){
							if(players[i]._group==group){
								num++;
							}
						}
						if(num>players.length/2){
							check=false;
						}
					}
				}
			}
			if(check){
				game.checkResult();
			}
			else if(!hasunknown){
				var ids=[];
				var idmap={};
				var idp={};
				for(var i=0;i<game.players.length;i++){
					var id=game.players[i].identity;
					ids.add(id);
					if(!idmap[id]){
						idmap[id]=1;
					}
					else{
						idmap[id]++;
					}
					idp[id]=game.players[i];
				}
				if(ids.length!=2) return;
				var id1=ids[0],id2=ids[1];
				if(idmap[id1]>1&&idmap[id2]>1) return;
				if(idmap[id1]>1&&id1=='ye') return;
				if(idmap[id2]>1&&id2=='ye') return;
				if(idmap[id1]==1){
					idp[id1].showGiveup();
				}
				if(idmap[id2]==1){
					idp[id2].showGiveup();
				}
			}
		},
		checkResult:function(){
			_status.overing=true;
			for(var i=0;i<game.players.length;i++){
				game.players[i].showCharacter(2);
			}
			if(game.me.identity=='ye'){
				if(game.me.classList.contains('dead')){
					game.over('战斗失败');
				}
				else{
					game.over('战斗胜利');
				}
			}
			else{
				if(get.population(game.me.identity)==0){
					game.over('战斗失败');
				}
				else{
					game.over('战斗胜利');
				}
			}
			game.showIdentity();
		},
		checkOnlineResult:function(player){
			if(player.identity=='ye'){
				return player.isAlive();
			}
			return get.population(player.identity)>0;
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.addPlayer=true;
			next.ai=function(player,list,back){
				if(_status.brawl&&_status.brawl.chooseCharacterAi){
					if(_status.brawl.chooseCharacterAi(player,list,back)!==false){
						return;
					}
				}
				for(var i=0;i<list.length-1;i++){
					for(var j=i+1;j<list.length;j++){
						if(lib.character[list[i]][1]==lib.character[list[j]][1]){
							player.init(list[i],list[j],false);
							if(back){
								list.remove(player.name);
								list.remove(player.name2);
								for(var i=0;i<list.length;i++){
									back.push(list[i]);
								}
							}
							return;
						}
					}
				}
			}
			next.setContent(function(){
				"step 0"
				var addSetting=function(dialog){
					dialog.add('选择座位');
					var seats=document.createElement('table');
					seats.style.margin='0 auto';
					seats.style.maxWidth=(60*parseInt(get.config('player_number')))+'px';
					var tr=document.createElement('tr');
					seats.appendChild(tr);
					for(var i=1;i<=game.players.length;i++){
						var td=document.createElement('td');
						tr.appendChild(td);
						td.style.width='40px';
						td.style.fontSize='25px';
						td.style.fontFamily='xinwei';
						td.innerHTML=get.cnNumber(i,true);
						td.link=i-1;
						td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
							if(_status.dragged) return;
							if(_status.justdragged) return;
							if(_status.cheat_seat){
								_status.cheat_seat.classList.remove('thundertext');
								if(_status.cheat_seat==this){
									delete _status.cheat_seat;
									return;
								}
							}
							this.classList.add('thundertext');
							_status.cheat_seat=this;
						});
					}
					dialog.content.appendChild(seats);
					if(game.me==game.zhu){
						seats.previousSibling.style.display='none';
						seats.style.display='none';
					}

					dialog.add(ui.create.div('.placeholder'));
					dialog.add(ui.create.div('.placeholder'));
					dialog.add(ui.create.div('.placeholder'));
				};
				var removeSetting=function(){
					var dialog=_status.event.dialog;
					if(dialog.querySelector('table')&&!get.config('change_identity')){
						dialog.querySelector('table').previousSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').remove();
					}
				};
				event.addSetting=addSetting;
				event.removeSetting=removeSetting;

				var chosen=lib.config.continue_name||[];
				game.saveConfig('continue_name');
				event.chosen=chosen;

				var i;
				event.list=[];
				for(i in lib.character){
					if(chosen.contains(i)) continue;
					if(lib.filter.characterDisabled(i)) continue;
					if(lib.character[i][2]==3||lib.character[i][2]==4||lib.character[i][2]==5)
					event.list.push(i);
				}
				if(_status.brawl&&_status.brawl.chooseCharacterFilter){
					event.list=_status.brawl.chooseCharacterFilter(event.list);
				}
				event.list.randomSort();
				// var list=event.list.splice(0,parseInt(get.config('choice_num')));
				var list;
				if(_status.brawl&&_status.brawl.chooseCharacter){
					list=_status.brawl.chooseCharacter(event.list,game.me);
				}
				else{
					list=game.getCharacterChoice(event.list,parseInt(get.config('choice_num')));
				}
				if(_status.auto){
					event.ai(game.me,list);
				}
				else if(chosen.length){
					game.me.init(chosen[0],chosen[1],false);
				}
				else{
					var dialog=ui.create.dialog('选择角色','hidden',[list,'character']);
					if(!_status.brawl||!_status.brawl.noAddSetting){
						if(get.config('change_identity')){
							addSetting(dialog);
						}
					}
					var next=game.me.chooseButton(dialog,true,2);
					next.filterButton=function(button){
						if(ui.dialog.buttons.length<=10){
							for(var i=0;i<ui.dialog.buttons.length;i++){
								if(ui.dialog.buttons[i]!=button){
									if(lib.element.player.perfectPair.call({
										name1:button.link,name2:ui.dialog.buttons[i].link
									})){
										button.classList.add('glow2');
									}
								}
							}
						}
						if(ui.selected.buttons.length==0) return true;
						return (lib.character[button.link][1]==lib.character[ui.selected.buttons[0].link][1]);
					};
					next.switchToAuto=function(){
						event.ai(game.me,list);
						ui.arena.classList.remove('selecting');
					};

					event.dialogxx=ui.create.characterDialog();
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
									ui.cheat.style.opacity=1;
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
									ui.cheat.style.opacity=0.6;
								}
							}
						});
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
							event.list=event.list.concat(list);
							event.list.randomSort();
							// list=event.list.splice(0,parseInt(get.config('choice_num')));
							list=game.getCharacterChoice(event.list,parseInt(get.config('choice_num')));
							var buttons=ui.create.div('.buttons');
							var node=_status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons=ui.create.buttons(list,'character',buttons);
							_status.event.dialog.content.insertBefore(buttons,node);
							buttons.animate('start');
							node.remove();
							game.uncheck();
							game.check();
						});
						delete _status.createControl;
					}
					if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
						if(!ui.cheat&&get.config('change_choice'))
						ui.create.cheat();
						if(!ui.cheat2&&get.config('free_choose'))
						ui.create.cheat2();
					}
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
				if(result.buttons){
					game.me.init(result.buttons[0].link,result.buttons[1].link,false);
				}
				game.addRecentCharacter(game.me.name,game.me.name2);
				// game.me.setIdentity(game.me.group);
				event.list.remove(game.me.name);
				event.list.remove(game.me.name2);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=game.me){
						event.ai(game.players[i],event.list.splice(0,parseInt(get.config('choice_num'))),event.list);
					}
				}
				for(var i=0;i<game.players.length;i++){
					game.players[i].classList.add('unseen');
					game.players[i].classList.add('unseen2');
					if(game.players[i]!=game.me){
						game.players[i].node.identity.firstChild.innerHTML='猜';
						game.players[i].node.identity.dataset.color='unknown';
					}
					game.players[i].hiddenSkills=lib.character[game.players[i].name][3].slice(0);
					var hiddenSkills2=lib.character[game.players[i].name2][3];
					for(var j=0;j<hiddenSkills2.length;j++){
						game.players[i].hiddenSkills.add(hiddenSkills2[j]);
					}
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						if(!lib.skill[game.players[i].hiddenSkills[j]]){
							game.players[i].hiddenSkills.splice(j--,1);
						}
					}
					game.players[i].group='unknown';
					game.players[i].sex='unknown';
					game.players[i].name1=game.players[i].name;
					game.players[i].name='unknown';
					game.players[i].identity='unknown';
					game.players[i].node.name.show();
					game.players[i].node.name2.show();
					game.players[i]._group=lib.character[game.players[i].name1][1];
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j],true);
					}
				}
			});
		},
		chooseCharacterOL:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.setContent(function(){
				'step 0'
				var list=get.charactersOL();
				event.list=list.slice(0);
				var list2=[];
				var num;
				if(lib.configOL.number*6>list.length){
					num=5;
				}
				else if(lib.configOL.number*7>list.length){
					num=6;
				}
				else{
					num=7;
				}
				var filterButton=function(button){
					if(ui.dialog){
						if(ui.dialog.buttons.length<=10){
							for(var i=0;i<ui.dialog.buttons.length;i++){
								if(ui.dialog.buttons[i]!=button){
									if(lib.element.player.perfectPair.call({
										name1:button.link,name2:ui.dialog.buttons[i].link
									})){
										button.classList.add('glow2');
									}
								}
							}
						}
					}
					if(ui.selected.buttons.length==0) return true;
					if(!lib.character[button.link]) return false;
					return (lib.character[button.link][1]==lib.character[ui.selected.buttons[0].link][1]);
				};
				list.randomSort();
				for(var i=0;i<game.players.length;i++){
					list2.push([game.players[i],['选择角色',[game.getCharacterChoice(list,num),'character']],2,
					true,function(){return Math.random()},filterButton]);
				}
				game.me.chooseButtonOL(list2,function(player,result){
					if(game.online||player==game.me) player.init(result.links[0],result.links[1],false);
				}).set('switchToAuto',function(){
					_status.event.result='ai';
				}).set('processAI',function(){
					var buttons=_status.event.dialog.buttons;
					for(var i=0;i<buttons.length-1;i++){
						for(var j=i+1;j<buttons.length;j++){
							if(lib.character[buttons[i].link][1]==lib.character[buttons[j].link][1]){
								return {
									bool:true,
									links:[buttons[i].link,buttons[j].link]
								}
							}
						}
					}
				});
				'step 1'
				var sort=true;
				for(var i in result){
					if(result[i]&&result[i].links){
						for(var j=0;j<result[i].links.length;j++){
							event.list.remove(result[i].links[j]);
						}
					}
				}
				for(var i in result){
					if(result[i]=='ai'||!result[i].links||result[i].links.length<1){
						if(sort){
							sort=false;
							event.list.randomSort();
						}
						result[i]=[event.list.shift()];
						var group=lib.character[result[i][0]][1];
						for(var j=0;j<event.list.length;j++){
							if(lib.character[event.list[j]][1]==group){
								result[i].push(event.list[j]);
								event.list.splice(j--,1);
								break;
							}
						}
					}
					else{
						result[i]=result[i].links
					}
					if(!lib.playerOL[i].name){
						lib.playerOL[i].init(result[i][0],result[i][1],false);
					}
				}

				for(var i=0;i<game.players.length;i++){
					game.players[i].hiddenSkills=lib.character[game.players[i].name][3].slice(0);
					var hiddenSkills2=lib.character[game.players[i].name2][3];
					for(var j=0;j<hiddenSkills2.length;j++){
						game.players[i].hiddenSkills.add(hiddenSkills2[j]);
					}
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						if(!lib.skill[game.players[i].hiddenSkills[j]]){
							game.players[i].hiddenSkills.splice(j--,1);
						}
					}
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j],true);
					}
				}
				game.broadcastAll(function(result){
					for(var i in result){
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i][0],result[i][1],false);
						}
					}
					for(var i=0;i<game.players.length;i++){
						game.players[i].classList.add('unseen');
						game.players[i].classList.add('unseen2');
						if(game.players[i]!=game.me){
							game.players[i].node.identity.firstChild.innerHTML='猜';
							game.players[i].node.identity.dataset.color='unknown';
						}
						game.players[i].group='unknown';
						game.players[i].sex='unknown';
						game.players[i].name1=game.players[i].name;
						game.players[i].name='unknown';
						game.players[i].identity='unknown';
						game.players[i].node.name.show();
						game.players[i].node.name2.show();
						game.players[i]._group=lib.character[game.players[i].name1][1];
					}
				},result);
			});
		}
	},
	ui:{
		click:{
			// identity:function(){
			// 	if(this.touched) {this.touched=false;return;}
			// 	_status.clicked=true;
			// 	if(this.parentNode.isUnseen()&&this.parentNode!=game.me){
			// 		switch(this.firstChild.innerHTML){
			// 			case '魏':this.firstChild.innerHTML='蜀';this.dataset.color='shu';break;
			// 			case '蜀':this.firstChild.innerHTML='吴';this.dataset.color='wu';break;
			// 			case '吴':this.firstChild.innerHTML='群';this.dataset.color='qun';break;
			// 			case '群':this.firstChild.innerHTML='野';this.dataset.color='ye';break;
			// 			case '野':this.firstChild.innerHTML='猜';this.dataset.color='unknown';break;
			// 			default:this.firstChild.innerHTML='魏';this.dataset.color='wei';break;
			// 		}
			// 	}
			// }
		}
	},
	translate:{
		change_identity_config:'自由选择座位',
		ye:'野',
		ye2:'野心家',
		wei2:'魏国',
		shu2:'蜀国',
		wu2:'吴国',
		qun2:'群雄',
		unknown:'无名氏',
		unknown0:'一号位',
		unknown1:'二号位',
		unknown2:'三号位',
		unknown3:'四号位',
		unknown4:'五号位',
		unknown5:'六号位',
		unknown6:'七号位',
		unknown7:'八号位',
		bumingzhi:'不明置',
		mingzhizhujiang:'明置主将',
		mingzhifujiang:'明置副将',
		tongshimingzhi:'同时明置',
	},
	element:{
		content:{
			zhulian:function(){
				"step 0"
				player.popup('珠联璧合');
				game.log(player,'发动了【珠联璧合】');
				if(player.hp==player.maxHp){
					player.draw(2);
					event.finish();
				}
				else{
					player.chooseControl('draw_card','recover_hp',function(){
						if(player.hp>=2||player.hp>=player.maxHp-1) return 'draw_card';
						if(player.hp==2&&player.num('h')==0) return 'draw_card';
						return 'recover_hp';
					},ui.create.dialog('hidden','珠联璧合：选择一项奖励'));
				}
				"step 1"
				if(result.control=='draw_card'){
					player.draw(2);
				}
				else{
					player.recover();
				}
			}
		},
		player:{
			getModeState:function(){
				return {
					unseen:this.classList.contains('unseen'),
					unseen2:this.classList.contains('unseen2'),
				}
			},
			setModeState:function(info){
				if(info.mode.unseen) this.classList.add('unseen');
				if(info.mode.unseen2) this.classList.add('unseen2');
				if(!info.name) return;
				// if(info.name.indexOf('unknown')==0){
				// 	if(this==game.me){
				// 		lib.translate[info.name]+='（你）';
				// 	}
				// }
				this.init(info.name1,info.name2,false);
				this.name1=info.name1;
				this.name=info.name;
				this.node.name_seat=ui.create.div('.name.name_seat',get.verticalStr(lib.translate[this.name].slice(0,3)),this);
				if(info.identityShown){
					this.setIdentity(info.identity);
				}
				else if(this!=game.me){
					this.node.identity.firstChild.innerHTML='猜';
					this.node.identity.dataset.color='unknown';
				}
			},
			dieAfter:function(source){
				this.showCharacter(2);
				if(source&&source.identity!='unknown'){
					if(this.identity=='ye') source.draw(1);
					else if(this.identity!=source.identity) source.draw(get.population(this.identity)+1);
					else source.discard(source.get('he'));
				}
				game.tryResult();
			},
			isUnseen:function(){
				return (this.classList.contains('unseen')&&this.classList.contains('unseen2'));
			},
			checkShow:function(skill){
				var sourceSkill=get.info(skill);
                if(sourceSkill&&sourceSkill.sourceSkill){
					skill=sourceSkill.sourceSkill;
                }
				if(game.expandSkills(this.get('s')).contains(skill)) return false;
				if(lib.skill.global.contains(skill)) return false;
				if(this.classList.contains('unseen')){
					var skills=game.expandSkills(lib.character[this.name1][3]);
					if(skills.contains(skill)){
						this.showCharacter(0);
						return true;
					}
				}
				if(this.classList.contains('unseen2')){
					var skills=game.expandSkills(lib.character[this.name2][3]);
					if(skills.contains(skill)){
						this.showCharacter(1);
						return true;
					}
				}
				return false;
			},
			showCharacter:function(num,log){
				if(!this.classList.contains('unseen')&&!this.classList.contains('unseen2')){
					return;
				}
				game.addVideo('showCharacter',this,num);
				if(this.identity=='unknown'){
					this.group=lib.character[this.name1][1];
					// this.node.identity.style.backgroundColor=get.translation(this.group+'Color');
					if(get.totalPopulation(this.group)+1>get.population()/2) this.identity='ye';
					else this.identity=this.group;
					// this.node.identity.dataset.color=this.identity;
					this.setIdentity(this.identity);
					this.ai.shown=1;

					if(_status.clickingidentity&&_status.clickingidentity[0]==this){
						for(var i=0;i<_status.clickingidentity[1].length;i++){
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform='';
						}
						delete _status.clickingidentity;
					}
					game.addVideo('setIdentity',this,this.identity);
				}
				var skills;
				switch(num){
					case 0:
					if(log!==false) game.log(this,'展示了主将'+get.translation(this.name1));
					this.name=this.name1;
					skills=lib.character[this.name][3];
					this.sex=lib.character[this.name][0];
					this.classList.remove('unseen');
					break;
					case 1:
					if(log!==false) game.log(this,'展示了副将'+get.translation(this.name2));
					skills=lib.character[this.name2][3];
					if(this.sex=='unknown') this.sex=lib.character[this.name2][0];
					if(this.name.indexOf('unknown')==0) this.name=this.name2;
					this.classList.remove('unseen2');
					break;
					case 2:
					if(log!==false) game.log(this,'展示了主将'+get.translation(this.name1)+'、副将'+get.translation(this.name2));
					this.name=this.name1;
					skills=lib.character[this.name][3].concat(lib.character[this.name2][3]);
					this.sex=lib.character[this.name][0];
					this.classList.remove('unseen');
					this.classList.remove('unseen2');
					break;
				}
				game.broadcast(function(player,name,sex,num,identity){
					player.identityShown=true;
					player.name=name;
					player.sex=sex;
					switch(num){
						case 0:player.classList.remove('unseen');break;
						case 1:player.classList.remove('unseen2');break;
						case 2:player.classList.remove('unseen');player.classList.remove('unseen2');break;
					}
					player.ai.shown=1;
					player.identity=identity;
					player.setIdentity(identity);
					if(_status.clickingidentity&&_status.clickingidentity[0]==player){
						for(var i=0;i<_status.clickingidentity[1].length;i++){
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform='';
						}
						delete _status.clickingidentity;
					}
				},this,this.name,this.sex,num,this.identity);
				this.identityShown=true;
				var initdraw=parseInt(get.config('initshow_draw'));
				if(!_status.initshown&&!_status.overing&&initdraw&&this.isAlive()&&_status.mode!='mingjiang'){
					this.popup('首亮');
					game.log(this,'首先明置武将，得到奖励');
					game.log(this,'摸了'+get.cnNumber(initdraw)+'张牌');
					this.draw(initdraw).log=false;
					_status.initshown=true;
				}
				for(var i=0;i<skills.length;i++){
					this.hiddenSkills.remove(skills[i]);
					this.addSkill(skills[i]);
				}
				this.checkConflict();
				if(!this.classList.contains('unseen')&&!this.classList.contains('unseen2')){
					if(this.singleHp){
						this.doubleDraw();
					}
					if(this.perfectPair()){
						var next=game.createEvent('guozhanDraw');
						next.player=this;
						next.setContent('zhulian');
					}
				}
				game.tryResult();
			},
			perfectPair:function(){
				if(!get.config('zhulian')) return false;
				var name1=this.name1;
				var name2=this.name2;
				if(lib.character[name1][1]!=lib.character[name2][1]) return false;
				var list=['re','diy','sp','jsp','shen','jg','xin'];
				for(var i=0;i<list.length;i++){
					if(name1.indexOf(list[i]+'_')==0){
						name1=name1.slice(list[i].length+1);
					}
					if(name2.indexOf(list[i]+'_')==0){
						name2=name2.slice(list[i].length+1);
					}
				}
				if(lib.perfectPair[name1]&&lib.perfectPair[name1].contains(name2)){
					return true;
				}
				if(lib.perfectPair[name2]&&lib.perfectPair[name2].contains(name1)){
					return true;
				}
				return false;
			},
			siege:function(player){
				if(game.players.length==2) return false;
				if(this.identity=='unknown'||this.identity=='ye') return false;
				if(player.identity=='unknown') return false;
				if(player.identity==this.identity) return false;
				if(player==this.next&&this.next.next.identity==this.identity) return true;
				if(player==this.previous&&this.previous.previous.identity==this.identity) return true;
				return false;
			},
			sieged:function(){
				return this.next.siege(this)||this.previous.siege(this);
			},
			sieging:function(){
				return this.siege(this.next)||this.siege(this.previous);
			},
			inline:function(){
				if(this.identity=='unknown'||this.identity=='ye') return false;
				if(this.next.identity!=this.identity&&this.previous.identity!=this.identity) return false;
				var pointer;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i].identity!=this.identity) return false;
					pointer=this.next;
					while(pointer!=arguments[i]&&pointer.identity==this.identity){
						pointer=pointer.next;
					}
					if(pointer==arguments[i]) continue;
					pointer=this.previous;
					while(pointer!=arguments[i]&&pointer.identity==this.identity){
						pointer=pointer.previous;
					}
					if(pointer==arguments[i]) continue;
					return false;
				}
				return true;
			},
			isMajor:function(){
				if(this.identity=='ye'||this.identity=='unknown') return false;
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].num('e','yuxi')){
						if(game.players[i].identity!='ye'&&game.players[i].identity!='unknown'){
							list.add(game.players[i].identity);
						}
					}
				}
				if(list.length){
					return list.contains(this.identity);
				}
				var wei=get.population('wei'),shu=get.population('shu'),wu=get.population('wu'),qun=get.population('qun');
				if(wei<=1&&shu<=1&&wu<=1&&qun<=1) return false;
				return get.population(this.identity)==Math.max(wei,shu,wu,qun);
			},
			isMinor:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMajor()){
						return !this.isMajor();
					}
				}
				return false;
			},
			logAi:function(targets,card){
				if(this.ai.shown==1||this.isMad()) return;
				if(typeof targets=='number'){
					this.ai.shown+=targets;
				}
				else{
					var effect=0,c,shown;
					var info=get.info(card);
					if(info.ai&&info.ai.expose){
						this.ai.shown+=info.ai.expose;
					}
					if(targets.length>0){
						for(var i=0;i<targets.length;i++){
							shown=Math.abs(targets[i].ai.shown);
							if(shown<0.2||targets[i].identity=='nei') c=0;
							else if(shown<0.4) c=0.5;
							else if(shown<0.6) c=0.8;
							else c=1;
							effect+=ai.get.effect(targets[i],card,this)*c;
						}
					}
					if(effect>0){
						if(effect<1) c=0.5;
						else c=1;
						if(targets.length==1&&targets[0]==this);
						else if(targets.length==1) this.ai.shown+=0.2*c;
						else this.ai.shown+=0.1*c;
					}
				}
				if(this.ai.shown>0.95) this.ai.shown=0.95;
				if(this.ai.shown<-0.5) this.ai.shown=-0.5;
			},
		}
	},
	skill:{
		_mingzhi1:{
			trigger:{player:'phaseBegin'},
			priority:19,
			forced:true,
			popup:false,
			content:function(){
				"step 0"
				var choice=1;
				for(var i=0;i<player.hiddenSkills.length;i++){
					if(lib.skill[player.hiddenSkills[i]].ai){
						var mingzhi=lib.skill[player.hiddenSkills[i]].ai.mingzhi;
						if(mingzhi==false){
							choice=0;break;
						}
						if(typeof mingzhi=='function'&&mingzhi(trigger,player)==false){
							choice=0;break;
						}
					}
				}
				if(player.isUnseen()){
					var group=lib.character[player.name1][1];
					player.chooseControl('bumingzhi','明置'+get.translation(player.name1),
						'明置'+get.translation(player.name2),'tongshimingzhi',true).ai=function(event,player){
						var popu=get.population(lib.character[player.name1][1])
						if(popu>=2||(popu==1&&game.players.length<=4)){
							return Math.random()<0.5?3:(Math.random()<0.5?2:1);
						}
						if(choice==0) return 0;
						if(get.population(group)>0&&get.totalPopulation(group)+1<=get.population()/2){
							return Math.random()<0.2?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
						}
						var nming=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player&&game.players[i].identity!='unknown'){
								nming++;
							}
						}
						if(nming==game.players.length-1) return Math.random()<0.5?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
						return (Math.random()<0.1*nming/game.players.length)?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
					};
				}
				else{
					if(Math.random()<0.5) choice=0;
					if(player.classList.contains('unseen')){
						player.chooseControl('bumingzhi','明置'+get.translation(player.name1),true).choice=choice;
					}
					else if(player.classList.contains('unseen2')){
						player.chooseControl('bumingzhi','明置'+get.translation(player.name2),true).choice=choice;
					}
					else{
						event.finish();
					}
				}
				"step 1"
				switch(result.control){
					case '明置'+get.translation(player.name1):player.showCharacter(0);break;
					case '明置'+get.translation(player.name2):player.showCharacter(1);break;
					case 'tongshimingzhi':player.showCharacter(2);break;
				}
			}
		},
		_mingzhi2:{
			trigger:{player:'triggerHidden'},
			forced:true,
			popup:false,
			priority:10,
			content:function(){
				"step 0"
				if(get.info(trigger.skill).silent){
					event.finish();
				}
				else{
					event.skillHidden=true;
					var bool1=(game.expandSkills(lib.character[player.name1][3]).contains(trigger.skill));
					var bool2=(game.expandSkills(lib.character[player.name2][3]).contains(trigger.skill));
					if(bool1&&bool2){
						event.name=player.name1;
						event.name2=player.name2;
						var info=get.info(trigger.skill);
						var yes=!info.check||info.check(trigger._trigger,player);
						var next=player.chooseBool('是否明置'+get.translation(event.name)+'以发动【'+get.translation(trigger.skill)+'】？');
						next.ai=function(){
							return yes;
						};
					}
					else{
						event.name=bool1?player.name1:player.name2;
						var info=get.info(trigger.skill);
						var yes=!info.check||info.check(trigger._trigger,player);
						var next=player.chooseBool('是否明置'+get.translation(event.name)+'以发动【'+get.translation(trigger.skill)+'】？');
						next.ai=function(){
							return yes;
						};
					}
				}
				"step 1"
				if(result.bool){
					if(event.name==player.name1) player.showCharacter(0);
					else player.showCharacter(1);
					trigger.revealed=true;
					event.finish();
				}
				else if(event.name2){
					var info=get.info(trigger.skill);
					var yes=!info.check||info.check(trigger._trigger,player);
					player.chooseBool('是否明置'+get.translation(event.name2)+'以发动【'+get.translation(trigger.skill)+'】？').ai=function(){
						return yes;
					};
				}
				else{
					event.finish();
					trigger.untrigger();
					trigger.cancelled=true;
				}
				"step 2"
				if(event.name2){
					if(result.bool){
						player.showCharacter(1);
						trigger.revealed=true;
					}
					else{
						trigger.untrigger();
						trigger.cancelled=true;
					}
				}
			}
		},
	},
	ai:{
		get:{
			realAttitude:function(from,toidentity,difficulty){
				if(from.identity==toidentity&&toidentity!='ye'){
					return 4+difficulty;
				}
				if(from.identity=='unknown'&&lib.character[from.name1][1]==toidentity){
					if(get.totalPopulation(toidentity)+1<=get.population()/2) return 4+difficulty;
				}
				var groups=[];
				for(var i=0;i<lib.group.length;i++){
					groups.push(get.population(lib.group[i]));
				}
				var max=Math.max.apply(this,groups);
				if(max<=1) return -3;
				var from_p=get.population(from.identity!='unknown'?from.identity:lib.character[from.name1][1]);
				var to_p=get.population(toidentity);
				if(from.identity=='ye') from_p=1;
				if(toidentity=='ye') to_p=1;

				if(to_p==max) return -5;
				if(from_p==max) return -2-get.population(toidentity);
				if(max>=game.players.length/2){
					if(to_p<=from_p){
						return 0.5;
					}
					return 0;
				}
				if(to_p<max-1) return 0;
				return -0.5;
			},
			attitude:function(from){
				var att=ai.get.rawAttitude.apply(this,arguments);
				if(from&&from.isMad()) return -att;
				return att;
			},
			rawAttitude:function(from,to){
				if(!from||!to) return 0;
				if(to.identity=='unknown'&&game.players.length==2) return -5;
				if(_status.currentPhase==from&&from.ai.tempIgnore&&
					from.ai.tempIgnore.contains(to)&&to.identity=='unknown'&&
					(!from.storage.zhibi||!from.storage.zhibi.contains(to))) return 0;
				var difficulty=0;
				if(to==game.me) difficulty=(2-get.difficulty())*1.5;
				if(from==to) return 5+difficulty;
				if(from.identity==to.identity&&from.identity!='unknown'&&from.identity!='ye') return 5+difficulty;
				if(from.identity=='unknown'&&lib.character[from.name1][1]==to.identity){
					if(get.totalPopulation(to.identity)+1<=get.population()/2) return 4+difficulty;
				}
				var toidentity=to.identity;
				if(toidentity=='unknown'){
					toidentity=lib.character[to.name1][1];
					if(get.population(toidentity)>=get.population()-2){
						toidentity='ye';
					}
				}
				var att=ai.get.realAttitude(from,toidentity,difficulty);
				if(from.storage.zhibi&&from.storage.zhibi.contains(to)){
					return att;
				}
				if(to.ai.shown>=0.5) return att*to.ai.shown;

				var nshown=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=from&&game.players[i].identity=='unknown'){
						nshown++;
					}
				}
				if(to.ai.shown==0){
					if(nshown>=game.players.length/2&&att>=0){
						return 0;
					}
					return Math.min(0,Math.random()-0.5)+difficulty;
				}
				if(to.ai.shown>=0.2){
					if(att>2){
						return Math.max(0,Math.random()-0.5)+difficulty;
					}
					if(att>=0){
						return 0;
					}
					return Math.min(0,Math.random()-0.7)+difficulty;
				}
				if(att>2){
					return Math.max(0,Math.random()-0.7)+difficulty;
				}
				if(att>=0){
					return Math.min(0,Math.random()-0.3)+difficulty;
				}
				return Math.min(0,Math.random()-0.5)+difficulty;

			},
		}
	},
}
