'use strict';
character.xiake={
    character:{
		// xk_dongfangweiming:['male','shu',4,[]],
		xk_guyuexuan:['male','qun',4,['rouquan','gzhenji']],
		xk_jinji:['male','shu',4,['xueren','lianpo']],
        // xk_shenxiangyun:['female','wei',3,['zhenjiu']],
		xk_fujianhan:['male','qun',4,['zuijian','zitong']],
    },
    skill:{
        xueren:{
            trigger:{source:'damageEnd'},
            filter:function(event,player){
                return event.parent.name!='xueren'&&event.player.isAlive();
            },
            prompt:function(event,player){
                return '是否对'+get.translation(event.player)+'发动【血刃】？';
            },
            check:function(event,player){
                if(ai.get.damageEffect(event.player,player,player)>0&&
                    ai.get.attitude(player,event.player)<0){
                    return player.hp>event.player.hp&&player.hp>=2;
                }
                return false;
            },
            content:function(){
                game.delay();
                player.line(trigger.player,'green');
                player.loseHp();
                trigger.player.damage();
            }
        },
        rouquan:{
            mod:{
				selectTarget:function(card,player,range){
					if(card.name=='sha'&&!player.get('e','1')&&range[1]!=-1) range[1]=Infinity;
				}
			},
            enable:'phaseUse',
            position:'e',
            filter:function(event,player){
                return player.num('e')>0;
            },
            filterCard:true,
            prompt:'弃置要重铸的牌并摸一张牌',
            discard:false,
            delay:0.5,
            check:function(card,player){
                var val=ai.get.equipValue(card);
                var player=_status.event.player;
                var cards=player.get('h',{subtype:get.subtype(card)});
                for(var i=0;i<cards.length;i++){
                    if(ai.get.equipValue(cards[i])>=val){
                        return 1;
                    }
                }
                return 0;
            },
            prepare:function(cards,player){
                player.$throw(cards,1000);
            },
            content:function(){
                "step 0"
                player.draw();
                "step 1"
                for(var i=0;i<cards.length;i++){
                    ui.discardPile.appendChild(cards[i]);
                }
            },
            ai:{
                order:9.5,
                result:{
                    player:1
                }
            }
        },
        gzhenji:{
            trigger:{source:'damageEnd'},
            frequent:true,
            filter:function(event,player){
                return _status.currentPhase==player&&event.card&&event.card.name=='sha';
            },
            content:function(){
                player.draw();
                player.addTempSkill('gzhenji3','phaseAfter');
            }
        },
        gzhenji3:{
            mod:{
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num+1;
				}
			},
        },
        zuijian:{
			enable:'phaseUse',
			filterCard:true,
            position:'he',
			viewAs:{name:'jiu'},
			viewAsFilter:function(player){
				if(!player.num('he')) return false;
			},
			prompt:'将一张手牌或装备牌当酒使用',
			check:function(card){
				return 4-ai.get.value(card);
			},
            mod:{
				attackFrom:function(from,to,distance){
					if(from.skills.contains('jiu')) return distance-1;
				}
			},
			ai:{
				skillTagFilter:function(player){
					return player.num('he')>0;
				},
				threaten:1.2
			}
		},
        zitong:{
            trigger:{player:'useCard'},
            frequent:true,
            filter:function(event,player){
                return _status.currentPhase==player&&get.cardCount(true,player)==3;
            },
            content:function(){
                var card=get.cardPile('chuansongmen');
                if(!card){
                    card=game.createCard('chuansongmen');
                }
                player.gain(card,'gain2');
            },
            ai:{
                threaten:1.2
            }
        }
    },
    translate:{
        xk_dongfangweiming:'东方未明',
		xk_guyuexuan:'谷月轩',
		xk_jinji:'荆棘',
        xk_shenxiangyun:'沈湘芸',
        xk_fujianhan:'傅剑寒',
        xueren:'血刃',
        xueren_info:'每当你造成一次伤害，你可流失一点体力并对目标再造成一点伤害',
        gzhenji:'震击',
        gzhenji_info:'你使用杀造成伤害后，可以摸一张牌，并且本回合内可以额外使用一张杀',
        rouquan:'柔拳',
        rouquan_info:'你可以重铸装备区内的牌；当你没有武器牌时，你的杀可以指定任意个目标',
        zuijian:'醉剑',
        zuijian_info:'出牌阶段，你可以将一张手牌或装备牌当酒使用；当你使用酒后，你的攻击范围+1',
        zitong:'通悟',
        zitong_info:'当你于自己的回合内使用第三张牌时，你可以将一张传送门置于你的手牌',
    },
}
