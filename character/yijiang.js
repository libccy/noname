'use strict';
character.yijiang={
	connect:true,
	character:{
		yujin:['male','wei',4,['yizhong']],
		caozhang:['male','wei',4,['jiangchi']],
		guohuai:['male','wei',4,['jingce']],
		zhangchunhua:['female','wei',3,['jueqing','shangshi']],
		caozhi:['male','wei',3,['luoying','jiushi']],
		caochong:['male','wei',3,['renxin','chengxiang']],
		xunyou:['male','wei',3,['zhiyu','qice']],
		xushu:['male','shu',3,['wuyan','jujian']],
		xin_xushu:['male','shu',3,['xinwuyan','xinjujian']],
		xin_masu:['male','shu',3,['sanyao','zhiman']],
		masu:['male','shu',3,['xinzhan','huilei']],
		fazheng:['male','shu',3,['enyuan','xuanhuo']],
		xin_fazheng:['male','shu',3,['xinenyuan','xinxuanhuo']],
		zhuran:['male','wu',4,['danshou']],
		xusheng:['male','wu',4,['xinpojun']],
		wuguotai:['female','wu',3,['ganlu','buyi']],
		lingtong:['male','wu',4,['xuanfeng']],
		liubiao:['male','qun',3,['zongshi','zishou']],
		huaxiong:['male','qun',6,['yaowu']],
		wangyi:['female','wei',3,['zhenlie','miji']],
		yufan:['male','wu',3,['zhiyan','zongxuan']],
		chengong:['male','qun',3,['mingce','zhichi']],
		bulianshi:['female','wu',3,['anxu','zhuiyi']],
		handang:['male','wu',4,['gongji','jiefan']],
		fuhuanghou:['female','qun',3,['zhuikong','qiuyuan']],
		zhonghui:['male','wei',4,['quanji','zili']],
		jianyong:['male','shu',3,['qiaoshui','jyzongshi']],
		madai:['male','shu',4,['mashu','qianxi']],
		liufeng:['male','shu',4,['xiansi']],
		manchong:['male','wei',3,['junxing','yuce']],
		liru:['male','qun',3,['juece','mieji','fencheng']],
		guanzhang:['male','shu',4,['fuhun']],
		chenqun:['male','wei',3,['dingpin','faen']],
		sunluban:['female','wu',3,['chanhui','jiaojin']],
		guyong:['male','wu',3,['shenxing','bingyi']],
		caifuren:['female','qun',3,['qieting','xianzhou']],
		yj_jushou:['male','qun',3,['jianying','shibei']],
		zhangsong:['male','shu',3,['qiangzhi','xiantu']],
		zhuhuan:['male','wu',4,['youdi']],
		xiahoushi:['female','shu',3,['qiaoshi','yanyu']],

		panzhangmazhong:['male','wu',4,['anjian','duodao']],
		zhoucang:['male','shu',4,['zhongyong']],
		guanping:['male','shu',4,['longyin']],
		liaohua:['male','shu',4,['dangxian','fuli']],
		chengpu:['male','wu',4,['lihuo','chunlao']],
		gaoshun:['male','qun',4,['xianzhen','jinjiu']],
		caozhen:['male','wei',4,['sidi']],
		wuyi:['male','shu',4,['benxi']],
		hanhaoshihuan:['male','wei',4,['shenduan','yonglve']],

		caorui:['male','wei',3,['huituo','mingjian','xingshuai'],['zhu']],
		caoxiu:['male','wei',4,['qianju','qingxi']],
		zhongyao:['male','wei',3,['huomo','zuoding']],
		liuchen:['male','shu',4,['zhanjue','qinwang'],['zhu']],
		zhangyi:['male','shu',4,['wurong','shizhi']],
		sunxiu:['male','wu',3,['yanzhu','xingxue','zhaofu'],['zhu']],
		zhuzhi:['male','wu',4,['anguo']],
		quancong:['male','wu',4,['yaoming']],
		gongsunyuan:['male','qun',4,['huaiyi']],
		guotufengji:['male','qun',3,['jigong','shifei']],

		xin_yujin:['male','wei',4,['jieyue']],
		xin_liru:['male','qun',3,['xinjuece','xinmieji','xinfencheng']],

		guohuanghou:['female','wei',3,['jiaozhao','danxin']],
		liuyu:['male','qun',2,['zhige','zongzuo']],
		liyan:['male','shu',3,['duliang','fulin']],
		sundeng:['male','wu',4,['kuangbi']],

		cenhun:['male','wu',3,['jishe','lianhuo']],
		huanghao:['male','shu',3,['qinqing','huisheng']],
		zhangrang:['male','qun',3,['taoluan']],
		sunziliufang:['male','wei',3,['guizao','jiyu']],
	},
	perfectPair:{
		wuguotai:['sunjian','sunshangxiang'],
		zhangchunhua:['simayi'],
		caozhi:['zhenji'],
		xunyou:['xunyu'],
		xushu:['liubei'],
		lingtong:['ganning'],
		chengong:['lvbu'],
		bulianshi:['sunquan'],
		fuhuanghou:['liuxie'],
		sunluban:['quancong'],
		caifuren:['liubiao'],
		xiahoushi:['zhangfei'],
		zhoucang:['guanyu'],
		guanping:['guanyu'],
		sundeng:['sunquan'],
		liru:['dongzhuo'],
		liuchen:['liushan'],
	},
	skill:{
		taoluan:{
			enable:'phaseUse',
			filter:function(event,player){
				return !player.hasSkill('taoluan3');
			},
			init:function(player){
				player.storage.taoluan=[];
			},
			chooseButton:{
				dialog:function(event,player){
					var list=['sha','tao','jiu','taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman'];
					for(var i=0;i<player.storage.taoluan.length;i++){
						list.remove(player.storage.taoluan[i]);
					}
					for(var i=0;i<list.length;i++){
						if(i<3){
							list[i]=['基本','',list[i]];
						}
						else{
							list[i]=['锦囊','',list[i]];
						}
					}
					if(list.length==0){
						return ui.create.dialog('滔乱已无可用牌');
					}
					return ui.create.dialog([list,'vcard']);
				},
				filter:function(button,player){
					return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
				},
				check:function(button){
					var player=_status.event.player;
					if(player.num('h',button.link)) return 0;
					if(button.link=='wuzhong'){
						if(player.num('h')<player.hp){
							return 3+Math.random();
						}
						return 0;
					}
					if(button.link=='tao'){
						return 3+Math.random();
					}
					if(button.link=='sha'){
						return 2+Math.random();
					}
					if(button.link=='juedou'){
						return 2+Math.random();
					}
					if(button.link=='guohe'){
						return 2+Math.random();
					}
					if(button.link=='shunshou'){
						for(var i=0;i<game.players.length;i++){
							if(player.canUse('shunshou',game.players[i])&&ai.get.attitude(player,game.players[i])<0){
								return 2+Math.random();
							}
						}
						return 0;
					}
					if(button.link=='tiesuo'){
						return 1+Math.random();
					}
					if(button.link=='jiu'){
						if(ai.get.effect(player,{name:'jiu'})>0){
							return 1+Math.random();
						}
						return 0;
					}
					if(button.link=='nanman'||button.link=='wanjian'||button.link=='taoyuan'||button.link=='wugu'){
						var eff=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player){
								eff+=ai.get.effect(game.players[i],{name:button.link},player,player);
							}
						}
						if(eff>0){
							return 1+Math.random();
						}
						return 0;
					}
					return Math.random();

				},
				backup:function(links,player){
					return {
						filterCard:false,
						selectCard:0,
						popname:true,
						viewAs:{name:links[0][2]},
						onuse:function(result,player){
							player.storage.taoluan.push(result.card.name);
						},
					}
				},
				prompt:function(links,player){
					return '选择'+get.translation(links[0][2])+'的目标';
				}
			},
			ai:{
				order:4,
				result:{
					player:function(player){
						var allshown=true;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0){
								allshown=false;
							}
							if(game.players[i]!=player&&game.players[i].num('h')&&ai.get.attitude(player,game.players[i])>0){
								return 1;
							}
						}
						if(allshown) return 1;
						return 0;
					}
				},
				threaten:1.6,
			},
			group:['taoluan2']
		},
		taoluan2:{
			trigger:{player:['useCardAfter','respondAfter']},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.skill=='taoluan_backup'||event.skill=='taoluan5';
			},
			content:function(){
				'step 0'
				player.chooseTarget(true,function(card,player,target){
					return target!=player;
				},'滔乱<br><br><div class="text center">令一名其他角色选择一项：1.交给你一张与你以此法使用的牌类别相同的牌；2.你失去1点体力').set('ai',function(target){
					var player=_status.event.player;
					if(ai.get.attitude(player,target)>0){
						if(ai.get.attitude(target,player)>0){
							return target.num('h');
						}
						return target.num('h')/2;
					}
					return 0;
				});
				'step 1'
				var target=result.targets[0];
				event.target=target;
				player.line(target,'green');
				var type=get.type(trigger.card,'trick');
				target.chooseCard('滔乱<br><br><div class="text center">交给'+get.translation(player)+'一张'+get.translation(type)+'牌，或令其失去一点体力且滔乱无效直到回合',function(card,player,target){
					return get.type(card,'trick')==_status.event.cardType;
				}).set('cardType',type).set('ai',function(card){
					if(_status.event.att){
						return 11-ai.get.value(card);
					}
					return 0;
				}).set('att',ai.get.attitude(target,player)>0);
				'step 2'
				var target=event.target;
				if(result.bool){
					player.gain(result.cards);
					target.$give(result.cards,player);
				}
				else{
					player.addTempSkill('taoluan3','phaseAfter');
					player.loseHp();
				}
			}
		},
		taoluan3:{},
		taoluan4:{
			trigger:{player:'chooseToRespondBegin'},
			filter:function(event,player){
				if(event.responded) return false;
				if(!event.filterCard({name:'shan'})) return false;
				if(player.storage.taoluan.contains('shan')) return false;
				return true;
			},
			check:function(event,player){
				var allshown=true;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')>1&&ai.get.attitude(player,game.players[i])>0){
						return 1;
					}
				}
				return 0;
			},
			content:function(){
				trigger.untrigger();
				trigger.responded=true;
				trigger.result={bool:true,card:{name:'shan'},skill:'taoluan_backup'};
				player.storage.taoluan.push('shan');
			},
		},
		taoluan5:{
			enable:'chooseToUse',
			filter:function(event,player){
				return event.type=='dying'&&!player.storage.taoluan.contains('tao');
			},
			onuse:function(result,player){
				player.storage.taoluan.push('tao');
			},
			filterCard:function(){
				return false;
			},
			selectCard:-1,
			viewAs:{name:'tao'},
			ai:{
				skillTagFilter:function(player){
					return !player.storage.taoluan.contains('tao');
				},
				threaten:1.5,
				save:true,
			}
		},
		taoluan_backup:{},
		jishe:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.getHandcardLimit()>0;
			},
			init:function(player){
				player.storage.jishe=0;
			},
			usable:20,
			content:function(){
				player.draw();
				player.storage.jishe++;
			},
			ai:{
				order:10,
				result:{
					player:function(player){
						if(player.num('h')<player.getHandcardLimit()){
							return 1;
						}
						return 0;
					}
				}
			},
			mod:{
				maxHandcard:function(player,num){
					return num-player.storage.jishe;
				}
			},
			group:['jishe2','jishe3']
		},
		jishe2:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.storage.jishe=0;
			}
		},
		jishe3:{
            trigger:{player:'phaseEnd'},
            direct:true,
            filter:function(event,player){
				if(player.num('h')) return false;
                for(var i=0;i<game.players.length;i++){
                    if(!game.players[i].isLinked()){
                        return true;
                    }
                }
            },
            content:function(){
                "step 0"
                var num=0;
                for(var i=0;i<game.players.length;i++){
                    if(!game.players[i].isLinked()){
                        num++;
                    }
                }
                player.chooseTarget(get.prompt('jishe'),[1,Math.min(num,player.hp)],function(card,player,target){
                    return !target.isLinked();
                }).set('ai',function(target){
                    return -ai.get.attitude(_status.event.player,target);
                });
                "step 1"
                if(result.bool){
                    player.logSkill('jishe',result.targets);
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
            ai:{
                expose:0.3
            }
        },
		lianhuo:{
			trigger:{player:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return player.isLinked()&&event.notLink()&&event.nature=='fire';
			},
			content:function(){
				trigger.num++;
			}
		},
		huisheng:{
			trigger:{player:'damageBefore'},
			direct:true,
			filter:function(event,player){
				if(!player.num('he')) return false;
				if(!event.source||event.source.isDead()) return false;
				if(event.source.storage.huisheng&&event.source.storage.huisheng.contains(player)) return false;
				return true;
			},
			content:function(){
				'step 0'
				var att=(ai.get.attitude(player,trigger.source)>0);
				var goon=false;
				if(player.hp==1){
					goon=true;
				}
				else{
					var he=player.get('he');
					var num=0;
					for(var i=0;i<he.length;i++){
						if(ai.get.value(he[i])<8){
							num++;
							if(num>=2){
								goon=true;break;
							}
						}
					}
				}
				player.chooseCard('he',[1,player.num('he')],get.prompt('huisheng',trigger.source)).set('ai',function(card){
					if(_status.event.att){
						return 10-ai.get.value(card);
					}
					if(_status.event.goon){
						return 8-ai.get.value(card);
					}
					return 0;
				}).set('goon',goon).set('att',att);
				'step 1'
				if(result.bool){
					player.logSkill('huisheng');
					event.num=result.cards.length;
					var goon=false;
					if(event.num>2||ai.get.attitude(trigger.source,player)>=0){
						goon=true;
					}
					var forced=false;
					var str='获得其中一张牌并防止伤害';
					if(trigger.source.num('he')<event.num){
						forced=true;
					}
					else{
						str+='，或取消并弃置'+get.cnNumber(result.cards.length)+'张牌';
					}
					if(!trigger.source.storage.huisheng){
						trigger.source.storage.huisheng=[];
					}
					trigger.source.storage.huisheng.push(player);
					trigger.source.chooseButton([str,result.cards],forced).set('ai',function(button){
						if(_status.event.goon){
							return ai.get.value(button.link);
						}
						return ai.get.value(button.link)-8;
					}).set('goon',goon);
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool){
					var card=result.links[0];
					trigger.source.gain(card);
					if(get.position(card)=='e'){
						player.$give(card,trigger.source);
					}
					else{
						player.$give(1,trigger.source);
					}
					trigger.untrigger();
					trigger.finish();
				}
				else{
					trigger.source.chooseToDiscard(event.num,true,'he');
				}
			}
		},
		qinqing:{
			mode:['identity'],
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				if(!game.zhu||!game.zhu.isZhu) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]==game.zhu||game.players[i]==player) continue;
					if(get.distance(game.players[i],game.zhu,'attack')<=1&&game.players[i].num('he')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				player.chooseTarget(get.prompt('qinqing'),function(card,player,target){
					if(target==player||target==game.zhu) return false;
					return get.distance(target,game.zhu,'attack')<=1&&target.num('he')>0;
				}).set('ai',function(target){
					var player=_status.event.player;
					var zhu=_status.event.zhu;
					if(ai.get.attitude(player,target)>0) return 0;
					var nh=target.num('h');
					var nh2=zhu.num('h');
					if(nh>nh2) return 2;
					if(nh==nh2&&target.num('e')) return 1.5;
					return 1;
				}).set('zhu',game.zhu);
				'step 1'
				if(result.bool){
					event.target=result.targets[0];
					player.logSkill('qinqing',event.target);
					player.discardPlayerCard(event.target,'he',true);
				}
				else{
					event.finish();
				}
				'step 2'
				event.target.draw();
				'step 3'
				if(event.target.num('h')>game.zhu.num('h')){
					player.draw();
				}
			},
			ai:{
				threaten:1.2
			}
		},
		guizao:{
			trigger:{player:'phaseDiscardEnd'},
			direct:true,
			filter:function(event,player){
				if(event.cards&&event.cards.length>1){
					var suits=[];
					for(var i=0;i<event.cards.length;i++){
						var suit=get.suit(event.cards[i]);
						if(suits.contains(suit)){
							return false;
						}
						else{
							suits.push(suit);
						}
					}
					return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				var controls=['draw_card'];
				if(player.hp<player.maxHp){
					controls.push('recover_hp');
				}
				controls.push('cancel');
				player.chooseControl(controls).set('prompt',get.prompt('guizao')).set('ai',function(event,player){
					if(player.hp<player.maxHp) return 'recover_hp';
					return 'draw_card';
				});
				"step 1"
				if(result.control!='cancel'){
					player.logSkill('guizao');
					if(result.control=='draw_card'){
						player.draw();
					}
					else{
						player.recover();
					}
				}
			},
		},
		jiyu:{
			enable:'phaseUse',
			filter:function(event,player){
				var hs=player.get('h');
				for(var i=0;i<hs.length;i++){
					if(event.filterCard(hs[i],player)){
						return true;
					}
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return target.num('h')&&!player.storage.jiyu.contains(target);
			},
			content:function(){
				'step 0'
				var spade=true;
				if(player.isTurnedOver()||ai.get.attitude(target,player)>0||target.hp<=2){
					spade=false;
				}
				target.chooseToDiscard('h',true).set('ai',function(card){
					if(get.suit(card)=='spade'){
						if(_status.event.spade){
							return 10-ai.get.value(card);
						}
						else{
							return -10-ai.get.value(card);
						}
					}
					if(_status.event.getParent().player.storage.jiyu2.contains(get.suit(card))){
						return -3-ai.get.value(card);
					}
					return -ai.get.value(card);
				}).set('spade',spade);
				'step 1'
				var card=result.cards[0];
				if(get.suit(card)=='spade'){
					player.turnOver();
					target.loseHp();
				}
				player.storage.jiyu.push(target);
				player.storage.jiyu2.add(get.suit(card));
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(player.isTurnedOver()||target.num('h')<=3) return -1;
						return 0;
					}
				}
			},
			group:'jiyu2',
			mod:{
				cardEnabled:function(card,player){
					if(player.storage.jiyu2&&player.storage.jiyu2.contains(get.suit(card))) return false;
				}
			}
		},
		jiyu2:{
			trigger:{player:['phaseUseBegin','phaseAfter']},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.storage.jiyu=[];
				player.storage.jiyu2=[];
			}
		},
		jiaozhao:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			check:function(card){
				return 8-ai.get.value(card);
			},
			filterCard:true,
			discard:false,
			lose:false,
			content:function(){
				'step 0'
				player.showCards(cards);
				'step 1'
				if(player.storage.jiaozhao2){
					event.target=player;
				}
				else{
					var targets=game.players.slice(0);
					targets.remove(player);
					targets.sort(function(a,b){
						return Math.max(1,get.distance(player,a))-Math.max(1,get.distance(player,b));
					});
					var distance=Math.max(1,get.distance(player,targets[0]));
					for(var i=1;i<targets.length;i++){
						if(Math.max(1,get.distance(player,targets[i]))>distance){
							targets.splice(i);break;
						}
					}
					player.chooseTarget(true,function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('ai',function(target){
						return ai.get.attitude(_status.event.player,target);
					}).set('targets',targets);
				}
				'step 2'
				if(!event.target){
					event.target=result.targets[0];
					player.line(result.targets,'green');
				}
				if(!event.target){
					event.finish();
					return;
				}
				var list=['sha','shan','tao','jiu'];
				if(player.storage.jiaozhao1){
					list=list.concat(['taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman']);
				}
				for(var i=0;i<list.length;i++){
					if(i<=4){
						list[i]=['基本','',list[i]];
					}
					else{
						list[i]=['锦囊','',list[i]];
					}
				}
				var att=ai.get.attitude(event.target,player);
				event.target.chooseButton(['矫诏',[list,'vcard']],true).set('ai',function(button){
					var att=_status.event.att;
					if(att<=0){
						return button.link=='shan'?1:0;
					}
					else{
						if(!_status.event.trick){
							return button.link=='sha'?1:0;
						}
						var player=_status.event.player;
						var recover=0,lose=1;
						for(var i=0;i<game.players.length;i++){
							if(!game.players[i].isOut()&&game.players[i]!=player){
								if(game.players[i].hp<game.players[i].maxHp){
									if(ai.get.attitude(player,game.players[i])>0){
										if(game.players[i].hp<2){
											lose--;
											recover+=0.5;
										}
										lose--;
										recover++;
									}
									else if(ai.get.attitude(player,game.players[i])<0){
										if(game.players[i].hp<2){
											lose++;
											recover-=0.5;
										}
										lose++;
										recover--;
									}
								}
								else{
									if(ai.get.attitude(player,game.players[i])>0){
										lose--;
									}
									else if(ai.get.attitude(player,game.players[i])<0){
										lose++;
									}
								}
							}
						}
						if(lose>recover&&lose>0) return (button.link[2]=='nanman')?1:-1;
						if(lose<recover&&recover>0) return (button.link[2]=='taoyuan')?1:-1;
						return (button.link[2]=='shunshou')?1:-1;
					}
				}).set('att',att).set('trick',player.storage.jiaozhao1);
				'step 3'
				event.target.showCards(game.createCard(result.links[0]),get.translation(event.target)+'声明了'+get.translation(result.links[0][2]));
				player.storage.jiaozhao=cards[0];
				player.storage.jiaozhao_card=result.links[0][2];
				game.broadcastAll(function(name){
					lib.skill.jiaozhao2.viewAs={name:name};
				},result.links[0][2]);
			},
			ai:{
				order:9,
				result:{
					player:1
				}
			},
			intro:{
				content:function(storage,player){
					if(player.storage.jiaozhao2){
						return '出牌阶段限一次，你可以展示一张手牌，然后你声明一张基本牌或非延时类锦囊牌的牌名。在此出牌阶段内，你可以将此手牌当声明的牌使用且你不能被选择为目标';
					}
					else{
						return '出牌阶段限一次，你可以展示一张手牌，然后选择距离最近的一名其他角色，该角色声明一张基本牌或非延时类锦囊牌的牌名。在此出牌阶段内，你可以将此手牌当声明的牌使用且你不能被选择为目标';
					}
				}
			},
			group:['jiaozhao2','jiaozhao3']
		},
		jiaozhao2:{
			enable:'phaseUse',
			audio:'jiaozhao',
			filter:function(event,player){
				if(!player.storage.jiaozhao) return false;
				var name=player.storage.jiaozhao_card;
				if(name=='tao'||name=='shan'||name=='wuzhong'||name=='jiu') return false;
				return player.get('h').contains(player.storage.jiaozhao);
			},
			filterCard:function(card,player){
				return card==player.storage.jiaozhao;
			},
			selectCard:-1,
			popname:true,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return lib.filter.filterTarget({name:player.storage.jiaozhao_card},player,target);
			},
			check:function(card){
				return 8-ai.get.value(card);
			},
			ai:{
				order:6
			}
		},
		jiaozhao3:{
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			content:function(){
				delete player.storage.jiaozhao;
				delete player.storage.jiaozhao_card;
			}
		},
		danxin:{
			trigger:{player:'damageEnd'},
			frequent:true,
			audio:2,
			content:function(){
				'step 0'
				if(player.storage.jiaozhao1&&player.storage.jiaozhao2){
					player.draw();
					event.finish();
				}
				else{
					var list=['draw_card','更改描述'];
					var prompt;
					if(player.storage.jiaozhao1){
						prompt='摸一张牌或更改矫诏的描述<br><br><div class="text">更改描述：将“选择距离最近的一名其他角色，该角色”改为“你”';
					}
					else{
						prompt='摸一张牌或更改矫诏的描述<br><br><div class="text">更改描述：将“基本牌”改为“基本牌或非延时类锦囊牌”';
					}
					player.chooseControl(list,function(){
						if(!_status.event.player.hasSkill('jiaozhao')) return 'draw_card';
						return '更改描述';
					}).set('prompt',prompt);
				}
				'step 1'
				if(result.control=='draw_card'){
					player.draw();
				}
				else{
					game.log(player,'更改了','【矫诏】','的描述');
					player.popup('更改描述');
					player.markSkill('jiaozhao');
					if(player.storage.jiaozhao1){
						player.storage.jiaozhao2=true;
					}
					else{
						player.storage.jiaozhao1=true;
					}
				}
			}
		},
		zongzuo:{
			trigger:{global:'phaseBefore'},
			forced:true,
			priority:10,
			audio:2,
			filter:function(event,player){
				return !player.storage.zongzuo;
			},
			content:function(){
				'step 0'
				player.storage.zongzuo=true;
				var list=['wei','shu','wu','qun'],num=0;
				for(var i=0;i<game.players.length&&list.length;i++){
					if(list.contains(game.players[i].group)){
						list.remove(game.players[i].group);
						num++;
					}
				}
				player.gainMaxHp(num);
				event.num=num;
				'step 1'
				player.hp+=event.num;
				player.update();
			},
			group:'zongzuo_lose',
			subSkill:{
				lose:{
					trigger:{global:'dieAfter'},
					forced:true,
					audio:'zongzuo',
					filter:function(event,player){
						var list=['wei','shu','wu','qun'];
						if(!list.contains(event.player.group)) return false;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].group==event.player.group){
								return false;
							}
						}
						return true;
					},
					content:function(){
						player.loseMaxHp();
					}
				}
			}
		},
		zhige:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			filter:function(event,player){
				return player.num('h')>player.hp;
			},
			filterTarget:function(card,player,target){
				return get.distance(target,player,'attack')<=1&&target.num('e')>0;
			},
			content:function(){
				'step 0'
				target.chooseToUse({name:'sha'},'止戈：使用一张杀，或将其装备区里的一张牌交给'+get.translation(player));
				'step 1'
				if(!result.bool&&target.num('e')){
					target.chooseCard('e',true,'将其装备区里的一张牌交给'+get.translation(player));
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool&&result.cards&&result.cards.length){
					player.gain(result.cards);
					target.$give(result.cards,player);
				}
			},
			ai:{
				expose:0.2,
				order:5,
				result:{
					target:-1,
					player:function(player,target){
						if(target.num('h')==0) return 0;
						if(target.num('h')==1) return -0.1;
						if(player.hp<=2) return -2;
						if(player.num('h','shan')==0) return -1;
						return -0.5;
					}
				}
			}
		},
		kuangbi:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('he')>0;
			},
			content:function(){
				'step 0'
				target.chooseCard('he',[1,3],'匡弼：将1〜3张牌置于'+get.translation(player)+'的武将牌上',true).set('ai',function(card){
					if(ai.get.attitude(_status.event.player,_status.event.getParent().player)>0){
						return 7-ai.get.value(card);
					}
					return -ai.get.value(card);
				});
				'step 1'
				if(result.bool){
					target.$give(result.cards,player);
					target.lose(result.cards,ui.special);
					player.storage.kuangbi_draw=result.cards;
					player.storage.kuangbi_draw_source=target;
					player.syncStorage('kuangbi_draw');
					player.addSkill('kuangbi_draw');
				}
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(ai.get.attitude(player,target)>0){
							return Math.sqrt(target.num('he'));
						}
						return 0;
					},
					player:1
				}
			},
			subSkill:{
				draw:{
					trigger:{player:'phaseBegin'},
					forced:true,
					mark:true,
					intro:{
						content:'cards'
					},
					content:function(){
						var cards=player.storage.kuangbi_draw;
						if(cards){
							player.gain(cards,'gain2');
							var target=player.storage.kuangbi_draw_source;
							if(target&&target.isAlive()){
								target.draw(cards.length);
							}
						}
						delete player.storage.kuangbi_draw;
						delete player.storage.kuangbi_draw_source;
						player.removeSkill('kuangbi_draw');
					}
				}
			}
		},
		fulin:{
			trigger:{player:'phaseDiscardBegin'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.addTempSkill('fulin2','phaseDiscardAfter');
			},
			group:['fulin_count','fulin_reset'],
			subSkill:{
				reset:{
					trigger:{player:['phaseBegin','phaseEnd']},
					forced:true,
					popup:false,
					silent:true,
					priority:10,
					content:function(){
						player.storage.fulin=[];
					}
				},
				count:{
					trigger:{player:'gainEnd'},
					forced:true,
					popup:false,
					silent:true,
					filter:function(event,player){
						return _status.currentPhase==player;
					},
					content:function(){
						if(!player.storage.fulin){
							player.storage.fulin=[];
						}
						for(var i=0;i<trigger.cards.length;i++){
							player.storage.fulin.add(trigger.cards[i]);
						}
					}
				}
			}
		},
		fulin2:{
			mod:{
				maxHandcard:function(player,num){
					if(player.storage.fulin&&player.storage.fulin.length){
						var hs=player.get('h');
						for(var i=0;i<player.storage.fulin.length;i++){
							if(hs.contains(player.storage.fulin[i])){
								num++;
							}
						}
						return num;
					}
				}
			},
		},
		duliang:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player!=target&&target.num('h')>0;
			},
			audio:2,
			content:function(){
				'step 0'
				player.gain(target.get('h').randomGet());
				target.$give(1,player);
				'step 1'
				player.chooseControl('选项一','选项二',function(){
					return Math.random()<0.5?'选项一':'选项二';
				}).set('prompt','督粮<br><br><div class="text">选项一：令其观看牌堆顶的两张牌，然后获得其中的基本牌</div><br><div class="text">选项二：令其于下个摸牌阶段额外摸一张牌</div>');
				'step 2'
				if(result.control=='选项一'){
					var cards=get.cards(2);
					target.viewCards('督粮',cards);
					event.cards2=[];
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i])=='basic'){
							ui.special.appendChild(cards[i]);
							event.cards2.push(cards[i]);
						}
						else{
							ui.discardPile.appendChild(cards[i]);
						}
					}
				}
				else{
					target.addSkill('duliang2');
					event.finish();
				}
				'step 3'
				if(event.cards2&&event.cards2.length){
					target.gain(event.cards2,'draw');
					game.log(target,'获得了'+get.cnNumber(event.cards2.length)+'张牌');
				}
			},
			ai:{
				order:4,
				result:{
					target:-1,
					player:0.1
				}
			}
		},
		duliang2:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			mark:true,
			audio:false,
			intro:{
				content:'下个摸牌阶段额外摸一张牌'
			},
			content:function(){
				trigger.num++;
				player.removeSkill('duliang2');
			}
		},
		xinfencheng:{
			skillAnimation:'epic',
			animationColor:'fire',
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.xinfencheng;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			unique:true,
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			mark:true,
			line:'fire',
			content:function(){
				"step 0"
				player.storage.xinfencheng=true;
				player.unmarkSkill('xinfencheng');
				event.num=1;
				event.targets=targets.slice(0);
				event.targets.sort(lib.sort.seat);
				"step 1"
				if(event.targets.length){
					var target=event.targets.shift();
					event.target=target;
					var res=ai.get.damageEffect(target,player,target,'fire');
					target.chooseToDiscard('he','弃置至少'+get.cnNumber(event.num)+'张牌或受到2点火焰伤害',[num,Infinity]).set('ai',function(card){
						if(ui.selected.cards.length>=_status.event.getParent().num) return -1;
						if(_status.event.player.hasSkillTag('nofire')) return -1;
						if(_status.event.res>=0) return 6-ai.get.value(card);
						if(get.type(card)!='basic'){
							return 10-ai.get.value(card);
						}
						return 8-ai.get.value(card);
					}).set('res',res);
				}
				else{
					event.finish();
				}
				"step 2"
				if(!result.bool){
					event.target.damage(2,'fire');
					event.num=1;
				}
				else{
					event.num=result.cards.length+1;
				}
				event.goto(1);
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(player!=game.players[i]&&ai.get.damageEffect(game.players[i],player,game.players[i],'fire')<0){
								var att=ai.get.attitude(player,game.players[i]);
								if(att>0){
									num--;
								}
								else if(att<0){
									num++;
								}
							}
						}
						if(game.players.length<5){
							return num-1;
						}
						else{
							return num-2;
						}
					}
				}
			},
			init:function(player){
				player.storage.xinfencheng=false;
			},
			intro:{
				content:'limited'
			}
		},
		xinjuece:{
			audio:2,
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return game.hasPlayer(function(player){
					return player.num('h')==0;
				});
			},
			content:function(){
				'step 0'
				player.chooseTarget(get.prompt('xinjuece'),function(card,player,target){
					return target.num('h')==0;
				}).set('ai',function(target){
					var player=_status.event.player;
					return ai.get.damageEffect(target,player,player);
				});
				'step 1'
				if(result.bool){
					player.logSkill('juece',result.targets);
					result.targets[0].damage();
				}
			}
		},
		xinmieji:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterCard:function(card){
				return get.color(card)=='black'&&get.type(card,'trick')=='trick';
			},
			filterTarget:function(card,player,target){
				return target!=player&&target.num('h')>0;
			},
			discard:false,
			delay:false,
			check:function(card){
				return 8-ai.get.value(card);
			},
			content:function(){
				'step 0'
				player.showCards(cards);
				'step 1'
				ui.cardPile.insertBefore(cards[0],ui.cardPile.firstChild);
				var n1=target.get('he',function(card){
					return get.type(card,'trick')=='trick';
				});
				var n2=target.get('he',function(card){
					return get.type(card,'trick')!='trick';
				});
				if(n1.length>1||n2.length>2||(n1.length==1&&n2.length==2)){
					target.chooseToDiscard('弃置一张锦囊牌，或两张非锦囊牌',true,'he',function(card){
						if(!_status.event.nontrick){
							return get.type(card,'trick')=='trick';
						}
						if(ui.selected.cards.length){
							return get.type(card,'trick')!='trick';
						}
						return true;
					}).set('ai',function(card){
						if(get.type(card,'trick')=='trick'){
							return 8-ai.get.value(card);
						}
						return -ai.get.value(card);
					}).set('selectCard',function(){
						if(ui.selected.cards.length==1&&get.type(ui.selected.cards[0],'trick')=='trick'){
							return 1;
						}
						return 2;
					}).set('nontrick',n2.length>=2);
				}
				else{
					if(n1.length){
						target.discard(n1);
					}
					else if(n2.length){
						target.discard(n2);
					}
				}
			},
			ai:{
				order:9,
				result:{
					target:-1
				}
			}
		},
		qianju:{
			mod:{
				globalFrom:function(from,to,distance){
					return distance-(from.maxHp-from.hp);
				}
			}
		},
		qingxi:{
			trigger:{source:'damageBegin'},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<0;
			},
			filter:function(event,player){
				return event.card&&event.card.name=='sha'&&player.get('e','1');
			},
			content:function(){
				'step 0'
				var num=1;
				var info=get.info(player.get('e','1'));
				if(info&&info.distance&&info.distance.attackFrom){
					num-=info.distance.attackFrom;
				}
				if(trigger.player.num('h')<num){
					event.directfalse=true;
				}
				else{
					trigger.player.chooseToDiscard(num,'弃置'+get.cnNumber(num)+'张手牌，或令杀的伤害+1').set('ai',function(card){
						var player=_status.event.player;
						if(player.hp==1){
							if(get.type(card)=='basic'){
								return 8-ai.get.value(card);
							}
							else{
								return 10-ai.get.value(card);
							}
						}
						else{
							if(num>2){
								return 0;
							}
							return 8-ai.get.value(card);
						}
					});
				}
				'step 1'
				if(!event.directfalse&&result.bool){
					var e1=player.get('e','1');
					if(e1){
						player.discard(e1);
					}
				}
				else{
					trigger.num++;
				}
			}
		},
		jieyue:{
			group:'jieyue1'
		},
		jieyue1:{
			audio:2,
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				'step 0'
				player.chooseCardTarget({
					filterTarget:function(card,player,target){
						return target!=player&&target.num('he')>0;
					},
					filterCard:true,
					ai1:function(card){
						return 7-ai.get.useful(card);
					},
					ai2:function(target){
						return 1-ai.get.attitude(_status.event.player,target);
					},
					prompt:get.prompt('jieyue')
				});
				'step 1'
				if(result.bool){
					player.logSkill('jieyue1',result.targets);
					player.discard(result.cards);
					var target=result.targets[0];
					event.target=target;
					target.chooseCard('将一张牌置于'+get.translation(player)+'的武将牌上，或令其弃置你的一张牌','he').set('ai',function(card){
						if(card.name=='du') return 20;
						var player=_status.event.player;
						if(ai.get.attitude(player,_status.event.getParent().player)>0){
							return 8-ai.get.value(card);
						}
						var nh=player.num('h');
						if(nh<=2){
							return 6-ai.get.value(card);
						}
						if(nh<=3){
							return 2-ai.get.value(card);
						}
						return 0;
					});
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool&&result.cards&&result.cards.length){
					event.target.$give(result.cards,player);
					player.storage.jieyue2=result.cards[0];
					event.target.lose(result.cards[0],ui.special);
					player.syncStorage('jieyue2');
					player.addSkill('jieyue2');
				}
				else if(event.target.num('he')){
					player.discardPlayerCard(event.target,true);
				}
			},
			ai:{
				expose:0.1
			}
		},
		jieyue2:{
			mark:'card',
			intro:{
				content:'card'
			},
			audio:true,
			enable:'chooseToUse',
			filterCard:function(card){
				return get.color(card)=='black';
			},
			viewAsFilter:function(player){
				return player.num('h',{color:'black'})>0;
			},
			viewAs:{name:'wuxie'},
			prompt:'将一张黑色手牌当无懈可击使用',
			check:function(card){return 8-ai.get.value(card)},
			threaten:1.2,
			group:['jieyue3','jieyue4']
		},
		jieyue3:{
			enable:['chooseToRespond'],
			filterCard:function(card){
				return get.color(card)=='red';
			},
			viewAs:{name:'shan'},
			viewAsFilter:function(player){
				if(!player.num('h',{color:'red'})) return false;
			},
			audio:true,
			prompt:'将一张红色手牌当闪打出',
			check:function(){return 1},
			ai:{
				respondShan:true,
				skillTagFilter:function(player){
					if(!player.num('h',{color:'red'})) return false;
				},
				result:{
					target:function(card,player,target,current){
						if(get.tag(card,'respondShan')&&current<0) return 0.8
					}
				}
			}
		},
		jieyue4:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				player.gain(player.storage.jieyue2,'gain2');
				player.storage.jieyue2=null;
				player.removeSkill('jieyue2');
			}
		},
		jinjiu:{
			mod:{
				cardEnabled:function(card,player){
					if(card.name=='jiu'&&_status.event.skill!='jinjiu') return false;
				},
				cardUsable:function(card,player){
					if(card.name=='jiu'&&_status.event.skill!='jinjiu') return false;
				},
				cardRespondable:function(card,player){
					if(card.name=='jiu'&&_status.event.skill!='jinjiu') return false;
				},
				cardSavable:function(card,player){
					if(card.name=='jiu'&&_status.event.skill!='jinjiu') return false;
				},
			},
			enable:['chooseToUse','chooseToRespond'],
			filter:function(event,player){
				return player.num('h','jiu')>0;
			},
			filterCard:{name:'jiu'},
			viewAs:{name:'sha'},
			viewAsFilter:function(player){
				if(!player.num('h','jiu')) return false;
			},
			check:function(){return 1},
			ai:{
				skillTagFilter:function(player){
					if(!player.num('h','jiu')) return false;
				},
				respondSha:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		xianzhen:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player!=target&&target.num('h')>0;
			},
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target);
				"step 1"
				if(result.bool){
					player.storage.xianzhen=target;
					player.addTempSkill('xianzhen2','phaseAfter');
					player.addTempSkill('unequip','phaseAfter');
				}
				else{
					player.addTempSkill('xianzhen3','phaseAfter');
				}
			},
			ai:{
				order:function(name,player){
					var cards=player.get('h');
					if(player.num('h','sha')==0){
						return 1;
					}
					for(var i=0;i<cards.length;i++){
						if(cards[i].name!='sha'&&cards[i].number>11&&ai.get.value(cards[i])<7){
							return 9;
						}
					}
					return lib.card.sha.ai.order-1;
				},
				result:{
					player:function(player){
						if(player.num('h','sha')>0) return 0;
						var num=player.num('h');
						if(num>player.hp) return 0;
						if(num==1) return -2;
						if(num==2) return -1;
						return -0.7;
					},
					target:function(player,target){
						var num=target.num('h');
						if(num==1) return -1;
						if(num==2) return -0.7;
						return -0.5
					},
				},
				threaten:1.3
			}
		},
		xianzhen2:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(player.storage.xianzhen==target) return true;
				},
				cardUsable:function(card,player,num){
					if(card.name=='sha') return Infinity;
				}
			},
		},
		xianzhen3:{
			mod:{
				cardEnabled:function(card){if(card.name=='sha') return false}
			}
		},
		lihuo:{
			enable:'phaseUse',
			usable:1,
			filterCard:function(card){
				return card.name=='sha'&&!card.nature;
			},
			filter:function(event,player){
				return player.num('h','sha')>0
			},
			viewAs:{name:'sha',nature:'fire'},
			mod:{
				selectTarget:function(card,player,range){
					if(card.name=='sha'&&card.nature=='fire'&&range[1]!=-1){
						range[1]++;
					}
				},
			},
			group:'lihuo2'
		},
		lihuo2:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.parent.skill=='lihuo';
			},
			content:function(){
				player.addTempSkill('lihuo3','phaseAfter');
			}
		},
		lihuo3:{
			trigger:{player:'useCardAfter'},
			filter:function(event,player){
				return event.card.name=='sha';
			},
			forced:true,
			silent:true,
			audio:false,
			content:function(){
				player.loseHp();
				player.removeSkill('lihuo3');
				delete player.tempSkills.lihuo3;
			}
		},
		chunlao:{
			trigger:{player:'phaseEnd'},
			direct:true,
			audio:2,
			filter:function(event,player){
				return player.num('h','sha')>0&&!player.storage.chunlao.length;
			},
			init:function(player){
				player.storage.chunlao=[];
			},
			intro:{
				content:'cards',
			},
			content:function(){
				'step 0'
				player.chooseCard([1,player.num('h','sha')],get.prompt('chunlao'),{name:'sha'}).set('ai',function(){
					return 1;
				});
				'step 1'
				if(result.bool){
					player.logSkill('chunlao');
					player.storage.chunlao=player.storage.chunlao.concat(result.cards);
					player.syncStorage('chunlao');
					player.markSkill('chunlao');
					player.lose(result.cards,ui.special);
					player.$give(result.cards,player);
				}
			},
			ai:{
				effect:{
					player:function(card,player){
						if(_status.currentPhase!=player) return;
						if(card.name=='sha'&&player.num('h')<=player.hp&&!player.storage.chunlao.length){
							return [0,0,0,0];
						}
					}
				},
				threaten:1.4
			},
			group:'chunlao2'
		},
		chunlao2:{
			trigger:{global:'dying'},
			priority:6,
			filter:function(event,player){
				return event.player.hp<=0&&player.storage.chunlao.length>0;
			},
			direct:true,
			content:function(){
				"step 0"
				var att=ai.get.attitude(player,trigger.player);
				player.chooseCardButton(get.prompt('chunlao',trigger.player),player.storage.chunlao).set('ai',function(button){
					if(_status.event.att>0) return 1;
					return 0;
				}).set('att',att);
				"step 1"
				if(result.bool){
					player.logSkill('chunlao',trigger.player);
					player.$throw(result.links);
					player.storage.chunlao.remove(result.links[0]);
					ui.discardPile.appendChild(result.links[0]);
					player.syncStorage('chunlao');
					trigger.player.useCard({name:'jiu'},trigger.player);
					if(!player.storage.chunlao.length){
						player.unmarkSkill('chunlao');
					}
					else{
						player.markSkill('chunlao');
					}
				}
			},
			ai:{
				expose:0.2
			}
		},
		shenduan:{
			trigger:{player:'discardAfter'},
			filter:function(event,player){
				for(var i=0;i<event.cards.length;i++){
					if(get.color(event.cards[i])=='black'&&get.type(event.cards[i])=='basic'&&
						get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			direct:true,
			content:function(){
				'step 0'
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					if(get.color(trigger.cards[i])=='black'&&get.type(trigger.cards[i])=='basic'&&
						get.position(trigger.cards[i])=='d'){
						cards.push(trigger.cards[i]);
					}
				}
				if(!cards.length){
					event.finish();
				}
				else{
					event.cards=cards;
				}
				'step 1'
				if(event.cards.length){
					player.chooseTarget(get.prompt('shenduan'),function(card,player,target){
						return player.canUse({name:'bingliang'},target,false);
					}).set('ai',function(target){
						var player=_status.event.player;
						return ai.get.effect(target,{name:'bingliang'},player,player);
					});
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool&&result.targets&&result.targets.length){
					event.current=result.targets[0];
					if(event.cards.length==1){
						event.directCard=event.cards[0];
					}
					else{
						delete event.directCard;
						player.chooseCardButton('选择一张牌当作兵断寸断使用',event.cards,true);
					}
				}
				else{
					event.finish();
				}
				'step 3'
				var card;
				if(event.directCard){
					card=event.directCard;
				}
				else if(result.links&&result.links.length&&
					event.cards.contains(result.links[0])){
					card=result.links[0]
				}
				if(card){
					event.cards.remove(card);
					event.current.addJudge('bingliang',[card]);
					event.goto(1);
					player.logSkill('shenduan',event.current);
				}
			}
		},
		yonglve:{
			trigger:{global:'phaseJudgeBegin'},
			direct:true,
			filter:function(event,player){
				return event.player!=player&&event.player.num('j')>0&&get.distance(player,event.player,'attack')<=1;
			},
			content:function(){
				'step 0'
				var att=ai.get.attitude(player,trigger.player);
				var nh=trigger.player.num('h');
				var eff=ai.get.effect(trigger.player,{name:'sha'},player,player);
				player.chooseCardButton(get.prompt('yonglve',trigger.player),trigger.player.get('j')).set('ai',function(button){
					var name=button.link.viewAs||button.link.name;
					var att=_status.event.att;
					var nh=_status.event.nh;
					var eff=_status.event.eff;
					var trigger=_status.event.getTrigger();
					if(att>0&&eff>=0) return 1;
					if(att>=0&&eff>0) return 1;
					if(att>0&&(trigger.player.hp>=3||trigger.player.num('e','bagua')||trigger.player.num('h','shan'))){
						if(name=='lebu'&&nh>trigger.player.hp) return 1;
						if(name=='bingliang'&&nh<trigger.player.hp) return 1;
					}
					return 0;
				}).set('att',att).set('nh',nh).set('eff',eff);
				'step 1'
				if(result.bool){
					trigger.player.discard(result.links);
					player.useCard({name:'sha'},trigger.player,'yonglve');
					player.storage.yonglve=false;
				}
				else{
					event.finish();
				}
				'step 2'
				if(player.storage.yonglve){
					player.storage.yonglve=false;
				}
				else{
					player.draw();
				}
			},
			group:'yonglve2'
		},
		yonglve2:{
			trigger:{source:'damageAfter'},
			forced:true,
			popup:false,
			filter:function(event){
				return event.parent.skill=='yonglve';
			},
			content:function(){
				player.storage.yonglve=true;
			}
		},
		benxi:{
			trigger:{player:['useCardAfter','useSkillAfter']},
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				if(!player.storage.benxi) return false;
				return _status.currentPhase==player;
			},
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(get.distance(player,game.players[i])>1){
						player.removeSkill('unequip');
						return;
					}
				}
				player.addSkill('unequip');
			},
			group:['benxi2','benxi3'],
			mod:{
                globalFrom:function(from,to,distance){
                    if(_status.currentPhase==from){
                        return distance-get.cardCount(true,from);
                    }
                },
				selectTarget:function(card,player,range){
					if(_status.currentPhase==player){
						if(card.name=='sha'&&range[1]!=-1){
							for(var i=0;i<game.players.length;i++){
								if(get.distance(player,game.players[i])>1) return;
							}
							range[1]++;
						}
					}
				},
            },
		},
		benxi2:{
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			silent:true,
			priority:5,
			filter:function(event,player){
				return player.hasSkill('benxi');
			},
			content:function(){
				player.storage.benxi=!player.hasSkill('unequip');
				if(player.storage.benxi){
					for(var i=0;i<game.players.length;i++){
						if(get.distance(player,game.players[i])>1){
							return;
						}
					}
					player.addSkill('unequip');
				}
			}
		},
		benxi3:{
			trigger:{player:'phaseAfter'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				if(player.storage.benxi){
					player.storage.benxi=false;
					player.removeSkill('unequip');
				}
			}
		},
		sidi:{
			trigger:{global:'respondEnd'},
			filter:function(event,player){
				if(event.parent.parent.name!='sha') return false;
				if(event.player==player) return true;
				return _status.currentPhase==player;
			},
			frequent:true,
			init:function(player){
				player.storage.sidi=[];
			},
			intro:{
				content:'cards'
			},
			content:function(){
				var card=get.cards()[0];
				game.log(player,'将',card,'置于武将牌上');
				player.$gain2(card);
				player.storage.sidi.add(card);
				player.markSkill('sidi');
				player.syncStorage('sidi');
			},
			group:'sidi2'
		},
		sidi2:{
			trigger:{global:'phaseUseBegin'},
			filter:function(event,player){
				if(event.player==player) return false;
				if(!player.storage.sidi.length) return false;
				return true;
			},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)>=0) return false;
				if(event.player.num('e','zhuge')) return false;
				if(event.player.hasSkill('paoxiao')) return false;
				for(var i=0;i<game.players.length;i++){
					if(event.player.canUse('sha',game.players[i])&&
					ai.get.attitude(player,game.players[i])>0) break;
				}
				if(i==game.players.length) return false;
				var nh=event.player.num('h');
				var nsha=event.player.num('h','sha');
				if(nh<2) return false;
				switch(nh){
					case 2:
					if(nsha) return Math.random()<0.4;
					return Math.random()<0.2;
					case 3:
					if(nsha) return Math.random()<0.8;
					return Math.random()<0.3;
					case 4:
					if(nsha>1) return true;
					if(nsha) return Math.random()<0.9;
					return Math.random()<0.5;
					default:return true;
				}
			},
			content:function(){
				'step 0'
				if(player.storage.sidi.length==1){
					event.directbutton=player.storage.sidi[0];
				}
				else{
					player.chooseCardButton('弃置武将牌上的一张牌',player.storage.sidi,true);
				}
				'step 1'
				var button;
				if(event.directbutton){
					button=event.directbutton;
				}
				else if(result.bool&&result.links&&result.links.length){
					button=result.links[0];
				}
				if(button){
					player.$throw([button]);
					player.line(trigger.player,'green');
					game.log(player,'将',button,'置于弃牌堆');
					ui.discardPile.appendChild(button);
					trigger.player.addTempSkill('sidi3','phaseAfter');
					player.storage.sidi.remove(button);
					player.syncStorage('sidi');
					if(player.storage.sidi.length==0){
						player.unmarkSkill('sidi');
					}
					else{
						player.markSkill('sidi');
					}
					game.delayx();
				}
			}
		},
		sidi3:{
			mod:{
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num-1;
				}
			}
		},
		zhongyong:{
			trigger:{player:'shaMiss'},
			direct:true,
			filter:function(event,player){
				return event.responded&&get.itemtype(event.responded.cards)=='cards';
			},
			content:function(){
				"step 0"
				var cards=trigger.responded.cards;
				event.cards=cards;
				player.chooseTarget('忠勇：将'+get.translation(trigger.responded.cards)+'交给一名角色',function(card,player,target){
					return target!=_status.event.getTrigger().target;
				}).set('ai',function(target){
					var att=ai.get.attitude(_status.event.player,target);
					if(target.num('h','shan')&&target.num('h')>=2){
						att/=1.5;
					}
					return att;
				});
				"step 1"
				if(result.bool){
					player.logSkill('zhongyong',result.targets);
					result.targets[0].gain(event.cards,'gain2');
					if(result.targets[0]==player){
						event.finish();
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(player.hasSkill('jiu')){
					game.broadcastAll(function(player){
						player.removeSkill('jiu');
						if(player.node.jiu){
							player.node.jiu.delete();
							player.node.jiu2.delete();
							delete player.node.jiu;
							delete player.node.jiu2;
						}
					},player);
					event.jiu=true;
				}
				player.chooseToUse('是否对'+get.translation(trigger.target)+'再使用一张杀？',
					{name:'sha'},trigger.target,-1).logSkill='qinglong_skill';
				"step 3"
				if(result.bool);
				else if(event.jiu){
					player.addSkill('jiu');
				}
			}
		},
		dangxian:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				'step 0'
				player.phaseUse();
				'step 1'
				player.getStat().card={};
			}
		},
		longyin:{
			trigger:{global:'shaBegin'},
			direct:true,
			filter:function(event,player){
				return event.target==event.targets[0]&&player.num('he')>0&&event.card.name=='sha'&&
				_status.currentPhase==event.player&&event.parent.parent.parent.name=='phaseUse';
			},
			content:function(){
				'step 0'
				var go=false;
				if(ai.get.attitude(player,trigger.player)>0){
					if(get.color(trigger.card)=='red'){
						go=true;
					}
					else if(!trigger.player.hasSkill('paoxiao')&&
						!trigger.player.hasSkill('tanlin3')&&
						!trigger.player.hasSkill('zhaxiang2')&&
						!trigger.player.hasSkill('fengnu')&&
						!trigger.player.num('e','zhuge')){
						var nh=trigger.player.num('h');
						if(player==trigger.player){
							go=(player.num('h','sha')>0);
						}
						else if(nh>=4){
							go=true;
						}
						else if(player.num('h','sha')){
							if(nh==3){
								go=Math.random()<0.8;
							}
							else if(nh==2){
								go=Math.random()<0.5;
							}
						}
						else if(nh>=3){
							if(nh==3){
								go=Math.random()<0.5;
							}
							else if(nh==2){
								go=Math.random()<0.2;
							}
						}
					}
				}
				var next=player.chooseToDiscard(get.prompt('longyin'),'he');
				next.logSkill=['longyin',trigger.player];
				next.set('ai',function(card){
					if(_status.event.go){
						return 6-ai.get.value(card);
					}
					return 0;
				});
				next.set('go',go);
				'step 1'
				if(result.bool){
					trigger.player.getStat().card.sha--;
					if(get.color(trigger.card)=='red'){
						player.draw();
					}
					player.logSkill('longyin',trigger.player);
				}
			},
			ai:{
				expose:0.2
			}
		},
		jigong:{
			audio:2,
			trigger:{player:'phaseUseBegin'},
			check:function(event,player){
				var nh=player.num('h')-player.num('h',{type:'equip'});
				if(nh<=1) return true;
				if(player.num('h','tao')) return false;
				if(nh<=2) return Math.random()<0.7;
				if(nh<=3) return Math.random()<0.4;
				return false;
			},
			content:function(){
				player.draw(2);
				player.addTempSkill('jigong2','phaseAfter');
			}
		},
		jigong2:{
			mod:{
				maxHandcard:function(player,num){
					var damage=player.getStat().damage;
					if(typeof damage=='number') return num-player.hp+damage;
					return 0;
				}
			}
		},
		shifei:{
			audio:2,
			trigger:{player:'chooseToRespondBegin'},
			filter:function(event,player){
				if(event.responded) return false;
				if(!event.filterCard({name:'shan'})) return false;
				return true;
			},
			check:function(event,player){
				if(ai.get.attitude(player,_status.currentPhase)>0) return true;
				var nh=_status.currentPhase.num('h')+1;
				var hasshan=(player.num('h','shan')>0);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].num('h')>nh){
						if(!hasshan||ai.get.attitude(player,game.players[i])<=0) return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				player.line(_status.currentPhase,'green');
				_status.currentPhase.draw();
				'step 1'
				var nh=_status.currentPhase.num('h');
				var nmax=nh+1;
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					var nh2=game.players[i].num('h');
					if(nh2>nmax){
						nmax=nh2;
						targets.length=0;
						targets.push(game.players[i]);
					}
					else if(nh2==nmax){
						targets.push(game.players[i]);
					}
				}
				if(targets.length==1){
					event.onlytarget=targets[0];
				}
				else if(targets.length){
					player.chooseTarget('选择一名角色弃置其一张牌',true,function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('ai',function(target){
						return -ai.get.attitude(_status.event.player,target);
					}).set('targets',targets);
				}
				else{
					event.finish();
				}
				'step 2'
				var target;
				if(event.onlytarget){
					target=event.onlytarget;
				}
				else if(result.targets&&result.targets.length){
					target=result.targets[0];
				}
				if(target){
					player.line(target,'green');
					player.discardPlayerCard(target,'he',true);
					trigger.untrigger();
					trigger.responded=true;
					trigger.result={bool:true,card:{name:'shan'}}
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'respondShan')&&current<0){
							var nh=player.num('h');
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].num('h')>nh) return 0.4;
							}
						}
					}
				}
			}
		},
		huaiyi:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			delay:0,
			filter:function(event,player){
				return player.num('h',{color:'red'})&&player.num('h',{color:'black'});
			},
			content:function(){
				'step 0'
				player.chooseControl('红色','黑色').set('ai',function(){
					var player=_status.event.player;
					if(player.num('h',{color:'red'})==1&&
					player.num('h',{color:'black'})>1) return '红色';
					return '黑色';
				});
				'step 1'
				event.control=result.control;
				player.showHandcards();
				'step 2'
				var cards;
				if(event.control=='红色'){
					cards=player.get('h',{color:'red'});
				}
				else{
					cards=player.get('h',{color:'black'});
				}
				player.discard(cards);
				event.num=cards.length;
				'step 3'
				player.chooseTarget([1,event.num],function(card,player,target){
					return target!=player&&target.num('he')>0;
				}).set('ai',function(target){
					return -ai.get.attitude(_status.event.player,target)+0.5;
				});
				'step 4'
				if(result.bool&&result.targets){
					player.line(result.targets,'green');
					event.targets=result.targets;
					event.targets.sort(lib.sort.seat);
					event.gained=event.targets.length;
				}
				else{
					event.finish();
				}
				'step 5'
				if(event.targets.length){
					player.gainPlayerCard(event.targets.shift(),'he',true);
					event.redo();
				}
				'step 6'
				if(event.gained>=2){
					player.loseHp();
				}
			},
			ai:{
				order:function(item,player){
					if(player.num('h',{color:'red'})==1) return 10;
					if(player.num('h',{color:'black'})==1) return 10;
					return 1;
				},
				result:{
					player:1
				}
			}
		},
		yaoming:{
			audio:2,
			trigger:{player:'damageEnd',source:'damageEnd'},
			direct:true,
			filter:function(event,player){
				if(player.hasSkill('yaoming2')) return false;
				var nh=player.num('h');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].num('h')!=nh) return true;
				}
				return false;
			},
			content:function(){
				'step 0'
				var nh=player.num('h');
				player.chooseTarget(get.prompt('yaoming'),function(card,player,target){
					return _status.event.nh!=target.num('h');
				}).set('ai',function(target){
					var att=ai.get.attitude(_status.event.player,target);
					if(target.num('h')>_status.event.nh) return -att;
					return att;
				}).set('nh',nh);
				'step 1'
				if(result.bool){
					player.logSkill('yaoming',result.targets);
					player.addTempSkill('yaoming2','phaseAfter');
					var target=result.targets[0];
					if(target.num('h')<player.num('h')){
						target.draw();
					}
					else{
						target.discard(target.get('h').randomGet());
					}
				}
			},
			ai:{
				expose:0.2
			}
		},
		yaoming2:{},
		anguo:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player!=target&&target.num('e')>0;
			},
			content:function(){
				'step 0'
				player.choosePlayerCard(target,'e',true);
				'step 1'
				if(result.links){
					var num=0;
					for(var i=0;i<game.players.length;i++){
						if(get.distance(target,game.players[i],'attack')<=1){
							num++;
						}
					}
					event.num=num;
					target.gain(result.links,'gain2');
				}
				else{
					event.finish();
				}
				'step 2'
				var num2=0;
				for(var i=0;i<game.players.length;i++){
					if(get.distance(target,game.players[i],'attack')<=1){
						num2++;
					}
				}
				if(event.num>num2){
					player.draw();
				}
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						if(target.hasSkillTag('noe')) return 1;
						if(target.get('e','1')||target.get('e','4')) return -1;
						if(target.get('e','2')) return -0.7;
						return -0.5;
					}
				}
			}
		},
		zhaofu:{
			unique:true,
			global:'zhaofu2',
			zhuSkill:true
		},
		zhaofu2:{
			mod:{
				attackTo:function(from,to,distance){
					if(from.group!='wu') return;
					for(var i=0;i<game.players.length;i++){
						if(from!=game.players[i]&&to!=game.players[i]&&
							game.players[i].hasZhuSkill('zhaofu',from)){
							if(get.distance(game.players[i],to)<=1) return distance-100;
						}
					}
				}
			}
		},
		xingxue:{
			audio:2,
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				'step 0'
				var num=player.hp;
				if(!player.hasSkill('yanzhu')){
					num=player.maxHp;
				}
				player.chooseTarget([1,num],get.prompt('xingxue')).set('ai',function(target){
					var att=ai.get.attitude(_status.event.player,target);
					if(target.num('he')) return att;
					return att/10;
				});
				'step 1'
				if(result.bool){
					player.logSkill('xingxue',result.targets);
					event.targets=result.targets;
					event.targets.sort(lib.sort.seat);
				}
				else{
					event.finish();
				}
				'step 2'
				if(event.targets.length){
					var target=event.targets.shift();
					target.draw();
					event.current=target;
				}
				else{
					event.finish();
				}
				'step 3'
				if(event.current&&event.current.num('he')){
					event.current.chooseCard('选择一张牌置于牌堆顶','he',true);
				}
				else{
					event.goto(2);
				}
				'step 4'
				if(result&&result.cards){
					event.card=result.cards[0];
					event.current.lose(result.cards,ui.special);
					game.broadcastAll(function(player){
						var cardx=ui.create.card();
						cardx.classList.add('infohidden');
						cardx.classList.add('infoflip');
						player.$throw(cardx,1000,'nobroadcast');
					},event.current);
				}
				else{
					event.card=null;
				}
				'step 5'
				if(event.current==game.me) game.delay(0.5);
				'step 6'
				if(event.card){
					event.card.fix();
					ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
				}
				event.goto(2);
			}
		},
		yanzhu:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target.num('he')>0&&target!=player;
			},
			content:function(){
				'step 0'
				if(target.num('e')){
					target.chooseBool('是否将装备区内的所有牌交给'+get.translation(player)+'？').set('ai',function(){
						if(_status.event.player.num('e')>=3) return false;
						return true;
					});
				}
				else{
					target.chooseToDiscard(true,'he');
					event.finish();
				}
				'step 1'
				if(result.bool){
					var es=target.get('e');
					player.gain(es);
					target.$give(es,player);
					player.removeSkill('yanzhu');
				}
				else{
					target.chooseToDiscard(true,'he');
				}
			},
			ai:{
				order:6,
				result:{
					target:function(player,target){
						var ne=target.num('e');
						if(!ne) return -2;
						if(ne>=2) return -ne;
						return 0;
					}
				}
			}
		},
		shizhi:{
			mod:{
				cardRespondable:function(card,player){
					if(card.name=='shan'&&player.hp==1&&_status.event.skill!='shizhi') return false;
				},
			},
			enable:['chooseToUse','chooseToRespond'],
			filter:function(event,player){
				return player.hp==1;
			},
			filterCard:{name:'shan'},
			viewAs:{name:'sha'},
			viewAsFilter:function(player){
				if(!player.num('h','shan')) return false;
				if(player.hp!=1) return false;
			},
			check:function(){return 1},
			ai:{
				skillTagFilter:function(player){
					if(!player.num('h','shan')) return false;
					if(player.hp!=1) return false;
				},
				respondSha:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		wurong:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.num('h')>0;
			},
			filterTarget:function(card,player,target){
				return target.num('h')>0&&target!=player;
			},
			content:function(){
				"step 0"
				if(target.num('h')==0||player.num('h')==0){
					event.finish();
					return;
				}
				"step 1"
				var sendback=function(){
					if(_status.event!=event){
						return function(){
							event.resultOL=_status.event.resultOL;
						};
					}
				};
				if(player.isOnline()){
					player.wait(sendback);
					event.ol=true;
					player.send(function(){
						game.me.chooseCard(true).set('glow_result',true).ai=function(){
							return Math.random();
						};
						game.resume();
					});
				}
				else{
					event.localPlayer=true;
					player.chooseCard(true).set('glow_result',true).ai=function(){
						return Math.random();
					};
				}
				if(target.isOnline()){
					target.wait(sendback);
					event.ol=true;
					target.send(function(){
						var rand=Math.random()<0.4;
						game.me.chooseCard(true).set('glow_result',true).ai=function(card){
							if(rand) return card.name=='shan'?1:0;
							return card.name=='shan'?0:1;
						};
						game.resume();
					});
				}
				else{
					event.localTarget=true;
				}
				"step 2"
				if(event.localPlayer){
					event.card1=result.cards[0];
				}
				if(event.localTarget){
					var rand=Math.random()<0.4;
					target.chooseCard(true).set('glow_result',true).ai=function(card){
						if(rand) return card.name=='shan'?1:0;
						return card.name=='shan'?0:1;
					};
				}
				"step 3"
				if(event.localTarget){
					event.card2=result.cards[0];
				}
				if(!event.resultOL&&event.ol){
					game.pause();
				}
				"step 4"
				try{
					if(!event.card1) event.card1=event.resultOL[player.playerid].cards[0];
					if(!event.card2) event.card2=event.resultOL[target.playerid].cards[0];
					if(!event.card1||!event.card2){
						throw('err');
					}
				}
				catch(e){
					console.log(e);
					event.finish();
					return;
				}
				if(event.card2.number>=10||event.card2.number<=4){
					if(target.num('h')>2){
						event.addToAI=true;
					}
				}
				game.broadcastAll(function(card1,card2){
					card1.classList.remove('glow');
					card2.classList.remove('glow');
				},event.card1,event.card2);
				"step 5"
				game.broadcastAll(function(){
					ui.arena.classList.add('thrownhighlight');
				});
				game.addVideo('thrownhighlight1');
				player.$compare(event.card1,target,event.card2);
				game.delay(4);
				"step 6"
				game.log(player,'展示了',event.card1);
				game.log(target,'展示了',event.card2);
				var name1=event.card1.name;
				if(player.hp==1&&name1=='shan'){
					name1='sha';
				}
				if(name1=='sha'&&event.card2.name!='shan'){
					player.discard(event.card1).set('animate',false);
					target.$gain2(event.card2);
					var clone=event.card1.clone;
					if(clone){
						clone.style.transition='all 0.5s';
						clone.style.transform='scale(1.2)';
						clone.delete();
						game.addVideo('deletenode',player,get.cardsInfo([clone]));
					}
					game.broadcast(function(card){
						var clone=card.clone;
						if(clone){
							clone.style.transition='all 0.5s';
							clone.style.transform='scale(1.2)';
							clone.delete();
						}
					},event.card1);
					target.damage();
				}
				else if(name1!='sha'&&event.card2.name=='shan'){
					player.discard(event.card1).set('animate',false);
					target.$gain2(event.card2);
					var clone=event.card1.clone;
					if(clone){
						clone.style.transition='all 0.5s';
						clone.style.transform='scale(1.2)';
						clone.delete();
						game.addVideo('deletenode',player,get.cardsInfo([clone]));
					}
					game.broadcast(function(card){
						var clone=card.clone;
						if(clone){
							clone.style.transition='all 0.5s';
							clone.style.transform='scale(1.2)';
							clone.delete();
						}
					},event.card1);
					player.gainPlayerCard(target,true,'he');
				}
				else{
					player.$gain2(event.card1);
					target.$gain2(event.card2);
				}
				game.broadcastAll(function(){
					ui.arena.classList.remove('thrownhighlight');
				});
				game.addVideo('thrownhighlight2');
			},
			ai:{
				order:6,
				result:{
					target:-1,
				}
			}
		},
		zhanjue:{
			audio:2,
			enable:'phaseUse',
			filterCard:true,
			selectCard:-1,
			filter:function(event,player){
				if(!player.num('h')) return false;
				if(player.storage.zhanjue>=2) return false;
				return true;
			},
			prepare:function(cards,player,targets){
				player.$throw(cards);
				player.line(targets);
			},
			discard:false,
			filterTarget:function(card,player,target){
				return player.canUse('juedou',target);
			},
			content:function(){
				targets.sort(lib.sort.seat);
				player.useCard({name:'juedou'},cards,targets,'zhanjue').animate=false;
			},
			group:['zhanjue2','zhanjue3'],
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(player.num('h')>3) return 0;
						if(target.num('h','sha')) return 0;
						if(player.num('h','tao')) return 0;
						return ai.get.effect(target,{name:'juedou'},player,target);
					}
				}
			}
		},
		zhanjue2:{
			audio:false,
			trigger:{player:'phaseBefore'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.storage.zhanjue=0;
			}
		},
		zhanjue3:{
			audio:false,
			trigger:{player:'damageAfter',source:'damageAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.parent.skill=='zhanjue';
			},
			content:function(){
				if(player==trigger.source){
					if(trigger.player.isAlive()){
						game.asyncDraw([player,trigger.player]);
					}
					else{
						player.draw();
					}
					player.storage.zhanjue++;
				}
				else{
					player.draw(2);
					player.storage.zhanjue+=2;
				}
			}
		},
		qinwang:{
			unique:true,
			group:['qinwang1','qinwang2'],
			zhuSkill:true
		},
		qinwang1:{
			audio:2,
			trigger:{player:'chooseToRespondBegin'},
			filter:function(event,player){
				if(event.responded) return false;
				if(!player.hasZhuSkill('qinwang')) return false;
				if(!player.num('he')) return false;
				if(event.filterCard({name:'sha'})==false) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].group=='shu') return true;
				}
				return false;
			},
			direct:true,
			content:function(){
				"step 0"
				var yep=false;
				if(!player.storage.jijianging){
					for(var i=0;i<game.players.length;i++){
						var nh=game.players[i].num('h');
						if(game.players[i].group=='shu'&&ai.get.attitude(game.players[i],player)>1&&(nh>=4||(nh>=3&&game.players[i].num('h','sha')))){
							yep=true;break;
						}
					}
				}
				var next=player.chooseToDiscard(get.prompt('qinwang'),'he');
				next.set('ai',function(card){
					if(_status.event.yep) return 5-ai.get.value(card);
					return 0;
				});
				next.set('yep',yep);
				next.logSkill='qinwang'
				"step 1"
				if(!result.bool){
					event.finish();
				}
				"step 2"
				if(event.current==undefined) event.current=player.next;
				if(event.current==player){
					event.finish();
				}
				else if(event.current.group=='shu'){
					player.storage.jijianging=true;
					var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张杀？',{name:'sha'});
					next.set('ai',function(){
						var event=_status.event;
						return (ai.get.attitude(event.player,event.source)-2);
					});
					next.set('source',player);
					next.autochoose=lib.filter.autoRespondSha;
				}
				else{
					event.current=event.current.next;
					event.redo();
				}
				"step 3"
				player.storage.jijianging=false;
				if(result.bool){
					event.finish();
					trigger.result=result;
					trigger.responded=true;
					trigger.animate=false;
					event.current.draw();
					if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
						event.current.ai.shown+=0.3;
						if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
					}
				}
				else{
					event.current=event.current.next;
					event.goto(2);
				}
			}
		},
		qinwang2:{
			audio:2,
			enable:'chooseToUse',
			filter:function(event,player){
				if(event.filterCard&&!event.filterCard({name:'sha'},player)) return false;
				if(!player.hasZhuSkill('qinwang')) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].group=='shu'&&game.players[i]!=player){
						return lib.filter.cardUsable({name:'sha'},player);
					}
				}
				return false;
			},
			filterCard:true,
			position:'he',
			check:function(card){
				var player=_status.event.player;
				for(var i=0;i<game.players.length;i++){
					var nh=game.players[i].num('h');
					if(game.players[i].group=='shu'&&ai.get.attitude(game.players[i],player)>1&&(nh>=4||(nh>=3&&game.players[i].num('h','sha')))){
						return 5-ai.get.value(card);
					}
				}
				return 0;
			},
			filterTarget:function(card,player,target){
				if(_status.event._backup&&
					typeof _status.event._backup.filterTarget=='function'&&
					!_status.event._backup.filterTarget({name:'sha'},player,target)){
					return false;
				}
				return player.canUse({name:'sha'},target);
			},
			content:function(){
				"step 0"
				if(event.current==undefined) event.current=player.next;
				if(event.current==player){
					player.addSkill('jijiang3');
					event.getParent(2).step=0;
					event.finish();
				}
				else if(event.current.group=='shu'){
					var next=event.current.chooseToRespond('是否替'+get.translation(player)+'对'+get.translation(target)+'使用一张杀',
					function(card){
						var evt=_status.event.getParent();
						return evt.player.canUse(card,evt.target)&&card.name=='sha';
					});
					next.set('ai',function(card){
						var event=_status.event;
						return ai.get.effect(event.target,card,event.source,event.player);
					});
					next.set('source',player);
					next.set('target',target);
					next.autochoose=lib.filter.autoRespondSha;
				}
				else{
					event.current=event.current.next;
					event.redo();
				}
				"step 1"
				if(result.bool){
					event.finish();
					event.current.draw();
					if(result.cards&&result.cards.length==1&&result.cards[0].name=='sha'){
						player.useCard(result.cards[0],target).animate=false;
					}
					else{
						player.useCard({name:'sha'},target).animate=false;
					}
					if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
						event.current.ai.shown+=0.3;
						if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
					}
				}
				else{
					event.current=event.current.next;
					event.goto(0);
				}
			},
			ai:{
				result:{
					target:function(player,target){
						if(player.hasSkill('jijiang3')) return 0;
						return ai.get.effect(target,{name:'sha'},player,target);
					}
				},
				order:function(){
					return lib.card.sha.ai.order-0.1;
				},
			}
		},
		zuoding:{
			trigger:{global:'useCard'},
			filter:function(event,player){
				return !player.hasSkill('zuoding2')&&get.suit(event.card)=='spade'&&
					event.targets&&event.targets.length&&event.player!=player;
			},
			direct:true,
			content:function(){
				'step 0'
				player.chooseTarget(get.prompt('zuoding'),function(card,player,target){
					return _status.event.getTrigger().targets.contains(target);
				}).set('ai',function(target){
					return ai.get.attitude(_status.event.player,target);
				});
				'step 1'
				if(result.bool){
					player.logSkill('zuoding',result.targets);
					result.targets[0].draw();
				}
			},
			ai:{
				expose:0.2
			},
			group:'zuoding3'
		},
		zuoding2:{},
		zuoding3:{
			trigger:{global:'damageEnd'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.addTempSkill('zuoding2','phaseAfter');
			}
		},
		huomo:{
			audio:2,
			trigger:{player:'chooseToRespondBegin'},
			filter:function(event,player){
				if(event.responded) return false;
				if(!event.filterCard({name:'shan'})) return false;
				if(player.hasSkill('huomo2')) return false;
				if(event.parent.name!='sha') return false;
				var hs=player.get('he',{color:'black'});
				for(var i=0;i<hs.length;i++){
					if(get.type(hs[i])!='basic'){
						break;
					}
				}
				if(i==hs.length) return false;
				return true;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseCard(get.prompt('huomo'),'he',function(card){
					return get.type(card)!='basic'&&get.color(card)=='black';
				}).set('ai',function(card){
					if(!_status.event.player.num('h','shan')){
						return 8-ai.get.value(card);
					}
					return 6-ai.get.value(card);
				});
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.responded=true;
					trigger.result={bool:true,card:{name:'shan'}}
					player.lose(result.cards,ui.special);
					player.$throw(result.cards);
					event.card=result.cards[0];
					player.logSkill('huomo');
					player.addTempSkill('huomo2','phaseAfter');
				}
				else{
					event.finish();
				}
				'step 2'
				if(player==game.me&&event.card){
					game.delay();
				}
				'step 3'
				if(event.card){
					ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
				}
			},
			group:['huomo_count','huomo_count2','huomo_sha','huomo_jiu','huomo_tao']
		},
		huomo2:{},
		huomo_count:{
			init:function(player){
				player.storage.huomo={};
			},
			trigger:{global:'phaseBegin'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.storage.huomo={};
			}
		},
		huomo_count2:{
			trigger:{player:'useCard'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				switch(trigger.card.name){
					case 'sha':player.storage.huomo.sha=true;break;
					case 'tao':player.storage.huomo.tao=true;break;
					case 'jiu':player.storage.huomo.jiu=true;break;
				}
			}
		},
		huomo_sha:{
			enable:'phaseUse',
			discard:false,
			prepare:function(cards,player){
				player.$throw(cards);
			},
			filter:function(event,player){
				if(!player.storage.huomo) player.storage.huomo={};
				if(player.storage.huomo.sha) return false;
				if(!lib.filter.filterCard({name:'sha'},player,event)){
					return false;
				}
				var hs=player.get('he',{color:'black'});
				for(var i=0;i<hs.length;i++){
					if(get.type(hs[i])!='basic'){
						break;
					}
				}
				if(i==hs.length) return false;
				for(var i=0;i<game.players.length;i++){
					if(player.canUse('sha',game.players[i])) return true;
				}
				return false;
			},
			position:'he',
			filterCard:function(card){
				return get.type(card)!='basic'&&get.color(card)=='black';
			},
			filterTarget:function(card,player,target){
				return player.canUse('sha',target);
			},
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				game.log(player,'将',cards,'置于牌堆顶');
				ui.cardPile.insertBefore(cards[0],ui.cardPile.firstChild);
				player.useCard({name:'sha'},targets);
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						return ai.get.effect(target,{name:'sha'},player,target);
					}
				}
			}
		},
		huomo_tao:{
			enable:'chooseToUse',
			discard:false,
			prepare:function(cards,player){
				player.$throw(cards);
			},
			filter:function(event,player){
				if(!player.storage.huomo) player.storage.huomo={};
				if(player.storage.huomo.tao) return false;
				var hs=player.get('he',{color:'black'});
				for(var i=0;i<hs.length;i++){
					if(get.type(hs[i])!='basic'){
						break;
					}
				}
				if(i==hs.length) return false;
				if(event.type=='dying'){
					return event.filterCard({name:'tao'},player);
				}
				if(event.getParent().name!='phaseUse') return false;
				if(!lib.filter.filterCard({name:'tao'},player,event)){
					return false;
				}
				return player.hp<player.maxHp;
			},
			position:'he',
			filterCard:function(card){
				return get.type(card)!='basic'&&get.color(card)=='black';
			},
			filterTarget:function(card,player,target){
				if(_status.event.type=='dying'){
					return target==_status.event.dying;
				}
				return player==target;
			},
			selectTarget:-1,
			check:function(card){
				return 8-ai.get.value(card);
			},
			content:function(){
				game.log(player,'将',cards,'置于牌堆顶');
				ui.cardPile.insertBefore(cards[0],ui.cardPile.firstChild);
				player.useCard({name:'tao'},targets).delayx=false;
			},
			ai:{
				skillTagFilter:function(player){
					if(!player.storage.huomo) player.storage.huomo={};
					if(player.storage.huomo.tao) return false;
					var hs=player.get('he',{color:'black'});
					for(var i=0;i<hs.length;i++){
						if(get.type(hs[i])!='basic'){
							return true;
						}
					}
					return false;
				},
				threaten:1.5,
				save:true,
				order:9,
				result:{
					target:function(player,target){
						return ai.get.effect(target,{name:'tao'},player,target);
					}
				}
			}
		},
		huomo_jiu:{
			enable:'chooseToUse',
			discard:false,
			prepare:function(cards,player){
				player.$throw(cards);
			},
			filter:function(event,player){
				if(!lib.filter.filterCard({name:'jiu'},player,event)){
					return false;
				}
				if(player.storage.huomo.jiu) return false;
				var hs=player.get('he',{color:'black'});
				for(var i=0;i<hs.length;i++){
					if(get.type(hs[i])!='basic'){
						break;
					}
				}
				if(i==hs.length) return false;
				if(event.type=='dying'){
					return event.filterCard({name:'jiu'},player);
				}
				if(event.getParent().name!='phaseUse') return false;
				return true;
			},
			position:'he',
			filterCard:function(card){
				return get.type(card)!='basic'&&get.color(card)=='black';
			},
			filterTarget:function(card,player,target){
				if(_status.event.type=='dying'){
					return target==_status.event.dying;
				}
				return player==target;
			},
			selectTarget:-1,
			check:function(card){
				if(_status.event.type=='dying'){
					return 8-ai.get.value(card);
				}
				return 6-ai.get.value(card);
			},
			content:function(){
				game.log(player,'将',cards,'置于牌堆顶');
				ui.cardPile.insertBefore(cards[0],ui.cardPile.firstChild);
				player.useCard({name:'jiu'},targets).delayx=false;
			},
			ai:{
				save:true,
				skillTagFilter:function(player){
					if(!player.storage.huomo) player.storage.huomo={};
					if(player.storage.huomo.jiu) return false;
					if(player.hp>0) return false;
					var hs=player.get('he',{color:'black'});
					for(var i=0;i<hs.length;i++){
						if(get.type(hs[i])!='basic'){
							return true;
						}
					}
					return false;
				},
				order:function(){
					return lib.card.sha.ai.order+0.2;
				},
				result:{
					target:function(player,target){
						return ai.get.effect(target,{name:'jiu'},player,target);
					}
				}
			}
		},
		taoxi:{
			audio:2,
			trigger:{player:'useCardToBegin'},
			filter:function(event,player){
				return _status.currentPhase==player&&event.targets.length==1&&
					event.target.num('h')>0&&!player.hasSkill('taoxi4')&&player!=event.target;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.target)<0;
			},
			intro:{
				content:'card'
			},
			content:function(){
				var card=trigger.target.get('h').randomGet();
				player.showCards([card]);
				player.storage.taoxi=card;
				player.storage.taoxi2=trigger.target;
				player.syncStorage('taoxi');
				player.markSkill('taoxi');
				player.addTempSkill('taoxi4','phaseAfter');
			},
			group:['taoxi2','taoxi3']
		},
		taoxi2:{
			audio:false,
			enable:'phaseUse',
			filter:function(event,player){
				if(player.storage.taoxi&&player.storage.taoxi2&&
					get.owner(player.storage.taoxi)==player.storage.taoxi2&&
					lib.filter.filterCard(player.storage.taoxi,player,event)){
					return true;
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return player.canUse(player.storage.taoxi,target);
			},
			selectTarget:function(){
				return get.select(get.info(_status.event.player.storage.taoxi).selectTarget);
			},
			multitarget:true,
			multiline:true,
			content:function(){
				'step 0'
				var card=player.storage.taoxi;
				if(!card){
					event.finish();
					return;
				}
				var owner=get.owner(card);
				if(owner){
					owner.lose(card,ui.special);
				}
				event.card=card;
				player.$throw(card);
				'step 1'
				player.useCard(event.card,targets).animate=false;
				delete player.storage.taoxi;
				delete player.storage.taoxi2;
				player.unmarkSkill('taoxi');
			},
			ai:{
				order:8,
				result:{
					target:function(player,target){
						return ai.get.effect(target,player.storage.taoxi,player,target);
					},
					player:1
				}
			}
		},
		taoxi3:{
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return player.storage.taoxi?true:false;
			},
			content:function(){
				if(get.owner(player.storage.taoxi)==player.storage.taoxi2&&player.num('he')){
					game.log(player,'发动了','【讨袭】');
					player.popup('taoxi');
					player.chooseToDiscard('he',true);
				}
				delete player.storage.taoxi;
				delete player.storage.taoxi2;
				player.unmarkSkill('taoxi');
			}
		},
		taoxi4:{},
		xingshuai:{
			skillAnimation:true,
			audio:2,
			trigger:{player:'dying'},
			priority:6,
			zhuSkill:true,
			filter:function(event,player){
				if(player.storage.xingshuai) return false;
				if(player.hp>0) return false;
				if(!player.hasZhuSkill('xingshuai')) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].group=='wei') return true;
				}
				return false;
			},
			init:function(player){
				if(player.hasZhuSkill('xingshuai')){
					player.markSkill('xingshuai');
					player.storage.xingshuai=false;
				}
			},
			intro:{
				content:'limited'
			},
			unique:true,
			content:function(){
				'step 0'
				player.storage.xingshuai=true;
				player.unmarkSkill('xingshuai');
				var targets=get.players();
				targets.remove(player);
				event.targets=targets;
				event.damages=[];
				'step 1'
				if(event.targets.length){
					var current=event.targets.shift();
					if(current.group=='wei'){
						current.chooseBool('是否令'+get.translation(player)+'回复一点体力？').set('ai',function(){
							return ai.get.attitude(_status.event.player,_status.event.target)>2;
						}).set('target',player);
						event.current=current;
					}
					else{
						event.redo();
					}
				}
				else{
					event.goto(3);
				}
				'step 2'
				if(result.bool){
					event.damages.push(event.current);
					event.current.line(player,'green');
					game.log(event.current,'令',player,'回复一点体力');
				}
				if(event.targets.length){
					event.goto(1);
				}
				'step 3'
				if(event.damages.length){
					player.recover(event.damages.length);
				}
				'step 4'
				if(event.damages.length){
					event.damages.shift().damage('nosource');
					event.redo();
				}
			}
		},
		mingjian:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player!=target;
			},
			filter:function(event,player){
				return player.num('h')>0;
			},
			filterCard:true,
			selectCard:-1,
			discard:false,
			lose:true,
			content:function(){
				player.$give(cards.length,target);
				target.gain(cards);
				target.addTempSkill('mingjian2',{player:'phaseAfter'});
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(player.num('h')==1&&player.num('h','du')) return -1;
						if(player.hp<=2&&player.num('h','shan')) return 0;
						if(target.num('h')+player.num('h')>target.hp+2) return 0;
						if(ai.get.attitude(player,target)>3) return 1;
						return 0;
					}
				}
			}
		},
		mingjian2:{
			mark:true,
			intro:{
				content:'手牌上限+1，出杀次数+1'
			},
			mod:{
				maxHandcard:function(player,num){
					return num+1;
				},
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num+1;
				}
			},
		},
		mingjian_old:{
			audio:2,
			trigger:{player:'phaseUseBefore'},
			direct:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				'step 0'
				var go=Math.random()<0.5;
				player.chooseTarget(get.prompt('mingjian'),function(card,player,target){
					return player!=target
				}).ai=function(target){
					var att=ai.get.attitude(player,target);
					if(att>3){
						if(player.num('h')>player.hp) return att;
						if(go) return att;
					}
					return 0;
				}
				'step 1'
				if(result.bool){
					player.logSkill('mingjian',result.targets);
					trigger.untrigger();
					trigger.finish();
					var target=result.targets[0];
					target.addSkill('mingjian2');
					var hs=player.get('h');
					target.gain(hs);
					player.$give(hs.length,target);
				}
			}
		},
		mingjian2_old:{
			audio:false,
			trigger:{global:'phaseAfter'},
			forced:true,
			popup:false,
			content:function(){
				if(lib.config.glow_phase){
					if(_status.currentPhase){
						_status.currentPhase.classList.remove('glow_phase');
					}
					player.classList.add('glow_phase');
				}
				game.addVideo('phaseChange',player);
				_status.currentPhase=player;
				player.ai.tempIgnore=[];
				player.stat.push({card:{},skill:{}});
				player.phaseUse();
				player.removeSkill('mingjian2');
			}
		},
		huituo:{
			audio:2,
			trigger:{player:'damageEnd'},
			direct:true,
			content:function(){
				'step 0'
				player.chooseTarget(get.prompt('huituo')).set('ai',function(target){
					var player=_status.event.player;
					if(ai.get.attitude(player,target)>0){
						return ai.get.recoverEffect(target,player,player)+1;
					}
					return 0;
				});
				'step 1'
				if(result.bool){
					player.logSkill('huituo',result.targets);
					var target=result.targets[0];
					event.target=target;
					target.judge(function(card){
						if(target.hp==target.maxHp){
							if(get.color(card)=='red') return 0;
						}
						if(get.color(card)=='red') return 1.5;
						return 1;
					});
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.color){
					if(result.color=='red'){
						if(event.target.hp<event.target.maxHp) event.target.recover();
					}
					else{
						event.target.draw(trigger.num);
					}
				}
			}
		},
		duodao:{
			trigger:{player:'damageEnd'},
			filter:function(event,player){
				return player.num('he')>0&&event.source&&event.source.get('e','1')!=undefined&&
					event.card&&event.card.name=='sha';
			},
			check:function(event,player){
				return ai.get.attitude(player,event.source)<=0;
			},
			direct:true,
			priority:5,
			audio:2,
			content:function(){
				'step 0'
				var next=player.chooseToDiscard('he',get.prompt('duodao'));
				next.logSkill=['duodao',trigger.source];
				next.set('ai',function(card){
					if(ai.get.attitude(_status.event.player,_status.event.getTrigger().source)<0){
						return 6-ai.get.value(card);
					}
					return 0;
				});
				'step 1'
				if(result.bool){
					trigger.source.$give(trigger.source.get('e','1'),player);
					player.gain(trigger.source.get('e','1'));
				}
			},
		},
		anjian:{
			audio:2,
			trigger:{source:'damageBegin'},
			check:function(event,player){
				return ai.get.attitude(player,event.player)<=0;
			},
			forced:true,
			filter:function(event,player){
				return event.card&&event.card.name=='sha'&&get.distance(event.player,player,'attack')>1&&
					event.parent.name!='_lianhuan'&&event.parent.name!='_lianhuan2';
			},
			content:function(){
				trigger.num++;
			}
		},
		xinpojun:{
			trigger:{player:'shaBegin'},
			direct:true,
			filter:function(event,player){
				return event.target.hp>0&&event.target.num('he')>0;
			},
			audio:2,
			content:function(){
				'step 0'
				player.choosePlayerCard(trigger.target,'he',
					[1,Math.min(trigger.target.num('he'),trigger.target.hp)],get.prompt('pojun',trigger.target));
				'step 1'
				if(result.bool&&result.links.length){
					player.logSkill('xinpojun');
					if(trigger.target.storage.xinpojun2){
						trigger.target.storage.xinpojun2=trigger.target.storage.xinpojun2.concat(result.links);
					}
					else{
						trigger.target.storage.xinpojun2=result.links;
					}
					game.addVideo('storage',trigger.target,['xinpojun2',get.cardsInfo(trigger.target.storage.xinpojun2),'cards']);
					trigger.target.addSkill('xinpojun2');
					trigger.target.lose(result.links,ui.special);
				}
			},
			ai:{
				expose:0.2
			}
		},
		xinpojun2:{
			trigger:{global:'phaseEnd'},
			forced:true,
			audio:false,
			mark:true,
			intro:{
				content:'cardCount'
			},
			content:function(){
				if(player.storage.xinpojun2){
					player.gain(player.storage.xinpojun2);
					delete player.storage.xinpojun2;
				}
				player.removeSkill('xinpojun2');
			},
			group:'xinpojun3'
		},
		xinpojun3:{
			trigger:{player:'dieBegin'},
			forced:true,
			popup:false,
			content:function(){
				player.$throw(player.storage.xinpojun2,1000);
				for(var i=0;i<player.storage.xinpojun2.length;i++){
					ui.discardPile.appendChild(player.storage.xinpojun2[i]);
				}
				game.log(player,'弃置了',player.storage.xinpojun2);
				delete player.storage.xinpojun2;
				player.removeSkill('xinpojun2');
			}
		},
		qiaoshi:{
			audio:2,
			trigger:{global:'phaseEnd'},
			filter:function(event,player){
				return event.player!=player&&event.player.num('h')==player.num('h')&&event.player.isAlive();
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>=0;
			},
			priority:-5,
			content:function(){
				game.asyncDraw([trigger.player,player]);
			},
			ai:{
				expose:0.1
			}
		},
		yanyu:{
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h','sha')>0;
			},
			filterCard:{name:'sha'},
			prepare:function(cards,player){
				player.$throw(cards,1000);
			},
			discard:false,
			delay:0.5,
			content:function(){
				"step 0"
				player.draw();
				"step 1"
				for(var i=0;i<cards.length;i++){
					ui.discardPile.appendChild(cards[i]);
				}
			},
			ai:{
				basic:{
					order:1
				},
				result:{
					player:1,
				},
			},
			group:'yanyu2'
		},
		yanyu2:{
			trigger:{player:'phaseUseEnd'},
			direct:true,
			filter:function(event,player){
				return player.getStat().skill.yanyu>=2;
			},
			content:function(){
				'step 0'
				player.chooseTarget(get.prompt('yanyu'),function(card,player,target){
					return target.sex=='male'&&target!=player;
				}).set('ai',function(target){
					return ai.get.attitude(_status.event.player,target);
				});
				'step 1'
				if(result.bool){
					player.logSkill('yanyu',result.targets);
					result.targets[0].draw(2);
				}
			}
		},
		youdi:{
			audio:true,
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return player.num('he')>0;
			},
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('youdi'),function(card,player,target){
					return player!=target;
				}).set('ai',function(target){
					if(target.num('he')==0) return 0;
					return -ai.get.attitude(_status.event.player,target);
				});
				"step 1"
				if(result.bool){
					game.delay();
					player.logSkill('youdi',result.targets);
					event.target=result.targets[0];
					event.target.discardPlayerCard(player,'he',true);
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.links[0].name!='sha'&&event.target.num('he')){
					player.gainPlayerCard('he',event.target,true);
				}
			},
			ai:{
				expose:0.2,
				threaten:1.4
			}
		},
		fuhun:{
			enable:['chooseToUse','chooseToRespond'],
			filterCard:true,
			selectCard:2,
			position:'h',
			audio:2,
			viewAs:{name:'sha'},
			prompt:'将两张手牌当杀使用或打出',
			check:function(card){
				if(_status.event.player.num('h')<4) return 6-ai.get.useful(card);
				return 7-ai.get.useful(card);
			},
			ai:{
				respondSha:true,
				order:function(item,player){
					if(player.hasSkill('wusheng')&&player.hasSkill('paoxiao')){
						return 1;
					}
					if(player.num('h')<4){
						return 1;
					}
					return 4;
				},
			},
			group:'fuhun2'
		},
		fuhun2:{
			trigger:{source:'damageAfter'},
			forced:true,
			filter:function(event){
				return event.getParent().skill=='fuhun';
			},
			content:function(){
				player.addTempSkill('wusheng','phaseAfter');
				player.addTempSkill('paoxiao','phaseAfter');
			}
		},
		fencheng:{
			skillAnimation:'epic',
			animationColor:'fire',
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.fencheng;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			unique:true,
			selectTarget:-1,
			mark:true,
			line:'fire',
			content:function(){
				"step 0"
				player.storage.fencheng=true;
				player.unmarkSkill('fencheng');
				var res=ai.get.damageEffect(target,player,target,'fire');
				var num=Math.max(1,target.num('e'));
				target.chooseToDiscard(num,'he','弃置'+get.cnNumber(num)+'张牌或受到1点火焰伤害').set('ai',function(card){
					var res=_status.event.res;
					var num=_status.event.num;
					var player=_status.event.player;
					if(res>=0) return -1;
					if(num>2&&player.hp>1) return -1;
					if(num>1&&player.hp>2) return -1;
					if(get.position(card)=='e'){
						return 10-ai.get.value(card);
					}
					return 6-ai.get.value(card);
				}).set('res',res).set('num',num);
				"step 1"
				if(!result.bool){
					target.damage('fire');
				}
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(player!=game.players[i]&&ai.get.damageEffect(game.players[i],player,game.players[i],'fire')<0){
								var att=ai.get.attitude(player,game.players[i]);
								if(att>0){
									num-=Math.max(1,game.players[i].num('e'));
								}
								else if(att<0){
									num+=Math.max(1,game.players[i].num('e'));
								}
							}
						}
						if(game.players.length<5){
							return num-1;
						}
						else{
							return num-2;
						}
					}
				}
			},
			init:function(player){
				player.storage.fencheng=false;
			},
			intro:{
				content:'limited'
			}
		},
		mieji:{
			trigger:{player:'useCardBegin'},
			direct:true,
			audio:2,
			filter:function(event,player){
				return event.targets.length==1&&get.type(event.card)=='trick'&&get.color(event.card)=='black';
			},
			position:'he',
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('mieji'),function(card,player,target){
					var trigger=_status.event.getTrigger();
					return lib.filter.filterTarget(trigger.card,player,target)&&target!=trigger.targets[0];
				}).set('ai',function(target){
					var trigger=_status.event.getTrigger();
					var player=_status.event.player;
					return ai.get.effect(target,trigger.card,player,player);
				});
				"step 1"
				if(result.bool){
					trigger.targets.push(result.targets[0]);
					player.logSkill('mieji',result.targets);
				}
			}
		},
		junxing:{
			enable:'phaseUse',
			audio:2,
			usable:1,
			filterCard:true,
			selectCard:[1,Infinity],
			filter:function(event,player){
				return player.num('h')>0;
			},
			check:function(card){
				if(ui.selected.cards.length) return -1;
				var val=ai.get.value(card);
				if(get.type(card)=='basic') return 8-ai.get.value(card);
				return 5-ai.get.value(card);
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			content:function(){
				"step 0"
				var types=[];
				for(var i=0;i<cards.length;i++){
					types.add(get.type(cards[i],'trick'));
				}
				target.chooseToDiscard(function(card){
					return !_status.event.types.contains(get.type(card,'trick'));
				}).set('ai',function(card){
					if(_status.event.player.isTurnedOver()) return -1;
					return 8-ai.get.value(card);
				}).set('types',types).set('dialog',['弃置一张与'+get.translation(player)+'弃置的牌类别均不同的牌，或将武将牌翻面','hidden',cards]);
				"step 1"
				if(!result.bool){
					target.turnOver();
					target.draw(cards.length);
				}
			},
			ai:{
				order:2,
				expose:0.3,
				threaten:1.8,
				result:{
					target:function(player,target){
						if(target.isTurnedOver()) return 2;
						return -1/(target.num('h')+1);
					}
				}
			}
		},
		juece:{
			audio:2,
			trigger:{global:'loseEnd'},
			check:function(event,player){
				return ai.get.damageEffect(event.player,player,player)>0;
			},
			filter:function(event,player){
				if(event.player.num('h')) return false;
				if(_status.currentPhase!=player) return false;
				if(event.player==player) return false;
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original=='h') return true;
				}
				return false;
			},
			content:function(){
				player.line(trigger.player,'green');
				trigger.player.damage();
			},
			ai:{
				threaten:1.1
			}
		},
		jiefan:{
			skillAnimation:true,
			audio:2,
			unique:true,
			mark:true,
			init:function(player){
				player.storage.jiefan=false;
			},
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.jiefan;
			},
			intro:{
				content:'limited'
			},
			filterTarget:true,
			content:function(){
				"step 0"
				player.unmarkSkill('jiefan');
				player.storage.jiefan=true;
				event.players=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=target&&get.distance(game.players[i],target,'attack')<=1){
						event.players.push(game.players[i]);
					}
				}
				lib.tempSortSeat=target;
				event.players.sort(lib.sort.seat);
				delete lib.tempSortSeat;
				"step 1"
				if(event.players.length){
					event.current=event.players.shift();
					event.current.animate('target');
					if(event.current.num('he')&&target.isAlive()){
						event.current.chooseToDiscard({subtype:'equip1'},'he','弃置一张武器牌或让'+
						get.translation(target)+'摸一张牌').set('ai',function(card){
							if(ai.get.attitude(_status.event.player,_status.event.target)<0) return 7-ai.get.value(card);
							return -1;
						}).set('target',target);
						event.tempbool=false;
					}
					else{
						event.tempbool=true;
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.tempbool||result.bool==false){
					target.draw();
				}
				event.goto(1);
			},
			ai:{
				order:5,
				result:{
					target:function(player,target){
						if(player.hp>2){
							if(game.phaseNumber<game.players.length*2) return 0;
						}
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&get.distance(game.players[i],target,'attack')<=1){
								num++;
							}
						}
						return num;
					}
				}
			}
		},
		fuli:{
			skillAnimation:true,
			audio:2,
			unique:true,
			enable:'chooseToUse',
			init:function(player){
				player.storage.fuli=false;
			},
			mark:true,
			filter:function(event,player){
				if(event.type!='dying') return false;
				if(player!=event.dying) return false;
				if(player.storage.fuli) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.unmarkSkill('fuli');
				player.recover(player.maxHp);
				"step 1"
				player.turnOver();
				player.storage.fuli=true;
			},
			ai:{
				save:true,
				result:{
					player:10
				},
				threaten:function(player,target){
					if(!target.storage.fuli) return 0.9;
				}
			},
			intro:{
				content:'limited'
			}
		},
		qianxi:{
			audio:2,
			trigger:{player:'phaseBegin'},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				})
				"step 1"
				event.color=result.color;
				player.chooseTarget(function(card,player,target){
					return player!=target&&get.distance(player,target)<=1;
				},true).set('ai',function(target){
					return -ai.get.attitude(_status.event.player,target);
				});
				"step 2"
				if(result.bool&&result.targets.length){
					result.targets[0].storage.qianxi2=event.color;
					result.targets[0].addSkill('qianxi2');
					player.line(result.targets,'green');
					game.addVideo('storage',result.targets[0],['qianxi2',event.color]);
				}
			},
		},
		qianxi2:{
			trigger:{global:'phaseAfter'},
			forced:true,
			mark:true,
			audio:false,
			content:function(){
				player.removeSkill('qianxi2');
				delete player.storage.qianxi2;
			},
			mod:{
				cardEnabled:function(card,player){
					if(get.color(card)==player.storage.qianxi2) return false;
				},
				cardUsable:function(card,player){
					if(get.color(card)==player.storage.qianxi2) return false;
				},
				cardRespondable:function(card,player){
					if(get.color(card)==player.storage.qianxi2) return false;
				},
				cardSavable:function(card,player){
					if(get.color(card)==player.storage.qianxi2) return false;
				}
			},
			intro:{
				content:function(color){
					return '不能使用或打出'+get.translation(color)+'的手牌';
				}
			}
		},
		zhiman:{
			audio:2,
			trigger:{source:'damageBefore'},
			check:function(event,player){
				if(ai.get.damageEffect(event.player,player,player)<0) return true;
				var att=ai.get.attitude(player,event.player);
				if(att>0&&event.player.num('j')) return true;
				if(event.num>1){
					if(att<0) return false;
					if(att>0) return true;
				}
				var cards=event.player.get('e');
				for(var i=0;i<cards.length;i++){
					if(ai.get.equipValue(cards[i])>=6) return true;
				}
				return false;
			},
			content:function(){
				if(trigger.player.num('ej')){
					player.gainPlayerCard(trigger.player,'ej',true);
				}
				trigger.untrigger();
				trigger.finish();
			}
		},
		sanyao:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hp>target.hp) return false;
				}
				return true;
			},
			check:function(card){return 7-ai.get.value(card);},
			position:'he',
			filterCard:true,
			content:function(){
				target.damage();
			},
			ai:{
				result:{
					target:function(player,target){
						if(target.num('j')&&ai.get.attitude(player,target)>0){
							return 1;
						}
						if(target.num('e')){
							return -1;
						}
						return ai.get.damageEffect(target,player);
					},
				},
				order:7
			}
		},
		qiaoshui:{
			audio:2,
			trigger:{player:'phaseUseBegin'},
			direct:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('qiaoshui'),function(card,player,target){
					return player!=target&&target.num('h')>0;
				}).set('ai',function(target){
					return -ai.get.attitude(_status.event.player,target)/target.num('h');
				});
				"step 1"
				if(result.bool){
					player.logSkill('qiaoshui',result.targets[0]);
					player.chooseToCompare(result.targets[0]);
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.gain(result.target,'gain2');
					player.addTempSkill('qiaoshui3','phaseAfter');
				}
				else{
					player.gain(result.player,'gain2');
					player.addTempSkill('qiaoshui2','phaseAfter');
				}
			},
			ai:{
				expose:0.1
			}
		},
		qiaoshui2:{
			mod:{
				cardEnabled:function(card){
					if(get.type(card,'trick')=='trick') return false;
				}
			}
		},
		qiaoshui3:{
			trigger:{player:'useCard'},
			forced:true,
			popup:false,
			filter:function(event,player){
				var type=get.type(event.card);
				return type=='basic'||type=='trick';
			},
			content:function(){
				'step 0'
				player.removeSkill('qiaoshui3');
				var goon=false;
				var info=get.info(trigger.card);
				if(trigger.targets&&!info.multitarget){
					for(var i=0;i<game.players.length;i++){
						if(lib.filter.targetEnabled2(trigger.card,player,game.players[i])&&!trigger.targets.contains(game.players[i])){
							goon=true;break;
						}
					}
				}
				if(goon){
					player.chooseTarget('巧说：是否额外指定一名'+get.translation(trigger.card)+'的目标？',function(card,player,target){
						var trigger=_status.event.getTrigger();
						if(trigger.targets.contains(target)) return false;
						return lib.filter.targetEnabled2(trigger.card,_status.event.player,target);
					}).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return ai.get.effect(target,trigger.card,player,player);
					});
				}
				'step 1'
				if(result.bool){
					game.delay(0.5);
					event.target=result.targets[0];
				}
				else{
					event.finish();
				}
				'step 2'
				if(event.target){
					player.logSkill('qiaoshui',event.target);
					trigger.targets.add(event.target);
				}
			}
		},
		jyzongshi:{
			audio:2,
			trigger:{target:'useCardToBegin'},
			filter:function(event,player){
				if(event.targets&&event.targets.length>1) return false;
				return event.card&&get.type(event.card)=='trick'&&event.player!=player;
			},
			frequent:true,
			content:function(){
				player.draw();
			},
			ai:{
				effect:function(card,player,target){
					if(get.type(card)=='trick') return [1,1];
				},
			}
		},
		shenxing:{
			audio:2,
			enable:'phaseUse',
			position:'he',
			filterCard:true,
			selectCard:2,
			prompt:'弃置任意张牌并摸等量的牌',
			check:function(card){return 4-ai.get.useful(card)},
			content:function(){
				player.draw();
			},
			ai:{
				order:1,
				result:{
					player:1
				},
			},
		},
		bingyi:{
			audio:2,
			trigger:{player:'phaseDiscardEnd'},
			filter:function(event,player){
				var cards=player.get('h');
				if(cards.length<1) return false;
				var color=get.color(cards[0]);
				for(var i=1;i<cards.length;i++){
					if(get.color(cards[i])!=color) return false;
				}
				return true;
			},
			content:function(){
				"step 0"
				player.showHandcards();
				"step 1"
				var num=player.num('h');
				player.chooseTarget('选择至多'+num+'名角色各摸一张牌',[1,num],function(card,player,target){
					return true;
				}).set('ai',function(target){
					return ai.get.attitude(_status.event.player,target);
				});
				"step 2"
				if(result.bool){
					player.line(result.targets,'green');
					game.asyncDraw(result.targets);
				}
			},
			ai:{
				expose:0.1,
			}
		},
		xiantu:{
			unique:true,
			audio:2,
			gainnable:true,
			forceunique:true,
			trigger:{global:'phaseUseBegin'},
			filter:function(event,player){
				return event.player!=player;
			},
			logTarget:'player',
			check:function(event,player){
				if(ai.get.attitude(player,event.player)<5) return false;
				if(player.maxHp-player.hp>=2) return false;
				if(player.hp==1) return false;
				if(player.hp==2&&player.num('h')<2) return false;
				if(event.player.num('h')>=event.player.hp) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.draw(2);
				"step 1"
				player.chooseCard(2,'he',true,'交给'+get.translation(trigger.player)+'两张牌').set('ai',function(card){
					if(ui.selected.cards.length&&card.name==ui.selected.cards[0].name) return -1;
					if(get.tag(card,'damage')) return 1;
					if(get.type(card)=='equip') return 1;
					return 0;
				});
				"step 2"
				trigger.player.gain(result.cards);
				if(player==game.me||trigger.player==game.me)
				player.$give(result.cards,trigger.player);
				else
				player.$give(2,trigger.player);
				game.delay();
				trigger.player.addSkill('xiantu2');
				trigger.player.storage.xiantu=player;
			},
			ai:{
				threaten:1.1,
				expose:0.3
			}
		},
		xiantu2:{
			trigger:{player:'phaseUseEnd'},
			forced:true,
			audio:false,
			content:function(){
				if(player.storage.xiantu){
					player.storage.xiantu.loseHp();
					delete player.storage.xiantu;
				}
				player.removeSkill('xiantu2');
			},
			group:'xiantu3'
		},
		xiantu3:{
			trigger:{source:'dieAfter'},
			forced:true,
			audio:false,
			content:function(){
				delete player.storage.xiantu;
				player.removeSkill('xiantu2');
			}
		},
		qiangzhi:{
			audio:2,
			trigger:{player:'phaseUseBegin'},
			direct:true,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('h')>0;
			},
			content:function(){
				'step 0'
				player.chooseTarget(get.prompt('qiangzhi'),function(card,player,target){
					return target!=player&&target.num('h')>0;
				}).set('ai',function(){
					return Math.random();
				});
				'step 1'
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('qiangzhi',target);
					var card=target.get('h').randomGet();
					player.showCards(card);
					player.storage.qiangzhi=get.type(card,'trick');
					game.addVideo('storage',player,['qiangzhi',player.storage.qiangzhi]);
					player.markSkill('qiangzhi');
				}
			},
			intro:{
				content:function(type){
					return get.translation(type)+'牌';
				}
			},
			group:['qiangzhi2','qiangzhi3'],
			ai:{
				order:11,
				result:{
					player:1
				}
			}
		},
		qiangzhi2:{
			trigger:{player:'useCard'},
			frequent:true,
			filter:function(event,player){
				// return (get.type(event.card,'trick')==player.storage.qiangzhi&&event.cards[0]&&event.cards[0]==event.card);
				return get.type(event.card,'trick')==player.storage.qiangzhi;
			},
			content:function(){
				player.draw();
			},
			ai:{
				threaten:1.4
			}
		},
		qiangzhi3:{
			trigger:{player:'phaseUseEnd'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				delete player.storage.qiangzhi;
				player.unmarkSkill('qiangzhi');
			}
		},
		dingpin:{
			enable:'phaseUse',
			usable:3,
			audio:2,
			filter:function(event,player){
				return player.num('h')>0;
			},
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp&&!target.tempSkills.dingpin2;
			},
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				"step 0"
				target.judge(function(card){
					return get.color(card)=='black'?1:-1;
				});
				"step 1"
				if(result.bool){
					target.draw(target.maxHp-target.hp);
					target.addTempSkill('dingpin2','phaseAfter');
				}
				else{
					player.turnOver();
				}
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(player.isTurnedOver()) return 1;
						if(target.hp<target.maxHp-1) return 1;
						return 0;
					}
				}
			}
		},
		dingpin2:{},
		faen:{
			audio:2,
			trigger:{global:['turnOverAfter','linkAfter']},
			filter:function(event,player){
				if(event.name=='link') return event.player.isLinked();
				return true;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>0;
			},
			content:function(){
				player.line(trigger.player,'green');
				trigger.player.draw();
			},
			ai:{
				expose:0.2
			}
		},
		jiaojin:{
			audio:2,
			trigger:{player:'damageBegin'},
			filter:function(event,player){
				return player.num('he',{type:'equip'})&&event.source&&event.source.sex=='male';
			},
			direct:true,
			content:function(){
				"step 0"
				var next=player.chooseToDiscard('he','骄矜：是否弃置一张装备牌令伤害-1？',function(card,player){
					return get.type(card)=='equip';
				});
				next.set('ai',function(card){
					var player=_status.event.player;
					if(player.hp==1||_status.event.getTrigger().num>1){
						return 9-ai.get.value(card);
					}
					if(player.hp==2){
						return 8-ai.get.value(card);
					}
					return 7-ai.get.value(card);
				});
				next.logSkill='jiaojin';
				"step 1"
				if(result.bool){
					game.delay(0.5);
					trigger.num--;
				}
			}
		},
		chanhui:{
			audio:2,
			trigger:{player:'useCard'},
			filter:function(event,player){
				if(_status.currentPhase!=player) return false;
				if(player.hasSkill('chanhui2')) return false;
				if(event.targets.length>1) return false;
				var card=event.card;
				if(card.name=='sha') return true;
				if(get.color(card)=='black'&&get.type(card)=='trick') return true;
				return false;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('chanhui'),function(card,player,target){
					if(player==target) return false;
					var trigger=_status.event.getTrigger();
					return player.canUse(trigger.card,target)&&trigger.targets.contains(target)==false;
				}).set('ai',function(target){
					var trigger=_status.event.getTrigger();
					var player=_status.event.player;
					return ai.get.effect(target,trigger.card,player,player)+1;
				});
				"step 1"
				if(result.bool){
					game.delay(0,200);
					event.target=result.targets[0];
				}
				else{
					event.finish();
				}
				"step 2"
				game.delay();
				player.addSkill('chanhui2');
				player.logSkill('chanhui',event.target);
				event.target.chooseCard('交给'+get.translation(player)+'一张手牌，或成为'+
				get.translation(trigger.card)+'的额外目标').set('ai',function(card){
					return 5-ai.get.value(card);
				});
				"step 3"
				if(result.bool){
					player.gain(result.cards);
					event.target.$give(1,player);
					game.delay();
					trigger.untrigger();
					trigger.player=event.target;
					trigger.trigger('useCard');
					game.log(event.target,'成为了',trigger.card,'的使用者');
				}
				else{
					game.log(event.target,'成为了',trigger.card,'的额外目标');
					trigger.targets.push(event.target);
				}
			}
		},
		chanhui2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			audio:false,
			content:function(){
				player.removeSkill('chanhui2');
			}
		},
		quanji:{
			audio:2,
			trigger:{player:'damageEnd'},
			frequent:true,
			locked:false,
			init:function(player){
				player.storage.quanji=[];
			},
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				"step 0"
				player.draw(trigger.num);
				"step 1"
				if(player.num('he')){
					player.chooseCard('将'+get.cnNumber(trigger.num)+'张手牌置于武将牌上作为“权”',trigger.num,true);
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.cards&&result.cards.length){
					player.lose(result.cards,ui.special);
					player.storage.quanji=player.storage.quanji.concat(result.cards);
					player.syncStorage('quanji');
					player.markSkill('quanji');
					game.log(player,'将',result.cards,'置于武将牌上作为“权”');
				}
			},
			intro:{
				content:'cards'
			},
			mod:{
				maxHandcard:function(player,num){
					return num+player.storage.quanji.length;
				}
			},
			ai:{
				maixie:true,
				threaten:0.8,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.hasSkill('jueqing')) return [1,-2];
							var hasfriend=false;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
									hasfriend=true;break;
								}
							}
							if(!hasfriend) return;
							if(target.hp>=4) return [0.5,get.tag(card,'damage')*2];
							if(!target.hasSkill('paiyi')&&target.hp>1) return [0.5,get.tag(card,'damage')*1.5];
							if(target.hp==3) return [0.5,get.tag(card,'damage')*1.5];
							if(target.hp==2) return [1,get.tag(card,'damage')*0.5];
						}
					}
				}
			}
		},
		zili:{
			skillAnimation:true,
			audio:3,
			unique:true,
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return !player.hasSkill('paiyi')&&player.storage.quanji&&player.storage.quanji.length>=3;
			},
			content:function(){
				"step 0"
				player.chooseControl('recover_hp','draw_card',function(event,player){
					if(player.hp>=2) return 'draw_card';
					return 'recover_hp';
				});
				"step 1"
				if(result.control=='draw_card'){
					player.draw(2);
				}
				else{
					player.recover();
				}
				"step 2"
				player.loseMaxHp();
				player.addSkill('paiyi');
			}
		},
		paiyi:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			filterTarget:true,
			filter:function(event,player){
				return player.storage.quanji.length>0;
			},
			content:function(){
				"step 0"
				player.chooseCardButton(player.storage.quanji,true);
				"step 1"
				var card=result.links[0];
				player.discard(card);
				player.storage.quanji.remove(card);
				if(!player.storage.quanji.length){
					player.unmarkSkill('quanji');
				}
				else{
					player.markSkill('quanji');
				}
				player.syncStorage('quanji');
				"step 2"
				target.draw(2);
				"step 3"
				if(target.num('h')>player.num('h')){
					target.damage();
				}
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(player!=target) return 0;
						if(player.num('h')+2<=player.hp+player.storage.quanji.length) return 1;
						return 0;
					}
				}
			}
		},
		xianzhou:{
			skillAnimation:true,
			audio:2,
			unique:true,
			enable:'phaseUse',
			filter:function(event,player){
				return !player.storage.xianzhou&&player.num('e')>0;
			},
			init:function(player){
				player.storage.xianzhou=false;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			mark:true,
			content:function(){
				"step 0"
				player.unmarkSkill('xianzhou');
				var cards=player.get('e');
				target.gain(cards);
				event.num=cards.length;
				player.$give(cards,target);
				player.storage.xianzhou=true;
				game.delay();
				"step 1"
				target.chooseTarget([1,event.num],'令'+get.translation(player)+'回复'+
					event.num+'点体力，或对攻击范围内的'+event.num+'名角色造成一点伤害',function(card,player,target2){
					return get.distance(_status.event.player,target2,'attack')<=1;
				}).set('ai',function(target2){
					var target=_status.event.player;
					var player=_status.event.getParent().player;
					if(ai.get.attitude(target,player)>0){
						if(player.hp+event.num<=player.maxHp||player.hp==1) return -1;
					}
					return ai.get.damageEffect(target2,target,target);
				});
				"step 2"
				if(result.bool){
					target.line(result.targets,'green');
					event.targets=result.targets;
					event.num2=0;
				}
				else{
					player.recover(event.num);
					event.finish();
				}
				"step 3"
				if(event.num2<event.targets.length){
					event.targets[event.num2].damage(target);
					event.num2++;
					event.redo();
				}
			},
			intro:{
				content:'limited'
			},
			ai:{
				order:1,
				result:{
					target:1,
					player:function(player){
						var bool=true;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>2&&ai.get.attitude(game.players[i],player)>2 ){
								bool=false;break;
							}
						}
						if(bool) return -10;
						if(player.hp==1) return 1;
						if(game.phaseNumber<game.players.length) return -10;
						if(player.num('e')+player.hp<=player.maxHp) return 1;
						return -10;
					}
				},
			}
		},
		qieting:{
			audio:2,
			global:'qieting2',
			globalSilent:true,
			trigger:{global:'phaseEnd'},
			filter:function(event,player){
				return event.player!=player&&!event.player.tempSkills.qieting3&&event.player.isAlive();
			},
			frequent:true,
			content:function(){
				"step 0"
				if(trigger.player.num('e')){
					player.choosePlayerCard(trigger.player,'e','选择装备一张装备牌，或摸一张牌');
				}
				"step 1"
				if(result&&result.links&&result.links.length){
					game.delay(2);
					trigger.player.$give(result.links[0],player);
					player.equip(result.links[0]);
				}
				else{
					player.draw();
				}
			},
			ai:{
				expose:0.1
			}
		},
		qieting2:{
			trigger:{player:'useCard'},
			filter:function(event,player){
				return _status.currentPhase==player&&event.targets&&(event.targets.length>1||event.targets[0]!=player);
			},
			forced:true,
			popup:false,
			content:function(){
				player.addTempSkill('qieting3','phaseAfter');
			}
		},
		qieting3:{},
		zhuikong:{
			audio:2,
			trigger:{global:'phaseBegin'},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)<-2){
					var cards=player.get('h');
					if(cards.length>player.hp) return true;
					for(var i=0;i<cards.length;i++){
						var useful=ai.get.useful(cards[i]);
						if(useful<5) return true;
						if(cards[i].number>9&&useful<7) return true;
					}
				}
				return false;
			},
			logTarget:'player',
			filter:function(event,player){
				return player.hp<player.maxHp&&event.player!=player&&
					player.num('h')>0&&event.player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(trigger.player);
				"step 1"
				if(result.bool){
					trigger.player.addTempSkill('zishou2','phaseAfter');
				}
			},
		},
		qiuyuan:{
			audio:2,
			trigger:{target:'shaBefore'},
			direct:true,
			priority:11,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('qiuyuan'),function(card,player,target){
					return target!=player&&_status.event.getTrigger().player.canUse('sha',target,false);
				}).set('ai',function(target){
					var trigger=_status.event.getTrigger();
					var player=_status.event.player;
					return ai.get.effect(target,trigger.card,trigger.player,player)+0.1;
				});
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('qiuyuan',target);
					event.target=target;
					target.chooseCard({name:'shan'},'交给'+get.translation(player)+
					'一张闪，或成为此杀的额外目标').set('ai',function(card){
						return ai.get.attitude(target,_status.event.source)>=0?1:-1;
					}).set('source',player);
					game.delay();
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.gain(result.cards);
					event.target.$give(result.cards,player);
					game.delay();
				}
				else{
					trigger.targets.push(event.target);
					game.log(event.target,'成为了额外目标');
				}
			},
			ai:{
				expose:0.2,
				effect:{
					target:function(card,player,target){
						if(card.name!='sha') return;
						for(var i=0;i<game.players.length;i++){
							var target2=game.players[i];
							if(player!=target2&&target!=target2&&player.canUse(card,target2,false)&&
								ai.get.effect(target2,{name:'shacopy',nature:card.nature,suit:card.suit},player,target)<0){
								if(target.hp==target.maxHp) return [0,1];
								return [0,0];
							}
						}
					}
				}
			}
		},
		gongji:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			position:'he',
			filterCard:true,
			check:function(card){
				if(get.type(card)!='equip') return 0;
				var player=_status.currentPhase;
				if(player.num('he',{subtype:get.subtype(card)})>1){
					return 11-ai.get.equipValue(card);
				}
				return 6-ai.get.equipValue(card);
			},
			content:function(){
				"step 0"
				player.addTempSkill('gongji2','phaseAfter');
				"step 1"
				if(get.type(cards[0])=='equip'){
					player.chooseTarget('是否弃置一名角色的一张牌？',function(card,player,target){
						return player!=target&&target.num('he')>0;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(ai.get.attitude(player,target)<0){
							return Math.max(0.5,ai.get.effect(target,{name:'sha'},player,player));
						}
						return 0;
					});
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.line(result.targets,'green');
					event.target=result.targets[0];
					player.discardPlayerCard(event.target,'he',true).ai=ai.get.buttonValue;
				}
			},
			ai:{
				order:9,
				result:{
					player:1
				}
			}
		},
		gongji2:{
			mod:{
				attackFrom:function(){
					return -Infinity;
				},
			},
		},
		zhuiyi:{
			audio:2,
			trigger:{player:'dieBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('zhuiyi'),function(card,player,target){
					return player!=target&&_status.event.source!=target;
				}).set('ai',function(target){
					var num=ai.get.attitude(_status.event.player,target);
					if(num>0){
						if(target.hp==1){
							num+=2;
						}
						if(target.hp<target.maxHp){
							num+=2;
						}
					}
					return num;
				}).set('source',trigger.source);
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('zhuiyi',target);
					target.recover();
					target.draw(3);
				}
			},
			ai:{
				expose:0.5,
			}
		},
		anxu:{
			enable:'phaseUse',
			usable:1,
			multitarget:true,
			audio:2,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				var num=target.num('h');
				if(ui.selected.targets.length){
					return num<ui.selected.targets[0].num('h');
				}
				for(var i=0;i<game.players.length;i++){
					if(num>game.players[i].num('h')) return true;
				}
				return false;
			},
			selectTarget:2,
			content:function(){
				'step 0'
				var gainner,giver;
				if(targets[0].num('h')<targets[1].num('h')){
					gainner=targets[0];
					giver=targets[1];
				}
				else{
					gainner=targets[1];
					giver=targets[0];
				}
				giver.chooseCard('选择一张手牌交给'+get.translation(gainner),true);
				event.gainner=gainner;
				event.giver=giver;
				'step 1'
				var card=result.cards[0];
				event.gainner.gain(card,'give');
				event.giver.$give(1,event.gainner);
				'step 2'
				if(event.gainner.num('h')==event.giver.num('h')){
					if(player.hp<player.maxHp){
						player.chooseControl('draw_card','recover_hp',function(event,player){
							if(player.hp>=3&&player.num('h')<player.hp) return 'draw_card';
							return 'recover_hp';
						});
					}
					else{
						player.draw();
						event.finish();
					}
				}
				else{
					event.finish();
				}
				'step 3'
				if(result.control=='draw_card'){
					player.draw();
				}
				else{
					player.recover();
				}
			},
			ai:{
				order:10.5,
				threaten:2,
				result:{
					target:function(player,target){
						var num=target.num('h');
						var att=ai.get.attitude(player,target);
						if(ui.selected.targets.length==0){
							if(att>0) return -1;
							for(var i=0;i<game.players.length;i++){
								var num2=game.players[i].num('h');
								var att2=ai.get.attitude(player,game.players[i]);
								if(att2>=0&&num2<num) return -1;
							}
							return 0;
						}
						else{
							return 1;
						}
					},
					player:0.1
				}
			}
		},
		mingce:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			position:'he',
			filterCard:function(card){
				return card.name=='sha'||get.type(card)=='equip';
			},
			check:function(card){return 8-ai.get.value(card)},
			selectTarget:2,
			multitarget:true,
			discard:false,
			targetprompt:['得到牌','出杀目标'],
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
				player.line2(targets);
			},
			filterTarget:function(card,player,target){
				if(ui.selected.targets.length==0){
					return player!=target;
				}
				else{
					return lib.filter.filterTarget({name:'sha'},ui.selected.targets[0],target);
				}
			},
			content:function(){
				"step 0"
				targets[0].gain(cards);
				game.delay(2);
				"step 1"
				targets[0].chooseControl('draw_card','出杀').set('ai',function(){
					var event=_status.event;
					if(ai.get.effect(event.target,{name:'sha'},event.player,event.player)>0){
						return 1;
					}
					return 0;
				}).set(target,targets[1]).set('prompt','对'+get.translation(targets[1])+'使用一张杀，或摸一张牌');
				"step 2"
				if(result.control=='draw_card'){
					targets[0].draw();
				}
				else{
					targets[0].useCard({name:'sha'},targets[1]);
				}
			},
			ai:{
				result:{
					player:function(player){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>1&&ai.get.attitude(game.players[i],player)>1){
								return 1;
							}
						}
						return 0;
					},
					target:function(player,target){
						if(ui.selected.targets.length){
							return -0.1;
						}
						return 1;
					}
				},
				order:8.5,
				expose:0.2
			}
		},
		xinxuanhuo:{
			audio:2,
			trigger:{player:'phaseDrawBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('xinxuanhuo'),function(card,player,target){
					return player!=target;
				}).set('ai',function(target){
					var att=ai.get.attitude(_status.event.player,target);
					if(att>0){
						if(target.num('h')<target.hp) att+=2;
						return att-target.num('h')/3;
					}
					else{
						return -1;
					}
				});
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.finish();
					player.logSkill('xinxuanhuo',result.targets);
					event.target=result.targets[0];
					event.target.draw(2);
					player.chooseTarget('选择出杀的目标',true,function(card,player,target){
						return _status.event.target.canUse('sha',target)&&player!=target;
					}).set('ai',function(target){
						return ai.get.effect(target,{name:'sha'},_status.event.target,_status.event.player);
					}).set('target',event.target);
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool&&result.targets.length){
					game.log(player,'指定的出杀目标为',result.targets);
					event.target.line(result.targets);
					event.target.chooseToUse('对'+get.translation(result.targets)+'使用一张杀，或令'+get.translation(player)+'获得你的两张牌',{name:'sha'},result.targets[0],-1);
				}
				else{
					event.bool=true;
				}
				"step 3"
				if(event.bool||result.bool==false){
					player.gainPlayerCard('he',event.target,Math.min(2,event.target.num('he')),true);
					event.target.draw();
				}
				else{
					player.draw();
				}
			},
			ai:{
				expose:0.2
			}
		},
		zhichi:{
			audio:2,
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return _status.currentPhase!=player;
			},
			content:function(){
				player.addTempSkill('zhichi2',['phaseAfter','phaseBefore']);
			}
		},
		zhichi2:{
			trigger:{target:'useCardToBefore'},
			forced:true,
			priority:15,
			filter:function(event,player){
				return get.type(event.card)=='trick'||event.card.name=='sha';
			},
			content:function(){
				game.log(player,'发动了智迟，',trigger.card,'对',trigger.target,'失效')
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='trick'||card.name=='sha') return [0,0,0,0];
					}
				}
			}
		},
		zongxuan:{
			audio:2,
			trigger:{player:'discardAfter'},
			filter:function(event,player){
				for(var i=0;i<event.cards.length;i++){
					if(get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			frequent:true,
			popup:false,
			content:function(){
				"step 0"
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					if(get.position(trigger.cards[i])=='d'){
						cards.push(trigger.cards[i]);
					}
				}
				player.chooseCardButton(cards,[1,cards.length],'纵玄：将弃置的牌按任意顺序置于牌堆顶（先选择的在上）').set('ai',function(){
					return -1;
				});
				"step 1"
				if(result&&result.bool&&result.links&&result.links.length){
					var cards=result.links.slice(0);
					while(cards.length){
						ui.cardPile.insertBefore(cards.pop(),ui.cardPile.firstChild);
					}
					player.logSkill('zongxuan');
				}
			},
		},
		zhiyan:{
			audio:2,
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('zhiyan')).set('ai',function(target){
					return ai.get.attitude(_status.event.player,target);
				});
				"step 1"
				if(result.bool){
					event.target=result.targets[0];
					player.logSkill('zhiyan',result.targets);
				}
				else{
					event.finish();
				}
				"step 2"
				var cards=get.cards();
				var card=cards[0];
				switch(get.type(card,'trick')){
					case 'basic':event.effect='';break;
					case 'trick':event.effect='';break;
					case 'equip':event.effect='recover';break;
				}
				if(get.type(card)=='equip'){
					event.target.equip(card);
					event.target.$draw(card);
					game.delay();
				}
				else{
					event.target.gain(cards,'gain2');
					game.log(event.target,'获得了',card);
				}
				"step 3"
				switch(event.effect){
					case 'recover':event.target.recover();break;
				}
			},
			ai:{
				expose:0.2,
				threaten:1.2
			}
		},
		miji:{
			audio:2,
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				"step 0"
				event.num=player.maxHp-player.hp;
				player.draw(event.num);
				"step 1"
				var check=player.num('h')-event.num;
				player.chooseCardTarget({
					selectCard:event.num,
					filterTarget:function(card,player,target){
						return player!=target;
					},
					ai1:function(card){
						var player=_status.event.player;
						if(player.maxHp-player.hp==1&&card.name=='du') return 30;
						var check=_status.event.check;
						if(check<1) return 0;
						if(player.hp>1&&check<2) return 0;
						return ai.get.unuseful(card)+9;
					},
					ai2:function(target){
						var att=ai.get.attitude(_status.event.player,target);
						if(ui.selected.cards.length==1&&ui.selected.cards[0].name=='du') return 1-att;
						return att-2;
					},
					prompt:'将'+get.cnNumber(event.num)+'张手牌交给一名其他角色',
				}).set('check',check);
				"step 2"
				if(result.bool){
					result.targets[0].gain(result.cards);
					event.player.$give(result.cards.length,result.targets[0]);
				}
			},
			ai:{
				threaten:function(player,target){
					if(target.hp==1) return 3;
					if(target.hp==2) return 1.5;
					return 0.5;
				},
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
					}
				}
			}
		},
		zhenlie:{
			audio:2,
			filter:function(event,player){
				return event.player!=player&&event.card&&(event.card.name=='sha'||get.type(event.card)=='trick');
			},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)>0){
					return false;
				}
				if(get.tag(event.card,'respondSha')){
					if(player.num('h',{name:'sha'})==0){
						return true;
					}
				}
				else if(get.tag(event.card,'respondShan')){
					if(player.num('h',{name:'shan'})==0){
						return true;
					}
				}
				else if(get.tag(event.card,'damage')){
					if(player.num('h')<2) return true;
				}
				else if(event.card.name=='shunshou'&&player.hp>2){
					return true;
				}
				return false;
			},
			priority:10,
			trigger:{target:'useCardToBefore'},
			content:function(){
				"step 0"
				player.loseHp();
				"step 1"
				trigger.untrigger();
				trigger.finish();
				"step 2"
				if(trigger.player.num('he')){
					player.discardPlayerCard(trigger.player,'he',true);
				}
			},
			ai:{
				expose:0.3
			}
		},
		wuyan:{
			audio:2,
			trigger:{target:'useCardToBefore',player:'useCardToBefore'},
			forced:true,
			priority:15,
			check:function(event,player){
				return ai.get.effect(event.target,event.card,event.player,player)<0;
			},
			filter:function(event,player){
				if(!event.target) return false;
				if(event.player==player&&event.target==player) return false;
				return (get.type(event.card)=='trick');
			},
			content:function(){
				game.log(player,'发动了无言，',trigger.card,'对',trigger.target,'失效');
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='trick'&&player!=target) return 'zeroplayertarget';
					},
					player:function(card,player,target,current){
						if(get.type(card)=='trick'&&player!=target) return 'zeroplayertarget';
					}
				}
			}
		},
		xinwuyan:{
			audio:2,
			trigger:{source:'damageBefore',player:'damageBefore'},
			forced:true,
			priority:15,
			check:function(event,player){
				if(player==event.player) return true;
				return false;
			},
			filter:function(event,player){
				return get.type(event.card,'trick')=='trick';
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				notrick:true,
				notricksource:true,
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='trick'&&get.tag(card,'damage')){
							return 'zeroplayertarget';
						}
					},
					player:function(card,player,target,current){
						if(get.type(card)=='trick'&&get.tag(card,'damage')){
							return 'zeroplayertarget';
						}
					}
				}
			}
		},
		xinjujian:{
			trigger:{player:'phaseEnd'},
			direct:true,
			audio:2,
			filter:function(event,player){
				return player.num('he')>player.num('he',{type:'basic'});
			},
			content:function(){
				"step 0"
				player.chooseCardTarget({
					filterTarget:function(card,player,target){
						return player!=target;
					},
					filterCard:function(card){
						return get.type(card)!='basic';
					},
					ai1:function(card){
						if(get.tag(card,'damage')&&get.type(card)=='trick'){
							return 20;
						}
						return 9-ai.get.value(card);
					},
					ai2:function(target){
						var att=ai.get.attitude(_status.event.player,target);
						if(att>0){
							if(target.isTurnedOver()) att+=3;
							if(target.hp==1) att+=3;
						}
						return att;
					},
					position:'he',
					prompt:get.prompt('xinjujian')
				});
				"step 1"
				if(result.bool){
					var target=result.targets[0];
					event.target=target;
					player.logSkill('xinjujian',target);
					player.discard(result.cards);
					if(target.hp==target.maxHp&&
						!target.isTurnedOver()&&
						!target.isLinked()){
						target.draw(2);
						event.finish();
					}
					else{
						var controls=['draw_card'];
						if(target.hp<target.maxHp){
							controls.push('recover_hp');
						}
						if(target.isLinked()|target.isTurnedOver()){
							controls.push('reset_character');
						}
						target.chooseControl(controls).ai=function(){
							if(target.isTurnedOver()){
								return 'reset_character';
							}
							else if(target.hp==1&&target.maxHp>2){
								return 'recover_hp';
							}
							else if(target.hp==2&&target.maxHp>2&&target.num('h')>1){
								return 'recover_hp';
							}
							else{
								return 'draw_card';
							}
						}
					}
				}
				else{
					event.finish();
				}
				"step 2"
				event.control=result.control;
				switch(event.control){
					case 'recover_hp':event.target.recover();event.finish();break;
					case 'draw_card':event.target.draw(2);event.finish();break;
					case 'reset_character':if(event.target.isTurnedOver()) event.target.turnOver();break;
				}
				"step 3"
				if(event.control=='reset_character'&&event.target.isLinked()){
					event.target.link();
				}
			},
			ai:{
				expose:0.2,
				threaten:1.4
			}
		},
		jujian:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			filterCard:true,
			position:'he',
			selectCard:[1,3],
			check:function(card){
				var player=get.owner(card);
				if(get.type(card)=='trick') return 10;
				if(player.num('h')-player.hp-ui.selected.cards.length>0){
					return 8-ai.get.value(card);
				}
				return 4-ai.get.value(card);
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			content:function(){
				target.draw(cards.length);
				if(cards.length==3){
					if(get.type(cards[0],'trick')==get.type(cards[1],'trick')&&
						get.type(cards[0],'trick')==get.type(cards[2],'trick')){
						player.recover();
					}
				}
			},
			ai:{
				expose:0.2,
				order:1,
				result:{
					target:1
				}
			}
		},
		yizhong:{
			trigger:{target:'shaBefore'},
			forced:true,
			audio:2,
			filter:function(event,player){
				if(player.get('e','2')) return false;
				return (event.card.name=='sha'&&get.color(event.card)=='black')
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(target.get('e','2')) return;
						if(card.name=='sha'&&get.color(card)=='black') return 'zerotarget';
					}
				}
			}
		},
		jueqing:{
			trigger:{source:'damageBefore'},
			forced:true,
			audio:2,
			priority:16,
			check:function(){return false;},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				var ex=0;
				if(trigger.card&&trigger.card.name=='sha'){
					if(player.hasSkill('jiu')) ex++;
					if(player.hasSkill('luoyi2')) ex++;
					if(player.hasSkill('reluoyi2')) ex++;
				}
				trigger.player.loseHp(trigger.num+ex);
			}
		},
		shangshi:{
			audio:2,
			trigger:{player:['loseEnd','changeHp']},
			forced:true,
			filter:function(event,player){
				return (player.num('h')<Math.min(3,player.maxHp-player.hp));
			},
			content:function(){
				player.draw(Math.min(3,player.maxHp-player.hp)-player.num('h'));
			},
			ai:{
				noh:true,
				skillTagFilter:function(player,tag){
					if(tag=='noh'&&player.maxHp-player.hp<player.num('h')){
						return false;
					}
				}
			}
		},
		luoying:{
			unique:true,
			gainable:true,
			group:['luoying1','luoying2'],
		},
		luoying1:{
			audio:2,
			trigger:{global:'discardAfter'},
			filter:function(event,player){
				if(event.player==player) return false;
				for(var i=0;i<event.cards.length;i++){
					if(get.suit(event.cards[i])=='club'&&get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			frequent:'check',
			check:function(event,player){
				for(var i=0;i<event.cards.length;i++){
					if(get.suit(event.cards[i])=='club'&&get.position(event.cards[i])=='d'){
						if(event.cards[i].name=='du') return false;
					}
				}
				return true;
			},
			content:function(){
				"step 0"
				if(trigger.delay==false) game.delay();
				"step 1"
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					if(get.suit(trigger.cards[i])=='club'&&get.position(trigger.cards[i])=='d'){
						cards.push(trigger.cards[i]);
					}
				}
				if(cards.length){
					player.gain(cards);
					player.$gain2(cards);
					game.log(player,'发动落英，获得了',cards);
				}
			},
		},
		luoying2:{
			audio:2,
			trigger:{global:'judgeAfter'},
			frequent:'check',
			check:function(event,player){
				return event.result.card.name!='du';
			},
			filter:function(event,player){
				if(event.player==player) return false;
				if(event.result.card.parentNode.id!='discardPile') return false;
				return (get.suit(event.result.card)=='club');
			},
			content:function(){
				player.gain(trigger.result.card);
				player.$gain2(trigger.result.card);
			}
		},
		jiushi:{
			group:['jiushi1','jiushi2','jiushi3'],
		},
		jiushi1:{
			audio:2,
			enable:'chooseToUse',
			filter:function(event,player){
				if(player.classList.contains('turnedover')) return false;
				if(event.parent.name=='phaseUse'){
					return lib.filter.filterCard({name:'jiu'},player,event);
				}
				if(event.type!='dying') return false;
				if(player!=event.dying) return false;
				return true;
			},
			content:function(){
				if(_status.event.getParent(2).type=='dying'){
					event.dying=player;
				}
				player.turnOver();
				player.useCard({name:'jiu'},player);
			},
			ai:{
				save:true,
				skillTagFilter:function(player){
					return player.hp<=0&&!player.isTurnedOver();
				},
				order:5,
				result:{
					player:function(player){
						if(_status.event.parent.name=='phaseUse'){
							if(player.num('h','jiu')>0) return 0;
							if(player.num('e','zhuge')&&player.num('h','sha')>1) return 0;
							if(!player.num('h','sha')) return 0;
							var targets=[];
							var target;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(player,game.players[i])<0){
									if(player.canUse('sha',game.players[i],true,true)){
										targets.push(game.players[i]);
									}
								}
							}
							if(targets.length){
								target=targets[0];
							}
							else{
								return 0;
							}
							var num=ai.get.effect(target,{name:'sha'},player,player);
							for(var i=1;i<targets.length;i++){
								var num2=ai.get.effect(targets[i],{name:'sha'},player,player);
								if(num2>num){
									target=targets[i];
									num=num2;
								}
							}
							if(num<=0) return 0;
							var e2=target.get('e','2');
							if(e2){
								if(e2.name=='tengjia'){
									if(!player.num('h',{name:'sha',nature:'fire'})&&!player.num('e','zhuque')) return 0;
								}
								if(e2.name=='renwang'){
									if(!player.num('h',{name:'sha',color:'red'})) return 0;
								}
								if(e2.name=='baiyin') return 0;
							}
							if(player.num('e','guanshi')&&player.num('he')>2) return 1;
							return target.num('h')>3?0:1;
						}
						if(player==_status.event.dying||player.isTurnedOver()) return 3;
					}
				},
				effect:{
					target:function(card,player,target){
						if(card.name=='guiyoujie') return [0,0.5];
						if(target.isTurnedOver()){
							if(get.tag(card,'damage')){
								if(player.hasSkill('jueqing')) return [1,-2];
								if(target.hp==1) return;
								return [1,target.num('h')/2];
							}
						}
					}
				}
			},
		},
		jiushi2:{
			trigger:{player:'damageBegin'},
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				return player.classList.contains('turnedover');
			},
			content:function(){
				player.storage.jiushi=true;
			}
		},
		jiushi3:{
			audio:2,
			trigger:{player:'damageAfter'},
			check:function(event,player){
				return player.isTurnedOver();
			},
			filter:function(event,player){
				if(player.storage.jiushi){
					return true;
				}
				return false;
			},
			content:function(){
				player.storage.jiushi=false;
				player.turnOver();
			}
		},
		zongshi:{
			mod:{
				maxHandcard:function(player,num){
					var list=['wei','shu','wu','qun'];
					for(var i=0;i<game.players.length&&list.length;i++){
						if(list.contains(game.players[i].group)){
							list.remove(game.players[i].group);
							num++;
						}
					}
					return num;
				}
			}
		},
		zishou:{
			audio:2,
			trigger:{player:'phaseDrawBegin'},
			check:function(event,player){
				return player.num('h')<=player.maxHp||player.skipList.contains('phaseUse');
			},
			content:function(){
				var list=['wei','shu','wu','qun'],num=0;
				for(var i=0;i<game.players.length&&list.length;i++){
					if(list.contains(game.players[i].group)){
						list.remove(game.players[i].group);
						num++;
					}
				}
				trigger.num+=num;
				player.addTempSkill('zishou2','phaseAfter');
				// player.skip('phaseUse');

			},
			ai:{
				threaten:1.5
			}
		},
		zishou2:{
			mod:{
				playerEnabled:function(card,player,target){
					if(player!=target) return false;
				}
			}
		},
		yaowu:{
			trigger:{player:'damageEnd'},
			priority:1,
			audio:2,
			filter:function(event){
				if(event.card&&(event.card.name=='sha')){
					if(get.color(event.card)=='red') return true;
				}
				return false;
			},
			forced:true,
			check:function(){
				return false;
			},
			content:function(){
				"step 0"
				if(trigger.source.hp<trigger.source.maxHp){
					trigger.source.chooseControl('draw_card','recover_hp',function(event,target){
						return 'recover_hp';
					});
				}
				else{
					trigger.source.draw();
					event.finish();
				}
				"step 1"
				if(result.control=='draw_card'){
					trigger.source.draw();
				}
				else{
					trigger.source.recover();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(card.name=='sha'&&(get.color(card)=='red')){
							return [1,-2];
						}
					}
				}
			}
		},
		shiyong2:{
			trigger:{player:'damageEnd'},
			forced:true,
			audio:false,
			check:function(){
				return false;
			},
			content:function(){
				player.maxHp--;
				player.removeSkill('shiyong2');
				player.update();
			},
		},
		danshou_old:{
			trigger:{source:'damageEnd'},
			priority:9,
			content:function(){
				"step 0"
				player.draw();
				"step 1"
				while(_status.event.name!='phase'){
					_status.event=_status.event.parent;
				}
				_status.event.finish();
				_status.event.untrigger(true);
			}
		},
		danshou:{
			enable:'phaseUse',
			filterCard:true,
			position:'he',
			audio:2,
			filter:function(event,player){
				var num=player.getStat().skill.danshou;
				if(num){
					num++;
				}
				else{
					num=1;
				}
				return player.num('he')>=num;
			},
			check:function(card){
				return 6-ai.get.value(card);
			},
			selectCard:function(card){
				var num=_status.event.player.getStat().skill.danshou;
				if(num) return num+1;
				return 1;
			},
			filterTarget:function(card,player,target){
				if(player==target) return false;
				var num=player.getStat().skill.danshou;
				if(num){
					num++;
				}
				else{
					num=1;
				}
				if(num<=2&&!target.num('he')) return false;
				return get.distance(player,target,'attack')<=1;
			},
			content:function(){
				'step 0'
				var num=player.getStat().skill.danshou;
				switch(num){
					case 1:player.discardPlayerCard(target,true);break;
					case 2:target.chooseCard('选择一张牌交给'+get.translation(player),'he',true);break;
					case 3:target.damage();break;
					default:game.asyncDraw([player,target],2);
				}
				if(num!=2) event.finish();
				'step 1'
				if(result.cards){
					player.gain(result.cards);
					target.$give(result.cards.length,player);
				}
			},
			ai:{
				order:8.6,
				result:{
					target:function(player,target){
						var num=player.getStat().skill.danshou;
						if(num){
							num++;
						}
						else{
							num=1;
						}
						if(num>3) return 0;
						if(num==3) return ai.get.damageEffect(target,player,target);
						return -1;
					}
				}
			}
		},
		qice:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			filter:function(event,player){
				return player.num('h')>0
			},
			chooseButton:{
				dialog:function(){
					var list=['taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman'];
					for(var i=0;i<list.length;i++){
						list[i]=['锦囊','',list[i]];
					}
					return ui.create.dialog([list,'vcard']);
				},
				filter:function(button,player){
					return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
				},
				check:function(button){
					var player=_status.event.player;
					var recover=0,lose=1;
					for(var i=0;i<game.players.length;i++){
						if(!game.players[i].isOut()){
							if(game.players[i].hp<game.players[i].maxHp){
								if(ai.get.attitude(player,game.players[i])>0){
									if(game.players[i].hp<2){
										lose--;
										recover+=0.5;
									}
									lose--;
									recover++;
								}
								else if(ai.get.attitude(player,game.players[i])<0){
									if(game.players[i].hp<2){
										lose++;
										recover-=0.5;
									}
									lose++;
									recover--;
								}
							}
							else{
								if(ai.get.attitude(player,game.players[i])>0){
									lose--;
								}
								else if(ai.get.attitude(player,game.players[i])<0){
									lose++;
								}
							}
						}
					}
					if(lose>recover&&lose>0) return (button.link[2]=='nanman')?1:-1;
					if(lose<recover&&recover>0) return (button.link[2]=='taoyuan')?1:-1;
					return (button.link[2]=='wuzhong')?1:-1;
				},
				backup:function(links,player){
					return {
						filterCard:true,
						selectCard:-1,
						audio:2,
						popname:true,
						viewAs:{name:links[0][2]},
					}
				},
				prompt:function(links,player){
					return '将全部手牌当作'+get.translation(links[0][2])+'使用';
				}
			},
			ai:{
				order:1,
				result:{
					player:function(player){
						var num=0;
						var cards=player.get('h');
						if(cards.length>=3&&player.hp>=3) return 0;
						for(var i=0;i<cards.length;i++){
							num+=Math.max(0,ai.get.value(cards[i],player,'raw'));
						}
						num/=cards.length;
						num*=Math.min(cards.length,player.hp);
						return 12-num;
					}
				},
				threaten:1.6,
			}
		},
		zhiyu:{
			audio:2,
			trigger:{player:'damageEnd'},
			content:function(){
				"step 0"
				player.draw();
				"step 1"
				player.showHandcards();
				"step 2"
				if(!trigger.source) return;
				var cards=player.get('h');
				for(var i=1;i<cards.length;i++){
					if(get.color(cards[i])!=get.color(cards[0])) return;
				}
				trigger.source.chooseToDiscard(true);
			},
			ai:{
				threaten:0.9
			}
		},
		xuanfeng:{
			audio:2,
			trigger:{player:['loseEnd','phaseDiscardEnd']},
			direct:true,
			filter:function(event,player){
				if(event.name=='phaseDiscard'){
					return event.cards&&event.cards.length>1
				}
				else{
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='e') return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				player.chooseTarget([1,2],'请选择旋风的目标',function(card,player,target){
					if(player==target) return false;
					return target.num('he');
				}).set('ai',function(target){
					return -ai.get.attitude(_status.event.player,target);
				});
				"step 1"
				if(result.bool){
					player.logSkill('xuanfeng',result.targets);
					event.targets=result.targets
					if(result.targets.length==1){
						player.discardPlayerCard(event.targets[0],'he',[1,2],true);
					}
					else{
						player.discardPlayerCard(event.targets[0],'he',true);
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(targets.length==2){
					player.discardPlayerCard(targets[1],'he',true);
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
		jiangchi:{
			audio:2,
			trigger:{player:'phaseDrawBegin'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseControl('jiangchi_less','jiangchi_more','cancel',function(){
					var player=_status.event.player;
					if(player.num('h')>3&&player.num('h','sha')>1){
						return 'jiangchi_less';
					}
					if(player.num('h','sha')>2){
						return 'jiangchi_less';
					}
					if(player.hp-player.num('h')>1){
						return 'jiangchi_more';
					}
					return 'cancel';
				});
				"step 1"
				if(result.control=='jiangchi_less'){
					trigger.num--;
					player.addTempSkill('jiangchi2','phaseUseEnd');
					player.logSkill('jiangchi');
				}
				else if(result.control=='jiangchi_more'){
					trigger.num++;
					player.addTempSkill('jiangchi3','phaseUseEnd');
					player.logSkill('jiangchi');
				}
			}
		},
		jiangchi2:{
			mod:{
				targetInRange:function(card,player,target,now){
					if(card.name=='sha') return true;
				},
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num+1;
				}
			}
		},
		jiangchi3:{
			mod:{
				cardEnabled:function(card){if(card.name=='sha') return false}
			}
		},
		xinzhan:{
			audio:2,
			enable:'phaseUse',
			filter:function(event,player){
				return true;//player.num('h')>player.maxHp;
			},
			usable:1,
			content:function(){
				"step 0"
				var cards=get.cards(3);
				event.cards=cards;
				var next=player.chooseCardButton(cards,'选择获得的红桃牌',[1,Infinity]).set('filterButton',function(button){
					return get.suit(button.link)=='heart';
				});
				"step 1"
				if(result.bool){
					player.gain(result.links);
					player.$draw(result.links);
					game.delay(2);
				}
				for(var i=event.cards.length-1;i>=0;i--){
					if(!result.bool||!result.links.contains(event.cards[i])){
						ui.cardPile.insertBefore(event.cards[i],ui.cardPile.firstChild);
					}
				}
			},
			ai:{
				order:11,
				result:{
					player:1
				}
			}
		},
		huilei:{
			audio:2,
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source!=undefined;
			},
			content:function(){
				trigger.source.discard(trigger.source.get('he'));
			},
			ai:{
				threaten:0.7
			}
		},
		xinenyuan:{
			audio:true,
			trigger:{player:'damageEnd'},
			check:function(event,player){
				var att=ai.get.attitude(player,event.source);
				var num=event.source.num('h');
				if(att<=0) return true;
				if(num>2) return true;
				if(num) return att<4;
				return false;
			},
			filter:function(event,player){
				return event.source&&event.source!=player;
			},
			content:function(){
				"step 0"
				trigger.source.chooseCard('交给'+get.translation(player)+'一张手牌或流失一点体力').set('ai',function(card){
					if(ai.get.attitude(_status.event.player,_status.event.getParent().player)>0){
						return 11-ai.get.value(card);
					}
					else{
						return 7-ai.get.value(card);
					}
				});
				"step 1"
				if(result.bool){
					player.gain(result.cards[0]);
					trigger.source.$give(1,player);
				}
				else{
					trigger.source.loseHp();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(player.hasSkill('jueqing')) return [1,-1.5];
						var hasfriend=false;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
								hasfriend=true;break;
							}
						}
						if(!hasfriend) return;
						if(get.tag(card,'damage')) return [1,0,0,-0.7];
					}
				}
			}
		},
		enyuan:{
			locked:true,
			group:['enyuan1','enyuan2'],
			ai:{
				effect:{
					target:function(card,player,target){
						if(player.hasSkill('jueqing')) return [1,-2];
						var hasfriend=false;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
								hasfriend=true;break;
							}
						}
						if(!hasfriend) return;
						if(get.tag(card,'damage')) return [1,0,0,-1];
					}
				}
			}
		},
		enyuan1:{
			trigger:{player:'recoverEnd'},
			forced:true,
			audio:2,
			filter:function(event,player){
				return event.source&&event.source!=player;
			},
			content:function(){
				trigger.source.draw();
			}
		},
		enyuan2:{
			trigger:{player:'damageEnd'},
			forced:true,
			audio:true,
			filter:function(event,player){
				return event.source&&event.source!=player;
			},
			content:function(){
				"step 0"
				trigger.source.chooseCard('交出一张红桃牌或流失一点体力',function(card){
					return get.suit(card)=='heart';
				}).set('ai',function(card){
					if(ai.get.attitude(_status.event.player,_status.event.getParent().player)>0){
						return 11-ai.get.value(card);
					}
					else{
						return 7-ai.get.value(card);
					}
				});
				"step 1"
				if(result.bool){
					player.gain(result.cards[0]);
					trigger.source.$give(1,player);
				}
				else{
					trigger.source.loseHp();
				}
			}
		},
		xuanhuo:{
			audio:2,
			enable:'phaseUse',
			usable:1,
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(1,targets[0]);
			},
			filterCard:function(card){
				return get.suit(card)=='heart';
			},
			filterTarget:function(card,player,target){
				if(game.players.length==2) return false;
				return player!=target;
			},
			check:function(card){
				var player=get.owner(card);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&ai.get.attitude(player,game.players[i])>3) break;
				}
				if(i==game.players.length) return -1;
				return 5-ai.get.value(card);
			},
			content:function(){
				"step 0"
				target.gain(cards);
				game.delay();
				"step 1"
				player.gainPlayerCard(target,'he',true);
				"step 2"
				var source=target;
				event.card=result.links[0];
				player.chooseTarget('选择一个目标送出'+get.translation(event.card),function(card,player,target){
					return target!=_status.event.source&&target!=player;
				}).set('ai',function(target){
					return ai.get.attitude(_status.event.player,target);
				}).set('source',target);
				"step 3"
				if(result.bool){
					result.targets[0].gain(card);
					player.$give(1,result.targets[0]);
					game.delay();
				}
			},
			ai:{
				result:{
					target:-0.5,
				},
				basic:{
					order:9,
				}
			}
		},
		ganlu:{
			enable:'phaseUse',
			usable:1,
			audio:2,
			selectTarget:2,
			filterTarget:function(card,player,target){
				if(target.isMin()) return false;
				if(ui.selected.targets.length==0) return true;
				if(ui.selected.targets[0].num('e')==0&&target.num('e')==0) return false;
				return Math.abs(ui.selected.targets[0].num('e')-target.num('e'))<=player.maxHp-player.hp;
			},
			multitarget:true,
			content:function(){
				"step 0"
				event.cards=[targets[0].get('e'),targets[1].get('e')];
				targets[0].lose(event.cards[0],ui.special);
				targets[1].lose(event.cards[1],ui.special);
				if(event.cards[0].length) targets[0].$give(event.cards[0],targets[1]);
				if(event.cards[1].length) targets[1].$give(event.cards[1],targets[0]);
				"step 1"
				for(var i=0;i<event.cards[1].length;i++){
					targets[0].equip(event.cards[1][i]);
				}
				for(var i=0;i<event.cards[0].length;i++){
					targets[1].equip(event.cards[0][i]);
				}
			},
			ai:{
				order:10,
				threaten:function(player,target){
					return 0.8*Math.max(1+target.maxHp-target.hp);
				},
				result:{
					target:function(player,target){
						var list1=[];
						var list2=[];
						var num=player.maxHp-player.hp;
						for(var i=0;i<game.players.length;i++){
							if(ai.get.attitude(player,game.players[i])>0) list1.push(game.players[i]);
							else if(ai.get.attitude(player,game.players[i])<0) list2.push(game.players[i]);
						}
						list1.sort(function(a,b){
							return a.num('e')-b.num('e');
						});
						list2.sort(function(a,b){
							return b.num('e')-a.num('e');
						});
						var delta;
						for(var i=0;i<list1.length;i++){
							for(var j=0;j<list2.length;j++){
								delta=list2[j].num('e')-list1[i].num('e');
								if(delta<=0) continue;
								if(delta<=num){
									if(target==list1[i]||target==list2[j]){
										return ai.get.attitude(player,target);
									}
									return 0;
								}
							}
						}
						return 0;
					}
				},
				effect:{
					target:function(card,player,target){
						if(target.hp==target.maxHp&&get.tag(card,'damage')) return 0.2;
					}
				}
			}
		},
		buyi:{
			trigger:{global:'dying'},
			priority:6,
			audio:2,
			filter:function(event,player){
				return event.player.hp<=0&&event.player.num('h')>0;
			},
			check:function(event,player){
				if(event.player==player){
					return event.player.get('h',function(card){
						return get.type(card)!='basic';
					}).length>0;
				}
				return ai.get.attitude(player,event.player)>0;
			},
			direct:true,
			content:function(){
				"step 0"
				var check=false;
				if(trigger.player==player){
					if(player.num('h',function(card){
						return get.type(card)!='basic';
					})){
						check=true;
					}
				}
				else{
					if(ai.get.attitude(player,trigger.player)>0){
						check=true;
					}
				}
				player.choosePlayerCard(trigger.player,get.prompt('buyi',trigger.player),'h').set('ai',function(button){
					if(!_status.event.check) return 0;
					if(_status.event.target.isUnderControl(true,_status.event.player)){
						if(get.type(card)!='basic'){
							return 10-ai.get.value(button.link);
						}
						return 0;
					}
					else{
						return Math.random();
					}
				}).set('check',check);
				"step 1"
				if(result.bool){
					player.logSkill('buyi',trigger.player);
					event.card=result.links[0];
					player.showCards([event.card],get.translation(player)+'展示的手牌');
				}
				else{
					event.finish();
				}
				"step 2"
				if(get.type(event.card)!='basic'){
					trigger.player.recover();
					trigger.player.discard(event.card);
				}
			},
			ai:{
				threaten:1.4
			}
		},
		pojun:{
			audio:2,
			trigger:{source:'damageEnd'},
			check:function(event,player){
				if(event.player.isTurnedOver()) return ai.get.attitude(player,event.player)>0;
				if(event.player.hp<3){
					return ai.get.attitude(player,event.player)<0;
				}
				return ai.get.attitude(player,event.player)>0;
			},
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.player.isAlive();
			},
			content:function(){
				"step 0"
				trigger.player.draw(Math.min(5,trigger.player.hp));
				"step 1"
				trigger.player.turnOver();
			}
		},
		jingce:{
			trigger:{player:'phaseUseEnd'},
			frequent:true,
			filter:function(event,player){
				return get.cardCount(true,player)>=player.hp;
			},
			content:function(){
				player.draw(2);
			},
			audio:2,
			init:function(player){player.storage.jingce=true},
			intro:{
				content:function(storage,player){
					if(_status.currentPhase==player) return '已使用'+get.cardCount(true,player)+'张牌';
				}
			}
		},
		chengxiang:{
			trigger:{player:'damageEnd'},
			direct:true,
			audio:2,
			content:function(){
				"step 0"
				event.cards=get.cards(4);
				event.videoId=lib.status.videoId++;
				game.broadcastAll(function(player,id,cards){
					var str;
					if(player==game.me&&!_status.auto){
						str='称象：选择任意张点数小于13的牌';
					}
					else{
						str='称象';
					}
					var dialog=ui.create.dialog(str,cards);
					dialog.videoId=id;
				},player,event.videoId,event.cards);
				event.time=get.utc();
				game.addVideo('showCards',player,['称象',get.cardsInfo(event.cards)]);
				game.addVideo('delay',null,2);
				"step 1"
				var next=player.chooseButton([0,4]);
				next.set('dialog',event.videoId);
				next.set('filterButton',function(button){
					var num=0
					for(var i=0;i<ui.selected.buttons.length;i++){
						num+=get.number(ui.selected.buttons[i].link);
					}
					return (num+get.number(button.link)<=13);
				});
				next.set('ai',function(button){
					return ai.get.value(button.link,_status.event.player);
				});
				"step 2"
				if(result.bool&&result.links){
					player.logSkill('chengxiang');
					var cards2=[];
					for(var i=0;i<result.links.length;i++){
						cards2.push(result.links[i]);
						cards.remove(result.links[i]);
					}
					for(var i=0;i<cards.length;i++){
						ui.discardPile.appendChild(cards[i]);
					}
					event.cards2=cards2;
				}
				else{
					event.finish();
				}
				var time=1000-(get.utc()-event.time);
				if(time>0){
					game.delay(0,time);
				}
				"step 3"
				game.broadcastAll('closeDialog',event.videoId);
				var cards2=event.cards2;
				player.gain(cards2);
				player.$draw(cards2);
				game.log(player,'获得了',cards2)
				game.delay(2);
			},
			ai:{
				maixie:true,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.hasSkill('jueqing')) return [1,-2];
							var hasfriend=false;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
									hasfriend=true;break;
								}
							}
							if(!hasfriend) return;
							if(target.hp>=4) return [1,2];
							if(target.hp==3) return [1,1.5];
							if(target.hp==2) return [1,0.5];
						}
					}
				}
			}
		},
		renxin:{
			trigger:{global:'damageBefore'},
			audio:3,
			priority:6,
			filter:function(event,player){
				return event.player!=player&&event.player.hp==1&&player.num('he',{type:'equip'})>0;
			},
			direct:true,
			content:function(){
				"step 0"
				var next=player.chooseToDiscard(get.prompt('renxin',trigger.player),{type:'equip'},'he');
				next.logSkill=['renxin',trigger.player];
				next.set('ai',function(card){
					var player=_status.event.player;
					if(ai.get.attitude(player,_status.event.getTrigger().player)>3){
						return 11-ai.get.value(card);
					}
					return -1;
				});
				"step 1"
				if(result.bool){
					player.turnOver();
				}
				else{
					event.finish();
				}
				"step 2"
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				expose:0.5
			}
		},
		yuce:{
			audio:2,
			trigger:{player:'damageAfter'},
			direct:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				"step 0"
				var next=player.chooseToDiscard(get.prompt('yuce'));
				next.logSkill='yuce';
				next.set('ai',function(card){
					return 7-ai.get.value(card);
				});
				"step 1"
				if(result.bool){
					var type=get.type(result.cards[0],'trick');
					if(trigger.source){
						trigger.source.chooseToDiscard('弃置一张'+get.translation(type)+'牌或令'+get.translation(player)+'回复一点体力',function(card){
							return get.type(card,'trick')==_status.event.type;
						}).set('ai',function(card){
							if(ai.get.recoverEffect(_status.event.getParent().player,_status.event.player,_status.event.player)<0){
								return 7-ai.get.value(card);
							}
							return 0;
						}).set('type',type);
					}
					else{
						event.recover=true;
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.recover){
					player.recover();
				}
				else if(result.bool){
					player.draw();
				}
				else{
					player.recover();
				}
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage'&&target.num('h'))){
							return 0.8
						}
					}
				}
			}
		},
		xiansi:{
			audio:2,
			trigger:{player:'phaseBegin'},
			direct:true,
			init:function(player){
				player.storage.xiansi=[];
			},
			unique:true,
			forceunique:true,
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('xiansi'),[1,2],function(card,player,target){
					return target.num('he')>0;
				},function(target){
					return -ai.get.attitude(_status.event.player,target);
				});
				"step 1"
				if(result.bool){
					player.logSkill('xiansi',result.targets);
					event.targets=result.targets;
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.targets.length){
					var target=event.targets.shift();
					event.current=target;
					player.choosePlayerCard(target,true);
				}
				else{
					event.finish();
				}
				"step 3"
				if(result.bool){
					player.storage.xiansi=player.storage.xiansi.concat(result.links);
					player.markSkill('xiansi');
					player.syncStorage('xiansi');
					event.current.lose(result.links,ui.special);
					event.current.$give(result.links,player);
					event.goto(2);
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
						player.storage.xiansi.length=0;
					}
				}
			},
			ai:{
				threaten:2
			},
			global:'xiansi2'
		},
		xiansi2:{
			enable:'phaseUse',
			audio:2,
			forceaudio:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].storage.xiansi){
						return game.players[i].storage.xiansi.length>1&&player.canUse('sha',game.players[i],true,true);
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].storage.xiansi){
						event.target=game.players[i];
						break;
					}
				}
				if(event.target){
					player.chooseCardButton(2,event.target.storage.xiansi).set('ai',function(){
						return 1;
					});
				}
				else{
					event.finish();
				}
				"step 1"
				if(result.bool){
					for(var i=0;i<result.links.length;i++){
						event.target.storage.xiansi.remove(result.links[i]);
					}
					event.target.syncStorage('xiansi');
					if(!event.target.storage.xiansi.length){
						event.target.unmarkSkill('xiansi');
					}
					else{
						event.target.markSkill('xiansi');
					}
					event.target.$throw(result.links);
					for(var i=0;i<result.links.length;i++){
						ui.discardPile.appendChild(result.links[i]);
					}
					player.useCard({name:'sha'},event.target);
				}
			},
			ai:{
				order:3.1,
				result:{
					player:function(player){
						var target;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].storage.xiansi){
								target=game.players[i];
								break;
							}
						}
						if(target){
							return ai.get.effect(target,{name:'sha'},player,player);
						}
					}
				}
			}
		},
		shibei:{
			audio:2,
			trigger:{player:'damageAfter'},
			forced:true,
			content:function(){
				"step 0"
				player.judge(function(card){
					if(player.hasSkill('shibei2')){
						if(get.color(card)=='black') return -1;
					}
					else{
						if(get.color(card)=='red') return 1;
					}
					return 0;
				})
				"step 1"
				if(result.judge>0){
					player.recover();
				}
				else if(result.judge<0){
					player.loseHp();
				}
				if(!player.hasSkill('shibei2')){
					player.addTempSkill('shibei2','phaseAfter');
				}
			}
		},
		shibei2:{},
		jianying:{
			audio:2,
			trigger:{player:'useCard'},
			frequent:true,
			filter:function(event,player){
				if(!event.cards||event.cards.length!=1) return false;
				if(_status.currentPhase!=player) return false;
				if(!player.storage.jianying) return false;
				return get.suit(player.storage.jianying)==get.suit(event.cards[0])||
					player.storage.jianying.number==event.cards[0].number;
			},
			content:function(){
				player.draw();
			},
			intro:{
				content:'card'
			},
			group:['jianying2','jianying3']
		},
		jianying3:{
			trigger:{player:'useCard'},
			priority:-1,
			forced:true,
			popup:false,
			silent:true,
			filter:function(event,player){
				if(!event.cards||event.cards.length!=1) return false;
				if(_status.currentPhase!=player) return false;
				return true;
			},
			content:function(){
				player.storage.jianying=trigger.cards[0];
			}
		},
		jianying2:{
			trigger:{player:'phaseAfter'},
			forced:true,
			silent:true,
			popup:false,
			content:function(){
				player.storage.jianying=null;
			}
		},
		zzhenggong:{
			trigger:{player:'damageEnd'},
			direct:true,
			filter:function(event,player){
				return event.source&&event.source.num('e')>0;
			},
			content:function(){
				"step 0"
				var att=ai.get.attitude(player,trigger.source);
				player.choosePlayerCard('e',get.prompt('zzhenggong'),trigger.source).ai=function(button){
					if(att<=0){
						return ai.get.equipValue(button.link);
					}
					return 0;
				}
				"step 1"
				if(result.bool){
					player.logSkill('zzhenggong',trigger.source);
					player.equip(result.links[0]);
					trigger.source.$give(result.links[0],player);
				}
			}
		},
		zquanji:{
			trigger:{global:'phaseBegin'},
			priority:15,
			check:function(event,player){
				var att=ai.get.attitude(player,event.player);
				if(att<0){
					var nh1=event.player.num('h');
					var nh2=player.num('h');
					return nh1<=2&&nh2>nh1+1;
				}
				if(att>0&&event.player.num('j','lebu')&&event.player.num('h')>event.player.hp+1) return true;
				return false;
			},
			logTarget:'player',
			filter:function(event,player){
				return event.player!=player&&event.player.num('h')>0&&player.num('h')>0;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(trigger.player);
				"step 1"
				if(result.bool){
					trigger.player.skip('phaseJudge');
					trigger.untrigger();
				}
			},
			ai:{
				expose:0.2
			}
		},
		zbaijiang:{
			skillAnimation:true,
			trigger:{player:'phaseBegin'},
			forced:true,
			unique:true,
			init:function(player){
				player.storage.zbaijiang=false;
			},
			// intro:{
			// 	content:'limited'
			// },
			filter:function(event,player){
				return !player.storage.zbaijiang&&player.num('e')>=2;
			},
			content:function(){
				player.storage.zbaijiang=true;
				player.removeSkill('zzhenggong');
				player.removeSkill('zquanji');
				player.removeSkill('zbaijiang');
				player.addSkill('zyexin');
				player.addSkill('zzili');
				player.gainMaxHp();
			}
		},
		zyexin:{
			trigger:{player:'damageEnd',source:'damageEnd'},
			frequent:true,
			init:function(player){
				player.storage.zyexin=[];
			},
			intro:{
				content:'cards'
			},
			content:function(){
				var card=get.cards()[0];
				player.storage.zyexin.push(card);
				player.$draw(card);
				player.markSkill('zyexin');
				game.addVideo('storage',player,['zyexin',get.cardsInfo(player.storage.zyexin),'cards']);
			},
			group:'zyexin2'
		},
		zyexin2:{
			enable:'phaseUse',
			usable:1,
			lose:false,
			delay:false,
			selectCard:[1,Infinity],
			filterCard:true,
			filter:function(event,player){
				return player.storage.zyexin.length>0;
			},
			prompt:'用任意数量的手牌与等量的“权”交换',
			content:function(){
				"step 0"
				player.lose(cards,ui.special)._triggered=null;
				player.storage.zyexin=player.storage.zyexin.concat(cards);
				player.chooseCardButton(player.storage.zyexin,'选择'+cards.length+'张牌作为手牌',cards.length,true).ai=function(button){
					return ai.get.value(button.link);
				}
				if(player==game.me&&_status.auto){
					game.delay();
				}
				"step 1"
				player.gain(result.links)._triggered=null;
				for(var i=0;i<result.links.length;i++){
					player.storage.zyexin.remove(result.links[i]);
				}
				game.addVideo('storage',player,['zyexin',get.cardsInfo(player.storage.zyexin),'cards']);
			},
			ai:{
				order:5,
				result:{
					player:1
				}
			}
		},
		zzili:{
			skillAnimation:true,
			unique:true,
			init:function(player){
				player.storage.zzili=false;
			},
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				return player.storage.zyexin.length>=4&&!player.storage.zzili;
			},
			forced:true,
			content:function(){
				player.storage.zzili=true;
				player.loseMaxHp();
				player.addSkill('zpaiyi');
				player.removeSkill('zzili');
			},
			// intro:{
			// 	content:'limited'
			// }
		},
		zpaiyi:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				for(var i=0;i<player.storage.zyexin.length;i++){
					var type=get.type(player.storage.zyexin[i]);
					if(type=='delay'||type=='equip') return true;
				}
				return false;
			},
			direct:true,
			content:function(){
				"step 0"
				var next=player.chooseCardButton(get.prompt('zpaiyi'),player.storage.zyexin);
				next.filterButton=function(button){
					var type=get.type(button.link);
					if(type=='delay'||type=='equip') return true;
					return false;
				};
				next.ai=function(button){
					return ai.get.value(button.link);
				}
				"step 1"
				if(result.bool){
					var card=result.links[0];
					event.card=card;
					var isjudge=get.type(card)=='delay';
					player.chooseTarget(function(cd,player,target){
						if(isjudge){
							return !target.hasJudge(card.name);
						}
						else{
							return !target.isMin();
						}
					}).ai=function(target){
						return ai.get.effect(target,card,player,player);
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.bool){
					player.storage.zyexin.remove(event.card);
					game.addVideo('storage',player,['zyexin',get.cardsInfo(player.storage.zyexin),'cards']);
					game.delay();
					if(get.type(event.card)=='equip'){
						player.$give(event.card,result.targets[0]);
						result.targets[0].equip(event.card);
					}
					else if(get.type(event.card)=='delay'){
						player.$throw(event.card);
						result.targets[0].addJudge(event.card);
					}
					player.logSkill('zpaiyi',result.targets);
					if(player!=result.targets[0]){
						player.draw();
					}
				}
			}
		}
	},
	translate:{
		yufan:'虞翻',
		wangyi:'王异',
		xushu:'徐庶',
		caozhi:'曹植',
		zhangchunhua:'张春华',
		lingtong:'凌统',
		xunyou:'荀攸',
		caozhang:'曹彰',
		liubiao:'刘表',
		huaxiong:'华雄',
		zhuran:'朱然',
		yujin:'于禁',
		masu:'马谡',
		xin_masu:'新马谡',
		fazheng:'法正',
		xin_fazheng:'新法正',
		wuguotai:'吴国太',
		chengong:'陈宫',
		xusheng:'徐盛',
		guohuai:'郭淮',
		caochong:'曹冲',
		bulianshi:'步练师',
		handang:'韩当',
		fuhuanghou:'伏皇后',
		caifuren:'蔡夫人',
		zhonghui:'钟会',
		old_zhonghui:'钟士季',
		sunluban:'孙鲁班',
		chenqun:'陈群',
		zhangsong:'张松',
		guyong:'顾雍',
		jianyong:'简雍',
		madai:'马岱',
		xin_xushu:'新徐庶',
		manchong:'满宠',
		liufeng:'刘封',
		liru:'李儒',
		guanzhang:'关兴张苞',
		yj_jushou:'沮授',
		zhuhuan:'朱桓',
		xiahoushi:'夏侯氏',
		panzhangmazhong:'潘璋马忠',
		caorui:'曹叡',
		caoxiu:'曹休',
		zhongyao:'钟繇',
		liuchen:'刘谌',
		zhangyi:'张嶷',
		sunxiu:'孙休',
		zhuzhi:'朱治',
		quancong:'全琮',
		gongsunyuan:'公孙渊',
		guotufengji:'郭图逢纪',
		zhoucang:'周仓',
		guanping:'关平',
		liaohua:'廖化',
		caozhen:'曹真',
		wuyi:'吴懿',
		hanhaoshihuan:'韩浩史涣',
		chengpu:'程普',
		gaoshun:'高顺',
		xin_yujin:'新于禁',
		xin_liru:'新李儒',
		guohuanghou:'郭皇后',
		liuyu:'刘虞',
		sundeng:'孙登',
		liyan:'李严',
		sunziliufang:'孙资刘放',
		huanghao:'黄皓',
		zhangrang:'张让',
		cenhun:'岑昏',

		guizao:'瑰藻',
		guizao_info:'弃牌阶段结束时，若你于此阶段弃置牌的数量不小于2且它们的花色各不相同，你可以回复1点体力或摸一张牌',
		jiyu:'讥谀',
		jiyu_info:'出牌阶段每名角色限一次，若你有可以使用的手牌，你可以令一名角色弃置一张手牌。若如此做，你不能使用与之相同花色的牌，直到回合结束。若其以此法弃置的牌为黑桃，你翻面并令其失去1点体力',
		qinqing:'寝情',
		qinqing_info:'结束阶段开始时，你可以弃置攻击范围内含有主公的一名其他角色的一张牌，令其摸一张牌，然后若其手牌比主公多，你摸一张牌',
		huisheng:'贿生',
		huisheng_info:'每名角色限一次，当你受到其他角色造成的伤害时，你可选你的任意数量的牌令该角色观看，然后该角色选择：1.获得这些牌中的一张，然后防止伤害。2.弃置等量的牌',
		jishe:'极奢',
		jishe_info:'出牌阶段，若你的手牌上限大于0，你可以摸一张牌，然后你本回合的手牌上限-1。结束阶段开始时，若你没有手牌，则你可以横置至多X名角色的武将牌（X为你的体力值）',
		lianhuo:'链祸',
		lianhuo_info:'锁定技，当你受到火焰伤害时，若你处于“连环状态”且你是传导伤害的起点，则此伤害+1',
		taoluan:'滔乱',
		taoluan4:'滔乱',
		taoluan5:'滔乱',
		taoluan_backup:'滔乱',
		taoluan_info:'出牌阶段，你可视为使用任意一张基本牌或非延时类锦囊牌（此牌不得是本局游戏你以此法使用过的牌），然后你令一名其他角色选择一项：1.交给你一张与你以此法使用的牌类别相同的牌；2.你失去1点体力且滔乱无效直到回合结束',
		jiaozhao:'矫诏',
		jiaozhao2:'矫诏',
		jiaozhao_info:'出牌阶段限一次，你可以展示一张手牌，然后选择距离最近的一名其他角色，该角色声明一张基本牌的牌名。在此出牌阶段内，你可以将此手牌当声明的牌使用且你不能被选择为目标',
		danxin:'殚心',
		danxin_info:'当你受到伤害后，你可以摸一张牌，或对“矫诏”的描述依次执行下列一项修改：1.将“基本牌”改为“基本牌或非延时类锦囊牌”；2.将“选择距离最近的一名其他角色，该角色”改为“你”',
		duliang:'督粮',
		duliang2:'督粮',
		duliang_info:'出牌阶段限一次，你可以获得一名其他角色的一张手牌，然后选择一项：1.令其观看牌堆顶的两张牌，然后获得其中的基本牌；2.令其于下个摸牌阶段额外摸一张牌',
		fulin:'腹鳞',
		fulin_info:'锁定技，弃牌阶段内，你于此回合内获得的牌不计入你的手牌数',
		kuangbi:'匡弼',
		kuangbi_info:'出牌阶段限一次，你可以选择一名有牌的其他角色，该角色将其一至三张牌置于你的武将牌上。若如此做，你的下回合开始时，你获得武将牌上的所有牌，然后其摸等量的牌',
		zhige:'止戈',
		zhige_info:'出牌阶段限一次，若你的手牌数大于你的体力值，你可以选择攻击范围内含有你的一名其他角色，除非该角色使用一张【杀】，否则其将其装备区里的一张牌交给你',
		zongzuo:'宗祚',
		zongzuo_info:'锁定技，游戏的第一个回合开始前，你加X点体力上限和体力（X为全场势力数）；当一名角色死亡后，若没有与其势力相同的角色，你减1点体力上限',
		xinjuece:'绝策',
		xinjuece_info:'结束阶段开始时，你可以对没有手牌的一名角色造成1点伤害',
		xinmieji:'灭计',
		xinmieji_info:'出牌阶段限一次，你可以展示一张黑色锦囊牌并将之置于牌堆顶，然后令有手牌的一名其他角色选择一项：弃置一张锦囊牌；或弃置两张非锦囊牌',
		xinfencheng:'焚城',
		xinfencheng_info:'限定技。出牌阶段，你可以令所有其他角色各选择一项：弃置至少X张牌(X为该角色的上家以此法弃置牌的数量+1)；或受到你对其造成的2点火焰伤害',
		qianju:'千驹',
		qianju_info:'锁定技，若你已受伤，你计算与其他角色距离时-X（X为你已损失体力值）',
		qingxi:'倾袭',
		qingxi_info:'当你使用【杀】对目标角色造成伤害时，若你的装备区里有武器牌，你可以令其选择一项：1、弃置X张手牌（X为此武器牌的攻击范围），若如此做，其弃置你的此武器牌；2、令伤害值+1',
		jieyue:'节钺',
		jieyue1:'节钺',
		jieyue2:'节钺',
		jieyue3:'节钺',
		jieyue4:'节钺',
		jieyue_info:'结束阶段开始时，你可以弃置一张手牌，然后令一名其他角色选择一项：将一张牌置于你的武将牌上；或令你弃置其一张牌。你武将牌上有牌时，你可以将红色手牌当【闪】、黑色的手牌当【无懈可击】使用或打出。准备阶段开始时，你获得你武将牌上的牌。',
		xianzhen:'陷阵',
		xianzhen_info:'出牌阶段，你可以与一名角色拼点。若你赢，你获得以下技能直到回合结束：无视与该角色的距离；无视防具且可使用任意数量的【杀】。若你没赢，你不能使用【杀】直到回合结束。每回合限一次',
		jinjiu:'禁酒',
		jinjiu_info:'锁定技，你的【酒】均视为【杀】',
		chunlao:'醇醪',
		chunlao_info:'结束阶段开始时，若没有“醇”，你可以将至少一张【杀】置于你的武将牌上，称为“醇”。当一名角色处于濒死状态时，你可以将一张“醇”置入弃牌堆，视为该角色使用一张【酒】',
		lihuo:'疠火',
		lihuo_info:'你可以将一张普通【杀】当火【杀】使用。若以此法使用的【杀】造成了伤害，则此【杀】结算后你失去1点体力；你使用火【杀】指定目标后，可以额外指定一个目标',
		shenduan:'慎断',
		shenduan_info:'当你的黑色基本牌因弃置而进入弃牌堆时，你可以将之视为 【兵粮寸断】并置于一名其他角色的判定区里',
		yonglve:'勇略',
		yonglve_info:'你攻击范围内的一名其他角色的判定阶段开始时，你可以弃置其判定区里的一张牌，视为对该角色使用一张【杀】。若此【杀】未造成伤害，你摸一张牌',
		benxi:'奔袭',
		benxi_info:'锁定技，在你的回合内，你每使用一次牌后，你计算与其他角色的距离便减少1，直到回合结束；你的回合内，若你与所有角色的距离均为1，你无视其他角色的防具，且你使用的【杀】可额外指定一个目标',
		sidi:'司敌',
		sidi2:'司敌',
		sidi3:'司敌',
		sidi_info:'每当你使用或其他角色在你的回合内使用闪时，你可以将牌堆顶的一张牌正面向上置于你的武将牌上；一名其他角色的出牌阶段开始时，你可以将你武将牌上的一张牌置入弃牌堆，然后该角色本阶段可使用杀的次数上限-1',
		dangxian:'当先',
		dangxian_info:'锁定技，回合开始时，你执行一个额外的出牌阶段',
		longyin:'龙吟',
		longyin_info:'每当一名角色在其出牌阶段使用【杀】时，你可弃置一张牌令此【杀】不计入出牌阶段使用次数，若此【杀】为红色，你摸一张牌',
		zhongyong:'忠勇',
		zhongyong_info:'当你于出牌阶段内使用的【杀】被目标角色使用的【闪】抵消时，你可以将此【闪】交给除该角色外的一名角色。若获得此【闪】的角色不是你，你可以对相同的目标再使用一张【杀】',
		jigong:'急攻',
		jigong_info:'出牌阶段开始时，你可以摸两张牌。若如此做，此回合你的手牌上限改为X(X为你此阶段造成的伤害数)',
		shifei:'饰非',
		shifei_info:'当你需要使用或打出【闪】时，你可以令当前回合角色摸一张牌，然后若其手牌数不为全场最多，则你弃置全场手牌数最多（或之一）角色的一张牌，视为你使用或打出了一张【闪】',
		huaiyi:'怀异',
		huaiyi_info:'出牌阶段限一次，你可以展示所有手牌，若其中包含不止一种颜色，则你选择一种颜色并弃置该颜色的所有手牌，然后你可以获得至多X名角色的各一张牌（X为你以此法弃置的手牌数）。若你以此法获得的牌不少于两张，则你失去1点体力',
		yaoming:'邀名',
		yaoming_info:'每回合限一次，当你造成或受到伤害后，你可以选择一项：1. 弃置手牌数大于你的一名角色的一张手牌；2. 令手牌数小于你的一名角色摸一张牌',
		anguo:'安国',
		anguo_info:'出牌阶段限一次，你可以选择一名其他角色装备区里的一张牌，令其将此牌收回手牌。然后若该角色攻击范围内的角色数因此减少，则你摸一张牌',
		yanzhu:'宴诛',
		yanzhu_info:'出牌阶段限一次，你可以令一名有牌的其他角色选择一项：令你获得其装备区里所有的牌，然后你失去技能“宴诛”，直到游戏结束；或弃置一张牌',
		xingxue:'兴学',
		xingxue_info:'结束阶段开始时，你可以令至多X名角色依次摸一张牌并将一张牌置于牌堆顶（X为你的体力值）；若你已失去技能“宴诛”，则将X改为你的体力上限',
		zhaofu:'诏缚',
		zhaofu_info:'主公技，锁定技，你距离为1的角色视为在其他吴势力角色的攻击范围内',
		wurong:'怃戎',
		wurong_info:'出牌阶段限一次，你可以令一名其他角色与你同时展示一张手牌：若你展示的是【杀】且该角色展示的不是【闪】，则你弃置此【杀】并对其造成1点伤害；若你展示的不是【杀】且该角色展示的是【闪】，则你弃置你展示的牌并获得其一张牌',
		shizhi:'矢志',
		shizhi_info:'锁定技，当你体力为1时，你的【闪】均视为【杀】',
		zhanjue:'战绝',
		zhanjue_info:'出牌阶段，你可以将所有手牌当【决斗】使用，结算后你和以此法受到伤害的角色各摸一张牌。若你在同一阶段内以此法摸了两张或更多的牌，则此技能失效直到回合结束',
		qinwang:'勤王',
		qinwang1:'勤王',
		qinwang2:'勤王',
		qinwang_info:'主公技，你可以弃置一张牌，然后视为你发动“激将”。若有角色响应，则该角色打出【杀】时摸一张牌',
		huomo:'活墨',
		huomo_sha:'墨杀',
		huomo_shan:'墨闪',
		huomo_tao:'墨桃',
		huomo_jiu:'墨酒',
		huomo_info:'在出牌或濒死阶段，每当你需要使用一张本回合内未使用过的基本牌时，你可以将一张黑色非基本牌置于牌堆顶，然后视为你使用了此基本牌',
		zuoding:'佐定',
		zuoding_info:'每当一名其他角色于其出牌阶段内使用♠牌指定目标后，若此阶段没有角色受到过伤害，则你可以令其中一名目标角色摸一张牌',
		taoxi:'讨袭',
		taoxi2:'讨袭',
		taoxi3:'讨袭',
		taoxi_info:'出牌阶段限一次，你使用牌指定一名其他角色为唯一目标后，你可以亮出其一张手牌直到回合结束，并且你可以于此回合内将此牌如手牌般使用。回合结束时，若该角色未失去此手牌，则你须弃置一张牌',
		huituo:'恢拓',
		huituo_info:'每当你受到伤害后，你可以令一名角色进行一次判定，若结果为红色，该角色回复1点体力；若结果为黑色，该角色摸X张牌（X为此次伤害的伤害数）',
		mingjian:'明鉴',
		mingjian2:'明鉴',
		mingjian_info:'出牌阶段限一次，你可以将所有手牌交给一名其他角色，若如此做，该角色于其下个回合的手牌上限+1，且出杀的次数上限+1',
		xingshuai:'兴衰',
		xingshuai_info:'主公技，限定技，当你进入濒死状态时，其他魏势力角色可依次令你回复1点体力，然后这些角色依次受到1点伤害',
		duodao:'夺刀',
		duodao_info:'每当你受到杀造成的一次伤害后，你可以弃置一张牌，然后获得伤害来源装备区里的武器牌',
		anjian:'暗箭',
		anjian_info:'当你使用的杀对目标角色造成伤害时，若你不在其攻击范围内，则此杀伤害+1',
		xinpojun:'破军',
		xinpojun2:'破军',
		xinpojun_info:'当你于出牌阶段内使用【杀】指定一个目标后，你可以将其至多X张牌扣置于该角色的武将牌旁（X为其体力值）。若如此做，当前回合结束后，该角色获得其武将牌旁的所有牌。',

		qiaoshi:'樵拾',
		qiaoshi_info:'其他角色的结束阶段开始时，若你的手牌数与其相等，则你可以与其各摸一张牌。',
		yanyu:'燕语',
		yanyu2:'燕语',
		yanyu_info:'出牌阶段，你可以重铸【杀】。出牌阶段结束时，若你于此阶段以此法重铸了至少两张【杀】，则你可以令一名男性角色摸两张牌。',

		zzhenggong:'争功',
		zzhenggong_info:'你每受到一次伤害，可以获得伤害来源装备区中的一张牌并立即放入你的装备区。',
		zquanji:'权计',
		zquanji_info:'其他角色的回合即将开始时，你可以与该角色进行一次拼点。若你赢，该角色跳过回合开始阶段及判定阶段。',
		zbaijiang:'拜将',
		zbaijiang_info:'觉醒技，回合开始阶段若你的装备区的装备牌为两张或更多时，你必须增加1点体力上限，失去技能【权计】和【争功】并获得技能【野心】和【自立】。',
		zyexin:'野心',
		zyexin2:'野心',
		zyexin_info:'你每造成或受到一次伤害，可将牌堆顶的一张牌放置在武将牌上，称为“权”。出牌阶段，你可以用任意数量的手牌与等量的“权”交换，每阶段限一次。',
		zzili:'自立',
		zzili_info:'觉醒技，回合开始阶段，若你的“权”为四张或更多时，你必须减1点体力上限，并永久获得技能“排异”。',
		zpaiyi:'排异',
		zpaiyi_info:'回合结束阶段，将一张“权”移动到任何合理的区域，若不是你的区域，你可以摸一张牌',
		shibei:'矢北',
		shibei_info:'锁定技，每当你受到一次伤害，需进行一次判定，若结果为红色且是你回合内受到的第一次伤害，你回复一点体力；若结果为黑色且你在本回合内受到过不止一次伤害，你失去一点体力',
		jianying:'渐营',
		jianying_info:'每当你于出牌阶段内使用的牌与此阶段你使用的上一张牌点数或花色相同时，你可以摸一张牌',
		xinenyuan:'恩怨',
		xinenyuan_info:'每当你受到1点伤害后，你可以令伤害来源选择一项：交给你一张手牌，或失去1点体力。',
		xinxuanhuo:'眩惑',
		xinxuanhuo_info:'摸牌阶段开始时，你可以放弃摸牌并选择一名其他角色，改为令其摸两张牌，然后该角色需对其攻击范围内你选择的另一名角色使用一张杀，若其未如此做或其攻击范围内没有使用杀的目标，你获得其两张牌，然后其摸一张牌',
		fuhun:'父魂',
		fuhun2:'父魂',
		fuhun_info:'你可以将两张手牌当杀使用或打出；出牌阶段，若你以此法使用的杀造成了伤害，你获得技能“武圣”、“咆哮”直到回合结束。',
		yuce:'御策',
		yuce_info:'每当你受到一次伤害，可以弃置一张手牌，并令伤害来源选择一项：弃置一张相同类型的手牌并令你摸一张牌，或令你回复一点体力',
		xiansi:'陷嗣',
		xiansi_bg:'逆',
		xiansi2:'陷嗣',
		xiansi_info:'准备阶段开始时，你可以将一至两名角色的各一张牌置于你的武将牌上，称为“逆”；每当一名角色需要对你使用杀时，该角色可以将两张“逆”置入弃牌堆，视为对你使用一张杀。',
		chanhui:'谮毁',
		chanhui_info:'出牌阶段限一次，当你使用【杀】或黑色非延时类锦囊牌指定唯一目标时，你可令可以成为此牌目标的另一名其他角色选择一项：交给你一张牌并成为此牌的使用者;或成为此牌的额外目标。',
		jiaojin:'骄矜',
		jiaojin_info:'每当你受到一名男性角色造成的伤害时，你可以弃置一张装备牌，令此伤害-1。',
		shenxing:'慎行',
		shenxing_info:'出牌阶段，你可以弃置两张牌，然后摸一张牌。',
		bingyi:'秉壹',
		bingyi_info:'结束阶段开始时，你可以展示所有手牌，若均为同一颜色，则你令至多X名角色各摸一张牌(X为你的手牌数)。',
		qiangzhi:'强识',
		qiangzhi2:'强识',
		qiangzhi_info:'出牌阶段开始时，你可以展示一名其他角色的一张手牌。若如此做，每当你于此阶段内使用与此牌类别相同的牌时，你可以摸一张牌。',
		xiantu:'献图',
		xiantu2:'献图',
		xiantu3:'献图',
		xiantu_info:'一名其他角色的出牌阶段开始时，你可以摸两张牌，然后交给其两张牌。若如此做，此阶段结束时，若该角色未于此阶段内杀死过一名角色，则你失去1点体力。',
		dingpin:'定品',
		dingpin_info:'出牌阶段限三次，你可以弃置一张手牌，然后令一名已受伤的角色进行一次判定，若结果为黑色，该角色摸X张牌(X为该角色已损失的体力值)，然后你本回合不能再对其发动“定品”；若结果为红色，将你的武将牌翻面。',
		faen:'法恩',
		faen_info:'每当一名角色的武将牌翻面或横置时，你可以令其摸一张牌。',
		jyzongshi:'纵适',
		jyzongshi_info:'每当你成为其他角色的非延时锦囊牌的目标时，若你是此锦囊的唯一目标，你可以摸一张牌',
		qiaoshui:'巧说',
		qiaoshui_info:'出牌阶段开始时，你可以与一名其他角色拼点。若你赢，你获得对方的拼点牌，且本回合内使用的下一张基本牌或非延时锦囊牌能额外（无距离限制）指定一个目标；若你没赢，你收回拼点牌且本回合不能使用锦囊牌',
		junxing:'峻刑',
		junxing_info:'出牌阶段限一次，你可以弃置至少一张手牌并选择一名其他角色，该角色需弃置一张与你弃置的牌类别均不同的手牌，否则其先将其武将牌翻面再摸X张牌（X为你以此法弃置的手牌数量）。',

		wuyan:'无言',
		xinwuyan:'无言',
		jujian:'举荐',
		xinjujian:'举荐',
		luoying:'落英',
		luoying1:'落英',
		luoying2:'落英',
		luoying2_noconf:'落英·判定',
		jiushi:'酒诗',
		jiushi1:'酒诗',
		jiushi2:'酒诗',
		jiushi3:'酒诗',
		jueqing:'绝情',
		shangshi:'伤逝',
		xuanfeng:'旋风',
		zhiyu:'智愚',
		qice:'奇策',
		qice_backup:'奇策',
		jiangchi:'将弛',
		jiangchi_less:'少摸一张',
		jiangchi_more:'多摸一张',
		zishou:'自守',
		zongshi:'宗室',
		shiyong:'恃勇',
		shiyong2:'恃勇',
		danshou:'胆守',
		yizhong:'毅重',
		xinzhan:'心战',
		xinzhan_gain:'获得',
		xinzhan_place:'牌堆顶',
		huilei:'挥泪',
		enyuan:'恩怨',
		enyuan1:'恩怨',
		enyuan2:'恩怨',
		xuanhuo:'眩惑',
		ganlu:'甘露',
		buyi:'补益',
		mingce:'明策',
		zhichi:'智迟',
		zhichi2:'智迟',
		pojun:'破军',
		jingce:'精策',
		chengxiang:'称象',
		renxin:'仁心',
		zhenlie:'贞烈',
		miji:'秘计',
		zhiyan:'直言',
		zongxuan:'纵玄',
		anxu:'安恤',
		zhuiyi:'追忆',
		gongji:'弓骑',
		qiuyuan:'求援',
		zhuikong:'惴恐',
		qieting:'窃听',
		xianzhou:'献州',
		quanji:'权计',
		zili:'自立',
		paiyi:'排异',
		sanyao:'散谣',
		zhiman:'制蛮',
		yaowu:'耀武',
		qianxi:'潜袭',
		qianxi2:'潜袭',
		fuli:'伏枥',
		jiefan:'解烦',
		juece:'绝策',
		mieji:'灭计',
		fencheng:'焚城',
		youdi:'诱敌',
		youdi_info:'结束阶段开始时，你可以令一名其他角色弃置你的一张牌，若此牌不为【杀】，你获得该角色的一张牌。',
		fencheng_info:'限定技。出牌阶段，你可令所有其他角色依次选择一项：弃置X张牌；或受到1点火焰伤害。(X为该角色装备区里牌的数量且至少为1)',
		mieji_info:'你使用黑色非延时类锦囊牌仅指定一个目标后，可以额外指定一个目标',
		juece_info:'每当一名其他角色在你回合内失去最后一张手牌，你可以对其造成一点伤害',
		jiefan_info:'限定技，出牌阶段，你可以选择一名角色，令攻击范围内含有该角色的所有角色各选择一项：1.弃置一张武器牌；2.令其摸一张牌。',
		fuli_info:'限定技，当你处于濒死状态时，可以将体力回复至体力上限，然后翻面',
		qianxi_info:'回合开始阶段开始时，你可以进行一次判定，然后令一名距离为1的角色不能使用或打出与判定结果颜色相同的手牌，直到回合结束。',
		yaowu_info:'锁定技，当任意一名角色使用红色【杀】对你造成伤害时，该角色回复1点体力或摸一张牌。',
		zhiman_info:'当你对一名其他角色造成伤害时，你可以防止此伤害，然后获得其装备区或判定区的一张牌。',
		sanyao_info:'出牌阶段限一次，你可以弃置一张牌并指定一名体力最多(或之一)的角色，你对其造成1点伤害。',
		paiyi_info:'出牌阶段限一次，你可以将一张“权”置入弃牌堆并选择一名角色，令其摸两张牌，然后若其手牌多于你，你对其造成1伤害。',
		zili_info:'觉醒技，准备阶段开始时，若“权”的数量不小于3，你减1点体力上限，选择一项：1、回复1点体力；2、摸两张牌。然后你获得“排异”。',
		quanji_info:'每当你受到1点伤害后，你可以可摸一张牌，然后将一张手牌置于武将牌上，称为“权”；你的手牌上限+X（X为“权”的数量）。',
		xianzhou_info:'限定技。出牌阶段，你可以将装备区里的所有牌交给一名其他角色，然后该角色选择一项：令你回复X点体力;或对其攻击范围内的X名角色各造成1点伤害(X为你以此法交给该角色的牌的数量)。',
		qieting_info:'一名其他角色的回合结束时，若其未于此回合内使用过指定另一名角色为目标的牌，你可以选择一项：将其装备区里的一张牌移动至你装备区里的相应位置（可替换原装备）；或摸一张牌。',
		zhuikong_info:'一名其他角色的回合开始时，若你已受伤，你可以与该角色拼点，若你赢，该角色本回合使用的牌不能指定除该角色外的角色为目标',
		qiuyuan_info:'当你成为【杀】的目标时，你可以令另一名其他角色选择一项：①、交给你一张【闪】；②、成为此【杀】的额外目标。',
		gongji_info:'出牌阶段，你可以弃置一张牌，令你的攻击范围无限，直到回合结束，然后若你以此法弃置的牌为装备牌，你可以弃置一名其他角色的一张牌。每回合限一次。',
		zhuiyi_info:'你死亡时，可以令一名其他角色（杀死你的角色除外）摸三张牌，然后令其回复1点体力。',
		anxu_info:'出牌阶段限一次，你可以选择两名手牌数不同的其他角色，令其中手牌多的角色将一张手牌交给手牌少的角色，然后若这两名角色手牌数相等，你摸一张牌或回复1点体力',
		zongxuan_info:'每当你的牌被弃置，你可以将其按任意顺序置于牌堆顶',
		zhiyan_info:'回合结束阶段，你可以令一名角色摸一张并展示之，若是装备牌，其立即装备之并回复一点体力',
		miji_info:'回合结束阶段，若你已受伤，可以摸X张牌，然后可以将等量的牌交给一名其他角色，X为你已损失的体力值',
		zhenlie_info:'每当你成为其他角色的卡牌的目标时，你可以流失一点体力取消之，然后弃置对方一张牌',
		chengxiang_info:'每当你受到一次伤害后，你可以亮出牌堆顶的四张牌。然后获得其中任意数量点数之和小于13的牌，将其余的牌置入弃牌堆。',
		renxin_info:'每当体力值为1的一名其他角色受到伤害时，你可以将武将牌翻面并弃置一张装备牌，然后防止此伤害。',
		jingce_info:'出牌阶段结束时，若你本回合使用的牌数量大于或等于你当前体力值，你可以摸两张牌。',
		wuyan_info:'锁定技，你使用的非延迟类锦囊对其他角色无效;其他角色使用的非延迟类锦囊对你无效。',
		xinwuyan_info:'锁定技，每当锦囊牌造成伤害时，若你为伤害来源，你防止此伤害；锁定技，每当你受到锦囊牌对你造成的伤害时，你防止此伤害。',
		jujian_info:'出牌阶段，你可以弃至多三张牌，然后让一名其他角色摸等量的牌。若你以此法弃牌不少于三张且均为同一类别，你回复1点体力。每回合限一次。',
		xinjujian_info:'回合结束阶段开始时，你可以弃置一张非基本牌并选择一名其他角色，令其选择一项：1.摸两张牌；2.回复1点体力；3.将其武将牌翻转至正面朝上并重置之。',
		luoying_info:'当其他角色的梅花牌，因弃牌或判定而进入弃牌堆时，你可以获得之。',
		jiushi_info:'若你的武将牌正面朝上，你可以(在合理的时机)将你的武将牌翻面来视为使用一张【酒】;当你的武将牌背面朝上时你受到伤害，你可在伤害结算后将之翻回正面。',
		jueqing_info:'锁定技，你即将造成的伤害均视为失去体力。',
		shangshi_info:'锁定技，当你的手牌数小于X时，你立即将手牌补至X张（X为你已损失的体力值且最多为3）',
		xuanfeng_info:'当你失去装备区里的牌时，或于弃牌阶段弃置了两张或更多的手牌后，你可以依次弃置一至两名其他角色的共计两张牌。',
		zhiyu_info:'每当你受到一次伤害后，你可以摸一张牌，然后展示所有手牌，若颜色均相同，伤害来源弃置一张手牌。',
		qice_info:'出牌阶段，你可以将所有的手牌（至少一张）当做任意一张非延时性锦囊牌使用，每阶段限一次。',
		jiangchi_info:'摸牌阶段摸牌时，你可以选择一项：1、额外摸一张牌，若如此做，你不能使用或打出【杀】，直到回合结束。 2、少摸一张牌，若如此做，出牌阶段你使用【杀】无距离限制且你可以额外使用一张【杀】，直到回合结束。',
		zishou_info:'摸牌阶段摸牌时，你可以额外摸X张牌（X为现存势力数）。若如此做，你于本回合出牌阶段内使用的牌不能指定其他角色为目标。',
		zongshi_info:'锁定技，场上每有一种势力，你的手牌上限便＋1。',
		shiyong_info:'锁定技，每当你受到一次红色【杀】或【酒】【杀】造成的伤害后，你减1点体力上限。',
		danshou_info:'出牌阶段，你可以选择你攻击范围内的一名其他角色，然后弃置X张牌（X为此前你于此阶段你发动“胆守”的次数+1）。若X：为1，你弃置该角色的一张牌；为2，令该角色交给你一张牌；为3，你对该角色造成1点伤害；不小于4，你与该角色各摸两张牌。',
		danshou_infox:'每当你造成一次伤害后，你可以摸一张牌。若如此做，终止一切结算，当前回合结束。',
		yizhong_info:'锁定技，当你没有防具时，黑色的杀对你无效',
		xinzhan_info:'出牌阶段限一次，你可以观看牌堆顶的3张牌，然后展示其中任意数量♥的牌并获得之',
		huilei_info:'锁定技，杀死你的角色立即弃置所有的牌。',
		enyuan_info:'锁定技，其他角色每令你回复一点体力，该角色摸一张牌;其他角色每对你造成一次伤害，须给你一张♥手牌，否则该角色失去1点体力。',
		xuanhuo_info:'出牌阶段限一次，你可以将一张红桃手牌交给一名其他角色，获得该角色的一张牌，然后交给除该角色外的一名其他角色',
		ganlu_info:'出牌阶段，你可以选择两名角色，交换他们装备区里的所有牌。以此法交换的装备数差不能超过X(X为你已损失体力值)。每回合限一次。',
		buyi_info:'当有角色进入濒死状态时，你可以展示该角色的一张手牌：若此牌不为基本牌，则该角色弃掉这张牌并回复1点体力。',
		mingce_info:'出牌阶段，你可以交给任一其他角色一张装备牌或【杀】，该角色进行二选一：1. 视为对其攻击范围内的另一名由你指定的角色使用一张【杀】。2. 摸一张牌。每回合限一次。',
		zhichi_info:'锁定技，你的回合外，你每受到一次伤害，任何【杀】或非延时类锦囊均对你无效，直到该回合结束。',
		zhichi2_info:'智迟已发动',
		pojun_info:'你每使用【杀】造成一次伤害，可令受到该伤害的角色多摸X张牌，X为改角色当前的体力值(X最多为5)，然后该角色将其武将牌翻面。',
	},
}
