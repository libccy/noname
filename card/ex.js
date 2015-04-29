card.ex={
	card:{
		hanbing:{
			fullskin:true,
			type:"equip",
			subtype:"equip1",
			distance:{attackFrom:-1},
			skills:['hanbing_skill'],
			ai:{
				basic:{
					equipValue:2
				}
			},
		},
		renwang:{
			fullskin:true,
			type:"equip",
			subtype:"equip2",
			skills:['renwang_skill'],
			ai:{
				basic:{
					equipValue:8
				},
			},
		},
	},
	skill:{
		hanbing_skill:{
			trigger:{player:'shaHit'},
			direct:true,
			filter:function(event,player){
				return event.target.get('he').length>0;
			},
			content:function(){
				"step 0"
				player.choosePlayerCard('是否发动【寒冰剑】？','he',trigger.target,[1,2],function(button){
					var eff=ai.get.damageEffect(trigger.target,player,player);
					if(ai.get.attitude(player,trigger.target)>0){
						if(eff>=0) return false;
						return 10-ai.get.buttonValue(button);
					}
					if(eff<=0) return ai.get.buttonValue(button);
					if(trigger.target.hp==1) return false;
					if(player.skills.contains('jiu')||player.skills.contains('tianxianjiu')) return false;
					if(ui.dialog.buttons.length<2) return -1;
					var num=0;
					for(var i=0;i<ui.dialog.buttons.length;i++){
						if(ai.get.buttonValue(ui.dialog.buttons[i])>1.5) num++;
					}
					if(num>=2) return ai.get.buttonValue(button)-1.5;
				});
				"step 1"
				if(result.bool){
					trigger.untrigger();
					var cards=[];
					for(var i=0;i<result.buttons.length;i++) cards.push(result.buttons[i].link);
					player.logSkill('hanbing');
					trigger.unhurt=true;
					trigger.target.discard(cards);
				}
			}
		},
		renwang_skill:{
			trigger:{target:'shaBefore'},
			forced:true,
			priority:6,
			filter:function(event,player){
				if(event.player.num('s','unequip')) return false;
				return (event.card.name=='sha'&&get.color(event.card)=='black')
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player){
						var equip1=player.get('e','1');
						if(equip1&&equip1.name=='qinggang') return 1;
						if(player.num('s','unequip')) return;
						if(card.name=='sha'&&get.color(card)=='black') return 0;
					}
				}
			}
		}
	},
	translate:{
		hanbing:'寒冰剑',
		renwang:'仁王盾',
		hanbing_bg:'冰',
		renwang_bg:'盾',
		hanbing_skill:'寒冰剑',
		renwang_skill:'仁王盾',
		hanbing_info:'每当你使用杀命中目标后，你可以防止伤害，改为弃置目标两张牌',
		hanbing_skill_info:'每当你使用杀命中目标后，你可以防止伤害，改为弃置目标两张牌',
		renwang_info:'黑色的杀对你无效',
		renwang_skill_info:'黑色的杀对你无效',
	},
	list:[
		["spade",2,'hanbing'],
		["club",2,'renwang'],
		["heart",12,'shandian','thunder'],
		["diamond",12,'wuxie'],
	],
}
