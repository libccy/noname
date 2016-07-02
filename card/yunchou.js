card.yunchou={
	card:{
		lingjiandai:{
			fullskin:true,
			enable:true,
			type:'basic',
			range:{global:1},
			filterTarget:true,
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
						if(target.hasSkill('mujiaren_skill')) return 2;
						return 1;
					}
				}
			}
		},
		jiguanshu:{
			fullskin:true,
			enable:true,
			type:'basic',
			range:{global:1},
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
				for(var i=0;i<es.length;i++){
					if(lib.inpile.contains(es[i].name)){
						var card=game.createCard(list.randomGet());
						cards.push(card);
						var name=lib.skill._lingjianduanzao.process([card,es[i]]);
						es[i].init([es[i].suit,es[i].number,name,es[i].nature]);
					}
				}
				player.$gain2(cards);
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
		mujiaren:{
			fullskin:true,
			enable:true,
			type:'basic',
			range:{global:1},
			filterTarget:function(card,player,target){
				return !target.hasSkill('mujiaren_skill');
			},
			content:function(){
				target.addSkill('mujiaren_skill');
			},
			ai:{
				order:10.1,
				result:{
					target:1
				}
			}
		},
		suolianjia:{
			fullskin:true,
			type:"equip",
			subtype:"equip2",
			skills:['suolianjia'],
			onEquip:function(){
				if(player.isLinked()==false) player.link();
			},
			onLose:function(){
				if(player.isLinked()) player.link();
			},
			ai:{
				basic:{
					equipValue:5
				},
			},
		},
		chenhuodajie:{
			fullskin:true,
			type:'trick',
			content:function(){
				if(target.num('he')){
					player.gainPlayerCard('he',target,true);
				}
			},
			ai:{
				order:1,
				useful:6,
				value:6,
				result:{
					target:-1
				},
				tag:{
					loseCard:1
				}
			}
		},
		shushangkaihua:{
			fullskin:true,
			type:'trick',
			enable:true,
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			filterTarget:function(card,player,target){
				var num=target.num('h');
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].num('h')<num) return false;
				}
				return true;
			},
			content:function(){
				var num=[];
				for(var i=0;i<targets.length;i++){
					if(targets[i]==player){
						num.push(2);
					}
					else{
						num.push(1);
					}
				}
				if(!targets.contains(player)){
					targets.add(player);
				}
				game.asyncDraw(targets,num);
			},
			ai:{
				order:1,
				value:5,
				result:{
					target:1,
					player:0.1,
				}
			}
		},
		yihuajiemu:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				if(target.isMin()) return false;
				if(ui.selected.targets.length){
					return target.get('e',{subtype:'equip5'}).length==0;
				}
				else{
					return target.get('e',{subtype:'equip5'}).length>0;
				}
			},
			selectTarget:2,
			multitarget:true,
			content:function(){
				if(targets[0].get('e','5')){
					targets[0].$give(targets[0].get('e','5'),targets[1]);
					targets[1].equip(targets[0].get('e','5'));
					game.delay();
				}
			},
			ai:{
				order:1,
				result:{
					target:function(player,target){
						if(target.get('e',{subtype:'equip5'}).length){
							if(ai.get.attitude(target,player)>0){
								return -0.5;
							}
							return -1;
						}
						return 1;
					}
				},
				tag:{
					loseCard:1
				}
			}
		},
		fudichouxin:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				return player!=target&&target.get('h').length;
			},
			content:function(){
				"step 0"
				player.chooseToCompare(target).clear=false;
				"step 1"
				if(result.bool){
					player.gain([result.player,result.target]);
					result.player.clone.moveDelete(player);
					result.target.clone.moveDelete(player);
					game.addVideo('gain2',player,get.cardsInfo([result.player,result.target]));
				}
				else if(!result.cancelled){
					result.player.clone.delete();
					result.target.clone.delete();
					game.addVideo('deletenode',player,get.cardsInfo([result.player,result.target]));
				}
			},
			ai:{
				order:4,
				result:{
					target:function(player){
						if(player.get('h').length<=1) return 0;
						return -1;
					},
					player:function(player){
						if(player.get('h').length<=1) return 0;
						return 0.5;
					}
				},
				tag:{
					loseCard:1
				}
			}
		},
		shuiyanqijun:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				return target.num('e');
			},
			selectTarget:-1,
			content:function(){
				if(target.num('e')) target.chooseToDiscard('e',true);
			},
			ai:{
				order:9,
				result:{
					target:function(player,target){
						if(target.num('e')) return -1;
						return 0;
					}
				},
				tag:{
					multitarget:1,
					multineg:1
				}
			}
		},
		toulianghuanzhu:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				return target.num('h')>0;
			},
			selectTarget:2,
			multitarget:true,
			targetprompt:['被拿牌','得牌'],
			content:function(){
				"step 0"
				targets[0].addTempSkill('toulianghuanzhu2','phaseAfter');
				var hs=targets[0].get('h');
				event.num=Math.min(2,hs.length);
				if(event.num){
					targets[1].gain(hs.randomGets(event.num));
					targets[0].$give(event.num,targets[1]);
					game.delay();
				}
				else{
					event.finish();
				}
				"step 1"
				if(targets[1].num('h')){
					if(_status.auto&&targets[1]==game.me){
						game.delay();
					}
					targets[1].chooseCard(true,event.num,'选择'+get.cnNumber(event.num)+'张手牌还给'+get.translation(targets[0])).ai=ai.get.disvalue;
				}
				else{
					event.finish();
				}
				"step 2"
				targets[0].gain(result.cards);
				targets[1].$give(event.num,targets[0]);
			},
			ai:{
				order:6.5,
				tag:{
					loseCard:1,
					multitarget:1,
					multineg:1
				},
				result:{
					target:function(player,target){
						if(ui.selected.targets.length){
							if(target==player&&target.num('h')<=1) return 0;
							return 0.5;
						}
						if(target.skills.contains('toulianghuanzhu2')) return 0;
						return -0.5;
					}
				},
				wuxie:function(){
					return 0;
				},
				useful:3,
				value:4
			}
		},
		hufu:{
			fullskin:true,
			type:'basic',
			ai:{
				value:[7.5,5,2],
				useful:[7.5,5,2],
			}
		},
		huoshan:{
			fullskin:true,
			type:'delay',
			enable:function(card,player){
				return (lib.filter.judge(card,player,player));
			},
			filterTarget:function(card,player,target){
				return (lib.filter.judge(card,player,target)&&player==target);
			},
			selectTarget:[-1,-1],
			judge:function(card){
				if(get.suit(card)=='heart'&&get.number(card)>1&&get.number(card)<10) return -6;
				return 0;
			},
			effect:function(){
				if(result.judge){
					player.damage(2,'fire','nosource');
					var players=get.players();
					for(var i=0;i<game.players.length;i++){
						if(get.distance(player,game.players[i])<=1&&player!=game.players[i]){
							game.players[i].damage(1,'fire','nosource');
						}
					}
				}
				else{
					if(!card.expired){
						var target=player.next;
						for(var iwhile=0;iwhile<10;iwhile++){
							if(target.num('j','huoshan')){
								target=target.next;
							}
							else{
								break;
							}
						}
						if(target.num('j','huoshan')||target==player){
							ui.discardPile.appendChild(card);
						}
						else{
							if(card.name!='huoshan'){
								target.addJudge('huoshan',card);
							}
							else{
								target.addJudge(card);
							}
						}
					}
					else{
						card.expired=false;
					}
				}
			},
			cancel:function(){
				if(!card.expired){
					var target=player.next;
					for(var iwhile=0;iwhile<10;iwhile++){
						if(target.num('j','huoshan')){
							target=target.next;
						}
						else{
							break;
						}
					}
					if(target.num('j','huoshan')||target==player){
						ui.discardPile.appendChild(card);
					}
					else{
						if(card.name!='huoshan'){
							target.addJudge('huoshan',card);
						}
						else{
							target.addJudge(card);
						}
					}
				}
				else{
					card.expired=false;
				}
			},
			ai:{
				basic:{
					useful:0,
					value:0,
				},
				order:1,
				result:{
					target:function(player,target){
						var rejudge,num=0;
						for(var i=0;i<game.players.length;i++){
							for(var j=0;j<game.players[i].skills.length;j++){
								rejudge=get.tag(game.players[i].skills[j],'rejudge',game.players[i]);
								if(rejudge!=undefined){
									if(ai.get.attitude(target,game.players[i])>0&&
										ai.get.attitude(game.players[i],target)>0) num+=rejudge;
									else num-=rejudge;
								}
							}
						}
						if(num>0) return num;
						if(num==0){
							if(lib.config.mode=='identity'){
								if(target.identity=='nei') return 1;
								var situ=ai.get.situation();
								if(target.identity=='fan'){
									if(situ>1) return 1;
								}
								else{
									if(situ<-1) return 1;
								}
							}
							else if(lib.config.mode=='guozhan'){
								if(target.identity=='ye') return 1;
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].identity=='unknown') return -1;
								}
								if(get.population(target.identity)==1){
									if(target.maxHp>2&&target.hp<2) return 1;
									if(game.players.length<3) return -1;
									if(target.hp<=2&&target.num('he')<=3) return 1;
								}
							}
						}
						return -1;
					}
				},
				tag:{
					// damage:1,
					// natureDamage:1,
					// fireDamage:1,
				}
			}
		},
		hongshui:{
			type:'delay',
			enable:function(card,player){
				return (lib.filter.judge(card,player,player));
			},
			filterTarget:function(card,player,target){
				return (lib.filter.judge(card,player,target)&&player==target);
			},
			selectTarget:[-1,-1],
			judge:function(card){
				if(get.suit(card)=='club'&&get.number(card)>1&&get.number(card)<10) return -3;
				return 0;
			},
			fullskin:true,
			effect:function(){
				if(result.judge){
					if(player.num('he')==0) player.loseHp();
					else{
						player.discard(player.get('he').randomGets(3));
					}
					var players=get.players();
					for(var i=0;i<players.length;i++){
						var dist=get.distance(player,players[i]);
						if(dist<=2&&player!=players[i]){
							var cs=players[i].get('he');
							if(cs.length==0) players[i].loseHp();
							else{
								players[i].discard(cs.randomGets(3-Math.max(1,dist)));
							}
						}
					}
				}
				else{
					if(!card.expired){
						var target=player.next;
						for(var iwhile=0;iwhile<10;iwhile++){
							if(target.num('j','hongshui')){
								target=target.next;
							}
							else{
								break;
							}
						}
						if(target.num('j','hongshui')||target==player){
							ui.discardPile.appendChild(card);
						}
						else{
							if(card.name!='hongshui'){
								target.addJudge('hongshui',card);
							}
							else{
								target.addJudge(card);
							}
						}
					}
					else{
						card.expired=false;
					}
				}
			},
			cancel:function(){
				if(!card.expired){
					var target=player.next;
					for(var iwhile=0;iwhile<10;iwhile++){
						if(target.num('j','hongshui')){
							target=target.next;
						}
						else{
							break;
						}
					}
					if(target.num('j','hongshui')||target==player){
						ui.discardPile.appendChild(card);
					}
					else{
						if(card.name!='hongshui'){
							target.addJudge('hongshui',card);
						}
						else{
							target.addJudge(card);
						}
					}
				}
				else{
					card.expired=false;
				}
			},
			ai:{
				basic:{
					useful:0,
					value:0,
				},
				order:1,
				result:{
					target:function(player,target){
						var rejudge,num=0;
						for(var i=0;i<game.players.length;i++){
							for(var j=0;j<game.players[i].skills.length;j++){
								rejudge=get.tag(game.players[i].skills[j],'rejudge',game.players[i]);
								if(rejudge!=undefined){
									if(ai.get.attitude(target,game.players[i])>0&&
										ai.get.attitude(game.players[i],target)>0) num+=rejudge;
									else num-=rejudge;
								}
							}
						}
						if(num>0) return num;
						if(num==0){
							if(lib.config.mode=='identity'){
								if(target.identity=='nei') return 1;
								var situ=ai.get.situation();
								if(target.identity=='fan'){
									if(situ>0) return 1;
								}
								else{
									if(situ<0) return 1;
								}
							}
							else if(lib.config.mode=='guozhan'){
								if(game.players.length<=2) return -1;
								if(target.identity=='ye') return 1;
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].identity=='unknown') return -1;
								}
								if(get.population(target.identity)==1){
									return 1;
								}
							}
						}
						return -1;
					}
				},
			}
		},
		liuxinghuoyu:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:true,
			content:function(){
				"step 0"
				if(target.num('he')<2){
					event.directfalse=true;
				}
				else{
					target.chooseToDiscard('he',2).ai=function(card){
						if(target.hasSkillTag('nofire')) return 0;
						if(ai.get.damageEffect(target,player,target,'fire')>=0&&
							!target.hasSkillTag('maixie')) return 0;
						if(player.get('s').contains('xinwuyan')) return 0;
						if(target.get('s').contains('xinwuyan')) return 0;
						if(card.name=='tao') return 0;
						if(target.hp==1&&card.name=='jiu') return 0;
						if(target.hp==1&&get.type(card)!='basic'){
							return 10-ai.get.value(card);
						}
						return 8-ai.get.value(card);
					};
				}
				"step 1"
				if(event.directfalse||!result.bool){
					target.damage('fire');
				}
			},
			ai:{
				basic:{
					order:4,
					value:7,
					useful:2,
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nofire')) return 0;
						if(ai.get.damageEffect(target,player,player)<0&&ai.get.attitude(player,target)>0){
							return -2;
						}
						var nh=target.num('he');
						if(target==player) nh--;
						switch(nh){
							case 0:case 1:return -2;
							case 2:return -1.5;
							case 3:return -1;
							default:return -0.7;
						}
					}
				},
				tag:{
					damage:1,
					fireDamage:1,
					natureDamage:1,
					discard:1,
					loseCard:1,
					position:'he',
				}
			}
		},
		dujian:{
			fullskin:true,
			type:'basic',
			enable:true,
			filterTarget:function(card,player,target){
				return target.num('h')>0;
			},
			content:function(){
				"step 0"
				if(target.num('h')==0||player.num('h')==0){
					event.finish();
					return;
				}
				player.chooseCard(true);
				"step 1"
				event.card1=result.cards[0];
				var rand=Math.random()<0.5;
				target.chooseCard(true).ai=function(card){
					if(rand) return Math.random();
					return ai.get.value(card);
				};
				"step 2"
				event.card2=result.cards[0];
				ui.arena.classList.add('thrownhighlight');
				game.addVideo('thrownhighlight1');
				player.$compare(event.card1,target,event.card2);
				game.delay(4);
				"step 3"
				game.log(player,'展示了',event.card1);
				game.log(target,'展示了',event.card2);
				if(get.color(event.card2)==get.color(event.card1)){
					player.discard(event.card1).animate=false;
					target.$gain2(event.card2);
					var clone=event.card1.clone;
					if(clone){
						clone.style.transition='all 0.5s';
						clone.style.transform='scale(1.2)';
						clone.delete();
						game.addVideo('deletenode',player,get.cardsInfo([clone]));
					}
					target.loseHp();
				}
				else{
					player.$gain2(event.card1);
					target.$gain2(event.card2);
					target.addTempSkill('dujian2','phaseBegin');
				}
				ui.arena.classList.remove('thrownhighlight');
				game.addVideo('thrownhighlight2');
			},
			ai:{
				basic:{
					order:2,
					value:3,
					useful:1,
				},
				result:{
					player:function(player,target){
						if(player.num('h')<=Math.min(5,Math.max(2,player.hp))&&_status.event.name=='chooseToUse'){
							if(typeof _status.event.filterCard=='function'&&
								_status.event.filterCard({name:'dujian'})){
								return -10;
							}
							if(_status.event.skill){
								var viewAs=get.info(_status.event.skill).viewAs;
								if(viewAs=='dujian') return -10;
								if(viewAs&&viewAs.name=='dujian') return -10;
							}
						}
						return 0;
					},
					target:function(player,target){
						if(target.skills.contains('dujian2')||target.num('h')==0) return 0;
						if(player.num('h')<=1) return 0;
						return -1.5;
					}
				},
				tag:{
					loseHp:1
				}
			}
		},
		qiankundai:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			onLose:function(){
				player.draw();
			},
			skills:['qiankundai'],
			ai:{
				order:9.5,
				basic:{
					equipValue:function(card,player){
						if(player.num('h','qiankundai')) return 6;
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
	},
	skill:{
		hslingjian_xuanfengzhiren_equip1:{},
		hslingjian_xuanfengzhiren_equip2:{},
		hslingjian_xuanfengzhiren_equip3:{},
		hslingjian_xuanfengzhiren_equip4:{},
		hslingjian_xuanfengzhiren_equip5:{},
		hslingjian_zhongxinghujia_equip1:{},
		hslingjian_zhongxinghujia_equip2:{},
		hslingjian_zhongxinghujia_equip3:{},
		hslingjian_zhongxinghujia_equip4:{},
		hslingjian_zhongxinghujia_equip5:{},
		hslingjian_jinjilengdong_equip1:{},
		hslingjian_jinjilengdong_equip2:{},
		hslingjian_jinjilengdong_equip3:{},
		hslingjian_jinjilengdong_equip4:{},
		hslingjian_jinjilengdong_equip5:{},
		hslingjian_yinmilichang_equip1:{},
		hslingjian_yinmilichang_equip2:{},
		hslingjian_yinmilichang_equip3:{},
		hslingjian_yinmilichang_equip4:{},
		hslingjian_yinmilichang_equip5:{},
		hslingjian_xingtigaizao_equip1:{},
		hslingjian_xingtigaizao_equip2:{},
		hslingjian_xingtigaizao_equip3:{},
		hslingjian_xingtigaizao_equip4:{},
		hslingjian_xingtigaizao_equip5:{},
		hslingjian_shengxiuhaojiao_equip1:{},
		hslingjian_shengxiuhaojiao_equip2:{},
		hslingjian_shengxiuhaojiao_equip3:{},
		hslingjian_shengxiuhaojiao_equip4:{},
		hslingjian_shengxiuhaojiao_equip5:{},
		hslingjian_shijianhuisu_equip1:{},
		hslingjian_shijianhuisu_equip2:{},
		hslingjian_shijianhuisu_equip3:{},
		hslingjian_shijianhuisu_equip4:{},
		hslingjian_shijianhuisu_equip5:{},
		mujiaren_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				return player.num('h',{type:'hslingjian'})>=2;
			},
			filterCard:{type:'hslingjian'},
			selectCard:2,
			content:function(){
				player.gain(game.createCard('jiguanshu'));
			},
			ai:{
				order:7,
				result:{
					player:function(player){
						for(var i=0;i<game.players.length;i++){
							if(player.canUse('jiguanshu',game.players[i])&&
							ai.get.effect(game.players[i],{name:'jiguanshu'},player,player>0)){
								return 1;
							}
							return 0;
						}
					}
				}
			}
		},
		_lingjianduanzao:{
			enable:'phaseUse',
			prompt:function(event){
				var lingjians=[],types=[];
				var hs=event.player.get('h');
				for(var i=0;i<hs.length;i++){
					switch(get.type(hs[i])){
						case 'equip':types.add(get.subtype(hs[i]));break;
						case 'hslingjian':lingjians.add(hs[i].name);break;
					}
				}
				var str='';
				for(var i=0;i<lingjians.length;i++){
					for(var j=0;j<types.length;j++){
						if(j==0){
							str+='<p class="shadowed" style="text-align:left;padding:5px;border-radius:4px;margin-top:0px;margin-bottom:12px;">';
						}
						else{
							str+='<p class="shadowed" style="text-align:left;padding:5px;border-radius:4px;margin-top:12px;margin-bottom:12px;">';
						}
						str+=''+lib.translate[lingjians[i]]+'+'+lib.translate[types[j]]+
						'：'+lib.translate[lingjians[i]+'_'+types[j]+'_info']+'</p>';
					}
				}
				return str;
			},
			check:function(card){
				return 1+ai.get.value(card);
			},
			filterCard:function(card){
				var type=get.type(card);
				if(!ui.selected.cards.length){
					return type=='equip'&&lib.inpile.contains(card.name);
				}
				return type=='hslingjian';
			},
			process:function(cards){
				if(cards.length==3){
					cards.sort(function(a,b){
						if(a.name<b.name) return 1;
						return -1;
					});
				}
				var equip;
				for(var i=0;i<cards.length;i++){
					if(get.type(cards[i])=='equip'){
						equip=cards[i];
						cards.splice(i--,1);
						break;
					}
				}
				var name=equip.name;
				var equipname=equip.name;
				for(var i=0;i<cards.length;i++){
					name+=cards[i].name.slice(10);
				}
				if(lib.card[name]) return name;
				lib.card[name]={};
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
				lib.card[name].cardimage=equip.name;
				if(cards.length==2){
					lib.card[name].legend=true;
					if(typeof lib.card[name].ai.equipValue=='number'){
						lib.card[name].ai.equipValue=Math.min(10,lib.card[name].ai.equipValue+3);
					}
					else if(typeof lib.card[name].ai.equipValue=='function'){
						lib.card[name].ai.equipValue=function(){
							return lib.card[equipname].ai.equipValue.apply(this,arguments)+2;
						}
					}
					else if(lib.card[name].ai.basic&&typeof lib.card[name].ai.basic.equipValue=='number'){
						lib.card[name].ai.basic.equipValue=Math.min(10,lib.card[name].ai.basic.equipValue+3);
					}
					else if(lib.card[name].ai.basic&&typeof lib.card[name].ai.basic.equipValue=='function'){
						lib.card[name].ai.basic.equipValue=function(){
							return lib.card[equipname].ai.basic.equipValue.apply(this,arguments)+2;
						}
					}
				}
				else{
					lib.card[name].epic=true;
					if(typeof lib.card[name].ai.equipValue=='number'){
						lib.card[name].ai.equipValue=Math.min(10,lib.card[name].ai.equipValue+1);
					}
					else if(typeof lib.card[name].ai.equipValue=='function'){
						lib.card[name].ai.equipValue=function(){
							return lib.card[equipname].ai.equipValue.apply(this,arguments)+1;
						}
					}
					else if(lib.card[name].ai.basic&&typeof lib.card[name].ai.basic.equipValue=='number'){
						lib.card[name].ai.basic.equipValue=Math.min(10,lib.card[name].ai.basic.equipValue+1);
					}
					else if(lib.card[name].ai.basic&&typeof lib.card[name].ai.basic.equipValue=='function'){
						lib.card[name].ai.basic.equipValue=function(){
							return lib.card[equipname].ai.basic.equipValue.apply(this,arguments)+1;
						}
					}
				}
				if(Array.isArray(lib.card[name].skills)){
					lib.card[name].skills=lib.card[name].skills.slice(0);
				}
				else{
					lib.card[name].skills=[];
				}
				lib.card[name].filterTarget=true;
				lib.card[name].selectTarget=1;
				lib.card[name].range={global:1};
				lib.card[name].vanish=true;
				var str;
				if(cards.length==2){
					str=lib.translate[cards[0].name+'_duanzao2']+lib.translate[cards[1].name+'_duanzao2'];
				}
				else{
					str=lib.translate[cards[0].name+'_duanzao'];
				}
				var str2=lib.translate[equip.name];
				if(str2.length>2){
					str2=str2.slice(0,2);
				}
				lib.translate[name]=str+str2;
				str2=lib.translate[equip.name+'_info']||'';
				if(str2[str2.length-1]=='.'||str2[str2.length-1]=='。'){
					str2=str2.slice(0,str2.length-1);
				}
				for(var i=0;i<cards.length;i++){
					var name2=cards[i].name+'_'+get.subtype(equip);
					lib.card[name].skills.add(name2);
					lib.translate[name2]=lib.translate[cards[i].name+'_duanzao2'];
					str2+='；'+lib.translate[name2+'_info'];
				}
				lib.translate[name+'_info']=str2;
				return name;
			},
			selectCard:function(){
				if(_status.event.player.hasSkill('mujiaren_skill')) return [2,3];
				return 2;
			},
			filter:function(event,player){
				return player.num('h',{type:'equip'})&&player.num('h',{type:'hslingjian'});
			},
			content:function(){
				var name=lib.skill._lingjianduanzao.process(cards);
				game.me.gain(game.createCard(name),'gain2');
			},
			ai:{
				order:10,
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
							if(player.skills.contains('hslingjian_chaofeng')) return;
							if(card.name=='sha'){
								if(target.skills.contains('hslingjian_chaofeng')) return;
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].skills.contains('hslingjian_chaofeng')){
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
		suolianjia:{
			trigger:{player:'damageBefore'},
			filter:function(event){
				if(event.source&&event.source.num('s','unequip')) return;
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
						if(get.tag(card,'natureDamage')) return 'zerotarget';
						if(card.name=='tiesuo'){
							return [0,0];
						}
					}
				}
			}
		},
		toulianghuanzhu2:{},
		_chenhuodajie:{
			trigger:{global:'damageEnd'},
			direct:true,
			filter:function(event,player){
				if(event.player==player) return false;
				if(!event.player.num('he')) return false;
				if(player.num('h','chenhuodajie')) return true;
				var mn=player.get('e','5');
				if(mn&&mn.name=='muniu'&&mn.cards&&mn.cards.length){
					for(var i=0;i<mn.cards.length;i++){
						if(mn.cards[i].name=='chenhuodajie') return true;
					}
				}
				return false;
			},
			content:function(){
				player.chooseToUse('是否对'+get.translation(trigger.player)+'使用趁火打劫？',function(card,player){
					if(card.name!='chenhuodajie') return false;
					var mod=game.checkMod(card,player,'unchanged','cardEnabled',player.get('s'));
					if(mod!='unchanged') return mod;
					return true;
				},trigger.player,-1).targetRequired=true;
			}
		},
		dujian2:{},
		qiankundai:{
			mod:{
				maxHandcard:function(player,num){
					return num+1;
				}
			},
		},
		_hufu_sha:{
			enable:['chooseToRespond','chooseToUse'],
			filter:function(event,player){
				return player.num('h','hufu')>0;
			},
			filterCard:{name:'hufu'},
			viewAs:{name:'sha'},
			prompt:'将一张虎符当杀使用或打出',
			check:function(card){return 1},
			ai:{
				order:1,
				useful:7.5,
				value:7.5
			}
		},
		_hufu_shan:{
			enable:['chooseToRespond','chooseToUse'],
			filter:function(event,player){
				return player.num('h','hufu')>0;
			},
			filterCard:{name:'hufu'},
			viewAs:{name:'shan'},
			prompt:'将一张虎符当闪使用或打出',
			check:function(){return 1},
			ai:{
				order:1,
				useful:7.5,
				value:7.5
			}
		},
		_hufu_jiu:{
			enable:['chooseToRespond','chooseToUse'],
			filter:function(event,player){
				return player.num('h','hufu')>0;
			},
			filterCard:{name:'hufu'},
			viewAs:{name:'jiu'},
			prompt:'将一张虎符当酒使用',
			check:function(){return 1},
		},
	},
	cardType:{
		hslingjian:0.5,
	},
	translate:{
		hslingjian_xuanfengzhiren_duanzao:'旋风',
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
		hslingjian_jinjilengdong_equip1_info:'每当你用杀造成一次伤害，若受伤害角色武将牌正面朝上，你可以令其摸两张牌并翻面',
		hslingjian_jinjilengdong_equip2_info:'每当你受到杀造成的伤害，若伤害来源武将牌正面朝上，你可以令其摸两张牌并翻面',
		hslingjian_jinjilengdong_equip3_info:'你的武将牌背面朝上时防御距离+2',
		hslingjian_jinjilengdong_equip4_info:'你的武将牌背面朝上时进攻距离+2',
		hslingjian_jinjilengdong_equip5_info:'回合结束后，若你的武将牌正面朝上，你可以与一名武将牌正面朝上的其他角色同时翻面，然后各摸两张牌',
		hslingjian_yinmilichang_duanzao:'隐秘',
		hslingjian_yinmilichang_duanzao2:'隐',
		hslingjian_yinmilichang_equip1_info:'每当你用杀造成一次伤害，你获得潜行直到下一回合开始',
		hslingjian_yinmilichang_equip2_info:'每当你受到杀造成的伤害，你本回合内获得潜行',
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
		hslingjian_shengxiuhaojiao_equip5_info:'出牌阶段限一次，你可以弃置一张牌，然后令一名角色获得或解除嘲讽',
		hslingjian_shijianhuisu_duanzao:'回溯',
		hslingjian_shijianhuisu_duanzao2:'溯',
		hslingjian_shijianhuisu_equip1_info:'每当你使用杀指定目标后，你可以选择目标装备区内的一张牌，令其将此装备收回手牌',
		hslingjian_shijianhuisu_equip2_info:'每当你成为杀的目标后，你可以选择使用者装备区内的一张牌，令其将此装备收回手牌，且本回合内不能再次装备',
		hslingjian_shijianhuisu_equip3_info:'当你的装备区内没有其他牌时，你的防御距离+1',
		hslingjian_shijianhuisu_equip4_info:'当你的装备区内没有其他牌时，你的进攻距离+1',
		hslingjian_shijianhuisu_equip5_info:'出牌阶段限一次，你可以弃置一张牌，然后令一名其他角色将其装备区内的牌收回手牌',
		_lingjianduanzao:'煅造',
		_lingjianduanzao_info:'出牌阶段，你可以选择手牌中的一张装备牌和一张零件牌，将它们合成为一件强化装备；强化装备可以装备给距离1以内的角色',
		jiguanshu:'机关鼠',
		jiguanshu_info:'出牌阶段对距离1以内的一名角色使用，用随机零件强化目标装备区内的装备',
		lingjiandai:'零件袋',
		lingjiandai_info:'出牌阶段对距离1以内的一名角色使用，目标获得3张随机零件',
		mujiaren:'木甲人',
		mujiaren_skill:'木甲人',
		mujiaren_skill_info:'你在煅造装备时可以额外加入一个零件；你可以弃置两个零件并获得一个机关鼠',
		mujiaren_info:'出牌阶段对距离1以内的一名角色使用，目标获得技能木甲人（你在煅造装备时可以额外加入一个零件；你可以弃置两个零件并获得一个机关鼠）',
		hslingjian:'零件',
		hslingjian_xuanfengzhiren:'旋风之刃',
		hslingjian_xuanfengzhiren_info:'随机弃置一名角色的一张牌',
		hslingjian_zhongxinghujia:'重型护甲',
		hslingjian_zhongxinghujia_info:'令一名角色装备一件随机防具，然后随机弃置其一张手牌',
		hslingjian_jinjilengdong:'紧急冷冻',
		hslingjian_jinjilengdong_info:'令一名武将牌正面朝上的其他角色摸两张牌并翻面',
		hslingjian_yinmilichang:'隐秘力场',
		hslingjian_yinmilichang_info:'令一名其他角色获得技能潜行，直到其下一回合开始',
		hslingjian_xingtigaizao:'型体改造',
		hslingjian_xingtigaizao_info:'摸一张牌，本回合手牌上限-1',
		hslingjian_shengxiuhaojiao:'生锈号角',
		hslingjian_shengxiuhaojiao_info:'令一名角色获得技能嘲讽，直到其下一回合开始',
		hslingjian_shijianhuisu:'时间回溯',
		hslingjian_shijianhuisu_info:'令一名其他角色将其装备牌收回手牌',
		hslingjian_chaofeng:'嘲讽',
		hslingjian_chaofeng_info:'锁定技，若你的手牌数大于你的体力值，则只要你在任一其他角色的攻击范围内，该角色使用【杀】时便不能指定你以外的角色为目标',
		hslingjian_yinshen:'潜行',
		hslingjian_yinshen_info:'锁定技，你不能成为其他角色的卡牌的目标',
		suolianjia:'锁链甲',
		suolianjia_info:'锁定技，你防止即将受到的属性伤害，当装备时进入连环状态，当卸下时解除连环状态',
		suolianjia_bg:'链',
		geanguanhuo:'隔岸观火',
		geanguanhuo_info:'指定任意两名角色进行拚点，拚点输的一方掉1点血；若点数一样则使用该锦囊的角色掉1点血。拚点的牌不用丢弃。',
		toulianghuanzhu:'偷梁换柱',
		toulianghuanzhu_info:'令一名角色获得另一名角色的两张手牌，然后还回两张手牌',
		toulianghuanzhu_bg:'柱',
		yihuajiemu:'移花接木',
		yihuajiemu_info:'将一名角色的宝物牌转移至另一名角色',
		fudichouxin:'釜底抽薪',
		fudichouxin_info:'与一名角色进行拼点，若成功则获得双方拼点牌',
		shuiyanqijun:'水攻',
		shuiyanqijun_info:'令所有有装备的角色各弃置一张装备牌',
		shushangkaihua:'树上开花',
		shushangkaihua_info:'使用者与手牌数最少的所有角色各摸一张牌',
		chenhuodajie:'趁火打劫',
		chenhuodajie_info:'任意一名其他角色受到伤害时对其使用，获得其一张牌',
		huoshan:'火山',
		huoshan_info:'出牌阶段，对自己使用。若判定结果为红桃2~9，则目标角色受到2点火焰伤害，距离目标1以内的其他角色受到1点火焰伤害。若判定不为红桃2~9，将之移动到下家的判定区里。',
		hongshui:'洪水',
		hongshui_info:'出牌阶段，对自己使用。若判定结果为梅花2~9，该角色随机弃置3张牌，距离该角色为X的角色随机弃置3-X张牌，若没有牌则失去一点体力，X至少为1',
		liuxinghuoyu:'流星火羽',
		liuxinghuoyu_info:'出牌阶段，对一名角色使用，令目标弃置2张牌，或受到一点火焰伤害',
		dujian:'毒箭',
		dujian_info:'出牌阶段，对一名有手牌或装备牌的角色使用，令其展示一张手牌，若与你选择的手牌颜色相同，其流失一点体力',
		qiankundai:'乾坤袋',
		qiankundai_info:'你的手牌上限+1。当你失去该装备时，你摸取一张牌。',
		hufu:'虎符',
		hufu_bg:'符',
		_hufu_sha:'符杀',
		_hufu_shan:'符闪',
		_hufu_jiu:'符酒',
		hufu_info:'你可以将一张虎符当作杀、闪或酒使用或打出',
	},
	list:[
		['heart',1,'hufu'],
		['spade',1,'hufu'],
		['club',1,'qiankundai'],
		['heart',6,'huoshan','fire'],
		['club',7,'hongshui'],
		['diamond',3,'liuxinghuoyu','fire'],
		['heart',6,'liuxinghuoyu','fire'],
		['heart',9,'liuxinghuoyu','fire'],
		['spade',3,'dujian'],
		['club',11,'dujian'],
		['club',12,'dujian'],
		['heart',3,'yihuajiemu'],
		["diamond",3,'guohe'],

		['diamond',4,'fudichouxin'],
		['diamond',1,'yihuajiemu'],
		['club',6,'fudichouxin'],
		['spade',1,'fudichouxin'],
		['club',7,'shuiyanqijun'],
		['diamond',7,'yihuajiemu'],
		['club',8,'shuiyanqijun'],
		['club',8,'guohe'],
		['spade',9,'shuiyanqijun'],
		['heart',9,'toulianghuanzhu'],
		['club',10,'toulianghuanzhu'],
		['spade',11,'toulianghuanzhu'],
		['spade',13,'guohe'],
		['heart',6,'shushangkaihua'],
		['club',1,'shushangkaihua'],
		['diamond',6,'chenhuodajie'],
		['diamond',9,'chenhuodajie'],
		['club',3,'chenhuodajie'],

		['club',13,'suolianjia'],
	],
}
