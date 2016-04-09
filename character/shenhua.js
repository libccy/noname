'use strict';
character.shenhua={
	character:{
		xiahouyuan:['male','wei',4,['shensu']],
		caoren:['male','wei',4,['jushou','jiewei']],
		huangzhong:['male','shu',4,['liegong']],
		weiyan:['male','shu',4,['kuanggu']],
		xiaoqiao:['female','wu',3,['tianxiang','hongyan']],
		zhoutai:['male','wu',4,['buqu','fenji']],
		zhangjiao:['male','qun',3,['leiji','guidao','huangtian'],['zhu']],
		sp_zhangjiao:['male','qun',3,['diyleiji','guidao','huangtian'],['zhu']],
		// yuji:['male','qun',3,['guhuo']],

		sp_zhugeliang:['male','shu',3,['huoji','bazhen','kanpo']],
		pangtong:['male','shu',3,['lianhuan','niepan']],
		xunyu:['male','wei',3,['quhu','jieming']],
		dianwei:['male','wei',4,['qiangxi']],
		taishici:['male','wu',4,['tianyi']],
		yanwen:['male','qun',4,['shuangxiong']],
		yuanshao:['male','qun',4,['luanji','xueyi'],['zhu']],
		pangde:['male','qun',4,['mashu','mengjin']],

        menghuo:['male','shu',4,['huoshou','zaiqi']],
		zhurong:['female','shu',4,['juxiang','lieren']],
		caopi:['male','wei',3,['xingshang','fangzhu','songwei'],['zhu']],
		xuhuang:['male','wei',4,['duanliang']],
		lusu:['male','wu',3,['haoshi','dimeng']],
		sunjian:['male','wu',4,['yinghun']],
		dongzhuo:['male','qun',8,['jiuchi','roulin','benghuai','baonue'],['zhu']],
		jiaxu:['male','qun',3,['luanwu','wansha','weimu']],

        jiangwei:['male','shu',4,['tiaoxin','zhiji']],
		liushan:['male','shu',3,['xiangle','fangquan','ruoyu'],['zhu']],
		zhanghe:['male','wei',4,['qiaobian']],
		dengai:['male','wei',4,['tuntian','zaoxian']],
		sunce:['male','wu',4,['jiang','hunzi','zhiba'],['zhu','fullskin']],
		zhangzhang:['male','wu',3,['zhijian','guzheng']],
		caiwenji:['female','qun',3,['beige','duanchang']],
		zuoci:['male','qun',3,['huashen','xinsheng']],
	},
	perfectPair:{
		yuanshao:['yanwen'],
		menghuo:['zhurong'],
	},
	skill:{
        tiaoxin:{
			audio:4,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target.canUse({name:'sha'},player)&&target.num('he');
			},
			content:function(){
				"step 0"
				target.chooseToUse({name:'sha'},player,-1,'挑衅：对'+get.translation(player)+'使用一张杀，或令其弃置你的一张牌').set('targetRequired',true);
				"step 1"
				if(result.bool==false&&target.num('he')>0){
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
						if(target.num('h')==0) return 0;
						if(target.num('h')==1) return -0.1;
						if(player.hp<=2) return -2;
						if(player.num('h','shan')==0) return -1;
						return -0.5;
					}
				},
				threaten:1.1
			}
		},
		zhiji:{
			skillAnimation:true,
			audio:2,
			unique:true,
			priority:-10,
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				if(player.storage.zhiji) return false;
				return player.num('h')==0;
			},
			content:function(){
				"step 0"
				player.chooseControl('zhiji_recover','zhiji_draw',function(event,player){
					if(player.hp>=2) return 'zhiji_draw';
					return 'zhiji_recover';
				});
				"step 1"
				if(result.control=='zhiji_draw'){
					player.draw(2);
				}
				else{
					player.recover();
				}
				"step 2"
				player.loseMaxHp();
				player.storage.zhiji=true;
				if(player.hp>player.maxHp) player.hp=player.maxHp;
				player.update();
				player.addSkill('guanxing');
				game.createTrigger('phaseBegin','guanxing',player,trigger);
			}
		},
		xiangle:{
			audio:2,
			trigger:{target:'useCardToBefore'},
			forced:true,
			filter:function(event,player){
				return event.card.name=='sha';
			},
			content:function(){
				"step 0"
				var eff=ai.get.effect(player,trigger.card,trigger.player,trigger.player);
				trigger.player.chooseToDiscard(function(card){
					return get.type(card)=='basic';
				}).set('ai',function(card){
					if(_status.event.eff>0){
						return 10-ai.get.value(card);
					}
					return 0;
				}).set('eff',eff);
				"step 1"
				if(result.bool==false){
					trigger.finish();
					trigger.untrigger();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(card.name=='sha'){
							if(_status.event.name=='xiangle') return;
							var bs=player.get('h',{type:'basic'});
							if(bs.length<2) return 0;
							if(player.skills.contains('jiu')||player.skills.contains('tianxianjiu')) return;
							if(bs.length<=3&&player.num('h','sha')<=1){
								for(var i=0;i<bs.length;i++){
									if(bs[i].name!='sha'&&ai.get.value(bs[i])<7){
										return [1,0,1,-0.5];
									}
								}
								return 0;
							}
							return [1,0,1,-0.5];
						}
					}
				}
			}
		},
		fangquan:{
			audio:2,
			trigger:{player:'phaseUseBefore'},
			filter:function(event,player){
				return player.num('h')>0;
			},
			direct:true,
			content:function(){
				"step 0"
				var fang=player.hp>=2&&player.num('h')<=player.hp+1;
				player.chooseTarget('是否发动【放权】？',function(card,player,target){
					return target!=player;
				}).set('ai',function(target){
					if(!_status.event.fang) return -1;
					if(target.num('j','lebu')) return -1;
					return ai.get.attitude(player,target)-4;
				}).set('fang',fang);
				"step 1"
				if(result.bool){
					player.logSkill('fangquan',result.targets);
					trigger.untrigger();
					trigger.finish();
					player.addSkill('fangquan2');
					player.storage.fangquan=result.targets[0];
				}
			}
		},
		fangquan2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			audio:false,
			content:function(){
				"step 0"
				player.chooseToDiscard(true);
				"step 1"
				var target=player.storage.fangquan;
				target.markSkillCharacter('fangquan',player,'放权','进行一个额外回合');
				target.phase();
				target.addSkill('fangquan3');
				player.removeSkill('fangquan2');
				delete player.storage.fangquan;
			}
		},
		fangquan3:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			audio:false,
			content:function(){
				player.unmarkSkill('fangquan');
				player.removeSkill('fangquan3');
			}
		},
		ruoyu:{
			skillAnimation:true,
			audio:2,
			unique:true,
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				if(!player.isZhu)return false;
				if(player.storage.ruoyu) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hp<player.hp) return false;
				}
				return true;
			},
			content:function(){
				player.storage.ruoyu=true;
				player.maxHp++;
				player.update();
				player.recover();
				player.addSkill('jijiang');
			}
		},
		qiaobian:{
			audio:2,
			group:['qiaobian1','qiaobian2','qiaobian3','qiaobian4'],
			ai:{
				threaten:3
			}
		},
		qiaobian1:{
			audio:2,
			trigger:{player:'phaseJudgeBefore'},
			filter:function(event,player){
				return player.num('h')>0;
			},
			direct:true,
			frequent:true,
			content:function(){
				"step 0"
				if(player.num('j')==0&&(!event.isMine()||!lib.config.autoskilllist.contains('qiaobian1'))){
					event.finish();
				}
				else{
					var next=player.chooseToDiscard('是否发动巧变跳过判定阶段？');
					next.set('ai',ai.get.unuseful2);
					next.set('logSkill','qiaobian');
				}
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.finish();
				}
			}
		},
		qiaobian2:{
			audio:2,
			trigger:{player:'phaseDrawBefore'},
			filter:function(event,player){
				return player.num('h')>0;
			},
			direct:true,
			content:function(){
				"step 0"
				var check,i,num=0,num2=0;
				for(i=0;i<game.players.length;i++){
					if(player!=game.players[i]&&game.players[i].num('h')){
						var att=ai.get.attitude(player,game.players[i]);
						if(att<=0){
							num++;
						}
						if(att<0){
							num2++;
						}
					}
				}
				check=(num>=2&&num2>0);

				player.chooseCardTarget({
					ai1:function(card){
						var evt=_status.event;
						if(!evt.check) return 0;
						return 6-ai.get.useful(card);
					},
					ai2:function(target){
						var evt=_status.event;
						if(!evt.check) return 0;
						return 1-ai.get.attitude(evt.player,target);
					},
					filterTarget:function(card,player,target){
						return target.num('h')>0;
					},
					selectTarget:[0,2],
					filterCard:true,
					prompt:'是否发动巧变跳过摸牌阶段？',
					check:check,
					target:target
				});
				"step 1"
				if(result.bool){
					player.logSkill('qiaobian',result.targets);
					player.discard(result.cards);
				}
				"step 2"
				game.delay();
				"step 3"
				if(result.bool){
					for(var i=0;i<result.targets.length;i++){
						player.gain(result.targets[i].get('h').randomGet());
						result.targets[i].$give(1,player);
					}
					trigger.finish();
					trigger.untrigger();
					game.delay();
				}
				"step 4"
				if(result.bool) game.delay();
			},
			ai:{
				expose:0.2
			}
		},
		qiaobian3:{
			audio:2,
			trigger:{player:'phaseUseBefore'},
			filter:function(event,player){
				return player.num('h')>0;
			},
			direct:true,
			content:function(){
				"step 0"
				var check;
				for(var i=0;i<game.players.length;i++){
					if(ai.get.attitude(player,game.players[i])>0&&game.players[i].num('j')){
						check=true;break;
					}
				}
				if(!check){
					if(player.num('h')>player.hp+1){
						check=false;
					}
					else if(player.num('h',{name:['wuzhong']})){
						check=false;
					}
					else{
						check=true;
					}
				}

				player.chooseCardTarget({
					ai1:function(card){
						if(!_status.event.check) return 0;
						return 7-ai.get.useful(card);
					},
					ai2:function(target){
						if(!_status.event.check) return 0;
						var player=_status.event.player;
						if(ui.selected.targets.length==0){
							if(target.num('j')&&ai.get.attitude(player,target)>0) return 10;
							if(ai.get.attitude(player,target)<0){
								for(var i=0;i<game.players.length;i++){
									if(ai.get.attitude(player,game.players[i])>0){
										if((target.get('e','1')&&!game.players[i].get('e','1'))||
										(target.get('e','2')&&!game.players[i].get('e','2'))||
										(target.get('e','3')&&!game.players[i].get('e','3'))||
										(target.get('e','4')&&!game.players[i].get('e','4'))||
										(target.get('e','5')&&!game.players[i].get('e','5'))) return -ai.get.attitude(player,target);
									}
								}
							}
							return 0;
						}
						return -ai.get.attitude(player,target)*ai.get.attitude(player,ui.selected.targets[0]);
					},
					multitarget:true,
					filterTarget:function(card,player,target){
						if(ui.selected.targets.length){
							var from=ui.selected.targets[0];
							var judges=from.get('j');
							for(var i=0;i<judges.length;i++){
								if(!target.hasJudge(judges[i].viewAs||judges[i].name)) return true;
							}
							if(target.isMin()) return false;
							if((from.get('e','1')&&!target.get('e','1'))||
								(from.get('e','2')&&!target.get('e','2'))||
								(from.get('e','3')&&!target.get('e','3'))||
								(from.get('e','4')&&!target.get('e','4'))||
								(from.get('e','5')&&!target.get('e','5'))) return true;
							return false;
						}
						else{
							return target.num('ej')>0;
						}
					},
					selectTarget:2,
					filterCard:true,
					prompt:'是否发动巧变跳过出牌阶段？',
					targetprompt:['被移走','移动目标'],
					check:check,
					target:target
				});
				"step 1"
				if(result.bool==false){
					event.finish();
					return;
				}
				trigger.untrigger();
				trigger.finish();
				player.discard(result.cards);
				player.logSkill('qiaobian',result.targets,false);
				player.line2(result.targets);
				event.targets=result.targets;
				"step 2"
				game.delay();
				"step 3"
				if(targets.length==2){
					player.choosePlayerCard('ej',function(button){
						var player=_status.event.player;
						var targets0=_status.event.targets0;
						var targets1=_status.event.targets1;
						if(ai.get.attitude(player,targets0)>ai.get.attitude(player,targets1)){
							return get.position(button.link)=='j'?10:0;
						}
						else{
							if(get.position(button.link)=='j') return -10;
							return ai.get.equipValue(button.link);
						}
					},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]);
				}
				else{
					event.finish();
				}
				"step 4"
				if(result.bool){
					var link=result.links[0];
					if(get.position(link)=='e'){
						event.targets[1].equip(link);
					}
					else if(result.buttons[0].link.viewAs){
						event.targets[1].addJudge({name:link.viewAs},[link]);
					}
					else{
						event.targets[1].addJudge(link);
					}
					event.targets[0].$give(link,event.targets[1])
					game.delay();
				}
			},
			ai:{
				expose:0.2
			}
		},
		qiaobian4:{
			audio:2,
			trigger:{player:'phaseDiscardBefore'},
			direct:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				var discard=player.num('h')>player.hp;
				var next=player.chooseToDiscard('是否发动巧变跳过弃牌阶段？');
				next.logSkill='qiaobian';
				next.ai=function(card){
					if(discard){
						return 100-ai.get.useful(card);
					}
					else{
						return -1;
					}
				};
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.finish();
				}
			}
		},
		tuntian:{
			audio:2,
			trigger:{player:'loseEnd'},
			frequent:true,
			filter:function(event,player){
				if(player==_status.currentPhase) return false;
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original!='j') return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					if(get.suit(card)=='heart') return -1;
					return 1;
				},ui.special);
				"step 1"
				if(result.bool){
					result.card.goto(ui.special);
					player.storage.tuntian.push(result.card);
					result.node.moveDelete(player);
					game.broadcast(function(cardid,player){
						var node=lib.cardOL[cardid];
						if(node){
							node.moveDelete(player);
						}
					},result.node.cardid,player);
					game.addVideo('gain2',player,get.cardsInfo([result.node]));
					player.markSkill('tuntian');
					game.addVideo('storage',player,['tuntian',get.cardsInfo(player.storage.tuntian),'cards']);
				}
			},
			init:function(player){
				player.storage.tuntian=[];
			},
			intro:{
				content:'cards'
			},
			group:'tuntian_dist',
			subSkill:{
				dist:{
					mod:{
						globalFrom:function(from,to,distance){
							if(from.storage.tuntian) return distance-from.storage.tuntian.length;
						}
					}
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(!target.hasFriend()) return;
						if(get.tag(card,'loseCard')&&_status.currentPhase!=target&&target.num('he')){
							return [0.5,Math.max(2,target.num('h'))];
						}
						var hasfriend=false;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
								hasfriend=true;break;
							}
						}
						if(!hasfriend) return;
						if(get.tag(card,'respondSha')||get.tag(card,'respondShan')){
							if(target.num('h')==0) return 2;
							return [0.5,target.num('h','sha')+target.num('h','shan')];
						}
					}
				},
				threaten:function(player,target){
					if(target.num('h')==0) return 2;
					return 0.5;
				}
			}
		},
		zaoxian:{
			skillAnimation:true,
			audio:2,
			unique:true,
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				if(player.storage.tuntian) return player.storage.tuntian.length>=3&&!player.storage.zaoxian;
			},
			content:function(){
				player.loseMaxHp();
				player.addSkill('jixi');
				player.storage.zaoxian=true;
			}
		},
		jixi:{
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return player.storage.tuntian.length>0;
			},
			chooseButton:{
				dialog:function(event,player){
					return ui.create.dialog('急袭',player.storage.tuntian,'hidden');
				},
				backup:function(links,player){
					return {
						filterCard:function(){return false},
						selectCard:-1,
						viewAs:{name:'shunshou'},
						cards:links,
						onuse:function(result,player){
							result.cards=lib.skill.jixi_backup.cards;
							var card=result.cards[0];
							player.storage.tuntian.remove(card);
							player.syncStorage('tuntian');
							if(!player.storage.tuntian.length){
								player.unmarkSkill('tuntian');
							}
							else{
								player.markSkill('tuntian');
							}
							player.logSkill('jixi',result.targets);
						}
					}
				},
				prompt:function(links,player){
					return '选择急袭的目标';
				}
			},
			ai:{
				order:10,
				result:{
					player:function(player){
						return player.storage.tuntian.length-1;
					}
				}
			}
		},
		jiang:{
			audio:2,
			trigger:{player:['shaBefore','juedouBefore'],target:['shaBefore','juedouBefore']},
			filter:function(event,player){
				if(event.card.name=='juedou') return true;
				return get.color(event.card)=='red';
			},
			frequent:true,
			content:function(){
				player.draw();
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(card.name=='sha'&&get.color(card)=='red') return [1,0.6];
					},
					player:function(card,player,target){
						if(card.name=='sha'&&get.color(card)=='red') return [1,1];
					}
				}
			}
		},
		hunzi:{
			skillAnimation:true,
			audio:2,
			unique:true,
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				return player.hp==1;
			},
			forced:true,
			priority:3,
			group:'hunzi2',
			content:function(){
				player.loseMaxHp();
				if(player.hp>player.maxHp) player.loseHp();
				player.addSkill('reyingzi');
				delete player.tempSkills.yinghun;
				player.removeSkill('hunzi');
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 2;
					return 0.5;
				},
				maixie:true,
				effect:{
					target:function(card,player,target){
						var hasfriend=false;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
								hasfriend=true;break;
							}
						}
						if(!hasfriend) return;
						if(get.tag(card,'damage')==1&&target.hp==2&&_status.currentPhase!=target) return [0.5,1];
					}
				}
			}
		},
		hunzi2:{
			unique:true,
			trigger:{player:'phaseBefore'},
			filter:function(event,player){
				return player.hp==1;
			},
			forced:true,
			popup:false,
			content:function(){
				player.addTempSkill('yinghun','phaseAfter');
			},
		},
		zhiba:{
			unique:true,
			global:'zhiba2',
		},
		zhiba2:{
			audio:2,
			forceaudio:true,
			enable:'phaseUse',
			filter:function(event,player){
				var zhu=get.zhu('zhiba');
				if(!zhu) return false;
				return (player!=zhu&&player.group=='wu'&&player.num('h')>0&&zhu.num('h')>0);
			},
			filterTarget:function(card,player,target){
				return target.isZhu&&target.get('s').contains('zhiba');
			},
			usable:1,
			content:function(){
				"step 0"
				player.chooseToCompare(target,function(card){
					var player=get.owner(card);
					var target=_status.event.getParent().target;
					if(player!=target&&ai.get.attitude(player,target)>0){
						return -get.number(card);
					}
					return get.number(card);
				});
				"step 1"
				if(result.bool==false){
					target.gain([result.player,result.target]);
					target.$gain2([result.player,result.target]);
				}
			},
			ai:{
				basic:{
					order:1
				},
				expose:0.2,
				result:{
					target:function(player,target){
						if(player.num('h')<=player.hp) return false;
						var maxnum=0;
						var cards2=target.get('h');
						for(var i=0;i<cards2.length;i++){
							if(cards2[i].number>maxnum){
								maxnum=cards2[i].number;
							}
						}
						if(maxnum>10) maxnum=10;
						if(maxnum<5&&cards2.length>1) maxnum=5;
						var cards=player.get('h');
						for(var i=0;i<cards.length;i++){
							if(cards[i].number<maxnum) return 1;
						}
						return 0;
					}
				}
			}
		},
		zhijian:{
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h',{type:'equip'})>0;
			},
			filterCard:function(card){
				return get.type(card)=='equip';
			},
			check:function(card){
				var player=_status.currentPhase;
				if(player.num('he',{subtype:get.subtype(card)})>1){
					return 11-ai.get.equipValue(card);
				}
				return 6-ai.get.value(card);
			},
			filterTarget:function(card,player,target){
				if(target.isMin()) return false;
				return player!=target&&!target.get('e',get.subtype(card)[5]);
			},
			content:function(){
				target.equip(cards[0]);
				player.draw();
			},
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0],false);
			},
			ai:{
				basic:{
					order:10
				},
				result:{
					target:3,
				},
				threaten:1.3
			}
		},
		guzheng:{
			audio:2,
			unique:true,
			gainable:true,
			trigger:{global:'phaseDiscardEnd'},
			filter:function(event,player){
				if(event.player!=player&&event.player.classList.contains('dead')==false&&
				event.cards&&event.cards.length){
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i])=='d'){
							return true;
						}
					}
					return false;
				}
			},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)>0) return true;
				var num=0;
				for(var i=0;i<event.cards.length;i++){
					if(get.position(event.cards[i])=='d'){
						num++;
					}
				}
				return num>2;
			},
			direct:true,
			content:function(){
				"step 0"
				game.delay();
				"step 1"
				event.cards=trigger.cards.slice(0);
				for(var i=0;i<event.cards.length;i++){
					if(get.position(event.cards[i])!='d'){
						event.cards.splice(i,1);i--;
					}
				}
				if(event.cards.length==0){
					event.finish();
					return;
				}
				player.chooseCardButton(event.cards,'固政：选择令'+get.translation(trigger.player)+'收回的牌');
				"step 2"
				if(result.bool){
					player.logSkill('guzheng',trigger.player);
					trigger.player.gain(result.links[0]);
					trigger.player.$gain2(result.links[0]);
					game.log(trigger.player,'收回了',result.links[0]);
					event.cards.remove(result.links[0]);
					if(event.cards.length){
						player.gain(event.cards);
						player.$gain2(event.cards);
						game.log(player,'收回了',event.cards);
					}
					game.delay();
				}
			},
			ai:{
				threaten:1.3,
				expose:0.2
			}
		},
		beige:{
			audio:4,
			trigger:{global:'damageEnd'},
			filter:function(event,player){
				return (event.card&&event.card.name=='sha'&&event.source&&
					event.player.classList.contains('dead')==false&&player.num('he'));
			},
			direct:true,
			check:function(event,player){
				var att1=ai.get.attitude(player,event.player);
				var att2=ai.get.attitude(player,event.source);
				return att1>att2&&att1>=0;
			},
			content:function(){
				"step 0"
				var next=player.chooseToDiscard('he','是否发动【悲歌】？');
				next.set('ai',ai.get.unuseful2);
				next.set('logSkill','beige');
				"step 1"
				if(result.bool){
					trigger.player.judge();
				}
				else{
					event.finish();
				}
				"step 2"
				switch(get.suit(result.card)){
					case 'heart':trigger.player.recover();break;
					case 'diamond':trigger.player.draw(2);break;
					case 'club':trigger.source.chooseToDiscard('he',2,true);break;
					case 'spade':trigger.source.turnOver();break;
				}
			},
			ai:{
				expose:0.3
			}
		},
		duanchang:{
			audio:4,
			forbid:['boss'],
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source!=undefined;
			},
			content:function(){
				trigger.source.clearSkills();
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 0.2;
					return 1.5;
				},
				effect:{
					target:function(card,player,target,current){
						var hasfriend=false;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
								hasfriend=true;break;
							}
						}
						if(!hasfriend) return;
						if(target.hp<=1&&get.tag(card,'damage')) return [1,0,0,-2];
					}
				}
			}
		},
		huashen:{
			unique:true,
			forbid:['guozhan'],
			init:function(player){
				player.storage.huashen={
					list:[],
					owned:{},
					player:player,
				}
			},
			get:function(player,num){
				if(typeof num!='number') num=1;
				while(num--){
					var name=player.storage.huashen.list.randomRemove();
					var skills=lib.character[name][3].slice(0);
					for(var i=0;i<skills.length;i++){
						var info=lib.skill[skills[i]];
						if(info.unique&&!info.gainable){
							skills.splice(i--,1);
						}
					}
					player.storage.huashen.owned[name]=skills;
					player.popup(name);
					game.log(player,'获得了一个化身');
				}
			},
			group:['huashen1','huashen2'],
			intro:{
				content:function(storage,player){
					var str='';
					var slist=storage.owned;
					var list=[];
					for(var i in slist){
						list.push(i);
					}
					if(list.length){
						str+=get.translation(list[0]);
						for(var i=1;i<list.length;i++){
							str+='、'+get.translation(list[i]);
						}
					}
					var skill=player.additionalSkills.huashen;
					if(skill){
						str+='<p>当前技能：'+get.translation(skill);
					}
					return str;
				},
				mark:function(dialog,content,player){
					var slist=content.owned;
					var list=[];
					for(var i in slist){
						list.push(i);
					}
					if(list.length){
						dialog.addSmall([list,'character']);
					}
					var skill=player.additionalSkills.huashen;
					if(skill){
						dialog.add('<div><div class="skill">【'+get.translation(skill)+
						'】</div><div>'+lib.translate[skill+'_info']+'</div></div>');
					}
				}
			},
			mark:true
		},
		huashen1:{
			trigger:{global:['gameStart','phaseBefore']},
			forced:true,
			popup:false,
			priority:10,
			filter:function(event,player){
				return !player.storage.huasheninited;
			},
			content:function(){
				for(var i in lib.character){
					if(i.indexOf('stone_')==0) continue;
					var add=false;
					for(var j=0;j<lib.character[i][3].length;j++){
						var info=lib.skill[lib.character[i][3][j]];
						if(!info){
							continue;
						}
						if(info.gainable||!info.unique){
							add=true;break;
						}
					}
					if(add){
						player.storage.huashen.list.push(i);
					}
				}
				for(var i=0;i<game.players.length;i++){
					player.storage.huashen.list.remove([game.players[i].name]);
					player.storage.huashen.list.remove([game.players[i].name1]);
					player.storage.huashen.list.remove([game.players[i].name2]);
				}
				lib.skill.huashen.get(player,2);
				player.storage.huasheninited=true;
			}
		},
		huashen2:{
			audio:2,
			trigger:{player:['phaseBegin','phaseEnd'],global:'gameStart'},
			filter:function(event,player,name){
				if(name=='phaseBegin'&&game.phaseNumber==1) return false;
				return true;
			},
			priority:-9,
			forced:true,
			popup:false,
			content:function(){
				var slist=player.storage.huashen.owned;
				var list=[];
				for(var i in slist){
					list.push(i);
				}
				if(event.isMine()){
					event.dialog=ui.create.dialog('选择获得一项技能',[list,'character']);
					if(trigger.name=='game'){
						event.control=ui.create.control();
					}
					else{
						event.control=ui.create.control(['cancel']);
					}
					event.clickControl=function(link){
						if(link!='cancel'){
							var currentname=event.dialog.querySelector('.selected.button').link;
							var mark=player.marks.huashen;
							if(trigger.name=='game'){
								mark.hide();
								// mark.style.transform='scale(0.8)';
								mark.style.transition='all 0.3s';
								setTimeout(function(){
									mark.style.transition='all 0s';
									ui.refresh(mark);
									mark.setBackground(currentname,'character');
									if(mark.firstChild){
										mark.firstChild.remove();
									}
									setTimeout(function(){
										mark.style.transition='';
										mark.show();
										// mark.style.transform='';
									},50);
								},500);
							}
							else{
								if(mark.firstChild){
									mark.firstChild.remove();
								}
								mark.setBackground(currentname,'character');
							}
							player.addSkill(link);
							player.skills.remove(link);
							player.additionalSkills.huashen=link;
							player.logSkill('huashen2');
							game.log(player,'获得技能','【'+get.translation(link)+'】');
							player.popup(link);

							for(var i=0;i<event.dialog.buttons.length;i++){
								if(event.dialog.buttons[i].classList.contains('selected')){
									var name=event.dialog.buttons[i].link;
									player.sex=lib.character[name][0];
									player.group=lib.character[name][1];
									// player.node.identity.style.backgroundColor=get.translation(player.group+'Color');
									break;
								}
							}

							if(event.triggername=='phaseBegin'){
								(function(){
									var skills=[link];
									var list=[];
									game.expandSkills(skills);
									var triggerevent=event._trigger;
									var name='phaseBegin';
									for(i=0;i<skills.length;i++){
										var trigger=get.info(skills[i]).trigger;
										if(trigger){
											var add=false;
											if(player==triggerevent.player&&trigger.player){
												if(typeof trigger.player=='string'){
													if(trigger.player==name) add=true;
												}
												else if(trigger.player.contains(name)) add=true;
											}
											if(trigger.global){
												if(typeof trigger.global=='string'){
													if(trigger.global==name) add=true;
												}
												else if(trigger.global.contains(name)) add=true;
											}
											if(add&&player.isOut()==false) list.push(skills[i]);
										}
									}
									for(var i=0;i<list.length;i++){
										game.createTrigger('phaseBegin',list[i],player,triggerevent);
									}
								}());
							}
						}
						ui.auto.show();
						event.dialog.close();
						event.control.close();
						game.resume();
					};
					event.control.custom=event.clickControl;
					ui.auto.hide();
					game.pause();
					for(var i=0;i<event.dialog.buttons.length;i++){
						event.dialog.buttons[i].classList.add('selectable');
					}
					event.custom.replace.button=function(button){
						if(button.classList.contains('selected')){
							button.classList.remove('selected');
							if(trigger.name=='game'){
								event.control.style.opacity=0;
							}
							else{
								event.control.replace(['cancel']);
							}
						}
						else{
							for(var i=0;i<event.dialog.buttons.length;i++){
								event.dialog.buttons[i].classList.remove('selected');
							}
							button.classList.add('selected');
							event.control.replace(slist[button.link]);
							if(trigger.name=='game'&&getComputedStyle(event.control).opacity==0){
								event.control.style.transition='opacity 0.5s';
								ui.refresh(event.control);
								event.control.style.opacity=1;
								event.control.style.transition='';
								ui.refresh(event.control);
							}
							else{
								event.control.style.opacity=1;
							}
						}
						event.control.custom=event.clickControl;
					}
					event.custom.replace.window=function(){
						for(var i=0;i<event.dialog.buttons.length;i++){
							if(event.dialog.buttons[i].classList.contains('selected')){
								event.dialog.buttons[i].classList.remove('selected');
								if(trigger.name=='game'){
									event.control.style.opacity=0;
								}
								else{
									event.control.replace(['cancel']);
								}
								event.control.custom=event.clickControl;
								return;
							}
						}
					}
				}
				else{
					event.finish();
				}
			}
		},
		xinsheng:{
			audio:2,
			unique:true,
			forbid:['guozhan'],
			trigger:{player:'damageEnd'},
			frequent:true,
			filter:function(event,player){
				return player.storage.huashen&&player.storage.huashen.list&&
					player.storage.huashen.list.length>0;
			},
			content:function(){
				for(var i=0;i<trigger.num;i++){
					lib.skill.huashen.get(player);
				}
			}
		},
        huoshou:{
			locked:true,
			group:['huoshou1','huoshou2'],
			ai:{
				effect:{
					target:function(card,player,target){
						if(card.name=='nanman') return 0;
					}
				}
			}
		},
		huoshou1:{
			audio:2,
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:15,
			filter:function(event,player){
				return (event.card.name=='nanman');
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
		},
		huoshou2:{
			trigger:{global:'damageBefore'},
			forced:true,
			filter:function(event,player){
				return (event.card&&event.card.name=='nanman');
			},
			content:function(){
				trigger.source=player;
			}
		},
		zaiqi:{
			audio:2,
			trigger:{player:'phaseDrawBefore'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			check:function(event,player){
				if(player.maxHp-player.hp<2){
					return false;
				}
				else if(player.maxHp-player.hp==2){
					return player.num('h')>=2;
				}
				return true;
			},
			content:function(){
				"step 0"
				trigger.untrigger();
				trigger.finish();
				event.cards=get.cards(player.maxHp-player.hp);
				player.showCards(event.cards);
				"step 1"
				var num=0;
				for(var i=0;i<event.cards.length;i++){
					if(get.suit(event.cards[i])=='heart'){
						num++;
						ui.discardPile.appendChild(event.cards[i]);
						event.cards.splice(i--,1);
					}
				}
				if(num){
					player.recover(num);
				}
				"step 2"
				if(event.cards.length){
					player.gain(event.cards);
					player.$gain2(event.cards);
					game.delay();
				}
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 2;
					if(target.hp==2) return 1.5;
					return 1;
				},
			}
		},
		juxiang:{
			unique:true,
			locked:true,
			group:['juxiang1','juxiang2'],
			ai:{
				effect:{
					target:function(card){
						if(card.name=='nanman') return [0,1];
					}
				}
			}
		},
		juxiang1:{
			audio:2,
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:15,
			filter:function(event,player){
				return (event.card.name=='nanman');
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			}
		},
		juxiang2:{
			trigger:{global:'useCardAfter'},
			forced:true,
			filter:function(event,player){
				return (event.card.name=='nanman'&&event.player!=player&&get.position(event.card)=='d'&&get.itemtype(event.card)=='card');
			},
			content:function(){
				player.gain(trigger.card);
				player.$gain2(trigger.card);
			}
		},
		lieren:{
			audio:2,
			trigger:{source:'damageEnd'},
			filter:function(event,player){
				return (event.card&&event.card.name=='sha'&&
					event.player.classList.contains('dead')==false&&
					event.player.num('h')&&player.num('h'));
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<0&&player.num('h')>1;
			},
			priority:5,
			content:function(){
				"step 0"
				player.chooseToCompare(trigger.player);
				"step 1"
				if(result.bool&&trigger.player.num('he')){
					player.gainPlayerCard(trigger.player,true,'he');
				}
			}
		},
		xingshang:{
			audio:2,
			unique:true,
			gainable:true,
			trigger:{global:'dieEnd'},
			priority:5,
			filter:function(event){
				return event.playerCards&&event.playerCards.length>0
			},
			content:function(){
				"step 0"
				player.gain(trigger.playerCards);
				player.$draw(trigger.playerCards);
				game.delay();
				"step 1"
				for(var i=0;i<trigger.playerCards.length;i++){
					trigger.cards.remove(trigger.playerCards[i]);
				}
				trigger.playerCards.length=0;
			}
		},
		fangzhu:{
			audio:2,
			trigger:{player:'damageEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【放逐】？',function(card,player,target){
					return player!=target
				}).ai=function(target){
					var player=_status.event.player;
					if(ai.get.attitude(_status.event.player,target)==0) return 0;
					if(ai.get.attitude(_status.event.player,target)>0){
						if(target.classList.contains('turnedover')) return 1000-target.num('h');
						if(player.maxHp-player.hp<3) return -1;
						return 100-target.num('h');
					}
					else{
						if(target.classList.contains('turnedover')) return -1;
						if(player.maxHp-player.hp>=3) return -1;
						return 1+target.num('h');
					}
				}
				"step 1"
				if(result.bool){
					player.logSkill('fangzhu',result.targets);
					result.targets[0].draw(player.maxHp-player.hp);
					result.targets[0].turnOver();
				}
			},
			ai:{
				maixie:true,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.skills.contains('jueqing')) return [1,-2];
							if(target.hp<=1) return;
							var hastarget=false;
							var hasfriend=false;
							var turnfriend=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0&&!game.players[i].isTurnedOver()){
									hastarget=true;
								}
								if(ai.get.attitude(target,game.players[i])>0&&game.players[i].isTurnedOver()){
									hastarget=true;
									turnfriend=true;
								}
								if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
									hasfriend=true;
								}
							}
							if(ai.get.attitude(player,target)>0&&!hastarget) return;
							if(!hasfriend) return;
							if(turnfriend||target.hp==target.maxHp) return [0.5,1];
							if(target.hp>1) return [1,1];
						}
					}
				}
			}
		},
		songwei:{
			unique:true,
			global:'songwei2',
		},
		songwei2:{
			audio:2,
			forceaudio:true,
			trigger:{player:'judgeEnd'},
			filter:function(event,player){
				var zhu=get.zhu('songwei');
				if(!zhu) return false;
				return (player!=zhu&&player.group=='wei'&&get.color(event.result.card)=='black');
			},
			check:function(event,player){
				return ai.get.attitude(player,get.zhu('songwei'))>0;
			},
			content:function(){
				get.zhu('songwei').draw();
			}
		},
		duanliang:{
			group:['duanliang1','duanliang2'],
			ai:{
				threaten:1.2
			}
		},
		duanliang1:{
			audio:2,
			enable:'chooseToUse',
			filterCard:function(card){
				if(get.type(card)=='trick') return false;
				if(get.type(card)=='delay') return false;
				return get.color(card)=='black';
			},
			position:'he',
			viewAs:{name:'bingliang'},
			prompt:'将一黑色的基本牌或装备牌当兵粮寸断使用',
			check:function(card){return 6-ai.get.value(card)},
			ai:{
				order:9
			}
		},
		duanliang2:{
			mod:{
				targetInRange:function(card,player,target){
					if(card.name=='bingliang'){
						if(get.distance(player,target)<=2) return true;
					}
				}
			}
		},
		haoshi:{
			audio:2,
			trigger:{player:'phaseDrawBegin'},
			threaten:1.4,
			check:function(event,player){
				if(player.num('h')<=1) return true;
				var min=[];
				var temp=player.next.num('h');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')<temp){
						temp=game.players[i].num('h');
					}
				}
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')==temp){
						min.push(game.players[i]);
					}
				}
				for(var i=0;i<min.length;i++){
					if(ai.get.attitude(player,min[i])>0) return true;
				}
				return false;
			},
			content:function(){
				trigger.num+=2;
				player.addSkill('haoshi2');
			},
			ai:{
				threaten:2
			}
		},
		haoshi2:{
			trigger:{player:'phaseDrawEnd'},
			forced:true,
			popup:false,
			audio:false,
			content:function(){
				"step 0"
				player.removeSkill('haoshi2');
				if(player.num('h')<=5){
					event.finish();
					return;
				}
				var temp=player.next.num('h');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')<temp){
						temp=game.players[i].num('h');
					}
				}
				player.chooseCardTarget({
					selectCard:Math.floor(player.num('h')/2),
					filterTarget:function(card,player,target){
						return target.num('h')==_status.event.temp;
					},
					forced:true,
					ai2:function(target){
						return ai.get.attitude(_status.event.player,target);
					}
				}).set('temp',temp);
				"step 1"
				if(result.targets&&result.targets[0]){
					result.targets[0].gain(result.cards);
					player.$give(result.cards.length,result.targets[0]);
				}
			}
		},
		dimeng:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			position:'he',
			filterCard:true,
			selectCard:[0,Infinity],
			selectTarget:2,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				if(ui.selected.targets.length==0) return true;
				return (Math.abs(ui.selected.targets[0].num('h')-target.num('h'))==
					ui.selected.cards.length);
			},
			multitarget:true,
			content:function(){
				'step 0'
				event.cards0=targets[0].get('h');
				event.cards1=targets[1].get('h');
				targets[0].lose(event.cards0,ui.special);
				targets[1].lose(event.cards1,ui.special);
				'step 1'
				targets[0].gain(event.cards1);
				targets[1].gain(event.cards0);
				targets[0].$give(event.cards0.length,targets[1]);
				targets[1].$give(event.cards1.length,targets[0]);
			},
			check:function(card){
				var list=[],player=_status.event.player;
				var num=player.num('he');
				var count;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>3) list.push(game.players[i]);
				}
				list.sort(function(a,b){
					return a.num('h')-b.num('h');
				});
				if(list.length==0) return -1;
				var from=list[0];
				list.length=0;

				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])<1) list.push(game.players[i]);
				}
				if(list.length==0) return -1;
				list.sort(function(a,b){
					return b.num('h')-a.num('h');
				});
				if(from.num('h')>=list[0].num('h')) return -1;
				for(var i=0;i<list.length&&from.num('h')<list[i].num('h');i++){
					if(list[i].num('h')-from.num('h')<=num){
						count=list[i].num('h')-from.num('h');break;
					}
				}
				if(count<2&&from.num('h')>=2) return -1;
				if(ui.selected.cards.length<count) return 11-ai.get.value(card);
				return -1;
			},
			ai:{
				order:6,
				threaten:3,
				expose:0.9,
				result:{
					target:function(player,target){
						var list=[];
						var num=player.num('he');
						if(ui.selected.targets.length==0){
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>3) list.push(game.players[i]);
							}
							list.sort(function(a,b){
								return a.num('h')-b.num('h');
							});
							if(target==list[0]) return ai.get.attitude(player,target);
							return -ai.get.attitude(player,target);
						}
						else{
							var from=ui.selected.targets[0];
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])<1) list.push(game.players[i]);
							}
							list.sort(function(a,b){
								return b.num('h')-a.num('h');
							});
							if(from.num('h')>=list[0].num('h')) return -ai.get.attitude(player,target);
							for(var i=0;i<list.length&&from.num('h')<list[i].num('h');i++){
								if(list[i].num('h')-from.num('h')<=num){
									var count=list[i].num('h')-from.num('h');
									if(count<2&&from.num('h')>=2) return -ai.get.attitude(player,target);
									if(target==list[i]) return ai.get.attitude(player,target);
									return -ai.get.attitude(player,target);
								}
							}
						}
					}
				}
			}
		},
		yinghun:{
			audio:2,
			audioname:['sunce'],
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【英魂】？',function(card,player,target){
					return player!=target;
				}).set('ai',function(target){
					var player=_status.event.player;
					if(player.maxHp-player.hp==1&&target.num('he')==0){
						return 0;
					}
					if(ai.get.attitude(_status.event.player,target)>0){
						return 10+ai.get.attitude(_status.event.player,target);
					}
					if(player.maxHp-player.hp==1){
						return -1;
					}
					return 1;
				});
				"step 1"
				if(result.bool){
					player.logSkill('yinghun',result.targets);
					event.target=result.targets[0];
					player.chooseControl('yinghun_true','yinghun_false',function(event,player){
						if(ai.get.attitude(player,event.target)>0) return 'yinghun_true';
						return 'yinghun_false';
					})
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.control=='yinghun_true'){
					event.target.draw(player.maxHp-player.hp);
					event.target.chooseToDiscard(true,'he');
				}
				else{
					event.target.draw();
					event.target.chooseToDiscard(player.maxHp-player.hp,true,'he');
				}
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 2;
					if(target.hp==2) return 1.5;
					return 0.5;
				},
				maixie:true,
				effect:{
					target:function(card,player,target){
						if(target.maxHp<=3) return;
						if(get.tag(card,'damage')){
							if(target.hp==target.maxHp) return [0,1];
						}
						if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
					}
				}
			}
		},
		jiuchi:{
			audio:2,
			enable:'chooseToUse',
			filterCard:function(card){
				return get.suit(card)=='spade';
			},
			viewAs:{name:'jiu'},
			viewAsFilter:function(player){
				if(!player.num('h',{suit:'spade'})) return false;
			},
			prompt:'将一张黑桃手牌当酒使用',
			check:function(card){
				if(_status.event.type=='dying') return 1;
				return 4-ai.get.value(card);
			},
			ai:{
				skillTagFilter:function(player){
					return player.num('h',{suit:'spade'})>0;
				},
				threaten:1.5,
				save:true,
			}
		},
		roulin:{
			audio:2,
			trigger:{player:'shaBegin',target:'shaBegin'},
			forced:true,
			filter:function(event,player){
				if(event.directHit) return false;
				if(player==event.player){
					return event.target.sex=='female';
				}
				return event.player.sex=='female';
			},
			check:function(event,player){
				return player==event.player;
			},
			content:function(){
				"step 0"
				var next=trigger.target.chooseToRespond({name:'shan'});
				next.autochoose=lib.filter.autoRespondShan;
				next.ai=function(card){
					if(trigger.target.num('h','shan')>1){
						return ai.get.unuseful2(card);
					}
					return -1;
				};
				"step 1"
				if(result.bool==false){
					trigger.untrigger();
					trigger.directHit=true;
				}
			}
		},
		benghuai:{
			audio:4,
			trigger:{player:'phaseEnd'},
			forced:true,
			check:function(){
				return false;
			},
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].hp<player.hp) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				player.chooseControl('baonue_hp','baonue_maxHp',function(event,player){
					if(player.hp==player.maxHp) return 'baonue_hp';
					if(player.hp<player.maxHp-1||player.hp<=2) return 'baonue_maxHp';
					return 'baonue_hp';
				});
				"step 1"
				if(result.control=='baonue_hp'){
					player.loseHp();
				}
				else{
					player.loseMaxHp();
				}
			},
			ai:{
				threaten:0.5
			}
		},
		baonue:{
			unique:true,
			global:'baonue2'
		},
		baonue2:{
			audio:2,
			forceaudio:true,
			trigger:{source:'damageEnd'},
			filter:function(event,player){
				var zhu=get.zhu('baonue');
				if(!zhu) return false;
				return (player!=zhu&&player.group=='qun'&&zhu.hp<zhu.maxHp);
			},
			check:function(event,player){
				var zhu=get.zhu('baonue');
				if(!zhu) return false;
				return ai.get.attitude(player,zhu)>0;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					if(get.suit(card)=='spade') return 4;
					return 0;
				})
				"step 1"
				if(result.bool){
					var zhu=get.zhu('baonue');
					if(zhu){
						zhu.recover();
					}
				}
			}
		},
		luanwu:{
			audio:2,
			unique:true,
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.luanwu;
			},
			init:function(player){
				player.storage.luanwu=false;
			},
			mark:true,
			intro:{
				content:'limited'
			},
			skillAnimation:'epic',
			animationColor:'thunder',
			prepare:function(cards,player){
				player.line(game.players);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player){
						game.players[i].animate('target');
					}
				}
			},
			content:function(){
				"step 0"
				player.unmarkSkill('luanwu')
				player.storage.luanwu=true;
				event.current=player.next;
				"step 1"
				event.current.animate('target');
				event.current.chooseToUse('乱舞：使用一张杀或流失一点体力',{name:'sha'},function(card,player,target){
					if(player==target) return false;
					if(get.distance(player,target)<=1) return true;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==player) continue;
						if(get.distance(player,game.players[i])<get.distance(player,target)) return false;
					}
					return true;
				});
				"step 2"
				if(result.bool==false) event.current.loseHp();
				if(event.current.next!=player){
					event.current=event.current.next;
					game.delay(0.5);
					event.goto(1);
				}
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						if(lib.config.mode=='identity'&&game.zhu.isZhu&&player.identity=='fan'){
							if(game.zhu.hp==1&&game.zhu.num('h')<=2) return 1;
						}
						var num=0;
						for(var i=0;i<game.players.length;i++){
							var att=ai.get.attitude(player,game.players[i]);
							if(att>0) att=1;
							if(att<0) att=-1;
							if(game.players[i]!=player&&game.players[i].hp<=3){
								if(game.players[i].num('h')==0) num+=att/game.players[i].hp;
								else if(game.players[i].num('h')==1) num+=att/2/game.players[i].hp;
								else if(game.players[i].num('h')==2) num+=att/4/game.players[i].hp;
							}
							if(game.players[i].hp==1) num+=att*1.5;
						}
						// console.log(num);
						if(player.hp==1){
							return -num;
						}
						if(player.hp==2){
							return -game.players.length/4-num;
						}
						return -game.players.length/3-num;
					}
				}
			}
		},
		wansha:{
			locked:true,
			global:'wansha2'
		},
		wansha2:{
			mod:{
				cardSavable:function(card,player){
					if(!_status.currentPhase) return;
					if(_status.currentPhase.get('s').contains('wansha')&&_status.currentPhase!=player){
						if(card.name=='tao'&&_status.event.dying!=player) return false;
					}
				}
			}
		},
		weimu:{
			mod:{
				targetEnabled:function(card){
					if((get.type(card)=='trick'||get.type(card)=='delay')&&
						get.color(card)=='black') return false;
				}
			}
		},
        huoji:{
			audio:2,
			enable:'chooseToUse',
			filterCard:function(card){
				return get.color(card)=='red';
			},
			viewAs:{name:'huogong',nature:'fire'},
			viewAsFilter:function(player){
				if(!player.num('h',{color:'red'})) return false;
			},
			prompt:'将一张红色牌当火攻使用',
			check:function(card){
				var player=_status.currentPhase;
				if(player.num('h')>player.hp){
					return 6-ai.get.value(card);
				}
				return 4-ai.get.value(card)
			}
		},
		bazhen:{
			audio:2,
			inherit:'bagua_skill',
			filter:function(event,player){
				if(!event.filterCard({name:'shan'})) return false;
				if(event.getParent().player.num('s','unequip')) return false;
				if(player.get('e','2')) return false;
				return true;
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(player==target&&get.subtype(card)=='equip2'){
							if(ai.get.equipValue(card)<=8) return 0;
						}
						if(target.get('e','2')) return;
						if(player.skills.contains('unequip')) return;
						if(get.tag(card,'respondShan')) return [0.5,0];
					}
				}
			}
		},
		kanpo:{
			audio:2,
			enable:'chooseToUse',
			filterCard:function(card){
				return get.color(card)=='black';
			},
			viewAsFilter:function(player){
				return player.num('h',{color:'black'})>0;
			},
			viewAs:{name:'wuxie'},
			prompt:'将一张黑色手牌当无懈可击使用',
			check:function(card){return 8-ai.get.value(card)},
			threaten:1.2
		},
		lianhuan:{
			group:['lianhuan1','lianhuan2']
		},
		lianhuan1:{
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h',{suit:'club'})>0;
			},
			filterCard:function(card){
				return get.suit(card)=='club';
			},
			viewAs:{name:'tiesuo'},
			prompt:'将一张梅花牌当铁锁连环使用',
			check:function(card){return 4-ai.get.value(card)}
		},
		lianhuan2:{
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h',{suit:'club'})>0;
			},
			filterCard:function(card){
				return get.suit(card)=='club';
			},
			check:function(card){
				return 5-ai.get.useful(card);
			},
			content:function(){
				player.draw();
			},
			discard:false,
			prepare:function(cards,player){
				player.$throw(cards);
			},
			ai:{
				basic:{
					order:1
				},
				result:{
					player:1,
				},
			}
		},
		niepan:{
			audio:2,
			unique:true,
			enable:'chooseToUse',
			mark:true,
			skillAnimation:true,
			animationStr:'涅盘',
			animationColor:'fire',
			init:function(player){
				player.storage.niepan=false;
			},
			filter:function(event,player){
				if(event.type!='dying') return false;
				if(player!=event.dying) return false;
				if(player.storage.niepan) return false;
			},
			content:function(){
				'step 0'
				player.hp=Math.min(3,player.maxHp);
				player.discard(player.get('hej'));
				player.draw(3);
				player.unmarkSkill('niepan');
				player.storage.niepan=true;
				'step 1'
				if(player.classList.contains('linked')) player.link();
				'step 2'
				if(player.classList.contains('turnedover')) player.turnOver();
			},
			ai:{
				skillTagFilter:function(player){
					if(player.storage.niepan) return false;
					if(player.hp>0) return false;
				},
				save:true,
				result:{
					player:10
				},
				threaten:function(player,target){
					if(!target.storage.niepan) return 0.6;
				}
			},
			intro:{
				content:'limited'
			}
		},
		quhu:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				if(player.num('h')==0) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hp>player.hp&&game.players[i].num('h')) return true;
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return target.hp>player.hp&&target.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target);
				"step 1"
				if(result.bool){
					if(game.hasPlayer(function(player){
						return player!=target&&get.distance(target,player,'attack')<=1;
					})){
						player.chooseTarget(function(card,player,target){
							var source=_status.event.source;
							return target!=source&&get.distance(source,target,'attack')<=1;
						},true).set('ai',function(target){
							return ai.get.damageEffect(target,_status.event.source,player);
						}).set('source',target);
					}
					else{
						event.finish();
					}
				}
				else{
					player.damage(target);
					event.finish();
				}
				"step 2"
				if(result.bool&&result.targets&&result.targets.length){
					target.line(result.targets[0],'green');
					result.targets[0].damage(target);
				}
			},
			ai:{
				order:0.5,
				result:{
					target:function(player,target){
						var att=ai.get.attitude(player,target);
						var oc=(target.num('h')==1);
						if(att>0&&oc) return 0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&game.players[i]!=player&&
								get.distance(target,game.players[i],'attack')<=1){
								if(ai.get.damageEffect(game.players[i],target,player)>0){
									return att>0?att/2:att-(oc?5:0);
								}
							}
						}
						return 0;
					},
					player:function(player,target){
						if(target.skills.contains('jueqing')) return -10;
						var mn=1;
						var hs=player.get('h');
						for(var i=0;i<hs.length;i++){
							mn=Math.max(mn,hs[i].number);
						}
						if(mn<=11&&player.hp<2) return -20;
						var max=player.maxHp-hs.length;
						for(var i=0;i<game.players.length;i++){
							if(ai.get.attitude(player,game.players[i])>2){
								max=Math.max(Math.min(5,game.players[i].hp)-game.players[i].num('h'),max);
							}
						}
						switch(max){
							case 0:return mn==13?0:-20;
							case 1:return mn>=12?0:-15;
							case 2:return 0;
							case 3:return 1;
							default:return max;
						}
					}
				},
				expose:0.2
			}
		},
		jieming:{
			audio:2,
			trigger:{player:'damageEnd'},
			direct:true,
			filter:function(event,player){
				return event.num>0
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【节命】？',[1,trigger.num],function(card,player,target){
					return target.num('h')<Math.min(target.maxHp,5);
				}).set('ai',function(target){
					var att=ai.get.attitude(_status.event.player,target);
					if(att>2){
						return Math.min(5,target.maxHp)-target.num('h');
					}
					return att/3;
				});
				"step 1"
				if(result.bool){
					player.logSkill('jieming',result.targets);
					for(var i=0;i<result.targets.length;i++){
						result.targets[i].draw(Math.min(5,result.targets[i].maxHp)-result.targets[i].num('h'));
					}
				}
			},
			ai:{
				maixie:true,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'damage')&&target.hp>1){
							if(player.skills.contains('jueqing')) return [1,-2];
							var max=0;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])>0){
									max=Math.max(Math.min(5,game.players[i].hp)-game.players[i].num('h'),max);
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
							target.hp>1&&target.num('h')<=target.hp) return [0,0];
					}
				},
			}
		},
		qiangxi:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterCard:function(card){
				return get.subtype(card)=='equip1';
			},
			selectCard:[0,1],
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return get.distance(player,target,'attack')<=1;
			},
			content:function(){
				"step 0"
				if(cards.length==0){
					player.loseHp();
				}
				"step 1"
				target.damage();
			},
			check:function(card){
				return 10-ai.get.value(card);
			},
			position:'he',
			ai:{
				order:8,
				result:{
					player:function(player,target){
						if(ui.selected.cards.length) return 0;
						if(player.hp>=target.hp) return -0.9;
						if(player.hp<=2) return -10;
						return -2;
					},
					target:function(player,target){
						if(player.hp<=2) return 0;
						return ai.get.damageEffect(target,player);
					}
				}
			},
			threaten:1.3
		},
		tianyi:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player!=target&&target.num('h')>0;
			},
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target);
				"step 1"
				if(result.bool){
					player.addTempSkill('tianyi2','phaseAfter');
				}
				else{
					player.addTempSkill('tianyi3','phaseAfter');
				}
			},
			ai:{
				order:function(name,player){
					var cards=player.get('h');
					if(player.num('h','sha')==0){
						return 1;
					}
					for(var i=0;i<cards.length;i++){
						if(cards[i].name!='sha'&&cards[i].number>11&&ai.get.value(cards[i])<7){
							return 9;
						}
					}
					return lib.card.sha.ai.order-1;
				},
				result:{
					player:function(player){
						if(player.num('h','sha')>0) return 0.6;
						var num=player.num('h');
						if(num>player.hp) return 0;
						if(num==1) return -2;
						if(num==2) return -1;
						return -0.7;
					},
					target:function(player,target){
						var num=target.num('h');
						if(num==1) return -1;
						if(num==2) return -0.7;
						return -0.5
					},
				},
				threaten:1.3
			}
		},
		tianyi2:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha') return true;
				},
				selectTarget:function(card,player,range){
					if(card.name=='sha'&&range[1]!=-1) range[1]++;
				},
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num+1;
				}
			},
		},
		tianyi3:{
			mod:{
				cardEnabled:function(card){if(card.name=='sha') return false}
			}
		},
		shuangxiong:{
			audio:true,
			trigger:{player:'phaseDrawBefore'},
			check:function(event,player){
				if(player.num('h')>player.hp) return true;
				if(player.num('h')>3) return true;
				return false;
			},
			content:function(){
				"step 0"
				player.judge(ui.special);
				"step 1"
				player.gain(result.card);
				player.$gain2(result.card);
				player.addTempSkill('shuangxiong2','phaseAfter');
				player.storage.shuangxiong=get.color(result.card);
				trigger.untrigger();
				trigger.finish();
			}
		},
		shuangxiong2:{
			audio:true,
			enable:'phaseUse',
			viewAs:{name:'juedou'},
			filterCard:function(card,player){
				return get.color(card)!=player.storage.shuangxiong;
			},
			check:function(card){
				return 6-ai.get.value(card);
			},
			ai:{
				basic:{
					order:10
				}
			}
		},
		luanji:{
			audio:2,
			enable:'phaseUse',
			viewAs:{name:'wanjian'},
			filterCard:function(card,player){
				if(ui.selected.cards.length){
					return get.suit(card)==get.suit(ui.selected.cards[0]);
				}
				var cards=player.get('h');
				for(var i=0;i<cards.length;i++){
					if(card!=cards[i]){
						if(get.suit(card)==get.suit(cards[i])) return true;
					}
				}
				return false;
			},
			selectCard:2,
			check:function(card){
				return 6-ai.get.value(card);
			},
			ai:{
				basic:{
					order:10
				}
			}
		},
		xueyi:{
			mod:{
				maxHandcard:function(player,num){
					if(player.isZhu){
						for(var i=0;i<game.players.length;i++){
							if(player!=game.players[i]&&game.players[i].group=='qun') num+=2;
						}
					}
					return num;
				}
			}
		},
		mengjin:{
			audio:2,
			trigger:{player:'shaMiss'},
			priority:-1,
			filter:function(event){
				return event.target.num('he')>0;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.target)<0;
			},
			content:function(){
				player.discardPlayerCard('he',trigger.target,true);
			}
		},
		jiewei:{
			trigger:{player:'turnOverEnd'},
			direct:true,
			audio:2,
			content:function(){
				'step 0'
				player.chooseToUse(function(card){
					if(!lib.filter.cardEnabled(card,_status.event.player,_status.event)){
						return false;
					}
					var type=get.type(card,'trick');
					return type=='trick'||type=='equip';
				},'是否使用一张锦囊牌或装备牌？').set('logSkill','jiewei');
				'step 1'
				if(result.bool){
					var goon=false;
					var type=get.type(result.card||result.cards[0]);
					for(var i=0;i<game.players.length;i++){
						if(type=='equip'){
							if(game.players[i].num('e')){
								goon=true;break;
							}
						}
						else{
							if(game.players[i].num('j')){
								goon=true;break;
							}
						}
					}
					if(goon){
						var next=player.chooseTarget('是否弃置场上的一张'+get.translation(type)+'牌？',function(card,player,target){
							if(_status.event.type=='equip'){
								return target.num('e')>0;
							}
							else{
								return target.num('j')>0;
							}
						});
						next.set('ai',function(target){
							if(type=='equip'){
								return -ai.get.attitude(player,target);
							}
							else{
								return ai.get.attitude(player,target);
							}
						});
						next.set('type',type);
						event.type=type;
					}
					else{
						event.finish();
					}
				}
				else{
					event.finish();
				}
				'step 2'
				if(event.type&&result.bool&&result.targets&&result.targets.length){
					player.line(result.targets,'green');
					if(event.type=='equip'){
						player.discardPlayerCard(result.targets[0],'e',true);
					}
					else{
						player.discardPlayerCard(result.targets[0],'j',true);
					}
				}
			}
		},
		diyleiji:{
			audio:2,
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget('是否发动【新雷击】？').ai=function(target){
					return ai.get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
				};
				"step 1"
				if(result.bool){
					player.logSkill('diyleiji',result.targets,'thunder');
					event.target=result.targets[0];
					event.target.judge(function(card){
						var suit=get.suit(card);
						if(suit=='spade') return -4;
						if(suit=='club') return -2;
						return 0;
					});
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.suit=='club'){
					event.target.damage('thunder');
					player.recover();
				}
				else if(result.suit=='spade'){
					event.target.damage(2,'thunder');
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'respondShan')){
							var hastarget=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0){
									hastarget=true;break;
								}
							}
							var be=target.num('e',{color:'black'});
							if(target.num('h','shan')&&be){
								if(!target.skills.contains('guidao')) return 0;
								return [0,hastarget?target.num('he')/2:0];
							}
							if(target.num('h','shan')&&target.num('h')>2){
								if(!target.skills.contains('guidao')) return 0;
								return [0,hastarget?target.num('h')/4:0];
							}
							if(target.num('h')>3||(be&&target.num('h')>=2)){
								return [0,0];
							}
							if(target.num('h')==0){
								return [1.5,0];
							}
							if(target.num('h')==1&&!be){
								return [1.2,0];
							}
							if(!target.skills.contains('guidao')) return [1,0.05];
							return [1,Math.min(0.5,(target.num('h')+be)/4)];
						}
					}
				}
			}
		},
		shensu:{
			group:['shensu1','shensu2']
		},
		shensu1:{
			audio:2,
			trigger:{player:'phaseBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.addSkill('shensu3');
				var check= player.num('h')>2;
				player.chooseTarget('是否发动【神速】？',function(card,player,target){
					if(player==target) return false;
					return player.canUse({name:'sha'},target);
				}).ai=function(target){
					if(!check) return 0;
					return ai.get.effect(target,{name:'sha'},_status.event.player);
				}
				"step 1"
				if(result.bool){
					player.logSkill('shensu1',result.targets);
					player.useCard({name:'sha'},result.targets[0],false);
					player.skip('phaseJudge');
					player.skip('phaseDraw');
				}
				player.removeSkill('shensu3');
			}
		},
		shensu2:{
			audio:2,
			trigger:{player:'phaseUseBefore'},
			direct:true,
			filter:function(event,player){
				return player.num('he',{type:'equip'})>0;
			},
			content:function(){
				"step 0"
				player.addSkill('shensu3');
				var check=player.num('h')<=player.hp;
				player.chooseCardTarget({
					prompt:'是否发动【神速】？',
					filterCard:function(card){
						return get.type(card)=='equip'
					},
					position:'he',
					filterTarget:function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target);
					},
					ai1:function(card){
						if(!_status.event.check) return 0;
						return 6-ai.get.value(card);
					},
					ai2:function(target){
						if(!_status.event.check) return 0;
						return ai.get.effect(target,{name:'sha'},_status.event.player);
					},
					check:check
				});
				"step 1"
				if(result.bool){
					player.logSkill('shensu2',result.targets);
					player.discard(result.cards[0]);
					player.useCard({name:'sha'},result.targets[0]);
					trigger.untrigger();
					trigger.finish();
				}
				player.removeSkill('shensu3');
			}
		},
		shensu3:{
			mod:{
				targetInRange:function(card,player,target,now){
					return true;
				}
			},
		},
		jushou:{
			audio:true,
			trigger:{player:'phaseEnd'},
			content:function(){
				player.draw(3);
				player.turnOver();
			}
		},
		liegong:{
			audio:2,
			trigger:{player:'shaBegin'},
			check:function(event,player){
				return ai.get.attitude(player,event.target)<=0;
			},
			filter:function(event,player){
				var length=event.target.num('h');
				return (length>=player.hp||length<=get.attackRange(player));
			},
			content:function(){
				trigger.directHit=true;
			}
		},
		kuanggu:{
			audio:2,
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return get.distance(player,event.player)<=1;
			},
			content:function(){
				player.recover(trigger.num);
			}
		},
		tianxiang:{
			audio:2,
			trigger:{player:'damageBefore'},
			direct:true,
			filter:function(event,player){
				return player.num('h',{suit:'heart'})>0&&event.num>0;
			},
			content:function(){
				"step 0"
				player.chooseCardTarget({
					filterCard:function(card){
						return get.suit(card)=='heart';
					},
					filterTarget:function(card,player,target){
						return player!=target;
					},
					ai1:function(card){
						return 10-ai.get.value(card);
					},
					ai2:function(target){
						var att=ai.get.attitude(_status.event.player,target);
						var trigger=_status.event.getParent()._trigger;
						var da=0;
						if(_status.event.player.hp==1){
							da=10;
						}
						if(trigger.num>1){
							if(target.maxHp>5&&target.hp>1) return -att/10+da;
							return -att+da;
						}
						var eff=ai.get.damageEffect(target,trigger.source,target,trigger.nature);
						if(att==0) return 0.1+da;
						if(eff>=0&&trigger.num==1){
							return att+da;
						}
						if(target.hp==target.maxHp) return -att+da;
						if(target.hp==1){
							if(target.maxHp<=4&&!target.hasSkillTag('maixie')){
								if(target.maxHp<=3){
									return -att+da;
								}
								return -att/2+da;
							}
							return da;
						}
						if(target.hp==target.maxHp-1){
							if(target.hp>2||target.hasSkillTag('maixie')) return att/5+da;
							if(att>0) return 0.02+da;
							return 0.05+da;
						}
						return att/2+da;
					},
					prompt:'天香：弃置一张红桃牌转移伤害'
				});
				"step 1"
				if(result.bool){
					player.logSkill('tianxiang',result.targets);
					trigger.untrigger();
					trigger.player=result.targets[0];
					trigger.player.addSkill('tianxiang2');
					player.discard(result.cards[0]);
				}
				else{
					event.finish();
				}
				"step 2"
				trigger.trigger('damageBefore');
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(player.skills.contains('jueqing')) return;
						if(get.tag(card,'damage')&&target.num('h')>1) return 0.7;
					}
				},
				threaten:function(player,target){
					if(target.num('h')==0) return 2;
				}
			}
		},
		tianxiang2:{
			trigger:{player:['damageAfter','damageCancelled']},
			forced:true,
			popup:false,
			audio:false,
			content:function(){
				if(player.hp<player.maxHp) player.draw(player.maxHp-player.hp);
				player.removeSkill('tianxiang2');
				player.popup('tianxiang');
			}
		},
		hongyan:{
			mod:{
				suit:function(card,suit){
					if(suit=='spade') return 'heart';
				}
			}
		},
		buqu:{
			audio:2,
			trigger:{player:'dieBefore'},
			forced:true,
			filter:function(event,player){return player.maxHp>0},
			content:function(){
				"step 0"
				event.card=get.cards()[0];
				if(player.storage.buqu==undefined) player.storage.buqu=[];
				player.storage.buqu.push(event.card);
				player.syncStorage('buqu');
				player.showCards(player.storage.buqu,'不屈')
				player.markSkill('buqu');
				"step 1"
				for(var i=0;i<player.storage.buqu.length-1;i++){
					if(get.number(event.card)&&get.number(event.card)==get.number(player.storage.buqu[i])) return;
				}
				trigger.untrigger();
				trigger.finish();
				player.hp=0;
			},
			mod:{
				maxHandcard:function(player){
					if(player.storage.buqu&&player.storage.buqu.length) return player.storage.buqu.length;
				}
			},
			intro:{
				content:'cards',
				onunmark:function(storage,player){
					if(storage&&storage.length){
						player.$throw(storage);
						for(var i=0;i<storage.length;i++){
							ui.discardPile.appendChild(storage[i]);
						}
						delete player.storage.buqu;
					}
				}
			}
		},
		fenji:{
			audio:2,
			trigger:{global:'discardAfter'},
			filter:function(event){
				if(_status.currentPhase!=event.player){
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
				}
				return false;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>2;
			},
			content:function(){
				"step 0"
				player.loseHp();
				"step 1"
				trigger.player.draw(2);
			},
		},
		leiji:{
			audio:2,
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget('是否发动【雷击】？').ai=function(target){
					return ai.get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
				};
				"step 1"
				if(result.bool){
					player.logSkill('leiji',result.targets,'thunder');
					event.target=result.targets[0];
					event.target.judge(function(card){
						if(get.suit(card)=='spade') return -4;
						return 0;
					});
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool==false){
					event.target.damage(2,'thunder');
				}
			},
			ai:{
				mingzhi:false,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'respondShan')){
							var hastarget=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0){
									hastarget=true;break;
								}
							}
							if(target.num('h','shan')&&target.num('e',{suit:'spade'})){
								return [0,hastarget?target.num('he')/2:0];
							}
							if(target.num('h','shan')){
								return [1,hastarget?target.num('he')/2:0];
							}
							return [1,target.num('h')/4];
						}
					}
				}
			}
		},
		guidao:{
			audio:2,
			trigger:{global:'judge'},
			filter:function(event,player){
				return player.num('he',{color:'black'})>0;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
				get.translation(trigger.player.judging[0])+'，是否发动【鬼道】？','he',function(card){
					return get.color(card)=='black';
				}).set('ai',function(card){
					var trigger=_status.event.getParent()._trigger;
					var player=_status.event.player;
					var judging=_status.event.judging;
					var result=trigger.judge(card)-trigger.judge(judging);
					var attitude=ai.get.attitude(player,trigger.player);
					if(attitude==0||result==0) return 0;
					if(attitude>0){
						return result;
					}
					else{
						return -result;
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
					player.logSkill('guidao');
					player.$gain2(trigger.player.judging[0]);
					player.gain(trigger.player.judging[0]);
					trigger.player.judging[0]=result.cards[0];
					trigger.position.appendChild(result.cards[0]);
					game.log(trigger.player,'的判定牌改为',result.cards[0]);
				}
				"step 3"
				game.delay(2);
			},
			ai:{
				tag:{
					rejudge:1
				}
			}
		},
		guhuo:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				player.draw();
				player.chooseToDiscard('hej',true).ai=ai.get.disvalue;
			},
			ai:{
				effect:{
					target:function(card){
						if(get.type(card)=='delay') return [0,1];
					}
				}
			}
		},
		huangtian:{
			unique:true,
			global:'huangtian2'
		},
		huangtian2:{
			audio:2,
			enable:'phaseUse',
			discard:false,
			line:true,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
			},
			filter:function(event,player){
				var zhu=get.zhu('huangtian');
				if(!zhu) return false;
				return (player!=zhu&&player.group=='qun'&&
				(player.num('h','shan')+player.num('h','shandian')>0))
			},
			filterCard:function(card){
				return (card.name=='shan'||card.name=='shandian')
			},
			filterTarget:function(card,player,target){
				return target.isZhu&&target.get('s').contains('huangtian');
			},
			usable:1,
			forceaudio:true,
			content:function(){
				target.gain(cards);
			},
			ai:{
				expose:0.3,
				order:10,
				result:{
					target:5
				}
			}
		}
	},
	translate:{
        tiaoxin:'挑衅',
		zhiji:'志继',
		zhiji_draw:'摸牌',
		zhiji_recover:'回血',
		xiangle:'享乐',
		fangquan:'放权',
		ruoyu:'若愚',
		qiaobian:'巧变',
		qiaobian1:'巧变-判定',
		qiaobian2:'巧变-摸牌',
		qiaobian3:'巧变-出牌',
		qiaobian4:'巧变-弃牌',
		tuntian:'屯田',
		tuntian_bg:'田',
		zaoxian:'凿险',
		jixi:'急袭',
		jiang:'激昂',
		hunzi:'魂姿',
		zhiba:'制霸',
		zhiba2:'制霸',
		zhijian:'直谏',
		guzheng:'固政',
		beige:'悲歌',
		duanchang:'断肠',
		// fushen:'附身',
		huashen:'化身',
		huashen1:'化身',
		huashen2:'化身',
		xinsheng:'新生',
		tiaoxin_info:'出牌阶段，你可以指定一名使用【杀】能攻击到你的角色，该角色需对你使用一张【杀】，若该角色不如此做，你弃掉他的一张牌，每回合限一次。',
		zhiji_info:'觉醒技，回合开始阶段，若你没有手牌，你须回复1点体力或摸两张牌，然后剪1点体力上限，并永久获得技能“观星”。',
		xiangle_info:'锁定技，当其他玩家使用【杀】指定你为目标时，需额外弃掉一张基本牌，否则该【杀】对你无效。',
		fangquan_info:'你可跳过你的出牌阶段，若如此做，在回合结束时可弃一张手牌令一名其他角色进行一个额外的回合。',
		ruoyu_info:'主公技，觉醒技，回合开始阶段，若你的体力是全场最少的(或之一)，你须增加1点体力上限，回复1点体力，并永久获得技能“激将”。',
		qiaobian_info:'你可以弃一张手牌来跳过自己的一个阶段(回合开始和回合结束阶段除外);若以此法跳过摸牌阶段,你可以从其他至多两名角色手里各抽取一张牌;若以此法跳过出牌阶段,你可以将场上的一张牌移动到另一个合理的位置。',
		tuntian_info:'每次当你于回合外失去牌时，可以进行一次判定，将非♥结果的判定牌置于你的武将牌上，称为“田”，每有一张田，你计算与其他角色的距离便-1.',
		zaoxian_info:'觉醒技，回合开始阶段，若田的数量达到3张或更多，你须减1点体力上限，并永久获得技能“急袭”（出牌阶段，你可以把任意一张田当【顺手牵羊】使用）。',
		jiang_info:'每当你使用（指定目标后）或被使用（成为目标后）一张【决斗】或红色的【杀】时，你可以摸一张牌。',
		hunzi_info:'觉醒技，回合开始阶段，若你的体力为1，你须减1点体力上限，并永久获得技能“英姿”和“英魂”。',
		zhiba_info:'主公技，其他吴势力角色的出牌阶段，可与你进行一次拼点，若该角色没赢，你可以获得双方拼点的牌；你的觉醒技发动后，你可以拒绝此拼点。每回合限一次。',
		zhijian_info:'出牌阶段，你可以将你手牌中的一张装备牌置于一名其他角色装备区里（不得替换原装备），然后摸一张牌。',
		guzheng_info:'其他角色的弃牌阶段结束时，你可将其弃置的一张牌返回其手牌，然后获得其弃置的其它牌',
		beige_info:'一名角色每受到【杀】造成的一次伤害，你可以弃一张牌，并令其进行一次判定，判定结果为：♥该角色回复1点体力；♦︎该角色摸两张牌；♣伤害来源弃两张牌；♠伤害来源将其武将牌翻面',
		duanchang_info:'锁定技，杀死你的角色失去当前的所有技能直到游戏结束。',
		// fushen_info:'回合开始前，你可以选择与任意一名角色交换控制权，该角色可选择在下一个回合开始前与你换回',
		huashen_info:'所有人都展示武将牌后，你随机获得两张未加入游戏的武将牌，选一张置于你面前并声明该武将的一项技能，你拥有该技能且同时将性别和势力属性变成与该武将相同知道该化身被替换。在你的每个回合开始时和结束后，你可以替换化身牌，你须为新的化身重新声明一项技能（你不可声明锁定技、觉醒技或主公技）。',
		xinsheng_info:'你每受到1点伤害，可获得一张新化身牌。',
		jiangwei:'姜维',
		liushan:'刘禅',
		zhanghe:'张郃',
		dengai:'邓艾',
		sunce:'孙策',
		zhangzhang:'张昭张紘',
		caiwenji:'蔡文姬',
		zuoci:'左慈',

        zhurong:'祝融',
		menghuo:'孟获',
		caopi:'曹丕',
		xuhuang:'徐晃',
		lusu:'鲁肃',
		sunjian:'孙坚',
		dongzhuo:'董卓',
		jiaxu:'贾诩',
		huoshou:'祸首',
		huoshou1:'祸首',
		huoshou2:'祸首',
		zaiqi:'再起',
		juxiang:'巨象',
		juxiang1:'巨象',
		juxiang2:'巨象',
		lieren:'烈刃',
		xingshang:'行殇',
		fangzhu:'放逐',
		songwei:'颂威',
		songwei2:'颂威',
		duanliang:'断粮',
		duanliang1:'断粮',
		haoshi:'好施',
		dimeng:'缔盟',
		yinghun:'英魂',
		yinghun_true:'摸X弃1',
		yinghun_false:'摸1弃X',
		jiuchi:'酒池',
		roulin:'肉林',
		benghuai:'崩坏',
		baonue:'暴虐',
		baonue2:'暴虐',
		baonue_hp:'体力',
		baonue_maxHp:'体力上限',
		luanwu:'乱武',
		wansha:'完杀',
		weimu:'帷幕',
		huoshou_info:'【南蛮入侵】对你无效；你是任何【南蛮入侵】造成伤害的来源。',
		zaiqi_info:'摸牌阶段，若你已受伤，你可以放弃摸牌并展示牌堆顶的X张牌，X为你已损失的体力值，其中每有一张♥牌，你回复1点体力，然后弃掉这些♥牌，将其余的牌收入手牌。',
		juxiang_info:'南蛮入侵】对你无效；若其他角色使用的【南蛮入侵】在结算完时进入弃牌堆，你立即获得它。',
		lieren_info:'你每使用【杀】造成一次伤害，可与受到该伤害的角色拼点；若你赢，你获得对方的一张牌。',
		xingshang_info:'你可以立即获得死亡角色的所有牌。',
		fangzhu_info:'你每受到一次伤害，可令除你以外的任一角色补X张牌，X为你已损失的体力值，然后该角色将其武将牌翻面。',
		songwei_info:'主公技，其他魏势力的角色的判定牌结果为♠或♣且失效后，可以让你摸一张牌。',
		duanliang_info:'出牌阶段，你可以将你的任意一张♠或♣的基本牌或装备牌当【兵粮寸断】使用；你可以对与你距离2以内的角色使用【兵粮寸断】。',
		haoshi_info:'摸牌阶段，你可以额外摸两张牌，若此时你的手牌数多于五张，你必须将一半(向下取整)的手牌交给场上除你外手牌数最少的一名角色。',
		dimeng_info:'出牌阶段，你可以选择其他两名角色，你弃掉等同于这两名角色手牌数量之差的牌，然后交换他们的手牌，每回合限一次。',
		yinghun_info:'回合开始阶段，若你已受伤，可选择一名其他角色执行下列两项中的一项： 1.摸X张牌，然后弃一张牌。 2.摸一张牌，然后弃X张牌。 X为你已损失的体力值，每回合限一次。',
		jiuchi_info:'你可将你的任意一张♠手牌当【酒】使用。',
		roulin_info:'你对女性角色、女性角色对你使用【杀】时，都需连续使用两张【闪】才能抵消。',
		benghuai_info:'回合结束阶段，若你的体力不是全场最少的(或之一)，你须减1点体力或体力上限。',
		baonue_info:'主公技，其他群雄角色每造成一次伤害，可进行一次判定，若为♠，你回复1点体力。',
		luanwu_info:'出牌阶段，可令除你外的所有角色依次对与其距离最近的另一名角色使用一张【杀】，无法如此做者失去1点体力。',
		wansha_info:'在你的回合，除你以外，只有处于濒死状态的角色才能使用【桃】。',
		weimu_info:'你不能成为♠或♣锦囊的目标。',

        sp_zhugeliang:'卧龙',
		pangtong:'庞统',
		xunyu:'荀彧',
		dianwei:'典韦',
		taishici:'太史慈',
		yanwen:'颜良文丑',
		yuanshao:'袁绍',
		pangde:'庞德',
		huoji:'火计',
		bazhen:'八阵',
		kanpo:'看破',
		lianhuan:'连环',
		lianhuan1:'连环',
		lianhuan2:'重铸♣︎',
		niepan:'涅槃',
		quhu:'驱虎',
		jieming:'节命',
		qiangxi:'强袭',
		tianyi:'天义',
		shuangxiong:'双雄',
		shuangxiong2:'双雄',
		luanji:'乱击',
		xueyi:'血裔',
		mengjin:'猛进',
		huoji_info:'出牌阶段，你可以将你的任意一张♥或♦手牌当【火攻】使用。',
		bazhen_info:'当你没装备防具时，始终视为你装备着【八卦阵】。',
		kanpo_info:'你可以将你的任意一张♠或♣手牌当【无懈可击】使用。',
		lianhuan_info:'出牌阶段，你可以将你任意一张梅花手牌当【铁索连环】使用或重铸。',
		niepan_info:'限定技，当你处于濒死状态时，你可以丢弃你所有的牌和你判定区里的牌，并重置你的武将牌，然后摸三张牌且体力回复至3点。',
		quhu_info:'出牌阶段，你可以与一名体力比你多的角色拼点，若你赢，则该角色对其攻击范围内另一名由你指定的角色造成1点伤害。若你没赢，他/她对你造成一点伤害。每回合限用一次。',
		jieming_info:'你每受到1点伤害，可令任意一名角色将手牌补至其体力上限的张数(不能超过五张)。',
		qiangxi_info:'出牌阶段，你可以自减一点体力或弃一张武器牌，然后你对你攻击范围内的一名角色造成一点伤害，每回合限一次。',
		tianyi_info:'出牌阶段，你可以和一名角色拼点，若你赢，你获得以下技能直到回合结束：攻击范围无限；可额外使用一张【杀】；使用【杀】时可额外指定一个目标，若你没赢，你不能使用【杀】直到回合结束。每回合限一次。',
		shuangxiong_info:'摸牌阶段，你可选择放弃摸牌并进行一次判定：你获得此判定牌，且于此回合的出牌阶段，你可以将任意一张与此判定牌不同颜色的手牌当【决斗】使用。',
		luanji_info:'出牌阶段，你可以将任意两张相同花色的手牌当【万箭齐发】使用。',
		xueyi_info:'场上每有一名其他群雄角色存活，你的手牌上限便+2。',
		mengjin_info:'当你使用的【杀】被【闪】抵消时，你可以弃掉对方的一张牌。',

		xiahouyuan:'夏侯渊',
		caoren:'曹仁',
		huangzhong:'黄忠',
		sp_zhangjiao:'张角',
		weiyan:'魏延',
		xiaoqiao:'小乔',
		zhoutai:'周泰',
		zhangjiao:'张角',
		yuji:'于吉',
		shensu:'神速',
		shensu1:'神速',
		shensu2:'神速',
		jushou:'据守',
		liegong:'烈弓',
		kuanggu:'狂骨',
		tianxiang:'天香',
		hongyan:'红颜',
		buqu:'不屈',
		leiji:'雷击',
		spleiji:'新雷击',
		guidao:'鬼道',
		huangtian:'黄天',
		huangtian2:'黄天',
		guhuo:'蛊惑',
		fenji:'奋激',
		diyleiji:'雷击',
		jiewei:'解围',
		jiewei_info:'每当你翻面，你可以使用一张锦囊牌或装备牌，若如此做，此牌结算后，你可以弃置场上一张同类型的牌',
		diyleiji_info:'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为梅花，其受到一点雷电伤害，然后你回复一点体力；若结果为黑桃，其受到两点雷电伤害',
		tiangong:'天公',
		tiangong2:'天公',
		tiangong_info:'锁定技，你防止即将受到的雷电伤害，每当你造成一次雷电伤害，你摸一张牌',
		shensu_info:
		'你可以跳过摸牌阶段，或跳过出牌阶段并弃置一张装备牌，'+
		'若如此则视为对任意一名使用一张【杀】',
		jushou_info:
		'回合结束阶段，你可以摸3张牌并将武将牌翻面',
		liegong_info:
		'当你使用【杀】时，若目标的手牌数大于等于你的体力值，或小于等于你的攻击范围，你可令此【杀】不能闪避',
		kuanggu_info:
		'锁定技，每当你造成一点伤害，若受伤害角色与你的距离不大于1，你回复一点体力',
		tianxiang_info:
		'当你即将受到伤害时，你可以弃置一张红桃牌将伤害转移给任意一名其他角色，然后该角色摸x张牌，x为其已损失体力值',
		hongyan_info:
		'锁定技，你的黑桃牌均视为红桃',
		buqu_info:
		'锁定技，每当你扣减1点体力后，若你当前的体力值为0，你可以将牌堆顶的一张牌置于你的武将牌上，'+
		'称为“创”，若所有“创”的点数均不同，你不会死亡。你的手牌上限为“创”的个数',
		leiji_info:
		'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为黑桃，其受到两点雷电伤害',
		spleiji_info:
		'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为黑色，其受到一点雷电伤害，然后你回复一点体力',
		guidao_info:
		'任意一名角色的判定生效前，你可以打出一张黑色牌替换之',
		huangtian_info:
		'主公技，群雄角色可在他们各自的回合里给你一张【闪】或【闪电】。',
		guhuo_info:
		'锁定技，回合开始阶段，你摸一张牌并弃置区域内的一张牌',
		fenji_info:
		'每当一名角色的手牌于回合外被弃置时，你可以失去1点体力，然后该角色摸两张牌。'
	},
}
