'use strict';
mode.boss={
	element:{
		player:{
			dieAfter:function(){
				if(this!=game.boss){
					this.storage.boss_chongzheng=0;
				}
				if(this==game.boss||game.players.length==1){
					game.checkResult();
				}
			},
		}
	},
	game:{
		reserveDead:true,
		checkResult:function(){
			if(game.boss==game.me){
				game.over(game.boss.isAlive());
			}
			else{
				game.over(!game.boss.isAlive());
			}
		},
		getVideoName:function(){
			var str=get.translation(game.me.name);
			if(game.me.name2){
				str+='/'+get.translation(game.me.name2);
			}
			var str2='挑战';
			if(game.me!=game.boss){
				str2+=' - '+get.translation(game.boss);
			}
			var name=[str,str2];
			return name;
		},
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				if(lib.db&&!_status.characterLoaded){
					_status.waitingForCharacters=true;
					game.pause();
				}
				"step 1"
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
					return;
				}
				for(var i in lib.skill){
					if(lib.skill[i].changeSeat){
						lib.skill[i]={};
						if(lib.translate[i+'_info']){
							lib.translate[i+'_info']='此模式下不可用';
						}
					}
				}
				lib.init.css('layout/mode','boss');
				game.delay(0.1);
				"step 2"
				var bosslist=ui.create.div('#bosslist.hidden');
				event.bosslist=bosslist;
				bosslist.ontouchmove = ui.click.touchScroll;
				bosslist.style.WebkitOverflowScrolling='touch';
				if(!lib.config.touchscreen&&lib.config.mousewheel){
					bosslist._scrollspeed=30;
					bosslist._scrollnum=10;
					bosslist.onmousewheel=ui.click.mousewheel;
				}
				var bosslistlinks={};
				var toggleBoss=function(bool){
					game.saveConfig(this._link.config._name,bool,true);
					var node=bosslistlinks[this._link.config._name];
					if(bool){
						node.style.display='';
					}
					else{
						node.style.display='none';
					}
				};
				var onpause=function(){
					ui.window.classList.add('bosspaused');
				}
				var onresume=function(){
					ui.window.classList.remove('bosspaused');
				}
				game.onpause=onpause;
				game.onpause2=onpause;
				game.onresume=onresume;
				game.onresume2=onresume;
				ui.create.div(bosslist);

				event.current=null;
				var list=[];
				for(var i in lib.character){
					var info=lib.character[i];
					if(info[4].contains('boss')){
						var cfg=i+'_bossconfig';
						if(get.config(cfg)==undefined){
							game.saveConfig(cfg,true,true);
						}
						lib.translate[cfg+'_config']=lib.translate[i];
						lib.config.current_mode.push([cfg,get.config(cfg),toggleBoss]);
						lib.mode.boss.config[cfg]={
							name:get.translation(i),
							onclick:toggleBoss,
							init:true,
						}
						var player=ui.create.player(bosslist).init(i);
						list.push(player);
						player.node.hp.classList.add('text');
						player.node.hp.dataset.condition='';
						player.node.hp.innerHTML=info[2];
						player.setIdentity(player.name);
						player.node.identity.dataset.color=info[5];
						bosslistlinks[cfg]=player;
						player.classList.add('bossplayer');

						if(lib.storage.current==i){
							event.current=player;
							player.classList.add('highlight');
						}

						if(!get.config(cfg)){
							player.style.display='none';
						}
					}
				}
				if(!event.current){
					event.current=bosslist.childNodes[1];
					event.current.classList.add('highlight');
				}
				ui.create.div(bosslist);
				lib.translate.boss_pangtong='涅槃凤雏';
				ui.create.cards();
				game.finishCards();
				ui.arena.dataset.number=8;
				ui.control.classList.add('bosslist');

				ui.window.appendChild(bosslist);

				setTimeout(function(){
					if(event.current){
						var left=event.current.offsetLeft-(ui.window.offsetWidth-180)/2;
						if(bosslist.scrollLeft<left){
							bosslist.scrollLeft=left;
						}
					}
					bosslist.show();
				},200);
				game.me=ui.create.player();
				game.chooseCharacter(function(target){
					if(event.current){
						event.current.classList.remove('highlight');
					}
					event.current=target;
					game.save('current',target.name);
					target.classList.add('highlight');
				});
				"step 3"
				game.bossinfo=lib.boss.global;
				for(var i in lib.boss[event.current.name]){
					game.bossinfo[i]=lib.boss[event.current.name][i];
				}
				delete lib.boss;

				setTimeout(function(){
					ui.control.classList.remove('bosslist');
				},500);
				var rect=event.current.getBoundingClientRect();
				var boss=ui.create.player().init(event.current.name);
				game.boss=boss;
				boss.side=true;
				boss.classList.add('bossplayer');
				boss.classList.add('highlight');
				boss.animate('bossing');
				boss.node.hp.animate('start');
				boss.style.left=(rect.left-ui.arena.offsetLeft)+'px';
				boss.style.top=(rect.top-ui.arena.offsetTop)+'px';
				boss.setIdentity('zhu');
				boss.identity='zhu';
				for(var i=0;i<result.links.length;i++){
					var player=ui.create.player(ui.arena).init(result.links[i]).animate('start');
					player.setIdentity('cai');
					player.identity='cai';
					player.side=false;
					game.players.push(player);
					if(result.boss){
						player.dataset.position=(i+1)*2;
					}
					else{
						player.dataset.position=i+1;
					}
				}
				if(result.boss){
					game.players.unshift(boss);
					boss.dataset.position=0;
				}
				else{
					game.players.push(boss);
					boss.dataset.position=7;
				}
				ui.create.me();
				if(game.me!==boss){
					game.singleHandcard=true;
					ui.arena.classList.add('single-handcard');
					ui.fakeme=ui.create.div('.fakeme.avatar',ui.me);
					// ui.fakeme.dataset.position=0;
					// ui.fakeme.line=lib.element.player.line;
					// ui.fakemebg=ui.create.div('.avatar',ui.fakeme).hide();
					// ui.refresh(ui.fakemebg);
					game.onSwapControl();
					// ui.fakemebg.show();

					lib.setPopped(ui.create.system('查看手牌',null,true),function(){
						var uiintro=ui.create.dialog('hidden');

						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							if(players[i].side==game.me.side&&players[i]!=game.me){
								uiintro.add(get.translation(players[i]));
								var cards=players[i].get('h');
								if(cards.length){
									uiintro.add(cards,true);
								}
								else{
									uiintro.add('（无）');
								}
							}
						}

						return uiintro;
					});
				}
				lib.setPopped(ui.create.system('重整',null,true),function(){
					var uiintro=ui.create.dialog('hidden');

					uiintro.add('重整');
					var table=ui.create.div('.bosschongzheng');

					var tr,td,added=false;
					for(var i=0;i<game.dead.length;i++){
						if(typeof game.dead[i].storage.boss_chongzheng!=='number') continue;
						added=true;
						tr=ui.create.div(table);
						td=ui.create.div(tr);
						td.innerHTML=get.translation(game.dead[i]);
						td=ui.create.div(tr);
						if(game.dead[i].maxHp>0){
							td.innerHTML='剩余'+get.cnNumber(game.bossinfo.chongzheng-game.dead[i].storage.boss_chongzheng)+'回合';
						}
						else{
							td.innerHTML='无法重整'
						}
					}

					if(!added){
						uiintro.add('<div class="text center">（无重整角色）</div>');
						uiintro.add(ui.create.div('.placeholder.slim'))
					}
					else{
						uiintro.add(table);
					}

					return uiintro;
				},180);

				ui.arena.appendChild(boss);
				ui.refresh(boss);
				boss.classList.remove('highlight');
				boss.classList.remove('bossplayer');
				boss.style.left='';
				boss.style.top='';
				boss.style.position='';

				event.bosslist.delete();

				game.arrangePlayers();
				for(var i=0;i<game.players.length;i++){
					game.players[i].node.action.innerHTML='行动';
				}

				var players=get.players(lib.sort.position);
				var info=[];
				for(var i=0;i<players.length;i++){
					info.push({
						name:players[i].name,
						identity:players[i].identity,
						position:players[i].dataset.position
					});
				}
				_status.videoInited=true,
				info.boss=(game.me==game.boss);
				game.addVideo('init',null,info);

				"step 4"
				event.trigger('gameStart');
				game.gameDraw(game.boss);
				game.bossPhaseLoop();
				setTimeout(function(){
					ui.updateh(true);
				},200);
			}
		},
		bossPhaseLoop:function(){
			var next=game.createEvent('phaseLoop');
			next.player=game.boss;
			_status.looped=true;
			next.content=function(){
				"step 0"
				if(player.chongzheng){
					player.chongzheng=false;
				}
				else if(player.isDead()){
					if(player.hp<0) player.hp=0;
					player.storage.boss_chongzheng++;
					if(player.maxHp>0){
						if(player.hp<player.maxHp){
							player.hp++;
							game.log(get.translation(player)+'回复了一点体力');
						}
						else{
							var card=get.cards()[0];
							var sort=lib.config.sort_card(card);
							var position=sort>0?player.node.handcards1:player.node.handcards2;
							card.fix();
							card.animate('start');
							position.insertBefore(card,position.firstChild);
							player.$draw();
							game.log(get.translation(player)+'摸了一张牌');
						}
						player.update();
						if(player.storage.boss_chongzheng>=game.bossinfo.chongzheng){
							player.revive();
						}
					}

					if(game.bossinfo.loopType==2){
						game.boss.chongzheng=true;
					}
				}
				else{
					player.phase();
				}
				"step 1"
				if(game.bossinfo.loopType==2){
					if(event.player==game.boss){
						if(!_status.last||_status.last.nextSeat==game.boss){
							event.player=game.boss.nextSeat;
						}
						else{
							event.player=_status.last.nextSeat;
						}
					}
					else{
						_status.last=player;
						event.player=game.boss;
					}
				}
				else{
					event.player=event.player.nextSeat;
				}
				event.goto(0);
			}
		},
		onSwapControl:function(){
			if(game.me==game.boss) return;
			game.addVideo('onSwapControl');
			var name=game.me.name;
			if(ui.fakeme&&ui.fakeme.current!=name){
				ui.fakeme.current=name;
				if(ui.versushighlight&&ui.versushighlight!=game.me){
					ui.versushighlight.classList.remove('current_action');
				}
				ui.versushighlight=game.me;
				game.me.classList.add('current_action');
				// game.me.line(ui.fakeme,{opacity:0.5,dashed:true});

				ui.fakeme.style.backgroundImage=game.me.node.avatar.style.backgroundImage;
				// ui.fakeme.style.backgroundSize='cover';
			}
			ui.updateh(true);
		},
		modeSwapPlayer:function(player){
			game.swapControl(player);
			game.onSwapControl();
		},
		chooseCharacter:function(func){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.customreplacetarget=func;
			next.ai=function(player,list){
				if(get.config('double_character')){
					player.init(list[0],list[1]);
				}
				else{
					player.init(list[0]);
				}
			}
			next.content=function(){
				"step 0"
				var i;
				var list=[];
				event.list=list;
				for(i in lib.character){
					if(lib.character[i][4].contains('minskin')) continue;
					if(lib.character[i][4].contains('boss')) continue;
					if(lib.character[i][4].contains('hiddenboss')) continue;
					if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidall.contains(i)) continue;
					if(lib.config.forbidboss.contains(i)) continue;
					if(lib.config.banned.contains(i)) continue;
					if(get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
					if(get.config('ban_weak')&&(lib.rank.c.contains(i)||lib.rank.d.contains(i))) continue;
					if(get.config('ban_strong')&&(lib.rank.s.contains(i)||lib.rank.ap.contains(i))) continue;
					list.push(i);
				}
				list.randomSort();
				var dialog=ui.create.dialog('选择参战角色','hidden');
				ui.window.appendChild(dialog);
				dialog.classList.add('bosscharacter');
				dialog.add('0/3');
				dialog.add([list.slice(0,20),'character']);
				dialog.noopen=true;

				var next=game.me.chooseButton(dialog,true);
				next._triggered=null;
				next.custom.replace.target=event.customreplacetarget;
				next.selectButton=[3,3];
				next.custom.add.button=function(){
					if(ui.cheat2&&ui.cheat2.backup) return;
					_status.event.dialog.content.childNodes[1].innerHTML=
					ui.selected.buttons.length+'/3';
				};
				event.changeDialog=function(){
					if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
						return;
					}
					list.randomSort();
					_status.event.dialog.close();
					_status.event.dialog=ui.create.dialog('选择参战角色','hidden');
					ui.window.appendChild(_status.event.dialog);
					_status.event.dialog.classList.add('bosscharacter');
					_status.event.dialog.add('0/3');
					_status.event.dialog.add([list.slice(0,20),'character']);
					game.uncheck();
					game.check();
				};
				ui.create.cheat=function(){
					_status.createControl=ui.cheat2||event.asboss;
					ui.cheat=ui.create.control('更换',event.changeDialog);
					delete _status.createControl;
				};
				event.dialogxx=ui.create.characterDialog();
				event.dialogxx.classList.add('bosscharacter');
				ui.create.cheat2=function(){
					_status.createControl=event.asboss;
					ui.cheat2=ui.create.control('自由选将',function(){
						if(this.dialog==_status.event.dialog){
							this.dialog.close();
							_status.event.dialog=this.backup;
							ui.window.appendChild(this.backup);
							delete this.backup;
							game.uncheck();
							game.check();
							if(ui.cheat){
								ui.cheat.style.opacity=1;
							}
							if(ui.cheat2x){
								ui.cheat2x.close();
								delete ui.cheat2x;
							}
						}
						else{
							ui.cheat2x=ui.create.groupControl(_status.event.parent.dialogxx);
							this.backup=_status.event.dialog;
							_status.event.dialog.close();
							_status.event.dialog=_status.event.parent.dialogxx;
							this.dialog=_status.event.dialog;
							ui.window.appendChild(this.dialog);
							game.uncheck();
							game.check();
							if(ui.cheat){
								ui.cheat.style.opacity=0.6;
							}
						}
					});
					delete _status.createControl;
				}
				if(!ui.cheat&&get.config('change_choice'))
				ui.create.cheat();
				if(!ui.cheat2&&get.config('free_choose'))
				ui.create.cheat2();

				event.asboss=ui.create.control('应战',function(){
					event.boss=true;
					event.enemy=[];
					for(var i=0;i<ui.selected.buttons.length;i++){
						event.enemy.push(ui.selected.buttons[i].link);
						event.list.remove(ui.selected.buttons[i].link);
					}
					while(event.enemy.length<3){
						event.enemy.push(event.list.randomRemove());
					}
					game.uncheck();
					if(ui.confirm){
						ui.confirm.close();
					}
					game.resume();
				});
				"step 1"
				if(ui.cheat){
					ui.cheat.close();
					delete ui.cheat;
				}
				if(ui.cheat2){
					ui.cheat2.close();
					delete ui.cheat2;
				}
				if(ui.cheat2x){
					ui.cheat2x.close();
					delete ui.cheat2x;
				}
				event.asboss.close();
				if(event.boss){
					event.result={
						boss:true,
						links:event.enemy
					};
				}
				else{
					event.result={
						boss:false,
						links:result.links
					};
				}
			}
			return next;
		},
	},
	boss:{
		boss_zhangjiao:{
			// loopType:2,
		},
		boss_caiwenji:{
			loopType:2,
		},
		boss_pangtong:{
			loopType:2,
			chongzheng:12
		},
		boss_zhaoyun:{
			chongzheng:12
		},
		boss_zhenji:{
			chongzheng:4,
		},
		boss_lvbu1:{
			loopType:2
		},
		boss_zuoci:{
			chongzheng:4,
		},
		boss_diaochan:{
			chongzheng:4,
		},
		boss_huangyueying:{
			chongzheng:12,
		},
		global:{
			loopType:1,
			chongzheng:6
		},
	},
	skill:{

		_bossswap:{
			trigger:{player:['phaseBegin','chooseToUseBegin','chooseToRespondBegin','chooseToDiscardBegin','chooseToCompareBegin',
			'chooseButtonBegin','chooseCardBegin','chooseTargetBegin','chooseCardTargetBegin','chooseControlBegin',
			'chooseBoolBegin','choosePlayerCardBegin','discardPlayerCardBegin','gainPlayerCardBegin']},
			forced:true,
			priority:100,
			popup:false,
			filter:function(event,player){
				if(event.autochoose&&event.autochoose()) return false;
				return player.isUnderControl();
			},
			content:function(){
				game.modeSwapPlayer(player);
			},
		},
	},
	translate:{
		zhu:'神',
		cai:'盟',
	},
	ai:{
		get:{
			attitude:function(from,to){
				var t=(from.side===to.side?1:-1);
				if(from.isMad()){
					t=-t;
				}
				else if(to.isMad()){
					t=0;
				}
				return 6*t;
			}
		}
	},
	config:['ban_weak','change_choice','free_choose','']
}
