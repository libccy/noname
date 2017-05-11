'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'gwent',
		card:{
			gw_xinsheng:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:function(card,player){
					return game.hasPlayer(function(current){
						return !current.isUnseen();
					});
				},
				notarget:true,
				contentBefore:function(){
					player.$skill('新生','legend','metal');
					game.delay(2);
				},
				content:function(){
					'step 0'
					var target=game.findMax(game.filterPlayer(function(current){
						return !current.isUnseen();
					}).randomSort(),function(current){
						var att=get.attitude(player,current);
						var rank=get.rank(current,true);
						if(current.maxHp>=3){
							if(current.hp<=1){
								return att*2;
							}
							else if(current.hp==2){
								if(att>0){
									att*=1.5;
								}
								else{
									att/=1.5;
								}
							}
						}
						if(rank>=7){
							if(att>0){
								return att/10;
							}
							return -att;
						}
						else if(rank<=4){
							if(att<0){
								return -att/10;
							}
							return att;
						}
						return Math.abs(att/2);
					})[0];
					event.aitarget=target;
					var list=[];
					for(var i in lib.character){
						if(!lib.filter.characterDisabled(i)&&lib.character[i][2]>=5){
							list.push(i);
						}
					}
    				var players=game.players.concat(game.dead);
    				for(var i=0;i<players.length;i++){
    					list.remove(players[i].name);
    					list.remove(players[i].name1);
    					list.remove(players[i].name2);
    				}
    				var dialog=ui.create.dialog('选择一张武将牌','hidden');
    				dialog.add([list.randomGets(12),'character']);
    				player.chooseButton(dialog,true).ai=function(button){
						if(get.attitude(player,event.aitarget)>0){
							return get.rank(button.link,true);
						}
						else{
							return -get.rank(button.link,true);
						}
    				};
    				'step 1'
					event.nametarget=result.links[0];
					player.chooseTarget(true,'使用'+get.translation(event.nametarget)+'替换一名角色的武将牌',function(card,player,target){
						return !target.isUnseen();
					}).ai=function(target){
						if(target==event.aitarget){
							return 1;
						}
						else{
							return 0;
						}
					}
					'step 2'
					var target=result.targets[0];
    				target.reinit(target.name,event.nametarget);
                    target.hp=target.maxHp;
                    target.update();
					player.line(target,'green');
				},
				contentAfter:function(){
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					useful:[6,1],
					result:{
						player:1
					},
					order:0.5,
				}
			},
			gw_niuquzhijing:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:function(card,player){
					return game.hasPlayer(function(current){
						return current.hp!=player.hp;
					});
				},
				notarget:true,
				contentBefore:function(){
					var list1=game.filterPlayer(function(current){
						return current.isHighestHp();
					});
					var list2=game.filterPlayer(function(current){
						return current.isLowestHp();
					});
					player.line(list1);
					for(var i=0;i<list1.length;i++){
						list1[i].animate('target');
					}
					setTimeout(function(){
						var list11=list1.slice(0);
						var list22=list2.slice(0);
						while(list22.length>list11.length){
							list11.push(list1.randomGet());
						}
						while(list22.length<list11.length){
							list22.push(list2.randomGet());
						}
						list11.sortBySeat();
						list22.sortBySeat();
						while(list11.length){
							list11.shift().line(list22.shift(),'green');
						}
					},500);
					player.$skill('纽曲之镜','legend','metal');
					game.delay(2);
				},
				content:function(){
					var max=null,min=null;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isHighestHp()){
							max=game.players[i].hp;break;
						}
					}
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isLowestHp()){
							min=game.players[i].hp;break;
						}
					}
					var targets=game.filterPlayer();
					if(max!=min&&max!=null&&min!=null){
						for(var i=0;i<targets.length;i++){
							if(targets[i].hp==max){
								targets[i].hp=min;
								targets[i].$damagepop(min-max);
							}
							else if(targets[i].hp==min){
								targets[i].hp=max;
								targets[i].$damagepop(max-min,'wood');
								if(targets[i].maxHp<targets[i].hp){
									targets[i].maxHp=targets[i].hp;
								}
							}
							targets[i].update();
						}
					}
				},
				contentAfter:function(){
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					useful:[6,1],
					result:{
						player:function(player,target){
							return game.countPlayer(function(current){
								if(current.isHighestHp()){
									return -get.sgn(get.attitude(player,current));
								}
								if(current.isLowestHp()){
									return get.sgn(get.attitude(player,current));
								}
							});
						}
					},
					order:3.5,
				}
			},
			gw_zhongmozhizhan:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:true,
				notarget:true,
				contentBefore:function(){
					player.line(game.filterPlayer());
					player.$skill('终末之战','legend','metal');
					game.delay(2);
				},
				content:function(){
					'step 0'
					event.num=0;
					event.targets=game.filterPlayer().sortBySeat();
					'step 1'
					if(event.num<targets.length){
						ui.clear();
						var target=targets[event.num];
						var cards=target.getCards('hej');
						target.lose(cards)._triggered=null;
						target.$throw(cards);
						event.num++;
						event.redo();
						game.delay(0.7);
					}
					'step 2'
					ui.clear();
				},
				contentAfter:function(){
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					useful:[6,1],
					result:{
						player:function(player,target){
							return -game.countPlayer(function(current){
								return current.countCards('he')*get.sgn(get.attitude(player,current));
							});
						}
					},
					order:0.5,
				}
			},
			gw_butianshu:{
				fullborder:'silver',
				type:'spell',
				subtype:'spell_silver',
				vanish:true,
				enable:true,
				filterTarget:true,
				contentBefore:function(){
					player.$skill('卜天术','legend','water');
					game.delay(2);
				},
				content:function(){
					'step 0'
    				var list=[];
    				for(var i in lib.card){
    					if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
    					if(lib.card[i].type=='delay') list.push([cards[0].suit,cards[0].number,i]);
    				}
    				var dialog=ui.create.dialog('卜天术',[list,'vcard']);
					var bing=target.countCards('h')<=1;
    				player.chooseButton(dialog,true,function(button){
                        if(ai.get.effect(target,{name:button.link[2]},player,player)>0){
							if(button.link[2]=='bingliang'){
                                if(bing) return 2;
                                return 0.7;
        					}
        					if(button.link[2]=='lebu'){
        						return 1;
        					}
        					if(button.link[2]=='guiyoujie'){
        						return 0.5;
        					}
        					if(button.link[2]=='caomu'){
        						return 0.3;
        					}
        					return 0.2;
                        }
                        return 0;
    				}).filterButton=function(button){
    					return !target.hasJudge(button.link[2]);
    				};
    				'step 1'
					var card=game.createCard(result.links[0][2]);
					event.judgecard=card;
					target.$draw(card);
					game.delay(0.7);
					'step 2'
    				target.addJudge(event.judgecard);
				},
				ai:{
					value:8,
					useful:[5,1],
					result:{
						player:function(player,target){
							var eff=0;
							for(var i in lib.card){
								if(lib.card[i].type=='delay'){
									var current=ai.get.effect(target,{name:i},player,player);
									if(current>eff){
										eff=current;
									}
								}
							}
							return eff;
						}
					},
					order:6,
				}
			},
			gw_zhihuanjun:{
				fullborder:'bronze',
				type:'spell',
				subtype:'spell_bronze',
				enable:true,
				filterTarget:function(card,player,target){
					return target.isDamaged();
				},
				content:function(){
					target.loseMaxHp(true);
				},
				ai:{
					value:4,
					result:{
						target:function(player,target){
							if(target.maxHp-target.hp==1){
								return -1/target.maxHp;
							}
							else{
								return -1/target.maxHp/3;
							}
						}
					},
					order:8,
				}
			}
		},
		skill:{
			_gainspell:{
				trigger:{player:'drawBegin'},
				forced:true,
				popup:false,
				silent:true,
				priority:-11,
				filter:function(event,player){
					return event.num>0&&event.parent.name=='phaseDraw';
				},
				content:function(){
					if(!player.storage.spell_gain||Math.max.apply(null,player.storage.spell_gain)<0){
						var tmp=player.storage.spell_gain2;
						player.storage.spell_gain=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].randomGets(3);
						player.storage.spell_gain2=15-Math.max.apply(null,player.storage.spell_gain);
						if(tmp){
							for(var i=0;i<3;i++){
								player.storage.spell_gain[i]+=tmp;
							}
						}
					}
					for(var i=0;i<3;i++){
						if(player.storage.spell_gain[i]==0){
							var list;
							if(i==0){
								list=get.libCard(function(info){
									return info.subtype=='spell_gold';
								});
							}
							else{
								list=get.libCard(function(info){
									return info.subtype=='spell_silver';
								});
							}
							if(list&&list.length){
								ui.cardPile.insertBefore(game.createCard(list.randomGet()),ui.cardPile.firstChild);
							}
						}
						player.storage.spell_gain[i]--;
					}
				}
			}
		},
		help:{
			'昆特牌':'<ul><li>法术为分金、银、铜三类，金卡和银卡不出现在牌堆中<li>'+
			'摸牌阶段有一定概率摸到银卡，在16个摸牌阶段中至少会摸到2张银卡<li>'+
			'摸牌阶段有一定概率摸到金卡，在16个摸牌阶段中至少会摸到1张金卡<li>'+
			'进行洗牌时金卡、银卡将从弃牌堆中消失，不进入牌堆'
		},
		translate:{
			spell:'法术',
			spell_gold:'金卡法术',
			spell_silver:'银卡法术',
			spell_bronze:'铜卡法术',
			gw_xinsheng:'新生',
			gw_xinsheng_info:'结束出牌阶段，随机观看12张武将牌，选择一张替代一名角色的武将牌',
			gw_zhongmozhizhan:'终末之战',
			gw_zhongmozhizhan_info:'结束出牌阶段，将所有角色区域内的所有牌置入弃牌堆，无视免疫效果且不触发技能',
			gw_butianshu:'卜天术',
			gw_butianshu_info:'出牌阶段对任意角色使用，将任意一张延时锦囊牌置入其判定区',
			gw_zhihuanjun:'致幻菌',
			gw_zhihuanjun_info:'出牌阶段对一名已受伤角色使用，令其减少一点体力上限',
			gw_niuquzhijing:'纽曲之镜',
			gw_niuquzhijing_info:'结束出牌阶段，交换全场体力值最大和最小角色的体力值，无视免疫效果且不触发技能',
		},
		cardType:{
			spell:0.5,
			spell_bronze:0.2,
			spell_silver:0.3,
			spell_gold:0.4
		},
		list:[
			['club',3,'gw_zhihuanjun'],
			['spade',2,'gw_zhihuanjun'],
		],
	};
});
