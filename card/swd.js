card.swd={
	card:{
		mujiaren:{
			fullskin:true,
			enable:true,
			type:'jiguan',
			usable:1,
			forceUsable:true,
			wuxieable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player;
			},
			content:function(){
				'step 0'
				var cards=player.get('h',function(card){
					return get.type(card)!='basic';
				});
				if(cards.length){
					player.lose(cards)._triggered=null;
				}
				event.num=1+cards.length;
				'step 1'
				var cards=[];
				var list=[];
				for(var i in lib.card){
					if(lib.card[i].type=='jiguan') list.push(i);
				}
				if(list.length){
					for(var i=0;i<event.num;i++){
						cards.push(game.createCard(list.randomGet()));
					}
					player.directgain(cards);
				}
			},
			ai:{
				wuxie:function(){
					return 0;
				},
				order:1,
				result:{
					target:1
				}
			}
		},
		zhiluxiaohu:{
			enable:function(card,player){
				return lib.filter.filterCard({name:'sha'},player);
			},
			fullskin:true,
			type:'jiguan',
			wuxieable:true,
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				var targets=player.getEnemies();
				if(targets.length){
					var target=targets.randomGet();
					target.addExpose(0.2);
					player.useCard({name:'sha'},target);
				}
				'step 1'
				player.draw();
			},
			ai:{
				result:{
					target:1
				},
				order:3.1
			}
		},
		xuejibingbao:{
			enable:true,
			fullskin:true,
			type:'basic',
			filterTarget:function(card,player,target){
				return !target.hasSkill('xuejibingbao');
			},
			content:function(){
				target.storage.xuejibingbao=2;
				target.addSkill('xuejibingbao');
			},
			ai:{
				order:2,
				value:6,
				result:{
					target:function(player,target){
						var num=1;
						if(target.hp<2) num=0.5;
						return num/Math.sqrt(Math.max(1,target.num('h')));
					}
				}
			}
		},
		gouhunluo:{
			enable:true,
			fullskin:true,
			type:'jiguan',
			wuxieable:true,
			filterTarget:function(card,player,target){
				return !target.hasSkill('gouhunluo');
			},
			content:function(){
				target.storage.gouhunluo=3;
				target.storage.gouhunluo2=player;
				target.addSkill('gouhunluo');
			},
			ai:{
				order:2,
				value:5,
				result:{
					target:function(player,target){
						return -1/Math.max(1,target.hp);
					}
				}
			}
		},
		zhuquezhizhang:{
			type:'jiqi',
			fullskin:true,
			ai:{
				value:8,
				useful:6.5,
			}
		},
		xuanwuzhihuang:{
			type:'jiqi',
			fullskin:true,
			ai:{
				value:8,
				useful:6.5,
			}
		},
		huanglinzhicong:{
			type:'jiqi',
			fullskin:true,
			ai:{
				value:8,
				useful:6.5,
			}
		},
		cangchizhibi:{
			type:'jiqi',
			fullskin:true,
			ai:{
				value:8,
				useful:6.5,
			}
		},
		qinglongzhigui:{
			type:'jiqi',
			fullskin:true,
			ai:{
				value:8,
				useful:6.5,
			}
		},
		baishouzhihu:{
			type:'jiqi',
			fullskin:true,
			ai:{
				value:8,
				useful:6.5,
			}
		},
		jiguantong:{
			fullskin:true,
			type:'jiguan',
			enable:true,
			wuxieable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				"step 0"
				if(target.num('h')){
					var next=target.chooseToDiscard('机关火筒：弃置一张手牌或受到一点火焰伤害');
					next.set('ai',function(card){
						var evt=_status.event.getParent();
						if(ai.get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
						return 8-ai.get.useful(card);
					});
				}
				else{
					target.damage('fire');
					event.parent.preResult=true;
					event.finish();
				}
				"step 1"
				if(result.bool==false){
					target.damage('fire');
					event.parent.preResult=true;
				}
			},
			contentAfter:function(){
				if(!event.preResult) player.draw();
			},
			ai:{
				wuxie:function(target,card,player,viewer){
					if(ai.get.attitude(viewer,target)>0){
						if(target.num('h')>0||target.hp>1) return 0;
					}
				},
				basic:{
					order:9,
					useful:1
				},
				result:{
					target:function(player,target){
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0) num++;
						}
						if(num>1) return 0;
						var nh=target.num('h');
						if(get.mode()=='identity'){
							if(target.isZhu&&nh<=1&&target.hp<=1) return -100;
						}
						if(nh==0) return -1;
						if(nh==1) return -0.7
						return -0.5;
					},
				},
				tag:{
					discard:1,
					loseCard:1,
					damage:1,
					natureDamage:1,
					fireDamage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		donghuangzhong:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['donghuangzhong'],
			ai:{
				equipValue:6
			}
		},
		xuanyuanjian:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			skills:['xuanyuanjian','xuanyuanjian2','xuanyuanjian3'],
			enable:function(card,player){
				return player.hasSkill('xuanyuan')||player.hp>2;
			},
			distance:{attackFrom:-3},
			onEquip:function(){
				if(!player.hasSkill('xuanyuan')&&player.hp<=2){
					player.discard(card);
				}
			},
			ai:{
				equipValue:9
			}
		},
		pangufu:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			skills:['pangufu'],
			distance:{attackFrom:-3},
			ai:{
				equipValue:8
			}
		},
		lianyaohu:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			ai:{
				equipValue:8
			},
			skills:['lianhua','shouna']
		},
		haotianta:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['haotianta'],
			ai:{
				equipValue:5
			}
		},
		fuxiqin:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['kongxin'],
			ai:{
				equipValue:6
			}
		},
		shennongding:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['shennongding'],
			ai:{
				equipValue:6
			}
		},
		kongdongyin:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['kongdongyin'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.hp==2) return 7;
						if(player.hp==1) return 10;
						return 5;
					}
				}
			}
		},
		kunlunjingc:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['kunlunjingc'],
			ai:{
				equipValue:6
			}
		},
		nvwashi:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['nvwashi'],
			ai:{
				equipValue:5
			}
		},
		guisheqi:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:true,
			content:function(){
				target.changeHujia();
			},
			ai:{
				basic:{
					order:5,
					useful:3,
					value:6
				},
				result:{
					target:function(player,target){
						return 2/Math.max(1,Math.sqrt(target.hp));
					},
				},
			}
		},
		jiguanfeng:{
			fullskin:true,
			type:'jiguan',
			enable:true,
			wuxieable:true,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				"step 0"
				var next=target.chooseToRespond({name:'shan'});
				next.autochoose=lib.filter.autoRespondShan;
				"step 1"
				if(result.bool==false){
					target.damage();
				}
				else{
					event.finish();
				}
				"step 2"
				if(target.isAlive()){
					target.loseHp();
					player.loseHp();
				}
			},
			ai:{
				basic:{
					order:9,
					useful:3,
					value:6.5,
				},
				result:{
					player:function(player,target){
						if(ai.get.attitude(player,target)>=0){
							return -10;
						}
						if(player.hp==1) return -2;
						return -0.5;
					},
					target:-2,
				},
				tag:{
					respond:1,
					respondShan:1,
					damage:1,
				}
			}
		},
		jiguanyuan:{
			fullskin:true,
			type:'jiguan',
			wuxieable:true,
			enable:function(card,player){
				var hs=player.get('he');
				return hs.length>1||(hs.length==1&&hs[0]!=card);
			},
			filterTarget:function(card,player,target){
				return target!=player&&!target.hasSkill('jiguanyuan');
			},
			content:function(){
				'step 0'
				if(player.num('he')){
					player.chooseCard(true,'he');
				}
				else{
					event.finish();
				}
				'step 1'
				player.$throw(result.cards);
				player.lose(result.cards,ui.special);
				ui.special.appendChild(cards[0]);
				event.togive=[cards[0],result.cards[0]];
				game.delay();
				'step 2'
				// target.gain(event.togive).delay=false;
				target.$gain2(event.togive);
				target.storage.jiguanyuan=event.togive;
				target.addSkill('jiguanyuan');
				game.log(target,'从',player,'获得了',event.togive);
				player.draw();
			},
			ai:{
				basic:{
					order:2,
					useful:2,
					value:7
				},
				result:{
					target:function(player,target){
						var players=[];
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player&&!game.players[i].isTurnedOver()&&
								ai.get.attitude(player,game.players[i])>=3&&ai.get.attitude(game.players[i],player)>=3){
								players.push(game.players[i]);
							}
						}
						players.sort(lib.sort.seat);
						if(target==players[0]) return 2;
						return 0.5;
					},
				},
			}
		},
		fengyinzhidan:{
			fullskin:true,
			type:'trick',
			enable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player;
			},
			modTarget:true,
			content:function(){
				var list=[];
				for(var i in lib.card){
					if(lib.card[i].derivation){
						list.push(i);
					}
				}
				if(list.length){
					target.gain(game.createCard(list.randomGet()),'draw');
				}
			},
			ai:{
				basic:{
					order:7.3,
					useful:2,
					value:6
				},
				result:{
					target:2,
				},
			}
		},
		qinglianxindeng:{
			fullskin:true,
			type:'equip',
			subtype:'equip2',
			skills:['qinglianxindeng'],
			ai:{
				basic:{
					equipValue:8
				}
			},
		},
		lingjiandai:{
			fullskin:true,
			enable:true,
			type:'jiguan',
			wuxieable:true,
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			modTarget:true,
			content:function(){
				var list=get.typeCard('hslingjian');
				if(list.length){
					list=list.randomGets(3);
					for(var i=0;i<list.length;i++){
						list[i]=game.createCard(list[i]);
					}
				}
				target.gain(list,'gain2');
			},
			ai:{
				order:10,
				result:{
					target:function(player,target){
						if(target==player&&target.num('h',{type:'equip'})) return 2.5;
						return 1;
					}
				}
			}
		},
		jiguanshu:{
			fullskin:true,
			enable:true,
			type:'jiguan',
			wuxieable:true,
			filterTarget:function(card,player,target){
				var es=target.get('e');
				for(var i=0;i<es.length;i++){
					if(lib.inpile.contains(es[i].name)) return true;
				}
				return false;
			},
			content:function(){
				var es=target.get('e');
				var list=get.typeCard('hslingjian');
				var cards=[];
				var time=0;
				target.clearEquipTrigger();
				for(var i=0;i<es.length;i++){
					if(lib.inpile.contains(es[i].name)){
						var card=game.createCard(list.randomGet());
						cards.push(card);
						time+=200;
						setTimeout((function(card,name){
							return function(){
								ui.discardPile.appendChild(game.createCard(card));
								card.init([card.suit,card.number,name,card.nature]);
								card.style.transform='scale(1.1)';
								card.classList.add('glow');
								var info=get.info(card);
			                    if(info.skills){
			                        for(var i=0;i<info.skills.length;i++){
			                            target.addSkillTrigger(info.skills[i]);
			                        }
			                    }
								setTimeout(function(){
									card.style.transform='';
									card.classList.remove('glow');
								},500);
							}
						}(es[i],lib.skill._lingjianduanzao.process([card,es[i]]))),i*200);
					}
				}
				target.$gain2(cards);
				game.delay(0,time)
			},
			ai:{
				order:7.5,
				result:{
					target:function(player,target){
						var es=target.get('e');
						var num=0;
						for(var i=0;i<es.length;i++){
							if(lib.inpile.contains(es[i].name)) num++;
						}
						return num;
					}
				}
			}
		},
		jiguanyaoshu:{
			fullskin:true,
			enable:true,
			type:'jiguan',
			range:{global:1},
			wuxieable:true,
			filterTarget:function(card,player,target){
				return !target.hasSkill('jiguanyaoshu_skill');
			},
			content:function(){
				var card=game.createCard(get.inpile('equip').randomGet());
				target.$gain2(card);
				target.equip(card);
				target.addSkill('jiguanyaoshu_skill');
				game.delay();
			},
			ai:{
				wuxie:function(){
					return 0;
				},
				order:10.1,
				result:{
					target:function(player,target){
						if(target.hasSkill('jiguanyaoshu_skill')) return 0.5;
						return 1;
					}
				}
			}
		},
		hslingjian_xuanfengzhiren:{
			type:'hslingjian',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:true,
			derivationpack:'swd',
			filterTarget:function(card,player,target){
				return target.num('he')>0;
			},
			content:function(){
				target.discard(target.get('he').randomGet());
			},
			ai:{
				order:6.5,
				result:{
					target:-1,
				},
				useful:[2,0.5],
				value:[2,0.5],
			}
		},
		hslingjian_zhongxinghujia:{
			type:'hslingjian',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:true,
			derivationpack:'swd',
			filterTarget:true,
			content:function(){
				'step 0'
				var list=[];
				for(var i=0;i<lib.inpile.length;i++){
					if(lib.card[lib.inpile[i]].subtype=='equip2'){
						list.push(lib.inpile[i]);
					}
				}
				if(list.length){
					var card=game.createCard(list.randomGet());
					target.$draw(card);
					game.delay();
					target.equip(card);
				}
				'step 1'
				var hs=target.get('h');
				if(hs.length){
					target.discard(hs.randomGet());
				}
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(target.get('e','2')){
							if(target.num('h')) return -0.6;
							return 0;
						}
						else{
							if(target.num('h')) return 0.5;
							return 1;
						}
					}
				},
				useful:[2,0.5],
				value:[2,0.5],
			}
		},
		hslingjian_xingtigaizao:{
			type:'hslingjian',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:true,
			derivationpack:'swd',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				target.draw();
				target.addSkill('hslingjian_xingtigaizao');
				if(typeof target.storage.hslingjian_xingtigaizao=='number'){
					target.storage.hslingjian_xingtigaizao++;
				}
				else{
					target.storage.hslingjian_xingtigaizao=1;
				}
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(target.num('h')<target.hp) return 1;
						return 0;
					}
				},
				useful:[2,0.5],
				value:[2,0.5],
			}
		},
		hslingjian_shijianhuisu:{
			type:'hslingjian',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:true,
			derivationpack:'swd',
			filterTarget:function(card,player,target){
				return target!=player&&target.num('e')>0;
			},
			content:function(){
				var es=target.get('e');
				target.gain(es);
				target.$gain2(es);
			},
			ai:{
				order:5,
				result:{
					target:function(player,target){
						if(target.hasSkillTag('noe')) return target.num('e')*2;
						return -target.num('e');
					}
				},
				useful:[2,0.5],
				value:[2,0.5],
				tag:{
					loseCard:1,
				}
			}
		},
		hslingjian_jinjilengdong:{
			type:'hslingjian',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:true,
			derivationpack:'swd',
			filterTarget:function(card,player,target){
				return !target.isTurnedOver()&&target!=player;
			},
			content:function(){
				target.draw(2);
				target.turnOver();
			},
			ai:{
				order:2,
				result:{
					target:-1,
				},
				useful:[2,0.5],
				value:[2,0.5],
			}
		},
		hslingjian_shengxiuhaojiao:{
			type:'hslingjian',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:true,
			derivationpack:'swd',
			filterTarget:function(card,player,target){
				return !target.hasSkill('hslingjian_chaofeng');
			},
			content:function(){
				target.addTempSkill('hslingjian_chaofeng',{player:'phaseBegin'});
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						if(get.distance(player,target,'absolute')<=1) return 0;
						if(target.num('h')<=target.hp) return -0.1;
						return -1;
					}
				},
				useful:[2,0.5],
				value:[2,0.5],
			}
		},
		hslingjian_yinmilichang:{
			type:'hslingjian',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:true,
			derivationpack:'swd',
			filterTarget:function(card,player,target){
				return player!=target&&!target.hasSkill('hslingjian_yinshen');
			},
			content:function(){
				target.addTempSkill('hslingjian_yinshen',{player:'phaseBegin'});
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						if(get.distance(player,target,'absolute')<=1) return 0;
						if(target.hp==1) return 2;
						if(target.hp==2&&target.num('h')<=2) return 1.2;
						return 1;
					}
				},
				useful:[2,0.5],
				value:[2,0.5],
			}
		},
		xingjunyan:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['xingjunyan'],
			ai:{
				basic:{
					equipValue:4
				},
			},
		},
		qinglonglingzhu:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['qinglonglingzhu'],
			ai:{
				basic:{
					equipValue:5
				},
			},
		},
		baihupifeng:{
			fullskin:true,
			type:"equip",
			subtype:"equip2",
			skills:['baihupifeng'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.hp<=2) return 8;
						return 6;
					}
				},
			},
		},
		fengxueren:{
			fullskin:true,
			type:"equip",
			subtype:"equip1",
			distance:{attackFrom:-1},
			skills:['fengxueren'],
			ai:{
				basic:{
					equipValue:5
				},
			},
		},
		chilongya:{
			fullskin:true,
			type:"equip",
			subtype:"equip1",
			distance:{attackFrom:-1},
			skills:['chilongya'],
			ai:{
				basic:{
					equipValue:4
				},
			},
		},
		daihuofenglun:{
			type:'equip',
			subtype:'equip4',
			fullskin:true,
			distance:{globalFrom:-2,globalTo:-1},
			ai:{
				basic:{
					equipValue:4
				},
			},
		},
		xiayuncailing:{
			type:'equip',
			subtype:'equip3',
			fullskin:true,
			distance:{globalFrom:1,globalTo:2},
		},
		shentoumianju:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['shentou'],
			ai:{
				basic:{
					equipValue:7,
				}
			}
		},
		pusafazhou:{
			type:'equip',
			subtype:'equip5',
			skills:['pusafazhou'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.hp==2) return 7;
						if(player.hp==1) return 9;
						return 5;
					}
				}
			}
		},
		xianluhui:{
			fullskin:true,
			type:'basic',
			enable:true,
			selectTarget:-1,
			multiline:true,
			filterTarget:function(card,player,target){
				return target.isDamaged();
			},
			content:function(){
				targets.sort(lib.sort.seat);
				var list=[];
				for(var i=0;i<targets.length;i++){
					list.push(Math.min(3,targets[i].maxHp-targets[i].hp));
				}
				game.asyncDraw(targets,list);
			},
			multitarget:true,
			ai:{
				tag:{
					multitarget:1,
				},
				basic:{
					order:7,
					useful:3,
					value:3,
				},
				result:{
					target:function(player,target){
						Math.min(3,target.maxHp-target.hp)
					},
				},
			}
		},
		xiangyuye:{
			type:'basic',
			enable:true,
			fullskin:true,
			filterTarget:function(card,player,target){
				return get.distance(player,target,'attack')>1;
			},
			content:function(){
				"step 0"
				if(!target.num('h',{color:'black'})){
					target.loseHp();
					event.finish();
				}
				else{
					target.chooseToDiscard({color:'black'},'弃置一张黑色手牌或受流失一点体力').ai=function(card){
						return 8-ai.get.value(card);
					};
				}
				"step 1"
				if(!result.bool){
					target.loseHp();
				}
			},
			ai:{
				basic:{
					order:9,
					value:3,
					useful:1,
				},
				result:{
					target:-2
				},
				tag:{
					discard:1,
					loseHp:1
				}
			}
		},
		caoyao:{
			fullskin:true,
			type:'basic',
			range:{global:1},
			enable:true,
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp;
			},
			content:function(){
				target.recover();
			},
			ai:{
				basic:{
					useful:[7,2],
					value:[7,2],
				},
				order:7,
				result:{
					target:2
				},
				tag:{
					recover:1,
				}
			}
		},
		huanpodan:{
			type:'basic',
			enable:function(){return game.dead.length>0},
			notarget:true,
			mode:['identity','guozhan'],
			fullskin:true,
			content:function(){
				"step 0"
				var list=[];
				for(var i=0;i<game.dead.length;i++){
					list.push(game.dead[i].name);
				}
				player.chooseButton(ui.create.dialog('选择要复活的角色',[list,'character']),function(button){
					for(var i=0;i<game.dead.length&&game.dead[i].name!=button.link;i++);
					return ai.get.attitude(_status.event.player,game.dead[i]);
				},true);
				"step 1"
				if(result.bool){
					for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
					var dead=game.dead[i];
					dead.revive(1);
					game.addVideo('revive',dead);
					event.dead=dead;
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.dead) event.dead.draw();
			},
			ai:{
				basic:{
					useful:[4,2],
					value:[7,2],
				},
				order:function(card,player){
					for(var i=0;i<game.dead.length;i++){
						if(ai.get.attitude(player,game.dead[i])>3) return 7;
					}
					return -10;
				},
				result:{
					player:function(player){
						for(var i=0;i<game.dead.length;i++){
							if(ai.get.attitude(player,game.dead[i])>3) return 2;
						}
						return -10;
					}
				},
			}
		},
		pantao:{
			type:'basic',
			enable:function(card,player){
				return player.hp<player.maxHp;
			},
			savable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player;
			},
			content:function(){
				target.recover(2);
			},
			ai:{
				order:7,
				basic:{
					useful:[10,6],
					value:[10,6],
				},
				result:{
					target:function(player,target){
						if(target.get('h').length<=target.hp) return 0;
						return 2;
					},
				},
				tag:{
					recover:2,
					save:2
				}
			}
		},
		tianxianjiu:{
			fullskin:true,
			type:'basic',
			enable:true,
			savable:function(card,player){
				return _status.event.dying==player;
			},
			usable:1,
			selectTarget:-1,
			logv:false,
			modTarget:true,
			filterTarget:function(card,player,target){
				return target==player;
			},
			content:function(){
				"step 0"
				if(target==_status.event.getParent(2).dying) target.recover();
				else{
					target.addTempSkill('tianxianjiu',['phaseAfter','shaAfter']);
					if(target==targets[0]&&card.clone&&(card.clone.parentNode==player.parentNode||card.clone.parentNode==ui.arena)){
						card.clone.moveDelete(target);
						game.addVideo('gain2',target,get.cardsInfo([card]));
					}
				}
			},
			ai:{
				basic:{
					useful:function(card,i){
						if(_status.event.player.hp>1){
							if(i==0) return 5;
							return 1;
						}
						if(i==0) return 7.3;
						return 3;
					},
					value:function(card,player){
						if(player.hp>1){
							if(i==0) return 5;
							return 1;
						}
						if(i==0) return 7.3;
						return 3;
					},
				},
				order:function(){
					return lib.card.sha.ai.order+0.2;
				},
				result:{
					target:function(player,target){
						if(target&&target==_status.dying) return 2;
						if(lib.config.mode=='stone'&&!player.isMin()){
							if(player.getActCount()+1>=player.actcount) return false;
						}
						var shas=target.get('h','sha');
						var ok=false;
						if(shas.length){
							for(var i=0;i<shas.length;i++){
								if(lib.filter.filterCard(shas[i],target)){
									ok=true;break;
								}
							}
						}
						if(ok){
							var card=target.get('h','sha',0);
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0&&
								target.canUse(card,game.players[i],true,true)){
									if(ai.get.effect(game.players[i],card,target)>0) return 1;
								}
							}
						}
						return 0;
					},
				},
			}
		},
		langeguaiyi:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['longfan'],
			ai:{
				basic:{
					equipValue:7,
				}
			}
		},
		guiyoujie:{
			fullskin:true,
			type:'delay',
			filterTarget:function(card,player,target){
				return (lib.filter.judge(card,player,target)&&player!=target);
			},
			judge:function(card){
				if(get.color(card)=='black') return -3;
				return 0;
			},
			effect:function(){
				if(result.bool==false){
					player.turnOver();
					player.draw();
				}
			},
			ai:{
				basic:{
					order:1,
					useful:1,
					value:6,
				},
				result:{
					target:-3
				},
			}
		},
		yufulu:{
			fullskin:true,
			type:'equip',
			chongzhu:true,
			enable:function(card,player){
				return player.sex=='female';
			},
			subtype:'equip5',
			skills:['touzhi'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.sex=='female') return 5;
						return 0;
					},
				}
			}
		},
		xixueguizhihuan:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['xixue'],
			ai:{
				basic:{
					equipValue:5
				}
			}
		},
		zhufangshenshi:{
			fullskin:true,
			chongzhu:true,
			type:'trick',
			enable:function(){
				return game.players.length>2;
			},
			filterTarget:function(card,player,target){
				return player.next==target||player.previous==target;
			},
			content:function(){
				game.swapSeat(player,target);
			},
			ai:{
				basic:{
					order:7,
				},
				result:{
					target:function(player,target){
						if(player.next==target) return -1;
						if(player.previous==target) return 1;
					}
				}
			},
			mode:['identity','guozhan'],
		},
		jingleishan:{
			fullskin:true,
			type:'trick',
			enable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				"step 0"
				var next=target.chooseToRespond({name:'sha'});
				next.ai=function(card){
					if(ai.get.damageEffect(target,player,target,'thunder')>=0) return 0;
					if(player.hasSkillTag('notricksource')) return 0;
					if(target.hasSkillTag('notrick')) return 0;
					return 1;
				};
				next.autochoose=lib.filter.autoRespondSha;
				"step 1"
				if(result.bool==false){
					target.damage('thunder');
				}
			},
			ai:{
				wuxie:function(target,card,player,viewer){
					if(ai.get.attitude(viewer,target)>0&&target.num('h','sha')){
						if(!target.num('h')||target.hp==1||Math.random()<0.7) return 0;
					}
				},
				basic:{
					order:9,
					useful:[5,1]
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nothunder')) return 0;
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0) num++;
						}
						if(num>1) return 0;
						var nh=target.num('h');
						if(lib.config.mode=='identity'){
							if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
						}
						if(nh==0) return -2;
						if(nh==1) return -1.7
						return -1.5;
					},
				},
				tag:{
					respond:1,
					respondSha:1,
					damage:1,
					natureDamage:1,
					thunderDamage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		chiyuxi:{
			fullskin:true,
			type:'trick',
			enable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				"step 0"
				var next=target.chooseToRespond({name:'shan'});
				next.ai=function(card){
					if(ai.get.damageEffect(target,player,target,'fire')>=0) return 0;
					if(player.hasSkillTag('notricksource')) return 0;
					if(target.hasSkillTag('notrick')) return 0;
					return 1;
				};
				next.autochoose=lib.filter.autoRespondShan;
				"step 1"
				if(result.bool==false){
					target.damage('fire');
				}
			},
			ai:{
				wuxie:function(target,card,player,viewer){
					if(ai.get.attitude(viewer,target)>0&&target.num('h','shan')){
						if(!target.num('h')||target.hp==1||Math.random()<0.7) return 0;
					}
				},
				basic:{
					order:9,
					useful:1
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nofire')) return 0;
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0) num++;
						}
						if(num>1) return 0;
						var nh=target.num('h');
						if(lib.config.mode=='identity'){
							if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
						}
						if(nh==0) return -2;
						if(nh==1) return -1.7
						return -1.5;
					},
				},
				tag:{
					respond:1,
					respondShan:1,
					damage:1,
					natureDamage:1,
					fireDamage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		guangshatianyi:{
			fullskin:true,
			type:'equip',
			chongzhu:true,
			enable:function(card,player){
				return player.sex=='female';
			},
			subtype:'equip2',
			skills:['guangshatianyi'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.sex=='female') return 6;
						return 0;
					},
				}
			}
		},
		guilingyupei:{
			type:'equip',
			fullskin:true,
			subtype:'equip5',
			skills:['nigong'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(!player.storage.nigong) return 5;
						return 5+player.storage.nigong;
					}
				}
			},
			onLose:function(){
				player.storage.nigong=0;
				player.unmarkSkill('nigong');
			},
			onEquip:function(){
				player.storage.nigong=0;
				player.markSkill('nigong');
			}
		},
		qipoguyu:{
			type:'equip',
			subtype:'equip5',
			skills:['xujin'],
			onLose:function(){
				player.storage.xujin=0;
			},
			onEquip:function(){
				player.storage.xujin=0;
			}
		},
		sadengjinhuan:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['sadengjinhuan'],
			ai:{
				basic:{
					equipValue:5.5
				}
			},
		},
		sifeizhenmian:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['yiluan'],
			ai:{
				basic:{
					equipValue:7
				}
			},
		},
		shuchui:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['shuchui'],
			ai:{
				basic:{
					equipValue:5.5
				}
			},
		},
		ximohu:{
			type:'equip',
			subtype:'equip5',
			skills:['ximohu'],
			ai:{
				basic:{
					equipValue:6
				}
			},
		},
		guiyanfadao:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			distance:{attackFrom:-1},
			ai:{
				basic:{
					equipValue:3
				}
			},
			skills:['guiyanfadao']
		},
	},
	skill:{
		shuchui:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player.canUse('sha',target);
			},
			filter:function(event,player){
				return player.num('h','sha')>0;
			},
			content:function(){
				'step 0'
				player.addSkill('shuchui2');
				event.num=0;
				'step 1'
				var card=player.get('h','sha')[0];
				if(card){
					player.useCard(card,target);
				}
				else{
					player.removeSkill('shuchui2');
					event.finish();
				}
				'step 2'
				event.num++;
				if(event.num<4&&target.isAlive()){
					event.goto(1);
				}
				else{
					player.removeSkill('shuchui2');
				}
			},
			ai:{
				order:3.11,
				result:{
					target:function(player,target){
						return ai.get.effect(target,{name:'sha'},player,target);
					}
				}
			}
		},
		shuchui2:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				player.draw();
			}
		},
		xuejibingbao:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			mark:true,
			temp:true,
			intro:{
				content:'摸牌阶段摸牌数+1'
			},
			nopop:true,
			content:function(){
				trigger.num++;
				player.storage.xuejibingbao--;
				if(player.storage.xuejibingbao<=0){
					player.removeSkill('xuejibingbao');
					delete player.storage.xuejibingbao;
				}
				else{
					player.updateMarks();
				}
			}
		},
		gouhunluo:{
			mark:true,
			intro:{
				content:function(storage,player){
					if(storage==1){
						'在'+get.translation(player.storage.gouhunluo2)+'的下个回合开始时失去两点体力'
					}
					return '在'+storage+'轮后'+get.translation(player.storage.gouhunluo2)+'的回合开始时失去两点体力'
				}
			},
			nopop:true,
			temp:true,
			trigger:{global:'phaseBegin'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return player.storage.gouhunluo2==event.player;
			},
			content:function(){
				player.storage.gouhunluo--;
				if(player.storage.gouhunluo<=0){
					player.logSkill('gouhunluo');
					player.loseHp(2);
					player.removeSkill('gouhunluo');
					delete player.storage.gouhunluo;
					delete player.storage.gouhunluo2;
				}
				else{
					player.updateMarks();
				}
			},
			group:'gouhunluo2'
		},
		gouhunluo2:{
			trigger:{global:'dieBegin'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return player.storage.gouhunluo2==event.player;
			},
			content:function(){
				player.removeSkill('gouhunluo');
				delete player.storage.gouhunluo;
				delete player.storage.gouhunluo2;
			}
		},
		jiguanyuan:{
			mark:'card',
			intro:{
				content:'cards'
			},
			trigger:{player:'phaseEnd'},
			forced:true,
			temp:true,
			popup:false,
			content:function(){
				player.gain(player.storage.jiguanyuan,'gain2');
				player.removeSkill('jiguanyuan');
				delete player.storage.jiguanyuan;
			}
		},
		_qinglongzhigui:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return player.num('h','qinglongzhigui')>0;
			},
			content:function(){
				'step 0'
				player.showCards(get.translation(player)+'发动了【青龙之圭】',player.get('h','qinglongzhigui'));
				player.draw(2);
				'step 1'
				player.chooseToDiscard('he',true);
			}
		},
		_baishouzhihu:{
			trigger:{player:'discardEnd'},
			direct:true,
			filter:function(event,player){
				return player.num('h','baishouzhihu')>0;
			},
			content:function(){
				"step 0"
				player.chooseTarget([1,1],'是否发动【白兽之琥】？',function(card,player,target){
					if(player==target) return false;
					return target.num('he')>0;
				}).ai=function(target){
					return -ai.get.attitude(player,target);
				};
				"step 1"
				if(result.bool){
					player.showCards(get.translation(player)+'发动了【白兽之琥】',player.get('h','baishouzhihu'));
					player.logSkill('_baishouzhihu',result.targets);
					player.discardPlayerCard(result.targets[0],'he',true);
				}
				else{
					event.finish();
				}
			},
		},
		_zhuquezhizhang:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return event.source&&event.source.isAlive()&&player.num('h','zhuquezhizhang')>0;
			},
			logTarget:'source',
			check:function(event,player){
				return ai.get.damageEffect(event.source,player,player,'fire')>0;
			},
			content:function(){
				'step 0'
				player.showCards(get.translation(player)+'发动了【朱雀之璋】',player.get('h','zhuquezhizhang'));
				trigger.source.damage('fire');
				'step 1'
				game.delay();
			}
		},
		_xuanwuzhihuang:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return player.num('h','xuanwuzhihuang')>0&&event.num>0&&player.hp<player.maxHp;
			},
			content:function(){
				player.showCards(get.translation(player)+'发动了【玄武之璜】',player.get('h','xuanwuzhihuang'));
				player.recover(trigger.num);
			}
		},
		_huanglinzhicong:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return !player.hujia&&player.num('h','huanglinzhicong')>0;
			},
			content:function(){
				player.showCards(get.translation(player)+'发动了【黄麟之琮】',player.get('h','huanglinzhicong'));
				player.changeHujia();
				player.update();
			},
		},
		_cangchizhibi:{
			trigger:{player:'phaseBegin'},
			direct:true,
			filter:function(event,player){
				return player.num('h','cangchizhibi')>0;
			},
			content:function(){
				'step 0'
				player.chooseTarget([1,3],'是否发动【苍螭之璧】？').ai=function(target){
					var att=ai.get.attitude(player,target);
					if(target.isLinked()){
						return att;
					}
					return -att;
				};
				'step 1'
				if(result.bool){
					player.showCards(get.translation(player)+'发动了【苍螭之璧】',player.get('h','cangchizhibi'));
					player.logSkill('_cangchizhibi',result.targets);
					for(var i=0;i<result.targets.length;i++){
						result.targets[i].link();
					}
				}
			}
		},
		cangchizhibi_equip1:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				'step 0'
				player.chooseTarget('是否发动【灵枢】？').ai=function(target){
					var att=ai.get.attitude(player,target);
					if(target.isLinked()){
						return att;
					}
					return -att;
				};
				'step 1'
				if(result.bool){
					player.logSkill('cangchizhibi_equip1',result.targets);
					result.targets[0].link();
				}
			}
		},
		cangchizhibi_equip2:{
			inherit:'cangchizhibi_equip1'
		},
		cangchizhibi_equip3:{
			inherit:'cangchizhibi_equip1'
		},
		cangchizhibi_equip4:{
			inherit:'cangchizhibi_equip1'
		},
		cangchizhibi_equip5:{
			inherit:'cangchizhibi_equip1'
		},
		huanglinzhicong_equip1:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return player.num('he',{color:'black'})>0&&player.hujia==0
			},
			content:function(){
				'step 0'
				var next=player.chooseToDiscard('he',{color:'black'},'是否发动【玄甲】？');
				next.ai=function(card){
					return 8-ai.get.value(card);
				};
				next.logSkill='huanglinzhicong_equip1'
				'step 1'
				if(result.bool){
					player.changeHujia();
				}
			}
		},
		huanglinzhicong_equip2:{
			inherit:'huanglinzhicong_equip1'
		},
		huanglinzhicong_equip3:{
			inherit:'huanglinzhicong_equip1'
		},
		huanglinzhicong_equip4:{
			inherit:'huanglinzhicong_equip1'
		},
		huanglinzhicong_equip5:{
			inherit:'huanglinzhicong_equip1'
		},
		xuanwuzhihuang_equip1:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return player.num('he',{color:'red'})>0&&player.hp<player.maxHp;
			},
			content:function(){
				'step 0'
				var next=player.chooseToDiscard('he',{color:'red'},'是否发动【寒晶】？');
				next.ai=function(card){
					return 8-ai.get.value(card);
				};
				next.logSkill='xuanwuzhihuang_equip1'
				'step 1'
				if(result.bool){
					player.recover();
				}
			}
		},
		xuanwuzhihuang_equip2:{
			inherit:'xuanwuzhihuang_equip1'
		},
		xuanwuzhihuang_equip3:{
			inherit:'xuanwuzhihuang_equip1'
		},
		xuanwuzhihuang_equip4:{
			inherit:'xuanwuzhihuang_equip1'
		},
		xuanwuzhihuang_equip5:{
			inherit:'xuanwuzhihuang_equip1'
		},
		zhuquezhizhang_equip1:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return player.num('he',{color:'red'})>0;
			},
			content:function(){
				"step 0"
				player.chooseCardTarget({
					position:'he',
					filterTarget:function(card,player,target){
						return player!=target&&target.hp>=player.hp;
					},
					filterCard:function(card){
						return get.color(card)=='red';
					},
					ai1:function(card){
						return 9-ai.get.value(card);
					},
					ai2:function(target){
						return ai.get.damageEffect(target,player,player,'fire');
					},
					prompt:'是否发动【炽翎】？'
				});
				"step 1"
				if(result.bool){
					event.target=result.targets[0];
					player.logSkill('zhuquezhizhang_equip1',event.target,'fire');
					player.discard(result.cards);
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.target){
					event.target.damage('fire');
				}
			},
		},
		zhuquezhizhang_equip2:{
			inherit:'zhuquezhizhang_equip1'
		},
		zhuquezhizhang_equip3:{
			inherit:'zhuquezhizhang_equip1'
		},
		zhuquezhizhang_equip4:{
			inherit:'zhuquezhizhang_equip1'
		},
		zhuquezhizhang_equip5:{
			inherit:'zhuquezhizhang_equip1'
		},
		baishouzhihu_equip1:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget([1,1],'是否发动【风牙】？',function(card,player,target){
					if(player==target) return false;
					return target.num('he')>0;
				}).ai=function(target){
					return -ai.get.attitude(player,target);
				};
				"step 1"
				if(result.bool){
					player.logSkill('baishouzhihu_equip1',result.targets);
					player.discardPlayerCard(result.targets[0],'he',true);
				}
				else{
					event.finish();
				}
			},
		},
		baishouzhihu_equip2:{
			inherit:'baishouzhihu_equip1'
		},
		baishouzhihu_equip3:{
			inherit:'baishouzhihu_equip1'
		},
		baishouzhihu_equip4:{
			inherit:'baishouzhihu_equip1'
		},
		baishouzhihu_equip5:{
			inherit:'baishouzhihu_equip1'
		},
		qinglongzhigui_equip1:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.draw();
			}
		},
		qinglongzhigui_equip2:{
			inherit:'qinglongzhigui_equip1'
		},
		qinglongzhigui_equip3:{
			inherit:'qinglongzhigui_equip1'
		},
		qinglongzhigui_equip4:{
			inherit:'qinglongzhigui_equip1'
		},
		qinglongzhigui_equip5:{
			inherit:'qinglongzhigui_equip1'
		},
		kunlunjingc:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.num('h')>0;
			},
			delay:false,
			content:function(){
				'step 0'
				var cards=get.cards(3);
				event.cards=cards;
				player.chooseCardButton('选择一张牌',cards,true);
				'step 1'
				event.card=result.links[0];
				player.chooseCard('h',true,'用一张手牌替换'+get.translation(event.card));
				'step 2'
				if(result.bool){
					event.cards[event.cards.indexOf(event.card)]=result.cards[0];
					player.lose(result.cards,ui.special);
					var cardx=ui.create.card();
					cardx.classList.add('infohidden');
					cardx.classList.add('infoflip');
					player.$throw(cardx,1000,'nobroadcast');
				}
				else{
					event.finish();
				}
				'step 3'
				player.gain(event.card);
				player.$draw();
				for(var i=event.cards.length-1;i>=0;i--){
					event.cards[i].fix();
					ui.cardPile.insertBefore(event.cards[i],ui.cardPile.firstChild);
				}
				game.delay();
			},
			ai:{
				order:10,
				result:{
					player:1
				}
			}
		},
		lianhua:{
			enable:'phaseUse',
			filter:function(event,player){
				var hu=player.get('e','5');
				if(hu&&hu.storage.shouna&&hu.storage.shouna.length>1){
					return true;
				}
				return false;
			},
			usable:1,
			content:function(){
				"step 0"
				event.hu=player.get('e','5');
				player.chooseCardButton('弃置两张壶中的牌，然后从牌堆中获得一张类别不同的牌',2,event.hu.storage.shouna).ai=function(){
					return 1;
				}
				"step 1"
				if(result.bool){
					var type=[];
					player.$throw(result.links);
					game.log(player,'弃置了',result.links);
					for(var i=0;i<result.links.length;i++){
						event.hu.storage.shouna.remove(result.links[i]);
						ui.discardPile.appendChild(result.links[i]);
						type.add(get.type(result.links[i],'trick'));
					}
					for(var i=0;i<ui.cardPile.childNodes.length;i++){
						if(!type.contains(get.type(ui.cardPile.childNodes[i],'trick'))){
							player.gain(ui.cardPile.childNodes[i],'gain');
							break;
						}
					}
				}
				else{
					player.getStat('skill').lianhua--;
				}
			},
			ai:{
				order:11,
				result:{
					player:1
				}
			}
		},
		shouna:{
			trigger:{global:'discardAfter'},
			filter:function(event,player){
				if(player.hasSkill('shouna2')) return false;
				if(_status.currentPhase==event.player) return false;
				if(event.player==player) return false;
				for(var i=0;i<event.cards.length;i++){
					if(get.position(event.cards[i])=='d'){
						return true;
					}
				}
				return false;
			},
			forced:true,
			content:function(){
				var cards=trigger.cards.slice(0);
				for(var i=0;i<cards.length;i++){
					if(get.position(cards[i])!='d'){
						cards.splice(i,1);i--;
					}
				}
				var hu=player.get('e','5');
				if(cards.length&&hu){
					if(!hu.storage.shouna){
						hu.storage.shouna=[];
					}
					player.addTempSkill('shouna2','phaseAfter');
					player.$gain2(cards);
					for(var i=0;i<cards.length;i++){
						hu.storage.shouna.push(cards[i]);
						ui.special.appendChild(cards[i]);
					}
					game.log(player,'将',cards,'收入炼妖壶');
				}
			},
		},
		shouna2:{},
		donghuangzhong:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				'step 0'
				player.chooseCardTarget({
					filterTarget:true,
					filterCard:true,
					ai1:function(card){
						return 7-ai.get.useful(card);
					},
					ai2:function(target){
						return -ai.get.attitude(player,target);
					},
					prompt:'是否发动【东皇钟】？'
				});
				'step 1'
				if(result.bool){
					player.logSkill('donghuangzhong',result.targets);
					player.discard(result.cards);
					event.target=result.targets[0];
				}
				else{
					event.finish();
				}
				'step 2'
				var target=event.target;
				var list=[];
				for(var i=0;i<lib.inpile.length;i++){
					if(get.type(lib.inpile[i])=='delay'&&!target.hasJudge(lib.inpile[i])){
						list.push(lib.inpile[i]);
					}
				}
				if(list.length){
					var card=game.createCard(list.randomGet());
					target.addJudge(card);
					target.$draw(card);
					game.delay();
				}
			}
		},
		donghuangzhong_old:{
			mode:['identity','guozhan'],
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return event.player==game.me&&
				(game.dead.length||game.players.length+game.dead.length<8);
			},
			content:function(){
				"step 0"
				var list=[];
				for(var i=0;i<game.dead.length;i++){
					list.push(game.dead[i].name);
				}
				if(game.dead.length){
					player.chooseButton(ui.create.dialog([list,'character']),function(button){
						for(var i=0;i<game.dead.length&&game.dead[i].name!=button.link;i++);
						return -ai.get.attitude(_status.event.player,game.dead[i]);
					},true);
					if(game.players.length+game.dead.length<8){
						event.control=ui.create.control('新角色',ui.click.cancel)
					}
				}
				"step 1"
				if(result.bool){
					for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
					game.removePlayer(game.dead[i]);
					player.recover();
				}
				else{
					var group=player.group;
					if(group=='unknown') group=lib.group.randomGet();
					var list=[];
					for(var i in lib.character){
						if(lib.character[i][1]==group) list.push(i);
					}
					var player2=game.addPlayer();
					if(get.config('double_character')){
						var list2=list.randomGets(2);
						player2.init(list2[0],list2[1]);
					}
					else{
						player2.init(list.randomGet())
					}
					player2.identity=player.identity;
					if(player2.identity=='zhu') player2.identity='zhong';
					player2.setIdentity();
					player2.identityShown=true;
					if(group!='unknown') player.loseHp(player2.maxHp);
				}
				if(event.control) event.control.close();
			}
		},
		xuanyuanjian:{
			trigger:{player:'changeHp'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.hasSkill('xuanyuan')&&player.hp<=2
			},
			content:function(){
				var e1=player.get('e','1');
				if(e1&&e1.name.indexOf('xuanyuanjian')==0){
					player.discard(e1);
				}
			},
			ai:{
				threaten:1.5
			}
		},
		xuanyuanjian2:{
			trigger:{source:'damageBefore'},
			forced:true,
			filter:function(event){
				return event.notLink();
			},
			content:function(){
				trigger.num++;
				if(!trigger.nature) trigger.nature='thunder';
			}
		},
		xuanyuanjian3:{
			trigger:{source:'damageAfter'},
			forced:true,
			popup:false,
			filter:function(event){
				return event.notLink();
			},
			content:function(){
				player.loseHp();
				player.draw();
			}
		},
		pangufu:{
			trigger:{source:'damageEnd'},
			forced:true,
			priority:55,
			filter:function(event){
				return event.player.num('he')>0;
			},
			content:function(){
				trigger.player.chooseToDiscard(true,'he');
			}
		},
		shouhua:{
			mode:['identity','infinity'],
			enable:'phaseUse',
			filter:function(event,player){
				return player==game.me;
			},
			usable:1,
			filterTarget:function(card,player,target){
				return target!=game.zhu&&target!=game.me&&target.hp<target.maxHp;
			},
			filterCard:true,
			check:function(card){
				return ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player){
				player.$throw(cards);
			},
			content:function(){
				"step 0"
				target.$turn2();
				target.style.left='calc(50% - 120px)';
				target.style.top='calc(50% - 60px)';
				game.delay(0,2500);
				"step 1"
				target.removeAttribute('style');
				if(Math.random()<(ai.get.value(cards[0])+1)*(target.maxHp-target.hp)/(60*target.maxHp)){
					event.position=target.dataset.position;
					target.dataset.position=player.dataset.position;
					target.delete();
					event.success=true;
				}
				game.delay();
				"step 2"
				if(event.success){
					player.popup('收化成功');
					game.log(player,'将',target,'收化');
					target.dataset.position=event.position;
					var card=player.get('e','5');
					if(!card.storage.shouhua) card.storage.shouhua=[];
					card.storage.shouhua.push(target);
					game.removePlayer(target);
					game.checkResult();
				}
				else{
					player.popup('收化失败');
					target.gain(cards);
					target.$gain2(cards);
				}
				game.delay();
			},
			ai:{
				result:{
					player:function(){
						return Math.random()-0.4;
					}
				}
			}
		},
		haotianta:{
			trigger:{global:'judgeBefore'},
			direct:true,
			usable:1,
			content:function(){
				"step 0"
				event.cards=get.cards(3);
				player.chooseCardButton(true,event.cards,'昊天塔：选择一张牌作为'+get.translation(trigger.player)+'的'+trigger.judgestr+'判定结果').ai=function(button){
					if(ai.get.attitude(player,trigger.player)>0){
						return 1+trigger.judge(button.link);
					}
					if(ai.get.attitude(player,trigger.player)<0){
						return 1-trigger.judge(button.link);
					}
					return 0;
				};
				"step 1"
				if(!result.bool){
					event.finish();
					return;
				}
				player.logSkill('haotianta',trigger.player);
				var card=result.links[0];
				event.cards.remove(card);
				var judgestr=get.translation(trigger.player)+'的'+trigger.judgestr+'判定';
				event.videoId=lib.status.videoId++;
				event.dialog=ui.create.dialog(judgestr);
				event.dialog.classList.add('center');
				event.dialog.videoId=event.videoId;

				game.addVideo('judge1',player,[get.cardInfo(card),judgestr,event.videoId]);
				for(var i=0;i<event.cards.length;i++) ui.discardPile.appendChild(event.cards[i]);
				// var node=card.copy('thrown','center',ui.arena).animate('start');
				var node;
				if(game.chess){
					node=card.copy('thrown','center',ui.arena).animate('start');
				}
				else{
					node=player.$throwordered(card.copy(),true);
				}
				node.classList.add('thrownhighlight');
				ui.arena.classList.add('thrownhighlight');
				if(card){
					trigger.untrigger();
					trigger.finish();
					trigger.result={
						card:card,
						judge:trigger.judge(card),
						node:node,
						number:get.number(card),
						suit:get.suit(card),
						color:get.color(card),
					};
					if(trigger.result.judge>0){
						trigger.result.bool=true;
						trigger.player.popup('洗具');
					}
					if(trigger.result.judge<0){
						trigger.result.bool=false;
						trigger.player.popup('杯具');
					}
					game.log(trigger.player,'的判定结果为',card);
					trigger.direct=true;
					trigger.position.appendChild(card);
					game.delay(2);
				}
				else{
					event.finish();
				}
				"step 2"
				ui.arena.classList.remove('thrownhighlight');
				event.dialog.close();
				game.addVideo('judge2',null,event.videoId);
				ui.clear();
				var card=trigger.result.card;
				trigger.position.appendChild(card);
				trigger.result.node.delete();
				game.delay();
			},
			ai:{
				tag:{
					rejudge:10
				}
			}
		},
		shennongding:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			selectCard:2,
			check:function(card){
				if(get.tag(card,'recover')>=1) return 0;
				return 7-ai.get.value(card);
			},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				player.recover();
			},
			ai:{
				result:{
					player:function(player){
						return ai.get.recoverEffect(player);
					}
				},
				order:2.5
			}
		},
		kongdongyin:{
			trigger:{player:'dieBefore'},
			forced:true,
			filter:function(event,player){
				return player.maxHp>0;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.hp=1;
				player.draw();
				player.discard(player.get('e',{subtype:'equip5'}));
				game.delay();
			}
		},

		nvwashi:{
			trigger:{global:'dying'},
			priority:6,
			filter:function(event,player){
				return event.player.hp<=0&&player.hp>1;
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>=3;
			},
			content:function(){
				"step 0"
				trigger.player.recover();
				"step 1"
				player.loseHp();
			},
			ai:{
				threaten:1.2,
				expose:0.2
			}
		},
		kongxin:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('h');
			},
			filter:function(event,player){
				return player.num('h')?true:false;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target);
				"step 1"
				if(result.bool){
					event.bool=true;
					player.chooseTarget('选择一个目标视为'+get.translation(target)+'对其使用一张杀',function(card,player,target2){
						return player!=target2&&target.canUse('sha',target2);
					}).ai=function(target){
						return ai.get.effect(target,{name:'sha'},target,player);
					}
				}
				else{
					target.discardPlayerCard(player);
				}
				"step 2"
				if(event.bool&&result.bool){
					target.useCard({name:'sha'},result.targets);
				}
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						if(player.num('h')<=1) return 0;
						if(ai.get.attitude(player,target)>=0) return 0;
						for(var i=0;i<game.players.length;i++){
							if(player!=game.players[i]&&
								target.canUse('sha',game.players[i])&&
								ai.get.effect(game.players[i],{name:'sha'},target,player)>0){
								return -1;
							}
						}
						return 0;
					}
				}
			}
		},
		kongxin2:{
			trigger:{player:'dying'},
			priority:10,
			forced:true,
			popup:false,
			filter:function(event,player){
				return player==game.me;
			},
			content:function(){
				player.removeSkill('kongxin2');
				game.swapPlayer(player);
				player.storage.kongxin.lockOut=false;
				player.storage.kongxin.out();
				if(player==game.me) game.swapPlayer(player.storage.kongxin);
				if(lib.config.mode=='identity') player.storage.kongxin.setIdentity();
				delete player.storage.kongxin;
			},
		},
		lianyao_hujia:{
			mode:['identity','guozhan'],
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				if(player!=game.me) return false;
				var card=player.get('e','5');
				if(card.storage.shouhua&&card.storage.shouhua.length) return true;
				return false;
			},
			content:function(){
				"step 0"
				var list=[];
				var card=player.get('e','5');
				for(var i=0;i<card.storage.shouhua.length;i++){
					list.push(card.storage.shouhua[i].name);
				}
				var dialog=ui.create.dialog([list,'character']);
				for(var i=0;i<dialog.buttons.length;i++){
					dialog.buttons[i].link=card.storage.shouhua[i];
					dialog.buttons[i].querySelector('.intro').remove();
				}
				player.chooseButton(dialog,true);
				"step 1"
				if(result.bool){
					game.restorePlayer(result.links[0]);
					game.delay();
				}
				else{
					event.finish();
				}
				"step 2"
				game.swapPlayer(result.links[0]);
				result.links[0].hp=1;
				result.links[0].update();
				result.links[0].storage.lianyao_hujia=player;
				game.swapPlayer(result.links[0]);
				result.links[0].addSkill('lianyao_hujia2');
				result.links[0].phase();
				result.links[0].setIdentity();
				result.links[0].identityShown=true;
				player.out(true);
			}
		},
		lianyao_hujia2:{
			trigger:{player:['phaseAfter','changeHp']},
			forced:true,
			popup:false,
			content:function(){
				player.hp=1;
				player.update();
				var me=player.storage.lianyao_hujia;
				delete player.storage.lianyao_hujia;
				me.lockOut=false;
				me.out();
				player.removeSkill('lianyao_hujia2');
				if(player==game.me){
					game.swapPlayer(me);
					game.removePlayer(player);
					game.delay();
				}
			}
		},
		qinglianxindeng:{
			trigger:{player:'damageBefore'},
			forced:true,
			priority:15,
			filter:function(event,player){
				return get.type(event.card,'trick')=='trick';
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
			},
			ai:{
				notrick:true,
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='trick'&&get.tag(card,'damage')){
							return 'zeroplayertarget';
						}
					},
				}
			}
		},
		yiluan:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return get.distance(player,target,'attack')<=1;
			},
			content:function(){
				'step 0'
				var card=get.cards(0);
				player.showCards('意乱',card);
				event.bool=(get.color(card)=='black');
				'step 1'
				if(!event.bool){
					target.draw();
				}
				else{
					target.goMad({player:'phaseAfter'});
				}
			},
			ai:{
				order:10,
				result:{
					target:function(player,target){
						if(target.isMad()) return 0;
						return -1;
					}
				}
			}
		},
		hslingjian_xuanfengzhiren_equip1:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.player.num('he');
			},
			content:function(){
				trigger.player.discard(trigger.player.get('he').randomGet());
			}
		},
		hslingjian_xuanfengzhiren_equip2:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.source&&event.source.num('he');
			},
			content:function(){
				trigger.source.discard(trigger.source.get('he').randomGet());
			}
		},
		hslingjian_xuanfengzhiren_equip3:{
			trigger:{player:'loseAfter'},
			forced:true,
			filter:function(event,player){
				return _status.currentPhase!=player&&!player.hasSkill('hslingjian_xuanfengzhiren_equip3_dist');
			},
			content:function(){
				player.addTempSkill('hslingjian_xuanfengzhiren_equip3_dist','phaseAfter');
			}
		},
		hslingjian_xuanfengzhiren_equip3_dist:{
			mod:{
				globalTo:function(from,to,distance){
					return distance+1;
				}
			}
		},
		hslingjian_xuanfengzhiren_equip4:{
			trigger:{player:'loseAfter'},
			forced:true,
			filter:function(event,player){
				return _status.currentPhase==player&&!player.hasSkill('hslingjian_xuanfengzhiren_equip4_dist');
			},
			content:function(){
				player.addTempSkill('hslingjian_xuanfengzhiren_equip4_dist','phaseAfter');
			}
		},
		hslingjian_xuanfengzhiren_equip4_dist:{
			mod:{
				globalFrom:function(from,to,distance){
					return distance-1;
				}
			}
		},
		hslingjian_xuanfengzhiren_equip5:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			position:'he',
			filter:function(event,player){
				return player.num('he')>0;
			},
			filterTarget:function(card,player,target){
				return target.num('he')>0;
			},
			check:function(card){
				return 5-ai.get.value(card);
			},
			content:function(){
				target.discard(target.get('he').randomGet());
			},
			ai:{
				order:5,
				result:{
					target:function(player,target){
						var dh=player.num('he')-target.num('he');
						if(dh>0){
							return -Math.sqrt(dh);
						}
						return 0;
					}
				}
			}
		},
		hslingjian_zhongxinghujia_equip1:{
			trigger:{source:'damageEnd'},
			check:function(event,player){
				return !player.get('e','2');
			},
			filter:function(event){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				var card=game.createCard(get.inpile('equip2').randomGet());
				player.equip(card);
				player.$draw(card);
				game.delay();
			}
		},
		hslingjian_zhongxinghujia_equip2:{
			trigger:{player:'damageEnd'},
			check:function(event,player){
				return ai.get.attitude(player,event.source)<0;
			},
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.source&&event.source.get('e','2');
			},
			content:function(){
				player.line(trigger.source,'green');
				trigger.source.discard(trigger.source.get('e','2'));
			}
		},
		hslingjian_zhongxinghujia_equip3:{
			mod:{
				globalTo:function(from,to,distance){
					if(to.get('e','2')) return distance+1;
				}
			}
		},
		hslingjian_zhongxinghujia_equip4:{
			mod:{
				globalFrom:function(from,to,distance){
					if(from.get('e','2')) return distance-1;
				}
			}
		},
		hslingjian_zhongxinghujia_equip5:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			position:'he',
			filterTarget:true,
			selectCard:2,
			filter:function(event,player){
				return player.num('he')>=2;
			},
			check:function(card){
				return 5-ai.get.value(card);
			},
			content:function(){
				var card=game.createCard(get.inpile('equip2').randomGet());
				target.equip(card);
				target.$draw(card);
				game.delay();
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(target.get('e','2')) return 0;
						return 1;
					}
				}
			}
		},
		hslingjian_jinjilengdong_equip1:{
			trigger:{source:'damageEnd'},
			check:function(event,player){
				if(event.player.isTurnedOver()){
					return ai.get.attitude(player,event.player)>0;
				}
				return ai.get.attitude(player,event.player)<=0;
			},
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.player&&event.player.isAlive();
			},
			logTarget:'player',
			content:function(){
				trigger.player.draw(2);
				trigger.player.turnOver();
			}
		},
		hslingjian_jinjilengdong_equip2:{
			trigger:{player:'damageEnd'},
			check:function(event,player){
				if(event.player.isTurnedOver()){
					return ai.get.attitude(player,event.source)>0;
				}
				return ai.get.attitude(player,event.source)<=0;
			},
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.source&&event.source.isAlive();
			},
			logTarget:'source',
			content:function(){
				player.line(trigger.source,'green');
				trigger.source.draw(2);
				trigger.source.turnOver();
			}
		},
		hslingjian_jinjilengdong_equip3:{
			mod:{
				globalTo:function(from,to,distance){
					if(to.isTurnedOver()) return distance+2;
				}
			}
		},
		hslingjian_jinjilengdong_equip4:{
			mod:{
				globalFrom:function(from,to,distance){
					if(from.isTurnedOver()) return distance-2;
				}
			}
		},
		hslingjian_jinjilengdong_equip5:{
			trigger:{player:'phaseAfter'},
			direct:true,
			filter:function(event,player){
				return !player.isTurnedOver();
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【冰冻】？',function(card,player,target){
					return player!=target&&!target.isTurnedOver();
				}).ai=function(target){
					return Math.max(0,-ai.get.attitude(player,target)-2);
				};
				"step 1"
				if(result.bool){
					player.logSkill('hslingjian_jinjilengdong_equip5',result.targets);
					player.turnOver();
					result.targets[0].turnOver();
					game.asyncDraw([player,result.targets[0]],2);
				}
			},
		},
		hslingjian_yinmilichang_equip1:{
			trigger:{source:'damageEnd'},
			direct:true,
			filter:function(event){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				'step 0'
				player.chooseTarget('是否发动【隐力】？',function(card,player,target){
					return target!=player&&!target.hasSkill('hslingjian_yinshen');
				}).ai=function(target){
					var att=ai.get.attitude(player,target);
					if(get.distance(player,target,'absolute')<=1) return 0;
					if(target.hp==1) return 2*att;
					if(target.hp==2&&target.num('h')<=2) return 1.2*att;
					return att;
				}
				'step 1'
				if(result.bool){
					player.logSkill('hslingjian_yinmilichang_equip1',result.targets);
					result.targets[0].addTempSkill('hslingjian_yinshen',{player:'phaseBegin'});
				}
			}
		},
		hslingjian_yinmilichang_equip2:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return !player.hasSkill('hslingjian_yinshen');
			},
			content:function(){
				player.addTempSkill('hslingjian_yinshen','phaseAfter');
			}
		},
		hslingjian_yinmilichang_equip3:{
			mod:{
				globalTo:function(from,to,distance){
					if(to.hp==1) return distance+1;
				}
			}
		},
		hslingjian_yinmilichang_equip4:{
			mod:{
				globalFrom:function(from,to,distance){
					if(from.hp==1) return distance-1;
				}
			}
		},
		hslingjian_yinmilichang_equip5:{
			mod:{
				targetEnabled:function(card,player,target,now){
					if(target.num('h')==0){
						if(card.name=='sha'||card.name=='juedou') return false;
					}
				}
			},
			ai:{
				noh:true,
				skillTagFilter:function(player,tag){
					if(tag=='noh'){
						if(player.num('h')!=1) return false;
					}
				}
			}
		},
		hslingjian_xingtigaizao_equip1:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				player.draw();
			}
		},
		hslingjian_xingtigaizao_equip2:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				player.draw();
			}
		},
		hslingjian_xingtigaizao_equip3:{
			mod:{
				globalTo:function(from,to,distance){
					return distance+1;
				},
				globalFrom:function(from,to,distance){
					return distance+1;
				}
			}
		},
		hslingjian_xingtigaizao_equip4:{
			mod:{
				globalTo:function(from,to,distance){
					return distance-1;
				},
				globalFrom:function(from,to,distance){
					return distance-1;
				}
			}
		},
		hslingjian_xingtigaizao_equip5:{
			mod:{
				maxHandcard:function(player,num){
					return num-1;
				}
			},
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num++;
			}
		},
		hslingjian_shengxiuhaojiao_equip1:{
			trigger:{player:'shaBegin'},
			forced:true,
			filter:function(event,player){
				return event.target.hasSkill('hslingjian_chaofeng');
			},
			content:function(){
				trigger.directHit=true;
			}
		},
		hslingjian_shengxiuhaojiao_equip2:{
			mod:{
				targetEnabled:function(card,player,target){
					if(player.hasSkill('hslingjian_chaofeng')) return false;
				}
			}
		},
		hslingjian_shengxiuhaojiao_equip3:{
			mod:{
				globalTo:function(from,to,distance){
					if(to.hp<to.num('h')) return distance+1;
				}
			}
		},
		hslingjian_shengxiuhaojiao_equip4:{
			mod:{
				globalFrom:function(from,to,distance){
					if(from.hp<from.num('h')) return distance-1;
				}
			}
		},
		hslingjian_shengxiuhaojiao_equip5:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			selectCard:2,
			check:function(card){
				return 5-ai.get.value(card);
			},
			position:'he',
			filterTarget:true,
			content:function(){
				if(target.hasSkill('hslingjian_chaofeng')){
					target.removeSkill('hslingjian_chaofeng');
				}
				else{
					target.addSkill('hslingjian_chaofeng');
				}
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						if(target.hasSkill('hslingjian_chaofeng')){
							return -Math.sqrt(target.hp+target.num('h'));
						}
						return 0;
					}
				}
			}
		},
		hslingjian_shijianhuisu_equip1:{
			trigger:{player:'equipEnd'},
			forced:true,
			filter:function(event,player){
				return get.subtype(event.card)=='equip2';
			},
			content:function(){
				player.draw();
			},
		},
		hslingjian_shijianhuisu_equip2:{
			trigger:{player:'equipEnd'},
			forced:true,
			filter:function(event,player){
				return get.subtype(event.card)=='equip1';
			},
			content:function(){
				player.draw();
			},
		},
		hslingjian_shijianhuisu_equip3:{
			mod:{
				globalTo:function(from,to,distance){
					if(to.num('e')==1) return distance+1;
				}
			}
		},
		hslingjian_shijianhuisu_equip4:{
			mod:{
				globalFrom:function(from,to,distance){
					if(from.num('e')==1) return distance-1;
				}
			}
		},
		hslingjian_shijianhuisu_equip5:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			selectCard:1,
			filterTarget:function(card,player,target){
				return player!=target&&target.num('he')>0;
			},
			position:'he',
			content:function(){
				var es=target.get('e');
				target.gain(es);
				target.$gain2(es);
			},
			check:function(card){
				return 4-ai.get.value(card);
			},
			ai:{
				order:5,
				result:{
					target:function(player,target){
						if(target.hasSkillTag('noe')) return target.num('e')*2;
						return -target.num('e');
					}
				},
			}
		},
		jiguanyaoshu_skill_old:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h',{type:['trick','delay']})>0;
			},
			filterCard:{type:['trick','delay']},
			check:function(card){
				return 5-ai.get.value(card);
			},
			viewAs:{name:'jiguanshu'}
		},
		jiguanyaoshu_skill:{
			trigger:{player:'loseEnd'},
			forced:true,
			filter:function(event,player){
				if(_status.currentPhase==player) return false;
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original=='e') return true;
				}
				return false;
			},
			content:function(){
				var num=0;
				for(var i=0;i<trigger.cards.length;i++){
					if(trigger.cards[i].original=='e') num++;
				}
				var list=get.typeCard('hslingjian');
				if(list.length){
					list=list.randomGets(num);
					for(var i=0;i<list.length;i++){
						list[i]=game.createCard(list[i]);
					}
				}
				player.gain(list,'gain2');
			}
		},
		_lingjianduanzao:{
			enable:'phaseUse',
			position:'he',
			discard:false,
			losetrigger:false,
			prompt:function(event){
				var lingjians=[],types=[];
				var hs=event.player.get('he');
				for(var i=0;i<hs.length;i++){
					switch(get.type(hs[i])){
						case 'equip':types.add(get.subtype(hs[i]));break;
						case 'hslingjian':lingjians.add(hs[i].name);break;
						case 'jiqi':if(!lingjians.contains(hs[i].name)) lingjians.unshift(hs[i].name);break;
					}
				}
				var str='';
				for(var i=0;i<lingjians.length;i++){
						var color;
						var type=get.type(lingjians[i]);
						if(type=='jiqi'){
							color='rgba(233, 131, 255,0.2);';
						}
						else{
							color='rgba(117,186,255,0.2);';
						}
						str+='<div style="text-align:left;line-height:18px;border-radius:4px;margin-top:7px;margin-bottom:10px;position:relative;width:100%">';
						str+='<div class="shadowed" style="position:absolute;left0;top:0;padding:5px;border-radius:4px;background:'+color+'">'+lib.translate[lingjians[i]]+'</div>';
						for(var j=0;j<types.length;j++){
							str+='<div class="shadowed" style="position:relative;left:85px;width:calc(100% - 95px);height:100%;padding:5px;border-radius: 4px;margin-bottom:10px">'+
							(type!='jiqi'?(lib.translate[types[j]]+'：'):'')+
							lib.translate[lingjians[i]+'_'+types[j]+'_info']+'</div>';
							if(type=='jiqi') break;
						}
						str+='</div>';
				}
				return str;
			},
			check:function(card){
				if(get.type(card)=='jiqi'){
					if(_status.event.player.num('h')>_status.event.player.hp){
						return 0.5;
					}
					return 0;
				}
				return 1+ai.get.value(card);
			},
			filterCard:function(card){
				var type=get.type(card);
				if(type=='equip'&&!lib.inpile.contains(card.name)) return false;
				if(ui.selected.cards.length){
					var type2=get.type(ui.selected.cards[0]);
					if(type2=='equip'){
						return type=='hslingjian'||type=='jiqi';
					}
					else{
						return type=='equip';
					}
				}
				else{
					return type=='equip'||type=='hslingjian'||type=='jiqi';
				}
				// if(type=='equip'&&!lib.inpile.contains(card.name)) return false;
				// for(var i=0;i<ui.selected.cards.length;i++){
				// 	if(get.type(ui.selected.cards[i])=='equip') return type=='hslingjian'||type=='jiqi';
				// }
				// if(_status.event.player.hasSkill('jiguanyaoshu_skill')){
				// 	if(ui.selected.cards.length==2) return type=='equip';
				// }
				// else{
				// 	if(ui.selected.cards.length==1) return type=='equip';
				// }
				// return type=='equip'||type=='hslingjian';
			},
			process:function(cards){
				var equip;
				for(var i=0;i<cards.length;i++){
					if(get.type(cards[i])=='equip'){
						equip=cards[i];
						cards.splice(i--,1);
						break;
					}
				}
				var name=equip.name;
				var type=get.type(cards[0]);
				var equipname=equip.name;
				if(type=='hslingjian'){
					name+=cards[0].name.slice(10);
				}
				else{
					name+='_'+cards[0].name;
				}
				if(lib.card[name]) return name;
				lib.card[name]={};
				lib.card[name].cardimage=equip.name;
				lib.card[name].vanish=true;
				for(var i in lib.card[equip.name]){
					if(i=='ai'){
						lib.card[name][i]={};
						for(var j in lib.card[equip.name][i]){
							if(j=='basic'){
								lib.card[name][i][j]={};
								for(var k in lib.card[equip.name][i][j]){
									lib.card[name][i][j][k]=lib.card[equip.name][i][j][k];
								}
							}
							else{
								lib.card[name][i][j]=lib.card[equip.name][i][j];
							}
						}
					}
					else{
						lib.card[name][i]=lib.card[equip.name][i];
					}
				}
				if(type=='jiqi'){
					lib.card[name].legend=true;
				}
				else{
					lib.card[name].epic=true;
				}
				var dvalue=(type=='jiqi'?3:1);
				var getValue=function(value,dvalue){
					if(dvalue==1) return Math.min(10,value+dvalue);
					value+=dvalue;
					if(value>10) return 10+(value-10)/10;
					if(value<9) return 8+value/10;
					return value;
				};
				if(typeof lib.card[name].ai.equipValue=='number'){
					lib.card[name].ai.equipValue=getValue(lib.card[name].ai.equipValue,dvalue);
				}
				else if(typeof lib.card[name].ai.equipValue=='function'){
					lib.card[name].ai.equipValue=function(){
						return getValue(lib.card[equipname].ai.equipValue.apply(this,arguments),dvalue);
					}
				}
				else if(lib.card[name].ai.basic&&typeof lib.card[name].ai.basic.equipValue=='number'){
					lib.card[name].ai.basic.equipValue=getValue(lib.card[name].ai.basic.equipValue,dvalue);
				}
				else if(lib.card[name].ai.basic&&typeof lib.card[name].ai.basic.equipValue=='function'){
					lib.card[name].ai.basic.equipValue=function(){
						return getValue(lib.card[equipname].ai.basic.equipValue.apply(this,arguments),dvalue);
					}
				}
				else{
					if(dvalue==3){
						lib.card[name].ai.equipValue=7;
					}
					else{
						lib.card[name].ai.equipValue=dvalue;
					}
				}
				if(Array.isArray(lib.card[name].skills)){
					lib.card[name].skills=lib.card[name].skills.slice(0);
				}
				else{
					lib.card[name].skills=[];
				}
				lib.card[name].filterTarget=function(card,player,target){
					return !target.isMin();
				};
				lib.card[name].selectTarget=1;
				lib.card[name].range={global:1};
				var str=lib.translate[cards[0].name+'_duanzao'];
				var str2=get.translation(equip.name,'skill');
				lib.translate[name]=str+str2;
				str2=lib.translate[equip.name+'_info']||'';
				if(str2[str2.length-1]=='.'||str2[str2.length-1]=='。'){
					str2=str2.slice(0,str2.length-1);
				}
				for(var i=0;i<cards.length;i++){
					for(var j=1;j<=5;j++){
						lib.translate[cards[i].name+'_equip'+j]=lib.translate[cards[i].name+'_duanzao'];
					}
					var name2=cards[i].name+'_'+get.subtype(equip);
					lib.card[name].skills.add(name2);
					str2+='；'+lib.translate[name2+'_info'];
				}
				lib.translate[name+'_info']=str2;
				try{
					game.addVideo('newcard',null,{
						name:name,
						translate:lib.translate[name],
						info:str2,
						card:equip.name,
						legend:type=='jiqi',
						epic:type=='hslingjian'
					});
				}
				catch(e){
					console.log(e);
				}
				return name;
			},
			selectCard:2,
			// selectCard:function(){
			// 	if(ui.selected.cards.length==2&&
			// 		get.type(ui.selected.cards[0])=='hslingjian'&&
			// 		get.type(ui.selected.cards[1])=='hslingjian'){
			// 		return [3,3];
			// 	}
			// 	if(_status.event.player.hasSkill('jiguanyaoshu_skill')) return [2,3];
			// 	return 2;
			// },
			filter:function(event,player){
				if(!player.num('h',{type:['hslingjian','jiqi']})) return false;
				var es=player.get('he',{type:'equip'});
				for(var i=0;i<es.length;i++){
					if(lib.inpile.contains(es[i].name)) return true;
				}
				return false;
			},
			prepare:function(cards,player){
				player.$throw(cards);
			},
			content:function(){
				for(var i=0;i<cards.length;i++){
					ui.discardPile.appendChild(cards[i]);
				}
				var name=lib.skill._lingjianduanzao.process(cards);
				player.gain(game.createCard(name),'gain2');
			},
			ai:{
				order:function(card,player){
					if(player.num('h',{type:'hslingjian'})) return 8.5;
					return 1;
				},
				result:{
					player:1,
				}
			}
		},
		hslingjian_yinshen:{
			mark:true,
			nopop:true,
			intro:{
				content:'锁定技，你不能成为其他角色的卡牌的目标'
			},
			mod:{
				targetEnabled:function(card,player,target){
					if(player!=target) return false;
				}
			}
		},
		hslingjian_chaofeng:{
			global:'hslingjian_chaofeng_disable',
			nopop:true,
			unique:true,
			gainnable:true,
			mark:true,
			intro:{
				content:'锁定技，若你的手牌数大于你的体力值，则只要你在任一其他角色的攻击范围内，该角色使用【杀】时便不能指定你以外的角色为目标',
			},
			subSkill:{
				disable:{
					mod:{
						targetEnabled:function(card,player,target){
							if(player.hasSkill('hslingjian_chaofeng')) return;
							if(card.name=='sha'){
								if(target.hasSkill('hslingjian_chaofeng')) return;
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].hasSkill('hslingjian_chaofeng')){
										if(game.players[i].hp<game.players[i].num('h')&&
											get.distance(player,game.players[i],'attack')<=1){
											return false;
										}
									}
								}
							}
						}
					}
				}
			}
		},
		hslingjian_xingtigaizao:{
			nopop:true,
			mod:{
				maxHandcard:function(player,num){
					if(typeof player.storage.hslingjian_xingtigaizao=='number'){
						return num-player.storage.hslingjian_xingtigaizao;
					}
				},
			},
			mark:true,
			intro:{
				content:function(storage){
					return '手牌上限-'+storage;
				}
			},
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.removeSkill('hslingjian_xingtigaizao');
				player.storage.hslingjian_xingtigaizao=0;
			}
		},
		qinglonglingzhu:{
			trigger:{source:'damageEnd'},
			direct:true,
			filter:function(event,player){
				return event.nature&&event.player&&event.player.isAlive();
			},
			content:function(){
				player.gainPlayerCard('是否对'+get.translation(trigger.player)+'发动【青龙灵珠】？',trigger.player,function(button){
					if(ai.get.attitude(player,trigger.player)<=0){
						return ai.get.buttonValue(button);
					}
					return 0;
				},'he').logSkill=['qinglonglingzhu',trigger.player];
			},
		},
		xingjunyan:{
			trigger:{source:'damageBegin',player:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				trigger.num++;
			}
		},
		baihupifeng:{
			trigger:{player:'phaseEnd'},
			frequent:true,
			filter:function(event,player){
				if(player.hp==player.maxHp) return false;
				for(var i=0;i<game.players.length;i++){
					if(player.hp>game.players[i].hp) return false;
				}
				return true;
			},
			content:function(){
				player.recover();
			},
		},
		fengxueren:{
			trigger:{player:'shaHit'},
			check:function(event,player){
				var att=ai.get.attitude(player,event.target);
				if(player.hasSkill('jiu')) return att>0;
				if(event.target.hp==1) return att>0;
				if(event.target.hasSkillTag('maixie')){
					return att<=0;
				}
				if(player.hasSkill('tianxianjiu')) return false;
				return att<=0;
			},
			filter:function(event,player){
				return !event.target.isTurnedOver();
			},
			content:function(){
				trigger.unhurt=true;
				trigger.target.turnOver();
				trigger.target.draw();
			}
		},
		chilongya:{
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.nature=='fire'&&event.notLink();
			},
			content:function(){
				trigger.num++;
			}
		},
		chilongya2:{
			trigger:{source:'damageBegin'},
			filter:function(event,player){
				return (event.card&&event.card.name=='sha');
			},
			popup:false,
			forced:true,
			content:function(){
				if(Math.random()<0.5){
					trigger.num++;
					trigger.player.addSkill('chilongfengxue');
				}
			}
		},
		chilongfengxue:{
			trigger:{global:'shaAfter'},
			forced:true,
			popup:false,
			content:function(){
				player.draw();
				player.removeSkill('chilongfengxue');
			}
		},
		shentou:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			filter:function(event,player){
				var nh=player.num('h');
				if(nh==0) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')>nh) return true;
				}
				return false;
			},
			check:function(card){
				return 8-ai.get.value(card);
			},
			filterTarget:function(card,player,target){
				if(target.get('h').length==0) return false;
				if(target==player) return false;
				if(target.num('h')<=player.num('h')) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					if(get.suit(card)=='club') return -1;
					return 1;
				});
				"step 1"
				if(result.bool){
					player.gain(target.get('h').randomGet());
					target.$give(1,player);
				}
			},
			ai:{
				basic:{
					order:5
				},
				result:{
					player:0.3,
					target:-1,
				}
			}
		},
		pusafazhou:{
			trigger:{player:'dieBefore'},
			forced:true,
			filter:function(event,player){
				return player.maxHp>0;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.hp=1;
				player.draw();
				player.discard(player.get('e',{subtype:'equip5'}));
				game.delay();
			}
		},
		old_longfan:{
			enable:'phaseUse',
			usable:1,
			prompt:'？',
			filterTarget:true,
			content:function(){
				"step 0"
				if(event.isMine()){
					event.longfan=ui.create.control('〇','〇','〇','〇',function(){
						event.longfan.status--;
					});
					event.longfan.status=4;
					for(var i=0;i<event.longfan.childNodes.length;i++){
						event.longfan.childNodes[i].num=0;
					}
					event.timer=setInterval(function(){
						if(event.longfan.status<=0){
							clearInterval(event.timer);
							game.resume();
							event.longfan.close();
							return;
						}
						event.count(0);
						if(event.longfan.status>1) event.count(1);
						if(event.longfan.status>2) event.count(2);
						if(event.longfan.status>3) event.count(3);
					},200);
					event.count=function(num){
						event.longfan.childNodes[num].num=(event.longfan.childNodes[num].num+1)%10;
						if(event.longfan.childNodes[num].num==2) event.longfan.childNodes[num].innerHTML='二';
						else event.longfan.childNodes[num].innerHTML=get.cnNumber(event.longfan.childNodes[num].num);
					}
					game.pause();
				}
				else{
					event.finish();
					var x=Math.random();
					if(x<0.1) target.draw();
					else if(x<0.2) target.chooseToDiscard(true);
					else if(x<0.3) target.loseHp();
					else if(x<0.4) target.recover();
					else if(x<0.6){
						if(ai.get.attitude(player,target)>0) target.draw();
						else target.chooseToDiscard(true);
					}
					else if(x<0.8){
						if(ai.get.attitude(player,target)>0) target.recover();
						else target.loseHp();
					}
				}
				"step 1"
				var str='';
				for(var i=0;i<event.longfan.childNodes.length;i++){
					str+=event.longfan.childNodes[i].num;
				}
				target.popup(str);
				game.delay();
				switch(str){
					case '0000':target.turnOver();break;
					case '1111':target.chooseToDiscard(2,true);break;
					case '2222':target.chooseToDiscard('e',true);break;
					case '3333':target.damage();break;
					case '4444':target.loseHp();break;
					case '5555':target.link();break;
					case '6666':target.draw();break;
					case '7777':target.recover();break;
					case '8888':target.discard(target.get('j'));break;
					case '9999':target.draw(2);target.chooseToDiscard(2,true);break;
					default:
					for(var i=1;i<4;i++){
						if(str[i]==str[0]) return;
					}
					player.chooseToDiscard(true);return;
				}
				player.draw();
			},
			ai:{
				basic:{
					order:10
				},
				result:{
					target:function(){
						return Math.random()-0.5;
					},
				}
			}
		},
		longfan:{
			enable:'phaseUse',
			usable:1,
			content:function(){
				"step 0"
				player.judge(function(card){
					switch(get.suit(card)){
						case 'heart':return player.maxHp>player.hp?2:0;
						case 'diamond':return 1;
						case 'club':return 1;
						case 'spade':return 0;
					}
				});
				"step 1"
				switch(result.suit){
					case 'heart':player.recover();break;
					case 'diamond':player.draw();break;
					case 'club':{
						player.chooseTarget('弃置一名角色的一张牌',function(card,player,target){
							return player!=target&&target.num('he')>0;
						}).ai=function(target){
							return -ai.get.attitude(player,target);
						};
						break;
					}
				}
				if(result.suit!='club'){
					event.finish();
				}
				"step 2"
				if(result.bool&&result.targets&&result.targets.length){
					player.line(result.targets[0],'green');
					player.discardPlayerCard(result.targets[0],'he',true);
				}
			},
			ai:{
				order:10,
				result:{
					player:1
				}
			}
		},
		touzhi:{
			enable:'phaseUse',
			usable:1,
			filterCard:function(card){
				return get.subtype(card)=='equip1';
			},
			filter:function(event,player){
				return player.num('he',{subtype:'equip1'})>0;
			},
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
			},
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return true;
			},
			content:function(){
				target.damage();
				target.gain(cards);
				game.delay();
			},
			check:function(card){
				return 10-ai.get.value(card);
			},
			position:'he',
			ai:{
				basic:{
					order:8
				},
				result:{
					target:-1
				}
			}
		},
		xixue:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return event.card&&event.card.name=='sha'&&player.hp<player.maxHp;
			},
			content:function(){
				player.recover(trigger.num);
			}
		},
		guangshatianyi:{
			trigger:{player:'damageBegin'},
			forced:true,
			filter:function(event,player){
				if(event.source&&event.source.num('s','unequip')) return false;
				if(Math.random()>1/3) return false;
				if(event.parent.player.num('s','unequip')) return false;
				return true;
			},
			content:function(){
				trigger.num--;
			}
		},
		nigong:{
			trigger:{player:'damageAfter'},
			group:['nigong2'],
			forced:true,
			content:function(){
				player.storage.nigong+=trigger.num;
				if(player.storage.nigong>4){
					player.storage.nigong=4;
				}
				player.updateMarks();
			},
			ai:{
				effect:function(card,player,target){
					if(get.tag(card,'damage')) return [1,0.5];
				}
			},
			intro:{
				content:function(storage){
					return '已积攒'+storage+'点伤害';
				}
			}
		},
		nigong2:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.storage.nigong>1;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			prompt:function(event){
				return '弃置所有逆攻标记，并对一名角色造成'+get.cnNumber(Math.floor(event.player.storage.nigong/2))+'点伤害';
			},
			content:function(){
				target.damage(Math.floor(player.storage.nigong/2));
				player.storage.nigong=0;
				player.updateMarks();
			},
			ai:{
				order:10,
				result:{
					target:function(player,target){
						return -Math.floor(player.storage.nigong/2);
					}
				}
			}
		},
		xujin:{
			trigger:{player:'phaseBefore'},
			check:function(){return false;},
			filter:function(event,player){
				return player.storage.xujin<player.hp;
			},
			content:function(){
				player.storage.xujin++;
				trigger.untrigger();
				trigger.finish();
			},
			intro:{
				content:function(storage){
					return '已积攒'+storage+'点力量';
				}
			},
			group:['xujin2']
		},
		xujin2:{
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return player.storage.xujin>0;
			},
			content:function(){
				trigger.num+=player.storage.xujin;
				player.storage.xujin--;
			}
		},
		sadengjinhuan:{
			trigger:{player:'shaMiss'},
			check:function(event,player){
				return ai.get.attitude(player,event.target)<0;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				})
				"step 1"
				if(result.bool){
					trigger.target.chooseToRespond({name:'shan'}).autochoose=lib.filter.autoRespondShan;
				}
				else{
					event.finish();
				}
				"step 2"
				if(!result.bool){
					trigger.untrigger();
					trigger.trigger('shaHit');
					trigger._result.bool=false;
				}
			}
		},
		ximohu:{
			trigger:{player:'damageBefore'},
			forced:true,
			filter:function(event){
				return event.nature=='thunder';
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.recover(trigger.num);
			},
			ai:{
				effect:function(card){
					if(get.tag(card,'thunderDamage')) return [0,2];
				}
			}
		},
		guiyanfadao:{
			trigger:{player:'shaHit'},
			check:function(event,player){
				var att=ai.get.attitude(player,event.target);
				if(player.hasSkill('jiu')) return att>0;
				if(event.target.hasSkillTag('maixie')){
					return att<=0;
				}
				if(event.target.hp==1) return att>0;
				if(event.target.hujia>0) return att<0;
				return false;
			},
			content:function(){
				trigger.unhurt=true;
				trigger.target.loseHp();
			}
		},
		guiyanfadao2:{
			trigger:{player:'useCardAfter'},
			forced:true,
			popup:false,
			content:function(){
				delete player.storage.zhuque_skill.nature;
			}
		},
		tianxianjiu:{
			trigger:{source:'damageEnd'},
			filter:function(event){
				return (event.card&&(event.card.name=='sha'));
			},
			forced:true,
			temp:true,
			content:function(){
				player.draw(2);
				player.removeSkill('tianxianjiu');
			}
		},
	},
	cardType:{
		hslingjian:0.5,
		jiqi:0.4,
		jiguan:0.45
	},
	translate:{
		shuchui:'鼠槌',
		shuchui_info:'出牌阶段限一次，你可以指定一名攻击范围内的角色，依次将手牌中的所有杀对该角色使用，杀每造成一次伤害你摸一张牌（最多使用4张杀）',
		zhiluxiaohu:'指路小狐',
		zhiluxiaohu_info:'出牌阶段对自己使用，视为对一名随机敌方角色使用一张杀，然后摸一张牌',
		xuejibingbao:'雪肌冰鲍',
		xuejibingbao_info:'出牌阶段对一名角色使用，该角色摸牌阶段摸牌数+1，持续2个回合',
		gouhunluo:'勾魂锣',
		gouhunluo_info:'出牌阶段对一名角色使用，在3轮后你的回合开始时令该角色失去2点体力，若你死亡则失效',
		jiguan:'机关',
		jiqi:'祭器',
		qinglongzhigui:'青龙之圭',
		_qinglongzhigui:'青龙之圭',
		qinglongzhigui_info:'可用于煅造装备；此牌在你手牌中时，回合开始阶段，你摸两张牌然后弃置一张牌',
		qinglongzhigui_duanzao:'云屏',
		qinglongzhigui_equip1_info:'回合结束阶段，你摸一张牌',
		qinglongzhigui_equip2_info:'回合结束阶段，你摸一张牌',
		qinglongzhigui_equip3_info:'回合结束阶段，你摸一张牌',
		qinglongzhigui_equip4_info:'回合结束阶段，你摸一张牌',
		qinglongzhigui_equip5_info:'回合结束阶段，你摸一张牌',
		baishouzhihu:'白兽之琥',
		_baishouzhihu:'白兽之琥',
		baishouzhihu_info:'可用于煅造装备；此牌在你手牌中时，每当你弃置卡牌，你可以弃置一名其他角色的一张牌',
		baishouzhihu_duanzao:'风牙',
		baishouzhihu_equip1_info:'回合结束阶段，你可以弃置一名其他角色的一张牌',
		baishouzhihu_equip2_info:'回合结束阶段，你可以弃置一名其他角色的一张牌',
		baishouzhihu_equip3_info:'回合结束阶段，你可以弃置一名其他角色的一张牌',
		baishouzhihu_equip4_info:'回合结束阶段，你可以弃置一名其他角色的一张牌',
		baishouzhihu_equip5_info:'回合结束阶段，你可以弃置一名其他角色的一张牌',
		zhuquezhizhang:'朱雀之璋',
		_zhuquezhizhang:'朱雀之璋',
		zhuquezhizhang_info:'可用于煅造装备；此牌在你手牌中时，每当你受到伤害，你对伤害来源造成一点火属性伤害',
		zhuquezhizhang_duanzao:'炽翎',
		zhuquezhizhang_equip1_info:'回合结束阶段，你可以弃置一张红色牌并对一名体力值不小于你的角色造成一点火属性伤害',
		zhuquezhizhang_equip2_info:'回合结束阶段，你可以弃置一张红色牌并对一名体力值不小于你的角色造成一点火属性伤害',
		zhuquezhizhang_equip3_info:'回合结束阶段，你可以弃置一张红色牌并对一名体力值不小于你的角色造成一点火属性伤害',
		zhuquezhizhang_equip4_info:'回合结束阶段，你可以弃置一张红色牌并对一名体力值不小于你的角色造成一点火属性伤害',
		zhuquezhizhang_equip5_info:'回合结束阶段，你可以弃置一张红色牌并对一名体力值不小于你的角色造成一点火属性伤害',
		xuanwuzhihuang:'玄武之璜',
		_xuanwuzhihuang:'玄武之璜',
		xuanwuzhihuang_duanzao:'寒晶',
		xuanwuzhihuang_info:'可用于煅造装备；此牌在你手牌中时，每当你造成伤害，你回复等量的体力',
		xuanwuzhihuang_equip1_info:'回合结束阶段，你可以弃置一张红色牌并回复一点体力',
		xuanwuzhihuang_equip2_info:'回合结束阶段，你可以弃置一张红色牌并回复一点体力',
		xuanwuzhihuang_equip3_info:'回合结束阶段，你可以弃置一张红色牌并回复一点体力',
		xuanwuzhihuang_equip4_info:'回合结束阶段，你可以弃置一张红色牌并回复一点体力',
		xuanwuzhihuang_equip5_info:'回合结束阶段，你可以弃置一张红色牌并回复一点体力',
		huanglinzhicong:'黄麟之琮',
		_huanglinzhicong:'黄麟之琮',
		huanglinzhicong_duanzao:'玄甲',
		huanglinzhicong_info:'可用于煅造装备；此牌在你手牌中时，回合开始阶段，若你没有护甲，你获得一点护甲',
		huanglinzhicong_equip1_info:'回合结束阶段，若你没有护甲，你可以弃置一张黑色牌并获得一点护甲',
		huanglinzhicong_equip2_info:'回合结束阶段，若你没有护甲，你可以弃置一张黑色牌并获得一点护甲',
		huanglinzhicong_equip3_info:'回合结束阶段，若你没有护甲，你可以弃置一张黑色牌并获得一点护甲',
		huanglinzhicong_equip4_info:'回合结束阶段，若你没有护甲，你可以弃置一张黑色牌并获得一点护甲',
		huanglinzhicong_equip5_info:'回合结束阶段，若你没有护甲，你可以弃置一张黑色牌并获得一点护甲',
		cangchizhibi:'苍螭之璧',
		_cangchizhibi:'苍螭之璧',
		cangchizhibi_duanzao:'灵枢',
		cangchizhibi_info:'可用于煅造装备；此牌在你手牌中时，回合开始阶段，你可以选择至多3名角色横置或重置之',
		cangchizhibi_equip1_info:'回合结束阶段，你可以横置或重置一名角色',
		cangchizhibi_equip2_info:'回合结束阶段，你可以横置或重置一名角色',
		cangchizhibi_equip3_info:'回合结束阶段，你可以横置或重置一名角色',
		cangchizhibi_equip4_info:'回合结束阶段，你可以横置或重置一名角色',
		cangchizhibi_equip5_info:'回合结束阶段，你可以横置或重置一名角色',

		guisheqi:'龟蛇旗',
		guisheqi_info:'出牌阶段对一名角色使用，目标获得一点护甲',
		jiguanfeng:'机关蜂',
		jiguanfeng_info:'出牌阶段对一名其他角色使用，目标需打出一张闪，否则受到一点伤害，然后与你各流失一点体力',
		jiguanyuan:'机关鸢',
		jiguanyuan_info:'出牌阶段对一名其他角色使用，你将此牌和一张其它牌置于一名其他角色的武将牌上，然后摸一张牌；该角色于下一回合结束时获得武将牌上的牌',
		jiguantong:'机关火筒',
		jiguantong_ab:'火筒',
		jiguantong_info:'出牌阶段对所有其他角色使用，目标弃置一张手牌，或受到一点火焰伤害；若没有人因此受到伤害，使用者摸一张牌',
		jiutiansuanchi:'九天算尺',
		jiutiansuanchi_info:'每当你使用杀造成伤害，你可以弃置一张牌并展示受伤害角色的一张手牌，若此牌与你弃置的牌花色或点数相同，此杀的伤害+2',
		fengyinzhidan:'封印之蛋',
		fengyinzhidan_info:'随机获得一张衍生牌',
		qinglianxindeng:'青莲心灯',
		qinglianxindeng_info:'你防止锦囊牌造成的伤害',
		hslingjian_xuanfengzhiren_duanzao:'风刃',
		hslingjian_xuanfengzhiren_duanzao2:'风',
		hslingjian_xuanfengzhiren_equip1_info:'每当你用杀造成一次伤害，受伤害角色随机弃置一张牌',
		hslingjian_xuanfengzhiren_equip2_info:'每当你受到杀造成的伤害，伤害来源随机弃置一张牌',
		hslingjian_xuanfengzhiren_equip3_info:'当你于回合外失去牌后，你本回合的防御距离+1',
		hslingjian_xuanfengzhiren_equip4_info:'当你于回合内失去牌后，你本回合的进攻距离+1',
		hslingjian_xuanfengzhiren_equip5_info:'出牌阶段限一次，你可以弃置一张牌，然后随机弃置一名其他角色的一张牌',
		hslingjian_zhongxinghujia_duanzao:'重甲',
		hslingjian_zhongxinghujia_duanzao2:'护',
		hslingjian_zhongxinghujia_equip1_info:'每当你用杀造成一次伤害，你可以随机装备一件防具牌',
		hslingjian_zhongxinghujia_equip2_info:'每当你受到杀造成的伤害，你可以弃置伤害来源的防具牌',
		hslingjian_zhongxinghujia_equip3_info:'当你的装备区内有防具牌时，你的防御距离+1',
		hslingjian_zhongxinghujia_equip4_info:'当你的装备区内有防具牌时，你的进攻距离+1',
		hslingjian_zhongxinghujia_equip5_info:'出牌阶段限一次，你可以弃置两张牌，然后令一名角色随机装备一件防具',
		hslingjian_jinjilengdong_duanzao:'冰冻',
		hslingjian_jinjilengdong_duanzao2:'冰',
		hslingjian_jinjilengdong_equip1_info:'每当你用杀造成一次伤害，你可以令目标摸两张牌并翻面',
		hslingjian_jinjilengdong_equip2_info:'每当你受到杀造成的伤害，你可以令伤害来源摸两张牌并翻面',
		hslingjian_jinjilengdong_equip3_info:'你的武将牌背面朝上时防御距离+2',
		hslingjian_jinjilengdong_equip4_info:'你的武将牌背面朝上时进攻距离+2',
		hslingjian_jinjilengdong_equip5_info:'回合结束后，若你的武将牌正面朝上，你可以与一名武将牌正面朝上的其他角色同时翻面，然后各摸两张牌',
		hslingjian_yinmilichang_duanzao:'隐力',
		hslingjian_yinmilichang_duanzao2:'隐',
		hslingjian_yinmilichang_equip1_info:'每当你用杀造成一次伤害，你可以令一名其他角色获得潜行直到其下一回合开始',
		hslingjian_yinmilichang_equip2_info:'每当你受到一次伤害，你本回合内获得潜行',
		hslingjian_yinmilichang_equip3_info:'当你的体力值为1时，你的防御距离+1',
		hslingjian_yinmilichang_equip4_info:'当你的体力值为1时，你的进攻距离+1',
		hslingjian_yinmilichang_equip5_info:'当你没有手牌时，你不能成为杀或决斗的目标',
		hslingjian_xingtigaizao_duanzao:'移形',
		hslingjian_xingtigaizao_duanzao2:'形',
		hslingjian_xingtigaizao_equip1_info:'每当你用杀造成一次伤害，你摸一张牌',
		hslingjian_xingtigaizao_equip2_info:'每当你受到杀造成的伤害，你摸一张牌',
		hslingjian_xingtigaizao_equip3_info:'你的防御距离+1，进攻距离-1',
		hslingjian_xingtigaizao_equip4_info:'你的防御距离-1，进攻距离+1',
		hslingjian_xingtigaizao_equip5_info:'你于摸牌阶段额外摸一张牌；你的手牌上限-1',
		hslingjian_shengxiuhaojiao_duanzao:'号角',
		hslingjian_shengxiuhaojiao_duanzao2:'角',
		hslingjian_shengxiuhaojiao_equip1_info:'有嘲讽的角色不能闪避你的杀',
		hslingjian_shengxiuhaojiao_equip2_info:'有嘲讽的角色不能对你使用杀',
		hslingjian_shengxiuhaojiao_equip3_info:'若你的手牌数大于你的体力值，你的防御距离+1',
		hslingjian_shengxiuhaojiao_equip4_info:'若你的手牌数大于你的体力值，你的进攻距离+1',
		hslingjian_shengxiuhaojiao_equip5_info:'出牌阶段限一次，你可以弃置两张牌，然后令一名角色获得或解除嘲讽',
		hslingjian_shijianhuisu_duanzao:'回溯',
		hslingjian_shijianhuisu_duanzao2:'溯',
		hslingjian_shijianhuisu_equip1_info:'当你装备一张防具牌时，你摸一张牌',
		hslingjian_shijianhuisu_equip2_info:'当你装备一张武器牌时，你摸一张牌',
		hslingjian_shijianhuisu_equip3_info:'当你的装备区内没有其他牌时，你的防御距离+1',
		hslingjian_shijianhuisu_equip4_info:'当你的装备区内没有其他牌时，你的进攻距离+1',
		hslingjian_shijianhuisu_equip5_info:'出牌阶段限一次，你可以弃置一张牌，然后令一名其他角色将其装备区内的牌收回手牌',
		_lingjianduanzao:'煅造',
		_lingjianduanzao_info:'出牌阶段，你可以将一张装备牌和一张可煅造的牌合成为一件强化装备；强化装备可以装备给距离1以内的角色',
		jiguanshu:'机关鼠',
		jiguanshu_info:'出牌阶段对一名角色使用，用随机零件强化目标装备区内的装备',
		lingjiandai:'零件袋',
		lingjiandai_info:'出牌阶段对自己使用，获得3张随机零件',
		mujiaren:'木甲人',
		mujiaren_info:'出牌阶段限用一次，将你手牌中的非基本牌（含此张）替换为随机的机关牌',
		jiguanyaoshu:'机关要术',
		jiguanyaoshu_skill:'巧匠',
		jiguanyaoshu_skill_info:'每当你于回合外失去装备区内的牌，你获得一个随机零件',
		jiguanyaoshu_info:'出牌阶段对距离1以内的一名角色使用，目标随机装备一件装备牌并获得技能巧匠（每当你于回合外失去装备区内的牌，你获得一个随机零件）',
		hslingjian:'零件',
		hslingjian_xuanfengzhiren:'旋风之刃',
		hslingjian_xuanfengzhiren_info:'可用于煅造装备；随机弃置一名角色的一张牌',
		hslingjian_zhongxinghujia:'重型护甲',
		hslingjian_zhongxinghujia_info:'可用于煅造装备；令一名角色装备一件随机防具，然后随机弃置其一张手牌',
		hslingjian_jinjilengdong:'紧急冷冻',
		hslingjian_jinjilengdong_info:'可用于煅造装备；令一名武将牌正面朝上的其他角色摸两张牌并翻面',
		hslingjian_yinmilichang:'隐秘力场',
		hslingjian_yinmilichang_info:'可用于煅造装备；令一名其他角色获得技能潜行，直到其下一回合开始',
		hslingjian_xingtigaizao:'型体改造',
		hslingjian_xingtigaizao_info:'可用于煅造装备；摸一张牌，本回合手牌上限-1',
		hslingjian_shengxiuhaojiao:'生锈号角',
		hslingjian_shengxiuhaojiao_info:'可用于煅造装备；令一名角色获得技能嘲讽，直到其下一回合开始',
		hslingjian_shijianhuisu:'时间回溯',
		hslingjian_shijianhuisu_info:'可用于煅造装备；令一名其他角色将其装备牌收回手牌',
		hslingjian_chaofeng:'嘲讽',
		hslingjian_chaofeng_info:'锁定技，若你的手牌数大于你的体力值，则只要你在任一其他角色的攻击范围内，该角色使用【杀】时便不能指定你以外的角色为目标',
		hslingjian_yinshen:'潜行',
		hslingjian_yinshen_info:'锁定技，你不能成为其他角色的卡牌的目标',
		qinglonglingzhu:'青龙灵珠',
		qinglonglingzhu_ab:'灵珠',
		qinglonglingzhu_info:'每当你造成一次属性伤害，你可以获得对方的一张牌',
		xingjunyan:'星君眼',
		xingjunyan_info:'你的杀造成的伤害+1；杀对你造成的伤害+1',
		guiyanfadao:'鬼眼法刀',
		guiyanfadao_bg:'眼',
		guiyanfadao_info:'每当你使用杀命中目标，你可以防止伤害，改为令目标失去一点体力',
		tianxianjiu:'天仙酒',
		tianxianjiu_bg:'仙',
		tianxianjiu_info:'出牌阶段对自己使用，你使用的下一张杀造成伤害后可以摸两张牌；濒死阶段，对自己使用，回复1点体力',
		xiangyuye:'翔羽叶',
		xiangyuye_info:'出牌阶段，对一名攻击范围外的角色使用，令其弃置一张黑色手牌或流失一点体力',
		huanpodan:'还魄丹',
		huanpodan_bg:'魄',
		huanpodan_info:'出牌阶段对一名已死亡角色使用，令其复活，将体力值变为1，并摸一张牌',
		ximohu:'吸魔壶',
		ximohu_bg:'魔',
		// ximohu_info:'锁定技，你将即将受到的雷属性伤害转化为你的体力值',
		sadengjinhuan:'萨登荆环',
		sadengjinhuan_info:'当你的杀被闪避后，可以进行一次判定，若结果为红色目标需再打出一张闪',
		sadengjinhuan_bg:'荆',
		qipoguyu:'奇魄古玉',
		xujin:'蓄劲',
		xujin2:'蓄劲',
		// qipoguyu_info:'装备后获得蓄劲技能',
		xujin_info:'回合开始前，若你的蓄劲标记数小于当前的体力值，你可以跳过此回合，并获得一枚蓄劲标记。锁定技，每当你即将造成伤害，你令此伤害+X，然后弃置一枚蓄劲标记，X为你拥有的蓄劲标记数',
		guilingyupei:'归灵玉佩',
		nigong:'逆攻',
		nigong2:'逆攻',
		nigong3:'逆攻',
		nigong4:'逆攻',
		guilingyupei_info:'每当你受到一点伤害，你获得一个逆攻标记，标记数不能超过4。出牌阶段，你可以弃置所有逆攻标记并令任意一名其他角色X/2点伤害，X为逆攻标记的数量且向下取整',
		nigong_info:'每当你受到一点伤害，你获得一个逆攻标记，标记数不能超过4。出牌阶段，你可以弃置所有逆攻标记并令任意一名其他角色X/2点伤害，X为逆攻标记的数量且向下取整',
		baihupifeng:'白狐披风',
		baihupifeng_bg:'狐',
		baihupifeng_info:'回合结束阶段，若你的体力值是全场最小的之一，你可以回复一点体力',
		fengxueren:'封雪刃',
		fengxueren_bg:'雪',
		fengxueren_info:'你使用杀击中目标后，若目标武将牌正面朝上，你可以防止伤害，然后令目标摸一张牌并翻面',
		chilongya:'赤龙牙',
		chilongya_info:'锁定技，你的火属性伤害+1',
		daihuofenglun:'带火风轮',
		daihuofenglun_bg:'轮',
		daihuofenglun_info:'你与其他角色的距离-2，其他角色与你的距离-1',
		xiayuncailing:'霞云彩绫',
		xiayuncailing_bg:'云',
		xiayuncailing_info:'你与其他角色的距离+1，其他角色与你的距离+2',
		shentoumianju:'神偷面具',
		shentoumianju_bg:'偷',
		shentoumianju_info:'出牌阶段，你可以指定一名手牌比你多的角色进行一次判定，若结果不为梅花，你获得其一张手牌',
		shentou:'神偷',
		shentou_info:'出牌阶段，你可以进行一次判定，若结果不为梅花，你获得任意一名角色的一张手牌',
		pusafazhou:'菩萨发咒',
		pusafazhou_bg:'发',
		// pusafazhou_info:'令你抵挡一次死亡，将体力回复至1，并摸一张牌',
		xianluhui:'仙炉灰',
		xianluhui_info:'令所有已受伤角色摸数量等同于其已损失体力值的牌（最多3张）',
		caoyao:'草药',
		caoyao_info:'出牌阶段，对距离为1以内的角色使用，回复一点体力。',
		pantao:'蟠桃',
		// pantao_info:'出牌阶段，对自己使用，回复两点体力。',
		langeguaiyi:'蓝格怪衣',
		langeguaiyi_bg:'格',
		langeguaiyi_info:'出牌阶段限一次，你可以进行一次判定，然后按花色执行以下效果。红桃：你回复一点体力；方片：你摸一张牌；梅花：你弃置一名其他角色的一张牌；黑桃：无事发生',
		longfan:'龙帆',
		longfan_info:'出牌阶段限一次，你可以进行一次判定，然后按花色执行以下效果。红桃：你回复一点体力；方片：你摸一张牌；梅花：你弃置一名其他角色的一张牌；黑桃：无事发生',
		// longfan_info:'0000：翻面；1111：弃手牌；2222：弃装备牌；3333：受伤害；4444：流失体力；5555：连环；6666：摸牌；7777：回复体力；8888：弃置判定牌；9999：置衡',
		guiyoujie:'鬼幽结',
		guiyoujie_info:'出牌阶段，对一名其他角色使用。若判定结果为黑色，则将其翻面。',
		yufulu:'御夫录',
		yufulu_info:'仅女性角色可以使用，出牌阶段，可弃置一张武器牌令一名角色受到一点伤害，然后该角色获得此武器牌',
		touzhi:'投掷',
		touzhi_info:'出牌阶段，可弃置一张武器牌令一名角色受到一点伤害，然后该角色获得此武器牌',
		xixueguizhihuan:'吸血鬼指环',
		xixueguizhihuan_info:'锁定技，每当你使用杀造成一点伤害，你回复一点体力',
		xixue:'吸血',
		xixue_info:'锁定技，每当你使用杀造成一点伤害，你回复一点体力',
		zhufangshenshi:'祠符',
		zhufangshenshi_info:'出牌阶段，对一名相邻角色使用，与其交换位置',
		jingleishan:'惊雷闪',
		jingleishan_info:'出牌阶段，对所有其他角色使用。每名目标角色需打出一张【杀】，否则受到1点雷电伤害。',
		chiyuxi:'炽羽袭',
		chiyuxi_info:'出牌阶段，对所有其他角色使用。每名目标角色需打出一张【闪】，否则受到1点火焰伤害。',
		guangshatianyi:'光纱天衣',
		guangshatianyi_bg:'纱',
		guangshatianyi_info:'仅女性可装备，锁定技，每当你即将受到伤害，有三分之一的概率令伤害减一',
		sifeizhenmian:'四非真面',
		sifeizhenmian_info:'出牌阶段限一次，你可以指定攻击范围内的一名角色并亮出牌堆顶的一张牌，若此牌为黑色，该角色进入混乱状态直到下一回合结束；否则该角色摸一张牌',
		yiluan:'意乱',
		yiluan_info:'出牌阶段限一次，你可以指定攻击范围内的一名角色并亮出牌堆顶的一张牌，若此牌为黑色，该角色进入混乱状态直到下一回合结束；否则该角色摸一张牌',
		donghuangzhong:'东皇钟',
		xuanyuanjian:'轩辕剑',
		xuanyuanjian2:'轩辕剑',
		pangufu:'盘古斧',
		lianyaohu:'炼妖壶',
		haotianta:'昊天塔',
		fuxiqin:'伏羲琴',
		shennongding:'神农鼎',
		kongdongyin:'崆峒印',
		kunlunjingc:'昆仑镜',
		nvwashi:'女娲石',
		donghuangzhong_bg:'钟',
		lianyaohu_bg:'壶',
		haotianta_bg:'塔',
		fuxiqin_bg:'琴',
		shennongding_bg:'鼎',
		kongdongyin_bg:'印',
		kunlunjingc_bg:'镜',
		nvwashi_bg:'石',
		kongxin:'控心',
		lianhua:'炼化',
		lianhua_info:'出牌阶段限一次，你可以弃置两张炼妖壶中的牌，从牌堆中获得一张与弃置的牌类别均不相同的牌',
		shouna:'收纳',
		shouna_info:'当一名其他角色于回合外弃置的卡牌进入弃牌堆后，你可以选择其中的一张放入炼妖壶，每名角色的回合限一次',
		donghuangzhong_info:'回合结束阶段，你可以弃置一张手牌，并选择一名角色将一张随机判定牌置入其判定区',
		xuanyuanjian_info:'锁定技，每当你即将造成一次伤害，你令此伤害加一并变为雷属性，此伤害结算后，你流失一点体力并摸一张牌。任何时候，若你体力值不超过2，则立即失去轩辕剑',
		pangufu_info:'锁定技，每当你造成一次伤害，受伤角色须弃置一张牌',
		haotianta_info:'锁定技，任意一名角色进行判定前，你观看牌堆顶的3张牌，并选择一张作为判定结果，此结果不可被更改，也不能触发技能。每回合最多发动一次',
		shennongding_info:'出牌阶段，你可以弃置两张手牌，然后回复一点体力。每阶段限一次',
		kongdongyin_info:'令你抵挡一次死亡，将体力回复至1，并摸一张牌，发动后进入弃牌堆',
		kunlunjingc_info:'出牌阶段限一次，你可以观看牌堆顶的三张牌，然后用一张手牌替换其中的一张',
		nvwashi_info:'当一名角色濒死时，若你的体力值大于1，你可以失去一点体力并令其回复一点体力',
		kongxin_info:'出牌阶段限一次，你可以与一名其他角色进行拼点，若你赢，你可以指定另一名角色视为对方对该角色使用一张杀，否则对方可弃置你一张牌',
		fuxiqin_info:'出牌阶段限一次，你可以与一名其他角色进行拼点，若你赢，你可以指定另一名角色视为对方对该角色使用一张杀，否则对方可弃置你一张牌',
		lianyaohu_info:'当一名其他角色于回合外弃置的卡牌进入弃牌堆后，你将其放入炼妖壶（每回合只发动一次）；出牌阶段限一次，你可以弃置两张炼妖壶中的牌，从牌堆中获得一张与弃置的牌类别均不相同的牌',
	},
	list:[
		['spade',1,'baihupifeng'],
		['club',1,'fengxueren'],
		['diamond',1,'langeguaiyi'],
		['heart',1,'daihuofenglun','fire'],

		['diamond',2,'xiayuncailing'],
//		['heart',2,'pantao'],
		['club',2,'huanpodan'],

		['club',3,'caoyao'],
		['diamond',3,'chilongya','fire'],
		['spade',3,'guiyoujie'],

		['club',4,'caoyao'],
		['spade',4,'zhufangshenshi'],
		['spade',4,'huanpodan'],

		['club',5,'caoyao'],
		['spade',5,'xixueguizhihuan'],
		['diamond',5,'huanpodan'],

		['club',6,'shentoumianju'],
		['spade',6,'yufulu'],

		['diamond',7,'chiyuxi','fire'],
		['club',7,'jingleishan','thunder'],
		['spade',7,'guilingyupei'],

		['spade',8,'zhufangshenshi'],
		['club',8,'xiangyuye','poison'],

		// ['spade',9,'ximohu','brown'],
		['club',9,'guiyoujie'],
		['diamond',9,'xiangyuye','poison'],

		// ['diamond',9,'tianxianjiu'],
		['heart',9,'tianxianjiu'],
		['diamond',2,'tianxianjiu'],

		['spade',2,'qinglonglingzhu'],
		['spade',7,'xingjunyan'],

		//['spade',10,'qipoguyu'],
		//['diamond',10,'xiangyuye','poison'],

		['spade',11,'xiangyuye','poison'],

		['spade',12,'guiyanfadao','poison'],

		['spade',13,'xianluhui'],
		['diamond',3,'guangshatianyi'],
		['club',13,'sadengjinhuan'],

		['club',1,'lingjiandai'],
		['spade',1,'lingjiandai'],
		['heart',1,'lingjiandai'],
		['diamond',1,'lingjiandai'],

		['club',2,'jiguanshu'],
		['spade',2,'jiguanshu'],
		// ['heart',2,'jiguanshu'],
		['diamond',2,'jiguanshu'],

		['club',3,'jiguanyaoshu'],
		['spade',3,'jiguanyaoshu'],
		// ['heart',3,'jiguanyaoshu'],
		// ['diamond',3,'jiguanyaoshu'],

		['spade',4,'sifeizhenmian'],
		['heart',13,'qinglianxindeng'],
		['club',3,'jiguanyuan'],
		['diamond',2,'jiguanyuan'],
		['diamond',4,'jiguantong'],
		['club',7,'jiguantong'],
		['spade',1,'fengyinzhidan'],
		['spade',2,'fengyinzhidan'],
		['heart',1,'fengyinzhidan'],
		['club',3,'jiguanfeng'],
		['spade',4,'jiguanfeng'],
		['spade',9,'guisheqi'],
		['club',7,'guisheqi'],

		['diamond',13,'donghuangzhong'],
		['diamond',13,'fuxiqin'],
		['spade',13,'kunlunjingc'],
		['spade',13,'xuanyuanjian'],
		['spade',13,'pangufu'],
		['club',13,'lianyaohu'],
		['diamond',13,'haotianta'],
		['club',13,'shennongding'],
		['heart',13,'nvwashi'],
		['heart',13,'kongdongyin'],

		['heart',6,'qinglongzhigui'],
		['diamond',6,'zhuquezhizhang'],
		['spade',6,'baishouzhihu'],
		['club',6,'xuanwuzhihuang'],
		['spade',7,'cangchizhibi'],
		['heart',5,'huanglinzhicong'],

		['spade',9,'gouhunluo'],
		['club',7,'gouhunluo'],

		['spade',1,'xuejibingbao'],
		['club',1,'xuejibingbao'],

		['heart',3,'zhiluxiaohu'],
		['diamond',4,'zhiluxiaohu'],

		['club',7,'mujiaren'],
		['heart',6,'mujiaren'],
		['diamond',11,'mujiaren'],

		['club',6,'shuchui'],
	],
}
