character.diy={
	character:{
		// diy_caocao:['male','wei',4,['xicai','diyjianxiong','hujia']],
		// diy_hanlong:['male','wei',4,['siji','ciqiu']],
		diy_feishi:['male','shu',3,['shuaiyan','moshou']],
		diy_liuyan:['male','shu',3,['juedao','geju']],
		// diy_luxun:['male','wu',3,['shaoying','zonghuo']],
		diy_yuji:['male','qun',3,['diyguhuo','diychanyuan']],
		// diy_zhouyu:['male','wu',3,['jieyan','honglian']],
		diy_zhouyu:['male','wu',3,['xiongzi','yaliang']],
		diy_caiwenji:['female','qun',3,['beige','guihan']],
		diy_lukang:['male','wu',4,['luweiyan','qianxun']],
		diy_xuhuang:['male','wei',4,['diyduanliang']],
		diy_dianwei:['male','wei',4,['diyqiangxi']],
		diy_huangzhong:['male','shu',4,['liegong','fuli']],
		diy_weiyan:['male','shu',4,['diykuanggu']],
		diy_zhenji:['female','wei',3,['jiaoxia','yiesheng']],
		// diy_menghuo:['male','shu',4,['huoshou','zaiqix']],
		re_huangyueying:['female','shu',3,['rejizhi','qicai']],
		old_zhonghui:['male','wei',3,['zzhenggong','zquanji','zbaijiang']],
	},
	skill:{
		zaiqix:{
			trigger:{player:'phaseDrawBefore'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			check:function(event,player){
				if(1+player.maxHp-player.hp<2){
					return false;
				}
				else if(1+player.maxHp-player.hp==2){
					return player.num('h')>=2;
				}
				return true;
			},
			content:function(){
				"step 0"
				trigger.untrigger();
				trigger.finish();
				event.cards=get.cards(player.maxHp-player.hp+1);
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
		batu:{
			trigger:{player:'phaseEnd'},
			frequent:true,
			filter:function(event,player){
				var num=0;
				var list=['wei','shu','wu','qun'];
				for(var i=0;i<game.players.length&&list.length;i++){
					if(list.contains(game.players[i].group)){
						list.remove(game.players[i].group);
						num++;
					}
				}
				return player.num('h')<num;
			},
			content:function(){
				var num=0;
				var list=['wei','shu','wu','qun'];
				for(var i=0;i<game.players.length&&list.length;i++){
					if(list.contains(game.players[i].group)){
						list.remove(game.players[i].group);
						num++;
					}
				}
				player.draw(num-player.num('h'));
			},
			ai:{
				threaten:1.3
			}
		},
		diyzaiqi:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				trigger.num+=player.maxHp-player.hp;
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 2.5;
					if(target.hp==2) return 1.8;
					return 0.5;
				},
				maixie:true,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(target.hp==target.maxHp) return [0,1];
						}
						if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
					}
				}
			}
		},
		diykuanggu:{
			trigger:{source:'damageEnd'},
			forced:true,
			content:function(){
				if(get.distance(trigger.player,player,'attack')>1){
					player.draw(trigger.num);
				}
				else{
					player.recover(trigger.num);
				}
			}
		},
		diyduanliang:{
			group:['diyduanliang1','diyduanliang2'],
			ai:{
				threaten:1.2
			}
		},
		diyduanliang1:{
			enable:'phaseUse',
			usable:1,
			discard:false,
			filter:function(event,player){
				var cards=player.get('he',{color:'black'});
				for(var i=0;i<cards.length;i++){
					var type=get.type(cards[i]);
					if(type=='basic') return true;
				}
				return false;
			},
			prepare:function(cards,player,targets){
				player.$throw(cards);
			},
			position:'he',
			filterCard:function(card){
				if(get.color(card)!='black') return false;
				var type=get.type(card);
				return type=='basic';
			},
			filterTarget:function(card,player,target){
				return lib.filter.filterTarget({name:'bingliang'},player,target);
			},
			check:function(card){
				return 7-ai.get.value(card);
			},
			content:function(){
				player.useCard({name:'bingliang'},target,cards).animate=false;
				player.draw();
			},
			ai:{
				result:{
					target:function(player,target){
						return ai.get.effect(target,{name:'bingliang'},player,target);
					}
				},
				order:9,
			}
		},
		diyduanliang2:{
			mod:{
				targetInRange:function(card,player,target){
					if(card.name=='bingliang'){
						if(get.distance(player,target)<=2) return true;
					}
				}
			}
		},
		guihan:{
			unique:true,
			enable:'chooseToUse',
			mark:true,
			skillAnimation:'epic',
			init:function(player){
				player.storage.guihan=false;
			},
			filter:function(event,player){
				if(event.type!='dying') return false;
				if(player!=_status.dying) return false;
				if(player.storage.guihan) return false;
				return true;
			},
			filterTarget:function(card,player,target){
				return target.sex=='male'&&player!=target;
			},
			content:function(){
				"step 0"
				player.unmarkSkill('guihan');
				player.recover();
				player.storage.guihan=true;
				"step 1"
				player.draw(2);
				"step 2"
				target.recover();
				"step 3"
				target.draw(2);
				// if(lib.config.mode=='identity'){
				// 	player.node.identity.style.backgroundColor=get.translation('weiColor');
				// 	player.group='wei';
				// }
			},
			ai:{
				skillTagFilter:function(player){
					if(player.storage.guihan) return false;
					if(player.hp>0) return false;
				},
				save:true,
				result:{
					player:4,
					target:function(player,target){
						if(target.hp==target.maxHp) return 2;
						return 4;
					}
				},
				threaten:function(player,target){
					if(!target.storage.guihan) return 0.8;
				}
			},
			intro:{
				content:'limited'
			}
		},
		luweiyan:{
			enable:'chooseToUse',
			filterCard:{type:'equip'},
			position:'he',
			viewAs:{name:'shuiyanqijun'},
			prompt:'将一张装备牌当水淹七军使用',
			check:function(card){return 8-ai.get.equipValue(card)},
		},
		yaliang:{
			inherit:'wangxi'
		},
		xiongzi:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=1+Math.floor(player.num('e')/2);
			}
		},
		honglian:{
			trigger:{player:'damageEnd'},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<0;
			},
			filter:function(event,player){
				return event.source&&event.source!=player&&event.source.num('he',{color:'red'})>0;
			},
			content:function(){
				trigger.source.discard(trigger.source.get('he',{color:'red'}));
			},
			ai:{
				expose:0.1,
				result:{
					threaten:0.8,
					target:function(card,player,target){
						if(get.tag(card,'damage')&&ai.get.attitude(target,player)<0){
							return [1,0,0,-player.num('he',{color:'red'})];
						}
					}
				}
			}
		},
		diyguhuo:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return player.num('hej')>0;
			},
			content:function(){
				"step 0"
				player.draw(2);
				"step 1"
				player.chooseToDiscard('hej',2,true);
			},
			ai:{
				effect:{
					target:function(card){
						if(get.type(card)=='delay') return [0,0.5];
					}
				}
			}
		},
		diychanyuan:{
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source!=undefined;
			},
			content:function(){
				trigger.source.loseMaxHp(true);
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 0.2;
				},
				result:{
					target:function(card,player,target,current){
						if(target.hp<=1&&get.tag(card,'damage')){
							if(player.skills.contains('jueqing')) return [1,-5];
							return [1,0,0,-2];
						}
					}
				}
			}
		},
		zonghuo:{
			trigger:{source:'damageBefore'},
			direct:true,
			priority:10,
			filter:function(event){
				return event.nature!='fire';
			},
			content:function(){
				"step 0"
				player.chooseToDiscard('是否发动【纵火】？').ai=function(card){
					var att=ai.get.attitude(player,trigger.player);
					if(trigger.player.hasSkillTag('nofire')){
						if(att>0) return 8-ai.get.value(card);
						return -1;
					}
					if(att<0){
						return 7-ai.get.value(card);
					}
					return -1;
				}
				"step 1"
				if(result.bool){
					player.logSkill('zonghuo',trigger.player,'fire');
					trigger.nature='fire';
				}
			}
		},
		shaoying:{
			trigger:{source:'damageAfter'},
			direct:true,
			filter:function(event){
				return event.nature=='fire';
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【烧营】？',function(card,player,target){
					return get.distance(trigger.player,target)<=1&&trigger.player!=target;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'fire');
				}
				"step 1"
				if(result.bool){
					var card=get.cards()[0];
					ui.discardPile.appendChild(card);
					player.showCards(card);
					event.bool=get.color(card)=='red';
					event.target=result.targets[0];
					player.logSkill('shaoying',event.target,false);
					trigger.player.line(event.target,'fire');
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.bool){
					event.target.damage('fire');
				}
			}
		},
		tiangong:{
			group:['tiangong2'],
			trigger:{player:'damageBefore'},
			filter:function(event){
				if(event.nature=='thunder') return true;
			},
			forced:true,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(card.name=='tiesuo') return 0;
						if(get.tag(card,'thunderDamage')) return 0;
					}
				},
				threaten:0.5
			}
		},
		tiangong2:{
			trigger:{source:'damageAfter'},
			filter:function(event){
				if(event.nature=='thunder') return true;
			},
			forced:true,
			popup:false,
			priority:1,
			content:function(){
				player.draw();
			},
		},
		xicai:{
			inherit:'jianxiong'
		},
		diyjianxiong:{
			mode:['identity'],
			trigger:{global:'dieBefore'},
			forced:true,
			filter:function(event,player){
				return event.player!=game.zhu&&_status.currentPhase==player;
			},
			content:function(){
				trigger.player.identity='fan';
				trigger.player.setIdentity('fan');
				trigger.player.identityShown=true;
			}
		},
		shuaiyan:{
			trigger:{global:'recoverAfter'},
			filter:function(event,player){
				return event.player!=player&&_status.currentPhase!=player;
			},
			content:function(){
				"step 0"
				var att=ai.get.attitude(trigger.player,player);
				var bool=0;
				if(att<0){
					if(trigger.player.num('e')==0&&trigger.player.num('h')>2) bool=1;
					else if(trigger.player.num('he')==0) bool=1;
				}
				else if(att==0&&trigger.player.num('he')==0){
					bool=1;
				}
				trigger.player.chooseControl('draw_card','discard_card').ai=function(){
					return bool;
				};
				"step 1"
				if(result.control=='draw_card'){
					player.draw();
					event.finish();
				}
				else if(trigger.player.num('he')){
					player.discardPlayerCard(trigger.player,true,'he');
				}
				else{
					event.finish();
				}
			},
			ai:{
				threaten:1.2
			}
		},
		moshou:{
			mod:{
				targetEnabled:function(card,player,target,now){
					if(card.name=='bingliang'||card.name=='lebu') return false;
				}
			},
		},
		siji:{
			trigger:{player:'phaseDiscardEnd'},
			frequent:true,
			filter:function(event,player){
				if(event.cards){
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].name=='sha') return true;
					}
				}
				return false;
			},
			content:function(){
				var num=0;
				for(var i=0;i<trigger.cards.length;i++){
					if(trigger.cards[i].name=='sha') num++;
				}
				player.draw(2*num);
			}
		},
		ciqiu:{
			unique:true,
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return event.card&&event.card.name=='sha'&&event.player.hp==event.player.maxHp&&event.notLink();
			},
			content:function(){
				trigger.num++;
				player.addTempSkill('ciqiu3','damageAfter');
			},
			group:['ciqiu2']
		},
		ciqiu2:{
			trigger:{source:'damage'},
			filter:function(event,player){
				return player.skills.contains('ciqiu3')&&event.player.hp<=0;
			},
			forced:true,
			content:function(){
				trigger.player.die(trigger);
				player.removeSkill('ciqiu');
			}
		},
		ciqiu3:{},
		juedao:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.isLinked()==false;
			},
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				if(player.isLinked()==false) player.link();
			},
			ai:{
				order:2,
				result:{
					player:function(player){
						if(player.isLinked()) return 0;
						return 1;
					},
				},
				effect:{
					target:function(card,player,target){
						if(card.name=='tiesuo'){
							if(target.isLinked()){
								return [0,-0.5];
							}
							else{
								return [0,0.5];
							}
						}
					}
				}
			},
			mod:{
				globalFrom:function(from,to,distance){
					if(from.isLinked()) return distance+1;
				},
				globalTo:function(from,to,distance){
					if(to.isLinked()) return distance+1;
				},
			}
		},
		geju:{
			trigger:{player:'phaseBegin'},
			frequent:true,
			filter:function(event,player){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(player!=game.players[i]) list.add(game.players[i].group);
				}
				list.remove('unknown');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player){
						if(lib.filter.targetInRange({name:'sha'},game.players[i],player)){
							list.remove(game.players[i].group);
						}
					}
				}
				return list.length>0;
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(player!=game.players[i]) list.add(game.players[i].group);
				}
				list.remove('unknown');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player){
						if(lib.filter.targetInRange({name:'sha'},game.players[i],player)){
							list.remove(game.players[i].group);
						}
					}
				}
				if(list.length>0) player.draw(list.length);
			}
		},
		diyqiangxi:{
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
				"step 2"
				if(target.isAlive()&&target.num('he')){
					player.discardPlayerCard(target);
				}
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
						if(player.hp<=1) return 0;
						return ai.get.damageEffect(target,player);
					}
				}
			},
			threaten:1.3
		},
	},
	translate:{
		// diy_caocao:'曹操',
		diy_menghuo:'孟获',
		diy_huangzhong:'黄汉升',
		diy_xuhuang:'徐公明',
		diy_dianwei:'新典韦',
		diy_weiyan:'魏文长',
		xicai:'惜才',
		diyjianxiong:'奸雄',
		diy_feishi:'费诗',
		shuaiyan:'率言',
		moshou:'墨守',
		diy_hanlong:'韩龙',
		diy_luxun:'陆伯言',
		diy_yuji:'于吉',
		diy_zhouyu:'周公瑾',
		diy_lukang:'陆抗',
		diy_caiwenji:'蔡昭姬',
		diy_zhenji:'甄宓',
		siji:'伺机',
		ciqiu:'刺酋',
		ciqiu2:'刺酋',
		ciqiu3:'刺酋',
		diy_liuyan:'刘焉',
		juedao:'绝道',
		geju:'割据',
		shaoying:'烧营',
		zonghuo:'纵火',
		diychanyuan:'缠怨',
		diyguhuo:'蛊惑',
		jieyan:'劫焰',
		honglian:'红莲',
		xiongzi:'雄姿',
		yaliang:'雅量',
		yaliang_info:'每当你对其他角色造成1点伤害后，或受到其他角色造成的1点伤害后，你可与该角色各摸一张牌。',
		luweiyan:'围堰',
		guihan:'归汉',
		diyduanliang:'断粮',
		diyduanliang1:'断粮',
		diyduanliang2:'断粮',
		diyqiangxi:'强袭',
		diykuanggu:'狂骨',
		diyzaiqi:'再起',
		batu:'霸图',
		zaiqix:'再起',
		zaiqix_info:'摸牌阶段，若你已受伤，你可以放弃摸牌并展示牌堆顶的X+1张牌，X为你已损失的体力值，其中每有一张♥牌，你回复1点体力，然后弃掉这些♥牌，将其余的牌收入手牌。',
		batu_info:'回合结束阶段，你可以将手牌数补至X，X为现存的势力数',
		diyzaiqi_info:'锁定技，你摸牌阶段额外摸X张牌，X为你已损失的体力值',
		diykuanggu_info:'锁定技，每当你造成一点伤害，你在其攻击范围内，你回复一点体力，否则你摸一张牌',
		diyqiangxi_info:'出牌阶段，你可以自减一点体力或弃一张武器牌，然后你对你攻击范围内的一名角色造成一点伤害并弃置其一张牌，每回合限一次。',
		diyduanliang_info:'出牌阶段限一次，你可以将一张黑色的基本牌当兵粮寸断对一名角色使用，然后摸一张牌。你的兵粮寸断可以指定距离2以内的角色作为目标',
		guihan_info:'限定技，当你进入濒死状态时，可以指定一名男性角色与其各回复一点体力并摸两张牌',
		luweiyan_info:'你可以将一张装备牌当水淹七军使用',
		xiongzi_info:'锁定技，你于摸牌阶段额外摸X+1张牌，X为你装备区牌数的一半，向下取整',
		honglian_info:'每当你受到来自其他角色的伤害，可以弃置伤害来源的所有红色牌',
		jieyan_info:'出牌阶段限一次，你可以弃置一张红色手牌令场上所有角色受到一点火焰伤害',
		diyguhuo_info:'锁定技，回合开始阶段，你摸两张牌，然后弃置区域内的两张牌',
		diychanyuan_info:'锁定技，杀死你的角色失去一点体力上限',
		zonghuo_info:'你可弃置一张牌将你即将造成的伤害变为火焰伤害',
		shaoying_info:'每当你造成一次火焰伤害，可指定距离受伤害角色1以内的另一名角色，并展示牌堆顶的一张牌，若此牌为红色，该角色受到一点火焰伤害',
		juedao_info:'出牌阶段，你可以弃置一张手牌，横置你的武将牌；锁定技，若你处于连环状态，你与其他角色的距离、其他角色与你的距离各+1。',
		geju_info:'准备阶段开始时，你可以摸X张牌（X为攻击范围内不含有你的势力数）。',
		siji_info:'弃牌阶段结束后，你可以摸2X张牌（X为你于此阶段内弃置的【杀】的数量）。',
		ciqiu_info:'锁定技，每当你使用【杀】对目标角色造成伤害时，若该角色未受伤，你令此伤害+1；锁定技，每当未受伤的角色因受到你使用【杀】造成的伤害而扣减体力后，若该角色的体力值为0，你令其死亡，然后你失去“刺酋”。 ',
		shuaiyan_info:'每当其他角色于你的回合外回复体力后，你可以令该角色选择一项：1.令你摸一张牌；2.令你弃置其一张牌。 ',
		moshou_info:'锁定技，你不能成为乐不思蜀和兵粮寸断的目标。',
		xicai_info:'你可以立即获得对你造成伤害的牌',
		diyjianxiong_info:'锁定技，在身份局中，在你回合内死亡的角色均视为反贼，国战中，在你回合内死亡的角色若与你势力相同则随机改为另一个势力',
	},
}
