mode.stone={
	element:{
		player:{
			init:function(player){
				if(!player.isMin()){
					if(!player.node.actcount){
						player.node.actcount=ui.create.div('.actcount.hp',player);
					}
					if(typeof player.actcount!=='number'){
						player.actcount=1;
					}
					if(!player.actcharacterlist){
						player.actcharacterlist=[];
					}
					player.updateActCount();
				}
			},
			updateActCount:function(){
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
				var count=this.actcount-get.cardCount(true,this);
				for(var i=0;i<this.actcount;i++){
					if(i<count){
						this.node.actcount.childNodes[i].classList.remove('lost');
					}
					else{
						this.node.actcount.childNodes[i].classList.add('lost');
					}
				}
			},
			dieAfter:function(source){
				var dead=this;
				if(game.me.isDead()){
					if(!_status.mylist.length){
						game.over(false);
					}
					else{
						game.pause();
						_status.deadfriend.push(this);
						setTimeout(function(){
							var player=ui.create.player();
							player.dataset.position=dead.dataset.position;
							player.side=dead.side;
							player.actcharacterlist=dead.actcharacterlist;
							player.animate('replaceme');
							player.actcount=dead.actcount-1;
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
							player.draw(2,false);
							game.resume();
						},lib.config.duration);

					}
				}
				else if(game.enemy.isDead()){
					if(!_status.enemylist.length){
						game.over(true);
					}
					else{
						game.pause();
						_status.deadenemy.push(this);
						setTimeout(function(){
							var player=ui.create.player();
							player.dataset.position=dead.dataset.position;
							player.side=dead.side;
							player.actcharacterlist=dead.actcharacterlist;
							player.animate('replaceenemy');
							player.actcount=dead.actcount-1;
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
							player.draw(2,false);
							game.resume();
						},lib.config.duration);
					}
				}
				if(source&&source.side!=this.side){
					source.draw(2);
				}
				game.dead.remove(this);
				game.arrangePlayers();
				var player,pos;
				if(this.side==game.me.side){
					player=game.me;
					pos=0;
				}
				else{
					player=game.enemy;
					pos=4;
				}
				setTimeout(function(){
					dead.delete();
				},500);
				var index=player.actcharacterlist.indexOf(this);
				if(index>=0){
					player.actcharacterlist[index]=null;
				}
			}
		}
	},
	game:{
		reserveDead:true,
		layoutFixed:true,
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
				if(lib.character[i][4]&&lib.character[i][4].contains('minskin')){
					lib.character[i][3].add('stonesha');
					lib.character[i][3].add('stoneshan');
					list.push(i);
				}
			}
			var totallength=lib.card.list.length/3;
			var suit=['heart','diamond','club','spade'];
			for(i=0;i<totallength;i++){
				var thisname=list.randomGet();
				name=thisname+'_stonecharacter';
				lib.card[name]={
					enable:true,
					type:'stonecharacter',
					image:'character/default/'+thisname,
					color:'white',
					opacity:1,
					enable:function(event,player){
						if(!player.actcharacterlist) return false;
						if(player.actcharacterlist.length<4) return true;
						for(var i=0;i<player.actcharacterlist.length;i++){
							if(player.actcharacterlist[i]===null) return true;
						}
						return false;
					},
					chongzhu:true,
					textShadow:'black 0 0 2px',
					filterTarget:function(card,player,target){
						return player==target;
					},
					selectTarget:-1,
					content:function(){
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
					},
					ai:{
						order:9,
						result:{
							target:(function(name){
								return function(player,target){
									return 1;
								}
							}(thisname))
						}
					}
				};
				lib.translate[name]=get.translation(thisname);
				lib.translate[name+'_info']=get.skillintro(thisname,true,true);
				list2.push([suit.randomGet(),Math.ceil(Math.random()*13),name]);
			}
			lib.card.list=lib.card.list.concat(list2);
			lib.card.list.randomSort();

			for(var i in lib.skill){
				if(lib.skill[i].changeSeat){
					lib.skill[i]={};
					if(lib.translate[i+'_info']){
						lib.translate[i+'_info']='此模式下不可用';
					}
				}
			}
			for(var i in lib.card){
				if(lib.card[i].type=='equip'){
					lib.card[i].chongzhu=true;
				}
			}

			_status.deadfriend=[];
			_status.deadenemy=[];
		},
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				game.initStone();
				game.prepareArena(2);
				ui.arena.classList.add('stone');
				game.delay();
				"step 1"
				game.enemy=game.me.next;
				game.chooseCharacter();
				"step 2"
				game.me.identity='zhu';
				game.enemy.identity='zhu';
				game.me.side=Math.random()<0.5;
				game.enemy.side=!game.me.side;
				game.gameDraw(game.me,2);
				if(game.me.side){
					game.enemy.actcount++;
					game.enemy.updateActCount();
					game.stoneLoop(game.me);
				}
				else{
					game.me.actcount++;
					game.me.updateActCount();
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
					if(!get.config('double_character')&&get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
					if(get.config('double_character')&&lib.config.forbiddouble.contains(i)) continue;
					list.push(i);
				}
				list.randomSort();
				var dialog=ui.create.dialog('选择角色',[list.slice(0,get.config('battle_number')*2+5),'character']);
				game.me.chooseButton(dialog,true).selectButton=function(){
					return (get.config('double_character')?2:1)*get.config('battle_number');
				};
				event.changeDialog=function(){
					list.randomSort();
					_status.event.dialog.close();
					_status.event.dialog=ui.create.dialog('选择角色',[list.slice(0,get.config('battle_number')*2+5),'character']);
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
	character:{
		stone_weibing:['male','wei',2,[],['minskin']],
		stone_weiguan:['male','wei',1,[],['minskin']],
		stone_weijiang:['male','wei',3,[],['minskin']],

		stone_shubing:['male','shu',2,[],['minskin']],
		stone_shuguan:['male','shu',1,[],['minskin']],
		stone_shujiang:['male','shu',3,[],['minskin']],

		stone_wubing:['male','wu',2,[],['minskin']],
		stone_wuguan:['male','wu',1,[],['minskin']],
		stone_wujiang:['male','wu',3,[],['minskin']],

		stone_qunbing:['male','qun',2,[],['minskin']],
		stone_qunguan:['male','qun',1,[],['minskin']],
		stone_qunjiang:['male','qun',3,[],['minskin']],

		stone_daogu:['male','qun',2,[],['minskin']],
		stone_daoshi:['male','qun',1,[],['minskin']],
		stone_sanxian:['male','qun',3,[],['minskin']],

		stone_yisheng:['male','qun',2,[],['minskin']],
		stone_yinshi:['male','qun',1,[],['minskin']],
		stone_sanxian:['male','qun',3,[],['minskin']],
		stone_banxian:['male','qun',3,[],['minskin']],

		stone_gongzhu:['female','qun',2,[],['minskin']],
		stone_genv:['female','qun',1,[],['minskin']],
		stone_wunv:['female','qun',3,[],['minskin']],
		stone_wanghou:['female','qun',3,[],['minskin']],
		stone_feipin:['female','qun',3,[],['minskin']],
		stone_yiji:['female','qun',3,[],['minskin']],
	},
	skill:{
		_actcount:{
			mod:{
				cardEnabled:function(card,player){
					if(player.isMin()){
						if(get.type(card)=='equip') return false;
						return;
					}
					if(_status.currentPhase!=player) return;
					if(get.cardCount(true,player)>=player.actcount) return false;
				}
			},
			trigger:{player:'phaseUseBegin'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.isMin();
			},
			content:function(){
				player.actcount++;
				if(player.actcount>6){
					player.actcount-=6;
				}
				player.updateActCount();
			}
		},
		_actcount2:{
			trigger:{player:['useCard','useCardAfter']},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.isMin();
			},
			content:function(){
				player.updateActCount();
			}
		},
		stonesha:{
			enable:['chooseToUse','chooseToRespond'],
			filterCard:{type:'stonecharacter'},
			viewAs:{name:'sha'},
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
				respondSha:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		stoneshan:{
			enable:['chooseToRespond'],
			filterCard:{type:'equip'},
			viewAs:{name:'shan'},
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
				respondShan:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
	},
	translate:{
		stone_weibing:'士兵',
		stone_weiguan:'文官',
		stone_weijiang:'将领',

		stone_shubing:'士兵',
		stone_shuguan:'文官',
		stone_shujiang:'将领',

		stone_wubing:'士兵',
		stone_wuguan:'文官',
		stone_wujiang:'将领',

		stone_qunbing:'士兵',
		stone_qunguan:'文官',
		stone_qunjiang:'将领',

		stone_daoshi:'道士',
		stone_sanxian:'散仙',
		stone_banxian:'半仙',
		stone_yisheng:'医生',
		stone_yinshi:'隐士',

		stone_gongzhu:'公主',
		stone_genv:'歌女',
		stone_wunv:'舞女',
		stone_wanghou:'皇后',
		stone_feipin:'妃嫔',
		stone_yiji:'艺伎',
		stone_daogu:'道姑',

		stonesha:'炉杀',
		stoneshan:'石闪',
	},
	ai:{
		get:{
			attitude:function(from,to){
				return (to.identity=='zhu'?6:5)*(from.side==to.side?1:-1);
			}
		}
	},
	config:['battle_number','double_character','ban_weak','free_choose','change_choice']
}
