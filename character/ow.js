'use strict';
character.ow={
    character:{
        ow_liekong:['female','shu',3,['shanxian','shanhui']],
        // ow_heibaihe:['female','shu',3,[]],
        ow_sishen:['female','shu',3,[]],
        ow_tianshi:['female','shu',3,[]],
        ow_falaozhiying:['female','shu',3,[]],
        ow_zhixuzhiguang:['female','shu',3,[]],
        ow_luxiao:['female','shu',3,[]],
        ow_shibing:['female','shu',3,[]],
        ow_yuanshi:['female','shu',3,[]],
        // ow_mei:['female','shu',3,[]],
        // ow_baolei:['female','shu',3,[]],
        ow_chanyata:['female','shu',3,[]],
    },
    skill:{
        shanxian:{
			trigger:{global:'phaseBefore'},
			filter:function(event,player){
				return event.player!=player&&!player.isTurnedOver()&&!player.storage.shanxian;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<0&&
				((player.num('h')>player.hp&&player.num('h','lebu')==0)||get.distance(player,event.player)>1);
			},
			prompt:function(event,player){
				return '是否对'+get.translation(event.player)+'发动【闪现】？'
			},
			content:function(){
				"step 0"
                player.storage.shanxian_h=player.get('h');
                player.storage.shanxian_e=player.get('e');
                player.syncStorage('shanxian_e');
				player.line(trigger.player,'green');
				player.phase();
				player.storage.shanxian=trigger.player;
				"step 1"
				if(!player.isTurnedOver()){
					player.turnOver();
				}
				delete player.storage.shanxian;
			},
			mod:{
				targetInRange:function(card,player,target,now){
					if(target==player.storage.shanxian) return true;
				},
			},
			ai:{
                expose:0.1,
				effect:{
					target:function(card){
						if(card.name=='guiyoujie') return [0,0];
					}
				}
			}
		},
        shanhui:{
            unique:true,
            trigger:{player:'damageEnd'},
            filter:function(event,player){
                return player.storage.shanxian_h&&player.storage.shanxian_e;
            },
            check:function(event,player){
                var n1=player.num('he');
                var n2=player.storage.shanxian_h.length+player.storage.shanxian_e.length;
                if(n1==n2+1) return true;
                if(n2==n2+2&&player.hp<=1) return true;
                if(n1<n2) return true;
                return false;
            },
            video:function(player){
                var cards=player.get('he');
                for(var i=0;i<cards.length;i++){
                    cards[i].remove();
                }
                for(var i=0;i<player.storage.shanxian_e.length;i++){
                    player.$equip(player.storage.shanxian_e[i]);
                }
            },
            content:function(){
                game.addVideo('skill',player,'shanhui');
                for(var i=0;i<player.storage.shanxian_h.length;i++){
                    if(get.position(player.storage.shanxian_h[i])=='s'){
                        player.storage.shanxian_h[i]=game.createCard(player.storage.shanxian_h[i]);
                    }
                }
                for(var i=0;i<player.storage.shanxian_e.length;i++){
                    if(get.position(player.storage.shanxian_e[i])=='s'){
                        player.storage.shanxian_e[i]=game.createCard(player.storage.shanxian_e[i]);
                    }
                }
                var cards=player.get('he');
                for(var i=0;i<cards.length;i++){
                    ui.discardPile.appendChild(cards[i]);
                }
                player.directgain(player.storage.shanxian_h);
                for(var i=0;i<player.storage.shanxian_e.length;i++){
                    player.$equip(player.storage.shanxian_e[i]);
                }
                if(cards.length>player.storage.shanxian_h.length+player.storage.shanxian_e.length){
                    player.recover();
                }
                delete player.storage.shanxian_h;
                delete player.storage.shanxian_e;
            }
        }
    },
    translate:{
        shanxian:'闪现',
        shanxian_info:'在一名其他角色的回合开始前，若你的武将牌正面朝上，你可以进行一个额外回合，并在回合结束后将武将牌翻至背面。若如此做，你对其使用卡牌无视距离直到回合结束。',
        shanhui:'闪回',
        shanhui_info:'每当你受到一次伤害，你可以将你的牌重置为上次发动闪现前的状态，若你的牌数因此而减少，你回复一点体力',
        ow_liekong:'猎空',
        ow_sishen:'死神',
        ow_tianshi:'天使',
        ow_falaozhiying:'法老之鹰',
        ow_zhixuzhiguang:'秩序之光',
        ow_luxiao:'卢西奥',
        ow_shibing:'士兵76',
        ow_yuanshi:'源氏',
        ow_chanyata:'禅雅塔'
    }
};
