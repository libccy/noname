'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'sp2',
		connect:true,
		character:{
			dc_yanghu:['male','wei',3,['dcdeshao','dcmingfa']],
			dc_huangzu:['male','qun',4,['dcjinggong','dcxiaojuan']],
			caimaozhangyun:['male','wei',4,['lianzhou','jinglan']],
			yanrou:['male','wei',4,['choutao','xiangshu']],
			zhangyao:['female','wu',3,['yuanyu','xiyan']],
			tenggongzhu:['female','wu',3,['xingchong','liunian']],
			dc_huangchengyan:['male','qun',3,['dcjiezhen','dczecai','dcyinshi']],
			laiyinger:['female','qun',3,['xiaowu','huaping']],
			caomao:['male','wei','3/4',['qianlong','fensi','juetao','zhushi'],['zhu']],
			dc_gaolan:['male','qun',4,['xizhen']],
			guanning:['male','qun','3/7',['dunshi']],
			tengyin:['male','wu',3,['chenjian','xixiu']],
			dc_zhuling:['male','wei',4,['dczhanyi']],
			dc_luotong:['male','wu',3,['renzheng','jinjian']],
			dc_jiben:['male','qun',3,['xunli','zhishi','lieyi']],
			licaiwei:['female','wei',3,['yijiao','qibie']],
			mamidi:['male','qun','4/6',['bingjie','zhengding']],
			re_fengfangnv:['female','qun',3,['tiqi','baoshu']],
			wufan:['male','wu',4,['tianyun','wfyuyan']],
			yanfuren:['female','qun',3,['channi','nifu']],
			haomeng:['male','qun',7,['xiongmang']],
			re_dengzhi:['male','shu',3,['jianliang','weimeng']],
			fengxi:['male','wu',3,['yusui','boyan']],
			re_miheng:['male','qun',3,['rekuangcai','reshejian']],
			re_zhangbao:['male','qun',3,['xinzhoufu','xinyingbing']],
			zhaoyan:['female','wu',3,['jinhui','qingman']],
			re_sunyi:['male','wu',5,['syjiqiao','syxiongyi']],
			re_pangdegong:['male','qun',3,['heqia','yinyi']],
			wangtao:['female','shu',3,['huguan','yaopei']],
			wangyue:['female','shu',3,['huguan','mingluan']],
			re_chendeng:['male','qun',3,['refuyuan','reyingshui','rewangzu']],
			caojinyu:['female','wei',3,['yuqi','shanshen','xianjing']],
			hanmeng:['male','qun',4,['jieliang','quanjiu']],
			xinping:['male','qun',3,['fuyuan','zhongjie','yongdi']],
			wanniangongzhu:['female','qun',3,['zhenge','xinghan']],
			re_xunchen:['male','qun',3,['refenglve','anyong']],
			zhangning:['female','qun',3,['tianze','difa']],
			liuyong:['male','shu',3,['zhuning','fengxiang']],
			tongyuan:['male','qun',4,['chaofeng','chuanshu']],
			sp_mifangfushiren:['male','shu',4,['mffengshi']],
			re_kanze:['male','wu',3,['xiashu','rekuanshi']],
			re_nanhualaoxian:['male','qun',4,['gongxiu','jinghe']],
			zhouyi:['female','wu',3,['zhukou','mengqing']],
			lvlingqi:['female','qun',4,['guowu','zhuangrong']],
			dufuren:['female','wei',3,['yise','shunshi']],
			zhanghu:['male','wei',4,['cuijian','zhtongyuan']],
			caoanmin:['male','wei',4,['xianwei']],
			re_panshu:['female','wu',3,['zhiren','yaner']],
			re_zoushi:['female','qun',3,['rehuoshui','reqingcheng']],
			luyusheng:['female','wu',3,['zhente','zhiwei']],
			huaxin:['male','wei',3,['spwanggui','xibing']],
			re_dongbai:['female','qun',3,['relianzhu','rexiahui']],
			qiuliju:['male','qun','4/6',['koulve','qljsuiren']],
			heyan:['male','wei',3,['yachai','qingtan']],
			re_hucheer:['male','qun',4,['redaoji','fuzhong']],
			re_dongcheng:['male','qun',4,['xuezhao']],
			yangwan:['female','shu',3,['youyan','zhuihuan']],
			tangji:['female','qun',3,['jielie','kangge']],
			zhangheng:['male','qun',8,['dangzai','liangjue']],
			duanwei:['male','qun',4,['langmie']],
			re_niujin:['male','wei',4,['recuorui','reliewei']],
			zhangmiao:['male','qun',4,['mouni','zongfan']],
			liangxing:['male','qun',4,['lulve','lxzhuixi']],
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
			re_hejin:['male','qun',4,['spmouzhu','spyanhuo']],
			re_hansui:['male','qun',4,['spniluan','spweiwu']],
			liuhong:['male','qun',4,['yujue','tuxing']],
			zhujun:['male','qun',4,['gongjian','kuimang']],
			caoxing:['male','qun',4,['cxliushi','zhanwan']],
			re_maliang:['male','shu',3,['rexiemu','heli'],[]],
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
			fanchou:["male","qun",4,["xinxingluan"],[]],
			guosi:["male","qun",4,["xinfu_tanbei","xinfu_sidao"],[]],
			lvkai:["male","shu",3,["xinfu_tunan","xinfu_bijing"],[]],
			zhanggong:["male","wei",3,["xinfu_zhenxing","xinfu_qianxin"],[]],
			weiwenzhugezhi:["male","wu",4,["xinfu_fuhai"],[]],
			beimihu:['female','qun',3,['zongkui','guju','baijia']],
			xurong:["male","qun",4,["xinfu_xionghuo","xinfu_shajue"],[]],
			zhangqiying:["female","qun",3,["xinfu_falu","xinfu_dianhua","xinfu_zhenyi"],[]],
			sp_liuqi:['male','qun',3,['rewenji','sptunjiang']],
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
		},
		characterSort:{
			sp2:{
				sp_whlw:["xurong","lijue","zhangji","fanchou","guosi","duanwei","liangxing","zhangheng",'tangji'],
				sp_zlzy:["zhangqiying","lvkai","zhanggong","weiwenzhugezhi","beimihu"],
				sp_longzhou:["xf_tangzi","xf_huangquan","xf_sufei","sp_liuqi"],
				sp_zizouqi:["mangyachang","xugong","zhangchangpu"],
				sp_sbfm:["lisu","xinpi","zhangwen"],
				sp_shengun:["puyuan","guanlu","gexuan","xushao"],
				sp_guandu:["sp_zhanghe","xunchen","sp_shenpei","gaolan","lvkuanglvxiang","chunyuqiong","sp_xuyou","xinping","hanmeng"],
				sp_qihuan:['liubian','zhaozhong','re_hejin'],
				sp_binglin:['re_niujin',"sp_mifangfushiren",'wufan'],
				sp_fenghuo:['re_nanhualaoxian','tongyuan','zhangning','re_pangdegong'],
				sp_baigei:['re_panfeng','xingdaorong','caoxing','re_chunyuqiong','xiahoujie'],
				sp_caizijiaren:['re_dongbai','re_sunluyu','heyan','zhaoyan','wangtao','wangyue'],
				sp_zhilan:['liuyong','wanniangongzhu','zhanghu','lvlingqi'],
				sp_guixin:['re_kanze','re_chendeng'],
				sp_zongheng:['huaxin','luyusheng','re_xunchen','re_miheng','fengxi','re_dengzhi'],
				sp_huangjin:['liuhong','zhujun','re_hansui'],
				sp_fadong:['ol_dingyuan','wangrong','re_quyi','hanfu'],
				sp_xuzhou:['re_taoqian','caosong','zhangmiao','qiuliju'],
				sp_zhongyuan:['re_hucheer','re_zoushi','caoanmin','re_dongcheng'],
				sp_xiaohu:['haomeng','yanfuren'],
				sp_decade:['wulan','leitong','huaman','wangshuang','wenyang','re_liuzan','caobuxing','re_maliang','xin_baosanniang','re_xinxianying','dongxie','guozhao','fanyufeng','ruanyu','re_dongzhao','yangwan','re_panshu','dufuren','zhouyi','caojinyu','re_sunyi','re_zhangbao','re_fengfangnv','mamidi','dc_jiben','licaiwei','dc_luotong','dc_zhuling','tengyin','dc_gaolan','guanning','caomao','laiyinger','dc_huangchengyan','tenggongzhu','yanrou','caimaozhangyun','zhangyao','dc_huangzu'],
			}
		},
		skill:{
			//羊祜
			dcdeshao:{
				audio:2,
				usable:2,
				trigger:{target:'useCardToTargeted'},
				filter:function(event,player){
					return player!=event.player&&get.color(event.card)=='black';
				},
				logTarget:'player',
				check:function(event,player){
					var eff=get.effect(player,{name:'wuzhong'},player,player)/2;
					if(player.countCards('h')+1<=event.player.countCards('h')&&event.player.countCards('he')>0) eff+=get.effect(event.player,{name:'guohe_copy2'},player,player);
					return eff;
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1' 
					var target=trigger.player;
					if(player.countCards('h')<=target.countCards('h')&&target.countCards('he')>0){
						player.discardPlayerCard(target,true,'he');
						player.addExpose(0.2);
					}
				},
			},
			dcmingfa:{
				audio:2,
				trigger:{player:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					return player.isPhaseUsing()&&(event.card.name=='sha'||get.type(event.card)=='trick')&&event.cards.filterInD().length>0&&!player.getExpansions('dcmingfa').length;
				},
				content:function(){
					'step 0'
					var str,cards=trigger.cards.filterInD(),card=trigger.card;
					if(cards.length==1&&card.name==cards[0].name&&(card.nature||false)==(cards[0].nature||false)) str=get.translation(cards[0]);
					else str=(get.translation(trigger.card)+'（'+get.translation(cards)+'）');
					var cardx={
						name:trigger.card.name,
						nature:trigger.card.nature,
						isCard:true,
					};
					player.chooseTarget(lib.filter.notMe,get.prompt('dcmingfa'),'将'+str+'作为“明伐”牌置于武将牌上，并选择一名其他角色。该角色下回合结束时对其执行〖明伐〗的后续效果。').set('card',cardx).set('goon',function(){
						var getMax=function(card){
							return Math.max.apply(Math,game.filterPlayer(function(current){
								return current!=player&&lib.filter.targetEnabled2(card,player,current);
							}).map(function(i){
								return get.effect(i,card,player,player)*Math.sqrt(Math.min(i.getHandcardLimit(),1+i.countCards('h')));
							}).concat([0]));
						}
						var eff1=getMax(cardx);
						if(player.hasCard(function(card){
							if((card.name!='sha'&&get.type(card)!='trick')||!player.hasValueTarget(card,null,true)) return false;
							return getMax({
								name:get.name(card),
								nature:get.nature(card),
								isCard:true,
							})>=eff1;
						},'hs')) return false;
						return true;
					}()).set('ai',function(target){
						if(!_status.event.goon) return 0;
						var player=_status.event.player,card=_status.event.card;
						if(!lib.filter.targetEnabled2(card,player,target)) return 0;
						return get.effect(target,card,player,player)*Math.sqrt(Math.min(target.getHandcardLimit(),1+target.countCards('h')));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dcmingfa',target);
						var card={
							name:trigger.card.name,
							nature:trigger.card.nature,
							isCard:true,
						};
						player.storage.dcmingfa_info=[card,target];
						player.addToExpansion(trigger.cards.filterInD(),'gain2').gaintag.add('dcmingfa');
					}
				},
				group:'dcmingfa_use',
				ai:{expose:0.2},
				intro:{
					mark:function(dialog,storage,player){
						var cards=player.getExpansions('dcmingfa');
						if(!cards.length) return '没有“明伐”牌';
						else dialog.add(cards);
						var info=player.storage.dcmingfa_info;
						if(info){
							dialog.addText('记录牌：'+get.translation(info[0])+'<br>记录目标：'+get.translation(info[1]));
						}
					},
					content:'expansion',
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					delete player.storage.dcmingfa_info;
				},
				subSkill:{
					use:{
						audio:'dcmingfa',
						trigger:{global:['phaseEnd','die']},
						forced:true,
						filter:function(event,player){
							if(!player.storage.dcmingfa_info||!player.getExpansions('dcmingfa').length) return false;
							return event.player==player.storage.dcmingfa_info[1];
						},
						content:function(){
							'step 0'
							var target=trigger.player;
							event.target=target;
							var card=player.storage.dcmingfa_info[0];
							delete player.storage.dcmingfa_info;
							event.card=card;
							event.count=Math.min(5,target.countCards('h'));
							if(event.count<=0) event.goto(2);
							'step 1'
							event.count--;
							if(target.isIn()&&lib.filter.targetEnabled2(card,player,target)){
								player.useCard(get.copy(card),target);
								if(event.count>0) event.redo();
							}
							'step 2'
							var cards=player.getExpansions('dcmingfa');
							if(cards.length>0) player.loseToDiscardpile(cards);
						},
					},
				},
			},
			//黄祖
			dcjinggong:{
				audio:2,
				enable:'chooseToUse',
				mod:{
					targetInRange:function(card){
						if(card.storage&&card.storage.dcjinggong) return true;
					},
				},
				viewAsFilter:function(player){
					return player.hasCard(function(card){
						return get.type(card)=='equip';
					},'ehs');
				},
				position:'hes',
				filterCard:{type:'equip'},
				viewAs:{
					name:'sha',
					storage:{dcjinggong:true},
				},
				check:function(card){
					return 6-get.value(card);
				},
				ai:{
					respondSha:true,
					skillTagFilter:function(player){
						return player.hasCard(function(card){
							return get.type(card)=='equip';
						},'ehs');
					},
				},
				group:'dcjinggong_base',
				subSkill:{
					base:{
						trigger:{player:'useCard1'},
						forced:true,
						popup:false,
						firstDo:true,
						filter:function(event,player){
							return event.skill=='dcjinggong'&&event.targets.length>0;
						},
						content:function(){
							trigger.baseDamage=get.distance(player,trigger.targets[0]);
						},
					},
				},
			},
			dcxiaojuan:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				logTarget:'target',
				filter:function(event,player){
					return event.targets.length==1&&player!=event.target&&event.target.countCards('h')>1;
				},
				check:function(event,player){
					var target=event.target;
					if(get.attitude(player,target)>=0) return false;
					if(get.color(event.card)=='none') return true;
					return Math.floor(target.countCards('h')/2)>=Math.floor(player.countCards('h')/2);
				},
				content:function(){
					'step 0'
					var target=trigger.target;
					event.target=target;
					var num=Math.floor(target.countCards('h')/2);
					if(num>0) player.discardPlayerCard(target,'h',num,true);
					else event.finish();
					'step 1'
					var color=get.color(trigger.card);
					if(result.bool&&color!='none'&&player.countCards('h')>1){
						var bool=false;
						for(var i of result.cards){
							if(get.color(i,target)==color){
								bool=true;
								break;
							}
						}
						if(!bool) event.finish();
					}
					else event.finish();
					'step 2'
					var num=Math.floor(player.countCards('h')/2);
					if(num>0) player.chooseToDiscard('h',num,true);
				},
			},
			//蔡瑁张允
			lianzhou:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					if(!player.isLinked()) return true;
					return game.hasPlayer(function(current){
						return current!=player&&current.hp==player.hp&&!current.isLinked();
					});
				},
				content:function(){
					'step 0'
					if(!player.isLinked()) player.link();
					'step 1'
					var num=game.countPlayer(function(current){
						return current!=player&&current.hp==player.hp&&!current.isLinked();
					});
					if(num>0){
						player.chooseTarget([1,num],'选择横置任意名体力值等于你的角色',function(card,player,current){
							return current!=player&&current.hp==player.hp&&!current.isLinked();
						}).set('ai',function(target){
							var player=_status.event.player;
							return get.effect(target,{name:'tiesuo'},player,player);
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						player.line(targets,'green');
						for(var i of targets) i.link();
					}
				},
				ai:{halfneg:true},
			},
			jinglan:{
				audio:2,
				trigger:{source:'damageSource'},
				forced:true,
				content:function(){
					var delta=player.countCards('h')-player.hp;
					if(delta>0) player.chooseToDiscard('h',3,true);
					else if(delta==0){
						player.chooseToDiscard('h',true);
						player.recover();
					}
					else{
						player.damage('fire','nosource');
						player.draw(4);
					}
				},
				ai:{halfneg:true},
			},
			//闫柔
			choutao:{
				audio:2,
				trigger:{
					player:'useCard',
					target:'useCardToTargeted',
				},
				filter:function(event,player){
					if(event.card.name!='sha'||!event.player.isIn()) return false;
					if(player==event.player) return player.hasCard(function(card){
						return lib.filter.cardDiscardable(card,player,'choutao');
					},'he');
					return event.player.hasCard(function(card){
						return lib.filter.canBeDiscarded(card,player,event.player);
					},'he');
				},
				check:function(event,player){
					if(player==event.player){
						if(!player.hasCard(function(card){
							return get.value(card)<=5;
						},'he')) return false;
						for(var i of event.targets){
							var eff1=get.damageEffect(i,player,player);
							if(eff1<0) return false;
							if(i.hasShan()&&eff1>0) return true;
						}
						var sha=false;
						return player.getCardUsable({name:'sha'})<=0&&player.hasCard(function(card){
							if(!sha&&get.name(card)=='sha'&&player.getUseValue(card)>0){
								sha=true;
								return false;
							}
							return sha&&get.value(card)<=5;
						},'hs');
					}
					else{
						var eff1=get.effect(event.player,{name:'guohe_copy2'},player,player);
						var eff2=get.damageEffect(player,event.player,player);
						if(!player.hasShan()) return eff1>0;
						if(eff2>0) return eff1>0;
						return player.hp>2&&eff2<eff1;
					}
					return false;
				},
				logTarget:'player',
				shaRelated:true,
				content:function(){
					'step 0'
					if(player!=game.me&&!player.isOnline()&&!player.isUnderControl()) game.delayx();
					if(player==trigger.player) player.chooseToDiscard('he',true).set('ai',function(card){
						var player=_status.event.player;
						var val=player.getUseValue(card);
						if(get.name(card)=='sha'&&player.getUseValue(card)>0) val+=5;
						return 20-val;
					});
					else player.discardPlayerCard(trigger.player,true,'he');
					'step 1'
					trigger.directHit.addArray(game.players);
					if(player==trigger.player&&trigger.addCount!==false){
						trigger.addCount=false;
						player.getStat().card.sha--;
					}
				},
			},
			xiangshu:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				limited:true,
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return (player.getStat('damage')||0)>0&&game.hasPlayer((current)=>current.isDamaged());
				},
				content:function(){
					'step 0'
					event.num=player.getStat('damage');
					player.chooseTarget('是否发动限定技【襄戍】？','令一名角色回复'+event.num+'点体力并摸'+get.cnNumber(event.num)+'张牌',function(card,player,target){
						return target.isDamaged();
					}).set('ai',function(target){
						var num=_status.event.getParent().num,player=_status.event.player;
						var att=get.attitude(player,target);
						if(att>0&&num>=Math.min(player.hp,2)) return att*Math.sqrt(target.getDamagedHp());
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.awakenSkill('xiangshu');
						player.logSkill('xiangshu',target);
						target.recover(num);
						target.draw(num);
						if(player!=target) player.addExpose(0.2);
					}
				},
			},
			//张瑶
			//Partly powered by 烟雨墨染
			yuanyu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(player.countCards('h')>0){
						var suits=lib.suit.slice(0),cards=player.getExpansions('yuanyu');
						for(var i of cards) suits.remove(get.suit(i,false));
						var str='选择一张手牌，作为“怨”置于武将牌上；同时选择一名其他角色，令该角色获得〖怨语〗的后续效果。'
						if(suits.length){
							str+='目前“怨”中未包含的花色：';
							for(var i of suits) str+=get.translation(i);
						}
						player.chooseCardTarget({
							filterCard:true,
							filterTarget:lib.filter.notMe,
							position:'h',
							prompt:'怨语：选择置于武将牌上的牌和目标',
							prompt2:str,
							suits:suits,
							forced:true,
							ai1:function(card){
								var val=get.value(card),evt=_status.event;
								if(evt.suits.contains(get.suit(card,false))) return 8-get.value(card);
								return 5-get.value(card);
							},
							ai2:function(target){
								var player=_status.event.player;
								if(player.storage.yuanyu_damage&&player.storage.yuanyu_damage.contains(target)) return 0;
								return -get.attitude(player,target);
							},
						});
					}
					else event.finish();
					'step 2'
					var target=result.targets[0];
					player.addSkill('yuanyu_damage');
					player.markAuto('yuanyu_damage',result.targets);
					player.line(target,'green');
					if(!target.storage.yuanyu_mark){
						target.storage.yuanyu_mark=player;
						target.markSkillCharacter('yuanyu_mark',player,'怨语','已获得〖怨语〗效果');
						target.addSkill('yuanyu_mark');
					}
					player.addToExpansion(result.cards,player,'give').gaintag.add('yuanyu');
				},
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					player.removeSkill('yuanyu_damage');
				},
				ai:{
					order:7,
					result:{
						player:1,
					},
				},
				subSkill:{
					mark:{
						mark:'character',
						intro:{
							content:'已获得〖怨语〗效果',
							onunmark:true,
						},
					},
					damage:{
						trigger:{global:'damageSource'},
						forced:true,
						charlotte:true,
						onremove:function(player,skill){
							if(player.storage[skill]){
								for(var i of player.storage[skill]){
									if(i.storage.yuanyu_mark==player) i.unmarkSkill('yuanyu_mark');
								}
							}
							delete player.storage[skill];
						},
						filter:function(event,player){
							var source=event.source;
							return source&&player.getStorage('yuanyu_damage').contains(source)&&source.countCards('h')>0;
						},
						content:function(){
							'step 0'
							event.count=trigger.num;
							event.target=trigger.source;
							'step 1'
							event.count--;
							var suits=lib.suit.slice(0),cards=player.getExpansions('yuanyu');
							for(var i of cards) suits.remove(get.suit(i,false));
							var next=target.chooseCard('h',true,'将一张手牌置于'+get.translation(target)+'的武将牌上');
							next.set('suits',suits);
							next.set('ai',function(card){
								var val=get.value(card),evt=_status.event;
								if(evt.suits.contains(get.suit(card,false))) return 5-get.value(card);
								return 8-get.value(card);
							});
							if(suits.length){
								var str='目前未包含的花色：';
								for(var i of suits) str+=get.translation(i);
								next.set('prompt2',str);
							}
							'step 2'
							player.addToExpansion(result.cards,target,'give').gaintag.add('yuanyu');
							'step 3'
							if(event.count>0&&target.countCards('he')>0&&player.hasSkill('yuanyu_damage')) event.goto(1);
						},
					},
				},
			},
			xiyan:{
				audio:2,
				trigger:{player:'addToExpansionAfter'},
				filter:function(event,player){
					if(!event.gaintag.contains('yuanyu')) return false;
					var cards=player.getExpansions('yuanyu');
					if(cards.length<lib.suit.length) return false;
					var suits=lib.suit.slice(0);
					for(var i of cards){
						suits.remove(get.suit(i));
						if(!suits.length) return true;
					}
					return false;
				},
				logTarget:()=>_status.currentPhase,
				forced:true,
				content:function(){
					'step 0'
					player.removeSkill('yuanyu_damage');
					var cards=player.getExpansions('yuanyu');
					player.gain(cards,'gain2');
					'step 1'
					var target=_status.currentPhase;
					if(player==target){
						player.addMark('xiyan_buff',4,false);
						player.addTempSkill('xiyan_buff');
					}
					else{
						target.addMark('xiyan_debuff',4,false);
						target.addTempSkill('xiyan_debuff');
					}
				},
				subSkill:{
					buff:{
						charlotte:true,
						mark:true,
						marktext:" +4 ",
						intro:{
							content:"本回合手牌上限+4且使用牌无次数限制",
						},
						mod:{
							maxHandcard:function(player,num){
								return num+player.countMark('xiyan_buff');
							},
							cardUsable:function(card,player){
								return Infinity;
							},
						},
						sub:true,
					},
					debuff:{
						charlotte:true,
						mark:true,
						marktext:" -4 ",
						intro:{
							content:"本回合手牌上限-#且不能使用基本牌",
						},
						mod:{
							maxHandcard:function(player,num){
								return num-player.countMark('xiyan_debuff');
							},
							cardEnabled:function(card){
								if(get.type(card)=='basic') return false;
							},
							cardSavable:function(card){
								if(get.type(card)=='basic') return false;
							},
						},
						sub:true,
					},
				},
			},
			//滕公主
			xingchong:{
				audio:2,
				trigger:{global:'roundStart'},
				direct:true,
				filter:function(event,player){
					return player.maxHp>0;
				},
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<=Math.min(5,player.maxHp);i++){
						list.push(get.cnNumber(i)+'张');
					}
					list.push('cancel2');
					player.chooseControl(list).set('prompt',get.prompt('xingchong')).set('prompt2','请首先选择摸牌的张数').set('ai',function(){
						var player=_status.event.player,num1=player.maxHp,num2=player.countCards('h');
						if(num1<=num2) return 0;
						return Math.ceil((num1-num2)/2);
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('xingchong');
						var num2=result.index;
						if(num2>0) player.draw(num2);
						var num=Math.min(5,player.maxHp)-num2;
						if(num==0) event.finish();
						else event.num=num;
					}
					else event.finish();
					'step 2'
					if(player.countCards('h')>0){
						player.chooseCard('h',[1,Math.min(player.countCards('h'),event.num)],'请选择要展示的牌').set('ai',()=>1+Math.random());
					}
					else event.finish();
					'step 3'
					if(result.bool){
						var cards=result.cards;
						player.showCards(cards,get.translation(player)+'发动了【幸宠】');
						player.addGaintag(cards,'xingchong');
						player.addTempSkill('xingchong_effect','roundStart');
					}
				},
				subSkill:{
					effect:{
						audio:'xingchong',
						trigger:{
							player:['loseAfter'],
							global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
						},
						filter:function(event,player){
							var evt=event.getl(player);
							if(!evt||!evt.cards2||!evt.cards2.length) return false;
							if(event.name=='lose'){
								for(var i in event.gaintag_map){
									if(event.gaintag_map[i].contains('xingchong')) return true;
								}
								return false;
							}
							return player.hasHistory('lose',function(evt){
								if(event!=evt.getParent()) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('xingchong')) return true;
								}
								return false;
							});
						},
						forced:true,
						popup:false,
						charlotte:true,
						onremove:function(player){
							player.removeGaintag('xingchong');
						},
						content:function(){
							'step 0'
							if(trigger.delay===false) game.delayx();
							'step 1'
							player.logSkill('xingchong_effect');
							var num=0;
							if(trigger.name=='lose'){
								for(var i in trigger.gaintag_map){
									if(trigger.gaintag_map[i].contains('xingchong')) num++;
								}
							}
							else player.getHistory('lose',function(evt){
								if(trigger!=evt.getParent()) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('xingchong')) num++;
								}
							});
							player.draw(2*num);
						},
					},
				},
			},
			liunian:{
				audio:2,
				trigger:{global:'washCard'},
				forced:true,
				filter:function(event,player){
					return game.shuffleNumber<=2;
				},
				content:function(){
					if(game.shuffleNumber==1) player.addTempSkill('liunian_shuffle1');
					else player.addTempSkill('liunian_shuffle2');
					game.delayx();
				},
				subSkill:{
					shuffle1:{
						charlotte:true,
						forced:true,
						trigger:{global:'phaseEnd'},
						content:function(){
							player.gainMaxHp();
							game.delayx();
						},
					},
					shuffle2:{
						charlotte:true,
						forced:true,
						trigger:{global:'phaseEnd'},
						content:function(){
							'step 0'
							player.recover();
							game.delayx();
							'step 1'
							player.addSkill('liunian_effect');
							player.addMark('liunian_effect',10,false);
						},
					},
					effect:{
						charlotte:true,
						mod:{
							maxHandcard:function(player,num){
								return num+player.countMark('liunian_effect');
							},
						},
						marktext:'年',
						intro:{
							content:'手牌上限+#',
						},
					},
				},
			},
			//黄承彦
			dcjiezhen:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					var skills=target.getSkills(null,false,false).filter(function(i){
						if(i=='bazhen') return;
						var info=get.info(i);
						return info&&!get.is.locked(i)&&!info.limited&&!info.juexingji&&!info.zhuSkill&&!info.charlotte;
					});
					target.addAdditionalSkill('dcjiezhen_blocker','bazhen');
					target.addSkill('dcjiezhen_blocker');
					target.markAuto('dcjiezhen_blocker',skills);
					player.addSkill('dcjiezhen_clear');
					player.markAuto('dcjiezhen_clear',[target]);
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var skills=target.getSkills(null,false,false).filter(function(i){
								if(i=='bazhen') return;
								var info=get.info(i);
								return info&&!get.is.locked(i)&&!info.limited&&!info.juexingji&&!info.zhuSkill&&!info.charlotte;
							});
							if(!skills.length&&target.isEmpty(2)) return 1;
							return -0.5*skills.length;
						},
					},
				},
				subSkill:{
					blocker:{
						charlotte:true,
						init:function(player,skill){
							player.addSkillBlocker(skill);
						},
						onremove:function(player,skill){
							player.removeSkillBlocker(skill);
							player.removeAdditionalSkill(skill);
							delete player.storage.dcjiezhen_blocker;
						},
						charlotte:true,
						locked:true,
						skillBlocker:function(skill,player){
							return skill!='bazhen'&&skill!='dcjiezhen_blocker'&&!lib.skill[skill].charlotte&&player.getStorage('dcjiezhen_blocker').contains(skill);
						},
						mark:true,
						marktext:'阵',
						intro:{
							content:function(storage,player,skill){
								if(storage.length) return '失效技能：'+get.translation(storage);
								return '无失效技能';
							}
						}
					},
					clear:{
						audio:'dcjiezhen',
						charlotte:true,
						trigger:{
							global:['judgeAfter','die'],
							player:'phaseBegin',
						},
						forced:true,
						forceDie:true,
						onremove:true,
						filter:function(event,player){
							if(event.name=='die'){
								return player==event.player||player.getStorage('dcjiezhen_clear').contains(event.player);
							}
							else if(event.name=='judge'){
								return event.skill=='bagua'&&player.getStorage('dcjiezhen_clear').contains(event.player);
							}
							return player.getStorage('dcjiezhen_clear').length>0;
						},
						logTarget:function(event,player){
							if(event.name!='phase') return event.player;
							return player.getStorage('dcjiezhen_clear');
						},
						content:function(){
							'step 0'
							var targets=player.getStorage('dcjiezhen_clear');
							if(trigger.name=='die'&&player==trigger.player){
								for(var target of targets){
									target.removeSkill('dcjiezhen_blocker');
								}
								player.removeSkill('dcjiezhen_clear');
								event.finish();
								return;
							}
							if(trigger.name=='phase') event.targets=targets.slice(0).sortBySeat();
							else event.targets=[trigger.player];
							'step 1'
							var target=targets.shift();
							var storage=player.getStorage('dcjiezhen_clear');
							if(storage.contains(target)){
								storage.remove(target);
								target.removeSkill('dcjiezhen_blocker');
								if(target.isAlive()&&target.countGainableCards(player,'hej')>0) player.gainPlayerCard(target,'hej',true);
							}
							if(targets.length>0){
								event.redo();
							}
							else{
								player.removeSkill('dcjiezhen_clear');
							}
						},
					},
				},
				derivation:'bazhen',
			},
			dczecai:{
				audio:2,
				trigger:{global:'roundStart'},
				limited:true,
				skillAnimation:true,
				direct:true,
				animationColor:'soil',
				filter:function(event,player){
					return game.roundNumber>1;
				},
				getMax:function(){
					var getNum=function(current){
						var history=current.actionHistory;
						var num=0;
						for(var i=history.length-1;i>=0;i--){
							for(var j=0;j<history[i].useCard.length;j++){
								if(get.type2(history[i].useCard[j].card,false)=='trick') num++;
							}
							if(history[i].isRound) break;
						}
						return num;
					};
					var max=0,current=false,targets=game.filterPlayer();
					for(var target of targets){
						var num=getNum(target);
						if(num>max){
							max=num;
							current=target;
						}
						else if(num==max) current=false;
					}
					return current;
				},
				content:function(){
					'step 0'
					event.target=lib.skill.dczecai.getMax();
					var str='令一名其他角色于本轮内获得〖集智〗';
					if(event.target&&event.target!=player) str+=('；若选择的目标为'+get.translation(event.target)+'，则其获得一个额外的回合');
					player.chooseTarget(lib.filter.notMe,get.prompt('dczecai'),str).set('maximum',event.target).set('ai',function(card,player,target){
						if(target!=_status.event.maximum) return 0;
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						player.awakenSkill('dczecai');
						var target=result.targets[0];
						player.logSkill('dczecai',target);
						target.addAdditionalSkill('dczecai_effect','rejizhi');
						target.addTempSkill('dczecai_effect','roundStart');
						if(target==event.target){
							var evt=trigger._trigger;
							target.insertPhase();
							if(evt.player!=target&&!evt._finished){
								evt.finish();
								evt._triggered=5;
								evt.player.insertPhase();
							}
						}
					}
				},
				derivation:'rejizhi',
				subSkill:{
					effect:{
						charlotte:true,
						mark:true,
						marktext:'才',
						intro:{content:'已拥有技能〖集智〗'},
					},
				},
			},
			dcyinshi:{
				audio:2,
				trigger:{player:'damageBegin'},
				usable:1,
				filter:function(event,player){
					return !event.card||get.color(event.card)=='none';
				},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				group:'dcyinshi_gain',
				subSkill:{
					gain:{
						audio:'dcyinshi',
						trigger:{global:'judgeEnd'},
						forced:true,
						filter:function(event,player){
							return event.skill=='bagua'&&event.result.card&&get.position(event.result.card,true)=='o';
						},
						content:function(){
							player.gain(trigger.result.card,'gain2');
						},
					},
				},
			},
			//来莺儿
			xiaowu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				selectTarget:function(){
					return [1,game.countPlayer()-1];
				},
				complexSelect:true,
				complexTarget:true,
				filterTarget:function(card,player,target){
					if(player==target) return false;
					var next=player.getNext(),prev=player.getPrevious();
					var selected=ui.selected.targets;
					if(!selected.contains(next)&&!selected.contains(prev)) return (target==next||target==prev);
					for(var i of selected){
					 if(i.getNext()==target||i.getPrevious()==target) return true;
					}
					return false;
				},
				contentBefore:function(){
					event.getParent()._xiaowu_targets=[];
				},
				content:function(){
					'step 0'
					if(!target.isIn()){
						event.finish();
						return;
					}
					target.chooseControl().set('choiceList',[
						'令'+get.translation(player)+'摸一张牌',
						'令自己摸一张牌',
					]).set('ai',function(){
						var player=_status.event.player,target=_status.event.getParent().player;
						var all=_status.event.getParent().targets.length,dam=_status.event.getParent(2)._xiaowu_targets.length;
						if(get.attitude(player,target)>0||dam>=Math.floor(all/2)) return 0;
						return 1;
					});
					'step 1'
					if(result.index==0){
						player.draw();
					}
					else{
						target.draw();
						event.getParent()._xiaowu_targets.push(target);
					}
				},
				contentAfter:function(){
					var targetsx=event.getParent()._xiaowu_targets;
					var num=(targets.length-targetsx.length-targetsx.length);
					if(num>0) player.addMark('shawu',1);
					else if(num<0){
						player.line(targetsx,'fire');
						for(var i of targetsx) i.damage();
					}
				},
				ai:{
					order:8,
					result:{player:1},
				},
			},
			huaping:{
				audio:'huaping',
				trigger:{global:'die'},
				limited:true,
				skillAnimation:true,
				animationColor:'fire',
				filter:function(event,player){
					return player!=event.player;
				},
				logTarget:'player',
				check:function(event,player){
					return get.rank(event.player.name,true)>=5;
				},
				content:function(){
					player.awakenSkill('huaping');
					var skills=trigger.player.getSkills(null,false,false).filter(function(i){
						var info=get.info(i);
						return info&&!info.charlotte;
					});
					if(skills.length){
						for(var i of skills) player.addSkillLog(i);
					}
					player.removeSkill('xiaowu');
					var num=player.countMark('shawu');
					if(num>0){
						player.removeMark('shawu',num);
						player.draw(num);
					}
				},
				group:'huaping_give',
				subSkill:{
					give:{
						audio:'huaping',
						trigger:{player:'die'},
						direct:true,
						filter:function(event,player){
							return event.player==player;
						},
						forceDie:true,
						skillAnimation:true,
						animationColor:'gray',
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('huaping'),'令一名其他角色获得〖沙舞〗',lib.filter.notMe).set('forceDie',true).set('ai',function(target){
								return get.attitude(_status.event.player,target)+100;
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.awakenSkill('huaping');
								player.logSkill('huaping_give',target);
								target.addSkill('shawu');
								var num=player.countMark('shawu');
								if(num>0){
									player.removeMark('shawu',num);
									target.addMark('shawu',num);
								}
							}
						},
					},
				},
				derivation:'shawu',
			},
			shawu:{
				audio:2,
				trigger:{player:'useCardToTargeted'},
				shaRelated:true,
				direct:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.player.isIn()&&(player.hasMark('shawu')||player.countCards('h',function(card){
						return lib.filter.cardDiscardable(card,player,'shawu');
					})>1);
				},
				content:function(){
					'step 0'
					var list=[];
					if(player.countCards('h',function(card){
						return lib.filter.cardDiscardable(card,player,'shawu');
					})>1) list.push('弃置手牌');
					if(player.hasMark('shawu')) list.push('移除标记');
					list.push('cancel2');
					player.chooseControl(list).set('prompt',get.prompt('shawu',trigger.target)).set('prompt2','弃置两张手牌，或移去一枚“沙”并摸两张牌，然后对该角色造成1点伤害').set('ai',function(){
						var player=_status.event.player,target=_status.event.getTrigger().target;
						if(get.damageEffect(target,player,player)<=0) return 'cancel2';
						if(player.hasMark('shawu')) return '移除标记';
						if(player.countCards('h',function(card){
							return lib.filter.cardDiscardable(card,player,'shawu')&&get.value(card)<=6.5;
						})>1) return '弃置手牌';
						return 'cancel2';
					});
					'step 1'
					var target=trigger.target;
					if(result.control=='cancel2'){
						event.finish();
						return;
					}
					else if(result.control=='移除标记'){
						player.logSkill('shawu',target);
						player.removeMark('shawu',1);
						player.draw(2);
						target.damage();
						event.finish();
					}
					else{
						player.chooseToDiscard('h',true,2).logSkill=['shawu',target];
					}
					'step 2'
					trigger.target.damage();
				},
				intro:{
					content:'mark',
				},
			},
			//曹髦
			qianlong:{
				audio:2,
				trigger:{player:'damageEnd'},
				frequent:true,
				content:function(){
					'step 0'
					var cards=get.cards(3);
					event.cards=cards;
					game.cardsGotoOrdering(cards);
					//展示牌
					game.log(player,'展示了',event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						if(player==game.me||player.isUnderControl()) return;
						var str=get.translation(player)+'发动了【潜龙】';
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					game.addVideo('showCards',player,[get.translation(player)+'发动了【潜龙】',get.cardsInfo(event.cards)]);
					if(player!=game.me&&!player.isUnderControl()&&!player.isOnline()) game.delay(2);
					//选牌
					var next=player.chooseToMove('潜龙：获得至多'+get.cnNumber(Math.min(3,player.getDamagedHp()))+'张牌并将其余牌置于牌堆底');
					next.set('list',[
						['置于牌堆底',cards],
						['自己获得'],
					])
					next.set('filterMove',function(from,to,moved){
						if(moved[0].contains(from.link)){
							if(typeof to=='number'){
								if(to==1){
									if(moved[1].length>=_status.event.player.getDamagedHp()) return false;
								}
								return true;
							}
						}
						return true;
					});
					next.set('processAI',function(list){
						var cards=list[0][1].slice(0).sort(function(a,b){
							if(b.name=='sha') return 1;
							return get.value(b)-get.value(a);
						});
						return [cards,cards.splice(0,_status.event.player.getDamagedHp())];
					});
					'step 1'
					game.broadcastAll('closeDialog',event.videoId);
					game.addVideo('cardDialog',null,event.videoId);
					var moved=result.moved;
					if(moved[0].length>0){
						for(var i of moved[0]){
							i.fix();
							ui.cardPile.appendChild(i);
						}
					}
					if(moved[1].length>0) player.gain(moved[1],'gain2');
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return;
								if(!target.hasFriend()) return;
								var num=1;
								if(!player.needsToDiscard()&&target.isDamaged()){
									num=0.7;
								}
								else{
									num=0.5;
								}
								if(target.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						}
					}
				}
			},
			fensi:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				content:function(){
					'step 0'
					if(!game.hasPlayer(function(current){
						return current!=player&&current.hp>=player.hp;
					})){
						player.damage();
						event.finish();
						return;
					}
					else{
						player.chooseTarget(true,'忿肆：对一名体力值不小于你的角色造成1点伤害',function(card,player,target){
							return target.hp>=player.hp;
						}).set('ai',function(target){
							var player=_status.event.player;
							return get.damageEffect(target,player,player);
						});
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target,'green');
						target.damage();
					}
					else event.finish();
					'step 2'
					if(target.isIn()&&target.canUse('sha',player,false)) target.useCard({name:'sha',isCard:true},player,false,'noai');
				},
			},
			juetao:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				limited:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.hp==1;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('juetao'),lib.filter.notMe).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('juetao',target);
						player.awakenSkill('juetao');
					}
					else event.finish();
					'step 2'
					var card=get.bottomCards()[0];
					game.cardsGotoOrdering(card);
					player.showCards(card);
					player.chooseUseTarget(card,true,false,'nodistance').set('filterTarget',function(card,player,target){
						var evt=_status.event;
						if(_status.event.name=='chooseTarget') evt=evt.getParent();
						if(target!=player&&target!=evt.juetao_target) return false;
						return lib.filter.targetEnabledx(card,player,target);
					}).set('juetao_target',target);
					'step 3'
					if(result.bool&&target.isIn()) event.goto(2);
				},
			},
			zhushi:{
				audio:2,
				usable:1,
				trigger:{global:'recoverEnd'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&event.player.group=='wei'&&event.player==_status.currentPhase&&
					event.player.isIn()&&player.hasZhuSkill('zhushi',event.player);
				},
				content:function(){
					'step 0'
					var str=get.translation(player);
					trigger.player.chooseBool('是否响应'+get.translation(player)+'的主公技【助势】？','令'+get.translation(player)+'摸一张牌').set('goon',get.attitude(trigger.player,player)>0).set('ai',()=>_status.event.goon);
					'step 1'
					if(result.bool){
						player.logSkill('zhushi');
						trigger.player.line(player,'thunder');
						player.draw();
					}
					else player.storage.counttrigger.zhushi--;
				},
			},
			//高览
			xizhen:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&(player.canUse('sha',current,false)||player.canUse('juedou',current,false));
					})
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('xizhen'),'视为对一名角色使用【杀】或【决斗】',function(card,player,target){
						return target!=player&&(player.canUse('sha',target,false)||player.canUse('juedou',target,false));
					}).set('ai',function(target){
						var player=_status.event.player;
						var eff1=0,eff2=0;
						if(player.canUse('sha',target,false)) eff1=get.effect(target,{name:'sha'},player,player);
						if(player.canUse('juedou',target,false)) eff2=get.effect(target,{name:'juedou'},player,player);
						var effx=Math.max(eff1,eff2);
						if(effx<=0) return 0;
						if(target.isHealthy()) effx*=3;
						if(get.attitude(player,target)>0) effx*=1.6;
						return effx;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('xizhen',target);
						var list=[];
						if(player.canUse('sha',target,false)) list.push('sha');
						if(player.canUse('juedou',target,false)) list.push('juedou');
						if(list.length==1) event._result={control:list[0]};
						else player.chooseControl(list).set('prompt','视为对'+get.translation(target)+'使用…').set('ai',function(){
							var player=_status.event.player,target=_status.event.getParent().target;
							var eff1=get.effect(target,{name:'sha'},player,player),eff2=get.effect(target,{name:'juedou'},player,player);
							return eff1>eff2?0:1;
						});
					}
					else event.finish();
					'step 2'
					player.useCard({name:result.control,isCard:true},target,false);
					'step 3'
					if(target.isIn()){
						player.storage.xizhen_effect=target;
						player.addTempSkill('xizhen_effect','phaseUseAfter');
					}
				},
				subSkill:{
					effect:{
						audio:'xizhen',
						charlotte:true,
						onremove:true,
						trigger:{global:['useCard','respond']},
						logTarget:function(event,player){
							return player.storage.xizhen_effect;
						},
						forced:true,
						filter:function(event,player){
							return Array.isArray(event.respondTo)&&event.respondTo[0]==player&&player.storage.xizhen_effect&&player.storage.xizhen_effect.isIn();
						},
						content:function(){
							'step 0'
							var target=player.storage.xizhen_effect;
							event.target=target;
							target.recover();
							'step 1'
							player.draw(target.isHealthy()?2:1);
						},
						mark:'character',
						intro:{content:'已指定$为目标'},
					},
				},
			},
			//管宁
			dunshi:{
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				usable:1,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[['sha','shan','tao','jiu'],0];
				},
				hiddenCard:function(player,name){
					if(player.storage.dunshi&&player.storage.dunshi[0].contains(name)&&!player.getStat('skill').dunshi) return true;
					return false;
				},
				marktext:'席',
				mark:true,
				intro:{
					markcount:function(storage){
						return storage[1];
					},
					content:function(storage,player){
						if(!storage) return;
						var str='<li>';
						if(!storage[0].length){
							str+='已无可用牌';
						}
						else{
							str+='剩余可用牌：';
							str+=get.translation(storage[0]);
						}
						str+='<br><li>“席”标记数量：';
						str+=(storage[1]);
						return str;
					},
				},
				filter:function(event,player){
					if(event.type=='wuxie') return false;
					var storage=player.storage.dunshi;
					if(!storage||!storage[0].length) return false;
					for(var i of storage[0]){
						var card={name:i,isCard:true};
						if(event.filterCard(card,player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						var storage=player.storage.dunshi;
						for(var i of storage[0]) list.push(['基本','',i]);
						return ui.create.dialog('遁世',[list,'vcard'],'hidden');
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						return evt.filterCard({name:button.link[2],isCard:true},player,evt);
					},
					check:function(button){
						var card={name:button.link[2]},player=_status.event.player;
						if(_status.event.getParent().type!='phase') return 1;
						if(card.name=='jiu') return 0;
						if(card.name=='sha'&&player.hasSkill('jiu')) return 0;
						return player.getUseValue(card,null,true);
					},
					backup:function(links,player){
						return {
							audio:'dunshi',
							filterCard:function(){return false},
							popname:true,
							viewAs:{
								name:links[0][2],
								isCard:true,
							},
							selectCard:-1,
							precontent:function(){
								player.addTempSkill('dunshi_damage');
								player.storage.dunshi_damage=event.result.card.name;
							},
						}
					},
					prompt:function(links,player){
						return '选择【'+get.translation(links[0][2])+'】的目标';
					}
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag,arg){
						var storage=player.storage.dunshi;
						if(!storage||!storage[0].length) return false;
						if(player.getStat('skill').dunshi) return false;
						switch(tag){
							case 'respondSha': return (_status.event.type!='phase'||(player==game.me||player.isUnderControl()||player.isOnline()))&&storage[0].contains('sha');
							case 'respondShan': return storage[0].contains('shan');
							case 'save':
								if(arg==player&&storage[0].contains('jiu')) return true;
								return storage[0].contains('tao');
						}
					},
					order:2,
					result:{
						player:function(player){
							if(_status.event.type=='dying'){
								return get.attitude(player,_status.event.dying);
							}
							return 1;
						},
					},
				},
				initList:function(){
					var list,skills=[];
					var banned=['xunyi'];
					if(get.mode()=='guozhan'){
						list=[];
						for(var i in lib.characterPack.mode_guozhan) list.push(i);
					}
					else if(_status.connectMode) list=get.charactersOL();
					else{
						list=[];
						for(var i in lib.character){
							if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
							list.push(i);
						}
					}
					for(var i of list){
						if(i.indexOf('gz_jun')==0) continue;
						for(var j of lib.character[i][3]){
							var skill=lib.skill[j];
							if(!skill||skill.zhuSkill||banned.contains(j)) continue;
							if(skill.ai&&(skill.ai.combo||skill.ai.notemp||skill.ai.neg)) continue;
							var info=get.translation(j);
							for(var ix=0;ix<info.length;ix++){
								if(/仁|义|礼|智|信/.test(info[ix])==true){
									skills.add(j);
									break;
								}
							}
						}
					}
					_status.dunshi_list=skills;
				},
				subSkill:{
					backup:{audio:'dunshi'},
					damage:{
						audio:'dunshi',
						trigger:{global:'damageBegin2'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							return event.source==_status.currentPhase;
						},
						onremove:true,
						logTarget:'source',
						content:function(){
							'step 0'
							event.cardname=player.storage.dunshi_damage;
							player.removeSkill('dunshi_damage');
							event.target=trigger.source;
							event.videoId=lib.status.videoId++;
							var func=function(card,id,card2,card3){
								var list=[
									'防止即将对'+card3+'造成的伤害，并令'+card+'获得一个技能名中包含“仁/义/礼/智/信”的技能',
									'从〖遁世〗中删除【'+card2+'】并获得一枚“席”',
									'减1点体力上限，然后摸等同于“席”数的牌',
								];
								var choiceList=ui.create.dialog('遁世：请选择两项');
								choiceList.videoId=id;
								for(var i=0;i<list.length;i++){
									var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
									str+=list[i];
									str+='</div>';
									var next=choiceList.add(str);
									next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
									next.firstChild.link=i;
									for(var j in lib.element.button){
										next[j]=lib.element.button[j];
									}
									choiceList.buttons.add(next.firstChild);
								}
								return choiceList;
							};
							if(player.isOnline2()){
								player.send(func,get.translation(trigger.source),event.videoId,get.translation(event.cardname),get.translation(trigger.player));
							}
							event.dialog=func(get.translation(trigger.source),event.videoId,get.translation(event.cardname),get.translation(trigger.player));
							if(player!=game.me||_status.auto){
								event.dialog.style.display='none';
							}
							var next=player.chooseButton();
							next.set('dialog',event.videoId);
							next.set('forced',true);
							next.set('selectButton',2);
							next.set('ai',function(button){
								var player=_status.event.player;
								switch(button.link){
									case 0:
										if(get.attitude(player,_status.currentPhase)>0) return 3;
										return 0;
									case 1:
										return 1;
									case 2:
										var num=player.storage.dunshi[1];
										for(var i of ui.selected.buttons){
											if(i.link==1) num++;
										}
										if(num>0&&player.isDamaged()) return 2;
										return 0;
								}
							});
							'step 1'
							if(player.isOnline2()){
								player.send('closeDialog',event.videoId);
							}
							event.dialog.close();
							event.links=result.links.sort();
							for(var i of event.links){
								game.log(player,'选择了','#g【遁世】','的','#y选项'+get.cnNumber(i+1,true));
							}
							if(event.links.contains(0)){
								trigger.cancel();
								if(!_status.dunshi_list) lib.skill.dunshi.initList();
								var list=_status.dunshi_list.filter(function(i){
									return !target.hasSkill(i,null,null,false);
								}).randomGets(3);
								if(list.length==0) event.goto(3);
								else{
									event.videoId=lib.status.videoId++;
									var func=function(skills,id){
										var dialog=ui.create.dialog('forcebutton');
										dialog.videoId=id;
										dialog.add('令'+get.translation(target)+'获得一个技能');
										for(var i=0;i<skills.length;i++){
											dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+get.translation(skills[i])+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
										}
										dialog.addText(' <br> ');
									}
									if(player.isOnline()) player.send(func,list,event.videoId);
									else if(player==game.me) func(list,event.videoId);
									player.chooseControl(list).set('ai',function(){
										var controls=_status.event.controls;
										if(controls.contains('cslilu')) return 'cslilu';
										return controls[0];
									});
								}
							}
							else event.goto(3);
							'step 2'
							game.broadcastAll('closeDialog',event.videoId);
							target.addSkillLog(result.control);
							'step 3'
							var storage=player.storage.dunshi;
							if(event.links.contains(1)){
								storage[0].remove(event.cardname);
								storage[1]++;
								player.markSkill('dunshi');
							}
							if(event.links.contains(2)){
								player.loseMaxHp();
								if(storage[1]>0) player.draw(storage[1]);
							}
						},
					},
				},
			},
			//滕胤
			chenjian:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				prompt2:function(event,player){
					return '展示牌堆顶的'+get.cnNumber(3+player.countMark('chenjian'))+'张牌。然后你可依次执行以下两项中的任意项：⒈弃置一张牌，然后令一名角色获得与你弃置牌花色相同的牌。⒉使用其中剩余的一张牌。若你执行了所有选项，则你获得一枚“陈见”，然后重铸所有手牌。';
				},
				content:function(){
					'step 0'
					var cards=get.cards(3+player.countMark('chenjian'));
					event.cards=cards;
					game.cardsGotoOrdering(cards);
					game.log(player,'展示了',event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str=get.translation(player)+'发动了【陈见】';
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					game.addVideo('showCards',player,[get.translation(player)+'发动了【陈见】',get.cardsInfo(event.cards)]);
					game.delay(2);
					'step 1'
					if(!player.countCards('he')){
						game.broadcastAll('closeDialog',event.videoId);
						game.addVideo('cardDialog',null,event.videoId);
						event.goto(4);
					}
					else{
						player.chooseToDiscard('he').set('prompt',false).set('ai',function(card){
							var cards=_status.event.getParent().cards,val=-get.value(card),suit=get.suit(card);
							for(var i of cards){
								if(get.suit(i,false)==suit) val+=get.value(i,'raw');
							}
							return val;
						});
						var func=function(id){
							var dialog=get.idDialog(id);
							if(dialog) dialog.content.firstChild.innerHTML='是否弃置一张牌？';
						};
						if(player==game.me) func(event.videoId);
						else if(player.isOnline()) player.send(func,event.videoId);
					}
					'step 2'
					game.broadcastAll('closeDialog',event.videoId);
					game.addVideo('cardDialog',null,event.videoId);
					if(result.bool){
						event.goon1=true;
						var suit=get.suit(result.cards[0],player);
						var cards2=event.cards.filter(function(i){
							return get.suit(i,false)==suit;
						});
						if(cards2.length){
							event.cards2=cards2;
							player.chooseTarget(true,'选择一名角色获得'+get.translation(cards2)).set('ai',function(target){
								var att=get.attitude(_status.event.player,target);
								if(att>0){
									return att+Math.max(0,5-target.countCards('h'));
								}
								return att;
							});
						}
						else event.goto(4);
					}
					else event.goto(4);
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.gain(event.cards2,'gain2');
						event.cards.removeArray(event.cards2);
					}
					'step 4'
					var cards2=cards.filter(function(i){
						return player.hasUseTarget(i);
					});
					if(cards2.length) player.chooseButton(['是否使用其中的一张牌？',cards2]).set('ai',function(button){
						return player.getUseValue(button.link);
					});
					else event.finish();
					'step 5'
					if(result.bool){
						player.chooseUseTarget(true,result.links[0],false);
						event.goon2=true;
					}
					'step 6'
					if(event.goon1&&event.goon2){
						if(player.countMark('chenjian')<2) player.addMark('chenjian',1,false);
						var cards=player.getCards('h');
						player.loseToDiscardpile(cards);
						player.draw(cards.length);
					}
				},
				marktext:'见',
				intro:{content:'展示牌数量+#'},
			},
			xixiu:{
				mod:{
					canBeDiscarded:function(card,player,target){
						if(player!=target&&get.position(card)=='e'&&target.countCards('e')==1) return false;
					},
				},
				audio:2,
				trigger:{target:'useCardToTargeted'},
				forced:true,
				filter:function(event,player){
					if(player==event.player||!player.countCards('e')) return false;
					var suit=get.suit(event.card,false);
					if(suit=='none') return false;
					return player.hasCard(function(card){
						return get.suit(card,player)==suit;
					},'e');
				},
				content:function(){
					player.draw();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(typeof card=='object'&&player!=target){
								var suit=get.suit(card);
								if(suit=='none') return;
								if(player.hasCard(function(card){
									return get.suit(card,player)==suit;
								},'e')) return [1,0.08];
							}
						},
					},
				},
			},
			//朱灵
			dczhanyi:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					var list=['basic','trick','equip'];
					var list2=[];
					var hs=player.getCards('he');
					for(var card of hs){
						var type=get.type2(card,player);
						if(list.contains(type)){
							var bool=lib.filter.cardDiscardable(card,player,'dczhanyi');
							if(bool) list2.add(type);
							else{
								list.remove(type);
								list2.remove(type);
							}
						}
					}
					return list2.length>0;
				},
				content:function(){
					'step 0'
					var list=['basic','trick','equip'];
					var list2=[];
					var hs=player.getCards('he');
					for(var card of hs){
						var type=get.type2(card,player);
						if(list.contains(type)){
							var bool=lib.filter.cardDiscardable(card,player,'dczhanyi');
							if(bool) list2.add(type);
							else{
								list.remove(type);
								list2.remove(type);
							}
						}
					}
					player.chooseControl(list2,'cancel2').set('prompt',get.prompt('dczhanyi')).set('prompt2','弃置一种类型的所有牌').set('ai',function(){
						var player=_status.event.player;
						var getval=function(control){
							if(control=='cancel2') return 0;
							var hs=player.getCards('h'),eff=0;
							var es=player.getCards('e');
							var ss=player.getCards('s');
							var sha=player.getCardUsable({name:'sha'});
							for(var i of hs){
								var type=get.type2(i);
								if(type==control){
									eff-=get.value(i,player);
								}
								else{
									switch(type){
										case 'basic':
											if(sha>0&&get.name(card)=='sha'){
												sha--;
												var add=3;
												if(!player.hasValueTarget(card)&&player.hasValueTarget(card,false)) add+=player.getUseValue(card,false);
												eff+=add;
											}
											break
										case 'trick':
											if(player.hasValueTarget(card)) eff+=6;
											break;
										case 'equip':
											if(player.hasValueTarget({name:'guohe_copy2'})) eff+=player.getUseValue({name:'guohe_copy2'});
											break;
									}
								}
							}
							if(control=='equip'){
								for(var i of es) eff-=get.value(i,player);
							}
							else{
								for(var i of ss){
									var type=get.type2(i);
									if(type==control) continue;
									switch(type){
										case 'basic':
											if(sha>0&&get.name(card)=='sha'){
												sha--;
												var add=3;
												if(!player.hasValueTarget(card)&&player.hasValueTarget(card,false)) add+=player.getUseValue(card,false);
												eff+=add;
											}
											break
										case 'trick':
											if(player.hasValueTarget(card)) eff+=6;
											break;
										case 'equip':
											if(player.hasValueTarget({name:'guohe_copy2'})) eff+=player.getUseValue({name:'guohe_copy2'});
											break;
									}
								}
							}
							return eff;
						};
						var controls=_status.event.controls.slice(0);
						var eff=0,current='cancel2';
						for(var i of controls){
							var effx=getval(i);
							if(effx>eff){
								eff=effx;
								current=i;
							}
						}
						return current;
					});
					'step 1'
					var type=result.control;
					if(type!='cancel2'){
						event.type=type;
						var cards=player.getCards('he',function(card){
							return get.type2(card,player)==type;
						});
						if(cards.length){
							player.logSkill('dczhanyi');
							player.discard(cards);
						}
						else event.finish();
					}
					else event.finish();
					'step 2'
					var list=['basic','trick','equip'];
					for(var i of list){
						if(i!=event.type) player.addTempSkill('dczhanyi_'+i);
					}
				},
				subSkill:{
					basic:{
						charlotte:true,
						marktext:'基',
						mark:true,
						intro:{
							content:'使用基本牌无距离限制，且伤害值和回复值基数+1',
						},
						trigger:{source:['damageBegin1','recoverBegin']},
						forced:true,
						filter:function(event,player){
							var evt=event.getParent();
							return evt.type=='card'&&get.type(evt.card,false)=='basic';
						},
						logTarget:'player',
						content:function(){
							trigger.num++;
						},
						mod:{
							targetInRange:function(card){
								if(get.type(card)=='basic') return true;
							},
						},
						ai:{
							damageBonus:true,
						},
					},
					trick:{
						charlotte:true,
						marktext:'锦',
						mark:true,
						intro:{
							content:'使用锦囊牌时摸一张牌，且锦囊牌不计入本回合的手牌上限',
						},
						trigger:{player:'useCard'},
						forced:true,
						filter:function(event,player){
							return get.type2(event.card)=='trick';
						},
						content:function(){
							player.draw();
						},
						mod:{
							ignoredHandcard:function(card,player){
								if(get.type2(card,player)=='trick') return true;
							},
							cardDiscardable:function(card,player,name){
								if(name=='phaseDiscard'&&get.type2(card,player)=='trick') return false;
							}
						},
					},
					equip:{
						charlotte:true,
						marktext:'装',
						mark:true,
						intro:{
							content:'使用装备牌时，可弃置一名其他角色的一张牌',
						},
						trigger:{player:'useCard'},
						direct:true,
						filter:function(event,player){
							return get.type(event.card)=='equip'&&game.hasPlayer((target)=>(target!=player&&target.countDiscardableCards(player,'he')>0));
						},
						content:function(){
							'step 0'
							player.chooseTarget('战意：是否弃置一名其他角色的一张牌？',function(card,player,target){
								return target!=player&&target.countDiscardableCards(player,'he')>0;
							}).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,{name:'guohe_copy2'},player,player);
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('dczhanyi_equip',target);
								player.discardPlayerCard(target,'he',true);
							}
						},
					}
				},
			},
			//骆统
			renzheng:{
				audio:2,
				trigger:{global:['damageCancelled','damageZero','damageAfter']},
				forced:true,
				filter:function(event,player,name){
					if(name=='damageCancelled') return true;
					for(var i of event.change_history){
						if(i<0) return true;
					}
					return false;
				},
				content:function(){
					player.draw(2);
				},
			},
			jinjian:{
				audio:2,
				trigger:{source:'damageBegin1'},
				logTarget:'player',
				filter:function(event,player){
					return !event.jinjian_source2&&!player.hasSkill('jinjian_source2');
				},
				prompt2:'令即将对其造成的伤害+1',
				check:function(event,player){
					return get.attitude(player,event.player)<0&&!event.player.hasSkillTag('filterDamage',null,{
						player:player,
						card:event.card,
					});
				},
				content:function(){
					trigger.jinjian_source=true;
					trigger.num++;
					player.addTempSkill('jinjian_source2')
				},
				group:'jinjian_player',
				subSkill:{
					player:{
						audio:'jinjian',
						trigger:{player:'damageBegin3'},
						filter:function(event,player){
							return !event.jinjian_player2&&!player.hasSkill('jinjian_player2');
						},
						prompt2:'令即将受到的伤害-1',
						content:function(){
							trigger.jinjian_player=true;
							trigger.num--;
							player.addTempSkill('jinjian_player2')
						},
					},
					source2:{
						trigger:{source:'damageBegin1'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							return !event.jinjian_source;
						},
						content:function(){
							trigger.num--;
							trigger.jinjian_source2=true;
							player.removeSkill('jinjian_source2');
						},
						marktext:' -1 ',
						intro:{
							content:'下次造成的伤害-1',
						},
					},
					player2:{
						trigger:{player:'damageBegin3'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							return !event.jinjian_player;
						},
						content:function(){
							trigger.num++;
							trigger.jinjian_player2=true;
							player.removeSkill('jinjian_player2');
						},
						marktext:' +1 ',
						intro:{
							content:'下次受到的伤害+1',
						},
					},
				},
				ai:{
					maixie_defend:true,
					threaten:0.9,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing')) return;
							if(target.hujia) return;
							if(player._jinjian_tmp) return;
							if(_status.event.getParent('useCard',true)||_status.event.getParent('_wuxie',true)) return;
							if(get.tag(card,'damage')){
								if(target.hasSkill('jinjian_player2')){
									return [1,-2];
								}
								else{
									if(get.attitude(player,target)>0){
										return [0,0.2];
									}
									if(get.attitude(player,target)<0&&!player.hasSkillTag('damageBonus')){
										var sha=player.getCardUsable({name:'sha'});
										player._jinjian_tmp=true;
										var num=player.countCards('h',function(card){
											if(card.name=='sha'){
												if(sha==0){
													return false;
												}
												else{
													sha--;
												}
											}
											return get.tag(card,'damage')&&player.canUse(card,target)&&get.effect(target,card,player,player)>0;
										});
										delete player._jinjian_tmp;
										if(player.hasSkillTag('damage')){
											num++;
										}
										if(num<2){
											return [0,0.8];
										}
									}
								}
							}
						}
					}
				}
			},
			//吉本
			xunli:{
				audio:2,
				trigger:{global:'loseAfter'},
				forced:true,
				filter:function(event,player){
					if(event.type!='discard'||player.getExpansions('xunli').length>=9) return false;
					for(var i of event.cards){
						if(get.color(i,event.cards2.contains(i)?event.player:false)=='black') return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					var num=9-player.getExpansions('xunli').length;
					var cards=[];
					for(var i of trigger.cards){
						if(get.color(i,trigger.cards2.contains(i)?trigger.player:false)=='black') cards.push(i);
					}
					if(cards.length<=num) event._result={
						bool:true,
						links:cards,
					}
					else player.chooseButton(true,num,['寻疠：将'+get.cnNumber(num)+'张牌置于武将牌上',cards]).set('forceAuto',true).set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					'step 1'
					if(result.bool){
						player.addToExpansion('gain2',result.links).gaintag.add('xunli');
					}
				},
				marktext:'疠',
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				group:'xunli_exchange',
				subSkill:{
					exchange:{
						audio:'xunli',
						trigger:{player:'phaseUseBegin'},
						direct:true,
						filter:function(event,player){
							return player.getExpansions('xunli').length>0&&player.hasCard((card)=>get.color(card,player)=='black','h');
						},
						content:function(){
							"step 0"
							var cards=player.getExpansions('xunli');
							if(!cards.length||!player.countCards('h')){
								event.finish();
								return;
							}
							var next=player.chooseToMove('寻疠：是否交换“疠”和手牌？');
							next.set('list',[
								[get.translation(player)+'（你）的疠',cards],
								['手牌区',player.getCards('h',(card)=>get.color(card,player)=='black')],
							]);
							next.set('filterMove',function(from,to){
								return typeof to!='number';
							});
							next.set('processAI',function(list){
								var player=_status.event.player;
								var getv=function(card){
									if(get.info(card).toself) return 0;
									return player.getUseValue(card,false);
								};
								var cards=list[0][1].concat(list[1][1]).sort(function(a,b){
									return getv(b)-getv(a);
								}),cards2=cards.splice(0,player.getExpansions('xunli').length);
								return [cards2,cards];
							});
							"step 1"
							if(result.bool){
								var pushs=result.moved[0],gains=result.moved[1];
								pushs.removeArray(player.getExpansions('xunli'));
								gains.removeArray(player.getCards('h'));
								if(!pushs.length||pushs.length!=gains.length) return;
								player.logSkill('xunli_exchange');
								player.addToExpansion(pushs,player,'giveAuto').gaintag.add('xunli');
								game.log(player,'将',pushs,'作为“疠”置于武将牌上');
								player.gain(gains,'gain2');
							}
						},
					},
				},
			},
			zhishi:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('zhishi')).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att<=4) return 0;
						if(target.hasSkillTag('nogain')) att/=10;
						return att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zhishi',target);
						player.storage.zhishi_mark=target;
						player.addTempSkill('zhishi_mark',{player:'phaseBegin'});
					}
				},
				ai:{expose:0.3},
				subSkill:{
					mark:{
						trigger:{
							global:['dying','useCardToTargeted'],
						},
						direct:true,
						charlotte:true,
						filter:function(event,player){
							if(!player.getExpansions('xunli').length) return false;
							var target=player.storage.zhishi_mark;
							if(event.name=='dying') return event.player==target;
							return event.card.name=='sha'&&event.target==target;
						},
						content:function(){
							'step 0'
							var target=player.storage.zhishi_mark;
							event.target=target;
							player.chooseButton([get.prompt('zhishi',target),'<div class="text center">弃置任意张“疠”并令其摸等量的牌</div>',player.getExpansions('xunli')],[1,Infinity]).set('ai',function(button){
								var player=_status.event.player,target=player.storage.zhishi_mark;
								if(target.hp<1&&target!=get.zhu(player)) return 0;
								if(target.hasSkillTag('nogain')) return 0;
								return 3-player.getUseValue(card,false);
							});
							'step 1'
							if(result.bool){
								player.logSkill('zhishi',target);
								player.loseToDiscardpile(result.links);
								target.draw(result.links.length);
							}
						},
						mark:'character',
						intro:{
							content:'决定帮助$，具体帮不帮另说',
						},
					},
				},
			},
			lieyi:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.getExpansions('xunli').length>0;
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					var cards=player.getExpansions('xunli');
					var cards2=cards.filter(function(card){
						return target.isIn()&&player.canUse(card,target,false);
					});
					if(cards2.length){
						player.chooseButton(['对'+get.translation(target)+'使用一张牌',cards2],true).set('ai',function(button){
							return get.order(button.link);
						});
					}
					else{
						event.finish();
						if(cards.length) player.loseToDiscardpile(cards);
						if(target.isAlive()&&!target.hasHistory('damage',function(evt){
							return evt.getParent('lieyi')==event&&evt._dyinged;
						})) player.loseHp();
					}
					'step 1'
					player.useCard(result.links[0],target,false);
					event.goto(0);
				},
				ai:{
					order:2,
					result:{
						target:function(player,target){
							var cards=player.getExpansions('xunli');
							var effect=0,damage=0;
							for(var i of cards){
								if(player.canUse(i,target,false)){
									effect+=get.effect(target,i,player,target);
									damage+=get.tag(i,'damage');
								}
							}
							if(damage>=target.hp) return effect;
							if(player.hp>2&&cards.length>3) return effect/3;
							return 0;
						},
					},
				},
			},
			//李采薇
			yijiao:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&!current.hasMark('yijiao');
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&!target.hasMark('yijiao');
				},
				content:function(){
					'step 0'
					player.chooseControl('10个','20个','30个','40个').set('prompt','要令'+get.translation(target)+'获得多少标记？').set('ai',function(){
						var player=_status.event.player,target=_status.event.getParent().target;
						/*if(get.attitude(player,target)<0&&game.hasPlayer(function(current){
							return current!=player&&current!=target&&!current.hasMark('yijiao')&&get.attitude(player,current)<0;
						})) return 3;*/
						return 0;
					});
					'step 1'
					target.addMark('yijiao',10*(1+result.index));
				},
				ai:{
					order:1.1,
					result:{
						player:1,
						target:-0.5,
					},
				},
				group:'yijiao_effect',
				subSkill:{
					effect:{
						trigger:{global:'phaseJieshuBegin'},
						forced:true,
						filter:function(event,player){
							return event.player.isIn()&&event.player!=player&&event.player.hasMark('yijiao');
						},
						logTarget:'player',
						content:function(){
							var target=trigger.player,num=target.countMark('yijiao');
							var num2=0;
							target.getHistory('useCard',function(evt){
								var numz=get.number(evt.card);
								if(typeof numz=='number') num2+=numz;
							});
							if(num>num2){
								var hs=target.getCards('h',function(card){
									return lib.filter.cardDiscardable(card,target,'yijiao_effect');
								});
								if(hs.length) target.discard(hs.randomGet());
							}
							else if(num==num2) target.insertPhase();
							else{
								player.draw(2);
							}
							target.removeMark('yijiao',num);
						},
					},
				},
				intro:{
					onunmark:true,
					name2:'异',
					content:'mark',
				},
			},
			qibie:{
				audio:2,
				trigger:{global:'die'},
				filter:function(event,player){
					return player.countCards('h')>0&&!player.hasCard(function(card){
						return !lib.filter.cardDiscardable(card,player,'qibie');
					},'h');
				},
				check:function(event,player){
					return player.isDamaged()&&player.countCards('h','tao')<Math.max(2,player.hp);
				},
				content:function(){
					var hs=player.getCards('h');
					player.discard(hs);
					player.recover();
					player.draw(hs.length+1);
				},
			},
			//马日磾
			bingjie:{
				trigger:{player:'phaseUseBegin'},
				check:function(event,player){
					return player.maxHp>3&&player.isDamaged()&&player.hasCard(function(card){
						return game.hasPlayer(function(current){
							return current!=player&&get.attitude(player,current)<0&&player.canUse(card,current,null,true)&&get.effect(current,card,player,player)>0;
						})&&player.hasValueTarget(card);
					},'hs');
				},
				content:function(){
					'step 0'
					player.loseMaxHp();
					'step 1'
					player.addTempSkill('bingjie_effect');
					game.delayx();
				},
				subSkill:{
					effect:{
						audio:'bingjie',
						trigger:{player:'useCardToPlayered'},
						forced:true,
						charlotte:true,
						logTarget:'target',
						filter:function(event,player){
							return event.target!=player&&(event.card.name=='sha'||get.type(event.card,false)=='trick')&&event.target.countCards('he')>0;
						},
						content:function(){
							trigger.target.chooseToDiscard('he',true);
						},
					},
				},
			},
			zhengding:{
				audio:2,
				trigger:{player:['useCard','respond']},
				forced:true,
				filter:function(event,player){
					if(!Array.isArray(event.respondTo)) return false;
					if(player==event.respondTo[0]) return false;
					var color=get.color(event.card);
					if(color=='none') return false;
					return color==get.color(event.respondTo[1]);
				},
				content:function(){
					player.gainMaxHp();
				},
			},
			//冯妤
			tiqi:{
				audio:2,
				trigger:{global:['phaseDrawEnd','phaseDrawSkipped','phaseDrawCancelled']},
				filter:function(event,player){
					if(player==event.player) return false;
					var num=0;
					event.player.getHistory('gain',function(evt){
						if(evt.getParent().name=='draw'&&evt.getParent('phaseDraw')==event) num+=evt.cards.length;
					});
					return num!=2;
				},
				frequent:true,
				logTarget:'player',
				content:function(){
					'step 0'
					var num=0;
					trigger.player.getHistory('gain',function(evt){
						if(evt.getParent().name=='draw'&&evt.getParent('phaseDraw')==trigger) num+=evt.cards.length;
					});
					num=Math.abs(num-2);
					event.num=num;
					player.draw(num);
					'step 1'
					if(trigger.player.isIn()){
						player.chooseControl(' +'+num+' ',' -'+num+' ','cancel2').set('prompt','是否改变'+get.translation(trigger.player)+'本回合的手牌上限？').set('ai',function(){
							var sgn=get.sgn(get.attitude(_status.event.player,_status.event.getTrigger().player));
							if(sgn==0) return 2;
							if(sgn==1) return 0;
							return 1;
						});
					}
					else event.finish();
					'step 2'
					if(result.index<2){
						var target=trigger.player;
						player.line(target);
						if(!target.storage.tiqi_effect) target.storage.tiqi_effect=0;
						target.storage.tiqi_effect+=(num*get.sgn(0.5-result.index));
						target.addTempSkill('tiqi_effect');
						target.markSkill('tiqi_effect');
					}
				},
				subSkill:{
					effect:{
						mod:{
							maxHandcard:function(player,num){
								if(typeof player.storage.tiqi_effect=='number') return num+player.storage.tiqi_effect;
							},
						},
						charlotte:true,
						onremove:true,
						mark:true,
						intro:{
							content:(num)=>('手牌上限'+(num<0?'':'+')+num),
						},
					},
				},
			},
			baoshu:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return player.maxHp>0;
				},
				content:function(){
					'step 0'
					player.chooseTarget([1,player.maxHp],get.prompt('baoshu'),'令至多'+get.cnNumber(player.maxHp)+'名角色重置武将牌并获得“梳”').set('ai',function(target){
						var att=get.attitude(player,target);
						if(att<=0) return 0;
						//if(target.isTurnedOver()) return 3*att;
						if(target.isLinked()&&get.effect(target,{name:'tiesuo'},player,player)>0) return 1.6*att;
						if(ui.selected.targets.length>=Math.sqrt(1+player.maxHp)) return 0;
						if(target!=player) return 1.3*att;
						return att;
					});
					'step 1'
					if(result.bool){
						var targets=result.targets;
						targets.sortBySeat();
						player.logSkill('baoshu',targets);
						event.targets=targets;
						event.num=0;
						event.num2=(1+player.maxHp-targets.length);
					}
					else event.finish();
					'step 2'
					var target=targets[num];
					event.target=target;
					if(!target.isIn()){
						if(num<targets.length-1){
							event.num++;
							event.goto(2);
						}
						else event.finish();
					}
					else if(target.isLinked()) target.link();
					'step 3'
					if(target.isIn()) target.addMark('baoshu',event.num2);
					if(num<targets.length-1){
						event.num++;
						event.goto(2);
					}
					else event.finish();
				},
				marktext:'梳',
				intro:{
					name2:'梳',
					content:'mark',
				},
				group:'baoshu_draw',
				subSkill:{
				 draw:{
				  trigger:{global:'phaseDrawBegin2'},
				  forced:true,
				  popup:false,
				  filter:function(event,player){
				   return !event.numFixed&&event.player.hasMark('baoshu');
				  },
				  content:function(){
				   var target=trigger.player,num=target.countMark('baoshu');
				   trigger.player.logSkill('baoshu_draw');
				   trigger.num+=num;
				   trigger.player.removeMark('baoshu',num);
				  },
				 },
				},
			},
			//吴范
			tianyun:{
				audio:2,
				trigger:{global:'phaseBegin'},
				frequent:true,
				filter:function(event,player){
					return event.player.getSeatNum()==game.roundNumber&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					var suits=[],hs=player.getCards('h');
					for(var i of hs){
						suits.add(get.suit(i,player));
					}
					var num=suits.length;
					event.num=num;
					var cards=get.cards(num);
					game.cardsGotoOrdering(cards);
					var next=player.chooseToMove();
					next.set('list',[
						['牌堆顶',cards],
						['牌堆底'],
					]);
					next.set('prompt','天运：点击将牌移动到牌堆顶或牌堆底');
					next.processAI=function(list){
						var cards=list[0][1]
						return [[],cards];
					}
					'step 1'
					var top=result.moved[0];
					var bottom=result.moved[1];
					top.reverse();
					for(var i=0;i<top.length;i++){
						ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
					}
					for(i=0;i<bottom.length;i++){
						ui.cardPile.appendChild(bottom[i]);
					}
					player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
					game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
					game.updateRoundNumber();
					if(top.length){
						game.delayx();
						event.finish();
					}
					'step 2'
					player.chooseTarget('是否令一名角色摸'+get.cnNumber(num)+'张牌，然后失去1点体力？').set('',function(target){
						if(!_status.event.goon||target.hasSkillTag('nogain')) return 0;
						return get.attitude(_status.event.player,target)*Math.sqrt(Math.max(1,5-target.getCards('h')));
					}).set('goon',num>1&&player.hp>5-num);
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.draw(num);
						player.loseHp();
					}
					else game.delayx();
				},
				group:'tianyun_gain',
				subSkill:{
					gain:{
						audio:'tianyun',
						trigger:{
							global:'phaseBefore',
							player:'enterGame',
						},
						forced:true,
						locked:false,
						filter:function(event,player){
							if(event.name=='phase'&&game.phaseNumber!=0) return false;
							var suits=lib.suit.slice(0),hs=player.getCards('h');
							for(var i of hs){
								suits.remove(get.suit(i,player));
								if(!suits.length) return false;
							}
							return true;
						},
						content:function(){
							var suits=lib.suit.slice(0),hs=player.getCards('h');
							for(var i of hs){
								suits.remove(get.suit(i,player));
							}
							var cards=[];
							for(var i of suits){
								var card=get.cardPile(function(card){
									return get.suit(card,false)==i;
								});
								if(card) cards.push(card);
							}
							if(cards.length) player.gain(cards,'gain2');
						},
					},
				},
			},
			wfyuyan:{
				audio:2,
				derivation:'refenyin',
				trigger:{global:'roundStart'},
				forced:true,
				content:function(){
					'step 0'
					var next=player.chooseTarget('请选择【预言】的目标',true).set('animate',false).set('ai',function(){
						return Math.random();
					});
					'step 1'
					if(result.bool){
						player.storage.wfyuyan=result.targets[0];
						player.addSkill('wfyuyan_dying');
						player.addSkill('wfyuyan_damage');
					}
				},
				subSkill:{
					dying:{
						trigger:{global:'dying'},
						forced:true,
						charlotte:true,
						popup:false,
						content:function(){
							if(trigger.player==player.storage.wfyuyan){
								player.logSkill('wfyuyan',trigger.player);
								player.addTempSkill('iwasawa_refenyin',{player:'phaseEnd'});
							}
							player.removeSkill('wfyuyan_dying');
						},
					},
					damage:{
						trigger:{global:'damageSource'},
						forced:true,
						popup:false,
						charlotte:true,
						filter:function(event,player){
							return event.source&&event.source.isIn();
						},
						content:function(){
							if(trigger.source==player.storage.wfyuyan){
								player.logSkill('wfyuyan',trigger.source);
								player.draw(2);
							}
							player.removeSkill('wfyuyan_damage');
						},	
					},
				},
			},
			//严夫人
			channi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:lib.filter.notMe,
				filterCard:true,
				selectCard:[1,Infinity],
				check:function(card){
					var player=_status.event.player;
					if(ui.selected.cards.length<=Math.max(1,player.needsToDiscard(),player.countCards('h')-4)) return 6-get.value(card);
					return 4-get.value(card);
				},
				position:'h',
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					'step 0'
					target.gain(cards,player,'giveAuto');
					'step 1'
					if(target.countCards('h')>0){
						game.broadcastAll(function(num){
							lib.skill.channi_backup.selectCard=[1,num];
						},cards.length);
						var next=target.chooseToUse();
						next.set('openskilldialog','将至多'+get.cnNumber(cards.length)+'张手牌当做【决斗】使用');
						next.set('norestore',true);
						next.set('addCount',false);
						next.set('_backupevent','channi_backup');
						next.set('custom',{
							add:{},
							replace:{window:function(){}}
						});
						next.backup('channi_backup');
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var evts=target.getHistory('useCard',function(evt){
							return evt.card.name=='juedou'&&evt.getParent(2)==event;
						});
						if(!evts.length){
							event.finish();
							return;
						}
						var num=evts[0].cards.length;
						if(target.hasHistory('sourceDamage',function(evt){
							return evt.card.name=='juedou'&&evt.getParent(4)==event;
						})) target.draw(num);
					}
					else event.finish();
					'step 3'
					if(player.countCards('h')>0&&target.hasHistory('damage',function(evt){
						return evt.card.name=='juedou'&&evt.getParent(4)==event;
					})) player.chooseToDiscard('h',true,player.countCards('h'));
				},
				subSkill:{
					backup:{
						filterCard:function(card){
							return get.itemtype(card)=='card';
						},
						viewAs:{name:'juedou'},
						position:'h',
						filterTarget:lib.filter.targetEnabled,
						check:(card)=>6-get.value(card),
						log:false,
						precontent:function(){
							delete event.result.skill;
						},
					},
				},
				ai:{
					order:0.3,
					result:{
						target:function(player,target){
							if(target==game.me||target.isOnline()||target.hasValueTarget({name:'juedou'})) return 2;
							if(player.needsToDiscard()) return 0.5;
							return 0;
						},
					},
				},
			},
			nifu:{
				audio:2,
				trigger:{global:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player.countCards('h')<3;
				},
				content:function(){
					player.drawTo(3);
				},
			},
			//郝萌
			xiongmang:{
				audio:2,
				enable:'chooseToUse',
				viewAs:{name:'sha'},
				viewAsFilter:function(player){
					return player.countCards('hs')>0;
				},
				selectCard:[1,4],
				selectTarget:function(){
					var card=get.card(),player=get.player();
					if(card==undefined) return;
					var range=[1,Math.max(1,ui.selected.cards.length)]
					game.checkMod(card,player,range,'selectTarget',player);
					return range;
				},
				complexCard:true,
				filterCard:function(card){
					if(!ui.selected.cards.length) return true;
					var suit=get.suit(card);
					for(var i of ui.selected.cards){
						if(get.suit(i)==suit) return false;
					}
					return true;
				},
				check:function(card){
					var player=_status.event.player,card=get.autoViewAs({name:'sha'},ui.selected.cards.concat(card));
					if(game.countPlayer(function(current){
						return get.effect_use(current,card,player,player)>0;
					})<=ui.selected.cards.length) return 0;
					return 5-get.value(card);
				},
				position:'hs',
				onuse:function(links,player){
					player.addTempSkill('xiongmang_effect');
				},
				ai:{
					order:()=>get.order({name:'sha'})+0.2,
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						return player.countCards('hs')>0;
					},
				},
				subSkill:{
					effect:{
						trigger:{player:'useCardAfter'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							return event.skill=='xiongmang'&&!player.hasHistory('sourceDamage',function(evt){
								return evt.card==event.card;
							});
						},
						content:function(){
							player.loseMaxHp();
						},
					},
				},
			},
			//邓芝
			jianliang:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				filter:function(event,player){
					return !player.isMaxHandcard();
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('jianliang'),'令至多两名角色各摸一张牌',[1,2]).set('ai',function(target){
						return Math.sqrt(5-Math.min(4,target.countCards('h')))*get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						player.logSkill('jianliang',targets);
						if(targets.length==1){
							targets[0].draw();
							event.finish();
						}
						else game.asyncDraw(targets);
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
			},
			weimeng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player.hp>0&&target!=player&&target.countGainableCards(player,'h')>0;
				},
				content:function(){
					'step 0'
					player.gainPlayerCard(target,'h',true,[1,player.hp]);
					'step 1'
					if(result.bool&&target.isIn()){
						var num=result.cards.length,hs=player.getCards('he');
						var numx=0;
						for(var i of result.cards) numx+=get.number(i,player);
						event.num=numx;
						event.cards=result.cards;
						if(!hs.length) event.finish();
						else if(hs.length<=num) event._result={bool:true,cards:hs};
						else player.chooseCard('he',true,'选择交给'+get.translation(target)+get.cnNumber(num)+'张牌','（已获得牌的点数和：'+numx+'）',num);
					}
					else event.finish();
					'step 2'
					target.gain(result.cards,player,'giveAuto');
					var numx=0;
					for(var i of result.cards) numx+=get.number(i,player);
					if(numx>num) player.draw();
					else if(numx<num) player.discardPlayerCard(target,true,'hej');
				},
				ai:{
					order:6,
					tag:{
						lose:1,
						loseCard:1,
						gain:1,
					},
					result:{
						target:function(player,target){
							return -Math.pow(Math.min(player.hp,target.countCards('h')),2)/4;
						},
					},
				},
			},
			//冯熙
			yusui:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				filter:function(event,player){
					return event.player!=player&&event.player.isIn()&&get.color(event.card)=='black';
				},
				logTarget:'player',
				check:function(event,player){
					var target=event.player;
					if(player.hp<3||get.attitude(player,target)>-3) return false;
					if(player.hp<target.hp) return true;
					if(Math.min(target.countCards('h')-player.countCards('h'),target.countCards('h'))>3) return true;
					return false;
				},
				preHidden:true,
				content:function(){
					'step 0'
					player.loseHp();
					event.target=trigger.player;
					'step 1'
					event.addIndex=0;
					var list=[],num=target.countCards('h')-player.countCards('h');
					event.num=num;
					if(num>0&&target.countCards('h')>0) list.push('令其弃置'+get.cnNumber(num)+'张手牌');
					else event.addIndex++;
					if(target.hp>player.hp) list.push('令其失去'+get.cnNumber(target.hp-player.hp)+'点体力');
					if(!list.length) event.finish();
					else if(list.length==1) event._result={index:0};
					else player.chooseControl().set('choiceList',list).set('prompt','令'+get.translation(target)+'执行一项').set('ai',function(){
						var player=_status.event.player,target=_status.event.getParent().target;
						return (target.hp-player.hp)>(Math.min(_status.event.getParent().num,target.countCards('h'))/2)?1:0;
					});
					'step 2'
					if(result.index+event.addIndex==0) target.chooseToDiscard(num,true,'h');
					else target.loseHp(target.hp-player.hp);
				},
			},
			boyan:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					'step 0'
					target.drawTo(Math.min(5,target.maxHp));
					'step 1'
					target.addTempSkill('boyan_block');
				},
				subSkill:{
					block:{
						mark:true,
						intro:{content:'不能使用或打出手牌'},
						charlotte:true,
						mod:{
							cardEnabled2:function(card){
								if(get.position(card)=='h') return false;
							},
						},
					},
				},
				ai:{
					order:4,
					result:{
						target:function(player,target){
							if(get.attitude(player,target)>0) return Math.max(0,Math.min(5,target.maxHp)-target.countCards('h'));
							if(Math.max(0,Math.min(5,target.maxHp)-target.countCards('h'))<=1&&target.countCards('h','shan')&&!target.hasSkillTag('respondShan',true,null,true)&&player.countCards('h',function(card){
								return get.tag(card,'respondShan')&&player.getUseValue(card,null,true)>0&&get.effect(target,card,player,player)>0;
							})) return -2;
						},
					},
				},
			},
			//祢衡
			rekuangcai:{
				audio:2,
				forced:true,
				trigger:{player:'phaseDiscardBegin'},
				filter:function(event,player){
					return !player.getHistory('useCard').length||!player.getHistory('sourceDamage').length;
				},
				content:function(){
					lib.skill.rekuangcai.change(player,player.getHistory('useCard').length?-1:1);
				},
				mod:{
					targetInRange:function(card,player){
						if(player==_status.currentPhase) return true;
					},
					cardUsable:function(card,player){
						if(player==_status.currentPhase) return Infinity;
					},
				},
				change:function(player,num){
					if(typeof player.storage.rekuangcai_change!='number') player.storage.rekuangcai_change=0;
					player.storage.rekuangcai_change+=num;
					player.addSkill('rekuangcai_change');
				},
				group:'rekuangcai_draw',
				subSkill:{
					draw:{
						audio:'rekuangcai',
						trigger:{player:'phaseJieshuBegin'},
						forced:true,
						filter:function(event,player){
							return player.getHistory('sourceDamage').length>0;
						},
						content:function(){
							player.draw(Math.min(5,player.getStat('damage')));
						},
					},
					change:{
						mod:{
							maxHandcard:function(player,num){
								if(typeof player.storage.rekuangcai_change=='number') return num+player.storage.rekuangcai_change;
							},
						},
						charlotte:true,
						mark:true,
						intro:{
							content:(num)=>('手牌上限'+(num<0?'':'+')+num),
						},
					},
				},
			},
			reshejian:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				filter:function(event,player){
					if(player==event.player||event.targets.length!=1) return false;
					return player.countCards('h')>=2;
				},
				direct:true,
				usable:2,
				content:function(){
					'step 0'
					player.chooseToDiscard('he',[2,Infinity],get.prompt('reshejian',trigger.player),'<div class="text center">弃置至少两张手牌，然后选择一项：<br>⒈弃置其等量的牌。⒉对其造成1点伤害。</div>').set('',function(card){
						if(_status.event.goon&&ui.selected.cards.length<2) return 5.6-get.value(card);
						return 0;
					}).set('goon',function(){
						var target=trigger.player;
						if(get.damageEffect(target,player,player)>0) return true;
						if(target.countCards('he',function(card){
							return get.value(card,target)>6;
						})>=2) return true;
						return false;
					}()).logSkill=['reshejian',trigger.player];
					'step 1'
					if(!result.bool){
						player.storage.counttrigger.reshejian--;
						event.finish();
						return;
					}
					var num=result.cards.length;
					event.num=num;
					var target=trigger.player,str=get.translation(target);
					event.target=target;
					if(!target.isIn()) event.finish();
					else if(!target.hasCard(function(card){
						return lib.filter.canBeDiscarded(card,player,target);
					},'he')) event._result={index:1};
					else player.chooseControl().set('choiceList',[
						'弃置'+str+'的'+get.cnNumber(num)+'张牌',
						'对'+str+'造成1点伤害',
					]).set('ai',function(){
						var player=_status.event.player;
						var eff0=get.effect(target,{name:'guohe_copy2'},player,player)*Math.min(1.7,target.countCards('he'));
						var eff1=get.damageEffect(target,player,player);
						return eff0>eff1?0:1;
					});
					'step 2'
					if(result.index==0) player.discardPlayerCard(target,num,true,'he');
					else target.damage();
				},
			},
			//张宝
			xinzhoufu:{
				audio:'zhoufu',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				filterTarget:function(card,player,target){
					return target!=player&&!target.getExpansions('xinzhoufu2').length;
				},
				check:function(card){
					return 6-get.value(card)
				},
				position:'he',
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					target.addToExpansion(cards,player,'give').gaintag.add('xinzhoufu2');
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							if(player.inRange(target)) return -1.3;
							return -1;
						},
					},
				},
				group:['xinzhoufu_judge'],
				subSkill:{
					judge:{
						audio:'zhoufu',
						trigger:{global:'judgeBefore'},
						forced:true,
						filter:function(event,player){
							return !event.directresult&&event.player.getExpansions('xinzhoufu2').length;
						},
						logTarget:'player',
						content:function(){
							var cards=[trigger.player.getExpansions('xinzhoufu2')[0]];
							trigger.directresult=cards[0];
						},
					},
				},
			},
			xinzhoufu2:{
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
			},
			xinyingbing:{
				audio:'yingbing',
				trigger:{player:'useCardToPlayered'},
				forced:true,
				logTarget:'target',
				filter:function(event,player){
					return event.target.getExpansions('xinzhoufu2').length>0&&!player.hasHistory('gain',function(evt){
						var evtx=evt.getParent(2);
						return evtx&&evtx.name=='xinyingbing'&&evtx._trigger.target==event.target;
					});
				},
				content:function(){
					player.draw(2);
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(target&&target.getExpansions('xinzhoufu2').length>0&&!player.hasHistory('gain',function(evt){
								var evtx=evt.getParent(2);
								return evtx&&evtx.name=='xinyingbing'&&evtx._trigger.target==target;
							})) return [1,1];
						},
					},
				},
			},
			//赵嫣
			jinhui:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					var cards=[];
					while(cards.length<3){
						var card=get.cardPile2(function(card){
							for(var i of cards){
								if(i.name==card.name) return false;
							}
							var info=get.info(card,false);
							if(info.ai&&info.ai.tag&&info.ai.tag.damage) return false;
							return !info.notarget&&(info.toself||info.singleCard||!info.selectTarget||info.selectTarget==1);
						});
						if(card) cards.push(card);
						else break;
					}
					if(!cards.length) event.finish();
					else{
						player.showCards(cards,get.translation(player)+'发动了【锦绘】');
						event.cards=cards;
						game.cardsGotoOrdering(cards);
						if(game.hasPlayer((current)=>(current!=player))) player.chooseTarget('选择【锦绘】的目标',true,lib.filter.notMe).set('ai',function(target){
							var player=_status.event.player,cards=_status.event.getParent().cards.slice(0);
							var max_effect=0,max_effect_player=0;
							for(var i of cards){
								var targetx=lib.skill.jinhui.getUsableTarget(i,target,player);
								if(targetx){
									var effect2=get.effect(targetx,i,target,target);
									var effect3=get.effect(targetx,i,target,player);
									if(effect2>max_effect){
										max_effect=effect2;
										max_effect_player=effect3;
									}
								}
							}
							return max_effect_player;
						});
						else event.finish();
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target,'green');
						var cards=cards.filter(function(card){
							return lib.skill.jinhui.getUsableTarget(card,target,player);
						});
						if(cards.length){
							if(cards.length==1) event._result={bool:true,links:cards};
							else target.chooseButton(['选择按“锦绘”规则使用一张牌',cards],true).set('ai',function(button){
								var player=_status.event.player,target=_status.event.getParent().player,card=button.link;
								var targetx=lib.skill.jinhui.getUsableTarget(card,player,target);
								var effect=get.effect(targetx,card,player,player),cards=_status.event.getParent().cards.slice(0);
								var effect2=0,effect3=0;
								cards.remove(button.link);
								for(var i of cards){
									var targetx=lib.skill.jinhui.getUsableTarget(i,target,player);
									if(targetx){
										effect2+=get.effect(targetx,i,target,target);
										effect3+=get.effect(targetx,i,target,player);
									}
								}
								if(effect2>0) effect+=effect3;
								return effect;
							});
						}
						else event.goto(3);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var card=result.links[0];
						event.cards.remove(card);
						var targetx=lib.skill.jinhui.getUsableTarget(card,target,player);
						target.useCard(card,targetx,false,'noai');
					}
					'step 3'
					var cards=cards.filter(function(card){
						return lib.skill.jinhui.getUsableTarget(card,player,target);
					});
					if(cards.length){
						player.chooseButton(['是否按“锦绘”规则使用其中一张牌？',cards]).set('ai',function(button){
							var player=_status.event.player,target=_status.event.getParent().target;
							var card=button.link,targetx=lib.skill.jinhui.getUsableTarget(card,player,target);
							return get.effect(targetx,card,player,player)
						});
					}
					else event.finish();
					'step 4'
					if(result.bool){
						var card=result.links[0];
						cards.remove(card);
						var targetx=lib.skill.jinhui.getUsableTarget(card,player,target);
						if(targetx){
							player.useCard(card,targetx,false,'noai');
						}
						if(cards.length) event.goto(3);
					}
					else event.finish();
				},
				getUsableTarget:function(card,player,target){
					var info=get.info(card,false);
					if(info.toself) return player.canUse(card,player,false)?player:false;
					return (target.isIn()&&player.canUse(card,target,false))?target:false;
				},
				ai:{
					order:5,
					result:{player:1},
				},
			},
			qingman:{
				audio:2,
				trigger:{global:'phaseEnd'},
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					if(!event.player.isAlive()) return false;
					var num=player.countCards('h');
					if(num>=5) return false;
					var num2=0;
					for(var i=1;i<=5;i++){
					 if(event.player.isEmpty(i)) num2++;
					}
					return num<num2;
				},
				content:function(){
					var num2=0;
					for(var i=1;i<=5;i++){
					 if(trigger.player.isEmpty(i)) num2++;
					}
					player.drawTo(num2);
				},
			},
			//孙翊
			syjiqiao:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				content:function(){
					var cards=get.cards(player.maxHp);
					cards.sort(function(a,b){
						return get.color(b).length-get.color(a).length;
					});
					player.addToExpansion(cards,'gain2').gaintag.add('syjiqiao');
					player.addTempSkill('syjiqiao_gain','phaseUseAfter');
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				subSkill:{
					gain:{
						audio:'syjiqiao',
						trigger:{player:'useCardAfter'},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return player.hasCard((card)=>card.hasGaintag('syjiqiao'),'x');
						},
						content:function(){
							'step 0'
							var cards=player.getExpansions('syjiqiao')
							var dialog=['激峭：选择获得一张牌']
							var reds=[],blacks=[];
							for(var i of cards) (get.color(i)=='red'?reds:blacks).push(i);
							if(reds.length>0){
								dialog.push('<div class="text center">红色牌</div>');
								dialog.push(reds);
							}
							if(blacks.length>0){
								dialog.push('<div class="text center">黑色牌</div>');
								dialog.push(blacks);
							};
							player.chooseButton(dialog,true).set('ai',function(button){
								var player=_status.event.player;
								var color=get.color(button.link),cards=player.getExpansions('syjiqiao');
								var num1=cards.filter((card)=>get.color(card)==color),num2=cards.length-num1;
								if(num1>=num2) return get.value(button.link);
								return 0;
							});
							'step 1'
							if(result.bool){
								player.gain(result.links,'gain2');
							}
							else event.finish();
							'step 2'
							var map={red:0,black:0},cards=player.getExpansions('syjiqiao')
							for(var i of cards){
								var color=get.color(i,false);
								if(map[color]!=undefined) map[color]++;
							}
							if(map.red==map.black) player.recover();
							else player.loseHp();
						},
						onremove:function(player){
							var cards=player.getExpansions('syjiqiao')
							if(cards.length) player.loseToDiscardpile(cards);
						},
					},
				},
			},
			syxiongyi:{
				audio:2,
				skillAnimation:true,
				animationColor:'wood',
				limited:true,
				enable:'chooseToUse',
				filter:function(event,player){
					if(event.type!='dying') return false;
					if(player!=event.dying) return false;
					return true;
				},
				content:function(){
					player.awakenSkill('syxiongyi');
					if(!_status.characterlist){
						lib.skill.pingjian.initList();
					}
					var hp=1-player.hp;
					if((player.name1=='re_sunyi'||player.name2=='re_sunyi')&&_status.characterlist.contains('xushi')){
						hp+=2;
						_status.characterlist.remove('xushi');
						_status.characterlist.add('re_sunyi');
						player.reinit('re_sunyi','xushi',false);
					}
					else{
						player.addSkillLog('olhunzi');
					}
					if(hp>0) player.recover(hp);
				},
				ai:{
					order:1,
					save:true,
					skillTagFilter:function(player,arg,target){
						return player==target;
					},
					result:{
						player:10
					},
				},
				derivation:['olhunzi','reyingzi','gzyinghun'],
			},
			//庞德公
			heqia:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer((current)=>current.countCards(current==player?'he':'h')>0);
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:get.prompt('heqia'),
						prompt2:'操作提示：选择要给出的牌和目标角色，或直接选择一名目标角色，令其将牌交给自己',
						filterCard:true,
						position:'he',
						selectCard:function(){
							if(ui.selected.targets.length&&!ui.selected.targets[0].countCards('h')) return [1,Infinity];
							return [0,Infinity];
						},
						filterTarget:function(card,player,target){
							if(player==target) return false;
							if(!ui.selected.cards.length) return target.countCards('h')>0;
							return true;
						},
						ai1:function(card){
							if(!_status.event.nogive||ui.selected.cards.length) return 0-get.value(card);
							return 1/Math.max(1,get.value(card));
						},
						ai2:function(target){
							return (get.attitude(player,target)-0.1)*(ui.selected.cards.length?1:-1);
						},
						nogive:!game.hasPlayer(function(current){
							return current!=player&&get.attitude(player,current)<=0&&current.countCards('h')>0;
						}),
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('heqia',target);
						if(result.cards.length){
							target.gain(result.cards,player,'giveAuto');
							event.source=target;
							event.num=result.cards.length;
							event.goto(4);
						}
					}
					else event.finish();
					'step 2'
					var he=target.getCards('he');
					if(he.length>0){
						if(he.length>1) target.chooseCard('he',true,[1,Infinity],'选择交给'+get.translation(player)+'任意张牌').set('ai',(card)=>-get.value(card));
						else event._result={bool:true,cards:he};
					}
					else event.finish();
					'step 3'
					if(result.bool){
						event.source=player;
						player.gain(result.cards,target,'giveAuto');
						event.num=result.cards.length;
					}
					else event.finish();
					'step 4'
					if(source&&source.isIn()&&source.countCards('h')>0){
						var list=[];
						for(var name of lib.inpile){
							if(get.type(name)!='basic') continue;
							if(player.hasUseTarget({name:name},false)) list.push(['基本','',name]);
							if(name=='sha'){
								for(var nature of lib.inpile_nature){
									if(source.hasUseTarget({name:name,nature:nature},false)) list.push(['基本','',name,nature]);
								}
							}
						}
						if(list.length){
							source.chooseButton(['是否将一张手牌当做一种基本牌使用？',[list,'vcard']]).set('ai',(button)=>_status.event.player.getUseValue({name:button.link[2],nature:button.link[3]},false));
						}
						else event.finish();
					}
					else event.finish();
					'step 5'
					if(result.bool){
						var card={name:result.links[0][2],nature:result.links[0][3]};
						game.broadcastAll(function(card){
							lib.skill.heqia_backup.viewAs=card;
						},card);
						var next=source.chooseToUse();
						next.set('openskilldialog','将一张手牌当做'+get.translation(card)+'使用');
						next.set('norestore',true);
						next.set('addCount',false);
						next.set('_backupevent','heqia_backup');
						next.set('custom',{
							add:{},
							replace:{window:function(){}}
						});
						next.backup('heqia_backup');
					}
				},
				group:'heqia_add',
				subSkill:{
					backup:{
						filterCard:function(card){
							return get.itemtype(card)=='card';
						},
						position:'h',
						filterTarget:lib.filter.targetEnabled,
						selectCard:1,
						check:(card)=>6-get.value(card),
						log:false,
						precontent:function(){
							delete event.result.skill;
						},
					},
					add:{
						trigger:{global:'useCard2'},
						charlotte:true,
						direct:true,
						filter:function(event,player){
							var evt=event.getParent(2);
							if(evt.name!='heqia'||evt.player!=player||!event.targets||evt.num<=event.targets.length) return false;
							var card=event.card,info=get.info(card);
							if(info.allowMultiple==false) return false;
							if(event.targets&&!info.multitarget){
								if(game.hasPlayer(function(current){
									return !event.targets.contains(current)&&lib.filter.targetEnabled2(card,event.player,current);
								})){
									return true;
								}
							}
							return false;
						},
						content:function(){
							'step 0'
							var num=trigger.getParent(2).num-trigger.targets.length;
							var prompt2='是否为'+get.translation(trigger.card)+'增加至多'+get.cnNumber(num)+'个目标？'
							trigger.player.chooseTarget(prompt2,[1,num],function(card,player,target){
								var player=_status.event.player;
								return !_status.event.targets.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var trigger=_status.event.getTrigger();
								var player=_status.event.player;
								return get.effect(target,trigger.card,player,player);
							}).set('card',trigger.card).set('targets',trigger.targets);
							'step 1'
							if(result.bool){
								trigger.player.line(result.targets);
								game.log(result.targets,'也成为了',trigger.card,'的目标')
								trigger.targets.addArray(result.targets);
							}
						},
					},
				},
			},
			yinyi:{
				audio:2,
				trigger:{player:'damageBegin1'},
				forced:true,
				usable:1,
				filter:function(event,player){
					return event.source&&event.source.hp!=player.hp&&!lib.linked.contains(event.nature)&&event.source.countCards('h')!=player.countCards('h');
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')){
								if(player.hp==target.hp) return;
								var cards=[card];
								if(card.cards&&card.cards.length) cards.addArray(card.cards);
								if(ui.selected.cards.length) cards.addArray(ui.selected.cards);
								if(player.countCards('h',function(card){
									return !cards.contains(card);
								})==target.countCards('h')) return;
								return 'zerotarget';
							}
						},
					},
				},
			},
			//王桃王悦
			huguan:{
				audio:2,
				audioname:['wangyue'],
				trigger:{global:'useCard'},
				direct:true,
				filter:function(event,player){
					if(get.color(event.card,false)!='red') return false;
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=event.player) return false;
					return event.player.getHistory('useCard',function(event){
						return event.getParent('phaseUse')==evt;
					}).indexOf(event)==0;
				},
				content:function(){
					'step 0'
					player.chooseControl(lib.suit,'cancel2').set('prompt',get.prompt('huguan',trigger.player)).set('prompt2','令某种花色的手牌不计入其本回合的手牌上限').set('ai',function(){
						var player=_status.event.player,target=_status.event.getTrigger().player;
						if(get.attitude(player,target)<=0) return 'cancel2';
						var list=lib.suit.slice(0);
						list.removeArray(target.getStorage('huguan_add'));
						if(list.length) return list.randomGet();
						return 'cancel2';
					});
					'step 1'
					if(result.control!='cancel2'){
						var target=trigger.player;
						player.logSkill('huguan',target);
						game.log(player,'选择了','#g'+get.translation(result.control),'花色')
						target.addTempSkill('huguan_add');
						target.markAuto('huguan_add',[result.control]);
					}
				},
				subSkill:{
					add:{
						charlotte:true,
						onremove:true,
						mod:{
							ignoredHandcard:function(card,player){
								if(player.getStorage('huguan_add').contains(get.suit(card,player))) return true;
							},
							cardDiscardable:function(card,player,name){
								if(name=='phaseDiscard'&&player.getStorage('huguan_add').contains(get.suit(card,player))) return false;
							}
						},
						intro:{content:'本回合$花色的牌不计入手牌上限'},
					},
				},
			},
			yaopei:{
				audio:2,
				trigger:{global:'phaseDiscardEnd'},
				direct:true,
				filter:function(event,player){
					if(player==event.player||!event.player.isIn()) return false;
					var suits=[];
					event.player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event){
							for(var i of evt.cards2) suits.add(get.suit(i,evt.hs.contains(i)?evt.player:false));
						}
					});
					if(!suits.length||suits.length>=lib.suit.length) return false;
					if(_status.connectMode&&player.countCards('h')>0) return true;
					return player.hasCard(function(card){
						return !suits.contains(get.suit(card));
					},'he');
				},
				content:function(){
					'step 0'
					var suits=[];
					trigger.player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==trigger){
							for(var i of evt.cards2) suits.add(get.suit(i,evt.hs.contains(i)?evt.player:false));
						}
					});
					player.chooseCardTarget({
						prompt:get.prompt('yaopei',trigger.player),
						prompt2:'操作提示：选择要弃置的牌，并选择执行摸牌选项的角色，另一名角色执行回复体力的选项。',
						suits:suits,
						position:'he',
						filterCard:function(card){
							return !_status.event.suits.contains(get.suit(card))&&lib.filter.cardDiscardable(card,player,'yaopei');
						},
						filterTarget:function(card,player,target){
							return target==player||target==_status.event.getTrigger().player;
						},
						ai1:function(card){
							return 8-get.value(card);
						},
						ai2:function(target){
							var player=_status.event.player,source=_status.event.getTrigger().player;
							var recoverer=(player==target?source:player);
							if(recoverer.isHealthy()) return (get.attitude(player,target)>0?1:0);
							if(get.recoverEffect(recoverer,player,player)>0&&get.attitude(player,target)>0) return 2;
							return 0;
						},
					});
					'step 1'
					if(result.bool){
						var target=trigger.player;
						player.logSkill('yaopei',target);
						player.discard(result.cards);
						if(player==result.targets[0]){
							target.recover();
							player.draw(2);
						}
						else{
							target.draw(2);
							player.recover();
						}
					}
				},
			},
			mingluan:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&event.player.isIn()&&player.hasSkill('mingluan_mark')&&player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('he',get.prompt('mingluan'),'弃置一张牌，并摸等同于'+get.translation(trigger.player)+'手牌数的牌（至多摸至五张）').set('ai',function(card){
						var player=_status.event.player;
						var ph=player.countCards('h');
						if(get.position(card)=='h') ph--;
						var num=Math.min(_status.event.getTrigger().player.countCards('h'),5-ph);
						if(num>0) return 3.5*num+0.01-get.value(card);
						return 0.01-get.value(card);
					}).logSkill=['mingluan',trigger.player];
					'step 1'
					if(result.bool){
						var num=trigger.player.countCards('h'),num2=5-player.countCards('h');
						if(num>0&&num2>0) player.draw(Math.min(num,num2));
					}
				},
				group:'mingluan_count',
				subSkill:{
					count:{
						charlotte:true,
						trigger:{global:'recoverEnd'},
						silent:true,
						popup:false,
						firstDo:true,
						filter:function(event,player){
							var current=_status.currentPhase;
							return current&&current!=player&&!player.hasSkill('mingluan_mark');
						},
						content:function(){
							player.addTempSkill('mingluan_mark');
						},
					},
					mark:{
						charlotte:true,
					},
				},
			},
			//陈登
			refuyuan:{
				audio:2,
				trigger:{global:'useCardToTargeted'},
				logTarget:'target',
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.isIn()&&!game.hasPlayer2(function(current){
						return current.hasHistory('useCard',function(evt){
							return evt.card!=event.card&&get.color(evt.card,false)=='red'&&evt.targets&&evt.targets.contains(event.target);
						});
					});
				},
				check:function(event,player){
					return get.attitude(player,event.target)>0;
				},
				content:function(){
					trigger.target.draw();
				},
			},
			reyingshui:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0&&game.hasPlayer((current)=>player.inRange(current));
				},
				position:'he',
				filterCard:true,
				filterTarget:function(card,player,target){
					return player.inRange(target);
				},
				discard:false,
				lose:false,
				delay:false,
				check:function(card){
					if(get.type(card)=='equip') return 3-get.value(card);
					return 6.5-get.value(card);
				},
				content:function(){
					'step 0'
					target.gain(cards,player,'giveAuto');
					'step 1'
					var next=target.chooseCard('he',[2,Infinity],'交给'+get.translation(player)+'至少两张装备牌，否则受到1点伤害',{type:'equip'});
					if(get.damageEffect(target,player,target)>=0) next.set('ai',()=>-1);
					else next.set('ai',(card)=>ui.selected.cards.length<2?(6-get.value(card)):0);
					'step 2'
					if(result.bool) player.gain(result.cards,target,'giveAuto');
					else target.damage('nocard');
				},
				ai:{
					order:5,
					tag:{
						damage:0.5,
					},
					result:{
						target:-1.5,
					},
				},
			},
			rewangzu:{
				audio:2,
				trigger:{player:'damageBegin1'},
				direct:true,
				filter:function(event,player){
					return player.hasCard((card)=>lib.filter.cardDiscardable(card,player,'rewangzu'),'h');
				},
				usable:1,
				content:function(){
					'step 0'
					var num=player.getFriends().length;
					if(!game.hasPlayer(function(current){
						return current!=player&&current.getFriends().length>num;
					})){
						player.chooseToDiscard('h',get.prompt('rewangzu'),'弃置一张牌并令伤害-1').set('ai',function(card){
							return 7-get.value(card);
						}).logSkill='rewangzu';
					}
					else{
						player.chooseBool(get.prompt('rewangzu'),'随机弃置一张牌并令伤害-1');
					}
					'step 1'
					if(result.bool){
						trigger.num--;
						if(!result.cards||!result.cards.length){
							player.logSkill('rewangzu');
							var cards=player.getCards('h',(card)=>lib.filter.cardDiscardable(card,player,'rewangzu'));
							if(cards.length) player.discard(cards.randomGet());
						}
					}
					else player.storage.counttrigger.rewangzu--;
				},
			},
			//曹金玉
			yuqi:{
				audio:2,
				trigger:{global:'damageEnd'},
				init:function(player){
					if(!player.storage.yuqi) player.storage.yuqi=[0,3,1,1];
				},
				getInfo:function(player){
					if(!player.storage.yuqi) player.storage.yuqi=[0,3,1,1];
					return player.storage.yuqi;
				},
				onremove:true,
				usable:2,
				filter:function(event,player){
					var list=lib.skill.yuqi.getInfo(player);
					return event.player.isIn()&&get.distance(player,event.player)<=list[0];
				},
				logTarget:'player',
				content:function(){
					'step 0'
					event.list=lib.skill.yuqi.getInfo(player);
					var cards=get.cards(event.list[1]);
					event.cards=cards;
					game.cardsGotoOrdering(cards);
					var next=player.chooseToMove(true,'隅泣（若对话框显示不完整，可下滑操作）');
					next.set('list',[
						['牌堆顶的牌',cards],
						['交给'+get.translation(trigger.player)+'（至少一张'+(event.list[2]>1?('，至多'+get.cnNumber(event.list[2])+'张'):'')+'）'],
						['交给自己（至多'+get.cnNumber(event.list[3])+'张）'],
					]);
					next.set('filterMove',function(from,to,moved){
						var info=lib.skill.yuqi.getInfo(_status.event.player);
						if(to==1) return moved[1].length<info[2];
						if(to==2) return moved[2].length<info[3];
						return true;
					});
					next.set('processAI',function(list){
						var cards=list[0][1].slice(0).sort(function(a,b){
							return get.value(b,'raw')-get.value(a,'raw');
						}),player=_status.event.player,target=_status.event.getTrigger().player;
						var info=lib.skill.yuqi.getInfo(_status.event.player);
						var cards1=cards.splice(0,Math.min(info[3],cards.length-1));
						var card2;
						if(get.attitude(player,target)>0) card2=cards.shift();
						else card2=cards.pop();
						return [cards,[card2],cards1];
					});
					next.set('filterOk',function(moved){
						return moved[1].length>0;
					});
					'step 1'
					if(result.bool){
						var moved=result.moved;
						cards.removeArray(moved[1]);
						cards.removeArray(moved[2]);
						while(cards.length){
							ui.cardPile.insertBefore(cards.pop().fix(),ui.cardPile.firstChild);
						}
						trigger.player.gain(moved[1],'gain2');
						if(moved[2].length) player.gain(moved[2],'gain2');
						game.updateRoundNumber();
					}
				},
				mark:true,
				intro:{
					content:function(storage,player){
						var info=lib.skill.yuqi.getInfo(player);
						return '<div class="text center"><span class=thundertext>蓝色：'+info[0]+'</span>　<span class=firetext>红色：'+info[1]+'</span><br><span class=greentext>绿色：'+info[2]+'</span>　<span class=yellowtext>黄色：'+info[3]+'</span></div>'
					},
				},
				ai:{
					threaten:8.8,
				},
			},
			shanshen:{
				audio:2,
				trigger:{global:'die'},
				direct:true,
				content:function(){
					'step 0'
					event.goon=!player.hasAllHistory('sourceDamage',function(evt){
						return evt.player==trigger.player;
					});
					player.chooseControl('<span class=thundertext>蓝色</span>','<span class=firetext>红色</span>','<span class=greentext>绿色</span>','<span class=yellowtext>黄色</span>','cancel2').set('prompt',get.prompt('shanshen')).set('prompt2','令〖隅泣〗中的一个数字+2'+(event.goon?'并回复1点体力':'')).set('ai',function(){
						var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
						if(info[0]<info[3]&&game.countPlayer(function(current){
							return get.distance(player,current)<=info[0];
						})<Math.min(3,game.countPlayer())) return 0;
						if(info[3]<info[1]-1) return 3;
						if(info[1]<5) return 1;
						if(info[0]<5&&game.hasPlayer(function(current){
							return current!=player&&get.distance(player,current)>info[0];
						})) return 0;
						return 2;
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('shanshen',trigger.player);
						var list=lib.skill.yuqi.getInfo(player);
						list[result.index]=Math.min(5,list[result.index]+2);
						game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
						player.markSkill('yuqi');
						if(event.goon) player.recover();
					}
				},
			},
			xianjing:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseControl('<span class=thundertext>蓝色</span>','<span class=firetext>红色</span>','<span class=greentext>绿色</span>','<span class=yellowtext>黄色</span>','cancel2').set('prompt',get.prompt('xianjing')).set('prompt2','令〖隅泣〗中的一个数字+1').set('ai',function(){
						var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
						if(info[0]<info[3]&&game.countPlayer(function(current){
							return get.distance(player,current)<=info[0];
						})<Math.min(3,game.countPlayer())) return 0;
						if(info[3]<info[1]-1) return 3;
						if(info[1]<5) return 1;
						if(info[0]<5&&game.hasPlayer(function(current){
							return current!=player&&get.distance(player,current)>info[0];
						})) return 0;
						return 2;
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('xianjing');
						var list=lib.skill.yuqi.getInfo(player);
						list[result.index]=Math.min(5,list[result.index]+1);
						game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
						player.markSkill('yuqi');
						if(player.isDamaged()) event.finish();
					}
					else event.finish();
					'step 2'
					player.chooseControl('<span class=thundertext>蓝色</span>','<span class=firetext>红色</span>','<span class=greentext>绿色</span>','<span class=yellowtext>黄色</span>','cancel2').set('prompt','是否令〖隅泣〗中的一个数字+1？').set('ai',function(){
						var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
						if(info[0]<info[3]&&game.countPlayer(function(current){
							return get.distance(player,current)<=info[0];
						})<Math.min(3,game.countPlayer())) return 0;
						if(info[3]<info[1]-1) return 3;
						if(info[1]<5) return 1;
						if(info[0]<5&&game.hasPlayer(function(current){
							return current!=player&&get.distance(player,current)>info[0];
						})) return 0;
						return 2;
					});
					'step 3'
					if(result.control!='cancel2'){
						var list=lib.skill.yuqi.getInfo(player);
						list[result.index]=Math.min(5,list[result.index]+1);
						game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
						player.markSkill('yuqi');
					}
				},
			},
			//韩猛
			jieliang:{
				trigger:{global:'phaseDrawBegin2'},
				direct:true,
				filter:function(event,player){
					return event.player!=player&&!event.numFixed&&event.num>1&&player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					event.target=trigger.player;
					player.chooseToDiscard(get.prompt2('jieliang',event.target),'he').set('goon',get.attitude(player,trigger.player)<-2).set('ai',function(card){
						if(!_status.event.goon) return 0;
						return 7-get.value(card);
					}).logSkill=['jieliang',event.target];
					'step 1'
					if(result.bool){
						trigger.num--;
						target.addMark('jieliang_less',1,false);
						target.addTempSkill('jieliang_less');
						player.addTempSkill('jieliang_gain');
					}
				},
				subSkill:{
					less:{
						charlotte:true,
						mod:{
							maxHandcard:function(player,num){
								return num-player.countMark('jieliang_less');
							},
						},
						onremove:true,
						intro:{content:'手牌上限-#'},
					},
					gain:{
						trigger:{global:'loseAfter'},
						charlotte:true,
						direct:true,
						filter:function(event,player){
							return event.type=='discard'&&event.player==_status.currentPhase&&
							event.getParent(3).name=='phaseDiscard'&&event.cards2.filterInD('d').length>0;
						},
						content:function(){
							'step 0'
							player.chooseButton(['截粮：是否获得一张牌?',trigger.cards2.filterInD('d')]).set('ai',function(button){
								return get.value(button.link,_status.event.player);
							});
							'step 1'
							if(result.bool){
								player.logSkill('jieliang',trigger.player);
								player.gain(result.links,'gain2');
							}
						},
					},
				},
			},
			quanjiu:{
				audio:2,
				mod:{
					aiOrder:function(player,card,num){
						if((card.name=='jiu'||card.name=='xujiu')&&get.name(card)=='sha') return num+0.5;
					},
					cardname:function(card,player,name){
						if(card.name=='jiu'||card.name=='xujiu') return 'sha';
					},
				},
				trigger:{player:'useCard1'},
				forced:true,
				filter:function(event,player){
					return event.addCount!==false&&event.card.isCard&&event.card.name=='sha'&&
						event.cards.length==1&&(event.cards[0].name=='jiu'||event.cards[0].name=='xujiu');
				},
				content:function(){
					trigger.addCount=false;
					player.getStat().card.sha--;
				},
			},
			//辛评
			fuyuan:{
				audio:2,
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					var target=_status.currentPhase;
					return target&&target!=player&&target.isIn();
				},
				logTarget:function(event,player){
					var target=_status.currentPhase;
					return target.countCards('h')<player.countCards('h')?target:player;
				},
				check:function(event,player){
					var target=lib.skill.fuyuan.logTarget(event,player);
					return get.attitude(player,target)>0;
				},
				prompt:'是否发动【辅袁】？',
				prompt2:function(event,player){
					var target=lib.skill.fuyuan.logTarget(event,player);
					return '令'+get.translation(target)+(target==player?'（你）':'')+'摸一张牌';
				},
				content:function(){
					lib.skill.fuyuan.logTarget(trigger,player).draw();
				},
			},
			zhongjie:{
				trigger:{player:'die'},
				direct:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'gray',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('zhongjie'),lib.filter.notMe).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						player.awakenSkill('zhongjie');
						var target=result.targets[0];
						player.logSkill('zhongjie',target);
						target.gainMaxHp();
						target.recover();
						target.draw();
					}
				},
			},
			//万年公主
			zhenge:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('zhenge'),'令一名角色的攻击范围+1').set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target)
						if(att>0){
							if(!target.hasMark('zhenge_effect')) att*=1.5;
							if(!game.hasPlayer(function(current){
								return get.distance(target,current,'attack')>2;
							})){
								var usf=Math.max.apply(Math,function(current){
									if(target.canUse('sha',current,false)) return get.effect(current,{name:'sha'},target,player);
									return 0;
								});
								return att+usf;
							}
							return att;
						}
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('zhenge',target);
						target.addSkill('zhenge_effect');
						if(target.countMark('zhenge_effect')<5) target.addMark('zhenge_effect',1,false);
						if(!game.hasPlayer(function(current){
							return current!=target&&!target.inRange(current);
						})){
							player.chooseTarget('是否令'+get.translation(target)+'视为对另一名角色使用【杀】？',function(card,player,target){
								return _status.event.source.canUse('sha',target);
							}).set('source',target).set('ai',function(target){
								var evt=_status.event;
								return get.effect(target,{name:'sha'},evt.source,evt.player);
							});
						}
						else{
							game.delayx();
							event.finish();
						}
					}
					else event.finish();
					'step 2'
					if(result.bool){
						target.useCard({name:'sha',isCard:true},result.targets[0],false);
					}
					'step 3'
					game.delayx();
				},
				subSkill:{
					effect:{
						charlotte:true,
						onremove:true,
						mod:{
							attackRange:function(player,num){
								return num+player.countMark('zhenge_effect');
							},
						},
						intro:{content:'攻击范围+#'},
					},
				},
			},
			xinghan:{
				audio:2,
				init:function(player){
					player.addSkill('xinghan_count');
				},
				onremove:function(player){
					player.removeSkill('xinghan_count');
				},
				trigger:{global:'damageSource'},
				forced:true,
				filter:function(event,player){
					return event.card&&event.card==player.storage.xinghan_temp&&event.source&&event.source.hasMark('zhenge_effect');
				},
				logTarget:'source',
				content:function(){
					player.draw(player.isMaxHandcard(true)?1:Math.min(5,trigger.source.getAttackRange()));
				},
				subSkill:{
					count:{
						trigger:{global:'useCard1'},
						forced:true,
						charlotte:true,
						popup:false,
						firstDo:true,
						filter:function(event,player){
							return event.card.name=='sha'&&!game.hasPlayer2(function(current){
								return current.hasHistory('useCard',function(evt){
									return evt!=event&&evt.card.name=='sha';
								})
							});
						},
						content:function(){
							player.addTempSkill('xinghan_temp');
							player.storage.xinghan_temp=trigger.card;
						},
					},
					temp:{onremove:true},
				},
				ai:{combo:'zhenge'},
			},
			//荀谌
			refenglve:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0&&!player.hasSkillTag('noCompareSource')&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')>0&&!current.hasSkillTag('noCompareTarget');
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0&&!target.hasSkillTag('noCompareTarget');
				},
				content:function(){
					'step 0'
					player.chooseToCompare(target);
					'step 1'
					if(result.bool){
						if(!target.countCards('hej')) event.finish();
						else{
							event.giver=target;
							event.gainner=player;
							target.choosePlayerCard(target,true,'hej',2,'交给'+get.translation(player)+'两张牌');
						}
					}
					else if(result.tie){
						delete player.getStat('skill').refenglve;
						event.finish();
					}
					else{
						if(get.position(result.player,true)=='d') target.gain(result.player,'gain2');
						event.finish();
						/*if(!player.countCards('he')) event.finish();
						else{
							event.giver=player;
							event.gainner=target;
							player.chooseCard(true,'he','交给'+get.translation(target)+'一张牌');
						}*/
					}
					'step 2'
					if(result.bool) event.gainner.gain(result.cards,event.giver,'giveAuto');
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(!player.hasCard(function(card){
								if(get.position(card)!="h") return false;
								var val=get.value(card);
								if(val<0) return true;
								if(val<=5){
									return card.number>=11;
								}
								if(val<=6){
									return card.number>=13;
								}
								return false;
							})) return 0;
							return -Math.sqrt(1+target.countCards('he'))/(1+target.countCards('j'));
						},
					},
				},
			},
			anyong:{
				audio:2,
				trigger:{global:'damageSource'},
				direct:true,
				filter:function(event,player){
					return event.source&&event.source==_status.currentPhase&&event.num==1&&
					event.player!=event.source&&event.player.isIn()&&player.countCards('he')>0&&
					event.source.getHistory('sourceDamage',function(evt){
						return evt.player!=event.source;
					}).indexOf(event)==0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('he',get.prompt('anyong',trigger.player),'弃置一张牌并对其造成1点伤害').set('goon',get.damageEffect(trigger.player,player,player)>0).set('ai',function(card){
						if(_status.event.goon) return 7-get.value(card);
						return 0;
					}).logSkill=['anyong',trigger.player];
					'step 1'
					if(result.bool) trigger.player.damage();
				},
			},
			//张宁
			tianze:{
				audio:2,
				trigger:{global:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&event.player.isIn()&&get.color(event.card)=='black'&&event.player.hasHistory('lose',function(evt){
						return evt&&evt.hs.length&&evt.getParent()==event;
					})&&event.player.isPhaseUsing()&&!player.hasSkill('tianze_block');
				},
				content:function(){
					'step 0'
					player.addTempSkill('tianze_block');
					if(!player.hasCard(function(card){
						if(_status.connectMode&&get.position(card)=='h') return true;
						return get.color(card,player)=='black';
					},'he')) event.finish();
					else player.chooseToDiscard('he',function(card,player){
						return get.color(card,player)=='black';
					},get.prompt('tianze',trigger.player),'弃置一张黑色牌并对其造成1点伤害').set('ai',function(card){
						if(!_status.event.goon) return 0;
						return 8-get.value(card);
					}).set('goon',get.damageEffect(trigger.player,player,player)>0).logSkill=['tianze',trigger.player];
					'step 1'
					if(result.bool) trigger.player.damage();
					else event.finish();
					'step 2'
					game.delayx();
				},
				group:'tianze_draw',
				subSkill:{
					block:{charlotte:true},
					draw:{
						trigger:{global:'judgeEnd'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return event.player!=player&&event.result&&event.result.color=='black';
						},
						content:function(){
							player.draw();
						},
					},
				},
			},
			difa:{
				trigger:{player:'gainAfter'},
				filter:function(event,player){
					if(player!=_status.currentPhase||event.getParent().name!='draw') return false;
					var hs=player.getCards('h');
					if(!hs.length) return false;
					for(var i of event.cards){
						if(hs.contains(i)&&get.color(i,player)=='red'&&lib.filter.cardDiscardable(i,player,'difa')) return true;
					}
					return false;
				},
				usable:1,
				check:()=>false,
				content:function(){
					'step 0'
					var hs=player.getCards('h'),cards=trigger.cards.filter(function(i){
						return (hs.contains(i)&&get.color(i,player)=='red'&&lib.filter.cardDiscardable(i,player,'difa'));
					});
					if(!cards.length) event.finish();
					else{
						event.cards=cards;
						player.discard(cards);
					}
					'step 1'
					var list=lib.inpile.filter(function(i){
						return get.type2(i,false)=='trick';
					});
					if(!list.length) event.finish();
					else player.chooseButton(['选择获得一种锦囊牌',[list.map((i)=>['锦囊','',i]),'vcard']],true);
					'step 2'
					var card=get.cardPile(function(i){
						return i.name==result.links[0][2]&&!event.cards.contains(i);
					});
					if(card) player.gain(card,'gain2');
				},
			},
			//刘永
			zhuning:{
				audio:2,
				enable:'phaseUse',
				usable:2,
				filter:function(event,player){
					if(!player.countCards('he')) return false;
					return (!player.getStat('skill').zhuning||player.hasSkill('zhuning_double'));
				},
				filterCard:true,
				position:'he',
				filterTarget:lib.filter.notMe,
				selectCard:[1,Infinity],
				delay:false,
				lose:false,
				discard:false,
				check:function(card){
					if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
					if(!ui.selected.cards.length&&card.name=='du') return 20;
					var player=get.owner(card);
					if(ui.selected.cards.length>=Math.max(1,player.countCards('h')-player.hp)) return 0;
					return 10-get.value(card);
				},
				content:function(){
					'step 0'
					target.gain(cards,player,'giveAuto').gaintag.add('fengxiang_tag');
					'step 1'
					var list=[];
					for(var name of lib.inpile){
						var type=get.type(name);
						if(type!='basic'&&type!='trick') continue;
						var card={name:name,isCard:true};
						if(get.tag(card,'damage')>0&&player.hasUseTarget(card)){
							list.push([type,'',name]);
						}
						if(name=='sha'){
							for(var i of lib.inpile_nature){
								card.nature=i;
								if(player.hasUseTarget(card)) list.push([type,'',name,i]);
							}
						}
					}
					if(list.length){
						player.chooseButton(['是否视为使用一张伤害牌？',[list,'vcard']]).set('ai',function(button){
							return _status.event.player.getUseValue({name:button.link[2]});
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						player.chooseUseTarget({name:result.links[0][2],nature:result.links[0][3],isCard:true},true,false);
					}
					else event.finish();
					'step 3'
					if(!player.hasHistory('sourceDamage',function(evt){
						if(!evt.card) return false;
						var evtx=evt.getParent('useCard');
						return evtx.card==evt.card&&evtx.getParent(2)==event;
					})) player.addTempSkill('zhuning_double');
				},
				subSkill:{
					double:{},
				},
				ai:{
					fireAttack:true,
					order:4,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if(target.hasJudge('lebu')) return 0;
							var nh=target.countCards('h');
							var np=player.countCards('h');
							if(player.hp==player.maxHp||player.storage.rerende<0||player.countCards('h')<=1){
								if(nh>=np-1&&np<=player.hp&&!target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1,5-nh);
						}
					},
				}
			},
			fengxiang:{
				getMax:function(event){
					var max=0,max2=null,players=game.filterPlayer();
					for(var current of players){
						var num=0,cards=current.getCards('h',function(card){
							return card.hasGaintag('fengxiang_tag');
						});
						if(event){
							if(event.name=='gain'&&event.gaintag.contains('fengxiang_tag')) cards.removeArray(event.cards);
							var evt=event.getl(current);
							if(evt&&evt.gaintag_map){
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('fengxiang_tag')) num++;
								}
							}
						}
						num+=cards.length;
						if(num>max){
							max=num;
							max2=current;
						}
						else if(num==max) max2=null;
					}
					return max2;
				},
				audio:2,
				trigger:{player:'damageEnd'},
				forced:true,
				filter:function(event,player){
					var target=lib.skill.fengxiang.getMax(); 
					return !target||target.isDamaged();
				},
				logTarget:function(event,player){
					return lib.skill.fengxiang.getMax()||player;
				},
				content:function(){
					var target=lib.skill.fengxiang.getMax();
					if(target) target.recover();
					else player.draw();
				},
				group:'fengxiang_draw',
				subSkill:{
					draw:{
						trigger:{
							global:['equipAfter','addJudgeAfter','loseAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
						},
						forced:true,
						filter:function(event,player){
							if(event.name=='lose'&&event.getlx===false) return false;
							return lib.skill.fengxiang.getMax()!=lib.skill.fengxiang.getMax(event);
						},
						content:function(){
							if(trigger.delay===false) game.delayx();
							player.draw();
						},
					},
				},
			},
			//童渊
			chaofeng:{
				audio:2,
				trigger:{source:'damageBegin1'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0&&player.isPhaseUsing()&&!player.hasSkill('chaofeng2');
				},
				content:function(){
					'step 0'
					var str='弃置一张牌并摸一张牌',color,type;
					if(trigger.card){
						type=get.type2(trigger.card,false);
						color=get.color(trigger.card,false);
						if(color!='none') str+='；若弃置'+get.translation(color)+'牌则改为摸两张牌';
						if(type) str+='；若弃置类型为'+get.translation(type)+'的牌则伤害+1';
					}
					var next=player.chooseToDiscard('he',get.prompt('chaofeng',trigger.player),str);
					next.set('ai',function(card){
						var player=_status.event.player,suit=_status.event.color,number=_status.event.type;
						var val=4-get.value(card);
						if(get.color(card)==suit) val+=3;
						if(get.type2(card)==number) val+=4;
						return val;
					});
					next.logSkill=['chaofeng',trigger.player];
					if(color!='none'){
						event.color=color;
						next.set('color',color);
					}
					if(type){
						event.type=type;
						next.set('type',type);
					}
					'step 1'
					if(result.bool){
						player.addTempSkill('chaofeng2','phaseUseEnd');
						var card=result.cards[0];
						player.draw((event.color&&get.color(card,card.original=='h'?player:false)==event.color)?2:1);
						if(event.type&&get.type2(card,card.original=='h'?player:false)==event.type) trigger.num++;
					}
				},
			},
			chaofeng2:{},
			chuanshu:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','die']},
				direct:true,
				limited:true,
				forceDie:true,
				filter:function(event,player){
					return player.isDamaged()&&(event.name=='die'||player.isAlive());
				},
				skillAnimation:true,
				animationColor:'gray',
				content:function(){
					'step 0'
					player.chooseTarget(lib.filter.notMe,get.prompt('chuanshu'),'令一名其他角色获得〖朝凤〗').set('ai',function(target){
						return get.attitude(_status.event.player,target)
					}).set('forceDie',true);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.awakenSkill('chuanshu');
						player.logSkill('chuanshu',target);
						target.addSkillLog('chaofeng');
						if(player.isDead()) event.finish();
					}
					else event.finish();
					'step 2'
					for(var i of lib.skill.chuanshu.derivation) player.addSkillLog(i);
				},
				derivation:['ollongdan','drlt_congjian','chuanyun'],
			},
			longdan_tongyuan:{audio:true},
			ocongjian_tongyuan:{audio:true},
			chuanyun:{
				audio:true,
				trigger:{player:'useCardToPlayered'},
				shaRelated:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.countCards('e')>0;
				},
				logTarget:'target',
				content:function(){
					var target=trigger.target;card=target.getCards('e').randomGet();
					if(card) target.discard(card);
				},
			},
			//阚泽
			rekuanshi:{
				audio:'kuanshi',
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('rekuanshi')).set('animate',false).set('ai',function(target){
						var att=get.attitude(player,target);
						if(target.hp<3) att/=1.5;
						return att;
					});
					'step 1'
					if(result.bool){
						player.logSkill('rekuanshi');
						player.addTempSkill('rekuanshi_effect',{player:'phaseBegin'});
						player.storage.rekuanshi_effect=result.targets[0];
						game.delayx();
					}
				},
				subSkill:{
					effect:{
						audio:'kuanshi',
						trigger:{global:'damageEnd'},
						forced:true,
						charlotte:true,
						logTarget:'player',
						filter:function(event,player){
							if(event.player!=player.storage.rekuanshi_effect||event.player.isHealthy()) return false;
							var history=event.player.getHistory('damage',null,event),num=0;
							for(var i of history) num+=i.num;
							return num>1&&(num-event.num)<2;
						},
						content:function(){
							trigger.player.recover();
							player.removeSkill('rekuanshi_effect');
						}
					},
				},
			},
			//南华老仙
			jinghe:{
				enable:'phaseUse',
				filter:function(event,player){
					return !player.hasSkill('jinghe_clear');
				},
				selectCard:function(){
					if(ui.selected.targets.length) return [ui.selected.targets.length,4];
					return [1,4];
				},
				selectTarget:function(){
					return ui.selected.cards.length;
				},
				filterTarget:true,
				filterCard:function(card){
					if(ui.selected.cards.length){
						var name=get.name(card);
						for(var i of ui.selected.cards){
							if(get.name(i)==name) return false;
						}
					}
					return true;
				},
				check:function(card){
					var player=_status.event.player;
					if(game.countPlayer(function(current){
						return get.attitude(player,current)>0;
					})>ui.selected.cards.length) return 1;
					return 0;
				},
				position:'h',
				complexCard:true,
				discard:false,
				lose:false,
				delay:false,
				multitarget:true,
				multiline:true,
				content:function(){
					'step 0'
					player.showCards(cards,get.translation(player)+'发动了【经合】');
					event.skills=lib.skill.jinghe.derivation.randomGets(4);
					player.addTempSkill('jinghe_clear',{player:'phaseBegin'});
					event.targets.sortBySeat();
					event.num=0;
					'step 1'
					event.target=targets[num];
					event.num++;
					event.target.chooseControl(event.skills,'cancel2').set('choiceList',event.skills.map(function(i){
						return '<div class="skill">【'+get.translation(lib.translate[i+'_ab']||get.translation(i).slice(0,2))+'】</div><div>'+get.skillInfoTranslation(i,player)+'</div>';
					})).set('displayIndex',false).set('prompt','选择获得一个技能');
					'step 2'
					var skill=result.control;
					if(skill!='cancel2'){
						event.skills.remove(skill);
						target.addAdditionalSkill('jinghe_'+player.playerid,skill);
						target.popup(skill);
						game.log(target,'获得了技能','#g【'+get.translation(skill)+'】');
					}
					if(event.num<event.targets.length) event.goto(1);
					if(target!=game.me&&!target.isOnline2()) game.delayx();
				},
				ai:{
					threaten:3,
					order:10,
					result:{
						target:1,
					},
				},
				derivation:['releiji','rebiyue','new_retuxi','mingce','xinzhiyan','nhyinbing','nhhuoqi','nhguizhu','nhxianshou','nhlundao','nhguanyue','nhyanzheng'],
				subSkill:{
					clear:{
						onremove:function(player){
							game.countPlayer(function(current){
								current.removeAdditionalSkill('jinghe_'+player.playerid);
							});
						},
					},
				},
			},
			gongxiu:{
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.hasSkill('jinghe_clear');
				},
				content:function(){
					'step 0'
					event.list1=[];
					event.list2=[];
					event.addIndex=0;
					var choices=[];
					game.countPlayer(function(current){
						if(current.additionalSkills['jinghe_'+player.playerid]) event.list1.push(current);
						else event.list2.push(current);
					});
					event.list1.sortBySeat();
					if(event.list1.length) choices.push('令'+get.translation(event.list1)+(event.list1.length>1?'各':'')+'摸一张牌');
					else event.addIndex++;
					event.list2.sortBySeat();
					if(event.list2.length) choices.push('令'+get.translation(event.list2)+(event.list2.length>1?'各':'')+'弃置一张手牌');
					player.chooseControl('cancel2').set('choiceList',choices).set('prompt',get.prompt('gongxiu')).set('',function(){
						var evt=_status.event.getParent();
						if(evt.list2.filter(function(current){
							return get.attitude(player,current)<=0&&!current.hasSkillTag('noh');
						}).length-evt.list1.length>1) return 1-evt.addIndex;
						return 0;
					});
					'step 1'
					if(result.control!='cancel2'){
						if(result.index+event.addIndex==0){
							player.logSkill('gongxiu',event.list1);
							game.asyncDraw(event.list1);
						}
						else{
							player.logSkill('gongxiu',event.list2);
							for(var i of event.list2) i.chooseToDiscard('h',true);
							event.finish();
						}
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
			},
			nhyinbing:{
				trigger:{source:'damageBefore'},
				forced:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha';
				},
				content:function(){
					trigger.cancel();
					trigger.player.loseHp(trigger.num);
				},
				group:'nhyinbing_draw',
				subSkill:{
					draw:{
						trigger:{global:'loseHpAfter'},
						forced:true,
						filter:function(event,player){
							return player!=event.player;
						},
						content:function(){
							player.draw();
						},
					},
				},
			},
			nhhuoqi:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				position:'he',
				filterCard:true,
				filterTarget:function(card,player,target){
					return target.isMinHp();
				},
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					target.recover();
					target.draw();
				},
				ai:{
					order:1,
					tag:{
						draw:1,
						recover:1,
					},
					result:{
						target:function(player,target){
							if(target.isDamaged()) return 3;
							if(ui.selected.cards.length) return 0;
							return 1;
						},
					},
				},
			},
			nhguizhu:{
				trigger:{global:'dying'},
				usable:1,
				logTarget:'player',
				frequent:true,
				content:function(){
					player.draw(2);
				},
			},
			nhxianshou:{
				enable:'phaseUse',
				usable:1,
				filterTarget:true,
				content:function(){
					target.draw(target.isHealthy()?2:1);
				},
				ai:{
					order:1,
					tag:{
						draw:1,
					},
					result:{
						target:function(player,target){
							return target.isHealthy()?2:0.5;
						},
					},
				},
			},
			nhlundao:{
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return event.source&&player!=event.source&&player.countCards('h')!=event.source.countCards('h');
				},
				logTarget:'source',
				check:function(event,player){
					return (player.countCards('h')<event.source.countCards('h'))||get.effect(event.source,{name:'guohe_copy2'},player,player)>0;
				},
				content:function(){
					if(player.countCards('h')>trigger.source.countCards('h')) player.draw();
					else player.discardPlayerCard(trigger.source,'he',true);
				},
			},
			nhguanyue:{
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				content:function(){
					'step 0'
					var cards=get.cards(2);
					player.chooseButton(['观月：选择获得一张牌',cards.slice(0)],true).set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					while(cards.length){
						ui.cardPile.insertBefore(cards.pop(),ui.cardPile.firstChild);
					}
					'step 1'
					if(result.bool){
						player.gain(result.links,'gain2');
					}
					'step 2'
					game.updateRoundNumber();
				},
			},
			nhyanzheng:{
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt('nhyanzheng')).set('goon',function(){
						var num=player.countCards('h')-1;
						return game.countPlayer(function(current){
							return get.damageEffect(current,player,player)>0;
						})>=Math.min(3,num)
					}()).set('ai',function(card){
						if(_status.event.goon) return Math.max(1,get.value(card));
						return 0;
					});
					'step 1'
					if(result.bool){
						player.logSkill('nhyanzheng');
						var cards=player.getCards('h',function(card){
							return card!=result.cards[0]&&lib.filter.cardDiscardable(card,player,'nhyanzheng');
						});
						if(cards.length){
							player.discard(cards);
							event.num=cards.length;
						}
						else event.finish();
					}
					else event.finish();
					'step 2'
					num=Math.min(num,game.countPlayer());
					player.chooseTarget([1,num],true,'对'+(num>1?'至多':'')+get.cnNumber(num)+'名角色造成1点伤害').set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 3'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						player.line(targets,'green');
						for(var i of targets) i.damage();
					}
				},
			},
			//周夷
			zhukou:{
				audio:2,
				trigger:{source:'damageSource'},
				filter:function(event,player){
					if(!player.getHistory('useCard').length) return false;
					var evt=event.getParent('phaseUse');
					if(!evt||!evt.player) return false;
					return player.getHistory('sourceDamage',function(evtx){
						return evtx.getParent('phaseUse')==evt;
					}).indexOf(event)==0;
				},
				frequent:true,
				content:function(){
					player.draw(player.getHistory('useCard').length);
				},
				group:'zhukou_all',
				subSkill:{
					all:{
						audio:'zhukou',
						trigger:{player:'phaseJieshuBegin'},
						filter:function(event,player){
							return game.countPlayer((current)=>(current!=player))>1&&!player.getHistory('sourceDamage').length;
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('zhukou'),'对两名其他角色各造成1点伤害',2,lib.filter.notMe).set('ai',function(target){
								var player=_status.event.player;
								return get.damageEffect(target,player,player);
							});
							'step 1'
							if(result.bool){
								var targets=result.targets.sortBySeat();
								player.logSkill('zhukou',targets);
								for(var i of targets) i.damage();
							}
						},
					},
				},
			},
			mengqing:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return game.countPlayer((current)=>current.isDamaged())>player.hp;
				},
				juexingji:true,
				skillAnimation:true,
				animationColor:'wood',
				content:function(){
					player.awakenSkill('mengqing');
					player.gainMaxHp(3);
					player.recover(3);
					player.removeSkill('zhukou');
					player.addSkill('yuyun');
				},
				derivation:'yuyun',
			},
			yuyun:{
				trigger:{player:'phaseUseBegin'},
				forced:true,
				filter:function(event,player){
					return player.hp>0||player.maxHp>1;
				},
				content:function(){
					'step 0'
					if(player.maxHp<=1) event._result={control:'失去体力',index:0};
					else if(player.hp<1) event._result={control:'减体力上限',index:1};
					else player.chooseControl('失去体力','减体力上限').set('prompt','玉陨：失去1点体力或减1点体力上限').set('ai',function(){
						var player=_status.event.player;
						if(player.hp<2||player.getDamagedHp()>2) return 1;
						return 0;
					});
					'step 1'
					if(result.index==1) player.loseMaxHp();
					else player.loseHp();
					'step 2'
					event.videoId=lib.status.videoId++;
					var func=function(player,id){
						var list=[
							'选项一：摸两张牌',
							'选项二：对一名其他角色造成1点伤害，且本回合对其使用【杀】无距离和次数限制',
							'选项三：本回合手牌上限视为无限',
							'选项四：获得一名其他角色区域内的一张牌',
							'选项五：令一名其他角色将手牌数摸至体力上限（至多摸至五张）',
						];
						var choiceList=ui.create.dialog('玉陨：请选择一'+(player.getDamagedHp()>0?('至'+get.cnNumber(player.getDamagedHp()+1)):'')+'项');
						choiceList.videoId=id;
						for(var i=0;i<list.length;i++){
							var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
							str+=list[i];
							str+='</div>';
							var next=choiceList.add(str);
							next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							next.firstChild.link=i;
							for(var j in lib.element.button){
								next[j]=lib.element.button[j];
							}
							choiceList.buttons.add(next.firstChild);
						}
						return choiceList;
					};
					if(player.isOnline2()){
						player.send(func,player,event.videoId);
					}
					event.dialog=func(player,event.videoId);
					if(player!=game.me||_status.auto){
						event.dialog.style.display='none';
					}
					var next=player.chooseButton();
					next.set('dialog',event.videoId);
					next.set('forced',true);
					next.set('ai',function(button){
						var player=_status.event.player;
						switch(button.link){
							case 0:
								return 2;
								break;
							case 1:
								return Math.max(0.5,player.countCards('hs',function(card){
									return get.name(card)=='sha'&&player.hasValueTarget(card);
								})-player.getCardUsable({name:'sha'}))+Math.max.apply(Math,game.filterPlayer(function(current){
									return current!=player;
								}).map(function(target){
									return get.damageEffect(target,player,player);
								}));
							 break;
							case 2:
								return player.needsToDiscard()/4;
							 break;
							case 3:
								var num=0;
								return 0.8*Math.max.apply(Math,game.filterPlayer(function(current){
									return current!=player&&current.hasCard((card)=>lib.filter.canBeGained(card,current,player),'hej');
								}).map(function(target){
									return get.effect(target,{name:'shunshou_copy'},player,player);
								}));
							 break;
							case 4:
								var num=0;
								game.countPlayer(function(current){
									if(current!=player&&get.attitude(player,current)>0){
										var num2=Math.min(5,current.maxHp)-current.countCards('h');
										if(num2>num) num=num2;
									}
								});
								return num*0.8;
							 break;
						}
					});
					if(player.getDamagedHp()>0) next.set('selectButton',[1,1+player.getDamagedHp()]);
					'step 3'
					if(player.isOnline2()){
						player.send('closeDialog',event.videoId);
					}
					event.dialog.close();
					result.links.sort();
					for(var i of result.links) game.log(player,'选择了','#g【玉陨】','的','#y选项'+get.cnNumber(1+i,true))
					event.links=result.links;
					if(result.links.contains(0)) player.draw(2);
					if(result.links.contains(2)) player.addTempSkill('yuyun_114514');
					'step 4'
					if(event.links.contains(1)&&game.hasPlayer(function(current){
						return current!=player;
					})) player.chooseTarget(lib.filter.notMe,true,'对一名其他角色造成1点伤害').set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					else if(event.links.contains(3)) event.goto(6);
					else if(event.links.contains(4)) event.goto(8);
					else event.finish();
					'step 5'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.damage();
						player.markAuto('yuyun_sha',[target]);
						player.addTempSkill('yuyun_sha');
					}
					if(event.links.contains(3)) event.goto(6);
					else if(event.links.contains(4)) event.goto(8);
					else event.finish();
					'step 6'
					if(event.links.contains(3)&&game.hasPlayer(function(current){
						return current!=player&&current.hasCard((card)=>lib.filter.canBeGained(card,current,player),'hej');
					})){
						player.chooseTarget(true,'获得一名其他角色区域内的一张牌',function(card,player,current){
							return current!=player&&current.hasCard((card)=>lib.filter.canBeGained(card,current,player),'hej');
						}).set('ai',function(target){
							var player=_status.event.player;
							return get.effect(target,{name:'shunshou_copy'},player,player);
						});
					}
					else if(event.links.contains(4)) event.goto(8);
					else event.finish();
					'step 7'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						player.gainPlayerCard(target,'hej',true);
					}
					if(!event.links.contains(4)) event.finish();
					'step 8'
					if(event.links.contains(4)&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')<Math.min(5,current.maxHp);
					})){
						player.chooseTarget(true,'令一名其他角色将手牌数摸至体力上限',function(card,player,current){
							return current!=player&&current.countCards('h')<Math.min(5,current.maxHp);
						}).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(target.hasSkillTag('nogain')) att/=6;
							if(att>2){
								return Math.min(5,target.maxHp)-target.countCards('h');
							}
							return att/3;
						});
					}
					else event.finish();
					'step 9'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.drawTo(Math.min(5,target.maxHp));
					}
				},
				subSkill:{
					'114514':{
						mod:{
							maxHandcardFinal:function(player,num){
								return 114514;
							},
						},
						charlotte:true,
					},
					sha:{
						mod:{
							cardUsableTarget:function(card,player,target){
								if(card.name=='sha'&&player.getStorage('yuyun_sha').contains(target)) return Infinity;
							},
							targetInRange:function(card,player,target){
								if(card.name=='sha'&&player.getStorage('yuyun_sha').contains(target)) return true;
							},
						},
						charlotte:true,
						onremove:true,
					},
				},
			},
			//樊稠
			xinxingluan:{
				audio:'xinfu_xingluan',
				usable:1,
				trigger:{player:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					return player.isPhaseUsing();
				},
				content:function(){
					'step 0'
					var list=['观看牌堆中两张点数为6的牌并获得其中一张'];
					event.addIndex=1;
					var bool2=false,bool3=game.hasPlayer(function(current){
						if(current!=player&&current.countCards('he')>0) bool2=true;
						return current.hasCard(function(card){
							return get.number(card)==6&&lib.filter.canBeGained(card,current,player);
						},'ej');
					});
					if(bool2){
						event.addIndex=0;
						list.push('令一名其他角色弃置一张点数为6的牌或交给你一张牌');
					}
					if(bool3) list.push('获得场上一张点数为6的牌');
					player.chooseControl('cancel2').set('choiceList',list).set('prompt',get.prompt('xinxingluan')).set('ai',function(){
						var player=_status.event.player;
						if(game.hasPlayer(function(current){
							if(current==player) return false;
							var att=-get.sgn(get.attitude(player,current)-0.1);
							return current.hasCard(function(card){
								return get.number(card)==6&&lib.filter.canBeGained(card,current,player)&&get.sgn(get.useful(card,current))==att;
							},'ej');
						})) return 2-_status.event.getParent().addIndex;
						if(game.hasPlayer(function(target){
							if(target==player) return false;
							var att=get.attitude(player,target);
							return att<0&&target.countCards('he')>0&&!target.hasCard(function(card){
								return get.value(card,target)<=0;
							},'he');
						})) return 1;
						return 0;
					});
					'step 1'
					if(result.control!='cancel2'){
						if(result.index==0){
							player.logSkill('xinxingluan');
						}
						else if(result.index+event.addIndex==1) event.goto(6);
						else event.goto(4);
					}
					else event.finish();
					'step 2'
					var cards=[];
					while(cards.length<2){
						var card=get.cardPile2(function(card){
							return !cards.contains(card)&&get.number(card)==6;
						});
						if(!card) break;
						cards.push(card);
					}
					if(!cards.length){
						player.draw(6);
						event.finish();
					}
					else if(cards.length==1){
						event._result={bool:true,links:cards};
					}
					else player.chooseButton(['兴乱：选择获得其中一张',cards],true).set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					'step 3'
					if(result.bool){
						player.gain(result.links,'gain2');
					}
					event.finish();
					'step 4'
					player.chooseTarget('获得一名角色装备区或判定区内点数为6的牌',true,function(card,player,current){
						return current.hasCard(function(card){
							return get.number(card)==6&&lib.filter.canBeGained(card,current,player);
						},'ej');
					}).set('ai',function(target){
						var player=_status.event.player,att=-get.sgn(get.attitude(player,target)-0.1),max=0,ej=target.getCards('ej',function(card){
							return get.number(card)==6&&lib.filter.canBeGained(card,target,player);
						});
						for(var i of ej){
							var num=get.useful(i,target)*att;
							if(num>max) max=num;
							return max;
						}
					});
					'step 5'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('xinxingluan',target);
						player.gainPlayerCard(target,'ej',true).set('filterButton',function(button){
							return get.number(button.link)==6;
						});
					}
					event.finish();
					'step 6'
					player.chooseTarget('令一名其他角色弃置一张点数为6的牌，否则交给你一张牌',true,function(card,player,current){
						return current!=player&&current.countCards('he')>0;
					}).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(att>=0) return 0;
						if(!target.hasCard(function(card){
				 			return get.value(card,target)<=0;
						},'he')) return -att/Math.sqrt(target.countCards('he'));
						return 0;
					});
					'step 7'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('xinxingluan',target);
						target.chooseToDiscard('he','弃置一张点数为6的牌，否则交给'+get.translation(player)+'一张牌',function(card){
							return get.number(card)==6;
						}).ai=(card)=>(8-get.value(card));
					}
					'step 8'
					if(!result.bool){
						target.chooseCard('he',true,'交给'+get.translation(player)+'一张牌');
					}
					else event.finish();
					'step 9'
					if(result.bool) player.gain(result.cards,target,'giveAuto');
				},
			},
			rexingluan:{
				audio:'xinfu_xingluan',
				usable:1,
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					return event.targets&&event.targets.length==1&&typeof get.number(event.card,false)=='number'&&player.isPhaseUsing();
				},
				direct:true,
				content:function(){
					'step 0'
					var str='',num=get.number(trigger.card,false),nums=get.strNumber(num);
					var list=game.filterPlayer(function(current){
						return current.hasCard(function(card){
							return get.number(card)==num&&lib.filter.canBeGained(card,current,player);
						},'ej');
					});
					if(list.length){
						str+='获得一名角色装备区或判定区内的一张点数为'+nums+'的牌，或直接从牌堆中获得一张点数为'+nums+'的牌';
						player.chooseTarget(get.prompt('rexingluan'),str,[0,1],function(card,player,target){
							return _status.event.targets.contains(target);
						}).set('targets',list).set('ai',function(target){
							if(!target) return 1;
							var player=_status.event.player,num=get.number(_status.event.getTrigger().card,false),att=-get.sgn(get.attitude(player,target));
							if(target.hasCard(function(card){
								return get.number(card)==num&&get.effect(target,card,target,player)<0;
							},'j')) return 1.2*Math.abs(get.attitude(player,target));
							if(target.hasCard(function(card){
								return get.number(card)==num&&get.sgn(get.value(card,target)+0.1)==att;
							},'e')) return Math.abs(get.attitude(player,target));
							return 0;
						});
					}
					else{
						player.chooseBool(get.prompt('rexingluan'),'从牌堆中获得一张点数为'+nums+'的牌').ai=()=>true;
					}
					'step 1'
					if(result.bool){
						if(result.targets&&result.targets.length){
							var target=result.targets[0];
							player.logSkill('rexingluan',target);
							player.gainPlayerCard(target,'ej',true).set('num',get.number(trigger.card,false)).set('filterButton',function(button){
								return get.number(button.link)==_status.event.num;
							});
						}
						else{
							player.logSkill('rexingluan');
							var num=get.number(trigger.card,false),card=get.cardPile2(function(i){
								return get.number(i,false)==num;
							});
							if(card) player.gain(card,'gain2');
						}
					}
				},
			},
			//吕玲绮
			guowu:{
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				preHidden:true,
				content:function(){
					'step 0'
					var hs=player.getCards('h');
					player.showCards(hs,get.translation(player)+'发动了【帼舞】');
					var list=[];
					for(var i of hs){
						list.add(get.type2(i,player));
						if(list.length>=3) break;
					}
					if(list.length>=1){
						var card=get.discardPile(function(i){
							return i.name=='sha';
						});
						if(card) player.gain(card,'gain2');
					}
					if(list.length>=2) player.addTempSkill('guowu_dist','phaseUseAfter');
					if(list.length>=3) player.addTempSkill('guowu_add','phaseUseAfter');
				},
				subSkill:{
					dist:{
						charlotte:true,
						mod:{targetInRange:()=>true},
					},
					add:{
						charlotte:true,
						trigger:{player:'useCard1'},
						direct:true,
						filter:function(event,player){
							var info=get.info(event.card,false);
							if(info.allowMultiple==false) return false;
							if(event.card.name!='sha'&&info.type!='trick') return false;
							if(event.targets&&!info.multitarget){
								if(game.hasPlayer(function(current){
									return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current)&&lib.filter.targetInRange(event.card,player,current);
								})){
									return true;
								}
							}
							return false;
						},
						content:function(){
							'step 0'
							var num=game.countPlayer(function(current){
								return !trigger.targets.contains(current)&&lib.filter.targetEnabled2(trigger.card,player,current)&&lib.filter.targetInRange(trigger.card,player,current);
							});
							player.chooseTarget('帼舞：是否为'+get.translation(trigger.card)+'增加'+(num>1?'至多两个':'一个')+'目标？',[1,Math.min(2,num)],function(card,player,target){
								var trigger=_status.event.getTrigger();
								var card=trigger.card;
								return !trigger.targets.contains(target)&&lib.filter.targetEnabled2(card,player,target)&&lib.filter.targetInRange(card,player,target);
							}).set('ai',function(target){
								var player=_status.event.player;
								var card=_status.event.getTrigger().card;
								return get.effect(target,card,player,player);
							});
							'step 1'
							if(result.bool){
								if(player!=game.me&&!player.isOnline()) game.delayx();
							}
							else event.finish();
							'step 2'
							var targets=result.targets.sortBySeat();
							player.logSkill('guowu_add',targets);
							trigger.targets.addArray(targets);
							if(get.mode()=='guozhan') player.removeSkill('guowu_add');
						},
					},
				},
			},
			zhuangrong:{
				derivation:['llqshenwei','wushuang'],
				trigger:{global:'phaseEnd'},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return player.hp==1||player.countCards('h')==1;
				},
				content:function(){
					'step 0'
					player.awakenSkill('zhuangrong');
					player.loseMaxHp();
					'step 1'
					if(player.maxHp>player.hp) player.recover(player.maxHp-player.hp);
					'step 2'
					player.drawTo(Math.min(5,player.maxHp));
					player.addSkillLog('llqshenwei');
					player.addSkillLog('wushuang');
				},
			},
			llqshenwei:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				forced:true,
				filter:(event)=>!event.numFixed,
				content:function(){
					trigger.num+=2;
				},
				mod:{
					maxHandcard:(player,num)=>num+2,
				},
			},
			//杜夫人
			yise:{
				audio:2,
				trigger:{global:'gainAfter'},
				filter:function(event,player){
					if(player==event.player||!event.player.isIn()) return false;
					var evt=event.getl(player);
					if(!evt||!evt.cards2.length) return false;
					if(event.player.isDamaged()) return true;
					for(var i of evt.cards2){
						var color=get.color(i,player);
						if(color=='black') return true;
					}
					return false;
				},
				direct:true,
				content:function(){
					'step 0'
					var cards=trigger.getl(player).cards2;
					for(var i of cards){
						event[get.color(i,player)]=true;
						if(event.red&&event.black) break;
					}
					if(event.red&&trigger.player.isDamaged()){
						player.chooseBool(get.prompt('yise',trigger.player),'令'+get.translation(trigger.player)+'回复1点体力').set('ai',()=>get.recoverEffect(_status.event.getTrigger().player,_status.event.player,_status.event.player)>0);
					}
					'step 1'
					if(event.black||event.red&&result.bool) player.logSkill('yise',trigger.player);
					if(event.red&&result.bool) trigger.player.recover();
					if(event.black){
						trigger.player.addMark('yise_damage',1,false);
						trigger.player.addSkill('yise_damage');
					}
				},
				subSkill:{
					damage:{
						trigger:{player:'damageBegin1'},
						forced:true,
						charlotte:true,
						onremove:true,
						filter:function(event,player){
							return event.card&&event.card.name=='sha'&&event.getParent().name=='sha';
						},
						content:function(){
							trigger.num+=player.countMark('yise_damage');
							player.removeSkill('yise_damage');
						},
						intro:{
							content:'下一次受到杀的伤害+#',
						},
					},
				},
			},
			shunshi:{
				trigger:{player:['damageEnd','phaseZhunbeiBegin']},
				direct:true,
				filter:function(event,player){
					return (event.name!='damage'||player!=_status.currentPhase)&&player.countCards('he')>0&&game.hasPlayer(function(current){
						return current!=player&&current!=event.source;
					});
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:get.prompt('shunshi'),
						prompt2:'将一张牌交给一名其他角色，并获得+1效果',
						filterCard:true,
						filterTarget:function(card,player,target){
							return target!=player&&target!=_status.event.source;
						},
						position:'he',
						source:trigger.source,
						ai1:function(card){
							var player=_status.event.player;
							if(player.hasSkill('yise')){
								if(get.color(card,player)=='red'&&game.hasPlayer(function(current){
									return current!=player&&current!=_status.event.source&&current.isDamaged()&&get.recoverEffect(current,player,player)>0;
								})) return 10-get.value(card);
								if(get.color(card,player)=='black') return 4-get.value(card);
							}
							return 8-get.value(card);
						},
						ai2:function(target){
							var player=_status.event.player,card=ui.selected.cards[0];
							if(player.hasSkill('yise')){
								if(get.color(card)=='red'&&target.isDamaged()) return 2*get.recoverEffect(target,player,player);
								if(get.color(card)=='black') return -get.attitude(player,target);
							}
							if(get.value(card,target)<0) return -get.attitude(player,target);
							if(get.value(card,target)<1) return 0.01*-get.attitude(player,target);
							return Math.max(1,get.value(card,target)-get.value(card,player))*get.attitude(player,target);
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('shunshi',target);
						target.gain(result.cards,player,'giveAuto');
						player.addMark('shunshi_mark',1,false);
						player.addTempSkill('shunshi_mark',{player:'phaseEnd'});
					}
				},
				subSkill:{
					mark:{
						onremove:true,
						trigger:{player:'phaseDrawBegin2'},
						forced:true,
						charlotte:true,
						popup:false,
						filter:function(event,player){
							return !event.numFixed;
						},
						content:function(){
							trigger.num+=player.countMark('shunshi_mark');
						},
						mod:{
							maxHandcard:function(player,num){
								return num+player.countMark('shunshi_mark');
							},
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('shunshi_mark');
							},
						},
						intro:{
							content:'拥有#层效果',
						},
					},
				},
			},
			cuijian:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer((current)=>lib.skill.cuijian.filterTarget(null,player,current));
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				content:function(){
					'step 0'
					var hs=target.getCards('h','shan');
					if(hs.length){
						hs.addArray(target.getCards('he',function(card){
							return get.subtype(card)=='equip2';
						}))
						player.gain(hs,target,'give');
						if(player.hasMark('zhtongyuan_basic')) event.finish();
						else event.num=hs.length;
					}
					else{
						if(player.hasMark('zhtongyuan_trick')) player.draw(2);
						event.finish();
					}
					'step 1'
					var hs=player.getCards('he');
					if(!hs.length||!target.isIn()) event.finish();
					else if(hs.length<=num) event._result={bool:true,cards:hs};
					else player.chooseCard('he',true,'选择交给'+get.translation(target)+get.cnNumber(num)+'张牌',num);
					'step 2'
					if(result.bool&&result.cards&&result.cards.length) target.gain(result.cards,player,'giveAuto');
				},
				ai:{
					order:4,
					result:{
						player:function(player,target){
							if(!target.countCards('h','shan')) return player.hasMark('zhtongyuan_trick')?2:0;
							return 0;
						},
						target:function(player,target){
							if(target.countCards('h','shan')){
								var num=-target.countCards('h')/2;
								var card=target.getEquip(2);
								if(card) num-=(get.value(card,target)/2);
								return num;
							}
							return -0.01;
						},
					},
				},
			},
			tongyuan:{audio:2},
			zhtongyuan:{
				audio:'tongyuan',
				trigger:{player:['useCardAfter','respondAfter']},
				forced:true,
				filter:function(event,player){
					var type=get.type2(event.card,false);
					return (type=='basic'||type=='trick')&&get.color(event.card,false)=='red'&&!player.hasMark('zhtongyuan_'+type);
				},
				content:function(){
					var type=get.type2(trigger.card,false);
					if(!player.hasMark('zhtongyuan_'+type)){
						player.addMark('zhtongyuan_'+type,1,false);
						game.log(player,'修改了技能','#g【摧坚】');
					}
				},
				group:['zhtongyuan_basic','zhtongyuan_trick'],
				subSkill:{
					basic:{
						trigger:{player:'useCard2'},
						direct:true,
						locked:true,
						filter:function(event,player){
							if(!player.hasMark('zhtongyuan_basic')||!player.hasMark('zhtongyuan_trick')) return false;
							var card=event.card;
							if(get.color(card,false)!='red'||get.type(card,null,true)!='basic') return false;
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
							player.chooseTarget(get.prompt('zhtongyuan'),function(card,player,target){
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
								player.logSkill('zhtongyuan',event.targets);
								trigger.targets.addArray(event.targets);
							}
						},
					},
					trick:{
						audio:'zhtongyuan',
						trigger:{player:'useCard'},
						forced:true,
						filter:function(event,player){
							if(!player.hasMark('zhtongyuan_basic')||!player.hasMark('zhtongyuan_trick')) return false;
							var card=event.card;
							return (get.color(card,false)=='red'&&get.type(card,null,false)=='trick');
						},
						content:function(){
							trigger.directHit.addArray(game.filterPlayer());
							game.log(trigger.card,'不可被响应');
						},
					},
				},
			},
			xianwei:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.countDisabled()<5;
				},
				content:function(){
					'step 0'
					player.chooseToDisable().ai=function(event,player,list){
						var getVal=function(num){
							var card=player.getEquip(num);
							if(card){
								var val=get.value(card);
								if(val>0) return 0;
								return 5-val;
							}
							switch(num){
								case 'equip3':return 4.5;break;
								case 'equip4':return 4.4;break;
								case 'equip5':return 4.3;break;
								case 'equip2':return (3-player.hp)*1.5;break;
								case 'equip1':{
									if(game.hasPlayer(function(current){
										return (get.realAttitude||get.attitude)(player,current)<0&&get.distance(player,current)>1;
									})) return 0;
									return 3.2;
								}
							}
						}
						list.sort(function(a,b){
							return getVal(b)-getVal(a);
						});
						return list[0];
					};
					'step 1'
					var cardType=result.control;
					event.cardType=cardType;
					var num=player.countDisabled();
					if(num<5) player.draw(5-num);
					player.chooseTarget(lib.filter.notMe,'是否令一名其他角色从牌堆中使用一张'+get.translation(cardType)+'牌？').set('ai',function(target){
						var player=_status.event.player,type=_status.event.cardType;
						var card=get.cardPile2(function(card){
							return get.subtype(card)==type&&target.canUse(card,target);
						});
						if(!card) return 0;
						return get.effect(target,card,target,player);
					}).set('cardType',event.cardType);
					'step 2'
					if(!result.bool) return;
					var target=result.targets[0];
					player.line(target,'green');
					var card=get.cardPile2(function(card){
						return get.subtype(card)==event.cardType&&target.canUse(card,target);
					});
					if(card) target.chooseUseTarget(card,'nopopup',true);
					else target.draw();
				},
				group:'xianwei_all',
				subSkill:{
					all:{
						trigger:{player:'disableEquipAfter'},
						forced:true,
						filter:function(event,player){
							return player.countDisabled()>=5;
						},
						content:function(){
							player.gainMaxHp(2);
							player.addSkill('xianwei_effect');
						},
					},
					effect:{
						charlotte:true,
						mark:true,
						intro:{content:'和其他角色视为在彼此的攻击范围内'},
						mod:{
							inRange:()=>true,
							inRangeOf:()=>true,
						},
					},
				},
			},
			zhiren:{
				audio:2,
				trigger:{player:'useCard'},
				filter:function(event,player){
					return (player==_status.currentPhase||player.hasSkill('yaner_zhiren'))&&event.card.isCard&&player.getHistory('useCard',function(evt){
						return evt.card.isCard;
					}).indexOf(event)==0;
				},
				frequent:true,
				locked:false,
				content:function(){
					'step 0'
					event.num=get.translation(trigger.card.name).length;
					player.chooseToGuanxing(event.num);
					if(event.num<2) event.finish();
					'step 1'
					if(!game.hasPlayer(function(current){
						return current.countDiscardableCards(player,'e')>0;
					})){
						event.goto(3);
					}
					else player.chooseTarget('织纴：是否弃置一名角色装备区内的一张牌？',function(card,player,target){
						return target.countDiscardableCards(player,'e')>0;
					}).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target),es=target.getCards('e'),val=0;
						for(var i of es){
							var eff=-(get.value(i,target)-0.1)*att;
							if(eff>val) val=eff;
						}
						return eff;
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.addExpose(0.15);
						player.line(target,'green');
						player.discardPlayerCard(target,'e',true);
					}
					else event.goto(5);
					if(event.num<3) event.finish();
					'step 3'
					if(!game.hasPlayer(function(current){
						return current.countDiscardableCards(player,'j')>0;
					})){
						if(event.num<3) event.finish();
						else event.goto(5);
					}
					else player.chooseTarget('织纴：是否弃置一名角色判定区内的一张牌？',function(card,player,target){
						return target.countDiscardableCards(player,'j')>0;
					}).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target),es=target.getCards('j'),val=0;
						for(var i of es){
							var eff=-(get.effect(target,i,target,player))
							if(eff>val) val=eff;
						}
						return eff;
					});
					'step 4'
					if(result.bool){
						var target=result.targets[0];
						player.addExpose(0.15);
						player.line(target,'green');
						player.discardPlayerCard(target,'j',true);
					}
					if(event.num<3) event.finish();
					'step 5'
					player.recover();
					if(event.num<4) event.finish();
					'step 6'
					player.draw(3);
				},
				mod:{
					aiOrder:function(player,card,num){
						if(player==_status.currentPhase&&!player.getHistory('useCard',function(evt){
							return evt.card.isCard;
						}).length) return num+Math.pow(get.translation(card.name).length,2);
					},
				},
			},
			yaner:{
				audio:2,
				trigger:{
					global:['equipAfter','addJudgeAfter','loseAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				filter:function(event,player){
					var current=_status.currentPhase;
					if(!current||current==player||!current.isIn()||!current.isPhaseUsing()) return false;
					var evt=event.getl(current);
					return evt&&evt.hs&&evt.hs.length&&current.countCards('h')==0;
				},
				usable:1,
				logTarget:function(){
					return _status.currentPhase;
				},
				prompt2:'与该角色各摸两张牌',
				check:function(event,player){
					return get.attitude(player,_status.currentPhase)>0;
				},
				content:function(){
					'step 0'
					game.asyncDraw([_status.currentPhase,player],2);
					'step 1'
					var e1=player.getHistory('gain',function(evt){
						return evt.getParent(2)==event;
					})[0];
					if(e1&&e1.cards&&e1.cards.length==2&&get.type(e1.cards[0])==get.type(e1.cards[1])){
						player.addTempSkill('yaner_zhiren',{player:'phaseBegin'});
						game.log(player,'修改了技能','#g【织纴】');
					}
					var target=_status.currentPhase;
					if(target.isIn()&&target.isDamaged()){
						var e2=target.getHistory('gain',function(evt){
							return evt.getParent(2)==event;
						})[0];
						if(e2&&e2.cards&&e2.cards.length==2&&get.type(e2.cards[0])==get.type(e2.cards[1])) target.recover();
					}
					'step 2'
					game.delayx();
				},
				subSkill:{
					zhiren:{},
				},
				ai:{
					expose:0.5,
				},
			},
			rehuoshui:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					var num=Math.min(game.countPlayer()-1,Math.max(1,player.getDamagedHp()));
					var str;
					if(num>1){
						str='选择至多'+get.cnNumber(num)+'名其他角色。';
						var list=['第一名角色的非锁定技失效直到回合结束','；第二名角色交给你一张手牌','；第三名及之后角色弃置装备区内的所有牌'];
						for(var i=0;i<Math.min(3,num);i++){
							str+=list[i];
						}
						str+='。';
					}
					else str='令一名其他角色的非锁定技本回合内失效';
					player.chooseTarget([1,num],get.prompt('rehuoshui'),str,lib.filter.notMe).set('ai',function(target){
						var att=-get.attitude(_status.event.player,target);
						if(att<=0) return 0;
						if(target.hasSkillTag('maixie')||target.hasSkill('maixie_hp')||target.hasSkill('maixie_defed')) att*=3;
						return att/get.threaten(target);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets;
						player.logSkill('rehuoshui',targets);
						event.targets=targets;
						targets[0].addTempSkill('fengyin');
						if(targets.length<2) event.goto(5);
					}
					else event.finish();
					'step 2'
					if(targets[1].countCards('h')==0) event.goto(targets.length>2?4:5);
					else targets[1].chooseCard('h',true,'交给'+get.translation(player)+'一张手牌');
					'step 3'
					if(result.bool){
						player.gain(result.cards,targets[1],'giveAuto');
					}
					if(targets.length<3) event.goto(5);
					'step 4'
					var num=targets[2].countCards('e');
					if(num>0) targets[2].chooseToDiscard('e',true,num);
					'step 5'
					game.delayx();
				},
			},
			reqingcheng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer((current)=>lib.skill.reqingcheng.filterTarget(null,player,current));
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.hasSex('male')&&target.countCards('h')<player.countCards('h');
				},
				content:function(){
					player.swapHandcards(target);
				},
				ai:{
					order:1,
					result:{
						player:function(player,target){
							if(target.countCards('h')>0) return -Math.max(get.value(target.getCards('h'),player)-get.value(player.getCards('h'),player),0);
							return 0;
						},
					},
				},
			},
			//陆郁生
			zhente:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				logTarget:'player',
				usable:1,
				preHidden:true,
				filter:function(event,player){
					var color=get.color(event.card);
					if(player==event.player||event.player.isDead()||color=='none'||(get.mode()=='guozhan'&&color!='black')) return false;
					var type=get.type(event.card);
					return type=='basic'||type=='trick';
				},
				check:function(event,player){
					return !event.excluded.contains(player)&&get.effect(player,event.card,event.player,player)<0;
				},
				content:function(){
					'step 0'
					trigger.player.chooseControl().set('choiceList',[
						'本回合内不能再使用'+get.translation(get.color(trigger.card))+'牌',
						'令'+get.translation(trigger.card)+'对'+get.translation(player)+'无效',
					]).set('prompt',get.translation(player)+'发动了【贞特】，请选择一项').set('ai',function(){
						var player=_status.event.player;
						var target=_status.event.getParent().player;
						var card=_status.event.getTrigger().card,color=get.color(card);
						if(get.effect(target,card,player,player)<=0) return 1;
						var hs=player.countCards('h',function(card){
							return get.color(card,player)==color&&player.hasValueTarget(card,null,true);
						});
						if(!hs.length) return 0;
						if(hs>1) return 1;
						return Math.random()>0.5?0:1;
					});
					'step 1'
					if(result.index==0){
						trigger.player.addTempSkill('zhente2');
						trigger.player.storage.zhente2.add(get.color(trigger.card));
						trigger.player.markSkill('zhente2');
					}
					else trigger.excluded.add(player);
				},
			},
			zhente2:{
				mod:{
					cardEnabled:function(card,player){
						if(player.getStorage('zhente2').contains(get.color(card))) return false;
					},
					cardSavable:function(card,player){
						if(player.getStorage('zhente2').contains(get.color(card))) return false;
					},
				},
				charlotte:true,
				onremove:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				intro:{content:'本回合内不能使用$牌'},
			},
			zhiwei:{
				audio:2,
				trigger:{
					player:['enterGame','showCharacterAfter','phaseBegin'],
					global:['phaseBefore'],
				},
				direct:true,
				filter:function(event,player){
					if(player.hasSkill('zhiwei2')) return false;
					if(get.mode()=='guozhan') return event.name=='showCharacter'&&(event.toShow.contains('gz_luyusheng')||event.toShow.contains('luyusheng'));
					return event.name!='showCharacter'&&(event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					'step 0'
					player.chooseTarget('请选择【至微】的目标','选择一名其他角色。该角色造成伤害后，你摸一张牌，该角色受到伤害后，你随机弃置一张手牌。你弃牌阶段弃置的牌均被该角色获得。',true,lib.filter.notMe).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>0) return 1+att;
						return Math.random();
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zhiwei',target);
						player.storage.zhiwei2=target;
						player.addSkill('zhiwei2');
					}
				},
			},
			zhiwei2:{
				group:['zhiwei2_draw','zhiwei2_discard','zhiwei2_gain','zhiwei2_clear'],
				charlotte:true,
				onremove:true,
				mark:'character',
				intro:{content:'$造成伤害后你摸一张牌；$受到伤害后你弃置一张牌；你于弃牌阶段弃置牌后交给$'},
				subSkill:{
					draw:{
						audio:'zhiwei',
						trigger:{global:'damageSource'},
						forced:true,
						filter:function(event,player){
							return event.source==player.storage.zhiwei2;
						},
						logTarget:'source',
						content:function(){
							player.draw();
						},
					},
					discard:{
						audio:'zhiwei',
						trigger:{global:'damageEnd'},
						forced:true,
						filter:function(event,player){
							return event.player==player.storage.zhiwei2&&player.countCards('h',function(card){
								return lib.filter.cardDiscardable(card,player,'zhiwei2_discard');
							});
						},
						logTarget:'player',
						content:function(){
							player.discard(player.getCards('h',function(card){
								return lib.filter.cardDiscardable(card,player,'zhiwei2_discard');
							}).randomGet());
						},
					},
					gain:{
						audio:'zhiwei',
						trigger:{player:'loseAfter'},
						forced:true,
						filter:function(event,player){
							return event.type=='discard'&&event.getParent('phaseDiscard').player==player&&player.storage.zhiwei2&&player.storage.zhiwei2.isIn()&&event.cards2.filterInD('d').length>0;
						},
						logTarget:function(event,player){
							return player.storage.zhiwei2;
						},
						content:function(){
							if(trigger.delay===false) game.delay();
							player.storage.zhiwei2.gain(trigger.cards2.filterInD('d'),'gain2');
						},
					},
					clear:{
						audio:'zhiwei',
						trigger:{
							global:'die',
							player:['hideCharacterEnd','removeCharacterEnd'],
						},
						forced:true,
						filter:function(event,player){
							if(event.name=='die') return event.player==player.storage.zhiwei2;
							if(event.name=='removeCharacter') return event.toRemove=='luyusheng'||event.toRemove=='gz_luyusheng';
							return event.toHide=='luyusheng'||event.toHide=='gz_luyusheng';
						},
						content:function(){
							'step 0'
							player.removeSkill('zhiwei2');
							if(trigger.name!='die'||get.mode()!='guozhan') event.finish();
							'step 1'
							if(player.name1=='gz_luyusheng'||player.name1=='luyusheng') player.hideCharacter(0);
							if(player.name2=='gz_luyusheng'||player.name2=='luyusheng') player.hideCharacter(1);
						},
					},
				},
			},
			//华歆
			spwanggui:{
				audio:'wanggui',
				trigger:{source:'damageSource'},
				direct:true,
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.group!=player.group;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('spwanggui'),'对一名势力不同的其他角色造成1点伤害',function(card,player,target){
						return target.group!=player.group;
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('spwanggui',target);
						target.damage();
					}
					else player.storage.counttrigger.spwanggui--;
				},
				group:'spwanggui_draw',
				subSkill:{
					draw:{
						trigger:{player:'damageEnd'},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('spwanggui'),'令自己摸一张牌，或和一名势力相同的其他角色各摸一张牌',function(card,player,target){
								return target.group==player.group;
							}).set('ai',function(target){
								var player=_status.event.player,att=get.attitude(player,target);
								if(target!=player) att*=2;
								if(target.hasSkillTag('nogain')) att/=1.7;
								return att;
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('spwanggui',target);
								if(player==target){
									player.draw();
									event.finish();
								}
								else{
									var list=[player,target].sortBySeat();
									game.asyncDraw(list);
								}
							}
							else event.finish();
							'step 2'
							game.delayx();
						},
					},
				},
			},
			wanggui:{
				audio:2,
				trigger:{
					player:'damageEnd',
					source:'damageSource',
				},
				direct:true,
				filter:function(event,player){
					return player.hasSkill('wanggui')&&!player.hasSkill('wanggui2');
				},
				preHidden:true,
				content:function(){
					'step 0'
					player.addTempSkill('wanggui2');
					var bool=player.isUnseen(2);
					if(bool){
						player.chooseTarget('望归：是否对一名势力不同的角色造成1点伤害？',function(card,player,target){
							return target.isEnemyOf(player);
						}).set('ai',function(target){
							var player=_status.event.player;
							return get.damageEffect(target,player,player);
						}).setHiddenSkill('wanggui');
					}
					else event.goto(2);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('wanggui',target);
						target.damage();
					}
					event.finish();
					'step 2'
					player.chooseBool('望归：是否令所有与自己势力相同的角色各摸一张牌？').setHiddenSkill('wanggui');
					'step 3'
					if(result.bool){
						var targets=game.filterPlayer(function(current){
							return current.isFriendOf(player);
						});
						targets.sortBySeat();
						player.logSkill('wanggui',targets);
						game.asyncDraw(targets);
					}
					else event.finish();
					'step 4'
					game.delayx();
				},
			},
			wanggui2:{},
			xibing:{
				audio:2,
				trigger:{global:'useCardToPlayered'},
				filter:function(event,player){
					if(player==event.player||event.targets.length!=1||event.player.countCards('h')>=event.player.hp) return false;
					var bool=function(card){
						return (card.name=='sha'||get.type(card,false)=='trick')&&get.color(card,false)=='black';
					};
					if(!bool(event.card)) return false;
					var evt=event.getParent('phaseUse');
					if(evt.player!=event.player) return false;
					return get.mode()!='guozhan'||event.player.getHistory('useCard',function(evtx){
						return bool(evtx.card)&&evtx.getParent('phaseUse')==evt;
					})[0]==event.getParent();
				},
				logTarget:'player',
				check:function(event,player){
					var target=event.player;
					var att=get.attitude(player,target);
					var num2=Math.min(5,target.hp-target.countCards('h'));
					if(num2<=0) return att<=0;
					var num=target.countCards('h',function(card){
						return target.hasValueTarget(card,null,true);
					});
					if(!num) return att>0;
					return num>num2;
				},
				preHidden:true,
				content:function(){
					'step 0'
					var num=Math.min(5,trigger.player.hp-trigger.player.countCards('h'));
					if(num>0) trigger.player.draw(num);
					trigger.player.addTempSkill('xibing2');
					player._xibing=true;
					if(get.mode()!='guozhan'||player.isUnseen(2)||trigger.player.isUnseen(2)) event.finish();
					'step 1'
					var target=trigger.player;
					var players1=[player.name1,player.name2];
					var players2=[target.name1,target.name2];
					player.chooseButton(2,[
						'是否暗置自己和'+get.translation(target)+'的各一张武将牌？',
						'<div class="text center">你的武将牌</div>',
						[players1,'character'],
						'<div class="text center">'+get.translation(target)+'的武将牌</div>',
						[players2,'character'],
					]).set('players',players1).set('complexSelect',true).set('filterButton',function(button){
						return !get.is.jun(button.link)&&(ui.selected.buttons.length==0)==(_status.event.players.contains(button.link));
					});
					'step 2'
					if(result.bool){
						var target=trigger.player;
						player.hideCharacter(player.name1==result.links[0]?0:1);
						target.hideCharacter(target.name1==result.links[1]?0:1);
						player.addTempSkill('xibing3');
						target.addTempSkill('xibing3');
					}
				},
			},
			xibing2:{
				mod:{
					cardEnabled2:function(card){
						if(get.position(card)=='h') return false;
					},
				},
			},
			xibing3:{
				ai:{nomingzhi:true},
			},
			//董白
			relianzhu:{
				audio:'lianzhu',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				discard:false,
				lose:false,
				delay:false,
				position:'he',
				filterTarget:lib.filter.notMe,
				check:function(card){
					var num=get.value(card);
					if(get.color(card)=='black'){
						if(num>=6) return 0;
						return 9-num;
					}
					else{
						return 7-num;
					}
				},
				content:function(){
					'step 0'
					target.gain(cards,player,'give');
					'step 1'
					if(get.color(cards[0],player)=='red'){
						player.draw();
						event.finish();
					}
					else{
						target.chooseToDiscard('he',2,'弃置两张牌，或令'+get.translation(player)+'摸两张牌').set('goon',get.attitude(target,player)<0).set('ai',function(card){
							if(!_status.event.goon) return -get.value(card);
							return 6-get.value(card);
						});
					}
					'step 2'
					if(!result.bool) player.draw(2);
				},
				ai:{
					order:3,
					expose:0.2,
					result:{
						target:function(player,target){
							if(ui.selected.cards.length&&get.color(ui.selected.cards[0])=='red'){
								if(target.countCards('h')<player.countCards('h')) return 1;
								return 0.5;
							}
							return -1;
						}
					}
				}
			},
			rexiahui:{
				audio:'xiahui',
				mod:{
					ignoredHandcard:function(card,player){
						if(get.color(card,player)=='black') return true;
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&get.color(card,player)=='black') return false;
					}
				},
				trigger:{global:'phaseEnd'},
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					var target=event.player;
					return target!=player&&target.countCards('h',function(card){
						return card.hasGaintag('rexiahui');
					})==0&&target.getHistory('lose',function(evt){
						for(var i in evt.gaintag_map){
							if(evt.gaintag_map[i].contains('rexiahui')) return true;
						}
					}).length>0;
				},
				content:function(){
					trigger.player.loseHp();
				},
				group:'rexiahui_gain',
				subSkill:{
					gain:{
						trigger:{global:'gainEnd'},
						forced:true,
						popup:false,
						filter:function(event,player){
							if(player==event.player) return false;
							var evt=event.getl(player);
							return evt&&evt.cards2&&evt.cards2.filter(function(card){
								return get.color(card,player)=='black';
							}).length>0;
						},
						content:function(){
							trigger.player.addSkill('rexiahui_block');
							var cards=trigger.getl(player).cards2.filter(function(card){
								return get.color(card,player)=='black';
							});
							trigger.player.addGaintag(cards,'rexiahui');
						},
					},
					block:{
						mod:{
							cardEnabled2:function(card){
								if(get.itemtype(card)=='card'&&card.hasGaintag('rexiahui')) return false;
							},
							cardDiscardable:function(card){
								if(card.hasGaintag('rexiahui')) return false;
							},
						},
						charlotte:true,
						forced:true,
						popup:false,
						trigger:{player:'changeHp'},
						filter:function(event,player){
							return event.num<0;
						},
						content:function(){
							player.removeSkill('rexiahui_block');
						},
						onremove:function(player){
							player.removeGaintag('rexiahui');
						},
					},
				},
			},
			//丘力居
			koulve:{
				audio:2,
				trigger:{source:'damageSource'},
				logTarget:'player',
				filter:function(event,player){
					return event.player.isDamaged()&&event.player.countCards('h')>0&&player.isPhaseUsing();
				},
				check:function(event,player){
					if(player.hp==1&&player.isHealthy()) return false;
					return get.attitude(player,event.player)<=0;
				},
				content:function(){
					'step 0'
					player.choosePlayerCard(trigger.player,'h',true,trigger.player.getDamagedHp());
					'step 1'
					var card=result.cards;
					event.cards=card;
					player.showCards(card,get.translation(player)+'发动了【宼略】');
					'step 2'
					var gains=[],red=false;
					var target=trigger.player;
					for(var card of cards){
						var type=get.type2(card,target);
						if((type=='basic'||type=='trick')&&get.tag(card,'damage')>0) gains.push(card);
						if(!red&&get.color(card,target)=='red') red=true;
					}
					if(gains.length) player.gain(gains,'gain2');
					if(!red) event.finish();
					'step 3'
					player[player.isDamaged()?'loseMaxHp':'loseHp']();
					player.draw(2);
				},
			},
			qljsuiren:{
				audio:2,
				trigger:{player:'die'},
				direct:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return player.countCards('h',function(card){
						var type=get.type(card,player);
						return (type=='basic'||type=='trick')&&get.tag(card,'damage')>0;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(lib.filter.notMe,get.prompt('qljsuiren'),'将所有伤害性基本牌和锦囊牌交给一名其他角色').set('forceDie',true).set('ai',function(target){
						var player=_status.event.player,cards=_status.event.aiCards;
						var att=get.attitude(player,target);
						if(att<=0) return 0;
						if(target.hasSkillTag('nogain')) att/=100;
						var num=0.1;
						for(var i of cards) num+=Math.max(0,target.getUseValue(card));
						return num*att;
					}).set('aiCards',player.getCards('h',function(card){
						var type=get.type(card,player);
						return (type=='basic'||type=='trick')&&get.tag(card,'damage')>0;
					}));
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('qljsuiren',target);
						target.gain(player.getCards('h',function(card){
							var type=get.type(card,player);
							return (type=='basic'||type=='trick')&&get.tag(card,'damage')>0;
						}),player,'giveAuto');
					}
				},
			},
			//何晏
			yachai:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return event.source&&event.source.isIn();
				},
				logTarget:'source',
				check:function(event,player){
					return get.attitude(player,event.source)<0;
				},
				content:function(){
					'step 0'
					var target=trigger.source,str=get.translation(player);
					event.target=target;
					var th=target.countCards('h');
					if(th>0){
						event.num=Math.ceil(th/2);
						var list=[
							'本回合不能使用或打出手牌，然后'+str+'摸两张牌',
							'展示所有手牌，并将其中一种花色的所有牌交给'+str,
							'弃置'+get.cnNumber(event.num)+'张手牌',
						];
						target.chooseControl().set('choiceList',list).set('ai',function(){
							return get.rand(0,2);
						});
					}
					else event._result={index:0};
					'step 1'
					switch(result.index){
						case 0:
							target.addTempSkill('yachai_block');
							player.draw(2);
							event.finish();
							break;
						case 1:target.showHandcards();break;
						case 2:event.goto(4);break;
					}
					'step 2'
					var map={},hs=target.getCards('h');
					for(var i of hs){
						map[get.suit(i,target)]=true;
					}
					var list=[];
					for(var i of lib.suit){
						if(map[i]) list.push(i);
					}
					if(!list.length) event.finish();
					else if(list.length==1) event._result={control:list[0]};
					else target.chooseControl(list).set('prompt','将一种花色的牌交给'+get.translation(player));
					'step 3'
					var cards=target.getCards('h',function(card){
						return get.suit(card,target)==result.control&&lib.filter.cardDiscardable(card,target,'yachai');
					});
					if(cards.length) player.gain(cards,target,'give');
					event.finish();
					'step 4'
					target.chooseToDiscard('h',true,num);
				},
				subSkill:{
					block:{
						mark:true,
						intro:{content:'不能使用或打出手牌'},
						charlotte:true,
						mod:{
							cardEnabled2:function(card){
								if(get.position(card)=='h') return false;
							},
						},
					},
				},
			},
			qingtan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer((current)=>current.countCards('h')>0);
				},
				filterTarget:function(card,player,target){
					return target.countCards('h')>0;
				},
				selectTarget:-1,
				multitarget:true,
				multiline:true,
				content:function(){
					'step 0'
					targets.sortBySeat();
					var next=player.chooseCardOL(targets,'请选择要展示的牌',true).set('ai',function(card){
						return -get.value(card);
					}).set('source',player);
					next.aiCard=function(target){
						var hs=target.getCards('h');
						return {bool:true,cards:[hs.randomGet()]};
					};
					next._args.remove('glow_result');
					'step 1'
					var cards=[];
					event.videoId=lib.status.videoId++;
					for(var i=0;i<targets.length;i++) cards.push(result[i].cards[0]);
					event.cards=cards;
					game.log(player,'展示了',targets,'的',cards);
					game.broadcastAll(function(targets,cards,id,player){
						var dialog=ui.create.dialog(get.translation(player)+'发动了【清谈】',cards);
						dialog.videoId=id;
						var getName=function(target){
							if(target._tempTranslate) return target._tempTranslate;
							var name=target.name;
							if(lib.translate[name+'_ab']) return lib.translate[name+'_ab'];
							return get.translation(name);
						}
						for(var i=0;i<targets.length;i++){
							dialog.buttons[i].querySelector('.info').innerHTML=getName(targets[i])+get.translation(cards[i].suit);
						}
					},targets,cards,event.videoId,player);
					game.delay(4);
					'step 2'
					game.broadcastAll('closeDialog',event.videoId);
					var list=[],map={};
					for(var i of cards){
						var suit=get.suit(i);
						if(!map[suit]) map[suit]=[];
						map[suit].push(i);
					}
					var dialog=['选择获得一种花色的所有牌'];
					for(var suit of lib.suit){
						if(map[suit]){
							var targetsx=map[suit].map(function(card){
								return targets[cards.indexOf(card)];
							});
							dialog.push('<div class="text center">'+get.translation(targetsx)+'</div>');
							dialog.push(map[suit]);
							list.push(suit);
						}
					}
					if(list.length){
						player.chooseControl(list,'cancel2').set('dialog',dialog);
					}
					else event.finish();
					'step 3'
					if(result.control!='cancel2'){
						event.cards2=cards.filter(function(i){
							return get.suit(i)==result.control;
						})
						for(var i=0;i<cards.length;i++){
							if(event.cards2.contains(cards[i])){
								targets[i].$give(cards[i],player,false);
							}
						}
						player.gain(event.cards2,'log');
					}
					else event.finish();
					'step 4'
					var draws=[];
					for(var i=0;i<cards.length;i++){
						if(!event.cards2.contains(cards[i])){
							targets[i].discard(cards[i]).delay=false;
						}
						else draws.push(targets[i]);
					}
					if(draws.length) game.asyncDraw(draws);
					'step 5'
					game.delayx();
				},
				ai:{
					order:7,
					result:{
						player:0.3,
						target:-1,
					},
				},
			},
			//胡车儿
			redaoji:{
				audio:2,
				trigger:{global:'useCard'},
				direct:true,
				filter:function(event,player){
					if(player==event.player||get.subtype(event.card,false)!='equip1'||(event.player.isDead()&&!event.cards.filterInD().length)) return false;
					var all=event.player.getAllHistory('useCard');
					for(var i of all){
						if(get.subtype(i.card,false)=='equip1') return i==event;
					}
					return false;
				},
				content:function(){
					'step 0'
					var list=[];
					event.addIndex=0;
					if(trigger.cards.filterInD().length>0) list.push('获得'+get.translation(trigger.cards.filterInD()));
					else event.addIndex++;
					if(trigger.player.isAlive()) list.push('令'+get.translation(trigger.player)+'本回合不能使用或打出【杀】');
					player.chooseControl('cancel2').set('choiceList',list).set('prompt',get.prompt('redaoji',trigger.player)).set('ai',function(){
						var evt=_status.event.getParent(),player=evt.player,evt2=evt._trigger;
						if(evt.addIndex==0){
							var noob=get.attitude(player,evt2.player)<0?1:'cancel2';
							if(player.countMark('fuzhong')==3) return noob;
							if(get.effect(evt2.targets[0],evt2.card,evt2.player,player)<3) return 0;
							return noob;
						}
						return get.attitude(player,evt2.player)<0?0:'cancel2';
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('redaoji',trigger.player);
						game.delayx();
						if(result.index+event.addIndex==0){
							player.gain(trigger.cards.filterInD(),'gain2');
						}
						else trigger.player.addTempSkill('redaoji2');
					}
				},
			},
			redaoji2:{
				charlotte:true,
				mark:true,
				mod:{
					cardEnabled:function(card){
						if(card.name=='sha') return false;
					},
					cardRespondable:function(card){
						if(card.name=='sha') return false;
					},
				},
				intro:{
					content:'本回合不能使用或打出杀',
				},
			},
			fuzhong:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					return player.countMark('fuzhong')>3;
				},
				content:function(){
					'step 0'
					player.chooseTarget(lib.filter.notMe,'对一名其他角色造成1点伤害',true).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target);
						target.damage('nocard');
					}
					player.removeMark('fuzhong',4);
				},
				marktext:'重',
				intro:{content:'mark'},
				group:['fuzhong_gain','fuzhong_yingzi'],
				mod:{
					maxHandcard:function(player,num){
						if(player.countMark('fuzhong')>2) return num+3;
					},
					globalFrom:function(player,target,num){
						if(player.countMark('fuzhong')>1) return num-2;
					}
				},
				subSkill:{
					gain:{
						audio:'fuzhong',
						trigger:{player:'gainAfter'},
						forced:true,
						filter:function(event,player){
							return player!=_status.currentPhase;
						},
						content:function(){
							player.addMark('fuzhong',1);
						},
					},
					yingzi:{
						audio:'fuzhong',
						trigger:{player:'phaseDrawBegin2'},
						forced:true,
						filter:function(event,player){
							return !event.numFixed&&player.countMark('fuzhong')>0;
						},
						content:function(){
							trigger.num++;
						},
					},
				},
			},
			//董承
			xuezhao:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.maxHp>0&&player.countCards('h')>0;
				},
				filterCard:true,
				position:'h',
				filterTarget:lib.filter.notMe,
				selectTarget:function(){
					return [1,_status.event.player.maxHp];
				},
				check:function(card){
					return 2*(_status.event.player.maxHp+2)-get.value(card);
				},
				content:function(){
					'step 0'
					if(!target.countCards('he')) event._result={bool:false};
					else target.chooseCard('he','交给'+get.translation(player)+'一张牌并摸一张牌，或不能响应其使用的牌直到回合结束').set('ai',function(card){
						var player=_status.event.player,target=_status.event.getParent().player,val=get.value(card);
						if(get.attitude(player,target)>0){
							if(get.name(card,target)=='sha'&&target.hasValueTarget(card)) return 30-val;
							return 20-val;
						}
						return -val;
					});
					'step 1'
					if(result.bool){
						player.addTempSkill('xuezhao_sha');
						player.addMark('xuezhao_sha',1,false);
						player.gain(result.cards,target,'giveAuto');
						target.draw();
					}
					else{
						player.addTempSkill('xuezhao_hit');
						player.markAuto('xuezhao_hit',[target]);
					}
				},
				ai:{
					threaten:2.4,
					order:3.6,
					result:{
						player:function(player,target){
							if(get.attitude(target,player)>0){
								if(target.countCards('e',function(card){
									return get.value(card,target)<0;
								})) return 3;
								return Math.sqrt(target.countCards('he'));
							}
							if(target.mayHaveShan()&&player.countCards('hs',function(card){
								return !ui.selected.cards.contains(card)&&get.name(card)=='sha'&&player.canUse(card,target)&&get.effect(target,card,player,player)!=0;
							})) return -Math.sqrt(Math.abs(get.attitude(player,target)))/2;
							return 0.1;
						},
					},
				},
				subSkill:{
					sha:{
						charlotte:true,
						onremove:true,
						marktext:'血',
						intro:{content:'多杀#刀，誓诛曹贼！'},
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('xuezhao_sha');
							},
						},
					},
					hit:{
						charlotte:true,
						onremove:true,
						marktext:'诏',
						intro:{content:'$篡汉，其心可诛！'},
						trigger:{player:'useCard1'},
						forced:true,
						popup:false,
						content:function(){
							trigger.directHit.addArray(player.getStorage('xuezhao_hit'));
						},
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								return player.getStorage('xuezhao_hit').contains(arg.target);
							},
						},
					},
				},
			},
			//杨婉
			youyan:{
				audio:2,
				trigger:{player:'loseAfter'},
				//usable:1,
				filter:function(event,player){
					if(event.type!='discard'||!event.cards2||!event.cards2.length||player!=_status.currentPhase) return false;
					var list=[];
					for(var i of event.cards2){
						list.add(get.suit(i,player));
						if(list.length>=lib.suit.length) return false;
					}
					var evt=event.getParent('phaseUse');
					if(evt&&evt.player==player&&!evt.youyaned) return true;
					var evt=event.getParent('phaseDiscard');
					if(evt&&evt.player==player&&!evt.youyaned) return true;
					return false;
				},
				content:function(){
					var evt=event.getParent('phaseUse');
					if(evt&&evt.player==player) evt.youyaned=true;
					else{
						var evt=event.getParent('phaseDiscard');
						if(evt) evt.youyaned=true;
					}
					var list=[],cards=[];
					for(var i of trigger.cards2){
						list.add(get.suit(i,player));
					}
					for(var i of lib.suit){
						if(list.contains(i)) continue;
						var card=get.cardPile2(function(card){
							return get.suit(card,false)==i;
						})
						if(card) cards.push(card);
					}
					if(cards.length) player.gain(cards,'gain2');
				},
				ai:{
					effect:{
						player_use:function(card,player,target){
							if(typeof card=='object'&&player==_status.currentPhase&&
							//(!player.storage.counttrigger||!player.storage.counttrigger.youyan)&&
							player.needsToDiscard()==1&&card.cards&&card.cards.filter(function(i){
								return get.position(i)=='h';
							}).length>0&&!get.tag(card,'draw')&&!get.tag(card,'gain')&&!get.tag(card,'discard')) return 'zeroplayertarget';
						},
					},
				},
			},
			zhuihuan:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return !current.hasSkill('zhuihuan2_new');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('zhuihuan'),'令一名角色获得“追还”效果',function(card,player,target){
						return !target.hasSkill('zhuihuan2_new');
					}).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(target.hasSkill('maixie')||target.hasSkill('maixie_defend')) att/=3;
						if(target!=player) att/=Math.pow(game.players.length-get.distance(player,target,'absolute'),0.7);
						return att;
					}).set('animate',false);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zhuihuan');
						target.addTempSkill('zhuihuan2_new',{player:'phaseZhunbei'});
						game.delayx();
					}
				},
			},
			zhuihuan2_new:{
				trigger:{player:'phaseZhunbeiBegin'},
				charlotte:true,
				forced:true,
				onremove:true,
				filter:function(event,player){
					if(player.storage.zhuihuan2_new){
						for(var source of player.storage.zhuihuan2_new){
							if(!source.isIn()) continue;
							if(source.hp>player.hp) return true;
							return source.countCards('h')>0;
						}
					}
				},
				logTarget:function(event,player){
					return player.storage.zhuihuan2_new.filter(function(target){
						return target.isIn();
					});
				},
				content:function(){
					'step 0'
					event.targets=player.storage.zhuihuan2_new;
					player.removeSkill('zhuihuan2_new');
					'step 1'
					var target=targets.shift();
					if(target.isIn()){
						if(target.hp>player.hp) target.damage(2);
						else{
							var hs=target.getCards('h');
							if(hs.length) target.discard(hs.randomGets(2));
						}
					}
					if(targets.length) event.redo();
				},
				group:'zhuihuan2_new_count',
				subSkill:{
					count:{
						trigger:{player:'damage'},
						forced:true,
						silent:true,
						popup:false,
						charlotte:true,
						filter:function(event,player){
							return get.itemtype(event.source)=='player';
						},
						content:function(){
							player.markAuto('zhuihuan2_new',[trigger.source]);
						},
					},
				},
			},
			zhuihuan2:{
				trigger:{player:'damageEnd'},
				forced:true,
				charlotte:true,
				logTarget:'source',
				filter:function(event,player){
					var source=event.source;
					if(source.hp>player.hp) return true;
					return source.countCards('h')>0;
				},
				content:function(){
					if(player.hp<trigger.source.hp) trigger.source.damage();
					else trigger.source.discard(trigger.source.getCards('h').randomGet());
				},
				mark:true,
				intro:{content:'当你受到伤害后，若伤害来源体力值大于你，则你对其造成1点伤害，否则其随机弃置一张手牌'},
			},
			//唐姬
			jielie:{
				audio:2,
				trigger:{player:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					return player.phaseNumber==1&&!player.storage.jielie;
				},
				content:function(){
					'step 0'
					player.chooseTarget('请选择【抗歌】的目标','其于回合外摸牌后，你摸等量的牌；其进入濒死状态时，你可令其回复体力至1点；其死亡后，你弃置所有牌并失去1点体力',lib.filter.notMe,true).set('ai',function(target){
						return get.attitude(_status.event.player,target)>0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('jielie',target);
						player.addSkill('jielie_clear');
						player.storage.jielie=target;
						player.markSkill('jielie');
						game.delayx();
					}
				},
				intro:{content:'已指定$为目标'},
				group:['jielie_draw','jielie_dying','jielie_die'],
				subSkill:{
					draw:{
						audio:'jielie',
						trigger:{global:'gainAfter'},
						forced:true,
						filter:function(event,player){
							return player.countMark('jielie_draw')<3&&event.player==player.storage.jielie&&event.player!=_status.currentPhase&&event.cards&&event.cards.length>0;
						},
						logTarget:'player',
						content:function(){
							var num=Math.min(3-player.countMark('jielie_draw'),trigger.cards.length);
							player.addMark('jielie_draw',num,false);
							player.draw(num);
						},
					},
					clear:{
						trigger:{global:'phaseBeginStart'},
						forced:true,
						firstDo:true,
						popup:false,
						charlotte:true,
						filter:function(event,player){
							return player.countMark('jielie_draw')>0;
						},
						content:function(){
							player.removeMark('jielie_draw',player.countMark('jielie_draw'),false);
						},
					},
					dying:{
						audio:'jielie',
						trigger:{global:'dying'},
						logTarget:'player',
						filter:function(event,player){
							return event.player==player.storage.jielie&&event.player.hp<1&&!player.hasSkill('jielie_temp');
						},
						check:function(event,player){
							return get.attitude(player,event.player)>0;
						},
						prompt2:'令其将体力值回复至1点',
						content:function(){
							trigger.player.recover(1-trigger.player.hp);
							player.addTempSkill('jielie_temp','roundStart');
						},
					},
					temp:{},
					die:{
						audio:'jielie',
						trigger:{global:'dieAfter'},
						filter:function(event,player){
							return event.player==player.storage.jielie;
						},
						forced:true,
						content:function(){
							var cards=player.getCards('he');
							if(cards.length) player.discard(cards);
							player.loseHp();
						},
					},
				},
				ai:{
					threaten:2,
				},
			},
			kangge:{
				audio:2,
				trigger:{player:'damageBegin4'},
				direct:true,
				filter:function(event,player){
					return ((!event.source)||(event.source!=player&&event.source!=player.storage.jielie))&&player.storage.jielie&&player.storage.jielie.isIn();
				},
				content:function(){
					'step 0'
					player.chooseControl(lib.suit.slice(0),'cancel2').set('prompt',get.prompt('kangge')).set('prompt2','防止伤害并改为失去等量体力，且令'+get.translation(player.storage.jielie)+'从弃牌堆中获得等量的花色牌').set('ai',function(){
						var player=_status.event.player;
						if(get.attitude(player,player.storage.jielie)<=0) return 'cancel2';
						return lib.suit.randomGet();
					});
					'step 1'
					if(result.control!='cancel2'){
						event.suit=result.control;
						player.logSkill('kangge',player.storage.jielie);
						trigger.cancel();
						player.loseHp(trigger.num);
					}
					else event.finish();
					'step 2'
					var cards=[];
					while(cards.length<trigger.num){
						var card=get.discardPile(function(card){
							return get.suit(card,false)==event.suit&&!cards.contains(card)
						});
						if(card) cards.push(card);
						else break;
					}
					if(cards.length) player.storage.jielie.gain(cards,'gain2');
				},
			},
			//张横
			dangzai:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return !player.storage._disableJudge&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('j',function(card){
							return player.canAddJudge(card);
						})>0;
					})
				},
				content:function(){
					'step 0'
					player.chooseTarget(function(card,player,target){
						return target!=player&&target.countCards('j',function(card){
							return player.canAddJudge(card);
						})>0;
					},get.prompt('dangzai'),'将一名其他角色判定区内的一张牌移动到你的判定区内');
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('dangzai',target);
						player.choosePlayerCard(target,'j',true).set('filterButton',function(button){
							return _status.event.player.canAddJudge(button.link);
						})
					}
					else event.finish();
					'step 2'
					if(result.bool&&result.cards&&result.cards.length){
						var card=result.cards[0];
						target.$give(card,player);
						game.delayx();
						var name=card.viewAs||card.name;
						if(card.name!=name){
							player.addJudge(name,card);
						}
						else{
							player.addJudge(card);
						}
					}
				},
			},
			liangjue:{
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				forced:true,
				filter:function(event,player){
					if(player.hp<=1) return false;
					if(event.player==player){
						if(event.name=='equip'&&get.color(event.card,player)=='black') return true;
						if(event.name=='addJudge'&&get.color(event.cards[0],player)=='black') return true;
					}
					var evt=event.getl(player);
					if(!evt||!evt.es||!evt.js||!evt.es.length&&!evt.js.length) return false;
					for(var i of evt.es){
						if(get.color(i,player)=='black') return true;
					}
					for(var i of evt.js){
						if(get.color(i,player)=='black') return true;
					}
					return false;
				},
				content:function(){
					player.loseHp();
					player.draw(2);
				},
			},
			//狼灭
			langmie:{
				trigger:{global:'phaseUseEnd'},
				forced:true,
				filter:function(event,player){
					if(player==event.player||!player.countCards('he')) return false;
					var map={};
					var list=event.player.getHistory('useCard',function(evt){
						var evt2=evt.getParent('phaseUse');
						return evt2==event;
					});
					for(var i of list){
						var name=get.type2(i.card,false);
						if(!map[name]) map[name]=true;
						else return true;
					}
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToDiscard('he',get.prompt('langmie'),'弃置一张牌并摸两张牌').set('ai',(card)=>8-get.value(card)).logSkill='langmie';
					'step 1'
					if(result.bool) player.draw(2);
				},
				group:'langmie_damage',
			},
			langmie_damage:{
				audio:'langmie',
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return event.player!=player&&(event.player.getStat('damage')||0)>1&&player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('he',get.prompt('langmie',trigger.player),'弃置一张牌并对其造成1点伤害').set('goon',get.damageEffect(trigger.player,player,player)>0).set('ai',function(card){
						if(!_status.event.goon) return 0;
						return 7-get.value(card);
					}).logSkill=['langmie_damage',trigger.player];
					'step 1'
					if(result.bool) trigger.player.damage();
				},
				ai:{expose:0.2},
			},
			//牛金
			recuorui:{
				audio:'cuorui',
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.hp>0&&game.hasPlayer(function(current){
						return current!=player&&current.countGainableCards(player,'h')>0;
					})
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countGainableCards(player,'h')>0;
				},
				selectTarget:function(){
					return [1,_status.event.player.hp];
				},
				content:function(){
					if(num==0) player.awakenSkill('recuorui');
					player.gainPlayerCard(target,true,'h');
				},
			},
			reliewei:{
				audio:'liewei',
				trigger:{global:'dying'},
				frequent:true,
				filter:function(event,player){
					return player==_status.currentPhase;
				},
				content:function(){
					player.draw();
				},
			},
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
					}).length){
						player.skip('phaseUse');
						player.skip('phaseDiscard');
					}
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
					}).length>0;
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
					}).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(target.isTurnedOver()) return att/10;
						if(!player.hasShan()&&target.canUse({name:'sha',isCard:true},player,false)&&get.effect(player,{name:'sha',isCard:true},target,player)<0&&player.hp<4) return 0;
						return -att*Math.sqrt(target.countCards('h'));
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
							var player=_status.event.player,target=_status.event.getParent().player;
							if(player.isTurnedOver()) return 1;
							if(!target.hasShan()&&player.canUse({name:'sha',isCard:true},target,false)&&get.effect(target,{name:'sha',isCard:true},player,player)<0) return 0;
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
					var next=player.chooseToMove('兴作：将三张牌置于牌堆底');
					var list=[['牌堆底',cards]],hs=player.getCards('h');
					if(hs.length){
						list.push(['手牌',hs]);
						next.set('filterMove',function(from,to){
							return typeof to!='number';
						});
					}
					next.set('list',list);
					next.set('processAI',function(list){
						var allcards=list[0][1].concat(list[1][1]),canchoose=allcards.slice(0),cards=[];
						var player=_status.event.player;
						var getv=function(button){
							if(button.name=='sha'&&allcards.filter(function(card){
								return card.name=='sha'&&!cards.filter(function(){
									return button==card;
								}).length;
							}).length>player.getCardUsable({name:'sha'})) return 10;
							return -player.getUseValue(button,player);
						};
						while(cards.length<3){
							canchoose.sort(function(a,b){
								return getv(b)-getv(a);
							});
							cards.push(canchoose.shift());
						}
						return [cards,canchoose];
					})
					'step 1'
					if(result.bool){
						event.forceDie=true;
						var cards=result.moved[0];
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
					},'兴作：是否令一名角色将其手牌与牌堆底的三张牌替换？').set('ai',function(target){
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
						if(num==3&&player.maxHp<8) player.gainMaxHp();
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
						return current!=player;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('reyirang'),function(card,player,target){
						return target!=player;
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
						if(target.maxHp>player.maxHp) player.gainMaxHp(target.maxHp-player.maxHp,true);
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
								return Math.sqrt(5-Math.min(4,target.countCards('h')))*get.attitude(_status.event.player,target);
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
					if(player==_status.currentPhase||player.countCards('h')) return false;
					return event.card.name=='sha'||get.type(event.card,false)=='trick';
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
				zhuanhuanji:true,
				marktext:'☯',
				mark:true,
				intro:{
					content:function(storage,player){
						return '出牌阶段限一次，'+(storage?'你可以获得一名其他角色的至多两张手牌。':'你可以将至多两张手牌交给一名其他角色。')+'若以此法移动的牌包含【酒】或♥牌，则你可令得到牌的角色执行一项：①回复1点体力。②复原武将牌。'
					},
				},
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
					return [1,2];
				},
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(player.storage.bazhan) return target.countGainableCards(player,'h')>0;
					return true;
				},
				prompt:function(){
					if(_status.event.player.storage.bazhan) return '获得一名其他角色的至多两张手牌';
					return '将至多两张手牌交给一名其他角色';
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
					if(bool2&&!ui.selected.cards.length&&(get.suit(card,player)=='heart'||get.name(card,player)=='jiu')) return 10;
					if(bool1) return 9-get.value(card);
					if(get.color(card)=='red') return 5-get.value(card);
					return 0;
				},
				content:function(){
					'step 0'
					if(player.storage.bazhan){
						event.recover=player;
						player.gainPlayerCard(target,'h',true,'visibleMove',[1,2]);
					}
					else{
						event.recover=target;
						target.gain(cards,player,'give');
					}
					player.changeZhuanhuanji('bazhan');
					'step 1'
					var target=event.recover;
					if(result.bool&&result.cards&&result.cards.length){
						cards=result.cards;
					}
					if(!cards||!target||!target.getCards('h').filter(function(i){
						return cards.contains(i);
					}).length||function(){
						for(var card of cards){
							if(get.suit(card,target)=='heart'||get.name(card,target)=='jiu') return false;
						}
						return true;
					}()){
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
								var cards=ui.selected.cards,card=cards[0];
								if(get.value(cards,target)<0) return -0.5;
								if(get.attitude(player,target)>0){
									if((target.isDamaged()||target.isTurnedOver())&&(get.suit(card,target)=='heart'||get.name(card,target)=='jiu')) return 3;
									if(target.hasUseTarget(card)&&target.getUseValue(card)>player.getUseValue(card,null,true)) return 1.4;
									return 1;
								}
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
						return current.countCards('h')<5;
					})
				},
				content:function(){
					'step 0'
					player.storage.jiaoying3.shift();
					player.chooseTarget('醮影：令一名角色将手牌摸至五张',function(card,player,target){
						return target.countCards('h')<5;
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>2){
							return 5-target.countCards('h');
						}
						return att/3;
					});
					'step 1'
					if(result.bool){
						player.logSkill('jiaoying',result.targets);
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].drawTo(5);
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
								return Math.sqrt(5-Math.min(4,target.countCards('h')))*get.attitude(_status.event.player,target);
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
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
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
				filter:function(event,player){
					return event.card.name=='sha';
				},
				content:function(){
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
				trigger:{global:'damageSource'},
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
			xianshuai2:{charlotte:true},
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
					player.addTempSkill('decadexushen2');
					trigger.decadexushen=true;
					player.recover();
				},
			},
			decadexushen2:{
				trigger:{player:'dyingAfter'},
				forced:true,
				popup:false,
				charlotte:true,
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
							target.chooseControl(target.name1,target.name2).set('prompt','请选择要更换的武将牌');
						}
						else event._result={control:target.name};
					}
					else event.goto(4);
					'step 3'
					target.reinit(result.control,'guansuo');
					if(target.name=='guansuo'&&target.group!='shu') target.changeGroup('shu');
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
				filter:function(event,player){
					return event.isFirstTarget&&event.targets&&event.targets.length>1&&get.type2(event.card)=='trick';
				},
				direct:true,
				content:function(){
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
				trigger:{global:'useCardToPlayered'},
				usable:1,
				logTarget:function(event){
					return event.parent.gongjian_targets.filter(function(target){
						return event.targets.contains(target)&&target.countCards('he')>0;
					});
				},
				filter:function(event,player){
					if(event.card.name!='sha'||!event.isFirstTarget) return false;
					if(event.parent.gongjian_targets&&event.parent.gongjian_targets.filter(function(target){
						return event.targets.contains(target)&&target.countCards('he')>0;
					}).length>0) return true;
					return false;
				},
				check:function(event,player){
					var targets=event.parent.gongjian_targets.filter(function(target){
						return event.targets.contains(target)&&target.countCards('he')>0;
					}),att=0;
					for(var i of targets){
						att+=get.attitude(player,i);
					}
					return att<0;
				},
				content:function(){
					'step 0'
					event.targets=trigger.parent.gongjian_targets.filter(function(target){
						return trigger.targets.contains(target);
					});
					event.num=0;
					'step 1'
					var target=targets[num];
					player.discardPlayerCard(target,true,'he',[1,2]).set('forceAuto',true);
					'step 2'
					event.num++;
					if(event.num<targets.length) event.goto(1);
					else{
					 var cards=[];
					 game.getGlobalHistory('cardMove',function(evt){
							if(evt.player&&evt.hs&&evt.type=='discard'&&evt.getParent(3)==event){
								for(var i of evt.hs){
									if(get.name(i,evt.player)=='sha'&&get.position(i,true)=='d') cards.add(i);
								}
							}
						});
						if(cards.length) player.gain(cards,'gain2');
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
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
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
					player.chooseTarget(get.prompt('juanhui'),lib.filter.notMe,'选择记录一名其他角色使用过的牌').set('ai',function(target){
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
							dialog.addSmall([vcard,'vcard']);
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
					game.addVideo('cardDialog',null,event.videoId);
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
				filter:function(event,player){
					return event.player!=player&&event.player.isAlive()&&event.player.inRange(player)&&player.countCards('he')>0;
				},
				direct:true,
				derivation:["rezhixi"],
				checkx:function(event,player){
					if(get.attitude(player,event.player)>=0) return false;
					return event.player.countCards('h')>event.player.hp;
				},
				content:function(){
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
						player.markAuto('remeibu_gain',[get.suit(card,player)]);
						player.addTempSkill('remeibu_gain');
						target.addTempSkill('rezhixi','phaseUseEnd');
					}
				},
				ai:{
					expose:0.2,
				},
				subSkill:{
					gain:{
						trigger:{global:'loseAfter'},
						forced:true,
						charlotte:true,
						popup:false,
						onremove:true,
						filter:function(event,player){
							return event.getParent(3).name=='rezhixi'&&player.getStorage('remeibu_gain').contains(get.suit(event.cards[0],event.player))&&get.position(event.cards[0])=='d';
						},
						content:function(){
							player.gain(trigger.cards[0],'gain2');
						},
					},
				},
			},
			remumu:{
				audio:"mumu",
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.countCards('e')>0;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('remumu'),function(card,player,target){
						return target.countCards('e')>0;
					}).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target),es=target.getCards('e'),val=0;
						for(var i of es){
							var eff=-(get.value(i,target)-0.1)*att;
							if(eff>val) val=eff;
						}
						return eff;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('remumu',target);
						if(player==target) event._result={index:1};
						else{
							var str=get.translation(target);
							player.chooseControl().set('choiceList',[
								'弃置'+str+'装备区的一张牌且本阶段使用【杀】的次数上限+1',
								'获得'+str+'装备区的一张牌且本阶段使用【杀】的次数上限-1',
							]).set('ai',function(){
								var player=_status.event.player;
								if(player.countCards('hs',function(card){
									return get.name(card,player)=='sha'&&player.hasValueTarget(card);
								})<Math.max(1,player.getCardUsable('sha'))) return 1;
								return 0;
							});
						}
					}
					else event.finish();
					'step 2'
					if(result.index==0){
						player.addTempSkill('remumu3','phaseUseAfter');
						player.discardPlayerCard(target,'e',true);
					}
					else{
						player.addTempSkill('remumu2','phaseUseAfter');
						player.gainPlayerCard(target,'e',true);
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
			refenyin_wufan:{audio:2},
			//新岩泽(划掉)留赞
			refenyin:{
				audio:2,
				audioname:['wufan'],
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
					}).judge2=function(result){
						return result.bool;
					};
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
						if(event.triggername=='useCardToPlayered') player.gain(trigger.cards.filterInD(),'gain2');
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
						return target!=player&&target.hasSex('male');
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
					return game.hasPlayer(function(current){
						return current.maxHp>player.maxHp;
					});
				},
				content:function(){
					player.gainMaxHp();
					player.chooseDrawRecover(2,true);
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
				usable:1,
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
					else player.addTempSkill('xiying_gain');
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
				subSkill:{
					gain:{
						trigger:{player:'phaseJieshuBegin'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							return player.getHistory('sourceDamage',function(evt){
								return evt.isPhaseUsing(player);
							}).length>0;
						},
						content:function(){
							var card=get.cardPile2(function(card){
								var type=get.type(card,false);
								if(type!='basic'&&type!='trick') return false;
								return get.tag(card,'damage')>0;
							});
							if(card) player.gain(card,'gain2');
						},
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
				content:function(){
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
					global:'phaseBefore',
					player:['damageEnd','enterGame'],
				},
				audio:2,
				forced:true,
				filter:function(event,player){
					if(event.name!='damage') return (event.name!='phase'||game.phaseNumber==0);
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
					return event.target.isIn()&&game.hasPlayer(function(current){
						return current!=event.target&&current.canUse('sha',event.target,false);
					})
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('qigong'),'令一名角色可再对'+get.translation(trigger.target)+'使用一张【杀】',function(card,player,target){
						var source=_status.event.getTrigger().target;
						return target!=source&&target.canUse('sha',source,false);
					}).set('ai',function(target){
						var player=_status.event.player,card={name:'sha'},source=_status.event.getTrigger().target;
						if(target.hasSha()){
							var eff1=get.effect(source,card,target,target);
							if(eff1>0) return get.effect(source,card,target,player);
						}
						return (target!=player)?(Math.random()*get.attitude(player,target)):0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('qigong',target);
						target.addTempSkill('qigong_ai','chooseToUseEnd');
						target.chooseToUse('是否再对'+get.translation(trigger.target)+'使用一张【杀】？',function(card,player,event){
							if(get.name(card)!='sha') return false;
							return lib.filter.filterCard.apply(this,arguments);
						},trigger.target,-1).set('addCount',false).set('oncard',function(){
							_status.event.directHit.addArray(game.players);
						});
					}
				},
				subSkill:{
					ai:{
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								return arg.card&&arg.card.name=='sha';
							},
						},
					},
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
				content:function(){
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
					content:"expansion",
					markcount:'expansion',
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				trigger:{
					player:"phaseJieshuBegin",
				},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0&&!player.getExpansions('biaozhao').length;
				},
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt('biaozhao'),'将一张牌置于武将牌上作为“表”').ai=function(card){
						return 6-get.value(card);
					}
					'step 1'
					if(result.bool){
						player.logSkill('biaozhao');
						player.addToExpansion(result.cards,player,'give').gaintag.add('biaozhao');
					}
				},
				ai:{
					notemp:true,
				},
				group:['biaozhao2','biaozhao3'],
			},
			biaozhao2:{
				trigger:{
					global:["loseAfter","cardsDiscardAfter"],
				},
				forced:true,
				audio:"biaozhao",
				filter:function(event,player){
					if(event.name=='lose'&&event.position!=ui.discardPile) return false;
					var cards=player.getExpansions('biaozhao');
					if(!cards.length) return false;
					var suit=get.suit(cards[0]);
					var num=get.number(cards[0]);
					for(var i=0;i<event.cards.length;i++){
						if(get.suit(event.cards[i])==suit&&get.number(event.cards[i])==num) return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					var card=player.getExpansions('biaozhao')[0];
					if(trigger.getParent().name=='discard'){
						trigger.player.gain(card,'player','give');
					}
					else{
						player.loseToDiscardpile(card);
					}
					"step 1"
					player.loseHp();
				},
			},
			biaozhao3:{
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				forced:true,
				charlotte:true,
				audio:"biaozhao",
				filter:function(event,player){
					return player.getExpansions('biaozhao').length>0;
				},
				content:function(){
					"step 0"
					var card=player.getExpansions('biaozhao')[0];
					player.loseToDiscardpile(card);
					"step 1"
					event.num=0;
					game.countPlayer(function(current){
						if(current.countCards('h')>event.num) event.num=current.countCards('h');
					});
					player.chooseTarget('是否令一名角色将手牌摸至'+event.num+'张并回复1点体力？').ai=function(target){
						var num=Math.min(event.num-target.countCards('h'),5);
						if(target.isDamaged()) num++;
						return num*get.attitude(_status.event.player,target);
					};
					"step 2"
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
				content:function(){
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
				content:function(){player.loseHp()},
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
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
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
					num=Math.min(10,num);
					event.cards=get.cards(num);
					game.cardsGotoOrdering(event.cards);
					player.showCards(event.cards);
					"step 1"
					event.getedResult=lib.skill.yanjiao.getResult(cards);
					if(!event.getedResult.length){
						player.addTempSkill('yanjiao2');
						event.finish();
					}
					"step 2"
					target.chooseControl("自动分配","手动分配").set("prompt","【严教】：是否让系统自动分配方案？").ai=function(){
						return 0;
					};
					"step 3"
					if(result.control=="手动分配"){
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
						target.chooseButton(choiceList,true);
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
					if(event.togain[2].length>1) player.addTempSkill('yanjiao2');
					event.finish();
					"step 8"
					var next=target.chooseToMove('严教：分出点数相等的两组牌');
					next.set('chooseTime',(cards.length*4).toString());
					next.set('list',[
						['未分配',cards,function(list){
							var num=0;
							for(var i of list) num+=i.number;
							return '未分配（点数和'+num+'）';
						}],
						['第一组',[],function(list){
							var num=0;
							for(var i of list) num+=i.number;
							return '第一组（点数和'+num+'）';
						}],
						['第二组',[],function(list){
							var num=0;
							for(var i of list) num+=i.number;
							return '第二组（点数和'+num+'）';
						}],
					]);
					next.set('filterOk',function(moved){
						var num1=0;
						for(var i of moved[1]) num1+=i.number;
						if(num1==0) return false;
						var num2=0;
						for(var i of moved[2]) num2+=i.number;
						return num1==num2;
					})
					next.set('processAI',()=>false);
					"step 9"
					if(result.bool){
						var moved=result.moved;
						event.getedResult=[[moved[1],moved[2],moved[0]]];
						event.goto(4);
					}
					else{
						player.addTempSkill('yanjiao2');
					}
				},
				getResult:function(cards){
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
					return results.slice(0,50);
				},
			},
			"yanjiao2":{
				marktext:"教",
				mark:true,
				intro:{
					content:"本回合手牌上限-1",
				},
				mod:{
					maxHandcard:function(player,num){
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
				content:function(){
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
									if(!info||!info.trigger||!info.trigger.player||info.silent||info.limited||info.juexingji||info.zhuanhuanji||info.hiddenSkill||info.dutySkill) continue;
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
									if(!info||!info.enable||info.viewAs||info.limited||info.juexingji||info.zhuanhuanji||info.hiddenSkill||info.dutySkill) continue;
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
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
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
					}).judge2=function(result){
						return result.color=='black'?true:false;
					};
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
					return !player.hasSkill('songshu_reflectionblue',null,null,false)&&player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&player.canCompare(target);
				},
				content:function(){
					'step 0'
					player.chooseToCompare(target).set('small',get.attitude(player,target)>0);
					'step 1'
					if(!result.bool){
						player.draw(2,'nodelay');
						target.draw(2);
						player.addTempSkill('songshu_reflectionblue','phaseUseAfter');
					}
					else{
						target.addTempSkill('songshu_ai');
					}
				},
				ai:{
					basic:{
						order:1
					},
					expose:0.2,
					result:{
						target:function(player,target){
							if(target.hasSkill('songshu_ai',null,null,false)) return 0;
							var maxnum=0;
							var cards2=target.getCards('h');
							for(var i=0;i<cards2.length;i++){
								if(get.number(cards2[i])>maxnum){
									maxnum=get.number(cards2[i]);
								}
							}
							if(maxnum>10) maxnum=10;
							if(maxnum<5&&cards2.length>1) maxnum=5;
							var cards=player.getCards('h');
							for(var i=0;i<cards.length;i++){
								if(get.number(cards[i])<maxnum) return 1;
							}
							return 0;
						}
					}
				}
			},
			songshu_ai:{charlotte:true},
			songshu_reflectionblue:{charlotte:true},
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
					if(cards.length>0) player.chooseTarget('是否令一名手牌数最少的角色获得'+get.translation(cards),function(card,player,target){
						return target.isMinHandcard();
					}).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					else event.finish();
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
					}).judge2=function(result){
						return result.bool?true:false;
					};
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
					'step 0'
					if(trigger.name=='damage'){
						trigger.cancel();
						trigger.player.recover(trigger.num);
						event.finish();
					}
					else{
						game.asyncDraw([player,trigger.target]);
					}
					'step 1'
					game.delayx();
				},
			},
			//管辂和葛玄
			gxlianhua:{
				derivation:['reyingzi','reguanxing','xinzhiyan','gongxin'],
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
								skill='xinzhiyan';
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
					var cards=get.cards(3);
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
					'step 2'
					if(Array.isArray(result)){
						event.count+=result.length;
						if(get.color(result)!='red'){
							if(player.hp>1) player.loseHp();
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
			rewenji:{
				audio:'spwenji',
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('he');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('rewenji'),function(card,player,target){
						return target!=player&&target.countCards('he')>0;
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>0) return Math.sqrt(att)/10;
						return 5-att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('rewenji',target);
						target.chooseCard('he',true,'问计：将一张牌交给'+get.translation(player));
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.addTempSkill('rewenji_respond');
						player.storage.rewenji_respond=get.type2(result.cards[0],target);
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
							return get.type2(event.card)==player.storage.rewenji_respond;
						},
						content:function(){
							trigger.directHit.addArray(game.filterPlayer(function(current){
								return current!=player;
							}));
						},
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								return get.type2(arg.card)==player.storage.rewenji_respond;
							},
						},
					}
				}
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
						return target!=player&&target.countCards('he')>0;
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
					//if(player.getHistory('skipped').contains('phaseUse')) return false;
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
				trigger:{global:['phaseBefore','zhuUpdate']},
				filter:function(event,player){
					return !player.storage.bingzhao&&player.hasZhuSkill('bingzhao')&&(event.name!='phase'||game.phaseNumber==0);
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
								event.targets=result.targets.sortBySeat();
							}
							else{
								event.finish();
							}
							'step 2'
							player.logSkill('bmcanshi',event.targets);
							for(var i=0;i<event.targets.length;i++){
								event.targets[i].removeMark('zongkui_mark',1);
							}
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
						game.delayx();
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
				check:function(event,player){
					return get.value(event.cards)+player.maxHp*2-18>0;
				},
				filter:function(event,player){
					return player.isPhaseUsing()&&get.type(event.card)=='trick'&&event.cards.filterInD().length>0;
				},
				content:function(){
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
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					if(get.type(event.card)==undefined) return false;
					return (event.targets&&event.targets.length==1);
				},
				content:function(){
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
				init:function(player){
					player.storage.xinfu_lveming=0;
				},
				mark:true,
				intro:{
					content:"已发动过#次",
				},
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&target.countCards('e')<player.countCards('e');
				},
				content:function(){
					"step 0"
					var list=[1,2,3,4,5,6,7,8,9,10,11,12,13].map((i)=>get.strNumber(i));
					target.chooseControl(list).set('ai',function(){
						return get.rand(0,12);
					}).set('prompt','请选择一个点数');
					"step 1"
					if(result.control){
						target.$damagepop(result.control,'thunder');
						var num=result.index+1;
						event.num=num;
					}
					else{
						target.$damagepop('K','thunder');
						event.num=13;
					};
					game.log(target,'选择的点数是','#y'+get.strNumber(event.num));
					player.storage.xinfu_lveming++;
					player.judge(function(card){
						if(card.number==_status.event.getParent('xinfu_lveming').num) return 4;
						return 0;
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
						target:function(player,target){
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
				filter:function(event,player){
					if(player.storage.xinfu_tunjun) return false;
					return player.storage.xinfu_lveming&&player.storage.xinfu_lveming>0;
				},
				filterTarget:true,
				selectTarget:1,
				content:function(){
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
				init:function(player){
					player.storage.xinfu_tunjun=false;
				},
			},
			"xinfu_tanbei":{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
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
					order:function(){
						return [2,4,6,8,10].randomGet();
					},
					result:{
						target:function(player,target){
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
				filterTarget:function(card,player,target){
					return _status.event.targets&&_status.event.targets.contains(target)&&lib.filter.filterTarget.apply(this,arguments);
				},
				prompt:"将一张手牌当顺手牵羊使用",
				check:function(card){return 7-get.value(card)},
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
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
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
						filter:function(event,player){
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
						content:function(){
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
				filter:function(player,event){
					return event.countCards('h')>0;
				},
				content:function(){
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
			xinfu_zhenxing:{
				audio:2,
				trigger:{
					player:["damageEnd","phaseJieshuBegin"],
				},
				direct:true,
				content:function(){
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
					return '选择一名角色并将任意张手牌放置于牌堆中'+get.cnNumber(game.players.length)+'倍数的位置（先选择的牌在上）';
				},
				content:function(){
					'step 0'
					player.$throw(cards.length);
					player.storage.xinfu_qianxin=cards.slice(0);
					player.storage.xinfu_qianxin2=target;
					//cards.reverse();
					player.lose(cards,ui.cardPile).insert_index=function(event,card){
						var num1=game.players.length,i=event.cards.indexOf(card);
						var num3=num1*(i+1)-1;
						return ui.cardPile.childNodes[num3];
					};
					'step 1'
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
							maxHandcard:function(player,num){
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
				filter:function(event,player){
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
				content:function(){
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
				filter:function(event,player){
					if(player.hasSkill('xinfu_fuhai_next')&&player.hasSkill('xinfu_fuhai_previous')) return false;
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					if(![player.next,player.previous].contains(target)||target.countCards('h')==0) return false;
					if(player.hasSkill('xinfu_fuhai_next')) return target==player.previous;
					if(player.hasSkill('xinfu_fuhai_previous')) return target==player.next;
					return true;
				},
				line:false,
				content:function(){
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
				filter:function(event,player){
					return player.storage.xinfu_fuhai!=undefined;
				},
				content:function(){
					player.unmarkSkill('xinfu_fuhai');
					delete player.storage.xinfu_fuhai;
				},
			},
			"xz_xunxun":{
				filter:function(event,player){
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
				content:function(){
					'step 0'
					var cards=get.cards(4);
					game.cardsGotoOrdering(cards);
					var next=player.chooseToMove('恂恂：将两张牌置于牌堆顶',true);
					next.set('list',[
						['牌堆顶',cards],
						['牌堆底'],
					]);
					next.set('filterMove',function(from,to,moved){
						if(to==1&&moved[1].length>=2) return false;
						return true;
					});
					next.set('filterOk',function(moved){
						return moved[1].length==2;
					});
					next.set('processAI',function(list){
						var cards=list[0][1].slice(0).sort(function(a,b){
							return get.value(b)-get.value(a);
						});
						return [cards,cards.splice(2)];
					})
					'step 1'
					var top=result.moved[0];
					var bottom=result.moved[1];
					top.reverse();
					for(var i=0;i<top.length;i++){
						ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
					}
					for(i=0;i<bottom.length;i++){
						ui.cardPile.appendChild(bottom[i]);
					}
					game.updateRoundNumber();
					game.delayx();
				},
			},
			"xinfu_xingzhao":{
				audio:true,
				group:["xz_xunxun","xinfu_xingzhao2"],
				mark:true,
				intro:{
					content:function(storage,player){
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
				filter:function(event,player){
					if(get.type(event.card)!='equip') return false;
					var num=game.countPlayer(function(current){
						return current.isDamaged();
					});
					return num>=2;
				},
				content:function(){
					player.draw();
				},
			},
			"xinfu_xingzhao2":{
				audio:true,
				trigger:{
					player:"phaseDiscardBefore",
				},
				forced:true,
				filter:function(event,player){
					var num=game.countPlayer(function(current){
						return current.isDamaged();
					});
				return num>=3;
				},
				content:function(){
					trigger.cancel();
					game.log(player,'跳过了弃牌阶段');
				},
			},
			"xinfu_dianhu":{
				audio:2,
				trigger:{
					global:"phaseBefore",
					player:"enterGame",
				},
				forced:true,
				filter:function(event){
					return game.players.length>1&&(event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
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
						target.addTempSkill('xinfu_dianhu2',{player:'die'});
					}
				},
			},
			xinfu_dianhu2:{
				mark:"character",
				intro:{
					content:"当你受到来自$的伤害或回复体力后，$摸一张牌",
				},
				nopop:true,
				trigger:{
					player:["damageEnd","recoverEnd"],
				},
				forced:true,
				popup:false,
				charlotte:true,
				filter:function(event,player){
					if(player.storage.xinfu_dianhu2&&player.storage.xinfu_dianhu2.isIn()){
						if(event.name=='damage') return event.source==player.storage.xinfu_dianhu2;
						return true;
					};
				},
				content:function(){
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
				filterTarget:function(card,player,target){
				return target!=player;
				},
				content:function(){
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
				filter:function(event,player){
					if(!event.targets||!event.targets.length||
					event.getParent().triggeredTargets3.length>1||!event.isPhaseUsing(player)) return false;
					var evt=player.getLastUsed(1);
					if(!evt||!evt.targets||!evt.targets.length||!evt.isPhaseUsing(player)) return false;
					for(var i=0;i<event.targets.length;i++){
						if(evt.targets.contains(event.targets[i])) return true;
					}
					return false;
				},
				content:function(){
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
			//糜芳傅士仁
			mffengshi:{
				audio:2,
				audioname:['sp_mifangfushiren'],
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				direct:true,
				preHidden:true,
				filter:function(event,player){
					if(event.player==event.target||event.targets.length!=1) return false;
					if(player!=event.player&&!player.hasSkill('mffengshi')) return false;
					return event.player.countCards('h')>event.target.countCards('h')&&event.target.countCards('he')>0;
				},
				content:function(){
					'step 0'
					event.source=trigger.player;
					event.target=(player==trigger.target?trigger.player:trigger.target);
					var str;
					if(player==trigger.player) str='弃置自己的和该角色';
					else str='令其弃置其与你的';
					var next=trigger.player.chooseBool('是否对'+get.translation(trigger.target)+'发动【锋势】？',str+'的各一张牌，然后令'+get.translation(trigger.card)+'的伤害+1').set('ai',function(){
						var player=_status.event.getParent().player;
						var target=_status.event.getParent().target;
						var viewer=_status.event.player;
						if(viewer==player){
							if(get.attitude(viewer,target)>=0) return false;
							if(player.countCards('he',(card)=>get.value(card,player)<5)) return true;
							var card=_status.event.getTrigger().card;
							if((get.tag(card,'damage')||target.countCards('he',(card)=>get.value(card,target)>6))&&player.countCards('he',(card)=>get.value(card,player)<7)) return true;
							return false;
						}
						else{
							if(get.attitude(viewer,player)>=0) return false;
							if(!get.tag(card,'damage')) return false;
							if(viewer.countCards('he')>player.countCards('he')) return true;
							if(viewer.countCards('he',(card)=>get.value(card,target)>6)) return false;
							return true;
						}
					});
					if(player==next.player) next.setHiddenSkill('mffengshi');
					'step 1'
					if(result.bool){
						if(player==source) player.logSkill('mffengshi',target);
						else{
							player.logSkill('mffengshi');
							source.line(player,'green');
						}
						if(get.tag(trigger.card,'damage')) trigger.getParent().baseDamage++;
						player.chooseToDiscard('he',true);
					}
					else event.finish();
					'step 2'
					if(target.countDiscardableCards(player,'he')>0) player.discardPlayerCard(target,'he',true);
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
			fanyufeng:'樊夫人，东汉末年人物，昔桂阳太守赵范寡嫂。赵云随刘备平定江南四郡后，刘备以赵云为桂阳太守。赵范居心叵测，要将自己的嫂嫂樊氏嫁给赵云，但遭到赵云的拒绝。后来，赵范逃走，樊氏也下落不明。2001年，应日本日中青少年文化中心成立50周年之邀，北京京剧院赴日进行40场巡回演出，这次访日的剧目都不同程度地进行了加工改编，以符合日本观众的需求。《取桂阳》是根据老本重新排演的，叶金援饰赵云，王怡饰樊玉凤。剧中的樊玉凤成为文武双全的巾帼英雄，被赵云收降，后来在《龙凤呈祥》中也参与堵截东吴的追兵。',
			zhaozhong:'赵忠（？—189年），安平人，东汉末年宦官，赵延之兄。桓帝、灵帝时，历为小黄门、中常侍、大长秋、车骑将军等职，封都乡侯。在职时以搜刮暴敛、骄纵贪婪见称，灵帝极为宠信，常谓“赵常侍是我母”。中平六年（189年），何进谋诛宦官，事泄，他和其余几个常侍设计伏杀何进，袁绍、袁术等人闻何进被杀，入宫杀尽宦官，后捕杀赵忠。',
			caosong:'曹嵩（？—194年），字巨高，沛郡谯县（今安徽省亳州市）人。东汉大臣，大长秋曹腾的养子，曹操之父亲。门荫入仕，历任司隶校尉、鸿胪卿、大司农，位列九卿，位高权重。中平四年（187年），靠着贿赂中官，出任太尉，位列三公。中平五年（188年），受累于黄巾之乱，坐罪免官。兴平元年（194年），投奔兖州牧曹操，遇害于徐州。延康元年（220年），追尊魏国太王。曹魏建立后，追尊皇帝，谥号为太。',
			xiahoujie:'夏侯杰（？—208年），是罗贯中的小说《三国演义》中曹操的部将，征战时常常带在身边。在第42回长坂坡之战中，张飞大吼，从马儿受惊跌下马来而死。',
			ruanyu:'阮瑀（约165—212年），字元瑜，陈留尉氏（今河南开封市尉氏县）人，是东汉末年文学家，建安七子之一。阮瑀所作章表书记很出色，当时军国书檄文字，多为阮瑀与陈琳所拟。名作有《为曹公作书与孙权》。诗有《驾出北郭门行》，描写孤儿受后母虐待的苦难遭遇，比较生动形象。年轻时曾受学于蔡邕，蔡邕称他为“奇才”。后徙为丞相仓曹掾属。诗歌语言朴素，往往能反映出一般的社会问题。阮瑀的音乐修养颇高，他的儿子阮籍，孙子阮咸皆当时名人，位列“竹林七贤”，妙于音律。明人辑有《阮元瑜集》。',
			liangxing:'梁兴（？-212年），武威郡姑臧人也，东汉末年凉州军阀之一。与张横、贾诩、段煨是同乡，曾斩杀李傕。建安十六年，同韩遂、马超联合，起兵反抗曹操。梁兴率步骑五千夜袭曹军先头部队徐晃，被击退。联军战败后，梁兴逃到蓝田，劫掠周围郡县。夏侯渊进攻蓝田联合郑浑征讨梁兴，梁兴战败，不知所终。',
			zhangmiao:'张邈（？－195年），字孟卓，东平寿张（今山东东平县）人。东汉大臣、名士，“八厨”之一。举孝廉出身，授骑都尉，出任陈留太守。参与讨伐董卓，参加汴水之战，归附于曹操。兴平元年（194年），趁着曹操讨伐徐州牧陶谦，联合陈宫发动叛乱，迎立吕布为兖州牧。受到曹操讨伐，兵败投奔徐州牧刘备。兴平二年，张邈向袁术借兵途中，被部下所杀。',
			duanwei:'段煨（？～209年），字忠明，武威郡姑臧（今甘肃省武威市）人也。东汉末年将领，东汉太尉段颎同族兄弟，与太尉贾诩、张济、宣威侯张绣乃是同乡。原为董卓帐下将领，奉命屯兵华阴，勤劳农业。兴平二年（195年），迎接汉献帝刘协东归洛阳，供给衣食补给，与护驾将领杨定不和，引发激战十余天，听从汉献帝刘协劝解。东汉建安三年（198年），攻打黄白城，击杀李傕，夷其三族，封为镇远将军、闅乡亭侯、北地太守，累迁大鸿胪、金光禄大夫。建安十四年（209年），寿终正寝。',
			zhangheng:'张横，生卒年不详，武威郡姑臧人，东汉末年凉州军阀之一。与梁兴、贾诩、段煨乃是同乡。建安三年（198），张横与梁兴、段煨等斩杀李傕。十六年（211），同韩遂、马超联合，起兵反抗曹操，兵败后不知所终。',
			tangji:'唐姬，会稽太守唐瑁女，弘农怀王刘辩的妃子。刘辩死后，唐姬回归故里，因节烈不愿改嫁他人，后被汉献帝下诏封为弘农王妃。',
			yangwan:'杨氏（婉字出自小说，史书无记载），生卒年不详，东汉末年凉州人。早年嫁于东汉前将军、槐里侯马腾之子马超，追随马超转战并州、雍州、凉州，为马超生下子嗣。公元212年，马超联军在渭南战败后，杨婉随马超逃亡凉州，很快马超反攻吞并陇上诸郡县。公元213年，杨婉为了帮助马超，结识王异，了解马超这些投降部下。可惜被王异蛊惑，遭致马超大败。自己和孩子都被赵衢、梁宽杀害。',
			wenqin:'文钦（？~258年），字仲若，沛国谯郡（今安徽省亳州市）人，三国时期曹魏将领，曹操部将文稷之子。魏明帝太和年间文钦任牙门将、五营校督，后拜庐江太守、冠军将军，嘉平元年（249年），曹爽及其同党在高平陵之变中被杀，文钦心中不安，执政的司马氏集团为了安抚文钦，升其为前将军、扬州刺史，任职期间结交镇东将军毌丘俭。击退吴国太傅诸葛恪进攻，取得一定战果。正元二年（255年），文钦与镇东将军毌丘俭在扬州起兵讨伐司马师，兵败后投奔吴国，被封为镇北大将军、幽州牧，封谯侯。甘露二年（257年），文钦随吴军援救起兵反抗司马氏的诸葛诞，此后因被司马昭大军围困，军情告急，文钦与诸葛诞本就有矛盾，对文钦日益不满的诸葛诞遂将文钦杀死。淮南平定之后，文钦遗体被其二子收敛安葬。',
			heyan:'何晏（？－249年），字平叔。南阳郡宛县（今河南省南阳市）人。三国时期曹魏大臣、玄学家，东汉大将军何进之孙（一称何进弟何苗之孙）。何晏之父早逝，司空曹操纳其母尹氏为妾，他因而被收养，为曹操所宠爱。少年时以才秀知名，喜好老庄之学，娶曹操之女金乡公主。魏文帝在位时，未被授予官职。魏明帝认为何晏虚浮不实，也只授其冗官之职。大将军曹爽秉政时，何晏与之共事，得以累官至侍中、吏部尚书，典选举，封列侯。高平陵之变后，与大将军曹爽同为太傅司马懿所杀，被夷灭三族。何晏有文集十一卷，并曾与郑冲等共撰《论语集解》，今已佚。钟嵘《诗品》称“平叔鸿鹄之篇，风规见矣。”将何晏诗列入中品。袁宏在《名士传》中将何晏等称为正始名士。他与夏侯玄、王弼等倡导玄学，竞事清谈，遂开一时风气，为魏晋玄学的创始者之一。',
			qiuliju:'丘力居，东汉末年的辽西乌丸大人。拉拢中山太守张纯反叛东汉，寇略青、徐、幽、冀四州，杀略吏民。死时认为儿子楼班年幼，于是让从子蹋顿总摄三王部。',
			fengxi:'冯熙（?—223年），字子柔，颍川郡父城县（今河南省平顶山市宝丰县）人。汉末三国时期吴国官员，东汉初年名将冯异的后人。孙权担任车骑将军时，冯熙担任其幕府东曹掾，后迁立信都尉。刘备去世时，奉命进入蜀汉吊丧，返回后，任中大夫。后奉命出使魏国，受到魏文帝曹丕和尚书令陈群招揽，宁死不从，自尽未果。孙权闻之流泪，称其“东吴苏武”。最终在曹魏死去。',
			liuba:'刘巴（？－222年），字子初，荆州零陵郡烝阳县（今湖南省衡阳县、邵东县一带）人，东汉末年至三国时期蜀汉时期官员、名士。刘巴少知名，荆州牧刘表多次征用推举，刘巴均不应就。曹操征伐荆州，荆州士人多归刘备，刘巴却北上投靠曹操。后受曹操命令招降荆南三郡，不料先为刘备所得，刘巴不能复命曹操，遂远至交趾，又辗转进入益州。刘备平定益州后，刘巴归附刘备，为左将军西曹掾，法正死后接任尚书令。章武二年（222年）去世。刘巴博学多才，为刘备解决入蜀后的财政困难问题，又与诸葛亮等共制蜀汉的法律文件《蜀科》。为人简朴清高，退无私交，曹魏大臣陈群甚敬重之。所著录于《刘令君集》。',
			pengyang:'彭羕（184年－220年），字永年，广汉（今四川广汉北）人。东汉末年官吏。彭羕起初在益州任书佐，但后来其他人向益州牧刘璋诽谤他，刘璋于是以“髡钳”（剃去头发和胡须，并戴上刑具）处罚他，并且贬奴隶。此时刘备入蜀，彭羕想投靠刘备，于是去见庞统。庞统和他会面后很欣赏他，而法正亦很清楚彭羕，于是二人共同向刘备推荐彭羕。刘备多次命令彭羕传递军情和指示给诸将，表现都十分满意，日渐被赏识。刘备入主益州，领益州牧后就任命他为治州从事。彭羕见此，又变得嚣张自矜，诸葛亮对他礼待但心中并不喜欢他，多次密告刘备，说彭羕“心大志广，难可保安”。刘备见诸葛亮这样说，决定疏远彭羕，又观察他行事，于是贬他为江阳太守。彭羕见将被派往外地，心感不悦，与马超见面时又曾对他说“老革荒悖，可复道邪！”“卿为其外，我为其内，天下不足定也。”马超听后大惊，彭羕走后以他的说话告发彭羕，彭羕于是被收监下狱。最后彭羕被处死，死时三十七岁。',
			huaxin:'华歆（157年－232年1月30日），字子鱼，汉族。平原郡高唐县人（今山东省高唐县）。汉末至三国曹魏初年名士、重臣。华歆早年拜太尉陈球为师，与卢植、郑玄、管宁等为同门，又与管宁、邴原共称一龙，华歆为龙头。汉灵帝时华歆被举为孝廉，任郎中，因病去官。又被大将军何进征召为尚书郎。后任豫章太守，甚得民心。孙策率军南下，华歆举郡投降，被奉为上宾。官渡之战时，被征为议郎、参司空军事。入为尚书、侍中，又代荀彧为尚书令。丞相曹操讨孙权时，授华歆为军师。后为魏王国的御史大夫。曹丕即王位，拜华歆为相国，封安乐乡侯。曹魏建立后，其相国职名改称司徒。魏明帝即位，升任太尉，晋封博平侯。太和五年十二月（232年1月），华歆去世，年七十五，谥号“敬”。有文集三十卷，今佚失，其余见《全三国文》。',
			luyusheng:'陆郁生（？年-？），三国时期吴国官员陆绩之女。陆郁生的父亲陆绩是吴郡公认的才子，又是当时吴郡陆氏的领袖。陆绩赴任担任郁林太守，遂取此名。陆郁生年少的时候就定下坚贞的志向。建安二十四年（219年)，陆绩早亡，她与两个兄弟陆宏、陆睿当时都只有几岁，一起返回吴县，被他们的从兄陆瑁接回抚养。13周岁的陆郁生嫁给同郡出身的张白为妻。出嫁3个月后，张白因为其兄张温一族的案件遭到连坐，被处以流刑，后死于流放地，陆郁生成为了寡妇，其后公开宣言不再改嫁，困难于生计但拒绝了所有提亲，在艰苦中从未停止服侍、照顾张白的姐妹。事情传到朝廷，皇帝褒奖陆郁生，号其为“义姑”。她的表侄姚信在文集中称赞她的义举。',
			dongxie:'董卓之女，牛辅之妻。在《三国群英传》中名为董宜，在电视剧《三国群英会之吕布与貂蝉》中名为董媛。',
			caoanmin:'曹安民（？-197年），沛国谯县（今安徽亳州）人，字安民。东汉时期人物，曹德之子，曹操之侄，曹昂的堂兄弟，曹丕的堂兄，死于宛城之战。按曹丕《典论》记载的“亡兄孝廉子脩、从兄安民遇害。”等情况来看，安民应该是曹操侄子错不了，曹丕是他们属于兄弟关系肯定不会弄错。另外从典论的记载来看安民是和子脩并提的，子脩是曹昂的字，安民则肯定也是字不是名，至于三国志中记载则应取自曹丕之《典论》但陈寿又不知曹安民其名，故写为“长子昂、弟子安民”。',
			dufuren:'杜夫人（生卒年不详），东汉末年至三国时人。有异色，原为吕布将秦宜禄之妻，生子秦朗。后为曹操纳为妾，又生曹林、曹衮、金乡公主。',
			lvlingqi:'吕玲绮，虚拟人物，源于日本光荣株式会社（现光荣特库摩公司）旗下游戏《真·三国无双》系列，初次登场于《真三国无双7：猛将传》。吕布的女儿，寂寥而威风凛凛的战姬，发挥着不亚于父亲的武艺，非常勇敢地身先士卒立于前线。虽然有着能够直面困难的坚强意志，却由于过去的经历而有着非常害怕孤独的一面。',
			zhouyi:'周夷，游卡桌游旗下产品《三国杀》自行杜撰的人物。设定为周瑜的妹妹，和周瑜一同征战。',
			mifangfushiren:'麋芳（生卒年不详），字子方，东海郡朐县（今江苏省连云港市）人。汉末三国时期蜀国将领，刘备糜夫人的兄弟。麋芳本为徐州牧陶谦部下，曾被曹操表为彭城相。后来辞官，随刘备从徐州辗转至邺城、汝南、新野、长坂坡、江夏等地，奔波多年。傅士仁（生卒年不详），字君义，幽州广阳郡（今北京市）人，刘备手下将领。受到刘备的重用，但被关羽轻慢。<br>刘备称汉中王时，糜芳为南郡太守，但受到关羽的轻慢。后来，因未完成供给军资的任务而被关羽责骂，心中不安。吕蒙袭取荆州时，将已经投降的傅士仁展示给糜芳，麋芳于是选择投降，导致关羽兵败被杀。此后，在吴国担任将军，并且为吴征伐。',
			tongyuan:'童渊，字雄付，武术名家，与并州李彦是结拜兄弟，两人均师承义父玉真子，两人分别娶了河北颜家的两位大小姐颜云、颜雨。童飞之父，有张任、张绣为入室弟子，晚年收赵云为关门弟子，传其毕生所学。其成名技为“百鸟朝凤枪”。童渊是南方苏州评话三国中的原创人物，在历史中以及《三国演义》中并不存在。',
			liuyong:'刘永，字公寿，涿郡涿县（今河北涿州）人，三国时期蜀汉昭烈帝刘备之子，蜀汉后主刘禅之弟。章武元年（221年）六月，封鲁王。建兴八年（230年），改封甘陵王。咸熙元年（264年），蜀汉灭亡，刘永被迁往洛阳，被任命为奉车都尉，封乡侯。',
			//zhangning:'张宁，东汉末年大贤良师张角的女儿。自幼学习太平道法，掌握天地法则。',
			wanniangongzhu:'刘氏（生卒年不详），河南郡雒阳县（今河南省洛阳市）人，汉灵帝刘宏之女，汉少帝刘辩与汉献帝刘协的姐妹，封万年公主。',
			xinping:'辛评（？－204年），字仲治，颍川阳翟人，东汉末年人物。曹魏卫尉辛毗之兄。原是韩馥部下，韩馥逃亡后转而辅佐袁绍。袁绍死后，辛评、郭图欲立袁谭为主，与审配等不和。后来曹操破邺，其弟辛毗在城下劝降。审配怒遣手下将辛评全家杀害。',
			hanmeng:'韩猛，又名韩若、韩荀、韩泣（上荀下大） ，东汉末年袁绍帐下名将，或与《曹瞒传》所言韩莒子为同一人。公元200年，官渡之战爆发。袁绍派遣韩猛劫掠曹操军的西道，被曹军部将曹仁击破于鸡洛山。袁绍又派韩猛前去运送粮车，因为轻敌被曹军部将徐晃、史涣击退。',
			caojinyu:'金乡公主，本姓曹氏，名字不详，沛国谯县（今安徽省亳州市）人。魏武帝曹操的女儿，母为杜夫人。适婚的时候，嫁给曹操的养子何晏。高平陵之变，何晏作为大将军曹爽的党羽，遭到太傅司马懿处死。在何晏母亲尹夫人苦苦哀求下，何晏的儿子得以保全。',
			wangtao:'王桃是在《花关索传》中登场的虚拟人物，盗贼王令公的两个女儿之一，王悦的姐姐，与妹妹都是关索之妻。姐妹俩原为卢塘寨山贼，以武艺与美貌而闻名，被众多男性求婚却皆不与理睬。她们在关索回西川认父途中与关索交手时不敌，因意气投合而一齐下嫁。虽为架空之人物，但四川省内有记述夫妻三人共同守护葭萌关一事，民间亦流传如夫妻三人曾共同参与诸葛亮之南蛮征伐等轶事。',
			wangyue:'王悦是在《花关索传》中登场的虚拟人物，盗贼王令公的两个女儿之一，王桃的妹妹，与姐姐都是关索之妻。姐妹俩原为卢塘寨山贼，以武艺与美貌而闻名，被众多男性求婚却皆不与理睬。她们在关索回西川认父途中与关索交手时不敌，因意气投合而一齐下嫁。虽为架空之人物，但四川省内有记述夫妻三人共同守护葭萌关一事，民间亦流传如夫妻三人曾共同参与诸葛亮之南蛮征伐等轶事。',
			zhaoyan:'赵嫣，生卒年不详。东吴方士（一说是丞相）赵达之妹，吴大帝孙权之妃，人称赵夫人。她心灵手巧，多才多艺，有“三绝”之称。孙权曾经想要找擅长绘画之人绘制山川地势军阵之图。赵达举荐了自己的妹妹。赵嫣认为水墨容易褪色，不方便在军旅之中保存。自己擅长刺绣，可以在锦帛上绣出孙权所需之图。待制作完成后献于孙权，只见方帛锦绣之上有五岳河海城邑行阵之形，孙权大为赞叹。时人谓之“针绝”。除刺绣之外，赵嫣还擅长绘画织锦，她能用彩丝织成云霞龙蛇之锦，大则盈尺，小则方寸，宫中谓之“机绝”。孙权在昭阳宫居住之时，饱受暑气之扰，以紫绡制成帷帐缓解暑气。赵嫣认为此物不足为贵，她削下自己的头发剖为细丝，以郁夷国出产的神胶连接，花了数月功夫将其制成一顶幔帐，打开之后薄如蝉翼，轻赛寒烟。放下帐帷能笼罩一丈之地，帐内清风自生暑意顿消。收起来则可纳入枕中，携带方便。时人谓之“丝绝”。',
			yanfuren:'《三国志》中东汉末年著名武将吕布有一妻子，但姓名未载于史书，或为魏续的姐妹魏氏。在李傕郭汜之乱期间曾受困，幸亏被庞舒所救，私藏于府中而得以幸免。吕布被曹操围困时，反对陈宫的计谋，导致了吕布的失败。《三国演义》中，姓严，通称严夫人，和吕布生有一女欲嫁于袁术之子，未果，吕布失败后与其女一同送往许昌。',
			haomeng:'郝萌（？－196年），东汉末年吕布帐下名将。建安元年（196年），郝萌在袁术的怂恿下反叛吕布，曾一度打得吕布躲入厕所。后来，被吕布部将高顺所阻，其部将曹性临阵反叛，最终被高顺所杀。在小说《三国演义》中，吕布被围下邳时，郝萌护送许汜王楷回城时，被张飞擒获，被曹操所杀。',
			wufan:'吴范（？－226年），字文则，会稽上虞（今浙江绍兴上虞区）人。三国时期孙吴官员，擅长术数。与刘惇、赵达、严武、曹不兴、皇象、宋寿和郑妪合称“吴中八绝”。吴范以推算天象节气和观察气候闻名于郡中。孙权起于东南，他委身事奉，每推算灾祥多应验，遂显名。孙权委以骑都尉，领太史令。初，孙权为将军时，他曾说江南有王气。及孙权立为吴王，论功行封，欲以为都亭侯，但因不愿将其术要诀告知孙权，为权所怨恨，被除名。黄武中，病死。',
			mamidi:'马日(mì)磾(dí)（？～194年），字翁叔。扶风茂陵（今陕西省兴平市）人。东汉中后期大臣，经学大师马融之族孙（一作族子）。马日磾年轻时即继承马融学说，以才学入仕。曾任谏议大夫，与蔡邕、卢植等人东观典校官藏的《五经》记传，并参与续写《东观汉记》。后历任射声校尉、太尉、太常等职。初平三年（192年），掌权的李傕任命马日磾为太傅、录尚书事，与太仆赵岐共同出使关东。他到寿春袁术处后，对其多有所求，遭袁术轻鄙，袁术遂夺其符节，来随意征辟将士，并企图强迫马日磾任其军师，马日磾求去不能，忧愤发病，兴平元年（194年），卒于寿春。',
			licaiwei:'李采薇，生卒年不详，汉末将领庞德之妻，庞会之母。襄樊之战时，庞德任先锋，随于禁率军增援驻守樊城的曹仁。出战前，他将妻子李采薇与年仅六岁的儿子庞会叫来面前，对李采薇说：“吾今为先锋，义当效死疆场。我若死，汝好生看养吾儿。吾儿有异相，长大必当与吾报仇也。”李采薇闻言，与儿子痛哭送别庞德。她知道丈夫已下定决心，若无法胜利归还则必当战死沙场，绝不会投降求生。其后前线果然传来消息：魏军全军覆没，于禁投降，庞德誓死不降被关羽所杀。其子庞会自幼丧父，由母亲抚养长大。成年后，庞会性格勇烈，有先父之风。他多次立下战功，深受魏文帝曹丕的喜爱。后来庞会随钟会、邓艾伐蜀，成都城破之后，尽灭关氏家以报父仇。',
			tengyin:'滕胤（？－256年），字承嗣，三国时期吴国重臣，北海郡剧县（今山东省昌乐县）人。滕胤仪表堂堂，少时有节操，后娶公主为妻。孙权称王后，滕胤被封都亭侯。其后历任丹杨太守、吴郡太守、会稽太守。孙亮继位后，出任太常、卫将军。诸葛恪被杀后，群臣推举滕胤为司徒，但遭权臣孙峻党羽所阻挠，滕胤也有意避嫌，最终只晋爵高密侯。孙峻死后，由其堂弟孙綝执政。滕胤的连襟、骠骑将军吕据联系北伐前线诸将推举滕胤为相，希望分割孙綝权力，但并未成功，滕胤被改任大司马，镇守武昌。不久，滕胤与吕据密谋推翻孙綝，因计划泄露而被杀，惨遭灭族。孙綝被杀后，景帝孙休为滕胤平反。',
			guanning:'管宁（158年—241年），字幼安。北海郡朱虚县（今山东省安丘、临朐东南）人。汉末三国时期著名隐士。管宁与华歆、邴原并称为“一龙”。汉末天下大乱时，与邴原及王烈等人避于辽。在当地只谈经典而不问世事，做讲解《诗经》《书经》，谈祭礼、整治威仪、陈明礼让等教化工作，人们都很乐于接受他的教导。直到魏文帝黄初四年（公元223年）才返乡，辽东太守公孙恭亲自送别。此后曹魏几代帝王数次征召管宁，他都没有应命。正始二年（公元241年），管宁逝世，年八十四。著有《氏姓论》。',
			caomao:'曹髦（241年11月15日－260年6月2日）[1]，字彦士，沛国谯县（今安徽省亳州市）人，魏文帝曹丕之孙，东海王曹霖之子，曹魏第四位皇帝（254年11月1日－260年6月2日）。正始二年（241年），生于东海王宫，自幼聪明好学，才慧早成，正始五年（244年），封为高贵乡公，嘉平六年（254年），大将军司马师废除齐王曹芳后，拥立为帝，年号正元，曹髦文才武略，崇拜少康，不满司马氏专权秉政，甘露五年（260年），亲自讨伐司马昭，为太子舍人成济所弑，年仅十九岁，以王礼葬于洛阳西北。曹髦擅长诗文，创制了九言诗，传世文章有《伤魂赋并序》《颜子论》等。爱好儒学，亲赴太学论道，著有《春秋左氏传音》（失传）。精通绘画，一说为中国第一位成为画家的皇帝，唐张彦远《历代名画记》目曹髦为中品。',
			laiyinger:'来莺儿，是个传说中的人物，正史及古代典籍并无记载。相传来莺儿是东汉歌妓，建安年间洛阳名妓，后爱上曹操的侍卫王图，王图因延误军机而押赴刑场，当时来莺儿奋不顾身以己命换王图一死。新编古装潮剧《曹营恋歌》，秦腔《雀台歌女》讲述了歌女来莺儿与情人王图及曹操三人之间催人泪下的故事。',
			tenggongzhu:'滕公主，名讳不详，三国人物，吴大帝孙权之女。一说为养女，生父为孙权堂弟孙奂。黄武年间（222年—228年），以公主身份下嫁功臣滕胄之子滕胤，当时滕胤年仅20岁。滕胤皮肤白皙，容貌俊美，每逢入朝大臣们没有不惊叹称羡的。滕胤仕官后，上书言及时局，又对政策多有匡弼。孙权对公主也特别宠爱，因为滕胤的缘故，又格外增加对公主的赏赐，又几次探望慰劳。少帝孙亮时期，孙綝以宗室身份独揽大权作恶多端，引发群臣不满。五凤三年（256年）滕胤与连襟吕据密谋推翻孙綝，事败遭到夷三族 。公主则被亲兄孙壹救出，携其逃亡曹魏。',
			zhangyao:'张美人，三国东吴末帝孙皓后妃，张布之女。另有张布女，张美人姊被孙皓立为左夫人。《吴书五妃嫔传第五》：江表传曰：皓以张布女为美人，有宠，皓问曰：“汝父所在？”答曰：“贼以杀之。”皓大怒，棒杀之。后思其颜色，使巧工刻木作美人形象，恒置座侧。问左右：“布复有女否？”答曰：“布大女适故卫尉冯朝子纯。”即夺纯妻入宫，大有宠，拜为左夫人，昼夜与夫人房宴，不听朝政，使尚方以金作华燧、步摇、假髻以千数。令宫人著以相扑，朝成夕败，辄出更作，工匠因缘偷盗，府藏为空。会夫人死，皓哀愍思念，葬于苑中，大作冢，使工匠刻柏作木人，内冢中以为兵卫，以金银珍玩之物送葬，不可称计。已葬之后，皓治丧於内，半年不出。国人见葬太奢丽，皆谓皓已死，所葬者是也。皓舅子何都颜状似皓，云都代立。临海太守奚熙信讹言，举兵欲还诛都，都叔父植时为备海督，击杀熙，夷三族，讹言乃息，而人心犹疑。',
			yanrou:'阎柔（生卒年不详），燕国广阳（今北京市附近）人。三国时期曹魏名将。年少时曾被乌丸、鲜卑俘虏，后来却得到他们的信任。刘虞死后，阎柔被鲜于辅等推举为乌丸司马，联系鲜卑为刘虞报仇，和公孙瓒对抗。在官渡之战时归曹操，拜护乌丸校尉，对曹操讨伐乌丸有功，赐爵关内侯。曹操待其如子，曹丕也视其如亲兄弟，阎柔坐镇北方，统帅幽州兵马，抗击胡人的入侵。曹丕即位后，阎柔被拜为度辽将军。',
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
				if(player.storage.bazhan) return '转换技，出牌阶段限一次，阴：你可以将至多两张手牌交给一名其他角色。<span class="bluetext">阳：你可以获得一名其他角色的至多两张手牌。</span>若以此法移动的牌包含【酒】或♥牌，则你可令得到此牌的角色执行一项：①回复1点体力。②复原武将牌。';
				return '转换技，出牌阶段限一次，<span class="bluetext">阴：你可以将至多两张手牌交给一名其他角色。</span>阳：你可以获得一名其他角色的至多两张手牌。若以此法移动的牌包含【酒】或♥牌，则你可令得到此牌的角色执行一项：①回复1点体力。②复原武将牌。';
			},
			zhiren:function(player){
				return '当你于'+(player.hasSkill('yaner_zhiren')?'一':'你的')+'回合内使用第一张非转化牌时，你可依次执行以下选项中的前X项：①卜算X。②可弃置场上的一张装备牌和延时锦囊牌。③回复1点体力。④摸三张牌。（X为此牌的名称的字数）';
			},
			cuijian:function(player){
				return '出牌阶段限一次，你可以选择一名有手牌的其他角色。若其手牌中有【闪】，则其将所有【闪】和防具牌交给你'+(player.hasMark('zhtongyuan_basic')?'':'，然后你交给其等量的牌')+'。'+(player.hasMark('zhtongyuan_trick')?'若其手牌中没有【闪】，则你摸两张牌。':'');
			},
			yuqi:function(player){
				var info=lib.skill.yuqi.getInfo(player);
				return '每回合限两次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>'+info[0]+'</span>，则你可以观看牌堆顶的<span class=firetext>'+info[1]+'</span>张牌。你将其中至多<span class=greentext>'+info[2]+'</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>'+info[3]+'</span>张牌，并将其余牌以原顺序放回牌堆顶。（所有具有颜色的数字至多为5）';
			},
			dunshi:function(player){
				var info=player.storage.dunshi;
				var str='每回合限一次。你可以视为使用或打出一张';
				var list=['sha','shan','tao','jiu'];
				for(var i of list){
					var strx='【'+get.translation(i)+'】';
					if(!info||!info[0].contains(i)) strx=('<span style="text-decoration: line-through;">'+strx+'</span>');
					str+=strx;
					if(i!='jiu') str+='/';
				}
				str+='，然后当前回合角色于本回合内下一次造成伤害时，你选择两项：⒈防止此伤害。系统从技能名中包含“仁/义/礼/智/信”字样的技能中随机选择三个其未拥有的技能，然后你令当前回合角色获得其中一个技能。⒉从〖遁世〗中删除你本次使用或打出的牌并获得一个“赂”。⒊减1点体力上限并摸X张牌（X为你的“赂”数）。';
				return str;
			},
		},
		perfectPair:{
		},
		characterReplace:{
			lijue:['lijue','ns_lijue'],
			fanchou:['fanchou','ns_fanchou'],
			zhangji:['zhangji','ns_zhangji'],
			zhangchangpu:['zhangchangpu','sp_zhangchangpu','ol_zhangchangpu'],
			huangfusong:['huangfusong','sp_huangfusong','old_huangfusong'],
			wenyang:['wenyang','db_wenyang','diy_wenyang'],
			dingyuan:['ol_dingyuan','dingyuan'],
			quyi:['quyi','re_quyi'],
			hansui:['xin_hansui','re_hansui'],
			jin_simashi:['jin_simashi','simashi'],
			jin_yanghuiyu:['jin_yanghuiyu','yanghuiyu'],
			chunyuqiong:['chunyuqiong','re_chunyuqiong'],
			taoqian:['taoqian','re_taoqian'],
			sp_liubei:['sp_liubei','jsp_liubei'],
			dongcheng:['re_dongcheng','dongcheng'],
			hucheer:['tw_hucheer','re_hucheer','hucheer'],
			dongbai:['re_dongbai','dongbai'],
			gexuan:['gexuan','tw_gexuan'],
			panshu:['panshu','re_panshu'],
			nanhualaoxian:['re_nanhualaoxian','nanhualaoxian'],
			kanze:['re_kanze','kanze'],
			yangwan:['yangwan','sp_yangwan'],
			chendeng:['ol_chendeng','re_chendeng','chendeng'],
			pangdegong:['re_pangdegong','pangdegong'],
			zhujun:['sp_zhujun','zhujun'],
			sunyi:['re_sunyi','sunyi'],
			tw_liuhong:['tw_liuhong','liuhong'],
			miheng:['miheng','re_miheng'],
			re_hejin:['re_hejin','tw_hejin'],
			fengfangnv:['re_fengfangnv','fengfangnv'],
			luotong:['luotong','dc_luotong'],
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
			"xinfu_yisuan_info":"每回合限一次。当你于出牌阶段使用的锦囊牌结算结束后，你可以减1点体力上限并获得此牌对应的所有实体牌。",
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
			"xinfu_qianxin_info":"出牌阶段限一次，若牌堆中没有“信”，你可以选择一名角色并将任意张手牌放置于牌堆中X倍数的位置（X为存活人数），称为“信”。该角色的弃牌阶段开始时，若其手牌区内有于本回合内获得过的“信”，其选择一项：令你将手牌摸至四张；本回合手牌上限-2。",
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
			rewenji:'问计',
			rewenji_info:'出牌阶段开始时，你可以令一名其他角色交给你一张牌。你于本回合内使用与该牌类型相同的牌时不能被其他角色响应。',
			sptunjiang:'屯江',
			sptunjiang_info:'结束阶段，若你未于本回合的出牌阶段内使用牌指定过其他角色为目标，则你可以摸X张牌（X为全场势力数）。',
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
			tuiyan_info:'出牌阶段开始时，你可以观看牌堆顶的三张牌。',
			busuan:'卜算',
			busuan_info:'出牌阶段限一次，你可以选择一名其他角色，然后选择至多两张不同的卡牌名称（限基本牌或锦囊牌）。该角色下次摸牌阶段摸牌时，改为从牌堆或弃牌堆中获得你选择的牌。',
			busuan_angelbeats:'卜算',
			mingjie:'命戒',
			mingjie_info:'结束阶段，你可以摸一张牌，若此牌为红色，你可以重复此流程直到摸到黑色牌或摸到第三张牌。当你以此法摸到黑色牌时，若你的体力值大于1，则你失去1点体力。',
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
			songshu_info:'出牌阶段，你可以和其他角色拼点。若你没赢，你与其各摸两张牌，且你本阶段内不能再发动〖颂蜀〗。',
			sibian:'思辩',
			sibian_info:'摸牌阶段，你可以放弃摸牌，改为亮出牌堆顶的四张牌，然后获得其中所有点数最大与点数最小的牌，且可以将剩余的牌交给手牌数最少的角色。',
			lslixun:'利熏',
			lslixun_fate:'利熏',
			lslixun_info:'锁定技，当你受到伤害时，你防止此伤害，然后获得等同于伤害值的“珠”标记。出牌阶段开始时，你进行判定，若结果点数小于“珠”的数量，你弃置等同于“珠”数量的手牌（若弃牌的牌数不够，则失去剩余数量的体力值）。',
			lskuizhu:'馈珠',
			lskuizhu_info:'出牌阶段结束时，你可以选择体力值为全场最多的一名其他角色，将手牌摸至与该角色相同（最多摸至五张），然后该角色观看你的手牌，弃置任意张手牌并从观看的牌中获得等量的牌。若其获得的牌大于一张，则你选择一项：移去一个“珠”；或令其对其攻击范围内的一名角色造成1点伤害。',
			xpchijie:'持节',
			xpchijie_info:'每回合限一次。①当你受到其他角色使用的牌造成的伤害时，你可以令此牌对所有目标无效。②其他角色使用的牌结算完成时，若你是此牌的目标之一且此牌未造成过伤害，则你可以获得此牌对应的所有实体牌。',
			xpchijie2:'持节',
			yinju:'引裾',
			yinju_info:'限定技，出牌阶段，你可以选择一名其他角色。若如此做，当你于此阶段内使用牌指定其为目标后，你与其各摸一张牌；当你即将对其造成伤害时，防止此伤害，然后其回复等量的体力。',
			yinju2:'引裾',
			
			spjiedao:"截刀",
			"spjiedao_info":"当你每回合第一次造成伤害时，你可令此伤害至多+X（X为你损失的体力值）。然后若受到此伤害的角色没有死亡，你弃置等同于此伤害加值的牌。",
			biaozhao:"表召",
			"biaozhao_info":"结束阶段，你可以将一张牌置于武将牌上，称为“表”。当有一张与“表”花色点数均相同的牌进入弃牌堆后，你将“表”置入弃牌堆并失去1点体力，若此牌是其他角色因弃置而进入弃牌堆的，则改为该角色获得“表”。准备阶段，若你的武将牌上有“表”，则你将“表”置入弃牌堆。然后你选择一名角色，该角色回复1点体力且将手牌摸至与全场手牌数最多的人相同（最多摸五张）。",
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
			xunchen:'OL荀谌',
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
			gaolan:'OL高览',
			xiying:'袭营',
			xiying2:'袭营',
			xiying_info:'出牌阶段开始时，你可以弃置一张非基本手牌，然后令所有其他角色依次选择一项：弃置一张牌，或本回合内不能使用或打出牌；且你本回合内获得如下效果：结束阶段，若你于本回合的出牌阶段内造成过伤害，则你从牌堆中获得一张伤害性基本牌或普通锦囊牌。',
			lvkuanglvxiang:'吕旷吕翔',
			liehou:'列侯',
			liehou_info:'出牌阶段限一次，你可以令一名攻击范围内的角色交给你一张手牌，然后你将一张手牌交给攻击范围内的另一名角色。',
			qigong:'齐攻',
			qigong_info:'当你使用的【杀】被【闪】抵消之后，你可以令一名角色再对目标角色使用一张【杀】（不可被响应）。',
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
			xuxie_info:'出牌阶段开始时，你可以减1点体力上限并选择所有与你距离为1的角色，弃置这些角色的各一张牌或令这些角色各摸一张牌。出牌阶段结束时，若你的体力上限不为全场最多，则你加1点体力上限，然后回复1点体力或摸两张牌。',
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
			remeibu_info:'其他角色的出牌阶段开始时，若你在其攻击范围内，你可以弃置一张牌A，该角色于本阶段内拥有〖止息〗，且当其因〖止息〗弃置与牌A花色相同的牌时，你获得之。',
			rezhixi:'止息',
			rezhixi_info:'锁定技，当你使用【杀】或普通锦囊牌时，你弃置一张手牌。',
			remumu:'穆穆',
			remumu_info:'出牌阶段开始时，你可以选择一项：1.弃置一名其他角色装备区里的一张牌，然后你本回合可使用【杀】的次数+1；2.获得一名角色装备区里的一张牌，然后你本回合可使用【杀】的次数-1。',
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
			gongjian_info:'每回合限一次，当有角色使用【杀】指定第一个目标后，若此【杀】的目标和本局游戏内被使用的上一张【杀】的目标的交集A不为空，则你可以依次弃置A中所有角色的至多两张牌，然后获得以此法弃置的所有【杀】。',
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
			bazhan_info:'转换技，出牌阶段限一次，阴：你可以将至多两张手牌交给一名其他角色。阳：你可以获得一名其他角色的至多两张手牌。若以此法移动的牌包含【酒】或♥牌，则你可令得到牌的角色执行一项：①回复1点体力。②复原武将牌。',
			jiaoying:'醮影',
			jiaoying2:'醮影',
			jiaoying3:'醮影',
			jiaoying3_draw:'醮影',
			jiaoying_info:'锁定技，其他角色获得你的手牌后，该角色本回合不能使用或打出与此牌颜色相同的牌。然后此回合结束时，若其本回合没有再使用牌，你令一名角色将手牌摸至五张。',
			zhaozhong:'赵忠',
			yangzhong:'殃众',
			yangzhong_info:'当你造成或受到伤害后，若受伤角色和伤害来源均存活，则伤害来源可弃置两张牌，然后令受伤角色失去1点体力。',
			huangkong:'惶恐',
			huangkong_info:'锁定技，当你于回合外成为【杀】或普通锦囊牌的目标后，若你没有手牌，则你摸两张牌。',
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
			reyirang_info:'出牌阶段开始时，你可以将所有非基本牌交给一名其他角色。若其体力上限大于你，则你将体力上限调整至与其相同。然后你回复X点体力（X为你以此法交给其的牌数）。',
			xiahoujie:'夏侯杰',
			liedan:'裂胆',
			liedan_info:'锁定技，其他角色的准备阶段开始时，若X大于0，则你摸X张牌。若X等于3，则你加1点体力上限（至多加到8）。若X为0，则你失去1点体力并获得一枚“裂”（X为你的手牌数，体力值，装备区牌数中大于其的数量）。准备阶段，若“裂”数大于4，则你死亡。',
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
			mouni_info:'准备阶段，你可对一名其他角色依次使用你手牌中所有的【杀】（若其进入了濒死状态，则终止此流程）。然后若这些【杀】中有未造成伤害的【杀】，则你跳过本回合的出牌阶段和弃牌阶段。',
			zongfan:'纵反',
			zongfan_info:'觉醒技，结束阶段，若你本回合内因〖谋逆〗使用过【杀】且未跳过本回合的出牌阶段，则你将任意张牌交给一名其他角色，然后加X点体力上限并回复X点体力（X为你以此法给出的牌数）。最后失去〖谋逆〗并获得〖战孤〗。',
			zhangu:'战孤',
			zhangu_info:'锁定技，准备阶段，若你的体力上限大于1且没有手牌/装备区内没有牌，则你减1点体力上限，然后从牌堆中获得三张类型不同的牌。',
			re_niujin:'牛金',
			recuorui:'摧锐',
			recuorui_info:'限定技，出牌阶段，你可以依次获得至多X名角色的各一张手牌（X为你的体力值）。',
			reliewei:'裂围',
			reliewei_info:'当有角色于你的回合内进入濒死状态时，你可以摸一张牌。',
			duanwei:'段煨',
			langmie:'狼灭',
			langmie_damage:'狼灭',
			langmie_info:'其他角色的出牌阶段结束时，若其本阶段内使用过的牌中有类型相同的牌，则你可以弃置一张牌并摸两张牌；其他角色的结束阶段开始时，若其本回合内造成的伤害大于1，则你可以弃置一张牌并对其造成1点伤害。',
			zhangheng:'张横',
			dangzai:'挡灾',
			dangzai_info:'出牌阶段开始时，你可将一名其他角色判定区内的一张牌移动至你的判定区内。',
			liangjue:'粮绝',
			liangjue_info:'锁定技，当有黑色牌进入或者离开你的判定区或装备区后，若你的体力值大于1，你失去1点体力，然后摸两张牌。',
			tangji:'唐姬',
			jielie:'抗歌',
			jielie_info:'你的第一个回合开始时，选择一名其他角色，该角色每次于其回合外获得牌后，你摸等量的牌（每回合至多摸三张）；其进入濒死状态时，你可令其回复体力至1点（每轮限一次）。该角色死亡时，你弃置所有牌并失去1点体力。',
			kangge:'节烈',
			kangge_info:'当你受到除自己和“抗歌”角色以外的角色造成的伤害时，你可以防止此伤害并选择一种花色，然后你失去X点体力，令“抗歌”角色从弃牌堆中随机获得X张此花色的牌（X为伤害值）。',
			yangwan:'杨婉',
			youyan:'诱言',
			youyan_info:'出牌阶段/弃牌阶段各限一次，当你的牌因弃置进入弃牌堆后，你可以从牌堆中获得本次弃牌中没有的花色的牌各一张。',
			zhuihuan:'追还',
			zhuihuan2:'追还',
			zhuihuan2_new:'追还',
			zhuihuan_info:'结束阶段开始时，你可以选择一名角色（对其他角色不可见）。记录所有对该角色造成过伤害的角色。该角色的下个准备阶段开始时停止记录，且所有记录过的角色：若体力值大于该角色，则受到其造成的2点伤害；若体力值小于等于该角色，则随机弃置两张手牌。',
			re_dongcheng:'董承',
			xuezhao:'血诏',
			xuezhao_info:'出牌阶段限一次，你可弃置一张手牌并选择至多X名其他角色(X为你的体力上限）。这些角色依次选择是否交给你一张牌，若选择是，该角色摸一张牌且你本回合可多使用一张【杀】；若选择否，该角色本回合无法响应你使用的牌。',
			re_hucheer:'胡车儿',
			redaoji:'盗戟',
			redaoji2:'盗戟',
			redaoji_info:'其他角色第一次使用武器牌时，你可选择一项：①获得此牌。②令其本回合内不能使用或打出【杀】。',
			fuzhong:'负重',
			fuzhong_info:'锁定技，当你于回合外获得牌后，你获得一枚“重”标记。若X：大于0，你于摸牌阶段开始时令额定摸牌数+1；大于1，你至其他角色的距离-2；大于2，你的手牌上限+3；大于3，结束阶段开始时，你对一名其他角色造成1点伤害，然后移去4枚“重”（X为“重”数）。',
			heyan:'何晏',
			yachai:'崖柴',
			yachai_info:'当你受到伤害后，你可令伤害来源选择一项：①其本回合不能再使用手牌，然后你摸两张牌；②其展示所有手牌，然后将其手牌中一种花色的所有牌交给你；③弃置一半数量的手牌（向上取整）。',
			qingtan:'清谈',
			qingtan_info:'出牌阶段限一次，你可令所有有手牌的角色同时选择一张手牌并同时展示。你可以获得其中一种花色的牌，然后展示此花色牌的角色各摸一张牌。若如此做，弃置其他的牌。',
			qiuliju:'丘力居',
			koulve:'寇略',
			koulve_info:'当你于出牌阶段内对其他角色造成伤害后，你可以展示其X张手牌（X为其已损失的体力值）。若这些牌中：有带有伤害标签的基本牌或锦囊牌，则你获得之；有红色牌，则你失去1点体力（若已受伤则改为减1点体力上限），然后摸两张牌。',
			qljsuiren:'随认',
			qljsuiren_info:'当你死亡时，你可以将手牌中所有的带有伤害标签的基本牌或锦囊牌交给一名其他角色。',
			re_dongbai:'董白',
			relianzhu:'连诛',
			relianzhu_info:'出牌阶段限一次，你可将一张牌正面朝上交给一名其他角色。若此牌为：红色，你摸一张牌；黑色，对方弃置两张牌或令你摸两张牌。’',
			rexiahui:'黠慧',
			rexiahui_info:'锁定技，①你的黑色牌不计入手牌上限。②当有其他角色获得你的黑色牌后，其于下次扣减体力前不能使用，打出，弃置这些牌。③一名其他角色的回合结束时，若其本回合失去过其所有“黠慧”牌，则其失去1点体力。',
			huaxin:'华歆',
			wanggui:'望归',
			wanggui_info:'每回合限触发一次，当你造成或受到伤害后，若你：仅明置了此武将牌，则你可对与你势力不同的一名角色造成1点伤害；武将牌均明置，则你可令与你势力相同的角色各摸一张牌。',
			spwanggui:'望归',
			spwanggui_info:'①当你受到伤害后，你可以摸一张牌，或和一名势力相同的其他角色各摸一张牌；②每回合限一次，当你造成伤害后，你可以对一名与你势力不同的角色造成1点伤害。',
			xibing:'息兵',
			xibing_info:'当一名其他角色在其出牌阶段内使用黑色【杀】或黑色普通锦囊牌指定唯一角色为目标后，你可令该角色将手牌摸至当前体力值(至多摸五张)且本回合不能再使用手牌。',
			xibing_info_guozhan:'当一名其他角色在其出牌阶段内使用第一张黑色【杀】或黑色普通锦囊牌指定唯一角色为目标后，你可令该角色将手牌摸至当前体力(至多摸五张)值且本回合不能再使用手牌。若你与其均明置了所有武将牌，则你可以暗置你与其各一张武将牌且本回合不能再明置此武将牌。',
			luyusheng:'陆郁生',
			zhente:'贞特',
			zhente2:'贞特',
			zhente_info:'每回合限一次，当你成为其他角色使用基本牌或普通锦囊牌的目标后，你可令使用者选择一项：1.本回合不能再使用与此牌颜色相同的牌；2.此牌对你无效。 ',
			zhente_info_guozhan:'每回合限一次，当你成为其他角色使用黑色基本牌或黑色普通锦囊牌的目标后，你可令使用者选择一项：1.本回合不能再使用黑色牌；2.此牌对你无效。 ',
			zhiwei:'至微',
			zhiwei2:'至微',
			zhiwei_info:'游戏开始时/你的回合开始时，若场上没有因此法被选择过的角色存活，则你选择一名其他角色。该角色造成伤害后，你摸一张牌，该角色受到伤害后，你随机弃置一张手牌。你弃牌阶段弃置的牌均被该角色获得。',
			zhiwei_info_guozhan:'你明置此武将牌时，选择一名其他角色。该角色造成伤害后，你摸一张牌，该角色受到伤害后，你随机弃置一张手牌。你弃牌阶段弃置的牌均被该角色获得。该角色死亡时，若你的两个武将牌均明置，你暗置此武将牌。 ',
			re_zoushi:'邹氏',
			rehuoshui:'祸水',
			rehuoshui_info:'准备阶段，你可以选择至多X名角色（X为你已损失的体力值且至少为1）。你令这些角色中第一名角色的非锁定技失效直到回合结束；第二名角色交给你一张手牌；第三名及之后角色弃置装备区内的所有牌。',
			reqingcheng:'倾城',
			reqingcheng_info:'出牌阶段限一次，你可以与一名手牌数小于你的男性角色交换手牌。',
			re_panshu:'潘淑',
			zhiren:'织纴',
			zhiren_info:'当你于你的回合内使用第一张非转化牌时，你可依次执行以下选项中的前X项：①卜算X。②可弃置场上的一张装备牌和延时锦囊牌。③回复1点体力。④摸三张牌。（X为此牌的名称的字数）',
			yaner:'燕尔',
			yaner_info:'每回合限一次。当有其他角色于其出牌阶段内失去手牌后，若其没有手牌，则你可以与其各摸两张牌。若其以此法摸得的两张牌类型相同，则其回复1点体力。若你以此法摸得的两张牌类型相同，则你将〖织纴〗中的“你的回合内”改为“一回合内”直至你下回合开始。',
			caoanmin:'曹安民',
			xianwei:'险卫',
			xianwei_info:'锁定技，准备阶段，你废除一个装备栏并摸X张牌（X为你未废除的装备栏数），然后你可以令一名其他角色对其自己使用一张牌堆中的一张与此装备栏副类别相同的装备牌（没有可使用的牌则改为摸一张牌）。当你废除所有装备栏后，你加2点体力上限，然后你与所有其他角色视为在彼此的攻击范围内。',
			zhanghu:'张虎',
			cuijian:'摧坚',
			cuijian_info:'出牌阶段限一次，你可以选择一名有手牌的其他角色。若其手牌中有【闪】，则其将所有【闪】和防具牌交给你，然后你交给其等量的牌。',
			zhtongyuan:'同援',
			zhtongyuan_info:'锁定技。①当你使用红色锦囊牌后，你于〖摧坚〗后增加“若其手牌中没有【闪】，则你摸两张牌”；②当你使用或打出红色基本牌后，你删除〖摧坚〗中的“，然后你交给其等量的牌”。③当你使用红色的普通锦囊牌/基本牌时，若你已发动过〖摧坚①〗和〖摧坚②〗，则此牌不可被响应/可额外增加一个目标。',
			dufuren:'杜夫人',
			yise:'异色',
			yise_info:'其他角色获得你的牌后，若这些牌中：有红色牌，你可令其回复1点体力；有黑色牌，其下次受到【杀】造成的伤害时，此伤害+1。',
			shunshi:'顺世',
			shunshi_info:'准备阶段开始时，或当你受到伤害后，你可将一张牌交给一名不为伤害来源的其他角色并获得如下效果直到你的回合结束：摸牌阶段的额定摸牌数+1，使用【杀】的次数上限+1，手牌上限+1。',
			lvlingqi:'吕玲绮',
			guowu:'帼舞',
			guowu_info:'出牌阶段开始时，你可以展示全部手牌，根据你展示的类型数，你获得对应效果：至少一类，从弃牌堆获得一张【杀】；至少两类，此阶段使用牌无距离限制；至少三类，此阶段使用【杀】或普通锦囊牌可以多指定两个目标。',
			guowu_info_guozhan:'出牌阶段开始时，你可以展示全部手牌，根据你展示的类型数，你获得对应效果：至少一类，从弃牌堆获得一张【杀】；至少两类，此阶段使用牌无距离限制；至少三类，此阶段使用【杀】或普通锦囊牌可以多指定两个目标（限一次）。',
			zhuangrong:'妆戎',
			zhuangrong_info:'觉醒技，一名角色的回合结束时，若你的体力值或手牌数为1，你减1点体力上限并回复体力至上限，将手牌摸至体力上限，然后获得〖神威〗和〖无双〗。',
			llqshenwei:'神威',
			llqshenwei_info:'锁定技，摸牌阶段开始时，你令额定摸牌数+2；你的手牌上限+2。',
			rexingluan:'兴乱',
			rexingluan_info:'出牌阶段限一次，当你使用的仅指定一个目标的牌结算完成后，你可以获得场上一张与此牌点数相同的牌，或获得牌堆中随机一张点数与此牌相同的牌。',
			xinxingluan:'兴乱',
			xinxingluan_info:'出牌阶段限一次。当你使用牌结算结束后，你可选择一项：①观看牌堆中的两张点数为6的牌并获得其中一张（没有则改为摸六张牌）；②令一名其他角色弃置一张点数为6的牌或交给你一张牌；③获得场上的一张点数为6的牌。',
			zhouyi:'周夷',
			zhukou:'逐寇',
			zhukou_info:'①当你于一名角色的出牌阶段第一次造成伤害后，你可以摸X张牌（X为本回合你已使用的牌数）。②你的结束阶段，若你本回合没有造成伤害，你可以对两名其他角色各造成1点伤害。',
			mengqing:'氓情',
			mengqing_info:'觉醒技。准备阶段，若场上已受伤的角色数大于你的体力值，你加3点体力上限并回复3点体力，失去〖逐寇〗，获得〖玉殒〗。',
			yuyun:'玉殒',
			yuyun_info:'锁定技，出牌阶段开始时，你失去1点体力或体力上限（不能减至1以下），然后选择X+1项（X为你已损失的体力值）：①摸两张牌；②对一名其他角色造成1点伤害，然后本回合对其使用【杀】无距离和次数限制；③本回合的手牌上限视为无限；④获得一名其他角色区域内的一张牌；⑤令一名其他角色将手牌摸至体力上限（最多摸至5）。',
			re_nanhualaoxian:'南华老仙',
			gongxiu:'共修',
			gongxiu_info:'结束阶段，若你本回合内发动过〖经合〗，则你选择一项：①令所有本回合内成为过〖经合〗目标的角色各摸一张牌；②令所有本回合内未成为过〖经合〗目标的角色各弃置一张手牌。',
			jinghe:'经合',
			jinghe_info:'出牌阶段限一次，你可以展示四张牌名各不相同的牌并选择等量的角色。系统从“写满技能的天书”中随机选择等量的技能，然后这些角色依次选择获得其中的一个。',
			nhyinbing:'阴兵',
			nhyinbing_info:'锁定技，你使用的【杀】造成伤害改为失去体力。其他角色失去体力后，你摸一张牌。',
			nhhuoqi:'活气',
			nhhuoqi_info:'出牌阶段限一次，你可以弃置一张牌，然后令体力值最少的一名角色回复1点体力并摸一张牌。',
			nhguizhu:'鬼助',
			nhguizhu_info:'一名角色进入濒死状态时，你可以摸两张牌（每回合限一次）。',
			nhxianshou:'仙授',
			nhxianshou_info:'出牌阶段限一次，你可以选择一名角色令其摸一张牌。若其未受伤，则多摸一张。',
			nhlundao:'论道',
			nhlundao_info:'当你受到伤害后，若伤害来源比你手牌多，你可以弃置其一张牌；若伤害来源比你手牌少，你摸一张牌。',
			nhguanyue:'观月',
			nhguanyue_info:'结束阶段，你可以观看牌堆顶两张牌，然后获得其中—张，另一张放回牌堆顶。',
			nhyanzheng:'言政',
			nhyanzheng_info:'准备阶段，若你的手牌数大于1，你可以保留一张手牌并弃置其余的牌，然后选择至多等于弃牌数量的角色，对这些角色各造成1点伤害。',
			re_kanze:'阚泽',
			rekuanshi:'宽释',
			rekuanshi_info:'结束阶段，你可以选择一名角色。你获得如下一次性效果直到你下回合开始：当其于一回合内受到第2点伤害后，其回复1点体力。',
			sp_mifangfushiren:'糜芳傅士仁',
			mffengshi:'锋势',
			mffengshi_info:'当你使用牌指定唯一目标后，或成为其他角色使用牌的唯一目标后，若此牌使用者的手牌数大于此牌目标的手牌数，则此牌的使用者可令你弃置自己和对方的各一张牌，并令此牌的伤害值+1。',
			tongyuan:'童渊',
			chaofeng:'朝凤',
			chaofeng_info:'出牌阶段限一次。当你造成伤害时，你可以弃置一张牌，然后摸一张牌。若此伤害的渠道为牌且你弃置的牌：与此牌颜色相同，则你改为摸两张牌；与此牌类型相同，则此伤害+1。',
			chuanshu:'传术',
			chuanshu_info:'限定技。准备阶段，若你已受伤；或当你死亡时，你可令一名其他角色获得〖朝凤〗。然后你获得〖龙胆〗、〖从谏〗和〖穿云〗。',
			chuanyun:'穿云',
			chuanyun_info:'当你使用【杀】指定目标后，你可令目标角色随机弃置其装备区内的一张牌。',
			liuyong:'刘永',
			zhuning:'诛佞',
			zhuning_info:'出牌阶段限一次。你可将任意张牌交给一名其他角色（称为“隙”），然后可视为使用一张具有伤害标签的基本牌/锦囊牌（不计入次数限制）。若你以此法使用的牌未造成伤害，则你将〖诛佞〗于本回合内改为“限两次”。',
			fengxiang:'封乡',
			fengxiang_info:'锁定技。①当你受到伤害后，若场上：存在“隙”唯一最多的角色，则其回复1点体力；不存在，则你摸一张牌。②当有角色的手牌移动后，若场上“隙”最多的角色因此发生变化，则你摸一张牌。',
			fengxiang_tag:'隙',
			zhangning:'张宁',
			tianze:'天则',
			tianze_info:'①每回合限触发一次。其他角色于其出牌阶段内使用的黑色手牌结算结束后，你可以弃置一张黑色牌，并对其造成1点伤害。②其他角色的判定生效后，若结果为黑色，则你摸一张牌。',
			difa:'地法',
			difa_info:'每回合限一次。当你于回合内因摸牌而获得红色牌时，你可以弃置之。然后你选择一个锦囊牌的牌名，并从牌堆中获得一张此牌名的牌。',
			re_xunchen:'荀谌',
			refenglve:'锋略',
			refenglve_info:'出牌阶段限一次，你可以和一名其他角色进行拼点。若你赢，其将区域内的两张牌交给你；若平局，则你令此技能于本阶段内的发动次数上限+1；若你输，其获得你的拼点牌。',
			anyong:'暗涌',
			anyong_info:'当一名角色于其回合内第一次对其他角色造成伤害后，若伤害值为1，则你可弃置一张牌，并对受伤角色造成1点伤害。',
			wanniangongzhu:'万年公主',
			zhenge:'枕戈',
			zhenge_info:'准备阶段，你可以选择一名角色。该角色本局游戏的攻击范围+1（至多+5）。然后若所有其他角色都在该角色的攻击范围内，则你可以令其视为对另一名角色使用一张【杀】。',
			xinghan:'兴汉',
			xinghan_info:'锁定技，每回合的第一张【杀】造成伤害后，若此【杀】的使用者成为过〖枕戈〗的目标，则你摸一张牌。若你的手牌数不是全场唯一最多的，则改为摸X张牌（X为该角色的攻击范围且最多为5）。',
			xinping:'辛评',
			fuyuan:'辅袁',
			fuyuan_info:'当你于回合外使用或打出牌时，若当前回合角色的手牌数：不小于你，你可摸一张牌；小于你，你可令其摸一张牌。',
			zhongjie:'忠节',
			zhongjie_info:'当你死亡时，你可令一名其他角色加1点体力上限并回复1点体力，然后摸一张牌。',
			hanmeng:'韩猛',
			jieliang:'截粮',
			jieliang_info:'其他角色的摸牌阶段开始时，你可弃置一张牌，令其本阶段的摸牌数和本回合的手牌上限-1。然后当其于本回合的弃牌阶段内因弃置而失去牌后，你可获得其中的一张。',
			quanjiu:'劝酒',
			quanjiu_info:'锁定技。①你手牌区中的【酒】的牌名视为【杀】。②你使用对应的实体牌为一张【酒】的非转化【杀】不计入次数限制。',
			caojinyu:'曹金玉',
			yuqi:'隅泣',
			yuqi_info:'每回合限两次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>0</span>，则你可以观看牌堆顶的<span class=firetext>3</span>张牌。你将其中至多<span class=greentext>1</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>1</span>张牌，并将其余牌以原顺序放回牌堆顶。（所有具有颜色的数字至多为5）',
			shanshen:'善身',
			shanshen_info:'当有角色死亡时，你可令你的〖隅泣〗中的一个具有颜色的数字+2。然后若你未对该角色造成过伤害，则你回复1点体力。',
			xianjing:'娴静',
			xianjing_info:'准备阶段，你可令你的〖隅泣〗中的一个具有颜色的数字+1。若你的体力值等于体力上限，则你可以重复一次此流程。',
			re_chendeng:'陈登',
			refuyuan:'扶援',
			refuyuan_info:'一名角色成为【杀】的目标后，若其本回合内没有成为过其他红色牌的目标，则你可以令其摸一张牌。',
			reyingshui:'营说',
			reyingshui_info:'出牌阶段限一次，你可将一张牌交给攻击范围内的一名其他角色，然后其选择一项：①交给你至少两张装备牌。②受到1点伤害。',
			rewangzu:'望族',
			rewangzu_info:'每回合限一次。当你受到其他角色造成的伤害时，你可随机弃置一张手牌，令此伤害-1。若你所在阵营的存活角色数是全场最多的，则你可以自行选择弃置的牌。',
			wangtao:'王桃',
			wangyue:'王悦',
			huguan:'护关',
			huguan_info:'一名角色于出牌阶段内使用第一张牌时，若此牌为红色，则你可以声明一种花色。该花色的牌不计入其本回合的手牌上限。',
			yaopei:'揺佩',
			yaopei_info:'其他角色的弃牌阶段结束时，若其于本阶段内弃置过的牌的集合A不为空集，则你可以弃置一张与A中的牌花色均不相同的牌。然后你选择一项：①其摸两张牌，你回复1点体力。②其回复1点体力，你摸两张牌。',
			mingluan:'鸣鸾',
			mingluan_info:'其他角色的结束阶段开始时，若有角色于本回合内回复过体力，则你可以弃置一张牌，然后摸X张牌（X为当前角色的手牌数，且至多摸至5张）。',
			re_pangdegong:'庞德公',
			heqia:'和洽',
			heqia_info:'出牌阶段开始时，你可选择一项：①将任意张牌交给一名其他角色。②令一名有手牌的其他角色交给你任意张牌。然后以此法获得牌的角色可以视为使用一张基本牌，且当其声明使用此牌时，可以为此牌增加至至多X个目标（X为以此法移动的牌数）。',
			yinyi:'隐逸',
			yinyi_info:'锁定技。每回合限一次，当你受到非属性伤害时，若你的手牌数和体力值与伤害来源均不相同，则你防止此伤害。',
			re_sunyi:'孙翊',
			syjiqiao:'激峭',
			syjiqiao_info:'出牌阶段开始时，你可将牌堆顶的X张牌置于你的武将牌上（X为你的体力上限）。当你于此出牌阶段内使用的牌结算结束后，你可以获得其中的一张牌，然后若剩余牌中红色牌和黑色牌的数量：不相等，你失去1点体力；相等，你回复1点体力。出牌阶段结束时，你将这些牌置入弃牌堆。',
			syxiongyi:'凶疑',
			syxiongyi_info:'限定技。当你处于濒死状态时，若剩余武将牌堆中：有“徐氏”，则你将体力值回复至3点，并将此武将牌替换为“徐氏”；没有“徐氏”，则你将体力值回复至1点并获得〖魂姿〗。',
			zhaoyan:'赵嫣',
			jinhui:'锦绘',
			jinhui_info:'出牌阶段限一次，你可以随机展示牌堆中的三张不具有“伤害”标签且使用目标范围为“自己”或“一名角色”的牌，然后选择一名其他角色。该角色选择并按如下“锦绘”规则使用其中一张，然后你可以按如下“锦绘”规则使用剩余的任意张牌：若此牌的使用目标为“自己”，则对自己使用该牌，否则对对方使用该牌（无距离限制且不计入次数限制）。',
			qingman:'轻幔',
			qingman_info:'锁定技。一名角色的回合结束时，你将手牌摸至X张（X为其装备区中空栏的数量）。',
			re_zhangbao:'张宝',
			xinzhoufu:'咒缚',
			xinzhoufu2:'咒缚',
			xinzhoufu_info:'①出牌阶段限一次，你可以将一张手牌置于一名其他角色的武将牌上并称为“咒”。②一名有“咒”的角色判定时，你令其以“咒”作为判定牌。',
			xinyingbing:'影兵',
			xinyingbing_info:'锁定技。每回合每名角色限一次，当你使用牌指定有“咒”的角色为目标后，你摸两张牌。',
			re_miheng:'祢衡',
			rekuangcai:'狂才',
			rekuangcai_info:'锁定技。①你于回合内使用牌无距离和次数限制。②弃牌阶段开始时，若你本回合内：未使用过牌，则你本局游戏的手牌上限+1；使用过牌但未造成过伤害，则你本局游戏的手牌上限-1。③结束阶段开始时，你摸X张牌（X为你本回合内造成的伤害且至多为5）。',
			reshejian:'舌箭',
			reshejian_info:'当你成为其他角色使用牌的唯一目标后，你可以弃置至少两张手牌。若如此做，你选择一项：⒈弃置其等量的牌。⒉对其造成1点伤害。',
			fengxi:'冯熙',
			yusui:'玉碎',
			yusui_info:'当你成为其他角色使用黑色牌的目标后，你可以失去1点体力，然后选择一项：⒈令其将手牌数弃置至与你相同；⒉令其失去Y点体力（Y为其的体力值减去你的体力值，不为正时不可选择）',
			boyan:'驳言',
			boyan_info:'出牌阶段限一次，你可选择一名其他角色。其将手牌摸至体力上限（至多摸至五张），然后其本回合不能使用或打出手牌。',
			re_dengzhi:'邓芝',
			jianliang:'简亮',
			jianliang_info:'摸牌阶段开始时，若你的手牌数不为全场最多，则你可以令至多两名角色各摸一张牌。',
			weimeng:'危盟',
			weimeng_info:'出牌阶段限一次，你可以获得一名其他角色的至多X张手牌，然后交给其等量的牌（X为你的体力值）。若你给出的牌点数之和：大于获得的牌，则你摸一张牌；小于获得的牌，弃置该角色区域内的一张牌。',
			haomeng:'郝萌',
			xiongmang:'雄莽',
			xiongmang_info:'你可将任意张花色各不相同的手牌当做目标数上限为X的【杀】使用（X为此【杀】对应的实体牌数）。此【杀】使用结算结束后，若你未造成过渠道为此牌的伤害，则你减1点体力上限。',
			yanfuren:'严夫人',
			channi:'谗逆',
			channi_info:'出牌阶段限一次。你可将任意张手牌交给一名其他角色，然后其可以将等量的手牌当做【决斗】使用。若其因此【决斗】造成了伤害，则其摸X张牌（X为此【决斗】对应的实体牌数）。若其因此【决斗】受到过伤害，则你弃置所有手牌。',
			nifu:'匿伏',
			nifu_info:'锁定技。一名角色的回合结束时，你将手牌摸至三张。',
			wufan:'吴范',
			tianyun:'天运',
			tianyun_info:'①游戏的第一个回合开始前，你从牌堆中获得手牌区内没有的花色的各一张牌。②一名角色的回合开始时，若其座位号等于游戏轮数，则你可观看牌堆顶的X张牌并以任意顺序置于牌堆顶。若你将所有的牌均置于了牌堆底，则你可以令一名角色摸X张牌，然后失去1点体力。（X为你手牌中包含的花色数）',
			wfyuyan:'预言',
			wfyuyan_info:'一轮游戏开始时，你选择一名角色（对其他角色不可见）：当第一次有角色于本轮内进入濒死状态时，若其是你选择的角色，则你获得〖奋音〗直到你的回合结束；当第一次有角色于本轮内造成伤害后，若其是你选择的角色，则你摸两张牌。',
			re_fengfangnv:'冯妤',
			tiqi:'涕泣',
			tiqi_info:'其他角色的摸牌阶段结束时/被跳过时，若其于本阶段内因摸牌而获得的牌数X不等于2，则你可以摸|X-2|张牌，并可令其本回合的手牌上限±|X-2|。',
			baoshu:'宝梳',
			baoshu_info:'①准备阶段，你可选择Y名角色，这些角色重置武将牌并获得(X-Y+1)个“梳”（X为你的体力上限，Y∈[1, X]）。②一名角色的摸牌阶段开始时，若其有“梳”，则其本阶段的额定摸牌数+Z且移去Z个“梳”（Z为其“梳”的数量）。',
			mamidi:'马日磾',
			bingjie:'秉节',
			bingjie_info:'出牌阶段开始时，你可减1点体力上限，然后当你于本阶段内使用【杀】或普通锦囊牌指定其他角色为目标后，其弃置一张牌。',
			zhengding:'正订',
			zhengding_info:'锁定技。当你于回合外使用或打出牌响应其他角色使用的牌时，若这两张牌花色相同，则你加1点体力上限。',
			licaiwei:'李采薇',
			yijiao:'异教',
			yijiao_info:'出牌阶段限一次，你可以选择一名没有“异”标记的其他角色并声明一个整数X（X∈[1,4]），该角色获得10X个“异”标记。有“异”标记的角色的结束阶段，其移去“异”标记，且若其本回合使用牌的点数之和：1.小于“异”标记数，其随机弃置一张手牌；2.等于“异”标记数，该角色本回合结束后进行一个额外的回合；3.大于“异”标记数，你摸两张牌。',
			qibie:'泣别',
			qibie_info:'一名角色死亡后，若你有手牌且这些手牌均可被弃置，则你可以弃置所有手牌，然后回复1点体力并摸X+1张牌（X为你弃置的牌数）。',
			dc_jiben:'吉本',
			xunli:'寻疠',
			xunli_info:'锁定技。①当有黑色牌因弃置而进入弃牌堆后，若X大于0，则你将其中的X张牌置于武将牌上作为“疠”（X=min(这些牌的数量，9-Y)，Y=你的“疠”数）。②出牌阶段开始时，你可以用任意张黑色手牌交换等量的“疠”。',
			zhishi:'指誓',
			zhishi_info:'结束阶段，你可选择一名角色。当该角色于你的下回合开始前{成为【杀】的目标后或进入濒死状态时}，你可移去任意张“疠”，然后其摸等量的牌。',
			lieyi:'烈医',
			lieyi_info:'出牌阶段限一次。你可以展示所有“疠”并选择一名其他角色，对其使用其中的一张可对其使用的牌（无距离和次数限制）并重复此流程，并将其余的牌置于弃牌堆。然后若其存活且未于此流程中因受到伤害而进入过濒死状态，则你失去1点体力。',
			dc_luotong:'骆统',
			renzheng:'仁政',
			renzheng_info:'锁定技。当有伤害被防止时，或伤害值发生过减少的伤害事件结算结束后，你摸两张牌。',
			jinjian:'进谏',
			jinjian_info:'①当你造成伤害时，你可令此伤害+1，然后你本回合内下一次造成的伤害-1且不触发〖进谏①〗。②当你受到伤害时，你可令此伤害-1。然后你于本回合内下一次受到的伤害+1且不触发〖进谏②〗。',
			dc_zhuling:'朱灵',
			dczhanyi:'战意',
			dczhanyi_info:'出牌阶段开始时，你可以弃置所有基本牌/锦囊牌/装备牌，然后获得另外两种类型的牌对应的效果直到回合结束：基本牌、你使用基本牌无距离限制，且伤害值和回复值基数+1；锦囊牌、你使用锦囊牌时摸一张牌，且锦囊牌不计入手牌上限；装备牌，当你使用装备牌时，你可弃置一名其他角色的一张牌。',
			tengyin:'滕胤',
			chenjian:'陈见',
			chenjian_info:'准备阶段，你可展示牌堆顶的3+X张牌（X为你“陈见”标记的数量且至多为2）。然后你可依次执行以下两项中的任意项：⒈弃置一张牌，然后令一名角色获得与你弃置牌花色相同的牌。⒉使用其中剩余的一张牌。若你执行了所有选项，则你获得一枚“陈见”，然后重铸所有手牌。',
			xixiu:'皙秀',
			xixiu_info:'锁定技。①当你成为其他角色使用牌的目标时，若你的装备区内有和此牌花色相同的牌，则你摸一张牌。②若你装备区内的牌数为1，则其他角色不能弃置你装备区内的牌。',
			guanning:'管宁',
			dunshi:'遁世',
			dunshi_info:'每回合限一次。你可以视为使用或打出一张【杀】/【闪】/【桃】/【酒】，然后当前回合角色于本回合内下一次造成伤害时，你选择两项：⒈防止此伤害。系统从技能名中包含“仁/义/礼/智/信”字样的技能中随机选择三个其未拥有的技能，然后你令当前回合角色获得其中一个技能。⒉从〖遁世〗中删除你本次使用或打出的牌并获得一个“席”。⒊减1点体力上限并摸X张牌（X为你的“席”数）。',
			dc_gaolan:'高览',
			xizhen:'袭阵',
			xizhen_info:'出牌阶段开始时，你可选择一名其他角色，视为对其使用【杀】或【决斗】。然后当有角色于本阶段内使用或打出牌响应你时，该角色回复1点体力，你摸一张牌（若其满体力，改为两张）。',
			caomao:'曹髦',
			qianlong:'潜龙',
			qianlong_info:'当你受到伤害后，你可以展示牌堆顶的三张牌并获得其中的至多X张牌（X为你已损失的体力值），然后将剩余的牌置于牌堆底。',
			fensi:'忿肆',
			fensi_info:'锁定技。准备阶段，你须选择一名体力值不小于你的角色并对其造成1点伤害，然后若你选择的角色不为你自己，则其视为对你使用一张【杀】。',
			juetao:'决讨',
			juetao_info:'限定技。出牌阶段开始时，若你的体力值为1，则你可以选择一名其他角色。你展示牌堆底的一张牌，若此牌能被你使用，则你使用此牌并重复此流程直到出现不可使用的牌或其死亡（你与其以外的角色不是此牌的合法目标）。',
			zhushi:'助势',
			zhushi_info:'主公技。每回合限一次，其他魏势力角色于回合内回复体力时，其可令你摸一张牌。',
			laiyinger:'来莺儿',
			xiaowu:'绡舞',
			xiaowu_info:'出牌阶段限一次，你可以选择任意名座位连续且包含你的上家/下家的角色。这些角色依次选择一项：⒈令你摸一张牌；⒉其摸一张牌。然后若选择选项一的角色数大于选项二的角色数，则你获得一枚“沙”；若选择选项二的角色数大于选项一的角色数，则你对这次角色依次造成1点伤害。',
			huaping:'化萍',
			huaping_info:'限定技。①一名其他角色死亡时，你可获得其当前拥有的所有不带有「Charlotte」标签的技能，然后你失去〖绡舞〗，移去所有“沙”并摸等量的牌。②当你死亡时，你可令一名其他角色获得〖沙舞〗和你的所有“沙”。',
			shawu:'沙舞',
			shawu_info:'当你使用【杀】指定目标后，你可选择一项：⒈弃置两张手牌；⒉移去一枚“沙”并摸两张牌。然后你对目标角色造成1点伤害。',
			dc_huangchengyan:'黄承彦',
			dcjiezhen:'解阵',
			dcjiezhen_info:'出牌阶段限一次，你可选择一名其他角色。该角色获得〖八阵〗，且其所有不为{锁定技、限定技、觉醒技、主公技、带有Charlotte标签}的技能失效。你的下回合开始时，或其因〖八卦阵〗发起的判定结算结束后，你令其恢复其以此法失效的所有技能并失去以此法获得的〖八阵〗，然后获得其区域内的一张牌。',
			dczecai:'择才',
			dczecai_info:'限定技。一轮游戏开始时，若游戏轮数大于1，则你可令一名其他角色获得〖集智〗直到下一轮游戏开始；若其是上一轮内使用过锦囊牌数量唯一最多的角色，则其获得一个额外的回合。',
			dcyinshi:'隐士',
			dcyinshi_info:'锁定技。①每回合限一次，当你受到伤害时，若此伤害的渠道不为有颜色的牌，则你防止此伤害。②当有因〖八卦阵〗发起的判定的判定牌生效时，你获得此判定牌。',
			tenggongzhu:'滕公主',
			xingchong:'幸宠',
			xingchong_info:'一轮游戏开始时，你可声明两个自然数X和Y，且(X+Y)≤min(5, 你的体力上限)。你摸X张牌并展示Y张手牌。若如此做，当你于本轮内失去一张以此法展示的牌后，你摸两张牌。',
			liunian:'流年',
			liunian_info:'锁定技。牌堆第一次洗牌后，你于回合结束时加1点体力上限；牌堆第二次洗牌后，你于本回合结束时回复1点体力，且本局游戏内的手牌上限+10。',
			zhangyao:'张媱',
			yuanyu:"怨语",
			yuanyu_info:"出牌阶段限一次。你可以摸一张牌，然后选择一张手牌和一名其他角色。该角色获得如下效果直到你发动〖夕颜〗：{当该角色造成1点伤害后，其须将一张手牌作为“怨”置于你的武将牌上}。然后你将你选择的手牌作为“怨”置于你的武将牌上。",
			xiyan:"夕颜",
			xiyan_info:"锁定技。当有牌作为“怨”移动到你的武将牌上后，若“怨”中的花色数达到4种，则你获得所有“怨”。然后若当前回合角色：是你，你本回合手牌上限+4且使用牌无次数限制；不是你，当前回合角色本回合手牌上限-4且不能使用基本牌。",
			yanrou:'阎柔',
			choutao:'仇讨',
			choutao_info:'当你使用【杀】时，或成为【杀】的目标后，你可以弃置此【杀】使用者的一张牌，令此【杀】不可被响应。若你是此【杀】的使用者，则你令此【杀】不计入次数限制。',
			xiangshu:'襄戍',
			xiangshu_info:'限定技。结束阶段开始时，若你本回合内造成过伤害，则你可以选择一名已受伤的角色。该角色回复X点体力并摸X张牌（X为你本回合内造成的伤害值总和且至多为5）。',
			caimaozhangyun:'蔡瑁张允',
			lianzhou:'连舟',
			lianzhou_info:'锁定技。准备阶段，你横置你的武将牌。然后你可横置任意名体力值等于你的角色。',
			jinglan:'惊澜',
			jinglan_info:'锁定技。当你造成伤害后，若你的手牌数：大于体力值，你弃置三张手牌；等于体力值，你弃置一张手牌并回复1点体力；小于体力值，你受到1点无来源火焰伤害并摸四张牌。',
			dc_huangzu:'黄祖',
			dcjinggong:'精弓',
			dcjinggong_info:'你可以将一张装备牌当做无距离限制的【杀】使用。当你声明使用此【杀】时，你将此杀的伤害值基数改为X（X为你至此【杀】第一个目标角色的距离且至多为3）。',
			dcxiaojuan:'骁隽',
			dcxiaojuan_info:'当你使用牌指定其他角色为唯一目标后，你可以弃置其一半的手牌（向下取整）。若这些牌中有与你使用牌花色相同的牌，则你弃置一半的手牌（向下取整）。',
			dc_yanghu:'羊祜',
			dcdeshao:'德劭',
			dcdeshao_info:'每回合限两次。当你成为其他角色使用的黑色牌的目标后，你可以摸一张牌，然后若其手牌数不小于你，则你弃置其一张牌。',
			dcmingfa:'明伐',
			dcmingfa_info:'①出牌阶段限一次。当你使用【杀】或普通锦囊牌结算结束后，若你的武将牌上没有“明伐”牌，则你可以将此牌作为“明伐”牌置于武将牌上并选择一名其他角色，记录该角色和此牌的名称。②一名角色的回合结束时，若其是你〖明伐①〗记录的角色，则你视为对其依次使用X张〖明伐①〗记录的牌，然后移去“明伐”牌（X为其手牌数且至多为5）。③一名角色死亡时，若其是你〖明伐①〗记录的角色，则你移去“移去”牌。',
			
			sp_whlw:"文和乱武",
			sp_zlzy:"逐鹿中原",
			sp_longzhou:"同舟共济",
			sp_zizouqi:"自走棋",
			sp_sbfm:'上兵伐谋',
			sp_shengun:'三国奇人传',
			sp_baigei:'荟萃·无双上将',
			sp_guandu:'官渡之战',
			sp_huangjin:'列传·黄巾之乱',
			sp_fadong:'列传·诸侯伐董',
			sp_xuzhou:'列传·徐州风云',
			sp_caizijiaren:'荟萃·才子佳人',
			sp_qihuan:'戚宦之争',
			sp_zhongyuan:'列传·中原狼烟',
			sp_binglin:'兵临城下',
			sp_xiaohu:'列传·虓虎悲歌',
			sp_yinyu:'隐玉包',
			sp_zhilan:'荟萃·芝兰玉树',
			sp_zongheng:'荟萃·纵横捭阖',
			sp_fenghuo:'烽火连天',
			sp_guixin:'荟萃·天下归心',
			sp_decade:'其他新服武将',
		},
	};
});
