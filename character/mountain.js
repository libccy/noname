'use strict';
character.mountain={
	character:{
		jiangwei:['male','shu',4,['tiaoxin','zhiji']],
		liushan:['male','shu',3,['xiangle','fangquan','ruoyu'],['zhu']],
		zhanghe:['male','wei',4,['qiaobian']],
		dengai:['male','wei',4,['tuntian','zaoxian']],
		sunce:['male','wu',4,['jiang','hunzi','zhiba'],['zhu','fullskin']],
		zhangzhang:['male','wu',3,['zhijian','guzheng']],
		caiwenji:['female','qun',3,['beige','duanchang']],
		zuoci:['male','qun',3,['huashen','xinsheng']],
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
				target.chooseToUse({name:'sha'},player);
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
			audio:2,
			unique:true,
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
				player.addSkill('guanxing')
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
				}).ai=function(card){
					if(eff>0){
						return 10-ai.get.value(card);
					}
					return 0;
				};
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
							if(player.num('h',{type:'basic'})<2) return 0;
							var bs=player.num('h',{type:'basic'});
							if(bs.length<2) return 0;
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
				player.chooseTarget('是否发动放权？',function(card,player,target){
					return target!=player;
				}).ai=function(target){
					if(!fang) return -1;
					return ai.get.attitude(player,target)-4;
				};
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
				target.marks.fangquan=target.markCharacter(player,{
					name:'放权',
					content:'进行一个额外的回合'
				});
				game.addVideo('markCharacter',target,{
					name:'放权',
					content:'进行一个额外的回合',
					id:'fangquan',
					target:player.dataset.position
				});
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
				if(player.marks.fangquan){
					player.marks.fangquan.delete();
					delete player.marks.fangquan;
					game.addVideo('unmark',player,'fangquan');
				}
				player.removeSkill('fangquan3');
			}
		},
		ruoyu:{
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
					var next=player.chooseToDiscard('是否发动巧变路过判定阶段？');
					next.ai=ai.get.unuseful2;
					next.logSkill='qiaobian';
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
						if(!check) return 0;
						return 6-ai.get.useful(card);
					},
					ai2:function(target){
						if(!check) return 0;
						return 1-ai.get.attitude(player,target);
					},
					filterTarget:function(card,player,target){
						return target.num('h')>0;
					},
					selectTarget:[0,2],
					filterCard:true,
					prompt:'是否发动巧变路过摸牌阶段？'
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
			check:function(event,player){

			},
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
						if(!check) return 0;
						return 7-ai.get.useful(card);
					},
					ai2:function(target){
						if(!check) return 0;
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
					prompt:'是否发动巧变路过出牌阶段？',
					targetprompt:['被移走','移动目标']
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
						if(ai.get.attitude(player,targets[0])>ai.get.attitude(player,targets[1])){
							return get.position(button.link)=='j'?10:0;
						}
						else{
							if(get.position(button.link)=='j') return -10;
							return ai.get.equipValue(button.link);
						}
					},targets[0]);
				}
				else{
					event.finish();
				}
				"step 4"
				if(result.bool){
					if(get.position(result.buttons[0].link)=='e'){
						event.targets[1].equip(result.buttons[0].link);
					}
					else if(result.buttons[0].link.viewAs){
						event.targets[1].addJudge({name:result.buttons[0].link.viewAs},[result.buttons[0].link]);
					}
					else{
						event.targets[1].addJudge(result.buttons[0].link);
					}
					event.targets[0].$give(result.buttons[0].link,event.targets[1])
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
				var next=player.chooseToDiscard('是否发动巧变路过弃牌阶段？');
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
			mod:{
				globalFrom:function(from,to,distance){
					if(from.storage.tuntian) return distance-from.storage.tuntian.length;
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
			delay:false,
			direct:true,
			content:function(){
				"step 0"
				player.chooseCardButton('急袭',player.storage.tuntian);
				"step 1"
				if(result.bool){
					var card=result.buttons[0].link;
					event.card=card;
					player.chooseTarget(function(noname,player,target){
						var temp=card.name;
						card.name='shunshou';
						var result=player.canUse(card,target);
						card.name=temp;
						return result;
					}).ai=function(target){
						return -ai.get.attitude(player,target);
					};
				}
				else{
					player.addTempSkill('jixi_nouse','phaseAfter');
					event.finish();
				}
				"step 2"
				if(result.bool&&result.targets&&result.targets.length){
					var card=event.card;
					player.storage.tuntian.remove(card);
					game.addVideo('storage',player,['tuntian',get.cardsInfo(player.storage.tuntian),'cards']);
					if(!player.storage.tuntian.length){
						player.unmarkSkill('tuntian');
					}
					player.logSkill('jixi',result.targets);
					player.useCard({name:'shunshou'},[event.card],result.targets[0]);
				}
			},
			ai:{
				order:10,
				result:{
					player:function(player){
						if(player.skills.contains('jixi_nouse')) return 0;
						return player.storage.tuntian.length-1;
					}
				}
			}
		},
		jixi_nouse:{},
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
				if(!game.zhu) return false;
				if(!game.zhu.isZhu) return false;
				return (player!=game.zhu&&game.zhu.skills.contains('zhiba')&&
					player.group=='wu'&&player.num('h')>0&&game.zhu.num('h')>0);
			},
			filterTarget:function(card,player,target){
				return target==game.zhu;
			},
			usable:1,
			content:function(){
				"step 0"
				player.chooseToCompare(target,function(card){
					var player=get.owner(card);
					if(player!=game.zhu&&ai.get.attitude(player,game.zhu)>0){
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
					target:function(player){
						var cards=player.get('h');
						for(var i=0;i<cards.length;i++){
							if(cards[i].number<=9) return 1;
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
					trigger.player.gain(result.buttons[0].link);
					trigger.player.$gain2(result.buttons[0].link);
					game.log(get.translation(trigger.player)+'收回了'+get.translation(result.buttons[0].link));
					event.cards.remove(result.buttons[0].link);
					if(event.cards.length){
						player.gain(event.cards);
						player.$gain2(event.cards);
						game.log(get.translation(player)+'收回了'+get.translation(event.cards));
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
			audio:6,
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
				var next=player.chooseToDiscard('he','是否发动悲歌？');
				next.ai=ai.get.unuseful2;
				next.logSkill='beige';
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
					get:function(num){
						if(typeof num!='number') num=1;
						var player=this.player;
						while(num--){
							var name=player.storage.huashen.unowned.shift();
							var skills=lib.character[name][3].slice(0);
							for(var i=0;i<skills.length;i++){
								var info=lib.skill[skills[i]];
								if(info.unique&&!info.gainable){
									skills.splice(i--,1);
								}
							}
							player.storage.huashen.owned[name]=skills;
							player.popup(name);
							game.log(get.translation(player)+'获得了一个化身');
						}
					}
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
				player.storage.huashen.unowned=player.storage.huashen.list.slice(0);
				player.storage.huashen.unowned.sort(lib.sort.random);
				player.storage.huashen.get(2);
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

							player.additionalSkills.huashen=link;
							player.logSkill('huashen2');
							game.log(get.translation(player)+'获得技能'+get.translation(link));
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
				return player.storage.huashen&&player.storage.huashen.unowned&&
					player.storage.huashen.unowned.length>0;
			},
			content:function(){
				for(var i=0;i<trigger.num;i++){
					player.storage.huashen.get();
				}
			}
		},
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
		guzheng_info:'其他角色的弃牌阶段结束时，你可将此阶段中弃掉的一张牌从弃牌堆返回该角色手牌；若如此做，你可以获得弃牌堆里其余于此阶段中弃掉的牌。',
		beige_info:'一名角色每受到【杀】造成的一次伤害，你可以弃一张牌，并令其进行一次判定，判定结果为：♥该角色回复1点体力；♦︎该角色摸两张牌；♣伤害来源弃两张牌；♠伤害来源将其武将牌翻面',
		duanchang_info:'锁定技，杀死你的角色失去当前的所有技能直到游戏结束。',
		// fushen_info:'回合开始前，你可以选择与任意一名角色交换控制权，该角色可选择在下一个回合开始前与你换回',
		huashen_info:'所有人都展示武将牌后，你随机获得两张未加入游戏的武将牌，选一张置于你面前并声明该武将的一项技能，你拥有该技能且同时将性别和势力属性变成与该武将相同知道该化身被替换。在你的每个回合开始时和结束后，你可以替换化身牌，你须为新的化身重新声明一项技能（你不可声明锁定技、觉醒技或主公技）。',
		xinsheng_info:'你每受到1点伤害，可获得一张新化身牌。',
		jiangwei:'姜维',
		liushan:'刘禅',
		zhanghe:'张颌',
		dengai:'邓艾',
		sunce:'孙策',
		zhangzhang:'张昭张紘',
		caiwenji:'蔡文姬',
		zuoci:'左慈',
	},
}
