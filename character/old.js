'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'old',
		characterSort:{
			old:{
				old_shenhua:["yuji","zhangjiao","old_zhugezhan"],
				old_refresh:["old_zhangfei","old_huatuo"],
				old_yijiang1:["masu","xushu","fazheng","yujin","xin_yujin","old_xusheng","old_lingtong","ol_yujin"],
				old_yijiang2:["old_madai","old_zhonghui","old_wangyi","old_guanzhang","ol_liaohua"],
				old_yijiang3:["liru","old_zhuran","ol_zhuran","ol_manchong","ol_guohuai","old_fuhuanghou","old_caochong"],
				old_yijiang4:["old_caozhen","old_chenqun","old_zhuhuan","ol_wuyi"],
				old_yijiang5:["old_caoxiu","old_quancong","old_zhuzhi"],
				old_yijiang67:["ol_xinxianying","ol_zhangrang","ol_liuyu"],
				old_sp:["old_caochun","old_lingju","old_maliang","old_machao","zhangliang","jsp_caoren","ol_guansuo"],
			},
		},
		character:{
			old_fuhuanghou:['female','qun',3,['oldzhuikong','oldqiuyuan']],
			old_caochong:['male','wei',3,['oldrenxin','oldchengxiang']],
			yuji:['male','qun',3,['old_guhuo'],['forbidai']],
			zhangjiao:['male','qun',3,['leiji','guidao','huangtian'],['zhu']],
			old_zhangfei:['male','shu',4,['paoxiao','retishen']],
			old_huatuo:['male','qun',3,['jijiu','chulao']],
			jsp_caoren:['male','wei',4,['kuiwei','yanzheng']],
			old_caochun:['male','wei',4,['shanjia']],
			masu:['male','shu',3,['xinzhan','huilei']],
			xushu:['male','shu',3,['wuyan','jujian']],
			fazheng:['male','shu',3,['enyuan','xuanhuo']],
			liru:['male','qun',3,['juece','mieji','fencheng']],
			yujin:['male','wei',4,['yizhong']],
			xin_yujin:['male','wei',4,['jieyue']],
			//lusu:['male','wu',3,['haoshi','dimeng']],
			//yuanshao:['male','qun',4,['luanji','xueyi'],['zhu']],
			old_zhonghui:['male','wei',3,['zzhenggong','zquanji','zbaijiang']],
			old_xusheng:['male','wu',4,['pojun']],
			old_zhuran:['male','wu',4,['olddanshou']],
			old_lingtong:['male','wu',4,['oldxuanfeng']],
			old_madai:['male','shu',4,['mashu','oldqianxi']],
			old_caoxiu:['male','wei',4,['taoxi']],
			old_wangyi:['female','wei',3,['oldzhenlie','oldmiji']],
			old_caozhen:['male','wei',4,['sidi']],
			old_quancong:['male','wu',4,['zhenshan']],
			old_lingju:['female','qun',3,['jieyuan','fenxin_old']],
			old_maliang:['male','shu',3,['xiemu','naman']],
			old_chenqun:['male','wei',3,['dingpin','oldfaen']],
			old_zhuhuan:['male','wu',4,['youdi']],
			old_zhuzhi:['male','wu',4,['anguo']],
			
			old_machao:['male','qun',4,['zhuiji','oldcihuai']],
			old_zhugezhan:["male","shu",3,["old_zuilun","old_fuyin"]],
			zhangliang:["male","qun",4,["old_jijun","old_fangtong"]],
			old_guanzhang:['male','shu',4,['old_fuhun']],
			ol_xinxianying:['female','wei',3,['caishi','zhongjian']],
			ol_zhangrang:['male','qun',3,['taoluan']],
			ol_yujin:['male','wei',4,['rezhenjun']],
			ol_zhuran:['male','wu',4,['danshou']],
			ol_liaohua:['male','shu',4,['dangxian','fuli']],
			ol_guansuo:['male','shu',4,['zhengnan','xiefang']],
			ol_manchong:['male','wei',3,['yuce','junxing']],
			ol_guohuai:['male','wei',4,['jingce']],
			ol_wuyi:['male','shu',4,['benxi']],
			ol_liuyu:['male','qun',2,['zongzuo','zhige']],
		},
		characterFilter:{
			old_lingju:function(mode){
				return mode=='identity';
			}
		},
		skill:{
			old_fuhun:{
				audio:'fuhun',
				trigger:{player:'phaseDrawBefore'},
				content:function(){
					'step 0'
					trigger.cancel();
					'step 1'
					var cards=get.cards(2);
					event.cards=cards;
					player.showCards(cards);
					'step 2'
					player.gain(cards,'gain2');
					if(get.color(cards[0])!=get.color(cards[1])){
						player.addTempSkill('wusheng');
						player.addTempSkill('paoxiao');
					}
				},
			},
			"old_guhuo":{
				group:["old_guhuo_guess","old_guhuo_respond","old_guhuo_wuxie"],
				enable:"chooseToUse",
				filter:function (event,player){
					if(!player.countCards('h')) return false;
					var list=['sha','tao','shan','jiu','taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman'];
					if(get.mode()=='guozhan'){
						list=list.concat(['xietianzi','shuiyanqijunx','lulitongxin','lianjunshengyan','chiling','diaohulishan','yuanjiao','huoshaolianying']);
					}
					for(var i=0;i<list.length;i++){
						if(event.filterCard({name:list[i]},player)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function (){
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(name=='wuxie') continue;
							if(name=='sha'){
								list.push(['基本','','sha']);
								list.push(['基本','','sha','fire']);
								list.push(['基本','','sha','thunder']);
							}
							else if(get.type(name)=='trick') list.push(['锦囊','',name]);
							else if(get.type(name)=='basic') list.push(['基本','',name]);
						}
						return ui.create.dialog('蛊惑',[list,'vcard']);
					},
					filter:function (button,player){
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							return evt.filterCard({name:button.link[2]},player,evt);
						}
						return true;
					},
					backup:function (links,player){
						return {
							filterCard:true,
							selectCard:1,
							viewAs:{name:links[0][2],nature:links[0][3]},
						}
					},
					prompt:function (links,player){
						return '将一张手牌当'+get.translation(links[0][2])+'使用';
					},
				},
				ai:{save:true,respondShan:true,respondSha:true},
			},
			"old_guhuo_guess":{
				audio:'guhuo_guess',
				trigger:{
					player:"useCardBefore",
				},
				filter:function (event,player){
					return event.skill=="old_guhuo_backup"||event.skill=="old_guhuo_wuxie";
				},
				forced:true,
				direct:true,
				priority:15,
				content:function (){
					'step 0'
					player.logSkill('old_guhuo_guess');
					player.popup(trigger.card.name,'metal');
					player.lose(trigger.cards,ui.special);
					player.line(trigger.targets,trigger.card.nature);
					trigger.line=false;
					event.prompt=get.translation(player)+'声明了'+get.translation(trigger.card.name)+'，是否质疑？';
					event.guessers=game.filterPlayer(function(current){
						return current!=player&&current.hp>0;
					});
					event.guessers.sort(lib.sort.seat);
					event.ally=[];
					event.betray=[];
					'step 1'
					if(event.guessers.length==0) event.goto(3);
					else{
						event.guessers[0].chooseControl('质疑','不质疑').set('prompt',event.prompt).set('ai',function(){
							if(get.attitude(event.guessers[0],player)>0) return '不质疑';
							return Math.random()<0.5?'不质疑':'质疑';
						});
					}
					'step 2'
					if(!result.control) result.control='不质疑';
					event.guessers[0].chat(result.control);
					game.delay();
					if(result.control=='不质疑'){
						game.log(event.guessers[0],'#g不质疑');
						event.ally.push(event.guessers[0]);
					}else{
						game.log(event.guessers[0],'#y质疑');
						event.betray.push(event.guessers[0]);
					}
					event.guessers.remove(event.guessers[0]);
					if(event.guessers.length) event.goto(1);
					'step 3'
					player.showCards(trigger.cards);
					if(event.betray.length){
						if(trigger.card.name==trigger.cards[0].name){
							if(get.suit(trigger.cards[0])!='heart'){
								game.log(player,'使用的','#y'+get.translation(trigger.card.name),'作废了');
								game.cardsDiscard(trigger.cards);
								trigger.cancel();
							}
							for(var i=0;i<event.betray.length;i++){
								event.betray[i].loseHp();
							}
						}
						else{
							game.log(player,'使用的','#y'+get.translation(trigger.card.name),'作废了');
							game.cardsDiscard(trigger.cards);
							trigger.cancel();
							game.asyncDraw(event.betray);
							if(trigger.name=='useCard'&&trigger.parent) trigger.parent.goto(0);
						}
					}
					'step 4'
					game.delay();
				},
			},
			"old_guhuo_respond":{
				trigger:{
					player:"chooseToRespondBegin",
				},
				filter:function (event,player){
					if(event.responded) return false;
					if(!event.filterCard({name:'shan'})&&!event.filterCard({name:'sha'})) return false;
					if(!player.countCards('h')) return false;
					return true;
				},
				direct:true,
				content:function (){
					'step 0'
					if(trigger.filterCard({name:'shan'})&&lib.filter.cardRespondable({name:'shan'},player,trigger)) event.name='shan';
					else event.name='sha';
					player.chooseCard('是否发动【蛊惑】，将一张手牌当做'+get.translation(event.name)+'打出？');
					'step 1'
					if(result.bool){
						player.logSkill('old_guhuo_guess');
						player.popup(event.name,'metal');
						player.lose(result.cards,ui.special);
						event.card=result.cards[0];
						event.prompt=get.translation(player)+'声明了'+get.translation(event.name)+'，是否质疑？';
						event.guessers=game.filterPlayer(function(current){
							return current!=player&&current.hp>0;
						});
						event.guessers.sort(lib.sort.seat);
						event.ally=[];
						event.betray=[];
					}
					else event.finish();
					'step 2'
					if(event.guessers.length==0) event.goto(4);
					else{
						event.guessers[0].chooseControl('质疑','不质疑').set('prompt',event.prompt).set('ai',function(){
							if(get.attitude(event.guessers[0],player)>0) return '不质疑';
							return Math.random()<0.5?'不质疑':'质疑';
						});
					}
					'step 3'
					if(!result.control) result.control='不质疑';
					event.guessers[0].chat(result.control);
					game.delay();
					if(result.control=='不质疑'){
						game.log(event.guessers[0],'#g不质疑');
						event.ally.push(event.guessers[0]);
					}else{
						game.log(event.guessers[0],'#y质疑');
						event.betray.push(event.guessers[0]);
					}
					event.guessers.remove(event.guessers[0]);
					if(event.guessers.length) event.goto(2);
					'step 4'
					var bool=true;
					player.showCards(event.card);
					if(event.betray.length){
						if(event.name==event.card.name){
							if(get.suit(event.card)!='heart'){
								game.log(player,'使用的','#y'+get.translation(event.name),'作废了');
								game.cardsDiscard(event.card);
								bool=false;
							}
							for(var i=0;i<event.betray.length;i++){
								event.betray[i].loseHp();
							}
						}
						else{
							game.log(player,'使用的','#y'+get.translation(event.name),'作废了');
							game.cardsDiscard(event.card);
							bool=false;
							game.asyncDraw(event.betray);
							game.delay();
						}
					}
					if(!bool) event.finish();
					'step 5'
					trigger.untrigger();
					trigger.responded=true;
					trigger.result={bool:true,card:{name:event.name},cards:[event.card]};
				},
				ai:{
					order:4,
					useful:-1,
					value:-1,
				},
			},
			"old_guhuo_wuxie":{
				log:false,
				silent:true,
				popup:false,
				enable:"chooseToUse",
				filterCard:true,
				viewAsFilter:function (player){
					return player.countCards('h')>0;
				},
				viewAs:{
					name:"wuxie",
				},
				check:function(card){
					if(card.name=='wuxie') return 1000;
					return 0;
				},
				prompt:"将一张手牌当无懈可击使用",
				threaten:1.2,
			},
			old_zuilun:{
						audio:'xinfu_zuilun',
				subSkill:{
					e:{},
					h:{},
				},
				enable:"phaseUse",
				usable:2,
				filterTarget:function (card,player,target){
					if(player==target) return false;
					var pos='he';
					if(player.hasSkill('old_zuilun_h')) pos='e';
					if(player.hasSkill('old_zuilun_e')) pos='h';
					return target.countGainableCards(player,pos)>0;
				},
				content:function (){
					'step 0'
					var pos='he';
					if(player.hasSkill('old_zuilun_h')) pos='e';
					if(player.hasSkill('old_zuilun_e')) pos='h';
					player.gainPlayerCard(target,pos,true);
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						target.draw();
						var pos=result.cards[0].original;
						if(pos=='h'||pos=='e') player.addTempSkill('old_zuilun_'+pos,'phaseUseAfter');
					}
				},
				ai:{
					order:7,
					result:{
						target:-1,
					},
				},
			},
			old_fuyin:{
				mod:{
					targetEnabled:function(card,player,target){
						if((card.name=='juedou'||card.name=='sha'||card.name=='huogong')&&player!=target&&player.countCards('h')>=target.countCards('h')&&target.isEmpty(2)) return false;
					},
				},
			},
			"old_jijun":{
				marktext:"方",
				audio:"xinfu_jijun",
				intro:{
					content:"cards",
				},
				enable:"phaseUse",
				filterCard:true,
				selectCard:[1,Infinity],
				filter:function (event,player){
					return player.countCards('h')>0;
				},
				check:function (card){
					var player=_status.event.player;
					if(player.storage.old_jijun&&(36-player.storage.old_jijun.length)<=player.countCards('h')) return 1;
					return 5-get.value(card);
				},
				discard:false,
				lose:false,
				content:function (){
					player.lose(cards,ui.special,'toStorage');
					player.$give(cards,player);
					if(!player.storage.old_jijun) player.storage.old_jijun=[];
					player.storage.old_jijun.addArray(cards);
					player.markSkill('old_jijun');
				},
						   ai:{order:1,result:{player:1}},
			},
			"old_fangtong":{
				trigger:{
					player:"phaseJieshuBegin",
				},
				audio:"xinfu_fangtong",
				forced:true,
				skillAnimation:true,
				animationColor:'metal',
				filter:function (event,player){
					return (player.storage.old_jijun&&player.storage.old_jijun.length>35);
				},
				content:function (){
					var bool=false;
					if(player==game.me) bool=true;
					else switch(get.mode()){
						case 'identity':{
							game.showIdentity();
							var id1=player.identity;
							var id2=game.me.identity;
							if(['zhu','zhong','mingzhong'].contains(id1)){
								if(['zhu','zhong','mingzhong'].contains(id2)) bool=true;
								break;
							}
						   else if(id1=='fan'){
								if(id2=='fan') bool=true;
								break;
							}
							break;
						}
						case 'guozhan':{
							if(game.me.isFriendOf(player)) bool=true;
							break;
						}
						case 'versus':{
							if(player.side==game.me.side) bool=true;
							break;
						}
						case 'boss':{
							if(player.side==game.me.side) bool=true;
							break;
						}
						default:{}
					}
					game.over(bool);
				},
			},
			
			oldanxu:{
				enable:'phaseUse',
				usable:1,
				multitarget:true,
				audio:2,
				filterTarget:function(card,player,target){
					if(player==target) return false;
					var num=target.countCards('h');
					if(ui.selected.targets.length){
						return num<ui.selected.targets[0].countCards('h');
					}
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(num>players[i].countCards('h')) return true;
					}
					return false;
				},
				selectTarget:2,
				content:function(){
					'step 0'
					var gainner,giver;
					if(targets[0].countCards('h')<targets[1].countCards('h')){
						gainner=targets[0];
						giver=targets[1];
					}
					else{
						gainner=targets[1];
						giver=targets[0];
					}
					gainner.gainPlayerCard(giver,'h',true).set('visible',true);
					'step 1'
					if(result.bool&&result.links.length&&get.suit(result.links[0])!='spade'){
						player.draw();
					}
				},
				ai:{
					order:10.5,
					threaten:2,
					result:{
						target:function(player,target){
							var num=target.countCards('h');
							var att=get.attitude(player,target);
							if(ui.selected.targets.length==0){
								if(att>0) return -1;
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									var num2=players[i].countCards('h');
									var att2=get.attitude(player,players[i]);
									if(att2>=0&&num2<num) return -1;
								}
								return 0;
							}
							else{
								return 1;
							}
						},
						player:0.1
					}
				}
			},
			oldfaen:{
				audio:'faen',
				trigger:{global:['turnOverAfter','linkAfter']},
				filter:function(event,player){
					if(event.name=='link') return event.player.isLinked();
					return true;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:'player',
				content:function(){
					trigger.player.draw();
				},
				ai:{
					expose:0.2
				}
			},
			zhenshan:{
				trigger:{player:'chooseToRespondBegin'},
				filter:function(event,player){
					if(event.responded) return false;
					if(!event.filterCard({name:'shan'},player,event)&&!event.filterCard({name:'sha'},player,event)) return false;
					if(player.hasSkill('zhenshan2')) return false;
					var nh=player.countCards('h');
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')<nh;
					});
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('zhenshan'),function(card,player,target){
						return target.countCards('h')<player.countCards('h');
					}).set('ai',function(target){
						return get.attitude(player,target)
					});
					"step 1"
					if(result.bool){
						trigger.untrigger();
						trigger.responded=true;
						if(trigger.filterCard({name:'shan'})){
							trigger.result={bool:true,card:{name:'shan'}}
						}
						else{
							trigger.result={bool:true,card:{name:'sha'}}
						}
						player.logSkill('zhenshan',result.targets);
						player.addTempSkill('zhenshan2');
						player.swapHandcards(result.targets[0]);
					}
				},
				group:'zhenshan_use'
			},
			zhenshan2:{},
			zhenshan_use:{
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.hasSkill('zhenshan2')) return false;
					var nh=player.countCards('h');
					if(!game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')<nh;
					})){
						return false;
					}
					return event.filterCard({name:'sha'},player,event)||
						event.filterCard({name:'jiu'},player,event)||
						event.filterCard({name:'tao'},player,event)||
						event.filterCard({name:'shan'},player,event);
				},
				chooseButton:{
					dialog:function(event,player){
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
						if(event.filterCard({name:'shan'},player,event)){
							list.push(['基本','','shan']);
						}
						return ui.create.dialog('振赡',[list,'vcard'],'hidden');
					},
					check:function(button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(card.name=='jiu') return 0;
						if(game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							if(card.name=='sha'){
								if(card.nature=='fire') return 2.95;
								else if(card.nature=='fire') return 2.92;
								else return 2.9;
							}
							else if(card.name=='tao'||card.name=='shan'){
								return 4;
							}
						}
						return 0;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false},
							viewAs:{name:links[0][2],nature:links[0][3]},
							selectCard:-1,
							popname:true,
							log:false,
							precontent:function(){
								'step 0'
								player.chooseTarget('选择交换手牌的目标',function(card,player,target){
									return target.countCards('h')<player.countCards('h')
								},true).ai=function(target){
									return get.attitude(player,target);
								}
								player.addTempSkill('zhenshan2');
								'step 1'
								if(result.bool){
									player.logSkill('zhenshan',result.targets);
									player.swapHandcards(result.targets[0]);
								}
							},
						}
					},
					prompt:function(links,player){
						return '选择'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'的目标';
					}
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var event=_status.event;
						var nh=player.countCards('h');
						if(game.hasPlayer(function(current){
							return get.attitude(player,current)>0&&current.countCards('h')<nh;
						})){
							if(event.type=='dying'){
								if(event.filterCard({name:'tao'},player,event)){
									return 0.5;
								}
							}
							else{
								if(event.filterCard({name:'tao'},player,event)||event.filterCard({name:'shan'},player,event)){
									return 4;
								}
								if(event.filterCard({name:'sha'},player,event)){
									return 2.9;
								}
							}
						}
						return 0;
					},
					save:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag,arg){
						if(player.hasSkill('zhenshan2')) return false;
						var nh=player.countCards('h');
						return game.hasPlayer(function(current){
							return current!=player&&current.countCards('h')<nh;
						});
					},
					result:{
						player:function(player){
							if(_status.event.type=='dying'){
								return get.attitude(player,_status.event.dying);
							}
							else{
								return 1;
							}
						}
					}
				}
			},
			oldzhenlie:{
				audio:'zhenlie',
				trigger:{player:'judge'},
				check:function(event,player){
					return event.judge(player.judging[0])<0;
				},
				content:function(){
					var card=get.cards()[0];
					player.$throw(card);
					card.clone.classList.add('thrownhighlight');
					if(trigger.player.judging[0].clone){
						trigger.player.judging[0].clone.classList.remove('thrownhighlight');
						game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
					}
					trigger.player.judging[0].discard();
					trigger.player.judging[0]=card;
					trigger.position.appendChild(card);
					game.log(trigger.player,'的判定牌改为',card);
					game.delay(2);
				},
			},
			oldmiji:{
				trigger:{player:['phaseZhunbeiBegin','phaseJieshuBegin']},
				filter:function(event,player){
					return player.isDamaged();
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						return get.color(card)=='black'?1:-1;
					});
					'step 1'
					if(result.bool&&player.maxHp>player.hp){
						var cards=get.cards(player.maxHp-player.hp);
						event.cards=cards;
						var dialog=ui.create.dialog('选择获得卡牌的目标',cards,'hidden');
						dialog.classList.add('noselect');
						player.chooseTarget(true,dialog).ai=function(target){
							return get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
						}
					}
					else{
						event.finish();
					}
					'step 2'
					player.line(result.targets);
					result.targets[0].gain(event.cards,'draw');
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'recover')&&target.hp==target.maxHp-1) return [0,0];
							if(target.hasFriend()){
								if((get.tag(card,'damage')==1||get.tag(card,'loseHp'))&&target.hp==target.maxHp) return [0,1];
							}
						}
					},
					threaten:function(player,target){
						if(target.hp==1) return 3;
						if(target.hp==2) return 2;
						return 1;
					},
				}
			},
			shiyong:{
				audio:2,
				trigger:{player:'damageEnd'},
				forced:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&(get.color(event.card)=='red'||event.source.hasSkill('jiu'));
				},
				content:function(){
					player.loseMaxHp();
				}
			},
			oldqianxi:{
				trigger:{source:'damageBegin2'},
				check:function(event,player){
					var att=get.attitude(player,event.player);
					if(event.player.hp==event.player.maxHp) return att<0;
					if(event.player.hp==event.player.maxHp-1&&
						(event.player.maxHp<=3||event.player.hasSkillTag('maixie'))) return att<0;
					return att>0;
				},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&get.distance(player,event.player)<=1;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					player.judge(function(card){
						return get.suit(card)!='heart'?1:-1;
					});
					'step 1'
					if(result.bool){
						trigger.cancel();
						trigger.player.loseMaxHp(true);
					}
				}
			},
			oldxuanfeng:{
				audio:'xuanfeng',
				trigger:{player:'loseEnd'},
				direct:true,
				filter:function(event,player){
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='e') return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('xuanfeng'),function(card,player,target){
						if(target==player) return false;
						return get.distance(player,target)<=1||player.canUse('sha',target,false);
					}).set('ai',function(target){
						if(get.distance(player,target)<=1){
							return get.damageEffect(target,player,player)*2;
						}
						else{
							return get.effect(target,{name:'sha'},player,player);
						}
					});
					"step 1"
					if(result.bool){
						player.logSkill('xuanfeng',result.targets);
						var target=result.targets[0];
						var distance=get.distance(player,target);
						if(distance<=1&&player.canUse('sha',target,false)){
							player.chooseControl('出杀','造成伤害').ai=function(){
								return '造成伤害';
							}
							event.target=target;
						}
						else if(distance<=1){
							target.damage();
							event.finish();
						}
						else{
							player.useCard({name:'sha'},target,false).animate=false;
							game.delay();
							event.finish();
						}
					}
					else{
						event.finish();
					}
					"step 2"
					var target=event.target;
					if(result.control=='出杀'){
						player.useCard({name:'sha'},target,false).animate=false;
						game.delay();
					}
					else{
						target.damage();
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip') return [1,3];
						}
					},
					reverseEquip:true,
					noe:true
				}
			},
		},
		translate:{
			old_yuanshu:'手杀袁术',
			old_xusheng:'旧徐盛',
			old_lingtong:'旧凌统',
			old_zhuran:'旧朱然',
			old_madai:'旧马岱',
			old_caoxiu:'旧曹休',
			old_huaxiong:'华雄',
			old_wangyi:'旧王异',
			old_caozhen:'旧曹真',
			old_quancong:'旧全琮',
			old_lingju:'旧灵雎',
			old_maliang:'旧马良',
			old_chenqun:'旧陈群',
			old_zhuhuan:'旧朱桓',
			old_zhuzhi:'旧朱治',
			old_machao:'☆SP马超',
			old_zhugezhan:"旧诸葛瞻",
			zhangliang:'SP张梁',
			yuji:'旧于吉',
			old_guanzhang:'旧关兴张苞',
			old_zhangfei:'OL张飞',
			old_huatuo:'OL华佗',
			jsp_caoren:'☆SP曹仁',
			ol_xinxianying:'OL辛宪英',
			ol_zhangrang:'OL张让',
			ol_yujin:'镇军于禁',
			ol_liaohua:'OL廖化',
			ol_zhuran:'OL朱然',
			ol_guansuo:'OL关索',
			ol_manchong:'OL满宠',
			ol_guohuai:'OL郭淮',
			ol_wuyi:'OL吴懿',
			ol_liuyu:'OL刘虞',
			old_fuhuanghou:'旧伏皇后',
			old_caochong:'旧曹冲',

			old_fuhun:'父魂',
			old_fuhun_info:'摸牌阶段开始时，你可以放弃摸牌，改为从牌堆顶亮出两张牌并获得之，若亮出的牌颜色不同，你获得技能“武圣”、“咆哮”，直到回合结束。',
			"old_guhuo":"蛊惑",
			"old_guhuo_info":"你可以说出任何一种基本牌或普通锦囊牌，并正面朝下使用或打出一张手牌。体力值不为0的其他角色依次选择是否质疑。若无角色质疑，则该牌按你所述之牌结算。若有角色质疑则亮出验明：若为真，质疑者各失去1点体力；若为假，质疑者各摸一张牌。无论真假，弃置被质疑的牌。仅当被质疑的牌为红桃花色且为真时，该牌仍然可以进行结算。",
			"old_guhuo_guess":"蛊惑",
			"old_guhuo_wuxie":"蛊惑",
			"old_jijun":"集军",
			"old_jijun_info":"出牌阶段，你可以将任意张手牌置于你的武将牌上。（均称为“方”）",
			"old_fangtong":"方统",
			"old_fangtong_info":"锁定技，结束阶段，若你的“方”的数目大于等于36，则你所在的游戏阵营直接取得游戏胜利。",
			old_zuilun:"罪论",
			old_zuilun_info:"出牌阶段，你可以获得一名其他角色的一张牌（手牌、装备区各一次），然后该角色摸一张牌。",
			old_fuyin:"父荫",
			old_fuyin_info:"锁定技，若你的装备区内没有防具牌，手牌数大于或等于你的其他角色不能使用【杀】、【决斗】或【火攻】指定你为目标",
			oldanxu:'安恤',
			oldanxu_info:'出牌阶段限一次，你可以选择手牌数不相等的两名其他角色，令其中手牌少的角色获得手牌多的角色的一张手牌并展示之，然后若此牌不为黑桃，你摸一张牌。',
			oldfaen:'法恩',
			oldfaen_info:'当一名角色翻面或横置后，你可以令其摸一张牌。',
			zhenshan:'振赡',
			zhenshan_use:'振赡',
			zhenshan_use_backup:'振赡',
			zhenshan_info:'每名角色的回合限一次，每当你需要使用或打出一张基本牌时，你可以与一名手牌数少于你的角色交换手牌。若如此做，视为你使用或打出了此牌',
			zhenshan_use_info:'每名角色的回合限一次，每当你需要使用或打出一张基本牌时，你可以与一名手牌数少于你的角色交换手牌。若如此做，视为你使用或打出了此牌',
			oldzhenlie:'贞烈',
			oldzhenlie_info:'在你的判定牌生效前，你可以亮出牌堆顶的一张牌代替之',
			oldmiji:'秘计',
			oldmiji_info:'准备/结束阶段开始时，若你已受伤，你可以判定，若判定结果为黑色，你观看牌堆顶的X张牌（X为你已损失的体力值），然后将这些牌交给一名角色',
			shiyong:'恃勇',
			shiyong_info:'锁定技，当你受到一次红色【杀】或【酒】【杀】造成的伤害后，须减1点体力上限',
			oldqianxi:'潜袭',
			oldqianxi_info:'当你使用【杀】对距离为1的目标角色造成伤害时，你可以进行一次判定，若判定结果不为红桃，你防止此伤害，令其减1点体力上限',
			oldxuanfeng:'旋风',
			oldxuanfeng_info:'每当你失去一次装备区里的牌时，你可以执行下列两项中的一项：1.视为对任意一名其他角色使用一张【杀】（此【杀】不计入每回合的使用限制）；2.对与你距离1以内的一名其他角色造成一点伤害',
			
			old_shenhua:'神话再临',
			old_refresh:'界限突破',
			old_yijiang1:'一将成名2011',
			old_yijiang2:'一将成名2012',
			old_yijiang3:'一将成名2013',
			old_yijiang4:'一将成名2014',
			old_yijiang5:'一将成名2015',
			old_yijiang67:'原创设计',
			old_sp:'SP',
		}
	};
});
