mode.guozhan={
	game:{
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				game.prepareArena();
				game.delay();
				"step 1"
				if(lib.storage.test){
					_status.auto=true;
					// ui.auto.innerHTML='手动';
					ui.auto.classList.add('glow');
				}
				game.chooseCharacter();
				"step 2"
				if(lib.storage.test){
					var str='';
					for(var i=0;i<game.players.length;i++){
						str+=get.translation(game.players[i].name1)+' '+get.translation(game.players[i].name2)+'; ';
					}
					console.log(str);
				}
				var player=game.players[Math.floor(Math.random()*game.players.length)];
				event.trigger('gameStart');
				game.gameDraw(player);
				if(get.config('ai_identity')){
					game.showIdentity(true);
				}
				else{
					for(var i=0;i<game.players.length;i++){
						game.players[i].ai.shown=0;
					}
				}
				game.phaseLoop(player);
			}
		},
		showIdentity:function(started){
			if(game.phaseNumber==0&&!started) return;
			var players=game.players.concat(game.dead);
			for(var i=0;i<game.players.length;i++){
				game.players[i].showCharacter(2);
			}
		},
		checkResult:function(){
			if(lib.storage.test){
				console.log(get.translation(game.players[0].identity)+'胜利');
			}
			for(var i=0;i<game.players.length;i++){
				game.players[i].showCharacter(2);
			}
			if(game.me.identity=='ye'){
				if(game.me.classList.contains('dead')){
					game.over('战斗失败');
				}
				else{
					game.over('战斗胜利');
				}
			}
			else{
				if(get.population(game.me.identity)==0){
					game.over('战斗失败');
				}
				else{
					game.over('战斗胜利');
				}
			}
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.addPlayer=true;
			next.ai=function(player,list){
				for(var i=0;i<list.length-1;i++){
					for(var j=i+1;j<list.length;j++){
						if(lib.character[list[i]][1]==lib.character[list[j]][1]){
							player.init(list[i],list[j],false);
							return;
						}
					}
				}
			}
			next.content=function(){
				"step 0"
				// ui.auto.hide();
				var i;
				event.list=[];
				for(i in lib.character){
					if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidall.contains(i)) continue;
					if(lib.config.forbiddouble.contains(i)) continue;
					if(lib.character[i][2]==3||lib.character[i][2]==4||lib.character[i][2]==5)
					event.list.push(i);
				}
				event.list.sort(lib.sort.random);
				var list=event.list.splice(0,7);
				if(_status.auto){
					event.ai(game.me,list);
				}
				else{
					var dialog=ui.create.dialog('选择角色',[list,'character']);
					var next=game.me.chooseButton(dialog,true,2);
					next.filterButton=function(button){
						if(ui.selected.buttons.length==0) return true;
						return (lib.character[button.link][1]==lib.character[ui.selected.buttons[0].link][1]);
					};
					next.switchToAuto=function(){
						event.ai(game.me,list);
					};

					(function(){
						var dialog;
						var node=ui.create.div('.caption');
						var namecapt=[];
						var list=[];
						var getCapt=function(str){
							if(str.indexOf('_')==-1){
								return str[0];
							}
							return str[str.indexOf('_')+1];
						}
						for(i in lib.character){
							if(i=='zuoci') continue;
							if(get.config('ban_weak')&&lib.config.forbidall.contains(i)) continue;
							list.push(i);
							if(namecapt.indexOf(getCapt(i))==-1){
								namecapt.push(getCapt(i));
							}
						}
						namecapt.sort(function(a,b){
							return a>b?1:-1;
						});
						var clickCapt=function(e){
							if(_status.dragged) return;
							dialog.currentcapt=this.link;
							for(var i=0;i<dialog.buttons.length;i++){
								if(dialog.buttons[i].capt!=dialog.currentcapt||
								(dialog.currentgroup&&dialog.buttons[i].group!=dialog.currentgroup)){
									dialog.buttons[i].style.display='none';
								}
								else{
									dialog.buttons[i].style.display='';
								}
							}
							e.stopPropagation();
						};
						for(i=0;i<namecapt.length;i++){
							var span=document.createElement('span');
							span.innerHTML=' '+namecapt[i].toUpperCase()+' ';
							span.link=namecapt[i];
							span.addEventListener(lib.config.touchscreen?'touchend':'click',clickCapt);
							node.appendChild(span);
						}
						var groupSort=function(name){
							if(lib.character[name][1]=='wei') return 0;
							if(lib.character[name][1]=='shu') return 1;
							if(lib.character[name][1]=='wu') return 2;
							if(lib.character[name][1]=='qun') return 3;
						}
						list.sort(function(a,b){
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
						if(lib.storage.hide_alphabet){
							node.style.display='none';
						}
						dialog=ui.create.dialog('hidden','自由选将',node,[list,'character']);
						dialog.add(ui.create.div('.placeholder'));
						dialog.firstChild.firstChild.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
							if(_status.dragged) return;
							if(node.style.display=='none'){
								node.style.display='';
								game.save('hide_alphabet',false);
							}
							else{
								node.style.display='none';
								game.save('hide_alphabet',true);
							}
						});
						for(i=0;i<dialog.buttons.length;i++){
							dialog.buttons[i].group=lib.character[dialog.buttons[i].link][1];
							dialog.buttons[i].capt=getCapt(dialog.buttons[i].link);
						}
						_status.event.dialogxx=dialog;
					}());

					ui.create.cheat2=function(){
						ui.cheat2=ui.create.control('自由选将',function(){
							if(this.dialog==_status.event.dialog){
								this.dialog.close();
								_status.event.dialog=this.backup;
								this.backup.open();
								delete this.backup;
								game.uncheck();
								game.check();
								if(ui.cheat2x){
									ui.cheat2x.close();
									delete ui.cheat2x;
								}
							}
							else{
								ui.cheat2x=ui.create.control('全部','wei','shu','wu','qun',function(link){
									if(link=='全部'){
										ui.dialog.currentcapt='';
										ui.dialog.currentgroup='';
										for(var i=0;i<ui.dialog.buttons.length;i++){
											ui.dialog.buttons[i].style.display='';
										}
									}
									else{
										ui.dialog.currentgroup=link;
										for(var i=0;i<ui.dialog.buttons.length;i++){
											if(ui.dialog.buttons[i].group!=link||
											(ui.dialog.currentcapt&&ui.dialog.buttons[i].capt!=ui.dialog.currentcapt)){
												ui.dialog.buttons[i].style.display='none';
											}
											else{
												ui.dialog.buttons[i].style.display='';
											}
										}
									}
									game.uncheck();
									game.check();
								});
								this.backup=_status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog=_status.event.parent.dialogxx;
								this.dialog=_status.event.dialog;
								this.dialog.open();
								game.uncheck();
								game.check();
							}
						});
					}
					ui.create.cheat=function(){
						ui.cheat=ui.create.control('更换',function(){
							event.list=event.list.concat(list);
							event.list.sort(lib.sort.random);
							list=event.list.splice(0,7);
							_status.event.dialog.close();
							_status.event.dialog=ui.create.dialog('选择角色',[list,'character']);
							game.uncheck();
							game.check();
						});
					}
					if(!ui.cheat&&get.config('change_choice'))
					ui.create.cheat();
					if(!ui.cheat2&&get.config('free_choose'))
					ui.create.cheat2();
				}
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
				if(result.buttons){
					game.me.init(result.buttons[0].link,result.buttons[1].link,false);
				}
				game.me.setIdentity(game.me.group);
				event.list.remove(game.me.name);
				event.list.remove(game.me.name2);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=game.me){
						event.ai(game.players[i],event.list.splice(0,7))
					}
				}
				for(var i=0;i<game.players.length;i++){
					game.players[i].classList.add('unseen');
					game.players[i].classList.add('unseen2');
					// game.players[i].node.identity.style.background='none';
					if(game.players[i]!=game.me){
						game.players[i].node.identity.firstChild.innerHTML='猜';
						game.players[i].node.identity.dataset.color='unknown';
					}
					game.players[i].hiddenSkills=lib.character[game.players[i].name][3].concat(lib.character[game.players[i].name2][3]);
					game.players[i].group='unknown';
					game.players[i].sex='unknown';
					game.players[i].name1=game.players[i].name;
					game.players[i].name='unknown'+game.players[i].dataset.position;
					game.players[i].identity='unknown';
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						var ifo=get.info(game.players[i].hiddenSkills[j]);
						if(ifo.init){
							ifo.init(game.players[i]);
							game.players[i].initedSkills.push(game.players[i].hiddenSkills[j]);
						}
					}
				}
				// ui.auto.show();
			}
		},
	},
	ui:{
		click:{
			identity:function(){
				if(this.touched) {this.touched=false;return;}
				_status.clicked=true;
				if(this.parentNode.isUnseen()&&this.parentNode!=game.me){
					switch(this.firstChild.innerHTML){
						case '魏':this.firstChild.innerHTML='蜀';this.dataset.color='shu';break;
						case '蜀':this.firstChild.innerHTML='吴';this.dataset.color='wu';break;
						case '吴':this.firstChild.innerHTML='群';this.dataset.color='qun';break;
						case '群':this.firstChild.innerHTML='野';this.dataset.color='ye';break;
						case '野':this.firstChild.innerHTML='猜';this.dataset.color='unknown';break;
						default:this.firstChild.innerHTML='魏';this.dataset.color='wei';break;
					}
				}
			}
		}
	},
	translate:{
		guozhan_mode:'国战',
		ye:'野',
		unknown:'无名氏',
		unknown0:'一号位',
		unknown1:'二号位',
		unknown2:'三号位',
		unknown3:'四号位',
		unknown4:'五号位',
		unknown5:'六号位',
		unknown6:'七号位',
		unknown7:'八号位',
		bumingzhi:'不明置',
		mingzhizhujiang:'明置主将',
		mingzhifujiang:'明置副将',
		tongshimingzhi:'同时明置',
	},
	element:{
		player:{
			dieAfter:function(source){
				this.showCharacter(2);
				this.classList.remove('unseen');
				this.classList.remove('unseen2');
				if(source&&source.identity!='unknown'){
					if(this.identity=='ye') source.draw(1);
					else if(this.identity!=source.identity) source.draw(get.population(this.identity)+1);
					else source.discard(source.get('he'));
				}
				for(var i=1;i<game.players.length;i++){
					if(game.players[i].identity=='unknown') return;
					if(game.players[i].identity!=game.players[0].identity) return;
				}
				if(game.players[0].identity!='ye'||game.players.length===1) game.checkResult();
			},
			isUnseen:function(){
				return (this.classList.contains('unseen')&&this.classList.contains('unseen2'));
			},
			checkShow:function(skill){
				if(game.expandSkills(this.get('s')).contains(skill)) return false;
				if(lib.skill.global.contains(skill)) return false;
				if(this.classList.contains('unseen')){
					var skills=game.expandSkills(lib.character[this.name1][3]);
					if(skills.contains(skill)){
						this.showCharacter(0);
						return true;
					}
				}
				if(this.classList.contains('unseen2')){
					var skills=game.expandSkills(lib.character[this.name2][3]);
					if(skills.contains(skill)){
						this.showCharacter(1);
						return true;
					}
				}
				return false;
			},
			showCharacter:function(num){
				if(!this.classList.contains('unseen')&&!this.classList.contains('unseen2')){
					return;
				}
				if(this.identity=='unknown'){
					this.group=lib.character[this.name1][1];
					// this.node.identity.style.backgroundColor=get.translation(this.group+'Color');
					if(get.totalPopulation(this.group)+1>get.population()/2) this.identity='ye';
					else this.identity=this.group;
					// this.node.identity.dataset.color=this.identity;
					this.setIdentity(this.identity);
					this.ai.shown=1;
				}
				var skills;
				switch(num){
					case 0:
					game.log(get.translation(this)+'展示了主将'+get.translation(this.name1));
					this.name=this.name1;
					skills=lib.character[this.name][3];
					this.sex=lib.character[this.name][0];
					this.classList.remove('unseen');
					break;
					case 1:
					game.log(get.translation(this)+'展示了副将'+get.translation(this.name2));
					skills=lib.character[this.name2][3];
					if(this.sex=='unknown') this.sex=lib.character[this.name2][0];
					if(this.name.indexOf('unknown')==0) this.name=this.name2;
					this.classList.remove('unseen2');
					break;
					case 2:
					game.log(get.translation(this)+'展示了主将'+get.translation(this.name1)+'、副将'+get.translation(this.name2));
					this.name=this.name1;
					skills=lib.character[this.name][3].concat(lib.character[this.name2][3]);
					this.sex=lib.character[this.name][0];
					this.classList.remove('unseen');
					this.classList.remove('unseen2');
					break;
				}
				var initdraw=get.config('initshow_draw');
				if(!_status.initshown&&initdraw){
					this.popup('首亮');
					game.log(get.translation(this)+'首先明置武将，得到奖励');
					game.log(get.translation(this)+'摸了'+get.cnNumber(initdraw)+'张牌');
					this.draw(initdraw).log=false;
					_status.initshown=true;
				}
				for(var i=0;i<skills.length;i++){
					this.hiddenSkills.remove(skills[i]);
					this.addSkill(skills[i]);
				}
				if(!this.classList.contains('unseen')&&!this.classList.contains('unseen2')){
					if(this.singleHp){
						this.doubleDraw();
					}
					if(this.perfectPair()){
						var next=game.createEvent('guozhanDraw');
						next.player=this;
						next.content=function(){
							"step 0"
							player.popup('珠联璧合');
							game.log(get.translation(player)+'发动了【珠联璧合】');
							if(player.hp==player.maxHp){
								player.draw(2);
								event.finish();
							}
							else{
								player.chooseControl('draw_card','recover_hp',function(){
									if(player.hp>=2||player.hp>=player.maxHp-1) return 'draw_card';
									if(player.hp==2&&player.num('h')==0) return 'draw_card';
									return 'recover_hp';
								},ui.create.dialog('hidden','珠联璧合：选择一项奖励'));
							}
							"step 1"
							if(result.control=='draw_card'){
								player.draw(2);
							}
							else{
								player.recover();
							}
						}
					}
				}
			},
			perfectPair:function(){
				return false;
			},
			siege:function(player){
				if(game.players.length==2) return false;
				if(this.identity=='unknown'||this.identity=='ye') return false;
				if(player.identity=='unknown') return false;
				if(player.identity==this.identity) return false;
				if(player==this.next&&this.next.next.identity==this.identity) return true;
				if(player==this.previous&&this.previous.previous.identity==this.identity) return true;
				return false;
			},
			sieged:function(){
				return this.next.siege(this)||this.previous.siege(this);
			},
			sieging:function(){
				return this.siege(this.next)||this.siege(this.previous);
			},
			inline:function(){
				if(this.identity=='unknown'||this.identity=='ye') return false;
				if(this.next.identity!=this.identity&&this.previous.identity!=this.identity) return false;
				var pointer;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i].identity!=this.identity) return false;
					pointer=this.next;
					while(pointer!=arguments[i]&&pointer.identity==this.identity){
						pointer=pointer.next;
					}
					if(pointer==arguments[i]) continue;
					pointer=this.previous;
					while(pointer!=arguments[i]&&pointer.identity==this.identity){
						pointer=pointer.previous;
					}
					if(pointer==arguments[i]) continue;
					return false;
				}
				return true;
			},
			logAi:function(targets,card){
				if(this.ai.shown==1) return;
				if(typeof targets=='number'){
					this.ai.shown+=targets;
				}
				else{
					var effect=0,c,shown;
					var info=get.info(card);
					if(info.ai&&info.ai.expose){
						this.ai.shown+=info.ai.expose;
					}
					if(targets.length>0){
						for(var i=0;i<targets.length;i++){
							shown=Math.abs(targets[i].ai.shown);
							if(shown<0.2||targets[i].identity=='nei') c=0;
							else if(shown<0.4) c=0.5;
							else if(shown<0.6) c=0.8;
							else c=1;
							effect+=ai.get.effect(targets[i],card,this)*c;
						}
					}
					if(effect>0){
						if(effect<1) c=0.5;
						else c=1;
						if(targets.length==1&&targets[0]==this);
						else if(targets.length==1) this.ai.shown+=0.2*c;
						else this.ai.shown+=0.1*c;
					}
				}
				if(this.ai.shown>0.95) this.ai.shown=0.95;
				if(this.ai.shown<-0.5) this.ai.shown=-0.5;
			},
		}
	},
	skill:{
		_mingzhi1:{
			trigger:{player:'phaseBegin'},
			priority:19,
			forced:true,
			popup:false,
			content:function(){
				"step 0"
				var choice=1;
				for(var i=0;i<player.hiddenSkills.length;i++){
					if(lib.skill[player.hiddenSkills[i]].ai){
						var mingzhi=lib.skill[player.hiddenSkills[i]].ai.mingzhi;
						if(mingzhi==false){
							choice=0;break;
						}
						if(typeof mingzhi=='function'&&mingzhi(trigger,player)==false){
							choice=0;break;
						}
					}
				}
				if(player.isUnseen()){
					var group=lib.character[player.name1][1];
					player.chooseControl('bumingzhi','明置'+get.translation(player.name1),
						'明置'+get.translation(player.name2),'tongshimingzhi',true).ai=function(event,player){
						var popu=get.population(lib.character[player.name1][1])
						if(popu>=2||(popu==1&&game.players.length<=4)){
							return Math.random()<0.5?3:(Math.random()<0.5?2:1);
						}
						if(choice==0) return 0;
						if(get.population(group)>0&&get.totalPopulation(group)+1<=get.population()/2){
							return Math.random()<0.2?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
						}
						var nming=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player&&game.players[i].identity!='unknown'){
								nming++;
							}
						}
						if(nming==game.players.length-1) return Math.random()<0.5?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
						return (Math.random()<0.1*nming/game.players.length)?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
					};
				}
				else{
					if(Math.random()<0.5) choice=0;
					if(player.classList.contains('unseen')){
						player.chooseControl('bumingzhi','明置'+get.translation(player.name1),true).choice=choice;
					}
					else if(player.classList.contains('unseen2')){
						player.chooseControl('bumingzhi','明置'+get.translation(player.name2),true).choice=choice;
					}
					else{
						event.finish();
					}
				}
				"step 1"
				switch(result.control){
					case '明置'+get.translation(player.name1):player.showCharacter(0);break;
					case '明置'+get.translation(player.name2):player.showCharacter(1);break;
					case 'tongshimingzhi':player.showCharacter(2);break;
				}
			}
		},
		_mingzhi2:{
			trigger:{player:'triggerHidden'},
			forced:true,
			popup:false,
			priority:10,
			content:function(){
				"step 0"
				if(get.info(trigger.skill).silent){
					event.finish();
				}
				else{
					event.name=(game.expandSkills(lib.character[player.name1][3]).contains(trigger.skill))?
					player.name1:player.name2;
					var info=get.info(trigger.skill);
					var yes=!info.check||info.check(trigger._trigger,player);
					player.chooseBool('是否明置'+get.translation(event.name)+'以发动'+get.translation(trigger.skill)+'？').ai=function(){
						return yes;
					};
				}
				"step 1"
				if(result.bool){
					if(event.name==player.name1) player.showCharacter(0);
					else player.showCharacter(1);
					trigger.revealed=true;
				}
				else{
					trigger.untrigger();
					trigger.cancelled=true;
				}
			}
		},
	},
	ai:{
		get:{
			realAttitude:function(from,toidentity,difficulty){
				if(from.identity==toidentity){
					if(get.totalPopulation(toidentity)+1<=get.population()/2) return 4+difficulty;
				}
				if(lib.character[from.name1][1]==toidentity){
					if(get.totalPopulation(toidentity)+1<=get.population()/2) return 4+difficulty;
				}
				var groups=[];
				for(var i=0;i<lib.group.length;i++){
					groups.push(get.population(lib.group[i]));
				}
				var max=Math.max.apply(this,groups);
				if(max<=1) return -3;
				var from_p=get.population(from.identity!='unknown'?from.identity:lib.character[from.name1][1]);
				var to_p=get.population(toidentity);
				if(from.identity=='ye') from_p=1;
				if(toidentity=='ye') to_p=1;

				if(to_p==max) return -5;
				if(from_p==max) return -2-get.population(toidentity);
				if(max>=game.players.length/2){
					if(to_p<=from_p){
						return 0.5;
					}
					return 0;
				}
				if(to_p<max-1) return 0;
				return -0.5;
			},
			attitude:function(from,to){
				if(_status.currentPhase==from&&from.ai.tempIgnore&&
					from.ai.tempIgnore.contains(to)&&to.identity=='unknown'&&
					(!from.storage.zhibi||!from.storage.zhibi.contains(to))) return 0;
				var difficulty=0;
				if(to==game.me) difficulty=(2-get.difficulty())*1.5;
				if(from==to) return 5+difficulty;
				if(from.identity==to.identity&&from.identity!='unknown'&&from.identity!='ye') return 5+difficulty;
				if(lib.character[from.name1][1]==to.identity){
					if(get.totalPopulation(to.identity)+1<=get.population()/2) return 4+difficulty;
				}
				var toidentity=to.identity;
				if(toidentity=='unknown'){
					toidentity=lib.character[to.name1][1];
					if(get.population(toidentity)>=get.population()-2){
						toidentity='ye';
					}
				}
				var att=ai.get.realAttitude(from,toidentity,difficulty);
				if(from.storage.zhibi&&from.storage.zhibi.contains(to)){
					return att;
				}
				if(to.ai.shown>=0.5) return att*to.ai.shown;

				var nshown=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=from&&game.players[i].identity=='unknown'){
						nshown++;
					}
				}
				if(to.ai.shown==0){
					if(nshown>=game.players.length/2&&att>=0){
						return 0;
					}
					return Math.min(0,Math.random()-0.5)+difficulty;
				}
				if(to.ai.shown>=0.2){
					if(att>2){
						return Math.max(0,Math.random()-0.5)+difficulty;
					}
					if(att>=0){
						return 0;
					}
					return Math.min(0,Math.random()-0.7)+difficulty;
				}
				if(att>2){
					return Math.max(0,Math.random()-0.7)+difficulty;
				}
				if(att>=0){
					return Math.min(0,Math.random()-0.3)+difficulty;
				}
				return Math.min(0,Math.random()-0.5)+difficulty;

			},
		}
	},
	config:{
		player_number:true,
		initshow_draw:true,
		free_choose:true,
		change_choice:true,
		change_card:true,
		swap:true,
		dierestart:true,
		ai_identity:true,
		revive:true,
		double_hp:true,
		difficulty:true,
	},
}
