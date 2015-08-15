'use strict';
mode.stone={
	element:{
		player:{
			init:function(player){
				if(!player.isMin()||player.forcemin){
					if(!player.node.actcount){
						player.node.actcount=ui.create.div('.actcount.hp',player);
					}
					if(typeof player.actcount!=='number'){
						player.actcount=2;
					}
					player.actused=0;
					if(!player.actcharacterlist){
						player.actcharacterlist=[];
					}
					player.updateActCount();
				}
			},
			updateActCount:function(used){
				for(var i=0;i<10;i++){
					if(this.actcount>this.node.actcount.childElementCount){
						ui.create.div(this.node.actcount);
					}
					else if(this.actcount<this.node.actcount.childElementCount){
						this.node.actcount.lastChild.remove();
					}
					else{
						break;
					}
				}
				if(used!==false){
					var count=this.actcount-this.getActCount();
					for(var i=0;i<this.actcount;i++){
						if(i<count){
							this.node.actcount.childNodes[i].classList.remove('lost');
						}
						else{
							this.node.actcount.childNodes[i].classList.add('lost');
						}
					}
				}
			},
			canAddFellow:function(){
				if(!this.actcharacterlist) return false;
				if(this.actcharacterlist.length<4) return true;
				for(var i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]===null) return true;
				}
				return false;
			},
			getActCount:function(){
				return get.cardCount(true,this)+(this.actused||0)
			},
			getLeader:function(){
				return this.side==game.me.side?game.me:game.enemy;
			},
			getEnemy:function(){
				return this.side!=game.me.side?game.me:game.enemy;
			},
			hasFellow:function(){
				if(!this.actcharacterlist) return false;
				for(var i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]) return true;
				}
				return false;
			},
			countFellow:function(){
				if(!this.actcharacterlist) return 0;
				var num=0;
				for(var i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]) num++;
				}
				return num;
			},
			addFellow:function(fellow){
				if(!this.actcharacterlist) return this;
				var i;
				for(i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]===null){
						break;
					}
				}
				this.actcharacterlist[i]=fellow;
				fellow.dataset.position=i+4+(this==game.me?0:4);
				return this;
			},
			removeFellow:function(fellow){
				if(!this.actcharacterlist) return this;
				var index=this.actcharacterlist.indexOf(fellow);
				if(index>=0){
					this.actcharacterlist[index]=null;
				}
				return this;
			},
			dieAfter:function(source){
				var dead=this;
				if(game.me.isDead()){
					if(!_status.mylist.length){
						_status.friendCount.innerHTML='我方兵力：'+get.cnNumber(0);
						game.over(false);
					}
					else{
						game.pause();
						_status.deadfriend.push(this);
						game.additionaldead.push(this);
						setTimeout(function(){
							var player=ui.create.player();
							player.classList.add('noidentity');
							player.dataset.position=dead.dataset.position;
							player.side=dead.side;
							player.actcharacterlist=dead.actcharacterlist;
							player.animate('replaceme');
							player.actcount=game.enemy.actcount;
							player.actcount=dead.actcount;
							if(_status.double_character){
								player.init(_status.mylist.shift(),_status.mylist.shift());
							}
							else{
								player.init(_status.mylist.shift());
							}
							game.players.push(player);
							ui.arena.appendChild(player);
							game.swapControl(player);
							game.arrangePlayers();
							player.draw(2+game.enemy.countFellow(),false);
							game.resume();
							game.updateStatusCount();
						},lib.config.duration);

					}
				}
				else if(game.enemy.isDead()){
					if(!_status.enemylist.length){
						_status.enemyCount.innerHTML='敌方兵力：'+get.cnNumber(0);
						game.over(true);
					}
					else{
						game.pause();
						_status.deadenemy.push(this);
						game.additionaldead.push(this);
						setTimeout(function(){
							var player=ui.create.player();
							player.classList.add('noidentity');
							player.dataset.position=dead.dataset.position;
							player.side=dead.side;
							player.actcharacterlist=dead.actcharacterlist;
							player.animate('replaceenemy');
							player.actcount=dead.actcount;
							if(_status.double_character){
								player.init(_status.enemylist.shift(),_status.enemylist.shift());
							}
							else{
								player.init(_status.enemylist.shift());
							}
							game.players.push(player);
							game.enemy=player;
							ui.arena.appendChild(player);
							game.arrangePlayers();
							player.draw(2+game.me.countFellow(),false);
							game.resume();
							game.updateStatusCount();
						},lib.config.duration);
					}
				}
				if(source&&source.side!=this.side&&!source.isMin()){
					source.draw(2);
					if(source.getActCount()>0){
						source.actused--;
					}
					source.updateActCount();
				}
				game.dead.remove(this);
				game.arrangePlayers();
				this.getLeader().removeFellow(this);
				setTimeout(function(){
					dead.delete();
				},500);
			}
		}
	},
	game:{
		reserveDead:true,
		updateStatusCount:function(){
			_status.friendCount.innerHTML='我方兵力：'+get.cnNumber(1+_status.mylist.length/(_status.double_character?2:1),true);
			_status.enemyCount.innerHTML='敌方兵力：'+get.cnNumber(1+_status.enemylist.length/(_status.double_character?2:1),true);
		},
		stoneLoop:function(player){
			var next=game.createEvent('phaseLoop');
			next.player=player;
			next.content=function(){
				"step 0"
				player.phase();
				event.num=0;
				"step 1"
				if(event.num<player.actcharacterlist.length){
					var current=player.actcharacterlist[event.num];
					if(current){
						current.phase();
					}
					event.num++;
					event.redo();
				}
				"step 2"
				if(event.player==game.me){
					event.player=game.enemy;
				}
				else{
					event.player=game.me;
				}
				event.goto(0);
			}
		},
		initStone:function(){
			var list=[],list2=[];
			var i,j,name;
			for(i in lib.character){
				if(lib.character[i][4]&&lib.character[i][4].contains('minskin')&&lib.character[i][4].contains('stone')){
					lib.character[i][3].add('stonesha');
					lib.character[i][3].add('stoneshan');
					lib.character[i][3].add('stonedraw');
					name=i+'_stonecharacter';
					if(lib.character[i][5][0]<3){
						list.push(name);
					}
					else{
						list2.push(name);
					}
					lib.card[name]={
						image:'character/default/'+i,
						stoneact:lib.character[i][5][0]
					};
					for(j in lib.card.stonecharacter){
						lib.card[name][j]=lib.card.stonecharacter[j];
					}
					lib.translate[name]=get.translation(i);
					lib.translate[name+'_info']=get.skillintro(i);
				}
			}
			var addedcardcount=Math.ceil(lib.card.list.length/80);
			var addedcardcount2=Math.ceil(lib.card.list.length/160);
			var suit=['heart','diamond','club','spade'];
			while(addedcardcount--){
				for(i=0;i<list.length;i++){
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),list[i]]);
				}
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'shengerpingdeng']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'konghunshi']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'emofengdi']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'mindieyi']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'miefafu']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'sanghunzhao']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'sanghunzhao']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'jintiao']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'zhaohunfan']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'fengraozhijiao']);
			}
			while(addedcardcount2--){
				for(i=0;i<list2.length;i++){
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),list2[i]]);
				}
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'liumangxingzhen']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'dianhaishenzhu']);
				lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'yesushengxue']);
			}
			lib.card.list.randomSort();
			lib.skill._chongzhu.usable=3;
			for(i in lib.skill){
				if(lib.skill[i].changeSeat){
					lib.skill[i]={};
					if(lib.translate[i+'_info']){
						lib.translate[i+'_info']='此模式下不可用';
					}
				}
			}
			for(i in lib.card){
				if(lib.card[i].type=='equip'){
					// lib.card[i].chongzhu=true;
					lib.card[i].stoneact=0;
				}
				if(typeof lib.card[i].stoneact==='number'&&!lib.card[i].addinfo){
					lib.card[i].addinfo='消耗 '+lib.card[i].stoneact;
				}
			}

			_status.deadfriend=[];
			_status.deadenemy=[];
			game.additionaldead=[];
		},
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				lib.init.css('layout/mode/','stone');
				game.initStone();
				game.prepareArena(2);
				ui.arena.classList.add('stone');
				game.delay();
				"step 1"
				for(var i=0;i<game.players.length;i++){
					game.players[i].classList.add('noidentity');
				}
				game.enemy=game.me.next;
				game.chooseCharacter();
				"step 2"
				_status.friendCount=ui.create.system('',null,true);
				_status.enemyCount=ui.create.system('',null,true);
				game.updateStatusCount();
				lib.setPopped(_status.friendCount,function(){
					var uiintro=ui.create.dialog('hidden');

					if(_status.deadfriend.length){
						uiintro.add('已阵亡');
						uiintro.add([_status.deadfriend,'player']);
					}

					uiintro.add('未上场');
					if(_status.mylist.length){
						uiintro.add([_status.mylist,'character']);
					}
					else{
						uiintro.add('（无）')
					}

					return uiintro;
				});
				lib.setPopped(_status.enemyCount,function(){
					if(_status.deadenemy.length){
						var uiintro=ui.create.dialog('hidden');
						uiintro.add('已阵亡');
						uiintro.add([_status.deadenemy,'player']);
						return uiintro;
					}
				});

				game.me.side=Math.random()<0.5;
				game.enemy.side=!game.me.side;
				game.gameDraw(game.me,2);
				if(game.me.side){
					game.stoneLoop(game.me);
				}
				else{
					game.stoneLoop(game.enemy);
				}
			}
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
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
					if(lib.character[i][4]&&lib.character[i][4].contains('minskin')) continue;
					if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidall.contains(i)) continue;
					if(lib.config.forbidstone.contains(i)) continue;
					if(!get.config('double_character')&&get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
					if(get.config('double_character')&&lib.config.forbiddouble.contains(i)) continue;
					list.push(i);
				}
				list.randomSort();
				var dialog=ui.create.dialog('按顺序选择出场角色'+(get.config('double_character')?'（双将）':''));
				dialog.add('0/'+(get.config('double_character')?2:1)*get.config('battle_number'));
				dialog.add([list.slice(0,get.config('battle_number')*2+5),'character']);

				var next=game.me.chooseButton(dialog,true);
				next.selectButton=function(){
					return (get.config('double_character')?2:1)*get.config('battle_number');
				};
				next.custom.add.button=function(){
					if(ui.cheat2&&ui.cheat2.backup) return;
					_status.event.dialog.content.childNodes[0].innerHTML=
					'按顺序选择出场角色'+(get.config('double_character')?'（双将）':'');
					_status.event.dialog.content.childNodes[1].innerHTML=
					ui.selected.buttons.length+'/'+_status.event.selectButton();
				};
				event.changeDialog=function(){
					if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
						return;
					}
					list.randomSort();
					_status.event.dialog.close();
					_status.event.dialog=ui.create.dialog('按顺序选择出场角色'+(get.config('double_character')?'（双将）':''));
					_status.event.dialog.add('0/'+(get.config('double_character')?2:1)*get.config('battle_number'));
					_status.event.dialog.add([list.slice(0,get.config('battle_number')*2+5),'character']);
					game.uncheck();
					game.check();
				};
				ui.create.cheat=function(){
					ui.cheat=ui.create.control('更换',event.changeDialog);
				};
				event.dialogxx=ui.create.characterDialog();
				ui.create.cheat2=function(){
					ui.cheat2=ui.create.control('自由选将',function(){
						if(this.dialog==_status.event.dialog){
							this.dialog.close();
							_status.event.dialog=this.backup;
							this.backup.open();
							delete this.backup;
							game.uncheck();
							game.check();
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
							this.dialog.open();
							game.uncheck();
							game.check();
						}
					});
				}
				if(!ui.cheat&&get.config('change_choice'))
				ui.create.cheat();
				if(!ui.cheat2&&get.config('free_choose'))
				ui.create.cheat2();
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
				_status.mylist=result.links.slice(0);
				for(var i=0;i<result.links.length;i++){
					event.list.remove(result.links[i]);
				}
				event.list.randomSort();
				_status.enemylist=event.list.slice(0,result.links.length);
				_status.double_character=get.config('double_character');
				if(_status.double_character){
					game.me.init(_status.mylist.shift(),_status.mylist.shift());
					game.enemy.init(_status.enemylist.shift(),_status.enemylist.shift());
				}
				else{
					game.me.init(_status.mylist.shift());
					game.enemy.init(_status.enemylist.shift());
				}
			}
		},
	},
	card:{
		stonecharacter:{
			type:'stonecharacter',
			color:'white',
			opacity:1,
			enable:function(event,player){
				return player.canAddFellow();
			},
			chongzhu:true,
			textShadow:'black 0 0 2px',
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			content:function(){
				"step 0"
				var name=card.name.slice(0,card.name.indexOf('_stonecharacter'));
				var added=false;
				var i;
				for(i=0;i<player.actcharacterlist.length;i++){
					if(player.actcharacterlist[i]===null){
						added=true;
						break;
					}
				}
				var pos=i+4;
				if(player!=game.me){
					pos+=4;
				}
				var fellow=game.addFellow(pos,name);
				fellow.side=player.side;
				fellow.classList.add('turnedover');
				player.actcharacterlist[i]=fellow;
				fellow.$gain2(card);
				event.source=fellow;
				var num=lib.character[name][5][1];
				if(num){
					fellow.draw(num,false);
				}
				player.updateActCount();
				"step 1"
				event.trigger('fellow');
			},
			ai:{
				order:8.5,
				useful:[5.5,1],
				result:{
					target:1
				}
			}
		},
		zhaohunfan:{
			type:'stonecard',
			fullskin:true,
			enable:true,
			stoneact:1,
			filterTarget:function(card,player,target){
				if(!target.isMin()) return false;
				if(ui.selected.targets.length){
					return target.side!=ui.selected.targets[0].side;
				}
				return true;
			},
			selectTarget:2,
			multitarget:true,
			multiline:true,
			content:function(){
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].die();
				}
			},
			ai:{
				result:{
					target:function(player,target){
						if(ui.selected.targets.length&&target.hp<ui.selected.targets[0].hp){
							return 1;
						}
						return -1;
					}
				},
				order:6
			}
		},
		jintiao:{
			type:'stonecard',
			enable:true,
			stoneact:2,
			fullskin:true,
			filterTarget:function(card,player,target){
				return target.isMin()&&(target.maxHp>1||target.num('he')>0);
			},
			content:function(){
				"step 0"
				target.discard(target.get('he'));
				"step 1"
				if(target.maxHp>1){
					target.loseMaxHp(target.maxHp-1);
				}
			},
			ai:{
				result:{
					target:function(player,target){
						return 1-target.hp-target.num('h')/2;
					}
				},
				order:5
			}
		},
		liumangxingzhen:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			multiline:true,
			multitarget:true,
			content:function(){
				'step 0'
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].die()._triggered=null;
				}
				ui.clear();
				'step 1'
				player.recover(2)
			},
			stoneact:6,
			ai:{
				order:9,
				result:{
					target:-1,
					player:function(player){
						if(player.hp<player.maxHp) return 1;
						return 0;
					}
				}
			}
		},
		shengerpingdeng:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			stoneact:2,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.maxHp>1;
			},
			selectTarget:-1,
			content:function(){
				target.loseMaxHp(target.maxHp-1);
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(target.hp>1) return -1;
						if(target.maxHp>1) return -0.1;
						return 0;
					}
				}
			}
		},
		emofengdi:{
			fullskin:true,
			type:'stonecard',
			enable:function(event,player){
				if(player.isMin()) return false;
				return player.canAddFellow();
			},
			stoneact:5,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			content:function(){
				target.getLeader().removeFellow(target);
				target.side=player.side;
				player.addFellow(target);
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				}
			}
		},
		konghunshi:{
			type:'stonecard',
			fullskin:true,
			enable:function(event,player){
				if(player.isMin()) return false;
				return player.canAddFellow();
			},
			stoneact:4,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			content:function(){
				target.getLeader().removeFellow(target);
				target.side=player.side;
				player.addFellow(target);
				target.addSkill('konghunshi_die');
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				}
			}
		},
		mindieyi:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			stoneact:3,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			content:function(){
				target.turnOver();
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						if(target.isTurnedOver()) return 1;
						return -1;
					}
				}
			}
		},
		miefafu:{
			type:'stonecard',
			enable:true,
			stoneact:1,
			fullskin:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.turnOver();
			},
			ai:{
				order:6,
				result:{
					target:function(player,target){
						if(target.isTurnedOver()) return 1;
						return -1;
					}
				}
			}
		},
		dianhaishenzhu:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			stoneact:1,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side==player.side&&!target.skills.contains('chaofeng');
			},
			content:function(){
				target.addSkill('chaofeng');
				target.markSkill('chaofeng');
				game.log(get.translation(target)+'获得了嘲讽');
				target.popup('嘲讽');
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						if(target.hp>=3) return target.hp;
						return 0;
					}
				}
			}
		},
		yesushengxue:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			stoneact:4,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.hp<5;
			},
			content:function(){
				if(target.maxHp<5){
					target.gainMaxHp(Math.min(2,5-target.maxHp));
				}
				target.recover(2);
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						return 5-target.hp;
					}
				}
			}
		},
		sanghunzhao:{
			type:'stonecard',
			fullskin:true,
			enable:true,
			stoneact:3,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			content:function(){
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].loseHp();
				}
				ui.clear();
			},
			ai:{
				order:9,
				result:{
					target:-1
				}
			}
		},
		fengraozhijiao:{
			type:'stonecard',
			fullskin:true,
			enable:true,
			stoneact:1,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.hp<target.maxHp;
			},
			content:function(){
				target.recover(target.maxHp-target.hp);
			},
			ai:{
				order:8,
				result:{
					target:1
				}
			}
		},
	},
	character:{
		stone_weibing:['male','wei',2,['stone_weibing'],['minskin','stone'],[1,0]],
		stone_weiguan:['male','wei',1,['stone_weiguan'],['minskin','stone'],[1,2]],
		stone_weijiang:['male','wei',3,['stone_weijiang'],['minskin','stone'],[3,0]],

		stone_shubing:['male','shu',2,['stone_shubing'],['minskin','stone'],[1,0]],
		stone_shuguan:['male','shu',1,['stone_shuguan'],['minskin','stone'],[1,2]],
		stone_shujiang:['male','shu',3,['stone_shujiang'],['minskin','stone'],[3,0]],

		stone_wubing:['male','wu',2,['stone_wubing'],['minskin','stone'],[1,0]],
		stone_wuguan:['male','wu',1,['stone_wuguan'],['minskin','stone'],[1,2]],
		stone_wujiang:['male','wu',3,['stone_wujiang'],['minskin','stone'],[3,0]],

		stone_qunbing:['male','qun',2,['stone_qunbing'],['minskin','stone'],[1,0]],
		stone_qunguan:['male','qun',1,['stone_qunguan'],['minskin','stone'],[1,2]],
		stone_qunjiang:['male','qun',3,['stone_qunjiang'],['minskin','stone'],[3,0]],

		stone_daoshi:['male','qun',1,['stone_daoshi'],['minskin','stone'],[1,2]],
		stone_sanxian:['male','qun',2,['stone_sanxian'],['minskin','stone'],[2,0]],
		stone_yisheng:['male','qun',1,['jijiu'],['minskin','stone'],[2,2]],
		stone_yinshi:['male','qun',1,['stone_yinshi'],['minskin','stone'],[1,2]],
		stone_banxian:['male','qun',3,['stone_banxian'],['minskin','stone'],[3,0]],

		stone_daogu:['female','qun',1,['stone_daogu'],['minskin','stone'],[1,2]],
		stone_gongzhu:['female','wu',1,['shushen'],['minskin','stone'],[2,2]],
		stone_genv:['female','wei',1,['jieyin'],['minskin','stone'],[1,2]],
		stone_wunv:['female','qun',1,['biyue'],['minskin','stone'],[3,2]],
		stone_huanghou:['female','qun',2,['stone_huanghou'],['minskin','stone'],[3,1]],
		stone_feipin:['female','qun',1,['guixiu'],['minskin','stone'],[1,2]],
		stone_yiji:['female','qun',1,['stone_yiji'],['minskin','stone'],[2,2]],
	},
	skill:{
		chaofeng:{
			mark:true,
			intro:{
				content:'已获得嘲讽'
			}
		},
		_chaofeng:{
			mod:{
				targetEnabled:function(card,player,target){
					if(target.skills.contains('chaofeng')) return;
					if(card.name=='sha'||card.name=='juedou'){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].side==target.side&&game.players[i].skills.contains('chaofeng')){
								return false;
							}
						}
					}
				}
			}
		},
		konghunshi_die:{
			trigger:{player:'phaseAfter'},
			forced:true,
			unique:true,
			content:function(){
				player.die();
			}
		},
		stone_sanxian:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('散仙：令一名敌方随从失去一点体力',function(card,playerx,target){
					return player.side!=target.side&&target.isMin();
				}).ai=function(target){
					return Math.max(1,10-target.hp);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].addSkill('stone_sanxian2');
				}
			}
		},
		stone_sanxian2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_sanxian2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_sanxian2');
			}
		},
		stone_banxian:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player){
						game.players[i].addSkill('stone_banxian2');
					}
				}
			}
		},
		stone_banxian2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_banxian2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_banxian2');
			}
		},
		stone_daoshi:{
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw();
			}
		},
		stone_daogu:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw();
			}
		},
		stone_shubing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.classList.remove('turnedover');
			}
		},
		stone_yinshi:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.addTempSkill('stone_yinshi2',{player:'phaseBegin'});
			}
		},
		stone_yinshi2:{
			mod:{
				targetEnabled:function(){
					return false;
				}
			}
		},
		stone_shuguan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addSkill('stone_shuguan2');
			}
		},
		stone_shuguan2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.draw();
				player.removeSkill('stone_shuguan2');
			}
		},
		stone_shujiang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('蜀将：选择敌方一名角色视为对其使用一张杀',function(card,player,target){
					return lib.filter.targetEnabled({name:'sha'},event.chooser,target);
				}).ai=function(target){
					return ai.get.effect(target,{name:'sha'},event.chooser);
				}
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.useCard({name:'sha'},result.targets,false);
				}

			}
		},
		stone_weiguan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side==player.side&&
						game.players[i]!=player) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('魏官：选择已方一名角色摸一张牌',function(card,playerx,target){
					return player!=target&&player.side==target.side;
				}).ai=function(target){
					return ai.get.attitude(event.chooser,target);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					result.targets[0].draw();
				}
			}
		},
		stone_weibing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()&&
						game.players[i].num('he')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('魏兵：弃置对方一名随从的所有牌',function(card,playerx,target){
					return player.side!=target.side&&target.isMin()&&target.num('he')>0;
				}).ai=function(target){
					return target.num('he');
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].discard(result.targets[0].get('he'));
				}
			}
		},
		stone_weijiang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('魏将：对一名对方随从造成一点伤害',function(card,playerx,target){
					return player.side!=target.side&&target.isMin();
				}).ai=function(target){
					return Math.max(1,10-target.hp);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].damage(event.chooser);
				}
			}
		},
		stone_wubing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getEnemy().num('e')>0;
			},
			content:function(){
				var enemy=player.getEnemy();
				var es=enemy.get('e');
				if(es.length){
					player.getLeader().line(enemy);
					game.delay();
					enemy.gain(es,'gain2');
					game.log(get.translation(event.enemy)+'将'+get.translation(es)+'收入手牌')
				}
			}
		},
		stone_wuguan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addTempSkill('stone_wuguan2','phaseAfter');
			}
		},
		stone_wuguan2:{
			mod:{
				maxHandcard:function(player,num){
					return num+1;
				}
			},
		},
		stone_wujiang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().draw(2);
			}
		},
		stone_qunbing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.addSkill('stone_qunbing2');
			}
		},
		stone_qunbing2:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num++;
				player.removeSkill('stone_qunbing2');
			}
		},
		stone_qunguan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				game.asyncDraw(targets);
			}
		},
		stone_qunjiang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].discard(targets[i].get('he'));
				}
			}
		},
		stone_huanghou:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getEnemy().countFellow()>player.getLeader().countFellow();
			},
			content:function(){
				"step 0"
				event.chooser=player.getEnemy();
				event.chooser.chooseTarget('皇后：选择己方一名随从令其死亡',function(card,playerx,target){
					return target.isMin()&&target.side!=player.side;
				},true).ai=function(target){
					return -target.hp;
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].die();
				}
			}
		},
		stone_yiji:{
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source!=undefined&&event.source.isMin();
			},
			content:function(){
				trigger.source.addSkill('stone_yiji2');
			},
		},
		stone_yiji2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_yiji2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_yiji2');
			}
		},
		_actcount:{
			mod:{
				cardEnabled:function(card,player){
					if(player.isMin()){
						return;
					}
					if(_status.currentPhase!=player) return;
					var stoneact=get.info(card).stoneact;
					if(typeof stoneact!='number'){
						stoneact=1;
					}
					if(player.getActCount()+stoneact>player.actcount) return false;
				}
			},
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.isMin();
			},
			content:function(){
				player.actused=0;
				if(player.side){
					player.actcount=player.getEnemy().actcount;
				}
				else{
					player.actcount=player.getEnemy().actcount+1;
				}
				if(player.actcount>6){
					player.actcount-=5;
				}
				player.updateActCount();
			}
		},
		_actcount2:{
			trigger:{player:'useCard'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.isMin();
			},
			content:function(){
				var stoneact=get.info(trigger.card).stoneact;
				if(typeof stoneact==='number'){
					player.actused+=stoneact-1;
				}
				player.updateActCount();
			}
		},
		stonesha:{
			unique:true,
			enable:['chooseToUse','chooseToRespond'],
			filterCard:{type:'equip'},
			viewAs:{name:'sha'},
			check:function(){return 1},
			filter:function(event,player){
				return player.num('h',{type:'equip'})>0;
			},
			viewAsFilter:function(player){
				return player.num('h',{type:'equip'})>0;
			},
			ai:{
				skillTagFilter:function(player){
					return player.num('h',{type:'equip'})>0;
				},
				respondSha:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		stoneshan:{
			unique:true,
			enable:['chooseToRespond'],
			viewAs:{name:'shan'},
			filterCard:{type:'stonecharacter'},
			check:function(){return 1},
			filter:function(event,player){
				return player.num('h',{type:'stonecharacter'})>0;
			},
			viewAsFilter:function(player){
				return player.num('h',{type:'stonecharacter'})>0;
			},
			ai:{
				skillTagFilter:function(player){
					return player.num('h',{type:'stonecharacter'})>0;
				},
				respondShan:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		stonedraw:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			popup:false,
			content:function(){
				trigger.num--;
			}
		}
	},
	translate:{
		stone_weibing:'魏兵',
		stone_weibing_info:'你出场时，已方主将可以弃置对方一名随从的所有牌',
		stone_weiguan:'魏官',
		stone_weiguan_info:'你出场时，已方主将可以令已方一名其他角色摸一张牌',
		stone_weijiang:'魏将',
		stone_weijiang_info:'你出场时，已方主将可以对对方一名随从造成一点伤害',

		stone_shubing:'蜀兵',
		stone_shubing_info:'你出场时，立即将武将牌翻至正面',
		stone_shuguan:'蜀官',
		stone_shuguan2:'蜀官',
		stone_shuguan_info:'你出场时，已方主将于本回合结束阶段摸一张牌',
		stone_shujiang:'蜀将',
		stone_shujiang_info:'你出场时，已方主将可视为对一名敌方角色使用一张杀',

		stone_wubing:'吴兵',
		stone_wubing_info:'你出场时，敌方主将将装备区内的所有牌收入手牌',
		stone_wuguan:'吴官',
		stone_wuguan_info:'你出场时，已方主将本回合手牌上限+1',
		stone_wujiang:'吴将',
		stone_wujiang_info:'你出场时，已方主将摸两张牌',

		stone_qunbing:'群兵',
		stone_qunbing2:'群兵',
		stone_qunbing_info:'你出场后的第一个摸牌阶段摸牌数+1',
		stone_qunguan:'群官',
		stone_qunguan_info:'你出场时，所有其他随从各摸一张牌',
		stone_qunjiang:'群将',
		stone_qunjiang_info:'你出场时，敌方随从弃置所有牌',

		stone_daoshi:'道士',
		stone_daoshi_info:'回合开始阶段，若你没有手牌，你摸一张牌',
		stone_sanxian:'散仙',
		stone_sanxian_info:'你死亡前，已方主将可令一名敌方随从失去1点体力',
		stone_banxian:'半仙',
		stone_banxian_info:'你死亡后，场上所有其他随从失去1点体力',
		stone_yisheng:'医生',
		stone_yinshi:'隐士',
		stone_yinshi_info:'在你的回合开始前，不能成为任何卡牌的目标',

		stone_gongzhu:'公主',
		stone_genv:'歌女',
		stone_wunv:'舞女',
		stone_huanghou:'皇后',
		stone_huanghou_info:'你出场时，若敌方随从数多于己方，敌方主将须选择一名随从令其死亡',
		stone_feipin:'王妃',
		stone_yiji:'艺伎',
		stone_yiji_info:'杀死你的随从失去一点体力',
		stone_daogu:'道姑',
		stone_daogu_info:'回合结束阶段，若你没有手牌，你摸一张牌',

		stonesha:'冲锋',
		stonesha_info:'锁定技，你的装备牌均视为杀',
		stoneshan:'格挡',
		stoneshan_info:'锁定技，你的随从牌均视为闪',

		stonecharacter:'随从',
		shengerpingdeng:'生而平等',
		shengerpingdeng_info:'将所有随从体力上限降为1',
		emofengdi:'恶魔之眼',
		emofengdi_info:'限主将使用，将一名敌方随从吸收为已方',
		konghunshi:'控魂石',
		konghunshi_info:'限主将使用，将一名敌方随从吸收为已方，并令其于下个回合结束后死亡',
		konghunshi_die:'控魂石',
		konghunshi_die_info:'下个回合结束后死亡',
		mindieyi:'冥蝶翼',
		mindieyi_info:'将场上所有随从翻面',
		miefafu:'灭法符',
		miefafu_info:'将目标随从翻面',
		liumangxingzhen:'六芒星阵',
		liumangxingzhen_info:'令场上所有随从立即死亡（无法触发死亡技能），回复两点体力',
		dianhaishenzhu:'颠海神珠',
		dianhaishenzhu_info:'令目标随从获得嘲讽',
		chaofeng:'嘲讽',
		chaofeng_info:'同阵营的无嘲讽角色不以能成为杀或决斗的目标',
		yesushengxue:'耶稣圣血',
		yesushengxue_info:'令一名随从增加两点体力上限（不能超过5）并回复两点体力',
		sanghunzhao:'丧魂爪',
		sanghunzhao_info:'令场上所有随从失去一点体力',
		jintiao:'荆条',
		jintiao_info:'弃置一名随从的所有牌，并令其体力上限减至1',
		zhaohunfan:'招魂幡',
		zhaohunfan_info:'令双方各一名随从立即死亡',
		fengraozhijiao:'丰饶之角',
		fengraozhijiao_info:'令一名随从回复全部体力',

		stonecard:'法术'
	},
	ai:{
		get:{
			attitude:function(from,to){
				var num;
				if(to.isMin()&&!to.skills.contains('chaofeng')){
					num=5;
				}
				else{
					num=6;
				}
				return num*(from.side==to.side?1:-1);
			}
		}
	},
	config:['battle_number','double_character','double_hp','ban_weak','free_choose','change_choice'],
	help:{
		'炉石模式':'<ul><li>游戏流程类似1v1，场上有两名主将进行对抗'+
		'<li>主将出牌阶段的出牌数量（行动值）有上限，先手为2，后手为3，装备牌不计入出牌上限<li>游戏每进行一轮，主将的出牌上限+1，超过6时减至2并重新累加'+
		'<li>牌堆中随机加入总量1/3的随从牌，使用之可召唤一个随从，随从出场时背面朝上。每一方在场的随从数不能超过4<li>随从于摸牌阶段摸牌基数为1，随从的随从牌均视为闪，装备牌均视为杀<li>'+
		'随从与其他所有角色相互距离基数为1<li>'+
		'主将杀死对方随从后获得一个额外的行动值并摸两张牌，杀死己方随从无惩罚，随从杀死随从无效果'+
		'<li>牌堆中随机加入总量1/6的法术牌，效果主要与随从有关，法术牌根据强度不同可能会消耗额外的行动值'+
		'<li>主将可重铸随从牌，但回合内总的重铸次数不能超过3，随从不能重铸任何牌（包括铁索等默认可以重铸的牌）'+
		'<li>嘲讽：若一方阵营中有嘲讽角色，则同阵营的无嘲讽角色不以能成为杀或决斗的目标'+
		'<li>行动顺序为先主将后随从。主将或随从死亡后立即移出游戏，主将死亡后替补登场，替补登场时摸2+X张牌，X为对方存活的随从数，无替补时游戏结束'
	}
}
