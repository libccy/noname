'use strict';
mode.boss={
	start:function(){
		"step 0"
		if(lib.config.hiddenCharacterPack.contains('boss')){
			game.loadPackage('character/boss');
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
		lib.init.css(lib.assetURL+'layout/mode','boss');
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
			if(info[4].contains('boss')&&!lib.config.banned.contains(i)){
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
				if(info[2]==Infinity){
					player.node.hp.innerHTML='∞';
				}
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
		if(!list.length){
			alert('挑战模式不可隐藏boss武将包，请在选项－其它中选择“重置隐藏扩展包”');
			event.finish();
			_status.over=true;
			return;
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
		ui.control.style.transitionProperty='opacity';
		ui.control.classList.add('bosslist');
		setTimeout(function(){
			ui.control.style.transitionProperty='';
		},1000);

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
		if(lib.config.continue_name_boss){
			event.noslide=true;
		}
		else{
			game.chooseCharacter(function(target){
				if(event.current){
					event.current.classList.remove('highlight');
				}
				event.current=target;
				game.save('current',target.name);
				target.classList.add('highlight');
			});
		}
		if(lib.storage.test){
			event.current.classList.remove('highlight');
			if(event.current.nextSibling&&event.current.nextSibling.classList.contains('player')){
				event.current=event.current.nextSibling;
			}
			else{
				event.current=event.current.parentNode.childNodes[1];
			}
			lib.config.game_speed='vfast';
			_status.auto=true;
			ui.auto.classList.add('glow');
			game.save('current',event.current.name);
		}
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
		var boss=ui.create.player();
		boss.getId();
		boss.init(event.current.name);
		game.boss=boss;
		boss.side=true;
		boss.node.equips.style.opacity='0';
		if(!event.noslide){
			// boss.classList.add('bossplayer');
			// boss.classList.add('highlight');
			boss.animate('bossing');
			boss.node.hp.animate('start');
			boss.style.left=(rect.left-ui.arena.offsetLeft)+'px';
			boss.style.top=(rect.top-ui.arena.offsetTop)+'px';
		}
		boss.setIdentity('zhu');
		boss.identity='zhu';
		if(lib.config.continue_name_boss){
			result=lib.config.continue_name_boss;
			game.saveConfig('continue_name_boss');
		}
		for(var i=0;i<result.links.length;i++){
			var player=ui.create.player(ui.arena);
			player.getId();
			player.init(result.links[i]).animate('start');
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

			if(lib.config.show_handcardbutton){
				lib.setPopped(ui.create.system('手牌',null,true),function(){
					var uiintro=ui.create.dialog('hidden');

					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						if(players[i].side==game.me.side&&players[i]!=game.me){
							uiintro.add(get.translation(players[i]));
							var cards=players[i].get('h');
							if(cards.length){
								uiintro.addSmall(cards,true);
							}
							else{
								uiintro.add('（无）');
							}
						}
					}

					return uiintro;
				},220);
			}
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
		ui.single_swap=ui.create.system('换人',function(){
			var players=get.players(game.me);
			players.remove(game.boss);
			if(players.length>1){
				if(ui.auto.classList.contains('hidden')){
					game.me.popup('请稍后换人');
					return;
				}
				if(_status.event.isMine()){
					ui.click.auto();
					setTimeout(function(){
						ui.click.auto();
					},500);
				}
				game.modeSwapPlayer(players[1]);
			}
		},true);
		if(get.config('single_control')||game.me==game.boss){
			ui.single_swap.style.display='none';
		}

		ui.arena.appendChild(boss);
		ui.refresh(boss);
		boss.classList.remove('highlight');
		boss.classList.remove('bossplayer');
		boss.style.left='';
		boss.style.top='';
		boss.style.position='';
		setTimeout(function(){
			boss.node.equips.style.opacity='';
		},500);

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
		if(game.bossinfo.init){
			game.bossinfo.init();
		}
		"step 5"
		if(get.config('single_control')){
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].side==game.me.side){
					game.addRecentCharacter(game.players[i].name);
				}
			}
		}
		else{
			game.addRecentCharacter(game.me.name);
		}
		event.trigger('gameStart');
		game.gameDraw(game.boss);
		game.bossPhaseLoop();
		setTimeout(function(){
			ui.updatehl();
		},200);
	},
	element:{
		player:{
			dieAfter:function(){
				if(this!=game.boss){
					this.storage.boss_chongzheng=0;
				}
				if(game.bossinfo.checkResult&&game.bossinfo.checkResult(this)===false){
					return;
				}
				if(this==game.boss||game.players.length==1){
					game.checkResult();
				}
			},
		}
	},
	game:{
		reserveDead:true,
		changeBoss:function(name){
			if(game.additionaldead){
				game.additionaldead.push(game.boss);
			}
			else{
				game.additionaldead=[game.boss];
			}
			game.boss.delete();
			game.dead.remove(game.boss);
			var boss=ui.create.player();
			boss.getId();
			boss.init(name);
			game.addVideo('bossSwap',game.boss,boss.name);
			if(game.me==game.boss){
				boss.dataset.position=0;
				game.swapControl(boss);
			}
			else{
				boss.dataset.position=7;
			}
			game.players.push(boss.animate('zoominanim'));
			game.arrangePlayers();
			game.boss=boss;
			ui.arena.appendChild(boss);
			boss.directgain(get.cards(4));
			boss.setIdentity('zhu');
			boss.identity='zhu';
		},
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
		bossPhaseLoop:function(){
			var next=game.createEvent('phaseLoop');
			next.player=game.boss;
			_status.looped=true;
			next.setContent(function(){
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
							game.log(player,'回复了一点体力');
						}
						else if(player.num('h')<4){
							var card=get.cards()[0];
							var sort=lib.config.sort_card(card);
							var position=sort>0?player.node.handcards1:player.node.handcards2;
							card.fix();
							card.animate('start');
							position.insertBefore(card,position.firstChild);
							player.$draw();
							game.log(player,'摸了一张牌');
						}
						player.update();
						if(player.storage.boss_chongzheng>=game.bossinfo.chongzheng){
							player.revive(player.hp);
						}
					}

					if(game.bossinfo.loopType==2){
						game.boss.chongzheng=true;
					}
				}
				else{
					if(player.identity=='zhu'&&game.boss!=player){
						player=game.boss;
					}
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
			});
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
			ui.updatehl();
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
			next.setContent(function(){
				"step 0"
				var i;
				var list=[];
				event.list=list;
				for(i in lib.character){
					if(lib.character[i][4].contains('minskin')) continue;
					if(lib.character[i][4].contains('boss')) continue;
					if(lib.character[i][4].contains('hiddenboss')) continue;
					if(lib.character[i][4]&&lib.character[i][4].contains('forbidai')) continue;
					if(lib.config.forbidboss.contains(i)) continue;
					if(lib.filter.characterDisabled(i)) continue;
					list.push(i);
				}
				list.randomSort();
				var dialog=ui.create.dialog('选择参战角色','hidden');
				dialog.classList.add('fixed');
				ui.window.appendChild(dialog);
				dialog.classList.add('bosscharacter');
				dialog.classList.add('withbg');
				// dialog.add('0/3');
				dialog.add([list.slice(0,20),'character']);
				dialog.noopen=true;
				var next=game.me.chooseButton(dialog,true);
				next._triggered=null;
				next.custom.replace.target=event.customreplacetarget;
				next.selectButton=[3,3];
				// next.custom.add.button=function(){
				// 	if(ui.cheat2&&ui.cheat2.backup) return;
				// 	_status.event.dialog.content.childNodes[1].innerHTML=
				// 	ui.selected.buttons.length+'/3';
				// };
				event.changeDialog=function(){
					if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
						return;
					}
					if(game.changeCoin){
						game.changeCoin(-3);
					}
					list.randomSort();

					var buttons=ui.create.div('.buttons');
					var node=_status.event.dialog.buttons[0].parentNode;
					_status.event.dialog.buttons=ui.create.buttons(list.slice(0,20),'character',buttons);
					_status.event.dialog.content.insertBefore(buttons,node);
					buttons.animate('start');
					node.remove();

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
				event.dialogxx.classList.add('withbg');
				event.dialogxx.classList.add('fixed');
				ui.create.cheat2=function(){
					_status.createControl=event.asboss;
					ui.cheat2=ui.create.control('自由选将',function(){
						if(this.dialog==_status.event.dialog){
							if(game.changeCoin){
								game.changeCoin(50);
							}
							this.dialog.close();
							_status.event.dialog=this.backup;
							ui.window.appendChild(this.backup);
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
					_status.coinCoeff=get.coinCoeff(result.links);
				}
			});
			return next;
		},
	},
	boss:{
		boss_zhuoguiquxie:{
			chongzheng:99,
			checkResult:function(player){
				if(player==game.boss&&game.boss.name!='boss_yecha'&&game.boss.name!='boss_luocha'){
					return false;
				}
			},
			init:function(){
				_status.additionalReward=function(){
					return 500;
				}
			}
		},
		boss_nianshou:{
			chongzheng:99,
			init:function(){
				game.boss.node.action.classList.add('freecolor');
				game.boss.node.action.style.opacity=1;
				game.boss.node.action.style.letterSpacing='4px';
				game.boss.node.action.style.marginRight=0;
				game.boss.node.action.style.fontFamily='huangcao';
				game.boss.node.action.innerHTML='';
				_status.additionalReward=function(){
					return Math.round(Math.pow(_status.damageCount,2.4))*2;
				}
				var time=360;
				var interval=setInterval(function(){
					if(_status.over){
						clearInterval(interval);
						return;
					}
					var sec=time%60;
					if(sec<10){
						sec='0'+sec;
					}
					game.boss.node.action.innerHTML=Math.floor(time/60)+':'+sec;
					if(time<=0){
						delete _status.additionalReward;
						if(typeof _status.coin=='number'){
							if(game.me==game.boss){
								_status.coin+=Math.round(Math.pow(_status.damageCount,2.4));
							}
							else{
								_status.coin+=Math.round(Math.pow(_status.damageCount,1.8));
							}
						}
						game.forceOver(true);
						clearInterval(interval);
					}
					time--;
				},1000);
				_status.damageCount=0;
				ui.damageCount=ui.create.system('伤害: 0',null,true);
			}
		},
		boss_nianshou_heti:{
			chongzheng:99,
		},
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
				if(!get.config('single_control')) return false;
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
				if(!from||!to) return 0;
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
}
