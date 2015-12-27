'use strict';
mode.stone={
	element:{
		player:{
			init:function(player){
				if(!player.isMin()||player.forcemin){
					if(!player.node.actcount){
						player.node.actcount=ui.create.div('.actcount.hp',player);
					}
					if(typeof player.actcount!=='number'){
						player.actcount=2;
					}
					player.actused=0;
					if(!player.actcharacterlist){
						player.actcharacterlist=[];
					}
					player.updateActCount();
				}
			},
			updateActCount:function(used,countx,current){
				if(_status.video){
					this.actcount=countx||2;
				}
				else{
					game.addVideo('updateActCount',this,[used,this.actcount,this.getActCount()]);
				}
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
				if(used!==false){
					var count;
					if(_status.video){
						count=this.actcount-(current||0);
					}
					else{
						count=this.actcount-this.getActCount();
					}
					for(var i=0;i<this.actcount;i++){
						if(i<count){
							this.node.actcount.childNodes[i].classList.remove('lost');
						}
						else{
							this.node.actcount.childNodes[i].classList.add('lost');
						}
					}
				}
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
				var player=this;
				if(typeof num!='number'){
					num=1;
				}
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
								player.draw(2,false);
								var nd=game.enemy.countFellow();
								if(nd){
									console.log(nd);
									player.directgain(player.getDeckCards(nd));
								}
							}
							else{
								player.draw(2+game.enemy.countFellow(),false);
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
							player.draw(2+game.me.countFellow(),false);
							game.resume();
							game.updateStatusCount();
						},lib.config.duration);
					}
				}
				if(source&&source.side!=this.side&&!source.isMin()){
					source.draw(2);
					if(source.getActCount()>0){
						source.actused--;
					}
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
	cardPack:{
		mode_stone:[
			'zhaohunfan','jintiao','liumangxingzhen','shengerpingdeng','emofengdi','konghunshi',
			'mindieyi','miefafu','dianhaishenzhu','yesushengxue','sanghunzhao','fengraozhijiao'
		]
	},
	characterPack:{
		mode_stone:{
			stone_weibing:['male','wei',2,['stone_weibing'],['minskin','stone'],[1,0]],
			stone_weiguan:['male','wei',1,['stone_weiguan'],['minskin','stone'],[1,2]],
			stone_weijiang:['male','wei',3,['stone_weijiang'],['minskin','stone'],[3,0]],

			stone_shubing:['male','shu',2,['stone_shubing'],['minskin','stone'],[1,0]],
			stone_shuguan:['male','shu',1,['stone_shuguan'],['minskin','stone'],[1,2]],
			stone_shujiang:['male','shu',3,['stone_shujiang'],['minskin','stone'],[3,0]],

			stone_wubing:['male','wu',2,['stone_wubing'],['minskin','stone'],[1,0]],
			stone_wuguan:['male','wu',1,['stone_wuguan'],['minskin','stone'],[1,2]],
			stone_wujiang:['male','wu',3,['stone_wujiang'],['minskin','stone'],[3,0]],

			stone_qunbing:['male','qun',2,['stone_qunbing'],['minskin','stone'],[1,0]],
			stone_qunguan:['male','qun',1,['stone_qunguan'],['minskin','stone'],[1,2]],
			stone_qunjiang:['male','qun',3,['stone_qunjiang'],['minskin','stone'],[3,0]],

			stone_daoshi:['male','qun',1,['stone_daoshi'],['minskin','stone'],[1,2]],
			stone_sanxian:['male','qun',2,['stone_sanxian'],['minskin','stone'],[2,0]],
			stone_yisheng:['male','qun',1,['jijiu'],['minskin','stone'],[2,2]],
			stone_yinshi:['male','qun',1,['stone_yinshi'],['minskin','stone'],[1,2]],
			stone_banxian:['male','qun',3,['stone_banxian'],['minskin','stone'],[3,0]],

			stone_daogu:['female','qun',1,['stone_daogu'],['minskin','stone'],[1,2]],
			stone_gongzhu:['female','wu',1,['shushen'],['minskin','stone'],[2,2]],
			stone_genv:['female','wei',1,['jieyin'],['minskin','stone'],[1,2]],
			stone_wunv:['female','qun',1,['biyue'],['minskin','stone'],[3,2]],
			stone_huanghou:['female','qun',2,['stone_huanghou'],['minskin','stone'],[3,1]],
			stone_feipin:['female','qun',1,['guixiu'],['minskin','stone'],[1,2]],
			stone_yiji:['female','qun',1,['stone_yiji'],['minskin','stone'],[2,2]],

			stone_tuteng1:['none','qun',2,['shaman_tuteng','chaofeng'],['minskin','stone','stonehidden'],[2,0]],
			stone_tuteng2:['none','qun',2,['shaman_tuteng','shaman_zhuore'],['minskin','stone','stonehidden'],[2,0]],
			stone_tuteng3:['none','qun',2,['shaman_tuteng','shaman_fali'],['minskin','stone','stonehidden'],[2,0]],
			stone_tuteng4:['none','qun',2,['shaman_tuteng','shaman_zhiliao'],['minskin','stone','stonehidden'],[2,0]],

			stone_xinbing:['none','qun',2,[],['minskin','stone','stonehidden'],[2,1]],
		}
	},
	careerList:['mage','shaman','druid','paladin','rogue','priest','hunter','warrior','warlock'],
	game:{
		reserveDead:true,
		modPhaseDraw:function(player,num){
			if(_status.mode=='deck'&&!player.isMin()){
				if(num>1){
					player.draw(num-1,false);
				}
				if(num>0){
					player.directgain(player.getDeckCards(),'draw');
				}
				player.$draw(num);
				game.delay();
			}
			else{
				player.draw(num);
			}
		},
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
			for(var i in lib.characterPack.mode_stone){
				lib.character[i]=lib.characterPack.mode_stone[i];
				lib.character[i][3].add('stonesha');
				lib.character[i][3].add('stoneshan');
				lib.character[i][3].add('stonedraw');
				if(lib.character[i][4].contains('stonehidden')) continue;
				name=i+'_stonecharacter';
				if(lib.character[i][5][0]<3){
					list.push(name);
				}
				else{
					list2.push(name);
				}
				lib.card[name]={
					image:'character/'+i,
					stoneact:lib.character[i][5][0]
				};
				for(j in lib.card.stonecharacter){
					lib.card[name][j]=lib.card.stonecharacter[j];
				}
				lib.translate[name]=get.translation(i);
				lib.translate[name+'_info']=get.skillintro(i);
			}
			if(_status.mode=='deck'){
				lib.spells=lib.cardPack.mode_stone.slice(0);
				lib.minions=list.concat(list2);
				if(!lib.storage.deckList){
					lib.storage.deckList={};
				}
			}
			else{
				delete game.modPhaseDraw;
				var random_length=parseInt(get.config('random_length').slice(2));
				if(!random_length){
					random_length=80;
				}
				var addedcardcount=Math.ceil(lib.card.list.length/random_length);
				var addedcardcount2=Math.ceil(lib.card.list.length/random_length/2);
				var suit=['heart','diamond','club','spade'];
				while(addedcardcount--){
					for(i=0;i<list.length;i++){
						lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),list[i]]);
					}
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'shengerpingdeng']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'konghunshi']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'emofengdi']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'mindieyi']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'miefafu']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'sanghunzhao']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'sanghunzhao']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'jintiao']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'zhaohunfan']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'fengraozhijiao']);
				}
				while(addedcardcount2--){
					for(i=0;i<list2.length;i++){
						lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),list2[i]]);
					}
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'liumangxingzhen']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'dianhaishenzhu']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'yesushengxue']);
				}
				lib.card.list.randomSort();
			}

			lib.skill._chongzhu.usable=3;
			for(i in lib.skill){
				if(lib.skill[i].changeSeat){
					lib.skill[i]={};
					if(lib.translate[i+'_info']){
						lib.translate[i+'_info']='此模式下不可用';
					}
				}
			}
			for(i in lib.card){
				if(lib.card[i].type=='equip'){
					lib.card[i].stoneact=0;
				}
				else{
					if(typeof lib.card[i].stoneact==='number'&&!lib.card[i].addinfo){
						lib.card[i].addinfo='消耗 '+lib.card[i].stoneact;
					}
				}
			}

			_status.deadfriend=[];
			_status.deadenemy=[];
			game.additionaldead=[];
		},
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				if(lib.db&&!_status.characterLoaded){
					_status.waitingForCharacters=true;
					game.pause();
				}
				"step 1"
				lib.init.css('layout/mode/','stone');
				_status.mode=get.config('stone_mode');
				game.initStone();
				var playback=localStorage.getItem(lib.configprefix+'playback');

				if(!playback&&_status.mode=='deck'){
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
								ui.system.style.opacity='';
								ui.auto.show();
								ui.pause.show();
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
						var removeLine=function() {
							rename.innerHTML=rename.innerHTML.replace(/\n|<br>/g,'');
						};
						var observer = new MutationObserver(removeLine);
						observer.observe(rename,{characterData:true,subtree:true});
						rename.addEventListener('keyup',removeLine);

						var cardDialog=ui.create.cardDialog(true,function(name){
							var type=lib.card[name].type;
							return type!='stonecard'&&type!='stonecharacter';
						},{seperate:function(list){
							var nl=[],ns=[];
							var result={
								'中立法术':ns,
								'中立随从':nl,
							}
							for(var i=0;i<list.length;i++){
								if(lib.card[list[i][2]].type=='stonecard'){
									ns.push(list[i]);
								}
								else{
									nl.push(list[i]);
								}
							}
							return result;
						}});
						for(var i=0;i<cardDialog.buttons.length;i++){
							if(cardDialog.buttons[i].node.info.innerHTML.indexOf('随从')!=-1){
								var buttonName=cardDialog.buttons[i].link[2];
								buttonName=buttonName.slice(0,buttonName.indexOf('_stonecharacter'));
								buttonName=lib.character[buttonName];
								cardDialog.buttons[i].node.info.innerHTML=buttonName[5][1]+'/'+buttonName[2];
							}
						}
						var updateCardDialog=function(button){
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
							cardCount.innerHTML=deckContainer.childElementCount+'/30';
						};
						var clickCard=function(){
							this.remove();
							updateCardDialog();
						};
						var clickButton=function(){
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
					}());

					ui.deckcontrol=ui.create.system('卡组管理',function(){
						if(lib.config.low_performance){
							ui.arena.style.transform='translateY('+ui.window.offsetHeight+'px)';
						}
						else{
							ui.arena.style.top='100%';
						}
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
					},true);

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
				"step 2"
				for(var i=0;i<game.players.length;i++){
					game.players[i].classList.add('noidentity');
				}
				game.enemy=game.me.next;
				game.chooseCharacter();
				"step 3"
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
					game.gameDraw(game.me,2);
					game.me.directgain(game.me.getDeckCards(2));
					game.me.next.directgain(game.me.next.getDeckCards(2));
				}
				else{
					game.gameDraw(game.me);
				}
				if(game.me.side){
					game.stoneLoop(game.me);
				}
				else{
					game.stoneLoop(game.enemy);
				}
			}
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.content=function(){
				"step 0"
				var i;
				var list=[];
				event.list=list;
				for(i in lib.character){
					if(lib.character[i][4]&&lib.character[i][4].contains('forbidai')) continue;
					if(lib.character[i][4]&&lib.character[i][4].contains('minskin')) continue;
					if(lib.character[i][4]&&lib.character[i][4].contains('stonehidden')) continue;
					if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidall.contains(i)) continue;
					if(lib.config.forbidstone.contains(i)) continue;
					if(lib.config.banned.contains(i)) continue;
					if(!get.config('double_character')&&get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
					if(!get.config('double_character')&&get.config('ban_weak')&&(lib.rank.c.contains(i)||lib.rank.d.contains(i))) continue;
					if(get.config('ban_strong')&&(lib.rank.s.contains(i)||lib.rank.ap.contains(i))) continue;
					if(get.config('double_character')&&lib.config.forbiddouble.contains(i)) continue;
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
						game.changeCoin(-10);
					}
					list.randomSort();
					_status.event.dialog.close();
					_status.event.dialog=ui.create.dialog('按顺序选择出场角色'+(get.config('double_character')?'（双将）':''));
					_status.event.dialog.add('0/'+(get.config('double_character')?2:1)*get.config('battle_number'));
					_status.event.dialog.add([list.slice(0,get.config('battle_number')*2+5),'character']);
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
							if(ui.cheat2x){
								ui.cheat2x.close();
								delete ui.cheat2x;
							}
						}
						else{
							if(game.changeCoin){
								game.changeCoin(-50);
							}
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
				if(_status.mode=='deck'){
					get.deck(game.me,_status.deck.shift());
					get.deck(game.enemy,'random');
				}
			}
		},
	},
	onWash:function(){
		if(_status.mode!='deck') return;
		var list=[];
		for(var i=0;i<ui.discardPile.childElementCount;i++){
			var type=get.type(ui.discardPile.childNodes[i]);
			if(type=='stonecard'||type=='stonecharacter'){
				list.push(ui.discardPile.childNodes[i]);
			}
		}
		while(list.length){
			list.shift().remove();
		}
	},
	get:{
		deck:function(player,name){
			var career,deck;
			if(name=='random'){
				career=lib.careerList.randomGet();
				deck=lib.minions.randomGets(20).concat(lib.spells.randomGets(10));
			}
			else if(name.indexOf('random:')==0){
				career=name.slice(7);
				deck=lib.minions.randomGets(20).concat(lib.spells.randomGets(10));
			}
			else{
				career=lib.storage.deckList[name].career;
				deck=lib.storage.deckList[name].deck.slice(0);
			}
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
			deck.randomSort();
			if(!player.deckCards) player.deckCards=[];
			for(var i=0;i<deck.length;i++){
				player.deckCards.push(game.createCard(deck[i]));
			}
		}
	},
	card:{
		stonecharacter:{
			type:'stonecharacter',
			color:'white',
			opacity:1,
			enable:function(event,player){
				return player.canAddFellow();
			},
			chongzhu:true,
			textShadow:'black 0 0 2px',
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
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
				"step 1"
				event.trigger('fellow');
			},
			ai:{
				order:8.5,
				useful:[5.5,1],
				result:{
					target:1
				}
			}
		},
		zhaohunfan:{
			type:'stonecard',
			fullskin:true,
			enable:true,
			stoneact:1,
			filterTarget:function(card,player,target){
				if(!target.isMin()) return false;
				if(ui.selected.targets.length){
					return target.side!=ui.selected.targets[0].side;
				}
				return true;
			},
			selectTarget:2,
			multitarget:true,
			multiline:true,
			content:function(){
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].die();
				}
			},
			ai:{
				result:{
					target:function(player,target){
						if(ui.selected.targets.length&&target.hp<ui.selected.targets[0].hp){
							return 1;
						}
						return -1;
					}
				},
				order:6
			}
		},
		jintiao:{
			type:'stonecard',
			enable:true,
			stoneact:2,
			fullskin:true,
			filterTarget:function(card,player,target){
				return target.isMin()&&(target.maxHp>1||target.num('he')>0);
			},
			content:function(){
				"step 0"
				target.discard(target.get('he'));
				"step 1"
				if(target.maxHp>1){
					target.loseMaxHp(target.maxHp-1);
				}
			},
			ai:{
				result:{
					target:function(player,target){
						return 1-target.hp-target.num('h')/2;
					}
				},
				order:5
			}
		},
		liumangxingzhen:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			multiline:true,
			multitarget:true,
			content:function(){
				'step 0'
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].die()._triggered=null;
				}
				ui.clear();
				'step 1'
				player.recover(2)
			},
			stoneact:6,
			ai:{
				order:9,
				result:{
					target:-1,
					player:function(player){
						if(player.hp<player.maxHp) return 1;
						return 0;
					}
				}
			}
		},
		shengerpingdeng:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			stoneact:2,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.maxHp>1;
			},
			selectTarget:-1,
			content:function(){
				target.loseMaxHp(target.maxHp-1);
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(target.hp>1) return -1;
						if(target.maxHp>1) return -0.1;
						return 0;
					}
				}
			}
		},
		emofengdi:{
			fullskin:true,
			type:'stonecard',
			enable:function(event,player){
				if(player.isMin()) return false;
				return player.canAddFellow();
			},
			stoneact:5,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			content:function(){
				target.getLeader().removeFellow(target);
				target.side=player.side;
				player.addFellow(target);
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				}
			}
		},
		konghunshi:{
			type:'stonecard',
			fullskin:true,
			enable:function(event,player){
				if(player.isMin()) return false;
				return player.canAddFellow();
			},
			stoneact:4,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			content:function(){
				target.getLeader().removeFellow(target);
				target.side=player.side;
				player.addFellow(target);
				target.addSkill('konghunshi_die');
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				}
			}
		},
		mindieyi:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			stoneact:2,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			content:function(){
				target.turnOver();
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						if(target.isTurnedOver()) return 1;
						return -1;
					}
				}
			}
		},
		miefafu:{
			type:'stonecard',
			enable:true,
			stoneact:1,
			fullskin:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.turnOver();
			},
			ai:{
				order:6,
				result:{
					target:function(player,target){
						if(target.isTurnedOver()) return 1;
						return -1;
					}
				}
			}
		},
		dianhaishenzhu:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			stoneact:1,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side==player.side&&!target.skills.contains('chaofeng');
			},
			content:function(){
				target.addSkill('chaofeng');
				target.markSkill('chaofeng');
				game.log(target,'获得了嘲讽');
				target.popup('嘲讽');
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						if(target.hp>=3) return target.hp;
						return 0;
					}
				}
			}
		},
		yesushengxue:{
			fullskin:true,
			type:'stonecard',
			enable:true,
			stoneact:4,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.hp<5;
			},
			content:function(){
				if(target.maxHp<5){
					target.gainMaxHp(Math.min(2,5-target.maxHp));
				}
				target.recover(2);
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						return 5-target.hp;
					}
				}
			}
		},
		sanghunzhao:{
			type:'stonecard',
			fullskin:true,
			enable:true,
			stoneact:3,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			content:function(){
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].loseHp();
				}
				ui.clear();
			},
			ai:{
				order:9,
				result:{
					target:-1
				}
			}
		},
		fengraozhijiao:{
			type:'stonecard',
			fullskin:true,
			enable:true,
			stoneact:1,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.hp<target.maxHp;
			},
			content:function(){
				target.recover(target.maxHp-target.hp);
			},
			ai:{
				order:8,
				result:{
					target:1
				}
			}
		},
	},
	skill:{
		_priest_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='priest') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			filterTarget:true,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				target.recover();
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						return ai.get.recoverEffect(target,player,target);
					}
				}
			}
		},
		_mage_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='mage') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			line:'fire',
			filterTarget:function(card,player,target){
				return !target.career;
			},
			content:function(){
				player.actused+=2;
				player.updateActCount();
				target.damage('fire');
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target,'fire');
					}
				}
			}
		},
		_warlock_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='warlock') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return player.num('he')>0;
			},
			usable:1,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				player.gain(player.getDeckCards(2),'draw');
			},
			ai:{
				order:2,
				result:{
					player:1
				}
			}
		},
		_hunter_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='hunter') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return player.num('he')>0;
			},
			usable:1,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target.career&&target.side!=player.side;
			},
			content:function(){
				player.actused+=2;
				player.updateActCount();
				target.damage();
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target);
					}
				}
			}
		},
		_warrior_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='warrior') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				player.changeHujia(1);
				player.draw();
			},
			ai:{
				order:2,
				result:{
					player:1
				}
			}
		},
		_rogue_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='rogue') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				'step 0'
				player.actused+=2;
				player.updateActCount();
				var equip1=get.cardPile(function(card){
					return get.subtype(card)=='equip1';
				});
				if(!equip1){
					equip1=game.createCard('qingnang');
				}
				var equip4=get.cardPile(function(card){
					return get.type(card)=='equip'&&get.subtype(card)!='equip1';
				});
				if(!equip4){
					equip4=game.createCard('chitu');
				}
				player.$gain(equip1);
				setTimeout(function(){
					player.$gain(equip4);
				},250);
				game.delay();
				event.equip1=equip1;
				event.equip4=equip4;
				'step 1'
				player.equip(event.equip1);
				game.delay(0.5);
				'step 2'
				player.equip(event.equip4);
			},
			ai:{
				order:function(skill,player){
					if(!player.get('e','1')&&player.num('e')<2){
						if(player.num('h','sha')&&player.getActCount()+3<=player.actcount){
							return 4;
						}
						return 0.1;
					}
					return 0;
				},
				result:{
					player:function(player){
						if(player.num('e')<=2) return 1;
						return 0;
					}
				}
			}
		},
		_druid_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='druid') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return player.num('he')>0&&lib.filter.cardEnabled({name:'sha'},player);
			},
			usable:1,
			filterTarget:function(card,player,target){
				return player.canUse('sha',target,false);
			},
			direct:true,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				player.useCard({name:'sha'},targets,'_druid_skill',false).animate=false;
			},
			ai:{
				order:function(){
					return lib.card.sha.ai.order-0.1;
				},
				result:{
					target:function(player,target){
						return ai.get.effect(target,{name:'sha'},player,target);
					}
				}
			}
		},
		shaman_tuteng:{
			trigger:{player:'phaseDrawBefore'},
			forced:true,
			popup:false,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			}
		},
		shaman_zhiliao:{
			trigger:{player:'phaseEnd'},
			forced:true,
			direct:true,
			content:function(){
				'step 0'
				var players=get.players();
				var targets=[];
				for(var i=0;i<players.length;i++){
					if(players[i].side==player.side&&!players[i].career&&players[i].hp<players[i].maxHp){
						targets.push(players[i]);
						players[i].recover();
					}
				}
				if(targets.length){
					player.logSkill('shaman_zhiliao',targets);
				}
				else{
					event.finish();
				}
				'step 1'
				game.delay();
			}
		},
		shaman_fali:{
			trigger:{player:'phaseEnd'},
			forced:true,
			direct:true,
			content:function(){
				'step 0'
				var players=get.players();
				var targets=[];
				for(var i=0;i<players.length;i++){
					if(players[i].side==player.side&&!players[i].career&&players[i].num('h')==0){
						targets.push(players[i]);
					}
				}
				if(targets.length){
					game.asyncDraw(targets);
					player.logSkill('shaman_fali',targets);
				}
				else{
					event.finish();
				}
				'step 1'
				game.delay();
			}
		},
		shaman_zhuore:{
			trigger:{player:'phaseEnd'},
			forced:true,
			direct:true,
			content:function(){
				'step 0'
				var players=get.players();
				var targets=[];
				for(var i=0;i<players.length;i++){
					if(players[i].side!=player.side&&!players[i].career){
						targets.push(players[i]);
					}
				}
				if(targets.length){
					var target=targets.randomGet();
					player.logSkill('shaman_zhuore',target);
					target.damage();
				}
				else{
					event.finish();
				}
				'step 1'
				game.delay();
			}
		},
		_shaman_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='shaman') return false;
				if(!player.canAddFellow()) return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				"step 0"
				player.actused+=2;
				player.updateActCount();
				var name='stone_tuteng'+Math.ceil(Math.random()*4);
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
				event.source=fellow;
				var num=lib.character[name][5][1];
				if(num){
					fellow.draw(num,false);
				}
				player.updateActCount();
				fellow.noPhaseDelay=true;
				player.line(fellow,'green');
				"step 1"
				event.trigger('fellow');
			},
			ai:{
				order:2,
				result:{
					player:1
				}
			}
		},
		_paladin_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='paladin') return false;
				if(!player.canAddFellow()) return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				"step 0"
				player.actused+=2;
				player.updateActCount();
				var name='stone_xinbing';
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
				event.source=fellow;
				var num=lib.character[name][5][1];
				if(num){
					fellow.draw(num,false);
				}
				player.updateActCount();
				fellow.noPhaseDelay=true;
				player.line(fellow,'green');
				"step 1"
				event.trigger('fellow');
			},
			ai:{
				order:2,
				result:{
					player:1
				}
			}
		},
		chaofeng:{
			mark:true,
			intro:{
				content:'已获得嘲讽'
			}
		},
		_chaofeng:{
			mod:{
				targetEnabled:function(card,player,target){
					if(target.skills.contains('chaofeng')) return;
					if(card.name=='sha'||card.name=='juedou'){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].side==target.side&&game.players[i].skills.contains('chaofeng')){
								return false;
							}
						}
					}
				}
			}
		},
		konghunshi_die:{
			trigger:{player:'phaseAfter'},
			forced:true,
			unique:true,
			content:function(){
				player.die();
			}
		},
		stone_sanxian:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('散仙：令一名敌方随从失去一点体力',function(card,playerx,target){
					return player.side!=target.side&&target.isMin();
				}).ai=function(target){
					return Math.max(1,10-target.hp);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].addSkill('stone_sanxian2');
				}
			}
		},
		stone_sanxian2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_sanxian2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_sanxian2');
			}
		},
		stone_banxian:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player){
						game.players[i].addSkill('stone_banxian2');
					}
				}
			}
		},
		stone_banxian2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_banxian2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_banxian2');
			}
		},
		stone_daoshi:{
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw();
			}
		},
		stone_daogu:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw();
			}
		},
		stone_shubing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.classList.remove('turnedover');
			}
		},
		stone_yinshi:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.addTempSkill('stone_yinshi2',{player:'phaseBegin'});
			}
		},
		stone_yinshi2:{
			mod:{
				targetEnabled:function(){
					return false;
				}
			}
		},
		stone_shuguan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addSkill('stone_shuguan2');
			}
		},
		stone_shuguan2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.draw();
				player.removeSkill('stone_shuguan2');
			}
		},
		stone_shujiang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('蜀将：选择敌方一名角色视为对其使用一张杀',function(card,player,target){
					return lib.filter.targetEnabled({name:'sha'},event.chooser,target);
				}).ai=function(target){
					return ai.get.effect(target,{name:'sha'},event.chooser);
				}
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.useCard({name:'sha'},result.targets,false);
				}

			}
		},
		stone_weiguan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side==player.side&&
						game.players[i]!=player) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('魏官：选择已方一名角色摸一张牌',function(card,playerx,target){
					return player!=target&&player.side==target.side;
				}).ai=function(target){
					return ai.get.attitude(event.chooser,target);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					result.targets[0].draw();
				}
			}
		},
		stone_weibing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()&&
						game.players[i].num('he')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('魏兵：弃置对方一名随从的所有牌',function(card,playerx,target){
					return player.side!=target.side&&target.isMin()&&target.num('he')>0;
				}).ai=function(target){
					return target.num('he');
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].discard(result.targets[0].get('he'));
				}
			}
		},
		stone_weijiang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('魏将：对一名对方随从造成一点伤害',function(card,playerx,target){
					return player.side!=target.side&&target.isMin();
				}).ai=function(target){
					return Math.max(1,10-target.hp);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].damage(event.chooser);
				}
			}
		},
		stone_wubing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getEnemy().num('e')>0;
			},
			content:function(){
				var enemy=player.getEnemy();
				var es=enemy.get('e');
				if(es.length){
					player.getLeader().line(enemy);
					game.delay();
					enemy.discard(es.randomGet());
					// game.log(get.translation(event.enemy)+'将'+get.translation(es)+'收入手牌')
				}
			}
		},
		stone_wuguan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addTempSkill('stone_wuguan2','phaseAfter');
			}
		},
		stone_wuguan2:{
			mod:{
				maxHandcard:function(player,num){
					return num+2;
				}
			},
		},
		stone_wujiang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().draw(2);
			}
		},
		stone_qunbing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.addSkill('stone_qunbing2');
			}
		},
		stone_qunbing2:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num++;
				player.removeSkill('stone_qunbing2');
			}
		},
		stone_qunguan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				game.asyncDraw(targets);
			}
		},
		stone_qunjiang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].discard(targets[i].get('he'));
				}
			}
		},
		stone_huanghou:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getEnemy().countFellow()>player.getLeader().countFellow();
			},
			content:function(){
				"step 0"
				event.chooser=player.getEnemy();
				event.chooser.chooseTarget('皇后：选择己方一名随从令其死亡',function(card,playerx,target){
					return target.isMin()&&target.side!=player.side;
				},true).ai=function(target){
					return -target.hp;
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].die();
				}
			}
		},
		stone_yiji:{
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source!=undefined&&event.source.isMin();
			},
			content:function(){
				trigger.source.addSkill('stone_yiji2');
			},
		},
		stone_yiji2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_yiji2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_yiji2');
			}
		},
		_actcount:{
			mod:{
				cardEnabled:function(card,player){
					if(player.isMin()){
						return;
					}
					if(_status.currentPhase!=player) return;
					var stoneact=get.info(card).stoneact;
					if(typeof stoneact!='number'){
						stoneact=1;
					}
					if(player.getActCount()+stoneact>player.actcount) return false;
				}
			},
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.isMin();
			},
			content:function(){
				player.actused=0;
				if(player.side){
					player.actcount=player.getEnemy().actcount;
				}
				else{
					player.actcount=player.getEnemy().actcount+1;
				}
				if(player.actcount>6){
					player.actcount-=4;
				}
				player.updateActCount();
			}
		},
		_actcount2:{
			trigger:{player:'useCard'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.isMin();
			},
			content:function(){
				var stoneact=get.info(trigger.card).stoneact;
				if(typeof stoneact==='number'){
					player.actused+=stoneact-1;
				}
				player.updateActCount();
			}
		},
		stonesha:{
			unique:true,
			enable:['chooseToUse','chooseToRespond'],
			filterCard:{type:'equip'},
			viewAs:{name:'sha'},
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
				respondSha:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		stoneshan:{
			unique:true,
			enable:['chooseToRespond'],
			viewAs:{name:'shan'},
			filterCard:{type:'stonecharacter'},
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
				respondShan:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		stonedraw:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			popup:false,
			content:function(){
				trigger.num--;
			}
		}
	},
	translate:{
		shaman:'祭司',
		mage:'法师',
		priest:'医生',
		warrior:'战士',
		warlock:'术士',
		knight:'死亡骑士',
		rogue:'游侠',
		paladin:'谋士',
		hunter:'猎人',
		druid:'蛮人',

		shaman_tuteng:'图腾',
		shaman_tuteng_info:'锁定技，你跳过摸牌阶段',
		shaman_fali:'法潮',
		shaman_fali_info:'回合结束阶段，令所有无手牌的友方随从摸一张牌',
		shaman_zhiliao:'治疗',
		shaman_zhiliao_info:'回合结束阶段，令所有友方随从回复一点体力',
		shaman_zhuore:'灼热',
		shaman_zhuore_info:'回合结束阶段，对一名随机敌方随从造成一点伤害',

		_shaman_skill:'祭天',
		_shaman_skill_info:'召唤一个随机图腾',
		_mage_skill:'火冲',
		_mage_skill_info:'对一名随从造成一点火焰伤害',
		_priest_skill:'治疗',
		_priest_skill_info:'回复一点体力',
		_warrior_skill:'战甲',
		_warrior_skill_info:'获得一点护甲，摸一张牌',
		_warlock_skill:'作法',
		_warlock_skill_info:'从牌库中获得两张牌',
		_rogue_skill:'出鞘',
		_rogue_skill_info:'装备一把武器和一个随机非武器装备',
		_paladin_skill:'动员',
		_paladin_skill_info:'召唤一名士兵',
		_hunter_skill:'射击',
		_hunter_skill_info:'对敌方主将造成一点伤害',
		_druid_skill:'猛击',
		_druid_skill_info:'视为使用一张不计入出杀次数的杀',

		stone_tuteng1:'石爪图腾',
		stone_tuteng2:'灼热图腾',
		stone_tuteng3:'法潮图腾',
		stone_tuteng4:'治疗图腾',

		stone_xinbing:'新兵',

		stone_weibing:'魏兵',
		stone_weibing_info:'你出场时，已方主将可以弃置对方一名随从的所有牌',
		stone_weiguan:'魏官',
		stone_weiguan_info:'你出场时，已方主将可以令已方一名其他角色摸一张牌',
		stone_weijiang:'魏将',
		stone_weijiang_info:'你出场时，已方主将可以对对方一名随从造成一点伤害',

		stone_shubing:'蜀兵',
		stone_shubing_info:'你出场时，立即将武将牌翻至正面',
		stone_shuguan:'蜀官',
		stone_shuguan2:'蜀官',
		stone_shuguan_info:'你出场时，已方主将于本回合结束阶段摸一张牌',
		stone_shujiang:'蜀将',
		stone_shujiang_info:'你出场时，已方主将可视为对一名敌方角色使用一张杀',

		stone_wubing:'吴兵',
		stone_wubing_info:'你出场时，敌方主将随机弃置一张装备牌',
		stone_wuguan:'吴官',
		stone_wuguan_info:'你出场时，已方主将本回合手牌上限+2',
		stone_wujiang:'吴将',
		stone_wujiang_info:'你出场时，已方主将摸两张牌',

		stone_qunbing:'群兵',
		stone_qunbing2:'群兵',
		stone_qunbing_info:'你出场后的第一个摸牌阶段摸牌数+1',
		stone_qunguan:'群官',
		stone_qunguan_info:'你出场时，所有其他随从各摸一张牌',
		stone_qunjiang:'群将',
		stone_qunjiang_info:'你出场时，敌方随从弃置所有牌',

		stone_daoshi:'道士',
		stone_daoshi_info:'回合开始阶段，若你没有手牌，你摸一张牌',
		stone_sanxian:'散仙',
		stone_sanxian_info:'你死亡前，已方主将可令一名敌方随从失去1点体力',
		stone_banxian:'半仙',
		stone_banxian_info:'你死亡后，场上所有其他随从失去1点体力',
		stone_yisheng:'医生',
		stone_yinshi:'隐士',
		stone_yinshi_info:'在你的回合开始前，不能成为任何卡牌的目标',

		stone_gongzhu:'公主',
		stone_genv:'歌女',
		stone_wunv:'舞女',
		stone_huanghou:'皇后',
		stone_huanghou_info:'你出场时，若敌方随从数多于己方，敌方主将须选择一名随从令其死亡',
		stone_feipin:'王妃',
		stone_yiji:'艺伎',
		stone_yiji_info:'杀死你的随从失去一点体力',
		stone_daogu:'道姑',
		stone_daogu_info:'回合结束阶段，若你没有手牌，你摸一张牌',

		stonesha:'冲锋',
		stonesha_info:'锁定技，你的装备牌均视为杀',
		stoneshan:'格挡',
		stoneshan_info:'锁定技，你的随从牌均视为闪',

		stonecharacter:'随从',
		shengerpingdeng:'生而平等',
		shengerpingdeng_info:'将所有随从体力上限降为1',
		emofengdi:'恶魔之眼',
		emofengdi_info:'限主将使用，将一名敌方随从吸收为已方',
		konghunshi:'控魂石',
		konghunshi_info:'限主将使用，将一名敌方随从吸收为已方，并令其于下个回合结束后死亡',
		konghunshi_die:'控魂石',
		konghunshi_die_info:'下个回合结束后死亡',
		mindieyi:'冥蝶翼',
		mindieyi_info:'将场上所有随从翻面',
		miefafu:'灭法符',
		miefafu_info:'将目标随从翻面',
		liumangxingzhen:'六芒星阵',
		liumangxingzhen_info:'令场上所有随从立即死亡（无法触发死亡技能），回复两点体力',
		dianhaishenzhu:'颠海神珠',
		dianhaishenzhu_info:'令目标随从获得嘲讽',
		chaofeng:'嘲讽',
		chaofeng_info:'同阵营的无嘲讽角色不以能成为杀或决斗的目标',
		yesushengxue:'耶稣圣血',
		yesushengxue_info:'令一名随从增加两点体力上限（不能超过5）并回复两点体力',
		sanghunzhao:'丧魂爪',
		sanghunzhao_info:'令场上所有随从失去一点体力',
		jintiao:'荆条',
		jintiao_info:'弃置一名随从的所有牌，并令其体力上限减至1',
		zhaohunfan:'招魂幡',
		zhaohunfan_info:'令双方各一名随从立即死亡',
		fengraozhijiao:'丰饶之角',
		fengraozhijiao_info:'令一名随从回复全部体力',

		stonecard:'法术',
		mode_stone_card_config:'炉石模式',
		mode_stone_character_config:'炉石模式',
	},
	ai:{
		get:{
			attitude:function(from,to){
				var num;
				if(to.isMin()&&!to.skills.contains('chaofeng')){
					num=5;
				}
				else{
					num=6;
				}
				return num*(from.side==to.side?1:-1);
			}
		}
	},
	config:['battle_number','double_character','double_hp','ban_weak','free_choose','change_choice'],
}
