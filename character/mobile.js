'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'mobile',
		connectBanned:['miheng'],
		connect:true,
		characterSort:{
			mobile:{
				mobile_default:["miheng","taoqian","liuzan","lingcao","sunru","lifeng","zhuling","liuye","zhaotongzhaoguang","majun","simazhao","wangyuanji","pangdegong","shenpei","hujinding","zhangyì","jiakui"],
				mobile_others:["re_jikang","old_bulianshi","old_yuanshu","re_wangyun","re_baosanniang","re_weiwenzhugezhi","re_zhanggong","re_xugong","xin_yuanshao","re_liushan","xin_xiahoudun"],
				mobile_sunben:["re_sunben"],
			},
		},
		character:{
			xin_xiahoudun:['male','wei',4,['reganglie','xinqingjian']],
			zhangyì:['male','shu',4,['zhiyi']],
			jiakui:['male','wei',3,['zhongzuo','wanlan']],
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
			zhangyì:'张翼（？－264年），字伯恭，益州犍为郡武阳县人。三国时期蜀汉将领。历任梓潼、广汉、蜀郡三郡太守，出任庲降都督，后随诸葛亮和姜维北伐，官至左车骑将军，领冀州刺史。初封关内侯，进爵都亭侯。蜀汉灭亡后，魏将钟会密谋造反，成都大乱，张翼亦为乱兵所杀。张翼是蜀汉第三任庲降都督，由于执法严厉，不得南夷欢心。在北伐上，张翼认为国小民疲，不应滥用武力，是蜀汉朝廷当时极少敢当朝和姜维争辩北伐问题的大臣。',
			jiakui:'贾逵（174年—228年），本名贾衢，字梁道，河东襄陵人（今山西临汾县）。汉末三国时期魏国名臣，西晋开国功臣贾充父亲。初为并州郡吏，迁渑池县令，拜弘农太守，历仕曹操、曹丕、曹叡三世，是曹魏政权中具有军政才干的人物，终其一生为魏国统一事业作出卓越贡献。担任豫州刺史期间，兴修水利，凿通运河二百余里，时称“贾侯渠”，便利民生。随同曹丕伐吴，进封阳里亭侯，加号建威将军。石亭之战，率军救出曹休。太和二年，去世，赠本官，谥号为肃，《唐会要》将其尊为魏晋八君子之一。',
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
			ly_piliche:{
				fullskin:true,
				vanish:true,
				derivation:'liuye',
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-8},
				skills:['ly_piliche'],
				destroy:'polu'
			},
			"wolong_card":{
				type:"takaramono",
				fullskin:true,
				//derivation:"pangdegong",
			},
			"fengchu_card":{
				type:"takaramono",
				fullskin:true,
				//derivation:"pangdegong",
			},
			"xuanjian_card":{
				fullskin:true,
				type:"takaramono",
				//derivation:"pangdegong",
			},
			"shuijing_card":{
				fullskin:true,
				type:"takaramono",
				//derivation:"pangdegong",
			},
			"rewrite_bagua":{
				derivation:"majun",
				//cardimage:"bagua",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				skills:["rw_bagua_skill"],
			},
			"rewrite_baiyin":{
				derivation:"majun",
				fullskin:true,
				//cardimage:"baiyin",
				type:"equip",
				subtype:"equip2",
				filterLose:function(card,player){
					if(player.hasSkillTag('unequip2')) return false;
					return true;
				},
				loseDelay:false,
				onLose:function(){
					player.logSkill('rw_baiyin_skill');
					var next=game.createEvent('rw_baiyin_recover');
					event.next.remove(next);
					event.getParent().after.push(next);
					next.player=player;
					next.setContent(function(){
						player.draw(2);
						player.recover();
					});
				},
				skills:["rw_baiyin_skill"],
				tag:{
					recover:1,
				},
				ai:{
					order:9.5,
					equipValue:function (card,player){
						if(player.hp==player.maxHp) return 5;
						if(player.countCards('h','rewrite_baiyin')) return 6;
						return 0;
					},
					basic:{
						equipValue:5,
					},
				},
			},
			"rewrite_lanyinjia":{
				derivation:"majun",
				//cardimage:"lanyinjia",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				skills:["rw_lanyinjia","lanyinjia2"],
				ai:{
					equipValue:6,
					basic:{
						equipValue:1,
					},
				},
			},
			"rewrite_renwang":{
				derivation:"majun",
				//cardimage:"renwang",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				skills:["rw_renwang_skill"],
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
			},
			"rewrite_tengjia":{
				derivation:"majun",
				//cardimage:"tengjia",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				cardnature:"fire",
				ai:{
					equipValue:function (card,player){
						if(player.hasSkillTag('maixie')&&player.hp>1) return 0;
						if(player.hasSkillTag('noDirectDamage')) return 10;
						if(get.damageEffect(player,player,player,'fire')>=0) return 10;
						var num=3-game.countPlayer(function(current){
							return get.attitude(current,player)<0;
						});
						if(player.hp==1) num+=4;
						if(player.hp==2) num+=1;
						if(player.hp==3) num--;
						if(player.hp>3) num-=4;
						return num;
					},
					basic:{
						equipValue:3,
					},
				},
				skills:["rw_tengjia1","rw_tengjia2","rw_tengjia3","rw_tengjia4"],
			},
			"rewrite_zhuge":{
				derivation:"majun",
				//cardimage:"zhuge",
				distance:{
					attackFrom:-2,
				},
				fullskin:true,
				type:"equip",
				subtype:"equip1",
				ai:{
					equipValue:function (card,player){
						if(!game.hasPlayer(function(current){
							return player.canUse('sha',current)&&get.effect(current,{name:'sha'},player,player)>0;
						})){
							return 1;
						}
						if(player.hasSha()&&_status.currentPhase==player){
							if(player.getEquip('zhuge')||player.getCardUsable('sha')==0){
								return 10;
							}
						}
						var num=player.countCards('h','sha');
						if(num>1) return 6+num;
						return 3+num;
					},
					basic:{
						equipValue:5,
					},
					tag:{
						valueswap:1,
					},
				},
				skills:["rw_zhuge_skill"],
			},
		},
		characterFilter:{},
		skill:{
			rw_zhuge_skill:{
				equipSkill:true,
				audio:true,
				firstDo:true,
				trigger:{player:'useCard1'},
				forced:true,
				filter:function(event,player){
					return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
				},
				content:function(){
					trigger.audioed=true;
				},
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha'){
							return Infinity;
						}
					}
				},
			},
			xinqingjian:{
				audio:'qingjian',
				trigger:{player:'gainEnd'},
				direct:true,
				usable:1,
				filter:function(event,player){
					return event.getParent('phaseDraw').player!=player&&player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt2('xinqingjian'),'he',[1,player.countCards('he')]).ai=function(){return -1};
					'step 1'
					if(result.bool){
						player.addSkill('xinqingjian2');
						player.storage.xinqingjian2.addArray(result.cards);
						game.log(player,'将'+get.cnNumber(player.lose(result.cards,ui.special,'toStorage').cards.length)+'张牌置于其武将牌上');
						player.markSkill('xinqingjian2');
					}
					else player.storage.counttrigger.xinqingjian--;
				},
			},
			xinqingjian2:{
				audio:'xinqingjian',
				charlotte:true,
				trigger:{global:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player.storage.xinqingjian2&&player.storage.xinqingjian2.length>0;
				},
				init:function(player){
					if(!player.storage.xinqingjian2) player.storage.xinqingjian2=[];
				},
				content:function(){
					'step 0'
					player.chooseTarget(true,lib.filter.notMe).set('createDialog',['清俭：选择一名角色获得这些牌'+(player.storage.xinqingjian2.length>1?'，然后摸一张牌':''),player.storage.xinqingjian2]);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'thunder');
						if(target.gain(player.storage.xinqingjian2,player,'giveAuto','fromStorage').cards.length>1) player.draw();
						player.storage.xinqingjian2.length=0;
						player.removeSkill('xinqingjian2');
					}
				},
				intro:{
					onunmark:'throw',mark:function(dialog,content,player){
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								dialog.addAuto(content);
							}
							else{
								return '共有'+get.cnNumber(content.length)+'张牌';
							}
						}
					},
					content:function(content,player){
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								return get.translation(content);
							}
							return '共有'+get.cnNumber(content.length)+'张牌';
						}
					}
				},
			},
			zhongzuo:{
				audio:2,
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return player.getHistory('damage').length>0||player.getHistory('sourceDamage').length>0;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('zhongzuo'),'令一名角色摸两张牌。若其已受伤，则你摸一张牌。').set('ai',function(target){
						if(target.hasSkillTag('nogain')&&target!=_status.currentPhase) return target.isDamaged()?0:1;
						var att=get.attitude(_status.event.player,target);
						if(target.isDamaged()) att=att*1.2;
						return att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zhongzuo',target);
						target.draw(2);
						if(target.isDamaged()) player.draw();
					}
				},
			},
			wanlan:{
				audio:2,
				trigger:{global:'dying'},
				check:function(event,player){
					if(get.attitude(player,event.player)<4) return false;
					if(player.countCards('h',function(card){
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardSavable',player);
						if(mod!='unchanged') return mod;
						var savable=get.info(card).savable;
						if(typeof savable=='function') savable=savable(card,player,event.player);
						return savable;
					})>=1-event.player.hp) return false;
					if(event.player==player||event.player==get.zhu(player)) return true;
					if(_status.currentPhase&&get.damageEffect(_status.currentPhase,player,player)<0) return false;
					return !player.hasUnknown();
				},
				limited:true,
				unique:true,
				filter:function(event,player){
					return event.player.hp<=0;
				},
				skillAnimation:true,
				animationColor:'thunder',
				logTarget:'player',
				content:function(){
					'step 0'
					player.awakenSkill('wanlan');
					var hs=player.getCards('h')
					if(hs.length) player.discard(hs);
					'step 1'
					var num=1-trigger.player.hp;
					if(num) trigger.player.recover(num);
					'step 2'
					if(_status.currentPhase&&_status.currentPhase.isAlive()) _status.currentPhase.damage();
				},
			},
			zhiyi:{
				audio:2,
				trigger:{player:['useCard','respond']},
				forced:true,
				filter:function(event,player){
					if(get.type(event.card)!='basic') return false;
					var history=player.getHistory('useCard',function(evt){
						return get.type(evt.card)=='basic';
					}).concat(player.getHistory('respond',function(evt){
						return get.type(evt.card)=='basic';
					}));
					return history.length==1&&history[0]==event;
				},
				content:function(){
					'step 0'
					var info=get.info(trigger.card);
					if(!info||!info.enable) event._result={index:0};
					else{
						var evt=trigger;
						if(evt.respondTo&&evt.getParent('useCard').name=='useCard') evt=evt.getParent('useCard');
						event.evt=evt;
						player.chooseControl().set('prompt','执义：请选择一项').set('choiceList',[
							'摸一张牌',
							'于'+get.translation(evt.card)+'的使用结算结束之后视为使用一张'+get.translation({name:trigger.card.name,nature:trigger.card.nature,isCard:true}),
						]).set('ai',function(){return _status.event.choice}).set('choice',function(){
							var card={name:trigger.card.name,nature:trigger.card.nature,isCard:true};
							if(card.name=='sha'){
								if(player.getUseValue(card)>0) return 1;
							}
							else if(card.name=='tao'){
								var hp=player.maxHp-player.hp;
								if(trigger.targets.contains(player)) hp--;
								return hp>0?1:0;
							}
							return 0;
						}());
					}
					'step 1'
					if(result.index==0){
						player.draw();
					}
					else{
						var next=player.chooseUseTarget({name:trigger.card.name,nature:trigger.card.nature},false,true);
						_status.event.next.remove(next);
						event.evt.after.push(next);
						next.logSkill='zhiyi';
					}
				},
			},
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
					player.chooseTarget(get.prompt('meiyong'),'获得一名其他角色的一张牌，然后其摸一张牌。',function(card,player,target){
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
			shouye:{
				audio:2,
				group:'shouye_after',
				trigger:{global:"useCardToTargeted"},
				filter:function(event,player){
					return event.player!=player&&event.targets.length==1;
				},
				check:function(event,player){
					if(event.player==game.me||event.player.isOnline()) return get.attitude(player,event.player)<0;
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
						trigger.getParent().shouyeer=player;
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
							player.gain(list,'gain2','log');
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
			"xinfu_daigong":{
				usable:1,
				audio:2,
				trigger:{
					player:"damageBegin4",
				},
				filter:function (event,player){
					return event.source!=undefined&&player.countCards('h')>0;
				},
				content:function (){
					'step 0'
					player.showHandcards();
					'step 1'
					var cards=player.getCards('h');
					var suits=[];
					for(var i=0;i<cards.length;i++){
						suits.add(get.suit(cards[i]));
					}
					trigger.source.chooseCard('he','交给'+get.translation(player)+'一张满足条件的牌，否则防止此伤害。',function(card){
						return !_status.event.suits.contains(get.suit(card));
					}).set('suits',suits).ai=function(card){
						var player=_status.event.player;
						var target=_status.event.getParent('xinfu_daigong').player;
						if(get.damageEffect(target,player,player)>0) return 6.5-get.value(card);
						return 0;
					};
					'step 2'
					if(result.bool){
						trigger.source.give(result.cards,player,true);
					}
					else trigger.cancel();
				},
			},
			"xinfu_zhaoxin":{
				group:["zhaoxin_give"],
				intro:{
					content:"cards",
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
				},
				enable:"phaseUse",
				usable:1,
				audio:2,
				init:function (player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				filter:function (event,player){
					return player.storage.xinfu_zhaoxin.length<3&&player.countCards('h')>0;
				},
				visible:true,
				filterCard:true,
				selectCard:function (){
					var player=_status.event.player;
					return [1,3-player.storage.xinfu_zhaoxin.length];
				},
				discard:false,
				//lose:false,
				delay:false,
				content:function (){
					'step 0'
					//player.lose(cards,ui.special,'toStorage')
					player.$give(cards,player,false);
					player.storage.xinfu_zhaoxin=player.storage.xinfu_zhaoxin.concat(cards);
					player.markSkill('xinfu_zhaoxin');
					'step 1'
					player.draw(cards.length);
				},
				check:function (card){
					return 6-get.value(card);
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			"zhaoxin_give":{
				trigger:{
					global:"phaseDrawAfter",
				},
				filter:function (event,player){
					if(!player.storage.xinfu_zhaoxin.length) return false;
					return player==event.player||player.inRange(event.player);
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseCardButton(get.prompt('xinfu_zhaoxin',trigger.player),player.storage.xinfu_zhaoxin,function(button){
						return true;
					}).set('ai',function(button){
						return 1+Math.random();
					});
					'step 1'
					if(result.bool){
						event.card=result.links[0];
						player.logSkill('xinfu_zhaoxin',target);
						player.line(trigger.player,'thunder');
						player.showCards(event.card);
					}
					else event.finish();
					'step 2'
					trigger.player.chooseBool('是否获得'+get.translation(event.card)+'?').ai=function(){
						return get.attitude(trigger.player,player)>0;
					};
					'step 3'
					if(result.bool){
						player.storage.xinfu_zhaoxin.remove(event.card);
						player.$give(event.card,trigger.player);
						trigger.player.gain(event.card,'fromStorage');
						if(player.storage.xinfu_zhaoxin.length) player.markSkill('xinfu_zhaoxin');
						else player.unmarkSkill('xinfu_zhaoxin');
						player.chooseBool('是否对'+get.translation(trigger.player)+'造成一点伤害？').ai=function(){
							return get.damageEffect(trigger.player,player,player)>0
						};
					}
					else{
						trigger.player.chat('拒绝');
						event.finish();
					}
					'step 4'
					if(result.bool){
						trigger.player.damage('nocard');
					}
				},
			},
			"xinfu_qianchong":{
				audio:3,
				mod:{
					targetInRange:function (card,player,target){
						if(player.storage.xinfu_qianchong.contains(get.type(card,'trick'))){
							return true;
						}
					},
					cardUsable:function (card,player,num){
						if(player.storage.xinfu_qianchong.contains(get.type(card,'trick'))) return Infinity;
					},
				},
				group:["xinfu_qianchong_clear","qc_weimu","qc_mingzhe"],
				subSkill:{
					clear:{
						sub:true,
						forced:true,
						silent:true,
						popup:false,
						trigger:{
							player:"phaseAfter",
						},
						content:function (){
							player.storage.xinfu_qianchong=[];
						},
					},
				},
				init:function (event,player){
					event.storage[player]=[];
				},
				trigger:{
					player:"phaseUseBegin",
				},
				locked:false,
				direct:true,
				filter:function (event,player){
					var es=player.getCards('e');
					if(!es.length) return true;
					var col=get.color(es[0]);
					for(var i=0;i<es.length;i++){
						if(get.color(es[i])!=col) return true;
					}
					return false;
				},
				content:function (){
					'step 0'
					var list=['basic','trick','equip','cancel2'];
					for(var i=0;i<player.storage.xinfu_qianchong.length;i++){
						list.remove(player.storage.xinfu_qianchong[i]);
					}
					if(list.length>1){
					player.chooseControl(list).set('ai',function(){
							return list[0];
						}
			).set('prompt',get.prompt('xinfu_qianchong')).set('prompt2',get.translation('xinfu_qianchong_info'));
					}
					else event.finish();
					'step 1'
					if(result.control&&result.control!='cancel2'){
						player.logSkill('xinfu_qianchong');
						player.storage.xinfu_qianchong.add(result.control);
						var str=get.translation(result.control)+'牌';
						game.log(player,'声明了','#y'+str);
						player.popup(str,'thunder');
					}
				},
			},
			"qc_weimu":{
				audio:"xinfu_qianchong",
				mod:{
					targetEnabled:function (card,player,target){
						var bool=true;
						var es=target.getCards('e');
						if(!es.length) bool=false;
						for(var i=0;i<es.length;i++){
							if(get.color(es[i])!='black') bool=false;
						}
						if(bool&&(get.type(card)=='trick'||get.type(card)=='delay')&&
							get.color(card)=='black') return false;
					},
				},
			},
			"qc_mingzhe":{
				audio:"xinfu_qianchong",
				trigger:{
					player:["useCard","respond","loseAfter"],
				},
				frequent:true,
				filter:function (event,player){
					if(player.hasSkill('mingzhe')) return false;
					if(player==_status.currentPhase) return false;
					var es=player.getCards('e');
					if(!es.length) return false;
					for(var i=0;i<es.length;i++){
						if(get.color(es[i])!='red') return false;
					}
					if(event.name!='lose') return get.color(event.card)=='red';
					if(event.type!='discard') return false;
					if(event.cards2){
						for(var i=0;i<event.cards2.length;i++){
							if(get.color(event.cards2[i])=='red') return true;
						}
					}
					return false;
				},
				content:function (){
					"step 0"
					event.count=1;
					if(trigger.name=='lose'){
						event.count=0;
						for(var i=0;i<trigger.cards2.length;i++){
							if(get.color(trigger.cards2[i])=='red') event.count++;
						}
					}
					"step 1"
					player.draw();
					event.count--;
					"step 2"
					if(event.count){
			 		player.chooseBool(get.prompt2('mingzhe')).set('frequentSkill',event.name);
					}
					else event.finish();
					"step 3"
					if(result.bool){
						player.logSkill('qc_mingzhe');
						event.goto(1);
					}
				},
				ai:{
					threaten:0.7,
				},
			},
			"xinfu_shangjian":{
				trigger:{
					global:"phaseJieshuBegin",
				},
				audio:2,
				filter:function (event,player){
					var num=0;
					player.getHistory('lose',function(evt){
						if(evt.cards2) num+=evt.cards2.length;
					});
					return num>0&&num<=player.hp
				},
				frequent:true,
				content:function (){
					'step 0'
					var num=0;
					player.getHistory('lose',function(evt){
						if(evt.cards2) num+=evt.cards2.length;
					});
					if(num>0){
						player.draw(num);
					}
				},
			},
			"rw_bagua_skill":{
				inherit:"bagua_skill",
				audio:"bagua_skill",
				content:function (){
					"step 0"
					player.judge('rewrite_bagua',function(card){return (get.suit(card)!='spade')?1.5:-0.5});
					"step 1"
					if(result.judge>0){
						trigger.untrigger();
						trigger.set('responded',true);
						trigger.result={bool:true,card:{name:'shan'}}
					}
				},
			},
			"rw_baiyin_skill":{
				inherit:"baiyin_skill",
				audio:"baiyin_skill",
			},
			"rw_lanyinjia":{
				inherit:"lanyinjia",
				audio:"lanyinjia",
			},
			"rw_minguangkai_cancel":{
				inherit:"minguangkai_cancel",
			},
			"rw_minguangkai_link":{
				inherit:"minguangkai_link",
				trigger:{
					player:"linkBefore",
				},
				forced:true,
				priority:20,
				filter:function (event,player){
					return !player.isLinked();
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
							if(['tiesuo','lulitongxin'].contains(card.name)){
								return 'zerotarget';
							}
						},
					},
				},
			},
			"rw_renwang_skill":{
				inherit:"renwang_skill",
				audio:"renwang_skill",
				filter:function (event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return (event.card.name=='sha'&&(get.suit(event.card)=='heart'||get.color(event.card)=='black'))
				},
				ai:{
					effect:{
						target:function (card,player,target){
							if(target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:player,
								card:card
							})||player.hasSkillTag('unequip_ai',false,{
								name:card?card.name:null,
								target:player,
								card:card
							})) return;
							if(card.name=='sha'&&['spade','club','heart'].contains(get.suit(card))) return 'zerotarget';
						},
					},
				},
			},
			"rw_tengjia1":{
				inherit:"tengjia1",
				audio:"tengjia1",
			},
			"rw_tengjia2":{
				inherit:"tengjia2",
				audio:"tengjia1",
			},
			"rw_tengjia3":{
				audio:"tengjia1",
				inherit:"rw_minguangkai_link",
				ai:{
					effect:{
						target:function (card,player,target,current){
							if(['tiesuo','lulitongxin'].contains(card.name)){
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			"rw_tengjia4":{
				inherit:"tengjia3",
				audio:"tengjia1",
			},
			"xinfu_pingcai":{
				"wolong_card":function (){
					'step 0'
					var ingame=game.hasPlayer(function(current){
						return ['sp_zhugeliang','re_sp_zhugeliang'].contains(current.name)||['sp_zhugeliang','re_sp_zhugeliang'].contains(current.name2);
					})?true:false;
					var prompt='请选择';
					prompt+=ingame?'至多两名':'一名';
					prompt+='角色，对其造成1点火焰伤害';
					var range=ingame?[1,2]:[1,1]
					player.chooseTarget(prompt,range).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player,'fire');
					});
					'step 1'
					if(result.bool&&result.targets.length){
						player.line(result.targets,'fire');
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].damage('fire');
						}
					}
				},
				"fengchu_card":function (){
					'step 0'
					var ingame=game.hasPlayer(function(current){
						return ['re_pangtong','pangtong'].contains(current.name)||['re_pangtong','pangtong'].contains(current.name2);
					})?true:false;
					var prompt='请选择';
					prompt+=ingame?'至多四名':'至多三名';
					prompt+='要横置的角色';
					var range=ingame?[1,4]:[1,3]
					player.chooseTarget(prompt,range).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,{name:'tiesuo'},player,player)
					});
					'step 1'
					if(result.bool&&result.targets.length){
						player.line(result.targets,'green');
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].link();
						}
					}
				},
				"xuanjian_card":function (){
					'step 0'
					event.ingame=game.hasPlayer(function(current){
						return ['re_xushu','xin_xushu','xushu'].contains(current.name)||['re_xushu','xin_xushu','xushu'].contains(current.name2);
					})?true:false;
					var prompt='请选择一名角色，令其回复一点体力并摸一张牌';
					prompt+=event.ingame?'，然后你摸一张牌。':'。';
					player.chooseTarget(prompt).set('ai',function(target){
						var player=_status.event.player;
						return get.attitude(player,target)*(target.isDamaged()?2:1);
					});
					'step 1'
					if(result.bool&&result.targets.length){
						var target=result.targets[0];
						player.line(target,'thunder');
						target.draw();
						target.recover();
						if(event.ingame) player.draw();
					}
				},
				"shuijing_card":function (){
					'step 0'
					event.ingame=game.hasPlayer(function(current){
						return current.name=='simahui'||current.name2=='simahui';
					})?true:false;
					var prompt='将一名角色装备区中的';
					prompt+=event.ingame?'一张牌':'防具牌';
					prompt+='移动到另一名角色的装备区中';
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							if(!_status.event.ingame){
								return target.isEmpty(2)?true:false;
							}
							var from=ui.selected.targets[0];
							if(target.isMin()) return false;
							var es=from.getCards('e');
								for(var i=0;i<es.length;i++){
									if(['equip3','equip4'].contains(get.subtype(es[i]))&&target.getEquip('liulongcanjia')) continue;
									if(es[i].name=='liulongcanjia'&&target.countCards('e',{subtype:['equip3','equip4']})>1) continue;
									if(target.isEmpty(get.subtype(es[i]))) return true;
								}
								return false;
							}
							else{
								if(!event.ingame){
									if(target.getEquip(2)) return true;
									return false;
								}
								return target.countCards('e')>0;
							}
						});
						next.set('ingame',event.ingame)
						next.set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(ui.selected.targets.length==0){
								if(att<0){
									if(game.hasPlayer(function(current){
										if(get.attitude(player,current)>0){
											var es=target.getCards('e');
											for(var i=0;i<es.length;i++){
												if(['equip3','equip4'].contains(get.subtype(es[i]))&&current.getEquip('liulongcanjia')) continue;
												else if(es[i].name=='liulongcanjia'&&target.countCards('e',{subtype:['equip3','equip4']})>1) continue;
												else if(current.isEmpty(get.subtype(es[i]))) return true;
											}
											return false;
										}
									}))	return -att;
								}
								return 0;
							}
							if(att>0){
								var es=ui.selected.targets[0].getCards('e');
								var i;
								for(i=0;i<es.length;i++){
									if(['equip3','equip4'].contains(get.subtype(es[i]))&&target.getEquip('liulongcanjia')) continue;
									if(es[i].name=='liulongcanjia'&&target.countCards('e',{subtype:['equip3','equip4']})>1) continue;
									if(target.isEmpty(get.subtype(es[i]))) break;
								}
								if(i==es.length) return 0;
							}
							return -att*get.attitude(player,ui.selected.targets[0]);
						});
						next.set('multitarget',true);
						next.set('targetprompt',['被移走','移动目标']);
						next.set('prompt',prompt);
						'step 1'
						if(result.bool){
							player.line2(result.targets,'green');
							event.targets=result.targets;
						}
						else event.finish();
						'step 2'
						game.delay();
						'step 3'
						if(targets.length==2){
							if(!event.ingame){
								event._result={
									bool:true,
									links:[targets[0].getEquip(2)],
								};
							}
							else{
							player.choosePlayerCard('e',true,function(button){
								return get.equipValue(button.link);
							},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
								var targets1=_status.event.targets1;
									if(['equip3','equip4'].contains(get.subtype(button.link))&&targets1.getEquip('liulongcanjia')) return false;
									if(button.link.name=='liulongcanjia'&&targets1.countCards('e',{subtype:['equip3','equip4']})>1) return false;
									return !targets1.countCards('e',{subtype:get.subtype(button.link)});
								
							});
							}
						}
						else event.finish();
						'step 4'
						if(result.bool&&result.links.length){
							var link=result.links[0];
							if(get.position(link)=='e')	event.targets[1].equip(link);
							else if(link.viewAs) event.targets[1].addJudge({name:link.viewAs},[link]);
							else event.targets[1].addJudge(link);
							event.targets[0].$give(link,event.targets[1],false)
							game.delay();
						}
				},
				audio:true,
				enable:"phaseUse",
				usable:1,
				content:function (){
					"step 0"
					var list=["wolong","fengchu","xuanjian","shuijing"];
					var list2=[];
					for(var i=0;i<list.length;i++){
						list2.push(game.createCard(list[i]+'_card','',''))
					}
					//list2.randomSort();
					event.time=get.utc();
					player.chooseButton(['请选择要擦拭的宝物',list2],true).set('ai',function(button){
						var player=_status.event.player;
						if(button.link.name=='xuanjian_card'){
							if(game.hasPlayer(function(current){
								return current.isDamaged()&&current.hp<3&&get.attitude(player,current)>1;
							})) return 1+Math.random();
							else return 1;
						}
						else if(button.link.name=='wolong_card'){
							if(game.hasPlayer(function(current){
								return get.damageEffect(current,player,player,'fire')>0;
							})) return 1.2+Math.random();
							else return 0.5;
						}
						else return 0.6;
					});
					"step 1"
					var delay=8400-(get.utc()-event.time);
					if(delay>0){
 					event.delay2=true;
 					event.dialog=ui.create.dialog(get.translation(player)+'正在擦拭宝物...'+(_status.connectMode?'':'<br>（点击屏幕可跳过等待）'));
 					event.videoId=lib.status.videoId++;
 					game.broadcast('createDialog',event.videoId,get.translation(player)+'正在擦拭宝物...');
 					game.pause();
 					event.pingcai_delayed=true;
 					setTimeout(function(){
 						if(event.pingcai_delayed==true){
 							delete event.pingcai_delayed;
 							game.resume();
 						}
 					},delay);
 					if(!_status.connectMode){
 						event.forceMine=true;
 						event.custom.replace.window=function(){
 							if(event.pingcai_delayed==true){
 								delete event.forceMine;
 								delete event.pingcai_delayed;
 								game.resume();
 							}
 						}
 					}
					}
					event.card=result.links[0];
					"step 2"
					if(event.delay2){
 					delete event.custom.replace.window;
 					event.dialog.close();
 					game.addVideo('cardDialog',null,event.videoId);
 					game.broadcast('closeDialog',event.videoId);
					}
					player.logSkill('pcaudio_'+event.card.name);
					player.$throw(event.card);
					event.insert(lib.skill.xinfu_pingcai[event.card.name],{
						player:player,
					});
				},
				ai:{
					order:7,
					result:{
						player:1,
					},
				},
			},
			"xinfu_pdgyingshi":{
				mod:{
					targetEnabled:function (card,player,target){
						if(get.type(card)=='delay'){
							return false;
						}
					},
				},
				trigger:{
					player:['phaseZhunbeiBefore','phaseJieshuBefore'],
				},
				forced:true,
				audio:2,
				group:'xinfu_pdgyingshi2',
				priority:15,
				content:function(){
					trigger.cancel();
					game.log(player,'跳过了',event.triggername=='phaseZhunbeiBefore'?'准备阶段':'结束阶段');
				},
			},
			xinfu_pdgyingshi2:{
				popup:false,
				trigger:{
					player:"phaseJudgeBefore",
				},
				forced:true,
				priority:15,
				content:function (){
					trigger.cancel();
					game.log(player,'跳过了判定阶段');
				},
			},
			"pcaudio_wolong_card":{
				audio:true,
			},
			"pcaudio_fengchu_card":{
				audio:true,
			},
			"pcaudio_shuijing_card":{
				audio:true,
			},
			"pcaudio_xuanjian_card":{
				audio:true,
			},
			"yizan_respond_sha":{
				audio:2,
				enable:["chooseToRespond"],
				filterCard:function (card,player,target){
					if(player.storage.yizan) return get.type(card)=='basic';
					else if(ui.selected.cards.length){
						if(get.type(ui.selected.cards[0])=='basic') return true;
						return get.type(card)=='basic';
					}
					return true;
				},
				selectCard:function (){
					var player=_status.event.player;
					if(player.storage.yizan) return 1;
					return 2;
				},
				position:"he",
				viewAs:{
					name:"sha",
				},
				complexCard:true,
				viewAsFilter:function (player){
					if(!player.storage.yizan){
						if(player.countCards('h')<2) return false;
					}
					return player.hasCard(function(card){
						return get.type(card)=='basic';
					},'h');
				},
				prompt:function (){
					var player=_status.event.player;
					var str=!player.storage.yizan?'两张牌(其中至少应有一张基本牌)':'一张基本牌';
					return '将'+str+'当做杀打出';
				},
				check:function (card){
					if(!ui.selected.cards.length&&get.type(card)=='basic') return 6;
					return 5-get.value(card);
				},
				ai:{
					skillTagFilter:function (player){
						if(!player.storage.yizan){
							if(player.countCards('he')<2) return false;
						}
						return player.hasCard(function(card){
							return get.type(card)=='basic';
						},'h');
					},
					respondSha:true,
				},
			},
			"yizan_use":{
				init:function (player){
					if(!player.storage.yizan_use) player.storage.yizan_use=0;
					if(!player.storage.yizan) player.storage.yizan=false;
				},
				mark:true,
				intro:{
					content:"已发动过#次",
				},
				group:["yizan_respond_sha","yizan_respond_shan","yizan_count"],
				enable:"chooseToUse",
				filter:function (event,player){
				if(!player.storage.yizan&&player.countCards('he')<2) return false;
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
						return ui.create.dialog('翊赞',[list,'vcard'],'hidden');
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
									if(player.storage.yizan&&player.countCards('h',{type:'basic'})>2) return 3;
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
							filterCard:function(card,player,target){
								if(player.storage.yizan) return get.type(card)=='basic';
								else if(ui.selected.cards.length){
									if(get.type(ui.selected.cards[0])=='basic') return true;
									return get.type(card)=='basic';
								}
								return true;
							},
							complexCard:true,
							selectCard:function(){
								var player=_status.event.player;
								if(player.storage.yizan) return 1;
								return 2;
							},
							check:function(card,player,target){
								if(!ui.selected.cards.length&&get.type(card)=='basic') return 6;
								else return 6-get.value(card);
							},
							viewAs:{name:links[0][2],nature:links[0][3]},
							position:'he',
							popname:true,
							precontent:function(){
								player.logSkill('yizan_respond_shan');
							},
						}
					},
					prompt:function (links,player){
						var str=!player.storage.yizan?'两张牌(其中至少应有一张基本牌)':'一张基本牌';
						return '将'+str+'当做'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					order:function (){
						var player=_status.event.player;
						var event=_status.event;
						if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0&&player.storage.yizan&&player.countCards('h',{type:'basic'})>2){
							return 3.3;
						}
						return 3.1;
					},
					save:true,
					respondSha:true,
					skillTagFilter:function (player,tag,arg){
						if(!player.storage.yizan&&player.countCards('he')<2) return false;
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
			"yizan_respond_shan":{
				complexCard:true,
				audio:2,
				enable:["chooseToUse","chooseToRespond"],
				filterCard:function (card,player,target){
					if(player.storage.yizan) return get.type(card)=='basic';
						else if(ui.selected.cards.length){
						if(get.type(ui.selected.cards[0])=='basic') return true;
						return get.type(card)=='basic';
					}
					return true;
				},
				selectCard:function (){
					var player=_status.event.player;
					if(player.storage.yizan) return 1;
					return 2;
				},
				position:"he",
				viewAs:{
					name:"shan",
				},
				viewAsFilter:function (player){
					if(!player.storage.yizan){
						if(player.countCards('he')<2) return false;
					}
					return player.hasCard(function(card){
						return get.type(card)=='basic';
					},'h');
				},
				prompt:function (){
					var player=_status.event.player;
					var str=!player.storage.yizan?'两张牌(其中至少应有一张基本牌)':'一张基本牌';
					return '将'+str+'当做闪使用或打出';
				},
				check:function (card){
					if(!ui.selected.cards.length&&get.type(card)=='basic') return 6;
					return 5-get.value(card);
				},
				ai:{
					respondShan:true,
					skillTagFilter:function (player){
					if(!player.storage.yizan){
						if(player.countCards('he')<2) return false;
					}
					return player.hasCard(function(card){
						return get.type(card)=='basic';
					},'h');
				},
					effect:{
						target:function (card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6
						},
					},
					basic:{
						useful:[7,2],
						value:[7,2],
					},
				},
			},
			"xinfu_longyuan":{
				audio:2,
				forced:true,
				unique:true,
				juexingji:true,
				trigger:{
					player:["useCardAfter","respondAfter"],
				},
				init:function (player){
					player.storage.xinfu_longyuan=false;
				},
				delay:1.2,
				skillAnimation:true,
				animationColor:'orange',
				filter:function (event,player){
					if(player.storage.xinfu_longyuan) return false;
					return player.storage.yizan_use>2;
				},
				content:function (){
					player.awakenSkill('xinfu_longyuan');
					player.storage.yizan=true;
					game.delay(1);
				},
			},
			"yizan_count":{
				forced:true,
				silent:true,
				popup:false,
				trigger:{
					player:["respond","useCard1"],
				},
				filter:function (event,player){
					if(event.skill!='yizan_respond_sha'&&event.skill!='yizan_respond_shan'&&event.skill!='yizan_use_backup') return false;
					return player.storage.yizan_use!=undefined;
				},
				content:function (){
					player.storage.yizan_use++;
					player.markSkill('yizan_use');
				},
			},
			xinfu_jingxie:{audio:2},
			"xinfu_jingxie1":{
				group:["xinfu_jingxie2"],
				position:"he",
				audio:'xinfu_jingxie',
				enable:"phaseUse",
				filter:function(event,player){
					var he=player.getCards('he');
					for(var i=0;i<he.length;i++){
						if(["bagua","baiyin","lanyinjia","renwang","tengjia","zhuge"].contains(he[i].name)) return true;
					}
					return false;
				},
				filterCard:function (card){
					return ["bagua","baiyin","lanyinjia","renwang","tengjia","zhuge"].contains(card.name);
				},
				discard:false,
				check:function(){
					return 1;
				},
				content:function (){
					"step 0"
					player.showCards(cards);
					"step 1"
					var card=cards[0];
					player.gain(game.createCard('rewrite_'+card.name,get.suit(card),card.number),'gain2');
				},
				ai:{
					basic:{
						order:10,
					},
					result:{
						player:1,
					},
				},
			},
			"xinfu_jingxie2":{
				prompt:"重铸一张防具牌，然后将体力回复至1点。",
				audio:'xinfu_jingxie',
				enable:"chooseToUse",
				filterCard:function (card){
					return get.subtype(card)=='equip2';
				},
				filter:function (event,player){
					if(event.type=='dying'){
						if(player!=event.dying) return false;
						return player.countCards('he',function(card){
							return get.subtype(card)=='equip2';
						})>0;
					}
					return false;
				},
				check:function(){
					return 1;
				},
				position:"he",
				discard:false,
				loseTo:'discardPile',
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆')
				},
				content:function (){
					'step 0'
					player.draw();
					'step 1'
					var num=1-player.hp;
					if(num) player.recover(num);
				},
				ai:{
					order:0.5,
					skillTagFilter:function (player){
						if(player.hp>0) return false;
						return player.countCards('he',function(card){
							return get.subtype(card)=='equip2';
						})>0;
					},
					save:true,
					result:{
						player:function (player){
							return 10;
						},
					},
				},
			},
			"xinfu_qiaosi":{
				enable:"phaseUse",
				usable:1,
				content:function (){
					'step 0'
					if(get.isLuckyStar()){
						event.num=6;
						player.throwDice(6);
					}
					else player.throwDice();
					'step 1'
					event.cards=get.cards(event.num);
					player.showCards(event.cards);
					'step 2'
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
					'step 3'
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
							prompt:'请选择要送人的卡牌',
							forced:true,
						});
					}
					else{
						player.chooseToDiscard(event.num,true,'he');
						event.finish();
					}
					'step 4'
					if(result.bool){
						var target=result.targets[0];
						player.give(result.cards,target);
					}
				},
				ai:{
					order:7.5,
					result:{
						player:1,
					},
				},
			},
			zhaohuo:{
				audio:2,
				trigger:{global:'dying'},
				forced:true,
				//priority:12,
				filter:function(event,player){
					return event.player!=player&&player.maxHp>1;
				},
				content:function(){
					'step 0'
					event.num=player.maxHp-1;
					player.loseMaxHp(event.num,true);
					'step 1'
					player.draw(event.num);
				}
			},
			yixiang:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				frequent:true,
				filter:function(event,player){
					if(event.player.hp<=player.hp) return false;
					//if(event.targets.length>1) return false;
					var hs=player.getCards('h');
					var names=['sha','shan','tao','jiu','du'];
					for(var i=0;i<hs.length;i++){
						names.remove(hs[i].name);
					}
					if(!names.length) return false;
					for(var i=0;i<ui.cardPile.childElementCount;i++){
						if(names.contains(ui.cardPile.childNodes[i].name)){
							return true;
						}
					}
					return false;
				},
				usable:1,
				content:function(){
					var hs=player.getCards('h');
					var list=[];
					var names=['sha','shan','tao','jiu','du'];
					for(var i=0;i<hs.length;i++){
						names.remove(hs[i].name);
					}
					for(var i=0;i<ui.cardPile.childElementCount;i++){
						if(names.contains(ui.cardPile.childNodes[i].name)){
							list.push(ui.cardPile.childNodes[i]);
						}
					}
					if(list.length){
						player.gain(list.randomGet(),'draw');
					}
				}
			},
			yirang:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he',function(card){
						return get.type(card)!='basic';
					})){
						return false;
					}
					return game.hasPlayer(function(current){
						return current.maxHp>player.maxHp;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yirang'),function(card,player,target){
						return target.maxHp>player.maxHp;
					}).set('ai',function(target){
						return (get.attitude(_status.event.player,target)-2)*target.maxHp;
					});
					'step 1'
					if(result.bool){
						var cards=player.getCards('he',function(card){
							return get.type(card)!='basic';
						});
						var target=result.targets[0];
						var types=[];
						for(var i=0;i<cards.length;i++){
							types.add(get.type(cards[i],'trick'));
						}
						player.logSkill('yirang',target);
						target.gain(cards,player,'give');
						player.gainMaxHp(target.maxHp-player.maxHp,true);
						player.recover(types.length);
						game.delay();
					}
				}
			},
			kuangcai:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return !event.player.isMad();
				},
				content:function(){
					game.broadcastAll(function(player){
						player.forceCountChoose={phaseUse:5};
					},player)
					player.addSkill('kuangcai_use');
					player.addSkill('kuangcai_cancel');
					//ui.auto.hide();
				},
				subSkill:{
					use:{
						mod:{
							cardUsable:function(card){
								if(get.info(card)&&get.info(card).forceUsable) return;
								return Infinity;
							},
							targetInRange:function(){
								return true;
							},
						},
						trigger:{player:'useCard'},
						forced:true,
						//audio:'kuangcai',
						silent:true,
						popup:false,
						usable:5,
						filter:function(event,player){
							if(!player.forceCountChoose){
								return false;
							}
							return true;
						},
						content:function(){
							player.draw();
							if(player.forceCountChoose.phaseUse==1){
								var evt=event.getParent('phaseUse');
								if(evt) evt.skipped=true;
							}
							else game.broadcastAll(function(player){
								player.forceCountChoose.phaseUse--;
							},player);
						},
						ai:{
							presha:true,
							pretao:true,
						},
					},
					cancel:{
						trigger:{player:'phaseUseEnd'},
						priority:50,
						silent:true,
						content:function(){
							game.broadcastAll(function(player){
								delete player.forceCountChoose;
							},player);
							//ui.auto.show();
							player.removeSkill('kuangcai_use');
							player.removeSkill('kuangcai_cancel');
							if(player.storage.counttrigger) delete player.storage.counttrigger.kuangcai_use;
						}
					}
				},
				ai:{
					threaten:4.5,
				},
			},
			shejian:{
				audio:2,
				trigger:{player:'phaseDiscardEnd'},
				direct:true,
				filter:function(event,player){
					var cards=[];
					player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event) cards.addArray(evt.cards2);
					});
					if(cards){
						if(cards.length<2) return false;
						var suits=[];
						for(var i=0;i<cards.length;i++){
							var suit=get.suit(cards[i]);
							if(suits.contains(suit)){
								return false;
							}
							else{
								suits.push(suit);
							}
						}
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('shejian'),'弃置一名其他角色的一张牌',function(card,player,target){
						if(player==target) return false;
						return target.countDiscardableCards(player,'he')>0;
					}).ai=function(target){
						return -get.attitude(player,target);
					};
					'step 1'
					if(result.bool){
						player.logSkill('shejian',result.targets);
						player.discardPlayerCard(result.targets[0],'he',true);
					}
					else{
						event.finish();
					}
				},
			},
			shixin:{
				audio:2,
				trigger:{player:'damageBegin4'},
				filter:function(event){
					return event.nature=='fire';
				},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'fireDamage')) return 'zerotarget';
						}
					}
				}
			},
			fenyin:{
				locked:false,
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase){
							var evt=player.getLastUsed();
							if(evt&&evt.card&&get.color(evt.card)!='none'&&get.color(card)!='none'&&get.color(evt.card)!=get.color(card)){
								return num+10;
							}
						}
					},
				},
				audio:2,
				trigger:{player:'useCard'},
				frequent:true,
				//usable:3,
				filter:function(event,player){
					if(_status.currentPhase!=player) return false;
					var evt=player.getLastUsed(1);
					if(!evt) return false;
					var color1=get.color(evt.card);
					var color2=get.color(event.card);
					return color1&&color2&&color1!='none'&&color2!='none'&&color1!=color2;
				},
				content:function(){
					player.draw();
				},
				ai:{
					threaten:3,
				},
			},
			dujin:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				frequent:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					trigger.num+=1+Math.floor(player.countCards('e')/2);
				}
			},
			yingjian:{
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				audio:'qingyi',
				content:function(){
					player.chooseUseTarget('###是否发动【影箭】？###视为使用一张没有距离限制的【杀】',{name:'sha'},false,'nodistance').logSkill='yingjian';
				},
				ai:{
					threaten:function(player,target){
						return 1.6;
					}
				}
			},
			tunchu:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				check:function(event,player){
					return player.countCards('h')-player.countCards('h',{type:'equip'})<=player.hp;
				},
				filter:function(event,player){
					if(event.numFixed||player.storage.tunchu&&player.storage.tunchu.length) return false;
					return true;
				},
				content:function(){
					trigger.num+=2;
					player.addTempSkill('tunchu_choose','phaseDrawAfter');
				},
				init:function(player){
					if(!player.storage.tunchu) player.storage.tunchu=[];
				},
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
				},
				group:'tunchu_disable',
				subSkill:{
					choose:{
						trigger:{player:'phaseDrawEnd'},
						forced:true,
						popup:false,
						content:function(){
							'step 0'
							player.removeSkill('tunchu_choose');
							var nh=player.countCards('h');
							if(nh){
								player.chooseCard('h',[1,nh],'将任意张手牌置于你的武将牌上').set('ai',function(card){
									var player=_status.event.player;
									var count=game.countPlayer(function(current){
										return get.attitude(player,current)>2&&current.hp-current.countCards('h')>1;
									});
									if(ui.selected.cards.length>=count) return -get.value(card);
									return 5-get.value(card);
								});
							}
							else{
								event.finish();
							}
							'step 1'
							if(result.bool){
								player.lose(result.cards,ui.special,'toStorage');
								player.storage.tunchu.addArray(result.cards);
								player.markSkill('tunchu');
								player.syncStorage('tunchu');
							}
						}
					},
					disable:{
						mod:{
							cardEnabled:function(card,player){
								if(player.storage.tunchu&&player.storage.tunchu.length&&card.name=='sha'){
									return false;
								}
							},
							cardUsable:function(card,player){
								if(player.storage.tunchu&&player.storage.tunchu.length&&card.name=='sha'){
									return false;
								}
							},
						}
					}
				}
			},
			shuliang:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.storage.tunchu&&player.storage.tunchu.length>0&&event.player.countCards('h')<event.player.hp&&event.player.isAlive();
				},
				content:function(){
					'step 0'
					var goon=(get.attitude(player,trigger.player)>0);
					player.chooseCardButton(get.prompt('shuliang',trigger.player),player.storage.tunchu).set('ai',function(){
						if(_status.event.goon) return 1;
						return 0;
					}).set('goon',goon);
					'step 1'
					if(result.bool){
						player.logSkill('shuliang',trigger.player);
						player.storage.tunchu.remove(result.links[0]);
						player.$throw(result.links);
						game.cardsDiscard(result.links);
						player.syncStorage('tunchu');
						if(player.storage.tunchu.length==0){
							player.unmarkSkill('tunchu');
						}
						trigger.player.draw(2);
					}
				}
			},
			choulve:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('he');
					})
				},
				content:function(){
					'step 0'
					var str='令一名其他角色交给你一张牌';
					if(player.storage.choulve){
						str+='若其如此做，视为你使用【'+get.translation(player.storage.choulve)+'】';
					}
					var goon=true;
					if(player.storage.choulve){
						goon=game.hasPlayer(function(current){
							return player.canUse(player.storage.choulve,current)&&get.effect(current,player.storage.choulve,player,player)>0;
						});
					}
					player.chooseTarget(get.prompt('choulve'),str,function(card,player,target){
						return target!=player&&target.countCards('he');
					}).set('ai',function(target){
						if(!_status.event.goon) return 0;
						var player=_status.event.player;
						if(get.attitude(player,target)>=0&&get.attitude(target,player)>=0){
							return Math.sqrt(target.countCards('he'));
						}
						return 0;
					}).set('goon',goon);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('choulve',target);
						target.chooseCard('he','是否交给'+get.translation(player)+'一张牌？',
							player.storage.choulve?('若如此做，视为'+get.translation(player)+
							'使用【'+get.translation(player.storage.choulve)+'】'):null).set('ai',function(card){
							if(_status.event.goon) return 7-get.value(card);
							return 0;
						}).set('goon',get.attitude(target,player)>1);
						event.target=target;
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.target.give(result.cards,player);
						if(player.storage.choulve){
							player.chooseUseTarget(player.storage.choulve,true,false);
						}
					}
				},
				group:'choulve_damage',
				subSkill:{
					damage:{
						trigger:{player:'damageEnd'},
						silent:true,
						content:function(){
							if(trigger.card&&get.info(trigger.card).enable&&get.type(trigger.card)!='delay'){
								player.storage.choulve={name:trigger.card.name};
							}
						}
					}
				}
			},
			polu:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','damageEnd']},
				forced:true,
				filter:function(event,player){
					return !player.getEquip('ly_piliche');
				},
				content:function(){
					if(trigger.name=='phaseZhunbei'){
						player.useCard(game.createCard('ly_piliche','diamond',1),player);
					}
					else{
						player.draw(trigger.num);
					}
				}
			},
			ly_piliche:{
				trigger:{source:'damageSource'},
				check:function(event,player){
					return get.attitude(player,event.player)<0;
				},
				filter:function(event,player){
					if(event.card&&get.type(event.card)=='delay') return false;
					return event.player.isIn()&&(event.player.getEquip(2)||event.player.getEquip(3));
				},
				logTarget:'player',
				content:function(){
					var equip2=trigger.player.getEquip(2);
					var equip3=trigger.player.getEquip(3);
					var cards=[];
					if(equip2) cards.push(equip2);
					if(equip3) cards.push(equip3);
					if(cards.length){
						trigger.player.discard(cards);
					}
				}
			},
		},
		translate:{
			ly_piliche:'霹雳车',
			ly_piliche_info:'当你对其他角色造成伤害后，若造成伤害的牌不为延时锦囊牌，你可以弃置其装备区里的防具牌与+1坐骑牌；当你失去此装备时，销毁之。',
			polu:'破橹',
			polu_info:'锁定技，回合开始时，若你的装备区里没有【霹雳车】，你使用之；当你受到1点伤害后，若你的装备区里没有【霹雳车】，你摸一张牌。',
			choulve:'筹略',
			choulve_info:'出牌阶段开始时，你可以令一名其他角色交给你一张牌，若其如此做，视为你使用上一张对你过造成伤害且不为延时锦囊牌的牌。',
			tunchu:'屯储',
			tunchu_info:'摸牌阶段，若你没有「粮」，你可以多摸两张牌。若如此做，摸牌阶段结束时，你可以将任意张手牌置于你的武将上，称为「粮」，只要你的武将牌上有「粮」，你便不能使用【杀】',
			shuliang:'输粮',
			shuliang_info:'一名角色的结束阶段开始时，若其手牌数少于体力值，你可以移去一张「粮」，然后该角色摸两张牌',
			fenyin:'奋音',
			yingjian:'影箭',
			fenyin_info:'你的回合内，当你使用牌时，若此牌与你于此回合内使用的上一张牌的颜色不同，则你可以摸一张牌。',
			yingjian_info:'准备阶段开始时，你可以视为使用一张无距离限制的【杀】。',
			dujin:'独进',
			dujin_info:'摸牌阶段，你可以多摸X+1张牌。（X为你装备区里牌数的一半且向下取整）',
			shixin:'释衅',
			shixin_info:'锁定技，当你受到火属性伤害时，你防止此伤害。',
			zhaohuo:'招祸',
			zhaohuo_info:'锁定技，当其他角色进入濒死状态时，你将体力上限调整为1点。若你的体力上限因此减少，则你摸一张牌。（X为你以此法减少的体力上限）',
			yixiang:'义襄',
			yixiang_info:'每名角色的回合限一次，当你成为一名角色使用牌的目标后，若该角色的体力值大于你的体力值，你可以随机获得牌堆里的一张你没有的基本牌。',
			yirang:'揖让',
			yirang_info:'出牌阶段开始时，你可以将所有非基本牌交给一名体力上限大于你的其他角色，然后调整体力上限至与该角色相同并回复X点体力（X为你以此法交给其的牌的类别数）。',
			kuangcai:'狂才',
			kuangcai_info:'出牌阶段开始时，你可以令你此阶段内的主动出牌时间变为5秒。若如此做，你于此阶段内使用牌没距离和次数限制，且每当你于此阶段内使用牌时，你摸一张牌且主动出牌时间-1秒。若主动出牌时间减至0，则你结束出牌阶段。',
			shejian:'舌剑',
			shejian_info:'弃牌阶段结束时，若你于此阶段弃置的所有牌花色均不相同，则你可以弃置一名其他角色的一张牌。',
			"xinfu_daigong":"怠攻",
			"xinfu_daigong_info":"每回合限一次。当你受到伤害时，你可以展示所有手牌，然后令伤害来源选择一项：交给你一张与你所有手牌花色均不相同的一张牌，或防止此伤害。",
			"xinfu_zhaoxin":"昭心",
			"xinfu_zhaoxin_info":"出牌阶段限一次，你可以将任意张手牌置于武将牌上并摸等量的牌，称之为「望」（你至多拥有三张「望」）。你或你攻击范围内的一名其他角色的摸牌阶段结束后，其可以获得一张由你选择的「望」，然后你可以对其造成1点伤害。",
			"zhaoxin_give":"昭心",
			"zhaoxin_give_info":"",
			"xinfu_qianchong":"谦冲",
			"xinfu_qianchong_info":"锁定技，若你的装备区内有牌且：均为红色，则你视为拥有技能〖明哲〗。均为黑色，则你视为拥有技能〖帷幕〗。若均不满足，则出牌阶段开始时，你可以选择一种类别的牌，然后你本回合内使用该类别的牌时没有次数和距离限制。",
			"qc_weimu":"帷幕",
			"qc_weimu_info":"",
			"qc_mingzhe":"明哲",
			"qc_mingzhe_info":"",
			"xinfu_shangjian":"尚俭",
			"xinfu_shangjian_info":"一名角色的结束阶段开始时，若你于此回合内失去了X张或更少的牌，则你可以摸等量的牌。（X为你的体力值）",
			"rw_bagua_skill":"先天八卦阵",
			"rw_bagua_skill_info":"当你需要使用或打出一张【闪】时，你可以进行判定，若判定结果不为黑桃，视为你使用或打出了一张【闪】。",
			"rw_baiyin_skill":"照月狮子盔",
			"rw_baiyin_skill_info":"锁定技，当你受到大于1的伤害时，你将伤害值改为1；当你失去装备区里的【照月狮子盔】时，你回复1点体力并摸两张牌。",
			"rw_lanyinjia":"精银甲",
			"rw_lanyinjia_info":"你可以将一张手牌当做【闪】使用或打出。锁定技，【精银甲】不会无效。",
			"rw_minguangkai_cancel":"耀光铠",
			"rw_minguangkai_cancel_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rw_minguangkai_link":"耀光铠",
			"rw_minguangkai_link_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rw_renwang_skill":"仁王金刚盾",
			"rw_renwang_skill_info":"黑色【杀】和红桃【杀】对你无效。",
			"rw_tengjia1":"桐油百韧甲",
			"rw_tengjia1_info":"锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
			"rw_tengjia2":"桐油百韧甲",
			"rw_tengjia2_info":"锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
			"rw_tengjia3":"桐油百韧甲",
			"rw_tengjia3_info":"锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
			"rw_tengjia4":"桐油百韧甲",
			"rewrite_bagua":"先天八卦阵",
			"rewrite_bagua_info":"当你需要使用或打出一张【闪】时，你可以进行判定，若判定结果不为黑桃，视为你使用或打出了一张【闪】。",
			"rewrite_baiyin":"照月狮子盔",
			"rewrite_baiyin_info":"锁定技，当你受到大于1的伤害时，你将伤害值改为1；当你失去装备区里的【照月狮子盔】时，你回复1点体力并摸两张牌。",
			"rewrite_lanyinjia":"精银甲",
			"rewrite_lanyinjia_info":"你可以将一张手牌当做【闪】使用或打出。锁定技，【精银甲】不会无效。",
			"rewrite_minguangkai":"耀光铠",
			"rewrite_minguangkai_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rewrite_renwang":"仁王金刚盾",
			"rewrite_renwang_info":"黑色【杀】和红桃【杀】对你无效。",
			"rewrite_tengjia":"桐油百韧甲",
			"rewrite_tengjia_info":"锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
			"rewrite_zhuge":"元戎精械弩",
			"rewrite_zhuge_info":"锁定技，你于出牌阶段内使用【杀】无次数限制。",
			rw_zhuge_skill:'诸葛连弩',
			rw_zhuge_skill_info:'锁定技，你于出牌阶段内使用【杀】无次数限制。',
			takaramono:"宝物",
			"wolong_card":"卧龙",
			"wolong_card_info":"对一名角色造成1点火焰伤害。若场上有存活的诸葛亮(火)，则改为对至多两名角色各造成两点火焰伤害。",
			"fengchu_card":"凤雏",
			"fengchu_card_info":"横置至多三名角色。若场上有存活的庞统(火)，则改为横置至多四名角色。",
			"xuanjian_card":"玄剑",
			"xuanjian_card_info":"令一名角色摸一张牌并回复1点体力。若场上有存活的徐庶(将/界)，则改为令一名角色摸一张牌并回复1点体力，然后你摸一张牌。",
			"shuijing_card":"水镜",
			"shuijing_card_info":"将一名角色装备区内的防具牌移动到另一名角色对应区域。若场上有存活的司马徽，则改为将1名角色装备区内的1件装备移动到另1角色对应区域。","xinfu_pingcai":"评才",
			"xinfu_pingcai_info":"出牌阶段限一次，你可以挑选一个宝物并擦拭掉其上面的灰尘。然后，你可以根据宝物类型执行对应的效果。",
			"xinfu_pdgyingshi":"隐世",
			"xinfu_pdgyingshi_info":"锁定技，你始终跳过准备阶段，判定阶段，结束阶段。你不能被选择为延时锦囊牌的目标。",
			"pcaudio_wolong_card":"卧龙",
			"pcaudio_wolong_card_info":"",
			"pcaudio_fengchu_card":"凤雏",
			"pcaudio_fengchu_card_info":"",
			"pcaudio_shuijing_card":"水镜",
			"pcaudio_shuijing_card_info":"",
			"pcaudio_xuanjian_card":"玄剑",
			"pcaudio_xuanjian_card_info":"",
			"yizan_respond_sha":"翊赞",
			"yizan_respond_sha_info":"",
			"yizan_use":"翊赞",
			"yizan_use_info":"你可以将两张牌（其中至少一张为基本牌）当做任意基本牌使用或打出。",
			"yizan_respond_shan":"翊赞",
			"yizan_respond_shan_info":"",
			"xinfu_longyuan":"龙渊",
			"xinfu_longyuan_info":"觉醒技，当你使用或打出的基本牌结算完成后，若你本局游戏内发动过〖翊赞〗的次数大于等于3，则你将〖翊赞〗描述中的“两张牌”改为“一张牌”。",
			"yizan_count":"翊赞",
			"yizan_count_info":"",
			"xinfu_jingxie1":"精械",
			"xinfu_jingxie1_info":"出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。",
			"xinfu_jingxie2":"精械",
			"xinfu_jingxie2_info":"",
			"xinfu_qiaosi":"巧思",
			"xinfu_qiaosi_info":"出牌阶段限一次，你可以投掷一枚六面骰子，展示牌堆顶的X张牌并获得之。然后，你选择一项：1.交给一名其他角色X张牌。2.弃置X张牌。（X为骰子的点数）",
			xin_xiahoudun:'手杀夏侯惇',
			xinqingjian:'清俭',
			xinqingjian2:'清俭',
			xinqingjian_info:'每回合限一次。当你不因摸牌阶段的额定摸牌而获得牌时，你可以将任意张牌扣置于武将牌上。回合结束时，你将这些牌交给一名其他角色。若这些牌的数量大于1，你摸一张牌。',
			zhangyì:'张翼',
			jiakui:'贾逵',
			zhiyi:'执义',
			zhiyi_info:'锁定技，当你于一回合内使用或打出第一张基本牌时，你选择一项：1.摸一张牌。2.于此牌A（若此牌是因响应牌B而使用或打出的，则改为牌B）的使用或打出流程结算完成后，视为使用一张与此牌名称和属性相同的卡牌。',
			zhongzuo:'忠佐',
			zhongzuo_info:'一名角色的回合结束时，若你于此回合内造成或受到过伤害，则你可以令一名角色摸两张牌。若该角色已受伤，则你摸一张牌。',
			wanlan:'挽澜',
			wanlan_info:'限定技，当一名角色进入濒死状态时，你可以弃置所有手牌并令其回复体力至1点，然后对当前回合角色造成1点伤害。',
			re_jikang:"手杀嵇康",
			old_bulianshi:'手杀步练师',
			old_caochun:'旧曹纯',
			shenpei:'审配',
			re_wangyun:'手杀王允',
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
			
			xinzhanyi:'战意',
			xinzhanyi_info:'出牌阶段限一次，你可以弃置一张牌并失去1点体力，然后根据你弃置的牌获得以下效果直到回合结束：基本牌，你可以将一张基本牌当作杀、酒或桃使用，且你本回合第一次以此法使用的牌的回复值/伤害值+1；锦囊牌，摸三张牌且你使用的牌不能被【无懈可击】响应；装备牌，你使用【杀】指定目标角色后，其弃置两张牌，然后你获得其中的一张。',
			xinzhanyi_basic_backup:'战意',
			xinzhanyi_basic:'战意',
			xinzhanyi_equip:'战意',
			
			meiyong:'姝勇',
			meiyong_info:'当你使用或打出【杀】时，你可以获得一名其他角色的一张牌，然后其摸一张牌。',
			rexushen:'许身',
			rexushen_info:'限定技，出牌阶段，你可以失去X点体力（X为场上男性角色的数量）。若你以此法进入了濒死状态，则当你因一名角色而脱离此濒死状态后，你可以令其获得技能〖武圣〗和〖当先〗。',
			rezhennan:'镇南',
			rezhennan_info:'当你成为其他角色使用的牌的目标后，若此牌的目标数大于该角色的体力值，则你可以弃置一张牌并对其造成1点伤害。',
			
			hujinding:'胡金定',
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
