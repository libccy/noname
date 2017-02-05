card.yunchou={
	card:{
		caochuanjiejian:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				return target.num('h')>0&&target!=player;
			},
			content:function(){
				'step 0'
				if(target.num('h','sha')){
					var name=get.translation(player.name);
					target.chooseControl().set('prompt',get.translation('caochuanjiejian')).set('choiceList',[
						'将手牌中的所有杀交给'+name+'，并视为对'+name+'使用一张杀','展示手牌并令'+name+'弃置任意一张'
					],function(){
						if(ai.get.effect(player,{name:'sha'},target,target)<0) return 1;
						if(target.num('h','sha')>=3) return 1;
						return 0;
					});
				}
				else{
					event.directfalse=true;
				}
				'step 1'
				if(event.directfalse||result.control=='选项二'){
					if(target.num('h')){
						if(!player.isUnderControl(true)){
							target.showHandcards();
						}
						else{
							game.log(target,'展示了',target.get('h'));
						}
						player.discardPlayerCard(target,'h',true,'visible');
					}
					event.finish();
				}
				else{
					var hs=target.get('h','sha');
					player.gain(hs,target);
					target.$give(hs,player);
				}
				'step 2'
				target.useCard({name:'sha'},player);
			},
			ai:{
				order:4,
				value:[5,1],
				result:{
					target:function(player,target){
						if(player.hasShan()) return -1;
						return 0;
					}
				}
			}
		},
		xiaolicangdao:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				'step 0'
				if(cards&&cards.length){
					target.gain(cards,player);
					target.$gain2(cards);
					if(cards.length==1){
						event.card1=cards[0];
					}
				}
				'step 1'
				event.card2=target.get('h').randomGet();
				if(event.card2){
					target.discard(event.card2);
				}
				else{
					event.finish();
				}
				'step 2'
				if(event.card1&&event.card1.name==event.card2.name){
					target.damage();
				}
			},
			ai:{
				order:6,
				value:[4,1],
				result:{
					target:function(player,target){
						return -2/Math.sqrt(1+target.num('h'));
					},
				},
				tag:{
					damage:1,
					discard:1,
					loseCard:1,
				}
			}
		},
		geanguanhuo:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				return target!=player&&target.num('h')>0;
			},
			multitarget:true,
			multiline:true,
			content:function(){
				'step 0'
				targets[0].chooseToCompare(targets[1]);
				'step 1'
				if(!result.tie){
					if(result.bool){
						targets[0].discardPlayerCard(targets[1],true);
						targets[0].line(targets[1]);
					}
					else{
						targets[1].discardPlayerCard(targets[0],true);
						targets[1].line(targets[0]);
					}
					event.finish();
				}
				'step 2'
				targets[0].discardPlayerCard(player,true);
				targets[0].line(player);
				'step 3'
				targets[1].discardPlayerCard(player,true);
				targets[1].line(player);
			},
			selectTarget:2,
			ai:{
				order:5,
				value:[7,1],
				useful:[4,1],
				result:{
					target:-1,
				}
			}
		},
		shezhanqunru:{
			fullskin:true,
			type:'trick',
			enable:function(card,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')) return true;
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			modTarget:true,
			content:function(){
				'step 0'
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=target&&game.players[i].num('h')){
						list.push(game.players[i]);
					}
				}
				if(!list.length){
					event.finish();
				}
				else{
					get.sortSeat(list,target);
					event.list=list;
					event.torespond=[];
				}
				'step 1'
				if(event.list.length){
					event.current=event.list.shift();
					event.current.chooseBool('是否响应'+get.translation(target)+'的舌战群儒？',function(event,player){
						if(ai.get.attitude(player,_status.event.source)>=0) return false;
						var hs=player.get('h');
						for(var i=0;i<hs.length;i++){
							var value=ai.get.value(hs[i]);
							if(!_status.event.hasTarget){
								if(hs[i].number>=8&&value<=7) return true;
								if(value<=3) return true;
							}
							else{
								if(hs[i].number>=11&&value<=5) return true;
								if(value<0) return true;
							}
						}
						return false;
					}).set('source',target).set('hasTarget',event.torespond.length>0);
				}
				else{
					event.goto(3);
				}
				'step 2'
				if(result.bool){
					event.torespond.push(event.current);
					event.current.line(target,'green');
					event.current.popup('响应');
					game.log(event.current,'响应了舌战群儒');
					game.delayx(0.5);
				}
				event.goto(1);
				'step 3'
				if(event.torespond.length==0){
					event.num=1;
				}
				else{
					event.num=0;
					target.chooseToCompare(event.torespond).callback=lib.card.shezhanqunru.callback;
				}
				'step 4'
				if(event.num>0){
					target.draw(3);
				}
			},
			callback:function(){
				if(event.card1.number>event.card2.number){
					event.parent.parent.num++;
				}
				else{
					event.parent.parent.num--;
				}
			},
			ai:{
				order:8.5,
				value:[6,1],
				useful:[3,1],
				result:{
					target:function(player,target){
						var hs=target.get('h');
						for(var i=0;i<hs.length;i++){
							var value=ai.get.value(hs[i]);
							if(hs[i].number>=7&&value<=6) return 1;
							if(value<=3) return 1;
						}
						return 0;
					}
				}
			}
		},
		youdishenru:{
			fullskin:true,
			type:'trick',
			notarget:true,
			wuxieable:true,
			content:function(){
				'step 0'
				var info=event.getParent(2).youdiinfo||event.getParent(3).youdiinfo;
				if(!info){
					event.finish();
					return;
				}
				info.evt.untrigger();
				info.evt.finish();
				event.source=info.source;
				event.source.storage.youdishenru=player;
				event.source.addSkill('youdishenru');
				'step 1'
				var next=event.source.chooseToUse({name:'sha'},player,-1,'对'+get.translation(player)+'使用一张杀，或受到一点伤害');
				next.ai2=function(){
					return 1;
				};
				'step 2'
				if(result.bool){
					if(event.source.storage.youdishenru){
						event.goto(1);
					}
					else{
						event.source.removeSkill('youdishenru');
					}
				}
				else{
					event.source.damage(player);
					event.source.removeSkill('youdishenru');
				}
			},
			ai:{
				value:[5,1],
				useful:[5,1],
				order:1,
				wuxie:function(target,card,player,current,state){
					return -state*ai.get.attitude(player,current);
				},
				result:{
					player:function(player){
						if(_status.event.parent.youdiinfo&&
							ai.get.attitude(player,_status.event.parent.youdiinfo.source)<=0){
							return 1;
						}
						return 0;
					}
				}
			}
		},
		wangmeizhike:{
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				return (target.isLeastHp()&&target.isDamaged())||target.isLeastHandcard();
			},
			content:function(){
				'step 0'
				if(target.isLeastHandcard()) target.draw(2);
				'step 1'
				if(target.isLeastHp()) target.recover();
			},
			ai:{
				order:2,
				value:6,
				result:{
					target:function(player,target){
						var num=0;
						if(target.isLeastHp()&&ai.get.recoverEffect(target)>0){
							if(target.hp==1){
								num+=3;
							}
							else{
								num+=2;
							}
						}
						if(target.isLeastHandcard()){
							num+=2;
						}
						return num;
					}
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
			filterTarget:true,
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
				player.chooseToCompare(target).set('preserve','win').clear=false;
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
					targets[1].gain(hs.randomGets(event.num),targets[0]);
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
				targets[0].gain(result.cards,targets[1]);
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
						if(target.hasSkill('toulianghuanzhu2')) return 0;
						return -0.5;
					}
				},
				wuxie:function(){
					return 0;
				},
				useful:[3,1],
				value:[4,1]
			}
		},
		hufu:{
			fullskin:true,
			type:'basic',
			savable:function(card,player,dying){
				return dying==player;
			},
			ai:{
				value:[7.5,5,2],
				useful:[7.5,5,2],
			}
		},
		huoshan:{
			fullskin:true,
			type:'delay',
			modTarget:function(card,player,target){
				return lib.filter.judge(card,player,target);
			},
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
			modTarget:function(card,player,target){
				return lib.filter.judge(card,player,target);
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
						if(ai.get.damageEffect(target,player,target,'fire')>=0) return 0;
						if(player.hasSkillTag('notricksource')) return 0;
						if(target.hasSkillTag('notrick')) return 0;
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
	},
	skill:{
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
		youdishenru:{
			trigger:{source:'damageEnd'},
			forced:true,
			popup:false,
			silent:true,
			onremove:true,
			filter:function(event,player){
				return event.card&&event.card.name=='sha'&&event.player==player.storage.youdishenru;
			},
			content:function(){
				delete player.storage.youdishenru;
			}
		},
		_youdishenru:{
			trigger:{target:'shaBefore'},
			direct:true,
			filter:function(event,player){
				return player.hasCard('youdishenru');
			},
			content:function(){
				event.youdiinfo={
					source:trigger.player,
					evt:trigger
				};
				player.chooseToUse({name:'youdishenru'},'是否使用诱敌深入？');
			}
		},
		_chenhuodajie:{
			trigger:{global:'damageEnd'},
			direct:true,
			filter:function(event,player){
				if(event.player==player) return false;
				if(!event.player.num('he')) return false;
				if(!lib.filter.targetEnabled({name:'chenhuodajie'},player,event.player)) return false;
				return player.hasCard('chenhuodajie');
			},
			content:function(){
				player.chooseToUse(get.prompt('chenhuodajie',trigger.player).replace(/发动/,'使用'),function(card,player){
					if(card.name!='chenhuodajie') return false;
					var mod=game.checkMod(card,player,'unchanged','cardEnabled',player.get('s'));
					if(mod!='unchanged') return mod;
					return true;
				},trigger.player,-1).targetRequired=true;
			}
		},
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
	translate:{
		caochuanjiejian:'草船借箭',
		caochuanjiejian_info:'出牌阶段对一名有手牌的其他角色使用，目标选择一项：将手牌中的所有杀（至少1张）交给你，并视为对你使用一张杀；或展示手牌并令你弃置任意张',
		xiaolicangdao:'笑里藏刀',
		xiaolicangdao_info:'出牌阶段，对一名其他角色使用。你将此【笑里藏刀】交给目标，然后弃置其一张手牌，若这两张牌牌名相同，你对其造成1点伤害',
		shezhanqunru:'舌战群儒',
		shezhanqunru_info:'出牌阶段，对你使用。你请求所有有手牌的其他角色响应，然后同时与响应的角色拼点。若有角色响应且结果中你赢的次数更多，或若没有角色响应，你摸三张牌',
		youdishenru:'诱敌深入',
		youdishenru_info:'当以你为目标的【杀】生效前，对此【杀】使用。抵消此【杀】，然后此【杀】的使用者需对你使用【杀】（在此【杀】结算结束之后，若此【杀】未对你造成伤害，其重复此流程），否则受到你造成的1点伤害',
		suolianjia:'锁链甲',
		suolianjia_info:'锁定技，你防止即将受到的属性伤害，当装备时进入连环状态，当卸下时解除连环状态',
		suolianjia_bg:'链',
		geanguanhuo:'隔岸观火',
		geanguanhuo_info:'出牌阶段对两名其他角色使用，令目标拼点，赢的角色须弃置输的角色一张牌，若点数相同，目标各弃置你一张牌',
		toulianghuanzhu:'偷梁换柱',
		toulianghuanzhu_info:'令一名角色获得另一名角色的两张手牌，然后还回两张手牌',
		toulianghuanzhu_bg:'柱',
		yihuajiemu:'移花接木',
		yihuajiemu_info:'将一名角色的宝物牌转移至另一名角色',
		fudichouxin:'釜底抽薪',
		fudichouxin_info:'与一名角色进行拼点，若成功则获得双方拼点牌',
		shuiyanqijun:'水攻',
		shuiyanqijun_info:'令所有有装备的角色各弃置一张装备牌',
		wangmeizhike:'望梅止渴',
		wangmeizhike_info:'出牌阶段对一名角色使用，若没有角色手牌比目标少，目标摸两张牌；若没有角色体力比目标少，目标回复一点体力',
		chenhuodajie:'趁火打劫',
		chenhuodajie_info:'任意一名其他角色受到伤害时对其使用，获得其一张牌',
		huoshan:'火山',
		huoshan_info:'出牌阶段，对自己使用。若判定结果为红桃2~9，则目标角色受到2点火焰伤害，距离目标1以内的其他角色受到1点火焰伤害。若判定不为红桃2~9，将之移动到下家的判定区里。',
		hongshui:'洪水',
		hongshui_info:'出牌阶段，对自己使用。若判定结果为梅花2~9，该角色随机弃置3张牌，距离该角色为X的角色随机弃置3-X张牌，若没有牌则失去一点体力，X至少为1',
		liuxinghuoyu:'流星火羽',
		liuxinghuoyu_info:'出牌阶段，对一名角色使用，令目标弃置2张牌，或受到一点火焰伤害',
		qiankundai:'乾坤袋',
		qiankundai_info:'你的手牌上限+1。当你失去该装备时，你摸一张牌。',
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
		['spade',13,'guohe'],
		['heart',6,'wangmeizhike'],
		['club',1,'wangmeizhike'],
		['diamond',6,'chenhuodajie'],
		['diamond',9,'chenhuodajie'],
		['club',3,'chenhuodajie'],

		['club',13,'suolianjia'],

		['club',3,'caochuanjiejian'],
		['spade',7,'caochuanjiejian'],
		['spade',5,'xiaolicangdao'],
		['diamond',11,'xiaolicangdao'],
		['heart',1,'geanguanhuo'],
		['spade',6,'geanguanhuo'],
		['heart',4,'shezhanqunru'],
		['club',8,'shezhanqunru'],
		['heart',12,'youdishenru'],
		['club',2,'youdishenru'],
		['spade',9,'youdishenru'],
	],
}
