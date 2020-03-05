'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'mobile',
		connectBanned:['miheng'],
		connect:true,
		characterSort:{
			mobile:{
				mobile_default:["miheng","taoqian","liuzan","lingcao","sunru","lifeng","zhuling","liuye","zhaotongzhaoguang","majun","simazhao","wangyuanji","pangdegong","shenpei","hujinding"],
				mobile_others:["re_jikang","old_bulianshi","old_yuanshu","re_wangyun","re_baosanniang","re_weiwenzhugezhi","re_zhanggong","re_xugong","xin_yuanshao","re_liushan"],
				mobile_sunben:["re_sunben"],
			},
		},
		character:{
			re_jikang:["male","wei",3,["new_qingxian","new_juexiang"]],
			old_bulianshi:['female','wu',3,['anxu','zhuiyi']],
			miheng:['male','qun',3,['kuangcai','shejian']],
			taoqian:['male','qun',3,['zhaohuo','yixiang','yirang']],
			liuzan:['male','wu',4,['fenyin']],lingcao:['male','wu',4,['dujin']],
			sunru:['female','wu',3,['yingjian','shixin']],
			lifeng:['male','shu',3,['tunchu','shuliang']],
			zhuling:['male','wei',4,['xinzhanyi']],
			liuye:['male','wei',3,['polu','choulve']],
			zhaotongzhaoguang:["male","shu",4,["yizan_use","xinfu_longyuan"],[]],
			majun:["male","wei",3,["xinfu_jingxie1","qiaosi"],[]],
			simazhao:["male","wei",3,["xinfu_daigong","xinfu_zhaoxin"],[]],
			wangyuanji:["female","wei",3,["xinfu_qianchong","xinfu_shangjian"],[]],
			pangdegong:["male","qun",3,["xinfu_pingcai","xinfu_pdgyingshi"],[]],
			old_yuanshu:['male','qun',4,['xinyongsi','yjixi']],
			
			shenpei:["male","qun","2/3",["shouye","liezhi"],[]],
			re_wangyun:['male','qun',3,['relianji','remoucheng']],
			
			re_baosanniang:['female','shu',3,['meiyong','rexushen','rezhennan']],
			
			hujinding:['female','shu','2/6',['renshi','wuyuan','huaizi']],
			
			re_zhanggong:['male','wei',3,['reqianxin','xinfu_zhenxing']],
			re_xugong:['male','wu',3,['rebiaozhao','yechou']],
			re_weiwenzhugezhi:['male','wu',4,['refuhai']],
			
			xin_yuanshao:['male','qun',4,['reluanji','xueyi'],['zhu']],
			re_liushan:['male','shu',3,['xiangle','refangquan','ruoyu'],['zhu']],
			re_sunben:['male','wu',4,['jiang','rehunzi','zhiba'],['zhu']],
		},
		characterIntro:{
			shenpei:'审配（？－204年），字正南，魏郡阴安（今河北清丰北）人。为人正直， 袁绍领冀州，审配被委以腹心之任，并总幕府。河北平定，袁绍以审配、逢纪统军事，审配恃其强盛，力主与曹操决战。曾率领弓弩手大破曹军于官渡。官渡战败，审配二子被俘，反因此受谮见疑，幸得逢纪力保。袁绍病死，审配等矫诏立袁尚为嗣，导致兄弟相争，被曹操各个击破。曹操围邺，审配死守数月，终城破被擒，拒不投降，慷慨受死。',
			hujinding:'胡金定，女，传说中关羽之妻。关索之母，配偶关羽，出处《花关索传》和元代《三国志评话》民间传说人物。',
		},
		card:{
			pss_paper:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			pss_scissor:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			pss_stone:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			db_atk1:{
				type:'db_atk',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_atk2:{
				type:'db_atk',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_def1:{
				type:'db_def',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_def2:{
				type:'db_def',
				fullimage:true,
				//derivation:'shenpei',
			},
		},
		characterFilter:{},
		skill:{
			
			//表演测试
			qiaosi_map:{charlotte:true},
			qiaosi:{
				audio:'xinfu_qiaosi',
				derivation:'qiaosi_map',
				enable:'phaseUse',
				usable:1,
				content:function(){
					"step 0"
					event.videoId=lib.status.videoId++;
					if(player.isUnderControl()){
						game.modeSwapPlayer(player);
					}
					var switchToAuto=function(){
						game.pause();
						game.countChoose();
						setTimeout(function(){
							_status.imchoosing=false;
							event._result={
								bool:true,
								links:['qiaosi_c1','qiaosi_c2','qiaosi_c3','qiaosi_c4','qiaosi_c5','qiaosi_c6'].randomGets(3),
							};
							if(event.dialog) event.dialog.close();
							if(event.control) event.control.close();
							game.resume();
						},5000);
					};
					var createDialog=function(player,id){
						if(player==game.me) return;
						var str=get.translation(player)+'正在表演...<br>';
						for(var i=1;i<7;i++){
							str+=get.translation('qiaosi_c'+i);
							if(i%3!=0) str+='　　';
							if(i==3) str+='<br>';
						}
						ui.create.dialog(str,'forcebutton').videoId=id;
					};
					var chooseButton=function(player){
						var event=_status.event;
						player=player||event.player;
						event.status={
							qiaosi_c1:0,
							qiaosi_c2:0,
							qiaosi_c3:0,
							qiaosi_c4:0,
							qiaosi_c5:0,
							qiaosi_c6:0,
						}
						event.map={
							qiaosi_c1:[10,15],
							qiaosi_c2:[20,35],
							qiaosi_c3:[40,60],
							qiaosi_c4:[40,60],
							qiaosi_c5:[20,35],
							qiaosi_c6:[10,15],
						}
						event.finishedx=[];
						event.str='请开始你的表演<br><img src="'+lib.assetURL+'image/card/qiaosi_card1.png" width="60" height="60">qiaosi_c1% <img src="'+lib.assetURL+'image/card/qiaosi_card2.png" width="60" height="60">qiaosi_c2% <img src="'+lib.assetURL+'image/card/qiaosi_card3.png" width="60" height="60">qiaosi_c3%<br><img src="'+lib.assetURL+'image/card/qiaosi_card4.png" width="60" height="60">qiaosi_c4%<img src="'+lib.assetURL+'image/card/qiaosi_card5.png" width="60" height="60">qiaosi_c5% <img src="'+lib.assetURL+'image/card/qiaosi_card6.png" width="60" height="60">qiaosi_c6%';
						event.dialog=ui.create.dialog(event.str,'forcebutton','hidden');
						event.dialog.addText('<li>点击下方的按钮，可以增加按钮对应的角色的「表演完成度」。对于不同的角色，点击时增加的完成度不同，最终获得的牌也不同。一次表演最多只能完成3名角色的进度。',false);
						event.dialog.open();
						for(var i in event.status){
							event.dialog.content.childNodes[0].innerHTML=event.dialog.content.childNodes[0].innerHTML.replace(i,event.status[i]);
						}
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('pointerdiv');
						}
						event.switchToAuto=function(){
							event._result={
								bool:true,
								links:event.finishedx.slice(0),
							};
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing=false;
						},
						event.control=ui.create.control('qiaosi_c1','qiaosi_c2','qiaosi_c3','qiaosi_c4','qiaosi_c5','qiaosi_c6',function(link){
							var event=_status.event;
							if(event.finishedx.contains(link)) return;
							event.status[link]+=get.rand.apply(get,event.map[link]);
							if(event.status[link]>=100){
								event.status[link]=100;
								var str=event.str.slice(0);
								for(var i in event.status){
									str=str.replace(i,event.status[i]);
								}
								event.dialog.content.childNodes[0].innerHTML=str;
								event.finishedx.push(link);
								if(event.finishedx.length>=3){
									event._result={
										bool:true,
										links:event.finishedx.slice(0),
									};
									event.dialog.close();
									event.control.close();
									game.resume();
									_status.imchoosing=false;
								}
							}
							else{
								var str=event.str.slice(0);
								for(var i in event.status){
									str=str.replace(i,event.status[i]);
								}
								event.dialog.content.childNodes[0].innerHTML=str;
							}
						});
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('selectable');
						}
						game.pause();
						game.countChoose();
					};
					//event.switchToAuto=switchToAuto;
					game.broadcastAll(createDialog,player,event.videoId);
					if(event.isMine()){
						chooseButton();
					}
					else if(event.isOnline()){
						event.player.send(chooseButton,event.player);
						event.player.wait();
						game.pause();
					}
					else{
						switchToAuto();
					}
					"step 1"
					game.broadcastAll('closeDialog',event.videoId);
					var map=event.result||result;
					//game.print(map);
					if(!map||!map.bool||!map.links){
						game.log(player,'表演失败');
						event.finish();
						return;
					}
					var list=map.links;
					if(!list.length){
						game.log(player,'表演失败');
						event.finish();
						return;
					}
					var cards=[];
					var list2=[];
					if(list.contains('qiaosi_c1')){
						list2.push('trick');
						list2.push('trick');
					}
					if(list.contains('qiaosi_c2')){
						if(list.contains('qiaosi_c1')) list2.push(['sha','jiu']);
						else list2.push(Math.random()<0.66?'equip':['sha','jiu']);
					}
					if(list.contains('qiaosi_c3')){
						list2.push([Math.random()<0.66?'sha':'jiu'])
					}
					if(list.contains('qiaosi_c4')){
						list2.push([Math.random()<0.66?'shan':'tao'])
					}
					if(list.contains('qiaosi_c5')){
						if(list.contains('qiaosi_c6')) list2.push(['shan','tao']);
						else list2.push(Math.random()<0.66?'trick':['shan','tao']);
					}
					if(list.contains('qiaosi_c6')){
						list2.push('equip');
						list2.push('equip');
					}
					while(list2.length){
						var filter=list2.shift();
						var card=get.cardPile(function(x){
							if(cards.contains(x)) return false;
							if(typeof filter=='string'&&get.type(x,'trick')==filter) return true;
							if(typeof filter=='object'&&filter.contains(x.name)) return true;
						});
						if(card) cards.push(card);
						else{
							var card=get.cardPile(function(x){
								return !cards.contains(card);
							});
							if(card) cards.push(card);
						}
					}
					if(cards.length){
						event.cards=cards;
						event.num=cards.length;
						player.showCards(cards);
					}
					else event.finish();
					"step 2"
					player.gain(event.cards,'gain2');
					player.chooseControl().set('choiceList',[
						'将'+get.cnNumber(event.num)+'张牌交给一名其他角色',
						'弃置'+get.cnNumber(event.num)+'张牌',
					]).set('ai',function(){
						if(game.hasPlayer(function(current){
							return current!=player&&get.attitude(player,current)>2;
						})) return 0;
						return 1;
					});
					"step 3"
					if(result.index==0){
						player.chooseCardTarget({
							position:'he',
							filterCard:true,
							selectCard:event.num,
							filterTarget:function(card,player,target){
								return player!=target;
							},
							ai1:function(card){
								return 1;
							},
							ai2:function(target){
								var att=get.attitude(_status.event.player,target);
								return att;
							},
							prompt:'选择'+get.cnNumber(event.num)+'张牌，交给一名其他角色。',
							forced:true,
						});
					}
					else{
						player.chooseToDiscard(event.num,true,'he');
						event.finish();
					}
					"step 4"
					if(result.bool){
						var target=result.targets[0];
						player.give(result.cards,target);
					}
				},
				ai:{
					order:10,
					result:{player:1},
					threaten:3.2,
				}
			},
			refuhai:{
				audio:'xinfu_fuhai',
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				check:function(card){
					if(game.players.length<3) return 0;
					return 5-get.value(card);
				},
				content:function(){
					'step 0'
					event.current=player.next;
					event.upper=[];
					event.lower=[];
					event.acted=[];
					event.num=0;
					event.stopped=false;
					'step 1'
					event.acted.push(event.current);
					event.current.chooseControl('潮起','潮落').set('prompt','潮鸣起乎？潮鸣落乎？').ai=function(){
						return Math.random()<0.5?0:1;
					};
					'step 2'
					if(!event.chosen) event.chosen=result.control;
					if(event.chosen!=result.control) event.stopped=true;
					if(!event.stopped) event.num++;
					if(result.control=='潮起'){
						event.upper.push(event.current)
					}
					else event.lower.push(event.current);
					event.current=event.current.next;
					if(event.current!=player&&!event.acted.contains(event.current)) event.goto(1);
					'step 3'
					for(var i=0;i<event.acted.length;i++){
						var bool=event.upper.contains(event.acted[i]);
						game.log(event.acted[i],'选择了',bool?'#g潮起':'#y潮落');
						event.acted[i].popup(bool?'潮起':'潮落',bool?'wood':'orange');
					}
					game.delay(1);
					'step 4'
					if(num>1) player.draw(num);
				},
				ai:{
					order:1,
					result:{player:1},
				},
			},
			rebiaozhao:{
				audio:'biaozhao',
				intro:{
					content:"cards",
				},
				trigger:{
					player:"phaseJieshuBegin",
				},
				direct:true,
				filter:function (event,player){
					return player.countCards('he')>0&&!player.storage.rebiaozhao;
				},
				content:function (){
					'step 0'
					player.chooseCard('he',get.prompt2('rebiaozhao')).ai=function(card){
						return 6-get.value(card);
					}
					'step 1'
					if(result.bool){
						player.addSkill('rebiaozhao2');
						player.addSkill('rebiaozhao3');
						player.logSkill('rebiaozhao');
						player.$give(result.cards,player,false);
						player.lose(result.cards,ui.special,'toStorage','visible');
						player.storage.rebiaozhao=result.cards;
						player.markSkill('rebiaozhao');
					}
				},
			},
			"rebiaozhao2":{
				trigger:{
					global:["loseEnd","cardsDiscardEnd"],
				},
				charlotte:true,
				forced:true,
				audio:"biaozhao",
				filter:function (event,player){
					if(!player.storage.rebiaozhao) return false;
					var num=get.number(player.storage.rebiaozhao[0]);
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i],true)=='d'&&get.number(event.cards[i])==num) return true;
					}
					return false;
				},
				content:function (){
					"step 0"
					var card=player.storage.rebiaozhao[0];
					delete player.storage.rebiaozhao;
					player.$throw(card);
					game.cardsDiscard(card);
					"step 1"
					player.unmarkSkill('rebiaozhao');
					player.loseHp();
				},
			},
			"rebiaozhao3":{
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				forced:true,
				charlotte:true,
				audio:"biaozhao",
				filter:function (event,player){
					return player.storage.rebiaozhao!=undefined;
				},
				content:function (){
					"step 0"
					var card=player.storage.rebiaozhao[0];
					delete player.storage.rebiaozhao;
					player.unmarkSkill('rebiaozhao');
					game.cardsDiscard(card);
					player.chooseTarget('令一名角色摸三张牌并回复1点体力',true).ai=function(target){
						var num=2;
						if(target.isDamaged()) num++;
						return num*get.attitude(_status.event.player,target);
					};
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.draw(3);
						target.recover();
					}
				},
			},
			reqianxin:{
				audio:'xinfu_qianxin',
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				selectCard:function(){
					return [1,Math.min(2,game.players.length-1)];
				},
				check:function(card){
					return 6-get.value(card);
				},
				discard:false,
				lose:false,
				delay:0,
				content:function(){
					var targets=game.filterPlayer(function(current){
						return current!=player;
					}).randomGets(cards.length);
					for(var i=0;i<targets.length;i++){
						var target=targets[i];
						target.addSkill('reqianxin2');
						target.storage.reqianxin2.push([cards[i],player]);
						player.$give(1,target);
						target.gain(cards[i],player);
					}
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			reqianxin2:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				popup:false,
				charlotte:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				filter:function(event,player){
					var list=player.storage.reqianxin2;
					if(Array.isArray(list)){
						var hs=player.getCards('h');
						for(var i=0;i<list.length;i++){
							if(hs.contains(list[i][0])&&list[i][1].isIn()) return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					var current=player.storage.reqianxin2.shift();
					event.source=current[1];
					if(!event.source.isIn()||!player.getCards('h').contains(current[0])) event.goto(3);
					'step 1'
					source.logSkill('reqianxin',player);
					player.chooseControl().set('choiceList',[
						'令'+get.translation(source)+'摸两张牌',
						'令自己本回合的手牌上限-2',
					]).set('prompt',get.translation(source)+'发动了【遣信】，请选择一项').set('source',source).set('ai',function(){
						var player=_status.event.player;
						if(get.attitude(player,_status.event.source)>0) return 0;
						if(player.maxHp-player.countCards('h')>1) return 1;
						return Math.random()>0.5?0:1;
					});
					'step 2'
					if(result.index==0) source.draw(2);
					else{
						player.addTempSkill('reqianxin3')
						player.addMark('reqianxin3',2,false)
					}
					'step 3'
					if(player.storage.reqianxin2.length) event.goto(0);
					else player.removeSkill('reqianxin2');
				},
			},
			reqianxin3:{
				onremove:true,
				mod:{
					maxHandcard:function(player,num){
						return num-player.countMark('reqianxin3');
					},
				},
			},
			renshi:{
				audio:2,
				trigger:{player:'damageBegin4'},
				forced:true,
				filter:function(event,player){
					return player.isDamaged()&&event.getParent().name=='sha';
				},
				content:function(){
					'step 0'
					trigger.cancel();
					var cards=trigger.cards.filterInD();
					if(cards.length) player.gain(cards,'gain2');
					'step 1'
					player.loseMaxHp();
				},
			},
			wuyuan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h','sha')>0;
				},
				filterCard:{name:'sha'},
				filterTarget:lib.filter.notMe,
				check:function(card){
					var player=_status.event.player;
					if(get.color(card)=='red'&&game.hasPlayer(function(current){
						return current!=player&&current.isDamaged()&&get.attitude(player,current)>2;
					})) return 2;
					if(get.nature(card)) return 1.5;
					return 1;
				},
				prepare:'give',
				discard:false,
				content:function(){
					'step 0'
					target.gain(cards,player);
					player.recover();
					'step 1'
					var num=1;
					if(get.nature(cards[0])) num++;
					target.draw(num);
					if(get.color(cards[0])=='red') target.recover();
				},
				ai:{
					order:1,
					result:{
						player:function(player,target){
							if(player.isDamaged()) return 1;
							return 0;
						},
						target:function(player,target){
							if(ui.selected.cards.length){
								var num=1;
								if(get.nature(ui.selected.cards[0])) num++;
								if(target.hasSkillTag('nogain')) num=0;
								if(get.color(ui.selected.cards[0])=='red') return num+2
								else return num+1;
							}
							return 1;
						},
					},
				},
			},
			huaizi:{
				mod:{
					maxHandcard:function(player,num){
						return num+player.getDamagedHp();
					},
				},
				//audio:2,
				//trigger:{player:'phaseDiscardBegin'},
				forced:true,
				firstDo:true,
				filter:function(event,player){
					return player.isDamaged()&&player.countCards('h')>player.hp;
				},
				content:function(){},
			},
			refangquan:{
				audio:2,
				trigger:{player:'phaseUseBefore'},
				filter:function(event,player){
					return player.countCards('h')>0&&!player.hasSkill('fangquan3');
				},
				direct:true,
				content:function(){
					"step 0"
					var fang=player.countMark('fangquan2')==0&&player.hp>=2&&player.countCards('h')<=player.hp+1;
					player.chooseBool(get.prompt2('refangquan')).set('ai',function(){
						if(!_status.event.fang) return false;
						return game.hasPlayer(function(target){
							if(target.hasJudge('lebu')||target==player) return false;
							if(get.attitude(player,target)>4){
								return (get.threaten(target)/Math.sqrt(target.hp+1)/Math.sqrt(target.countCards('h')+1)>0);
							}
							return false;
						});
					}).set('fang',fang);
					"step 1"
					if(result.bool){
						player.logSkill('refangquan');
						trigger.cancel();
						player.addTempSkill('fangquan2','phaseAfter');
						player.addMark('fangquan2',1,false);
						player.addTempSkill('refangquan2');
						//player.storage.fangquan=result.targets[0];
					}
				}
			},
			refangquan2:{
				mod:{
					maxHandcard:function(player,num){
						return num+player.getDamagedHp();
					},
				},
			},
			rehunzi:{
				inherit:'hunzi',
				filter:function(event,player){
					return player.hp<=2&&!player.storage.rehunzi;
				},
				ai:{
					threaten:function(player,target){
						if(target.hp<=2) return 2;
						return 0.5;
					},
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(!target.hasFriend()) return;
							if(get.tag(card,'damage')==1&&target.hp==3&&!target.isTurnedOver()&&
							_status.currentPhase!=target&&get.distance(_status.currentPhase,target,'absolute')<=3) return [0.5,1];
						}
					}
				}
			},
			rezhijian:{
				inherit:'zhijian',
				group:['rezhijian_use'],
				subfrequent:['use'],
				subSkill:{
					use:{
						audio:'rezhijian',
						trigger:{player:'useCard'},
						frequent:true,
						filter:function(event,player){
							return get.type(event.card)=='equip';
						},
						prompt:'是否发动【直谏】摸一张牌？',
						content:function(){
							player.draw('nodelay');
						},
					},
				},
			},
			rexushen:{
				derivation:['new_rewusheng','xindangxian'],
				audio:'xinfu_xushen',
				limited:true,
				enable:'phaseUse',
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.sex=='male';
					})
				},
				skillAnimation:true,
				animationColor:'fire',
				content:function(){
					player.addSkill('rexushen2');
					player.awakenSkill('rexushen');
					player.loseHp(game.countPlayer(function(current){
						return current.sex=='male';
					}));
				},
				ai:{
					order:10,
					result:{
						player:function(player){
							if(player.hp!=game.countPlayer(function(current){
								return current.sex=='male';
							})) return 0;
							return game.hasPlayer(function(current){
								return get.attitude(player,current)>4&&current.countCards('h','tao')
							})?1:0;
						},
					},
				},
			},
			rexushen2:{
				charlotte:true,
				subSkill:{
					count:{
						trigger:{
							player:"recoverBegin",
						},
						forced:true,
						silent:true,
						popup:false,
						filter:function (event,player){
							if(!event.source) return false;
							if(!player.isDying()) return false;
							var evt=event.getParent('dying').getParent(2);
							return evt.name=='rexushen'&&evt.player==player;
						},
						content:function (){
							trigger.rexushen=true;
						},
						sub:true,
					},
				},
				group:["rexushen2_count"],
				trigger:{
					player:"recoverAfter",
				},
				filter:function (event,player){
					if(player.isDying()) return false;
					return event.rexushen==true;
				},
				direct:true,
				silent:true,
				popup:false,
				content:function (){
					'step 0'
					player.removeSkill('rexushen2');
					player.chooseBool('是否令'+get.translation(trigger.source)+'获得技能〖武圣〗和〖当先〗').ai=function(){
						return get.attitude(player,trigger.source)>0;
					};
					'step 1'
					if(result.bool){
						player.line(trigger.source,'fire');
						trigger.source.addSkillLog('new_rewusheng');
						trigger.source.addSkillLog('xindangxian');
					}
				},
			},
			rezhennan:{
				audio:'xinfu_zhennan',
				trigger:{target:'useCardToTargeted'},
				filter:function(event,player){
					return event.player!=player&&event.targets&&event.targets.length&&event.targets.length>event.player.hp;
				},
				direct:true,
				content:function(){
					'step 0'
					var next=player.chooseToDiscard(get.prompt('rezhennan',trigger.player),'弃置一张牌并对其造成1点伤害','he');
					next.set('logSkill',['rezhennan',trigger.player]);
					next.set('ai',function(card){
						var player=_status.event.player;
						var target=_status.event.getTrigger().player;
						if(get.damageEffect(target,player,player)>0) return 7-get.value(card);
						return -1;
					});
					'step 1'
					if(result.bool) trigger.player.damage();
				},
			},
			meiyong:{
				inherit:'xinfu_wuniang',
				audio:'xinfu_wuniang',
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt('meiyong'),'获得一名其他角色的一张牌，然后摸一张牌。',function(card,player,target){
						if(player==target) return false;
						return target.countGainableCards(player,'he')>0;
					}).set('ai',function(target){
						return 10-get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('meiyong',target);
						player.gainPlayerCard(target,'he',true);
					}
					else event.finish();
					'step 2'
					target.draw();
				},
			},
			retuntian:{
				audio:2,
				trigger:{player:'loseEnd'},
				frequent:true,
				filter:function(event,player){
					if(player==_status.currentPhase) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original&&event.cards[i].original!='j') return true;
					}
					return false;
				},
				content:function(){
					player.judge(function(card){
						return 1;
					}).callback=lib.skill.retuntian.callback;
				},
				callback:function(){
					'step 0'
						if(event.judgeResult.suit=='heart'){
							player.gain(card,'gain2');
							event.finish();
						}
						else if(get.mode()=='guozhan'){
							player.chooseBool('是否将'+get.translation(card)+'作为【田】置于武将牌上？').ai=function(){
								return true;
							};
						}
						else event.directbool=true;
						'step 1'
						if(!result.bool&&!event.directbool){
							//game.cardsDiscard(card);
							return;
						};
						event.node=event.judgeResult.node;
						//event.trigger("addCardToStorage");
						//event.card.fix();
						player.storage.tuntian.push(event.card);
						//event.card.goto(ui.special);
						game.cardsGotoSpecial(card);
						event.node.moveDelete(player);
						game.broadcast(function(cardid,player){
							var node=lib.cardOL[cardid];
							if(node){
								node.moveDelete(player);
							}
						},event.node.cardid,player);
						game.addVideo('gain2',player,get.cardsInfo([event.node]));
						player.markSkill('tuntian');
						game.addVideo('storage',player,['tuntian',get.cardsInfo(player.storage.tuntian),'cards']);
				},
				init:function(player){
					if(!player.storage.tuntian) player.storage.tuntian=[];
				},
				group:'tuntian_dist',
				locked:false,
				ai:{
					effect:{
						target:function(){
							return lib.skill.tuntian.ai.effect.target.apply(this,arguments);
						}
					},
					threaten:function(player,target){
						if(target.countCards('h')==0) return 2;
						return 0.5;
					},
					nodiscard:true,
					nolose:true
				}
			},
			retiaoxin:{
				audio:'tiaoxin',
				audioname:['sp_jiangwei','xiahouba','re_jiangwei'],
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he');
				},
				content:function(){
					"step 0"
					target.chooseToUse({name:'sha'},'挑衅：对'+get.translation(player)+'使用一张杀，或令其弃置你的一张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.filterTarget.apply(this,arguments);
					}).set('sourcex',player);
					"step 1"
					if(result.bool==false&&target.countCards('he')>0){
						player.discardPlayerCard(target,'he',true);
					}
					else{
						event.finish();
					}
				},
				ai:{
					order:4,
					expose:0.2,
					result:{
						target:-1,
						player:function(player,target){
							if(!target.canUse('sha',player)) return 0;
							if(target.countCards('h')==0) return 0;
							if(target.countCards('h')==1) return -0.1;
							if(player.hp<=2) return -2;
							if(player.countCards('h','shan')==0) return -1;
							return -0.5;
						}
					},
					threaten:1.1
				}
			},
			rebeige:{
				audio:'beige',
				audioname:['re_caiwenji'],
				trigger:{global:'damageEnd'},
				filter:function(event,player){
					return (event.card&&event.card.name=='sha'&&event.source&&
						event.player.classList.contains('dead')==false&&player.countCards('he'));
				},
				direct:true,
				checkx:function(event,player){
					var att1=get.attitude(player,event.player);
					var att2=get.attitude(player,event.source);
					return att1>0&&att2<=0;
				},
				content:function(){
					"step 0"
					var next=player.chooseToDiscard('he',get.prompt2('rebeige',trigger.player));
					var check=lib.skill.beige.checkx(trigger,player);
					next.set('ai',function(card){
						if(_status.event.goon) return 8-get.value(card);
						return 0;
					});
					next.set('logSkill','beige');
					next.set('goon',check);
					"step 1"
					if(result.bool){
						trigger.player.judge();
					}
					else{
						event.finish();
					}
					"step 2"
					switch(result.suit){
						case 'heart':trigger.player.recover(trigger.num);break;
						case 'diamond':trigger.player.draw(3);break;
						case 'club':trigger.source.chooseToDiscard('he',2,true);break;
						case 'spade':trigger.source.turnOver();break;
					}
				},
				ai:{
					expose:0.3
				}
			},
			rexingshang:{
				audio:2,
				trigger:{global:'die'},
				filter:function(event,player){
					return player.isDamaged()||event.player.countCards('he')>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var choice=[];
					if(player.isDamaged()) choice.push('回复体力');
					if(trigger.player.countCards('he')) choice.push('获得牌');
					choice.push('cancel2');
					player.chooseControl(choice).set('prompt',get.prompt2('rexingshang')).set('ai',function(){
						if(choice.length==2) return 0;
						if(get.value(trigger.player.getCards('he'))>8) return 1;
						return 0;
					});
					"step 1"
					if(result.control!='cancel2'){
						player.logSkill(event.name,trigger.player);
						if(result.control=='获得牌'){
							event.togain=trigger.player.getCards('he');
							player.gain(event.togain,trigger.player,'giveAuto');
						}
						else player.recover();
					}
				},
			},
			refangzhu:{
				audio:2,
				trigger:{
					player:"damageEnd",
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt2('refangzhu'),function(card,player,target){
						return player!=target
					}).ai=function(target){
						if(target.hasSkillTag('noturn')) return 0;
						var player=_status.event.player;
						if(get.attitude(_status.event.player,target)==0) return 0;
						if(get.attitude(_status.event.player,target)>0){
							if(target.classList.contains('turnedover')) return 1000-target.countCards('h');
							if(player.getDamagedHp()<3) return -1;
							return 100-target.countCards('h');
						}
						else{
							if(target.classList.contains('turnedover')) return -1;
							if(player.getDamagedHp()>=3) return -1;
							return 1+target.countCards('h');
						}
					}
					"step 1"
					if(result.bool){
						player.logSkill('refangzhu',result.targets);
						event.target=result.targets[0]
						event.target.chooseToDiscard('he',player.getDamagedHp()).set('ai',function(card){
							var player=_status.event.player;
							if(player.isTurnedOver()||_status.event.getTrigger().player.getDamagedHp()>2) return -1;
							return (player.hp*player.hp)-get.value(card);
						}).set('prompt','弃置'+get.cnNumber(player.getDamagedHp())+'张手牌并失去一点体力；或选择不弃置，将武将牌翻面并摸'+get.cnNumber(player.getDamagedHp())+'张牌。');
					}
					else event.finish();
					"step 2"
					if(result.bool){
						event.target.loseHp();
					}
					else{
						event.target.draw(player.getDamagedHp());
						event.target.turnOver();
					}
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					effect:{
						target:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp<=1) return;
								if(!target.hasFriend()) return;
								var hastarget=false;
								var turnfriend=false;
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(get.attitude(target,players[i])<0&&!players[i].isTurnedOver()){
										hastarget=true;
									}
									if(get.attitude(target,players[i])>0&&players[i].isTurnedOver()){
										hastarget=true;
										turnfriend=true;
									}
								}
								if(get.attitude(player,target)>0&&!hastarget) return;
								if(turnfriend||target.hp==target.maxHp) return [0.5,1];
								if(target.hp>1) return [1,0.5];
							}
						},
					},
				},
			},
			repolu:{
				audio:1,
				trigger:{
					source:'dieAfter',
					player:'die',
				},
				forceDie:true,
				filter:function(event,player,name){
					return name=='die'||player.isAlive();
				},
				direct:true,
				content:function(){
					'step 0'
					if(!player.storage.repolu) player.storage.repolu=0;
					event.num=player.storage.repolu+1;
					player.chooseTarget([1,Infinity],get.prompt('repolu'),'令任意名角色摸'+get.cnNumber(event.num)+'张牌').set('forceDie',true).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						player.storage.repolu++;
						result.targets.sortBySeat();
						player.logSkill('repolu',result.targets);
						game.asyncDraw(result.targets,num);
					}
					else event.finish();
					'step 2'
					game.delay();
				},
			},
			rejiuchi:{
				group:['jiuchi'],
				audioname:['re_dongzhuo'],
				trigger:{source:'damage'},
				forced:true,
				popup:false,
				locked:false,
				audio:'jiuchi',
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.getParent(2).jiu==true&&!player.hasSkill('rejiuchi_air');
				},
				content:function(){
					player.logSkill('jiuchi');
					player.addTempSkill('rejiuchi_air');
				},
				subSkill:{
					air:{
						sub:true,
						init:function(player,skill){
							player.disableSkill(skill,'benghuai');
						},
						onremove:function(player,skill){
							player.enableSkill(skill);
						},
					},
				},
			},
			relianji:{
				audio:'wylianji',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.players.length>1;
				},
				filterTarget:lib.filter.notMe,
				targetprompt:['打人','被打'],
				selectTarget:2,
				multitarget:true,
				content:function(){
					'step 0'
					game.delay(0.5);
					if(targets[0].isDisabled(1)) event.goto(2);
					'step 1'
					var target=targets[0];
					var equip1=get.cardPile2(function(card){
						return get.subtype(card)=='equip1';
					});
					if(!equip1){
						player.popup('连计失败');
						game.log('牌堆中无装备');
						event.finish();
						return;
					}
					if(equip1.name=='qinggang'&&!lib.inpile.contains('qibaodao')){
						equip1.remove();
						equip1=game.createCard('qibaodao',equip1.suit,equip1.number);
					}
					target.$draw(equip1);
					target.chooseUseTarget(equip1,'noanimate','nopopup',true);
					'step 2'
					game.updateRoundNumber();
					var list=['nanman','wanjian','huogong','juedou','sha'];
					var list2=game.players.slice(0);
					list2.remove(player);
					for(var i=0;i<list.length;i++){
						if(!targets[0].canUse(list[i],targets[1],false)) list.splice(i--,1);
					}
					if(!list.length) return;
					var name=list.randomGet();
					if(name=='nanman'||name=='wanjian'){
						for(var i=0;i<list2.length;i++){
							if(!targets[0].canUse(name,list2[i],false)) list2.splice(i--,1);
						}
					}
					else list2=targets[1];
					targets[0].useCard({name:name,isCard:true},list2,'noai');
					game.delay(0.5);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(ui.selected.targets.length==0){
								return 1;
							}
							else{
								return -1;
							}
						}
					},
					expose:0.4,
					threaten:3,
				},
				group:'relianji_count',
				subSkill:{
					count:{
						sub:true,
						forced:true,
						popup:false,
						silent:true,
						trigger:{global:'damageEnd'},
						filter:function(event,player){
							var evt=event.getParent(3);
							return evt&&evt.name=='relianji'&&evt.player==player;
						},
						content:function(){
							if(!player.storage.relianji) player.storage.relianji=0;
							player.storage.relianji++;
							if(player.storage.relianji>2){
								event.trigger('remoucheng_awaken');
							}
						},
					},
				},
			},
			remoucheng:{
				derivation:'rejingong',
				trigger:{
					player:'remoucheng_awaken'
				},
				forced:true,
				audio:'moucheng',
				juexingji:true,
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					player.awakenSkill('remoucheng');
					player.removeSkill('relianji');
					player.addSkill('rejingong');
					player.gainMaxHp();
					player.recover();
				},
			},
			rejingong:{
				audio:'jingong',
				enable:'phaseUse',
				delay:0,
				usable:1,
				content:function(){
					'step 0'
					var list=get.inpile('trick').randomGets(2);
					if(Math.random()<0.5){
						list.push('wy_meirenji');
					}
					else{
						list.push('wy_xiaolicangdao');
					}
					for(var i=0;i<list.length;i++){
						list[i]=['锦囊','',list[i]];
					}
					player.chooseButton(['矜功',[list,'vcard']]).set('filterButton',function(button,player){
						return game.hasPlayer(function(current){
							return player.canUse(button.link[2],current,true,false);
						});
					}).set('ai',function(button){
						var player=_status.event.player;
						var name=button.link[2];
						if(game.hasPlayer(function(current){
							return player.canUse(name,current)&&get.effect(current,{name:name},player,player)>0;
						})){
							if(name=='wy_meirenji'||name=='wy_xiaolicangdao') return Math.random()+0.5;
							return Math.random();
						}
						return 0;
					});
					'step 1'
					if(result.bool){
						player.chooseUseTarget(result.links[0][2],true);
						player.addTempSkill('jingong2');
					}
				},
				ai:{
					order:2,
					result:{
						player:function(player){
							if((player.hp<=2||player.needsToDiscard())&&!player.getStat('damage')) return 0;
							return 1;
						}
					}
				}
			},
			relieren:{
				audio:2,
				audioname:['boss_lvbu3'],
				trigger:{player:'useCardToTargeted'},
				filter:function(event,player){
					return event.card.name=='sha'&&player.canCompare(event.target);
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				//priority:5,
				content:function(){
					"step 0"
					player.chooseToCompare(trigger.target);
					"step 1"
					if(result.bool){
						if(trigger.target.countGainableCards(player,'he')) player.gainPlayerCard(trigger.target,true,'he');
					}
					else{
						var card1=result.player;
						var card2=result.target;
						if(get.position(card1)=='d') trigger.target.gain(card1,'gain2');
						if(get.position(card2)=='d') player.gain(card2,'gain2');
					}
				}
			},
			rezaiqi:{
				init:function(player,skill){
					player.storage[skill]=0;
				},
				audio:2,
				direct:true,
				filter:function(event,player){
					return player.storage.rezaiqi>0;
				},
				trigger:{
					player:'phaseDiscardEnd'
				},
				content:function(){
					'step 0'
					player.chooseTarget([1,player.storage.rezaiqi],get.prompt2('rezaiqi')).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						var targets=result.targets;
						targets.sortBySeat();
						player.line(targets,'fire');
						player.logSkill('rezaiqi',targets);
						event.targets=targets;
					}
					else event.finish();
					'step 2'
					event.current=targets.shift();
					if(player.isHealthy()) event._result={index:0};
					else event.current.chooseControl().set('choiceList',[
						'摸一张牌',
						'令'+get.translation(player)+'回复一点体力',
					]).set('ai',function(){
						if(get.attitude(event.current,player)>0) return 1;
						return 0;
					});
					'step 3'
					if(result.index==1){
						event.current.line(player);
						player.recover();
					}
					else event.current.draw();
					game.delay();
					if(targets.length) event.goto(2);
				},
				group:'rezaiqi_count',
			},
			rezaiqi_count:{
				trigger:{
					global:["loseEnd","cardsDiscardEnd"],
					player:'phaseAfter',
				},
				silent:true,
				forced:true,
				popup:false,
				filter:function (event,player,name){
					if(name=='phaseAfter') return true;
					if(_status.currentPhase!=player) return false;
					var evt=event.getParent();
					if(evt&&evt.name=='useCard'&&evt.card&&['equip','delay'].contains(get.type(evt.card))) return false;
					var cards=event.cards;
					for(var i=0;i<cards.length;i++){
						if(get.color(cards[i])=='red'&&get.position(cards[i],true)=='d') return true;
					}
					return false;
				},
				content:function(){
					if(event.triggername=='phaseAfter') player.storage.rezaiqi=0;
					else{
						var cards=trigger.cards;
						for(var i=0;i<cards.length;i++){
						if(get.color(cards[i])=='red'&&get.position(cards[i],true)=='d') player.storage.rezaiqi++;
						}
					}
				},
			},
			shouye:{
				audio:2,
				group:'shouye_after',
				trigger:{global:"useCard"},
				filter:function(event,player){
					return event.player!=player&&event.targets&&
					event.targets[0]==player&&event.targets.length==1;
				},
				check:function(event,player){
					return get.effect(player,event.card,event.player,player)<0;
				},
				usable:1,
				logTarget:'player',
				content:function(){
					'step 0'
					player.line(trigger.player,'green');
					player.chooseToDuiben(trigger.player);
					'step 1'
					if(result.bool){
						trigger.excluded.add(player);
						trigger.shouyeer=player;
					}
				},
				subSkill:{
					after:{
						sub:true,
						trigger:{global:'useCardAfter'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							if(event.shouyeer!=player) return false;
							if(event.cards){
								for(var i=0;i<event.cards.length;i++){
									if(event.cards[i].isInPile()) return true;
								}
							}
							return false;
						},
						content:function(){
							var list=[];
								for(var i=0;i<trigger.cards.length;i++){
									if(trigger.cards[i].isInPile()){
										list.push(trigger.cards[i]);
									}
								}
								player.gain(list,'gain2');
						},
					},
				},
			},
			liezhi:{
				audio:2,
				group:'liezhi_damage',
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('liezhi_disable');
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('liezhi'),'弃置至多两名角色区域内的各一张牌',[1,2],function(card,player,target){
						return target!=player&&target.countDiscardableCards(player,'hej')>0;
					}).ai=function(target){
						var player=_status.event.player;
						return get.effect(target,{name:'guohe'},player,player);
					};
					'step 1'
					if(result.bool){
						result.targets.sortBySeat();
						event.targets=result.targets;
						player.line(result.targets,'green');
						player.logSkill('liezhi',result.targets);
					}
					else event.finish();
					'step 2'
					event.current=targets.shift();
					player.discardPlayerCard(event.current,'hej',true)
					if(targets.length) event.redo();
				},
				subSkill:{
					disable:{
						sub:true,
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						charlotte:true,
						//filter:function(event){return !event.liezhi},
						content:function(){player.removeSkill('liezhi_disable')},
					},
					damage:{
						trigger:{player:'damage'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){player.addSkill('liezhi_disable')}
					},
				},
			},
			xinzhanyi:{
				audio:'zhanyi',
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				check:function(card){
					var player=_status.event.player;
					if(player.hp<3) return 0;
					var type=get.type(card,'trick');
					if(type=='trick'){
						return 6-get.value(card);
					}
					else if(type=='equip'){
						if(player.hasSha()&&game.hasPlayer(function(current){
							return (player.canUse('sha',current)&&
								get.attitude(player,current)<0&&
								get.effect(current,{name:'sha'},player,player)>0)
						})){
							return 6-get.value(card);
						}
					}
					return 0;
				},
				content:function(){
					player.loseHp();
					switch(get.type(cards[0],'trick')){
						case 'basic':player.addTempSkill('xinzhanyi_basic');break;
						case 'equip':player.addTempSkill('xinzhanyi_equip');break;
						case 'trick':player.addTempSkill('xinzhanyi_trick');player.draw(3);break;
					}
				},
				ai:{
					order:9.1,
					result:{
						player:1
					}
				}
			},
			xinzhanyi_basic1:{
				trigger:{player:"useCard"},
				filter:function(event,player){
					return event.skill=='xinzhanyi_basic_backup'&&!player.storage.xinzhanyi_basic1;
				},
				forced:true,
				silent:true,
				popup:false,
				content:function(){
					trigger.xinzhanyi=true;
					player.storage.xinzhanyi_basic1=true;
				},
			},
			xinzhanyi_basic2:{
				trigger:{source:['damageBegin','recoverBegin']},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event){
					return event.getParent(2).xinzhanyi==true;
				},
				content:function(){
					trigger.num++
				},
			},
			xinzhanyi_basic:{
				group:['xinzhanyi_basic1','xinzhanyi_basic2'],
				onremove:function(p,s){
					delete p.storage[s+1];
				},
				enable:"chooseToUse",
				filter:function (event,player){
					if(event.filterCard({name:'sha'},player,event)||
						event.filterCard({name:'jiu'},player,event)||
						event.filterCard({name:'tao'},player,event)){
						return player.hasCard(function(card){
							return get.type(card)=='basic';
						},'h');
					}
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							list.push(['基本','','sha','fire']);
							list.push(['基本','','sha','thunder']);
						}
						if(event.filterCard({name:'tao'},player,event)){
							list.push(['基本','','tao']);
						}
						if(event.filterCard({name:'jiu'},player,event)){
							list.push(['基本','','jiu']);
						}
						return ui.create.dialog('战意',[list,'vcard'],'hidden');
					},
					check:function (button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							switch(button.link[2]){
								case 'tao':return 5;
								case 'jiu':{
									if(player.countCards('h',{type:'basic'})>=2) return 3;
								};
								case 'sha':
									if(button.link[3]=='fire') return 2.95;
									else if(button.link[3]=='thunder') return 2.92;
									else return 2.9;
							}
						}
						return 0;
					},
					backup:function (links,player){
						return {
							audio:'zhanyi',
							filterCard:function(card,player,target){
								return get.type(card)=='basic';
							},
							check:function(card,player,target){
								return 9-get.value(card);
							},
							viewAs:{name:links[0][2],nature:links[0][3]},
							position:'he',
							popname:true,
						}
					},
					prompt:function (links,player){
						return '将一张基本牌当做'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					order:function (){
						var player=_status.event.player;
						var event=_status.event;
						if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0&&player.countCards('h',{type:'basic'})>=2){
							return 3.3;
						}
						return 3.1;
					},
					save:true,
					respondSha:true,
					skillTagFilter:function (player,tag,arg){
						if(player.hasCard(function(card){
							return get.type(card)=='basic';
						},'he')){
							if(tag=='respondSha'){
								if(arg!='use') return false;
							}
						}
						else{
							return false;
						}
					},
					result:{
						player:1,
					},
				},
			},
			xinzhanyi_equip:{
				audio:'zhanyi',
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.countCards('he')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					'step 0'
					trigger.target.chooseToDiscard('he',true,2);
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						if(result.cards.length==1){
							event._result={bool:true,links:result.cards.slice(0)};
						}
						else player.chooseButton(['选择获得其中的一张牌',result.cards.slice(0)],true).ai=function(button){
							return get.value(button.link);
						};
					}
					else event.finish();
					'step 2'
					if(result.links) player.gain(result.links,'gain2');
				}
			},
			xinzhanyi_trick:{
				mod:{
					wuxieRespondable:function(){
						return false;
					}
				}
			},
		},
		translate:{
			re_jikang:"手杀嵇康",
			old_bulianshi:'手杀步练师',
			old_caochun:'旧曹纯',
			shenpei:'审配',
			re_zhurong:'界祝融',
			re_menghuo:'界孟获',
			re_wangyun:'手杀王允',
			re_dongzhuo:'界董卓',
			re_sunjian:'界孙坚',
			re_caopi:'界曹丕',
			rejiuchi:'酒池',
			rejiuchi_info:'你可以将一张黑桃手牌当做【酒】使用。锁定技，当你于回合内使用带有【酒】效果的【杀】造成伤害时，你令你的【崩坏】失效直到回合结束。',
			repolu:'破虏',
			repolu_info:'当你杀死一名角色/死亡时，你可以令任意名角色摸X+1张牌。（X为你此前发动过【破虏】的次数）',
			rexingshang:'行殇',
			rexingshang_info:'当其他角色死亡后，你可以选择一项：回复1点体力，或获得其所有牌。',
			refangzhu:'放逐',
			refangzhu_info:'当你受到伤害后，你可以令一名其他角色选择一项：摸X张牌并将武将牌翻面，或弃置X张牌并失去1点体力。（X为你已损失的体力值）',
			relianji:'连计',
			relianji_info:'出牌阶段限一次，你可以选择两名其他角色。第一名角色随机使用牌堆中的一张武器牌，然后这名角色视为对另一名角色随机使用一张下列的牌名的牌：【决斗】、【火攻】、【南蛮入侵】、【万箭齐发】或普【杀】。然后若此牌造成伤害，你获得X枚“连计”标记（X为此次扣减的体力值点数）。',
			remoucheng:'谋逞',
			remoucheng_info:'觉醒技，当一名角色造成伤害后，若你拥有的“连计”标记数大于2，你加1点体力上限，回复1点体力，失去“连计”，获得“矜功”。',
			rejingong:'矜功',
			rejingong_info:'每回合可以用三个随机锦囊中的一个，三个锦囊中有一个是专属锦囊，本回合未造成伤害会失去1点体力。',
			mobile_default:'常规',
			mobile_others:'其他',
			
			pss:'手势',
			pss_paper:'布',
			pss_scissor:'剪刀',
			pss_stone:'石头',
			pss_paper_info:'石头剪刀布时的一种手势。克制石头，但被剪刀克制。',
			pss_scissor_info:'石头剪刀布时的一种手势。克制布，但被石头克制。',
			pss_stone_info:'石头剪刀布时的一种手势。克制剪刀，但被布克制。',
			
			db_atk:'进攻对策',
			db_atk1:'全军出击',
			db_atk2:'分兵围城',
			
			db_def:'防御对策',
			db_def1:'奇袭粮道',
			db_def2:'开城诱敌',
			
			shouye:'守邺',
			shouye_info:'每回合限一次。当其他角色使用牌指定你为唯一目标时，你可以与其进行【对策】。若你赢，则此牌对你无效，且你于此牌结算完成后获得其对应的所有实体牌。',
			liezhi:'烈直',
			liezhi_info:'准备阶段，你可以依次弃置至多两名角色区域内的各一张牌。若你受到过伤害，则〖烈直〗于你的下个回合无效。',
			relieren:'烈刃',
			relieren_info:'当你使用【杀】指定目标后，你可以和目标角色进行拼点。若你赢，你获得其一张牌。若你没赢，你获得对方的拼点牌，其获得你的拼点牌。',
			rezaiqi:'再起',
			rezaiqi_info:'弃牌阶段结束时，你可以令至多X名角色选择一项：1.摸一张牌，2.令你回复1点体力（X为本回合进入弃牌堆的红色牌数）',
			
			xinzhanyi:'战意',
			xinzhanyi_info:'出牌阶段限一次，你可以弃置一张牌并失去1点体力，然后根据你弃置的牌获得以下效果直到回合结束：基本牌，你可以将一张基本牌当作杀、酒或桃使用，且你本回合第一次以此法使用的牌的回复值/伤害值+1；锦囊牌，摸三张牌且你使用的牌不能被【无懈可击】响应；装备牌，你使用【杀】指定目标角色后，其弃置两张牌，然后你获得其中的一张。',
			xinzhanyi_basic_backup:'战意',
			xinzhanyi_basic:'战意',
			xinzhanyi_equip:'战意',
			
			re_dengai:'界邓艾',
			re_jiangwei:'界姜维',
			re_caiwenji:'界蔡文姬',
			re_baosanniang:'手杀鲍三娘',
			retuntian:'屯田',
			retiaoxin:'挑衅',
			rebeige:'悲歌',
			retuntian_info:'当你于回合外失去牌时，你可以进行一次判定。若判定结果为♥，你获得此判定牌。否则你将此牌置于你的武将牌上，称之为【田】。锁定技，你计算与其他角色的距离时-X（X为你武将牌上【田】的数目）',
			retiaoxin_info:'出牌阶段限一次，你可以指定一名有牌的其他角色，该角色需对你使用一张【杀】，否则你弃置其一张牌。',
			rebeige_info:'当有角色受到【杀】造成的伤害后，你可以弃一张牌，并令其进行一次判定，若判定结果为：♥该角色回复X点体力(X为伤害点数)；♦︎该角色摸三张牌；♣伤害来源弃两张牌；♠伤害来源将其武将牌翻面',
			meiyong:'姝勇',
			meiyong_info:'当你使用或打出【杀】时，你可以获得一名其他角色的一张牌，然后其摸一张牌。',
			rexushen:'许身',
			rexushen_info:'限定技，出牌阶段，你可以失去X点体力（X为场上男性角色的数量）。若你以此法进入了濒死状态，则当你因一名角色而脱离此濒死状态后，你可以令其获得技能〖武圣〗和〖当先〗。',
			rezhennan:'镇南',
			rezhennan_info:'当你成为其他角色使用的牌的目标后，若此牌的目标数大于该角色的体力值，则你可以弃置一张牌并对其造成1点伤害。',
			
			hujinding:'胡金定',
			re_liushan:'手杀刘禅',
			re_sunben:'界孙笨',
			re_zhangzhang:'界张昭张纮',
			rehunzi:'魂姿',
			rehunzi_info:'觉醒技，准备阶段，若你的体力值不大于2，你减1点体力上限，并获得技能〖英姿〗和〖英魂〗。',
			zhijian_info:'出牌阶段，你可以将手牌中的一张装备牌置于一名其他角色装备区里（不得替换原装备），然后摸一张牌。当你使用装备牌时，你可以摸一张牌。',
			refangquan:'放权',
			refangquan_info:'你可跳过你的出牌阶段，若如此做，你本回合的手牌上限+X（X为你已损失的体力值），且回合结束时，你可以弃置一张手牌并令一名其他角色进行一个额外的回合。',
			huaizi:'怀子',
			huaizi_info:'锁定技，你的手牌上限+X（X为你已损失的体力值）',
			renshi:'仁释',
			renshi_info:'锁定技，当你受到【杀】的伤害时，若你已受伤，则你防止此伤害并获得此【杀】对应的所有实体牌，然后减1点体力上限。',
			wuyuan:'武缘',
			wuyuan_info:'出牌阶段限一次，你可将一张【杀】交给一名其他角色，然后你回复1点体力，其摸一张牌。若此【杀】为：红色【杀】，其回复1点体力；属性【杀】，其改为摸两张牌。',
			
			re_weiwenzhugezhi:'手杀卫温诸葛直',
			re_xugong:'手杀许贡',
			re_zhanggong:'手杀张恭',
			reqianxin:'遣信',
			reqianxin_info:'出牌阶段限一次，你可将至多两张手牌随机交给等量的其他角色，称为「信」。这些角色的准备阶段开始时，若其手牌中有「信」，则其选择一项：令你摸两张牌，本回合手牌上限-2。',
			rebiaozhao:"表召",
			"rebiaozhao_info":"结束阶段，你可以将一张牌置于武将牌上，称为「表」。当有一张与「表」点数相同的牌进入弃牌堆时，你将「表」置入弃牌堆并失去1点体力。准备阶段，若你的武将牌上有「表」，则你移去「表」并选择一名角色，该角色回复1点体力并摸三张牌。",
			"rebiaozhao2":"表召",
			"rebiaozhao2_info":"",
			"rebiaozhao3":"表召",
			"rebiaozhao3_info":"",
			refuhai:'浮海',
			refuhai_info:'出牌阶段限一次，你可弃置一张手牌，令其他角色同时在「潮起」和「潮落」中选择一项，并依次展示这些角色的选项。若从你下家开始选择了相同选项的角色数目大于1，则你摸X张牌（X为连续相同结果的数量）。',
			qiaosi:'巧思',
			qiaosi_info:'出牌阶段限一次，你可以表演「大键角色图」并根据表演结果获得相应的牌。然后，你选择一项：1.弃置X张牌。2.将X张牌交给一名其他角色。（X为你以此法获得的牌数）',
			qiaosi_map:'大键角色图',
			qiaosi_map_info:'<br><li>星野 梦美：锦囊牌*2<br><li>能美 库特莉亚芙卡：装备牌/【杀】/【酒】*1<br><li>友利 奈绪：【杀】/【酒】*1<br><li>神尾 观铃：【闪】/【桃】*1<br><li>伊吹 风子：锦囊牌/【闪】/【桃】*1<br><li>仲村 ゆり：装备牌*2<br><li>Illustration: うら;Twitter:@ura530',
			qiaosi_c1:'<img src="'+lib.assetURL+'image/card/qiaosi_card1.png" width="60" height="60"> ',
			//星野 梦美
			qiaosi_c2:'<img src="'+lib.assetURL+'image/card/qiaosi_card2.png" width="60" height="60"> ',
			//能美 库特莉亚芙卡
			qiaosi_c3:'<img src="'+lib.assetURL+'image/card/qiaosi_card3.png" width="60" height="60"> ',
			//友利 奈绪
			qiaosi_c4:'<img src="'+lib.assetURL+'image/card/qiaosi_card4.png" width="60" height="60"> ',
			//神尾 观铃
			qiaosi_c5:'<img src="'+lib.assetURL+'image/card/qiaosi_card5.png" width="60" height="60"> ',
			//伊吹 风子
			qiaosi_c6:'<img src="'+lib.assetURL+'image/card/qiaosi_card6.png" width="60" height="60"> ',
			//仲村 ゆり
			mobile_sunben:'那个男人',
			//孙笨
		}
	};
});
