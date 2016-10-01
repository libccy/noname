card.yunchou={
	card:{
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
						if(target.hasSkill('toulianghuanzhu2')) return 0;
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
						if(target.hasSkill('dujian2')||target.num('h')==0) return 0;
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
				player.chooseToUse(get.prompt('chenhuodajie',trigger.player).replace(/发动/,'使用'),function(card,player){
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
	translate:{
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
		['spade',3,'dujian','poison'],
		['club',11,'dujian','poison'],
		['club',12,'dujian','poison'],
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
