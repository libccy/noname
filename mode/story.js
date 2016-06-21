'use strict';
mode.story={
    forcehide:['wuxie','cardPileButton','pause','auto','replay'],
    start:function(){
        'step 0'
        game.loadChess();
        'step 1'
        game.loadScene();
    },
    story:{
        version:1,
        career:{
            zhanshi:{
                name:'战士',
                intro:'擅长各种近战武器，有较高的输出和防御能力，技能学习门槛低，容易速成'
            },
            cike:{
                name:'刺客',
                intro:'远程攻击职业，能较好地配合其他角色打击特定目标，克制低防御力的职业，速度和生存能力较高'
            },
            fashi:{
                name:'法师',
                intro:'法术攻击型职业，可对各位置的敌人造成大量伤害，但生存能力低，需要队友保护',
            },
            jisi:{
                name:'祭司',
                intro:'擅长召唤术，可同时召唤出多个随从，具有很强的干扰能力，但比较惧怕范围攻击',
            },
            fangshi:{
                name:'方士',
                intro:'法术辅助型职业，可有效提升队友的输出和生存能力',
            },
            moushi:{
                name:'谋士',
                intro:'擅长锦囊和阵法，技能效果强大但同时有较高的风险',
            },
            yisheng:{
                name:'医生',
                intro:'治疗和辅助队友，敌方集火的首选目标',
            },
            yanshi:{
                name:'偃师',
                intro:'全能型职业，可通过制造不同的偃甲达到各种效果，但制造和维护偃甲需要较多的资金支持',
            }
        },
        character:{
            zuoci:{
                name:'左慈'
            },
            yuji:{
                name:'于吉'
            },
            nanhua:{
                name:'南华'
            }
        },
        scene:{
            connect:{
                hulaoguan:{
                    name:'虎牢关',
                    to:['middle','east']
                },
                huanghedukou:{
                    name:'黄河渡口',
                    to:['east','north']
                },
                yanmenguan:{
                    name:'雁门关',
                    to:['north','northwest']
                },
                changjiangdukou:{
                    name:'长江渡口',
                    to:['east','southeast']
                },
                jiamengguan:{
                    name:'葭萌关',
                    to:['south','southeast']
                }
            },
            middle:{
                taoyuanxiang:{
                    name:'桃源乡',
                    content:{
                        default:[
                            '东汉末年，桃源乡仙人南华预见了三国时代将会是纷扰的乱世，便施展“九龙逆天大法”扭转时序，打算将曹操、刘备、孙权三位天命王者的出现时间错开',
                            '然而此举却造成上古魔神“刑天”逃脱，并与当世残虐的当权者董卓合而为一，顿时时空陷入前所未有的混乱中。魏蜀吴三国战将能臣散逸各地，便连曹操、刘备、孙权三人也失踪于乱序的时空里',
                            '由于仙人不能将三国的前因后果透露给当世的凡人，最后桃源乡三仙人只好决定召唤一名熟悉三国历史的未来少年来找回三国名将，对抗董卓，让三国历史重新归序',
                            '（桃源乡∙南华小屋内）',
                            ['nanhua','事情的经过大致就是这样'],
                            ['nanhua','这都是我的错，但我们仙人实在无法干涉凡世之事，重建三国秩序的重任只能交给你了'],
                            ['player','可是，我什么都没有，拿什么来对抗董卓？'],
                            ['nanhua','这三卷太平要术是我的心血之作，学好了能够呼风唤雨，对你一定会有帮助'],
                            '得到【太平经】',
                            ['nanhua','左慈和于吉都有事情交代，你去找他们吧'],
                            //左慈：给东西
                            //于吉：选职业，开启技能

                            function(){
                                _status.lockScene=false;
                                var node=ui.window.querySelector('.storyscene');
                                game.data.scene.enabled.push('yingxiongting');
                                game.saveData();
                                var scene=node.childNodes[1];
                                scene.namenode.innerHTML='英雄亭';
                                scene.classList.remove('unselectable')
                                ui.click.scene.call(scene);
                            }
                        ]
                    }
                },
                yingxiongting:{
                    name:'英雄亭',
                    content:{
                        default:[
                            '（英雄亭）',
                            function(){
                                console.log(1);
                                _status.lockScene=false;
                                var node=ui.window.querySelector('.storyscene');
                                ui.click.scene2(node.childNodes[1],true);
                            }
                        ]
                    }
                },
                nanyang:{
                    name:'南阳',
                },
                xinye:{
                    name:'新野'
                },
                xujiacun:{
                    name:'许家村',
                },
            },
            east:{
                luoyang:{
                    name:'洛阳'
                },
                juyang:{
                    name:'雎阳'
                },
                xiapi:{
                    name:'下邳'
                },
                beihai:{
                    name:'北海'
                },
                tianshizhong:{
                    name:'天师冢'
                }
            },
            north:{
                yecheng:{
                    name:'邺城'
                },
                julu:{
                    name:'钜鹿'
                },
                shangdang:{
                    name:'上党'
                },
                beiping:{
                    name:'北平'
                },
                xieliang:{
                    name:'解良'
                },
            },
            northwest:{
                wuwei:{
                    name:'武威'
                },
                xiqiang:{
                    name:'西羌'
                },
                xiongnu:{
                    name:'匈奴'
                },
                huashan:{
                    name:'华山'
                },
                changan:{
                    name:'长安'
                },
            },
            south:{
                chengdu:{
                    name:'成都'
                },
                nanman:{
                    name:'南蛮'
                },
                wulin:{
                    name:'武陵'
                },
                shanyue:{
                    name:'山越'
                },
                changsha:{
                    name:'长沙'
                },
            },
            southeast:{
                xiangyang:{
                    name:'襄阳'
                },
                jianye:{
                    name:'建业'
                },
                chaisang:{
                    name:'柴桑'
                },
                jiangxia:{
                    name:'江夏'
                },
                zhongshan:{
                    name:'钟山'
                },
            }
        }
    },
    game:{
        minskin:true,
		singleHandcard:true,
		chess:true,
        saveData:function(){
			game.save(get.config('save'),game.data);
		},
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
                ui.auto.hide();
                var save=get.config('save');
				if(!save){
					save='save1';
				}
				if(!lib.storage[save]){
					lib.storage[save]={
                        scene:{
                            area:'middle',
                            enabled:['taoyuanxiang'],
                            new:['taoyuanxiang'],
                            content:{}
                        }
                    };
    				game.data=lib.storage[save];
                    // game.saveData();
                    event.node=ui.create.div('.shadowed#create-player');
                    ui.create.div('.caption','创建角色',event.node);
                    setTimeout(function(){
                        ui.window.appendChild(event.node);
                    },250);
                    game.pause();
				}
                else{
    				game.data=lib.storage[save];
                    game.delay(0.5);
                }
                lib.init.css(lib.assetURL+'layout/mode','story');
                'step 1'
                var scenes={};
                var sceneWheel=function(){
                    if(!this.classList.contains('lockscroll')){
                        ui.click.mousewheel.apply(this,arguments);
                    }
                }
                for(var i in lib.story.scene){
                    if(i!='connect'){
                        scenes[i]=ui.create.div('.storyscene');
                        scenes[i].area=i;
                        if(!lib.config.touchscreen&&lib.config.mousewheel){
                			scenes[i]._scrollspeed=30;
                			scenes[i]._scrollnum=10;
                			scenes[i].onmousewheel=sceneWheel;
                		}
                        lib.setScroll(scenes[i]);
                    }
                }
                ui.window.appendChild(scenes[game.data.scene.area].animate('start'));
                var clickScene=function(e){
                    if(_status.lockScene) return;
                    if(this.classList.contains('unselectable')) return;
                    if(this._clicking) return;
                    if(e&&e.stopPropagation) e.stopPropagation();
                    if(this.classList.contains('flipped')){
                        return;
                    }
                    game.data.scene.new.remove(this.name);
                    this.classList.remove('glow3');
                    game.saveData();
                    var sceneNode=this.parentNode;
                    var current=document.querySelector('.flipped.scene');
                    if(current){
                        restoreScene(current,true);
                    }
                    this.content.innerHTML='';
                    if(this.info.to){
                        ui.create.div('.menubutton.large.enter','进入',this.content,switchScene);
                    }
                    else{
                        var content=this.info.content[game.data.scene.content[this.name]||'default'];
                        if(Array.isArray(content)){
                            _status.lockScene=true;
                            game.loadConversation(this.content,content);
                        }
                    }
                    sceneNode.classList.add('lockscroll');
                    var node=this;
                    node._clicking=true;
                    setTimeout(function(){
                        node._clicking=false;
                    },700);
                    sceneNode.dx=ui.window.offsetWidth/2-(-sceneNode.scrollLeft+this.offsetLeft+this.offsetWidth/2);
                    if(Math.abs(sceneNode.dx)<20){
                        sceneNode.dx=0;
                    }
                    if(!sceneNode.sceneInterval&&sceneNode.dx){
                        sceneNode.sceneInterval=setInterval(function(){
                            var dx=sceneNode.dx;
                            if(Math.abs(dx)<=2){
                                sceneNode.scrollLeft-=dx;
                                clearInterval(sceneNode.sceneInterval);
                                delete sceneNode.sceneInterval;
                            }
                            else{
                                var ddx=dx/Math.sqrt(Math.abs(dx))*1.5;
                                sceneNode.scrollLeft-=ddx;
                                sceneNode.dx-=ddx;
                            }
                        },16);
                    }
                    node.style.transition='all ease-in 0.2s';
					node.style.transform='perspective(1600px) rotateY(90deg) scale(0.75)';
					var onEnd=function(){
                        node.removeEventListener('webkitTransitionEnd',onEnd);
                        node.classList.add('flipped');
                        sceneNode.classList.add('lockscroll');
                        node.style.transition='all ease-out 0.4s';
						node.style.transform='perspective(1600px) rotateY(180deg) scale(1)'
					};
					node.addEventListener('webkitTransitionEnd',onEnd);
                }
                ui.click.scene=clickScene;
                var restoreScene=function(node,forced){
                    if(_status.lockScene) return;
                    if(node._clicking&&!forced) return;
                    if(node.transformInterval){
                        clearInterval(node.transformInterval);
                        delete node.transformInterval;
                    }
                    var sceneNode=node.parentNode;
                    node._clicking=true;
                    setTimeout(function(){
                        node._clicking=false;
                    },700);
                    node.style.transition='all ease-in 0.2s';
					node.style.transform='perspective(1600px) rotateY(90deg) scale(0.75)';
					var onEnd=function(){
                        node.removeEventListener('webkitTransitionEnd',onEnd);
                        node.classList.remove('flipped');
                        if(!sceneNode.querySelector('.flipped')){
                            sceneNode.classList.remove('lockscroll');
                        }
                        node.style.transition='all ease-out 0.4s';
						node.style.transform='perspective(1600px) rotateY(0deg) scale(0.7)'
					};
					node.addEventListener('webkitTransitionEnd',onEnd);
                }
                ui.click.scene2=restoreScene;
                var switchScene=function(){
                    var current=this.parentNode.parentNode;
                    var to=current.info.to;
                    if(to[0]==current.parentNode.area){
                        to=to[1];
                    }
                    else{
                        to=to[0];
                    }
                    restoreScene(current,true);
                    current.parentNode.delete();
                    ui.window.appendChild(scenes[to].animate('start'));
                }
                var createScene=function(name,position,connect){
                    var scene;
                    if(connect){
                        scene=lib.story.scene.connect[name];
                    }
                    else{
                        scene=lib.story.scene[position][name];
                    }
                    var node=ui.create.div('.scene',clickScene);
                    node.style.transform='perspective(1600px) rotateY(0deg) scale(0.7)';
                    node.name=name;
                    node.bgnode=ui.create.div('.background.player',node);
                    node.info=scene;
                    ui.create.div('.avatar',node.bgnode).setBackground('mode/story/scene/'+name);
                    node.namenode=ui.create.div('.name',node,get.verticalStr(scene.name));
                    if(game.data.scene.enabled.contains(name)){
                        if(game.data.scene.new.contains(name)){
                            node.classList.add('glow3');
                        }
                        node.namenode.dataset.nature='soilm';
                    }
                    else{
                        node.classList.add('unselectable');
                        node.namenode.innerHTML=get.verticalStr('未开启');
                    }
                    var content=ui.create.div('.menu',node);
                    lib.setScroll(content);
                    node.content=content;
                    scenes[position].appendChild(node);
                    return node;
                }
                event.custom.add.window=function(){
                    if(_status.lockScene){
                        if(typeof _status.lockScene=='function'){
                            _status.lockScene();
                        }
                    }
                    else{
                        var current=document.querySelector('.flipped.scene');
                        if(current){
                            restoreScene(current);
                        }
                    }
                }
                for(var i in lib.story.scene){
                    if(i=='connect') continue;
                    for(var j in lib.story.scene[i]){
                        createScene(j,i);
                    }
                }
                for(var i in lib.story.scene.connect){
                    for(var j=0;j<lib.story.scene.connect[i].to.length;j++){
                        createScene(i,lib.story.scene.connect[i].to[j],true)
                    }
                }
                game.pause();
            }
        },
        loadConversation:function(node,content,onfinish){
            content=content.slice(0);
            var write=function(){
                if(content.length){
                    var item=content.shift();
                    var node2;
                    if(typeof item=='function'){
                        item(node);
                    }
                    else if(typeof item=='string'){
                        node.innerHTML='';
                        node2=ui.create.div(node,'.conversation');
                        if(item.length<=12){
                            node2.classList.add('center');
                        }
                        ui.create.div('',item,node2);
                    }
                    else if(Array.isArray(item)){
                        if(!node.firstChild||!node.firstChild.classList||!node.firstChild.classList.contains('avatarconversation')){
                            node.innerHTML='';
                        }
                        node2=ui.create.div(node,'.avatarconversation');
                        node2.name=item[0];
                        var first=true;
                        for(var i=0;i<node.childElementCount-1;i++){
                            if(node.childNodes[i].name==node2.name){
                                first=false;
                                if(node.childNodes[i].classList.contains('swap')){
                                    node2.classList.add('swap');
                                }
                                break;
                            }
                        }
                        if(first){
                            if(node2.previousSibling&&!node2.previousSibling.classList.contains('swap')){
                                node2.classList.add('swap');
                            }
                        }
                        ui.create.div('.avatar',node2).style.backgroundImage='url("image/mode/story/character/'+item[0]+'.jpg")';
                        ui.create.div('',item[1],node2);
                        if(node.scrollHeight>node.offsetHeight){
                            node.scrollTop=node.scrollHeight-node.offsetHeight;
                        }
                    }
                    else{
                        write();
                    }
                }
                else{
                    if(typeof onfinish=='function'){
                        onfinish();
                    }
                }
            }
            write();
            _status.lockScene=write;
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
    translate:{
        friend:'友',
        friend2:'友',
        enemy:'敌',
        neutral:'中',
        _chessmove:'移动'
    }
};
