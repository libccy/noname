'use strict';
character.refresh={
	connect:true,
	character:{
		re_caocao:['male','wei',4,['hujia','rejianxiong'],['zhu']],
		re_simayi:['male','wei',3,['refankui','reguicai']],
		re_guojia:['male','wei',3,['tiandu','reyiji']],
		re_lidian:['male','wei',3,['xunxun','wangxi']],
		re_zhangliao:['male','wei',4,['retuxi']],
		re_xuzhu:['male','wei',4,['reluoyi']],
		re_xiahoudun:['male','wei',4,['reganglie','qingjian']],
		re_zhangfei:['male','shu',4,['paoxiao','retishen']],
		re_zhaoyun:['male','shu',4,['longdan','reyajiao']],
		re_guanyu:['male','shu',4,['wusheng','yijue']],
		re_machao:['male','shu',4,['mashu','retieji']],
		re_xushu:['male','shu',4,['zhuhai','qianxin']],
		re_zhouyu:['male','wu',3,['reyingzi','refanjian']],
		re_lvmeng:['male','wu',4,['keji','qinxue']],
		re_ganning:['male','wu',4,['qixi','fenwei']],
		re_luxun:['male','wu',3,['reqianxun','relianying']],
		re_daqiao:['female','wu',3,['reguose','liuli']],
		re_huanggai:['male','wu',4,['rekurou','zhaxiang']],
		re_lvbu:['male','qun',5,['wushuang','liyu']],
		re_gongsunzan:['male','qun',4,['qiaomeng','reyicong']],
		re_huatuo:['male','qun',3,['chulao','jijiu']],
		re_liubei:['male','shu',4,['rerende','jijiang'],['zhu']],
	},
	skill:{
		rerende:{
			audio:2,
			group:['rerende1'],
			enable:'phaseUse',
			filterCard:true,
			selectCard:[1,Infinity],
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(cards.length,targets[0]);
			},
			filterTarget:function(card,player,target){
				if(player.storage.rerende2&&player.storage.rerende2.contains(target)) return false;
				return player!=target;
			},
			onremove:function(player){
				delete player.storage.rerende;
				delete player.storage.rerende2;
			},
			check:function(card){
				if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
				if(!ui.selected.cards.length&&card.name=='du') return 20;
				var player=get.owner(card);
				if(ui.selected.cards.length>=Math.max(2,player.num('h')-player.hp)) return 0;
				if(player.hp==player.maxHp||player.storage.rerende<0||player.num('h')<=1){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].get('s').contains('haoshi')&&
							!game.players[i].isTurnedOver()&&
							!game.players[i].num('j','lebu')&&
							ai.get.attitude(player,game.players[i])>=3&&
							ai.get.attitude(game.players[i],player)>=3){
							return 11-ai.get.value(card);
						}
					}
					if(player.num('h')>player.hp) return 10-ai.get.value(card);
					if(player.num('h')>2) return 6-ai.get.value(card);
					return -1;
				}
				return 10-ai.get.value(card);
			},
			content:function(){
				'step 0'
				if(!Array.isArray(player.storage.rerende2)){
					player.storage.rerende2=[];
				}
				player.storage.rerende2.push(target);
				target.gain(cards);
				game.delay();
				if(typeof player.storage.rerende!='number'){
					player.storage.rerende=0;
				}
				if(player.storage.rerende>=0){
					player.storage.rerende+=cards.length;
					if(player.storage.rerende>=2){
						var list=[];
						for(var i=0;i<game.players.length;i++){
							if(player.canUse('sha',game.players[i],true,true)){
								list.push('sha');break;
							}
						}
						if(player.canUse('tao',player,true,true)){
							list.push('tao');
						}
						if(player.canUse('jiu',player,true,true)){
							list.push('jiu');
						}
						if(list.length){
							list.push('cancel');
							player.chooseControl(list,function(){
								var controls=_status.event.controls;
								var player=_status.event.player;
								if(controls.contains('tao')) return 'tao';
								if(controls.contains('sha')){
									for(var i=0;i<game.players.length;i++){
										if(player.canUse('sha',game.players[i],true,true)){
											if(ai.get.effect(game.players[i],{name:'sha'},player,player)>0){
												return 'sha';
											}
										}
									}
								}
								return 'cancel';
							}).set('prompt','是否视为使用一张基本牌？');
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
				if(result&&result.control&&result.control!='cancel'){
					if(result.control=='sha'){
						player.chooseTarget(function(card,player,target){
							return player.canUse({name:'sha'},target,true,true);
						},true,'选择出杀目标').set('ai',function(target){
							var player=_status.event.player;
							return ai.get.effect(target,{name:'sha'},player,player);
						});
					}
					else{
						player.useCard({name:result.control},player);
						event.finish();
					}
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool&&result.targets&&result.targets.length){
					player.useCard({name:'sha'},result.targets);
				}
			},
			ai:{
				order:function(skill,player){
					if(player.hp<player.maxHp&&player.storage.rerende<2&&player.num('h')>1){
						return 10;
					}
					return 4;
				},
				result:{
					target:function(player,target){
						if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
							return -10;
						}
						if(target.num('j','lebu')) return 0;
						var nh=target.num('h');
						var np=player.num('h');
						if(player.hp==player.maxHp||player.storage.rerende<0||player.num('h')<=1){
							if(nh>=np-1&&np<=player.hp&&!target.get('s').contains('haoshi')) return 0;
						}
						return Math.max(1,5-nh);
					}
				},
				effect:{
					target:function(card,player,target){
						if(player==target&&get.type(card)=='equip'){
							if(player.num('e',{subtype:get.subtype(card)})){
								for(var i=0;i<game.players.length;i++){
									if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>0){
										return 0;
									}
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
			forced:true,
			popup:false,
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
				return event.card&&event.card.name=='sha'&&event.player.isAlive()&&event.player.num('he')>0;
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
					return ai.get.effect(target,{name:'juedou'},evt.player,_status.event.player)-2;
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
					player.useCard({name:'juedou'},event.target);
				}
			}
		},
		reqicai:{
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
		},
		rejizhi:{
			audio:2,
			trigger:{player:'useCard'},
			frequent:true,
			filter:function(event){
				var type=get.type(event.card,'trick');
				return (type=='trick'||type=='equip')&&event.cards[0]&&event.cards[0]==event.card;
			},
			content:function(){
				"step 0"
				var cards=get.cards();
				player.gain(cards,'gain2');
				game.log(player,'获得了',cards);
				if(get.type(cards[0])!='basic'){
					event.finish();
				}
				"step 1"
				player.chooseToDiscard('h',true);
			},
			ai:{
				threaten:1.4
			}
		},
		retuxi:{
			audio:2,
			trigger:{player:'phaseDrawBefore'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('retuxi'),[1,2],function(card,player,target){
					return target.num('h')>0&&player!=target&&target.num('h')>=player.num('h');
				},function(target){
					var att=ai.get.attitude(_status.event.player,target);
					if(target.hasSkill('tuntian')) return att/10;
					return 1-att;
				});
				"step 1"
				if(result.bool){
					player.logSkill('retuxi',result.targets);
					for(var i=0;i<result.targets.length;i++){
						player.gain(result.targets[i].get('h').randomGet());
						result.targets[i].$give(1,player);
					}
					trigger.num-=result.targets.length
				}
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
				return player.num('he')>0;
			},
			content:function(){
				"step 0"
				player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
				get.translation(trigger.player.judging[0])+'，'+get.prompt('reguicai'),'he').set('ai',function(card){
					var trigger=_status.event.getTrigger();
					var player=_status.event.player;
					var judging=_status.event.judging;
					var result=trigger.judge(card)-trigger.judge(judging);
					var attitude=ai.get.attitude(player,trigger.player);
					if(attitude==0||result==0) return 0;
					if(attitude>0){
						return result-ai.get.value(card)/2;
					}
					else{
						return -result-ai.get.value(card)/2;
					}
				}).set('judging',trigger.player.judging[0]);
				"step 1"
				if(result.bool){
					player.respond(result.cards,'highlight');
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.logSkill('reguicai');
					if(trigger.player.judging[0].clone){
						trigger.player.judging[0].clone.classList.remove('thrownhighlight');
						game.broadcast(function(card){
							if(card.clone){
								card.clone.classList.remove('thrownhighlight');
							}
						},trigger.player.judging[0]);
						game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
					}
					ui.discardPile.appendChild(trigger.player.judging[0]);
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
				return (event.source&&event.source.num('he'));
			},
			content:function(){
				"step 0"
				event.num=trigger.num;
				"step 1"
				if(num==0||trigger.source.num('he')==0){
					event.finish();
					return;
				}
				event.num--;
				player.choosePlayerCard(get.prompt('refankui',trigger.source),trigger.source,ai.get.buttonValue,'he');
				"step 2"
				if(result.bool){
					player.logSkill('refankui',trigger.source);
					player.gain(result.links[0]);
					trigger.source.$give(1,player);
					event.goto(1);
				}
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(player.num('he')>1&&get.tag(card,'damage')){
							if(player.hasSkill('jueqing')) return [1,-1.5];
							if(ai.get.attitude(target,player)<0) return [1,1];
						}
					}
				}
			}
		},
		reluoyi:{
			audio:2,
			trigger:{player:'phaseDrawBegin'},
			check:function(event,player){
				if(player.num('h','sha')) return true;
				return Math.random()<0.5;
			},
			content:function(){
				"step 0"
				player.addTempSkill('reluoyi2',{player:'phaseBefore'});
				trigger.untrigger();
				trigger.finish();
				"step 1"
				event.cards=get.cards(3);
				player.showCards(event.cards,'裸衣');
				"step 2"
				for(var i=0;i<cards.length;i++){
					if(get.type(cards[i],'trick')=='trick'&&cards[i].name!='juedou'){
						ui.discardPile.appendChild(cards[i]);
						cards.splice(i,1);i--;
					}
					else if(get.type(cards[i])=='equip'&&get.subtype(cards[i])!='equip1'){
						ui.discardPile.appendChild(cards[i]);
						cards.splice(i,1);i--;
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
			}
		},
		reganglie:{
			audio:2,
			trigger:{player:'damageEnd'},
			filter:function(event,player){
				return (event.source!=undefined);
			},
			check:function(event,player){
				return (ai.get.attitude(player,event.source)<=0);
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					if(get.color(card)=='red') return 2;
					return 1;
				})
				"step 1"
				if(result.judge==1&&trigger.source.num('he')){
					player.discardPlayerCard(trigger.source,'he',true);
				}
				else{
					if(result.judge==2){
						trigger.source.damage();
					}
				}
			},
			ai:{
				expose:0.4
			}
		},
		qinxue:{
			skillAnimation:true,
			audio:2,
			unique:true,
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				if(player.storage.qinxue) return false;
				if(player.num('h')>=player.hp+3) return true;
				if(player.num('h')>=player.hp+2&&game.players.length+game.dead.length>=7) return true;
				return false;
			},
			content:function(){
				player.storage.qinxue=true;
				player.loseMaxHp();
				player.addSkill('gongxin');
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
						return (_status.event.player.num('h')-_status.event.player.hp);
					},
					ai2:function(target){
						var att=ai.get.attitude(_status.event.player,target);
						if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
							return 1-att;
						}
						if(target.num('h')>_status.event.player.num('h')) return 0;
						return att-4;
					},
					prompt:'请选择要送人的卡牌'
				});
				"step 2"
				if(result.bool){
					player.storage.qingjian++;
					player.logSkill('qingjian',result.targets);
					result.targets[0].gain(result.cards);
					player.$give(result.cards.length,result.targets[0]);
					for(var i=0;i<result.cards.length;i++){
						event.cards.remove(result.cards[i]);
					}
					if(event.cards.length) event.goto(1);
				}
			},
			ai:{
				expose:0.3
			},
		},
		reyingzi:{
			audio:2,
			audioname:['sunce'],
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
				return player.num('h')>0;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			filterCard:true,
			check:function(card){
				return 8-ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
			},
			content:function(){
				"step 0"
				target.storage.refanjian=cards[0];
				target.gain(cards[0]);
				"step 1"
				target.chooseControl('refanjian_card','refanjian_hp').ai=function(event,player){
					var cards=player.get('he',{suit:get.suit(player.storage.refanjian)});
					if(cards.length==1) return 0;
					if(cards.length>=2){
						for(var i=0;i<cards.length;i++){
							if(get.tag(cards[i],'save')) return 1;
						}
					}
					if(player.hp==1) return 0;
					for(var i=0;i<cards.length;i++){
						if(ai.get.value(cards[i])>=8) return 1;
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
				target.discard(target.get('he',{suit:get.suit(target.storage.refanjian)}))
				delete target.storage.refanjian;
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return -target.num('he')-(player.num('h','du')?1:0);
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
				if(player.num('h')==0) return false;
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
				player.storage.reqianxun2=player.storage.reqianxun2.concat(player.get('h'));
				game.addVideo('storage',player,['reqianxun2',get.cardsInfo(player.storage.reqianxun2),'cards']);
				player.lose(player.get('h'),ui.special);
				player.addSkill('reqianxun2');
			},
			ai:{
				effect:function(card,player,target){
					if(get.type(card,'trick')=='trick'&&ui.selected.targets.length==0) return [1,1];
				},
			},
		},
		reqianxun2:{
			trigger:{global:'phaseAfter'},
			forced:true,
			audio:false,
			content:function(){
				player.gain(player.storage.reqianxun2);
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
				if(player.num('h')) return false;
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
					if(player==target) return ai.get.attitude(player,target)+10;
					return ai.get.attitude(player,target);
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
				player.unmarkSkill('retishen');
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
			forced:true,
			popup:false,
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
						var att=ai.get.attitude(_status.event.player,target);
						if(_status.event.du){
							return -att;
						}
						if(att>0){
							return att+Math.max(0,5-target.num('h'));
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
						ui.discardPile.appendChild(event.card);
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
					result.targets[0].gain(event.card);
					event.node.moveDelete(result.targets[0]);
					game.log(result.targets[0],'获得了',event.card);
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
					ui.discardPile.appendChild(event.card);
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
						if(get.tag(card,'respond')&&player.num('h')>1) return [1,0.2];
					}
				}
			}
		},
		rejianxiong:{
			audio:2,
			trigger:{player:'damageEnd'},
			direct:true,
			content:function(){
				"step 0"
				if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0])=='d'){
					player.chooseControl('rejianxiong_mopai','rejianxiong_napai','cancel').ai=function(){
						var trigger=_status.event.getTrigger();
						if(trigger.cards.length==1&&trigger.cards[0].name=='sha') return 0;
						return 1;
					};
				}
				else{
					player.chooseControl('rejianxiong_mopai','cancel');
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
				effect:{
					target:function(card,player,target){
						if(player.hasSkill('jueqing')) return [1,-1];
						if(get.tag(card,'damage')&&player!=target) return [1,1];
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
						return (_status.event.player.num('h')-_status.event.player.hp);
					},
					ai2:function(target){
						var att=ai.get.attitude(_status.event.player,target);
						if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
							return 1-att;
						}
						return att-4;
					},
					prompt:'请选择要送人的卡牌'
				});
				"step 3"
				if(result.bool){
					player.lose(result.cards,ui.special);
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
				result:{
					effect:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.hasSkill('jueqing')) return [1,-2];
							if(player.hp>=4) return [1,get.tag(card,'damage')*2];
							if(target.hp==3) return [1,get.tag(card,'damage')*1.5];
							if(target.hp==2) return [1,get.tag(card,'damage')*0.5];
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
				player.gain(player.storage.reyiji2);
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
				return player!=target&&target.num('h');
			},
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target).set('small',true);
				"step 1"
				if(result.bool){
					if(target.hasSkill('yijue2')==false){
						var list=[];
						for(var i=0;i<target.skills.length;i++){
							if(!get.is.locked(target.skills[i])){
								list.push(target.skills[i]);
							}
						}
						target.disableSkill('yijue',list);
						target.addSkill('yijue2');
					}
					event.finish();
				}
				else if(target.hp<target.maxHp){
					player.chooseBool('是否让目标回复一点体力？').ai=function(event,player){
						return ai.get.recoverEffect(target,player,player)>0;
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
						var hs=player.get('h');
						if(hs.length<3) return 0;
						var bool=false;
						for(var i=0;i<hs.length;i++){
							if(hs[i].number>=9&&ai.get.value(hs[i])<7){
								bool=true;
								break;
							}
						}
						if(!bool) return 0;
						if(target.num('h')>target.hp+1&&ai.get.recoverEffect(target)>0){
							return 1;
						}
						if(player.canUse('sha',target)&&(player.num('h','sha')||player.num('he',{color:'red'}))){
							return -2;
						}
						return -0.5;
					}
				},
				order:9,
			}
		},
		yijue2:{
			trigger:{global:'phaseAfter'},
			forced:true,
			mark:true,
			audio:false,
			popup:false,
			content:function(){
				player.enableSkill('yijue');
				player.removeSkill('yijue2');
			},
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
				content:function(st,player){
					var storage=player.disabledSkills.yijue;
					if(storage&&storage.length){
						var str='失效技能：';
						for(var i=0;i<storage.length;i++){
							if(lib.translate[storage[i]+'_info']){
								str+=get.translation(storage[i])+'、';
							}
						}
						return str.slice(0,str.length-1);
					}
				}
			}
		},
		retieji:{
			audio:2,
			trigger:{player:'shaBegin'},
			check:function(event,player){
				return ai.get.attitude(player,event.target)<0;
			},
			content:function(){
				"step 0"
				player.judge(function(){return 0});
				var target=trigger.target;
				if(target.hasSkill('retieji2')==false){
					var list=[];
					for(var i=0;i<target.skills.length;i++){
						if(!get.is.locked(target.skills[i])){
							list.push(target.skills[i]);
						}
					}
					target.disableSkill('retieji',list);
					target.addSkill('retieji2');
				}
				"step 1"
				var suit=get.suit(result.card);
				var target=trigger.target;
				var num=target.num('h','shan');
				target.chooseToDiscard('请弃置一张'+get.translation(suit)+'牌，否则不能使用闪抵消此杀','he',function(card){
					return get.suit(card)==_status.event.suit;
				}).set('ai',function(card){
					var num=_status.event.num;
					if(num==0) return 0;
					if(card.name=='shan') return num>1;
					return 8-ai.get.value(card);
				}).set('num',num).set('suit',suit);
				"step 2"
				if(!result.bool){
					trigger.directHit=true;
				}
			}
		},
		retieji2:{
			trigger:{global:'phaseAfter'},
			forced:true,
			content:function(){
				player.enableSkill('retieji');
				player.removeSkill('retieji2');
			},
			audio:false,
			mark:true,
			popup:false,
			intro:{
				content:function(st,player){
					var storage=player.disabledSkills.retieji;
					if(storage&&storage.length){
						var str='失效技能：';
						for(var i=0;i<storage.length;i++){
							if(lib.translate[storage[i]+'_info']){
								str+=get.translation(storage[i])+'、';
							}
						}
						return str.slice(0,str.length-1);
					}
				}
			}
		},
		reyicong:{
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
				return event.card&&event.card.name=='sha'&&event.cards&&
				get.color(event.cards)=='black'&&event.player.num('e');
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
						player.gain(card);
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
				return 8-ai.get.value(card);
			},
			position:'he',
			content:function(){
				player.loseHp();
			},
			ai:{
				order:8,
				result:{
					player:function(player){
						if(player.hp<=2) return player.num('h')==0?1:0;
						if(player.num('h',{name:'sha',color:'red'})) return 1;
						return player.num('h')<=player.hp?1:0;
					}
				},
				effect:function(card,player){
					if(get.tag(card,'damage')){
						if(player.hasSkill('jueqing')) return [1,1];
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
				player.draw(3);
				if(_status.currentPhase==player){
					player.addTempSkill('zhaxiang2',{player:'phaseAfter'});
				}
				else{
					game.trySkillAudio('zhaxiang',player);
				}
			}
		},
		zhaxiang2:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha'&&get.color(card)=='red') return true;
				},
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num+1;
				}
			},
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
				if(lib.filter.autoRespondSha.call({player:player})) return false;
				return event.player.isAlive()&&event.player.getStat('damage')&&
				lib.filter.targetEnabled({name:'sha'},player,event.player)&&
				!lib.filter.autoRespondSha.call({player:player});
			},
			content:function(){
				player.chooseToUse({name:'sha'},'诛害：是否对'+get.translation(trigger.player)+'使用一张杀？',
					trigger.player).set('logSkill','zhuhai');
			}
		},
		qianxin:{
			skillAnimation:true,
			audio:2,
			unique:true,
			trigger:{source:'damageAfter'},
			forced:true,
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				player.removeSkill('qianxin');
				player.addSkill('jianyan');
				player.loseMaxHp();
			}
		},
		jianyan:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].sex=='male') return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				player.chooseControl(['red','black','basic','trick','equip']).set('ai',function(){
					var player=_status.event.player;
					if(player.num('shan')==0) return 'basic';
					if(player.num('e')<=1) return 'equip';
					if(player.num('h')>2) return 'trick';
					return 'red';
				});
				"step 1"
				var num=20;
				var card;
				event.cards=[];
				while(num--){
					card=get.cards(0);
					event.cards.push(card);
					if(get.color(card)==result.control) break;
					else if(get.type(card,'trick')==result.control) break;
				}
				event.card=card;
				player.showCards(event.cards);
				player.chooseTarget(true,'选择一名男性角色送出'+get.translation(event.card),function(card,player,target){
					return target.sex=='male';
				});
				"step 2"
				result.targets[0].$gain(event.card);
				for(var i=0;i<cards.length-1;i++){
					ui.discardPile.appendChild(cards[i]);
				}
				game.delay(0,1000);
				"step 3"
				result.targets[0].gain(event.card);

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
			audio:1,
			enable:'phaseUse',
			usable:1,
			discard:false,
			filter:function(event,player){
				return player.num('he',{suit:'diamond'})>0;
			},
			prepare:function(cards,player){
				player.$throw(cards);
			},
			position:'he',
			filterCard:{suit:'diamond'},
			filterTarget:function(card,player,target){
				if(player==target) return false;
				if(target.hasJudge('lebu')) return true;
				return lib.filter.targetEnabled({name:'lebu'},player,target);
			},
			check:function(card){
				return 7-ai.get.value(card);
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
						if(target.hasJudge('lebu')) return -ai.get.effect(target,{name:'lebu'},player,target);
						return ai.get.effect(target,{name:'lebu'},player,target);
					}
				},
				order:9,
			}
		},
		fenwei:{
			skillAnimation:true,
			audio:2,
			unique:true,
			mark:true,
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
				player.chooseTarget('选择令'+get.translation(trigger.card)+'无效的目标',
					[1,trigger.targets.length],function(card,player,target){
					return _status.event.getTrigger().targets.contains(target);
				}).set('ai',function(target){
					var trigger=_status.event.getTrigger();
					if(game.phaseNumber>game.players.length*2&&trigger.targets.length>=game.players.length-1){
						return -ai.get.effect(target,trigger.card,trigger.player,_status.event.player);
					}
					return -1;
				});
				"step 1"
				if(result.bool){
					player.unmarkSkill('fenwei');
					player.logSkill('fenwei',result.targets);
					player.storage.fenwei=true;
					for(var i=0;i<result.targets.length;i++){
						trigger.targets.remove(result.targets[i]);
					}
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
				return target.num('he')>0;
			},
			filter:function(event,player){
				return player.num('he')>0;
			},
			filterCard:true,
			position:'he',
			selectTarget:[1,Infinity],
			check:function(card){
				if(get.suit(card)=='spade') return 8-ai.get.value(card);
				return 5-ai.get.value(card);
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
			direct:true,
			content:function(){
				"step 0"
				event.cards=get.cards(4);
				player.chooseCardButton(event.cards,2,'选择获得两张牌').set('ai',ai.get.buttonValue);
				"step 1"
				if(result.bool){
					player.logSkill('xunxun');
					trigger.untrigger();
					trigger.finish();
					var choice=[];
					for(var i=0;i<result.links.length;i++){
						choice.push(result.links[i]);
						cards.remove(result.links[i]);
					}
					for(var i=0;i<cards.length;i++){
						ui.cardPile.appendChild(cards[i]);
					}
					player.gain(choice,'draw');
					game.log(player,'获得了两张牌')
				}
			},
		},
		wangxi:{
			audio:2,
			trigger:{player:'damageEnd',source:'damageEnd'},
			filter:function(event){
				return event.num&&event.source&&event.player&&
				event.player.isAlive()&&event.source.isAlive()&&event.source!=event.player;
			},
			check:function(event,player){
				if(event.player==player) return ai.get.attitude(player,event.source)>-3;
				return ai.get.attitude(player,event.player)>-3;
			},
			content:function(){
				"step 0"
				game.asyncDraw([trigger.player,trigger.source],trigger.num);
				"step 1"
				game.delay();
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
		retieji2:'铁骑',
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
		rejizhi:'集智',
		liyu:'利驭',
		rerende:'仁德',
		rerende_info:'出牌阶段，你可以将至少一张手牌交给其他角色，然后你于此阶段内不能再以此法交给该角色牌；若你于此阶段内给出的牌首次达到两张，你可以视为使用一张基本牌',
		liyu_info:'当你使用【杀】对一名其他角色造成伤害后，该角色可令你获得其一张牌，若如此做，则视为你对其选择的另一名角色使用一张【决斗】',
		rejizhi_info:'当你使用一张装备牌或锦囊牌时，你可以摸一张牌并展示之，若此牌是基本牌，你须弃置一张手牌',
		xunxun_info:'摸牌阶段，你可以放弃摸牌，改为观看牌堆顶的四张牌，然后获得其中的两张牌，将其余的牌以任意顺序置于牌堆底。',
		wangxi_info:'每当你对其他角色造成1点伤害后，或受到其他角色造成的1点伤害后，你可与该角色各摸一张牌。',
		reguose_info:'出牌阶段限一次，你可以选择一项：将一张方片花色牌当做【乐不思蜀】使用；或弃置一张方片花色牌并弃置场上的一张【乐不思蜀】。选择完成后，你摸一张牌。',
		fenwei_info:'限定技，当一名角色使用的锦囊牌指定了至少两名角色为目标时，你可以令此牌对其中任意名角色无效。',
		chulao_info:'出牌阶段限一次，若你有牌，你可以选择任意名势力各不相同的其他角色，你弃置你和这些角色的各一张牌。然后以此法弃置黑桃牌的角色各摸一张牌。',
		reguicai_info:'在任意角色的判定牌生效前，你可以打出一张牌代替之',
		zhuhai_info:'一名其他角色的结束阶段开始时，若该角色本回合造成过伤害，你可以对其使用一张【杀】。',
		qianxin_info:'觉醒技，当你造成一次伤害后，若你已受伤，你须减1点体力上限，并获得技能“荐言”。',
		jianyan_info:'出牌阶段限一次，你可以声明一种牌的类别或颜色，然后连续亮出牌堆顶的牌，直到亮出符合你声明的牌为止，选择一名男性角色，该角色获得此牌，再将其余以此法亮出的牌置入弃牌堆。',
		rekurou_info:'出牌阶段限一次，你可以弃置一张牌，然后失去1点体力。',
		zhaxiang_info:'锁定技 每当你失去1点体力后，你摸三张牌。然后若此时是你的出牌阶段，则直到回合结束，你使用红色【杀】无距离限制且不能被【闪】响应，你可以额外使用一张【杀】。',
		qiaomeng_info:'每当你使用黑色【杀】对一名角色造成伤害后，你可以弃置该角色装备区里的一张牌，若此牌是坐骑牌，你于此牌置入弃牌堆时获得之。',
		reyicong_info:'锁定技，只要你的体力值大于2点，你计算与其他角色的距离时，始终-1；只要你的体力值为2点或更低，其他角色计算与你的距离时，始终+1。',
		refankui_info:'每当你受到1点伤害后，你可以获得伤害来源的一张牌。',
		retieji_info:'当你使用【杀】指定一名角色为目标后，你可以进行一次判定并令该角色的非锁定技失效直到回合结束，除非该角色弃置一张与判定结果花色相同的牌，否则不能使用【闪】抵消此【杀】。',
		yijue_info:'出牌阶段限一次，你可以与一名其他角色拼点，若你赢，则直到回合结束，该角色不能使用或打出手牌且其非锁定技失效，若你没赢，你可令该角色回复一点体力。',
		reyiji_info:'每当你受到1点伤害后，你可以摸两张牌。然后你可以在至多两名角色的武将牌旁边分别扣置至多两张手牌，这些角色的下个摸牌阶段开始时，该角色获得其武将牌旁的这些牌。',
		rejianxiong_info:'每当你受到伤害后，你可以选择一项：摸一张牌，或获得对你造成伤害的牌。',
		reyajiao_info:'每当你于回合外使用或打出一张手牌时，你可以亮出牌堆顶的一张牌，若此牌与你此次使用或打出的牌类别相同，你可以将之交给任意一名角色；若不同则你可以将之置入弃牌堆。',
		retishen_info:'限定技，准备阶段开始时，你可以将体力回复至等同于你上回合结束时的体力值，然后你每以此法回复1点体力，便摸一张牌。',
		reqianxun_info:'每当一张延时类锦囊牌或其他角色使用的非延时类锦囊牌生效时，若你是此牌的唯一目标，你可以将所有手牌置于你的武将牌上，若如此做，此回合结束时，你获得你武将牌上的所有牌。',
		relianying_info:'当你失去最后的手牌时，你可以令至多X名角色各摸一张牌（X为你此次失去的手牌数）。',
		reyingzi_info:'锁定技，摸牌阶段摸牌时，你额外摸一张牌；你的手牌上限不会因体力值的减少而减少。',
		refanjian_info:'出牌阶段限一次，你可以展示一张手牌并将此牌交给一名其他角色。然后该角色选择一项：展示其手牌并弃置所有与此牌花色相同的牌，或失去一点体力。',
		qingjian_info:'每当你于摸牌阶段外获得牌时，你可以将其中任意牌以任意顺序交给其他角色，每回合最多发动四次',
		qinxue_info:'觉醒技，准备阶段开始时，若你的手牌数比体力值多3（人数不少于7时改为2）或更多，你须减一点体力上限并获得技能【攻心】',
		retuxi_info:'摸牌阶段摸牌时，你可以少摸任意张牌，然后选择等量的手牌数大于或等于你的其他角色，获得这些角色的各一张手牌。',
		reluoyi_info:'你可以跳过摸牌阶段，然后展示牌堆顶的三张牌，获得其中的基本牌、武器牌和【决斗】，若如此做，直到你的下回合开始，你为伤害来源的【杀】或【决斗】造成的伤害+1。',
		reganglie_info:'每当你受到1点伤害后，可进行一次判定，若结果为红色，你对伤害来源造成1点伤害，若结果为黑色，你弃置其一张牌。'
	},
}
