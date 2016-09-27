'use strict';
character.ow={
    character:{
        ow_liekong:['female','shu',3,['shanxian','shanhui']],
        ow_sishen:['male','shu',3,['xiandan','yihun','shouge']],
        ow_tianshi:['female','qun',3,['shouhu','ziyu','feiying']],
        ow_falaozhiying:['female','shu',3,['feidan','huoyu','feiying']],
        ow_zhixuzhiguang:['female','qun',3,['guangshu']],
        ow_luxiao:['male','wu',3,['yuedong','kuoyin','huhuan']],
        ow_shibing:['male','shu',4,['tuji','mujing']],
        ow_yuanshi:['male','qun',3,['feiren','lianpo','zhanlong']],
        ow_chanyata:['male','qun',3,['xie','luan','sheng']],
        ow_dva:['female','shu',2,['jijia','tuijin','zihui','chongzhuang']],
        ow_mei:['female','wei',3,['bingqiang','jidong','baoxue']],
        ow_ana:['female','wei',3,['zhiyuan','mianzhen','aqianghua']],
        ow_heibaihe:['female','qun',3,['juji','duwen','dulei']],
        ow_maikelei:['male','shu',4,['shanguang','tiandan','shenqiang']],
        ow_kuangshu:['male','shu',3,['liudan','shoujia','shihuo']],

        ow_tuobiang:['male','shu',3,['paotai','maoding']],
        // ow_baolei:['female','shu',3,[]],
        ow_banzang:['male','qun',4,['fengshi','yinbo']],
        ow_laiyinhate:['male','qun',4,['lzhongjia','mengji']],
        // ow_luba:['male','shu',4,[]],
        // ow_wensidun:['male','shu',4,[]],
        // ow_zhaliya:['female','shu',4,['pingzhang','lichang']],
    },
    skill:{
        mengji:{
            trigger:{source:'damageBegin'},
            forced:true,
            filter:function(event,player){
                return player.storage.zhongjia&&!player.hujia&&event.card&&event.card.name=='sha'&&event.notLink();
            },
            content:function(){
                trigger.num++;
            }
        },
        lzhongjia:{
            init2:function(player){
                if(!player.storage.zhongjia){
                    player.changeHujia(8);
                    player.storage.zhongjia=true;
                }
            },
            enable:'phaseUse',
            usable:1,
            filter:function(event,player){
                return player.hujia>0;
            },
            filterTarget:function(card,player,target){
                return !target.hujia;
            },
            filterCard:true,
            position:'he',
            check:function(card){
                var player=_status.event.player;
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].hp==1&&ai.get.attitude(player,game.players[i])>2){
                        return 7-ai.get.value(card);
                    }
                }
                return 5-ai.get.value(card);
            },
            content:function(){
                player.changeHujia(-1);
                target.changeHujia();
            },
            ai:{
                order:5,
                expose:0.2,
                return:{
                    target:function(player,target){
                        return 1/Math.max(1,target.hp);
                    }
                }
            }
        },
        maoding:{
            trigger:{player:'damageEnd',source:'damageEnd'},
            frequent:true,
            content:function(){
                player.gain(game.createCard(get.typeCard('hslingjian').randomGet()),'gain2');
            },
            group:'maoding2'
        },
        maoding2:{
            enable:'phaseUse',
            filter:function(event,player){
                return player.num('h',{type:'hslingjian'})>1;
            },
            filterCard:{type:'hslingjian'},
            filterTarget:true,
            selectCard:2,
            usable:1,
            content:function(){
                target.changeHujia();
            },
            ai:{
				order:9,
				result:{
					target:function(player,target){
						return 2/Math.max(1,Math.sqrt(target.hp));
					},
				},
			}
        },
        paotai:{
            enable:'phaseUse',
            intro:{
                content:function(storage){
                    var num;
                    switch(storage){
                        case 1:num=30;break;
                        case 2:num=60;break;
                        case 3:num=100;break;
                    }
                    return '回合结束阶段，有'+num+'%机率对一名随机敌人造成一点火焰伤害';
                }
            },
            init:function(player){
                player.storage.paotai=0;
            },
            filter:function(event,player){
                return player.num('h','sha')>0&&player.storage.paotai<3;
            },
            filterCard:{name:'sha'},
            content:function(){
                player.storage.paotai++;
                player.markSkill('paotai');
            },
            ai:{
                order:5,
                threaten:1.5,
                result:{
                    player:1
                }
            },
            group:['paotai2','paotai3']
        },
        paotai2:{
            trigger:{player:'phaseEnd'},
            forced:true,
            filter:function(event,player){
                var num=0;
                switch(player.storage.paotai){
                    case 1:num=30;break;
                    case 2:num=60;break;
                    case 3:num=100;break;
                }
                return 100*Math.random()<num;
            },
            content:function(){
                var targets=player.getEnemies();
                if(targets.length){
                    var target=targets.randomGet();
                    target.addExpose(0.3);
                    player.addExpose(0.3);
                    target.damage('fire');
                    player.line(target,'fire');
                }
            }
        },
        paotai3:{
            trigger:{player:'damageEnd'},
            forced:true,
            popup:false,
            filter:function(event,player){
                return event.card&&event.card.name=='sha'&&player.storage.paotai>0;
            },
            content:function(){
                player.storage.paotai--;
                if(player.storage.paotai==0){
                    player.unmarkSkill('paotai');
                }
                else{
                    player.updateMarks();
                }
            }
        },
        fengshi:{
            trigger:{player:'shaBegin'},
            forced:true,
			check:function(event,player){
				return ai.get.attitude(player,event.target)<=0;
			},
			filter:function(event,player){
				return Math.random()<0.2*get.cardCount(true,player);
			},
			content:function(){
				trigger.directHit=true;
			},
            mod:{
                attackFrom:function(from,to,distance){
                    return distance-get.cardCount(true,from);
                }
            },
            group:'fengshi2'
        },
        fengshi2:{
            trigger:{source:'damageBegin'},
            forced:true,
			check:function(event,player){
				return ai.get.attitude(player,event.target)<=0;
			},
            filter:function(event,player){
                return event.card&&event.card.name=='sha'&&Math.random()<0.2*get.cardCount(true,player);
            },
            content:function(){
                trigger.num++;
            }
        },
        yinbo:{
            enable:'phaseUse',
            usable:1,
            filterCard:{suit:'spade'},
            position:'he',
            filter:function(event,player){
                return player.num('he',{suit:'spade'})>0;
            },
            check:function(card){
                return 7-ai.get.value(card);
            },
            content:function(){
                'step 0'
                var targets=player.getEnemies(function(target){
                    return target.num('he')>0;
                });
                if(targets.length){
                    event.targets=targets.randomGets(3);
                    event.targets.sort(lib.sort.seat);
                    player.line(event.targets,'green');
                    if(lib.config.mode=='identity'||lib.config.mode=='guozhan'){
                        for(var i=0;i<event.targets.length;i++){
                            event.targets[i].addExpose(0.3);
                        }
                    }
                }
                'step 1'
                if(event.targets.length){
                    var target=event.targets.shift();
                    var he=target.get('he');
                    if(he.length){
                        target.discard(he.randomGet());
                    }
                    event.redo();
                }
            },
            ai:{
                order:10,
                expose:0.3,
                result:{
                    player:1
                }
            }
        },
        aqianghua:{
            enable:'phaseUse',
            usable:1,
            filter:function(event,player){
                return player.num('h')>=1;
            },
            filterTarget:function(card,player,target){
                return target!=player;
            },
            filterCard:true,
            selectCard:-1,
            discard:false,
            prepare:function(cards,player,targets){
                player.$give(cards,targets[0]);
            },
            content:function(){
                target.gain(cards);
                target.changeHujia();
                target.addSkill('aqianghua2');
            },
            ai:{
                threaten:1.5,
                order:2.1,
                    result:{
                    target:function(player,target){
                        if(ai.get.attitude(player,target)<3) return 0;
                        if(target.num('j','lebu')) return 0;
                        if(target.hasSkill('aqianghua2')) return 0.1;
                        return 1;
                    }
                }
            }
        },
        aqianghua2:{
            trigger:{source:'damageBegin'},
            forced:true,
            content:function(){
                trigger.num++;
                player.unmarkSkill('aqianghua2');
                player.removeSkill('aqianghua2');
            },
            mark:true,
            intro:{
                content:'下一次造成的伤害+1'
            }
        },
        shihuo:{
            trigger:{global:'damageEnd'},
            forced:true,
            filter:function(event){
                return event.nature=='fire';
            },
            content:function(){
                player.draw();
            }
        },
        shoujia:{
			enable:'phaseUse',
            usable:1,
			filter:function(event,player){
				return player.num('h')>0;
			},
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(1,targets[0]);
			},
            filterTarget:function(card,player,target){
                return target!=player&&!target.hasSkill('shoujia2');
            },
			content:function(){
				target.storage.shoujia=cards[0];
                target.storage.shoujia2=player;
				target.addSkill('shoujia2');
                target.syncStorage('shoujia');
			},
			ai:{
				order:1,
                expose:0.2,
                threaten:1.4,
				result:{
					target:-1
				}
			}
		},
		shoujia2:{
			mark:true,
			trigger:{player:'useCardToBegin'},
			forced:true,
			filter:function(event,player){
				return get.suit(event.card)==get.suit(player.storage.shoujia)&&event.target!=player;
			},
			content:function(){
				'step 0'
				player.showCards([player.storage.shoujia],get.translation(player)+'发动了【兽夹】');
				'step 1'
				ui.discardPile.appendChild(player.storage.shoujia);
                delete player.storage.shoujia;
				delete player.storage.shoujia2;
				player.removeSkill('shoujia2');
                game.addVideo('storage',player,['shoujia',null]);
				game.addVideo('storage',player,['shoujia2',null]);
				if(!player.isTurnedOver()){
                    player.turnOver();
                }
			},
			intro:{
				mark:function(dialog,content,player){
					if(player.storage.shoujia2&&player.storage.shoujia2.isUnderControl(true)){
						dialog.add([player.storage.shoujia]);
					}
                    else{
                        return '已成为'+get.translation(player.storage.shoujia2)+'的兽夹目标';
                    }
				},
				content:function(content,player){
					if(player.storage.shoujia2&&player.storage.shoujia2.isUnderControl(true)){
						return get.translation(player.storage.shoujia);
					}
					return '已成为'+get.translation(player.storage.shoujia2)+'的兽夹目标';
				}
			},
            group:'shoujia3'
		},
        shoujia3:{
            trigger:{source:'damageEnd'},
            forced:true,
            filter:function(event,player){
                return event.player==player.storage.shoujia2;
            },
            content:function(){
                ui.discardPile.appendChild(player.storage.shoujia);
                player.$throw(player.storage.shoujia);
                delete player.storage.shoujia;
				delete player.storage.shoujia2;
				player.removeSkill('shoujia2');
                game.addVideo('storage',player,['shoujia',null]);
				game.addVideo('storage',player,['shoujia2',null]);
            }
        },
        liudan:{
			trigger:{player:'useCard'},
            check:function(event,player){
                var list=[];
                for(var i=0;i<game.players.length;i++){
					if(event.targets.contains(game.players[i])==false&&
					game.players[i]!=player&&
					lib.filter.targetEnabled(event.card,player,game.players[i])){
						list.push(game.players[i]);
					}
				}
				var num=0;
                for(var i=0;i<list.length;i++){
                    num+=ai.get.effect(list[i],event.card,player,player);
                }
                return num>=0;
            },
			filter:function(event,player){
				if(event.card.name!='sha') return false;
				for(var i=0;i<game.players.length;i++){
					if(event.targets.contains(game.players[i])==false&&
					game.players[i]!=player&&
					lib.filter.targetEnabled(event.card,player,game.players[i])){
						return true;
					}
				}
				return false;
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(trigger.targets.contains(game.players[i])==false&&
					game.players[i]!=player&&
					lib.filter.targetEnabled(trigger.card,player,game.players[i])){
						list.push(game.players[i]);
					}
				}
				if(list.length){
                    var list2=[];
                    for(var i=0;i<list.length;i++){
                        if(Math.random()<0.5){
                            list2.push(list[i]);
                            trigger.targets.push(list[i]);
                        }
                    }
                    if(list2.length){
                        game.log(list2,'被追加为额外目标');
                        player.line(list2,'green');
                    }
				}
			}
		},
        shenqiang:{
            trigger:{source:'damageEnd'},
            forced:true,
            filter:function(event,player){
                return event.card&&event.card.name=='sha'&&_status.currentPhase==player;
            },
            content:function(){
                player.getStat().card.sha--;
            }
        },
        tiandan:{
            trigger:{player:'phaseDrawBegin'},
            filter:function(event,player){
                return Math.min(5,player.hp)>player.num('h')&&!player.skipList.contains('phaseUse')&&!player.skipList.contains('phaseDiscard');
            },
            check:function(event,player){
                var nh=player.num('h');
                if(Math.min(5,player.hp)-nh>=2) return true;
                return false;
            },
            content:function(){
                var num=Math.min(5,player.hp)-player.num('h');
                var cards=[];
                while(num--){
                    cards.push(game.createCard('sha'));
                }
                player.gain(cards,'gain2');
                player.skip('phaseUse');
                player.skip('phaseDiscard');
            }
        },
        shanguang:{
            enable:'phaseUse',
            usable:1,
            filterCard:{suit:'diamond'},
            position:'he',
            filter:function(event,player){
                return player.num('he',{suit:'diamond'})>0;
            },
            filterTarget:function(card,player,target){
                return target!=player&&get.distance(player,target,'attack')<=1;
            },
            check:function(card){
                return 6-ai.get.value(card);
            },
            content:function(){
                target.addTempSkill('shanguang2','phaseAfter');
            },
            ai:{
                order:7.9,
                result:{
                    target:function(player,target){
                        var nh=target.num('h');
                        if(ai.get.attitude(player,target)<0&&nh>=3&&
                        player.canUse('sha',target)&&player.num('h','sha')&&
                        ai.get.effect(target,{name:'sha'},player,player)>0){
                            return -nh-5;
                        }
                        return -nh;
                    }
                }
            }
        },
        shanguang2:{
            mod:{
				cardEnabled:function(){
					return false;
				},
				cardUsable:function(){
					return false;
				},
				cardRespondable:function(){
					return false;
				},
				cardSavable:function(){
					return false;
				}
			},
            ai:{
                effect:{
                    target:function(card,player,target,current){
                        if(get.tag(card,'respondShan')||get.tag(card,'respondSha')){
                            if(current<0) return 1.5;
                        }
                    }
                }
            }
        },
        baoxue:{
            enable:'phaseUse',
            init:function(player){
                player.storage.baoxue=false;
            },
            intro:{
                content:'limited'
            },
            mark:true,
            unique:true,
            skillAnimation:true,
            animationColor:'water',
            line:'thunder',
            filter:function(event,player){
                return !player.storage.baoxue&&player.num('he',{color:'black'})>0;
            },
            filterTarget:function(card,player,target){
                return target!=player;
            },
            selectTarget:function(){
                return [1,_status.event.player.num('he',{color:'black'})];
            },
            content:function(){
                'step 0'
                if(target==targets[0]){
                    player.storage.baoxue=true;
                    player.unmarkSkill('baoxue');
                    player.showHandcards();
                    player.discard(player.get('he',{color:'black'}));
                }
                'step 1'
                var he=target.get('he');
                if(he.length){
                    target.discard(he.randomGet());
                }
                'step 2'
                if(!target.isTurnedOver()){
                    target.turnOver();
                }

            },
            ai:{
                order:function(skill,player){
                    var num=0;
                    var nh=player.num('h',{color:'black'});
                    for(var i=0;i<game.players.length;i++){
                        if(ai.get.attitude(player,game.players[i])<0){
                            num++;
                        }
                    }
                    if(nh==1&&num>1) return 0;
                    if(nh>num) return 1;
                    return 11;
                },
                result:{
                    target:function(player,target){
                        var mode=get.mode();
						if(mode=='identity'||mode=='guozhan'){
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].ai.shown<=0) return 0;
							}
						}
                        return -1;
                    }
                }
            }
        },
        mianzhen:{
            enable:'phaseUse',
            usable:1,
            filter:function(event,player){
                return player.num('he')>0;
            },
            filterTarget:function(card,player,target){
                return target!=player&&!target.hasSkill('mianzhen2');
            },
            filterCard:true,
            position:'he',
            check:function(card){
                return 8-ai.get.value(card);
            },
            content:function(){
                'step 0'
                target.chooseToRespond({name:'shan'});
                'step 1'
                if(!result.bool) target.addSkill('mianzhen2');
            },
            ai:{
                order:2.2,
                result:{
                    target:function(player,target){
                        return Math.min(-0.1,-1-target.num('h')+Math.sqrt(target.hp)/2);
                    }
                }
            }
        },
        mianzhen2:{
            mark:true,
            intro:{
                content:'不能使用或打出手牌直到受到伤害或下一回合结束'
            },
            trigger:{player:['damageEnd','phaseEnd']},
            forced:true,
            popup:false,
			content:function(){
				player.removeSkill('mianzhen2');
			},
			mod:{
				cardEnabled:function(){
					return false;
				},
				cardUsable:function(){
					return false;
				},
				cardRespondable:function(){
					return false;
				},
				cardSavable:function(){
					return false;
				}
			},
        },
        zhiyuan:{
            trigger:{source:'damageBefore'},
            check:function(event,player){
                if(event.player.hp<event.player.maxHp&&ai.get.attitude(player,event.player)<0) return false;
                player.disabledSkills.temp='zhiyuan';
                var num=ai.get.damageEffect(event.player,player,player,event.nature)<ai.get.recoverEffect(event.player,player,player);
                delete player.disabledSkills.temp;
                return num;
            },
            logTarget:'player',
            filter:function(event,player){
                return event.num>0;
            },
            content:function(){
                trigger.untrigger();
                trigger.finish();
                trigger.player.recover(trigger.num);
            },
            ai:{
                effect:{
                    player:function(card,player,target){
                        if(get.tag(card,'damage')&&ai.get.attitude(player,target)>0){
                            if(target.hp==target.maxHp) return [0,0,0,0];
                            return [0,0,0,1];
                        }
                    }
                }
            }
        },
        duwen:{
            trigger:{source:'damageBegin'},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<=0;
			},
			forced:true,
			filter:function(event,player){
				return player.num('h')==event.player.num('h')&&event.notLink();
			},
			content:function(){
                trigger.num++;
			},
            ai:{
                threaten:1.5
            },
        },
        duwen2:{
            trigger:{source:'damageEnd'},
            forced:true,
            filter:function(event,player){
                return event.card&&event.card.name=='sha'&&player.hp==event.player.hp&&event.notLink();
            },
            content:function(){
                player.draw(2);
            }
        },
        juji:{
            enable:'phaseUse',
            usable:1,
            position:'he',
            filter:function(event,player){
                return player.num('he')>0;
            },
            filterCard:function(card){
                var suit=get.suit(card);
                for(var i=0;i<ui.selected.cards.length;i++){
                    if(get.suit(ui.selected.cards[i])==suit) return false;
                }
                return true;
            },
            filterTarget:function(card,player,target){
                return target!=player&&target.num('h')>0;
            },
            check:function(card){
                if(ui.selected.cards.length>1) return 0;
                return 5-ai.get.value(card);
            },
            selectCard:[1,4],
            content:function(){
                var suits=[];
                for(var i=0;i<cards.length;i++){
                    suits.push(get.suit(cards[i]));
                }
                var success=false;
                for(var i=0;i<suits.length;i++){
                    if(target.num('h',{suit:suits[i]})){
                        success=true;break;
                    }
                }
                if(!success){
                    player.popup('失败');
                }
                else{
                    player.popup('成功');
                    player.addSkill('juji2');
                    player.storage.juji2=target;
                    player.markSkillCharacter('juji2',target,'狙击','与'+get.translation(target)+'的距离视为1且'+get.translation(target)+'不能闪避你的杀，直到回合结束');
                }
            },
            ai:{
                order:4,
                result:{
                    target:function(player,target){
                        if(!player.num('h','sha')) return 0;
                        if(target.num('h')<=1&&get.distance(player,target,'attack')<=1) return 0;
                        var min=[];
                        var num=0;
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]!=player&&
                                player.canUse('sha',game.players[i],false)){
                                var eff=ai.get.effect(target,{name:'sha'},player,player);
                                if(eff>num){
                                    min.length=0;
                                    min.push(game.players[i]);
                                    num=eff;
                                }
                            }
                        }
                        for(var i=0;i<min.length;i++){
                            if(ai.get.attitude(player,min[i])>0) return 0;
                            if(min[i].num('h')<=1&&get.distance(player,min[i],'attack')<=1) return 0;
                        }
                        if(min.contains(target)) return -1;
                        return 0;
                    }
                }
            },
        },
        juji2:{
            ai:{
                effect:{
                    player:function(card,player,target){
                        if(card.name=='sha'&&target==player.storage.juji2) return [1,0,1,-1];
                    }
                }
            },
            trigger:{player:'phaseAfter'},
            forced:true,
            popup:false,
            content:function(){
                player.unmarkSkill('juji2');
                player.removeSkill('juji2');
                delete player.storage.juji2;
            },
            group:'juji3'
        },
        juji3:{
            trigger:{player:'shaBegin'},
			forced:true,
			filter:function(event,player){
				return event.target==player.storage.juji2;
			},
			content:function(){
				trigger.directHit=true;
			},
            mod:{
                globalFrom:function(from,to){
                    if(to==from.storage.juji2) return -Infinity;
                }
            }
        },
        dulei:{
			enable:'phaseUse',
			filter:function(event,player){
				return !player.hasSkill('dulei2');
			},
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player){
				player.$give(1,player);
			},
			content:function(){
				player.storage.dulei=cards[0];
				player.addSkill('dulei2');
                player.syncStorage('dulei');
			},
			ai:{
				order:1,
				result:{
					player:1
				}
			}
		},
		dulei2:{
			mark:true,
			trigger:{target:'useCardToBegin'},
			forced:true,
			filter:function(event,player){
				return event.player!=player&&get.suit(event.card)==get.suit(player.storage.dulei);
			},
			content:function(){
				'step 0'
				player.showCards([player.storage.dulei],get.translation(player)+'发动了【诡雷】');
				'step 1'
				ui.discardPile.appendChild(player.storage.dulei);
				delete player.storage.dulei;
				player.removeSkill('dulei2');
				game.addVideo('storage',player,['dulei',null]);
				trigger.player.loseHp();
                'step 2'
                var he=trigger.player.get('he');
                if(he.length){
                    trigger.player.discard(he.randomGet());
                }
			},
			intro:{
				mark:function(dialog,content,player){
					if(player==game.me||player.isUnderControl()){
						dialog.add([player.storage.dulei]);
					}
					else{
						return '已发动诡雷';
					}
				},
				content:function(content,player){
					if(player==game.me||player.isUnderControl()){
						return get.translation(player.storage.dulei);
					}
					return '已发动诡雷';
				}
			}
		},
        juji_old:{
			trigger:{player:'shaBegin'},
			forced:true,
			filter:function(event,player){
				return get.distance(event.target,player,'attack')>1;
			},
			content:function(){
				trigger.directHit=true;
			},
            group:'juji2'
		},
        juji2_old:{
            enable:'phaseUse',
            usable:1,
            filterTarget:function(card,player,target){
                return target!=player;
            },
            content:function(){
                target.addTempSkill('juji3',{player:'phaseEnd'});
                if(!target.storage.juji3){
                    target.storage.juji3=[];
                }
                target.storage.juji3.push(player);
            },
            mod:{
                targetInRange:function(card,player,target){
                    if(target.hasSkill('juji3')&&Array.isArray(target.storage.juji3)&&target.storage.juji3.contains(player)){
                        return true;
                    }
                }
            }
        },
        juji3_old:{
            mark:true,
            intro:{
                nocount:true,
                content:function(storage){
                    return '对'+get.translation(storage)+'使用卡牌无视距离';
                }
            },
            mod:{
                targetInRange:function(card,player,target){
                    if(Array.isArray(player.storage.juji3)&&player.storage.juji3.contains(target)){
                        return true;
                    }
                }
            }
        },
        zhuagou:{
			enable:'phaseUse',
			usable:1,
			changeSeat:true,
			filterTarget:function(card,player,target){
				return player!=target&&player.next!=target;
			},
			filterCard:true,
			check:function(card){
				return 4-ai.get.value(card);
			},
			content:function(){
				while(player.next!=target){
					game.swapSeat(player,player.next);
				}
			},
			ai:{
				order:5,
				result:{
					player:function(player,target){
						var att=ai.get.attitude(player,target);
						if(target==player.previous&&att>0) return 1;
						if(target==player.next.next&&ai.get.attitude(player,player.next)<0) return 1;
						return 0;
					}
				}
			}
		},
        bingqiang:{
            enable:'phaseUse',
            position:'he',
            filterCard:function(card){
                var color=get.color(card);
                for(var i=0;i<ui.selected.cards.length;i++){
                    if(get.color(ui.selected.cards[i])!=color) return false;
                }
                return true;
            },
            selectCard:[1,Infinity],
            filterTarget:function(card,player,target){
                return !target.hasSkill('bingqiang2')&&!target.hasSkill('bingqiang5')&&
                !target.next.hasSkill('bingqiang2')&&!target.next.hasSkill('bingqiang5')&&
                !target.previous.hasSkill('bingqiang2')&&!target.previous.hasSkill('bingqiang5');
            },
            check:function(card){
                if(ui.selected.cards.length) return 0;
                var player=_status.event.player;
                var max=0,min=0;
                for(var i=0;i<game.players.length;i++){
                    if(!lib.skill.bingqiang.filterTarget(null,player,game.players[i])) continue;
                    var num=lib.skill.bingqiang.ai.result.playerx(player,game.players[i]);
                    if(num>max){
                        max=num;
                    }
                    if(num<min){
                        min=num;
                    }
                }
                if(max==-min){
                    return 5-ai.get.value(card);
                }
                else if(max>-min){
                    if(get.color(card)=='red') return 5-ai.get.value(card);
                }
                else{
                    if(get.color(card)=='black') return 5-ai.get.value(card);
                }
                return 0;
            },
            changeTarget:function(player,targets){
                var target=targets[0];
                var add=game.filterPlayer(function(player){
                    return get.distance(target,player,'pure')==1;
                });
                for(var i=0;i<add.length;i++){
                    targets.add(add[i]);
                }
            },
            content:function(){
                if(get.color(cards[0])=='red'){
                    target.storage.bingqiang2=cards.length;
                    target.addSkill('bingqiang2');
                }
                else{
                    target.storage.bingqiang5=cards.length;
                    target.addSkill('bingqiang5');
                }
                if(!player.storage.bingqiang){
                    player.storage.bingqiang=[];
                }
                player.storage.bingqiang.add(target);
            },
            ai:{
                order:11,
                result:{
                    playerx:function(player,target){
                        var targets=game.filterPlayer(function(player){
                            return player==target||get.distance(target,player,'pure')==1;
                        });
                        var num=0;
                        for(var i=0;i<targets.length;i++){
                            num+=ai.get.attitude(player,targets[i]);
                        }
                        return num;
                    },
                    player:function(player,target){
                        var num=lib.skill.bingqiang.ai.result.playerx(player,target);
                        if(ui.selected.cards.length){
                            if(get.color(ui.selected.cards[0])=='black'){
                                return -num;
                            }
                            else{
                                return num;
                            }
                        }
                        return 0;
                    }
                }
            },
            group:'bingqiang_remove'
        },
        bingqiang_remove:{
            trigger:{player:['phaseBegin','dieBegin']},
            forced:true,
            popup:false,
            filter:function(event,player){
                return player.storage.bingqiang&&player.storage.bingqiang.length>0;
            },
            content:function(){
                for(var i=0;i<player.storage.bingqiang.length;i++){
                    player.storage.bingqiang[i].removeSkill('bingqiang2');
                    player.storage.bingqiang[i].removeSkill('bingqiang5');
                }
                player.storage.bingqiang=[];
            }
        },
        bingqiang_old:{
            trigger:{global:'phaseBegin'},
            direct:true,
            filter:function(event,player){
                return player.num('he')>0;
            },
            content:function(){
                'step 0'
                var goon=false;
                var goon2=false;
                var att=ai.get.attitude(player,trigger.player);
                if(att>0){
                    if(trigger.player.hp==1) goon=true;
                }
                else{
                    if(Math.random()<0.5) goon=true;
                }
                if(Math.random()<0.3) goon2=true;
                player.chooseToDiscard([1,player.num('h')],'he',get.prompt('bingqiang',trigger.player)).set('logSkill',['bingqiang',trigger.player]).ai=function(card){
                    if(ui.selected.cards.length) return 0;
                    if(goon) return 6-ai.get.value(card);
                    if(goon2) return 4-ai.get.value(card);
                    return 0;
                }
                'step 1'
                if(result.bool){
                    var num=result.cards.length;
                    event.num=num;
                    player.chooseControl('选项一','选项二','选项三','选项四',function(){
                        if(ai.get.attitude(player,trigger.player)>0){
                            if(Math.random()<0.7) return '选项一';
                            return '选项三';
                        }
                        else{
                            if(Math.random()<0.7) return '选项四';
                            return '选项二';
                        }
                        return '';
                    }).set('prompt','冰墙<br><br><div class="text center">选项一：防御距离+'+num+
                    '</div><br><div class="text center">选项二：防御距离-'+num+
                    '</div><br><div class="text center">选项三：进攻距离+'+num+
                    '</div><br><div class="text center">选项四：进攻距离-'+num+'</div>');
                }
                else{
                    event.finish();
                }
                'step 2'
                switch(result.control){
                    case '选项一':{
                        trigger.player.storage.bingqiang2=event.num;
                        trigger.player.addTempSkill('bingqiang2',{player:'phaseBegin'});
                        break;
                    }
                    case '选项二':{
                        trigger.player.storage.bingqiang3=event.num;
                        trigger.player.addTempSkill('bingqiang3',{player:'phaseBegin'});
                        break;
                    }
                    case '选项三':{
                        trigger.player.storage.bingqiang4=event.num;
                        trigger.player.addTempSkill('bingqiang4',{player:'phaseBegin'});
                        break;
                    }
                    case '选项四':{
                        trigger.player.storage.bingqiang5=event.num;
                        trigger.player.addTempSkill('bingqiang5',{player:'phaseBegin'});
                        break;
                    }
                }
            },
            ai:{
                expose:0.1
            }
        },
        bingqiang2:{
            mark:true,
            intro:{
                content:function(storage){
                    return '防御距离+'+storage;
                }
            },
            mod:{
				globalTo:function(from,to,distance){
                    if(typeof to.storage.bingqiang2=='number') return distance+to.storage.bingqiang2;
				},
			}
        },
        bingqiang3:{
            mark:true,
            intro:{
                content:function(storage){
                    return '防御距离-'+storage;
                }
            },
            mod:{
				globalTo:function(from,to,distance){
                    if(typeof to.storage.bingqiang3=='number') return distance-to.storage.bingqiang3;
				},
			}
        },
        bingqiang4:{
            mark:true,
            intro:{
                content:function(storage){
                    return '进攻距离+'+storage;
                }
            },
            mod:{
				globalFrom:function(from,to,distance){
					if(typeof from.storage.bingqiang4=='number') return distance-from.storage.bingqiang4;
				}
			}
        },
        bingqiang5:{
            mark:true,
            intro:{
                content:function(storage){
                    return '进攻距离-'+storage;
                }
            },
            mod:{
				globalFrom:function(from,to,distance){
					if(typeof from.storage.bingqiang5=='number') return distance+from.storage.bingqiang5;
				}
			}
        },
        shuangqiang:{
			trigger:{source:'damageBegin'},
			check:function(event,player){
				var att=ai.get.attitude(player,event.player);
				if(event.player.hp==1) return att>0;
				return att<=0;
			},
            logTarget:'player',
			filter:function(event,player){
				return !event.player.isTurnedOver()&&event.num>0;
			},
			content:function(){
				trigger.num--;
				trigger.player.draw();
				trigger.player.turnOver();
			}
		},
        jidong:{
            trigger:{global:'phaseEnd'},
            filter:function(event,player){
                return player.hp==1&&!player.isTurnedOver();
            },
            content:function(){
                'step 0'
                player.turnOver();
                player.recover(2);
                'step 1'
                if(player.isTurnedOver()){
                    player.addTempSkill('jidong2',{player:'turnOverAfter'});
                }
            },
            ai:{
                threaten:function(player,target){
                    if(target.hp==1) return 2;
                    return 1;
                }
            }
        },
        jidong2:{
            trigger:{player:'damageBefore'},
			forced:true,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				nofire:true,
				nothunder:true,
				nodamage:true,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'damage')) return [0,0];
					}
				},
			},
            mod:{
                targetEnabled:function(card,player,target){
                    if(player!=target) return false;
                }
            }
        },
        chongzhuang:{
            trigger:{source:'damageEnd'},
            forced:true,
            filter:function(event,player){
                return player.storage.jijia<=0&&event.num>0;
            },
            popup:false,
            unique:true,
            content:function(){
                player.storage.jijia2+=trigger.num;
                if(player.storage.jijia2>=4){
                    player.storage.jijia=4;
                    player.storage.jijia2=0;
                    player.markSkill('jijia');
                    if(lib.config.skill_animation){
                        player.logSkill('chongzhuang');
                        player.$skill('重装')
                    }
                }
            }
        },
        tuijin:{
            enable:'phaseUse',
            usable:1,
            unique:true,
            filter:function(event,player){
                if(player.storage.jijia>0){
                    for(var i=0;i<game.players.length;i++){
                        if(get.distance(player,game.players[i])>1) return true;
                    }
                }
                return false;
            },
            filterTarget:function(card,player,target){
                return target!=player&&get.distance(player,target)>1;
            },
            content:function(){
                player.storage.tuijin2=target;
                player.markSkillCharacter('tuijin2',target,'推进','与'+get.translation(target)+'的距离视为1，直到回合结束');
                player.addSkill('tuijin2');
            },
            ai:{
                order:11,
                result:{
                    target:function(player,target){
                        if(ai.get.attitude(player,target)<0){
                            if(get.distance(player,target)>2) return -1.5;
                            return -1;
                        }
                        return 0.3;
                    }
                }
            }
        },
        tuijin2:{
            mod:{
                globalFrom:function(from,to){
                    if(to==from.storage.tuijin2) return -Infinity;
                }
            },
            trigger:{player:'phaseEnd'},
            priority:-1,
            forced:true,
            popup:false,
            content:function(){
                player.unmarkSkill('tuijin2');
                player.removeSkill('tuijin2');
                delete player.storage.tuijin2;
            }
        },
        jijia:{
            mark:true,
            unique:true,
            init:function(player){
                player.storage.jijia=4;
                player.storage.jijia2=0;
            },
            intro:{
                content:function(storage){
                    return '机甲体力值：'+storage;
                }
            },
            mod:{
                maxHandcard:function(player,num){
                    if(player.storage.jijia>0){
                        return num+player.storage.jijia;
                    }
				}
            },
            trigger:{player:'changeHp'},
            forced:true,
            popup:false,
            filter:function(event,player){
                return player.storage.jijia>0&&event.parent.name=='damage'&&event.num<0;
            },
            content:function(){
                player.hp-=trigger.num;
                player.update();
                player.storage.jijia+=trigger.num;
                if(player.storage.jijia<=0){
                    player.unmarkSkill('jijia');
                }
                else{
                    player.updateMarks();
                }
            },
            ai:{
                threaten:function(player,target){
					if(target.storage.jijia<=0) return 2;
					return 1;
				}
            }
        },
        zihui:{
            enable:'phaseUse',
            filter:function(event,player){
                return player.storage.jijia>0;
            },
            filterTarget:function(card,player,target){
                return target!=player&&get.distance(player,target)<=2;
            },
            unique:true,
            selectTarget:-1,
			skillAnimation:true,
			animationColor:'fire',
            line:'fire',
            content:function(){
                'step 0'
                target.chooseToDiscard(player.storage.jijia,'he','弃置'+get.cnNumber(player.storage.jijia)+'张牌，或受到2点火焰伤害').ai=function(card){
                    if(target.hasSkillTag('nofire')) return 0;
                    if(get.type(card)!='basic') return 11-ai.get.value(card);
                    if(target.hp>4) return 7-ai.get.value(card);
                    if(target.hp==4&&player.storage.jijia>=3) return 7-ai.get.value(card);
                    if(target.hp==3&&player.storage.jijia>=4) return 7-ai.get.value(card);
                    if(player.storage.hujia>1) return 8-ai.get.value(card);
                    return 10-ai.get.value(card);
                };
                'step 1'
                if(!result.bool){
                    target.damage(2,'fire');
                }
                if(target==targets[targets.length-1]){
                    player.storage.jijia=0;
                    player.unmarkSkill('jijia');
                }
            },
            ai:{
                order:2,
                result:{
                    player:function(player){
                        var num=0;
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player||game.players[i].hasSkillTag('nofire')||get.distance(player,game.players[i])>2) continue;
                            var nh=game.players[i].num('h');
                            var att=ai.get.attitude(player,game.players[i]);
                            if(nh<player.storage.jijia){
                                if(att<0){
                                    if(game.players[i].hp<=2){
                                        num+=2;
                                    }
                                    else{
                                        num+=1.5;
                                    }
                                }
                                else if(att>0){
                                    if(game.players[i].hp<=2){
                                        num-=2;
                                    }
                                    else{
                                        num-=1.5;
                                    }
                                }
                            }
                            else if(nh==player.storage.jijia){
                                if(att<0){
                                    num+=0.5;
                                }
                                else if(att>0){
                                    num-=0.5;
                                }
                            }
                        }
                        if(num>=2) return 1;
                        return 0;
                    }
                }
            }
        },
        xiandan:{
			trigger:{player:'shaBegin'},
			direct:true,
			content:function(){
				"step 0"
				var dis=trigger.target.num('h','shan')||trigger.target.num('e','bagua')||trigger.target.num('h')>2;
				var next=player.chooseToDiscard(get.prompt('xiandan'));
				next.ai=function(card){
					if(dis) return 7-ai.get.value(card);
					return 0;
				}
				next.logSkill='xiandan';
				"step 1"
				if(result.bool){
                    if(get.color(result.cards[0])=='red'){
                        trigger.directHit=true;
                    }
					else{
                        player.addTempSkill('xiandan2','shaAfter');
                    }
				}
			}
		},
        xiandan2:{
			trigger:{source:'damageBegin'},
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.notLink();
			},
			forced:true,
            popup:false,
			content:function(){
				trigger.num++;
			}
		},
        shouge:{
            trigger:{source:'dieAfter'},
            frequent:true,
            content:function(){
                player.gain(game.createCard('zhiliaobo'),'gain2');
            }
        },
        tuji:{
            mod:{
                globalFrom:function(from,to,distance){
                    if(_status.currentPhase==from){
                        return distance-get.cardCount(true,from);
                    }
                },
            },
        },
        mujing:{
            trigger:{player:'useCardToBegin'},
			filter:function(event,player){
				return event.target&&event.target!=player&&get.distance(event.target,player,'attack')>1;
			},
            direct:true,
			content:function(){
				'step 0'
                player.discardPlayerCard(get.prompt('mujing'),trigger.target).logSkill=['mujing'];
                'step 1'
                if(result.bool&&player.num('h')<=trigger.target.num('h')){
                    player.draw();
                }
			}
        },
        zhanlong:{
            trigger:{player:'phaseBegin'},
            unique:true,
			mark:true,
			skillAnimation:true,
			init:function(player){
				player.storage.zhanlong=false;
			},
			filter:function(event,player){
				if(player.storage.zhanlong) return false;
                if(player.num('he')==0) return false;
                if(player.hp!=1) return false;
                return true;
			},
			content:function(){
                'step 0'
                player.discard(player.get('he'));
                'step 1'
                player.addTempSkill('zhanlong2','phaseAfter');
                player.unmarkSkill('zhanlong');
				player.storage.zhanlong=true;
                var cards=[];
                for(var i=0;i<3;i++){
                    cards.push(game.createCard('sha'));
                }
                player.gain(cards,'gain2');
			},
            ai:{
                threaten:function(player,target){
					if(target.hp==1) return 3;
					return 1;
				},
                effect:{
					target:function(card,player,target){
						if(!target.hasFriend()) return;
						if(get.tag(card,'damage')==1&&target.hp==2&&target.num('he')&&!target.isTurnedOver()&&
                        _status.currentPhase!=target&&get.distance(_status.currentPhase,target,'absolute')<=3) return [0.5,1];
					}
				}
            },
			intro:{
				content:'limited'
			}
        },
        zhanlong2:{
            mod:{
                cardUsable:function(card){
                    if(card.name=='sha') return Infinity;
                }
            }
        },
        feiren:{
			trigger:{player:'useCard'},
			forced:true,
			priority:10,
			filter:function(event){
				return event.card.name=='sha';
			},
			content:function(){
				player.addTempSkill('unequip','useCardAfter');
			},
            mod:{
                targetInRange:function(card){
                    if(card.name=='sha') return true;
                },
                selectTarget:function(card,player,range){
                    if(card.name=='sha'&&range[1]!=-1&&get.suit(card)=='club'){
                        range[1]++;
                    }
                },
            },
            group:['feiren2'],
            ai:{
                threaten:1.4
            }
		},
        feiren2:{
			trigger:{player:'useCardAfter'},
			filter:function(event,player){
                if(event.parent.name=='feiren2') return false;
				if(event.card.name!='sha') return false;
                if(get.suit(event.card)!='spade') return false;
				var card=game.createCard(event.card.name,event.card.suit,event.card.number,event.card.nature);
				for(var i=0;i<event.targets.length;i++){
					if(!event.targets[i].isAlive()) return false;
					if(!player.canUse({name:event.card.name},event.targets[i],false,false)){
						return false;
					}
				}
				return true;
			},
			content:function(){
				var card=game.createCard(trigger.card.name,trigger.card.suit,trigger.card.number,trigger.card.nature);
				player.useCard(card,trigger.targets);
			},
			ai:{
				threaten:1.3
			},
		},
        xie:{
            enable:'phaseUse',
            unique:true,
            filterTarget:function(card,player,target){
                return target!=player&&!target.hasSkill('xie2');
            },
            filter:function(event,player){
                return player.num('h',{suit:'heart'});
            },
            filterCard:{suit:'heart'},
            check:function(card){
                return 7-ai.get.value(card);
            },
            content:function(){
                var current=game.findPlayer(function(player){
                    return player.hasSkill('xie2');
                });
                if(current){
                    current.removeSkill('xie2');
                }
                target.addSkill('xie2');
                target.storage.xie='now';
                target.storage.xie2=player;
            },
            ai:{
                expose:0.2,
                order:9.1,
                threaten:2,
                result:{
                    target:function(player,target){
                        var current=game.findPlayer(function(player){
                            return player.hasSkill('xie2');
                        });
                        if(current&&ai.get.recoverEffect(current,player,player)>0){
                            return 0;
                        }
                        return ai.get.recoverEffect(target,player,target);
                    }
                }
            }
        },
        xie2:{
            mark:true,
            trigger:{global:'phaseEnd'},
            forced:true,
            filter:function(event,player){
                if(player.storage.xie=='now'){
                    return event.player==player;
                }
                var num=game.phaseNumber-player.storage.xie;
                return num&&num%6==0;
            },
            content:function(){
                if(player.storage.xie=='now'){
                    player.storage.xie=game.phaseNumber;
                }
                player.recover();
            },
            intro:{
                content:function(storage,player){
                    var str='每隔六回合回复一点体力，直到'+get.translation(storage)+'死亡';
                    if(typeof player.storage.xie=='number'){
                        var num=game.phaseNumber-player.storage.xie;
                        num=num%6;
                        if(num==0){
                            str+='（下次生效于本回合）'
                        }
                        else{
                            str+='（下次生效于'+(6-num)+'回合后）'
                        }
                    }
                    return str;
                },
                onunmark:function(storage,player){
                    delete player.storage.xie;
                    delete player.storage.xie2;
                }
            },
            group:['xie3','xie4']
        },
        xie3:{
            trigger:{global:'phaseBegin'},
            forced:true,
            popup:false,
            content:function(){
                var num=game.phaseNumber-player.storage.xie;
                num=num%6;
                if(num){
                    num=6-num;
                }
                player.storage.xie2_markcount=num;
                player.updateMarks();
            }
        },
        xie4:{
            trigger:{global:'dieAfter'},
            forced:true,
            popup:false,
            filter:function(event,player){
                return event.player==player.storage.xie2;
            },
            content:function(){
                game.log(player,'解除了','【谐】');
                player.removeSkill('xie2');
            }
        },
        luan:{
            enable:'phaseUse',
            unique:true,
            filterTarget:function(card,player,target){
                return target!=player&&!target.hasSkill('luan2');
            },
            filter:function(event,player){
                return player.num('h',{suit:'spade'});
            },
            filterCard:{suit:'spade'},
            check:function(card){
                return 7-ai.get.value(card);
            },
            content:function(){
                var current=game.findPlayer(function(player){
                    return player.hasSkill('luan2');
                });
                if(current){
                    current.removeSkill('luan2');
                }
                target.addSkill('luan2');
                // target.storage.luan='now';
                target.storage.luan2=player;
            },
            ai:{
                expose:0.2,
                order:9.1,
                threaten:2,
                result:{
                    target:function(player,target){
                        var current=game.findPlayer(function(player){
                            return player.hasSkill('luan2');
                        });
                        if(current&&ai.get.attitude(player,current)<0){
                            return 0;
                        }
                        return -1;
                    }
                }
            }
        },
        luan2:{
            mark:true,
            intro:{
                content:'受到的伤害+1，直到首次进入濒死状态'
            },
            trigger:{player:'damageEnd'},
            forced:true,
            content:function(){
                player.loseHp();
            },
            ai:{
                threaten:1.2
            },
            group:['luan3','luan4']
        },
        luan3:{
            trigger:{player:'dyingAfter'},
            forced:true,
            popup:false,
            content:function(){
                game.log(player,'解除了','【乱】');
                player.removeSkill('luan2');
            }
        },
        luan2_old:{
            mark:true,
            trigger:{global:'phaseEnd'},
            forced:true,
            filter:function(event,player){
                if(player.storage.luan=='now'){
                    return event.player==player;
                }
                var num=game.phaseNumber-player.storage.luan;
                return num&&num%6==0;
            },
            content:function(){
                if(player.storage.luan=='now'){
                    player.storage.luan=game.phaseNumber;
                }
                player.loseHp();
            },
            intro:{
                content:function(storage,player){
                    var str='每隔六回合失去一点体力，直到'+get.translation(storage)+'死亡';
                    if(typeof player.storage.luan=='number'){
                        var num=game.phaseNumber-player.storage.luan;
                        num=num%6;
                        if(num==0){
                            str+='（下次生效于本回合）'
                        }
                        else{
                            str+='（下次生效于'+(6-num)+'回合后）'
                        }
                    }
                    return str;
                },
                onunmark:function(storage,player){
                    delete player.storage.luan;
                    delete player.storage.luan2;
                }
            },
            group:['luan3','luan4']
        },
        luan3_old:{
            trigger:{global:'phaseBegin'},
            forced:true,
            popup:false,
            content:function(){
                var num=game.phaseNumber-player.storage.luan;
                num=num%6;
                if(num){
                    num=6-num;
                }
                player.storage.luan2_markcount=num;
                player.updateMarks();
            }
        },
        luan4:{
            trigger:{global:'dieAfter'},
            forced:true,
            popup:false,
            filter:function(event,player){
                return event.player==player.storage.luan2;
            },
            content:function(){
                game.log(player,'解除了','【乱】');
                player.removeSkill('luan2');
            }
        },
        sheng:{
            enable:'phaseUse',
            unique:true,
			mark:true,
			skillAnimation:true,
			animationColor:'metal',
			init:function(player){
				player.storage.sheng=false;
			},
			filter:function(event,player){
				if(player.storage.sheng) return false;
                return true;
			},
            filterTarget:function(card,player,target){
                return target.isDamaged();
            },
            selectTarget:[1,Infinity],
			content:function(){
                if(target==targets[0]){
                    player.turnOver();
                    player.addSkill('sheng2');
                    player.unmarkSkill('sheng');
    				player.storage.sheng=true;
                }
				target.recover();
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
                        var eff=ai.get.recoverEffect(target,player,target);
                        if(player.hp==1) return eff;
                        if(player.hasUnknown()) return 0;
                        var num1=0,num2=0,num3=0;
                        for(var i=0;i<game.players.length;i++){
                            if(ai.get.attitude(player,game.players[i])>0){
                                num1++;
                                if(game.players[i].isDamaged()){
                                    num2++;
                                    if(game.players[i].hp<=1){
                                        num3++;
                                    }
                                }
                            }
                        }
                        if(num1==num2) return eff;
                        if(num2==num1-1&&num3) return eff;
                        if(num3>=2) return eff;
                        return 0;
                    }
				},
			},
			intro:{
				content:'limited'
			}
        },
        sheng2:{
            trigger:{player:'phaseBegin'},
            forced:true,
            popup:false,
            content:function(){
                player.removeSkill('sheng2');
            },
            mod:{
                targetEnabled:function(card,player,target){
                    if(player!=target) return false;
                }
            }
        },
        xiandan_old:{
            mod:{
                selectTarget:function(card,player,range){
                    if(card.name=='sha'&&range[1]!=-1){
                        var num=0;
                        var attack=false;
                        for(var i=0;i<game.players.length;i++){
                            if(player!=game.players[i]){
                                if(get.distance(player,game.players[i])<=1){
                                    num++;
                                }
                                else if(get.distance(player,game.players[i],'attack')<=1){
                                    attack=true;
                                }
                            }
                        }
                        if(!attack){
                            num--;
                        }
                        if(num>0){
                            range[1]+=num;
                        }
                    }
                },
                playerEnabled:function(card,player,target){
                    if(card.name=='sha'&&get.distance(player,target)>1){
                        for(var i=0;i<ui.selected.targets.length;i++){
                            if(get.distance(player,ui.selected.targets[i])>1){
                                return false;
                            }
                        }
                    }
                }
            }
        },
        yihun:{
            trigger:{player:'phaseEnd'},
            direct:true,
            filter:function(event,player){
                return player.num('he',{suit:'spade'})>0&&!player.hasSkill('yihun2');
            },
            content:function(){
                'step 0'
                var next=player.chooseCardTarget({
                    prompt:get.prompt('yihun'),
                    position:'he',
                    filterCard:{suit:'spade'},
                    ai1:function(card){
                        return 7-ai.get.value(card);
                    },
                    ai2:function(target){
                        var att=-ai.get.attitude(player,target);
                        if(target==player.next){
                            att/=10;
                        }
                        if(target==player.next.next){
                            att/=2;
                        }
                        return att;
                    },
                    filterTarget:function(card,player,target){
                        return player!=target;
                    },
                });
                'step 1'
                if(result.bool){
                    player.discard(result.cards);
                    player.logSkill('yihun',result.targets);
                    player.addSkill('yihun2');
                    var target=result.targets[0]
                    player.storage.yihun2=target;
                    if(target&&(get.mode()!='guozhan')||!target.isUnseen()){
                        player.markSkillCharacter('yihun2',target,'移魂','在'+get.translation(target)+'的下一回合开始时视为对其使用一张杀');
                    }
                }
            },
        },
        yihun2:{
            trigger:{global:['phaseBegin','dieAfter']},
            forced:true,
            filter:function(event,player){
                return event.player==player.storage.yihun2;
            },
            content:function(){
                if(player.storage.yihun2.isAlive()){
                    player.useCard({name:'sha'},player.storage.yihun2);
                }
                player.removeSkill('yihun2');
                delete player.storage.yihun2;
            },
            mod:{
				targetEnabled:function(){
					return false;
				},
				cardEnabled:function(card,player){
					return false;
				},
			}
        },
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
                if(player.num('he',{color:'red'})<2) return false;
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
        feidan:{
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
                player.chooseToDiscard(get.prompt('feidan')).set('ai',function(card){
                    if(eff>0) return 7-ai.get.value(card);
                    return 0;
                }).set('logSkill',['feidan',targets]);
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
                player.chooseTarget(get.prompt('yuedong'),[1,num],function(card,player,target){
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
                if(_status.event.player.storage.yuedong_num) return 2;
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
                var player=_status.event.player;
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
                content:'下次受到伤害时回复一点体力'
            },
            trigger:{player:'damageEnd'},
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
				player.chooseControl(controls).set('prompt',get.prompt('ziyu')).set('ai',function(event,player){
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
				player.chooseControl(controls).set('prompt',get.prompt('ziyu')).set('ai',function(event,player){
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
            logTarget:'player',
			content:function(){
                "step 0"
                player.draw(false);
                player.$draw();
				"step 1"
                player.storage.shanxian_h=player.get('h');
                player.storage.shanxian_e=player.get('e');
                player.storage.shanxian_n=2;
                player.syncStorage('shanxian_e');
				player.phase();
				player.storage.shanxian=trigger.player;
                player.removeSkill('shanxian2');
				"step 2"
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
        shanxian2:{
            trigger:{player:['gainBegin','loseBegin']},
            forced:true,
            popup:false,
            content:function(){
                player.removeSkill('shanxian2');
            }
        },
        shanhui:{
            unique:true,
            trigger:{player:'damageEnd',source:'damageEnd'},
            filter:function(event,player){
                return player.storage.shanxian_h&&player.storage.shanxian_e&&
                player.storage.shanxian_n>0&&!player.hasSkill('shanxian2');
            },
            check:function(event,player){
                var n1=player.num('he');
                var n2=player.storage.shanxian_h.length+player.storage.shanxian_e.length;
                if(n1<n2) return true;
                if(player.hp==player.maxHp) return false;
                if(n1==n2+1) return true;
                if(n2==n2+2&&player.hp<=1) return true;
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
                player.clearEquipTrigger();
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
                player.storage.shanxian_n--;
                if(player.storage.shanxian_n<=0){
                    delete player.storage.shanxian_h;
                    delete player.storage.shanxian_e;
                    delete player.storage.shanxian_n;
                }
                else{
                    player.addSkill('shanxian2');
                }
            }
        }
    },
    translate:{
        mengji:'猛击',
        mengji_info:'锁定技，若你已发动重盾，当你没有护甲时，你的杀造成的伤害+1',
        lzhongjia:'重盾',
        lzhongjia_info:'游戏开始时，你获得8点护甲；出牌阶段限一次，你可以弃置一张牌并将一点护甲分给一名没有护甲的其他角色',
        paotai:'炮台',
        paotai2:'炮台',
        paotai_info:'出牌阶段，你可以弃置一张杀布置或升级一个炮台（最高3级）；回合结束阶段，炮台有一定机率对一名随机敌人造成一点火焰伤害；每当你受到杀造成的伤害，炮台降低一级',
        maoding:'铆钉',
        maoding2:'铆钉',
        maoding_info:'每当你造成或受到一次伤害，你可以获得一个零件；出牌限阶段限一次，你可以弃置两张零件牌令一名角色获得一点护甲',
        fengshi:'风矢',
        fengshi2:'风矢',
        fengshi_info:'锁定技，在一合内每当你使用一张牌，你的攻击范围+1；你的杀增加20%的概率强制命中；你的杀造成伤害后增加20%的概率令伤害+1',
        yinbo:'音波',
        yinbo_info:'出牌阶段限一次，你可以弃置一张黑桃牌，然后随机弃置三名敌人各一张牌',
        liudan:'榴弹',
        liudan_info:'每当你使用一张杀，你可以令所有不是此杀目标的其他角色有50%概率成为此杀的额外目标',
        shoujia:'兽夹',
        shoujia2:'兽夹',
        shoujia3:'兽夹',
        shoujia_info:'出牌阶段限一次，你可以将一张牌背面朝上置于一名其他角色的武将牌上，当该角色使用一张与此牌花色相同的牌指定其他角色为目标时，将此牌置入弃牌堆，该角色将武将牌翻至背面；当该角色对你造成伤害时，将此牌置入弃牌堆',
        shihuo:'嗜火',
        shihuo_info:'锁定技，每当一名角色受到火焰伤害，你摸一张牌',
        shanguang:'闪光',
        shanguang_info:'出牌阶段限一次，你可以弃置一张方片牌令攻击范围内的一名其他角色本回合内不能使用或打出卡牌',
        tiandan:'填弹',
        tiandan_info:'摸牌阶段开始时，你可以跳过出牌和弃牌阶段，然后获得若干张杀直到你的手牌数等于你的体值（最多为5）',
        shenqiang:'神枪',
        shenqiang_info:'若你使用杀指定了惟一目标且造成伤害，则此杀不计入回合内的出杀次数限制',
        mianzhen:'眠针',
        mianzhen2:'眠针',
        mianzhen_info:'出牌阶段限一次，你可以弃置一张牌并令一名其他角色打出一张闪，否则该角色不能使用或打出卡牌直到其受到伤害或下一回合结束',
        aqianghua:'强化',
        aqianghua2:'强化',
        aqianghua_info:'出牌阶段限一次，你可以将你的全部手牌（至少一张）交给一名其他角色，该角色获得一点护甲且下一次造成的伤害+1',
        zhiyuan:'支援',
        zhiyuan_info:'每当你即将造成伤害，你可以防止此伤害，改为令目标回复等量的体力',
        juji:'狙击',
        juji2:'狙击',
        juji3:'狙击',
        juji_info:'出牌阶段限一次，你可以弃置任意张花色不同的牌并指定一名有手牌的其他角色，若该角色的手牌中含有与你弃置的牌花色相同的牌，则本回合内你与其距离为1且该角色不能闪避你的杀',
        duwen:'毒吻',
        duwen2:'毒吻',
        duwen_info:'锁定技，当你造成伤害时，若你的手牌数与受伤害角色相等，此伤害+1',
        zhuagou:'抓钩',
        zhuagou_info:'出牌阶段限一次，你可以弃置一张手牌并将你的座位移到任意位置',
        dulei:'诡雷',
        dulei2:'诡雷',
        dulei_info:'出牌阶段，若你武将牌上没有牌，你可以将一张牌背面朝上置于你的武将牌上，当一名角色使用与该牌花色相同的牌指定你为目标时，你展示并将此牌置于弃牌堆，然后该角色失去一点体力并随机弃置一张牌',
        shuangqiang:'霜枪',
        shuangqiang_info:'每当你对一名未翻面的角色造成伤害，你可以令伤害-1，然后令受伤害角色翻面',
        baoxue:'暴雪',
        baoxue_info:'限定技，出牌阶段，你可以展示并弃置你的所有黑色牌，然后令至多X名其他角色随机弃置一张牌并将武将牌翻至背面，X为你的弃牌数',
        bingqiang:'冰墙',
        bingqiang2:'冰墙',
        bingqiang2_bg:'墙',
        bingqiang3:'冰墙',
        bingqiang3_bg:'墙',
        bingqiang4:'冰墙',
        bingqiang4_bg:'墙',
        bingqiang5:'冰墙',
        bingqiang5_bg:'障',
        bingqiang_info:'出牌阶段，你可以弃置X张红色牌令一名角色和其相邻角色的防御离+X，或弃置X张黑色牌令一名角色和其相邻角色的进攻离-X，效果持续到你的下个回合开始',
        jidong:'急冻',
        jidong_info:'在一名角色的回合结束阶段，若你的体力值为1，你可以翻面并回复两点体力，在你的武将牌翻至正面前，你防止所有伤害，也不能成为其他角色卡牌的目标',
        jijia:'机甲',
        jijia_info:'锁定技，游戏开始时，你获得一个体力为4的机甲；你的手牌上限为你和机甲的体力之和；你受到的伤害由机甲承担',
        zihui:'自毁',
        zihui_info:'出牌阶段，你可以令距离2以内的所有其他角色选择一项：弃置数量等同你机甲体力值的牌，或受到2点火焰伤害，并在结算完毕后摧毁你的机甲',
        tuijin:'推进',
        tuijin_info:'出牌阶段限一次，若你有机甲，你可以指定一名角色，本回合内视为与其距离为1',
        chongzhuang:'重装',
        chongzhuang_info:'在你失去机甲后，当你累计造成了4点伤害时，你重新获得机甲',
        shouge:'收割',
        shouge_info:'每当你杀死一名角色，你可以获得一张治疗波',
        tuji:'突击',
        tuji_info:'锁定技，在你的回合内，你每使用一次牌后，你计算与其他角色的距离便减少1，直到回合结束',
        mujing:'目镜',
        mujing_info:'每当你对攻击范围不含你的角色使用一张牌，你可以弃置目标一张牌；若你的手牌数不多于目标，你摸一张牌',
        feiren:'飞刃',
        feiren2:'飞刃',
        feiren_info:'你的杀无视距离和防具；你的黑桃杀可以额外结算一次，梅花杀可以额外指定一个目标',
        zhanlong:'斩龙',
        zhanlong_info:'限定技，回合开始阶段，若你体力值为1，你可以弃置所有牌（至少一张），然后将三张杀置入你的手牌，若如此做，你本回合使用杀无次数限制',
        xie:'谐',
        xie2:'谐',
        xie_info:'出牌阶段，你可以弃置一张红桃手牌并指定一名角色，该角色自其下一回合开始每隔六回合回复一点体力，直到你死亡。同一时间只能对一人发动',
        luan:'乱',
        luan2:'乱',
        luan_old_info:'出牌阶段，你可以弃置一张黑桃手牌并指定一名角色，该角色自其下一回合开始每隔六回合失去一点体力，直到你死亡。同一时间只能对一人发动',
        luan_info:'出牌阶段，你可以弃置一张黑桃手牌并指定一名角色，该角色受到伤害后流失一点体力，直到你死亡或其首次进入濒死状态。同一时间只能对一人发动',
        sheng:'圣',
        sheng_info:'限定技，出牌阶段，你可以将你的武将牌翻面，然后令任意名角色回复一点体力，若如此做，你不能成为其他角色的卡牌目标直到下一回合开始',
        xiandan:'霰弹',
        xiandan_info:'每当你使用一张杀，你可以弃置一张红色牌令此杀不可闪避，或弃置一张黑色牌令此杀伤害+1',
        yihun:'移魂',
        yihun_info:'回合结束阶段，你可以弃置一张黑桃牌并指定一名其他角色，你在该角色下一回合开始时视为对其使用一张杀；在此之前，你不能使用卡牌，也不能成为卡牌的目标',
        feidan:'飞弹',
        feidan_info:'你的杀只能对距离1以外的角色使用；每当你使用杀造成伤害后，你可以弃置一张牌对距离目标1以内的其他角色各造成一点伤害',
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
        guangshu_info:'出牌阶段，你可以弃置一张牌，并指定一名角色，根据弃置牌的花色执行如下效果：♥该角色下次受到伤害时回复一点体力；♦︎该角色下次造成伤害时摸两张牌；♣该角色无法使用杀直到下一回合结束；♠该角色于下个回合结束阶段受到一点无来源的雷电伤害',
        ziyu:'自愈',
        ziyu_info:'在一名角色的回合结束阶段，你可以回复一点体力或摸一张牌，每隔四回合发动一次',
        shouhu:'守护',
        shouhu_info:'你不能使用杀；出牌阶段，你可以弃置一张杀令一名其他角色回复一点体力',
        shanxian:'闪现',
        shanxian_info:'在一名其他角色的回合开始前，若你的武将牌正面朝上，你可以摸一张牌并进行一个额外回合，并在回合结束后将武将牌翻至背面。若如此做，你对其使用卡牌无视距离直到回合结束。',
        shanhui:'闪回',
        shanhui_info:'每当你造成或受到一次伤害，你可以将你的牌重置为上次发动闪现时的状态，若你的牌数因此而减少，你回复一点体力。每个状态最多可重现两次',
        ow_liekong:'猎空',
        ow_sishen:'死神',
        ow_tianshi:'天使',
        ow_falaozhiying:'法老之鹰',
        ow_zhixuzhiguang:'秩序之光',
        ow_luxiao:'卢西奥',
        ow_shibing:'士兵76',
        ow_yuanshi:'源氏',
        ow_chanyata:'禅雅塔',
        ow_dva:'DVA',
        ow_mei:'小美',
        ow_heibaihe:'黑百合',
        ow_ana:'安娜',
        ow_baolei:'堡垒',
        ow_maikelei:'麦克雷',
        ow_banzang:'半藏',
        ow_kuangshu:'狂鼠',
        ow_tuobiang:'托比昂',
        ow_laiyinhate:'莱因哈特',
        ow_luba:'路霸',
        ow_wensidun:'温斯顿',
        ow_zhaliya:'查莉娅',
    }
};
