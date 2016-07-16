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
        ow_dva:['female','qun',2,['jijia','tuijin','zihui','chongzhuang']],
        ow_mei:['female','shu',3,[]],

        // ow_heibaihe:['female','shu',3,[]],
        // ow_baolei:['female','shu',3,[]],
        // ow_ana:['female','shu',4,[]],
        // ow_maikelei:['male','shu',4,[]],
        // ow_banzang:['male','shu',4,[]],
        // ow_kuangshu:['male','shu',4,[]],
        // ow_tuobiang:['male','shu',4,[]],
        // ow_laiyinhate:['male','shu',4,[]],
        // ow_luba:['male','shu',4,[]],
        // ow_wensidun:['male','shu',4,[]],
        // ow_zhaliya:['female','shu',4,[]],
    },
    skill:{
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
                if(!(player.storage.jijia>0)) return false;
                for(var i=0;i<game.players.length;i++){
                    if(get.distance(player,game.players[i])>1) return true;
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
                target.chooseToDiscard(player.storage.jijia,'弃置'+get.cnNumber(player.storage.jijia)+'张牌，或受到2点火焰伤害').ai=function(card){
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
				var next=player.chooseToDiscard('是否发动【霰弹】？');
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
                player.discardPlayerCard('是否发动【目镜】？',trigger.target).logSkill=['mujing'];
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
                        if(current){
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
            trigger:{player:'damageBegin'},
            forced:true,
            content:function(){
                trigger.num++;
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
                    prompt:'是否发动【移魂】？',
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
                player.chooseToDiscard('是否发动【飞弹】？').set('ai',function(card){
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
                player.draw(false);
                player.$draw();
				player.line(trigger.player,'green');
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
        luan_info:'出牌阶段，你可以弃置一张黑桃手牌并指定一名角色，该角色受到的伤害+1，直到你死亡或其首次进入濒死状态。同一时间只能对一人发动',
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
        guangshu_info:'出牌阶段，你可以弃置一张牌，并指定一名角色，根据弃置牌的花色执行如下效果：♥该角色进入濒死状态时回复一点体力；♦︎该角色下次造成伤害时摸两张牌；♣该角色无法使用杀直到下一回合结束；♠该角色于下个回合结束阶段受到一点无来源的雷电伤害',
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
    }
};
