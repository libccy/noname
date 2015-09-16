'use strict';
card.hearth={
	card:{
		shenenshu:{
			enable:true,
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			type:'trick',
			content:function(){
				var num=player.num('h')-target.num('h');
				if(num<1) num=1;
				if(num>5) num=5;
				target.draw(num);
			},
			ai:{
				order:10,
				value:7,
				useful:2,
				result:{
					target:function(player,target){
						var nh=player.num('h')-target.num('h');
						if(!player.skills.contains('jizhi')){
							nh--;
						}
						return Math.max(1,nh);
					}
				},
				expose:0.2
			}
        },
		zhiliaobo:{
			enable:true,
			usable:1,
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp;
			},
			type:'trick',
			content:function(){
				'step 0'
				target.recover();
				'step 1'
				if(target.hp<target.maxHp){
					target.judge(function(card){
						return get.color(card)=='red'?1:-1;
					});
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool){
					target.recover();
				}
			},
			ai:{
				order:4,
				value:[6,3],
				useful:[6,3],
				result:{
					target:function(player,target){
						var num=target.maxHp-target.hp;
						if(num<1) return 0;
						if(num==1) return 1;
						if(target.hp==2) return 2.5;
						return 2;
					}
				}
			}
		},
		yuansuhuimie:{
			type:'trick',
			enable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target.num('he')>0;
			},
			content:function(){
				"step 0"
				target.chooseToDiscard([1,2],'he').ai=function(card){
					if(ai.get.damageEffect(target,player,target,'thunder')>=0) return 0;
					if(target.hasSkillTag('maixie')&&target.hp>1&&ui.selected.cards.length){
						return 0;
					}
					if(card.name=='tao') return 0;
					if(target.hp==1&&card.name=='jiu') return 0;
					if(get.type(card)!='basic'){
						return 10-ai.get.value(card);
					}
					return 8-ai.get.value(card);
				};
				"step 1"
				if(!result.bool||result.cards.length<2){
					if(result.bool) target.damage(2-result.cards.length,'thunder');
					else target.damage(2,'thunder');
				}
			},
			ai:{
				basic:{
					order:7,
					useful:[5,1]
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nothunder')) return 0;
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0) num++;
						}
						if(num>1) return 0;
						var nh=target.num('he');
						if(target==player) nh--;
						if(nh==2) return -2.5;
						if(nh==1) return -3;
						return -2;
					},
				},
				tag:{
					respond:1,
					respondSha:1,
					damage:1,
					natureDamage:1,
					thunderDamage:1,
					multitarget:1,
					multineg:1,
					discard:2,
					loseCard:2,
				}
			}
		}
	},
	skill:{

	},
	translate:{
		shenenshu:'神恩术',
		shenenshu_info:'对一名其他角色使用，令其摸X张牌，直到手牌数与你相等（X不小于1且不大于5）',
		zhiliaobo:'治疗波',
		zhiliaobo_info:'对一名受伤角色使用，令其回复一点体力，若其仍处于受伤状态，则进行一次判定，若结果为红色则再回复一点体力',
		yuansuhuimie:'元素毁灭',
		yuansuhuimie_info:'对所有有手牌的角色使用，令目标弃置1~2张牌，并受到2-X点雷电伤害，X为其弃置的手牌数',
	},
	list:[
		['heart',2,'shenenshu'],
		['diamond',12,'shenenshu'],
		['club',7,'zhiliaobo'],
		['spade',1,'zhiliaobo'],
		['spade',13,'yuansuhuimie'],
	],
}
