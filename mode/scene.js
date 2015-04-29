mode.scene={
	game:{
		load:function(){
			var next=game.createEvent('load',false);
			next.content=function(){
				"step 0"
				game.import('identity');
				"step 1"
				ui.create.arena();
				ui.auto.hide();
				ui.create.cards();
				game.finishCards();
				game.delay();
				"step 2"
				game.prepareGame();
				"step 3"
				var player=_status.first||game.players[Math.floor(Math.random()*game.players.length)];
				game.gameDraw(player);
				game.phaseLoop(player);
			}
		},
		checkResult:function(){
			game.over(ai.get.population('zhong')==0);
		},
		prepareGame:function(){
			var next=game.createEvent('prepareGame',false);
			next.content=function(){
				"step 0"
				var dialog=ui.create.dialog();
				for(var i=0;i<lib.scene.length;i++){
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
				game.pause();
				"step 1"
				ui.auto.show();
				var level=lib.scene[_status.level];
				if(level.neutral==undefined) level.neutral=[];
				if(level.friend==undefined) level.friend=[];
				if(level.enemy==undefined) level.enemy=[];
				var num=level.control.length+level.friend.length+level.enemy.length+level.neutral.length;
				ui.create.players(num);
				ui.create.me();
				for(var i=0;i<level.control.length;i++){
					level.control.sort(lib.sort.random);
				}
				var me=level.control.shift();
				var list=level.control.concat(level.friend).concat(level.enemy).concat(level.neutral);
				for(var i=0;i<list.length;i++){
					list.sort(lib.sort.random);
				}
				list.unshift(me);
				for(var i=0;i<game.players.length;i++){
					if(typeof(list[i])=='string') game.players[i].init(list[i]);
					else game.players[i].init(list[i][0],list[i][1]);
					if(level.enemy.contains(list[i])) game.players[i].identity='fan';
					else if(level.neutral.contains(list[i])) game.players[i].identity='nei';
					else game.players[i].identity='zhong';
					game.players[i].setIdentity(game.players[i].identity);
					if(level.control.contains(list[i])||i==0){
						game.players[i].setIdentity('控');
						game.players[i].control=true;
					}
				}
				if(level.global){
					for(var i=0;i<level.global.length;i++){
						for(var j=0;j<game.players.length;j++){
							game.players[j].addSkill(level.global[i]);
						}
					}
				}
				if(level.disable){
					for(var i=0;i<level.disable.length;i++){
						for(var j=0;j<game.players.length;j++){
							game.players[j].removeSkill(level.disable[i]);
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
			dieAfter:function(source){
				if(ai.get.population('fan')+ai.get.population('nei')==0){
					game.over();return;
				}
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].control) return;
				}
				game.checkResult();
			}
		}
	},
	skill:{
		_swap:{
			trigger:{player:'phaseBefore'},
			forced:true,
			popup:false,
			filter:function(event,player){
				if(player!=game.me){
					if(player.control) return true;
				}
			},
			content:function(){
				game.swapPlayer(player);
			}
		},
	},
	translate:{
		start:'开始',
		choose_level:'选择关卡',
		zhong:'友',
		fan:'敌',
		nei:'中'
	},
}
