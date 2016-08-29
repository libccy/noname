'use strict';
character.hearth={
	character:{
		hs_jaina:['female','wei',3,['huopu','bianxing','bingjia']],
		hs_lrexxar:['male','shu',4,['shoulie','gongji']],
		hs_wuther:['male','qun',4,['fengxian','jieming']],
		hs_jgarrosh:['male','shu',4,['zhanhou','qiangxi']],
		hs_malfurion:['male','wu',4,['jihuo']],
		hs_guldan:['male','wei',3,['fenliu','hongxi']],
		hs_anduin:['male','qun',3,['shengguang','shijie','anying']],
		hs_sthrall:['male','wu',4,['tuteng','guozai','zuling']],
		hs_waleera:['female','shu',3,['jianren','mengun','wlianji']],

		hs_medivh:['male','wei',3,['jingxiang','moying','mdzhoufu']],
		hs_alleria:['male','wu',3,['fengxing','qiaodong','liegong']],
		hs_magni:['male','shu',4,['zhongjia','dunji']],
		hs_liadrin:['female','shu',4,['xueren']],
		hs_morgl:['male','wu',3,['s_tuteng']],

		hs_neptulon:['male','wu',4,['liechao','qingliu']],
		hs_wvelen:['male','qun',3,['shengyan','xianzhi']],
		hs_antonidas:['male','wei',3,['yanshu','bingshuang']],
		hs_alakir:['male','wei',3,['fengnu','shengdun']],
		hs_zhouzhuo:['male','qun',4,['yiwen']],
		hs_yngvar:['male','qun',3,['huanwu']],
		hs_bchillmaw:['male','wei',6,['hanshuang','bingshi']],
		hs_malorne:['male','wu',3,['enze','chongsheng']],
		hs_malygos:['male','wei',4,['malymowang']],
		hs_xuefashi:['male','wei',2,['liehun','xjumo']],
		hs_loatheb:['male','wu',5,['fengyin']],
		hs_trueheart:['female','qun',3,['qianghuax']],
		hs_sainaliusi:['male','wu',4,['chongsheng','yulu']],
		hs_lrhonin:['male','wei',4,['bingyan','yufa']],
		hs_bolvar:['male','wei',4,['yuanzheng','byuhuo']],
		hs_fuding:['male','wei',4,['shengdun','fbeifa']],
		hs_xuanzhuanjijia:['male','shu',3,['jixuan']],
		hs_ysera:['female','wu',4,['chenshui']],
		hs_alextrasza:['female','shu',5,['fushi']],
		hs_nozdormu:['male','qun',5,['shixu']],
		// hs_sapphiron:['male','wei',4,['bingdong','stuxi']],
		hs_kchromaggus:['male','wei',4,['fenlie']],
		hs_lreno:['male','shu',4,['tanmi']],
		hs_brann:['male','shu',3,['mashu','qianghua']],
		hs_finley:['male','wu',3,['maoxian']],
		hs_kcthun:['male','qun',4,['luanji','xianji']],
		hs_anomalus:['male','wei',4,['mobao']],
		hs_blingtron:['male','shu',3,['zengli','xiubu']],
		hs_yogg:['male','wu',4,['kuangluan']],
		hs_xialikeer:['female','shu',3,['duxin']],

		hs_zhishigushu:['male','shu',4,['jiaohui']],
		hs_zhanzhenggushu:['male','wei',6,['biri']],
		hs_ronghejuren:['male','shu',8,['ronghuo']],
		hs_shanlingjuren:['male','wu',8,['luoshi']],
		hs_aedwin:['male','wu',3,['lianzhan']],
		hs_mijiaojisi:['female','wu',3,['kuixin']],
		hs_huzhixiannv:['female','wu',3,['jingmeng','qingliu']],
		// hs_tgolem:['male','wu',4,['xinwuyan','guozai']],
		hs_totemic:['male','wu',3,['peiyu']],
		// hs_wujiyuansu:['male','wu',3,['s_tuteng']],
		hs_xsylvanas:['female','qun',3,['busi','xshixin','xmojian']],
		hs_siwangzhiyi:['male','qun',12,['mieshi']],
		hs_bilanyoulong:['male','wei',4,['lingzhou']],
		hs_jinglinglong:['male','wu',3,['mianyi']],
		// hs_ruanniguai:['male','wu',3,['nianfu']],
		// hs_hudunren:['male','shu',3,['hhudun']],
		hs_nate:['male','wu',4,['chuidiao']],
		hs_jiaziruila:['male','wu',4,['hannu']],
		// hs_shifazhe:['male','wei',3,['jizhi','shifa']],
		hs_lafamu:['male','shu',4,['xieneng']],
		hs_yelise:['female','wei',3,['xunbao','zhuizong']],

		hs_fandral:['male','shu',4,['nuyan','chouhuo']],
		hs_hallazeal:['male','wei',4,['shengteng','yuansu']],
		// hs_nzoth:['male','shu',4,['nuyan']],
		hs_walian:['male','shu',4,['wzhanyi']],
		// hs_pengpeng:['male','qun',4,['zhadan']],
	},
	perfectPair:{
		hs_sthrall:['hs_totemic','hs_alakir','hs_neptulon','hs_yngvar','hs_tgolem'],
		hs_anduin:['hs_wvelen','hs_mijiaojisi'],
		hs_jaina:['hs_antonidas'],
		hs_malfurion:['hs_malorne'],
	},
	skill:{
		peiyu:{
			enable:'phaseUse',
			filterCard:true,
			position:'he',
			filterTarget:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				'step 0'
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4',
					'tuteng5','tuteng6','tuteng7','tuteng8'];
				var rand2=[];
				for(var i=0;i<target.skills.length;i++){
					if(rand.contains(target.skills[i])){
						rand.remove(target.skills[i]);
						rand2.push(target.skills[i]);
					}
				}
				if(!rand.length){
					event.finish();
					return;
				}
				if(!target.storage.peiyu){
					target.storage.peiyu={};
				}
				for(var i in target.storage.peiyu){
					if(target.storage.peiyu[i]==player){
						delete target.storage.peiyu[i];
					}
				}
				if(rand2.length){
					var randx=[];
					var rand2x=[];
					if(target.isUnderControl(true)){
						var dialog=ui.create.dialog();
						for(var i=0;i<rand.length;i++){
							randx[i]=['','',rand[i]];
						}
						for(var i=0;i<rand2.length;i++){
							rand2x[i]=['','',rand2[i]];
						}
						dialog.add('选择一个图腾');
						dialog.add([randx,'vcard']);
						dialog.add('替换一个已有图腾');
						dialog.add([rand2x,'vcard']);
						target.chooseButton(dialog,2,true).filterButton=function(button){
							if(ui.selected.buttons.length){
								var current=ui.selected.buttons[0].name;
								if(rand.contains(current)){
									return rand2.contains(button.name);
								}
								else{
									return rand.contains(button.name);
								}
							}
							return true;
						};
						for(var i=0;i<dialog.buttons.length;i++){
							var item=dialog.buttons[i]
							if(i==4){
								item.parentNode.insertBefore(document.createElement('br'),item);
							}
							item.style.zoom=0.7;
						}
					}
					else{
						var gain;
						if(target.hp<target.maxHp){
							if(rand.contains('tuteng1')){
								gain='tuteng1';
							}
							else if(rand.contains('tuteng3')){
								gain='tuteng3';
							}
							else{
								gain=rand.randomGet();
							}
							target.removeSkill(rand2.randomGet())
						}
						else{
							if(rand2.contains('tuteng1')){
								gain=rand.randomGet();
								target.removeSkill('tuteng1');
							}
							else{
								if(rand.length>1){
									rand.remove('tuteng1');
								}
								gain=rand.randomGet();
								target.removeSkill(rand2.randomGet())
							}
						}
						target.addSkill(gain);
						target.storage.peiyu[gain]=player;
						game.delay();
						event.finish();
					}
				}
				else{
					var gain=rand.randomGet();
					target.addSkill(gain);
					target.storage.peiyu[gain]=player;
					game.delay();
					event.finish();
				}
				'step 1'
				var skill1=result.buttons[0].name;
				var skill2=result.buttons[1].name;
				if(target.hasSkill(skill1)){
					target.removeSkill(skill1);
					target.addSkill(skill2);
					target.storage.peiyu[skill2]=player;
				}
				else{
					target.removeSkill(skill2);
					target.addSkill(skill1);
					target.storage.peiyu[skill1]=player;
				}
			},
			ai:{
				expose:0.2,
				order:5,
				result:{
					target:function(player,target){
						for(var i=1;i<=8;i++){
							if(target.hasSkill('tuteng'+i)) return 0;
						}
						return 1;
					}
				}
			},
			group:'peiyu2'
		},
		peiyu2:{
			trigger:{player:'dieBegin'},
			forced:true,
			popup:false,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					for(var j in game.players[i].storage.peiyu){
						if(game.players[i].storage.peiyu[j]==player){
							game.players[i].removeSkill(j);
						}
					}
				}
			}
		},
		wzhanyi:{
			trigger:{player:'phaseUseBefore'},
			check:function(event,player){
				return player.num('h')+2<=player.hp;
			},
			content:function(){
				'step 0'
				event.cards=get.cards(3);
				trigger.untrigger();
				trigger.finish();
				player.$draw(event.cards.slice(0));
				for(var i=0;i<event.cards.length;i++){
					if(get.type(event.cards[i])=='equip'){
						player.equip(event.cards[i]);
						event.cards.splice(i--,1);
					}
				}
				player.gain(event.cards);
				'step 1'
				if(player.num('h','sha')){
					player.chooseToUse('战意：使用一张杀').filterCard=function(card){
						return card.name=='sha'&&get.itemtype(card)=='card';
					}
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.bool){
					event.goto(1);
				}
			}
		},
		shengteng:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.card&&get.type(event.card)=='trick';
			},
			content:function(){
				player.gainMaxHp(true);
				player.recover();
			},
		},
		yuansu:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.maxHp-player.hp>=3;
			},
			filterTarget:function(card,player,target){
				return player.canUse('yuansuhuimie',target);
			},
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			line:'thunder',
			content:function(){
				player.maxHp=player.hp;
				player.update();
				targets.sort(lib.sort.seat);
                player.useCard({name:'yuansuhuimie'},targets).animate=false;
			}
		},
		chouhuo:{
			unique:true,
			trigger:{player:'phaseBegin'},
			forced:true,
			skillAnimation:true,
			animationColor:'fire',
			filter:function(event,player){
				if(player.storage.nuyan&&player.storage.nuyan.length){
					var num=0;
					for(var i=0;i<lib.inpile.length;i++){
						if(get.tag({name:lib.inpile[i]},'damage')){
							num++;
						}
					}
					return num<=player.storage.nuyan.length;
				}
				return false;
			},
			content:function(){
				player.loseMaxHp();
				player.changeHujia(2);
				player.removeSkill('nuyan');
				player.addSkill('nuyan2');
			}
		},
		nuyan2:{
			enable:'phaseUse',
			usable:3,
			chooseButton:{
				dialog:function(event,player){
					var list=[];
					for(var i=0;i<lib.inpile.length;i++){
						if(get.tag({name:lib.inpile[i]},'damage')){
							list.push([get.type(lib.inpile[i]),'',lib.inpile[i]]);
						}
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
					if(button.link[2]=='nanman'||button.link[2]=='nanman'||button.link[2]=='yuansuhuimie'||
					button.link[2]=='chiyuxi'||button.link[2]=='jingleishan'){
						if(lose>recover&&lose>0){
							return 2;
						}
						else{
							return 0;
						}
					}
					return 1;
				},
				backup:function(links,player){
					return {
						filterCard:function(){return false},
						selectCard:-1,
						popname:true,
						viewAs:{name:links[0][2]},
						onuse:function(result,player){
							player.loseHp();
						}
					}
				},
				prompt:function(links,player){
					return '失去一点体力，视为使用一张'+get.translation(links[0][2]);
				}
			},
			ai:{
				order:6,
				result:{
					player:function(player){
						if(player.hp>1) return 1;
						return 0;
					}
				},
			}
		},
		nuyan:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.num('he',{color:'red'})>0
			},
			init:function(player){
				player.storage.nuyan=[];
			},
			chooseButton:{
				dialog:function(event,player){
					var list=[];
					for(var i=0;i<lib.inpile.length;i++){
						if(get.tag({name:lib.inpile[i]},'damage')){
							list.push([get.type(lib.inpile[i]),'',lib.inpile[i]]);
						}
					}
					return ui.create.dialog([list,'vcard']);
				},
				filter:function(button,player){
					if(player.storage.nuyan.contains(button.link[2])) return false;
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
					if(button.link[2]=='nanman'||button.link[2]=='nanman'||button.link[2]=='yuansuhuimie'||
					button.link[2]=='chiyuxi'||button.link[2]=='jingleishan'){
						if(lose>recover&&lose>0){
							return 2;
						}
						else{
							return 0;
						}
					}
					return 1;
				},
				backup:function(links,player){
					return {
						filterCard:{color:'red'},
						selectCard:1,
						position:'he',
						popname:true,
						viewAs:{name:links[0][2]},
						ai1:function(card){
							return 6-ai.get.value(card);
						},
						onuse:function(result,player){
							player.storage.nuyan.add(result.card.name);
						}
					}
				},
				prompt:function(links,player){
					return '将一张红色牌当作'+get.translation(links[0][2])+'使用';
				}
			},
			ai:{
				order:6,
				result:{
					player:1
				},
			}
		},
		duxin:{
			trigger:{player:['phaseBegin','phaseEnd']},
			frequent:true,
			content:function(){
				var list=['hsdusu_xueji','hsdusu_huangxuecao','hsdusu_kuyecao','hsdusu_shinancao','hsdusu_huoyanhua'];
				if(typeof lib.cardType.hslingjian!='number'){
					list.remove('hsdusu_kuyecao');
				}
				var name=list.randomGet();
				if(name=='hsdusu_huoyanhua'){
					player.gain(game.createCard({name:name,nature:'fire'}),'draw');
				}
				else{
					player.gain(game.createCard(name),'draw');
				}
			},
			ai:{
				threaten:1.6
			}
		},
		hsdusu_shinancao:{
			mark:true,
			marktext:'楠',
			nopop:true,
			intro:{
				content:'下一次造成的伤害+1'
			},
			logv:false,
			trigger:{source:'damageBegin'},
			forced:true,
			content:function(){
				trigger.num++;
				player.removeSkill('hsdusu_shinancao');
			}
		},
		kuangluan:{
			trigger:{player:'damageEnd'},
			forced:true,
			priority:10,
			filter:function(event,player){
				return event.source&&event.source.isAlive()&&event.source!=player;
			},
			intro:{
				content:'players'
			},
			content:function(){
				trigger.source.goMad('phaseAfter');
				if(!player.storage.kuangluan){
					player.storage.kuangluan=[];
				}
				player.storage.kuangluan.add(trigger.source);
				player.markSkill('kuangluan');
			},
			ai:{
				threaten:0.3
			},
			group:['kuangluan2','kuangluan3']
		},
		kuangluan2:{
			trigger:{player:'phaseBegin'},
			priority:10,
			forced:true,
			filter:function(event,player){
				return player.storage.kuangluan&&player.storage.kuangluan.length>=2;
			},
			content:function(){
				player.recover(player.maxHp);
				player.goMad('phaseAfter');
			}
		},
		kuangluan3:{
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.storage.kuangluan=[];
				player.unmarkSkill('kuangluan');
			}
		},
		xiubu:{
			trigger:{player:'equipEnd'},
			frequent:true,
			filter:function(event){
				return lib.inpile.contains(event.card.name)&&get.subtype(event.card)=='equip1'&&typeof lib.cardType.hslingjian=='number';
			},
			content:function(){
				var num=1;
				var info=get.info(trigger.card);
				if(info&&info.distance&&typeof info.distance.attackFrom=='number'){
					num=1-info.distance.attackFrom;
				}
				if(num<1){
					num=1;
				}
				var list=['hslingjian_zhongxinghujia','hslingjian_xuanfengzhiren','hslingjian_yinmilichang',
				'hslingjian_shengxiuhaojiao','hslingjian_jinjilengdong','hslingjian_xingtigaizao','hslingjian_shijianhuisu'];
				var cards=[];
				while(num--){
					cards.push(game.createCard(list.randomGet()));
				}
				player.gain(cards,'gain2');
			},
			threaten:1.3
		},
		zengli:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player&&!target.isMin();
			},
			delay:false,
			content:function(){
				'step 0'
				var list=[];
				for(var i=0;i<lib.inpile.length;i++){
					if(lib.card[lib.inpile[i]].subtype=='equip1'){
						list.push(lib.inpile[i]);
					}
				}
				if(!list.length){
					event.finish();
					return;
				}
				event.card1=game.createCard(list.randomGet());
				event.card2=game.createCard(list.randomGet());
				player.$draw(event.card1);
				target.$draw(event.card2);
				game.delay();
				'step 1'
				player.equip(event.card1);
				'step 2'
				target.equip(event.card2);
			},
			ai:{
				order:11,
				result:{
					player:1,
					target:function(player,target){
						if(target.get('e','1')) return 0;
						return 1;
					}
				}
			}
		},
		mobao:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				if(!player.storage.mobao) return false;
				if(!player.num('h',{color:'black'})) return false;
				for(var i=0;i<player.storage.mobao.length;i++){
					if(player.storage.mobao[i].isAlive()) return true;
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return player.storage.mobao.contains(target);
			},
			position:'he',
			selectTarget:-1,
			selectCard:[1,3],
			check:function(card){
				return 8-ai.get.value(card);
			},
			filterCard:{color:'black'},
			line:'thunder',
			content:function(){
				target.damage('thunder',cards.length);
			},
			ai:{
				order:9,
				threaten:0.7,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target,'thunder');
					}
				}
			},
			group:['mobao2','mobao3']
		},
		mobao2:{
			trigger:{player:'damageEnd'},
			forced:true,
			silent:true,
			popup:false,
			filter:function(event,player){
				return event.source&&event.source!=player;
			},
			content:function(){
				if(!player.storage.mobao){
					player.storage.mobao=[];
				}
				player.storage.mobao.add(trigger.source);
			}
		},
		mobao3:{
			trigger:{player:'phaseEnd'},
			forced:true,
			silent:true,
			popup:false,
			content:function(){
				delete player.storage.mobao;
			}
		},
		xianji:{
			unique:true,
			forceunique:true,
			global:'xianji2'
		},
		xianji2:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				if(player.hasSkill('xianji')) return false;
				if(player.hasSkill('xianji3')) return true;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hasSkill('xianji')) return true;
				}
				return false;
			},
			content:function(){
				'step 0'
				player.removeSkill('xianji3');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].hasSkill('xianji')){
						event.target=game.players[i];break;
					}
				}
				if(event.target){
					player.chooseToDiscard([1,2],'献祭：是否弃置1〜2张手牌并令'+get.translation(event.target)+'摸等量的牌？').set('ai',function(card){
						if(ai.get.attitude(_status.event.player,_status.event.getParent().target)>1){
							return 6-ai.get.value(card);
						}
						return 0;
					}).set('logSkill',['xianji',event.target]);
				}
				else{
					event.finish();
				}
				'step 1'
				if(result.bool){
					event.target.draw(result.cards.length);
					player.storage.xianji3=event.target;
					player.addSkill('xianji3');
				}
			}
		},
		xianji3:{
			mark:'character',
			intro:{
				content:function(storage,player){
					return '每当'+get.translation(storage)+'对你使用一张牌，你摸一张牌';
				}
			},
			trigger:{target:'useCardToBegin'},
			filter:function(event,player){
				return event.player==player.storage.xianji3;
			},
			forced:true,
			content:function(){
				player.draw();
			},
		},
		tanmi:{
			trigger:{global:'phaseEnd'},
			filter:function(event,player){
				return player.num('h')==0&&event.player!=player;
			},
			frequent:true,
			content:function(){
				'step 0'
				player.draw(2);
				'step 1'
				player.chooseToUse();
				'step 2'
				if(result.bool){
					event.goto(1);
				}
			}
		},
		xueren:{
			trigger:{source:'damageEnd'},
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.player.isAlive();
			},
			check:function(event,player){
				if(ai.get.attitude(player,event.player)>=0) return false;
				if(player.hp>2) return true;
				if(player.hp<2) return false;
				return player.hp>=event.player.hp;
			},
			content:function(){
				'step 0'
				trigger.player.loseHp();
				'step 1'
				player.loseHp();
				'step 2'
				player.draw(2);
			}
		},
		maoxian:{
			enable:'phaseUse',
			usable:2,
			direct:true,
			delay:false,
			unique:true,
			onremove:function(player){
				player.removeAdditionalSkill('maoxian');
			},
			content:function(){
				'step 0'
				var list=get.gainableSkills();
				list.remove('maoxian');
				player.chooseControl(list.randomGets(3)).prompt='选择一项作为你的技能';
				'step 1'
				if(result.control){
					game.stopCountChoose();
					var link=result.control;
					player.addAdditionalSkill('maoxian',link);
					player.popup(link);
					game.log(player,'获得了技能','【'+get.translation(link)+'】');
					player.checkMarks();
					player.markSkill('maoxian');
					game.delay();
				}
			},
			intro:{
				content:function(storage,player){
					return '当前技能：'+get.translation(player.additionalSkills.maoxian);
				}
			},
			ai:{
				order:11,
				result:{
					player:function(player){
						if(player.getStat().skill.maoxian) return 0;
						return 1;
					}
				}
			}
		},
		maoxian_old:{
			enable:'phaseUse',
			usable:2,
			direct:true,
			delay:false,
			unique:true,
			getSkills:function(player,current){
				var names=[];
				var list=[];
				var map={};
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]==player) continue;
					if(game.players[i].name&&lib.character[game.players[i].name]){
						names.add(game.players[i].name);
					}
					if(game.players[i].name1&&lib.character[game.players[i].name1]){
						names.add(game.players[i].name1);
					}
					if(game.players[i].name2&&lib.character[game.players[i].name2]){
						names.add(game.players[i].name2);
					}
				}
				for(var i=0;i<names.length;i++){
					var info=lib.character[names[i]];
					if(info){
						var skills=info[3];
						for(var j=0;j<skills.length;j++){
							if(skills[j]==current) continue;
							if(lib.translate[skills[j]+'_info']&&lib.skill[skills[j]]&&
								!lib.skill[skills[j]].unique){
								list.add(skills[j]);
								map[skills[j]]=names[i];
							}
						}
					}
				}
				return [list,map];
			},
			onremove:function(player){
				delete player.additionalSkills.maoxian;
			},
			content:function(){
				'step 0'
				var lm=lib.skill.maoxian.getSkills(player,player.additionalSkills.maoxian);
				var list=lm[0];
				event.map=lm[1];
				if(list.length){
					player.chooseControl(list.randomGets(3)).prompt='选择一项作为你的技能';
				}
				else{
					event.finish();
				}
				'step 1'
				if(result.control){
					game.stopCountChoose();
					var link=result.control;
					player.addSkill(link);
					player.skills.remove(link);
					if(player.additionalSkills.maoxian){
						player.removeSkill(player.additionalSkills.maoxian);
					}
					player.additionalSkills.maoxian=link;
					player.popup(link);
					game.log(player,'获得了技能','【'+get.translation(link)+'】')
					var name=event.map[link];
					var target;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==player) continue;
						if(game.players[i].name==name||
						game.players[i].name1==name||
						game.players[i].name2==name){
							target=game.players[i];break;
						}
					}
					if(target&&(target.name==name||(target.name2==name&&!target.classList.contains('unseen2')))){
						player.line(target,'green');
						player.markSkillCharacter('maoxian',target,get.translation(link),lib.translate[link+'_info']);
					}
					player.checkMarks();
					game.delay();
				}
			},
			ai:{
				order:11,
				result:{
					player:function(player){
						if(player.getStat().skill.maoxian) return 0;
						return 1;
					}
				}
			}
		},
		yiwen:{
			trigger:{target:'useCardToBegin'},
			filter:function(event,player){
				return event.targets&&event.targets.length==1&&
				event.target!=event.player&&_status.currentPhase==event.player&&
				!event.player.hasSkill('yiwen2');
			},
			forced:true,
			content:function(){
				player.gain(game.createCard(trigger.card),'gain2');
				trigger.player.addTempSkill('yiwen2','phaseAfter');
			},
			ai:{
				threaten:0.7
			}
		},
		yiwen2:{},
		tanbao:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				if(player.hp==player.maxHp) return false;
				var hs=player.get('h');
				if(hs.length==0) return false;
				var types=[];
				for(var i=0;i<hs.length;i++){
					var type=get.type(hs[i],'trick');
					if(types.contains(type)){
						return false;
					}
					else{
						types.push(type);
					}
				}
				return true;
			},
			content:function(){
				'step 0'
				player.showHandcards();
				'step 1'
				player.recover(player.num('h'));
			},
			ai:{
				order:10,
				result:{
					player:1
				}
			}
		},
		tanbao_old:{
			enable:'phaseUse',
			usable:10,
			filterCard:true,
			position:'he',
			check:function(card){
				if(_status.event.player.hp==1){
					return 7-ai.get.value(card);
				}
				return 6-ai.get.value(card);
			},
			selectCard:3,
			filter:function(event,player){
				return player.num('he')>=3;
			},
			content:function(){
				'step 0'
				event.cards=get.cards(3);
				if(!event.isMine()) player.showCards(event.cards);
				'step 1'
				player.chooseCardButton('获得任意张类别不同的牌',[1,3],event.cards).filterButton=function(button){
					var type=get.type(button.link,'trick');
					for(var i=0;i<ui.selected.buttons.length;i++){
						if(get.type(ui.selected.buttons[i].link,'trick')==type){
							return false;
						}
					}
					return true;
				}
				'step 2'
				if(result.bool) player.gain(result.links,'gain2');
				var types=[];
				for(var i=0;i<event.cards.length;i++){
					types.add(get.type(event.cards[i],'trick'));
				}
				if(types.length==3){
					player.recover(player.maxHp-player.hp);
				}
			},
			ai:{
				order:5,
				result:{
					player:1
				}
			}
		},
		qianghuax:{
			enable:'phaseUse',
			usable:1,
			filterCard:function(card){
				var type=get.type(card,'trick');
				for(var i=0;i<ui.selected.cards.length;i++){
					if(type==get.type(ui.selected.cards[i],'trick')) return false;
				}
				return true;
			},
			position:'he',
			check:function(card){
				return 8-ai.get.value(card);
			},
			selectCard:[1,Infinity],
			content:function(){
				var cards2=[];
				for(var i=0;i<cards.length;i++){
					var type=get.type(cards[i],'trick');
					var list=game.findCards(function(name){
						if(cards[i].name==name) return;
						if(get.type({name:name},'trick')==type){
							return ai.get.value({name:name})>ai.get.value(cards[i]);
						}
					});
					if(!list.length){
						list=game.findCards(function(name){
							if(cards[i].name==name) return;
							if(get.type({name:name},'trick')==type){
								return ai.get.value({name:name})==ai.get.value(cards[i]);
							}
						});
					}
					if(!list.length){
						list=[cards[i].name];
					}
					cards2.push(game.createCard(list.randomGet()));
				}
				player.gain(cards2);
				player.$draw(cards2);
				game.log(player,'获得了',cards2);
			},
			ai:{
				order:8,
				result:{
					player:1
				}
			}
		},
		zhuizong:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			position:'he',
			selectCard:[1,Infinity],
			check:function(card){
				if(ui.selected.cards.length) return 0;
				return 6-ai.get.value(card)
			},
			content:function(){
				'step 0'
				event.cards=get.cards(4*cards.length);
				player.chooseCardButton('获得其中的一张牌',true,event.cards,true);
				'step 1'
				player.gain(result.links,'draw');
				event.cards.remove(result.links[0]);
				for(var i=0;i<event.cards.length;i++){
					ui.discardPile.appendChild(event.cards[i]);
				}
			},
			ai:{
				order:8,
				result:{
					player:1
				},
			}
		},
		xunbao:{
			trigger:{player:'phaseBegin'},
			frequent:true,
			filter:function(event,player){
				return !player.hasSkill('xunbao2');
			},
			priority:1,
			// filterCard:true,
			// check:function(card){
			// 	return 6-ai.get.value(card);
			// },
			// position:'he',
			content:function(){
				'step 0'
				event.card=game.createCard('hsbaowu_cangbaotu');
				player.storage.xunbao2=event.card;
				player.storage.xunbao2_markcount=player.storage.xunbao2.number;
				// player.$draw(player.storage.xunbao2);
				player.addSkill('xunbao2');
				game.delay(2);

				event.node=event.card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
				ui.arena.classList.add('thrownhighlight');
				game.addVideo('thrownhighlight1');
				game.addVideo('centernode',null,get.cardInfo(event.card));
				'step 1'
				game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
				event.node.delete();
				event.node.style.transform='scale(0)';
				game.addVideo('thrownhighlight2');
				ui.arena.classList.remove('thrownhighlight');
			},
			ai:{
				order:3,
				result:{
					player:1
				}
			}
		},
		xunbao2:{
			mark:true,
			marktext:'宝',
			intro:{
				content:'card',
			},
			direct:true,
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				var hs=player.get('he');
				for(var i=0;i<hs.length;i++){
					if(hs[i].number==player.storage.xunbao2.number) return true;
				}
				return false;
			},
			content:function(){
				'step 0'
				player.chooseToDiscard('是否弃置一张点数为'+player.storage.xunbao2.number+'的牌获得藏宝图？','he',function(card){
					return card.number==player.storage.xunbao2.number;
				}).ai=function(card){
					return 7-ai.get.value(card);
				};
				'step 1'
				if(result.bool){
					player.gain(player.storage.xunbao2,'gain2');
					game.log(player,'获得了',player.storage.xunbao2);
					delete player.storage.xunbao2;
					player.removeSkill('xunbao2');
				}
			}
		},
		hsbaowu_cangbaotu:{
			trigger:{player:'phaseEnd'},
			forced:true,
			popup:false,
			content:function(){
				player.gain(game.createCard('hsbaowu_huangjinyuanhou'),'gain2');
				player.removeSkill('hsbaowu_cangbaotu');
			}
		},
		hsbaowu_huangjinyuanhou:{
			mark:'card',
			nopup:true,
			intro:{
				content:'锁定技，你不能成为其他角色的卡牌的目标'
			},
			mod:{
				targetEnabled:function(card,player,target){
					if(player!=target) return false;
				}
			},
			group:'hsbaowu_huangjinyuanhou2'
		},
		hsbaowu_huangjinyuanhou2:{
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			silent:true,
			content:function(){
				player.removeSkill('hsbaowu_huangjinyuanhou');
				delete player.storage.hsbaowu_huangjinyuanhou;
			}
		},
		xieneng:{
			trigger:{player:'phaseEnd'},
			direct:true,
			content:function(){
				'step 0'
				var list=[['','','hsshenqi_morijingxiang'],
					['','','hsshenqi_kongbusangzhong'],
					['','','hsshenqi_nengliangzhiguang']];
				var dialog=ui.create.dialog('邪能：选择一张神器牌并获得之',[list,'vcard'],'hidden');
				player.chooseButton(dialog).ai=function(){return Math.random();};
				'step 1'
				if(result.buttons){
					player.logSkill('xieneng');
					player.gain(game.createCard(result.buttons[0].link[2]),'draw');
				}
			},
			ai:{
				threaten:1.3,
				effect:{
					target:function(card,player,target){
						if(card.name=='guiyoujie') return [0,1];
					}
				}
			}
		},
		fbeifa:{
			trigger:{player:'loseEnd'},
			filter:function(event,player){
				if(player.num('h')) return false;
				if(player.storage.fbeifa>=3) return false;
				for(var i=0;i<event.cards.length;i++){
					if(event.cards[i].original=='h') return true;
				}
				return false;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【北伐】？',function(card,player,target){
					return lib.filter.targetEnabled({name:'sha'},player,target);
				}).ai=function(target){
					return ai.get.effect(target,{name:'sha'},player);
				}
				"step 1"
				if(result.bool){
					player.logSkill('fbeifa');
					player.useCard({name:'sha'},result.targets,false);
					player.storage.fbeifa++;
				}
			},
			ai:{
				expose:0.2,
			},
			group:['fbeifa2','fbeifa3'],
		},
		fbeifa2:{
			trigger:{source:'damageAfter'},
			forced:true,
			popup:false,
			filter:function(event){
				return event.parent.parent.parent.name=='fbeifa';
			},
			content:function(){
				player.draw();
			}
		},
		fbeifa3:{
			trigger:{global:'phaseBegin'},
			forced:true,
			silent:true,
			popup:false,
			content:function(){
				player.storage.fbeifa=0;
			}
		},
		yufa:{
			trigger:{global:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return player.storage.yufa==event.player;
			},
			content:function(){
				'step 0'
				player.chooseTarget('是否发动【驭法】？',function(card,player,target){
					return target!=trigger.player;
				}).ai=function(target){
					return ai.get.attitude(player,target);
				};
				'step 1'
				if(result.bool){
					player.logSkill('yufa',result.targets);
					result.targets[0].gain(game.createCard('chuansongmen'),'gain2');
				}
			},
			group:['yufa2','yufa3'],
			ai:{
				expose:0.1
			}
		},
		yufa2:{
			trigger:{player:'damageEnd'},
			filter:function(event,player){
				return event.source==_status.currentPhase&&event.source!=player;
			},
			popup:false,
			forced:true,
			silent:true,
			content:function(){
				player.storage.yufa=trigger.source;
			}
		},
		yufa3:{
			trigger:{global:'phaseBegin'},
			popup:false,
			forced:true,
			silent:true,
			content:function(){
				player.storage.yufa=null;
			}
		},
		bingyan:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				if(!lib.card.chiyuxi||!lib.card.jingleishan) return false;
				return player.num('he')>0;
			},
			filterTarget:function(card,player,target){
				if(get.color(card)=='red'){
					return player.canUse('chiyuxi',target);
				}
				else{
					return player.canUse('jingleishan',target);
				}
			},
			selectTarget:-1,
			discard:false,
			delay:false,
			line:false,
			filterCard:true,
			position:'he',
			log:'notarget',
			check:function(card){
				return 6-ai.get.value(card);
			},
			multitarget:true,
			content:function(){
				if(get.color(cards[0])=='black'){
					player.useCard({name:'jingleishan'},cards,targets);
				}
				else{
					player.useCard({name:'chiyuxi'},cards,targets);
				}
			},
			ai:{
				order:9.1,
				result:{
					target:function(player,target){
						var card=ui.selected.cards[0];
						if(card&&get.color(card)=='black'){
							return ai.get.effect(target,{name:'jingleishan'},player,target);
						}
						return ai.get.effect(target,{name:'chiyuxi'},player,target);
					}
				}
			}
		},
		shifa:{
			trigger:{player:'phaseUseBegin'},
			forced:true,
			content:function(){
				'step 0'
				var players=get.players();
				var list=[];
				for(var i in lib.card){
					if(!lib.translate[i+'_info']) continue;
					if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
					if(lib.card[i].type=='trick') list.push(i);
				}
				for(var i=0;i<game.players.length;i++){
					game.players[i].gain(game.createCard(list.randomGet()));
					game.players[i].$draw();
				}
			}
		},
		yuanzheng:{
			trigger:{player:'useCardToBegin'},
			direct:true,
			filter:function(event,player){
				if(event.getParent(2).name=='yuanzheng') return false;
				return event.target&&event.target!=player&&get.distance(player,event.target,'attack')>1;
			},
			content:function(){
				'step 0'
				player.chooseControl('draw_card','出杀','cancel',function(){
					if(ai.get.effect(trigger.target,{name:'sha'},player,player)>0){
						return '出杀';
					}
					return 'draw_card';
				}).prompt='是对'+get.translation(trigger.target)+'发动否发动【远征】？';
				'step 1'
				if(result.control!='cancel'){
					if(result.control=='draw_card'){
						player.draw();
						player.logSkill('yuanzheng');
					}
					else{
						player.logSkill('yuanzheng',trigger.target);
						player.useCard({name:'sha'},trigger.target,false).animate=false;
						// player.discardPlayerCard(trigger.target,'he',true);
					}
				}
			}
		},
		byuhuo:{
			unique:true,
			trigger:{player:'dying'},
			priority:6,
			forced:true,
			mark:true,
			skillAnimation:true,
			animationColor:'fire',
			init:function(player){
				player.storage.byuhuo=false;
			},
			filter:function(event,player){
				if(player.hp>0) return false;
				if(player.storage.byuhuo) return false;
				return true;
			},
			content:function(){
				player.storage.byuhuo=true;
				player.addSkill('byuhuo2');
				player.maxHp=2;
				player.hp=2;
				player.update();
				if(!player.isTurnedOver()){
					player.turnOver();
				}
			},
			ai:{
				threaten:function(player,target){
					if(!target.storage.byuhuo) return 0.6;
				}
			},
			intro:{
				content:function(storage,player){
					if(storage){
						if(player.hasSkill('byuhuo2')){
							return '不能成为其他角色卡牌的目标；在下一回合开始时，对所有其他角色造成两点火焰伤害';
						}
						return '已发动';
					}
					else{
						return '未发动';
					}
				}
			}
		},
		byuhuo2:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				'step 0'
				var targets=game.players.slice(0);
				targets.remove(player);
				targets.sort(lib.sort.seat);
				event.targets=targets;
				event.num=0;
				player.unmarkSkill('byuhuo');
				'step 1'
				if(num<event.targets.length){
					// if(event.targets[num].num('hej')){
					// 	player.gainPlayerCard(event.targets[num],'hej',true);
					// }
					player.line(event.targets[num],'fire');
					event.targets[num].damage(2,'fire');
					event.num++;
					event.redo();
				}
			},
			mod:{
                targetEnabled:function(card,player,target){
                    if(player!=target) return false;
                }
            }
		},
		yulu:{
			enable:'phaseUse',
			usable:1,
			filterTarget:true,
			selectTarget:[1,3],
			content:function(){
				'step 0'
				if(target==targets[0]){
					game.asyncDraw(targets,2);
				}
				'step 1'
				if(target==targets[0]){
					game.delay();
				}
				'step 2'
				target.chooseToDiscard(2,true);
			},
			ai:{
				order:10,
				result:{
					target:function(player,target){
						switch(target.num('he')==0){
							case 0:return 0;
							case 1:return 0.5;
							case 2:return 0.8;
							default:return 1;
						}
					}
				},
				threaten:1.2
			}
		},
		fengyin:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				var stat=player.getStat('card');
				for(var i in stat){
					if(typeof stat[i]=='number'&&get.type(i,'trick')=='trick'){
						return false;
					}
				}
				return true;
			},
			content:function(){
				'step 0'
				player.chooseTarget('是否发动【封印】？',function(card,player,target){
					return target!=player;
				}).ai=function(target){
					return -ai.get.attitude(player,target)*Math.sqrt(target.num('h'));
				}
				'step 1'
				if(result.bool){
					player.logSkill('fengyin',result.targets);
					result.targets[0].addTempSkill('fengyin2',{player:'phaseAfter'});
				}
			}
		},
		fengyin2:{
			mod:{
				cardEnabled:function(card){
					if(get.type(card,'trick')=='trick') return false;
				}
			},
			mark:true,
			marktext:'封',
			intro:{
				content:'下个回合无法使用锦囊牌'
			}
		},
		hannu:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return player.num('h')>0;
			},
			content:function(){
				'step 0'
				var nh=player.num('h');
				if(nh){
					player.draw(nh);
				}
				else{
					event.finish();
				}
				'step 1'
				var hs=player.get('h');
				if(hs.length>10&&hs.length>player.hp){
					player.discard(hs.randomGets(hs.length-player.hp));
				}
			},
			ai:{
				maixie:true,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.hasSkill('jueqing')) return [1,-2];
							if(!target.hasFriend()) return;
							var nh=target.num('h');
							if(nh>5) return [1,-1];
							if(nh<=1) return [1,-0.1];
							if(nh==2){
								if(target.hp>=2) return [1,0.1];
							}
							else{
								if(target.hp>=4) return [1,2];
								if(target.hp==3) return [1,1.5];
								if(target.hp==2) return [1,0.5];
							}
						}
					}
				}
			}
		},
		chuidiao:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				var num=Math.floor(Math.random()*3);
				if(num) player.draw(num);
			},
		},
		hhudun:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return player.hujia<3;
			},
			content:function(){
				player.changeHujia();
				player.update();
			},
		},
		fenlie:{
			audio:2,
			forced:true,
			trigger:{player:'gainAfter'},
			filter:function(event,player){
				if(event.parent.parent.name=='phaseDraw') return false;
				if(event.parent.name=='fenlie') return false;
				if(!event.cards) return false;
				return true;
			},
			usable:2,
			content:function(){
				var cards=[];
				for(var i=0;i<trigger.cards.length;i++){
					cards.push(game.createCard(trigger.cards[i]));
				}
				player.gain(cards,'draw');
			},
			ai:{
				effect:{
					target:function(card){
						if(card.name=='toulianghuanzhu'){
							return [1,2];
						}
					}
				}
			}
		},
		nianfu:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player!=target&&target.num('e')>0;
			},
			filter:function(event,player){
				return game.hasPlayer(function(target){
					return target!=player&&target.num('e');
				});
			},
			content:function(){
				var es=target.get('e');
				if(es.length>1){
					es=es.randomGets(Math.ceil(Math.random()*2));
				}
				target.discard(es);
			},
			ai:{
				order:9.5,
				result:{
					target:function(player,target){
						var ne=target.num('e');
						if(ne>1) return -1.5;
						return -1;
					}
				}
			}
		},
		shixu:{
			group:['shixu_begin','shixu_end','shixu_discard'],
			subSkill:{
				begin:{
					trigger:{global:'phaseUseBegin'},
					forced:true,
					popup:false,
					silent:true,
					content:function(){
						trigger.player.storage.shixu_begin=get.time();
					}
				},
				end:{
					trigger:{global:'phaseUseEnd'},
					forced:true,
					popup:false,
					silent:true,
					filter:function(event,player){
						return typeof event.player.storage.shixu_begin=='number';
					},
					content:function(){
						trigger.player.storage.shixu=get.time()-trigger.player.storage.shixu_begin;
						delete trigger.player.storage.shixu_begin;
					}
				},
				discard:{
					trigger:{global:'phaseEnd'},
					forced:true,
					check:function(event,player){
						return ai.get.attitude(player,event.player)<0;
					},
					filter:function(event,player){
						return typeof event.player.storage.shixu=='number'&&
							event.player.storage.shixu>3000&&event.player.num('he')>0&&event.player.isAlive();
					},
					content:function(){
						player.line(trigger.player,'green');
						trigger.player.chooseToDiscard('he',true,Math.floor(trigger.player.storage.shixu/3000));
						delete trigger.player.storage.shixu;
					}
				}
			}
		},
		jixuan:{
			trigger:{player:'phaseAfter'},
			forced:true,
			filter:function(event,player){
				return event.parent.name!='jixuan';
			},
			content:function(){
				player.phase();
			},
			ai:{
				threaten:1.8
			},
		},
		qianghua:{
			trigger:{player:'useCardAfter'},
			filter:function(event,player){
				if(event.parent.name=='qianghua') return false;
				if(player.storage.qianghua>=1) return false;
				if(_status.currentPhase!=player) return false;
				if(event.parent.parent.name!='phaseUse') return false;
				if(!event.targets||!event.card) return false;
				var type=get.type(event.card);
				if(type!='basic'&&type!='trick') return false;
				var card=game.createCard(event.card.name,event.card.suit,event.card.number,event.card.nature);
				for(var i=0;i<event.targets.length;i++){
					if(!event.targets[i].isAlive()) return false;
					if(!player.canUse({name:event.card.name},event.targets[i],false,false)){
						return false;
					}
				}
				return true;
			},
			check:function(event,player){
				if(event.card.name=='tiesuo') return false;
				if(event.card.name=='jiu') return false;
				if(event.card.name=='tianxianjiu') return false;
				if(event.card.name=='toulianghuanzhu') return false;
				return true;
			},
			content:function(){
				player.storage.qianghua++;
				var card=game.createCard(trigger.card.name,trigger.card.suit,trigger.card.number,trigger.card.nature);
				player.useCard(card,trigger.targets);
			},
			ai:{
				threaten:1.3
			},
			group:'qianghua_clear',
			subSkill:{
				clear:{
					trigger:{player:'phaseBefore'},
					forced:true,
					silent:true,
					popup:false,
					content:function(){
						player.storage.qianghua=0;
					}
				}
			}
		},
		qianghua2:{},
		biri:{
			trigger:{global:'useCard'},
			priority:15,
			filter:function(event,player){
				return event.card.name=='sha'&&event.player!=player&&
					get.distance(player,event.targets[0])<=1&&
					player.num('h','shan')>0&&
					event.targets.contains(player)==false&&event.targets.length==1;
			},
			direct:true,
			content:function(){
				"step 0"
				var effect=0;
				for(var i=0;i<trigger.targets.length;i++){
					effect+=ai.get.effect(trigger.targets[i],trigger.card,trigger.player,player);
				}
				var str='蔽日：是否弃置一张闪令'+get.translation(trigger.player);
				if(trigger.targets&&trigger.targets.length){
					str+='对'+get.translation(trigger.targets);
				}
				str+='的'+get.translation(trigger.card)+'失效？';
				if(event.isMine()||effect<0){
					game.delay(0.5);
				}
				var next=player.chooseToDiscard('h',function(card){
					return card.name=='shan';
				},str);
				next.ai=function(card){
					if(effect<0){
						return 9-ai.get.value(card);
					}
					return -1;
				}
				next.logSkill=['biri',trigger.targets];
				"step 1"
				if(result.bool){
					trigger.untrigger();
					trigger.finish();
				}
			},
			ai:{
				expose:0.2
			}
		},
		stuxi:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				'step 0'
				event.targets=get.players();
				'step 1'
				if(event.targets.length){
					var target=event.targets.shift();
					if(!target.isTurnedOver()&&target.num('he')){
						target.chooseToDiscard(true);
					}
					event.redo();
				}
			}
		},
		bingdong:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return !player.isTurnedOver();
			},
			filterTarget:function(card,player,target){
				return !target.isTurnedOver()&&player!=target;
			},
			content:function(){
				'step 0'
				if(!player.isTurnedOver()){
					player.turnOver();
				}
				'step 1'
				if(!target.isTurnedOver()){
					target.turnOver();
				}
			},
			ai:{
				order:1,
				expose:0.2,
				result:{
					target:function(player,target){
						if(ai.get.attitude(player,target)<-3&&player.identity!='zhu'){
							return -1;
						}
						return 0;
					}
				}
			}
		},
		luoshi:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return player.num('he')>0||(event.source&&event.source.num('he')>0);
			},
			content:function(){
				'step 0'
				var hs=player.get('he');
				if(hs.length){
					player.discard(hs.randomGet())
				}
				'step 1'
				if(trigger.source){
					var hs=trigger.source.get('he');
					if(hs.length){
						trigger.source.discard(hs.randomGet())
					}
				}
			}
		},
		ronghuo:{
			trigger:{player:'useCardToBefore'},
			priority:7,
			filter:function(event,player){
				if(event.card.name=='sha'&&!event.card.nature) return true;
			},
			check:function(event,player){
				var att=ai.get.attitude(player,event.target);
				if(event.target.hasSkillTag('nofire')){
					return att>0;
				}
				return att<=0;
			},
			forced:true,
			content:function(){
				trigger.card.nature='fire';
				player.addSkill('ronghuo2');
				player.storage.ronghuo=trigger.card;
			}
		},
		ronghuo2:{
			trigger:{player:'useCardAfter'},
			forced:true,
			popup:false,
			content:function(){
				delete player.storage.ronghuo.nature;
			}
		},
		fushi:{
			enable:'phaseUse',
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp;
			},
			content:function(){
				'step 0'
				target.loseMaxHp(true);
				'step 1'
				if(target.hp<target.maxHp){
					target.recover();
				}
			},
			ai:{
				threaten:1.4,
				expose:0.2,
				order:9,
				result:{
					target:function(player,target){
						if(target.hp==target.maxHp) return 0;
						if(target.hp==target.maxHp-1) return -1;
						if(target.hp==1) return 1;
						if(target.hp<target.maxHp-2) return 0.5;
						return 0;
					}
				}
			}
		},
		mianyi:{
			mod:{
				targetEnabled:function(card,player,target,now){
					if(player!=target){
						if(get.type(card)=='trick') return false;
					}
				}
			}
		},
		jiaohui:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				return !player.getStat('damage');
			},
			content:function(){
				'step 0'
				player.chooseTarget('是否发动【教诲】？').ai=function(target){
					var att=ai.get.attitude(player,target);
					if(att>1&&target.hp<=1){
						att+=2;
					}
					return att;
				};
				'step 1'
				if(result.bool){
					event.target=result.targets[0];
					player.logSkill('jiaohui',event.target);
					if(event.target.hp<event.target.maxHp){
						event.target.chooseControl('draw_card','recover_hp',function(event,target){
							if(target.hp>=2||target.hp>=target.maxHp-1) return 'draw_card';
							if(target.hp==2&&target.num('h')==0) return 'draw_card';
							return 'recover_hp';
						});
					}
					else{
						event.target.draw(2);
						event.finish();
					}
				}
				else{
					event.finish();
				}
				'step 2'
				if(result.control=='draw_card'){
					event.target.draw(2);
				}
				else{
					event.target.recover();
				}
			},
		},
		chenshui:{
			trigger:{player:'phaseEnd'},
			frequent:true,
			content:function(){
				var list=['hsmengjing_feicuiyoulong','hsmengjing_huanxiaojiemei',
					'hsmengjing_suxing','hsmengjing_mengye','hsmengjing_mengjing'];
				player.gain(game.createCard(list.randomGet()));
				player.$draw();
			},
			ai:{
				threaten:2
			}
		},
		liehun:{
			trigger:{player:'phaseEnd'},
			forced:true,
			filter:function(event,player){
				return player.num('h',{type:'basic'})<player.num('h');
			},
			content:function(){
				var hs=player.get('h');
				for(var i=0;i<hs.length;i++){
					if(get.type(hs[i])=='basic'){
						hs.splice(i--,1);
					}
				}
				if(hs.length){
					var hs2=[];
					for(var i=0;i<hs.length;i++){
						hs2.push(game.createCard(hs[i].name,hs[i].suit,hs[i].number));
					}
					player.gain(hs2,'draw');
				}
			},
			ai:{
				threaten:1.5
			}
		},
		xjumo:{
			mod:{
				maxHandcard:function(player,num){
					if(player.hp<player.maxHp) return num+5;
					return num+3;
				},
			},
		},
		malymowang:{
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.card&&get.type(event.card)=='trick'&&event.parent.name!='_lianhuan'&&event.parent.name!='_lianhuan2';
			},
			content:function(){
				trigger.num++;
			},
			group:'malymowang2',
			ai:{
				threaten:1.8
			}
		},
		malymowang2:{
			trigger:{player:'phaseUseBegin'},
			forced:true,
			content:function(){
				'step 0'
				var list=[];
				for(var i in lib.card){
					if(!lib.translate[i+'_info']) continue;
					if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
					if(lib.card[i].type=='trick') list.push(['锦囊','',i]);
				}
				list=list.randomGets(3);
				var dialog=ui.create.dialog('选择一张锦囊牌加入你的手牌',[list,'vcard'],'hidden');
				player.chooseButton(dialog,true);
				'step 1'
				if(result.buttons){
					player.gain(game.createCard(result.buttons[0].link[2]),'gain2');
				}
			}
		},
		lingzhou:{
			trigger:{player:'useCard'},
			direct:true,
			filter:function(event){
				return get.type(event.card,'trick')=='trick';
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【灵咒】？').ai=function(target){
					var num=ai.get.attitude(player,target);
					if(num>0){
						if(target==player){
							num++;
						}
						if(target.hp==1){
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
					player.logSkill('lingzhou',result.targets);
					var target=result.targets[0];
					if(target.hp<target.maxHp){
						target.chooseControl('draw_card','recover_hp',function(event,target){
							if(target.hp>=3&&target.num('h')<target.hp) return 'draw_card';
							return 'recover_hp';
						});
						event.target=target;
					}
					else{
						target.draw();
						event.finish();
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.control=='draw_card'){
					event.target.draw();
				}
				else{
					event.target.recover();
				}
			},
			ai:{
				expose:0.2,
				threaten:1.5
			}
		},
		mieshi:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				'step 0'
				player.loseHp();
				'step 1'
				event.target=game.players.randomGet(player);
				player.line(event.target,'fire');
				game.delayx();
				'step 2'
				event.target.damage('fire');
			}
		},
		xmojian:{
			trigger:{player:'turnOverAfter'},
			direct:true,
			filter:function(event,player){
				return !player.isTurnedOver();
			},
			content:function(){
				"step 0"
				player.chooseTarget('是否发动【魔箭】？',function(card,player,target){
					return lib.filter.targetEnabled({name:'sha'},player,target);
				}).ai=function(target){
					return ai.get.effect(target,{name:'sha'},player);
				}
				"step 1"
				if(result.bool){
					player.logSkill('xmojian');
					player.useCard({name:'sha'},result.targets,false);
				}
			},
			ai:{
				expose:0.2,
			}
		},
		xshixin:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return event.player.isAlive()&&event.player!=player;
			},
			content:function(){
				'step 0'
				trigger.player.loseHp();
				'step 1'
				player.loseHp();
			}
		},
		enze:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return player.num('h')!=target.num('h');
			},
			content:function(){
				var num=player.num('h')-target.num('h');
				if(num>0){
					if(num>3){
						num=3;
					}
					target.draw(num);
				}
				else if(num<0){
					target.chooseToDiscard(-num,true);
				}
			},
			ai:{
				threaten:1.8,
				order:function(name,player){
					return 10;
				},
				result:{
					target:function(player,target){
						return player.num('h')-target.num('h');
					}
				},
				expose:0.2
			}
		},
		chongsheng:{
			unique:true,
			enable:'chooseToUse',
			mark:true,
			init:function(player){
				player.storage.chongsheng=0;
				game.addVideo('storage',player,['chongsheng',player.storage.chongsheng]);
			},
			filter:function(event,player){
				if(event.type!='dying') return false;
				if(player!=_status.dying) return false;
				if(player.storage.chongsheng==2) return false;
			},
			content:function(){
				player.hp=Math.min(2-player.storage.chongsheng,player.maxHp);
				player.discard(player.get('hej'));
				player.draw(2-player.storage.chongsheng);
				player.storage.chongsheng++;
				if(player.storage.chongsheng==2){
					player.unmarkSkill('chongsheng');
				}
				if(player.isLinked()) player.link();
				if(player.isTurnedOver()) player.turnOver();
				game.addVideo('storage',player,['chongsheng',player.storage.chongsheng]);
			},
			ai:{
				skillTagFilter:function(player){
					if(player.storage.chongsheng==2) return false;
					if(player.hp>0) return false;
				},
				save:true,
				result:{
					player:10
				},
				threaten:function(player,target){
					if(target.storage.chongsheng<2) return 0.6;
				}
			},
			intro:{
				content:function(storage){
					return '剩余'+get.cnNumber(2-storage)+'次';
				}
			}
		},
		guozai:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.num('h')<4;
			},
			init:function(player){
				player.storage.guozai2=0;
			},
			content:function(){
				var num=4-player.num('h');
				player.draw(num);
				player.addSkill('guozai2');
				player.storage.guozai2+=num;
				game.addVideo('storage',player,['guozai2',player.storage.guozai2]);
			},
			ai:{
				order:1,
				result:{
					player:1
				}
			}
		},
		guozai2:{
			mark:true,
			intro:{
				content:function(storage){
					return '需弃置'+get.cnNumber(storage)+'张牌';
				}
			},
			trigger:{player:'phaseUseEnd'},
			forced:true,
			content:function(){
				player.chooseToDiscard('he',true,player.storage.guozai2);
				player.storage.guozai2=0;
				player.removeSkill('guozai2');
			}
		},
		guozaix:{
			enable:'phaseUse',
			usable:2,
			filter:function(event,player){
				return player.num('h')<4;
			},
			init:function(player){
				player.storage.guozaix2=0;
			},
			content:function(){
				var num=4-player.num('h');
				player.draw(num);
				player.addSkill('guozaix2');
				player.storage.guozaix2+=num;
				game.addVideo('storage',player,['guozaix2',player.storage.guozaix2]);
			},
			ai:{
				order:1,
				result:{
					player:1
				}
			}
		},
		guozaix2:{
			mark:true,
			intro:{
				content:function(storage){
					return '需弃置'+get.cnNumber(storage)+'张牌';
				}
			},
			trigger:{player:'phaseUseEnd'},
			forced:true,
			content:function(){
				player.chooseToDiscard('he',true,player.storage.guozaix2);
				player.storage.guozaix2=0;
				player.removeSkill('guozaix2');
			}
		},
		hanshuang:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return event.card&&get.color(event.card)=='black'&&
				!event.player.isTurnedOver()&&event.player.isAlive();
			},
			content:function(){
				trigger.player.turnOver();
				player.loseHp();
			},
			ai:{
				threaten:1.5,
				effect:{
					player:function(card,player,target,current){
						if(get.color(card)=='black'&&get.tag(card,'damage')){
							return [1,0,1,-2];
						}
					}
				}
			}
		},
		bingshi:{
			global:'bingshi2'
		},
		bingshi2:{
			trigger:{global:'dieAfter'},
			forced:true,
			globalFixed:true,
			filter:function(event,player){
				return event.player.hasSkill('bingshi')&&event.player.isDead();
			},
			content:function(){
				trigger.player.line(player,'thunder');
				player.damage('nosource','thunder').animate=false;
				player.$damage(trigger.player);
				if(lib.config.animation&&!lib.config.low_performance){
					player.$thunder();
				}
				if(!event.parent.parent.bingshi_logv){
					event.parent.parent.bingshi_logv=true;
					game.logv(trigger.player,'bingshi',game.players.slice(0),event.parent.parent);
				}
			}
		},
		huanwu:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return !target.storage.huanwu;
			},
			content:function(){
				target.gainMaxHp();
				target.recover();
				target.draw(2);
				target.storage.huanwu=true;
				target.mark('huanwu',{
					name:'唤雾',
					content:'已发动'
				});
				game.addVideo('mark',target,{
					name:'唤雾',
					content:'已发动',
					id:'huanwu'
				});
			},
			ai:{
				threaten:1.2,
				result:{
					target:function(player,target){
						return 1/target.hp;
					}
				},
				order:10,
				expose:0.3
			}
		},
		fengnu:{
			mod:{
				cardUsable:function(card){
					if(get.info(card)&&get.info(card).forceUsable) return;
					return Infinity;
				},
				targetInRange:function(){
					return true;
				}
			},
			trigger:{player:'useCard'},
			filter:function(event,player){
				if(_status.currentPhase!=player) return false;
				return get.cardCount(event.card,player)>1;
			},
			forced:true,
			content:function(){
				player.draw();
			}
		},
		shengdun:{
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				return !player.hujia;
			},
			content:function(){
				player.changeHujia();
				player.update();
			},
		},
		shengdun_old:{
			trigger:{player:'phaseBegin'},
			forced:true,
			silent:true,
			popup:false,
			priority:10,
			init2:function(player){
				player.markSkill('shengdun');
			},
			content:function(){
				if(player.storage.shengdun){
					player.markSkill('shengdun');
				}
				player.storage.shengdun=false;
			},
			intro:{
				content:'未发动'
			},
			group:'shengdun2'
		},
		shengdun_old2:{
			trigger:{player:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return event.num>0&&!player.storage.shengdun;
			},
			content:function(){
				trigger.num--;
				player.storage.shengdun=true;
				player.unmarkSkill('shengdun');
			}
		},
		jingmeng:{
			trigger:{player:'useCard'},
			frequent:true,
			filter:function(event,player){
				return _status.currentPhase==player&&get.cardCount(true,player)==1;
			},
			content:function(){
				var type=get.type(trigger.card);
				var card=get.cardPile(function(card){
					return get.type(card)==type;
				});
				if(card){
					player.gain(card,'gain2');
					game.log(player,'获得了',card);
				}
			},
			ai:{
				threaten:1.1
			}
		},
		kuixin:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				var nh=player.num('h');
				var nm=1;
				for(var i=0;i<game.players.length;i++){
					var target=game.players[i];
					if(target!=player&&Math.abs(target.num('h')-nh)<=nm){
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				var nh=player.num('h');
				var nm=1;
				var check=true;
				if(player.num('h','tao')){
					check=false;
				}
				else if(player.num('h','shan')&&player.num('h','wuxie')){
					check=false;
				}
				player.chooseTarget('是否发动【窥心】？',function(card,player,target){
					return target!=player&&Math.abs(target.num('h')-nh)<=nm;
				}).ai=function(target){
					if(!check) return 0;
					if(ai.get.attitude(player,target)<0){
						return target.num('h')-nh;
					}
					return 0;
				};
				'step 1'
				if(result.bool){
					var target=result.targets[0];
					player.logSkill('kuixin',result.targets);
					var cards0=target.get('h');
					var cards1=player.get('h');
					target.gain(cards1);
					player.gain(cards0);
					target.$give(cards0.length,player);
					player.$give(cards1.length,target);
				}
			},
			ai:{
				expose:0.2,
				threaten:1.5
			}
		},
		lianzhan:{
			trigger:{player:'phaseUseEnd'},
			frequent:true,
			filter:function(event,player){
				return get.cardCount(true,player)>0;
			},
			content:function(){
				player.draw(get.cardCount(true,player));
			},
			ai:{
				threaten:1.3
			}
		},
		bingshuang:{
			trigger:{source:'damageEnd'},
			filter:function(event,player){
				return event.card&&get.type(event.card)=='trick'&&
				event.player.isAlive()&&!event.player.isTurnedOver();
			},
			prompt:function(event,player){
				return '是否对'+get.translation(event.player)+'发动【冰霜】？';
			},
			check:function(event,player){
				if(event.player.isTurnedOver()){
					return ai.get.attitude(player,event.player)>0;
				}
				return ai.get.attitude(player,event.player)<=0;
			},
			logTarget:'player',
			content:function(){
				trigger.player.draw(2);
				trigger.player.turnOver();
			}
		},
		yanshu:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.num('h',{type:'basic'})<player.num('h');
			},
			filterCard:function(card){
				return get.type(card)!='basic';
			},
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				var card=cards[0];
				var card2=get.cardPile('liuxinghuoyu');
				if(!card2){
					card2=game.createCard('liuxinghuoyu',get.suit(card),get.number(card));
				}
				player.gain(card2,'gain2');
			},
			ai:{
				order:9,
				result:{
					player:1
				},
				threaten:2
			}
		},
		shengyan:{
			trigger:{global:'recoverEnd'},
			filter:function(event,player){
				return !player.hasSkill('shengyan2')&&event.player.hp<event.player.maxHp;
			},
			prompt:function(event,player){
				return '是否对'+get.translation(event.player)+'发动【圣言】？';
			},
			check:function(event,player){
				return ai.get.attitude(player,event.player)>0;
			},
			content:function(){
				trigger.player.recover();
				player.line(trigger.player,'green');
				player.addTempSkill('shengyan2','phaseAfter');
			},
			ai:{
				expose:0.2
			}
		},
		shengyan2:{},
		liechao:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return !player.isTurnedOver()&&player.num('h')<=player.hp;
			},
			content:function(){
				player.draw(4);
				player.turnOver();
				player.skip('phaseDiscard');
			},
			ai:{
				order:10,
				result:{
					player:1
				}
			}
		},
		qingliu:{
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
		zhongjia:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				player.changeHujia();
			},
			ai:{
				nohujia:true,
				skillTagFilter:function(player){
					return player.hp>1;
				},
				threaten:function(player,target){
					if(!target.hujia) return 0.8;
				},
				effect:{
					target:function(card,player){
						if(get.tag(card,'damage')){
							if(player.hasSkill('jueqing')) return [1,-1];
							return 0.8;
						}
					}
				}
			}
		},
		dunji:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.hujia?true:false;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			selectTarget:function(){
				return [1,_status.event.player.hujia];
			},
			content:function(){
				if(target==targets[0]){
					player.changeHujia(-player.hujia);
				}
				target.damage();
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target)+0.5;
					}
				}
			}
		},
		fengxing:{
			trigger:{player:['useCard']},
			frequent:true,
			filter:function(event){
				return event.card&&event.card.name=='sha';
			},
			content:function(){
				player.draw();
			}
		},
		fengxian:{
			enable:'phaseUse',
			usable:1,
			filterTarget:function(card,player,target){
				return target.num('h')>0;
			},
			selectTarget:-1,
			content:function(){
				target.chooseToDiscard(true);
			},
			ai:{
				order:8,
				result:{
					target:function(player,target){
						var nh=target.num('h');
						switch(nh){
							case 0:return 0;
							case 1:return -1.5;
							case 2:return -1.3;
							case 3:return -1;
							default:return -0.8;
						}
					}
				}
			}
		},
		qiaodong:{
			enable:['chooseToRespond'],
			filterCard:{type:'equip'},
			filter:function(event,player){
				return player.num('he',{type:'equip'})>0;
			},
			viewAs:{name:'shan'},
			position:'he',
			prompt:'将一张装备牌当闪使用或打出',
			check:function(){return 1},
			ai:{
				respondShan:true,
				skillTagFilter:function(player){
					if(!player.num('he',{type:'equip'})) return false;
				}
			}
		},
		hsmengjing_mengye:{
			trigger:{player:'phaseEnd'},
			forced:true,
			priority:-1,
			filter:function(event,player){
				return player.num('he')>0;
			},
			content:function(){
				player.discard(player.get('he'));
				player.removeSkill('hsmengjing_mengye');
			},
			mark:'image',
			intro:{
				content:'回合结束阶段，弃置所有牌'
			}
		},
		zhanhou:{
			enable:'phaseUse',
			filterCard:{subtype:'equip2'},
			position:'he',
			filter:function(event,player){
				return player.num('he',{subtype:'equip2'})>0;
			},
			check:function(card){
				return 7-ai.get.value(card);
			},
			content:function(){
				player.changeHujia();
			},
			ai:{
				order:9.5,
				result:{
					player:1
				}
			},
			// mod:{
			// 	globalFrom:function(from,to,distance){
			// 		return distance-from.hujia;
			// 	}
			// },
		},
		shijie:{
			trigger:{player:'phaseEnd'},
			direct:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				'step 0'
				player.chooseTarget('是否发动【视界】',function(card,player,target){
					return player!=target&&target.num('h')>0;
				}).ai=function(target){
					return 11-ai.get.attitude(player,target);
				};
				'step 1'
				if(result.bool){
					player.logSkill('shijie',result.targets);
					var target=result.targets[0];
					player.gain(target.get('h').randomGet());
					event.target=target;
					target.$give(1,player);
					game.delay();
					event.target.draw();
				}
			},
			ai:{
				expose:0.1
			}
		},
		shengguang:{
			enable:'phaseUse',
			filterCard:{color:'red'},
			filter:function(event,player){
				return player.num('he',{color:'red'})>0;
			},
			position:'he',
			usable:1,
			check:function(card){
				return 9-ai.get.value(card)
			},
			filterTarget:function(card,player,target){
				if(player.storage.anying) return true;
				if(target.hp>=target.maxHp) return false;
				return true;
			},
			content:function(){
				if(player.storage.anying){
					target.loseHp();
				}
				else{
					target.recover();
				}
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(player.storage.anying) return -1;
						if(target.hp==1) return 5;
						if(player==target&&player.num('h')>player.hp) return 5;
						return 2;
					}
				},
				threaten:2,
				expose:0.2
			}
		},
		xinci:{
			enable:'phaseUse',
			filterCard:{color:'black'},
			filter:function(event,player){
				return player.num('he',{color:'black'})>0;
			},
			position:'he',
			usable:1,
			mark:true,
			intro:{
				content:'已进入暗影形态'
			},
			check:function(card){
				return 9-ai.get.value(card)
			},
			filterTarget:true,
			content:function(){
				target.loseHp();
			},
			ai:{
				order:9,
				result:{
					target:-1
				},
				threaten:2,
				expose:0.2
			}
		},
		anying:{
			unique:true,
			enable:'phaseUse',
			skillAnimation:'epic',
			animationColor:'thunder',
			filter:function(event,player){
				return !player.storage.anying&&player.num('he',{color:'black'})>1;
			},
			selectCard:2,
			filterCard:{color:'black'},
			position:'he',
			check:function(card){
				return 5-ai.get.value(card);
			},
			content:function(){
				player.storage.anying=true;
				player.removeSkill('shengguang');
				player.addSkill('xinci');
			},
			ai:{
				order:1,
				result:{
					player:1
				}
			}
		},
		bianxing:{
			trigger:{global:'useCard'},
			filter:function(event,player){
				if(player.hasSkill('bianxing2')) return false;
				if(event.player==player) return false;
				if(_status.currentPhase!=event.player) return false;
				if(!event.targets) return false;
				if(event.targets.length!=1) return false;
				if(event.targets[0]==event.player) return false;
				var hs=player.get('h');
				for(var i=0;i<hs.length;i++){
					if(hs[i].name!=event.card.name){
						var card=hs[i];
						if(get.type(card)=='basic'&&get.info(card.enable)){
							return true;
						}
					}
				}
				return false;
			},
			direct:true,
			content:function(){
				'step 0'
				var eff=ai.get.effect(trigger.targets[0],trigger.card,trigger.player,player);
				var att=ai.get.attitude(player,trigger.player);
				player.chooseCard('是否发动【变形】？',function(card){
					if(card.name!=trigger.card.name){
						if(get.type(card)=='basic'&&get.info(card).enable){
							return true;
						}
					}
					return false;
				}).ai=function(card){
					if(att>=0) return 0;
					if(card.name=='tao'||card.name=='caoyao'){
						if(trigger.targets[0].hp==trigger.targets[0].maxHp) return 0;
					}
					if(eff>=0) return 0;
					return ai.get.effect(trigger.targets[0],card,trigger.player,player);
				};
				'step 1'
				if(result.bool){
					var card=result.cards[0];
					player.lose(result.cards);
					event.cards=result.cards;
					player.logSkill('bianxing',trigger.player);
					game.log(player,'将',trigger.card,'变为',result.cards);
					game.delay(0.5);
					trigger.untrigger();
					trigger.card=card;
					trigger.cards=[card];
					player.addTempSkill('bianxing2','phaseAfter');
				}
				else{
					event.finish();
				}
				'step 2'
				player.$throw(event.cards);
				game.delay();
				'step 3'
				// player.draw();
				'step 4'
				trigger.trigger('useCard');
			},
			ai:{
				expose:0.2,
				threaten:1.8
			}
		},
		bingjia:{
			enable:'phaseUse',
			filter:function(event,player){
				return !player.hasSkill('bingjia2');
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
				player.storage.bingjia=cards[0];
				player.addSkill('bingjia2');
				game.addVideo('storage',player,['bingjia',get.cardInfo(cards[0]),'card']);
			},
			ai:{
				order:1,
				result:{
					player:1
				}
			}
		},
		bingjia2:{
			mark:true,
			trigger:{target:'useCardToBegin'},
			forced:true,
			filter:function(event,player){
				return event.player!=player&&get.suit(event.card)==get.suit(player.storage.bingjia);
			},
			content:function(){
				'step 0'
				player.showCards([player.storage.bingjia],get.translation(player)+'发动了【冰甲】');
				'step 1'
				ui.discardPile.appendChild(player.storage.bingjia);
				delete player.storage.bingjia;
				player.changeHujia();
				player.removeSkill('bingjia2');
				game.addVideo('storage',player,['bingjia',null]);
			},
			intro:{
				mark:function(dialog,content,player){
					if(player==game.me||player.isUnderControl()){
						dialog.add([player.storage.bingjia]);
					}
					else{
						return '已发动冰甲';
					}
				},
				content:function(content,player){
					if(player==game.me||player.isUnderControl()){
						return get.translation(player.storage.bingjia);
					}
					return '已发动冰甲';
				}
			}
		},
		bianxing2:{},
		moying:{
			trigger:{player:'phaseBegin'},
			skillcheck:function(event,player){
				if(!player.num('h',{suit:'spade'})) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].num('j','shandian')){
						return false;
					}
				}
				return true;
			},
			forced:true,
			check:function(){
				return false;
			},
			content:function(){
				'step 0'
				if(!lib.skill.moying.skillcheck(trigger,player)){
					player.draw();
					event.finish();
					return;
				}
				var card=null;
				for(var i=0;i<ui.cardPile.childNodes.length;i++){
					if(ui.cardPile.childNodes[i].name=='shandian'){
						card=ui.cardPile.childNodes[i];break;
					}
				}
				if(!card){
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						if(ui.discardPile.childNodes[i].name=='shandian'){
							card=ui.discardPile.childNodes[i];break;
						}
					}
				}
				if(card){
					player.addJudge(card);
				}
				else{
					event.finish();
				}
				'step 1'
				game.delay();
			},
			ai:{
				threaten:1.5
			}
		},
		mdzhoufu:{
			enable:'phaseUse',
			filterCard:{color:'black'},
			filter:function(event,player){
				return player.num('h',{color:'black'})>0;
			},
			filterTarget:function(card,player,target){
				return player!=target&&!target.hasSkill('mdzhoufu2');
			},
			prepare:function(cards,player){
				player.$throw(cards);
			},
			discard:false,
			content:function(){
				target.$gain2(cards);
				target.storage.mdzhoufu2=cards[0];
				target.addSkill('mdzhoufu2');
				target.storage.mdzhoufu3=player;
				game.addVideo('storage',target,['mdzhoufu2',get.cardInfo(cards[0]),'card']);
				ui.special.appendChild(cards[0]);
			},
			check:function(card){
				if(get.suit(card)=='spade'&&card.number>=2&&card.number<=9){
					return 6-ai.get.value(card);
				}
				return -1;
			},
			ai:{
				tag:{
					rejudge:0.1,
				},
				threaten:1.5,
				expose:0.1,
				order:10,
				result:{
					target:-1
				}
			}
		},
		mdzhoufu2:{
			trigger:{player:'judge'},
			forced:true,
			priority:10,
			mark:'card',
			content:function(){
				"step 0"
				ui.discardPile.appendChild(player.storage.mdzhoufu2);
				player.$throw(player.storage.mdzhoufu2);
				if(player.storage.mdzhoufu2.clone){
					player.storage.mdzhoufu2.clone.classList.add('thrownhighlight');
					game.addVideo('highlightnode',player,get.cardInfo(player.storage.mdzhoufu2));
				}
				if(player.storage.mdzhoufu3.isAlive()){
					// player.storage.mdzhoufu3.draw();
					player.storage.mdzhoufu3.gain(player.judging[0],'gain2');
				}
				else{
					ui.discardPile.appendChild(player.judging[0]);
					game.delay(1.5);
				}
				"step 1"
				player.judging[0]=player.storage.mdzhoufu2;
				trigger.position.appendChild(player.storage.mdzhoufu2);
				// trigger.untrigger();
				game.log(player,'的判定牌改为',player.storage.mdzhoufu2);
				player.removeSkill('mdzhoufu2');
				delete player.storage.mdzhoufu2;
				delete player.storage.mdzhoufu3;
			},
			intro:{
				content:'card'
			},
		},
		moying_old:{
			trigger:{player:'damageEnd',source:'damageEnd'},
			check:function(event,player){
				var target=(player==event.player)?event.source:event.player;
				return ai.get.attitude(player,target)<0;
			},
			filter:function(event,player){
				var target=(player==event.player)?event.source:event.player;
				return target.isAlive();
			},
			prompt:function(event,player){
				var target=(player==event.player)?event.source:event.player;
				return '是否对'+get.translation(target)+'发动【魔影】？';
			},
			content:function(){
				"step 0"
				event.target=(player==trigger.player)?trigger.source:trigger.player;
				event.target.judge(function(card){
					return get.color(card)=='black'?-1:0;
				});
				"step 1"
				if(result.color=='black'){
					event.target.loseHp();
				}
			},
			ai:{
				expose:0.1,
				threaten:1.3
			}
		},
		xianzhi:{
			trigger:{global:'judgeBegin'},
			frequent:true,
			filter:function(){
				return ui.cardPile.childNodes.length>1;
			},
			check:function(){
				return false;
			},
			content:function(){
				'step 0'
				var str='';
				if(trigger.card) str=get.translation(trigger.card.viewAs||trigger.card.name);
				else if(trigger.skill) str=get.translation(trigger.skill);
				else str=get.translation(trigger.parent.name);

				var cards=[ui.cardPile.childNodes[0],ui.cardPile.childNodes[1]];
				var att=ai.get.attitude(player,trigger.player);
				var delta=trigger.judge(ui.cardPile.childNodes[1])-trigger.judge(ui.cardPile.childNodes[0]);
				player.chooseControl('调换顺序','cancel',
				ui.create.dialog('先知：'+get.translation(trigger.player)+'的'+str+'判定',cards,'hidden')).ai=function(){
					if(att*delta>0) return '调换顺序';
					else return 'cancel';
				};
				'step 1'
				if(result.control=='调换顺序'){
					var card=ui.cardPile.firstChild;
					ui.cardPile.removeChild(card);
					ui.cardPile.insertBefore(card,ui.cardPile.firstChild.nextSibling);
					game.log(player,'调换了牌堆顶两张牌的顺序');
				}
			},
			ai:{
				expose:0.1,
				tag:{
					rejudge:0.5
				}
			}
		},
		jingxiang:{
			trigger:{player:'chooseToRespondBegin'},
			direct:true,
			filter:function(event,player){
				if(event.responded) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				var players=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')){
						players.push(game.players[i]);
					}
				}
				if(!players.length){
					event.finish();
					return;
				}
				var target=players.randomGet();
				event.target=target;
				var cards=target.get('h');
				player.chooseCardButton('镜像：选择'+get.translation(target)+'的一张卡手牌打出',cards).filterButton=function(button){
					return trigger.filterCard(button.link);
				}
				"step 1"
				if(result.bool){
					player.logSkill('jingxiang',event.target);
					event.target.lose(result.links);
					trigger.untrigger();
					trigger.responded=true;
					result.buttons[0].link.remove();
					trigger.result={bool:true,card:result.buttons[0].link}
				}
			},
			ai:{
				effect:{
					target:function(card){
						if(get.tag(card,'respondShan')) return 0.7;
						if(get.tag(card,'respondSha')) return 0.7;
					}
				}
			},
		},
		wlianji:{
			trigger:{player:'phaseEnd'},
			frequent:true,
			filter:function(event,player){
				return get.cardCount(true,player)>player.hp;
			},
			content:function(){
				player.draw(2);
			},
			init:function(player){player.storage.jingce=true},
			intro:{
				content:function(storage,player){
					if(_status.currentPhase==player) return '已使用'+get.cardCount(true,player)+'张牌';
				}
			}
		},
		mengun:{
			trigger:{global:'useCardToBefore'},
			priority:12,
			filter:function(event,player){
				if(event.player==player) return false;
				if(_status.currentPhase!=event.player) return false;
				if(event.player.hasSkill('mengun2')) return false;
				if(get.itemtype(event.card)!='card') return false;
				if(!player.num('h',{suit:get.suit(event.card)})) return false;
				return get.type(event.card)=='basic';
			},
			direct:true,
			content:function(){
				"step 0"
				var val=ai.get.value(trigger.card);
				var suit=get.suit(trigger.card);
				var eff=ai.get.effect(trigger.target,trigger.card,trigger.player,player);
				var next=player.chooseToDiscard('是否对'+get.translation(trigger.player)+'使用的'+get.translation(trigger.card)+'发动【闷棍】？',function(card){
					return get.suit(card)==suit;
				});
				next.logSkill=['mengun',trigger.player];
				next.ai=function(card){
					if(eff>=0) return 0;
					return Math.min(8,1+val)-ai.get.value(card);
				}
				"step 1"
				if(result.bool){
					game.log(trigger.player,'收回了',trigger.cards);
					trigger.untrigger();
					trigger.finish();
					game.delay();
				}
				else{
					event.finish();
				}
				"step 2"
				trigger.player.$gain2(trigger.cards);
				trigger.player.gain(trigger.cards);
				trigger.player.storage.mengun2=trigger.cards[0];
				game.addVideo('storage',player,['mengun2',get.cardInfo(trigger.cards[0]),'card']);
				trigger.player.addTempSkill('mengun2','phaseEnd');
			},
			ai:{
				expose:0.2
			}
		},
		mengun2:{
			mark:'card',
			mod:{
				cardEnabled:function(card,player){
					if(card==player.storage.mengun2) return false;
				},
			},
			intro:{
				content:'card',
				onunmark:function(storage,player){
					delete player.storage.mengun2;
				}
			},
		},
		jianren:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.get('e','1')?true:false;
			},
			filterCard:function(card,player){
				return card==player.get('e','1');
			},
			position:'e',
			filterTarget:function(card,player,target){
				return target!=player;
			},
			selectCard:-1,
			selectTarget:-1,
			content:function(){
				target.damage();
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target);
					}
				}
			}
		},
		jihuo:{
			trigger:{player:'phaseAfter'},
			filter:function(event,player){
				return !player.storage.jihuo&&player.num('h')>0;
			},
			direct:true,
			content:function(){
				"step 0"
				var next=player.chooseToDiscard('是否发动【激活】？');
				next.ai=ai.get.unuseful2;
				next.logSkill='jihuo';
				"step 1"
				if(result.bool){
					player.storage.jihuo=true;
				}
				else{
					event.finish();
				}
				"step 2"
				player.phase();
				"step 3"
				player.storage.jihuo=false;
			},
			ai:{
				threaten:1.2
			}
		},
		tzhenji:{
			trigger:{player:'discardAfter'},
			direct:true,
			filter:function(event,player){
				if(player.hasSkill('tzhenji2')){
					return false;
				}
				if(event.cards){
					for(var i=0;i<event.cards.length;i++){
						if(get.color(event.cards[i])=='black') return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0";
				player.chooseTarget('是否发动【震击】？').ai=function(target){
					var bool=ai.get.attitude(player,target)>0;
					return ai.get.damageEffect(target,player,player,'thunder')-(bool?1:0);
				};
				"step 1"
				if(result.bool){
					game.delay(0.5);
					var target=result.targets[0];
					player.logSkill('tzhenji',target,'thunder');
					var cs=target.get('he');
					if(cs.length){
						target.discard(cs.randomGet());
					}
					target.damage('thunder');
					player.addTempSkill('tzhenji2','phaseAfter');
				}
			},
			ai:{
				threaten:1.2,
				expose:0.3,
				effect:{
					target:function(card,player,target){
						if(get.tag(card,'loseCard')&&target.num('he')){
							return 0.7;
						}
					}
				},
			}
		},
		tzhenji2:{},
		tzhenji_old:{
			trigger:{player:['useCard','respondEnd']},
			filter:function(event){
				return get.suit(event.card)=='spade';
			},
			direct:true,
			content:function(){
				"step 0";
				player.chooseTarget('是否发动【震击】？').ai=function(target){
					return ai.get.damageEffect(target,player,player,'thunder')-1;
				};
				"step 1"
				if(result.bool){
					player.logSkill('tzhenji',result.targets,'thunder');
					event.target=result.targets[0];
					event.target.judge();
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.color=='red'){
					event.target.damage('fire');
				}
				else{
					event.target.damage('thunder');
					var cs=event.target.get('he');
					if(cs.length){
						event.target.discard(cs.randomGet());
					}
					cs=player.get('he');
					if(cs.length){
						player.discard(cs.randomGet());
					}
				}
			},
			ai:{
				expose:0.2,
				threaten:1.2,
				effect_old:{
					target:function(card,player,target){
						if(get.tag(card,'respondShan')){
							var hastarget=false;
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0){
									hastarget=true;break;
								}
							}
							var ns=target.num('h','shan');
							var nh=target.num('h');
							if(ns>1){
								return [0,hastarget?1:0];
							}
							if(ns&&nh>=2){
								return [0,0];
							}
							if(nh>3){
								return [0,0];
							}
							if(nh==0){
								return 1.5;
							}
							return [1,0.05];
						}
					}
				}
			}
		},
		tuteng_s:{
			trigger:{player:'phaseUseBegin'},
			forced:true,
			filter:function(event,player){
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					rand.remove(player.skills[i]);
					if(rand.length==0) return false;
				}
				return true;
			},
			content:function(){
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					rand.remove(player.skills[i]);
				}
				if(rand.length){
					player.addSkill(rand.randomGet());
				}
			},
			ai:{
				effect:function(card,player){
					if(get.tag(card,'damage')){
						if(player.hasSkill('jueqing')) return [1,1];
						return 1.2;
					}
				},
				threaten:1.3
			},
			group:'tuteng_lose'
		},
		s_tuteng:{
			trigger:{player:'phaseBegin'},
			forced:true,
			unique:true,
			content:function(){
				var rand=['tuteng2','tuteng4','tuteng5','tuteng6','tuteng7','tuteng8'];
				if(player.storage.s_tuteng){
					var rand2=player.storage.s_tuteng;
					for(var i=0;i<3;i++){
						rand.remove(rand2[i]);
					}
					player.removeSkill(rand2.randomRemove());
					var totem=rand.randomGet();
					rand2.push(totem);
					player.addSkill(totem);
				}
				else{
					for(var i=0;i<3;i++){
						rand.randomRemove();
					}
					for(var i=0;i<3;i++){
						player.addSkill(rand[i]);
					}
					player.storage.s_tuteng=rand;
				}
			},
			ai:{
				threaten:2
			}
		},
		tuteng:{
			enable:'phaseUse',
			usable:1,
			unique:true,
			direct:true,
			check:function(){
				return 0;
			},
			delay:0,
			init:function(){
				for(var i=1;i<=8;i++){
					lib.translate['tuteng'+i+'_info']=lib.skill['tuteng'+i].intro.content;
				}
			},
			position:'he',
			filter:function(event,player){
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<rand.length;i++){
					if(!player.hasSkill(rand[i])) return true;
				}
				return false;
			},
			content:function(){
				'step 0'
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				var rand2=[];
				var randx=[];
				var rand2x=[];
				if(player.storage.tuteng_awake){
					// rand=rand.concat(['tuteng5','tuteng6','tuteng7','tuteng8']);
				}
				for(var i=0;i<player.skills.length;i++){
					if(rand.contains(player.skills[i])){
						rand.remove(player.skills[i]);
						rand2.push(player.skills[i]);
					}
				}
				if(!player.storage.tuteng_awake){
					player.addSkill(rand.randomGet());
					game.delay();
					event.finish();
					return;
				}
				if(rand.length){
					if(event.isMine()&&(rand.length>1||rand2.length>=4)){
						var dialog=ui.create.dialog();
						for(var i=0;i<rand.length;i++){
							randx[i]=['','',rand[i]];
						}
						for(var i=0;i<rand2.length;i++){
							rand2x[i]=['','',rand2[i]];
						}
						dialog.add('选择一个图腾');
						dialog.add([randx,'vcard']);
						if(rand2.length>=4){
							dialog.add('替换一个已有图腾');
							dialog.add([rand2x,'vcard']);
							player.chooseButton(dialog,2,true).filterButton=function(button){
								if(ui.selected.buttons.length){
									var current=ui.selected.buttons[0].name;
									if(rand.contains(current)){
										return rand2.contains(button.name);
									}
									else{
										return rand.contains(button.name);
									}
								}
								return true;
							};
						}
						else{
							player.chooseButton(dialog,true);
						}
						for(var i=0;i<dialog.buttons.length;i++){
							var item=dialog.buttons[i]
							if(i==4){
								item.parentNode.insertBefore(document.createElement('br'),item);
							}
							item.style.zoom=0.7;
						}
					}
					else{
						if(player.hp<player.maxHp&&rand.contains('tuteng1')){
							player.addSkill('tuteng1');
						}
						else{
							if(rand.length>1){
								rand.remove('tuteng1');
							}
							player.addSkill(rand.randomGet());
						}
						// if(rand2.length>=3){
						// 	player.removeSkill(rand2.randomGet());
						// }
						game.delay();
						event.finish();
					}
				}
				else{
					event.finish();
				}
				'step 1'
				if(result.buttons.length==1){
					player.addSkill(result.buttons[0].name);
				}
				else if(result.buttons.length==2){
					var skill1=result.buttons[0].name;
					var skill2=result.buttons[1].name;
					if(player.hasSkill(skill1)){
						player.removeSkill(skill1);
						player.addSkill(skill2);
					}
					else{
						player.removeSkill(skill2);
						player.addSkill(skill1);
					}
				}
			},
			ai:{
				order:11,
				result:{
					player:1
				},
				effect:function(card,player){
					if(get.tag(card,'damage')){
						if(player.hasSkill('jueqing')) return;
						return 1.2;
					}
				},
				threaten:2
			},
			group:'tuteng_lose'
		},
		zuling:{
			skillAnimation:'epic',
			animationColor:'thunder',
			trigger:{player:'phaseBegin'},
			forced:true,
			filter:function(event,player){
				if(!player.storage.tuteng_awake){
					var rand=['tuteng1','tuteng2','tuteng3','tuteng4',
					'tuteng5','tuteng6','tuteng7','tuteng8'];
					var num=0;
					for(var i=0;i<player.skills.length;i++){
						if(rand.contains(player.skills[i])) num++;
						if(num>=2){
							return true;
						}
					}
				}
				return false;
			},
			content:function(){
				player.storage.tuteng_awake=true;
				player.loseMaxHp();
			}
		},
		tuteng_h:{
			mod:{
				maxHandcard:function(player,num){
					return num-1;
				}
			}
		},
		tuteng_lose:{
			trigger:{player:'damageEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				var tuteng=['tuteng1','tuteng2','tuteng3','tuteng4',
				'tuteng5','tuteng6','tuteng7','tuteng8'];
				for(var i=0;i<player.skills.length;i++){
					if(tuteng.contains(player.skills[i])) return true;
				}
				return false;
			},
			content:function(){
				var tuteng=['tuteng1','tuteng2','tuteng3','tuteng4',
				'tuteng5','tuteng6','tuteng7','tuteng8'];
				var rand=[];
				for(var i=0;i<player.skills.length;i++){
					if(tuteng.contains(player.skills[i])){
						rand.push(player.skills[i]);
					}
				}
				if(rand.length){
					player.removeSkill(rand.randomGet());
				}
			}
		},
		tuteng1:{
			mark:'image',
			nopop:true,
			intro:{
				content:'回合结束阶段，你回复一点体力'
			},
			trigger:{player:'phaseEnd'},
			forced:true,
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			content:function(){
				player.recover();
			}
		},
		tuteng2:{
			mark:'image',
			nopop:true,
			intro:{
				content:'每当你造成一点伤害，你摸一张牌'
			},
			filter:function(event){
				return event.num>0;
			},
			trigger:{source:'damageAfter'},
			forced:true,
			content:function(){
				player.draw(trigger.num);
			}
		},
		tuteng3:{
			mark:'image',
			nopop:true,
			intro:{
				content:'你受到的伤害-1'
			},
			trigger:{player:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.num>0;
			},
			content:function(){
				trigger.num--;
			},
		},
		tuteng4:{
			mark:'image',
			nopop:true,
			intro:{
				content:'你的锦囊牌造成的伤害+1'
			},
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.card&&get.type(event.card)=='trick'&&event.notLink();
			},
			content:function(){
				trigger.num++;
			}
		},
		tuteng5:{
			mark:'image',
			nopop:true,
			intro:{
				content:'回合结束阶段，你摸一张牌'
			},
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.draw();
			}
		},
		tuteng6:{
			mark:'image',
			nopop:true,
			intro:{
				content:'你的杀造成的伤害+1'
			},
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.card&&event.card.name=='sha'&&event.notLink();
			},
			content:function(){
				trigger.num++;
			}
		},
		tuteng7:{
			mark:'image',
			nopop:true,
			intro:{
				content:'回合结束阶段，你令一名其他角色回复一点体力'
			},
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
				player.chooseTarget('活力图腾：令一名其他角色回复一点体力',function(card,player,target){
					return target!=player&&target.hp<target.maxHp;
				}).ai=function(target){
					return ai.get.recoverEffect(target,player,player);
				};
				'step 1'
				if(result.bool){
					player.logSkill('tuteng7',result.targets[0]);
					result.targets[0].recover();
				}
			}
		},
		tuteng8:{
			mark:'image',
			nopop:true,
			intro:{
				content:'当计算你与其它角色的距离时，始终-1'
			},
			mod:{
				globalFrom:function(from,to,distance){
					return distance-1;
				}
			}
		},
		fenliu:{
			enable:'phaseUse',
			prompt:'流失1点体力并摸两张牌',
			usable:1,
			content:function(){
				"step 0"
				player.loseHp(1);
				"step 1"
				player.draw(3);
			},
			ai:{
				order:4,
				result:{
					player:function(player){
						if(player.num('h')>=player.hp-1) return -1;
						if(player.hp<3) return -1;
						return 1;
					}
				},
				effect:{
					target:function(card){
						if(get.tag(card,'damage')||get.tag(card,'loseHp')){
							return 1.5;
						}
					}
				},
				threaten:1.2
			}
		},
		hongxi:{
			trigger:{global:'dieAfter'},
			filter:function(event,player){
				return player.hp<player.maxHp;
			},
			forced:true,
			content:function(){
				player.recover(player.maxHp-player.hp);
			},
			ai:{
				threaten:1.2
			}
		},
	},
	cardType:{
		hsmengjing:0.5,
		hsbaowu:0.5,
		hsdusu:0.5,
		hsshenqi:0.5,
	},
	card:{
		hsdusu_xueji:{
			type:'hsdusu',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_xialikeer',
			filterTarget:function(card,player,target){
				return target.num('e')>0;
			},
			content:function(){
				target.discard(target.get('e').randomGets(Math.ceil(Math.random()*2)));
			},
			ai:{
				order:5,
				result:{
					target:function(player,target){
						if(target.hasSkillTag('noe')) return 0;
						if(target.num('e')>1) return -1.5;
						return -1;
					},
				},
				useful:3,
				value:5,
			}
		},
		hsdusu_kuyecao:{
			type:'hsdusu',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_xialikeer',
			filterTarget:function(card,player,target){
				return !target.hasSkill('hslingjian_yinshen');
			},
			content:function(){
				target.addTempSkill('hslingjian_yinshen',{player:'phaseBegin'});
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						if(player!=target&&get.distance(player,target,'absolute')<=1) return 0;
						var num=1;
						if(target==player){
							num=1.5;
						}
						if(target.hp==1) return 2*num;
						if(target.hp==2&&target.num('h')<=2) return 1.2*num;
						return num;
					}
				},
				useful:4,
				value:5,
			}
		},
		hsdusu_huangxuecao:{
			type:'hsdusu',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_xialikeer',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			modTarget:true,
			content:function(){
				'step 0'
				target.chooseToDiscard('he',true);
				'step 1'
				target.draw(2);
			},
			ai:{
				order:9,
				result:{
					target:1,
				},
				useful:5,
				value:10,
			}
		},
		hsdusu_huoyanhua:{
			type:'hsdusu',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_xialikeer',
			range:{attack:1},
			filterTarget:true,
			content:function(){
				target.damage('fire');
			},
			ai:{
				order:5,
				result:{
					target:-1,
				},
				useful:5,
				value:8,
				tag:{
					damage:1,
					fireDamage:1,
					natureDamage:1,
				}
			}
		},
		hsdusu_shinancao:{
			type:'hsdusu',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_xialikeer',
			filterTarget:function(card,player,target){
				return !target.hasSkill('hsdusu_shinancao');
			},
			content:function(){
				target.addSkill('hsdusu_shinancao');
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						if(target.hp>1){
							if(target.num('h')>2) return 1;
							return 0.5;
						}
						return 0.2;
					},
				},
				useful:4,
				value:5,
			}
		},
		hsbaowu_cangbaotu:{
			type:'hsbaowu',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_yelise',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				target.addSkill('hsbaowu_cangbaotu');
				target.draw();
			},
			ai:{
				order:10,
				result:{
					player:10
				},
				useful:10,
				value:10,
			}
		},
		hsbaowu_huangjinyuanhou:{
			type:'hsbaowu',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_yelise',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				player.recover();
				var hs=target.get('h');
				target.discard(hs);
				var cs=[];
				for(var i=0;i<hs.length;i++){
					cs.push(game.createCard('wuzhong'));
				}
				target.gain(cs,'gain2');
				target.storage.hsbaowu_huangjinyuanhou=cards[0];
				target.addSkill('hsbaowu_huangjinyuanhou');
			},
			ai:{
				order:10,
				result:{
					player:function(player){
						if(player.num('h')>1) return 1;
						if(player.hp==1) return 1;
						return 0;
					}
				},
				useful:10,
				value:10,
			}
		},
		hsshenqi_nengliangzhiguang:{
			type:'hsshenqi',
			fullimage:true,
			vanish:true,
			enable:function(card,player){
				return !player.isTurnedOver();
			},
			derivation:'hs_lafamu',
			filterTarget:true,
			content:function(){
				target.gainMaxHp();
				target.recover();
				target.draw(4);
			},
			contentAfter:function(){
				if(!player.isTurnedOver()){
					player.turnOver();
				}
			},
			ai:{
				order:5,
				result:{
					target:function(player,target){
						if(target.hp<=1) return 2;
						if(target.num('h')<target.hp||target.hp==2) return 1.5;
						return 1;
					}
				},
				useful:5,
				value:10,
			}
		},
		hsshenqi_kongbusangzhong:{
			type:'hsshenqi',
			fullimage:true,
			vanish:true,
			enable:function(card,player){
				return !player.isTurnedOver();
			},
			derivation:'hs_lafamu',
			filterTarget:function(card,player,target){
				return target!=player;
			},
			selectTarget:-1,
			content:function(){
				target.damage(Math.ceil(Math.random()*2));
			},
			contentAfter:function(){
				if(!player.isTurnedOver()){
					player.turnOver();
				}
			},
			ai:{
				order:9,
				result:{
					target:-2
				},
				tag:{
					damage:2,
					multitarget:1,
					multineg:1,
				},
				useful:5,
				value:10,
			}
		},
		hsshenqi_morijingxiang:{
			type:'hsshenqi',
			fullimage:true,
			vanish:true,
			enable:function(card,player){
				return !player.isTurnedOver();
			},
			derivation:'hs_lafamu',
			filterTarget:function(card,player,target){
				return target!=player&&target.num('hej')>0;
			},
			selectTarget:-1,
			content:function(){
				if(target.num('hej')) player.gainPlayerCard(target,'hej',true,Math.ceil(Math.random()*2));
			},
			contentAfter:function(){
				if(!player.isTurnedOver()){
					player.turnOver();
				}
			},
			ai:{
				order:9.5,
				result:{
					player:1
				},
				tag:{
					multitarget:1,
					multineg:1,
				},
				useful:5,
				value:10,
			}
		},
		hsmengjing_feicuiyoulong:{
			type:'hsmengjing',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_ysera',
			filterTarget:true,
			content:function(){
				target.damage(2);
				player.loseHp();
			},
			ai:{
				order:5,
				result:{
					target:-2
				},
				tag:{
					damage:2
				},
				useful:5,
				value:10,
			}
		},
		hsmengjing_suxing:{
			type:'hsmengjing',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_ysera',
			filterTarget:function(card,player,target){
				return player!=target;
			},
			selectTarget:-1,
			content:function(){
				target.loseHp();
				var he=target.get('he');
				if(he.length){
					target.discard(he.randomGets(2));
				}
			},
			ai:{
				result:{
					target:-1,
				},
				order:6,
				useful:5,
				value:10,
			}
		},
		hsmengjing_mengye:{
			type:'hsmengjing',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_ysera',
			filterTarget:true,
			content:function(){
				target.draw();
				target.addSkill('hsmengjing_mengye');
			},
			ai:{
				order:1,
				useful:5,
				value:10,
				result:{
					target:function(player,target){
						if(target.hasSkill('hsmengjing_mengye')) return 0.5;
						return -target.num('he');
					}
				}
			}
		},
		hsmengjing_mengjing:{
			type:'hsmengjing',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_ysera',
			filterTarget:function(card,player,target){
				return !target.num('j','lebu')||target.num('e')>0;
			},
			content:function(){
				'step 0'
				var es=target.get('e');
				if(es.length){
					target.gain(es,'gain2');
				}
				'step 1'
				if(!target.num('j','lebu')){
					target.addJudge(game.createCard('lebu'));
				}
			},
			ai:{
				order:2,
				useful:5,
				value:10,
				result:{
					target:function(player,target){
						var num=target.hp-target.num('he')-2;
						if(num>-1) return -1;
						if(target.hp<3) num--;
						if(target.hp<2) num--;
						if(target.hp<1) num--;
						return num;
					}
				}
			}
		},
		hsmengjing_huanxiaojiemei:{
			type:'hsmengjing',
			fullimage:true,
			vanish:true,
			enable:true,
			derivation:'hs_ysera',
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp;
			},
			content:function(){
				target.recover(2);
			},
			ai:{
				order:6,
				value:10,
				useful:[7,4],
				result:{
					target:function(player,target){
						var eff=ai.get.recoverEffect(target,player,target);
						if(eff<=0) return 0;
						var num=target.maxHp-target.hp;
						if(num<1) return 0;
						if(target.hp==1) return num+0.5;
						return num;
					}
				}
			}
		},
		tuteng1:{
			noname:true,
			fullimage:true,
			type:'hstuteng',
			// derivation:'hs_sthrall'
		},
		tuteng2:{
			noname:true,
			fullimage:true,
			type:'hstuteng',
			// derivation:'hs_sthrall'
		},
		tuteng3:{
			noname:true,
			fullimage:true,
			type:'hstuteng',
			// derivation:'hs_sthrall'
		},
		tuteng4:{
			noname:true,
			fullimage:true,
			type:'hstuteng',
			// derivation:'hs_sthrall'
		},
		tuteng5:{
			noname:true,
			fullimage:true,
			type:'hstuteng',
			// derivation:'hs_sthrall'
		},
		tuteng6:{
			noname:true,
			fullimage:true,
			type:'hstuteng',
			// derivation:'hs_sthrall'
		},
		tuteng7:{
			noname:true,
			fullimage:true,
			type:'hstuteng',
			// derivation:'hs_sthrall'
		},
		tuteng8:{
			noname:true,
			fullimage:true,
			type:'hstuteng',
			// derivation:'hs_sthrall'
		},
	},
	translate:{
		hs_alleria:'奥蕾莉亚',
		hs_magni:'麦格尼',
		hs_medivh:'麦迪文',
		hs_jaina:'吉安娜',
		hs_lrexxar:'雷克萨',
		hs_wuther:'乌瑟尔',
		hs_jgarrosh:'加尔鲁什',
		hs_malfurion:'玛法里奥',
		hs_guldan:'古尔丹',
		hs_anduin:'安度因',
		hs_sthrall:'萨尔',
		hs_waleera:'瓦莉拉',
		hs_liadrin:'莉亚德琳',
		hs_morgl:'摩戈尔',

		hs_neptulon:'耐普图隆',
		hs_wvelen:'维纶',
		hs_antonidas:'安东尼达斯',
		hs_alakir:'奥拉基尔',
		hs_zhouzhuo:'周卓',
		hs_yngvar:'伊戈瓦尔',
		hs_bchillmaw:'冰喉',
		hs_malorne:'玛洛恩',
		hs_xsylvanas:'希尔瓦娜斯',
		hs_siwangzhiyi:'死亡之翼',
		hs_malygos:'玛里苟斯',
		hs_xuefashi:'血法师',
		hs_ysera:'伊瑟拉',
		hs_alextrasza:'阿莱克斯塔',
		hs_trueheart:'图哈特',
		hs_nozdormu:'诺兹多姆',
		hs_loatheb:'洛欧塞布',
		hs_jiaziruila:'加兹瑞拉',
		hs_sainaliusi:'塞纳留斯',
		hs_bolvar:'伯瓦尔',
		hs_lrhonin:'罗宁',
		hs_fuding:'弗丁',
		hs_aedwin:'艾德温',
		hs_lafamu:'拉法姆',
		hs_yelise:'伊莉斯',
		hs_lreno:'雷诺',
		hs_finley:'芬利',
		hs_brann:'布莱恩',
		hs_kcthun:'克苏恩',
		hs_anomalus:'阿诺玛鲁斯',
		hs_blingtron:'布林顿',
		hs_fandral:'范达尔',
		hs_hallazeal:'海纳泽尔',
		hs_nzoth:'恩佐斯',
		hs_walian:'瓦里安',
		hs_pengpeng:'砰砰博士',

		hs_ronghejuren:'熔核巨人',
		hs_shanlingjuren:'山岭巨人',
		hs_mijiaojisi:'秘教祭司',
		hs_huzhixiannv:'湖之仙女',
		hs_tgolem:'图腾魔像',
		hs_totemic:'图腾师',
		hs_bilanyoulong:'碧蓝幼龙',
		hs_zhishigushu:'知识古树',
		hs_zhanzhenggushu:'战争古树',
		hs_jinglinglong:'精灵龙',
		hs_sapphiron:'萨菲隆',
		hs_xuanzhuanjijia:'旋转机甲',
		hs_ruanniguai:'软泥怪',
		hs_kchromaggus:'克洛玛古斯',
		hs_hudunren:'护盾人',
		hs_nate:'纳特',
		hs_shifazhe:'嗜法者',
		hs_yogg:'尤格萨隆',
		hs_xialikeer:'夏克里尔',

		peiyu:'培育',
		peiyu_info:'出牌阶段，你可以弃置一张牌令一名没有图腾的角色获得一个随机图腾，或令一名有图腾的角色替换一个图腾；你死亡时，其他角色失去以此法获得的图腾',
		wzhanyi:'战意',
		wzhanyi_info:'你可以跳过出牌阶段，改为摸三张牌并展示之，将摸到的装备牌置于装备区，然后可以使用手牌中的杀',
		shengteng:'升腾',
		shengteng_info:'锁定技，每当你使用锦囊牌造成伤害，你增加一点体力上限并回复一点体力',
		yuansu:'元素',
		yuansu_info:'出牌阶段限一次，若你已损失的体力值不少于3，你可以将体力上限降至与体力值相同，视为使用一张元素毁灭',
		nuyan:'怒焰',
		nuyan2:'怒焰',
		nuyan_backup:'怒焰',
		nuyan_info:'出牌阶段限一次，你可以将一张红色牌当作任意一张能造成伤害的牌使用（不得是你本局以此法使用过的牌）',
		nuyan2_info:'出牌阶段限三次，你可以失去一点体力，视为使用任意一张能造成伤害的牌”',
		chouhuo:'仇火',
		chouhuo_info:'觉醒技，出牌阶段开始时，若你的怒焰技能已将可用的牌用完，你失去一点体力上限，获得两点护甲，然后将怒焰的描述改为“出牌阶段限三次，你可以失去一点体力，视为使用任意一张能造成伤害的牌”',
		hsdusu:'毒素',
		hsdusu_xueji:'血蓟',
		hsdusu_xueji_info:'随机弃至一名角色的1~2张装备牌',
		hsdusu_shinancao:'石楠草',
		hsdusu_shinancao_info:'令一名角色下一次造成的伤害+1',
		hsdusu_kuyecao:'枯叶草',
		hsdusu_kuyecao_info:'令一名角色获得技能潜行，直到其下一回合开始',
		hsdusu_huoyanhua:'火焰花',
		hsdusu_huoyanhua_info:'对攻击范围内的一名角色造成一点火焰伤害',
		hsdusu_huangxuecao:'皇血草',
		hsdusu_huangxuecao_info:'弃置一张牌并摸两张牌',
		duxin:'毒心',
		duxin_info:'回合开始和结束阶段，你可以获得一张随机毒素牌',
		hstuteng:'图腾',
		kuangluan:'狂乱',
		kuangluan2:'狂乱',
		kuangluan_info:'锁定技，每当一名其他角色对你造成伤害，该角色进入混乱状态直到当前回合结束；回合开始阶段，若上轮有至少两名不同角色因你而进入混乱状态，你回复全部体力并进入混乱状态进到本回合结束',
		zengli:'赠礼',
		zengli_info:'出牌阶段限一次，你指定一名其他角色与你各装备一把武器',
		xiubu:'修补',
		xiubu_info:'每当你装备一把未强化的武器，你可以获得数量等同于武器攻击范围的随机零件',
		mobao:'魔爆',
		mobao_info:'出牌阶段限一次，你可以弃置至多三张黑色牌，然后对所有于上轮对你造成过伤害的角色造成等同于你弃牌数的雷电伤害',
		xianji:'献祭',
		xianji2:'献祭',
		xianji3:'献祭',
		xianji_info:'其他角色可以在其回合结束阶段弃置1〜2张手牌并令你摸等量的牌，若如此做，直到其下一回合结束，每当你使用卡牌指定其为目标时，其摸一张牌',
		xueren:'血刃',
		xueren_info:'每当你使用杀造成伤害，你可以令受伤害角色与你各流失一点体力，然后你摸两张牌',
		maoxian:'冒险',
		maoxian2:'冒险',
		maoxian_info:'出牌阶段限两次，你可以从三个随机技能中选择一个作为你的技能',
		tanmi:'探秘',
		tanmi_info:'在一名其他角色的回合结束阶段，若你没有手牌，你可以摸两张牌并进行一个出牌阶段',
		yiwen:'轶闻',
		yiwen_info:'锁定技，每当其他角色于回合内首次使用卡牌指定你为惟一目标，你获得一张此牌的复制',
		tanbao_old:'探宝',
		tanbao_old_info:'出牌阶段限一次，你可以弃置三张牌，然后展示牌堆顶的三张牌，然后获得其中任意张类别不同的牌；若三张牌类别均不相同，你回复全部体力值',
		qianghuax:'强化',
		qianghuax_info:'出牌阶段限一次，你可以弃置任意张不同类别的牌，然后展示并获得与弃置的牌类别相同且价值更高的牌',
		zhuizong:'追踪',
		zhuizong_info:'出牌阶段限一次，你可以弃置任意张牌，观看牌堆顶的等同于弃牌数四倍的牌，然后获得其中的一张牌',
		xunbao:'寻宝',
		xunbao2:'寻宝',
		xunbao_info:'回合开始阶段，若你的武将牌上没有藏宝图，你可以将一张藏宝图置于你的武将牌上；若你的武将牌上有藏宝图，你可以弃置一张与藏宝图点数相同的牌并获得此藏宝图',
		xieneng:'邪能',
		xieneng_info:'回合结束阶段，你可以选择一张神器牌并获得之',
		fbeifa:'北伐',
		fbeifa_info:'每当你失去最后一张手牌，你可以视为使用一张无视距离的杀，若此杀造成伤害，你摸一张牌，每回合最多发动3次',
		yufa:'驭法',
		yufa_info:'在任意一名其他角色的回合结束阶段，若你于此回合内受过其伤害，你可以将一张传送门交给除此角色外的任意一名角色',
		bingyan:'冰焰',
		bingyan_info:'出牌阶段限一次，你可以将一张红色牌当作炽羽袭，或将一张黑色牌当作惊雷闪使用',
		hsshenqi:'神器',
		hsshenqi_morijingxiang:'末日镜像',
		hsshenqi_morijingxiang_info:'限武将牌正面朝上时使用，从所有其他角色的区域内各获得1~2张牌；使用后将武将牌翻至背面',
		hsshenqi_kongbusangzhong:'恐怖丧钟',
		hsshenqi_kongbusangzhong_info:'限武将牌正面朝上时使用，对所有其他角色各造成1~2点伤害；使用后将武将牌翻至背面',
		hsshenqi_nengliangzhiguang:'能量之光',
		hsshenqi_nengliangzhiguang_info:'限武将牌正面朝上时使用，令一名角色增加一点体力上限，回复一点体力，并摸四张牌；使用后将武将牌翻至背面',
		hsbaowu:'宝物',
		hsbaowu_huangjinyuanhou:'黄金猿猴',
		hsbaowu_huangjinyuanhou_info:'回复一点体力并弃置所有手牌，然后获得等量的无中生有；直到下个回合开始，不能成为其他角色的卡牌目标',
		hsbaowu_cangbaotu:'藏宝图',
		hsbaowu_cangbaotu_info:'回合结束阶段，将一张黄金猿猴置入你的手牌；摸一张牌',

		shifa:'嗜法',
		shifa_info:'锁定技，出牌阶段开始时，你令场上所有角色各获得一张随机锦囊牌',
		yuanzheng:'远征',
		yuanzheng_info:'每当你对攻击范围外的一名角色使用一张牌，你可以选择一项：摸一张牌，或视为对目标使用一张杀',
		byuhuo:'浴火',
		byuhuo2:'浴火',
		byuhuo_info:'觉醒技，当你进入濒死状态时，你须将体力和体力上限变为2，并将武将牌翻至背面；在你的下一回合开始时，你对所有其他角色造成两点火焰伤害，在此之前，你不能成为其他角色的卡牌的目标',
		yulu:'雨露',
		yulu_info:'出牌阶段限一次，你可以指定至多3名角色各摸两张牌，然后各弃置两张牌',
		fengyin:'封印',
		fengyin2:'封印',
		fengyin_info:'回合结束阶段，若你于本回合内未使用过锦囊牌，你可以指定一名其他角色令其下个回合无法使用锦囊牌',
		hannu:'寒怒',
		hannu_info:'锁定技，每当你受到一次伤害，你将手牌数翻倍；若你的手牌数因此超过10张，你随机弃置若干张手牌直到手牌数等于你当前的体力值',
		chuidiao:'垂钓',
		chuidiao_info:'锁定技，回合结束阶段，你随机摸0~2张牌',
		fushi:'缚誓',
		fushi_info:'出牌阶段，你可以令一名已受伤角色失去一点体力上限并回复一点体力',
		hhudun:'护盾',
		hhudun_info:'锁定技，回合开始阶段，若你的护甲值小于3，你获得一点护甲',
		fenlie:'分裂',
		fenlie_info:'锁定技，每当你于摸牌阶段外获得卡牌，你获得一张此牌的复制，每回合最多发动两次',
		nianfu:'粘附',
		nianfu_info:'出牌阶段限一次，你可以指定一名其他角色，随机弃置其1~2张装备牌',
		shixu:'时序',
		shixu_info:'锁定技，所有角色于出牌阶段每消耗3秒，便须于回合结束阶段弃置一张牌',
		qianghua:'绝手',
		qianghua_info:'在你的回合内，你可以令一张你使用的基本牌或非延时锦囊牌额外结算一次，每回合限一次',
		jixuan:'疾旋',
		jixuan_info:'锁定技，回合结束后，你进行一个额外的回合',
		biri:'蔽日',
		biri_info:'每当距离你1以内的一名其他角色成为杀的惟一目标时，若杀的使用者不是你，你可以弃置一张闪取消之',
		stuxi:'吐息',
		stuxi_info:'锁定技，回合结束阶段，你令所有未翻面角色各弃置一张牌',
		bingdong:'冰冻',
		bingdong_info:'出牌阶段限一次，若你的武将牌正面朝上，你可以选择一名未翻面的角色与其同时将武将牌翻至背面',
		ronghuo:'熔火',
		ronghuo_info:'锁定技，你的普通杀均视为火杀',
		luoshi:'落石',
		luoshi_info:'锁定技，每当你受到一次伤害，你与伤害来源各随机弃置一张牌',
		mianyi:'免疫',
		mianyi_info:'锁定技，你不能成为其他角色的非延时锦囊的目标',
		jiaohui:'教诲',
		jiaohui_info:'回合结束阶段，若你没有于本回合内造成伤害，你可以令一名角色摸两张牌或回复一点体力',
		chenshui:'沉睡',
		chenshui_info:'回合结束阶段，你可以将一张随机梦境牌加入你的手牌',
		hsmengjing:'梦境',
		hsmengjing_card_config:'梦境',
		hsmengjing_feicuiyoulong:'翡翠幼龙',
		hsmengjing_feicuiyoulong_info:'出牌阶段对任意一名角色使用，对目标造成2点伤害，然后流失一点体力',
		hsmengjing_huanxiaojiemei:'欢笑姐妹',
		hsmengjing_huanxiaojiemei_info:'出牌阶段对一名已受伤角色使用，令目标恢复两点体力',
		hsmengjing_suxing:'苏醒',
		hsmengjing_suxing_info:'令所有其他角色流失一点体力并随机弃置两张牌',
		hsmengjing_mengye:'梦魇',
		hsmengjing_mengye_info:'令一名角色摸1张牌，并在其下一个回合结束阶段弃置其所有牌',
		hsmengjing_mengjing:'梦境',
		hsmengjing_mengjing_info:'令一名角色将装备区内的所有牌收入手牌，并将一张乐不思蜀置于其判定区',
		xjumo:'聚魔',
		xjumo_info:'锁定技，你的手牌上限+3；若你已受伤，改为+5',
		liehun:'裂魂',
		liehun_info:'锁定技，回合结束阶段，你获得手牌中所有非基本牌的复制',
		malymowang:'魔网',
		malymowang2:'魔网',
		malymowang_info:'锁定技，你的锦囊牌造成的伤害+1；出牌阶段开始时，你观看随机3张锦囊牌，并将其中一张加入你的手牌',
		lingzhou:'灵咒',
		lingzhou_info:'每当你使用一张锦囊牌，可令一名角色摸一张牌或回复一点体力',
		mieshi:'灭世',
		mieshi_info:'锁定技，回合结束阶段，你流失一点体力，并对一名随机的其他角色造成一点火焰伤害',
		xshixin:'蚀心',
		xshixin_info:'锁定技，每当你对一名其他角色造成一次伤害，受伤害角色与你各流失一点体力',
		xmojian:'魔箭',
		xmojian_info:'每当你的武将牌翻至正面时，你可以指定一名角色视为对其使用了一张杀',
		enze:'恩泽',
		enze_info:'出牌阶段限一次，你可以指定一名角色令其手牌数与你相等（至多摸三张牌）',
		chongsheng:'重生',
		chongsheng_bg:'生',
		chongsheng_info:'濒死阶段，你可弃置所有牌，将体力回复至2-X，并摸X张牌，X为你本局发动此技能的次数。每局最多发动2次',
		s_tuteng:'神谕',
		s_tuteng_info:'在你首个回合开始时，你获得三个随机图腾；在此后的每个回合开始阶段，你随机替换其中的一个图腾',
		guozai:'过载',
		guozai2:'过载',
		guozai2_bg:'载',
		guozai_info:'出牌阶段限一次，你可将手牌补至四张，并于此阶段结束时弃置等量的牌',
		guozaix:'重载',
		guozaix2:'重载',
		guozaix2_bg:'载',
		guozaix_info:'出牌阶段限两次，你可将手牌补至四张，并于此阶段结束时弃置等量的牌',
		hanshuang:'寒霜',
		hanshuang_info:'锁定技，你使用黑色牌造成伤害后，受伤害角色须将武将牌翻至背面，然后你流失一点体力',
		bingshi:'冰噬',
		bingshi_info:'锁定技，你死亡时，对所有其他角色造成一点伤害',
		huanwu:'唤雾',
		huanwu_info:'出牌阶段限一次，你可以令一名角色增加一点体力上限，回复一点体力，并摸两张牌（每名角色限发动一次）',
		fengnu:'风怒',
		fengnu_info:'锁定技，你使用的任何卡牌无数量及距离限制；当你于回合内重复使用同名卡牌时，你摸一张牌',
		shengdun:'圣盾',
		shengdun2:'圣盾',
		shengdun_info:'锁定技，回合开始阶段，若你没有护甲，你获得一点护甲',
		jingmeng:'镜梦',
		jingmeng_info:'每当你于回合内使用第一张牌时，你可以从牌堆中随机获得一张与之类型相同的牌',
		kuixin:'窥心',
		kuixin_info:'回合结束阶段，你可以将你的手牌与一名其他角色交换（手牌数之差不能多于1）',
		lianzhan:'连斩',
		lianzhan_info:'出牌阶段结束时，你可以摸X张牌，X为你本回合使用的卡牌数',
		yanshu:'炎术',
		yanshu_info:'出牌阶段限一次，你可以弃置一张非基本牌，并获得一张流星火雨',
		bingshuang:'冰霜',
		bingshuang_info:'你使用锦囊牌造成伤害后，可令目标摸两张牌并翻面',
		shengyan:'圣言',
		shengyan_info:'任意一名角色回复体力后，你可以令其额外回复一点体力，每回合限发动一次',
		qingliu:'清流',
		qingliu_info:'锁定技，你防止即将受到的火焰伤害',
		liechao:'猎潮',
		liechao_info:'出牌阶阶段限一次，若你的武将牌正面朝上且手牌数不大于当前体力值，你可以翻面并摸四张牌，若如此做，你跳过本回合的弃牌阶段',

		fengxing:'风行',
		fengxing_info:'每当你使用一张杀，你可以摸一张牌',
		xinci:'心刺',
		xinci_info:'出牌阶段限一次，你可以弃置一张黑色牌令一名角色流失一点体力',
		zhongjia:'战甲',
		zhongjia_info:'锁定技，每当你受到一次伤害，你获得一点护甲；当你的体力值大于1时，你的护甲不为你抵挡伤害',
		dunji:'盾击',
		dunji_info:'出牌阶段，你可以失去你的所有护甲，并对等量的其他角色各造成一点伤害',
		qiaodong:'巧动',
		qiaodong_info:'你可以将一张装备牌当作闪使用或打出',
		fengxian:'奉献',
		fengxian_info:'出牌阶段限一次，你可以令场上所有角色各弃置一张手牌',
		zhanhou:'战吼',
		zhanhou_info:'出牌阶段限一次，你可以弃置一张防具牌并获得一点护甲值',
		anying:'暗影',
		anying_info:'限定技，出牌阶段，你可以弃置两张黑色牌，失去技能圣光，并获得技能心刺',
		shijie:'视界',
		shijie_info:'回合结束阶段，你可以获得一名其他角色的一张手牌，然后该角色摸一张牌',
		shengguang:'圣光',
		shengguang_info:'出牌阶段限一次，你可以弃置一张红色牌令一名角色回复一点体力',
		bingjia:'冰甲',
		bingjia2:'冰甲',
		bingjia_info:'出牌阶段，若你武将牌上没有牌，你可以将一张手牌背面朝上置于你的武将牌上，当你成为其他角色的与此牌花色相同的牌的目标时，你将此牌置于弃牌堆，并获得一点护甲值',
		bianxing:'变形',
		bianxing_info:'当一其他角色于回合内使用卡牌指定了惟一的其他目标后，你可以用一张合理的基本牌替代此牌，每名角色的回合限一次',
		xianzhi:'先知',
		xianzhi_info:'任意一名角色进行判定前，你可以观看牌堆顶的两张牌，并可以将其调换顺序',
		mdzhoufu:'缚魂',
		mdzhoufu2:'缚魂',
		mdzhoufu_info:'出牌阶段，你可以将一张黑色手牌置于一名其他角色的武将牌上，在其判定时以此牌作为判定结果，然后你获得亮出的判定牌',
		moying:'诅咒',
		moying_info:'锁定技，回合开始阶段，若场上没有闪电且你手牌中有黑桃牌，你将牌堆中的一张闪电置于你的判定区，否则你摸一张牌',
		moying_old_info:'每当你造成或受到一次伤害，你可以令伤害目标或来源进行一次判定，若结果为黑色，其流失一点体力',
		jingxiang:'镜像',
		jingxiang_info:'每当你需要打出卡牌时，你可以观看一名随机角色的手牌并将其视为你的手牌打出',
		tuteng:'图腾',
		tuteng_info:'出牌阶段，你可以获得一个随机图腾；每当你受到一次伤害，你随机失去一个图腾',
		zuling:'祖灵',
		zuling_info:'觉醒技，回合开始阶段，若你拥有至少2个图腾，你失去一点体力上限，并将图腾描述中的“获得一个随机图腾”改为“获得任意一个图腾”',
		tuteng1:'治疗图腾',
		tuteng1_info:'回合结束阶段，你回复一点体力',
		tuteng2:'灼热图腾',
		tuteng2_info:'每当你造成一点伤害，你摸一张牌',
		tuteng3:'石爪图腾',
		tuteng3_info:'你受到的伤害-1',
		tuteng4:'空气之怒图腾',
		tuteng4_info:'你的锦囊牌造成的伤害+1',
		tuteng5:'法力之潮图腾',
		tuteng5_info:'回合结束阶段，你摸一张牌',
		tuteng6:'火舌图腾',
		tuteng6_info:'你的杀造成的伤害+1',
		tuteng7:'活力图腾',
		tuteng7_info:'回合结束阶段，你令一名其他角色回复一点体力',
		tuteng8:'图腾魔像',
		tuteng8_info:'当计算你与其它角色的距离时，始终-1',
		tzhenji:'震击',
		tzhenji_info:'每当你因弃置而失去黑色牌，可对一名角色造成1点雷电伤害，并随机弃置其一张牌，每回合限发动一次',
		fenliu:'分流',
		fenliu_info:'出牌阶段限一次，你可以失去一点体力并获得3张牌',
		hongxi:'虹吸',
		hongxi_info:'锁定技，每当有一名角色死亡，你将体力回复至体力上限',
		jihuo:'激活',
		jihuo_info:'在你的回合结束后，你可以弃置一张手牌并进行一个额外的回合',
		jianren:'剑刃',
		jianren_info:'出牌阶段限一次，你可以弃置装备区内的武器牌，对所有其他角色造成一点伤害',
		mengun:'闷棍',
		mengun2:'闷棍',
		mengun_info:'每当一名其他角色于回合内使用基本牌，你可以弃置一张与之花色相同的牌令其收回此牌，且在本回合内不能再次使用，每回合限一次',
		wlianji:'连击',
		wlianji_info:'回合结束阶段，若你本回合使用的卡牌数大于你当前的体力值，你可以摸两张牌',
	},
}
