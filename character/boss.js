'usr strict';
character.boss={
	mode:['identity','guozhan','stone','boss'],
	character:{
		boss_zhangchunhua:['female','wei',4,['jueqing','wuxin','shangshix'],['boss','bossallowed'],'wei'],
		boss_zhenji:['female','wei',4,['tashui','lingbo','jiaoxia','fanghua'],['boss','bossallowed'],'wei'],
		// boss_liubei:['male','shu',5,['lingfeng'],['boss','bossallowed'],'qun'],
		// boss_zhugeliang:['male','shu',4,[],['boss','bossallowed'],'qun'],
		boss_huangyueying:['female','shu',4,['boss_gongshen','boss_jizhi','qicai','boss_guiyin'],['boss','bossallowed'],'wei'],
		boss_pangtong:['male','shu',4,['boss_tianyu','qiwu','niepan','boss_yuhuo'],['boss','bossallowed'],'zhu'],
		boss_zhaoyun:['male','shu',1,['boss_juejing','longhun','zhanjiang'],['boss','bossallowed'],'qun'],
		boss_zhouyu:['male','wu',6,['huoshen','boss_honglian','boss_xianyin'],['boss','bossallowed'],'zhu'],

		boss_zhuoguiquxie:['male','qun',0,['boss_bianshen'],['boss','bossallowed']],
		boss_baiwuchang:['male','qun',9,['boss_baolian','boss_qiangzheng','boss_zuijiu','juece','boss_bianshen4'],['hiddenboss','bossallowed']],
		boss_heiwuchang:['male','qun',9,['boss_guiji','boss_taiping','boss_suoming','boss_xixing','boss_bianshen4'],['hiddenboss','bossallowed']],
		boss_luocha:['male','qun',12,['boss_modao','boss_yushou','yizhong','boss_moyany'],['hiddenboss','bossallowed']],
		boss_yecha:['male','qun',11,['boss_modao','boss_mojian','bazhen','boss_danshu'],['hiddenboss','bossallowed']],
		boss_niutou:['male','qun',7,['boss_baolian','niepan','boss_manjia','boss_xiaoshou','boss_bianshen3'],['hiddenboss','bossallowed']],
		boss_mamian:['male','qun',6,['boss_guiji','fankui','boss_lianyu','juece','boss_bianshen3'],['hiddenboss','bossallowed']],
		boss_chi:['male','qun',5,['boss_guimei','boss_didong','boss_shanbeng','boss_bianshen2'],['hiddenboss','bossallowed']],
		boss_mo:['female','qun',5,['boss_guimei','enyuan','boss_beiming','boss_bianshen2'],['hiddenboss','bossallowed']],
		boss_wang:['male','qun',5,['boss_guimei','boss_luolei','huilei','boss_bianshen2'],['hiddenboss','bossallowed']],
		boss_liang:['female','qun',5,['boss_guimei','boss_guihuo','boss_minbao','boss_bianshen2'],['hiddenboss','bossallowed']],

		boss_lvbu1:['male','qun',8,['mashu','wushuang','boss_baonu'],['boss','bossallowed'],'wei'],
		boss_lvbu2:['male','qun',4,['mashu','wushuang','swd_xiuluo','shenwei','shenji'],['hiddenboss','bossallowed'],'qun'],
		boss_caiwenji:['female','qun',4,['beige','boss_hujia','boss_guihan'],['boss','bossallowed'],'wei'],
		boss_zhangjiao:['male','qun',8,['boss_leiji','tiandao','jidian'],['boss','bossallowed'],'shu'],
		boss_zuoci:['male','qun',0,['huanhua'],['boss','bossallowed'],'shu'],
		// boss_yuji:['male','qun',8,[],['boss','bossallowed'],'nei'],
		boss_diaochan:['female','qun',4,['fengwu','yunshen','lianji','boss_wange','yuehun'],['boss','bossallowed'],'qun'],
		boss_huatuo:['male','qun',6,['chulao','mazui','boss_shengshou','guizhen','wuqin'],['boss','bossallowed'],'wu'],
		boss_dongzhuo:['male','qun',20,['jiuchi','boss_qiangzheng','boss_baolin'],['boss','bossallowed'],'shu'],
		// boss_shuijing:['male','qun',8,[],['boss','bossallowed'],'wei'],

	},
	skill:{
		boss_bianshen2:{
			mode:['boss'],
			global:'boss_bianshen2x'
		},
		boss_bianshen2x:{
			trigger:{global:'dieAfter'},
			forced:true,
			priority:-10,
			filter:function(event){
				if(lib.config.mode!='boss') return false;
				return event.player==game.boss&&event.player.skills.contains('boss_bianshen2');
			},
			content:function(){
				'step 0'
				game.delay();
				'step 1'
				game.changeBoss(['boss_niutou','boss_mamian'].randomGet());
			}
		},
		boss_bianshen3:{
			mode:['boss'],
			global:'boss_bianshen3x'
		},
		boss_bianshen3x:{
			trigger:{global:'dieAfter'},
			forced:true,
			priority:-10,
			filter:function(event){
				if(lib.config.mode!='boss') return false;
				return event.player==game.boss&&event.player.skills.contains('boss_bianshen3');
			},
			content:function(){
				'step 0'
				game.delay();
				'step 1'
				game.changeBoss(['boss_baiwuchang','boss_heiwuchang'].randomGet());
			}
		},
		boss_bianshen4:{
			mode:['boss'],
			global:'boss_bianshen4x'
		},
		boss_bianshen4x:{
			trigger:{global:'dieAfter'},
			forced:true,
			priority:-10,
			filter:function(event){
				if(lib.config.mode!='boss') return false;
				return event.player==game.boss&&event.player.skills.contains('boss_bianshen4');
			},
			content:function(){
				'step 0'
				game.delay();
				'step 1'
				game.changeBoss(['boss_yecha','boss_luocha'].randomGet());
			}
		},
		boss_moyany:{
			trigger:{player:'loseEnd'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				});
				"step 1"
				if(result.bool){
					player.chooseTarget(true,'选择一个目标对其造成两点火焰伤害',function(card,player,target){
						return player!=target;
					}).ai=function(target){
						return ai.get.damageEffect(target,player,player,'fire');
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.targets.length){
					player.line(result.targets,'fire');
					result.targets[0].damage(2,'fire');
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'loseCard')){
							return [0.5,1];
						}
					}
				}
			}
		},
		boss_danshu:{
			trigger:{player:'loseEnd'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return _status.currentPhase!=player&&player.hp<player.maxHp;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				});
				"step 1"
				if(result.color=='red'){
					player.recover();
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'loseCard')){
							return [0.5,1];
						}
					}
				}
			}
		},
		boss_modao:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				player.draw(2);
			}
		},
		boss_mojian:{
			trigger:{player:'phaseUseBegin'},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(player.canUse('wanjian',game.players[i])){
						list.push(game.players[i]);
					}
				}
				list.sort(lib.sort.seat);
				player.useCard({name:'wanjian'},list);
			}
		},
		boss_yushou:{
			trigger:{player:'phaseUseBegin'},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(player.canUse('nanman',game.players[i])){
						list.push(game.players[i]);
					}
				}
				list.sort(lib.sort.seat);
				player.useCard({name:'nanman'},list);
			}
		},
		boss_zuijiu:{
			trigger:{source:'damageBegin'},
			filter:function(event){
				return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&
				event.parent.name!='_lianhuan'&&event.parent.name!='_lianhuan2';
			},
			forced:true,
			content:function(){
				trigger.num++;
			}
		},
		boss_xixing:{
			trigger:{player:'phaseBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【吸星】？',function(card,player,target){
					return player!=target&&target.isLinked();
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_xixing',result.targets);
					result.targets[0].damage('thunder');
					player.recover();
				}
			},
		},
		boss_suoming:{
			trigger:{player:'phaseEnd'},
            direct:true,
            filter:function(event,player){
                for(var i=0;i<game.players.length;i++){
                    if(!game.players[i].isLinked()&&player!=game.players[i]){
                        return true;
                    }
                }
            },
            content:function(){
                "step 0"
                var num=0;
                for(var i=0;i<game.players.length;i++){
                    if(!game.players[i].isLinked()&&player!=game.players[i]){
                        num++;
                    }
                }
                player.chooseTarget('是否发动【索命】？',[1,num],function(card,player,target){
                    return !target.isLinked()&&player!=target;
                }).ai=function(target){
                    return -ai.get.attitude(player,target);
                }
                "step 1"
                if(result.bool){
                    player.logSkill('boss_suoming',result.targets);
                    event.targets=result.targets;
                    event.num=0;
                }
                else{
                    event.finish();
                }
                "step 2"
                if(event.num<event.targets.length){
                    event.targets[event.num].link();
                    event.num++;
                    event.redo();
                }
            },
		},
		boss_taiping:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=2;
			}
		},
		boss_baolian:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.draw(2);
			}
		},
		boss_xiaoshou:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【枭首】？',function(card,player,target){
					return player!=target&&target.hp>=player.hp;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'fire');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_xiaoshou',result.targets);
					result.targets[0].damage('fire',3);
				}
			},
		},
		boss_manjia:{
			group:['boss_manjia1','boss_manjia2']
		},
        boss_manjia1:{
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:6,
			filter:function(event,player){
                if(player.get('e','2')) return false;
				if(event.player.num('s','unequip')) return false;
				if(event.card.name=='nanman') return true;
				if(event.card.name=='wanjian') return true;
				if(event.card.name=='sha'&&!event.card.nature) return true;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
                        if(target.get('e','2')) return;
						if(player.num('s','unequip')) return;
						if(card.name=='nanman'||card.name=='wanjian') return 0;
						if(card.name=='sha'){
    						var equip1=player.get('e','1');
    						if(equip1&&equip1.name=='zhuque') return 2;
    						if(equip1&&equip1.name=='qinggang') return 1;
							if(!card.nature) return 0;
						}
					}
				}
			}
		},
		boss_manjia2:{
			trigger:{player:'damageBegin'},
			filter:function(event,player){
                if(player.get('e','2')) return false;
				if(event.nature=='fire') return true;
			},
			forced:true,
            check:function(){
                return false;
            },
			content:function(){
				trigger.num++;
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
                        if(target.get('e','2')) return;
						if(card.name=='sha'){
							if(card.nature=='fire'||player.skills.contains('zhuque_skill')) return 2;
						}
						if(get.tag(card,'fireDamage')&&current<0) return 2;
					}
				}
			}
		},
		boss_lianyu:{
			trigger:{player:'phaseEnd'},
			unique:true,
			content:function(){
				"step 0"
				event.players=get.players(player);
				event.players.remove(player);
				"step 1"
				if(event.players.length){
					var current=event.players.shift();
					player.line(current,'fire');
					current.damage('fire');
					event.redo();
				}
			},
		},
		boss_guiji:{
			trigger:{player:'phaseJudgeBegin'},
            forced:true,
            content:function(){
                player.discard(player.get('j').randomGet());
            },
            filter:function(event ,player){
                return player.num('j')>0;
            },
            ai:{
                effect:{
                    target:function(card,player,target,current){
                        if(get.type(card)=='delay'&&target.num('j')==0) return 0.1;
                    }
                }
            }
		},
		boss_minbao:{
			global:'boss_minbao2'
		},
		boss_minbao2:{
			trigger:{global:'dieAfter'},
			forced:true,
			filter:function(event,player){
				return event.player.skills.contains('boss_minbao')&&event.player.isDead();
			},
			content:function(){
				trigger.player.line(player,'fire');
				player.damage('nosource','fire').animate=false;
				player.$damage(trigger.player);
				if(lib.config.animation&&!lib.config.low_performance){
					player.$fire();
				}
			}
		},
		boss_guihuo:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【鬼火】？',function(card,player,target){
					return player!=target;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'fire');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_guihuo',result.targets);
					result.targets[0].damage('fire');
				}
			},
		},
		boss_luolei:{
			trigger:{player:'phaseBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【落雷】？',function(card,player,target){
					return player!=target;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_luolei',result.targets);
					result.targets[0].damage('thunder');
				}
			},
		},
		boss_beiming:{
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source!=undefined;
			},
			content:function(){
				trigger.source.discard(trigger.source.get('h'));
			},
			ai:{
				threaten:0.7
			}
		},
		boss_shanbeng:{
			global:'boss_shanbeng2',
			trigger:{player:'dieBegin'},
			forced:true,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].num('e')){
						player.line(game.players[i],'green');
					}
				}
				game.delay();
			}
		},
		boss_shanbeng2:{
			trigger:{global:'dieAfter'},
			forced:true,
			filter:function(event,player){
				return player.num('e')>0&&event.player.skills.contains('boss_shanbeng')&&event.player.isDead();
			},
			content:function(){
				player.discard(player.get('e'));
			}
		},
		boss_didong:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【地动】？',function(card,player,target){
					return player!=target;
				}).ai=function(target){
					var att=ai.get.attitude(player,target);
					if(target.isTurnedOver()){
						if(att>0){
							return att+5;
						}
						return -1;
					}
					if(player.isTurnedOver()){
						return 5-att;
					}
					return -att;
				};
				"step 1"
				if(result.bool){
					player.logSkill('boss_didong',result.targets);
					result.targets[0].turnOver();
				}
			},
		},
		boss_guimei:{
			mod:{
				targetEnabled:function(card,player,target){
					if(get.type(card)=='delay'){
						return false;
					}
				}
			}
		},
		boss_bianshen:{
			trigger:{global:'gameStart'},
			forced:true,
			popup:false,
			content:function(){
				player.init(['boss_chi','boss_mo','boss_wang','boss_liang'].randomGet());
				game.addVideo('reinit2',player,player.name);
			}
		},
		zhanjiang:{
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('e','qinggang')){
						return true;
					}
				}
			},
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player){
						var e=game.players[i].get('e','qinggang');
						if(e.length){
							player.gain(e);
							game.players[i].$give(e,player);
							break;
						}
					}
				}
			}
		},
		boss_juejing:{
			trigger:{player:'phaseDrawBefore'},
			forced:true,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				noh:true,
			},
			group:'boss_juejing2'
		},
		boss_juejing2:{
			trigger:{player:'loseEnd'},
			forced:true,
			filter:function(event,player){
				return player.num('h')<4;
			},
			content:function(){
				player.draw(4-player.num('h'));
			}
		},
		boss_leiji:{
			audio:2,
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget('是否发动雷击？').ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				};
				"step 1"
				if(result.bool){
					player.logSkill('boss_leiji',result.targets,'thunder');
					event.target=result.targets[0];
					event.target.judge(function(card){
						// var suit=get.suit(card);
						// if(suit=='spade') return -4;
						// if(suit=='club') return -2;
						if(get.color(card)=='black') return -2;
						return 0;
					});
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool==false){
					event.target.damage('thunder');
					player.draw();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'respondShan')){
							var hastarget=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0){
									hastarget=true;break;
								}
							}
							var be=target.num('e',{color:'black'});
							if(target.num('h','shan')&&be){
								if(!target.skills.contains('guidao')) return 0;
								return [0,hastarget?target.num('he')/2:0];
							}
							if(target.num('h','shan')&&target.num('h')>2){
								if(!target.skills.contains('guidao')) return 0;
								return [0,hastarget?target.num('h')/4:0];
							}
							if(target.num('h')>3||(be&&target.num('h')>=2)){
								return [0,0];
							}
							if(target.num('h')==0){
								return [1.5,0];
							}
							if(target.num('h')==1&&!be){
								return [1.2,0];
							}
							if(!target.skills.contains('guidao')) return [1,0.05];
							return [1,Math.min(0.5,(target.num('h')+be)/4)];
						}
					}
				}
			}
		},
		wuqin:{
			audio:2,
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw(3)
			}
		},
		boss_baolin:{
			audio:true,
			inherit:'juece',
		},
		boss_qiangzheng:{
			audio:2,
			trigger:{player:'phaseEnd'},
            forced:true,
			unique:true,
            filter:function(event,player){
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i]!=player&&game.players[i].num('h')) return true;
                }
                return false;
            },
            content:function(){
                "step 0"
				var players=get.players(player);
				players.remove(player);
				event.players=players;
				"step 1"
				if(event.players.length){
					var current=event.players.shift();
					var hs=current.get('h')
					if(hs.length){
						player.gain(hs.randomGet());
						current.$give(1,player);
					}
					event.redo();
				}
            }
		},
		guizhen:{
			audio:2,
			trigger:{player:'loseEnd'},
			frequent:true,
			filter:function(event,player){
				if(player.num('h')) return false;
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original=='h') return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				var players=get.players(player);
				players.remove(player);
				event.players=players;
				"step 1"
				if(event.players.length){
					var current=event.players.shift();
					var hs=current.get('h');
					if(hs.length){
						current.lose(hs)._triggered=null;
						current.$throw(hs);
					}
					else{
						current.loseHp();
					}
					game.delay(0.5);
					event.redo();
				}
			},
		},
		boss_konghun:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(){
				return game.players.length>=3;
			},
			content:function(){
				"step 0"
				player.chooseTarget(function(card,player,target){
					return target!=player;
				}).ai=function(){
					return 1;
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_konghun',result.targets);
					result.targets[0].goMad();
				}
			},
			group:'boss_konghun2'
		},
		boss_konghun2:{
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			content:function(){
				var players=game.players.concat(game.dead);
				for(var i=0;i<players.length;i++){
					if(players[i].isMad()){
						players[i].unMad();
					}
				}
			}
		},
		yuehun:{
			unique:true,
			trigger:{player:'phaseEnd'},
			frequent:true,
			content:function(){
				player.recover();
				player.draw(2);
			}
		},
		boss_wange:{
			inherit:'guiji'
		},
		fengwu:{
			audio:2,
			unique:true,
			enable:'phaseUse',
			usable:1,
			content:function(){
				"step 0"
				event.current=player.next;
				"step 1"
				event.current.chooseToUse({name:'sha'},function(card,player,target){
					if(player==target) return false;
					if(get.distance(player,target)<=1) return true;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==player) continue;
						if(get.distance(player,game.players[i])<get.distance(player,target)) return false;
					}
					return true;
				})
				"step 2"
				if(result.bool==false) event.current.loseHp();
				if(event.current.next!=player){
					event.current=event.current.next;
					game.delay(0.5);
					event.goto(1);
				}
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						if(player.num('h','shan')) return 1;
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].canUse('sha',player)&&game.players[i].num('h')>1){
								num--;
							}
							else{
								num++;
							}
						}
						return num;
					}
				}
			}
		},
		huanhua:{
			audio:2,
			trigger:{global:'gameDrawAfter'},
			forced:true,
			unique:true,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]==player) continue;
					player.maxHp+=game.players[i].maxHp;
					if(!game.players[i].name||!lib.character[game.players[i].name]) continue;
					var skills=lib.character[game.players[i].name][3];
					for(var j=0;j<skills.length;j++){
						if(!lib.skill[skills[j]].forceunique){
							player.addSkill(skills[j]);
						}
					}
				}
				player.hp=player.maxHp;
				player.update();
			},
			group:['huanhua3','huanhua4'],
			ai:{
				threaten:0.8,
				effect:{
					target:function(card){
						if(card.name=='bingliang') return 0;
					}
				}
			}
		},
		huanhua2:{
			trigger:{player:'phaseDrawBefore'},
			priority:10,
			forced:true,
			popup:false,
			check:function(){
				return false;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			}
		},
		huanhua3:{
			trigger:{global:'drawAfter'},
			forced:true,
			filter:function(event,player){
				if(event.parent.name!='phaseDraw') return false;
				return event.player!=player;
			},
			content:function(){
				player.draw(trigger.num);
			}
		},
		huanhua4:{
			trigger:{global:'discardAfter'},
			forced:true,
			filter:function(event,player){
				if(event.parent.parent.name!='phaseDiscard') return false;
				return event.player!=player;
			},
			content:function(){
				player.chooseToDiscard(trigger.cards.length,true);
			}
		},
		jidian:{
			audio:2,
			trigger:{source:'damageAfter'},
			direct:true,
			unique:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【亟电】？',function(card,player,target){
					return get.distance(trigger.player,target)<=1&&trigger.player!=target;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder')+0.1;
				}
				"step 1"
				if(result.bool){
					event.target=result.targets[0];
					event.target.judge(function(card){
						return get.color(card)=='red'?0:-1;
					})
					player.logSkill('jidian',event.target,false);
					trigger.player.line(event.target,'thunder');
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.color=='black'){
					event.target.damage('thunder');
				}
			}
		},
		tinqin:{
			audio:false,
			inherit:'manjuan'
		},
		boss_hujia:{
			audio:2,
			trigger:{player:'phaseEnd'},
			direct:true,
			unique:true,
			filter:function(event,player){
				if(player.hp==player.maxHp) return false;
				if(!player.num('he')) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.chooseCardTarget({
					position:'he',
					filterTarget:function(card,player,target){
						if(!lib.character[target.name]) return false;
						return player!=target&&!target.storage.boss_hujia;
					},
					filterCard:true,
					ai1:function(card){
						return ai.get.unuseful(card)+9;
					},
					ai2:function(target){
						if(target.disabledSkills.boss_hujia) return Math.max(1,10-target.maxHp);
						return 1/target.maxHp;
					},
					prompt:'是否发动【胡笳】？'
				});
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('boss_hujia',target);
					if(target.disabledSkills.boss_hujia){
						target.loseMaxHp();
					}
					else{
						target.disabledSkills.boss_hujia=lib.character[target.name][3];
					}
					player.discard(result.cards);
				}
			},
			ai:{
				expose:0.2,
			}
		},
		boss_guihan:{
			audio:2,
			unique:true,
			enable:'chooseToUse',
			mark:true,
			init:function(player){
				player.storage.boss_guihan=false;
			},
			filter:function(event,player){
				if(event.type!='dying') return false;
				if(player!=_status.dying) return false;
				if(player.storage.boss_guihan) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.removeSkill('boss_guihan');
				player.recover(player.maxHp-player.hp);
				player.storage.boss_guihan=true;
				"step 1"
				player.draw(4);
				"step 2"
				for(var i=0;i<game.players.length;i++){
					delete game.players[i].disabledSkills.boss_hujia;
				}
				if(game.bossinfo){
					game.bossinfo.loopType=1;
				}
				player.removeSkill('beige');
				player.removeSkill('boss_hujia');
				player.addSkill('tinqin');
				player.addSkill('boss_huixin');
			},
			ai:{
				skillTagFilter:function(player){
					if(player.storage.boss_guihan) return false;
				},
				save:true,
				result:{
					player:4,
				},
			},
			intro:{
				content:'limited'
			}
		},
		huoshen:{
			trigger:{player:'damageBefore'},
			forced:true,
			unique:true,
			filter:function(event){
				return event.nature=='fire';
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.recover();
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'fireDamage')){
							return [0,2];
						}
					}
				}
			},
		},
		boss_xianyin:{
			trigger:{player:'loseEnd'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				});
				"step 1"
				if(result.bool){
					player.chooseTarget(true,'选择一个目标令其失去一点体力',function(card,player,target){
						return player!=target;
					}).ai=function(target){
						return Math.max(1,9-target.hp);
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.targets.length){
					player.line(result.targets);
					result.targets[0].loseHp();
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'loseCard')){
							return [0.5,1];
						}
					}
				}
			}
		},
		boss_huixin:{
			trigger:{player:'loseEnd'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				"step 0"
				player.judge();
				"step 1"
				if(result.color=='black'){
					_status.currentPhase.loseHp();
				}
				else{
					player.recover();
					player.draw();
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'loseCard')){
							return [0.5,1];
						}
					}
				}
			}
		},
		boss_shengshou:{
			audio:true,
			trigger:{player:'useCard'},
			frequent:true,
			unique:true,
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				});
				"step 1"
				if(result.bool){
					player.recover();
				}
			},
		},
		boss_honglian:{
			audio:2,
			trigger:{player:'phaseEnd'},
			forced:true,
			unique:true,
			content:function(){
				"step 0"
				event.players=get.players(player);
				event.players.remove(player);
				player.draw(2);
				"step 1"
				if(event.players.length){
					event.players.shift().damage('fire');
					event.redo();
				}
			},
		},
		boss_yuhuo:{
			trigger:{player:'niepanAfter'},
			forced:true,
			unique:true,
			content:function(){
				player.addSkill('kanpo');
				player.addSkill('shenwei');
				player.addSkill('zhuyu');
				if(game.bossinfo){
					game.bossinfo.loopType=1;
				}
			}
		},
		boss_tianyu:{
			audio:true,
			inherit:'suoling'
		},
		boss_jizhi:{
			audio:2,
			trigger:{player:'useCard'},
			frequent:true,
			unique:true,
			filter:function(event){
				var type=get.type(event.card,'trick');
				return (type=='trick'||type=='equip')&&event.cards[0]&&event.cards[0]==event.card;
			},
			content:function(){
				var cards=get.cards();
				player.gain(cards,'gain2');
				game.log(player,'获得了',cards);
			},
			ai:{
				threaten:1.4
			}
		},
		boss_guiyin:{
			mod:{
				targetEnabled:function(card,player,target){
					if(_status.currentPhase==player&&target.hp<player.hp) return false;
				}
			}
		},
		boss_gongshen:{
			trigger:{global:'gameDrawAfter'},
			forced:true,
			unique:true,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player){
						game.players[i].forcemin=true;
					}
				}
			},
			mod:{
				targetEnabled:function(card,player,target){
					if(get.type(card)=='delay'&&player!=target){
						return false;
					}
				}
			}
		},
		fanghua:{
			trigger:{player:'phaseEnd'},
			forced:true,
			unique:true,
			filter:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isTurnedOver()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.players=get.players(player);
				event.num=0;
				for(var i=0;i<event.players.length;i++){
					if(!event.players[i].isTurnedOver()){
						event.players.splice(i--,1);
					}
				}
				"step 1"
				if(event.players.length){
					event.players.shift().loseHp();
					event.redo();
				}
			}
		},
		tashui:{
			audio:2,
			trigger:{player:['useCard','respondAfter']},
			direct:true,
			unique:true,
			filter:function(event){
				return get.color(event.card)=='black';
			},
			content:function(){
				"step 0"
				game.delay(0.5);
				player.chooseTarget('是否发动【踏水】？',function(card,player,target){
					return player!=target;
				}).ai=function(target){
					if(target.isTurnedOver()) return -1;
					return 1;
				}
				"step 1"
				if(result.bool){
					player.logSkill('tashui',result.targets,'thunder');
					result.targets[0].turnOver();
				}
			},
			ai:{
				effect:{
					player:function(card){
						if(get.color(card)=='black'){
							return [1,2];
						}
					}
				}
			}
		},
		shangshix:{
			trigger:{player:['loseEnd','changeHp']},
			forced:true,
			unique:true,
			audio:2,
			filter:function(event,player){
				return player.num('h')<4;
			},
			content:function(){
				player.draw(4-player.num('h'));
			},
			group:'shangshix2',
			ai:{
				effect:{
					target:function(card,player,target){
						if(card.name=='shunshou') return;
						if(card.name=='guohe'){
							if(!target.num('e')) return [0,1];
						}
						else if(get.tag(card,'loseCard')){
							return [0,1];
						}
					}
				},
				noh:true,
			}
		},
		shangshix2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.hp>1;
			},
			content:function(){
				"step 0"
				event.players=get.players(player);
				event.num=0;
				"step 1"
				if(event.players.length){
					event.players.shift().loseHp();
					event.redo();
				}
			}
		},
		wuxin:{
			inherit:'miles_xueyi',
			group:'swd_wuxie',
			audio:2,
		},
		shenwei:{
			audio:2,
			unique:true,
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=Math.max(2,game.players.length-1);
			},
			mod:{
				maxHandcard:function(player,current){
					return current+Math.max(2,game.players.length-1);
				}
			}
		},
		shenji:{
			unique:true,
			mod:{
				selectTarget:function(card,player,range){
					if(card.name=='sha'||card.name=='juedou') range[1]=3;
				},
			}
		},
		boss_baonu:{
			unique:true,
			group:'boss_baonu2',
			trigger:{player:'changeHp'},
			forced:true,
			priority:100,
			audio:2,
			filter:function(event,player){
				return player.hp<=4
			},
			content:function(){
				player.init('boss_lvbu2');
				player.update();
				ui.clear();
				while(_status.event.name!='phaseLoop'){
					_status.event=_status.event.parent;
				}
				for(var i=0;i<game.players.length;i++){
					for(var j in game.players[i].tempSkills){
						game.players[i].skills.remove(j);
						delete game.players[i].tempSkills[j];
					}
				}
				_status.paused=false;
				_status.event.player=player;
				_status.event.step=0;
				if(game.bossinfo){
					game.bossinfo.loopType=1;
				}
			},
			ai:{
				effect:{
					target:function(card,player){
						if(get.tag(card,'damage')||get.tag(card,'loseHp')){
							if(player.hp==5){
								if(game.players.length<4) return [0,5];
								var num=0
								for(var i=0;i<game.players.length;i++){
									if(game.players[i]!=game.boss&&game.players[i].hp==1){
										num++;
									}
								}
								if(num>1) return [0,2];
								if(num&&Math.random()<0.7) return [0,1];
							}
						}
					}
				}
			}
		},
		boss_baonu2:{
			trigger:{player:'gameDrawBegin'},
			forced:true,
			popup:false,
			content:function(){
				player.draw(4,false);
			}
		},
	},
	translate:{
		boss_chi:'魑',
		boss_mo:'魅',
		boss_wang:'魍',
		boss_liang:'魉',
		boss_niutou:'牛头',
		boss_mamian:'马面',
		boss_baiwuchang:'白无常',
		boss_heiwuchang:'黑无常',
		boss_luocha:'罗刹',
		boss_yecha:'夜叉',

		boss_yushou:'驭兽',
		boss_yushou_info:'出牌阶段开始时，视为你使用了一张[南蛮入侵]',
		boss_moyany:'魔炎',
		boss_moyany_info:'每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你对一名其他角色造成2点火焰伤害',
		boss_modao:'魔道',
		boss_modao_info:'锁定技，准备阶段，你摸两张牌',
		boss_mojian:'魔箭',
		boss_mojian_info:'出牌阶段开始时，视为你使用了一张[万箭齐发]',
		boss_danshu:'丹术',
		boss_danshu_info:'每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你回复1点体力',

		boss_zuijiu:'醉酒',
		boss_zuijiu_info:'锁定技，你的【杀】额外造成1点伤害',
		boss_taiping:'太平',
		boss_taiping_info:'锁定技，摸牌阶段摸牌时，你的摸牌数量+2',
		boss_suoming:'索命',
		boss_suoming_info:'结束阶段，将任意名未被横置的其他角色的武将牌横置',
		boss_xixing:'吸星',
		boss_xixing_info:'准备阶段，对任意一名横置的其他角色造成1点雷电伤害，然后回复1点体力',

		boss_baolian:'暴敛',
		boss_baolian_info:'锁定技，结束阶段，你摸两张牌',
		boss_manjia:'蛮甲',
		boss_manjia_info:'锁定技，若你的装备区内没有防具牌，则你视为装备了[藤甲]',
		boss_xiaoshou:'枭首',
		boss_xiaoshou_info:'结束阶段，对体力不小于你的一名其他角色造成3点伤害',
		boss_guiji:'诡计',
		boss_guiji_info:'锁定技，准备阶段结束时，若你的判定区内有牌，你随机弃置其中一张牌',
		boss_lianyu:'炼狱',
		boss_lianyu_info:'结束阶段，对所有其他角色造成1点火焰伤害',

		boss_guihuo:'鬼火',
		boss_guihuo_info:'结束阶段，对一名其他角色造成1点火焰伤害',
		boss_minbao:'冥爆',
		boss_minbao_info:'锁定技，当你死亡时，对场上所有其他角色造成1点火焰伤害',
		boss_luolei:'落雷',
		boss_luolei_info:'准备阶段，对一名其他角色造成1点雷电伤害',
		boss_beiming:'悲鸣',
		boss_beiming_info:'锁定技，当你死亡时，你令杀死你的角色弃置所有手牌',
		boss_guimei:'鬼魅',
		boss_guimei_info:'锁定技，你不能成为延时类锦囊的目标',
		boss_didong:'地动',
		boss_didong_info:'结束阶段，令一名其他角色将其武将牌翻面',
		boss_shanbeng:'山崩',
		boss_shanbeng_info:'锁定技，当你死亡时，你令所有其他角色弃置其装备区内的所有牌',

		boss_zhuoguiquxie:'捉鬼驱邪',
		boss_bianshen:'变身',
		boss_bianshen_info:'游戏开始时，你随机变身为魑、魅、魍、魉中的一个',
		boss_bianshen2:'变身',
		boss_bianshen2_info:'你死亡后随机变身为牛头、马面中的一个',
		boss_bianshen3:'变身',
		boss_bianshen3_info:'你死亡后随机变身为白无常、黑无常中的一个',
		boss_bianshen4:'变身',
		boss_bianshen4_info:'你死亡后随机变身为罗刹、夜叉中的一个',

		zhanjiang:'斩将',
		zhanjiang_info:'准备阶段开始时，如果其他角色的装备区内有【青釭剑】，你可以获得之',

		boss_qiangzheng:'强征',
		boss_qiangzheng_info:'锁定技，回合结束阶段，你获得每个敌方角色的一张手牌',
		boss_baolin:'暴凌',
		guizhen:'归真',
		guizhen_info:'每当你失去最后一张手牌，你可以所有敌人失去全部手牌，没有手牌的角色失去一点体力（不触发技能）',
		boss_shengshou:'圣手',
		boss_shengshou_info:'每当你使用一张牌，你可以进行一次判定，若为红色，你回复一点体力',
		wuqin:'五禽戏',
		wuqin_info:'回合结束阶段，若你没有手牌，可以摸三张牌',

		boss_konghun:'控心',
		boss_konghun_info:'回合结束阶段，你可以指定一名敌人令其进入混乱状态（不受对方控制，并将队友视为敌人）直到下一回合开始',
		yuehun:'月魂',
		yuehun_info:'回合开始阶段，你可以回复一点体力并摸两张牌',
		fengwu:'风舞',
		fengwu_info:'出牌阶段限一次，可令除你外的所有角色依次对与其距离最近的另一名角色使用一张【杀】，无法如此做者失去1点体力。',
		boss_wange:'笙歌',

		huanhua:'幻化',
		huanhua_info:'锁定技，游戏开始时，你获得其他角色的所有技能，体力上限变为其他角色之和；其他角色于摸牌阶段摸牌时，你摸等量的牌；其他角色于弃牌阶段弃牌时，你弃置等量的手牌',

		boss_leiji:'雷击',
		boss_leiji_info:'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为黑色，其受到一点雷电伤害，然后你摸一张牌',
		jidian:'亟电',
		jidian_info:'每当你造成一次伤害，可以指定距离受伤害角色1以内的一名其他角色进行判定，若结果为黑色，该角色受到一点雷电伤害',

		tinqin:'听琴',
		boss_guihan:'归汉',
		boss_guihan_info:'限定技，濒死阶段，你可以将体力回复至体力上限，摸4张牌，令所有敌人的技能恢复，并获得技能【听琴】、【蕙质】',
		boss_huixin:'蕙质',
		boss_huixin_info:'每当你于回合外失去牌，可以进行一次判定，若为黑色，当前回合角色失去一点体力，否则你回复一点体力并摸一张牌',
		boss_hujia:'胡笳',
		boss_hujia_info:'回合结束阶段，若你已受伤，可以弃置一张牌令一名其他角色的所有技能失效，若其所有技能已失效，改为令其失去一点体力上限',
		boss_honglian:'红莲',
		boss_honglian_info:'锁定技，回合结束阶段，你摸两张牌，并对所有敌人造成一点火焰伤害',
		huoshen:'火神',
		huoshen_info:'锁定技，你防止即将受到的火焰伤害，改为回复1点体力',
		boss_xianyin:'仙音',
		boss_xianyin_info:'每当你于回合外失去牌，你可以进行一次判定，若为红色，你令一名敌人失去一点体力',

		// boss_yuhuo:'浴火',
		// boss_yuhuo_info:'觉醒技，在你涅槃后，你获得技能【神威】、【朱羽】',
		boss_tianyu:'天狱',

		boss_juejing:'绝境',
		boss_juejing2:'绝境',
		boss_juejing_info:'锁定技，摸牌阶段开始时，你不摸牌；锁定技，若你的手牌数小于4，你将手牌补至四张',

		boss_jizhi:'集智',
		boss_jizhi_info:'每当你使用一张锦囊牌或装备牌，你可以摸一张牌并展示之',
		boss_guiyin:'归隐',
		boss_guiyin_info:'锁定技，体力值比你多的角色无法在回合内对你使用卡牌',
		boss_gongshen:'工神',
		boss_gongshen_info:'锁定技，除你之外的角色没有装备区；你不能成为其他角色的的延时锦囊目标',

		fanghua:'芳华',
		fanghua_info:'回合结束阶段，你可以令所有已翻面角色流失一点体力',
		tashui:'踏水',
		tashui_info:'每当你使用或打出一张黑色牌，你可以令一名其他角色翻面',

		wuxin:'无心',
		wuxin_info:'锁定技，你防止即将受到的伤害，改为流失一点体力；你不能成为其他角色的延时锦囊的目标',
		shangshix:'伤逝',
		shangshix2:'伤逝',
		shangshix_info:'锁定技，你的手牌数至少为4，回合结束阶段，若你的体力值大于1，你令场上所有角色流失一点体力',

		boss_baonu:'暴怒',
		boss_baonu_info:'锁定技，当你的体力值降至4或更低时，你变身为暴怒战神，并立即开始你的回合',
		shenwei:'神威',
		shenwei_info:'锁定技，摸牌阶段，你额外摸X张牌，你的手牌上限+X，X为敌方存活角色个数且至少为2',
		shenji:'神戟',
		shenji_info:'你使用的杀或决斗可指定至多3名角色为目标',

		boss_shuijing:'水镜先生',
		boss_huangyueying:'奇智女杰',
		boss_zhangchunhua:'冷血皇后',
		boss_satan:'堕落天使',
		boss_dongzhuo:'乱世魔王',
		boss_lvbu1:'最强神话',
		boss_lvbu2:'暴怒战神',
		boss_zhouyu:'赤壁火神',
		boss_pangtong:'涅盘凤雏',
		boss_zhugeliang:'祭风卧龙',
		boss_zhangjiao:'天公将军',
		boss_zuoci:'迷之仙人',
		boss_yuji:'琅琊道士',
		boss_liubei:'蜀汉烈帝',
		boss_caiwenji:'异乡孤女',
		boss_huatuo:'药坛圣手',
		boss_luxun:'蹁跹君子',
		boss_zhenji:'洛水仙子',
		boss_diaochan:'绝代妖姬',
		boss_zhaoyun:'高达一号',
	}
};
