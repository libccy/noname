card.zhenfa={
	card:{
		pozhenjue:{
			type:'zhenfa',
			chongzhu:true,
			enable:true,
			filterTarget:true,
			selectTarget:-1,
			multitarget:true,
			content:function(){
				var n=game.players.length;
				while(n--){
					game.swapSeat(game.players.randomGet(),game.players.randomGet());
				}
			},
			mode:['guozhan'],
			ai:{
				order:8,
				result:{
					player:1,
				},
			}
		},
		changshezhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:function(card,player){
				if(player.identity=='unknown') return false;
				return player.next.identity==player.identity||player.previous.identity==player.identity;
			},
			filterTarget:function(card,player,target){
				if(player==target) return player.inline();
				return player.inline(target);
			},
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			content:function(){
				game.asyncDraw(targets);
			},
			mode:['guozhan'],
			ai:{
				order:6.5,
				result:{
					target:1,
				},
				tag:{
					draw:1
				}
			}
		},
		tianfuzhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMajor()) return true;
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return target.isMajor()&&target.num('he')>0;
			},
			selectTarget:-1,
			content:function(){
				target.chooseToDiscard('he',true);
			},
			mode:['guozhan'],
			ai:{
				order:7,
				result:{
					target:-1,
				},
				tag:{
					discard:1
				}
			}
		},
		dizaizhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMinor()) return true;
				}
				return false;
			},
			multitarget:true,
			multiline:true,
			filterTarget:function(card,player,target){
				return target.isMinor();
			},
			selectTarget:-1,
			content:function(){
				game.asyncDraw(targets);
			},
			mode:['guozhan'],
			ai:{
				order:7,
				result:{
					target:1,
				},
				tag:{
					draw:1
				}
			}
		},
		fengyangzhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:true,
			filterTarget:function(card,player,target){
				return target.sieged();
			},
			selectTarget:-1,
			content:function(){
				target.addTempSkill('feiying',{player:'damageAfter'});
				target.popup('feiying');
				game.log(target,'获得了技能','【飞影】');
			},
			mode:['guozhan'],
			ai:{
				order:7,
				result:{
					target:2,
				},
			}
		},
		yunchuizhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:true,
			filterTarget:function(card,player,target){
				return target.sieging();
			},
			selectTarget:-1,
			content:function(){
				target.addTempSkill('wushuang',{source:'damageAfter'});
				target.popup('wushuang');
				game.log(target,'获得了技能','【无双】');
			},
			mode:['guozhan'],
			ai:{
				order:7,
				result:{
					target:2,
				},
			}
		},
		qixingzhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:function(card,player){
				if(player.identity=='unknown'||player.identity=='ye') return false;
				return (get.population(player.identity)>1)
			},
			filterTarget:function(card,player,target){
				return target.identity==player.identity;
			},
			multitarget:true,
			selectTarget:-1,
			content:function(){
				lib.temp=targets[0];
				targets.sort(lib.sort.seat);
				var rest=game.players.slice(0);
				rest.remove(targets);
				rest.sort(function(a,b){
					if(a.identity=='unknown') return 1;
					else return -1;
				})
				lib.temp={};
				if(targets.length>rest.length+1) targets.length=rest.length+1;
				for(var i=1;i<targets.length;i++){
					game.swapSeat(targets[i],targets[i-1].next.next,false);
					game.swapSeat(rest[i-1],targets[i-1].next,false);
				}
				if(rest[targets.length-1]){
					game.swapSeat(rest[targets.length-1],targets[targets.length-1].next,false);
				}
				game.log(get.translation(player.identity)+'势力角色摆成了七星阵')
			},
			mode:['guozhan'],
			ai:{
				order:7,
				result:{
					target:1,
				},
			}
		},
		shepanzhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:function(card,player){
				if(player.identity=='unknown'||player.identity=='ye') return false;
				if(get.population(player.identity)<=1) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].identity==player.identity&&!player.inline(game.players[i])) return true;
				}
				return false;
			},
			filterTarget:function(card,player,target){
				return target.identity==player.identity;
			},
			multitarget:true,
			selectTarget:-1,
			content:function(){
				lib.temp=targets[0];
				targets.sort(lib.sort.seat);
				lib.temp={};
				for(var i=1;i<targets.length;i++){
					game.swapSeat(targets[i],targets[i-1].next,false);
				}
				game.log(get.translation(player.identity)+'势力角色摆成了蛇蟠阵')
			},
			mode:['guozhan'],
			ai:{
				order:7,
				result:{
					target:1,
				},
			}
		},
		longfeizhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:function(card,player){
				return player.next.siege(player);
			},
			filterTarget:function(card,player,target){
				if(target.get('he').length==0) return false;
				return target==player.next||target==player.previous;
			},
			selectTarget:-1,
			content:function(){
				"step 0"
				player.choosePlayerCard(target,'he',true);
				"step 1"
				target.discard(result.buttons[0].link);
				"step 2"
				if(target==targets[targets.length-1]){
					player.draw();
				}
			},
			mode:['guozhan'],
			ai:{
				order:10,
				result:{
					target:-1,
					player:1
				},
			}
		},
		huyizhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:function(card,player){
				return player.siege(player.next)||player.siege(player.previous);
			},
			filterTarget:function(card,player,target){
				return player.siege(target);
			},
			selectTarget:-1,
			content:function(){
				"step 0"
				player.chooseCard('将一张非基本牌当作杀对'+get.translation(target)+'使用','he',function(card){
					return get.type(card)!='basic';
				}).ai=function(card){
					if(ai.get.effect(target,{name:'sha'},player,player)>0){
						return 6-ai.get.value(card);
					}
					return 0;
				};
				"step 1"
				if(result.bool){
					player.useCard({name:'sha'},result.cards,target,false);
				}
				"step 2"
				if(target==player.next) event.player2=player.next.next;
				else event.player2=player.previous.previous;
				event.player2.chooseCard('将一张非基本牌当作杀对'+get.translation(target)+'使用','he',function(card){
					return get.type(card)!='basic';
				}).ai=function(card){
					if(ai.get.effect(target,{name:'sha'},event.player2,event.player2)>0){
						return 6-ai.get.value(card);
					}
					return 0;
				};
				"step 3"
				if(result.bool){
					event.player2.useCard({name:'sha'},result.cards,target,false);
				}
			},
			mode:['guozhan'],
			ai:{
				order:7,
				result:{
					target:-2,
				},
			}
		},
		niaoxiangzhen:{
			type:'zhenfa',
			chongzhu:true,
			enable:true,
			filterTarget:function(card,player,target){
				if(player.identity==target.identity) return false;
				if(target.identity=='unknown'||target.identity=='ye') return false;
				return target.identity==target.next.identity||target.identity==target.previous.identity
			},
			selectTarget:-1,
			content:function(){
				"step 0"
				var next=target.chooseToRespond({name:'shan'});
				next.ai=function(card){
					if(ai.get.damageEffect(target,player,target)>=0) return 0;
					return 1;
				};
				next.autochoose=lib.filter.autoRespondShan;
				"step 1"
				if(result.bool==false){
					target.damage();
				}
			},
			ai:{
				basic:{
					order:9,
					useful:1
				},
				result:{
					target:-1.5,
				},
				tag:{
					respond:1,
					respondShan:1,
					damage:1,
				}
			},
			mode:['guozhan'],
		},
	},
	skill:{

	},
	translate:{
		zhenfa:'阵法',
		changshezhen:'长蛇阵',
		pozhenjue:'破阵决',
		tianfuzhen:'天覆阵',
		dizaizhen:'地载阵',
		fengyangzhen:'风扬阵',
		yunchuizhen:'云垂阵',
		qixingzhen:'七星阵',
		shepanzhen:'蛇蟠阵',
		shepanzhen_bg:'列',
		yunchuizhen_bg:'垂',
		longfeizhen:'龙飞阵',
		huyizhen:'虎翼阵',
		niaoxiangzhen:'鸟翔阵',
		niaoxiangzhen_info:'令所有非你阵营的队列的角色今次打出一张闪，或者受到一点伤害',
		huyizhen_info:'将一张非基本牌当作杀对你围攻的角色使用',
		longfeizhen_info:'弃置围攻你的角色各一张牌，然后摸一张牌',
		qixingzhen_info:'令我方所有角色进入围攻状态',
		shepanzhen_info:'令我方所有角色进入队列状态',
		yunchuizhen_info:'令所有围攻角色获得技能【无双】，直到其首次造成伤害',
		fengyangzhen_info:'令所有被围攻角色获得技能【飞影】，直到其首次受到伤害',
		dizaizhen_info:'所有小势力角色摸一张牌',
		changshezhen_info:'与你同一队列的所有角色摸一张牌',
		pozhenjue_info:'将所有角色的顺序随机重排',
		tianfuzhen_info:'所有大势力角色弃置一张牌'
	},
	list:[
		["diamond",1,'changshezhen'],
		["club",1,'changshezhen'],
		// ["spade",1,'changshezhen'],
		// ["heart",1,'changshezhen'],

		["diamond",2,'tianfuzhen'],
		// ["club",2,'tianfuzhen'],
		["spade",2,'tianfuzhen'],
		["heart",2,'tianfuzhen'],

		["diamond",3,'dizaizhen'],
		// ["club",3,'dizaizhen'],
		["spade",3,'dizaizhen'],
		["heart",3,'dizaizhen'],

		// ["diamond",4,'fengyangzhen'],
		// ["club",4,'fengyangzhen'],
		// ["spade",4,'fengyangzhen'],
		// ["heart",4,'fengyangzhen'],

		// ["diamond",5,'zhonghuangzhen'],
		// ["club",5,'zhonghuangzhen'],
		// ["spade",5,'zhonghuangzhen'],
		// ["heart",5,'zhonghuangzhen'],

		// ["diamond",6,'huyizhen'],
		["club",6,'huyizhen'],
		["spade",6,'huyizhen'],
		// ["heart",6,'huyizhen'],

		// ["diamond",7,'qixingzhen'],
		// ["club",7,'qixingzhen'],
		// ["spade",7,'qixingzhen'],
		// ["heart",7,'qixingzhen'],

		["diamond",8,'shepanzhen'],
		// ["club",8,'shepanzhen'],
		// ["spade",8,'shepanzhen'],
		["heart",8,'shepanzhen'],

		// ["diamond",9,'longfeizhen'],
		["club",9,'longfeizhen'],
		// ["spade",9,'longfeizhen'],
		["heart",9,'longfeizhen'],

		["diamond",11,'niaoxiangzhen'],
		// ["club",11,'niaoxiangzhen'],
		["spade",11,'niaoxiangzhen'],
		["heart",11,'niaoxiangzhen'],

		// ["diamond",12,'yunchuizhen'],
		// ["club",12,'yunchuizhen'],
		// ["spade",12,'yunchuizhen'],
		// ["heart",12,'yunchuizhen'],

		["diamond",13,'pozhenjue'],
		// ["club",13,'pozhenjue'],
		// ["spade",13,'pozhenjue'],
		//["heart",13,'pozhenjue'],
	],
}
