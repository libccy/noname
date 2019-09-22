'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'refresh',
		connect:true,
		character:{
			re_caocao:['male','wei',4,['hujia','new_rejianxiong'],['zhu']],
			re_simayi:['male','wei',3,['refankui','reguicai']],
			re_guojia:['male','wei',3,['tiandu','new_reyiji']],
			re_lidian:['male','wei',3,['xunxun','wangxi']],
			re_zhangliao:['male','wei',4,['new_retuxi']],
			re_xuzhu:['male','wei',4,['new_reluoyi']],
			re_xiahoudun:['male','wei',4,['reganglie','new_qingjian']],
			re_zhangfei:['male','shu',4,['new_repaoxiao','new_tishen']],
			re_zhaoyun:['male','shu',4,['longdan','new_yajiao']],
			re_guanyu:['male','shu',4,['new_rewusheng','new_yijue']],
			re_machao:['male','shu',4,['mashu','retieji']],
			re_xushu:['male','shu',4,['zhuhai','qianxin']],
			re_zhouyu:['male','wu',3,['reyingzi','refanjian']],
			re_lvmeng:['male','wu',4,['keji','qinxue']],
			re_ganning:['male','wu',4,['qixi','fenwei']],
			re_luxun:['male','wu',3,['reqianxun','relianying']],
			re_daqiao:['female','wu',3,['reguose','liuli']],
			re_huanggai:['male','wu',4,['rekurou','zhaxiang']],
			re_lvbu:['male','qun',5,['wushuang','new_liyu']],
			re_gongsunzan:['male','qun',4,['qiaomeng','reyicong']],
			re_huatuo:['male','qun',3,['jijiu','new_reqingnang']],
			re_liubei:['male','shu',4,['rerende','jijiang'],['zhu']],
			re_diaochan:['female','qun',3,['lijian','rebiyue']],
			re_huangyueying:['female','shu',3,['rejizhi','reqicai']],
			re_sunquan:['male','wu',4,['rezhiheng','rejiuyuan'],['zhu']],
			re_sunshangxiang:['female','wu',3,['xiaoji','rejieyin']],
			re_zhenji:['female','wei',3,['reluoshen','qingguo']],
			re_zhugeliang:['male','shu',3,['reguanxing','kongcheng']],
			re_huaxiong:["male","qun",6,["new_reyaowu"]],
		},
		characterIntro:{
			re_gongsunzan:'群雄之一。出身贵族，因母地位卑贱，只当了郡中小吏。他貌美，声音洪亮，机智善辩。后随卢植于缑氏山中读书，粗通经传。',
			re_lidian:'字曼成，曹操麾下将领。李典深明大义，不与人争功，崇尚学习与高贵儒雅，尊重博学之士，在军中被称为长者。李典有长者之风，官至破虏将军，三十六岁去世。魏文帝曹丕继位后追谥号为愍侯。',
		},
		skill:{
			reqiangxi:{
				subSkill:{
					off:{
						sub:true,
					},
				},
				audio:"qiangxi",
				enable:"phaseUse",
				filterCard:function (card){
					return get.subtype(card)=='equip1';
				},
				selectCard:function (){
					return [0,1];
				},
				filterTarget:function (card,player,target){
					if(player==target) return false;
					if(target.hasSkill('reqiangxi_off')) return false;
					return get.distance(player,target,'attack')<=1;
				},
				content:function (){
					"step 0"
					if(cards.length==0){
						player.loseHp();
					}
					"step 1"
					target.addTempSkill('reqiangxi_off');
					target.damage('nocard');
				},
				check:function (card){
					return 10-get.value(card);
				},
				position:"he",
				ai:{
					order:8.5,
					result:{
						target:function (player,target){
							if(!player.countCards('he',{type:'equip'})){
								if(player.hp<2) return 0;
								if(target.hp>=player.hp) return 0;
							}
							return get.damageEffect(target,player);
						},
					},
				},
				threaten:1.5,
			},
			rehuoji:{
				position:"he",
				audio:"huoji",
				enable:"chooseToUse",
				filterCard:function (card){
					return get.color(card)=='red';
				},
				viewAs:{
					name:"huogong",
					nature:"fire",
				},
				viewAsFilter:function (player){
					if(!player.countCards('h',{color:'red'})) return false;
				},
				prompt:"将一张红色牌当火攻使用",
				check:function (card){
					var player=_status.currentPhase;
					if(player.countCards('h')>player.hp){
						return 6-get.value(card);
					}
					return 4-get.value(card)
				},
				ai:{
					basic:{
						order:4,
						value:[3,1],
						useful:1,
					},
					wuxie:function (target,card,player,current,state){
						if(get.attitude(current,player)>=0&&state>0) return false;
					},
					result:{
						player:function (player){
							var nh=player.countCards('h');
							if(nh<=player.hp&&nh<=4&&_status.event.name=='chooseToUse'){
								if(typeof _status.event.filterCard=='function'&&
									_status.event.filterCard({name:'huogong'})){
									return -10;
								}
								if(_status.event.skill){
									var viewAs=get.info(_status.event.skill).viewAs;
									if(viewAs=='huogong') return -10;
									if(viewAs&&viewAs.name=='huogong') return -10;
								}
							}
							return 0;
						},
						target:function (player,target){
							if(target.hasSkill('huogong2')||target.countCards('h')==0) return 0;
							if(player.countCards('h')<=1) return 0;
							if(target==player){
								if(typeof _status.event.filterCard=='function'&&
									_status.event.filterCard({name:'huogong'})){
									return -1.5;
								}
								if(_status.event.skill){
									var viewAs=get.info(_status.event.skill).viewAs;
									if(viewAs=='huogong') return -1.5;
									if(viewAs&&viewAs.name=='huogong') return -1.5;
								}
								return 0;
							}
							return -1.5;
						},
					},
					tag:{
						damage:1,
						fireDamage:1,
						natureDamage:1,
						norepeat:1,
					},
				},
			},
			rekanpo:{
				audio:"kanpo",
				position:"he",
				enable:"chooseToUse",
				filterCard:function (card){
					return get.color(card)=='black';
				},
				viewAsFilter:function (player){
					return player.countCards('he',{color:'black'})>0;
				},
				viewAs:{
					name:"wuxie",
				},
				prompt:"将一张黑色手牌当无懈可击使用",
				check:function (card){return 8-get.value(card)},
				threaten:1.2,
				ai:{
					basic:{
						useful:[6,4],
						value:[6,4],
					},
					result:{
						player:1,
					},
					expose:0.2,
				},
			},
			rejieming:{
				audio:"jieming",
				trigger:{
					player:"damageEnd",
				},
				direct:true,
				content:function (){
					"step 0"
					event.count=trigger.num;
					"step 1"
					player.chooseTarget(get.prompt('rejieming'),'令一名角色摸两张牌。然后若其手牌数少于体力上限，你摸一张牌').set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>2){
							if((target.maxHp-target.countCards('h'))>2) return 2*att;
							return att;
						}
						return att/3;
					});
					"step 2"
					if(result.bool){
						event.current=result.targets[0];
						player.logSkill('rejieming',event.current);
						player.line(event.current,'thunder');
						event.current.draw(2);
						event.count--;
					}
					else event.finish();
					"step 3"
					if(event.current.countCards('h')<event.current.maxHp){
						player.draw();
					}
					if(event.count>0) event.goto(1);
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					effect:{
						target:function (card,player,target,current){
							if(get.tag(card,'damage')&&target.hp>1){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								var max=0;
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(get.attitude(target,players[i])>0){
										max=Math.max(Math.min(5,players[i].hp)-players[i].countCards('h'),max);
									}
								}
								switch(max){
									case 0:return 2;
									case 1:return 1.5;
									case 2:return [1,2];
									default:return [0,max];
								}
							}
							if((card.name=='tao'||card.name=='caoyao')&&
								target.hp>1&&target.countCards('h')<=target.hp) return [0,0];
						},
					},
				},
			},
			reshuangxiong:{
				trigger:{
					player:"phaseDrawBefore",
				},
				group:"reshuangxiong2",
				audio:"shuangxiong",
				check:function (event,player){
					if(player.countCards('h')>player.hp) return true;
					if(player.countCards('h')>3) return true;
					return false;
				},
				content:function (){
					"step 0"
					trigger.cancel();
					event.cards=get.cards(2);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str;
						if(player==game.me&&!_status.auto){
							str='【双雄】选择获得其中一张牌';
						}
						else{
							str='双雄';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,['双雄',get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					"step 1"
					var next=player.chooseButton([1,1],true);
					next.set('dialog',event.videoId);
					next.set('ai',function(button){
						var player=_status.event.player;
						var color=get.color(button.link);
						var value=get.value(button.link,player);
						if(player.countCards('h',{color:color})>player.countCards('h',['red','black'].remove(color)[0])) value+=5;
						return value;
					});
					"step 2"
					if(result.bool&&result.links){
						var cards2=[];
						for(var i=0;i<result.links.length;i++){
							cards2.push(result.links[i]);
							cards.remove(result.links[i]);
						}
						game.cardsDiscard(cards);
						event.card2=cards2[0];
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					"step 3"
					game.broadcastAll('closeDialog',event.videoId);
					var card2=event.card2;
					player.gain(card2,'gain2');
					player.addTempSkill('shuangxiong2');
					player.storage.shuangxiong=get.color(card2);
					game.delay();
				},
			},
			"reshuangxiong2":{
				trigger:{
					player:"damageEnd",
				},
				forced:true,
				silent:true,
				popup:false,
				filter:function (event,player){
					return event.parent.skill=='shuangxiong2'&&event.parent.targetCards.length>0;
				},
				content:function (){
					"step 0"
					var cards=trigger.parent.targetCards.slice(0);
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i])!='d') cards.remove(cards[i--]);
					}
					if(!cards.length) event.finish();
					else{
						event.cards=cards;
						player.chooseBool('是否获得'+get.translation(event.cards)+'?').ai=function(){
							return true;
						};
					}
					"step 1"
					if(result.bool) player.gain(cards,'gain2');
				},
			},
			
			"new_yajiao":{
				audio:"reyajiao",
				trigger:{
					player:["respond","useCard"],
				},
				frequent:true,
				filter:function (event,player){
					return player!=_status.currentPhase&&get.itemtype(event.cards)=='cards';
				},
				content:function (){
					"step 0"
					event.card=get.cards();
					player.showCards(event.card);
					event.same=false;
					if(get.type(event.card[0],'trick')==get.type(trigger.card,'trick')) event.same=true;
					player.chooseTarget('选择获得此牌的角色',true).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(_status.event.du){
							if(target.hasSkillTag('nodu')) return 0;
							return -att;
						}
						if(!_status.event.same) att+=target==_status.event.player?1:0;
						if(att>0){
							return att+Math.max(0,5-target.countCards('h'));
						}
						return att;
					}).set('du',event.card.name=='du').set('same',event.same);
					"step 1"
					if(result.targets){
						player.line(result.targets,'green');
						result.targets[0].gain(event.card,'gain2');
						if(!event.same) player.chooseToDiscard(true,'he');
					}
				},
				ai:{
					effect:{
						target:function (card,player){
							if(get.tag(card,'respond')&&player.countCards('h')>1) return [1,0.2];
						},
					},
				},
			},
			"new_liyu":{
				audio:"liyu",
				trigger:{
					source:"damageEnd",
				},
				filter:function (event,player){
					if(event._notrigger.contains(event.player)) return false;
					return event.card&&event.card.name=='sha'&&event.player.isAlive()&&event.player.countGainableCards(player,'he')>0;
				},
				direct:true,
				content:function (){
					'step 0'
					player.gainPlayerCard(get.prompt2('new_liyu',trigger.player),trigger.player,'he','visibleMove').set('ai',function(card){
						var player=_status.event.player;
						var evt=_status.event.target;
						if(get.type(card)=='equip'){
							if(get.attitude(player,evt)>0&&game.hasPlayer(function(current){
								return (player.canUse({name:'juedou'},current)&&current!=evt.target&&get.effect(current,{name:'juedou'},player,player)>2);
							})){
								return 5;
							}
							else if(game.hasPlayer(function(current){
								return (player.canUse({name:'juedou'},current)&&current!=evt&&current!=player&&get.effect(current,{name:'juedou'},player,player)<0);
							})){
								return 1;
							}
							else return 4;
						};
						return 3;
					}).set('logSkill',['new_liyu',trigger.player]);
					'step 1'
					if(result.bool){
						if(get.type(result.cards[0])!='equip'){
							trigger.player.draw();
							event.finish();
						}
					else{
						trigger.player.chooseTarget(true,function(card,player,target){
							var evt=_status.event.getParent();
							return evt.player.canUse({name:'juedou'},target)&&target!=_status.event.player;
						},'请选择一名角色，视为'+get.translation(player)+'对其使用【决斗】').set('ai',function(target){
							var evt=_status.event.getParent();
							return get.effect(target,{name:'juedou'},evt.player,_status.event.player)-2;
						});
						}
					}
					else event.finish();
					'step 2'
					if(result.targets){
						player.useCard({name:'juedou'},result.targets[0],'noai');
					}
				},
				ai:{
					halfneg:true,
				},
			},
			"new_retuxi":{
				audio:"retuxi",
				trigger:{
					player:"phaseDrawBegin",
				},
				direct:true,
				priority:-10,
				filter:function (event){
					return event.num>0;
				},
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt('new_retuxi'),'获得至多'+get.translation(trigger.num)+'名角色的各一张手牌，然后少摸等量的牌',[1,trigger.num],function(card,player,target){
						return target.countCards('h')>0&&player!=target;
					},function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkill('tuntian')) return att/10;
						return 1-att;
					});
					"step 1"
					if(result.bool){
						player.logSkill('new_retuxi',result.targets);
						player.gainMultiple(result.targets);
						trigger.num-=result.targets.length;
					}
					else{
						event.finish();
					}
					"step 2"
					if(trigger.num<=0) game.delay();
				},
				ai:{
					threaten:1.6,
					expose:0.2,
				},
			},
			"new_reyiji":{
				audio:"reyiji",
				trigger:{
					player:"damageEnd",
				},
				frequent:true,
				filter:function (event){
					return (event.num>0)
				},
				content:function (){
					"step 0"
					event.count=1;
					"step 1"
					player.draw(2);
					event.given=0;
					"step 2"
					player.chooseCardTarget({
						filterCard:true,
						selectCard:[1,2-event.given],
						filterTarget:function(card,player,target){
							return player!=target&&target!=event.temp;
						},
						ai1:function(card){
							if(ui.selected.cards.length>0) return -1;
							if(card.name=='du') return 20;
							return (_status.event.player.countCards('h')-_status.event.player.hp);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return 1-att;
							}
							return att-4;
						},
						prompt:'请选择要送人的卡牌'
					});
					"step 3"
					if(result.bool){
						player.$giveAuto(result.cards,result.targets[0]);
						player.line(result.targets,'green');
						result.targets[0].gain(result.cards);
						event.given+=result.cards.length;
						if(event.given<2){
							event.temp=result.targets[0];
							event.goto(2);
						}
						else if(event.count<trigger.num){
							delete event.temp;
							event.count++;
							event.goto(1);
						}
					}
					else if(event.count<trigger.num){
						delete event.temp;
						event.num=1;
						event.count++;
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					result:{
						effect:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								var num=1;
								if(get.attitude(player,target)>0){
									if(player.needsToDiscard()){
										num=0.7;
									}
									else{
										num=0.5;
									}
								}
								if(player.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						},
					},
					threaten:0.6,
				},
			},
			"new_rejianxiong":{
				audio:"rejianxiong",
				trigger:{
					player:"damageEnd",
				},
				content:function (){
					"step 0"
					if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0])=='d'){
						player.gain(trigger.cards,"gain2");
					}
					player.draw('nodelay');
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					effect:{
						target:function (card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')&&player!=target) return [1,0.6];
						},
					},
				},
			},
			"new_reluoyi":{
				audio:"reluoyi",
				trigger:{
					player:"phaseDrawBegin",
				},
				content:function (){
					"step 0"
					event.cards=get.cards(3);
					player.showCards(event.cards,'裸衣');
					player.chooseBool("是否放弃摸牌？").ai=function(event,player){
						var num=3
						for(var i=0;i<event.cards.length;i++){
							if(get.type(event.cards[i])!='basic'&&event.cards[i].name!='juedou'&&
								(get.type(event.cards[i])!='equip'||get.subtype(event.cards[i])!='equip1')){
								num--;
							}
						}
						return num>1
					};
					"step 1"
					if(result.bool){
					var cards2=[];
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i])!='basic'&&cards[i].name!='juedou'&&
							(get.type(cards[i])!='equip'||get.subtype(cards[i])!='equip1')){
							cards2.push(cards[i]);
							cards.splice(i--,1);
						}
					}
					player.gain(cards,'gain2');
					game.cardsDiscard(cards2);
					player.addTempSkill('reluoyi2',{player:'phaseBefore'});
					trigger.cancel();
					}
					else game.cardsDiscard(cards);
				},
			},
			"new_rewusheng":{
				mod:{
					targetInRange:function (card){
						if(get.suit(card)=='diamond'&&(_status.event.skill=='new_rewusheng'||card.name=='sha')) return true;
					},
				},
				audio:"wusheng",
				audioname:['re_guanyu','guanzhang','jsp_guanyu','guansuo'],
				enable:["chooseToRespond","chooseToUse"],
				filterCard:function (card,player){
					if(get.zhu(player,'shouyue')) return true;
					return get.color(card)=='red';
				},
				position:"he",
				viewAs:{
					name:"sha",
				},
				viewAsFilter:function (player){
					if(get.zhu(player,'shouyue')){
						if(!player.countCards('he')) return false;
					}
					else{
						if(!player.countCards('he',{color:'red'})) return false;
					}
				},
				prompt:"将一张红色牌当杀使用或打出",
				check:function (card){return 4-get.value(card)},
				ai:{
					skillTagFilter:function (player){
						if(get.zhu(player,'shouyue')){
							if(!player.countCards('he')) return false;
						}
						else{
							if(!player.countCards('he',{color:'red'})) return false;
						}
					},
					respondSha:true,
					basic:{
						useful:[5,1],
						value:[5,1],
					},
					order:function (){
						if(_status.event.player.hasSkillTag('presha',true,null,true)) return 10;
						return 3;
					},
					result:{
						target:function (player,target){
							if(player.hasSkill('jiu')&&!target.getEquip('baiyin')){
								if(get.attitude(player,target)>0){
									return -6;
								}
								else{
									return -3;
								}
							}
							return -1.5;
						},
					},
					tag:{
						respond:1,
						respondShan:1,
						damage:function (card){
							if(card.nature=='poison') return;
							return 1;
						},
						natureDamage:function (card){
							if(card.nature) return 1;
						},
						fireDamage:function (card,nature){
							if(card.nature=='fire') return 1;
						},
						thunderDamage:function (card,nature){
							if(card.nature=='thunder') return 1;
						},
						poisonDamage:function (card,nature){
							if(card.nature=='poison') return 1;
						},
					},
				},
			},
			"new_yijue":{
				audio:"yijue",
				enable:"phaseUse",
				usable:1,
				position:"he",
				filterTarget:function (card,player,target){
					return player!=target&&target.countCards('h');
				},
				filterCard:true,
				check:function (card){
					return 8-get.value(card);
				},
				content:function (){
					"step 0"
					target.chooseCard(true).ai=function(card){
						var player=_status.event.player;
						if((player.hasShan()||player.hp<3)&&get.color(card)=='black') return 0.5;
						return Math.max(1,20-get.value(card));
					};
					"step 1"
					target.showCards(result.cards);
					event.card2=result.cards[0];
					if(get.color(event.card2)=='black'){
						if(!target.hasSkill('fengyin')){
							target.addTempSkill('fengyin');
						}
						target.addTempSkill('new_yijue2');
						event.finish();
					}
					else{
						target.$give(event.card2,player);
						player.gain(event.card2);
						if(target.hp<target.maxHp){
							player.chooseBool('是否让目标回复一点体力？').ai=function(event,player){
								return get.recoverEffect(target,player,player)>0;
							};
						}
					}
					"step 2"
					if(result.bool){
						target.recover();
					}
				},
				ai:{
					result:{
						target:function (player,target){
							var hs=player.getCards('h');
							if(hs.length<3) return 0;
							if(target.countCards('h')>target.hp+1&&get.recoverEffect(target)>0){
								return 1;
							}
							if(player.canUse('sha',target)&&(player.countCards('h','sha')||player.countCards('he',{color:'red'}))){
								return -2;
							}
							return -0.5;
						},
					},
					order:9,
				},
			},
			"new_yijue2":{
				trigger:{
					player:"damageBegin",
				},
				filter:function (event){
					return event.source&&event.source.hasSkill('new_yijue')&&event.card&&event.card.name=='sha'&&get.suit(event.card)=='heart'&&event.notLink();
				},
				silent:true,
				popup:false,
				forced:true,
				content:function (){
					trigger.num++;
				},
				mark:true,
				mod:{
					cardEnabled:function (){
						return false;
					},
					cardUsable:function (){
						return false;
					},
					cardRespondable:function (){
						return false;
					},
					cardSavable:function (){
						return false;
					},
				},
				intro:{
					content:"不能使用或打出卡牌",
				},
			},
			"new_repaoxiao":{
				audio:"paoxiao",
				inherit:"paoxiao",
				mod:{
					targetInRange:function (card,player){
						if(card.name=='sha'&&get.cardCount({name:'sha'},player)>0) return true;
					},
					cardUsable:function (card,player,num){
						if(card.name=='sha') return Infinity;
					},
				},
				ai:{
					unequip:true,
					skillTagFilter:function (player,tag,arg){
						if(!get.zhu(player,'shouyue')) return false;
						if(arg&&arg.name=='sha') return true;
						return false;
					},
				},
			},
			"new_tishen":{
				trigger:{
					player:"phaseUseEnd",
				},
				check:function (event,player){
					var num=0;
					var he=player.getCards('he');
					for(var i=0;i<he.length;i++){
						if(get.type(he[i],'trick')=='trick'){
							num++;
						}
						if(get.type(he[i])=='equip'){
							var subtype=get.subtype(he[i]);
							if(subtype=='equip3'||subtype=='equip4'){
								num++;
							}
						}
					}
					return num==0||num<=player.countCards('h')-player.maxHandcard;
				},
				content:function (){
					var list=[];
					var he=player.getCards('he');
					for(var i=0;i<he.length;i++){
						if(get.type(he[i],'trick')=='trick'){
							list.push(he[i]);
						}
						if(get.type(he[i])=='equip'){
							var subtype=get.subtype(he[i]);
							if(subtype=='equip3'||subtype=='equip4'){
								list.push(he[i]);
							}
						}
					}
					if(list.length) player.discard(list);
					player.addTempSkill('new_tishen2',{player:'phaseBefore'});
				},
				audio:"retishen",
			},
			"new_tishen2":{
				trigger:{
					target:"shaUnhirt",
				},
				filter:function (event,player){
					if(get.itemtype(event.cards)!='cards') return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].isInPile()){
							return true;
						}
					}
					return false;
				},
				forced:true,
				nopop:true,
				content:function (){
					player.logSkill('new_tishen');
					var list=[];
						for(var i=0;i<trigger.cards.length;i++){
							if(trigger.cards[i].isInPile()){
								list.push(trigger.cards[i]);
							}
						}
					player.gain(list,'gain2');
				},
			},
			"new_qingjian":{
				audio:"qingjian",
				//unique:true,
				trigger:{
					player:"gainAfter",
				},
				direct:true,
				usable:1,
				filter:function (event,player){
					if(event.parent.parent.name=='phaseDraw') return false;
					return event.cards&&event.cards.length>0
				},
				content:function (){
					"step 0"
					player.chooseCardTarget({
						position:'he',
						filterCard:true,
						selectCard:[1,Infinity],
						filterTarget:function(card,player,target){
							return player!=target;
						},
						ai1:function(card){
							if(get.attitude(_status.event.player,_status.currentPhase)<0&&_status.currentPhase.needsToDiscard()&&card.name!='du') return -1;
							for(var i=0;i<ui.selected.cards.length;i++){
								if(get.type(ui.selected.cards[i])==get.type(card)||(ui.selected.cards[i].name=='du'&&card.name!='du')) return -1;
							};
							if(card.name=='du') return 20;
							return (_status.event.player.countCards('h')-_status.event.player.hp);
						},
						ai2:function(target){
							if(get.attitude(_status.event.player,_status.currentPhase)<0) return -1;
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return 1-att;
							}
							if(target.countCards('h')>_status.event.player.countCards('h')) return 0;
							return att-4;
						},
						prompt:get.prompt2('new_qingjian'),
					});
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						var cards=result.cards;
						var type=[];
						for(var i=0;i<cards.length;i++){
							if(!type.contains(get.type(cards[i],'trick'))) type.push(get.type(cards[i],'trick'));
						}
						player.storage.new_qingjian++;
						player.logSkill('new_qingjian',target);
						target.gain(cards,player);
						player.$give(cards,target);
						_status.currentPhase.addTempSkill('qingjian_add');
						_status.currentPhase.storage.qingjian_add=type.length;
					}
					else{
						player.storage.counttrigger.new_qingjian--;
					}
				},
				ai:{
					expose:0.3,
				},
			},
			"qingjian_add":{
				mark:true,
				intro:{
					content:function (storage,player){
						return '手牌上限+'+player.storage.qingjian_add;
					},
				},
				mod:{
					maxHandcard:function (player,num){
						return num+player.storage.qingjian_add;
					},
				},
				onremove:function (player){
					delete player.storage.qingjian_add;
				},
			},
			"new_reqingnang":{
				subSkill:{
					off:{
						sub:true,
					},
					"off2":{
						sub:true,
					},
				},
				audio:"qingnang",
				enable:"phaseUse",
				filterCard:true,
				check:function (card,event,player){
					if(game.countPlayer(function(current){
						return (get.recoverEffect(current,player,player)>0&&get.attitude(player,current)>2);
					})>1&&get.color(card)=='black'&&player.countCards('h',{color:'red'})>0) return 3-get.value(card);
					return 9-get.value(card);
				},
				filter:function (event,player){
					return !player.hasSkill('new_reqingnang_off2');
				},
				filterTarget:function (card,player,target){
					if(target.hp>=target.maxHp||target.hasSkill('new_reqingnang_off')) return false;
					return true;
				},
				content:function (){
					target.addTempSkill('new_reqingnang_off');
					if(get.color(cards[0])=='black') player.addTempSkill('new_reqingnang_off2');
					target.recover();
				},
				ai:{
					order:9,
					result:{
						target:function (player,target){
							if(target.hp==1) return 5;
							if(player==target&&player.countCards('h')>player.hp) return 5;
							return 2;
						},
					},
					threaten:2,
				},
			},
			"new_reyaowu":{
				trigger:{
					player:"damage",
				},
				priority:1,
				audio:"yaowu",
				filter:function (event){
					if(event.card&&(event.card.name=='sha')){
						if(['red','black'].contains(get.color(event.card))) return true;
					}
					return false;
				},
				forced:true,
				check:function (event){
					if(event.card&&(event.card.name=='sha')){
						return get.color(event.card)=='black';
					}
				},
				content:function (){
					if(get.color(trigger.cards)=='black') player.draw();
					else trigger.source.chooseDrawRecover(true);
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
							if(card.name=='sha'&&(get.color(card)=='red')){
								return [1,-2];
							}
							if(card.name=='sha'&&(get.color(card)=='black')){
								return [0,-0.6];
							}
						},
					},
				},
			},
			
			reguanxing:{
				audio:'guanxing',
				audioname:['jiangwei'],
				trigger:{player:['phaseBegin','phaseEnd']},
				frequent:true,
				filter:function(event,player,name){
					if(name=='phaseEnd'){
						return player.hasSkill('reguanxing_on');
					}
					return true;
				},
				content:function(){
					"step 0"
					if(player.isUnderControl()){
						game.modeSwapPlayer(player);
					}
					var num=game.countPlayer()<4?3:5;
					var cards=get.cards(num);
					event.cards=cards;
					var switchToAuto=function(){
						_status.imchoosing=false;
						if(event.dialog) event.dialog.close();
						if(event.control) event.control.close();
						var top=[];
						var judges=player.node.judges.childNodes;
						var stopped=false;
						if(!player.hasWuxie()){
							for(var i=0;i<judges.length;i++){
								var judge=get.judge(judges[i]);
								cards.sort(function(a,b){
									return judge(b)-judge(a);
								});
								if(judge(cards[0])<0){
									stopped=true;break;
								}
								else{
									top.unshift(cards.shift());
								}
							}
						}
						var bottom;
						if(!stopped){
							cards.sort(function(a,b){
								return get.value(b,player)-get.value(a,player);
							});
							while(cards.length){
								if(get.value(cards[0],player)<=5) break;
								top.unshift(cards.shift());
							}
						}
						bottom=cards;
						for(var i=0;i<top.length;i++){
							ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
						}
						for(i=0;i<bottom.length;i++){
							ui.cardPile.appendChild(bottom[i]);
						}
						if(event.triggername=='phaseBegin'&&top.length==0){
							player.addTempSkill('reguanxing_on');
						}
						player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
						game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
						game.delay(2);
					};
					var chooseButton=function(online,player,cards){
						var event=_status.event;
						player=player||event.player;
						cards=cards||event.cards;
						event.top=[];
						event.bottom=[];
						event.status=true;
						event.dialog=ui.create.dialog('按顺序选择置于牌堆顶的牌（先选择的在上）',cards);
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('pointerdiv');
						}
						event.switchToAuto=function(){
							event._result='ai';
							event.dialog.close();
							event.control.close();
							_status.imchoosing=false;
						},
						event.control=ui.create.control('ok','pileTop','pileBottom',function(link){
							var event=_status.event;
							if(link=='ok'){
								if(online){
									event._result={
										top:[],
										bottom:[]
									}
									for(var i=0;i<event.top.length;i++){
										event._result.top.push(event.top[i].link);
									}
									for(var i=0;i<event.bottom.length;i++){
										event._result.bottom.push(event.bottom[i].link);
									}
								}
								else{
									var i;
									for(i=0;i<event.top.length;i++){
										ui.cardPile.insertBefore(event.top[i].link,ui.cardPile.firstChild);
									}
									for(i=0;i<event.bottom.length;i++){
										ui.cardPile.appendChild(event.bottom[i].link);
									}
									for(i=0;i<event.dialog.buttons.length;i++){
										if(event.dialog.buttons[i].classList.contains('glow')==false&&
											event.dialog.buttons[i].classList.contains('target')==false)
										ui.cardPile.appendChild(event.dialog.buttons[i].link);
									}
									if(event.triggername=='phaseBegin'&&event.top.length==0){
										player.addTempSkill('reguanxing_on');
									}
									player.popup(get.cnNumber(event.top.length)+'上'+get.cnNumber(event.cards.length-event.top.length)+'下');
									game.log(player,'将'+get.cnNumber(event.top.length)+'张牌置于牌堆顶');
								}
								event.dialog.close();
								event.control.close();
								game.resume();
								_status.imchoosing=false;
							}
							else if(link=='pileTop'){
								event.status=true;
								event.dialog.content.childNodes[0].innerHTML='按顺序选择置于牌堆顶的牌';
							}
							else{
								event.status=false;
								event.dialog.content.childNodes[0].innerHTML='按顺序选择置于牌堆底的牌';
							}
						})
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('selectable');
						}
						event.custom.replace.button=function(link){
							var event=_status.event;
							if(link.classList.contains('target')){
								link.classList.remove('target');
								event.top.remove(link);
							}
							else if(link.classList.contains('glow')){
								link.classList.remove('glow');
								event.bottom.remove(link);
							}
							else if(event.status){
								link.classList.add('target');
								event.top.unshift(link);
							}
							else{
								link.classList.add('glow');
								event.bottom.push(link);
							}
						}
						event.custom.replace.window=function(){
							for(var i=0;i<_status.event.dialog.buttons.length;i++){
								_status.event.dialog.buttons[i].classList.remove('target');
								_status.event.dialog.buttons[i].classList.remove('glow');
								_status.event.top.length=0;
								_status.event.bottom.length=0;
							}
						}
						game.pause();
						game.countChoose();
					};
					event.switchToAuto=switchToAuto;

					if(event.isMine()){
						chooseButton();
						event.finish();
					}
					else if(event.isOnline()){
						event.player.send(chooseButton,true,event.player,event.cards);
						event.player.wait();
						game.pause();
					}
					else{
						event.switchToAuto();
						event.finish();
					}
					"step 1"
					if(event.result=='ai'||!event.result){
						event.switchToAuto();
					}
					else{
						var top=event.result.top||[];
						var bottom=event.result.bottom||[];
						for(var i=0;i<top.length;i++){
							ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
						}
						for(i=0;i<bottom.length;i++){
							ui.cardPile.appendChild(bottom[i]);
						}
						for(i=0;i<event.cards.length;i++){
							if(!top.contains(event.cards[i])&&!bottom.contains(event.cards[i])){
								ui.cardPile.appendChild(event.cards[i]);
							}
						}
						if(event.triggername=='phaseBegin'&&top.length==0){
							player.addTempSkill('reguanxing_on');
						}
						player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(event.cards.length-top.length)+'下');
						game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
						game.updateRoundNumber();
						game.delay(2);
					}
				},
				subSkill:{
					on:{}
				}
			},
			reluoshen:{
				audio:'luoshen',
				locked:false,
				trigger:{player:'phaseBegin'},
				frequent:true,
				content:function(){
					"step 0"
					if(event.cards==undefined) event.cards=[];
					player.judge(function(card){
						if(get.color(card)=='black') return 1.5;
						return -1.5;
					},ui.special);
					"step 1"
					if(result.judge>0){
						event.cards.push(result.card);
						if(lib.config.autoskilllist.contains('luoshen')){
							player.chooseBool('是否再次发动【洛神】？');
						}
						else{
							event._result={bool:true};
						}
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])!='s'){
								event.cards.splice(i,1);i--;
							}
						}
						player.gain(event.cards,'gain2');
						player.storage.reluoshen=event.cards.slice(0);
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.goto(0);
					}
					else{
						if(event.cards.length){
							player.gain(event.cards,'gain2');
							player.storage.reluoshen=event.cards.slice(0);
						}
					}
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(player.storage.reluoshen&&player.storage.reluoshen.contains(card)){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&player.storage.reluoshen&&player.storage.reluoshen.contains(card)){
							return false;
						}
					},
				},
				group:'reluoshen_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						silent:true,
						content:function(){
							delete player.storage.reluoshen;
						}
					}
				}
			},
			rejieyin:{
				audio:'jieyin',
				enable:'phaseUse',
				filterCard:true,
				usable:1,
				position:'he',
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='e'){
						var subtype=get.subtype(card);
						if(!game.hasPlayer(function(current){
							return current!=player&&current.hp!=player.hp&&get.attitude(player,current)>0&&!current.countCards('e',{subtype:subtype});
						})){
							return 0;
						}
						if(player.countCards('h',{subtype:subtype})) return 20-get.value(card);
						return 10-get.value(card);
					}
					else{
						if(player.countCards('e')) return 0;
						if(player.countCards('h',{type:'equip'})) return 0;
						return 8-get.value(card);
					}
				},
				filterTarget:function(card,player,target){
					if(target.sex!='male') return false;
					var card=ui.selected.cards[0];
					if(!card) return false;
					if(get.position(card)=='e'&&!target.isEmpty(get.subtype(card))) return false;
					return true;
				},
				discard:false,
				delay:0,
				lose:false,
				content:function(){
					'step 0'
					if(get.position(cards[0])=='e'){
						player.$give(cards,target);
						target.equip(cards[0]);
					}
					else{
						player.discard(cards);
					}
					'step 1'
					if(player.hp>target.hp){
						player.draw();
						if(target.isDamaged()) target.recover();
					}
					else if(player.hp<target.hp){
						target.draw();
						if(player.isDamaged()) player.recover();
					}
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var es=player.getCards('e');
						for(var i=0;i<es.length;i++){
							if(player.countCards('h',{subtype:get.subtype(es[i])})) return 10;
						}
						return 2;
					},
					result:{
						target:function(player,target){
							var goon=function(){
								var es=player.getCards('e');
								for(var i=0;i<es.length;i++){
									if(player.countCards('h',{subtype:get.subtype(es[i])})) return true;
								}
								return false;
							}
							if(player.hp<target.hp){
								if(player.isHealthy()){
									if(!player.needsToDiscard(1)||goon()) return 0.1;
									return 0;
								}
								return 1.5;
							}
							if(player.hp>target.hp){
								if(target.isHealthy()){
									if(!player.needsToDiscard(1)||goon()) return 0.1;
									return 0;
								}
								return 1;
							}
							return 0;
						}
					}
				}
			},
			rejiuyuan:{
				global:'rejiuyuan2'
			},
			rejiuyuan2:{
				audio:'jiuyuan',
				forceaudio:true,
				trigger:{player:'taoBegin'},
				filter:function(event,player){
					if(player.group!='wu') return false;
					if(event.target!=player) return false;
					return game.hasPlayer(function(target){
						return player!=target&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill('rejiuyuan',player);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(target){
						return player!=target&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill('rejiuyuan',player);
					});
					list.sortBySeat();
					event.list=list;
					'step 1'
					if(event.list.length){
						var current=event.list.shift();
						event.current=current;
						player.chooseBool(get.prompt2('rejiuyuan',current)).set('choice',get.attitude(player,current)>0);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						trigger.cancel();
						player.logSkill('rejiuyuan',event.current);
						event.current.recover();
						player.draw();
					}
					event.goto(1);
				}
			},
			rezhiheng:{
				audio:'zhiheng',
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:true,
				selectCard:[1,Infinity],
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='h'&&!player.countCards('h',function(card){
						return get.value(card)>=8;
					})){
						return 8-get.value(card);
					}
					return 6-get.value(card)
				},
				content:function(){
					'step 0'
					event.num=player.hasSkill('rezhiheng_delay')?1:0;
					'step 1'
					player.draw(event.num+cards.length);
				},
				group:'rezhiheng_draw',
				subSkill:{
					draw:{
						trigger:{player:'loseEnd'},
						silent:true,
						filter:function(event,player){
							if(event.getParent(2).skill!='rezhiheng'&&event.getParent(2).skill!='jilue_zhiheng') return false;
							if(player.countCards('h')) return false;
							for(var i=0;i<event.cards.length;i++){
								if(event.cards[i].original=='h') return true;
							}
							return false;
						},
						content:function(){
							player.addTempSkill('rezhiheng_delay',trigger.getParent(2).skill+'After');
						}
					},
					delay:{}
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.55
				},
			},
			reqicai:{
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					},
					canBeDiscarded:function(card){
						if(get.position(card)=='e') return false;
					},
				},
			},
			rejizhi:{
				audio:'jizhi',
				trigger:{player:'useCard'},
				frequent:true,
				filter:function(event){
					return (get.type(event.card)=='trick');
				},
				init:function(player){
					player.storage.rejizhi=0;
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					event.card=result[0];
					if(get.type(event.card)=='basic'){
						player.chooseBool('是否弃置'+get.translation(event.card)+'并令本回合手牌上限+1？').set('ai',function(evt,player){
							return _status.currentPhase==player&&player.needsToDiscard(-3)&&_status.event.value<6;
						}).set('value',get.value(event.card,player));
					}
					'step 2'
					if(result.bool){
						player.discard(event.card);
						player.storage.rejizhi++;
						if(_status.currentPhase==player){
							player.markSkill('rejizhi');
						}
					}
				},
				ai:{
					threaten:1.4,
					noautowuxie:true,
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.storage.rejizhi;
					}
				},
				intro:{
					content:'本回合手牌上限+#'
				},
				group:'rejizhi_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.storage.rejizhi=0;
							player.unmarkSkill('rejizhi');
						}
					}
				}
			},
			rebiyue:{
				audio:'biyue',
				trigger:{player:'phaseEnd'},
				frequent:true,
				content:function(){
					var num=1;
					if(!player.countCards('h')){
						num=2;
					}
					player.draw(num);
				},
			},
			rerende:{
				audio:2,
				group:['rerende1'],
				enable:'phaseUse',
				filterCard:true,
				selectCard:[1,Infinity],
				discard:false,
				prepare:'give2',
				filterTarget:function(card,player,target){
					if(player.storage.rerende2&&player.storage.rerende2.contains(target)) return false;
					return player!=target;
				},
				onremove:['rerende','rerende2'],
				check:function(card){
					if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
					if(!ui.selected.cards.length&&card.name=='du') return 20;
					var player=get.owner(card);
					if(ui.selected.cards.length>=Math.max(2,player.countCards('h')-player.hp)) return 0;
					if(player.hp==player.maxHp||player.storage.rerende<0||player.countCards('h')<=1){
						var players=game.filterPlayer();
						for(var i=0;i<players.length;i++){
							if(players[i].hasSkill('haoshi')&&
								!players[i].isTurnedOver()&&
								!players[i].hasJudge('lebu')&&
								get.attitude(player,players[i])>=3&&
								get.attitude(players[i],player)>=3){
								return 11-get.value(card);
							}
						}
						if(player.countCards('h')>player.hp) return 10-get.value(card);
						if(player.countCards('h')>2) return 6-get.value(card);
						return -1;
					}
					return 10-get.value(card);
				},
				content:function(){
					'step 0'
					if(!Array.isArray(player.storage.rerende2)){
						player.storage.rerende2=[];
					}
					player.storage.rerende2.push(target);
					target.gain(cards,player);
					if(typeof player.storage.rerende!='number'){
						player.storage.rerende=0;
					}
					if(player.storage.rerende>=0){
						player.storage.rerende+=cards.length;
						if(player.storage.rerende>=2){
							var list=[];
							if(lib.filter.cardUsable({name:'sha'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('sha',current);
							})){
								list.push(['基本','','sha']);
								list.push(['基本','','sha','fire']);
								list.push(['基本','','sha','thunder']);
							}
							if(lib.filter.cardUsable({name:'tao'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('tao',current);
							})){
								list.push(['基本','','tao']);
							}
							if(lib.filter.cardUsable({name:'jiu'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('jiu',current);
							})){
								list.push(['基本','','jiu']);
							}
							if(list.length){
								player.chooseButton(['是否视为使用一张基本牌？',[list,'vcard']]).set('ai',function(button){
									var player=_status.event.player;
									var card={name:button.link[2],nature:button.link[3]};
									if(card.name=='tao'){
										if(player.hp==1||(player.hp==2&&!player.hasShan())||player.needsToDiscard()){
											return 5;
										}
										return 1;
									}
									if(card.name=='sha'){
										if(game.hasPlayer(function(current){
											return player.canUse(card,current)&&get.effect(current,card,player,player)>0
										})){
											if(card.nature=='fire') return 2.95;
											if(card.nature=='thunder') return 2.92;
											return 2.9;
										}
										return 0;
									}
									if(card.name=='jiu'){
										return 0.5;
									}
									return 0;
								});
							}
							else{
								event.finish();
							}
							player.storage.rerende=-1;
						}
						else{
							event.finish();
						}
					}
					else{
						event.finish();
					}
					'step 1'
					if(result&&result.bool&&result.links[0]){
						var card={name:result.links[0][2],nature:result.links[0][3]};
						player.chooseUseTarget(card,true);
					}
				},
				ai:{
					order:function(skill,player){
						if(player.hp<player.maxHp&&player.storage.rerende<2&&player.countCards('h')>1){
							return 10;
						}
						return 4;
					},
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
					effect:{
						target:function(card,player,target){
							if(player==target&&get.type(card)=='equip'){
								if(player.countCards('e',{subtype:get.subtype(card)})){
									if(game.hasPlayer(function(current){
										return current!=player&&get.attitude(player,current)>0;
									})){
										return 0;
									}
								}
							}
						}
					},
					threaten:0.8
				}
			},
			rerende1:{
				trigger:{player:'phaseUseBegin'},
				silent:true,
				content:function(){
					player.storage.rerende=0;
					player.storage.rerende2=[];
				}
			},
			liyu:{
				audio:2,
				trigger:{source:'damageEnd'},
				forced:true,
				filter:function(event,player){
					if(event._notrigger.contains(event.player)) return false;
					return event.card&&event.card.name=='sha'&&event.player.isAlive()&&event.player.countGainableCards(player,'he')>0;
				},
				check:function(){
					return false;
				},
				content:function(){
					'step 0'
					trigger.player.chooseTarget(function(card,player,target){
						var evt=_status.event.getParent();
						return evt.player.canUse({name:'juedou'},target)&&target!=_status.event.player;
					},get.prompt('liyu')).set('ai',function(target){
						var evt=_status.event.getParent();
						return get.effect(target,{name:'juedou'},evt.player,_status.event.player)-2;
					});
					'step 1'
					if(result.bool){
						player.gainPlayerCard(trigger.player,'he',true);
						event.target=result.targets[0];
						trigger.player.line(player,'green');
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.target){
						player.useCard({name:'juedou'},event.target,'noai');
					}
				},
				ai:{
					halfneg:true
				}
			},
			/*reqicai:{
				trigger:{player:'equipEnd'},
				frequent:true,
				content:function(){
					player.draw();
				},
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					}
				},
			},*/
			retuxi:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				direct:true,
				filter:function(event){
					return event.num>0;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('retuxi'),[1,trigger.num],function(card,player,target){
						return target.countCards('h')>0&&player!=target&&target.countCards('h')>=player.countCards('h');
					},function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkill('tuntian')) return att/10;
						return 1-att;
					});
					"step 1"
					if(result.bool){
						player.logSkill('retuxi',result.targets);
						player.gainMultiple(result.targets);
						trigger.num-=result.targets.length;
					}
					else{
						event.finish();
					}
					"step 2"
					if(trigger.num<=0) game.delay();
				},
				ai:{
					threaten:1.6,
					expose:0.2
				}
			},
			reguicai:{
				audio:2,
				trigger:{global:'judge'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('reguicai'),'he').set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result-get.value(card)/2;
						}
						else{
							return -result-get.value(card)/2;
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						player.respond(result.cards,'reguicai','highlight');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(function(card){
								if(card.clone){
									card.clone.classList.remove('thrownhighlight');
								}
							},trigger.player.judging[0]);
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						if(!get.owner(result.cards[0],'judge')){
							trigger.position.appendChild(result.cards[0]);
						}
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					tag:{
						rejudge:1,
					}
				}
			},
			refankui:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					return (event.source&&event.source.countGainableCards(player,'he')&&event.num>0&&event.source!=player);
				},
				content:function(){
					player.gainPlayerCard([1,trigger.num],get.prompt('fankui',trigger.source),trigger.source,get.buttonValue,'he').set('logSkill',['refankui',trigger.source]);
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.countCards('he')>1&&get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
								if(get.attitude(target,player)<0) return [1,1];
							}
						}
					}
				}
			},
			reluoyi:{
				audio:2,
				trigger:{player:'phaseDrawBegin'},
				check:function(event,player){
					if(player.countCards('h','sha')) return true;
					return Math.random()<0.5;
				},
				content:function(){
					"step 0"
					player.addTempSkill('reluoyi2',{player:'phaseBefore'});
					trigger.cancel();
					"step 1"
					event.cards=get.cards(3);
					player.showCards(event.cards,'裸衣');
					"step 2"
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i])!='basic'&&cards[i].name!='juedou'&&
							(get.type(cards[i])!='equip'||get.subtype(cards[i])!='equip1')){
							cards[i].discard();
							cards.splice(i--,1);
						}
					}
					player.gain(cards,'gain2');
				}
			},
			reluoyi2:{
				trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&event.notLink();
				},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					damageBonus:true
				}
			},
			reganglie:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return (event.source!=undefined&&event.num>0);
				},
				check:function(event,player){
					return (get.attitude(player,event.source)<=0);
				},
				logTarget:'source',
				content:function(){
					"step 0"
					event.num=trigger.num;
					"step 1"
					player.judge(function(card){
						if(get.color(card)=='red') return 1;
						return 0;
					});
					"step 2"
					if(result.color=='black'){
						if(trigger.source.countCards('he')){
							player.discardPlayerCard(trigger.source,'he',true);
						}
					}
					else if(trigger.source.isIn()){
						trigger.source.damage();
					}
					event.num--;
					if(event.num>0){
						player.chooseBool(get.prompt2('reganglie'));
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.bool){
						player.logSkill('reganglie',trigger.source);
						event.goto(1);
					}
				},
				ai:{
					maixie_defend:true,
					expose:0.4
				}
			},
			qinxue:{
				skillAnimation:true,
				animationColor:'wood',
				audio:2,
				unique:true,
				juexingji:true,
				derivation:'gongxin',
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					if(player.storage.qinxue) return false;
					if(player.countCards('h')>=player.hp+3) return true;
					if(player.countCards('h')>=player.hp+2&&game.players.length+game.dead.length>=7) return true;
					return false;
				},
				content:function(){
					player.storage.qinxue=true;
					player.loseMaxHp();
					player.addSkill('gongxin');
					player.awakenSkill('qinxue');
				}
			},
			qingjian:{
				audio:2,
				unique:true,
				trigger:{player:'gainAfter'},
				direct:true,
				usable:4,
				filter:function(event,player){
					if(event.parent.parent.name=='phaseDraw') return false;
					return event.cards&&event.cards.length>0
				},
				content:function(){
					"step 0"
					event.cards=trigger.cards.slice(0);
					"step 1"
					player.chooseCardTarget({
						filterCard:function(card){
							return _status.event.getParent().cards.contains(card);
						},
						selectCard:[1,event.cards.length],
						filterTarget:function(card,player,target){
							return player!=target;
						},
						ai1:function(card){
							if(ui.selected.cards.length>0) return -1;
							if(card.name=='du') return 20;
							return (_status.event.player.countCards('h')-_status.event.player.hp);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return 1-att;
							}
							if(target.countCards('h')>_status.event.player.countCards('h')) return 0;
							return att-4;
						},
						prompt:'请选择要送人的卡牌'
					});
					"step 2"
					if(result.bool){
						player.storage.qingjian++;
						player.logSkill('qingjian',result.targets);
						result.targets[0].gain(result.cards,player);
						player.$give(result.cards.length,result.targets[0]);
						for(var i=0;i<result.cards.length;i++){
							event.cards.remove(result.cards[i]);
						}
						if(event.cards.length) event.goto(1);
					}
					else{
						player.storage.counttrigger.qingjian--;
					}
				},
				ai:{
					expose:0.3
				},
			},
			reyingzi:{
				audio:2,
				audioname:['heqi','sunce'],
				trigger:{player:'phaseDrawBegin'},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					threaten:1.5
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.hp<player.maxHp) return num+player.maxHp-player.hp;
					}
				}
			},
			refanjian:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				filterCard:true,
				check:function(card){
					return 8-get.value(card);
				},
				discard:false,
				prepare:'give',
				content:function(){
					"step 0"
					target.storage.refanjian=cards[0];
					target.gain(cards[0],player);
					"step 1"
					target.chooseControl('refanjian_card','refanjian_hp').ai=function(event,player){
						var cards=player.getCards('he',{suit:get.suit(player.storage.refanjian)});
						if(cards.length==1) return 0;
						if(cards.length>=2){
							for(var i=0;i<cards.length;i++){
								if(get.tag(cards[i],'save')) return 1;
							}
						}
						if(player.hp==1) return 0;
						for(var i=0;i<cards.length;i++){
							if(get.value(cards[i])>=8) return 1;
						}
						if(cards.length>2&&player.hp>2) return 1;
						if(cards.length>3) return 1;
						return 0;
					}
					"step 2"
					if(result.control=='refanjian_card'){
						target.showHandcards();
					}
					else{
						target.loseHp();
						event.finish();
					}
					"step 3"
					target.discard(target.getCards('he',{suit:get.suit(target.storage.refanjian)}))
					delete target.storage.refanjian;
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return -target.countCards('he')-(player.countCards('h','du')?1:0);
						}
					},
					threaten:2,
				}
			},
			reqianxun:{
				init:function(player){
					player.storage.reqianxun2=[];
				},
				audio:2,
				trigger:{target:'useCardToBegin',player:'judgeBefore'},
				filter:function(event,player){
					if(player.countCards('h')==0) return false;
					if(event.parent.name=='phaseJudge'){
						if(lib.skill.reqianxun.trigger.player=='judgeBefore'){
							return true;
						}
						return event.result&&event.result.judge!=0;
					}
					if(event.name=='judge') return false;
					if(event.targets&&event.targets.length>1) return false;
					if(event.card&&get.type(event.card)=='trick'&&event.player!=player) return true;
				},
				content:function(){
					player.storage.reqianxun2=player.storage.reqianxun2.concat(player.getCards('h'));
					game.addVideo('storage',player,['reqianxun2',get.cardsInfo(player.storage.reqianxun2),'cards']);
					player.lose(player.getCards('h'),ui.special,'toStorage');
					player.addSkill('reqianxun2');
				},
				ai:{
					effect:function(card,player,target){
						if(!target.hasFriend()) return;
						if(player==target) return;
						var type=get.type(card);
						var nh=target.countCards();
						if(type=='trick'){
							if(!get.tag(card,'multitarget')||get.info(card).singleCard){
								if(get.tag(card,'damage')){
									if(nh<3||target.hp<=2) return 0.8;
								}
								return [1,nh];
							}
						}
						else if(type=='delay'){
							return [0.5,0.5];
						}
					},
				}
			},
			reqianxun2:{
				trigger:{global:'phaseAfter'},
				forced:true,
				audio:false,
				content:function(){
					player.gain(player.storage.reqianxun2,'fromStorage');
					player.removeSkill('reqianxun2');
					player.storage.reqianxun2=[];
					game.addVideo('storage',player,['reqianxun2',get.cardsInfo(player.storage.reqianxun2),'cards']);
				},
				mark:true,
				intro:{
					content:'cardCount'
				}
			},
			relianying:{
				audio:2,
				trigger:{player:'loseEnd'},
				direct:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					var num=0;
					for(var i=0;i<trigger.cards.length;i++){
						if(trigger.cards[i].original=='h') num++;
					}
					player.chooseTarget('选择发动连营的目标',[1,num]).ai=function(target){
						var player=_status.event.player;
						if(player==target) return get.attitude(player,target)+10;
						return get.attitude(player,target);
					}
					"step 1"
					if(result.bool){
						player.logSkill('relianying',result.targets);
						game.asyncDraw(result.targets);
					}
				},
				ai:{
					threaten:0.8,
					effect:{
						target:function(card){
							if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
						}
					},
					noh:true,
				}
			},
			retishen:{
				audio:2,
				unique:true,
				mark:true,
				skillAnimation:true,
				animationColor:'soil',
				limited:true,
				trigger:{player:'phaseBegin'},
				init:function(player){
					player.storage.retishen=false;
				},
				filter:function(event,player){
					if(player.storage.retishen) return false;
					if(typeof player.storage.retishen2=='number'){
						return player.hp<player.storage.retishen2;
					}
					return false;
				},
				check:function(event,player){
					if(player.hp<=1) return true;
					return player.hp<player.storage.retishen2-1;
				},
				content:function(){
					player.awakenSkill('retishen');
					player.recover(player.storage.retishen2-player.hp);
					player.draw(player.storage.retishen2-player.hp);
					player.storage.retishen=true;
				},
				intro:{
					mark:function(dialog,content,player){
						if(player.storage.retishen) return;
						if(typeof player.storage.retishen2!='number'){
							return '上回合体力：无';
						}
						return '上回合体力：'+player.storage.retishen2;
					},
					content:'limited'
				},
				group:['retishen2']
			},
			retishen2:{
				trigger:{player:'phaseEnd'},
				priority:-10,
				silent:true,
				content:function(){
					player.storage.retishen2=player.hp;
					game.broadcast(function(player){
						player.storage.retishen2=player.hp;
					},player);
					game.addVideo('storage',player,['retishen2',player.storage.retishen2]);
				},
				intro:{
					content:function(storage,player){
						if(player.storage.retishen) return;
						return '上回合体力：'+storage;
					}
				}
			},
			reyajiao:{
				audio:2,
				trigger:{player:['respond','useCard']},
				frequent:true,
				filter:function(event,player){
					return player!=_status.currentPhase&&get.itemtype(event.cards)=='cards';
				},
				content:function(){
					"step 0"
					event.card=get.cards()[0];
					game.broadcast(function(card){
						ui.arena.classList.add('thrownhighlight');
						card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
					},event.card);
					event.node=event.card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					game.addVideo('centernode',null,get.cardInfo(event.card));
					if(get.type(event.card,'trick')==get.type(trigger.card,'trick')){
						player.chooseTarget('选择获得此牌的角色').set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du){
								if(target.hasSkillTag('nodu')) return 0;
								return -att;
							}
							if(att>0){
								return att+Math.max(0,5-target.countCards('h'));
							}
							return att;
						}).set('du',event.card.name=='du');
					}
					else{
						player.chooseBool('是否弃置'+get.translation(event.card)+'？');
						event.disbool=true;
					}
					game.delay(2);
					"step 1"
					if(event.disbool){
						if(!result.bool){
							game.log(player,'展示了',event.card);
							ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
						}
						else{
							game.log(player,'展示并弃掉了',event.card);
							event.card.discard();
						}
						game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
						event.node.delete();
						game.broadcast(function(card){
							ui.arena.classList.remove('thrownhighlight');
							if(card.clone){
								card.clone.delete();
							}
						},event.card);
					}
					else if(result.targets){
						player.line(result.targets,'green');
						result.targets[0].gain(event.card,'log');
						event.node.moveDelete(result.targets[0]);
						game.addVideo('gain2',result.targets[0],[get.cardInfo(event.node)]);
						game.broadcast(function(card,target){
							ui.arena.classList.remove('thrownhighlight');
							if(card.clone){
								card.clone.moveDelete(target);
							}
						},event.card,result.targets[0]);
					}
					else{
						game.log(player,'展示并弃掉了',event.card);
						event.card.discard();
						game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
						event.node.delete();
						game.broadcast(function(card){
							ui.arena.classList.remove('thrownhighlight');
							if(card.clone){
								card.clone.delete();
							}
						},event.card);
					}
					game.addVideo('thrownhighlight2');
					ui.arena.classList.remove('thrownhighlight');
				},
				ai:{
					effect:{
						target:function(card,player){
							if(get.tag(card,'respond')&&player.countCards('h')>1) return [1,0.2];
						}
					}
				}
			},
			rejianxiong:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return get.itemtype(event.cards)=='cards'&&get.position(event.cards[0])=='d';
				},
				content:function(){
					player.gain(trigger.cards);
					player.$gain2(trigger.cards);
					player.draw();
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')) return [1,0.55];
						}
					}
				}
			},
			rejianxiong_old:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					"step 0"
					if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0])=='d'){
						player.chooseControl('rejianxiong_mopai','rejianxiong_napai','cancel2').set('prompt',get.prompt('rejianxiong')).ai=function(){
							var trigger=_status.event.getTrigger();
							if(trigger.cards.length==1&&trigger.cards[0].name=='sha') return 0;
							return 1;
						};
					}
					else{
						player.chooseControl('rejianxiong_mopai','cancel2').set('prompt',get.prompt('rejianxiong'));
					}
					"step 1"
					if(result.control=='rejianxiong_napai'){
						player.logSkill('rejianxiong');
						player.gain(trigger.cards);
						player.$gain2(trigger.cards);
					}
					else if(result.control=='rejianxiong_mopai'){
						player.logSkill('rejianxiong');
						player.draw();
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')&&player!=target) return [1,0.6];
						}
					}
				}
			},
			reyiji:{
				audio:2,
				trigger:{player:'damageEnd'},
				frequent:true,
				filter:function(event){
					return (event.num>0)
				},
				content:function(){
					"step 0"
					event.num=1;
					event.count=1;
					"step 1"
					player.gain(get.cards(2));
					player.$draw(2);
					"step 2"
					player.chooseCardTarget({
						filterCard:true,
						selectCard:[1,2],
						filterTarget:function(card,player,target){
							return player!=target&&target!=event.temp;
						},
						ai1:function(card){
							if(ui.selected.cards.length>0) return -1;
							if(card.name=='du') return 20;
							return (_status.event.player.countCards('h')-_status.event.player.hp);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return 1-att;
							}
							return att-4;
						},
						prompt:'请选择要送人的卡牌'
					});
					"step 3"
					if(result.bool){
						player.lose(result.cards,ui.special,'toStorage');
						if(result.targets[0].hasSkill('reyiji2')){
							result.targets[0].storage.reyiji2=result.targets[0].storage.reyiji2.concat(result.cards);
						}
						else{
							result.targets[0].addSkill('reyiji2');
							result.targets[0].storage.reyiji2=result.cards;
						}
						player.$give(result.cards.length,result.targets[0]);
						player.line(result.targets,'green');
						game.addVideo('storage',result.targets[0],['reyiji2',get.cardsInfo(result.targets[0].storage.reyiji2),'cards']);
						if(num==1){
							event.temp=result.targets[0];
							event.num++;
							event.goto(2);
						}
						else if(event.count<trigger.num){
							delete event.temp;
							event.num=1;
							event.count++;
							event.goto(1);
						}
					}
					else if(event.count<trigger.num){
						delete event.temp;
						event.num=1;
						event.count++;
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					result:{
						effect:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								var num=1;
								if(get.attitude(player,target)>0){
									if(player.needsToDiscard()){
										num=0.7;
									}
									else{
										num=0.5;
									}
								}
								if(player.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						}
					},
					threaten:0.6
				}
			},
			reyiji2:{
				trigger:{player:'phaseDrawBegin'},
				forced:true,
				mark:true,
				popup:'遗计拿牌',
				audio:false,
				content:function(){
					player.$draw(player.storage.reyiji2.length);
					player.gain(player.storage.reyiji2,'fromStorage');
					delete player.storage.reyiji2;
					player.removeSkill('reyiji2');
					game.delay();
				},
				intro:{
					content:'cardCount'
				}
			},
			yijue:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&target.countCards('h');
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					player.chooseToCompare(target).set('small',true);
					"step 1"
					if(result.bool){
						if(!target.hasSkill('fengyin')){
							target.addTempSkill('fengyin');
						}
						target.addTempSkill('yijue2');
						event.finish();
					}
					else if(target.hp<target.maxHp){
						player.chooseBool('是否让目标回复一点体力？').ai=function(event,player){
							return get.recoverEffect(target,player,player)>0;
						};
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						target.recover();
					}
				},
				ai:{
					result:{
						target:function(player,target){
							var hs=player.getCards('h');
							if(hs.length<3) return 0;
							var bool=false;
							for(var i=0;i<hs.length;i++){
								if(hs[i].number>=9&&get.value(hs[i])<7){
									bool=true;
									break;
								}
							}
							if(!bool) return 0;
							if(target.countCards('h')>target.hp+1&&get.recoverEffect(target)>0){
								return 1;
							}
							if(player.canUse('sha',target)&&(player.countCards('h','sha')||player.countCards('he',{color:'red'}))){
								return -2;
							}
							return -0.5;
						}
					},
					order:9,
				}
			},
			yijue2:{
				mark:true,
				mod:{
					cardEnabled:function(){
						return false;
					},
					cardUsable:function(){
						return false;
					},
					cardRespondable:function(){
						return false;
					},
					cardSavable:function(){
						return false;
					}
				},
				intro:{
					content:'不能使用或打出卡牌'
				}
			},
			retieji:{
				audio:2,
				audioname:['boss_lvbu3'],
				trigger:{player:'shaBegin'},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				logTarget:'target',
				content:function(){
					"step 0"
					player.judge(function(){return 0});
					if(!trigger.target.hasSkill('fengyin')){
						trigger.target.addTempSkill('fengyin');
					}
					"step 1"
					var suit=get.suit(result.card);
					var target=trigger.target;
					var num=target.countCards('h','shan');
					target.chooseToDiscard('请弃置一张'+get.translation(suit)+'牌，否则不能使用闪抵消此杀','he',function(card){
						return get.suit(card)==_status.event.suit;
					}).set('ai',function(card){
						var num=_status.event.num;
						if(num==0) return 0;
						if(card.name=='shan') return num>1?2:0;
						return 8-get.value(card);
					}).set('num',num).set('suit',suit);
					"step 2"
					if(!result.bool){
						trigger.directHit=true;
					}
				}
			},
			reyicong:{
				trigger:{
					player:["changeHp"],
				},
				audio:2,
				forced:true,
				filter:function(event,player){
					return get.sgn(player.hp-2.5)!=get.sgn(player.hp-2.5-event.num);
				},
				content:function (){},
				mod:{
					globalFrom:function(from,to,current){
						if(from.hp>2) return current-1;
					},
					globalTo:function(from,to,current){
						if(to.hp<=2) return current+1;
					},
				},
				ai:{
					threaten:0.8
				}
			},
			qiaomeng:{
				audio:2,
				trigger:{source:'damageEnd'},
				direct:true,
				filter:function(event){
					if(event._notrigger.contains(event.player)) return false;
					return event.card&&event.card.name=='sha'&&event.cards&&
					get.color(event.cards)=='black'&&event.player.countCards('e');
				},
				content:function(){
					"step 0"
					player.choosePlayerCard('e',trigger.player);
					"step 1"
					if(result.bool){
						player.logSkill('qiaomeng');
						trigger.player.discard(result.links[0]);
						event.card=result.links[0];
					}
					else{
						event.finish();
					}
					"step 2"
					if(get.position(card)=='d'){
						if(get.subtype(card)=='equip3'||get.subtype(card)=='equip4'){
							player.gain(card,trigger.player);
							player.$gain2(card);
						}
					}
				}
			},
			rekurou:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				check:function(card){
					return 8-get.value(card);
				},
				position:'he',
				content:function(){
					player.loseHp();
				},
				ai:{
					order:8,
					result:{
						player:function(player){
							if(player.hp<=2) return player.countCards('h')==0?1:0;
							if(player.countCards('h',{name:'sha',color:'red'})) return 1;
							return player.countCards('h')<=player.hp?1:0;
						}
					},
					effect:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.hasSkillTag('jueqing',false,target)) return [1,1];
							return 1.2;
						}
						if(get.tag(card,'loseHp')){
							if(player.hp<=1) return;
							return [0,0];
						}
					}
				}
			},
			zhaxiang:{
				trigger:{player:'loseHpEnd'},
				forced:true,
				audio:2,
				content:function(){
					var num=trigger.num;
					player.draw(3*num);
					if(_status.currentPhase==player){
						if(!player.storage.zhaxiang2) player.storage.zhaxiang2=0;
						player.storage.zhaxiang2+=num;
						player.addTempSkill('zhaxiang2',{player:'phaseAfter'});
					}
					else{
						game.trySkillAudio('zhaxiang',player);
					}
				},
				ai:{
					maihp:true
				}
			},
			zhaxiang2:{
				mod:{
					targetInRange:function(card,player,target,now){
						if(card.name=='sha'&&get.color(card)=='red') return true;
					},
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+player.storage.zhaxiang2;
					}
				},
				onremove:true,
				trigger:{player:'shaBegin'},
				forced:true,
				filter:function(event,player){
					return event.card&&get.color(event.card)=='red';
				},
				content:function(){
					trigger.directHit=true;
				}
			},
			zhuhai:{
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return event.player.isAlive()&&event.player.getStat('damage')&&
					lib.filter.targetEnabled({name:'sha'},player,event.player)&&player.hasSha();
				},
				content:function(){
					player.chooseToUse({name:'sha'},'诛害：是否对'+get.translation(trigger.player)+'使用一张杀？',
						trigger.player,-1).set('logSkill','zhuhai');
				}
			},
			qianxin:{
				skillAnimation:true,
				animationColor:'orange',
				audio:2,
				unique:true,
				juexingji:true,
				trigger:{source:'damageAfter'},
				forced:true,
				derivation:'jianyan',
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				content:function(){
					player.awakenSkill('qianxin');
					player.addSkill('jianyan');
					player.loseMaxHp();
				}
			},
			jianyan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				delay:0,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.sex=='male';
					});
				},
				content:function(){
					"step 0"
					player.chooseControl(['red','black','basic','trick','equip']).set('ai',function(){
						var player=_status.event.player;
						if(!player.hasShan()) return 'basic';
						if(player.countCards('e')<=1) return 'equip';
						if(player.countCards('h')>2) return 'trick';
						return 'red';
					});
					"step 1"
					event.card=get.cardPile(function(card){
						if(get.color(card)==result.control) return true;
						if(get.type(card,'trick')==result.control) return true;
						return false;
					},'cardPile');
					if(!event.card){
						event.finish();
						return;
					}
					player.showCards([event.card]);
					"step 2"
					player.chooseTarget(true,'选择一名男性角色送出'+get.translation(event.card),function(card,player,target){
						return target.sex=='male';
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(_status.event.neg) return -att;
						return att;
					}).set('neg',get.value(event.card,player,'raw')<0);
					"step 3"
					player.line(result.targets,'green');
					result.targets[0].gain(event.card,'gain2');

				},
				ai:{
					order:9,
					result:{
						player:2
					},
					threaten:1.2
				}
			},
			reguose:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				discard:false,
				filter:function(event,player){
					return player.countCards('he',{suit:'diamond'})>0;
				},
				prepare:'throw',
				position:'he',
				filterCard:{suit:'diamond'},
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(target.hasJudge('lebu')) return true;
					return lib.filter.targetEnabled({name:'lebu'},player,target);
				},
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					if(target.hasJudge('lebu')){
						target.discard(target.getJudge('lebu'));
					}
					else{
						var next=player.useCard({name:'lebu'},target,cards);
						next.animate=false;
						next.audio=false;
					}
					player.draw();
				},
				ai:{
					result:{
						target:function(player,target){
							if(target.hasJudge('lebu')) return -get.effect(target,{name:'lebu'},player,target);
							return get.effect(target,{name:'lebu'},player,target);
						}
					},
					order:9,
				}
			},
			fenwei:{
				skillAnimation:true,
				animationColor:'wood',
				audio:2,
				audioname:['heqi'],
				unique:true,
				mark:true,
				limited:true,
				trigger:{global:'useCard'},
				priority:5,
				filter:function(event,player){
					if(get.type(event.card)!='trick') return false;
					if(get.info(event.card).multitarget) return false;
					if(event.targets.length<2) return false;
					if(player.storage.fenwei) return false;
					return true;
				},
				init:function(player){
					player.storage.fenwei=false;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('fenwei'),
						[1,trigger.targets.length],function(card,player,target){
						var evt=_status.event.getTrigger();
						return evt.targets.contains(target)&&!evt.excluded.contains(target);
					}).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						if(game.phaseNumber>game.players.length*2&&trigger.targets.length>=game.players.length-1){
							return -get.effect(target,trigger.card,trigger.player,_status.event.player);
						}
						return -1;
					});
					"step 1"
					if(result.bool){
						player.awakenSkill('fenwei');
						player.logSkill('fenwei',result.targets);
						player.storage.fenwei=true;
						trigger.excluded.addArray(result.targets);
						game.delay();
					}
				},
				intro:{
					content:'limited'
				}
			},
			chulao:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(target.group=='unknown') return false;
					for(var i=0;i<ui.selected.targets.length;i++){
						if(ui.selected.targets[i].group==target.group) return false;
					}
					return target.countCards('he')>0;
				},
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				position:'he',
				selectTarget:[1,Infinity],
				check:function(card){
					if(get.suit(card)=='spade') return 8-get.value(card);
					return 5-get.value(card);
				},
				content:function(){
					"step 0"
					if(num==0&&get.suit(cards[0])=='spade') player.draw();
					player.choosePlayerCard(targets[num],'he',true);
					"step 1"
					if(result.bool){
						if(result.links.length) targets[num].discard(result.links[0]);
						if(get.suit(result.links[0])=='spade') targets[num].draw();
					}
				},
				ai:{
					result:{
						target:-1
					},
					threaten:1.2,
					order:3
				}
			},
			xunxun:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				check:function(event,player){
					return !player.hasSkill('reyiji2');
				},
				content:function(){
					"step 0"
					event.cards=get.cards(4);
					player.chooseCardButton(event.cards,2,'选择两张牌置于牌堆顶').set('ai',ai.get.buttonValue);
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
			wangxi:{
				audio:2,
				trigger:{player:'damageEnd',source:'damageEnd'},
				filter:function(event){
					if(event._notrigger.contains(event.player)) return false;
					return event.num&&event.source&&event.player&&
					event.player.isAlive()&&event.source.isAlive()&&event.source!=event.player;
				},
				check:function(event,player){
					if(player.isPhaseUsing()) return true;
					if(event.player==player) return get.attitude(player,event.source)>-3;
					return get.attitude(player,event.player)>-3;
				},
				logTarget:function(event,player){
					if(event.player==player) return event.source;
					return event.player;
				},
				content:function(){
					"step 0"
					event.count=trigger.num;
					"step 1"
					game.asyncDraw([trigger.player,trigger.source]);
					event.count--;
					"step 2"
					game.delay();
					"step 3"
					if(event.count){
						player.chooseBool(get.prompt2('wangxi',lib.skill.wangxi.logTarget(trigger,player)))
					}
					else event.finish();
					"step 4"
					if(result.bool){
						player.logSkill('wangxi',lib.skill.wangxi.logTarget(trigger,player));
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true
				}
			}
		},
		translate:{
			re_zhangliao:'界张辽',
			re_huangyueying:'新黄月英',
			re_simayi:'界司马懿',
			re_xuzhu:'界许褚',
			re_xiahoudun:'界夏侯惇',
			re_lvmeng:'界吕蒙',
			re_zhouyu:'界周瑜',
			re_luxun:'界陆逊',
			re_zhaoyun:'界赵云',
			re_guanyu:'界关羽',
			re_zhangfei:'界张飞',
			re_machao:'界马超',
			re_caocao:'界曹操',
			re_guojia:'界郭嘉',
			re_lvbu:'界吕布',
			re_xushu:'界徐庶',
			re_huanggai:'界黄盖',
			re_gongsunzan:'界公孙瓒',
			re_daqiao:'界大乔',
			re_ganning:'界甘宁',
			re_huatuo:'界华佗',
			re_lidian:'李典',
			re_liubei:'界刘备',

			re_diaochan:'界貂蝉',
			re_huangyueying:'界黄月英',
			re_sunquan:'界孙权',
			re_sunshangxiang:'界孙尚香',
			re_zhugeliang:'界诸葛亮',
			re_zhenji:'界甄姬',
			re_huaxiong:"界华雄",
			
			"re_sp_zhugeliang":"界卧龙",
			"re_xunyu":"界荀彧",
			"re_dianwei":"界典韦",
			"re_yanwen":"界颜良文丑",
			re_pangtong:"界庞统",
			xin_yuanshao:"界袁绍",
			
			reqiangxi:"强袭",
			"reqiangxi_info":"出牌阶段对每名其他角色限一次，你可以选择一项：1. 失去一点体力并对你攻击范围内的一名其他角色造成一点伤害；2. 弃置一张武器牌并对你攻击范围内的一名其他角色造成一点伤害。",
			rehuoji:"火计",
			"rehuoji_info":"出牌阶段，你可以将你的任意一张♥或♦牌当作【火攻】使用。",
			rekanpo:"看破",
			"rekanpo_info":"你可以将你的任意一张♠或♣牌当作【无懈可击】使用。",
			rejieming:"节命",
			"rejieming_info":"当你受到1点伤害后，你可以令一名角色摸两张牌。然后若其手牌数小于体力上限，则你摸一张牌。",
			reshuangxiong:"双雄",
			"reshuangxiong_info":"摸牌阶段，你可以放弃摸牌。若如此做，你展示牌堆顶的两张牌并选择获得其中的一张。然后，你本回合内可以将与此牌颜色不同的一张手牌当做【决斗】使用。",
			"reshuangxiong2":"双雄",
			"reshuangxiong2_info":"",

			reguanxing:'观星',
			reguanxing_info:'准备阶段，你可以观看牌堆顶的5张牌（存活角色小于4时改为3张），并将其以任意顺序置于牌堆项或牌堆底，若你将“观星”的牌都放在了牌堆底，则你可以在结束阶段再次发动“观星”',
			reluoshen:'洛神',
			reluoshen_info:'准备阶段，你可以进行一次判定，若为黑色则可以继续判定，直到出现红色。然后你获得所有黑色的判定牌。你通过“洛神”获得的牌，不计入当前回合的手牌上限',
			rejieyin:'结姻',
			rejieyin_info:'出牌阶段限一次，你可以选择一名男性角色并弃置一张手牌或将装备区内的一张装备牌置于其装备区，你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力',
			rebiyue:'闭月',
			rebiyue_info:'结束阶段，你可以摸一张牌，若你没有手牌，则改为摸两张牌',
			rejizhi:'集智',
			rejizhi_info:'当你使用非延时锦囊牌时，你可以摸一张牌。若此牌为基本牌，则你可以弃置之，然后令本回合手牌上限+1。',
			reqicai:'奇才',
			reqicai_info:'锁定技，你使用锦囊牌无距离限制，你装备区内的牌不能被其他角色弃置',
			rezhiheng:'制衡',
			rezhiheng_info:'出牌阶段限一次，你可以弃置任意张牌并摸等量的牌，若你在发动“制衡”时弃置了所有手牌，则你多摸一张牌',
			rejiuyuan:'救援',
			rejiuyuan_info:'主公技，其他吴国角色对自己使用【桃】时，若其体力值大于你，则	其可以选择令你回复1点体力，然后其摸1张牌',

			"new_yajiao":"涯角",
			"new_yajiao_info":"每当你于回合外使用或打出牌时，你可以亮出牌堆顶的一张牌，并将其交给一名角色。若此牌与你此次使用或打出的牌类别不同，则你弃置一张牌。",
			"new_liyu":"利驭",
			"new_liyu_info":"当你使用【杀】对一名其他角色造成伤害后，你可以获得其一张牌。若此牌不为装备牌，则其摸一张牌。若此牌为装备牌，则视为你对其选择的另一名角色使用一张【决斗】。",
			"new_retuxi":"突袭",
			"new_retuxi_info":"摸牌阶段摸牌时，你可以少摸任意张牌，然后选择等量的角色的各一张手牌。",
			"new_reyiji":"遗计",
			"new_reyiji_info":"每当你受到1点伤害后，你可以摸两张牌，然后可以将至多两张手牌交给其他角色。",
			"new_rejianxiong":"奸雄",
			"new_rejianxiong_info":"每当你受到伤害后，你可以获得对你造成伤害的牌并摸一张牌。",
			"new_reluoyi":"裸衣",
			"new_reluoyi_info":"你可以展示牌堆顶的三张牌。然后，你可以放弃摸牌。若如此做，你获得其中的基本牌、武器牌和【决斗】，若如此做，直到你的下回合开始，你为伤害来源的【杀】或【决斗】造成的伤害+1。否则，你弃置这些牌。",
			"new_rewusheng":"武圣",
			"new_rewusheng_info":"你可以将一张红色牌当做【杀】使用或打出。你使用的方片杀没有距离限制。",
			"new_yijue":"义绝",
			"new_yijue_info":"出牌阶段限一次，你可以弃置一张牌并令一名有手牌的其他角色展示一张手牌。若此牌为黑色，则该角色不能使用或打出牌，非锁定技失效且受到来自你的红桃【杀】的伤害+1直到回合结束。若此牌为红色，则你可以获得此牌，并可以令其回复一点体力。",
			"new_yijue2":"义绝",
			"new_yijue2_info":"",
			"new_repaoxiao":"咆哮",
			"new_repaoxiao_info":"锁定技，出牌阶段，你使用【杀】没有数量限制。若你于此出牌阶段内使用过【杀】，则你本回合内使用【杀】没有距离限制。",
			"new_tishen":"替身",
			"new_tishen_info":"出牌阶段结束时，你可以弃置你所有的锦囊牌与坐骑牌。若如此做，直到你的下个回合开始，你获得所有以你为目标且未对你造成伤害的【杀】。",
			"new_tishen2":"替身",
			"new_tishen2_info":"",
			"new_qingjian":"清俭",
			"new_qingjian_info":"每当你于摸牌阶段外获得牌时，你可以展示任意张牌并交给一名其他角色。然后，当前回合角色本回合的手牌上限+X（X为你给出的牌中包含的类别数）。每回合限一次。",
			"qingjian_add":"清俭",
			"qingjian_add_info":"",
			"new_reqingnang":"青囊",
			"new_reqingnang_info":"出牌阶段，你可以弃置一张手牌，令一名本回合内未成为过〖青囊〗的目标的角色回复一点体力。若你弃置的是黑色牌，则你本回合内不能再发动〖青囊〗。",
			"new_reyaowu":"耀武",
			"new_reyaowu_info":"锁定技，当任意一名角色使用【杀】对你造成伤害时，若此杀为红色，该角色回复1点体力或摸一张牌。若为黑色，则你摸一张牌。",
			
			qinxue:'勤学',
			retuxi:'突袭',
			reluoyi:'裸衣',
			reluoyi2:'裸衣',
			reganglie:'刚烈',
			qingjian:'清俭',
			reyingzi:'英姿',
			refanjian:'反间',
			refanjian_card:'弃牌',
			refanjian_hp:'流失体力',
			reqianxun:'谦逊',
			reqianxun2:'谦逊',
			relianying:'连营',
			retishen:'替身',
			retishen2:'替身',
			reyajiao:'涯角',
			rejianxiong:'奸雄',
			rejianxiong_mopai:'摸牌',
			rejianxiong_napai:'拿牌',
			reyiji:'遗计',
			reyiji2:'遗计',
			yijue:'义绝',
			yijue2:'义绝',
			retieji:'铁骑',
			refankui:'反馈',
			reyicong:'义从',
			qiaomeng:'趫猛',
			rekurou:'苦肉',
			zhaxiang:'诈降',
			zhaxiang2:'诈降',
			zhuhai:'诛害',
			qianxin:'潜心',
			jianyan:'荐言',
			reguicai:'鬼才',
			xunxun:'恂恂',
			wangxi:'忘隙',
			reguose:'国色',
			fenwei:'奋威',
			chulao:'除疠',
			liyu:'利驭',
			rerende:'仁德',
			rerende_info:'出牌阶段，你可以将至少一张手牌交给其他角色，然后你于此阶段内不能再以此法交给该角色牌；若你于此阶段内给出的牌首次达到两张，你可以视为使用一张基本牌',
			liyu_info:'当你使用【杀】对一名其他角色造成伤害后，该角色可令你获得其一张牌，若如此做，则视为你对其选择的另一名角色使用一张【决斗】',
			xunxun_info:'摸牌阶段，你可以观看牌堆顶的四张牌，然后将其中的两张牌置于牌堆顶，并将其余的牌以任意顺序置于牌堆底。',
			wangxi_info:'每当你对其他角色造成1点伤害后，或受到其他角色造成的1点伤害后，你可与该角色各摸一张牌。',
			reguose_info:'出牌阶段限一次，你可以选择一项：将一张方片花色牌当做【乐不思蜀】使用；或弃置一张方片花色牌并弃置场上的一张【乐不思蜀】。选择完成后，你摸一张牌。',
			fenwei_info:'限定技，当一名角色使用的锦囊牌指定了至少两名角色为目标时，你可以令此牌对其中任意名角色无效。',
			chulao_info:'出牌阶段限一次，若你有牌，你可以选择任意名势力各不相同的其他角色，你弃置你和这些角色的各一张牌。然后以此法弃置黑桃牌的角色各摸一张牌。',
			reguicai_info:'在任意角色的判定牌生效前，你可以打出一张牌代替之',
			zhuhai_info:'一名其他角色的结束阶段开始时，若该角色本回合造成过伤害，你可以对其使用一张【杀】。',
			qianxin_info:'觉醒技，当你造成一次伤害后，若你已受伤，你须减1点体力上限，并获得技能“荐言”。',
			jianyan_info:'出牌阶段限一次，你可以声明一种牌的类别或颜色，并亮出牌库中第一张符合你声明的牌，然后你令一名男性角色获得此牌',
			rekurou_info:'出牌阶段限一次，你可以弃置一张牌，然后失去1点体力。',
			zhaxiang_info:'锁定技 每当你失去1点体力后，你摸三张牌。然后若此时是你的出牌阶段，则直到回合结束，你使用红色【杀】无距离限制且不能被【闪】响应，你可以额外使用一张【杀】。',
			qiaomeng_info:'每当你使用黑色【杀】对一名角色造成伤害后，你可以弃置该角色装备区里的一张牌，若此牌是坐骑牌，你于此牌置入弃牌堆时获得之。',
			reyicong_info:'锁定技，只要你的体力值大于2点，你的进攻距离+1；只要你的体力值为2点或更低，你的防御距离+1',
			refankui_info:'每当你受到1点伤害后，你可以获得伤害来源的一张牌。',
			retieji_info:'当你使用【杀】指定一名角色为目标后，你可以进行一次判定并令该角色的非锁定技失效直到回合结束，除非该角色弃置一张与判定结果花色相同的牌，否则不能使用【闪】抵消此【杀】。',
			yijue_info:'出牌阶段限一次，你可以与一名其他角色拼点，若你赢，则直到回合结束，该角色不能使用或打出手牌且其非锁定技失效，若你没赢，你可令该角色回复一点体力。',
			reyiji_info:'每当你受到1点伤害后，你可以摸两张牌。然后你可以在至多两名角色的武将牌旁边分别扣置至多两张手牌，这些角色的下个摸牌阶段开始时，该角色获得其武将牌旁的这些牌。',
			rejianxiong_info:'每当你受到伤害后，你可以获得对你造成伤害的牌，然后摸一张牌。',
			reyajiao_info:'每当你于回合外使用或打出一张手牌时，你可以亮出牌堆顶的一张牌，若此牌与你此次使用或打出的牌类别相同，你可以将之交给任意一名角色；若不同则你可以将之置入弃牌堆。',
			retishen_info:'限定技，准备阶段开始时，你可以将体力回复至等同于你上回合结束时的体力值，然后你每以此法回复1点体力，便摸一张牌。',
			reqianxun_info:'每当一张延时类锦囊牌或其他角色使用的普通锦囊牌生效时，若你是此牌的唯一目标，你可以将所有手牌置于你的武将牌上，若如此做，此回合结束时，你获得你武将牌上的所有牌。',
			relianying_info:'当你失去最后的手牌时，你可以令至多X名角色各摸一张牌（X为你此次失去的手牌数）。',
			reyingzi_info:'锁定技，摸牌阶段摸牌时，你额外摸一张牌；你的手牌上限不会因体力值的减少而减少。',
			refanjian_info:'出牌阶段限一次，你可以展示一张手牌并将此牌交给一名其他角色。然后该角色选择一项：展示其手牌并弃置所有与此牌花色相同的牌，或失去一点体力。',
			qingjian_info:'每当你于摸牌阶段外获得牌时，你可以将其中任意牌以任意顺序交给其他角色，每回合最多发动四次',
			qinxue_info:'觉醒技，准备阶段开始时，若你的手牌数比体力值多3（人数不少于7时改为2）或更多，你须减一点体力上限并获得技能【攻心】',
			retuxi_info:'摸牌阶段摸牌时，你可以少摸任意张牌，然后选择等量的手牌数大于或等于你的其他角色，获得这些角色的各一张手牌。',
			reluoyi_info:'你可以跳过摸牌阶段，然后展示牌堆顶的三张牌，获得其中的基本牌、武器牌和【决斗】，若如此做，直到你的下回合开始，你为伤害来源的【杀】或【决斗】造成的伤害+1。',
			reganglie_info:'每当你受到1点伤害后，可进行一次判定，若结果为红色，你对伤害来源造成1点伤害，若结果为黑色，你弃置其一张牌。'
		},
	};
});
