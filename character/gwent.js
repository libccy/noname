'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'gwent',
		character:{
			gw_huoge:['male','qun',3,['yinzhang']],
			gw_aisinie:['female','wu',3,['huihun']],
			gw_enxier:['male','wei',4,['gwbaquan']],


			gw_kaerweite:['male','shu',4,['gwjiquan']],
			gw_falanxisika:['female','wu',3,['shewu']],
			gw_haluo:['male','qun',4,['nuhou']],

			gw_airuiting:['male','wei',4,['kuanglie']],
			gw_laduoweide:['male','wei',4,['gwxiaoshou']],
			gw_dagong:['male','qun',4,['tianbian']],

			// gw_bulanwang:['male','qun',4,['bolang']],
			// gw_kuite:['male','qun',3,[]],
			// gw_fuertaisite:['male','qun',3,[]],
			// gw_hengsaite:['male','wei',4,['jinsheng']],
			gw_fulisi:['male','qun',3,['lanquan']],
			gw_gaier:['male','shu',3,['hunmo']],

			gw_jieluote:['male','qun',6,['fayin']],
			gw_yenaifa:['female','qun',3,['xuezhou']],
			gw_telisi:['female','wei',3,['huandie']],
			gw_xili:['female','wu',3,['fengjian']],
			gw_luoqi:['male','wei',4,['gwzhanjiang']],
			gw_yioufeisi:['male','wu',4,['gwchuanxin']],

			gw_aigeleisi:['female','wu',3,['gwshenyu']],
			gw_aokeweisite:['male','qun',4,['yunhuo']],
			// gw_kaxier:['male','wu',4,[]],
			gw_luobo:['male','qun',3,['junchi']],
			gw_mieren:['male','shu',3,['lingji']],
			gw_sanhanya:['male','shu',3,['gwjinyan']],
			gw_shanhu:['female','qun',3,['shuijian']],
			// gw_zhangyujushou:['male','wu',4,[]],
			gw_zhuoertan:['male','wu',3,['hupeng']],
		},
		characterIntro:{
			gw_huoge:'那个老年痴呆?不知道他是活着还是已经被制成标本了!',
			gw_aisinie:'树精皇后有着熔银做成的眼睛，冰冷铸钢的心脏。',
			gw_gaier:'画作应该要传达情绪，而不是字句。',
			gw_enxier:'我可没什么耐心，最好小心点，否则脑袋不保',

			gw_yenaifa:'魔法是艺术、混沌与科学的结合。因为魔法的确是一门技艺也是一种诅咒。',
			gw_telisi:'我可以照顾我自己，相信我。',
			gw_jieluote:'如果要付出这种代价才能拯救世界，那最好还是让世界消逝吧。',
			gw_xili:'我想去哪，就去哪。',
			gw_luoqi:'是个爱国者…还是个货真价实的王八蛋。',
			gw_yioufeisi:'国王还是乞丐，两者有何区别，人类少一个算一个',
		},
		skill:{
			lingji:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					player.draw(2);
					'step 1'
					player.chooseToDiscard('he',2,true).ai=function(card){
						var val=get.value(card);
						if(ui.selected.cards.length){
							if(get.suit(card)==get.suit(ui.selected.cards[0])) val++;
							if(get.number(card)==get.number(ui.selected.cards[0])) val+=3;
						}
						return val;
					}
					'step 2'
					if(result.cards.length==2){
						var list=[];
						if(get.suit(result.cards[0])==get.suit(result.cards[1])){
							var list1=get.typeCard('spell_bronze');
							if(list1.length){
								list.push(game.createCard(list1.randomGet()));
							}
						}
						if(get.number(result.cards[0])==get.number(result.cards[1])){
							var list2=get.typeCard('spell_silver');
							if(list2.length){
								list.push(game.createCard(list2.randomGet()));
							}
						}
						if(list.length){
							player.gain(list,'gain2');
						}
					}
				},
				ai:{
					order:8,
					result:{
						player:1
					}
				}
			},
			gwjinyan:{
				trigger:{player:['damageBegin','loseHpBegin']},
    			forced:true,
    			priority:-55,
    			mark:true,
    			filter:function(event,player){
					if(game.roundNumber%3==0) return false;
    				return player.hp-event.num<2;
    			},
    			content:function(){
    				trigger.num=Math.max(0,player.hp-2);
    			},
				group:['gwjinyan_gain','gwjinyan_hp'],
				subSkill:{
					gain:{
						trigger:{player:'phaseBegin'},
						frequent:true,
						filter:function(){
							return game.roundNumber%3==0;
						},
						content:function(){
							var list=get.typeCard('spell_gold');
							if(list.length){
								player.gain(game.createCard(list.randomGet()),'gain2');
							}
						}
					},
					hp:{
						trigger:{global:'roundStart'},
						forced:true,
						filter:function(event,player){
							if(game.roundNumber%3==0) return false;
							return player.hp<2;
						},
						content:function(){
							player.hp=2;
							if(player.maxHp<player.hp){
								player.maxHp=player.hp;
							}
							player.update();
						}
					}
				},
    			ai:{
					threaten:function(){
						if(game.roundNumber%3==0) return 1.6;
						return 0.8;
					},
    				effect:{
    					target:function(card,player,target){
							if(game.roundNumber%3==0) return;
    						if(get.tag(card,'damage')||get.tag(card,'loseHp')){
    							if(target.hp<=game.roundNumber%3) return 0;
    						}
    					}
    				}
    			}
			},
			gwshenyu:{
				trigger:{player:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					if(game.hasPlayer(function(current){
						return current.isDamaged();
					})){
						return true;
					}
					for(var i=0;i<ui.discardPile.childElementCount;i++){
						var card=ui.discardPile.childNodes[i];
						if(card.storage.vanishtag.contains('gwshenyu')) continue;
						if(get.type(card)=='spell'&&get.subtype(card)!='spell_gold'){
							return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<ui.discardPile.childElementCount;i++){
						var card=ui.discardPile.childNodes[i];
						if(card.storage.vanishtag.contains('gwshenyu')) continue;
						if(get.type(card)=='spell'&&get.subtype(card)!='spell_gold'){
							list.push(card);
						}
					}
					event.list=list;
					player.chooseTarget(get.prompt('gwshenyu'),function(card,player,target){
						return list.length||target.isDamaged();
					}).ai=function(target){
						var att=get.attitude(player,target);
						if(att<=0) return 0;
						var num=1;
						if(player==target){
							num+=1;
						}
						if(target.hp==1){
							num+=2;
						}
						return num*att;
					};
					'step 1'
    				if(result.bool){
    					player.logSkill('gwshenyu',result.targets);
						event.target=result.targets[0];
						if(!event.list.length){
							event.target.recover();
							event.finish();
						}
						else if(event.target.isHealthy()){
							event.directbool=true;
						}
						else{
							event.target.chooseControl(function(event,player){
								if(player.hp>=3&&!player.needsToDiscard()) return 1;
								if(player.hp==2&&player.hasShan()&&player.countCards('h')<=1) return 1;
								return 0;
							}).set('choiceList',[
								'回复一点体力','从弃牌堆中获得一张非金法术'
							]);
						}
    				}
					else{
						event.finish();
					}
					'step 2'
					if(!event.directbool&&result.index==0){
						event.target.recover();
						event.finish();
					}
					'step 3'
					var list=event.list;
					if(list.length){
						event.target.chooseCardButton('选择一张法术牌',list,true).ai=function(button){
							return get.value(button.link);
						};
					}
					else{
						event.finish();
					}
					'step 4'
					if(result.bool){
						result.links[0].storage.vanishtag.add('gwshenyu');
						event.target.gain(result.links,'gain2','log');
					}
				},
				ai:{
					threaten:2,
					expose:0.2
				}
			},
			junchi:{
				trigger:{global:'shaAfter'},
				direct:true,
				filter:function(event,player){
					return event.player!=player&&event.target!=player&&event.target.isIn()&&player.hasCard(function(card){
						return player.canUse(card,event.target,false)&&!get.info(card).multitarget;
					});
				},
				content:function(){
					var next=player.chooseToUse(get.prompt('junchi'),trigger.target,-1).set('targetRequired',true);
					next.prompt2='对'+get.translation(trigger.target)+'使用一张牌，并摸一张牌';
					next.filterCard=function(card){
						return player.canUse(card,trigger.target,false)&&!get.info(card).multitarget;
					};
					next.oncard=function(){
						player.draw();
					};
					next.logSkill='junchi';
				},
				subSkill:{
					gold:{
						trigger:{global:'useCardAfter'},
						frequent:true,
						filter:function(event,player){
							return event.player!=player&get.subtype(event.card)=='spell_gold';
						},
						content:function(){
							player.insertPhase();
						}
					}
				},
				group:'junchi_gold'
			},
			junchi_old:{
				trigger:{global:'shaAfter'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.player!=player&&event.target!=player&&event.player.isIn()&&event.player.countCards('he');
				},
				content:function(){
					'step 0'
					var att=get.attitude(trigger.player,player);
					trigger.player.chooseCard('he','是否交给'+get.translation(player)+'一张牌？').ai=function(card){
						if(att>1){
							if(trigger.target.isIn()){
								return 9-get.value(card);
							}
							return 4-get.value(card);
						}
						return 0;
					}
					'step 1'
					if(result.bool){
						player.logSkill('junchi');
						player.gain(result.cards,trigger.player);
						if(get.position(result.cards[0])=='h'){
							trigger.player.$giveAuto(result.cards,player);
						}
						else{
							trigger.player.$give(result.cards,player);
						}
						trigger.player.addExpose(0.2);
						trigger.player.line(player,'green');
					}
					else{
						event.finish();
					}
					'step 2'
					if(trigger.target.isIn()){
						var next=player.chooseToUse('是否对'+get.translation(trigger.target)+'使用一张牌？',trigger.target,-1).set('targetRequired',true);
						next.filterCard=function(card){
							return player.canUse(card,trigger.target,false)&&!get.info(card).multitarget;
						};
						next.oncard=function(){
							player.recover();
							trigger.player.draw();
						}
					}
				}
			},
			hupeng:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				check:function(card){
					return 7-get.value(card);
				},
				filterTarget:true,
				content:function(){
					'step 0'
					var att=get.attitude(player,target);
					player.chooseVCardButton('选择令'+get.translation(target)+'获得的牌',['gw_dudayuanshuai1','gw_dudayuanshuai2'],true).ai=function(button){
						if(att>0){
							return button.link[2]=='gw_dudayuanshuai1'?1:-1;
						}
						else{
							return button.link[2]=='gw_dudayuanshuai2'?1:-1;
						}
					}
					'step 1'
					if(result.bool){
						target.gain(game.createCard(result.links[0][2]),'gain2');
					}
				},
				ai:{
					threaten:1.5,
					order:6,
					result:{
						target:function(player,target){
							var nh=target.countCards('h');
							if(get.attitude(player,target)>0){
								if(!nh) return 3;
								if(!target.needsToDiscard(1)){
									if(nh==1) return 2.5;
									return 2;
								}
								if(!target.needsToDiscard()) return 1;
								return 0.1;
							}
							else{
								if(!nh) return -0.05;
								if(target.hp==1) return -1;
								if(target.hp==2) return -2.5;
								if(target.hp==3) return -2;
								return -0.5;
							}
						}
					}
				},
				global:['hupeng2','hupeng3','hupeng4']
			},
			hupeng2:{
				mod:{
					cardDiscardable:function(card,player){
    					if(card.name=='gw_dudayuanshuai2') return false;
    				},
    				cardEnabled:function(card,player){
    					if(card.name=='gw_dudayuanshuai2') return false;
    				},
    				cardUsable:function(card,player){
    					if(card.name=='gw_dudayuanshuai2') return false;
    				},
    				cardRespondable:function(card,player){
    					if(card.name=='gw_dudayuanshuai2') return false;
    				},
    				cardSavable:function(card,player){
    					if(card.name=='gw_dudayuanshuai2') return false;
    				},
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.countCards('h','gw_dudayuanshuai1')&&get.attitude(player,target)<0){
								return 0.4;
							}
						}
					}
				}
			},
			hupeng3:{
				trigger:{player:'phaseEnd'},
				silent:true,
				filter:function(event,player){
					return player.countCards('h','gw_dudayuanshuai2');
				},
				content:function(){
					var hs=player.getCards('h');
					var hs2=player.getCards('h','gw_dudayuanshuai2');
					hs.remove(hs2);
					if(hs.length){
						hs2.addArray(hs.randomGets(hs2.length));
					}
					player.discard(hs2);
				}
			},
			hupeng4:{
				trigger:{target:'useCardToBefore'},
				forced:true,
				popup:false,
				filter:function(event,player){
					if(event.player==player) return false;
					var num=player.countCards('h','gw_dudayuanshuai1');
					return num>0;
				},
				content:function(){
					'step 0'
					player.chooseToUse({name:'gw_dudayuanshuai1'},'是否对'+get.translation(trigger.card)+'使用【杜达元帅】？').set('ai1',function(card){
						return _status.event.bool;
					}).set('bool',-get.effect(player,trigger.card,trigger.player,player));
					trigger.gw_dudayuanshuai1=true;
					'step 1'
					delete trigger.gw_dudayuanshuai1;
				}
			},
			hunmo:{
				enable:'phaseUse',
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return lib.skill.hunmo.filterTarget(null,player,current);
					});
				},
				filterTarget:function(card,player,target){
					if(target==player) return false;
					if(target.hasSkill('hunmo2')) return false;
					var nh=player.countCards('h');
					var nh2=target.countCards('h');
					if(nh<2) return nh2<2;
					else return nh2>=2;
				},
				content:function(){
					'step 0'
					target.addTempSkill('hunmo2');
					player.addTempSkill('hunmo3');
					if(player.countCards('h')<2){
						game.asyncDraw([target,player]);
					}
					else{
						player.chooseToDiscard('h',true).delay=false;
						target.chooseToDiscard('h',true).delay=false;
					}
					'step 1'
					game.delay();
					if(typeof player.storage.hunmo!='number'){
						player.storage.hunmo=1;
					}
					else{
						player.storage.hunmo++;
					}
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						if(player.countCards('h')<2) return 11;
						return 6;
					},
					threaten:1.2,
					result:{
						target:function(player,target){
							if(player.countCards('h')<2) return 1;
							if(player.hasCard(function(card){
								return get.value(card)<=5
							})){
								return -1;
							}
						}
					}
				},
				group:'hunmo_draw',
				subSkill:{
					draw:{
						trigger:{player:'phaseEnd'},
						filter:function(event,player){
							return player.hasSkill('hunmo3')&&player.countCards('h')<2;
						},
						frequent:true,
						content:function(){
							var num=2-player.countCards('h');
							if(num>0) player.draw(num);
						}
					},
				}
			},
			hunmo2:{},
			hunmo3:{},
			shuijian:{
				trigger:{player:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					var targets=player.getEnemies();
					var num=0;
					for(var i=0;i<targets.length;i++){
						num+=get.sgn(get.effect(targets[i],{name:'wanjian'},player,player));
					}
					event.targets=targets;
					player.chooseToDiscard(get.prompt('shuijian')).set('ai',function(card){
						if(num>=3) return 10-get.value(card);
						if(num>=2) return 9-get.value(card);
						if(num>=1) return 7-get.value(card);
						return 0;
					}).logSkill='shuijian';
					'step 1'
					if(result.bool){
						for(var i=0;i<event.targets.length;i++){
							event.targets[i].addExpose(0.1);
						}
						player.useCard({name:'wanjian'},event.targets);
					}
				},
				ai:{
					threaten:1.6
				}
			},
			yunhuo:{
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return game.roundNumber%4==0&&event.skill!='yunhuo';
				},
				forced:true,
				content:function(){
					'step 0'
					player.insertPhase();
					event.list=player.getEnemies().sortBySeat();
					'step 1'
					if(event.list.length){
						var target=event.list.shift();
						player.line(target,'fire');
						if(target.countCards('h')){
							target.randomDiscard('h',false);
						}
						else{
							target.damage('fire');
						}
						event.redo();
					}
					'step 2'
					game.delayx();
				}
			},
			yinzhang:{
    			enable:'phaseUse',
    			usable:1,
    			filterCard:true,
    			position:'he',
    			check:function(card){
    				return 8-get.value(card)
    			},
    			content:function(){
    				'step 0'
					var list=get.typeCard('spell_silver').randomGets(3);
					if(!list.length){
						event.finish();
						return;
					}
					var dialog=ui.create.dialog('选择一张加入你的手牌',[list,'vcard'],'hidden');
    				player.chooseButton(dialog,true);
    				'step 1'
    				player.gain(game.createCard(result.links[0][2]),'draw');
    			},
    			ai:{
    				order:8,
					threaten:1.3,
    				result:{
    					player:1
    				},
    			}
    		},
			tianbian:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				content:function(){
					'step 0'
					var num1=0,num2=0;
					var choice;
					if(player.hasUnknown(2)){
						if(game.dead.length==0){
							choice='选项二';
						}
						else{
							choice='cancel2';
						}
					}
					else{
						game.countPlayer(function(current){
							var att=get.attitude(player,current);
							if(att>0){
								num1++;
							}
							else if(att<0){
								num2++;
							}
						});
						choice=(num1>num2)?'选项一':'选项二';
					}
					player.chooseControl('选项一','选项二','cancel2',function(){
						return choice;
					}).set('prompt',get.prompt('tianbian')).set('choiceList',['随机使用一张对全场有正面效果的牌','随机使用一张对全场有负面效果的牌']);
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('tianbian');
						var list=[];
						for(var i in lib.card){
							if(lib.inpile.contains(i)&&
							lib.card[i].selectTarget==-1&&
							lib.card[i].type!='equip'&&
							lib.card[i].ai&&lib.card[i].ai.tag&&
							lib.card[i].ai.tag.multitarget){
								if(lib.card[i].ai.tag.multineg){
									if(result.control=='选项二'){
										list.push(i);
									}
								}
								else{
									if(result.control=='选项一'){
										list.push(i);
									}
								}
							}
						}
						var name=null;
						while(list.length){
							name=list.randomRemove();
							if(game.hasPlayer(function(current){
								return player.canUse(name,current)
							})){
								break;
							}
							else{
								name=null;
							}
						}
						if(name){
							var targets=game.filterPlayer(function(current){
								return player.canUse(name,current);
							});
							targets.sortBySeat();
							player.useCard({name:name},targets);
						}
					}
				}
			},
			gwxiaoshou:{
				enable:'phaseUse',
				usable:2,
				filterTarget:function(card,player,target){
					return target.isMaxHp();
				},
				check:function(card){return 7-get.value(card);},
				position:'he',
				filterCard:true,
				content:function(){
					target.damage();
				},
				ai:{
					result:{
						target:function(player,target){
							return get.damageEffect(target,player);
						},
					},
					order:7
				}
			},
			kuanglie:{
				trigger:{player:'useCardToBegin'},
				filter:function(event,player){
					return event.target&&event.target!=player&&event.target.countCards('he')&&get.color(event.card)=='black';
				},
				init:function(player){
					player.storage.kuanglie=0;
				},
				forced:true,
				content:function(){
					trigger.target.randomDiscard();
					player.storage.kuanglie++;
					if(player.storage.kuanglie%2==0){
						player.draw();
					}
				}
			},
			kuanglie2:{},
			gwjiquan:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he');
				},
				selectTarget:[1,Infinity],
				content:function(){
					'step 0'
					player.gainPlayerCard(target,'he',true);
					'step 1'
					target.useCard({name:'sha'},player);
				},
				ai:{
					threaten:1.4,
					order:7,
					result:{
						target:function(player,target){
							if(player.getEquip('tengjia')||player.getEquip('bagua')) return -1;
							if(get.effect(player,{name:'sha'},target,player)>=0) return -1;
							if(!player.hasShan()){
								if(ui.selected.targets.length) return 0;
								if(player.hp>=4) return -1;
								if(player.hp>=3&&target.hp==1) return -1;
								return 0;
							}
							var num=player.countCards('h','shan');
							if(num<1){
								num=1;
							}
							if(ui.selected.targets.length>=num){
								return 0;
							}
							return -1;
						}
					}
				}
			},
			nuhou:{
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:true,
				check:function(card){
					return 7-get.value(card)
				},
				content:function(){
					'step 0'
					var list=player.getEnemies();
					list.sortBySeat();
					event.list=list;
					'step 1'
					if(event.list.length){
						var current=event.list.shift();
						var he=current.getCards('he');
						player.line(current,'green');
						if(he.length){
							current.discard(he.randomGet());
							current.addExpose(0.2);
						}
						event.redo();
					}
				},
				ai:{
					order:8.5,
					result:{
						player:1
					},
				},
			},
			shewu:{
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:true,
				selectCard:[1,3],
				check:function(card){
					if(!ui.selected.cards.length){
						return 8-get.value(card)
					}
					var player=_status.event.player;
					if(player.isDamaged()){
						var hs=player.getCards('h');
						var num=0;
						for(var i=0;i<hs.length;i++){
							if(get.value(hs[i])<6){
								num++;
							}
						}
						if(num>=3){
							return 6-get.value(card);
						}
					}
					return 0;
				},
				content:function(){
					player.draw(3);
					if(cards.length>=2){
						player.addTempSkill('shewu_dist');
					}
					if(cards.length==3){
						player.recover();
					}
				},
				ai:{
					order:4,
					result:{
						player:1
					},
					threaten:1.6
				},
				subSkill:{
					dist:{
						mod:{
							targetInRange:function(){
								return true;
							}
						}
					}
				}
			},
			gwzhanjiang:{
				trigger:{global:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('gwzhanjiang2')&&event.player!=player;
				},
				content:function(){
					'step 0'
					var bool=(get.effect(trigger.player,{name:'sha'},player,player)>0&&
						Math.abs(get.attitude(player,trigger.player))>1&&
						game.hasPlayer(function(current){
						return get.attitude(current,player)>0&&current.hasSha();
					}));
					var next=player.chooseToDiscard(get.prompt('gwzhanjiang',trigger.player),'he');
					next.ai=function(card){
						if(bool) return 7-get.value(card);
						return 0;
					};
					next.logSkill=['gwzhanjiang',trigger.player];
					'step 1'
					if(result.bool){
						player.addTempSkill('gwzhanjiang2',{player:'phaseBegin'});
						event.targets=game.filterPlayer(function(current){
							return current!=trigger.player;
						});
						event.targets.sortBySeat(trigger.player);
						event.num=0;
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.targets.length){
						event.current=event.targets.shift();
						if(event.current.hasSha()){
							event.current.chooseToUse({name:'sha'},'是否对'+get.translation(trigger.player)+'使用一张杀？',trigger.player,-1).oncard=function(card,player){
								player.draw();
							};
						}
						else{
							event.redo();
						}
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.bool){
						event.num++;
						if(event.num>=2){
							return;
						}
					}
					event.goto(2);
				},
				ai:{
					expose:0.2,
					threaten:1.4
				},
			},
			gwzhanjiang2:{},
			gwzhanjiang3:{
				trigger:{player:'useCard'},
				filter:function(event){
					return event.card.name=='sha'&&event.getParent(2).name=='gwzhanjiang';
				},
				forced:true,
				popup:false,
				content:function(){
					player.draw();
				}
			},
			gwchuanxin_old:{
				trigger:{player:'shaAfter'},
				filter:function(event,player){
					if(player.storage.gwchuanxin&&player.storage.gwchuanxin.length>=4) return false;
					return event.target.isAlive();
				},
				check:function(event,player){
					return get.effect(event.target,{name:'sha'},player,player)>0
				},
				logTarget:'target',
				logLine:false,
				content:function(){
					'step 0'
					event.card=get.cards()[0];
					player.showCards(event.card,get.translation(player)+'对'+get.translation(trigger.player)+'发动了【穿心】');
					'step 1'
					if(player.storage.gwchuanxin&&!player.storage.gwchuanxin.contains(get.suit(event.card))){
						player.useCard({name:'sha'},[event.card],trigger.target,false);
					}
				},
				group:['gwchuanxin_count1','gwchuanxin_count2'],
				subSkill:{
					count1:{
						trigger:{global:'phaseBegin'},
						silent:true,
						content:function(){
							player.storage.gwchuanxin=[];
						}
					},
					count2:{
						trigger:{player:'useCard'},
						silent:true,
						// filter:function(event){
						// 	return event.card&&event.card.name=='sha';
						// },
						content:function(){
							for(var i=0;i<trigger.cards.length;i++){
								player.storage.gwchuanxin.add(get.suit(trigger.cards[i]));
							}
						}
					}
				},
				ai:{
					presha:true,
				}
			},
			gwchuanxin:{
				trigger:{player:'shaAfter'},
				filter:function(event,player){
					return event.target.isAlive();
				},
				check:function(event,player){
					return get.effect(event.target,{name:'sha'},player,player)>0
				},
				logTarget:'target',
				// logLine:false,
				content:function(){
					'step 0'
					var cards=get.cards();
					player.showCards(cards,get.translation(player)+'发动了【穿心】');
					event.bool=(get.color(cards[0])=='black');
					'step 1'
					if(event.bool){
						player.useCard({name:'sha'},trigger.target,false).animate=false;
					}
				},
				mod:{
					attackFrom:function(from,to,distance){
						return distance-from.hp;
					}
				}
			},
			fengjian:{
				trigger:{player:'useCard'},
				direct:true,
				filter:function(event,player){
					var type=get.type(event.card,'trick');
					return type=='trick'&&game.hasPlayer(function(current){
						return player.canUse('sha',current,false)&&!event.targets.contains(current);
					});
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('fengjian'),function(card,player,target){
						return player.canUse('sha',target,false)&&!trigger.targets.contains(target);
					}).ai=function(target){
						return get.effect(target,{name:'sha',nature:'thunder'},player,player);
					}
					"step 1"
					if(result.bool){
						player.logSkill('fengjian');
						if(!event.isMine()){
							game.delay();
						}
						player.useCard({name:'sha',nature:'thunder'},result.targets,false);
						player.addTempSkill('qianxing',{player:'phaseBegin'});
					}
				},
				ai:{
					expose:0.2,
					threaten:1.5,
					noautowuxie:true,
				},
				// group:'fengjian_hide',
				// subSkill:{
				// 	hide:{
				// 		trigger:{source:'damageEnd'},
				// 		forced:true,
				// 		popup:false,
				// 		filter:function(event,player){
				// 			return event.getParent(3).name=='fengjian';
				// 		},
				// 		content:function(){
				// 			player.addTempSkill('qianxing',{player:'phaseBegin'});
				// 		}
				// 	}
				// }
			},
			huandie:{
				trigger:{player:'phaseBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('huandie'),[0,game.countPlayer()],function(card,player,target){
						return target!=player;
					}).ai=function(target){
						return get.attitude(player,target);
					}
					'step 1'
					if(result.bool){
						result.targets.sortBySeat();
						result.targets.unshift(player);
						player.logSkill('huandie',result.targets);
						game.asyncDrawAuto(result.targets,function(current){
							return current==player?1:2;
						});
						player.addTempSkill('huandie_discard');
					}
				},
				ai:{
					threaten:1.5
				},
				subSkill:{
					discard:{
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return game.hasPlayer(function(current){
								return current.countCards('h')>current.hp;
							});
						},
						logTarget:function(){
							return game.filterPlayer(function(current){
								return current.countCards('h')>current.hp;
							}).sortBySeat();
						},
						content:function(){
							'step 0'
							var list=game.filterPlayer(function(current){
								return current.countCards('h')>current.hp;
							}).sortBySeat();
							event.list=list;
							'step 1'
							if(event.list.length){
								event.list.shift().chooseToDiscard('h',true,2);
								event.redo();
							}
						}
					}
				}
			},
			xuezhou:{
				trigger:{player:'phaseBegin'},
				direct:true,
				unique:true,
				forceunique:true,
				intro:{
					content:function(storage,player){
						var name=get.translation(player);
						if(storage==1){
							return '每当一名角色（'+name+'除外）受到一次伤害，该角色失去一点体力，'+name+'回复一点体力';
						}
						else if(storage==2){
							return '每当一名角色（'+name+'除外）造成一次伤害，该角色失去一点体力，'+name+'（若不是受伤害角色）回复一点体力';
						}
						else{
							return '未发动';
						}
					}
				},
				content:function(){
					'step 0'
					var next=player.chooseControl('选项一','选项二','cancel2',function(){
						if(Math.random()<0.65) return 0;
						return 1;
					});
					next.prompt=get.prompt('xuezhou');
					next.choiceList=[
						'每当一名其他角色受到一次伤害，该角色失去一点体力，你回复一点体力',
						'每当一名其他角色造成一次伤害，该角色失去一点体力，你（若不是受伤害角色）回复一点体力'
					];
					'step 1'
					if(result.control=='cancel2'){
						player.unmarkSkill('xuezhou');
						delete _status.xuezhou;
					}
					else{
						player.logSkill('xuezhou');
						player.storage.xuezhou=result.index+1;
						player.syncStorage('xuezhou');
						player.markSkill('xuezhou');
						_status.xuezhou=player;
					}
				},
				ai:{
					threaten:2.5
				},
				global:'xuezhou_hp'
			},
			xuezhou_hp:{
				trigger:{source:'damageEnd',player:'damageEnd'},
				filter:function(event,player){
					if(!_status.xuezhou) return false;
					if(player==_status.xuezhou) return false;
					if(!player.isIn()||!_status.xuezhou.isIn()) return false;
					switch(_status.xuezhou.storage.xuezhou){
						case 1:return player==event.player;
						case 2:return player==event.source;
						default:return false;
					}
				},
				silent:true,
				content:function(){
					'step 0'
					game.delayx();
					'step 1'
					_status.xuezhou.logSkill('xuezhou',player);
					player.loseHp();
					if(_status.xuezhou!=trigger.player){
						_status.xuezhou.recover();
					}
				}
			},
			fayin:{
				trigger:{player:'shaBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					var target=trigger.target;
					var bool=get.attitude(player,target)<0;
					var next=player.chooseToDiscard('he',get.prompt('fayin',target));
					next.ai=function(card){
						if(bool) return 7-get.value(card);
						return 0;
					};
					next.logSkill=['fayin',target];
					'step 1'
					if(result.bool){
						var target=trigger.target;
						var num=5;
						if(target.isMad()){
							num=4;
						}
						switch(Math.floor(Math.random()*num)){
							case 0:target.randomDiscard(2);break;
							case 1:target.damage('fire');break;
							case 2:player.changeHujia();break;
							case 3:target.turnOver();target.draw();break;
							case 4:target.goMad({player:'phaseBegin'});break;
						}
					}
				}
			},
			gwbaquan:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				content:function(){
					'step 0'
					var hs=target.getCards('h');
					player.gain(hs,target);
					target.$giveAuto(hs,player);
					event.hs=hs;
					'step 1'
					var damage=(target.hp>=player.hp&&get.damageEffect(target,player,player)>0);
					var hs=event.hs;
					if(damage&&target.hp>1){
						for(var i=0;i<hs.length;i++){
							if(get.value(hs[i],player,'raw')>=8){
								damage=false;break;
							}
						}
					}
					player.chooseCard(hs.length,true,'选择还给'+get.translation(target)+'的牌').ai=function(card){
						if(damage){
							return hs.contains(card)?1:0;
						}
						else{
							return -get.value(card,player,'raw');
						}
					}
					if(!event.isMine()) game.delay();
					'step 2'
					target.gain(result.cards,player);
					player.$giveAuto(result.cards,target);
					event.hs2=result.cards;
					if(player.hp>target.hp){
						event.finish();
					}
					'step 3'
					for(var i=0;i<event.hs2.length;i++){
						if(!event.hs.contains(event.hs2[i])) return;
					}
					player.line(target);
					target.damage();
				},
				ai:{
					order:11,
					result:{
						target:function(player,target){
							return -Math.sqrt(target.countCards('h'));
						}
					}
				}
			},
			hunmo_old:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target.countCards('h')!=Math.min(3,player.hp);
				},
				selectTarget:[1,3],
				content:function(){
					var dh=Math.min(3,player.hp)-target.countCards('h');
					if(dh>0){
						target.draw(dh,false);
						target.$draw(dh);
						game.delay(0.5);
					}
					else if(dh<0){
						target.chooseToDiscard(-dh,true);
						if(player!=target) player.useCard({name:'sha'},target,false);
					}
				},
				ai:{
					order:11,
					result:{
						target:function(player,target){
							var dh=Math.min(3,player.hp)-target.countCards('h');
							if(dh<0){
								dh+=get.sgn(get.effect(target,{name:'sha'},player,target));
							}
							return dh;
						}
					}
				}
			},
			hunmo_old2:{
				trigger:{player:['phaseBegin','phaseEnd']},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('hunmo'),[1,game.countPlayer()],function(card,player,target){
						return target.countCards('h')!=Math.min(3,target.hp);
					}).ai=function(target){
						return get.attitude(player,target)*(Math.min(3,target.hp)-target.countCards('h'));
					}
					'step 1'
					if(result.bool){
						player.logSkill('hunmo',result.targets);
						event.targets=result.targets.slice(0);
						event.targets.sortBySeat();
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.targets.length){
						var target=event.targets.shift();
						var dh=Math.min(3,target.hp)-target.countCards('h');
						if(dh>0){
							target.draw(dh,false);
							target.$draw(dh);
						}
						else if(dh<0){
							target.chooseToDiscard(-dh,true).delay=false;
						}
						game.delay(0.5);
						event.redo();
					}
				}
			},
			huihun:{
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					if(!player.storage.huihun) return false;
					for(var i=0;i<player.storage.huihun.length;i++){
						if(get.position(player.storage.huihun[i])=='d') return true;
					}
					return false;
				},
				frequent:true,
				content:function(){
					var list=[];
					for(var i=0;i<player.storage.huihun.length;i++){
						if(get.position(player.storage.huihun[i])=='d'){
							list.push(player.storage.huihun[i]);
							if(list.length>=2) break;
						}
					}
					player.gain(list,'gain2','log');
				},
				ai:{
					threaten:1.8,
				},
				group:['huihun_count','huihun_count2'],
				subSkill:{
					count:{
						trigger:{player:'useCard'},
						silent:true,
						filter:function(event,player){
							return _status.currentPhase==player;
						},
						content:function(){
							if(!player.storage.huihun){
								player.storage.huihun=[];
							}
							for(var i=0;i<trigger.cards.length;i++){
								if(get.color(trigger.cards[i])=='red'){
									player.storage.huihun.add(trigger.cards[i]);
								}
							}
						}
					},
					count2:{
						trigger:{player:'phaseAfter'},
						silent:true,
						content:function(){
							delete player.storage.huihun;
						}
					}
				}
			},
			lanquan:{
				enable:'phaseUse',
				usable:1,
				onChooseToUse:function(event){
					var cards=[];
					var num=6;
					if(ui.cardPile.childNodes.length<num){
						var discardcards=get.cards(num);
						for(var i=0;i<discardcards.length;i++){
							ui.discardPile.appendChild(discardcards[i]);
						}
					}
					for(var i=0;i<num;i++){
						cards.push(ui.cardPile.childNodes[i]);
					}
					event.set('lanquancards',cards);
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('选择一张牌使用',event.lanquancards);
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							var type=get.type(button.link,'trick');
							return evt.filterCard(button.link,player,evt);
						}
						return false;
					},
					check:function(button){
						return get.value(button.link);
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false},
							selectCard:-1,
							viewAs:links[0],
						}
					},
					prompt:function(links,player){
						return '选择'+get.translation(links)+'的目标';
					}
				},
				ai:{
					order:12,
					result:{
						player:1
					},
					threaten:1.5
				}
			},
		},
		card:{
			gw_dudayuanshuai1:{
				type:'special',
				fullimage:true,
				derivation:'gw_zhuoertan',
				vanish:true,
				addinfo:'小伙伴',
				notarget:true,
				content:function(){
					var evt=event.getParent(3)._trigger;
					if(evt.gw_dudayuanshuai1){
						evt.untrigger();
		                evt.finish();
					}
					if(evt.cards){
						player.gain(evt.cards,'gain2');
					}
				},
				ai:{
					value:10,
					useful:9,
					result:{
						player:1
					},
				}
			},
			gw_dudayuanshuai2:{
				type:'special',
				fullimage:true,
				derivation:'gw_zhuoertan',
				vanish:true,
				addinfo:'捣蛋鬼',
			},
		},
		translate:{
			gw_huoge:'霍格',
			gw_aisinie:'埃丝涅',
			gw_gaier:'盖尔',
			gw_enxier:'恩希尔',
			gw_kuite:'奎特',
			gw_dagong:'达贡',
			gw_airuiting:'艾瑞汀',
			gw_fuertaisite:'弗泰斯特',
			gw_falanxisika:'法兰西斯卡',
			gw_haluo:'哈洛',
			gw_hengsaite:'亨赛特',
			gw_kaerweite:'卡尔维特',
			gw_bulanwang:'布兰王',
			gw_fulisi:'符里斯',
			gw_laduoweide:'拉多维德',

			gw_jieluote:'杰洛特',
			gw_yenaifa:'叶奈法',
			gw_telisi:'特莉斯',
			gw_xili:'希里',
			gw_luoqi:'罗契',
			gw_yioufeisi:'伊欧菲斯',

			gw_aigeleisi:'艾格蕾斯',
			gw_aokeweisite:'奥克维斯特',
			gw_kaxier:'卡西尔',
			gw_luobo:'萝卜',
			gw_mieren:'米尔恩',
			gw_sanhanya:'三寒鸦',
			gw_shanhu:'珊瑚',
			gw_zhangyujushou:'章鱼巨兽',
			gw_zhuoertan:'卓尔坦',

			bolang:'搏浪',
			bolang_info:'准备阶段，你可以观看牌堆顶的6张牌，然后将其中至多3张移入弃牌堆；每当你造成一次伤害，你可以从弃牌堆中获得一张以此法移入弃牌堆的牌',
			lingji:'灵计',
			lingji_info:'出牌阶段限一次，你可以摸两张牌并弃置两张牌，若弃置的牌花色相同，你获得一张随机铜卡；若弃置的牌点数相同，你获得一张随机银卡',
			gwjinyan:'金焰',
			gwjinyan_info:'锁定技，准备阶段，若游戏轮数为3的倍数，你获得一张随机金卡；当游戏轮数不是3的倍数时，你的体力值不能少于2',
			gwshenyu:'神愈',
			gwshenyu_info:'准备阶段，你可以令一名角色选择一项：回复一点体力，或从弃牌堆中获得一张非金法术牌（直到洗牌前该牌不能再以此法获得）',
			junchi:'骏驰',
			junchi_info:'每当一名其他角色使用一张杀，若目标不是你，你可以对杀的目标使用一张牌，并摸一张牌；每当一名其他角色使用一张金卡，你可以在此回合结束后获得一个额外回合',
			junchi_old_info:'当一名其他角色使用杀对一个目标结算后，该角色可以交给你一张牌，然后你可以对杀的目标使用一张牌，若如此做，你回复一点体力，杀的使用者摸一张牌',
			gw_dudayuanshuai1:'杜达元帅',
			gw_dudayuanshuai1_info:'当你成为其他角色使用牌的目标时，你可以使用此牌取消之，然后获得对你使用的牌',
			gw_dudayuanshuai2:'杜达元帅',
			gw_dudayuanshuai2_info:'你不能使用、打出或弃置此牌；结束阶段，若此牌在你手牌中，你弃置之并随机弃置一张手牌',
			hupeng:'呼朋',
			hupeng_info:'出牌阶段限一次，你可以弃置一张牌并将一张杜达元帅置入一名角色的手牌',
			shuijian:'水箭',
			shuijian_info:'准备阶段，你可以弃置一张手牌视为对所有敌方角色使用一张万箭齐发',
			yunhuo:'陨火',
			yunhuo_info:'锁定技，准备阶段，若游戏轮数为4的倍数，你令所有敌方角色随机弃置一张手牌（若没有手牌改为受到一点火焰伤害），然后在此回合结束后获得一个额外回合',
			yinzhang:'银杖',
			yinzhang_info:'出牌阶段限一次，你可以弃置一张牌，然后从3张随机亮出的牌中选择一张加入手牌',
			tianbian:'天变',
			tianbian_info:'出牌阶段开始时，你可以选择一项：随机使用一张对全场有正面效果的牌；或随机使用一张对全场有负面效果的牌',
			gwxiaoshou:'枭首',
			gwxiaoshou_info:'出牌阶段限两次，你可以弃置一张牌对场上体力值最高（或之一）的一名角色造成一点伤害',
			kuanglie:'狂猎',
			kuanglie_info:'锁定技，当一名其他角色成为你的黑色牌的目标后，该角色随机弃置一张牌；每当你发动两次“狂猎”，你摸一张牌',
			gwjiquan:'集权',
			gwjiquan_info:'出牌阶段限一次，你可以从任意名角色处各获得一张牌，每拿一张牌，被拿牌的角色视为对你使用一张杀',
			nuhou:'怒吼',
			nuhou_info:'出牌阶段限一次，你可以弃置一张牌，然后所有敌人随机弃置一张牌',
			shewu:'蛇舞',
			shewu_info:'出牌阶段限一次，你可以弃置1至3张牌然后摸3张牌；若你弃置了至少2张牌，你本回合使用卡牌无视距离；若你弃置了3张牌，你回复一点体力',
			gwzhanjiang:'斩将',
			gwzhanjiang_info:'每轮限一次，在一名角色的准备阶段，你可以弃置一张牌，然后所有角色可以对该角色使用一张杀，出杀的角色在响应时摸一张牌，当有至少两名角色响应后停止结算',
			gwchuanxin:'穿心',
			gwchuanxin_info:'你的攻击范围+X，X为你当前体力值；每当你对一名角色使用杀结算完毕后，你可以亮出牌堆顶的一张牌，若为黑色，视为对目标再使用一张杀',
			fengjian:'风剑',
			fengjian_info:'每当你使用一张锦囊牌，你可以视为对一名不是此牌目标的角色使用一张雷杀，若如此做，你获得潜行直到下一回合开始',
			huandie:'幻蝶',
			huandie_info:'准备阶段，你可以摸一张牌，并令任意名其他角色摸两张牌，若如此做，此回合结束时，所有手牌数大于体力值的角色需弃置两张手牌',
			xuezhou:'血咒',
			xuezhou_info:'准备阶段，你可以选择一项效果直到下一回合开始：1. 每当一名其他角色受到一次伤害，该角色失去一点体力，你回复一点体力；2. 每当一名其他角色造成一次伤害，该角色失去一点体力，你（若不是受伤害角色）回复一点体力',
			fayin:'法印',
			fayin_info:'每当你使用一张杀，你可以弃置一张牌并获得一个随机法印效果：1. 目标随机弃置两张牌；2. 目标进入混乱状态直到下一回合开始；3. 对目标造成一点火属性伤害；4. 获得一点护甲；5. 令目标翻面并摸一张牌',
			gwbaquan:'霸权',
			gwbaquan_info:'出牌阶段限一次，你可以获得一名其他角色的所有牌，然后还给其等量的牌，若你归还的牌均为你获得的牌且该角色体力值不小于你，你对其造成一点伤害',
			hunmo:'魂墨',
			hunmo_info:'出牌阶段，若你手牌数小于2，你可以选择一名手牌数小于2的角色与其各摸一张牌；若你手牌数不小于2，你可以选择一名手牌数不小于2的角色与你各弃置一张手牌；结束阶段，若你发动过魂墨，你可以将手牌数补至2；同一阶段不能对同一角色发动两次',
			huihun:'回魂',
			huihun_info:'结束阶段，你可以从弃牌堆中获得本回合使用的前两张红色牌',
			lanquan:'远略',
			lanquan_backup:'远略',
			lanquan_info:'出牌阶段限一次，你可以观看牌堆顶的6张牌，并选择一张使用',

			chaoyong:'潮涌',
			chaoyong_info:'准备阶段，你可以弃置一张牌，视为对所有敌方角色使用一张南蛮入侵或万箭齐发',
		}
	};
});
