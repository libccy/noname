'use strict';
mode.boss={
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
			return;
		}
		for(var i in lib.characterPack.mode_boss){
			lib.character[i]=lib.characterPack.mode_boss[i];
			if(!lib.character[i][4]){
				lib.character[i][4]=[];
			}
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
		"step 1"
		var bosslist=ui.create.div('#bosslist.hidden');
		if(lib.config.slim_player){
			bosslist.classList.add('slim');
		}
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
				if(player.hp==0){
					player.node.hp.style.display='none';
				}
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
		"step 2"
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
		"step 3"
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
	characterPack:{
		mode_boss:{
			boss_zhangchunhua:['female','wei',4,['jueqing','wuxin','shangshix'],['boss','bossallowed'],'wei'],
			boss_zhenji:['female','wei',4,['tashui','lingbo','jiaoxia','fanghua'],['boss','bossallowed'],'wei'],
			// boss_liubei:['male','shu',5,['lingfeng'],['boss','bossallowed'],'qun'],
			// boss_zhugeliang:['male','shu',4,[],['boss','bossallowed'],'qun'],
			boss_huangyueying:['female','shu',4,['boss_gongshen','boss_jizhi','qicai','boss_guiyin'],['boss','bossallowed'],'wei'],
			boss_pangtong:['male','shu',4,['boss_tianyu','qiwu','niepan','boss_yuhuo'],['boss','bossallowed'],'zhu'],
			boss_zhaoyun:['male','shu',1,['boss_juejing','longhun','zhanjiang'],['boss','bossallowed'],'qun'],
			boss_zhouyu:['male','wu',6,['huoshen','boss_honglian','boss_xianyin'],['boss','bossallowed'],'zhu'],

			boss_zhuoguiquxie:['male','qun',0,['boss_bianshen'],['boss','bossallowed'],'shu'],
			boss_nianshou:['male','qun',Infinity,['boss_nianrui','boss_qixiang','boss_damagecount'],['boss'],'shu'],
			boss_nianshou_heti:['male','qun',12,['boss_nianrui','boss_mengtai','boss_nbianshen','boss_nbianshenx'],['boss','bossallowed'],'shu'],
			boss_nianshou_jingjue:['male','qun',12,['boss_nianrui','boss_mengtai','boss_jingjue','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
			boss_nianshou_renxing:['male','qun',12,['boss_nianrui','boss_mengtai','boss_renxing','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
			boss_nianshou_ruizhi:['male','qun',12,['boss_nianrui','boss_mengtai','boss_ruizhi','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
			boss_nianshou_baonu:['male','qun',12,['boss_nianrui','boss_mengtai','boss_nbaonu','boss_shouyi','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
			boss_baiwuchang:['male','qun',9,['boss_baolian','boss_qiangzheng','boss_zuijiu','juece','boss_bianshen4'],['hiddenboss','bossallowed']],
			boss_heiwuchang:['male','qun',9,['boss_guiji','boss_taiping','boss_suoming','boss_xixing','boss_bianshen4'],['hiddenboss','bossallowed']],
			boss_luocha:['male','qun',12,['boss_modao','boss_yushou','yizhong','boss_moyany'],['hiddenboss','bossallowed']],
			boss_yecha:['male','qun',11,['boss_modao','boss_mojian','bazhen','boss_danshu'],['hiddenboss','bossallowed']],
			boss_niutou:['male','qun',7,['boss_baolian','niepan','boss_manjia','boss_xiaoshou','boss_bianshen3'],['hiddenboss','bossallowed']],
			boss_mamian:['male','qun',6,['boss_guiji','fankui','boss_lianyu','juece','boss_bianshen3'],['hiddenboss','bossallowed']],
			boss_chi:['male','qun',5,['boss_guimei','boss_didong','boss_shanbeng','boss_bianshen2'],['hiddenboss','bossallowed']],
			boss_mo:['female','qun',5,['boss_guimei','enyuan','boss_beiming','boss_bianshen2'],['hiddenboss','bossallowed']],
			boss_wang:['male','qun',5,['boss_guimei','boss_luolei','huilei','boss_bianshen2'],['hiddenboss','bossallowed']],
			boss_liang:['female','qun',5,['boss_guimei','boss_guihuo','boss_minbao','boss_bianshen2'],['hiddenboss','bossallowed']],

			boss_lvbu1:['male','qun',8,['mashu','wushuang','boss_baonu'],['boss','bossallowed'],'wei'],
			boss_lvbu2:['male','qun',4,['mashu','wushuang','swd_xiuluo','shenwei','shenji'],['hiddenboss','bossallowed'],'qun'],
			boss_caiwenji:['female','qun',4,['beige','boss_hujia','boss_guihan'],['boss','bossallowed'],'wei'],
			boss_zhangjiao:['male','qun',8,['boss_leiji','tiandao','jidian'],['boss','bossallowed'],'shu'],
			boss_zuoci:['male','qun',0,['huanhua'],['boss','bossallowed'],'shu'],
			// boss_yuji:['male','qun',8,[],['boss','bossallowed'],'nei'],
			boss_diaochan:['female','qun',4,['fengwu','yunshen','lianji','boss_wange','yuehun'],['boss','bossallowed'],'qun'],
			boss_huatuo:['male','qun',6,['chulao','mazui','boss_shengshou','guizhen','wuqin'],['boss','bossallowed'],'wu'],
			boss_dongzhuo:['male','qun',20,['jiuchi','boss_qiangzheng','boss_baolin'],['boss','bossallowed'],'shu'],
			// boss_shuijing:['male','qun',8,[],['boss','bossallowed'],'wei'],
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
		tiandao:{
			audio:true,
			trigger:{global:'judge'},
			direct:true,
			filter:function(event,player){
				return player.num('he')>0;
			},
			content:function(){
				"step 0"
				player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
				get.translation(trigger.player.judging[0])+'，'+get.prompt('tiandao'),'he').ai=function(card){
					var trigger=_status.event.parent._trigger;
					var player=_status.event.player;
					var result=trigger.judge(card)-trigger.judge(trigger.player.judging[0]);
					var attitude=ai.get.attitude(player,trigger.player);
					if(attitude==0||result==0) return 0;
					if(attitude>0){
						return result;
					}
					else{
						return -result;
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
					player.logSkill('tiandao');
					player.$gain2(trigger.player.judging[0]);
					player.gain(trigger.player.judging[0]);
					trigger.player.judging[0]=result.cards[0];
					trigger.position.appendChild(result.cards[0]);
					game.log(trigger.player,'的判定牌改为',result.cards[0]);
				}
				"step 3"
				game.delay(2);
			},
			ai:{
				tag:{
					rejudge:1
				},
				threaten:1.5
			}
		},
		lianji:{
			audio:true,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return target.num('h')>0;
			},
			selectTarget:2,
			multitarget:true,
			multiline:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			prepare:function(cards,player,targets){
				player.$throw(cards);
				player.line(targets);
			},
			discard:false,
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				"step 0"
				if(targets[0].num('h')&&targets[1].num('h')){
					targets[0].chooseToCompare(targets[1]);
				}
				else{
					event.finish();
				}
				"step 1"
				if(result.bool){
					targets[0].gain(cards);
					targets[0].$gain2(cards);
					targets[1].damage(targets[0]);
				}
				else{
					targets[1].gain(cards);
					targets[1].$gain2(cards);
					targets[0].damage(targets[1]);
				}
			},
			ai:{
				expose:0.3,
				threaten:2,
				order:9,
				result:{
					target:-1
				}
			},
		},
		mazui:{
			audio:true,
			enable:'phaseUse',
			usable:1,
			filterCard:{color:'black'},
			filterTarget:function(card,player,target){
				return !target.hasSkill('mazui2');
			},
			check:function(card){
				return 6-ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
				player.line(targets[0],'green');
			},
			content:function(){
				"step 0"
				game.delay();
				"step 1"
				target.storage.mazui2=cards[0];
				target.addSkill('mazui2');
				game.addVideo('storage',target,['mazui2',get.cardInfo(target.storage.mazui2),'card']);
			},
			ai:{
				expose:0.2,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				},
				order:4,
				threaten:1.2
			}
		},
		mazui2:{
			trigger:{source:'damageBegin'},
			forced:true,
			mark:'card',
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				trigger.num--;
				player.addSkill('mazui3');
				player.removeSkill('mazui2');
			},
			intro:{
				content:'card'
			}
		},
		mazui3:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			content:function(){
				player.gain(player.storage.mazui2,'gain2');
				game.log(player,'获得了',player.storage.mazui2);
				player.removeSkill('mazui3');
				delete player.storage.mazui2;
			}
		},
		yunshen:{
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			frequent:true,
			init:function(player){
				player.storage.yunshen=0;
			},
			content:function(){
				player.storage.yunshen++;
				player.markSkill('yunshen');
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'respondShan')){
							var shans=target.num('h','shan');
							var hs=target.num('h');
							if(shans>1) return [1,1];
							if(shans&&hs>2) return [1,1];
							if(shans) return [1,0.5];
							if(hs>2) return [1,0.3];
							if(hs>1) return [1,0.2];
							return [1.2,0];
						}
					}
				},
				threaten:0.8
			},
			intro:{
				content:'mark'
			},
			group:'yunshen2'
		},
		yunshen2:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return player.storage.yunshen>0;
			},
			content:function(){
				player.draw(player.storage.yunshen);
				player.storage.yunshen=0;
				player.unmarkSkill('yunshen');
			},
			mod:{
				globalTo:function(from,to,distance){
					if(typeof to.storage.yunshen=='number') return distance+to.storage.yunshen;
				}
			}
		},
		lingbo:{
			audio:2,
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			frequent:true,
			content:function(){
				player.draw(2);
			},
			ai:{
				mingzhi:false,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'respondShan')){
							var shans=target.num('h','shan');
							var hs=target.num('h');
							if(shans>1) return [0,1];
							if(shans&&hs>2) return [0,1];
							if(shans) return [0,0];
							if(hs>2) return [0,0];
							if(hs>1) return [1,0.5];
							return [1.5,0];
						}
					}
				},
				threaten:0.8
			}
		},
		jiaoxia:{
			audio:2,
			trigger:{target:'useCardToBegin'},
			filter:function(event,player){
				return event.card&&get.color(event.card)=='red';
			},
			frequent:true,
			content:function(){
				player.draw();
			},
			ai:{
				effect:function(card,player,target){
					if(get.color(card)=='red') return [1,1];
				},
			}
		},
		boss_nbianshenx:{},
		boss_jingjue:{
			inherit:'boss_danshu'
		},
		boss_renxing:{
			trigger:{global:['damageEnd','recoverEnd']},
			forced:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				player.draw();
			}
		},
		boss_ruizhi:{
			trigger:{global:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return event.player!=player&&event.player.num('he')>1;
			},
			content:function(){
				'step 0'
				player.line(trigger.player,'green');
				var next=trigger.player.chooseCard(true,'选择保留一张手牌和一张装备区内的牌，然后弃置其它牌','he',function(card){
					switch(get.position(card)){
						case 'h':{
							if(ui.selected.cards.length){
								return get.position(ui.selected.cards[0])=='e';
							}
							else{
								return trigger.player.num('h')>1;
							}
							break;
						}
						case 'e':{
							if(ui.selected.cards.length){
								return get.position(ui.selected.cards[0])=='h';
							}
							else{
								return trigger.player.num('e')>1;
							}
							break;
						}
					}
				});
				var num=0;
				if(trigger.player.num('h')>1){
					num++;
				}
				if(trigger.player.num('e')>1){
					num++;
				}
				next.selectCard=[num,num];
				next.ai=function(card){
					return ai.get.value(card);
				};
				'step 1'
				if(result.bool){
					var he=[];
					var hs=trigger.player.get('h');
					var es=trigger.player.get('e');
					if(hs.length>1){
						he=he.concat(hs);
					}
					if(es.length>1){
						he=he.concat(es);
					}
					for(var i=0;i<result.cards.length;i++){
						he.remove(result.cards[i]);
					}
					trigger.player.discard(he);
				}
			}
		},
		boss_nbaonu:{
			group:['boss_nbaonu_sha'],
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			priority:-1,
			content:function(){
				if(player.hp>4){
					trigger.num=4+Math.floor(Math.random()*(player.hp-3));
				}
				else{
					trigger.num=4;
				}
			},
			subSkill:{
				sha:{
					mod:{
						cardUsable:function(card,player,num){
							if(card.name=='sha'&&player.hp<5) return Infinity;
						}
					},
					trigger:{source:'damageBegin'},
					filter:function(event,player){
						return event.card&&event.card.name=='sha'&&event.notLink()&&player.hp<5;
					},
					forced:true,
					content:function(){
						trigger.num++;
					}
				}
			}
		},
		boss_shouyi:{
			mod:{
				targetInRange:function(){
					return true;
				}
			},
		},
		boss_mengtai:{
			group:['boss_mengtai_begin','boss_mengtai_draw','boss_mengtai_use',
			'boss_mengtai_discard','boss_mengtai_end'],
			subSkill:{
				begin:{
					trigger:{player:'phaseBegin'},
					forced:true,
					popup:false,
					content:function(){
						player.storage.boss_mengtai_draw=true;
						player.storage.boss_mengtai_use=true;
					}
				},
				draw:{
					trigger:{player:'phaseDrawBegin'},
					forced:true,
					popup:false,
					content:function(){
						player.storage.boss_mengtai_draw=false;
					}
				},
				use:{
					trigger:{player:'phaseUseBegin'},
					forced:true,
					popup:false,
					content:function(){
						player.storage.boss_mengtai_use=false;
					}
				},
				discard:{
					trigger:{player:'phaseDiscardBefore'},
					forced:true,
					filter:function(event,player){
						if(player.storage.boss_mengtai_use) return true;
						return false;
					},
					content:function(){
						trigger.untrigger();
						trigger.finish();
					}
				},
				end:{
					trigger:{player:'phaseEnd'},
					forced:true,
					filter:function(event,player){
						if(player.storage.boss_mengtai_draw) return true;
						return false;
					},
					content:function(){
						player.draw(3);
					}
				}
			}
		},
		boss_nbianshen:{
			trigger:{player:'phaseBefore'},
			forced:true,
			popup:false,
			priority:25,
			filter:function(event,player){
				if(player.name=='boss_nianshou_heti'||player.storage.boss_nbianshen) return true;
				return false;
			},
			content:function(){
				if(player.storage.boss_nbianshen){
					var hp=player.hp,
						maxHp=player.maxHp,
						hujia=player.hujia;
					player.init('boss_nianshou_'+player.storage.boss_nbianshen_next);
					player.storage.boss_nbianshen.remove(player.storage.boss_nbianshen_next);
					if(!player.storage.boss_nbianshen.length){
						player.storage.boss_nbianshen=['jingjue','renxing','ruizhi','baonu'];
					}
					player.storage.boss_nbianshen_next=player.storage.boss_nbianshen.randomGet(player.storage.boss_nbianshen_next);
					player.hp=hp;
					player.maxHp=maxHp;
					player.hujia=hujia;
					player.update();
				}
				else{
					player.storage.boss_nbianshen=['jingjue','renxing','ruizhi','baonu'];
					player.storage.boss_nbianshen_next=player.storage.boss_nbianshen.randomGet();
					player.markSkill('boss_nbianshen');
				}
			},
			intro:{
				content:function(storage,player){
					var map={
						jingjue:'警觉',
						renxing:'任性',
						ruizhi:'睿智',
						baonu:'暴怒'
					};
					return '下一个状态：'+map[player.storage.boss_nbianshen_next];
				}
			}
		},
		boss_damagecount:{
			mode:['boss'],
			global:'boss_damagecount2'
		},
		boss_damagecount2:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				if(!ui.damageCount) return false;
				return event.num>0&&player.isFriendOf(game.me)&&event.player.isEnemyOf(game.me);
			},
			content:function(){
				_status.damageCount+=trigger.num;
				ui.damageCount.innerHTML='伤害: '+_status.damageCount;
			}
		},
		boss_nianrui:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=2;
			},
			ai:{
				threaten:1.6
			}
		},
		boss_qixiang:{
            group:['boss_qixiang1','boss_qixiang2'],
            ai:{
                effect:{
                    target:function(card,player,target,current){
                        if(card.name=='lebu'&&card.name=='bingliang') return 0.8;
                    }
                }
            }
        },
        boss_qixiang1:{
			trigger:{player:'judge'},
			forced:true,
			filter:function(event,player){
				if(event.card){
                    if(event.card.viewAs){
                        return event.card.viewAs=='lebu';
                    }
                    else{
                        return event.card.name=='lebu';
                    }
				}
			},
			content:function(){
				player.addTempSkill('boss_qixiang3','judgeAfter');
			}
		},
        boss_qixiang2:{
			trigger:{player:'judge'},
			forced:true,
			filter:function(event,player){
				if(event.card){
                    if(event.card.viewAs){
                        return event.card.viewAs=='bingliang';
                    }
                    else{
                        return event.card.name=='bingliang';
                    }
				}
			},
			content:function(){
				player.addTempSkill('boss_qixiang4','judgeAfter');
			}
		},
		boss_qixiang3:{
			mod:{
				suit:function(card,suit){
					if(suit=='diamond') return 'heart';
				}
			}
		},
		boss_qixiang4:{
			mod:{
				suit:function(card,suit){
					if(suit=='spade') return 'club';
				}
			}
		},
		boss_bianshen2:{
			mode:['boss'],
			global:'boss_bianshen2x'
		},
		boss_bianshen2x:{
			trigger:{global:'dieAfter'},
			forced:true,
			priority:-10,
			globalFixed:true,
			filter:function(event){
				if(lib.config.mode!='boss') return false;
				return event.player==game.boss&&event.player.hasSkill('boss_bianshen2');
			},
			content:function(){
				'step 0'
				game.delay();
				'step 1'
				game.changeBoss(['boss_niutou','boss_mamian'].randomGet());
			}
		},
		boss_bianshen3:{
			mode:['boss'],
			global:'boss_bianshen3x'
		},
		boss_bianshen3x:{
			trigger:{global:'dieAfter'},
			forced:true,
			priority:-10,
			globalFixed:true,
			filter:function(event){
				if(lib.config.mode!='boss') return false;
				return event.player==game.boss&&event.player.hasSkill('boss_bianshen3');
			},
			content:function(){
				'step 0'
				game.delay();
				'step 1'
				game.changeBoss(['boss_baiwuchang','boss_heiwuchang'].randomGet());
			}
		},
		boss_bianshen4:{
			mode:['boss'],
			global:'boss_bianshen4x'
		},
		boss_bianshen4x:{
			trigger:{global:'dieAfter'},
			forced:true,
			priority:-10,
			globalFixed:true,
			filter:function(event){
				if(lib.config.mode!='boss') return false;
				return event.player==game.boss&&event.player.hasSkill('boss_bianshen4');
			},
			content:function(){
				'step 0'
				game.delay();
				'step 1'
				game.changeBoss(['boss_yecha','boss_luocha'].randomGet());
			}
		},
		boss_moyany:{
			trigger:{player:'loseEnd'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				});
				"step 1"
				if(result.bool){
					player.chooseTarget(true,'选择一个目标对其造成两点火焰伤害',function(card,player,target){
						return player!=target;
					}).ai=function(target){
						return ai.get.damageEffect(target,player,player,'fire');
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.targets.length){
					player.line(result.targets,'fire');
					result.targets[0].damage(2,'fire');
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'loseCard')){
							return [0.5,1];
						}
					}
				}
			}
		},
		boss_danshu:{
			trigger:{player:'loseEnd'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return _status.currentPhase!=player&&player.hp<player.maxHp;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				});
				"step 1"
				if(result.color=='red'){
					player.recover();
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'loseCard')){
							return [0.5,1];
						}
					}
				}
			}
		},
		boss_modao:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				player.draw(2);
			}
		},
		boss_mojian:{
			trigger:{player:'phaseUseBegin'},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(player.canUse('wanjian',game.players[i])&&game.players[i].isEnemyOf(player)){
						list.push(game.players[i]);
					}
				}
				list.sort(lib.sort.seat);
				player.useCard({name:'wanjian'},list);
			},
			ai:{
				threaten:1.8
			}
		},
		boss_yushou:{
			trigger:{player:'phaseUseBegin'},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(player.canUse('nanman',game.players[i])){
						list.push(game.players[i]);
					}
				}
				list.sort(lib.sort.seat);
				player.useCard({name:'nanman'},list);
			}
		},
		boss_zuijiu:{
			trigger:{source:'damageBegin'},
			filter:function(event){
				return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&
				event.parent.name!='_lianhuan'&&event.parent.name!='_lianhuan2';
			},
			forced:true,
			content:function(){
				trigger.num++;
			}
		},
		boss_xixing:{
			trigger:{player:'phaseBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('boss_xixing'),function(card,player,target){
					return player!=target&&target.isLinked();
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_xixing',result.targets);
					result.targets[0].damage('thunder');
					player.recover();
				}
			},
		},
		boss_suoming:{
			trigger:{player:'phaseEnd'},
            direct:true,
            filter:function(event,player){
                for(var i=0;i<game.players.length;i++){
                    if(!game.players[i].isLinked()&&player!=game.players[i]){
                        return true;
                    }
                }
            },
            content:function(){
                "step 0"
                var num=0;
                for(var i=0;i<game.players.length;i++){
                    if(!game.players[i].isLinked()&&player!=game.players[i]){
                        num++;
                    }
                }
                player.chooseTarget(get.prompt('boss_suoming'),[1,num],function(card,player,target){
                    return !target.isLinked()&&player!=target;
                }).ai=function(target){
                    return -ai.get.attitude(player,target);
                }
                "step 1"
                if(result.bool){
                    player.logSkill('boss_suoming',result.targets);
                    event.targets=result.targets;
                    event.num=0;
                }
                else{
                    event.finish();
                }
                "step 2"
                if(event.num<event.targets.length){
                    event.targets[event.num].link();
                    event.num++;
                    event.redo();
                }
            },
		},
		boss_taiping:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=2;
			}
		},
		boss_baolian:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.draw(2);
			}
		},
		boss_xiaoshou:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('boss_xiaoshou'),function(card,player,target){
					return player!=target&&target.hp>=player.hp;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'fire');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_xiaoshou',result.targets);
					result.targets[0].damage('fire',3);
				}
			},
		},
		boss_manjia:{
			group:['boss_manjia1','boss_manjia2']
		},
        boss_manjia1:{
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:6,
			filter:function(event,player){
                if(player.get('e','2')) return false;
				if(event.player.num('s','unequip')) return false;
				if(event.card.name=='nanman') return true;
				if(event.card.name=='wanjian') return true;
				if(event.card.name=='sha'&&!event.card.nature) return true;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
                        if(target.get('e','2')) return;
						if(player.num('s','unequip')) return;
						if(card.name=='nanman'||card.name=='wanjian') return 0;
						if(card.name=='sha'){
    						var equip1=player.get('e','1');
    						if(equip1&&equip1.name=='zhuque') return 2;
    						if(equip1&&equip1.name=='qinggang') return 1;
							if(!card.nature) return 0;
						}
					}
				}
			}
		},
		boss_manjia2:{
			trigger:{player:'damageBegin'},
			filter:function(event,player){
                if(player.get('e','2')) return false;
				if(event.nature=='fire') return true;
			},
			forced:true,
            check:function(){
                return false;
            },
			content:function(){
				trigger.num++;
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
                        if(target.get('e','2')) return;
						if(card.name=='sha'){
							if(card.nature=='fire'||player.hasSkill('zhuque_skill')) return 2;
						}
						if(get.tag(card,'fireDamage')&&current<0) return 2;
					}
				}
			}
		},
		boss_lianyu:{
			trigger:{player:'phaseEnd'},
			unique:true,
			content:function(){
				"step 0"
				event.players=get.players(player);
				"step 1"
				if(event.players.length){
					var current=event.players.shift();
					if(current.isEnemyOf(player)){
						player.line(current,'fire');
						current.damage('fire');
					}
					event.redo();
				}
			},
			ai:{
				threaten:2
			}
		},
		boss_guiji:{
			trigger:{player:'phaseJudgeBegin'},
            forced:true,
            content:function(){
                player.discard(player.get('j').randomGet());
            },
            filter:function(event ,player){
                return player.num('j')>0;
            },
            ai:{
                effect:{
                    target:function(card,player,target,current){
                        if(get.type(card)=='delay'&&target.num('j')==0) return 0.1;
                    }
                }
            }
		},
		boss_minbao:{
			global:'boss_minbao2'
		},
		boss_minbao2:{
			trigger:{global:'dieAfter'},
			forced:true,
			globalFixed:true,
			filter:function(event,player){
				return event.player.hasSkill('boss_minbao')&&event.player.isDead();
			},
			content:function(){
				trigger.player.line(player,'fire');
				player.damage('nosource','fire').animate=false;
				player.$damage(trigger.player);
				if(lib.config.animation&&!lib.config.low_performance){
					player.$fire();
				}
				if(!event.parent.parent.boss_minbao_logv){
					event.parent.parent.boss_minbao_logv=true;
					game.logv(trigger.player,'boss_minbao',game.players.slice(0),event.parent.parent);
				}
			}
		},
		boss_guihuo:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('boss_guihuo'),function(card,player,target){
					return player!=target;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'fire');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_guihuo',result.targets);
					result.targets[0].damage('fire');
				}
			},
		},
		boss_luolei:{
			trigger:{player:'phaseBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('boss_luolei'),function(card,player,target){
					return player!=target;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_luolei',result.targets);
					result.targets[0].damage('thunder');
				}
			},
		},
		boss_beiming:{
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source!=undefined;
			},
			content:function(){
				trigger.source.discard(trigger.source.get('h'));
			},
			ai:{
				threaten:0.7
			}
		},
		boss_shanbeng:{
			global:'boss_shanbeng2',
			trigger:{player:'dieBegin'},
			forced:true,
			logv:false,
			content:function(){
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].num('e')){
						player.line(game.players[i],'green');
						targets.push(game.players[i]);
					}
				}
				game.delay();
				game.logv(player,'boss_shanbeng',targets,null,true);
			}
		},
		boss_shanbeng2:{
			trigger:{global:'dieAfter'},
			forced:true,
			globalFixed:true,
			filter:function(event,player){
				return player.num('e')>0&&event.player.hasSkill('boss_shanbeng')&&event.player.isDead();
			},
			content:function(){
				player.discard(player.get('e'));
			}
		},
		boss_didong:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('boss_didong'),function(card,player,target){
					return target.isEnemyOf(player);
				}).ai=function(target){
					var att=ai.get.attitude(player,target);
					if(target.isTurnedOver()){
						if(att>0){
							return att+5;
						}
						return -1;
					}
					if(player.isTurnedOver()){
						return 5-att;
					}
					return -att;
				};
				"step 1"
				if(result.bool){
					player.logSkill('boss_didong',result.targets);
					result.targets[0].turnOver();
				}
			},
			ai:{
				threaten:1.7
			}
		},
		boss_guimei:{
			mod:{
				targetEnabled:function(card,player,target){
					if(get.type(card)=='delay'){
						return false;
					}
				}
			}
		},
		boss_bianshen:{
			trigger:{global:'gameStart'},
			forced:true,
			popup:false,
			content:function(){
				player.init(['boss_chi','boss_mo','boss_wang','boss_liang'].randomGet());
				game.addVideo('reinit2',player,player.name);
			}
		},
		zhanjiang:{
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('e','qinggang')){
						return true;
					}
				}
			},
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player){
						var e=game.players[i].get('e','qinggang');
						if(e.length){
							player.gain(e);
							game.players[i].$give(e,player);
							break;
						}
					}
				}
			}
		},
		boss_juejing:{
			trigger:{player:'phaseDrawBefore'},
			forced:true,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				noh:true,
			},
			group:'boss_juejing2'
		},
		boss_juejing2:{
			trigger:{player:'loseEnd'},
			forced:true,
			filter:function(event,player){
				return player.num('h')<4;
			},
			content:function(){
				player.draw(4-player.num('h'));
			}
		},
		boss_leiji:{
			audio:2,
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget(get.prompt('boss_leiji')).ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				};
				"step 1"
				if(result.bool){
					player.logSkill('boss_leiji',result.targets,'thunder');
					event.target=result.targets[0];
					event.target.judge(function(card){
						// var suit=get.suit(card);
						// if(suit=='spade') return -4;
						// if(suit=='club') return -2;
						if(get.color(card)=='black') return -2;
						return 0;
					});
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool==false){
					event.target.damage('thunder');
					player.draw();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'respondShan')){
							var hastarget=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0){
									hastarget=true;break;
								}
							}
							var be=target.num('e',{color:'black'});
							if(target.num('h','shan')&&be){
								if(!target.hasSkill('guidao')) return 0;
								return [0,hastarget?target.num('he')/2:0];
							}
							if(target.num('h','shan')&&target.num('h')>2){
								if(!target.hasSkill('guidao')) return 0;
								return [0,hastarget?target.num('h')/4:0];
							}
							if(target.num('h')>3||(be&&target.num('h')>=2)){
								return [0,0];
							}
							if(target.num('h')==0){
								return [1.5,0];
							}
							if(target.num('h')==1&&!be){
								return [1.2,0];
							}
							if(!target.hasSkill('guidao')) return [1,0.05];
							return [1,Math.min(0.5,(target.num('h')+be)/4)];
						}
					}
				}
			}
		},
		wuqin:{
			audio:2,
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw(3)
			}
		},
		boss_baolin:{
			audio:true,
			inherit:'juece',
		},
		boss_qiangzheng:{
			audio:2,
			trigger:{player:'phaseEnd'},
            forced:true,
			unique:true,
            filter:function(event,player){
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i]!=player&&game.players[i].num('h')) return true;
                }
                return false;
            },
            content:function(){
                "step 0"
				var players=get.players(player);
				players.remove(player);
				event.players=players;
				"step 1"
				if(event.players.length){
					var current=event.players.shift();
					var hs=current.get('h')
					if(hs.length){
						player.gain(hs.randomGet());
						current.$give(1,player);
					}
					event.redo();
				}
            }
		},
		guizhen:{
			audio:2,
			trigger:{player:'loseEnd'},
			frequent:true,
			filter:function(event,player){
				if(player.num('h')) return false;
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original=='h') return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				var players=get.players(player);
				players.remove(player);
				event.players=players;
				"step 1"
				if(event.players.length){
					var current=event.players.shift();
					var hs=current.get('h');
					if(hs.length){
						current.lose(hs)._triggered=null;
						current.$throw(hs);
					}
					else{
						current.loseHp();
					}
					game.delay(0.5);
					event.redo();
				}
			},
		},
		boss_konghun:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(){
				return game.players.length>=3;
			},
			content:function(){
				"step 0"
				player.chooseTarget(function(card,player,target){
					return target!=player;
				}).ai=function(){
					return 1;
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_konghun',result.targets);
					result.targets[0].goMad();
				}
			},
			group:'boss_konghun2'
		},
		boss_konghun2:{
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			content:function(){
				var players=game.players.concat(game.dead);
				for(var i=0;i<players.length;i++){
					if(players[i].isMad()){
						players[i].unMad();
					}
				}
			}
		},
		yuehun:{
			unique:true,
			trigger:{player:'phaseEnd'},
			frequent:true,
			content:function(){
				player.recover();
				player.draw(2);
			}
		},
		boss_wange:{
			inherit:'boss_guiji'
		},
		fengwu:{
			audio:2,
			unique:true,
			enable:'phaseUse',
			usable:1,
			content:function(){
				"step 0"
				event.current=player.next;
				"step 1"
				event.current.chooseToUse({name:'sha'},function(card,player,target){
					if(player==target) return false;
					if(get.distance(player,target)<=1) return true;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==player) continue;
						if(get.distance(player,game.players[i])<get.distance(player,target)) return false;
					}
					return true;
				})
				"step 2"
				if(result.bool==false) event.current.loseHp();
				if(event.current.next!=player){
					event.current=event.current.next;
					game.delay(0.5);
					event.goto(1);
				}
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						if(player.num('h','shan')) return 1;
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].canUse('sha',player)&&game.players[i].num('h')>1){
								num--;
							}
							else{
								num++;
							}
						}
						return num;
					}
				}
			}
		},
		huanhua:{
			audio:2,
			trigger:{global:'gameDrawAfter'},
			forced:true,
			unique:true,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]==player) continue;
					player.maxHp+=game.players[i].maxHp;
					if(!game.players[i].name||!lib.character[game.players[i].name]) continue;
					var skills=lib.character[game.players[i].name][3];
					for(var j=0;j<skills.length;j++){
						if(!lib.skill[skills[j]].forceunique){
							player.addSkill(skills[j]);
						}
					}
				}
				player.hp=player.maxHp;
				player.update();
			},
			group:['huanhua3','huanhua4'],
			ai:{
				threaten:0.8,
				effect:{
					target:function(card){
						if(card.name=='bingliang') return 0;
					}
				}
			}
		},
		huanhua2:{
			trigger:{player:'phaseDrawBefore'},
			priority:10,
			forced:true,
			popup:false,
			check:function(){
				return false;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			}
		},
		huanhua3:{
			trigger:{global:'drawAfter'},
			forced:true,
			filter:function(event,player){
				if(event.parent.name!='phaseDraw') return false;
				return event.player!=player;
			},
			content:function(){
				player.draw(trigger.num);
			}
		},
		huanhua4:{
			trigger:{global:'discardAfter'},
			forced:true,
			filter:function(event,player){
				if(event.parent.parent.name!='phaseDiscard') return false;
				return event.player!=player;
			},
			content:function(){
				player.chooseToDiscard(trigger.cards.length,true);
			}
		},
		jidian:{
			audio:2,
			trigger:{source:'damageAfter'},
			direct:true,
			unique:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('jidian'),function(card,player,target){
					return get.distance(trigger.player,target)<=1&&trigger.player!=target;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder')+0.1;
				}
				"step 1"
				if(result.bool){
					event.target=result.targets[0];
					event.target.judge(function(card){
						return get.color(card)=='red'?0:-1;
					})
					player.logSkill('jidian',event.target,false);
					trigger.player.line(event.target,'thunder');
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.color=='black'){
					event.target.damage('thunder');
				}
			}
		},
		tinqin:{
			audio:false,
			inherit:'manjuan'
		},
		boss_hujia:{
			audio:2,
			trigger:{player:'phaseEnd'},
			direct:true,
			unique:true,
			filter:function(event,player){
				if(player.hp==player.maxHp) return false;
				if(!player.num('he')) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.chooseCardTarget({
					position:'he',
					filterTarget:function(card,player,target){
						if(!lib.character[target.name]) return false;
						return player!=target&&!target.storage.boss_hujia;
					},
					filterCard:true,
					ai1:function(card){
						return ai.get.unuseful(card)+9;
					},
					ai2:function(target){
						if(target.disabledSkills.boss_hujia) return Math.max(1,10-target.maxHp);
						return 1/target.maxHp;
					},
					prompt:get.prompt('boss_hujia')
				});
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('boss_hujia',target);
					if(target.disabledSkills.boss_hujia){
						target.loseMaxHp();
					}
					else{
						target.disableSkill('boss_hujia',lib.character[target.name][3]);
					}
					player.discard(result.cards);
				}
			},
			ai:{
				expose:0.2,
			}
		},
		boss_guihan:{
			audio:2,
			unique:true,
			enable:'chooseToUse',
			mark:true,
			init:function(player){
				player.storage.boss_guihan=false;
			},
			filter:function(event,player){
				if(event.type!='dying') return false;
				if(player!=_status.dying) return false;
				if(player.storage.boss_guihan) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.removeSkill('boss_guihan');
				player.recover(player.maxHp-player.hp);
				player.storage.boss_guihan=true;
				"step 1"
				player.draw(4);
				"step 2"
				for(var i=0;i<game.players.length;i++){
					game.players[i].enableSkill('boss_hujia');
				}
				if(game.bossinfo){
					game.bossinfo.loopType=1;
				}
				player.removeSkill('beige');
				player.removeSkill('boss_hujia');
				player.addSkill('tinqin');
				player.addSkill('boss_huixin');
			},
			ai:{
				skillTagFilter:function(player){
					if(player.storage.boss_guihan) return false;
				},
				save:true,
				result:{
					player:4,
				},
			},
			intro:{
				content:'limited'
			}
		},
		huoshen:{
			trigger:{player:'damageBefore'},
			forced:true,
			unique:true,
			filter:function(event){
				return event.nature=='fire';
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.recover();
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'fireDamage')){
							return [0,2];
						}
					}
				}
			},
		},
		boss_xianyin:{
			trigger:{player:'loseEnd'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				});
				"step 1"
				if(result.bool){
					player.chooseTarget(true,'选择一个目标令其失去一点体力',function(card,player,target){
						return player!=target;
					}).ai=function(target){
						return Math.max(1,9-target.hp);
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.targets.length){
					player.line(result.targets);
					result.targets[0].loseHp();
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'loseCard')){
							return [0.5,1];
						}
					}
				}
			}
		},
		boss_huixin:{
			trigger:{player:'loseEnd'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				"step 0"
				player.judge();
				"step 1"
				if(result.color=='black'){
					_status.currentPhase.loseHp();
				}
				else{
					player.recover();
					player.draw();
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'loseCard')){
							return [0.5,1];
						}
					}
				}
			}
		},
		boss_shengshou:{
			audio:true,
			trigger:{player:'useCard'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				});
				"step 1"
				if(result.bool){
					player.recover();
				}
			},
		},
		boss_honglian:{
			audio:2,
			trigger:{player:'phaseEnd'},
			forced:true,
			unique:true,
			content:function(){
				"step 0"
				event.players=get.players(player);
				event.players.remove(player);
				player.draw(2);
				"step 1"
				if(event.players.length){
					event.players.shift().damage('fire');
					event.redo();
				}
			},
		},
		boss_yuhuo:{
			trigger:{player:'niepanAfter'},
			forced:true,
			unique:true,
			content:function(){
				player.addSkill('kanpo');
				player.addSkill('shenwei');
				player.addSkill('zhuyu');
				if(game.bossinfo){
					game.bossinfo.loopType=1;
				}
			}
		},
		boss_tianyu:{
			audio:true,
			trigger:{player:'phaseEnd'},
            forced:true,
            filter:function(event,player){
                if(player.isLinked()) return true;
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i]!=player&&!game.players[i].isLinked()){
                        return true;
                    }
                }
                return false;
            },
            content:function(){
                "step 0"
                event.targets=game.players.slice(0);
                event.targets.remove(player);
                event.targets.sort(lib.sort.seat);
                if(player.isLinked()) player.link();
                "step 1"
                if(event.targets.length){
                    var target=event.targets.shift();
                    if(!target.isLinked()){
                        target.link();
                    }
                    event.redo();
                }
            }
		},
		boss_jizhi:{
			audio:2,
			trigger:{player:'useCard'},
			frequent:true,
			unique:true,
			filter:function(event){
				var type=get.type(event.card,'trick');
				return (type=='trick'||type=='equip')&&event.cards[0]&&event.cards[0]==event.card;
			},
			content:function(){
				var cards=get.cards();
				player.gain(cards,'gain2');
				game.log(player,'获得了',cards);
			},
			ai:{
				threaten:1.4
			}
		},
		boss_guiyin:{
			mod:{
				targetEnabled:function(card,player,target){
					if(_status.currentPhase==player&&target.hp<player.hp) return false;
				}
			}
		},
		boss_gongshen:{
			trigger:{global:'gameDrawAfter'},
			forced:true,
			unique:true,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player){
						game.players[i].forcemin=true;
					}
				}
			},
			mod:{
				targetEnabled:function(card,player,target){
					if(get.type(card)=='delay'&&player!=target){
						return false;
					}
				}
			}
		},
		fanghua:{
			trigger:{player:'phaseEnd'},
			forced:true,
			unique:true,
			filter:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isTurnedOver()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.players=get.players(player);
				event.num=0;
				for(var i=0;i<event.players.length;i++){
					if(!event.players[i].isTurnedOver()){
						event.players.splice(i--,1);
					}
				}
				"step 1"
				if(event.players.length){
					event.players.shift().loseHp();
					event.redo();
				}
			}
		},
		tashui:{
			audio:2,
			trigger:{player:['useCard','respondAfter']},
			direct:true,
			unique:true,
			filter:function(event){
				return get.color(event.card)=='black';
			},
			content:function(){
				"step 0"
				game.delay(0.5);
				player.chooseTarget(get.prompt('tashui'),function(card,player,target){
					return player!=target;
				}).ai=function(target){
					if(target.isTurnedOver()) return -1;
					return 1;
				}
				"step 1"
				if(result.bool){
					player.logSkill('tashui',result.targets,'thunder');
					result.targets[0].turnOver();
				}
			},
			ai:{
				effect:{
					player:function(card){
						if(get.color(card)=='black'){
							return [1,2];
						}
					}
				}
			}
		},
		shangshix:{
			trigger:{player:['loseEnd','changeHp']},
			forced:true,
			unique:true,
			audio:2,
			filter:function(event,player){
				return player.num('h')<4;
			},
			content:function(){
				player.draw(4-player.num('h'));
			},
			group:'shangshix2',
			ai:{
				effect:{
					target:function(card,player,target){
						if(card.name=='shunshou') return;
						if(card.name=='guohe'){
							if(!target.num('e')) return [0,1];
						}
						else if(get.tag(card,'loseCard')){
							return [0,1];
						}
					}
				},
				noh:true,
			}
		},
		shangshix2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.hp>1;
			},
			content:function(){
				"step 0"
				event.players=get.players(player);
				event.num=0;
				"step 1"
				if(event.players.length){
					event.players.shift().loseHp();
					event.redo();
				}
			}
		},
		wuxin:{
			inherit:'miles_xueyi',
			group:'swd_wuxie',
			audio:2,
		},
		shenwei:{
			audio:2,
			unique:true,
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=Math.max(2,game.players.length-1);
			},
			mod:{
				maxHandcard:function(player,current){
					return current+Math.max(2,game.players.length-1);
				}
			}
		},
		shenji:{
			unique:true,
			mod:{
				selectTarget:function(card,player,range){
					if(range[1]==-1) return;
					if(card.name=='sha'||card.name=='juedou') range[1]=3;
				},
			}
		},
		boss_baonu:{
			unique:true,
			group:'boss_baonu2',
			trigger:{player:'changeHp'},
			forced:true,
			priority:100,
			audio:2,
			mode:['identity','guozhan','boss','stone'],
			filter:function(event,player){
				return player.hp<=4
			},
			content:function(){
				player.init('boss_lvbu2');
				player.update();
				ui.clear();
				while(_status.event.name!='phaseLoop'){
					_status.event=_status.event.parent;
				}
				for(var i=0;i<game.players.length;i++){
					for(var j in game.players[i].tempSkills){
						game.players[i].removeSkill(j);
					}
				}
				_status.paused=false;
				_status.event.player=player;
				_status.event.step=0;
				if(game.bossinfo){
					game.bossinfo.loopType=1;
				}
			},
			ai:{
				effect:{
					target:function(card,player){
						if(get.tag(card,'damage')||get.tag(card,'loseHp')){
							if(player.hp==5){
								if(game.players.length<4) return [0,5];
								var num=0
								for(var i=0;i<game.players.length;i++){
									if(game.players[i]!=game.boss&&game.players[i].hp==1){
										num++;
									}
								}
								if(num>1) return [0,2];
								if(num&&Math.random()<0.7) return [0,1];
							}
						}
					}
				}
			}
		},
		boss_baonu2:{
			trigger:{player:'gameDrawBegin'},
			forced:true,
			popup:false,
			content:function(){
				player.draw(4,false);
			}
		},
		qiwu:{
            audio:true,
            trigger:{player:'useCard'},
            forced:true,
            filter:function(event,player){
                return get.suit(event.card)=='club'&&player.hp<player.maxHp;
            },
            content:function(){
                player.recover();
            }
        },
		jizhen:{
            trigger:{player:'phaseEnd'},
            direct:true,
            filter:function(event,player){
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].hp<game.players[i].maxHp&&player!=game.players[i]){
                        return true;
                    }
                }
            },
            content:function(){
                "step 0"
                var num=0;
                for(var i=0;i<game.players.length;i++){
                    if(!game.players[i].isLinked()&&player!=game.players[i]){
                        num++;
                    }
                }
                player.chooseTarget(get.prompt('jizhen'),[1,2],function(card,player,target){
                    return target.hp<target.maxHp&&player!=target;
                }).ai=function(target){
                    return ai.get.attitude(player,target);
                }
                "step 1"
                if(result.bool){
                    player.logSkill('jizhen',result.targets);
                    game.asyncDraw(result.targets);
                }
            },
            ai:{
                expose:0.3,
                threaten:1.3
            }
        },
	},
	translate:{
		zhu:'神',
		cai:'盟',

		boss_chi:'魑',
		boss_mo:'魅',
		boss_wang:'魍',
		boss_liang:'魉',
		boss_niutou:'牛头',
		boss_mamian:'马面',
		boss_baiwuchang:'白无常',
		boss_heiwuchang:'黑无常',
		boss_luocha:'罗刹',
		boss_yecha:'夜叉',
		boss_zhuoguiquxie:'捉鬼驱邪',

		boss_nianshou:'年兽',
		boss_nianshou_heti:'合体年兽',
		boss_nianshou_jingjue:'警觉年兽',
		boss_nianshou_renxing:'任性年兽',
		boss_nianshou_baonu:'暴怒年兽',
		boss_nianshou_ruizhi:'睿智年兽',

		boss_shuijing:'水镜先生',
		boss_huangyueying:'奇智女杰',
		boss_zhangchunhua:'冷血皇后',
		boss_satan:'堕落天使',
		boss_dongzhuo:'乱世魔王',
		boss_lvbu1:'最强神话',
		boss_lvbu2:'暴怒战神',
		boss_zhouyu:'赤壁火神',
		boss_pangtong:'涅盘凤雏',
		boss_zhugeliang:'祭风卧龙',
		boss_zhangjiao:'天公将军',
		boss_zuoci:'迷之仙人',
		boss_yuji:'琅琊道士',
		boss_liubei:'蜀汉烈帝',
		boss_caiwenji:'异乡孤女',
		boss_huatuo:'药坛圣手',
		boss_luxun:'蹁跹君子',
		boss_zhenji:'洛水仙子',
		boss_diaochan:'绝代妖姬',
		boss_zhaoyun:'高达一号',

		jiaoxia:'皎霞',
		jiaoxia_info:'每当你成为红色牌的目标，你可以摸一张牌',
		lingbo:'凌波',
		lingbo_info:'每当你使用或打出一张闪，你可以摸两张牌',
		tiandao:'天道',
		tiandao_info:'任意一名角色的判定生效前，你可以打出一张牌替换之',
		yunshen:'云身',
		yunshen2:'云身',
		yunshen_info:'每当你打出一张闪，你可以令其他角色与你的距离+1；回合开始阶段，你将累计的防御距离清零，然后摸等量的牌',
		lianji:'连计',
		lianji_info:'出牌阶段限一次，你可以选择一张手牌并指定两名角色进行拼点，拼点赢的角色获得此牌，并对没赢的角色造成一点伤害',
		mazui:'麻醉',
		mazui2:'麻醉',
		mazui_info:'出牌阶段限一次，你可以将一张黑色手牌置于一名角色的武将牌上，该角色造成的下一次伤害-1，然后获得此牌',

		boss_nbianshen:'变形',
		boss_nbianshenx:'变形',
		boss_nbianshenx_info:'你从第二轮开始，每一轮幻化为警觉、任性、睿智、暴怒四种随机状态中的一种',
		boss_mengtai:'萌态',
		boss_mengtai_info:'锁定技，若你的出牌阶段被跳过，你跳过本回合的弃牌阶段；若你的摸牌阶段被跳过，结束阶段开始时，你摸三张牌',
		boss_ruizhi:'睿智',
		boss_ruizhi_info:'锁定技，其他角色的准备阶段开始时，其选择一张手牌和一张装备区里的牌，然后弃置其余的牌',
		boss_jingjue:'警觉',
		boss_jingjue_info:'每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你回复1点体力',
		// boss_jingjue_info:'锁定技，当你因弃置而失去牌后，你回复1点体力',
		boss_renxing:'任性',
		boss_renxing_info:'锁定技，你的回合外，一名角色受到1点伤害后或回复1点体力时，你摸一张牌',
		boss_nbaonu:'暴怒',
		boss_nbaonu_info:'锁定技，摸牌阶段，你改为摸X张牌（X为4到你体力值间的随机数）；若你的体力值小于5，则你使用【杀】造成的伤害+1且无次数限制',
		boss_shouyi:'兽裔',
		boss_shouyi_info:'锁定技，你使用牌无距离限制',

		boss_nianrui:'年瑞',
		boss_nianrui_info:'锁定技，摸牌阶段，你额外摸两张牌',
		boss_qixiang:'祺祥',
		boss_qixiang1:'祺祥',
		boss_qixiang2:'祺祥',
		boss_qixiang_info:'乐不思蜀判定时，你的方块判定牌视为红桃；兵粮寸断判定时，你的黑桃判定牌视为草花',

        qiwu:'栖梧',
        qiwu_info:'锁定技。每当你使用一张梅花牌，你回复一点体力',
        jizhen:'激阵',
        jizhen_info:'结束阶段，你可以令所至多两名已受伤角色摸一张牌',

		boss_yushou:'驭兽',
		boss_yushou_info:'出牌阶段开始时，你可以对所有敌方角色使用一张南蛮入侵',
		boss_moyany:'魔炎',
		boss_moyany_info:'每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你对一名其他角色造成2点火焰伤害',
		boss_modao:'魔道',
		boss_modao_info:'锁定技，准备阶段，你摸两张牌',
		boss_mojian:'魔箭',
		boss_mojian_info:'出牌阶段开始时，你可以对所有敌方角色使用一张万箭齐发',
		boss_danshu:'丹术',
		boss_danshu_info:'每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你回复1点体力',

		boss_zuijiu:'醉酒',
		boss_zuijiu_info:'锁定技，你的【杀】额外造成1点伤害',
		boss_taiping:'太平',
		boss_taiping_info:'锁定技，摸牌阶段摸牌时，你的摸牌数量+2',
		boss_suoming:'索命',
		boss_suoming_info:'结束阶段，将任意名未被横置的其他角色的武将牌横置',
		boss_xixing:'吸星',
		boss_xixing_info:'准备阶段，对任意一名横置的其他角色造成1点雷电伤害，然后回复1点体力',

		boss_baolian:'暴敛',
		boss_baolian_info:'锁定技，结束阶段，你摸两张牌',
		boss_manjia:'蛮甲',
		boss_manjia_info:'锁定技，若你的装备区内没有防具牌，则你视为装备了[藤甲]',
		boss_xiaoshou:'枭首',
		boss_xiaoshou_info:'结束阶段，对体力不小于你的一名其他角色造成3点伤害',
		boss_guiji:'诡计',
		boss_guiji_info:'锁定技，准备阶段结束时，若你的判定区内有牌，你随机弃置其中一张牌',
		boss_lianyu:'炼狱',
		boss_lianyu_info:'结束阶段，你可以对所有敌方角色造成1点火焰伤害',

		boss_guihuo:'鬼火',
		boss_guihuo_info:'结束阶段，你可以对一名其他角色造成1点火焰伤害',
		boss_minbao:'冥爆',
		boss_minbao_info:'锁定技，当你死亡时，对场上所有其他角色造成1点火焰伤害',
		boss_luolei:'落雷',
		boss_luolei_info:'准备阶段，你可以对一名其他角色造成1点雷电伤害',
		boss_beiming:'悲鸣',
		boss_beiming_info:'锁定技，当你死亡时，你令杀死你的角色弃置所有手牌',
		boss_guimei:'鬼魅',
		boss_guimei_info:'锁定技，你不能成为延时类锦囊的目标',
		boss_didong:'地动',
		boss_didong_info:'结束阶段，你可以选择一名敌方角色将其武将牌翻面',
		boss_shanbeng:'山崩',
		boss_shanbeng_info:'锁定技，当你死亡时，你令所有其他角色弃置其装备区内的所有牌',

		boss_bianshen:'出场',
		boss_bianshen_info:'游戏开始时，你随机变身为魑、魅、魍、魉中的一个',
		boss_bianshen2:'后援',
		boss_bianshen2_info:'你死亡后，随机召唤牛头、马面中的一个',
		boss_bianshen3:'后援',
		boss_bianshen3_info:'你死亡后，随机召唤白无常、黑无常中的一个',
		boss_bianshen4:'后援',
		boss_bianshen4_info:'你死亡后，随机召唤罗刹、夜叉中的一个',

		zhanjiang:'斩将',
		zhanjiang_info:'准备阶段开始时，如果其他角色的装备区内有【青釭剑】，你可以获得之',

		boss_qiangzheng:'强征',
		boss_qiangzheng_info:'锁定技，回合结束阶段，你获得每个敌方角色的一张手牌',
		boss_baolin:'暴凌',
		guizhen:'归真',
		guizhen_info:'每当你失去最后一张手牌，你可以所有敌人失去全部手牌，没有手牌的角色失去一点体力（不触发技能）',
		boss_shengshou:'圣手',
		boss_shengshou_info:'每当你使用一张牌，你可以进行一次判定，若为红色，你回复一点体力',
		wuqin:'五禽戏',
		wuqin_info:'回合结束阶段，若你没有手牌，可以摸三张牌',

		boss_konghun:'控心',
		boss_konghun_info:'回合结束阶段，你可以指定一名敌人令其进入混乱状态（不受对方控制，并将队友视为敌人）直到下一回合开始',
		yuehun:'月魂',
		yuehun_info:'回合结束阶段，你可以回复一点体力并摸两张牌',
		fengwu:'风舞',
		fengwu_info:'出牌阶段限一次，可令除你外的所有角色依次对与其距离最近的另一名角色使用一张【杀】，无法如此做者失去1点体力。',
		boss_wange:'笙歌',

		huanhua:'幻化',
		huanhua_info:'锁定技，游戏开始时，你获得其他角色的所有技能，体力上限变为其他角色之和；其他角色于摸牌阶段摸牌时，你摸等量的牌；其他角色于弃牌阶段弃牌时，你弃置等量的手牌',

		boss_leiji:'雷击',
		boss_leiji_info:'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为黑色，其受到一点雷电伤害，然后你摸一张牌',
		jidian:'亟电',
		jidian_info:'每当你造成一次伤害，可以指定距离受伤害角色1以内的一名其他角色进行判定，若结果为黑色，该角色受到一点雷电伤害',

		tinqin:'听琴',
		boss_guihan:'归汉',
		boss_guihan_info:'限定技，濒死阶段，你可以将体力回复至体力上限，摸4张牌，令所有敌人的技能恢复，并获得技能【听琴】、【蕙质】',
		boss_huixin:'蕙质',
		boss_huixin_info:'每当你于回合外失去牌，可以进行一次判定，若为黑色，当前回合角色失去一点体力，否则你回复一点体力并摸一张牌',
		boss_hujia:'胡笳',
		boss_hujia_info:'回合结束阶段，若你已受伤，可以弃置一张牌令一名其他角色的所有技能失效，若其所有技能已失效，改为令其失去一点体力上限',
		boss_honglian:'红莲',
		boss_honglian_info:'锁定技，回合结束阶段，你摸两张牌，并对所有敌人造成一点火焰伤害',
		huoshen:'火神',
		huoshen_info:'锁定技，你防止即将受到的火焰伤害，改为回复1点体力',
		boss_xianyin:'仙音',
		boss_xianyin_info:'每当你于回合外失去牌，你可以进行一次判定，若为红色，你令一名敌人失去一点体力',

		boss_yuhuo:'浴火',
		boss_yuhuo_info:'觉醒技，在你涅槃后，你获得技能【神威】、【朱羽】',
		boss_tianyu:'天狱',
		boss_tianyu_info:'锁定技，回合结束阶段，你解除横置状态，除你之外的所有角色进入横置状态',

		boss_juejing:'绝境',
		boss_juejing2:'绝境',
		boss_juejing_info:'锁定技，摸牌阶段开始时，你不摸牌；锁定技，若你的手牌数小于4，你将手牌补至四张',

		boss_jizhi:'集智',
		boss_jizhi_info:'每当你使用一张锦囊牌或装备牌，你可以摸一张牌并展示之',
		boss_guiyin:'归隐',
		boss_guiyin_info:'锁定技，体力值比你多的角色无法在回合内对你使用卡牌',
		boss_gongshen:'工神',
		boss_gongshen_info:'锁定技，除你之外的角色没有装备区；你不能成为其他角色的的延时锦囊目标',

		fanghua:'芳华',
		fanghua_info:'回合结束阶段，你可以令所有已翻面角色流失一点体力',
		tashui:'踏水',
		tashui_info:'每当你使用或打出一张黑色牌，你可以令一名其他角色翻面',

		wuxin:'无心',
		wuxin_info:'锁定技，你防止即将受到的伤害，改为流失一点体力；你不能成为其他角色的延时锦囊的目标',
		shangshix:'伤逝',
		shangshix2:'伤逝',
		shangshix_info:'锁定技，你的手牌数至少为4，回合结束阶段，若你的体力值大于1，你令场上所有角色流失一点体力',

		boss_baonu:'暴怒',
		boss_baonu_info:'锁定技，当你的体力值降至4或更低时，你变身为暴怒战神，并立即开始你的回合',
		shenwei:'神威',
		shenwei_info:'锁定技，摸牌阶段，你额外摸X张牌，你的手牌上限+X，X为敌方存活角色个数且至少为2',
		shenji:'神戟',
		shenji_info:'你使用的杀或决斗可指定至多3名角色为目标',

		mode_boss_character_config:'挑战武将',
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
