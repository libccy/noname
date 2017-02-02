'use strict';
card.gujian={
    card:{
        chunbing:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        gudonggeng:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        yougeng:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        liyutang:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        mizhilianou:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        xiajiao:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        tanhuadong:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        qingtuan:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        yuanbaorou:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        molicha:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        mapodoufu:{
            fullskin:true,
            type:'food',
            enable:true,
            filterTarget:function(card,player,target){
                return target==player;
            },
            selectTarget:-1,
            modTarget:true,
        },
        heilonglinpian:{
            fullskin:true,
            type:'trick',
        },
        mutoumianju:{
            fullskin:true,
            type:'equip',
            subtype:'equip2',
        },
        yuheng:{
            fullskin:true,
            type:'equip',
            subtype:'equip5',
        },
        shujinsan:{
            fullskin:true,
            type:'basic',
        },
        ziyangdan:{
            fullskin:true,
            type:'basic',
        },
        yunvyuanshen:{
            fullskin:true,
            type:'basic',
        },
        liuxiaxianniang:{
            fullskin:true,
            type:'basic',
        },
        bingpotong:{
            fullskin:true,
			type:'jiguan',
			enable:true,
			filterTarget:function(card,player,target){
				return target.num('h')>0;
			},
			content:function(){
				"step 0"
				if(target.num('h')==0||player.num('h')==0){
					event.finish();
					return;
				}
				player.chooseCard(true);
				"step 1"
				event.card1=result.cards[0];
                var rand=Math.random()<0.5;
				target.chooseCard(true).ai=function(card){
                    var num=0;
                    if(get.color(card)=='red'){
                        if(rand) num-=5;
                    }
                    else{
                        if(!rand) num-=5;
                    }
					return num-ai.get.value(card);
				};
				"step 2"
				event.card2=result.cards[0];
				ui.arena.classList.add('thrownhighlight');
				game.addVideo('thrownhighlight1');
				player.$compare(event.card1,target,event.card2);
				game.delay(4);
				"step 3"
				game.log(player,'展示了',event.card1);
				game.log(target,'展示了',event.card2);
				if(get.color(event.card2)==get.color(event.card1)){
					player.discard(event.card1).animate=false;
					target.$gain2(event.card2);
					var clone=event.card1.clone;
					if(clone){
						clone.style.transition='all 0.5s';
						clone.style.transform='scale(1.2)';
						clone.delete();
						game.addVideo('deletenode',player,get.cardsInfo([clone]));
					}
					target.loseHp();
				}
				else{
					player.$gain2(event.card1);
                    target.discard(event.card2).animate=false;
					var clone=event.card2.clone;
					if(clone){
						clone.style.transition='all 0.5s';
						clone.style.transform='scale(1.2)';
						clone.delete();
						game.addVideo('deletenode',target,get.cardsInfo([clone]));
					}
				}
				ui.arena.classList.remove('thrownhighlight');
				game.addVideo('thrownhighlight2');
			},
			ai:{
				basic:{
					order:2,
					value:5,
					useful:1,
				},
				result:{
					player:function(player,target){
						if(player.num('h')<=Math.min(5,Math.max(2,player.hp))&&_status.event.name=='chooseToUse'){
							if(typeof _status.event.filterCard=='function'&&
								_status.event.filterCard({name:'dujian'})){
								return -10;
							}
							if(_status.event.skill){
								var viewAs=get.info(_status.event.skill).viewAs;
								if(viewAs=='dujian') return -10;
								if(viewAs&&viewAs.name=='dujian') return -10;
							}
						}
						return 0;
					},
					target:function(player,target){
						if(player.num('h')<=1) return 0;
						return -1.5;
					}
				},
				tag:{
					loseHp:1
				}
			}
        },
        feibiao:{
            type:'jiguan',
			enable:true,
			fullskin:true,
			filterTarget:function(card,player,target){
				return get.distance(player,target)>1;
			},
			content:function(){
				"step 0"
				if(!target.num('h',{color:'black'})){
					target.loseHp();
					event.finish();
				}
				else{
					target.chooseToDiscard({color:'black'},'弃置一张黑色手牌或受流失一点体力').ai=function(card){
						return 8-ai.get.value(card);
					};
				}
				"step 1"
				if(!result.bool){
					target.loseHp();
				}
			},
			ai:{
				basic:{
					order:9,
					value:3,
					useful:1,
				},
				result:{
					target:-2
				},
				tag:{
					discard:1,
					loseHp:1
				}
			}
        }
    },
    skill:{},
    cardType:{
        food:0.3
    },
    translate:{
        bingpotong:'冰魄筒',
        bingpotong_info:'出牌阶段，对一名有手牌的角色使用，你与其同时展示一张手牌，若颜色相同，你弃置展示的牌，目标流失一点体力；若颜色不同，目标弃置展示的牌',
        feibiao:'飞镖',
        feibiao_info:'出牌阶段，对一名距离1以外的角色使用，令其弃置一张黑色手牌或流失一点体力',

        liuxiaxianniang:'流霞仙酿',
        liuxiaxianniang_info:'流霞仙酿',
        yunvyuanshen:'玉女元参',
        yunvyuanshen_info:'玉女元参',
        ziyangdan:'紫阳丹',
        ziyangdan_info:'紫阳丹',
        yuheng:'玉衡',
        yuheng_info:'回合结束阶段，若场你的体力值不是全场最少，你失去一点体力并令玉衡获得一点力量；回合开始阶段，玉衡每有一点力量，你便可以获得一名其他角色的一张牌',
        shujinsan:'舒筋散',
        shujinsan_info:'对任意角色使用，目标可弃置任意张牌，并摸等量的牌',
        mutoumianju:'木头面具',
        mutoumianju_info:'装备后视为拥有技能龙胆',
        heilonglinpian:'黑龙鳞片',
        heilonglinpian_info:'对自己使用，获得一点护甲，直到下一回合开始，计算其他角色与你的距离时始终+1',

        food:'食物',
        chunbing:'春饼',
        gudonggeng:'骨董羹',
        yougeng:'酉羹',
        liyutang:'鲤鱼汤',
        mizhilianou:'蜜汁藕',
        xiajiao:'虾饺',
        tanhuadong:'昙花冻',
        qingtuan:'青团',
        luyugeng:'鲈鱼羹',
        yuanbaorou:'元宝肉',
        molicha:'茉莉茶',
        mapodoufu:'麻婆豆腐',
    },
    list:[
        ['club',8,'feibiao','poison'],
        ['diamond',9,'feibiao','poison'],
        ['spade',11,'feibiao','poison'],

        ['spade',3,'bingpotong','poison'],
		['club',11,'bingpotong','poison'],
		['club',12,'bingpotong','poison'],
    ]
};
