'use strict';
mode.chess={
	canvasUpdates2:[],
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
					this.style.webkitTransform='rotate'+(Math.random()<0.5?'X':'Y')+'(180deg) perspective(1000px)';
				}
				else if(method=='rotate'){
					this.style.transition='all 0.5s';
					this.style.webkitTransform='rotate(180deg)';
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
				for(var i=1-num;i<num;i++){
					for(var j=1-num+Math.abs(i);j<num-Math.abs(i);j++){
						if(this.movable(i,j)){
							var grid=ui.create.playergrid(this,i,j);
							if(move){
								grid.listen(ui.click.playergrid);
								ui.movegrids.push(grid);
							}
							else{
								grid.classList.add('temp');
							}
						}
					}
				}
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
				if(x>=ui.chesswidth){
					x=ui.chesswidth-1;
				}
				if(y>=ui.chessheight){
					y=ui.chessheight-1;
				}
				// console.log(x,y);

				var pos=y*ui.chesswidth+x;
				if(!lib.posmap[pos]){
					delete lib.posmap[this.dataset.position];
					this.dataset.position=pos;
					lib.posmap[pos]=this;
					this.chessFocus();
				}
				return this;
			},
			chessFocus:function(){
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
				node.style.webkitTransform='';
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
				var ot=node.style.webkitTransform;
				node.style.webkitTransform+='scale(0.6)';
				node.dataset.position=this.dataset.position;
				this.parentNode.appendChild(node);
				ui.refresh(node);
				node.show();
				node.style.webkitTransform=ot;
				setTimeout(function(){
					node.style.webkitTransform='';
					node.delete();
				},500);
				var that=this;
				if(num&&num>1){
					if(cards){
						that.$gain(cards)
					}
					else{
						that.$gain(num-1)
					}
				}
			},
			$throw:function(card,time){
				this.chessFocus();
				if(get.itemtype(card)=='cards'){
					for(var i=0;i<card.length;i++){
						this.$throw(card[i],time);
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
					node.style.webkitTransform='rotate('+(Math.random()*16-8)+'deg)';
				}
				ui.arena.appendChild(node);
				ui.refresh(node);
				node.show();
				node.style.left=left;
				node.style.top=top;
				return node;
			},
			$phaseJudge:function(card){
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
							var txy=target.getXY();
							var pxy=player.getXY();
							if(Math.random()<0.5){
								if(txy[0]>pxy[0]&&randomMove.contains('moveRight')){
									if(player.moveRight()){
										event.moved=true;break;
									}
								}
								else if(txy[0]<pxy[0]&&randomMove.contains('moveLeft')){
									if(player.moveLeft()){
										event.moved=true;break;
									}
								}
								if(txy[1]>pxy[1]&&randomMove.contains('moveDown')){
									if(player.moveDown()){
										event.moved=true;break;
									}
								}
								else if(txy[1]<pxy[1]&&randomMove.contains('moveUp')){
									if(player.moveUp()){
										event.moved=true;break;
									}
								}
							}
							else{
								if(txy[1]>pxy[1]&&randomMove.contains('moveDown')){
									if(player.moveDown()){
										event.moved=true;break;
									}
								}
								else if(txy[1]<pxy[1]&&randomMove.contains('moveUp')){
									if(player.moveUp()){
										event.moved=true;break;
									}
								}
								if(txy[0]>pxy[0]&&randomMove.contains('moveRight')){
									if(player.moveRight()){
										event.moved=true;break;
									}
								}
								else if(txy[0]<pxy[0]&&randomMove.contains('moveLeft')){
									if(player.moveLeft()){
										event.moved=true;break;
									}
								}
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
			node.style.webkitTransform='translate('+tx+'px,'+ty+'px)';
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
				ui.create.arena();
				ui.create.cards();
				game.finishCards();
				if(get.config('chess_character')){
					delete lib.character.swd_linyue;
					for(var i in lib.chess_character){
						lib.character[i]=lib.chess_character[i];
						if(!lib.character[i][4]){
							lib.character[i][4]=[];
						}
					}
				}
				ui.chessContainer=ui.create.div('#chess-container',ui.arena);
				ui.chessContainer.ontouchmove = ui.click.touchScroll;
				ui.chessContainer.style.WebkitOverflowScrolling='touch';
				ui.chess=ui.create.div('#chess',ui.chessContainer);
				ui.canvas2=document.createElement('canvas');
				ui.canvas2.id='canvas2';
				ui.chess.appendChild(ui.canvas2);
				ui.ctx2=ui.canvas2.getContext('2d');
				game.me=ui.create.player();
				game.chooseCharacter();
				"step 1"
				ui.arena.classList.add('chess');
				var num=Math.round((_status.mylist.length+_status.enemylist.length)/2);
				var friend,enemy;
				var side=Math.random()<0.5;
				switch(num){
					case 2:ui.chessheight=5;break;
					case 3:ui.chessheight=5;break;
					case 4:ui.chessheight=6;break;
					case 6:ui.chessheight=7;break;
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
					var speed=get.config('chessscroll_speed');
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
				while(_status.mylist.length){
					friend=ui.create.player().animate('start');
					friend.init(_status.mylist.shift());
					friend.side=side;
					friend.setIdentity('friend');
					friend.node.identity.dataset.color=get.translation(side+'Color');
					game.players.push(friend);
					ui.chess.appendChild(friend);
					friend.dataset.position=grids.randomRemove();
					lib.posmap[friend.dataset.position]=friend;
				}
				while(_status.enemylist.length){
					enemy=ui.create.player().animate('start');
					enemy.init(_status.enemylist.shift());
					enemy.side=!side;
					enemy.setIdentity('enemy');
					enemy.node.identity.dataset.color=get.translation(!side+'Color');
					game.players.push(enemy);
					ui.chess.appendChild(enemy);
					enemy.dataset.position=grids.randomRemove();
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
				ui.create.system('显示距离',function(){
					if(!game.me.isAlive()) return;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							var dist=get.distance(game.me,game.players[i],'pure');
							var dist2=get.distance(game.me,game.players[i]);
							var nature=dist>7?'thunder':'';
							game.players[i].popup('距离：'+dist2+'/'+dist,nature);
						}
					}
				},true);

				ui.create.me();
				ui.create.fakeme();

				ui.chessinfo=ui.create.div('.fakeme.player',ui.me);
				ui.chessinfo.ontouchmove = ui.click.touchScroll;
				ui.chessinfo.style.WebkitOverflowScrolling='touch';

				game.arrangePlayers();
				"step 2"
				ui.control.style.display='';
				var p;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side){
						p=game.players[i];
						break;
					}
				}
				game.gameDraw(p);
				game.phaseLoop(p);
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
		clickChessInfo:function(e){
			if(this.link.isAlive()){
				this.link.chessFocus();
				if(this.link.classList.contains('selectable')||
				this.link.classList.contains('selected')){
					this.link.click();
				}
				// ui.click.target.call(this.link,e);
				e.stopPropagation();
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
				var bosslist=[];
				event.list=list;
				for(i in lib.character){
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
				dialog.add([list.slice(0,get.config('battle_number')*4+5),'character']);
				if(bossbuttons.length){
					dialog.add('挑战魔王');
					dialog.add(bosses);
				}
				ui.control.style.transition='all 0s';
				ui.control.style.top='calc(100% - 30px)';

				var next=game.me.chooseButton(dialog,true);
				next._triggered=null;
				next.selectButton=function(){
					var bossnum=bosses.querySelectorAll('.glow').length;
					if(bossnum){
						return 3*bossnum;
					}
					return get.config('battle_number');
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
					dialog.add([list.slice(0,get.config('battle_number')*4+5),'character']);
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
			game.me.node.avatar.classList.remove('glow2');
			player.node.avatar.classList.add('glow2');
			game.swapControl(player);
			player.chessFocus();
			ui.create.fakeme();
		}
	},
	skill:{
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
				var move=player.skills.contains('noactpunish')?2:1;
				move=game.checkMod(player,move,'chessMove',player.get('s'));
				return move>0;
			},
			content:function(){
				"step 0"
				var move=player.skills.contains('noactpunish')?2:1;
				move=game.checkMod(player,move,'chessMove',player.get('s'));
				player.chooseToMove(move).phasing=true;
				"step 1"
				if(!result.bool){
					player.getStat().skill._chessmove--;
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
						if(neighbour&&neighbour.side!=player.side){
							if(get.distance(player,neighbour,'attack')<1) return 1;
							return 0;
						}
						neighbour=player.getNeighbour(0,-1);
						if(neighbour&&neighbour.side!=player.side){
							if(get.distance(player,neighbour,'attack')<1) return 1;
							return 0;
						}
						neighbour=player.getNeighbour(1,0);
						if(neighbour&&neighbour.side!=player.side){
							if(get.distance(player,neighbour,'attack')<1) return 1;
							return 0;
						}
						neighbour=player.getNeighbour(-1,0);
						if(neighbour&&neighbour.side!=player.side){
							if(get.distance(player,neighbour,'attack')<1) return 1;
							return 0;
						}
						return 1;
					},
					player:function(player){
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
		trueColor:"zhu",
		falseColor:"wei",
		_chessmove:'移动',
		chessscroll_speed_config:'边缘滚动速度',
		chess_character_config:'战棋武将',
		only_chess_character_config:'只用战棋武将',

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
		boss_qiangzheng_info:'锁定技，回合结束阶段，你获得每个敌方角色的一张手牌',
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
			}
		}
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
	chess_character:{
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
		chess_huatuo:['male','qun',3,['zhenjiu','mazui']],
		// chess_zhangjiao:['male','qun',3,['']],
		// chess_menghuo:['male','qun',3,['']],
		//
		chess_jinchidiao:['male','qun',15,['boss_fengxing','boss_chiyu'],['boss']],
		chess_beimingjukun:['male','qun',25,['boss_wuying','cangming'],['boss']],
		chess_wuzhaojinlong:['male','qun',30,['boss_tenglong','boss_wushang'],['boss']],
		chess_dongzhuo:['male','qun',20,['jiuchi','boss_qiangzheng','boss_baolin'],['boss']],
		chess_xingtian:['male','qun',99,['boss_moyan','wushuang'],['boss']],
	},
	posmap:{},
	help:{
		'战棋模式':'<ul><li>n人对战n人的模式，由单人控制，开始游戏后随机分配位置与出牌顺序<li>'+
		'每人在出牌阶段有一次移动的机会，若一名角色在移动之前使用过指定其他角色为目标的牌，该回合可移动的最大距离为2，否则最大距离为1<li>'+
		'任何卡牌或技能无法指定位置相隔8个格以上的角色为目标<li>'+
		'杀死对方阵营的角色可摸一张牌，杀死本方阵营无惩罚'
	},
	config:['battle_number','ban_weak','free_choose','change_choice',
	function(game,lib,get,ui){
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
	}],
}
