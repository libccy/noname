'use strict';
character.xianjian={
	character:{
		pal_lixiaoyao:['male','qun',4,['xiaoyao','yujian']],
		pal_zhaoliner:['female','wei',3,['huimeng','tianshe']],
		pal_linyueru:['female','wei',3,['guiyuan','qijian']],

		// pal_wangxiaohu:['male','qun',4,[]],
		// pal_sumei:['female','shu',3,[]],
		// pal_shenqishuang:['female','wei',3,[]],

		pal_jingtian:['male','wu',3,['sajin','jubao']],
		pal_xuejian:['female','shu',3,['shuangren','shenmu','duci']],
		pal_longkui:['female','qun',3,['fenxing','diewu','lingyu']],
		pal_zixuan:['female','wei',3,['shuiyun','wangyou','changnian']],
		pal_changqing:['male','wei',4,['luanjian','tianfu']],

		pal_nangonghuang:['male','wei',3,['zhaoyao','sheling','zhangmu']],
		// pal_wenhui:['female','shu',4,[]],
		pal_wangpengxu:['female','shu',3,['duxinshu','feixu']],
		pal_xingxuan:['male','wei',3,['feizhua','leiyu','lingxue']],
		// pal_leiyuange:['male','wei',3,[]],

		pal_yuntianhe:['male','wu',4,['longxi','zhuyue','guanri']],
		pal_hanlingsha:['female','shu',3,['tannang','tuoqiao']],
		pal_liumengli:['female','wei',3,['tianxian','runxin','zhimeng']],
		pal_murongziying:['male','wei',4,['xuanning','poyun','qianfang']],
		pal_xuanxiao:['male','wei',4,['xuanyan','ningbin','xfenxin']],

		// pal_jiangyunfan:['male','wei',4,[]],
		// pal_tangyurou:['male','wei',4,[]],
		// pal_longyou:['male','wei',4,[]],
		// pal_xiaoman:['male','wei',4,[]],
		//
		// pal_xiahoujinxuan:['male','wei',4,[]],
		// pal_muchanglan:['male','wei',4,[]],
		// pal_xia:['male','wei',4,[]],
		// pal_jiangcheng:['male','wei',4,[]],
	},
	skill:{
		sheling:{
			trigger:{global:['useCardAfter','respondAfter','discardAfter']},
			filter:function(event,player){
				if(player!=_status.currentPhase||player==event.player) return false;
				if(event.cards){
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i])=='d') return true;
					}
				}
				return false;
			},
			frequent:'check',
			check:function(event){
				for(var i=0;i<event.cards.length;i++){
					if(get.position(event.cards[i])=='d'&&event.cards[i].name=='du') return false;
				}
				return true;
			},
			usable:3,
			content:function(){
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					if(get.position(trigger.cards[i])=='d'){
						cards.push(trigger.cards[i]);
					}
				}
				player.gain(cards,'gain2');
			}
		},
		zhaoyao:{
			trigger:{global:'phaseDrawBegin'},
			filter:function(event,player){
				return event.player!=player&&event.player.num('h')>0&&player.num('h')>0;
			},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)>=0) return false;
				var hs=player.get('h');
				if(hs.length<event.player.num('h')) return false;
				for(var i=0;i<hs.length;i++){
					var val=ai.get.value(hs[0]);
					if(hs[i].number>=10&&val<=6) return true;
					if(hs[i].number>=8&&val<=3) return true;
				}
				return false;
			},
			logTarget:'player',
			content:function(){
				'step 0'
				player.chooseToCompare(trigger.player);
				'step 1'
				if(result.bool){
					player.draw(2);
				}
				else{
					event.finish();
				}
				'step 2'
				player.chooseCard('将两张牌置于牌堆顶（先选择的在上）',2,true);
				'step 3'
				if(result.bool){
					player.lose(result.cards,ui.special);
					event.cards=result.cards;
				}
				else{
					event.finish();
				}
				'step 4'
				game.delay();
				var nodes=[];
				for(var i=0;i<event.cards.length;i++){
					var cardx=ui.create.card();
					cardx.classList.add('infohidden');
					cardx.classList.add('infoflip');
					nodes.push(cardx);
				}
				player.$throw(nodes,700,'nobroadcast');
				game.log(player,'将'+get.cnNumber(event.cards.length)+'张牌置于牌堆顶');
				'step 5'
				for(var i=event.cards.length-1;i>=0;i--){
					ui.cardPile.insertBefore(event.cards[i],ui.cardPile.firstChild);
				}
			},
			ai:{
				expose:0.2
			}
		},
		zhangmu:{
			trigger:{player:'chooseToRespondBegin'},
			filter:function(event,player){
				if(event.responded) return false;
				if(!event.filterCard({name:'shan'})) return false;
				return player.num('h','shan')>0;
			},
			direct:true,
			check:function(event,player){
				if(ai.get.damageEffect(player,event.player,player)>=0) return false;
				return true;
			},
			usable:1,
			content:function(){
				"step 0"
				var goon=(ai.get.damageEffect(player,trigger.player,player)<=0);
				player.chooseCard(get.prompt('zhangmu'),{name:'shan'}).ai=function(){
					return goon?1:0;
				}
				"step 1"
				if(result.bool){
					player.showCards(result.cards);
					trigger.untrigger();
					trigger.responded=true;
					trigger.result={bool:true,card:{name:'shan'}}
					player.addSkill('zhangmu_ai');
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,effect){
						if(get.tag(card,'respondShan')&&effect<0){
							if(target.hasSkill('zhangmu_ai')) return 0;
							if(target.num('h')>=2) return 0.5;
						}
					}
				}
			}
		},
		zhangmu_ai:{
			trigger:{player:'loseAfter'},
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				return player.num('h','shan')==0;
			},
			content:function(){
				player.removeSkill('zhangmu_ai');
			}
		},
        leiyu:{
            trigger:{player:'phaseEnd'},
            check:function(event,player){
                if(player.hp==1) return 0;
                var num=0;
                var num2=0;
                for(var i=0;i<player.storage.leiyu.length;i++){
					if(player.storage.leiyu[i].isDead()) continue;
                    var eff=ai.get.effect(player.storage.leiyu[i],{name:'jingleishan',nature:'thunder'},player,player);
                    num+=eff;
                    if(eff>0){
                        num2++;
                    }
                    else if(eff<0){
                        num2--;
                    }
                }
                return num>0&&num2>=2;
            },
			prompt:function(event,player){
				for(var i=0;i<player.storage.leiyu.length;i++){
					if(player.storage.leiyu[i].isDead()){
						player.storage.leiyu.splice(i--,1);
					}
				}
				return get.prompt('leiyu',player.storage.leiyu);
			},
            filter:function(event,player){
				if(player.storage.leiyu){
					for(var i=0;i<player.storage.leiyu.length;i++){
						if(player.storage.leiyu[i].isAlive()) return true;
					}
				}
                return false;
            },
            content:function(){
                'step 0'
                player.loseHp();
                'step 1'
				for(var i=0;i<player.storage.leiyu.length;i++){
					if(player.storage.leiyu[i].isDead()){
						player.storage.leiyu.splice(i--,1);
					}
				}
                player.storage.leiyu2=true;
                player.storage.leiyu.sort(lib.sort.seat);
                player.useCard({name:'jingleishan',nature:'thunder'},player.storage.leiyu);
                'step 1'
                delete player.storage.leiyu2;
            },
            group:['leiyu2','leiyu3','leiyu4'],
            ai:{
                threaten:1.3
            }
        },
        leiyu2:{
            trigger:{player:'phaseUseBegin'},
            forced:true,
            popup:false,
            silent:true,
            content:function(){
                player.storage.leiyu=[];
            }
        },
        leiyu3:{
            trigger:{source:'dieAfter'},
            forced:true,
            popup:false,
            filter:function(event,player){
                return player.storage.leiyu2?true:false;
            },
            content:function(){
                player.recover();
                delete player.storage.leiyu2;
            }
        },
        leiyu4:{
            trigger:{player:'useCardToBegin'},
            forced:true,
            popup:false,
            silent:true,
            filter:function(event,player){
                return _status.currentPhase==player&&Array.isArray(player.storage.leiyu)&&event.target&&event.target!=player;
            },
            content:function(){
                player.storage.leiyu.add(trigger.target);
            }
        },
		feizhua:{
            trigger:{player:'useCard'},
			filter:function(event,player){
				if(event.card.name!='sha') return false;
				if(event.targets.length!=1) return false;
				var target=event.targets[0];
                var players=[target.next,target.previous];
				for(var i=0;i<players.length;i++){
					if(player!=players[i]&&target!=players[i]&&player.canUse('sha',players[i],false)){
						return true;
					}
				}
				return false;
			},
			prompt:function(event,player){
                var targets=[];
                var target=event.targets[0];
                if(player.canUse('sha',target.next,false)) targets.push(target.next);
                if(player.canUse('sha',target.previous,false)) targets.push(target.previous);
				return get.prompt('feizhua',targets);
			},
            check:function(event,player){
                var target=event.targets[0];
                var num=0;
                var players=[target.next,target.previous];
				for(var i=0;i<players.length;i++){
					if(player!=players[i]&&target!=players[i]&&player.canUse('sha',players[i],false)){
						num+=ai.get.effect(players[i],{name:'sha'},player,player);
					}
				}
                return num>0;
            },
			content:function(){
				"step 0"
                var target=trigger.targets[0];
                var players=[target.previous,target.next];
				for(var i=0;i<players.length;i++){
					if(player!=players[i]&&target!=players[i]&&player.canUse('sha',players[i],false)){
						trigger.targets.push(players[i]);
                        player.line(players[i],'green');
					}
				}
			}
		},
		lingxue:{
			trigger:{player:'recoverEnd'},
			forced:true,
			content:function(){
				player.changeHujia();
			}
		},
		diesha:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.player.isAlive()&&event.card&&event.card.name=='sha';
			},
			content:function(){
				trigger.player.loseHp();
				player.recover();
			},
			ai:{
				threaten:1.5
			}
		},
		guijiang:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player&&!target.hasSkill('guijiang2');
			},
			filterCard:{color:'black'},
			filter:function(event,player){
				return player.num('h',{color:'black'});
			},
			check:function(card){
				return 5-ai.get.value(card);
			},
			content:function(){
				target.addSkill('guijiang2');
				target.storage.guijiang2=player;
			},
			ai:{
				order:4,
				threaten:1.2,
				expose:0.2,
				result:{
					target:function(player,target){
						if(target.hp==1) return -1;
						if(target.hp==2) return -0.5;
						return 0;
					}
				}
			}
		},
		guijiang2:{
			mark:true,
			intro:{
				content:'不能成为回复牌的目标'
			},
			trigger:{global:['dieBegin','phaseBegin']},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.player==player.storage.guijiang2;
			},
			content:function(){
				player.removeSkill('guijiang2');
			},
			mod:{
				targetEnabled:function(card){
					if(get.tag(card,'recover')) return false;
				},
			},
			global:'guijiang3'
		},
		guijiang3:{
			mod:{
				cardSavable:function(card,player){
					if(_status.event.dying&&_status.event.dying.hasSkill('guijiang2')) return false;
				}
			}
		},
		fenxing:{
			trigger:{player:'phaseBegin'},
			forced:true,
			unique:true,
			forceunique:true,
			filter:function(){
				return Math.random()<0.5;
			},
			content:function(){
				var node;
				if(player.name2=='pal_longkui'){
					node=player.node.avatar2;
				}
				else if(player.name=='pal_longkui'){
					node=player.node.avatar;
				}
				if(player.storage.fenxing){
					player.storage.fenxing=false;
					player.removeSkill('guijiang');
					player.removeSkill('diesha');
					player.addSkill('diewu');
					player.addSkill('lingyu');
					if(node) node.setBackground('pal_longkui','character');
				}
				else{
					player.storage.fenxing=true;
					player.removeSkill('diewu');
					player.removeSkill('lingyu');
					player.addSkill('guijiang');
					player.addSkill('diesha');
					if(node) node.setBackground('pal_longkuigui','character');
				}
			},
		},
		diewu:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h','sha')>0;
			},
			filterCard:{name:'sha'},
			filterTarget:function(card,player,target){
				return target!=player;
			},
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
			},
			discard:false,
			content:function(){
				target.gain(cards);
				if(!player.hasSkill('diewu2')){
					player.draw();
					player.addTempSkill('diewu2','phaseAfter');
				}
			},
			ai:{
				order:2,
				expose:0.2,
				result:{
					target:function(player,target){
						if(!player.hasSkill('diewu2')) return 1;
						return 0;
					}
				}
			}
		},
		diewu2:{},
		lingyu:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].hp<game.players[i].maxHp){
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				player.chooseTarget('灵愈：令一名其他角色回复一点体力',function(card,player,target){
					return target!=player&&target.hp<target.maxHp;
				}).ai=function(target){
					return ai.get.recoverEffect(target,player,player);
				};
				'step 1'
				if(result.bool){
					player.logSkill('lingyu',result.targets[0]);
					result.targets[0].recover();
				}
			},
			ai:{
				threaten:1.5,
				expose:0.2,
			}
		},
		duxinshu:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('h');
			},
			content:function(){
				'step 0'
				if(player.num('h')){
					player.chooseCardButton('读心',target.get('h')).ai=function(button){
						return ai.get.value(button.link)-5;
					}
				}
				else{
					player.viewCards('读心',target.get('h'));
					event.finish();
				}
				'step 1'
				if(result.bool){
					event.card=result.links[[0]];
					player.chooseCard('h',true,'用一张手牌替换'+get.translation(event.card)).ai=function(card){
						return -ai.get.value(card);
					};
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool){
					player.gain(event.card);
					target.gain(result.cards);
					player.$give(1,target);
					target.$give(1,player);
					game.log(player,'与',target,'交换了一张手牌');
				}
			},
			ai:{
				threaten:1.3,
				result:{
					target:function(player,target){
						return -target.num('h');
					}
				},
				order:10,
				expose:0.2,
			}
		},
		feixu:{
			trigger:{global:'respond'},
			filter:function(event,player){
				return event.card&&event.card.name=='shan';
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>0;
			},
			logTarget:'player',
			content:function(){
				trigger.player.draw();
			},
			ai:{
				mingzhi:false,
				threaten:2,
				expose:0.2,
			}
		},
		xuanyan:{
			// trigger:{source:'damageBefore'},
			// forced:true,
			// priority:5,
			// check:function(event,player){
			// 	return player.hp>3;
			// },
			// filter:function(event){
			// 	return event.card&&get.color(event.card)=='red';
			// },
			// content:function(){
			// 	trigger.nature='fire';
			// },
			group:['xuanyan2','xuanyan3']
		},
		xuanyan2:{
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.nature=='fire'&&event.notLink();
			},
			content:function(){
				trigger.num++;
			}
		},
		xuanyan3:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			filter:function(event){
				return event.nature=='fire';
			},
			content:function(){
				player.loseHp();
			}
		},
		ningbin:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.nature=='thunder';
			},
			content:function(){
				player.recover();
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'thunderDamage')){
							if(target.hp<=1||!target.hasSkill('xfenxin')) return [0,0];
							return [0,1.5];
						}
					}
				}
			},
		},
		xfenxin:{
			trigger:{player:'changeHp'},
			forced:true,
			filter:function(event){
				return event.num!=0;
			},
			content:function(){
				player.draw(Math.abs(trigger.num));
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'thunderDamage')) return;
						if(get.tag(card,'damage')||get.tag(card,'recover')){
							return [1,0.2];
						}
					}
				}
			},
			group:'xfenxin2'
		},
		xfenxin2:{
			trigger:{source:'dieAfter'},
			forced:true,
			content:function(){
				player.gainMaxHp();
				player.recover();
			}
		},
		luanjian:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h','sha')>1&&lib.filter.filterCard({name:'sha'},player);
			},
			filterCard:{name:'sha'},
			selectCard:2,
			check:function(card){
				var num=0;
				var player=_status.event.player;
				for(var i=0;i<game.players.length;i++){
					if(lib.filter.targetEnabled({name:'sha'},player,game.players[i])&&
					ai.get.effect(game.players[i],{name:'sha'},player)>0){
						num++;
						if(num>1) return 8-ai.get.value(card);
					}
				}
				return 0;
			},
			selectTarget:[1,Infinity],
			discard:false,
			line:false,
			multiline:true,
			prepare:function(cards,player,targets){
				player.$throw(cards);
				player.line(targets);
			},
			filterTarget:function(card,player,target){
				return lib.filter.targetEnabled({name:'sha'},player,target);
			},
			content:function(){
				"step 0"
				if(!player.hasSkill('unequip')){
					event.added=true;
					player.skills.push('unequip');
				}
				targets.sort(lib.sort.seat);
				player.useCard({name:'sha'},cards,targets,'luanjian').animate=false;
				"step 1"
				if(event.added){
					player.skills.remove('unequip');
				}
			},
			multitarget:true,
			ai:{
				order:function(){
					return lib.card.sha.ai.order+0.1;
				},
				result:{
					target:function(player,target){
						var added=false;
						if(!player.hasSkill('unequip')){
							added=true;
							player.skills.push('unequip');
						}
						var eff=ai.get.effect(target,{name:'sha'},player,target);
						if(added){
							player.skills.remove('unequip');
						}
						return eff;
					}
				},
				effect:{
					player:function(card,player){
						if(_status.currentPhase!=player) return;
						if(card.name=='sha'&&player.num('h','sha')<2&&player.num('h')<=player.hp){
							var num=0;
							var player=_status.event.player;
							for(var i=0;i<game.players.length;i++){
								if(lib.filter.targetEnabled({name:'sha'},player,game.players[i])&&
								ai.get.attitude(player,game.players[i])<0){
									num++;
									if(num>1) return [0,0,0,0];
								}
							}
						}
					}
				},
			}
		},
		tianfu:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h','shan')>0;
			},
			usable:1,
			filterCard:{name:'shan'},
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
				game.delay();
			},
			filterTarget:function(card,player,target){
				return target!=player&&!target.hasSkill('tianfu2');
			},
			check:function(card){
				if(_status.event.player.hp>=3) return 8-ai.get.value(card);
				return 7-ai.get.value(card);
			},
			content:function(){
				target.storage.tianfu2=cards[0];
				target.storage.tianfu3=player;
				game.addVideo('storage',target,['tianfu2',get.cardInfo(cards[0]),'card']);
				target.addSkill('tianfu2');
			},
			ai:{
				result:{
					target:function(player,target){
						var att=ai.get.attitude(player,target);
						if(att>=0) return 0;
						return ai.get.damageEffect(target,player,target);
					}
				},
				expose:0.2
			}
		},
		tianfu2:{
			trigger:{source:'damageAfter'},
			forced:true,
			mark:'card',
			filter:function(event,player){
				return player.storage.tianfu2&&player.storage.tianfu3;
			},
			content:function(){
				"step 0"
				if(player.storage.tianfu3&&player.storage.tianfu3.isAlive()){
					player.damage(player.storage.tianfu3);
					player.storage.tianfu3.line(player,'thunder');
				}
				else{
					player.damage('nosource');
				}
				"step 1"
				var he=player.get('he');
				if(he.length){
					player.discard(he.randomGet());
				}
				"step 2"
				player.$throw(player.storage.tianfu2);
				ui.discardPile.appendChild(player.storage.tianfu2);
				delete player.storage.tianfu2;
				delete player.storage.tianfu3;
				player.removeSkill('tianfu2');
			},
			group:'tianfu3',
			intro:{
				content:'card'
			}
		},
		tianfu3:{
			trigger:{player:'dieBegin'},
			forced:true,
			popup:false,
			content:function(){
				ui.discardPile.appendChild(player.storage.tianfu2);
				delete player.storage.tianfu2;
				delete player.storage.tianfu3;
				player.removeSkill('tianfu2');
			}
		},
		shuiyun:{
			trigger:{player:'phaseEnd'},
			direct:true,
			init:function(player){
				player.storage.shuiyun=[];
			},
			filter:function(event,player){
				if(player.storage.shuiyun.length>=3) return false;
				var types=[];
				for(var i=0;i<player.storage.shuiyun.length;i++){
					types.add(get.type(player.storage.shuiyun[i],'trick'));
				}
				var cards=player.get('h');
				for(var i=0;i<cards.length;i++){
					if(!types.contains(get.type(cards[i],'trick'))){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				var types=[];
				var num=player.num('h');
				for(var i=0;i<player.storage.shuiyun.length;i++){
					types.add(get.type(player.storage.shuiyun[i],'trick'));
				}
				player.chooseCard(get.prompt('shuiyun'),function(card){
					return !types.contains(get.type(card,'trick'));
				}).ai=function(card){
					return 11-ai.get.value(card);
				};
				"step 1"
				if(result.bool){
					player.$throw(result.cards);
					var clone=result.cards[0].clone;
					setTimeout(function(){
						clone.moveDelete(player);
						game.addVideo('gain2',player,get.cardsInfo([clone]));
					},500);
					player.logSkill('shuiyun');
					player.storage.shuiyun.push(result.cards[0]);
					player.lose(result.cards,ui.special);
					player.markSkill('shuiyun');
					game.addVideo('storage',player,['shuiyun',get.cardsInfo(player.storage.shuiyun),'cards']);
				}
			},
			intro:{
				content:'cards',
				onunmark:function(storage,player){
					if(storage&&storage.length){
						for(var i=0;i<storage.length;i++){
							ui.discardPile.appendChild(storage[i]);
						}
						player.$throw(storage);
						delete player.storage.shuiyun;
					}
				}
			},
			ai:{
				effect:{
					player:function(card,player){
						if(_status.currentPhase!=player) return;
						if(card.name=='wuzhong'||card.name=='yiyi'||
							card.name=='yuanjiao'||card.name=='shunshou') return;
						if(player.num('h')<=player.hp){
							var types=[];
							for(var i=0;i<player.storage.shuiyun.length;i++){
								types.add(get.type(player.storage.shuiyun[i],'trick'));
							}
							if(!types.contains(get.type(card,'trick'))){
								return [0,0,0,0];
							}
						}
					}
				},
				threaten:2.2
			},
			group:['shuiyun5']
		},
		shuiyun5:{
			trigger:{global:'dying'},
			priority:6,
			filter:function(event,player){
				return event.player.hp<=0&&player.storage.shuiyun&&player.storage.shuiyun.length;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseCardButton(player.storage.shuiyun,get.prompt('shuiyun',trigger.player)).ai=function(button){
					return ai.get.attitude(player,trigger.player)>2?1:0;
				}
				"step 1"
				if(result.bool){
					player.storage.shuiyun.remove(result.links[0]);
					if(!player.storage.shuiyun.length){
						player.unmarkSkill('shuiyun');
					}
					player.$throw(result.links);
					ui.discardPile.appendChild(result.links[0]);
					trigger.player.recover();
					// if(trigger.player!=player){
					// 	trigger.player.draw();
					// }
					player.logSkill('shuiyun5',trigger.player,'thunder');
					game.addVideo('storage',player,['shuiyun',get.cardsInfo(player.storage.shuiyun),'cards']);
				}
				else{
					event.finish();
				}
				"step 2"
				if(trigger.player!=player){
					game.delay();
				}
			},
			ai:{
				expose:0.3
			}
		},
		wangyou:{
			trigger:{global:'phaseEnd'},
			unique:true,
			gainable:true,
			direct:true,
			filter:function(event,player){
				if(!player.num('he')) return false;
				if(player==event.player) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hasSkill('wangyou3')) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				var targets=[];
				var num=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hasSkill('wangyou3')){
						var att=ai.get.attitude(player,game.players[i]);
						if(att>0) num++;
						else if(att<0) num--;
						targets.push(game.players[i]);
					}
				}
				event.targets=targets;
				var next=player.chooseToDiscard(get.prompt('wangyou',targets),'he');
				next.logSkill=['wangyou',event.targets];
				next.ai=function(card){
					if(num<=0) return 0;
					switch(num){
						case 1:return 5-ai.get.value(card);
						case 2:return 7-ai.get.value(card);
						default:return 8-ai.get.value(card);
					}
				}
				"step 1"
				if(result.bool){
					event.targets.sort(lib.sort.seat);
					game.asyncDraw(event.targets);
				}
				else{
					event.finish();
				}
			},
			ai:{
				expose:0.1,
				threaten:1.2
			},
			group:'wangyou2'
		},
		wangyou2:{
			trigger:{global:'damageEnd'},
			forced:true,
			popup:false,
			silent:true,
			filter:function(event){
				return event.player.isAlive();
			},
			content:function(){
				trigger.player.addTempSkill('wangyou3','phaseAfter');
			}
		},
		wangyou3:{},
		changnian:{
			forbid:['boss'],
			trigger:{player:'dieBegin'},
			direct:true,
			unique:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('changnian'),function(card,player,target){
					return player!=target;
				}).ai=function(target){
					return ai.get.attitude(player,target);
				};
				"step 1"
				if(result.bool){
					var cards=player.get('hej');
					var target=result.targets[0];
					// if(player.storage.shuiyun&&player.storage.shuiyun.length){
					// 	target.gainMaxHp();
					// 	target.recover(player.storage.shuiyun.length);
					// 	cards=cards.concat(player.storage.shuiyun);
					// 	player.storage.shuiyun.length=0;
					// }
					player.$give(cards,target);
					target.gain(cards);
					target.addSkill('changnian2');
					player.logSkill('changnian',target);
					target.marks.changnian=target.markCharacter(player,{
						name:'长念',
						content:'$<div><div class="skill">【追思】</div><div>锁定技，回合结束阶段，你摸一张牌</div></div>'
					});
					game.addVideo('markCharacter',target,{
						name:'长念',
						content:'$<div><div class="skill">【追思】</div><div>锁定技，回合结束阶段，你摸一张牌</div></div>',
						id:'changnian',
						target:player.dataset.position
					});
				}
			},
			ai:{
				threaten:0.8
			}
		},
		changnian2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.draw();
			},
		},
		sajin:{
			enable:'phaseUse',
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp;
			},
			selectTarget:[1,Infinity],
			filterCard:true,
			usable:1,
			check:function(card){
				var player=_status.currentPhase;
				if(player.num('h')>player.hp){
					return 7-ai.get.value(card);
				}
				return 4-ai.get.value(card);
			},
			content:function(){
				"step 0"
				var color=get.color(cards[0]);
				target.judge(function(card){
					return get.color(card)==color?1:0;
				});
				"step 1"
				if(result.bool){
					target.recover();
				}
			},
			ai:{
				order:3,
				result:{
					target:function(player,target){
						return ai.get.recoverEffect(target);
					}
				},
				threaten:1.5
			}
		},
		jubao:{
			trigger:{global:'discardAfter'},
			filter:function(event,player){
				if(player.hasSkill('jubao2')) return false;
				if(event.player==player) return false;
				if(_status.currentPhase==player) return false;
				for(var i=0;i<event.cards.length;i++){
					if(get.type(event.cards[i])!='basic'&&get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			frequent:true,
			content:function(){
				"step 0"
				if(trigger.delay==false) game.delay();
				"step 1"
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					if(get.type(trigger.cards[i])!='basic'&&get.position(trigger.cards[i])=='d'){
						cards.push(trigger.cards[i]);
					}
				}
				if(cards.length){
					var card=cards.randomGet();
					player.gain(card);
					player.$gain2(card);
					game.log(player,'获得了',card);
					player.addTempSkill('jubao2','phaseAfter');
				}
			},
			ai:{
				threaten:1.5
			}
		},
		jubao2:{},
		duci:{
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
				player.chooseTarget(get.prompt('duci'),function(card,player,target){
					return player!=target&&get.distance(player,target)<=1;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player);
				};
				"step 1"
				if(result.bool){
					player.logSkill('duci',result.targets);
					result.targets[0].damage();
				}
			},
			ai:{
				expose:0.2,
				threaten:1.5,
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='equip'){
							for(var i=0;i<game.players.length;i++){
								if(player!=game.players[i]&&get.distance(player,game.players[i])<=1&&
								  ai.get.damageEffect(game.players[i],player,player)>0){
									return [1,3];
								}
							}
						}
					}
				}
			}
		},
		shuangren:{
			trigger:{player:['loseEnd']},
			filter:function(event,player){
				if(!player.equiping) return false;
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original=='e'&&get.subtype(event.cards[i])=='equip1') return true;
				}
				return false;
			},
			content:function(){
				var card;
				for(var i=0;i<trigger.cards.length;i++){
					if(trigger.cards[i].original=='e'&&get.subtype(trigger.cards[i])=='equip1'){
						card=trigger.cards[i];
					}
				}
				if(card){
					if(player.storage.shuangren){
						player.unmark(player.storage.shuangren,'shuangren');
						player.discard(player.storage.shuangren);
						game.addVideo('unmarkId',player,[get.cardInfo(player.storage.shuangren),'shuangren']);
					}
					if(card.clone){
						card.clone.moveDelete(player);
						game.addVideo('gain2',player,get.cardsInfo([card.clone]));
						player.mark(card,'shuangren');
						game.addVideo('markId',player,[get.cardInfo(card),'shuangren']);
					}
					ui.special.appendChild(card);
					player.storage.shuangren=card;
					var info=get.info(card);
					if(info.skills){
						player.addAdditionalSkill('shuangren',info.skills);
					}
					else{
						player.removeAdditionalSkill('shuangren');
					}
				}

			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.subtype(card)=='equip1') return [1,3];
					}
				}
			},
			intro:{
				content:'card'
			},
			group:'shuangren2'
		},
		shuangren2:{
			trigger:{player:'dieBegin'},
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				return player.storage.shuangren?true:false;
			},
			content:function(){
				if(player.storage.shuangren){
					ui.discardPile.appendChild(player.storage.shuangren);
					player.$throw(player.storage.shuangren);
				}
			}
		},
		guiyuan:{
			enable:'phaseUse',
			usable:1,
			filterCard:{name:'sha'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				player.recover();
			},
			ai:{
				order:5,
				result:{
					player:1
				}
			}
		},
		qijian:{
			trigger:{player:'phaseDiscardEnd'},
			direct:true,
			filter:function(event,player){
				return event.cards&&event.cards.length>0;
			},
			content:function(){
				"step 0"
				player.chooseTarget([1,trigger.cards.length],get.prompt('qijian'),function(card,player,target){
					return player.canUse({name:'sha'},target,false);
				}).ai=function(target){
					return ai.get.effect(target,{name:'sha'},player);
				};
				"step 1"
				if(result.bool){
					player.logSkill('qijian');
					player.useCard({name:'sha'},result.targets);
				}
			},
		},
		shenmu:{
			trigger:{global:'dying'},
			priority:6,
			filter:function(event,player){
				return event.player.hp<=0&&player.num('h',{color:'red'});
			},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)<=0) return false;
				var cards=player.get('h',{color:'red'});
				for(var i=0;i<cards.length;i++){
					if(cards[i].name=='tao') return false;
					if(ai.get.value(cards[i])>7&&cards.length>2) return false;
				}
			},
			content:function(){
				"step 0"
				player.showHandcards();
				"step 1"
				var cards=player.get('h',{color:'red'});
				event.num=cards.length;
				player.discard(cards);
				"step 2"
				trigger.player.recover();
				trigger.player.draw(event.num);
			},
			ai:{
				threaten:1.6,
				expose:0.2
			}
		},
		qianfang:{
			trigger:{player:'phaseBegin'},
			direct:true,
			filter:function(event,player){
				return player.storage.xuanning&&player.num('he')+player.storage.xuanning>=3;
			},
			content:function(){
				"step 0"
				var ainum=0;
				var num=3-player.storage.xuanning;
				event.targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&!game.players[i].isOut()&&
						lib.filter.targetEnabled({name:'wanjian'},player,game.players[i])){
						ainum+=ai.get.effect(game.players[i],{name:'wanjian'});
						event.targets.push(game.players[i]);
					}
				}
				if(num){
					var next=player.chooseToDiscard(num,get.prompt('qianfang'),'he');
					next.ai=function(card){
						if(ainum>=0){
							switch(num){
								case 1:return 8-ai.get.value(card);
								case 2:return 6-ai.get.value(card);
								case 3:return 4-ai.get.value(card);
							}
						}
						return -1;
					}
					next.logSkill='qianfang';
					event.logged=true;
				}
				else{
					player.chooseBool(get.prompt('qianfang')).ai=function(){
						return ainum>=0;
					}
				}
				"step 1"
				if(result.bool){
					player.storage.xuanning=0;
					player.unmarkSkill('xuanning');
					player.addTempSkill('qianfang2','phaseAfter');
					if(!event.logged) player.logSkill('qianfang');
					player.useCard({name:'wanjian'},event.targets);
				}
				else{
					event.finish();
				}
			},
			ai:{
				expose:0.1,
				threaten:1.5
			}
		},
		qianfang2:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			popup:false,
			content:function(){
				trigger.num++;
			}
		},
		poyun:{
			trigger:{source:'damageEnd'},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<0&&event.player.num('he')>1;
			},
			filter:function(event,player){
				return player.storage.xuanning>0&&event.player.num('he')>0;
			},
			direct:true,
			content:function(){
				"step 0"
				player.discardPlayerCard(trigger.player,'he',get.prompt('poyun'),[1,2]).logSkill=['poyun',trigger.player];
				"step 1"
				if(result.bool){
					player.storage.xuanning--;
					if(!player.storage.xuanning){
						player.unmarkSkill('xuanning');
					}
					player.syncStorage('xuanning');
				}
			},
			ai:{
				threaten:1.3
			}
		},
		poyun2:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return player.storage.poyun?true:false;
			},
			content:function(){
				player.draw();
				player.storage.poyun=false;
				player.removeSkill('poyun2');
			}
		},
		poyun3:{},
		zhuyue:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('he',{type:'basic'})<player.num('he');
			},
			// position:'he',
			init:function(player){
				player.storage.zhuyue=[];
			},
			filterCard:function(card){
				return get.type(card)!='basic';
			},
			selectTarget:[1,2],
			filterTarget:function(card,player,target){
				return player!=target&&target.num('he')>0;
			},
			usable:1,
			locked:false,
			check:function(card){
				return 7-ai.get.value(card);
			},
			multitarget:true,
			multiline:true,
			content:function(){
				'step 0'
				targets.sort(lib.sort.seat);
				var target=targets[0];
				var cs=target.get('he');
				if(cs.length){
					target.discard(cs.randomGet());
				}
				player.storage.zhuyue.add(target);
				if(targets.length<2){
					event.finish();
				}
				'step 1'
				var target=targets[1];
				var cs=target.get('he');
				if(cs.length){
					target.discard(cs.randomGet());
				}
				player.storage.zhuyue.add(target);
			},
			ai:{
				result:{
					target:function(player,target){
						if(!target.num('he')) return -0.2;
						return -1;
					}
				},
				order:10,
				threaten:1.2,
				exoise:0.2
			},
			mod:{
				targetInRange:function(card,player,target){
					if(card.name=='sha'&&player.storage.zhuyue&&player.storage.zhuyue.contains(target)){
						return true;
					}
				},
				selectTarget:function(card,player,range){
					if(card.name=='sha'&&player.storage.zhuyue&&player.storage.zhuyue.length){
						range[1]=-1;
						range[0]=-1;
					}
				},
				playerEnabled:function(card,player,target){
					if(card.name=='sha'&&player.storage.zhuyue&&player.storage.zhuyue.length&&!player.storage.zhuyue.contains(target)){
						return false;
					}
				}
			},
			intro:{
				content:'players'
			},
			group:'zhuyue2'
		},
		zhuyue2:{
			trigger:{player:'phaseUseEnd'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.storage.zhuyue.length=0;
			}
		},
		longxi:{
			trigger:{player:['chooseToRespondBegin','chooseToUseBegin']},
			forced:true,
			popup:false,
			max:2,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			priority:101,
			content:function(){
				var cards=[];
				var max=Math.min(ui.cardPile.childNodes.length,lib.skill.longxi.max);
				for(var i=0;i<max;i++){
					var card=ui.cardPile.childNodes[i];
					if(trigger.filterCard(card,player)){
						cards.push(card);
					}
				}
				if(cards.length){
					player.gain(cards,'draw');
					player.logSkill('longxi');
					game.log(player,'获得了'+get.cnNumber(cards.length)+'张牌');
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,effect){
						if(get.tag(card,'respondShan')) return 0.7;
						if(get.tag(card,'respondSha')) return 0.7;
					}
				}
			},
			hiddenCard:function(player,name){
				if(_status.currentPhase==player) return false;
				var max=Math.min(ui.cardPile.childNodes.length,lib.skill.longxi.max);
				for(var i=0;i<max;i++){
					var card=ui.cardPile.childNodes[i];
					if(card.name==name) return true;
				}
				return false;
			}
		},
		guanri:{
			unique:true,
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.guanri&&player.num('h',{color:'red'})>=2;
			},
			check:function(card){
				return 8-ai.get.value(card);
			},
			filterCard:function(card){
				return get.color(card)=='red';
			},
			selectCard:2,
			filterTarget:function(card,player,target){
				return player!=target&&target.hp>=player.hp;
			},
			intro:{
				content:'limited'
			},
			line:'fire',
			content:function(){
				"step 0"
				player.storage.guanri=true;
				player.loseHp();
				"step 1"
				target.damage(2,'fire');
				"step 2"
				if(target.isAlive()){
					target.discard(target.get('e'));
				}
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						var eff=ai.get.damageEffect(target,player,target,'fire');
						if(player.hp>2) return eff;
						if(player.hp==2&&target.hp==2) return eff;
						return 0;
					}
				},
				expose:0.5
			}
		},
		tianxian:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha') return true;
				},
				selectTarget:function(card,player,range){
					if(card.name=='sha'&&range[1]!=-1) range[1]=Infinity;
				}
			},
			priority:5.5,
			trigger:{player:'useCardToBefore'},
			filter:function(event){
				return event.card.name=='sha';
			},
			forced:true,
			check:function(){
				return false;
			},
			content:function(){
				"step 0"
				trigger.target.judge(function(card){
					return get.color(card)=='black'?1:0;
				});
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.finish();
				}
			}
		},
		runxin:{
			trigger:{player:['useCard','respondEnd']},
			direct:true,
			filter:function(event){
				if(get.suit(event.card)=='heart'){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].hp<game.players[i].maxHp){
							return true;
						}
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				var noneed=(trigger.card.name=='tao'&&trigger.targets[0]==player&&player.hp==player.maxHp-1);
				player.chooseTarget(get.prompt('runxin'),function(card,player,target){
					return target.hp<target.maxHp
				}).ai=function(target){
					var num=ai.get.attitude(player,target);
					if(num>0){
						if(noneed&&player==target){
							num=0.5;
						}
						else if(target.hp==1){
							num+=3;
						}
						else if(target.hp==2){
							num+=1;
						}
					}
					return num;
				}
				"step 1"
				if(result.bool){
					player.logSkill('runxin',result.targets);
					result.targets[0].recover();
				}
			},
			ai:{
				expose:0.3,
				threaten:1.5
			}
		},
		zhimeng:{
			trigger:{player:'phaseEnd'},
			direct:true,
			locked:true,
			unique:true,
			gainable:true,
			group:'zhimeng3',
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('zhimeng'),function(card,player,target){
					return player!=target;
				}).ai=function(target){
					var num=ai.get.attitude(player,target);
					if(num>0){
						if(player==target){
							num++;
						}
						if(target.hp==1){
							num+=3;
						}
						if(target.hp==2){
							num+=1;
						}
					}
					return num;
				}
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					var card=get.cards()[0];
					target.$draw(card);
					target.storage.zhimeng2=card;
					game.addVideo('storage',target,['zhimeng2',get.cardInfo(card),'card']);
					target.addSkill('zhimeng2');
					event.finish();
					player.logSkill('zhimeng',target);
				}
			},
			ai:{
				expose:0.2
			}
		},
		zhimeng2:{
			intro:{
				content:'card',
				onunmark:function(storage,player){
					delete player.storage.zhimeng2;
				}
			},
			mark:'card',
			trigger:{target:'useCardToBegin'},
			frequent:true,
			filter:function(event,player){
				return player.storage.zhimeng2&&get.type(event.card,'trick')==get.type(player.storage.zhimeng2,'trick');
			},
			content:function(){
				player.draw();
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(target.storage.zhimeng2&&get.type(card,'trick')==get.type(target.storage.zhimeng2,'trick')){
							return [1,0.5];
						}
					}
				}
			}
		},
		zhimeng3:{
			trigger:{player:['phaseBegin','dieBegin']},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				"step 0"
				event.players=game.players.slice(0);
				event.num=0;
				"step 1"
				if(event.num<event.players.length){
					var player=event.players[event.num];
					if(player.storage.zhimeng2){
						if(trigger.name=='die'&&player==trigger.player){
							ui.discardPile.appendChild(player.storage.zhimeng2);
						}
						else{
							game.log(player,'发动织梦，获得了',player.storage.zhimeng2);
							player.gain(player.storage.zhimeng2,'gain2');
							player.popup('zhimeng');
						}
						player.removeSkill('zhimeng2');
					}
					event.num++;
					event.redo();
				}
			},
		},
		tannang:{
			enable:'chooseToUse',
			usable:1,
			filterCard:function(card){
				return get.suit(card)=='club';
			},
			filter:function(event,player){
				return player.num('h',{suit:'club'});
			},
			viewAs:{name:'shunshou'},
			viewAsFilter:function(player){
				if(!player.num('h',{suit:'club'})) return false;
			},
			prompt:'将一张装备牌当顺手牵羊使用',
			check:function(card){
				var player=_status.currentPhase;
				if(player.num('h',{subtype:get.subtype(card)})>1){
					return 11-ai.get.equipValue(card);
				}
				if(player.num('h')<player.hp){
					return 6-ai.get.value(card);
				}
				return 2-ai.get.equipValue(card);
			},
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='shunshou') return true;
				},
			},
			ai:{
				order:9.5,
				threaten:1.5
			}
		},
		xiaoyao:{
			group:'feiying',
			direct:true,
			filter:function(event,player){
				return event.player!=player&&player.num('he')>1;
			},
			trigger:{target:'useCardToBefore'},
			content:function(){
				"step 0"
				var next=player.chooseToDiscard('是否弃置两张牌使'+get.translation(trigger.card)+'失效？','he',2);
				next.logSkill='xiaoyao';
				next.ai=function(card){
					if(ai.get.effect(player,trigger.card,trigger.player,player)<0){
						if(get.tag(trigger.card,'respondSha')&&player.num('h','sha')) return 0;
						if(get.tag(trigger.card,'respondShan')&&player.num('h','shan')) return 0;
						if(card.name=='guohe') return 0;
						return 4-ai.get.value(card);
					}
					return 0;
				}
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.finish();
				}
			}
		},
		tuoqiao:{
			filter:function(event,player){
				return game.players.length>3&&(event.player==player.next||event.player==player.previous);
			},
			check:function(event,player){
				return ai.get.effect(player,event.card,event.player,player)<0
			},
			changeSeat:true,
			trigger:{target:'useCardToBefore'},
			content:function(){
				if(trigger.player==player.next){
					game.swapSeat(player,player.previous);
				}
				else if(trigger.player==player.previous){
					game.swapSeat(player,player.next);
				}
				else{
					return;
				}
				trigger.untrigger();
				trigger.finish();
				// player.popup('xiaoyao');
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(target==player.next||target==player.previous) return 0.1;
					}
				}
			}
		},
		yujian:{
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
		huimeng:{
			trigger:{player:'recoverAfter'},
			frequent:true,
			content:function(){
				player.draw(2);
			},
			ai:{
				threaten:0.8
			}
		},
		tianshe:{
			group:['tianshe2'],
			trigger:{player:'damageBefore'},
			filter:function(event){
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
						if(card.name=='tiesuo') return 0;
						if(get.tag(card,'fireDamage')) return 0;
						if(get.tag(card,'thunderDamage')) return 0;
					}
				}
			}
		},
		tianshe2:{
			trigger:{source:'damageAfter'},
			filter:function(event,player){
				if(event.nature&&player.hp<player.maxHp) return true;
			},
			forced:true,
			content:function(){
				player.recover();
			},
		}
	},
	translate:{
		pal_xiahoujinxuan:'夏侯瑾轩',
		pal_muchanglan:'暮菖兰',
		pal_xia:'瑕',
		pal_jiangcheng:'姜承',

		pal_jiangyunfan:'姜云凡',
		pal_tangyurou:'唐雨柔',
		pal_longyou:'龙幽',
		pal_xiaoman:'小蛮',

		pal_wangxiaohu:'王小虎',
		pal_sumei:'苏媚',
		pal_shenqishuang:'沈欺霜',
		pal_longkui:'龙葵',
		pal_nangonghuang:'南宫煌',
		pal_wenhui:'温慧',
		pal_wangpengxu:'王蓬絮',
		pal_xingxuan:'星璇',
		pal_leiyuange:'雷元戈',

		pal_zhaoliner:'赵灵儿',
		pal_linyueru:'林月如',
		pal_xuejian:'雪见',
		pal_jingtian:'景天',
		pal_zixuan:'紫萱',
		pal_lixiaoyao:'李逍遥',
		pal_yuntianhe:'云天河',
		pal_hanlingsha:'韩菱纱',
		pal_liumengli:'柳梦璃',
		pal_murongziying:'慕容紫英',
		pal_changqing:'长卿',
		pal_xuanxiao:'玄霄',

		zhangmu:'障目',
		zhangmu_info:'每回合限一次，当你需要使用或打出一张闪时，你可以展示一张闪，视为使用或打出了此闪',
		feizhua:'飞爪',
		feizhua_info:'当你使用一张杀时，你可以将目标两侧的角色追加为额外目标',
		leiyu:'雷狱',
		leiyu_info:'回合结束阶段，你可以失去一点体力，视为对本回合内所有成为过你的卡牌目标的角色使用一张惊雷闪，若你杀死任意一名角色，你回复一点体力',
		lingxue:'灵血',
		lingxue_info:'锁定技，每当你回复一点体力，你获得一点护甲',
		zhaoyao:'招摇',
		zhaoyao_info:'其他角色的摸牌阶段开始时，你可以与其拼点，若你赢，你摸两张牌，然后将两张牌置于牌堆顶',
		sheling:'摄灵',
		sheling_info:'其他角色于你的回合内因使用、打出或弃置而失去牌时，你可以获得之（每回合最多发动三次）',
		fenxing:'分形',
		fenxing_info:'锁定技，回合开始阶段，你有50%概率变身为另一形态',
		guijiang:'鬼降',
		guijiang2:'鬼降',
		guijiang_info:'出牌阶段限一次，你可以弃置一张黑色牌，令一名其他角色无法成为回复牌的目标直到你下一回合开始',
		diesha:'叠杀',
		diesha_info:'锁定技，每当你使用杀造成伤害，受伤害角色失去一点体力，你回复一点体力',
		lingyu:'灵愈',
		lingyu_info:'回合结束阶段，你可以令一名其他角色回复一点体力',
		diewu:'蝶舞',
		diewu_info:'出牌阶段，你可以将一张【杀】交给一名角色，若你于此阶段内首次如此做，你摸一张牌',
		duxinshu:'读心',
		duxinshu_info:'出牌阶段限一次，你可以观看一名其他角色的手牌，然后可以用一张手牌替换其中的一张',
		feixu:'飞絮',
		feixu_info:'每当一名角色使用或打出一张闪，你可以令其摸一张牌',
		xuanyan:'玄炎',
		xuanyan2:'玄炎',
		xuanyan_info:'锁定技，你的火属性伤害+1；你造成火属性伤害后流失1点体力',
		ningbin:'凝冰',
		ningbin_info:'锁定技，每当你受到1次雷属性伤害，你回复1点体力',
		xfenxin:'焚心',
		xfenxin2:'焚心',
		xfenxin_info:'锁定技，每当你的体力值发生改变，你摸等量的牌；每当你杀死一名角色，你增加一点体力上限并回复一点体力',
		luanjian:'乱剑',
		luanjian_info:'你可以将两张杀当杀使用，此杀无视距离和防具，且可以指定任意名目标',
		tianfu:'天符',
		tianfu2:'天符',
		tianfu3:'天符',
		tianfu_info:'出牌阶段，你可以将一张闪置于一名其他角色的武将牌上，该角色在下一次造成伤害时受到来自你的一点雷属性伤害并随机弃置一张牌，然后将此牌置入弃牌堆',
		shuiyun:'水蕴',
		shuiyun_bg:'蕴',
		shuiyun2:'水蕴',
		shuiyun5:'水蕴',
		shuiyun3:'水蕴',
		shuiyun_info:'回合结束阶段，你可以将一张与武将牌上的牌类别均不相同的手牌置于武将牌上称为“蕴”；任意一名角色进入濒死状态时，你可以弃置一张“蕴”令其回复1点体力',
		wangyou:'忘忧',
		wangyou_info:'其他角色的回合结束阶段，你可以弃置一张牌，令此回合内受过伤害的所有角色各摸一张牌',
		changnian:'长念',
		changnian2:'追思',
		changnian_info:'你死亡时，可以将所有牌交给一名其他角色，令其获得技能【追思】',
		sajin:'洒金',
		sajin_info:'出牌阶段限一次，你可以弃置一张手牌并指定任意名角色进行判定，若判定颜色与你弃置的牌相同，该角色回复一点体力',
		jubao:'聚宝',
		jubao_info:'当其他角色于你的回合外首次弃置非基本牌时，你可以获得其中的随机一张',
		guiyuan:'归元',
		guiyuan_info:'出牌阶段限一次，你可以弃置一张杀并回复一点体力',
		shuangren:'双刃',
		shuangren_info:'当你的武器牌被替换时，你可以将其置于你的武将牌上，并获得此装备的武器效果（不含距离）',
		duci:'毒刺',
		duci_info:'每当你失去一次装备牌，可以对距离1以内的一名其他角色造成一点伤害',
		shenmu:'神木',
		shenmu_info:'任意一名角色濒死时，你可以展示你的手牌并弃置其中的所有红色牌（至少一张），若如此做，该角色回复一点体力，然后摸X张牌，X为你弃置的手牌数',
		qijian:'气剑',
		qijian_info:'弃牌阶段结束时，你可以指定至多X名目标视为使用一张杀，X为你于此阶段弃置的卡牌数',
		poyun:'破云',
		poyun_info:'每当你造成一次伤害，你可以弃置一枚玄凝标记，然后弃置对方两张牌',
		qianfang:'千方',
		qianfang_info:'回合开始阶段，若你有玄凝标记，可以弃置3-X张牌和所有玄凝标记，视为使用了一张【万箭齐发】，若如此做，你本回合的摸牌阶段摸牌数+1。X为你的玄凝标记数',
		longxi:'龙息',
		longxi2:'龙息',
		longxi_info:'锁定技，在回合外每当你需要使用或打出一张卡牌时，若牌堆顶的前两张中有可使用或打出的牌，你立即获得之',
		zhuyue:'逐月',
		zhuyue_info:'出牌阶段限一次，你可以弃置一张非基本牌并指定至多两个目标各随机弃置一张牌，若如此做，你本回使用的杀须指定选中角色为目标',
		guanri:'贯日',
		guanri_info:'限制技，你可以弃置两张红色手牌并流失一点体力，然后对一名体力值不少于你的其他角色造成两点火焰伤害并弃置其所有装备牌',
		tianxian:'天弦',
		tianxian_info:'锁定技，你的杀无视距离且可指定任意多个目标，目标须进行一次判定，若结果为黑色则取消之',
		zhimeng:'织梦',
		zhimeng2:'织梦',
		zhimeng3:'织梦',
		zhimeng_info:'回合结束阶段，你可以选择一名其他角色将牌堆顶的一张牌置于该角色的武将牌上，直到你的下个回合开始将其收入手牌。当一名角色武将牌上有牌时，每当其成为与此牌类型相同的卡牌的目标，可以摸一张牌',
		runxin:'润心',
		runxin_info:'每当你使用或打出一张红桃牌，你可以令一名角色回复一点体力',
		tannang:'探囊',
		tannang_info:'你可以将一张梅花手牌当顺手牵羊使用（每回合最多发动1次）；你的顺手牵羊无距离限制',
		tuoqiao:'脱壳',
		tuoqiao_info:'每当你成为身边角色的卡牌的目标，你可以将座位后移一位，然后取消之',
		xiaoyao:'逍遥',
		xiaoyao_info:'锁定技，计算其他角色与你的距离时始终+1；每当你成为其他角色的卡牌目标时，你可以弃置两张牌使其失效',
		yujian:'御剑',
		yujian_info:'出牌阶段，你可以弃置一张手牌并将你的座位移到任意位置，每阶段限一次',
		huimeng:'回梦',
		huimeng_info:'每当你回复一点体力，可以摸两张牌',
		tianshe:'天蛇',
		tianshe2:'天蛇',
		tianshe_info:'锁定技，你防止即将受到的属性伤害，每当你造成一次属性伤害，你回复一点体力',
	},
}
