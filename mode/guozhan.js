'use strict';
mode.guozhan={
	startBefore:function(){
		for(var i in lib.characterPack.mode_guozhan){
			if(!get.config('onlyguozhan')){
				if(lib.character[i.slice(3)]) continue;
			}
			lib.character[i]=lib.characterPack.mode_guozhan[i];
			if(!lib.character[i][4]){
				lib.character[i][4]=[];
			}
			if(!lib.translate[i]){
				lib.translate[i]=lib.translate[i.slice(3)];
			}
		}
	},
	start:function(){
		"step 0"
		var playback=localStorage.getItem(lib.configprefix+'playback');
		if(playback){
			ui.create.me();
			ui.arena.style.display='none';
			ui.system.style.display='none';
			_status.playback=playback;
			localStorage.removeItem(lib.configprefix+'playback');
			var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
			store.get(parseInt(playback)).onsuccess=function(e){
				if(e.target.result){
					game.playVideoContent(e.target.result.video);
				}
				else{
					alert('播放失败：找不到录像');
					game.reload();
				}
			}
			event.finish();
		}
		else if(_status.connectMode){
			game.waitForPlayer();
		}
		else{
			if(get.config('guozhanpile')){
				lib.card.list=lib.guozhanPile.slice(0);
			}
			game.prepareArena();
			game.delay();
			game.showChangeLog();
		}
		if(!_status.connectMode){
			_status.mode=get.config('guozhan_mode');
			if(_status.brawl&&_status.brawl.submode){
				_status.mode=_status.brawl.submode;
			}
		}
		"step 1"
		if(_status.connectMode){
			if(lib.configOL.guozhanpile){
				lib.card.list=lib.guozhanPile.slice(0);
			}
			game.randomMapOL();
			game.broadcastAll(function(pack){
				for(var i=0;i<game.players.length;i++){
					game.players[i].node.name.hide();
					game.players[i].node.name2.hide();
				}
				lib.characterPack.mode_guozhan=pack;
				for(var i in pack){
					if(!lib.configOL.onlyguozhan){
						if(lib.character[i.slice(3)]) continue;
					}
					lib.character[i]=pack[i];
					if(!lib.character[i][4]){
						lib.character[i][4]=[];
					}
					if(!lib.translate[i]){
						lib.translate[i]=lib.translate[i.slice(3)];
					}
				}
			},lib.characterPack.mode_guozhan);
		}
		else{
			for(var i=0;i<game.players.length;i++){
				game.players[i].node.name.hide();
				game.players[i].node.name2.hide();
				game.players[i].getId();
			}
			if(_status.brawl&&_status.brawl.chooseCharacterBefore){
				_status.brawl.chooseCharacterBefore();
			}
			game.chooseCharacter();
		}
		"step 2"
		if(ui.coin){
			_status.coinCoeff=get.coinCoeff([game.me.name1,game.me.name2]);
		}
		var player;
		if(_status.cheat_seat){
			var seat=_status.cheat_seat.link;
			if(seat==0){
				player=game.me;
			}
			else{
				player=game.players[game.players.length-seat];
			}
			if(!player) player=game.me;
			delete _status.cheat_seat;
		}
		else{
			player=game.players[Math.floor(Math.random()*game.players.length)];
		}
		event.trigger('gameStart');

		game.gameDraw(player);
		game.broadcastAll(function(player){
			for(var i=0;i<game.players.length;i++){
				game.players[i].name='unknown'+get.distance(player,game.players[i],'absolute');
				game.players[i].node.name_seat=ui.create.div('.name.name_seat',get.verticalStr(lib.translate[game.players[i].name]),game.players[i]);
				// if(game.players[i]==game.me){
				// 	lib.translate[game.players[i].name]+='（你）';
				// }
			}
		},player);

		var players=get.players(lib.sort.position);
		var info=[];
		for(var i=0;i<players.length;i++){
			info.push({
				name:game.players[i].name,
				translate:lib.translate[game.players[i].name],
				name1:players[i].name1,
				name2:players[i].name2,
			});
		}
		_status.videoInited=true,
		game.addVideo('init',null,info);
		if(_status.mode=='mingjiang'){
			game.showIdentity(true);
		}
		else{
			for(var i=0;i<game.players.length;i++){
				game.players[i].ai.shown=0;
			}
		}
		game.phaseLoop(player);
	},
	characterPack:{
		mode_guozhan:{
			gz_shibing1wei:['male','wei',0,[],['unseen']],
			gz_shibing2wei:['female','wei',0,[],['unseen']],
			gz_shibing1shu:['male','shu',0,[],['unseen']],
			gz_shibing2shu:['female','shu',0,[],['unseen']],
			gz_shibing1wu:['male','wu',0,[],['unseen']],
			gz_shibing2wu:['female','wu',0,[],['unseen']],
			gz_shibing1qun:['male','qun',0,[],['unseen']],
			gz_shibing2qun:['female','qun',0,[],['unseen']],

			gz_caocao:['male','wei',4,['jianxiong']],
			gz_simayi:['male','wei',3,['fankui','guicai']],
			gz_xiahoudun:['male','wei',4,['ganglie']],
			gz_zhangliao:['male','wei',4,['tuxi']],
			gz_xuzhu:['male','wei',4,['luoyi']],
			gz_guojia:['male','wei',3,['tiandu','yiji']],
			gz_zhenji:['female','wei',4,['luoshen','qingguo']],
			gz_xiahouyuan:['male','wei',4,['shensu']],
			gz_zhanghe:['male','wei',4,['qiaobian']],
			gz_xuhuang:['male','wei',4,['duanliang']],
			gz_caoren:['male','wei',4,['jushou']],
			gz_dianwei:['male','wei',4,['qiangxi']],
			gz_xunyu:['male','wei',3,['quhu','jieming']],
			gz_caopi:['male','wei',3,['xingshang','fangzhu']],
			gz_yuejin:['male','wei',4,['gzxiaoguo']],

			gz_liubei:['male','shu',4,['gzrende']],
			gz_guanyu:['male','shu',5,['wusheng']],
			gz_zhangfei:['male','shu',4,['paoxiao']],
			gz_zhugeliang:['male','shu',3,['guanxing','gzkongcheng']],
			gz_zhaoyun:['male','shu',4,['longdan']],
			gz_machao:['male','shu',4,['mashu','tieji']],
			gz_huangyueying:['female','shu',3,['jizhi','qicai']],
			gz_huangzhong:['male','shu',4,['liegong']],
			gz_weiyan:['male','shu',4,['kuanggu']],
			gz_pangtong:['male','shu',3,['lianhuan','oldniepan']],
			gz_sp_zhugeliang:['male','shu',3,['huoji','bazhen','kanpo']],
			gz_liushan:['male','shu',3,['xiangle','fangquan']],
			gz_menghuo:['male','shu',4,['huoshou','zaiqi']],
			gz_zhurong:['female','shu',4,['juxiang','lieren']],
			gz_ganfuren:['female','shu',3,['shushen','shenzhi']],

			gz_sunquan:['male','wu',4,['gzzhiheng']],
			gz_ganning:['male','wu',4,['qixi']],
			gz_lvmeng:['male','wu',4,['keji']],
			gz_huanggai:['male','wu',4,['kurou']],
			gz_zhouyu:['male','wu',3,['yingzi','fanjian']],
			gz_daqiao:['female','wu',3,['guose','liuli']],
			gz_luxun:['male','wu',3,['qianxun','duoshi']],
			gz_sunshangxiang:['female','wu',3,['jieyin','gzxiaoji']],
			gz_sunjian:['male','wu',4,['gzyinghun']],
			gz_xiaoqiao:['female','wu',3,['tianxiang','hongyan']],
			gz_taishici:['male','wu',4,['tianyi']],
			gz_zhoutai:['male','wu',4,['gzbuqu']],
			gz_re_lusu:['male','wu',3,['haoshi','dimeng']],
			gz_zhangzhang:['male','wu',3,['zhijian','guzheng']],
			gz_dingfeng:['male','wu',4,['fenxun','duanbing']],

			gz_huatuo:['male','qun',3,['qingnang','jijiu']],
			gz_lvbu:['male','qun',5,['wushuang']],
			gz_diaochan:['female','qun',3,['lijian','biyue']],
			gz_re_yuanshao:['male','qun',4,['luanji']],
			gz_jiaxu:['male','qun',3,['wansha','luanwu','gzweimu']],
			gz_pangde:['male','qun',4,['mashu','mengjin']],
			gz_zhangjiao:['male','qun',3,['leiji','guidao']],
			gz_caiwenji:['female','qun',3,['beige','gzduanchang']],
			gz_mateng:['male','qun',4,['mashu','xiongyi']],
			gz_kongrong:['male','qun',3,['gzmingshi','lirang']],
			gz_jiling:['male','qun',4,['shuangren']],
			gz_tianfeng:['male','qun',3,['sijian','suishi']],
			gz_panfeng:['male','qun',4,['kuangfu']],
			gz_zoushi:['female','qun',3,['huoshui','qingcheng']],

			// gz_dengai:['male','wei',4,['tuntian','ziliang','gzjixi']],
			// gz_caohong:['male','wei',4,['huyuan','heyi']],
			// gz_jiangfei:['male','shu',3,['shengxi','gzshoucheng']],
			// gz_jiangwei:['male','shu',4,['tiaoxin','yizhi','tianfu']],
			// gz_xusheng:['male','wu',4,['yicheng']],
			// gz_jiangqing:['male','wu',4,['shangyi','niaoxiang']],
			gz_hetaihou:['female','qun',3,['zhendu','qiluan']],

			gz_re_lidian:['male','wei',3,['xunxun','wangxi']],
			// gz_zangba:['male','wei',4,['hengjiang']],
			gz_madai:['male','shu',4,['mashu','gzqianxi']],
			// gz_mifuren:['female','shu',3,['gzguixiu','gzcunsi']],
			gz_sunce:['male','wu',4,['jiang','yingyang','hunshang']],
			gz_chendong:['male','wu',4,['duanxie','fenming']],
			// gz_sp_dongzhuo:['male','qun',4,['hengzheng','baoling']],
			// gz_zhangren:['male','qun',4,['chuanxin','fengshi']],
		}
	},
	skill:{
		// baoling:{
		// 	trigger:{player:'phaseEnd'},
		// },
		gzmingshi:{
			trigger:{player:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return event.num>0&&event.source&&(event.source.classList.contains('unseen')||event.source.classList.contains('unseen2'));
			},
			content:function(){
				trigger.num--;
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(player.hasSkill('jueqing')) return;
						if(!player.classList.contains('unseen')&&!player.classList.contains('unseen2')) return;
						var num=get.tag(card,'damage');
						if(num){
							if(num>1) return 0.5;
							return 0;
						}
					}
				}
			},
		},
		hunshang:{
			init:function(player){
				if(player.hasViceSkill('hunshang')){
					player.removeMaxHp();
				}
				else{
					player.disableSkill('hunshang',['hunshang','hunshang_yingzi','hunshang_yinghun']);
					player.awakenedSkills.add('hunshang');
				}
			},
			group:['hunshang_yingzi','hunshang_yinghun'],
		},
		hunshang_yingzi:{
			inherit:'yingzi',
			filter:function(event,player){
				return player.hp==1&&!player.hasSkill('yingzi');
			}
		},
		hunshang_yinghun:{
			inherit:'gzyinghun',
			filter:function(event,player){
				return player.hp==1&&player.isDamaged()&&!player.hasSkill('gzyinghun');
			}
		},
		yingyang:{
			trigger:{player:'compare',target:'compare'},
			filter:function(event){
				return !event.iwhile;
			},
			content:function(){
				if(player==trigger.player){
					trigger.num1+=3;
				}
				else{
					trigger.num2+=3;
				}
			}
		},
		gzqianxi:{
			audio:'qianxi',
			trigger:{player:'phaseBegin'},
			content:function(){
				"step 0"
				player.judge();
				"step 1"
				event.color=result.color;
				player.chooseTarget(function(card,player,target){
					return player!=target&&get.distance(player,target)<=1;
				},true).set('ai',function(target){
					return -ai.get.attitude(_status.event.player,target);
				});
				"step 2"
				if(result.bool&&result.targets.length){
					result.targets[0].storage.qianxi2=event.color;
					result.targets[0].addSkill('qianxi2');
					player.line(result.targets,'green');
					game.addVideo('storage',result.targets[0],['qianxi2',event.color]);
				}
			},
		},
		shuangren:{
			trigger:{player:'phaseUseBegin'},
			direct:true,
			priority:15,
			content:function(){
				'step 0'
				var goon;
				if(player.needsToDiscard()>1){
					goon=player.hasCard(function(card){
						return card.number>10&&ai.get.value(card)<=5;
					});
				}
				else{
					goon=player.hasCard(function(card){
						return card.number>=9&&ai.get.value(card)<=5||ai.get.value(card)<=3;
					});
				}
				player.chooseTarget(get.prompt('shuangren'),function(card,player,target){
					return target!=player;
				}).set('ai',function(target){
					var player=_status.event.player;
					if(_status.event.goon&&ai.get.attitude(player,target)<0){
						return ai.get.effect(target,{name:'sha'},player,player);
					}
					return 0;
				}).set('goon',goon);
				'step 1'
				if(result.bool){
					var target=result.targets[0];
					event.target=target;
					player.logSkill('shuangren',target);
					player.chooseToCompare(target);
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool){
					var target=event.target;
					if(target.identity!='ye'&&target.identity!='unknown'&&game.hasPlayer(function(current){
						return target.identity==current.identity&&target!=current&&player.canUse('sha',current,false);
					})){
						player.chooseTarget('对一名'+get.translation(target.identity)+'势力的角色使用一张杀',true,function(card,player,target){
							return target.identity==_status.event.identity;
						}).set('ai',function(target){
							var player=_status.event.player;
							return ai.get.effect(target,{name:'sha'},player,player);
						}).set('identity',target.identity);
					}
					else{
						player.useCard({name:'sha'},target,false);
						event.finish();
					}
				}
				else{
					trigger.finish();
					trigger.untrigger();
					event.finish();
				}
				'step 3'
				if(result.bool&&result.targets&&result.targets.length){
					player.useCard({name:'sha'},result.targets[0],false);
				}
			}
		},
		gzduanchang:{
			audio:'duanchang',
			trigger:{player:'dieBegin'},
			forced:true,
			silent:true,
			filter:function(event,player){
				return event.source&&event.source.isIn()&&event.source!=player;
			},
			content:function(){
				'step 0'
				player.chooseControl('主将','副将',function(){
					return Math.random()<0.5?'主将':'副将';
				}).set('prompt','令'+get.translation(trigger.source)+'失去一张武将牌的所有技能');
				'step 1'
				var skills;
				if(result.control=='主将'){
					trigger.source.showCharacter(0);
					trigger.source.node.avatar.classList.add('disabled');
					skills=lib.character[trigger.source.name];
					game.log(trigger.source,'失去了主将技能');
				}
				else{
					trigger.source.showCharacter(1);
					trigger.source.node.avatar2.classList.add('disabled');
					skills=lib.character[trigger.source.name2];
					game.log(trigger.source,'失去了副将技能');
				}
				trigger.source.disableSkill('gzduanchang',skills);
			},
			logTarget:'source',
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 0.2;
					return 1.5;
				},
				effect:{
					target:function(card,player,target,current){
						if(!target.hasFriend()) return;
						if(target.hp<=1&&get.tag(card,'damage')) return [1,0,0,-2];
					}
				}
			}
		},
		gzweimu:{
			audio:'weimu',
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:15,
			check:function(event,player){
				return ai.get.effect(event.target,event.card,event.player,player)<0;
			},
			filter:function(event,player){
				return get.type(event.card,'trick')=='trick'&&get.color(event.card)=='black';
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card,'trick')=='trick'&&get.color(card)=='black') return 'zeroplayertarget';
					},
				}
			}
		},
		gzkongcheng:{
			audio:'kongcheng',
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:15,
			check:function(event,player){
				return ai.get.effect(event.target,event.card,event.player,player)<0;
			},
			filter:function(event,player){
				return player.num('h')==0&&(event.card.name=='sha'||event.card.name=='juedou');
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(target.num('h')==0&&(card.name=='sha'||card.name=='juedou')) return 'zeroplayertarget';
					},
				}
			}
		},
		gzxiaoji:{
			inherit:'xiaoji',
			content:function(){
				player.draw(2);
			}
		},
		gzrende:{
			audio:'rende',
			group:['gzrende1'],
			enable:'phaseUse',
			filterCard:true,
			selectCard:[1,Infinity],
			discard:false,
			prepare:'give',
			filterTarget:function(card,player,target){
				return player!=target;
			},
			check:function(card){
				if(ui.selected.cards.length>2) return 0;
				if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
				if(!ui.selected.cards.length&&card.name=='du') return 20;
				var player=get.owner(card);
				if(player.hp==player.maxHp||player.storage.gzrende<0||player.num('h')+player.storage.gzrende<=2){
					if(ui.selected.cards.length){
						return -1;
					}
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].get('s').contains('haoshi')&&
							!players[i].isTurnedOver()&&
							!players[i].num('j','lebu')&&
							ai.get.attitude(player,players[i])>=3&&
							ai.get.attitude(players[i],player)>=3){
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
				target.gain(cards,player);
				if(typeof player.storage.gzrende!='number'){
					player.storage.gzrende=0;
				}
				if(player.storage.gzrende>=0){
					player.storage.gzrende+=cards.length;
					if(player.storage.gzrende>=3){
						player.recover();
						player.storage.gzrende=-1;
					}
				}
			},
			ai:{
				order:function(skill,player){
					if(player.hp==player.maxHp||player.storage.gzrende<0||player.num('h')+player.storage.gzrende<=2){
						return 1;
					}
					return 10;
				},
				result:{
					target:function(player,target){
						if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
							return -10;
						}
						if(target.num('j','lebu')) return 0;
						var nh=target.num('h');
						var np=player.num('h');
						if(player.hp==player.maxHp||player.storage.gzrende<0||player.num('h')+player.storage.gzrende<=2){
							if(nh>=np-1&&np<=player.hp&&!target.get('s').contains('haoshi')) return 0;
						}
						return Math.max(1,5-nh);
					}
				},
				effect:{
					target:function(card,player,target){
						if(player==target&&get.type(card)=='equip'){
							if(player.num('e',{subtype:get.subtype(card)})){
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(players[i]!=player&&ai.get.attitude(player,players[i])>0){
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
		gzrende1:{
			trigger:{player:'phaseUseBegin'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.storage.gzrende=0;
			}
		},
		gzzhiheng:{
			inherit:'zhiheng',
			selectCard:function(){
				return [1,_status.event.player.maxHp];
			},
			prompt:'出牌阶段限一次，你可以弃置至多X张牌（X为你的体力上限），然后摸等量的牌'
		},
		huoshui:{
			enable:'phaseUse',
			unique:true,
			forceunique:true,
			filter:function(event,player){
				if(player.name1=='gz_zoushi') return player.classList.contains('unseen');
				return player.classList.contains('unseen2');
			},
			content:function(){
				if(player.name1=='gz_zoushi') player.showCharacter(0);
				else player.showCharacter(1);
			}
		},
		_huoshui:{
			ai:{
				nomingzhi:true,
				skillTagFilter:function(player){
					return _status.currentPhase&&_status.currentPhase!=player&&_status.currentPhase.hasSkill('huoshui');
				}
			}
		},
		qingcheng:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('he',{type:'equip'})&&game.hasPlayer(function(current){
					return current!=player&&!current.classList.contains('unseen')&&!current.classList.contains('unseen2');
				});
			},
			filterCard:{type:'equip'},
			position:'he',
			filterTarget:function(card,player,target){
				return !target.classList.contains('unseen')&&!target.classList.contains('unseen2');
			},
			check:function(card){
				return 6-ai.get.value(card,_status.event.player);
			},
			content:function(){
				'step 0'
				var choice='主将';
				var skills=lib.character[target.name2][3];
				for(var i=0;i<skills.length;i++){
					var info=get.info(skills[i]);
					if(info&&info.ai&&info.ai.maixie){
						choice='副将';break;
					}
				}
				if(target.name=='gz_zhoutai'){
					choice='主将';
				}
				else if(target.name2=='gz_zhoutai'){
					choice='副将';
				}
				player.chooseControl('主将','副将',function(){
					return _status.event.choice;
				}).set('prompt','暗置'+get.translation(target)+'的一张武将牌').set('choice',choice);
				'step 1'
				if(result.control=='主将'){
					target.hideCharacter(0);
				}
				else{
					target.hideCharacter(1);
				}
				target.addTempSkill('qingcheng_ai','phaseAfter');
			},
			ai:{
				order:8,
				result:{
					target:function(player,target){
						if(target.hp<=0) return -5;
						if(player.getStat().skill.qingcheng) return 0;
						if(!target.hasSkillTag('maixie')) return 0;
						if(ai.get.attitude(player,target)>=0) return 0;
						if(player.hasCard(function(card){
							return get.tag(card,'damage')&&player.canUse(card,target,true,true);
						})){
							if(target.maxHp>3) return -0.5;
							return -1;
						}
						return 0;
					}
				}
			}
		},
		qingcheng_ai:{
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'damage')) return 2;
					}
				}
			}
		},
		duoshi:{
			enable:'chooseToUse',
			viewAs:{name:'yiyi'},
			usable:4,
			filterCard:{color:'red'},
			viewAsFilter:function(player){
				return player.num('h',{color:'red'})>0;
			},
			check:function(card){
				return 5-ai.get.value(card);
			}
		},
		gzxiaoguo:{
			inherit:'xiaoguo',
			content:function(){
				"step 0"
				var nono=(Math.abs(ai.get.attitude(player,trigger.player))<3);
				if(ai.get.damageEffect(trigger.player,player,player)<=0){
					nono=true;
				}
				var next=player.chooseToDiscard(get.prompt('gzxiaoguo',trigger.player),{type:'basic'});
				next.set('ai',function(card){
					if(_status.event.nono) return 0;
					return 8-ai.get.useful(card);
				});
				next.set('logSkill',['gzxiaoguo',trigger.player]);
				next.set('nono',nono);
				"step 1"
				if(result.bool){
					var nono=(ai.get.damageEffect(trigger.player,player,trigger.player)>=0);
					trigger.player.chooseToDiscard('he',{type:'equip'}).set('ai',function(card){
						if(_status.event.nono){
							return 0;
						}
						if(_status.event.player.hp==1) return 10-ai.get.value(card);
						return 9-ai.get.value(card);
					}).set('nono',nono);
				}
				else{
					event.finish();
				}
				"step 2"
				if(!result.bool){
					trigger.player.damage();
				}
			},
		},
		_mingzhi1:{
			trigger:{player:'phaseBegin'},
			priority:19,
			forced:true,
			popup:false,
			content:function(){
				"step 0"
				var choice=1;
				for(var i=0;i<player.hiddenSkills.length;i++){
					if(lib.skill[player.hiddenSkills[i]].ai){
						var mingzhi=lib.skill[player.hiddenSkills[i]].ai.mingzhi;
						if(mingzhi==false){
							choice=0;break;
						}
						if(typeof mingzhi=='function'&&mingzhi(trigger,player)==false){
							choice=0;break;
						}
					}
				}
				if(player.isUnseen()){
					var group=lib.character[player.name1][1];
					player.chooseControl('bumingzhi','明置'+get.translation(player.name1),
						'明置'+get.translation(player.name2),'tongshimingzhi',true).ai=function(event,player){
						var popu=get.population(lib.character[player.name1][1])
						if(popu>=2||(popu==1&&game.players.length<=4)){
							return Math.random()<0.5?3:(Math.random()<0.5?2:1);
						}
						if(choice==0) return 0;
						if(get.population(group)>0&&get.totalPopulation(group)+1<=get.population()/2){
							return Math.random()<0.2?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
						}
						var nming=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player&&game.players[i].identity!='unknown'){
								nming++;
							}
						}
						if(nming==game.players.length-1) return Math.random()<0.5?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
						return (Math.random()<0.1*nming/game.players.length)?(Math.random()<0.5?3:(Math.random()<0.5?2:1)):0;
					};
				}
				else{
					if(Math.random()<0.5) choice=0;
					if(player.classList.contains('unseen')){
						player.chooseControl('bumingzhi','明置'+get.translation(player.name1),true).choice=choice;
					}
					else if(player.classList.contains('unseen2')){
						player.chooseControl('bumingzhi','明置'+get.translation(player.name2),true).choice=choice;
					}
					else{
						event.finish();
					}
				}
				"step 1"
				switch(result.control){
					case '明置'+get.translation(player.name1):player.showCharacter(0);break;
					case '明置'+get.translation(player.name2):player.showCharacter(1);break;
					case 'tongshimingzhi':player.showCharacter(2);break;
				}
			}
		},
		_mingzhi2:{
			trigger:{player:'triggerHidden'},
			forced:true,
			popup:false,
			priority:10,
			content:function(){
				"step 0"
				if(get.info(trigger.skill).silent){
					event.finish();
				}
				else{
					event.skillHidden=true;
					var bool1=(game.expandSkills(lib.character[player.name1][3]).contains(trigger.skill));
					var bool2=(game.expandSkills(lib.character[player.name2][3]).contains(trigger.skill));
					var nai=function(){
						var player=_status.event.player;
						if(!_status.event.yes) return false;
						if(player.identity!='unknown') return true;
						if(Math.random()<0.5) return true;
						var info=get.info(_status.event.skill);
						if(info&&info.ai&&info.ai.maixie) return true;
						var group=lib.character[player.name1][1];
						var popu=get.population(lib.character[player.name1][1])
						if(popu>=2||(popu==1&&game.players.length<=4)){
							return true;
						}
						if(get.population(group)>0&&get.totalPopulation(group)+1<=get.population()/2){
							return Math.random()<0.2?true:false;
						}
						var nming=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player&&game.players[i].identity!='unknown'){
								nming++;
							}
						}
						if(nming==game.players.length-1) return Math.random()<0.5?true:false;
						return (Math.random()<0.1*nming/game.players.length)?true:false;
					}
					if(bool1&&bool2){
						event.name=player.name1;
						event.name2=player.name2;
					}
					else{
						event.name=bool1?player.name1:player.name2;
					}
					var info=get.info(trigger.skill);
					var next=player.chooseBool('是否明置'+get.translation(event.name)+'以发动【'+get.translation(trigger.skill)+'】？');
					next.yes=!info.check||info.check(trigger._trigger,player);
					next.skill=trigger.skill;
					next.ai=nai
				}
				"step 1"
				if(result.bool){
					if(event.name==player.name1) player.showCharacter(0);
					else player.showCharacter(1);
					trigger.revealed=true;
					event.finish();
				}
				else if(event.name2){
					var info=get.info(trigger.skill);
					var next=player.chooseBool('是否明置'+get.translation(event.name2)+'以发动【'+get.translation(trigger.skill)+'】？');
					next.yes=!info.check||info.check(trigger._trigger,player);
					next.ai=function(){
						return _status.event.yes;
					};
				}
				else{
					event.finish();
					trigger.untrigger();
					trigger.cancelled=true;
				}
				"step 2"
				if(event.name2){
					if(result.bool){
						player.showCharacter(1);
						trigger.revealed=true;
					}
					else{
						trigger.untrigger();
						trigger.cancelled=true;
					}
				}
			}
		},
	},
	game:{
		getCharacterChoice:function(list,num){
			var choice=list.splice(0,num);
			var map={wei:[],shu:[],wu:[],qun:[]};
			for(var i=0;i<choice.length;i++){
				var group=lib.character[choice[i]][1];
				if(map[group]){
					map[group].push(choice[i]);
				}
			}
			for(var i in map){
				if(map[i].length<2){
					if(map[i].length==1){
						choice.remove(map[i][0]);
						list.push(map[i][0]);
					}
					delete map[i];
				}
			}
			if(choice.length==num-1){
				for(var i=0;i<list.length;i++){
					if(map[lib.character[list[i]][1]]){
						choice.push(list[i]);
						list.splice(i--,1);
						break;
					}
				}
			}
			else if(choice.length<num-1){
				var group=null
				for(var i=0;i<list.length;i++){
					if(group){
						if(lib.character[list[i]][1]==group){
							choice.push(list[i]);
							list.splice(i--,1);
							if(choice.length>=num){
								break;
							}
						}
					}
					else{
						if(!map[lib.character[list[i]][1]]){
							group=lib.character[list[i]][1];
							choice.push(list[i]);
							list.splice(i--,1);
						}
					}
				}
			}
			return choice;
		},
		getState:function(){
			var state={};
			for(var i in lib.playerOL){
				var player=lib.playerOL[i];
				state[i]={
					identity:player.identity,
					shown:player.ai.shown,
				};
			}
			return state;
		},
		updateState:function(state){
			for(var i in state){
				var player=lib.playerOL[i];
				if(player){
					player.identity=state[i].identity;
					player.ai.shown=state[i].shown;
				}
			}
		},
		getRoomInfo:function(uiintro){
			var num,last;
			if(lib.configOL.initshow_draw=='0'){
				num='关闭'
			}
			else{
				num=get.cnNumber(parseInt(lib.configOL.initshow_draw))+'张'
			}
			uiintro.add('<div class="text chat">首亮摸牌：'+num);
			uiintro.add('<div class="text chat">珠联璧合：'+(lib.configOL.zhulian?'开启':'关闭'));
			uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
			uiintro.add('<div class="text chat">国战牌堆：'+(lib.configOL.guozhanpile?'开启':'关闭'));
			last=uiintro.add('<div class="text chat">国战武将：'+(lib.configOL.onlyguozhan?'开启':'关闭'));
			if(!lib.configOL.onlyguozhan){
				uiintro.add('<div class="text chat">屏蔽弱将：'+(lib.configOL.ban_weak?'开启':'关闭'));
				last=uiintro.add('<div class="text chat">屏蔽强将：'+(lib.configOL.ban_strong?'开启':'关闭'));
				if(lib.configOL.banned.length){
					last=uiintro.add('<div class="text chat">禁用武将：'+get.translation(lib.configOL.banned));
				}
				if(lib.configOL.bannedcards.length){
					last=uiintro.add('<div class="text chat">禁用卡牌：'+get.translation(lib.configOL.bannedcards));
				}
			}
			last.style.paddingBottom='8px';
		},
		addRecord:function(bool){
			if(typeof bool=='boolean'){
				var data=lib.config.gameRecord.guozhan.data;
				var identity=game.me.identity;
				if(!data[identity]){
					data[identity]=[0,0];
				}
				if(bool){
					data[identity][0]++;
				}
				else{
					data[identity][1]++;
				}
				var list=['wei','shu','wu','qun','ye'];
				var str='';
				for(var i=0;i<list.length;i++){
					if(data[list[i]]){
						str+=lib.translate[list[i]+'2']+'：'+data[list[i]][0]+'胜'+' '+data[list[i]][1]+'负<br>';
					}
				}
				lib.config.gameRecord.guozhan.str=str;
				game.saveConfig('gameRecord',lib.config.gameRecord);
			}
		},
		getIdentityList:function(player){
			if(!player.isUnseen()) return;
			if(player==game.me) return;
			var list={
				wei:'魏',
				shu:'蜀',
				wu:'吴',
				qun:'群',
				ye:'野',
				unknown:'猜'
			}
			var num=Math.floor((game.players.length+game.dead.length)/2);
			var noye=true;
			if(get.population('wei')>=num){
				delete list.wei;
				noye=false;
			}
			if(get.population('shu')>=num){
				delete list.shu;
				noye=false;
			}
			if(get.population('wu')>=num){
				delete list.wu;
				noye=false;
			}
			if(get.population('qun')>=num){
				delete list.qun;
				noye=false;
			}
			if(noye){
				delete list.ye;
			}
			return list;
		},
		getVideoName:function(){
			var str=get.translation(game.me.name1)+'/'+get.translation(game.me.name2);
			var str2=get.cnNumber(parseInt(get.config('player_number')))+'人'+
				get.translation(lib.config.mode);
			if(game.me.identity=='ye'){
				str2+=' - 野心家';
			}
			var name=[str,str2];
			return name;
		},
		showIdentity:function(started){
			if(game.phaseNumber==0&&!started) return;
			for(var i=0;i<game.players.length;i++){
				game.players[i].showCharacter(2,false);
			}
		},
		tryResult:function(){
			var hasunknown=false,check=true,unknown,giveup;
			var group=game.players[0]._group;
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].identity=='unknown'){
					hasunknown=true;
					if(unknown){
						unknown='no';
					}
					else{
						unknown=game.players[i];
					}
				}
				if(game.players[i]._group!=group){
					check=false;break;
				}
			}
			if(check){
				if(get.population('ye')){
					if(game.players.length>1){
						check=false;
					}
				}
				else{
					if(hasunknown){
						var players=game.players.concat(game.dead);
						var num=0;
						for(var i=0;i<players.length;i++){
							if(players[i]._group==group){
								num++;
							}
						}
						if(num>players.length/2){
							check=false;
						}
					}
				}
			}
			if(check){
				game.checkResult();
			}
			else if(!hasunknown){
				var ids=[];
				var idmap={};
				var idp={};
				for(var i=0;i<game.players.length;i++){
					var id=game.players[i].identity;
					ids.add(id);
					if(!idmap[id]){
						idmap[id]=1;
					}
					else{
						idmap[id]++;
					}
					idp[id]=game.players[i];
				}
				if(ids.length!=2) return;
				var id1=ids[0],id2=ids[1];
				if(idmap[id1]>1&&idmap[id2]>1) return;
				if(idmap[id1]>1&&id1=='ye') return;
				if(idmap[id2]>1&&id2=='ye') return;
				if(idmap[id1]==1){
					idp[id1].showGiveup();
				}
				if(idmap[id2]==1){
					idp[id2].showGiveup();
				}
			}
		},
		checkResult:function(){
			_status.overing=true;
			for(var i=0;i<game.players.length;i++){
				game.players[i].showCharacter(2);
			}
			if(game.me.identity=='ye'){
				if(game.me.classList.contains('dead')){
					game.over('战斗失败');
				}
				else{
					game.over('战斗胜利');
				}
			}
			else{
				if(get.population(game.me.identity)==0){
					game.over('战斗失败');
				}
				else{
					game.over('战斗胜利');
				}
			}
			game.showIdentity();
		},
		checkOnlineResult:function(player){
			if(player.identity=='ye'){
				return player.isAlive();
			}
			return get.population(player.identity)>0;
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.addPlayer=true;
			next.ai=function(player,list,back){
				if(_status.brawl&&_status.brawl.chooseCharacterAi){
					if(_status.brawl.chooseCharacterAi(player,list,back)!==false){
						return;
					}
				}
				for(var i=0;i<list.length-1;i++){
					for(var j=i+1;j<list.length;j++){
						if(lib.character[list[i]][1]==lib.character[list[j]][1]){
							player.init(list[i],list[j],false);
							if(back){
								list.remove(player.name);
								list.remove(player.name2);
								for(var i=0;i<list.length;i++){
									back.push(list[i]);
								}
							}
							return;
						}
					}
				}
			}
			next.setContent(function(){
				"step 0"
				ui.arena.classList.add('choose-character');
				var addSetting=function(dialog){
					dialog.add('选择座位');
					var seats=document.createElement('table');
					seats.classList.add('pointertable');
					seats.style.margin='0 auto';
					seats.style.maxWidth=(60*parseInt(get.config('player_number')))+'px';
					var tr=document.createElement('tr');
					seats.appendChild(tr);
					for(var i=1;i<=game.players.length;i++){
						var td=document.createElement('td');
						tr.appendChild(td);
						td.style.width='40px';
						td.style.fontSize='25px';
						td.style.fontFamily='xinwei';
						td.innerHTML='<span>'+get.cnNumber(i,true)+'</span>';
						td.link=i-1;
						td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
							if(_status.dragged) return;
							if(_status.justdragged) return;
							if(_status.cheat_seat){
								_status.cheat_seat.classList.remove('thundertext');
								if(_status.cheat_seat==this){
									delete _status.cheat_seat;
									return;
								}
							}
							this.classList.add('thundertext');
							_status.cheat_seat=this;
						});
					}
					dialog.content.appendChild(seats);
					if(game.me==game.zhu){
						seats.previousSibling.style.display='none';
						seats.style.display='none';
					}

					dialog.add(ui.create.div('.placeholder'));
					dialog.add(ui.create.div('.placeholder'));
					dialog.add(ui.create.div('.placeholder'));
				};
				var removeSetting=function(){
					var dialog=_status.event.dialog;
					if(dialog.querySelector('table')&&!get.config('change_identity')){
						dialog.querySelector('table').previousSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').nextSibling.remove();
						dialog.querySelector('table').remove();
					}
				};
				event.addSetting=addSetting;
				event.removeSetting=removeSetting;

				var chosen=lib.config.continue_name||[];
				game.saveConfig('continue_name');
				event.chosen=chosen;

				var i;
				event.list=[];
				for(i in lib.character){
					if(i.indexOf('gz_shibing')==0) continue;
					if(chosen.contains(i)) continue;
					if(lib.filter.characterDisabled(i)) continue;
					if(get.config('onlyguozhan')&&!lib.characterPack.mode_guozhan[i]) continue;
					if(lib.character[i][2]==3||lib.character[i][2]==4||lib.character[i][2]==5)
					event.list.push(i);
				}
				if(_status.brawl&&_status.brawl.chooseCharacterFilter){
					event.list=_status.brawl.chooseCharacterFilter(event.list);
				}
				event.list.randomSort();
				// var list=event.list.splice(0,parseInt(get.config('choice_num')));
				var list;
				if(_status.brawl&&_status.brawl.chooseCharacter){
					list=_status.brawl.chooseCharacter(event.list,game.me);
				}
				else{
					list=game.getCharacterChoice(event.list,parseInt(get.config('choice_num')));
				}
				if(_status.auto){
					event.ai(game.me,list);
				}
				else if(chosen.length){
					game.me.init(chosen[0],chosen[1],false);
				}
				else{
					var dialog=ui.create.dialog('选择角色','hidden',[list,'character']);
					if(!_status.brawl||!_status.brawl.noAddSetting){
						if(get.config('change_identity')){
							addSetting(dialog);
						}
					}
					var next=game.me.chooseButton(dialog,true,2);
					next.filterButton=function(button){
						if(ui.dialog.buttons.length<=10){
							for(var i=0;i<ui.dialog.buttons.length;i++){
								if(ui.dialog.buttons[i]!=button){
									if(lib.element.player.perfectPair.call({
										name1:button.link,name2:ui.dialog.buttons[i].link
									})){
										button.classList.add('glow2');
									}
								}
							}
						}
						if(ui.selected.buttons.length==0) return true;
						return (lib.character[button.link][1]==lib.character[ui.selected.buttons[0].link][1]);
					};
					next.switchToAuto=function(){
						event.ai(game.me,list);
						ui.arena.classList.remove('selecting');
					};
					if(get.config('onlyguozhan')){
						event.dialogxx=ui.create.characterDialog(function(i){
							if(i.indexOf('gz_shibing')==0) return true;
							if(!lib.characterPack.mode_guozhan[i]) return true;
						},'expandall');
					}
					else{
						event.dialogxx=ui.create.characterDialog();
					}
					ui.create.cheat2=function(){
						ui.cheat2=ui.create.control('自由选将',function(){
							if(this.dialog==_status.event.dialog){
								if(game.changeCoin){
									game.changeCoin(50);
								}
								this.dialog.close();
								_status.event.dialog=this.backup;
								this.backup.open();
								delete this.backup;
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.style.opacity=1;
								}
							}
							else{
								if(game.changeCoin){
									game.changeCoin(-10);
								}
								this.backup=_status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog=_status.event.parent.dialogxx;
								this.dialog=_status.event.dialog;
								this.dialog.open();
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.style.opacity=0.6;
								}
							}
						});
					}
					ui.create.cheat=function(){
						_status.createControl=ui.cheat2;
						ui.cheat=ui.create.control('更换',function(){
							if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
								return;
							}
							if(game.changeCoin){
								game.changeCoin(-3);
							}
							event.list=event.list.concat(list);
							event.list.randomSort();
							// list=event.list.splice(0,parseInt(get.config('choice_num')));
							list=game.getCharacterChoice(event.list,parseInt(get.config('choice_num')));
							var buttons=ui.create.div('.buttons');
							var node=_status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons=ui.create.buttons(list,'character',buttons);
							_status.event.dialog.content.insertBefore(buttons,node);
							buttons.animate('start');
							node.remove();
							game.uncheck();
							game.check();
						});
						delete _status.createControl;
					}
					if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
						if(!ui.cheat&&get.config('change_choice'))
						ui.create.cheat();
						if(!ui.cheat2&&get.config('free_choose'))
						ui.create.cheat2();
					}
				}
				"step 1"
				if(ui.cheat){
					ui.cheat.close();
					delete ui.cheat;
				}
				if(ui.cheat2){
					ui.cheat2.close();
					delete ui.cheat2;
				}
				if(result.buttons){
					game.me.init(result.buttons[0].link,result.buttons[1].link,false);
				}
				game.addRecentCharacter(game.me.name,game.me.name2);
				// game.me.setIdentity(game.me.group);
				event.list.remove(game.me.name);
				event.list.remove(game.me.name2);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=game.me){
						event.ai(game.players[i],event.list.splice(0,parseInt(get.config('choice_num'))),event.list);
					}
				}
				for(var i=0;i<game.players.length;i++){
					game.players[i].classList.add('unseen');
					game.players[i].classList.add('unseen2');
					if(game.players[i]!=game.me){
						game.players[i].node.identity.firstChild.innerHTML='猜';
						game.players[i].node.identity.dataset.color='unknown';
						game.players[i].node.identity.classList.add('guessing');
					}
					game.players[i].hiddenSkills=lib.character[game.players[i].name][3].slice(0);
					var hiddenSkills2=lib.character[game.players[i].name2][3];
					for(var j=0;j<hiddenSkills2.length;j++){
						game.players[i].hiddenSkills.add(hiddenSkills2[j]);
					}
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						if(!lib.skill[game.players[i].hiddenSkills[j]]){
							game.players[i].hiddenSkills.splice(j--,1);
						}
					}
					game.players[i].group='unknown';
					game.players[i].sex='unknown';
					game.players[i].name1=game.players[i].name;
					game.players[i].name='unknown';
					game.players[i].identity='unknown';
					game.players[i].node.name.show();
					game.players[i].node.name2.show();
					game.players[i]._group=lib.character[game.players[i].name1][1];
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j],true);
					}
				}
				setTimeout(function(){
					ui.arena.classList.remove('choose-character');
				},500);
			});
		},
		chooseCharacterOL:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.setContent(function(){
				'step 0'
				game.broadcastAll(function(){
					ui.arena.classList.add('choose-character');
				});
				var list;
				if(lib.configOL.onlyguozhan){
					list=[];
					for(var i in lib.characterPack.mode_guozhan){
						if(i.indexOf('gz_shibing')==0) continue;
						list.push(i);
					}
				}
				else{
					list=get.charactersOL();
				}
				event.list=list.slice(0);
				var list2=[];
				var num;
				if(lib.configOL.number*6>list.length){
					num=5;
				}
				else if(lib.configOL.number*7>list.length){
					num=6;
				}
				else{
					num=7;
				}
				var filterButton=function(button){
					if(ui.dialog){
						if(ui.dialog.buttons.length<=10){
							for(var i=0;i<ui.dialog.buttons.length;i++){
								if(ui.dialog.buttons[i]!=button){
									if(lib.element.player.perfectPair.call({
										name1:button.link,name2:ui.dialog.buttons[i].link
									})){
										button.classList.add('glow2');
									}
								}
							}
						}
					}
					if(ui.selected.buttons.length==0) return true;
					if(!lib.character[button.link]) return false;
					return (lib.character[button.link][1]==lib.character[ui.selected.buttons[0].link][1]);
				};
				list.randomSort();
				for(var i=0;i<game.players.length;i++){
					list2.push([game.players[i],['选择角色',[game.getCharacterChoice(list,num),'character']],2,
					true,function(){return Math.random()},filterButton]);
				}
				game.me.chooseButtonOL(list2,function(player,result){
					if(game.online||player==game.me) player.init(result.links[0],result.links[1],false);
				}).set('switchToAuto',function(){
					_status.event.result='ai';
				}).set('processAI',function(){
					var buttons=_status.event.dialog.buttons;
					for(var i=0;i<buttons.length-1;i++){
						for(var j=i+1;j<buttons.length;j++){
							if(lib.character[buttons[i].link][1]==lib.character[buttons[j].link][1]){
								return {
									bool:true,
									links:[buttons[i].link,buttons[j].link]
								}
							}
						}
					}
				});
				'step 1'
				var sort=true;
				for(var i in result){
					if(result[i]&&result[i].links){
						for(var j=0;j<result[i].links.length;j++){
							event.list.remove(result[i].links[j]);
						}
					}
				}
				for(var i in result){
					if(result[i]=='ai'||!result[i].links||result[i].links.length<1){
						if(sort){
							sort=false;
							event.list.randomSort();
						}
						result[i]=[event.list.shift()];
						var group=lib.character[result[i][0]][1];
						for(var j=0;j<event.list.length;j++){
							if(lib.character[event.list[j]][1]==group){
								result[i].push(event.list[j]);
								event.list.splice(j--,1);
								break;
							}
						}
					}
					else{
						result[i]=result[i].links
					}
					if(!lib.playerOL[i].name){
						lib.playerOL[i].init(result[i][0],result[i][1],false);
					}
				}

				for(var i=0;i<game.players.length;i++){
					game.players[i].hiddenSkills=lib.character[game.players[i].name][3].slice(0);
					var hiddenSkills2=lib.character[game.players[i].name2][3];
					for(var j=0;j<hiddenSkills2.length;j++){
						game.players[i].hiddenSkills.add(hiddenSkills2[j]);
					}
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						if(!lib.skill[game.players[i].hiddenSkills[j]]){
							game.players[i].hiddenSkills.splice(j--,1);
						}
					}
					for(var j=0;j<game.players[i].hiddenSkills.length;j++){
						game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j],true);
					}
				}
				game.broadcastAll(function(result){
					for(var i in result){
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i][0],result[i][1],false);
						}
					}
					for(var i=0;i<game.players.length;i++){
						game.players[i].classList.add('unseen');
						game.players[i].classList.add('unseen2');
						if(game.players[i]!=game.me){
							game.players[i].node.identity.firstChild.innerHTML='猜';
							game.players[i].node.identity.dataset.color='unknown';
							game.players[i].node.identity.classList.add('guessing');
						}
						game.players[i].group='unknown';
						game.players[i].sex='unknown';
						game.players[i].name1=game.players[i].name;
						game.players[i].name='unknown';
						game.players[i].identity='unknown';
						game.players[i].node.name.show();
						game.players[i].node.name2.show();
						game.players[i]._group=lib.character[game.players[i].name1][1];
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				},result);
			});
		}
	},
	ui:{
		click:{
			// identity:function(){
			// 	if(this.touched) {this.touched=false;return;}
			// 	_status.clicked=true;
			// 	if(this.parentNode.isUnseen()&&this.parentNode!=game.me){
			// 		switch(this.firstChild.innerHTML){
			// 			case '魏':this.firstChild.innerHTML='蜀';this.dataset.color='shu';break;
			// 			case '蜀':this.firstChild.innerHTML='吴';this.dataset.color='wu';break;
			// 			case '吴':this.firstChild.innerHTML='群';this.dataset.color='qun';break;
			// 			case '群':this.firstChild.innerHTML='野';this.dataset.color='ye';break;
			// 			case '野':this.firstChild.innerHTML='猜';this.dataset.color='unknown';break;
			// 			default:this.firstChild.innerHTML='魏';this.dataset.color='wei';break;
			// 		}
			// 	}
			// }
		}
	},
	translate:{
		ye:'野',
		ye2:'野心家',
		wei2:'魏国',
		shu2:'蜀国',
		wu2:'吴国',
		qun2:'群雄',
		unknown:'无名氏',
		unknown0:'一号位',
		unknown1:'二号位',
		unknown2:'三号位',
		unknown3:'四号位',
		unknown4:'五号位',
		unknown5:'六号位',
		unknown6:'七号位',
		unknown7:'八号位',
		bumingzhi:'不明置',
		mingzhizhujiang:'明置主将',
		mingzhifujiang:'明置副将',
		tongshimingzhi:'同时明置',
		mode_guozhan_character_config:'国战武将',

		gzmingshi:'名士',
		gzmingshi_info:'锁定技，当你受到伤害时，若伤害来源有暗置的武将牌，此伤害-1',
		chuanxin:'锋矢',
		chuanxin_info:'阵法技，在同一个围攻关系中，若你是围攻角色，则你或另一名围攻角色使用【杀】指定被围攻角色为目标后，可令该角色弃置装备区里的一张牌',
		fengshi:'穿心',
		fengshi_info:'当你于出牌阶段内使用【杀】或【决斗】对目标角色造成伤害时，若其与你势力不同且有副将，你可以防止此伤害。若如此做，该角色选择一项：1.弃置装备区里的所有牌，若如此做，其失去1点体力；2.移除副将',
		baoling:'暴凌',
		baoling_info:'主将技，锁定技，出牌阶段结束时，若你有副将，则你移除副将，然后加3点体力上限，回复3点体力，并获得“崩坏”',
		yingyang:'鹰扬',
		yingyang_info:'当你拼点的牌亮出后，你可以令此牌的点数+3或-3',
		hunshang:'魂殇',
		hunshang_info:'副将技，此武将牌减少半个阴阳鱼；准备阶段，若你的体力值为1，则你本回合获得“英姿”和“英魂”',
		gzguixiu:'闺秀',
		gzguixiu_info:'当你明置此武将牌时，你可以摸两张牌；当你移除此武将牌时，你可以回复1点体力',
		gzcunsi:'存嗣',
		gzcunsi_info:'出牌阶段，你可以移除此武将牌并选择一名角色，然后其获得技能“勇决”（若与你势力相同的一名角色于其回合内使用的第一张牌为【杀】，则该角色可以在此【杀】结算完成后获得之），若你没有获得“勇决”，则获得“勇决”的角色摸两张牌',
		hengjiang:'横江',
		hengjiang_info:'当你受到1点伤害后，你可以令当前回合角色本回合的手牌上限-1。然后若其弃牌阶段内没有弃牌，则你摸一张牌',
		gzqianxi:'潜袭',
		gzqianxi_info:'准备阶段开始时，你可以进行判定，然后你选择距离为1的一名角色，直到回合结束，该角色不能使用或打出与结果颜色相同的手牌',
		gzshangyi:'尚义',
		gzshangyi_info:'出牌阶段限一次，你可以令一名其他角色观看你的手牌。若如此做，你选择一项：1.观看其手牌并可以弃置其中的一张黑色牌；2.观看其所有暗置的武将牌',
		niaoxiang:'鸟翔',
		niaoxiang_info:'阵法技，在同一个围攻关系中，若你是围攻角色，则你或另一名围攻角色使用【杀】指定被围攻角色为目标后，你令该角色需依次使用两张【闪】才能抵消',
		yicheng:'疑城',
		yicheng_info:'当与你势力相同的一名角色成为【杀】的目标后，你可以令该角色摸一张牌然后弃置一张牌',
		yizhi:'遗志',
		yizhi_info:'副将技，此武将牌上单独的阴阳鱼个数-1。若你的主将拥有技能“观星”，则将其描述中的X改为5；若你的主将没有技能“观星”，则你拥有技能“观星”',
		tianfu:'天覆',
		tianfu_info:'主将技，阵法技，若当前回合角色与你处于同一队列，你拥有技能“看破”',
		ziliang:'资粮',
		ziliang_info:'副将技，当与你势力相同的一名角色受到伤害后，你可以将一张“田”交给该角色',
		gzjixi:'急袭',
		gzjixi_info:'主将技，此武将牌减少半个阴阳鱼；你可以将一张“田”当【顺手牵羊】使用',
		huyuan:'护援',
		huyuan_info:'结束阶段开始时，你可以将一张装备牌置入一名角色的装备区。若如此做，你弃置该角色距离为1的一名角色的一张牌',
		heyi:'鹤翼',
		heyi_info:'阵法技，与你处于同一队列的其他角色防御距离+1',
		gz_shibing1wei:'魏兵',
		gz_shibing2wei:'魏兵',
		gz_shibing1shu:'蜀兵',
		gz_shibing2shu:'蜀兵',
		gz_shibing1wu:'吴兵',
		gz_shibing2wu:'吴兵',
		gz_shibing1qun:'群兵',
		gz_shibing2qun:'群兵',
		shuangren:'双刃',
		shuangren_info:'出牌阶段开始时，你可以与一名角色拼点。若你赢，你视为对其或与其势力相同的另一名角色使用一张【杀】（此【杀】不计入限制的次数）；若你没赢，你结束出牌阶段',
		gzduanchang:'断肠',
		gzduanchang_info:'锁定技，当你死亡时，你令杀死你的角色失去一张武将牌的所有技能',
		gzweimu:'帷幕',
		gzweimu_info:'锁定技，当你成为黑色锦囊牌的目标时，则取消之',
		gzkongcheng:'空城',
		gzkongcheng_info:'锁定技，当你成为【杀】或【决斗】的目标时，若你没有手牌，则取消之',
		gzxiaoji:'枭姬',
		gzxiaoji_info:'当你失去装备区里的牌后，你可以摸两张牌',
		gzrende:'仁德',
		gzrende_info:'出牌阶段，你可以将任意张手牌交给其他角色，然后若你于此阶段内给出第三张“仁德”牌时，你回复1点体力',
		gzzhiheng:'制衡',
		gzzhiheng_info:'出牌阶段限一次，你可以弃置至多X张牌（X为你的体力上限），然后摸等量的牌',
		huoshui:'祸水',
		huoshui_info:'出牌阶段，你可以明置此武将牌;你的回合内，若此武将牌处于明置状态，其他角色不能明置其武将牌',
		qingcheng:'倾城',
		qingcheng_info:'出牌阶段，你可以弃置一张装备牌并选择一名两张武将牌均明置的其他角色，你暗置其一张武将牌',
		duoshi:'度势',
		duoshi_info:'出牌阶段限四次，你可以将一张红色手牌当【以逸待劳】使用。',
		gzxiaoguo:'骁果',
		gzxiaoguo_info:'其他角色的结束阶段开始时，你可以弃置一张基本牌，令该角色选择一项：1.弃置一张装备牌；2.受到你对其造成的1点伤害。',
	},
	guozhanPile:[
		["spade",7,"sha"],
		["spade",8,"sha"],
		["spade",8,"sha"],
		["spade",9,"sha"],
		["spade",9,"sha"],
		["spade",10,"sha"],
		["spade",10,"sha"],
		["club",2,"sha"],
		["club",3,"sha"],
		["club",4,"sha"],
		["club",5,"sha"],
		["club",6,"sha"],
		["club",7,"sha"],
		["club",8,"sha"],
		["club",8,"sha"],
		["club",9,"sha"],
		["club",9,"sha"],
		["club",10,"sha"],
		["club",10,"sha"],
		["club",11,"sha"],
		["club",11,"sha"],
		["heart",10,"sha"],
		["heart",10,"sha"],
		["heart",11,"sha"],
		["diamond",6,"sha"],
		["diamond",7,"sha"],
		["diamond",8,"sha"],
		["diamond",9,"sha"],
		["diamond",10,"sha"],
		["diamond",13,"sha"],
		["heart",2,"shan"],
		["heart",2,"shan"],
		["heart",13,"shan"],
		["diamond",2,"shan"],
		["diamond",2,"shan"],
		["diamond",3,"shan"],
		["diamond",4,"shan"],
		["diamond",5,"shan"],
		["diamond",6,"shan"],
		["diamond",7,"shan"],
		["diamond",8,"shan"],
		["diamond",9,"shan"],
		["diamond",10,"shan"],
		["diamond",11,"shan"],
		["diamond",11,"shan"],
		["heart",3,"tao"],
		["heart",4,"tao"],
		["heart",6,"tao"],
		["heart",7,"tao"],
		["heart",8,"tao"],
		["heart",9,"tao"],
		["heart",12,"tao"],
		["diamond",12,"tao"],

		["spade",2,"bagua"],
		["club",2,"bagua"],
		["spade",5,"jueying"],
		["club",5,"dilu"],
		["heart",13,"zhuahuang"],
		["heart",5,"chitu"],
		["spade",13,"dawan"],
		["diamond",13,"zixin"],
		["club",1,"zhuge"],
		["diamond",1,"zhuge"],
		["spade",2,"cixiong"],
		["spade",6,"qinggang"],
		["spade",5,"qinglong"],
		["spade",12,"zhangba"],
		["diamond",5,"guanshi"],
		["diamond",12,"fangtian"],
		["heart",5,"qilin"],

		["heart",3,"wugu"],
		["heart",4,"wugu"],
		["heart",1,"taoyuan"],
		["spade",7,"nanman"],
		["spade",13,"nanman"],
		["club",7,"nanman"],
		["heart",1,"wanjian"],
		["spade",1,"juedou"],
		["club",1,"juedou"],
		["diamond",1,"juedou"],
		["heart",7,"wuzhong"],
		["heart",8,"wuzhong"],
		["heart",9,"wuzhong"],
		["heart",11,"wuzhong"],
		["spade",3,'shunshou'],
		["spade",4,'shunshou'],
		["spade",11,'shunshou'],
		["diamond",3,'shunshou'],
		["diamond",4,'shunshou'],
		["spade",3,'guohe'],
		["spade",4,'guohe'],
		["spade",12,'guohe'],
		["club",3,'guohe'],
		["club",4,'guohe'],
		["heart",12,'guohe'],
		["club",12,'jiedao'],
		["club",13,'jiedao'],
		["spade",11,'wuxie'],
		["club",12,'wuxie'],
		["club",13,'wuxie'],
		["spade",6,'lebu'],
		["club",6,'lebu'],
		["heart",6,'lebu'],
		["spade",1,'shandian','thunder'],
		["spade",2,'hanbing'],
		["club",2,'renwang'],
		["heart",12,'shandian','thunder'],
		["diamond",12,'wuxie'],

		['heart',9,'yuanjiao'],
		['club',3,'zhibi'],
		['club',4,'zhibi'],
		['diamond',4,'yiyi'],
		['heart',11,'yiyi'],
		['diamond',6,'wuliu'],
		['diamond',12,'sanjian'],
		['heart',3,'jingfanma'],
		["spade",4,'shunshou'],
		["spade",12,'guohe'],
		["spade",11,'wuxie'],
		['spade',3,'huoshaolianying','fire'],
		['club',11,'huoshaolianying','fire'],
		['heart',12,'huoshaolianying','fire'],
		['club',2,'huxinjing'],
		['heart',2,'diaohulishan'],
		['diamond',10,'diaohulishan'],
		['heart',1,'lianjunshengyan'],
		['club',3,'chiling'],
		['spade',12,'lulitongxin'],
		['club',10,'lulitongxin'],
		['club',12,'shuiyanqijunx'],
		['heart',13,'shuiyanqijunx'],
		['spade',1,'xietianzi'],
		['diamond',1,'xietianzi'],
		['diamond',4,'xietianzi'],
		['club',1,'yuxi'],
	],
	element:{
		content:{
			zhulian:function(){
				"step 0"
				player.popup('珠联璧合');
				game.log(player,'发动了【珠联璧合】');
				if(player.hp==player.maxHp){
					player.draw(2);
					event.finish();
				}
				else{
					player.chooseControl('draw_card','recover_hp',function(){
						if(player.hp>=2||player.hp>=player.maxHp-1) return 'draw_card';
						if(player.hp==2&&player.num('h')==0) return 'draw_card';
						return 'recover_hp';
					},ui.create.dialog('hidden','珠联璧合：选择一项奖励'));
				}
				"step 1"
				if(result.control=='draw_card'){
					player.draw(2);
				}
				else{
					player.recover();
				}
			}
		},
		player:{
			getModeState:function(){
				return {
					unseen:this.classList.contains('unseen'),
					unseen2:this.classList.contains('unseen2'),
				}
			},
			setModeState:function(info){
				if(info.mode.unseen) this.classList.add('unseen');
				if(info.mode.unseen2) this.classList.add('unseen2');
				if(!info.name) return;
				// if(info.name.indexOf('unknown')==0){
				// 	if(this==game.me){
				// 		lib.translate[info.name]+='（你）';
				// 	}
				// }
				this.init(info.name1,info.name2,false);
				this.name1=info.name1;
				this.name=info.name;
				this.node.name_seat=ui.create.div('.name.name_seat',get.verticalStr(lib.translate[this.name].slice(0,3)),this);
				if(info.identityShown){
					this.setIdentity(info.identity);
					this.node.identity.classList.remove('guessing');
				}
				else if(this!=game.me){
					this.node.identity.firstChild.innerHTML='猜';
					this.node.identity.dataset.color='unknown';
					this.node.identity.classList.add('guessing');
				}
			},
			dieAfter:function(source){
				this.showCharacter(2);
				if(source&&source.identity!='unknown'){
					if(this.identity=='ye') source.draw(1);
					else if(this.identity!=source.identity) source.draw(get.population(this.identity)+1);
					else source.discard(source.get('he'));
				}
				game.tryResult();
			},
			isUnseen:function(num){
				switch(num){
					case 0:return this.classList.contains('unseen');
					case 1:return this.classList.contains('unseen2');
					case 2:return this.classList.contains('unseen')||this.classList.contains('unseen2');
					default:return this.classList.contains('unseen')&&this.classList.contains('unseen2');
				}
			},
			checkShow:function(skill){
				var sourceSkill=get.info(skill);
                if(sourceSkill&&sourceSkill.sourceSkill){
					skill=sourceSkill.sourceSkill;
                }
				if(game.expandSkills(this.get('s')).contains(skill)) return false;
				if(lib.skill.global.contains(skill)) return false;
				if(this.classList.contains('unseen')){
					var skills=game.expandSkills(lib.character[this.name1][3].slice(0));
					if(skills.contains(skill)){
						this.showCharacter(0);
						return true;
					}
				}
				if(this.classList.contains('unseen2')){
					var skills=game.expandSkills(lib.character[this.name2][3].slice(0));
					if(skills.contains(skill)){
						this.showCharacter(1);
						return true;
					}
				}
				return false;
			},
			hasViceSkill:function(skill){
				return game.expandSkills(lib.character[this.name2][3].slice(0)).contains(skill);
			},
			hasMainSkill:function(skill){
				return game.expandSkills(lib.character[this.name1][3].slice(0)).contains(skill);
			},
			removeMaxHp:function(){
				if(game.online) return;
				if(typeof this.singleHp=='boolean'){
					if(this.singleHp){
						this.singleHp=false;
					}
					else{
						this.singleHp=true;
						this.maxHp--;
					}
				}
				else{
					this.maxHp--;
				}
			},
			hideCharacter:function(num,log){
				if(this.classList.contains('unseen')||this.classList.contains('unseen2')){
					return;
				}
				game.addVideo('hideCharacter',this,num);
				var skills;
				switch(num){
					case 0:
					if(log!==false) game.log(this,'暗置了主将'+get.translation(this.name1));
					skills=lib.character[this.name][3];
					this.name=this.name2;
					this.sex=lib.character[this.name2][0];
					this.classList.add('unseen');
					break;
					case 1:
					if(log!==false) game.log(this,'暗置了副将'+get.translation(this.name2));
					skills=lib.character[this.name2][3];
					this.classList.add('unseen2');
					break;
				}
				game.broadcast(function(player,name,sex,num,skills){
					player.name=name;
					player.sex=sex;
					switch(num){
						case 0:player.classList.add('unseen');break;
						case 1:player.classList.add('unseen2');break;
					}
					for(var i=0;i<skills.length;i++){
						if(!player.skills.contains(skills[i])) continue;
						player.hiddenSkills.add(skills[i]);
						player.skills.remove(skills[i]);
					}
				},this,this.name,this.sex,num,skills);
				for(var i=0;i<skills.length;i++){
					if(!this.skills.contains(skills[i])) continue;
					this.hiddenSkills.add(skills[i]);
					var info=get.info(skills[i]);
					if(info.ondisable&&info.onremove){
						info.onremove(this);
					}
					this.skills.remove(skills[i]);
				}
				this.checkConflict();
			},
			removeCharacter:function(num){
				var info=lib.character[this['name'+(num+1)]];
				if(!info) return;
				game.broadcastAll(function(player,to,num){
					var name=player['name'+(num+1)];
					game.log(player,'移除了'+(num?'副将':'主将'),'#b'+get.translation(name));
					player.reinit(name,to,false);
					if(!game.online){
						player.showCharacter(num,false);
					}
				},this,'gz_shibing'+(info[0]=='male'?1:2)+info[1],num);
			},
			showCharacter:function(num,log){
				if(num==0&&!this.classList.contains('unseen')){
					return;
				}
				if(num==1&&!this.classList.contains('unseen2')){
					return;
				}
				if(!this.classList.contains('unseen')&&!this.classList.contains('unseen2')){
					return;
				}
				game.addVideo('showCharacter',this,num);
				if(this.identity=='unknown'){
					this.group=lib.character[this.name1][1];
					// this.node.identity.style.backgroundColor=get.translation(this.group+'Color');
					if(get.totalPopulation(this.group)+1>get.population()/2) this.identity='ye';
					else this.identity=this.group;
					// this.node.identity.dataset.color=this.identity;
					this.setIdentity(this.identity);
					this.ai.shown=1;
					this.node.identity.classList.remove('guessing');

					if(_status.clickingidentity&&_status.clickingidentity[0]==this){
						for(var i=0;i<_status.clickingidentity[1].length;i++){
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform='';
						}
						delete _status.clickingidentity;
					}
					game.addVideo('setIdentity',this,this.identity);
				}
				var skills;
				switch(num){
					case 0:
					if(log!==false) game.log(this,'展示了主将','#b'+get.translation(this.name1));
					this.name=this.name1;
					skills=lib.character[this.name][3];
					this.sex=lib.character[this.name][0];
					this.classList.remove('unseen');
					break;
					case 1:
					if(log!==false) game.log(this,'展示了副将','#b'+get.translation(this.name2));
					skills=lib.character[this.name2][3];
					if(this.sex=='unknown') this.sex=lib.character[this.name2][0];
					if(this.name.indexOf('unknown')==0) this.name=this.name2;
					this.classList.remove('unseen2');
					break;
					case 2:
					if(log!==false) game.log(this,'展示了主将','#b'+get.translation(this.name1)+'、副将','#b'+get.translation(this.name2));
					this.name=this.name1;
					skills=lib.character[this.name][3].concat(lib.character[this.name2][3]);
					this.sex=lib.character[this.name][0];
					this.classList.remove('unseen');
					this.classList.remove('unseen2');
					break;
				}
				game.broadcast(function(player,name,sex,num,identity){
					player.identityShown=true;
					player.name=name;
					player.sex=sex;
					player.node.identity.classList.remove('guessing');
					switch(num){
						case 0:player.classList.remove('unseen');break;
						case 1:player.classList.remove('unseen2');break;
						case 2:player.classList.remove('unseen');player.classList.remove('unseen2');break;
					}
					player.ai.shown=1;
					player.identity=identity;
					player.setIdentity(identity);
					if(_status.clickingidentity&&_status.clickingidentity[0]==player){
						for(var i=0;i<_status.clickingidentity[1].length;i++){
							_status.clickingidentity[1][i].delete();
							_status.clickingidentity[1][i].style.transform='';
						}
						delete _status.clickingidentity;
					}
				},this,this.name,this.sex,num,this.identity);
				this.identityShown=true;
				var initdraw=parseInt(get.config('initshow_draw'));
				if(!_status.initshown&&!_status.overing&&initdraw&&this.isAlive()&&_status.mode!='mingjiang'){
					this.popup('首亮');
					game.log(this,'首先明置武将，得到奖励');
					game.log(this,'摸了'+get.cnNumber(initdraw)+'张牌');
					this.draw(initdraw).log=false;
					_status.initshown=true;
				}
				for(var i=0;i<skills.length;i++){
					this.hiddenSkills.remove(skills[i]);
					this.addSkill(skills[i]);
				}
				this.checkConflict();
				if(!this.classList.contains('unseen')&&!this.classList.contains('unseen2')&&!this._mingzhied){
					this._mingzhied=true;
					if(this.singleHp){
						this.doubleDraw();
					}
					if(this.perfectPair()){
						var next=game.createEvent('guozhanDraw');
						next.player=this;
						next.setContent('zhulian');
					}
				}
			},
			perfectPair:function(){
				if(!get.config('zhulian')) return false;
				var name1=this.name1;
				var name2=this.name2;
				if(lib.character[name1][1]!=lib.character[name2][1]) return false;
				var list=['re','diy','sp','jsp','shen','jg','xin'];
				for(var i=0;i<list.length;i++){
					if(name1.indexOf(list[i]+'_')==0){
						name1=name1.slice(list[i].length+1);
					}
					if(name2.indexOf(list[i]+'_')==0){
						name2=name2.slice(list[i].length+1);
					}
				}
				if(lib.perfectPair[name1]&&lib.perfectPair[name1].contains(name2)){
					return true;
				}
				if(lib.perfectPair[name2]&&lib.perfectPair[name2].contains(name1)){
					return true;
				}
				return false;
			},
			siege:function(player){
				if(this.identity=='unknown'||this.identity=='ye'||this.hasSkill('undist')) return false;
				if(!player){
					var next=this.getNext();
					if(next&&next.sieged()) return true;
					var previous=this.getPrevious();
					if(previous&&previous.sieged()) return true;
					return false;
				}
				else{
					return player.sieged()&&(player.getNext()==this||player.getPrevious()==this);
				}
			},
			sieged:function(){
				if(this.identity=='unknown') return false;
				var next=this.getNext();
				var previous=this.getPrevious();
				if(next&&previous&&next!=previous){
					if(next.identity=='unknown'||next.identity=='ye'||next.identity==this.identity) return false;
					return next.identity==previous.identity;
				}
				return false;
			},
			inline:function(){
				if(this.identity=='unknown'||this.identity=='ye'||this.hasSkill('undist')) return false;
				var next=this,previous=this;
				var list=[];
				for(var i=0;next||previous;i++){
					if(next){
						next=next.getNext();
						if(next.identity!=this.identity||next==this){
							next=null;
						}
						else{
							list.add(next);
						}
					}
					if(previous){
						previous=previous.getPrevious();
						if(previous.identity!=this.identity||previous==this){
							previous=null;
						}
						else{
							list.add(previous);
						}
					}
				}
				if(!list.length) return false;
				for(var i=0;i<arguments.length;i++){
					if(!list.contains(arguments[i])) return false;
				}
				return true;
			},
			isMajor:function(){
				if(!lib.group.contains(this.identity)) return false;
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].getEquip('yuxi')){
						if(game.players[i].identity!='ye'&&game.players[i].identity!='unknown'){
							list.add(game.players[i].identity);
						}
					}
				}
				if(list.length){
					return list.contains(this.identity);
				}
				var max=0;
				for(var i=0;i<lib.group.length;i++){
					max=Math.max(max,get.population(lib.group[i]));
				}
				if(max<=1) return false;
				return get.population(this.identity)==max;
			},
			isNotMajor:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMajor()){
						return !this.isMajor();
					}
				}
				return false;
			},
			isMinor:function(){
				if(this.identity=='unknown') return false;
				if(!lib.group.contains(this.identity)) return true;
				var min=game.players.length;
				for(var i=0;i<lib.group.length;i++){
					var num=get.population(lib.group[i]);
					if(num>0){
						min=Math.min(min,num);
					}
				}
				return get.population(this.identity)==min;
			},
			logAi:function(targets,card){
				if(this.ai.shown==1||this.isMad()) return;
				if(typeof targets=='number'){
					this.ai.shown+=targets;
				}
				else{
					var effect=0,c,shown;
					var info=get.info(card);
					if(info.ai&&info.ai.expose){
						if(_status.event.name=='_wuxie'){
							if(_status.event.source&&_status.event.source.ai.shown){
								this.ai.shown+=0.2;
							}
						}
						else{
							this.ai.shown+=info.ai.expose;
						}
					}
					if(targets.length>0){
						for(var i=0;i<targets.length;i++){
							shown=Math.abs(targets[i].ai.shown);
							if(shown<0.2||targets[i].identity=='nei') c=0;
							else if(shown<0.4) c=0.5;
							else if(shown<0.6) c=0.8;
							else c=1;
							effect+=ai.get.effect(targets[i],card,this)*c;
						}
					}
					if(effect>0){
						if(effect<1) c=0.5;
						else c=1;
						if(targets.length==1&&targets[0]==this);
						else if(targets.length==1) this.ai.shown+=0.2*c;
						else this.ai.shown+=0.1*c;
					}
				}
				if(this.ai.shown>0.95) this.ai.shown=0.95;
				if(this.ai.shown<-0.5) this.ai.shown=-0.5;
			},
		}
	},
	ai:{
		get:{
			realAttitude:function(from,toidentity,difficulty){
				if(from.identity==toidentity&&toidentity!='ye'){
					return 4+difficulty;
				}
				if(from.identity=='unknown'&&lib.character[from.name1][1]==toidentity){
					if(get.totalPopulation(toidentity)+1<=get.population()/2) return 4+difficulty;
				}
				var groups=[];
				for(var i=0;i<lib.group.length;i++){
					groups.push(get.population(lib.group[i]));
				}
				var max=Math.max.apply(this,groups);
				if(max<=1) return -3;
				var from_p=get.population(from.identity!='unknown'?from.identity:lib.character[from.name1][1]);
				var to_p=get.population(toidentity);
				if(from.identity=='ye') from_p=1;
				if(toidentity=='ye') to_p=1;

				if(to_p==max) return -5;
				if(from_p==max) return -2-get.population(toidentity);
				if(max>=game.players.length/2){
					if(to_p<=from_p){
						return 0.5;
					}
					return 0;
				}
				if(to_p<max-1) return 0;
				return -0.5;
			},
			rawAttitude:function(from,to){
				if(to.identity=='unknown'&&game.players.length==2) return -5;
				if(_status.currentPhase==from&&from.ai.tempIgnore&&
					from.ai.tempIgnore.contains(to)&&to.identity=='unknown'&&
					(!from.storage.zhibi||!from.storage.zhibi.contains(to))) return 0;
				var difficulty=0;
				if(to==game.me) difficulty=(2-get.difficulty())*1.5;
				if(from==to) return 5+difficulty;
				if(from.identity==to.identity&&from.identity!='unknown'&&from.identity!='ye') return 5+difficulty;
				if(from.identity=='unknown'&&lib.character[from.name1][1]==to.identity){
					if(get.totalPopulation(to.identity)+1<=get.population()/2) return 4+difficulty;
				}
				var toidentity=to.identity;
				if(toidentity=='unknown'){
					toidentity=lib.character[to.name1][1];
					if(get.population(toidentity)>=get.population()-2){
						toidentity='ye';
					}
				}
				var att=ai.get.realAttitude(from,toidentity,difficulty);
				if(from.storage.zhibi&&from.storage.zhibi.contains(to)){
					return att;
				}
				if(to.ai.shown>=0.5) return att*to.ai.shown;

				var nshown=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=from&&game.players[i].identity=='unknown'){
						nshown++;
					}
				}
				if(to.ai.shown==0){
					if(nshown>=game.players.length/2&&att>=0){
						return 0;
					}
					return Math.min(0,Math.random()-0.5)+difficulty;
				}
				if(to.ai.shown>=0.2){
					if(att>2){
						return Math.max(0,Math.random()-0.5)+difficulty;
					}
					if(att>=0){
						return 0;
					}
					return Math.min(0,Math.random()-0.7)+difficulty;
				}
				if(att>2){
					return Math.max(0,Math.random()-0.7)+difficulty;
				}
				if(att>=0){
					return Math.min(0,Math.random()-0.3)+difficulty;
				}
				return Math.min(0,Math.random()-0.5)+difficulty;

			},
		}
	},
}
