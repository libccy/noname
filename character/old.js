character.old={
    character:{
        zhangjiao:['male','qun',3,['leiji','guidao','huangtian'],['zhu']],
		masu:['male','shu',3,['xinzhan','huilei']],
		xushu:['male','shu',3,['wuyan','jujian']],
		fazheng:['male','shu',3,['enyuan','xuanhuo']],
		liru:['male','qun',3,['juece','mieji','fencheng']],
        yujin:['male','wei',4,['yizhong']],
		lusu:['male','wu',3,['haoshi','dimeng']],
		yuanshao:['male','qun',4,['luanji','xueyi'],['zhu']],
		old_zhonghui:['male','wei',3,['zzhenggong','zquanji','zbaijiang']],
        old_xusheng:['male','wu',4,['pojun']],
        old_zhuran:['male','wu',4,['olddanshou']],
        old_lingtong:['male','wu',4,['oldxuanfeng']],
        old_madai:['male','shu',4,['mashu','oldqianxi']],
        old_caoxiu:['male','wei',4,['taoxi']],
        old_huaxiong:['male','qun',6,['shiyong']],
        old_wangyi:['female','wei',3,['oldzhenlie','oldmiji']],
        old_caozhen:['male','wei',4,['sidi']],
        old_quancong:['male','wu',4,['zhenshan']],
        old_yuanshu:['male','qun',4,['yongsi','weidi']],
    },
    skill:{
        zhenshan:{
			trigger:{player:'chooseToRespondBegin'},
			filter:function(event,player){
				if(event.responded) return false;
				if(!event.filterCard({name:'shan'})&&!!event.filterCard({name:'sha'})) return false;
				if(player.hasSkill('zhenshan2')) return false;
                var nh=player.num('h');
                return game.hasPlayer(function(current){
                    return current!=player&&current.num('h')<nh;
                });
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('zhenshan'),function(card,player,target){
					return target.num('h')<player.num('h');
				}).set('ai',function(target){
					return ai.get.attitude(player,target)
				});
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.responded=true;
                    if(trigger.filterCard({name:'shan'})){
                        trigger.result={bool:true,card:{name:'shan'}}
                    }
                    else{
                        trigger.result={bool:true,card:{name:'sha'}}
                    }
					player.logSkill('zhenshan',result.targets);
					player.addTempSkill('zhenshan2','phaseAfter');
                    player.swapHandcards(result.targets[0]);
				}
			},
			group:['zhenshan_sha','zhenshan_tao','zhenshan_jiu']
		},
		zhenshan2:{},
		zhenshan_sha:{
			enable:'chooseToUse',
			viewAs:{name:'sha'},
            log:false,
			viewAsFilter:function(player){
                if(player.hasSkill('zhenshan2')) return false;
                var nh=player.num('h');
                return game.hasPlayer(function(current){
                    return current!=player&&current.num('h')<nh;
                });
			},
			precontent:function(){
				'step 0'
                player.chooseTarget('选择交换手牌的目标',function(card,player,target){
                    return target.num('h')<player.num('h')
                },true).ai=function(target){
                    return ai.get.attitude(player,target);
                }
				player.addTempSkill('zhenshan2','phaseAfter');
                'step 1'
				if(result.bool){
                    player.logSkill('zhenshan_sha',result.targets);
                    player.swapHandcards(result.targets[0]);
				}
			},
			filterCard:function(card){
				return false;
			},
            selectCard:-1,
			ai:{
				skillTagFilter:function(player,tag,arg){
                    if(player.hasSkill('zhenshan2')) return false;
                    var nh=player.num('h');
                    return game.hasPlayer(function(current){
                        return current!=player&&current.num('h')<nh;
                    });
				},
				order:function(){
                    var player=_status.event.player;
                    var nh=player.num('h');
                    if(game.hasPlayer(function(current){
                        return ai.get.attitude(player,current)>0&&current.num('h')<nh;
                    })){
                        return 2.9;
                    }
                    return 0;
                },
				respondSha:true,
			},
		},
		zhenshan_tao:{
			enable:'chooseToUse',
			viewAs:{name:'tao'},
            viewAsFilter:function(player){
                if(player.hasSkill('zhenshan2')) return false;
                var nh=player.num('h');
                return game.hasPlayer(function(current){
                    return current!=player&&current.num('h')<nh;
                });
			},
            log:false,
			precontent:function(){
				'step 0'
                player.chooseTarget('选择交换手牌的目标',function(card,player,target){
                    return target.num('h')<player.num('h')
                },true).ai=function(target){
                    return ai.get.attitude(player,target);
                }
				player.addTempSkill('zhenshan2','phaseAfter');
                'step 1'
				if(result.bool){
                    player.logSkill('zhenshan_tao',result.targets);
                    player.swapHandcards(result.targets[0]);
				}
			},
			filterCard:function(card){
				return false;
			},
            selectCard:-1,
			ai:{
                skillTagFilter:function(player,tag,arg){
                    if(player.hasSkill('zhenshan2')) return false;
                    var nh=player.num('h');
                    return game.hasPlayer(function(current){
                        return current!=player&&current.num('h')<nh;
                    });
				},
				order:function(){
                    var player=_status.event.player;
                    var nh=player.num('h');
                    if(game.hasPlayer(function(current){
                        return ai.get.attitude(player,current)>0&&current.num('h')<nh;
                    })){
                        return _status.event.type=='dying'?0.5:4;
                    }
                    return 0;
                },
				save:true,
			},
		},
		zhenshan_jiu:{
            enable:'chooseToUse',
			viewAs:{name:'jiu'},
            viewAsFilter:function(player){
                if(player.hasSkill('zhenshan2')) return false;
                var nh=player.num('h');
                return game.hasPlayer(function(current){
                    return current!=player&&current.num('h')<nh;
                });
			},
            log:false,
			precontent:function(){
				'step 0'
                player.chooseTarget('选择交换手牌的目标',function(card,player,target){
                    return target.num('h')<player.num('h')
                },true).ai=function(target){
                    return ai.get.attitude(player,target);
                }
				player.addTempSkill('zhenshan2','phaseAfter');
                'step 1'
				if(result.bool){
                    player.logSkill('zhenshan_jiu',result.targets);
                    player.swapHandcards(result.targets[0]);
				}
			},
			filterCard:function(card){
				return false;
			},
            selectCard:-1,
			ai:{
                skillTagFilter:function(player,tag,arg){
                    if(player.hasSkill('zhenshan2')) return false;
                    var nh=player.num('h');
                    return game.hasPlayer(function(current){
                        return current!=player&&current.num('h')<nh;
                    });
				},
				order:0,
				save:true,
			},
		},
        oldzhenlie:{
			audio:'zhenlie',
			trigger:{player:'judge'},
			check:function(event,player){
                return event.judge(player.judging[0])<0;
            },
			content:function(){
                var card=get.cards()[0];
				player.$throw(card);
                card.clone.classList.add('thrownhighlight');
				if(trigger.player.judging[0].clone){
					trigger.player.judging[0].clone.classList.remove('thrownhighlight');
					game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
				}
				ui.discardPile.appendChild(trigger.player.judging[0]);
				trigger.player.judging[0]=card;
				trigger.position.appendChild(card);
				game.log(trigger.player,'的判定牌改为',card);
				game.delay(2);
			},
		},
        oldmiji:{
            trigger:{player:['phaseBegin','phaseEnd']},
            filter:function(event,player){
                return player.isDamaged();
            },
            content:function(){
                'step 0'
                player.judge(function(card){
                    return get.color(card)=='black'?1:-1;
                });
                'step 1'
                if(result.bool&&player.maxHp>player.hp){
                    var cards=get.cards(player.maxHp-player.hp);
                    event.cards=cards;
    				var dialog=ui.create.dialog('选择获得卡牌的目标',cards,'hidden');
    				dialog.classList.add('noselect');
    				player.chooseTarget(true,dialog).ai=function(target){
                        return ai.get.attitude(player,target)/Math.sqrt(1+target.num('h'));
                    }
                }
                else{
                    event.finish();
                }
                'step 2'
                player.line(result.targets);
                result.targets[0].gain(event.cards,'draw');
            },
            ai:{
                effect:{
					target:function(card,player,target){
						if(get.tag(card,'recover')&&target.hp==target.maxHp-1) return [0,0];
                        if(target.hasFriend()){
                            if((get.tag(card,'damage')==1||get.tag(card,'loseHp'))&&target.hp==target.maxHp) return [0,1];
                        }
					}
				},
				threaten:function(player,target){
					if(target.hp==1) return 3;
					if(target.hp==2) return 2;
                    return 1;
				},
            }
        },
        shiyong:{
            audio:2,
            trigger:{player:'damageEnd'},
            forced:true,
            check:function(){
                return false;
            },
            filter:function(event,player){
                return event.card.name=='sha'&&(get.color(event.card)=='red'||event.player.hasSkill('jiu'));
            },
            content:function(){
                player.loseMaxHp();
            }
        },
        oldqianxi:{
            trigger:{source:'damageBefore'},
            check:function(event,player){
                var att=ai.get.attitude(player,event.player);
                if(event.player.hp==event.player.maxHp) return att<0;
                if(event.player.hp==event.player.maxHp-1&&
                    (event.player.maxHp<=3||event.player.hasSkillTag('maixie'))) return att<0;
                return att>0;
            },
            filter:function(event,player){
                return event.card&&event.card.name=='sha'&&get.distance(player,event.player)<=1;
            },
            logTarget:'player',
            content:function(){
                'step 0'
                player.judge(function(card){
                    return get.suit(card)!='heart'?1:-1;
                });
                'step 1'
                if(result.bool){
                    trigger.untrigger();
                    trigger.finish();
                    trigger.player.loseMaxHp(true);
                }
            }
        },
        oldxuanfeng:{
			audio:'xuanfeng',
			trigger:{player:'loseEnd'},
			direct:true,
			filter:function(event,player){
                for(var i=0;i<event.cards.length;i++){
                    if(event.cards[i].original=='e') return true;
                }
				return false;
			},
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('xuanfeng'),function(card,player,target){
                    if(target==player) return false;
                    return get.distance(player,target)<=1||player.canUse('sha',target,false);
				}).set('ai',function(target){
                    if(get.distance(player,target)<=1){
                        return ai.get.damageEffect(target,player,player)*2;
                    }
                    else{
                        return ai.get.effect(target,{name:'sha'},player,player);
                    }
				});
				"step 1"
				if(result.bool){
					player.logSkill('xuanfeng',result.targets);
                    var target=result.targets[0];
                    var distance=get.distance(player,target);
                    if(distance<=1&&player.canUse('sha',target,false)){
                        player.chooseControl('出杀','造成伤害').ai=function(){
                            return '造成伤害';
                        }
                        event.target=target;
                    }
                    else if(distance<=1){
                        target.damage();
                        event.finish();
                    }
                    else{
                        player.useCard({name:'sha'},target,false).animate=false;
                        game.delay();
                        event.finish();
                    }
				}
				else{
					event.finish();
				}
				"step 2"
                var target=event.target;
				if(result.control=='出杀'){
                    player.useCard({name:'sha'},target,false).animate=false;
                    game.delay();
                }
                else{
                    target.damage();
                }
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='equip') return [1,3];
					}
				},
				noe:true
			}
		},
    },
    translate:{
        old_yuanshu:'旧袁术',
        old_xusheng:'旧徐盛',
        old_lingtong:'旧凌统',
        old_zhuran:'旧朱然',
        old_madai:'旧马岱',
        old_caoxiu:'旧曹休',
        old_huaxiong:'旧华雄',
        old_wangyi:'旧王异',
        old_caozhen:'旧曹真',
        old_quancong:'旧全琮',

        zhenshan:'振赡',
        zhenshan_sha:'赡杀',
        zhenshan_tao:'赡桃',
        zhenshan_jiu:'赡酒',
        zhenshan_info:'每名角色的回合限一次，每当你需要使用或打出一张基本牌时，你可以与一名手牌数少于你的角色交换手牌。若如此做，视为你使用或打出了此牌',
        oldzhenlie:'贞烈',
        oldzhenlie_info:'在你的判定牌生效前，你可以亮出牌堆顶的一张牌代替之',
        oldmiji:'秘计',
        oldmiji_info:'准备/结束阶段开始时，若你已受伤，你可以判定，若判定结果为黑色，你观看牌堆顶的X张牌（X为你已损失的体力值），然后将这些牌交给一名角色',
        shiyong:'恃勇',
        shiyong_info:'锁定技，当你受到一次红色【杀】或【酒】【杀】造成的伤害后，须减1点体力上限',
        oldqianxi:'潜袭',
        oldqianxi_info:'当你使用【杀】对距离为1的目标角色造成伤害时，你可以进行一次判定，若判定结果不为红桃，你防止此伤害，令其减1点体力上限',
        oldxuanfeng:'旋风',
        oldxuanfeng_info:'每当你失去一次装备区里的牌时，你可以执行下列两项中的一项：1.视为对任意一名其他角色使用一张【杀】（此【杀】不计入每回合的使用限制）；2.对与你距离1以内的一名其他角色造成一点伤害',
    }
}
