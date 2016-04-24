'use strict';
mode.story={
    start:function(){
        'step 0'
        game.loadChess();
        'step 1'
        game.loadScene();
    },
    game:{
        minskin:true,
		singleHandcard:true,
		chess:true,
        addChessPlayer:function(name,enemy,num,pos){
			if(typeof num!='number'){
				num=4;
			}
			var player=ui.create.player();
			player.animate('start');
			if(enemy){
				player.side=!game.me.side;
				player.setIdentity('enemy');
				player.identity='enemy';
                _status.enemies.push(player);
			}
			else{
				player.side=game.me.side;
				player.setIdentity('friend');
				player.identity='friend';
                _status.friends.push(player);
			}
            game.players.push(player);
			game.phasequeue.push(player);
			ui.chess.appendChild(player);

			if(pos&&!lib.posmap[pos]){
				player.dataset.position=pos;
			}
			else{
				var grids=[];
				var gridnum=ui.chessheight*ui.chesswidth;
				for(var i=0;i<gridnum;i++){
					grids.push(i);
				}
				for(var i=0;i<game.players.length;i++){
					grids.remove(parseInt(game.players[i].dataset.position));
				}
				player.dataset.position=grids.randomGet();
			}
			lib.posmap[player.dataset.position]=player;
			player.init(name);
			if(num){
				player.directgain(get.cards(num));
			}
			game.arrangePlayers();
			player.chessFocus();
            game.setChessInfo();
			return player;
		},
        setChessInfo:function(){
            ui.chessinfo.innerHTML='';
			for(var i=0;i<game.players.length;i++){
                var p=game.players[i];
				var node=ui.create.div('.avatar',ui.chessinfo);
				node.style.backgroundImage=p.node.avatar.style.backgroundImage;
				node.link=p;
				node.listen(ui.click.chessInfo);
				p.instance=node;
				if(_status.currentPhase==p){
					node.classList.add('glow2');
				}
			}
        },
        combat:function(config){
            var next=game.createEvent('combat');
            next.config=config;
            next.content=function(){
                'step 0'
                game.phasequeue=[];
                _status.friends=[];
                _status.enemies=[];

                lib.setPopped(ui.create.system('手牌',null,true),function(){
        			var uiintro=ui.create.dialog('hidden');
        			var added=false;
        			for(var i=0;i<game.players.length;i++){
        				if(game.players[i].side==game.me.side&&game.players[i]!=game.me){
        					added=true;
        					uiintro.add(get.translation(game.players[i]));
        					var cards=game.players[i].get('h');
        					if(cards.length){
        						uiintro.addSmall(cards,true);
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
        		},220);
    			_status.enemyDied=0;
    			_status.friendDied=0;
    			ui.enemyDied=ui.create.system('杀敌: '+get.cnNumber(0),null,true);
    			ui.friendDied=ui.create.system('阵亡: '+get.cnNumber(0),null,true);

                ui.chesssheet=document.createElement('style');
        		document.head.appendChild(ui.chesssheet);

                ui.chesswidth=event.config.size[0];
                ui.chessheight=event.config.size[1];

                ui.chess.style.height=148*ui.chessheight+'px';
        		ui.chess.style.width=148*ui.chesswidth+'px';


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

                ui.create.me();
        		ui.create.fakeme();
                ui.chessinfo=ui.create.div('.fakeme.player',ui.me,function(e){
        			e.stopPropagation();
        		});
        		lib.setScroll(ui.chessinfo);
                var list=['caocao','liubei','sunquan','zhangjiao','yuanshao','dongzhuo'];
                for(var i=0;i<list.length;i++){
                    game.addChessPlayer(list[i],i>=list.length/2,0);
                }
                game.modeSwapPlayer(game.players[3]);
                game.delay(0.5);
                'step 1'
                event.trigger('gameStart');
                game.gameDraw(game.players[0]);
                game.phaseLoop(game.players[0]);
            }
        },
        loadChess:function(){
            var next=game.createEvent('loadChess');
            next.content=function(){
                'step 0'
                game.loadMode('chess');
                'step 1'
                for(var i in result.element){
                    for(var j in result.element[i]){
                        if(j!='dieAfter'){
                            lib.element[i][j]=result.element[i][j];
                        }
                    }
                }
                for(var i in result.ui){
                    for(var j in result.ui[i]){
                        ui[i][j]=result.ui[i][j];
                    }
                }
                ai.get.attitude=result.ai.get.attitude;
                game.modeSwapPlayer=result.game.modeSwapPlayer;
                game.isChessNeighbour=result.game.isChessNeighbour;
                get.chessDistance=result.get.chessDistance;
                lib.skill._chessmove=result.skill._chessmove;
                lib.skill._chessswap=result.skill._chessswap;
                lib.skill._chesscenter=result.skill._chesscenter;
                lib.skill._phasequeue=result.skill._phasequeue;
                'step 2'
                for(var i in lib.skill){
        			if(lib.skill[i].changeSeat){
        				lib.skill[i]={};
        				if(lib.translate[i+'_info']){
        					lib.translate[i+'_info']='此模式下不可用';
        				}
        			}
        		}
        		lib.init.css(lib.assetURL+'layout/mode','chess');
                ui.create.cards();
        		game.finishCards();
                ui.arena.classList.add('chess');

                ui.chessContainer=ui.create.div('#chess-container',ui.arena);
        		lib.setScroll(ui.chessContainer);
        		ui.chess=ui.create.div('#chess',ui.chessContainer);
        		ui.canvas2=document.createElement('canvas');
        		ui.canvas2.id='canvas2';
        		ui.chess.appendChild(ui.canvas2);
        		ui.ctx2=ui.canvas2.getContext('2d');
        		game.me=ui.create.player();

                if(!lib.config.touchscreen){
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
        		}

        		ui.chessscroll1=ui.create.div('.chessscroll.left',ui.chessContainer);
        		ui.chessscroll2=ui.create.div('.chessscroll.right',ui.chessContainer);
        		var chessscroll=function(){
        			if(lib.config.touchscreen) return;
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
            }
        },
        loadScene:function(){
            var next=game.createEvent('loadScene');
            next.content=function(){
                'step 0'
                game.pause();
            }
        }
    },
    element:{
        player:{
            dieAfter:function(){
                var player=this;
				if(_status.friends){
					_status.friends.remove(this);
				}
				if(_status.enemies){
					_status.enemies.remove(this);
				}
				if(ui.friendDied&&player.side==game.me.side){
					ui.friendDied.innerHTML='阵亡: '+get.cnNumber(++_status.friendDied,true);
				}
				if(ui.enemyDied&&player.side!=game.me.side){
					ui.enemyDied.innerHTML='杀敌: '+get.cnNumber(++_status.enemyDied,true);
				}
				delete lib.posmap[player.dataset.position];
				setTimeout(function(){
					player.delete();
				},500);
                if(player.instance){
                    player.instance.remove();
                }
                if(_status.friends.length==0){
                    game.over(false);
                }
                else if(_status.enemies.length==0){
                    game.over(true);
                }
            }
        }
    },
    skill:{
        _attackmove:{
			trigger:{player:'damageEnd'},
			forced:true,
			popup:false,
			priority:50,
			filter:function(event,player){
				if(!event.source) return false;
				if(get.distance(event.source,player,'pure')>2) return false;
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
    },
    posmap:{},
    story:{
        version:1
    },
    translate:{
        friend:'友',
        friend2:'友',
        enemy:'敌',
        neutral:'中',
        _chessmove:'移动'
    }
};
