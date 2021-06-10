'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'sp2',
		connect:true,
		character:{
			zhangmiao:['male','qun',4,['mouni','zongfan']],
			liangxing:['male','qun',4,['lulve','lxzhuixi'],['unseen']],
			ruanyu:['male','wei',3,['xingzuo','miaoxian']],
			xiahoujie:['male','wei',5,['liedan','zhuangdan']],
			caosong:['male','wei',4,['cslilu','csyizheng']],
			re_taoqian:['male','qun',3,['zhaohuo','reyixiang','reyirang']],
			zhaozhong:['male','qun',6,['yangzhong','huangkong']],
			fanyufeng:['female','qun',3,['bazhan','jiaoying']],
			re_chunyuqiong:['male','qun',4,['recangchu','reliangying','reshishou']],
			guozhao:['female','wei',3,['pianchong','zunwei']],
			hanfu:['male','qun',4,['hfjieying','weipo']],
			re_quyi:['male','qun',4,['refuqi','jiaozi']],
			dongxie:['female','qun','3/4',['juntun','jiaojie']],
			re_xinxianying:['female','wei',3,['rezhongjian','recaishi']],
			wangrong:['female','qun',3,['minsi','jijing','zhuide']],
			ol_dingyuan:['male','qun',4,['cixiao','xianshuai']],
			liubian:['male','qun',3,['shiyuan','dushi','yuwei'],['zhu']],
			xin_baosanniang:['female','shu',3,['decadewuniang','decadexushen']],
			re_hejin:['male','qun',4,['spmouzhu']],
			re_hansui:['male','qun',4,['spniluan','spweiwu']],
			liuhong:['male','qun',4,['yujue','tuxing']],
			zhujun:['male','qun',4,['gongjian','kuimang']],
			caoxing:['male','qun',4,['cxliushi','zhanwan']],
			re_maliang:['male','shu',3,['rexiemu','heli'],[]],
			ol_yujin:['male','wei',4,['rezhenjun']],
			caobuxing:['male','wu',3,['moying','juanhui'],[]],
			re_sunluyu:['female','wu',3,['remeibu','remumu']],
			re_liuzan:['male','wu',4,['refenyin','liji']],
			wenyang:['male','wei',5,['xinlvli','choujue']],
			wangshuang:['male','wei',8,['spzhuilie']],
			huaman:['female','shu',3,['hmmanyi','mansi','souying','zhanyuan']],
			re_panfeng:['male','qun',4,['xinkuangfu']],
			xingdaorong:['male','qun','4/6',['xuxie']],
			lijue:["male","qun","4/6",["xinfu_langxi","xinfu_yisuan"],[]],
			zhangji:["male","qun",4,["xinfu_lveming","xinfu_tunjun"],[]],
			fanchou:["male","qun",4,["xinfu_xingluan"],[]],
			guosi:["male","qun",4,["xinfu_tanbei","xinfu_sidao"],[]],
			lvkai:["male","shu",3,["xinfu_tunan","xinfu_bijing"],[]],
			zhanggong:["male","wei",3,["xinfu_zhenxing","xinfu_qianxin"],[]],
			weiwenzhugezhi:["male","wu",4,["xinfu_fuhai"],[]],
			beimihu:['female','qun',3,['zongkui','guju','baijia']],
			xurong:["male","qun",4,["xinfu_xionghuo","xinfu_shajue"],[]],
			zhangqiying:["female","qun",3,["xinfu_falu","xinfu_dianhua","xinfu_zhenyi"],[]],
			sp_liuqi:['male','qun',3,['spwenji','sptunjiang']],
			xf_tangzi:["male","wei",4,["xinfu_xingzhao"],[]],
			xf_huangquan:["male","shu",3,["xinfu_dianhu","xinfu_jianji"],[]],
			xf_sufei:["male","wu",4,["xinfu_lianpian"],[]],
			xushao:['male','qun',4,['pingjian']],
			puyuan:['male','shu',4,['pytianjiang','pyzhuren']],
			xinpi:['male','wei',3,['xpchijie','yinju']],
			lisu:['male','qun',2,['lslixun','lskuizhu']],
			zhangwen:['male','wu',3,['songshu','sibian']],
			guanlu:['male','wei',3,['tuiyan','busuan','mingjie']],
			gexuan:['male','wu',3,['gxlianhua','zhafu']],
			mangyachang:["male","qun",4,["spjiedao"],[]],
			xugong:["male","wu",3,["biaozhao","yechou"],[]],
			zhangchangpu:["female","wei",3,["yanjiao","xingshen"],[]],
			gaolan:['male','qun',4,['xiying']],
			sp_shenpei:['male','qun',3,['gangzhi','beizhan']],
			xunchen:['male','qun',3,['fenglve','mouzhi']],
			sp_zhanghe:['male','qun',4,['yuanlve']],
			sp_xuyou:['male','qun',3,['spshicai','spfushi']],
			chunyuqiong:['male','qun',5,['cangchu','sushou','liangying']],
			lvkuanglvxiang:['male','qun',4,['liehou','qigong']],
			leitong:['male','shu',4,['kuiji']],
			wulan:['male','shu',4,['wlcuorui']],
			ns_lijue:['male','qun','4/6',['nsfeixiong','nscesuan']],
			ns_zhangji:['male','qun',4,['nslulve']],
			ns_fanchou:['male','qun',4,['nsyangwu']],
			ns_jiaxu:['male','qun',3,['nsyice','luanwu']],
			ns_chendao:['male','shu',4,['nsjianglie']],
			yj_caoang:['male','wei',4,['yjxuepin']],
			mini_sunquan:['male','wu',4,['minizhiheng','jiuyuan'],['zhu']],
			mini_zuoci:['male','qun',3,['minishendao','minixinsheng']],
			mini_jiangwei:['male','shu',4,['minitiaoxin','zhiji']],
			mini_diaochan:['female','qun',3,['minilijian','rebiyue']],
			mini_zhangchunhua:['female','wei',3,['jueqing','minishangshi']],
			ns_caoanmin:['male','wei',4,['nskuishe']],
		},
		characterSort:{
			sp2:{
				sp_whlw:["xurong","lijue","zhangji","fanchou","guosi"],
				sp_zlzy:["zhangqiying","lvkai","zhanggong","weiwenzhugezhi","beimihu"],
				sp_longzhou:["xf_tangzi","xf_huangquan","xf_sufei","sp_liuqi"],
				sp_zizouqi:["mangyachang","xugong","zhangchangpu"],
				sp_sbfm:["lisu","xinpi","zhangwen"],
				sp_shengun:["puyuan","guanlu","gexuan","xushao"],
				sp_baigei:['re_panfeng','xingdaorong','caoxing','re_chunyuqiong','xiahoujie'],
				sp_guandu:["sp_zhanghe","xunchen","sp_shenpei","gaolan","lvkuanglvxiang","chunyuqiong","sp_xuyou"],
				sp_huangjin:['liuhong','zhujun','re_hejin','re_hansui','liubian'],
				sp_fadong:['ol_dingyuan','wangrong','re_quyi','hanfu'],
				sp_xuzhou:['re_taoqian','caosong'],
				sp_decade:['wulan','leitong','huaman','wangshuang','wenyang','re_liuzan','re_sunluyu','caobuxing','ol_yujin','re_maliang','xin_baosanniang','re_xinxianying','dongxie','guozhao','fanyufeng','zhaozhong','ruanyu','liangxing','zhangmiao'],
				sp_mini:["mini_sunquan","mini_zuoci","mini_jiangwei","mini_diaochan","mini_zhangchunhua"],
				sp_luanwu:["ns_lijue","ns_zhangji","ns_fanchou"],
				sp_yongjian:["ns_chendao","yj_caoang"],
				sp_s:["ns_jiaxu","ns_caoanmin"],
			}
		},
		skill:{
			//张邈
			mouni:{
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h','sha')>0;
				},
				content:function(){
					'step 0'
					player.addSkill('mouni2');
					player.chooseTarget(get.prompt2('mouni'),lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player,cards=player.getCards('h','sha');
						if(get.attitude(player,target)>=0||!player.canUse(cards[0],target,false)||(!player.hasJudge('lebu')&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
							target:target,
							card:cards[0],
						},true))) return 0;
						return get.effect(target,cards[0],player,player);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('mouni',target);
						event.cards=player.getCards('h','sha');
					}
					else event.finish();
					'step 2'
					if(event.mouni_dying) return;
					var hs=player.getCards('h');
					cards=cards.filter(function(card){
						return hs.contains(card)&&get.name(card,player)=='sha'&&player.canUse({
							name:'sha',
							nature:get.nature(card,player),
							isCard:true,
							cards:[card],
						},target,false);
					});
					if(cards.length){
						var card=cards.randomRemove(1)[0];
						player.useCard(target,false,card);
						event.redo();
					}
					'step 3'
					if(player.getHistory('useCard',function(evt){
						return evt.getParent()==event&&!player.getHistory('sourceDamage',function(evt2){
							return evt.card==evt2.card;
						}).length;
					}).length) player.skip('phaseUse');
					player.removeSkill('mouni2');
				},
			},
			mouni2:{
				charlotte:true,
				trigger:{global:'dying'},
				forced:true,
				firstDo:true,
				popup:false,
				filter:function(event,player){
					var evt=event.getParent('mouni');
					return evt&&evt.player==player&&evt.target==event.player;
				},
				content:function(){
					trigger.getParent('mouni').mouni_dying=true;
				},
			},
			zongfan:{
				derivation:'zhangu',
				trigger:{player:'phaseJieshuBegin'},
				juexingji:true,
				forced:true,
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return !player.getHistory('skipped').contains('phaseUse')&&player.getHistory('useCard',function(evt){
						return evt.getParent().name=='mouni';
					});
				},
				content:function(){
					'step 0'
					player.awakenSkill('zongfan');
					var num=player.countCards('he');
					if(num>0){
						player.chooseCardTarget({
							prompt:'是否将任意张牌交给一名其他角色？',
							selectCard:[1,num],
							filterCard:true,
							filterTarget:lib.filter.notMe,
							position:'he',
							ai1:function(card){
								if(card.name=='du') return 10;
								else if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
								var player=_status.event.player;
								if(ui.selected.cards.length>4||!game.hasPlayer(function(current){
									return get.attitude(player,current)>0&&!current.hasSkillTag('nogain');
								})) return 0;
								return 1/Math.max(0.1,get.value(card));
							},
							ai2:function(target){
								var player=_status.event.player,att=get.attitude(player,target);
								if(ui.selected.cards[0].name=='du') return -att;
								if(target.hasSkillTag('nogain')) att/=6;
								return att;
							},
						});
					}
					else event.goto(2);
					'step 1'
					if(result.bool){
						var cards=result.cards,target=result.targets[0],num=Math.min(5,cards.length);
						target.gain(cards,player,'giveAuto');
						player.gainMaxHp(num);
						player.recover(num);
					}
					'step 2'
					player.removeSkill('mouni');
					player.addSkill('zhangu');
				},
			},
			zhangu:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.maxHp>1&&(player.countCards('h')==0||player.countCards('e')==0)
				},
				content:function(){
					var cards=[],types=[];
					for(var i=0;i<3;i++){
						var card=get.cardPile2(function(card){
							return !cards.contains(card)&&!types.contains(get.type2(card,false));
						});
						if(card){
							cards.push(card);
							types.push(get.type2(card,false));
						}
						else break;
					}
					if(cards.length) player.gain(cards,'gain2');
					player.loseMaxHp();
				},
			},
			//梁兴
			lulve:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					var hs=player.countCards('h');
					return hs>1&&game.hasPlayer(function(target){
						var ts=target.countCards('h');
						return target!=player&&ts>0&&hs>ts;
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('lulve'),function(card,player,target){
						var hs=player.countCards('h'),ts=target.countCards('h');
						return target!=player&&ts>0&&hs>ts;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('lulve',target);
						var str=get.translation(player);
						target.chooseControl().set('choiceList',[
							'将所有手牌交给'+str+'，然后其将武将牌翻面',
							'将武将牌翻面，然后视为对'+str+'使用【杀】',
						]).set('ai',function(){
							return Math.random()<0.5?0:1;
						});
					}
					else event.finish();
					'step 2'
					if(result.index==0){
						player.gain(target.getCards('h'),target,'giveAuto');
						player.turnOver();
						event.finish();
					}
					else target.turnOver();
					'step 3'
					if(target.canUse({name:'sha',isCard:true},player,false)) target.useCard({name:'sha',isCard:true},player,false);
				},
			},
			lxzhuixi:{
				audio:2,
				trigger:{
					player:'damageBegin3',
					source:'damageBegin1',
				},
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					return event.source&&event.player.isTurnedOver()!=event.source.isTurnedOver();
				},
				content:function(){
					trigger.num++;
				},
			},
			//阮瑀
			xingzuo:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				frequent:true,
				content:function(){
					'step 0'
					player.addTempSkill('xingzuo2');
					var cards=get.bottomCards(3);
					event.cards2=cards;
					game.cardsGotoOrdering(cards);
					var dialog=['兴作：将三张牌置于牌堆底（先选择的在上）','<div class="text center">牌堆底</div>',cards];
					var hs=player.getCards('h');
					if(hs.length){
						dialog.push('<div class="text center">你的手牌</div>');
						dialog.push(hs);
					}
					player.chooseButton(dialog,3,true).set('ai',function(button){
						var player=_status.event.player,allcards=player.getCards('h').concat(_status.event.getParent().cards2);
						if(button.link.name=='sha'&&allcards.filter(function(card){
							return card.name=='sha'&&!ui.selected.buttons.filter(function(button){
								return button.link==card;
							}).length;
						}).length>player.getCardUsable({name:'sha'})) return 10;
						return -player.getUseValue(button.link,player);
					});
					'step 1'
					if(result.bool){
						event.forceDie=true;
						var cards=result.links;
						event.cards=cards;
						player.storage.xingzuo2=cards;
						var hs=player.getCards('h');
						var lose=[],gain=event.cards2;
						for(var i of cards){
							if(hs.contains(i)) lose.push(i);
							else gain.remove(i);
						}
						if(lose.length) player.lose(lose,ui.cardPile);
						if(gain.length) player.gain(gain,'draw');
					}
					else event.finish();
					'step 2'
					for(var i of cards){
						if(!(('hejsd').includes(get.position(i,true)))){
							i.fix();
							ui.cardPile.appendChild(i);
						}
					}
					game.updateRoundNumber();
				},
			},
			xingzuo2:{
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				charlotte:true,
				onremove:true,
				filter:function(event,player){
					return game.hasPlayer(function(target){
						return target.countCards('h')>0;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(function(card,player,target){
						return target.countCards('h')>0;
					},'兴作：是否令一他角色将其手牌与牌堆底的三张牌替换？').set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target),hs=target.getCards('h'),num=hs.length;
						var getv=function(list,target){
							var num=0;
							for(var i of list) num+=get.value(i,target);
							return num;
						},val=getv(hs,target)-getv(player.storage.xingzuo2,target);
						if(num<3) return att*Math.sqrt(Math.max(0,-val))*1.5;
						if(num==3) return -att*Math.sqrt(Math.max(0,val));
						if(player.hp<(num>4?3:2)) return 0;
						return -att*Math.sqrt(Math.max(0,val));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('xingzuo',target);
						var cards=get.bottomCards(3);
						game.cardsGotoOrdering(cards);
						var hs=target.getCards('h');
						target.lose(hs,ui.cardPile);
						target.gain(cards,'draw');
						if(hs.length>3) player.loseHp();
					}
					else event.finish();
					'step 2'
					game.updateRoundNumber();
				},
			},
			miaoxian:{
				hiddenCard:function(player,name){
					return get.type(name)=='trick'&&!player.getStorage('miaoxian2').contains(name)&&player.countCards('h',{color:'black'})==1;
				},
				enable:'chooseToUse',
				filter:function(event,player){
					var cards=player.getCards('h',{color:'black'});
					if(cards.length!=1) return false;
					var mod2=game.checkMod(cards[0],player,'unchanged','cardEnabled2',player);
					if(mod2===false) return false;
					var storage=player.getStorage('miaoxian2');
					for(var i of lib.inpile){
						if(!storage.contains(i)&&get.type(i)=='trick'&&event.filterCard({
							name:i,
							cards:cards,
						},player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var cards=player.getCards('h',{color:'black'});
						var storage=player.getStorage('miaoxian2');
						var list=[];
						for(var i of lib.inpile){
							if(!storage.contains(i)&&get.type(i)=='trick'&&event.filterCard({
								name:i,
								cards:cards,
							},player,event)){
								list.push(['锦囊','',i]);
							}
						}
						return ui.create.dialog('妙弦',[list,'vcard'],'hidden');
					},
					check:function(button){
						var player=_status.event.player;
						return player.getUseValue({name:button.link[2]})+1;
					},
					backup:function(links,player){
						return {
							audio:'miaoxian',
							popname:true,
							filterCard:{color:'black'},
							selectCard:-1,
							position:'h',
							viewAs:{
								name:links[0][2],
							},
							onuse:function(links,player){
								if(!player.storage.miaoxian2) player.storage.miaoxian2=[];
								player.storage.miaoxian2.add(links.card.name);
								player.addTempSkill('miaoxian2');
							},
						}
					},
					prompt:function(links,player){
						return '将'+get.translation(player.getCards('h',{color:'black'})[0])+'当做'+get.translation(links[0][2])+'使用';
					},
				},
				group:'miaoxian_use',
				subfrequent:['use'],
				subSkill:{
					use:{
						audio:'miaoxian',
						trigger:{player:'loseAfter'},
						frequent:true,
						prompt:'是否发动【妙弦】摸一张牌？',
						filter:function(event,player){
							var evt=event.getParent();
							if(evt.name!='useCard') return false;
							return event.hs&&event.hs.length==1&&event.cards&&event.cards.length==1
							&&get.color(event.hs[0],player)=='red'&&!player.countCards('h',{color:'red'});
						},
						content:function(){
							player.draw();
						},
					},
					backup:{
						audio:'miaoxian',
					},
				},
				ai:{
					order:12,
					result:{
						player:1,
					},
				},
			},
			miaoxian2:{onremove:true},
			//夏侯杰
			liedan:{
				audio:2,
				trigger:{global:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return (player!=event.player||player.countMark('liedan')>4)&&!player.hasSkill('zhuangdan_mark');
				},
				logTarget:'player',
				content:function(){
					if(player==trigger.player){
						player.die();
						return;
					}
					var num=0;
					if(player.hp>trigger.player.hp) num++;
					if(player.countCards('h')>trigger.player.countCards('h')) num++;
					if(player.countCards('e')>trigger.player.countCards('e')) num++;
					if(num){
						player.draw(num);
						if(num==3) player.gainMaxHp();
					}
					else{
						player.addMark('liedan',1);
						player.loseHp();
					}
				},
				intro:{content:'mark'},
			},
			zhuangdan:{
				audio:2,
				trigger:{global:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player!=event.player&&player.isMaxHandcard(true);
				},
				content:function(){
					player.addTempSkill('zhuangdan_mark',{player:'phaseEnd'})
				},
			},
			zhuangdan_mark:{
				mark:true,
				marktext:'胆',
				intro:{content:'我超勇的'},
			},
			//陶谦和曹嵩
			reyirang:{
				audio:'yirang',
				audioname:['re_taoqian'],
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
					player.chooseTarget(get.prompt2('reyirang'),function(card,player,target){
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
						player.logSkill('reyirang',target);
						target.gain(cards,player,'give');
						player.gainMaxHp(target.maxHp-player.maxHp,true);
						player.recover(cards.length);
					}
				}
			},
			cslilu:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return !event.numFixed;
				},
				check:function(event,player){
					return Math.min(player.maxHp,5)-player.countCards('h')>3||game.hasPlayer(function(current){
						return current!=player&&get.attitude(player,current)>0;
					});
				},
				content:function(){
					'step 0'
					trigger.changeToZero();
					'step 1'
					player.drawTo(Math.min(player.maxHp,5));
					'step 2'
					if(player.countCards('h')>0){
						var str='将至少一张手牌交给一名其他角色';
						var num=player.countMark('cslilu');
						if(num<player.countCards('h')){
							if(num>0) str+=('。若给出的牌数大于'+get.cnNumber(num)+'张，则你');
							else str+='，并';
							str+='加1点体力上限并回复1点体力'
						}
						player.chooseCardTarget({
							prompt:str,
							filterCard:true,
							filterTarget:lib.filter.notMe,
							selectCard:[1,Infinity],
							forced:true,
							ai1:function(card){
								if(ui.selected.cards.length<_status.event.goon){
									if(get.tag(card,'damage')&&game.hasPlayer(function(current){
										current!=player&&get.attitude(player,current)>0&&!current.hasSkillTag('nogain')&&!current.hasJudge('lebu')&&current.hasValueTarget(card);
									})) return 1;
									return 1/Math.max(0.1,get.value(card));
								}
								return 0;
							},
							ai2:function(target){
								return Math.sqrt(5-Math.max(4,target.countCards('h')))*get.attitude(_status.event.player,target);
							},
							goon:function(){
								if(!game.hasPlayer(function(current){
									return current!=player&&get.attitude(player,current)>0&&!current.hasSkillTag('nogain')&&!current.hasJudge('lebu');
								})) return 1;
								if(num<player.countCards('h')) return num+1;
								return 1;
							}(),
						});
					}
					else event.finish();
					'step 3'
					if(result.bool){
						var num=player.countMark('cslilu');
						result.targets[0].gain(result.cards,player,'giveAuto');
						if(result.cards.length>num){
							player.gainMaxHp();
							player.recover();
						}
						player.storage.cslilu=result.cards.length;
						player.markSkill('cslilu');
					}
				},
			},
			csyizheng:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('csyizheng'),lib.filter.notMe).set('ai',function(target){
						if(target.isTurnedOver()||target.hasJudge('lebu')) return 0;
						return get.attitude(_status.event.player,target)*Math.max(0,target.countCards('h')-2);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('csyizheng',target);
						player.storage.csyizheng2=target;
						player.addTempSkill('csyizheng2',{player:'phaseBegin'});
					}
				},
			},
			csyizheng2:{
				audio:'csyizheng',
				trigger:{
					global:['recoverBegin','damageBegin1'],
				},
				forced:true,
				charlotte:true,
				logTarget:function(event){
					return event.name=='damage'?event.source:event.player;
				},
				filter:function(event,player){
					var target=lib.skill.csyizheng2.logTarget(event);
					if(target!=player.storage.csyizheng2) return false;
					return player.maxHp>target.maxHp;
				},
				content:function(){
					player.loseMaxHp();
					trigger.num++;
				},
				mark:'character',
				intro:{
					content:'$造成伤害或回复体力时，若你的体力上限大于其，则你减1点体力上限，然后此伤害/回复量+1',
				},
			},
			reyixiang:{
				audio:'yixiang',
				audioname:['re_taoqian'],
				trigger:{player:'damageBegin1'},
				forced:true,
				filter:function(event,player){
					var evt=event.getParent(2);
					if(evt.name!='useCard'||evt.card!=event.card) return false;
					var source=evt.player;
					var phsu=evt.getParent('phaseUse');
					if(!source||source==player||source!=phsu.player) return false;
					return source.getHistory('useCard',function(evt2){
						return evt2.getParent('phaseUse')==phsu;
					})[0]==evt;
				},
				content:function(){
					trigger.num--;
				},
				group:'reyixiang_card',
				subSkill:{
					card:{
						trigger:{target:'useCardToTargeted'},
						forced:true,
						filter:function(event,player){
							if(get.color(event.card)!='black') return false;
							var evt=event.getParent();
							var source=evt.player;
							var phsu=evt.getParent('phaseUse');
							if(!source||source==player||source!=phsu.player) return false;
							return source.getHistory('useCard',function(evt2){
								return evt2.getParent('phaseUse')==phsu;
							}).indexOf(evt)==1;
						},
						content:function(){
							trigger.excluded.add(player);
						},
					},
				},
				ai:{
					effect:{
						target:function(card,player,target,current,isLink){
							if(isLink||!player.isPhaseUsing()) return;
							var num;
							var evt=_status.event.getParent('useCard'),evt2=_status.event.getParent('phaseUse');
							if(evt.card==card){
								num=player.getHistory('useCard',function(evt){
									return evt.getParent('phaseUse')==evt2;
								}).indexOf(evt);
							}
							else num=player.getHistory('useCard',function(evt){
								return evt.getParent('phaseUse')==evt2;
							}).length;
							if(num<0||num>1) return;
							if(num==0&&get.tag(card,'damage')) return 'zerotarget';
							if(num==1&&get.color(card)=='black') return 'zeroplayertarget';
						},
					},
				},
			},
			//赵忠
			yangzhong:{
				audio:2,
				trigger:{
					source:'damageSource',
					player:'damageEnd',
				},
				direct:true,
				filter:function(event,player){
					var target=event.player,source=event.source;
					if(player!=source&&!player.hasSkill('yangzhong')) return false;
					if(!target||!source||!target.isAlive()||!source.isAlive()) return false;
					return source.countCards('he')>1;
				},
				content:function(){
					'step 0'
					trigger.source.chooseToDiscard('是否对'+get.translation(trigger.player)+'发动【殃众】？','弃置两张牌，并令其失去1点体力','he',2).set('ai',function(card){
						var evt=_status.event;
						if(get.attitude(evt.player,evt.getTrigger().player)>=0) return 0;
						return 7-get.value(card);
					}).logSkill=['yangzhong',trigger.player];
					'step 1'
					if(result.bool) trigger.player.loseHp();
				},
			},
			huangkong:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				forced:true,
				filter:function(event,player){
					if(player==_status.currentPhase||event.targets.length!=1||player.countCards('h')) return false;
					var type=get.type(event.card);
					return ((type=='basic'||type=='trick')&&get.tag(event.card,'damage')>0);
				},
				content:function(){
					player.draw(2);
				},
			},
			//樊玉凤
			bazhan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(player.storage.bazhan){
						return game.hasPlayer(function(current){
							return current!=player&&current.countGainableCards(player,'h')>0;
						})
					}
					return player.countCards('h')>0;
				},
				filterCard:true,
				discard:false,
				lose:false,
				selectCard:function(){
					if(_status.event.player.storage.bazhan) return 0;
					return 1;
				},
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(player.storage.bazhan) return target.countGainableCards(player,'he')>0;
					return true;
				},
				prompt:function(){
					if(_status.event.player.storage.bazhan) return '获得一名其他角色的一张手牌';
					return '将一张手牌交给一名其他角色';
				},
				delay:false,
				check:function(card){
					var player=_status.event.player;
					var bool1=false,bool2=false;
					for(var i of game.players){
						if(get.attitude(player,i)<=0||player==i) continue;
						bool1=true;
						if(i.isDamaged()||i.isTurnedOver()){
							bool2=true;
							break;
						}
					}
					if(bool2&&(get.suit(card,player)=='heart'||get.name(card,player)=='jiu')) return 10;
					if(bool1) return 9-get.value(card);
					if(get.color(card)=='red') return 5-get.value(card);
					return 0;
				},
				content:function(){
					'step 0'
					if(player.storage.bazhan){
						player.storage.bazhan=false;
						event.recover=player;
						player.gainPlayerCard(target,'h',true,'visibleMove');
					}
					else{
						player.storage.bazhan=true;
						event.recover=target;
						target.gain(cards,player,'give');
						event.card=cards[0];
					}
					'step 1'
					var target=event.recover;
					if(result.bool&&result.cards&&result.cards.length){
						card=result.cards[0];
					}
					if(!card||!target||!target.getCards('h').contains(card)||(get.suit(card,target)!='heart'&&get.name(card,target)!='jiu')){
						event.finish();
						return;
					}
					var list=[];
					event.addIndex=0;
					var str=get.translation(target);
					if(target.isDamaged()) list.push('令'+str+'回复一点体力');
					else event.addIndex++;
					if(target.isLinked()||target.isTurnedOver()) list.push('令'+get.translation(target)+'复原武将牌');
					if(!list.length) event.finish();
					else player.chooseControl('cancel2').set('choiceList',list).set('ai',function(){
						var evt=_status.event.getParent();
						if(get.attitude(evt.player,evt.target)<0) return 'cancel2';
						if(target.hp>1&&target.isTurnedOver()) return 1-evt.addIndex;
						return 0;
					});
					'step 2'
					if(result.control=='cancel2') event.finish();
					else if(result.index+event.addIndex==0){
						event.recover.recover();
						event.finish();
					}
					else if(event.recover.isLinked()) event.recover.link();
					'step 3'
					if(event.recover.isTurnedOver()) event.recover.turnOver();
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							if(player.storage.bazhan) return -1;
							if(ui.selected.cards.length){
								var card=ui.selected.cards[0];
								if(get.value(card,target)<0) return -0.5;
								if(get.attitude(player,target)>0){
									if((target.isDamaged()||target.isTurnedOver())&&(get.suit(card,target)=='heart'||get.name(card,target)=='jiu')) return 3;
									if(target.hasUseTarget(card)&&target.getUseValue(card)>player.getUseValue(card,null,true)) return 1.4;
									return 1;
								}
								if(player.hasSkill('jiaoying',true)&&target.countCards('h','shan')&&!target.hasSkillTag('respondShan',true,null,true)&&get.color(card)=='red'&&player.countCards('h',function(card){
									return get.tag(card,'respondShan')&&get.effect(target,card,player,player)>0&&player.getUseValue(card)>0;
								})) return -1;
								return 1;
							}
							return 0;
						},
					},
				},
			},
			jiaoying:{
				audio:2,
				trigger:{source:'gainEnd'},
				forced:true,
				filter:function(event,player){
					if(player==event.player) return false;
					var evt=event.getl(player);
					return evt&&evt.hs&&evt.hs.length;
				},
				logTarget:'player',
				content:function(){
					var target=trigger.player;
					if(!target.storage.jiaoying2) target.storage.jiaoying2=[];
					var cs=trigger.getl(player).hs;
					for(var i of cs) target.storage.jiaoying2.add(get.color(i,player));
					target.addTempSkill('jiaoying2');
					target.markSkill('jiaoying2');
					player.addTempSkill('jiaoying3');
					if(!player.storage.jiaoying3) player.storage.jiaoying3=[];
					player.storage.jiaoying3.add(target);
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						var target=arg.target;
						if(target.getStorage('jiaoying2').contains('red')&&get.tag(arg.card,'respondShan')&&!target.hasSkillTag('respondShan',true,null,true)) return true;
						return false;
					},
				}
			},
			jiaoying2:{
				onremove:true,
				charlotte:true,
				mod:{
					cardEnabled2:function(card,player){
						if(player.getStorage('jiaoying2').contains(get.color(card))) return false;
					},
				},
				intro:{
					content:'本回合内不能使用或打出$牌',
				},
			},
			jiaoying3:{
				onremove:true,
				trigger:{global:'useCard1'},
				silent:true,
				firstDo:true,
				charlotte:true,
				filter:function(event,player){
					return player.storage.jiaoying3.contains(event.player);
				},
				content:function(){
					while(player.storage.jiaoying3.contains(trigger.player)) player.storage.jiaoying3.remove(trigger.player);
					if(!player.storage.jiaoying3.length) player.removeSkill('jiaoying3');
				},
				group:'jiaoying3_draw',
			},
			jiaoying3_draw:{
				trigger:{global:'phaseEnd'},
				direct:true,
				charlotte:true,
				filter:function(event,player){
					return player.getStorage('jiaoying3').length>0&&game.hasPlayer(function(current){
						return current.countCards('h')<Math.min(5,current.maxHp);
					})
				},
				content:function(){
					'step 0'
					player.storage.jiaoying3.shift();
					player.chooseTarget('醮影：令一名角色将手牌摸至手牌上限',function(card,player,target){
						return target.countCards('h')<Math.min(target.maxHp,5);
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>2){
							return Math.min(5,target.maxHp)-target.countCards('h');
						}
						return att/3;
					});
					'step 1'
					if(result.bool){
						player.logSkill('jiaoying',result.targets);
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].drawTo(Math.min(5,result.targets[i].maxHp));
						}
						if(lib.skill.jiaoying3_draw.filter(null,player)) event.goto(0);
					}
				},
			},
			recangchu:{
				audio:2,
				trigger:{
					global:'gameStart',
					player:'enterGame',
				},
				marktext:'粮',
				forced:true,
				filter:function(event,player){
					return player.countMark('recangchu')<game.countPlayer();
				},
				content:function(){
					player.addMark('recangchu',Math.min(3,game.countPlayer()-player.countMark('recangchu')));
				},
				intro:{content:'mark',name:'粮'},
				mod:{
					maxHandcard:function(player,num){
						return num+player.countMark('recangchu');
					},
				},
				group:['recangchu2','recangchu3'],
			},
			recangchu2:{
				audio:'recangchu',
				trigger:{
					player:'gainAfter',
				},
				forced:true,
				usable:1,
				filter:function(event,player){
					return player!=_status.currentPhase&&player.countMark('recangchu')<game.countPlayer();
				},
				content:function(){
					player.addMark('recangchu',1);
				},
			},
			recangchu3:{
				audio:'recangchu',
				trigger:{global:'die'},
				forced:true,
				filter:function(event,player){
					return player.countMark('recangchu')>game.countPlayer();
				},
				content:function(){
					player.removeMark('recangchu',player.countMark('recangchu')-game.countPlayer());
				},
			},
			reliangying:{
				audio:2,
				trigger:{player:'phaseDiscardBegin'},
				direct:true,
				content:function(){
					'step 0'
					var map={};
					var list=[];
					for(var i=1;i<=player.countMark('recangchu');i++){
						var cn=get.cnNumber(i,true);
						map[cn]=i;
						list.push(cn);
					}
					list.push('cancel2');
					event.map=map;
					player.chooseControl(list).set('prompt',get.prompt('reliangying')).set('prompt2','摸至多'+get.cnNumber(player.countMark('recangchu'))+'张牌，然后交给等量的角色各一张牌').set('ai',function(){
						var player=_status.event.player;
						var num=Math.min(player.countMark('recangchu'),game.countPlayer(function(current){
							return get.attitude(player,current)>0;
						}));
						if(num>0) return get.cnNumber(num,true);
						return 'cancel2';
					});
					'step 1'
					if(result.control=='cancel2'){event.finish();return;}
					player.logSkill('reliangying');
					var num=event.map[result.control]||1;
					event.num=num;
					player.draw(num);
					'step 2'
					var num=Math.min(event.num,player.countCards('he'),game.countPlayer(function(target){
						return target!=player;
					}));
					if(num){
						player.chooseCardTarget({
							prompt:'将'+get.cnNumber(num)+'张牌交给其他角色',
							prompt2:'操作提示：先按顺序选中所有要给出的牌，然后再按顺序选择等量的目标角色。可少选一张牌，并将此牌留给自己',
							selectCard:[num-1,num],
							selectTarget:function(){
								return ui.selected.cards.length;
							},
							filterTarget:function(card,player,target){
								return target!=player;
							},
							complexSelect:true,
							position:'he',
							ai1:function(card){
								if(game.countPlayer(function(current){
									return target!=_status.event.player&&get.attitude(_status.event.player,target)>0;
								})<=ui.selected.cards.length) return 0;
								if(card.name=='shan') return 1;
								return Math.random();
							},
							ai2:function(target){
								if(!target) return 1;
								return Math.sqrt(5-Math.max(4,target.countCards('h')))*get.attitude(_status.event.player,target);
							},
							forced:true,
						});
					}
					else event.finish();
					'step 3'
					if(result.bool){
						while(result.cards.length){
							var target=result.targets.shift();
							var card=result.cards.shift();
							target.gain(card,player);
							player.$giveAuto(card,target);
						}
						event.next.sort(function(a,b){
							return lib.sort.seat(a.player,b.player);
						});
					}
					else event.finish();
					'step 4'
					game.delay();
				},
			},
			reshishou:{
				audio:2,
				trigger:{player:['useCard','damageEnd']},
				forced:true,
				filter:function(event,player){
					if(!player.countMark('recangchu')) return false;
					return (event.name=='damage')?(event.nature=='fire'):(event.card&&event.card.name=='jiu');
				},
				content:function(){
					player.removeMark('recangchu',Math.min(player.countMark('recangchu'),trigger.num||1));
				},
				group:'reshishou2',
			},
			reshishou2:{
				audio:'reshishou',
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return !player.countMark('recangchu');
				},
				content:function(){
					player.loseHp();
				},
			},
			nskuishe:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.choosePlayerCard(target,'he',true).set('ai',get.buttonValue);
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						event.card=card;
						player.chooseTarget('将'+get.translation(target)+'的'+(get.position(card)=='h'&&!player.hasSkillTag('viewHandcard',null,target,true)?'手牌':get.translation(card))+'交给一名角色',true,function(target){
							return target!=_status.event.getParent().target;
						}).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du){
								if(target.hasSkillTag('nodu')) return 0;
								return -att;
							}
							if(target.hasSkillTag('nogain')) return 0.1;
							if(att>0){
								return att+Math.max(0,5-target.countCards('h'));
							}
							return att;
						}).set('du',event.card.name=='du');
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var target2=result.targets[0];
						target.line(target2,'green');
						target2.gain(target,card,'giveAuto','bySelf');
					}
					else event.finish();
					'step 3'
					target.chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'是否对'+get.translation(player)+'使用一张杀？').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.filterTarget.apply(this,arguments);
					}).set('sourcex',player);
				},
				ai:{
					order:6,
					expose:0.2,
					result:{
						target:-1.5,
						player:function(player,target){
							if(!target.canUse('sha',player)) return 0;
							if(target.countCards('h')==1) return 0.1;
							if(player.hasShan()) return -0.5;
							if(player.hp<=1) return -2;
							if(player.hp<=2) return -1;
							return 0;
						}
					},
				},
			},
			pianchong:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					'step 0'
					trigger.changeToZero();
					var cards=[];
					var card1=get.cardPile2(function(card){
						return get.color(card,false)=='red';
					});
					if(card1) cards.push(card1);
					var card2=get.cardPile2(function(card){
						return get.color(card,false)=='black';
					});
					if(card2) cards.push(card2);
					if(cards.length) player.gain(cards,'gain2');
					'step 1'
					game.updateRoundNumber();
					player.chooseControl('red','black').set('prompt','偏宠：请选择一种颜色。直至你的下回合开始时，失去该颜色的一张牌后，从牌堆获得另一种颜色的一张牌。').set('ai',function(){
						var red=0,black=0;
						var player=_status.event.player;
						var cards=player.getCards('he');
						for(var i of cards){
							var add=1;
							var color=get.color(i,player);
							if(get.position(i)=='e') add=0.5;
							else if(get.name(i,player)!='sha'&&player.hasValueTarget(i)) add=1.5;
							if(color=='red') red+=add;
							else black+=add;
						}
						if(black>red) return 'black';
						return 'red';
					});
					'step 2'
					player.storage.pianchong2=result.control;
					player.addTempSkill('pianchong2',{player:'phaseBeginStart'});
					player.popup(result.control,result.control=='red'?'fire':'thunder');
					game.log(player,'声明了','#y'+get.translation(result.control));
				},
				ai:{
					threaten:4.8,
				},
			},
			pianchong2:{
				audio:'pianchong',
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				forced:true,
				charlotte:true,
				onremove:true,
				filter:function(event,player){
					var evt=event.getl(player);
					if(!evt||!evt.cards2||!evt.cards2.length) return false;
					for(var i of evt.cards2){
						if(get.color(i,player)==player.storage.pianchong2) return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					var num=trigger.getl(player).cards2.filter(function(card){
						return get.color(card,player)==player.storage.pianchong2;
					}).length;
					var cards=[];
					while(num--){
						var card=get.cardPile2(function(card){
							return !cards.contains(card)&&get.color(card,false)!=player.storage.pianchong2;
						});
						if(card) cards.push(card);
						else break;
					}
					if(cards.length) player.gain(cards,'gain2');
					else event.finish();
					'step 1'
					game.updateRoundNumber();
				},
				mark:true,
				intro:{
					content:'失去一张$牌后，从牌堆中获得一张与此牌颜色不同的牌',
				},
			},
			zunwei:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.storage.zunwei||player.storage.zunwei.length<3;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[
							'选择体力值大于你的一名角色',
							'选择手牌数大于你的一名角色',
							'选择装备数大于你的一名角色',
						];
						var choiceList=ui.create.dialog('尊位：清选择一项','forcebutton','hidden');
						for(var i=0;i<list.length;i++){
							if(player.storage.zunwei&&player.storage.zunwei.contains(i)) continue;
							var bool=game.hasPlayer(function(current){
								return current!=player&&lib.skill.zunwei.backups[i].filterTarget(null,player,current);
							});
							var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
							if(!bool) str+='<div style="opacity:0.5">';
							str+=list[i];
							if(!bool) str+='</div>';
							str+='</div>';
							var next=choiceList.add(str);
							next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							next.firstChild.link=i;
							next.firstChild._filterButton=bool;
							for(var j in lib.element.button){
								next[j]=lib.element.button[j];
							}
							choiceList.buttons.add(next.firstChild);
						}
						return choiceList;
					},
					filter:function(button){
						return button._filterButton;
					},
					backup:function(links){
						var next=get.copy(lib.skill.zunwei.backups[links[0]]);
						next.audio='zunwei';
						next.filterCard=function(){return false};
						next.selectCard=-1;
						return next;
					},
					check:function(button){
					 var player=_status.event.player;
					 switch(button.link){
					 	case 0:{
					 		var target=game.findPlayer(function(current){
					 			return current.isMaxHp();
					 		});
					 		return (Math.min(target.hp,player.maxHp)-player.hp)*2;
					 	}
					 	case 1:{
					 		var target=game.findPlayer(function(current){
					 			return current.isMaxHandcard();
					 		});
					 		return Math.min(5,target.countCards('h')-player.countCards('h'))*0.8;
					 	}
					 	case 2:{
					 		var target=game.findPlayer(function(current){
					 			return current.isMaxEquip();
					 		});
					 		return (target.countCards('e')-player.countCards('e'))*1.4;
					 	}
					 }
					},
					prompt:function(links){
						return [
							'选择一名体力值大于你的其他角色，将体力值回复至与其相同',
							'选择一名手牌数大于你的其他角色，将手牌数摸至与其相同',
							'选择一名装备区内牌数大于你的其他角色，依次使用牌堆中的装备牌，直到装备数与其相同',
						][links[0]];
					},
				},
				backups:[
				{
					filterTarget:function(card,player,target){
						if(player.isHealthy()) return false;
						return target.hp>player.hp;
					},
					content:function(){
						player.recover(target.hp-player.hp);
						if(!player.storage.zunwei) player.storage.zunwei=[];
						player.storage.zunwei.add(0);
					},
					ai:{
						order:10,
						result:{
							player:function(player,target){
								return (Math.min(target.hp,player.maxHp)-player.hp);
							},
						},
					},
				},
				{
					filterTarget:function(card,player,target){
						return target.countCards('h')>player.countCards('h');
					},
					content:function(){
						player.draw(Math.min(5,target.countCards('h')-player.countCards('h')));
						if(!player.storage.zunwei) player.storage.zunwei=[];
						player.storage.zunwei.add(1);
					},
					ai:{
						order:10,
						result:{
							player:function(player,target){
								return Math.min(5,target.countCards('h')-player.countCards('h'));
							},
						},
					},
				},
				{
					filterTarget:function(card,player,target){
						return target.countCards('e')>player.countCards('e');
					},
					content:function(){
						'step 0'
						if(!player.storage.zunwei) player.storage.zunwei=[];
						player.storage.zunwei.add(2);
						event.num=1;
						'step 1'
						var type='equip'+num;
						if(!player.isEmpty(type)) return;
						var card=get.cardPile2(function(card){
							return get.subtype(card,false)==type&&player.canUse(card,player);
						});
						if(card) player.chooseUseTarget(card,true).nopopup=true;
						'step 2'
						game.updateRoundNumber();
						event.num++;
						if(event.num<=5&&target.isAlive()&&player.countCards('e')<target.countCards('e')) event.goto(1);
					},
					ai:{
						order:10,
						result:{
							player:function(player,target){
								return (target.countCards('e')-player.countCards('e'));
							},
						},
					},
				},
				],
				ai:{
					order:10,
					result:{
						player:1,
					},
				},
			},
			hfjieying:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('hfjieying'),lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
						return get.attitude(player,target)*(1+target.countCards('h',function(card){
							return !get.tag(card,'damage')&&target.hasValueTarget(card);
						}))/(1+target.countCards('h'));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('hfjieying',target);
						target.addTempSkill('hfjieying2',{player:'phaseJieshuBegin'});
					}
				},
				ai:{
					expose:0.05,
				},
			},
			hfjieying2:{
				mod:{
					cardEnabled:function(card,player){
						if(player.storage.hfjieying2) return false;
					},
					cardSavable:function(card,player){
						if(player.storage.hfjieying2) return false;
					},
					targetInRange:function(card,player){
						if(player==_status.currentPhase&&(card.name=='sha'||get.type(card)=='trick')) return true;
					},
					aiOrder:function(player,card,num){
						var info=get.info(card);
						if(!get.tag(card,'damage')&&(!info||!info.toself)) return num+8;
					},
				},
				onremove:true,
				trigger:{player:'useCard2'},
				direct:true,
				filter:function(event,player){
					if(player!=_status.currentPhase) return false;
					var card=event.card;
					if(card.name!='sha'&&get.type(card)!='trick')return false;
					var info=get.info(card);
					if(info.allowMultiple==false) return false;
					if(event.targets&&!info.multitarget){
						if(game.hasPlayer(function(current){
							return !event.targets.contains(current)&&lib.filter.targetEnabled2(card,player,current);
						})){
							return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					var prompt2='为'+get.translation(trigger.card)+'增加一个目标'
					player.chooseTarget(get.prompt('hfjieying2'),function(card,player,target){
						var player=_status.event.player;
						return !_status.event.targets.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target);
					}).set('prompt2',prompt2).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return get.effect(target,trigger.card,player,player);
					}).set('card',trigger.card).set('targets',trigger.targets);
					'step 1'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.targets){
						player.logSkill('hfjieying2',event.targets);
						trigger.targets.addArray(event.targets);
					}
				},
				group:'hfjieying3',
				mark:true,
				intro:{
					content:function(player){
						if(player) return '不能使用牌直到回合结束';
						return '使用【杀】或普通锦囊牌时无距离限制且可以多指定一个目标';
					},
				},
			},
			hfjieying3:{
				trigger:{source:'damageSource'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return !player.storage.hfjieying2&&player==_status.currentPhase;
				},
				content:function(){
					player.storage.hfjieying2=true;
				},
			},
			weipo:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				forced:true,
				filter:function(event,player){
					return player!=event.player&&!player.hasSkill('weipo3')&&player.countCards('h')<Math.min(5,player.maxHp)&&(event.card.name=='sha'||get.type(event.card)=='trick');
				},
				content:function(){
					'step 0'
					player.addTempSkill('weipo2');
					player.drawTo(Math.min(5,player.maxHp));
					'step 1'
					var evt=trigger.getParent();
					if(!evt.weipo) evt.weipo={};
					evt.weipo[player.playerid]=player.countCards('h');
				},
			},
			weipo2:{
				charlotte:true,
				trigger:{global:'useCardAfter'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.weipo&&event.weipo[player.playerid]!=undefined&&event.weipo[player.playerid]>player.countCards('h');
				},
				content:function(){
					'step 0'
					player.addTempSkill('weipo3',{player:'phaseBegin'});
					if(player.countCards('h')&&trigger.player.isAlive()){
						player.chooseCard('h',true,'将一张手牌交给'+get.translation(trigger.player));
					}
					else event.finish();
					'step 1'
					if(result.bool){
						trigger.player.gain(result.cards,player,'giveAuto');
					}
				},
			},
			weipo3:{charlotte:true},
			refuqi:{
				audio:'fuqi',
				forced:true,
				trigger:{
					player:"useCard",
				},
				filter:function(event,player){
					return event.card&&(get.type(event.card)=='trick'||get.type(event.card)=='basic'&&!['shan','tao','jiu','du'].contains(event.card.name))&&game.hasPlayer(function(current){
						return current!=player&&get.distance(player,current)<=1;
					});
				},
				content:function(){
					trigger.directHit.addArray(game.filterPlayer(function(current){
						return current!=player&&get.distance(player,current)<=1;
					}));
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return get.distance(player,arg.target)<=1;
					},
				},
			},
			zhuide:{
				audio:2,
				trigger:{player:'die'},
				forceDie:true,
				skillAnimation:true,
				animationColor:'thunder',
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('zhuide'),lib.filter.notMe).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zhuide',target);
						var names=[];
						var cards=[];
						while(cards.length<4){
							var card=get.cardPile2(function(card){
								return !cards.contains(card)&&!names.contains(card.name)&&get.type(card)=='basic';
							});
							if(card){
								cards.push(card);
								names.push(card.name);
							}
							else break;
						}
						if(cards.length) target.gain(cards,'gain2');
					}
				},
			},
			juntun:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.maxHp>1;
				},
				content:function(){
					player.loseMaxHp();
					player.draw(player.maxHp);
				},
			},
			jiaojie:{
				audio:2,
				mod:{
					ignoredHandcard:function(card,player){
						if(get.color(card)=='red'){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&get.color(card)=='red'){
							return false;
						}
					},
					targetInRange:function(card){
						if(get.color(card)=='black') return true;
					},
					cardUsable:function(card){
						if(get.color(card)=='black') return Infinity;
					},
				},
			},
			decadewuniang:{
				trigger:{
					player:["useCard","respond"],
				},
				audio:'xinfu_wuniang',
				direct:true,
				filter:function (event,player){
					return event.card.name=='sha';
				},
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt2('decadewuniang'),function(card,player,target){
						if(player==target) return false;
						return target.countGainableCards(player,'he')>0;
					}).set('ai',function(target){
						return 10-get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('decadewuniang',target);
						player.line(target,'fire');
						player.gainPlayerCard(target,'he',true);
						target.draw();
						if(!player.storage.decadexushen) event.finish();
					}
					else event.finish();
					'step 2'
					var list=game.filterPlayer(function(current){
						return current.name=='guansuo'||current.name2=='guansuo';
					});
					if(list.length) game.asyncDraw(list);
					else event.finish();
					'step 3'
					game.delayx();
				},
			},
			rezhongjian:{
				enable:'phaseUse',
				audio:'zhongjian',
				usable:2,
				filter:function(event,player){
					if(player.getStat().skill.rezhongjian&&!player.hasSkill('recaishi2')) return false;
					return game.hasPlayer(function(current){
						return lib.skill.rezhongjian.filterTarget(null,player,current);
					});
				},
				filterTarget:function(card,player,target){
					if(!player.storage.rezhongjian2) return true;
					return !player.storage.rezhongjian2[0].contains(target)&&!player.storage.rezhongjian2[1].contains(target);
				},
				content:function(){
					'step 0'
					player.chooseControl().set('prompt','忠鉴：为'+get.translation(target)+'选择获得一项效果').set('choiceList',[
						'令其于下回合开始前首次造成伤害后弃置两张牌',
						'令其于下回合开始前首次受到伤害后摸两张牌',
					]).set('ai',function(){
						return get.attitude(_status.event.player,_status.event.getParent().target)>0?1:0;
					});
					'step 1'
					player.addTempSkill('rezhongjian2',{player:'phaseBeginStart'});
					//var str=['造成伤害弃牌','受到伤害摸牌'][result.index];
					//player.popup(str,['fire','wood'][result.index]);
					//game.log(player,'选择了','#y'+str)
					player.storage.rezhongjian2[result.index].push(target);
					player.markSkill('rezhongjian2');
				},
				ai:{
					order:10,
					expose:0,
					result:{
						player:function(player,target){
							if(get.attitude(player,target)==0) return false;
							var sgn=get.sgn((get.realAttitude||get.attitude)(player,target));
							if(game.countPlayer(function(current){
								return get.sgn((get.realAttitude||get.attitude)(player,current))==sgn;
							})<=game.countPlayer(function(current){
								return get.sgn((get.realAttitude||get.attitude)(player,current))!=sgn;
							})) return 1;
							return 0.9;
						},
					},
				},
			},
			rezhongjian2:{
				trigger:{
					global:['damageSource','damageEnd'],
				},
				forced:true,
				filter:function(event,player,name){
					var num=(name=='damageSource'?0:1);
					var logTarget=(name=='damageSource'?event.source:event.player);
					return logTarget&&logTarget.isAlive()&&player.storage.rezhongjian2[num].contains(logTarget);
				},
				logTarget:function(event,player,name){
					return (name=='damageSource'?event.source:event.player);
				},
				content:function(){
					var num=(event.triggername=='damageSource'?0:1);
					var target=(event.triggername=='damageSource'?trigger.source:trigger.player);
					var storage=player.storage.rezhongjian2;
					storage[num].remove(target);
					if(storage[0].length+storage[1].length) player.markSkill('rezhongjian2');
					else player.removeSkill('rezhongjian2');
					target[event.triggername=='damageSource'?'chooseToDiscard':'draw'](2,true,'he');
					player.draw();
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[[],[]];
				},
				onremove:true,
				intro:{
					markcount:function(storage){
						return storage[0].length+storage[1].length;
					},
					mark:function(dialog,storage,player){
						if(player==game.me||player.isUnderControl()){
							if(storage[0].length){
								dialog.addText('弃牌');
								dialog.add([storage[0],'player']);
							}
							if(storage[1].length){
								dialog.addText('摸牌');
								dialog.add([storage[1],'player']);
							}
						}
						else{
							var list=storage[0].concat(storage[1]).sortBySeat(player);
							dialog.add([list,'player']);
						}
					},
				},
			},
			recaishi:{
				trigger:{player:'phaseDrawEnd'},
				direct:true,
				audio:'caishi',
				isSame:function(event){
					var cards=[];
					event.player.getHistory('gain',function(evt){
						if(evt.getParent().name=='draw'&&evt.getParent('phaseDraw')==event) cards.addArray(evt.cards);
					});
					if(!cards.length) return 'nogain';
					var list=[];
					for(var i=0;i<cards.length;i++){
						list.add(get.suit(cards[i]));
					}
					if(list.length==1) return true;
					if(list.length==cards.length) return false;
					return 'nogain';
				},
				filter:function(event,player){
					var isSame=lib.skill.recaishi.isSame(event);
					if(isSame=='nogain') return false;
					return isSame||player.isDamaged();
				},
				content:function(){
					'step 0'
					if(lib.skill.recaishi.isSame(trigger)){
						player.logSkill('recaishi');
						player.addTempSkill('recaishi2');
						event.finish();
						return;
					}
					player.chooseBool(get.prompt('recaishi'),'回复1点体力，然后本回合内不能对自己使用牌').set('ai',function(){
						if(player.countCards('h','tao')) return false;
						if(player.hp<2) return true;
						return player.countCards('h',function(card){
							var info=get.info(card);
							return info&&(info.toself||info.selectTarget==-1)&&player.canUse(card,player)&&player.getUseValue(card)>0;
						})==0;
					});
					'step 1'
					if(result.bool){
						player.logSkill('recaishi');
						player.recover();
						player.addTempSkill('recaishi3');
					}
				},
			},
			recaishi2:{},
			recaishi3:{
				mod:{
					targetEnabled:function(card,player,target){
						if(player==target) return false;
					},
				},
				mark:true,
				intro:{content:'本回合内不能对自己使用牌'},
			},
			minishangshi:{
				audio:'shangshi',
				trigger:{player:['loseAfter','changeHp']},
				frequent:true,
				filter:function(event,player){
					return player.countCards('h')<Math.max(1,player.getDamagedHp());
				},
				content:function(){
					player.drawTo(Math.max(player.getDamagedHp(),1));
				},
				ai:{
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=='noh'&&Math.max(1,player.getDamagedHp())<player.countCards('h')){
							return false;
						}
					}
				}
			},
			minilijian:{
				trigger:{player:'useCard2'},
				direct:true,
				audio:'lijian',
				usable:1,
				filter:function(event,player){
					if(!['sha','juedou'].contains(event.card.name)) return false;
					var info=get.info(event.card);
					if(info.allowMultiple==false) return false;
					if(event.targets&&!info.multitarget){
						if(game.hasPlayer(function(current){
							return current.sex=='male'&&!event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current)&&lib.filter.targetInRange(event.card,player,current);
						})){
							return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					var prompt2='为'+get.translation(trigger.card)+'增加一个目标'
					player.chooseTarget(get.prompt('minilijian'),function(card,player,target){
						var player=_status.event.player;
						return target.sex=='male'&&!_status.event.targets.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
					}).set('prompt2',prompt2).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return get.effect(target,trigger.card,player,player);
					}).set('card',trigger.card).set('targets',trigger.targets);
					'step 1'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.targets){
						player.logSkill('minilijian',event.targets);
						trigger.targets.addArray(event.targets);
					}
				},
				
				ai:{
					effect:{
						player:function(card,player,target,current,isLink){
							if(!isLink&&(card.name=='sha'||card.name=='juedou')&&(!player.storage.counttrigger||!player.storage.counttrigger.minilijian)){
								if(player._minilijiantemp) return;
								player._minilijiantemp=true;
								if(get.effect(target,card,player,player)<=0){
									delete player._minilijiantemp;
									return;
								}
								if(game.hasPlayer(function(current){
									return current!=target&&current.sex=='male'&&
									player.canUse(card,current)&&get.effect(current,card,player,player)>0;
								})){
									delete player._minilijiantemp;
									return [1,1];
								}
								delete player._minilijiantemp;
							}
						}
					}
				},
			},
			minitiaoxin:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				audio:'tiaoxin',
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countDiscardableCards(player,'h')>0;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('minitiaoxin'),function(card,player,target){
						return target!=player&&target.countDiscardableCards(player,'h')>0;
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.countCards('h')==1) att=get.sgn(att);
						return -att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('minitiaoxin',target);
						player.discardPlayerCard(target,true,[1,2],'h');
					}
					else event.finish();
					'step 2'
					if(result.cards&&result.cards.length&&player.countCards('h')>0){
						for(var i of result.cards){
							if(get.name(i,target)=='sha'){
								player.chooseToDiscard('h',true);
								break;
							}
						}
					}
				},
			},
			minishendao:{
				audio:'rehuashen',
				trigger:{
					player:"judge",
				},
				direct:true,
				content:function(){
					"step 0"
					var str='你的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，是否修改判定结果？';
					player.chooseControl('spade','heart','diamond','club','cancel2').set('prompt',str).set('ai',function(){
						//return '取消';
						var judging=_status.event.judging;
						var trigger=_status.event.getTrigger();
						var res1=trigger.judge(judging);
						var list=lib.suit.slice(0);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0) return 0;
						var getj=function(suit){
							return trigger.judge({
								name:get.name(judging),
								nature:get.nature(judging),
								suit:suit,
								number:get.number(judging),
							})
						};
						list.sort(function(a,b){
							return (getj(b)-getj(a))*get.sgn(attitude);
						});
						if((getj(list[0])-res1)*attitude>0) return list[0];
						return 'cancel2';
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.control!='cancel2'){
						player.logSkill('minishendao');
						//player.line(trigger.player);
						player.popup(result.control+2);
						game.log(player,'将判定结果改为了','#y'+get.translation(result.control+2));
						trigger.fixedResult={
							suit:result.control,
							color:get.color({suit:result.control}),
						};
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:0.3,
					},
				},
			},
			minixinsheng:{
				audio:'rexinsheng',
				trigger:{player:'damageEnd'},
				frequent:true,
				content:function(){
					"step 0"
					event.cards=get.cards(3);
					game.cardsGotoOrdering(event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str;
						if(player==game.me&&!_status.auto){
							str='新生：获取花色各不相同的牌';
						}
						else{
							str='新生';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,['新生',get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					"step 1"
					var next=player.chooseButton([0,3],true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link)) return false;
						}
						return true;
					});
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					"step 2"
					if(result.bool&&result.links){
						event.cards2=result.links;
					}
					else{
						event.finish();
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					"step 3"
					game.broadcastAll('closeDialog',event.videoId);
					var cards2=event.cards2;
					player.gain(cards2,'log','gain2');
				},
			},
			minizhiheng:{
				audio:'zhiheng',
				trigger:{player:'phaseUseEnd'},
				direct:true,
				filter:function(event){
					return event.player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('h',get.prompt('minizhiheng'),'弃置任意张手牌，若如此做，将手牌摸至四张',[1,player.countCards('h')]).set('ai',function(card){
						var num=4-player.countCards('h');
						var val=6.1+Math.max(0,num);
						var cs=player.countCards('h',function(card){
							return get.value(card)>=val;
						});
						if(cs>=4) return 0;
						return val-get.value(card)
					}).logSkill='minizhiheng';
					'step 1'
					if(result.bool) player.drawTo(4);
				},
			},
			nsyangwu:{
				enable:'phaseUse',
				usable:1,
				filterCard:{suit:'heart'},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>player.countCards('h');
				},
				filter:function(event,player){
					var info=lib.skill.nsyangwu;
					return player.countCards('h',info.filterCard)&&game.hasPlayer(function(target){
						return info.filterTarget(null,player,target);
					});
				},
				check:function(card){
					var num=0;
					var player=_status.event.player;
					game.countPlayer(function(current){
						if(current!=player&&get.attitude(player,current)<0) num=Math.max(num,current.countCards('h')-player.countCards('h'));
					});
					return Math.ceil((num+1)/2)*2+4-get.value(card);
				},
				content:function(){
					var num=Math.ceil((target.countCards('h')-player.countCards('h'))/2);
					if(num) player.gainPlayerCard(target,true,'h',num,'visible');
				},
				ai:{
					order:4,
					result:{
						target:function(player,target){
							return player.countCards('h')-target.countCards('h');
						},
					},
				},
			},
			nslulve:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.countCards('e')>0&&current.countCards('e')<=player.countCards('he');
					});
				},
				filterCard:function(){
					if(ui.selected.targets.length) return false;
					return true;
				},
				position:'he',
				selectCard:[1,Infinity],
				complexSelect:true,
				complexCard:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('e')>0&&ui.selected.cards.length==target.countCards('e');
				},
				check:function(card){
					var player=_status.event.player;
					if(game.hasPlayer(function(current){
						return current!=player&&current.countCards('e')>0&&ui.selected.cards.length==current.countCards('e')&&get.damageEffect(current,player,player)>0;
					})) return 0;
					switch(ui.selected.cards.length){
						case 0:return 8-get.value(card);
						case 1:return 6-get.value(card);
						case 2:return 3-get.value(card);
						default:return 0;
					}
				},
				content:function(){
					target.damage('nocard');
				},
				ai:{
					damage:true,
					order:2,
					result:{
						target:function(player,target){
							return get.damageEffect(target,player);
						}
					},
					expose:0.3
				}
			},
			nsfeixiong:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0&&game.hasPlayer(function(current){
						return current!=player&&player.canCompare(current);
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('nsfeixiong'),function(card,player,target){
						return player!=target&&player.canCompare(target);
					}).set('ai',function(target){
						var player=_status.event.player;
						var hs=player.getCards('h').sort(function(a,b){
							return b.number-a.number;
						});
						var ts=target.getCards('h').sort(function(a,b){
							return b.number-a.number;
						});
						if(!hs.length||!ts.length) return 0;
						if(hs[0].number>ts[0].number) return get.damageEffect(target,player,player);
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('nsfeixiong',target);
						player.chooseToCompare(target);
					}
					else event.finish();
					'step 2'
					if(!result.tie){
						var targets=[player,target];
						if(result.bool) targets.reverse();
						targets[0].damage(targets[1]);
					}
				},
			},
			nscesuan:{
				trigger:{player:'damageBegin3'},
				forced:true,
				content:function(){
					'step 0'
					trigger.cancel();
					event.lose=player.loseMaxHp();
					'step 1'
					if(event.lose&&event.lose.loseHp) player.draw();
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
				},
			},
			nsyice:{
				trigger:{
					player:'loseAfter',
					global:'cardsDiscardAfter',
				},
				filter:function(event,player){
					if(event.name=='lose'){
						if(event.type!='discard') return false;
					}
					else{
						var evt=event.getParent();
						if(evt.name!='orderingDiscard'||!evt.relatedEvent||evt.relatedEvent.player!=player||!['useCard','respond'].contains(evt.relatedEvent.name)) return false;
					}
					return (event.cards2||event.cards).filterInD('d').length>0;
				},
				forced:true,
				content:function(){
					'step 0'
					var evt=trigger.getParent().relatedEvent;
					if((trigger.name=='discard'&&!trigger.delay)||evt&&evt.name=='respond') game.delayx();
					'step 1'
					var cards=(trigger.cards2||trigger.cards).filterInD('d');
					player.$gain2(cards);
					if(cards.length==1) event._result={bool:true,links:cards};
					else{
						var dialog=['遗策：选择要放置的卡牌','<div class="text center">（从左到右为从旧到新，后选择的后置入）</div>',cards];
						var cards2=player.getStorage('nsyice');
						if(cards2.length){
							dialog.push('<div class="text center">原有“策”</div>');
							dialog.push(cards2);
						}
						player.chooseButton(dialog,true,cards.length).set('filterButton',function(button){
							return _status.event.cards.contains(button.link);
						}).set('cards',cards);
					}
					'step 2'
					game.cardsGotoSpecial(result.links);
					player.markAuto('nsyice',result.links);
					game.delayx();
					'step 3'
					var storage=player.storage.nsyice;
					var bool=false;
					for(var i=0;i<storage.length;i++){
						for(var j=storage.length-1;j>i;j--){
							if(get.number(storage[i])==get.number(storage[j])){
								bool=true;
								break;
							}
						}
						if(bool) break;
					}
					if(bool){
						event.cards=storage.slice(0);
						event.cards=storage.splice(i,j-i+1);
						player.unmarkAuto('nsyice',event.cards);
					}
					else event.finish();
					'step 4'
					var cardsx=[];
					cardsx.push(cards.shift());
					cardsx.push(cards.pop());
					if(cards.length) player.gain(cards,'gain2');
					event.cards=cardsx;
					'step 5'
					player.chooseButton(['将一张牌置于牌堆顶，将另一张牌置于牌堆底',cards],true);
					'step 6'
					ui.cardPile.insertBefore(result.links[0].fix(),ui.cardPile.firstChild);
					cards.remove(result.links[0]);
					ui.cardPile.appendChild(cards[0].fix());
					game.updateRoundNumber();
					if(_status.dying.length) event.finish();
					'step 7'
					player.chooseTarget('对一名角色造成1点伤害',true).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 8'
					if(result.bool){
						var target=result.targets[0];
						player.line(target);
						target.damage('nocard');
					}
				},
				marktext:'策',
				intro:{content:'cards'},
			},
			yjxuepin:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(event,player,target){
					return player.inRange(target)&&target.countDiscardableCards(player,'he')>0;
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					if(target.countDiscardableCards(player,'he')>0) player.discardPlayerCard(target,2,'he',true);
					else event.finish();
					'step 2'
					if(result.bool&&result.cards.length==2&&get.type2(result.cards[0],result.cards[0].original=='h'?target:false)==get.type2(result.cards[1],result.cards[1].original=='h'?target:false)) player.recover();
				},
				ai:{
					order:4,
					result:{
						player:function(player,target){
							if(player.hp==1) return -8;
							if(target.countCards('e')>1) return 0;
							if(player.hp>2||target.countCards('h')>1) return -0.5;
							return -2;
						},
						target:function(player,target){
							if(target.countDiscardableCards(player,'he')<2) return 0;
							return -2;
						},
					},
				},
			},
			nsjianglie:{
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.countCards('h')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				logTarget:'target',
				content:function(){
					'step 0'
					trigger.target.showHandcards();
					'step 1'
					var cards=trigger.target.getCards('h');
					var list=[];
					for(var i=0;i<cards.length;i++){
						list.add(get.color(cards[i]));
					}
					if(list.length==1) event._result={control:list[0]};
					else{
						list.sort();
						trigger.target.chooseControl(list).set('prompt','选择弃置一种颜色的所有手牌').set('ai',function(){
							var player=_status.event.player;
							if(get.value(player.getCards('h',{color:'red'}))>=get.value(player.getCards('h',{color:'black'}))) return 'black';
							return 'red';
						});
					}
					'step 2'
					trigger.target.discard(trigger.target.getCards('h',{color:result.control}));
				},
			},
			minsi:{
				audio:2,
				enable:'phaseUse',
				getResult:function(cards){
					var l=cards.length;
					var all=Math.pow(l,2);
					var list=[];
					for(var i=1;i<all;i++){
						var array=[];
						for(var j=0;j<l;j++){
							if(Math.floor((i%Math.pow(2,j+1))/Math.pow(2,j))>0) array.push(cards[j])
						}
						var num=0;
						for(var k of array){
							num+=get.number(k);
						}
						if(num==13) list.push(array);
					}
					if(list.length){
						list.sort(function(a,b){
							if(a.length!=b.length) return b.length-a.length;
							return get.value(a)-get.value(b);
						});
						return list[0];
					}
					return list;
				},
				usable:1,
				filterCard:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					return get.number(card)+num<=13;
				},
				complexCard:true,
				selectCard:function(){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num==13) return ui.selected.cards.length;
					return ui.selected.cards.length+2;
				},
				check:function(card){
					var evt=_status.event;
					if(!evt.minsi_choice) evt.minsi_choice=lib.skill.minsi.getResult(evt.player.getCards('he'));
					if(!evt.minsi_choice.contains(card)) return 0;
					return 1;
				},
				position:'he',
				content:function(){
					player.draw(cards.length*2).gaintag=['minsi2'];
					player.addTempSkill('minsi2');
				},
				ai:{
					order:5,
					result:{player:1},
				},
			},
			minsi2:{
				onremove:function(player){
					player.removeGaintag('minsi2');
				},
				mod:{
					targetInRange:function(card,player,target){
						if(!card.cards) return;
						for(var i of card.cards){
							if(!i.hasGaintag('minsi2')||get.color(i)!='black') return;
						}
						return true;
					},
					ignoredHandcard:function(card,player){
						if(card.hasGaintag('minsi2')&&get.color(card)=='red'){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&card.hasGaintag('minsi2')&&get.color(card)=='red'){
							return false;
						}
					},
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&card.hasGaintag('minsi2')&&get.color(card)=='black') return num-0.1;
					},
				},
			},
			jijing:{
				audio:2,
				trigger:{player:'damageEnd'},
				frequent:true,
				content:function(){
					'step 0'
					player.judge();
					'step 1'
					var num=result.number;
					var next=player.chooseToDiscard('是否弃置任意张点数之和为'+get.cnNumber(num)+'的牌并回复1点体力？',function(card){
						var num=0;
						for(var i=0;i<ui.selected.cards.length;i++){
							num+=get.number(ui.selected.cards[i]);
						}
						return get.number(card)+num<=_status.event.num;
					},'he');
					next.set('num',num);
					next.set('complexCard',true);
					next.set('selectCard',function(){
						var num=0;
						for(var i=0;i<ui.selected.cards.length;i++){
							num+=get.number(ui.selected.cards[i]);
						}
						if(num==_status.event.num) return ui.selected.cards.length;
						return ui.selected.cards.length+2;
					});
					next.set('cardResult',function(){
						var cards=player.getCards('he');
						var l=cards.length;
						var all=Math.pow(l,2);
						var list=[];
						for(var i=1;i<all;i++){
							var array=[];
							for(var j=0;j<l;j++){
								if(Math.floor((i%Math.pow(2,j+1))/Math.pow(2,j))>0) array.push(cards[j])
							}
							var numx=0;
							for(var k of array){
								numx+=get.number(k);
							}
							if(numx==num) list.push(array);
						}
						if(list.length){
							list.sort(function(a,b){
								return get.value(a)-get.value(b);
							});
							return list[0];
						}
						return list;
					}());
					next.set('ai',function(card){
						if(!_status.event.cardResult.contains(card)) return 0;
						return 6-get.value(card);
					});
					'step 2'
					if(result.bool) player.recover();
				},
			},
			cixiao:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					if(!game.hasPlayer(function(current){
						return current.hasSkill('panshi');
					})) return true;
					return player.countCards('he')>=1&&game.hasPlayer(function(current){
						return current!=player&&!current.hasSkill('panshi');
					});
				},
				content:function(){
					'step 0'
					if(game.hasPlayer(function(current){
						return current.hasSkill('panshi');
					})) event.goto(2);
					else player.chooseTarget(lib.filter.notMe,get.prompt('cixiao'),'令一名其他角色获得「义子」标记').set('ai',function(target){
						var player=_status.event.player;
						var att=-get.attitude(player,target);
						return att*target.countCards('h');
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('cixiao',target);
						target.addSkill('panshi');
					}
					event.finish();
					'step 2'
					var list=game.filterPlayer(function(current){
						return current.hasSkill('panshi');
					});
					player.chooseCardTarget({
						prompt:get.prompt('cixiao'),
						prompt2:('弃置一张牌并将'+get.translation(list)+'的「义子」标记转移给其他角色'),
						position:'he',
						filterTarget:function(card,player,target){
							return player!=target&&!target.hasSkill('panshi');
						},
						filterCard:lib.filter.cardDiscardable,
						ai1:function(card){
							if(_status.event.goon) return 5-get.value(card);
							return 0;
						},
						ai2:function(target){
							var player=_status.event.player;
							var att=-get.attitude(player,target);
							return att*target.countCards('h');
						},
						goon:function(target){
							var att=-get.attitude(player,target);
							return att*target.countCards('h')<=0;
						}(list[0]),
					});
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('cixiao');
						player.discard(result.cards).delay=false;
						player.line2(game.filterPlayer(function(current){
							if(current.hasSkill('panshi')){
								current.removeSkill('panshi');
								return true;
							}
						}).concat(result.targets),'green');
						target.addSkill('panshi');
					}
					else event.finish();
					'step 4'
					game.delayx();
				},
				derivation:'panshi',
				ai:{threaten:8},
			},
			panshi:{
				mark:true,
				marktext:'子',
				intro:{content:'我是儿子'},
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.countCards('h')>0&&game.hasPlayer(function(current){
						return current!=player&&current.hasSkill('cixiao');
					});
				},
				content:function(){
					'step 0'
					var targets=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('cixiao');
					});
					if(targets.length==1){
						event.target=targets[0];
						player.chooseCard('h',true,'叛弑：将一张手牌交给'+get.translation(targets));
					}
					else player.chooseCardTarget({
						prompt:'叛弑：将一张手牌交给'+get.translation(targets)+'中的一名角色',
						filterCard:true,
						position:'h',
						targets:targets,
						forced:true,
						filterTarget:function(card,player,target){
							return _status.event.targets.contains(target);
						},
					});
					'step 1'
					if(result.bool){
						if(!target) target=result.targets[0];
						player.line(target);
						target.gain(result.cards,player,'giveAuto');
					}
				},
				group:'panshi_damage',
			},
			panshi_damage:{
				trigger:{source:'damageBegin1'},
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					return player.isPhaseUsing()&&event.card&&event.card.name=='sha'&&event.player.hasSkill('cixiao');
				},
				content:function(){
					trigger.num++;
					var evt=event.getParent('phaseUse');
					if(evt&&evt.player==player) evt.skipped=true;
				},
			},
			xianshuai:{
				audio:2,
				trigger:{global:'damageEnd'},
				forced:true,
				filter:function(event,player){
					return event.source&&event.source.isAlive()&&!player.hasSkill('xianshuai2');
				},
				content:function(){
					player.addTempSkill('xianshuai2','roundStart');
					player.draw();
					if(player==trigger.source&&trigger.player.isAlive()){
						player.line(trigger.player,'green');
						trigger.player.damage();
					}
				},
			},
			xianshuai2:{},
			shiyuan:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				frequent:true,
				filter:function(event,player){
					var num=1;
					if(_status.currentPhase&&_status.currentPhase.group=='qun'&&player.hasZhuSkill('yuwei',_status.currentPhase)) num=2;
					return player!=event.player&&player.getHistory('gain',function(evt){
						return evt.getParent(2).name=='shiyuan'&&evt.cards.length==(2+get.sgn(event.player.hp-player.hp));
					}).length<num;
				},
				content:function(){
					player.draw(2+get.sgn(trigger.player.hp-player.hp));
				},
			},
			dushi:{
				audio:2,
				global:'dushi2',
				locked:true,
				trigger:{player:'die'},
				forceDie:true,
				direct:true,
				skillAnimation:true,
				animationColor:'gray',
				content:function(){
					'step 0'
					player.chooseTarget('请选择【毒逝】的目标','选择一名其他角色，令其获得技能【毒逝】',true,lib.filter.notMe).set('forceDie',true).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dushi',target);
						target.markSkill('dushi');
						target.addSkillLog('dushi');
					}
				},
				intro:{content:'您已经获得弘农王的诅咒'},
			},
			dushi2:{
				mod:{
					cardSavable:function(card,player,target){
						if(card.name=='tao'&&target!=player&&target.hasSkill('dushi')) return false;
					},
				},
			},
			yuwei:{
				zhuSkill:true,
				ai:{combo:'shiyuan'},
			},
			decadexushen:{
				derivation:'decadezhennan',
				audio:'xinfu_xushen',
				trigger:{player:'dying'},
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				filter:function(event,player){
					return player.hp<1;
				},
				content:function(){
					player.awakenSkill('decadexushen');
					player.addSkill('decadezhennan');
					player.recover();
					player.addTempSkill('decadexushen2');
					trigger.decadexushen=true;
				},
			},
			decadexushen2:{
				trigger:{player:'dyingAfter'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.decadexushen==true&&!game.hasPlayer(function(current){
						return current.name=='guansuo'||current.name2=='guansuo';
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(lib.filter.notMe,'许身：是否令一名其他角色选择是否将其武将牌替换为“关索”并令其摸三张牌？').set('ai',function(target){
						return get.attitude(_status.event.player,target)-4;
					});
					'step 1'
					if(!result.bool){
						event.finish();
						return;
					}
					var target=result.targets[0];
					event.target=target;
					player.line(target,'fire');
					target.chooseBool('许身：是否将自己的一张武将牌替换为“关索”并令'+get.translation(player)+'摸三张牌？');
					'step 2'
					if(result.bool){
						if(target.name2!=undefined){
							target.chooseControl(target.name,target.name2).set('prompt','请选择要更换的武将牌');
						}
						else event._result={control:target.name};
					}
					else event.goto(4);
					'step 3'
					target.reinit(result.control,'guansuo');
					if(_status.characterlist){
						_status.characterlist.add(result.control);
						_status.characterlist.remove('guansuo');
					}
					'step 4'
					target.draw(3);
				},
			},
			decadezhennan:{
				audio:'xinfu_zhennan',
				trigger:{
					global:"useCardToPlayered",
				},
				filter:function (event,player){
					return event.isFirstTarget&&event.targets&&event.targets.length>1&&get.type2(event.card)=='trick';
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt('decadezhennan'),'对一名其他角色造成1点伤害',function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					"step 1"
					if(result.bool&&result.targets&&result.targets.length){
						player.logSkill('decadezhennan',result.targets);
						result.targets[0].damage();
					}
				},
				ai:{
					expose:0.25,
				},
			},
			yujue:{
				audio:2,
				derivation:'zhihu',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countDisabled()<5;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('###鬻爵###'+lib.translate.yujue_info);
					},
					chooseControl:function(event,player){
						var list=[];
						for(var i=1;i<6;i++){
							if(!player.isDisabled(i)) list.push('equip'+i);
						}
						list.push('cancel2');
						return list;
					},
					check:function(event,player){
						for(var i=5;i>0;i--){
							if(player.isEmpty(i)) return ('equip'+i);
						}
						return 'cancel2';
					},
					backup:function(result){
						var next=get.copy(lib.skill.yujuex);
						next.position=result.control;
						return next;
					},
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(game.hasPlayer(function(target){
								if(player==target) return false;
								var hs=target.countCards('h');
								return hs>2&&get.attitude(player,target)>0;
							})) return 1;
							return 0;
						},
					},
				},
			},
			yujuex:{
				audio:'yujue',
				content:function(){
					'step 0'
					player.disableEquip(lib.skill.yujue_backup.position);
					'step 1'
					if(player.isAlive()&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('h');
					})){
						player.chooseTarget(true,'选择一名角色交给你一张牌并获得技能〖执笏〗',function(card,player,target){
							if(player==target) return false;
							return target.countCards('h')>0;
						}).set('ai',function(target){
							return get.attitude(_status.event.player,target)*target.countCards('h');
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target);
						target.chooseCard('h',true,'交给'+get.translation(player)+'一张手牌');
					}
					else event.finish();
					'step 3'
					if(result.bool&&result.cards&&result.cards.length){
						player.gain(result.cards,target,'giveAuto');
						target.storage.zhihu_mark=player;
						target.addSkill('zhihu');
						target.addSkill('zhihu_mark');
					}
				},
			},
			zhihu:{
				usable:2,
				trigger:{source:'damageSource'},
				forced:true,
				filter:function(event,player){
					return player!=event.player;
				},
				content:function(){
					player.draw(2);
				},
			},
			zhihu_mark:{
				mark:'character',
				intro:{
					content:'以$之名，授予汝技能〖执笏〗，直至$的下回合开始为止！',
				},
				onremove:function(player){
					delete player.storage.zhihu_mark;
					player.removeSkill('zhihu');
				},
				trigger:{global:'phaseBeginStart'},
				firstDo:true,
				charlotte:true,
				silent:true,
				filter:function(event,player){
					return event.player==player.storage.zhihu_mark;
				},
				content:function(){
					player.removeSkill('zhihu_mark');
				},
			},
			tuxing:{
				audio:2,
				trigger:{player:'disableEquipAfter'},
				forced:true,
				content:function(){
					'step 0'
					player.gainMaxHp();
					player.recover();
					'step 1'
					if(player.countDisabled()>=5){
						player.loseMaxHp(4);
						player.addSkill('tuxing2');
					}
				}
			},
			tuxing2:{
				audio:'tuxing',
				trigger:{source:'damageBegin1'},
				forced:true,
				charlotte:true,
				content:function(){
					trigger.num++;
				},
				mark:true,
				intro:{
					content:'造成伤害时，此伤害+1',
				},
			},
			gongjian:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				usable:1,
				logTarget:'target',
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(event.parent.gongjian_targets&&event.parent.gongjian_targets.filter(function(target){
						return event.targets.contains(target);
					}).length>0) return event.target.countDiscardableCards(player,'he')>0;
					var evt=event.getParent();
					var history=player.getAllHistory('useCard',function(evtx){
						return evtx.card.name=='sha'
					});
					var index=history.indexOf(evt);
					return index>0&&history[index-1].targets.filter(function(target){
						return evt.targets.contains(target);
					}).length>0&&event.target.countDiscardableCards(player,'he')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				content:function(){
					'step 0'
					player.discardPlayerCard(trigger.target,true,'he',2);
					'step 1'
					if(result.bool){
						var cards=result.cards.filter(function(card){
							return get.name(card,card.original=='h'?trigger.target:false)=='sha';
						});
						if(cards.length) player.gain(cards,'gain2','log');
					}
				},
				group:'gongjian_count',
				subSkill:{
					count:{
						trigger:{global:'useCard1'},
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return event.card&&event.card.name=='sha';
						},
						content:function(){
							if(player.storage.gongjian) trigger.gongjian_targets=player.storage.gongjian;
							player.storage.gongjian=trigger.targets;
						},
					},
				},
			},
			kuimang:{
				audio:2,
				trigger:{global:'dieAfter'},
				forced:true,
				filter:function(event,player){
					return player.getAllHistory('sourceDamage',function(target){
						return target.player==event.player;
					}).length>0;
				},
				content:function(){
					player.draw(2);
				},
			},
			cxliushi:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he',{suit:'heart'})>0;
				},
				filterCard:{suit:'heart'},
				position:'he',
				filterTarget:function(card,player,target){
					return player.canUse('sha',target,false);
				},
				check:function(card){
					var player=_status.event.player;
					var next=player.getNext();
					var att=get.attitude(player,next);
					if(att>0){
						var js=next.getCards('j');
						if(js.length) return get.judge(js[0])+10-get.value(card);
						return 9-get.value(card)
					}
					return 6-get.value(card);
				},
				discard:false,
				prepare:'throw',
				loseTo:'cardPile',
				visible:true,
				insert:true,
				content:function(){
					game.log(player,'将',cards,'置于牌堆顶'); 
					player.useCard({name:'sha',isCard:true},false,targets).card.cxliushi=true;
				},
				group:'cxliushi_damage',
				subSkill:{
					damage:{
						trigger:{source:'damageSource'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.card&&event.card.cxliushi==true&&event.player.isAlive()&&event.getParent(3).name=='cxliushi';
						},
						content:function(){
							trigger.player.addMark('cxliushi2',1);
							trigger.player.addSkill('cxliushi2');
						},
					},
				},
				ai:{
					order:function(){
						return get.order({name:'sha'})-0.4;
					},
					result:{
						target:function(player,target){
							var eff=get.effect(target,{name:'sha'},player,target);
							var damageEff=get.damageEffect(target,player,player);
							if(eff>0) return damageEff>0?0:eff;
							if(target.hasSkill('bagua_skill')||target.hasSkill('rw_bagua_skill')||target.hasSkill('bazhen')) return 0;
							return eff;
						},
					},
				},
			},
			cxliushi2:{
				mod:{
					maxHandcard:function(player,num){
						return num-player.countMark('cxliushi2');
					},
				},
				onremove:true,
				charlotte:true,
				intro:{
					name2:'流',
					content:'手牌上限-#',
				},
			},
			zhanwan:{
				audio:2,
				trigger:{global:'phaseDiscardEnd'},
				forced:true,
				filter:function(event,player){
					return event.player.hasSkill('cxliushi2')&&event.player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event) return true;
					}).length>0;
				},
				logTarget:'player',
				content:function(){
					trigger.player.removeSkill('cxliushi2');
					var num=0;
					trigger.player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==trigger) num+=evt.cards2.length;
					});
					player.draw(num);
				},
			},
			rexiemu:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return !game.hasPlayer(function(current){
						return current.hasMark('rexiemu');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('rexiemu'),lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
						return get.attitude(player,target)*Math.sqrt(Math.max(1+player.countCards('h'),1+target.countCards('h')));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('rexiemu',target);
						target.addMark('rexiemu',1);
						player.addSkill('rexiemu2');
					}
				},
				intro:{content:'mark'},
				ai:{
					expose:0.1,
				},
			},
			rexiemu2:{
				audio:'rexiemu',
				trigger:{global:['loseAfter']},
				forced:true,
				charlotte:true,
				usable:1,
				filter:function(event,player){
					return (event.player==player||event.player.hasMark('rexiemu'))&&['useCard','respond'].contains(event.getParent().name)&&event.hs&&event.hs.length&&
					event.player!=_status.currentPhase&&game.hasPlayer(function(current){
						return current.hasMark('rexiemu');
					});
				},
				content:function(){
					'step 0'
					game.asyncDraw(game.filterPlayer(function(current){
						return current==player||current==trigger.player||current.hasMark('rexiemu');
					}));
					'step 1'
					game.delayx();
				},
				group:'rexiemu3',
			},
			rexiemu3:{
				trigger:{player:'phaseBegin'},
				forced:true,
				charlotte:true,
				silent:true,
				firstDo:true,
				content:function(){
					player.removeSkill('rexiemu2');
					game.countPlayer(function(current){
						var num=current.countMark('rexiemu');
						if(num) current.removeMark('rexiemu',num);
					});
				},
			},
			heli:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return lib.skill.heli.filterTarget(null,player,current);
					});
				},
				filterTarget:function(card,player,target){
					return target.countCards('h')<player.countCards('h')
				},
				content:function(){
					'step 0'
					if(target.countCards('h')) target.showHandcards();
					'step 1'
					var list=[];
					var cards=[];
					for(var i of lib.inpile) list.add(get.type2(i));
					for(var i of list){
						if(!target.countCards('h',function(card){
							return get.type2(card,target)==i;
						})){
							var card=get.cardPile2(function(card){
								return get.type2(card,false)==i;
							});
							if(card) cards.push(card);
						}
					}
					if(cards.length) target.gain(cards,'gain2','log');
					else event.finish();
					'step 2'
					game.updateRoundNumber();
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							return 1/Math.sqrt(1+target.countCards('h'))
						},
					},
				},
			},
			moying:{
				audio:2,
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				direct:true,
				filter:function(event,player){
					if(player==_status.currentPhase||event.getParent().name=='useCard') return false;
					if(event.name=='gain'&&event.player==player) return false;
					var evt=event.getl(player);
					return evt&&evt.cards2&&evt.cards2.length==1&&
					['equip','trick'].contains(get.type2(evt.cards2[0],(evt.type=='discard'&&evt.hs.contains(evt.cards2[0]))?player:false))&&
					!player.hasSkill('moying2');
				},
				content:function(){
					"step 0"
					var number=trigger.getl(player).cards2[0].number;
					var numbers=[number-2,number-1,number,number+1,number+2].filter(function(number){
						return number>=1&&number<=13;
					});
					if(player.isUnderControl()){
						game.swapPlayerAuto(player);
					}
					var switchToAuto=function(){
						_status.imchoosing=false;
						event._result={
							bool:true,
							suit:lib.suit.randomGet(),
							number:numbers.randomGet(),
						};
						if(event.dialog) event.dialog.close();
						if(event.control) event.control.close();
					};
					var chooseButton=function(player,numbers){
						var event=_status.event;
						player=player||event.player;
						if(!event._result) event._result={};
						var dialog=ui.create.dialog('是否发动【墨影】？','forcebutton','hidden');
						event.dialog=dialog;
						dialog.addText('花色');
						var table=document.createElement('div');
						table.classList.add('add-setting');
						table.style.margin='0';
						table.style.width='100%';
						table.style.position='relative';
						var listi=['spade','heart','club','diamond'];
						for(var i=0;i<listi.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.link=listi[i];
							table.appendChild(td);
							td.innerHTML='<span>'+get.translation(listi[i])+'</span>';
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								_status.tempNoButton=true;
								setTimeout(function(){
									_status.tempNoButton=false;
								},500);
								var link=this.link;
								var current=this.parentNode.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								this.classList.add('bluebg');
								event._result.suit=link;
							});
						}
						dialog.content.appendChild(table);
						dialog.addText('点数');
						var table2=document.createElement('div');
						table2.classList.add('add-setting');
						table2.style.margin='0';
						table2.style.width='100%';
						table2.style.position='relative';
						for(var i=0;i<numbers.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.link=numbers[i];
							table2.appendChild(td);
							var num=numbers[i];
							switch(num){
								case 1:num='A';break;
								case 11:num='J';break;
								case 12:num='Q';break;
								case 13:num='K';break;
							}
							td.innerHTML='<span>'+num+'</span>';
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								_status.tempNoButton=true;
								setTimeout(function(){
									_status.tempNoButton=false;
								},500);
								var link=this.link;
								var current=this.parentNode.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								this.classList.add('bluebg');
								event._result.number=link;
							});
						}
						dialog.content.appendChild(table2);
						dialog.add('　　');
						event.dialog.open();
						
						event.switchToAuto=function(){
							event._result={
								bool:true,
								number:numbers.randomGet(),
								suit:lib.suit.randomGet(),
							};
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing=false;
						};
						event.control=ui.create.control('ok','cancel2',function(link){
							var result=event._result;
							if(link=='cancel2') result.bool=false;
							else{
								if(!result.number||!result.suit) return;
								result.bool=true;
							}
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing=false;
						});
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('selectable');
						}
						game.pause();
						game.countChoose();
					};
					if(event.isMine()){
						chooseButton(player,numbers);
					}
					else if(event.isOnline()){
						event.player.send(chooseButton,event.player,numbers);
						event.player.wait();
						game.pause();
					}
					else{
						switchToAuto();
					}
					"step 1"
					var map=event.result||result;
					if(map.bool){
						player.logSkill('moying');
						player.addTempSkill('moying2');
						var cards=[];
						for(var i=0;i<ui.cardPile.childNodes.length;i++){
							var card=ui.cardPile.childNodes[i];
							if(get.suit(card)==map.suit&&get.number(card)==map.number) cards.push(card);
						}
						if(cards.length) player.gain(cards,'gain2','log');
					}
					else event.finish();
					"step 2"
					game.updateRoundNumber();
				},
			},
			moying2:{},
			juanhui:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('juanhui'),lib.filter.notMe).set('ai',function(target){
						if(target.isTurnedOver()||target.hasJudge('lebu')) return Math.random();
						return (1+target.countCards('h'))*2+Math.random();
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('juanhui',target);
						player.storage.juanhui2=target;
						player.storage.juanhui3=[];
						player.addSkill('juanhui2');
					}
				},
			},
			juanhui2:{
				charlotte:true,
				mark:true,
				mod:{
					cardUsable:function(card){
						if(card.name=='sha'&&_status.event.skill=='juanhui2_backup') return Infinity;
					},
				},
				intro:{
					markcount:function(storage,player){
						return player.getStorage('juanhui3').length;
					},
					mark:function(dialog,storage,player){
						dialog.addText('记录目标');
						dialog.addSmall([storage]);
						var vcard=player.getStorage('juanhui3');
						if(vcard.length){
							dialog.addText('记录卡牌');
							dialog.addAuto([vcard,'vcard']);
						}
					},
					content:function(storage,player){
						var str='记录目标：'+get.translation(storage);
						var vcard=player.getStorage('juanhui3');
						if(vcard.length){
							str+='<br>记录卡牌：';
							for(var i of vcard){
								if(i[2]=='sha'&&i[3]) str+=get.translation(i[3]);
								str+=get.translation(i[2]);
								str+='、';
							}
							str=str.slice(0,str.length-1);
						}
						return str;
					},
				},
				onremove:function(player){
					delete player.storage.juanhui2;
					delete player.storage.juanhui3;
				},
				group:'juanhui3',
				enable:'phaseUse',
				filter:function(event,player){
					return player.getStorage('juanhui3').length>0&&player.countCards('hs')>0;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('绢绘',[player.getStorage('juanhui3'),'vcard'],'hidden')
					},
					filter:function(button,player){
						return lib.filter.cardEnabled({
							name:button.link[2],
							nature:button.link[3],
						},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						var card={
							name:button.link[2],
							nature:button.link[3],
						};
						if(player.getUseValue(card)>0) return get.order(card);
						return -1;
					},
					backup:function(links,player){
						return {
							audio:'juanhui',
							popname:true,
							filterCard:true,
							position:'hs',
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
							},
							check:function(card){
								return 6-get.value(card);
							},
							precontent:function(){
								var card=event.result.card;
								if(card.name=='sha') event.getParent().addCount=false;
								var vcard=player.storage.juanhui3;
								for(var i=0;i<vcard.length;i++){
									if(vcard[i][2]==card.name) vcard.splice(i--,1);
								}
								if(vcard.length) player.markSkill('juanhui2');
								else{
									player.unmarkSkill('juanhui2');
									event.getParent().juanhui=true;
								}
							},
						}
					},
					prompt:function(links,player){
						return '将一张手牌当做'+(links[0][2]=='sha'&&links[0][3]?get.translation(links[0][3]):'')+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					order:function(item,player){
						var muniu=player.getStorage('juanhui3');
						var order=0;
						for(var i=0;i<muniu.length;i++){
							var card={name:muniu[i][2],nature:muniu[i][3]};
							if(player.getUseValue(card)>0){
								var order2=get.order(card);
								if(order2>order) order=order2
							}
						}
						return order+0.1;
					},
					result:{
						player:1,
					},
				},
			},
			juanhui3:{
				charlotte:true,
				firstDo:true,
				trigger:{
					global:'useCard2',
					player:['phaseUseEnd','phaseUseSkipped','useCardAfter'],
				},
				silent:true,
				filter:function(event,player,name){
					if(event.name=='phaseUse') return true;
					else if(name=='useCardAfter') return event.getParent().juanhui;
					return event.player==player.storage.juanhui2&&event.player.isPhaseUsing()&&
					['basic','trick'].contains(get.type(event.card))&&player.getStorage('juanhui3').filter(function(vcard){
						return vcard[2]==event.card.name;
					}).length==0;
				},
				content:function(){
					if(trigger.name=='phaseUse') player.removeSkill('juanhui2');
					else if(event.triggername=='useCardAfter'){
						player.recover();
						player.drawTo(3);
					}
					else{
						var vcard=[get.type(trigger.card),'',trigger.card.name];
						if(trigger.card.nature) vcard.push(trigger.card.nature);
						player.storage.juanhui3.push(vcard);
						player.markSkill('juanhui2');
					}
				},
			},
			mubing:{
				audio:2,
				audioname:['sp_key_yuri'],
				trigger:{player:'phaseUseBegin'},
				//direct:true,
				frequent:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					var num=player.storage.mubing2?4:3;
					event.num=num;
					event.cards=game.cardsGotoOrdering(get.cards(num)).cards;
					game.log(player,'展示了',event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str=get.translation(player)+'发动了【募兵】';
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					game.addVideo('showCards',player,[get.translation(player)+'发动了【募兵】',get.cardsInfo(event.cards)]);
					game.delay(2);
					'step 1'
					var numa=0;
					cards.sort(function(a,b){
						return a.number-b.number;
					});
					for(var i of cards){
						if(get.value(i,player)>0) numa+=get.number(i);
					}
					player.chooseToDiscard([1,Infinity],'h').set('ai',function(card){
						var player=_status.event.player;
						var numa=_status.event.numa;
						//if(card.name!='tengjia'&&get.position(card)=='e'&&get.equipValue(card,player)<=0) return 14;
						var num=0;
						for(var i of ui.selected.cards){
							num+=i.number;
						}
						if(num>=numa) return 0;
						if(card.number+num>=numa) return 15-get.value(card);
						if(!ui.selected.cards.length){
							var min=_status.event.min;
							if(card.number<min&&!player.countCards('h',function(xcard){
								return xcard!=card&&card.number+xcard.number>min;
							})) return 0;
							return card.number;
						}
						return Math.max(5-get.value(card),card.number);
					}).set('prompt',false).set('numa',numa).set('min',cards[0].number);
					var func=function(id){
						var dialog=get.idDialog(id);
						if(dialog) dialog.content.firstChild.innerHTML='请选择要弃置的牌';
					};
					if(player==game.me) func(event.videoId);
					else if(player.isOnline()) player.send(func,event.videoId);
					'step 2'
					if(!result.bool){
						return;
					}
					var numx=0;
					for(var i of result.cards){
						numx+=get.number(i);
					}
					event.numx=numx;
					var next=player.chooseButton([0,num]);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						var num=0
						for(var i=0;i<ui.selected.buttons.length;i++){
							num+=get.number(ui.selected.buttons[i].link);
						}
						return (num+get.number(button.link)<=_status.event.maxNum);
					});
					next.set('maxNum',event.numx);
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					var func=function(id){
						var dialog=get.idDialog(id);
						if(dialog) dialog.content.firstChild.innerHTML='请选择要获得的牌';
					};
					if(player==game.me) func(event.videoId);
					else if(player.isOnline()) player.send(func,event.videoId);
					'step 3'
					if(!result.bool) event.cards=[];
					else event.cards=result.links;
					'step 4'
					game.broadcastAll('closeDialog',event.videoId);
					if(!cards.length){
						event.finish();
						return;
					}
					player.gain(cards,'log','gain2');
					if(!player.storage.mubing2){
						event.finish();
						return;
					}
					event.given=[];
					'step 5'
					var hs=player.getCards('h');
					cards=cards.filter(function(card){
						return hs.contains(card);
					});
					if(cards.length&&game.hasPlayer(function(current){
						return current!=player&&!event.given.contains(current);
					})) player.chooseCardTarget({
						prompt:'是否将获得的牌中的任意张交给其他角色？',
						selectCard:[1,cards.length],
						filterCard:function(card){
							return _status.event.cards.contains(card);
						},
						filterTarget:function(card,player,target){
							return target!=player&&!_status.event.given.contains(target);
						},
						cards:cards,
						given:event.given,
						ai1:function(card){
							return -1;
						},
					});
					else event.finish();
					'step 6'
					if(result.bool){
						var target=result.targets[0];
						var cards=result.cards;
						event.given.push(target);
						event.cards.removeArray(cards);
						player.line(target,'green');
						target.gain(cards,player,'giveAuto');
						event.goto(5);
					}
				},
			},
			ziqu:{
				audio:2,
				audioname:['sp_key_yuri'],
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					return event.player!=player&&!player.getStorage('ziqu').contains(event.player)&&
					event.player.countCards('he')>0;
				},
				check:function(event,player){
					var target=event.player;
					var eff=get.damageEffect(target,player,player);
					if(get.attitude(player,target)>0){
						if(eff>=0) return false;
						return true;
					}
					if(eff<=0) return true;
					if(target.hp==1) return false;
					if(event.num>1) return false;
					var cards=target.getCards('he');
					for(var i=0;i<cards.length;i++){
						if(get.number(cards[i])>10) return true;
					}
					return false;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					trigger.cancel();
					if(!player.storage.ziqu) player.storage.ziqu=[];
					player.storage.ziqu.push(trigger.player);
					player.markSkill('ziqu');
					trigger.player.chooseCard(true,'he',function(card,player){
						return !player.countCards('he',function(cardx){
							return cardx.number>card.number;
						});
					});
					'step 1'
					if(result.bool&&result.cards&&result.cards.length) player.gain(result.cards,trigger.player,'giveAuto');
				},
				intro:{content:'已对$发动过'},
			},
			mubing_rewrite:{
				mark:true,
				intro:{
					content:'出牌阶段开始时，你可以展示牌堆顶的四张牌。你可弃置任意张手牌，并可获得任意张点数之和不大于你弃置的牌点数之和的牌。然后你可将以此法获得的牌以任意方式交给其他角色。',
				},
			},
			diaoling:{
				audio:2,
				audioname:['sp_key_yuri'],
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'metal',
				filter:function(event,player){
					var num=0;
					player.getAllHistory('gain',function(evt){
						var evt2=evt.getParent();
						if(evt2.name=='mubing'&&evt2.player==player) num+=evt.cards.filter(function(card){
							return card.name=='sha'||get.subtype(card,false)=='equip1'||(get.type2(card,false)=='trick'&&get.tag({name:card.name},'damage'));
						}).length;
					});
					return num>=6;
				},
				content:function(){
					player.awakenSkill('diaoling');
					player.storage.mubing2=true;
					player.markSkill('mubing_rewrite');
					player.chooseDrawRecover(2,true);
				},
				derivation:'mubing_rewrite',
			},
			remeibu:{
				audio:"meibu",
				trigger:{
					global:"phaseUseBegin",
				},
				filter:function (event,player){
					return event.player!=player&&event.player.isAlive()&&event.player.inRange(player)&&player.countCards('he')>0;
				},
				direct:true,
				derivation:["rezhixi"],
				checkx:function (event,player){
					if(get.attitude(player,event.player)>=0) return false;
					var e2=player.getEquip(2);
					if(e2){
						if(e2.name=='tengjia') return true;
						if(e2.name=='bagua') return true;
					}
					return event.player.countCards('h')>event.player.hp;
				},
				content:function (){
					"step 0"
					var check=lib.skill.new_meibu.checkx(trigger,player);
					player.chooseToDiscard(get.prompt2('remeibu',trigger.player),'he').set('ai',function(card){
						if(_status.event.check) return 6-get.value(card);
						return 0;
					}).set('check',check).set('logSkill',['remeibu',trigger.player]);
					"step 1"
					if(result.bool){
						var target=trigger.player;
						var card=result.cards[0];
						player.line(target,'green');
						target.addTempSkill('rezhixi','phaseUseEnd');
					}
				},
				ai:{
					expose:0.2,
				},
			},
			remumu:{
				audio:"mumu",
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt('remumu'),'弃置一名角色装备区内的一张牌，或者获得一名角色装备区内的防具牌',function(card,player,target){
						if(target==player) return target.getEquip(2)!=undefined;
						return target.countCards('e')>0;
					}).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target)
						if(target.getEquip(2)&&player.isEmpty(2)){
							return -2*att;
						}
						return -att;
					});
					'step 1'
					if(result.bool&&result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.logSkill('remumu',event.target);
						player.line(event.target,'green');
						var e=event.target.getEquip(2);
						event.e=e;
						if(target==player) event.choice='获得一张防具牌';
						else if(e){
							player.chooseControl('弃置一张装备牌','获得一张防具牌').set('ai',function(){
								if(_status.event.player.getEquip(2)){
									return '弃置一张装备牌';
								}
								return '获得一张防具牌';
							});
						}
						else{
							event.choice='弃置一张装备牌';
						}
					}else event.finish();
					'step 2'
					var choice=event.choice||result.control;
					if(choice=='弃置一张装备牌'){
						player.discardPlayerCard(event.target,'e',true);
						player.addTempSkill('remumu3');
					}
					else{
						if(event.e){
							player.gain(event.e,event.target,'give');
							player.addTempSkill('remumu2')
						}
					}
				},
			},
			remumu2:{
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num-1;
					},
				},
			},
			remumu3:{
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					},
				},
			},
			rezhixi:{
				trigger:{
					player:"useCard",
				},
				forced:true,
				filter:function(event,player){
					return (event.card.name=='sha'||get.type(event.card)=='trick')&&player.countCards('h')>0;
				},
				content:function(){
					player.chooseToDiscard('h',true);
				},
			},
			//新岩泽(划掉)留赞
			refenyin:{
				audio:2,
				trigger:{global:['loseAfter','cardsDiscardAfter']},
				forced:true,
				filter:function(event,player){
					if(player!=_status.currentPhase) return false;
					if(event.name=='lose'&&event.position!=ui.discardPile) return false;
					var list=[];
					var num=event.cards.length;
					for(var i=0;i<event.cards.length;i++){
						var card=event.cards[i];
						list.add(get.suit(card,(event.cards2&&event.cards2.contains(card))?event.player:false));
					}
					game.getGlobalHistory('cardMove',function(evt){
						if(evt==event||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
						if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
						num+=evt.cards.length;
						for(var i=0;i<evt.cards.length;i++){
							var card=evt.cards[i];
							list.remove(get.suit(card,(evt.cards2&&evt.cards2.contains(card))?evt.player:false));
						}
					},event);
					player.storage.refenyin_mark2=num;
					return list.length>0;
				},
				content:function(){
					var list=[];
					var list2=[];
					for(var i=0;i<trigger.cards.length;i++){
						var card=trigger.cards[i];
						var suit=get.suit(card,(trigger.cards2&&trigger.cards2.contains(card))?trigger.player:false);
						list.add(suit);
						list2.add(suit);
					}
					game.getGlobalHistory('cardMove',function(evt){
						if(evt==trigger||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
						if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
						for(var i=0;i<evt.cards.length;i++){
							var card=evt.cards[i];
							var suit=get.suit(card,(evt.cards2&&evt.cards2.contains(card))?evt.player:false);
							list.remove(suit);
							list2.add(suit);
						}
					},trigger);
					list2.sort();
					player.draw(list.length);
					player.storage.refenyin_mark=list2;
					player.addTempSkill('refenyin_mark');
					player.markSkill('refenyin_mark');
				},
				subSkill:{
					mark:{
						onremove:function(player){
							delete player.storage.refenyin_mark;
							delete player.storage.refenyin_mark2;
						},
						intro:{
							content:function(s,p){
								var str='本回合已经进入过弃牌堆的卡牌的花色：';
								for(var i=0;i<s.length;i++){
									str+=get.translation(s[i]);
								}
								str+='<br>本回合进入过弃牌堆的牌数：'
								str+=p.storage.refenyin_mark2;
								return str;
							},
						},
					},
				},
			},
			liji:{
				enable:'phaseUse',
				audio:2,
				filter:function(event,player){
					return (player.getStat().skill.liji||0)<(event.liji_num||0);
				},
				onChooseToUse:function(event){
					if(game.online) return;
					var num=0;
					var evt2=event.getParent();
					if(!evt2.liji_all) evt2.liji_all=(game.players.length>4?8:4);
					game.getGlobalHistory('cardMove',function(evt){
						if(evt.name=='cardsDiscard'||(evt.name=='lose'&&evt.position==ui.discardPile)) num+=evt.cards.length;
					});
					event.set('liji_num',Math.floor(num/evt2.liji_all));
				},
				filterCard:true,
				position:'he',
				check:function(card){
					var val=get.value(card);
					if(!_status.event.player.getStorage('refenyin_mark').contains(get.suit(card))) return 12-val;
					return 8-val;
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					target.damage('nocard');
				},
				ai:{
					order:1,
					result:{
						target:-1.5
					},
					tag:{
						damage:1
					},
				},
			},
			//文鸯
			xinlvli:{
				audio:'lvli',
				trigger:{player:'damageEnd',source:'damageSource'},
				filter:function(event,player,name){
					var stat=player.getStat().skill;
					if(!stat.xinlvli) stat.xinlvli=0;
					if(name=='damageEnd'&&!player.storage.beishui) return false;
					if(stat.xinlvli>1) return false;
					if(stat.xinlvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					if(player.hp==player.countCards('h')) return false;
					if(player.hp<player.countCards('h')&&player.isHealthy()) return false;
					return true;
				},
				content:function(){
					var stat=player.getStat().skill;
					stat.xinlvli++;
					var num=player.hp-player.countCards('h');
					if(num>0) player.draw(num);
					else player.recover(-num);
				},
				//group:'lvli3',
			},
			lvli:{
				audio:2,
				init:function(player,skill){
					player.storage[skill]=0;
				},
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return event.type!='wuxie'&&event.type!='respondShan';
				},
				chooseButton:{
					dialog:function(event,player){
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
						return ui.create.dialog(event.lvli6?get.prompt('lvli'):'膂力',[list,'vcard']);
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						if(evt&&typeof evt.filterCard=='function') return evt.filterCard({name:button.link[2]},player,evt);
						return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						if(player.countCards('h',button.link[2])) return 0;
						if(_status.event.getParent().type!='phase'&&!_status.event.getParent().lvli6) return 1;
						return player.getUseValue({name:button.link[2]});
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false;},
							audio:'lvli',
							selectCard:-1,
							check:function(card){
								return 1;
							},
							viewAs:{name:links[0][2],nature:links[0][3],isCard:true},
						}
					},
					prompt:function(links,player){
						return '请选择'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'的目标';
					}
				},
				ai:{
					order:4,
					result:{
						player:1,
					},
					threaten:2.9,
					fireAttack:true,
				},
				group:['lvli2','lvli3','lvli4','lvli5','lvli6']
			},
			lvli2:{
				trigger:{player:['useCardBefore','respondBefore']},
				forced:true,
				popup:false,
				priority:35,
				filter:function(event,player){
					return event.skill=='lvli_backup'||event.skill=='lvli5'||event.skill=='lvli4';
				},
				content:function(){
					'step 0'
					player.logSkill('lvli');
					player.storage.lvli++;
					player.popup(trigger.card.name,trigger.name=='useCard'?'metal':'wood');
					'step 1'
					var random=0.5+player.countCards('e')*0.1;
					if(get.isLuckyStar(player)) random=1;
					if(random>=Math.random()){
						player.popup('洗具');
					}
					else{
						player.popup('杯具');
						trigger.cancel();
						if(!trigger.getParent().lvli6){
							trigger.getParent().goto(0);
						}
						game.broadcastAll(function(str){
							var dialog=ui.create.dialog(str);
							dialog.classList.add('center');
							setTimeout(function(){
								dialog.close();
							},1000);
						},get.translation(player)+'声明的'+get.translation(trigger.card.name)+'并没有生效');
						game.log('然而什么都没有发生');
						game.delay(2);
					}
				},
			},
			lvli3:{
				trigger:{global:'phaseBefore'},
				forced:true,
				silent:true,
				popup:false,
				content:function(){
					player.storage.lvli=0;
				},
			},
			lvli4:{
				log:false,
				enable:'chooseToUse',
				viewAsFilter:function(player){
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return true;
				},
				filterCard:function(){return false},
				selectCard:-1,
				viewAs:{name:'shan'},
				ai:{
					skillTagFilter:function(player){
						if(player.storage.lvli>1) return false;
						if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
						return true;
					},
					threaten:1.5,
					respondShan:true,
				}
			},
			lvli5:{
				log:false,
				enable:'chooseToUse',
				viewAsFilter:function(player){
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return true;
				},
				filterCard:function(){return false},
				selectCard:-1,
				viewAs:{name:'wuxie'},
			},
			lvli6:{
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					if(!player.storage.beishui) return false;
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return true;
				},
				content:function(){
					var next=player.chooseToUse();
					next.set('norestore',true);
					next.set('_backupevent','lvli');
					next.backup('lvli');
					next.set('lvli6',true);
				},
			},
			choujue:{
				derivation:['beishui','qingjiao'],
				trigger:{global:'phaseAfter'},
				audio:2,
				skillAnimation:true,
				animationColor:'water',
				unique:true,
				juexingji:true,
				forced:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=false;
				},
				filter:function(event,player){
					if(player.storage.choujue) return false;
					return Math.abs(player.hp-player.countCards('h'))>=3;
				},
				content:function(){
					player.awakenSkill('choujue');
					player.storage.choujue=true;
					player.loseMaxHp();
					player.addSkill('beishui');
				},
			},
			beishui:{
				trigger:{player:'phaseZhunbeiBegin'},
				audio:2,
				skillAnimation:'epic',
				animationColor:'thunder',
				unique:true,
				juexingji:true,
				forced:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=false;
				},
				filter:function(event,player){
					if(player.storage.beishui) return false;
					return Math.min(player.hp,player.countCards('h'))<2;
				},
				content:function(){
					player.awakenSkill('beishui');
					player.storage.beishui=true;
					player.loseMaxHp();
					player.addSkill('qingjiao');
				},
			},
			qingjiao:{
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return (ui.cardPile.hasChildNodes()||ui.discardPile.hasChildNodes());
				},
				//check:function(event,player){
				//	return player.countCards('h')<=player.hp;
				//},
				content:function(){
					'step 0'
					player.discard(player.getCards('h'));
					'step 1'
					var evt=trigger.getParent();
					if(evt&&evt.getParent&&!evt.qingjiao){
						evt.qingjiao=true;
						var next=game.createEvent('qingjiao_discard',false,evt.getParent());
						next.player=player;
						next.setContent(function(){
							var hs=player.getCards('he');
							if(hs.length) player.discard(hs);
						});
					}
					'step 2'
					var list=[];
					var typelist=[];
					var getType=function(card){
						var sub=get.subtype(card);
						if(sub) return sub;
						return card.name;
					};
					for(var i=0;i<ui.cardPile.childElementCount;i++){
						var node=ui.cardPile.childNodes[i];
						var typex=getType(node);
						if(!typelist.contains(typex)){
							list.push(node);
							typelist.push(typex);
							if(list.length>=8) break;
						}
					}
					if(list.length<8){
						for(var i=0;i<ui.discardPile.childElementCount;i++){
							var node=ui.discardPile.childNodes[i];
							var typex=getType(node);
								if(!typelist.contains(typex)){
								list.push(node);
								typelist.push(typex);
								if(list.length>=8) break;
							}
						}
					}
					player.gain(list,'gain2');
					'step 3'
					game.updateRoundNumber();
				},
			},
			//王双
			spzhuilie:{
				mod:{
					targetInRange:function(card){
						if(card.name=='sha') return true;
					},
				},
				trigger:{player:'useCardToTargeted'},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&!player.inRange(event.target);
				},
				forced:true,
				logTarget:'target',
				content:function(){
					'step 0'
					player.judge(function(card){
						var type=get.subtype(card);
						return ['equip1','equip4','equip3','equip6'].contains(type)?6: -6;
						switch(type){
							case 'equip': return 4;
							case 'trick': return -4;
							default: return 0;
						}
					});
					'step 1'
					if(trigger.getParent().addCount!==false){
						trigger.getParent().addCount=false;
						var stat=player.getStat();
						if(stat&&stat.card&&stat.card.sha) stat.card.sha--;
					}
					if(result.bool===true){
						var map=trigger.customArgs;
						var id=trigger.target.playerid;
						if(!map[id]) map[id]={};
						if(typeof map[id].extraDamage!='number') map[id].extraDamage=0;
						map[id].extraDamage+=trigger.target.hp-1;
					}
					else if(result.bool===false) player.loseHp();
				},
			},
			spzhuilie2:{
				onremove:true,
				intro:{
					content:'使用【杀】的次数上限+#',
				},
				mod:{
					cardUsable:function(card,player,num){
					 if(card.name=='sha') return num+player.countMark('spzhuilie2');
					},
				},
			},
			//花鬘
			manyi:{audio:2},
			hmmanyi:{
				trigger:{target:'useCardToBefore'},
				forced:true,
				audio:'manyi',
				filter:function(event,player){
					return event.card.name=='nanman';
				},
				content:function(){
					trigger.cancel();
				},
			},
			mansi:{
				audio:2,
				group:'mansi_viewas',
				trigger:{global:'damageEnd'},
				filter:function(event,player){
					return event.card&&event.card.name=='nanman';
				},
				frequent:true,
				content:function(){
				 player.draw();
				 player.addMark('mansi',1,false);
				},
				intro:{content:'已因此技能获得了#张牌'},
			},
			mansi_viewas:{
				audio:'mansi',
				position:'h',
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				selectCard:-1,
				filter:function(event,player){
					var hs=player.getCards('h');
					if(!hs.length) return false;
					for(var i=0;i<hs.length;i++){
						var mod2=game.checkMod(hs[i],player,'unchanged','cardEnabled2',player);
						if(mod2===false) return false;
					}
					return true;
				},
				viewAs:{name:'nanman'},
				ai:{order:0.1},
			},
			souying:{
				audio:2,
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				direct:true,
				filter:function(event,player,name){
					if(!player.countCards('he')||player.hasSkill('souying2')) return false;
					if(!event.targets||event.targets.length!=1||event.player==event.target) return false;
					if(event.card.name!='sha'&&get.type(event.card)!='trick') return false;
					if(name=='useCardToPlayered'){
						if(!event.cards.filterInD().length) return false;
						var target=event.target;
						return player.getHistory('useCard',function(evt){
							return evt.targets&&evt.targets.contains(target);
						}).indexOf(event.getParent())>0;
					}
					else{
						var source=event.player;
						return source.getHistory('useCard',function(evt){
							return evt.targets&&evt.targets.contains(player);
						}).indexOf(event.getParent())>0;
					}
				},
				content:function(){
					'step 0'
					var next=player.chooseToDiscard('he');
					var prompt;
					if(event.triggername=='useCardToTargeted'){
						event.target=trigger.player;
						prompt='令'+get.translation(trigger.card)+'对你无效';
						next.set('goon',-get.effect(player,trigger.card,trigger.player,player));
					}
					else{
						event.target=trigger.targets[0];
						prompt='弃置一张牌，并获得'+get.translation(trigger.cards.filterInD());
						next.set('goon',get.value(trigger.cards.filterInD()));
					}
					next.set('prompt',get.prompt('souying',event.target));
					next.set('prompt2',prompt)
					next.set('ai',function(card){
						return _status.event.goon-get.value(card);
					});
					next.set('logSkill',['souying',event.target]);
					'step 1'
					if(result.bool){
						player.addTempSkill('souying2');
						if(event.triggername=='useCardToPlayered') player.gain(trigger.cards.filterInD());
						else trigger.excluded.add(player);
					}
				},
				ai:{
					expose:0.25,
				},
			},
			souying2:{},
			zhanyuan:{
				unique:true,
				audio:2,
				derivation:'hmxili',
				skillAnimation:true,
				animationColor:'soil',
				juexingji:true,
				forced:true,
				filter:function(event,player){
					return player.countMark('mansi')>7;
				},
				trigger:{player:'phaseZhunbeiBegin'},
				content:function(){
					'step 0'
					player.awakenSkill('zhanyuan');
					player.gainMaxHp();
					player.recover();
					'step 1'
					player.chooseTarget('是否失去〖蛮嗣〗，令一名其他男性角色和自己一同获得技能〖系力〗？',function(card,player,target){
						return target!=player&&target.sex=='male';
					}).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'fire');
						player.addSkill('hmxili');
						target.addSkill('hmxili');
						player.removeSkill('mansi');
					}
				},
			},
			hmxili:{
				trigger:{global:'damageBegin1'},
				direct:true,
				audio:2,
				filter:function(event,player){
					return event.source&&event.source!=player&&event.source==_status.currentPhase&&event.source.hasSkill('hmxili')&&!event.player.hasSkill('hmxili')&&player.countCards('he')>0&&!player.hasSkill('hmxili2');
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('是否弃置一张牌，令'+get.translation(trigger.source)+'对'+get.translation(trigger.player)+'的伤害+1，且你与其各摸两张牌？','he').set('logSkill',['hmxili',trigger.player]).ai=function(card){
						return 9-get.value(card);
					};
					'step 1'
					if(result.bool){
						game.asyncDraw([trigger.source,player],2);
						trigger.num++;
						player.addTempSkill('hmxili2');
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
			},
			hmxili2:{},
			//说出吾名吓汝一跳
			xuxie:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				logTarget:function(event,player){
					return game.filterPlayer(function(current){
						return get.distance(player,current)<=1;
					}).sortBySeat();
				},
				check:function(event,player){
					if(player.isHealthy()) return false;
					var list=game.filterPlayer(function(current){
						return get.distance(player,current)<=1;
					});
					var draw=0;
					var discard=0;
					var num=2/player.getDamagedHp();
					while(list.length){
						var target=list.shift();
						var att=get.attitude(player,target);
						if(att>0){
							draw++;
							if(target.countDiscardableCards(player,'he')>0) discard--;
						}
						if(att==0){
							draw--;
							if(target.countDiscardableCards(player,'he')>0) discard--;
						}
						if(att<0){
							draw--;
							if(target.countDiscardableCards(player,'he')>0) discard++;
						}
					}
					return draw>=num||discard>=num;
				},
				content:function(){
					'step 0'
					player.loseMaxHp();
					'step 1'
					var targets=game.filterPlayer(function(current){
						return get.distance(player,current)<=1;
					}).sortBySeat();
					if(!targets.length) event.finish();
					else{
						event.targets=targets;
						player.chooseControl().set('choiceList',[
							'弃置'+get.translation(targets)+'的各一张牌',
							'令'+get.translation(targets)+'各摸一张牌',
						]).set('ai',function(){
							var player=_status.event.player;
							var list=_status.event.getParent().targets.slice(0);
							var draw=0;
							var discard=0;
							while(list.length){
								var target=list.shift();
								var att=get.attitude(player,target);
								if(att>0){
									draw++;
									if(target.countDiscardableCards(player,'he')>0) discard--;
								}
								if(att<0){
									draw--;
									if(target.countDiscardableCards(player,'he')>0) discard++;
								}
							}
							if(draw>discard) return 1;
							return 0;
						});
					}
					'step 2'
					event.index=result.index;
					if(result.index==1){
						game.asyncDraw(targets);
					}
					else event.goto(4);
					'step 3'
					game.delay();
					event.finish();
					'step 4'
					var target=targets.shift();
					if(target.countDiscardableCards(player,'he')>0) player.discardPlayerCard(target,'he',true);
					if(targets.length) event.redo();
				},
				group:'xuxie_add',
			},
			xuxie_add:{
				audio:'xuxie',
				trigger:{player:'phaseUseEnd'},
				forced:true,
				locked:false,
				filter:function(event,player){
					return !game.hasPlayer(function(current){
						return current.maxHp<player.maxHp;
					});
				},
				content:function(){
					player.gainMaxHp();
				},
			},
			//新潘凤
			xinkuangfu:{
				enable:'phaseUse',
				usable:1,
				audio:2,
				delay:false,
				filterTarget:function(card,player,target){
					if(player==target) return player.countCards('e',function(card){
						return lib.filter.cardDiscardable(card,player);
					})>0;
					return target.countDiscardableCards(player,'e')>0;
				},
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.countCards('e')>0;
					});
				},
				content:function(){
					'step 0'
					if(player==target) player.chooseToDiscard('e',true);
					else player.discardPlayerCard(target,'e',true);
					'step 1'
					player.chooseUseTarget('sha',true,false,'nodistance');
					'step 2'
					var bool=game.hasPlayer2(function(current){
						return current.getHistory('damage',function(evt){
							return evt.getParent(4)==event;
						}).length>0
					});
					if(player==target&&bool) player.draw(2);
					else if(player!=target&&!bool) player.chooseToDiscard('h',2,true);
				},
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.3;
					},
					result:{
						target:function(player,target){
							var att=get.attitude(player,target);
							var max=0;
							var min=1;
							target.countCards('e',function(card){
								var val=get.value(card,target);
								if(val>max) max=val;
								if(val<min) min=val;
							});
							if(att>0&&min<=0) return target.hasSkillTag('noe')?3:1;
							if(att<0&&max>0){
								if(target.hasSkillTag('noe')) return max>6?(-max/3):0;
								return -max;
							}
							return 0;
						},
					},
				},
			},
			//吴兰雷铜
			wlcuorui:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.isFriendOf(player)&&current.countDiscardableCards(player,'hej')>0;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(function(card,player,target){
						return target.isFriendOf(player)&&target.countDiscardableCards(player,'hej')>0;
					},get.prompt2('wlcuorui')).set('ai',function(target){
						if(target.countCards('e',function(card){
							return card.name!='tengjia'&&get.value(card,target)<=0;
						})) return 10;
						if(target.countCards('j',function(card){
							return get.effect(target,{name:card.viewAs||card.name},target,target)<0;
						})) return 10;
						return Math.random()+0.2-1/target.countCards('hej');
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('wlcuorui',target);
						player.discardPlayerCard(target,'hej',true);
					}
					else event.finish();
					'step 2'
					if(!result.cards||!result.cards.length){
						event.finish();
						return;
					}
					var color=get.color(result.cards[0],result.cards[0].original=='j'?false:target);
					event.color=color;
					var list=[];
					if(game.hasPlayer(function(current){
						return current.isEnemyOf(player)&&current.countCards('h');
					})) list.push('展示手牌');
					if(game.hasPlayer(function(current){
						return current.isEnemyOf(player)&&current.countCards('e',{color:color});
					})) list.push('弃置装备');
					if(!list.length){
						event.finish();
						return;
					}
					if(list.length==1) event._result={control:list[0]};
					else player.chooseControl(list).set('prompt','挫锐：展示对手的至多两张手牌，或弃置对手装备区内至多两张'+get.translation(color)+'牌').set('ai',function(){
						var player=_status.event.player;
						var color=_status.event.getParent().color;
						if(game.countPlayer(function(current){
							if(!current.isEnemyOf(player)) return false;
							return current.countCards('e',function(card){
								return get.color(card)==color&&get.value(card)>0;
							});
						})>1) return 1;
						return 0;
					});
					'step 3'
					if(result.control=='弃置装备') event.goto(5);
					else{
						var dialog=['请选择要展示的牌'];
						var list=game.filterPlayer(function(current){
							return current.isEnemyOf(player)&&current.countCards('h');
						}).sortBySeat();
						for(var i of list){
							dialog.push('<div class="text center">'+get.translation(i)+'</div>');
							if(player.hasSkillTag('viewHandcard',null,i,true)) dialog.push(i.getCards('h'));
							else dialog.push([i.getCards('h'),'blank']);
						}
						player.chooseButton([1,2],true).set('createDialog',dialog).set('ai',function(button){
							var color=(get.color(button.link)==_status.event.getParent().color);
							return color?Math.random():0.35;
						});
					}
					'step 4'
					player.showCards(result.links);
					var map={};
					var map2={};
					for(var i of result.links){
						var id=get.owner(i).playerid;
						if(!map[id]) map[id]=[];
						map[id].push(i);
						if(get.color(i)!=event.color) continue;
						if(!map2[id]) map2[id]=[];
						map2[id].push(i);
					}
					for(var i in map){
						var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
						if(map2[i]) player.gain(map2[i],source,'bySelf','give');
						player.line(source);
						game.log(player,'展示了',source,'的',map[i]);
					}
					event.next.sort(function(a,b){
						return lib.sort.seat(a.source||a.player,b.source||b.player);
					});
					event.finish();
					'step 5'
					var dialog=['请选择要弃置的牌'];
					var list=game.filterPlayer(function(current){
						return current.isEnemyOf(player)&&current.countCards('e',function(card){
							return get.color(card)==event.color;
						});
					}).sortBySeat();
					for(var i of list){
						dialog.push('<div class="text center">'+get.translation(i)+'</div>');
						dialog.push(i.getCards('e',function(card){
							return get.color(card)==event.color;
						}));
					}
					player.chooseButton([1,2],true).set('createDialog',dialog).set('ai',function(button){
						var owner=get.owner(button.link);
						return get.value(button.link,owner)
					});
					'step 6'
					var map={};
					for(var i of result.links){
						if(get.color(i)!=event.color) continue;
						var id=get.owner(i).playerid;
						if(!map[id]) map[id]=[];
						map[id].push(i);
					}
					for(var i in map){
						(_status.connectMode?lib.playerOL:game.playerMap)[i].discard(map[i],'notBySelf');
					}
					event.next.sort(function(a,b){
						return lib.sort.seat(a.player,b.player);
					});
				},
			},
			kuiji:{
				audio:2,
				enable:"phaseUse",
				filter:function(event,player){
					if(player.hasJudge('bingliang')) return false;
					return player.countCards('hes',function(card){
						return get.color(card)=='black'&&get.type(card)=='basic';
					})>0;
				},
				viewAs:{name:'bingliang'},
				position:"hes",
				filterCard:function(card,player,event){
					return get.color(card)=='black'&&get.type(card)=='basic'&&player.canAddJudge({name:'bingliang',cards:[card]});
				},
				selectTarget:-1,
				filterTarget:function(card,player,target){
					return player==target;
				},
				check:function(card){
					return 9-get.value(card);
				},
				onuse:function(links,player){
					var next=game.createEvent('kuiji_content',false,_status.event.getParent());
					next.player=player;
					next.setContent(lib.skill.kuiji.kuiji_content);
				},
				kuiji_content:function(){
					'step 0'
					player.draw();
					'step 1'
					player.chooseTarget('选择一名体力值最大的敌方角色，对其造成2点伤害',function(card,player,target){
						return target.isEnemyOf(player)&&!game.hasPlayer(function(current){
							return current.isEnemyOf(player)&&current.hp>target.hp;
						});
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player)
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target);
						target.damage(2);
					}
				},
				ai:{
					result:{
						target:1,
					},
					order:12,
				},
				group:'kuiji_dying',
				subSkill:{
					dying:{
						trigger:{global:'dying'},
						forced:true,
						popup:false,
						filter:function(event,player){
							var evt=event.getParent(2);
							if(!evt||evt.name!='kuiji_content'||evt.player!=player) return false;
							var list=game.filterPlayer(function(current){
								return current.isFriendOf(player);
							}).sort(function(a,b){
								return a.hp-b.hp;
							});
							return (list.length==1||list[0].hp<list[1].hp)&&list[0].isDamaged();
						},
						content:function(){
							var list=game.filterPlayer(function(current){
								return current.isFriendOf(player);
							}).sort(function(a,b){
								return a.hp-b.hp;
							})[0];
							player.logSkill('kuiji',list);
							list.recover();
						},
					},
				},
			},
			//官渡之战
			xiying:{
				trigger:{player:'phaseUseBegin'},
				audio:2,
				direct:true,
				filter:function(event,player){
					return player.countCards('h',function(card){
						return _status.connectMode||get.type(card)!='basic';
					})>0;
				},
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(current){
						return current!=player;
					});
					list.sortBySeat();
					event.targets=list;
					player.chooseToDiscard(get.prompt2('xiying'),'h',function(card){
						return get.type(card)!='basic';
					}).set('logSkill',['xiying',list]).set('ai',function(card){
						return _status.event.val-get.value(card)
					}).set('val',function(){
						return 4*Math.sqrt(game.countPlayer(function(current){
							return get.attitude(player,current)<0&&current.countCards('he')>0;
						}));
					}());
					'step 1'
					if(!result.bool) event.finish();
					'step 2'
					var target=targets.shift();
					event.target=target;
					if(target.isAlive()) target.chooseToDiscard('he','弃置一张牌，或本回合内不能使用或打出牌').set('ai',function(card){
						var player=_status.event.player;
						var source=_status.event.getTrigger().player;
						if(get.attitude(source,player)>0) return -1;
						if(_status.event.getRand()>0.5) return 5-get.value(card);
						return -1;
					});
					'step 3'
					if(target.isAlive()&&!result.bool) target.addTempSkill('xiying2');
					if(targets.length) event.goto(2);
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return arg.target.hasSkill('xiying2');
					},
				},
			},
			xiying2:{
				mark:true,
				intro:{content:'本回合内不能使用或打出牌'},
				mod:{
					cardEnabled2:function(card){
						return false;
					},
				},
			},
			gangzhi:{
				audio:2,
				trigger:{
					player:'damageBefore',
					source:'damageBefore',
				},
				forced:true,
				content:function(){
					trigger.cancel();
					trigger.player.loseHp(trigger.num);
				},
				ai:{
					jueqing:true,
				},
			},
			beizhan:{
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				audio:2,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('beizhan')).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var hs=target.countCards('h');
						var ht=target.maxHp;
						if(hs>=ht&&target.isMaxHandcard()) return -att*hs;
						if(hs<ht&&game.hasPlayer(function(current){
							return current.countCards('h')>ht;
						})) return att*2*(ht-hs);
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('beizhan',target);
						target.drawTo(Math.min(5,target.maxHp))
						target.addSkill('beizhan2');
					}
				},
				ai:{
					expose:0.25,
				},
			},
			beizhan2:{
				trigger:{player:'phaseBegin'},
				silent:true,
				firstDo:true,
				content:function(){
					player.removeSkill('beizhan2');
					if(player.isMaxHandcard()) player.addTempSkill('zishou2');
				},
				mark:true,
				intro:{content:'回合开始时，若手牌数为全场最多，则回合内不能使用牌指定其他角色为目标'},
			},
			fenglve:{
				audio:2,
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				content:function (){
					'step 0'
					var goon=player.hasCard(function(card){
						if(get.position(card)!="h") return false;
						var val=get.value(card);
						if(val<0) return true;
						if(val<=5){
							return card.number>=12;
						}
						if(val<=6){
							return card.number>=13;
						}
						return false;
					});
					player.chooseTarget(get.prompt2('fenglve'),function(card,player,target){
						return player.canCompare(target);
					}).set('ai',function(target){
						if(!_status.event.goon) return 0;
						return -get.attitude(player,target)*(1+target.countCards('e'))/(1+target.countCards('j'));
					}).set('goon',goon);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('fenglve',target);
						player.chooseToCompare(target);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						var num=0;
						if(target.countCards('h')) num++;
						if(target.countCards('e')) num++;
						if(target.countCards('j')) num++;
						if(num){
							event.gainner=player;
							event.giver=target;
							target.choosePlayerCard(target,num,'hej',true).set('filterButton',function(button){
								for(var i=0;i<ui.selected.buttons.length;i++){
									if(get.position(button.link)==get.position(ui.selected.buttons[i].link)) return false;
								}
								return true;
							}).set('prompt','选择交给'+get.translation(event.gainner)+'的牌');
						}
						else event.finish();
					}
					else{
						if(player.countCards('he')){
							event.gainner=target;
							event.giver=player;
							player.choosePlayerCard(player,true,'he').set('prompt','选择交给'+get.translation(event.gainner)+'的牌');
						}
						else event.finish();
					}
					'step 3'
					event.gainner.gain(result.links,'giveAuto',event.giver)
				},
				group:'fenglve2',
				ai:{
					expose:0.25,
				},
			},
			fenglve2:{
				trigger:{
					player:'chooseToCompareAfter',
					target:'chooseToCompareAfter',
				},
				check:function(event,player){
					var card,target;
					if(player==event.player){
						card=event.card1;
						target=event.target;
					}
					else{
						card=event.card2;
						target=event.player;
					}
					return get.attitude(player,target)*get.value(card,target,'raw')>0;
				},
				filter:function(event,player){
					if(event.targets) return false;
					var card,target;
					if(player==event.player){
						card=event.card1;
						target=event.target;
					}
					else{
						card=event.card2;
						target=event.player;
					}
					return get.position(card,true)=='o';
				},
				prompt:function(event,player){
					var card,target;
					if(player==event.player){
						card=event.card1;
						target=event.target;
					}
					else{
						card=event.card2;
						target=event.player;
					}
					return '是否发动【锋略】，令'+get.translation(target)+'获得'+get.translation(card)+'？'
				},
				logTarget:function(event,player){
					var target;
					if(player==event.player){
						target=event.target;
					}
					else{
						target=event.player;
					}
					return target;
				},
				content:function(){
					var card,target;
					if(player==trigger.player){
						card=trigger.card1;
						target=trigger.target;
					}
					else{
						card=trigger.card2;
						target=trigger.player;
					}
					target.gain(card,'gain2','log');
				},
			},
			mouzhi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0
				},
				filterCard:true,
				filterTarget:function(card,player,target){
					if(target.storage.mouzhi2&&target.storage.mouzhi2.contains(player)) return false;
					return target!=player;
				},
				delay:0,
				lose:false,
				discard:false,
				check:function(card){
					if(card.name=='du') return 20;
					var player=_status.event.player;
					var useval=player.getUseValue(card);
					var maxval=0;
					game.countPlayer(function(current){
						if(current!=player&&!current.hasSkillTag('nogain')&&get.attitude(player,current)>0){
							var temp=current.getUseValue(card);
							if(temp>maxval) maxval=temp;
						}
					});
					if(maxval>0&&get.tag(card,'damage')) return 15;
					if(maxval>useval) return 10;
					if(player.needsToDiscard()) return 1/Math.max(0.1,get.value(card));
					return -1;
				},
				content:function(){
					target.gain(cards,player,'giveAuto');
					target.addTempSkill('mouzhi2',{player:'phaseEnd'});
					target.storage.mouzhi2.add(player);
					target.storage.mouzhi2.sortBySeat(target);
					target.markSkill('mouzhi2');
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if(ui.selected.cards.length){
								var card=ui.selected.cards[0];
								if(card.name=='du') return target.hasSkill('lucia_duqu')?1:-1;
								var t=target.getUseValue(card);
								var p=player.getUseValue(card);
								if(t>p) return 2;
								if(t>0) return 1.5
								if(player.needsToDiscard()) return 1;
								return 0;
							}
							return 0;
						},
					},
				},
			},
			mouzhi2:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				trigger:{source:'damageSource'},
				forced:true,
				intro:{
					content:'出牌阶段内第一次对一名其他角色造成伤害时，$摸一张牌',
				},
				filter:function(event,player){
					var evt2=event.getParent('phaseUse');
					if(!evt2||evt2.player!=player) return false;
					var history=event.player.getHistory('damage',function(evt){
						return evt.source==player&&evt.getParent('phaseUse')==evt2;
					});
					return history[0]==event;
				},
				content:function(){
					'step 0'
					game.asyncDraw(player.storage.mouzhi2);
					'step 1'
					game.delay();
				},
			},
			yuanlve:{
				enable:'phaseUse',
				usable:1,
				audio:2,
				filter:function(event,player){
					return player.countCards('h',function(card){
						return get.type(card)!='equip';
					})
				},
				filterCard:function(card){
					return get.type(card)!='equip';
				},
				filterTarget:lib.filter.notMe,
				delay:false,
				discard:false,
				lose:false,
				check:function(card){
					if(card.name=='du') return 20;
					var player=_status.event.player;
					var useval=player.getUseValue(card);
					var maxval=0;
					game.countPlayer(function(current){
						if(current!=player&&!current.hasSkillTag('nogain')&&get.attitude(player,current)>0){
							var temp=current.getUseValue(card);
							if(temp>maxval) maxval=temp;
						}
					});
					if(maxval>useval) return 15;
					if(maxval>0) return 10;
					if(player.needsToDiscard()) return 1/Math.max(0.1,get.value(card));
					return -1;
				},
				content:function(){
					'step 0'
					target.gain(cards,player,'giveAuto');
					'step 1'
					target.chooseUseTarget(cards[0]);
					'step 2'
					if(result.bool) player.draw();
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if(ui.selected.cards.length){
								var card=ui.selected.cards[0];
								if(card.name=='du') return target.hasSkill('lucia_duqu')?1:-1;
								var t=target.getUseValue(card);
								var p=player.getUseValue(card);
								if(t>p) return 2;
								if(t>0) return 1.5
								if(player.needsToDiscard()) return 1;
								return 0;
							}
							return 0;
						},
					},
				},
			},
			//吕旷吕翔和淳于琼和官渡哔哔机
			spshicai:{
				audio:2,
				enable:'phaseUse',
				position:'he',
				filter:function(event,player){
					return !player.storage.spshicai2||!player.getCards('h').contains(player.storage.spshicai2);
				},
				filterCard:true,
				prompt:function(){
					var str='弃置一张牌，然后获得';
					if(get.itemtype(_status.pileTop)=='card') str+=get.translation(_status.pileTop);
					else str+='牌堆顶的一张牌';
					return str;
				},
				check:function(card){
					var player=_status.event.player;
					var cardx=_status.pileTop;
					if(get.itemtype(cardx)!='card') return 0;
					var val=player.getUseValue(cardx,null,true);
					if(!val) return 0;
					var val2=player.getUseValue(card,null,true);
					return (val-val2)/Math.max(0.1,get.value(card));
				},
				content:function(){
					var card=get.cards()[0];
					player.storage.spshicai2=card;
					player.gain(card,'draw');
					game.log(player,'获得了牌堆顶的一张牌');
				},
				group:'spshicai_mark',
				ai:{
					order:1,
					result:{player:1},
				},
			},
			spshicai_mark:{
				trigger:{player:'phaseUseBegin'},
				silent:true,
				firstDo:true,
				content:function(){
					player.addTempSkill('spshicai2','phaseUseEnd');
				},
			},
			spshicai2:{
				onremove:true,
				mark:true,
				intro:{
					mark:function(dialog,content,player){
						if(player!=game.me) return get.translation(player)+'观看牌堆中...';
						if(get.itemtype(_status.pileTop)!='card') return '牌堆顶无牌';
						dialog.add([_status.pileTop]);
					},
				},
			},
			spfushi:{
				group:['zezhu','chenggong'],
				derivation:['zezhu','chenggong'],
				locked:true,
			},
			zezhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var enemy=0;
					var friend=0;
					var zhu=0;
					for(var i of game.players){
						if(i.isEnemyOf(player)) enemy++;
						else friend++;
						if(i!=player&&i.isZhu) zhu++;
					}
					return zhu>0&&enemy<friend;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.isZhu;
				},
				selectTarget:-1,
				multiline:true,
				multitarget:true,
				content:function(){
					'step 0'
					event.targets.sortBySeat();
					event.targets2=event.targets.slice(0);
					'step 1'
					var target=event.targets2.shift();
					if(target.countGainableCards(player,'he')>0) player.gainPlayerCard(target,'he',true);
					else player.draw();
					if(event.targets2.length) event.redo();
					'step 2'
					if(player.countCards('he')>=targets.length){
						player.chooseCard('he',true,'依次选择'+get.cnNumber(targets.length)+'张牌，分别交给'+get.translation(targets),targets.length).set('ai',function(card){
							var target=_status.event.getParent().targets[ui.selected.cards.length];
							var player=_status.event.player;
							return get.attitude(player,target)*get.value(card,target);
						});
					}
					else event.finish();
					'step 3'
					for(var i=0;i<targets.length;i++){
						targets[i].gain(result.cards[i],player,'giveAuto');
					}
				},
				ai:{
					order:6,
					result:{player:1},
				},
			},
			chenggong:{
				audio:2,
				trigger:{global:'useCardToPlayered'},
				filter:function(event,player){
					if(!(event.isFirstTarget&&event.targets&&event.targets.length>1&&event.player.isAlive())) return false;
					var enemy=0;
					var friend=0;
					for(var i of game.players){
						if(i.isEnemyOf(player)) enemy++;
						else friend++;
					}
					return enemy>friend;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:'player',
				content:function(){
					trigger.player.draw();
				},
			},
			cangchu:{
				trigger:{
					global:'gameDrawAfter',
					player:['damageEnd','enterGame'],
				},
				audio:2,
				forced:true,
				filter:function(event,player){
					if(event.name!='damage') return true;
					return event.nature=='fire'&&player.countMark('cangchu')>0;
				},
				content:function(){
					if(trigger.name!='damage') player.addMark('cangchu',3);
					else{
						player.removeMark('cangchu',Math.min(trigger.num,player.countMark('cangchu')));
						if(!player.hasMark('cangchu')) event.trigger('cangchuAwaken');
					}
				},
				marktext:'粮',
				intro:{
					name2:'粮',
					content:'mark',
				},
				ai:{
					threaten:function(player,target){
						return 1+target.countMark('cangchu')/2;
					},
					effect:{
						target:function(card,player,target,current){
							if(target.hasMark('cangchu')){
								if(card.name=='sha'){
									if(lib.skill.global.contains('huoshaowuchao')||card.nature=='fire'||player.hasSkill('zhuque_skill')) return 2;
								}
								if(get.tag(card,'fireDamage')&&current<0) return 2;
							}
						}
					},
				},
			},
			sushou:{
				trigger:{player:'phaseDiscardBegin'},
				frequent:true,
				audio:2,
				content:function(){
					'step 0'
					player.draw(1+player.countMark('cangchu'));
					'step 1'
					var num=Math.min(player.countCards('h'),game.countPlayer(function(target){
						return target!=player&&target.isFriendOf(player);
					}));
					if(num){
						player.chooseCardTarget({
							prompt:'是否将任意张手牌交给其他己方角色？',
							prompt2:'操作提示：先按顺序选中所有要给出的手牌，然后再按顺序选择等量的目标角色',
							selectCard:[1,num],
							selectTarget:function(){
								return ui.selected.cards.length;
							},
							filterTarget:function(card,player,target){
								return target!=player&&target.isFriendOf(player);
							},
							complexSelect:true,
							ai1:function(card){
								if(card.name=='shan') return 1;
								return Math.random();
							},
							ai2:function(target){
								return Math.sqrt(5-Math.max(4,target.countCards('h')))*get.attitude(_status.event.player,target);
							},
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						while(result.cards.length){
							var target=result.targets.shift();
							var card=result.cards.shift();
							target.gain(card,player);
							player.$giveAuto(card,target);
						}
						event.next.sort(function(a,b){
							return lib.sort.seat(a.player,b.player);
						});
					}
					else event.finish();
					'step 3'
					game.delay();
				},
			},
			liangying:{
				trigger:{
					global:'phaseDrawBegin2',
					player:'cangchuAwaken',
				},
				forced:true,
				audio:1,
				logTarget:function(event,player){
					if(event.name=='phaseDraw') return event.player;
					return game.filterPlayer(function(current){
						return current.isEnemyOf(player);
					});
				},
				filter:function(event,player){
					if(event.name=='cangchu') return true;
					return player.hasMark('cangchu')&&!event.numFixed&&event.player.isFriendOf(player);
				},
				content:function(){
					'step 0'
					if(trigger.name=='cangchu'){
						player.loseMaxHp();
						var list=game.filterPlayer(function(current){
							return current.isEnemyOf(player);
						});
						if(list.length){
							game.asyncDraw(list,2);
						}
					}
					else{
						trigger.num++;
						event.finish();
					}
					'step 1'
					game.delay();
				},
			},
			liehou:{
				enable:'phaseUse',
				usable:1,
				audio:2,
				filterTarget:function(card,player,target){
					return player.inRange(target)&&target.countCards('h');
				},
				content:function(){
					'step 0'
					target.chooseCard('h',true,'交给'+get.translation(player)+'一张牌');
					'step 1'
					if(result.bool){
						player.gain(result.cards,target,'giveAuto');
					}
					else event.finish();
					'step 2'
					if(player.countCards('h')&&game.hasPlayer(function(current){
						return current!=target&&player.inRange(current);
					})){
						player.chooseCardTarget({
							position:'h',
							filterCard:true,
							filterTarget:function(card,player,target){
								return target!=_status.event.getParent().target&&player.inRange(target);
							},
							forced:true,
							prompt:'将一张手牌交给一名攻击范围内的其他角色',
							ai1:function(card){
								var player=_status.event.player;
								if(get.name(card)=='du') return 20;
								if(game.hasPlayer(function(current){
									return current!=_status.event.getParent().target&&player.inRange(current)&&get.attitude(player,current)>0&&current.getUseValue(card)>player.getUseValue(card)&&current.getUseValue(card)>player.getUseValue(card);
								})) return 12;
								if(game.hasPlayer(function(current){
									return current!=player&&get.attitude(player,current)>0;
								})){
									if(card.name=='wuxie') return 11;
									if(card.name=='shan'&&player.countCards('h','shan')>1) return 9
								}
								return 6/Math.max(1,get.value(card));
							},
							ai2:function(target){
								var player=_status.event.player;
								var card=ui.selected.cards[0];
								var att=get.attitude(player,target);
								if(card.name=='du') return -6*att;
								if(att>0){
									if(get.position(card)=='h'&&target.getUseValue(card)>player.getUseValue(card)) return 4*att;
									if(get.value(card,target)>get.value(card,player)) return 2*att;
									return 1.2*att;
								}
								return -att*Math.min(4,target.countCards('he'))/6;
							},
						});
					}
					else event.finish();
					'step 3'
					if(result.bool) result.targets[0].gain(result.cards,player,'giveAuto')
				},
				ai:{
					order:6,
					result:{
						target:-1,
					},
				},
			},
			qigong:{
				trigger:{player:'shaMiss'},
				direct:true,
				audio:2,
				filter:function(event,player){
					return player.canUse('sha',event.target,false)&&(player.hasSha()||_status.connectMode&&player.countCards('h'));
				},
				content:function(){
					"step 0"
					player.chooseToUse(get.prompt('qigong'),function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},trigger.target,-1).set('addCount',false).logSkill='qigong';
				},
				group:'qigong_hit',
			},
			qigong_hit:{
				trigger:{player:'useCard1'},
				firstDo:true,
				silent:true,
				filter:function(event,player){
					return event.getParent(2).name=='qigong';
				},
				content:function(){
					trigger.directHit.addArray(game.players);
				},
			},
			//和沙摩柯一起上线的新服三将
			spjiedao:{
				audio:2,
				trigger:{
					source:"damageBegin1",
				},
				filter:function(event,player){
					return player.isDamaged()&&!player.getHistory('sourceDamage').length;
				},
				logTarget:'player',
				direct:true,
				check:function(trigger,player){
						if(get.attitude(player,trigger.player)>=-1) return false;
						return !trigger.player.hasSkillTag('filterDamage',null,{
						player:player,
						card:trigger.card,
					});
				},
				content:function (){
					"step 0"
					var num=player.getDamagedHp();
					var map={};
					var list=[];
					for(var i=1;i<=num;i++){
						var cn=get.cnNumber(i,true);
						map[cn]=i;
						list.push(cn);
					}
					event.map=map;
					player.chooseControl(list,'cancel2',function(){
						if(!lib.skill.spjiedao.check(_status.event.getTrigger(),player)) return 'cancel2';
						return get.cnNumber(_status.event.goon,true);
					}).set('prompt',get.prompt2('spjiedao',trigger.player)).set('goon',num);
					"step 1"
					if(result.control=='cancel2') return;
					player.logSkill('spjiedao',trigger.player);
					var num=event.map[result.control]||1;
					trigger.num+=num;
					var next=game.createEvent('spjiedao_after',null,trigger.getParent());
					next.player=player;
					next.target=trigger.player;
					next.num=num;
					next.setContent(function(){
						if(target.isAlive()) player.chooseToDiscard(num,true,'he');
					});
				},
			},
			biaozhao:{
				audio:2,
				intro:{
					content:"cards",
				},
				trigger:{
					player:"phaseJieshuBegin",
				},
				direct:true,
				filter:function (event,player){
					return player.countCards('he')>0&&!player.storage.biaozhao;
				},
				content:function (){
					'step 0'
					player.chooseCard('he',get.prompt2('biaozhao')).ai=function(card){
						return 6-get.value(card);
					}
					'step 1'
					if(result.bool){
						player.addSkill('biaozhao2');
						player.addSkill('biaozhao3');
						player.logSkill('biaozhao');
						player.lose(result.cards,ui.special,'toStorage','visible');
						player.$give(result.cards,player,false);
						player.storage.biaozhao=result.cards;
						player.markSkill('biaozhao');
					}
				},
				ai:{
					notemp:true,
				},
			},
			"biaozhao2":{
				trigger:{
					global:["loseAfter","cardsDiscardAfter"],
				},
				charlotte:true,
				forced:true,
				audio:"biaozhao",
				filter:function (event,player){
					if(!player.storage.biaozhao) return false;
					var suit=get.suit(player.storage.biaozhao[0]);
					var num=get.number(player.storage.biaozhao[0]);
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i],true)=='d'&&get.suit(event.cards[i])==suit
						&&get.number(event.cards[i])==num) return true;
					}
					return false;
				},
				content:function (){
					"step 0"
					var card=player.storage.biaozhao[0];
					delete player.storage.biaozhao;
					if(trigger.getParent().name=='discard'){
						trigger.player.gain(card,'fromStorage');
						player.$give(card,trigger.player);
					}
					else{
						player.$throw(card);
						game.cardsDiscard(card);
					}
					"step 1"
					player.unmarkSkill('biaozhao');
					player.loseHp();
				},
			},
			"biaozhao3":{
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				forced:true,
				charlotte:true,
				audio:"biaozhao",
				filter:function (event,player){
					return player.storage.biaozhao!=undefined;
				},
				content:function (){
					"step 0"
					var card=player.storage.biaozhao[0];
					delete player.storage.biaozhao;
					player.unmarkSkill('biaozhao');
					game.cardsDiscard(card);
					event.num=0;
					game.countPlayer(function(current){
						if(current.countCards('h')>event.num) event.num=current.countCards('h');
					});
					player.chooseTarget('是否令一名角色将手牌摸至'+event.num+'张并回复1点体力？').ai=function(target){
						var num=Math.min(event.num-target.countCards('h'),5);
						if(target.isDamaged()) num++;
						return num*get.attitude(_status.event.player,target);
					};
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						var draw=Math.min(num-target.countCards('h'),5);
						if(draw) target.draw(draw);
						target.recover();
					}
				},
			},
			yechou:{
				audio:2,
				trigger:{
					player:"die",
				},
				direct:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'wood',
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt2('yechou'),function(card,player,target){
						return player!=target&&target.getDamagedHp()>1
					}).set('forceDie',true).set('ai',function(target){
						var num=get.attitude(_status.event.player,target);
						return -num;
					});
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('yechou',target);
						player.line(target,'green');
						target.addTempSkill('yechou2',{player:'phaseZhunbeiBegin'});
					}
				},
				ai:{
					expose:0.5,
				},
			},
			"yechou2":{
				mark:true,
				marktext:"仇",
				intro:{
					content:"每个回合结束时失去1点体力直到回合开始",
				},
				trigger:{
					global:"phaseAfter",
				},
				forced:true,
				content:function (){player.loseHp()},
			},
			yanjiao:{
				audio:2,
				ai:{
					order:10,
					result:{
						player:1,
						target:1.1,
					},
				},
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return target!=player;
				},
				content:function (){
					"step 0"
					var num=4;
					if(player.storage.xingshen){
						num+=player.storage.xingshen;
						player.storage.xingshen=0;
						player.unmarkSkill('xingshen');
					}
					if(player.storage.olxingshen){
						num+=player.storage.olxingshen;
						player.storage.olxingshen=0;
						player.unmarkSkill('olxingshen');
					}
					event.cards=get.cards(num);
					player.showCards(event.cards);
					"step 1"
					event.getedResult=lib.skill.yanjiao.getResult(cards);
					if(!event.getedResult.length){
						game.cardsDiscard(cards);
						player.addTempSkill('yanjiao2');
						event.finish();
					}
					"step 2"
					target.chooseControl("自动分配","手动分配").set("prompt","【严教】：是否让系统自动分配方案？").ai=function(){
						return 0;
					};
					"step 3"
					if(result.control=="手动分配"){
						event.map=[cards,[],[]];
						_status.noclearcountdown=true;
						event.goto(8);
					}
					else if(!_status.connectMode){
						var choiceList=ui.create.dialog('请选择一种方案','hidden','forcebutton');
						for(var i=0;i<event.getedResult.length;i++){
							var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">方案'+get.cnNumber(i+1,true);
							str+='<br>第一组：';
							var current=event.getedResult[i];
							str+=get.translation(current[0]);
							str+='<br>第二组：';
							str+=get.translation(current[1]);
							if(current[2].length){
								str+='<br>剩余：';
								str+=get.translation(current[2]);
							}
							str+='</div>';
							var next=choiceList.add(str);
							next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							next.firstChild.link=i;
							for(var j in lib.element.button){
								next[j]=lib.element.button[j];
							}
							choiceList.buttons.add(next.firstChild);
						}
						event.choiceList=choiceList;
						target.chooseButton(choiceList,true,function(button){
						return true;
						});
					}
					"step 4"
					if(result.bool&&result.links) event.index=result.links[0];
					else event.index=0;
					event.togain=event.getedResult[event.index];
					target.showCards(event.togain[0],get.translation(target)+'分出的第一份牌');
					"step 5"
					target.showCards(event.togain[1],get.translation(target)+'分出的第二份牌');
					"step 6"
					target.chooseControl().set('choiceList',[
						'获得'+get.translation(event.togain[0]),
						'获得'+get.translation(event.togain[1])
					]).ai=function(){return Math.random()<0.5?1:0};
					"step 7"
					target.gain(event.togain[result.index],'gain2');
					player.gain(event.togain[1-result.index],'gain2');
					if(event.togain[2].length){
						game.cardsDiscard(event.togain[2]);
						if(event.togain[2].length>1) player.addTempSkill('yanjiao2');
					}
					event.finish();
					"step 8"
					event.videoId=lib.status.videoId++;
					var dialogx=['严教：选择要移动的牌'];
					var name=["未分配","第一组","第二组"];
					for(var i=0;i<event.map.length;i++){
						if(event.map[i].length>0){
							dialogx.push('<div class="text center">'+name[i]+'</div>');
							dialogx.push(event.map[i])
						}
					}
					if(target.isOnline2()){
						target.send(function(dialogx,id){
							ui.create.dialog.apply(null,dialogx).videoId=id;
						},dialogx,event.videoId);
					}
					event.dialog=ui.create.dialog.apply(null,dialogx);
					event.dialog.videoId=event.videoId;
					if(target!=game.me||_status.auto){
						event.dialog.style.display='none';
					}
					var next=target.chooseButton();
					next.set('selectButton',function(){
						if(!_status.event.map[1].length||!_status.event.map[2].length) return 1;
						var num1=0;
						for(var i=0;i<_status.event.map[1].length;i++){
							num1+=_status.event.map[1][i].number;
						}
						var num2=0;
						for(var j=0;j<_status.event.map[2].length;j++){
							num2+=_status.event.map[2][j].number;
						}
						return (num1==num2?[0,1]:1);
					});
					next.set('map',event.map);
					next.set('dialog',event.videoId);
					next.set('ai',function(){return -1});
					next.set('forceAuto',true);
					"step 9"
					if(result.bool){
						if(!result.links.length){
							if(target.isOnline2()){
								target.send('closeDialog',event.videoId);
							}
							event.dialog.close();
							delete _status.noclearcountdown;
							if(!_status.noclearcountdown){
								game.stopCountChoose();
							}
							event.togain=[event.map[1],event.map[2],event.map[0]];
							target.showCards(event.togain[0],get.translation(target)+'分出的第一份牌');
							event.goto(5);
						}
						else{
							event.card=result.links[0];
							var controls=["取消分组","移动到第一组","移动到第二组"];
							for(var i=0;i<event.map.length;i++){
								if(event.map[i].contains(event.card)){
									controls.splice(i,1);
									break;
								}
							}
							var func=function(card,id){
							var dialog=get.idDialog(id);
								if(dialog){
									for(var i=0;i<dialog.buttons.length;i++){
										if(dialog.buttons[i].link==card){
											dialog.buttons[i].classList.add('glow');
										}
										else{
											dialog.buttons[i].classList.add('unselectable');
										}
									}
								}
							}
							if(target.isOnline2()){
								target.send(func,event.card,event.videoId);
							}
							else if(target==game.me&&!_status.auto){
								func(event.card,event.videoId);
							}
							target.chooseControl(controls);
						}
					}
					else{
						if(target.isOnline2()){
							target.send('closeDialog',event.videoId);
						}
						event.dialog.close();
						delete _status.noclearcountdown;
						if(!_status.noclearcountdown){
							game.stopCountChoose();
						}
						game.cardsDiscard(cards);
						player.addTempSkill('yanjiao2');
						event.finish();
					}
					"step 10"
					if(target.isOnline2()){
						target.send('closeDialog',event.videoId);
					}
					event.dialog.close();
					var position={
						"取消分组":0,
						"移动到第一组":1,
						"移动到第二组":2,
					}[result.control||"取消分组"];
					for(var i=0;i<event.map.length;i++){
						if(event.map[i].contains(card)){
							event.map[i].remove(card);
							event.map[position].push(card);
							break;
						}
					}
					event.goto(8);
				},
				getResult:function (cards){
					var cl=cards.length;
					var maxmium=Math.pow(3,cl);
					var filter=function(list){
						if(!list[1].length||!list[0].length) return false;
						var num1=0;
						for(var i=0;i<list[1].length;i++){
							num1+=list[1][i].number;
						}
						var num2=0;
						for(var j=0;j<list[0].length;j++){
							num2+=list[0][j].number;
						}
						return num1==num2
					};
					var results=[];
					for(var i=0;i<maxmium;i++){
						var result=[[],[],[]];
						for(var j=0;j<cl;j++){
							result[Math.floor((i%Math.pow(3,j+1))/Math.pow(3,j))].push(cards[j]);
						}
						if(filter(result)) results.push(result);
					}
					var filterSame=function(list1,list2){
						if(list1[1].length==list2[0].length&&list1[0].length==list2[1].length){
							for(var i=0;i<list1[0].length;i++){
								if(!list2[1].contains(list1[0][i])) return false;
							}
							for(var i=0;i<list1[1].length;i++){
								if(!list2[0].contains(list1[1][i])) return false;
							}
							return true;
						}
						return false;
					}
					for(var i=0;i<results.length;i++){
						for(var j=i+1;j<results.length;j++){
							if(filterSame(results[i],results[j])) results.splice(j--,1);
						}
					}
					results.sort(function(a,b){
						return a[2].length-b[2].length;
					});
					return results;
				},
			},
			"yanjiao2":{
				marktext:"教",
				mark:true,
				intro:{
					content:"本回合手牌上限-1",
				},
				mod:{
					maxHandcard:function (player,num){
						return num-1;
					},
				},
			},
			xingshen:{
				audio:2,
				intro:{
					content:"下一次发动【严教】时多展示#张牌",
				},
				trigger:{
					player:"damageEnd",
				},
				frequent:true,
				content:function (){
					player.draw(player.isMinHandcard()?2:1);
					if(!player.storage.xingshen) player.storage.xingshen=0;
					player.storage.xingshen+=player.isMinHp()?2:1;
					if(player.storage.xingshen>4) player.storage.xingshen=4;
					player.markSkill('xingshen');
				},
			},
			pingjian:{
				audio:2,
				trigger:{
					player:['damageEnd','phaseJieshuBegin'],
				},
				initList:function(){
					var list=[];
					if(_status.connectMode) var list=get.charactersOL();
					else{
						var list=[];
						for(var i in lib.character){
							if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
							list.push(i);
						}
					}
					game.countPlayer2(function(current){
						list.remove(current.name);
						list.remove(current.name1);
						list.remove(current.name2);
						if(current.storage.rehuashen&&current.storage.rehuashen.character) list.removeArray(current.storage.rehuashen.character)
					});
					_status.characterlist=list;
				},
				frequent:true,
				content:function(){
					'step 0'
					if(!player.storage.pingjian) player.storage.pingjian=[];
					event._result={bool:true};
					'step 1'
					if(result.bool){
						if(!_status.characterlist){
							lib.skill.pingjian.initList();
						}
						var list=[];
						var skills=[];
						var map=[];
						_status.characterlist.randomSort();
						var name2=event.triggername;
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(name.indexOf('zuoci')!=-1||name.indexOf('xushao')!=-1) continue;
							var skills2=lib.character[name][3];
							for(var j=0;j<skills2.length;j++){
								if(player.storage.pingjian.contains(skills2[j])) continue;
								if(skills.contains(skills2[j])){
									list.add(name);
									if(!map[name]) map[name]=[];
									map[name].push(skills2[j]);
									skills.add(skills2[j]);
									continue;
								}
								var list2=[skills2[j]];
								game.expandSkills(list2);
								for(var k=0;k<list2.length;k++){
									var info=lib.skill[list2[k]];
									if(!info||!info.trigger||!info.trigger.player||info.silent||info.limited||info.juexingji||info.zhuanhuanji||info.hiddenSkill) continue;
									if(info.trigger.player==name2||Array.isArray(info.trigger.player)&&info.trigger.player.contains(name2)){
										if(info.init||info.ai&&(info.ai.combo||info.ai.notemp||info.ai.neg)) continue;
										if(info.filter){
											try{
												var bool=info.filter(trigger,player,name2);
												if(!bool) continue;
											}
											catch(e){
												continue;
											}
										}
										list.add(name);
										if(!map[name]) map[name]=[];
										map[name].push(skills2[j]);
										skills.add(skills2[j]);
										break;
									}
								}
							}
							if(list.length>2) break;
						}
						if(!skills.length){
							//player.draw();
							event.finish();
						}
						else{
							//skills.unshift('摸一张牌');
							player.chooseControl(skills).set('dialog',['请选择要发动的技能',[list,'character']]).set('ai',function(){return 0});
						}
					}
					else event.finish();
					'step 2'
					if(result.control=='摸一张牌'){
						player.draw();
						return;
					}
					player.storage.pingjian.add(result.control);
					player.addTempSkill(result.control,event.triggername=='damageEnd'?'damageAfter':'phaseJieshu');
				},
				group:'pingjian_use',
				phaseUse_special:['xinfu_lingren'],
			},
			pingjian_use:{
				audio:'pingjian',
				enable:'phaseUse',
				usable:1,
				position:'he',
				content:function(){
					'step 0'
					if(!player.storage.pingjian) player.storage.pingjian=[];
					event._result={bool:true};
					'step 1'
					if(result.bool){
						var list=[];
						var skills=[];
						var map=[];
						if(!_status.characterlist){
							lib.skill.pingjian.initList();
						}
						_status.characterlist.randomSort();
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(name.indexOf('zuoci')!=-1||name.indexOf('xushao')!=-1) continue;
							var skills2=lib.character[name][3];
							for(var j=0;j<skills2.length;j++){
								if(player.storage.pingjian.contains(skills2[j])) continue;
								if(skills.contains(skills2[j])||lib.skill.pingjian.phaseUse_special.contains(skills2[j])){
									list.add(name);
									if(!map[name]) map[name]=[];
									map[name].push(skills2[j]);
									skills.add(skills2[j]);
									continue;
								}
								var list2=[skills2[j]];
								game.expandSkills(list2);
								for(var k=0;k<list2.length;k++){
									var info=lib.skill[list2[k]];
									if(!info||!info.enable||info.viewAs||info.limited||info.juexingji||info.zhuanhuanji||info.hiddenSkill) continue;
									if(info.enable=='phaseUse'||Array.isArray(info.enable)&&info.enable.contains('phaseUse')){
										if(info.init||info.onChooseToUse||info.ai&&(info.ai.combo||info.ai.notemp||info.ai.neg)) continue;
										if(info.filter){
											try{
												var bool=info.filter(event.getParent(2),player);
												if(!bool) continue;
											}
											catch(e){
												continue;
											}
										}
										list.add(name);
										if(!map[name]) map[name]=[];
										map[name].push(skills2[j]);
										skills.add(skills2[j]);
										break;
									}
								}
							}
							if(list.length>2) break;
						}
						if(!skills.length){
							//player.draw();
							event.finish();
						}
						else{
							//skills.unshift('摸一张牌');
							player.chooseControl(skills).set('dialog',['请选择要发动的技能',[list,'character']]).set('ai',function(){return 0});
						}
					}
					else event.finish();
					'step 2'
					if(result.control=='摸一张牌'){
						player.draw();
						return;
					}
					player.storage.pingjian.add(result.control);
					player.addTempSkill(result.control,'phaseUseEnd');
					player.addTempSkill('pingjian_temp','phaseUseEnd');
					player.storage.pingjian_temp=result.control;
					//event.getParent(2).goto(0);
				},
				ai:{order:10,result:{player:1}},
			},
			pingjian_temp:{
				onremove:true,
				trigger:{player:['useSkillBegin','useCard1']},
				silent:true,
				firstDo:true,
				filter:function(event,player){
					var info=lib.skill[event.skill];
					if(!info) return false;
					if(event.skill==player.storage.pingjian_temp) return true;
					if(info.sourceSkill==player.storage.pingjian_temp||info.group==player.storage.pingjian_temp) return true;
					if(Array.isArray(info.group)&&info.group.contains(player.storage.pingjian_temp)) return true;
					return false;
				},
				content:function(){
					player.removeSkill(player.storage.pingjian_temp);
					player.removeSkill('pingjian_temp');
				},
			},
			//蒲元
			pytianjiang:{
				audio:2,
				trigger:{
					global:'gameDrawAfter',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				content:function(){
					'step 0'
					var i=0;
					var list=[];
					while(i++<2){
						var card=get.cardPile(function(card){
							if(get.type(card)!='equip') return false;
							return list.length==0||get.subtype(card)!=get.subtype(list[0]);
						});
						if(card) list.push(card);
					}
					if(!list.length){event.finish();return;}
					event.list=list;
					player.gain(event.list,'gain2');
					'step 1'
					game.delay(1);
					var card=event.list.shift();
					if(player.getCards('h').contains(card)){
						player.$give(card,player,false)
						player.equip(card);
					}
					if(event.list.length) event.redo();
				},
				group:'pytianjiang_move',
			},
			pytianjiang_move:{
				audio:'pytianjiang',
				prompt:'将装备区里的一张牌移动至其他角色的装备区',
				enable:'phaseUse',
				position:'e',
				filter:function(event,player){
					return player.countCards('e')>0;
				},
				check:function(){return 1},
				filterCard:true,
				filterTarget:function(event,player,target){
					return target!=player&&target.canEquip(ui.selected.cards[0],true);
				},
				prepare:'give',
				discard:false,
				lose:false,
				content:function(){
					target.equip(cards[0]);
					if(cards[0].name.indexOf('pyzhuren_')==0) player.draw(2);
				},
				ai:{
					order:11,
					expose:0.2,
					result:{
						target:function(player,target){
							if(ui.selected.cards.length){
								var card=ui.selected.cards[0];
								if(target.getEquip(card)||target.countCards('h',{subtype:get.subtype(card)})) return 0;
								return get.effect(target,card,player,target);
							}
							return 0;
						},
					},
				},
			},
			pyzhuren:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				selectCard:1,
				check:function(card){
					var player=_status.event.player;
					var name='pyzhuren_'+(card[card.name=='shandian'?'name':'suit']);
					if(!lib.card[name]||_status.pyzhuren&&_status.pyzhuren[name]){
						if(!player.countCards('h','sha')) return 4-get.value(card);
						return 0;
					}
					return 7-get.value(card);
				},
				content:function(){
					player.addSkill('pyzhuren_destroy');
					if(!_status.pyzhuren) _status.pyzhuren={};
					var rand=0.85;
					var num=get.number(cards[0]);
					if(num>4) rand=0.9;
					if(num>8) rand=0.95;
					if(num>12||cards[0].name=='shandian'||get.isLuckyStar(player)) rand=1;
					var name='pyzhuren_'+(cards[0][cards[0].name=='shandian'?'name':'suit']);
					if(!lib.card[name]||_status.pyzhuren[name]||Math.random()>rand){
						player.popup('杯具');
						game.log(player,'锻造失败');
						var card=get.cardPile(function(card){
							return card.name=='sha';
						});
						if(card) player.gain(card,'gain2');
					}
					else{
						_status.pyzhuren[name]=true;
						player.gain(game.createCard(name,cards[0].name=='shandian'?'spade':cards[0].suit,1),'gain2')
					}
				},
				ai:{
					order:10,
					result:{
						player:1,
					},
				},
			},
			pyzhuren_destroy:{
				trigger:{global:['loseEnd','cardsDiscardEnd']},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					var cs=event.cards;
					for(var i=0;i<cs.length;i++){
						if(cs[i].name.indexOf('pyzhuren_')==0&&get.position(cs[i],true)=='d') return true;
					}
					return false;
				},
				forceDie:true,
				content:function(){
					if(!_status.pyzhuren) _status.pyzhuren={};
					var list=[];
					var cs=trigger.cards;
					for(var i=0;i<cs.length;i++){
						if(cs[i].name.indexOf('pyzhuren_')==0&&get.position(cs[i],true)=='d'){
							_status.pyzhuren[cs[i].name]=false;
							list.push(cs[i]);
						}
					}
					game.log(list,'已被移出游戏');
					game.cardsGotoSpecial(list);
				},
			},
			pyzhuren_heart:{
				audio:true,
				trigger:{source:'damageSource'},
				usable:1,
				equipSkill:true,
				filter:function(event,player){
					return event.getParent().name=='sha';
				},
				check:function(event,player){
					return player.isDamaged();
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						var player=_status.event.getParent('pyzhuren_heart').player;
						if(player.isHealthy()&&get.color(card)=='red') return 0;
						return 2;
					});
					'step 1'
					if(result.color=='red') player.recover();
					else player.draw(2);
				},
			},
			pyzhuren_diamond:{
				audio:true,
				trigger:{source:'damageBegin1'},
				direct:true,
				usable:2,
				equipSkill:true,
				mod:{
					cardUsable:function(card,player,num){
						var cardx=player.getEquip('pyzhuren_diamond');
						if(card.name=='sha'&&(!cardx||player.hasSkill('pyzhuren_diamond',null,false)||(!_status.pyzhuren_diamond_temp&&!ui.selected.cards.contains(cardx)))){
							return num+1;
						}
					},
					cardEnabled2:function(card,player){
						if(!_status.event.addCount_extra||player.hasSkill('pyzhuren_diamond',null,false)) return;
						if(card&&card==player.getEquip('pyzhuren_diamond')){
							_status.pyzhuren_diamond_temp=true;
							var bool=lib.filter.cardUsable(get.autoViewAs({name:'sha'},ui.selected.cards.concat([card])),player);
							delete _status.pyzhuren_diamond_temp;
							if(!bool) return false;
						}
					},
				},
				filter:function(event,player){
					if(event.getParent().name!='sha') return false;
					return player.countCards('he',function(card){
						return card!=player.getEquip('pyzhuren_diamond');
					})>0;
				},
				content:function(){
					'step 0'
					var next=player.chooseToDiscard('he',function(card,player){
						return card!=player.getEquip('pyzhuren_diamond');
					},get.prompt(event.name,trigger.player),'弃置一张牌，令即将对其造成的伤害+1');
					next.ai=function(card){
						if(_status.event.goon) return 6-get.value(card);
						return -1;
					};
					next.set('goon',get.attitude(player,trigger.player)<0&&!trigger.player.hasSkillTag('filterDamage',null,{
						player:player,
						card:trigger.card,
					}));
					next.logSkill=[event.name,trigger.player];
					'step 1'
					if(result.bool) trigger.num++;
					else player.storage.counttrigger.pyzhuren_diamond--;
				},
				ai:{
					expose:0.25,
				},
			},
			pyzhuren_club:{
				audio:true,
				trigger:{player:'useCard2'},
				direct:true,
				equipSkill:true,
				usable:2,
				filter:function(event,player){
					if(event.card.name!='sha'&&get.type(event.card)!='trick') return false;
					var info=get.info(event.card);
					if(info.allowMultiple==false) return false;
					if(event.targets&&!info.multitarget){
						if(game.hasPlayer(function(current){
							return lib.filter.targetEnabled2(event.card,player,current)&&!event.targets.contains(current);
						})){
							return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					var prompt2='为'+get.translation(trigger.card)+'额外指定一个目标';
					player.chooseTarget([1,player.storage.fumian_red],get.prompt(event.name),function(card,player,target){
						var player=_status.event.player;
						if(_status.event.targets.contains(target)) return false;
						return lib.filter.targetEnabled2(_status.event.card,player,target);
					}).set('prompt2',prompt2).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return get.effect(target,trigger.card,player,player);
					}).set('targets',trigger.targets).set('card',trigger.card);
					'step 1'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else{
						player.storage.counttrigger[event.name]--;
						event.finish();
					}
					'step 2'
					if(event.targets){
						player.logSkill(event.name,event.targets);
						trigger.targets.addArray(event.targets);
					}
				},
			},
			pyzhuren_spade:{
				audio:true,
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.card.name=='sha';//&&event.targets.length==1&&get.color(event.card)=='black';
				},
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				logTarget:'target',
				content:function(){
					player.addTempSkill('pyzhuren_spade2');
					player.addMark('pyzhuren_spade2',1,false);
					//trigger.target.gain(trigger.cards.filterInD(),'gain2','log');
					trigger.target.loseHp(Math.min(player.countMark('pyzhuren_spade2'),5));//.set('source',player);
				},
				ai:{
					jueqing:true,
					unequip_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(tag=='unequip_ai'){
							if(arg&&arg.name=='sha'&&get.color(arg.card)=='black') return true;
							return false;
						}
					}
				},
			},
			pyzhuren_spade2:{onremove:true},
			pyzhuren_shandian:{
				audio:true,
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.card.name=='sha';//&&event.targets.length==1;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				logTarget:'target',
				content:function(){
					'step 0'
					trigger.target.judge(function(card){
						var suit=get.suit(card);
						if(suit=='spade') return -10;
						if(suit=='club') return -5;
						return 0;
					});
					'step 1'
					if(result.suit=='spade'){
						trigger.target.damage(3,'thunder');
						//trigger.getParent().excluded.add(trigger.target);
					}
					else if(result.suit=='club'){
						trigger.target.damage('thunder');
						player.recover();
						player.draw();
					}
				},
			},
			//上兵伐谋
			//伊籍在标包 不会移动
			songshu:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return !player.hasSkill('songshu_reflectionblue')&&player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&player.canCompare(target);
				},
				content:function(){
					'step 0'
					player.chooseToCompare(target).set('small',get.attitude(player,target)>0);
					'step 1'
					if(!result.bool){
						target.draw(2);
						player.addTempSkill('songshu_reflectionblue');
					}
				},
			},
			songshu_reflectionblue:{
			},
			sibian:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					'step 0'
					trigger.changeToZero();
					event.cards=get.cards(4);
					game.cardsGotoOrdering(event.cards);
					player.showCards(event.cards);
					'step 1'
					cards.sort(function(a,b){
						return b.number-a.number;
					});
					var gains=[];
					var mx=[cards[0].number,cards[3].number];
					for(var i=0;i<cards.length;i++){
						if(mx.contains(cards[i].number)) gains.addArray(cards.splice(i--,1));
					}
					player.gain(gains,'gain2');
					if(cards.length!=2||Math.abs(gains[0].number-gains[1].number)>=game.players.length) event._result={bool:false};
					else player.chooseTarget('是否令一名手牌数最少的角色获得'+get.translation(cards),function(card,player,target){
						return target.isMinHandcard();
					}).ai=function(target){
						return get.attitude(_status.event.player,target);
					}
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target);
						player.addExpose(0.2);
						target.gain(cards,'gain2');
					}
				},
			},
			lslixun:{
				audio:2,
				forced:true,
				trigger:{player:'damageBegin4'},
				marktext:'珠',
				intro:{
					name2:'珠',
					content:'共有#个“珠”',
				},
				content:function(){
					trigger.cancel();
					player.addMark('lslixun',trigger.num);
				},
				group:'lslixun_fate',
			},
			lslixun_fate:{
				audio:'lslixun',
				trigger:{player:'phaseUseBegin'},
				forced:true,
				filter:function(event,player){
					return player.countMark('lslixun')>0;
				},
				content:function(){
					'step 0'
					event.forceDie=true;
					_status.lslixun=player.countMark('lslixun');
					player.judge(function(card){
						if(get.number(card)<_status.lslixun) return -_status.lslixun;
						return 1;
					});
					'step 1'
					delete _status.lslixun;
					if(!result.bool){
						player.chooseToDiscard([1,player.countMark('lslixun')],'h').ai=lib.skill.qiangxi.check;
					}
					else event.finish();
					'step 2'
					var num=player.countMark('lslixun');
					if(result.cards&&result.cards.length) num-=result.cards.length;
					if(num) player.loseHp(num);
				},
			},
			lskuizhu:{
				audio:2,
				trigger:{player:'phaseUseEnd'},
				direct:true,
				filter:function(event,player){
					return player.isMaxHp(true)==false;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('lskuizhu'),function(card,player,target){
						return target!=player&&target.isMaxHp();
					}).ai=function(target){
						var player=_status.event.player;
						var ts=Math.min(5,target.countCards('h'));
						var delta=ts-player.countCards('h');
						if(delta<=0) return 0;
						if(get.attitude(player,target)<1) return false;
						return target.countCards('he',function(card){
							return lib.skill.zhiheng.check(card)>0;
						})>1?delta:0;
					};
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('lskuizhu',target);
						player.drawTo(Math.min(5,target.countCards('h')));
					}
					else event.finish();
					'step 2'
					if(!player.countCards('h')){
						event.finish();
						return;
					}
					target.viewHandcards(player);
					'step 3'
					if(!target.countCards('h')){
						event.finish();
						return;
					}
					target.chooseToDiscard(true,'h',[1,player.countCards('h')],'弃置至多'+get.cnNumber(player.countCards('h'))+'张手牌，并获得'+get.translation(player)+'等量的手牌').ai=function(card){
						if(ui.selected.cards.length>1) return -1;
						return lib.skill.zhiheng.check.apply(this,arguments)
					};
					'step 4'
					if(result.bool&&result.cards&&result.cards.length&&player.countGainableCards(target,'h')>0){
						target.gainPlayerCard(player,'h',true,result.cards.length).visible=true;
					}
					'step 5'
					if(result.bool&&result.cards&&result.cards.length>1){
						var bool=player.storage.lslixun>0!==true;
						player.chooseTarget(bool,'令'+get.translation(target)+'对其攻击范围内的一名角色造成1点伤害'+(bool?'':'，或点「取消」移去一个“珠”'),function(card,player,target){
							var source=_status.event.source;
							return target!=source&&source.inRange(target);
						}).set('source',target).set('ai',function(target){
							return get.damageEffect(target,_status.event.source,_status.event.player);
						});
					}
					else event.finish();
					'step 6'
					if(result.bool&&result.targets&&result.targets.length){
						player.line(result.targets[0]);
						result.targets[0].damage(target);
					}
					else{
						player.removeMark('lslixun',1);
					}
				},
				ai:{
					expose:0.25,
				},
			},
			xpchijie:{
				audio:2,
				trigger:{
					player:'damageEnd',
				},
				filter:function(event,player){
					if(player.hasSkill('xpchijie4')||!event.card) return false;
					var evt=event.getParent('useCard');
					return evt.card==event.card&&evt.player!=player;
				},
				check:function(event,player){
					var evt=event.getParent('useCard');
					var targets=evt.targets.slice(evt.num+1);
					var num=0;
					for(var i=0;i<targets.length;i++){
						num+=get.effect(targets[i],evt.card,evt.player,player);
					}
					return num<-1;
				},
				content:function(){
					player.addTempSkill('xpchijie4');
					var evt=trigger.getParent('useCard');
					evt.excluded.addArray(evt.targets);
				},
				group:'xpchijie2',
			},
			xpchijie2:{
				trigger:{global:'useCardAfter'},
				audio:'xpchijie',
				filter:function(event,player){
					return event.player!=player&&event.targets.contains(player)&&!player.hasSkill('xpchijie4')&&event.cards.filterInD().length>0&&!game.hasPlayer2(function(current){
						return current.getHistory('damage',function(evt){
							return evt.card==event.card;
						}).length>0;
					});
				},
				check:function(event,player){
					return get.value(event.cards.filterInD(),player,'raw')>0;
				},
				content:function(){
					player.addTempSkill('xpchijie4');
					player.gain(trigger.cards.filterInD(),'log','gain2');
				},
			},
			xpchijie4:{},
			yinju:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				filterTarget:lib.filter.notMe,
				skillAnimation:true,
				animationColor:'water',
				content:function(){
					player.awakenSkill('yinju');
					player.storage.yinju2=target;
					player.addTempSkill('yinju2');
				},
			},
			yinju2:{
				trigger:{
					player:'useCardToPlayered',
					source:'damageBefore',
				},
				forced:true,
				onremove:true,
				filter:function(event,player,name){
					if(name=='useCardToPlayered') return event.target==player.storage.yinju2;
					return event.player==player.storage.yinju2;
				},
				logTarget:function(event){
					return event[event.name=='damage'?'player':'target'];
				},
				content:function(){
					if(trigger.name=='damage'){
						trigger.cancel();
						trigger.player.recover(trigger.num);
					}
					else player.draw();
				},
			},
			//管辂和葛玄
			gxlianhua:{
				derivation:['reyingzi','reguanxing','zhiyan','gongxin'],
				audio:2,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]={
						red:0,black:0,
					}
				},
				marktext:'丹',
				intro:{
					name:'丹血',
					markcount:function(storage){
						return storage.red+storage.black;
					},
					content:function(storage){
						return '共有'+(storage.red+storage.black)+'个标记';
					},
				},
				trigger:{global:'damageEnd'},
				forced:true,
				filter:function(event,player){
					return event.player!=player&&event.player.isAlive()&&_status.currentPhase!=player;
				},
				content:function(){
					player.storage.gxlianhua[player.getFriends().contains(trigger.player)?'red':'black']++;
					player.markSkill('gxlianhua');
				},
				group:'gxlianhua_harmonia',
				subSkill:{
					harmonia:{
						forced:true,
						audio:'gxlianhua',
						sub:true,
						trigger:{player:'phaseZhunbeiBegin'},
						//filter:function(event,player){
						//	return player.storage.gxlianhua&&player.storage.gxlianhua.red+player.storage.gxlianhua.black>0;
						//},
						forced:true,
						content:function(){
							var cards=[];
							var cards2=[];
							var skill='';
							var red=player.storage.gxlianhua.red;
							var black=player.storage.gxlianhua.black;
							player.storage.gxlianhua={red:0,black:0};
							player.unmarkSkill('gxlianhua');
							if(red+black<4){
								cards=['tao'];
								skill='reyingzi';
							}
							else if(red>black){
								cards=['wuzhong'];
								skill='reguanxing';
							}
							else if(red<black){
								cards=['shunshou'];
								skill='zhiyan';
							}
							else{
								cards=['sha','juedou'];
								skill='gongxin';
							}
							for(var i=0;i<cards.length;i++){
								var card=get.cardPile(function(shiona){
									return shiona.name==cards[i];
								});
								if(card) cards2.push(card);
							}
							player.addTempSkill(skill);
							if(cards2.length) player.gain(cards2,'gain2','log');
						},
					},
				},
			},
			zhafu:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'wood',
				filterTarget:lib.filter.notMe,
				content:function(){
					player.awakenSkill('zhafu');
					target.addSkill('zhafu_hf');
					target.storage.zhafu_hf=player;
				},
				subSkill:{
					hf:{
						trigger:{
							player:'phaseDiscardBegin'
						},
						forced:true,
						popup:false,
						charlotte:true,
						onremove:true,
						content:function(){
							'step 0'
							if(player.countCards('h')<=1||player.storage.zhafu_hf.isDead()) event.finish();
							'step 1'
							player.storage.zhafu_hf.logSkill('zhafu_hf',player);
							player.chooseCard('h',true,'选择保留一张手牌，将其余的手牌交给'+get.translation(player.storage.zhafu_hf)).ai=get.value;
							'step 2'
							var cards=player.getCards('h');
							cards.remove(result.cards[0]);
							player.storage.zhafu_hf.gain(cards,player,'giveAuto');
							'step 3'
							player.removeSkill('zhafu_hf');
						},
					},
				},
			},
			
			tuiyan:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				frequent:true,
				content:function(){
					'step 0'
					var cards=get.cards(2);
					event.cards=cards;
					game.log(player,'观看了牌堆顶的'+get.cnNumber(cards.length)+'张牌');
					player.chooseControl('ok').set('dialog',['推演',cards]);
					'step 1'
					while(cards.length){
						ui.cardPile.insertBefore(cards.pop(),ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
				},
			},
			busuan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<lib.inpile.length;i++){
						var name=lib.inpile[i];
						var type=get.type(name,'trick');
						if(['basic','trick'].contains(type)) list.push([type,'',name]);
					}
					player.chooseButton(['选择至多两种牌',[list,'vcard']],true,[1,2]).set('ai',function(button){
						var target=_status.event.getParent().target;
						var card={name:button.link[2]};
						if(get.type(card)=='basic'||!target.hasUseTarget(card)) return false;
						return get.attitude(_status.event.player,target)*(target.getUseValue(card)-0.1);
					});
					'step 1'
					target.storage.busuan_angelbeats=result.links.slice(0);
					target.addSkill('busuan_angelbeats');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var att=get.attitude(player,target);
							if(att>0) return 1
							return -5/(target.countCards('h')+1);
						},
					},
				},
			},
			busuan_angelbeats:{
				mark:true,
				intro:{
					mark:function(dialog,content,player){
						if(content&&content.length) dialog.add([content,'vcard']);
					},
				},
				trigger:{player:'drawBefore'},
				forced:true,
				filter:function(event,player){
					return event.getParent().name=='phaseDraw';
				},
				onremove:true,
				content:function(){
					'step 0'
					var list=player.storage['busuan_angelbeats'];
					var cards=[];
					for(var i=0;i<Math.min(trigger.num,list.length);i++){
						var card=get.cardPile(function(cardx){
							return !cards.contains(cardx)&&cardx.name==list[Math.min(i,list.length-1)][2];
						});
						if(card){
							player.storage.busuan_angelbeats.splice(i--,1);
							trigger.num--;
							cards.push(card);
						}
					}
					if(cards.length){
						player.gain(cards,'gain2','log');
					}
					'step 1'
					if(!trigger.num) trigger.cancel();
					if(!player.storage.busuan_angelbeats.length) player.removeSkill('busuan_angelbeats');
				},
			},
			mingjie:{
				audio:1,
				trigger:{player:'phaseJieshuBegin'},
				check:function(){
					return ui.cardPile.hasChildNodes()&&get.color(ui.cardPile.firstChild)!='black';
				},
				content:function(){
					'step 0'
					event.count=0;
					'step 1'
					player.draw('visible');
					event.count++;
					'step 2'
					if(Array.isArray(result)){
						if(get.color(result[0])=='black'){
							player.loseHp();
							event.finish();
						}
						else if(event.count<3) player.chooseBool('是否继续发动【命戒】？').ai=function(){
							if(event.count==2) return Math.random()<0.5;
							return lib.skill.mingjie.check();
						};
					}
					else event.finish();
					'step 3'
					if(result.bool) event.goto(1);
				},
			},
			spwenji:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('he');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('spwenji'),function(card,player,target){
						return target!=player&&target.countCards('he');
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>0) return Math.sqrt(att)/10;
						return 5-att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('spwenji',target);
						target.chooseCard('he',true,'问计：将一张牌交给'+get.translation(player));
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.addTempSkill('spwenji_respond');
						player.storage.spwenji_respond=result.cards[0].name;
						event.target.give(result.cards,player,true);
					}
				},
				subSkill:{
					respond:{
						onremove:true,
						trigger:{player:'useCard'},
						forced:true,
						charlotte:true,
						audio:'spwenji',
						filter:function(event,player){
							return event.card.name==player.storage.spwenji_respond;
						},
						content:function(){
							trigger.directHit.addArray(game.filterPlayer(function(current){
								return current!=player;
							}));
						},
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								return arg.card.name==player.storage.spwenji_respond;
							},
						},
					}
				}
			},
			sptunjiang:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				filter:function(event,player){
					if(player.getHistory('skipped').contains('phaseUse')) return false;
					return player.getHistory('useCard',function(evt){
						if(evt.targets&&evt.targets.length&&evt.isPhaseUsing()){
							var targets=evt.targets.slice(0);
							while(targets.contains(player)) targets.remove(player);
							return targets.length>0;
						}
						return false;
					}).length==0;
				},
				content:function(){
					player.draw(game.countGroup());
				},
			},
			bingzhao:{
				audio:2,
				unique:true,
				zhuSkill:true,
				forced:true,
				intro:{
					content:function(group){
						return '已选择了'+get.translation(group)+'势力'
					},
				},
				trigger:{global:['gameDrawAfter','zhuUpdate']},
				filter:function(event,player){
					return !player.storage.bingzhao&&player.hasZhuSkill('bingzhao');
				},
				content:function(){
					'step 0'
					var list=lib.group.filter(function(group){
						return ['wei','shu','wu','qun'].contains(group)||game.hasPlayer(function(current){
							return current.group==group;
						})
					});
					player.chooseControl(list).set('prompt','秉诏：请选择一个势力').set('ai',function(){
						var listx=list.slice(0);
						listx.sort(function(a,b){
							return game.countPlayer(function(current){
								return current!=player&&current.group==b;
							})-game.countPlayer(function(current){
								return current!=player&&current.group==a;
							});
						})
						return listx[0];
					});
					'step 1'
					var group=result.control;
					player.popup(get.translation(group)+'势力',get.groupnature(group,'raw'));
					game.log(player,'选择了','#y'+get.translation(group)+'势力');
					player.storage.bingzhao=group;
					player.markSkill('bingzhao');
				},
			},
			baijia:{
				audio:2,
				audioname:['tw_beimihu'],
				unique:true,
				derivation:'bmcanshi',
				juexingji:true,
				ai:{
					combo:'guju'
				},
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.hasSkill('guju')&&player.storage.guju>=7;
				},
				content:function(){
					player.awakenSkill('baijia');
					player.gainMaxHp();
					player.recover();
					var list=game.filterPlayer();
					for(var i=0;i<list.length;i++){
						if(list[i]!=player&&!list[i].hasMark('zongkui_mark')){
							list[i].addMark('zongkui_mark',1);
							player.line(list[i],'green');
						}
					}
					player.removeSkill('guju');
					player.addSkill('bmcanshi');
				}
			},
			bmcanshi:{
				audio:2,
				audioname:['tw_beimihu'],
				group:['bmcanshi_add','bmcanshi_remove'],
				subSkill:{
					add:{
						audio:'bmcanshi',
						trigger:{player:'useCard2'},
						filter:function(event,player){
							if(!event.targets||event.targets.length!=1) return false;
							var info=get.info(event.card);
							if(info.multitarget) return false;
							if(info.allowMultiple==false) return false;
							if(info.type=='equip') return false;
							if(info.type=='delay') return false;
							return game.hasPlayer(function(current){
								if(!current.hasMark('zongkui_mark')) return false;
								return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current);
							});
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt2('bmcanshi'),[1,Infinity],function(card,player,target){
								if(!target.hasMark('zongkui_mark')) return false;
								var trigger=_status.event.getTrigger();
								return !trigger.targets.contains(target)&&lib.filter.targetEnabled2(trigger.card,player,target);
							}).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,_status.event.getTrigger().card,player,player);
							});
							'step 1'
							if(result.bool){
								if(!event.isMine()&&!event.isOnline()) game.delayx();
								event.targets=result.targets.slice(0);
								for(var i=0;i<event.targets.length;i++){
									event.targets[i].removeMark('zongkui_mark',1);
								}
							}
							else{
								event.finish();
							}
							'step 2'
							player.logSkill('bmcanshi',event.targets);
							trigger.targets.addArray(event.targets);
						}
					},
					remove:{
						audio:'bmcanshi',
						trigger:{
							target:'useCardToTarget',
						},
						check:function(event,player){
							return get.attitude(event.player,player)<0&&get.effect(player,event.card,event.player,player)<0;
						},
						logTarget:'player',
						filter:function(event,player){
							if(!['basic','trick'].contains(get.type(event.card))) return false;
							if(!event.targets||event.targets.length!=1) return false;
							return event.player.hasMark('zongkui_mark');
						},
						content:function(){
							trigger.targets.remove(player);
							trigger.getParent().triggeredTargets2.remove(player);
							game.delay();
							trigger.player.removeMark('zongkui_mark');
						}
					}
				}
			},
			guju:{
				audio:2,
				audioname:['tw_beimihu'],
				init:function(player){
					if(!player.storage.guju) player.storage.guju=0;
				},
				intro:{
					content:'已因此技能获得#张牌'
				},
				trigger:{global:'damageEnd'},
				forced:true,
				filter:function(event,player){
					return event.player!=player&&event.player.isAlive()&&event.player.hasMark('zongkui_mark');
				},
				content:function(){
					'step 0'
					player.draw();
					player.storage.guju++;
					player.markSkill('guju');
					'step 1'
					if(player.hasZhuSkill('bingzhao',trigger.player)&&trigger.player.group==player.storage.bingzhao&&trigger.player.isAlive()){
						trigger.player.chooseBool('是否对'+get.translation(player)+'发动【秉诏】？').ai=function(){
							return get.attitude(trigger.player,player)>1;
						};
					}
					else event.finish();
					'step 2'
					if(result.bool){
						trigger.player.logSkill('bingzhao',player);
						player.draw();
						player.storage.guju++;
						player.markSkill('guju');
					}
				},
				ai:{
					combo:'zongkui'
				}
			},
			zongkui:{
				trigger:{player:'phaseBefore',global:'roundStart'},
				direct:true,
				audio:2,
				audioname:['tw_beimihu'],
				filter:function(event,player,name){
					return game.hasPlayer(function(current){
						if(name=='roundStart'&&!current.isMinHp()) return false;
						return current!=player&&!current.hasMark('zongkui_mark');
					});
				},
				content:function(){
					'step 0'
					var targets=game.filterPlayer(function(current){
						if(event.triggername=='roundStart'&&!current.isMinHp()) return false;
						return current!=player&&!current.hasMark('zongkui_mark');
					});
					if(event.triggername=='roundStart'&&targets.length==1){
						event._result={bool:true,targets:targets};
					}
					else{
						var next=player.chooseTarget(get.prompt('zongkui'),'令一名'+(event.triggername=='roundStart'?'体力值最小的':'')+'其他角色获得“傀”标记',function(card,player,target){
							if(_status.event.round&&!target.isMinHp()) return false;
							return target!=player&&!target.hasMark('zongkui_mark');
						}).set('ai',function(target){
							var num=target.isMinHp()?0.5:1;
							return num*get.threaten(target);
						}).set('round',event.triggername=='roundStart');
						if(event.triggername=='roundStart') next.set('forced',true);
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zongkui',target);
						target.addMark('zongkui_mark',1);
					}
				},
				subSkill:{
					mark:{
						marktext:'傀',
						intro:{
							name2:'傀',
							content:'mark'
						}
					}
				},
				ai:{
					combo:'guju',
					threaten:1.4
				}
			},
			"xinfu_langxi":{
				audio:2,
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.hp<=player.hp;
					});
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('xinfu_langxi'),'对一名体力值不大于你的其他角色造成0-2点随机伤害',function(card,player,target){
						return target.hp<=player.hp&&target!=player;
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					"step 1"
					if(result.bool&&result.targets&&result.targets.length){
						player.logSkill('xinfu_langxi',result.targets);
						var num=[1,2,0].randomGet();
						if(get.isLuckyStar(player)) num=2;
						player.line(result.targets[0],'green');
						result.targets[0].damage(num);
					}
				},
				ai:{
					expose:0.25,
					threaten:1.7,
				},
			},
			"xinfu_yisuan":{
				usable:1,
				audio:2,
				trigger:{
					player:"useCardEnd",
				},
				check:function (event,player){
					return get.value(event.cards)+player.maxHp*2-18>0;
				},
				filter:function (event,player){
					return player.isPhaseUsing()&&get.type(event.card)=='trick'&&event.cards.filterInD().length>0;
				},
				content:function (){
					player.loseMaxHp();
					player.gain(trigger.cards.filterInD(),'gain2','log');
				},
			},
			"xinfu_xingluan":{
				usable:1,
				audio:2,
				trigger:{
					player:"useCardAfter",
				},
				filter:function (event,player){
					if(!player.isPhaseUsing()) return false;
					if(get.type(event.card)==undefined) return false;
					return (event.targets&&event.targets.length==1);
				},
				content:function (){
					var card=get.cardPile2(function(card){
						return card.number==6;
					});
					if(!card){
						player.chat('无牌可得了吗');
						game.log('但是牌堆里面已经没有点数为6的牌了！');
						event.finish();
						return;
					}
					player.gain(card,'gain2');
				},
			},
			"xinfu_lveming":{
				init:function (player){
					player.storage.xinfu_lveming=0;
				},
				mark:true,
				intro:{
					content:"已发动过#次",
				},
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return player!=target&&target.countCards('e')<player.countCards('e');
				},
				content:function (){
					"step 0"
					var list=[1,2,3,4,5,6,7,8,9,10,11,12,13]
					target.chooseControl(list).set('ai',function(){
						return list.randomGet();
					});
					"step 1"
					if(result.control){
						target.popup(result.control);
						player.storage.xinfu_lveming++;
						event.num=result.control;
					}
					else{
						target.popup('13');
						player.storage.xinfu_lveming++;
						event.num=13;
					};
					player.judge(function(card){
						if(card.number==event.num) return 4;
						return -1;
					});
					"step 2"
					if(result.bool==true){
						target.damage(2);
					}
					else{
						var card=target.getCards('hej').randomGet();
						player.gain(card,target,'giveAuto','bySelf');
					}
				},
				ai:{
					order:9,
					result:{
						target:function (player,target){
							var numj=target.countCards('j');
							var numhe=target.countCards('he');
							if(numhe==0) return numj>0?6:-6;
							return -6-(numj+1)/numhe;
						},
					},
					threaten:1.1,
				},
			},
			"xinfu_tunjun":{
				skillAnimation:true,
				animationColor:'metal',
				limited:true,
				unique:true,
				enable:"phaseUse",
				audio:2,
				filter:function (event,player){
					if(player.storage.xinfu_tunjun) return false;
					return player.storage.xinfu_lveming&&player.storage.xinfu_lveming>0;
				},
				filterTarget:true,
				selectTarget:1,
				content:function (){
					"step 0"
					player.awakenSkill('xinfu_tunjun');
					event.num=player.storage.xinfu_lveming;
					event.toequip=[];
					"step 1"
					var equip=get.cardPile(function(card){
						var bool1=true;
						for(var i=0;i<event.toequip.length;i++){
							if(get.type(card)=='equip'&&get.subtype(card)==get.subtype(event.toequip[i])) bool1=false;
						}
						return (get.type(card)=='equip'&&!event.toequip.contains(card)&&target.isEmpty(get.subtype(card))&&bool1);
					});
					if(equip) event.toequip.push(equip);
					else event.num=0;
					event.num--;
					"step 2"
					if(event.num>0) event.goto(1);
					"step 3"
					for (var i=0;i<event.toequip.length;i++){
						target.chooseUseTarget(event.toequip[i],true).set('animate',false).set('nopopup',true);
					}
				},
				ai:{
					order:1,
					result:{
						target:0,
					},
				},
				mark:true,
				intro:{
					content:"limited",
				},
				init:function (player){
					player.storage.xinfu_tunjun=false;
				},
			},
			"xinfu_tanbei":{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return player!=target;
				},
				content:function (){
					"step 0"
					if(target.countCards('hej')==0){
						event._result={index:1};
					}
					else{
						target.chooseControl().set('choiceList',[
				'令'+get.translation(player)+'随机获得你区域内的一张牌，然后其本回合内不能再对你使用牌。',
				'令'+get.translation(player)+'本回合内对你使用牌没有次数与距离限制。',
						]).set('ai',function(){
							var list=[0,1];
							return list.randomGet();
						});
					}
					"step 1"
					player.addTempSkill('tanbei_effect3');
					if(result.index==0){
						var card=target.getCards('hej').randomGet();
						player.gain(card,target,'giveAuto','bySelf');
						target.addTempSkill('tanbei_effect2');
					}
					else{
						target.addTempSkill('tanbei_effect1');
					}
				},
				ai:{
					order:function (){
						return [2,4,6,8,10].randomGet();
					},
					result:{
						target:function (player,target){
							return -2-target.countCards('h');
						},
					},
					threaten:1.1,
				},
			},
			tanbei_effect3:{
				charlotte:true,
				mod:{
					targetInRange:function(card,player,target){
						if(target.hasSkill('tanbei_effect1')){
							return true;
						}
					},
					cardUsableTarget:function(card,player,target){
						if(target.hasSkill('tanbei_effect1')) return true;
					},
					playerEnabled:function(card,player,target){
						if(target.hasSkill('tanbei_effect2')) return false;
					},
				},
			},
			"xinfu_sidao":{
				audio:2,
				trigger:{
					player:'useCardAfter',
				},
				filter:function(event,player){
					if(player.hasSkill('xinfu_sidaoy')||!player.countCards('hs')) return false;
					if(!event.targets||!event.targets.length||!event.isPhaseUsing(player)) return false;
					var history=player.getHistory('useCard');
					var index=history.indexOf(event)-1;
					if(index<0) return false;
					var evt=history[index];
					if(!evt||!evt.targets||!evt.targets.length||!evt.isPhaseUsing(player)) return false;
					for(var i=0;i<event.targets.length;i++){
						if(evt.targets.contains(event.targets[i])&&lib.filter.filterTarget({name:'shunshou'},player,event.targets[i])) return true;
					}
					return false;
				},
				direct:true,
				content:function(){
					var targets=player.getLastUsed(1).targets;
					var next=player.chooseToUse();
					next.set('targets',game.filterPlayer(function(current){
						return targets.contains(current)&&trigger.targets.contains(current);
					}));
					next.set('openskilldialog',get.prompt2('xinfu_sidao'));
					next.set('norestore',true);
					next.set('_backupevent','xinfu_sidaox');
					next.set('custom',{
						add:{},
						replace:{window:function(){}}
					});
					next.backup('xinfu_sidaox');
				},
			},
			xinfu_sidaox:{
				audio:'xinfu_sidao',
				filterCard:function(card){
					return get.itemtype(card)=='card';
				},
				position:"hs",
				viewAs:{
					name:"shunshou",
				},
				filterTarget:function (card,player,target){
					return _status.event.targets&&_status.event.targets.contains(target)&&lib.filter.filterTarget.apply(this,arguments);
				},
				prompt:"将一张手牌当顺手牵羊使用",
				check:function (card){return 7-get.value(card)},
				onuse:function(links,player){player.addTempSkill('xinfu_sidaoy')},
			},
			xinfu_sidaoy:{},
			"tanbei_effect1":{
				charlotte:true,
			},
			"tanbei_effect2":{
				charlotte:true,
			},
			"xinfu_tunan":{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return target!=player;
				},
				content:function (){
					'step 0'
					event.cards=get.cards(1);
					player.showCards(get.translation(player)+'对'+get.translation(target)+'发动了【图南】',event.cards);
					'step 1'
					var card=cards[0];
					var bool1=game.hasPlayer(function(current){
						return target.canUse(card,current,false);
					});
					var bool2=game.hasPlayer(function(current){
						return target.canUse({name:'sha'},current);
					});
					if(bool1&&bool2){
						target.chooseControl(function(){
							return 0;
						}).set('choiceList',[
							'使用'+get.translation(cards)+'。（没有距离限制）',
							'将'+get.translation(cards)+'当做【杀】使用。',
						]).set('ai',function(){
							return _status.event.choice;
						}).set('choice',target.getUseValue(card,false)>target.getUseValue({name:'sha',cards:cards})?0:1);
					}
					else if(bool1){
						event.directindex=0;
					}
					else if(bool2){
						event.directindex=1;
					}
					else{
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						event.finish();
					}
					'step 2'
					var card=cards[0];
					if(result&&typeof event.directindex!='number'){
						event.directindex=result.index;
					}
					if(event.directindex==1){
						target.chooseUseTarget({name:'sha'},cards,true,false).viewAs=true;
					}
					else{
						target.chooseUseTarget(card,true,false,'nodistance');
					}
				},
				ai:{
					order:7,
					result:{
						target:1,
					},
				},
			},
			"xinfu_bijing":{
				audio:2,
				group:["xinfu_bijing_lose","xinfu_bijing_discard"],
				subSkill:{
					lose:{
						trigger:{
							global:"phaseDiscardBegin",
						},
						audio:'xinfu_bijing',
						filter:function (event,player){
							if(event.player==player) return false;
							return player.getHistory('lose',function(evt){
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('xinfu_bijing')) return true;
								}
							}).length>0&&event.player.countCards('he')>0;
						},
						forced:true,
						logTarget:'player',
						content:function(){
							trigger.player.chooseToDiscard(2,true,'he');
						},
						sub:true,
					},
					discard:{
						trigger:{
							player:"phaseZhunbeiBegin",
						},
						forced:true,
						filter:function(event,player){
							return player.getCards('h',function(card){
								return card.hasGaintag('xinfu_bijing');
							}).length>0;
						},
						content:function (){
							player.discard(player.getCards('h',function(card){
								return card.hasGaintag('xinfu_bijing');
							}));
						},
						sub:true,
					},
				},
				trigger:{
					player:"phaseJieshuBegin",
				},
				direct:true,
				filter:function (player,event){
					return event.countCards('h')>0;
				},
				content:function (){
				'step 0'
					player.chooseCard(get.prompt2('xinfu_bijing'),'h').set('ai',function(card){
						if(card.name=='shan') return 6;
						return 6-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('xinfu_bijing');
						player.addGaintag(result.cards,'xinfu_bijing');
					}
				},
			},
			"xinfu_zhenxing":{
				audio:2,
				trigger:{
					player:["damageEnd","phaseJieshuBegin"],
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseControl('一张','两张','三张','cancel2').set('prompt',get.prompt2('xinfu_zhenxing')).set('',function(){return 0});
					'step 1'
					if(result.control=='cancel2') event.finish();
					else{
						player.logSkill('xinfu_zhenxing');
						event.num={一张:1,两张:2,三张:3}[result.control];
					};
					'step 2'
					event.cards=get.cards(num);
					player.chooseButton(['【镇行】：请选择要获得的牌',event.cards]).set('filterButton',function(button){
						var cards=_status.event.cards;
						for(var i=0;i<cards.length;i++){
							if(button.link!=cards[i]&&get.suit(cards[i])==get.suit(button.link)) return false;
						}
						return true;
					}).set('ai',function(button){
						return get.value(button.link);
					}).set('cards',event.cards);
					'step 3'
					var tothrow=[];
					for(var i=event.cards.length-1;i>=0;i--){
						if(result.bool&&result.links.contains(event.cards[i])){
							player.gain(event.cards[i],'gain2');
						}
						else{
							event.cards[i].fix();
							ui.cardPile.insertBefore(event.cards[i],ui.cardPile.childNodes[0]);
						}
					}
					game.updateRoundNumber();
				},
			},
			"xinfu_qianxin":{
				audio:2,
				group:["xinfu_qianxin2"],
				enable:"phaseUse",
				usable:1,
				onChooseToUse:function(event){
					if(!game.online){
						var num1=game.players.length-1;
						var player=event.player;
						var num2=ui.cardPile.childElementCount;
						var num3=num2;
						if(num1>num2) num3=0;
						else if(!player.storage.xinfu_qianxin){}
						else{
							for(var i=0;i<num2;i++){
								if(player.storage.xinfu_qianxin.contains(ui.cardPile.childNodes[i])){
									num3=0;break;
								}
							}
						}
						event.set('qianxinNum',num3);
					}
				},
				filter:function(event,player){
					return event.qianxinNum&&event.qianxinNum>0;
				},
				filterTarget:function(card,player,target){
					return target!=player;
				},
				filterCard:true,
				selectCard:function(){
					var num1=game.players.length-1;
					var num2=_status.event.qianxinNum;
					return [1,Math.floor(num2/num1)];
				},
				discard:false,
				check:function(){
					return -1;
				},
				delay:false,
				lose:false,
				prompt:function(){
					return '选择一名角色并将任意张手牌置于处理区，然后将这些牌放置于牌堆中'+get.cnNumber(game.players.length)+'倍数的位置（先选择的牌在上）';
				},
				content:function(){
					'step 0'
					player.lose(cards,ui.ordering).noOrdering=true;
					player.$throw(cards.length);
					player.storage.xinfu_qianxin=cards.slice(0);
					player.storage.xinfu_qianxin2=target;
					'step 1'
					event.cards.reverse();
					var num1=game.players.length;
					var num2=ui.cardPile.childElementCount;
					for(var i=0;i<event.cards.length;i++){
						event.cards[i].fix();
						var num3=num1*(i+1)-1;
						if(num3<num2){
							ui.cardPile.insertBefore(cards[i],ui.cardPile.childNodes[num3]);
						}
						else{
							ui.cardPile.appendChild(cards[i]);
						}
					}
					game.updateRoundNumber();
					game.log(player,'把',get.cnNumber(cards.length),'张牌放在了牌堆里');
					game.delayx();
				},
				ai:{
					order:1,
					result:{
						target:-1,
					},
				},
			},
			"xinfu_qianxin2":{
				subSkill:{
					dis:{
						mod:{
							maxHandcard:function (player,num){
								return num-2;
							},
						},
						sub:true,
					},
				},
				forced:true,
				locked:false,
				audio:'xinfu_qianxin',
				logTarget:'player',
				trigger:{
					global:"phaseDiscardBegin",
				},
				filter:function (event,player){
					if(player.storage.xinfu_qianxin2!=event.player) return false;
					if(!player.storage.xinfu_qianxin) return false;
					var hs=event.player.getCards('h');
					var cs=player.storage.xinfu_qianxin;
					var bool=false;
					var history=event.player.getHistory('gain')
					for(var i=0;i<history.length;i++){
						for(var j=0;j<history[i].cards.length;j++){
							var card=history[i].cards[j];
							if(hs.contains(card)&&cs.contains(card)) return true;
						}
					}
					return false;
				},
				content:function (){
					'step 0'
					delete player.storage.xinfu_qianxin2;
					if(player.countCards('h')>=4){
						event._result={index:1};
					}
					else{
						trigger.player.chooseControl().set('choiceList',[
							'令'+get.translation(player)+'将手牌摸至四张',
							'令自己本回合的手牌上限-2'
						]).set('ai',function(){
							var player=_status.event.player;
							var source=_status.event.getParent().player;
							if(get.attitude(player,source)>0) return 0;
							if(player.hp-player.countCards('h')>1) return 1;
							return [0,1].randomGet();
						})
					}
					'step 1'
					if(result.index==0){
						player.drawTo(4);
					}
					else{
						trigger.player.addTempSkill('xinfu_qianxin2_dis');
					}
				},
			},
			"xinfu_fuhai":{
				subSkill:{
					next:{},
					previous:{},
				},
				audio:2,
				group:["fuhai_clear"],
				intro:{
					content:"已指定过#个目标",
				},
				enable:"phaseUse",
				filter:function (event,player){
					if(player.hasSkill('xinfu_fuhai_next')&&player.hasSkill('xinfu_fuhai_previous')) return false;
					return player.countCards('h')>0;
				},
				filterTarget:function (card,player,target){
					if(![player.next,player.previous].contains(target)||target.countCards('h')==0) return false;
					if(player.hasSkill('xinfu_fuhai_next')) return target==player.previous;
					if(player.hasSkill('xinfu_fuhai_previous')) return target==player.next;
					return true;
				},
				line:false,
				content:function (){
					'step 0'
					event.side=target==player.next?'next':'previous';
					event.current=target;
					if(!player.storage.xinfu_fuhai) player.storage.xinfu_fuhai=1;
					player.addTempSkill('xinfu_fuhai_'+event.side,'phaseUseAfter');
					'step 1'
					if(player.countCards('h')==0||event.current.countCards('h')==0||event.current==player){
					event.finish();
					return;
					}
					var next=event.current[event.side];
					if(get.attitude(event.current,player)>0){
						if(get.attitude(next,target)<=0||next.countCards('h')==0||player.countCards('h')==1){
							event.stopm=true;
							event.stopt=true
						}
						else{
							event.stopm=false;
							event.stopt=false;
						}
					}
					else{
						if(get.attitude(next,target)>=0){
							event.stopt=true;
							event.stopm=false;
						}
						else{
							event.stopt=false;
							event.stopm=false;
						}
					}
					player.markSkill('xinfu_fuhai');
					player.line(event.current,'green');
					player.chooseCard('请选择要展示的牌',true).set('ai',function(card){
						if(_status.event.stop) return 14-get.number(card);
						return get.number(card)
					}).set('stop',event.stopm);
					'step 2'
					event.mes=result.cards[0];
					player.showCards(event.mes);
					'step 3'
					event.current.chooseCard('请选择要展示的牌',true).set('ai',function(card){
						if(_status.event.stop) return get.number(card);
						return 14-get.number(card);
					}).set('stop',event.stopt);
					'step 4'
					event.tes=result.cards[0];
					event.current.showCards(event.tes);
					'step 5'
					var num1=get.number(event.mes);
					var num2=get.number(event.tes);
					if(num1<num2){
						event.current.discard(event.tes);
						game.asyncDraw([player,event.current],player.storage.xinfu_fuhai);
						player.addTempSkill('xinfu_fuhai_next','phaseUseAfter');
						player.addTempSkill('xinfu_fuhai_previous','phaseUseAfter');
						player.unmarkSkill('xinfu_fuhai');
					}
					else{
						player.discard(event.mes);
						player.storage.xinfu_fuhai++;
						event.current=event.current[event.side];
						if(player.countCards('h')>0&&event.current.countCards('h')>0&&event.current!=player) event.goto(1);
					}
				},
				ai:{
					order:1,
					result:{
						player:function(player,target){
							var hs=player.countCards('h');
							var side=target==player.next?'next':'previous';
							var current=player;
							for(var i=0;i<hs;i++){
								current=current[side];
								if(current==player||!current.countCards('h')) return 0;
								if(get.attitude(current,player)>0) return 1;
							}
							return 0;
						},
					},
				},
			},
			"fuhai_clear":{
				trigger:{
					player:"phaseAfter",
				},
				forced:true,
				silent:true,
				popup:false,
				filter:function (event,player){
					return player.storage.xinfu_fuhai!=undefined;
				},
				content:function (){
					player.unmarkSkill('xinfu_fuhai');
					delete player.storage.xinfu_fuhai;
				},
			},
			"xz_xunxun":{
				filter:function (event,player){
					var num=game.countPlayer(function(current){
						return current.isDamaged();
					});
					return num>=1&&!player.hasSkill('xunxun');
				},
				audio:2,
				trigger:{
					player:"phaseDrawBegin1",
				},
				//priority:10,
				content:function (){
					"step 0"
					event.cards=get.cards(4);
					player.chooseCardButton(true,event.cards,2,'选择两张牌置于牌堆顶').set('ai',ai.get.buttonValue);
					"step 1"
					if(result.bool){
						var choice=[];
						for(var i=0;i<result.links.length;i++){
							choice.push(result.links[i]);
							cards.remove(result.links[i]);
						}
						for(var i=0;i<cards.length;i++){
							ui.cardPile.appendChild(cards[i]);
						}
						while(choice.length){
							ui.cardPile.insertBefore(choice.pop(),ui.cardPile.firstChild);
						}
					}
				},
			},
			"xinfu_xingzhao":{
				audio:true,
				group:["xz_xunxun","xinfu_xingzhao2"],
				mark:true,
				intro:{
					content:function (storage,player){
						var num=game.countPlayer(function(current){
							return current.isDamaged();
						})
						var str='暂无任何效果';
						if(num>=1){
							str='<li>视为拥有技能“恂恂”';
						}
						if(num>=2){
							str+='；使用装备牌时摸一张牌';
						}
						if(num>=3){
						str+='；始终跳过弃牌阶段';
						}
						return str;
					},
				},
				trigger:{
					player:"useCard",
				},
				forced:true,
				filter:function (event,player){
					if(get.type(event.card)!='equip') return false;
					var num=game.countPlayer(function(current){
						return current.isDamaged();
					});
					return num>=2;
				},
				content:function (){
					player.draw();
				},
			},
			"xinfu_xingzhao2":{
				audio:true,
				trigger:{
					player:"phaseDiscardBefore",
				},
				forced:true,
				filter:function (event,player){
					var num=game.countPlayer(function(current){
						return current.isDamaged();
					});
				return num>=3;
				},
				content:function (){
					trigger.cancel();
					game.log(player,'跳过了弃牌阶段');
				},
			},
			"xinfu_dianhu":{
				audio:2,
				trigger:{
					global:"gameDrawAfter",
					player:"enterGame",
				},
				forced:true,
				filter:function (){
					return game.players.length>1;
				},
				content:function (){
					'step 0'
					player.chooseTarget('选择【点虎】的目标',lib.translate.xinfu_dianhu_info,true,function(card,player,target){
						return target!=player&&!target.hasSkill('xinfu_dianhu2');
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att<0) return -att+3;
						return Math.random();
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						game.log(target,'成为了','【点虎】','的目标');
						target.storage.xinfu_dianhu2=player;
						target.addSkill('xinfu_dianhu2');
					}
				},
			},
			"xinfu_dianhu2":{
				mark:"character",
				intro:{
					content:"当你受到来自$的伤害或回复体力后，$摸一张牌",
				},
				nopop:true,
				trigger:{
					player:["damageAfter","recoverAfter"],
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					if(player.storage.xinfu_dianhu2&&player.storage.xinfu_dianhu2.isIn()){
						if(event.name=='damage') return event.source==player.storage.xinfu_dianhu2;
						return true;
					};
				},
				content:function (){
					'step 0'
					var target=player.storage.xinfu_dianhu2;
					target.logSkill('xinfu_dianhu');
					target.draw();
				},
				onremove:true,
			},
			"xinfu_jianji":{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
				return target!=player;
				},
				content:function (){
					'step 0'
					target.draw();
					'step 1'
					var card=result[0];
					if(card&&game.hasPlayer(function(current){
						return target.canUse(card,current);
					})&&get.owner(card)==target){
						target.chooseToUse({
							prompt:'是否使用'+get.translation(card)+'？',
							filterCard:function(cardx,player,target){
								return cardx==_status.event.cardx;
							},
							cardx:card,
						});
					}
				},
				ai:{
					order:7.5,
					result:{
						target:1,
					},
				},
			},
			"xinfu_lianpian":{
				audio:2,
				usable:3,
				trigger:{
					player:"useCardToPlayered",
				},
				frequent:true,
				filter:function (event,player){
					if(!event.targets||!event.targets.length||
					event.getParent().triggeredTargets3.length>1||!event.isPhaseUsing(player)) return false;
					var evt=player.getLastUsed(1);
					if(!evt||!evt.targets||!evt.targets.length||!evt.isPhaseUsing(player)) return false;
					for(var i=0;i<event.targets.length;i++){
						if(evt.targets.contains(event.targets[i])) return true;
					}
					return false;
				},
				content:function (){
					'step 0'
					player.draw();
					'step 1'
					event.card=result[0];
					var ablers=player.getLastUsed(1).targets.slice(0);
					for(var i=0;i<ablers.length;i++){
						if(ablers[i]==player||!trigger.targets.contains(ablers[i])) ablers.splice(i--,1);
					}
					if(event.card&&get.owner(event.card)==player&&ablers.length){
						player.chooseTarget('是否将'+get.translation(event.card)+'交给其他角色？',function(card,player,target){
							return _status.event.ablers.contains(target)&&target!=player;
						}).set('ablers',ablers).ai=function(){
							return false;
						};
					}
					else event.finish();
					'step 2'
					if(result.bool){
						player.give(event.card,result.targets[0],true);
					}
				},
				locked:false,
				mod:{
					aiOrder:function(player,card,num){
						if(player.isPhaseUsing()&&(!player.storage.counttrigger||!player.storage.counttrigger.xinfu_lianpian||!player.storage.counttrigger.xinfu_lianpian<3)){
							var evt=player.getLastUsed();
							if(evt&&evt.targets&&evt.targets.length&&evt.isPhaseUsing(player)&&game.hasPlayer(function(current){
								return evt.targets.contains(current)&&player.canUse(card,current)&&get.effect(current,card,player,player)>0;
							})){
								return num+10;
							}
						}
					},
				},
				ai:{
					effect:{
						player:function(card,player,target){
							var evt=player.getLastUsed();
							if(evt&&evt.targets.contains(target)&&(!player.storage.counttrigger||!player.storage.counttrigger.xinfu_lianpian||!player.storage.counttrigger.xinfu_lianpian<3)&&player.isPhaseUsing(player)) return [1.5,0];
						}
					},
				},
			},
		},
		card:{
			pyzhuren_heart:{
				fullskin:true,
				derivation:'puyuan',
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-2},
				skills:['pyzhuren_heart'],
				ai:{
					basic:{
						equipValue:4
					}
				},
			},
			pyzhuren_diamond:{
				fullskin:true,
				derivation:'puyuan',
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-1},
				skills:['pyzhuren_diamond'],
				ai:{
					basic:{
						equipValue:3
					}
				},
			},
			pyzhuren_club:{
				fullskin:true,
				derivation:'puyuan',
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-1},
				skills:['pyzhuren_club'],
				ai:{
					basic:{
						equipValue:5
					}
				},
				loseDelay:false,
				onLose:function(){
					var next=game.createEvent('baiyin_recover');
					event.next.remove(next);
					var evt=event.getParent();
					if(evt.getlx===false) evt=evt.getParent();
					evt.after.push(next);
					next.player=player;
					next.setContent(function(){
						if(player.isDamaged()) player.logSkill('pyzhuren_club');
						player.recover();
					});
				},
			},
			pyzhuren_spade:{
				fullskin:true,
				derivation:'puyuan',
				type:'equip',
				subtype:'equip1',
				skills:['pyzhuren_spade'],
				ai:{
					basic:{
						equipValue:3
					}
				},
			},
			pyzhuren_shandian:{
				fullskin:true,
				derivation:'puyuan',
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-3},
				skills:['pyzhuren_shandian'],
				ai:{
					basic:{
						equipValue:3
					}
				},
			},
		},
		characterIntro:{
			tangji:'唐姬，会稽太守唐瑁女，弘农怀王刘辩的妃子。刘辩死后，唐姬回归故里，因节烈不愿改嫁他人，后被汉献帝下诏封为弘农王妃。',
			lijue:"李傕（jué，一说“傕”读音“què”）（？—198年），字稚然。北地郡泥阳县（今陕西省耀县）人，汉末群雄之一。东汉末年汉献帝时的军阀、权臣，官至大司马、车骑将军、开府、领司隶校尉、假节。<br>李傕本为董卓部将，后被董卓的女婿牛辅派遣至中牟与朱儁交战，大破朱儁，进而至陈留、颍川等地劫掠。初平三年（192年）董卓和牛辅被杀后，李傕归无所依，于是采用贾诩之谋，伙同郭汜、张济、樊稠等原董卓部曲将攻向长安。击败吕布，杀死王允等人，占领长安，把持朝廷大权。后诸将不和，李傕在会议上杀死了樊稠，又与郭汜分别劫持了汉献帝和众臣，相互交战，张济率兵赶来和解，于是二人罢兵，李傕出屯池阳黄白城，郭汜、张济等人随汉献帝东归前往弘农。<br>后来，李傕、郭汜、张济反悔，联合起来追击汉献帝，与杨奉、董承等人几番交战。汉献帝一路逃亡，狼狈不堪，到达安邑，与李傕等人讲和。不久，汉献帝被曹操迎往许都。建安三年（198年），曹操派谒者仆射裴茂召集关西诸将段煨等人征讨李傕，灭其三族。",
			zhangji:"张济（？－196年），武威郡祖厉县（今甘肃靖远东南）人。东汉末年割据军阀之一。 张济原为董卓部将，董卓被诛杀后，张济与李傕一同率军攻破长安，任中郎将。不久，升任镇东将军，封平阳侯，出屯弘农。献帝东迁时，张济升任骠骑将军，率军护卫献帝，后来因与董承等人有矛盾，便与李傕、郭汜一同追赶献帝。 建安元年（196年），张济因军队缺粮而进攻穰城，中流矢而死。死后，部队由侄儿张绣接管。",
			guosi:"郭汜（？－197年），又名郭多，凉州张掖（今甘肃张掖西北）人，东汉末年将领、军阀，献帝时权臣。原为董卓部下。董卓被杀后，凉州众将归无所依，于是采用贾诩之谋，联兵将攻向长安，击败吕布，杀死王允等人，占领长安，把持朝廷大权。几年后，郭汜被部将伍习杀死。",
			fanchou:"樊稠（？—195年），凉州金城（治今甘肃永靖西北）人。东汉末年军阀、将领。官至右将军，封万年侯。 原为董卓部将，董卓死后，伙同李傕、郭汜、张济等人合众十余万反扑长安，败吕布、杀王允，把持朝政。后马腾因与李傕有隙，于是联合韩遂举兵进攻，李傕派樊稠、郭汜等与其交战，大败马腾、韩遂于长平观下。樊稠追至陈仓，与韩遂友好罢兵，却遭李傕猜疑。兴平二年（195年），李傕让外甥骑都尉胡封在会议上将樊稠刺死（一说趁醉用杖击杀）。",
			lvkai:"吕凯（？―225年），字季平，永昌郡不韦县（今云南保山东北）人，三国时期蜀汉官员。初任永昌郡五官掾功曹。章武三年（223年），建宁太守雍闿反叛，投降吴国，吴国任雍闿为永昌太守，吕凯闭境抗拒雍闿。建兴三年（225年），丞相诸葛亮南征，表奏吕凯功劳，任命他为云南太守，封阳迁亭侯。吕凯还未上任，便被叛乱的少数民族杀害。",
			zhanggong:"张恭（生卒年不详），三国时期魏国大臣，与子张就一同闻名于西域。官至西域戊己校尉、关内侯，赠执金吾。初为敦煌郡功曹。东汉末河西大乱，太守马艾卒官，他被众人推为代理长史，遂派儿子张就请曹操委任太守，直至新太守到任。魏文帝时拜西域戊己校尉。魏明帝时去世。",
			weiwenzhugezhi:"卫温 （？—231年），三国时期东吴将领，曾任将军职。诸葛直（？—231年），三国时期东吴将领。黄龙二年（230年）正月，孙权派卫温、诸葛直带领上万士兵出海寻找夷洲、亶洲，想要俘获那里的民众以充实东吴的人口，陆逊和全琮都谏言反对，孙权不听。230年和卫温一起登上台湾（当时的台湾叫做夷洲），他们是中国历史上记载的最早登陆台湾的人。卫温和诸葛直花费了约一年时间行军，士兵们因为疾病死去了十分之八到十分之九，因为亶洲太过遥远，卫温和诸葛直最终没能到达那里，只带了几千名夷洲的人返回。黄龙三年（231年），孙权认为诸葛直违背诏令，劳财伤民，无功而返，和卫温一同入狱被处死。",
			xurong:"徐荣（？－192年），玄菟人（一说为辽东襄平人，《公孙度传》中说公孙度本辽东襄平人，迁居玄菟，为同郡徐荣所举，任辽东太守。同郡当是同“玄菟”郡），东汉末年将领。本为中郎将，曾向董卓推举同郡出身的公孙度出任辽东太守。于汴水之战中击败曹操的独立追击军，以及在梁东之战中击败孙坚的部队。在董卓死后，受司徒王允的命令与李傕、郭汜交战，因部将胡珍投降，寡不敌众，于新丰之战被击败，战死在乱军之中。",
			zhangqiying:"张琪瑛（196年－217年），字不详（或琪瑛为字，名不详），祖籍沛国丰县（今江苏省丰县）。她的曾祖父张陵是西汉留侯张良的十一世孙、天师道（五斗米道）教祖，她的父亲是东汉末年割据汉中的军阀张鲁。张琪瑛继承家说，是五斗米教的传人。",
			beimihu:'卑弥呼（ひみこ，约159年-约249年，有的史书也写成“俾弥呼”）是日本弥生时代邪马台国（今日本本州近畿地区）的女王，在《三国志·魏书·倭人传》中有关于她的记载。关于她的真实身份一直众说纷纭，是个极具神秘色彩的古代女性统治者。亦是日本古代宗教鬼道教的发源者。',
			liuqi:'刘琦（？－209年）。兖州山阳郡高平县（今山东省济宁市微山县两城镇）人。荆州牧刘表的长子、谏议大夫刘琮兄。官至荆州刺史。建安十四年（209年）病逝。',
			tangzi:"唐咨（生卒年不详），三国时魏利城（今江苏赣榆西）人。魏文帝黄初中利城郡反，推唐咨为主。后为魏军击破，遂亡至吴，官至左将军，封侯、持节。后助诸葛诞拒魏，兵败被俘。为安抚吴国军民，魏主拜唐咨为安远将军。",
			huangquan:"黄权（？－240年），字公衡。巴西郡阆中县（今四川阆中）人。三国时期蜀汉、曹魏将领。<br>黄权年轻时为郡吏，后被益州牧刘璋召为主簿。曾劝谏刘璋不要迎接刘备，因而被外放为广汉县长。刘璋败，才降刘备，被拜为偏将军。建计取汉中，拜护军。刘备为汉中王，仍领益州牧，以黄权为治中从事。及刘备称帝，将伐吴，黄权劝谏而不纳。以其为镇北将军，督江北军以防魏师进攻。刘备伐吴败还，而归途隔绝，黄权不得归，无奈之下率部降魏。被魏文帝所赏识，拜镇南将军，封育阳侯，加侍中，使同车陪乘。后领益州刺史，进驻河南。景初三年（239年），迁车骑将军、仪同三司。正始元年（240年），黄权去世，谥号“景”。",
			sufei:"苏飞（生卒年不详），东汉末年人物，原为东汉末年荆州牧刘表的部将，任江夏都督。<br>苏飞与甘宁交好，但是数次向黄祖推荐都失败。甘宁决定投效孙权时助其逃离。后来甘宁率吴军攻破江夏，苏飞兵败被俘。孙权打算将苏飞处斩，但是因为甘宁用性命担保而赦免了苏飞。降吴后官至军都督。",
			
			zhangchangpu:"钟会的母亲。《母夫人张氏传》：夫人张氏，字昌蒲，太原兹氏人，太傅定陵成侯之命妇也。",
			xugong:"许贡是东汉末官吏。先后任吴郡都尉、太守，欲送密信给曹操，要曹操注意孙策，却被孙策发现而被杀。许贡生前招揽了一些门客，当中有三人不忘故主，千方百计想要手刃仇人。建安五年（公元200年），广陵太守陈登派人秘密联系孙策治下的山贼余党，企图颠覆孙策在江东的统治。孙策决定讨伐陈登，行军到丹徒时，许贡门客终于找到了机会。因为孙策有单骑出猎，在野外思考的习惯，三门客趁孙策轻装外出打猎时，放冷箭射中孙策面颊。这些门客后来在与孙策的搏斗中，被赶到的侍卫杀死。孙策此后因为伤口感染，并且俊美的容貌被毁，终于不治身亡，去世时年仅26岁。",
			mangyachang:"南蛮王孟获的部将，使一口截头大刀，骑一匹黄骠马。率军与蜀军交战，战败王平。后被平北将军马岱斩杀。只出现在《三国演义》里，正史中无此人。",
			xushao:'许劭（shào）（150年—195年），字子将。汝南平舆（今河南平舆县射桥镇）人。东汉末年著名人物评论家。据说他每月都要对当时人物进行一次品评，人称为“月旦评”。曾任汝南郡功曹，后南渡投靠扬州刺史刘繇。刘繇被孙策击败后，许劭随其逃往豫章郡，并在豫章去世。',
			puyuan:'蒲元是三国时蜀汉杰出的工匠。为诸葛亮造刀三千口，并且制作木牛流马。后来姜维为他写过两部传记《蒲元传》《蒲元别传》。',
			zhangwen:'张温（193年—230年），字惠恕，吴郡吴县（今江苏苏州）人。少修节操，容貌奇伟。孙权召拜议郎、选曹尚书，徙太子太傅。黄武三年（224），以辅义中郎将身份出使蜀汉，孙权原先害怕诸葛亮会有意留难张温，但张温不担心。在呈上蜀汉朝廷的文书刻意称颂蜀汉，以表明和解的诚意，重建两国关系。他在蜀汉表现出色，得蜀汉朝廷重视。回东吴后不久，被调进豫章的军队，事业上再无进展。孙权一方面介怀他出使蜀汉时称颂蜀汉，又嫌他声名太盛，恐怕张温不会尽忠地由他任用。当时正好碰上暨艳事件，暨艳是张温引荐的臣子，但他滥用职权，升迁评定等只看自己喜恶。事件被揭发后暨艳及同党徐彪都自杀。孙权见此，于是以张温与暨艳、徐彪等人多有来往而下罪张温，后更将张温发还到家乡吴郡。将军骆统曾上书为张温辩解，但孙权不理会。六年后，张温病逝。',
			lisu:'李肃（？－192年），五原（治今内蒙古包头西北）人。永汉三年四月，司徒王允、尚书仆射士孙瑞、卓将吕布共谋诛卓。是时，天子有疾新愈，大会未央殿。布使同郡骑都尉肃等、将亲兵十馀人，伪著卫士服守掖门。布怀诏书。卓至，肃等格卓。卓惊呼布所在。布曰“有诏”，遂杀卓，夷三族。后卓女婿中郎将牛辅典兵别屯陕，分遣校尉李傕、郭汜、张济略陈留、颍川诸县。卓死，吕布使李肃至陕，欲以诏命诛辅。辅等逆与肃战，肃败走弘农，布诛肃。',
			xinpi:'辛毗（生卒年不详），字佐治，颍川阳翟人。三国时期曹魏大臣。原居陇西（郡治在今甘肃临洮县），东汉光武帝建武年间，其先人东迁。当初，辛毗跟随其兄事袁绍。曹操任司空时，征召辛毗，他不受命。官渡战后，辛毗事袁绍的儿子袁谭。公元204年，曹操攻下邺城，上表推荐辛毗任议郎，后为丞相长史。公元220年，曹丕即皇帝位，以辛毗为侍中，赐爵关内侯，后赐广平亭侯。魏明帝即位，封辛毗颍乡侯，食邑三百户，后为卫尉。公元234年，诸葛亮屯兵渭南，司马懿上表魏明帝。魏明帝任辛毗为大将军军师，加使持节号。诸葛亮病逝后，辛毗返回，仍任卫尉。不久，逝世，谥肃侯。',
			zhangchangpu:"钟会的母亲。《母夫人张氏传》：夫人张氏，字昌蒲，太原兹氏人，太傅定陵成侯之命妇也。",
			xugong:"许贡是东汉末官吏。先后任吴郡都尉、太守，欲送密信给曹操，要曹操注意孙策，却被孙策发现而被杀。许贡生前招揽了一些门客，当中有三人不忘故主，千方百计想要手刃仇人。建安五年（公元200年），广陵太守陈登派人秘密联系孙策治下的山贼余党，企图颠覆孙策在江东的统治。孙策决定讨伐陈登，行军到丹徒时，许贡门客终于找到了机会。因为孙策有单骑出猎，在野外思考的习惯，三门客趁孙策轻装外出打猎时，放冷箭射中孙策面颊。这些门客后来在与孙策的搏斗中，被赶到的侍卫杀死。孙策此后因为伤口感染，并且俊美的容貌被毁，终于不治身亡，去世时年仅26岁。",
			mangyachang:"南蛮王孟获的部将，使一口截头大刀，骑一匹黄骠马。率军与蜀军交战，战败王平。后被平北将军马岱斩杀。只出现在《三国演义》里，正史中无此人。",
			
			guanlu:"管辂（209年－256年），字公明，平原（今山东德州平原县）人。三国时期曹魏术士。年八九岁，便喜仰观星辰。成人后，精通《周易》，善于卜筮、相术，习鸟语，相传每言辄中，出神入化。体性宽大，常以德报怨。正元初，为少府丞。北宋时被追封为平原子。管辂是历史上著名的术士，被后世奉为卜卦观相的祖师。",
			gexuan:"葛玄（164年-244年），汉族，吴丹阳郡句容县都乡吉阳里人（今句容市），祖籍山东琅琊，三国著名高道，道教灵宝派祖师。字孝先，号仙翁，被尊称为“葛天师”。道教尊为葛仙翁，又称太极仙翁，与张道陵、许逊、萨守坚共为四大天师。为汉下邳僮侯葛艾后裔，祖葛矩，安平太守，黄门郎；从祖葛弥，豫章第五郡太守。父葛焉，字德儒，州主簿，山阴令，散骑常侍，大尚书。随左慈学道，得《太清丹经》、《黄帝九鼎神丹经》、《金液丹经》等道经。曾采药海山，吴嘉禾二年（233年），在閤皂山修道建庵，筑坛立炉，修炼九转金丹。喜好遨游山川，去过括苍山、南岳山、罗浮山。编撰《灵宝经诰》，精研上清、灵宝等道家真经，并嘱弟子世世箓传。",
			wulan:'吴兰（？~218年），青州（今山东潍坊市）人。东汉末年将领。初为益州牧刘璋部将，后来归降刘备。汉中之战中，与马超、张飞各领一军，驻扎于下辩。建安二十三年，为曹操将领曹洪、张郃所败，退回汉中。途中，为阴平氐族首领强端所杀。',
			leitong:'雷铜（？-218年），阴平（今甘肃文县）人，氐族，东汉末年益州名将。本属益州牧刘璋麾下。刘备攻取益州后，归刘备麾下。参加汉中之战，为魏将张郃所杀。',
			xingdaorong:'邢道荣是《三国演义》中虚构的人物，为零陵太守刘度手下武将，被评价有万夫不当之勇，于《三国演义》第五十二回登场，被赵云刺死。',
			huaman:'花鬘，古典戏曲《龙凤巾》（一名《化外奇缘》）中的人物，身份为三国时期南蛮王孟获与祝融夫人的女儿，关索的夫人之一。在关于关三小姐·关银屏的民间传说中，其名字为“花中秀”，与关索其他几位夫人鲍三娘、王桃、王悦都被关索之姐关银屏编入自己的女兵营中。花鬘在《三国志》，《三国演义》均未有提及，只是戏曲中的虚构人物。其形象并非一般君主家中闺秀，而是与其母祝融相似，是一个可以披甲上阵，善于刀枪作战的女武将。戏曲中在诸葛亮平定南蛮时，花鬘曾与关索作战，失败被俘，两人互生爱意，南蛮王孟获降服后二人成婚。近些年，花鬘接连在各类三国题材的游戏中登场，更广被人知晓。',
			wangshuang:'王双（？-228年），三国时期曹魏将领。蜀汉建兴六年（228年）冬，诸葛亮出散关，攻陈仓，后粮尽而退。王双率领骑兵追击蜀军，但在与蜀军的交战中被击败，王双也被蜀军所斩。在《三国演义》中，王双字子全，是陇西郡狄道县（今甘肃临洮县）人，有万夫不当之勇。在诸葛亮北伐期间，被魏延所斩。',
			wenyang:"文俶（238年—291年），一作文淑，字次骞，小名阿鸯，世称文鸯，谯郡（今安徽亳州市）人。魏末晋初名将，曹魏扬州刺史文钦之子。骁勇善战，依附大将军曹爽，效忠于王室。司马师废黜皇帝曹芳后，随父联合毌丘俭于淮南起兵勤王。兵败之后，向南投奔吴国。诸葛诞发动淮南叛乱，奉命率军驰援。双方发生内讧，父亲为诸葛诞所害，遂降于司马昭，封关内侯。西晋建立后，任平虏护军。咸宁三年（277年），拜平西将军、都督凉秦雍州三州军事，大破鲜卑首领秃发树机能，名震天下，迁使持节、护东夷校尉、监辽东军事。八王之乱中，为诸葛诞外孙、东安王司马繇所诬杀，惨遭灭族，时年五十四岁。",
			liuzan:'字正明，会稽长山人人，曾任左护军，有两子：留略、留平。少为会稽郡吏，曾参与镇压黄巾起义，后被东吴大将凌统所引用，任屯骑校尉。吴五凤二年（公元255年）留赞任左护军，随孙峻征淮南，因病撤军，被魏将蒋班围困于道，力战而死，时年73岁。',
			caoxing:'曹性，东汉末年吕布部将，史载他曾与身为自己上司的反叛者郝萌交战，并砍去郝萌一臂，受到吕布的嘉奖。在罗贯中所著古典小说《三国演义》中，也有关于曹性箭射夏侯惇左目的描述，而曹性也随即被暴怒的夏侯惇所杀。在穿越小说《三国之银河射手》中，主角穿越成为曹性，经过一番闯荡之后，被封为“银河射手”。',
			zhujun:'朱儁（？－195年），字公伟。会稽郡上虞县（今浙江绍兴上虞区）人。东汉末年名将。朱儁出身寒门，赡养母亲，以好义轻财闻名，受乡里敬重。后被太守徐珪举为孝廉，任兰陵令，颇有治绩。再升任交州刺史，以家兵五千大破叛军，平定交州。战后以功封都亭侯，入朝为谏议大夫。光和七年（184年），黄巾起义爆发，朱儁以右中郎将、持节平定三郡之地，以功进封西乡侯，迁镇贼中郎将。又率军讨平黄巾，“威声满天下”。中平二年（185年），进拜右车骑将军，更封钱塘侯。后为河内太守，击退进逼的张燕。权臣董卓秉政时，想任朱儁为副手，遭其婉拒。其后出逃荆州，更屯军中牟，徐州刺史陶谦等欲推举他为太师，并传檄各州牧伯，相邀讨伐李傕、奉迎天子。但朱儁却奉诏入京任太仆。初平三年（192年），升任太尉、录尚书事。兴平元年（194年），行骠骑将军事，持节镇关东，因故未成行。兴平二年（195年），李傕与郭汜相互攻杀，郭汜扣留朱儁作为人质。朱儁性格刚烈，即日发病而死。',
			liuhong:'汉灵帝刘宏（157年，一作156年－189年5月13日），生于冀州河间国（今河北深州）。东汉第十二位皇帝（168年－189年在位），汉章帝刘炟的玄孙。刘宏早年世袭解渎亭侯。永康元年（167年）十二月，汉桓帝刘志逝世，刘宏被外戚窦氏挑选为皇位继承人，于建宁元年（168年）正月即位。刘宏在位的大部分时期，施行党锢及宦官政治。他又设置西园，巧立名目搜刮钱财，甚至卖官鬻爵以用于自己享乐。在位晚期，爆发了黄巾起义，而凉州等地也陷入持续动乱之中。中平六年（189年），刘宏去世，谥号孝灵皇帝，葬于文陵。刘宏喜好辞赋，作有《皇羲篇》、《追德赋》、《令仪颂》、《招商歌》等。',
			liubian:'刘辩（176年－190年3月6日），是汉灵帝刘宏与何皇后的嫡长子。刘辩在灵帝驾崩后继位为帝，史称少帝，由于年幼，实权掌握在临朝称制的母亲何太后和母舅大将军何进手中。少帝在位时期，东汉政权已经名存实亡，他即位后不久即遭遇以何进为首的外戚集团和以十常侍为首的内廷宦官集团这两大敌对政治集团的火并，被迫出宫，回宫后又受制于以“勤王”为名进京的凉州军阀董卓，终于被废为弘农王，成为东汉唯一被废黜的皇帝，其同父异母弟陈留王刘协继位为帝，是为汉献帝。被废黜一年之后，刘辩在董卓胁迫下自尽，时年仅十五岁（一说十八岁），其弟献帝追谥他为怀王。中国古代的史书中称刘辩为皇子辩、少帝和弘农王等。因为在位不逾年，传统上称东汉共十二帝，刘辩与东汉另一位少帝刘懿都不在其中，亦皆无本纪；不过，现代史学界也有观点承认两位少帝均是汉朝皇帝，则刘辩为东汉第十三位皇帝。',
			wangrong:'汉灵怀皇后王荣（？~181年），赵国邯郸（今河北邯郸市）人。五官中郎将王苞孙女，汉灵帝刘宏妃子，汉献帝刘协生母。初以良家子选入掖庭，封为美人，服侍汉灵帝。光和四年（181年），生下陈留王刘协，惨遭灵思皇后毒杀。王荣死后，汉灵帝曾作《追德赋》、《令仪颂》。永汉元年（189年），其子刘协即位，是为汉献帝，追谥灵怀皇后，葬于文昭陵。',
			hanfu:'韩馥（？—191年），字文节，颍川郡（今河南禹州）人。东汉末年的诸侯，冀州牧。韩馥担任过东汉的御史中丞，之后被董卓举荐为冀州牧；在各诸侯起兵讨伐董卓时，韩馥也是其中之一的参与者。韩馥与袁绍也曾经有意立刘虞为皇帝。当时冀州民殷人盛，兵粮优足，于是袁绍便用计夺取冀州，韩馥被迫投靠张邈；之后张邈与袁绍的使者见面，韩馥以为是要来杀害自己的，于是在厕所中以刻书用的小刀自杀。',
			guozhao:'郭照，电视剧《军师联盟》中的女主角之一，由唐艺昕饰演。原型为文德皇后郭氏（字女王），魏国皇后，张春华的义妹，深爱曹丕，替甄宓抚育曹叡，因甄宓之死被曹叡记恨，曹丕死后，成为皇太后，被曹叡逼上死路。自尽身亡。',
			caoanmin:'曹安民（？-197年），沛国谯县（今安徽亳州）人，字安民。东汉时期人物，曹德之子，曹操之侄，曹昂的堂兄弟，曹丕的堂兄，死于宛城之战。按曹丕《典论》记载的“亡兄孝廉子脩、从兄安民遇害。”等情况来看，安民应该是曹操侄子错不了，曹丕是他们属于兄弟关系肯定不会弄错。另外从典论的记载来看安民是和子脩并提的，子脩是曹昂的字，安民则肯定也是字不是名，至于三国志中记载则应取自曹丕之《典论》但陈寿又不知曹安民其名，故写为“长子昂、弟子安民”。',
			fanyufeng:'樊夫人，东汉末年人物，昔桂阳太守赵范寡嫂。赵云随刘备平定江南四郡后，刘备以赵云为桂阳太守。赵范居心叵测，要将自己的嫂嫂樊氏嫁给赵云，但遭到赵云的拒绝。后来，赵范逃走，樊氏也下落不明。2001年，应日本日中青少年文化中心成立50周年之邀，北京京剧院赴日进行40场巡回演出，这次访日的剧目都不同程度地进行了加工改编，以符合日本观众的需求。《取桂阳》是根据老本重新排演的，叶金援饰赵云，王怡饰樊玉凤。剧中的樊玉凤成为文武双全的巾帼英雄，被赵云收降，后来在《龙凤呈祥》中也参与堵截东吴的追兵。',
			zhaozhong:'赵忠（？—189年），安平人，东汉末年宦官，赵延之兄。桓帝、灵帝时，历为小黄门、中常侍、大长秋、车骑将军等职，封都乡侯。在职时以搜刮暴敛、骄纵贪婪见称，灵帝极为宠信，常谓“赵常侍是我母”。中平六年（189年），何进谋诛宦官，事泄，他和其余几个常侍设计伏杀何进，袁绍、袁术等人闻何进被杀，入宫杀尽宦官，后捕杀赵忠。',
			caosong:'曹嵩（？—194年），字巨高，沛郡谯县（今安徽省亳州市）人。东汉大臣，大长秋曹腾的养子，曹操之父亲。门荫入仕，历任司隶校尉、鸿胪卿、大司农，位列九卿，位高权重。中平四年（187年），靠着贿赂中官，出任太尉，位列三公。中平五年（188年），受累于黄巾之乱，坐罪免官。兴平元年（194年），投奔兖州牧曹操，遇害于徐州。延康元年（220年），追尊魏国太王。曹魏建立后，追尊皇帝，谥号为太。',
			xiahoujie:'夏侯杰（？—208年），是罗贯中的小说《三国演义》中曹操的部将，征战时常常带在身边。在第42回长坂坡之战中，张飞大吼，从马儿受惊跌下马来而死。',
			ruanyu:'阮瑀（约165—212年），字元瑜，陈留尉氏（今河南开封市尉氏县）人，是东汉末年文学家，建安七子之一。阮瑀所作章表书记很出色，当时军国书檄文字，多为阮瑀与陈琳所拟。名作有《为曹公作书与孙权》。诗有《驾出北郭门行》，描写孤儿受后母虐待的苦难遭遇，比较生动形象。年轻时曾受学于蔡邕，蔡邕称他为“奇才”。后徙为丞相仓曹掾属。诗歌语言朴素，往往能反映出一般的社会问题。阮瑀的音乐修养颇高，他的儿子阮籍，孙子阮咸皆当时名人，位列“竹林七贤”，妙于音律。明人辑有《阮元瑜集》。',
			liangxing:'梁兴（？-212年），武威郡姑臧人也，东汉末年凉州军阀之一。与张横、贾诩、段煨是同乡，曾斩杀李傕。建安十六年，同韩遂、马超联合，起兵反抗曹操。梁兴率步骑五千夜袭曹军先头部队徐晃，被击退。联军战败后，梁兴逃到蓝田，劫掠周围郡县。夏侯渊进攻蓝田联合郑浑征讨梁兴，梁兴战败，不知所终。',
			zhangmiao:'张邈（？－195年），字孟卓，东平寿张（今山东东平县）人。东汉大臣、名士，“八厨”之一。举孝廉出身，授骑都尉，出任陈留太守。参与讨伐董卓，参加汴水之战，归附于曹操。兴平元年（194年），趁着曹操讨伐徐州牧陶谦，联合陈宫发动叛乱，迎立吕布为兖州牧。受到曹操讨伐，兵败投奔徐州牧刘备。兴平二年，张邈向袁术借兵途中，被部下所杀。',
		},
		characterTitle:{
			wulan:'#b对决限定武将',
			leitong:'#b对决限定武将',
			chunyuqiong:'#b对决限定武将',
			sp_xuyou:'#g4v4限定武将',
		},
		perfectPair:{},
		characterFilter:{
			chunyuqiong:function(mode){
				return mode!='identity'&&mode!='guozhan';
			},
			leitong:function(mode){
				return mode!='identity'&&mode!='guozhan';
			},
			wulan:function(mode){
				return mode!='identity'&&mode!='guozhan';
			},
			sp_xuyou:function(mode){
				return mode=='versus'&&['guandu','4v4','four'].contains(_status.mode);
			},
		},
		dynamicTranslate:{
			xinlvli:function(player){
				var str='每回合限一次';
				if(player.storage.choujue) str+='（自己的回合内则改为限两次）';
				str+='，当你造成';
				if(player.storage.beishui) str+='或受到';
				str+='伤害后，你可选择：1，若你的体力值大于你的手牌数，你摸Ｘ张牌；2，若你的手牌数大于你的体力值且你已受伤，你回复Ｘ点体力（Ｘ为你的手牌数与体力值之差）。';
				return str;
			},
			lvli:function(player){
				var str='每名角色的回合限一次';
				if(player.storage.choujue) str+='（自己的回合内则改为限两次）';
				str+='，你可以声明一个基本牌或普通锦囊牌的牌名，有随机概率视为使用之（装备区里的牌数越多，成功概率越大）';
				if(player.storage.beishui) str+='。当你受到伤害后，你也可以以此法使用一张牌。';
				return str;
			},
			mubing:function(player){
				if(player.storage.mubing2) return '出牌阶段开始时，你可以展示牌堆顶的四张牌。你可弃置任意张手牌，并可获得任意张点数之和不大于你弃置的牌点数之和的牌。然后你可将以此法获得的牌以任意方式交给其他角色。';
				return '出牌阶段开始时，你可以展示牌堆顶的三张牌。你可弃置任意张手牌，并可获得任意张点数之和不大于你弃置的牌点数之和的牌。';
			},
			rezhongjian:function(player){
				return '出牌阶段限'+(player.hasSkill('recaishi2')?'两':'一')+'次，你可以选择一名本回合内未选择过的角色。你令其获得一项效果直至你的下回合开始：①其下次造成伤害后弃置两张牌，然后你摸一张牌。②其下次受到伤害后摸两张牌，然后你摸一张牌。'
			},
			bazhan:function(player){
				if(player.storage.bazhan) return '转换技，出牌阶段限一次，阴：你可以将一张手牌交给一名其他角色。<span class="bluetext">阳：你可以获得一名其他角色的一张手牌。</span>若以此法移动的牌为【酒】或♥牌，则你可令得到此牌的角色执行一项：①回复1点体力。②复原武将牌。';
				return '转换技，出牌阶段限一次，<span class="bluetext">阴：你可以将一张手牌交给一名其他角色。</span>阳：你可以获得一名其他角色的一张手牌。若以此法移动的牌为【酒】或♥牌，则你可令得到此牌的角色执行一项：①回复1点体力。②复原武将牌。';
			},
		},
		perfectPair:{
		},
		characterReplace:{
			lijue:['lijue','ns_lijue'],
			fanchou:['fanchou','ns_fanchou'],
			zhangji:['zhangji','ns_zhangji'],
			zhangchangpu:['ol_zhangchangpu','zhangchangpu'],
			huangfusong:['huangfusong','old_huangfusong'],
			wenyang:['wenyang','diy_wenyang'],
			dingyuan:['ol_dingyuan','dingyuan'],
			quyi:['quyi','re_quyi'],
			hansui:['xin_hansui','re_hansui'],
			//jin_simashi:['jin_simashi','simashi'],
			//jin_yanghuiyu:['jin_yanghuiyu','yanghuiyu'],
			chunyuqiong:['chunyuqiong','re_chunyuqiong'],
			taoqian:['taoqian','re_taoqian'],
		},
		translate:{
			lijue:"李傕",
			zhangji:"张济",
			fanchou:"樊稠",
			guosi:"郭汜",
			lvkai:"吕凯",
			zhanggong:"张恭",
			weiwenzhugezhi:"卫温诸葛直",
			xurong:"徐荣",
			zhangqiying:"张琪瑛",
			sp_liuqi:'刘琦',
			xf_tangzi:"唐咨",
			xf_huangquan:"黄权",
			xf_sufei:"苏飞",
			"xinfu_langxi":"狼袭",
			"xinfu_langxi_info":"准备阶段，你可以对一名体力小于或等于你的其他角色造成0～2点随机伤害。",
			"xinfu_yisuan":"亦算",
			"xinfu_yisuan_info":"每回合限一次。当你于出牌阶段使用的锦囊牌进入弃牌堆时，你可以减1点体力上限，从弃牌堆中获得之。",
			"xinfu_xingluan":"兴乱",
			"xinfu_xingluan_info":"每回合限一次。当你于出牌阶段使用的仅指定一个目标的牌结算完成后，你可以从牌堆中随机获得一张点数为6的牌。",
			"xinfu_lveming":"掠命",
			"xinfu_lveming_info":"出牌阶段限一次，你可以选择一名装备区装备比你少的角色，令其选择一个点数，然后你进行判定：<br>若点数相同，你对其造成2点伤害；<br>若点数不同，则你随机获得其区域内的一张牌。",
			"xinfu_tunjun":"屯军",
			"xinfu_tunjun_info":"限定技，出牌阶段，你可以选择一名角色，令其随机使用牌堆中的X张装备牌。(X为你发动过“掠命”的次数)",
			"xinfu_tanbei":"贪狈",
			"xinfu_tanbei_info":"出牌阶段限一次，你可以令一名其他角色选择一项：1.令你随机获得其区域内的一张牌，本回合内你不能对其使用牌。2.令你此回合内对其使用牌没有次数与距离限制。",
			"xinfu_sidao":"伺盗",
			xinfu_sidaox:'伺盗',
			"xinfu_sidao_info":"出牌阶段限一次，当你对一名其他角色连续使用两张牌后，你可以将一张手牌当做【顺手牵羊】对其使用。",
			"tanbei_effect1":"贪狈",
			"tanbei_effect1_info":"",
			"tanbei_effect2":"贪狈",
			"tanbei_effect2_info":"",
			
			"xinfu_tunan":"图南",
			"xinfu_tunan_info":"出牌阶段限一次，你可以展示牌堆顶的一张牌并选择一名其他角色，然后该角色选择一项：使用此牌（无距离限制）；或将此牌当普通【杀】使用。",
			"xinfu_bijing":"闭境",
			"xinfu_bijing_info":"结束阶段，你可以选择一张手牌并标记为“闭境”。若你于回合外失去“闭境”牌，则当前回合角色的弃牌阶段开始时，其需弃置两张牌。你的准备阶段，弃置手牌中的“闭境”牌。",
			"xinfu_zhenxing":"镇行",
			"xinfu_zhenxing_info":"结束阶段开始时或当你受到伤害后，你可以观看牌堆顶的至多三张牌，然后你获得其中与其余牌花色均不相同的一张牌。",
			"xinfu_qianxin":"遣信",
			"xinfu_qianxin_info":"出牌阶段限一次，若牌堆中没有“信”，你可以选择一名角色并将任意张手牌置于处理区，然后将这些牌放置于牌堆中X倍数的位置（X为存活人数），称为“信”。该角色的弃牌阶段开始时，若其手牌区内有于本回合内获得过的“信”，其选择一项：令你将手牌摸至四张；本回合手牌上限-2。",
			"qianxin_effect":"遣信",
			"qianxin_effect_info":"",
			"xinfu_qianxin2":"遣信",
			"xinfu_qianxin2_info":"",
			
			"xinfu_fuhai":"浮海",
			"xinfu_fuhai_info":"出牌阶段每个方向限一次，你可以展示一张手牌并选择上家或下家。该角色展示一张手牌，若你展示的牌点数大于等于其展示的牌点数，你弃置你展示的牌，然后继续对其上家或下家重复此流程；若你展示的牌点数小于该展示角色牌的点数，则该角色弃置其展示的牌，然后你与其各摸X张牌（X为你此回合内发动此技能选择的角色数），且你此阶段内不能再发动〖浮海〗。",
			"fuhai_clear":"浮海",
			"fuhai_clear_info":"",
			
			"xz_xunxun":"恂恂",
			"xz_xunxun_info":"摸牌阶段，你可以观看牌堆顶的四张牌，然后将其中的两张牌置于牌堆顶，并将其余的牌以任意顺序置于牌堆底。",
			"xinfu_xingzhao":"兴棹",
			"xinfu_xingzhao_info":"锁定技，若X≥1，你视为拥有技能〖恂恂〗。若X≥2，当你使用装备牌时，你摸一张牌。若X≥3，弃牌阶段开始时，你跳过此阶段。（X为场上已受伤的角色数）",
			"xinfu_xingzhao2":"兴棹",
			"xinfu_xingzhao2_info":"",
			"xinfu_dianhu":"点虎",
			"xinfu_dianhu_info":"锁定技，游戏开始时，你选择一名其他角色。当其受到来自你的伤害后或回复体力后，你摸一张牌。",
			"xinfu_dianhu2":"点虎",
			"xinfu_dianhu2_info":"",
			"xinfu_jianji":"谏计",
			"xinfu_jianji_info":"出牌阶段限一次，你可以令一名其他角色摸一张牌。然后该角色可以使用此牌。",
			"xinfu_lianpian":"联翩",
			"xinfu_lianpian_info":"出牌阶段限三次。当你对一名角色连续使用牌时，你可以摸一张牌，然后可以将一张牌交给该角色。",
			spwenji:'问计',
			spwenji_info:'出牌阶段开始时，你可以令一名其他角色交给你一张牌。你于本回合内使用与该牌名称相同的牌时不能被其他角色响应。',
			sptunjiang:'屯江',
			sptunjiang_info:'结束阶段，若你未跳过本回合的出牌阶段，且你于本回合出牌阶段内未使用牌指定过其他角色为目标，则你可以摸X张牌（X为全场势力数）。',
			zongkui:'纵傀',
			zongkui_mark:'纵傀',
			zongkui_mark_bg:'傀',
			zongkui_info:'回合开始时，你可以指定一名未拥有“傀”标记的其他角色，令其获得一枚“傀”标记。每轮游戏开始时，你指定一名体力值最少且没有“傀”标记的其他角色，令其获得一枚“傀”标记。',
			guju:'骨疽',
			guju_info:'锁定技，拥有“傀”标记的角色受到伤害后，你摸一张牌。',
			baijia:'拜假',
			baijia_info:'觉醒技，准备阶段，若你因〖骨疽〗获得的牌不少于7张，则你增加1点体力上限，回复1点体力，然后令所有未拥有“傀”标记的其他角色获得“傀”标记，最后失去技能〖骨疽〗，并获得技能〖蚕食〗。',
			bmcanshi:'蚕食',
			bmcanshi_info:'一名角色使用基本牌或普通锦囊牌指定你为唯一目标时，若其有“傀”标记，你可以取消之，然后其失去“傀”标记；你使用牌仅指定一名角色为目标时，你可以额外指定任意名带有“傀”标记的角色为目标（无距离限制），然后这些角色失去“傀”标记。',
			
			xinpi:'辛毗',
			lisu:'李肃',
			zhangwen:'张温',
			puyuan:'蒲元',
			xushao:'许劭',
			mangyachang:"忙牙长",
			xugong:"许贡",
			zhangchangpu:"张昌蒲",
			guanlu:'管辂',
			gexuan:'葛玄',
			
			tuiyan:'推演',
			tuiyan_info:'出牌阶段开始时，你可以观看牌堆顶的两张牌。',
			busuan:'卜算',
			busuan_info:'出牌阶段限一次，你可以选择一名其他角色，然后选择至多两张不同的卡牌名称（限基本牌或锦囊牌）。该角色下次摸牌阶段摸牌时，改为从牌堆或弃牌堆中获得你选择的牌。',
			busuan_angelbeats:'卜算',
			mingjie:'命戒',
			mingjie_info:'结束阶段，你可以摸一张牌，若此牌为红色，你可以重复此流程直到摸到黑色牌或摸到第三张牌。当你以此法摸到黑色牌时，你失去1点体力。',
			gxlianhua:'炼化',
			gxlianhua_info:'你的回合外，每当有其他角色受到伤害后，你获得一个“丹血”标记（该角色与你阵营一致时为红色，不一致为黑色，此颜色对所有玩家均不可见）直到你的准备阶段开始。准备阶段，根据你获得的“丹血”标记的数量和颜色，你从牌堆/弃牌堆中获得相应的牌以及相应技能直到回合结束。3枚或以下：〖英姿〗和【桃】；超过3枚且红色“丹血”较多：〖观星〗和【无中生有】；超过3枚且黑色“丹血”较多：〖直言〗和【顺手牵羊】；超过3枚且红色和黑色一样多：【杀】、【决斗】和〖攻心〗。',
			zhafu:'札符',
			zhafu_info:'	限定技，出牌阶段，你可以选择一名其他角色，令其获得一枚「札」。有「札」的角色弃牌阶段开始时，若其手牌数大于1，其移去「札」并选择保留一张手牌，然后将其余的手牌交给你。',
			pingjian:'评荐',
			pingjian_info:'结束阶段开始时/当你受到伤害后/出牌阶段限一次，你可以令系统随机从剩余武将牌堆中检索出三张拥有发动时机为结束阶段开始时/当你受到伤害后/出牌阶段的技能的武将牌。然后你可以选择尝试发动其中一个技能。每个技能每局只能选择一次。',
			pingjian_use:'评荐',
			pytianjiang:'天匠',
			pytianjiang_info:'游戏开始时，你随机获得两张不同副类别的装备牌，并置入你的装备区。出牌阶段，你可以将装备区的牌移动至其他角色的装备区（可替换原装备）。若你以此法移动了〖铸刃〗的衍生装备，你摸两张牌。',
			pytianjiang_move:'天匠',
			pyzhuren:'铸刃',
			pyzhuren_info:'出牌阶段限一次，你可以弃置一张手牌。根据此牌的花色点数，你有一定概率打造成功并获得一张武器牌（若打造失败或武器已有则改为摸一张【杀】，花色决定武器名称，点数决定成功率）。此武器牌进入弃牌堆时，将其移出游戏。',
			pyzhuren_destroy:'铸刃',
			pyzhuren_heart:'红缎枪',
			pyzhuren_heart_info:'每回合限一次，当你使用【杀】造成伤害后，你可以进行判定，若结果为：红色，你回复1点体力；黑色：你摸两张牌。',
			pyzhuren_diamond:'烈淬刀',
			pyzhuren_diamond_info:'每回合限两次，当你使用【杀】对目标角色造成伤害时，你可以弃置一张牌，令此伤害+1。你使用【杀】的次数上限+1。',
			pyzhuren_club:'水波剑',
			pyzhuren_club_info:'每回合限两次，当你使用普通锦囊牌或【杀】时，你可以为此牌增加一个目标。当你失去装备区里的【水波剑】后，你回复1点体力。',
			pyzhuren_spade:'混毒弯匕',
			pyzhuren_spade_info:'当你使用【杀】指定目标后，你可令其失去X点体力（X为此技能本回合内发动过的次数且至多为5）。',
			pyzhuren_shandian:'天雷刃',
			pyzhuren_shandian_info:'当你使用【杀】指定目标后，可令其进行判定，若结果为：黑桃，其受到3点雷属性伤害；梅花，其受到1点雷属性伤害，你回复1点体力并摸一张牌。',
			
			songshu:'颂蜀',
			songshu_info:'出牌阶段，你可以和其他角色拼点。若你没赢，其摸两张牌，且你本阶段内不能再发动〖颂蜀〗',
			sibian:'思辩',
			sibian_info:'摸牌阶段，你可以放弃摸牌，改为亮出牌堆顶的四张牌，然后获得其中所有点数最大与点数最小的牌。若获得的牌是两张且点数之差小于存活人数，则你可以将剩余的牌交给手牌数最少的角色。',
			lslixun:'利熏',
			lslixun_fate:'利熏',
			lslixun_info:'锁定技，当你受到伤害时，你防止此伤害，然后获得等同于伤害值的“珠”标记。出牌阶段开始时，你进行判定，若结果点数小于“珠”的数量，你弃置等同于“珠”数量的手牌（若弃牌的牌数不够，则失去剩余数量的体力值）。',
			lskuizhu:'馈珠',
			lskuizhu_info:'出牌阶段结束时，你可以选择体力值为全场最多的一名其他角色，将手牌摸至与该角色相同（最多摸至五张），然后该角色观看你的手牌，弃置任意张手牌并从观看的牌中获得等量的牌。若其获得的牌大于一张，则你选择一项：移去一个“珠”；或令其对其攻击范围内的一名角色造成1点伤害。',
			xpchijie:'持节',
			xpchijie_info:'每回合限一次。①当你受到其他角色使用的牌造成的伤害时，你可以令此牌对所有目标无效。②其他角色使用的牌结算完成时，若你是此牌的目标之一且此牌未造成过伤害，则你可以获得此牌对应的所有实体牌。',
			xpchijie2:'持节',
			yinju:'引裾',
			yinju_info:'限定技，出牌阶段，你可以选择一名其他角色。若如此做，当你于此阶段内使用牌指定其为目标后，你摸一张牌；当你即将对其造成伤害时，防止此伤害，然后其回复等量的体力。',
			yinju2:'引裾',
			
			spjiedao:"截刀",
			"spjiedao_info":"当你每回合第一次造成伤害时，你可令此伤害至多+X（X为你损失的体力值）。然后若受到此伤害的角色没有死亡，你弃置等同于此伤害加值的牌。",
			biaozhao:"表召",
			"biaozhao_info":"结束阶段，你可以将一张牌置于武将牌上，称为“表”。当有一张与“表”花色点数均相同的牌进入弃牌堆时，你将“表”置入弃牌堆并失去1点体力，若此牌是其他角色因弃置而进入弃牌堆的，则改为该角色获得“表”。准备阶段，若你的武将牌上有“表”，则你将“表”置入弃牌堆。然后你选择一名角色，该角色回复1点体力且将手牌摸至与全场手牌数最多的人相同（最多摸五张）。",
			"biaozhao2":"表召",
			"biaozhao2_info":"",
			"biaozhao3":"表召",
			"biaozhao3_info":"",
			yechou:"业仇",
			"yechou_info":"当你死亡时，你可以选择一名已损失体力值大于1的角色。直到其下个回合开始前，每个回合结束时，该角色失去1点体力。",
			"yechou2":"业仇",
			"yechou2_info":"",
			yanjiao:"严教",
			"yanjiao_info":"出牌阶段限一次，你可以选择一名其他角色并从牌堆顶亮出四张牌。该角色将这些牌分成点数之和相等的两组，你与其各获得其中一组，然后将剩余未分组的牌置入弃牌堆。若未分组的牌超过一张，则你本回合手牌上限-1。",
			"yanjiao2":"严教",
			"yanjiao2_info":"",
			xingshen:"省身",
			"xingshen_info":"当你受到伤害后，你可以摸一张牌且下一次发动〖严教〗亮出的牌数+1。若你的手牌数为全场最少，则改为摸两张牌；若你的体力值为全场最少，则〖严教〗亮出的牌数改为+2（加值总数不能超过4）。",
			
			sp_zhanghe:'SP张郃',
			yuanlve:'远略',
			yuanlve_info:'出牌阶段限一次，你可以将一张非装备牌交给一名角色，然后该角色可以使用该牌并令你摸一张牌。',
			xunchen:'荀谌',
			fenglve:'锋略',
			fenglve2:'锋略',
			fenglve_info:'出牌阶段开始时，你可以与一名角色拼点，若你赢，该角色将其区域内的各一张牌交给你；若你没赢，你交给其一张牌。当你的单人拼点结算后，你可以令对方获得你拼点的牌。',
			mouzhi:'谋识',
			mouzhi2:'谋识',
			mouzhi_info:'出牌阶段限一次，你可以将一张手牌交给一名角色，若如此做，当其于其下回合的出牌阶段内对一名角色造成伤害后，若是此阶段其第一次对该角色造成伤害，你摸一张牌。',
			sp_shenpei:'SP审配',
			gangzhi:'刚直',
			gangzhi_info:'锁定技，当你即将受到或造成伤害时，你防止此伤害，改为受到伤害的角色失去等量的体力。',
			beizhan:'备战',
			beizhan2:'备战',
			beizhan_info:'结束阶段，你可以令一名角色将手牌摸至体力上限（至多为5）。其下个回合开始时，若其手牌数为全场最多，则其此回合内使用的牌不能指定其他角色为目标。',
			gaolan:'高览',
			xiying:'袭营',
			xiying2:'袭营',
			xiying_info:'出牌阶段开始时，你可以弃置一张非基本手牌，然后令所有其他角色依次选择一项：弃置一张牌，或本回合内不能使用或打出牌。',
			lvkuanglvxiang:'吕旷吕翔',
			liehou:'列侯',
			liehou_info:'出牌阶段限一次，你可以令一名攻击范围内的角色交给你一张手牌，然后你将一张手牌交给攻击范围内的另一名角色。',
			qigong:'齐攻',
			qigong_info:'当你使用的【杀】被【闪】抵消之后，你可以再对目标角色使用一张【杀】（不可被响应）。',
			chunyuqiong:'淳于琼',
			sushou:'宿守',
			sushou_info:'弃牌阶段开始时，你可以摸X+1张牌（X为“粮”数），然后可以交给任意名友方角色各一张牌。',
			cangchu:'仓储',
			cangchu_info:'锁定技，游戏开始时，你获得3枚“粮”标记，当你受到1点火焰伤害后，你失去一枚“粮”标记。',
			liangying:'粮营',
			liangying_info:'锁定技，若你有“粮”标记，则友方角色摸牌阶段摸牌数+1；当你失去所有“粮”标记后，你减1点体力上限，然后令敌方角色各摸两张牌。',
			sp_xuyou:'SP许攸',
			spshicai:'恃才',
			spshicai2:'恃才',
			spshicai_info:'出牌阶段，牌堆顶的一张牌对你可见。你可以弃置一张牌，然后获得牌堆顶的一张牌，且不能再发动〖恃才〗直到此牌离开你的手牌区。',
			spfushi:'附势',
			spfushi_info:'锁定技，若己方存活角色数：大于敌方，你视为拥有〖择主〗；小于敌方，你视为拥有〖逞功〗。',
			zezhu:'择主',
			zezhu_info:'出牌阶段限一次，你可以获得双方主帅的各一张牌（若无牌则改为你摸一张牌），然后交给双方主帅各一张牌。',
			chenggong:'逞功',
			chenggong_info:'当有角色使用牌指定目标后，若此牌对目标数大于1，则你可令使用者摸一张牌。',
			leitong:'雷铜',
			kuiji:'溃击',
			kuiji_info:'出牌阶段限一次，你可以将一张黑色基本牌当作【兵粮寸断】置于你的判定区，然后摸一张牌。若如此做，你可以对体力值最多的一名对手造成2点伤害。对手因此进入濒死状态时，你或队友体力值最少的一方回复1点体力。',
			wulan:'吴兰',
			wlcuorui:'挫锐',
			wlcuorui_info:'出牌阶段开始时，你可以弃置你或队友区域里的一张牌。若如此做，你选择一项：1.弃置对手装备区里至多两张与此牌颜色相同的牌；2.展示对手的共计两张手牌，然后获得其中与此牌颜色相同的牌。',
			re_panfeng:'潘凤',
			xinkuangfu:'狂斧',
			xinkuangfu_info:'出牌阶段限一次，你可选择：1，弃置装备区里的一张牌，你使用无对应实体牌的普【杀】。若此【杀】造成伤害，你摸两张牌。2，弃置一名其他角色装备区里的一张牌，你使用无对应实体牌的普【杀】。若此【杀】未造成伤害，你弃置两张手牌。',
			xingdaorong:'邢道荣',
			xuxie:'虚猲',
			xuxie_info:'出牌阶段开始时，你可以减1点体力上限并选择所有与你距离为1的角色，弃置这些角色的各一张牌或令这些角色各摸一张牌。出牌阶段结束时，若你的体力上限为全场最少，则你加1点体力上限。',
			huaman:'花鬘',
			hmmanyi:'蛮裔',
			hmmanyi_info:'锁定技，【南蛮入侵】对你无效。',
			mansi_viewas:'蛮嗣',
			mansi:'蛮嗣',
			mansi_info:'出牌阶段限一次，你可以将所有手牌当做【南蛮入侵】使用；当有角色受到【南蛮入侵】的伤害后，你摸一张牌。',
			souying:'薮影',
			souying_info:'每回合限一次，当你对其他角色（或其他角色对你）使用【杀】或普通锦囊牌指定唯一目标后，若此牌不是本回合你对其（或其对你）使用的第一张【杀】或普通锦囊牌，你可以弃置一张牌，获得此牌对应的所有实体牌（或令此牌对你无效）。',
			zhanyuan:'战缘',
			zhanyuan_info:'觉醒技，准备阶段，若你已因蛮嗣累计获得超过7张牌，你加一点体力上限并回复1点体力，并可以选择一名男性角色，你与其获得技能〖系力〗，然后你失去技能〖蛮嗣〗',
			hmxili:'系力',
			hmxili_info:'每回合限一次，你的回合外，当其他拥有【系力】技能的角色在其回合内对没有【系力】技能的角色造成伤害时，你可以弃置一张牌，令此伤害+1，然后你与其各摸两张牌。',
			wangshuang:'王双',
			spzhuilie:'追猎',
			spzhuilie2:'追猎',
			spzhuilie_info:'锁定技，你使用【杀】无距离限制；当你使用【杀】指定目标后，若其不在你的攻击范围内，此【杀】不计入使用次数限制且你判定。若判定结果为武器牌或坐骑牌，此【杀】的伤害基数改为X（X为其体力值）。否则你失去1点体力。',
			wenyang:'文鸯',
			xinlvli:'膂力',
			xinlvli_info:'每回合限一次，当你造成伤害后，你可选择：1，若你的体力值大于你的手牌数，你摸Ｘ张牌；2，若你的手牌数大于你的体力值且你已受伤，你回复Ｘ点体力（Ｘ为你的手牌数与体力值之差）。',
			lvli:'膂力',
			lvli4:'膂力',
			lvli5:'膂力',
			lvli_info:'每名角色的回合限一次，你可以声明一个基本牌或普通锦囊牌的牌名，有随机概率视为使用之（装备区里的牌数越多，成功概率越大）',
			choujue:'仇决',
			choujue_info:'觉醒技，一名角色的回合结束时，若你的手牌数和体力值相差3或更多，你减1点体力上限并获得技能〖背水〗，然后将〖膂力〗改为“在自己的回合时每回合限两次”。',
			beishui:'背水',
			beishui_info:'觉醒技，准备阶段，若你的手牌数或体力值小于2，你减1点体力上限并获得技能〖清剿〗，然后将〖膂力〗改为受到伤害后也可以发动。',
			qingjiao:'清剿',
			qingjiao_info:'出牌阶段开始时，你可以弃置所有手牌，然后从牌堆或弃牌堆中随机获得八张牌名各不相同且副类别不同的牌。若如此做，结束阶段，你弃置所有牌。',
			re_liuzan:'留赞',
			refenyin:'奋音',
			refenyin_info:'锁定技，你的回合内，当一张牌进入弃牌堆后，若本回合内没有过与此牌花色相同的卡牌进入过弃牌堆，则你摸一张牌。',
			liji:'力激',
			liji_info:'出牌阶段限X次，你可以弃置一张牌并对一名其他角色造成1点伤害。（X为本回合内进入过弃牌堆的卡牌数除以8，若场上人数小于5则改为除以4，向下取整）',
			re_sunluyu:'孙鲁育',
			remeibu:'魅步',
			remeibu_info:'其他角色的出牌阶段开始时，若你在其攻击范围内，你可以弃置一张牌，令该角色于本阶段内拥有〖止息〗。',
			rezhixi:'止息',
			rezhixi_info:'锁定技，当你使用【杀】或普通锦囊牌时，你弃置一张手牌。',
			remumu:'穆穆',
			remumu_info:'出牌阶段开始时，你可以选择一项：1.弃置一名其他角色装备区里的一张牌，然后你本回合可使用【杀】的次数+1；2.获得一名角色装备区里的一张防具牌，然后你本回合可使用【杀】的次数-1。',
			sp_zhangliao:'SP张辽',
			//这仨技能给SP仲村由理毫无违和感好吗！！！
			mubing:'募兵',
			mubing_info:'出牌阶段开始时，你可以展示牌堆顶的三张牌。你可弃置任意张手牌，并可获得任意张点数之和不大于你弃置的牌点数之和的牌。',
			ziqu:'资取',
			ziqu_info:'每名角色限一次，当你对有牌的其他角色造成伤害后，你可以防止此伤害。然后其将其点数最大的牌交给你。',
			diaoling:'调令',
			diaoling_info:'觉醒技，准备阶段，若你已因〖募兵〗获得了6张或更多的【杀】或武器牌或伤害锦囊牌，则你回复1点体力或摸两张牌，然后修改〖募兵〗。',
			mubing_rewrite:'募兵·改',
			mubing_rewrite_info:'出牌阶段开始时，你可以展示牌堆顶的四张牌。你可弃置任意张手牌，并可获得任意张点数之和不大于你弃置的牌点数之和的牌。然后你可将以此法获得的牌以任意方式交给其他角色。',
			caobuxing:'曹不兴',
			moying:'墨影',
			moying_info:'每回合限一次，当你于回合外不因使用而失去单一一张锦囊牌或装备牌后，你可以选择一个花色和与此牌点数差绝对值不超过2的点数，然后获得牌堆中所有与此牌花色点数相同的牌。',
			juanhui:'绢绘',
			juanhui2:'绢绘',
			juanhui2_backup:'绢绘',
			juanhui_info:'结束阶段，你可以选择一名其他角色。记录该角色下回合的出牌阶段里使用的基本牌和普通锦囊牌（每种牌名限记一次），你的下回合出牌阶段，可将一张手牌当这些牌里的任意一张牌使用（每张限使用一次，且【杀】不计次数）。当"绢绘"的牌全部用完时，你回复1点体力并将手牌摸至三张。',
			ol_yujin:'OL于禁',
			re_maliang:'马良',
			rexiemu:'协穆',
			rexiemu_info:'结束阶段，若全场没有“协穆”标记，你可以选择一名角色获得“协穆”标记直到你的下回合开始。你或该角色在各自的回合外使用或打出手牌时，你与其各摸一张牌（每回合限一次）。',
			heli:'贺励',
			heli_info:'出牌阶段限一次，你可以选择手牌数比你少的一名其他角色。该角色展示所有手牌，然后每缺少一种类型的牌，便从牌堆中随机获得一张此类型的牌。',
			caoxing:'曹性',
			cxliushi:'流矢',
			cxliushi2:'流矢',
			cxliushi_info:'出牌阶段，你可以将一张红桃牌置于牌堆顶，视为对一名角色使用一张【杀】（无距离限制且不计入使用次数）。当此【杀】造成伤害后，受到伤害的角色获得一个“流”。有“流”的角色手牌上限-X（X为其“流”数）。',
			zhanwan:'斩腕',
			zhanwan_info:'锁定技，有“流”的角色于弃牌阶段弃牌后，你摸等量的牌，然后其移去所有的“流”。',
			zhujun:'朱儁',
			gongjian:'攻坚',
			gongjian_info:'每回合限一次，当你使用【杀】指定目标后，若此【杀】和你使用的上一张【杀】或场上使用的上一张【杀】有相同的目标，则你可以弃置其两张牌，然后获得以此法弃置的所有【杀】。',
			kuimang:'溃蟒',
			kuimang_info:'锁定技，一名角色死亡后，若你对其造成过伤害，你摸两张牌。',
			liuhong:'刘宏',
			yujue:'鬻爵',
			yujue_backup:'鬻爵',
			yujue_info:'出牌阶段限一次，你可以废除一个装备栏，然后令一名有手牌的其他角色交给你一张手牌。其获得〖执笏〗直到你的下回合开始。',
			zhihu:'执笏',
			zhihu_mark:'执笏',
			zhihu_info:'锁定技，每回合限两次，当你对其他角色造成伤害后，你摸两张牌。',
			tuxing:'图兴',
			tuxing2:'图兴',
			tuxing_info:'锁定技，当你废除一个装备栏时，你加1点体力上限并回复1点体力。然后若你所有的装备栏均已被废除，则你减4点体力上限，且本局游戏内造成的伤害+1。',
			re_hejin:'何进',
			xin_baosanniang:'鲍三娘',
			decadexushen:"许身",
			decadexushen2:'许身',
			decadexushen_info:"限定技，当你进入濒死状态后，你可以回复1点体力并获得技能“镇南”，然后如果你脱离濒死状态且“关索”不在场，你可令一名其他角色选择是否用“关索”代替其武将并令其摸三张牌。",
			decadezhennan:"镇南",
			decadezhennan_info:"当有角色使用普通锦囊牌指定目标后，若此牌目标数大于1，你可以对一名其他角色造成1点伤害。",
			liubian:'刘辩',
			shiyuan:'诗怨',
			shiyuan_info:'每回合每项限一次，当你成为其他角色使用牌的目标后：①若其体力值大于你，你摸三张牌。②若其体力值等于你，你摸两张牌。③若其体力值小于你，你摸一张牌。',
			dushi:'毒逝',
			dushi_info:'锁定技，你处于濒死状态时，其他角色不能对你使用【桃】。你死亡时，你选择一名其他角色获得〖毒逝〗。',
			yuwei:'余威',
			yuwei_info:'主公技，锁定技，其他群雄角色的回合内，你将〖诗怨〗改为“每回合每项限两次”。',
			ol_dingyuan:'丁原',
			cixiao:'慈孝',
			cixiao_info:'准备阶段，若场上没有“义子”标记，你可令一名其他角色获得一个“义子”标记；若场上有“义子”标记，你可以弃置一张牌移动“义子”标记。拥有“义子”标记的角色获得技能“叛弑”。',
			panshi:'叛弑',
			panshi_info:'锁定技，准备阶段，你交给有“慈孝”技能的角色一张手牌；当你于出牌阶段因使用【杀】对其他角色造成伤害时，若其拥有技能“慈孝”，则此伤害+1，且你结束出牌阶段。',
			xianshuai:'先率',
			xianshuai_info:'锁定技，有角色造成伤害后，若此伤害是本轮第一次造成伤害：你摸一张牌；若伤害来源是你，则你对受伤角色再造成1点伤害。',
			wangrong:'王荣',
			minsi:'敏思',
			minsi2:'敏思',
			minsi_info:'出牌阶段限一次，你可以弃置任意张点数之和为13的牌，然后摸两倍数量的牌。以此法获得的牌中，黑色牌本回合无距离限制，红色牌本回合不计入手牌上限。',
			jijing:'吉境',
			jijing_info:'当你受到伤害后，你可以进行一次判定，然后若你弃置任意张点数之和与判定结果点数相同的牌，你回复1点体力。',
			zhuide:'追德',
			zhuide_info:'当你死亡时，你可令一名其他角色从牌堆中获得四张名称各不相同的基本牌。',
			yj_caoang:'SP曹昂',
			yjxuepin:'血拼',
			yjxuepin_info:'出牌阶段限一次，你可以选择攻击范围内的一名角色并失去1点体力。你弃置其两张牌。若这两张牌类型相同，你回复1点体力。',
			ns_chendao:'SP陈到',
			nsjianglie:'将烈',
			nsjianglie_info:'当你使用【杀】指定目标后，你可以令其展示所有手牌，然后弃置其中一种颜色的牌。',
			ns_jiaxu:'☆贾诩',
			nsyice:'遗策',
			nsyice_info:'锁定技，当你使用/打出/弃置的牌进入弃牌堆后，你将这些牌以任意顺序置于你的武将牌上，称为“策”。若这些“策”中有点数相同的牌，则你获得这两张牌中的所有牌，将这两张牌置于牌堆两端。若场上没有处于濒死状态的角色，则你对一名角色造成1点伤害。',
			ns_lijue:'SP李傕',
			ns_zhangji:'SP张济',
			nsfeixiong:'飞熊',
			nsfeixiong_info:'出牌阶段开始时，你可以和一名其他角色拼点。赢的角色对没赢的角色造成1点伤害。',
			nscesuan:'策算',
			nscesuan_info:'锁定技，当你受到伤害时，你防止此伤害并失去一点体力上限。若你因以此法失去体力上限导致体力值减少，则你摸一张牌。',
			nslulve:'掳掠',
			nslulve_info:'出牌阶段限一次，你可以弃置X张牌并选择一名装备区内有牌的其他角色，然后对其造成1点伤害（X为其装备区内的牌数）。',
			ns_fanchou:'SP樊稠',
			nsyangwu:'扬武',
			nsyangwu_info:'出牌阶段限一次，你可以弃置一张♥手牌并选择一名手牌数大于你的其他角色。你观看其手牌并获得其中的X张牌（X为其与你手牌数之差的一半且向上取整）。',
			mini_sunquan:'SP孙权',
			minizhiheng:'制衡',
			minizhiheng_info:'出牌阶段结束时，你可以弃置任意张手牌。若如此做，你将手牌摸至四张。',
			mini_zuoci:'SP左慈',
			minishendao:'神道',
			minishendao_info:'你的判定牌生效前，你可以将判定结果改为任意花色。',
			minixinsheng:'新生',
			minixinsheng_info:'当你受到伤害后，你可以展示牌堆顶的三张牌，然后获得其中每种花色的牌各一张。',
			mini_jiangwei:'SP姜维',
			minitiaoxin:'挑衅',
			minitiaoxin_info:'出牌阶段开始时，你可以弃置一名其他角色的两张手牌。若你以此法弃置的牌中有【杀】，则你弃置一张手牌。',
			mini_diaochan:'SP貂蝉',
			minilijian:'离间',
			minilijian_info:'每回合限触发一次，当你使用【杀】或【决斗】指定目标后，你可以为此牌增加一个目标。',
			mini_zhangchunhua:'SP张春华',
			minishangshi:'伤逝',
			minishangshi_info:'当你的手牌数小于X时，你可以将手牌摸至X张（X为你已损失的体力值且至少为1）',
			re_xinxianying:'辛宪英',
			rezhongjian:'忠鉴',
			rezhongjian2:'忠鉴',
			rezhongjian_info:'出牌阶段限一次，你可以选择一名本回合内未选择过的角色。你令其获得一项效果直至你的下回合开始：①其下次造成伤害后弃置两张牌，然后你摸一张牌。②其下次受到伤害后摸两张牌，然后你摸一张牌。',
			recaishi:'才识',
			recaishi3:'才识',
			recaishi_info:'摸牌阶段结束时，若你于本阶段内因摸牌而获得的所有的牌：花色均相同，你将〖忠鉴〗于本回合内改为“出牌阶段限两次”。不均相同，你可回复1点体力。若如此做，你本回合内不能对自己使用牌。',
			decadewuniang:'武娘',
			decadewuniang_info:'当你使用或打出【杀】时，你可以获得一名其他角色的一张牌。若如此做，其摸一张牌。（若你已发动许身，则关索也摸一张牌）',
			dongxie:'董翓',
			juntun:'军屯',
			juntun_info:'锁定技，准备阶段，若X大于1，则你减1点体力上限并摸X张牌（X为你的体力上限）。',
			jiaojie:'狡黠',
			jiaojie_info:'锁定技，你的红色牌不计入手牌上限。你使用黑色牌无距离和次数限制。',
			buchen:'不臣',
			buchen_info:'隐匿技，你于其他角色的回合登场时，可获得当前回合角色的一张牌。',
			smyyingshi:'鹰视',
			smyyingshi_info:'锁定技，出牌阶段，你可观看牌堆顶的X张牌（X为你的体力上限）。',
			xiongzhi:'雄志',
			xiongzhi_info:'限定技，出牌阶段，你可展示牌堆顶的一张牌并使用之。若如此做，你重复此流程，直到你以此法展示的牌无法使用。',
			quanbian:'权变',
			quanbian2:'权变',
			quanbian_info:'当你于出牌阶段内使用/打出手牌时，若此牌有花色且你本回合内未使用/打出过该花色的其他手牌，则你可以选择一项：①摸一张牌。②将牌堆顶X张牌中的一张置于牌堆底（X为你的体力上限）。若你发动此技能，则你本回合内不能再使用与此牌花色相同的手牌。',
			re_hansui:'韩遂',
			re_quyi:'麴义',
			refuqi:'伏骑',
			refuqi_info:'锁定技，当你使用牌时，你令所有距离为1的其他角色不能使用或打出牌响应此牌。',
			hanfu:'韩馥',
			hfjieying:'节应',
			hfjieying2:'节应',
			hfjieying3:'节应',
			hfjieying_info:'结束阶段，你可以选择一名其他角色，该角色下回合使用【杀】或普通锦囊牌无距离限制且可多指定一个目标，且当其造成伤害后，其无法再使用牌直到回合结束。 ',
			weipo:'危迫',
			weipo_info:'锁定技，其他角色使用【杀】或普通锦囊牌指定你为目标后，若你的手牌数小于X，则你将手牌摸至X张，并记录摸牌事件结算后的手牌数Y。此牌结算结束后，若你的手牌数小于Y，则你将一张手牌交给此牌的使用者，且此技能失效直到你的下回合开始。（X为你的体力上限且至多为5） ',
			guozhao:'郭照',
			pianchong:'偏宠',
			pianchong2:'偏宠',
			pianchong_info:'摸牌阶段开始时，你可放弃摸牌。若如此做，你从牌堆中获得一张红色牌和一张黑色牌。然后你选择一种颜色。你的下回合开始前，当你失去该颜色的一张牌后，你从牌堆中获得另一种颜色的一张牌。',
			zunwei:'尊位',
			zunwei_backup:'尊位',
			zunwei_info:"出牌阶段限一次，你可选择本局游戏内未选择过的一项：①若你已受伤，则你可以选择一名体力值大于你的其他角色，你将体力值回复至X（X为你的体力上限与其体力值中的较小值）②选择一名手牌数大于你的其他角色，你将手牌数摸至与其相同（至多摸五张）③选择一名装备区内牌数大于你的其他角色。你令X=1。若你装备区内的('equip'+X)栏为空，则你使用牌堆中的一张副类别为('equip'+X)，且能对自己使用的装备牌。你令X+1。若X不大于5，且你装备区内的牌数仍小于目标角色，则你重复此流程。",
			ns_caoanmin:'曹安民',
			nskuishe:'窥舍',
			nskuishe_info:'出牌阶段限一次，你可以选择一名其他角色A的一张牌，并将此牌交给不为A的一名角色。然后A可以对你使用一张【杀】。',
			re_chunyuqiong:'淳于琼',
			recangchu:'仓储',
			recangchu2:'仓储',
			recangchu3:'仓储',
			recangchu_info:'锁定技，游戏开始时，你获得3个“粮”。你的手牌上限+X（X为“粮”数）。当你于回合外获得牌时，你获得一个“粮”。（你的“粮”数不能超过存活角色数）',
			reliangying:'粮营',
			reliangying_info:'弃牌阶段开始时，你可以摸至多X张牌，然后交给等量的角色各一张牌。（X为你的“粮”数）',
			reshishou:'失守',
			reshishou2:'失守',
			reshishou_info:'锁定技，当你使用【酒】时或受到1点火焰伤害后，你移去一个“粮”。准备阶段，若你没有“粮”，你失去1点体力。',
			ol_lisu:'OL李肃',
			qiaoyan:'巧言',
			qiaoyan_info:'锁定技，当你于回合外受到其他角色造成的伤害时，若你：有“珠”，则你令伤害来源获得“珠”；没有“珠”，则你防止此伤害，然后摸一张牌，并将一张牌正面朝上置于武将牌上，称为“珠”。',
			xianzhu:'献珠',
			xianzhu_info:'锁定技，出牌阶段开始时，你令一名角色A获得“珠”。若A不为你自己，则你选择A攻击范围内的一名角色B，视为A对B使用一张【杀】。',
			fanyufeng:'樊玉凤',
			bazhan:'把盏',
			bazhan_info:'转换技，出牌阶段限一次，阴：你可以将一张手牌交给一名其他角色。阳：你可以获得一名其他角色的一张手牌。若以此法移动的牌为【酒】或♥牌，则你可令得到此牌的角色执行一项：①回复1点体力。②复原武将牌。',
			jiaoying:'醮影',
			jiaoying2:'醮影',
			jiaoying3:'醮影',
			jiaoying3_draw:'醮影',
			jiaoying_info:'锁定技，其他角色获得你的手牌后，该角色本回合不能使用或打出与此牌颜色相同的牌。然后此回合结束时，若其本回合没有再使用牌，你令一名角色将手牌摸至体力上限（至多摸至五张）。',
			zhaozhong:'赵忠',
			yangzhong:'殃众',
			yangzhong_info:'当你造成或受到伤害后，若受伤角色和伤害来源均存活，则伤害来源可弃置两张牌，然后令受伤角色失去1点体力。',
			huangkong:'惶恐',
			huangkong_info:'锁定技，当你于回合外成为【杀】或伤害类锦囊牌的唯一目标后，若你没有手牌，则你摸两张牌。',
			re_taoqian:'陶谦',
			reyixiang:'义襄',
			reyixiang_info:'锁定技，其他角色于其出牌阶段内使用的第一张牌对你的伤害-1；其使用的第二张牌若为黑色，则对你无效。',
			caosong:'曹嵩',
			cslilu:'礼赂',
			cslilu_info:'摸牌阶段，你可以放弃摸牌，改为将手牌摸至X张（X为你的体力上限和5中的最小值），然后将至少一张手牌交给一名其他角色。若你以此法给出的牌数大于你上次以此法给出的牌数，则你加1点体力上限并回复1点体力。',
			csyizheng:'翊正',
			csyizheng2:'翊正',
			csyizheng_info:'结束阶段开始时，你可以选择一名其他角色。你的下回合开始前，当该角色造成伤害或回复体力时，若其体力上限小于你，则你减1点体力上限，且令此伤害值/回复值+1。',
			reyirang:'揖让',
			reyirang_info:'出牌阶段开始时，你可以将所有非基本牌交给一名体力上限大于你的其他角色，然后调整体力上限至与该角色相同并回复X点体力（X为你以此法交给其的牌数）。',
			xiahoujie:'夏侯杰',
			liedan:'裂胆',
			liedan_info:'锁定技，其他角色的准备阶段开始时，若X大于0，则你摸X张牌。若X等于3，则你加1点体力上限。若X为0，则你失去1点体力并获得一枚“裂”（X为你的手牌数，体力值，装备区牌数中大于其的数量）。准备阶段，若“裂”数大于4，则你死亡。',
			zhuangdan:'壮胆',
			zhuangdan_mark:'壮胆',
			zhuangdan_info:'锁定技，其他角色的回合结束时，若你的手牌数为全场唯一最多，则你令〖裂胆〗失效直到你下回合结束。',
			ruanyu:'阮瑀',
			xingzuo:'兴作',
			xingzuo2:'兴作',
			xingzuo_info:'出牌阶段开始时，你可观看牌堆底的三张牌并用任意张手牌替换其中等量的牌。若如此做，结束阶段，你可令一名有手牌的角色用所有手牌替换牌堆底的三张牌。若其因此法失去的牌多于三张，则你失去1点体力。',
			miaoxian:'妙弦',
			miaoxian_info:'若你的手牌中仅有一张黑色牌，你可将此牌当作任意一张普通锦囊牌使用（每种牌名每回合限一次）；若你的手牌中仅有一张红色牌，你使用此牌时摸一张牌。',
			liangxing:'梁兴',
			lulve:'掳掠',
			lulve_info:'出牌阶段开始时，你可选择一名有手牌且手牌数少于你的角色。其选择一项：①将所有手牌交给你，然后你将武将牌翻面。②将武将牌翻面，然后其视为对你使用一张【杀】。',
			lxzhuixi:'追袭',
			lxzhuixi_info:'锁定技，当你造成伤害或受到伤害时，若受伤角色的翻面状态和伤害来源的翻面状态不同，则此伤害+1。',
			zhangmiao:'张邈',
			mouni:'谋逆',
			mouni_info:'准备阶段，你可对一名其他角色依次使用你手牌中所有的【杀】（若其进入了濒死状态，则终止此流程）。然后若这些【杀】中有未造成伤害的【杀】，则你跳过本回合的出牌阶段。',
			zongfan:'纵反',
			zongfan_info:'觉醒技，结束阶段，若你本回合内因〖谋逆〗使用过【杀】且未跳过本回合的出牌阶段，则你将任意张牌交给一名其他角色，然后加X点体力上限并回复X点体力（X为你以此法给出的牌数）。最后失去〖谋逆〗并获得〖战孤〗。',
			zhangu:'战孤',
			zhangu_info:'锁定技，准备阶段，若你的体力上限大于1且没有手牌/装备区内没有牌，则你减1点体力上限，然后从牌堆中获得三张类型不同的牌。',

			sp_whlw:"文和乱武",
			sp_zlzy:"逐鹿中原",
			sp_longzhou:"同舟共济",
			sp_zizouqi:"自走棋",
			sp_sbfm:'上兵伐谋',
			sp_shengun:'三国奇人传',
			sp_baigei:'无双上将',
			sp_guandu:'官渡之战',
			sp_huangjin:'黄巾之乱',
			sp_fadong:'诸侯伐董',
			sp_xuzhou:'徐州风云',
			sp_decade:'其他新服武将',
			sp_mini:'欢乐三国杀',
			sp_luanwu:'文和乱武·线下',
			sp_yongjian:'用间篇',
			sp_s:'线下S系列',
		},
	};
});
