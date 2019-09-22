'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'tw',
		connect:false,
		characterSort:{},
		character:{
			tw_beimihu:['female','qun',3,['zongkui','guju','baijia','bingzhao'],['zhu']],
			nashime:['male','qun',3,['chijie','waishi','renshe']],
			tw_xiahouba:['male','shu',4,['twyanqin','twbaobian']],
			tw_zumao:['male','wu',4,['twtijin']],
			tw_caoang:['male','wei',4,['twxiaolian']],
			tw_dingfeng:['male','wu',4,['twqijia','twzhulin']],
			tw_caohong:['male','wei',4,['twhuzhu','twliancai']],
			tw_maliang:['male','shu',3,['twrangyi','twbaimei']],
			kaisa:["male","western",4,["zhengfu"]],
		},
		characterIntro:{
			nashime:'难升米（なしめ，或なんしょうまい）是倭国大夫。景初二年六月，受女王卑弥呼之命，与都市牛利出使魏国，被魏国拜为率善中郎将。',
		},
		card:{
		},
		characterFilter:{},
		skill:{
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
					player.give(event.cards,target,true);
					'step 1'
					target.chooseToUse({
						prompt:'请使用得到的一张牌，或者受到来自'+get.translation(player)+'的一点伤害',
						filterCard:function(card,player,event){
							if(!cards.contains(card)) return false;
							return lib.filter.filterCard(card,player,event);
						},
					});
					'step 2'
					if(result.bool){
						var hs=target.getCards('h');
						for(var i=0;i<cards.length;i++){
							if(!hs.contains(cards[i])) cards.splice(i--,1);
						}
						if(cards.length) target.give(cards,player,true);
					}
					else target.damage('nocard');
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
			twbaimei:{
				audio:2,
				trigger:{
					player:"damageBefore",
				},
				forced:true,
				priority:15,
				filter:function (event,player){
					if(player.countCards('h')) return false;
					if(event.nature) return true;
					return get.type(event.card,'trick')=='trick';
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
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
						player.chooseBool('是否令'+get.translation(target)+'回复1点体力？').ai=function(){
							return get.recoverEffect(target,player,player);
						};
					}
					'step 4'
					if(result.bool) target.recover();
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							var eff=(target.isDamaged()&&target.hp<=player.hp)?get.recoverEffect(target,player,player):0;
							if(eff<=0&&!player.countGainableCards(target,'e')) return -1;
							return eff;
						},
					},
				},
			},
			twliancai:{
				audio:2,
				trigger:{player:['turnOverEnd','phaseEnd']},
				filter:function(card,player,target){
					return target=='phaseEnd'||player.countCards('h')<player.hp;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countGainableCards(player,'e')>0;
				},
				check:function(card,player){
					if(card.name=='turnOve') return true;
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
					return card.name=='phase'?'将武将牌翻面，然后获得一名其他角色装备区内的一张牌':'将手牌摸至与体力值相同';
				},
				content:function(){
					'step 0'
					if(event.triggername=='phaseEnd') player.turnOver();
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
				group:'twqijia_alka',
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('e',function(card){
						return !player.storage.twqijia.contains(get.subtype(card));
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&player.canUse({name:'sha'},target);
				},
				position:'e',
				filterCard:function(card,player){
					return !player.storage.twqijia.contains(get.subtype(card));
				},
				content:function(){
					'step 0'
					player.storage.twqijia.push(get.subtype(cards[0]));
					player.useCard({name:'sha'},target,false);
				},
				subSkill:{
					alka:{
						sub:true,
						trigger:{player:['phaseUseBegin','phaseUseEnd']},
						silent:true,
						content:function(){
							player.storage.twqijia=[];
							player.storage.twzhulin=[];
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
			twzhulin:{
				group:'twqijia_alka',
				locked:false,
				mod:{
					globalFrom:function(from,to,distance){
						if(from.storage.twzhulin&&from.storage.twzhulin.contains(to)) return -Infinity;
					}
				},
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',lib.skill.twzhulin.filterCard)>0;
				},
				filterCard:function(card){
					return card.name=='tao'||card.name=='jiu';
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					player.storage.twzhulin.add(target);
					player.markSkill('twzhulin');
				},
				intro:{
					content:function(content,player){
						return '至'+get.translation(content)+'的距离视为1';
					},
				},
			},
			twxiaolian:{
				inherit:'twtijin',
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player!=player&&
					event.targets.length==1&&event.targets[0]!=player;
				},
				content:function(){
					trigger.twxiaolian=trigger.targets[0];
					trigger.targets=[player];
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
						},
						mod:{
							globalTo:function(from,to,distance){
								if(from!=to) return distance+to.storage.twxiaolian_distance.length;
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
							player.chooseCard('是否将一张牌当做【马】置于'+get.translation(target)+'的武将牌旁？','he').ai=function(target){
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
				trigger:{global:'useCard'},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player!=player&&
					event.targets.length==1&&event.targets[0]!=player&&get.distance(event.player,player,'attack')<=1;
				},
				logTarget:'player',
				check:function(event,player){
					return get.effect(event.targets[0],{name:'sha'},event.player,player)<=get.effect(player,{name:'sha'},event.player,player);
				},
				content:function(){
					'step 0'
					trigger.targets=[player];
					var next=game.createEvent('twtijin_discard',null,trigger.getParent());
					next.player=player;
					next.target=trigger.player;
					next.setContent(function(){
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
						player.group=group;
						player.node.name.dataset.nature=get.groupnature(group);
						game.log(player,'将势力变为了','#y'+get.translation(group+2));
					}
				},
			},
			twbaobian:{
				audio:2,
				trigger:{source:'damageBefore'},
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
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					'step 0'
					var choiceList=['令一名其他角色与你各摸一张牌','令自己下个出牌阶段可以多发动一次【外使】'];
					if(lib.skill.chijie.filter({},player)) choiceList.push('将自己的势力变更为场上存在的一个其他势力');
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
						game.asyncDraw([player,result.targets[0]]);
						game.delay();
					}
				},
			},
			waishi:{
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
					return player.storage.waishi>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>=ui.selected.cards.length;
				},
				filterCard:true,
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
					player.storage.waishi--;
					player.lose(cards,ui.special);
					player.gainPlayerCard(target,true,'h',cards.length).chooseonly=true;
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
					var list=[];
					game.countPlayer(function(current){
						if(current.group!=player.group&&current.group!='shen') list.add(current.group);
					});
					if(!event.renshe) list.push('cancel2');
					player.chooseControl(list).set('prompt',event.renshe?'请选择一个势力':get.prompt('chijie')).set('prompt2',event.renshe?'':'将自己的势力变更为场上存在的一个势力').set('',function(){
						return list.randomGet();
					});
					'step 1'
					if(result.control!='cancel2'){
						if(!event.renshe) player.logSkill('chijie');
						var group=result.control;
						player.group=group;
						player.node.name.dataset.nature=get.groupnature(group);
						game.log(player,'将势力变为了','#y'+get.translation(group));
					}
				},
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
			twzhulin:'诛綝',
			twzhulin_info:'出牌阶段，你可以弃置一张【桃】或【酒】并选择一名其他角色。你与其的距离视为1直到此阶段结束。',
			twhuzhu:'护主',
			twhuzhu_info:'出牌阶段限一次，若你的装备区内有牌，则你可以令一名其他角色交给你一张手牌，然后获得你装备区内的一张牌。若其体力值不大于你，则你可以令其回复1点体力。',
			twliancai:'敛财',
			twliancai_info:'结束阶段，你可以将武将牌翻面，然后获得一名其他角色装备区内的一张牌。当你的武将牌翻面时，你可以将手牌补至与体力值相同。',
			twrangyi:'攘夷',
			twrangyi_info:'出牌阶段限一次，你可以将所有手牌交给一名其他角色，然后令其选择一项：1.使用其中的一张牌，然后将其余的牌交还给你。2.受到来自你的1点伤害。',
			twbaimei:'白眉',
			twbaimei_info:'锁定技，若你没有手牌，则防止你受到的所有属性伤害和锦囊牌造成的伤害。',
			chijie:'持节',
			chijie_info:' 游戏开始时，你可以选择一个现存势力，你的势力视为该势力。 ',
			waishi:'外使',
			waishi_info:' 出牌阶段限一次，你可以用至多X张牌交换一名其他角色等量的手牌（X为现存势力数），然后若其与你势力相同或手牌多于你，你摸一张牌。',
			renshe:'忍涉',
			renshe_info:'当你受到伤害后，你可以选择一项：将势力改为现存的另一个势力；或可以额外发动一次“外使”直到你的下个出牌阶段结束；或与另一名其他角色各摸一张牌。',
		}
	};
});
