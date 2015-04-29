mode.boss={
	game:{
		load:function(){
			var next=game.createEvent('load',false);
			next.content=function(){
				"step 0"
				game.import('identity');
				"step 1"
				delete lib.config.current_mode.change_identity;
				ui.create.arena();
				ui.auto.hide();
				ui.create.cards();
				game.finishCards();
				game.delay();
				"step 2"
				game.prepareGame();
				"step 3"
				var player=_status.first||game.zhu;
				event.trigger('gameStart');
				game.gameDraw(player);
				game.bossPhaseLoop(player);
			}
		},
		bossPhaseLoop:function(){
			var next=game.createEvent('phaseLoop');
			next.player=game.zhu;
			next.content=function(){
				"step 0"
				if(player.classList.contains('chongzheng')){
					player.classList.remove('chongzheng');
				}
				else{
					player.phase();
				}
				"step 1"
				if(_status.level.chongzheng!=undefined&&event.player==game.zhu){
					for(var i=0;i<game.dead.length;i++){
						if(game.dead[i].hp<0) game.dead[i].hp=0;
						if(game.dead[i].storage.boss_chongzheng<_status.level.chongzheng){
							game.dead[i].storage.boss_chongzheng++;
							if(game.dead[i].hp<game.dead[i].maxHp){
								game.dead[i].hp++;
							}
							else{
								var sort=lib.config.sort_card(card);
								if(lib.config.reverse_sort) sort=-sort;
								var position=sort>0?player.node.handcards1:player.node.handcards2;
								card.fix();
								var j=0;
								if(lib.config.strict_sort){
									for(j=0;j<position.childNodes.length;j++){
										if(lib.config.reverse_sort){
											if(sort<lib.config.sort_card(position.childNodes[j])) break;
										}
										else{
											if(sort>lib.config.sort_card(position.childNodes[j])) break;
										}
									}
								}
								card.animate('start');
								position.insertBefore(card,position.childNodes[j]);
							}
							game.dead[i].update();
						}
						else{
							game.dead[i].revive();
							game.dead[i].classList.add('chongzheng');
							game.dead[i].hp=game.dead[i].maxHp;
							if(game.dead[i].hp<4){
								game.dead[i].draw(3);
							}
							else{
								game.dead[i].draw(2);
							}
							i--;
						}
					}
				}
				if(_status.loopType==1){
					if(event.player==game.zhu){
						if(_status.next==undefined) _status.next=game.zhu.next;
						event.player=_status.next;
					}
					else{
						if(player.next==game.zhu){
							_status.next=game.zhu.next;
						}
						else{
							_status.next=player.next;
						}
						event.player=game.zhu;
					}
				}
				else{
					var players,i;
					if(game.players.contains(event.player.next)==false){
						players=get.players(lib.sort.position);
						if(players[players.length-1].position<event.player.position){
							event.player=game.me;
						}
						else{
							for(i=0;i<game.players.length;i++){
								if(game.players[i].position>=event.player.position){
									event.player=game.players[i];break;
								}
							}
						}
					}
					else{
						event.player=event.player.next;
					}
				}
				event.goto(0);
			}
		},
		prepareGame:function(){
			var next=game.createEvent('prepareGame',false);
			next.showConfig=true;
			next.ai=function(player,list){
				player.init(list[0]);
			};
			next.content=function(){
				"step 0"
				var i;
				var dialog=ui.create.dialog();
				for(i=0;i<lib.scene.length;i++){
					var node=ui.create.div('.caption');
					if(lib.scene[i].title){
						node.innerHTML=lib.scene[i].title;
						node.level=i;
						node.addEventListener('click',function(){
							_status.level=this.level;
							while(ui.dialogs.length){
								ui.dialogs[0].close();
							}
							while(ui.controls.length){
								ui.controls[0].close();
							}
							game.resume();
						})
					}
					dialog.add(node);
				}
				dialog.add(ui.create.div('.placeholder'));
				dialog.add(ui.create.div('.placeholder'));
				dialog.add(ui.create.div('.placeholder'));
				ui.identity=ui.create.control(lib.storage.mode||'random_identity',function(link,node){
					if(node.link=='random_identity'){
						node.link='only_boss';
						node.innerHTML=get.translation('only_boss');
						game.save('mode','only_boss');
					}
					else if(node.link=='only_boss'){
						node.link='not_boss';
						node.innerHTML=get.translation('not_boss');
						game.save('mode','not_boss');
					}
					else if(node.link=='not_boss'){
						node.link='random_identity';
						node.innerHTML=get.translation('random_identity');
						game.save('mode','random_identity');
					}
				});
				// ui.identity.link=lib.storage.mode||'random_identity';
				game.pause();
				"step 1"
				var level=lib.scene[_status.level];
				_status.level=level;
				event.list=[];
				var identityList=['zhu'];
				for(i=0;i<level.versus;i++) identityList.push('fan');
				ui.create.players(identityList.length);
				ui.create.me();
				if(lib.storage.mode!='only_boss'){
					for(i=0;i<identityList.length;i++){
						identityList.sort(lib.sort.random);
					}
					if(lib.storage.mode=='not_boss'){
						while(identityList[0]=='zhu'){
							identityList.sort(lib.sort.random);
						}
					}
				}
				for(i=0;i<game.players.length;i++){
					game.players[i].identity=identityList[i];
					game.players[i].setIdentity(game.players[i].identity)
					if(identityList[i]=='zhu'){
						game.zhu=game.players[i];
					}
				}
				for(i in lib.character){
					if(level.forbid&&level.forbid.contains(i)) continue;
					if(lib.character[i][4]&&lib.character[i][4].contains('boss')) continue;
					event.list.push(i);
				}
				event.list.sort(lib.sort.random);
				game.zhu.init(level.boss);
				if(game.zhu!=game.me){
					var player=game.zhu.next;
					while(player!=game.me){
						event.ai(player,event.list.splice(0,6));
						player=player.next;
					}
					var list=event.list.splice(0,6);
					var dialog=ui.create.dialog('选择角色',[list,'character']);
					game.me.chooseButton(dialog,true);
					ui.create.cheat=function(){
						ui.cheat=ui.create.control('更换',function(){
							event.list=event.list.concat(list);
							event.list.sort(lib.sort.random);
							list=event.list.splice(0,6);
							_status.event.dialog.close();
							_status.event.dialog=ui.create.dialog('选择角色',[list,'character']);
							game.uncheck();
							game.check();
						});
					}
					ui.create.cheat2=function(){
						ui.cheat2=ui.create.control('自由选将',function(){
							if(this.dialog==_status.event.dialog){
								this.dialog.close();
								ui.dialog=this.backup;
								ui.dialogs.unshift(this.backup);
								ui.arena.appendChild(this.backup);
								_status.event.dialog=this.backup;
								game.uncheck();
								game.check();
							}
							else{
								list=[];
								for(i in lib.character){
									list.push(i);
								}
								var groupSort=function(name){
									if(lib.character[name][1]=='wei') return 0;
									if(lib.character[name][1]=='shu') return 1;
									if(lib.character[name][1]=='wu') return 2;
									if(lib.character[name][1]=='qun') return 3;
								}
								list.sort(function(a,b){
									return groupSort(a)-groupSort(b);
								});
								this.backup=_status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog=ui.create.dialog('自由选将',[list,'character']);
								this.dialog=_status.event.dialog;
								game.uncheck();
								game.check();
							}
						});
					}
					if(!ui.cheat&&get.config('change_choice'))
					ui.create.cheat();
					if(!ui.cheat2&&get.config('free_choose'))
					ui.create.cheat2();
				}
				"step 2"
				ui.auto.show();
				if(ui.cheat){
					ui.cheat.close();
					delete ui.cheat;
				}
				if(ui.cheat2){
					ui.cheat2.close();
					delete ui.cheat2;
				}
				var level=_status.level;
				_status.loopType=level.loopType||0;
				if(result.buttons) game.me.init(result.buttons[0].link);
				event.list.remove(game.me.name);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].name==undefined){
						event.ai(game.players[i],event.list.splice(0,6))
					}
				}
				if(level.global){
					for(var i=0;i<level.global.length;i++){
						for(var j=0;j<game.players.length;j++){
							game.players[j].skills.add(level.global[i]);
						}
						lib.skill.global.add(level.global[i]);
					}
				}
				if(level.disable){
					for(var i=0;i<level.disable.length;i++){
						for(var j=0;j<game.players.length;j++){
							game.players[j].skills.remove(level.disable[i]);
						}
						lib.skill.global.remove(level.disable[i]);
					}
				}
				if(level.remove){
					for(var i=0;i<level.remove.length;i++){
						for(var j=0;j<lib.card.list.length;j++){
							if(lib.card.list[j][2]==level.remove[i]){
								lib.card.list.splice(0,1);i--;
							}
						}
					}
				}
				if(level.maxShuffle) _status.maxShuffle=level.maxShuffle;
				if(level.prepare) level.prepare();
			}
		},
	},
	element:{
		player:{
			dieAfter:function(){
				if(this==game.zhu) game.checkResult();
				else if(get.population('fan')==0) game.checkResult();
				else this.storage.boss_chongzheng=0;
			}
		}
	},
	translate:{
		start:'开始',
		choose_level:'选择关卡',
		random_identity:'随机分配',
		only_boss:'只当魔王',
		not_boss:'不当魔王',
		fan:'人',
		zhu:'魔',
		nianrui:'年瑞',
		qixiang1:'祺祥',
		qixiang2:'祺祥',
		nianrui_info:'摸牌阶段，你额外摸两张牌',
		qixiang1_info:'乐不思蜀判定时，你的方块判定牌视为红桃；兵粮寸断判定时，你的黑桃判定牌视为草花',
	},
}
