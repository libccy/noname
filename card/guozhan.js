'use strict';
card.guozhan={
	card:{
		yuanjiao:{
			audio:true,
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				if(lib.config.mode!='guozhan') return player!=target;
				if(target.identity=='unknown'||player.identity=='unknown') return false;
				if(player==target) return false;
				if(player.identity=='ye') return true;
				return player.identity!=target.identity;
			},
			content:function(){
				game.asyncDraw([target,player],[1,lib.config.mode=='guozhan'?3:1]);
			},
			ai:{
				basic:{
					useful:4,
					value:8,
					order:9
				},
				result:{
					target:1,
					player:3,
				},
			},
			// mode:['guozhan'],
		},
		zhibi:{
			audio:true,
			fullskin:true,
			type:'trick',
			enable:true,
			chongzhu:true,
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return (target.get('h').length||
					target.classList.contains('unseen')||
					target.classList.contains('unseen2'))
			},
			content:function(){
				"step 0"
				if(!player.storage.zhibi){
					player.storage.zhibi=[];
				}
				player.storage.zhibi.push(target);
				if(!event.isMine()){
					event.finish();
					return;
				}
				var controls=[];
				if(target.get('h').length) controls.push('手牌');
				if(target.classList.contains('unseen')) controls.push('主将');
				if(target.classList.contains('unseen2')) controls.push('副将');
				if(controls.length>1){
					player.chooseControl(controls);
				}
				if(controls.length==0) event.finish();
				"step 1"
				game.pause();
				ui.create.confirm('o');
				var content;
				if(result.control){
					if(result.control=='手牌') content=target.get('h');
					else if(result.control=='主将') content=[[target.name1],'character'];
					else content=[[target.name2],'character'];
				}
				else if(target.get('h').length){
					content=target.get('h');
				}
				else if(target.classList.contains('unseen')){
					content=[[target.name1],'character'];
				}
				else{
					content=[[target.name2],'character'];
				}
				event.dialog=ui.create.dialog(content);
				"step 2"
				event.dialog.close();
			},
			mode:['guozhan'],
			ai:{
				order:9.5,
				result:{
					player:function(player,target){
						if(player.num('h')<=player.hp) return 0;
						if(player.storage.zhibi&&player.storage.zhibi.contains(target)) return 0;
						return target.isUnseen()?1:0;
					}
				}
			}
		},
		yiyi:{
			audio:true,
			fullskin:true,
			type:'trick',
			enable:true,
			filterTarget:function(card,player,target){
				if(lib.config.mode=='guozhan'){
					if(player.identity=='unknown'||player.identity=='ye') return player==target;
					return player.identity==target.identity;
				}
				else{
					return true;
				}
			},
			selectTarget:function(){
				if(lib.config.mode=='guozhan') return -1;
				return [1,3];
			},
			content:function(){
				target.draw(2);
				target.chooseToDiscard(2,'he',true).ai=ai.get.disvalue;
			},
			ai:{
				wuxie:function(){
					return 0;
				},
				basic:{
					useful:3,
					value:3,
					order:5
				},
				result:{
					target:function(player,target){
						if(target.num('h')<=1){
							if(target==player){
								return 0;
							}
							return 0.3;
						}
						return 1;
					},
				},
			},
			// mode:['guozhan'],
		},
		wuliu:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			distance:{attackFrom:-1},
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.identity=='unknown'||player.identity=='ye') return 2.5;
						var num=2;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].identity==player.identity) num+=0.5;
						}
						return num;
					}
				}
			},
			skills:['wuliu_skill'],
			mode:['guozhan'],
		},
		sanjian:{
			fullskin:true,
			type:'equip',
			subtype:'equip1',
			distance:{attackFrom:-2},
			ai:{
				basic:{
					equipValue:4
				}
			},
			skills:['sanjian_skill']
		},
		jingfanma:{
			fullskin:true,
			type:'equip',
			subtype:'equip4',
			distance:{globalFrom:-1},
		},
	},
	skill:{
		wuliu_skill:{},
		_wuliu_skill2:{
			mod:{
				attackFrom:function(from,to,distance){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==from) continue;
						if(game.players[i].identity=='unknown'||game.players[i].identity=='ye') continue;
						if(game.players[i].identity!=from.identity) continue;
						if(game.players[i].get('s').contains('wuliu_skill')) distance--;
					}
					return distance;
				}
			}
		},
		sanjian_skill:{
			audio:true,
			trigger:{source:'damageAfter'},
			direct:true,
			filter:function(event,player){
				if(player.num('h')==0) return false;
				if(!event.card) return false;
				if(event.card.name!='sha') return false;
				var num=0;
				for(var i=0;i<game.players.length;i++){
					if(get.distance(event.player,game.players[i])<=1) num++;
				}
				return num>1;
			},
			content:function(){
				"step 0"
				var damaged=trigger.player;
				player.chooseCardTarget({
					filterTarget:function(card,player,target){
						return get.distance(damaged,target)<=1&&target!=damaged;
					},
					ai1:function(card){
						return 9-ai.get.value(card);
					},
					ai2:function(target){
						return ai.get.damageEffect(target,player,player);
					},
					prompt:'是否发动三尖两刃刀？'
				});
				"step 1"
				if(result.bool){
					player.logSkill('sanjian_skill',result.targets);
					player.discard(result.cards);
					result.targets[0].damage();
				}
			}
		},
	},
	translate:{
		yuanjiao:'远交近攻',
		yuanjiao_info:'对一名不同势力的角色使用，对方摸一张牌，然后你摸3张牌（非国战模式中改为摸1张）',
		yuanjiao_bg:'交',
		zhibi:'知己知彼',
		zhibi_info:'出牌阶段对一名其他角色使用，观看其手牌或装备牌',
		yiyi:'以逸待劳',
		yiyi_info:'对与自己势力相同的所有角色使用，摸两张牌然后弃置两张牌（非国战模式改为任意指定三名角色）',
		yiyi_bg:'逸',
		wuliu:'吴六剑',
		wuliu_info:'其他与装备者势力相同的角色攻击范围+1',
		sanjian:'三尖两刃刀',
		sanjian_info:'当你使用杀造成伤害后，可以弃置1张手牌对一名距离受伤害角色1以内的其他角色造成1点伤害',
		wuliu_skill:'吴六剑',
		sanjian_skill:'三尖两刃刀',
		jingfanma_bg:'-马',
		jingfanma:'惊帆',
		jingfanma_info:'其他角色与你的距离-1',
	},
	list:[
		['heart',9,'yuanjiao'],
		['club',3,'zhibi'],
		['club',4,'zhibi'],
		['diamond',4,'yiyi'],
		['heart',11,'yiyi'],
		['diamond',6,'wuliu'],
		['diamond',12,'sanjian'],
		['heart',3,'jingfanma'],
		["spade",4,'shunshou'],
		["spade",12,'guohe'],
		["spade",11,'wuxie'],
	],
}
