'use strict';
// next: 新建卡组
mode.hearthstone={
	start:function(){
		"step 0"
		lib.init.css(lib.assetURL+'layout/default/','hearthstone');
		game.initStone();
		var playback=localStorage.getItem(lib.configprefix+'playback');
		if(!playback){
			(function(){
				ui.deckBuilder=ui.create.div('.popup-container#deck-builder',function(){
					if(careerList.classList.contains('shown')){
						careerList.classList.remove('shown');
						newDeck.classList.remove('active');
					}
					else if(!cardDialog.classList.contains('shown')){
						this.classList.remove('shown');
						this.timeout=setTimeout(function(){
							ui.deckBuilder.remove();
						},500);
						ui.arena.style.top='';
						ui.arena.style.transform='';
						ui.arena.style.opacity='';
						ui.system.style.opacity='';
						ui.auto.show();
						ui.pause.show();
						ui.historybar.show();
					}
				});
				var clickNode=function(){
					cardDialog.classList.add('shown');
					controls.classList.add('shown');
					var name='未命名';
					for(var i=1;;i++){
						if(!lib.storage.deckList[name+i]){
							break;
						}
					}
					cardDialog.editing={
						name:name+i,
						content:{
							career:this.firstChild.dataset.career,
							deck:[]
						},
					}
					rename.innerHTML=name+i;
					newDeck.innerHTML='确认编辑';
					newDeck.classList.add('active');
					careerList.classList.remove('shown');
					listContainer.style.transform='translateX(200px)';
					deckContainer.innerHTML='';
					deckContainer.classList.add('shown');
					updateCardDialog();
				}
				var careerList=ui.create.div('.shadowed.career',ui.deckBuilder);
				for(var i=0;i<lib.careerList.length;i++){
					var node=ui.create.div(careerList,clickNode);
					ui.create.div('.menubutton.round',node).dataset.career=lib.careerList[i];
					ui.create.div('.text',lib.translate[lib.careerList[i]],node);
				}
				var controls=ui.create.div('.controls',ui.deckBuilder);
				var cardCount=ui.create.div('.card-count',controls);
				ui.create.div('.menubutton.large','删除',controls,function(e){
					if(this.innerHTML=='删除'){
						this.innerHTML='确定';
						var that=this;
						setTimeout(function(){
							that.innerHTML='删除';
						},1000);
					}
					else{
						cardDialog.classList.remove('shown');
						controls.classList.remove('shown');
						newDeck.innerHTML='新建卡组';
						newDeck.classList.remove('active');
						var editing=cardDialog.editing;
						if(editing){
							if(editing.origin){
								delete lib.storage.deckList[editing.origin];
								for(var i=0;i<listContainer.childElementCount;i++){
									if(listContainer.childNodes[i].name==editing.origin){
										listContainer.childNodes[i].remove();break;
									}
								}
							}
						}
						game.save('deckList',lib.storage.deckList);
						listContainer.style.transform='';
						deckContainer.classList.remove('shown');
						updateCardDialog();
					}
					e.stopPropagation();
				});
				var rename=ui.create.div('.menubutton.large','重命名',controls);
				rename.contentEditable=true;
				rename.onfocus=function(){
					var range = document.createRange();
					range.selectNodeContents(this);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				};
				rename.onblur=function(){
					if(cardDialog.editing){
						if(!lib.storage.deckList[this.innerHTML]){
							cardDialog.editing.name=this.innerHTML;
						}
						else{
							this.innerHTML=cardDialog.editing.name;
						}
					}
					var sel = window.getSelection();
					sel.removeAllRanges();
				};
				rename.onkeydown=function(e){
					if(e.keyCode==13){
						e.preventDefault();
						e.stopPropagation();
						rename.blur();
					}
				};
				var removeLine=function() {
					rename.innerHTML=rename.innerHTML.replace(/\n|<br>/g,'');
				};
				var observer = new MutationObserver(removeLine);
				observer.observe(rename,{characterData:true,subtree:true});
				rename.addEventListener('keyup',removeLine);

				var cardDialog=ui.create.cardDialog(true,function(name){
					if(lib.card[name].hidden) return true;
				},{seperate:function(list){
					var result={
						list:{}
					};
					for(var i=0;i<lib.careerList.length;i++){
						var className=get.translation(lib.careerList[i]);
						result[className]=[];
						result.list[className]=[];
					}
					result['中立']=[];
					result.list['中立']=[];
					for(var i=0;i<list.length;i++){
						var className=get.translation(lib.card[list[i][2]].class);
						if(!result[className]){
							result[className]=[];
							result.list[className]=[];
						}
						result.list[className].push(list[i]);
						result[className].push(list[i]);
					}
					return result;
				}});
				for(var i=0;i<cardDialog.buttons.length;i++){
					var node=cardDialog.buttons[i];
					if(lib.config.touchscreen){
						lib.setLongPress(node,ui.click.intro);
					}
					else{
						if(lib.config.hover_all){
							lib.setHover(node,ui.click.hoverplayer);
						}
						if(lib.config.right_info){
							node.oncontextmenu=ui.click.rightplayer;
						}
					}
				}
				var updateCardDialog=function(button){
					if(!deckContainer.classList.contains('shown')){
						for(var i=0;i<cardDialog.buttons.length;i++){
							cardDialog.buttons[i].classList.remove('unselectable');
						}
						for(var i=0;i<cardDialog.content.childElementCount;i++){
							cardDialog.content.childNodes[i].classList.remove('nodisplay');
						}
						return;
					}
					if(deckContainer.childElementCount>=30){
						for(var i=0;i<cardDialog.buttons.length;i++){
							cardDialog.buttons[i].classList.add('unselectable');
						}
					}
					else{
						var nummap={};
						for(var i=0;i<deckContainer.childElementCount;i++){
							var name=deckContainer.childNodes[i].name;
							if(!nummap[name]){
								nummap[name]=1;
							}
							else{
								nummap[name]++;
							}
						}
						var list=[];
						for(var i in nummap){
							if(nummap[i]>=2){
								list.push(i);
							}
						}
						for(var i=0;i<cardDialog.buttons.length;i++){
							if(list.contains(cardDialog.buttons[i].link[2])){
								cardDialog.buttons[i].classList.add('unselectable');
							}
							else{
								cardDialog.buttons[i].classList.remove('unselectable');
							}
						}
					}
					var career=cardDialog.editing.content.career;
					for(var i=0;i<cardDialog.content.childElementCount;i++){
						var currentNode=cardDialog.content.childNodes[i];
						if(currentNode.link){
							if(currentNode.link==career){
								currentNode.classList.remove('nodisplay');
								currentNode.nextSibling.classList.remove('nodisplay');
							}
							else{
								currentNode.classList.add('nodisplay');
								currentNode.nextSibling.classList.add('nodisplay');
							}
						}
					}
					cardCount.innerHTML=deckContainer.childElementCount+'/30';
				};
				var clickCard=function(){
					this.remove();
					updateCardDialog();
				};
				var clickButton=function(){
					if(!deckContainer.classList.contains('shown')) return;
					if(!this.classList.contains('unselectable')){
						var card=ui.create.card(null,'noclick').init(this.link).listen(clickCard);
						deckContainer.insertBefore(card,deckContainer.firstChild);
						updateCardDialog();
					}
				}
				for(var i=0;i<cardDialog.buttons.length;i++){
					cardDialog.buttons[i].listen(clickButton);
				}
				cardDialog.classList.add('fullheight');
				cardDialog.classList.add('scroll1');
				cardDialog.classList.add('scroll2');
				cardDialog.classList.add('fixed');
				cardDialog.listen(function(e){
					e.stopPropagation();
				});

				ui.deckBuilder.appendChild(cardDialog);
				var deckList=ui.create.div('.shadowed.list',ui.deckBuilder,function(e){
					e.stopPropagation();
					if(careerList.classList.contains('shown')){
						careerList.classList.remove('shown');
						newDeck.classList.remove('active');
					}
				});
				var editDeck=function(){
					if(!cardDialog.classList.contains('shown')){
						cardDialog.classList.add('shown');
						controls.classList.add('shown');
						var info=lib.storage.deckList[this.name];
						cardDialog.editing={
							origin:this.name,
							name:this.name,
							content:{
								career:info.career,
								deck:info.deck
							},
						}
						rename.innerHTML=this.name;
						newDeck.innerHTML='确认编辑';
						newDeck.classList.add('active');
						careerList.classList.remove('shown');
						listContainer.style.transform='translateX(200px)';
						deckContainer.innerHTML='';
						for(var i=0;i<info.deck.length;i++){
							ui.create.card(deckContainer,'noclick').init(['',get.translation(lib.card[info.deck[i]].type),info.deck[i]]).listen(clickCard);
						}
						deckContainer.classList.add('shown');
						updateCardDialog();
					}
				};
				var newDeck=ui.create.div('.menubutton.large.create','新建卡组',deckList,function(e){
					if(this.innerHTML=='新建卡组'){
						this.classList.toggle('active');
						if(this.classList.contains('active')){
							careerList.classList.add('shown');
						}
						else{
							careerList.classList.remove('shown');
						}
					}
					else{
						cardDialog.classList.remove('shown');
						controls.classList.remove('shown');
						this.innerHTML='新建卡组';
						this.classList.remove('active');
						var editing=cardDialog.editing;
						if(editing){
							editing.content.deck.length=0;
							for(var i=0;i<deckContainer.childElementCount;i++){
								editing.content.deck.push(deckContainer.childNodes[i].name);
							}
							editing.content.deck.sort(function(a,b){
								if(a>b) return 1;
								if(a<b) return -1;
								return 0;
							});
							if(editing.origin){
								for(var i=0;i<listContainer.childElementCount;i++){
									if(listContainer.childNodes[i].name==editing.origin){
										listContainer.childNodes[i].name=editing.name;
										listContainer.childNodes[i].firstChild.innerHTML=editing.name;
										break;
									}
								}
								delete lib.storage.deckList[editing.origin];
							}
							else if(!lib.storage.deckList[editing.name]){
								var deckitem=ui.create.div('.deckitem.shadowed','<span>'+editing.name+'</span>',
									listContainer,editDeck);
								ui.create.div('.menubutton.round',deckitem).dataset.career=editing.content.career;
								deckitem.name=editing.name;
							}
							lib.storage.deckList[editing.name]=editing.content;
						}
						game.save('deckList',lib.storage.deckList);
						listContainer.style.transform='';
						deckContainer.classList.remove('shown');
						updateCardDialog();
					}
					e.stopPropagation();
				});
				var listContainer=ui.create.div('.list-container',deckList);
				for(var i in lib.storage.deckList){
					var deckitem=ui.create.div('.deckitem.shadowed','<span>'+i+'</span>',
						listContainer,editDeck);
					ui.create.div('.menubutton.round',deckitem).dataset.career=lib.storage.deckList[i].career;
					deckitem.name=i;
				}
				var deckContainer=ui.create.div('.list-container.deck',deckList);

				ui.deckcontrol=ui.create.system('卡组管理',function(){
					ui.arena.style.opacity=0;
					ui.system.style.opacity=0;
					ui.window.appendChild(ui.deckBuilder);
					if(ui.deckBuilder.timeout){
						clearTimeout(ui.deckBuilder.timeout);
						delete ui.deckBuilder.timeout;
					}
					ui.refresh(ui.deckBuilder);
					ui.deckBuilder.classList.add('shown');
					ui.auto.hide();
					ui.pause.hide();
					ui.historybar.hide();
				},true);
			}());

		}

		if(playback){
			ui.create.me();
			ui.arena.style.display='none';
			ui.system.style.display='none';
			_status.playback=playback;
			localStorage.removeItem(lib.configprefix+'playback');
			var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
			store.get(parseInt(playback)).onsuccess=function(e){
				if(e.target.result){
					game.playVideoContent(e.target.result.video);
				}
				else{
					alert('播放失败：找不到录像');
					game.reload();
				}
			}
			event.finish();
		}
		else{
			game.prepareArena(2);
			game.delay();
		}
		ui.arena.classList.add('stone');
		"step 1"
		for(var i=0;i<game.players.length;i++){
			game.players[i].getId();
			game.players[i].classList.add('noidentity');
		}
		game.enemy=game.me.next;
		if(lib.storage.test){
			lib.config.game_speed='vfast';
			_status.auto=true;
			ui.auto.classList.add('glow');
		}
		game.chooseCharacter();
		"step 2"
		if(_status.mode=='deck'){
			_status.deckButton=ui.create.system('卡组',null,true);
			lib.setPopped(_status.deckButton,function(){
				var uiintro=ui.create.dialog('hidden');
				uiintro.listen(function(e){
					e.stopPropagation();
				});
				uiintro.add('剩余 <span style="font-family:'+'xinwei'+'">'+game.me.deckCards.length);
				uiintro.addSmall([game.me.deckCards,'card']);
				return uiintro;
			},220);
			if(get.config('skill_bar')){
				_status.rageEnabled=true;

				ui.friendBar=ui.create.div('.skillbar.right.shadowed.playerbg',ui.arena);
				ui.enemyBar=ui.create.div('.skillbar.left.shadowed.playerbg',ui.arena);
				// ui.friendBar.dataset.nature='metal';
				// ui.enemyBar.dataset.nature='fire';
				ui.create.div('.skillbarshadow',ui.friendBar);
				ui.create.div('.skillbarshadow',ui.enemyBar);
				ui.create.div('.skillbarfill',ui.friendBar);
				ui.create.div('.skillbarfill',ui.enemyBar);
				ui.friendBar.fillnode=ui.create.div(ui.friendBar.lastChild);
				ui.enemyBar.fillnode=ui.create.div(ui.enemyBar.lastChild);
				// ui.friendBar.popnode=ui.create.div('.skillbartext',ui.friendBar);
				// ui.enemyBar.popnode=ui.create.div('.skillbartext',ui.enemyBar);
				_status.friendRage=0;
				_status.enemyRage=0;

				if(lib.config.touchscreen){
					lib.setLongPress(ui.friendBar,ui.click.intro);
					lib.setLongPress(ui.enemyBar,ui.click.intro);
				}
				else{
					if(lib.config.hover_all){
						lib.setHover(ui.friendBar,ui.click.hoverplayer);
						lib.setHover(ui.enemyBar,ui.click.hoverplayer);
					}
					if(lib.config.right_info){
						ui.friendBar.oncontextmenu=ui.click.rightplayer;
						ui.enemyBar.oncontextmenu=ui.click.rightplayer;
					}
				}
			}
		}
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

		var players=get.players(lib.sort.position);
		var info=[];
		for(var i=0;i<players.length;i++){
			info.push({
				name:players[i].name,
				name2:players[i].name2,
				count:players[i].actcount
			});
		}
		_status.videoInited=true,
		game.addVideo('init',null,info);

		event.trigger('gameStart');
		if(_status.mode=='deck'){
			game.gameDraw(game.me,3);
			game.me.drawDeck(1,false);
			game.me.next.drawDeck(1,false);
		}
		else{
			game.gameDraw(game.me);
		}
		"step 3"
		game.me.chooseBool('是否置换手牌？');
		"step 4"
		if(result.bool){
			var hs=game.me.get('h');
			for(var i=0;i<hs.length;i++){
				ui.discardPile.appendChild(hs[i]);
			}
			if(_status.mode=='deck'){
				game.me.drawDeck(1,false);
				game.me.directgain(get.cards(3));
			}
			else{
				game.me.directgain(get.cards(4));
			}
		}
		"step 5"
		if(game.me.side){
			game.stoneLoop(game.me);
		}
		else{
			game.stoneLoop(game.enemy);
		}
	},
	element:{
		content:{
			addFellowAuto:function(){
				"step 0"
				if(!player.canAddFellow()){
					event.finish();
					return;
				}
				var name=event.fellowName;
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
				var fellow=game.addFellow(pos,name,'zoominanim');
				fellow.side=player.side;
				fellow.classList.add('turnedover');
				player.actcharacterlist[i]=fellow;
				event.source=fellow;
				var num=lib.character[name][5][1];
				if(num){
					fellow.draw(num,false);
				}
				player.updateActCount();
				if(fellow.hasSkillTag('noPhaseDelay')||event.delay===false){
					fellow.noPhaseDelay=true;
				}
				// player.line(fellow,'green');
				"step 1"
				event.trigger('fellow');
				event.result=event.source;
			}
		},
		stonecharacter:{
			type:'stonecharacter',
			fullimage:true,
			enable:function(event,player){
				return player.canAddFellow();
			},
			chongzhu:true,
			notarget:true,
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
				if(fellow.hasSkillTag('noPhaseDelay')){
					fellow.noPhaseDelay=true;
				}
				"step 1"
				event.trigger('fellow');
			},
			ai:{
				order:8.5,
				useful:[5.5,1],
				result:{
					player:1
				}
			}
		},
		player:{
			init:function(player){
				if(!player.isMin()||player.forcemin){
					if(!player.node.actcount){
						player.node.actcount=ui.create.div('.actcount.hp',player);
					}
					if(typeof player.actcount!=='number'){
						player.actcount=0;
					}
					player.actused=0;
					if(!player.actcharacterlist){
						player.actcharacterlist=[];
					}
					player.updateActCount();
				}
			},
			changeRage:function(num){
				if(_status.mode!='deck') return;
				if(!_status.rageEnabled) return;
				var popup=null;
				if(this.side==game.me.side){
					if(_status.friendRage<100){
						popup=ui.friendBar;
					}
					_status.friendRage+=num;
					if(_status.friendRage<0){
						_status.friendRage=0;
					}
					if(_status.friendRage>=100){
						_status.friendRage=100;
						ui.friendBar.fillnode.style.top='-50%';
						ui.friendBar.classList.add('full');
					}
					else{
						ui.friendBar.fillnode.style.top=(100-_status.friendRage)+'%';
						ui.friendBar.classList.remove('full');
					}
				}
				else{
					if(_status.enemyRage<100){
						popup=ui.enemyBar;
					}
					_status.enemyRage+=num;
					if(_status.enemyRage<0){
						_status.enemyRage=0;
					}
					if(_status.enemyRage>=100){
						_status.enemyRage=100;
						ui.enemyBar.fillnode.style.top='-50%';
						ui.enemyBar.classList.add('full');
					}
					else{
						ui.enemyBar.fillnode.style.top=(100-_status.enemyRage)+'%';
						ui.enemyBar.classList.remove('full');
					}
				}
				if(num>0&&popup){
					var node=ui.create.div('.skillbartext',num.toString(),popup);
					ui.refresh(node);
					node.style.opacity=1;
					setTimeout(function(){
						node.delete();
					},700);
				}
			},
			drawDeck:function(num,log){
				if(!num){
					num=1;
				}
				var cards=this.getDeckCards(num);
				if(log==false){
					this.directgain(cards);
				}
				else if(log==true){
					this.directgain(cards);
					game.log(this,'从牌库中获得了'+get.cnNumber(num)+'张牌');
				}
				else{
					this.gain(cards,'draw');
					game.log(this,'从牌库中获得了'+get.cnNumber(num)+'张牌');
				}
				return cards;
			},
			updateActCount:function(used,countx,current){
				if(_status.video){
					this.actcount=countx||2;
				}
				else{
					game.addVideo('updateActCount',this,[used,this.actcount,this.getActCount()]);
				}
				var maxcount,overflow2;
				if(lib.config.layout=='default'||used=='outphase'||_status.currentPhase!=this){
					maxcount=this.actcount;
				}
				else{
					if(_status.video){
						maxcount=this.actcount-(current||0);
					}
					else{
						maxcount=this.actcount-this.getActCount();
					}
					if(this.actcount>maxcount){
						maxcount=this.actcount;
					}
					if(maxcount>12){
						maxcount=this.actcount+1;
						this.node.actcount.classList.add('overflow2');
					}
					else{
						this.node.actcount.classList.remove('overflow2');
					}
				}
				for(var i=0;i<12;i++){
					if(maxcount>this.node.actcount.childElementCount){
						ui.create.div(this.node.actcount);
					}
					else if(maxcount<this.node.actcount.childElementCount){
						this.node.actcount.lastChild.remove();
					}
					else{
						break;
					}
				}
				if(used!==false){
					var count;
					if(_status.video){
						count=this.actcount-(current||0);
					}
					else{
						count=this.actcount-this.getActCount();
					}
					for(var i=0;i<this.node.actcount.childElementCount;i++){
						if(i<count){
							this.node.actcount.childNodes[i].classList.remove('lost');
							if(i>=this.actcount){
								this.node.actcount.childNodes[i].classList.add('overflow');
							}
							else{
								this.node.actcount.childNodes[i].classList.remove('overflow');
							}
						}
						else{
							this.node.actcount.childNodes[i].classList.add('lost');
							this.node.actcount.childNodes[i].classList.remove('overflow');
						}
					}
				}
			},
			getAct:function(){
				return this.actcount-this.getActCount();
			},
			hasFellowSkill:function(skill,exclude){
				for(var i=0;i<game.players.length;i++){
					if(exclude&&game.players[i]==this) continue;
					if(game.players[i].hasSkill(skill)&&
					game.players[i].side==this.side){
						return true;
					}
				}
				return false;
			},
			countFellowSkill:function(skill,exclude){
				var num=0;
				for(var i=0;i<game.players.length;i++){
					if(exclude&&game.players[i]==this) continue;
					if(game.players[i].hasSkill(skill)&&
					game.players[i].side==this.side){
						num++;
					}
				}
				return num;
			},
			canAddFellow:function(){
				if(!this.actcharacterlist) return false;
				if(this.actcharacterlist.length<4) return true;
				for(var i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]===null) return true;
				}
				return false;
			},
			getDeckCards:function(num){
				if(typeof num!='number'){
					num=1;
				}
				if(!this.deckCards){
					return get.cards(num);
				}
				var player=this;
				for(var i=0;i<5;i++){
					if(player.deckCards.length<num){
						get.deck(player,player.deck);
					}
					else{
						break;
					}
				}
				var list=[];
				for(var i=0;i<num;i++){
					list.push(player.deckCards.randomRemove());
				}
				return list;
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
			getFellow:function(enemy){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()){
						if(enemy){
							if(game.players[i].side!=this.side){
								list.push(game.players[i]);
							}
						}
						else{
							if(game.players[i].side==this.side){
								list.push(game.players[i]);
							}
						}
					}
				}
				return list;
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
				game.addVideo('stonePosition',null,[fellow.dataset.position,i+4+(this==game.me?0:4)]);
				fellow.dataset.position=i+4+(this==game.me?0:4);
				return this;
			},
			addFellowAuto:function(name,delay){
				var next=game.createEvent('addFellowAuto');
				next.player=this;
				next.fellowName=name;
				if(typeof delay=='boolean'){
					next.delay=delay;
				}
				next.setContent('addFellowAuto');
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
						_status.friendCount.innerHTML='友军: '+get.cnNumber(0);
						game.over(false);
					}
					else{
						game.pause();
						_status.deadfriend.push(this);
						game.additionaldead.push(this);
						setTimeout(function(){
							var player=ui.create.player();
							player.getId();
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
							player.maxHp++;
							player.hp++;
							if(_status.mode=='deck'){
								get.deck(player,_status.deck.shift());
							}
							game.players.push(player);
							ui.arena.appendChild(player);

							game.addVideo('stoneSwap',null,{
								name:player.name,
								name2:player.name2,
								position:player.dataset.position,
								actcount:player.actcount,
								me:true
							});
							game.swapControl(player);
							game.arrangePlayers();
							if(_status.mode=='deck'){
								var nd=game.enemy.countFellow();
								if(nd){
									player.draw(3+nd,{drawDeck:nd},false);
								}
								else{
									player.draw(3,false);
								}
							}
							else{
								player.draw(3+game.enemy.countFellow(),false);
							}
							game.resume();
							game.updateStatusCount();
						},lib.config.duration);

					}
				}
				else if(game.enemy.isDead()){
					if(!_status.enemylist.length){
						_status.enemyCount.innerHTML='敌军: '+get.cnNumber(0);
						game.over(true);
					}
					else{
						game.pause();
						_status.deadenemy.push(this);
						game.additionaldead.push(this);
						setTimeout(function(){
							var player=ui.create.player();
							player.getId();
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
							player.maxHp++;
							player.hp++;
							if(_status.mode=='deck'){
								get.deck(player,'random');
							}
							game.players.push(player);
							game.enemy=player;
							ui.arena.appendChild(player);

							game.addVideo('stoneSwap',null,{
								name:player.name,
								name2:player.name2,
								position:player.dataset.position,
								actcount:player.actcount,
							});
							game.arrangePlayers();
							if(_status.mode=='deck'){
								var nd=game.me.countFellow();
								if(nd){
									player.draw(3+nd,{drawDeck:nd},false);
								}
								else{
									player.draw(3,false);
								}
							}
							else{
								player.draw(3+game.me.countFellow(),false);
							}
							game.resume();
							game.updateStatusCount();
						},lib.config.duration);
					}
				}
				if(source&&source.side!=this.side&&!source.isMin()){
					if(_status.mode=='deck'){
						source.drawDeck();
					}
					else{
						source.draw();
					}
					source.actused--;
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
	careerList:['mage','shaman','druid','paladin','rogue','priest','hunter','warrior','warlock'],
	game:{
		reserveDead:true,
		getVideoName:function(){
			var str=get.translation(game.me.name);
			if(game.me.name2){
				str+='/'+get.translation(game.me.name2);
			}
			var name=[
				str,'炉石 - '+get.config('battle_number')+'人'
			];
			return name;
		},
		updateStatusCount:function(){
			_status.friendCount.innerHTML='友军: '+get.cnNumber(1+_status.mylist.length/(_status.double_character?2:1),true);
			_status.enemyCount.innerHTML='敌军: '+get.cnNumber(1+_status.enemylist.length/(_status.double_character?2:1),true);
		},
		stoneLoop:function(player){
			var next=game.createEvent('phaseLoop');
			next.player=player;
			next.setContent(function(){
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
			});
		},
		initStone:function(){
			lib.spells=[];
			lib.minions=[];
			lib.weapons=[];
			lib.classSpells={neutral:[]};
			lib.classMinions={neutral:[]};
			lib.classWeapons={neutral:[]};
			for(var i=0;i<lib.careerList.length;i++){
				lib.classSpells[lib.careerList[i]]=[];
				lib.classMinions[lib.careerList[i]]=[];
				lib.classWeapons[lib.careerList[i]]=[];
			}
			for(var i in lib.card){
				if(i=='list') continue;
				if(lib.card[i].health){
					lib.minions.push(i);
					lib.classMinions[lib.card[i].class].push(i);
				}
				else if(lib.card[i].duration){
					lib.weapons.push(i);
					lib.classMinions[lib.card[i].class].push(i);
				}
				else{
					lib.spells.push(i);
					lib.classMinions[lib.card[i].class].push(i);
				}
				lib.card[i].fullimage=true;
				lib.card[i].image='hearthstone/'+i;
			}
			if(!lib.storage.deckList){
				lib.storage.deckList={};
			}
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.setContent(function(){
				"step 0"
				var i;
				var list=[];
				event.list=list;
				for(i in lib.character){
					if(lib.character[i][4]&&lib.character[i][4].contains('minskin')) continue;
					if(lib.character[i][4]&&lib.character[i][4].contains('stonehidden')) continue;
					if(lib.config.forbidstone.contains(i)) continue;
					if(lib.filter.characterDisabled(i)) continue;
					list.push(i);
				}
				list.randomSort();
				var dialog=ui.create.dialog('按顺序选择出场角色'+(get.config('double_character')?'（双将）':''),'hidden');
				dialog.add('0/'+(get.config('double_character')?2:1)*get.config('battle_number'));
				dialog.add([list.slice(0,get.config('battle_number')*2+5),'character']);
				dialog.open();

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
					if(game.changeCoin){
						game.changeCoin(-3);
					}
					list.randomSort();

					var buttons=ui.create.div('.buttons');
					var node=_status.event.dialog.buttons[0].parentNode;
					_status.event.dialog.buttons=ui.create.buttons(list.slice(0,get.config('battle_number')*2+5),'character',buttons);
					_status.event.dialog.content.insertBefore(buttons,node);
					buttons.animate('start');
					node.remove();

					game.uncheck();
					game.check();
				};
				ui.create.cheat=function(){
					_status.createControl=ui.cheat2;
					ui.cheat=ui.create.control('更换',event.changeDialog);
					delete _status.createControl;
				};
				event.dialogxx=ui.create.characterDialog();
				ui.create.cheat2=function(){
					ui.cheat2=ui.create.control('自由选将',function(){
						if(this.dialog==_status.event.dialog){
							if(game.changeCoin){
								game.changeCoin(50);
							}
							this.dialog.close();
							_status.event.dialog=this.backup;
							this.backup.open();
							delete this.backup;
							game.uncheck();
							game.check();
							if(ui.cheat){
								ui.cheat.style.opacity=1;
							}
						}
						else{
							if(game.changeCoin){
								game.changeCoin(-10);
							}
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
				if(ui.deckcontrol){
					ui.deckcontrol.remove();
					delete ui.deckcontrol;
				}
				_status.mylist=result.links.slice(0);
				for(var i=0;i<result.links.length;i++){
					event.list.remove(result.links[i]);
				}
				event.list.randomSort();
				_status.enemylist=event.list.slice(0,result.links.length);
				_status.double_character=get.config('double_character');
				"step 2"
				event.choosingDeck=true;
				if(_status.mode=='deck'){
					_status.deck=[];
					if(!_status.auto){
						ui.auto.hide();
						game.pause();
						var list=_status.mylist.slice(0);
						if(_status.double_character){
							event.dialog=ui.create.dialog('','hidden');
						}
						else{
							event.dialog=ui.create.dialog('','hidden');
						}

						var buttons=ui.create.div('.buttons',event.dialog.content);
						var currentNode=null;
						var clickButton=function(click){
							if(!event.choosingDeck) return;
							if(click!==false){
								_status.deck.push(this.name);
							}
							if(currentNode){
								currentNode.delete();
							}
							if(list.length){
								var names=[];
								if(_status.double_character){
									names.push(list.shift());
									names.push(list.shift());
									event.dialog.content.firstChild.innerHTML='为'+get.translation(names[0])+'/'+get.translation(names[1])+'选择一个卡组';
									currentNode=ui.create.player().init(names[0],names[1]);
								}
								else{
									names.push(list.shift());
									event.dialog.content.firstChild.innerHTML='为'+get.translation(names[0])+'选择一个卡组';
									currentNode=ui.create.player().init(names[0]);
								}
								currentNode.classList.add('stone_deck');
								ui.arena.appendChild(currentNode);
								ui.refresh(currentNode);
								currentNode.classList.add('shown');
							}
							else{
								event.choosingDeck=false;
								event.dialog.close();
								ui.auto.show();
								game.resume();
							}
						}
						clickButton(false);
						for(var i in lib.storage.deckList){
							if(lib.storage.deckList[i].deck.length==30){
								var deckitem=ui.create.div('.deckitem.shadowed','<span>'+i+'</span>',buttons,clickButton);
								ui.create.div('.menubutton.round',deckitem).dataset.career=lib.storage.deckList[i].career;
								deckitem.name=i;
							}
						}
						for(var i=0;i<lib.careerList.length;i++){
							var deckitem=ui.create.div('.deckitem.shadowed','<span>随机</span>',buttons,clickButton);
							ui.create.div('.menubutton.round',deckitem).dataset.career=lib.careerList[i];
							deckitem.name='random:'+lib.careerList[i];
						}
						event.dialog.open();
					}
					else{
						var bn=parseInt(get.config('battle_number'));
						for(var i=0;i<bn;i++){
							_status.deck.push('random');
						}
					}
				}
				"step 3"
				game.addRecentCharacter.apply(this,_status.mylist);
				if(ui.coin){
					_status.coinCoeff=get.coinCoeff(_status.mylist);
				}
				if(_status.double_character){
					game.me.init(_status.mylist.shift(),_status.mylist.shift());
					game.enemy.init(_status.enemylist.shift(),_status.enemylist.shift());
				}
				else{
					game.me.init(_status.mylist.shift());
					game.enemy.init(_status.enemylist.shift());
				}
				game.me.maxHp++;
				game.me.hp++;
				game.me.update();
				game.enemy.maxHp++;
				game.enemy.hp++;
				game.enemy.update();
				if(_status.mode=='deck'){
					get.deck(game.me,_status.deck.shift());
					get.deck(game.enemy,'random');
				}
			});
		},
	},
	get:{
		stonecard:function(type,career){
			var list=[];
			for(var i in lib.card){
				if(lib.card[i].stonehidden) continue;
				if(lib.card[i].type!='stonecard'&&lib.card[i].type!='stonecharacter') continue;
				if(type==1&&lib.card[i].type!='stonecard') continue;
				if(type==2&&lib.card[i].type!='stonecharacter') continue;
				if(career&&lib.card[i].career!=career) continue;
				list.push(i);
			}
			return list;
		},
		deck:function(player,name){
			var career,deck;
			if(name=='random'||name.indexOf('random:')==0){
				if(name=='random'){
					career=lib.careerList.randomGet();
					name=name+':'+career;
				}
				else{
					career=name.slice(7);
				}
				deck=lib.careerMinions[career].randomGets(6).concat(lib.careerMinions[career].randomGets(6)).
				concat(lib.minions.randomGets(6)).concat(lib.spells.randomGets(4)).
				concat(lib.careerSpells[career].randomGets(4)).concat(lib.careerSpells[career].randomGets(4));
			}
			else{
				career=lib.storage.deckList[name].career;
				deck=lib.storage.deckList[name].deck.slice(0);
			}
			deck.sort(function(a,b){
				if(a>b) return 1;
				if(a==b) return 0;
				return -1;
			});
			player.deck=name;
			player.career=career;
			if(!player.node.career){
				player.node.career=ui.create.div('.menubutton.round.identity',player);
				player.node.career.dataset.career=career;
				if(lib.config.touchscreen){
					lib.setLongPress(player.node.career,ui.click.intro);
				}
				else{
					if(lib.config.hover_all){
						lib.setHover(player.node.career,ui.click.hoverplayer);
					}
					if(lib.config.right_info){
						player.node.career.oncontextmenu=ui.click.rightplayer;
					}
				}
			}
			if(!player.deckCards) player.deckCards=[];
			for(var i=0;i<deck.length;i++){
				player.deckCards.push(game.createCard(deck[i]));
			}
		}
	},
	translate:{
		shaman:'萨满',
		mage:'法师',
		priest:'牧师',
		warrior:'战士',
		warlock:'术士',
		knight:'死亡骑士',
		rogue:'潜行者',
		paladin:'圣骑士',
		hunter:'猎人',
		druid:'德鲁伊',
		neutral:'中立'
	},
	ai:{
		get:{
			rawAttitude:function(from,to){
				var num;
				if(to.isMin()&&!to.hasSkill('chaofeng')){
					num=5;
				}
				else{
					num=6;
				}
				return num*(from.side==to.side?1:-1);
			}
		}
	},
}
