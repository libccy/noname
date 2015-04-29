mode.swd={
	game:{
		start:function(){
			var next=game.createEvent('load',false);
			next.content=function(){
				"step 0"
				game.modTranslation();
				game.import('identity');
				if(!lib.storage.version||lib.storage.version<0.833){
					localStorage.setItem(lib.config.mode,"{}");
				}
				var background=lib.background;
				lib.background=[];
				for(var i=0;i<background.length;i++){
					for(var j=0;j<background[i][1];j++){
						lib.background[lib.background.length]=background[i][0];
					}
				}
				"step 1"
				ui.create.arena();
				ui.auto.hide();
				if(lib.storage.progress==undefined) lib.storage.progress=0;
				ui.choose=ui.create.control('选择关卡',function(){
					if(this.clicked){
						this.clicked=false;
						this.dialog.close();
					}
					else{
						this.clicked=true;
						var dialog=ui.create.dialog();
						this.dialog=dialog;
						var node;
						var list=[],list2=[];
						for(var i=0;i<lib.storage.maxprogress;i++){
							if(typeof lib.progress[i]=='number'){
								list2.push(['战斗：'+lib.battle[lib.progress[i]].name,i]);
							}
							else if(typeof lib.progress[i]=='string'){
								list.push([lib.progress[i],i]);
							}
						}
						var listen=function(){
							_status.clicked=true;
							ui.choose.clicked=false;
							game.save('progress',this.number);
							ui.dialog.close();
							ui.dialog.close();
							event.redo();
							game.resume();
						}
						for(var i=0;i<list.length;i++){
							node=dialog.add(list[i][0]);
							node.number=list[i][1];
							node.listen(listen);
						}
						dialog.add(ui.create.div('.placeholder'));
						for(var i=0;i<list2.length;i++){
							node=dialog.add(list2[i][0]);
							node.number=list2[i][1];
							node.listen(listen);
						}
						dialog.add(ui.create.div('.placeholder'));
						dialog.add(ui.create.div('.placeholder'));
						dialog.add(ui.create.div('.placeholder'));
					}
				})
				"step 2"
				game.updateBackground();
				if(lib.storage.progress>lib.progress.length-1){
					game.save('progress',lib.progress.length-1);
				}
				var progress=lib.progress[lib.storage.progress];
				game.pause();
				if(typeof progress=='object'||typeof progress=='string'){
					var left=true;
					var add=true;
					if(ui.avatar){
						if(ui.avatar.name!=progress[0]){
							if(!ui.avatar.right) left=false;
							ui.avatar.delete();
							delete ui.avatar;
						}
						else add=false;
					}
					if(add&&lib.character[progress[0]]){
						ui.avatar=ui.create.div('.avatar',ui.arena).animate('start');
						ui.avatar.setBackground(progress[0],'character');
						ui.avatar.style.top='calc(100% / 3 - 100px / 3)';
						if(left){
							ui.avatar.style.left='calc(5% + 120px)';
						}
						else{
							ui.avatar.style.left='calc(95% - 214px)';
							ui.avatar.right=true;
						}
						ui.avatar.name=progress[0];
					}
					var dialog;
					if(typeof progress=='object'){
						if(progress.length>1){
							dialog=ui.create.dialog(get.translation(progress[0]),progress[1]);
						}
						else{
							dialog=ui.create.dialog(get.translation(progress[0]));
						}
					}
					else{
						dialog=ui.create.dialog(progress);
					}
					dialog.listen(function(){
						if(_status.clicked) return;
						this.close();
						game.addProgress();
						event.redo();
						game.resume();
					});
				}
				else if(lib.storage.progress==lib.storage.savedprogress){
					_status.paused=false;
					_status.battle=progress;
				}
				else{
					if(ui.avatar){
						ui.avatar.delete();
						delete ui.avatar;
					}
					_status.battle=progress;
					var dialog=ui.create.dialog('战斗：'+lib.battle[progress].name,lib.battle[progress].intro);
					dialog.listen(function(){
						if(_status.clicked) return;
						this.close();
						game.resume();
					});
				}
				"step 3"
				ui.choose.delete();
				delete lib.card.zhuge;
				ui.create.cards();
				game.finishCards();
				game.delay();
				"step 4"
				if(get.config('save_progress')&&lib.storage.saved) game.loadGame();
				else game.prepareGame();
				"step 5"
				event.trigger('gameStart');
				if(get.config('save_progress')&&lib.storage.saved&&
					lib.storage.progress==lib.storage.savedprogress){
					var card;
					for(var i=0;i<game.players.length;i++){
						for(var j=0;j<lib.storage.players[i].handcards.length;j++){
							card=get.cardPile(lib.storage.players[i].handcards[j]);
							if(get.itemtype(card)=='card'){
								if(lib.config.sort_card(card)>0) game.players[i].node.handcards1.appendChild(card);
								else game.players[i].node.handcards2.appendChild(card);
							}
						}
						for(var j=0;j<lib.storage.players[i].equips.length;j++){
							card=get.cardPile(lib.storage.players[i].equips[j]);
							if(get.itemtype(card)=='card'&&get.type(card)=='equip'){
								game.players[i].equip(card);
							}
						}
						for(var j=0;j<lib.storage.players[i].judges.length;j++){
							card=get.cardPile(lib.storage.players[i].judges[j]);
							if(get.itemtype(card)=='card'&&get.type(card)=='delay'){
								game.players[i].addJudge(card);
							}
						}
						if(lib.storage.players[i].linked) game.players[i].classList.add('linked');
						if(lib.storage.players[i].turnedover) game.players[i].classList.add('turnedover');
						if(lib.storage.players[i].out) game.players[i].classList.add('out');
						game.players[i].update();
					}
					event.trigger('gameStart');
					game.phaseLoop(game.players[lib.storage.player]);
				}
				else{
					event.trigger('gameStart');
					game.gameDraw(game.zhu);
					game.phaseLoop(game.zhu);
				}
			}
		},
		createBattle:function(){
			var battle=lib.battle[_status.battle];
			if(!battle.friend) battle.friend=[];
			if(!battle.neutral) battle.neutral=[];
			_status.list=battle.enemy.slice(0);
			_status.list.sort(lib.sort.random);
			var num=battle.enemycount||battle.enemy.length;
			var player;
			for(var i=0;i<num;i++){
				player=game.addPlayer();
				player.init(_status.list.randomGet());
				_status.list.remove(player.name);
				player.setIdentity('fan');
				player.identity='fan';
				player.identityShown=true;
			}
			for(var i=0;i<battle.friend.length;i++){
				player=game.addPlayer();
				player.init(battle.friend[i]);
				player.setIdentity('zhong');
				player.identity='zhong';
				player.identityShown=true;
			}
			for(var i=0;i<battle.neutral.length;i++){
				player=game.addPlayer();
				player.init(battle.neutral[i]);
				player.setIdentity('nei');
				player.identity='nei';
				player.identityShown=true;
			}
		},
		prepareGame:function(){
			var next=game.createEvent('prepareGame',false);
			next.content=function(){
				"step 0"
				// var dialog=ui.create.dialog('选择角色',[['swd_cheyun','swd_huanyuanzhi','swd_murongshi'],'character']);
				// game.pause();
				// for(var i=0;i<dialog.buttons.length;i++){
				// 	dialog.buttons[i].classList.add('selectable');
				// }
				// event.custom.replace.button=function(button){
				// 	_status.avatar=button.link;
				// 	dialog.close();
				// 	game.resume();
				// }
				_status.avatar='swd_cheyun';
				"step 1"
				ui.auto.show();
				ui.create.players(1);
				ui.create.me();
				ui.learned={};
				game.zhu=game.me;
				game.me.init(_status.avatar);
				game.me.setIdentity('zhu');
				game.me.identity='zhu';
				game.me.identityShown=true;
				game.me.jp=200;
				game.me.jpa=200;
				game.me.jpe=0;
				for(var i=0;i<game.me.skills.length;i++){
					game.me.modeSkills.add(game.me.skills[i]);
				}
				game.me.addSkill(['infinity_learn','infinity_penalty','infinity_jp','infinity_add','infinity_add2']);
				game.me.modeSkills.add('infinity_learn','infinity_penalty','infinity_jp','infinity_add','infinity_add2');
				for(var i in lib.player){
					for(var j in lib.player[i]){
						if(!lib.skill[j]||game.me.modeSkills.contains(j)) delete lib.player[i][j];
					}
				}
				game.me.learned={
					initiative:['无'],
					trigger:['无'],
					lock:['无'],
					limited:['无'],
				};
				game.me.learned1='无';
				game.me.learned2='无';
				game.me.learned3='无';
				game.me.learned4='无';
				game.me.learned5='无';
				game.me.learned6='无';
				game.me.learned7='无';
				game.createBattle();
			}
		},
		loadGame:function(){
			var next=game.createEvent('prepareGame',false);
			next.content=function(){
				"step 0"
				_status.list=lib.battle[_status.battle].enemy.slice(0);
				_status.list.sort(lib.sort.random);
				for(var i=0;i<lib.storage.players.length;i++){
					_status.list.remove(lib.storage.players[i].name);
					_status.list.remove(lib.storage.players[i].name2);
				}
				"step 1"
				ui.auto.show();
				if(lib.storage.progress!=lib.storage.savedprogress){
					ui.create.players(1);
					ui.create.me();
					game.me.init(lib.storage.players[0].name);
					game.me.identity=lib.storage.players[0].identity;
					game.me.setIdentity();
					_status.list.remove(game.me.name);
					_status.list.remove(game.me.name2);
					game.me.hp=lib.storage.players[0].hp;
					if(game.me.hp<2) game.me.hp=2;
					game.me.maxHp=lib.storage.players[0].maxHp;
					game.me.update();
					game.createBattle();
				}
				else{
					ui.create.players(lib.storage.players.length);
					ui.create.me();
					for(var i=0;i<lib.storage.players.length;i++){
						game.players[i].init(lib.storage.players[i].name,lib.storage.players[i].name2);
						game.players[i].identity=lib.storage.players[i].identity;
						game.players[i].setIdentity();
						game.players[i].identityShown=true;
						_status.list.remove(game.players[i].name);
						_status.list.remove(game.players[i].name2);
						game.players[i].hp=lib.storage.players[i].hp;
						game.players[i].maxHp=lib.storage.players[i].maxHp;
						game.players[i].update();
						if(lib.storage.players[i].linked) game.players[i].classList.add('linked');
						if(lib.storage.players[i].turnedover) game.players[i].classList.add('turnedover');
						if(lib.storage.players[i].out) game.players[i].classList.add('out');
						for(var j in lib.storage.players[i].storage){
							game.players[i].storage[j]=lib.storage.players[i].storage[j];
						}
					}
				}
				ui.learned={};
				game.zhu=game.me;
				for(var i=0;i<game.me.skills.length;i++){
					game.me.modeSkills.add(game.me.skills[i]);
				}
				game.me.addSkill(['infinity_learn','infinity_penalty','infinity_jp','infinity_add','infinity_add2']);
				game.me.modeSkills.add('infinity_learn','infinity_penalty','infinity_jp','infinity_add','infinity_add2');
				if(game.me.hp<=0) game.me.hp=2;
				for(var i in lib.player){
					for(var j in lib.player[i]){
						if(!lib.skill[j]||game.me.modeSkills.contains(j)) delete lib.player[i][j];
					}
				}
				game.me.jp=lib.storage.jp;
				game.me.jpa=lib.storage.jpa;
				game.me.jpe=lib.storage.jpe;
				game.me.learned=lib.storage.learned;
				game.me.learned1=lib.storage.learned1;
				game.me.learned2=lib.storage.learned2;
				game.me.learned3=lib.storage.learned3;
				game.me.learned4=lib.storage.learned4;
				game.me.learned5=lib.storage.learned5;
				game.me.learned6=lib.storage.learned6;
				game.me.learned7=lib.storage.learned7;
				if(game.me.learned1!='无') game.me.addSkill(game.me.learned1);
				if(game.me.learned2!='无') game.me.addSkill(game.me.learned2);
				if(game.me.learned3!='无') game.me.addSkill(game.me.learned3);
				if(game.me.learned4!='无') game.me.addSkill(game.me.learned4);
				if(game.me.learned5!='无') game.me.addSkill(game.me.learned5);
				if(game.me.learned6!='无') game.me.addSkill(game.me.learned6);
				if(game.me.learned7!='无') game.me.addSkill(game.me.learned7);
			}
		},
		saveProgress:function(current){
			var players=[];
			var player=game.me;
			var handcards,equips,judges,cards,storage;
			var count=0;
			do{
				handcards=[];equips=[];judges=[];
				cards=player.get('h');
				for(var i=0;i<cards.length;i++){
					handcards.push(cards[i].name);
				}
				cards=player.get('e');
				for(var i=0;i<cards.length;i++){
					equips.push(cards[i].name);
				}
				cards=player.get('j');
				for(var i=0;i<cards.length;i++){
					judges.push(cards[i].name);
				}
				storage={};
				for(var i in player.storage){
					if(typeof player.storage[i]!='object') storage[i]=player.storage[i];
				}
				players.push({
					name:player.name,
					name2:player.name2,
					handcards:handcards,
					equips:equips,
					judges:judges,
					hp:player.hp,
					maxHp:player.maxHp,
					identity:player.identity,
					linked:player.isLinked(),
					turnedover:player.isTurnedOver(),
					out:player.isOut(),
					storage:storage,
				});
				player=player.next;
				if(count++>20) {alert('!!!');break;}
			}
			while(player!=game.me);
			game.save('player',current.dataset.position);
			game.save('players',players);
			game.save('jpa',game.me.jpa);
			game.save('jpe',game.me.jpe);
			game.save('jp',game.me.jp);
			game.save('learned',game.me.learned);
			game.save('learned1',game.me.learned1);
			game.save('learned2',game.me.learned2);
			game.save('learned3',game.me.learned3);
			game.save('learned4',game.me.learned4);
			game.save('learned5',game.me.learned5);
			game.save('learned6',game.me.learned6);
			game.save('learned7',game.me.learned7);
			game.save('saved',true);
			game.save('savedprogress',lib.storage.progress);
		},
		addProgress:function(){
			if(lib.storage.progress+1>lib.progress.length-1){
				game.save('progress',lib.progress.length-1);
				game.save('maxprogress',lib.progress.length-1);
			}
			else{
				game.save('progress',lib.storage.progress+1);
				if(typeof lib.storage.maxprogress!='number'||lib.storage.maxprogress<lib.storage.progress)
				game.save('maxprogress',lib.storage.progress);
			}
		},
		clearProgress:function(){
			localStorage.setItem(lib.config.mode,"{}");
			lib.storage={};
		},
		onOver:function(){
			ui.restart.remove();
			delete ui.restart;
			ui.create.control('继续',function(){
				if(game.me.isAlive()){
					game.addProgress();
				}
				game.save('savedprogress',null);
				window.location.reload();
			});
		},
		modTranslation:function(){
			;
		},
		updateBackground:function(){
			if(ui.background.link==lib.background[lib.storage.progress]) return;
			ui.background.delete();
			ui.background=ui.create.div('.background').animate('start');
			ui.background.style.webkitFilter='blur(8px)';
			ui.background.style.webkitTransform='scale(1.05)';
			ui.background.style.backgroundSize='cover';
			ui.background.style.backgroundImage="url('image/story/czt/"+lib.background[lib.storage.progress]+".jpg')";
			ui.background.link=lib.background[lib.storage.progress];
			document.body.insertBefore(ui.background,document.body.firstChild);
		}
	},
	player:{
		initiative:{
			huoji:100,
			luanji:100,
			fanjian:150,
			duanliang:160,
			lianhuan:160,
			qiangxi:200,
			jiuchi:200,
			longdan:200,
			wusheng:250,
			zhijian:250,
			lijian:300,
			dimeng:300,
			quhu:300,
			qixi:300,
			longhun:300,
			guose:350,
			lijian:350,
			rende:400,
			kanpo:450,
			tianyi:450,
			tiaoxin:450,
			qingguo:500,
			gongxin:500,
			jieyin:800,
			kurou:1000,
			zhiheng:2000,
		},
		trigger:{
			shuangxiong:100,
			jushou:100,
			tiandu:150,
			fangzhu:150,
			jianxiong:150,
			ganglie:150,
			mengjin:200,
			tieji:200,
			yinghun:200,
			lieren:200,
			tianxiang:200,
			fankui:250,
			shensu:250,
			guanxing:250,
			haoshi:250,
			luoyi:300,
			liegong:300,
			yingzi:300,
			jieming:300,
			fangquan:300,
			zaiqi:300,
			luoshen:300,
			xingshang:300,
			tuxi:300,
			biyue:350,
			yiji:350,
			guzheng:350,
			buqu:350,
			jiang:350,
			beige:400,
			guicai:400,
			shelie:500,
			liuli:500,
			lianying:500,
			leiji:500,
			guidao:600,
			jizhi:600,
			// xiaoji:1200,
		},
		lock:{
			huoshou:50,
			juxiang:70,
			roulin:100,
			jiuyuan:100,
			hongyan:150,
			wushuang:200,
			bazhen:300,
			mashu:300,
			xiangle:300,
			qicai:300,
			kongcheng:300,
			keji:400,
			xueyi:500,
			weimu:600,
			qianxun:650,
			wansha:800,
			kuanggu:800,
			juejing:1000,
			// paoxiao:1600,
		},
		limited:{
			niepan:1000,
			luanwu:1000,
		},
	},
	element:{
		player:{
			dieAfter:function(source){
				if(this!=game.me){
					game.removePlayer(this);
				}
				if(this.identity=='zhong'&&source==game.me) game.me.discard(game.me.get('h'));
				if(source&&this.identity=='fan'){
					if(source.identity=='fan') source.draw(get.difficulty());
					else source.draw(4-get.difficulty());
				}
				game.checkResult();
			},
			dieSpeak:function(){
				switch(this.identity){
					case 'zhu': this.popup('云狐你怎么不动了',2000);break;
					case 'zhong': this.popup('啊',2000);break;
					case 'nei': this.popup('可恶……',2000);break;
					case 'fan': this.popup('呃……',2000);break;
				}
			},
		}
	},
	skill:{
		infinity_learn:{
			trigger:{player:'phaseBefore'},
			forced:true,
			popup:false,
			priority:20,
			filter:function(){
				return !_status.auto;
			},
			content:function(){
				"step 0"
				if(_status.auto) return;
				var dialog=ui.create.dialog(),i,j;
				var addJpe=function(){
					game.me.jpe=0;
					var link,skills=[];
					for(var i=0;i<10;i++){
						if(i==2||i==5||i==8) continue;
						link=dialog.content.childNodes[i].querySelector('.toggle').link;
						if(link!='无') skills.push(link);
					}
					var skills2={};
					for(var i in lib.player){
						for(var j in lib.player[i]){
							skills2[j]=lib.player[i][j];
						}
					}
					for(var i=0;i<skills.length;i++){
						game.me.jpe+=skills2[skills[i]];
					}
					ui.jpe.innerHTML=game.me.jpe;
				};
				dialog.add(ui.create.switcher('initiative1',game.me.learned.initiative,game.me.learned1,addJpe));
				dialog.add(ui.create.switcher('initiative2',game.me.learned.initiative,game.me.learned2,addJpe));
				dialog.add(ui.create.div('.placeholder'));
				dialog.add(ui.create.switcher('trigger1',game.me.learned.trigger,game.me.learned3,addJpe));
				dialog.add(ui.create.switcher('trigger2',game.me.learned.trigger,game.me.learned4,addJpe));
				dialog.add(ui.create.div('.placeholder'));
				dialog.add(ui.create.switcher('lock1',game.me.learned.lock,game.me.learned5,addJpe));
				dialog.add(ui.create.switcher('lock2',game.me.learned.lock,game.me.learned6,addJpe));
				dialog.add(ui.create.div('.placeholder'));
				dialog.add(ui.create.switcher('limited',game.me.learned.limited,game.me.learned7,addJpe));
				dialog.add(ui.create.div('.placeholder'));
				for(j in lib.player){
					(function(j){
						for(i in lib.player[j]){
							var node=ui.create.line(get.translation(i),player.learned[j].contains(i)?'已学习':lib.player[j][i],
								function(){
								var toggle=this.parentNode.querySelector('.toggle');
								if(toggle.classList.contains('toggle')){
									var that=toggle.parentNode;
									if(toggle.innerHTML=='已学习') return;
									var num=parseInt(toggle.innerHTML);
									if(num>game.me.jp){
										if(that.node2) return;
										that.node2=ui.create.div('.toggle',that).animate('start');
										that.node2.innerHTML='点数不足';
										that.node2.style.right='56px';
										setTimeout(function(){
											that.node2.delete();
											delete that.node2;
										},1000);
										return;
									}
									toggle.innerHTML='已学习';
									game.me.jp-=num;
									game.me.learned[j].push(toggle.skill);
									ui.jp.innerHTML=game.me.jp;
								}
							});
							node.childNodes[1].skill=i;
							ui.learned[i]=node;
							dialog.add(node);
						}
					}(j))
					dialog.add(ui.create.div('.placeholder'));
				}
				dialog.add(ui.create.line('摸两张牌',100,function(){
					var node=this.parentNode;
					if(node.clicked) return;
					if(game.me.jp<100){
						if(node.node2) return;
						node.node2=ui.create.div('.toggle',node).animate('start');
						node.node2.innerHTML='点数不足';
						node.node2.style.right='56px';
						setTimeout(function(){
							node.node2.delete();
							delete node.node2;
						},1000);
						return;
					}
					node.clicked=true;
					node.querySelector('.toggle').innerHTML='已选择'
					game.me.jpa-=100;
					game.me.jp-=100;
					ui.jp.innerHTML=game.me.jp;
					ui.jpa.innerHTML=game.me.jpa;
					game.me.draw(2);
				}));
				dialog.add(ui.create.line('回复体力',100,function(){
					var node=this.parentNode;
					if(node.clicked) return;
					if(game.me.jp<100){
						if(node.node2) return;
						node.node2=ui.create.div('.toggle',node).animate('start');
						node.node2.innerHTML='点数不足';
						node.node2.style.right='56px';
						setTimeout(function(){
							node.node2.delete();
							delete node.node2;
						},1000);
						return;
					}
					node.clicked=true;
					node.querySelector('.toggle').innerHTML='已选择'
					game.me.jpa-=100;
					game.me.jp-=100;
					ui.jp.innerHTML=game.me.jp;
					ui.jpa.innerHTML=game.me.jpa;
					game.me.recover();
				}));
				if(game.me.maxHp<5){
					dialog.add(ui.create.line('体力上限',1000,function(){
						var node=this.parentNode;
						if(node.clicked) return;
						if(game.me.jp<1000){
							if(node.node2) return;
							node.node2=ui.create.div('.toggle',node).animate('start');
							node.node2.innerHTML='点数不足';
							node.node2.style.right='56px';
							setTimeout(function(){
								node.node2.delete();
								delete node.node2;
							},1000);
							return;
						}
						node.clicked=true;
						node.querySelector('.toggle').innerHTML='已选择'
						game.me.jpa-=1000;
						game.me.jp-=1000;
						ui.jp.innerHTML=game.me.jp;
						ui.jpa.innerHTML=game.me.jpa;
						game.me.maxHp++;
						game.me.update();
					}));
				}
				dialog.add(ui.create.div('.placeholder'));
				dialog.add(ui.create.line('重置技能',function(){
					var i,j;
					for(i in lib.player){
						while(game.me.learned[i].length>1){
							j=game.me.learned[i].pop();
							ui.learned[j].childNodes[1].innerHTML=lib.player[i][j];
						}
					}
					game.me.jpa=Math.ceil(0.9*game.me.jpa);
					game.me.jp=game.me.jpa;
					game.me.jpe=0;
					for(i=0;i<10;i++){
						if(i==2||i==5||i==8) continue;
						dialog.content.childNodes[i].querySelector('.toggle').innerHTML='无';
						dialog.content.childNodes[i].querySelector('.toggle').link='无';
					}
					ui.jp.innerHTML=game.me.jp;
					ui.jpa.innerHTML=game.me.jpa;
					ui.jpe.innerHTML=0;
				}));
				var jp=ui.create.line('剩余点数',game.me.jp);
				ui.jp=jp.childNodes[1];
				dialog.add(jp);
				var jpe=ui.create.line('装备技能',game.me.jpe);
				ui.jpe=jpe.childNodes[1];
				dialog.add(jpe);
				var jpa=ui.create.line('技能点数',game.me.jpa);
				ui.jpa=jpa.childNodes[1];
				dialog.add(jpa);
				var control=ui.create.control('完成',function(){
					game.me.clearSkills();
					var link;
					for(var i=0;i<10;i++){
						if(i==2||i==5||i==8) continue;
						link=dialog.content.childNodes[i].querySelector('.toggle').link;
						switch(dialog.content.childNodes[i].firstChild.innerHTML){
							case '主动技能一':game.me.learned1=link;break;
							case '主动技能二':game.me.learned2=link;break;
							case '被动技能一':game.me.learned3=link;break;
							case '被动技能二':game.me.learned4=link;break;
							case '锁定技能一':game.me.learned5=link;break;
							case '锁定技能二':game.me.learned6=link;break;
							case '限定技':game.me.learned7=link;break;
						}
						if(link!='无') game.me.addSkill(link);
					}
					control.close();
					dialog.close();
					event.finish();
					game.resume();
				})
				game.pause();
				"step 1"
				while(ui.dialogs.length){
					ui.dialogs[0].close();
				}
				while(ui.controls.length){
					ui.controls[0].close();
				}
			}
		},
		infinity_jp:{
			init:function(){
				game.me.storage.infinity_jp=true;
			},
			group:['jp_damage','jp_kill','jp_use','jp_skill'],
			intro:{
				content:function(intro,player){
					return '技能点数：'+player.jp+'/'+player.jpa;
				}
			}
		},
		infinity_add:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			filter:function(){
				return _status.list.length&&game.players.length<8;
			},
			content:function(){
				var position,player;
				var num=get.population('zhong')+1+Math.min(3,Math.floor(game.me.jpa/1000))-get.population('fan');
				if(get.population('zhong')>1) num--;
				if(num>0&&Math.random()<get.difficulty()/3){
					player=game.addPlayer();
					player.init(_status.list.randomGet());
					_status.list.remove(player.name);
					if(Math.random()<get.difficulty()/6){
						player.init(player.name,_status.list.randomGet());
						_status.list.remove(player.name2);
					}
					player.setIdentity('fan');
					player.identity='fan';
					player.identityShown=true;
					player.draw(get.difficulty());
				}
				// else if(num<0&&Math.random()<1/get.difficulty()){
				// 	player=game.addPlayer();
				// 	player.init(_status.list.randomGet());
				// 	_status.list.remove(player.name);
				// 	if(Math.random()<0.5/get.difficulty()){
				// 		player.init(player.name,_status.list.randomGet());
				// 		_status.list.remove(player.name2);
				// 	}
				// 	player.setIdentity('zhong');
				// 	player.identity='zhong';
				// 	player.identityShown=true;
				// 	player.draw(4-get.difficulty());
				// }
				// else if(Math.random()<0.2/(get.population('nei')+1)&&get.population('nei')<2){
				// 	player=game.addPlayer();
				// 	player.init(_status.list.randomGet());
				// 	_status.list.remove(player.name);
				// 	player.setIdentity('nei');
				// 	player.identity='nei';
				// 	player.identityShown=true;
				// 	player.draw(2);
				// }
			}
		},
		infinity_penalty:{
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			content:function(){
				var n=Math.floor(player.jpe*get.difficulty()/50);
				if(n>player.jp) n=player.jp;
				game.me.popup('技能点数 -'+n);
				game.log(get.translation(game.me)+'扣减了'+n+'点技能点数');
				player.jp-=n;
				player.jpa-=n;
			}
		},
		jp_damage:{
			trigger:{source:'damageAfter'},
			forced:true,
			popup:false,
			content:function(){
				player.jp+=Math.floor(trigger.num*30*(1.5-get.difficulty()/6));
				player.jpa+=Math.floor(trigger.num*30*(1.5-get.difficulty()/6));
				game.log(get.translation(game.me)+'获得了'+Math.floor(trigger.num*30*(1.5-get.difficulty()/6))+'点技能点数');
			}
		},
		jp_kill:{
			trigger:{source:'dieAfter'},
			forced:true,
			popup:false,
			content:function(){
				player.jp+=Math.floor(100*(1.5-get.difficulty()/6));
				player.jpa+=Math.floor(100*(1.5-get.difficulty()/6));
				game.log(get.translation(game.me)+'获得了'+Math.floor(100*(1.5-get.difficulty()/6))+'点技能点数');
				game.me.draw(4-get.difficulty());
			}
		},
		jp_use:{
			trigger:{player:'useCardAfter'},
			forced:true,
			popup:false,
			content:function(){
				player.jp+=Math.floor(10*(1.5-get.difficulty()/6));
				player.jpa+=Math.floor(10*(1.5-get.difficulty()/6));
				game.log(get.translation(game.me)+'获得了'+Math.floor(10*(1.5-get.difficulty()/6))+'点技能点数');
			}
		},
		jp_skill:{
			trigger:{player:'useSkillAfter'},
			forced:true,
			popup:false,
			content:function(){
				player.jp+=Math.floor(20*(1.5-get.difficulty()/6));
				player.jpa+=Math.floor(20*(1.5-get.difficulty()/6));
				game.log(get.translation(game.me)+'获得了'+Math.floor(20*(1.5-get.difficulty()/6))+'点技能点数');
			}
		},
		dushi:{
			trigger:{source:'damageBefore'},
			forced:true,
			priority:10,
			content:function(){
				trigger.untrigger();
				trigger.finish();
				trigger.player.loseHp(trigger.num);
			}
		},
		yizhong:{
			trigger:{target:'shaBefore'},
			forced:true,
			filter:function(event,player){
				if(player.get('e','2')) return false;
				return (event.card.name=='sha'&&get.color(event.card)=='black')
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(target.get('e','2')) return;
						if(card.name=='sha'&&get.color(card)=='black') return 0;
					}
				}
			}
		},
	},
	translate:{
		fan:'敌',
		zhu:'将',
		zhong:'友',
		nei:'中',
		initiative1_config:'主动技能一',
		initiative2_config:'主动技能二',
		trigger1_config:'被动技能一',
		trigger2_config:'被动技能二',
		lock1_config:'锁定技能一',
		lock2_config:'锁定技能二',
		limited_config:'限定技',
		infinity_jp:'技能',
		czt_linghubing:'令狐士兵',
		czt_linghubing2:'令狐士兵',
		czt_linghujiang:'令狐军官',
		czt_duanmu:'端木老人',
		czt_mindafu:'闵大夫',
		czt_beigongdafu:'北宫大夫',
		czt_she:'蛇',
		czt_zhizhu:'蜘蛛',
		czt_she2:'蛇',
		czt_zhizhu2:'蜘蛛',
		czt_jiaojisi:'蛟祭司',
		czt_guchongji:'鼓虫机',
		czt_mujiagui:'木甲龟',
		czt_mujiafangzhen:'木甲方阵',
		dushi:'毒噬',
		yizhong:'毅重',
		yizhong_info:'锁定技，当你没有防具时，黑色的杀对你无效',
		dushi_info:'锁定技，你即将造成的伤害均视为体力流失',
		czt_jinbing:'晋军士兵',
		czt_jinbing2:'晋军士兵',
		czt_linghuguojun:'令狐国君',
	},
	character:{
		czt_linghubing:['male','wei',2,[]],
		czt_linghubing2:['male','wei',3,[]],
		czt_linghujiang:['male','wei',5,[]],
		czt_duanmu:['male','wei',0,[]],
		czt_she:['male','qun',2,['dushi']],
		czt_zhizhu:['male','qun',1,['dushi']],
		czt_she2:['male','qun',3,['dushi']],
		czt_zhizhu2:['male','qun',2,['dushi']],
		czt_jiaojisi:['male','wei',0,[]],
		czt_mindafu:['male','wei',0,[]],
		czt_beigongdafu:['male','wei',0,[]],
		czt_linghuguojun:['male','wei',0,[]],
		czt_guchongji:['male','shu',3,['wushuang']],
		czt_mujiafangzhen:['male','shu',3,['luanji','shensu']],
		czt_mujiagui:['male','shu',4,['yizhong']],
		czt_jinbing:['male','shu',3,['mashu']],
		czt_jinbing2:['male','shu',4,['mengjin']],
	},
	config:{
		difficulty:true,
		player_number:false,
		double_character:false,
		change_choice:false,
		free_choose:false,
		change_identity:false,
		swap:false,
		save_progress:true,
		ai_identity:false,
		revive:false,
	},
	progress:[
		'令狐国',
		['swd_cheyun','怎搞的，最近老做这梦…… '],
		['swd_cheyun','而且每次都会梦到大哥哥…… '],
		['swd_cheyun','你说这到底是怎么回事呢，云狐…… '],
		['czt_linghujiang','喂，车家的小娃儿！ '],
		['swd_cheyun','啊，是你们……？  '],
		['swd_cheyun','国君他……是不是答应我的请求了？'],
		['czt_linghujiang','国君是答应了……  '],
		['czt_linghujiang','你可要搞清楚，车氏小娃！'],
		['czt_linghujiang','若非晋人就快打来了，不然没人愿意让你使用这怪东西！ '],
		['swd_cheyun','好过分！人家这才不是什么怪东西！ '],
		['swd_cheyun','这是爷爷的木甲术，是爷爷木甲术制造出来的云狐！ '],
		['swd_cheyun','光一只云狐，就可以抵得过好几乘的兵车！ '],
		['czt_linghujiang','哦，是吗？'],
		['czt_linghujiang','别忘了～当初就是因为你祖父研究这些玩意儿，你们车氏全族才会被抄灭！'],
		['swd_cheyun','哼～才不是呢！'],
		['swd_cheyun','是北宫大夫陷害爷爷，说他研究什么不祥的东西，国君才下令爷爷自戕的！'],
		['czt_linghujiang','哼，劝你最好少说北宫大夫的不是！'],
		['swd_cheyun','可是明明就是——'],
		['czt_linghujiang','好啦，没空同你啰唆了！'],
		['czt_linghujiang','你不是还向国君请求可以出入你们车氏昔日故宅的铜令符？'],
		['得到铜令符',''],
		['czt_linghujiang','啧～怎么？你那是什么表情？'],
		['swd_cheyun','哼～我一定会好好证明给北宫大夫和你们看看的！'],
		['czt_linghujiang','随你便～根本就没人期待你能做些什么！ '],
		['czt_linghujiang','我们得去忙防御工事了，你好自为之吧～～'],
		['czt_linghubing','奉劝你，小娃儿～'],
		['czt_linghubing','可别以为上战场打仗，是你平日的家家酒儿戏！'],
		['swd_cheyun','真讨厌，神气什么嘛～～可恶！'],
		['swd_cheyun','等著瞧，我一定会让你们全都刮目相看的！'],
		['swd_cheyun','云狐～我等一下就去替你拿铜令符，带你回我们的老家去了！'],
		['swd_cheyun','那里有爷爷的木甲工房，可以把你变得更厉害！'],
		['swd_cheyun','对了……我得先回茅屋去告诉端木爷这事。'],
		1,
		'端木茅屋',
		['swd_cheyun','端木爷～端木爷～我回来啦！'],
		['czt_duanmu','咳……咳咳…… '],
		['czt_duanmu','咳……咳咳…… '],
		['czt_duanmu','你这些日子，究竟是跑到哪去了？'],
		['swd_cheyun','嘻～端木爷，您猜猜看嘛！'],
		['czt_duanmu','唉，不是端木爷爱叨念你……'],
		['czt_duanmu','如今端木爷人病了，目力脚力都差了…… '],
		['czt_duanmu','再没法子像过去那样，成天四处去找你……'],
		['swd_cheyun','端木爷，您就猜一下下嘛～'],
		['czt_duanmu','唉……猜个什么猜呀？'],
		['czt_duanmu','一定又是去找你那个云狐的木料…… '],
		['czt_duanmu','唉，早告诉过你好几次，不要老是这样…… '],
		['czt_duanmu','只是去找木料就罢了，还穿什么新衣裳？'],
		['swd_cheyun','嘻，所以说端木爷完全猜错了～～猜错了！ '],
		['swd_cheyun','嘻，端木爷～人家是去都城，找国君！ '],
		['czt_duanmu','去都城，找国君？'],
		['czt_duanmu','不要以为端木爷病昏了，你就可以随便编个藉口来蒙骗端木爷……'],
		['swd_cheyun','哼，人家才没骗您呢！'],
		['swd_cheyun','端木爷，您看这个——— '],
		['czt_duanmu','这……又是什么？'],
		['swd_cheyun','是国君给我的铜令符！'],
		['swd_cheyun','我现在可以自由返回我们老家那里去了哦～嘻！  '],
		['czt_duanmu','国君他……竟会答应你的要求？'],
		['swd_cheyun','对呀～所以您瞧，人家的本事够厉害吧！'],
		['czt_duanmu','呃……这实在令人难以置信啊！'],
		['swd_cheyun','端木爷有没有大大吃了一惊呢？ '],
		['swd_cheyun','从今天起，人家就可以光明正大去爷爷的木甲工房哦！'],
		['swd_cheyun','也就是爷爷竹简上，提到的那个地方……'],
		['czt_duanmu','唉，老实说，有时候端木爷真忍不住要怀疑……  '],
		['czt_duanmu','当初把老主人关于木甲术的那些竹简交给了你，是否是对的…… '],
		['swd_cheyun','端木爷怎么这么说呢？'],
		['swd_cheyun','谁叫端木爷自己没想到，人家能把爷爷他的云狐，真的成功做了出来？'],
		['swd_cheyun','端木爷应该替爷爷和人家高兴才对嘛～～ '],
		['czt_duanmu','唉……话是如此没错！'],
		['czt_duanmu','但你们车氏一族，当初就是因为研究木甲术才遭奸人陷害的啊……'],
		['czt_duanmu','全族只有你因年纪小，才勉强能用砍掉双脚的刖刑换过一死…… '],
		['swd_cheyun','可是，端木爷……那才不是木甲术的错啊！'],
		['swd_cheyun','爷爷他根本就是被北宫大夫故意陷害的！ '],
		['swd_cheyun','所以我一定要证明给国君他们看看——— '],
		['swd_cheyun','让他们都晓得，爷爷的木甲术才不是什么坏东西！'],
		['czt_duanmu','端木爷知道你的苦心，可是…… '],
		['czt_duanmu','你所不知道的，是人心的险恶……  '],
		['swd_cheyun','人心的险恶……？ '],
		['czt_duanmu','唉，算了……这并不是你这年纪所该知道的事情。'],
		['czt_duanmu','那接下来，你打算如何做？ '],
		['swd_cheyun','我要前去爷爷的木甲工房，找一份他曾提到过的木甲要术。'],
		['swd_cheyun','因为它可以提升云狐的力量！ '],
		['czt_duanmu','………… '],
		['swd_cheyun','因为现在有坏人要来攻打我们的都城，'],
		['swd_cheyun','所以我想到，如果我能带著云狐，去帮大家一起对抗他们…… '],
		['swd_cheyun','只要有了功劳，国君一定会愿意恢复我们车氏的名誉！'],
		['czt_duanmu','唉，傻孩子…… '],
		['czt_duanmu','人世间的事，岂有你想的那般简单呀？ '],
		['swd_cheyun','这有什么不对的嘛！ '],
		['swd_cheyun','如果我们国家被人家给灭了，不就真的永远也没机会替爷爷他平复了？'],
		['czt_duanmu','傻孩子……晋国是当今全天下的霸主呀！'],
		['czt_duanmu','连凶神恶煞、天下无敌的楚国人，都才刚刚被他们打败……你这不过是去送死罢了！'],
		['swd_cheyun','哼，人家才不管啦～ '],
		['swd_cheyun','人家好不容易才让国君答应，说可以一起帮忙抵抗敌人……'],
		['swd_cheyun','打死我，也绝不要错过这样难得宝贵的机会！'],
		['czt_duanmu','但、但是…… '],
		['swd_cheyun','反正不管怎么样，人家一定都要去的！'],
		['swd_cheyun','就算端木爷再怎么反对也一样！ '],
		['czt_duanmu','慢、慢著…… '],
		['czt_duanmu','你要去哪里？ '],
		['swd_cheyun','当然是想办法去爷爷的木甲工房呀！ '],
		['swd_cheyun','人家晋国的军队，再过几天后就要打来了'],
		['swd_cheyun','人家要及时找到爷爷说的那个木甲要术，让云狐变得更厉害才行！'],
		['czt_duanmu','等一下啊…… '],
		['czt_duanmu','万一……万一你根本找不到那东西呢？ '],
		['swd_cheyun','那简单嘛～就直接上战场去帮大家的忙！'],
		['swd_cheyun','反正人家的云狐才没有那么弱！ '],
		['swd_cheyun','端木爷您就请别担心啦～ '],
		['czt_duanmu','老主人，这下该如何是好，到底该如何是好呢……'],
		'竹林',
		['swd_cheyun','原来要去爷爷安设在地底下的木甲工房……'],
		['swd_cheyun','还需要一块被偷埋在这个断崖树下的玉玦当引子，才进得去啊…… '],
		['swd_cheyun','端木爷也真是的，那么多年都不告诉我这件事……直到刚刚才告诉我！ '],
		['swd_cheyun','爷爷也好过分，在竹简上连提都没提——真是差一点害我白忙一场了！'],
		['swd_cheyun','我得赶快把它给找到才成！ '],
		['端木茅屋'],
		['swd_cheyun','端木爷，我找到了您埋藏的玉玦了！ '],
		['swd_cheyun','这玉玦该怎么用呢？ '],
		['czt_duanmu','嗯，端木爷想一想…… '],
		['czt_duanmu','你先去车氏故宅，找到一道通往地下的青铜密门'],
		['czt_duanmu','里面便是老主人昔日的木甲工房了。 '],
		['swd_cheyun','哼～不过端木爷竟然事到临头，才告诉人家有这块玉玦，真是过分！'],
		['czt_duanmu','傻孩子……端木爷这是为了你好啊！'],
		['czt_duanmu','毕竟端木爷不希望你步入了老主人的后尘…… '],
		['swd_cheyun','难怪我有几次半夜偷偷翻墙溜进那里，想去找爷爷的木甲工房， '],
		['swd_cheyun','结果却什么也没有发现！ '],
		['czt_duanmu','唉……若不是端木爷担心你战场上会遇到危险， '],
		['czt_duanmu','不然端木爷可真的是不愿告诉你的…… '],
		['swd_cheyun','可是……万一端木爷您都不说， '],
		['swd_cheyun','那爷爷昔日的心血，我不就永远都不知道了吗？ '],
		['czt_duanmu','唉……当初若不是端木爷去把这玉玦藏了起来，'],
		['czt_duanmu','国君和北宫氏早就派人去地下，烧光老主人的心血了！ '],
		['czt_duanmu','如今又何来什么木甲工房，还会在那里呢？ '],
		['swd_cheyun','嗯……我懂了，谢谢端木爷！ '],
		['czt_duanmu','说到这…… '],
		['czt_duanmu','端木爷记得，老主人在工房之内似乎设有一些木甲守卫…… '],
		['czt_duanmu','听老主人说，那是一些他特意装上青铜外壳的木甲兽，用来防止外人擅入，'],
		['czt_duanmu','你进去以后，可得千万小心不要触动了它们， '],
		['czt_duanmu','否则，它们或许会把你当作外人来防的！ '],
		['swd_cheyun','嗯，我知道了！ '],
		['czt_duanmu','好吧……那你快去快回吧！ '],
		['czt_duanmu','自己多小心，可别让端木爷挂心……'],
		['swd_cheyun','我会非常小心的，请端木爷您放心！ '],
		['swd_cheyun','那人家出发了哦～ '],
		'车氏故宅',
		['车芸来到故宅前，遇到两名守卫拦阻'],
		['czt_linghubing','木脚的小娃，你又跑来想做什么啊？'],
		['czt_linghubing2','走开~快走开！'],
		['swd_cheyun','等一下，你们看看这是什么？'],
		['czt_linghubing','铜令符…………？'],
		['czt_linghubing','小鬼，你是从哪里拣来的？'],
		['czt_linghubing2','哼~我看搞不好还是偷来的'],
		['swd_cheyun','你们乱说什么啊？'],
		['swd_cheyun','这是我来都城，特地请国君给我的~'],
		['swd_cheyun','国君准许我可以进出我的老家了！'],
		['czt_linghubing','你说这是国君给你的铜令符？'],
		['czt_linghubing','哼~我们只听北宫大夫的话而已，这里是他的采邑了！'],
		['czt_linghubing2','国君他算哪根葱啊？'],
		['swd_cheyun','啊？'],
		['czt_linghubing','走开走开，臭娃儿！'],
		['czt_linghubing2','你再不走，我们就把你抓起来，直接交给北宫大夫发落！'],
		['czt_linghubing2','没错~到时可不止双脚而已，搞不好连你双手也都要被剁掉了！'],
		['swd_cheyun','可恶，你们————'],
		['swd_cheyun','哼，这真的是国君的令符，对吗？'],
		['czt_linghubing','没错啊！'],
		['czt_linghubing','不过我们不接受，你还是早些滚开吧！'],
		['swd_cheyun','太好了，我已经听到想听到的答案了！'],
		['czt_linghubing','答案…………？'],
		['车芸召唤出云狐'],
		['swd_cheyun','既然国君都准许我过去了————'],
		['swd_cheyun','所以把你们打跑，国君也不会责备…………对吧？'],
		['swd_cheyun','听话，乖云狐，'],
		['swd_cheyun','让他们知道爷爷木甲术的厉害！'],
		0,
		['战斗胜利，两名守卫逃跑'],
		['swd_cheyun','终于知道人家木甲术的厉害了吧'],
		['swd_cheyun','好了，终于可以安心去爷爷的木甲工房了！'],
		['swd_cheyun','我回来了……爷爷！ '],
		['swd_cheyun','真怀念以前小时候，大家都还在这里的日子…… '],
		['swd_cheyun','但是如今这里都荒废了，爷爷…… '],
		['swd_cheyun','不过，我一定会努力为您以及大家洗雪冤屈…… '],
		['swd_cheyun','至少也要让所有人都知道，爷爷您的木甲术绝不是什么坏的东西…… '],
		['swd_cheyun','所以爷爷您在九泉之下，请保佑我…… '],
		['swd_cheyun','请大家保佑我…… '],
		'木甲工房',
		['swd_cheyun','哗……… '],
		['swd_cheyun','这就是爷爷您的木甲工房吗……？'],
		['swd_cheyun','没想到竟然这么大！'],
		['swd_cheyun','真是不敢相信…… '],
		['swd_cheyun','爷爷，原来您比我想像中的还更了不起……'],
		['swd_cheyun','家要更努力了，绝对不能辜负了您…… '],
		['swd_cheyun','因为……我是您的孙女儿啊！ '],
		['石室'],
		['swd_cheyun','哗…… '],
		['swd_cheyun','这就是爷爷说的石室？ '],
		['swd_cheyun','真是了不起～ '],
		['swd_cheyun','不知爷爷当初是怎造出来的！ '],
		['swd_cheyun','哎呀？ '],
		['swd_cheyun','出口的石门竟然自己关了起来…… '],
		['swd_cheyun','这是怎么回事啊……这下子我不就出不去了？'],
		['swd_cheyun','对了……这应该也是一个爷爷他用来防止别人随便进来的设计吧？ '],
		['swd_cheyun','但现在却先把自己孙女儿第一个给困住了……这下该怎办才好呢？ '],
		['swd_cheyun','算了，怕它什么～ '],
		['swd_cheyun','我还是先去找到爷爷的木甲要术要紧！ '],
		['车芸扳动一个机关，木甲要术出现'],
		['swd_cheyun','哗……原来还有这样的机关呀？ '],
		['swd_cheyun','那个在铜瓮水面上翻来滚去的竹简，该不会就是爷爷他的木甲要术？ '],
		['swd_cheyun','哈哈～真没想到爷爷还弄出这么有趣的花样！ '],
		['swd_cheyun','我快过去看看吧！ '],
		['得到木甲要术'],
		['另一侧的石门打开'],
		['swd_cheyun','哗，这真的是爷爷的木甲要术竹简呢…… '],
		['swd_cheyun','收获真不少……真是太好了！ '],
		['swd_cheyun','不过话说回来，爷爷怎么那么糊涂呢，一点防备都没有…… '],
		['swd_cheyun','这么重要的东西，竟然人家随随便便转一下铜榫，就自己浮了出来！ '],
		['swd_cheyun','真是的～～万一被坏人拿走了怎么办呢？ '],
		['swd_cheyun','好！以后～我绝不可以像爷爷这么糊涂！ '],
		['木甲工房'],
		['车芸走出石门，一个木甲守卫机关出现'],
		['swd_cheyun','这是什么东西呀……？ '],
		['swd_cheyun','有包上青铜外壳的木甲兽……难不成这个是…… '],
		['swd_cheyun','端木爷说的，爷爷以前制造出来负责看守这里的青铜木甲守卫？'],
		['swd_cheyun','原来这一边的通道，是有木甲守卫的呀？ '],
		['swd_cheyun','我刚刚可错怪爷爷了……'],
		['swd_cheyun','哎呀……？ '],
		['swd_cheyun','等一下……等一下！ '],
		['swd_cheyun','我是你们主人的孙女儿啊，并不是什么坏人呀！ '],
		['swd_cheyun','糟糕，它好像完全听不懂呀……怎么办？'],
		2,
		3,
		4,
		5,
		6,
		['车氏故宅'],
		['swd_cheyun','爷爷，爹娘…… '],
		['swd_cheyun','谢谢你们保佑我能平安取得了木甲要术…… '],
		['swd_cheyun','我和云狐一定会好好努力，建立功劳，'],
		['swd_cheyun','让所有人都知道，爷爷您研究的木甲术是真的能保护我们国家的！ '],
		['swd_cheyun','而绝不是大家误会的什么不好的坏东西…… '],
		['swd_cheyun','我走了……爷爷，爹娘！'],
		['swd_cheyun','请你们继续保佑我…… '],
		['swd_cheyun','保佑我能顺利…… '],
		['端木茅屋'],
		['swd_cheyun','端木爷，我回来了～ '],
		['czt_duanmu','你终于回来了？'],
		['czt_duanmu','怎去了这么久，让端木爷好担心啊！ '],
		['swd_cheyun','人家不小心启动木甲守卫了嘛，所以多花了一些时间！ '],
		['czt_duanmu','啊，那你没受伤吧？ '],
		['swd_cheyun','哼，人家才没那么没用呢！ '],
		['swd_cheyun','不过爷爷的木甲工房，真的是好了不起呢！ '],
		['czt_duanmu','那当然了…… '],
		['swd_cheyun','但是为什么那些木甲守卫，每一个看起来都那么简陋呀？ '],
		['czt_duanmu','简陋？'],
		['swd_cheyun','是呀～跟云狐比起来，实在差太多了嘛！ '],
		['swd_cheyun','等一下，我来想一想看有哪些…… '],
		['swd_cheyun','嗯，有一些奇怪的铜乌龟…… '],
		['swd_cheyun','还有一些吊著线，会飘来荡去的螳螂方块！ '],
		['czt_duanmu','唉……那些都是老主人他最早制作的木甲兽啊！ '],
		['czt_duanmu','所以比不上云狐，是当然的！ '],
		['swd_cheyun','最早制作的木甲兽？ '],
		['czt_duanmu','老主人为人念旧，所以也不忍抛弃它们，'],
		['czt_duanmu','于是就给它们套上了青铜外壳，担任那边的守卫。 '],
		['swd_cheyun','喔，原来是这样啊？ '],
		['czt_duanmu','是啊，不然能构想出云狐的老主人，岂会只有如此的造诣？ '],
		['swd_cheyun','对了，端木爷～ '],
		['swd_cheyun','除了乌龟和螳螂，人家还看见有用两脚站立的木甲兽呢！'],
		['swd_cheyun','不过也很简陋就是了！ '],
		['czt_duanmu','嗯，好像曾有听老主人提起过他最大的心愿…… '],
		['czt_duanmu','好像就是希望自己木甲术的造诣，哪一日能到达传说中木甲术之祖偃师的境界哪！'],
		['swd_cheyun','爷爷的竹简内有提到这个人，但只有名字而已…… '],
		['swd_cheyun','他是怎样的一个人啊？ '],
		['czt_duanmu','听说在百年之前，偃师用木甲术所制作之木人'],
		['czt_duanmu','便能栩栩如生，轻巧如云…… '],
		['czt_duanmu','老主人便是年轻时代阅读过相关文献，才开始对木甲术有兴趣， '],
		['czt_duanmu','他便一心以此为目标，希望自己能逐步接近偃师造诣…… '],
		['czt_duanmu','可惜云狐才刚构思完没多久，老主人便被国君敕令自裁…… '],
		['czt_duanmu','所以，老主人便永远再无法实现他的心愿……  '],
		['swd_cheyun','（原来爷爷最大的心愿，是要用木甲术制造出栩栩如生的木人啊？） '],
		['swd_cheyun','（说不定哪天，我可以替爷爷实现心愿！）'],
		['czt_duanmu','对了，晋人何时会攻打我们的都城呢？'],
		['swd_cheyun','可以这几日就到了吧'],
		['swd_cheyun','不过不管他们什么时候来，人家都不怕了~'],
		['czt_duanmu','别轻敌啊，对方可是天下最强的晋国呀！'],
		['czt_duanmu','你若有什么意外，端木爷可是无端到黄泉下面对你的老主人呀！'],
		['swd_cheyun','端木爷，这个你就别担心~~'],
		['swd_cheyun','请您留在这是，等着听我的好消息就行了。'],
		'令狐国都城',
		['czt_linghujiang','刚刚接获通报，晋军已经突破了东郭外的防线'],
		['czt_linghujiang','你们立刻去那里守城，明白吗？'],
		['众士兵','是！'],
		['czt_linghubing2','禀告大人，西北角晋人的攻势十分猛烈！情势吃紧！'],
		['czt_linghujiang','你说什么？'],
		['czt_linghubing2','肯求大人，能立刻增援人手！'],
		['czt_linghujiang','可恨的晋狗，如此嚣张四处灭人社稷…………'],
		['czt_linghujiang','你们全部改去西郭北角！'],
		['众士兵','是！'],
		['czt_linghujiang','好的，去吧…………'],
		['swd_cheyun','等一下————'],
		['swd_cheyun','人家特地带着云狐，要求来帮忙的呀！'],
		['swd_cheyun','可是你们为什么从刚才到现在，一直都不差人家一起去呢？'],
		['czt_linghujiang','差你去…………？'],
		['czt_linghujiang','你们几个，快去西北角，不得延耽！'],
		['czt_linghujiang','莫让晋狗他们得逞，攻破都城！'],
		['众士兵','是！'],
		['swd_cheyun','………… '],
		['czt_linghujiang','车氏小娃，你你到底烦不烦人啊？'],
		['swd_cheyun','云狐明明可以帮大家很多忙的！'],
		['czt_linghujiang','你少啰嗦！'],
		['czt_linghujiang','北宫大人已经吩咐，不得让你有机会去战场！'],
		['swd_cheyun','你说什么？'],
		['czt_linghujiang','北宫大人早已交代下来………… '],
		['czt_linghujiang','你们车氏那套妖诡之术，会得罪上天！'],
		['czt_linghujiang','届时将会给社稷，带来更大之厄运！ '],
		['swd_cheyun','原来你们一开始，就没打算让我…………'],
		['czt_linghujiang','哼！你明白了就好！'],
		['czt_linghujiang','奉劝你安分点，以免连累身边其他人！'],
		['令狐军官离开'],

		['swd_cheyun','真可恶，福气什么嘛！'],
		['swd_cheyun','这下子我们该怎么办呢，云狐？'],
		['swd_cheyun','好不容易才让你变得稍微强了一些呢…………'],
		['swd_cheyun','到底要做什么才好呢？'],
		['swd_cheyun','还是去别处找找有什么能帮忙的，'],
		['swd_cheyun','我就不相信，真的没有需要我的地方！'],

		['swd_cheyun','咦，那不是北宫大夫吗？'],
		['swd_cheyun','哼！在人家背后偷偷搞鬼，'],
		['swd_cheyun','故意不让人家有机会让人家建立功劳'],
		['swd_cheyun','现在又在这儿，跟别人吵些什么？'],
		['swd_cheyun','好，我来偷听一下~~'],
		['czt_mindafu','北宫大人，您这样的说法，下官实在难以接受啊！'],
		['czt_mindafu','如今都城将被晋人所攻破，为何您还不愿接受在下的建议呢？'],
		['czt_beigongdafu','闵大夫，请您弄明白些！'],
		['czt_beigongdafu','国君地位尊贵，身负社稷之重，'],
		['czt_beigongdafu','岂可让他如你建议这般，轻言犯险？'],
		['czt_mindafu','但是北宫大人，世子方才不幸已经阵亡于战场上！'],
		['czt_mindafu','如今若国君也遭难，那我令狐国社稷可真要从此断绝宗祀、永远灭亡了！'],
		['czt_beigongdafu','闵大夫，邦国之事自有本卿负责作主，请您勿再多言！'],
		['czt_beigongdafu','请您立即把出城地道，全掩盖起来！'],
		['czt_beigongdafu','若您那些地道真能让国君出逃出城，也能让晋军攻进来！'],
		['czt_beigongdafu','半个时辰之后，本卿将再派人来看，'],
		['czt_beigongdafu','到时候，您最好莫让本卿发现它们还在那里！'],
		['czt_mindafu','北宫大人，您难道真不知道轻重缓急？'],
		['czt_mindafu','万一国君他被晋人俘虏了———— '],
		['czt_beigongdafu','闵大夫，庙堂之事，自有我们北宫氏作主！'],
		['czt_beigongdafu','若您再多言，就请好自为之吧！'],
		['czt_mindafu','你————'],
		['czt_beigongdafu','抱歉，本卿不再多说了。'],
		['czt_beigongdafu','告辞！ '],

		['czt_beigongdafu','哎唷！'],
		['czt_beigongdafu','这可不是车氏的小娃吗？'],
		['czt_beigongdafu','竟敢趁着本卿前去晋国与太辰宫交涉，不在都城之际，'],
		['czt_beigongdafu','自己偷偷跑去见国君啊？'],
		['czt_beigongdafu','和那个老头一样，挺大胆子的嘛！'],

		['czt_mindafu','可恨啊…………'],
		['czt_mindafu','国之将亡，庙堂必有邪侫！'],
		['czt_mindafu','若我社稷真的亡了，就是亡在北宫氏你等邪侫之手！'],

		['swd_cheyun','请问一下…………'],
		['czt_mindafu','咦，你是…………？'],
		['swd_cheyun','我是车大夫他的孙女儿，车芸。'],
		['czt_mindafu','你是，已故的车大夫他的孙女儿？'],
		['swd_cheyun','是的~~'],
		['czt_mindafu','我想起来了！'],
		['czt_mindafu','听说，车氏有个忠心的老家臣，散心积蓄贿赂北宫大夫………… '],
		['czt_mindafu','才终于勉强挽回了车氏孤女的性命。 '],
		['czt_mindafu','想来那位车氏孤女，就是你吗？'],
		['czt_mindafu','哈哈，真没想到，如今已经长这么大了！'],
		['czt_mindafu','不过听说你们一老一少，不都一起避居于昔日采邑附近的山林间吗？'],
		['swd_cheyun','是啊，但是听说有坏人要攻打我们的国家，'],
		['swd_cheyun','所以我才想到，该带着爷爷他的云狐来都城，帮大家一同抵抗。'],
		['swd_cheyun','云狐…………？'],
		['swd_cheyun','是的，那是爷爷当初想出的木甲兵器，'],
		['swd_cheyun','爷爷生前已经构想得差不多了，我就替爷爷，把它给做了出来。'],
		['czt_mindafu','我想起来了，对了，是木甲术没错！'],
		['czt_mindafu','我听你爷爷提起过，但从未亲眼看过。'],
		['swd_cheyun','那我让您瞧瞧看~~'],
		['车芸召唤出云狐'],
		['czt_mindafu','这是…………'],
		['czt_mindafu','了不起，原来这就是车大夫所说的木甲兵器吗？'],
		['czt_mindafu','真的实在太惊人，太不可思议了！'],
		['czt_mindafu','没想到车大夫所说的都是真的！'],
		['swd_cheyun','爷爷说过，他的云狐，就算好几乘兵车，也不是它的对手'],
		['swd_cheyun','它如果跑起来，连兵车也追不上呢！'],
		['czt_mindafu','等等…………你既有如此厉害的兵器，'],
		['czt_mindafu','为何没帮大家一起抵御外敌？'],
		['swd_cheyun','都是北宫大夫呀！ '],
		['swd_cheyun','他故意不让人家有机会帮忙的！ '],
		['czt_mindafu','北宫大夫？'],
		['czt_mindafu','唉…………又是北宫大夫那厮！'],
		['czt_mindafu','其实我刚才也是和他在争辩，'],
		['czt_mindafu','对了，你来得正好，'],
		['czt_mindafu','你愿意帮我一个大忙吗？'],
		['swd_cheyun','当然好啊！'],
		['swd_cheyun','我本来就是希望能帮得上忙的！'],
		['czt_mindafu','那太好了'],
		['czt_mindafu','那请你到城墙边的木台下，那里有些地道的出入口。'],
		['czt_mindafu','我会在那里告诉你该怎么做'],

		['swd_cheyun','闵大夫，刚才你说要我帮什么忙？'],
		['czt_mindafu','要麻烦你的，便是希望你下去这出城地道，'],
		['czt_mindafu','探一探是否有危险。'],
		['swd_cheyun','出城地道？'],
		['czt_mindafu','是的，你莫小看些事！'],
		['czt_mindafu','敌人攻势猛烈，都城旦夕不保'],
		['czt_mindafu','我担心国君被俘，社稷将因此而绝祀………… '],
		['czt_mindafu','若能由此顺利逃出，或可去出奔秦国或楚国，另谋他途。'],
		['swd_cheyun','听起来，好像我们快要输了吗？'],
		['czt_mindafu','嗯，这也是没办法的事，令人痛心！'],
		['czt_mindafu','晋人最近以各种奇奇怪怪的名义，四处征伐各诸侯国…………'],
		['czt_mindafu','即使强大如荆楚，也都不是他们的对手。'],
		['czt_mindafu','而天子和昔日霸主齐国，更不敢站出来主持公道，个个视而不见！'],
		['swd_cheyun','这我不是很懂………… '],
		['czt_mindafu','不打紧，'],
		['czt_mindafu','对了，我想麻烦你下去的这个地道，'],
		['czt_mindafu','其实它是昔日都城一次内乱，当时所发掘的…………'],
		['czt_mindafu','若我没记错，它可直通至城郊半里之外的山林地………… '],
		['swd_cheyun','这地道有这么远啊呀？'],
		['czt_mindafu','是的，但毕竟荒废一段时日了，不是是否仍然畅通。'],
		['czt_mindafu','说不定晋人也早发现了它…………所以需要有人前去探路。'],
		['czt_mindafu','必须确认安全无恙，都好说服国君由此避难'],
		['swd_cheyun','我明白了…………'],
		['swd_cheyun','可是既然这么重要，为什么没有早一点派人下去走一下呢？'],
		['czt_mindafu','唉…………'],
		['czt_mindafu','你刚才看到的争执就是为了些事！'],
		['czt_mindafu','北宫大夫以防御吃紧为由，把之前我派去探路的士兵，都背地里调走！'],
		['czt_mindafu','他还要我在半个时辰之内，掩盖掉这个地道…………'],
		['czt_mindafu','这地道可是国君最后逃生希望所系啊！ '],
		['swd_cheyun','这样一说，我好像大概懂了………… '],
		['swd_cheyun','我必须赶快替国君确认一下，这地道到底安不安全，对不对？ '],
		['swd_cheyun','是的'],
		['swd_cheyun','可是如果我在半路发现了敌人，该怎么办？'],
		['swd_cheyun','那你立刻返回都城内，'],
		['swd_cheyun','通知我将入口封掩起来！'],
		['swd_cheyun','嗯，没问题，云狐它跑得很快的。'],

		'地道',
		7,
		8,
		9,
		['swd_cheyun','等一等…………'],
		['swd_cheyun','好像听到有什么声音…………？'],
		['swd_cheyun','该不会是…………'],

		['swd_cheyun','啊！'],
		['czt_jinbing','果然有人在这地道内！'],
		['czt_jinbing2','看来是想从这里逃出围城的小丫头！'],
		['czt_jinbing','得把她捉起来才行！'],
		['swd_cheyun','可恶，原来这地道早被发现了'],
		10,

		['swd_cheyun','不好，这条地道已经被人发现了，该怎么办？'],
		['swd_cheyun','得赶紧回去通知闵大夫，快把地道给封起来！'],

		['swd_cheyun','啊，这是怎么回事？'],
		['czt_mindafu','原来是车大夫的孙女………… '],
		['czt_mindafu','来得正好，前方情况怎样？  '],
		['swd_cheyun','他们已经发现了这条地道！'],
		['swd_cheyun','我就是赶回来，要告诉您此事的！'],
		['czt_mindafu','可恨，上天难不成真要亡我社稷啊！'],
		['swd_cheyun','我想，我们还是赶快回都城去'],
		['czt_mindafu',' 都城回不去了…………'],
		['swd_cheyun','我们的都城被攻陷了？'],
		['czt_mindafu','是的…………'],
		['czt_mindafu','所以我只好带着国君，来此地避难………… '],
		['swd_cheyun','可是我们都城，怎么会那么容易被攻破啊？'],
		['czt_mindafu','因为这次晋国竟然派了太辰宫的九龙子祭官来参战………… '],
		['czt_mindafu','他们懂得许多奇异的妖术…………'],
		['czt_mindafu','我们士兵一触碰便全倒在地，无法再战！'],
		['czt_mindafu','于是四方城门，一下子都沦陷了…………'],
		['swd_cheyun','那…………北宫大夫他呢？'],
		['czt_mindafu','北宫那个叛徒，他投降晋人去了！'],
		['swd_cheyun','什么————'],
		['czt_mindafu','这块战争之前，他便利用出使晋国的机会，和他们有所勾结'],
		['czt_mindafu','他们早就协议好，要里应外合，出卖国君！'],
		['czt_mindafu','所以他才多方阻挠我，不让国君及早出奔他国！'],
		['swd_cheyun','北宫大夫他怎么会这么过分！'],
		['swd_cheyun','国君不是一直对他非常信任吗？'],
		['czt_linghuguojun','这一切都是寡人的错…………'],
		['czt_linghuguojun','都怪寡人信任些人，才害得社稷倾覆…………'],
		['czt_linghuguojun','寡人惭愧…………'],
		['czt_mindafu','国君…………'],
		['czt_mindafu','国君…………其实我们社稷的存亡，仍是有希望的！'],
		['czt_mindafu','如今秦、晋楚交恶，二国对晋国都十分不满。'],
		['czt_mindafu','只要您能顺利逃出此地，相信社稷仍有复兴之望！'],
		['czt_linghuguojun','追兵马上会发现这里的，此地根本躲不久啊…………'],
		['czt_linghuguojun','何况他们也不见得愿意帮助寡人………… '],
		['czt_mindafu','对了，车大夫的孙女儿'],
		['czt_mindafu','可否麻烦你，替国君开个道吗？'],
		['czt_mindafu','只要您能顺利逃出此地，相信社稷仍有复兴之望！'],
		['swd_cheyun','好，我这就去替国君开路！'],
		['czt_mindafu','嗯，那一切全看你了！'],
		['czt_mindafu','国君惊魂未定，我稍后便会带着国君慢慢前进。'],
		['czt_mindafu','你尽管向前走吧！'],
		['目前只写到这里，更多内容敬请期待^_^']
	],
	background:[
		['linghu',33],
		['daditu1',1],
		['duanmu',75],
		['bamboo',6],
		['duanmu',29],
		['guzhai2',33],
		['guzhai',7],
		['gongfang',8],
		['shishi',25],
		['gongfang',16],
		['guzhai',9],
		['duanmu',44],
		['linghu2',31],
		['linghu3',6],
		['linghu4',24],
		['linghu5',5],
		['linghu6',3],
		['linghu7',40],
		['linghu8',36],
		['didao',7],
		['didao2',6],
		['didao',2],
		['didao3',70],
	],
	battle:[
		{
			name:'令狐守卫',
			enemy:['czt_linghubing','czt_linghubing2'],
			intro:'敌人：令狐守卫*2',
		},
		{
			name:'毒蛇蜘蛛',
			enemy:['czt_she','czt_zhizhu'],
			intro:'敌人：毒蛇*1；蜘蛛*1',
		},
		{
			name:'鼓虫机',
			intro:'敌人：鼓虫机*1',
			enemy:['czt_guchongji'],
		},
		{
			name:'木甲方阵',
			enemy:['czt_mujiafangzhen'],
			intro:'敌人：木甲方阵*1',
		},
		{
			name:'木甲龟',
			intro:'敌人：木甲龟*1',
			enemy:['czt_mujiagui'],
		},
		{
			name:'木甲组合一',
			intro:'敌人：木甲方阵*1，鼓虫机*1',
			enemy:['czt_mujiafangzhen','czt_guchongji'],
		},
		{
			name:'木甲组合二',
			intro:'敌人：木甲方阵*1，木甲龟*1，鼓虫机*1',
			enemy:['czt_mujiafangzhen','czt_guchongji','czt_mujiagui'],
		},
		{
			name:'地道毒虫一',
			intro:'敌人：蛇*2，蜘蛛*2',
			enemy:['czt_she2','czt_she2','czt_zhizhu2','czt_zhizhu2'],
		},
		{
			name:'地道毒虫二',
			intro:'敌人：蛇*1，蜘蛛*3',
			enemy:['czt_she2','czt_zhizhu2','czt_zhizhu2','czt_zhizhu2','czt_zhizhu2'],
		},
		{
			name:'地道毒虫三',
			intro:'敌人：蛇*3，蜘蛛*3',
			enemy:['czt_she2','czt_she2','czt_she2','czt_zhizhu2','czt_zhizhu2','czt_zhizhu2'],
		},
		{
			name:'晋军士兵',
			intro:'敌人：晋军士兵*2',
			enemy:['czt_jinbing','czt_jinbing2'],
		},
	],
}
