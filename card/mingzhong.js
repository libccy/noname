'use strict';
card.mingzhong={
	card:{
		shengdong:{
            fullskin:true,
            enable:function(card,player){
				var hs=player.get('h');
				if(hs.length>1) return true;
				if(hs.length==1&&hs[0]!=card) return true;
				return false;
			},
            type:'trick',
			selectTarget:2,
			multitarget:true,
			targetprompt:['交给其一张牌','得两张牌'],
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				'step 0'
				if(!player.num('h')){
					event.finish();
				}
				else{
					event.target1=targets[0];
					event.target2=targets[1];
					player.chooseCard('h','将一张手牌交给'+get.translation(event.target1),true);
				}
				'step 1'
				player.$give(1,event.target1);
				event.target1.gain(result.cards);
				'step 2'
				if(!event.target1.num('h')){
					event.finish();
				}
				else{
					var he=event.target1.get('he');
					if(he.length<=2){
						event.directresult=he;
					}
					else{
						event.target1.chooseCard('he','将两张牌交给'+get.translation(event.target2),true);
					}
				}
				'step 3'
				if(!event.directresult){
					event.directresult=result.cards;
				}
				event.target1.$give(2,event.target2);
				event.target2.gain(result.cards);
			},
			ai:{
				order:2.5,
				value:[4,1],
				useful:1,
				result:{
					target:function(player,target){
						var ok=false;
						var hs=player.get('h');
						for(var i=0;i<hs.length;i++){
							if(ai.get.value(hs[i])<=5){
								ok=true;
								break;
							}
						}
						if(!ok) return 0;
						if(ui.selected.targets.length==1) return 2;
						if(player.hasFriend()) return -1;
						return 0;
					}
				}
			}
        },
        zengbin:{
            fullskin:true,
            enable:true,
            type:'trick',
			filterTarget:function(card,player,target){
				return get.distance(player,target)<=1;
			},
			content:function(){
				'step 0'
				target.draw(3);
				'step 1'
				if(target.num('he',{type:'basic'})<target.num('he')){
					target.chooseToDiscard('弃置一张非基本牌（或取消并弃置两张牌）','he',function(card){
						return get.type(card)!='basic';
					}).ai=function(card){
						return 6-ai.get.value(card);
					};
					event.more=true;
				}
				else{
					target.chooseToDiscard('he',2,true);
				}
				'step 2'
				if(event.more&&!result.bool){
					target.chooseToDiscard('he',2,true);
				}
			},
			ai:{
				order:7,
				useful:4,
				value:10,
				result:{
					target:1
				}
			}
        },
        caomu:{
            fullskin:true,
            enable:true,
            type:'delay',
        }
	},
	translate:{
        shengdong:'声东击西',
		shengdong_info:'出牌阶段，对距离为1的一名角色使用。你交给目标角色一张手牌，若如此做，其将两张牌交给另一名由你选择的其他角色',
        zengbin:'增兵减灶',
        zengbin_info:'出牌阶段，对一名角色使用。目标角色摸三张牌，然后选择一项：1.弃置一张非基本牌；2.弃置两张牌',
        caomu:'草木皆兵',
        caomu_info:'出牌阶段，对一名其他角色使用。将【草木皆兵】放置于该角色的判定区里，若判定结果不为梅花：摸牌阶段，目标角色少摸一张牌；摸牌阶段结束时，与其距离为1的角色各摸一张牌',
	},
	list:[
		["spade",1,'caomu'],
		["club",3,'caomu'],
		["heart",12,'shengdong',],
        ["club",9,'shengdong'],
		["spade",9,'shengdong'],
        ["diamond",4,'zengbin'],
        ["heart",6,'zengbin'],
        ["spade",7,'zengbin'],
	],
}
