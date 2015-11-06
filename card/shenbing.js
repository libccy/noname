card.shenbing={
	card:{
		suolianjia:{
			fullskin:true,
			type:"equip",
			subtype:"equip2",
			skills:['suolianjia'],
			onEquip:function(){
				if(player.isLinked()==false) player.link();
			},
			onLose:function(){
				if(player.isLinked()) player.link();
			},
			ai:{
				basic:{
					equipValue:5
				},
			},
		},
		huxinjing:{
			fullskin:true,
			type:"equip",
			subtype:"equip2",
			skills:['huxinjing'],
			ai:{
				basic:{
					equipValue:6
				},
			},
		}
	},
	skill:{
		huxinjing:{
			trigger:{player:'damageBegin'},
			priority:10,
			forced:true,
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				trigger.num--;
				player.addSkill('huxinjing2');
				// player.discard(player.get('e','2'));
			}
		},
		huxinjing2:{
			trigger:{player:'damageEnd'},
			priority:10,
			forced:true,
			popup:false,
			content:function(){
				var cards=player.get('e','huxinjing');
				if(cards.length){
					player.discard(cards);
				}
			}
		},
		suolianjia:{
			trigger:{player:'damageBefore'},
			filter:function(event){
				if(event.source&&event.source.num('s','unequip')) return;
				if(event.nature) return true;
			},
			forced:true,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				nofire:true,
				nothunder:true,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'natureDamage')) return 'zerotarget';
						if(card.name=='tiesuo'){
							return [0,0];
						}
					}
				}
			}
		},
	},
	translate:{
		suolianjia:'锁链甲',
		suolianjia_info:'锁定技，你防止即将受到的属性伤害，当装备时进入连环状态，当卸下时解除连环状态',
		suolianjia_bg:'链',
		huxinjing_bg:'镜',
		huxinjing:'护心镜',
		huxinjing_info:'抵消一点伤害',
	},
	list:[
		['club',13,'suolianjia'],
		['spade',9,'huxinjing'],
	],
}
