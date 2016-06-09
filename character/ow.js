'use strict';
character.ow={
    character:{
        ow_liekong:['female','shu',3,['shanxian','shanhui']],
        // ow_heibaihe:['female','shu',3,[]],
        ow_sishen:['male','shu',3,['hongxi','anying']],
        ow_tianshi:['female','qun',3,['shouhu','ziyu','feiying']],
        ow_falaozhiying:['female','shu',3,['dangji','huoyu','feiying']],
        ow_zhixuzhiguang:['female','qun',3,['guangshu']],
        ow_luxiao:['male','wu',3,['yuedong','kuoyin','huhuan']],
        ow_shibing:['female','shu',3,[]],
        ow_yuanshi:['female','shu',3,[]],
        // ow_mei:['female','shu',3,[]],
        // ow_baolei:['female','shu',3,[]],
        ow_chanyata:['female','shu',3,[]],
    },
    skill:{
        huoyu:{
            enable:'phaseUse',
            unique:true,
			mark:true,
			skillAnimation:true,
			animationColor:'fire',
			init:function(player){
				player.storage.huoyu=false;
			},
			filter:function(event,player){
				if(player.storage.huoyu) return false;
                return true;
			},
            filterTarget:function(card,player,target){
                return player.canUse('chiyuxi',target);
            },
            filterCard:{color:'red'},
            selectCard:2,
            position:'he',
            check:function(card){
                return 7-ai.get.value(card);
            },
            selectTarget:-1,
            multitarget:true,
            multiline:true,
            line:'fire',
			content:function(){
				'step 0'
                targets.sort(lib.sort.seat);
				player.unmarkSkill('huoyu');
				player.storage.huoyu=true;
                player.useCard({name:'chiyuxi'},targets).animate=false;
				'step 1'
                player.useCard({name:'chiyuxi'},targets).animate=false;
			},
			ai:{
				order:5,
				result:{
					target:function(player,target){
                        if(player.hasUnknown()) return 0;
                        return ai.get.effect(target,{name:'chiyuxi'},player,target);
                    }
				},
			},
			intro:{
				content:'limited'
			}
        },
        dangji:{
			trigger:{source:'damageAfter'},
			direct:true,
			filter:function(event,player){
				if(player.num('he')==0) return false;
				if(!event.card) return false;
				if(event.card.name!='sha') return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=event.player&&get.distance(event.player,game.players[i])<=1) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
                var eff=0;
                var targets=[];
                event.targets=targets;
                for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=trigger.player&&get.distance(trigger.player,game.players[i])<=1){
                        eff+=ai.get.damageEffect(game.players[i],player,player);
                        targets.push(game.players[i]);
                    }
				}
                player.chooseToDiscard('是否发动【荡击】？').set('ai',function(card){
                    if(eff>0) return 7-ai.get.value(card);
                    return 0;
                }).set('logSkill',['dangji',targets]);
				"step 1"
				if(result.bool){
					event.targets.sort(lib.sort.seat);
				}
                else{
                    event.finish();
                }
                "step 2"
                if(event.targets.length){
                    event.targets.shift().damage();
                    event.redo();
                }
			},
            mod:{
                targetInRange:function(card,player,target){
                    if(card.name=='sha'){
                        if(get.distance(player,target)<=1) return false;
                        return true;
                    }
                }
            }
		},
        yuedong:{
            trigger:{player:'phaseEnd'},
            direct:true,
            content:function(){
                'step 0'
                var num=1+player.storage.yuedong_num;
                player.chooseTarget('是否发动【乐动】？',[1,num],function(card,player,target){
                    if(player.storage.yuedong_recover){
                        return target.hp<target.maxHp;
                    }
                    return true;
                }).set('ai',function(target){
                    if(player.storage.yuedong_recover){
                        return ai.get.recoverEffect(target,player,player);
                    }
                    return ai.get.attitude(player,target)/Math.sqrt(2+target.num('h'));
                });
                'step 1'
                if(result.bool){
                    player.logSkill('yuedong',result.targets);
                    var eff=1+player.storage.yuedong_eff;
                    if(player.storage.yuedong_recover){
                        result.targets.sort(lib.sort.seat);
                        for(var i=0;i<result.targets.length;i++){
                            result.targets[i].recover(eff);
                        }
                    }
                    else{
                        game.asyncDraw(result.targets,eff);
                    }
                }
            },
            ai:{
                expose:0.2,
                threaten:1.6
            }
        },
        huhuan:{
            enable:'phaseUse',
            filterCard:true,
            selectCard:2,
            position:'he',
            filter:function(event,player){
                return player.num('he')>1&&!player.storage.yuedong_recover;
            },
            check:function(card){
                return 6-ai.get.value(card);
            },
            content:function(){
                player.storage.yuedong_recover=true;
            },
            ai:{
                order:10.2,
                result:{
                    player:function(player){
                        var num1=0,num2=0;
                        for(var i=0;i<game.players.length;i++){
                            if(ai.get.attitude(player,game.players[i])>0){
                                num2++;
                                if(game.players[i].hp<=2&&game.players[i].maxHp>2){
                                    num1++;
                                    if(game.players[i].hp==1){
                                        num1++;
                                    }
                                }
                            }
                        }
                        if(num1>=3){
                            return 1;
                        }
                        return 0;
                    }
                }
            }
        },
        kuoyin:{
            enable:'phaseUse',
            filterCard:true,
            selectCard:function(){
                if(_status.event.player.storage.yuedong_eff) return 1;
                return [1,2];
            },
            position:'he',
            filter:function(event,player){
                if(player.storage.yuedong_eff&&player.storage.yuedong_num) return false;
                return player.num('he')>0;
            },
            check:function(card){
                var player=_status.event.player;
                var num1=0,num2=0;
                for(var i=0;i<game.players.length;i++){
                    if(ai.get.attitude(player,game.players[i])>0){
                        num2++;
                        if(game.players[i].hp<=2&&game.players[i].maxHp>2){
                            num1++;
                        }
                    }
                }
                if(player.storage.yuedong_recover){
                    if(num1>1&&!player.storage.yuedong_num){
                        if(ui.selected.cards.length) return 0;
                        return 7-ai.get.value(card);
                    }
                    return 0;
                }
                else{
                    if(num2>1&&!player.storage.yuedong_num){
                        if(ui.selected.cards.length) return 0;
                        return 7-ai.get.value(card);
                    }
                    if(num2>2){
                        return 6-ai.get.value(card);
                    }
                    return 5-ai.get.value(card);
                }
            },
            content:function(){
                if(cards.length==1){
                    player.storage.yuedong_num+=2;
                }
                else{
                    player.storage.yuedong_eff++;
                }
            },
            ai:{
                threaten:1.6,
                order:10.1,
                result:{
                    player:1
                }
            },
            group:'kuoyin2'
        },
        kuoyin2:{
            trigger:{player:'phaseBegin'},
            forced:true,
            popup:false,
            silent:true,
            content:function(){
                player.storage.yuedong_recover=false;
                player.storage.yuedong_num=0;
                player.storage.yuedong_eff=0;
            }
        },
        guangshu:{
            enable:'phaseUse',
            check:function(card){
                var suit=get.suit(card);
                if(suit=='heart'){
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].hp==1&&ai.get.attitude(player,game.players[i])>0){
                            return 8-ai.get.value(card);
                        }
                    }
                }
                else if(suit=='spade'){
                    return 7-ai.get.value(card);
                }
                return 6-ai.get.value(card);
            },
            filter:function(event,player){
                return player.num('he')>0;
            },
            filterTarget:function(card,player,target){
                return !target.hasSkill('guangshu_heart')&&
                    !target.hasSkill('guangshu_spade')&&
                    !target.hasSkill('guangshu_club')&&
                    !target.hasSkill('guangshu_diamond');
            },
            filterCard:true,
            position:'he',
            content:function(){
                target.addSkill('guangshu_'+get.suit(cards[0]));
            },
            ai:{
                expose:0.2,
                threaten:1.6,
                order:5,
                result:{
                    target:function(player,target){
                        if(!ui.selected.cards.length) return 0;
                        switch(get.suit(ui.selected.cards[0])){
                            case 'heart':if(target.hp==1) return 1;return 0.1;
                            case 'diamond':return 1+Math.sqrt(target.num('h'));
                            case 'club':return -target.num('h')-Math.sqrt(target.num('h','sha'));
                            case 'spade':return ai.get.damageEffect(target,player,target,'thunder');
                            default:return 0;
                        }
                    }
                }
            }
        },
        guangshu_diamond:{
            mark:true,
            intro:{
                content:'下次造成伤害时摸两张牌'
            },
            trigger:{source:'damageEnd'},
            forced:true,
            content:function(){
                player.draw(2);
                player.removeSkill('guangshu_diamond');
            }
        },
        guangshu_heart:{
            mark:true,
            intro:{
                content:'进入濒死状态时回复一点体力'
            },
            trigger:{player:'dying'},
            priority:6,
            forced:true,
            content:function(){
                player.recover();
                player.removeSkill('guangshu_heart');
            }
        },
        guangshu_club:{
            mark:true,
            intro:{
                content:'无法使用杀直到下一回合结束'
            },
            trigger:{player:'phaseEnd'},
            forced:true,
            popup:false,
            content:function(){
                player.removeSkill('guangshu_club');
            },
            mod:{
                cardEnabled:function(card){
                    if(card.name=='sha') return false;
                }
            }
        },
        guangshu_spade:{
            mark:true,
            intro:{
                content:'下个回合结束阶段受到一点无来源的雷电伤害'
            },
            trigger:{player:'phaseEnd'},
            forced:true,
            content:function(){
                player.damage('thunder','nosource');
                player.removeSkill('guangshu_spade');
            }
        },
        ziyu:{
            trigger:{global:'phaseEnd'},
            direct:true,
            filter:function(event,player){
                return game.phaseNumber%4==0;
            },
            content:function(){
                "step 0"
				var controls=['draw_card'];
				if(player.hp<player.maxHp){
					controls.push('recover_hp');
				}
				controls.push('cancel');
				player.chooseControl(controls).set('prompt','是否发动【自愈】？').set('ai',function(event,player){
					if(player.hp<player.maxHp) return 'recover_hp';
					return 'draw_card';
				});
				"step 1"
				if(result.control!='cancel'){
					player.logSkill('ziyu');
					if(result.control=='draw_card'){
						player.draw();
					}
					else{
						player.recover();
					}
				}
            }
        },
        ziyu_old:{
            trigger:{global:'phaseBegin'},
            direct:true,
			filter:function(event,player){
                return event.player.hasSkill('ziyu3');
			},
			content:function(){
				"step 0"
				var controls=['draw_card'];
				if(player.hp<player.maxHp){
					controls.push('recover_hp');
				}
				controls.push('cancel');
				player.chooseControl(controls).set('prompt','是否发动【自愈】？').set('ai',function(event,player){
					if(player.hp<player.maxHp) return 'recover_hp';
					return 'draw_card';
				});
				"step 1"
				if(result.control!='cancel'){
					player.logSkill('ziyu');
					if(result.control=='draw_card'){
						player.draw();
					}
					else{
						player.recover();
					}
				}
			},
            group:'ziyu2'
        },
        ziyu2:{
            trigger:{global:'recoverEnd'},
            forced:true,
            popup:false,
            silent:true,
            filter:function(event,player){
                return event.source==player&&event.player!=player;
            },
            content:function(){
                trigger.player.addTempSkill('ziyu3',{player:'phaseEnd'});
            }
        },
        ziyu3:{},
        shouhu:{
            mod:{
                cardEnabled:function(card){
                    if(card.name=='sha') return false;
                },
            },
            enable:'phaseUse',
            filter:function(event,player){
                return player.num('h','sha')>0;
            },
            filterTarget:function(card,player,target){
                return target.hp<target.maxHp&&target!=player;
            },
            content:function(){
                target.recover();
            },
            filterCard:{name:'sha'},
            ai:{
                order:7,
                threaten:2,
                result:{
                    target:function(player,target){
                        return ai.get.recoverEffect(target,player,target);
                    }
                }
            }
        },
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
        dangji:'荡击',
        dangji_info:'你的杀只能对距离1以外的角色使用；每当你使用杀造成伤害后，你可以弃置一张牌对距离目标1以内的其他角色各造成一点伤害',
        huoyu:'火雨',
        huoyu_info:'限定技，出牌阶段，你可以弃置两张红色牌，视为使用两张炽羽袭',
        yuedong:'乐动',
        yuedong_info:'回合结束阶段，你可以令一名角色摸一张牌',
        kuoyin:'扩音',
        kuoyin_info:'出牌阶段，你可以弃置一张牌令本回合乐动的目标数改为3，或弃置两张牌令本回合乐动的摸牌或治疗量改为2',
        huhuan:'互换',
        huhuan_info:'出牌阶段，你可以弃置两张牌令本回合乐动的摸牌效果改回复体力',
        guangshu:'光枢',
        guangshu_heart:'光盾',
        guangshu_spade:'光塔',
        guangshu_club:'光井',
        guangshu_diamond:'光流',
        guangshu_info:'出牌阶段，你可以弃置一张牌，并指定一名角色，根据弃置牌的花色执行如下效果：♥该角色进入濒死状态时回复一点体力；♦︎该角色下次造成伤害时摸两张牌；♣该角色无法使用杀直到下一回合结束；♠该角色于下个回合结束阶段受到一点无来源的雷电伤害',
        ziyu:'自愈',
        ziyu_info:'在一名角色的回合结束阶段，你可以回复一点体力或摸一张牌，每隔四回合发动一次',
        shouhu:'守护',
        shouhu_info:'你不能使用杀；出牌阶段，你可以弃置一张杀令一名其他角色回复一点体力',
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
