'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'jsrg',
		connect:true,
		characterSort:{
			jsrg:{
				jiangshanrugu_qi:['jsrg_liuhong','jsrg_hejin','jsrg_sunjian','jsrg_huangfusong','jsrg_xushao','jsrg_dongbai','jsrg_qiaoxuan','jsrg_yangbiao','jsrg_kongrong','jsrg_zhujun','jsrg_liubei','jsrg_wangyun','jsrg_liuyan','jsrg_caocao','jsrg_nanhualaoxian'],
				jiangshanrugu_cheng:['jsrg_sunce','jsrg_xuyou','jsrg_lvbu','jsrg_zhanghe','jsrg_zoushi','jsrg_guanyu','jsrg_chendeng','jsrg_zhenji','jsrg_zhangliao','jsrg_xugong','jsrg_chunyuqiong'],
			},
		},
		character:{
			//起
			jsrg_liuhong:['male','qun',4,['jsrgchaozheng','jsrgshenchong','jsrgjulian'],['zhu']],
			jsrg_hejin:['male','qun',4,['jsrgzhaobing','jsrgzhuhuan','jsrgyanhuo']],
			jsrg_sunjian:['male','qun',4,['jsrgpingtao','jsrgjuelie']],
			jsrg_huangfusong:['male','qun',4,['jsrgguanhuo','jsrgjuxia']],
			jsrg_xushao:['male','qun',3,['sbyingmen','sbpingjian']],
			jsrg_dongbai:['female','qun',3,['jsrgshichong','jsrglianzhu']],
			jsrg_qiaoxuan:['male','qun',3,['jsrgjuezhi','jsrgjizhao']],
			jsrg_yangbiao:['male','qun','3/4',['jsrgzhaohan','jsrgrangjie','jsrgyizheng']],
			jsrg_kongrong:['male','qun',3,['jsrglirang','jsrgzhengyi']],
			jsrg_zhujun:['male','qun',4,['jsrgfendi','jsrgjuxiang']],
			jsrg_liubei:['male','qun',4,['jsrgjishan','jsrgzhenqiao']],
			jsrg_wangyun:['male','qun',3,['jsrgshelun','jsrgfayi'],['clan:太原王氏']],
			jsrg_liuyan:['male','qun',3,['xinfu_limu','jsrgtushe','jsrgtongjue'],['zhu']],
			jsrg_caocao:['male','qun',4,['jsrgzhenglve','jsrghuilie']],
			jsrg_nanhualaoxian:['male','qun',3,['jsrgshoushu','jsrgxundao','jsrglinghua']],
			//承
			jsrg_sunce:['male','wu',4,['jsrgduxing','jsrgzhiheng','jsrgzhasi','jsrgbashi'],['zhu']],
			jsrg_xuyou:['male','wei',3,['jsrglipan','jsrgqingxi','jsrgjinmie'],['doublegroup:wei:qun']],
			jsrg_lvbu:['male','qun',5,['jsrgwuchang','jsrgqingjiao','jsrgchengxu'],['doublegroup:shu:qun']],
			jsrg_zhanghe:['male','wei',4,['jsrgqiongtu','jsrgxianzhu'],['doublegroup:wei:qun']],
			jsrg_zoushi:['female','qun',3,['jsrgguyin','jsrgzhangdeng']],
			jsrg_guanyu:['male','shu',5,['jsrgguanjue','jsrgnianen'],['border:wei']],
			jsrg_chendeng:['male','qun',3,['jsrglunshi','jsrgguitu']],
			jsrg_zhenji:['female','qun',3,['jsrgjixiang','jsrgchengxian']],
			jsrg_zhangliao:['male','qun',4,['jsrgzhengbing','jsrgtuwei'],['doublegroup:wei:qun']],
			jsrg_xugong:['male','wu',3,['jsrgbiaozhao','jsrgyechou']],
			jsrg_chunyuqiong:['male','qun',4,['jsrgcangchu','jsrgshishou']],
		},
		characterIntro:{
			qiaoxuan:'桥玄（110年－184年6月6日），一作乔玄，字公祖。梁国睢阳县（今河南省商丘市睢阳区）人。东汉时期名臣。桥玄年轻时曾任睢阳县功曹，因坚持追究陈国相羊昌的恶行而闻名。后被举为孝廉，历任洛阳左尉、齐相及上谷、汉阳太守、司徒长史、将作大匠。汉桓帝末年，出任度辽将军，击败鲜卑、南匈奴、高句丽侵扰，保境安民。汉灵帝初年，迁任河南尹、少府、大鸿胪。建宁三年（170年），迁司空。次年，拜司徒。光和元年（178年），升任太尉。桥玄有感于国势日衰，于是称病请辞，改任太中大夫。光和七年（184年），桥玄去世，年七十五。桥玄性格刚强，不阿权贵，待人谦俭，尽管屡历高官，但不因为自己处在高位而有所私请。他为官清廉，去世后连下葬的钱都没有，被时人称为名臣。',
			jsrg_caocao:'初平元年二月，董卓徙天子都长安，焚洛阳宫室，众诸侯畏卓兵强，莫敢进。操怒斥众人:“为人臣而临此境，当举义兵以诛暴乱，大众已合，诸君何疑？此一战而天下定矣！”遂引兵汴水，遇卓将徐荣，大破之。操迎天子，攻吕布，伐袁术，安汉室，拜为征西将军。是时，袁绍兼四州之地，将攻许都。操欲扫清寰宇，兴复汉室，遂屯兵官渡。既克绍，操曰：“若天命在吾，吾为周文王矣。”',
			jsrg_sunce:'建安五年，操、绍相拒于官渡，孙策欲阴袭许昌，迎汉帝，遂密治兵，部署诸将。未发，会为许贡门客所刺，将计就计，尽托江东于权，诈死以待天时。八月，操、绍决战，孙策亲冒矢石，斩将刈旗，得扬、豫之地。曹操败走冀、青，刘备远遁荆、益。而后历时七年，孙策三分天下已有其二，帝于洛阳，建霸王未竟之功业。权表求吴王，封为仲帝，共治天下。',
		},
		characterTitle:{
		},
		perfectPair:{},
		card:{
		},
		characterFilter:{
			jsrg_xushao:function(mode){
				return mode!='guozhan';
			},
		},
		skill:{
			//江山如故·承
			//404孙策
			jsrgduxing:{
				audio:2,
				enable:'phaseUse',
				viewAs:{
					name:'juedou',
					storage:{jsrgduxing:true},
					isCard:true,
				},
				viewAsFilter:function(player){
					if(player.hasSkill('jsrgduxing_used')) return false;
				},
				filterCard:()=>false,
				selectCard:-1,
				selectTarget:[1,Infinity],
				precontent:function(){
					player.logSkill('jsrgduxing');
					delete event.result.skill;
					var targets=event.result.targets;
					for(var target of targets){
						target.addTempSkill('jsrgduxing_allsha');
					}
					player.addTempSkill('jsrgduxing_restore');
					player.addTempSkill('jsrgduxing_used','phaseUseAfter');
				},
				ai:{
					order:5,
					result:{
						player:function(player,target){
							var eff=Math.sign(get.effect(target,{name:'juedou'},player,player));
							if(player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:{name:'juedou'},
							},true)||ui.selected.targets.concat(target).reduce((p,c)=>{
								return p+c.countCards('h');
							},0)<player.countCards('h','sha')){
								return 0;
							}
							return -114514;
						},
						target:-1.5,
					}
				},
				subSkill:{
					allsha:{
						charlotte:true,
						mod:{
							cardname:function(card,player,name){
								return 'sha';
							},
						}
					},
					used:{
						charlotte:true,
					},
					restore:{
						charlotte:true,
						trigger:{
							global:'useCardAfter',
						},
						forced:true,
						popup:false,
						forceDie:true,
						forceOut:true,
						filter:function(event,player){
							return event.card.name=='juedou'&&event.card.storage&&event.card.storage.jsrgduxing;
						},
						content:function(){
							game.countPlayer(current=>{
								current.removeSkill('jsrgduxing_allsha');
							},true);
						}
					},
				},
			},
			jsrgzhiheng:{
				audio:2,
				trigger:{
					source:'damageBegin1',
				},
				forced:true,
				filter:function(event,player){
					if(event.getParent().type!='card') return false;
					var respondEvts=[];
					respondEvts.addArray(event.player.getHistory('useCard')).addArray(event.player.getHistory('respond'));
					respondEvts=respondEvts.filter(i=>i.respondTo).map(evt=>evt.respondTo);
					return respondEvts.some(list=>{
						return list[0]==player;
					});
				},
				content:function(){
					trigger.num++;
				},
			},
			jsrgzhasi:{
				audio:2,
				trigger:{
					player:'damageBegin4',
				},
				limited:true,
				skillAnimation:true,
				animationColor:'wood',
				filter:function(event,player){
					return event.num>=player.getHp();
				},
				content:function(){
					player.awakenSkill('jsrgzhasi');
					trigger.cancel();
					player.removeSkill('jsrgzhiheng');
					game.log(player,'失去了技能','#g【猘横】');
					player.addSkillLog('rezhiheng');
					player.addSkill('jsrgzhasi_undist');
				},
				derivation:'rezhiheng',
				subSkill:{
					undist:{
						group:'undist',
						charlotte:true,
						trigger:{
							player:['useCardAfter','damageEnd'],
						},
						filter:function(event,player){
							if(event.name=='useCard') return event.targets.some(target=>{
								return target!=player;
							});
							return true;
						},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							player.removeSkill('jsrgzhasi_undist');
						},
						mark:true,
						intro:{
							content:'诈死中，不计入距离和座次的计算',
						},
					},
				},
			},
			jsrgbashi:{
				audio:2,
				trigger:{player:'chooseToRespondBefore'},
				zhuSkill:true,
				filter:function(event,player){
					if(event.responded) return false;
					if(player.storage.jsrgbashiing) return false;
					if(!player.hasZhuSkill('jsrgbashi')) return false;
					if(!event.filterCard({name:'sha'},player,event)&&!event.filterCard({name:'shan'},player,event)) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.group=='wu';
					});
				},
				check:function(event,player){
					if(get.damageEffect(player,event.player,player)>=0) return false;
					return true;
				},
				content:function(){
					'step 0'
					event.targets=game.filterPlayer();
					'step 1'
					var target=event.targets.shift();
					event.target=target;
					if(!target) event.finish();
					else if(!target.isIn()||target==player) event.redo();
					else if(target.group=='wu'){
						if((target==game.me&&!_status.auto)||(
							get.attitude(target,player)>2)||
							target.isOnline()){
							player.storage.jsrgbashiing=true;
							var list=['sha','shan'].filter(name=>trigger.filterCard({name:name},player,trigger));
							var names=list.map(i=>'【'+i+'】').join('或');
							var next=target.chooseToRespond('是否替'+get.translation(player)+'打出一张'+names+'？',{name:list});
							next.set('ai',function(){
								var event=_status.event;
								return (get.attitude(event.player,event.source)-2);
							});
							next.set('skillwarn','替'+get.translation(player)+'打出一张'+names);
							next.autochoose=function(){
								if(!lib.filter.autoRespondSha.apply(this,arguments)) return false;
								return lib.filter.autoRespondShan.apply(this,arguments);
							};
							next.set('source',player);
						}
					}
					'step 2'
					delete player.storage.jsrgbashiing;
					if(result.bool){
						event.finish();
						var name=result.card.name;
						trigger.result={bool:true,card:{name:name,isCard:true}};
						trigger.responded=true;
						trigger.animate=false;
						if(typeof target.ai.shown=='number'&&target.ai.shown<0.95){
							target.ai.shown+=0.3;
							if(target.ai.shown>0.95) target.ai.shown=0.95;
						}
					}
					else{
						event.goto(1);
					}
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag,arg){
						if(arg=='use') return false;
						if(player.storage.jsrgbashiing) return false;
						if(!player.hasZhuSkill('jsrgbashi')) return false;
						return game.hasPlayer(function(current){
							return current!=player&&current.group=='wu';
						});
					},
				},
			},
			//许攸
			jsrglipan:{
				audio:2,
				trigger:{
					player:'phaseEnd',
				},
				direct:true,
				content:function(){
					'step 0'
					var list=lib.group.slice();
					list.remove(player.group);
					var getV=function(group){
						var val=1;
						if(group=='wei'||group=='qun') val++;
						game.countPlayer(current=>{
							if(current.group!=group) return false;
							var att=get.attitude(player,current);
							if(att>0) val++;
							else if(att==0) val+=0.5;
							else val--;
						});
						return val;
					};
					var maxGroup=list.slice().sort((a,b)=>{
						return getV(b)-getV(a);
					})[0];
					list.push('cancel2');
					player.chooseControl(list).set('prompt',get.prompt('jsrglipan')).set('prompt2','变更为另一个势力').set('ai',()=>{
						return _status.event.choice;
					}).set('choice',maxGroup);
					'step 1'
					var group=result.control;
					if(group=='cancel2') return;
					player.logSkill('jsrglipan');
					player.popup(group+'2',get.groupnature(group,'raw'));
					player.changeGroup(group);
					var num=game.countPlayer(current=>{
						return current.group==group&&current!=player;
					});
					if(num>0) player.draw(num);
					var next=player.phaseUse();
					next.jsrglipan=true;
					event.next.remove(next);
					trigger.next.push(next);
					player.addTempSkill('jsrglipan_backfire');
				},
				subSkill:{
					backfire:{
						trigger:{
							player:'phaseUseEnd',
						},
						charlotte:true,
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.jsrglipan;
						},
						content:function(){
							'step 0'
							var targets=game.filterPlayer(current=>{
								return current.group==player.group;
							});
							targets.sortBySeat();
							event.targets=targets;
							'step 1'
							var target=targets.shift();
							event.target=target;
							if(target&&target.isIn()&&target.canUse({name:'juedou'},player)){
								target.chooseCardTarget({
									position:'hes',
									prompt:'是否将一张牌当【决斗】对'+get.translation(player)+'使用？',
									filterCard:function(card,player){
										return player.canUse(get.autoViewAs({name:'juedou'},[card]),_status.event.getParent().player);
									},
									filterTarget:function(card,player,target){
										var source=_status.event.getParent().player;
										if(target!=source&&!ui.selected.targets.contains(source)) return false;
										card=get.autoViewAs({name:'juedou'},[card]);
										return lib.filter.filterTarget.apply(this,arguments);
									},
									selectTarget:function(){
										var card=get.card(),player=get.player();
										if(!card) return;
										card=get.autoViewAs({name:'juedou'},[card]);
										var range=[1,1];
										game.checkMod(card,player,range,'selectTarget',player);
										return range;
									},
									ai1:function(card){
										var player=_status.event.player,target=_status.event.getParent().player;
										var eff=get.effect(target,get.autoViewAs({name:'juedou'},[card]),player,player);
										if(eff<=0) return 0;
										return (player.hp==1?10:6)-get.value(card);
									},
									ai2:function(target){
										if(target==_status.event.getParent().player) return 100;
										return get.effect(target,{name:'juedou'},_status.event.player);
									}
								});
							}
							'step 2'
							if(result.bool){
								var cards=result.cards;
								var cardx=get.autoViewAs({name:'juedou'},cards);
								var targets=result.targets.filter(targetx=>{
									return target.canUse(cardx,targetx);
								});
								if(targets.length) target.useCard(cardx,cards,targets);
							}
							if(targets.length) event.goto(1);
						}
					}
				},
			},
			jsrgqingxi:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					if(player.group!='qun') return false;
					return game.hasPlayer(current=>lib.skill.jsrgqingxi.filterTarget('',player,current));
				},
				groupSkill:true,
				filterTarget:function(card,player,target){
					if(target.countCards('h')>=player.countCards('h')) return false;
					return !player.getStorage('jsrgqingxi_used').contains(target);
				},
				content:function(){
					'step 0'
					player.addTempSkill('jsrgqingxi_used','phaseUseAfter');
					player.markAuto('jsrgqingxi_used',[target]);
					var num=player.countCards('h')-target.countCards('h');
					if(num>0) player.chooseToDiscard(num,true,'轻袭：弃置'+get.cnNumber(num)+'张手牌');
					'step 1'
					var card={
						name:'sha',
						nature:'stab',
						isCard:true,
					};
					if(player.canUse(card,target,false)) player.useCard(card,target,false);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							var num=target.countCards('h')-player.countCards('h');
							var cnt=player.countCards('h',card=>{
								return get.value(card)<5;
							});
							if(cnt<num) return 0;
							var eff=get.effect(target,{name:'sha',nature:'stab'},player,target);
							return Math.sign(eff)/Math.sqrt(num);
						}
					}
				},
				subSkill:{
					used:{
						onremove:true,
						charlotte:true,
					}
				},
			},
			jsrgjinmie:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(player.group!='wei') return false;
					return game.hasPlayer(current=>current.countCards('h')>player.countCards('h'));
				},
				groupSkill:true,
				filterTarget:function(card,player,target){
					return target.countCards('h')>player.countCards('h');
				},
				content:function(){
					'step 0'
					var card={
						name:'sha',
						nature:'fire',
						storage:{jsrgjinmie:target},
						isCard:true,
					};
					if(player.canUse(card,target,false)){
						player.useCard(card,target,false);
						player.addTempSkill('jsrgjinmie_effect');
					}
				},
				ai:{
					order:0.5,
					result:{
						target:function(player,target){
							var eff=get.effect(target,{name:'sha',nature:'fire'},player,target)/30;
							if(!target.mayHaveShan()) eff*=2;
							var del=target.countCards('h')-player.countCards('h')+1.5;
							eff*=Math.sqrt(del);
							return eff;
						}
					}
				},
				subSkill:{
					effect:{
						trigger:{
							source:'damageSource',
						},
						filter:function(event,player){
							return event.card&&event.card.storage&&event.card.storage.jsrgjinmie&&event.card.storage.jsrgjinmie.isIn();
						},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							'step 0'
							var target=trigger.card.storage.jsrgjinmie;
							var del=target.countCards('h')-player.countCards('h');
							if(del>0){
								player.line(target);
								player.discardPlayerCard(target,'h',true,del);
							}
							// else if(del<0){
							// 	player.line(target);
							// 	target.draw(-del);
							// }
						}
					}
				},
			},
			//吕布
			jsrgwuchang:{
				audio:2,
				trigger:{
					player:'gainAfter',
					global:'loseAsyncAfter',
				},
				forced:true,
				filter:function(event,player){
					var cards=event.getg(player);
					if(!cards.length) return false;
					return game.hasPlayer(current=>{
						if(current==player) return false;
						return event.getl(current).cards2.length;
					});
				},
				group:'jsrgwuchang_add',
				content:function(){
					'step 0'
					var targets=game.filterPlayer(current=>{
						if(current==player) return false;
						return trigger.getl(current).cards2.length;
					});
					var target=targets[0];
					player.changeGroup(target.group);
					player.popup(target.group+'2',get.groupnature(target.group,'raw'));
				},
				subSkill:{
					add:{
						trigger:{
							source:'damageBegin1',
						},
						filter:function(event,player){
							if(!event.card||!['sha','juedou'].contains(event.card.name)||event.getParent().type!='card') return false;
							return event.player.group==player.group;
						},
						forced:true,
						content:function(){
							'step 0'
							trigger.num++;
							var group='qun';
							player.changeGroup(group);
							player.popup(group+'2',get.groupnature(group,'raw'));
						},
					}
				},
			},
			jsrgqingjiao:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					if(player.group!='qun') return false;
					if(!player.countCards('hes')) return false;
					return !player.hasSkill('jsrgqingjiao_tuixinzhifu')&&game.hasPlayer(current=>{
						return current.countCards('h')>player.countCards('h');
					})||!player.hasSkill('jsrgqingjiao_chenghuodajie')&&game.hasPlayer(current=>{
						return current.countCards('h')<player.countCards('h');
					});
				},
				groupSkill:true,
				position:'hes',
				filterCard:true,
				selectCard:1,
				discard:false,
				lose:false,
				delay:false,
				filterTarget:function(card,player,target){
					var mod=game.checkMod(ui.selected.cards[0],player,'unchanged','cardEnabled2',player);
					if(!mod) return false;
					var del=target.countCards('h')-player.countCards('h');
					if(del==0) return false;
					var name=del>0?'tuixinzhifu':'chenghuodajie';
					if(player.hasSkill('jsrgqingjiao_'+name)) return false;
					return player.canUse({name:name,cards:ui.selected.cards},target);
				},
				content:function(){
					var del=target.countCards('h')-player.countCards('h');
					var name=del>0?'tuixinzhifu':'chenghuodajie';
					player.useCard({name:name},target,cards);
					player.addTempSkill('jsrgqingjiao_'+name,'phaseUseAfter');
				},
				ai:{
					order:7,
					result:{
						player:function(player,target){
							var name=(target.countCards('h')>player.countCards('h')?'tuixinzhifu':'chenghuodajie');
							var list=[];
							if(ui.selected.cards.length) list.addArray(ui.selected.cards);
							var card=get.autoViewAs({name:name},list);
							return get.effect(target,card,player,player);
						},
					},
				},
				subSkill:{
					tuixinzhifu:{
						charlotte:true,
					},
					chenghuodajie:{
						charlotte:true,
					},
				}
			},
			jsrgchengxu:{
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					if(player.group!='shu') return false;
					return game.hasPlayer(current=>{
						return current!=player&&current.group==player.group;
					});
				},
				groupSkill:true,
				content:function(){
					trigger.directHit.addArray(game.filterPlayer(current=>{
						return current!=player&&current.group==player.group;
					}));
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return player.group=='shu'&&player.group==arg.target.group;
					},
				},
			},
			//张郃
			jsrgqiongtu:{
				audio:2,
				enable:'chooseToUse',
				groupSkill:true,
				viewAs:{
					name:'wuxie',
					suit:'none',
					number:null,
					isCard:true,
				},
				filter:function(event,player){
					return player.group=='qun'&&!player.hasSkill('jsrgqiongtu_check');
				},
				viewAsFilter:function(player){
					return player.group=='qun'&&!player.hasSkill('jsrgqiongtu_check');
				},
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				position:'he',
				popname:true,
				ignoreMod:true,
				precontent:function(){
					'step 0'
					player.logSkill('jsrgqiongtu');
					delete event.result.skill;
					var card=event.result.cards[0];
					event.card=card;
					event.result.card={
						name:event.result.card.name,
						storage:{jsrgqiongtu:true},
						isCard:true,
					};
					event.result.cards=[];
					player.addToExpansion(card,player,'give').gaintag.add('jsrgqiongtu');
					player.addTempSkill('jsrgqiongtu_check');
				},
				marktext:'途',
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					delete player.storage[skill];
				},
				subSkill:{
					check:{
						trigger:{
							global:'useCardAfter',
						},
						filter:function(event,player){
							return event.card.name=='wuxie'&&event.card.storage&&event.card.storage.jsrgqiongtu;
						},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							'step 0'
							game.delayx();
							var evt=trigger.getParent(4);
							if(evt.name=='phaseJudge'){
								state=evt.cancelled;
							}
							else{
								state=evt._neutralized;
							}
							if(state){
								player.draw();
							}
							else{
								player.changeGroup('wei');
								var cards=player.getExpansions('jsrgqiongtu');
								if(cards.length) player.gain(cards,'gain2');
							}
						}
					},
				},
			},
			jsrgxianzhu:{
				audio:2,
				enable:'chooseToUse',
				filter:function(event,player){
					return player.group=='wei'&&player.hasCard(card=>{
						return _status.connectMode||get.type(card)=='trick';
					},'hs');
				},
				groupSkill:true,
				locked:false,
				viewAs:{
					name:'sha',
					storage:{jsrgxianzhu:true},
				},
				position:'hs',
				filterCard:function(card){
					return get.type(card)=='trick';
				},
				check:function(card){
					var player=_status.event.player;
					var cardx={
						name:'sha',
						storage:{jsrgxianzhu:true},
						cards:[card],
					}
					if(game.hasPlayer(current=>{
						return player.canUse(cardx,current)&&get.effect(current,card,player,player)>0&&get.effect(current,cardx,player,player)>0;
					})) return 15-get.value(card);
					return 0;
				},
				onuse:function(links,player){
					player.addTempSkill('jsrgxianzhu_after');
				},
				mod:{
					cardUsable:function(card){
						if(card.storage&&card.storage.jsrgxianzhu) return Infinity;
					},
				},
				subSkill:{
					after:{
						trigger:{
							global:'damageSource',
						},
						filter:function(event,player){
							var targets=event.getParent(2).targets;
							if(!targets||targets.length!=1) return false;
							if(!event.card||!event.card.storage||!event.card.storage.jsrgxianzhu) return false;
							var target=event.player,card=event.cards[0];
							if(!target.isIn()) return false;
							if(get.type(card)!='trick') return false;
							if(!player.canUse(card,target,false)) return false;
							return true;
						},
						forced:true,
						charlotte:true,
						group:'jsrgxianzhu_inf',
						content:function(){
							var card={
								name:trigger.cards[0].name,
								isCard:true,
							}
							player.useCard(card,trigger.player,false);
							game.delayx();
						},
					},
					inf:{
						trigger:{player:'useCard1'},
						forced:true,
						popup:false,
						firstDo:true,
						filter:function(event,player){
							if(event.card.storage&&event.card.storage.jsrgxianzhu&&event.addCount!==false) return true;
							return false;
						},
						content:function(){
							trigger.addCount=false;
							var stat=player.getStat().card,name=trigger.card.name;
							if(typeof stat[name]=='number') stat[name]--;
						},
					},
				},
			},
			//邹氏
			jsrgguyin:{
				audio:2,
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				check:function(event,player){
					return player.isTurnedOver()||game.countPlayer2(current=>current.hasSex('male'))>=2;
				},
				content:function(){
					'step 0'
					player.turnOver();
					'step 1'
					var targets=game.filterPlayer(current=>current!=player&&current.hasSex('male'));
					event.targets=targets;
					player.line(targets);
					game.delayx();
					'step 2'
					var target=targets.shift();
					event.target=target;
					target.chooseBool('是否响应'+get.translation(player)+'的【孤吟】？','你可以翻面。').set('ai',()=>{
						return _status.event.bool;
					}).set('bool',function(){
						return target.isTurnedOver()||get.attitude(target,player)>0&&(game.countPlayer2(current=>current.hasSex('male'))>=3||target.getHp()<=1&&player.hasSkill('jsrgzhangdeng'));
					}());
					'step 3'
					if(result.bool){
						target.turnOver();
					}
					if(targets.length) event.goto(2);
					'step 4'
					var targets=game.filterPlayer(current=>{
						return current==player||current.isTurnedOver();
					});
					event.targets=targets;
					event.num=0;
					event.index=0;
					'step 5'
					var target=targets[event.index];
					if(target.isIn()){
						target.draw();
						event.num++;
					}
					event.index++;
					if(event.index>=targets.length) event.index=0;
					'step 6'
					if(event.num>=game.countPlayer2(current=>current.hasSex('male'))) event.finish();
					else event.goto(5);
				},
			},
			jsrgzhangdeng:{
				audio:2,
				trigger:{
					global:'logSkill',
				},
				filter:function(event,player){
					return event.player.getHistory('useSkill',evt=>{
						return evt.skill=='jsrgzhangdeng_jiu';
					}).map(evt=>evt.event).indexOf(event.log_event)==1;
				},
				global:'jsrgzhangdeng_jiu',
				forced:true,
				locked:false,
				content:function(){
					player.turnOver(false);
				},
				subSkill:{
					jiu:{
						audio:'jsrgzhangdeng',
						enable:'chooseToUse',
						filter:function(event,player){
							return player.isTurnedOver()&&game.hasPlayer(current=>{
								return current.hasSkill('jsrgzhangdeng')&&current.isTurnedOver();
							});
						},
						viewAs:{name:'jiu',isCard:true},
						viewAsFilter:function(player){
							return player.isTurnedOver()&&game.hasPlayer(current=>{
								return current.hasSkill('jsrgzhangdeng')&&current.isTurnedOver();
							});
						},
						filterCard:()=>false,
						selectCard:-1,
						precontent:function(){
							player.logSkill('jsrgzhangdeng_jiu');
							var targets=game.filterPlayer(current=>{
								return current.hasSkill('jsrgzhangdeng')&&current.isTurnedOver();
							});
							player.line(targets[0]);
							delete event.result.skill;
						},
					},
				},
			},
			//关羽
			jsrgguanjue:{
				audio:2,
				trigger:{
					player:['useCard','respond'],
				},
				filter:function(event,player){
					return lib.suit.contains(get.suit(event.card));
				},
				forced:true,
				content:function(){
					'step 0'
					var targets=game.filterPlayer(current=>current!=player);
					var suit=get.suit(trigger.card);
					for(var target of targets){
						target.addTempSkill('jsrgguanjue_ban');
						target.markAuto('jsrgguanjue_ban',[suit]);
					}
				},
				subSkill:{
					ban:{
						onremove:true,
						charlotte:true,
						mod:{
							cardEnabled:function(card,player){
								if(player.getStorage('jsrgguanjue_ban').contains(get.suit(card))) return false;
							},
							cardRespondable:function(card,player){
								if(player.getStorage('jsrgguanjue_ban').contains(get.suit(card))) return false;
							},
							cardSavable:function(card,player){
								if(player.getStorage('jsrgguanjue_ban').contains(get.suit(card))) return false;
							},
						},
						mark:true,
						marktext:'绝',
						intro:{
							content:'本回合内不能使用或打出$的牌',
						},
					},
				},
			},
			jsrgnianen:{
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				filter:function(event,player){
					if(!player.countCards('hes')) return false;
					if(player.hasSkill('jsrgnianen_blocker')) return false;
					for(var name of lib.inpile){
						if(get.type2(name)!='basic') continue;
						var card={name:name};
						if(event.filterCard(card,player,event)) return true;
						if(name=='sha'){
							for(var nature of lib.inpile_nature){
								card.nature=nature;
								if(event.filterCard(card,player,event)) return true;
							}
						}
					}
					return false;
				},
				derivation:'mashu',
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						for(var name of lib.inpile){
							if(name=='sha'){
								if(event.filterCard({name:name},player,event)) list.push(['基本','','sha']);
								for(var nature of lib.inpile_nature){
									if(event.filterCard({name:name,nature:nature},player,event)) list.push(['基本','','sha',nature]);
								}
							}
							else if(get.type(name)=='basic'&&event.filterCard({name:name},player,event)) list.push(['基本','',name]);
						}
						var dialog=ui.create.dialog('念恩',[list,'vcard']);
						dialog.direct=true;
						return dialog;
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2],nature:button.link[3]},player,_status.event.getParent());
					},
					check:function(button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
						return player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						});
					},
					backup:function(links,player){
						return {
							audio:'jsrgnianen',
							filterCard:true,
							popname:true,
							check:function(card){
								return 8-get.value(card);
							},
							position:'hes',
							viewAs:{name:links[0][2],nature:links[0][3]},
							precontent:function(){
								player.logSkill('jsrgnianen');
								delete event.result.skill;
								var card=event.result.card;
								if(get.color(card,player)!='red'||get.name(card)!='sha'||get.natureList(card).length){
									player.addTempSkill('jsrgnianen_blocker');
									player.addAdditionalSkill('jsrgnianen_blocker','mashu');
								}
							},
						}
					},
					prompt:function(links,player){
						return '将一张牌当做'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用';
					}
				},
				hiddenCard:function(player,name){
					if(!lib.inpile.contains(name)) return false;
					var type=get.type2(name);
					return type=='basic'&&player.countCards('hes')>0&&!player.hasSkill('jsrgnianen_blocker');
				},
				ai:{
					fireAttack:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countCards('hes')||player.hasSkill('jsrgnianen_blocker')) return false;
					},
					order:1,
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						},
					},
				},
				subSkill:{
					blocker:{
						charlotte:true,
						mark:true,
						marktext:'恩',
						intro:{content:'视为拥有〖马术〗'},
					},
				},
			},
			//生鱼片
			jsrglunshi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return game.hasPlayer(current=>{
						return current.inRangeOf(target);
					});
				},
				content:function(){
					'step 0'
					var num=game.countPlayer(current=>{
						return current.inRangeOf(target);
					});
					var len=target.countCards('h');
					num=Math.max(0,Math.min(len+num,5)-len);
					if(num>0) target.draw(num);
					'step 1'
					var num=game.countPlayer(current=>{
						return current.inRange(target);
					});
					if(num>0) target.chooseToDiscard(num,'he',true,get.translation(player)+'对你发动了【论势】','请弃置'+get.cnNumber(num)+'张牌');
				},
				ai:{
					order:6,
					result:{
						target:function(player,target){
							var num1=game.countPlayer(current=>{
								return current.inRangeOf(target);
							}),num2=game.countPlayer(current=>{
								return current.inRange(target);
							});
							var len=target.countCards('h');
							num1=Math.max(0,Math.min(len+num1,5)-len);
							return (num1-num2+1)/2;
						}
					}
				},
			},
			jsrgguitu:{
				audio:2,
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				direct:true,
				filter:function(event,player){
					return game.countPlayer(current=>{
						return current.getEquips(1).length;
					})>=2;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('jsrgguitu'),(card,player,target)=>{
						return target.getEquips(1).length;
					},[1,2]).set('filterOk',()=>{
						var num=0;
						for(var target of ui.selected.targets){
							num+=target.getEquips(1).length;
						}
						return num>=2;
					}).set('ai',target=>{
						var sign=-1;
						var val=0;
						if(ui.selected.targets.length){
							sign=1;
							var targetx=ui.selected.targets[0];
							var cards=targetx.getEquips(1);
							var list=cards.map(card=>{
								return [card,get.value(card,targetx)];
							});
							list.sort((a,b)=>{
								return b[1]-a[1];
							});
							val=get.attitude(_status.event.player,targetx)*list[0][1];
						}
						var cards=target.getEquips(1);
						var list=cards.map(card=>{
							return [card,get.value(card,target)];
						});
						list.sort((a,b)=>{
							return b[1]-a[1];
						});
						return get.attitude(_status.event.player,target)*list[0][1]*sign-val;
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.slice();
						targets.sortBySeat();
						event.targets=targets;
						player.logSkill('jsrgguitu',targets);
						event.rangeList=targets.map(target=>{
							return target.getAttackRange();
						});
						var weapons=[];
						for(var target of targets){
							weapons.addArray(target.getEquips(1));
						}
						if(weapons.length>2){
							var list=['诡图：选择要交换的武器牌'];
							for(var target of targets){
								list.addArray([
									'<div class="text center">'+get.translation(target)+'的武器牌</div>',
									target.getEquips(1)
								])
							}
							player.chooseButton(list,true,2).set('filterButton',button=>{
								var count=_status.event.count;
								if(count==1) return true;
								for(var i=0;i<ui.selected.buttons.length;i++){
									if(get.owner(button.link)==get.owner(ui.selected.buttons[i].link)) return false;
								};
								return true;
							}).set('count',targets.length).set('ai',button=>{
								var player=_status.event.player;
								var card=button.link;
								var owner=get.owner(card);
								var att=get.attitude(player,owner);
								var val=-get.value(card)*att;
								return val;
							});
						}
						else event._result={bool:true,links:weapons};
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var links=result.links;
						var list=[];
						for(var target of targets){
							var weapons=target.getEquips(1);
							weapons=weapons.filter(i=>links.contains(i));
							if(weapons.length){
								list.push([target,weapons]);
							}
						}
						if(list.length==2){
							event.players=list.map(i=>i[0]);
							event.cards=list.map(i=>i[1]);
						}
						else{
							event.players=[list[0][0],list[0][0]];
							event.cards=list[0][1];
						}
						game.loseAsync({
							player:event.players[0],
							target:event.players[1],
							cards1:event.cards[0],
							cards2:event.cards[1],
						}).setContent('swapHandcardsx');
					}
					else event.finish();
					'step 3'
					for(var i=0;i<event.cards[1].length;i++){
						if(get.position(event.cards[1][i],true)=='o') event.players[0].equip(event.cards[1][i]);
					}
					for(var i=0;i<event.cards[0].length;i++){
						if(get.position(event.cards[0][i],true)=='o') event.players[1].equip(event.cards[0][i]);
					}
					'step 4'
					var rangeList=targets.map(target=>{
						return target.getAttackRange();
					});
					for(var i=0;i<targets.length;i++){
						if(rangeList[i]<event.rangeList[i]){
							targets[i].recover();
						}
					}
				},
			},
			//甄宓
			jsrgjixiang:{
				audio:2,
				trigger:{
					global:['chooseToUseBegin','chooseToRespondBegin'],
				},
				filter:function(event,player){
					if(player!=_status.currentPhase) return false;
					if(player==event.player) return false;
					if(!player.countCards('he')) return false;
					for(var name of lib.inpile){
						if(get.type(name)!='basic') continue;
						if(player.getStorage('jsrgjixiang_used').contains(name)) continue;
						var card={name:name};
						if(event.filterCard(card,event.player,event)) return true;
						if(name=='sha'){
							for(var nature of lib.inpile_nature){
								card.nature=nature;
								if(event.filterCard(card,event.player,event)) return true;
							}
						}
					}
					return false;
				},
				direct:true,
				global:'jsrgjixiang_save',
				content:function(){
					'step 0'
					var list=[];
					for(var name of lib.inpile){
						if(get.type(name)!='basic') continue;
						var card={name:name};
						if(trigger.filterCard(card,trigger.player,trigger)) list.push(name);
					}
					var listx=[];
					for(var name of list){
						if(player.getStorage('jsrgjixiang_used').contains(name)) continue;
						listx.push([get.type2(name),'',name]);
						if(name=='sha'){
							for(var nature of lib.inpile_nature){
								if(trigger.filterCard({name:name,nature:nature},player,trigger)){
									listx.push([get.type2(name),'',name,nature]);
								}
							}
						}
					}
					var evt=trigger.getParent();
					var names='';
					for(var i=0;i<list.length;i++){
						names+='【'+get.translation(list[i])+'】';
						names+=i<list.length-2?'、':'或';
					}
					names=names.slice(0,names.length-1);
					var reason=(trigger.name=='chooseToUse'?'使用':'打出');
					var used=player.getStorage('jsrgjixiang_used').filter(name=>list.contains(name));
					var str=get.translation(trigger.player)+(evt.card?'因'+get.translation(evt.card):'')+'需要'+reason+'一张'+names+'，是否弃置一张牌视为其'+reason+'之'+
						(used.length?('（你不能以此法令其'+reason+get.translation(used)+'）'):'')+'？若如此做，你摸一张牌并令〖称贤〗此阶段可发动次数上限+1。';
					event.str=str;
					if(!listx.length) event.finish();
					else if(listx.length==1) event._result={bool:true,links:listx};
					else{
						event.asked=true;
						player.chooseButton([
							'###'+get.prompt('jsrgjixiang',trigger.player)+'###<div class="text center">'+str+'</div>',
							[listx,'vcard'],
						]).set('ai',()=>Math.random()+1);
					}
					event.list=list;
					'step 1'
					if(result.bool){
						var name=result.links[0][2],nature=result.links[0][3];
						var card={name:name,nature:nature,isCard:true};
						event.card=card;
						var evt=trigger.getParent();
						var reason=(trigger.name=='chooseToUse'?'使用':'打出');
						var prompt=event.asked?
							'济乡：是否弃置一张牌'+(trigger.filterTarget?'并选择目标角色':'')+'？':
							get.prompt('jsrgjixiang',trigger.player);
						var str=event.asked?'若如此做，视为'+get.translation(trigger.player)+reason+get.translation(card)+'，然后你摸一张牌并令〖称贤〗此阶段可发动次数上限+1。':event.str;
						var next=player.chooseCardTarget({
							prompt:prompt,
							prompt2:str,
							filterCard:lib.filter.cardDiscardable,
							position:'he',
							goon:get.attitude(player,trigger.player)>1&&(evt.card?get.effect(trigger.player,evt.card,evt.player,player)<0:get.effect(trigger.player,{name:event.list[0]},trigger.player,player)>0),
							ai1:function(card){
								if(_status.event.goon) return 6-get.value(card);
								return 0;	
							},
							_get_card:card,
						});
						var keys=['filterTarget','selectTarget','ai2'];
						for(var key of keys) delete next[key];
						for(var i in trigger){
							if(!next.hasOwnProperty(i)) next[i]=trigger[i];
						}
						next.filterTargetx=trigger.filterTarget||(()=>false);
						next.filterTarget=function(card,player,target){
							var filter=this.filterTargetx;
							if(typeof filter!='function') filter=(()=>filter);
							card=_status.event._get_card;
							player=_status.event.getTrigger().player;
							return this.filterTargetx.apply(this,arguments);
						};
						if(typeof next.selectTarget!='number'&&typeof next.selectTarget!='function'&&get.itemtype(next.selectTarget)!='select') next.selectTarget=-1;
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var cardx=result.cards[0];
						var targets=result.targets||[];
						event.targets=targets;
						player.logSkill('jsrgjixiang',trigger.player);
						player.addTempSkill('jsrgjixiang_used');
						player.markAuto('jsrgjixiang_used',[card.name]);
						player.discard(cardx);
						trigger.untrigger();
						trigger.set('responded',true);
						var result={
							bool:true,
							card:card
						};
						if(targets.length) result.targets=targets;
						trigger.result=result;
						player.draw();
						var phaseName;
						for(var name of lib.phaseName){
							var evt=trigger.getParent(name);
							if(!evt||evt.name!=name) continue;
							phaseName=name;
							break;
						}
						if(phaseName){
							player.addTempSkill('jsrgjixiang_add',phaseName+'After');
							player.addMark('jsrgjixiang_add',1,false);
						}
					}
				},
				subSkill:{
					used:{
						charlotte:true,
						onremove:true,
						mark:true,
						marktext:'乡',
						intro:{
							content:'已触发过牌名：$',
						},
					},
					add:{
						charlotte:true,
						onremove:true,
						mark:true,
						intro:{
							markcount:(storage,player)=>2+(storage||0),
							content:(storage,player)=>'〖称贤〗剩余可发动次数为'+(2+(storage||0)),
						},
					},
					save:{
						charlotte:true,
						ai:{
							save:true,
							skillTagFilter:function(player,arg,target){
								return _status.currentPhase&&_status.currentPhase!=player&&_status.currentPhase.hasSkill('jsrgjixiang')&&_status.currentPhase.countCards('he');
							},
						},
					},
				},
			},
			jsrgchengxian:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					if(!player.countCards('hs')) return false;
					if(2+player.countMark('jsrgjixiang_add')<=0) return false;
					for(var name of lib.inpile){
						if(get.type(name)!='trick') continue;
						if(player.getStorage('jsrgchengxian_used').contains(name)) continue;
						if(event.filterCard({name:name},player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						for(var name of lib.inpile){
							if(player.getStorage('jsrgchengxian_used').contains(name)) continue;
							var info=get.info({name:name});
							if(!info||info.type!='trick') continue;
							if(info.notarget) continue;
							if(!info.selectTarget) continue;
							if(get.type(name)=='trick'&&event.filterCard({name:name},player,event)) list.push(['锦囊','',name]);
						}
						var dialog=ui.create.dialog('称贤',[list,'vcard']);
						return dialog;
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2],nature:button.link[3]},player,_status.event.getParent());
					},
					check:function(button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
						return player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						});
					},
					backup:function(links,player){
						return {
							audio:'jsrgchengxian',
							filterCard:function(card,player){
								var num=game.countPlayer(current=>{
									return player.canUse(card,current);
								});
								if(!num) return false;
								var cardx=get.copy(lib.skill.jsrgchengxian_backup.viewAs);
								cardx.cards=[card];
								var num2=game.countPlayer(current=>{
									return player.canUse(cardx,current);
								});
								return num==num2;
							},
							popname:true,
							check:function(card){
								return 8-get.value(card);
							},
							position:'hs',
							viewAs:{name:links[0][2]},
							precontent:function(){
								player.logSkill('jsrgchengxian');
								player.addTempSkill('jsrgjixiang_add');
								if(typeof player.storage.jsrgjixiang_add!='number') player.storage.jsrgjixiang_add=0;
								player.storage.jsrgjixiang_add--;
								player.addTempSkill('jsrgchengxian_used');
								player.markAuto('jsrgchengxian_used',[event.result.card.name]);
								delete event.result.skill;
							},
						}
					},
					prompt:function(links,player){
						return '将一张合法目标数与'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'相同的手牌当此牌使用';
					}
				},
				//理解错了，下面这个不用了
				getNumber:function(card,player){
					var rangex=null;
					var info=get.info(card);
					if(!info) return null;
					if(info.notarget) return null;
					if(info.selectTarget!=undefined){
						var select=get.select(info.selectTarget);
						if(select[0]<0){
							if(!info.toself){
								var count=game.countPlayer(current=>{
									return lib.filter.targetEnabled(card,player,current);
								});
							}
							else count=1;
							rangex=[count,count];
						}
						else rangex=select;
					}
					return rangex;
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						},
					},
				},
				subSkill:{
					used:{
						charlotte:true,
						onremove:true,
						mark:true,
						intro:{
							content:'已使用过$',
						},
					},
				},
			},
			//张辽
			jsrgzhengbing:{
				audio:2,
				enable:'phaseUse',
				usable:3,
				filter:function(event,player){
					return player.group=='qun';
				},
				filterCard:lib.filter.cardRecastable,
				check:function(card){
					var player=_status.event.player,val=5+['shan','tao'].contains(get.name(card))*1.5;
					if(player.needsToDiscard()>2&&get.name(card)=='sha'&&player.countCards('hs','sha')>1) val+=0.5;
					return val-get.value(card);
				},
				position:'he',
				groupSkill:true,
				lose:false,
				discard:false,
				delay:false,
				content:function(){
					'step 0'
					player.recast(cards);
					switch(get.name(cards[0])){
						case 'sha':
							player.addTempSkill('jsrgzhengbing_sha');
							player.addMark('jsrgzhengbing_sha',2,false);
							break;
						case 'shan':
							player.draw();
							break;
						case 'tao':
							player.changeGroup('wei');
					}
				},
				ai:{
					order:7,
					result:{player:1},
				},
				subSkill:{
					sha:{
						charlotte:true,
						onremove:true,
						mod:{
							maxHandcard:function(player,num){
								return num+player.countMark('jsrgzhengbing_sha');
							},
						},
						intro:{
							content:'手牌上限+#',
						},
					}
				},
			},
			jsrgtuwei:{
				audio:2,
				trigger:{
					player:'phaseUseBegin',
				},
				filter:function(event,player){
					return player.group=='wei'&&game.hasPlayer(current=>{
						return player.inRange(current)&&current.countGainableCards(player,'he')>0;
					});
				},
				groupSkill:true,
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('jsrgtuwei'),'获得攻击范围内任意名角色的各一张牌。然后回合结束时这些角色中未受过伤害的角色依次获得你的一张牌。',(card,player,target)=>{
						return player.inRange(target)&&target.countGainableCards(player,'he')>0;
					},[1,Infinity]).set('ai',target=>{
						var player=_status.event.player;
						return get.effect(target,{name:'shunshou_copy2'},player,player);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.slice();
						targets.sortBySeat();
						player.logSkill('jsrgtuwei',targets);
						player.gainMultiple(result.targets,'he');
						player.addTempSkill('jsrgtuwei_backfire');
						player.markAuto('jsrgtuwei_backfire',targets);
					}
				},
				subSkill:{
					backfire:{
						audio:'jsrgtuwei',
						trigger:{
							player:'phaseEnd',
						},
						charlotte:true,
						onremove:true,
						forced:true,
						filter:function(event,player){
							return player.getStorage('jsrgtuwei_backfire').some(target=>{
								return !target.getHistory('damage').length&&target.isIn();
							});
						},
						content:function(){
							'step 0'
							var targets=player.getStorage('jsrgtuwei_backfire').filter(target=>{
								return !target.getHistory('damage').length&&target.isIn();
							});
							event.targets=targets.sortBySeat();
							'step 1'
							var target=targets.shift();
							if(target.isIn()&&player.countGainableCards(target,'he')){
								target.line(player);
								target.gainPlayerCard(player,true,'he');
							}
							if(player.countCards('he')&&targets.length) event.redo();
						},
						ai:{
							effect:{
								player:function(card,player,target){
									if(player!=target&&get.tag(card,'damage')&&target&&player.getStorage('jsrgtuwei_backfire').contains(target)&&!target.getHistory('damage').length) return [1,1,1,0];
								},
							},
						},
					},
				},
			},
			//许贡
			jsrgbiaozhao:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return game.countPlayer(current=>current!=player)>=2;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('jsrgbiaozhao'),lib.filter.notMe,2).set('ai',target=>{
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(!ui.selected.targets.length) return att*(Math.sqrt(target.countCards('hs'))+0.1);
						return -att/Math.sqrt(target.countCards('hs')+0.1);
					}).set('targetprompt',['用牌无限制','打你变疼']);
					'step 1'
					if(result.bool){
						var targets=result.targets;
						player.logSkill('jsrgbiaozhao',targets);
						player.addTempSkill('jsrgbiaozhao_syujin',{player:['phaseBegin','die']});
						if(!player.storage.jsrgbiaozhao_syujin) player.storage.jsrgbiaozhao_syujin=[];
						player.storage.jsrgbiaozhao_syujin.push(targets);
						targets[0].addSkill('jsrgbiaozhao_A');
						targets[0].markAuto('jsrgbiaozhao_A',[targets[1]]);
						targets[1].addSkill('jsrgbiaozhao_B');
						targets[1].addMark('jsrgbiaozhao_B'+player.playerid,1,false);
						targets[1].markAuto('jsrgbiaozhao_B',[player]);
					}
				},
				subSkill:{
					syujin:{
						charlotte:true,
						onremove:function(player,skill){
							var list=player.storage.jsrgbiaozhao_syujin;
							for(var targets of list){
								targets[0].unmarkAuto('jsrgbiaozhao_A',[targets[1]]);
								targets[1].unmarkAuto('jsrgbiaozhao_B',[player]);
								delete targets[1].storage['jsrgbiaozhao_B'+player.playerid];
								if(!targets[0].getStorage('jsrgbiaozhao_A')) targets[0].removeSkill('jsrgbiaozhao_A');
								if(!targets[1].getStorage('jsrgbiaozhao_B')) targets[1].removeSkill('jsrgbiaozhao_B');
							}
							delete player.storage.jsrgbiaozhao_syujin;
						},
					},
					A:{
						charlotte:true,
						onremove:true,
						mark:true,
						marktext:'表',
						intro:{
							content:'对$使用牌无次数和距离限制',
						},
						mod:{
							targetInRange:function(card,player,target){
								if(player.getStorage('jsrgbiaozhao_A').contains(target)) return true;
							},
							cardUsableTarget:function(card,player,target){
								if(player.getStorage('jsrgbiaozhao_A').contains(target)) return true;
							},
						},
					},
					B:{
						trigger:{
							source:'damageBegin1',
						},
						charlotte:true,
						forced:true,
						onremove:function(player,skill){
							for(var i in player.storage){
								if(i.indexOf('jsrgbiaozhao_B')==0) delete player.storage[i];
							}
						},
						filter:function(event,player){
							return event.card&&player.getStorage('jsrgbiaozhao_B').contains(event.player);
						},
						content:function(){
							trigger.num+=player.countMark('jsrgbiaozhao_B'+trigger.player.playerid)||1;
						},
						mark:true,
						marktext:'召',
						intro:{
							content:function(storage,player){
								var str='';
								for(var target of storage){
									str+='对'+get.translation(target)+'使用牌造成的伤害+'+player.countMark('jsrgbiaozhao_B'+target.playerid);
								}
								return str;
							}
						},
					},
				}
			},
			jsrgyechou:{
				audio:2,
				trigger:{player:'die'},
				forceDie:true,
				direct:true,
				skillAnimation:true,
				animationColor:'wood',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('jsrgyechou'),lib.filter.notMe).set('ai',target=>{
						var player=_status.event.player;
						return -get.attitude(player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('jsrgyechou',target);
						target.addSkill('jsrgyechou_effect');
						target.addMark('jsrgyechou_effect',1,false);
					}
				},
				subSkill:{
					effect:{
						trigger:{
							player:'damageBegin3',
						},
						filter:function(event,player){
							return event.num>=player.getHp();
						},
						forced:true,
						charlotte:true,
						onremove:true,
						content:function(){
							trigger.num*=2*player.countMark('jsrgyechou_effect');
						},
						mark:true,
						marktext:'仇',
						intro:{
							content:'当你受到伤害值不小于体力值的伤害时，此伤害翻&倍',
						},
						ai:{
							effect:{
								target:function(card,player,target){
									if(get.tag(card,'damage')){
										if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
										if(target.hp==1) return 2;
									}
								}
							}
						},
					},
				}
			},
			//淳于琼
			jsrgcangchu:{
				audio:'recangchu',
				trigger:{
					global:'phaseJieshuBegin',
				},
				filter:function(event,player){
					if(player.hasSkill('jsrgshishou_blocker')) return false;
					return player.getHistory('gain').length;
				},
				direct:true,
				content:function(){
					'step 0'
					var num=0;
					player.getHistory('gain',evt=>{
						num+=evt.cards.length;
					});
					event.num=num;
					player.chooseTarget(get.prompt('jsrgcangchu'),'令至多'+get.cnNumber(num)+'名角色各摸'+get.cnNumber(num>game.countPlayer()?2:1)+'张牌',[1,num]).set('ai',target=>{
						var player=_status.event.player;
						return get.attitude(player,target)/Math.sqrt(target.countCards('hs')+1);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.slice();
						targets.sortBySeat();
						player.logSkill('jsrgcangchu',targets);
						game.asyncDraw(targets,num>game.countPlayer()?2:1);
						game.delayex();
					}
				},
			},
			jsrgshishou:{
				audio:'reshishou',
				trigger:{
					player:'useCard',
				},
				forced:true,
				filter:function(event,player){
					return event.card.name=='jiu';
				},
				group:'jsrgshishou_burn',
				content:function(){
					'step 0'
					player.draw(3);
					player.addTempSkill('jsrgshishou_nouse');
				},
				mod:{
					aiOrder:function(player,card,num){
						if(card.name=='jiu') return 0.01;
					},
				},
				ai:{
					effect:{
						player_use:function(card,player,target){
							if(card.name=='jiu') return [1,1];
						},
					}
				},
				subSkill:{
					nouse:{
						charlotte:true,
						mod:{
							cardEnabled:function(card,player){
								return false;
							},
							cardUsable:function(card,player){
								return false;
							},
							cardSavable:function(card,player){
								return false;
							},
						},
						mark:true,
						marktext:'失',
						intro:{
							content:'喝醉了，不能再使用牌',
						}
					},
					burn:{
						audio:'reshishou',
						trigger:{
							player:'damageEnd',
						},
						forced:true,
						filter:function(event,player){
							return event.hasNature('fire');
						},
						content:function(){
							player.addTempSkill('jsrgshishou_blocker',{player:'phaseEnd'});
						}
					},
					blocker:{
						charlotte:true,
						mark:true,
						marktext:'守',
						intro:{
							content:'〖仓储〗失效直到下回合结束',
						}
					}
				},
			},
			//江山如故·起
			sbyingmen:{
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return event.name!='phase'||game.phaseNumber==0;
				},
				content:function(){
					if(!_status.characterlist) lib.skill.pingjian.initList();
					var characters=_status.characterlist.randomRemove(4);
					lib.skill.sbyingmen.addVisitors(characters,player);
					game.delayx();
				},
				group:'sbyingmen_reload',
				subSkill:{
					reload:{
						trigger:{player:'phaseBegin'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return player.getStorage('sbyingmen').length<4;
						},
						content:function(){
							if(!_status.characterlist) lib.skill.pingjian.initList();
							var characters=_status.characterlist.randomRemove(4-player.getStorage('sbyingmen').length);
							lib.skill.sbyingmen.addVisitors(characters,player);
							game.delayx();
						},
					},
				},
				getSkills:function(characters,player){
					var skills=[];
					for(var name of characters){
						if(Array.isArray(lib.character[name])){
							for(var skill of lib.character[name][3]){
								var list=get.skillCategoriesOf(skill,player);
								list.remove('锁定技');
								if(list.length>0) continue;
								var info=get.info(skill);
								if(info&&(!info.unique||info.gainable)) skills.add(skill);
							}
						}
					}
					return skills;
				},
				addVisitors:function(characters,player){
					player.addSkillBlocker('sbyingmen');
					game.log(player,'将','#y'+get.translation(characters),'加入了','#g“访客”');
					game.broadcastAll(function(player,characters){
						player.$draw(characters.map(function(name){
							var cardname='huashen_card_'+name;
							lib.card[cardname]={
								fullimage:true,
								image:'character:'+name
							};
							lib.translate[cardname]=get.rawName2(name);
							return game.createCard(cardname,' ',' ');
						}),'nobroadcast');
					},player,characters);
					player.markAuto('sbyingmen',characters)
					var storage=player.getStorage('sbyingmen');
					var skills=lib.skill.sbyingmen.getSkills(storage,player);
					player.addInvisibleSkill(skills);
				},
				removeVisitors:function(characters,player){
					var skills=lib.skill.sbyingmen.getSkills(characters,player);
					var characters2=player.getStorage('sbyingmen').slice(0);
					characters2.removeArray(characters);
					skills.removeArray(lib.skill.sbyingmen.getSkills(characters2,player));
					player.unmarkAuto('sbyingmen',characters);
					_status.characterlist.addArray(characters);
					player.removeInvisibleSkill(skills);
				},
				onremove:function(player,skill){
					lib.skill.sbyingmen.removeVisitors(player.getSkills('sbyingmen'),player);
					player.removeSkillBlocker('sbyingmen');
				},
				skillBlocker:function(skill,player){
					if(!player.invisibleSkills.contains(skill)||skill=='sbpingjian'||skill=='sbpingjian') return false;
					return !player.hasSkill('sbpingjian');
				},
				marktext:'客',
				intro:{
					name:'访客',
					mark:function(dialog,storage,player){
						if(!storage||!storage.length) return '当前没有“访客”';
						dialog.addSmall([storage,'character']);
						var skills=lib.skill.sbyingmen.getSkills(storage,player);
						if(skills.length) dialog.addText('<li>当前可用技能：'+get.translation(skills),false);
					},
				},
			},
			sbpingjian:{
				trigger:{player:['useSkill','logSkillBegin']},
				forced:true,
				filter:function(event,player){
					var skill=event.sourceSkill||event.skill;
					return player.invisibleSkills.contains(skill)&&lib.skill.sbyingmen.getSkills(player.getStorage('sbyingmen'),player).contains(skill);
				},
				content:function(){
					'step 0'
					var visitors=player.getStorage('sbyingmen').slice(0);
					var drawers=visitors.filter(function(name){
						return Array.isArray(lib.character[name])&&lib.character[name][3].contains(trigger.sourceSkill);
					});
					event.drawers=drawers;
					if(visitors.length==1) event._result={bool:true,links:visitors};
					else{
						var dialog=['评鉴：请选择移去一张“访客”'];
						if(drawers.length) dialog.push('<div class="text center">如果移去'+get.translation(drawers)+'，则你摸一张牌</div>');
						dialog.push([visitors,'character']);
						player.chooseButton(dialog,true);
					}
					'step 1'
					if(result.bool){
						lib.skill.sbyingmen.removeVisitors(result.links,player);
						game.log(player,'移去了','#y'+get.translation(result.links[0]));
						if(event.drawers.contains(result.links[0])){
							player.addTempSkill('sbpingjian_draw');
							player.storage.sbpingjian_draw.push(trigger.skill);
						}
					}
				},
				group:'sbpingjian_trigger',
				subSkill:{
					draw:{
						charlotte:true,
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						onremove:true,
						trigger:{player:['useSkillAfter','logSkill']},
						forced:true,
						popup:false,
						filter:function(event,player){
							return player.getStorage('sbpingjian_draw').contains(event.skill);
						},
						content:function(){
							player.storage.sbpingjian_draw.remove(trigger.skill);
							player.draw();
							if(!player.storage.sbpingjian_draw.length) player.removeSkill('sbpingjian_draw');
						},
					},
					trigger:{
						trigger:{player:'triggerInvisible'},
						forced:true,
						forceDie:true,
						popup:false,
						charlotte:true,
						priority:10,
						filter:function(event,player){
							if(event.revealed) return false;
							var info=get.info(event.skill);
							if(info.charlotte) return false;
							var skills=lib.skill.sbyingmen.getSkills(player.getStorage('sbyingmen'),player);
							game.expandSkills(skills);
							return skills.contains(event.skill);
						},
						content:function(){
							"step 0"
							if(get.info(trigger.skill).silent){
								event.finish();
							}
							else{
								var info=get.info(trigger.skill);
								var event=trigger,trigger=event._trigger;
								var str;
								var check=info.check;
								if(info.prompt) str=info.prompt;
								else{
									if(typeof info.logTarget=='string'){
										str=get.prompt(event.skill,trigger[info.logTarget],player);
									}
									else if(typeof info.logTarget=='function'){
										var logTarget=info.logTarget(trigger,player);
										if(get.itemtype(logTarget).indexOf('player')==0) str=get.prompt(event.skill,logTarget,player);
									}
									else{
										str=get.prompt(event.skill,null,player);
									}
								}
								if(typeof str=='function'){str=str(trigger,player)}
								var next=player.chooseBool('评鉴：'+str);
								next.set('yes',!info.check||info.check(trigger,player));
								next.set('hsskill',event.skill);
								next.set('forceDie',true);
								next.set('ai',function(){
									return _status.event.yes;
								});
								if(typeof info.prompt2=='function'){
									next.set('prompt2',info.prompt2(trigger,player));
								}
								else if(typeof info.prompt2=='string'){
									next.set('prompt2',info.prompt2);
								}
								else if(info.prompt2!=false){
									if(lib.dynamicTranslate[event.skill]) next.set('prompt2',lib.dynamicTranslate[event.skill](player,event.skill));
									else if(lib.translate[event.skill+'_info']) next.set('prompt2',lib.translate[event.skill+'_info']);
								}
								if(trigger.skillwarn){
									if(next.prompt2){
										next.set('prompt2','<span class="thundertext">'+trigger.skillwarn+'。</span>'+next.prompt2);
									}
									else{
										next.set('prompt2',trigger.skillwarn);
									}
								}
							}
							"step 1"
							if(result.bool){
								trigger.revealed=true;
							}
							else{
								trigger.untrigger();
								trigger.cancelled=true;
							}
						}
					},
				},
			},
			jsrgchaozheng:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				logTarget:function(event,player){
					return game.filterPlayer(i=>i!=player);
				},
				prompt:'是否发动【朝争】？',
				content:function(){
					player.chooseToDebate(game.filterPlayer(i=>i!=player)).set('callback',lib.skill.jsrgchaozheng.callback);
				},
				callback:function(){
					var result=event.debateResult;
					if(result.bool&&result.opinion){
						var opinion=result.opinion,targets=result.red.map(i=>i[0]);
						targets.sortBySeat();
						targets.forEach(i=>i[opinion=='red'?'recover':'loseHp']());
						if(targets.length==0||result.black.length==0) player.draw(result.targets.length);
					}
				}
			},
			jsrgshenchong:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				filterTarget:lib.filter.notMe,
				skillAnimation:true,
				animationColor:'soil',
				content:function(){
					'step 0'
					player.awakenSkill('jsrgshenchong');
					target.addSkillLog('jsrgfeiyang');
					target.addSkillLog('jsrgbahu');
					'step 1'
					player.addSkill('jsrgshenchong_die');
					player.markAuto('jsrgshenchong_die',[target]);
				},
				ai:{
					order:1,
					result:{target:1}
				},
				subSkill:{
					die:{
						audio:'jsrgshenchong',
						trigger:{player:'die'},
						charlotte:true,
						forced:true,
						forceDie:true,
						filter:function(event,player){
							return player.getStorage('jsrgshenchong_die').length;
						},
						content:function(){
							var targets=player.getStorage('jsrgshenchong_die');
							player.line(targets);
							targets.sortBySeat().forEach(current=>{
								current.clearSkills(true);
								current.chooseToDiscard(current.countCards('h'),'h',true);
							});
						}
					}
				}
			},
			jsrgfeiyang:{
				trigger:{player:'phaseJudgeBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('j')&&player.countCards('h')>1;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('h',2,get.prompt('jsrgfeiyang'),'弃置两张手牌并弃置判定区里的一张牌').set('logSkill','jsrgfeiyang').set('ai',function(card){
						return 6-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.discardPlayerCard(player,'j',true);
					}
				},
			},
			jsrgbahu:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				content:function(){
					player.draw();
				},
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					},
				},
			},
			jsrgjulian:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				filter:function(event,player){
					return player.hasZhuSkill('jsrgjulian')&&lib.skill.jsrgjulian.logTarget(null,player).length;
				},
				prompt:'是否发动【聚敛】？',
				prompt2:'你可以获得其他所有群势力角色的各一张牌',
				logTarget:function(event,player){
					return game.filterPlayer(current=>{
						return current.group=='qun'&&current.countGainableCards(player,'h')>0&&current!=player;
					})
				},
				content:function(){
					game.filterPlayer(current=>{
						return current.group=='qun'&&current!=player;
					}).sortBySeat().forEach(i=>{
						player.gainPlayerCard(i,'h',true);
					});
				},
				group:'jsrgjulian_draw',
				zhuSkill:true,
				subSkill:{
					draw:{
						audio:'jsrgjulian',
						trigger:{global:'gainAfter'},
						filter:function(event,player){
							var source=event.player;
							if(source==player||source.group!='qun') return false;
							var evt=event.getParent('phaseDraw');
							return (!evt||evt.player!=source)&&event.getParent().name=='draw'&&event.getParent(2).name!='jsrgjulian_draw'&&player.hasZhuSkill('jsrgjulian',event.player);
						},
						direct:true,
						usable:2,
						content:function(){
							'step 0'
							var source=trigger.player;
							event.source=source;
							source.chooseBool('是否响应'+get.translation(player)+'的【聚敛】摸一张牌？');
							'step 1'
							if(result.bool){
								source.logSkill('jsrgjulian_draw',player);
								source.draw();
							}
							else player.storage.counttrigger.jsrgjulian_draw--;
						}
					},
					give:{
						charlotte:true,
						onremove:true
					}
				}
			},
			//何进
			jsrgzhaobing:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					var hs=player.getCards('h');
					if(!hs.length) return false;
					for(var i of hs){
						if(!lib.filter.cardDiscardable(i,player,'jsrgzhaobing')) return false;
					}
					return true;
				},
				content:function(){
					'step 0'
					var cards=player.getCards('h');
					var num=cards.length;
					var prompt2='弃置所有手牌，令至多'+get.cnNumber(num)+'名其他角色依次选择一项：1.正面向上交给你一张【杀】；2.失去1点体力';
					player.chooseTarget(get.prompt('jsrgzhaobing'),prompt2,[1,num],lib.filter.notMe).set('ai',target=>{
						if(!_status.event.goon) return 0;
						return 2-get.attitude(_status.event.player,target);
					}).set('goon',num/2<game.countPlayer(current=>{
						return 2-get.attitude(player,current)>0;
					}));
					'step 1'
					if(result.bool){
						player.logSkill('jsrgzhaobing',result.targets);
						event.targets=result.targets;
						event.targets.sortBySeat();
						player.chooseToDiscard(true,'h',player.countCards('h'));
					}
					else event.finish();
					'step 2'
					var target=targets.shift();
					event.target=target;
					target.chooseCard('诏兵：交给'+get.translation(player)+'一张【杀】，或失去1点体力',(card)=>{
						return get.name(card)=='sha';
					}).set('ai',card=>{
						if(_status.event.goon) return 0;
						return 6-get.value(card);
					}).set('goon',get.effect(target,{name:'losehp'},target,target)>=0);
					'step 3'
					if(result.bool) target.give(result.cards,player,true);
					else target.loseHp();
					if(targets.length) event.goto(2);
				},
				ai:{
					expose:0.2
				}
			},
			jsrgzhuhuan:{
				audio:'mouzhu',
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					var hs=player.getCards('h','sha');
					if(!hs.length) return false;
					for(var i of hs){
						if(!lib.filter.cardDiscardable(i,player,'jsrgzhuhuan')) return false;
					}
					return true;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('jsrgzhuhuan'),lib.filter.notMe).set('ai',target=>{
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('jsrgzhuhuan',target);
						var hs=player.getCards('h','sha');
						event.num=hs.length;
						player.discard(hs);
					}
					else event.finish();
					'step 2'
					target.chooseToDiscard(get.translation(player)+'对你发动了【诛宦】','弃置'+get.cnNumber(num)+'张牌并失去1点体力；或点击“取消”令其回复1点体力且其摸'+get.cnNumber(num)+'张牌').set('ai',card=>{
						if(_status.event.goon) return 0;
						return 5.5-get.value(card);
					}).set('goon',target.hp<=2||get.attitude(target,player)>=0||player.isHealthy());
					'step 3'
					if(result.bool){
						target.loseHp();
					}
					else{
						player.draw(num);
						player.recover();
					}
				},
				ai:{
					expose:0.2
				}
			},
			jsrgyanhuo:{
				inherit:'spyanhuo',
				forced:true,
			},
			//孙坚
			jsrgpingtao:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					var att=get.attitude(target,player);
					target.chooseCard(get.translation(player)+'对你发动了【平讨】','交给其一张牌并令其此回合使用【杀】的次数上限+1；或点击“取消”令其视为对你使用一张【杀】','he').set('ai',card=>{
						if(_status.event.give){
							if(card.name=='sha'||card.name=='tao'||card.name=='jiu') return 0;
							return 8-get.value(card);
						}
						if(_status.event.att<0&&card.name=='sha') return -1;
						return 4-get.value(card);
					}).set('give',(att>=0||target.hp==1&&target.countCards('hs','shan')<=1)&&get.effect(target,{name:'sha'},player,target)<0).set('att',att);
					'step 1'
					if(result.bool){
						target.give(result.cards,player);
						player.addTempSkill('jsrgpingtao_sha');
						player.addMark('jsrgpingtao_sha',1,false);
					}
					else if(player.canUse('sha',target,false)){
						player.useCard({name:'sha',isCard:true},target,false);
					}
				},
				ai:{
					expose:0.15,
					order:5,
					result:{target:-1}
				},
				subSkill:{
					sha:{
						charlotte:true,
						onremove:true,
						marktext:'讨',
						intro:{
							content:'本回合使用【杀】的次数上限+#',
						},
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('jsrgpingtao_sha');
							},
						}
					}
				}
			},
			jsrgjuelie:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return player.countCards('he')&&event.card.name=='sha';
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt('jsrgjuelie',trigger.target),'当你使用【杀】指定一名角色为目标后，你可以弃置任意张牌，然后弃置其等量的牌，然后若你的手牌数或体力值最小，此【杀】对其的伤害基数+1。',[1,Infinity],'he').set('ai',card=>{
						if(ui.selected.cards.length>=_status.event.max) return 0;
						if(_status.event.goon) return 4.5-get.value(card);
						return 0;
					}).set('max',trigger.target.countDiscardableCards(player,'he')).set('goon',get.attitude(player,trigger.target)<0).set('logSkill',['jsrgjuelie_discard',trigger.target]);
					'step 1'
					if(result.bool){
						var num=result.cards.length;
						if(trigger.target.countDiscardableCards(player,'he')) player.discardPlayerCard('平讨：弃置'+get.translation(trigger.target)+get.cnNumber(num)+'张牌',num,'he',trigger.target,true);
					}
					else event.finish();
					'step 2'
					if(player.isMinHandcard()||player.isMinHp()){
						var id=trigger.target.playerid;
						var map=trigger.getParent().customArgs;
						if(!map[id]) map[id]={};
						if(typeof map[id].extraDamage!='number'){
							map[id].extraDamage=0;
						}
						map[id].extraDamage++;
					}
				},
				shaRelated:true,
				ai:{
					unequip_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.name||arg.name!='sha') return false;
						if(!arg.target) return false;
						var card=arg.target.getEquip(2);
						return card&&get.value(card)>0&&player.hasCard(cardx=>{
							return lib.filter.cardDiscardable(cardx,player,'jsrgjuelie_discard')&&get.value(cardx)<5;
						});
					},
				},
			},
			//皇甫嵩
			jsrgguanhuo:{
				audio:2,
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					return event.card.storage&&event.card.storage.jsrgguanhuo&&!game.hasPlayer2(current=>{
						return current.hasHistory('damage',evt=>evt.card==event.card);
					});
				},
				forced:true,
				locked:false,
				group:'jsrgguanhuo_viewas',
				content:function(){
					'step 0'
					var count=player.getHistory('useSkill',evt=>evt.skill=='jsrgguanhuo_viewas').length;
					if(count==1){
						player.addTempSkill('jsrgguanhuo_ex','phaseUseAfter');
						player.addMark('jsrgguanhuo_ex',1,false);
						trigger.targets.forEach(i=>i.removeSkill('huogong2'));
					}
					else{
						player.removeSkill('jsrgguanhuo');
						game.log(player,'失去了技能','#g【观火】');
					}
				},
				ai:{
					effect:{
						player:function(card,player){
							if(_status.event.getParent().skill=='jsrgguanhuo_viewas'&&player.getHistory('useSkill',evt=>evt.skill=='jsrgguanhuo_viewas').length==1) return 'zeroplayertarget';
							if(_status.event.type=='phase'&&_status.event.skill=='jsrgguanhuo_viewas'&&player.getHistory('useSkill',evt=>evt.skill=='jsrgguanhuo_viewas').length>1&&player.countCards('h')<=3) return [0,0];
						}
					}
				},
				subSkill:{
					viewas:{
						audio:'jsrgguanhuo',
						enable:'phaseUse',
						viewAs:{
							name:'huogong',
							isCard:true,
							storage:{
								jsrgguanhuo:true
							}
						},
						filterCard:()=>false,
						selectCard:-1,
						prompt:'视为使用一张【火攻】',
						ai:{
							order:function(item,player){
								return get.order({name:'huogong'})+0.01;
							},
						}
					},
					ex:{
						trigger:{source:'damageBegin1'},
						filter:function(event,player){
							return event.card&&event.card.name=='huogong'&&event.getParent().type=='card';
						},
						forced:true,
						charlotte:true,
						onremove:true,
						intro:{content:'当你造成渠道为【火攻】的伤害时，此伤害+#'},
						content:function(){
							trigger.num+=player.countMark('jsrgguanhuo_ex');
						}
					}
				}
			},
			jsrgjuxia:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				usable:1,
				countSkill:function(player){
					return player.getSkills(null,false,false).filter(function(skill){
						var info=get.info(skill);
						if(!info||info.charlotte) return false;
						if(info.zhuSkill) return player.hasZhuSkill(skill);
						return true;
					}).length;
				},
				filter:function(event,player){
					return event.player!=player&&lib.skill.jsrgjuxia.countSkill(event.player)>lib.skill.jsrgjuxia.countSkill(player);
				},
				direct:true,
				content:function(){
					'step 0'
					var goon=get.effect(player,trigger.card,trigger.player,trigger.player)<1;
					if(goon&&!event.isMine()&&!event.isOnline()) game.delayx();
					trigger.player.chooseBool('是否对'+get.translation(player)+'发动【居下】？','令'+get.translation(trigger.card)+'对其无效，然后其摸两张牌').set('ai',()=>{
						return _status.event.goon;
					}).set('goon',goon);
					'step 1'
					if(result.bool){
						trigger.player.logSkill('jsrgjuxia',player);
						trigger.excluded.add(player);
						player.draw(2);
					}
					else player.storage.counttrigger.jsrgjuxia--;
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(lib.skill.jsrgjuxia.countSkill(target)>=lib.skill.jsrgjuxia.countSkill(player)) return;
							if(card&&(card.cards||card.isCard)&&get.attitude(target,player)>0&&(!target.storage.counttrigger||!target.storage.counttrigger.jsrgjuxia)) return [0,0.5,0,0.5];
						},
					},
				}
			},
			//许劭
			jsrgyingmen:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:['enterGame','phaseBegin'],
				},
				forced:true,
				filter:function(event,player,name){
					if(player.getStorage('jsrgyingmen').length>=4) return false;
					if(name=='phaseBefore') return game.phaseNumber==0;
					return event.name!='phase'||event.player==player;
				},
				update:function(player){
					var id=player.playerid;
					var characters=player.getStorage('jsrgyingmen');
					var skillName='jsrgpingjian_'+id;
					var skillsx=[],skillsx2=[];
					var map={};
					var skillsy=lib.skill[skillName]?lib.skill[skillName].group:[];
					for(var name of characters){
						var skills=lib.character[name][3].slice();
						skills=skills.filter(skill=>{
							var list=get.skillCategoriesOf(skill,player);
							list.removeArray(['锁定技','Charlotte']);
							if(list.length) return false;
							var info=get.info(skill);
							return info&&(!info.unique||info.gainable);
						});
						game.expandSkills(skills);
						for(var i=0;i<skills.length;i++){
							var skill=skills[i];
							var info=get.info(skill);
							if(info.silent||info.charlotte) continue;
							if(!info.forced&&!info.frequent&&(!info.mod||info.charlotte&&info.mod)) continue;
							var infox=get.copy(info);
							var newname=skill+'_'+id;
							map[newname]=infox;
							if(info.audio) infox.audio=(typeof info.audio!='number')?info.audio:skill;
							// if(infox.group) delete infox.group;
							if(infox.frequent) delete infox.frequent;
							if(infox.forceDie) delete infox.forceDie;
							var popup=infox.popup;
							if(infox.forced&&infox.direct){
								delete infox.direct;
								infox.popup=false;
							}
							if(infox.forced&&!infox.prompt2){
								var skillx=skill;
								while(true){
									var prompt2=lib.translate[skillx+'_info'];
									if(prompt2&&prompt2.length){
										infox.prompt2=prompt2;
										break;
									}
									var ind=skillx.lastIndexOf('_');
									if(ind==-1) break;
									skillx=skillx.slice(0,ind);
								};
							}
							if(popup!=false&&!infox.silent) infox.forced=false;
							if(!infox.charlotte&&infox.mod) delete infox.mod;
							skillsx2.add(skill);
							skills[i]=newname;
						}
						if(skills.length){
							skillsx.addArray(skills);
						}
					}
					var skillsRemoving=skillsy.removeArray(skillsx);
					player.removeSkill(skillsRemoving);
					game.broadcastAll(function(name,skillsx,skillsx2,id,map){
						for(var i in map) lib.skill[i]=map[i];
						lib.skill[name]={
							unique:true,
							group:skillsx
						};
						lib.translate[name]='评鉴';
						for(var i of skillsx2){
							lib.translate[i+'_'+id]=lib.translate[i];
							lib.translate[i+'_'+id+'_info']=lib.translate[i+'_info'];
						}
					},skillName,skillsx,skillsx2,id,map);
					player.addSkill(skillName);
					player.addSkill('jsrgpingjian_blocker');
					player.addSkillTrigger(skillName);
				},
				bannedList:['zishu','weishu','xinfu_zhanji','kyouko_rongzhu'],
				content:function(){
					'step 0'
					if(!_status.characterlist) lib.skill.pingjian.initList();
					var num=player.getStorage('jsrgyingmen').length;
					var list=[];
					_status.characterlist.randomSort();
					for(var i=0;i<_status.characterlist.length;i++){
						var name=_status.characterlist[i];
						var skills=lib.character[name][3].slice();
						if(skills.some(skill=>{
							return lib.skill.jsrgyingmen.bannedList.contains(skill);
						})) continue;
						list.push(name);
						_status.characterlist.remove(name);
						if(list.length>=4-num) break;
					}
					if(list.length){
						player.markAuto('jsrgyingmen',list);
						if(player.hasSkill('jsrgpingjian',null,false,false)) lib.skill.jsrgyingmen.update(player);
						game.log(player,'将','#g'+get.translation(list),'置为','#y访客');
						game.broadcastAll(function(player,list){
							var cards=[];
							for(var i=0;i<list.length;i++){
								var cardname='huashen_card_'+list[i];
								lib.card[cardname]={
									fullimage:true,
									image:'character:'+list[i]
								}
								lib.translate[cardname]=get.rawName2(list[i]);
								cards.push(game.createCard(cardname,'',''));
							}
							player.$draw(cards,'nobroadcast');
						},player,list);
					}
				},
				ai:{
					combo:'jsrgpingjian'
				},
				marktext:'客',
				intro:{
					name:'访客(盈门/评鉴)',
					mark:function(dialog,storage,player){
						dialog.addText('剩余“访客”');
						if(storage) dialog.addSmall([storage,'character']);
						else dialog.addText('无');
					},
				}
			},
			jsrgpingjian:{
				audio:2,
				trigger:{player:['logSkill','useSkillAfter']},
				forced:true,
				locked:false,
				onremove:function(player){
					player.removeSkill('jsrgpingjian_'+player.playerid);
				},
				filter:function(event,player){
					var skill=event.skill,name=event.event?event.event.name:'';
					var visitors=player.getStorage('jsrgyingmen');
					for(var visitor of visitors){
						var skills=lib.character[visitor][3].slice();
						game.expandSkills(skills);
						var info=get.info(skill);
						if(info&&(info.charlotte||info.silent)) continue;
						if(skills.some(skillx=>{
							return skill.indexOf(skillx)==0||name.indexOf(skillx+'_'+player.playerid)==0;
						})) return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					var current;
					var skill=trigger.skill,name=trigger.event?trigger.event.name:'';
					var visitors=player.getStorage('jsrgyingmen');
					for(var visitor of visitors){
						var skills=lib.character[visitor][3].slice();
						game.expandSkills(skills);
						var info=get.info(skill);
						if(info&&info.charlotte) continue;
						if(skills.some(skillx=>{
							return skill.indexOf(skillx)==0||name.indexOf(skillx+'_'+player.playerid)==0;
						})){
							current=visitor;
							break;
						}
					}
					event.current=current;
					player.chooseButton(['###评鉴：移去一名访客###<div class="text center">若移去的访客为'+get.translation(current)+'，则你摸一张牌</div>',[player.getStorage('jsrgyingmen'),'character']],true).set('ai',button=>{
						if(button.link==_status.event.toremove) return 1;
						return Math.random();
					}).set('toremove',function(){
						var list=player.getStorage('jsrgyingmen');
						var rand=Math.random();
						if(rand<0.33) return list[0];
						if(rand<0.66) return current;
						return list.randomGet();
					}());
					'step 1'
					if(result.bool){
						var visitor=result.links[0];
						game.log(player,'从','#y访客','中移去了','#g'+get.translation(visitor));
						player.popup(visitor);
						player.unmarkAuto('jsrgyingmen',[visitor]);
						_status.characterlist.add(visitor);
						if(visitor==event.current) player.draw();
						lib.skill.jsrgyingmen.update(player);
					}
				},
				subSkill:{
					blocker:{
						init:function(player,skill){
							player.addSkillBlocker(skill);
						},
						onremove:function(player,skill){
							player.removeSkillBlocker(skill);
						},
						charlotte:true,
						locked:true,
						skillBlocker:function(skill,player){
							if(skill!='jsrgpingjian_'+player.playerid) return false;
							if(player._jsrgpingjian_blockerChecking) return;
							player._jsrgpingjian_blockerChecking=true;
							var own=player.hasSkill('jsrgpingjian');
							delete player._jsrgpingjian_blockerChecking;
							return !own;
						}
					},
				}
			},
			//董白
			jsrgshichong:{
				audio:2,
				zhuanhuanji:true,
				trigger:{player:'useCardToPlayered'},
				direct:true,
				filter:function(event,player){
					return event.target!=player&&event.targets.length==1&&event.target.isIn()&&event.target.countCards('h');
				},
				mark:true,
				marktext:'☯',
				intro:{
					content:function(storage,player){
						var str='转换技。当你使用牌指定其他角色为唯一目标后，';
						if(storage) return str+'目标角色可以交给你一张手牌。';
						return str+'你可以获得目标角色一张手牌。';
					},
				},
				content:function(){
					'step 0'
					if(!player.storage.jsrgshichong){
						player.chooseBool(get.prompt('jsrgshichong',trigger.target),'你可以获得该角色的一张手牌').set('ai',()=>{
							return _status.event.bool;
						}).set('bool',get.attitude(player,trigger.target)<=0);
					}
					else{
						trigger.target.chooseCard('是否发动'+get.translation(player)+'的【恃宠】？','你可以选择一张手牌，并交给该角色').set('ai',card=>{
							if(_status.event.goon) return 5-get.value(card);
							return 0-get.value(card);
						}).set('goon',get.attitude(trigger.target,player)>2);
					}
					'step 1'
					if(result.bool){
						if(!player.storage.jsrgshichong){
							player.logSkill('jsrgshichong',trigger.target);
							player.gainPlayerCard(trigger.target,'h',true);
						}
						else{
							trigger.target.logSkill('jsrgshichong',player);
							trigger.target.give(result.cards,player);
						}
						player.changeZhuanhuanji('jsrgshichong');
					}
				}
			},
			jsrglianzhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterCard:{color:'black'},
				position:'h',
				filterTarget:lib.filter.notMe,
				lose:false,
				discard:false,
				delay:false,
				content:function(){
					'step 0'
					player.showCards(cards,get.translation(player)+'发动了【连诛】');
					'step 1'
					player.give(cards,target);
					'step 2'
					event.targets=game.filterPlayer(current=>{
						return current.group==target.group&&current!=player;
					}).sortBySeat();
					game.delayx();
					'step 3'
					var target=targets.shift();
					if(player.canUse('guohe',target)){
						player.useCard({name:'guohe',isCard:true},target);
					}
					if(targets.length) event.redo();
				},
				ai:{
					order:4,
					result:{
						target:function(player,target){
							var targets=game.filterPlayer(current=>{
								return current.group==target.group&&current!=player;
							});
							var eff=targets.reduce((p,c)=>{
								return p+get.effect(c,{name:'guohe'},player,player);
							})
							if(ui.selected.cards.length) eff+=get.value(ui.selected.cards[0],target);
							return eff;
						}
					}
				}
			},
			//桥玄
			jsrgjuezhi:{
				audio:2,
				trigger:{source:'damageBegin1'},
				filter:function(event,player){
					if(_status.currentPhase!=player||player.hasSkill('jsrgjuezhi_used',null,null,false)) return false;
					return event.card&&event.getParent().type=='card'&&lib.skill.jsrgjuezhi.getNum(event.player,player)>0;
				},
				forced:true,
				locked:false,
				getNum:function(target,player){
					return target.countCards('e',card=>{
						var subtype=get.subtypes(card);
						for(var i of subtype){
							if(player.hasDisabledSlot(i)) return true;
						}
						return false;
					});
				},
				group:'jsrgjuezhi_disable',
				content:function(){
					player.addTempSkill('jsrgjuezhi_used',['phaseZhunbeiAfter','phaseJudgeAfter','phaseDrawAfter','phaseUseAfter','phaseDiscardAfter','phaseJieshuAfter']);
					trigger.num+=lib.skill.jsrgjuezhi.getNum(trigger.player,player);
				},
				subSkill:{
					disable:{
						audio:'jsrgjuezhi',
						trigger:{
							player:'loseAfter',
							global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
						},
						direct:true,
						filter:function(event,player){
							var evt=event.getl(player);
							return evt&&evt.es&&evt.es.length>0;
						},
						content:function(){
							'step 0'
							event.cards=trigger.getl(player).es;
							'step 1'
							var card=cards.shift(),subtypes=get.subtypes(card).filter(slot=>player.hasEnabledSlot(slot));
							event.subtypes=subtypes;
							if(subtypes.length>0){
								player.chooseBool(get.prompt('jsrgjuezhi_disable'),'废除你的'+get.translation(subtypes)+'栏').set('ai',()=>1);
							}
							else event._result={bool:false};
							'step 2'
							if(result.bool){
								player.logSkill('jsrgjuezhi_disable');
								player.disableEquip(event.subtypes);
							}
							if(cards.length>0) event.goto(1);
						},
					},
					used:{charlotte:true}
				}
			},
			jsrgjizhao:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','phaseJieshuBegin']},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('jsrgjizhao')).set('ai',target=>{
						var player=_status.event.player;
						if(player.countCards('j')) return player==target?10:0.1;
						return 6-get.attitude(player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('jsrgjizhao',target);
						target.chooseToUse({
							filterCard:function(card,player,event){
								if(get.itemtype(card)!='card'||get.position(card)!='h'&&get.position(card)!='s') return false;
								return lib.filter.filterCard.apply(this,arguments);
							},
							prompt:'急召：使用一张手牌，否则'+get.translation(player)+'可以移动你区域里的一张牌',
							addCount:false,
							goon:target!=player||!player.countCards('j'),
							ai1:function(card){
								if(_status.event.goon) return get.order(card);
								return 0;
							}
						});
					}
					else{
						event.finish();
						return;
					}
					'step 2'
					if(result.bool){event.finish();return;}
					var targets=game.filterPlayer(current=>{
						if(current==target) return false;
						var hs=target.getCards('h');
						if(hs.length) return true;
						var js=target.getCards('j');
						for(var i=0;i<js.length;i++){
							if(current.canAddJudge(js[i])) return true;
						}
						if(current.isMin()) return false;
						var es=target.getCards('e');
						for(var i=0;i<es.length;i++){
							if(current.canEquip(es[i])) return true;
						}
						return false;
					});
					if(targets.length){
						var next=player.chooseTarget(function(card,player,target){
							return _status.event.targets.contains(target);
						});
						next.set('from',target);
						next.set('targets',targets);
						next.set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							var sgnatt=get.sgn(att);
							var from=_status.event.from;
							var es=from.getCards('e');
							var i;
							var att2=get.sgn(get.attitude(player,from));
							for(i=0;i<es.length;i++){
								if(sgnatt!=0&&att2!=0&&sgnatt!=att2&&
									get.sgn(get.value(es[i],from))==-att2&&
									get.sgn(get.effect(target,es[i],player,target))==sgnatt&&
									target.canEquip(es[i])){
									return Math.abs(att);
								}
							}
							if(i==es.length&&(!from.countCards('j',function(card){
								return target.canAddJudge(card);
							})||att2<=0)){
								if(from.countCards('h')>0) return att;
								return 0;
							}
							return -att*att2;
						});
						next.set('targetprompt','移动目标');
						next.set('prompt','急召：是否移动'+get.translation(target)+'的一张牌？');
					}
					else event.finish();
					'step 3'
					if(result.bool){
						var target2=result.targets[0];
						event.targets=[target,target2];
						player.line2(event.targets,'green');
					}
					else{
						event.finish();
					}
					'step 4'
					game.delay();
					'step 5'
					if(targets.length==2){
						player.choosePlayerCard('hej',true,function(button){
							var player=_status.event.player;
							var targets0=_status.event.targets0;
							var targets1=_status.event.targets1;
							if(get.attitude(player,targets0)>0&&get.attitude(player,targets1)<0){
								if(get.position(button.link)=='j') return 12;
								if(get.value(button.link,targets0)<0&&get.effect(targets1,button.link,player,targets1)>0) return 10;
								return 0;
							}
							else{
								if(get.position(button.link)=='j') return -10;
								if(get.position(button.link)=='h') return 10;
								return get.value(button.link)*get.effect(targets1,button.link,player,targets1);
							}
						},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
							var targets1=_status.event.targets1;
							if(get.position(button.link)=='h'){
								return true;
							}
							else if(get.position(button.link)=='j'){
								return targets1.canAddJudge(button.link);
							}
							else{
								return targets1.canEquip(button.link);
							}
						});
					}
					else{
						event.finish();
					}
					'step 6'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						if(get.position(link)=='h'){
							event.targets[1].gain(link);
						}
						else if(get.position(link)=='e'){
							event.targets[1].equip(link);
						}
						else if(link.viewAs){
							event.targets[1].addJudge({name:link.viewAs},[link]);
						}
						else{
							event.targets[1].addJudge(link);
						}
						event.targets[0].$give(link,event.targets[1],false);
						game.log(event.targets[0],'的',get.position(link)=='h'?'一张手牌':link,'被移动给了',event.targets[1]);
						game.delay();
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='delay'&&current<0){
								if(target.countCards('j')) return;
								return 'zerotarget';
							}
						},
					},
				}
			},
			//杨彪
			jsrgzhaohan:{
				audio:'zhaohan',
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				//locked:false,
				filter:function(event,player){
					if(game.shuffleNumber==0) return player.isDamaged();
					return true;
				},
				content:function(){
					player[game.shuffleNumber>0?'loseHp':'recover']();
				}
			},
			jsrgrangjie:{
				audio:'rangjie',
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return player.canMoveCard();
				},
				check:function(event,player){
					return player.canMoveCard(true);
				},
				content:function(){
					'step 0'
					event.num=trigger.num;
					'step 1'
					event.num--;
					if(player.canMoveCard()) player.moveCard(true);
					'step 2'
					if(result.bool){
						var card=result.card;
						var suit=get.suit(card,false);
						var cards=Array.from(ui.discardPile.childNodes);
						var gains=[];
						var history=game.getGlobalHistory('cardMove',evt=>{
							if(evt.name=='lose') return evt.position==ui.discardPile;
							return evt.name=='cardsDiscard';
						});
						for(var i=history.length-1;i>=0;i--){
							var evt=history[i];
							var cards2=evt.cards.filter(card=>{
								return cards.contains(card)&&get.suit(card,false)==suit;
							});
							if(cards2.length){
								gains.addArray(cards2);
								cards.removeArray(cards2);
							}
							if(!cards.length) break;
						}
						if(gains.length){
							player.chooseButton(['让节：是否获得一张'+get.translation(suit)+'牌？',gains]).set('ai',get.buttonValue);
						}
						else event._result={bool:false};
					}
					'step 3'
					if(result.bool){
						player.gain(result.links,'gain2');
					}
					'step 4'
					if(event.num>0&&player.hasSkill('jsrgrangjie')){
						player.chooseBool(get.prompt2('jsrgrangjie')).set('ai',()=>_status.event.bool).set('bool',lib.skill.jsrgrangjie.check(trigger,player));
					}
					else event.finish();
					'step 5'
					if(result.bool){
						player.logSkill('jsrgrangjie');
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target._jsrgrangjie_aiChecking) return;
								target._jsrgrangjie_aiChecking=true;
								var moveCard=target.canMoveCard(true);
								delete target._jsrgrangjie_aiChecking;
								if(!moveCard||!target.hasFriend()) return;
								var num=1;
								if(get.attitude(player,target)>0){
									if(player.needsToDiscard()){
										num=0.5;
									}
									else{
										num=0.3;
									}
								}
								if(target.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						},
					},
				},
			},
			jsrgyizheng:{
				audio:'yizheng',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.countCards('h')>player.countCards('h')&&player.canCompare(current);
					});
				},
				filterTarget:function(card,player,current){
					return current.countCards('h')>player.countCards('h')&&player.canCompare(current);
				},
				content:function(){
					'step 0'
					player.chooseToCompare(target);
					'step 1'
					if(result.bool){
						target.skip('phaseDraw');
						target.addTempSkill('yizheng2',{player:'phaseDrawSkipped'});
						event.finish();
					}
					else{
						target.chooseControl('1','2','cancel').set('prompt','是否对'+get.translation(player)+'造成至多2点伤害？').set('ai',()=>{
							return _status.event.choice;
						}).set('choice',get.damageEffect(player,target,target)>0?(get.attitude(target,player)>0?0:1):'cancel2');
					}
					'step 2'
					if(result.control!='cancel2'){
						var num=result.index+1;
						target.line(player);
						player.damage(target,num);
					}
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(target.skipList.contains('phaseDraw')||target.hasSkill('pingkou')) return 0;
							var hs=player.getCards('h').sort(function(a,b){
								return b.number-a.number;
							});
							var ts=target.getCards('h').sort(function(a,b){
								return b.number-a.number;
							});
							if(!hs.length||!ts.length) return 0;
							if(hs[0].number>ts[0].number) return -1;
							return 0;
						},
					},
				},
			},
			//孔融
			jsrglirang:{
				audio:'splirang',
				trigger:{global:'phaseDrawBegin'},
				direct:true,
				filter:function(event,player){
					return event.player!=player&&!player.hasSkill('jsrglirang_used')&&player.countCards('he')>1;
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt('jsrglirang',trigger.player),'你可以选择两张牌，将这些牌交给该角色。若如此做，你获得其本回合弃牌阶段弃置的所有牌。',2,'he').set('ai',card=>{
						if(!_status.event.give) return 0;
						var player=_status.event.player,target=_status.event.target;
						return target.getUseValue(card)-player.getUseValue(card)+0.5;
					}).set('give',get.attitude(player,trigger.player)>0).set('target',trigger.player);
					'step 1'
					if(result.bool){
						player.logSkill('jsrglirang',trigger.player);
						var cards=result.cards;
						player.give(cards,trigger.player);
						player.addTempSkill('jsrglirang_used','roundStart');
						player.addTempSkill('jsrglirang_given');
						player.markAuto('jsrglirang_used',[trigger.player]);
					}
				},
				subSkill:{
					used:{
						charlotte:true,
						onremove:true,
						intro:{content:'本轮〖礼让〗目标：$'},
					},
					given:{
						audio:'splirang',
						trigger:{global:'phaseDiscardEnd'},
						filter:function(event,player){
							return event.player.hasHistory('lose',evt=>{
								return evt.type=='discard'&&evt.getParent('phaseDiscard')==event&&evt.cards2.filterInD('d').length>0;
							});
						},
						charlotte:true,
						prompt2:function(event,player){
							var cards=[];
							event.player.getHistory('lose',evt=>{
								if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event) cards.addArray(evt.cards2.filterInD('d'));
							});
							return '获得'+get.translation(cards);
						},
						content:function(){
							var cards=[];
							trigger.player.getHistory('lose',evt=>{
								if(evt.type=='discard'&&evt.getParent('phaseDiscard')==trigger) cards.addArray(evt.cards2.filterInD('d'));
							});
							player.gain(cards,'gain2');
						}
					}
				}
			},
			jsrgzhengyi:{
				audio:2,
				trigger:{player:'damageBegin4'},
				filter:function(event,player){
					var list=player.getStorage('jsrglirang_used');
					if(!list.length) return false;
					return !player.getHistory('damage').length&&list[0].isIn();
				},
				direct:true,
				content:function(){
					'step 0'
					var target=player.getStorage('jsrglirang_used')[0];
					event.target=target;
					target.chooseBool('是否对'+get.translation(player)+'发动【争义】？','将此'+(trigger.source?'来源为'+get.translation(trigger.source):'无来源')+'的'+trigger.num+'点伤害转移给你').set('ai',()=>{
						return _status.event.bool;
					}).set('bool',get.damageEffect(player,trigger.source,target)>get.damageEffect(target,trigger.source,target));
					'step 1'
					if(result.bool){
						target.logSkill('jsrgzhengyi',player);
						trigger.cancel();
						target.damage(trigger.source,trigger.nature,trigger.num).set('card',trigger.card).set('cards',trigger.cards);
					}
				}
			},
			//朱儁
			jsrgfendi:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.targets.length==1&&event.card.name=='sha'&&event.targets[0].countCards('h')>0;
				},
				usable:1,
				logTarget:'target',
				content:function(){
					'step 0'
					var target=trigger.target;
					event.target=target;
					player.choosePlayerCard(target,'h',true,[1,Infinity],'分敌：展示'+get.translation(target)+'的任意张手牌').set('ai',button=>{
						if(_status.event.all) return 1;
						if(ui.selected.buttons.length) return 0;
						return Math.random();
					}).set('all',!target.mayHaveShan()&&Math.random()<0.75).set('forceAuto',true);
					'step 1'
					if(result.bool){
						var cards=result.cards;
						target.showCards(cards,get.translation(player)+'对'+get.translation(target)+'发动了【分敌】');
						target.addGaintag(cards,'jsrgfendi_tag');
						target.addTempSkill('jsrgfendi_blocker');
						player.addTempSkill('jsrgfendi_gain');
						if(!trigger.card.storage) trigger.card.storage={};
						trigger.card.storage.jsrgfendi=cards.slice();
						player.storage.jsrgfendi_gain=target;
					}
					else player.storage.counttrigger.jsrgfendi--;
				},
				subSkill:{
					blocker:{
						trigger:{
							player:['damageBefore','damageCancelled','damageZero'],
							target:['shaMiss','useCardToExcluded','useCardToEnd'],
							global:['useCardEnd'],
						},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							player.removeSkill('jsrgfendi_blocker');
						},
						mod:{
							cardEnabled:function(card,player){
								if(card.cards){
									for(var i of card.cards){
										if(!i.hasGaintag('jsrgfendi_tag')) return false;
									}
								}
								else if(get.itemtype(card)=='card'){
									if(!card.hasGaintag('jsrgfendi_tag')) return false;
								}
							},
							cardRespondable:function(card,player){
								return lib.skill.jsrgfendi.cardEnabled.apply(this,arguments);
							},
							cardSavable:function(card,player){
								return lib.skill.jsrgfendi.cardEnabled.apply(this,arguments);
							},
						},
					},
					gain:{
						trigger:{global:'damageSource'},
						charlotte:true,
						forced:true,
						direct:true,
						onremove:true,
						filter:function(event,player){
							if(!event.card||!event.card.storage) return false;
							var cards=event.card.storage.jsrgfendi;
							var target=player.storage.jsrgfendi_gain;
							if(!cards||!target||!target.isIn()) return false;
							var cardsx=target.getCards('h');
							cardsx.addArray(Array.from(ui.discardPile));
							return cards.some(i=>cardsx.contains(i));
							//target.hasCard(card=>{
							//	return card.hasGaintag('jsrgfendi_tag');
							//},'h');
						},
						content:function(){
							var target=player.storage.jsrgfendi_gain;
							player.logSkill('jsrgfendi_gain',target);
							var cardsx=target.getCards('h');
							cardsx.addArray(Array.from(ui.discardPile));
							var cards=trigger.card.storage.jsrgfendi.filter(i=>cardsx.contains(i));
							player.gain(cards,'give');
						}
					}
				}
			},
			jsrgjuxiang:{
				audio:2,
				trigger:{
					player:'gainAfter',
					global:'loseAsyncAfter',
				},
				filter:function(event,player){
					var evt=event.getParent('phaseDraw');
					if(evt&&evt.name=='phaseDraw') return false;
					var hs=player.getCards('h');
					var cards=event.getg(player).filter(i=>hs.contains(i));
					if(!cards.length) return false;
					for(var card of cards){
						if(!lib.filter.cardDiscardable(card,player,'jsrgjuxiang')) return false;
					}
					return true;
				},
				check:function(event,player){
					var target=_status.currentPhase;
					if(!target||get.attitude(player,target)<=0) return false;
					var evt=event.getParent('phaseDiscard'),evt2=event.getParent('phaseJieshu');
					if(evt&&evt.name=='phaseDiscard'||evt2&&evt.name=='phaseJieshu') return false;
					if(target.getCardUsable({name:'sha'})>=target.countCards('hs','sha')) return false;
					if(!target.hasValueTarget({name:'sha'})) return false;
					var hs=player.getCards('h');
					var cards=event.getg(player).filter(i=>hs.contains(i));
					var val=0;
					for(var i of cards) val+=get.value(i);
					if(val<10) return true;
					return false;
				},
				prompt2:function(event,player){
					var hs=player.getCards('h');
					var cards=event.getg(player).filter(i=>hs.contains(i));
					var target=_status.currentPhase;
					var str='弃置'+get.translation(cards);
					if(target&&target.isIn()){
						var list=[];
						for(var card of cards){
							list.add(get.suit(card,player));
						}
						var num=list.length;
						str+='，然后令'+get.translation(target)+'于此回合额定的出牌阶段内使用【杀】的次数上限+'+num;
					}
					return str;
				},
				content:function(){
					'step 0'
					var hs=player.getCards('h');
					var cards=trigger.getg(player).filter(i=>hs.contains(i));
					var list=[];
					for(var card of cards){
						list.add(get.suit(card,player));
					}
					event.num=list.length;
					player.discard(cards);
					'step 1'
					var target=_status.currentPhase;
					if(target&&target.isIn()){
						target.addTempSkill('jsrgjuxiang_sha');
						target.addMark('jsrgjuxiang_sha',num,false);
						var evt=trigger.getParent('phaseUse');
						if(evt&&evt.name=='phaseUse'&&!evt.skill){
							evt.player.addTempSkill('jsrgjuxiang_buff','phaseUseAfter');
							evt.player.addMark('jsrgjuxiang_buff',num,false);
						}
					}
				},
				subSkill:{
					sha:{
						trigger:{global:'phaseUseBegin'},
						filter:function(event,player){
							return !event.skill;
						},
						silent:true,
						charlotte:true,
						forced:true,
						onremove:true,
						content:function(){
							trigger.player.addTempSkill('jsrgjuxiang_buff','phaseUseAfter');
							trigger.player.addMark('jsrgjuxiang_buff',player.countMark('jsrgjuxiang_sha'),false);
						}
					},
					buff:{
						charlotte:true,
						intro:{content:'使用【杀】的次数上限+#'},
						onremove:true,
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('jsrgjuxiang_buff');
							},
						}
					}
				}
			},
			//刘备
			jsrgjishan:{
				audio:2,
				trigger:{global:'damageBegin4'},
				usable:1,
				filter:function(event,player){
					return player.hp>0;
				},
				logTarget:'player',
				onremove:true,
				prompt2:'失去1点体力并防止此伤害，然后你与其各摸一张牌',
				check:function(event,player){
					return get.damageEffect(event.player,event.source,player,event.nature)*Math.sqrt(event.num)<=get.effect(player,{name:'losehp'},player,player);
				},
				group:'jsrgjishan_recover',
				content:function(){
					'step 0'
					trigger.cancel();
					player.loseHp();
					player.markAuto('jsrgjishan',[trigger.player]);
					'step 1'
					if(player.isIn()&&trigger.player.isIn()){
						var targets=[player,trigger.player];
						targets.sortBySeat(_status.currentPhase);
						targets[0].draw('nodelay');
						targets[1].draw();
					}
				},
				intro:{content:'已帮助$抵挡过伤害'},
				ai:{expose:0.2},
				subSkill:{
					recover:{
						audio:'jsrgjishan',
						trigger:{source:'damageSource'},
						filter:function(event,player){
							return game.hasPlayer(current=>{
								return current.isMinHp()&&player.getStorage('jsrgjishan').contains(current);
							});
						},
						usable:1,
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('jsrgjishan_recover'),'令一名体力值最小且你对其发动过〖积善①〗的角色回复1点体力',(card,player,target)=>{
								return target.isMinHp()&&player.getStorage('jsrgjishan').contains(target);
							}).set('ai',target=>{
								return get.recoverEffect(target,_status.event.player,_status.event.player);
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('jsrgjishan_recover',target);
								target.recover();
							}
							else player.storage.counttrigger.jsrgjishan_recover--;
						}
					}
				}
			},
			jsrgzhenqiao:{
				audio:2,
				trigger:{player:'useCardToTargeted'},
				forced:true,
				shaRelated:true,
				filter:function(event,player){
					return event.isFirstTarget&&event.card.name=='sha'&&player.hasEmptySlot(1);
				},
				content:function(){
					// trigger.getParent().targets=trigger.getParent().targets.concat(trigger.targets);
					// trigger.getParent().triggeredTargets4=trigger.getParent().triggeredTargets4.concat(trigger.targets);
					trigger.getParent().effectCount++;
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(player._jsrgzhenqiao_aiChecking) return;
							if(target==player&&get.subtype(card)=='equip1'&&!player.getEquip(1)){
								player._jsrgzhenqiao_aiChecking=true;
								var eff=get.effect(target,card,player,player);
								delete player._jsrgzhenqiao_aiChecking;
								if(eff<3) return 'zerotarget';
							}
						}
					}
				},
				mod:{
					attackRange:function(player,num){
						return num+1;
					},
				}
			},
			//王允
			jsrgshelun:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(current=>player.inRange(current));
				},
				filterTarget:function(card,player,target){
					return player.inRange(target);
				},
				content:function(){
					var num=player.countCards('h');
					var targets=game.filterPlayer(current=>{
						return current.countCards('h')<=num&&current!=target;
					});
					player.chooseToDebate(targets).set('callback',function(){
						var result=event.debateResult;
						if(result.bool&&result.opinion){
							var opinion=result.opinion;
							var target=event.getParent(2).target;
							if(opinion=='red') player.discardPlayerCard(target,'he',true);
							else target.damage();
						}
					}).set('ai',card=>{
						var player=_status.event.player;
						var color=(player==_status.event.source||get.damageEffect(_status.event.getParent(2).target,player,player)>0)?'black':'red';
						var val=5-get.value(card);
						if(get.color(card)==color) val+=10;
						return val;
					}).set('aiCard',target=>{
						var color=(target==_status.event.source||get.damageEffect(_status.event.getParent(2).target,target,target)>0)?'black':'red';
						var hs=target.getCards('h',{color:color});
						if(!hs.length) hs=target.getCards('h');
						return {bool:true,cards:[hs.randomGet()]};
					}).set('target',target);
				},
				ai:{
					order:8,
					expose:0.2,
					result:{target:-1},
				}
			},
			jsrgfayi:{
				audio:2,
				trigger:{global:'chooseToDebateAfter'},
				filter:function(event,player){
					if(!event.targets.contains(player)) return false;
					if(event.red.map(i=>i[0]).contains(player)) return event.black.length;
					if(event.black.map(i=>i[0]).contains(player)) return event.red.length;
					return false;
				},
				direct:true,
				content:function(){
					'step 0'
					var targets=[];
					if(trigger.red.map(i=>i[0]).contains(player)) targets=trigger.black;
					if(trigger.black.map(i=>i[0]).contains(player)) targets=trigger.red;
					player.chooseTarget(get.prompt('jsrgfayi'),'对一名与你意见不同的角色造成1点伤害',(card,player,target)=>{
						return _status.event.targets.contains(target);
					}).set('targets',targets.map(i=>i[0])).set('ai',target=>{
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('jsrgfayi',target);
						target.damage();
					}
				}
			},
			jsrgtushe:{
				audio:'xinfu_tushe',
				trigger:{
					player:'useCardToPlayered',
				},
				filter:function (event,player){
					if(get.type(event.card)=='equip') return false;
					if(event.getParent().triggeredTargets3.length>1) return false;
					return event.targets.length>0;
				},
				check:function(event,player){
					return !player.countCards('h',{type:'basic'});
				},
				content:function (){
					'step 0'
					player.showHandcards();
					'step 1'
					if(player.countCards('h',{type:'basic'})) event.finish();
					else player.chooseBool('图射：是否摸'+get.cnNumber(trigger.targets.length)+'张牌？').set('ai',()=>1);
					'step 2'
					if(result.bool){
						player.draw(trigger.targets.length);
					}
				},
				ai:{
					presha:true,
					pretao:true,
					threaten:1.8,
				},
			},
			jsrgtongjue:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				zhuSkill:true,
				filter:function(event,player){
					return player.hasZhuSkill('jsrgtongjue')&&game.hasPlayer(current=>current!=player&&current.group=='qun');
				},
				filterCard:true,
				selectCard:[1,Infinity],
				filterTarget:function(card,player,target){
					return target!=player&&target.group=='qun';
				},
				selectTarget:[1,Infinity],
				filterOk:function(){
					return ui.selected.cards.length==ui.selected.targets.length;
				},
				check:function(card){
					var player=_status.event.player;
					if(player.hasCard(card=>{
						return player.hasValueTarget(card);
					},'hs')){
						return 3-player.getUseValue(card);
					}
					return 3-get.value(card);
				},
				multiline:true,
				multitarget:true,
				delay:false,
				discard:false,
				lose:false,
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<targets.length;i++){
						var target=targets[i];
						var card=cards[i];
						list.push([target,card]);
					}
					game.loseAsync({
						gain_list:list,
						player:player,
						cards:cards,
						giver:player,
						animate:'giveAuto',
					}).setContent('gaincardMultiple');
					'step 1'
					player.addTempSkill('jsrgtongjue_blocker');
					player.markAuto('jsrgtongjue_blocker',targets)
				},
				ai:{
					order:5,
					result:{
						target:1,
					}
				},
				subSkill:{
					blocker:{
						charlotte:true,
						onremove:true,
						mod:{
							playerEnabled:function(card,player,target){
								if(player.getStorage('jsrgtongjue_blocker').contains(target)) return false;
							},
						},
						mark:true,
						intro:{content:'$已经立牧自居，不可接近'},
					}
				}
			},
			//404曹操
			jsrgzhenglve:{
				audio:2,
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					var zhu=get.zhu(player)||game.findPlayer(current=>current.getSeatNum()==1);
					return event.player==zhu;
				},
				locked:false,
				group:'jsrgzhenglve_damage',
				prompt2:function(event,player){
					var num=Math.min(event.player.getHistory('sourceDamage').length>0?1:2,game.countPlayer(current=>{
						return !current.hasMark('jsrgzhenglve_mark');
					}));
					if(num==0) return '你可以摸一张牌';
					return '你可以摸一张牌并令'+get.cnNumber(num)+'名角色获得“猎”标记';
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					var damaged=trigger.player.getHistory('sourceDamage').length>0;
					var num=damaged?1:2;
					var targets=game.filterPlayer(current=>{
						return !current.hasMark('jsrgzhenglve_mark');
					});
					if(!targets.length) event.finish();
					else if(targets.length<=num) event._result={bool:true,targets:targets};
					else player.chooseTarget('令'+(num>1?'至多':'')+get.cnNumber(num)+'名角色获得“猎”标记',true,[1,num],(card,player,target)=>{
						return !target.hasMark('jsrgzhenglve_mark');
					}).set('ai',target=>{
						var att=get.attitude(_status.event.player,target);
						return 100-att;
					});
					'step 2'
					if(result.bool){
						var targets=result.targets;
						player.line(targets);
						targets.forEach(i=>i.addMark('jsrgzhenglve_mark',1));
					}
				},
				mod:{
					cardUsableTarget:function(card,player,target){
						if(target.hasMark('jsrgzhenglve_mark')) return true;
					},
					targetInRange:function(card,player,target){
						if(target.hasMark('jsrgzhenglve_mark')) return true;
					},
				},
				subSkill:{
					damage:{
						audio:'jsrgzhenglve',
						trigger:{source:'damageSource'},
						usable:1,
						filter:function(event,player){
							return event.player.hasMark('jsrgzhenglve_mark');
						},
						prompt2:function(event,player){
							var cards=event.cards||[];
							return '摸一张牌'+(cards.filterInD().length?'并获得'+get.translation(event.cards.filterInD()):'');
						},
						content:function(){
							'step 0'
							player.draw();
							var cards=trigger.cards;
							if(cards&&cards.filterInD().length){
								player.gain(cards.filterInD(),'gain2');
							}
						}
					},
					mark:{
						marktext:'猎',
						intro:{
							name:'猎(政略)',
							name2:'猎',
							markcount:()=>0,
							content:'已拥有“猎”标记',
						}
					}
				}
			},
			jsrghuilie:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				juexingji:true,
				forced:true,
				skillAnimation:true,
				animationColor:'thunder',
				derivation:['jsrgpingrong','feiying'],
				filter:function(event,player){
					return game.countPlayer(current=>current.hasMark('jsrgzhenglve_mark'))>2;
				},
				content:function(){
					'step 0'
					player.awakenSkill('jsrghuilie');
					player.loseMaxHp();
					'step 1'
					player.addSkillLog('jsrgpingrong');
					player.addSkillLog('feiying');
				}
			},
			jsrgpingrong:{
				audio:2,
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					return !player.hasSkill('jsrgpingrong_used')&&game.hasPlayer(current=>current.hasMark('jsrgzhenglve_mark'));
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('jsrghuilie'),'移去一名角色的“猎”，然后你执行一个额外回合。若你在此额外回合内未造成伤害，则你失去1点体力。',(card,player,target)=>{
						return target.hasMark('jsrgzhenglve_mark');
					}).set('ai',target=>{
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('jsrgpingrong',target);
						player.addTempSkill('jsrgpingrong_used','roundStart');
						target.removeMark('jsrgzhenglve_mark',target.countMark('jsrgzhenglve_mark'));
						player.insertPhase();
						player.addSkill('jsrgpingrong_check');
					}
				},
				subSkill:{
					used:{charlotte:true},
					check:{
						audio:'jsrgpingrong',
						trigger:{player:'phaseAfter'},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return event.skill=='jsrgpingrong'&&!player.getHistory('sourceDamage').length;
						},
						content:function(){
							player.loseHp();
						}
					}
				}
			},
			//南华老仙
			jsrgshoushu:{
				audio:2,
				forced:true,
				trigger:{
					player:'enterGame',
					global:'phaseBefore',
				},
				filter:function(event,player){
					if(game.hasPlayer(function(current){
						return current.countCards('hej','taipingyaoshu');
					})) return false;
					return event.name!='phase'||game.phaseNumber==0;
				},
				direct:true,
				group:'jsrgshoushu_destroy',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('jsrgshoushu'),'将【太平要术】置入一名角色的装备区',(card,player,target)=>{
						var card={name:'taipingyaoshu'};
						return target.canEquip(card,true);
					}).set('ai',target=>{
						return target.getUseValue({name:'taipingyaoshu'})*get.attitude(_status.event.player,target);
					})
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('jsrgshoushu',target);
						if(!lib.inpile.contains('taipingyaoshu')){
							lib.inpile.push('taipingyaoshu');
						}
						event.card=game.createCard2('taipingyaoshu','heart',3);
					}
					else event.finish();
					'step 2'
					if(card) target.equip(card);
				},
				subSkill:{
					destroy:{
						audio:'jsrgshoushu',
						trigger:{
							global:['loseEnd','equipEnd','addJudgeEnd','gainEnd','loseAsyncEnd','addToExpansionEnd'],
						},
						forced:true,
						filter:function(event,player){
							return game.hasPlayer(current=>{
								var evt=event.getl(current);
								if(evt&&evt.es) return evt.es.some(i=>i.name=='taipingyaoshu');
								return false;
							});
						},
						content:function(){
							var cards=[];
							game.countPlayer(current=>{
								var evt=trigger.getl(current);
								if(evt&&evt.es) return cards.addArray(evt.es.filter(i=>i.name=='taipingyaoshu'));
							});
							game.cardsGotoSpecial(cards);
							game.log(cards,'被销毁了');
						}
					}
				}
			},
			jsrgxundao:{
				audio:2,
				trigger:{player:'judge'},
				filter:function(event,player){
					return game.hasPlayer(current=>current.countCards('he'));
				},
				direct:true,
				content:function(){
					'step 0'
					var prompt2=get.translation(player)+'（你）的'+(trigger.judgestr||'')+'判定为'+
						get.translation(player.judging[0])+'，'+'是否令至多两名角色依次弃置一张牌，然后选择其中一张作为新判定牌？';
					player.chooseTarget(get.prompt('jsrgxundao'),prompt2,[1,2],(card,player,target)=>{
						return target.countCards('he');
					}).set('ai',target=>{
						var player=_status.event.player;
						if(!_status.event.todiscard) return 0;
						if(_status.event.todiscard!='all'){
							if(target==_status.event.todiscard) return 100;
						}
						return get.effect(target,{name:'guohe_copy2'},player,player)/2;
					}).set('todiscard',function(){
						if(trigger.judgestr=='闪电'&&get.damageEffect(player,null,player,'thunder')>=0) return 'all';
						var friends=game.filterPlayer(i=>get.attitude(i,player)>0);
						for(var friend of friends){
							var cardsx=friend.getCards('he',card=>trigger.judge(card)>0);
							cardsx.sort((a,b)=>{
								return get.value(a)-get.value(b);
							});
							if(cardsx.length){
								var card=cardsx[0];
								if(trigger.judge(player.judging[0])>=0){
									if(get.value(card)>4) return false;
								}
								return get.owner(card);
							}
						}
						return 'all';
					}())
					'step 1'
					if(result.bool){
						var targets=result.targets;
						targets.sortBySeat(_status.currentPhase);
						event.targets=targets;
						player.logSkill('jsrgxundao',targets);
						event.cards=[];
					}
					else event.finish();
					'step 2'
					var target=targets.shift();
					target.chooseToDiscard('寻道：请弃置一张牌'+(target==player?'':'，可能被作为新判定牌'),'he',true).set('ai',card=>{
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0.1;
						if(attitude>0){
							return result+0.01;
						}
						else{
							return 0.01-result;
						}
					});
					'step 3'
					if(result.bool){
						event.cards.addArray(result.cards);
					}
					if(targets.length) event.goto(2);
					'step 4'
					var cards=event.cards.filterInD('d');
					if(cards.length){
						player.chooseButton(['寻道：选择一张作为新判定牌',cards],true).set('ai',button=>{
							return trigger.judge(button.link);
						});
					}
					else event.finish();
					'step 5'
					if(result.bool){
						var card=result.links[0];
						event.card=card;
						game.cardsGotoOrdering(card).relatedEvent=trigger;
					}
					else event.finish();
					'step 6'
					if(player.judging[0].clone){
						game.broadcastAll(function(card,card2,player){
							if(card.clone){
								card.clone.classList.remove('thrownhighlight');
							}
							var node=player.$throwordered(card2.copy(),true);
							node.classList.add('thrownhighlight');
							ui.arena.classList.add('thrownhighlight');
						},player.judging[0],card,player);
						game.addVideo('deletenode',player,get.cardsInfo([player.judging[0].clone]));
					}
					game.cardsDiscard(player.judging[0]);
					player.judging[0]=card;
					trigger.orderingCards.add(card);
					game.log(player,'的判定牌改为',card);
					game.delay(2);
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1,
					}
				}
			},
			jsrglinghua:{
				audio:2,
				trigger:{
					player:['phaseZhunbeiBegin','phaseJieshuBegin'],
				},
				prompt2:function(event,player){
					var zhunbei=event.name=='phaseZhunbei';
					return '进行目标为你'+(zhunbei?'':'且效果反转')+'的【闪电】判定。若你未因此受到伤害，你可以'+(zhunbei?'令一名角色回复1点体力':'对一名角色造成1点雷电伤害');
				},
				check:function(event,player){
					var e2=player.getEquip(2);
					if(e2&&e2.name=='taipingyaoshu') return true;
					if(event.name=='phaseZhunbei'&&game.hasPlayer(current=>{
						return get.recoverEffect(current,player,player)>=0;
					})) return true;
					if(event.name=='phaseJieshu'&&game.hasPlayer(current=>{
						return get.damageEffect(current,player,player,'thunder')>=0;
					})&&player.hasSkillTag('rejudge')&&player.hasCard(card=>{
						return lib.card.shandian.judge(card)<0;
					},'he')) return true;
					return false;
				},
				content:function(){
					'step 0'
					var next=event.executeDelayCardEffect=player.executeDelayCardEffect('shandian');
					if(event.triggername!='phaseJieshuBegin') return;
					next.judge=card=>-lib.card.shandian.judge(card)-4;
					next.judge2=result=>!lib.card.shandian.judge2(result);
					'step 1'
					var executeDelayCardEffect=event.executeDelayCardEffect;
					if(!player.hasHistory('damage',evt=>evt.getParent(2)==executeDelayCardEffect)){
						if(trigger.name=='phaseZhunbei'){
							player.chooseTarget('灵化：是否令一名角色回复1点体力？').set('ai',target=>{
								var player=_status.event.player;
								return get.recoverEffect(target,player,player);
							});
						}
						else{
							player.chooseTarget('灵化：是否对一名角色造成1点雷电伤害？').set('ai',target=>{
								var player=_status.event.player;
								return get.damageEffect(target,player,player,'thunder');
							});
						}
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target);
						if(trigger.name=='phaseZhunbei') target.recover();
						else target.damage('thunder');
					}
				},
				ai:{
					threaten:2.8
				}
			},
		},
		characterReplace:{},
		dynamicTranslate:{
			jsrgshichong:function(player){
				if(player.storage.jsrgshichong) return '转换技。当你使用牌指定其他角色为唯一目标后，阴：你可以获得目标角色一张手牌；<span class="bluetext">阳：目标角色可以交给你一张手牌</span>。';
				return '转换技。当你使用牌指定其他角色为唯一目标后，<span class="bluetext">阴：你可以获得目标角色一张手牌</span>；阳：目标角色可以交给你一张手牌。';
			},
		},
		translate:{
			//江山如故·起
			jsrg_liuhong:'起刘宏',
			jsrg_liuhong_prefix:'起',
			jsrgchaozheng:'朝争',
			jsrgchaozheng_info:'准备阶段，你可以令所有其他角色议事。若结果为：红色，意见为红色的角色各回复1点体力；黑色，意见为红色的角色各失去1点体力。然后若所有意见均相同，你摸X张牌（X为此次议事的角色数）。',
			jsrgshenchong:'甚宠',
			jsrgshenchong_info:'限定技。出牌阶段，你可以令一名其他角色获得〖飞扬〗、〖跋扈〗。若如此做，当你死亡时，其失去所有技能并弃置所有手牌。',
			jsrgjulian:'聚敛',
			jsrgjulian_info:'主公技。①其他群势力角色每回合限两次。当其不于摸牌阶段且不因〖聚敛〗摸牌后，其可以摸一张牌。②结束阶段，你可以获得所有其他群势力角色各一张牌。',
			jsrgfeiyang:'飞扬',
			jsrgfeiyang_info:'判定阶段开始时，若你的判定区里有牌，你可以弃置两张手牌并弃置你判定区里的一张牌。',
			jsrgbahu:'跋扈',
			jsrgbahu_info:'锁定技。①准备阶段，你摸一张牌。②你使用【杀】的次数上限+1。',
			jsrg_hejin:'起何进',
			jsrg_hejin_prefix:'起',
			jsrgzhaobing:'诏兵',
			jsrgzhaobing_info:'结束阶段，你可以弃置所有手牌，然后令至多X名其他角色依次选择一项：1.正面向上交给你一张【杀】；2.失去1点体力（X为你本次弃置的牌数）。',
			jsrgzhuhuan:'诛宦',
			jsrgzhuhuan_info:'准备阶段，你可以展示所有手牌并弃置所有【杀】，然后令一名其他角色选择一项：1.弃置等量的牌，然后受到1点伤害；2.令你摸等量的牌，然后你回复1点体力。',
			jsrgyanhuo:'延祸',
			jsrgyanhuo_info:'锁定技。当你死亡时，你增加如下全局技能：当有角色使用【杀】时，此【杀】的伤害值基数+1。',
			jsrg_sunjian:'起孙坚',
			jsrg_sunjian_prefix:'起',
			jsrgpingtao:'平讨',
			jsrgpingtao_info:'出牌阶段限一次。你可以令一名其他角色选择一项：1.交给你一张牌，然后你于此回合使用【杀】的次数上限+1；2.令你视为对其使用一张【杀】。',
			jsrgjuelie:'绝烈',
			jsrgjuelie_info:'当你使用【杀】指定一名角色为目标后，你可以弃置任意张牌并弃置其等量的牌，然后若你的手牌数或体力值最小，此【杀】对其的伤害基数+1。',
			jsrg_huangfusong:'起皇甫嵩',
			jsrg_huangfusong_prefix:'起',
			jsrgguanhuo:'观火',
			jsrgguanhuo_info:'①出牌阶段，你可以视为使用一张【火攻】。②当你因〖观火①〗使用的【火攻】结算结束后，若此牌未造成过伤害，且：若{你此阶段发动〖观火①〗的次数为1，则你于此阶段造成渠道为【火攻】的伤害时，此伤害+1}，否则你失去〖观火〗。',
			jsrgjuxia:'居下',
			jsrgjuxia_info:'每回合限一次。当其他角色使用牌指定你为目标后，若其技能数多于你，其可以令此牌对你无效，然后令你摸两张牌。',
			jsrg_xushao:'起许劭',
			jsrg_xushao_prefix:'起',
			jsrgyingmen:'盈门',
			jsrgyingmen_info:'锁定技。①游戏开始时，你将武将牌堆中随机四张武将牌置于你的武将牌上，称为“访客”。②回合开始时，若你的“访客”数小于4，你随机从武将牌堆中将“访客”补至四张。',
			jsrgpingjian:'评鉴',
			jsrgpingjian_info:'你可以于满足你“访客”上的一个无技能标签或仅有锁定技标签的技能条件的时机发动此技能，然后你选择移去一张“访客”。若移去的是本次发动技能的“访客”，你摸一张牌。',
			jsrg_dongbai:'起董白',
			jsrg_dongbai_prefix:'起',
			jsrgshichong:'恃宠',
			jsrgshichong_info:'转换技。当你使用牌指定其他角色为唯一目标后，阴：你可以获得目标角色一张手牌；阳：目标角色可以交给你一张手牌。',
			jsrglianzhu:'连诛',
			jsrglianzhu_info:'出牌阶段限一次。你可以展示一张黑色手牌并交给一名其他角色，然后视为你对所有与其势力相同的其他角色依次使用一张【过河拆桥】。',
			jsrg_qiaoxuan:'起桥玄',
			jsrg_qiaoxuan_prefix:'起',
			jsrgjuezhi:'绝质',
			jsrgjuezhi_info:'①当你失去一张装备区里的装备牌后，你可以废除对应的装备栏。②你的回合每阶段限一次。当你使用牌对目标角色造成伤害时，你令此伤害+X（X为其装备区里的牌与你已废除的装备栏中相同副类别的数量）。',
			jsrgjizhao:'急召',
			jsrgjizhao_info:'准备阶段或结束阶段，你可以令一名角色选择一项：1.使用一张手牌；2.令你可以移动其区域里的一张牌。',
			jsrg_yangbiao:'起杨彪',
			jsrg_yangbiao_prefix:'起',
			jsrgzhaohan:'昭汉',
			jsrgzhaohan_info:'锁定技。准备阶段，若本局游戏：未洗过牌，你回复1点体力；洗过牌，你失去1点体力。',
			jsrgrangjie:'让节',
			jsrgrangjie_info:'当你受到1点伤害后，你可以移动场上的一张牌，然后你可以于弃牌堆中选择获得一张本回合进入弃牌堆且与此牌花色相同的牌。',
			jsrgyizheng:'义争',
			jsrgyizheng_info:'出牌阶段限一次。你可以与一名手牌数大于你的角色拼点。若你：赢，其跳过下一个摸牌阶段；没赢，其可以对你造成至多2点伤害。',
			jsrg_kongrong:'起孔融',
			jsrg_kongrong_prefix:'起',
			jsrglirang:'礼让',
			jsrglirang_info:'每轮限一次。其他角色的摸牌阶段开始时，你可以交给其两张牌。然后此回合的弃牌阶段结束时，你可以获得所有其于此阶段因弃置进入弃牌堆的牌。',
			jsrgzhengyi:'争义',
			jsrgzhengyi_info:'当你每回合首次受到伤害时，本轮因〖礼让〗得到过牌的其他角色可以将此伤害转移给其。',
			jsrg_zhujun:'起朱儁',
			jsrg_zhujun_prefix:'起',
			jsrgfendi:'分敌',
			jsrgfendi_tag:'分敌',
			jsrgfendi_info:'每回合限一次。当你使用【杀】指定唯一目标后，你可以展示其任意张手牌，令其不能使用或打出对应实体牌不全为这些牌的牌直到此【杀】结算结束。然后当此【杀】对其造成伤害后，你于其手牌区或弃牌堆获得这些牌。',
			jsrgjuxiang:'拒降',
			jsrgjuxiang_info:'当你不于摸牌阶段得到牌后，你可以弃置之，令当前回合角色于此回合额定的出牌阶段内使用【杀】的次数上限+X（X为你以此法弃置的牌的花色数）。',
			jsrg_liubei:'起刘备',
			jsrg_liubei_prefix:'起',
			jsrgjishan:'积善',
			jsrgjishan_info:'①每回合限一次。当一名角色受到伤害时，你可以失去1点体力并防止此伤害，然后你与其各摸一张牌。②每回合限一次。当你造成伤害后，你可以令一名体力值最小且你对其发动过〖积善①〗的角色回复1点体力。',
			jsrgzhenqiao:'振鞘',
			jsrgzhenqiao_info:'锁定技。①你的攻击范围+1。②当你使用【杀】指定目标后，若你的武器栏为空且未废除，你令此【杀】的效果额外结算一次。',
			jsrg_wangyun:'起王允',
			jsrg_wangyun_prefix:'起',
			jsrgshelun:'赦论',
			jsrgshelun_info:'出牌阶段限一次。你可以选择一名你攻击范围内的角色，然后令除其外所有手牌数不大于你的角色议事。若结果为：红色，你弃置其一张牌；黑色，你对其造成1点伤害。',
			jsrgfayi:'伐异',
			jsrgfayi_info:'当你议事结算结束后，你可以对一名意见与你不同的角色造成1点伤害。',
			jsrg_liuyan:'起刘焉',
			jsrg_liuyan_prefix:'起',
			jsrgtushe:'图射',
			jsrgtushe_info:'当你使用非装备牌指定目标后，你可以展示所有手牌（无牌则不展示）。若你没有基本牌，你可以摸X张牌（X为此牌指定的目标数）。',
			jsrgtongjue:'通绝',
			jsrgtongjue_info:'主公技。出牌阶段限一次。你可以将任意张牌交给等量名其他群势力角色。然后你不能使用牌指定这些角色为目标直到回合结束。',
			jsrg_caocao:'起曹操',
			jsrg_caocao_prefix:'起',
			jsrgzhenglve:'政略',
			jsrgzhenglve_info:'①主公的回合结束时，你可以摸一张牌，然后令一名没有“猎”标记的角色获得“猎”（若主公本回合没有造成过伤害，则改为至多两名）。②你对有“猎”的角色使用牌无距离和次数限制。③每回合限一次。当你对有“猎”的角色造成伤害后，你可以摸一张牌并获得造成此伤害的牌。',
			jsrghuilie:'会猎',
			jsrghuilie_info:'觉醒技。准备阶段，若有“猎”的角色数大于2，你减1点体力上限，然后获得〖平戎〗和〖飞影〗。',
			jsrgpingrong:'平戎',
			jsrgpingrong_info:'每轮限一次。一名角色的回合结束时，你可以移去一名角色的“猎”，然后你于此回合后执行一个额外回合。该回合结束后，若你于此回合未造成过伤害，你失去1点体力。',
			jsrg_nanhualaoxian:'起南华老仙',
			jsrg_nanhualaoxian_prefix:'起',
			jsrgshoushu:'授术',
			jsrgshoushu_info:'锁定技。①游戏开始时，若场上没有【太平要术】，你可以从游戏外将【太平要术】置于一名角色的装备区内。②当【太平要术】离开一名角色的装备区后，你令此牌销毁。',
			jsrgxundao:'寻道',
			jsrgxundao_info:'当你的判定牌生效前，你可以令至多两名角色依次弃置一张牌，然后你选择一张以此法弃置且位于弃牌堆中的牌代替此判定牌。',
			jsrglinghua:'灵化',
			jsrglinghua_info:'①准备阶段，你可以执行目标角色为你的【闪电】效果。若你未因此受到伤害，你可以令一名角色回复1点体力。②结束阶段，你可以执行目标角色为你且判定效果反转的【闪电】效果。若你未因此受到伤害，你可以对一名角色造成1点雷电伤害。',
			sbyingmen:'盈门',
			sbyingmen_info:'锁定技。①游戏开始时，你将武将牌堆中随机四张武将牌置于你的武将牌上，称为“访客”。②回合开始时，若你的“访客”数小于4，你随机从武将牌堆中将“访客”补至四张。',
			sbpingjian:'评鉴',
			sbpingjian_info:'你可以于满足你“访客”上的一个无技能标签或仅有锁定技标签的技能条件的时机发动此技能，然后你选择移去一张“访客”。若移去的是本次发动技能的“访客”，则你于此技能结算结束时摸一张牌。',
			//江山如故·承
			jsrg_sunce:'承孙策',
			jsrg_sunce_prefix:'承',
			jsrgduxing:'独行',
			jsrgduxing_info:'出牌阶段限一次。你可以视为使用一张可以指定任意名目标角色的【决斗】，且所有目标角色的手牌均视为【杀】直到此牌结算结束。',
			jsrgzhiheng:'猘横',
			jsrgzhiheng_info:'锁定技。当你因执行牌的效果对目标角色造成伤害时，若其于此回合响应过你使用过的牌，此伤害+1。',
			jsrgzhasi:'诈死',
			jsrgzhasi_info:'限定技。当你受到伤害值不小于你的体力值的伤害时，你可以防止此伤害，然后失去〖猘横〗并获得〖制衡〗。然后你不计入距离和座次计算直到你对其他角色使用牌后或当你受到伤害后。',
			jsrgbashi:'霸世',
			jsrgbashi_info:'主公技。当你需要打出【杀】或【闪】时，你可以令其他吴势力角色选择是否打出一张【杀】或【闪】。若有角色响应，则视为你打出了一张【杀】或【闪】。',
			jsrg_xuyou:'承许攸',
			jsrg_xuyou_prefix:'承',
			jsrglipan:'离叛',
			jsrglipan_info:'回合结束时，你可以变更势力，然后摸X张牌并执行一个额外的出牌阶段。此阶段结束时，所有与你势力相同的角色依次可以将一张牌当【决斗】对你使用（X为与你势力相同的其他角色数）。',
			jsrgqingxi:'轻袭',
			jsrgqingxi_info:'群势力技。出牌阶段每名角色限一次。你可以选择一名手牌数小于你的角色，你将手牌数弃置至与其相同，然后视为对其使用一张刺【杀】。',
			jsrgjinmie:'烬灭',
			jsrgjinmie_info:'魏势力技。出牌阶段限一次。你可以选择一名手牌数大于你的角色，你视为对其使用一张火【杀】。当此牌造成伤害后，你将其手牌数弃置至与你相同。',
			jsrg_lvbu:'承吕布',
			jsrg_lvbu_prefix:'承',
			jsrgwuchang:'无常',
			jsrgwuchang_info:'锁定技。①当你获得其他角色的牌后，你变更势力为与其相同。②当你使用【杀】或【决斗】对与你势力相同的目标角色造成伤害时，此伤害+1，然后变更势力为群。',
			jsrgqingjiao:'轻狡',
			jsrgqingjiao_info:'群势力技。出牌阶段各限一次。你可以将一张牌当【推心置腹】/【趁火打劫】对一名手牌数大于/小于你的角色使用。',
			jsrgchengxu:'乘虚',
			jsrgchengxu_info:'蜀势力技。与你势力相同的其他角色不能响应你使用的牌。',
			jsrg_zhanghe:'承张郃',
			jsrg_zhanghe_prefix:'承',
			jsrgqiongtu:'穷途',
			jsrgqiongtu_info:'群势力技。每回合限一次。你可以将一张非基本牌置于武将牌上视为使用一张【无懈可击】。若此牌生效，你摸一张牌，否则你变更势力为魏并获得所有“穷途”牌。',
			jsrgxianzhu:'先著',
			jsrgxianzhu_info:'魏势力技。你可以将一张普通锦囊牌当无次数限制的【杀】使用。当此牌对唯一目标造成伤害后，你视为对该角色使用一张此普通锦囊牌。',
			jsrg_zoushi:'承邹氏',
			jsrg_zoushi_prefix:'承',
			jsrgguyin:'孤吟',
			jsrgguyin_info:'准备阶段，你可以翻面，且令所有其他男性角色依次选择是否翻面。然后你和所有背面朝上的角色轮流各摸一张牌，直到你们累计以此法得到X张牌（X为场上存活角色与死亡角色中男性角色数）。',
			jsrgzhangdeng:'帐灯',
			jsrgzhangdeng_info:'①当一名武将牌背面朝上的角色需要使用【酒】时，若你的武将牌背面朝上，其可以视为使用之。②当一名角色于一回合第二次发动〖帐灯①〗时，你将武将牌翻面至正面朝上。',
			jsrg_guanyu:'承关羽',
			jsrg_guanyu_prefix:'承',
			jsrgguanjue:'冠绝',
			jsrgguanjue_info:'锁定技。当你使用或打出有花色的牌时，你令所有其他角色于此回合内不能使用或打出该花色的牌。',
			jsrgnianen:'念恩',
			jsrgnianen_info:'你可以将一张牌当任意基本牌使用或打出，然后若此牌不为红色或你以此法使用或打出的牌不为普通【杀】，则直到此回合结束，该技能失效且你视为拥有〖马术〗。',
			jsrg_chendeng:'承陈登',
			jsrg_chendeng_prefix:'承',
			jsrglunshi:'论势',
			jsrglunshi_info:'出牌阶段限一次。你可以令一名角色摸等同于其攻击范围内角色数的牌（至多摸至五张），然后其弃置等同于攻击范围内含有其的角色数的牌。',
			jsrgguitu:'诡图',
			jsrgguitu_info:'准备阶段，你可以交换场上的两张武器牌，然后攻击范围以此法减少的角色回复1点体力。',
			jsrg_zhenji:'承甄宓',
			jsrg_zhenji_prefix:'承',
			jsrgjixiang:'济乡',
			jsrgjixiang_info:'回合内每种牌名限一次。当一名其他角色需要使用或打出一张基本牌时，你可以弃置一张牌令其视为使用或打出之，然后你摸一张牌并令〖称贤〗于此阶段可发动次数上限+1。',
			jsrgchengxian:'称贤',
			jsrgchengxian_info:'出牌阶段限两次。你可以将一张手牌当一张本回合未以此法使用过的普通锦囊牌使用（此转化牌须与以此法转化的手牌的合法目标数相同）。',
			jsrg_zhangliao:'承张辽',
			jsrg_zhangliao_prefix:'承',
			jsrgzhengbing:'整兵',
			jsrgzhengbing_info:'群势力技。出牌阶段限三次。你可以重铸一张牌，若此牌为：【杀】，你本回合手牌上限+2；【闪】，你摸一张牌；【桃】，你变更势力为魏。',
			jsrgtuwei:'突围',
			jsrgtuwei_info:'魏势力技。出牌阶段开始时，你可以获得攻击范围内任意名角色各一张牌。然后此回合结束时，这些角色中未于本回合受到过伤害的角色依次获得你的一张牌。',
			jsrg_xugong:'承许贡',
			jsrg_xugong_prefix:'承',
			jsrgbiaozhao:'表召',
			jsrgbiaozhao_info:'准备阶段，你可以选择两名其他角色A和B。直到你的下回合开始时或你死亡后，A对B使用牌无次数和距离限制，且B对你使用的牌造成的伤害+1。',
			jsrgyechou:'业仇',
			jsrgyechou_info:'当你死亡时，你可以令一名其他角色获得如下效果：当其受到伤害值不小于其体力值的伤害时，其令此伤害翻倍。',
			jsrg_chunyuqiong:'承淳于琼',
			jsrg_chunyuqiong_prefix:'承',
			jsrgcangchu:'仓储',
			jsrgcangchu_info:'一名角色的结束阶段，你可以令至多X名角色各摸一张牌，若X大于存活角色数，则改为各摸两张牌（X为你于此回合得到的牌数）。',
			jsrgshishou:'失守',
			jsrgshishou_info:'锁定技。①当你使用【酒】时，你摸三张牌，然后你本回合不能再使用牌。②当你受到火焰伤害后，你令〖仓储〗失效直到你的下回合结束后。',

			jiangshanrugu_qi:'江山如故·起',
			jiangshanrugu_cheng:'江山如故·承',
		},
	};
});
