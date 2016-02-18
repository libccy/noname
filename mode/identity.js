'use strict';
mode.identity={
	game:{
		getIdentityList:function(player){
			if(player.identityShown) return;
			if(player==game.me) return;
			if(_status.mode=='zhong'){
				if(game.zhu&&game.zhu.isZhu){
					return {
						fan:'反',
						zhong:'忠',
						nei:'内',
						cai:'猜',
					}
				}
				else{
					return {
						fan:'反',
						zhong:'忠',
						nei:'内',
						zhu:'主',
						cai:'猜',
					}
				}
			}
			else{
				return {
					fan:'反',
					zhong:'忠',
					nei:'内',
					cai:'猜',
				}
			}
		},
		getVideoName:function(){
			var str=get.translation(game.me.name);
			if(game.me.name2){
				str+='/'+get.translation(game.me.name2);
			}
			var name=[
				str,
				get.cnNumber(parseInt(get.config('player_number')))+'人'+
					get.translation(lib.config.mode)+' - '+lib.translate[game.me.identity+'2']
			];
			return name;
		},
		addRecord:function(bool){
			if(typeof bool=='boolean'){
				var data=lib.config.gameRecord.identity.data;
				var identity=game.me.identity;
				if(identity=='mingzhong'){
					identity='zhong';
				}
				if(!data[identity]){
					data[identity]=[0,0];
				}
				if(bool){
					data[identity][0]++;
				}
				else{
					data[identity][1]++;
				}
				var list=['zhu','zhong','nei','fan'];
				var str='';
				for(var i=0;i<list.length;i++){
					if(data[list[i]]){
						str+=lib.translate[list[i]+'2']+'：'+data[list[i]][0]+'胜'+' '+data[list[i]][1]+'负<br>';
					}
				}
				lib.config.gameRecord.identity.str=str;
				game.saveConfig('gameRecord',lib.config.gameRecord);
			}
		},
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				if(lib.db&&!_status.characterLoaded){
					_status.waitingForCharacters=true;
					game.pause();
				}
				if(!lib.config.new_tutorial){
					ui.arena.classList.add('only_dialog');
				}
				_status.mode=get.config('identity_mode');
				"step 1"
				var playback=localStorage.getItem(lib.configprefix+'playback');
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
					if(_status.mode=='zhong'){
						game.prepareArena(8);
					}
					else{
						game.prepareArena();
					}
					if(!lib.config.new_tutorial){
						game.delay();
					}
				}
				"step 2"
				if(!lib.config.new_tutorial){
					game.saveConfig('version',lib.version);
					var clear=function(){
						ui.dialog.close();
						while(ui.controls.length) ui.controls[0].close();
					};
					var clear2=function(){
						ui.auto.show();
						ui.arena.classList.remove('only_dialog');
					};
					var step1=function(){
						ui.create.dialog('欢迎来到无名杀，是否进入新手向导？');
						game.saveConfig('new_tutorial',true);
						ui.dialog.add('<div class="text center">跳过后，你可以在选项-其它中重置新手向导');
						ui.auto.hide();
						ui.create.control('跳过向导',function(){
							clear();
							clear2();
							game.resume();
						});
						ui.create.control('继续',step2);
					}
					var step2=function(){
						if(lib.config.layout!='phone'){
							clear();
							ui.create.dialog('如果你在使用手机，可能会觉得按钮有点小'+
							'，将布局改成移动可以使按钮变大');
							ui.dialog.add('<div class="text center">你可以在选项-外观-布局中更改此设置');
							var lcontrol=ui.create.control('使用移动布局',function(){
								if(lib.config.layout=='phone'){
									ui.control.firstChild.firstChild.innerHTML='使用移动布局';
									lib.init.layout('mobile');
								}
								else{
									ui.control.firstChild.firstChild.innerHTML='使用默认布局';
									lib.init.layout('phone');
								}
							});
							ui.create.control('继续',step3);
						}
						else{
							step3();
						}
					};
					var step3=function(){
						if(lib.config.touchscreen){
							clear();
							ui.create.dialog('触屏模式中，下划可以显示菜单，上划可以切换托管，双指单击可以暂停');
							ui.dialog.add('<div class="text center">你可以在选项-通用-中更改手势设置');
							ui.create.control('继续',step4);
						}
						else{
							step4();
						}
					};
					var step4=function(){
						clear();
						ui.window.classList.add('noclick_important');
						ui.click.configMenu();
						ui.control.classList.add('noclick_click_important');
						ui.control.style.top='calc(100% - 105px)';
						ui.create.control('在菜单中，可以进行各项设置',function(){
							ui.click.menuTab('选项');
							ui.controls[0].replace('如果你感到游戏较卡，可以开启流畅模式',function(){
								ui.controls[0].replace('在技能一栏中，可以设置自动发动或双将禁配的技能',function(){
									ui.click.menuTab('武将');
									ui.controls[0].replace('在武将或卡牌一栏中，单击武将/卡牌可以将其禁用',function(){
										ui.click.menuTab('战局');
										ui.controls[0].replace('在战局中可以输入游戏命令，或者管理录像',function(){
											ui.click.configMenu();
											ui.window.classList.remove('noclick_important');
											ui.control.classList.remove('noclick_click_important');
											ui.control.style.top='';
											step5();
										});
									});
								});
							});
						})
					};
					var step5=function(){
						clear();
						ui.create.dialog('如果还有其它问题，欢迎来到百度无名杀吧进行交流');
						ui.create.control('完成',function(){
							clear();
							clear2();
							game.resume();
						})
					};
					game.pause();
					step1();
				}
				else{
					game.showChangeLog();
				}
				"step 3"
				if(lib.storage.test){
					lib.config.game_speed='vfast';
					_status.auto=true;
					ui.auto.classList.add('glow');
				}
				game.chooseCharacter();
				"step 4"
				if(ui.coin){
					_status.coinCoeff=get.coinCoeff([game.me.name]);
				}
				if(game.players.length==2){
					game.showIdentity(true);
				}
				else{
					for(var i=0;i<game.players.length;i++){
						game.players[i].ai.shown=0;
					}
				}
				game.zhu.ai.shown=1;
				if(game.zhu2){
					game.zhong=game.zhu;
					game.zhu=game.zhu2;
					delete game.zhu2;
				}
				if(_status.mode!='zhong'&&get.config('enhance_zhu')&&get.population('fan')>=3){
					var skill;
					switch(game.zhu.name){
						case 'liubei':skill='jizhen';break;
						case 'dongzhuo':skill='hengzheng';break;
						case 'sunquan':skill='batu';break;
						case 'sp_zhangjiao':skill='tiangong';break;
						case 'liushan':skill='shengxi';break;
						case 'sunce':skill='ciqiu';break;
						case 'yuanshao':skill='geju';break;
						case 're_caocao':skill='dangping';break;
						case 'caopi':skill='junxing';break;
						case 'liuxie':skill='moukui';break;
						default:skill='tianming';break;
					}
					game.zhu.addSkill(skill);
					game.zhu.storage.enhance_zhu=skill;
				}
				if(lib.storage.test){
					var str='';
					for(var i=0;i<game.players.length;i++){
						str+=get.translation(game.players[i]);
						if(game.players[i]==game.zhu) str+='（主）';
						str+=' ';
					}
					console.log(str);
					game.showIdentity();
				}
				lib.config.ai_guess=true;
				event.trigger('gameStart');

				var players=get.players(lib.sort.position);
				var info=[];
				for(var i=0;i<players.length;i++){
					info.push({
						name:players[i].name,
						name2:players[i].name2,
						identity:players[i].identity
					});
				}
				_status.videoInited=true,
				game.addVideo('init',null,info);

				game.gameDraw(game.zhong||game.zhu);
				game.phaseLoop(game.zhong||game.zhu);
			}
		},
		showIdentity:function(me){
			for(var i=0;i<game.players.length;i++){
				// if(me===false&&game.players[i]==game.me) continue;
				game.players[i].identityShown=true;
				game.players[i].ai.shown=1;
				game.players[i].setIdentity(game.players[i].identity);
				if(game.players[i].identity=='zhu'){
					game.players[i].isZhu=true;
				}
			}
			if(_status.clickingidentity){
				for(var i=0;i<_status.clickingidentity[1].length;i++){
					_status.clickingidentity[1][i].delete();
					_status.clickingidentity[1][i].style.transform='';
				}
				delete _status.clickingidentity;
			}
		},
		checkResult:function(){
			if(game.zhu.isAlive()&&get.population('fan')+get.population('nei')>0) return;
			if(game.zhong){
				game.zhong.identity='zhong';
			}
			if(lib.storage.test){
				if(game.zhu.isAlive()){
					console.log('主忠胜利');
				}
				else if(game.players[0].identity=='nei'&&game.players.length==1){
					console.log('内奸胜利');
				}
				else{
					console.log('反贼胜利');
				}
			}
			game.showIdentity();
			if(game.me.identity=='zhu'||game.me.identity=='zhong'){
				if(game.zhu.classList.contains('dead')){
					game.over(false);
				}
				else{
					game.over(true);
				}
			}
			else if(game.me.identity=='nei'){
				if(game.players.length==1){
					game.over(true);
				}
				else{
					game.over(false);
				}
			}
			else{
				if((get.population('fan')+get.population('zhong')>0||get.population('nei')>1)&&
					game.zhu.classList.contains('dead')){
					game.over(true);
				}
				else{
					game.over(false);
				}
			}
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.addPlayer=function(player){
				var list=lib.config.mode_config.identity.identity[game.players.length-3].slice(0);
				var list2=lib.config.mode_config.identity.identity[game.players.length-2].slice(0);
				for(var i=0;i<list.length;i++) list2.remove(list[i]);
				player.identity=list2[0];
				player.setIdentity('cai');
			};
			next.removePlayer=function(){
				return game.players.randomGet(game.me,game.zhu);
			};
			next.ai=function(player,list,list2,back){
				if(_status.event.zhongmode){
					if(get.config('double_character')){
						player.init(list[0],list[1]);
					}
					else{
						player.init(list[0]);
					}
					if(player.identity=='mingzhong'){
						player.hp++;
						player.maxHp++;
						player.update();
					}
				}
				else if(player.identity=='zhu'){
					list2.randomSort();
					var choice,choice2;
					if(!_status.event.zhongmode&&Math.random()-0.8<0&&list2.length){
						choice=list2[0];
						choice2=list[0];
						if(choice2==choice){
							choice2=list[1];
						}
					}
					else{
						choice=list[0];
						choice2=list[1];
					}
					if(get.config('double_character')){
						player.init(choice,choice2);
					}
					else{
						player.init(choice);
					}
					if(game.players.length>4){
						player.hp++;
						player.maxHp++;
						player.update();
					}
				}
				else if(player.identity=='zhong'&&Math.random()<0.5){
					var choice=0;
					for(var i=0;i<list.length;i++){
						if(lib.character[list[i]][1]==game.zhu.group){
							choice=i;break;
						}
					}
					if(get.config('double_character')){
						player.init(list[choice],list[choice==0?choice+1:choice-1]);
					}
					else{
						player.init(list[choice]);
					}
				}
				else{
					if(get.config('double_character')){
						player.init(list[0],list[1]);
					}
					else{
						player.init(list[0]);
					}
				}
				if(back){
					list.remove(player.name);
					list.remove(player.name2);
					for(var i=0;i<list.length;i++){
						back.push(list[i]);
					}
				}
			}
			next.content=function(){
				"step 0"
				var i;
				var list;
				var list2=[];
				var list3=[];
				var identityList;
				var chosen=lib.config.continue_name||[];
				game.saveConfig('continue_name');
				event.chosen=chosen;
				if(_status.mode=='zhong'){
					event.zhongmode=true;
					identityList=['zhu','zhong','mingzhong','nei','fan','fan','fan','fan'];
				}
				else{
					identityList=lib.config.mode_config.identity.identity[game.players.length-2].slice(0);
					if(get.config('double_nei')){
						switch(get.config('player_number')){
							case '8':
							identityList.remove('fan');
							identityList.push('nei');
							break;
							case '7':
							identityList.remove('zhong');
							identityList.push('nei');
							break;
							case '6':
							identityList.remove('fan');
							identityList.push('nei');
							break;
							case '5':
							identityList.remove('fan');
							identityList.push('nei');
							break;
							case '4':
							identityList.remove('zhong');
							identityList.push('nei');
							break;
							case '3':
							identityList.remove('fan');
							identityList.push('nei');
							break;
						}
					}
				}

				var addSetting=function(dialog){
					dialog.add('选择身份');
					var table=document.createElement('table');
					table.style.margin='0 auto';
					table.style.maxWidth='400px';
					var tr=document.createElement('tr');
					table.appendChild(tr);
					var list;
					if(event.zhongmode){
						list=['random','zhu','mingzhong','zhong','nei','fan'];
					}
					else{
						list=['random','zhu','zhong','nei','fan'];
					}

					for(var i=0;i<list.length;i++){
						var td=document.createElement('td');
						tr.appendChild(td);
						td.link=list[i];
						td.style.fontSize='25px';
						td.style.fontFamily='xinwei';
						if(td.link===game.me.identity){
							td.classList.add('thundertext');
						}
						td.innerHTML=get.translation(list[i]+'2');
						td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
							if(_status.dragged) return;
							if(_status.justdragged) return;
							_status.tempNoButton=true;
							setTimeout(function(){
								_status.tempNoButton=false;
							},500);
							if(game.zhu.name){
								game.zhu.uninit();
								delete game.zhu.isZhu;
								delete game.zhu.identityShown;
							}
							dialog.close();
							_status.event=_status.event.parent;
							_status.event.step=0;
							if(this.link!='random'){
								_status.event.identity=this.link;
							}
							else{
								delete _status.event.identity;
							}
							game.resume();
						});
					}
					dialog.content.appendChild(table);


					dialog.add('选择座位');
					var seats=document.createElement('table');
					seats.style.margin='0 auto';
					seats.style.maxWidth=(60*(parseInt(get.config('player_number'))-1))+'px';
					var tr=document.createElement('tr');
					seats.appendChild(tr);
					for(var i=2;i<=game.players.length;i++){
						var td=document.createElement('td');
						tr.appendChild(td);
						td.style.width='40px';
						td.style.fontSize='25px';
						td.style.fontFamily='xinwei';
						td.innerHTML=get.cnNumber(i,true);
						td.link=i-1;
						if(get.distance(game.zhu,game.me,'absolute')===i-1){
							td.classList.add('thundertext');
						}
						td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
							if(_status.dragged) return;
							if(_status.justdragged) return;
							if(get.distance(game.zhu,game.me,'absolute')==this.link) return;
							var current=this.parentNode.querySelector('.thundertext');
							if(current){
								current.classList.remove('thundertext');
							}
							this.classList.add('thundertext');
							for(var i=0;i<game.players.length;i++){
								if(get.distance(game.players[i],game.me,'absolute')==this.link){
									game.swapSeat(game.zhu,game.players[i],false);return;
								}
							}
						});
					}
					dialog.content.appendChild(seats);
					if(game.me==game.zhu){
						seats.previousSibling.style.display='none';
						seats.style.display='none';
					}

					dialog.add(ui.create.div('.placeholder'));
					dialog.add(ui.create.div('.placeholder'));
					dialog.add(ui.create.div('.placeholder'));
				};
				var removeSetting=function(){
					var dialog=_status.event.dialog;
					if(dialog.querySelector('table')&&!get.config('change_identity')){
						dialog.querySelector('table').previousSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').remove();
					}
				};
				event.addSetting=addSetting;
				event.removeSetting=removeSetting;
				event.list=[];
				identityList.randomSort();
				if(event.identity){
					identityList.remove(event.identity);
					identityList.unshift(event.identity);
					delete event.identity;
				}
				for(i=0;i<game.players.length;i++){
					game.players[i].identity=identityList[i];
					game.players[i].setIdentity('cai');
					if(event.zhongmode){
						if(identityList[i]=='mingzhong'){
							game.zhu=game.players[i];
						}
						else if(identityList[i]=='zhu'){
							game.zhu2=game.players[i];
						}
					}
					else{
						if(identityList[i]=='zhu'){
							game.zhu=game.players[i];
						}
					}
					game.players[i].identityShown=false;
				}
				game.zhu.setIdentity();
				game.zhu.identityShown=true;
				game.zhu.isZhu=(game.zhu.identity=='zhu');
				game.me.setIdentity();
				for(i in lib.character){
					if(chosen.contains(i)) continue;
					if(lib.character[i][4]&&lib.character[i][4].contains('forbidai')) continue;
					if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidall.contains(i)) continue;
					if(lib.config.banned.contains(i)) continue;
					if(!get.config('double_character')&&get.config('ban_weak')&&
					(lib.config.forbidsingle.contains(i)||lib.rank.c.contains(i)||lib.rank.d.contains(i))) continue;
					if(get.config('ban_strong')&&(lib.rank.s.contains(i)||lib.rank.ap.contains(i))) continue;
					if(get.config('double_character')&&lib.config.forbiddouble.contains(i)) continue;
					event.list.push(i);
					if(lib.character[i][4]&&lib.character[i][4].contains('zhu')){
						list2.push(i);
					}
					else{
						list3.push(i);
					}
				}
				event.list.randomSort();
				list3.randomSort();
				var num=get.config('choice_'+game.me.identity);
				if(event.zhongmode){
					num=3;
				}
				if(game.zhu!=game.me){
					event.ai(game.zhu,event.list,list2)
					event.list.remove(game.zhu.name);
					event.list.remove(game.zhu.name2);
					list=event.list.splice(0,num);
				}
				else{
					if(event.zhongmode){
						list=list3.slice(0,6);
					}
					else{
						list=list2.concat(list3.slice(0,num));
					}
				}
				var dialog=ui.create.dialog('选择角色','hidden',[list,'character']);
				if(get.config('change_identity')){
					addSetting(dialog);
				}
				if(!event.chosen.length){
					game.me.chooseButton(dialog,true).selectButton=function(){
						return get.config('double_character')?2:1
					};
				}
				ui.create.cheat=function(){
					_status.createControl=ui.cheat2;
					ui.cheat=ui.create.control('更换',function(){
						if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
							return;
						}
						if(game.changeCoin){
							game.changeCoin(-3);
						}
						if(game.zhu!=game.me){
							event.list=event.list.concat(list);
							event.list.randomSort();
							list=event.list.splice(0,num);
						}
						else{
							list3.randomSort();
							list=list3.slice(0,num).concat(list2);
						}
						_status.event.dialog.close();
						_status.event.dialog=ui.create.dialog('选择角色',[list,'character']);
						if(get.config('change_identity')){
							addSetting(_status.event.dialog);
						}
						game.uncheck();
						game.check();
					});
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
								game.changeCoin(-10);
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
				if(event.chosen.length){
					game.me.init(event.chosen[0],event.chosen[1]);
				}
				else if(result.buttons.length==2){
					game.me.init(result.buttons[0].link,result.buttons[1].link)
				}
				else{
					game.me.init(result.buttons[0].link)
				}
				event.list.remove(game.me.name);
				event.list.remove(game.me.name2);
				if(game.me==game.zhu&&game.players.length>4){
					game.me.hp++;
					game.me.maxHp++;
					game.me.update();
				}
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=game.zhu&&game.players[i]!=game.me){
						event.ai(game.players[i],event.list.splice(0,get.config('choice_'+game.players[i].identity)),null,event.list)
					}
				}
			}
		},
	},
	translate:{
		zhu:"主",
		zhong:"忠",
		mingzhong:"忠",
		nei:"内",
		fan:"反",
		cai:"猜",
		zhu2:"主公",
		zhong2:"忠臣",
		mingzhong2:"明忠",
		nei2:"内奸",
		fan2:"反贼",
		random2:"随机",
		ai_strategy_1:'均衡',
		ai_strategy_2:'偏反',
		ai_strategy_3:'偏主',
		ai_strategy_4:'酱油',
		ai_strategy_5:'天使',
		ai_strategy_6:'仇主',
	},
	element:{
		player:{
			dieSpeak:function(){
				// switch(this.identity){
				// 	case 'zhu': this.popup('吾降矣',2000);break;
				// 	case 'zhong': this.popup('呃啊',2000);break;
				// 	case 'nei': this.popup('啊，被看穿了',2000);break;
				// 	case 'fan': this.popup('饶命啊',2000);break;
				// }
			},
			dieAfter:function(source){
				this.dieSpeak();
				if(get.config('show_identity')&&!this.identityShown){
					this.setIdentity(this.identity);
					this.identityShown=true;
				}
				game.checkResult();
				if(this.identity=='fan'&&source) source.draw(3);
				else if(this.identity=='zhong'&&source&&source.identity=='zhu'&&source.isZhu){
					source.discard(source.get('he'));
				}
				if(game.zhu.storage.enhance_zhu&&get.population('fan')<3){
					game.zhu.removeSkill(game.zhu.storage.enhance_zhu);
					delete game.zhu.storage.enhance_zhu;
				}
				if(this==game.zhong){
					game.zhu.identityShown=true;
					game.zhu.ai.shown=1;
					game.zhu.setIdentity();
					game.zhu.isZhu=true;
					delete game.zhong;
					if(lib.config.animation&&!lib.config.low_performance) game.zhu.$legend();
					game.delay(2);
					game.zhu.playerfocus(1000);
					if(_status.clickingidentity&&_status.clickingidentity[0]==game.zhu){
						for(var i=0;i<_status.clickingidentity[1].length;i++){
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform='';
						}
						delete _status.clickingidentity;
					}
				}
				if(!this.node.dieidentity){
					var node=ui.create.div('.damage.dieidentity',get.translation(this.identity+'2'),this);
					ui.refresh(node);
					node.style.opacity=1;
					this.node.dieidentity=node;
				}
				var trans=this.style.transform;
				if(trans){
					if(trans.indexOf('rotateY')!=-1){
						this.node.dieidentity.style.transform='rotateY(180deg)';
					}
					else if(trans.indexOf('rotateX')!=-1){
						this.node.dieidentity.style.transform='rotateX(180deg)';
					}
					else{
						this.node.dieidentity.style.transform='';
					}
				}
				else{
					this.node.dieidentity.style.transform='';
				}
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
					else if(effect<0&&this==game.me&&game.me.identity!='nei'){
						if(targets.length==1&&targets[0]==this);
						else if(targets.length==1) this.ai.shown-=0.2;
						else this.ai.shown-=0.1;
					}
				}
				if(this!=game.me) this.ai.shown*=2;
				if(this.ai.shown>0.95) this.ai.shown=0.95;
				if(this.ai.shown<-0.5) this.ai.shown=-0.5;

				if(this!=game.me&&get.config('auto_mark_identity')&&this.ai.identity_mark!='finished'){
					if(_status.clickingidentity&&_status.clickingidentity[0]==this){
						for(var i=0;i<_status.clickingidentity[1].length;i++){
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform='';
						}
						delete _status.clickingidentity;
					}
					if(!Array.isArray(targets)){
						targets=[];
					}
					var effect=0,c,shown;
					var zhu=game.zhu;
					if(_status.mode=='zhong'&&!game.zhu.isZhu){
						zhu=game.zhong;
					}
					if(targets.length==1&&targets[0]==this){
						effect=0;
					}
					else if(this.identity!='nei'){
						if(this.ai.shown>0){
							if(this.identity=='fan'){
								effect=-1;
							}
							else{
								effect=1;
							}
						}
					}
					else if(targets.length>0){
						for(var i=0;i<targets.length;i++){
							shown=Math.abs(targets[i].ai.shown);
							if(shown<0.2||targets[i].identity=='nei') c=0;
							else if(shown<0.4) c=0.5;
							else if(shown<0.6) c=0.8;
							else c=1;
							effect+=ai.get.effect(targets[i],card,this,zhu)*c;
						}
					}
					if(this.identity=='nei'){
						if(effect>=0){
							if(this.ai.identity_mark=='fan'){
								this.setIdentity();
								this.ai.identity_mark='finished';
							}
							else{
								this.setIdentity('zhong');
								this.ai.identity_mark='zhong';
							}
						}
						else{
							if(this.ai.identity_mark=='zhong'){
								this.setIdentity();
								this.ai.identity_mark='finished';
							}
							else{
								this.setIdentity('fan');
								this.ai.identity_mark='fan';
							}
						}
					}
					else{
						if(effect>0&&this.identity!='fan'){
							this.setIdentity('zhong');
							this.ai.identity_mark='finished';
						}
						else if(effect<0&&this.identity=='fan'){
							this.setIdentity('fan');
							this.ai.identity_mark='finished';
						}
					}
				}
			},
		}
	},
	ai:{
		get:{
			attitude:function(from,to){
				var x=0,num=0,temp,i;
				if(_status.ai.customAttitude){
					for(i=0;i<_status.ai.customAttitude.length;i++){
						temp=_status.ai.customAttitude[i](from,to);
						if(temp!=undefined){
							x+=temp;
							num++;
						}
					}
				}
				if(num){
					return x/num;
				}
				var difficulty=0;
				if(to==game.me) difficulty=2-get.difficulty();
				if(get.config('ai_identity')||from==to||!lib.config.ai_guess||(to.identityShown)){
					return ai.get.realAttitude(from,to)+difficulty*1.5;
				}
				else{
					if(from.identity=='zhong'&&to.ai.shown==0&&from.ai.tempIgnore&&
						!from.ai.tempIgnore.contains(to)){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0&&game.players[i].identity=='fan'){
								return -0.1+difficulty*1.5;
							}
						}
					}
					return ai.get.realAttitude(from,to)*to.ai.shown+difficulty*1.5;
				}
			},
			realAttitude:function(from,to){
				// if(_status.currentPhase==from&&from.ai.tempIgnore&&from.ai.tempIgnore.contains(to)) return 0;
				var situation=ai.get.situation();
				var identity=from.identity;
				var identity2=to.identity;
				if(identity2=='zhu'&&!to.isZhu){
					identity2='zhong';
					if(from==to) return 10;
				}
				var zhongmode=false;
				if(!game.zhu.isZhu){
					zhongmode=true;
				}
				switch(identity){
					case 'zhu':
						switch(identity2){
							case 'zhu': return 10;
							case 'zhong':case 'mingzhong': return 6;
							case 'nei':
								if(game.players.length==2) return -10;
								if(zhongmode&&to.ai.sizhong) return 6;
								if(get.population('fan')==0) return -0.5;
								if(situation>1) return 0;
								return Math.min(3,get.population('fan'));
							case 'fan': return -4;
						}
						break;
					case 'zhong':case 'mingzhong':
						switch(identity2){
							case 'zhu': return 10;
							case 'zhong':case 'mingzhong': return 4;
							case 'nei':
								if(zhongmode&&to.ai.sizhong) return 6;
								if(get.population('fan')==0) return -2;
								return Math.min(3,-situation);
							case 'fan': return -8;
						}
						break;
					case 'nei':
						if(identity2=='zhu'&&game.players.length==2) return -10;
						var strategy=get.aiStrategy();
						if(strategy==4){
							if(from==to) return 10;
							return 0;
						}
						var num;
						switch(identity2){
							case 'zhu':
								if(strategy==6) return -1;
								if(strategy==5) return 10;
								if(to.hp<=0) return 10;
								if(get.population('fan')==1){
									var fan;
									for(var i=0;i<game.players.length;i++){
										if(game.players[i].identity=='fan'){
											fan=game.players[i];break;
										}
									}
									if(fan){
										if(to.hp>1&&to.hp>fan.hp&&to.num('he')>fan.num('he')){
											return -3;
										}
									}
									return 0;
								}
								else{
									if(situation>1||get.population('fan')==0) num=0;
									else num=get.population('fan')+Math.max(0,3-game.zhu.hp);
								}
								if(strategy==2) num--;
								if(strategy==3) num++;
								return num;
							case 'zhong':
								if(strategy==5) return Math.min(0,-situation);
								if(strategy==6) return Math.max(-1,-situation);
								if(get.population('fan')==0) num=-5;
								else if(situation<=0) num=0;
								else if(game.zhu&&game.zhu.hp<2) num=0;
								else if(game.zhu&&game.zhu.hp==2) num=-1;
								else if(game.zhu&&game.zhu.hp<=2&&situation>1) num=-1;
								else num=-2;
								if(zhongmode&&situation<2){
									num=4;
								}
								if(strategy==2) num--;
								if(strategy==3) num++;
								return num;
							case 'mingzhong':
								if(zhongmode){
									if(from.ai.sizhong==undefined){
										from.ai.sizhong=(Math.random()<0.5);
									}
									if(from.ai.sizhong) return 6;
								}
								if(strategy==5) return Math.min(0,-situation);
								if(strategy==6) return Math.max(-1,-situation);
								if(get.population('fan')==0) num=-5;
								else if(situation<=0) num=0;
								else num=-3;
								if(strategy==2) num--;
								if(strategy==3) num++;
								return num;
							case 'nei':
								if(from==to) return 10;
								if(from.ai.friend.contains(to)) return 5;
								if(get.population('fan')+get.population('zhong')>0) return 0;
								return -5;
							case 'fan':
								if(strategy==5) return Math.max(-1,situation);
								if(strategy==6) return Math.min(0,situation);
								if((game.zhu&&game.zhu.hp<=2&&situation<0)||situation<-1) num=-3;
								else if(situation<0||get.population('zhong')+get.population('mingzhong')==0) num=-2;
								else if((game.zhu&&game.zhu.hp>=4&&situation>0)||situation>1) num=1;
								else num=0;
								if(strategy==2) num++;
								if(strategy==3) num--;
								return num;
						}
						break;
					case 'fan':
						switch(identity2){
							case 'zhu':
								if(get.population('nei')>0){
									if(situation==1) return -6;
									if(situation>1) return -5;
								}
								return -10;
							case 'zhong': return -7;
							case 'mingzhong':return -5;
							case 'nei':
								if(zhongmode&&to.ai.sizhong) return -7;
								if(get.population('fan')==1) return 0;
								if(get.population('zhong')+get.population('mingzhong')==0) return -7;
								if(game.zhu&&game.zhu.hp<=2) return -1;
								return Math.min(3,situation);
							case 'fan': return 5;
						}
				}
			},
			situation:function(absolute){
				var i,j,player;
				var zhuzhong=0,total=0,zhu,fan=0;
				for(i=0;i<game.players.length;i++){
					player=game.players[i];
					var php=player.hp;
					if(player.skills.contains('benghuai')&&php>4){
						php=4;
					}
					else if(php>6){
						php=6;
					}
					j=player.get('h').length+player.get('e').length*1.5+php*2;
					if(player.identity=='zhu'){
						zhuzhong+=j*1.2+5;
						total+=j*1.2+5;
						zhu=j;
					}
					else if(player.identity=='zhong'||player.identity=='mingzhong'){
						zhuzhong+=j*0.8+3;
						total+=j*0.8+3;
					}
					else if(player.identity=='fan'){
						zhuzhong-=j+4;
						total+=j+4;
						fan+=j+4;
					}
				}
				if(absolute) return zhuzhong;
				var result=parseInt(10*Math.abs(zhuzhong/total));
				if(zhuzhong<0) result=-result;
				if(!game.zhong){
					if(zhu<12&&fan>30) result--;
					if(zhu<6&&fan>15) result--;
					if(zhu<4) result--;
				}
				return result;
			},
			population:function(identity){
				return get.population(identity);
			}
		}
	},
	config:['player_number','double_character','double_hp',
	'ban_weak','enhance_zhu','free_choose','change_identity',
	'change_choice','change_card','dierestart','swap','revive',
	'auto_identity','ai_strategy','ai_identity','difficulty']
}
