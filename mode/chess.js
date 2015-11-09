'use strict';
mode.chess={
	canvasUpdates2:[],
	hiddenCharacters:[],
	element:{
		card:{
			moveTo:function(player,method){
				this.fixed=true;
				if(this.parentNode==ui.arena){
					var rect=player.getBoundingClientRect();
					this.style.left=(rect.left+8)+'px';
					this.style.top=(rect.top+8)+'px';
				}
				else{
					this.style.left='';
					this.style.top='';
					this.dataset.position=player.dataset.position;
				}
				if(method=='flip'){
					this.style.transition='all 0.5s';
					this.style.transform='rotate'+(Math.random()<0.5?'X':'Y')+'(180deg) perspective(1000px)';
				}
				else if(method=='rotate'){
					this.style.transition='all 0.5s';
					this.style.transform='rotate(180deg)';
				}
				else{
					this.style.transition='all 0.5s';
					this.style.transform='';
				}
				return this;
			},
		},
		player:{
			createRangeShadow:function(num,move){
				num++;
				var shadows=this.parentNode.getElementsByClassName('playergrid');
				while(shadows.length){
					shadows[0].remove();
				}
				var grids=[];
				for(var i=1-num;i<num;i++){
					for(var j=1-num+Math.abs(i);j<num-Math.abs(i);j++){
						if(this.movable(i,j)){
							var grid=ui.create.playergrid(this,i,j);
							grids.push(grid);
							if(typeof move=='function'){
								grid.listen(move);
							}
							else if(move){
								grid.listen(ui.click.playergrid);
								ui.movegrids.push(grid);
							}
							else{
								grid.classList.add('temp');
							}
						}
					}
				}
				return grids;
			},
			chooseToMove:function(num,prompt){
				var next=game.createEvent('chooseToMove');
				next.num=num||1;
				next.player=this;
				next.content=lib.element.playerproto.chooseToMove;
				next.prompt=prompt;
				return next;
			},
			move:function(x,y){
				var xy=this.getXY();
				return this.moveTo(x+xy[0],y+xy[1]);
			},
			moveTo:function(x,y){
				game.addVideo('moveTo',this,[x,y]);
				if(x>=ui.chesswidth){
					x=ui.chesswidth-1;
				}
				if(y>=ui.chessheight){
					y=ui.chessheight-1;
				}

				var pos=y*ui.chesswidth+x;
				if(!lib.posmap[pos]){
					delete lib.posmap[this.dataset.position];
					this.dataset.position=pos;
					lib.posmap[pos]=this;
					this.chessFocus();
				}
				return this;
			},
			canMoveTowards:function(target){
				var fxy=this.getXY();
				var txy=target.getXY();
				var dx=txy[0]-fxy[0];
				var dy=txy[1]-fxy[1];
				if(dx<0&&this.movable(-1,0)) return true;
				if(dx>0&&this.movable(1,0)) return true;
				if(dy<0&&this.movable(0,-1)) return true;
				if(dy>0&&this.movable(0,1)) return true;
				return false;
			},
			moveTowards:function(target){
				var fxy=this.getXY();
				var txy=target.getXY();
				var dx=txy[0]-fxy[0];
				var dy=txy[1]-fxy[1];
				if(Math.abs(dx)>Math.abs(dy)){
					if(dx<0){
						if(this.movable(-1,0)){
							this.moveLeft();
							return true;
						}
					}
					else if(dx>0){
						if(this.movable(1,0)){
							this.moveRight();
							return true;
						}
					}
					if(dy<0){
						if(this.movable(0,-1)){
							this.moveUp();
							return true;
						}
					}
					else if(dy>0){
						if(this.movable(0,1)){
							this.moveDown();
							return true;
						}
					}
				}
				else{
					if(dy<0){
						if(this.movable(0,-1)){
							this.moveUp();
							return true;
						}
					}
					else if(dy>0){
						if(this.movable(0,1)){
							this.moveDown();
							return true;
						}
					}
					if(dx<0){
						if(this.movable(-1,0)){
							this.moveLeft();
							return true;
						}
					}
					else if(dx>0){
						if(this.movable(1,0)){
							this.moveRight();
							return true;
						}
					}
				}
				return false;
			},
			chessFocus:function(){
				game.addVideo('chessFocus',this);
				if(ui.chess._chessdrag) return;
				if(_status.chessscrolling) return;
				var player=this;
				var dx=0,dy=0;

				if(player.offsetLeft-ui.chessContainer.scrollLeft<14){
					dx=player.offsetLeft-ui.chessContainer.scrollLeft-14;
				}
				else if(player.offsetLeft-ui.chessContainer.scrollLeft>ui.chessContainer.offsetWidth-134){
					dx=player.offsetLeft-ui.chessContainer.scrollLeft-ui.chessContainer.offsetWidth+134;
				}
				if(player.offsetTop-ui.chessContainer.scrollTop<14){
					dy=player.offsetTop-ui.chessContainer.scrollTop-14;
				}
				else if(player.offsetTop+ui.chess.offsetTop-ui.chessContainer.scrollTop>ui.chessContainer.offsetHeight-134){
					dy=player.offsetTop+ui.chess.offsetTop-ui.chessContainer.scrollTop-ui.chessContainer.offsetHeight+134;
				}
				if(_status.currentChessFocus){
					clearInterval(_status.currentChessFocus);
				}
				var count=12;
				var ddx=Math.floor(dx/12);
				var ddy=Math.floor(dy/12);
				if(dx||dy){
					_status.currentChessFocus=setInterval(function(){
						if(count--){
							ui.chessContainer.scrollLeft+=ddx;
							ui.chessContainer.scrollTop+=ddy;
						}
						else{
							ui.chessContainer.scrollLeft+=dx%12;
							ui.chessContainer.scrollTop+=dy%12;
							clearInterval(_status.currentChessFocus);
							delete _status.currentChessFocus;
						}
					},16);
				}
			},
			getXY:function(){
				var pos=parseInt(this.dataset.position);
				var x=pos%ui.chesswidth;
				var y=Math.floor(pos/ui.chesswidth);
				return [x,y];
			},
			getDataPos:function(x,y){
				var xy=this.getXY();
				if(typeof x!='number') x=0;
				if(typeof y!='number') y=0;
				x+=xy[0];
				y+=xy[1];
				return x+y*ui.chesswidth;
			},
			getNeighbour:function(x,y){
				var xy=this.getXY();
				if(xy[0]+x<0) return null;
				if(xy[1]+y<0) return null;
				if(xy[0]+x>=ui.chesswidth) return null;
				if(xy[1]+y>=ui.chessheight) return null;
				return lib.posmap[this.getDataPos(x,y)]||null;
			},
			movable:function(x,y){
				var xy=this.getXY();
				if(xy[0]+x<0) return false;
				if(xy[1]+y<0) return false;
				if(xy[0]+x>=ui.chesswidth) return false;
				if(xy[1]+y>=ui.chessheight) return false;
				return !this.getNeighbour(x,y);
			},
			moveRight:function(){
				if(this.movable(1,0)){
					this.move(1,0);
					return true;
				}
				return false;
			},
			moveLeft:function(){
				if(this.movable(-1,0)){
					this.move(-1,0);
					return true;
				}
				return false;
			},
			moveUp:function(){
				if(this.movable(0,-1)){
					this.move(0,-1);
					return true;
				}
				return false;
			},
			moveDown:function(){
				if(this.movable(0,1)){
					this.move(0,1);
					return true;
				}
				return false;
			},
			dieAfter:function(source){
				var player=this;
				delete lib.posmap[player.dataset.position];
				setTimeout(function(){
					player.delete();
				},500);
				for(var i=0;i<ui.phasequeue.length;i++){
					if(ui.phasequeue[i].link==player){
						ui.phasequeue[i].remove();
						ui.phasequeue.splice(i,1);
						break;
					}
				}
				for(var i=1;i<game.players.length;i++){
					if(game.players[i].side!=game.players[0].side){
						if(source&&source.side!=player.side){
							source.draw();
						}
						return;
					}
				}
				game.over(game.me.side==game.players[0].side);
			},
			$draw:function(num){
				var cards;
				if(get.itemtype(num)=='cards'){
					cards=num;
				}
				else if(get.itemtype(num)=='card'){
					cards=[num];
				}
				if(cards){
					game.addVideo('chessgainmod',this,get.cardsInfo(num));
				}
				else if(!num||typeof num=='number'){
					game.addVideo('chessgainmod',this,num);
				}

				return this.$gainmod(num);
			},
			$drawx:function(num){
				var cards,node;
				if(get.itemtype(num)=='cards'){
					cards=num;
					num=cards.length;
				}
				else if(get.itemtype(num)=='card'){
					cards=[num];
					num=1;
				}
				if(cards){
					cards=cards.slice(0);
					node=cards.shift().copy('drawing','thrown');
				}
				else{
					node=ui.create.div('.card.drawing.thrown');
				}
				node.fixed=true;
				game.$randomMove(this,node,100,30);
				node.dataset.position=this.dataset.position;
				this.parentNode.appendChild(node);
				ui.refresh(node);
				node.style.transform='';
				setTimeout(function(){
					node.remove();
				},1000);
				var that=this;
				if(num&&num>1){
					if(cards){
						that.$draw(cards)
					}
					else{
						that.$draw(num-1)
					}
				}
			},
			$gainmod:function(num){
				var cards,node;
				if(get.itemtype(num)=='cards'){
					cards=num;
					num=cards.length;
				}
				else if(get.itemtype(num)=='card'){
					cards=[num];
					num=1;
				}
				if(cards){
					cards=cards.slice(0);
					node=cards.shift().copy('thrown','hidden');
				}
				else{
					node=ui.create.div('.card.thrown.hidden');
				}
				node.fixed=true;
				game.$randomMove(this,node,100,30);
				var ot=node.style.transform;
				node.style.transform+='scale(0.6)';
				node.dataset.position=this.dataset.position;
				this.parentNode.appendChild(node);
				ui.refresh(node);
				node.show();
				node.style.transform=ot;
				setTimeout(function(){
					node.style.transform='';
					node.delete();
				},500);
				var that=this;
				if(num&&num>1){
					if(cards){
						that.$gain(cards,null,false)
					}
					else{
						that.$gain(num-1,null,false)
					}
				}
			},
			$throw:function(card,time,init){
				if(init!==false){
					if(get.itemtype(card)!='cards'){
						if(get.itemtype(card)=='card'){
							card=[card];
						}
						else{
							return;
						}
					}
					game.addVideo('throw',this,[get.cardsInfo(card),time]);
				}
				this.chessFocus();
				if(get.itemtype(card)=='cards'){
					for(var i=0;i<card.length;i++){
						this.$throw(card[i],time,false);
					}
				}
				else{
					if(card==undefined||card.length==0) return;
					var node=card.copy('thrown','hidden');
					node.dataset.position=this.dataset.position;
					this.parentNode.appendChild(node);
					ui.refresh(node);
					node.show();
					game.$randomMove(this,node,100,30);
					if(time!=undefined){
						node.fixed=true;
						setTimeout(function(){node.delete()},time);
					}
				}
			},
			$givemod:function(card,player){
				this.chessFocus();
				var from=this;
				if(get.itemtype(card)=='cards'){
					for(var i=0;i<card.length;i++){
						from.$givemod(card[i],player);
					}
				}
				else if(typeof card=='number'&&card>=0){
					for(var i=0;i<card;i++){
						from.$givemod('',player);
					}
				}
				else{
					var node;
					if(get.itemtype(card)=='card'){
						node=card.copy('card','thrown',false);
					}
					else{
						node=ui.create.div('.card.thrown');
					}

					node.dataset.position=this.dataset.position;
					node.fixed=true;
					node.hide();

					this.parentNode.appendChild(node);
					ui.refresh(node);
					node.show();

					game.$randomMove(this,node,100,30);

					setTimeout(function(){
						node.removeAttribute('style');
						node.dataset.position=player.dataset.position;
						node.delete();
					},700);
				}
			},
			$throwxy:function(card,left,top,transform){
				var node=card.copy('thrown');
				var rect=this.getBoundingClientRect();
				node.style.left=(rect.left+8)+'px';
				node.style.top=(rect.top+8)+'px';
				node.hide();
				node.style.transitionProperty='left,top,opacity';
				if(transform){
					node.style.transform='rotate('+(Math.random()*16-8)+'deg)';
				}
				ui.arena.appendChild(node);
				ui.refresh(node);
				node.show();
				node.style.left=left;
				node.style.top=top;
				return node;
			},
			$phaseJudge:function(card){
				game.addVideo('phaseJudge',this,get.cardInfo(card));
				var clone=card.copy('thrown',this.parentNode).animate('judgestart');
				var player=this;
				clone.style.opacity=0.6;
				clone.style.left=(Math.random()*100-50+ui.chessContainer.scrollLeft+ui.chessContainer.offsetWidth/2-52)+'px';
				clone.style.top=(Math.random()*80-40+ui.chessContainer.scrollTop+ui.chessContainer.offsetHeight/2-52-ui.chessContainer.offsetTop)+'px';
				game.delay();
				game.linexy([
					clone.offsetLeft+clone.offsetWidth/2,
					clone.offsetTop+clone.offsetHeight/2,
					player.offsetLeft+player.offsetWidth/2,
					player.offsetTop+player.offsetHeight/2
				],{opacity:0.5,dashed:true},true);
			}
		},
		playerproto:{
			chooseToMove:function(){
				"step 0"
				if(!player.movable(0,1)&&!player.movable(0,-1)&&
					!player.movable(1,0)&&!player.movable(-1,0)){
					return;
				}
				event.switchToAuto=function(){
					if(ui.movegrids){
						while(ui.movegrids.length){
							ui.movegrids.shift().delete();
						}
					}
					var list=[];
					var randomMove=['moveUp','moveDown','moveLeft','moveRight'];
					for(var iwhile=0;iwhile<num;iwhile++){
						var targets=[];
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].side!=player.side){
								targets.push(game.players[i]);
							}
						}
						targets.sort(function(a,b){
							return get.distance(player,a)-get.distance(player,b);
						});
						while(targets.length){
							var target=targets.shift();
							if(player.moveTowards(target)){
								event.moved=true;break;
							}
							if(targets.length==0){
								if(randomMove.length){
									var list=randomMove.slice(0);
									while(list.length){
										var thismove=list.randomRemove();
										if(player[thismove]()){
											event.moved=true;
											switch(thismove){
												case 'moveUp':randomMove.remove('moveDown');break;
												case 'moveDown':randomMove.remove('moveUp');break;
												case 'moveLeft':randomMove.remove('moveRight');break;
												case 'moveRight':randomMove.remove('moveLeft');break;
											}
											break;
										}
									}
									if(!event.moved) return;
								}
								else{
									return;
								}
							}
						}
						if(lib.skill._chessmove.ai.result.player(player)<=0) break;
					}
				};
				if(event.isMine()){
					if(event.prompt){
						event.dialog=ui.create.dialog(event.prompt);
					}
					var resume=function(){
						if(ui.movegrids){
							while(ui.movegrids.length){
								ui.movegrids.shift().delete();
							}
						}
						event.result={bool:false};
						game.resume();
					};
					if(event.phasing){
						event.custom.replace.confirm=resume;
					}
					else{
						event.control=ui.create.control('取消',resume);
					}
					game.pause();
					_status.imchoosing=true;
					ui.movegrids=[];
					player.createRangeShadow(num,true);
					for(var i=0;i<ui.movegrids.length;i++){
						var grid=ui.movegrids[i];
						if(game.isChessNeighbour(grid,player)) continue;
						for(var j=0;j<ui.movegrids.length;j++){
							if(game.isChessNeighbour(grid,ui.movegrids[j])) break;
						}
						if(j==ui.movegrids.length) grid.remove();
					}
				}
				else{
					event.switchToAuto();
				}
				"step 1"
				_status.imchoosing=false;
				if(event.moved){
					game.delay();
					event.result={
						bool:true,
						move:player.dataset.position
					}
				}
				if(!event.result){
					event.result={
						bool:false
					}
				}
				if(event.control){
					event.control.close();
				}
				if(event.dialog){
					event.dialog.close();
				}
			}
		}
	},
	game:{
		minskin:true,
		singleHandcard:true,
		treasures:[],
		obstacles:[],
		getVideoName:function(){
			var name=[
				get.translation(game.me.name),
				'战棋'+get.translation(get.config('chess_mode'))+' - '+_status.friendCount+'v'+_status.enemyCount
			];
			return name;
		},
		addChessPlayer:function(name,enemy,num,pos){
			if(typeof num!='number'){
				num=4;
			}
			var grids=[];
			var gridnum=ui.chessheight*ui.chesswidth;
			for(var i=0;i<gridnum;i++){
				grids.push(i);
			}
			for(var i=0;i<game.players.length;i++){
				grids.remove(parseInt(game.players[i].dataset.position));
			}
			for(var i=0;i<game.obstacles.length;i++){
				grids.remove(parseInt(game.obstacles[i].dataset.position));
			}
			for(var i=0;i<game.treasures.length;i++){
				grids.remove(parseInt(game.treasures[i].dataset.position));
			}
			var player=ui.create.player();
			if(enemy=='treasure'){
				player.animate('judgestart');
				player.side=null;
				player.identity='neutral';
				player.setIdentity();
				player.node.identity.dataset.color='zhong';
				player.classList.add('treasure');
				player.life=6+Math.floor(Math.random()*6);
			}
			else{
				player.animate('start');
				if(enemy){
					player.side=!game.me.side;
					player.setIdentity('enemy');
					player.identity='enemy';
				}
				else{
					player.side=game.me.side;
					player.setIdentity('friend');
					player.identity='friend';
				}
				player.node.identity.dataset.color=get.translation(player.side+'Color');
				game.players.push(player);
				if(lib.config.animation){
					setTimeout(function(){
						player.$rare2();
					},300);
				}
			}
			ui.chess.appendChild(player);
			if(_status.video){
				player.dataset.position=pos;
			}
			else{
				player.dataset.position=grids.randomGet();
			}
			lib.posmap[player.dataset.position]=player;
			game.addVideo('addChessPlayer',null,[name,enemy,num,player.dataset.position]);
			player.init(name);
			if(num){
				player.directgain(get.cards(num));
			}
			game.arrangePlayers();
			player.chessFocus();

			return player;
		},
		removeTreasure:function(player){
			game.addVideo('removeTreasure',null,player.dataset.position);
			player.delete();
			delete lib.posmap[player.dataset.position];
			game.treasures.remove(player);
		},
		addObstacle:function(x,y){
			if(y!==false){
				game.addVideo('addObstacle',null,[x,y]);
			}
			var pos;
			if(typeof x=='string'){
				pos=x;
			}
			else{
				if(x>=ui.chesswidth){
					x=ui.chesswidth-1;
				}
				if(y>=ui.chessheight){
					y=ui.chessheight-1;
				}

				pos=y*ui.chesswidth+x;
			}
			if(!lib.posmap[pos]){
				var grid=ui.create.div('.player.minskin.obstacle',ui.chess).animate('start');
				grid.dataset.position=pos;
				grid.listen(ui.click.obstacle);
				lib.posmap[pos]=grid;
				game.obstacles.push(grid);
			}
		},
		removeObstacle:function(pos){
			var node=lib.posmap[pos];
			if(node&&game.obstacles.contains(node)){
				game.addVideo('removeObstacle',null,pos);
				game.obstacles.remove(node);
				delete lib.posmap[pos];
				node.delete();
			}
		},
		addOverDialog:function(dialog,result){
			dialog.classList.add('center');
			if(get.config('chess_mode')!='leader') return;
			if(result=='战斗胜利'){
				_status.victory=true;
				if(!_status.enterArena){
					var div=ui.create.div();
					div.innerHTML='获得'+game.reward+'金';
					dialog.add(div);
					if(_status.challenge&&_status.challengeMoney<=game.data.dust){
						var div2=ui.create.div();
						div2.style.display='block';
						div2.innerHTML='招降所需招募令：'+_status.challengeMoney+'/'+game.data.dust;
						dialog.add(div2);
					}
					game.changeMoney(game.reward);
					game.saveData();
				}
			}
			else if(_status.zhaoxiang){
				var div=ui.create.div();
				div.innerHTML='招降'+get.translation(_status.zhaoxiang)+'成功';
				dialog.add(div);
			}
		},
		controlOver:function(){
			ui.create.control('返回',game.reload);
			if(get.config('chess_mode')!='leader') return;
			if(_status.enterArena){
				game.data.arena.acted.length=0;
				if(_status.victory){
					game.data.arena.win++;
					for(var i=0;i<game.players.length;i++){
						if(_status.arenaAdd&&_status.arenaAdd.contains(game.players[i].name)){
							continue;
						}
						if(game.data.arena.dead.contains(game.players[i].name)){
							game.data.arena.dead.remove(game.players[i].name);
							game.data.arena.acted.push(game.players[i].name);
						}
					}
				}
				game.saveData();
			}
			else{
				if(_status.challenge&&(_status.zhaoxiang||_status.victory)){
					game.data.challenge=game.getLeaderList();
					game.saveData();
				}
				if(_status.challenge&&!_status.zhaoxiang&&_status.victory){
					var money=_status.challengeMoney;
					if(game.data.dust>=money){
						ui.create.control('招降'+get.translation(_status.challenge),function(){
							game.data.character.add(_status.challenge);
							game.data.challenge=game.getLeaderList();
							game.changeDust(-money);
							game.reload();
						});
					}
				}
			}
		},
		phaseLoopOrdered:function(player){
			var next=game.createEvent('phaseLoop');
			next.player=player;
			next.content=function(){
				"step 0"
				var passed=false;
				for(var i=0;i<game.players.length;i++){
					if(!game.players[i].classList.contains('acted')){
						if(game.players[i].side==player.side){
							passed=true;break;
						}
					}
				}
				if(!passed){
					var num1=0;
					var next=null;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==player.side){
							game.players[i].classList.remove('acted');
							num1++;
						}
						else if(!next){
							next=game.players[i];
						}
					}
					var num2=game.players.length-num1;
					if(num2>num1){
						if(next.side==game.me.side){
							next=game.me;
						}
						var str;
						if(num2-num1>1){
							str='选择至多'+get.cnNumber(num2-num1)+'个已方角色各摸一张牌'
						}
						else{
							str='选择一个已方角色摸一张牌'
						}
						var nevt=next.chooseTarget(str,function(card,player,target){
							return target.side==next.side;
						},[1,num2-num1]);
						nevt.ai=function(target){
							return Math.max(1,10-target.num('h'));
						};
						nevt.chessForceAll=true;
					}
					else{
						event.goto(2);
					}
				}
				else{
					event.goto(2);
				}
				"step 1"
				if(result.bool){
					game.asyncDraw(result.targets);
				}
				"step 2"
				var players=[];
				if(player.side==game.me.side){
					player=game.me;
				}
				if(player.isDead()){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==player.side){
							player=game.players[i];
						}
					}
				}
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side==player.side){
						if(!game.players[i].classList.contains('acted')){
							players.push(game.players[i]);
						}
					}
				}
				if(players.length>1){
					var nevt=player.chooseTarget('选择下一个行动的角色',function(card,player,target){
						return target.side==player.side&&!target.classList.contains('acted');
					},true);
					nevt.chessForceAll=true;
					nevt.ai=function(target){
						var nj=target.num('j');
						if(nj){
							return -nj;
						}
						return Math.max(0,10-target.hp);
					}
				}
				else{
					event.decided=players[0];
				}
				"step 3"
				if(event.decided){
					event.decided.phase();
					event.justacted=event.decided;
					delete event.decided;
				}
				else{
					var current=result.targets[0];
					current.phase();
					event.justacted=current;
				}
				"step 4"
				event.justacted.classList.add('acted');
				event.goto(0);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=event.justacted.side){
						event.player=game.players[i];
						break;
					}
				}
				if(Math.random()<parseFloat(get.config('chess_treasure'))){
					var list=[];
					for(var i=0;i<game.treasures.length;i++){
						list.push(game.treasures[i].name);
					}
					if(list.length<lib.treasurelist.length){
						var name=Array.prototype.randomGet.apply(lib.treasurelist,list);
						var treasure=game.addChessPlayer(name,'treasure',0);
						treasure.playerfocus(1500);
						if(lib.config.animation){
							setTimeout(function(){
								treasure.$rare2();
							},500);
						}
						game.treasures.add(treasure);
						game.delay(3);
					}
				}
				for(var i=0;i<game.treasures.length;i++){
					game.treasures[i].life--;
					if(game.treasures[i].life<=0){
						game.removeTreasure(game.treasures[i--]);
					}
				}
			}
		},
		isChessNeighbour:function(a,b){
			if(a&&a.dataset){
				a=a.dataset.position;
			}
			if(b&&b.dataset){
				b=b.dataset.position;
			}
			var ax=a%ui.chesswidth;
			var ay=Math.floor(a/ui.chesswidth);

			var bx=b%ui.chesswidth;
			var by=Math.floor(b/ui.chesswidth);

			if(ax==bx&&Math.abs(ay-by)==1) return true;
			if(ay==by&&Math.abs(ax-bx)==1) return true;

			return false;
		},
		$randomMove:function(player,node,length,rand){
			length=length+Math.random()*rand;
			var ang=Math.random()*360;
			ang*=Math.PI/180;
			var tx=length*Math.cos(ang);
			var ty=length*Math.sin(ang);
			var rect=player.getBoundingClientRect();
			if(rect.left<=80){
				tx=Math.abs(tx);
			}
			else if(rect.left+rect.width+80>=ui.chessContainer.offsetWidth){
				tx=-Math.abs(tx);
			}
			if(rect.top<=80){
				ty=Math.abs(ty);
			}
			else if(rect.top+rect.height+80>=ui.chessContainer.offsetHeight){
				ty=-Math.abs(ty);
			}
			node.style.transform='translate('+tx+'px,'+ty+'px)';
		},
		draw2:function(func){
			lib.canvasUpdates2.push(func);
			if(!lib.status.canvas2){
				lib.status.canvas2=true;
				game.update(game.updateCanvas2);
			}
		},
		updateCanvas2:function(time){
			if(lib.canvasUpdates2.length===0){
				lib.status.canvas2=false;
				return false;
			}
			ui.canvas2.width=ui.chess.offsetWidth;
			ui.canvas2.height=ui.chess.offsetHeight;
			ui.canvas2.style.left=0;
			ui.canvas2.style.top=0;
			var ctx=ui.ctx2;
			ctx.shadowBlur=5;
			ctx.shadowColor='rgba(0,0,0,0.3)';
			ctx.fillStyle='white';
			ctx.strokeStyle='white';
			ctx.lineWidth=3;
			ctx.save();
			for(var i=0;i<lib.canvasUpdates2.length;i++){
				ctx.restore();
				ctx.save();
				var update=lib.canvasUpdates2[i];
				if(!update.starttime){
					update.starttime=time;
				}
				if(update(time-update.starttime,ctx)===false){
					lib.canvasUpdates2.splice(i--,1);
				}
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
				lib.init.css('layout/mode','chess');
				ui.chesssheet=document.createElement('style');
				document.head.appendChild(ui.chesssheet);
				var playback=localStorage.getItem(lib.configprefix+'playback');
				lib.treasurelist=[];
				if(get.config('chess_character')||playback||get.config('chess_mode')=='leader'){
					for(var i in lib.characterPack.mode_chess){
						if(i.indexOf('treasure_')==0){
							lib.treasurelist.push(i);
						}
						if(!playback&&i.indexOf('leader_')==0&&get.config('chess_mode')!='leader') continue;
						lib.character[i]=lib.characterPack.mode_chess[i];
						if(!lib.character[i][4]){
							lib.character[i][4]=[];
						}
					}
				}
				if(get.config('chess_card')){
					lib.card.list=lib.card.list.concat(lib.chess_cardlist);
				}
				if(parseFloat(get.config('chess_obstacle'))>0){
					lib.card.list=lib.card.list.concat(lib.chess_obstaclelist);
					delete lib.chess_obstaclelist
				}
				ui.create.arena();
				ui.create.cards();
				game.finishCards();
				ui.chessContainer=ui.create.div('#chess-container',ui.arena);
				ui.chessContainer.ontouchmove = ui.click.touchScroll;
				ui.chessContainer.style.WebkitOverflowScrolling='touch';
				ui.chess=ui.create.div('#chess',ui.chessContainer);
				ui.canvas2=document.createElement('canvas');
				ui.canvas2.id='canvas2';
				ui.chess.appendChild(ui.canvas2);
				ui.ctx2=ui.canvas2.getContext('2d');
				game.me=ui.create.player();
				if(playback){
					for(var i in lib.characterPack){
						for(var j in lib.characterPack[i]){
							lib.character[j]=lib.character[j]||lib.characterPack[i][j];
						}
					}
					game.pause();
					ui.system.style.display='none';
					_status.playback=playback;
					localStorage.removeItem(lib.configprefix+'playback');
					var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
					store.get(parseInt(playback)).onsuccess=function(e){
						if(e.target.result){
							event.video=e.target.result.video;
							game.resume();
						}
						else{
							alert('播放失败：找不到录像');
							game.reload();
						}
					}
				}
				else{
					switch(get.config('chess_mode')){
						case 'leader':{
							game.leaderView();
							break;
						}
						case 'combat':{
							if(lib.storage.test){
								lib.config.game_speed='vfast';
								_status.auto=true;
								setTimeout(function(){
									console.log(get.translation(game.players));
									ui.updateh(true);
								},500);
								ui.auto.classList.add('glow');
							}
							game.chooseCharacter();
							break;
						}
						default:{
							game.chooseCharacter();
						}
					}
				}
				"step 1"
				ui.arena.classList.add('chess');
				var mylistmap,enemylistmap;
				if(event.video){
					var videocontent=event.video[0].content;
					_status.mylist=[];
					_status.enemylist=[];
					mylistmap=[];
					enemylistmap=[];
					for(var i=0;i<videocontent.length;i++){
						if(videocontent[i].lord){
							_status.lord=videocontent[i].name;
						}
						if(videocontent[i].identity=='friend'){
							_status.mylist.push(videocontent[i].name);
							mylistmap.push(videocontent[i].position);
						}
						else{
							_status.enemylist.push(videocontent[i].name);
							enemylistmap.push(videocontent[i].position);
						}
					}
					game.playerMap=lib.posmap;
				}
				var	num=Math.round((_status.mylist.length+_status.enemylist.length)/2);
				var friend,enemy;
				var side;
				if(get.config('chess_mode')=='leader'){
					side=true;
				}
				else{
					side=Math.random()<0.5;
				}
				switch(num){
					case 2:ui.chessheight=5;break;
					case 3:ui.chessheight=5;break;
					case 4:ui.chessheight=6;break;
					case 5:ui.chessheight=6;break;
					case 6:ui.chessheight=7;break;
					case 7:ui.chessheight=7;break;
					case 8:ui.chessheight=8;break;
				}
				ui.chesswidth=Math.round(ui.chessheight*1.5);
				ui.chess.style.height=148*ui.chessheight+'px';
				ui.chess.style.width=148*ui.chesswidth+'px';
				ui.chess.addEventListener('mousedown',function(e){
					if(Array.isArray(e.path)){
						for(var i=0;i<e.path.length;i++){
							var itemtype=get.itemtype(e.path[i]);
							if(itemtype=='button'||itemtype=='card'||itemtype=='player'){
								return;
							}
						}
					}
					this._chessdrag=[e,this.parentNode.scrollLeft,this.parentNode.scrollTop];
				});
				ui.chess.addEventListener('mouseleave',function(){
					this._chessdrag=null;
				});
				ui.chess.addEventListener('mouseup',function(){
					if(this._chessdrag){
						this._chessdrag=null;
					}
				});
				ui.chess.addEventListener('mousemove',function(e){
					if(this._chessdrag){
						this.parentNode.scrollLeft=this._chessdrag[1]-e.x+this._chessdrag[0].x;
						this.parentNode.scrollTop=this._chessdrag[2]-e.y+this._chessdrag[0].y;
						_status.clicked=true;
					}
					e.preventDefault();
				});
				ui.chessContainer.addEventListener('mousewheel',function(){
					if(_status.currentChessFocus){
						clearInterval(_status.currentChessFocus);
						delete _status.currentChessFocus;
					}
				});
				ui.chessscroll1=ui.create.div('.chessscroll.left',ui.chessContainer);
				ui.chessscroll2=ui.create.div('.chessscroll.right',ui.chessContainer);
				var chessscroll=function(){
					var direction=this.direction;
					var speed=parseInt(get.config('chessscroll_speed'));
					if(!speed) return;
					var interval=setInterval(function(){
						ui.chessContainer.scrollLeft+=speed*direction;
					},16);
					_status.chessscrolling=interval;
				};
				var leavescroll=function(){
					if(_status.chessscrolling){
						clearInterval(_status.chessscrolling);
						delete _status.chessscrolling;
					}
				};
				ui.chessscroll1.direction=-1;
				ui.chessscroll1.addEventListener('mouseenter',chessscroll);
				ui.chessscroll1.addEventListener('mouseleave',leavescroll);

				ui.chessscroll2.direction=1;
				ui.chessscroll2.addEventListener('mouseenter',chessscroll);
				ui.chessscroll2.addEventListener('mouseleave',leavescroll);

				for(var i=0;i<ui.chesswidth;i++){
					for(var j=0;j<ui.chessheight;j++){
						var pos='[data-position="'+(i+j*ui.chesswidth)+'"]';
						ui.chesssheet.sheet.insertRule('#arena.chess #chess>.player'+pos+
						'{left:'+(14+i*148)+'px;top:'+(14+j*148)+'px}',0);
						ui.chesssheet.sheet.insertRule('#arena.chess #chess>.card'+pos+
						'{left:'+(22+i*148)+'px;top:'+(22+j*148)+'px}',0);
						ui.chesssheet.sheet.insertRule('#arena.chess #chess>.popup'+pos+
						'{left:'+(19+i*148)+'px;top:'+(142+j*148)+'px}',0);
					}
				}

				var grids=[];
				var gridnum=ui.chessheight*ui.chesswidth;
				for(var i=0;i<gridnum;i++){
					grids.push(i);
				}
				event.obs=[];
				if(!event.video){
					var nco=parseFloat(get.config('chess_obstacle'));
					if(nco>0){
						var ng=Math.floor(gridnum*nco);
						for(var i=0;i<ng;i++){
							var cg=grids.randomRemove();
							game.addObstacle(cg.toString(),false);
							event.obs.push(cg.toString());
						}
					}
				}
				_status.enemyCount=_status.enemylist.length;
				_status.friendCount=_status.mylist.length;
				while(_status.mylist.length){
					friend=ui.create.player().animate('start');
					friend.init(_status.mylist.shift());
					friend.side=side;
					friend.setIdentity('friend');
					friend.identity='friend';
					friend.node.identity.dataset.color=get.translation(side+'Color');
					game.players.push(friend);
					ui.chess.appendChild(friend);
					if(event.video){
						friend.dataset.position=mylistmap.shift();
					}
					else{
						friend.dataset.position=grids.randomRemove();
						if(_status.enterArena&&game.data.arena.acted.contains(friend.name)){
							friend.hp--;
							friend.update();
						}
						if(_status.enterArena){
							friend.addSkill('arenaAdd');
						}
					}
					lib.posmap[friend.dataset.position]=friend;
				}
				while(_status.enemylist.length){
					enemy=ui.create.player().animate('start');
					enemy.init(_status.enemylist.shift());
					enemy.side=!side;
					enemy.setIdentity('enemy');
					enemy.identity='enemy';
					enemy.node.identity.dataset.color=get.translation(!side+'Color');
					game.players.push(enemy);
					ui.chess.appendChild(enemy);
					if(event.video){
						enemy.dataset.position=enemylistmap.shift();
					}
					else{
						enemy.dataset.position=grids.randomRemove();
					}
					lib.posmap[enemy.dataset.position]=enemy;
				}

				lib.setPopped(ui.create.system('查看手牌',null,true),function(){
					var uiintro=ui.create.dialog('hidden');
					var added=false;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==game.me.side&&game.players[i]!=game.me){
							added=true;
							uiintro.add(get.translation(game.players[i]));
							var cards=game.players[i].get('h');
							if(cards.length){
								uiintro.add(cards,true);
							}
							else{
								uiintro.add('（无）');
							}
						}
					}
					if(!added){
						uiintro.add('无队友');
					}

					return uiintro;
				});
				// ui.create.system('显示距离',function(){
				// 	if(!game.me.isAlive()) return;
				// 	for(var i=0;i<game.players.length;i++){
				// 		if(game.players[i]!=game.me){
				// 			var dist=get.distance(game.me,game.players[i],'pure');
				// 			var dist2=get.distance(game.me,game.players[i]);
				// 			var nature=dist>7?'thunder':'';
				// 			game.players[i].popup('距离：'+dist2+'/'+dist,nature);
				// 		}
				// 	}
				// },true);

				ui.create.me();
				ui.create.fakeme();

				ui.chessinfo=ui.create.div('.fakeme.player',ui.me,function(e){
					e.stopPropagation();
				});
				lib.setScroll(ui.chessinfo);

				game.arrangePlayers();
				"step 2"
				ui.control.style.display='';
				var p;
				for(var i=0;i<game.players.length;i++){
					if(_status.lord){
						if(game.players[i].name==_status.lord){
							p=game.players[i];
							p.addSkill('tongshuai');
							p.addSkill('leader_zhaoxiang');
							break;
						}
					}
					else{
						if(game.players[i].side){
							p=game.players[i];
							break;
						}
					}
				}
				if(event.video){
					game.playVideoContent(event.video);
					game.setChessInfo(p);
					return;
				}

				var players=get.players(lib.sort.position);
				var info=[];
				for(var i=0;i<players.length;i++){
					info.push({
						name:players[i].name,
						identity:players[i].identity,
						position:players[i].dataset.position,
						lord:players[i].name==_status.lord
					});
				}
				_status.videoInited=true,
				game.addVideo('init',null,info);
				if(event.obs){
					game.addVideo('initobs',null,event.obs);
				}

				event.trigger('gameStart');
				game.gameDraw(p);
				if(get.config('chess_mode')=='leader'){
					game.phaseLoopOrdered(p);
				}
				else if(get.config('chess_ordered')){
					game.phaseLoopOrdered(p);
				}
				else{
					game.phaseLoop(p);
				}
				game.setChessInfo(p);
			}
		},
		setChessInfo:function(p){
			if(!p){
				if(ui.phasequeue&&ui.phasequeue.length){
					p=ui.phasequeue[0].link;
				}
				else{
					p=game.me;
				}
			}
			ui.chessinfo.innerHTML='';
			ui.phasequeue=[];
			for(var i=0;i<game.players.length;i++){
				var node=ui.create.div('.avatar',ui.chessinfo);
				node.style.backgroundImage=p.node.avatar.style.backgroundImage;
				node.link=p;
				node.listen(game.clickChessInfo);
				p.instance=node;
				if(_status.currentPhase==p){
					node.classList.add('glow2');
				}
				ui.phasequeue.push(node);
				p=p.next;
			}
		},
		initLeaderSave:function(save){
			game.save(save,{
				money:300,
				dust:0,
				legend:0,
				character:[]
			});
		},
		clickChessInfo:function(e){
			if(this.link.isAlive()){
				this.link.chessFocus();
				if(this.link.classList.contains('selectable')||
				this.link.classList.contains('selected')){
					// this.link.click();
					ui.click.target.call(this.link,e);
					ui.click.window.call(ui.window,e);
				}
				e.stopPropagation();
			}
		},
		leaderView:function(){
			var next=game.createEvent('leaderView',false);
			next.content=function(){
				'step 0'
				var save=get.config('chess_leader_save');
				if(!save){
					save='save1';
				}
				if(!lib.storage[save]){
					game.initLeaderSave(save);
				}
				game.data=lib.storage[save];
				ui.wuxie.hide();
				ui.auto.hide();
				ui.money=ui.create.div(ui.window);
				ui.money.innerHTML='<span>⚑</span><span>'+game.data.dust+'</span>'+
					'<span>㉤</span><span>'+game.data.money+'</span>';
				ui.money.style.top='auto';
				ui.money.style.left='auto';
				ui.money.style.right='20px';
				ui.money.style.bottom='15px';
				ui.money.childNodes[0].style.color='rgb(111, 198, 255)';
				ui.money.childNodes[1].style.fontFamily='huangcao';
				ui.money.childNodes[1].style.marginRight='10px';
				ui.money.childNodes[2].style.color='#FFE600';
				ui.money.childNodes[3].style.fontFamily='huangcao';
				ui.money.style.letterSpacing='4px';
				'step 1'
				lib.rank.all=lib.rank.s.
					concat(lib.rank.ap).
					concat(lib.rank.a).
					concat(lib.rank.am).
					concat(lib.rank.bp).
					concat(lib.rank.b).
					concat(lib.rank.bm).
					concat(lib.rank.c).
					concat(lib.rank.d);
				lib.rank.common=[];
				for(var i=0;i<lib.rank.all.length;i++){
					if(!lib.rank.legend.contains(lib.rank.all[i])&&
						!lib.rank.epic.contains(lib.rank.all[i])&&
						!lib.rank.rare.contains(lib.rank.all[i])){
						lib.rank.common.push(lib.rank.all[i]);
					}
				}
				delete window.characterRank;

				ui.control.style.transition='all 0s';
				if(lib.config.layout=='mobile'){
					ui.control.style.top='calc(100% - 70px)';
				}
				else if(lib.config.layout=='phone'){
					ui.control.style.top='calc(100% - 80px)';
				}
				else{
					ui.control.style.top='calc(100% - 30px)';
				}
				var cardNode=function(i,name,load){
					var node=ui.create.player(ui.window);
					node.style.transition='all 0.7s';
					node.style.opacity=0;
					node.style.zIndex=4;

					var kaibao=false;
					if(!name||typeof i=='string'){
						if(!name){
							name=game.getLeaderCharacter();
							event.cardnodes.push(node);
						}
						else{
							node.classList.add('minskin')
						}
						kaibao=true;
						node.style.left='calc(50% - 75px)';
						node.style.top='calc(50% - 90px)';
						ui.refresh(node);
					}
					else if(!load){
						node.style.transform='perspective(1200px) rotateY(180deg) translate(0,-200px)';
					}
					node.name=name;
					if(!load){
						switch(i){
							case 0:{
								node.style.left='calc(50% - 75px)';
								node.style.top='calc(25% - 90px)';
								break;
							}
							case 1:{
								node.style.left='calc(30% - 90px)';
								node.style.top='calc(75% - 90px)';
								break;
							}
							case 2:{
								node.style.left='calc(70% - 60px)';
								node.style.top='calc(75% - 90px)';
								break;
							}
							case '51':{
								node.style.left='calc(50% - 60px)';
								node.style.top='calc(25% - 75px)';
								break;
							}
							case '52':{
								node.style.left='calc(35% - 55px)';
								node.style.top='calc(75% - 25px)';
								break;
							}
							case '53':{
								node.style.left='calc(65% - 65px)';
								node.style.top='calc(75% - 25px)';
								break;
							}
							case '54':{
								node.style.left='calc(25% - 75px)';
								node.style.top='calc(50% - 70px)';
								break;
							}
							case '55':{
								node.style.left='calc(75% - 45px)';
								node.style.top='calc(50% - 70px)';
								break;
							}
						}
						if(!kaibao){
							node.style.top='calc(50% - 180px)';
							ui.refresh(node);
						}
						node.style.opacity=1;
					}
					node.node.count.remove();
					node.node.marks.remove();
					var rarity=game.getRarity(name);
					if(rarity!='common'){
						node.rarity=rarity;
						node.node.intro.style.left='14px';
						if(node.classList.contains('minskin')){
							node.node.intro.style.top='84px';
						}
						else{
							node.node.intro.style.top='145px';
						}
						node.node.intro.style.fontSize='20px';
						node.node.intro.style.fontFamily='huangcao';
						switch(rarity){
							case 'rare':node.node.intro.dataset.nature='waterm';break;
							case 'epic':node.node.intro.dataset.nature='thunderm';break;
							case 'legend':node.node.intro.dataset.nature='metalm';break;
						}
					}
					if(kaibao){
						node.node.avatar.style.display='none';
						node.style.transform='perspective(1200px) rotateY(180deg) translateX(0)';
						if(typeof i=='string'){
							node.listen(event.turnCard2);
						}
						else{
							node.listen(turnCard);
							if(!game.data.character.contains(name)){
								game.data.character.push(name);
								if(game.data.challenge.contains(name)){
									game.data.challenge=game.getLeaderList();
									game.saveData();
								}
								var button=ui.create.button(name,'character');
								button.classList.add('glow2');
								dialog1.content.lastChild.insertBefore(button,dialog1.content.lastChild.firstChild);
								dialog1.buttons.push(button);
								fixButton(button);
								button.area='character';
							}
							else{
								switch(rarity){
									case 'common':game.data.dust+=10;break;
									case 'rare':game.data.dust+=30;break;
									case 'epic':game.data.dust+=150;break;
									case 'legend':game.data.dust+=600;break;
								}
							}
						}
					}
					else{
						node.style.transform='';
					}
					return node;
				};
				event.cardNode=cardNode;
				if(game.data.arena){
					ui.money.style.display='none';
					_status.enterArena=true;
					return;
				}
				var groupSort=function(name){
					if(lib.character[name][1]=='wei') return 0;
					if(lib.character[name][1]=='shu') return 1;
					if(lib.character[name][1]=='wu') return 2;
					if(lib.character[name][1]=='qun') return 3;
				};
				game.data.character.sort(function(a,b){
					var del=groupSort(a)-groupSort(b);
					if(del!=0) return del;
					var aa=a,bb=b;
					if(a.indexOf('_')!=-1){
						a=a.slice(a.indexOf('_')+1);
					}
					if(b.indexOf('_')!=-1){
						b=b.slice(b.indexOf('_')+1);
					}
					if(a!=b){
						return a>b?1:-1;
					}
					return aa>bb?1:-1;
				});
				if(game.data.character.length==0||!game.data.challenge){
					game.data.character=lib.rank.common.randomGets(3);
					game.data.challenge=game.getLeaderList();
					game.saveData();
				}
				var fixButton=function(button){
					var rarity=game.getRarity(button.link);
					if(rarity!='common'){
						var intro=button.node.intro;
						intro.classList.add('showintro');
						intro.style.fontFamily='huangcao';
						intro.style.fontSize='20px';
						intro.style.top='67px';
						intro.style.left='1px';
						switch(rarity){
							case 'rare':intro.dataset.nature='waterm';break;
							case 'epic':intro.dataset.nature='thunderm';break;
							case 'legend':intro.dataset.nature='metalm';break;
						}
						intro.innerHTML=get.translation(rarity);
					}
				}
				game.leaderLord=['leader_caocao','leader_liubei','leader_sunquan'];
				var dialog1=ui.create.dialog('选择君主');
				event.dialog1=dialog1;
				dialog1.classList.add('fixed');
				dialog1.classList.add('fullheight');
				dialog1.classList.add('halfleft');
				dialog1.add([game.leaderLord,'character']);
				var i;
				for(i=0;i<dialog1.buttons.length;i++){
					dialog1.buttons[i].area='lord';
				}
				var j=i;
				dialog1.add('选择武将');
				var getCapt=function(str){
					if(str.indexOf('_')==-1){
						return str[0];
					}
					return str[str.indexOf('_')+1];
				}
				var clickCapt=function(e){
					if(_status.dragged) return;
					if(this.classList.contains('thundertext')){
						dialog1.currentcapt=null;
						dialog1.currentcaptnode=null;
						this.classList.remove('thundertext');
						for(var i=0;i<dialog1.buttons.length;i++){
							dialog1.buttons[i].style.display='';
						}
					}
					else{
						if(dialog1.currentcaptnode){
							dialog1.currentcaptnode.classList.remove('thundertext');
						}
						dialog1.currentcapt=this.link;
						dialog1.currentcaptnode=this;
						this.classList.add('thundertext');
						for(var i=0;i<dialog1.buttons.length;i++){
							if(dialog1.buttons[i].area!='character') continue;
							if(getCapt(dialog1.buttons[i].link)!=dialog1.currentcapt){
								dialog1.buttons[i].style.display='none';
							}
							else{
								dialog1.buttons[i].style.display='';
							}
						}
					}
					e.stopPropagation();
				};
				var captnode=ui.create.div('.caption');
				var initcapt=function(){
					var namecapt=[];
					for(var i=0;i<game.data.character.length;i++){
						var ii=game.data.character[i];
						if(namecapt.indexOf(getCapt(ii))==-1){
							namecapt.push(getCapt(ii));
						}
					}
					namecapt.sort(function(a,b){
						return a>b?1:-1;
					});
					captnode.innerHTML='';
					for(i=0;i<namecapt.length;i++){
						var span=document.createElement('span');
						span.innerHTML=' '+namecapt[i].toUpperCase()+' ';
						span.link=namecapt[i];
						span.addEventListener(lib.config.touchscreen?'touchend':'click',clickCapt);
						captnode.appendChild(span);
					}
					if(game.data.character.length<=15){
						captnode.style.display='none';
					}
					else{
						captnode.style.display='';
					}
				};
				initcapt();
				dialog1.captnode=captnode;
				dialog1.add(captnode);
				dialog1.add([game.data.character,'character']);
				for(i=j;i<dialog1.buttons.length;i++){
					dialog1.buttons[i].area='character';
					fixButton(dialog1.buttons[i]);
				}
				var dialog2=ui.create.dialog('战斗难度');
				event.dialog2=dialog2;
				dialog2.classList.add('fixed');
				dialog2.classList.add('fullheight');
				dialog2.classList.add('halfright');
				dialog2.add([[
					['','','leader_easy'],
					['','','leader_medium'],
					['','','leader_hard']
				],'vcard']);
				for(i=0;i<dialog2.buttons.length;i++){
					dialog2.buttons[i].node.name.style.fontFamily='xinwei';
					dialog2.buttons[i].node.name.style.fontSize='30px';
					dialog2.buttons[i].node.name.style.left='4px';
					dialog2.buttons[i].node.name.dataset.color='unknownm';
					dialog2.buttons[i]._nopup=true;
					dialog2.buttons[i].area='difficulty';
				}
				dialog2.add('敌方人数');
				dialog2.addSmall([[
					['','','leader_2'],
					['','','leader_3'],
					['','','leader_5'],
					['','','leader_8'],
				],'vcard']);
				for(;i<dialog2.buttons.length;i++){
					dialog2.buttons[i].style.background='rgba(0,0,0,0.2)';
					dialog2.buttons[i].style.boxShadow='rgba(0, 0, 0, 0.3) 0 0 0 1px';
					dialog2.buttons[i].node.background.style.fontFamily='xinwei';
					dialog2.buttons[i]._nopup=true;
					dialog2.buttons[i].area='number';
				}
				dialog2.add('挑战武将');
				dialog2.add([game.data.challenge,'character']);
				for(;i<dialog2.buttons.length;i++){
					dialog2.buttons[i].area='challenge';
					fixButton(dialog2.buttons[i])
				}

				var selected={
					lord:[],
					character:[],
					difficulty:[],
					number:[],
					challenge:[]
				}
				var clearSelected=function(){
					for(var i=0;i<dialog1.buttons.length;i++){
						dialog1.buttons[i].classList.remove('unselectable');
						dialog1.buttons[i].classList.remove('selected');
					}
					for(var i=0;i<dialog2.buttons.length;i++){
						dialog2.buttons[i].classList.remove('unselectable');
						dialog2.buttons[i].classList.remove('selected');
					}
					for(var j in selected){
						selected[j].length=0;
					}
				}
				event.enterArena=ui.create.control('竞技场','nozoom',function(){
					if(game.data.money<150&&!game.data._arena) return;
					if(_status.zhaomu||_status.qianfan||_status.kaibao) return;
					if(!game.data._arena) game.changeMoney(-150);
					_status.enterArena=true;
					game.resume();
				});
				var turnCard=function(){
					if(this.turned) return;
					_status.chessclicked=true;
					this.turned=true;
					var node=this;
					node.style.transition='all ease-in 0.3s';
					node.style.transform='perspective(1200px) rotateY(270deg) translateX(150px)';
					var onEnd=function(){
						game.minskin=false;
						node.init(node.name);
						game.minskin=true;
						node.node.avatar.style.display='';
						if(node.rarity){
							node.node.intro.innerHTML=get.translation(node.rarity);
							node.node.intro.classList.add('showintro');
						}
						node.classList.add('playerflip');
						node.style.transform='none';
						node.style.transition='';
						if(lib.config.animation){
							setTimeout(function(){
								switch(game.getRarity(node.name)){
									case 'rare':node.$rare();break;
									case 'epic':node.$epic();break;
									case 'legend':node.$legend();break;
								}
							},150);
						}
					};
					// node.addEventListener('transitionEnd',onEnd);
					node.addEventListener('webkitTransitionEnd',onEnd);
				};
				var zhaomu2=function(){
					if(_status.qianfan||_status.kaibao) return;
					if(game.data.money<100) return;
					_status.chessclicked=true;
					ui.arena.classList.add('leaderhide');
					ui.arena.classList.add('leadercontrol');
					ui.money.hide();
					_status.kaibao=true;
					event.cardnodes=[];
					setTimeout(function(){
						event.cardnodes.push(cardNode(0));
						setTimeout(function(){
							event.cardnodes.push(cardNode(1));
							setTimeout(function(){
								event.cardnodes.push(cardNode(2));
								ui.money.childNodes[1].innerHTML=game.data.dust;
								game.changeMoney(-100);
								if(game.data.character.length>3){
									event.removeCharacter.style.opacity=1;
								}
								if(game.data.money<150&&!game.data._arena){
									event.enterArena.style.opacity=0.5;
								}
								else{
									event.enterArena.style.opacity=1;
								}
								if(game.data.money<100){
									event.addCharacter.style.opacity=0.5;
								}
								else{
									event.addCharacter.style.opacity=1;
								}
								initcapt();
							},200);
						},200);
					},500);
				};
				var zhaomu=function(){
					if(_status.qianfan||_status.kaibao) return;
					if(game.data.money<100) return;
					_status.chessclicked=true;
					_status.zhaomu=true;
					event.removeCharacter.style.opacity=0.5;
					event.fight.style.opacity=0.5;
					clearSelected();
					for(var i=0;i<dialog1.buttons.length;i++){
						dialog1.buttons[i].classList.add('unselectable');
					}
					for(var i=0;i<dialog2.buttons.length;i++){
						dialog2.buttons[i].classList.add('unselectable');
					}
					this.replace('确认招募',zhaomu2);
				};
				event.addCharacter=ui.create.control('招募','nozoom',zhaomu2);
				if(game.data.money<150&&!game.data._arena){
					event.enterArena.style.opacity=0.5;
				}
				if(game.data.money<100){
					event.addCharacter.style.opacity=0.5;
				}
				var qianfan=function(){
					if(_status.zhaomu||_status.kaibao) return;
					if(game.data.character.length<=3) return;
					_status.chessclicked=true;
					_status.qianfan=true;
					event.enterArena.style.opacity=0.5;
					event.addCharacter.style.opacity=0.5;
					event.fight.style.opacity=0.5;
					var current=selected.character.slice(0);
					clearSelected();
					var maxq=game.data.character.length-3;
					if(current.length<=maxq){
						for(var i=0;i<current.length;i++){
							current[i].classList.add('selected');
							selected.character.push(current[i]);
						}
					}
					for(var i=0;i<dialog1.buttons.length;i++){
						if(dialog1.buttons[i].area!='character'||maxq==current.length){
							dialog1.buttons[i].classList.add('unselectable');
						}
					}
					for(var i=0;i<dialog2.buttons.length;i++){
						dialog2.buttons[i].classList.add('unselectable');
					}
					this.replace('确认遣返',function(){
						for(var i=0;i<selected.character.length;i++){
							var node=selected.character[i];
							var rarity=game.getRarity(node.link);
							switch(rarity){
								case 'common':game.changeDust(5);break;
								case 'rare':game.changeDust(20);break;
								case 'epic':game.changeDust(100);break;
								case 'legend':game.changeDust(400);break;
							}
							game.data.character.remove(node.link);
							game.saveData();
							if(game.data.character.length<=3){
								event.removeCharacter.style.opacity=0.5;
							}
							if(game.data.money>=100){
								event.addCharacter.style.opacity=1;
							}
							if(game.data.money>=150){
								event.enterArena.style.opacity=1;
							}
							node.delete();
							dialog1.buttons.remove(node);
						}
						initcapt();
					});
				};
				event.removeCharacter=ui.create.control('遣返','nozoom',qianfan);
				if(game.data.character.length<=3){
					event.removeCharacter.style.opacity=0.5;
				}
				event.fight=ui.create.control('开始战斗','nozoom',function(){
					if(_status.kaibao||_status.zhaomu||_status.qianfan) return;
					_status.enemylist=[];
					_status.mylist=[];
					if(selected.lord.length){
						_status.mylist.push(selected.lord[0].link);
						_status.lord=selected.lord[0].link;
					}
					if(selected.character.length){
						for(var i=0;i<selected.character.length;i++){
							_status.mylist.push(selected.character[i].link);
						}
					}
					else{
						_status.mylist=_status.mylist.concat(game.data.character.randomGets(_status.lord?2:3));
					}
					if(selected.challenge.length){
						_status.challenge=selected.challenge[0].link;
						_status.enemylist.push(_status.challenge);
						switch(game.getRarity(_status.challenge)){
							case 'common':_status.challengeMoney=40;break;
							case 'rare':_status.challengeMoney=100;break;
							case 'epic':_status.challengeMoney=400;break;
							case 'legend':_status.challengeMoney=1600;break;
						}
						var rank=game.getRank(_status.challenge);
						var total=Math.max(2,_status.mylist.length-1);
						var list;
						switch(rank){
							case 's':list=lib.rank.ap;break;
							case 'ap':list=lib.rank.s.concat(lib.rank.a);break;
							case 'a':list=lib.rank.ap.concat(lib.rank.am);break;
							case 'am':list=lib.rank.a.concat(lib.rank.bp);break;
							case 'bp':list=lib.rank.am.concat(lib.rank.b);break;
							case 'b':list=lib.rank.bp.concat(lib.rank.bm);break;
							case 'bm':list=lib.rank.b.concat(lib.rank.c);break;
							case 'c':list=lib.rank.bm.concat(lib.rank.d);break;
							case 'd':list=lib.rank.c;break;
						}
						for(var i=0;i<total;i++){
							if(Math.random()<0.7){
								_status.enemylist.push(Array.prototype.randomGet.apply(
									lib.rank[rank],_status.enemylist.concat(_status.mylist)));
							}
							else{
								_status.enemylist.push(Array.prototype.randomGet.apply(
									list,_status.enemylist.concat(_status.mylist)));
							}
						}
					}
					else{
						var number,difficulty,list;
						if(selected.difficulty.length){
							difficulty=selected.difficulty[0].link[2];
						}
						else{
							difficulty='leader_easy';
						}
						_status.difficulty=difficulty;
						if(selected.number.length){
							number=selected.number[0].link[2];
							number=parseInt(number[number.length-1]);
						}
						else{
							number=3;
						}
						switch(difficulty){
							case 'leader_easy':list=lib.rank.d.concat(lib.rank.c).concat(lib.rank.bm);break;
							case 'leader_medium':list=lib.rank.b.concat(lib.rank.bp).concat(lib.rank.am);break;
							case 'leader_hard':list=lib.rank.a.concat(lib.rank.ap).concat(lib.rank.s);break;
						}
						for(var i=0;i<lib.hiddenCharacters.length;i++){
							if(list.length<=number){
								break;
							}
							list.remove(lib.hiddenCharacters[i]);
						}
						for(var i=0;i<_status.mylist.length;i++){
							list.remove(_status.mylist[i]);
						}
						_status.enemylist=list.randomGets(number);
					}
					var numdel=_status.enemylist.length-_status.mylist.length;
					var reward=0;
					for(var i=0;i<_status.enemylist.length;i++){
						switch(game.getRank(_status.enemylist[i])){
							case 's':reward+=50;break;
							case 'ap':reward+=40;break;
							case 'a':reward+=32;break;
							case 'am':reward+=25;break;
							case 'bp':reward+=19;break;
							case 'b':reward+=14;break;
							case 'bm':reward+=10;break;
							case 'c':reward+=7;break;
							case 'd':reward+=5;break;
						}
					}
					if(numdel>0){
						switch(difficulty){
							case 'leader_easy':reward+=10*numdel;break;
							case 'leader_medium':reward+=20*numdel;break;
							case 'leader_hard':reward+=40*numdel;break;
						}
					}
					var punish=0;
					for(var i=0;i<_status.mylist.length;i++){
						switch(game.getRank(_status.mylist[i])){
							case 's':punish+=25;break;
							case 'ap':punish+=20;break;
							case 'a':punish+=16;break;
							case 'am':punish+=12;break;
							case 'bp':punish+=9;break;
							case 'b':punish+=7;break;
							case 'bm':punish+=5;break;
							case 'c':punish+=3;break;
							case 'd':punish+=2;break;
						}
					}
					if(numdel<0){
						switch(difficulty){
							case 'leader_easy':punish-=5*numdel;break;
							case 'leader_medium':punish-=10*numdel;break;
							case 'leader_hard':punish-=20*numdel;break;
						}
					}
					game.reward=Math.max(3*_status.enemylist.length,reward-punish);
					if(!_status.lord){
						switch(difficulty){
							case 'leader_easy':game.reward+=10;break;
							case 'leader_medium':game.reward+=20;break;
							case 'leader_hard':game.reward+=40;break;
						}
					}
					game.resume();
				});
				event.custom.replace.button=function(button){
					if(_status.kaibao) return;
					if(button.classList.contains('unselectable')&&
						!button.classList.contains('selected')) return;
					_status.chessclicked=true;
					button.classList.toggle('selected');
					if(button.classList.contains('selected')){
						selected[button.area].add(button);
					}
					else{
						selected[button.area].remove(button);
					}
					switch(button.area){
						case 'lord':{
							for(var i=0;i<dialog1.buttons.length;i++){
								if(dialog1.buttons[i].area=='lord'){
									if(selected.lord.length){
										dialog1.buttons[i].classList.add('unselectable');
									}
									else{
										dialog1.buttons[i].classList.remove('unselectable');
									}
								}
							}
							break;
						}
						case 'character':{
							for(var i=0;i<dialog1.buttons.length;i++){
								if(dialog1.buttons[i].area=='character'){
									var maxq=game.data.character.length-3;
									if((!_status.qianfan&&selected.character.length>5)||
										(_status.qianfan&&selected.character.length>=maxq)){
										dialog1.buttons[i].classList.add('unselectable');
									}
									else{
										dialog1.buttons[i].classList.remove('unselectable');
									}
								}
							}
							break;
						}
						case 'difficulty':case 'number':{
							for(var i=0;i<dialog2.buttons.length;i++){
								if(dialog2.buttons[i].area==button.area){
									if(selected[button.area].length){
										dialog2.buttons[i].classList.add('unselectable');
									}
									else{
										dialog2.buttons[i].classList.remove('unselectable');
									}
								}
							}
							break;
						}
						case 'challenge':{
							if(selected.challenge.length){
								for(var i=0;i<dialog2.buttons.length;i++){
									if(dialog2.buttons[i].area=='challenge'){
										dialog2.buttons[i].classList.add('unselectable');
									}
									else{
										dialog2.buttons[i].classList.add('unselectable');
										dialog2.buttons[i].classList.remove('selected');
									}
								}
							}
							else{
								for(var i=0;i<dialog2.buttons.length;i++){
									dialog2.buttons[i].classList.remove('unselectable');
								}
							}
							break;
						}
					}
				};
				event.custom.add.window=function(){
					if(!_status.kaibao){
						var glows=document.querySelectorAll('.button.glow2');
						for(var i=0;i<glows.length;i++){
							glows[i].classList.remove('glow2');
						}
					}
					if(_status.chessclicked){
						_status.chessclicked=false;
						return;
					}
					if(_status.kaibao&&event.cardnodes&&event.cardnodes.length){
						for(var i=0;i<event.cardnodes.length;i++){
							if(!event.cardnodes[i].turned) return;
						}
						for(var i=0;i<event.cardnodes.length;i++){
							event.cardnodes[i].delete();
						}
						ui.arena.classList.remove('leaderhide');
						setTimeout(function(){
							ui.arena.classList.remove('leadercontrol');
						},500);
						ui.money.show();
						delete event.cardnodes;
						_status.kaibao=false;
						return;
					}
					if(_status.qianfan){
						_status.qianfan=false;
						event.removeCharacter.replace('遣返',qianfan);
						if(game.data.money>=100){
							event.addCharacter.style.opacity=1;
						}
						else{
							event.addCharacter.style.opacity=0.5;
						}
						if(game.data.money>=150||game.data._arena){
							event.enterArena.style.opacity=1;
						}
						else{
							event.enterArena.style.opacity=0.5;
						}
						event.fight.style.opacity=1;
					}
					else if(_status.zhaomu){
						_status.zhaomu=false;
						event.addCharacter.replace('招募',zhaomu);
						if(game.data.character.length>3){
							event.removeCharacter.style.opacity=1;
						}
						else{
							event.removeCharacter.style.opacity=0.5;
						}
						event.fight.style.opacity=1;
					}
					clearSelected();
				};
				game.pause();
				'step 2'
				if(!game.data.arena){
					event.dialog1.close();
					event.dialog2.close();
					event.fight.close();
					event.enterArena.close();
					event.addCharacter.close();
					event.removeCharacter.close();
				}
				ui.arena.classList.add('leaderhide');
				ui.money.hide();
				game.delay();
				'step 3'
				ui.arena.classList.remove('leaderhide');
				if(!_status.enterArena){
					ui.wuxie.show();
					ui.auto.show();
					ui.control.style.display='none';
					ui.control.style.top='';
					ui.control.style.transition='';
					event.finish();
				}
				else{
					game.minskin=false;
					event.arenanodes=[];
					event.arenachoice=[];
					event.arenachoicenodes=[];
					event.arrangeNodes=function(){
						var num=event.arenachoicenodes.length;
						var width=num*75+(num-1)*8;
						for(var i=0;i<event.arenachoicenodes.length;i++){
							var left=-width/2+i*83-37.5;
							if(left<0){
								event.arenachoicenodes[i].style.left='calc(50% - '+(-left)+'px)';
							}
							else{
								event.arenachoicenodes[i].style.left='calc(50% + '+left+'px)';
							}
						}
					}
					event.clickNode=function(){
						if(this.classList.contains('removing')) return;
						if(this.isChosen){
							if(_status.chessgiveup) return;
							if(!event.choosefinished) return;
							if(this.classList.contains('unselectable')&&
								!this.classList.contains('selected')) return;
							_status.chessclicked=true;
							this.classList.toggle('selected');
							if(this.classList.contains('selected')){
								this.style.transform='scale(0.85)';
							}
							else{
								this.style.transform='scale(0.8)';
							}
							if(document.querySelectorAll('.player.selected').length>=3){
								for(var i=0;i<event.arenachoicenodes.length;i++){
									if(!event.arenachoicenodes[i].classList.contains('dead')){
										event.arenachoicenodes[i].classList.add('unselectable');
									}
								}
							}
							else{
								for(var i=0;i<event.arenachoicenodes.length;i++){
									event.arenachoicenodes[i].classList.remove('unselectable');
								}
							}
						}
						else{
							while(event.arenanodes.length){
								var node=event.arenanodes.shift();
								if(node==this){
									node.node.hp.hide();
									node.style.transform='scale(0.5)';
									node.style.top='calc(50% + 50px)';
									event.arenachoicenodes.push(node);
									event.arrangeNodes();
								}
								else{
									node.delete();
								}
							}
							this.isChosen=true;
							event.arenachoice.push(this.name);
							game.resume();
						}
					}
				}
				'step 4'
				var choice;
				if(game.data._arena){
					game.data.arena=game.data._arena;
					delete game.data._arena;
				}
				if(game.data.arena&&!_status.arenaLoaded){
					game.data.arena.loaded=true;
					event.arenachoice=game.data.arena.arenachoice;
					for(var i=0;i<event.arenachoice.length;i++){
						var node=event.cardNode(0,event.arenachoice[i],true);
						node.node.hp.style.display='none';
						node.init(node.name);
						node.isChosen=true;
						node.listen(event.clickNode);
						node.style.transform='scale(0.5)';
						node.style.top='calc(50% + 50px)';
						event.arenachoicenodes.push(node);
					}
					event.arrangeNodes();
					for(var i=0;i<event.arenachoicenodes.length;i++){
						var node=event.arenachoicenodes[i];
						if(game.data.arena.choice){
							ui.refresh(node);
							node.style.opacity=1;
						}
					}
					if(game.data.arena.choice){
						choice=game.data.arena.choice;
					}
					else{
						return;
					}
				}
				else{
					switch(event.arenachoice.length){
						case 0:choice=lib.rank.d.randomGets(3);break;
						case 1:choice=lib.rank.c.randomGets(3);break;
						case 2:choice=lib.rank.bm.randomGets(3);break;
						case 3:choice=lib.rank.b.randomGets(3);break;
						case 4:choice=lib.rank.bp.randomGets(3);break;
						case 5:choice=lib.rank.am.randomGets(3);break;
						case 6:choice=lib.rank.a.randomGets(3);break;
						case 7:choice=lib.rank.ap.randomGets(3);break;
						case 8:choice=lib.rank.s.randomGets(3);break;
					}
					game.data.arena={
						win:0,
						dead:[],
						acted:[],
						choice:choice,
						arenachoice:event.arenachoice
					}
					game.saveData();
				}
				_status.arenaLoaded=true;
				var node;
				node=event.cardNode(0,choice[0]);
				node.init(node.name);
				node.listen(event.clickNode);
				event.arenanodes.push(node);
				setTimeout(function(){
					node=event.cardNode(1,choice[1]);
					node.init(node.name);
					node.listen(event.clickNode);
					if(event.choosefinished){
						node.delete();
					}
					else{
						event.arenanodes.push(node);
					}
					setTimeout(function(){
						node=event.cardNode(2,choice[2]);
						node.init(node.name);
						node.listen(event.clickNode);
						if(event.choosefinished){
							node.delete();
						}
						else{
							event.arenanodes.push(node);
						}
					},200);
				},200);
				game.pause();
				'step 5'
				if(event.arenachoice.length<9){
					event.goto(4);
				}
				else{
					if(_status.arenaLoaded){
						game.delay(2);
					}
					game.data.arena.arenachoice=event.arenachoice;
					delete game.data.arena.choice;
					game.saveData();
					event.choosefinished=true;
				}
				'step 6'
				game.minskin=true;
				ui.arena.classList.add('noleft');
				var nodes=event.arenachoicenodes;
				for(var i=0;i<nodes.length;i++){
					nodes[i].style.transform='scale(0.8)';
				}
				if(_status.arenaLoaded){
					setTimeout(function(){
						nodes[0].style.left='calc(50% - 215px)';
						nodes[0].style.top='calc(50% - 260px)';
					},0);
					setTimeout(function(){
						nodes[1].style.left='calc(50% - 75px)';
						nodes[1].style.top='calc(50% - 260px)';
					},50);
					setTimeout(function(){
						nodes[2].style.left='calc(50% + 65px)';
						nodes[2].style.top='calc(50% - 260px)';
					},100);
					setTimeout(function(){
						nodes[3].style.left='calc(50% - 215px)';
						nodes[3].style.top='calc(50% - 90px)';
					},150);
					setTimeout(function(){
						nodes[4].style.left='calc(50% - 75px)';
						nodes[4].style.top='calc(50% - 90px)';
					},200);
					setTimeout(function(){
						nodes[5].style.left='calc(50% + 65px)';
						nodes[5].style.top='calc(50% - 90px)';
					},250);
					setTimeout(function(){
						nodes[6].style.left='calc(50% - 215px)';
						nodes[6].style.top='calc(50% + 80px)';
					},300);
					setTimeout(function(){
						nodes[7].style.left='calc(50% - 75px)';
						nodes[7].style.top='calc(50% + 80px)';
					},350);
					setTimeout(function(){
						nodes[8].style.left='calc(50% + 65px)';
						nodes[8].style.top='calc(50% + 80px)';
					},400);
				}
				else{
					nodes[0].style.left='calc(50% - 215px)';
					nodes[0].style.top='calc(50% - 260px)';
					nodes[1].style.left='calc(50% - 75px)';
					nodes[1].style.top='calc(50% - 260px)';
					nodes[2].style.left='calc(50% + 65px)';
					nodes[2].style.top='calc(50% - 260px)';
					nodes[3].style.left='calc(50% - 215px)';
					nodes[3].style.top='calc(50% - 90px)';
					nodes[4].style.left='calc(50% - 75px)';
					nodes[4].style.top='calc(50% - 90px)';
					nodes[5].style.left='calc(50% + 65px)';
					nodes[5].style.top='calc(50% - 90px)';
					nodes[6].style.left='calc(50% - 215px)';
					nodes[6].style.top='calc(50% + 80px)';
					nodes[7].style.left='calc(50% - 75px)';
					nodes[7].style.top='calc(50% + 80px)';
					nodes[8].style.left='calc(50% + 65px)';
					nodes[8].style.top='calc(50% + 80px)';
					for(var i=0;i<nodes.length;i++){
						ui.refresh(nodes[i]);
						if(game.data.arena.dead.contains(nodes[i].name)){
							nodes[i].classList.add('dead');
							nodes[i].style.opacity=0.3;
						}
						else{
							nodes[i].style.opacity=1;
							if(game.data.arena.acted.contains(nodes[i].name)){
								var acted=nodes[i].node.action;
								acted.style.opacity=1;
								acted.innerHTML='疲劳';
								acted.dataset.nature='soilm';
								acted.classList.add('freecolor');
							}
						}
					}
				}

				var victory=ui.create.div().hide();
				victory.innerHTML='<span>'+game.data.arena.win+'</span>胜';
				victory.style.top='auto';
				victory.style.left='auto';
				victory.style.right='20px';
				victory.style.bottom='15px';
				victory.style.fontSize='30px'
				victory.style.fontFamily='huangcao';
				victory.firstChild.style.marginRight='5px';
				ui.window.appendChild(victory);
				ui.refresh(victory);
				victory.show();

				event.checkPrize=function(){
					// event.kaibao=true;
					event.prize=[];
					event.turnCard2=function(){
						if(this.turned) return;
						_status.chessclicked=true;
						this.turned=true;
						var node=this;
						setTimeout(function(){
							node.turned2=true;
						},1000);
						if(node.name=='chess_coin'||node.name=='chess_dust'){
							node.style.transition='all 0s';
							node.style.transform='none';
							node.style.overflow='visible';
							node.style.background='none';
							node.style.boxShadow='none';
							var div=ui.create.div(node);
							div.style.transition='all 0s';
							if(node.name=='chess_coin'){
								div.innerHTML='<span>㉤</span><span>'+node.num+'</span>';
								div.firstChild.style.color='rgb(255, 230, 0)';
								node.$coin();
							}
							else{
								div.innerHTML='<span>⚑</span><span>'+node.num+'</span>';
								div.firstChild.style.color='rgb(111, 198, 255)';
								div.firstChild.style.marginRight='3px';
								node.$dust();
							}
							div.style.fontFamily='huangcao';
							div.style.fontSize='50px';
							div.style.top='40px';
							div.style.letterSpacing='8px';
							div.style.whiteSpace='nowrap';
							// div.dataset.nature='metal';

							return;
						}
						node.style.transition='all ease-in 0.3s';
						node.style.transform='perspective(1200px) rotateY(270deg) translateX(150px)';
						var onEnd=function(){
							node.init(node.name);
							node.node.avatar.style.display='';
							if(node.rarity){
								node.node.intro.innerHTML=get.translation(node.rarity);
								node.node.intro.classList.add('showintro');
							}
							node.classList.add('playerflip');
							node.style.transform='none';
							node.style.transition='';
							if(lib.config.animation){
								setTimeout(function(){
									switch(game.getRarity(node.name)){
										case 'rare':node.$rare();break;
										case 'epic':node.$epic();break;
										case 'legend':node.$legend();break;
									}
								},150);
							}
						};
						// node.addEventListener('transitionEnd',onEnd);
						node.addEventListener('webkitTransitionEnd',onEnd);
					};
					setTimeout(function(){
						nodes[0].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						nodes[1].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						nodes[2].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						nodes[3].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						nodes[4].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						nodes[5].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						nodes[6].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						nodes[7].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						nodes[8].delete();
					},400+Math.random()*300);
					setTimeout(function(){
						var prize=new Array(6);
						var map=[1,2,3,4,5];
						var ccount=3;
						var win=game.data.arena.win;
						var prizeValue;
						switch(win){
							case 0:prizeValue=100;break;
							case 1:prizeValue=120;break;
							case 2:prizeValue=150;break;
							case 3:prizeValue=190;break;
							case 4:prizeValue=240;break;
							case 5:prizeValue=300;break;
							case 6:prizeValue=370;break;
							case 7:prizeValue=450;break;
							case 8:prizeValue=540;break;
							case 9:prizeValue=640;break;
							case 10:prizeValue=750;break;
							case 11:prizeValue=870;break;
							case 12:prizeValue=1000;break;
						}
						if(Math.random()<0.4){
							if(win>=3&&Math.random()<0.5){
								ccount=4;
								prizeValue-=33;
							}
							else{
								ccount=2;
								prizeValue+=33;
							}
						}
						prizeValue-=100;
						while(ccount--){
							prize[map.randomRemove()]=game.getLeaderCharacter();
						}
						if(map.length){
							prizeValue/=map.length;
						}
						while(map.length){
							var val=Math.round((Math.random()*0.4+0.8)*prizeValue);
							if(Math.random()<0.7){
								prize[map.shift()]=['chess_coin',Math.max(Math.ceil(Math.random()*5),val)];
							}
							else{
								val=Math.round(val/3);
								prize[map.shift()]=['chess_dust',Math.max(Math.ceil(Math.random()*3),val)];
							}
						}
						for(var i=1;i<prize.length;i++){
							if(typeof prize[i]=='string'){
								var name=prize[i];
								var rarity=game.getRarity(name);
								if(!game.data.character.contains(name)){
									game.data.character.push(name);
									if(game.data.challenge.contains(name)){
										game.data.challenge=game.getLeaderList();
									}
								}
								else{
									switch(rarity){
										case 'common':game.data.dust+=10;break;
										case 'rare':game.data.dust+=30;break;
										case 'epic':game.data.dust+=150;break;
										case 'legend':game.data.dust+=600;break;
									}
								}
							}
							else if(prize[i][0]=='chess_coin'){
								game.data.money+=prize[i][1];
							}
							else{
								game.data.dust+=prize[i][1];
							}
							setTimeout((function(i){
								return function(){
									var node;
									if(typeof prize[i]=='string'){
										node=event.cardNode('5'+i,prize[i]);
									}
									else{
										node=event.cardNode('5'+i,prize[i][0]);
										node.num=prize[i][1];
									}
									event.prize.push(node);
									if(i==prize.length-1){
										event.kaibao=true;
									}
								};
							}(i)),i*200);
						}
						delete game.data.arena;
						game.saveData();
					},1000);
				}
				if(game.data.arena.dead.length<9&&game.data.arena.win<12){
					event.arenafight=ui.create.control('开始战斗','nozoom',function(){
						if(_status.chessgiveup) return;
						_status.mylist=[];
						var list=[];
						for(var i=0;i<nodes.length;i++){
							if(nodes[i].classList.contains('selected')){
								_status.mylist.push(nodes[i].name);
							}
							else if(!nodes[i].classList.contains('dead')){
								list.push(nodes[i].name);
							}
						}
						if(_status.mylist.length==0){
							_status.mylist=list.randomGets(3);
						}
						if(_status.mylist.length==0) return;
						for(var i=0;i<_status.mylist.length;i++){
							game.data.arena.dead.push(_status.mylist[i]);
						}
						game.saveData();
						switch(game.data.arena.win){
							case 0:list=lib.rank.d.concat(lib.rank.c);break;
							case 1:list=lib.rank.c.concat(lib.rank.bm);break;
							case 2:list=lib.rank.bm.concat(lib.rank.b);break;
							case 3:list=lib.rank.b.concat(lib.rank.bp);break;
							case 4:list=lib.rank.bp.concat(lib.rank.am);break;
							case 5:list=lib.rank.am.concat(lib.rank.a);break;
							case 6:list=lib.rank.a.concat(lib.rank.ap);break;
							default:list=lib.rank.ap.concat(lib.rank.s);
						}
						for(var i=0;i<_status.mylist.length;i++){
							list.remove(_status.mylist[i]);
						}
						_status.enemylist=list.randomGets(3);
						for(var i=0;i<nodes.length;i++){
							nodes[i].delete();
						}
						victory.delete();
						event.arenafight.close();
						event.arenaback.close();
						event.arenagiveup.close();
						game.resume();
					});
					event.arenaback=ui.create.control('返回','nozoom',function(){
						if(_status.chessgiveup) return;
						game.data._arena=game.data.arena;
						delete game.data.arena;
						game.saveData();
						game.reload();
					});
					var giveup=function(){
						_status.chessclicked=true;
						_status.chessgiveup=true;
						event.arenafight.style.opacity=0.5;
						event.arenaback.style.opacity=0.5;
						this.replace('确认放弃',function(){
							_status.chessclicked=true;
							event.arenafight.close();
							event.arenaback.close();
							event.arenagiveup.close();
							event.checkPrize();
						});
					};
					event.arenagiveup=ui.create.control('放弃','nozoom',giveup);
				}
				else{
					event.checkPrize();
				}

				event.custom.add.window=function(){
					if(_status.chessclicked){
						_status.chessclicked=false;
						return;
					}
					if(event.kaibao){
						for(var i=0;i<event.prize.length;i++){
							if(!event.prize[i].turned2){
								return;
							}
						}
						game.reload();
					}
					_status.chessgiveup=false;
					event.arenafight.style.opacity=1;
					event.arenaback.style.opacity=1;
					event.arenagiveup.replace('放弃',giveup);
					for(var i=0;i<nodes.length;i++){
						nodes[i].style.transform='scale(0.8)';
						nodes[i].classList.remove('selected');
						nodes[i].classList.remove('unselectable');
					}
				};
				game.pause();
				'step 7'
				ui.control.style.display='none';
				ui.control.style.top='';
				ui.control.style.transition='';
				ui.arena.classList.remove('leaderhide');
				ui.wuxie.show();
				ui.auto.show();
				game.delay();
			}
		},
		saveData:function(){
			game.save(get.config('chess_leader_save'),game.data);
		},
		getRank:function(name){
			if(name==_status.lord) return 'ap';
			var rank=lib.rank;
			if(rank.s.contains(name)) return 's';
			if(rank.ap.contains(name)) return 'ap';
			if(rank.a.contains(name)) return 'a';
			if(rank.am.contains(name)) return 'am';
			if(rank.bp.contains(name)) return 'bp';
			if(rank.b.contains(name)) return 'b';
			if(rank.bm.contains(name)) return 'bm';
			if(rank.c.contains(name)) return 'c';
			if(rank.d.contains(name)) return 'd';
			return 'x';
		},
		getLeaderList:function(){
			var list=lib.rank.all.slice(0);
			for(var i=0;i<game.data.character.length;i++){
				list.remove(game.data.character[i]);
			}
			if(!list.length){
				return ['chess_xingtian'];
			}
			return list.randomGets(6);
		},
		getLeaderCharacter:function(){
			var pleg;
			if(game.data.legend<=20){
				pleg=0.01;
			}
			else{
				pleg=0.01+(game.data.legend-20)*(game.data.legend-20)*0.99/10000;
			}
			if(Math.random()<pleg){
				game.data.legend=0;
				game.saveData();
				return lib.rank.legend.randomGet();
			}
			game.data.legend++;
			game.saveData();
			if(Math.random()<0.05) return lib.rank.epic.randomGet();
			if(Math.random()<0.3) return lib.rank.rare.randomGet();
			return lib.rank.common.randomGet();
		},
		changeMoney:function(num){
			game.data.money+=num;
			game.saveData();
			ui.money.lastChild.innerHTML=game.data.money;
		},
		changeDust:function(num){
			game.data.dust+=num;
			game.saveData();
			ui.money.childNodes[1].innerHTML=game.data.dust;
		},
		getRarity:function(name){
			var rank=lib.rank;
			if(rank.legend.contains(name)) return 'legend';
			if(rank.epic.contains(name)) return 'epic';
			if(rank.rare.contains(name)) return 'rare';
			return 'common';
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
				ui.wuxie.hide();
				var i;
				var list=[];
				var bosslist=[];
				event.list=list;
				for(i in lib.character){
					if(i.indexOf('treasure_')==0) continue;
					if(lib.character[i][4].contains('minskin')) continue;
					if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidall.contains(i)) continue;
					if(lib.config.forbidchess.contains(i)) continue;
					if(get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
					if(lib.character[i][4].contains('boss')){
						bosslist.push(i);
					}
					else{
						list.push(i);
					}
				}
				list.randomSort();
				var bosses=ui.create.div('.buttons');
				event.bosses=bosses;
				var bossbuttons=ui.create.buttons(bosslist,'character',bosses);
				var addToButton=function(){
					if(ui.cheat2&&ui.cheat2.backup) return;
					_status.event.dialog.content.childNodes[1].innerHTML=
					ui.selected.buttons.length+'/'+_status.event.selectButton();
				};
				var clickedBoss=false;
				var clickBoss=function(){
					clickedBoss=true;
					var num=bosses.querySelectorAll('.glow').length;
					if(this.classList.contains('glow')){
						this.classList.remove('glow');
						num--;
					}
					else{
						if(num<4){
							this.classList.add('glow');
							num++;
						}
					}
					for(var i=0;i<bosses.childElementCount;i++){
						if(num>=4&&!bosses.childNodes[i].classList.contains('glow')){
							bosses.childNodes[i].classList.add('forbidden');
						}
						else{
							bosses.childNodes[i].classList.remove('forbidden');
						}
					}
					if(num){
						if(!event.asboss){
							event.asboss=ui.create.control('应战',function(){
								_status.boss=true;
								ui.click.ok();
							});
						}
					}
					else{
						if(event.asboss){
							event.asboss.close();
							delete event.asboss;
						}
					}
					addToButton();
				};
				for(var i=0;i<bossbuttons.length;i++){
					bossbuttons[i].classList.add('noclick');
					bossbuttons[i].listen(clickBoss);
				}
				var dialog=ui.create.dialog('选择出场角色');
				dialog.classList.add('fullwidth');
				dialog.classList.add('fullheight');
				dialog.add('0/'+get.config('battle_number'));
				dialog.add([list.slice(0,parseInt(get.config('battle_number'))*4+5),'character']);
				if(bossbuttons.length){
					dialog.add('挑战魔王');
					dialog.add(bosses);
				}
				ui.control.style.transition='all 0s';
				if(lib.config.layout=='mobile'){
					ui.control.style.top='calc(100% - 70px)';
				}
				else if(lib.config.layout=='phone'){
					ui.control.style.top='calc(100% - 80px)';
				}
				else{
					ui.control.style.top='calc(100% - 30px)';
				}

				var next=game.me.chooseButton(dialog,true);
				next._triggered=null;
				next.selectButton=function(){
					var bossnum=bosses.querySelectorAll('.glow').length;
					if(bossnum){
						return 3*bossnum;
					}
					return parseInt(get.config('battle_number'));
				};
				next.custom.add.button=addToButton;
				next.custom.add.window=function(clicked){
					if(clicked) return;
					if(clickedBoss){
						clickedBoss=false;
					}
					else{
						for(var i=0;i<bosses.childElementCount;i++){
							bosses.childNodes[i].classList.remove('forbidden');
							bosses.childNodes[i].classList.remove('glow');
						}
						if(event.asboss){
							event.asboss.close();
							delete event.asboss;
						}
					}
					addToButton();
				}
				event.changeDialog=function(){
					if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
						return;
					}
					list.randomSort();
					_status.event.dialog.close();
					var dialog=ui.create.dialog('选择出场角色');
					_status.event.dialog=dialog;
					dialog.classList.add('fullwidth');
					dialog.classList.add('fullheight');
					dialog.add('0/'+_status.event.selectButton());
					dialog.add([list.slice(0,parseInt(get.config('battle_number'))*4+5),'character']);
					if(bossbuttons.length){
						dialog.add('挑战魔王');
						dialog.add(bosses);
					}
					game.uncheck();
					game.check();
				};
				ui.create.cheat=function(){
					_status.createControl=ui.cheat2;
					ui.cheat=ui.create.control('更换',event.changeDialog);
					delete _status.createControl;
				};
				event.dialogxx=ui.create.characterDialog();
				event.dialogxx.classList.add('fullwidth');
				event.dialogxx.classList.add('fullheight');
				ui.create.cheat2=function(){
					ui.cheat2=ui.create.control('自由选将',function(){
						if(this.dialog==_status.event.dialog){
							this.dialog.close();
							_status.event.dialog=this.backup;
							this.backup.open();
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
							this.dialog.open();
							game.uncheck();
							game.check();
							if(ui.cheat){
								ui.cheat.style.opacity=0.6;
							}
						}
					});
				}
				if(!ui.cheat&&get.config('change_choice'))
				ui.create.cheat();
				if(!ui.cheat2&&get.config('free_choose'))
				ui.create.cheat2();
				"step 1"
				ui.wuxie.show();
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
				if(event.asboss){
					event.asboss.close();
					delete ui.asboss;
				}
				ui.control.style.display='none';
				ui.control.style.top='';
				ui.control.style.transition='';



				_status.mylist=result.links.slice(0);
				for(var i=0;i<result.links.length;i++){
					event.list.remove(result.links[i]);
				}
				var glows=event.bosses.querySelectorAll('.glow');
				if(glows.length){
					_status.enemylist=[];
					for(var i=0;i<glows.length;i++){
						_status.enemylist.push(glows[i].link);
					}
					if(_status.boss){
						var temp=_status.mylist;
						_status.mylist=_status.enemylist;
						_status.enemylist=temp;
						for(var i=_status.enemylist.length;i<_status.mylist.length*3;i++){
							_status.enemylist.push(event.list.randomRemove());
						}
					}
				}
				else{
					event.list.randomSort();
					_status.enemylist=event.list.slice(0,result.links.length);
				}
			}
		},
		modeSwapPlayer:function(player){
			var content=[game.me.dataset.position,player.dataset.position];
			game.me.node.avatar.classList.remove('glow2');
			player.node.avatar.classList.add('glow2');
			game.addVideo('chessSwap',null,content);
			game.swapControl(player);
			player.chessFocus();
			ui.create.fakeme();
		}
	},
	skill:{
		_attackmove:{
			trigger:{player:'damageEnd'},
			forced:true,
			popup:false,
			priority:50,
			filter:function(event,player){
				if(!get.config('attack_move')) return false;
				if(!event.source) return false;
				if(get.distance(event.source,player,'pure')>1) return false;
				if(event.num<1) return false;
				var xy1=event.source.getXY();
				var xy2=player.getXY();
				var dx=xy2[0]-xy1[0];
				var dy=xy2[1]-xy1[1];
				if(dx==0&&Math.abs(dy)==2){
					dy/=2;
				}
				if(dy==0&&Math.abs(dx)==2){
					dx/=2;
				}
				return player.movable(dx,dy);
			},
			content:function(){
				var xy1=trigger.source.getXY();
				var xy2=player.getXY();
				var dx=xy2[0]-xy1[0];
				var dy=xy2[1]-xy1[1];
				if(dx==0&&Math.abs(dy)==2){
					dy/=2;
				}
				if(dy==0&&Math.abs(dx)==2){
					dx/=2;
				}
				if(player.movable(dx,dy)){
					player.move(dx,dy);
				}
			}
		},
		dubiaoxianjing:{
			global:'dubiaoxianjing2'
		},
		dubiaoxianjing2:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				if(player.hp<=1) return false;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_dubiaoxianjing'){
						return get.chessDistance(game.treasures[i],player)<=2;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				var source=null;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_dubiaoxianjing'){
						source=game.treasures[i];break;
					}
				}
				if(source){
					source.chessFocus();
					source.playerfocus(1000);
					source.line(player,'thunder');
					if(lib.config.animation){
						setTimeout(function(){
							source.$epic2();
						},300);
					}
					game.delay(2);
				}
				else{
					event.finish();
				}
				'step 1'
				game.log('毒镖陷阱发动');
				player.damage('nosource');
				player.draw(2);
			}
		},
		jiqishi:{
			global:'jiqishi2'
		},
		jiqishi2:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				if(player.hp==player.maxHp) return false;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_jiqishi'){
						return get.chessDistance(game.treasures[i],player)<=2;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				var source=null;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_jiqishi'){
						source=game.treasures[i];break;
					}
				}
				if(source){
					source.chessFocus();
					source.playerfocus(1000);
					source.line(player,'thunder');
					if(lib.config.animation){
						setTimeout(function(){
							source.$epic2();
						},300);
					}
					game.delay(2);
				}
				else{
					event.finish();
				}
				'step 1'
				game.log('集气石发动');
				player.recover('nosource');
				var he=player.get('he');
				if(he.length){
					player.discard(he.randomGets(2));
				}
			}
		},
		wuyashenxiang:{
			global:'wuyashenxiang2'
		},
		wuyashenxiang2:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				if(player.hp>1) return false;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_wuyashenxiang'){
						return get.chessDistance(game.treasures[i],player)<=3;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				var source=null;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_wuyashenxiang'){
						source=game.treasures[i];break;
					}
				}
				if(source){
					source.chessFocus();
					source.playerfocus(1000);
					source.line(player,'thunder');
					if(lib.config.animation){
						setTimeout(function(){
							source.$epic2();
						},300);
					}
					game.delay(2);
				}
				else{
					event.finish();
				}
				'step 1'
				game.log('乌鸦神像发动');
				player.recover('nosource');
				player.draw();
				var card=get.cardPile(function(c){
					return get.type(c)=='delay';
				});
				if(card){
					player.addJudge(card);
				}
			}
		},
		shenpanxianjing:{
			global:'shenpanxianjing2'
		},
		shenpanxianjing2:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				var nh=player.num('h');
				if(!nh) return false;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_shenpanxianjing'){
						for(var j=0;j<game.players.length;j++){
							if(game.players[j].num('h')>nh) return false;
						}
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				var source=null;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_shenpanxianjing'){
						source=game.treasures[i];break;
					}
				}
				if(source){
					source.chessFocus();
					source.playerfocus(1000);
					source.line(player,'thunder');
					if(lib.config.animation){
						setTimeout(function(){
							source.$epic2();
						},300);
					}
					game.delay(2);
				}
				else{
					event.finish();
				}
				'step 1'
				game.log('审判之刃发动');
				var hs=player.get('h');
				if(hs.length){
					player.discard(hs.randomGet());
				}
			}
		},
		shiyuansu:{
			global:'shiyuansu2'
		},
		shiyuansu2:{
			trigger:{player:'damageAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				if(event.num<2) return false;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_shiyuansu'){
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				game.delayx();
				'step 1'
				var source=null;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_shiyuansu'){
						source=game.treasures[i];break;
					}
				}
				if(source){
					source.chessFocus();
					source.playerfocus(1000);
					source.line(player,'thunder');
					if(lib.config.animation){
						setTimeout(function(){
							source.$epic2();
						},300);
					}
					game.delay(2);
				}
				else{
					event.finish();
				}
				'step 2'
				game.log('石元素像发动');
				player.changeHujia();
			}
		},
		shenmidiaoxiang:{
			global:'shenmidiaoxiang2'
		},
		shenmidiaoxiang2:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_shenmidiaoxiang'){
						return player.canMoveTowards(game.treasures[i])&&
							get.chessDistance(game.treasures[i],player)>3;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				var source=null;
				for(var i=0;i<game.treasures.length;i++){
					if(game.treasures[i].name=='treasure_shenmidiaoxiang'){
						source=game.treasures[i];break;
					}
				}
				if(source){
					event.source=source;
					source.chessFocus();
					source.playerfocus(1000);
					source.line(player,'thunder');
					if(lib.config.animation){
						setTimeout(function(){
							source.$epic2();
						},300);
					}
					game.delay(2);
				}
				else{
					event.finish();
				}
				'step 1'
				game.log('神秘雕像发动');
				player.moveTowards(event.source);
			}
		},
		arenaAdd:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return _status.enterArena&&player.side==game.me.side&&game.data.arena.arenachoice.length>game.data.arena.dead.length;
			},
			direct:true,
			delay:0,
			preservecancel:true,
			content:function(){
				"step 0"
				var list=game.data.arena.arenachoice.slice(0);
				for(var i=0;i<game.data.arena.dead.length;i++){
					list.remove(game.data.arena.dead[i]);
				}
				event.dialog=ui.create.dialog('选择一个出场武将',[list,'character']);
				game.pause();
				_status.imchoosing=true;
				event.custom.replace.button=function(button){
					event.choice=button.link;
					game.resume();
				}
				event.custom.replace.confirm=game.resume;
				event.switchToAuto=game.resume;
				"step 1"
				_status.imchoosing=false;
				event.dialog.close();
				if(event.choice){
					var name=event.choice;
					game.addChessPlayer(name);
					game.data.arena.dead.push(name);
					game.saveData();
					if(!_status.arenaAdd){
						_status.arenaAdd=[];
					}
					_status.arenaAdd.push(name);
					game.delay();
				}
				else{
					player.getStat('skill').arenaAdd--;
				}
			},
		},
		leader_zhaoxiang:{
			unique:true,
			enable:'phaseUse',
			usable:1,
			promptfunc:function(event,player){
				var targets=[];
				var skill=lib.skill.leader_zhaoxiang;
				for(var i=0;i<game.players.length;i++){
					if(!game.data.character.contains(game.players[i].name)&&game.players[i].side!=player.side){
						targets.push(game.players[i]);
					}
				}
				var str=lib.translate.leader_zhaoxiang_info;
				if(targets.length){
					str='<p style="text-align:center;line-height:20px;margin-top:0">⚑ '+game.data.dust+
					'</p><p style="text-align:center;line-height:20px;margin-top:8px">'
					for(var i=0;i<targets.length;i++){
						str+='<span style="width:120px;display:inline-block;text-align:right">'+get.translation(targets[i])+
						'：</span><span style="width:120px;display:inline-block;text-align:left">'+
						(skill.chance(targets[i],player)*100).toFixed(2)+'%</span><br>';
					}
					str+='</p>'
				}
				return str;
			},
			chance:function(target,player){
				var chance;
				var renyi=player.skills.contains('leader_renyi');
				switch(target.hp){
					case 1:chance=0.7;break;
					case 2:chance=0.4;break;
					default:chance=0.2;break;
				}
				switch(target.num('he')){
					case 0:break;
					case 1:chance/=1.2;break;
					case 2:chance/=1.4;break;
					case 3:chance/=1.7;break;
					default:chance/=2;break;
				}
				switch(game.getRarity(target.name)){
					case 'common':{
						if(renyi) chance*=2;
						break;
					}
					case 'rare':{
						chance/=2;
						if(renyi) chance*=2;
						break;
					}
					case 'epic':{
						chance/=5;
						if(renyi) chance*=1.5;
						break;
					}
					case 'legend':{
						chance/=15;
						if(renyi) chance*=1.2;
						break;
					}
				}
				return Math.min(1,chance);
			},
			filter:function(){
				return game.data.dust>=10;
			},
			filterTarget:function(card,player,target){
				return game.isChessNeighbour(player,target)&&!game.data.character.contains(target.name);
			},
			content:function(){
				var chance=lib.skill.leader_zhaoxiang.chance(target,player);
				game.changeDust(-10);
				if(Math.random()<chance){
					_status.zhaoxiang=target.name;
					game.data.character.add(target.name);
					game.saveData();
					game.over();
				}
				else{
					game.log('招降'+get.translation(target)+'失败')
					player.popup('招降失败');
					player.damage(target);
				}
			}
		},
		leader_xiaoxiong:{
			unique:true,
			forced:true,
			trigger:{source:'damageEnd'},
			filter:function(event,player){
				return event.num>0;
			},
			content:function(){
				switch(_status.difficulty){
					case 'leader_easy':game.reward+=2*trigger.num;break;
					case 'leader_medium':game.reward+=4*trigger.num;break;
					case 'leader_hard':game.reward+=6*trigger.num;break;
				}
			}
		},
		leader_renyi:{
			unique:true,
		},
		leader_mouduan:{
			unique:true,
			global:'leader_mouduan2'
		},
		leader_mouduan2:{
			mod:{
				chessMove:function(player,current){
					if(player.side&&player.name!=_status.lord) return current+1;
				}
			}
		},
		tongshuai:{
			unique:true,
			forbid:['guozhan'],
			init:function(player){
				player.storage.tongshuai={
					list:[],
					owned:{},
					player:player,
					get:function(num){
						if(typeof num!='number') num=1;
						var player=this.player;
						while(num--){
							var name=player.storage.tongshuai.unowned.shift();
							if(!name) return;
							var skills=lib.character[name][3].slice(0);
							for(var i=0;i<skills.length;i++){
								var info=lib.skill[skills[i]];
								if(info.unique&&!info.gainable){
									skills.splice(i--,1);
								}
							}
							player.storage.tongshuai.owned[name]=skills;
							game.addVideo('chess_tongshuai',player,player.storage.tongshuai.owned);
						}
					}
				}
			},
			group:['tongshuai1','tongshuai2','tongshuai3'],
			intro:{
				content:function(storage,player){
					var str='';
					var slist=storage.owned;
					var list=[];
					for(var i in slist){
						list.push(i);
					}
					if(list.length){
						str+=get.translation(list[0]);
						for(var i=1;i<list.length;i++){
							str+='、'+get.translation(list[i]);
						}
					}
					var skill=player.additionalSkills.tongshuai;
					if(skill){
						str+='<p>当前技能：'+get.translation(skill);
					}
					return str;
				},
				mark:function(dialog,content,player){
					var slist=content.owned;
					var list=[];
					for(var i in slist){
						list.push(i);
					}
					if(list.length){
						dialog.addSmall([list,'character']);
					}
					var skill=player.additionalSkills.tongshuai;
					if(skill){
						dialog.add('<div><div class="skill">【'+get.translation(skill)+
						'】</div><div>'+lib.translate[skill+'_info']+'</div></div>');
					}
				}
			},
			// mark:true
		},
		tongshuai1:{
			trigger:{global:'gameStart'},
			forced:true,
			popup:false,
			priority:10,
			content:function(){
				for(var i=0;i<game.data.character.length;i++){
					var skills=lib.character[game.data.character[i]][3]
					var add=false;
					for(var j=0;j<skills.length;j++){
						var info=lib.skill[skills[j]];
						if(info.gainable||!info.unique){
							add=true;break;
						}
					}
					if(add){
						player.storage.tongshuai.list.push(game.data.character[i]);
					}
				}
				for(var i=0;i<game.players.length;i++){
					player.storage.tongshuai.list.remove([game.players[i].name]);
					player.storage.tongshuai.list.remove([game.players[i].name1]);
					player.storage.tongshuai.list.remove([game.players[i].name2]);
				}
				player.storage.tongshuai.unowned=player.storage.tongshuai.list.slice(0);
				player.storage.tongshuai.unowned.sort(lib.sort.random);
				if(player.storage.tongshuai.unowned.length>1){
					player.storage.tongshuai.get(2);
				}
				else if(player.storage.tongshuai.unowned.length==1){
					player.storage.tongshuai.get();
				}
				else{
					player.removeSkill('tongshuai');
				}
			}
		},
		tongshuai2:{
			audio:2,
			trigger:{player:['phaseBegin','phaseEnd'],global:'gameStart'},
			filter:function(event,player,name){
				if(!player.skills.contains('tongshuai')) return false;
				if(name=='phaseBegin'&&game.phaseNumber==1) return false;
				return true;
			},
			priority:-9,
			forced:true,
			popup:false,
			content:function(){
				var slist=player.storage.tongshuai.owned;
				var list=[];
				for(var i in slist){
					list.push(i);
				}
				if(event.isMine()){
					event.dialog=ui.create.dialog('选择获得一项技能',[list,'character']);
					if(trigger.name=='game'){
						event.control=ui.create.control();
					}
					else{
						event.control=ui.create.control(['cancel']);
					}
					event.clickControl=function(link){
						if(link!='cancel'){
							var currentname=event.dialog.querySelector('.selected.button').link;
							var mark=player.marks.tongshuai;
							if(!mark){
								player.markSkill('tongshuai');
								mark=player.marks.tongshuai;
								if(mark.firstChild){
									mark.firstChild.remove();
								}
							}
							mark.setBackground(currentname,'character');

							player.additionalSkills.tongshuai=link;
							game.addVideo('chess_tongshuai_skill',player,[currentname,link]);
							player.logSkill('tongshuai2');
							game.log(get.translation(player)+'获得技能'+get.translation(link));
							player.popup(link);

							for(var i=0;i<event.dialog.buttons.length;i++){
								if(event.dialog.buttons[i].classList.contains('selected')){
									var name=event.dialog.buttons[i].link;
									player.sex=lib.character[name][0];
									player.group=lib.character[name][1];
									// player.node.identity.style.backgroundColor=get.translation(player.group+'Color');
									break;
								}
							}
						}
						ui.auto.show();
						event.dialog.close();
						event.control.close();
						_status.imchoosing=false;
						game.resume();
					};
					event.control.custom=event.clickControl;
					ui.auto.hide();
					_status.imchoosing=true;
					game.pause();
					for(var i=0;i<event.dialog.buttons.length;i++){
						event.dialog.buttons[i].classList.add('selectable');
					}
					event.custom.replace.button=function(button){
						if(button.classList.contains('selected')){
							button.classList.remove('selected');
							if(trigger.name=='game'){
								event.control.style.opacity=0;
							}
							else{
								event.control.replace(['cancel']);
							}
						}
						else{
							for(var i=0;i<event.dialog.buttons.length;i++){
								event.dialog.buttons[i].classList.remove('selected');
							}
							button.classList.add('selected');
							event.control.replace(slist[button.link]);
							if(trigger.name=='game'&&getComputedStyle(event.control).opacity==0){
								event.control.style.transition='opacity 0.5s';
								ui.refresh(event.control);
								event.control.style.opacity=1;
								event.control.style.transition='';
								ui.refresh(event.control);
							}
							else{
								event.control.style.opacity=1;
							}
						}
						event.control.custom=event.clickControl;
					}
					event.custom.replace.window=function(){
						for(var i=0;i<event.dialog.buttons.length;i++){
							if(event.dialog.buttons[i].classList.contains('selected')){
								event.dialog.buttons[i].classList.remove('selected');
								if(trigger.name=='game'){
									event.control.style.opacity=0;
								}
								else{
									event.control.replace(['cancel']);
								}
								event.control.custom=event.clickControl;
								return;
							}
						}
					}
				}
				else{
					event.finish();
				}
			}
		},
		tongshuai3:{
			unique:true,
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return player.storage.tongshuai&&player.storage.tongshuai.unowned&&player.storage.tongshuai.unowned.length>0;
			},
			content:function(){
				player.storage.tongshuai.get();
			}
		},
		cangming:{
			enable:'phaseUse',
			usable:1,
			unique:true,
			filter:function(event,player){
				if(player.isTurnedOver()) return false;
				var suits=[];
				var hs=player.get('h');
				for(var i=0;i<hs.length;i++){
					suits.add(get.suit(hs[i]));
					if(suits.length>=4) return true;
				}
				return false;
			},
			filterCard:function(card){
				var suit=get.suit(card);
				for(var i=0;i<ui.selected.cards.length;i++){
					if(suit==get.suit(ui.selected.cards[i])) return false;
				}
				return true;
			},
			selectCard:4,
			check:function(card){
				return 10-ai.get.value(card);
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			selectTarget:-1,
			content:function(){
				target.goMad();
				if(!player.isTurnedOver()){
					player.turnOver();
				}
				player.addSkill('cangming2');
			},
			ai:{
				order:10,
				effect:{
					player:function(card,player){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(ai.get.attitude(player,game.players[i])<0){
								num++;
								if(num>1) break;
							}
						}
						if(num<=1) return;
						if(_status.currentPhase==player&&player.num('h')<player.hp&&player.hp>=6){
							if(typeof card=='string') return;
							if(card.name=='wuzhong') return;
							if(card.name=='shunshou') return;
							if(card.name=='yuanjiao') return;
							if(card.name=='yiyi') return;
							if(!player.skills.contains('cangming2')) return [0,0,0,0];
						}
					}
				},
				result:{
					target:function(player){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(ai.get.attitude(player,game.players[i])<0){
								num++;
								if(num>1) break;
							}
						}
						if(num<=1) return 0;
						return -10;
					}
				}
			},
		},
		cangming2:{
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					game.players[i].unMad();
				}
				player.removeSkill('cangming2');
			}
		},
		boss_moyan:{
			trigger:{player:'phaseEnd'},
			forced:true,
			unique:true,
			content:function(){
				"step 0"
				event.players=get.players(player);
				"step 1"
				if(event.players.length){
					event.players.shift().damage('fire');
					event.redo();
				}
			},
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
		guanchuan:{
			trigger:{player:'shaBefore'},
			getTargets:function(player,target){
				var targets=[];
				var pxy=player.getXY();
				var txy=target.getXY();
				var dx=txy[0]-pxy[0];
				var dy=txy[1]-pxy[1];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i]!=target){
						var axy=game.players[i].getXY();
						var dx2=axy[0]-pxy[0];
						var dy2=axy[1]-pxy[1];
						if(dx*dx2<0) continue;
						if(dy*dy2<0) continue;
						if(dx==0){
							if(dx2==0){
								targets.push(game.players[i]);
							}
						}
						else if(dx2!=0){
							if(dy2/dx2==dy/dx){
								targets.push(game.players[i]);
							}
						}
					}
				}
				return targets;
			},
			filter:function(event,player){
				if(event.targets.length!=1) return false;
				return lib.skill.guanchuan.getTargets(player,event.targets[0]).length>0;
			},
			check:function(event,player){
				var targets=lib.skill.guanchuan.getTargets(player,event.targets[0]);
				var eff=0;
				for(var i=0;i<targets.length;i++){
					eff+=ai.get.effect(targets[i],event.card,player,player);
				}
				return eff>0;
			},
			content:function(){
				var targets=lib.skill.guanchuan.getTargets(player,trigger.targets[0]);
				for(var i=0;i<targets.length;i++){
					trigger.targets.push(targets[i]);
				}
				player.logSkill('guanchuan',targets);
			}
		},
		sanjiansheji:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h','sha')>1&&lib.filter.filterCard({name:'sha'},player);
			},
			filterCard:{name:'sha'},
			selectCard:2,
			check:function(card){
				var num=0;
				var player=_status.event.player;
				for(var i=0;i<game.players.length;i++){
					if(lib.filter.targetEnabled({name:'sha'},player,game.players[i])&&
					ai.get.effect(game.players[i],{name:'sha'},player)>0){
						num++;
						if(num>1) return 8-ai.get.value(card);
					}
				}
				return 0;
			},
			selectTarget:[1,Infinity],
			discard:false,
			prepare:function(cards,player,targets){
				player.$throw(cards);
				player.line(targets);
			},
			filterTarget:function(card,player,target){
				return lib.filter.targetEnabled({name:'sha'},player,target)&&
				get.distance(player,target,'pure')<=5;
			},
			content:function(){
				targets.sort(lib.sort.seat);
				player.useCard({name:'sha'},cards,targets,'luanjian').animate=false;
			},
			multitarget:true,
			ai:{
				order:function(){
					return lib.card.sha.ai.order+0.1;
				},
				result:{
					target:function(player,target){
						var added=false;
						if(!player.skills.contains('unequip')){
							added=true;
							player.skills.push('unequip');
						}
						var eff=ai.get.effect(target,{name:'sha'},player,target);
						if(added){
							player.skills.remove('unequip');
						}
						return eff;
					}
				},
				effect:{
					player:function(card,player){
						if(_status.currentPhase!=player) return;
						if(card.name=='sha'&&player.num('h','sha')<2&&player.num('h')<=player.hp){
							var num=0;
							var player=_status.event.player;
							for(var i=0;i<game.players.length;i++){
								if(lib.filter.targetEnabled({name:'sha'},player,game.players[i])&&
								ai.get.attitude(player,game.players[i])<0){
									num++;
									if(num>1) return [0,0,0,0];
								}
							}
						}
					}
				},
			}
		},
		zhiming:{
			trigger:{source:'damageBegin'},
			filter:function(event,player){
				return get.distance(event.player,player,'attack')>1&&event.card&&event.card.name=='sha';
			},
			forced:true,
			content:function(){
				trigger.num++;
			}
		},
		lianshe:{
			mod:{
				cardUsable:function(card,player,num){
					if(card.name=='sha'){
						return num+get.cardCount(true,player)-get.cardCount('sha',player);
					}
				},
				attackFrom:function(from,to,distance){
					return distance-1;
				}
			},
		},
		pianyi:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return !player.getStat('damage');
			},
			content:function(){
				"step 0"
				player.chooseToMove(2,'是否发动【翩仪】？');
				"step 1"
				if(result.bool){
					player.logSkill('pianyi');
				}
			}
		},
		lingdong:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return get.cardCount('sha',player)>0;
			},
			content:function(){
				"step 0"
				player.chooseToMove(get.cardCount('sha',player),'是否发动【移动射击】？');
				"step 1"
				if(result.bool){
					player.logSkill('lingdong');
				}
			}
		},
		_noactpunish:{
			trigger:{player:'useCard'},
			filter:function(event,player){
				return _status.currentPhase==player&&event.targets&&(event.targets.length>1||event.targets[0]!=player);
			},
			forced:true,
			popup:false,
			content:function(){
				player.addTempSkill('noactpunish','phaseAfter');
			}
		},
		noactpunish:{},
		_chess_chuzhang:{
			enable:'phaseUse',
			usable:1,
			direct:true,
			delay:false,
			preservecancel:true,
			filter:function(event,player){
				var num=0;
				var xy=player.getXY();
				if(game.obstacles.contains(player.getNeighbour(-1,0))||xy[0]==0) num++;
				if(game.obstacles.contains(player.getNeighbour(1,0))||xy[0]+1>=ui.chesswidth) num++;
				if(game.obstacles.contains(player.getNeighbour(0,-1))||xy[1]==0) num++;
				if(game.obstacles.contains(player.getNeighbour(0,1))||xy[1]+1>=ui.chessheight) num++;
				return num>=3;
			},
			content:function(){
				'step 0'
				event.obstacles=[];
				var neighbour;
				neighbour=player.getNeighbour(-1,0);
				if(neighbour&&game.obstacles.contains(neighbour)){
					event.obstacles.push(neighbour);
				}
				neighbour=player.getNeighbour(1,0);
				if(neighbour&&game.obstacles.contains(neighbour)){
					event.obstacles.push(neighbour);
				}
				neighbour=player.getNeighbour(0,-1);
				if(neighbour&&game.obstacles.contains(neighbour)){
					event.obstacles.push(neighbour);
				}
				neighbour=player.getNeighbour(0,1);
				if(neighbour&&game.obstacles.contains(neighbour)){
					event.obstacles.push(neighbour);
				}
				if(!event.obstacles.length){
					event.finish();
					return;
				}
				else if(event.obstacles.length==1){
					event.obstacle=event.obstacles[0];
				}
				else if(event.isMine()){
					for(var i=0;i<event.obstacles.length;i++){
						event.obstacles[i].classList.add('glow');
					}
					event.chooseObstacle=true;
					game.pause();
					_status.imchoosing=true;
					event.dialog=ui.create.dialog('选择一个与你相邻的障碍清除之');
					event.dialog.add('<div class="text">'+lib.translate._chess_chuzhang_info+'</div>');
					event.custom.replace.confirm=function(){
						player.getStat().skill._chess_chuzhang--;
						event.cancelled=true;
						game.resume();
					};
				}
				'step 1'
				_status.imchoosing=false;
				if(!event.cancelled){
					if(!event.obstacle){
						event.obstacle=event.obstacles.randomGet();
					}
					game.removeObstacle(event.obstacle.dataset.position);
				}
				for(var i=0;i<event.obstacles.length;i++){
					event.obstacles[i].classList.remove('glow');
				}
				if(event.dialog){
					event.dialog.close();
				}
			},
			ai:{
				result:{
					player:1
				},
				order:7.5
			}
		},
		_phasequeue:{
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			content:function(){
				var current=ui.chessinfo.querySelector('.glow2');
				if(current){
					current.classList.remove('glow2');
				}
				for(var i=0;i<ui.phasequeue.length;i++){
					if(ui.phasequeue[i].link==player){
						ui.phasequeue[i].classList.add('glow2');
						ui.chessinfo.scrollTop=ui.phasequeue[i].offsetTop-8;
						break;
					}
				}
			}
		},
		_chessmove:{
			enable:'phaseUse',
			usable:1,
			direct:true,
			delay:false,
			preservecancel:true,
			filter:function(event,player){
				if(!player.movable(0,1)&&!player.movable(0,-1)&&
					!player.movable(1,0)&&!player.movable(-1,0)){
					return false;
				}
				// var move=player.skills.contains('noactpunish')?2:1;
				var move=2;
				move=game.checkMod(player,move,'chessMove',player.get('s'));
				return move>0;
			},
			content:function(){
				"step 0"
				// var move=player.skills.contains('noactpunish')?2:1;
				var move=2;
				move=game.checkMod(player,move,'chessMove',player.get('s'));
				player.chooseToMove(move).phasing=true;
				"step 1"
				if(!result.bool){
					var skill=player.getStat().skill;
					skill._chessmove--;
					if(typeof skill._chessmovetried=='number'){
						skill._chessmovetried++;
					}
					else{
						skill._chessmovetried=1;
					}
				}
			},
			ai:{
				order:5,
				result:{
					playerx:function(player){
						var nh=player.num('h');
						if(!player.num('h','sha')&&
						!player.num('h','shunshou')&&
						!player.num('h','bingliang')){
							if(nh<=Math.min(3,player.hp)) return Math.random()-0.3;
							else if(nh<=Math.min(2,player.hp)) return Math.random()-0.4;
							return Math.random()-0.5;
						}
						var neighbour;
						neighbour=player.getNeighbour(0,1);
						if(neighbour&&game.players.contains(neighbour)&&neighbour.side!=player.side){
							if(get.distance(player,neighbour,'attack')<1) return 1;
							return 0;
						}
						neighbour=player.getNeighbour(0,-1);
						if(neighbour&&game.players.contains(neighbour)&&neighbour.side!=player.side){
							if(get.distance(player,neighbour,'attack')<1) return 1;
							return 0;
						}
						neighbour=player.getNeighbour(1,0);
						if(neighbour&&game.players.contains(neighbour)&&neighbour.side!=player.side){
							if(get.distance(player,neighbour,'attack')<1) return 1;
							return 0;
						}
						neighbour=player.getNeighbour(-1,0);
						if(neighbour&&game.players.contains(neighbour)&&neighbour.side!=player.side){
							if(get.distance(player,neighbour,'attack')<1) return 1;
							return 0;
						}
						return 1;
					},
					player:function(player){
						if(player.getStat().skill._chessmovetried>=10){
							return 0;
						}
						var x=lib.skill._chessmove.ai.result.playerx(player);
						if(player.isMad()) return -x;
						return x;
					}
				}
			}
		},
		_chessswap:{
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
		_chesscenter:{
			trigger:{player:['phaseBegin','useCardBegin','useSkillBegin','respondBegin','damageBegin','loseHpBegin'],
			target:'useCardToBegin'},
			forced:true,
			priority:100,
			popup:false,
			content:function(){
				player.chessFocus();
			},
		},
		boss_fengxing:{
			mod:{
				chessMove:function(player,current){
					return current+2;
				},
				attackFrom:function(from,to,current){
					return current-2;
				},
			},
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=2;
			}
		},
		boss_chiyu:{
			enable:'phaseUse',
			usable:1,
			filterCard:{color:'red'},
			nodelay:true,
			check:function(card){return 8-ai.get.value(card);},
			filterTarget:function(card,player,target){
				return get.distance(player,target)<=5&&player!=target;
			},
			filter:function(event,player){
				return player.num('h',{color:'red'})>0;
			},
			selectTarget:-1,
			content:function(){
				target.damage('fire');
			},
			line:'fire',
			ai:{
				order:1,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target,'fire');
					}
				}
			}
		},
		boss_tenglong:{
			enable:'phaseUse',
			usable:1,
			position:'he',
			filterCard:{type:'equip'},
			init:function(player){
				player.forcemin=true;
			},
			check:function(card){
				var player=_status.currentPhase;
				if(player.num('he',{subtype:get.subtype(card)})>1){
					return 12-ai.get.equipValue(card);
				}
				return 8-ai.get.equipValue(card);
			},
			filter:function(event,player){
				return player.num('he',{type:'equip'});
			},
			filterTarget:function(card,player,target){
				return player!=target&&get.distance(player,target)<=2;
			},
			content:function(){
				target.damage(3,'fire');
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target,'fire');
					}
				}
			}
		},
		boss_wuying:{
			mod:{
				globalTo:function(from,to,distance){
					return distance+2;
				},
				chessMove:function(player,current){
					return current-1;
				}
			}
		},
		boss_wushang:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')&&
						get.distance(player,game.players[i])<=5){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				var players=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')&&
						get.distance(player,game.players[i])<=5){
						players.push(game.players[i]);
					}
				}
				players.sort(lib.sort.seat);
				event.players=players;
				"step 1"
				if(event.players.length){
					event.current=event.players.shift();
					event.current.chooseCard('神天并地：交给'+get.translation(player)+'一张手牌',true);
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.cards.length){
					player.gain(result.cards);
					event.current.$give(1,player);
					event.goto(1);
				}
			}
		}
	},
	translate:{
		friend:'友',
		enemy:'敌',
		neutral:'中',
		trueColor:"zhu",
		falseColor:"wei",
		_chessmove:'移动',
		leader:'统率',
		combat:'对阵',
		chessscroll_speed_config:'边缘滚动速度',
		chess_character_config:'战棋武将',
		only_chess_character_config:'只用战棋武将',
		chess_ordered_config:'指定行动顺序',
		chess_mode_config:'游戏模式',
		chess_leader_save_config:'选择历程',
		chess_leader_clear_config:'清除进度',
		save1:'一',
		save2:'二',
		save3:'三',
		save4:'四',
		save5:'五',

		leader_2:' ',
		leader_2_bg:'二',
		leader_3:' ',
		leader_3_bg:'三',
		leader_5:' ',
		leader_5_bg:'五',
		leader_8:' ',
		leader_8_bg:'八',

		leader_easy:'简单',
		leader_medium:'普通',
		leader_hard:'困难',

		chess_caocao:'曹操',
		chess_xunyu:'荀彧',
		chess_simayi:'司马懿',
		chess_xiahoudun:'夏侯惇',
		chess_dianwei:'典韦',
		chess_xuzhu:'许褚',
		chess_zhangliao:'张辽',
		chess_jiaxu:'贾诩',

		chess_liubei:'刘备',
		chess_guanyu:'关羽',
		chess_zhangfei:'张飞',
		chess_zhaoyun:'赵云',
		chess_machao:'马超',
		chess_huangzhong:'黄忠',
		chess_maliang:'马良',
		chess_zhugeliang:'诸葛亮',

		chess_sunquan:'孙权',
		chess_zhouyu:'周瑜',
		chess_lvmeng:'吕蒙',
		chess_huanggai:'黄盖',
		chess_lusu:'鲁肃',
		chess_luxun:'陆逊',
		chess_ganning:'甘宁',
		chess_taishici:'太史慈',

		chess_lvbu:'吕布',
		chess_sunshangxiang:'孙尚香',
		chess_diaochan:'貂蝉',
		chess_huatuo:'华佗',
		chess_zhangjiao:'张辽',
		chess_menghuo:'孟获',

		chess_dongzhuo:'董卓',
		chess_xingtian:'刑天',
		chess_jinchidiao:'金翅雕',
		chess_beimingjukun:'北溟巨鲲',
		chess_wuzhaojinlong:'五爪金龙',

		treasure_dubiaoxianjing:'毒镖陷阱',
		treasure_jiqishi:'集气石',
		treasure_shenmidiaoxiang:'神秘雕像',
		treasure_shenpanxianjing:'审判之镰',
		treasure_shiyuansu:'石元素',
		treasure_wuyashenxiang:'乌鸦神像',

		dubiaoxianjing:'飞刃',
		dubiaoxianjing_info:'距离两格体力值大于1的角色在回合结束后受到一点伤害，然后摸两张牌',
		jiqishi:'集气',
		jiqishi_info:'距离两格以内的已受伤角色在回合结束后回复一点体力，然后弃置两张牌',
		shenmidiaoxiang:'秘咒',
		shenmidiaoxiang_info:'距离三格以外的所有角色在回合结束后强制向此处移动一格',
		shenpanxianjing:'审判',
		shenpanxianjing_info:'在任意一名角色回合结束后，若没有其他角色手牌数比其多，随机弃置其一张手牌',
		shiyuansu:'护体',
		shiyuansu_info:'任意一名角色一次性受到不少于两点伤害后，使其获得一点护甲',
		wuyashenxiang:'厄音',
		wuyashenxiang_info:'距离3格以内的角色在其回合结束后，若体力值不大于1，令其回复一点体力并摸一张牌，然后将牌堆中的一张延时锦囊牌置于其判定区',

		leader_caocao:'曹操',
		leader_liubei:'刘备',
		leader_sunquan:'孙权',
		leader_xiaoxiong:'枭雄',
		leader_xiaoxiong_info:'你造成伤害后会得到一定数量的金钱奖励',
		leader_renyi:'仁义',
		leader_renyi_info:'你招降敌将的成功率大幅增加',
		leader_mouduan:'谋断',
		leader_mouduan_info:'其他友方角色回合内的行动范围+1',

		tongshuai:'统率',
		tongshuai_info:'回合开始和结束阶段，你可以选择一名未上场的已方武将的一个技能作为你的技能',
		leader_zhaoxiang:'招降',
		leader_zhaoxiang_info:'出牌阶段限一次，你可以尝试对相邻敌方武将进行招降，若成功，你获得该武将并立即结束本局游戏，若失败，你受到一点伤害。每发动一次消耗10招募令',

		common:'普通',
		rare:'稀有',
		epic:'史诗',
		legend:'传说',

		chess_shezhang:'设置障碍',
		chess_shezhang_info:'在你的一个相邻位置设置障碍，摸一张牌',
		chess_chuzhang:'清除障碍',
		chess_chuzhang_info:'清除一个在你相邻位置的障碍，摸一张牌',

		_chess_chuzhang:'除障',
		_chess_chuzhang_info:'出牌阶段限一次，若你周围四格至少有三个为障碍或在边缘外，你可以选择清除其中一个障碍',

		arenaAdd:'援军',
		arenaAdd_info:'出牌阶段限一次，你可以令一名未出场的已方角色加入战场。战斗结束后，该角色无论是否存活均不能再次出场',

		pianyi:'翩仪',
		pianyi_info:'回合结束阶段，若你没有于本回合内造成伤害，你获得一次移动机会',
		lingdong:'移动射击',
		lingdong_info:'回合结束阶段，你可以移动X个格，X为你回合内出杀的次数',
		lianshe:'连续射击',
		lianshe_info:'你的攻击范围+1；回合内，你回合内，每当你使用一张不是杀的牌，你可以额外使用一张杀',
		zhiming:'致命射击',
		zhiming_info:'锁定技，当你使用杀造成伤害时，若你不在目标的攻击范围内，此伤害+1',
		sanjiansheji:'散箭射击',
		sanjiansheji_info:'你可以将两张杀当杀使用，此杀可以指定距离你5格以内任意名目标',
		guanchuan:'贯穿射击',
		guanchuan_info:'当你使用杀指定惟一的目标后，可将攻击射线内的其他角色也加入目标',

		boss_qiangzheng:'强征',
		boss_qiangzheng_info:'锁定技，回合结束阶段，你获得每个其他角色的一张手牌',
		boss_baolin:'暴凌',
		boss_moyan:'魔焰',
		boss_moyan_info:'锁定技，回合结束阶段，你对场上所有角色造成一点火焰伤害',

		cangming:'颠动沧溟',
		cangming_info:'出牌阶段限一次，你可弃置四张花色不同的手牌并将武将牌翻至背面，然后令所有其他角色进入混乱状态直到你的下一回合开始',
		boss_fengxing:'风行',
		boss_fengxing_info:'锁定技，你摸牌阶段摸牌数+2；你的攻击范围+2；你回合内的移动距离+2',
		boss_chiyu:'炽羽',
		boss_chiyu_info:'出牌阶段限一次，你可以弃置一张红色牌对距离5以内的所有其他角色造成一点火焰伤害',
		boss_tenglong:'腾龙八齐',
		boss_tenglong_info:'你没有装备区；出牌阶段限一次，你可以弃置一张装备牌对一名距离你2以内的其他角色造成3点火焰伤害',
		boss_wushang:'神天并地',
		boss_wushang_info:'锁定技，回合开始阶段，距离你5以内的所有其他角色需交给你一张手牌',
		boss_wuying:'无影',
		boss_wuying_info:'锁定技，你回合内的移动距离-1；计算其他角色与你的距离时始终+2',

		mode_chess_character_config:'战棋模式',
		mode_chess_card_config:'战棋模式',
	},
	ui:{
		create:{
			playergrid:function(player,x,y){
				var node=ui.create.div('.player.minskin.playergrid',player.parentNode);
				node.link=player;
				node.dataset.position=player.getDataPos(x,y);
				return node;
			},
			fakeme:function(){
				if(ui.fakeme){
					ui.fakeme.delete();
				}
				ui.fakeme=ui.create.div('.fakeme.avatar',ui.me);
				ui.fakeme.style.backgroundImage=game.me.node.avatar.style.backgroundImage;
			}
		},
		click:{
			playergrid:function(){
				if(!_status.paused) return;
				delete lib.posmap[this.link.dataset.position];
				game.addVideo('moveTox',this.link,this.dataset.position);
				this.link.dataset.position=this.dataset.position;
				lib.posmap[this.link.dataset.position]=this.link;
				if(ui.movegrids){
					while(ui.movegrids.length){
						ui.movegrids.shift().delete();
					}
				}
				_status.event.result={
					bool:true,
					move:this.link.dataset.position
				};
				game.resume();
			},
			obstacle:function(){
				if(_status.event.chooseObstacle&&_status.paused&&
					_status.event.obstacles&&_status.event.obstacles.contains(this)){
					_status.event.obstacle=this;
					game.resume();
				}
			}
		}
	},
	get:{
		chessDistance:function(from,to){
			var fxy=from.getXY();
			var txy=to.getXY();
			return Math.abs(fxy[0]-txy[0])+Math.abs(fxy[1]-txy[1]);
		},
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
	card:{
		chess_shezhang:{
			type:'basic',
			fullskin:true,
			enable:function(card,player){
				if(player.movable(-1,0)) return true;
				if(player.movable(1,0)) return true;
				if(player.movable(0,-1)) return true;
				if(player.movable(0,1)) return true;
				return false;
			},
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				var pos=parseInt(player.dataset.position);
				var poses=[];
				if(player.movable(-1,0)){
					poses.push(pos-1);
				}
				if(player.movable(1,0)){
					poses.push(pos+1);
				}
				if(player.movable(0,-1)){
					poses.push(pos-ui.chesswidth);
				}
				if(player.movable(0,1)){
					poses.push(pos+ui.chesswidth);
				}
				event.poses=poses;
				if(poses.length==1){
					event.obstacle=poses[0];
					event.grids=[];
				}
				else if(event.isMine()){
					event.grids=player.createRangeShadow(1,function(){
						event.obstacle=this.dataset.position;
						game.resume();
					})
					game.pause();
					_status.imchoosing=true;
					for(var i=0;i<event.grids.length;i++){
						event.grids[i].animate('start');
					}
					event.dialog=ui.create.dialog('选择一个位置放置障碍');
				}
				else{
					event.grids=[];
				}
				'step 1'
				_status.imchoosing=false;
				if(!event.obstacle){
					event.obstacle=event.poses.randomGet();
				}
				if(event.obstacle){
					game.addObstacle(event.obstacle.toString());
				}
				while(event.grids.length){
					event.grids.shift().delete();
				}
				if(event.dialog){
					event.dialog.close();
				}
				player.draw();
			},
			ai:{
				result:{
					player:1,
				},
				order:1
			}
		},
		chess_chuzhang:{
			type:'basic',
			fullskin:true,
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			enable:function(event,player){
				if(game.obstacles.contains(player.getNeighbour(-1,0))) return true;
				if(game.obstacles.contains(player.getNeighbour(1,0))) return true;
				if(game.obstacles.contains(player.getNeighbour(0,-1))) return true;
				if(game.obstacles.contains(player.getNeighbour(0,1))) return true;
			},
			content:function(){
				'step 0'
				event.obstacles=[];
				var neighbour;
				neighbour=player.getNeighbour(-1,0);
				if(neighbour&&game.obstacles.contains(neighbour)){
					event.obstacles.push(neighbour);
				}
				neighbour=player.getNeighbour(1,0);
				if(neighbour&&game.obstacles.contains(neighbour)){
					event.obstacles.push(neighbour);
				}
				neighbour=player.getNeighbour(0,-1);
				if(neighbour&&game.obstacles.contains(neighbour)){
					event.obstacles.push(neighbour);
				}
				neighbour=player.getNeighbour(0,1);
				if(neighbour&&game.obstacles.contains(neighbour)){
					event.obstacles.push(neighbour);
				}
				if(!event.obstacles.length){
					event.finish();
					return;
				}
				else if(event.obstacles.length==1){
					event.obstacle=event.obstacles[0];
				}
				else if(event.isMine()){
					for(var i=0;i<event.obstacles.length;i++){
						event.obstacles[i].classList.add('glow');
					}
					event.chooseObstacle=true;
					game.pause();
					_status.imchoosing=true;
					event.dialog=ui.create.dialog('选择一个与你相邻的障碍清除之');
				}
				'step 1'
				_status.imchoosing=false;
				if(!event.obstacle){
					event.obstacle=event.obstacles.randomGet();
				}
				game.removeObstacle(event.obstacle.dataset.position);
				for(var i=0;i<event.obstacles.length;i++){
					event.obstacles[i].classList.remove('glow');
				}
				if(event.dialog){
					event.dialog.close();
				}
				player.draw();
			},
			ai:{
				result:{
					player:1
				},
				order:7
			}
		},
		leader_2:{
			opacity:1,
			color:'white',
			textShadow:'black 0 0 2px'
		},
		leader_3:{
			opacity:1,
			color:'white',
			textShadow:'black 0 0 2px'
		},
		leader_5:{
			opacity:1,
			color:'white',
			textShadow:'black 0 0 2px'
		},
		leader_8:{
			opacity:1,
			color:'white',
			textShadow:'black 0 0 2px'
		},
		leader_easy:{
			color:'white',
			opacity:1,
			textShadow:'black 0 0 2px',
			image:'card/leader_easy'
		},
		leader_medium:{
			color:'white',
			opacity:1,
			textShadow:'black 0 0 2px',
			image:'card/leader_medium'
		},
		leader_hard:{
			color:'white',
			opacity:1,
			textShadow:'black 0 0 2px',
			image:'card/leader_hard'
		}
	},
	characterPack:{
		mode_chess:{
			treasure_dubiaoxianjing:['','',0,['dubiaoxianjing'],['boss']],
			treasure_jiqishi:['','',0,['jiqishi'],['boss']],
			treasure_shenmidiaoxiang:['','',0,['shenmidiaoxiang'],['boss']],
			treasure_shenpanxianjing:['','',0,['shenpanxianjing'],['boss']],
			treasure_shiyuansu:['','',0,['shiyuansu'],['boss']],
			treasure_wuyashenxiang:['','',0,['wuyashenxiang'],['boss']],

			leader_caocao:['male','wei',4,['leader_xiaoxiong']],
			leader_liubei:['male','shu',4,['leader_renyi']],
			leader_sunquan:['male','wu',4,['leader_mouduan']],
			// chess_caocao:['male','wei',3,['']],
			// chess_xunyu:['male','wei',3,['']],
			// chess_simayi:['male','wei',3,['']],
			// chess_xiahoudun:['male','wei',3,['']],
			// chess_dianwei:['male','wei',3,['']],
			// chess_xuzhu:['male','wei',3,['']],
			chess_zhangliao:['male','wei',4,['gongji','zhiming']],
			// chess_jiaxu:['male','wei',3,['']],
			//
			// chess_liubei:['male','shu',3,['']],
			// chess_guanyu:['male','shu',3,['']],
			// chess_zhangfei:['male','shu',3,['']],
			// chess_zhaoyun:['male','shu',3,['']],
			// chess_machao:['male','shu',3,['']],
			chess_huangzhong:['male','shu',4,['sanjiansheji','liegong']],
			// chess_maliang:['male','shu',3,['']],
			// chess_zhugeliang:['male','shu',3,['']],
			//
			// chess_sunquan:['male','wu',3,['']],
			// chess_zhouyu:['male','wu',3,['qinyin']],
			// chess_lvmeng:['male','wu',3,['']],
			// chess_huanggai:['male','wu',3,['']],
			// chess_lusu:['male','wu',3,['']],
			// chess_luxun:['male','wu',3,['']],
			// chess_ganning:['male','wu',3,['']],
			chess_taishici:['male','wu',4,['gongji','guanchuan','pojun']],
			//
			// chess_lvbu:['male','qun',3,['']],
			chess_sunshangxiang:['female','wu',3,['lingdong','lianshe','gongji']],
			chess_diaochan:['female','qun',3,['xingzhui','pianyi']],
			// chess_huatuo:['male','qun',3,['zhenjiu','mazui']],
			// chess_zhangjiao:['male','qun',3,['']],
			// chess_menghuo:['male','qun',3,['']],
			//
			chess_jinchidiao:['male','qun',15,['boss_fengxing','boss_chiyu'],['boss']],
			chess_beimingjukun:['male','qun',25,['boss_wuying','cangming'],['boss']],
			chess_wuzhaojinlong:['male','qun',30,['boss_tenglong','boss_wushang'],['boss']],
			chess_dongzhuo:['male','qun',20,['jiuchi','boss_qiangzheng','boss_baolin'],['boss']],
			chess_xingtian:['male','qun',99,['boss_moyan','wushuang'],['boss']],
		}
	},
	cardPack:{
		mode_chess:['chess_shezhang','chess_chuzhang']
	},
	chess_cardlist:[],
	chess_obstaclelist:[
		['club',3,'chess_shezhang'],
		['spade',5,'chess_shezhang'],
		['spade',7,'chess_shezhang'],
		['diamond',1,'chess_chuzhang'],
		['diamond',4,'chess_chuzhang'],
		['heart',8,'chess_chuzhang'],
		// ['diamond',9,'chess_chuzhang'],
	],
	posmap:{},
	help:{},
	config:[
		function(game,lib,get,ui){
			var current=get.config('chess_mode');
			if(typeof current!=='string'){
				game.saveConfig('chess_mode','combat',true);
				current='combat';
			}
			return ui.create.switcher('chess_mode',['combat','leader'],current,function(){
				ui.click.sidebar.local.apply(this,arguments);
				window.location.reload();
			});
		},
		function(game,lib,get,ui){
			if(get.config('chess_mode')!='leader') return;
			var current=get.config('chess_leader_save');
			if(typeof current!=='string'){
				current='save1';
				game.saveConfig('chess_leader_save',current,true);
			}
			return ui.create.switcher('chess_leader_save',['save1','save2','save3','save4','save5'],current,function(){
				ui.click.sidebar.local.apply(this,arguments);
				window.location.reload();
			});
		},
		function(game,lib,get,ui){
			if(get.config('chess_mode')!='leader') return;
			var switcher=ui.create.line('清除进度',function(){
				var node=this;
				if(node._clearing){
					game.save(get.config('chess_leader_save'),null);
					window.location.reload();
					return;
				}
				node._clearing=true;
				node.innerHTML='单击以确认 (3)';
				setTimeout(function(){
					node.innerHTML='单击以确认 (2)';
					setTimeout(function(){
						node.innerHTML='单击以确认 (1)';
						setTimeout(function(){
							node.innerHTML='清除进度';
							delete node._clearing;
						},1000);
					},1000);
				},1000);
			});
			return switcher;
		},
		function(game,lib,get,ui){
			if(get.config('chess_mode')!='leader'){
				return 'battle_number';
			}
		},
		function(game,lib,get,ui){
			if(get.config('chess_mode')!='leader'){
				return 'ban_weak';
			}
		},
		function(game,lib,get,ui){
			if(get.config('chess_mode')!='leader'){
				return 'free_choose';
			}
		},
		function(game,lib,get,ui){
			if(get.config('chess_mode')!='leader'){
				return 'change_choice';
			}
		},
		function(game,lib,get,ui){
			if(get.config('chess_mode')=='leader'){
				return;
			}
			var current=get.config('chess_ordered');
			if(typeof current!=='boolean'){
				game.saveConfig('chess_ordered',true,true);
				current=true;
			}
			return ui.create.switcher('chess_ordered',current,ui.click.sidebar.local2);
		},
		function(game,lib,get,ui){
			if(get.config('chess_mode')=='leader'){
				return;
			}
			var current=get.config('chess_character');
			if(typeof current!=='boolean'){
				game.saveConfig('chess_character',true,true);
				current=true;
			}
			return ui.create.switcher('chess_character',current,ui.click.sidebar.local2);
		},function(game,lib,get,ui){
			var current=get.config('chessscroll_speed');
			if(typeof current!=='number'){
				game.saveConfig('chessscroll_speed',20,true);
				current=20;
			}
			return ui.create.switcher('chessscroll_speed',[0,10,20,30],current,ui.click.sidebar.local);
		}
	],
}
