mode.infinity={
	game:{
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				if(lib.storage.choice==undefined) game.save('choice',18);
				if(lib.storage.zhu==undefined) game.save('zhu',true);
				if(lib.storage.only_zhu==undefined) game.save('only_zhu',true);
				ui.create.arena();
				ui.auto.hide();
				game.delay();
				"step 1"
				game.chooseCharacter();
				"step 2"
				event.trigger('gameStart');
				game.gameDraw(game.players[0]);
				_status.round=0;
				if(lib.storage.zhu){
					_status.currentSide=true;
					game.versusPhaseLoop((_status.currentSide==game.me.side)?game.friendZhu:game.enemyZhu);
				}
				else{
					game.versusPhaseLoop(game.players[Math.floor(Math.random()*game.players.length)]);
				}
			}
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.content=function(){
				"step 0"
				event.check=function(){
					this.dialog.style.top='40px';
					this.dialog.style.height='calc(100% - 80px)';
					this.dialog.classList.add('noslide');
					for(var i=0;i<this.dialog.buttons.length;i++) this.dialog.buttons[i].style.opacity=1;
					this.dialog.add('选项');
					this.dialog.add(ui.create.div('.placeholder'));
					this.dialog.versus_number=this.dialog.add(ui.create.switcher('versus_number',[1,2,3,4],lib.storage.number)).querySelector('.toggle');
					this.dialog.replace_number=this.dialog.add(ui.create.switcher('replace_number',[0,1,2,3,4,5,6],lib.storage.replace_number)).querySelector('.toggle');
					this.dialog.choice=this.dialog.add(ui.create.switcher('choice',[12,16,20,28,36,48,60,'∞'],lib.storage.choice)).querySelector('.toggle');
					this.dialog.add(ui.create.div('.placeholder'));
					this.dialog.add(ui.create.div('.placeholder'));
				};
				event.confirm=function(){
					var dialog=event.dialog;
					var num=lib.storage.number+lib.storage.replace_number;
					_status.friend.splice(num);
					_status.enemy.splice(num);
					dialog.close();
					if(ui.confirm) ui.confirm.close();
					game.resume();
				};
				ui.control.style.transition='all 0s';
				ui.control.style.top='calc(100% - 30px)';
				_status.friend=[];
				_status.enemy=[];
				_status.color=Math.random()<0.5;
				var i,list=[];
				for(i in lib.character){
					// if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidversus.contains(i)) continue;
					if(get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
					list.push(i);
				}
				list.sort(lib.sort.random);
				_status.list=list;
				var choice=(lib.storage.choice=='∞')?list.length:lib.storage.choice;
				event.dialog=ui.create.dialog('选择角色',[list.slice(0,choice),'character']);
				event.check();
				ui.create.cheat=function(){
					ui.cheat=ui.create.control('更换',function(){
						list.sort(lib.sort.random);
						event.dialog.close();
						_status.friend.length=0;
						_status.enemy.length=0;
						var choice=(lib.storage.choice=='∞')?list.length:lib.storage.choice;
						event.dialog=ui.create.dialog('选择角色',[list.slice(0,choice),'character']);
						event.check();
					});
				}
				if(!ui.cheat&&get.config('change_choice'))
				ui.create.cheat();
				event.custom.replace.button=function(button){
					if(button.classList.contains('glow')||button.classList.contains('selected')||ui.confirm) return;
					if(_status.color){
						button.classList.add('selected');
					}
					else{
						button.classList.add('glow');
					}
					_status.friend.push(button.link);
					var buttons=_status.event.dialog.buttons.slice(0);
					for(var i=0;i<buttons.length;i++){
						if(buttons[i].classList.contains('glow')||buttons[i].classList.contains('selected')){
							buttons.splice(i,1);i--;
						}
					}
				};
				event.custom.add.window=function(){
					var dialog=_status.event.dialog;
					if(_status.friend.length>=dialog.versus_number.link+dialog.replace_number.link){
						if(!ui.confirm) ui.confirm=ui.create.control('start',_status.event.confirm);
					}
					else if(ui.confirm){
						ui.confirm.close();
					}
					game.save('number',dialog.versus_number.link);
					game.save('replace_number',dialog.replace_number.link);
					game.save('choice',dialog.choice.link);
					var count,i;
					if(dialog.buttons.length>lib.storage.choice){
						count=dialog.buttons.length-lib.storage.choice;
						var removed=[];
						for(i=dialog.buttons.length-1;i>=0&&count>0;i--){
							if(dialog.buttons[i].classList.contains('target')==false&&
								dialog.buttons[i].classList.contains('glow')==false){
								dialog.buttons[i].remove();
								_status.list.remove(dialog.buttons[i].link);
								removed.push(dialog.buttons[i].link)
								dialog.buttons.splice(i,1);
								count--;
							}
						}
						for(i=0;i<removed.length;i++) _status.list.splice(lib.storage.choice,0,removed[i]);
					}
					else if(dialog.buttons.length<lib.storage.choice||lib.storage.choice=='∞'){
						var list=_status.list;
						var choice=(lib.storage.choice=='∞')?list.length:lib.storage.choice;
						var buttons=dialog.querySelector('.buttons');
						var button;
						for(i=dialog.buttons.length;i<choice;i++){
							button=ui.create.button(list[i],'character',buttons).animate('zoom')
							dialog.buttons.push(button);
							button.style.opacity=1;
						}
					}
				};
				game.pause();
				"step 1"
				for(var i in lib.character){
					// if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidversus.contains(i)) continue;
					if(get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
					if(_status.friend.contains(i)) continue;
					_status.enemy.push(i);
				}
				_status.friendCount=ui.create.system('我方阵亡：'+get.cnNumber(0),null,true);
				_status.enemyCount=ui.create.system('敌方阵亡：'+get.cnNumber(0),null,true);
				_status.friendDied=0;
				_status.enemyDied=0;

				ui.auto.show();
				if(ui.cheat){
					ui.cheat.close();
					delete ui.cheat;
				}
				ui.control.style.top='';
				ui.control.style.transition='';
				delete _status.list;
				var num=lib.storage.number;
				ui.create.players(num*2);
				ui.create.me();
				ui.create.cards();
				game.finishCards();
				var position,i;
				if(lib.storage.zhu&&lib.storage.only_zhu) position=Math.ceil(num/2)-1;
				else position=Math.floor(Math.random()*num)
				game.friend=[];
				game.enemy=[];
				for(i=0;i<position;i++){
					game.friend.push(game.players[i-position+num*2]);
				}
				for(i=position;i<num;i++){
					game.friend.push(game.players[i-position]);
				}
				for(i=0;i<num;i++){
					game.enemy.push(game.players[num-position+i]);
				}
				if(lib.storage.replace==false&&position==Math.ceil(num/2)-1){
					var dialog=ui.create.dialog('按顺序选择出场角色',[_status.friend,'character']);
					game.me.chooseButton(dialog,num,true);
				}
				for(i=0;i<num;i++){
					game.friend[i].side=_status.color;
					game.enemy[i].side=!_status.color;
					if(i==Math.ceil(num/2)-1&&lib.storage.zhu){
						game.friend[i].identity='zhu';
						game.friend[i].setIdentity(_status.color+'Zhu');
						game.friendZhu=game.friend[i];
						game.enemy[i].identity='zhu';
						game.enemy[i].setIdentity(!_status.color+'Zhu');
						game.enemyZhu=game.enemy[i];
					}
					else{
						game.friend[i].identity='zhong';
						game.friend[i].setIdentity(_status.color+'Zhong');
						game.enemy[i].identity='zhong';
						game.enemy[i].setIdentity(!_status.color+'Zhong');
					}
					// console.log(get.translation(_status.color+'Color'))
				}
				"step 2"
				var num=lib.storage.number;
				if(result&&result.buttons){
					var list=[];
					for(i=0;i<result.buttons.length;i++){
						list.push(result.buttons[i].link);
						_status.friend.remove(result.buttons[i].link);
					}
					_status.friend=list.concat(_status.friend);
				}
				for(i=0;i<num;i++){
					game.friend[i].init(_status.friend[i]);
					game.enemy[i].init(_status.enemy[i]);
					game.friend[i].node.identity.style.backgroundColor=get.translation(_status.color+'Color');
					game.enemy[i].node.identity.style.backgroundColor=get.translation(!_status.color+'Color');
				}
				_status.friend.splice(0,num);
				_status.enemy.splice(0,num);
			}
		},
		versusPhaseLoop:function(player){
			var next=game.createEvent('phaseLoop');
			next.player=player;
			next.content=function(){
				"step 0"
				player.classList.add('acted');
				player.phase();
				"step 1"
				if(lib.storage.zhu){
					_status.currentSide=!_status.currentSide;
					_status.round++;
					if(_status.round>=2*Math.max(game.friend.length,game.enemy.length)){
						_status.round=0;
						for(var i=0;i<game.players.length;i++){
							game.players[i].classList.remove('acted');
						}
					}
					var list=(_status.currentSide==game.me.side)?game.friend.slice(0):game.enemy.slice(0);
					for(var i=0;i<list.length;i++){
						if(list[i].classList.contains('acted')){
							list.splice(i,1);i--;
						}
					}
					if(list.length==0) event.redo();
					else if(list.length==1||game.me!=game.friendZhu||_status.currentSide!=game.me.side){
						list.sort(function(a,b){
							if(a.num('j')>b.num('j')) return 1;
							return a.hp-b.hp;
						})
						event.player=list[0];
						event.goto(0);
					}
					else{
						game.me.chooseTarget('选择要行动的角色',true,function(card,player,target){
							return (target.classList.contains('acted')==false&&target.side==game.me.side);
						})
					}
				}
				else{
					event.player=event.player.next;
					event.goto(0);
				}
				"step 2"
				event.player=result.targets[0];
				event.goto(0);
			}
		},
		replacePlayer:function(player){
			var next=game.createEvent('replacePlayer');
			next.source=player;
			next.content=function(){
				"step 0"
				var list=(source.side==game.me.side)?_status.friend:_status.enemy;
				if(list.length==0){
					game.friend.remove(source);
					game.enemy.remove(source);
					if(game.friend.length==0) game.over(false);
					else if(game.enemy.length==0) game.over(true);
					if(game.friendZhu&&game.friendZhu.classList.contains('dead')&&game.friend.length){
						game.friendZhu=game.friend[0];
						game.friendZhu.setIdentity(_status.color+'Zhu');
					}
					if(game.enemyZhu&&game.enemyZhu.classList.contains('dead')&&game.enemy.length){
						game.enemyZhu=game.enemy[0];
						game.enemyZhu.setIdentity(!_status.color+'Zhu');
					}
					event.finish();
					return;
				}
				if(source.side==game.me.side&&list.length>1&&game.me==game.friendZhu&&
					lib.storage.replace==false&&!_status.auto){
					event.dialog=ui.create.dialog('选择替补角色',[list,'character']);
					event.filterButton=function(){return true;};
					event.player=game.me;
					event.forced=true;
					event.custom.replace.confirm=function(){
						event.character=ui.selected.buttons[0].link;
						event.dialog.close();
						if(ui.confirm) ui.confirm.close();
						delete event.player;
						game.resume();
					}
					game.check();
					game.pause();
					// game.me.chooseButton(dialog,true);
				}
				else{
					event.character=list[Math.floor(Math.random()*list.length)];
				}
				"step 1"
				// if(result&&result.buttons&&result.buttons.length) event.character=result.buttons[0].link;
				_status.friend.remove(event.character);
				_status.enemy.remove(event.character);
				source.revive();
				source.init(event.character);
				source.draw(4);
				// console.log(_status.event.parent.parent.parent.name)
				_status.event.parent.parent.parent.untrigger(true);
			}
		},
		swapSeat:function(){
			;
		}
	},
	translate:{
		trueZhu:"帅",
		falseZhu:"将",
		trueZhong:"兵",
		falseZhong:"卒",
		trueColor:"#ffddb9",
		falseColor:"#b0d0e2",
		versus_zhu_config:'启用主将',
		versus_only_zhu_config:'只当主将',
		versus_replace_config:'自动换人',
		versus_assign_enemy_config:'指定对手',
		versus_number_config:'对阵人数',
		replace_number_config:'替补人数',
		choice_config:'候选人数'
	},
	element:{
		player:{
			dieSpeak:function(){
				switch(this.identity){
					case 'zhu': this.popup('吾降矣',2000);break;
					case 'zhong': this.popup('呃啊',2000);break;
				}
			},
			dieAfter:function(source){
				this.dieSpeak();
				if(this.side==game.me.side){
					_status.friendDied++;
				}
				else{
					_status.enemyDied++;
				}
				_status.friendCount.innerHTML='我方阵亡：'+get.cnNumber(_status.friendDied,true);
				_status.enemyCount.innerHTML='敌方阵亡：'+get.cnNumber(_status.enemyDied,true);
				if(game.friend.length==1&&this==game.friend[0]&&_status.friend.length==0){
					game.over(false);
				}
				else if(game.enemy.length==1&&this==game.enemy[0]&&_status.enemy.length==0){
					game.over(true);
				}
				else{
					if(source&&lib.storage.zhu){
						if(source.side!=this.side){
							source.draw(3);
						}
						else{
							source.discard(source.get('he'));
						}
					}
					else{
						game.delay();
					}
					game.replacePlayer(this);
				}

			}
		}
	},
	ai:{
		get:{
			attitude:function(from,to){
				if(from.side==to.side){
					if(to.identity=='zhu') return 6;
					return 6;
				}
				if(to.identity=='zhu') return -6;
				return -6;
			},
		}
	},
	config:{
		change_choice:true,
		ban_weak:true,
	}
}
