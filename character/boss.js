'usr strict';
character.boss={
	character:{
		boss_zhangchunhua:['female','wei',4,['jueqing','wuxin','shangshix'],['boss','bossallowed'],'wei'],
		boss_zhenji:['female','wei',4,['tashui','lingbo','jiaoxia','fanghua'],['boss','bossallowed'],'wei'],
		// boss_liubei:['male','shu',5,['lingfeng'],['boss','bossallowed'],'qun'],
		// boss_zhugeliang:['male','shu',4,[],['boss','bossallowed'],'qun'],
		boss_huangyueying:['female','shu',4,['boss_gongshen','boss_jizhi','qicai','boss_guiyin'],['boss','bossallowed'],'wei'],
		boss_pangtong:['male','shu',4,['boss_tianyu','qiwu','niepan','boss_yuhuo'],['boss','bossallowed'],'zhu'],
		boss_zhaoyun:['male','shu',1,['boss_juejing','longhun','zhanjiang'],['boss','bossallowed'],'qun'],
		boss_zhouyu:['male','wu',6,['huoshen','boss_honglian','boss_xianyin'],['boss','bossallowed'],'zhu'],

		boss_zhuoguiquxie:['male','qun',0,['boss_bianshen'],['boss','bossallowed'],'shu'],
		boss_nianshou:['male','qun',Infinity,['boss_nianrui','boss_qixiang','boss_damagecount'],['boss'],'shu'],
		boss_nianshou_heti:['male','qun',12,['boss_nianrui','boss_mengtai','boss_nbianshen','boss_nbianshenx'],['boss','bossallowed'],'shu'],
		boss_nianshou_jingjue:['male','qun',12,['boss_nianrui','boss_mengtai','boss_jingjue','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
		boss_nianshou_renxing:['male','qun',12,['boss_nianrui','boss_mengtai','boss_renxing','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
		boss_nianshou_ruizhi:['male','qun',12,['boss_nianrui','boss_mengtai','boss_ruizhi','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
		boss_nianshou_baonu:['male','qun',12,['boss_nianrui','boss_mengtai','boss_nbaonu','boss_shouyi','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
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

		boss_liedixuande:['male','shu',5,['boss_lingfeng','boss_jizhen'],['jiangeboss','hiddenboss','bossallowed'],'shu'],
		boss_gongshenyueying:['male','shu',4,['boss_gongshenjg','boss_jingmiao','boss_zhinang'],['jiangeboss','hiddenboss','bossallowed'],'shu'],
		boss_tianhoukongming:['male','shu',4,['boss_biantian','bazhen'],['jiangeboss','hiddenboss','bossallowed'],'shu'],
		boss_yuhuoshiyuan:['male','shu',4,['boss_yuhuojg','boss_qiwu','boss_tianyujg'],['jiangeboss','hiddenboss','bossallowed'],'shu'],
		boss_qiaokuijunyi:['male','wei',4,['boss_huodi','boss_jueji'],['jiangeboss','hiddenboss','bossallowed'],'wei'],
		boss_jiarenzidan:['male','wei',5,['boss_chiying','boss_jingfan'],['jiangeboss','hiddenboss','bossallowed'],'wei'],
		boss_duanyuzhongda:['male','wei',5,['boss_fanshi','boss_xuanlei','boss_skonghun'],['jiangeboss','hiddenboss','bossallowed'],'wei'],
		boss_juechenmiaocai:['male','wei',4,['boss_chuanyun','boss_leili','boss_fengxing'],['jiangeboss','hiddenboss','bossallowed'],'wei'],

		boss_jileibaihu:['male','shu',4,['boss_jiguan','boss_zhenwei','boss_benlei'],['jiangemech','hiddenboss','bossallowed'],'shu'],
		boss_yunpingqinglong:['male','shu',4,['boss_jiguan','boss_mojian'],['jiangemech','hiddenboss','bossallowed'],'shu'],
		boss_lingjiaxuanwu:['male','shu',5,['boss_jiguan','yizhong','boss_lingyu'],['jiangemech','hiddenboss','bossallowed'],'shu'],
		boss_chiyuzhuque:['male','shu',5,['boss_jiguan','boss_yuhuojg','boss_tianyun'],['jiangemech','hiddenboss','bossallowed'],'shu'],
		boss_fudibian:['male','wei',4,['boss_jiguan','boss_didong'],['jiangemech','hiddenboss','bossallowed'],'wei'],
		boss_tuntianchiwen:['male','wei',5,['boss_jiguan','boss_tanshi','boss_tunshi'],['jiangemech','hiddenboss','bossallowed'],'wei'],
		boss_shihuosuanni:['male','wei',3,['boss_jiguan','boss_lianyu'],['jiangemech','hiddenboss','bossallowed'],'wei'],
		boss_lieshiyazi:['male','wei',4,['boss_jiguan','boss_nailuo'],['jiangemech','hiddenboss','bossallowed'],'wei'],

	},
	skill:{
		tiandao:{
			audio:true,
			trigger:{global:'judge'},
			direct:true,
			filter:function(event,player){
				return player.num('he')>0;
			},
			content:function(){
				"step 0"
				player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
				get.translation(trigger.player.judging[0])+'，是否发动【天道】？','he').ai=function(card){
					var trigger=_status.event.parent._trigger;
					var player=_status.event.player;
					var result=trigger.judge(card)-trigger.judge(trigger.player.judging[0]);
					var attitude=ai.get.attitude(player,trigger.player);
					if(attitude==0||result==0) return 0;
					if(attitude>0){
						return result;
					}
					else{
						return -result;
					}
				};
				"step 1"
				if(result.bool){
					player.respond(result.cards,'highlight');
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.logSkill('tiandao');
					player.$gain2(trigger.player.judging[0]);
					player.gain(trigger.player.judging[0]);
					trigger.player.judging[0]=result.cards[0];
					trigger.position.appendChild(result.cards[0]);
					game.log(trigger.player,'的判定牌改为',result.cards[0]);
				}
				"step 3"
				game.delay(2);
			},
			ai:{
				tag:{
					rejudge:1
				},
				threaten:1.5
			}
		},
		lianji:{
			audio:true,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return target.num('h')>0;
			},
			selectTarget:2,
			multitarget:true,
			multiline:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			prepare:function(cards,player,targets){
				player.$throw(cards);
				player.line(targets);
			},
			discard:false,
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				"step 0"
				if(!player.storage.lianji){
					player.storage.lianji=[];
				}
				if(targets[0].num('h')&&targets[1].num('h')){
					targets[0].chooseToCompare(targets[1]);
					player.storage.lianji.add(targets[0]);
					player.storage.lianji.add(targets[1]);
				}
				else{
					event.finish();
				}
				"step 1"
				if(result.bool){
					targets[0].gain(cards);
					targets[0].$gain2(cards);
					targets[1].damage(targets[0]);
				}
				else{
					targets[1].gain(cards);
					targets[1].$gain2(cards);
					targets[0].damage(targets[1]);
				}
				if(!player.skills.contains('yinmo')){
					event.finish();
				}
				"step 2"
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&!player.storage.lianji.contains(game.players[i])){
						event.finish();
						return;
					}
				}
				"step 3"
				player.logSkill('yinmo');
				player.gainMaxHp();
				"step 4"
				lib.character.swd_duguningke2=['','qun',4,['benlei','juece'],['temp']];
				if(player.name=='swd_duguningke') player.name='swd_duguningke2';
				if(player.name1=='swd_duguningke') player.name1='swd_duguningke2';
				if(player.name2=='swd_duguningke'){
					player.name2='swd_duguningke2';
					player.node.avatar2.setBackground('swd_duguningke2','character');
				}
				else{
					player.node.avatar.setBackground('swd_duguningke2','character');
				}
				player.removeSkill('yinmo');
				player.removeSkill('lianji');
				player.removeSkill('touxi');
				player.addSkill('benlei');
				player.addSkill('juece');
				event.players=game.players.slice(0);
				event.players.remove(player);
				event.players.sort(lib.sort.seat);
				"step 5"
				if(event.players.length){
					event.players.shift().damage('thunder');
					event.redo();
				}
			},
			ai:{
				expose:0.3,
				threaten:2,
				order:9,
				result:{
					target:-1
				}
			},
		},
		mazui:{
			audio:true,
			enable:'phaseUse',
			usable:1,
			filterCard:{color:'black'},
			filterTarget:function(card,player,target){
				return !target.skills.contains('mazui2');
			},
			check:function(card){
				return 6-ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
				player.line(targets[0],'green');
			},
			content:function(){
				"step 0"
				game.delay();
				"step 1"
				target.storage.mazui2=cards[0];
				target.addSkill('mazui2');
				game.addVideo('storage',target,['mazui2',get.cardInfo(target.storage.mazui2),'card']);
			},
			ai:{
				expose:0.2,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				},
				order:4,
				threaten:1.2
			}
		},
		mazui2:{
			trigger:{source:'damageBegin'},
			forced:true,
			mark:'card',
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				trigger.num--;
				player.addSkill('mazui3');
				player.removeSkill('mazui2');
			},
			intro:{
				content:'card'
			}
		},
		mazui3:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			content:function(){
				player.gain(player.storage.mazui2,'gain2');
				game.log(player,'获得了',player.storage.mazui2);
				player.removeSkill('mazui3');
				delete player.storage.mazui2;
			}
		},
		yunshen:{
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			frequent:true,
			init:function(player){
				player.storage.yunshen=0;
			},
			content:function(){
				player.storage.yunshen++;
				player.markSkill('yunshen');
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'respondShan')){
							var shans=target.num('h','shan');
							var hs=target.num('h');
							if(shans>1) return [1,1];
							if(shans&&hs>2) return [1,1];
							if(shans) return [1,0.5];
							if(hs>2) return [1,0.3];
							if(hs>1) return [1,0.2];
							return [1.2,0];
						}
					}
				},
				threaten:0.8
			},
			intro:{
				content:'mark'
			},
			group:'yunshen2'
		},
		yunshen2:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return player.storage.yunshen>0;
			},
			content:function(){
				player.draw(player.storage.yunshen);
				player.storage.yunshen=0;
				player.unmarkSkill('yunshen');
			},
			mod:{
				globalTo:function(from,to,distance){
					if(typeof to.storage.yunshen=='number') return distance+to.storage.yunshen;
				}
			}
		},
		lingbo:{
			trigger:{player:'respond'},
			filter:function(event,player){
				return event.card.name=='shan';
			},
			frequent:true,
			content:function(){
				player.draw(2);
			},
			ai:{
				mingzhi:false,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'respondShan')){
							var shans=target.num('h','shan');
							var hs=target.num('h');
							if(shans>1) return [0,1];
							if(shans&&hs>2) return [0,1];
							if(shans) return [0,0];
							if(hs>2) return [0,0];
							if(hs>1) return [1,0.5];
							return [1.5,0];
						}
					}
				},
				threaten:0.8
			}
		},
		jiaoxia:{
			trigger:{target:'useCardToBegin'},
			filter:function(event,player){
				return event.card&&get.color(event.card)=='red';
			},
			frequent:true,
			content:function(){
				player.draw();
			},
			ai:{
				effect:function(card,player,target){
					if(get.color(card)=='red') return [1,1];
				},
			}
		},
		boss_nbianshenx:{},
		boss_jingjue:{
			inherit:'boss_danshu'
		},
		boss_renxing:{
			trigger:{global:['damageEnd','recoverEnd']},
			forced:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				player.draw();
			}
		},
		boss_ruizhi:{
			trigger:{global:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return event.player!=player&&event.player.num('he')>1;
			},
			content:function(){
				'step 0'
				player.line(trigger.player,'green');
				var next=trigger.player.chooseCard(true,'选择保留一张手牌和一张装备区内的牌，然后弃置其它牌','he',function(card){
					switch(get.position(card)){
						case 'h':{
							if(ui.selected.cards.length){
								return get.position(ui.selected.cards[0])=='e';
							}
							else{
								return trigger.player.num('h')>1;
							}
							break;
						}
						case 'e':{
							if(ui.selected.cards.length){
								return get.position(ui.selected.cards[0])=='h';
							}
							else{
								return trigger.player.num('e')>1;
							}
							break;
						}
					}
				});
				var num=0;
				if(trigger.player.num('h')>1){
					num++;
				}
				if(trigger.player.num('e')>1){
					num++;
				}
				next.selectCard=[num,num];
				next.ai=function(card){
					return ai.get.value(card);
				};
				'step 1'
				if(result.bool){
					var he=[];
					var hs=trigger.player.get('h');
					var es=trigger.player.get('e');
					if(hs.length>1){
						he=he.concat(hs);
					}
					if(es.length>1){
						he=he.concat(es);
					}
					for(var i=0;i<result.cards.length;i++){
						he.remove(result.cards[i]);
					}
					trigger.player.discard(he);
				}
			}
		},
		boss_nbaonu:{
			group:['boss_nbaonu_sha'],
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			priority:-1,
			content:function(){
				if(player.hp>4){
					trigger.num=4+Math.floor(Math.random()*(player.hp-3));
				}
				else{
					trigger.num=4;
				}
			},
			subSkill:{
				sha:{
					mod:{
						cardUsable:function(card,player,num){
							if(card.name=='sha'&&player.hp<5) return Infinity;
						}
					},
					trigger:{source:'damageBegin'},
					filter:function(event,player){
						return event.card&&event.card.name=='sha'&&event.notLink()&&player.hp<5;
					},
					forced:true,
					content:function(){
						trigger.num++;
					}
				}
			}
		},
		boss_shouyi:{
			mod:{
				targetInRange:function(){
					return true;
				}
			},
		},
		boss_mengtai:{
			group:['boss_mengtai_begin','boss_mengtai_draw','boss_mengtai_use',
			'boss_mengtai_discard','boss_mengtai_end'],
			subSkill:{
				begin:{
					trigger:{player:'phaseBegin'},
					forced:true,
					popup:false,
					content:function(){
						player.storage.boss_mengtai_draw=true;
						player.storage.boss_mengtai_use=true;
					}
				},
				draw:{
					trigger:{player:'phaseDrawBegin'},
					forced:true,
					popup:false,
					content:function(){
						player.storage.boss_mengtai_draw=false;
					}
				},
				use:{
					trigger:{player:'phaseUseBegin'},
					forced:true,
					popup:false,
					content:function(){
						player.storage.boss_mengtai_use=false;
					}
				},
				discard:{
					trigger:{player:'phaseDiscardBefore'},
					forced:true,
					filter:function(event,player){
						if(player.storage.boss_mengtai_use) return true;
						return false;
					},
					content:function(){
						trigger.untrigger();
						trigger.finish();
					}
				},
				end:{
					trigger:{player:'phaseEnd'},
					forced:true,
					filter:function(event,player){
						if(player.storage.boss_mengtai_draw) return true;
						return false;
					},
					content:function(){
						player.draw(3);
					}
				}
			}
		},
		boss_nbianshen:{
			trigger:{player:'phaseBefore'},
			forced:true,
			popup:false,
			priority:25,
			filter:function(event,player){
				if(player.name=='boss_nianshou_heti'||player.storage.boss_nbianshen) return true;
				return false;
			},
			content:function(){
				if(player.storage.boss_nbianshen){
					var hp=player.hp,
						maxHp=player.maxHp,
						hujia=player.hujia;
					player.init('boss_nianshou_'+player.storage.boss_nbianshen_next);
					player.storage.boss_nbianshen.remove(player.storage.boss_nbianshen_next);
					if(!player.storage.boss_nbianshen.length){
						player.storage.boss_nbianshen=['jingjue','renxing','ruizhi','baonu'];
					}
					player.storage.boss_nbianshen_next=player.storage.boss_nbianshen.randomGet(player.storage.boss_nbianshen_next);
					player.hp=hp;
					player.maxHp=maxHp;
					player.hujia=hujia;
					player.update();
				}
				else{
					player.storage.boss_nbianshen=['jingjue','renxing','ruizhi','baonu'];
					player.storage.boss_nbianshen_next=player.storage.boss_nbianshen.randomGet();
					player.markSkill('boss_nbianshen');
				}
			},
			intro:{
				content:function(storage,player){
					var map={
						jingjue:'警觉',
						renxing:'任性',
						ruizhi:'睿智',
						baonu:'暴怒'
					};
					return '下一个状态：'+map[player.storage.boss_nbianshen_next];
				}
			}
		},
		boss_damagecount:{
			mode:['boss'],
			global:'boss_damagecount2'
		},
		boss_damagecount2:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				if(!ui.damageCount) return false;
				return event.num>0&&player.isFriendOf(game.me)&&event.player.isEnemyOf(game.me);
			},
			content:function(){
				_status.damageCount+=trigger.num;
				ui.damageCount.innerHTML='伤害: '+_status.damageCount;
			}
		},
		boss_nianrui:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=2;
			},
			ai:{
				threaten:1.6
			}
		},
		boss_qixiang:{
            group:['boss_qixiang1','boss_qixiang2'],
            ai:{
                effect:{
                    target:function(card,player,target,current){
                        if(card.name=='lebu'&&card.name=='bingliang') return 0.8;
                    }
                }
            }
        },
        boss_qixiang1:{
			trigger:{player:'judge'},
			forced:true,
			filter:function(event,player){
				if(event.card){
                    if(event.card.viewAs){
                        return event.card.viewAs=='lebu';
                    }
                    else{
                        return event.card.name=='lebu';
                    }
				}
			},
			content:function(){
				player.addTempSkill('boss_qixiang3','judgeAfter');
			}
		},
        boss_qixiang2:{
			trigger:{player:'judge'},
			forced:true,
			filter:function(event,player){
				if(event.card){
                    if(event.card.viewAs){
                        return event.card.viewAs=='bingliang';
                    }
                    else{
                        return event.card.name=='bingliang';
                    }
				}
			},
			content:function(){
				player.addTempSkill('boss_qixiang4','judgeAfter');
			}
		},
		boss_qixiang3:{
			mod:{
				suit:function(card,suit){
					if(suit=='diamond') return 'heart';
				}
			}
		},
		boss_qixiang4:{
			mod:{
				suit:function(card,suit){
					if(suit=='spade') return 'club';
				}
			}
		},
		boss_lingyu:{
			trigger:{player:'phaseEnd'},
			check:function(event,player){
				if(player.isTurnedOver()) return true;
				var num=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hp<game.players[i].maxHp&&
						game.players[i].isFriendOf(player)&&ai.get.recoverEffect(game.players[i])>0){
						if(game.players[i].hp==1){
							return true;
						}
						num++;
						if(num>=2) return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				player.turnOver();
				'step 1'
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hp<game.players[i].maxHp&&game.players[i].isFriendOf(player)){
						list.push(game.players[i]);
					}
				}
				player.line(list,'green');
				event.targets=list;
				'step 2'
				if(event.targets.length){
					event.targets.shift().recover();
					event.redo();
				}
			},
			ai:{
				threaten:1.5,
				effect:{
					target:function(card,player,target){
						if(card.name=='guiyoujie') return [0,1];
					}
				}
			},
		},
		boss_zhenwei:{
			global:'boss_zhenwei2',
			ai:{
				threaten:1.5
			}
		},
		boss_zhenwei2:{
			mod:{
				globalTo:function(from,to,distance){
					if(to.isFriendOf(from)) return;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].skills.contains('boss_zhenwei')&&
							game.players[i].isFriendOf(to)&&game.players[i]!=to){
							return distance+1;
						}
					}
				}
			}
		},
		boss_benlei:{
			mode:['versus'],
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				if(_status.mode!='jiange') return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].type=='mech'&&game.players[i].isEnemyOf(player)){
						return true;
					}
				}
			},
			content:function(){
				var target;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].type=='mech'&&game.players[i].isEnemyOf(player)){
						target=game.players[i];break;
					}
				}
				if(target){
					player.line(target,'thunder');
					target.damage(2,'thunder');
				}
			},
			ai:{
				threaten:function(player,target){
					if(_status.mode=='jiange'){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].type=='mech'&&game.players[i].isEnemyOf(target)){
								return 2;
							}
						}
					}
					return 1;
				}
			}
		},
		boss_nailuo:{
			trigger:{player:'phaseEnd'},
			check:function(event,player){
				if(player.isTurnedOver()) return true;
				var num=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isEnemyOf(player)){
						var es=game.players[i].get('e');
						for(var j=0;j<es.length;j++){
							switch(get.subtype(es[j])){
								case 'equip1':num+=1;break;
								case 'equip2':num+=2;break;
								case 'equip3':num+=2;break;
								case 'equip4':num+=1;break;
								case 'equip5':num+=1.5;break;
							}
						}
					}
				}
				if(_status.mode=='jiange'){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isFriendOf(player)&&game.players[i].skills.contains('huodi')){
							return num>0;
						}
					}
				}
				return num>=4;
			},
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isEnemyOf(player)&&game.players[i].num('e')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				player.turnOver();
				'step 1'
				event.targets=get.players();
				'step 2'
				if(event.targets.length){
					var current=event.targets.shift();
					if(current.isEnemyOf(player)){
						var es=current.get('e');
						if(es.length){
							current.discard(es);
							player.line(current,'green');
						}
					}
					event.redo();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(card.name=='guiyoujie') return [0,1];
					}
				}
			},
		},
		boss_tanshi:{
			trigger:{player:'phaseEnd'},
			forced:true,
			check:function(){
				return false;
			},
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				player.chooseToDiscard('h',true);
			}
		},
		boss_tunshi:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				var nh=player.num('h');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isEnemyOf(player)&&game.players[i].num('h')>nh){
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				var targets=[];
				var nh=player.num('h');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isEnemyOf(player)&&game.players[i].num('h')>nh){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				event.targets=targets;
				'step 1'
				if(event.targets.length){
					var current=event.targets.shift();
					current.damage('thunder');
					player.line(current,'thunder');
					event.redo();
				}
			}
		},
		boss_jiguan:{
			mod:{
				targetEnabled:function(card,player,target){
					if(card.name=='lebu'){
						return false;
					}
				}
			}
		},
		boss_gongshenjg:{
			audio:2,
			trigger:{player:'phaseEnd'},
			mode:['versus'],
			filter:function(event,player){
				if(_status.mode!='jiange') return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].type=='mech'){
						if(game.players[i].isEnemyOf(player)) return true;
						if(game.players[i].hp<game.players[i].maxHp) return true;
					}
				}
				return false;
			},
			content:function(){
				var enemy;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].type=='mech'){
						if(game.players[i].isFriendOf(player)){
							if(game.players[i].hp<game.players[i].maxHp){
								player.line(game.players[i],'green');
								game.players[i].recover();
								return;
							}
						}
						else{
							enemy=game.players[i];
						}
					}
				}
				if(enemy){
					player.line(enemy,'fire');
					enemy.damage('fire');
				}
			},
		},
		boss_jingmiao:{
			trigger:{global:'useCardAfter'},
            filter:function(event,player){
                return event.player.isEnemyOf(player)&&event.card.name=='wuxie';
            },
			prompt:function(event,player){
				return '是否对'+get.translation(event.player)+'发动【精妙】？';
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<0;
			},
            content:function(){
				player.line(trigger.player,'green');
				trigger.player.loseHp();
            },
            ai:{
                expose:0.2,
				threaten:1.3
            }
		},
		boss_zhinang:{
			trigger:{player:'phaseBegin'},
            frequent:true,
            content:function(){
                "step 0"
                event.cards=get.cards(3);
                event.cards2=[];
                for(var i=0;i<event.cards.length;i++){
                    var type=get.type(event.cards[i]);
                    if(type=='trick'||type=='equip'){
                        event.cards2.push(event.cards[i]);
                    }
                }
                if(!event.isMine()||event.cards2.length==0){
                    player.showCards(event.cards);
                }
                "step 1"
                if(event.cards2.length==0){
                    event.finish();
                }
                else{
                    var dialog=ui.create.dialog('将三张牌中的锦囊牌或装备牌交给一己方名角色','hidden');
                    dialog.add(event.cards);
                    for(var i=0;i<dialog.buttons.length;i++){
                        if(event.cards2.contains(dialog.buttons[i].link)){
                            dialog.buttons[i].style.opacity=1;
                        }
                        else{
                            dialog.buttons[i].style.opacity=0.5;
                        }
                    }
                    var next=player.chooseTarget(true,dialog,function(card,player,target){
						return target.isFriendOf(player);
					});
                    next.ai=function(target){
                        var att=ai.get.attitude(player,target);
						if(att>0&&target.num('j','lebu')){
							return 0.1;
						}
                        if(player.num('h')>player.hp){
                            if(target==player) return Math.max(1,att-2);
                        }
                        if(target==player) return att+5;
                        return att;
                    }
                }
                "step 2"
                if(result&&result.targets&&result.targets.length){
                    event.target=result.targets[0];
                }
                if(event.cards2.length){
					player.line(event.target,'green');
					game.log(event.target,'获得了',event.cards2);
                    event.target.gain(event.cards2,'gain2');
                }
            },
            ai:{
                threaten:1.3
            }
		},
		boss_biantian4:{
			trigger:{player:'dieBegin'},
			forced:true,
			popup:false,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].skills.contains('boss_biantian3')){
						game.players[i].removeSkill('boss_biantian3');
						game.players[i].popup('boss_biantian3');
					}
					if(game.players[i].skills.contains('boss_biantian2')){
						game.players[i].removeSkill('boss_biantian2');
						game.players[i].popup('boss_biantian2');
					}
				}
			}
		},
        boss_biantian:{
            trigger:{player:'phaseBegin'},
            forced:true,
            unique:true,
			audio:false,
            group:'boss_biantian4',
            content:function(){
                "step 0"
                for(var i=0;i<game.players.length;i++){
					if(game.players[i].skills.contains('boss_biantian3')){
						game.players[i].removeSkill('boss_biantian3');
						game.players[i].popup('boss_biantian3');
					}
					if(game.players[i].skills.contains('boss_biantian2')){
						game.players[i].removeSkill('boss_biantian2');
						game.players[i].popup('boss_biantian2');
					}
				}
                player.judge(function(card){
                    if(get.suit(card)=='spade') return 1;
					if(get.color(card)=='red') return 0;
                    return -1;
                });
                "step 1"
				var targets=[];
                if(result.color=='red'){
					game.trySkillAudio('boss_biantianx2');
					for(var i=0;i<game.players.length;i++){
						if(!game.players[i].isFriendOf(player)){
							game.players[i].addSkill('boss_biantian3');
							game.players[i].popup('kuangfeng');
							targets.push(game.players[i]);
						}
					}
					player.logSkill('kuangfeng',targets,'fire');
                }
                else if(result.suit=='spade'){
					game.trySkillAudio('boss_biantianx1');
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isFriendOf(player)){
							game.players[i].addSkill('boss_biantian2');
							game.players[i].popup('dawu');
							targets.push(game.players[i]);
						}
					}
					player.logSkill('dawu',targets,'thunder');
                }
            },
			ai:{
				threaten:1.6
			}
        },
        boss_biantian2:{
			audio:false,
            trigger:{player:'damageBefore'},
            filter:function(event){
                if(event.nature!='thunder') return true;
                return false;
            },
            forced:true,
			mark:true,
			marktext:'雾',
			intro:{
				content:'已获得大雾标记'
			},
            content:function(){
                trigger.untrigger();
                trigger.finish();
            },
            ai:{
				nofire:true,
				nodamage:true,
                effect:{
                    target:function(card,player,target,current){
                        if(get.tag(card,'damage')&&!get.tag(card,'thunderDamage')) return [0,0];
                    }
                }
            }
        },
        boss_biantian3:{
            trigger:{player:'damageBegin'},
            filter:function(event){
                if(event.nature=='fire') return true;
                return false;
            },
			mark:true,
			marktext:'风',
			intro:{
				content:'已获得狂风标记'
			},
            forced:true,
            content:function(){
                trigger.num++;
            },
            ai:{
                effect:{
                    target:function(card,player,target,current){
                        if(get.tag(card,'fireDamage')) return 1.5;
                    }
                }
            }
        },
		boss_jizhen:{
			audio:2,
			trigger:{player:'phaseEnd'},
			forced:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isFriendOf(player)&&game.players[i].hp<game.players[i].maxHp){
						return true;
					}
				}
				return false;
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isFriendOf(player)&&game.players[i].hp<game.players[i].maxHp){
						list.push(game.players[i]);
					}
				}
				if(list.length){
					player.line(list,'green');
					game.asyncDraw(list);
				}
			},
			ai:{
				threaten:1.4
			}
		},
		boss_lingfeng:{
			audio:2,
			trigger:{player:'phaseDrawBefore'},
            content:function(){
                "step 0"
                trigger.untrigger();
                trigger.finish();
                event.cards=get.cards(2);
                player.showCards(event.cards);
                "step 1"
                if(get.color(event.cards[0])!=get.color(event.cards[1])){
                    player.chooseTarget('是否令一名敌方角色失去1点体力？',function(card,player,target){
						return !target.isFriendOf(player);
                    }).ai=function(target){
                        return -ai.get.attitude(player,target);
                    }
                }
                "step 2"
                if(result.bool&&result.targets&&result.targets.length){
					player.line(result.targets,'green');
                    result.targets[0].loseHp();
                }
                "step 3"
                player.gain(event.cards);
                player.$draw(event.cards);
                game.delay();
            },
            ai:{
                threaten:1.4
            }
		},
		boss_jueji:{
			audio:2,
            trigger:{global:'phaseDrawBegin'},
            filter:function(event,player){
				if(event.player.isFriendOf(player)){
					return false;
				}
                return event.num>0&&event.player!=player&&event.player.hp<event.player.maxHp;
            },
			prompt:function(event,player){
				return '是否对'+get.translation(event.player)+'发动【惑敌】？'
			},
            content:function(){
				player.line(trigger.player,'green');
                trigger.num--;
            },
            ai:{
                expose:0.2,
                threaten:1.4
            }
        },
		boss_huodi:{
			audio:2,
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isFriendOf(player)&&game.players[i].isTurnedOver()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【惑敌】？',function(card,player,target){
					return !target.isFriendOf(player);
				}).ai=function(target){
					return -ai.get.attitude(player,target);
				};
				"step 1"
				if(result.bool){
					player.logSkill('boss_huodi',result.targets);
					result.targets[0].turnOver();
				}
			},
			ai:{
				expose:0.2
			}
		},
		boss_chuanyun:{
			audio:true,
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【穿云】？',function(card,player,target){
					return player.hp<target.hp;
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player);
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_chuanyun',result.targets);
					result.targets[0].damage();
				}
			},
		},
		boss_leili:{
			audio:2,
			trigger:{source:'damageEnd'},
			direct:true,
			filter:function(event){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【雷厉】？',function(card,player,target){
					if(target==trigger.player) return false;
					return target.isEnemyOf(player);
				}).ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder');
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_leili',result.targets);
					result.targets[0].damage('thunder');
				}
			},
			ai:{
				expose:0.2,
				threaten:1.3
			}
		},
		boss_fengxing:{
			audio:true,
			trigger:{player:'phaseBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【风行】？',function(card,player,target){
					if(target.isFriendOf(player)) return false;
					return lib.filter.targetEnabled({name:'sha'},player,target);
				}).ai=function(target){
					return ai.get.effect(target,{name:'sha'},player);
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_fengxing');
					player.useCard({name:'sha'},result.targets,false);
				}
			},
			ai:{
				expose:0.2,
				threaten:1.3
			}
		},
		boss_xuanlei:{
			audio:true,
            trigger:{player:'phaseBegin'},
            forced:true,
            filter:function(event,player){
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].isEnemyOf(player)&&game.players[i].num('j')) return true;
                }
                return false;
            },
            content:function(){
                "step 0"
                event.targets=[];
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].isEnemyOf(player)&&game.players[i].num('j')){
                        event.targets.push(game.players[i]);
                    }
                }
                event.targets.sort(lib.sort.seat);
				player.line(event.targets,'thunder');
                "step 1"
                if(event.targets.length){
                    event.targets.shift().damage('thunder');
                    event.redo();
                }
            }
        },
		boss_fanshi:{
			audio:true,
            trigger:{player:'phaseEnd'},
            forced:true,
            check:function(){
                return false;
            },
            content:function(){
                player.loseHp();
            }
        },
		boss_skonghun:{
			audio:true,
			trigger:{player:'phaseUseBegin'},
			filter:function(event,player){
				var num=player.maxHp-player.hp;
				if(num==0) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side){
						num--;
					}
				}
				return num>=0;
			},
			forced:true,
			content:function(){
				'step 0'
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				event.targets=targets;
				player.line(targets,'thunder');
				event.num=targets.length;
				'step 1'
				if(event.targets.length){
					event.targets.shift().damage('thunder');
					event.redo();
				}
				'step 2'
				player.recover(event.num);
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 2;
					if(target.hp==2&&game.players.length<8) return 1.5;
					return 0.5;
				},
			}
		},
		boss_chiying:{
			audio:2,
            trigger:{global:'damageBegin'},
            forced:true,
            filter:function(event,player){
                if(event.num<=1) return false;
				return event.player.isFriendOf(player);
            },
            priority:-11,
            content:function(){
                trigger.num=1;
            }
        },
		boss_jingfan:{
			global:'boss_jingfan2',
		},
		boss_jingfan2:{
			mod:{
				globalFrom:function(from,to,distance){
					if(to.isEnemyOf(from)) return;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].skills.contains('boss_jingfan')&&
							game.players[i].isFriendOf(from)&&game.players[i]!=from){
							return distance-1;
						}
					}
				}
			}
		},
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
					if(player.canUse('wanjian',game.players[i])&&game.players[i].isEnemyOf(player)){
						list.push(game.players[i]);
					}
				}
				list.sort(lib.sort.seat);
				player.useCard({name:'wanjian'},list);
			},
			ai:{
				threaten:1.8
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
				"step 1"
				if(event.players.length){
					var current=event.players.shift();
					if(current.isEnemyOf(player)){
						player.line(current,'fire');
						current.damage('fire');
					}
					event.redo();
				}
			},
			ai:{
				threaten:2
			}
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
					return target.isEnemyOf(player);
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
			ai:{
				threaten:1.7
			}
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
			inherit:'boss_guiji'
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
		boss_yuhuojg:{
			audio:true,
			trigger:{player:'damageBefore'},
			filter:function(event){
				return event.nature=='fire';
			},
			forced:true,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				nofire:true,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'fireDamage')) return 0;
					}
				}
			}
		},
		boss_tianyun:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【天陨】？',function(card,player,target){
					return target.isEnemyOf(player);
				}).ai=function(target){
					if(player.hp<=1) return 0;
					if(ai.get.attitude(player,target)>-3) return 0;
					var eff=ai.get.damageEffect(target,player,player,'fire');
					if(eff>0){
						return eff+target.num('e')/2;
					}
					return 0;
				}
				"step 1"
				if(result.bool){
					player.logSkill('boss_tianyun',result.targets,'fire');
					player.loseHp();
					event.target=result.targets[0];
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.target){
					event.target.damage(2,'fire');
				}
				"step 3"
				if(event.target){
					var es=event.target.get('e');
					if(es.length){
						event.target.discard(es);
					}
				}
			},
			ai:{
				threaten:2
			}
		},
		boss_tianyu:{
			audio:true,
			trigger:{player:'phaseEnd'},
            forced:true,
            filter:function(event,player){
                if(player.isLinked()) return true;
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i]!=player&&!game.players[i].isLinked()){
                        return true;
                    }
                }
                return false;
            },
            content:function(){
                "step 0"
                event.targets=game.players.slice(0);
                event.targets.remove(player);
                event.targets.sort(lib.sort.seat);
                if(player.isLinked()) player.link();
                "step 1"
                if(event.targets.length){
                    var target=event.targets.shift();
                    if(!target.isLinked()){
                        target.link();
                    }
                    event.redo();
                }
            }
		},
		boss_tianyujg:{
			audio:true,
			trigger:{player:'phaseEnd'},
            forced:true,
            filter:function(event,player){
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].isEnemyOf(player)&&!game.players[i].isLinked()){
                        return true;
                    }
                }
                return false;
            },
            content:function(){
                "step 0"
                event.targets=game.players.slice(0);
                event.targets.sort(lib.sort.seat);
                "step 1"
                if(event.targets.length){
                    var target=event.targets.shift();
                    if(!target.isLinked()&&target.isEnemyOf(player)){
						player.line(target,'green');
                        target.link();
                    }
                    event.redo();
                }
            }
		},
		boss_qiwu:{
			audio:true,
			trigger:{player:'useCard'},
			direct:true,
			filter:function(event,player){
				if(get.suit(event.card)=='club'){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isFriendOf(player)&&game.players[i].hp<game.players[i].maxHp){
							return true;
						}
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				var noneed=(trigger.card.name=='tao'&&trigger.targets[0]==player&&player.hp==player.maxHp-1);
				player.chooseTarget('是否发动【栖梧】？',function(card,player,target){
					return target.hp<target.maxHp&&target.isFriendOf(player);
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
					player.logSkill('qiwu',result.targets);
					result.targets[0].recover();
				}
			},
			ai:{
				expose:0.3,
				threaten:1.5
			}
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
			mode:['identity','guozhan','boss','stone'],
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
		qiwu:{
            audio:true,
            trigger:{player:'useCard'},
            forced:true,
            filter:function(event,player){
                return get.suit(event.card)=='club'&&player.hp<player.maxHp;
            },
            content:function(){
                player.recover();
            }
        },
		jizhen:{
            trigger:{player:'phaseEnd'},
            direct:true,
            filter:function(event,player){
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].hp<game.players[i].maxHp&&player!=game.players[i]){
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
                player.chooseTarget('是否发动【激阵】？',[1,2],function(card,player,target){
                    return target.hp<target.maxHp&&player!=target;
                }).ai=function(target){
                    return ai.get.attitude(player,target);
                }
                "step 1"
                if(result.bool){
                    player.logSkill('jizhen',result.targets);
                    game.asyncDraw(result.targets);
                }
            },
            ai:{
                expose:0.3,
                threaten:1.3
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

		boss_liedixuande:'烈帝玄德',
		boss_gongshenyueying:'工神月英',
		boss_tianhoukongming:'天侯孔明',
		boss_yuhuoshiyuan:'浴火士元',
		boss_qiaokuijunyi:'巧魁儁乂',
		boss_jiarenzidan:'佳人子丹',
		boss_duanyuzhongda:'断狱仲达',
		boss_juechenmiaocai:'绝尘妙才',

		boss_jileibaihu:'机雷白虎',
		boss_yunpingqinglong:'云屏青龙',
		boss_lingjiaxuanwu:'灵甲玄武',
		boss_chiyuzhuque:'炽羽朱雀',
		boss_fudibian:'缚地狴犴',
		boss_tuntianchiwen:'吞天螭吻',
		boss_shihuosuanni:'食火狻猊',
		boss_lieshiyazi:'裂石睚眦',

		boss_nianshou:'年兽',
		boss_nianshou_heti:'合体年兽',
		boss_nianshou_jingjue:'警觉年兽',
		boss_nianshou_renxing:'任性年兽',
		boss_nianshou_baonu:'暴怒年兽',
		boss_nianshou_ruizhi:'睿智年兽',

		jiaoxia:'皎霞',
		jiaoxia_info:'每当你成为红色牌的目标，你可以摸一张牌',
		lingbo:'凌波',
		lingbo_info:'每当你使用或打出一张闪，你可以摸两张牌',
		tiandao:'天道',
		tiandao_info:'任意一名角色的判定生效前，你可以打出一张牌替换之',
		yunshen:'云身',
		yunshen2:'云身',
		yunshen_info:'每当你打出一张闪，你可以令其他角色与你的距离+1；回合开始阶段，你将累计的防御距离清零，然后摸等量的牌',
		lianji:'连计',
		lianji_info:'出牌阶段限一次，你可以选择一张手牌并指定两名角色进行拼点，拼点赢的角色获得此牌，并对没赢的角色造成一点伤害',
		mazui:'麻醉',
		mazui2:'麻醉',
		mazui_info:'出牌阶段限一次，你可以将一张黑色手牌置于一名角色的武将牌上，该角色造成的下一次伤害-1，然后获得此牌',

		boss_nbianshen:'变形',
		boss_nbianshenx:'变形',
		boss_nbianshenx_info:'你从第二轮开始，每一轮幻化为警觉、任性、睿智、暴怒四种随机状态中的一种',
		boss_mengtai:'萌态',
		boss_mengtai_info:'锁定技，若你的出牌阶段被跳过，你跳过本回合的弃牌阶段；若你的摸牌阶段被跳过，结束阶段开始时，你摸三张牌',
		boss_ruizhi:'睿智',
		boss_ruizhi_info:'锁定技，其他角色的准备阶段开始时，其选择一张手牌和一张装备区里的牌，然后弃置其余的牌',
		boss_jingjue:'警觉',
		boss_jingjue_info:'每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你回复1点体力',
		// boss_jingjue_info:'锁定技，当你因弃置而失去牌后，你回复1点体力',
		boss_renxing:'任性',
		boss_renxing_info:'锁定技，你的回合外，一名角色受到1点伤害后或回复1点体力时，你摸一张牌',
		boss_nbaonu:'暴怒',
		boss_nbaonu_info:'锁定技，摸牌阶段，你改为摸X张牌（X为4到你体力值间的随机数）；若你的体力值小于5，则你使用【杀】造成的伤害+1且无次数限制',
		boss_shouyi:'兽裔',
		boss_shouyi_info:'锁定技，你使用牌无距离限制',

		boss_nianrui:'年瑞',
		boss_nianrui_info:'锁定技，摸牌阶段，你额外摸两张牌',
		boss_qixiang:'祺祥',
		boss_qixiang1:'祺祥',
		boss_qixiang2:'祺祥',
		boss_qixiang_info:'乐不思蜀判定时，你的方块判定牌视为红桃；兵粮寸断判定时，你的黑桃判定牌视为草花',
		boss_jiguan:'机关',
		boss_jiguan_info:'锁定技，你不能成为【乐不思蜀】的目标',
		boss_lingyu:'灵愈',
		boss_lingyu_info:'结束阶段，你可以将自己的武将牌翻面，然后令所有已受伤的己方其他角色回复1点体力',
		boss_tianyun:'天陨',
		boss_tianyun_info:'结束阶段，你可以失去1点体力，然后令一名敌方角色受到2点火焰伤害并弃置其装备区里的所有牌',
		boss_zhenwei:'镇卫',
		boss_zhenwei_info:'锁定技，对方角色计算与其他己方角色的距离时，始终+1',
		boss_benlei:'奔雷',
		boss_benlei_info:'锁定技，准备阶段，对敌方攻城器械造成2点雷电伤害',
		boss_nailuo:'奈落',
		boss_nailuo_info:'结束阶段，你可以将你的武将牌翻面，令所有敌方角色弃置装备区内的所有牌',
		boss_tanshi:'贪食',
		boss_tanshi_info:'锁定技，结束阶段开始时，你须弃置一张手牌',
		boss_tunshi:'吞噬',
		boss_tunshi_info:'锁定技，准备阶段，你对所有手牌数量大于你的敌方角色造成1点伤害',
		boss_yuhuojg:'浴火',
		boss_yuhuojg_info:'锁定技，每当你受到火焰伤害时，防止此伤害',
		boss_qiwu:'栖梧',
		boss_qiwu_info:'每当你使用一张梅花牌，你可以令一名友方角色回复一点体力',
		boss_tianyujg:'天狱',
		boss_tianyujg_info:'锁定技，回合结束阶段，你令所有未横置的敌方角色横置',
		boss_gongshenjg:'工神',
		boss_gongshenjg_info:'结束阶段，若已方器械已受伤，你可以为其回复一点体力；否则你可以对敌方器械造成一点火焰伤害',
		boss_zhinang:'智囊',
		boss_zhinang_info:'准备阶段，你可以亮出牌堆顶的三张牌，你可以将其中锦囊或装备牌交给一名己方角色，然后将其余牌置入弃牌堆',
		boss_jingmiao:'精妙',
		boss_jingmiao_info:'锁定技，每当敌方角色使用的无懈可击生效后，你令其失去1点体力',
		boss_biantian:'变天',
		boss_biantian_info:'锁定技，准备阶段，你进行一次判定，若为红色，直到下个回合开始前，令敌方所有角色处于“狂风”状态，若为黑桃，直到下个回合开始前，令己方所有角色处于“大雾”状态',
        boss_biantian2:'大雾',
        boss_biantian3:'狂风',
		boss_lingfeng:'灵锋',
		boss_lingfeng_info:'摸牌阶段，你可以放弃摸牌，亮出牌堆顶的两张牌，然后获得之，若这些牌的颜色不同，你令一名敌方角色失去1点体力',
		boss_jizhen:'激阵',
		boss_jizhen_info:'锁定技，结束阶段，你令所有已受伤的己方角色摸一张牌',
		boss_huodi:'惑敌',
		boss_huodi_info:'结束阶段，若有武将牌背面朝上的己方角色，你可以令一名敌方角色将其身份牌翻面',
		boss_jueji:'绝汲',
		boss_jueji_info:'敌方角色摸牌阶段，若其已受伤，你可以令其少摸一张牌',
		boss_chuanyun:'穿云',
		boss_chuanyun_info:'结束阶段，你可以对体力比你多的一名其他角色造成1点伤害',
		boss_leili:'雷厉',
		boss_leili_info:'每当你的[杀]造成伤害后，你可以对另一名敌方角色造成1点雷电伤害',
		boss_fengxing:'风行',
		boss_fengxing_info:'准备阶段，你可以选择一名敌方角色，若如此做，视为对其使用了一张[杀]',
		boss_skonghun:'控魂',
		boss_skonghun_info:'出牌阶段开始时，若你已损失体力值不小于敌方角色数，你可以对所有敌方角色各造成1点雷电伤害，然后你恢复X点体力（X为受到伤害的角色数）',
		boss_fanshi:'反噬',
		boss_fanshi_info:'锁定技，结束阶段，你失去1点体力',
		boss_xuanlei:'玄雷',
		boss_xuanlei_info:'锁定技，准备阶段，令所有判定区内有牌的敌方角色受到1点雷电伤害',
		boss_chiying:'持盈',
		boss_chiying_info:'锁定技，每当己方角色受到多于1伤害时，你防止其余伤害',
		boss_jingfan:'惊帆',
		boss_jingfan_info:'锁定技，己方其他角色计算与敌方角色距离时，始终-1',

        qiwu:'栖梧',
        qiwu_info:'锁定技。每当你使用一张梅花牌，你回复一点体力',
        jizhen:'激阵',
        jizhen_info:'结束阶段，你可以令所至多两名已受伤角色摸一张牌',

		boss_yushou:'驭兽',
		boss_yushou_info:'出牌阶段开始时，你可以对所有敌方角色使用一张南蛮入侵',
		boss_moyany:'魔炎',
		boss_moyany_info:'每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你对一名其他角色造成2点火焰伤害',
		boss_modao:'魔道',
		boss_modao_info:'锁定技，准备阶段，你摸两张牌',
		boss_mojian:'魔箭',
		boss_mojian_info:'出牌阶段开始时，你可以对所有敌方角色使用一张万箭齐发',
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
		boss_lianyu_info:'结束阶段，你可以对所有敌方角色造成1点火焰伤害',

		boss_guihuo:'鬼火',
		boss_guihuo_info:'结束阶段，你可以对一名其他角色造成1点火焰伤害',
		boss_minbao:'冥爆',
		boss_minbao_info:'锁定技，当你死亡时，对场上所有其他角色造成1点火焰伤害',
		boss_luolei:'落雷',
		boss_luolei_info:'准备阶段，你可以对一名其他角色造成1点雷电伤害',
		boss_beiming:'悲鸣',
		boss_beiming_info:'锁定技，当你死亡时，你令杀死你的角色弃置所有手牌',
		boss_guimei:'鬼魅',
		boss_guimei_info:'锁定技，你不能成为延时类锦囊的目标',
		boss_didong:'地动',
		boss_didong_info:'结束阶段，你可以选择一名敌方角色将其武将牌翻面',
		boss_shanbeng:'山崩',
		boss_shanbeng_info:'锁定技，当你死亡时，你令所有其他角色弃置其装备区内的所有牌',

		boss_zhuoguiquxie:'捉鬼驱邪',
		boss_bianshen:'出场',
		boss_bianshen_info:'游戏开始时，你随机变身为魑、魅、魍、魉中的一个',
		boss_bianshen2:'后援',
		boss_bianshen2_info:'你死亡后，随机召唤牛头、马面中的一个',
		boss_bianshen3:'后援',
		boss_bianshen3_info:'你死亡后，随机召唤白无常、黑无常中的一个',
		boss_bianshen4:'后援',
		boss_bianshen4_info:'你死亡后，随机召唤罗刹、夜叉中的一个',

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
		yuehun_info:'回合结束阶段，你可以回复一点体力并摸两张牌',
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

		boss_yuhuo:'浴火',
		boss_yuhuo_info:'觉醒技，在你涅槃后，你获得技能【神威】、【朱羽】',
		boss_tianyu:'天狱',
		boss_tianyu_info:'锁定技，回合结束阶段，你解除横置状态，除你之外的所有角色进入横置状态',

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
