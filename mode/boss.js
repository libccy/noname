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
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
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
				"step 1"
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
				ui.create.arena();
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
				for(var i=0;i<result.links.length;i++){
					var player=ui.create.player(ui.arena).init(result.links[i]).animate('start');
					player.setIdentity('cai');
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
					ui.fakeme=ui.create.div('.player.controlfakeme');
					ui.fakeme.dataset.position=0;
					ui.fakeme.line=lib.element.player.line;
					ui.fakemebg=ui.create.div('.avatar',ui.fakeme).hide();
					ui.refresh(ui.fakemebg);
					game.onSwapControl();
					ui.fakemebg.show();

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
					ui.create.div('.action',game.players[i].node.avatar).innerHTML='行动';
				}
				"step 3"
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
			var name=game.me.name;
			if(ui.fakeme&&ui.fakeme.current!=name){
				ui.fakeme.current=name;
				if(ui.versushighlight&&ui.versushighlight!=game.me){
					ui.versushighlight.node.avatar.classList.remove('glow2');
				}
				ui.versushighlight=game.me;
				game.me.node.avatar.classList.add('glow2');
				// game.me.line(ui.fakeme,{opacity:0.5,dashed:true});

				ui.fakemebg.style.backgroundImage=game.me.node.avatar.style.backgroundImage;
				ui.fakemebg.style.backgroundSize='cover';
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
					if(get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
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
	character:{
		boss_zhangchunhua:['female','wei',4,['jueqing','wuxin','shangshix'],['fullskin','boss'],'wei'],
		boss_zhenji:['female','wei',4,['tashui','lingbo','jiaoxia','fanghua'],['fullskin','boss'],'wei'],
		// boss_liubei:['male','shu',5,['lingfeng'],['fullskin','boss'],'qun'],
		// boss_zhugeliang:['male','shu',4,[],['fullskin','boss'],'qun'],
		boss_huangyueying:['female','shu',4,['boss_gongshen','boss_jizhi','qicai','boss_guiyin'],['fullskin','boss'],'wei'],
		boss_pangtong:['male','shu',4,['boss_tianyu','qiwu','niepan','boss_yuhuo'],['fullskin','boss'],'zhu'],
		boss_zhouyu:['male','wu',6,['huoshen','boss_honglian','boss_xianyin'],['fullskin','boss'],'zhu'],
		boss_lvbu1:['male','qun',8,['mashu','wushuang','boss_baonu'],['fullskin','boss'],'wei'],
		boss_lvbu2:['male','qun',4,['mashu','wushuang','swd_xiuluo','shenwei','shenji'],['fullskin','hiddenboss'],'qun'],
		boss_caiwenji:['female','qun',4,['beige','boss_hujia','boss_guihan'],['fullskin','boss'],'wei'],
		boss_zhangjiao:['male','qun',8,['boss_leiji','tiandao','jidian'],['fullskin','boss'],'shu'],
		boss_zuoci:['male','qun',0,['huanhua'],['fullskin','boss'],'shu'],
		// boss_yuji:['male','qun',8,[],['fullskin','boss'],'nei'],
		boss_diaochan:['female','qun',4,['fengwu','yunshen','lianji','boss_wange','yuehun'],['fullskin','boss'],'qun'],
		boss_huatuo:['male','qun',6,['chulao','mazui','boss_shengshou','guizhen','wuqin'],['fullskin','boss'],'wu'],
		boss_dongzhuo:['male','qun',20,['jiuchi','boss_qiangzheng','boss_baolin'],['fullskin','boss'],'shu'],
		// boss_shuijing:['male','qun',8,[],['fullskin','boss'],'wei'],
	},
	skill:{
		boss_leiji:{
			audio:2,
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget('是否发动雷击？').ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				};
				"step 1"
				if(result.bool){
					player.logSkill('diyleiji',result.targets,'thunder');
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
								if(!target.skills.contains('guidao')) return 0;
								return [0,hastarget?target.num('he')/2:0];
							}
							if(target.num('h','shan')&&target.num('h')>2){
								if(!target.skills.contains('guidao')) return 0;
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
							if(!target.skills.contains('guidao')) return [1,0.05];
							return [1,Math.min(0.5,(target.num('h')+be)/4)];
						}
					}
				}
			}
		},
		wuqin:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw(3)
			}
		},
		boss_baolin:{
			inherit:'juece',
		},
		boss_qiangzheng:{
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
			inherit:'guiji'
		},
		fengwu:{
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
			trigger:{global:'gameDrawAfter'},
			forced:true,
			unique:true,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]==player) continue;
					player.maxHp+=game.players[i].maxHp;
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
			trigger:{source:'damageAfter'},
			direct:true,
			unique:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【亟电】？',function(card,player,target){
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
			inherit:'manjuan'
		},
		boss_hujia:{
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
					prompt:'是否发动【胡笳】？'
				});
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('boss_hujia',target);
					if(target.disabledSkills.boss_hujia){
						target.loseMaxHp();
					}
					else{
						target.disabledSkills.boss_hujia=lib.character[target.name][3];
					}
					player.discard(result.cards);
				}
			},
			ai:{
				expose:0.2,
			}
		},
		boss_guihan:{
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
					delete game.players[i].disabledSkills.boss_hujia;
				}
				game.bossinfo.loopType=1;
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
				game.bossinfo.loopType=1;
			}
		},
		boss_tianyu:{
			inherit:'suoling'
		},
		boss_jizhi:{
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
				game.log(get.translation(player)+'获得了'+get.translation(cards));
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
			trigger:{player:['useCard','respondAfter']},
			direct:true,
			unique:true,
			filter:function(event){
				return get.color(event.card)=='black';
			},
			content:function(){
				"step 0"
				game.delay(0.5);
				player.chooseTarget('是否发动【踏水】？',function(card,player,target){
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
				}
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
			group:'swd_wuxie'
		},
		shenwei:{
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
						game.players[i].skills.remove(j);
						delete game.players[i].tempSkills[j];
					}
				}
				_status.paused=false;
				_status.event.player=player;
				_status.event.step=0;
				game.bossinfo.loopType=1;
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
		yuehun_info:'回合开始阶段，你可以回复一点体力并摸两张牌',
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

		// boss_yuhuo:'浴火',
		// boss_yuhuo_info:'觉醒技，在你涅槃后，你获得技能【神威】、【朱羽】',
		boss_tianyu:'天狱',

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

		zhu:'神',
		cai:'盟',
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
		boss_liubei:'昭烈皇帝',
		boss_caiwenji:'异乡孤女',
		boss_huatuo:'药坛圣手',
		boss_luxun:'蹁跹君子',
		boss_zhenji:'洛水仙子',
		boss_diaochan:'绝代妖姬',
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
