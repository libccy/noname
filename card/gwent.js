'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'gwent',
		card:{
			gw_niuquzhijing:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:function(card,player){
					if(game.hasPlayer(function(current){
						return current.hp!=player.hp;
					})){
						return !player.storage.spell_gold;
					}
				},
				filterTarget:function(card,player,target){
					return target.isHighestHp()||target.isLowestHp();
				},
				chongzhu:function(event,player){
					return player.storage.spell_gold?true:false;
				},
				selectTarget:-1,
				multitarget:true,
				multiline:true,
				contentBefore:function(){
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
					if(max!=min&&max!=null&&min!=null){
						for(var i=0;i<targets.length;i++){
							if(targets[i].hp==max){
								targets[i].hp=min;
							}
							else if(targets[i].hp==min){
								targets[i].hp=max;
								if(targets[i].maxHp<targets[i].hp){
									targets[i].maxHp=targets[i].hp;
								}
							}
							targets[i].update();
						}
					}
				},
				contentAfter:function(){
					player.storage.spell_gold=true;
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					result:{
						target:function(player,target){
							if(target.isHighestHp) return -10;
							return 10;
						}
					},
					order:3.5,
					multitarget:true,
				}
			},
			gw_zhongmozhizhan:{
				fullborder:'gold',
				type:'spell',
				subtype:'spell_gold',
				vanish:true,
				enable:function(card,player){
					return !player.storage.spell_gold;
				},
				filterTarget:function(card,player,target){
					return target.countCards('hej');
				},
				chongzhu:function(event,player){
					return player.storage.spell_gold?true:false;
				},
				selectTarget:-1,
				multitarget:true,
				multiline:true,
				contentBefore:function(){
					player.$skill('终末之战','legend','metal');
					game.delay(2);
				},
				content:function(){
					'step 0'
					event.num=0;
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
					player.storage.spell_gold=true;
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
				},
				ai:{
					value:8,
					result:{
						target:function(player,target){
							return -Math.sqrt(target.countCards('he'));
						}
					},
					order:0.5,
					multitarget:true,
					multineg:true
				}
			},
			gw_butianshu:{
				fullborder:'silver',
				type:'spell',
				subtype:'spell_silver',
				vanish:true,
				enable:function(card,player){
					return player.storage.spell_silver!=2;
				},
				filterTarget:true,
				chongzhu:function(event,player){
					return player.storage.spell_silver==2?true:false;
				},
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
				contentAfter:function(){
					if(player.storage.spell_silver==1){
						player.storage.spell_silver=2;
					}
					else{
						player.storage.spell_silver=1;
					}
				},
				ai:{
					value:8,
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

		},
		help:{
			'昆特牌':'<ul><li>法术为分金、银、铜三类，金卡和银卡不出现在牌堆中<li>'+
			'每局最多使用两张银卡，使用过两张银卡法术后可将多余的银卡重铸为铜卡<li>'+
			'每局最多使用一张金卡，使用过金卡法术后可将多余的金卡重铸为银卡（若已使用两张银卡则改为铜卡）<li>'+
			'若本局使用的银卡数不超过2，摸牌阶段有一定概率摸到银卡，在游戏的前10个摸牌阶段中至少会摸到2张银卡<li>'+
			'若本局未使用过金卡，摸牌阶段有一定概率摸到金卡，在游戏的前10个摸牌阶段中至少会摸到1张金卡<li>'+
			'进行洗牌时金卡、银卡将从弃牌堆中消失，不进入牌堆'
		},
		translate:{
			spell:'法术',
			spell_gold:'金卡法术',
			spell_silver:'银卡法术',
			spell_bronze:'铜卡法术',
			gw_zhongmozhizhan:'终末之战',
			gw_zhongmozhizhan_info:'结束出牌阶段，将所有角色区域内的所有牌置入弃牌堆，且不触发技能（每局最多用一张金卡法术，多余的法术可重铸）',
			gw_butianshu:'卜天术',
			gw_butianshu_info:'出牌阶段对任意角色使用，将任意一张延时锦囊牌置入其判定区（每局最多用两张银卡法术，多余的法术可重铸）',
			gw_zhihuanjun:'致幻菌',
			gw_zhihuanjun_info:'出牌阶段对一名已受伤角色使用，令其减少一点体力上限',
			gw_niuquzhijing:'纽曲之镜',
			gw_niuquzhijing_info:'结束出牌阶段，交换全场体力值最大和最小角色的体力值，且不触发技能（每局最多用一张金卡法术，多余的法术可重铸）',
		},
		cardType:{
			spell:0.5,
			spell_bronze:0.2,
			spell_silver:0.3,
			spell_gold:0.4
		},
		list:[

		],
	};
});
