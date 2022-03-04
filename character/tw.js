'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'tw',
		connect:true,
		characterSort:{
			tw:{
				tw_mobile:['tw_beimihu','nashime','tw_gexuan','tw_dongzhao','jiachong','duosidawang','wuban','yuejiu','tw_fuwan','tw_yujin','tw_zhaoxiang','tw_hucheer','tw_hejin','tw_mayunlu','tw_re_caohong'],
				tw_yijiang:['tw_caoang','tw_caohong','tw_zumao','tw_dingfeng','tw_maliang','tw_xiahouba'],
				tw_english:['kaisa'],
			},
		},
		character:{
			tw_re_caohong:['male','wei',4,['twyuanhu','twjuezhu']],
			tw_mayunlu:['female','shu',4,['mashu','twfengpo']],
			tw_hejin:['male','qun',4,['twmouzhu','twyanhuo']],
			tw_hucheer:['male','qun',4,['twshenxing','twdaoji']],
			tw_yujin:['male','qun',4,['xinzhenjun']],
			tw_fuwan:['male','qun',4,['twmoukui']],
			tw_zhaoxiang:['female','shu',4,['refanghun','twfuhan','twqueshi']],
			yuejiu:['male','qun',4,['cuijin']],
			wuban:['male','shu',4,['jintao']],
			duosidawang:['male','qun','4/5',['equan','manji']],
			jiachong:['male','qun',3,['beini','dingfa']],
			tw_dongzhao:['male','wei',3,['twmiaolve','twyingjia']],
			tw_gexuan:['male','qun',3,['twdanfa','twlingbao','twsidao']],
			tw_beimihu:['female','qun',3,['zongkui','guju','baijia','bingzhao'],['zhu']],
			nashime:['male','qun',3,['chijie','waishi','renshe']],
			tw_xiahouba:['male','shu',4,['twyanqin','twbaobian']],
			tw_zumao:['male','wu',4,['twtijin']],
			tw_caoang:['male','wei',4,['twxiaolian']],
			tw_dingfeng:['male','wu',4,['twqijia','twzhuchen']],
			tw_caohong:['male','wei',4,['twhuzhu','twliancai']],
			tw_maliang:['male','shu',3,['twrangyi','twbaimei']],
			kaisa:["male","western",4,["zhengfu"]],
		},
		characterIntro:{
			nashime:'难升米（なしめ，或なんしょうまい）是倭国大夫。景初二年六月，受女王卑弥呼之命，与都市牛利出使魏国，被魏国拜为率善中郎将。',
			jiachong:'贾充（217年—282年），字公闾，平阳襄陵（今山西襄汾）人，三国曹魏至西晋时期大臣，曹魏豫州刺史贾逵之子。西晋王朝的开国元勋。出身平阳贾氏。曾参与镇压淮南二叛和弑杀魏帝曹髦，因此深得司马氏信任，其女儿贾褒（一名荃）及贾南风分别嫁予司马炎弟司马攸及次子司马衷，与司马氏结为姻亲，地位显赫。晋朝建立后，转任车骑将军、散骑常侍、尚书仆射，后升任司空、太尉等要职。更封鲁郡公。咸宁末，为使持节、假黄钺、大都督征讨吴国。吴国平定后，增邑八千户。太康三年（282年），贾充去世。西晋朝廷追赠他为太宰，礼官议谥曰荒，司马炎不采纳，改谥为武。有集五卷。',
			duosidawang:'朵思大王是《三国演义》中人物，南蛮秃龙洞的元帅，孟获弟弟孟优的朋友，据说是南蛮第一智者。',
			wuban:'吴班，字元雄，生卒年不详，兖州陈留郡（治今河南省开封市）人。三国时期蜀汉将领。为领军，随刘备参加伐吴之战，后又随蜀汉丞相诸葛亮参加北伐曹魏的战争，并于公元231年（建兴九年）的北伐中大破司马懿。官至骠骑将军，封绵竹侯。吴班以豪爽侠义著称于当时，又因族妹吴氏是蜀汉穆皇后，在蜀汉将领中有较高的地位。',
			yuejiu:'乐就（？－197），在袁术为攻徐州而大兴七军之际，以督战官之身份担任联络之役。但是，袁术军不幸战败，其也在寿春被曹操军逮捕并遭到斩首。',
		},
		card:{
			dz_mantianguohai:{
				fullskin:true,
				type:'trick',
				enable:true,
				derivation:'tw_dongzhao',
				global:['dz_mantianguohai'],
				selectTarget:[1,2],
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('hej')>0;
				},
				content:function(){
					player.gainPlayerCard(target,'hej',true);
				},
				contentAfter:function(){
					'step 0'
					var evtx=event.getParent();
					event.targets=targets.filter(function(target){
						return target.getHistory('lose',function(evt){
							return evt.getParent(3).name==''&&evt.getParent(4)==evtx;
						})
					});
					if(!event.targets.length||!player.countCards('he')) event.finish();
					'step 1'
					var target=targets.shift();
					event.target=target;
					var next=player.chooseCard('he',true,'交给'+get.translation(target)+'一张牌');
					if(player.hasSkill('twyingjia')&&player.countUsed('dz_mantianguohai')==1) next.set('ai',function(card){
						if(card.name=='dz_mantianguohai') return -10;
						return -get.value(card,_status.event.getParent().target);
					});
					'step 2'
					if(result.bool){
						target.gain(result.cards,player,'giveAuto');
					}
					'step 3'
					if(targets.length&&player.countCards('h')>0) event.goto(1);
				},
				ai:{
					order:6,
					tag:{
						lose:1,
						loseCard:1,
					},
					result:{
						target:-0.1,
					},
				},
			},
			gx_lingbaoxianhu:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				derivation:'tw_gexuan',
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:['gx_lingbaoxianhu']
			},
			gx_taijifuchen:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				derivation:'tw_gexuan',
				distance:{attackFrom:-4},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:['gx_taijifuchen']
			},
			gx_chongyingshenfu:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				derivation:'tw_gexuan',
				ai:{
					basic:{
						equipValue:7,
					}
				},
				skills:['gx_chongyingshenfu'],
				loseDelay:false,
			},
			meiyingqiang:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				cardimage:'yinyueqiang',
				derivation:'tw_zhaoxiang',
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:['meiyingqiang'],
			},
		},
		characterFilter:{
			nashime:function(mode){
				return mode!='guozhan';
			},
			tw_xiahouba:function(mode){
				return mode!='guozhan';
			},
		},
		skill:{
			twyuanhu:{
				audio:'yuanhu',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasCard({type:'equip'},'eh');
				},
				filterCard:{type:'equip'},
				filterTarget:function(card,player,target){
					var card=ui.selected.cards[0];
					return target.isEmpty(get.subtype(card));
				},
				discard:false,
				lose:false,
				prepare:'give',
				position:'he',
				check:function(card){
					if(get.position(card)=='h') return 9-get.value(card);
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					target.equip(cards[0]);
					'step 1'
					event.goto(3);
					switch(get.subtype(cards[0])){
						case 'equip1':
							if(game.hasPlayer(function(current){
								return current!=target&&get.distance(target,current)==1&&current.countCards('hej')>0;
							})){
								player.chooseTarget(true,'弃置一名距离'+get.translation(target)+'为1的角色区域内的一张牌',function(card,player,target){
									var current=_status.event.current;
									return current!=target&&get.distance(current,target)==1&&current.countCards('hej')>0;
								}).set('current',target).set('ai',function(target){
									var player=_status.event.player;
									return get.effect(target,{name:'guohe_copy'},player,player);
								});
								event.goto(2);
							}
							break;
						case 'equip2':
							target.draw();
							break;
						case 'equip3': case 'equip4': case 'equip6':
							target.recover();
							break;
					}
					'step 2'
					var target=result.targets[0];
					player.line(target);
					player.discardPlayerCard(target,true,'hej');
					'step 3'
					if(target.hp<=player.hp||target.countCards('h')<=player.countCards('h')){
						player.draw();
						player.addTempSkill('twyuanhu_end');
					}
				},
				ai:{
					order:10,
					result:{
						player:function(player,target){
							if(get.attitude(player,target)==0) return 0;
							if(!ui.selected.cards.length) return;
							var eff=get.effect(target,ui.selected.cards[0],player,player),sub=get.subtype(ui.selected.cards[0],false);
							if(target==player) eff+=4;
							else{
								var hp=player.hp,hs=player.countCards('h',(card)=>card!=ui.selected.cards[0]);
								var tp=target.hp,ts=target.countCards('h');
								if(sub=='equip2') ts++;
								if(tp<target.maxHp&&(sub=='equip3'||sub=='equip4')) tp++;
								if(tp<=hp||ts<=hs) eff+=2;
							}
							if(sub=='equip1'){
								var list=game.filterPlayer(function(current){
									return current!=target&&get.distance(target,current)==1&&current.countCards('hej')<0;
								}).map(function(i){
									return get.effect(i,{name:'guohe_copy'},player,player);
								}).sort((a,b)=>b-a);
								if(list.length) eff+=list[0];
							}
							return eff;
						},
						target:function(player,target){
							if(!ui.selected.cards.length) return 0;
							var sub=get.subtype(ui.selected.cards[0],false);
							var eff=get.effect(target,ui.selected.cards[0],player,target);
							if(sub=='equip2') eff+=(get.effect(target,{name:'wuzhong'},target,target)/2);
							if(target.isDamaged()&&(sub=='equip3'||sub=='equip4')) eff+=get.recoverEffect(target,player,player);
							return eff;
						},
					},
				},
				subSkill:{
					end:{
						trigger:{player:'phaseJieshuBegin'},
						direct:true,
						charlotte:true,
						filter:function(event,player){
							return player.hasSkill('twyuanhu')&&player.hasCard({type:'equip'},'eh');
						},
						content:function(){
							'step 0'
							player.chooseCardTarget({
								prompt:get.prompt('twyuanhu'),
								prompt2:'将一张装备牌置入一名角色的装备区内。若此牌为：武器牌，你弃置与其距离为1的另一名角色区域的一张牌；防具牌，其摸一张牌；坐骑牌，其回复1点体力。若其的体力值或手牌数不大于你，则你可摸一张牌。',
								filterCard:lib.skill.twyuanhu.filterCard,
								filterTarget:lib.skill.twyuanhu.filterTarget,
								position:'he',
								ai1:lib.skill.twyuanhu.check,
								ai2:function(target){
									var player=_status.event.player;
									return get.effect(target,'twyuanhu',player,player);
								},
							});
							'step 1'
							if(result.bool){
								result.skill='twyuanhu';
								player.useResult(result,event);
							}
						},
					},
				},
			},
			twjuezhu:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return !player.isDisabled('equip3')||!player.isDisabled('equip4');
				},
				skillAnimation:true,
				animationColor:'water',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('twjuezhu'),[1,2],function(card,player,target){
						return !ui.selected.targets.length&&!target.hasSkill('feiying');
					}).set('promptbar','none').set('ai',function(target){
						if(player.hasUnknown()) return false;
						return get.attitude(player,target);
					});
					'step 1'
					if(result.bool){
						event.target=result.targets[0];
						var list=[];
						if(!player.isDisabled(3)) list.push('equip3');
						if(!player.isDisabled(4)) list.push('equip4');
						if(list.length==1) event._result={control:list[0]};
						else player.chooseControl(list).set('prompt','选择废除一个坐骑栏');
					}
					else event.finish();
					'step 2'
					player.logSkill('twjuezhu',target);
					player.awakenSkill('twjuezhu');
					player.disableEquip(result.control);
					target.disableJudge();
					player.markAuto('twjuezhu_restore',[[target,result.control]]);
					player.addSkill('twjuezhu_restore');
					target.addSkill('feiying');
				},
				subSkill:{
					restore:{
						trigger:{global:'die'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							for(var i of player.getStorage('twjuezhu_restore')){
								if(i[0]==event.player&&player.isDisabled(i[1])) return true;
							}
							return false;
						},
						content:function(){
							var list=[];
							for(var i of player.getStorage('twjuezhu_restore')){
								if(i[0]==trigger.player&&player.isDisabled(i[1])) list.add(i[1]);
							}
							for(var i of list) player.enableEquip(i);
						},
					},
				},
				derivation:'feiying',
			},
			twfengpo:{
				audio:'fengpo',
				trigger:{player:'useCardToPlayered'},
				logTarget:'target',
				filter:function(event,player){
					return (event.card.name=='sha'||event.card.name=='juedou')&&event.targets.length==1&&event.target.countCards('h')>0;
				},
				onremove:true,
				content:function(){
					'step 0'
					event.target=trigger.target;
					player.viewHandcards(trigger.target);
					'step 1'
					var num=target.countCards('h',player.storage.twfengpo?{color:'red'}:{suit:'diamond'});
					if(!num){
						event.finish();
						return;
					}
					event.num=num;
					player.chooseControl().set('choiceList',[
						'摸'+num+'张牌',
						'令'+get.translation(trigger.card)+'的伤害值基数+'+num,
					]);
					'step 2'
					if(result.index==0) player.draw(num);
					else trigger.getParent().baseDamage+=num;
				},
				group:'twfengpo_kill',
				subSkill:{
					kill:{
						trigger:{source:'die'},
						forced:true,
						filter:(event,player)=>!player.storage.twfengpo,
						skillAnimation:true,
						animationColor:'fire',
						content:function(){
							player.storage.twfengpo=true;
						},
					},
				},
			},
			twmouzhu:{
				audio:'mouzhu',
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				contentBefore:function(){
					var target=targets[0],evt=event.getParent();
					evt._target=target;
					var list=game.filterPlayer(function(current){
						return current!=player&&current!=target&&current.hp<=player.hp;
					});
					if(!list.length){
						player.loseHp();
						evt.finish();
					}
					else{
						evt.targets=list.sortBySeat();
						player.line(list);
					}
				},
				content:function(){
					'step 0'
					target.chooseCard('he','是否交给'+get.translation(player)+'一张牌？').set('ai',function(card){
						if(_status.event.goon) return 7-get.value(card);
						return 0;
					}).set('goon',get.attitude(target,player)>0);
					'step 1'
					if(result.bool){
						player.gain(result.cards,target,'giveAuto');
					}
					else{
						game.log(target,'拒绝给牌');
					}
				},
				contentAfter:function(){
					'step 0'
					var num=0,par=event.getParent();
					player.getHistory('gain',function(evt){
						if(evt.getParent(2)==par) num+=evt.cards.length;
					});
					if(!num){
						player.loseHp();
						for(var i of targets) i.loseHp();
						event.finish();
					}
					else{
						var target=event.getParent()._target;
						event.target=target;
						event.num=num;
						var bool1=player.canUse('sha',target,false),bool2=player.canUse('juedou',target,false);
						if(bool1&&bool2) target.chooseControl('sha','juedou').set('prompt','谋诛：视为被'+get.translation(player)+'使用一张…').set('prompt2','（伤害值基数：'+num+'）').set('ai',function(){
							var target=_status.event.player,player=_status.event.getParent().player;
							if(target.hasShan()||get.effect(target,{name:'sha'},player,target)>0) return 'sha';
							if(get.effect(target,{name:'juedou'},player,target)>0) return 'juedou';
							return 'sha';
						});
						else if(bool1) event._result={control:'sha'};
						else if(bool2) event._result={control:'juedou'};
						else event.finish();
					}
					'step 1'
					if(result.control&&lib.card[result.control]) player.useCard({
						name:result.control,
						isCard:true,
					},false,target).baseDamage=num;
				},
			},
			twyanhuo:{
				audio:'yanhuo',
				trigger:{player:'die'},
				direct:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.countCards('he')>0&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')>0;
					});
				},
				content:function(){
					'step 0'
					var num=player.countCards('he'),str=get.cnNumber(num);
					event.num1=num;
					event.num2=1;
					var list=['令一名其他角色弃置'+str+'张牌'];
					if(num>1){
						list.push('令至多'+str+'名其他角色各弃置一张牌');
					}
					player.chooseControl('cancel2').set('choiceList',list).set('prompt',get.prompt('twyanhuo')).set('forceDie',true);
					'step 1'
					if(result.control!='cancel2'){
						if(result.index==0){
							event.num2=event.num1;
							event.num1=1;
						}
						player.chooseTarget([1,event.num1],true,'请选择【延祸】的目标',function(card,player,target){
							return target!=player&&target.countCards('he')>0;
						}).set('forceDie',true).set('ai',function(target){
							return -get.attitude(_status.event.player,target)
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						player.logSkill('twyanhuo',targets);
						for(var i of targets) i.chooseToDiscard(true,'he',event.num2);
					}
				},
			},
			twshenxing:{
				mod:{
					globalFrom:function(player,target,distance){
						var es=player.getCards('e',function(card){
							return !ui.selected.cards.contains(card);
						});
						for(var i of es){
							var type=get.subtype(i);
							if(type=='equip3'||type=='equip4'||type=='equip6') return distance;
						}
						return distance-1;
					},
					maxHandcard:function(player,distance){
						var es=player.getCards('e',function(card){
							return !ui.selected.cards.contains(card);
						});
						for(var i of es){
							var type=get.subtype(i);
							if(type=='equip3'||type=='equip4'||type=='equip6') return distance;
						}
						return distance+1;
					},
				},
			},
			twdaoji:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasCard(lib.skill.twdaoji.filterCard,'he');
				},
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player&&player.inRange(target)&&target.hasCard((card)=>lib.filter.canBeGained(card,target,player),'he');
				},
				check:function(card){
					return 8-get.value(card);
				},
				content:function(){
					'step 0'
					player.gainPlayerCard(target,'he',true);
					'step 1'
					if(result.bool&&result.cards&&result.cards.length==1){
						var card=result.cards[0];
						if(player.getCards('h').contains(card)){
							var type=get.type(card);
							if(type=='basic') player.draw();
							else if(type=='equip'){
								if(player.hasUseTarget(card)) player.chooseUseTarget(card,'nopopup',true);
								target.damage('nocard');
							}
						}
					}
				},
				ai:{
					order:6,
					result:{
						target:function(player,target){
							var eff=get.effect(target,{name:'shunshou_copy2'},player,target);
							if(target.countCards('e')>0) eff+=get.damageEffect(target,player,target);
							return eff;
						},
					},
				},
			},
			xinzhenjun:{
				audio:2,
				trigger:{
					player:'phaseUseBegin'
				},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						filterCard:true,
						filterTarget:lib.filter.notMe,
						position:'he',
						prompt:get.prompt2('xinzhenjun'),
						ai1:function(card){
							var player=_status.event.player;
							if(card.name=='sha'&&get.color(card)=='red'){
								for(var i=0;i<game.players.length;i++){
									var current=game.players[i];
									if(current!=player&&get.attitude(player,current)>0&&current.hasValueTarget(card)) return 7;
								}
								return 0;
							}
							return 7-get.value(card);
						},
						ai2:function(target){
							var player=_status.event.player;
							var card=ui.selected.cards[0];
							var att=get.attitude(player,target);
							if(get.value(card)<0) return -att*2;
							if(target.countCards('h',{name:'sha',color:'red'})||target.hasSkill('wusheng')||target.hasSkill('new_rewusheng')||target.hasSkill('wushen')||(card.name=='sha'&&get.color(card)=='red'&&target.hasValueTarget(card))) return att*2;
							var eff=0;
							game.countPlayer(function(current){
								if(target!=current&&get.distance(target,current,'attack')>1) return;
								var eff2=get.damageEffect(current,player,player);
								if(eff2>eff) eff=eff2;
							});
							if(att>0&&eff>0) eff+=2*att;
							return eff;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('xinzhenjun',target);
						target.gain(result.cards,player,'giveAuto')
					}
					else event.finish();
					'step 2'
					target.chooseToUse({
						filterCard:function(card){
							return get.name(card)=='sha'&&get.color(card)!='black'&&lib.filter.cardEnabled.apply(this,arguments);
						},
						prompt:'请使用一张不为黑色的【杀】，否则'+get.translation(player)+'可以对你或你攻击范围内的一名其他角色造成1点伤害',
					});
					'step 3'
					if(result.bool){
						var num=1;
						game.countPlayer2(function(current){
							current.getHistory('damage',function(evt){
								if(evt.getParent(evt.notLink()?4:8)==event) num+=evt.num;
							});
						});
						player.draw(num);
						event.finish();
					}
					else{
						player.chooseTarget('是否对'+get.translation(target)+'或其攻击范围内的一名角色造成1点伤害？',function(card,player,target){
							return target==_status.event.targetx||_status.event.targetx.inRange(target);
						}).set('targetx',event.target).ai=function(target){
							var player=_status.event.player;
							return get.damageEffect(target,player,player)
						};
					}
					'step 4'
					if(result.bool){
						player.line(result.targets);
						result.targets[0].damage('nocard');
					}
				},
			},
			twmoukui:{
				trigger:{player:'useCardToPlayered'},
				direct:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha';
				},
				content:function(){
					'step 0'
					var list=['选项一'];
					if(trigger.target.countDiscardableCards(player,'he')>0) list.push('选项二');
					list.push('背水！');
					list.push('cancel2');
					player.chooseControl(list).set('choiceList',[
						'摸一张牌',
						'弃置'+get.translation(trigger.target)+'的一张牌',
						'背水！依次执行以上两项。然后若此【杀】未令其进入濒死状态，则其弃置你的一张牌。',
					]).set('prompt',get.prompt('twmoukui',trigger.target));
					'step 1'
					if(result.control!='cancel2'){
						var target=trigger.target;
						player.logSkill('twmoukui',target);
						if(result.control=='选项一'||result.control=='背水！') player.draw();
						if(result.control=='选项二'||result.control=='背水！') player.discardPlayerCard(target,true,'he');
						if(result.control=='背水！'){
							player.addTempSkill('twmoukui_effect');
							var evt=trigger.getParent();
							if(!evt.twmoukui_effect) evt.twmoukui_effect=[];
							evt.twmoukui_effect.add(target);
						}
					}
				},
				subSkill:{
					effect:{
						trigger:{player:'useCardAfter'},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return event.twmoukui_effect&&event.twmoukui_effect.filter(function(current){
								return current.isIn()&&!current.hasHistory('damage',function(evt){
									return evt._dyinged&&evt.card==event.card;
								});
							}).length>0;
						},
						content:function(){
							var list=trigger.twmoukui_effect.filter(function(current){
								return current.isIn()&&!current.hasHistory('damage',function(evt){
									return evt._dyinged&&evt.card==event.card;
								});
							}).sortBySeat();
							for(var i of list){
							 i.discardPlayerCard(player,true,'he').boolline=true;
							}
						},
					},
				},
			},
			twfuhan:{
				audio:'fuhan',
				trigger:{player:'phaseZhunbeiBegin'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				forceunique:true,
				filter:function(event,player){
					return player.countMark('fanghun')>0;
				},
				prompt:function(event,player){
					var num=Math.max(2,player.storage.fanghun);
					num=Math.min(num,8);
					return get.prompt('twfuhan')+'（体力上限：'+num+'）';
				},
				check:function(event,player){
					if(player.storage.fanghun>=Math.min(4,player.maxHp)) return true;
					if(player.hp<=2&&player.storage.fanghun>=3) return true;
					return false;
				},
				content:function(){
					'step 0'
					event.num=player.storage.fanghun;
					player.removeMark('fanghun',player.storage.fanghun);
					player.awakenSkill('twfuhan');
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(lib.character[name][1]=='shu') list.push(name);
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return lib.character[i][1]!='shu';
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return info[1]=='shu';
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						list.remove(players[i].name);
						list.remove(players[i].name1);
						list.remove(players[i].name2);
					}
					list.remove('zhaoxiang');
					player.chooseButton(['扶汉：选择获得一张武将牌上的所有技能',[list.randomGets(5),'character']],true);
					'step 1'
					if(result.bool){
						var name=result.links[0];
						player.flashAvatar('twhuashen',name);
						game.log(player,'获得了','#y'+get.translation(name),'的所有技能');
						player.addSkill(lib.character[name][3])
					}
					'step 2'
					var num=event.num-player.maxHp;
					if(num>0) player.gainMaxHp(num);
					else player.loseMaxHp(-num);
					player.recover();
					'step 3'
					var card=get.cardPile('meiyingqiang','field');
					if(card){
						player.gain(card,'gain2','log');
					}
				},
			},
			twqueshi:{
				trigger:{
					global:'gameDrawAfter',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return !player.isDisabled(1);
				},
				content:function(){
					if(!lib.inpile.contains('meiyingqiang')){
						lib.inpile.push('meiyingqiang');
						player.equip(game.createCard('meiyingqiang','diamond',12));
					}
					else{
						var card=get.cardPile(function(card){
							return card.name=='meiyingqiang'&&card!=player.getEquip(1);
						},'field');
						if(card) player.equip(card);
					}
				},
			},
			meiyingqiang:{
				equipSkill:true,
				trigger:{
					player:['loseAfter','gainAfter'],
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				filter:function(event,player){
					if(player==_status.currentPhase) return false;
					var evt=event.getl(player);
					if(!evt||!evt.cards2||!evt.cards2.length) return false;
					var list=player.getHistory('lose',function(evt){
						return evt.cards2&&evt.cards2.length;
					});
					if(event.name=='lose'){
						if(list.indexOf(event)!=0) return false;
					}
					else{
						if(!player.hasHistory('lose',function(evt){
							return evt.getParent()==event&&list.indexOf(evt)==0;
						})) return false;
					}
					return _status.connectMode||!lib.config.skip_shan||player.hasSha();
				},
				direct:true,
				content:function(){
					if(trigger.delay===false) game.delayx();
					player.chooseToUse('梅影枪：是否使用一张【杀】？',function(card){
						if(get.name(card)!='sha') return false;
						return lib.filter.cardEnabled.apply(this,arguments);
					}).set('addCount',false).logSkill='meiyingqiang';
				},
			},
			cuijin:{
				trigger:{global:'useCard'},
				direct:true,
				filter:function(event,player){
					return event.card.name=='sha'&&(event.player==player||player.inRange(event.player))&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					if(player!=game.me&&!player.isOnline()) game.delayx();
					var target=trigger.player;
					event.target=target;
					player.chooseToDiscard('he',get.prompt('cuijin',target),'弃置一张牌并令'+get.translation(trigger.player)+'使用的【杀】伤害+1，但若其未造成伤害，则你对其造成1点伤害。').set('ai',function(card){
						if(_status.event.goon) return 7-get.value(card);
						return 0;
					}).set('goon',function(){
						var d1=true;
						if(trigger.player.hasSkill('jueqing')||trigger.player.hasSkill('gangzhi')) d1=false
						for(var target of trigger.targets){
							if(!target.mayHaveShan()||trigger.player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:trigger.card,
							},true)){
								if(!target.hasSkill('gangzhi')) d1=false;
								if(!target.hasSkillTag('filterDamage',null,{
									player:trigger.player,
									card:trigger.card,
								})&&get.attitude(player,target)<0) return true;
							}
						}
						if(d1) return get.damageEffect(trigger.player,player,player)>0;
						return false;
					}()).logSkill=['cuijin',target];
					'step 1'
					if(result.bool){
						if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
						trigger.baseDamage++;
						player.addTempSkill('cuijin_damage');
						player.markAuto('cuijin_damage',[trigger.card]);
					}
				},
				subSkill:{
					damage:{
						trigger:{global:'useCardAfter'},
						forced:true,
						popup:false,
						charlotte:true,
						onremove:true,
						filter:function(event,player){
							return player.storage.cuijin_damage.contains(event.card);
						},
						content:function(){
							player.storage.cuijin_damage.remove(trigger.card);
							if(!player.storage.cuijin_damage.length) player.removeSkill('cuijin_damage');
							if(trigger.player.isIn()&&!game.hasPlayer2(function(current){
								return current.hasHistory('damage',function(evt){
									return evt.card==trigger.card;
								});
							})){
								player.line(trigger.player,'green');
								trigger.player.damage();
							}
						},
					},
				},
			},
			jintao:{
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					},
					targetInRange:function(card){
						if(card.name=='sha') return true;
					},
				},
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=player) return false;
					var index=player.getHistory('useCard',function(evtx){
						return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
					}).indexOf(event);
					return index==0||index==1;
				},
				content:function(){
					var evt=trigger.getParent('phaseUse');
					var index=player.getHistory('useCard',function(evtx){
						return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
					}).indexOf(trigger);
					if(index==0){
						game.log(trigger.card,'伤害+1');
						if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
						trigger.baseDamage++;
					}
					else{
						game.log(trigger.card,'不可被响应');
						trigger.directHit.addArray(game.players);
					}
				},
			},
			equan:{
				audio:2,
				trigger:{global:'damageEnd'},
				forced:true,
				filter:function(event,player){
					return player==_status.currentPhase&&event.player.isIn();
				},
				logTarget:'player',
				content:function(){
					trigger.player.addMark('equan',trigger.num,false);
				},
				group:['equan_block','equan_lose'],
				marktext:'毒',
				intro:{
					name:'恶泉(毒)',
					name2:'毒',
				},
				subSkill:{
					lose:{
						audio:'equan',
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						filter:function(){
							return game.hasPlayer(function(current){
								return current.hasMark('equan');
							});
						},
						logTarget:function(){
							return game.filterPlayer(function(current){
								return current.hasMark('equan');
							});
						},
						content:function(){
							game.countPlayer(function(current){
								var num=current.countMark('equan');
								if(num){
									current.removeMark('equan',num);
									current.loseHp(num);
								}
							});
						},
					},
					block:{
						trigger:{global:'dyingBegin'},
						forced:true,
						logTarget:'player',
						filter:function(event,player){
							var evt=event.getParent(2);
							return evt.name=='equan_lose'&&evt.player==player;
						},
						content:function(){
							trigger.player.addTempSkill('baiban');
						},
					},
				},
			},
			manji:{
				audio:2,
				trigger:{global:'loseHpAfter'},
				forced:true,
				filter:function(event,player){
					return player!=event.player&&player.hp>=event.player.hp||player.isDamaged();
				},
				logTarget:'player',
				content:function(){
					if(player.hp<=trigger.player.hp) player.recover();
					if(player.hp>=trigger.player.hp) player.draw();
				},
			},
			beini:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					var str=get.translation(target);
					player.chooseControl().set('choiceList',[
						'摸两张牌，然后令'+str+'视为对自己使用【杀】',
						'令'+str+'摸两张牌，然后视为对其使用【杀】',
					]).set('ai',function(){
						var evt=_status.event.getParent(),player=evt.player,target=evt.target;
						var card={name:'sha',isCard:true},att=get.attitude(player,target)>0;
						if(!target.canUse(card,player,false)||get.effect(player,card,target,player)>=0) return 0;
						if(att&&(!player.canUse(card,target,false)||get.effect(target,card,player,player)>=0)) return 1;
						if(target.hasSkill('nogain')&&player.canUse(card,target,false)&&get.effect(target,card,player,player)>0) return 1;
						if(player.hasShan()) return 0;
						if(att&&target.hasShan()) return 1;
						return 0;
					});
					'step 1'
					var list=[player,target];
					if(result.index==1) list.reverse();
					event.list=list;
					list[0].draw(2);
					'step 2'
					var list=event.list;
					if(list[1].isIn()&&list[0].isIn()&&list[1].canUse('sha',list[0],false)) list[1].useCard({name:'sha',isCard:true},list[0],false,'noai');
				},
				ai:{
					order:5,
					expose:0,
					result:{
						player:function(player,target){
							var card={name:'sha',isCard:true},att=get.attitude(player,target)>0;
							if(!target.canUse(card,player,false)||get.effect(player,card,target,player)>=0) return 2;
							if(att&&(!player.canUse(card,target,false)||get.effect(target,card,player,player)>=0)) return 2;
							if(target.hasSkill('nogain')&&player.canUse(card,target,false)) return get.effect(target,card,player,player)
							if(player.hasShan()) return 1;
							if(att&&target.hasShan()) return 1;
							return 0;
						},
					},
				},
			},
			dingfa:{
				audio:2,
				trigger:{player:'phaseDiscardAfter'},
				direct:true,
				filter:function(event,player){
					var num=0;
					player.getHistory('lose',function(evt){
						num+=evt.cards2.length;
					});
					return num>=player.hp;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('dingfa'),'操作提示：选择自己以回复体力，或选择其他角色以造成伤害',function(card,player,target){
						return target==player?player.isDamaged():true;
					}).set('ai',function(target){
						return target!=player?get.damageEffect(target,player,player):get.recoverEffect(player,player,player)
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dingfa',target);
						if(target==player) player.recover();
						else target.damage();
					}
				},
			},
			dz_mantianguohai:{
				mod:{
					ignoredHandcard:function(card,player){
						if(get.name(card)=='dz_mantianguohai') return true;
					},
					cardDiscardable:function(card,player,name){
						if(name=='cardsDiscard'&&get.name(card)=='dz_mantianguohai') return false;
					},
				},
			},
			twmiaolve:{
				audio:2,
				trigger:{
					global:'gameDrawAfter',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				content:function(){
					if(!lib.inpile.contains('dz_mantianguohai')) lib.inpile.add('dz_mantianguohai');
					if(!_status.dz_mantianguohai_suits) _status.dz_mantianguohai_suits=lib.suit.slice(0);
					var list=_status.dz_mantianguohai_suits.randomRemove(2).map(function(i){
						return game.createCard2('dz_mantianguohai',i,get.rand(1,13));
					});
					if(list.length) player.gain(list,'gain2','log');
				},
				group:'twmiaolve_damage',
				subSkill:{
					damage:{
						trigger:{player:'damageEnd'},
						direct:true,
						content:function(){
							'step 0'
							event.count=trigger.num;
							'step 1'
							event.count--;
							var list=['dz_mantianguohai'];
							list.addArray(get.zhinangs());
							player.chooseButton([get.prompt('twmiaolve'),[list,'vcard']]).set('ai',function(button){
								if(button.link[2]=='dz_mantianguohai'&&player.countCards('hs','dz_mantianguohai')<2) return 10;
								return get.value({name:button.link[2]});
							});
							'step 2'
							if(result.bool){
								player.logSkill('twmiaolve');
								var name=result.links[0][2];
								if(name=='dz_mantianguohai'){
									if(!lib.inpile.contains('dz_mantianguohai')) lib.inpile.add('dz_mantianguohai');
									if(!_status.dz_mantianguohai_suits) _status.dz_mantianguohai_suits=lib.suit.slice(0);
									if(_status.dz_mantianguohai_suits.length) player.gain(game.createCard2('dz_mantianguohai',_status.dz_mantianguohai_suits.randomRemove(),get.rand(1,13)),'gain2');
									else{
										var card=get.cardPile(function(card){
											return card.name==name;
										});
										if(card) player.gain(card,'gain2');
									}
									player.draw();
								}
								else{
									var card=get.cardPile(function(card){
										return card.name==name;
									});
									if(card) player.gain(card,'gain2');
								}
								if(event.count>0) event.goto(1);
							}
						},
					},
				},
			},
			twyingjia:{
				audio:2,
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he')) return false;
					var history=player.getHistory('useCard'),map={};
					for(var i of history){
						if(get.type2(i.card)=='trick'){
							if(!map[i.card.name]) map[i.card.name]=true;
							else return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:get.prompt('twyingjia'),
						prompt2:'弃置一张牌并令一名角色进行一个额外回合',
						filterCard:lib.filter.cardDiscardable,
						filterTarget:true,
						ai1:function(card){
							return 8-get.value(card);
						},
						ai2:function(target){
							if(target.hasJudge('lebu')) return -1;
							var player=_status.event.player;
							if(get.attitude(player,target)>4){
								return get.threaten(target)/Math.sqrt(target.hp+1)/Math.sqrt(target.countCards('h')+1);
							}
							return -1;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('twyingjia',target);
						player.discard(result.cards);
						target.insertPhase();
					}
				},
			},
			gx_lingbaoxianhu:{
				trigger:{
					source:'damageSource',
					global:'dieAfter',
				},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					if(event.name=='damage') return event.num>1;
					return true;
				},
				content:function(){
					player.gainMaxHp();
					player.recover();
				},
			},
			gx_taijifuchen:{
				trigger:{player:'useCardToPlayered'},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha';
				},
				logTarget:'target',
				content:function(){
					'step 0'
					var suit=get.suit(trigger.card);
					var num=trigger.target.countCards('h','shan');
					var next=trigger.target.chooseToDiscard('弃置一张牌，或不能响应'+get.translation(trigger.card),'he').set('ai',function(card){
						var num=_status.event.num;
						if(num==0) return 0;
						if(card.name=='shan') return num>1?2:0;
						return (get.suit(card)!=_status.event.suit?9:6)-get.value(card);
					}).set('num',num);
					if(lib.suit.contains(suit)){
						next.set('prompt2','若弃置的是'+get.suit(suit)+'牌，则改为'+get.translation(player)+'获得之');
						next.set('suit',suit);
					}
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						if(get.suit(card,trigger.target)==get.suit(trigger.card,false)&&get.position(card)=='d') player.gain(card,'gain2');
					}
					else trigger.directHit.add(trigger.target);
				},
			},
			gx_chongyingshenfu:{
				trigger:{player:'damageEnd'},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					if(!event.card||!event.card.name||player.getStorage('gx_chongyingshenfu_effect').contains(event.card.name)) return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source.hasSkillTag('unequip',false,{
						name:event.card.name,
						target:player,
						card:event.card,
					})) return false;
					return true;
				},
				content:function(){
					player.markAuto('gx_chongyingshenfu_effect',[trigger.card.name]);
				},
				group:'gx_chongyingshenfu_effect',
				subSkill:{
					effect:{
						trigger:{player:'damageBegin4'},
						forced:true,
						equipSkill:true,
						filter:function(event,player){
							if(!event.card||!event.card.name||!player.storage.gx_chongyingshenfu_effect||!player.getStorage('gx_chongyingshenfu_effect').contains(event.card.name)) return false;
							if(player.hasSkillTag('unequip2')) return false;
							if(event.source.hasSkillTag('unequip',false,{
								name:event.card.name,
								target:player,
								card:event.card,
							})) return false;
							return true;
						},
						content:function(){
							trigger.num--;
						},
						onremove:true,
						intro:{
							content:'受到$造成的伤害-1',
						},
					},
				},
			},
			twdanfa:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','phaseJieshuBegin']},
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt('twdanfa'),'将一张牌作为“丹”置于武将牌上').set('ai',function(card){
						if(player.storage.twdanfa){
							var suit=get.suit(card);
							for(var i of player.storage.twdanfa){
								if(get.suit(i,false)==suit) return 4-get.value(card);
							}
						}
						return 5.5-get.value(card);
					});
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						player.logSkill('twdanfa');
						game.log(player,'将',card,'放在了武将牌上');
						player.$give(card,player,false);
						player.lose(card,ui.special,'toStorage');
						player.markAuto('twdanfa',result.cards);
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
				mark:true,
				intro:{
					content:'cards',
					onunmark:'throw',
				},
				group:'twdanfa_draw',
				subSkill:{
					draw:{
						audio:'twdanfa',
						trigger:{player:'useCard'},
						forced:true,
						locked:false,
						filter:function(event,player){
							if(!player.storage.twdanfa||!player.storage.twdanfa.length) return false;
							var suit=get.suit(event.card,false);
							if(suit=='none'||player.storage.twdanfa_count&&player.storage.twdanfa_count.contains(suit)) return false;
							for(var i of player.storage.twdanfa){
								if(get.suit(i,false)==suit) return true;
							}
							return false;
						},
						content:function(){
							player.draw();
							player.addTempSkill('twdanfa_count');
							if(!player.storage.twdanfa_count) player.storage.twdanfa_count=[];
							player.storage.twdanfa_count.push(get.suit(trigger.card,false));
						},
					},
					count:{onremove:true},
				},
			},
			twlingbao:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var list=player.getStorage('twdanfa');
					if(list.length<2) return false;
					var suit=get.suit(list[0],false);
					for(var i=1;i<list.length;i++){
						if(get.suit(list[i],false)!=suit) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('灵宝',player.storage.twdanfa);
					},
					filter:function(button,player){
						if(!ui.selected.buttons.length) return true;
						return get.suit(button.link)!=get.suit(ui.selected.buttons[0].link);
					},
					select:2,
					backup:function(links){
						var obj=get.copy(lib.skill['twlingbao_'+get.color(links)]);
						obj.cards=links;
						obj.audio='twlingbao';
						obj.filterCard=()=>false;
						obj.selectCard=-1;
						return obj;
					},
					prompt:function(links){
						return lib.skill['twlingbao_'+get.color(links)].prompt;
					},
					check:function(button){
						var storage=_status.event.player.storage.twdanfa.slice(0);
						storage.remove(button.link);
						if(storage.filter(function(card){
							return card.suit==button.link.suit;
						}).length) return 1+Math.random();
						return 0;
					},
				},
				subSkill:{
					red:{
						filterTarget:function(card,player,target){
							return target.isDamaged();
						},
						delay:false,
						prompt:'令一名角色回复1点体力',
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							target.recover();
						},
						ai:{
							tag:{
								recover:1,
							},
							result:{
								target:1.5,
							},
						},
					},
					black:{
						filterTarget:function(card,player,target){
							return target.countDiscardableCards(player,'hej')>0;
						},
						delay:false,
						prompt:'弃置一名角色区域内至多两张区域不同的牌',
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							var num=0;
							if(target.countDiscardableCards(player,'h')) num++;
							if(target.countDiscardableCards(player,'e')) num++;
							if(target.countDiscardableCards(player,'j')) num++;
							if(num){
								player.discardPlayerCard(target,[1,Math.max(2,num)],'hej',true).set('filterButton',function(button){
									for(var i=0;i<ui.selected.buttons.length;i++){
										if(get.position(button.link)==get.position(ui.selected.buttons[i].link)) return false;
									}
									return true;
								});
							}
						},
						ai:{
							tag:{
								lose:1.5,
								loseCard:1.5,
								discard:1.5,
							},
							result:{
								target:function(player,target){
									if(get.attitude(player,target)>0&&target.countCards('e',function(card){
										return get.value(card,target)<=0;
									})>0&&target.countCards('j',function(card){
										return get.effect(target,card,target,target)<0;
									})>8) return 3;
									if(target.countCards('h')>0&&target.countCards('e',function(card){
										return get.value(card,target)>0;
									})>0) return -2;
									return 0;
								},
							},
						},
					},
					none:{
						selectTarget:2,
						filterTarget:function(card,player,target){
							if(!ui.selected.targets.length) return true;
							return target.countCards('he')>0;
						},
						complexSelect:true,
						targetprompt:['摸牌','弃牌'],
						delay:false,
						prompt:'令一名角色摸一张牌并令另一名角色弃置一张牌',
						multitarget:true,
						multiline:true,
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							targets[0].draw();
							targets[1].chooseToDiscard('he',true);
						},
						ai:{
							result:{
								target:function(player,target){
									if(!ui.selected.targets.length) return 1;
									if(target.countCards('e',function(card){
										return get.value(card,target)<=0;
									})>0) return 1;
									return -1;
								},
							},
						},
					},
					backup:{audio:'twlingbao'},
				},
				ai:{
					order:1,
					result:{player:1},
				},
			},
			twsidao:{
				audio:2,
				trigger:{
					global:'gameDrawAfter',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return !player.storage.twsidao;
				},
				content:function(){
					'step 0'
					player.chooseButton(['请选择你的初始法宝',[['gx_lingbaoxianhu','gx_taijifuchen','gx_chongyingshenfu'],'vcard']],true).set('ai',function(button){
						return button.link[2]=='gx_chongyingshenfu'?2:1;
					});
					'step 1'
					if(result.bool){
						var card=game.createCard2(result.links[0][2]);
						lib.inpile.add(result.links[0][2]);
						player.storage.twsidao=card;
						player.chooseUseTarget(card,'nopopup',true);
					}
				},
				group:'twsidao_equip',
				subSkill:{
					equip:{
						audio:'twsidao',
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						filter:function(event,player){
							var card=player.storage.twsidao;
							return card&&card.isInPile()&&player.hasUseTarget(card);
						},
						content:function(){
							player.chooseUseTarget(player.storage.twsidao,'nopopup',true);
						},
					},
				},
			},
			twrangyi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:lib.filter.notMe,
				delay:0,
				content:function(){
					'step 0'
					event.cards=player.getCards('h');
					target.gain(event.cards,player,'giveAuto').gaintag.add('twrangyi');
					target.addTempSkill('twrangyi2');
					'step 1'
					target.chooseToUse({
						prompt:'请使用得到的一张牌，或者受到来自'+get.translation(player)+'的一点伤害',
						filterCard:function(card,player){
							if(get.itemtype(card)!='card'||!card.hasGaintag('twrangyi')) return false;
							return lib.filter.filterCard(card,player,event);
						},
						cards:cards,
					});
					'step 2'
					target.removeSkill('twrangyi');
					if(!result.bool) target.damage('nocard');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var hs=player.getCards('h');
							for(var i=0;i<hs.length;i++){
								var hi=hs[i];
								if(hi.name=='tao'||game.hasPlayer(function(current){
									return target.canUse(hi,current)&&get.effect(current,hi,target,target);
								})) return 1;
							}
							return get.damageEffect(target,player,target);
						},
					},
				},
			},
			twrangyi2:{
				trigger:{player:'useCard'},
				forced:true,
				popup:false,
				filter:function(event,player){
					var evt=event.getParent(2);
					return evt.name=='twrangyi'&&evt.player.isAlive()&&player.countCards('h',function(card){
						return card.hasGaintag('twrangyi');
					})>0;
				},
				content:function(){
					var cards=player.getCards('h',function(card){
						return card.hasGaintag('twrangyi');
					});
					trigger.getParent(2).player.gain(cards,player,'giveAuto');
				},
				onremove:function(player){
					player.removeGaintag('twrangyi');
				},
			},
			twbaimei:{
				audio:2,
				trigger:{
					player:"damageBegin4",
				},
				forced:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					if(event.nature) return true;
					return get.type(event.card,'trick')=='trick';
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.countCards('h')) return;
							if(get.tag(card,'natureDamage')) return 'zerotarget';
							if(get.type(card)=='trick'&&get.tag(card,'damage')){
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			twhuzhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(e,player){
					return player.countCards('e')>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0
				},
				content:function(){
					'step 0'
					target.chooseCard('交给'+get.translation(player)+'一张手牌','h',true);
					'step 1'
					target.give(result.cards,player);
					'step 2'
					if(player.countGainableCards(player,'e')) target.gainPlayerCard(player,'e',true);
					'step 3'
					if(target.isDamaged()&&target.hp<=player.hp){
						player.chooseBool('是否令'+get.translation(target)+'回复1点体力？').set('ai',function(){
							return get.recoverEffect(target,player,player);
						});
					}
					'step 4'
					if(result.bool) target.recover();
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							var eff=(target.isDamaged()&&target.hp<=player.hp)?get.recoverEffect(target,player,target):0;
							if(eff<=0&&!player.countGainableCards(target,'e')) return -1;
							return eff;
						},
					},
				},
			},
			twliancai:{
				audio:2,
				trigger:{player:['turnOverEnd','phaseJieshuBegin']},
				filter:function(card,player,target){
					return target=='phaseJieshuBegin'||player.countCards('h')<player.hp;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countGainableCards(player,'e')>0;
				},
				check:function(card,player){
					if(card.name=='turnOver') return true;
					if(player.isTurnedOver()) return true;
					if(player.hp-player.countCards('h')>1) return true;
					return game.hasPlayer(function(current){
						return lib.skill.twliancai.filterTarget(null,player,current)&&lib.skill.twliancai.filterAI(current);
					});
				},
				filterAI:function(target){
					var player=_status.event.player;
					var att=get.attitude(player,target);
					if(target.isDamaged()&&target.countCards('e','baiyin')&&att>0) return 2*att;
					return -att;
				},
				prompt2:function(card,player,target){
					return card.name=='phaseJieshu'?'将武将牌翻面，然后获得一名其他角色装备区内的一张牌':'将手牌摸至与体力值相同';
				},
				content:function(){
					'step 0'
					if(event.triggername=='phaseJieshuBegin') player.turnOver();
					else{
						player.draw(player.hp-player.countCards('h'));
						event.finish();
					}
					'step 1'
					player.chooseTarget('获得一名角色装备区内的一张牌',lib.skill.twliancai.filterTarget).ai=lib.skill.twliancai.filterAI;
					'step 2'
					if(result.bool){
						player.line(result.targets,'thunder');
						player.gainPlayerCard('e',true,result.targets[0]);
					}
				},
			},
			twqijia:{
				//group:'twqijia_alka',
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('e',function(card){
						return !player.getStorage('twqijia_alka').contains(get.subtype(card));
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&player.canUse({name:'sha'},target);
				},
				position:'e',
				filterCard:function(card,player){
					return !player.getStorage('twqijia_alka').contains(get.subtype(card));
				},
				content:function(){
					'step 0'
					player.addTempSkill('twqijia_alka');
					player.storage.twqijia_alka.push(get.subtype(cards[0]));
					player.useCard({name:'sha'},target,false);
				},
				subSkill:{
					alka:{
						charlotte:true,
						onremove:function(player){
							delete player.storage.twqijia_alka;
							delete player.storage.twzhuchen;
							player.unmarkSkill('twzhuchen');
						},
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
							if(!player.storage.twzhuchen) player.storage.twzhuchen=[];
						},
						mod:{
							globalFrom:function(from,to,distance){
								if(from.storage.twzhuchen&&from.storage.twzhuchen.contains(to)) return -Infinity;
							}
						},
					},
				},
				check:function(card){
					return 7-get.value(card);
				},
				ai:{
					order:function(){
						return get.order({name:'sha'})-0.2;
					},
					result:{
						target:function(player,target){
							return get.effect(target,{name:'sha'},player,player);
						},
					},
				},
			},
			twzhuchen:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',lib.skill.twzhuchen.filterCard)>0;
				},
				filterCard:function(card,player){
					var name=get.name(card,player);
					return name=='tao'||name=='jiu';
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					player.addTempSkill('twqijia_alka');
					player.storage.twzhuchen.add(target);
					player.markSkill('twzhuchen');
				},
				intro:{
					content:function(content,player){
						return '至'+get.translation(content)+'的距离视为1';
					},
				},
			},
			twxiaolian:{
				audio:2,
				trigger:{global:'useCardToTarget'},
				logTarget:'target',
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player!=player&&
					event.targets.length==1&&event.targets[0]!=player;
				},
				check:function(event,player){
					return get.effect(event.targets[0],event.card,event.player,player)<=get.effect(player,event.card,event.player,player);
				},
				content:function(){
					trigger.getParent().twxiaolian=trigger.targets[0];
					trigger.targets.length=0;
					trigger.getParent().triggeredTargets2.length=0;
					trigger.targets.push(player);
				},
				group:'twxiaolian_damage',
				subSkill:{
					distance:{
						sub:true,
						charlotte:true,
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						mark:true,
						marktext:'马',
						intro:{
							content:'cards',
							onunmark:'throw',
						},
						mod:{
							globalTo:function(from,to,distance){
								if(from!=to&&to.storage.twxiaolian_distance) return distance+to.storage.twxiaolian_distance.length;
							},
						},
					},
					damage:{
						sub:true,
						trigger:{player:'damageEnd'},
						direct:true,
						filter:function(event,player){
							return event.getParent(2).twxiaolian!=undefined;
						},
						content:function(){
							'step 0'
							var target=trigger.getParent(2).twxiaolian;
							event.target=target;
							player.chooseCard('是否将一张牌当做【马】置于'+get.translation(target)+'的武将牌旁？','he').ai=function(card){
								if(get.attitude(_status.event.player,_status.event.getParent('twxiaolian_damage').target)>2) return 7-get.value(card);
								return 0;
							};
							'step 1'
							if(result.bool){
								player.logSkill('twxiaolian',target);
								player.lose(result.cards,ui.special,'toStorage');
								target.addSkill('twxiaolian_distance');
								target.storage.twxiaolian_distance.addArray(result.cards);
								target.markSkill('twxiaolian_distance');
							}
						},
					},
				},
			},
			twtijin:{
				audio:2,
				trigger:{global:'useCardToPlayer'},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player!=player&&event.target!=player&&
					event.targets.length==1&&event.player.inRange(player);
				},
				logTarget:'target',
				check:function(event,player){
					return get.effect(event.targets[0],event.card,event.player,player)<=get.effect(player,event.card,event.player,player);
				},
				content:function(){
					'step 0'
					trigger.targets.length=0;
					trigger.getParent().triggeredTargets1.length=0;
					trigger.targets.push(player);
					var next=game.createEvent('twtijin_discard',null,trigger.getParent(2));
					next.player=player;
					next.target=trigger.player;
					next.setContent(function(){
						if(target.isDead()||!target.countCards('he')) return;
						player.line(target,'green');
						player.discardPlayerCard(target,true,'he');
					});
				},
			},
			twyanqin:{
				forbid:['guozhan'],
				audio:2,
				trigger:{player:'phaseBegin'},
				direct:true,
				content:function(){
					'step 0'
					var list=[];
					if(player.group!='wei') list.push('wei2');
					if(player.group!='shu') list.push('shu2');
					list.push('cancel2');
					player.chooseControl(list).set('ai',function(){
						return list.randomGet();
					}).set('prompt',get.prompt2('twyanqin'));
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('twyanqin');
						var group=result.control.slice(0,3);
						player.changeGroup(group);
					}
				},
			},
			twbaobian:{
				audio:2,
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					var card=event.card;
					if(!card||(card.name!='sha'&&card.name!='juedou')) return false;
					return event.player.group==player.group||event.player.countCards('h')>event.player.hp
				},
				check:function(event,player){
					var att=get.attitude(player,event.player);
					if(event.player.group==player.group) return att>0;
					return att<0;
				},
				logTarget:'player',
				content:function(){
					var target=trigger.player;
					if(target.group==player.group){
						trigger.cancel();
						var num=target.maxHp-target.countCards('h');
						if(num) target.draw(num);
					}
					else{
						player.discardPlayerCard(target,'h',true,target.countCards('h')-target.hp)
					}
				},
			},
			renshe:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					'step 0'
					var choiceList=['令一名其他角色与你各摸一张牌','令自己下个出牌阶段可以多发动一次【外使】'];
					if(lib.skill.chijie.filter&&lib.skill.chijie.filter({},player)) choiceList.push('将自己的势力变更为场上存在的一个其他势力');
					player.chooseControl('cancel2').set('prompt',get.prompt('renshe')).set('choiceList',choiceList).set('ai',function(){
						if(game.hasPlayer(function(current){
							return get.attitude(player,current)>0||current.hasSkillTag('nogain');
						})) return 0;
						return 1;
					});
					'step 1'
					if(result.control=='cancel2') event.finish();
					else{
						event.index=result.index;
						player.logSkill('renshe');
						if(event.index==0){
							player.chooseTarget('请选择一名角色，与其各摸一张牌',lib.filter.notMe,true).ai=function(target){
								if(target.hasSkillTag('nogain')) return 0.1;
								return get.attitude(_status.event.player,target);
							};
						}
						else if(result.index==1){
							player.storage.waishi++;
							event.finish();
						}
						else{
							var next=game.createEvent('renshe_changeGroup');
							next.player=player;
							next.renshe=true;
							next.setContent(lib.skill.chijie.content);
							event.finish();
						}
					}
					'step 2'
					if(result.bool){
						player.line(result.targets[0],'green');
						game.asyncDraw([player,result.targets[0]].sortBySeat());
					}
					else event.finish();
					'step 3'
					game.delay();
				},
			},
			waishi:{
				audio:2,
				group:'waishi_afterstory',
				subSkill:{
					afterstory:{
						trigger:{player:'phaseUseEnd'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){player.storage.waishi=1},
					},
				},
				init:function(player,skill){
					player.storage[skill]=1;
				},
				enable:'phaseUse',
				filter:function(event,player){
					return typeof player.storage.waishi!='number'||player.storage.waishi>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>=ui.selected.cards.length;
				},
				filterCard:true,
				position:'he',
				check:function(card){
					if(!game.hasPlayer(function(current){
						return current!=_status.event.player&&current.countCards('h')>ui.selected.cards.length;
					})) return 0;
					return 6-get.value(card);
				},
				selectCard:function(){
					if(!ui.selected.targets.length) return [1,game.countGroup()];
					return [1,Math.min(ui.selected.targets[0].countCards('h'),game.countGroup())];
				},
				discard:false,
				lose:false,
				delay:0,
				content:function(){
					'step 0'
					if(typeof player.storage.waishi!='number') player.storage.waishi=1;
					player.storage.waishi--;
					player.lose(cards,ui.special);
					player.choosePlayerCard(target,true,'h',cards.length).chooseonly=true;
					'step 1'
					event.cards2=result.cards;
					target.lose(event.cards2,ui.special);
					'step 2'
					player.gain(event.cards2);
					target.gain(cards);
					player.$give(cards.length,target);
					target.$give(event.cards2.length,player);
					'step 3'
					game.delay(1.2);
					'step 4'
					if(target.countCards('h')>player.countCards('h')||player.group==target.group) player.draw();
				},
				ai:{
					result:{
						player:function(player,target){
							if(player.countCards('h')<target.countCards('h')||player.group==target.group) return 1;
							return 0.1;
						},
					},
				},
			},
			chijie:{
				audio:true,
				forbid:['guozhan'],
				trigger:{global:'gameDrawAfter'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.group!=player.group;
					});
				},
				content:function(){
					'step 0'
					var list=lib.group.filter(function(group){
						return group!=player.group&&game.hasPlayer(function(current){
							return current.group==group;
						});
					})
					if(!event.renshe) list.push('cancel2');
					player.chooseControl(list).set('prompt',event.renshe?'请选择一个势力':get.prompt('chijie')).set('prompt2',event.renshe?'':'将自己的势力变更为场上存在的一个势力').set('',function(){
						return list.randomGet();
					});
					'step 1'
					if(result.control!='cancel2'){
						if(!event.renshe) player.logSkill('chijie');
						player.changeGroup(result.control);
					}
				},
			},
		},
		dynamicTranslate:{
			twfengpo:function(player){
				if(player.storage.twfengpo) return '当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的红色牌数）。';
				return '①当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的♦数）。②当你杀死一名角色后，你将〖凤魄①〗中的“♦数”改为“红色牌数”。';
			},
		},
		translate:{
			tw_beimihu:'TW卑弥呼',
			nashime:'难升米',
			tw_xiahouba:'TW夏侯霸',
			tw_zumao:'TW祖茂',
			tw_caoang:'TW曹昂',
			tw_dingfeng:'TW丁奉',
			tw_caohong:'TW曹洪',
			tw_maliang:'TW马良',
			
			twyanqin:'姻亲',
			twyanqin_info:'准备阶段，你可以将势力变更为魏或蜀。',
			twbaobian:'豹变',
			twbaobian_info:'当你使用【杀】或【决斗】造成伤害时，若目标角色的势力与你相同，则你可以防止此伤害，然后其将手牌数补充至与体力值相同。若不同且其手牌数大于体力值，则你可以将其手牌弃置至与其体力值相同。',
			twtijin:'替巾',
			twtijin_info:'当你攻击范围内的一名其他角色使用【杀】指定另一名其他角色为目标时，你可以将此【杀】的目标改为你。若如此做，此【杀】结算完成后，你弃置该角色的一张牌。',
			twxiaolian:'孝廉',
			twxiaolian_info:'当一名其他角色使用【杀】指定另一名其他角色为目标时，你可以将此【杀】的目标改为你。若如此做，当你受到此【杀】的伤害后，你可以将一张牌放在此【杀】原目标的武将牌旁，称之为“马”。锁定技，场上的一名角色每有一张“马”，其他角色计算与其的距离便+1。',
			twqijia:'弃甲',
			twqijia_info:'出牌阶段，你可以弃置一张装备区内的牌（每种类型的装备牌限一次），然后视为对攻击范围内的一名其他角色使用了一张【杀】。',
			twzhuchen:'诛綝',
			twzhuchen_info:'出牌阶段，你可以弃置一张【桃】或【酒】并选择一名其他角色。你与其的距离视为1直到此阶段结束。',
			twhuzhu:'护主',
			twhuzhu_info:'出牌阶段限一次，若你的装备区内有牌，则你可以令一名其他角色交给你一张手牌，然后获得你装备区内的一张牌。若其体力值不大于你，则你可以令其回复1点体力。',
			twliancai:'敛财',
			twliancai_info:'结束阶段，你可以将武将牌翻面，然后获得一名其他角色装备区内的一张牌。当你的武将牌翻面时，你可以将手牌补至与体力值相同。',
			twrangyi:'攘夷',
			twrangyi2:'攘夷',
			twrangyi_info:'出牌阶段限一次，你可以将所有手牌交给一名其他角色，然后令其选择一项：1.使用其中的一张牌，并于此牌被使用时将其余的牌交还给你。2.受到来自你的1点伤害。',
			twbaimei:'白眉',
			twbaimei_info:'锁定技，若你没有手牌，则防止你受到的所有属性伤害和锦囊牌造成的伤害。',
			chijie:'持节',
			chijie_info:' 游戏开始时，你可以选择一个现存势力，你的势力视为该势力。 ',
			waishi:'外使',
			waishi_info:' 出牌阶段限一次，你可以用至多X张牌交换一名其他角色等量的手牌（X为现存势力数），然后若其与你势力相同或手牌多于你，你摸一张牌。',
			renshe:'忍涉',
			renshe_info:'当你受到伤害后，你可以选择一项：将势力改为现存的另一个势力；或可以额外发动一次“外使”直到你的下个出牌阶段结束；或与另一名其他角色各摸一张牌。',
			tw_gexuan:'TW葛玄',
			twdanfa:'丹法',
			twdanfa_info:'准备阶段或结束阶段开始时，你可将一张牌置于武将牌上，称为“丹”。每回合每种花色限一次，当你使用牌时，若“丹”中有与此牌花色相同的牌，则你摸一张牌。',
			twlingbao:'灵宝',
			twlingbao_info:'出牌阶段限一次，你可以将两张花色不同的“丹”置入弃牌堆。若这两张牌：均为红色，你令一名其他角色回复1点体力；均为黑色，你弃置一名其他角色区域内至多两张区域不同牌；颜色不同，则你令一名角色摸一张牌，并令另一名角色弃置一张牌。',
			twsidao:'司道',
			twsidao_info:'游戏开始时，你选择一张“法宝”置入装备区。准备阶段，若你以此法选择的法宝在牌堆/弃牌堆中，则你使用之。',
			gx_lingbaoxianhu:'灵宝仙壶',
			gx_lingbaoxianhu_info:'锁定技，当你造成点数大于1的伤害后，或有角色死亡后，你加1点体力上限并回复1点体力。',
			gx_taijifuchen:'太极拂尘',
			gx_taijifuchen_info:'锁定技，当你使用【杀】指定目标后，你令目标角色选择一项：①弃置一张牌，若此牌和【杀】花色相同，则你获得之。②其不可响应此【杀】。',
			gx_chongyingshenfu:'冲应神符',
			gx_chongyingshenfu_info:'锁定技。①当你受到牌造成的伤害后，你记录此牌的名称。②当你受到〖冲应神符①〗记录过的牌造成的伤害时，你令此牌伤害-1。',
			tw_dongzhao:'TW董昭',
			twmiaolve:'妙略',
			twmiaolve_info:'游戏开始时，你获得两张【瞒天过海】。当你受到1点伤害后，你可选择：①获得一张【瞒天过海】并摸一张牌。②获得一张智囊。',
			twyingjia:'迎驾',
			twyingjia_info:'一名角色的回合结束时，若你本回合内使用过两张或更多的同名锦囊牌，则你可弃置一张手牌并令一名角色进行一个额外回合。',
			dz_mantianguohai:'瞒天过海',
			dz_mantianguohai_info:'此牌不计入拥有者的手牌上限。出牌阶段，对一至两名区域内有牌的其他角色使用。你获得目标角色一张牌，然后依次交给每名目标角色各一张牌。',
			jiachong:'贾充',
			beini:'悖逆',
			beini_info:'出牌阶段限一次，你可以选择一名体力值不小于你的角色，令你或其摸两张牌，然后未摸牌的角色视为对摸牌的角色使用一张【杀】。',
			dingfa:'定法',
			dingfa_info:'弃牌阶段结束时，若本回合你失去的牌数不小于你的体力值，你可以选择一项：1、回复1点体力；2、对一名其他角色造成1点伤害。 ',
			duosidawang:'朵思大王',
			equan:'恶泉',
			equan_info:'锁定技。①当有角色于你的回合内受到伤害后，其获得X枚“毒”（X为伤害值）。②准备阶段，你令所有拥有“毒”标记的角色移去所有“毒”标记并失去等量的体力。③当有角色因〖恶泉②〗进入濒死状态时，你令其所有技能失效直到回合结束。',
			manji:'蛮汲',
			manji_info:'锁定技。其他角色失去体力后，若你的体力值：不大于该角色，你回复1点体力；不小于该角色，你摸一张牌。',
			wuban:'吴班',
			jintao:'进讨',
			jintao_info:'锁定技，你使用【杀】无距离限制且次数上限+1。你于出牌阶段内使用的第一张【杀】伤害+1，第二张【杀】不可被响应。',
			yuejiu:'乐就',
			cuijin:'催进',
			cuijin_info:'当你或你攻击范围内的角色使用【杀】时，你可以弃置一张牌并获得如下效果：此【杀】的伤害值基数+1，且当此【杀】结算结束后，若未造成过伤害，则你对使用者造成1点伤害。',
			tw_zhaoxiang:'TW赵襄',
			twfuhan:'扶汉',
			twfuhan_info:'限定技。准备阶段开始时时，你可以移去所有"梅影"标记，然后从五张未登场的蜀势力武将牌中选择一名获得其所有技能，将体力上限数调整为以此技能移去所有“梅影”标记的数量（最少为2，最多为8）并回复1点体力，然后从牌堆/弃牌堆/场上获得【梅影枪】。',
			twqueshi:'鹊拾',
			twqueshi_info:'游戏开始时，你将【梅影枪】置于你的装备区。',
			meiyingqiang:'梅影枪',
			meiyingqiang_info:'当你于其他角色的回合内第一次失去牌时，你可以使用一张【杀】。',
			tw_fuwan:'TW伏完',
			twmoukui:'谋溃',
			twmoukui_info:'当你使用【杀】指定目标后，你可以选择一项：①摸一张牌；②弃置该角色的一张牌；③背水：若此【杀】未因造成伤害而令该角色进入过濒死状态，则该角色弃置你的一张牌。',
			tw_yujin:'SP于禁',
			xinzhenjun:'镇军',
			xinzhenjun_info:'出牌阶段开始时，你可以将一张牌交给一名其他角色，令其选择是否使用一张不为黑色的【杀】。若其选择是，则你于此【杀】结算完成后摸1+X张牌(X为此【杀】造成的伤害总点数)。若其选择否，则你对其或其攻击范围内的一名其他角色造成1点伤害。',
			tw_hucheer:'TW胡车儿',
			twshenxing:'神行',
			twshenxing_info:'锁定技。若你的装备区内没有坐骑牌，则你至其他角色的距离-1且手牌上限+1。',
			twdaoji:'盗戟',
			twdaoji_info:'出牌阶段限一次，你可以弃置一张非基本牌并选择一名攻击范围内的角色，获得其一张牌。若你以此法获得的牌为：基本牌，你摸一张牌；装备牌，你使用此牌并对其造成1点伤害。',
			tw_hejin:'TW何进',
			twmouzhu:'谋诛',
			twmouzhu_info:'出牌阶段限一次，你可以选择一名其他角色A。你令除A外所有体力值小于等于你的其他角色依次选择是否交给你一张牌。若你以此法获得的牌数X：等于0，你和所有进行选择的角色依次失去1点体力。大于0，你令A选择由你视为对其使用一张伤害值基数为X的【杀】或【决斗】。',
			twyanhuo:'延祸',
			twyanhuo_info:'当你死亡时，你可以选择一项：①令一名其他角色弃置X张牌。②令X名其他角色依次弃置一张牌。（X为你的牌数）',
			tw_mayunlu:'TW马云禄',
			twfengpo:'凤魄',
			twfengpo_info:'①当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的♦数）。②当你杀死一名角色后，你将〖凤魄①〗中的“♦数”改为“红色牌数”。',
			tw_re_caohong:'TW手杀曹洪',
			tw_re_caohong_ab:'曹洪',
			twyuanhu:'援护',
			twyuanhu_info:'出牌阶段限一次。你可将一张装备牌置入一名角色的装备区内。若此牌为：武器牌，你弃置与其距离为1的另一名角色区域的一张牌；防具牌，其摸一张牌；坐骑牌，其回复1点体力。若其的体力值或手牌数不大于你，则你可摸一张牌，且可以于本回合的结束阶段再发动一次〖援护〗。',
			twjuezhu:'决助',
			twjuezhu_info:'限定技。准备阶段，你可废除一个坐骑栏，令一名角色获得〖飞影〗并废除判定区。该角色死亡后，你恢复以此法废除的装备栏。',
			tw_mobile:'移动版',
			tw_yijiang:'一将成名TW',
			tw_english:'英文版',
		}
	};
});
