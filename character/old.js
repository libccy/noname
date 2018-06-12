'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'old',
		character:{
			zhangjiao:['male','qun',3,['leiji','guidao','huangtian'],['zhu']],
			masu:['male','shu',3,['xinzhan','huilei']],
			xushu:['male','shu',3,['wuyan','jujian']],
			fazheng:['male','shu',3,['enyuan','xuanhuo']],
			liru:['male','qun',3,['juece','mieji','fencheng']],
			yujin:['male','wei',4,['yizhong']],
			lusu:['male','wu',3,['haoshi','dimeng']],
			yuanshao:['male','qun',4,['luanji','xueyi'],['zhu']],
			old_zhonghui:['male','wei',3,['zzhenggong','zquanji','zbaijiang']],
			old_xusheng:['male','wu',4,['pojun']],
			old_zhuran:['male','wu',4,['olddanshou']],
			old_lingtong:['male','wu',4,['oldxuanfeng']],
			old_madai:['male','shu',4,['mashu','oldqianxi']],
			old_caoxiu:['male','wei',4,['taoxi']],
			old_huaxiong:['male','qun',6,['shiyong']],
			old_wangyi:['female','wei',3,['oldzhenlie','oldmiji']],
			old_caozhen:['male','wei',4,['sidi']],
			old_quancong:['male','wu',4,['zhenshan']],
			old_yuanshu:['male','qun',4,['yongsi','weidi']],
			old_lingju:['female','qun',3,['jieyuan','fenxin_old']],
			old_maliang:['male','shu',3,['xiemu','naman']],
			old_chenqun:['male','wei',3,['dingpin','oldfaen']],
			old_zhuhuan:['male','wu',4,['youdi']],
			old_zhuzhi:['male','wu',4,['anguo']],
		},
		characterFilter:{
			old_lingju:function(mode){
				return mode=='identity';
			}
		},
		skill:{
			oldfaen:{
				audio:'faen',
				trigger:{global:['turnOverAfter','linkAfter']},
				filter:function(event,player){
					if(event.name=='link') return event.player.isLinked();
					return true;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:'player',
				content:function(){
					trigger.player.draw();
				},
				ai:{
					expose:0.2
				}
			},
			zhenshan:{
				trigger:{player:'chooseToRespondBegin'},
				filter:function(event,player){
					if(event.responded) return false;
					if(!event.filterCard({name:'shan'},player,event)&&!!event.filterCard({name:'sha'},player,event)) return false;
					if(player.hasSkill('zhenshan2')) return false;
					var nh=player.countCards('h');
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')<nh;
					});
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('zhenshan'),function(card,player,target){
						return target.countCards('h')<player.countCards('h');
					}).set('ai',function(target){
						return get.attitude(player,target)
					});
					"step 1"
					if(result.bool){
						trigger.untrigger();
						trigger.responded=true;
						if(trigger.filterCard({name:'shan'})){
							trigger.result={bool:true,card:{name:'shan'}}
						}
						else{
							trigger.result={bool:true,card:{name:'sha'}}
						}
						player.logSkill('zhenshan',result.targets);
						player.addTempSkill('zhenshan2');
						player.swapHandcards(result.targets[0]);
					}
				},
				group:'zhenshan_use'
			},
			zhenshan2:{},
			zhenshan_use:{
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.hasSkill('zhenshan2')) return false;
					var nh=player.countCards('h');
					if(!game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')<nh;
					})){
						return false;
					}
					return event.filterCard({name:'sha'},player,event)||
						event.filterCard({name:'jiu'},player,event)||
						event.filterCard({name:'tao'},player,event);
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							list.push(['基本','','sha','fire']);
							list.push(['基本','','sha','thunder']);
						}
						if(event.filterCard({name:'tao'},player,event)){
							list.push(['基本','','tao']);
						}
						if(event.filterCard({name:'jiu'},player,event)){
							list.push(['基本','','jiu']);
						}
						return ui.create.dialog('振赡',[list,'vcard'],'hidden');
					},
					check:function(button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(card.name=='jiu') return 0;
						if(game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							if(card.name=='sha'){
								if(card.nature=='fire') return 2.95;
								else if(card.nature=='fire') return 2.92;
								else return 2.9;
							}
							else if(card.name=='tao'){
								return 4;
							}
						}
						return 0;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false},
							viewAs:{name:links[0][2],nature:links[0][3]},
							selectCard:-1,
							popname:true,
							log:false,
							precontent:function(){
								'step 0'
								player.chooseTarget('选择交换手牌的目标',function(card,player,target){
									return target.countCards('h')<player.countCards('h')
								},true).ai=function(target){
									return get.attitude(player,target);
								}
								player.addTempSkill('zhenshan2');
								'step 1'
								if(result.bool){
									player.logSkill('zhenshan',result.targets);
									player.swapHandcards(result.targets[0]);
								}
							},
						}
					},
					prompt:function(links,player){
						return '选择'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'的目标';
					}
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var event=_status.event;
						var nh=player.countCards('h');
						if(game.hasPlayer(function(current){
							return get.attitude(player,current)>0&&current.countCards('h')<nh;
						})){
							if(event.type=='dying'){
								if(event.filterCard({name:'tao'},player,event)){
									return 0.5;
								}
							}
							else{
								if(event.filterCard({name:'tao'},player,event)){
									return 4;
								}
								if(event.filterCard({name:'sha'},player,event)){
									return 2.9;
								}
							}
						}
						return 0;
					},
					save:true,
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						if(player.hasSkill('zhenshan2')) return false;
						var nh=player.countCards('h');
						return game.hasPlayer(function(current){
							return current!=player&&current.countCards('h')<nh;
						});
					},
					result:{
						player:function(player){
							if(_status.event.type=='dying'){
								return get.attitude(player,_status.event.dying);
							}
							else{
								return 1;
							}
						}
					}
				}
			},
			oldzhenlie:{
				audio:'zhenlie',
				trigger:{player:'judge'},
				check:function(event,player){
					return event.judge(player.judging[0])<0;
				},
				content:function(){
					var card=get.cards()[0];
					player.$throw(card);
					card.clone.classList.add('thrownhighlight');
					if(trigger.player.judging[0].clone){
						trigger.player.judging[0].clone.classList.remove('thrownhighlight');
						game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
					}
					trigger.player.judging[0].discard();
					trigger.player.judging[0]=card;
					trigger.position.appendChild(card);
					game.log(trigger.player,'的判定牌改为',card);
					game.delay(2);
				},
			},
			oldmiji:{
				trigger:{player:['phaseBegin','phaseEnd']},
				filter:function(event,player){
					return player.isDamaged();
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						return get.color(card)=='black'?1:-1;
					});
					'step 1'
					if(result.bool&&player.maxHp>player.hp){
						var cards=get.cards(player.maxHp-player.hp);
						event.cards=cards;
						var dialog=ui.create.dialog('选择获得卡牌的目标',cards,'hidden');
						dialog.classList.add('noselect');
						player.chooseTarget(true,dialog).ai=function(target){
							return get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
						}
					}
					else{
						event.finish();
					}
					'step 2'
					player.line(result.targets);
					result.targets[0].gain(event.cards,'draw');
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'recover')&&target.hp==target.maxHp-1) return [0,0];
							if(target.hasFriend()){
								if((get.tag(card,'damage')==1||get.tag(card,'loseHp'))&&target.hp==target.maxHp) return [0,1];
							}
						}
					},
					threaten:function(player,target){
						if(target.hp==1) return 3;
						if(target.hp==2) return 2;
						return 1;
					},
				}
			},
			shiyong:{
				audio:2,
				trigger:{player:'damageEnd'},
				forced:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&(get.color(event.card)=='red'||event.source.hasSkill('jiu'));
				},
				content:function(){
					player.loseMaxHp();
				}
			},
			oldqianxi:{
				trigger:{source:'damageBefore'},
				check:function(event,player){
					var att=get.attitude(player,event.player);
					if(event.player.hp==event.player.maxHp) return att<0;
					if(event.player.hp==event.player.maxHp-1&&
						(event.player.maxHp<=3||event.player.hasSkillTag('maixie'))) return att<0;
					return att>0;
				},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&get.distance(player,event.player)<=1;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					player.judge(function(card){
						return get.suit(card)!='heart'?1:-1;
					});
					'step 1'
					if(result.bool){
						trigger.cancel();
						trigger.player.loseMaxHp(true);
					}
				}
			},
			oldxuanfeng:{
				audio:'xuanfeng',
				trigger:{player:'loseEnd'},
				direct:true,
				filter:function(event,player){
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='e') return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('xuanfeng'),function(card,player,target){
						if(target==player) return false;
						return get.distance(player,target)<=1||player.canUse('sha',target,false);
					}).set('ai',function(target){
						if(get.distance(player,target)<=1){
							return get.damageEffect(target,player,player)*2;
						}
						else{
							return get.effect(target,{name:'sha'},player,player);
						}
					});
					"step 1"
					if(result.bool){
						player.logSkill('xuanfeng',result.targets);
						var target=result.targets[0];
						var distance=get.distance(player,target);
						if(distance<=1&&player.canUse('sha',target,false)){
							player.chooseControl('出杀','造成伤害').ai=function(){
								return '造成伤害';
							}
							event.target=target;
						}
						else if(distance<=1){
							target.damage();
							event.finish();
						}
						else{
							player.useCard({name:'sha'},target,false).animate=false;
							game.delay();
							event.finish();
						}
					}
					else{
						event.finish();
					}
					"step 2"
					var target=event.target;
					if(result.control=='出杀'){
						player.useCard({name:'sha'},target,false).animate=false;
						game.delay();
					}
					else{
						target.damage();
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip') return [1,3];
						}
					},
					reverseEquip:true,
					noe:true
				}
			},
		},
		translate:{
			old_yuanshu:'旧袁术',
			old_xusheng:'旧徐盛',
			old_lingtong:'旧凌统',
			old_zhuran:'旧朱然',
			old_madai:'旧马岱',
			old_caoxiu:'旧曹休',
			old_huaxiong:'旧华雄',
			old_wangyi:'旧王异',
			old_caozhen:'旧曹真',
			old_quancong:'旧全琮',
			old_lingju:'旧灵雎',
			old_maliang:'旧马良',
			old_chenqun:'旧陈群',
			old_zhuhuan:'旧朱桓',
			old_zhuzhi:'旧朱治',

			oldfaen:'法恩',
			oldfaen_info:'当一名角色翻面或横置后，你可以令其摸一张牌。',
			zhenshan:'振赡',
			zhenshan_use:'振赡',
			zhenshan_use_backup:'振赡',
			zhenshan_info:'每名角色的回合限一次，每当你需要使用或打出一张基本牌时，你可以与一名手牌数少于你的角色交换手牌。若如此做，视为你使用或打出了此牌',
			zhenshan_use_info:'每名角色的回合限一次，每当你需要使用或打出一张基本牌时，你可以与一名手牌数少于你的角色交换手牌。若如此做，视为你使用或打出了此牌',
			oldzhenlie:'贞烈',
			oldzhenlie_info:'在你的判定牌生效前，你可以亮出牌堆顶的一张牌代替之',
			oldmiji:'秘计',
			oldmiji_info:'准备/结束阶段开始时，若你已受伤，你可以判定，若判定结果为黑色，你观看牌堆顶的X张牌（X为你已损失的体力值），然后将这些牌交给一名角色',
			shiyong:'恃勇',
			shiyong_info:'锁定技，当你受到一次红色【杀】或【酒】【杀】造成的伤害后，须减1点体力上限',
			oldqianxi:'潜袭',
			oldqianxi_info:'当你使用【杀】对距离为1的目标角色造成伤害时，你可以进行一次判定，若判定结果不为红桃，你防止此伤害，令其减1点体力上限',
			oldxuanfeng:'旋风',
			oldxuanfeng_info:'每当你失去一次装备区里的牌时，你可以执行下列两项中的一项：1.视为对任意一名其他角色使用一张【杀】（此【杀】不计入每回合的使用限制）；2.对与你距离1以内的一名其他角色造成一点伤害',
		}
	};
});
