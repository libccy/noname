character.yijiang={
	character:{
		yujin:['male','wei',4,['yizhong'],['fullskin']],
		caozhang:['male','wei',4,['jiangchi'],['fullskin']],
		guohuai:['male','wei',4,['jingce'],['fullskin']],
		zhangchunhua:['female','wei',3,['jueqing','shangshi'],['fullskin']],
		caozhi:['male','wei',3,['luoying','jiushi'],['fullskin']],
		caochong:['male','wei',3,['renxin','chengxiang'],['fullskin']],
		xunyou:['male','wei',3,['zhiyu','qice'],['fullskin']],
		xushu:['male','shu',3,['wuyan','jujian'],['fullskin']],
		xin_xushu:['male','shu',3,['xinwuyan','xinjujian'],['fullskin']],
		xin_masu:['male','shu',3,['sanyao','zhiman'],['fullskin']],
		masu:['male','shu',3,['xinzhan','huilei'],['fullskin']],
		fazheng:['male','shu',3,['enyuan','xuanhuo'],['fullskin']],
		xin_fazheng:['male','shu',3,['xinenyuan','xinxuanhuo'],['fullskin']],
		// zhuran:['male','wu',4,['danshou']],
		xusheng:['male','wu',4,['pojun'],['fullskin']],
		wuguotai:['female','wu',3,['ganlu','buyi'],['fullskin']],
		lingtong:['male','wu',4,['xuanfeng'],['fullskin']],
		liubiao:['male','qun',3,['zongshi','zishou'],['fullskin']],
		huaxiong:['male','qun',6,['yaowu'],['fullskin']],
		wangyi:['female','wei',3,['zhenlie','miji'],['fullskin']],
		yufan:['male','wu',3,['zhiyan','zongxuan'],['fullskin']],
		chengong:['male','qun',3,['mingce','zhichi'],['fullskin']],
		bulianshi:['female','wu',3,['anxu','zhuiyi'],['fullskin']],
		handang:['male','wu',4,['gongji','jiefan'],['fullskin']],
		fuhuanghou:['female','qun',3,['zhuikong','qiuyuan'],['fullskin']],
		zhonghui:['male','wei',4,['quanji','zili'],['fullskin']],
		jianyong:['male','shu',3,['qiaoshui','jyzongshi'],['fullskin']],
		madai:['male','shu',4,['mashu','qianxi'],['fullskin']],
		liufeng:['male','shu',4,['xiansi'],['fullskin']],
		manchong:['male','wei',3,['junxing','yuce'],['fullskin']],
		liru:['male','qun',3,['juece','mieji','fencheng'],['fullskin']],
		guanzhang:['male','shu',4,['fuhun'],['fullskin']],
		chenqun:['male','wei',3,['dingpin','faen'],['fullskin']],
		sunluban:['female','wu',3,['chanhui','jiaojin'],['fullskin']],
		guyong:['male','wu',3,['shenxing','bingyi'],['fullskin']],
		caifuren:['female','qun',3,['qieting','xianzhou'],['fullskin']],
		yj_jushou:['male','qun',3,['jianying','shibei'],['fullskin']],
		zhangsong:['male','shu',3,['qiangzhi','xiantu'],['fullskin']],
		zhuhuan:['male','wu',4,['youdi'],['fullskin'],['fullskin']],
		// zhoucang:['male','shu',4,['zhongyong'],['fullskin']],
	},
	skill:{
		youdi:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return player.num('he')>0;
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【诱敌】？',function(card,player,target){
					return player!=target;
				}).ai=function(target){
					if(target.num('he')==0) return 0;
					return -ai.get.attitude(player,target);
				}
				"step 1"
				if(result.bool){
					game.delay();
					player.logSkill('youdi',result.targets);
					event.target=result.targets[0];
					event.target.discardPlayerCard(player,'he',true);
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.links[0].name!='sha'&&event.target.num('he')){
					player.gainPlayerCard('he',event.target,true);
				}
			},
			ai:{
				expose:0.2,
				threaten:1.4
			}
		},
		fuhun:{
			enable:['chooseToUse','chooseToRespond'],
			filterCard:true,
			selectCard:2,
			position:'h',
			viewAs:{name:'sha'},
			prompt:'将两张手牌当杀使用或打出',
			check:function(card){
				if(_status.event.player.num('h')<4) return 6-ai.get.useful(card);
				return 7-ai.get.useful(card);
			},
			ai:{
				respondSha:true,
				order:function(item,player){
					if(player.skills.contains('wusheng')&&player.skills.contains('paoxiao')){
						return 1;
					}
					if(player.num('h')<4){
						return 1;
					}
					return 4;
				},
			},
			group:'fuhun2'
		},
		fuhun2:{
			trigger:{source:'damageAfter'},
			forced:true,
			filter:function(event){
				return event.parent.skill=='fuhun';
			},
			content:function(){
				player.addTempSkill('wusheng','phaseAfter');
				player.addTempSkill('paoxiao','phaseAfter');
			}
		},
		fencheng:{
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.fencheng;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			unique:true,
			selectTarget:-1,
			mark:true,
			line:'fire',
			content:function(){
				"step 0"
				player.storage.fencheng=true;
				player.unmarkSkill('fencheng');
				var res=ai.get.damageEffect(target,player,target,'fire');
				var num=Math.max(1,target.num('e'));
				target.chooseToDiscard(num,'he','弃置'+get.cnNumber(num)+'张牌或受到1点火焰伤害').ai=function(card){
					if(res>=0) return -1;
					if(num>2&&player.hp>1) return -1;
					if(num>1&&player.hp>2) return -1;
					if(get.position(card)=='e'){
						return 10-ai.get.value(card);
					}
					return 6-ai.get.value(card);
				}
				"step 1"
				if(!result.bool){
					target.damage('fire');
				}
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(player!=game.players[i]&&ai.get.damageEffect(game.players[i],player,game.players[i],'fire')<0){
								var att=ai.get.attitude(player,game.players[i]);
								if(att>0){
									num-=Math.max(1,game.players[i].num('e'));
								}
								else if(att<0){
									num+=Math.max(1,game.players[i].num('e'));
								}
							}
						}
						if(game.players.length<5){
							return num-1;
						}
						else{
							return num-2;
						}
					}
				}
			},
			init:function(player){
				player.storage.fencheng=false;
			},
			intro:{
				content:'limited'
			}
		},
		mieji:{
			trigger:{player:'useCardBegin'},
			direct:true,
			filter:function(event,player){
				return event.targets.length==1&&get.type(event.card)=='trick'&&get.color(event.card)=='black';
			},
			position:'he',
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【灭计】？',function(card,player,target){
					return lib.filter.filterTarget(trigger.card,player,target)&&target!=trigger.targets[0];
				}).ai=function(target){
					return ai.get.effect(target,trigger.card,player,player);
				};
				"step 1"
				if(result.bool){
					trigger.targets.push(result.targets[0]);
					player.logSkill('mieji',result.targets);
				}
			}
		},
		junxing:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			selectCard:[1,Infinity],
			filter:function(event,player){
				return player.num('h')>0;
			},
			check:function(card){
				if(ui.selected.cards.length) return -1;
				var val=ai.get.value(card);
				if(get.type(card)=='basic') return 8-ai.get.value(card);
				return 5-ai.get.value(card);
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			content:function(){
				"step 0"
				var types=[];
				for(var i=0;i<cards.length;i++){
					types.add(get.type(cards[i],'trick'));
				}
				var dialog=ui.create.dialog('弃置一张与'+get.translation(player)+'弃置的牌类别均不同的牌，或将武将牌翻面','hidden');
				dialog.classList.add('noselect');
				dialog.add(cards);
				target.chooseToDiscard(dialog,function(card){
					return !types.contains(get.type(card,'trick'));
				}).ai=function(card){
					if(target.isTurnedOver()) return -1;
					return 8-ai.get.value(card);
				};
				"step 1"
				if(!result.bool){
					target.turnOver();
					target.draw(cards.length);
				}
			},
			ai:{
				order:2,
				expose:0.3,
				threaten:1.8,
				result:{
					target:function(player,target){
						if(target.isTurnedOver()) return 2;
						return -1/(target.num('h')+1);
					}
				}
			}
		},
		juece:{
			trigger:{global:'loseEnd'},
			check:function(event,player){
				return ai.get.damageEffect(event.player,player,player)>0;
			},
			filter:function(event,player){
				if(event.player.num('h')) return false;
				if(_status.currentPhase!=player) return false;
				if(event.player==player) return false;
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original=='h') return true;
				}
				return false;
			},
			content:function(){
				trigger.player.damage();
			},
			ai:{
				threaten:1.1
			}
		},
		jiefan:{
			unique:true,
			mark:true,
			init:function(player){
				player.storage.jiefan=false;
			},
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.jiefan;
			},
			intro:{
				content:'limited'
			},
			filterTarget:true,
			content:function(){
				"step 0"
				player.unmarkSkill('jiefan');
				player.storage.jiefan=true;
				event.players=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=target&&get.distance(game.players[i],target,'attack')<=1){
						event.players.push(game.players[i]);
					}
				}
				lib.tempSortSeat=target;
				event.players.sort(lib.sort.seat);
				delete lib.tempSortSeat;
				"step 1"
				if(event.players.length){
					event.current=event.players.shift();
					event.current.animate('target');
					if(event.current.num('he')&&target.isAlive()){
						event.current.chooseToDiscard({subtype:'equip1'},'he','弃置一张武器牌或让'+
						get.translation(target)+'摸一张牌').ai=function(card){
							if(ai.get.attitude(event.current,target)<0) return 7-ai.get.value(card);
							return -1.
						};
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool==false){
					target.draw();
				}
				event.goto(1);
			},
			ai:{
				order:5,
				result:{
					target:function(player,target){
						if(player.hp>2){
							if(game.phaseNumber<game.players.length*2) return 0;
						}
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&get.distance(game.players[i],target,'attack')<=1){
								num++;
							}
						}
						return num;
					}
				}
			}
		},
		fuli:{
			unique:true,
			enable:'chooseToUse',
			init:function(player){
				player.storage.fuli=false;
			},
			mark:true,
			filter:function(event,player){
				if(event.type!='dying') return false;
				if(player!=_status.dying) return false;
				if(player.storage.fuli) return false;
			},
			content:function(){
				"step 0"
				player.unmarkSkill('fuli');
				player.recover(player.maxHp);
				"step 1"
				player.turnOver();
				player.storage.fuli=true;
			},
			ai:{
				save:true,
				result:{
					player:10
				},
				threaten:function(player,target){
					if(!target.storage.fuli) return 0.9;
				}
			},
			intro:{
				content:'limited'
			}
		},
		qianxi:{
			trigger:{player:'phaseBegin'},
			log:false,
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				})
				"step 1"
				event.color=result.color;
				player.chooseTarget(function(card,player,target){
					return player!=target&&get.distance(player,target)<=1;
				},true).ai=function(target){
					return -ai.get.attitude(player,target);
				};
				"step 2"
				if(result.bool&&result.targets.length){
					result.targets[0].storage.qianxi2=event.color;
					result.targets[0].addSkill('qianxi2');
					player.logSkill('qianxi',result.targets);
				}
			},
		},
		qianxi2:{
			trigger:{global:'phaseAfter'},
			forced:true,
			mark:true,
			content:function(){
				player.removeSkill('qianxi2');
				delete player.storage.qianxi2;
			},
			mod:{
				cardEnabled:function(card,player){
					if(get.color(card)==player.storage.qianxi2) return false;
				},
				cardUsable:function(card,player){
					if(get.color(card)==player.storage.qianxi2) return false;
				},
				cardRespondable:function(card,player){
					if(get.color(card)==player.storage.qianxi2) return false;
				},
				cardSavable:function(card,player){
					if(get.color(card)==player.storage.qianxi2) return false;
				}
			},
			intro:{
				content:function(color){
					return '不能使用或打出'+get.translation(color)+'的手牌';
				}
			}
		},
		zhiman:{
			trigger:{source:'damageBefore'},
			check:function(event,player){
				if(ai.get.damageEffect(event.player,player,player)<0) return true;
				var cards=event.player.get('e');
				for(var i=0;i<cards.length;i++){
					if(ai.get.equipValue(cards[i])>=6) return true;
				}
				return false;
			},
			content:function(){
				if(trigger.player.num('ej')){
					player.gainPlayerCard(trigger.player,'ej',true);
				}
				trigger.untrigger();
				trigger.finish();
			}
		},
		sanyao:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hp>target.hp) return false;
				}
				return true;
			},
			check:function(card){return 7-ai.get.value(card);},
			position:'he',
			filterCard:true,
			content:function(){
				target.damage();
			},
			ai:{
				result:{
					target:function(player,target){
						if(target.num('j')&&ai.get.attitude(player,target)>0){
							return 1;
						}
						if(target.num('e')){
							return -1;
						}
						return ai.get.damageEffect(target,player);
					},
				},
				order:7
			}
		},
		qiaoshui:{
			trigger:{player:'phaseUseBegin'},
			direct:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【巧说】？',function(card,player,target){
					return player!=target&&target.num('h')>0;
				}).ai=function(target){
					return -ai.get.attitude(player,target)/target.num('h');
				}
				"step 1"
				if(result.bool){
					player.logSkill('qiaoshui',result.targets[0]);
					player.chooseToCompare(result.targets[0]);
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.gain(result.target,'gain2');
					player.addTempSkill('jizhi','phaseAfter');
				}
				else{
					player.gain(result.player,'gain2');
					player.addTempSkill('qiaoshui2','phaseAfter');
				}
			},
			ai:{
				expose:0.1
			}
		},
		qiaoshui2:{
			mod:{
				cardEnabled:function(card){
					if(get.type(card,'trick')=='trick') return false;
				}
			}
		},
		jyzongshi:{
			trigger:{target:'useCardToBegin'},
			filter:function(event,player){
				if(event.targets&&event.targets.length>1) return false;
				return event.card&&get.type(event.card)=='trick'&&event.player!=player;
			},
			frequent:true,
			content:function(){
				player.draw();
			},
			ai:{
				effect:function(card,player,target){
					if(get.type(card)=='trick') return [1,1];
				},
			}
		},
		shenxing:{
			enable:'phaseUse',
			position:'he',
			filterCard:true,
			selectCard:2,
			prompt:'弃置任意张牌并摸等量的牌',
			check:function(card){return 4-ai.get.useful(card)},
			content:function(){
				player.draw();
			},
			ai:{
				order:1,
				result:{
					player:1
				},
			},
		},
		bingyi:{
			trigger:{player:'phaseDiscardEnd'},
			filter:function(event,player){
				var cards=player.get('h');
				if(cards.length<1) return false;
				var color=get.color(cards[0]);
				for(var i=1;i<cards.length;i++){
					if(get.color(cards[i])!=color) return false;
				}
				return true;
			},
			content:function(){
				"step 0"
				player.showHandcards();
				"step 1"
				var num=player.num('h');
				player.chooseTarget('选择至多'+num+'名角色各摸一张牌',[1,num],function(card,player,target){
					return true;
				}).ai=function(target){
					return ai.get.attitude(player,target);
				}
				"step 2"
				if(result.bool){
					event.num=0;
					event.targets=result.targets;
					player.logSkill('bingyi',result.targets);
					game.asyncDraw(result.targets);
				}
			},
			ai:{
				expose:0.1,
			}
		},
		xiantu:{
			unique:true,
			gainnable:true,
			trigger:{global:'phaseUseBegin'},
			filter:function(event,player){
				return event.player!=player&&player.num('h')>0;
			},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)<5) return false;
				if(player.maxHp-player.hp>=2) return false;
				if(player.hp==1) return false;
				if(player.hp==2&&player.num('h')<2) return false;
				if(event.player.num('h')>=event.player.hp) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.draw(2);
				"step 1"
				player.chooseCard(2,true,'交给'+get.translation(trigger.player)+'两张牌').ai=function(card){
					if(ui.selected.cards.length&&card.name==ui.selected.cards[0].name) return -1;
					if(get.tag(card,'damage')) return 1;
					if(get.type(card)=='equip') return 1;
					return 0;
				};
				"step 2"
				trigger.player.gain(result.cards);
				if(player==game.me||trigger.player==game.me)
				player.$give(result.cards,trigger.player);
				else
				player.$give(2,trigger.player);
				game.delay();
				trigger.player.addSkill('xiantu2');
				trigger.player.storage.xiantu=player;
			},
			ai:{
				threaten:1.1,
				expose:0.3
			}
		},
		xiantu2:{
			trigger:{player:'phaseUseEnd'},
			forced:true,
			content:function(){
				if(player.storage.xiantu){
					player.storage.xiantu.loseHp();
					delete player.storage.xiantu;
				}
				player.removeSkill('xiantu2');
			},
			group:'xiantu3'
		},
		xiantu3:{
			trigger:{source:'dieAfter'},
			forced:true,
			content:function(){
				delete player.storage.xiantu;
				player.removeSkill('xiantu2');
			}
		},
		qiangzhi:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('h')>0;
			},
			content:function(){
				var card=target.get('h').randomGet();
				player.showCards(card);
				player.storage.qiangzhi=get.type(card,'trick');
				player.markSkill('qiangzhi');
			},
			intro:{
				content:function(type){
					return get.translation(type)+'牌';
				}
			},
			group:['qiangzhi2','qiangzhi3'],
			ai:{
				order:11,
				result:{
					player:1
				}
			}
		},
		qiangzhi2:{
			trigger:{player:'useCard'},
			frequent:true,
			filter:function(event,player){
				return (get.type(event.card,'trick')==player.storage.qiangzhi&&event.cards[0]&&event.cards[0]==event.card);
			},
			content:function(){
				player.draw();
			},
			ai:{
				threaten:1.4
			}
		},
		qiangzhi3:{
			trigger:{player:'phaseUseEnd'},
			forced:true,
			popup:false,
			content:function(){
				delete player.storage.qiangzhi;
				player.unmarkSkill('qiangzhi');
			}
		},
		dingpin:{
			enable:'phaseUse',
			usable:3,
			filter:function(event,player){
				return player.num('h')>0;
			},
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp&&!target.tempSkills['dingpin2'];
			},
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				"step 0"
				target.judge(function(card){
					return get.color(card)=='black'?1:-1;
				});
				"step 1"
				if(result.bool){
					target.draw(target.maxHp-target.hp);
					target.addTempSkill('dingpin2','phaseAfter');
				}
				else{
					player.turnOver();
				}
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(player.isTurnedOver()) return 1;
						if(target.hp<target.maxHp-1) return 1;
						return 0;
					}
				}
			}
		},
		faen:{
			trigger:{global:['turnOverAfter','linkAfter']},
			filter:function(event,player){
				if(event.name=='link') return event.player.isLinked();
				return true;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>0;
			},
			content:function(){
				trigger.player.draw();
			},
			ai:{
				expose:0.2
			}
		},
		jiaojin:{
			trigger:{player:'damageBegin'},
			filter:function(event,player){
				return player.num('he',{type:'equip'})&&event.source&&event.source.sex=='male';
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseToDiscard('he','是否弃置一张装备牌令伤害-1？',function(card,player){
					return get.type(card)=='equip';
				}).ai=function(card){
					if(player.hp==1||trigger.num>1){
						return 9-ai.get.value(card);
					}
					if(player.hp==2){
						return 8-ai.get.value(card);
					}
					return 7-ai.get.value(card);
				};
				"step 1"
				if(result.bool){
					player.logSkill('jiaojin');
					game.delay();
					trigger.num--;
				}
			}
		},
		chanhui:{
			trigger:{player:'useCard'},
			filter:function(event,player){
				if(_status.currentPhase!=player) return false;
				if(player.skills.contains('chanhui2')) return false;
				if(event.targets.length>1) return false;
				var card=event.card;
				if(card.name=='sha') return true;
				if(get.color(card)=='black'&&get.type(card)=='trick') return true;
				return false;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【谮毁】？',function(card,player,target){
					return player.canUse(trigger.card,target)&&trigger.targets.contains(target)==false;
				}).ai=function(target){
					return ai.get.effect(target,trigger.card,player,player)+1;
				}
				"step 1"
				if(result.bool){
					game.delay();
					player.addSkill('chanhui2');
					event.target=result.targets[0];
					setTimeout(function(){
						player.logSkill('chanhui',event.target,'green');
					},200);
					event.target.chooseCard('交给'+get.translation(player)+'一张手牌，或成为'+
					get.translation(trigger.card)+'的额外目标').ai=function(card){
						return 5-ai.get.value(card);
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.gain(result.cards);
					event.target.$give(1,player);
					game.delay();
					trigger.untrigger();
					trigger.player=event.target;
					trigger.trigger('useCard');
					game.log(get.translation(event.target)+'成为了'+get.translation(trigger.card)+'的使用者');
				}
				else{
					game.log(get.translation(event.target)+'成为了'+get.translation(trigger.card)+'的额外目标');
					trigger.targets.push(event.target);
				}
			}
		},
		chanhui2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			content:function(){
				player.removeSkill('chanhui2');
			}
		},
		quanji:{
			trigger:{player:'damageEnd'},
			frequent:true,
			locked:false,
			init:function(player){
				player.storage.quanji=[];
			},
			content:function(){
				"step 0"
				player.draw(trigger.num);
				"step 1"
				if(player.num('he')){
					player.chooseCard('将'+get.cnNumber(trigger.num)+'张手牌置于武将牌上作为“权”',trigger.num,true);
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.cards&&result.cards.length){
					player.lose(result.cards,ui.special);
					player.storage.quanji=player.storage.quanji.concat(result.cards);
					game.log(get.translation(player)+'将'+get.translation(result.cards)+'置于武将牌上作为“权”');
					player.markSkill('quanji');
				}
			},
			intro:{
				content:'cards'
			},
			mod:{
				maxHandcard:function(player,num){
					return num+player.storage.quanji.length;
				}
			},
			ai:{
				maixie:true,
				threaten:0.8,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.skills.contains('jueqing')) return [1,-2];
							var hasfriend=false;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
									hasfriend=true;break;
								}
							}
							if(!hasfriend) return;
							if(target.hp>=4) return [0.5,get.tag(card,'damage')*2];
							if(target.hp==3) return [0.5,get.tag(card,'damage')*1.5];
							if(target.hp==2) return [1,get.tag(card,'damage')*0.5];
						}
					}
				}
			}
		},
		zili:{
			unique:true,
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return !player.skills.contains('paiyi')&&player.storage.quanji&&player.storage.quanji.length>=3;
			},
			content:function(){
				"step 0"
				player.chooseControl('recover_hp','draw_card',function(event,player){
					if(player.hp>=2) return 'draw_card';
					return 'recover_hp';
				});
				"step 1"
				if(result.control=='draw_card'){
					player.draw(2);
				}
				else{
					player.recover();
				}
				"step 2"
				player.loseMaxHp();
				player.addSkill('paiyi');
			}
		},
		paiyi:{
			enable:'phaseUse',
			usable:1,
			filterTarget:true,
			filter:function(event,player){
				return player.storage.quanji.length>0;
			},
			content:function(){
				"step 0"
				player.chooseCardButton(player.storage.quanji,true);
				"step 1"
				var card=result.buttons[0].link;
				player.discard(card);
				player.storage.quanji.remove(card);
				if(!player.storage.quanji.length){
					player.unmarkSkill('quanji');
				}
				"step 2"
				target.draw(2);
				"step 3"
				if(target.num('h')>player.num('h')){
					target.damage();
				}
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(player!=target) return 0;
						if(player.num('h')+2<=player.hp+player.storage.quanji.length) return 1;
						return 0;
					}
				}
			}
		},
		xianzhou:{
			unique:true,
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.xianzhou&&player.num('e')>0;
			},
			init:function(player){
				player.storage.xianzhou=false;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			mark:true,
			content:function(){
				"step 0"
				player.unmarkSkill('xianzhou');
				var cards=player.get('e');
				target.gain(cards);
				event.num=cards.length;
				player.$give(cards,target);
				player.storage.xianzhou=true;
				game.delay();
				"step 1"
				target.chooseTarget([1,event.num],'令'+get.translation(player)+'回复'+
					event.num+'点体力，或对攻击范围内的'+event.num+'名角色造成一点伤害',function(card,player,target2){
					return get.distance(target,target2,'attack')<=1;
				}).ai=function(target2){
					if(ai.get.attitude(target,player)>0){
						if(player.hp+event.num<=player.maxHp||player.hp==1) return -1;
					}
					return ai.get.damageEffect(target2,target,target);
				}
				"step 2"
				if(result.bool){
					event.targets=result.targets;
					event.num2=0;
				}
				else{
					player.recover(event.num);
					event.finish();
				}
				"step 3"
				if(event.num2<event.targets.length){
					event.targets[event.num2].damage(target);
					event.num2++;
					event.redo();
				}
			},
			intro:{
				content:'limited'
			},
			ai:{
				order:1,
				result:{
					target:1,
					player:function(player){
						if(player.hp==1) return 1;
						if(game.phaseNumber<game.players.length) return -10;
						if(player.num('e')+player.hp<=player.maxHp) return 1;
						return -10;
					}
				},
			}
		},
		qieting:{
			global:'qieting2',
			globalSilent:true,
			trigger:{global:'phaseEnd'},
			filter:function(event,player){
				return event.player!=player&&!event.player.tempSkills['qieting3'];
			},
			frequent:true,
			content:function(){
				"step 0"
				if(trigger.player.num('e')){
					player.choosePlayerCard(trigger.player,'e','选择装备一张装备牌，或摸一张牌');
				}
				"step 1"
				if(result&&result.buttons&&result.buttons.length){
					game.delay(2);
					trigger.player.$give(result.buttons[0].link,player);
					player.equip(result.buttons[0].link);
				}
				else{
					player.draw();
				}
			},
			ai:{
				expose:0.1
			}
		},
		qieting2:{
			trigger:{player:'useCard'},
			filter:function(event,player){
				return _status.currentPhase==player&&event.targets&&(event.targets.length>1||event.targets[0]!=player);
			},
			forced:true,
			popup:false,
			content:function(){
				player.addTempSkill('qieting3','phaseAfter');
			}
		},
		qieting3:{},
		zhuikong:{
			trigger:{global:'phaseBegin'},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)<-2){
					var cards=player.get('h');
					if(cards.length>player.hp) return true;
					for(var i=0;i<cards.length;i++){
						var useful=ai.get.useful(cards[i]);
						if(useful<5) return true;
						if(cards[i].number>9&&useful<7) return true;
					}
				}
				return false;
			},
			prompt:function(event){
				return '是否对'+get.translation(event.player)+'发动【惴恐】？';
			},
			filter:function(event,player){
				return player.hp<player.maxHp&&event.player!=player&&
					player.num('h')>0&&event.player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(trigger.player);
				"step 1"
				if(result.bool){
					trigger.player.addTempSkill('zishou2','phaseAfter');
				}
			},
		},
		qiuyuan:{
			trigger:{target:'shaBefore'},
			direct:true,
			priority:11,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【求援】？',function(card,player,target){
					return target!=player&&trigger.player.canUse('sha',target,false);
				}).ai=function(target){
					return ai.get.effect(target,trigger.card,trigger.player,player)+0.1;
				}
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('qiuyuan',target);
					event.target=target;
					target.chooseCard({name:'shan'},'交给'+get.translation(player)+
					'一张闪，或成为此杀的额外目标').ai=function(card){
						return ai.get.attitude(target,player)>=0?1:-1;
					}
					game.delay();
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.gain(result.cards);
					event.target.$give(result.cards,player);
					game.delay();
				}
				else{
					trigger.targets.push(event.target);
					game.log(get.translation(event.target)+'成为了额外目标');
				}
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(card.name!='sha') return;
						for(var i=0;i<game.players.length;i++){
							var target2=game.players[i];
							if(player!=target2&&target!=target2&&player.canUse(card,target2,false)&&
								ai.get.effect(target2,{name:'shacopy',nature:card.nature,suit:card.suit},player,target)<0){
								if(target.hp==target.maxHp) return [0,1];
								return [0,0];
							}
						}
					}
				}
			}
		},
		gongji:{
			enable:'phaseUse',
			usable:1,
			position:'he',
			filterCard:true,
			check:function(card){
				if(get.type(card)!='equip') return 0;
				var player=_status.currentPhase;
				if(player.num('he',{subtype:get.subtype(card)})>1){
					return 11-ai.get.equipValue(card);
				}
				return 6-ai.get.equipValue(card);
			},
			content:function(){
				"step 0"
				player.addTempSkill('gongji2','phaseAfter');
				"step 1"
				if(get.type(cards[0])=='equip'){
					player.chooseTarget('是否弃置一名角色的一张牌？',function(card,player,target){
						return player!=target&&target.num('he')>0;
					}).ai=function(target){
						if(ai.get.attitude(player,target)<0){
							return Math.max(0.5,ai.get.effect(target,{name:'sha'},player,player));
						}
						return 0;
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					event.target=result.targets[0];
					player.discardPlayerCard(event.target,'he',true).ai=ai.get.buttonValue;
				}
			},
			ai:{
				order:9,
				result:{
					player:1
				}
			}
		},
		gongji2:{
			mod:{
				attackFrom:function(){
					return -Infinity;
				},
			},
		},
		zhuiyi:{
			trigger:{player:'dieBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【追忆】？',function(card,player,target){
					return player!=target&&trigger.source!=target;
				}).ai=function(target){
					var num=ai.get.attitude(player,target);
					if(num>0){
						if(target.hp==1){
							num+=2;
						}
						if(target.hp<target.maxHp){
							num+=2;
						}
					}
					return num;
				}
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('zhuiyi',target);
					target.recover();
					target.draw(3);
				}
			},
			ai:{
				expose:0.5,
			}
		},
		anxu:{
			enable:'phaseUse',
			usable:1,
			multitarget:true,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				var num=target.num('h');
				if(ui.selected.targets.length){
					return num<ui.selected.targets[0].num('h');
				}
				for(var i=0;i<game.players.length;i++){
					if(num>game.players[i].num('h')) return true;
				}
				return false;
			},
			selectTarget:2,
			content:function(){
				var gainner,giver;
				if(targets[0].num('h')<targets[1].num('h')){
					gainner=targets[0];
					giver=targets[1];
				}
				else{
					gainner=targets[1];
					giver=targets[0];
				}
				var card=giver.get('h').randomGet();
				gainner.gain(card,'give');
				giver.$give(card,gainner);
			},
			ai:{
				order:10.5,
				threaten:2,
				result:{
					target:function(player,target){
						var num=target.num('h');
						var att=ai.get.attitude(player,target);
						if(ui.selected.targets.length==0){
							if(att>0) return -1;
							for(var i=0;i<game.players.length;i++){
								var num2=game.players[i].num('h');
								var att2=ai.get.attitude(player,game.players[i]);
								if(att2>=0&&num2<num) return -1;
							}
							return 0;
						}
						else{
							return 1;
						}
					},
					player:0.01
				}
			}
		},
		mingce:{
			enable:'phaseUse',
			usable:1,
			position:'he',
			filterCard:function(card){
				return card.name=='sha'||get.type(card)=='equip';
			},
			check:function(card){return 8-ai.get.value(card)},
			selectTarget:2,
			multitarget:true,
			discard:false,
			targetprompt:['得到牌','出杀目标'],
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
				player.line2(targets);
			},
			filterTarget:function(card,player,target){
				if(ui.selected.targets.length==0){
					return player!=target;
				}
				else{
					return lib.filter.filterTarget({name:'sha'},ui.selected.targets[0],target);
				}
			},
			content:function(){
				"step 0"
				targets[0].gain(cards);
				game.delay(2);
				"step 1"
				targets[0].chooseControl('draw_card','出杀').ai=function(){
					if(ai.get.effect(targets[1],{name:'sha'},targets[0],targets[0])>0){
						return 1;
					}
					return 0;
				};
				"step 2"
				if(result.control=='draw_card'){
					targets[0].draw();
				}
				else{
					targets[0].useCard({name:'sha'},targets[1]);
				}
			},
			ai:{
				result:{
					player:1,
					target:function(player,target){
						if(ui.selected.targets.length){
							return -0.1;
						}
						return 1;
					}
				},
				order:8.5,
				expose:0.2
			}
		},
		xinxuanhuo:{
			trigger:{player:'phaseDrawBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【眩惑】',function(card,player,target){
					return player!=target;
				}).ai=function(target){
					var att=ai.get.attitude(player,target);
					if(att>0){
						if(target.num('h')<target.hp) att+=2;
						return att-target.num('h')/3;
					}
					else{
						return -1;
					}
				}
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.finish();
					player.logSkill('xuanhuo',result.targets);
					event.target=result.targets[0];
					event.target.draw(2);
					player.chooseTarget('选择出杀的目标',true,function(card,player,target){
						return event.target.canUse('sha',target)&&player!=target;
					}).ai=function(target){
						return ai.get.effect(target,{name:'sha'},event.target,player);
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool&&result.targets.length){
					game.log(get.translation(player)+'指定的出杀目标为'+get.translation(result.targets));
					event.target.line(result.targets);
					event.target.chooseToUse('对'+get.translation(result.targets)+'使用一张杀，或令'+get.translation(player)+'获得你的两张牌',{name:'sha'},result.targets[0],-1);
				}
				else{
					event.bool=true;
				}
				"step 3"
				if(event.bool||result.bool==false){
					player.gainPlayerCard('he',event.target,Math.min(2,event.target.num('he')),true);
					event.target.draw();
				}
				else{
					player.draw();
				}
			},
			ai:{
				expose:0.2
			}
		},
		zhichi:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				player.addTempSkill('zhichi2',['phaseAfter','phaseBefore']);
			}
		},
		zhichi2:{
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:15,
			filter:function(event,player){
				return get.type(event.card)=='trick'||event.card.name=='sha';
			},
			content:function(){
				game.log(get.translation(player)+'发动了智迟，'+get.translation(trigger.card)+'对'+get.translation(trigger.target)+'失效')
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='trick'||card.name=='sha') return [0,0,0,0];
					}
				}
			}
		},
		zongxuan:{
			trigger:{player:'discardAfter'},
			filter:function(event,player){
				for(var i=0;i<event.cards.length;i++){
					if(get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			frequent:true,
			popup:false,
			content:function(){
				"step 0"
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					if(get.position(trigger.cards[i])=='d'){
						cards.push(trigger.cards[i]);
					}
				}
				player.chooseCardButton(cards,[1,cards.length],'是否发动【纵玄】？').ai=function(){return -1;};
				"step 1"
				if(result&&result.bool&&result.buttons&&result.buttons.length){
					var cards=result.links.slice(0);
					while(cards.length){
						ui.cardPile.insertBefore(cards.pop(),ui.cardPile.firstChild);
					}
					player.logSkill('zongxuan');
				}
			},
		},
		zhiyan:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【直言】？').ai=function(target){
					return ai.get.attitude(player,target);
				}
				"step 1"
				if(result.bool){
					event.target=result.targets[0];
					player.logSkill('zhiyan');
				}
				else{
					event.finish();
				}
				"step 2"
				var cards=get.cards();
				var card=cards[0];
				switch(get.type(card,'trick')){
					case 'basic':event.effect='';break;
					case 'trick':event.effect='';break;
					case 'equip':event.effect='recover';break;
				}
				if(get.type(card)=='equip'){
					event.target.equip(card);
					event.target.$draw(cards);
				}
				else{
					event.target.gain(cards,'gain2');
					game.log(get.translation(event.target)+'获得了'+get.translation(card));
				}
				"step 3"
				switch(event.effect){
					case 'recover':event.target.recover();break;
				}
			},
			ai:{
				expose:0.2,
				threaten:1.2
			}
		},
		miji:{
			trigger:{player:'phaseEnd'},
			check:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>0){
						return true;
					}
				}
				return false;
			},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				"step 0"
				event.num=player.maxHp-player.hp;
				player.draw(event.num);
				"step 1"
				player.chooseCardTarget({
					selectCard:event.num,
					filterTarget:function(card,player,target){
						return player!=target;
					},
					ai1:function(card){
						return ai.get.unuseful(card)+9;
					},
					ai2:function(target){
						return ai.get.attitude(player,target);
					},
					prompt:'将'+event.num+'张手牌交给一名其他角色',
					forced:true
				});
				"step 2"
				if(result){
					result.targets[0].gain(result.cards);
					event.player.$give(result.cards.length,result.targets[0]);
				}
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 3;
					if(target.hp==2) return 1.5;
					return 0.5;
				},
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
					}
				}
			}
		},
		zhenlie:{
			filter:function(event,player){
				return event.player!=player&&event.card&&(event.card.name=='sha'||get.type(event.card)=='trick');
			},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)>0){
					return false;
				}
				if(get.tag(event.card,'respondSha')){
					if(player.num('h',{name:'sha'})==0){
						return true;
					}
				}
				else if(get.tag(event.card,'respondShan')){
					if(player.num('h',{name:'shan'})==0){
						return true;
					}
				}
				else if(get.tag(event.card,'damage')){
					if(player.num('h')<2) return true;
				}
				else if(event.card.name=='shunshou'&&player.hp>2){
					return true;
				}
				return false;
			},
			priority:10,
			trigger:{target:'useCardToBefore'},
			content:function(){
				"step 0"
				player.loseHp();
				"step 1"
				trigger.untrigger();
				trigger.finish();
				"step 2"
				if(trigger.player.num('he')){
					player.discardPlayerCard(trigger.player,'he',true);
				}
			},
			ai:{
				expose:0.3
			}
		},
		wuyan:{
			trigger:{target:'useCardToBefore',player:'useCardToBefore'},
			forced:true,
			priority:15,
			check:function(event,player){
				return ai.get.effect(event.target,event.card,event.player,player)<0;
			},
			filter:function(event,player){
				if(!event.target) return false;
				if(event.player==player&&event.target==player) return false;
				return (get.type(event.card)=='trick');
			},
			content:function(){
				game.log(get.translation(player)+'发动了无言，'+get.translation(trigger.card)+'对'+get.translation(trigger.target)+'失效')
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='trick'&&player!=target) return [0,0,0,0];
					},
					player:function(card,player,target,current){
						if(get.type(card)=='trick'&&player!=target) return [0,0,0,0];
					}
				}
			}
		},
		xinwuyan:{
			check:function(){return false},
			trigger:{target:'useCardToBefore',player:'useCardToBefore'},
			forced:true,
			priority:15,
			filter:function(event,player){
				if(event.player==player&&event.target==player) return false;
				return (get.type(event.card,'trick')=='trick'&&get.tag(event.card,'damage'));
			},
			check:function(event,player){
				return ai.get.effect(event.target,event.card,event.player,player)<0;
			},
			content:function(){
				game.log(get.translation(player)+'发动了无言，'+get.translation(trigger.card)+'对'+get.translation(trigger.target)+'失效')
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='trick'&&player!=target&&get.tag(card,'damage')) return [0,0,0,0];
					},
					player:function(card,player,target,current){
						if(get.type(card)=='trick'&&player!=target&&get.tag(card,'damage')) return [0,0,0,0];
					}
				}
			}
		},
		xinjujian:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return player.num('he')>player.num('he',{type:'basic'});
			},
			content:function(){
				"step 0"
				player.chooseCardTarget({
					filterTarget:function(card,player,target){
						return player!=target;
					},
					filterCard:function(card){
						return get.type(card)!='basic';
					},
					ai1:function(card){
						if(get.tag(card,'damage')&&get.type(card)=='trick'){
							return 20;
						}
						return 9-ai.get.value(card);
					},
					ai2:function(target){
						var att=ai.get.attitude(player,target);
						if(att>0){
							if(target.isTurnedOver()) att+=3;
							if(target.hp==1) att+=3;
						}
						return att;
					},
					position:'he',
					prompt:'是否发动【举荐】？'
				});
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					event.target=target;
					player.logSkill('xinjujian',target);
					player.discard(result.cards);
					if(target.hp==target.maxHp&&
						!target.isTurnedOver()&&
						!target.isLinked()){
						target.draw(2);
						event.finish();
					}
					else{
						var controls=['draw_card'];
						if(target.hp<target.maxHp){
							controls.push('recover_hp');
						}
						if(target.isLinked()|target.isTurnedOver()){
							controls.push('reset_character');
						}
						target.chooseControl(controls).ai=function(){
							if(target.isTurnedOver()){
								return 'reset_character';
							}
							else if(target.hp==1&&target.maxHp>2){
								return 'recover_hp';
							}
							else if(target.hp==2&&target.maxHp>2&&target.num('h')>1){
								return 'recover_hp';
							}
							else{
								return 'draw_card';
							}
						}
					}
				}
				else{
					event.finish();
				}
				"step 2"
				event.control=result.control;
				switch(event.control){
					case 'recover_hp':event.target.recover();event.finish();break;
					case 'draw_card':event.target.draw(2);event.finish();break;
					case 'reset_character':if(event.target.isTurnedOver()) event.target.turnOver();break;
				}
				"step 3"
				if(event.control=='reset_character'&&event.target.isLinked()){
					event.target.link();
				}
			},
			ai:{
				expose:0.2,
				threaten:1.4
			}
		},
		jujian:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			position:'he',
			selectCard:[1,3],
			check:function(card){
				var player=get.owner(card);
				if(get.type(card)=='trick') return 10;
				if(player.num('h')-player.hp-ui.selected.cards.length>0){
					return 8-ai.get.value(card);
				}
				return 4-ai.get.value(card);
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			content:function(){
				target.draw(cards.length);
				if(cards.length==3){
					if(get.type(cards[0],'trick')==get.type(cards[1],'trick')&&
						get.type(cards[0],'trick')==get.type(cards[2],'trick')){
						player.recover();
					}
				}
			},
			ai:{
				expose:0.2,
				order:1,
				result:{
					target:1
				}
			}
		},
		yizhong:{
			trigger:{target:'shaBefore'},
			forced:true,
			filter:function(event,player){
				if(player.get('e','2')) return false;
				return (event.card.name=='sha'&&get.color(event.card)=='black')
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(target.get('e','2')) return;
						if(card.name=='sha'&&get.color(card)=='black') return 0;
					}
				}
			}
		},
		jueqing:{
			trigger:{source:'damageBefore'},
			forced:true,
			priority:10,
			content:function(){
				trigger.untrigger();
				trigger.finish();
				var ex=0;
				if(trigger.card&&trigger.card.name=='sha'){
					if(player.skills.contains('jiu')) ex++;
					if(player.skills.contains('luoyi2')) ex++;
					if(player.skills.contains('reluoyi2')) ex++;
				}
				trigger.player.loseHp(trigger.num+ex);
			}
		},
		shangshi:{
			trigger:{player:['loseEnd','changeHp']},
			forced:true,
			filter:function(event,player){
				return (player.num('h')<Math.min(3,player.maxHp-player.hp));
			},
			content:function(){
				player.draw(Math.min(3,player.maxHp-player.hp)-player.num('h'));
			},
		},
		luoying:{
			unique:true,
			gainable:true,
			group:['luoying1','luoying2'],
		},
		luoying1:{
			trigger:{global:'discardAfter'},
			filter:function(event,player){
				if(event.player==player) return false;
				for(var i=0;i<event.cards.length;i++){
					if(get.suit(event.cards[i])=='club'&&get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			frequent:true,
			popup:false,
			content:function(){
				"step 0"
				if(trigger.delay==false) game.delay();
				"step 1"
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					if(get.suit(trigger.cards[i])=='club'&&get.position(trigger.cards[i])=='d'){
						cards.push(trigger.cards[i]);
					}
				}
				if(cards.length){
					player.gain(cards);
					player.$gain2(cards);
					game.log(get.translation(player)+'发动落英，获得了'+get.translation(cards));
				}
			},
		},
		luoying2:{
			trigger:{global:'judgeAfter'},
			frequent:true,
			filter:function(event,player){
				if(event.player==player) return false;
				if(event.result.card.parentNode.id!='discardPile') return false;
				return (get.suit(event.result.card)=='club');
			},
			content:function(){
				player.gain(trigger.result.card);
				player.$gain2(trigger.result.card);
			}
		},
		jiushi:{
			group:['jiushi1','jiushi2','jiushi3'],
		},
		jiushi1:{
			enable:'chooseToUse',
			filter:function(event,player){
				if(player.classList.contains('turnedover')) return false;
				if(event.parent.name=='phaseUse') return true;
				if(event.type!='dying') return false;
				if(player!=_status.dying) return false;
				if(player.storage.niepan) return false;
				return true;
			},
			content:function(){
				player.turnOver();
				player.useCard({name:'jiu'},player);
			},
			ai:{
				save:true,
				order:5,
				result:{
					player:function(player){
						if(player==_status.event.dying||player.isTurnedOver()) return 3;
					}
				},
				effect:{
					target:function(card){
						if(card.name=='guiyoujie') return [0,0.5];
					}
				}
			},
		},
		jiushi2:{
			trigger:{player:'damageBegin'},
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				return player.classList.contains('turnedover');
			},
			content:function(){
				player.storage.jiushi=true;
			}
		},
		jiushi3:{
			trigger:{player:'damageAfter'},
			check:function(event,player){
				return player.isTurnedOver();
			},
			filter:function(event,player){
				if(player.storage.jiushi){
					return true;
				}
				return false;
			},
			content:function(){
				player.storage.jiushi=false;
				player.turnOver();
			}
		},
		zongshi:{
			mod:{
				maxHandcard:function(player,num){
					var list=['wei','shu','wu','qun'];
					for(var i=0;i<game.players.length&&list.length;i++){
						if(list.contains(game.players[i].group)){
							list.remove(game.players[i].group);
							num++;
						}
					}
					return num;
				}
			}
		},
		zishou:{
			trigger:{player:'phaseDrawBegin'},
			check:function(event,player){
				return player.num('h')<=player.maxHp||player.skipList.contains('phaseUse');
			},
			content:function(){
				var list=['wei','shu','wu','qun'],num=0;
				for(var i=0;i<game.players.length&&list.length;i++){
					if(list.contains(game.players[i].group)){
						list.remove(game.players[i].group);
						num++;
					}
				}
				trigger.num+=num;
				player.addTempSkill('zishou2','phaseAfter');
				// player.skip('phaseUse');

			},
			ai:{
				threaten:1.5
			}
		},
		zishou2:{
			mod:{
				playerEnabled:function(card,player,target){
					if(player!=target) return false;
				}
			}
		},
		yaowu:{
			trigger:{player:'damageEnd'},
			priority:1,
			popup:false,
			filter:function(event){
				if(event.card&&(event.card.name=='sha')){
					if(get.color(event.card)=='red') return true;
				}
				return false;
			},
			forced:true,
			check:function(){
				return false;
			},
			content:function(){
				"step 0"
				if(trigger.source.hp<trigger.source.maxHp){
					trigger.source.chooseControl('draw_card','recover_hp',function(event,target){
						return 'recover_hp';
					});
				}
				else{
					trigger.source.draw();
					event.finish();
				}
				"step 1"
				if(result.control=='draw_card'){
					trigger.source.draw();
				}
				else{
					trigger.source.recover();
				}
			},
			ai:{
				maixie:true,
				effect:{
					target:function(card,player,target,current){
						if(card.name=='sha'&&(get.color(card)=='red')){
							return [1,-2];
						}
					}
				}
			}
		},
		shiyong2:{
			trigger:{player:'damageEnd'},
			forced:true,
			check:function(){
				return false;
			},
			content:function(){
				player.maxHp--;
				player.removeSkill('shiyong2');
				player.update();
			},
		},
		danshou:{
			trigger:{source:'damageEnd'},
			priority:9,
			content:function(){
				"step 0"
				player.draw();
				"step 1"
				while(_status.event.name!='phase'){
					_status.event=_status.event.parent;
				}
				_status.event.finish();
				_status.event.untrigger(true);
			}
		},
		qice:{
			enable:'phaseUse',
			usable:1,
			group:['qice3'],
			direct:true,
			filter:function(event,player){
				return player.num('h')>0
			},
			delay:0,
			content:function(){
				"step 0"
				var list=[];
				player.getStat('skill').qice--;
				for(var i in lib.card){
					if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
					if(lib.card[i].type=='trick') list.push(['','',i]);
				}
				var dialog=ui.create.dialog([list,'vcard']);
				player.chooseButton(dialog,function(button){
					var recover=0,lose=1;
					for(var i=0;i<game.players.length;i++){
						if(!game.players[i].isOut()){
							if(game.players[i].hp<game.players[i].maxHp){
								if(ai.get.attitude(player,game.players[i])>0){
									if(game.players[i].hp<2){
										lose--;
										recover+=0.5;
									}
									lose--;
									recover++;
								}
								else if(ai.get.attitude(player,game.players[i])<0){
									if(game.players[i].hp<2){
										lose++;
										recover-=0.5;
									}
									lose++;
									recover--;
								}
							}
							else{
								if(ai.get.attitude(player,game.players[i])>0){
									lose--;
								}
								else if(ai.get.attitude(player,game.players[i])<0){
									lose++;
								}
							}
						}
					}
					if(lose>recover&&lose>0) return (button.link[2]=='nanman')?1:-1;
					if(lose<recover&&recover>0) return (button.link[2]=='taoyuan')?1:-1;
					return (button.link[2]=='wuzhong')?1:-1;
				});
				"step 1"
				if(result.bool){
					lib.skill.qice2.viewAs={name:result.buttons[0].link[2]};
					// player.popup(result.buttons[0].link[2]);
					event.parent.parent.backup('qice2');
					event.parent.parent.step=0;
					if(event.isMine()){
						event.parent.parent.openskilldialog='将全部手牌当'+get.translation(result.buttons[0].link[2])+'使用';
					}
				}
				else{
					if(player.skills.contains('qice4')){
						player.addTempSkill('qice5','phaseAfter')
					}
					else{
						player.addTempSkill('qice4','phaseAfter')
					}
					event.finish();
				}
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						if(player.skills.contains('qice5')) return 0;
						var num=0;
						var cards=player.get('h');
						for(var i=0;i<cards.length;i++){
							num+=Math.max(0,ai.get.value(cards[i],player,'raw'));
						}
						num/=cards.length;
						num*=Math.min(cards.length,player.hp);
						return 12-num;
					}
				},
				threaten:1.6,
			}
		},
		qice2:{
			filterCard:true,
			selectCard:-1,
		},
		qice3:{
			trigger:{player:'useCardBefore'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.skill=='qice2';
			},
			content:function(){
				player.getStat('skill').qice++;
			}
		},
		qice4:{},
		zhiyu:{
			trigger:{player:'damageEnd'},
			content:function(){
				"step 0"
				player.draw();
				"step 1"
				player.showHandcards();
				"step 2"
				if(!trigger.source) return;
				var cards=player.get('h');
				for(var i=1;i<cards.length;i++){
					if(get.color(cards[i])!=get.color(cards[0])) return;
				}
				trigger.source.chooseToDiscard(true);
			},
			ai:{
				threaten:0.9
			}
		},
		xuanfeng:{
			trigger:{player:['loseEnd','phaseDiscardEnd']},
			direct:true,
			filter:function(event,player){
				if(event.name=='phaseDiscard'){
					return event.cards&&event.cards.length>1
				}
				else{
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='e') return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				player.chooseTarget([1,2],'请选择旋风的目标',function(card,player,target){
					if(player==target) return false;
					return target.num('he');
				}).ai=function(target){
					return -ai.get.attitude(player,target);
				};
				"step 1"
				if(result.bool){
					player.logSkill('xuanfeng',result.targets);
					event.targets=result.targets
					if(result.targets.length==1){
						player.discardPlayerCard(event.targets[0],'he',[1,2],true);
					}
					else{
						player.discardPlayerCard(event.targets[0],'he',true);
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(targets.length==2){
					player.discardPlayerCard(targets[1],'he',true);
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='equip') return [1,3];
					}
				}
			}
		},
		jiangchi:{
			trigger:{player:'phaseDrawBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseControl('jiangchi_less','jiangchi_more','cancel',function(){
					if(player.num('h')>3&&player.num('h','sha')>1){
						return 'jiangchi_less';
					}
					if(player.num('h','sha')>2){
						return 'jiangchi_less';
					}
					if(player.hp-player.num('h')>1){
						return 'jiangchi_more';
					}
					return 'cancel';
				});
				"step 1"
				if(result.control=='jiangchi_less'){
					trigger.num--;
					player.addTempSkill('jiangchi2','phaseUseEnd');
					player.logSkill('jiangchi');
				}
				else if(result.control=='jiangchi_more'){
					trigger.num++;
					player.addTempSkill('jiangchi3','phaseUseEnd');
					player.logSkill('jiangchi');
				}
			}
		},
		jiangchi2:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha') return true;
				},
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num+1;
				}
			}
		},
		jiangchi3:{
			mod:{
				cardEnabled:function(card){if(card.name=='sha') return false}
			}
		},
		xinzhan:{
			enable:'phaseUse',
			filter:function(event,player){
				return true;//player.num('h')>player.maxHp;
			},
			usable:1,
			content:function(){
				"step 0"
				var cards=get.cards(3+player.maxHp-player.hp);
				event.cards=cards;
				player.chooseCardButton(cards,'选择获得的红桃牌',[1,Infinity]).filterButton=function(button){
					return get.suit(button.link)=='heart';
				}
				"step 1"
				if(result.bool){
					player.gain(result.links);
					player.$gain(result.links);
					game.delay(2);
				}
				for(var i=event.cards.length-1;i>=0;i--){
					if(!result.bool||!result.links.contains(event.cards[i])){
						ui.cardPile.insertBefore(event.cards[i],ui.cardPile.firstChild);
					}
				}
			},
			ai:{
				order:11,
				result:{
					player:1
				}
			}
		},
		huilei:{
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source!=undefined;
			},
			content:function(){
				trigger.source.discard(trigger.source.get('he'));
			},
			ai:{
				threaten:0.7
			}
		},

		xinenyuan:{
			trigger:{player:'damageEnd'},
			check:function(event,player){
				var att=ai.get.attitude(player,event.source);
				var num=event.source.num('h');
				if(att<=0) return true;
				if(num>2) return true;
				if(num) return att<4;
				return false;
			},
			filter:function(event,player){
				return event.source&&event.source!=player;
			},
			content:function(){
				"step 0"
				trigger.source.chooseCard('交给'+get.translation(player)+'一张手牌或流失一点体力').ai=function(card){
					if(ai.get.attitude(trigger.source,player)>0){
						return 11-ai.get.value(card);
					}
					else{
						return 7-ai.get.value(card);
					}
				};
				"step 1"
				if(result.bool){
					player.gain(result.cards[0]);
					trigger.source.$give(1,player);
				}
				else{
					trigger.source.loseHp();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(player.skills.contains('jueqing')) return [1,-1.5];
						var hasfriend=false;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
								hasfriend=true;break;
							}
						}
						if(!hasfriend) return;
						if(get.tag(card,'damage')) return [1,0,0,-0.7];
					}
				}
			}
		},

		enyuan:{
			locked:true,
			group:['enyuan1','enyuan2'],
			ai:{
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'recover')&&player!=target) return [1,0,0,0.1];
						if(player.skills.contains('jueqing')) return [1,-2];
						var hasfriend=false;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
								hasfriend=true;break;
							}
						}
						if(!hasfriend) return;
						if(get.tag(card,'damage')) return [1,0,0,-1];
					}
				}
			}
		},
		enyuan1:{
			trigger:{player:'recoverEnd'},
			forced:true,
			filter:function(event,player){
				return event.source&&event.source!=player;
			},
			content:function(){
				trigger.source.draw();
			}
		},
		enyuan2:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return event.source&&event.source!=player;
			},
			content:function(){
				"step 0"
				trigger.source.chooseCard('交出一张红桃牌或流失一点体力',function(card){
					return get.suit(card)=='heart';
				}).ai=function(card){
					return 6-ai.get.value(card);
				};
				"step 1"
				if(result.bool){
					player.gain(result.cards[0]);
					trigger.source.$give(1,player);
				}
				else{
					trigger.source.loseHp();
				}
			}
		},
		xuanhuo:{
			enable:'phaseUse',
			usable:1,
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(1,targets[0]);
			},
			filterCard:function(card){
				return get.suit(card)=='heart';
			},
			filterTarget:function(card,player,target){
				if(game.players.length==2) return false;
				return player!=target;
			},
			check:function(card){
				var player=get.owner(card);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>3) break;
				}
				if(i==game.players.length) return -1;
				return 5-ai.get.value(card);
			},
			content:function(){
				"step 0"
				target.gain(cards);
				game.delay();
				"step 1"
				player.gainPlayerCard(target,'he',true);
				"step 2"
				var source=target;
				event.card=result.buttons[0].link;
				player.chooseTarget(function(card,player,target){
					return target!=source&&target!=player;
				}).ai=function(target){
					return ai.get.attitude(player,target);
				}
				"step 3"
				if(result.bool){
					result.targets[0].gain(card);
					player.$give(1,result.targets[0]);
					game.delay();
				}
			},
			ai:{
				result:{
					target:-0.5,
				},
				basic:{
					order:9,
				}
			}
		},
		ganlu:{
			enable:'phaseUse',
			usable:1,
			selectTarget:2,
			filterTarget:function(card,player,target){
				if(target.isMin()) return false;
				if(ui.selected.targets.length==0) return true;
				if(ui.selected.targets[0].num('e')==0&&target.num('e')==0) return false;
				return Math.abs(ui.selected.targets[0].num('e')-target.num('e'))<=player.maxHp-player.hp;
			},
			multitarget:true,
			content:function(){
				"step 0"
				event.cards=[targets[0].get('e'),targets[1].get('e')];
				targets[0].lose(event.cards[0]);
				targets[1].lose(event.cards[1]);
				if(event.cards[0].length) targets[0].$give(event.cards[0],targets[1]);
				if(event.cards[1].length) targets[1].$give(event.cards[1],targets[0]);
				"step 1"
				for(var i=0;i<event.cards[1].length;i++){
					targets[0].equip(event.cards[1][i]);
				}
				for(var i=0;i<event.cards[0].length;i++){
					targets[1].equip(event.cards[0][i]);
				}
			},
			ai:{
				order:10,
				threaten:function(player,target){
					return 0.8*Math.max(1+target.maxHp-target.hp);
				},
				result:{
					target:function(player,target){
						var list1=[];
						var list2=[];
						var num=player.maxHp-player.hp;
						for(var i=0;i<game.players.length;i++){
							if(ai.get.attitude(player,game.players[i])>0) list1.push(game.players[i]);
							else if(ai.get.attitude(player,game.players[i])<0) list2.push(game.players[i]);
						}
						list1.sort(function(a,b){
							return a.num('e')-b.num('e');
						});
						list2.sort(function(a,b){
							return b.num('e')-a.num('e');
						});
						var delta;
						for(var i=0;i<list1.length;i++){
							for(var j=0;j<list2.length;j++){
								delta=list2[j].num('e')-list1[i].num('e');
								if(delta<=0) continue;
								if(delta<=num){
									if(target==list1[i]||target==list2[j]){
										return ai.get.attitude(player,target);
									}
									return 0;
								}
							}
						}
						return 0;
					}
				},
				effect:{
					target:function(card,player,target){
						if(target.hp==target.maxHp&&get.tag(card,'damage')) return 0.2;
					}
				}
			}
		},
		buyi:{
			trigger:{global:'dying'},
			priority:6,
			filter:function(event,player){
				return event.player.hp<=0&&event.player.num('h')>0;
			},
			check:function(event,player){
				if(event.player==player){
					return event.player.get('h',function(card){
						return get.type(card)!='basic';
					}).length>0;
				}
				return ai.get.attitude(player,event.player)>0;
			},
			content:function(){
				"step 0"
				if(trigger.player!=player) event.card=trigger.player.get('h').randomGet();
				else{
					event.card=trigger.player.get('h',function(card){
						return get.type(card)!='basic';
					}).randomGet();
				}
				event.dialog=ui.create.dialog(get.translation(player)+'展示的手牌',[event.card]);
				game.delay(2);
				"step 1"
				if(get.type(event.card)!='basic'){
					trigger.player.recover();
					trigger.player.discard(event.card);
				}
				event.dialog.close();
			},
			ai:{
				threaten:1.4
			}
		},
		pojun:{
			trigger:{source:'damageEnd'},
			check:function(event,player){
				if(event.player.isTurnedOver()) return ai.get.attitude(player,event.player)>0;
				if(event.player.hp<3){
					return ai.get.attitude(player,event.player)<0;
				}
				return ai.get.attitude(player,event.player)>0;
			},
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.player.isAlive();
			},
			content:function(){
				"step 0"
				trigger.player.draw(Math.min(5,trigger.player.hp));
				"step 1"
				trigger.player.turnOver();
			}
		},
		jingce:{
			trigger:{player:'phaseUseEnd'},
			frequent:true,
			filter:function(event,player){
				return get.cardCount(true,player)>=player.hp;
			},
			content:function(){
				player.draw(2);
			},
			init:function(player){player.storage.jingce=true},
			intro:{
				content:function(storage,player){
					if(_status.currentPhase==player) return '已使用'+get.cardCount(true,player)+'张牌';
				}
			}
		},
		chengxiang:{
			trigger:{player:'damageEnd'},
			direct:true,
			content:function(){
				"step 0"
				event.cards=get.cards(4);
				if(event.isMine()==false){
					event.dialog=ui.create.dialog('称象',event.cards);
					game.delay(2);
				}
				"step 1"
				if(event.dialog) event.dialog.close();
				var dialog=ui.create.dialog('称象：选择任意张点数小于13的牌',event.cards);
				var next=player.chooseButton([0,4],dialog);
				next.filterButton=function(button){
					var num=0
					for(var i=0;i<ui.selected.buttons.length;i++){
						num+=get.number(ui.selected.buttons[i].link);
					}
					return (num+get.number(button.link)<=13);
				}
				next.ai=function(button){
					return ai.get.value(button.link,_status.event.player);
				};
				"step 2"
				if(result.bool&&result.buttons){
					player.logSkill('chengxiang');
					var cards2=[];
					for(var i=0;i<result.buttons.length;i++){
						cards2.push(result.buttons[i].link);
						cards.remove(result.buttons[i].link);
					}
					player.gain(cards2);
					player.$gain(cards2);
					for(var i=0;i<cards.length;i++){
						ui.discardPile.appendChild(cards[i]);
					}
					game.delay(2);
				}
			},
			ai:{
				maixie:true,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.skills.contains('jueqing')) return [1,-2];
							var hasfriend=false;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
									hasfriend=true;break;
								}
							}
							if(!hasfriend) return;
							if(target.hp>=4) return [1,2];
							if(target.hp==3) return [1,1.5];
							if(target.hp==2) return [1,0.5];
						}
					}
				}
			}
		},
		renxin:{
			trigger:{global:'damageBefore'},
			priority:6,
			filter:function(event,player){
				return event.player!=player&&event.player.hp==1&&player.num('he',{type:'equip'})>0;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseToDiscard('是否发动【仁心】？',{type:'equip'},'he').ai=function(card){
					if(ai.get.attitude(player,trigger.player)>3){
						return 11-ai.get.value(card);
					}
					return -1;
				}
				"step 1"
				if(result.bool){
					player.logSkill('renxin',trigger.player);
					player.turnOver();
				}
				else{
					event.finish();
				}
				"step 2"
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				expose:0.5
			}
		},
		yuce:{
			trigger:{player:'damageAfter'},
			direct:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToDiscard('是否发动御策？').ai=function(card){
					return 7-ai.get.value(card);
				}
				"step 1"
				if(result.bool){
					player.logSkill('yuce');
					var type=get.type(result.cards[0],'trick');
					if(trigger.source){
						trigger.source.chooseToDiscard('弃置一张'+get.translation(type)+'牌或令'+get.translation(player)+'回复一点体力',function(card){
							return get.type(card,'trick')==type;
						}).ai=function(card){
							if(ai.get.recoverEffect(player,trigger.source)<0){
								return 7-ai.get.value(card);
							}
							return 0;
						}
					}
					else{
						event.recover=true;
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.recover){
					player.recover();
				}
				else if(result.bool){
					player.draw();
				}
				else{
					player.recover();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage'&&target.num('h'))){
							return 0.8
						}
					}
				}
			}
		},
		xiansi:{
			trigger:{player:'phaseBegin'},
			direct:true,
			init:function(player){
				player.storage.xiansi=[];
			},
			unique:true,
			forceunique:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动陷嗣？',[1,2],function(card,player,target){
					return target.num('he')>0&&player!=target;
				},
					function(target){
					return -ai.get.attitude(_status.event.player,target);
				});
				"step 1"
				if(result.bool){
					player.logSkill('xiansi',result.targets);
					event.targets=result.targets;
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.targets.length){
					var target=event.targets.shift();
					event.current=target;
					player.choosePlayerCard(target,true);
				}
				else{
					event.finish();
				}
				"step 3"
				if(result.bool){
					player.markSkill('xiansi');
					player.storage.xiansi=player.storage.xiansi.concat(result.links);
					event.current.lose(result.links,ui.special);
					event.current.$give(result.links,player);
					event.goto(2);
				}
			},
			intro:{
				content:'cards',
				onunmark:function(storage,player){
					if(storage&&storage.length){
						for(var i=0;i<storage.length;i++){
							ui.discardPile.appendChild(storage[i]);
						}
						player.$throw(storage);
						player.storage.xiansi.length=0;
					}
				}
			},
			ai:{
				threaten:2
			},
			global:'xiansi2'
		},
		xiansi2:{
			enable:'phaseUse',
			filter:function(event,player){
				var remove=true;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].storage.xiansi){
						remove=false;
						return game.players[i].storage.xiansi.length>1&&player.canUse('sha',game.players[i],true,true);
					}
				}
				if(remove){
					lib.skill.global.remove('xiansi2');
				}
				return false;
			},
			content:function(){
				"step 0"
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].storage.xiansi){
						event.target=game.players[i];
						break;
					}
				}
				if(event.target){
					player.chooseCardButton(2,event.target.storage.xiansi).ai=function(){
						return 1;
					}
				}
				else{
					event.finish();
				}
				"step 1"
				if(result.bool){
					for(var i=0;i<result.links.length;i++){
						event.target.storage.xiansi.remove(result.links[i]);
					}
					if(!event.target.storage.xiansi.length){
						event.target.unmarkSkill('xiansi');
					}
					event.target.discard(result.links);
					player.useCard({name:'sha'},event.target);
				}
			},
			ai:{
				order:3.1,
				result:{
					player:function(player){
						var target;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].storage.xiansi){
								target=game.players[i];
								break;
							}
						}
						if(target){
							return ai.get.effect(target,{name:'sha'},player,player);
						}
					}
				}
			}
		},
		shibei:{
			trigger:{player:'damageAfter'},
			forced:true,
			content:function(){
				"step 0"
				player.judge(function(card){
					if(get.color(card)=='red') return 1;
					if(player.skills.contains('shibei2')) return -1;
					return 0;
				})
				"step 1"
				if(result.judge>0){
					player.recover();
				}
				else if(result.judge<0){
					player.loseHp();
				}
				if(!player.skills.contains('shibei2')){
					player.addTempSkill('shibei2','phaseAfter');
				}
			}
		},
		shibei2:{},
		jianying:{
			trigger:{player:'useCard'},
			frequent:true,
			filter:function(event,player){
				if(!event.cards||event.cards.length!=1) return false;
				if(_status.currentPhase!=player) return false;
				if(!player.storage.jianying) return false;
				return get.suit(player.storage.jianying)==get.suit(event.cards[0])||
					player.storage.jianying.number==event.cards[0].number;
			},
			content:function(){
				player.draw();
			},
			intro:{
				content:'card'
			},
			group:['jianying2','jianying3']
		},
		jianying3:{
			trigger:{player:'useCard'},
			priority:-1,
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				if(!event.cards||event.cards.length!=1) return false;
				if(_status.currentPhase!=player) return false;
				return true;
			},
			content:function(){
				player.storage.jianying=trigger.cards[0];
			}
		},
		jianying2:{
			trigger:{player:'phaseAfter'},
			forced:true,
			silent:true,
			popup:false,
			content:function(){
				player.storage.jianying=null;
			}
		},
		zzhenggong:{
			trigger:{player:'damageEnd'},
			direct:true,
			filter:function(event,player){
				return event.source&&event.source.num('e')>0;
			},
			content:function(){
				"step 0"
				var att=ai.get.attitude(player,trigger.source);
				player.choosePlayerCard('e','是否发动【争功】？',trigger.source).ai=function(button){
					if(att<=0){
						return ai.get.equipValue(button.link);
					}
					return 0;
				}
				"step 1"
				if(result.bool){
					player.logSkill('zzhenggong',trigger.source);
					player.equip(result.links[0]);
					trigger.source.$give(result.links[0],player);
				}
			}
		},
		zquanji:{
			trigger:{global:'phaseBegin'},
			priority:15,
			check:function(event,player){
				var att=ai.get.attitude(player,event.player);
				if(att<0){
					var nh1=event.player.num('h');
					var nh2=player.num('h');
					return nh1<=2&&nh2>nh1+1;
				}
				if(att>0&&event.player.num('j','lebu')&&event.player.num('h')>event.player.hp+1) return true;
				return false;
			},
			filter:function(event,player){
				return event.player!=player&&event.player.num('h')>0&&player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(trigger.player);
				"step 1"
				if(result.bool){
					trigger.player.skip('phaseJudge');
					trigger.untrigger();
				}
			},
			ai:{
				expose:0.2
			}
		},
		zbaijiang:{
			trigger:{player:'phaseBegin'},
			forced:true,
			unique:true,
			init:function(player){
				player.storage.zbaijiang=false;
			},
			intro:{
				content:'limited'
			},
			filter:function(event,player){
				return !player.storage.zbaijiang&&player.num('e')>=3;
			},
			content:function(){
				player.storage.zbaijiang=true;
				player.removeSkill('zzhenggong');
				player.removeSkill('zquanji');
				player.addSkill('zyexin');
				player.addSkill('zzili');
				player.gainMaxHp();
			}
		},
		zyexin:{
			trigger:{player:'damageEnd',source:'damageEnd'},
			frequent:true,
			init:function(player){
				player.storage.zyexin=[];
			},
			intro:{
				content:'cards'
			},
			content:function(){
				var card=get.cards()[0];
				player.storage.zyexin.push(card);
				player.$draw(card);
				player.markSkill('zyexin');
			},
			group:'zyexin2'
		},
		zyexin2:{
			enable:'phaseUse',
			usable:1,
			lose:false,
			delay:false,
			selectCard:[1,Infinity],
			filterCard:true,
			filter:function(event,player){
				return player.storage.zyexin.length>0;
			},
			prompt:'用任意数量的手牌与等量的“权”交换',
			content:function(){
				"step 0"
				player.lose(cards,ui.special)._triggered=null;
				player.storage.zyexin=player.storage.zyexin.concat(cards);
				player.chooseCardButton(player.storage.zyexin,'选择'+cards.length+'张牌作为手牌',cards.length,true).ai=function(button){
					return ai.get.value(button.link);
				}
				if(player==game.me&&_status.auto){
					game.delay();
				}
				"step 1"
				player.gain(result.links)._triggered=null;
				for(var i=0;i<result.links.length;i++){
					player.storage.zyexin.remove(result.links[i]);
				}
			},
			ai:{
				order:5,
				result:{
					player:1
				}
			}
		},
		zzili:{
			unique:true,
			init:function(player){
				player.storage.zzili=false;
			},
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				return player.storage.zyexin.length>=4&&!player.storage.zzili;
			},
			forced:true,
			content:function(){
				player.storage.zzili=true;
				player.loseMaxHp();
				player.addSkill('zpaiyi');
			},
			intro:{
				content:'limited'
			}
		},
		zpaiyi:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				for(var i=0;i<player.storage.zyexin.length;i++){
					var type=get.type(player.storage.zyexin[i]);
					if(type=='delay'||type=='equip') return true;
				}
				return false;
			},
			direct:true,
			content:function(){
				"step 0"
				var next=player.chooseCardButton('是否发动【排异】？',player.storage.zyexin);
				next.filterButton=function(button){
					var type=get.type(button.link);
					if(type=='delay'||type=='equip') return true;
					return false;
				};
				next.ai=function(button){
					return ai.get.value(button.link);
				}
				"step 1"
				if(result.bool){
					var card=result.links[0];
					event.card=card;
					var isjudge=get.type(card)=='delay';
					player.chooseTarget(function(cd,player,target){
						if(isjudge){
							return !target.hasJudge(card.name);
						}
						else{
							return !target.isMin();
						}
					}).ai=function(target){
						return ai.get.effect(target,card,player,player);
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.storage.zyexin.remove(event.card);
					game.delay();
					if(get.type(event.card)=='equip'){
						player.$give(event.card,result.targets[0]);
						result.targets[0].equip(event.card);
					}
					else if(get.type(event.card)=='delay'){
						player.$throw(event.card);
						result.targets[0].addJudge(event.card);
					}
					player.logSkill('zpaiyi',result.targets);
					if(player!=result.targets[0]){
						player.draw();
					}
				}
			}
		}
	},
	translate:{
		yufan:'虞翻',
		wangyi:'王异',
		xushu:'徐庶',
		caozhi:'曹植',
		zhangchunhua:'张春华',
		lingtong:'凌统',
		xunyou:'荀攸',
		caozhang:'曹彰',
		liubiao:'刘表',
		huaxiong:'华雄',
		zhuran:'朱然',
		yujin:'于禁',
		masu:'马谡',
		xin_masu:'马谡',
		fazheng:'法正',
		xin_fazheng:'法正',
		wuguotai:'吴国太',
		chengong:'陈宫',
		xusheng:'徐盛',
		guohuai:'郭淮',
		caochong:'曹冲',
		bulianshi:'步练师',
		handang:'韩当',
		fuhuanghou:'伏皇后',
		caifuren:'蔡夫人',
		zhonghui:'钟会',
		old_zhonghui:'钟会',
		sunluban:'孙鲁班',
		chenqun:'陈群',
		zhangsong:'张松',
		guyong:'顾雍',
		jianyong:'简雍',
		madai:'马岱',
		xin_xushu:'徐庶',
		manchong:'满宠',
		liufeng:'刘封',
		liru:'李儒',
		guanzhang:'关兴张苞',
		yj_jushou:'沮授',
		zhuhuan:'朱桓',

		zzhenggong:'争功',
		zzhenggong_info:'你每受到一次伤害，可以获得伤害来源装备区中的一张牌并立即放入你的装备区。',
		zquanji:'权计',
		zquanji_info:'其他角色的回合即将开始时，你可以与该角色进行一次拼点。若你赢，该角色跳过回合开始阶段及判定阶段。',
		zbaijiang:'拜将',
		zbaijiang_info:'觉醒技，回合开始阶段若你的装备区的装备牌为三张或更多时，你必须增加1点体力上限，失去技能【权计】和【争功】并获得技能【野心】。',
		zyexin:'野心',
		zyexin2:'野心',
		zyexin_info:'你每造成或受到一次伤害，可将牌堆顶的一张牌放置在武将牌上，称为“权”。出牌阶段，你可以用任意数量的手牌与等量的“权”交换，每阶段限一次。',
		zzili:'自立',
		zzili_info:'觉醒技，回合开始阶段，若你的“权”为四张或更多时，你必须减1点体力上限，并永久获得技能“排异”。',
		zpaiyi:'排异',
		zpaiyi_info:'回合结束阶段，将一张“权”移动到任何合理的区域，若不是你的区域，你可以摸一张牌',
		shibei:'矢北',
		shibei_info:'锁定技，每当你受到一次伤害，需进行一次判定，若结果为红色，你回复一点体力；若结果为黑色且你在本回合内受到过不止一次伤害，你失去一点体力',
		jianying:'渐营',
		jianying_info:'每当你于出牌阶段内使用的牌与此阶段你使用的上一张牌点数或花色相同时，你可以摸一张牌',
		xinenyuan:'恩怨',
		xinenyuan_info:'每当你受到1点伤害后，你可以令伤害来源选择一项：交给你一张手牌，或失去1点体力。',
		xinxuanhuo:'眩惑',
		xinxuanhuo_info:'摸牌阶段开始时，你可以放弃摸牌并选择一名其他角色，改为令其摸两张牌，然后该角色需对其攻击范围内你选择的另一名角色使用一张杀，若其未如此做或其攻击范围内没有使用杀的目标，你获得其两张牌',
		fuhun:'父魂',
		fuhun2:'父魂',
		fuhun_info:'你可以将两张手牌当杀使用或打出；出牌阶段，若你以此法使用的杀造成了伤害，你获得技能“武圣”、“咆哮”直到回合结束。',
		yuce:'御策',
		yuce_info:'每当你受到一次伤害，可以弃置一张手牌，并令伤害来源选择一项：弃置一张相同类型的手牌并令你摸一张牌，或令你回复一点体力',
		xiansi:'陷嗣',
		xiansi_bg:'逆',
		xiansi2:'陷嗣',
		xiansi_info:'准备阶段开始时，你可以将一至两名角色的各一张牌置于你的武将牌上，称为“逆”；每当一名角色需要对你使用杀时，该角色可以将两张“逆”置入弃牌堆，视为对你使用一张杀。',
		chanhui:'谮毁',
		chanhui_info:'出牌阶段限一次，当你使用【杀】或黑色非延时类锦囊牌指定唯一目标时，你可令可以成为此牌目标的另一名其他角色选择一项：交给你一张牌并成为此牌的使用者;或成为此牌的额外目标。',
		jiaojin:'骄矜',
		jiaojin_info:'每当你受到一名男性角色造成的伤害时，你可以弃置一张装备牌，令此伤害-1。',
		shenxing:'慎行',
		shenxing_info:'出牌阶段，你可以弃置两张牌，然后摸一张牌。',
		bingyi:'秉壹',
		bingyi_info:'结束阶段开始时，你可以展示所有手牌，若均为同一颜色，则你令至多X名角色各摸一张牌(X为你的手牌数)。',
		qiangzhi:'强识',
		qiangzhi2:'强识',
		qiangzhi_info:'出牌阶段开始时，你可以展示一名其他角色的一张手牌。若如此做，每当你于此阶段内使用与此牌类别相同的牌时，你可以摸一张牌。',
		xiantu:'献图',
		xiantu2:'献图',
		xiantu3:'献图',
		xiantu_info:'一名其他角色的出牌阶段开始时，你可以摸两张牌，然后交给其两张牌。若如此做，此阶段结束时，若该角色未于此阶段内杀死过一名角色，则你失去1点体力。',
		dingpin:'定品',
		dingpin_info:'出牌阶段限三次，你可以弃置一张手牌，然后令一名已受伤的角色进行一次判定，若结果为黑色，该角色摸X张牌(X为该角色已损失的体力值)，然后你本回合不能再对其发动“定品”；若结果为红色，将你的武将牌翻面。',
		faen:'法恩',
		faen_info:'每当一名角色的武将牌翻面或横置时，你可以令其摸一张牌。',
		jyzongshi:'纵适',
		jyzongshi_info:'每当你成为其他角色的非延时锦囊牌的目标时，若你是此锦囊的唯一目标，你可以摸一张牌',
		qiaoshui:'巧说',
		qiaoshui_info:'出牌阶段开始时，你可以与一名其他角色拼点。若你赢，你获得对方的拼点牌，并获得技能【集智】直到回合结束；若你没赢，你收回拼点牌且不能使用锦囊牌直到回合结束。每阶段限一次。',
		junxing:'峻刑',
		junxing_info:'出牌阶段限一次，你可以弃置至少一张手牌并选择一名其他角色，该角色需弃置一张与你弃置的牌类别均不同的手牌，否则其先将其武将牌翻面再摸X张牌（X为你以此法弃置的手牌数量）。',

		wuyan:'无言',
		xinwuyan:'无言',
		jujian:'举荐',
		xinjujian:'举荐',
		luoying:'落英',
		luoying1:'落英',
		luoying2:'落英·判定',
		jiushi:'酒诗',
		jiushi1:'酒诗',
		jiushi2:'酒诗',
		jiushi3:'酒诗',
		jueqing:'绝情',
		shangshi:'伤逝',
		xuanfeng:'旋风',
		zhiyu:'智愚',
		qice:'奇策',
		qice2:'奇策',
		jiangchi:'将弛',
		jiangchi_less:'少摸一张',
		jiangchi_more:'多摸一张',
		zishou:'自守',
		zongshi:'宗室',
		shiyong:'恃勇',
		shiyong2:'恃勇',
		danshou:'胆守',
		yizhong:'毅重',
		xinzhan:'心战',
		xinzhan_gain:'获得',
		xinzhan_place:'牌堆顶',
		huilei:'挥泪',
		enyuan:'恩怨',
		enyuan1:'恩怨',
		enyuan2:'恩怨',
		xuanhuo:'眩惑',
		ganlu:'甘露',
		buyi:'补益',
		mingce:'明策',
		zhichi:'智迟',
		zhichi2:'智迟',
		pojun:'破军',
		jingce:'精策',
		chengxiang:'称象',
		renxin:'仁心',
		zhenlie:'贞烈',
		miji:'秘计',
		zhiyan:'直言',
		zongxuan:'纵玄',
		anxu:'安恤',
		zhuiyi:'追忆',
		gongji:'弓骑',
		qiuyuan:'救援',
		zhuikong:'惴恐',
		qieting:'窃听',
		xianzhou:'献州',
		quanji:'权计',
		zili:'自立',
		paiyi:'排异',
		sanyao:'散谣',
		zhiman:'制蛮',
		yaowu:'耀武',
		qianxi:'潜袭',
		qianxi2:'潜袭',
		fuli:'伏枥',
		jiefan:'解烦',
		juece:'绝策',
		mieji:'灭计',
		fencheng:'焚城',
		youdi:'诱敌',
		youdi_info:'结束阶段开始时，你可以令一名其他角色弃置你的一张牌，若此牌不为【杀】，你获得该角色的一张牌。',
		fencheng_info:'限定技。出牌阶段，你可令所有其他角色依次选择一项：弃置X张牌；或受到1点火焰伤害。(X为该角色装备区里牌的数量且至少为1)',
		mieji_info:'你使用黑色非延时类锦囊牌仅指定一个目标后，可以额外指定一个目标',
		juece_info:'每当一名其他角色在你回合内失去最后一张手牌，你可以对其造成一点伤害',
		jiefan_info:'限定技，出牌阶段，你可以选择一名角色，令攻击范围内含有该角色的所有角色各选择一项：1.弃置一张武器牌；2.令其摸一张牌。',
		fuli_info:'限定技，当你处于濒死状态时，可以将体力回复至体力上限，然后翻面',
		qianxi_info:'回合开始阶段开始时，你可以进行一次判定，然后令一名距离为1的角色不能使用或打出与判定结果颜色相同的手牌，直到回合结束。',
		yaowu_info:'锁定技，当任意一名角色使用红色【杀】对你造成伤害时，该角色回复1点体力或摸一张牌。',
		zhiman_info:'当你对一名其他角色造成伤害时，你可以防止此伤害，然后获得其装备区或判定区的一张牌。',
		sanyao_info:'出牌阶段限一次，你可以弃置一张牌并指定一名体力最多(或之一)的角色，你对其造成1点伤害。',
		paiyi_info:'出牌阶段限一次，你可以将一张“权”置入弃牌堆并选择一名角色，令其摸两张牌，然后若其手牌多于你，你对其造成1伤害。',
		zili_info:'觉醒技，准备阶段开始时，若“权”的数量不小于3，你减1点体力上限，选择一项：1、回复1点体力；2、摸两张牌。然后你获得“排异”。',
		quanji_info:'每当你受到1点伤害后，你可以可摸一张牌，然后将一张手牌置于武将牌上，称为“权”；你的手牌上限+X（X为“权”的数量）。',
		xianzhou_info:'限定技。出牌阶段，你可以将装备区里的所有牌交给一名其他角色，然后该角色选择一项：令你回复X点体力;或对其攻击范围内的X名角色各造成1点伤害(X为你以此法交给该角色的牌的数量)。',
		qieting_info:'一名其他角色的回合结束时，若其未于此回合内使用过指定另一名角色为目标的牌，你可以选择一项：将其装备区里的一张牌移动至你装备区里的相应位置；或摸一张牌。',
		zhuikong_info:'一名其他角色的回合开始时，若你已受伤，你可以与该角色拼点，若你赢，该角色本回合使用的牌不能指定除该角色外的角色为目标',
		qiuyuan_info:'当你成为【杀】的目标时，你可以令另一名其他角色选择一项：①、交给你一张【闪】；②、成为此【杀】的额外目标。',
		gongji_info:'出牌阶段，你可以弃置一张牌，令你的攻击范围无限，直到回合结束，然后若你以此法弃置的牌为装备牌，你可以弃置一名其他角色的一张牌。每回合限一次。',
		zhuiyi_info:'你死亡时，可以令一名其他角色（杀死你的角色除外）摸三张牌，然后令其回复1点体力。',
		anxu_info:'出牌阶段，你可以选择两名手牌数不相等的其他角色，令其中手牌少的角色获得手牌多的角色的一张手牌并展示之',
		zongxuan_info:'每当你的牌被弃置，你可以将其按任意顺序置于牌堆顶',
		zhiyan_info:'回合结束阶段，你可以令一名角色摸一张并展示之，若是装备牌，其立即装备之并回复一点体力',
		miji_info:'回合结束阶段，若你已受伤，可以摸X张牌，然后将等量的牌交给一名其他角色',
		zhenlie_info:'每当你成为其他角色的卡牌的目标时，你可以流失一点体力取消之，然后弃置对方一张牌',
		chengxiang_info:'每当你受到一次伤害后，你可以亮出牌堆顶的四张牌。然后获得其中任意数量点数之和小于13的牌，将其余的牌置入弃牌堆。',
		renxin_info:'每当体力值为1的一名其他角色受到伤害时，你可以将武将牌翻面并弃置一张装备牌，然后防止此伤害。',
		jingce_info:'出牌阶段结束时，若你本回合使用的牌数量大于或等于你当前体力值，你可以摸两张牌。',
		wuyan_info:'锁定技，你使用的非延迟类锦囊对其他角色无效;其他角色使用的非延迟类锦囊对你无效。',
		xinwuyan_info:'锁定技，每当锦囊牌造成伤害时，若你为伤害来源，你防止此伤害；锁定技，每当你受到锦囊牌对你造成的伤害时，你防止此伤害。',
		jujian_info:'出牌阶段，你可以弃至多三张牌，然后让一名其他角色摸等量的牌。若你以此法弃牌不少于三张且均为同一类别，你回复1点体力。每回合限一次。',
		xinjujian_info:'回合结束阶段开始时，你可以弃置一张非基本牌并选择一名其他角色，令其选择一项：1.摸两张牌；2.回复1点体力；3.将其武将牌翻转至正面朝上并重置之。',
		luoying_info:'当其他角色的梅花牌，因弃牌或判定而进入弃牌堆时，你可以获得之。',
		jiushi_info:'若你的武将牌正面朝上，你可以(在合理的时机)将你的武将牌翻面来视为使用一张【酒】;当你的武将牌背面朝上时你受到伤害，你可在伤害结算后将之翻回正面。',
		jueqing_info:'锁定技，你即将造成的伤害均视为失去体力。',
		shangshi_info:'锁定技，当你的手牌数小于X时，你立即将手牌补至X张（X为你已损失的体力值且最多为3）',
		xuanfeng_info:'当你失去装备区里的牌时，或于弃牌阶段弃置了两张或更多的手牌后，你可以依次弃置一至两名其他角色的共计两张牌。',
		zhiyu_info:'每当你受到一次伤害后，你可以摸一张牌，然后展示所有手牌，若颜色均相同，伤害来源弃置一张手牌。',
		qice_info:'出牌阶段，你可以将所有的手牌（至少一张）当做任意一张非延时性锦囊牌使用，每阶段限一次。',
		jiangchi_info:'摸牌阶段摸牌时，你可以选择一项：1、额外摸一张牌，若如此做，你不能使用或打出【杀】，直到回合结束。 2、少摸一张牌，若如此做，出牌阶段你使用【杀】无距离限制且你可以额外使用一张【杀】，直到回合结束。',
		zishou_info:'摸牌阶段摸牌时，你可以额外摸X张牌（X为现存势力数）。若如此做，你于本回合出牌阶段内使用的牌不能指定其他角色为目标。',
		zongshi_info:'锁定技，场上每有一种势力，你的手牌上限便＋1。',
		shiyong_info:'锁定技，每当你受到一次红色【杀】或【酒】【杀】造成的伤害后，你减1点体力上限。',
		danshou_info:'每当你造成一次伤害后，你可以摸一张牌。若如此做，终止一切结算，当前回合结束。',
		yizhong_info:'锁定技，当你没有防具时，黑色的杀对你无效',
		xinzhan_info:'出牌阶段限一次，你可以观看牌堆顶的3+X张牌，然后展示其中任意数量♥的牌并获得之，其余以任意顺序置于牌堆顶。X为你已损失的体力值',
		huilei_info:'锁定技，杀死你的角色立即弃置所有的牌。',
		enyuan_info:'锁定技，其他角色每令你回复一点体力，该角色摸一张牌;其他角色每对你造成一次伤害，须给你一张♥手牌，否则该角色失去1点体力。',
		xuanhuo_info:'你每次获得一名其他角色两张或更多的牌时，可以令其摸一张牌；每当你受到1点伤害后，你可以令伤害来源选择一项：交给你一张手牌，或失去1点体力。',
		ganlu_info:'出牌阶段，你可以选择两名角色，交换他们装备区里的所有牌。以此法交换的装备数差不能超过X(X为你已损失体力值)。每回合限一次。',
		buyi_info:'当有角色进入濒死状态时，你可以展示该角色的一张手牌：若此牌不为基本牌，则该角色弃掉这张牌并回复1点体力。',
		mingce_info:'出牌阶段，你可以交给任一其他角色一张装备牌或【杀】，该角色进行二选一：1. 视为对其攻击范围内的另一名由你指定的角色使用一张【杀】。2. 摸一张牌。每回合限一次。',
		zhichi_info:'锁定技，你的回合外，你每受到一次伤害，任何【杀】或非延时类锦囊均对你无效，直到该回合结束。',
		zhichi2_info:'智迟已发动',
		pojun_info:'你每使用【杀】造成一次伤害，可令受到该伤害的角色多摸X张牌，X为改角色当前的体力值(X最多为5)，然后该角色将其武将牌翻面。',
	},
}
