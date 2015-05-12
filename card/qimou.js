card.qimou={
	card:{
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
				// target.draw();
				game.asyncDraw(targets);
			},
			ai:{
				order:1,
				value:5,
				result:{
					target:1
				}
			}
		},
		huoshaolianying:{
			fullskin:true,
			type:'trick',
			filterTarget:function(card,player,target){
				if(player==target) return false;
				var link=false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isLinked()&&game.players[i]!=player){
						link=true;break;
					}
				}
				if(link){
					if(!target.isLinked()) return false;
					var distance=get.distance(player,target,'absolute');
					for(var i=0;i<game.players.length;i++){
						if(target!=game.players[i]&&
							game.players[i]!=player&&
							game.players[i].isLinked()&&
							get.distance(player,game.players[i],'absolute')<distance){
							return false;
						}
					}
					return true;
				}
				else{
					return target==player.next;
				}
			},
			enable:true,
			selectTarget:-1,
			content:function(){
				target.damage('fire');
			},
			ai:{
				order:5,
				value:6,
				tag:{
					damage:1,
					natureDamage:1,
					fireDamage:1,
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nofire')||target.hasSkillTag('nodamage')) return 0;
						if(target.skills.contains('xuying')&&target.num('h')==0) return 0;
						if(!target.isLinked()){
							return ai.get.damageEffect(target,player,target,'fire');
						}
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].isLinked()){
								var eff=ai.get.damageEffect(game.players[i],player,target,'fire');
								if(eff>0){
									num++;
								}
								else if(eff<0){
									num--;
								}
							}
						}
						return num;
					}
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
					result.player.clone.moveTo(player).delete();
					result.target.clone.moveTo(player).delete();
				}
				else if(!result.cancelled){
					result.player.clone.delete();
					result.target.clone.delete();
				}
			},
			ai:{
				order:4,
				result:{
					target:function(player,target){
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
					target:-1
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
				useful:3,
				value:7
			}
		},
	},
	skill:{
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
	},
	translate:{
		geanguanhuo:'隔岸观火',
		geanguanhuo_info:'指定任意两名角色进行拚点，拚点输的一方掉1点血；若点数一样则使用该锦囊的角色掉1点血。拚点的牌不用丢弃。',
		toulianghuanzhu:'偷梁换柱',
		toulianghuanzhu_info:'令一名角色获得另一名角色的两张手牌，然后还回两张手牌',
		toulianghuanzhu_bg:'柱',
		yihuajiemu:'移花接木',
		yihuajiemu_info:'将一名角色的宝物牌转移至另一名角色',
		fudichouxin:'釜底抽薪',
		fudichouxin_info:'与一名角色进行拼点，若成功则获得双方拼点牌',
		shuiyanqijun:'水淹七军',
		shuiyanqijun_info:'令所有有装备的角色各弃置一张装备牌',
		shushangkaihua:'树上开花',
		shushangkaihua_info:'令手牌数最少的所有角色各摸一张牌',
		huoshaolianying:'火烧连营',
		huoshaolianying_bg:'烧',
		huoshaolianying_info:'对逆时针方向离你最近的一名横置角色使用（若无横置角色则对你的下家使用），对其造成一点火焰伤害',
		chenhuodajie:'趁火打劫',
		chenhuodajie_info:'任意一名其他角色受到伤害时对其使用，获得其一张牌',
	},
	list:[
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

		['heart',7,'huoshaolianying','fire'],
		['diamond',12,'huoshaolianying','fire'],

		['heart',6,'shushangkaihua'],
		['club',1,'shushangkaihua'],

		['diamond',6,'chenhuodajie'],
		['diamond',9,'chenhuodajie'],
		['club',3,'chenhuodajie'],
	],
}
