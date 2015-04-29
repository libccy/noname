mode.infinity={
	game:{
		start:function(){
			var next=game.createEvent('load',false);
			next.content=function(){
				"step 0"
				game.import('identity');
				if(!lib.storage.version||lib.storage.version<0.833){
					localStorage.setItem(lib.config.mode,"{}");
				}
				"step 1"
				ui.create.arena();
				ui.auto.hide();
				ui.create.cards();
				game.finishCards();
				game.delay();
				"step 2"
				if(get.config('save_progress')&&lib.storage.saved) game.loadGame();
				else game.prepareGame();
				"step 3"
				event.trigger('gameStart');
				if(get.config('save_progress')&&lib.storage.saved){
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
		prepareGame:function(){
			var next=game.createEvent('prepareGame',false);
			next.content=function(){
				"step 0"
				_status.list=[];
				for(var i in lib.character){
					_status.list.push(i);
				}
				_status.list.remove('zuoci');
				_status.list.remove('caiwenji');
				var groupSort=function(name){
					if(lib.character[name][1]=='wei') return 0;
					if(lib.character[name][1]=='shu') return 1;
					if(lib.character[name][1]=='wu') return 2;
					if(lib.character[name][1]=='qun') return 3;
				}
				_status.list.sort(function(a,b){
					return groupSort(a)-groupSort(b);
				});
				var dialog=ui.create.dialog('选择角色',[_status.list,'character']);
				game.pause();
				for(var i=0;i<dialog.buttons.length;i++){
					dialog.buttons[i].classList.add('selectable');
				}
				event.custom.replace.button=function(button){
					_status.avatar=button.link;
					_status.list.remove(button.link);
					dialog.close();
					game.resume();
				}
				"step 1"
				ui.auto.show();
				ui.create.players(2);
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
				game.players[1].init(_status.list.randomGet());
				_status.list.remove(game.players[1].name);
				game.players[1].setIdentity('fan');
				game.players[1].identity='fan';
				game.players[1].identityShown=true;
			}
		},
		loadGame:function(){
			var next=game.createEvent('prepareGame',false);
			next.content=function(){
				"step 0"
				_status.list=[];
				for(var i in lib.character){
					_status.list.push(i);
				}
				_status.list.remove('zuoci');
				_status.list.remove('caiwenji');
				for(var i=0;i<lib.storage.players.length;i++){
					_status.list.remove(lib.storage.players[i].name);
					_status.list.remove(lib.storage.players[i].name2);
				}
				"step 1"
				ui.auto.show();
				ui.create.players(lib.storage.players.length);
				ui.create.me();
				ui.learned={};
				game.zhu=game.me;
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
		},
		clearProgress:function(){
			localStorage.setItem(lib.config.mode,"{}");
			lib.storage={};
		},
		onOver:function(){
			ui.create.control('继续',function(){
				while(ui.dialogs.length) ui.dialogs[0].close();
				while(ui.controls.length) ui.controls[0].close();
				_status.over=false;
				if(game.me.isDead()){
					game.me.revive(game.me.maxHp);
					game.me.draw(4);
				}
				else{
					var player=game.addPlayer();
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
				game.loop();
			});
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
			xiaoji:1200,
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
					if(_status.list.learned<10){
						_status.list=[];
						for(var i in lib.character){
							_status.list.push(i);
						}
						_status.list.remove('zuoci');
						_status.list.remove('caiwenji');
						_status.list.remove(game.me.name);
					}
					if(Math.random()<get.difficulty()/6&&game.players.length+game.dead.length>2&&get.population('fan')>0){
						game.removePlayer(this);
					}
					else if(game.players.length+game.dead.length>2&&this.identity!='fan'&&get.population('fan')>0){
						game.removePlayer(this);
					}
					else{
						var player=game.replacePlayer(this,_status.list.randomGet());
						player.draw(get.difficulty());
						player.identity='fan';
						player.identityShown=true;
						player.setIdentity();
						_status.list.remove(player.name);
					}
				}
				if(this.identity=='zhong'&&source==game.me) game.me.discard(game.me.get('h'));
				if(source&&this.identity=='fan'){
					if(source.identity=='fan') source.draw(get.difficulty());
					else source.draw(4-get.difficulty());
				}
				game.checkResult();
			}
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
				return game.players.length<8;
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
				else if(num<0&&Math.random()<1/get.difficulty()){
					player=game.addPlayer();
					player.init(_status.list.randomGet());
					_status.list.remove(player.name);
					if(Math.random()<0.5/get.difficulty()){
						player.init(player.name,_status.list.randomGet());
						_status.list.remove(player.name2);
					}
					player.setIdentity('zhong');
					player.identity='zhong';
					player.identityShown=true;
					player.draw(4-get.difficulty());
				}
				else if(Math.random()<0.2/(get.population('nei')+1)&&get.population('nei')<2){
					player=game.addPlayer();
					player.init(_status.list.randomGet());
					_status.list.remove(player.name);
					player.setIdentity('nei');
					player.identity='nei';
					player.identityShown=true;
					player.draw(2);
				}
			}
		},
		infinity_penalty:{
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			content:function(){
				var n=Math.floor(player.jpe*get.difficulty()/50);
				if(player.jp<n){
					game.me.popup('技能点数 -'+player.jp);
					game.log(get.translation(game.me)+'扣减了'+player.jp+'点技能点数');
					player.jpa-=player.jp;
					player.jp=0;
				}
				else{
					game.me.popup('技能点数 -'+n);
					game.log(get.translation(game.me)+'扣减了'+n+'点技能点数');
					player.jp-=n;
					player.jpa-=n;
				}
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
	}
}
