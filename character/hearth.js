'use strict';
character.hearth={
	character:{
		// hs_jaina:['female','wei',3,[],['fullskin']],
		// hs_rexxar:['male','qun',4,[],['fullskin']],
		// hs_uther:['male','qun',4,[],['fullskin']],
		// hs_garrosh:['male','qun',4,[],['fullskin']],
		hs_malfurion:['male','wu',4,['jihuo'],['fullskin']],
		hs_guldan:['male','wei',3,['fenliu','hongxi'],['fullskin']],
		// hs_anduin:['male','qun',4,[],['fullskin']],
		hs_thrall:['male','qun',4,['tuteng','tzhenji'],['fullskin']],
		// hs_waleera:['female','qun',4,[],['fullskin']],
	},
	skill:{
		jihuo:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return !player.storage.jihuo&&player.num('h')>0;
			},
			direct:true,
			content:function(){
				"step 0"
				player.chooseToDiscard('是否发动【激活】？').ai=ai.get.unuseful2;
				"step 1"
				if(result.bool){
					player.logSkill('jihuo');
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
			filter:function(event){
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
					return ai.get.damageEffect(target,player,player,'thunder')-(target.num('he')?1:0);
				};
				"step 1"
				if(result.bool){
					game.delay(0.5);
					var target=result.targets[0];
					player.logSkill('tzhenji',target,'thunder');
					target.damage('thunder',Math.floor(Math.random()*2));
					var cs=target.get('he');
					if(cs.length){
						target.discard(cs.randomGet());
					}
				}
			},
			ai:{
				threaten:0.7
			}
		},
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
						if(player.skills.contains('jueqing')) return [1,1];
						return 1.2;
					}
				},
				threaten:1.3
			},
			group:'tuteng_lose'
		},
		tuteng:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			check:function(card){
				return 6-ai.get.value(card);
			},
			filter:function(event,player){
				var rand=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					rand.remove(player.skills[i]);
					if(rand.length==0) return false;
				}
				return true;
			},
			position:'he',
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
				order:9,
				result:{
					player:1
				},
				effect:function(card,player){
					if(get.tag(card,'damage')){
						if(player.skills.contains('jueqing')) return [1,1];
						return 1.2;
					}
				},
				threaten:1.3
			},
			group:'tuteng_lose'
		},
		tuteng_lose:{
			trigger:{player:'damageEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				var tuteng=['tuteng1','tuteng2','tuteng3','tuteng4'];
				for(var i=0;i<player.skills.length;i++){
					if(tuteng.contains(player.skills[i])) return true;
				}
				return false;
			},
			content:function(){
				var tuteng=['tuteng1','tuteng2','tuteng3','tuteng4'];
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
			intro:{
				content:'每当你造成一次伤害，你摸一张牌'
			},
			filter:function(event){
				return event.num>0;
			},
			trigger:{source:'damageAfter'},
			forced:true,
			content:function(){
				player.draw();
			}
		},
		tuteng3:{
			mark:'image',
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
			intro:{
				content:'你的锦囊牌造成的伤害+1'
			},
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event){
				return event.card&&get.type(event.card)=='trick';
			},
			content:function(){
				trigger.num++;
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
				order:1,
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
	card:{
		tuteng1:{
			image:'card/tuteng1',
		},
		tuteng2:{
			image:'card/tuteng2',
		},
		tuteng3:{
			image:'card/tuteng3',
		},
		tuteng4:{
			image:'card/tuteng4',
		}
	},
	translate:{
		hs_jaina:'吉安娜',
		hs_rexxar:'雷克萨',
		hs_uther:'乌瑟尔',
		hs_garrosh:'加尔鲁什',
		hs_malfurion:'玛法里奥',
		hs_guldan:'古尔丹',
		hs_anduin:'安度因',
		hs_thrall:'萨尔',
		hs_waleera:'瓦莉拉',

		tuteng:'图腾',
		tuteng_info:'出牌阶段限一次，你可以弃置一张牌并随机获得一个图腾；每当你受到一次伤害，你随机失去一个图腾',
		tuteng1:'治疗图腾',
		tuteng2:'灼热图腾',
		tuteng3:'石爪图腾',
		tuteng4:'空气之怒图腾',
		tzhenji:'震击',
		tzhenji_info:'每当你因弃置而失去黑色牌，可对一名角色造成0~1点雷电伤害，然后随机弃置其一张牌',
		fenliu:'分流',
		fenliu_info:'出牌阶段限一次，你可以失去一点体力并获得3张牌',
		hongxi:'虹吸',
		hongxi_info:'锁定技，每当有一名角色死亡，你将体力回复至体力上限',
		jihuo:'激活',
		jihuo_info:'回合结束阶段，你可以弃置一张手牌并进行一个额外的回合',
	},
}
